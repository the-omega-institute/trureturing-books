#!/usr/bin/env python3
"""Deterministic checks for Section sec:bounds (vendored from module n4)."""

from itertools import product
import re

import numpy as np


RNG = np.random.default_rng(20261120)
I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]])
Z = np.diag([1, -1]).astype(complex)
PAULI = np.array([X, Y, Z])
ZERO, ONE = I
PLUS = (ZERO + ONE) / np.sqrt(2)
MINUS = (ZERO - ONE) / np.sqrt(2)
BELL = (np.kron(ZERO, ZERO) + np.kron(ONE, ONE)) / np.sqrt(2)
SPIN_FLIP = np.kron(Y, Y)
ATOL = 2e-9


def close(actual, expected, atol=ATOL):
    np.testing.assert_allclose(actual, expected, atol=atol, rtol=0)


def adj(matrix):
    return matrix.conj().T


def ket(dimension, index):
    return np.eye(dimension, dtype=complex)[:, index]


def projector(vector):
    return np.outer(vector, vector.conj())


def random_complex(shape):
    return RNG.normal(size=shape) + 1j * RNG.normal(size=shape)


def random_unit(dimension):
    vector = random_complex(dimension)
    return vector / np.linalg.norm(vector)


def random_unitary(dimension):
    return np.linalg.qr(random_complex((dimension, dimension)))[0]


def density(dimension):
    factor = random_complex((dimension, dimension))
    rho = factor @ adj(factor)
    return rho / np.trace(rho)


def partial_trace(rho, keep, qubits):
    order = tuple(keep) + tuple(i for i in range(qubits) if i not in keep)
    axes = order + tuple(i + qubits for i in order)
    d, e = 2 ** len(keep), 2 ** (qubits - len(keep))
    blocks = rho.reshape((2,) * (2 * qubits)).transpose(axes).reshape(d, e, d, e)
    return np.trace(blocks, axis1=1, axis2=3)


def bloch(rho):
    return np.array([np.trace(rho @ sigma).real for sigma in PAULI])


def pauli(vector):
    return np.einsum("i,ijk->jk", vector, PAULI)


def evolve(hamiltonian, time, hbar=1):
    energies, vectors = np.linalg.eigh(hamiltonian)
    return (vectors * np.exp(-1j * energies * time / hbar)) @ adj(vectors)


def fs_angle(psi, phi):
    overlap = np.vdot(psi, phi)
    transverse = phi - overlap * psi
    return np.arctan2(np.linalg.norm(transverse), abs(overlap))


def variance(rho, operator):
    centred = operator - np.trace(rho @ operator) * np.eye(len(rho))
    return max(0, np.trace(rho @ centred @ centred).real)


def concurrence(rho):
    eigenvalues, eigenvectors = np.linalg.eigh(rho)
    support = eigenvalues > 1e-13
    factor = eigenvectors[:, support] * np.sqrt(eigenvalues[support])
    overlaps = factor.T @ SPIN_FLIP @ factor
    singular_values = np.linalg.svd(overlaps, compute_uv=False)
    return max(0, singular_values[0] - singular_values[1:].sum())


def check_entanglement():
    # n4:budget, n4:roof, n4:budget-examples, n4:local-budget
    variants = [
        ((ket(8, 0) + ket(8, 6)) / np.sqrt(2), (1, 0, 1)),
        (sum(ket(8, index) for index in (1, 2, 4)) / np.sqrt(3), (4/9, 4/9, 8/9)),
        ((ket(8, 0) + ket(8, 7)) / np.sqrt(2), (0, 0, 1)),
    ]
    for p in (0, 0.14, 0.83, 1):
        variants.append((np.sqrt(p) * ket(8, 0) + np.sqrt(1-p) * ket(8, 7),
                         (0, 0, 4*p*(1-p))))
    for psi, expected in variants:
        rho = projector(psi)
        local = partial_trace(rho, (0,), 3)
        close([concurrence(partial_trace(rho, (0, j), 3)) ** 2 for j in (1, 2)]
              + [4 * np.linalg.det(local).real], expected)
    close(np.linalg.norm(bloch(partial_trace(projector(variants[1][0]), (0,), 3))), 1/3)
    ghz = projector(variants[2][0])
    close(partial_trace(ghz, (0, 1), 3), np.diag([0.5, 0, 0, 0.5]))
    close(2 * (1 - np.linalg.norm(bloch(partial_trace(ghz, (0,), 3))) ** 2), 2)

    for _ in range(64):
        psi = np.zeros(8, dtype=complex)
        psi[[0, 4, 5, 6, 7]] = random_unit(5)
        a, b, c, d, e = psi[[0, 4, 5, 6, 7]]
        rho = projector(psi)
        reduced = partial_trace(rho, (0,), 3)
        radius = np.linalg.norm(bloch(reduced))
        speed_budget = 1 - radius ** 2
        pairs = [concurrence(partial_trace(rho, (0, j), 3)) for j in (1, 2)]
        close(pairs, [2 * abs(a*d), 2 * abs(a*c)])
        close(speed_budget, 4 * np.linalg.det(reduced).real)
        close(speed_budget - np.dot(pairs, pairs), 4 * abs(a*e) ** 2)
        rapidity = np.arctanh(radius)
        close(np.cosh(rapidity) ** -2, speed_budget)
        axis = RNG.normal(size=3)
        axis /= np.linalg.norm(axis)
        r = bloch(reduced)
        projection = np.dot(r, axis)
        close(projection ** 2 + np.linalg.norm(r-projection*axis) ** 2, radius ** 2)
        columns = psi.reshape(4, 2)
        overlap = columns.T @ SPIN_FLIP @ columns
        close(overlap, [[-2*a*d, -a*e], [-a*e, 0]])
        singular = np.linalg.svd(overlap, compute_uv=False)
        close((singular[0] - singular[1]) ** 2,
              np.linalg.norm(overlap) ** 2 - 2 * abs(np.linalg.det(overlap)))
        mixing = random_unitary(5)[:2, :]
        new_columns = columns @ mixing
        close(new_columns @ adj(new_columns), columns @ adj(columns))
        close(np.linalg.svd(new_columns.T @ SPIN_FLIP @ new_columns, compute_uv=False),
              np.r_[singular, 0, 0, 0])
        overlaps = np.abs(np.diag(new_columns.T @ SPIN_FLIP @ new_columns))
        assert overlaps.sum() >= pairs[0] - ATOL
        jensen = np.sum(overlaps ** 2 / np.sum(abs(new_columns) ** 2, axis=0))
        assert jensen >= pairs[0] ** 2 - ATOL

    for n in (3, 4, 5, 6):
        for _ in range(20):
            ensemble = [random_unit(2 ** n) for _ in range(4)]
            weights = RNG.dirichlet(np.ones(4))
            mixed = sum(p * projector(v) for p, v in zip(weights, ensemble))
            radii = np.array([bloch(partial_trace(projector(v), (0,), n)) for v in ensemble])
            mean = weights @ radii
            mean_pure_tangle = weights @ (1 - np.sum(radii ** 2, axis=1))
            close(bloch(partial_trace(mixed, (0,), n)), mean)
            close(mean_pure_tangle,
                  1 - mean @ mean - weights @ np.sum((radii - mean) ** 2, axis=1))
            pair_sum = sum(concurrence(partial_trace(mixed, (0, j), n)) ** 2 for j in range(1, n))
            assert pair_sum <= mean_pure_tangle + ATOL <= 1 + ATOL
            single = projector(ensemble[0])
            pure_pair_sum = sum(concurrence(partial_trace(single, (0, j), n)) ** 2
                                for j in range(1, n))
            assert pure_pair_sum <= 1 - radii[0] @ radii[0] + ATOL
        w = sum(ket(2 ** n, 1 << j) for j in range(n)) / np.sqrt(n)
        pair_square = sum(concurrence(partial_trace(projector(w), (0, j), n)) ** 2
                          for j in range(1, n))
        close(pair_square, 4 * (n-1) / n ** 2)


def check_rates():
    # n4:flow, n4:mt, n4:sagitta, n4:ml, n4:clock-ex
    for d in (2, 3, 5):
        for _ in range(12):
            rho = density(d)
            raw = random_complex((d, d))
            H = (raw + adj(raw)) / 2
            P = projector(random_unit(d))
            hbar, dt = 1.7, 1e-5
            U = evolve(H, dt, hbar)
            p = np.trace(rho @ P).real
            rate = 1j / hbar * np.trace(rho @ (H @ P - P @ H))
            numerical = np.trace((U @ rho @ adj(U) - adj(U) @ rho @ U) @ P) / (2*dt)
            close(rate, numerical, 1e-8)
            assert abs(rate) <= 2 / hbar * np.sqrt(variance(rho, H) * p * (1-p)) + ATOL
            if d == 2:
                h = np.array([np.trace(H @ sigma).real / 2 for sigma in PAULI])
                close(rate, -bloch(rho) @ np.cross(h, bloch(P)) / hbar)
            psi, phi, chi = (random_unit(d) for _ in range(3))
            assert fs_angle(psi, chi) <= fs_angle(psi, phi) + fs_angle(phi, chi) + ATOL
            dist = fs_angle(psi, U @ psi)
            speed = np.sqrt(variance(projector(psi), H)) / hbar
            assert dist <= speed * dt + 1e-10
            end_probability = abs(np.vdot(psi, U @ psi)) ** 2
            sagitta = 1 - np.sqrt(end_probability)
            close(1 - end_probability, 2*sagitta - sagitta**2)
            stable_sagitta = 2*np.sin(dist/2)**2
            close(sagitta, stable_sagitta)
            close(2*stable_sagitta / dt**2, speed**2, 3e-5)
            phase = np.vdot(psi, phi)
            transverse = phi - phase * psi
            close(np.linalg.norm(transverse), np.sin(fs_angle(psi, phi)))
            if d == 2:
                close(bloch(projector(psi)) @ bloch(projector(phi)),
                      np.cos(2 * fs_angle(psi, phi)))
    t = np.linspace(0, np.pi, 101)
    close(abs((1 + np.exp(-1j*t))/2), np.cos(t/2))
    close(fs_angle(PLUS, np.array([1, -1j])/np.sqrt(2)), np.pi/4)
    close(abs(np.vdot(PLUS, np.array([1, -1j])/np.sqrt(2))) ** 2, 0.5)
    for q in (0, 0.17, 0.5, 0.89, 1):
        assert min(abs(q + (1-q)*np.exp(-1j*t))) >= abs(2*q-1) - ATOL
    end = 2*np.pi/3
    three = (1 + np.exp(-1j*t) + np.exp(-2j*t))/3
    close(abs(three), abs(1 + 2*np.cos(t))/3)
    close(1 + 2*np.cos(end), 0)
    assert np.all(1 + 2*np.cos(np.linspace(0, end, 100, endpoint=False)) > 0)
    close(np.std([0, 1, 2]), np.sqrt(2/3))
    assert end > np.pi/(2*np.sqrt(2/3)) > np.pi/2
    close(end * np.sqrt(2/3), 1.7100664402158188)
    frequencies = np.linspace(0, 30*np.pi, 5001)
    assert np.all(np.cos(frequencies) >= 1 - 2/np.pi*(frequencies + np.sin(frequencies)) - ATOL)
    close(np.cos([0, np.pi]), [1, -1])
    subdivisions = np.array([8, 64, 512])
    total_sagitta = subdivisions * (1-np.cos(np.pi / (2*subdivisions)))
    assert np.all(np.diff(total_sagitta) < 0)
    assert np.all(total_sagitta <= np.pi**2 / (8*subdivisions))
    free_time = 1/(2*5e9)
    driven_time = np.pi/(2*np.pi*10e6)
    close([free_time/1e-12, driven_time/1e-9, driven_time/(2e-9),
           4*5e9*25e-9, driven_time/free_time], [100, 50, 25, 500, 500])
    close(np.trace(projector(ZERO) @ (Z @ projector(ZERO) - projector(ZERO) @ Z)), 0)
    trajectory = np.cos(t/2)**2
    assert np.abs(np.diff(trajectory)).sum() <= np.pi/2


def check_bell():
    # n4:chsh, n4:landau, n4:bell-ex, n4:transpose, n4:fourier-bell
    signs = np.array([[1, 1], [1, -1]])
    for _ in range(72):
        vectors = [RNG.normal(size=7) for _ in range(4)]
        vectors = np.array([v / np.linalg.norm(v) * RNG.uniform() for v in vectors])
        gram = vectors @ vectors.T
        assert min(np.linalg.eigvalsh(gram)) >= -ATOL
        assert abs(np.sum(signs * gram[:2, 2:])) <= 2*np.sqrt(2) + ATOL
    counts = np.array([a*(c+d) + b*(c-d) for a, b, c, d in product((-1, 1), repeat=4)])
    close(np.sort(counts), np.repeat([-2, 2], 8))
    close(np.sum(signs * signs), 4)
    pr = np.zeros((2, 2, 2, 2))
    for x, y, a, b in product((0, 1), repeat=4):
        pr[x, y, a, b] = 0.5 * ((a ^ b) == (x & y))
    close(pr.sum(axis=2), 0.5)
    close(pr.sum(axis=3), 0.5)
    close(np.einsum("xyab,a,b->xy", pr, [1, -1], [1, -1]), signs)
    # Every PSD completion would make y0-y1 both zero and of squared norm four.
    gram_pr = np.block([[np.eye(2), signs], [signs.T, np.eye(2)]])
    assert min(np.linalg.eigvalsh(gram_pr)) < 0

    def assess(a0, a1, b0, b1, alpha, beta):
        M = np.kron(a0, b0 + b1) + np.kron(a1, b0 - b1)
        close(M @ M, 4*np.eye(4) - np.kron(a0@a1-a1@a0, b0@b1-b1@b0))
        area = 4*np.sin(alpha)*np.sin(beta)
        roots = np.sqrt(np.maximum(0, [4 + area, 4 - area]))
        close(np.linalg.eigvalsh(M), [-roots[0], -roots[1], roots[1], roots[0]])
        return np.vdot(BELL, M @ BELL).real

    close(assess(Z, X, (Z+X)/np.sqrt(2), (Z-X)/np.sqrt(2), np.pi/2, np.pi/2), 2*np.sqrt(2))
    values = []
    for angle in np.deg2rad([0, 30, 45, 60, 90]):
        values.append(assess(Z, np.cos(angle)*Z+np.sin(angle)*X,
                             Z, np.cos(angle)*Z-np.sin(angle)*X, angle, angle))
    close(values, [2, 0.5+np.sqrt(3), 1+np.sqrt(2), 2.5, 2])
    close(4*np.sin(np.deg2rad([0, 30, 45, 60, 90]))**2, np.arange(5))
    assert values[3] < np.sqrt(7)

    paulis = [I, X, Y, Z]
    rho = density(4)
    terms = [np.kron(a, b) for a, b in product(paulis, repeat=2)]
    close([[np.trace(a @ b) for b in terms] for a in terms], 4*np.eye(16))
    close(sum(np.trace(rho @ t)*t/4 for t in terms), rho)
    for a, b in product(PAULI, repeat=2):
        close(partial_trace(np.kron(a, b), (0,), 2), 0)
        close(partial_trace(np.kron(a, b), (1,), 2), 0)
    close([[np.vdot(BELL, np.kron(a, b) @ BELL) for b in PAULI] for a in PAULI],
          np.diag([1, -1, 1]))
    close(partial_trace(projector(BELL), (0,), 2), I/2)
    close(partial_trace(projector(BELL), (1,), 2), I/2)
    lowering = np.outer(ONE, ZERO)
    rank_example = np.kron(projector(ZERO), projector(ZERO)) + np.kron(lowering, lowering)
    transpose_a = rank_example.reshape(2, 2, 2, 2).transpose(2, 1, 0, 3).reshape(4, 4)
    assert np.linalg.matrix_rank(rank_example) == 1
    assert np.linalg.matrix_rank(transpose_a) == 2
    pencils = [(projector(ZERO), lowering), (projector(ZERO), lowering.T),
               (I, X), (projector(ZERO), projector(ONE))]
    for A, B in product(pencils, repeat=2):
        h_a, v_a = [np.linalg.matrix_rank(join(A)) for join in (np.hstack, np.vstack)]
        h_b, v_b = [np.linalg.matrix_rank(join(B)) for join in (np.hstack, np.vstack)]
        normal = sum(np.kron(a, b) for a, b in zip(A, B))
        transposed = sum(np.kron(a.T, b) for a, b in zip(A, B))
        doubles = np.linalg.matrix_rank(transposed) == 2 * np.linalg.matrix_rank(normal)
        expected = (v_a == 2*h_a and v_b == 2*h_b) or (h_a == 2*v_a and h_b == 2*v_b)
        assert doubles == expected

    for d in range(2, 13):
        phases = np.linspace(0, np.pi/d, 4001)[:, None] + np.pi/d*np.arange(d)
        cos_sums = np.abs(np.cos(phases)).sum(axis=1)
        cap = 1/np.sin(np.pi/(2*d))
        close(max(cos_sums), cap, 1e-7)
        for _ in range(4):
            a0, a1 = random_unitary(3), random_unitary(3)
            bob = [random_unitary(2) for _ in range(d)]
            M = sum(np.kron(a0 + np.exp(2j*np.pi*y/d)*a1, b) for y, b in enumerate(bob))
            assert np.linalg.norm(M, 2) <= 2*cap + ATOL


def check_monitoring():
    # n4:zeno, n4:kac, n4:kac-ex, n4:freeze
    N = np.array([1, 4, 16, 64])
    probabilities = np.cos(np.pi/(2*N)) ** (2*N)
    close(np.round(probabilities, 3), [0, 0.531, 0.857, 0.962])
    n = np.array([100, 1000, 10000])
    assert np.all(abs(np.cos(np.pi/(2*n))**(2*n) - 1 + np.pi**2/(4*n)) * n**2 < 4)
    H = np.array([[0, 1, 1j], [1, 2, 1], [-1j, 1, 0]])
    rho = density(3)
    target = evolve(H[:2, :2], 1)
    previous_error = np.inf
    for count in (10, 100, 1000, 10000):
        retained = np.linalg.matrix_power(evolve(H, 1/count)[:2, :2], count)
        error = np.linalg.norm(retained - target)
        assert error < previous_error
        previous_error = error
    close(np.trace(retained @ rho[:2, :2] @ adj(retained)), np.trace(rho[:2, :2]), 2e-4)

    for delta in (0, np.pi/16, np.pi/4, np.pi/2, 2, np.pi, 2*np.pi):
        c, s = np.cos(delta/2), np.sin(delta/2)
        U = c*I - 1j*s*X
        v = ZERO.copy()
        survival = 1.0
        total = 0.0
        for k in range(9):
            uv = U @ v
            p = abs(uv[0]) ** 2
            v = uv - uv[0] * ZERO
            new_survival = np.vdot(v, v).real
            close(p, c**2 if k == 0 else s**4 * c**(2*(k-1)))
            close(new_survival, s**2 * c**(2*k))
            close(p, survival - new_survival)
            total += p
            close(total+new_survival, 1)
            survival = new_survival
        if abs(s) > 1e-8:
            close(c**2 + s**2 * (1 + 1/s**2), 2)
    for d in (1, 2, 3, 4):
        v = np.ones(d)/np.sqrt(d)
        P = projector(v)
        U = np.diag(np.exp(2j*np.pi*np.arange(d)/d))
        for kraus in ((U,), (U/np.sqrt(2), np.eye(d)/np.sqrt(2))):
            complement = np.eye(d) - P

            def channel(r):
                return sum(K @ r @ adj(K) for K in kraus)

            close(channel(np.eye(d)), np.eye(d))
            step = P
            occupancy = np.zeros_like(P, dtype=complex)
            total_return, mean = 0.0, 0.0
            for k in range(800):
                occupancy += step
                image = channel(step)
                p = np.trace(P @ image).real
                assert p >= -ATOL
                total_return += p
                mean += (k+1)*p
                step = complement @ image @ complement
                close(total_return + np.trace(step), 1)
            close(total_return, 1)
            close(mean, d)
            close(occupancy, np.eye(d))
        A, B = (np.eye(d) - P) @ U, P @ U
        assert np.linalg.norm(np.linalg.matrix_power(A, d), 2) < 1
        gram = sum(adj(B @ np.linalg.matrix_power(A, j)) @ B @ np.linalg.matrix_power(A, j)
                   for j in range(d))
        assert np.min(np.linalg.eigvalsh(gram)) > 0
        close(adj(np.linalg.matrix_power(A, d)) @ np.linalg.matrix_power(A, d), np.eye(d)-gram)
    for beta, energy, entropy in product((0.5, 1, 2), (0.2, 1, 4), (-3, 0, .5, 1, 3)):
        assert (energy - entropy/beta > 0) == (beta > entropy/energy)


def entropy(rho):
    eigenvalues = np.linalg.eigvalsh(rho)
    eigenvalues = eigenvalues[eigenvalues > 1e-14]
    return -np.dot(eigenvalues, np.log(eigenvalues))


def check_purity_and_phase():
    # n4:purity, n4:erasure, n4:phase, n4:reciprocity
    close((1-np.cos(np.pi/3))/2, 0.25)
    for d in (2, 3, 5):
        rho = density(d)
        psi, phi = random_unit(d), random_unit(d)
        close(np.trace(projector(psi) @ projector(phi)), abs(np.vdot(psi, phi))**2)
        close(np.trace(projector(psi) @ projector(phi)), np.trace(projector(phi) @ projector(psi)))
        centre = rho - np.eye(d)/d
        fourier = np.exp(2j*np.pi*np.outer(np.arange(d), np.arange(d))/d)/np.sqrt(d)
        first = np.diag(centre.diagonal())
        second_diag = np.diag(adj(fourier) @ centre @ fourier)
        second = (fourier * second_diag) @ adj(fourier)
        close(np.trace(first @ second), 0)
        residual = centre - first - second
        total = np.trace(rho @ rho).real - 1/d
        close(np.linalg.norm(first + second)**2 + np.linalg.norm(residual)**2, total)
        close(np.linalg.norm(first + second)**2,
              np.sum(abs(first.diagonal())**2) + np.sum(abs(second_diag)**2))
        assert 0 <= total <= 1-1/d
        close(np.diag(np.diag(np.diag(np.diag(rho)))), np.diag(np.diag(rho)))

        a_raw, b_raw = (random_complex((d, d)) for _ in range(2))
        A, B = a_raw + adj(a_raw), b_raw + adj(b_raw)
        ev, v = np.linalg.eigh(rho)
        root = (v * np.sqrt(ev)) @ adj(v)
        a, b = np.trace(rho @ A), np.trace(rho @ B)
        u, w = (A-a*np.eye(d)) @ root, (B-b*np.eye(d)) @ root
        z = np.vdot(u, w)
        close(z.real, (np.trace(rho @ (A @ B+B @ A))/2-a*b).real)
        close(z.imag, np.trace(rho @ (A @ B-B @ A))/(2j))
        G = np.linalg.norm(u)**2*np.linalg.norm(w)**2-abs(z)**2
        assert G >= -ATOL
        close(variance(rho, A)*variance(rho, B), z.real**2+z.imag**2+G)
        phase = np.exp(2j*np.pi*RNG.uniform())
        close(np.vdot(phase*psi, A @ (phase*psi)), np.vdot(psi, A @ psi))
        close(projector(phase*psi), projector(psi))
    close(np.diag(projector(PLUS)), np.diag(projector(MINUS)))
    close([np.vdot(ket_, X @ ket_) for ket_ in (PLUS, MINUS)], [1, -1])
    close([variance(projector(ZERO), op) for op in (X, Y)], [1, 1])
    close(np.vdot(X @ ZERO, Y @ ZERO), 1j)
    close(np.linalg.norm(bloch(projector(random_unit(2)))), 1)

    for _ in range(30):
        temperature = RNG.uniform(0.1, 3)
        beta = 1/temperature
        H = np.diag([0, 0.8])
        bath = np.diag(np.exp(-beta*np.diag(H)))
        bath /= np.trace(bath)
        memory = density(2)
        U = random_unitary(4)
        joint = U @ np.kron(memory, bath) @ adj(U)
        final_memory = partial_trace(joint, (0,), 2)
        final_bath = partial_trace(joint, (1,), 2)
        Q = np.trace(H @ (final_bath - bath)).real
        delta = entropy(final_memory)-entropy(memory)
        mutual = entropy(final_memory)+entropy(final_bath)-entropy(joint)
        relative = -entropy(final_bath)-np.dot(np.diag(final_bath).real, np.log(np.diag(bath)))
        close(beta*Q, -delta+mutual+relative)
        assert beta*Q >= -delta-ATOL
    close(entropy(I/2)-entropy(projector(ZERO)), np.log(2))

    theta = np.linspace(0, np.pi/2, 257)
    for power in (0.5, 1, 2, 3, 20):
        cosines, sines = abs(np.cos(theta))**power, abs(np.sin(theta))**power
        close(cosines/(cosines+sines) + sines/(sines+cosines), 1)
    close(np.cos(np.pi/3)**2, 0.25)
    close(np.cos(np.pi/3)/(np.cos(np.pi/3)+np.sin(np.pi/3)), 1/(1+np.sqrt(3)))
    for _ in range(10):
        a, b = RNG.normal(size=(2, 3))
        close(pauli(a)@pauli(b)@pauli(b)@pauli(a), (a@a)*(b@b)*I)
        close((a@b)**2+np.linalg.norm(np.cross(a, b))**2, (a@a)*(b@b))
        z = 2*np.exp(2j*np.pi*RNG.random())
        close([z**2, abs(z)**2, abs(z)**4], [(-z)**2, 4, 16])


def check_cloning_and_codes():
    # n4:clone, n4:recovery, n4:syndrome, n4:braid, n4:topology
    close(np.vdot(ZERO, PLUS)-np.vdot(ZERO, PLUS)**2, (np.sqrt(2)-1)/2)
    singlet = (np.kron(ZERO, ONE)-np.kron(ONE, ZERO))/np.sqrt(2)

    def copies(psi):
        tensor = np.kron(psi, singlet).reshape(2, 2, 2)
        return ((tensor + tensor.transpose(1, 0, 2))/np.sqrt(3)).reshape(8)

    V = np.column_stack([copies(ZERO), copies(ONE)])
    close(adj(V) @ V, I)
    close(V[:, 0], np.sqrt(2/3)*ket(8, 1)-(ket(8, 2)+ket(8, 4))/np.sqrt(6))
    for _ in range(20):
        psi = random_unit(2)
        state = projector(copies(psi))
        for first in (0, 1):
            reduced = partial_trace(state, (first,), 3)
            close(bloch(reduced), 2*bloch(projector(psi))/3)
            close(np.vdot(psi, reduced @ psi), 5/6)
        machine = partial_trace(state, (2,), 3)
        close(bloch(machine), -bloch(projector(psi))/3)
        close(np.linalg.eigvalsh(machine), [1/3, 2/3])
        close(entropy(machine)/np.log(2), -np.dot([1/3, 2/3], np.log2([1/3, 2/3])))

    for M in range(1, 6):
        shape = 2 ** (M+1)
        total_spin = np.array([sum(np.kron(np.kron(np.eye(2**j), p), np.eye(2**(M-1-j)))
                                   for j in range(M))/2 for p in PAULI])
        K = sum(np.kron(p, j) for p, j in zip(PAULI, total_spin))
        close(K @ K + K, np.kron(I, sum(j @ j for j in total_spin)))
        minimum = -M/2-1
        values, vectors = np.linalg.eigh(K)
        close(values[0], minimum)
        subspace = vectors[:, abs(values - minimum) < ATOL]
        choi_singlet = 2 * subspace @ adj(subspace) / subspace.shape[1]
        ref_y = np.kron(Y, np.eye(2**M))
        choi = ref_y @ choi_singlet @ adj(ref_y)
        close(choi.shape, (shape, shape))
        close(partial_trace(choi, (0,), M+1), I)
        fidelity = (2*M+1)/(3*M)
        for psi in (ZERO, PLUS, random_unit(2)):
            for j in range(1, M+1):
                joint = partial_trace(choi, (0, j), M+1)
                test = np.kron(projector(psi).T, projector(psi))
                close(np.trace(joint @ test), fidelity)
        close(2*fidelity-1, (M+2)/(3*M))

    for p in (1, 2, 3, 4, 6):
        shift = np.roll(np.eye(p), 1, axis=0)
        omega = np.exp(2j*np.pi/p)
        clock = np.diag(omega**np.arange(p))
        close(clock @ shift, omega*shift @ clock)
        for x, z, x2, z2 in RNG.integers(p, size=(12, 4)):
            def word(x_, z_):
                return np.linalg.matrix_power(shift, int(x_)) @ np.linalg.matrix_power(clock, int(z_))

            close(word(x, z) @ word(x2, z2), omega**(z*x2)*word((x+x2) % p, (z+z2) % p))

    encoding = np.column_stack([ket(8, 0), ket(8, 7)])
    errors = [np.eye(8), np.kron(X, np.eye(4)), np.kron(np.kron(I, X), I), np.kron(np.eye(4), X)]
    syndromes = [E @ encoding for E in errors]
    g1, g2 = np.kron(np.kron(Z, Z), I), np.kron(I, np.kron(Z, Z))
    for S, signs in zip(syndromes, [(1, 1), (-1, 1), (-1, -1), (1, -1)]):
        close(g1 @ S, signs[0]*S)
        close(g2 @ S, signs[1]*S)
    close(sum(S @ adj(S) for S in syndromes), np.eye(8))
    for noise in (np.diag([1/2, 1/4, 1/8, 1/8]), density(4), random_complex((4, 4))):
        rho = density(2)
        encoded = sum(noise[j,k]*S @ rho @ adj(T)
                      for j,S in enumerate(syndromes) for k,T in enumerate(syndromes))
        close(sum(adj(S) @ encoded @ S for S in syndromes), np.trace(noise)*rho)
    weights = np.array([1/2, 1/4, 1/8, 1/8])
    mixed_errors = np.einsum("ij,jkl->ikl", random_unitary(4),
                             np.array(syndromes)*np.sqrt(weights)[:, None, None])
    scalar = np.array([[np.vdot(E[:,0], F[:,0]) for F in mixed_errors] for E in mixed_errors])
    for j,k in product(range(4), repeat=2):
        close(adj(mixed_errors[j]) @ mixed_errors[k], scalar[j,k]*I)
    noisy = sum(E @ projector(PLUS) @ adj(E) for E in mixed_errors)
    close(sum(adj(S) @ noisy @ S for S in syndromes), projector(PLUS))

    def cross(pair):
        x, y = pair
        return (2*x-y) % 3, x

    def braid_1(triple):
        return (*cross(triple[:2]), triple[2])

    def braid_2(triple):
        return (triple[0], *cross(triple[1:]))

    fixed = [0, 0, 0]
    for pair in product(range(3), repeat=2):
        x = pair
        for i in range(3):
            x = cross(x)
            fixed[i] += x == pair
    assert fixed == [3, 3, 9]
    for point in product(range(3), repeat=3):
        assert braid_1(braid_2(braid_1(point))) == braid_2(braid_1(braid_2(point)))
        x, y, new = point
        old_first, old_last = cross((x, y))
        assert ((old_first, *cross((old_last, new))) == point) == (
            (old_first, old_last) == (x, y) and new == y)
    lower = np.outer(ZERO, ONE)
    for n in (2, 3, 4):
        operators = [np.kron(np.kron(np.linalg.matrix_power(Z, 0) if j == 0
                                     else np.diag([(-1)**i.bit_count() for i in range(2**j)]), lower),
                             np.eye(2**(n-j-1))) for j in range(1, n)]
        operators.insert(0, np.kron(lower, np.eye(2**(n-1))))
        for j,k in product(range(n), repeat=2):
            a,b = operators[j], operators[k]
            close(a @ b + b @ a, 0)
            close(a @ adj(b) + adj(b) @ a, (j == k)*np.eye(2**n))


def check_recurrence_and_growth():
    # n4:amplify, n4:torus, n4:window, n4:growth, n4:helix, n4:rigidity
    for p in (0.001, 0.13, 0.5, 0.96, 1):
        q = 3
        W, F = np.eye(2*q)[:, :q], np.eye(2*q)[:, q:]
        J = np.sqrt(p)*W + np.sqrt(1-p)*F
        P = W @ W.T
        close(J.T @ P @ J, p*np.eye(q))
        U = (2*J @ J.T - np.eye(2*q)) @ (np.eye(2*q)-2*P)
        theta = np.arcsin(np.sqrt(p))
        for step in range(10):
            result = np.linalg.matrix_power(U, step) @ J
            expected = np.sin((2*step+1)*theta)*W + np.cos((2*step+1)*theta)*F
            close(result, expected)
            close(np.kron(np.linalg.matrix_power(U, step), I) @ np.kron(J, I),
                  np.kron(expected, I))
    close(np.arcsin(2.0**-20) / 2.0**-20, 1)
    for count in (6, 16, 64):
        queries = 3
        weights = RNG.dirichlet(np.ones(count), size=queries)
        assert np.sum((2*np.sqrt(weights).sum(axis=0))**2) <= 4*queries**2 + ATOL
        assert np.sqrt(count-3)/12 <= np.sqrt(count)/12

    alpha = (np.sqrt(5)-1)/2
    orbit = np.arange(1, 5001)
    golden_points = orbit*alpha % 1
    assert np.count_nonzero(golden_points[:21] < 1-alpha) == 8
    assert 21 - int(22*alpha) + int(alpha) == 8
    close(round(1-alpha, 3), 0.382)
    for x in (0, 0.13, 0.78):
        for frequency in (-4, -1, 0, 1, 5):
            ratio = np.exp(2j*np.pi*frequency*alpha)
            measured = np.exp(2j*np.pi*frequency*(x+orbit*alpha)).mean()
            if frequency == 0:
                close(measured, 1)
            else:
                close(measured, np.exp(2j*np.pi*frequency*x)
                      * ratio*(1-ratio**len(orbit))/(len(orbit)*(1-ratio)))
                assert abs(measured) <= 2/(len(orbit)*abs(1-ratio)) + ATOL
        hits = np.flatnonzero((x+golden_points) % 1 < 0.2)
        assert np.max(np.diff(hits)) <= 10
        close(len(hits)/len(orbit), 0.2, 0.002)
    for a, u, step in product((0.125, 0.75), (0.0625, 0.375),
                              (0.125, alpha, np.sqrt(2)/2)):
        shifted = u - a + orbit*step
        carries = np.floor(shifted+step)-np.floor(shifted)
        hits = np.cumsum(shifted % 1 < 1-step)
        predicted = orbit*(1-step) + (u-a+(orbit+1)*step) % 1 - (u-a+step) % 1
        close(hits, predicted)
        close(hits, orbit-np.cumsum(carries))
        assert np.all(abs(hits-orbit*(1-step)) < 1)
    # Exact binary fractions exercise the half-open right endpoint.
    assert not (0.75 % 1 < 1-0.25)
    assert 0.75 % 1 == 1-0.25

    vector = np.r_[2.0**-np.arange(32), 0]
    errors = []
    for j in (1, 2, 4, 8, 16, 32):
        P = np.diag(np.r_[np.ones(j), np.zeros(len(vector)-j)])
        errors.append(np.linalg.norm(vector-P @ vector))
        close(np.linalg.norm(np.eye(len(vector))-P, 2), 1)
    assert np.all(np.diff(errors) < 0)
    close(errors[-1], 0)
    T = np.roll(np.eye(6), 1, axis=0)
    L = np.eye(6)[:2, :]
    ranks = []
    for m in range(9):
        O = np.column_stack([np.linalg.matrix_power(T.T, k) @ L.T for k in range(m+1)])
        ranks.append(np.linalg.matrix_rank(O))
    close(ranks, [2, 3, 4, 5, 6, 6, 6, 6, 6])
    assert np.count_nonzero(np.diff(ranks)) == T.shape[0] - np.linalg.matrix_rank(L)
    base = random_complex((8, 4))
    new = random_complex((8,))
    residual = new - base @ np.linalg.lstsq(base, new, rcond=None)[0]
    close(adj(base) @ residual, 0)
    extended = np.column_stack((base, new))
    close(np.linalg.det(adj(extended) @ extended)/np.linalg.det(adj(base) @ base),
          np.linalg.norm(residual)**2)
    old_primes = np.array([2, 3, 5, 7, 11, 13])
    assert np.prod(old_primes) + 1 == 59*509 == 30031
    for p in (59, 509):
        assert all(p % k for k in range(2, int(np.sqrt(p)) + 1))
    close(30031 % old_primes, 1)
    for dim in (2, 3, 4, 5):
        close(np.linalg.det(np.eye(dim)), 1)  # Hodge star on the oriented unit volume.

    period = 2*np.log((1+np.sqrt(5))/2)
    for t in (-3, 0.73, 5):
        close([np.cos(t+2*np.pi), np.sin(t+2*np.pi)], [np.cos(t), np.sin(t)])
        assert t+2*np.pi != t
        modes = np.arange(-7, 8)
        close(np.exp(2j*np.pi*modes*(t+period)/period), np.exp(2j*np.pi*modes*t/period))
        assert (t+2*period, (-1)**2) != (t, 1)
    U = np.diag([1, 1, -1])
    v01 = np.array([1, 1, 0])/np.sqrt(2)
    v12 = np.array([0, 1, 1])/np.sqrt(2)
    close(U @ v01, v01)
    close(np.vdot(v12, U @ v12), 0)
    close(projector(1j*v12), projector(v12))


if __name__ == "__main__":
    groups = (
        check_entanglement, check_rates, check_bell, check_monitoring,
        check_purity_and_phase, check_cloning_and_codes,
        check_recurrence_and_growth,
    )
    for check in groups:
        check()
        print(f"PASS {check.__name__}")
    print(f"PASS {len(groups)} check groups (NumPy {np.__version__}, seed 20261120)")
