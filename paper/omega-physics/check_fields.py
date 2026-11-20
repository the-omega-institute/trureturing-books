"""Independent calculations for RESULT.md. Requires NumPy, with optional SymPy."""

from collections import Counter

import numpy as np
from numpy.testing import assert_allclose


def unit(vector):
    return vector / np.linalg.norm(vector)


def quaternion_product(q, r):
    a, x = q[0], q[1:]
    b, y = r[0], r[1:]
    return np.r_[a * b - x @ y, a * y + b * x + np.cross(x, y)]


def geometry():
    ambient = np.diag([-1, 1, 1, 1, 1])
    n = unit(np.array([1.0, 2.0, -3.0, 4.0]))
    q_basis = np.eye(4)[1:]
    round_frame = np.stack([quaternion_product(n, q) for q in q_basis], axis=1)
    for a in (0.1, 0.8, np.pi / 2, 2.1, 3.0):
        sine, cosine = np.sin(a), np.cos(a)
        t, v = -cosine / sine, n / sine
        xi = np.r_[t, v]
        jacobian = np.zeros((5, 4))
        jacobian[:, 0] = np.r_[1.0, -n * cosine] / sine**2
        jacobian[1:, 1:] = round_frame / sine
        assert_allclose(xi @ ambient @ xi, 1, atol=1e-12)
        assert_allclose(xi @ ambient @ jacobian, np.zeros(4), atol=1e-12)
        assert_allclose(
            jacobian.T @ ambient @ jacobian, ambient[:4, :4] / sine**2, atol=1e-12
        )
        s = np.log(np.tan(a / 2))
        assert_allclose([t, np.linalg.norm(v)], [np.sinh(s), np.cosh(s)], atol=1e-12)
        tau, spatial = 0.7, round_frame @ np.array([-0.2, 0.8, 0.3])
        w = spatial + t * tau * sine * n
        conjugate = n * [1, -1, -1, -1]
        for image in (quaternion_product(conjugate, spatial),
                      quaternion_product(spatial, conjugate)):
            assert_allclose(image[0], 0, atol=1e-12)
            assert_allclose(image @ image - (tau * sine)**2, w @ w - tau**2)
        threshold = np.cos(a / 2)**2
        assert_allclose(0.5 * np.log((1 - threshold) / threshold), s, atol=1e-12)
        b = 0.93
        for theta in (0.0, 0.2, 1.2, np.pi):
            m = np.cos(theta) * n + np.sin(theta) * round_frame[:, 0]
            eta = np.r_[-1 / np.tan(b), m / np.sin(b)]
            pairing = xi @ ambient @ eta
            expected = (np.cos(theta) - cosine * np.cos(b)) / (sine * np.sin(b))
            assert_allclose(pairing, expected, atol=1e-12)
            assert (theta <= b - a) == (pairing >= 1 and xi[0] <= eta[0])

    generators = []
    for i in range(5):
        for j in range(i + 1, 5):
            skew = np.zeros((5, 5))
            skew[i, j], skew[j, i] = 1, -1
            generator = ambient @ skew
            assert_allclose(generator.T @ ambient + ambient @ generator, 0)
            generators.append(generator)
    assert np.linalg.matrix_rank(np.stack(generators).reshape(-1, 25)) == 10

    # The antipodal spacelike geodesic lies in an ambient positive plane.
    xi, tangent = np.eye(5)[1:3]
    for angle in (0.3, 1.9, np.pi):
        point = np.cos(angle) * xi + np.sin(angle) * tangent
        assert_allclose([point @ ambient @ point, xi @ ambient @ point],
                        [1, np.cos(angle)], atol=1e-12)
    assert_allclose(point, -xi, atol=1e-12)
    for radius, time in ((0.1, -1.1), (0.4, 0.0), (0.9, 1.7)):
        lapse = np.sqrt(1 - radius**2)
        t, z = lapse * np.array([np.sinh(time), np.cosh(time)])
        jacobian = np.array([[z, -radius * t / lapse**2],
                             [t, -radius * z / lapse**2],
                             [0, 1]])
        assert_allclose(jacobian.T @ ambient[:3, :3] @ jacobian,
                        np.diag([-lapse**2, lapse**-2]), atol=1e-12)
        assert_allclose([(z - t) * (z + t), (z + t) / (z - t)],
                        [1 - radius**2, np.exp(2 * time)])
    p, q = q_basis[:2]
    bracket = quaternion_product(p, q) - quaternion_product(q, p)
    assert_allclose(bracket, 2 * q_basis[2])
    s = 0.8
    print(f"Geometry: {len(generators)} Killing fields, unit curvature and Lambda=3.")
    print(f"Left-frame torsion at s={s}: time {np.tanh(s):.9f}, cyclic space {-2/np.cosh(s):.9f}.")


def flrw():
    # A dimensionless test value for the kinetic coefficient in each branch.
    s = np.linspace(0.1, 2.8, 81)
    ell = 1.7
    test_cases = (
        ("cosh", 0.4, ell**-2,
         ell * np.sqrt(0.6) * np.cosh(s / ell),
         np.sqrt(0.6) * np.sinh(s / ell), np.pi / np.sqrt(0.6)),
        ("exponential", 1.0, ell**-2,
         np.exp(s / ell), np.exp(s / ell) / ell, np.inf),
        ("sinh", 1.6, ell**-2,
         ell * np.sqrt(0.6) * np.sinh(s / ell),
         np.sqrt(0.6) * np.cosh(s / ell), np.inf),
        ("static", 1.0, 0.0, np.full_like(s, 1.7), np.zeros_like(s), np.inf),
        ("linear", 1.6, 0.0, np.sqrt(0.6) * s, np.full_like(s, np.sqrt(0.6)), np.inf),
        ("sine", 1.6, -ell**-2,
         ell * np.sqrt(0.6) * np.sin(s / ell),
         np.sqrt(0.6) * np.cos(s / ell), np.inf),
    )
    for name, gamma, hubble_squared, radius, velocity, duration in test_cases:
        acceleration = hubble_squared * radius
        assert_allclose(velocity**2, hubble_squared * radius**2 + gamma - 1, atol=1e-12)
        scalar = 6 * (acceleration / radius + (1 + velocity**2) / radius**2)
        assert_allclose(scalar, 12 * hubble_squared + 6 * gamma / radius**2)
        v_squared = gamma / (4 * np.pi)
        gradient = np.diag([0, radius[0]**-2, radius[0]**-2, radius[0]**-2])
        metric = np.diag([-1, 1, 1, 1])
        stress = v_squared * (gradient - 0.5 * metric * np.trace(metric @ gradient))
        rho, pressure = stress[0, 0], stress[1, 1]
        assert_allclose([rho, pressure], np.array([3, -1]) * v_squared / (2 * radius[0]**2))
        assert rho + pressure > 0
        print(f"FLRW {name:11s}: gamma={gamma:.1f}, example conformal length={duration:.10g}.")

    # Integrate over compact variables to reproduce the conformal bounce
    # duration and the coefficient in the long-contraction asymptotic.
    nodes, weights = np.polynomial.legendre.leggauss(128)
    x = (nodes + 1) / 2
    bounce = 2 * np.sum(weights / (1 + x * x))
    contraction = np.pi / 4 * np.sum(weights * np.cos(np.pi * x / 2)**2)
    assert_allclose(bounce, np.pi, atol=1e-12)
    assert_allclose(contraction, np.pi / 4, atol=1e-12)
    print(f"Bounce constant pi={bounce:.12f}; contraction prefactor pi/32={contraction/8:.12f}.")


def spin_matrices(j):
    """Hermitian spin-j matrices in the J_z basis, highest weight first."""
    weights = j - np.arange(int(2 * j) + 1)
    raising = np.diag(np.sqrt(j * (j + 1) - weights[1:] * (weights[1:] + 1)), 1)
    lowering = raising.T
    return ((raising + lowering) / 2, (raising - lowering) / (2j), np.diag(weights))


def spectrum():
    spin_one = spin_matrices(1)
    multiplicities = Counter()
    for twice_j in range(13):
        j = twice_j / 2
        combined = [2 * np.kron(left, np.eye(3)) + np.kron(np.eye(twice_j + 1), right)
                    for left, right in zip(spin_matrices(j), spin_one)]
        jacobi = sum(operator @ operator for operator in combined) - 2 * np.eye(3 * (twice_j + 1))
        eigenvalues = np.linalg.eigvalsh(jacobi)
        analytic = []
        for k in np.arange(abs(j - 1), j + 2, 1):
            analytic.extend([2 * j * (j + 1) + 2 * k * (k + 1) - 4] * int(2 * k + 1))
        assert_allclose(eigenvalues, sorted(analytic), atol=1e-11)
        for eig, count in Counter(map(round, eigenvalues)).items():
            multiplicities[eig] += count * (twice_j + 1)
    assert multiplicities[-1] == 4 and multiplicities[0] == 6
    assert all(eig >= -1 for eig in multiplicities)
    print("Jacobi spectrum by matrix diagonalization (2j=0,...,12), low eigenvalues:",
          sorted(multiplicities.items())[:10])


def groups_and_masses():
    spin_half = spin_matrices(0.5)
    two = np.eye(2)
    joints = [np.kron(op, two) + np.kron(two, op) for op in spin_half]
    joint_casimir = sum(op @ op for op in joints)
    assert_allclose(np.linalg.eigvalsh(joint_casimir), [0, 2, 2, 2], atol=1e-12)

    operator = np.diag([1, 1, 1, -3]) / (2 * np.sqrt(6))
    half_bl = np.diag([1/6, 1/6, 1/6, -1/2])
    assert_allclose(np.diag(half_bl + np.eye(4)/2), [2/3, 2/3, 2/3, 0])
    assert_allclose(np.diag(half_bl - np.eye(4)/2), [-1/3, -1/3, -1/3, -1])
    assert_allclose(half_bl, np.sqrt(2 / 3) * operator)
    left = np.kron(np.eye(4), spin_half[2])
    right = left.copy()
    y_left = np.kron(half_bl, two)
    y_right = y_left + right
    q_left = y_left + left
    assert_allclose(np.diag(y_left), np.repeat([1/6, 1/6, 1/6, -1/2], 2))
    assert_allclose(np.diag(y_right), [2/3, -1/3]*3 + [0, -1])
    assert_allclose(np.diag(q_left), np.diag(y_right))
    trace_squares = [4 * np.trace(operator @ operator), np.trace(right @ right),
                     np.trace(left @ left), np.trace(q_left @ q_left + y_right @ y_right)]
    assert_allclose(trace_squares, [2, 2, 2, 16/3])

    y = np.array([1/6, -2/3, 1/3, -1/2, 1, 0])
    counts = np.array([6, 3, 3, 2, 1, 1])
    assert_allclose([counts @ y, counts @ y**3, 2*y[0] + y[1] + y[2], 3*y[0] + y[3]],
                    np.zeros(4), atol=1e-12)
    test_coupling, clock_coupling, v = 0.7, 0.32, 1.2
    derivative = np.column_stack((test_coupling * np.eye(3), [0, 0, -clock_coupling])) / 2
    squared_masses = v**2 * derivative.T @ derivative
    ratio = test_coupling**2 / (test_coupling**2 + clock_coupling**2)
    assert_allclose(np.linalg.eigvalsh(squared_masses),
                    [0, (v*test_coupling/2)**2, (v*test_coupling/2)**2,
                     v**2 * (test_coupling**2 + clock_coupling**2)/4], atol=1e-12)
    assert_allclose(squared_masses @ [0, 0, clock_coupling, test_coupling], 0, atol=1e-12)
    berger = np.diag([2, 2, 3])
    masses_berger = np.linalg.eigvalsh(v**2 * derivative.T @ berger @ derivative)
    assert_allclose(masses_berger[1]/masses_berger[3], (2/3) * ratio)
    full = np.column_stack((test_coupling * np.eye(3), -clock_coupling * np.eye(3))) / 2
    assert_allclose(np.linalg.eigvalsh(v**2 * full.T @ full),
                    [0, 0, 0] + [v**2*(test_coupling**2 + clock_coupling**2)/4]*3, atol=1e-12)

    g_y_squared_over_g_l_squared = np.array([1, 1/(1 + 2/3), 1/(1 + 4/3), 4])
    angles = g_y_squared_over_g_l_squared / (1 + g_y_squared_over_g_l_squared)
    assert_allclose(angles, [1/2, 3/8, 3/10, 4/5])
    print("Vector squared masses (test v and couplings):", np.linalg.eigvalsh(squared_masses))
    print("Bare-clock trace, G trace, G Killing, primitive-only angles squared:", angles)
    for n in (1, 2, 3, 4):
        assert (1 << (n + 1)) - 1 == 2 * (2**n) - 1
    print("Carrier sphere dimensions:", [2**(n+1)-1 for n in (1, 2, 3)])
    print("Parent/first/second group dimensions:", 15+3+3, 8+3+1, 8+1)
    print("Two-pair stabilizer dimension:", 9+9-1)


def running():
    mz, weak_angle, inverse_alpha = 91.1879, 0.23122, 127.95
    fermion_indices = np.array([10/3, 2, 2])
    scalar_indices = np.array([0.5, 0.5, 0])
    b = -(11/3)*np.array([0, 2, 3]) + 2*fermion_indices + scalar_indices/3
    assert_allclose(b, [41/6, -19/6, -7])
    print("One-loop b:", b)
    print(f"Measured gY/gL at MZ: {np.sqrt(weak_angle / (1-weak_angle)):.9f}")
    for alpha_s in (0.1180, 0.1177):
        initial = np.array([inverse_alpha*(1-weak_angle), inverse_alpha*weak_angle, 1/alpha_s])
        print(f"alpha_s={alpha_s:.4f}; a_i(MZ) =", initial)
        x_23 = (initial[1] - initial[2]) / (b[1] - b[2])
        x_angle = {}
        for target in (3/8, 1/2):
            x_angle[target] = (target * sum(initial[:2]) - initial[1]) / (target*sum(b[:2]) - b[1])
        crossing = initial - b*x_23
        assert_allclose(crossing[1], crossing[2])
        scale_cases = (
            ("rounded 3/8", np.log(1e13/mz)/(2*np.pi)),
            ("exact 3/8", x_angle[3/8]),
            ("g2=g3", x_23),
            ("Planck", np.log(1.22e19/mz)/(2*np.pi)),
            ("exact 1/2", x_angle[1/2]),
        )
        for name, x in scale_cases:
            a_y, a_2, a_3 = initial - b*x
            scale = mz*np.exp(2*np.pi*x)
            angle = a_2 / (a_y + a_2)
            print(f"  {name:12s} {scale:.9e}  {a_y:.8f} {a_2:.8f} {a_3:.8f}  {angle:.9f}")
            if name in ("exact 3/8", "exact 1/2"):
                target = 3/8 if name == "exact 3/8" else 1/2
                assert_allclose(angle, target, atol=1e-12)
                assert abs(a_2 - a_3) > 5
            if name in ("g2=g3", "Planck", "exact 3/8", "exact 1/2"):
                print(f"    shifts for 3/8, 1/2 and colour: "
                      f"{5*a_2/3-a_y:+.8f} {a_2-a_y:+.8f} {a_2-a_3:+.8f}")


def experimental_numbers():
    mz, z_err = 91.1879, 0.0020
    for mw, w_err in ((80.3625, 0.0077), (80.432, 0.016)):
        on_shell = 1 - (mw/mz)**2
        on_shell_err = np.hypot(2*mw*w_err/mz**2, 2*mw**2*z_err/mz**3)
        print(f"For mW={mw} GeV, on-shell s^2={on_shell:.9f} +/- {on_shell_err:.9f}")
    mw, w_err = 80.3625, 0.0077
    s2, s2_err = 0.23122, 0.00006
    tree_mass = mz*np.sqrt(1-s2)
    rho = (mw/tree_mass)**2
    rho_err = rho*np.linalg.norm([2*w_err/mw, 2*z_err/mz, s2_err/(1-s2)])
    print(f"MS tree mass={tree_mass:.9f} GeV; shortfall={100*(1-tree_mass/mw):.8f}%;")
    print(f"  rho={rho:.9f} +/- {rho_err:.9f}; with rounded tree mass={(mw/79.954)**2:.9f}")
    for inverse_alpha in (127.95, 128.9):
        print("delta rho for inverse alpha", inverse_alpha, np.array([0.021, 0.055])/inverse_alpha)

    c = 299792458
    mpc = 1e6 * (648000/np.pi) * 149597870700
    hubble, hubble_err, omega, omega_err = 67.36, 0.54, 0.6847, 0.0073
    hubble_si = hubble * 1000 / mpc
    cosmological_constant = 3*omega*(hubble_si/c)**2
    lambda_err = cosmological_constant*np.hypot(2*hubble_err/hubble, omega_err/omega)
    ds_radius = np.sqrt(3/cosmological_constant)
    gly = c * (365.25*86400) * 1e9
    print(f"Lambda={cosmological_constant:.9e} +/- {lambda_err:.9e} m^-2; "
          f"ell={ds_radius:.9e} m={ds_radius/gly:.8f} Gly; c/H0={c/hubble_si:.9e} m.")


def symbolic_checks():
    try:
        import sympy as sp
    except ImportError:
        print("SymPy unavailable; completed NumPy checks.")
        return

    s, chi, theta, phi = sp.symbols("s chi theta phi", real=True)
    radius = sp.Function("R")(s)
    coords = (s, chi, theta, phi)
    metric = sp.diag(-1, radius**2, radius**2*sp.sin(chi)**2,
                     radius**2*sp.sin(chi)**2*sp.sin(theta)**2)
    inv_metric = metric.inv()
    connection = [[[sp.simplify(sum(inv_metric[i, l] * (
        sp.diff(metric[l, k], coords[j]) + sp.diff(metric[l, j], coords[k])
        - sp.diff(metric[j, k], coords[l])) / 2 for l in range(4)))
                    for k in range(4)] for j in range(4)] for i in range(4)]
    ricci = sp.Matrix(4, 4, lambda i, j: sp.trigsimp(sum(
        sp.diff(connection[k][i][j], coords[k]) - sp.diff(connection[k][i][k], coords[j])
        + sum(connection[k][k][l] * connection[l][i][j]
              - connection[k][j][l] * connection[l][i][k] for l in range(4))
        for k in range(4))))
    curvature = sp.simplify(sp.trace(inv_metric * ricci))
    expected = 6 * (sp.diff(radius, s, 2)/radius + (1+sp.diff(radius, s)**2)/radius**2)
    assert sp.simplify(curvature - expected) == 0
    ds_ricci = (ricci - 3*metric).subs(radius, sp.cosh(s)).doit()
    assert ds_ricci.applyfunc(sp.simplify) == sp.zeros(4)
    a = sp.symbols("a", real=True)
    assert sp.trigsimp(sp.diff(1/sp.sin(a), a)**2 - sp.diff(-sp.cot(a), a)**2
                       + 1/sp.sin(a)**2) == 0
    assert sp.simplify(sp.diff(sp.tanh(s), s, 2) + 3*sp.tanh(s)*sp.diff(sp.tanh(s), s)
                       - sp.tanh(s)/sp.cosh(s)**2) == 0
    conformal_factor = sp.Function("Omega")(*coords)
    base_density = sp.sin(chi)**2 * sp.sin(theta)
    conformal_density = conformal_factor**4 * base_density
    conformal_inverse_chi = conformal_factor**-2
    centre_component = sp.cos(chi)
    conformal_box = sp.diff(
        conformal_density * conformal_inverse_chi * sp.diff(centre_component, chi), chi
    ) / conformal_density
    wave_map = conformal_box + 3 * conformal_inverse_chi * centre_component
    expected = -2 * sp.sin(chi) * sp.diff(conformal_factor, chi) / conformal_factor**3
    assert sp.simplify(wave_map - expected) == 0
    for primitive, r in (
        (2*sp.atan(sp.exp(s)), sp.cosh(s)),
        (-sp.exp(-s), sp.exp(s)),
        (sp.log(sp.tanh(s/2)), sp.sinh(s)),
        (sp.log(s), s),
        (sp.log(sp.tan(s/2)), sp.sin(s)),
    ):
        identity = sp.diff(primitive, s)*r - 1
        assert identity.rewrite(sp.exp).simplify() == 0
    print("SymPy: FLRW Ricci, de Sitter, conformal wave map, integrals and mode checked.")


if __name__ == "__main__":
    geometry()
    flrw()
    spectrum()
    groups_and_masses()
    running()
    experimental_numbers()
    symbolic_checks()
    print("All checks passed.")
