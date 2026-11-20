"""Finite float64 checks for Theorem 5.18: models, twisted flows, and the witnesses of Remark 5.24."""

import numpy as np


ATOL = 3e-12
SEED = 20261121
MODEL_TRIALS = 24
FLOW_TRIALS = 12
TIMES = np.linspace(0.0, np.pi, 129)


def check(actual, expected, label, atol=ATOL):
    np.testing.assert_allclose(
        actual, expected, rtol=0, atol=atol, err_msg=label
    )


def unit(vector):
    return vector / np.linalg.norm(vector)


def conjugate(vector):
    return np.r_[vector[0], -vector[1:]]


def multiply(a, b):
    """Complex, quaternion and Cayley–Dickson multiplication."""
    if a.size == 2:
        return np.array([a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]])
    if a.size == 4:
        ar, ai, aj, ak = a
        br, bi, bj, bk = b
        return np.array([
            ar * br - ai * bi - aj * bj - ak * bk,
            ar * bi + ai * br + aj * bk - ak * bj,
            ar * bj - ai * bk + aj * br + ak * bi,
            ar * bk + ai * bj - aj * bi + ak * br,
        ])
    a0, a1 = a[:4], a[4:]
    b0, b1 = b[:4], b[4:]
    return np.r_[
        multiply(a0, b0) - multiply(conjugate(b1), a1),
        multiply(b1, a0) + multiply(a1, conjugate(b0)),
    ]


def imaginary_rotation(dimension, angle):
    result = np.eye(dimension)
    cosine, sine = np.cos(angle), np.sin(angle)
    result[1:3, 1:3] = [[cosine, -sine], [sine, cosine]]
    return result


def twist(base):
    result = np.eye(base.size)
    if base.size == 4:
        result[1, 1] = -1  # Imaginary reflection, outside the automorphism group.
    if base.size == 8:
        result = imaginary_rotation(8, 0.43 + 0.2 * base[1])
    return result


def ternion(a, base, x, transform=None):
    """Radial bilinear extension at a unit base, for arbitrary outer vectors."""
    if transform is None:
        transform = twist(base)
    inverse_base = conjugate(base)
    u = transform.T @ multiply(inverse_base, a)
    v = transform.T @ multiply(inverse_base, x)
    return multiply(base, transform @ multiply(u, v))


def check_sphere(dimension, rng):
    basis = np.eye(dimension)
    for _ in range(MODEL_TRIALS):
        a, base, x, y, z = map(unit, rng.normal(size=(5, dimension)))
        u, v = rng.normal(size=(2, dimension))
        check(ternion(base, base, x), x, "left unit")
        check(ternion(a, x, x), a, "right unit")
        check(ternion(-base, base, x), -x, "antipode as a transport")
        check(ternion(u, base, u), 2 * (base @ u) * u - (u @ u) * base, "square")
        check(base @ ternion(x, base, x), 2 * (base @ x) ** 2 - 1, "round trip")
        check(ternion(a, base, x) @ ternion(a, base, y), x @ y, "left invariance")
        check(ternion(x, base, a) @ ternion(y, base, a), x @ y, "right invariance")
        left = np.column_stack([ternion(u, base, e) for e in basis])
        right = np.column_stack([ternion(e, base, v) for e in basis])
        check(left @ v, right @ u, "both linear extensions")
        check(left @ v, ternion(u, base, v), "radial formula")
        check(left.T @ left, (u @ u) * basis, "scaled orthogonality")
        check(left + left.T, 2 * (base @ u) * basis, "polarized multiplier")
        check((1 + x @ y) / 2, np.linalg.norm((x + y) / 2) ** 2, "midpoint formula")

        direction = unit(a - (a @ base) * base)

        def gamma(time):
            return np.cos(time) * base + np.sin(time) * direction

        r, s, t = rng.uniform(-4 * np.pi, 4 * np.pi, size=3)
        check(ternion(gamma(s), base, gamma(t)), gamma(s + t), "geodesic addition")
        check(ternion(gamma(r), gamma(s), gamma(t)), gamma(r - s + t), "varying-base heap")
        check(base @ gamma(t), np.cos(t), "geodesic cosine")
        check(gamma(t + 2 * np.pi), gamma(t), "period")
        check(gamma(np.pi), -base, "half-period")
        check(np.pi * 0.25 / np.arccos(base @ gamma(0.25)), np.pi, "half-period formula")
        distances = np.arccos(np.clip([x @ y, y @ z, x @ z], -1, 1))
        assert distances[2] <= distances[0] + distances[1] + ATOL, distances

    samples = np.vstack([basis, -basis, [unit(p) for p in rng.normal(size=(24, dimension))]])
    eigenvalues = np.linalg.eigvalsh(samples @ samples.T)
    assert eigenvalues.min() >= -ATOL, eigenvalues
    assert np.count_nonzero(eigenvalues > ATOL) == dimension, eigenvalues
    print(f"S^{dimension - 1}: {MODEL_TRIALS} model trials passed, Gram rank {dimension}.")


def check_flow(dimension, rng):
    identity = np.eye(dimension)
    cosine = np.cos(TIMES)[:, None, None]
    sine = np.sin(TIMES)[:, None, None]
    for _ in range(FLOW_TRIALS):
        base = unit(rng.normal(size=dimension))
        tangent_at_base = identity - np.outer(base, base)
        direction = unit(tangent_at_base @ rng.normal(size=dimension))
        normal_at_base = tangent_at_base - np.outer(direction, direction)
        generator = np.column_stack([ternion(direction, base, e) for e in identity])
        opposite = np.column_stack([ternion(e, base, direction) for e in identity])

        check(generator.T, -generator, "fundamental generator is skew")
        check(generator @ generator, -identity, "generator squares to -I")
        check(generator @ base, direction, "generator's initial velocity")
        covariant_derivative = tangent_at_base @ generator @ tangent_at_base
        check(covariant_derivative @ direction, 0, "A kills the velocity")
        check(-covariant_derivative @ covariant_derivative, normal_at_base, "-A^2 at base")

        flow = cosine * identity + sine * generator
        gamma = flow @ base
        velocity = flow @ direction
        check(gamma @ opposite.T, velocity, "opposite generator along the same geodesic")
        tangent = identity - gamma[:, :, None] * gamma[:, None, :]
        tangent_derivative = -(
            velocity[:, :, None] * gamma[:, None, :] + gamma[:, :, None] * velocity[:, None, :]
        )
        # A column is a flow-variation field starting in the tangent space.
        variation = flow @ tangent_at_base
        ordinary_first = generator @ variation
        first = tangent @ ordinary_first
        second = tangent @ (tangent_derivative @ ordinary_first + tangent @ generator @ ordinary_first)
        curvature = tangent - velocity[:, :, None] * velocity[:, None, :]
        check(first, flow @ covariant_derivative, "first covariant derivative of flow variation")
        check(second, flow @ covariant_derivative @ covariant_derivative, "second covariant derivative")
        check(second, -curvature @ variation, "independent sphere curvature sign")

        rotating_frame = identity + (cosine - 1) * normal_at_base - sine * covariant_derivative
        parallel = flow @ rotating_frame @ tangent_at_base
        parallel_derivative = tangent @ (generator @ parallel - parallel @ covariant_derivative)
        check(parallel_derivative, 0, "parallel frame derivative")
        check(
            parallel.transpose(0, 2, 1) @ curvature @ parallel,
            np.broadcast_to(normal_at_base, parallel.shape),
            "constant curvature operator in parallel frame",
        )

        normal = unit(normal_at_base @ rng.normal(size=dimension))
        step = 1e-5
        plus = np.cos(step) * direction + np.sin(step) * normal
        minus = np.cos(step) * direction - np.sin(step) * normal
        central_difference = np.sin(TIMES)[:, None] * ((plus - minus) / (2 * step))
        jacobi = np.sin(TIMES)[:, None] * (parallel @ normal)
        check(jacobi, central_difference, "angular Jacobi by finite difference", atol=2e-10)
        check(jacobi[[0, -1]], 0, "Jacobi endpoint values")
        check(np.linalg.norm(jacobi, axis=1), np.sin(TIMES), "angular metric coefficient")

    for frequency in (0, 1, 2, 3):
        integrand = np.cos(TIMES) ** 2 - frequency**2 * np.sin(TIMES) ** 2
        index = np.trapezoid(integrand, TIMES)
        check(index, np.pi / 2 * (1 - frequency**2), "index-form sign and coefficient")
    print(f"S^{dimension - 1}: {FLOW_TRIALS} twisted bases × {len(TIMES)} times passed.")


def rotation(axis, angle):
    """Rodrigues rotation formula, independent of the quaternion model."""
    x, y, z = axis
    skew = np.array([[0, -z, y], [z, 0, -x], [-y, x, 0]])
    return np.eye(3) + np.sin(angle) * skew + (1 - np.cos(angle)) * (skew @ skew)


def rotation_comparison(a, b):
    return (np.trace(a.T @ b) - 1) / 2


def check_so3(rng):
    identity = np.eye(3)
    half_turns = [rotation(axis, np.pi) for axis in identity]
    for half_turn in half_turns:
        check(rotation_comparison(identity, half_turn), -1, "zero partner in SO(3)")
    representatives = [identity, *half_turns]
    gram = np.array([[rotation_comparison(a, b) for b in representatives] for a in representatives])
    check(np.linalg.eigvalsh(gram), [-2, 2, 2, 2], "non-PSD comparison on SO(3)")
    for _ in range(MODEL_TRIALS):
        a, b, x = [
            rotation(unit(rng.normal(size=3)), rng.uniform(0, np.pi))
            for _ in range(3)
        ]
        check(a @ a.T @ x, x, "SO(3) left unit")
        check(a @ x.T @ x, a, "SO(3) right unit")
        c = rotation_comparison(a, b)
        left, right = x @ a.T, a.T @ x
        check(rotation_comparison(left @ a, left @ b), c, "SO(3) left invariance")
        check(rotation_comparison(a @ right, b @ right), c, "SO(3) right invariance")
        check(rotation_comparison(b, a), c, "SO(3) symmetry")
        check(rotation_comparison(a, b @ a.T @ b), 2 * c**2 - 1, "SO(3) round trip")
    print("SO(3): round trip passes, three explicit zero partners, Gram minimum −2.")


def berger_curvature(stretch):
    # Bracket components indexed [i, j, k] for [e_i, e_j] along e_k.
    bracket = np.zeros((3, 3, 3))
    bracket[0, 1, 2] = 2 * stretch
    bracket[1, 2, 0] = bracket[2, 0, 1] = 2 / stretch
    bracket -= bracket.swapaxes(0, 1).copy()
    # Koszul, followed by R(e_i,e_j)e_j in the constant-coefficient left frame.
    connection = (bracket - bracket.transpose(2, 0, 1) + bracket.transpose(1, 2, 0)) / 2
    planes = [(0, 1), (0, 2), (1, 2)]
    return np.array([
        connection[j, j, :] @ connection[i, :, i]
        - connection[i, j, :] @ connection[j, :, i]
        - bracket[i, j, :] @ connection[:, j, i]
        for i, j in planes
    ])


def check_berger():
    one, i, j, k = np.eye(4)
    q = unit(one + j)
    conjugated = multiply(multiply(q, i), conjugate(q))
    check(conjugated, -k, "inner automorphism rotates horizontal into vertical")
    for stretch in (0.55, 1.0, 1.25, 1.8):
        metric_weights = np.array([1, 1, stretch])
        lengths = [np.linalg.norm(u[1:] * metric_weights) for u in (i, conjugated)]
        check(lengths, [1, stretch], "Berger tangent lengths detect right-translation failure")
        check(
            berger_curvature(stretch),
            [4 - 3 * stretch**2, stretch**2, stretch**2],
            "Berger sectional curvatures",
        )
    print("Berger S^3: right-translation and sectional-curvature witnesses passed.")


def check_other_witnesses():
    for dimension in (2, 3, 4):
        torus = np.zeros(dimension)
        torus[0] = np.pi
        check(np.cos(2 * torus).mean(), 1, "torus doubled value")
        assert 2 * np.cos(torus).mean() ** 2 - 1 < 1
    assert np.exp(-4.0) > 0 > 2 * np.exp(-2.0) - 1

    # Orthogonal representatives in CP^2 and in the scalar lens quotient of S^3.
    base, v, w = np.eye(3, dtype=complex)
    check(np.abs([np.vdot(base, v), np.vdot(base, w)]) ** 2, 0, "CP^2 zero partners")
    p = 5
    phases = np.exp(2j * np.pi * np.arange(p) / p)
    v = np.array([0, 1], dtype=complex)
    w = np.exp(1j * np.pi / p) * v
    u = np.array([1, 0], dtype=complex)
    for candidate in (v, w):
        check(np.real(phases * np.vdot(u, candidate)).max(), 0, "lens zero partners")
    assert min(np.linalg.norm(v - phase * w) for phase in phases) > 0.5

    one, i, j, k, ell = np.eye(8)[:5]
    identity = np.eye(8)
    lhs = ternion(ternion(i, one, j, identity), one, ell, identity)
    rhs = ternion(i, one, ternion(j, one, ell, identity), identity)
    check(lhs, multiply(k, ell), "octonionic full-heap left side")
    check(rhs, -multiply(k, ell), "octonionic full-heap right side")
    check(twist(one) @ multiply(twist(one).T @ i, ell),
          np.cos(0.43) * multiply(i, ell) - np.sin(0.43) * multiply(j, ell),
          "S^7 twist changes the product")

    step = 1e-6
    cusp_coordinates = []
    for s in (-step, step):
        base = np.cos(s) * one + np.sin(s) * i
        value = ternion(multiply(base, i), base, multiply(base, ell),
                        imaginary_rotation(8, abs(base @ i)))
        cusp_coordinates.append(multiply(conjugate(base), value) @ multiply(j, ell))
    check(np.asarray(cusp_coordinates) / [-step, step], [1, -1], "middle-slot cusp", atol=2e-9)

    one, i, j, k = np.eye(4)
    base = np.cos(step) * one + np.sin(step) * i
    check(ternion(i, one, j, np.eye(4)), k, "quaternion branch at b=1")
    check(ternion(i, base, j), -k, "opposite branch near b=1", atol=2e-6)
    print("Torus, cylinder, projective, lens, regularity, and full-heap witnesses passed.")


def main():
    rng = np.random.default_rng(SEED)
    for dimension in (2, 4, 8):
        check_sphere(dimension, rng)
    for dimension in (4, 8):
        check_flow(dimension, rng)
    check_so3(rng)
    check_berger()
    check_other_witnesses()
    print(f"All finite checks passed with NumPy {np.__version__}, seed {SEED}.")


if __name__ == "__main__":
    main()
