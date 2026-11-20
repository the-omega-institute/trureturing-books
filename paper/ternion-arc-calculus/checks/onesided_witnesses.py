"""Independent float64 checks of the construction of Proposition 5.26."""

import numpy as np


SEED = 20261120
SAMPLES = 4096
STEPS = 40
ATOL = 1e-10

# Represent u + vj by the two complex coordinates (u, v).
ONE = np.array([1 + 0j, 0j])
I = np.array([1j, 0j])
J = np.array([0j, 1 + 0j])
K = np.array([0j, 1j])


def multiply(a, b):
    u, v = np.moveaxis(a, -1, 0)
    p, q = np.moveaxis(b, -1, 0)
    return np.stack((u * p - v * q.conj(), u * q + v * p.conj()), axis=-1)


def inverse(x):
    return np.stack((x[..., 0].conj(), -x[..., 1]), axis=-1)


def unit(x):
    return x / np.linalg.norm(x, axis=-1, keepdims=True)


def real_pairing(a, b):
    return np.real(np.sum(a.conj() * b, axis=-1))


def circle(axis, radians):
    return np.cos(radians)[..., None] * ONE + np.sin(radians)[..., None] * axis


def beta(s):
    safe_s = np.where(s > 0, s, 1.0)
    return np.where(s > 0, np.exp(1.0 - 1.0 / safe_s), 0.0)


def phase(x):
    u = x[..., 0]
    return 0.25 * u.imag * beta(u.real)


def rotate(x, radians):
    u, v = np.broadcast_arrays(x[..., 0], x[..., 1] * np.exp(1j * radians))
    return np.stack((u, v), axis=-1)


def product(x, y):
    return multiply(x, rotate(y, phase(x)))


def square(x):
    return product(x, x)


def left_divide(a, b):
    return rotate(multiply(inverse(a), b), -phase(a))


def ternary(a, b, x):
    return multiply(b, product(multiply(inverse(b), a), multiply(inverse(b), x)))


def angle(x, steps=STEPS):
    # Unroll the two branches into an affine expression in the terminal angle.
    # Renormalize to contain floating-point drift when squaring repeatedly.
    total = np.zeros(x.shape[:-1])
    coefficient = np.ones_like(total)
    x = unit(x)
    for _ in range(steps):
        negative = x[..., 0].real < 0
        total += coefficient * np.where(negative, np.pi, 0.0)
        coefficient *= np.where(negative, -0.5, 0.5)
        x = unit(square(x))
    imag_norm = np.hypot(x[..., 0].imag, np.abs(x[..., 1]))
    return total + coefficient * np.arctan2(imag_norm, x[..., 0].real)


def comparison(a, b, steps=STEPS):
    return np.cos(angle(multiply(inverse(a), b), steps))


def check(label, observed, expected, tolerance=ATOL):
    error = float(np.max(np.abs(observed - expected)))
    if not error <= tolerance:
        raise AssertionError(f"{label}: error {error:.3e} exceeds {tolerance:.3e}")
    return error


def sample(rng, count):
    points = rng.normal(size=(count, 2, 2))
    return unit(points[..., 0] + 1j * points[..., 1])


def check_right_derivative(a, b, tangent):
    tangent = unit(tangent - real_pairing(a, tangent)[..., None] * a)
    u = a[..., 0]
    s = u.real
    safe_s = np.where(s > 0, s, 1.0)
    phase_derivative = 0.25 * beta(s) * (
        tangent[..., 0].imag + u.imag * tangent[..., 0].real / safe_s**2
    )
    rotated = rotate(b, phase(a))
    phase_term = np.stack((np.zeros(len(a)), 1j * rotated[:, 1]), axis=-1)
    derivative = multiply(tangent, rotated) + multiply(a, phase_term) * phase_derivative[:, None]
    step = 1e-5
    numerical = (product(unit(a + step * tangent), b) -
                 product(unit(a - step * tangent), b)) / (2 * step)
    check("right derivative against finite differences", derivative, numerical, 3e-9)
    lower_bound = 1.0 - (1.0 + 4.0 / np.e) / 4.0
    smallest = float(np.min(np.linalg.norm(derivative, axis=-1)))
    if smallest < lower_bound - ATOL:
        raise AssertionError("right derivative below analytic lower bound")
    return smallest, lower_bound


def check_random_model():
    rng = np.random.default_rng(SEED)
    a, b, x, y = (sample(rng, SAMPLES) for _ in range(4))
    check("left unit", product(ONE, x), x)
    check("right unit", product(x, ONE), x)
    check("unit norm", np.linalg.norm(product(x, y), axis=-1), 1.0)
    check("left division", product(x, left_divide(x, y)), y)
    check("independent square formula", square(x)[..., 0].real,
          2 * x[..., 0].real**2 - 1 + np.abs(x[..., 1])**2 * (1 - np.cos(phase(x))))
    check("equator squares to -1", square(unit(1j * x[:, 0].imag[:, None] * ONE
                                              + x[:, 1, None] * J)), -ONE)
    check("pole squares", square(np.stack((ONE, -ONE))), ONE)
    check("endpoint angles", angle(np.stack((ONE, -ONE, I, J))),
          np.array([0, np.pi, np.pi / 2, np.pi / 2]))

    value = comparison(x, y)
    symmetry = check("symmetric kernel", value, comparison(y, x))
    left = check("left invariance", comparison(product(a, x), product(a, y)), value)
    axial = check("axial invariance", angle(rotate(x, rng.uniform(-np.pi, np.pi, SAMPLES))),
                  angle(x))
    inversion = check("inversion invariance", angle(inverse(x)), angle(x))
    check("forced left division formula", value, np.cos(angle(left_divide(x, y))))
    check("faithful diagonal value", comparison(x, x), 1.0)
    check("antipodal value", comparison(x, -x), -1.0)
    off_diagonal = comparison(ONE, x)
    if not np.all((-1 < off_diagonal) & (off_diagonal < 1)):
        raise AssertionError("endpoint collision on random off-diagonal inputs")
    check("binary round trip", comparison(ONE, square(x)), 2 * off_diagonal**2 - 1)
    check("ternary first unit", ternary(a, a, x), x)
    check("ternary second unit", ternary(a, b, b), a)
    check("ternary left invariance", comparison(ternary(a, b, x), ternary(a, b, y)), value)
    check("ternary round trip", comparison(b, ternary(x, b, x)),
          2 * comparison(b, x)**2 - 1)
    derivative, bound = check_right_derivative(a, b, y)
    print(f"PASS {SAMPLES} random pairs and transports, seed {SEED}, tolerance {ATOL:.0e}")
    print(f"  max symmetric error in c {symmetry:.3e}, max left-invariance error {left:.3e}")
    print(f"  max axial angle error {axial:.3e}, max inverse angle error {inversion:.3e}")
    print(f"  smallest sampled right derivative norm {derivative:.9f}, lower bound {bound:.9f}")


def gram(points, steps):
    matrix = comparison(points[:, None, :], points[None, :, :], steps)
    check("raw Gram symmetry", matrix, matrix.T)
    return (matrix + matrix.T) / 2


def check_witnesses():
    x = np.array([1 / np.sqrt(2) + 0.5j, 0.5 + 0j])
    oracle_circle = circle(I, np.pi / 4)
    check("equal round distances", real_pairing(ONE, x), real_pairing(ONE, oracle_circle))
    check("negative witness has ordinary angle", angle(-x), 3 * np.pi / 4)
    c_pos = comparison(ONE, x)
    c_neg = comparison(-ONE, x)
    same_comparison = circle(I, angle(x))
    check("equal comparisons to the unit", c_pos, comparison(ONE, same_comparison))
    if c_neg - comparison(-ONE, same_comparison) <= 1e-6:
        raise AssertionError("two-point homogeneity witness vanished")

    initial = circle(J, np.pi / 4)
    right = circle(K, np.pi / 8)
    check("right-translation relative quaternion", multiply(inverse(right), multiply(initial, right)), x)
    change = comparison(product(ONE, right), product(initial, right)) - comparison(ONE, initial)
    check("right-translation defect", change, c_pos - 1 / np.sqrt(2))
    if change <= 1e-6:
        raise AssertionError("right-invariance defect vanished")

    three = np.stack((ONE, -ONE, x))
    repeated_four = np.stack((ONE, -ONE, square(-ONE), x))
    four_distinct = np.stack((ONE, x, square(x), -ONE))
    print("PASS equal-comparison pair, angular triangle and right-translation witnesses")
    print(f"  c(1,x) {c_pos:.15f}, c(-1,x) {c_neg:.15f}, right change in c {change:.12e}")
    print("  N        pi/4 - theta(x)          min eig G3               min eig G4 (distinct)"
          "              truncation E")
    for steps in (20, 30, STEPS):
        error = np.pi * 2.0**(-steps)
        defect = np.pi / 4 - angle(x, steps)
        eig3 = np.linalg.eigvalsh(gram(three, steps))[0]
        eig4 = np.linalg.eigvalsh(gram(four_distinct, steps))[0]
        print(f"  {steps:2d}  {defect: .15e}  {eig3: .15e}  {eig4: .15e}  {error:.3e}")
    # E bounds an angle or entry truncation. Weyl bounds eigenvalue
    # truncation by dimension times E. These bounds exclude numerical roundoff.
    repeated_eig4 = np.linalg.eigvalsh(gram(repeated_four, STEPS))[0]
    if not (defect > error and eig3 < -3 * error and max(eig4, repeated_eig4) < -4 * error):
        raise AssertionError("a witness sign is unresolved at the final truncation")
    print(f"  original four-point min eig (repeated unit) {repeated_eig4:.15e}")
    check("angular triangle defect", np.pi - angle(x) - angle(-x), defect)
    check("three-point determinant", np.linalg.det(gram(three, STEPS)), -(c_pos + c_neg)**2)
    print(f"  final truncation radii: angle {error:.3e}, G3 {3*error:.3e}, G4 {4*error:.3e}")

    p = np.array([0.5 + 0.5j, 1 / np.sqrt(2) + 0j])
    p_squared = square(p)
    difference = np.linalg.norm(ternary(p_squared, ONE, p) -
                                ternary(p, ONE, p_squared))
    if p_squared[0].real >= 0 or difference <= 1e-3:
        raise AssertionError("two-generator heap-identity witness vanished")
    check("exact cubic defect formula", difference,
          2 * np.abs(p[1]) * np.abs(np.sin(phase(p))))
    print(f"PASS two-generator heap-identity failure, quaternion norm gap {difference:.12e}")


def check_positive_controls():
    rng = np.random.default_rng(SEED + 1)
    x, y = sample(rng, 256), sample(rng, 256)
    r = real_pairing(ONE, x)
    x_squared = multiply(x, x)
    check("round Gram reflection", real_pairing(ONE, y) + real_pairing(x_squared, y),
          2 * r * real_pairing(x, y))

    s = np.array([0.25, 0.125, 0.0625, 0.03125])
    for sign in (-1, 1):
        u = s * (1 + sign * 1j)
        horizontal_norm_squared = 1 - np.abs(u)**2
        check("projective phase obstruction", u**2 + sign * 1j * horizontal_norm_squared, sign * 1j)

    def model_base(a, b):
        return multiply(multiply(multiply(a, a), b), inverse(a))

    def model_ternary(a, b, x):
        return multiply(b, model_base(multiply(inverse(b), a), multiply(inverse(b), x)))

    check("example (B) right-transport collision", model_base(circle(J, 2 * np.pi / 3), I), I)
    a = (ONE + I + J + K) / 2
    b = (ONE + I + J - K) / 2
    x = (ONE + I - J + K) / 2
    expected = (ONE - I + J + K) / 2
    check("example (B) left heap-identity side", model_ternary(model_ternary(a, ONE, a), b, x),
          expected)
    check("example (B) right heap-identity side", model_ternary(a, ONE, model_ternary(a, b, x)),
          -expected)

    epsilon = 0.25
    h = circle(J, epsilon)
    translated = multiply(J, multiply(multiply(h, I), inverse(h)))
    check("round deformation changes right comparison", real_pairing(I, translated),
          np.cos(np.pi / 2 + 2 * epsilon))
    print("PASS round Gram reflection, projective phases, and round-operation controls")


def main():
    print(f"NumPy {np.__version__}, complex128/float64")
    check_random_model()
    check_witnesses()
    check_positive_controls()


if __name__ == "__main__":
    main()
