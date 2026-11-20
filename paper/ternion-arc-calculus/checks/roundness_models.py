"""Finite float64 checks for the sphere models of Theorem 5.18 (Section 5.1)."""

import numpy as np


TRIALS = 64
ATOL = 2e-12
RNG = np.random.default_rng(20261120)


def close(actual, expected, identity, atol=ATOL):
    np.testing.assert_allclose(actual, expected, rtol=0, atol=atol, err_msg=identity)


def conjugate(x):
    return np.r_[x[0], -x[1:]]


def multiply(x, y):
    if len(x) == 2:
        return np.array([x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]])
    if len(x) == 4:
        xv, yv = x[1:], y[1:]
        return np.r_[x[0] * y[0] - xv @ yv, x[0] * yv + y[0] * xv + np.cross(xv, yv)]
    a, b = x[:4], x[4:]
    c, d = y[:4], y[4:]
    return np.r_[multiply(a, c) - multiply(conjugate(d), b),
                 multiply(d, a) + multiply(b, conjugate(c))]


def ternion(a, b, x):
    return multiply(multiply(a, conjugate(b)), x)


def unit(x):
    return x / np.linalg.norm(x)


def comparison(x, y):
    return (1 + x @ y) / 2


def angle(x, y):
    return np.arccos(np.clip(x @ y, -1, 1))


def check_sphere(m):
    basis = np.eye(m)
    one = basis[0]
    for _ in range(TRIALS):
        a, b, x, y, z = (unit(u) for u in RNG.normal(size=(5, m)))
        u, v = RNG.normal(size=(2, m))
        close(multiply(multiply(u, conjugate(b)), b), u, "inverse law")
        close(multiply(b, conjugate(b)), one, "unit inverse")
        close(np.linalg.norm(multiply(u, v)), np.linalg.norm(u) * np.linalg.norm(v),
              "norm multiplicativity")
        close(ternion(a, a, x), x, "first Mal'cev identity")
        close(ternion(a, x, x), a, "second Mal'cev identity")
        close(comparison(x, y), comparison(y, x), "symmetry")
        close(comparison(x, y), np.linalg.norm((x + y) / 2) ** 2, "comparison")
        close(1 - comparison(x, y), np.linalg.norm((x - y) / 2) ** 2, "diagonal")
        close(comparison(x, x), 1, "diagonal value")
        close(comparison(x, -x), 0, "antipode value")
        close(ternion(-b, b, x), -x, "antipode as a transport")
        close(comparison(ternion(a, b, x), ternion(a, b, y)),
              comparison(x, y), "left invariance")
        close(comparison(ternion(x, b, a), ternion(y, b, a)),
              comparison(x, y), "right invariance")
        close(ternion(u, b, u), 2 * (b @ u) * u - (u @ u) * b,
              "composition-algebra square")
        close(comparison(b, ternion(x, b, x)), (2 * comparison(b, x) - 1) ** 2,
              "round trip")
        close(ternion(x, b, z), ternion(ternion(x, one, ternion(one, b, one)), one, z),
              "standard model's C_o at one")

        left = np.stack([ternion(u, b, e) for e in basis], axis=1)
        close(left @ v, ternion(u, b, v), "bilinear extension in the last slot")
        close(left.T @ left, (u @ u) * basis, "scaled orthogonality")
        close(left + left.T, 2 * (b @ u) * basis, "polarized multiplier equation")
        right = np.stack([ternion(e, b, v) for e in basis], axis=1)
        close(right @ u, ternion(u, b, v), "bilinear extension in the first slot")

        tangent = unit(a - (a @ b) * b)

        def gamma(t):
            return np.cos(t) * b + np.sin(t) * tangent

        r, s, t = RNG.uniform(-4 * np.pi, 4 * np.pi, size=3)
        close(ternion(gamma(s), b, gamma(t)), gamma(s + t), "geodesic addition")
        close(ternion(gamma(r), gamma(s), gamma(t)), gamma(r - s + t), "circle heap")
        close(b @ gamma(t), np.cos(t), "cosine along a geodesic")
        close(b @ gamma(-t), b @ gamma(t), "evenness of the geodesic comparison")
        close(b @ gamma(2 * t), 2 * (b @ gamma(t)) ** 2 - 1, "duplication")
        close(gamma(t + 2 * np.pi), gamma(t), "return period")
        close(gamma(t + np.pi), -gamma(t), "antipodal half-period")
        close(np.pi * 0.25 / angle(b, gamma(0.25)), np.pi, "half-period from local data")
        velocity = -np.sin(t) * b + np.cos(t) * tangent
        close(ternion(tangent, b, gamma(t)), velocity, "first infinitesimal transport")
        close(ternion(gamma(t), b, tangent), velocity, "second infinitesimal transport")
        folded = abs((t + np.pi) % (2 * np.pi) - np.pi)
        close(angle(b, gamma(t)), folded, "folded spherical distance", atol=2e-9)
        assert angle(x, z) <= angle(x, y) + angle(y, z) + ATOL, "triangle inequality"

    points = np.vstack([basis, -basis, np.array([unit(v) for v in RNG.normal(size=(24, m))])])
    gram = points @ points.T
    eigenvalues = np.linalg.eigvalsh(gram)
    assert eigenvalues.min() >= -ATOL, eigenvalues
    assert np.count_nonzero(eigenvalues > ATOL) == m, eigenvalues
    close(angle(one, one), 0, "distance at the diagonal")
    close(angle(one, -one), np.pi, "distance at the antipode")
    print(f"S^{m - 1}: {TRIALS} model trials passed; Gram rank {m}.")


def check_jacobi(m):
    basis = np.eye(m)
    w, v, z = basis[:3]
    generator = np.stack([multiply(v, e) for e in basis], axis=1)
    close(generator.T, -generator, "Killing generator is skew")
    close(generator @ generator, -basis, "constant-length Killing generator")
    normal = generator - np.outer(v, w) + np.outer(w, v)
    close(normal @ v, 0, "covariant derivative along the field")
    close(-normal @ normal, basis - np.outer(w, w) - np.outer(v, v),
          "negative square is the curvature operator on w-tangent vectors")

    t = np.linspace(0, np.pi, 1025)
    flow = np.cos(t)[:, None, None] * basis + np.sin(t)[:, None, None] * generator
    rotating_z = np.cos(t)[:, None] * z - np.sin(t)[:, None] * (normal @ z)
    parallel_z = (flow @ rotating_z[..., None])[..., 0]
    close(parallel_z, np.broadcast_to(z, parallel_z.shape), "parallel frame")
    jacobi = np.sin(t)[:, None] * parallel_z
    close(jacobi[[0, -1]], np.zeros((2, m)), "Jacobi field at the poles")
    close(np.linalg.norm(jacobi, axis=1), np.sin(t), "angular metric coefficient")
    epsilon = 1e-5
    perturbed_v = np.cos(epsilon) * v + np.sin(epsilon) * z
    reflected_v = np.cos(epsilon) * v - np.sin(epsilon) * z
    derivative = np.sin(t)[:, None] * (perturbed_v - reflected_v) / (2 * epsilon)
    close(derivative, jacobi, "angular variation", atol=2e-10)
    for frequency in (0, 1, 2, 3):
        integrand = np.cos(t) ** 2 - frequency ** 2 * np.sin(t) ** 2
        step = t[1] - t[0]
        index = step * (integrand[1:-1].sum() + (integrand[0] + integrand[-1]) / 2)
        close(index, np.pi / 2 * (1 - frequency ** 2), "index form")
    print(f"S^{m - 1}: Killing and Jacobi identities passed on {len(t)} time samples.")


def main():
    for dimension in (2, 4, 8):
        check_sphere(dimension)
    for dimension in (4, 8):
        check_jacobi(dimension)

    one, i, j, k, ell = np.eye(8)[:5]
    left = ternion(ternion(i, one, j), one, ell)
    right = ternion(i, one, ternion(j, one, ell))
    close(left, multiply(k, ell), "octonionic associator, left")
    close(right, -multiply(k, ell), "octonionic associator, right")
    close(np.linalg.norm(left - right), 2, "octonionic heap failure")
    print("S^7: the two sides of the full heap identity are antipodal in the basis witness.")
    print("All finite checks passed.")


if __name__ == "__main__":
    main()
