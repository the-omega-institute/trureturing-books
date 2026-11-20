"""Deterministic float64 checks for Section 5.2 (Propositions 5.26 and 5.27)."""

import numpy as np


ATOL = 2e-11
STEPS = 46
ONE, I, J, K = np.eye(4)
RNG = np.random.default_rng(20261120)


def close(actual, expected, *, atol=ATOL):
    np.testing.assert_allclose(actual, expected, atol=atol, rtol=0)


def norm(x):
    return np.linalg.norm(x, axis=-1)


def unit(x):
    return x / norm(x)[..., None]


def dot(x, y):
    return np.sum(x * y, axis=-1)


def qconj(x):
    return x * np.array([1.0, -1.0, -1.0, -1.0])


def qmul(x, y):
    a, u = x[..., :1], x[..., 1:]
    b, v = y[..., :1], y[..., 1:]
    imaginary = a * v + b * u + np.cross(u, v)
    return np.concatenate((a * b - dot(u, v)[..., None], imaginary), axis=-1)


def circle(t, axis):
    t = np.asanyarray(t)[..., None]
    return np.cos(t) * ONE + np.sin(t) * axis


def chebyshev(s):
    return 2 * s**2 - 1


def twist(x):
    s, t = x[..., 0], x[..., 1]
    safe_s = np.where(s > 0, s, 1.0)
    beta = np.where(s > 0, np.exp(1 - 1 / safe_s), 0.0)
    return t * beta / 4


def conjugate(h, x):
    return qmul(qmul(h, x), qconj(h))


def counterexample(x, y):
    h = circle(twist(x) / 2, I)
    return qmul(x, conjugate(h, y))


def square(x):
    return counterexample(x, x)


def angle(x, steps=STEPS):
    """Evaluate the iterate of the affine branches in (2) along the orbit."""
    x = unit(x)
    offset = np.zeros(x.shape[:-1])
    scale = np.ones(x.shape[:-1])
    for _ in range(steps):
        south = x[..., 0] < 0
        offset += scale * np.pi * south
        scale *= np.where(south, -0.5, 0.5)
        # Keep iterated float64 quaternion products on the unit sphere.
        x = unit(square(x))
    return offset + scale * np.arccos(np.clip(x[..., 0], -1, 1))


def comparison(x, y):
    return np.cos(angle(qmul(qconj(x), y)))


def check_counterexample(x, y, z):
    count = len(x)
    zeros = unit(np.column_stack((np.zeros(count), x[:, 1:])))
    s = x[:, 0]
    imaginary_horizontal_squared = np.sum(x[:, 2:] ** 2, axis=-1)
    square_real = chebyshev(s) + imaginary_horizontal_squared * (1 - np.cos(twist(x)))
    close(square(x)[:, 0], square_real)
    north = (s > 0) & (s < 1)
    assert np.all(square_real[north] < s[north])
    close(square(zeros), np.broadcast_to(-ONE, zeros.shape))
    close(square(ONE), ONE)
    close(square(-ONE), ONE)

    h = circle(np.linspace(0, 2 * np.pi, count), I)
    hx = circle(twist(x) / 2, I)
    close(square(qconj(x)), conjugate(qconj(hx), qconj(square(x))))
    close(square(conjugate(h, x)), conjugate(h, square(x)))
    close(counterexample(x, ONE), x)
    close(counterexample(ONE, x), x)
    close(norm(counterexample(x, y)), 1)
    close(angle(ONE), 0)
    close(angle(-ONE), np.pi)
    close(angle(zeros), np.pi / 2)
    close(angle(conjugate(h, x)), angle(x))
    close(angle(qconj(x)), angle(x))
    close(comparison(x, y), comparison(y, x))
    close(comparison(x, -x), -1)
    close(comparison(x, x), 1)
    close(np.cos(angle(square(x))), chebyshev(np.cos(angle(x))))
    close(comparison(counterexample(z, x), counterexample(z, y)), comparison(x, y))

    a = qmul(z, x)
    b = qmul(z, square(x))
    close(comparison(z, b), chebyshev(comparison(z, a)))
    close(qmul(z, counterexample(ONE, x)), a)
    close(qmul(z, counterexample(x, ONE)), a)

    direction = unit(y - dot(x, y)[:, None] * x)
    step = 1e-5
    forward = counterexample(np.cos(step) * x + np.sin(step) * direction, z)
    backward = counterexample(np.cos(step) * x - np.sin(step) * direction, z)
    derivative_size = norm((forward - backward) / (2 * step))
    assert np.min(derivative_size) >= 1 - (1 + 4 / np.e) / 4 - 1e-8

    angles = np.linspace(0, 2 * np.pi, count)
    for axis in (I, J):
        points = circle(angles, axis)
        close(counterexample(points, points), circle(2 * angles, axis))
        close(comparison(ONE, points), np.cos(angles))
        close(chebyshev(np.cos(angles)), np.cos(2 * angles))

    witness = np.array([1 / np.sqrt(2), 0.5, 0.5, 0])
    theta = angle(witness)
    assert theta < np.pi / 4 - 1e-6
    close(angle(-witness), 3 * np.pi / 4)
    close(comparison(ONE, -witness), -1 / np.sqrt(2))
    assert theta + angle(-witness) < np.pi - 1e-6
    axial = circle(theta, I)
    close(comparison(ONE, witness), comparison(ONE, axial))
    assert abs(comparison(-ONE, witness) - comparison(-ONE, axial)) > 1e-6
    gram_points = np.array([ONE, -ONE, witness])
    gram = comparison(gram_points[:, None, :], gram_points[None, :, :])
    assert np.linalg.eigvalsh(gram)[0] < -1e-8
    four_points = np.array([ONE, -ONE, square(-ONE), witness])
    four_gram = comparison(four_points[:, None, :], four_points[None, :, :])
    assert np.linalg.eigvalsh(four_gram)[0] < -1e-8

    x0, right = circle(np.pi / 4, J), circle(np.pi / 8, K)
    close(qmul(qconj(right), qmul(x0, right)), witness)
    initial = comparison(ONE, x0)
    changed = comparison(counterexample(ONE, right), counterexample(x0, right))
    close(changed, comparison(ONE, witness))
    assert changed - initial > 1e-6

    print(f"PASS nonround S^3 model and ternary transport ({count} fixed samples)")
    print(f"     angle defect pi/4 - theta(x) = {np.pi / 4 - theta:.9g}")
    print(f"     minimum witness Gram eigenvalue = {np.linalg.eigvalsh(gram)[0]:.9g}")


def paper_example(a, b, x):
    u = qmul(qconj(b), a)
    v = qmul(qconj(b), x)
    return qmul(b, qmul(qmul(qmul(u, u), v), qconj(u)))


def check_round_operations(x, y, z):
    close(paper_example(x, x, y), y)
    close(paper_example(x, y, y), x)
    model_square = paper_example(x, y, x)
    close(model_square, qmul(qmul(x, qconj(y)), x))
    close(model_square, 2 * dot(x, y)[:, None] * x - y)
    close(dot(y, model_square), chebyshev(dot(x, y)))
    close(dot(paper_example(x, y, z), paper_example(x, y, x)), dot(z, x))

    angles = RNG.uniform(-np.pi, np.pi, (3, len(x)))
    a, b, v = (qmul(z, circle(t, J)) for t in angles)
    close(paper_example(a, b, v), qmul(z, circle(angles[0] - angles[1] + angles[2], J)))
    parameter = angles[0]
    close(paper_example(circle(parameter, J), ONE, I), I * np.cos(3 * parameter[:, None])
          - K * np.sin(3 * parameter[:, None]))
    close(paper_example(circle(2 * np.pi / 3, J), ONE, I), I)
    a = np.array([1, 1, 1, 1]) / 2
    b = np.array([1, 1, 1, -1]) / 2
    v = np.array([1, 1, -1, 1]) / 2
    left = paper_example(paper_example(a, ONE, a), b, v)
    right = paper_example(a, ONE, paper_example(a, b, v))
    close(left, np.array([1, -1, 1, 1]) / 2)
    close(right, -left)
    right_arg = (I - J) / np.sqrt(2)
    close(paper_example(a, ONE, right_arg), paper_example(qconj(a), ONE, right_arg))
    close((1 + dot(a, qconj(a))) / 2, 1 / 4)

    epsilon = 0.25

    def small_twist(a, b):
        speed = norm(a[..., 1:])
        theta = epsilon * speed
        ratio = epsilon * np.sinc(theta / np.pi)
        h = np.concatenate((np.cos(theta)[..., None], ratio[..., None] * a[..., 1:]), axis=-1)
        return qmul(a, conjugate(h, b))

    close(small_twist(x, x), qmul(x, x))
    close(small_twist(x, ONE), x)
    close(small_twist(ONE, x), x)
    close(dot(small_twist(x, y), small_twist(x, z)), dot(y, z))
    close(dot(small_twist(ONE, I), small_twist(J, I)), np.cos(np.pi / 2 + 2 * epsilon))
    assert abs(dot(small_twist(ONE, I), small_twist(J, I))) > 0.4
    print("PASS example (B) of Proposition 5.10 and the round deformation with right diffeomorphisms")


def octmul(x, y):
    a, b = x[..., :4], x[..., 4:]
    c, d = y[..., :4], y[..., 4:]
    return np.concatenate((qmul(a, c) - qmul(qconj(d), b),
                           qmul(d, a) + qmul(b, qconj(c))), axis=-1)


def check_composition_models(count):
    two = unit(RNG.normal(size=(3, count, 2)))
    four = unit(RNG.normal(size=(3, count, 4)))
    eight = unit(RNG.normal(size=(3, count, 8)))

    def complex_mul(x, y):
        real = x[..., 0] * y[..., 0] - x[..., 1] * y[..., 1]
        imag = x[..., 0] * y[..., 1] + x[..., 1] * y[..., 0]
        return np.stack((real, imag), axis=-1)

    for vectors, multiply in ((two, complex_mul), (four, qmul), (eight, octmul)):
        x, y, z = vectors
        e = np.eye(x.shape[-1])[0]
        close(multiply(e, x), x)
        close(multiply(x, e), x)
        close(norm(multiply(x, y)), 1)
        close(dot(multiply(x, y), multiply(x, z)), dot(y, z))
        close(dot(multiply(y, x), multiply(z, x)), dot(y, z))
        square_x = multiply(x, x)
        r = dot(e, x)
        close(square_x, 2 * r[:, None] * x - e)
        close(dot(e, square_x), chebyshev(r))
        # The equality of the three inner products in the Hilbert reflection proof.
        close(dot(x, square_x), r)
        close(norm(e + square_x - 2 * r[:, None] * x), 0)
        gram_points = np.stack((np.broadcast_to(e, x.shape), x, square_x, y), axis=1)
        gram = gram_points @ np.swapaxes(gram_points, -1, -2)
        null_vector = np.column_stack((np.ones_like(r), -2 * r, np.ones_like(r), np.zeros_like(r)))
        close((gram @ null_vector[..., None])[..., 0], 0)
        assert np.min(np.linalg.eigvalsh(gram)) > -ATOL
        reflection = 2 * dot(x, y)[:, None] * x - y
        close(dot(reflection, z), 2 * dot(x, y) * dot(x, z) - dot(y, z))
    print("PASS round composition models, duplication and four-point Gram reflection")


def check_exclusions():
    # Both projective equator sheets approach [j] and force opposite phases.
    s = np.array([0.2, 0.02, 0.002])
    for sign in (-1, 1):
        u = s * (1 + sign * 1j)
        horizontal_squared = 1 - np.abs(u)**2
        phase = -sign * 1j
        close(u**2 - horizontal_squared * phase, sign * 1j)
        close(np.abs(u**2 - sign * 1j), horizontal_squared)

    # The equal-character pair in the U(2) subgroup of SU(3).
    t = 0.03
    positive = np.diag([np.exp(1j * t), np.exp(1j * t), np.exp(-2j * t)])
    negative = np.diag([-np.exp(1j * t), -np.exp(1j * t), np.exp(-2j * t)])
    pole = np.diag([-1, -1, 1])
    close(np.linalg.det(positive), 1)
    close(np.linalg.det(negative), 1)
    close(pole @ positive, negative)
    chi = np.linalg.det(positive[:2, :2])
    close(chi, np.linalg.det(negative[:2, :2]))
    close(np.linalg.det((positive @ positive)[:2, :2]), chi**2)
    assert abs(chi - 1) > 0.01 and abs(chi + 1) > 0.01

    # Controls for dropped unique-zero and round-trip hypotheses.
    projective_gram = 2 * np.eye(4) - np.ones((4, 4))
    close(np.linalg.eigvalsh(projective_gram), [-2, 2, 2, 2])
    for dimension in (2, 3, 5):
        point = np.zeros(dimension)
        point[0] = np.pi
        assert abs(np.mean(np.cos(2 * point)) - chebyshev(np.mean(np.cos(point)))) > 0.1
    assert abs(np.exp(-4) - chebyshev(np.exp(-1))) > 0.1
    print("PASS projective and unitary obstruction identities and hypothesis controls")


def main():
    count = 160
    x, y, z = unit(RNG.normal(size=(3, count, 4)))
    check_counterexample(x, y, z)
    check_round_operations(x, y, z)
    check_composition_models(count)
    check_exclusions()
    print(f"PASS all NumPy checks ({STEPS} contraction iterates, "
          f"analytic truncation bound {np.pi * 2.0**(-STEPS):.3g} before roundoff)")


if __name__ == "__main__":
    main()
