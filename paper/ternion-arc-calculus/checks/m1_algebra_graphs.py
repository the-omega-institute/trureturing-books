"""Finite numerical and exact-integer checks for Part 0 (star algebras and comparison graphs)."""

from itertools import combinations, permutations, product
import numpy as np


TOL = 2e-10
RNG = np.random.default_rng(872)
I2 = np.eye(2)
X = np.array([[0, 1], [1, 0]])
Y = np.array([[0, -1j], [1j, 0]])
Z = np.diag([1, -1])
PAULI = np.array([X, Y, Z])


def equal(actual, expected):
    np.testing.assert_allclose(actual, expected, atol=TOL, rtol=TOL)


def adjoint(a):
    return a.conj().T


def sharp(a):
    return np.trace(a) * I2 - a


def unitary():
    coefficients = RNG.normal(size=4)
    coefficients /= np.linalg.norm(coefficients)
    return coefficients[0] * I2 + 1j * np.einsum("i,ijk->jk", coefficients[1:], PAULI)


def matrix_distance(a, b):
    return np.linalg.norm(a - b, ord=2)


def algebra_identities(u, star):
    identity = np.eye(len(u))
    inverse = star(u)
    equal(inverse @ u, identity)
    equal(u @ inverse, identity)
    symmetric = (u + inverse) / 2
    odd = (u - inverse) / 2
    v = identity - symmetric
    chord = u - identity
    equal(symmetric @ odd, odd @ symmetric)
    equal(symmetric @ symmetric - odd @ odd, identity)
    equal(odd @ odd, -v @ (2 * identity - v))
    equal(star(chord) @ chord, 2 * v)
    equal(chord @ star(chord), 2 * v)

    t_prev, t = identity, symmetric
    q_prev, q = np.zeros_like(u), identity
    for n in range(9):
        positive = np.linalg.matrix_power(u, n)
        negative = np.linalg.matrix_power(inverse, n)
        equal(t_prev + q_prev @ odd, positive)
        equal(t_prev - q_prev @ odd, negative)
        equal(identity - (positive + negative) / 2, identity - t_prev)
        t_prev, t = t, 2 * symmetric @ t - t_prev
        q_prev, q = q, 2 * symmetric @ q - q_prev
    return symmetric, odd


def clifford_checks():
    generators = []
    for i in range(4):
        generator = np.zeros((16, 16), dtype=int)
        for mask in range(16):
            sign = (-1) ** (mask & ((1 << i) - 1)).bit_count()
            generator[mask ^ (1 << i), mask] = sign
        generators.append(generator)
    identity = np.eye(16)
    e1, e2, e3, e4 = generators
    b12, b34 = e1 @ e2, e3 @ e4
    volume = b12 @ b34
    b = b12 + b34
    equal(b12 @ b34, b34 @ b12)
    equal(b.T, -b)
    equal(b @ b, -2 * identity + 2 * volume)
    equal(volume @ volume, identity)
    eigenvector = (identity - volume)[:, 0]
    assert np.linalg.norm(eigenvector) > 0
    equal(b.T @ b @ eigenvector, 4 * eigenvector)
    assert np.linalg.norm(b, ord=2) > 1
    even, odd = algebra_identities((identity + b12) @ (identity + b34) / 2, adjoint)
    equal(even, (identity + volume) / 2)
    equal(odd, b / 2)
    coefficients = RNG.normal(size=16)
    matrix = np.zeros_like(identity)
    for mask, coefficient in enumerate(coefficients):
        monomial = identity
        for i, generator in enumerate(generators):
            if mask & (1 << i):
                monomial = monomial @ generator
        matrix += coefficient * monomial
    equal((matrix.T @ matrix)[0, 0], coefficients @ coefficients)


def check_algebra():
    for _ in range(12):
        u = unitary()
        algebra_identities(u, adjoint)
        for n in range(-8, 9):
            equal(np.linalg.norm(np.linalg.matrix_power(u, n), ord=2), 1)
        x, y = unitary(), unitary()
        u = y @ adjoint(x)
        s, a = algebra_identities(u, adjoint)
        v = I2 - s
        equal(y - x, (a - v) @ x)
        equal(np.linalg.norm((y - x)[:, 0]) ** 2, 2 * v[0, 0])
        h, k = unitary(), unitary()
        equal(matrix_distance(h @ x @ k, h @ y @ k), matrix_distance(x, y))
        equal(matrix_distance(adjoint(x), adjoint(y)), matrix_distance(x, y))
    _, nonscalar_odd = algebra_identities(np.diag([1, 1j]), adjoint)
    equal(nonscalar_odd @ nonscalar_odd, np.diag([0, -1]))
    _, odd = algebra_identities(1j * I2, adjoint)
    equal(odd @ odd, -I2)
    assert all(2 * value % 2 == 0 for value in (0, 1))
    assert (2 - 1 - 1) % 2 == 0
    clifford_checks()


def check_growth_and_spin():
    dual = np.array([[0, 1], [0, 0]])
    split = Z
    rotation = np.array([[0, -1], [1, 0]])
    for generator, square in [(dual, 0), (split, 1), (rotation, -1)]:
        equal(sharp(generator), -generator)
        equal(generator @ generator, square * I2)
        equal(sharp(generator) @ generator, -square * I2)
        equal(np.trace(generator), 0)
        equal(np.linalg.det(generator), -square)

    for theta in (0.21, np.pi / 6, np.pi / 2, 2.8):
        s = np.cos(theta)
        odd = np.sin(theta) * rotation
        u = s * I2 + odd
        algebra_identities(u, sharp)
        n0 = int(np.floor(np.pi / (2 * theta))) + 1
        assert np.cos(n0 * theta) < 0
        assert min(np.cos(np.arange(n0) * theta)) >= -TOL
        for n in range(-12, 13):
            expected = np.cos(n * theta) * I2 + np.sin(n * theta) * rotation
            equal(np.linalg.matrix_power(u, n), expected)
            equal(np.linalg.norm(expected, ord=2), 1)

    for s in (1, -1):
        for odd in (dual, np.zeros_like(dual)):
            u = s * I2 + odd
            algebra_identities(u, sharp)
            for n in range(-12, 13):
                expected = s ** n * (I2 + n * s * odd)
                equal(np.linalg.matrix_power(u, n), expected)
                equal(np.sum(np.abs(expected[0])), 1 + abs(n) * abs(odd[0, 1]))

    eta = 0.48
    for sign in (1, -1):
        s = sign * np.cosh(eta)
        b = np.sqrt(s * s - 1)
        p, q = (I2 + split) / 2, (I2 - split) / 2
        equal(p @ q, 0)
        equal(p @ p, p)
        equal(q @ q, q)
        equal(p + q, I2)
        u = s * I2 + b * split
        algebra_identities(u, sharp)
        for n in range(-12, 13):
            expected = (s + b) ** n * p + (s - b) ** n * q
            equal(np.linalg.matrix_power(u, n), expected)
            equal(np.linalg.norm(expected, ord=2), (abs(s) + b) ** abs(n))
            equal(np.trace(expected) / 2, sign ** n * np.cosh(n * eta))

    t = np.diag([1., 1.], k=1)
    t2, identity = t @ t, np.eye(3)
    involution = np.diag([1, -1, 1])
    cubic_star = lambda a: involution @ a @ involution
    u = identity + t + t2 / 2
    s, _ = algebra_identities(u, cubic_star)
    equal(np.linalg.eigvals(s), 1)
    for n in range(-12, 13):
        power = np.linalg.matrix_power(u, n)
        equal(power, identity + n * t + n * n * t2 / 2)
        equal(np.sum(np.abs(power[0])), 1 + abs(n) + n * n / 2)

    for a in (unitary(), dual, np.array([[1 + 2j, 4], [-1j, 2]])):
        b = unitary() + 0.42 * X
        equal(sharp(sharp(a)), a)
        equal(sharp(a @ b), sharp(b) @ sharp(a))
        equal(a @ sharp(a), np.linalg.det(a) * I2)
        equal(sharp(a) @ a, np.linalg.det(a) * I2)
    diagonal_cases = [np.exp(0.4j), np.exp(0.4), np.exp(0.4 + 0.3j)]
    for lam, kind in zip(diagonal_cases, ("elliptic", "hyperbolic", "loxodromic")):
        u = np.diag([lam, 1 / lam])
        v = 1 - np.trace(u) / 2
        assert {
            "elliptic": abs(v.imag) < TOL and 0 < v.real < 2,
            "hyperbolic": abs(v.imag) < TOL and v.real < 0,
            "loxodromic": abs(v.imag) > TOL,
        }[kind]
        z = 0.9 - 0.3j
        result = u @ np.array([z, 1])
        equal(result[0] / result[1], lam ** 2 * z)
    equal(1 - np.trace(I2 + dual) / 2, 0)
    equal(1 - np.trace(-I2 + dual) / 2, 2)
    equal((I2 + dual) @ np.array([2, 1]), [3, 1])
    coordinates = np.array([2.0, 0.2, -0.3, 0.4])
    h = coordinates[0] * I2 + np.einsum("i,ijk->jk", coordinates[1:], PAULI)
    det = coordinates[0] ** 2 - coordinates[1:] @ coordinates[1:]
    equal(np.linalg.det(h), det)
    null_ray = np.diag([1, 0])
    for u in [unitary(), I2 + dual, np.diag(np.exp([eta / 2, -eta / 2]))]:
        transformed = u @ h @ adjoint(u)
        equal(np.linalg.det(transformed), det)
        equal(transformed, adjoint(transformed))
    b = np.diag(np.exp([eta / 2, -eta / 2]))
    equal(np.diag(b @ h @ b), np.exp([eta, -eta]) * np.diag(h))
    equal((I2 + dual) @ null_ray @ adjoint(I2 + dual), null_ray)
    z = 0.2 + 0.6j
    upper = I2 + z * dual
    a, b, w = h[0, 0], h[1, 1], h[0, 1]
    transformed = upper @ h @ adjoint(upper)
    equal(transformed[0, 0], a + 2 * (z * w.conj()).real + abs(z)**2 * b)
    equal(transformed[1, 1], b)
    equal(transformed[0, 1], w + z * b)
    hermitian_basis = [I2, *PAULI]
    derivative = []
    for generator in [*PAULI, *(1j * PAULI)]:
        action = np.array([generator @ h + h @ adjoint(generator) for h in hermitian_basis])
        derivative.append(np.concatenate([action.real.ravel(), action.imag.ravel()]))
    assert np.linalg.matrix_rank(derivative) == 6
    theta = 0.4
    k = np.diag(np.exp([1j * theta, -1j * theta]))
    equal((k @ h @ adjoint(k))[0, 1], np.exp(2j * theta) * h[0, 1])


def walk_gain(gains, walk):
    result = I2
    for i, j in zip(walk, walk[1:]):
        result = result @ gains[i, j]
    return result


def unoriented_cycles(vertices, edges):
    for size in range(3, len(vertices) + 1):
        for subset in combinations(vertices, size):
            root, *rest = subset
            for order in permutations(rest):
                if order[0] > order[-1]:
                    continue
                cycle = (root, *order, root)
                if all(tuple(sorted(pair)) in edges for pair in zip(cycle, cycle[1:])):
                    yield cycle


def chordless(cycle, edges):
    vertices = cycle[:-1]
    ring_edges = {tuple(sorted(pair)) for pair in zip(cycle, cycle[1:])}
    return all(
        tuple(sorted(pair)) not in edges or tuple(sorted(pair)) in ring_edges
        for pair in combinations(vertices, 2)
    )


def reconstruction(vertices, edges, gains, multiply, inverse, identity, improve=False):
    if not vertices:
        return {}
    if improve and len(vertices) == 4:
        for hub in vertices:
            if all(v == hub or tuple(sorted((hub, v))) in edges for v in vertices):
                return {v: identity if v == hub else gains[hub, v] for v in vertices}
    for x in vertices:
        neighbors = [w for w in vertices if tuple(sorted((w, x))) in edges]
        if all(tuple(sorted(pair)) in edges for pair in combinations(neighbors, 2)):
            break
    else:
        raise ValueError("No simplicial vertex")
    potential = reconstruction(
        [v for v in vertices if v != x], edges, gains,
        multiply, inverse, identity, improve,
    )
    if neighbors:
        w = max(neighbors)
        potential[x] = multiply(potential[w], inverse(gains[x, w]))
    else:
        potential[x] = identity
    return potential


def real_optimum(vertices, gains, cycles):
    error = max(
        (abs(sum(gains[i, j] for i, j in zip(c, c[1:]))) / (len(c) - 1)
         for c in cycles),
        default=0,
    )
    potential = {v: 0.0 for v in vertices}
    for _ in vertices:
        for (i, j), gain in gains.items():
            potential[j] = min(potential[j], potential[i] + gain + error)
    actual = max(
        (abs(g - (potential[j] - potential[i])) for (i, j), g in gains.items()),
        default=0,
    )
    equal(actual, error)
    return error


def check_chordal():
    graph_count = 0
    for n in range(6):
        vertices = list(range(n))
        possible_edges = list(combinations(vertices, 2))
        for mask in range(1 << len(possible_edges)):
            edges = {edge for k, edge in enumerate(possible_edges) if mask & (1 << k)}
            cycles = list(unoriented_cycles(vertices, edges))
            if any(len(c) > 4 and chordless(c, edges) for c in cycles):
                continue
            graph_count += 1
            flat_reference = {v: unitary() for v in vertices}
            exact, perturbed, real = {}, {}, {}
            for i, j in sorted(edges):
                exact[i, j] = adjoint(flat_reference[i]) @ flat_reference[j]
                perturbed[i, j] = exact[i, j] @ np.diag(np.exp(1j * RNG.uniform(-0.2, 0.2) * np.array([1, -1])))
                real[i, j] = RNG.uniform(-1, 1)
                for gains in (exact, perturbed):
                    gains[j, i] = adjoint(gains[i, j])
                real[j, i] = -real[i, j]
            triangles = [c for c in cycles if len(c) == 4]
            epsilon = max((matrix_distance(walk_gain(perturbed, c), I2)
                           for c in triangles), default=0)
            for gains, bound in ((exact, 0), (perturbed, max(n - 2, 0) * epsilon)):
                potential = reconstruction(vertices, edges, gains, np.matmul, adjoint, I2)
                for (i, j), gain in gains.items():
                    assert matrix_distance(gain, adjoint(potential[i]) @ potential[j]) <= bound + TOL
            if n >= 4:
                potential = reconstruction(vertices, edges, perturbed, np.matmul, adjoint, I2,
                                           improve=True)
                for (i, j), gain in perturbed.items():
                    error = matrix_distance(gain, adjoint(potential[i]) @ potential[j])
                    assert error <= (n - 3) * epsilon + TOL
            for c in cycles:
                holonomy = walk_gain(perturbed, c)
                assert matrix_distance(holonomy, I2) <= (len(c) - 3) * epsilon + TOL
            real_epsilon = max((abs(sum(real[i, j] for i, j in zip(c, c[1:])))
                                for c in triangles), default=0)
            if n >= 3:
                assert real_optimum(vertices, real, cycles) <= (n - 2) * real_epsilon / n + TOL

    epsilon = 0.5
    for n in range(3, 11):
        vertices = list(range(n))
        gains = {(0, j): 0.0 for j in range(1, n)}
        gains.update({(j, j + 1): epsilon for j in range(1, n - 1)})
        edges = set(gains)
        gains.update({(j, i): -g for (i, j), g in list(gains.items())})
        potential = reconstruction(vertices[::-1], edges, gains, np.add, np.negative, 0)
        equal([potential[j] - potential[0] for j in range(1, n)],
              np.arange(n - 1) * epsilon)
        equal(abs(gains[0, n - 1] - (potential[n - 1] - potential[0])), (n - 2) * epsilon)
        fan_cycles = list(unoriented_cycles(vertices, edges))
        equal(real_optimum(vertices, gains, fan_cycles), (n - 2) * epsilon / n)

    exact_integer_errors = []
    for b, c in product(range(-3, 4), repeat=2):
        exact_integer_errors.append(max(abs(1 - b), abs(b - c), abs(c)))
    assert min(exact_integer_errors) == 1
    return graph_count


def check_holonomy():
    gains = {}
    for i, j in ((0, 1), (1, 2), (2, 3), (0, 3), (0, 2), (3, 4), (4, 5), (3, 5)):
        gains[i, j] = unitary()
        gains[j, i] = adjoint(gains[i, j])
    k = [unitary() for _ in range(7)]
    gauged = {(i, j): adjoint(k[i]) @ g @ k[j] for (i, j), g in gains.items()}
    for walk in ((0,), (2, 1, 0), (0, 1, 2, 0), (4, 3, 0, 2, 3, 4)):
        equal(walk_gain(gauged, walk), adjoint(k[walk[0]]) @ walk_gain(gains, walk) @ k[walk[-1]])
        equal(walk_gain(gains, walk[::-1]), adjoint(walk_gain(gains, walk)))
    assert not np.allclose(gains[0, 1] @ gains[1, 2], gains[1, 2] @ gains[0, 1])
    equal(walk_gain(gains, (0, 1, 2, 3, 0)),
          walk_gain(gains, (0, 1, 2, 0)) @ walk_gain(gains, (0, 2, 3, 0)))
    equal(walk_gain(gains, (0, 3, 4, 5, 3, 0)),
          gains[0, 3] @ walk_gain(gains, (3, 4, 5, 3)) @ gains[3, 0])
    tree_paths = [(0,), (0, 1), (0, 1, 2), (0, 1, 2, 3),
                  (0, 1, 2, 3, 4), (0, 1, 2, 3, 4, 5)]
    t = [walk_gain(gains, w) for w in tree_paths]
    normalized = {(i, j): t[i] @ g @ adjoint(t[j]) for (i, j), g in gains.items()}
    for i in range(5):
        equal(normalized[i, i + 1], I2)
    non_tree_edges = [(0, 2), (0, 3), (3, 5)]
    assert len(non_tree_edges) == len(gains) // 2 - len(t) + 1
    for i, j in non_tree_edges:
        cycle = tree_paths[i] + tree_paths[j][::-1]
        equal(normalized[i, j], walk_gain(gains, cycle))
    h = unitary()
    assert matrix_distance(h, I2) > TOL
    square = {(i, j): I2 for i, j in ((0, 1), (1, 2), (2, 3))}
    square[3, 0] = h
    square.update({(j, i): adjoint(g) for (i, j), g in list(square.items())})
    equal(walk_gain(square, (0, 1, 2, 3, 0)), h)
    f = [unitary() for _ in range(5)]
    f[0] = I2
    wheel = {(i, j): adjoint(f[i]) @ f[j] for i, j in
             ((0, 1), (0, 2), (0, 3), (0, 4), (1, 2), (2, 3), (3, 4), (4, 1))}
    wheel.update({(j, i): adjoint(g) for (i, j), g in list(wheel.items())})
    equal(walk_gain(wheel, (1, 2, 3, 4, 1)), I2)
    for i, j in wheel:
        equal(wheel[i, j], adjoint(f[i]) @ f[j])
    p, q = (1, 0, 2), (0, 2, 1)
    conjugate = lambda by, a: tuple(by[a[by.index(i)]] for i in range(3))
    s3 = list(permutations(range(3)))
    assert any(conjugate(by, p) == q for by in s3)
    assert not any((conjugate(by, p), conjugate(by, p)) == (p, q) for by in s3)


    tree_path_gains = {0: 0.0, 1: 0.0, 2: 0.7, 3: -0.8}
    rooted_cycle_gain = -0.2
    edge_list = [(0, 1), (1, 2), (2, 3), (0, 3)]
    gains = {(i, j): tree_path_gains[j] - tree_path_gains[i] for i, j in edge_list}
    gains[0, 3] += rooted_cycle_gain
    gauge = {0: 0.0, 1: 0.3, 2: -0.2, 3: 0.0}
    new_gains = {(i, j): g + gauge[j] - gauge[i] for (i, j), g in gains.items()}
    for assignment in (gains, new_gains):
        anchor_path = sum(assignment[edge] for edge in edge_list[:3])
        equal(anchor_path, -0.8)
        equal(assignment[0, 3] - anchor_path, rooted_cycle_gain)
    assert len(edge_list) + 2 - len(tree_path_gains) == 2


def check_gram():
    values = [unitary() for _ in range(6)]
    gains = np.array([[adjoint(a) @ b for b in values] for a in values])
    for i, j, k in product(range(len(values)), repeat=3):
        equal(gains[i, j] @ gains[j, k], gains[i, k])
    equal(walk_gain({(i, j): g for i, row in enumerate(gains)
                     for j, g in enumerate(row)}, (0, 2, 1, 5, 3)), gains[0, 3])
    shifted = [values[2] @ a for a in values]
    equal(gains, [[adjoint(a) @ b for b in shifted] for a in shifted])
    equal(gains[2], [adjoint(values[2]) @ a for a in values])
    assert (-1) ** 2 == 1 and (-1) ** 2 != -1

    reads = gains[:, :, 0, 0].real
    equal(np.diag(reads), 1)
    assert min(np.linalg.eigvalsh(reads)) >= -TOL
    chords = np.linalg.norm(
        np.array(values)[:, None, :, 0] - np.array(values)[None, :, :, 0],
        axis=-1,
    )
    equal(chords ** 2, 2 - 2 * reads)
    for i, j, k in product(range(len(values)), repeat=3):
        assert chords[i, k] <= chords[i, j] + chords[j, k] + TOL

    x = RNG.normal(size=(7, 4))
    gram = x @ x.T
    center = np.eye(len(x)) - np.ones((len(x), len(x))) / len(x)
    squared = np.sum((x[:, None] - x[None, :]) ** 2, axis=2)
    reconstructed = -center @ squared @ center / 2
    equal(reconstructed, center @ gram @ center)
    eigenvalues, eigenvectors = np.linalg.eigh(reconstructed)
    embedding = eigenvectors * np.sqrt(np.maximum(eigenvalues, 0))
    equal(np.sum((embedding[:, None] - embedding[None, :]) ** 2, axis=2), squared)
    z = center @ RNG.normal(size=len(x))
    equal(z @ squared @ z, -2 * z @ gram @ z)
    assert z @ squared @ z <= TOL
    equal(np.linalg.norm(x[0] + x[1])**2 + np.linalg.norm(x[0] - x[1])**2,
          2 * (np.linalg.norm(x[0])**2 + np.linalg.norm(x[1])**2))
    e1, e2 = I2
    lhs = (x[0] @ x[0]) * (x[1] @ x[1]) - (x[0] @ x[1]) ** 2
    wedges = [x[0, i] * x[1, j] - x[0, j] * x[1, i] for i, j in combinations(range(x.shape[1]), 2)]
    equal(lhs, np.dot(wedges, wedges))
    z = RNG.normal(size=2) + 1j * RNG.normal(size=2)
    phase = np.exp(0.8j)
    equal(np.outer((phase * z).conj(), phase * z), np.outer(z.conj(), z))
    hermitian = np.array([[2, 1j], [-1j, 2]])
    equal(np.vdot(z, hermitian @ z), np.vdot(phase * z, hermitian @ (phase * z)))
    assert np.vdot(z, hermitian @ z).real >= 0
    equal(np.linalg.norm(e1 + e2, 1)**2 + np.linalg.norm(e1 - e2, 1)**2, 8)
    equal(2 * (np.linalg.norm(e1, 1)**2 + np.linalg.norm(e2, 1)**2), 4)
    complex_vectors = np.array(values)[:, :, 0].T
    rotated = unitary() @ complex_vectors
    equal(adjoint(rotated) @ rotated, adjoint(complex_vectors) @ complex_vectors)

    j1, j2 = np.array([[0, -1], [1, 0]]), np.array([[0, -2], [0.5, 0]])
    f = [I2, (I2 + j1) / np.sqrt(2), (I2 - j2) / np.sqrt(2)]
    equal(j1 @ j2, np.diag([-0.5, -2]))
    equal(j1 @ j1, -I2)
    equal(j2 @ j2, -I2)
    for a in f:
        equal(sharp(a) @ a, I2)
    r = np.array([[np.trace(sharp(a) @ b) / 2 for b in f] for a in f])
    equal(r[np.triu_indices(3, 1)], [1 / np.sqrt(2), 1 / np.sqrt(2), -1 / 8])
    assert np.max(np.abs(r[np.triu_indices(3, 1)])) < 1
    equal(np.linalg.det(r), -9 / 64)
    equal(f[1] @ f[1] @ f[2] @ f[2], np.diag([0.5, 2]))

    q = np.exp(1j * np.pi / 6)
    read = np.array([[1, q, q], [q.conjugate(), 1, -1], [q.conjugate(), -1, 1]])
    equal(read[0, 1] * read[1, 2] * read[2, 0], -1)
    equal(abs(read[1, 2] - read[1, 0] * read[0, 2]), 2)
    equal(read.real[np.triu_indices(3, 1)], [np.sqrt(3) / 2, np.sqrt(3) / 2, -1])
    equal(np.linalg.det(read.real), -3)
    equal(np.linalg.eigvalsh(read.real), [(1 - np.sqrt(7)) / 2, (1 + np.sqrt(7)) / 2, 2])
    equal(2 * np.sqrt(2 - np.sqrt(3)), np.sqrt(6) - np.sqrt(2))
    assert np.sqrt(6) - np.sqrt(2) < 2

    noisy = gains.copy()
    for i, j in combinations(range(len(values)), 2):
        noisy[i, j] = noisy[i, j] @ np.diag(np.exp(1j * np.array([1, -1]) * RNG.uniform(-0.15, 0.15)))
        noisy[j, i] = adjoint(noisy[i, j])
    m = len(values)
    for o in (0, None):
        anchor = noisy[0] if o == 0 else np.array([unitary() for _ in values])
        errors = np.array([[noisy[i, j] - adjoint(anchor[i]) @ anchor[j]
                            for j in range(m)] for i in range(m)])
        delta = max(np.linalg.norm(e, ord=2) for e in errors.reshape(-1, 2, 2))
        degree = m - 2 if o == 0 else m - 1
        error_reads = errors[:, :, 0, 0].real
        equal(np.diag(error_reads), 0)
        if o == 0:
            equal(error_reads[0], 0)
        assert max(np.sum(abs(error_reads), axis=1)) <= degree * delta + TOL
        assert min(np.linalg.eigvalsh(noisy[:, :, 0, 0].real)) >= -degree * delta - TOL

    similarity = np.array([[2, 1], [0, 1]])
    similar_rotations = [
        similarity @ np.array([[np.cos(theta), -np.sin(theta)],
                               [np.sin(theta), np.cos(theta)]]) @ np.linalg.inv(similarity)
        for theta in np.arange(5) * 2 * np.pi / 5
    ]
    invariant = sum(g.T @ g for g in similar_rotations) / len(similar_rotations)
    assert min(np.linalg.eigvalsh(invariant)) > 0
    for g in similar_rotations:
        equal(g.T @ invariant @ g, invariant)
        equal(np.linalg.solve(invariant, g.T @ invariant), np.linalg.inv(g))


def check_sphere_and_phase():
    e1, e2, e3 = np.eye(3)
    for step in (0.03, 0.4, 1.1, np.pi / 2):
        c, s = np.cos(step), np.sin(step)
        a, b, p = e1, c * e1 + s * e2, c * e1 + s * e3
        for endpoints, determinant in [([a, b, e3], s**2), ([a, b, p], s**4)]:
            equal(np.linalg.det(np.array(endpoints) @ np.array(endpoints).T), determinant)
        equal((b - c * a) @ (p - c * a), 0)
        tangent_a = a - (a @ b) * b
        tangent_p = p - (p @ b) * b
        cosine = (tangent_a @ tangent_p) / (np.linalg.norm(tangent_a) * np.linalg.norm(tangent_p))
        equal(cosine, c / np.sqrt(1 + c*c))
        area = 2 * np.arctan(np.tan(step / 2)**2)
        equal(area, 2 * np.arccos(cosine) - np.pi / 2)
        assert area > 0
        equal(b @ p, c*c)
        if step < np.pi / 2:
            assert b @ p < a @ b
    for step in (0.1, 0.05, 0.02):
        area = 2 * np.arctan(np.tan(step / 2)**2)
        assert abs(area - step**2 / 2) <= step**4
    equal(2 * np.arctan(1), np.pi / 2)
    equal(np.cross(e1, e2), e3)

    v0, vx = np.array([1, 0]), np.array([1, 1]) / np.sqrt(2)
    vy = np.array([1, 1j]) / np.sqrt(2)
    for sign in (1, -1):
        vectors = np.array([v0, vx, vy if sign > 0 else vy.conj()])
        projectors = [np.outer(v, v.conj()) for v in vectors]
        gram = vectors.conj() @ vectors.T
        equal(np.trace(projectors[0] @ projectors[1] @ projectors[2]), (1 + sign * 1j) / 4)
        overlaps = gram[0, 1], gram[1, 2], gram[2, 0]
        equal(np.prod(overlaps), (1 + sign * 1j) / 4)
        equal(np.abs(overlaps)**2, 1 / 2)
        equal(np.prod(np.array(overlaps) / np.abs(overlaps)), np.exp(sign * 1j * np.pi / 4))
        phase = np.exp(1j * np.array([0.6, 0.8, -0.3]))
        rephased = vectors * phase[:, None]
        equal(rephased.conj() @ rephased.T, phase.conj()[:, None] * gram * phase[None, :])
        current = vectors[0]
        for target in [vectors[1], vectors[2], vectors[0]]:
            overlap = np.vdot(current, target)
            current = target * (overlap.conjugate() / abs(overlap))
        equal(current, np.exp(-sign * 1j * np.pi / 4) * v0)
    rx = np.array([[1, 0, 0], [0, 0, -1], [0, 1, 0]])
    ry = np.array([[0, 0, 1], [0, 1, 0], [-1, 0, 0]])
    equal(rx @ ry @ e3, e1)
    equal(ry @ rx @ e3, -e2)
    p0, p1, pp = np.outer(v0, v0), I2 - np.outer(v0, v0), np.outer(vx, vx)
    assert not np.allclose(p0 @ pp, pp @ p0)
    for p in (p0, p1):
        equal(adjoint(X @ p) @ (X @ p), p)
    equal(p0 + p1, I2)
    equal(np.trace(p0 @ p0 @ p0 @ p1), 0)
    equal(X @ p0 @ X, p1)
    equal(np.trace((X @ p0) @ p0 @ adjoint(X @ p0) @ p1), 1)


    for t in (0, 0.3, 1):
        z, w = np.exp(0.7j), np.exp(1.2j)
        a = np.array([np.sqrt(1 - t), np.sqrt(t) * z])
        b = np.array([np.sqrt(1 - t), np.sqrt(t) * w])
        equal(np.vdot(a, b), 1 - t + t * z.conjugate() * w)
        equal(np.vdot(a, a), 1)
        equal(np.linalg.norm(a - b) ** 2, 2 - 2 * np.vdot(a, b).real)
    square = [
        [np.kron(X, I2), np.kron(I2, X), np.kron(X, X)],
        [np.kron(I2, Y), np.kron(Y, I2), np.kron(Y, Y)],
        [np.kron(X, Y), np.kron(Y, X), np.kron(Z, Z)],
    ]
    contexts = square + list(zip(*square))
    for context, sign in zip(contexts, (1, 1, 1, 1, 1, -1)):
        for a, b in combinations(context, 2):
            equal(a @ b, b @ a)
        equal(np.linalg.multi_dot(context), sign * np.eye(4))


def main():
    check_algebra()
    check_growth_and_spin()
    chordal_count = check_chordal()
    check_holonomy()
    check_gram()
    check_sphere_and_phase()
    print(f"PASS: algebra, powers, spin, {chordal_count} labeled chordal graphs "
          f"on up to five vertices, gauge, Gram geometry, and phases")


if __name__ == "__main__":
    main()
