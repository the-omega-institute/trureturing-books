#!/usr/bin/env python3
"""Finite numerical regressions for the attention section (sec:attention), vendored from module n5. Run with python3 check.py."""

from itertools import combinations, product

import numpy as np

TOL = 2e-11
I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.diag([1, -1]).astype(complex)
H = (X + Z) / np.sqrt(2)
S = np.diag([1, 1j])
CZ = np.diag([1, 1, 1, -1])
ZERO, ONE = I.T
PLUS, MINUS = H.T
PAULIS = dict(zip("IXYZ", (I, X, Y, Z)))
RNG = np.random.default_rng(20261120)


def equal(actual, expected, tol=TOL):
    np.testing.assert_allclose(actual, expected, atol=tol, rtol=0)


def same_ray_map(actual, target, weight):
    phase = np.vdot(target, actual)
    assert abs(phase) > TOL
    equal(actual, phase / abs(phase) * np.sqrt(weight) * target)


def tensor(*factors):
    result = np.array(1, dtype=complex)
    for factor in factors:
        result = np.kron(result, factor)
    return result


def projector(state):
    return np.outer(state, state.conj())


def rotation(pauli, angle):
    return np.cos(angle / 2) * np.eye(len(pauli)) - 1j * np.sin(angle / 2) * pauli


def state(dimension):
    vector = RNG.normal(size=dimension) + 1j * RNG.normal(size=dimension)
    return vector / np.linalg.norm(vector)


def word(labels):
    return tensor(*(PAULIS[label] for label in labels))


def local(pauli, site, n):
    return tensor(*(pauli if i == site else I for i in range(n)))


def marginal(vector, keep, n):
    rest = [i for i in range(n) if i not in keep]
    matrix = vector.reshape((2,) * n).transpose(keep + rest).reshape(2 ** len(keep), -1)
    return matrix @ matrix.conj().T


def basis(angle, bit):
    return np.array([1, (-1) ** bit * np.exp(1j * angle)]) / np.sqrt(2)


def odd(edges, subset):
    parity = set()
    for a, b in edges:
        if a in subset:
            parity.symmetric_difference_update({b})
        if b in subset:
            parity.symmetric_difference_update({a})
    return parity


def open_graph(n, edges, inputs):
    bits = np.array(list(product((0, 1), repeat=n)))
    phase = (-1) ** sum((bits[:, a] * bits[:, b] for a, b in edges), start=0)
    columns = np.zeros((2**n, 2 ** len(inputs)), dtype=complex)
    indices = bits[:, inputs] @ (2 ** np.arange(len(inputs) - 1, -1, -1))
    columns[np.arange(len(bits)), indices] = phase / np.sqrt(2 ** (n - len(inputs)))
    return columns.reshape((2,) * n + (columns.shape[1],))


def measure(branch, remaining, vertex, ket):
    return np.tensordot(ket.conj(), branch, axes=(0, remaining.index(vertex)))


def apply_on(branch, remaining, vertex, gate):
    axis = remaining.index(vertex)
    return np.moveaxis(np.tensordot(gate, branch, axes=(1, axis)), 0, axis)


def j_gate(angle):
    return H @ rotation(Z, -angle)


def check_measurements():
    for angle in (0, np.pi / 3, -0.71):
        observable = np.cos(angle) * X + np.sin(angle) * Y
        equal(observable, rotation(Z, angle) @ X @ rotation(Z, angle).conj().T)
        for bit in (0, 1):
            ket = basis(angle, bit)
            equal(projector(ket), (I + (-1) ** bit * observable) / 2)
            contraction = measure(open_graph(2, [(0, 1)], [0]), [0, 1], 0, ket)
            expected = np.linalg.matrix_power(X, bit) @ j_gate(angle)
            equal(contraction, np.exp(-1j * angle / 2) * expected / np.sqrt(2))
            equal(contraction.conj().T @ contraction, I / 2)
            for x, z in product((0, 1), repeat=2):
                frame = np.linalg.matrix_power(X, x) @ np.linalg.matrix_power(Z, z)
                row = ket.conj() @ frame
                shifted_ket = basis((-1) ** x * angle, bit ^ z)
                equal(np.outer(row.conj(), row), projector(shifted_ket))
    equal(j_gate(np.pi / 3) @ ZERO * np.exp(-1j * np.pi / 6), PLUS)
    for pauli in (X, Y, Z):
        equal(np.linalg.det(-1j * pauli), 1)
        equal(projector(pauli @ PLUS), projector(-1j * pauli @ PLUS))
    equal(projector(np.exp(0.37j) * PLUS), projector(PLUS))

    edges = [(0, 2), (0, 3), (0, 4), (1, 3), (1, 4), (2, 3)]
    correcting = {0: {2, 3, 4}, 1: {2, 4}, 2: {3, 4}}
    measured = [0, 1, 2]
    assert [odd(edges, correcting[v]) for v in measured] == [{0, 2, 3}, {1, 3}, {2}]
    assert [sum(v in odd(edges, {w}) for v in measured) for w in (3, 4)] == [3, 2]
    resource = open_graph(5, edges, [0, 1])
    angles = [0.43, -0.22, 0.91]
    target = None
    for outcomes in product((0, 1), repeat=3):
        remaining = list(range(5))
        branch = resource
        for v, angle, bit in zip(measured, angles, outcomes):
            branch = measure(branch, remaining, v, basis(angle, bit))
            remaining.remove(v)
            if bit:
                for w in odd(edges, correcting[v]) - {v}:
                    branch = apply_on(branch, remaining, w, Z)
                for w in correcting[v]:
                    branch = apply_on(branch, remaining, w, X)
        branch = branch.reshape(4, 4)
        equal(branch.conj().T @ branch, np.eye(4) / 8)
        if target is None:
            target = branch * np.sqrt(8)
        same_ray_map(branch, target, 1 / 8)
    # The empty measurement list is the graph preparation isometry itself.
    flat = resource.reshape(32, 4)
    equal(flat.conj().T @ flat, np.eye(4))


def check_cluster():
    for a, b, c in [(0.31, 0.92, -1.7), (0.0, np.pi, 0.0), (1.1, 0.0, -0.4)]:
        expected = rotation(Z, a) @ rotation(X, b) @ rotation(Z, c)
        equal(j_gate(0) @ j_gate(-a) @ j_gate(-b) @ j_gate(-c), expected)
    equal(np.linalg.matrix_power(j_gate(0), 4), I)
    cnot = tensor(I, H) @ CZ @ tensor(I, H)
    reverse = tensor(H, I) @ CZ @ tensor(H, I)
    equal(cnot @ reverse @ cnot, np.eye(4)[[0, 2, 1, 3]])
    for s in (0, 1):
        actual = (np.eye(4) - 1j * (-1) ** s * tensor(Z, Z)) / 2
        equal(actual, rotation(tensor(Z, Z), (-1) ** s * np.pi / 2) / np.sqrt(2))
        given = np.exp(-1j * np.pi / 4) * tensor(S, S) @ CZ
        same_ray_map(np.linalg.matrix_power(tensor(Z, Z), s) @ actual, given, 1 / 2)

    # A full 3-by-2 rectangle: two wire edges, one mediator and one Z deletion.
    edges = [(i, i + 1) for i in (0, 2, 4)] + [(i, i + 2) for i in range(4)]
    resource = open_graph(6, edges, [0, 4])
    angles = (0.39, -0.71)
    target = tensor(*(j_gate(angle) for angle in angles)) @ CZ
    for deleted, mediator, a, b in product((0, 1), repeat=4):
        vertices = list(range(6))
        branch = measure(resource, vertices, 3, I[:, deleted])
        vertices.remove(3)
        branch = measure(branch, vertices, 2, basis(np.pi / 2, mediator))
        vertices.remove(2)
        mediator ^= deleted
        for v, angle, outcome in zip((0, 4), angles, (a, b)):
            # On each input, the mediator contributes S and a tracked Z.
            branch = measure(branch, vertices, v, basis(angle + np.pi / 2, outcome))
            vertices.remove(v)
        net_x = (a ^ mediator, b ^ mediator)
        for v, bit in zip((1, 5), net_x):
            if bit:
                branch = apply_on(branch, vertices, v, X)
            if deleted:
                branch = apply_on(branch, vertices, v, Z)
        same_ray_map(branch.reshape(4, 4), target, 1 / 16)


def check_slice_and_cloning():
    j = -1j * Y
    singlet = (tensor(ZERO, ONE) - tensor(ONE, ZERO)) / np.sqrt(2)
    for n in (1, 2, 3):
        columns = tensor(*(j for _ in range(n)))
        psi = state(2**n)
        reference = np.conj(columns.conj().T @ psi)
        conditioned = reference.conj() @ columns.T / np.sqrt(2**n)
        equal(conditioned, psi / np.sqrt(2**n))
        equal(np.vdot(conditioned, conditioned), 2 ** (-n))
    for pauli in (X, Y, Z):
        u = rotation(pauli, 0.37)
        equal(tensor(u, u) @ singlet, singlet)
    graph = CZ @ tensor(PLUS, PLUS)
    equal(graph, np.array([1, 1, 1, -1]) / 2)
    equal(np.vdot(singlet, graph), 0)
    equal(np.vdot(ZERO, PLUS), 1 / np.sqrt(2))
    equal(np.vdot(tensor(ZERO, ZERO), tensor(PLUS, PLUS)), 1 / 2)
    clone_basis = [tensor(ZERO, ZERO), tensor(ONE, ONE)]
    equal(np.array(clone_basis).conj() @ np.array(clone_basis).T, I)

    swap_clones = [1, 0, 2]
    for psi in [ZERO, ONE, PLUS, *[state(2) for _ in range(10)]]:
        first = tensor(psi, singlet)
        clone = (first + first.reshape(2, 2, 2).transpose(swap_clones).reshape(8)) / np.sqrt(3)
        orthogonal = j @ psi.conj()
        equal(np.vdot(psi, orthogonal), 0)
        expected = np.sqrt(2 / 3) * tensor(psi, psi, orthogonal)
        expected -= (tensor(psi, orthogonal, psi) + tensor(orthogonal, psi, psi)) / np.sqrt(6)
        equal(clone, expected)
        rho, perpendicular = projector(psi), projector(orthogonal)
        for site in (0, 1):
            equal(marginal(clone, [site], 3), (5 * rho + perpendicular) / 6)
        machine = marginal(clone, [2], 3)
        equal(machine, (rho + 2 * perpendicular) / 3)
        spectrum = np.linalg.eigvalsh(machine)
        equal(spectrum, [1 / 3, 2 / 3])
        equal(np.linalg.det(machine), 2 / 9)
        equal(-spectrum @ np.log2(spectrum), np.log2(3) - 2 / 3)
        for pauli in (X, Y, Z):
            r = np.trace(pauli @ rho)
            equal(np.trace(pauli @ machine), -r / 3)
            equal(np.trace(pauli @ marginal(clone, [0], 3)), 2 * r / 3)
    phi = (tensor(ZERO, ZERO) + tensor(ONE, ONE)) / np.sqrt(2)
    projectors = [(I + s * p) / 2 for p in (X, Y, Z) for s in (1, -1)]
    equal(sum(tensor(p.T, p) for p in projectors), np.eye(4) + 2 * projector(phi))
    a = np.column_stack([tensor(phi, e) for e in (ZERO, ONE)])
    b = a.reshape(2, 2, 2, 2).transpose(0, 2, 1, 3).reshape(8, 2)
    equal(a.conj().T @ b, I / 2)
    equal(np.linalg.eigvalsh(a @ a.conj().T + b @ b.conj().T), [0] * 4 + [0.5] * 2 + [1.5] * 2)
    equal(2 * (2 + 2 * 1.5) / 12, 5 / 6)


def syndrome(error, generators):
    return "".join(str(int(not np.allclose(g @ error, error @ g))) for g in generators)


def code_checks(labels, errors, expected_distance):
    n = len(labels[0])
    identity = np.eye(2**n)
    generators = [word(label) for label in labels]
    code = identity.astype(complex)
    for g in generators:
        equal(g.conj().T, g)
        equal(g @ g, identity)
        code = code @ (identity + g) / 2
    for g, h in combinations(generators, 2):
        equal(g @ h, h @ g)
    equal(code @ code, code)
    equal(np.trace(code), 2)
    values, vectors = np.linalg.eigh(code)
    embedding = vectors[:, values > 0.5]
    images = np.array([e @ embedding for e in errors])
    gram = np.einsum("aki,bkj->abij", images.conj(), images)
    equal(gram, np.eye(len(errors))[:, :, None, None] * I)
    q = np.einsum("aki,ali->kl", images, images.conj())
    equal(q @ q, q)
    equal(np.trace(q), 2 * len(errors))

    rho = projector(state(2))
    logical_embedding = embedding @ state(2)
    sigma = projector(state(len(errors)))
    damaged = np.einsum("ab,aki,ij,blj->kl", sigma, images, rho, images.conj(), optimize=True)
    recovered = np.einsum("aki,kl,alj->ij", images.conj(), damaged, images, optimize=True)
    equal(recovered, rho)
    equal(np.trace(damaged), 1)
    if n == 3:
        equal(q, identity)
        return generators, code

    for i in range(n):
        equal(marginal(logical_embedding, [i], n), I / 2)
    signs = [syndrome(e, generators) for e in errors]
    assert len(set(signs)) == len(errors)
    # Any product of single-site errors has weight at most two and has
    # nonzero syndrome unless it is a scalar.
    for a, b in combinations(errors, 2):
        assert "1" in syndrome(a.conj().T @ b, generators)
    witness = word(expected_distance)
    assert sum(label != "I" for label in expected_distance) == 3
    assert "1" not in syndrome(witness, generators)
    compression = embedding.conj().T @ witness @ embedding
    equal(np.trace(compression), 0)
    equal(compression.conj().T @ compression, I)
    return generators, code


def check_recovery():
    errors = [np.eye(8)] + [local(X, i, 3) for i in range(3)]
    generators, _ = code_checks(["ZZI", "IZZ"], errors, None)
    assert [syndrome(e, generators) for e in errors] == ["00", "10", "11", "01"]
    e = np.eye(8)
    d = e[:, [0, 7]]
    images = np.array([m @ d for m in errors])
    assert [tuple(np.argmax(np.abs(s), axis=0)) for s in images] == [(0, 7), (4, 3), (2, 5), (1, 6)]
    weights = np.array([1 / 2, 1 / 4, 1 / 8, 1 / 8])
    rho = projector(PLUS)
    damaged = sum(p * s @ rho @ s.conj().T for p, s in zip(weights, images))
    equal(sum(s.conj().T @ damaged @ s for s in images), rho)
    ghz = d @ PLUS
    for i in range(3):
        equal(marginal(ghz, [i], 3), I / 2)
        equal(marginal(d @ ZERO, [i], 3), projector(ZERO))
        v = state(2)
        equal(marginal(d @ v, [i], 3), np.diag(np.abs(v)**2))
    phase_error = local(Z, 0, 3)
    equal(phase_error @ ghz, d @ MINUS)
    equal(np.vdot(ghz, phase_error @ ghz), 0)
    equal(d.conj().T @ phase_error @ d, Z)
    assert syndrome(errors[1] @ errors[2], generators) == syndrome(errors[3], generators)
    equal(d.conj().T @ errors[1] @ errors[2] @ errors[3] @ d, X)
    plus_density = projector(PLUS)
    equal((plus_density + Z @ plus_density @ Z) / 2, I / 2)
    equal((projector(MINUS) + Z @ projector(MINUS) @ Z) / 2, I / 2)
    equal((I / np.sqrt(2)).conj().T @ (Z / np.sqrt(2)), Z / 2)

    # Rotate the Kraus basis and include a zero weight to test diagonalization.
    kraus = np.concatenate([weights[:, None, None] ** 0.5 * errors, np.zeros((1, 8, 8))])
    mixing, _ = np.linalg.qr(RNG.normal(size=(5, 5)) + 1j * RNG.normal(size=(5, 5)))
    rotated = np.einsum("ka,kij->aij", mixing, kraus)
    equal(sum(m.conj().T @ m for m in rotated), e)
    restricted = rotated @ d
    cross = np.einsum("aki,bkj->abij", restricted.conj(), restricted)
    coefficients = cross[:, :, 0, 0]
    equal(cross, coefficients[:, :, None, None] * I)
    found, unitary = np.linalg.eigh(coefficients)
    equal(found, [0, 1 / 8, 1 / 8, 1 / 4, 1 / 2])
    new = np.einsum("ka,kij->aij", unitary, restricted)
    equal(new[0], np.zeros((8, 2)))
    branches = new[1:] / np.sqrt(found[1:, None, None])
    equal(np.einsum("aki,bkj->abij", branches.conj(), branches), np.eye(4)[:, :, None, None] * I)
    equal(sum(m @ rho @ m.conj().T for m in restricted), damaged)

    singles = lambda n: [np.eye(2**n)] + [local(p, j, n) for p in (X, Z, Y) for j in range(n)]
    five, _ = code_checks(["XZZXI", "IXZZX", "XIXZZ", "ZXIXZ"], singles(5), "IYYIX")
    table = "0001 1000 1100 0110 0011 1010 0101 0010 1001 0100 1011 1101 1110 1111 0111".split()
    assert [syndrome(e, five) for e in singles(5)[1:]] == table
    equal(word("XXXXX") @ word("ZZZZZ"), -word("ZZZZZ") @ word("XXXXX"))
    equal(word("XXXXX") @ five[0], -word("IYYIX"))

    masks = ((np.arange(1, 8)[:, None] >> np.arange(2, -1, -1)) & 1).T
    equal(masks @ masks.T % 2, np.zeros((3, 3)))
    equal(masks.sum(axis=1), [4, 4, 4])
    combos = np.array(list(product((0, 1), repeat=3)))[1:]
    equal((combos @ masks % 2).sum(axis=1), [4] * 7)
    steane_labels = ["".join(p if b else "I" for b in row) for p in "XZ" for row in masks]
    steane, code = code_checks(steane_labels, singles(7), "ZZZIIII")
    assert len({syndrome(e, steane) for e in singles(7)}) == 22
    # The incomplete Steane syndrome basis needs a complement Kraus family.
    q = sum(e @ code @ e.conj().T for e in singles(7))
    equal((np.eye(128) - q) @ q, np.zeros((128, 128)))
    equal(np.trace(np.eye(128) - q), 84)

    for p in (2, 3, 4, 5):
        omega = np.exp(2j * np.pi / p)
        shift = np.roll(np.eye(p), 1, axis=0)
        clock = np.diag(omega ** np.arange(p))
        words = {(x, z): np.linalg.matrix_power(shift, x) @ np.linalg.matrix_power(clock, z)
                 for x, z in product(range(p), repeat=2)}
        for (x, z), (a, b) in product(words, repeat=2):
            equal(words[x, z] @ words[a, b], omega ** (z * a) * words[(x + a) % p, (z + b) % p])


def check_gradients():
    arbitrary = RNG.normal(size=(2, 2)) + 1j * RNG.normal(size=(2, 2))
    equal(sum(np.trace(arbitrary @ projector(v)) for v in (PLUS, MINUS)), np.trace(arbitrary))
    p = tensor(X, Y)
    l = p / 2
    test = RNG.normal(size=(4, 4)) + 1j * RNG.normal(size=(4, 4))
    test += test.conj().T.copy()
    x, y = state(4), state(4)
    rho = (projector(x) + projector(state(4))) / 2

    def density(angle):
        u = rotation(p, angle)
        return u @ rho @ u.conj().T

    def expect(angle, observable=test):
        return np.trace(density(angle) @ observable)

    def real_readout(a, b):
        return np.vdot(a, b).real

    for theta in (-2, -0.1, 0, 1.3):
        center, q = rotation(p, theta) @ x, rotation(p, theta + np.pi) @ x
        equal(real_readout(center, q), 0)
        derivative = 1j * np.trace(density(theta) @ (l @ test - test @ l))
        equal(derivative.imag, 0)
        equal(expect(theta).imag, 0)
        equal(expect(theta, p), expect(0, p))
        a = (expect(0) - expect(np.pi)) / 2
        k = (expect(0) + expect(np.pi)) / 2
        b = expect(np.pi / 2) - k
        equal(expect(theta), k + a * np.cos(theta) + b * np.sin(theta))
        for step in (0.27, np.pi / 2, 0.83, -0.45, np.pi):
            above, below = rotation(p, theta + step) @ x, rotation(p, theta - step) @ x
            equal(2 * real_readout(center, above) * center - above, below)
            equal(2 * real_readout(q, above) * q - above, -below)
            for direction in (y, 1j * y):
                rp, rm = real_readout(direction, above), real_readout(direction, below)
                mid, transverse = real_readout(direction, center), real_readout(direction, q)
                equal(rp + rm, 2 * np.cos(step / 2) * mid)
                equal(rp - rm, 2 * np.sin(step / 2) * transverse)
                equal(rp**2 - rm**2, 2 * np.sin(step) * mid * transverse)
            equal(expect(theta + step) - expect(theta - step), 2 * np.sin(step) * derivative)
    # A single measured axis with distinct downstream costs on its two branches.
    effects = [X, Z]
    def measurement_cost(angle):
        total = 0j
        for bit, effect in enumerate(effects):
            ket = basis(angle, bit)
            row = tensor(ket.conj()[None, :], I)
            contribution = np.trace(effect @ row @ rho @ row.conj().T)
            equal(contribution, np.trace(tensor(projector(ket), effect) @ rho))
            total += contribution
        return total

    theta = 0.39
    differentiated = sum(np.trace(tensor((-1) ** s * (-np.sin(theta) * X + np.cos(theta) * Y) / 2,
                                        effect) @ rho) for s, effect in enumerate(effects))
    equal(differentiated, (measurement_cost(theta + np.pi / 2) - measurement_cost(theta - np.pi / 2)) / 2)

    equal(expect(0.31 + 0.47), expect(0.31 + 0.47 + 2 * np.pi))
    gap, theta = 1.7, 0.42
    delta = np.pi / (2 * gap)
    derivative_gap = gap * 1j * np.trace(density(gap * theta) @ (l @ test - test @ l))
    equal(derivative_gap, gap * (expect(gap * (theta + delta)) - expect(gap * (theta - delta))) / 2)
    equal(np.cos(2 * (np.pi / 4 + np.pi / 2)), np.cos(2 * (np.pi / 4 - np.pi / 2)))
    equal(-2 * np.sin(2 * np.pi / 4), -2)

    theta = np.pi / 3
    angles = [theta, theta + np.pi / 2, theta - np.pi / 2]
    equal(np.cos(angles), [1 / 2, -np.sqrt(3) / 2, np.sqrt(3) / 2])
    for angle in angles:
        v = rotation(Y, angle) @ ZERO
        equal(np.vdot(v, Z @ v), np.cos(angle))
        equal(abs(v[0])**2, (1 + np.cos(angle)) / 2)
    equal(-np.sin(theta) / 2, -np.sqrt(3) / 4)
    h = np.pi / 6
    equal((np.cos(theta + h) - np.cos(theta - h)) / (2 * h), -np.sin(theta) * np.sin(h) / h)
    equal(1 - 3 / np.pi, 0.045, tol=1e-4)
    for h, denominator, predicted in [(np.pi / 2, 1, 0.0354), (np.pi / 30, np.pi / 30, 0.5826)]:
        numerator = 2 - np.cos(theta + h)**2 - np.cos(theta - h)**2
        equal(np.sqrt(numerator / (400 * denominator**2)), predicted, tol=5e-5)

    r = np.array([np.sqrt(3) / 2, 0, 1 / 2])
    azimuth = 0.91
    psi = np.array([np.cos(theta / 2), np.exp(1j * azimuth) * np.sin(theta / 2)])
    dt = np.array([-np.sin(theta / 2), np.exp(1j * azimuth) * np.cos(theta / 2)]) / 2
    dp = np.array([0, 1j * psi[1]])
    horizontal = np.column_stack([dt, dp])
    metric = (horizontal.conj().T @ (I - projector(psi)) @ horizontal).real
    equal(metric, np.diag([1, np.sin(theta)**2]) / 4)
    gz = np.array([0, 0, 1]) - r[2] * r
    equal(gz, [-np.sqrt(3) / 4, 0, 3 / 4])
    equal(gz @ gz, 3 / 4)
    equal(gz @ r, 0)
    update = r - gz / 10
    update /= np.linalg.norm(update)
    equal(update, np.array([21 * np.sqrt(3), 0, 17]) / (2 * np.sqrt(403)))
    assert update[2] < r[2]
    for sign in (1, -1):
        pole = np.array([0, 0, sign])
        equal(np.array([0, 0, 1]) - pole[2] * pole, [0, 0, 0])
        equal(np.linalg.det(-sign * I), 1)
    time = np.linspace(0, 2, 4097)
    z = np.tanh(np.arctanh(0.5) - time)
    equal(z[-1] - z[0], -np.trapezoid(1 - z**2, time), tol=8e-8)

    d = 2**20
    equal(1 / (d * 0.1**2), 9.5367431640625e-5)
    points = RNG.normal(size=(40_000, 16))
    points /= np.linalg.norm(points, axis=1, keepdims=True)
    equal(np.mean(points[:, 0] ** 2), 1 / 16, tol=0.003)
    assert np.mean(np.abs(points[:, 0]) >= 0.4) <= 1 / (16 * 0.4**2)
    spectrum = 2.0 ** -np.arange(1, 61)
    equal(spectrum.sum(), 1)
    assert np.count_nonzero(spectrum >= 1 / 8) == 3 <= 8
    equal(np.count_nonzero(np.ones(8) / 8 >= 1 / 8), 8)


def check_braids():
    def crossing(colors, index, sign=1, rack=False):
        x, y = colors[index:index + 2]
        if rack:
            pair = ((y + 1) % 3, x) if sign > 0 else (y, (x - 1) % 3)
        else:
            pair = ((2 * x - y) % 3, x) if sign > 0 else (y, (2 * y - x) % 3)
        return colors[:index] + pair + colors[index + 2:]

    def action(colors, braid, rack=False):
        for index, sign in reversed(braid):
            colors = crossing(colors, index, sign, rack)
        return colors

    def fixed(n, braid, rack=False):
        return {colors for colors in product(range(3), repeat=n) if action(colors, braid, rack) == colors}

    for colors in product(range(3), repeat=3):
        equal(action(colors, [(0, 1), (1, 1), (0, 1)]),
              action(colors, [(1, 1), (0, 1), (1, 1)]))
        equal(action(colors, [(0, -1), (0, 1)]), colors)
        x, y, z = colors
        equal((2 * x - (2 * y - z)) % 3, (2 * (2 * x - y) - (2 * x - z)) % 3)
    for colors in product(range(3), repeat=4):
        assert action(colors, [(0, 1), (2, 1)]) == action(colors, [(2, 1), (0, 1)])
    for k, count in enumerate((9, 3, 3, 9)):
        braid = [(0, 1)] * k
        old = fixed(2, braid)
        assert len(old) == count
        for sign in (1, -1):
            new = braid + [(1, sign)]
            assert fixed(3, new) == {c + (c[-1],) for c in old}
            assert len(fixed(3, [(0, 1), (1, -1)] + new + [(1, 1), (0, -1)])) == count
    assert len(fixed(1, [])) == len(fixed(2, [(0, 1)])) == 3
    assert len(fixed(1, [], rack=True)) == 3
    assert len(fixed(2, [(0, 1)], rack=True)) == 0

    lowering = np.outer(ZERO, ONE)
    rising = lowering.conj().T
    for n in (1, 2, 3, 4):
        c = [tensor(*(Z if i < j else lowering if i == j else I for i in range(n))) for j in range(n)]
        for i, j in product(range(n), repeat=2):
            equal(c[i] @ c[j] + c[j] @ c[i], np.zeros((2**n, 2**n)))
            equal(c[i] @ c[j].conj().T + c[j].conj().T @ c[i], (i == j) * np.eye(2**n))
        for j in range(n - 1):
            equal(c[j].conj().T @ c[j + 1], local(rising, j, n) @ local(lowering, j + 1, n))
        for j in range(n - 2):
            equal(c[j].conj().T @ c[j + 2],
                  local(rising, j, n) @ local(Z, j + 1, n) @ local(lowering, j + 2, n))
    a, b = tensor(lowering, I), tensor(Z, lowering)
    equal(a.conj().T @ b.conj().T @ tensor(ZERO, ZERO), tensor(ONE, ONE))
    equal(b.conj().T @ a.conj().T @ tensor(ZERO, ZERO), -tensor(ONE, ONE))
    no_string = tensor(I, lowering)
    equal(a @ no_string + no_string @ a, 2 * tensor(lowering, lowering))


def check_fourier_and_local_indistinguishability():
    for q in (1, 2, 5, 8, 16):
        wave = np.exp(2j * np.pi * np.outer(np.arange(q), np.arange(q)) / q) / np.sqrt(q)
        equal(wave.conj().T @ wave, np.eye(q))
        equal(wave.conj(), wave[-np.arange(q) % q, :])

    # Finite representative of the local-indistinguishability compression:
    # the first site is fixed and errors on it alone are correctable.
    d = tensor(ZERO[:, None], I)
    local_errors = [tensor(p, I) / 2 for p in (I, X, Y, Z)]
    equal(sum(e.conj().T @ e for e in local_errors), np.eye(4))
    for a, b in product(local_errors, repeat=2):
        reduced = d.conj().T @ a.conj().T @ b @ d
        equal(reduced, np.trace(reduced) / 2 * I)
    rho = projector(state(2))
    noisy = sum(e @ d @ rho @ d.conj().T @ e.conj().T for e in local_errors)
    equal(noisy[:2, :2] + noisy[2:, 2:], rho)


if __name__ == "__main__":
    for test in (
        check_measurements, check_cluster, check_slice_and_cloning, check_recovery,
        check_gradients, check_braids, check_fourier_and_local_indistinguishability,
    ):
        test()
        print(f"PASS {test.__name__}")
    print("PASS all seven NumPy check groups")
