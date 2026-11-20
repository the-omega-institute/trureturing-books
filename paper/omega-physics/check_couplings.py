"""Finite NumPy checks of the d3 reduction, traces, and one-loop matching."""

import numpy as np
from numpy.testing import assert_allclose


MZ = 91.1879
MP = 1.22e19
MBAR = MP / np.sqrt(8 * np.pi)
EM = 127.95
S_Z = 0.23122
A_Z = np.array([(1 - S_Z) * EM, S_Z * EM, 1 / 0.1180])
B_SM = np.array([41 / 6, -19 / 6, -7])
IDENTITY_2 = np.eye(2)
PAULI = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])


def near(actual, expected, *, rtol=1e-11, atol=1e-11):
    assert_allclose(actual, expected, rtol=rtol, atol=atol)


def inverse_radius(a_weak):
    return MBAR * np.sqrt(4 * np.pi / a_weak) / np.sqrt(8)


def energy(log_interval):
    return MZ * np.exp(2 * np.pi * log_interval)


def qmul(a, b):
    scalar = a[0] * b[0] - a[1:] @ b[1:]
    vector = a[0] * b[1:] + b[0] * a[1:] + np.cross(a[1:], b[1:])
    return np.r_[scalar, vector]


def conjugate(a):
    return a * [1, -1, -1, -1]


def check_geometry():
    # Integrate quadratic expressions exactly using a sphere's coordinate points.
    basis = np.eye(4)
    imaginary = basis[1:]
    left = np.array([[qmul(t, q) / 2 for t in imaginary] for q in basis])
    right = np.array([[-qmul(q, t) / 2 for t in imaginary] for q in basis])
    for radius in (0.25, 1, 3.7):
        for fields in (left, right):
            near(radius**2 * (fields @ fields.transpose(0, 2, 1)),
                 np.broadcast_to(radius**2 * np.eye(3) / 4, (4, 3, 3)))
        near(radius**2 * (left @ right.transpose(0, 2, 1)).mean(axis=0),
             np.zeros((3, 3)))
        g_squared = 8 / (MBAR * radius)**2
        near(g_squared * (MBAR**2 / 8) * radius**2, 1)
        for copies in (1, 2, 3):
            near(2 / (MBAR**2 * copies * radius**2 / 4), g_squared / copies)

        q = np.array([1, 2, 3, 4]) / np.sqrt(30)
        axis = imaginary[-1]
        hopf = radius / 2 * qmul(qmul(q, axis), conjugate(q))
        near(np.linalg.norm(hopf), radius / 2)
        for u in imaginary:
            commutator = qmul(u, axis) - qmul(axis, u)
            speed = np.linalg.norm(qmul(qmul(q, commutator), conjugate(q))) * radius / 2
            near(speed, radius * np.linalg.norm(u[1:3]))
        sphere = radius / 2 * np.eye(3)
        rotation_norm = np.mean(np.linalg.norm(np.cross(axis[1:], sphere), axis=1)**2)
        near(rotation_norm, radius**2 / 6)
        near(2 / rotation_norm, 12 / radius**2)
        # Period-2pi versus fundamental generators of the Hopf circle.
        t = 2 * np.pi
        near([np.cos(t / 2), np.sin(t / 2)], [-1, 0])
        near([np.cos(t), np.sin(t)], [1, 0])
        near(np.linalg.norm(2 * right[0, -1]), 1)

    t15 = np.diag([1, 1, 1, -3]) / (2 * np.sqrt(6))
    near(np.trace(t15 @ t15), 0.5)
    near(np.sqrt(2 / 3) * np.diag(t15), [1 / 6, 1 / 6, 1 / 6, -1 / 2])
    real_generator = np.block([[np.zeros((4, 4)), -t15], [t15, np.zeros((4, 4))]])
    near(np.mean(np.sum(real_generator**2, axis=0)), 1 / 8)
    near(2 / (1 / 8), 4**2)
    radius_ratios = np.array([1, np.sqrt(2), 2, np.sqrt(3)])
    q4 = radius_ratios**2 / 2
    near(q4, [1 / 2, 1, 2, 3 / 2])
    near(np.sqrt(1 / (1 + 2 * q4 / 3)),
         np.sqrt([3 / 4, 3 / 5, 3 / 7, 1 / 2]))
    near(1 / (2 + 2 * q4 / 3), [3 / 7, 3 / 8, 3 / 10, 1 / 3])
    near(6 / radius_ratios[-1]**2, 2)
    first_masses = np.minimum(np.sqrt(3), np.sqrt(7) / radius_ratios)
    assert np.min(first_masses) >= np.sqrt(7) / 2
    assert np.max(first_masses) <= np.sqrt(3)
    assert 8 * 7 // 2 - (4**2 - 1) == 13
    assert 3**2 - 1 > 2**2 - 1

    for n in (2, 3, 4):
        diag = np.r_[0.5, -0.5, np.zeros(n - 2)]
        ad_eigenvalues = diag[:, None] - diag[None, :]
        near(np.sum(ad_eigenvalues**2), 2 * n * (diag @ diag))
    for dimensions in ([2], [3], [3, 3, 3], [7, 3]):
        d = sum(dimensions)
        scalar = sum(di * (di - 1) for di in dimensions)
        cosmological = (d + 2) * scalar / (2 * d)
        near(-2 * d * cosmological + (d + 2) * scalar, 0)
        second = 2 * d**2 * cosmological - (d + 2)**2 * scalar
        near(second / 2, -(d + 2) * scalar)
        assert second < 0 and d * (d + 2) / 2 > 0

    # Horizontal Heisenberg bracket example: sectional curvatures -3/4, 1/4, 1/4.
    bracket = np.zeros((3, 3, 3))
    bracket[0, 1, 2], bracket[1, 0, 2] = -1, 1
    connection = (bracket - bracket.transpose(2, 0, 1)
                  + bracket.transpose(1, 2, 0)) / 2
    curvatures = []
    for i, j in ((0, 1), (0, 2), (1, 2)):
        curvatures.append(connection[j, j] @ connection[i, :, i]
                          - connection[i, j] @ connection[j, :, i]
                          - bracket[i, j] @ connection[:, j, i])
    near(curvatures, [-3 / 4, 1 / 4, 1 / 4])
    near(2 * sum(curvatures), -2 / 4)
    print("PASS connection metric, Killing norms, clock quotient, and radion")


def check_heat_and_matter():
    gamma = 1j * np.array([np.kron(PAULI[0], p) for p in PAULI]
                          + [np.kron(PAULI[1], IDENTITY_2)])
    for mu, nu, lam, sig in np.ndindex(4, 4, 4, 4):
        delta = np.eye(4)
        actual = np.trace(gamma[mu] @ gamma[nu] @ gamma[lam] @ gamma[sig])
        expected = 4 * (delta[mu, nu] * delta[lam, sig]
                        - delta[mu, lam] * delta[nu, sig]
                        + delta[mu, sig] * delta[nu, lam])
        near(actual, expected)

    rng = np.random.default_rng(318)
    raw = rng.normal(size=(4, 4))
    field = raw - raw.T
    antihermitian = 1j * field
    e_term = -sum(gamma[i] @ gamma[j] * antihermitian[i, j]
                  for i, j in np.ndindex(4, 4)) / 2
    spin_e_squared = np.trace(e_term @ e_term)
    spin_omega_squared = 4 * np.sum(antihermitian**2)
    near(spin_e_squared, -2 * np.sum(antihermitian**2))
    coefficient = spin_e_squared / 2 + spin_omega_squared / 12
    near(coefficient, (2 / 3) * np.sum(field**2))
    near(4 * coefficient / np.sum(field**2), 8 / 3)

    dims = np.array([6, 3, 3, 2, 1, 1])
    charges = np.array([1 / 6, 2 / 3, -1 / 3, -1 / 2, -1, 0])
    near(dims * charges**2, [1 / 6, 4 / 3, 1 / 3, 1 / 2, 1, 0])
    y = np.repeat(charges, dims)
    t3 = np.r_[np.tile([0.5, -0.5], 3), np.zeros(6), [0.5, -0.5], 0, 0]
    near([y @ y, t3 @ t3, t3 @ y, (t3 + y) @ (t3 + y)], [10 / 3, 2, 0, 16 / 3])
    near(2 / ((t3 + y) @ (t3 + y)), 3 / 8)
    near(4 * 0.5, 2)  # either parent weak factor and the four defining colour copies
    near(3 * np.array([2, 2, 2, 10 / 3]), [6, 6, 6, 10])
    near(4 * np.diag([0.5, -0.5]) @ np.diag([0.5, -0.5]), IDENTITY_2)
    near(sum(np.array([0.5, 0.5])**2), 0.5)
    for target in (0.01, 0.85, 1, 6, 100):
        w_light = max(0, 2 * target - 3) + 1
        w_up = ((3 + w_light) / target - 2) / 2
        assert w_up > 0
        near((3 + w_light) / (2 + 2 * w_up), target)

    # The manuscript cites these colour and anomaly calculations from Paper II.
    for colours in range(2, 17):
        q = 1 / (2 * colours)
        up, down = q + 0.5, q - 0.5
        charge_trace = 2 * (1 + colours * (up**2 + down**2))
        weak_trace = (colours + 1) / 2
        near(charge_trace, (colours + 1)**2 / colours)
        near(weak_trace / charge_trace, colours / (2 * (colours + 1)))
        fixed = weak_trace / (2 * (1 + 5 * colours / 9))
        near(weak_trace / charge_trace - fixed,
             (colours**2 - 9) / (4 * (colours + 1) * (9 + 5 * colours)))
        for t, w in [(0.7, 0.7), (0.7, -0.7), (0.7, 0.2)]:
            u, d, light = -q + t, -q - t, -colours * q
            e, n = colours * q + w, colours * q - w
            cubic = colours * (2 * q**3 + u**3 + d**3) + 2 * light**3 + e**3 + n**3
            near(cubic, 6 * colours * q * (w**2 - t**2))
    print("PASS Clifford contractions, spectral coefficient, G traces, and weight freedom")


def run_one_stage(a_initial, scale):
    return a_initial - B_SM * scale


def check_standard_model():
    gauge_part = -11 / 3 * np.array([0, 2, 3])
    fermion_part = (2 / 3) * 3 * np.array([10 / 3, 2, 2])
    scalar_part = np.array([0.5, 0.5, 0]) / 3
    near(gauge_part + fermion_part + scalar_part, B_SM)
    cases = [
        (1 / 2, None, 5.35e20, 51.37, 4.26e17, None),
        (3 / 8, 1, 1.03e13, 42.41, 4.68e17, -5.58),
        (3 / 10, 2, 3.87e7, 36.12, 5.08e17, -49.32),
        (3 / 7, 0.5, 3.18e16, 46.46, 4.47e17, 22.55),
        (1 / 3, 1.5, 1.21e10, 39.01, 4.88e17, -29.20),
    ]
    for angle, q4, published_m, published_a2, published_radius, residual in cases:
        r = (1 - angle) / angle
        denominator = B_SM[0] - r * B_SM[1]
        x = (A_Z[0] - r * A_Z[1]) / denominator
        assert denominator > 0 and x > 0
        a = run_one_stage(A_Z, x)
        assert np.all(a > 0)
        scale = energy(x)
        radius = inverse_radius(a[1])
        near(a[1] / sum(a[:2]), angle)
        near([scale, a[1], radius], [published_m, published_a2, published_radius],
             rtol=0.004)
        near(a + B_SM * x, A_Z)
        if q4 is None:
            assert scale > MP and scale / radius > 1000
        else:
            near(a[2] - q4 * a[1], residual, atol=0.006)
            assert scale / radius < 0.072

    for alpha_s, meeting in [(0.1180, 9.71e16), (0.1177, 9.37e16)]:
        a_initial = np.r_[A_Z[:2], 1 / alpha_s]
        x = (a_initial[1] - a_initial[2]) / (B_SM[1] - B_SM[2])
        a = run_one_stage(a_initial, x)
        near(a[1], a[2])
        near(energy(x), meeting, rtol=0.001)
        if alpha_s == 0.1180:
            near(a[1] / sum(a[:2]), 0.43638, atol=5e-6)
            near(np.array([5 / 3, 1]) * a[1] - a[0], [17.64, -13.71], atol=0.005)
        else:
            x = (A_Z[0] - 5 / 3 * A_Z[1]) / (B_SM[0] - 5 / 3 * B_SM[1])
            near(run_one_stage(a_initial, x)[2], 36.85, atol=0.005)
    planck = run_one_stage(A_Z, np.log(MP / MZ) / (2 * np.pi))
    near(planck[1] / sum(planck[:2]), 0.47133, atol=5e-6)

    r = 5 / 3
    matrix = np.array([[1 + r, B_SM[0] + B_SM[1]], [1, B_SM[2]]])
    common, x = np.linalg.solve(matrix, [EM, A_Z[2]])
    predicted = (common + B_SM[1] * x) / EM
    near(energy(x), 6.79e14, rtol=0.001)
    near([predicted, S_Z - predicted], [0.20756, 0.02366], atol=5e-6)
    old = np.array([(1 - 0.23129) * 127.930, 0.23129 * 127.930, 1 / .1180])
    normalized = np.array([3 / 5, 1, 1])
    old *= normalized
    slopes = B_SM * normalized
    spreads = []
    for i, j in [(0, 1), (0, 2), (1, 2)]:
        cross = (old[i] - old[j]) / (slopes[i] - slopes[j])
        spreads.append(np.ptp(old - slopes * cross))
    near(spreads, [5.59689, 3.66403, 10.60976], atol=5e-6)
    near(min(spreads), 3.66403, atol=5e-6)
    print("PASS Standard Model slopes, crossings, shifts, radius tests, and GQW fit")


def check_direct_pati_salam():
    matter = np.full(3, 4)
    real_bidoublet = np.array([0, 1, 1])
    complex_breaking_scalar = np.array([1, 0, 2])
    beta_real = -11 / 3 * np.array([4, 2, 2]) + matter
    beta_real = beta_real + real_bidoublet / 6 + complex_breaking_scalar / 3
    near(beta_real, [-31 / 3, -19 / 6, -5 / 2])
    beta_complex = beta_real + real_bidoublet / 6
    near(beta_complex, [-31 / 3, -3, -7 / 3])

    def fit(q4, beta, a_initial):
        projection = np.array([[0, 0, 1], [0, 1, 0], [1, 0, -2 / 3]])
        c = projection @ a_initial
        b = -projection @ B_SM
        h = np.array([[1, -q4, 0], [0, -1, 1]])
        matrix = np.column_stack([h @ b, -h @ beta])
        determinant = 1322 - (399 if beta is beta_real else 377) * q4
        near(np.linalg.det(matrix), determinant / 9)
        x, y = np.linalg.solve(matrix, -h @ c)
        a_upper = c + b * x - beta * y
        near(a_upper, a_upper[1] * np.array([q4, 1, 1]))
        down = np.linalg.solve(projection, a_upper + beta * y) + B_SM * x
        near(down, a_initial)
        return x, y, a_upper

    for q4, mi, mu in [(0.5, 8.98e13, 3.16e8), (1, 4.21e13, 2.65e15),
                       (1.5, 1.29e13, 1.46e26), (2, 1.63e12, 1.22e45)]:
        x, y, a_upper = fit(q4, beta_real, A_Z)
        near([energy(x), energy(x + y)], [mi, mu], rtol=0.004)
        if q4 == 0.5:
            assert y < 0
        elif q4 == 1:
            assert x > 0 and y > 0 and np.all(a_upper > 0)
            assert np.all(a_upper + beta_real * y > 0)
            near(a_upper[1], 45.21, atol=0.005)
            near(np.sqrt(4 * np.pi / a_upper[1]), 0.527, atol=0.0005)
            radius = inverse_radius(a_upper[1])
            near(radius, 4.54e17, rtol=0.002)
            near(radius / energy(x + y), 171, atol=0.5)
        else:
            assert energy(x + y) > MP
    x, y, _ = fit(1, beta_complex, A_Z)
    near([energy(x), energy(x + y)], [4.22e13, 2.41e15], rtol=0.002)
    x, y, _ = fit(1, beta_real, np.r_[A_Z[:2], 1 / 0.1177])
    near([energy(x), energy(x + y)], [4.18e13, 2.59e15], rtol=0.002)
    print("PASS direct Pati--Salam spectra, threshold order, and downward fit")


def check_paper_spectrum():
    # Derive the intervening slopes using the active multiplets of Hypothesis Ps.
    indices_weyl = np.full(4, 6)
    adjoint = np.array([0, 2, 2, 3])
    breaking_doublet = np.array([3 / 4, 0, 1 / 2, 0])
    bidoublet = np.array([0, 1, 1, 0])
    beta = -11 / 3 * adjoint + 2 / 3 * indices_weyl
    beta = beta + breaking_doublet / 3 + bidoublet / 6
    near(beta, [17 / 4, -19 / 6, -3, -7])
    project = np.array([[2 / 5, 0, 3 / 5, 0], [0, 1, 0, 0], [0, 0, 0, 1]])
    c_real = project @ beta
    c_complex = project @ (beta + bidoublet / 6)
    near(c_real, [-1 / 10, -19 / 6, -7])
    near(c_complex, [0, -3, -7])
    a0 = A_Z * [3 / 5, 1, 1]
    b = B_SM * [3 / 5, 1, 1]

    def fit(q4, intermediate):
        coefficients = np.array([(3 + 2 * q4) / 5, 1, q4])
        a_upper, x, y = np.linalg.solve(np.column_stack([coefficients, b, intermediate]), a0)
        near(a_upper * coefficients + b * x + intermediate * y, a0)
        if intermediate is c_real:
            a_formula = (23 * a0[1] + 19 * (a0[1] - a0[2])) / (42 - 19 * q4)
            log_total = 6 / 19 * (a_formula - a0[1])
            x_formula = (a0[0] - a0[1] - 2 / 5 * (q4 - 1) * a_formula
                         - 46 / 15 * log_total) / (21 / 5)
            near([a_upper, x + y, x], [a_formula, log_total, x_formula])
        return a_upper, x, y

    a_upper, x, y = fit(1, c_real)
    near([energy(x), energy(x + y), a_upper],
         [1.293e10, 9.707e16, 47.0233], rtol=0.0004)
    near(inverse_radius(a_upper), 4.45e17, rtol=0.001)
    near(inverse_radius(a_upper) / energy(x + y), 4.58, atol=0.005)
    a_upper, x, y = fit(1, c_complex)
    near([energy(x), energy(x + y)], [2.580e10, 5.165e16], rtol=0.0004)
    near(inverse_radius(a_upper) / energy(x + y), 8.68, atol=0.005)
    for q4, expected in [(0.5, -6.575), (1.5, -8.458), (2, -74.265)]:
        _, x, y = fit(q4, c_real)
        near(y if q4 == 0.5 else x, expected, atol=0.0005)

    def difference(q4, scale_factor):
        a_upper, x, y = fit(q4, c_real)
        assert x > 0 and y > 0 and 2 * q4 < 7 / 3
        return energy(x + y) - scale_factor * inverse_radius(a_upper)

    calibrations = [
        (1, 1.0193, 1.0194, 1.01933, [2.46e9, 4.41e17]),
        (np.sqrt(3), 1.026, 1.027, 1.02616, [1.35e9, 7.62e17]),
    ]
    for scale_factor, lower, upper, expected_q4, expected_scales in calibrations:
        assert difference(lower, scale_factor) < 0 < difference(upper, scale_factor)
        for _ in range(36):
            midpoint = (lower + upper) / 2
            if difference(midpoint, scale_factor) > 0:
                upper = midpoint
            else:
                lower = midpoint
        near(midpoint, expected_q4, atol=5e-6)
        a_upper, x, y = fit(midpoint, c_real)
        near([energy(x), energy(x + y)], expected_scales, rtol=0.004)
        near(energy(x + y), scale_factor * inverse_radius(a_upper))
    print("PASS Paper II adjoint-breaking spectrum, fixed radii, and calibrated radius")


def check_comparison_identities():
    a, b, c = PAULI
    near(a @ b @ b @ c @ c @ a, IDENTITY_2)
    unitary = 1j * a
    near(unitary @ unitary.conj().T, IDENTITY_2)
    near(unitary @ unitary, -IDENTITY_2)
    translated = unitary @ b @ unitary.conj().T
    near(unitary @ b - b @ unitary, (translated - b) @ unitary)
    phases = np.exp(1j * np.linspace(0, np.pi, 37))
    near(phases**2, np.exp(1j * np.linspace(0, 2 * np.pi, 37)))
    near(phases[[0, -1]], [1, -1])

    rng = np.random.default_rng(2026)
    u, v = rng.normal(size=(2, 5))
    minors = np.outer(u, v) - np.outer(v, u)
    near((u @ u) * (v @ v) - (u @ v)**2, np.sum(minors**2) / 2)
    edges = rng.integers(-7, 8, size=(5, 5))
    faces = edges[None, :, :] - edges[:, None, :] + edges[:, :, None]
    for root, i, j, k in np.ndindex(5, 5, 5, 5):
        assert faces[i, j, k] - faces[root, j, k] + faces[root, i, k] - faces[root, i, j] == 0
    # Reconstruct a primitive from an anchored slice.
    edges = faces[0]
    near(faces, edges[None, :, :] - edges[:, None, :] + edges[:, :, None])
    angles = np.array([-3.7, -0.23, 0.02, 0.9, 6.1])
    leading = np.sum(angles**2) / 2
    observed = np.sum(1 - np.cos(angles))
    assert abs(observed - leading) <= np.sum(angles**4) / 24
    step = 0.001
    left, right = [np.cos(step) * IDENTITY_2 + 1j * np.sin(step) * p for p in (a, b)]
    loop = left @ right @ left.conj().T @ right.conj().T
    curvature = (a @ b - b @ a) / 1j
    difference = IDENTITY_2 - loop
    # The Frobenius form avoids cancellation in a real trace of order step**4.
    plaquette = np.linalg.norm(difference, ord="fro")**2 / 2
    near(plaquette, 4 * np.sin(step)**4, atol=1e-23)
    near(plaquette / step**4, np.trace(curvature @ curvature).real / 2, rtol=1e-5)
    print("PASS finite comparison, cochain, circle lift, and Wilson expansion checks")


if __name__ == "__main__":
    check_geometry()
    check_heat_and_matter()
    check_standard_model()
    check_direct_pati_salam()
    check_paper_spectrum()
    check_comparison_identities()
    print("PASS all d3 checks")
