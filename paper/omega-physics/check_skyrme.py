#!/usr/bin/env python3
"""Finite reproducibility checks for section.tex. Third-party dependency: NumPy.

The exact arguments and the scope of cited existence and topology results are
in the section. These tests check their algebraic inputs and worked examples.
"""
import numpy as np


I2 = np.eye(2, dtype=complex)
E = -1j * np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])
EPS = np.cross(np.eye(3)[:, None], np.eye(3)[None, :])
PAIRS = [(0, 1), (0, 2), (1, 2)]
CYCLIC = [(0, 1, 2), (1, 2, 0), (2, 0, 1)]
NODES, WEIGHTS = np.polynomial.legendre.leggauss(128)
RNG = np.random.default_rng(20261120)


def close(actual, expected, atol=1e-10):
    np.testing.assert_allclose(actual, expected, rtol=1e-10, atol=atol)


def lie(vector):
    return np.einsum("...a,aij->...ij", vector, E)


def matrix(q):
    return q[0] * I2 + lie(q[1:])


def trace(value):
    return np.trace(value, axis1=-2, axis2=-1)


def comm(a, b):
    return a @ b - b @ a


def norm_sq(vector):
    return np.sum(vector * vector, axis=-1)


def wedge_sq(a, b):
    return norm_sq(a) * norm_sq(b) - np.sum(a * b, axis=-1) ** 2


def frame_vector(values):
    return (-trace(np.asarray(values)[..., None, :, :] @ E) / 2).real


def quadrature(function, lo, hi):
    half = (hi - lo) / 2
    return half * np.dot(WEIGHTS, function((hi + lo) / 2 + half * NODES))


def stereographic(x, a):
    r2 = x @ x
    denominator = r2 + a * a
    q = np.r_[(r2 - a * a) / denominator, -2 * a * x / denominator]
    dq = np.vstack((4 * a * a * x / denominator**2,
                    -2 * a * np.eye(3) / denominator
                    + 4 * a * np.outer(x, x) / denominator**2))
    return q, dq


def algebra_and_flat_bound():
    for i, j, k in np.ndindex(3, 3, 3):
        close(E[i] @ E[j], -(i == j) * I2 + lie(EPS[i, j]))
        close(trace(E[i] @ E[j] @ E[k]), -2 * EPS[i, j, k])
    v, e = 1.7, 0.83
    for ell in RNG.normal(size=(256, 3, 3)):
        current = lie(ell)
        static_quadratic = -v**2 * trace(current @ current).sum() / 4
        static_quartic = 0
        for i, j in np.ndindex(3, 3):
            area = comm(current[i], current[j])
            close(area, 2 * lie(np.cross(ell[i], ell[j])))
            close(-trace(area @ area), 8 * wedge_sq(ell[i], ell[j]))
            static_quartic -= trace(area @ area) / (32 * e**2)
        s = np.linalg.svd(ell, compute_uv=False)
        pair_sum = sum(s[i] ** 2 * s[j] ** 2 for i, j in PAIRS)
        close(static_quadratic, v**2 * norm_sq(s) / 2)
        close(static_quartic, pair_sum / (2 * e**2))
        density = (static_quadratic + static_quartic).real
        bound = 3 * v / e * abs(np.linalg.det(ell))
        close(density, bound + sum(
            (v * s[i] - s[j] * s[k] / e) ** 2 for i, j, k in CYCLIC
        ) / 2)
        assert density >= bound - 1e-10
    # Rank-one quartic invariant and pointwise equality cases.
    line = E[0]
    close(comm(line, 2 * line), 0)
    close(trace(line @ line) ** 2, 4)
    # Symmetric pair su(2)/u(1): only the horizontal bracket projects to h.
    ell = RNG.normal(size=(2, 3))
    p0, p1 = ell[:, :2] @ np.eye(3)[:2]
    close((2 * np.cross(*ell))[2], (2 * np.cross(p0, p1))[2])
    close(np.cross(p0, p1)[:2], 0)
    for s in (np.zeros(3), np.full(3, v * e)):
        close([v * s[i] - s[j] * s[k] / e for i, j, k in CYCLIC], 0)
    f_standard, e_standard = v / np.sqrt(2), np.sqrt(2) * e
    close(12 * np.pi**2 * f_standard / e_standard, 6 * np.pi**2 * v / e)
    close(3 * np.pi**2 * (2 * v) / e, 6 * np.pi**2 * v / e)
    # A one-axis exponential has zero area. The bump radii are summable.
    center_values = np.cos(1) * I2 + np.sin(1) * E[2]
    assert np.linalg.norm(center_values - I2) > 0
    radii = np.exp2(-np.arange(1, 51, dtype=float) - 2)
    assert np.all(radii[:-1] + radii[1:] < 1)
    close(radii.sum(), 1 / 4)


def stereography_and_scaling():
    a, v, e = 1.2, 1.7, 0.83
    for x in np.vstack((np.zeros(3), RNG.normal(size=(32, 3)))):
        q, dq = stereographic(x, a)
        scale = 2 * a / (a**2 + x @ x)
        close(q @ q, 1)
        close(q @ dq, 0)
        close(dq.T @ dq, np.eye(3) * scale**2)
        if np.any(x):
            y = x / (x @ x)
            close(q, np.r_[1 - a*a*(y @ y), -2*a*y] / (1 + a*a*(y @ y)))
        current = matrix(q).conj().T @ np.array([matrix(col) for col in dq.T])
        jacobian = np.linalg.det(frame_vector(current))
        close(jacobian, scale**3)
        close(np.linalg.det(frame_vector(current) * [-1, 1, 1]), -scale**3)
    q, dq = stereographic(np.zeros(3), a)
    close(q, [-1, 0, 0, 0])
    close(frame_vector(-np.array([matrix(col) for col in dq.T])), 2 * np.eye(3) / a)

    def stretch_integrals(radius):
        return np.array([
            quadrature(lambda t: 4 * np.pi * 2**p * radius**(3-p)
                       * np.sin(t)**2 * np.cos(t)**(2*p-4), 0, np.pi / 2)
            for p in (2, 3, 4)
        ])

    i2, i3, i4 = stretch_integrals(a)
    close([i2, i3, i4], [4 * np.pi**2 * a, 2 * np.pi**2, 2 * np.pi**2 / a])
    energy2, energy4 = 1.5 * v**2 * i2, 1.5 * i4 / e**2
    close(energy2, 6 * np.pi**2 * v**2 * a)
    close(energy4, 3 * np.pi**2 / (e**2 * a))
    for tau in (0.01, 0.5, 1.0, 2.0, 20.0):
        close(stretch_integrals(a * tau), [tau * i2, i3, i4 / tau])
    tau = np.sqrt(energy4 / energy2)
    close(tau * a, 1 / (np.sqrt(2) * v * e))
    close(tau * energy2, energy4 / tau)
    trial = tau * energy2 + energy4 / tau
    close(trial, 6 * np.sqrt(2) * np.pi**2 * v / e)
    assert 6 * np.pi**2 * v / e < trial < 18 * np.pi**2 * v / e
    # Every split of ±1 has both signs. Check two-part and higher splits.
    for pieces in RNG.integers(-20, 21, size=(256, 4)):
        for q in (-1, 1):
            split = np.r_[pieces, q - pieces.sum()]
            if np.count_nonzero(split) > 1:
                assert np.abs(split).sum() >= 3


def hopf_geometry_and_bound():
    v, e, sobolev = 1.7, 0.83, 1.1
    a2, a4 = v**2 / 8, 1 / (32 * e**2)
    axis = np.array([0, 0, 1])
    for ell in RNG.normal(size=(256, 3, 3)):
        dn = frame_vector(comm(lie(ell), E[2]))
        close(dn, 2 * np.cross(ell, axis))
        f = np.array([np.cross(dn[i], dn[j]) @ axis for i, j in PAIRS])
        cross = np.array([np.cross(ell[i], ell[j]) for i, j in PAIRS])
        close(f, 4 * cross[:, 2])
        close(norm_sq(dn).sum(), 4 * norm_sq(ell[:, :2]).sum())
        assert np.linalg.norm(f) <= norm_sq(dn).sum() / 2 + 1e-10
        assert a2 * norm_sq(dn).sum() + a4 * norm_sq(f) <= (
            v**2 * norm_sq(ell).sum() / 2 + norm_sq(cross).sum() / (2 * e**2)
            + 1e-10
        )
        primitive = -2 * ell[:, 2]
        close(primitive @ [f[2], -f[1], f[0]], -8 * np.linalg.det(ell))
    close(-(-8 * 2 * np.pi**2) / (4 * np.pi)**2, 1)
    close(comm(E[2], E[2]), 0)
    # Discrete Hölder and interpolation, then inversion of the bound on XY.
    for f in np.abs(RNG.normal(size=(64, 64))):
        y = f @ f
        x = 2 * f.sum()
        norm_6_5 = (f**1.2).sum()**(5 / 6)
        assert norm_6_5 <= f.sum()**(2 / 3) * y**(1 / 6) + 1e-10
        q_upper = sobolev * (x * y / 2)**(2 / 3) / (16 * np.pi**2)
        coefficient = 2 * np.sqrt(2 * a2 * a4) * (16 * np.pi**2 / sobolev)**(3 / 4)
        close(coefficient * q_upper**(3 / 4), 2 * np.sqrt(a2 * a4 * x * y))
        assert a2 * x + a4 * y >= coefficient * q_upper**(3 / 4) - 1e-10
        tau = np.sqrt(a4 * y / (a2 * x))
        close(tau * a2 * x, a4 * y / tau)
    # Coulomb Fourier symbol on nonzero frequencies for an exact two-form.
    for k, z in RNG.normal(size=(24, 2, 3)):
        b = z - k * (k @ z) / (k @ k)
        f_dual = 1j * np.cross(k, b)
        close(1j * np.cross(k, f_dual) / (k @ k), b)
        close(k @ b, 0)
        close(np.vdot(f_dual, f_dual), (k @ k) * (b @ b))


def rotations():
    for angle in (0, np.pi / 2, np.pi, 2 * np.pi, 4 * np.pi):
        g = np.cos(angle / 2) * I2 + np.sin(angle / 2) * E[2]
        rotation = frame_vector(g @ E @ g.conj().T).T
        c, s = np.cos(angle), np.sin(angle)
        close(rotation, [[c, -s, 0], [s, c, 0], [0, 0, 1]])
        q, _ = stereographic(np.array([1., 2., 3.]), 0.8)
        close(matrix(np.r_[q[0], rotation @ q[1:]]), g @ matrix(q) @ g.conj().T)
    for twice_j in range(12):
        close(np.prod(np.full(twice_j, -1, dtype=int)), (-1)**twice_j)
        close(np.exp(1j * np.pi * twice_j), (-1)**twice_j)
    close(np.cos(np.pi) * I2, -I2)
    close(np.cos(2 * np.pi) * I2, I2)


def compact_geometry_and_stress():
    v, e = 1.5, 0.7
    for radius in (0.4, 1.5, 2.0, 1 / (v * e)):
        volume = 2 * np.pi**2 * radius**3

        def area(r):
            return 4 * np.pi * radius**2 * np.sin(r / radius)**2

        for r in radius * np.linspace(0, np.pi, 17):
            close(quadrature(area, 0, r),
                  np.pi * radius**3 * (2 * r / radius - np.sin(2 * r / radius)))
            assert area(r) <= area(np.pi * radius / 2) + 1e-10
        close(quadrature(area, 0, np.pi * radius / 2), volume / 2)
        close(area(np.pi * radius / 2), 4 * np.pi * radius**2)
        close(area(np.pi * radius), 0)
        rho2, rho4 = 1.5 * v**2 / radius**2, 1.5 / (e**2 * radius**4)
        close(volume * np.array([rho2, rho4]),
              [3 * np.pi**2 * v**2 * radius, 3 * np.pi**2 / (e**2 * radius)])
        dp_denominator = 6 * np.pi**2 * radius**2
        close(-3 * np.pi**2 * v**2 / dp_denominator, -rho2 / 3)
        close(3 * np.pi**2 / (e**2 * radius**2 * dp_denominator), rho4 / 3)
        assert (2 * rho2 + 4 * rho4) / 3 > 0
        close((v / radius - 1 / (e * radius**2))**2, 0 if radius == 1 / (v * e)
              else 2 * (rho2 + rho4 - 3 * v / (e * radius**3)) / 3)

        # Four independent linear harmonics and one degree-two harmonic.
        theta = np.linspace(0.2, np.pi - 0.2, 15)
        f0, f1 = radius * np.cos(theta), radius * np.sin(theta)
        close((-f0 - 2 / np.tan(theta) * radius * np.sin(theta)) / radius**2,
              -3 * f0 / radius**2)
        close((-f1 + 2 / np.tan(theta) * radius * np.cos(theta)
               - 2 * f1 / np.sin(theta)**2) / radius**2, -3 * f1 / radius**2)
        close(-2 * (2 + 2), -8)
    close(np.bincount([mask.bit_count() for mask in range(8)]), [1, 3, 3, 1])
    close([norm_sq(np.ones(3) / 2) * 4], [3])


def gauge_and_radial():
    v, e, g, lam = 1.7, 0.83, 0.2, 0.37
    for _ in range(40):
        x = RNG.normal(size=3)
        q, dq = stereographic(x, 0.9)
        field = matrix(q)
        inverse = field.conj().T
        dfield = np.array([matrix(col) for col in dq.T])
        p = -dfield @ inverse
        close(dfield + p @ field, 0)
        current = inverse @ dfield
        a = lie(RNG.normal(size=(3, 3)))
        c = RNG.normal(size=(3, 1, 1)) * E[2]
        left = matrix(stereographic(RNG.normal(size=3), 1)[0])
        right = np.cos(0.37) * I2 + np.sin(0.37) * E[2]
        # Independent infinitesimal jets of the two gauge transformations.
        da = lie(RNG.normal(size=(3, 3))) @ left
        dt = RNG.normal(size=(3, 1, 1)) * E[2] @ right
        field_new = left @ field @ right.conj().T
        dfield_new = da @ field @ right.conj().T + left @ dfield @ right.conj().T
        dfield_new -= field_new @ dt @ right.conj().T
        a_new = left @ a @ left.conj().T - da @ left.conj().T
        c_new = right @ c @ right.conj().T - dt @ right.conj().T
        close(field_new.conj().T @ (dfield_new + a_new @ field_new - field_new @ c_new),
              right @ (current + inverse @ a @ field - c) @ right.conj().T)
        ell = current + inverse @ a @ field - c
        right_current = dfield @ inverse
        for i, j in PAIRS:
            # Exact identity for the curvature of the transformed connection.
            derivative = comm(a[j], right_current[i]) - comm(a[i], right_current[j])
            d_left = -comm(current[i], current[j]) + inverse @ derivative @ field
            lhs = d_left + comm(c[i], ell[j]) + comm(ell[i], c[j]) + comm(ell[i], ell[j])
            close(lhs, inverse @ comm(a[i], a[j]) @ field - comm(c[i], c[j]))
            bracket = comm(current[i], current[j])
            close(wedge_sq(v * dq[:, i], v * dq[:, j]) / (4 * e**2 * v**4),
                  -trace(bracket @ bracket) / (32 * e**2))

    kappa = 16 * e**2 / g**2
    for t in np.linspace(0, 1, 11):
        a = t * p
        d_a = -t * comm(p[0], p[1])
        close(d_a + comm(a[0], a[1]), t * (t - 1) * comm(p[0], p[1]))
        close(inverse @ (dfield + a @ field), (1 - t) * current)
        cs_ratio = (-t**2 + 2 * t**3 / 3) / (-1 / 3)
        close(cs_ratio, 3 * t**2 - 2 * t**3)
    q2, q4 = v**2, e**-2
    for k in (0.1, 23.5, 24.0, 25.0, kappa):
        coeffs = [-3 * (1 + k), 6 + k, -3]
        close(coeffs[1]**2 - 4 * coeffs[0] * coeffs[2], k * (k - 24))
        poly = np.polynomial.Polynomial([1, -1])**4 * np.polynomial.Polynomial([1, -2, 1 + k])
        for t in np.linspace(0, 1, 17):
            close(poly.deriv()(t), 2 * (1 - t)**3 * np.polyval(coeffs, t))
            reduced = (1 - t)**2 + k*t*t
            scale = np.sqrt(q4 * reduced / q2)
            energy2 = scale * q2 * (1 - t)**2
            energy4 = q4 * (1 - t)**2 * reduced / scale
            close(energy2, energy4)
            close(energy2 + energy4, 2 * np.sqrt(q2*q4) * (1-t)**2 * np.sqrt(reduced))
        close(np.sqrt(q4 * k / q2), np.sqrt(q4 / q2) * np.sqrt(k))
        if k > 24:
            minimum, maximum = np.sort(np.roots(coeffs))
            assert 0 < minimum < maximum < 1
            assert poly.deriv(2)(minimum) > 0 > poly.deriv(2)(maximum)
            assert poly(maximum) > poly(minimum) > 0
    h = np.polynomial.Polynomial([0., 1.])
    r = v + h
    close((lam * (r*r - v*v)**2).deriv(2)(0), 8 * lam * v**2)
    close((r*r / v**2).coef, [1., 2 / v, 1 / v**2])
    # Goldstone contact plus radial exchange in each kinematic channel.
    mass2 = 8 * lam * v**2
    channels = mass2 * np.array([-8., -1.5, 0., 0.25, 1.5, 12.])
    close(channels / v**2 - channels**2 / (v**2 * (channels - mass2)),
          -mass2 * channels / (v**2 * (channels - mass2)))
    close(-mass2 * 1e9 / (1e9 - 1) / v**2, -mass2 / v**2, atol=2e-8)
    angle = np.arctan(0.4 / g)
    close(g**2 / (g**2 + 0.4**2), np.cos(angle)**2)
    # Orthogonal radial/tangential parts of a bivector as skew matrices.
    n = np.r_[1., 0., 0., 0.]
    u, w = np.eye(4)[1:3]
    h0, h1 = 0.31, 0.17
    bivector = lambda a, b: np.outer(a, b) - np.outer(b, a)
    actual = bivector(h0 * n + v * u, h1 * n + v * w)
    close(np.sum(actual**2) / 2, v**2 * (h0**2 + h1**2) + v**4)
    close(v * ((1 - 0.5) * (-n) + 0.5 * n), 0)
    assert np.linalg.norm(n - u) > 0


def affine_and_comparison():
    for _ in range(40):
        points = RNG.normal(size=(4, 4))
        points /= np.linalg.norm(points, axis=1)[:, None]
        a, b, c, delta = points
        cosine = a @ b
        close(norm_sq((a+b)/2), (1 + cosine) / 2)
        close(np.cos(np.arccos(cosine) / 2)**2, (1 + cosine) / 2)
        close(norm_sq(2*b-a), 5 - 4*cosine)
        assert norm_sq((a+b)/2) < 1 < norm_sq(2*b-a)
        close((a+b-(c+delta)) - (a+b-c), -delta)
        aa, bb = matrix(a), matrix(b)
        reflected = bb @ aa.conj().T @ bb
        close(reflected.conj().T @ reflected, I2)
        close((-aa) @ aa.conj().T @ (-aa), aa)
        # Profile at probe a separates state a from all other sampled states.
        assert (1 + a @ b) / 2 < (1 + a @ a) / 2


if __name__ == "__main__":
    for test in (algebra_and_flat_bound, stereography_and_scaling,
                 hopf_geometry_and_bound, rotations, compact_geometry_and_stress,
                 gauge_and_radial, affine_and_comparison):
        test()
        print(f"PASS {test.__name__}")
    print("All mathematical example and coefficient checks passed.")
