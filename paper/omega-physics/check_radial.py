"""Finite checks for RESULT.md. All non-measurement samples are test inputs."""

import numpy as np
from numpy.testing import assert_allclose, assert_array_equal

RTOL = 2e-10
ATOL = 2e-10
RNG = np.random.default_rng(20261120)
ONE = np.array([1.0, 0.0, 0.0, 0.0])
PAULI = np.array([
    [[0, 1], [1, 0]],
    [[0, -1j], [1j, 0]],
    [[1, 0], [0, -1]],
])


def close(actual, expected, **kwargs):
    assert_allclose(actual, expected, **({"rtol": RTOL, "atol": ATOL} | kwargs))


def qmul(x, y):
    scalar = x[0] * y[0] - x[1:] @ y[1:]
    vector = x[0] * y[1:] + y[0] * x[1:] + np.cross(x[1:], y[1:])
    return np.r_[scalar, vector]


def inv(x):
    return x * [1, -1, -1, -1] / (x @ x)


def heap(x, y, z):
    return qmul(qmul(x, inv(y)), z)


def norm(x):
    return np.linalg.norm(x)


def unit(x):
    return x / norm(x)


def invariants(x, y):
    return np.log(norm(y) / norm(x)), np.arccos(np.clip(unit(x) @ unit(y), -1, 1))


def phase(s, antiperiodic=False):
    s = np.abs(np.asarray(s, dtype=float))
    log_s = np.log2(np.where(s > 0, s, 1))
    if antiperiodic:
        return s * np.cos(np.pi * log_s)
    return s * (1 + 0.18 * np.sin(2 * np.pi * log_s))


def f_tent(value):
    return 2 * value**2 - 1


def matrix(q):
    real, imag_i, imag_j, imag_k = q
    z0, z1 = real + 1j * imag_i, imag_j - 1j * imag_k
    return np.array([[z0, -z1.conjugate()], [z1, z0.conjugate()]])


def test_cone():
    examples = (
        lambda s, theta: 1.0,
        lambda s, theta: -0.5,
        lambda s, theta: np.cos(theta),
        lambda s, theta: np.cos(4 * theta),
        lambda s, theta: np.cos(1.3 * s),
        lambda s, theta: np.cos(phase(s)),
        lambda s, theta: np.cos(2 * np.pi / 3 + phase(s, antiperiodic=True)),
    )
    for _ in range(128):
        w, x, y, z, a, b = RNG.normal(size=(6, 4))
        w, x, y, z, a, b = [v * np.exp(RNG.uniform(-1, 1)) for v in (w, x, y, z, a, b)]
        m = heap(x, w, x)
        close(heap(x, x, z), z)
        close(heap(x, z, z), x)
        close(heap(heap(w, x, y), z, a), heap(w, x, heap(y, z, a)))
        close(norm(heap(x, y, z)), norm(x) * norm(z) / norm(y))
        close(unit(heap(x, y, z)), heap(unit(x), unit(y), unit(z)))
        close(qmul(a, qmul(x, b)), qmul(qmul(a, x), b))
        close(qmul(inv(w), m), qmul(qmul(inv(w), x), qmul(inv(w), x)))

        product = w @ x
        close(m, (2 * product * x - (x @ x) * w) / (w @ w))
        close(norm(m), (x @ x) / norm(w))
        close(w @ m + x @ x, 2 * product**2 / (w @ w))

        s, theta = invariants(w, x)
        for transform in (lambda v: qmul(a, v), lambda v: qmul(v, b)):
            close(invariants(transform(w), transform(x)), (s, theta))
        close(invariants(x, w), (-s, theta))
        twice_s, twice_theta = invariants(w, m)
        close(twice_s, 2 * s)
        close(np.cos(twice_theta), np.cos(2 * theta))
        for f in examples:
            close(f(twice_s, twice_theta), f_tent(f(s, theta)))
            close(f(-s, theta), f(s, theta))
            close(f(s, -theta), f(s, theta))
            close(f(s, theta + 2 * np.pi), f(s, theta))

        r = norm(w)
        on_shell = r * unit(x)
        shell_m = heap(on_shell, w, on_shell)
        midpoint = (w + on_shell) / 2
        shell_k = midpoint @ midpoint
        relative = (1 + unit(w) @ unit(x)) / 2
        close(shell_k / r**2, relative)
        close(norm((w + shell_m) / 2)**2, r**2 * (2 * shell_k / r**2 - 1)**2)
        for degree in (-1.3, 0, 1, 2.5):
            k = (norm(w) * norm(x))**degree * relative
            k_after = (norm(w) * norm(m))**degree * (1 + unit(w) @ unit(m)) / 2
            close(k_after, norm(x)**(2 * degree)
                  * (2 * k / (norm(w) * norm(x))**degree - 1)**2)

        for scale in (0.4, 1, 3):
            close(norm((w - w) / 2), 0)
            close(unit(w) @ unit(-scale * w), -1)
            close(unit(w) @ unit(scale * w), 1)
    c = 1.3
    close(np.cos(c * (2 * np.pi / c)), 1)
    close(np.cos(c * np.array([-np.pi / c, np.pi / c])), [-1, -1])
    assert not np.isclose(4, (2 * 4 - 1)**2)
    close(f_tent(np.array([1, -0.5])), [1, -0.5])
    for y in (0.5, 0.25, 0.125):
        close(heap(ONE, y * ONE, ONE), ONE / y)
    # The mixed quadratic phase cannot be periodic in angle.
    small_s = 0.001
    angular_period = 2 * np.pi
    angular_offset = small_s**2 / (np.hypot(small_s, angular_period) + angular_period)
    assert np.sin(angular_offset / 2)**2 < small_s**2 * np.sin(small_s / 2)**2
    print("Cone heap, invariant comparisons, radial branches, zero sets and homogeneity passed.")


def test_mesh():
    radii = np.linspace(0, 4, 33)[:, None]
    families = (
        lambda s, theta: np.cos(3 * theta) + 0 * s,
        lambda s, theta: np.cos(phase(s)) + 0 * theta,
        lambda s, theta: np.cos(2 * np.pi / 3 + phase(s, antiperiodic=True)) + 0 * theta,
    )
    levels = range(1, 9)
    for f in families:
        last_error = None
        for level in levels:
            size = 2**level
            angles = np.arange(size)[None, :] * (2 * np.pi / size)
            values = f(radii, angles)
            parent = f(2 * radii, 2 * angles)
            signs = np.where(values >= 0, 1, -1)
            roots = signs * np.sqrt(np.maximum(0, (1 + parent) / 2))
            close(roots, values, atol=2e-8)
            if level > 1:
                close(values[:, ::2], previous_values)
            previous_values = values
            close(values[:, (-np.arange(size)) % size], values)
            midpoint_values = f(radii, angles + np.pi / size)
            interp_values = (values + np.roll(values, -1, axis=1)) / 2
            last_error = np.max(np.abs(midpoint_values - interp_values))
        assert last_error < 0.001
    # Choosing each new root negative satisfies the grid equation but not continuity.
    invalid = 1.0
    for _ in range(12):
        invalid = -np.sqrt((1 + invalid) / 2)
    assert abs(invalid - 1) > 1
    print("Dyadic-grid root and interpolation checks passed on levels 1–8.")


def test_bidoublet():
    for _ in range(128):
        q, a, b = RNG.normal(size=(3, 4))
        a, b = unit(a), unit(b)
        sigma = matrix(q)
        close(matrix(qmul(a, q)), matrix(a) @ sigma)
        close(matrix(qmul(q, inv(b))), sigma @ matrix(b).conj().T)
        close(matrix(qmul(qmul(a, q), inv(b))), matrix(a) @ sigma @ matrix(b).conj().T)
        close(matrix(qmul(qmul(-a, q), inv(-b))), matrix(qmul(qmul(a, q), inv(b))))
        close(sigma.conj().T @ sigma, (q @ q) * np.eye(2))
        close(np.linalg.det(sigma), q @ q)
        doublet = sigma[:, 1] / np.sqrt(2)
        close(np.vdot(doublet, doublet), (q @ q) / 2)
        close(sigma[:, 0] / np.sqrt(2), 1j * PAULI[1] @ doublet.conj())
        beta = RNG.uniform(-np.pi, np.pi)
        clock = np.diag(np.exp(1j * beta * np.array([0.5, -0.5])))
        clocked = sigma @ clock.conj().T
        close(clocked[:, 1], np.exp(1j * beta / 2) * sigma[:, 1])
        close(clocked[:, 0], np.exp(-1j * beta / 2) * sigma[:, 0])
        close(clock @ matrix(ONE) @ clock.conj().T, matrix(ONE))
    close(PAULI[2] / 2 + np.eye(2) / 2, np.diag([1, 0]))
    b_minus_l = np.array([-1, 1/3, 1/3, 1/3])
    right_isospin = np.array([0.5, -0.5])
    hypercharge = b_minus_l[:, None] / 2 + right_isospin[None, :]
    close(hypercharge[0], [0, -1])
    close(hypercharge[1:], np.tile([2/3, -1/3], (3, 1)))
    close(b_minus_l / 2, [-0.5, 1/6, 1/6, 1/6])
    close(np.sum((b_minus_l / 2)**2), 1/3)
    close(np.trace((PAULI[2] / 2) @ (PAULI[2] / 2)), 1/2)
    g_r = g_l = g_4 = 1.7
    g_y_squared = 1 / (g_r**-2 + 2 / (3 * g_4**2))
    close(g_y_squared / (g_l**2 + g_y_squared), 3/8)
    print("Quaternionic matrix, doublet, clock, charge and G hypercharge checks passed.")


def test_electroweak():
    for _ in range(128):
        w1, w2, w3, b, h = RNG.normal(size=5)
        g, gp, v, quartic = RNG.uniform(0.2, 3, size=4)
        generators = g * (np.array([w1, w2, w3]) @ (PAULI / 2).reshape(3, 4)).reshape(2, 2)
        generators += gp * b * np.eye(2) / 2
        doublet = np.array([0, (v + h) / np.sqrt(2)])
        applied = generators @ doublet
        evaluated = np.vdot(applied, applied)
        mixing = np.hypot(g, gp)
        cosine = g / mixing
        mass_w, mass_z = g * v / 2, mixing * v / 2
        z = (g * w3 - gp * b) / mixing
        a = (gp * w3 + g * b) / mixing
        w_plus = (w1 - 1j * w2) / np.sqrt(2)
        electric = g * gp / mixing
        close(evaluated, (v + h)**2 / 8 * (g**2 * (w1**2 + w2**2) + (g*w3 - gp*b)**2))
        close(evaluated, (1 + h/v)**2 * (mass_w**2 * abs(w_plus)**2 + mass_z**2 * z**2 / 2))
        close(w3**2 + b**2, z**2 + a**2)
        close(g * gp / mixing * (PAULI[2] + np.eye(2)) / 2, electric * np.diag([1, 0]))
        close(mass_w**2 / (mass_z**2 * cosine**2), 1)

        base = mass_w**2 * abs(w_plus)**2 + mass_z**2 * z**2 / 2
        nonzero_h = 0.31 * v
        mass_factor = lambda offset: base * ((v + offset) / v)**2
        linear = (mass_factor(nonzero_h) - mass_factor(-nonzero_h)) / (2 * nonzero_h)
        quadratic = (mass_factor(nonzero_h) + mass_factor(-nonzero_h) - 2 * base) / (2 * nonzero_h**2)
        close(linear, 2 * base / v)
        close(quadratic, base / v**2)

        mu_squared = -2 * quartic * v**2
        radius = RNG.uniform(0, 3 * v)
        potential = lambda r: mu_squared * r**2 + quartic * r**4
        close(potential(radius) - potential(v), quartic * (radius**2 - v**2)**2)
        coeffs = np.array([quartic, 0, mu_squared, 0, 0])
        close(np.polyval(np.polyder(coeffs), v), 0)
        radial_mass_squared = 8 * quartic * v**2
        close(np.polyval(np.polyder(coeffs, 2), v), radial_mass_squared)
        close(np.polyval(np.polyder(coeffs, 3), v) / 6, radial_mass_squared / (2*v))
        close(np.polyval(np.polyder(coeffs, 4), v) / 24, radial_mass_squared / (8*v**2))

        # Arbitrary tangent data give the pointwise polar kinetic identity.
        n = unit(RNG.normal(size=4))
        tangent = RNG.normal(size=4)
        tangent -= (n @ tangent) * n
        dr = RNG.normal()
        close(norm(dr * n + radius * tangent)**2, dr**2 + radius**2 * norm(tangent)**2)

    v = 1.7
    mass2 = 2.4
    s, t, u = np.array([3.1, -1.2, -1.9]) * v**2
    for x in [s, t, u, 0]:
        close(x / v**2 - x**2 / (v**2 * (x - mass2)), -mass2 * x / (v**2 * (x - mass2)))
    hi = 1e6 * mass2
    close(-mass2 * hi / (v**2 * (hi - mass2)), -mass2 / v**2, rtol=2e-6)
    close((3*s + t + u) / (32 * np.pi * v**2), s / (16 * np.pi * v**2))
    close((8 * np.pi * v**2) / (16 * np.pi * v**2), 0.5)
    heavy2 = 1e7 * s
    close(s / v**2 - s**2 / (v**2 * (s - heavy2)), s / v**2, rtol=2e-7)
    dn_squared = 0.91
    h_leading = v * dn_squared / heavy2
    close(v * h_leading * dn_squared - heavy2 * h_leading**2 / 2,
          v**2 * dn_squared**2 / (2 * heavy2))
    print("Scalar potential, polar kinetic term, masses, modifiers, amplitudes and freezing passed.")


def test_caps():
    for _ in range(128):
        n, q = unit(RNG.normal(size=4)), RNG.normal(size=4)
        a = RNG.uniform(0.05, np.pi - 0.05)
        t, u = -np.cos(a) / np.sin(a), n / np.sin(a)
        close(u @ u - t**2, 1)
        dot = n @ unit(q)
        cap = dot > np.cos(a)
        assert_array_equal(cap, (1 + dot) / 2 > np.cos(a / 2)**2)
        assert_array_equal(cap, t * norm(q) + u @ q > 0)
        for scale in (0.13, 1, 11):
            assert_array_equal(cap, t * norm(scale*q) + u @ (scale*q) > 0)
    close(np.cos(np.array([0, np.pi]) / 2)**2, [1, 0])
    assert np.cos(0) > 0 and np.cos(np.pi) < 0 and np.cos(2*np.pi) > 0
    print("Cap hyperboloid, ray factorization and radial-shell example passed.")


def test_quoted_numbers():
    # External measurements are transcriptions of the two cited TeX passages.
    higgs, higgs_error = 125.13, 0.11
    k_v, k_v_error = 1.023, 0.026
    k_2v, k_2v_error = 1.02, 0.23
    for estimate, error in [(k_v, k_v_error), (k_2v, k_2v_error)]:
        assert estimate - error <= 1 <= estimate + error
    assert higgs - higgs_error > 0
    for v in (0.5 * higgs, higgs, 2 * higgs):
        quartic = higgs**2 / (8 * v**2)
        close(np.sqrt(8 * quartic * v**2), higgs)

    w, w_error = 80.3625, 0.0077
    z, z_error = 91.1879, 0.0020
    weak_angle = 1 - (w/z)**2
    weak_error = np.hypot(2 * w / z**2 * w_error, 2 * w**2 / z**3 * z_error)
    assert (round(weak_angle, 5), round(weak_error, 5)) == (0.22334, 0.00015)

    msbar_weak_angle, msbar_error = 0.23122, 0.00006
    msbar_w = z * np.sqrt(1 - msbar_weak_angle)
    rho_from_masses = (w / msbar_w)**2
    assert all(z * np.sqrt(1 - angle) < w
               for angle in (msbar_weak_angle - msbar_error, msbar_weak_angle + msbar_error))
    assert round(msbar_w, 3) == 79.954
    assert round(100 * (w / msbar_w - 1), 2) == 0.51
    assert round(rho_from_masses, 4) == 1.0103
    t_parameter, t_error = 0.021, 0.055
    for alpha_inverse in (127.95, 128.9):
        assert (round(1e4 * t_parameter / alpha_inverse, 1),
                round(1e4 * t_error / alpha_inverse, 1)) == (1.6, 4.3)
    # Follow the paper's matching-scale example with its PDG 2024 strong-coupling input.
    alpha_y = (1 - msbar_weak_angle) * 127.95
    alpha_l = msbar_weak_angle * 127.95
    alpha_3 = 1 / 0.1180
    slope_y, slope_l, slope_3 = -np.array([41/6, -19/6, -7]) / (2*np.pi)
    log_scale = (3 * alpha_y - 5 * alpha_l) / (5 * slope_l - 3 * slope_y)
    at_crossing = np.array([alpha_y, alpha_l, alpha_3]) + log_scale * np.array([
        slope_y, slope_l, slope_3,
    ])
    close(at_crossing[1] / (at_crossing[0] + at_crossing[1]), 3/8)
    assert round(at_crossing[1] - at_crossing[2], 1) == 5.6
    print("Quoted arithmetic passed: 0.22334(15), 79.954 GeV, 0.51%, 1.0103 and (1.6 ± 4.3) × 10⁻⁴.")
    print("Both quoted scalar coupling intervals contain 1.")


if __name__ == "__main__":
    test_cone()
    test_mesh()
    test_bidoublet()
    test_electroweak()
    test_caps()
    test_quoted_numbers()
    print("All finite checks passed.")
