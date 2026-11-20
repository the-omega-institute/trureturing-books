#!/usr/bin/env python3
"""Deterministic finite checks for Section 9A (arc bodies and the tropical limit of Gram elimination). NumPy only."""

from itertools import combinations, permutations, product
from math import factorial, log2

import numpy as np


def close(got, expected, *, rtol=3e-12, atol=3e-13):
    np.testing.assert_allclose(got, expected, rtol=rtol, atol=atol)


def real_angle(x, y):
    return np.arccos(np.clip(np.dot(x, y), -1, 1))


def main_geometry(rng):
    B, U, V = np.eye(3)
    for eps in np.r_[0, np.geomspace(1e-5, 0.1, 31), np.linspace(0.1, np.pi / 2, 80)]:
        s, c = np.sin(eps), np.cos(eps)
        A, C = c * B + s * U, c * B + s * V
        X = np.column_stack((A, B, C))
        G = X.T @ X
        close(G, [[1, c, c**2], [c, 1, c], [c**2, c, 1]])
        close(np.linalg.det(G), s**4)
        close(np.linalg.det(np.column_stack((A, B, V))) ** 2, s**2)
        close(abs(np.linalg.det(X)) / 6, s**2 / 6)
        close(np.dot(U, V), 0)
        chord = np.linalg.norm(A - C)
        arc = 2 * np.arcsin(s / np.sqrt(2))
        close(chord, np.sqrt(2) * s)
        close(chord, 2 * np.sin(arc / 2))
        close(chord**2 / 2, s**2)
        close(np.cos(arc), c**2)
        if eps:
            assert chord < arc < 2 * eps, eps
        else:
            close([chord, arc, 2 * eps], 0)
        rs = np.array([np.linalg.norm((1 - t) * A + t * C) ** 2
                       for t in [0, 0.25, 0.5, 0.75, 1]])
        close(rs, 1 - 2 * np.array([0, 0.1875, 0.25, 0.1875, 0]) * s**2)
        close(1 - np.sqrt(rs[2]), 1 - np.sqrt((1 + c**2) / 2))
        radii = np.linspace(0, 1, 21)
        wall_lengths = np.linalg.norm(A - radii[:, None]*B, axis=1)
        wall_lengths += np.linalg.norm(C - radii[:, None]*B, axis=1)
        close(wall_lengths, 2*np.sqrt((radii-c)**2+s*s))
        close(np.linalg.norm(A-c*B)+np.linalg.norm(C-c*B), 2*s)
        cap_excess = 2 * np.arctan(np.tan(eps / 2) ** 2)
        close(np.tan(cap_excess / 2), s**2 / (1 + c) ** 2)
        if eps >= 0.1:
            theta1 = B - c * A
            theta2 = C - c**2 * A
            acute = real_angle(theta1 / np.linalg.norm(theta1),
                               theta2 / np.linalg.norm(theta2))
            close(2 * acute - np.pi / 2, cap_excess)
            if eps < np.pi / 2:
                close(schur(G, [0, 2], [1]), np.diag([s**2, s**2]))
    eps = np.deg2rad([15, 30, 45, 60, 90])
    arc = np.arccos(np.cos(eps) ** 2)
    chord = np.sqrt(2) * np.sin(eps)
    table = np.column_stack((2 * eps, arc, chord, 1 - np.cos(arc / 2),
                             1 - chord / (2 * eps)))
    close(np.round(table, 6), [
        [0.523599, 0.368100, 0.366025, 0.016889, 0.300943],
        [1.047198, 0.722734, 0.707107, 0.064586, 0.324763],
        [1.570796, 1.047198, 1.000000, 0.133975, 0.363380],
        [2.094395, 1.318116, 1.224745, 0.209431, 0.415227],
        [3.141593, 1.570796, 1.414214, 0.292893, 0.549842],
    ], atol=0, rtol=0)
    close(np.tan(eps[3] / 2) ** 2, 1 / 3)
    close(np.round(np.rad2deg(2 * np.arctan(1 / 3)), 2), 36.87)
    close(2 * np.arctan(np.tan(eps[4] / 2) ** 2), np.pi / 2)
    eps = 0.0125
    chord = np.sqrt(2) * np.sin(eps)
    arc = 2 * np.arcsin(np.sin(eps) / np.sqrt(2))
    close((arc - chord) / eps**3, np.sqrt(2) / 12, rtol=3e-4)
    close((2 * eps - arc) / eps, 2 - np.sqrt(2), rtol=3e-4)
    close((1 - np.cos(arc / 2)) / eps**2, 0.25, rtol=3e-4)
    close(2 * np.arctan(np.tan(eps / 2) ** 2) / eps**2, 0.5, rtol=3e-4)
    # Integrate the radial Jacobian with two-point Gauss quadrature.
    nodes, weights = np.polynomial.legendre.leggauss(2)
    close(weights @ ((nodes + 1) / 2) ** 2 / 2, 1 / 3)

    for x, y, phi in product([-1, -0.6, 0, 0.7, 1],
                             [-1, -0.6, 0, 0.7, 1], [0, 0.3, np.pi]):
        u, v = np.sqrt(1 - x*x), np.sqrt(1 - y*y)
        A = x*B + u*U
        C = y*B + v*(np.cos(phi)*U + np.sin(phi)*V)
        X = np.column_stack((A, B, C))
        z = A @ C
        close(z, x*y + u*v*np.cos(phi))
        assert x*y - u*v - 1e-14 <= z <= x*y + u*v + 1e-14
        close(np.linalg.det(X.T @ X), (1-x*x)*(1-y*y) - (z-x*y)**2)
        close([x*y-u*v, x*y+u*v],
              np.cos([np.arccos(x)+np.arccos(y), np.arccos(x)-np.arccos(y)]))
        assert np.linalg.matrix_rank(X, tol=1e-12) == (
            1 if not (u or v) else 2 if not (u*v) or phi in (0, np.pi) else 3
        )
    for _ in range(100):
        X = rng.normal(size=(3, 4)) + 1j * rng.normal(size=(3, 4))
        X /= np.linalg.norm(X, axis=1)[:, None]
        G = X.conj() @ X.T
        alpha = np.arccos(np.clip(np.abs(G), 0, 1))
        assert alpha[0, 2] <= alpha[0, 1] + alpha[1, 2]
        close(np.linalg.norm(X.sum(axis=0)) ** 2, 3 + 2 * np.real(G[0, 1] + G[1, 2] + G[0, 2]))
    print("PASS  arc body, length table, depth, excess, Gram interval and projective angles")


def schur(matrix, keep, pivots):
    outer = matrix[np.ix_(keep, keep)]
    if not pivots:
        return outer.copy()
    return outer - matrix[np.ix_(keep, pivots)] @ np.linalg.solve(
        matrix[np.ix_(pivots, pivots)], matrix[np.ix_(pivots, keep)]
    )


def paths(i, j, interior):
    for size in range(len(interior) + 1):
        for order in permutations(interior, size):
            yield (i, *order, j)


def path_data(path, costs, amplitudes):
    edges = tuple(zip(path, path[1:]))
    return sum(costs[i, j] for i, j in edges), np.prod([amplitudes[i, j] for i, j in edges])


def min_plus(costs, pivots):
    reduced = costs.copy()
    np.fill_diagonal(reduced, 0)
    for b in pivots:
        reduced = np.minimum(reduced, reduced[:, b, None] + reduced[None, b, :])
    return reduced


def test_projection_and_minors(rng):
    for hermitian in (False, True):
        for _ in range(18):
            amplitudes = rng.normal(size=(6, 6)) + 1j * rng.normal(size=(6, 6))
            weights = rng.integers(1, 5, size=(6, 6)).astype(float)
            weights[rng.random((6, 6)) < 0.25] = np.inf
            if hermitian:
                amplitudes = np.triu(amplitudes, 1) + np.triu(amplitudes, 1).conj().T
                weights = np.minimum(weights, weights.T)
            np.fill_diagonal(weights, np.inf)
            h = 0.31
            K = np.eye(6) + amplitudes * np.exp(-weights / h)
            keep, pivots = [0, 5], [1, 2, 3, 4]
            residual = schur(K, keep, pivots)
            if hermitian:
                X = np.linalg.cholesky(K).conj().T
                Q, _ = np.linalg.qr(X[:, pivots])
                Y = X[:, keep] - Q @ (Q.conj().T @ X[:, keep])
                close(residual, Y.conj().T @ Y)
                close(residual / np.sqrt(np.outer(residual.diagonal().real, residual.diagonal().real)),
                      (Y / np.linalg.norm(Y, axis=0)).conj().T @ (Y / np.linalg.norm(Y, axis=0)))
                assert np.linalg.eigvalsh(residual).min() > 0
            for order in (pivots, pivots[::-1]):
                labels, current = list(range(6)), K.copy()
                for b in order:
                    remaining = [j for j in range(len(labels)) if j != labels.index(b)]
                    current = schur(current, remaining, [labels.index(b)])
                    labels.remove(b)
                close(current, residual)
            for i, j in [keep, keep[::-1]]:
                total = 0j
                for path in paths(i, j, pivots):
                    unused = [b for b in pivots if b not in path]
                    cost, amp = path_data(path, weights, amplitudes)
                    total += ((-1)**(len(path)-2) * amp * np.exp(-cost/h)
                              * np.linalg.det(K[np.ix_(unused, unused)]))
                block = np.linalg.det(K[np.ix_(pivots, pivots)])
                close(total, block * residual[keep.index(i), keep.index(j)])
    print("PASS  orthogonal Gram residual, normalization, pivot orders and signed bordered minors")


def test_log_limits():
    def network(size, edges, h):
        weights = np.full((size, size), np.inf)
        K = np.eye(size)
        for i, j, cost, amp in edges:
            K[i, j] = K[j, i] = amp * np.exp(-cost/h)
            weights[i, j] = weights[j, i] = cost
        assert np.linalg.eigvalsh(K).min() > 0
        return K, weights

    for h in (0.4, 0.22, 0.16, 0.12):
        t = np.exp(-1/h)
        first = [(0, 1, 1, 1), (1, 2, 1, 1), (0, 2, 2, 1)]
        K, weights = network(3, first, h)
        residual = schur(K, [0, 2], [1])
        close(residual, (1-t*t)*np.eye(2))
        close(residual[0, 1]/t**2, 0)
        close(min_plus(weights, [1])[0, 2], 2)
        K, weights = network(4, first + [(0, 3, 1, 1), (3, 2, 2, 1)], h)
        residual = schur(K, [0, 2], [1, 3])
        close(residual[0, 1]/t**3, -1)
        close(-h*np.log(abs(residual[0, 1])), 3)
        close(min_plus(weights, [1, 3])[0, 2], 2)

        # Two shortest paths, one through the pivot. Longer paths
        # and the denominator supply independently measurable remainders.
        K, weights = network(4, [(i, j, w, -1)
                             for i, j, w in [(0, 1, 1), (1, 2, 1), (0, 2, 2),
                                             (0, 3, 1), (3, 2, 2), (1, 3, 1)]], h)
        S = schur(K, [0, 2], [1, 3])
        norm = S[0, 1]/np.sqrt(S[0, 0]*S[1, 1])
        cost = min_plus(weights, [1, 3])[0, 2]
        close(cost, 2)
        for entry in (S[0, 1], norm):
            error = abs(-h*np.log(abs(entry)) - (cost - h*np.log(2)))
            assert error < 12*h*np.exp(-1/h)
        U = np.diag(np.exp(1j * np.array([0.2, 0.4, 1.6, 1.0])))
        sub = U[np.ix_([0, 2], [0, 2])]
        close(schur(U.conj() @ K @ U, [0, 2], [1, 3]), sub.conj() @ S @ sub)

    # A directed example with two internal zero-cost edges forming a cycle.
    # The shortest walks repeat this cycle arbitrarily often.
    for h in (1, 0.5, 0.25, 0.125):
        A = np.zeros((5, 5))
        A[0, 1], A[1, 2], A[2, 1], A[2, 3] = 0.2*np.exp(-1/h), 0.25, 0.2, 0.3*np.exp(-1/h)
        A[0, 3] = 0.1*np.exp(-3/h)
        S = schur(np.eye(5) - A, [0, 3, 4], [1, 2])
        B, D = 0.2*0.25*0.3, 2
        leader = B / (1 - 0.25*0.2)
        close(-S[0, 1] / np.exp(-D/h), leader + 0.1*np.exp(-1/h))
        d = -h*np.log(-S[0, 1])
        assert D-h*np.log(np.exp(D)*0.4/0.6) <= d <= D-h*np.log(B)
        close(S[0, 2], 0)
        assert np.max(A.sum(axis=1)) < 0.4

    # A graph may have support fill that cancels for general signed input.
    # All eight signings of a triangle exercise the cycle criterion.
    diagonal_pairs = [(0, 1), (1, 2), (0, 2)]
    for signs in product([-1, 1], repeat=3):
        all_negative = any(
            all(sign * vertices[i] * vertices[j] == -1
                for (i, j), sign in zip(diagonal_pairs, signs))
            for vertices in product([-1, 1], repeat=3)
        )
        assert all_negative == (np.prod(signs) == -1)
    print("PASS  logarithmic rates, exact and finite-exponent cancellation, gauge and zero-cost walk sums")


def test_graphs(rng):
    costs = np.full((6, 6), np.inf)
    edges = {(0, 1): 2, (0, 2): 5, (0, 5): 11, (1, 2): 1, (1, 4): 6,
             (2, 3): 2, (2, 5): 6, (3, 2): 1, (3, 4): 1, (3, 5): 4, (4, 5): 1}
    for (i, j), w in edges.items():
        costs[i, j] = w
    d = costs[0].copy()
    d[0] = 0
    expected = [[2, 5, np.inf, np.inf], [2, 3, 7, 8], [2, 3, 5, 8], [2, 3, 5, 6]]
    for target in expected:
        close(d[1:5], target)
        d = np.minimum(d, np.min(d[:, None] + costs, axis=0))
    close(d[5], 7)
    close(sum(edges[i, i+1] for i in range(5)), 7)
    close(edges[2, 3] + edges[3, 2], 3)
    close(min(costs[0, 5], np.min(costs[0, 1:5] + costs[1:5, 5])), 11)
    for order in permutations([1, 2, 3, 4]):
        close(min_plus(costs, order)[0, 5], 7)
    for _ in range(45):
        costs = rng.integers(0, 12, size=(6, 6)).astype(float)
        costs[rng.random((6, 6)) < 0.4] = np.inf
        keep, interior = [0, 2, 5], [1, 3, 4]
        reduced = min_plus(costs, interior)
        internal = min_plus(costs[np.ix_(interior, interior)], [0, 1, 2])
        for i, j in permutations(keep, 2):
            brute = min(sum(costs[u, v] for u, v in zip(p, p[1:]))
                        for p in paths(i, j, interior))
            closure = min(costs[i, j],
                          np.min(costs[i, interior, None] + internal + costs[None, interior, j]))
            close([reduced[i, j], closure], brute)
        close(min_plus(costs, list(range(6)))[np.ix_(keep, keep)],
              min_plus(reduced[np.ix_(keep, keep)], [0, 1, 2]))

    n = 5
    edges = list(combinations(range(n), 2))
    cycles = [cycle for k in (4, 5) for cycle in permutations(range(n), k)
              if cycle[0] == min(cycle) and cycle[1] < cycle[-1]]

    def has_induced_cycle(graph, cycle):
        return all(graph[i, j] == (b-a in (1, len(cycle)-1))
                   for (a, i), (b, j) in combinations(enumerate(cycle), 2))

    chordal_count = 0
    for mask in range(1 << len(edges)):
        graph = np.zeros((n, n), dtype=bool)
        for k, (i, j) in enumerate(edges):
            graph[i, j] = graph[j, i] = bool(mask & (1 << k))
        chordal = not any(has_induced_cycle(graph, c) for c in cycles)
        remaining = set(range(n))
        while remaining:
            candidates = [b for b in remaining
                          if all(graph[i, j] for i, j in
                                 combinations([i for i in remaining if graph[b, i]], 2))]
            if not candidates:
                break
            remaining.remove(candidates[0])
        assert chordal == (not remaining)
        chordal_count += chordal
        b = 0
        expected_fill = graph[1:, 1:] | (graph[1:, b, None] & graph[None, b, 1:])
        support = schur(np.eye(n)-0.1*graph, [1, 2, 3, 4], [0]) < 0
        reduced = min_plus(np.where(graph, 1, np.inf), [0])
        offdiag = ~np.eye(n-1, dtype=bool)
        np.testing.assert_array_equal(support[offdiag], expected_fill[offdiag])
        np.testing.assert_array_equal(np.isfinite(reduced[1:, 1:][offdiag]), expected_fill[offdiag])
    assert chordal_count == 822
    assert 4-2+1 > 4/2
    assert len(set(permutations([1, 2, 3, 4]))) == factorial(4)
    close(log2(factorial(4)), sum(log2(i) for i in range(1, 5)))
    print("PASS  shortest paths, six-vertex example, sorting controls and 1,024 five-vertex fill patterns")


def test_boundary_and_sagitta(rng):
    def boundary(simplex):
        for i in range(len(simplex)):
            yield (-1)**i, simplex[:i] + simplex[i+1:]

    edge_chains = {}
    for s, face in boundary((0, 1, 2, 3)):
        for t, edge in boundary(face):
            edge_chains[edge] = edge_chains.get(edge, 0) + s*t
    assert len(edge_chains) == 6 and not any(edge_chains.values())
    assert [len(list(combinations(range(3), k))) for k in range(4)] == [1, 3, 3, 1]
    assert [len(list(combinations(range(4), k))) for k in range(1, 5)] == [4, 6, 4, 1]

    def directed_edges(face):
        return list(zip(face, (*face[1:], face[0])))

    meridians = [(0, i) for i in range(1, 5)]
    equator = [(i, i % 4 + 1) for i in range(1, 5)]
    meridian_integrals = [0.0] * 4
    equator_integrals = [np.pi / 2] * 4
    data = dict(zip(meridians + equator, meridian_integrals + equator_integrals))
    noisy = {e: value + err for (e, value), err in zip(data.items(), rng.normal(size=8))}
    for mapping in (data, noisy):
        mapping.update({(j, i): -v for (i, j), v in mapping.copy().items()})

    def face_sum(mapping):
        return sum(mapping[e] for i, j in equator for e in directed_edges((0, i, j)))

    close(face_sum(data), 2*np.pi)
    close(face_sum(noisy) - face_sum(data), sum(noisy[e]-data[e] for e in equator))
    close(4*np.pi/2, 2*np.pi*(5-8+4))
    close(3*4, 2*4+4)
    close([4*np.pi/2, 2*np.pi/2], [2*np.pi, np.pi])
    x, w = np.polynomial.legendre.leggauss(12)
    theta = (x+1)*np.pi/4
    close(np.sum(w*np.sin(theta))*np.pi/4*np.pi/2, np.pi/2)
    close((np.sin(theta)**2)/(1+np.cos(theta)), 1-np.cos(theta))
    # A spherical octant is also one unit spherical face with boundary defects.
    close(np.pi/2 + 3*(np.pi-np.pi/2), 2*np.pi*(3-3+1))

    P = np.diag([1j, -1j])
    Q = np.array([[0, 1], [-1, 0]])
    assert not np.allclose(P @ Q, Q @ P)
    for u in (P, Q, P @ Q):
        close(u @ u.conj().T, np.eye(2))
        close(np.linalg.det(u), 1)
    # Replace two edges by their ordered product and compare triangle routes.
    close(Q @ P, Q @ P @ np.eye(2))
    close((Q @ P).conj().T @ Q @ P, np.eye(2))
    assert not np.allclose(Q @ P, np.eye(2))

    for sigma, T, alpha in product([-2.0, 0.0, 1.0], [1, 2], [0.25, 0.5, 0.75, 1]):
        Ns = np.array([1., 10., 100., 10_000., 1_000_000.])
        angle = sigma*(T/Ns)**alpha
        v = 2*np.sin(angle/2)**2
        close(np.sin(angle)**2, v*(2-v))
        close(np.abs(np.exp(1j*angle)-1)**2, 2*v)
        assert np.all((Ns*v)-(Ns*angle**2/2-Ns*angle**4/24) >= -3e-13)
        assert np.all(Ns*angle**2/2-Ns*v >= -3e-13)
        if sigma:
            close((Ns*v/(sigma**2*T**(2*alpha)*Ns**(1-2*alpha)/2))[-1], 1,
                  rtol=8e-4)
        else:
            close(Ns*v, 0)
    h = np.array([1e-2, 1e-4, 1e-6])
    close(np.imag(np.exp(0.3 + 1j*h))/h, np.exp(0.3)*(1-h*h/6), atol=2e-10)
    x0 = np.pi / 4
    f0 = np.sqrt(2) * np.exp(x0)
    u = np.array([-0.01, 0.01, 0.004, 0.01j])
    cosine, sine = np.cos(x0+u), np.sin(x0+u)
    denominator = cosine**3 + sine**3
    close(denominator, np.cos(u)*(2-np.cos(2*u))/np.sqrt(2))
    close(np.sqrt(2)*denominator, 1+1.5*u**2-13/8*u**4, atol=5e-12)
    f = np.exp(x0+u)/denominator
    close(f/f0, 1+u-u**2-4/3*u**3+19/6*u**4, atol=7e-10)
    close((f[-1].imag/(f0*0.01)-1)/0.01**2, 4/3, rtol=4e-4)
    for actions in ([2, 4, 7], [2, 2, 7], [-1, 2, 3]):
        sample = np.array(actions)
        for scale in h:
            s = sample.min()
            value = s - scale*np.log(np.exp(-(sample-s)/scale).sum())
            assert s-scale*np.log(len(sample)) <= value <= s
    q = {0: 2, 1: 0, 2: 2, 3: 1, 4: 0}
    fibres = {(b, x) for b in range(4) for x in q if q[x] == b}
    assert fibres == {(q[x], x) for x in q} and {x for _, x in fibres} == set(q)
    for x, y in product(q, repeat=2):
        opens = [set(o) for k in range(5) for o in combinations(range(4), k)]
        assert all((q[x] in o) == (q[y] in o) for o in opens) == (q[x] == q[y])
    print("PASS  finite Stokes, octant area, holonomy, sagitta limits, complex step and readout")


if __name__ == "__main__":
    rng = np.random.default_rng(20261120)
    main_geometry(rng)
    test_projection_and_minors(rng)
    test_log_limits()
    test_graphs(rng)
    test_boundary_and_sagitta(rng)
    print("All m5 checks passed.")
