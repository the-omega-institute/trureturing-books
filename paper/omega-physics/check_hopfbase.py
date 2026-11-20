"""Deterministic numerical checks for Section sec:hopfbase (vendored from module n7; the module-file consistency test is omitted)."""

from math import erf, sqrt
import re
from statistics import NormalDist

import numpy as np
from numpy.testing import assert_allclose

RNG = np.random.default_rng(7026)
IDENTITY = np.eye(2, dtype=complex)
PAULI = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])
QUATERNION = np.array([IDENTITY, 1j * PAULI[2], -1j * PAULI[1], -1j * PAULI[0]])
BASIS = np.eye(4)


def close(actual, expected, *, atol=1e-11, rtol=1e-10):
    assert_allclose(actual, expected, atol=atol, rtol=rtol)


def qmatrix(q):
    return np.einsum("a,aij->ij", q, QUATERNION)


def qcoords(matrix):
    return np.array([np.vdot(basis, matrix).real / 2 for basis in QUATERNION])


def qmul(a, b):
    return qcoords(qmatrix(a) @ qmatrix(b))


def qconj(q):
    return q * np.array([1, -1, -1, -1])


def normalized(vector):
    return vector / np.linalg.norm(vector)


def hopf(q):
    a, b = q
    return np.r_[2 * qmul(a, qconj(b)), a @ a - b @ b]


def clifford_matrix(a):
    q = qmatrix(a[:4])
    return np.block([[a[4] * IDENTITY, q], [q.conj().T, -a[4] * IDENTITY]])


def check_hopf():
    # The Lie-algebra dimension and the one-dimensional complex centralizer
    # support the Spin(5) cover computation in the proof.
    qzero = np.zeros((2, 2))
    generators = [
        np.block([[qmatrix(x), qzero], [qzero, qzero]]) for x in BASIS[1:]
    ] + [
        np.block([[qzero, qzero], [qzero, qmatrix(x)]]) for x in BASIS[1:]
    ]
    generators += [
        np.block([[qzero, qmatrix(x)], [-qmatrix(x).conj().T, qzero]]) for x in BASIS
    ]
    assert np.linalg.matrix_rank(np.array(generators).reshape(10, 16)) == 10
    gamma = [clifford_matrix(x) for x in np.eye(5)]
    commutators = [
        np.column_stack([(e @ g - g @ e).ravel() for e in np.eye(16).reshape(16, 4, 4)])
        for g in gamma
    ]
    assert np.linalg.matrix_rank(np.vstack(commutators)) == 15
    for i, gi in enumerate(gamma):
        for j, gj in enumerate(gamma):
            close(gi @ gj + gj @ gi, 2 * int(i == j) * np.eye(4))

    north = np.stack([BASIS[0], np.zeros(4)])
    south = north[::-1]
    close(hopf(north), np.eye(5)[4])
    close(hopf(south), -np.eye(5)[4])

    for _ in range(48):
        q = normalized(RNG.normal(size=(2, 4)))
        y, z = np.split(hopf(q), [4])
        close(y @ y + z[0] ** 2, 1)
        a, b = np.sqrt((1 + np.array([z[0], -z[0]])) / 2)
        close(hopf([a * BASIS[0], qconj(y) / (2 * a)]), np.r_[y, z])
        close(hopf([y / (2 * b), b * BASIS[0]]), np.r_[y, z])
        unit, left, right = [normalized(RNG.normal(size=4)) for _ in range(3)]
        close(hopf([qmul(x, unit) for x in q]), np.r_[y, z])
        close(hopf([qmul(left, q[0]), qmul(right, q[1])]),
              np.r_[qmul(qmul(left, y), qconj(right)), z])
        spin = clifford_matrix(np.r_[y, z])
        stacked = np.vstack([qmatrix(x) for x in q])
        close(2 * stacked @ stacked.conj().T - np.eye(4), spin)
        close(np.trace(spin @ spin).real / 4, 1)
        close(spin @ spin, np.eye(4))
        w = normalized(RNG.normal(size=4))
        step = 1e-6
        tangent = (hopf(normalized(north + step * np.stack([np.zeros(4), w])))
                   - hopf(normalized(north - step * np.stack([np.zeros(4), w]))))
        close(tangent / (2 * step), np.r_[2 * qconj(w), 0])
        imaginary = np.r_[0, normalized(RNG.normal(size=3))]
        e_i = BASIS[1]
        u = normalized(BASIS[0] - qmul(imaginary, e_i))
        close(qmul(qmul(u, e_i), qconj(u)), imaginary)
    close(qmul(qmul(BASIS[2], BASIS[1]), qconj(BASIS[2])), -BASIS[1])


def check_pair_obstruction_and_marginals():
    # The infinitesimal SU(3) orbit of a unit vector spans the five real
    # directions of its sphere, which together with the vector span C^3.
    orbit = np.array([[1j, 0, 0], [0, 1, 0], [0, 1j, 0], [0, 0, 1], [0, 0, 1j]])
    span = np.vstack(([1, 0, 0], orbit))
    assert np.linalg.matrix_rank(np.c_[span.real, span.imag]) == 6

    epsilon = 1j * PAULI[1]
    conjugation = np.kron(epsilon, epsilon)
    close(conjugation @ conjugation.conj(), np.eye(4))
    for _ in range(20):
        left, right = [qmatrix(normalized(RNG.normal(size=4))) for _ in range(2)]
        close(epsilon @ left.conj(), left @ epsilon)
        tensor = np.kron(left, right)
        close(conjugation @ tensor.conj(), tensor @ conjugation)
        phased = np.exp(1j * RNG.normal()) * conjugation
        close(phased @ phased.conj(), np.eye(4))
    endomorphisms = [np.kron(a, b).ravel() for a in [IDENTITY, *PAULI] for b in [IDENTITY, *PAULI]]
    assert np.linalg.matrix_rank(endomorphisms) == 16

    q = np.stack([BASIS[0], BASIS[1]]) / sqrt(2)
    unit = (BASIS[0] + BASIS[2]) / sqrt(2)
    moved = np.array([qmul(x, unit) for x in q])
    close(hopf(q), hopf(moved))

    def coefficient_matrix(pair):
        return pair[:, [0, 2]] + 1j * pair[:, [1, 3]] * [1, -1]

    initial_coeff = coefficient_matrix(q)
    final_coeff = coefficient_matrix(moved)
    close(initial_coeff, np.array([[1, 0], [1j, 0]]) / sqrt(2))
    close(final_coeff, np.array([[1, 1], [1j, -1j]]) / 2)
    close(np.linalg.eigvalsh(initial_coeff @ initial_coeff.conj().T), [0, 1])
    close(final_coeff @ final_coeff.conj().T, IDENTITY / 2)
    for theta in np.linspace(0, np.pi / 2, 41):
        joint = np.array([[1, 0], [np.cos(theta), np.sin(theta)]]) / sqrt(2)
        partial_trace = np.trace(np.outer(joint.ravel(), joint.ravel()).reshape(2, 2, 2, 2),
                                 axis1=1, axis2=3)
        close(partial_trace, (IDENTITY + np.cos(theta) * PAULI[0]) / 2)
        close(np.linalg.eigvalsh(partial_trace), (1 + np.array([-1, 1]) * np.cos(theta)) / 2)
    plus = np.outer([1, 1], [1, 1]) / 2
    projectors = [np.diag(row) for row in np.eye(2)]
    recorded = np.einsum("aij,j->iaj", np.array(projectors), np.ones(2)) / sqrt(2)
    # Contract the input index before forming the recorded coherent state.
    recorded_state = recorded.sum(axis=-1)
    close(recorded_state @ recorded_state.conj().T, sum(p @ plus @ p for p in projectors))


def check_vector_and_precision():
    generators = PAULI / 2
    close(np.einsum("aij,bji->ab", generators, generators), np.eye(3) / 2)
    f, g, gp = 917.0, 0.65, 0.36
    g_z = np.hypot(g, gp)
    rotation = np.array([[g, -gp], [gp, g]]) / g_z
    neutral = np.outer([g, -gp], [g, -gp])
    close(rotation @ neutral @ rotation.T, np.diag([g_z**2, 0]))
    hhat = np.array([0, 1])
    close((generators[2] + IDENTITY / 2) @ hhat, [0, 0])

    for chi in np.linspace(0.08, np.pi - 0.08, 27):
        s, c = np.sin(chi), np.cos(chi)
        xi, v = s**2, f * s
        wu = RNG.normal(size=3)
        b = RNG.normal()
        covariant = -1j * np.einsum("a,aij->ij", g * wu, generators) + 1j * gp * b * generators[2]
        metric_norm = np.trace(covariant.conj().T @ covariant).real / 2
        mass_block = g**2 * (wu[0]**2 + wu[1]**2) + (g * wu[2] - gp * b)**2
        close(metric_norm, mass_block / 4)
        mw, mz = v * np.array([g, g_z]) / 2
        close(mw**2 / (mz**2 * (g / g_z)**2), 1)
        step = 1e-4
        plus, minus = np.sin(chi + step)**2 / xi, np.sin(chi - step)**2 / xi
        close((plus - minus) / (2 * step) * s / 2, c, atol=1e-8)
        close((plus + minus - 2) / (2 * step**2) * xi, 1 - 2 * xi, atol=4e-8)
        close(abs(c), np.sqrt(1 - xi), atol=1e-8)
        close(2 * c**2 - 1, 1 - 2 * xi)
        close(1 - c**2, c**2 - (1 - 2 * xi))
        assert 0 <= abs(c) <= 1
        doublet = v * hhat / sqrt(2)
        close(np.vdot(doublet, generators[2] @ doublet), -v**2 / 4)
        close(abs(np.vdot(doublet, covariant @ doublet))**2,
              v**4 * (g * wu[2] - gp * b)**2 / 16)
        if abs(c) > 1e-6:
            close((f * c)**2 / (1 - (v / f)**2), f**2)
    close(np.cos(np.pi / 2), 0)
    close(1 - 2 * np.sin(np.pi / 2)**2, -1)
    close(np.sin([0, np.pi]), [0, 0])

    v, h, f_flat = 246.22, 33.0, 1e7
    close(f_flat * np.sin(np.arcsin(v / f_flat) + h / f_flat), v + h)
    c = 0.8
    covariant_norm, mass = 0.24, 125.13
    shift = v * c * covariant_norm / mass**2
    close(v * c * shift * covariant_norm - mass**2 * shift**2 / 2,
          v**2 * c**2 * covariant_norm**2 / (2 * mass**2))


def check_scattering():
    f = 947.0
    phi = RNG.normal(size=4) * 65
    velocity = RNG.normal(size=4)
    derivative_radius_square = 2 * phi @ velocity
    radial_derivative = -(phi @ velocity) / (f**2 * np.sqrt(1 - phi @ phi / f**2))
    close(radial_derivative**2,
          derivative_radius_square**2 / (4 * f**4 * (1 - phi @ phi / f**2)))
    # Evaluate the Lorentz contractions directly for all label combinations.
    eta = np.diag([1, -1, -1, -1])
    angle, energy = 0.69, 200.0
    p = energy * np.array([[1, 0, 0, 1], [1, 0, 0, -1],
                          [-1, -np.sin(angle), 0, -np.cos(angle)],
                          [-1, np.sin(angle), 0, np.cos(angle)]])
    close(p.sum(axis=0), np.zeros(4))
    pairings = [(0, 1, 2, 3), (0, 2, 1, 3), (0, 3, 1, 2)]
    stus = [(p[i] + p[j]) @ eta @ (p[i] + p[j]) for i, j, _, _ in pairings]
    for labels in np.ndindex((4, 4, 4, 4)):
        contractions = [int(labels[i] == labels[j] and labels[k] == labels[l])
                        for i, j, k, l in pairings]
        result = sum(-weight * (p[i] + p[j]) @ eta @ (p[k] + p[l])
                     for weight, (i, j, k, l) in zip(contractions, pairings)) / f**2
        close(result, np.dot(contractions, stus) / f**2)
        if labels[2:] == (3, 3) and max(labels[:2]) < 3:
            close(result, int(labels[0] == labels[1]) * stus[0] / f**2)


def check_yukawa():
    e4, e5 = np.eye(5)[3:]
    left = np.array([0.2, -0.3, 0.1, 0.8, 0.0])
    antisym = np.outer(left, e5) - np.outer(e5, left)
    symmetric = np.outer(left, e5) + np.outer(e5, left)
    triplet = np.zeros((5, 5))
    triplet[:4, :4] = np.kron(np.eye(2), [[0, 1], [-1, 0]])
    singlet = np.diag([1, 1, 1, 1, -4])
    close(np.trace(antisym.T @ triplet), 0)
    for chi in np.linspace(0.1, 1.45, 20):
        s, c = np.sin(chi), np.cos(chi)
        point = s * e4 + c * e5
        close(clifford_matrix(point)[:2, 2:], s * qmatrix(e4[:4]))
        close((left @ point) * (point @ e5), s * c * left[3])
        close((antisym @ point) @ (triplet @ point), s * c * (left @ triplet @ e4))
        close((symmetric @ point) @ (singlet @ point), -3 * s * c * left[3])
        close((point @ symmetric @ point) * (point @ singlet @ point),
              2 * s * c * left[3] * (1 - 5 * c**2))

        a, b = 2.5, -1.7
        xi = s**2
        masses = [np.sin, lambda t: np.sin(t) * np.cos(t),
                  lambda t: np.sin(t) * np.cos(t) * (a + b * np.sin(t)**2)]
        expected = [c, (1 - 2 * xi) / c, (1 - 2 * xi) / c + 2 * b * xi * c / (a + b * xi)]
        step = 1e-5
        for mass, coefficient in zip(masses, expected):
            close(s * (mass(chi + step) - mass(chi - step)) / (2 * step * mass(chi)),
                  coefficient, atol=2e-8, rtol=2e-9)
    close(np.array([1, -1]) / 2 + 1 / 6, [2 / 3, -1 / 3])
    close(2 / 3 - 1 / 2, 1 / 6)
    close(-1 / 3 + 1 / 2, 1 / 6)
    close(np.sin(np.pi / 2) * np.cos(np.pi / 2), 0)


def check_loops_and_potential():
    for p in [0.12, 1.2, 15.0, 160.0]:
        mw, mz, top = 0.4, 0.46, 0.81
        mixed_mass = np.zeros((4, 4))
        mixed_mass[:2, :2] = np.eye(2) * mw**2
        u = normalized(np.array([0.65, -0.36]))
        mixed_mass[2:, 2:] = mz**2 * np.outer(u, u)
        close(np.linalg.det(p**2 * np.eye(4) + mixed_mass),
              (p**2 + mw**2)**2 * (p**2 + mz**2) * p**2)
        for pl, pr, mass in [(1, 1, top), (1.3, 0.8, top + 0.4j)]:
            spin = np.array([[1j * p * pl, mass], [np.conj(mass), 1j * p * pr]])
            discriminant = p**2 * pl * pr + abs(mass)**2
            close(np.linalg.det(spin), -discriminant)
            close(np.linalg.slogdet(np.kron(np.eye(6), spin))[1], 6 * np.log(discriminant))
        if p > 1:
            ratio = mz**2 / p**2
            remainder = np.log1p(ratio) - (ratio - ratio**2 / 2)
            assert 0 < remainder < ratio**3 / 3

    grid = np.linspace(0, 1, 201)
    for alpha, beta, minimum in [(0, 1, 0), (-2, 1, 1), (1, 1, 0), (-3, 1, 1),
                                  (1, 0, 0), (-1, 0, 1), (0.5, -1, 1)]:
        close(grid[np.argmin(alpha * grid + beta * grid**2)], minimum)
    close(0 * grid + 0 * grid**2, np.zeros_like(grid))
    f, mass, xi = 1180.0, 125.13, 0.04
    beta = f**2 * mass**2 / (8 * xi * (1 - xi))
    alpha = -2 * beta * xi
    assert beta > 0 and -2 * beta < alpha < 0
    close(-alpha / (2 * beta), xi)
    close(8 * beta * xi * (1 - xi) / f**2, mass**2)
    assert beta > 0
    chi = np.arcsin(sqrt(xi))
    step = 1e-4
    x_prime = 2 * sqrt(xi * (1 - xi))
    for scale, cubic in [(1, 0), (4, 0), (1, 0.7), (1, -0.7)]:
        assert np.all(scale + cubic * (grid - xi) > 0)

        def potential(offset):
            difference = np.sin(chi + offset)**2 - xi
            return scale * difference**2 + cubic * difference**3

        close(potential(0), 0)
        close(potential(np.pi - 2 * chi), 0)
        curvature = (potential(step) + potential(-step) - 2 * potential(0)) / step**2
        close(curvature, scale * 8 * xi * (1 - xi), atol=3e-7)
        third = (potential(2 * step) - 2 * potential(step) + 2 * potential(-step)
                 - potential(-2 * step)) / (2 * step**3)
        theory_third = 6 * scale * x_prime * 2 * (1 - 2 * xi) + 6 * cubic * x_prime**3
        close(third, theory_third, atol=4e-6)
        if cubic == 0:
            close(sqrt(xi) * third / (3 * curvature), (1 - 2 * xi) / sqrt(1 - xi),
                  atol=1e-6)
    close(sqrt(4 * 8 * xi * (1 - xi)) / sqrt(8 * xi * (1 - xi)), 2)


def check_data():
    gf, gf_error = 1.1663785e-5, 0.0000006e-5
    v = (sqrt(2) * gf)**-0.5
    assert round(v, 2) == 246.22
    assert 0 < abs((sqrt(2) * (gf + gf_error))**-0.5 - v) < 0.0001
    mh, mh_error = 125.13, 0.11
    close([mh - mh_error, mh + mh_error], [125.02, 125.24])
    close(gf / sqrt(2), 1 / (2 * v**2))
    estimates, errors = np.array([1.023, 1.02]), np.array([0.026, 0.23])
    assert np.all(estimates - errors <= 1) and np.all(1 <= estimates + errors)
    grid = np.linspace(0, 1, 501)
    assert np.all(np.diff(np.sqrt(1 - grid)) < 0)
    assert np.all(np.diff(1 - 2 * grid) < 0)
    for probability, z_rounded, display_xi, display_f in [
        (0.95, 1.64485, [0.03914, 0.17916], [1.245, 0.582]),
        (0.975, 1.95996, [0.05514, 0.21540], [1.049, 0.531]),
    ]:
        z = NormalDist().inv_cdf(probability)
        assert round(z, 5) == z_rounded
        close((1 + erf(z / sqrt(2))) / 2, probability)
        lv, l2v = estimates - z * errors
        assert 0 < lv < 1 and -1 < l2v < 1
        limits = np.array([1 - lv**2, (1 - l2v) / 2])
        close(np.sqrt(1 - limits[0]), lv)
        close(1 - 2 * limits[1], l2v)
        close(limits.round(5), display_xi)
        close((v / np.sqrt(limits) / 1000).round(3), display_f)
        print(f"Gaussian lower edges at z={z:.5f}: xi <= {limits.round(5)},"
              f" f >= {(v / np.sqrt(limits) / 1000).round(3)} TeV")


def check_transport():
    def unitary(size):
        return np.linalg.qr(RNG.normal(size=(size, size))
                            + 1j * RNG.normal(size=(size, size)))[0]

    ul, ur = unitary(3), unitary(2)
    fi, fj = RNG.normal(size=(2, 3, 2))
    close(ul @ fi - fj @ ur, (ul @ fi @ ur.conj().T - fj) @ ur)
    al, ar, delta = RNG.normal(size=(3, 3)), RNG.normal(size=(2, 2)), 1e-7
    derivative = -((np.eye(3) - delta * al) @ fi
                   - (fi + delta * fj) @ (np.eye(2) - delta * ar)) / delta
    close(derivative, fj + al @ fi - fi @ ar, atol=6e-7)
    internal = np.block([[np.zeros((3, 3)), fi], [fi.T, np.zeros((2, 2))]])
    close(internal @ internal - internal @ internal, np.zeros((5, 5)))

    mass = 1.3
    time = np.array([0.0, 0.2, 1.2])
    rest_positive = np.c_[np.exp(-1j * mass * time), np.exp(-1j * mass * time)] / sqrt(2)
    positive_negative = np.c_[np.cos(mass * time), -1j * np.sin(mass * time)]
    close(np.abs(rest_positive)**2, np.full((3, 2), 0.5))
    close(np.abs(positive_negative[:, 0])**2, (1 + np.cos(2 * mass * time)) / 2)
    close(2 * (0.81 * 246.22 / sqrt(2))**2, (0.81 * 246.22)**2)


if __name__ == "__main__":
    for check in (check_hopf, check_pair_obstruction_and_marginals, check_vector_and_precision,
                  check_scattering, check_yukawa, check_loops_and_potential, check_data,
                  check_transport):
        check()
        print(f"PASS {check.__name__}")
    print("All n7 checks passed.")
