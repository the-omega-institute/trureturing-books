"""Deterministic arithmetic checks for Section 5E (sec:m10) of the paper; vendored from the m10 module script.
Run with python3 m10_cayley_dickson.py.

Integral basis identities use exact int64 arithmetic on small coefficients.
Continuous identities and inequalities are sampled with a fixed seed.
"""

from itertools import combinations, permutations, product

import numpy as np


rng = np.random.default_rng(10)


def close(actual, expected):
    np.testing.assert_allclose(actual, expected, atol=2e-12, rtol=2e-12)


def exact(actual, expected):
    np.testing.assert_array_equal(actual, expected)


def norm_sq(x):
    return np.vdot(x, x).real


def bar(x):
    return x * np.r_[1, -np.ones(len(x) - 1, dtype=int)]


def doubling(x, y):
    if len(x) == 1:
        return x * y
    a, b = np.split(x, 2)
    p, q = np.split(y, 2)
    return np.concatenate((
        doubling(a, p) - doubling(bar(q), b),
        doubling(q, a) + doubling(b, bar(p)),
    ))


def multiplication(dimension):
    basis = np.eye(dimension, dtype=int)
    table = np.array([[doubling(x, y) for y in basis] for x in basis])

    def multiply(x, y):
        return np.einsum("i,j,ijk->k", x, y, table)

    return basis, table, multiply


def transport(multiply, x, y, z):
    return multiply(multiply(x, bar(y)), z)


def unit(dimension):
    x = rng.normal(size=dimension)
    return x / np.linalg.norm(x)


def associator(multiply, a, b, c):
    return multiply(multiply(a, b), c) - multiply(a, multiply(b, c))


def kappa(x, y):
    return (1 + x @ y) / 2


def check_ladder():
    dimensions = [1, 2, 4, 8, 16]
    exact(np.array(dimensions) - 1, [0, 1, 3, 7, 15])
    for d in dimensions:
        basis, table, mul = multiplication(d)
        one = basis[0]
        exact(table[0], basis)
        exact(table[:, 0], basis)
        for i, x in enumerate(basis):
            for j, y in enumerate(basis):
                exact(np.flatnonzero(mul(x, y)), [i ^ j])
                exact(bar(mul(x, y)), mul(bar(y), bar(x)))
                exact(mul(x, bar(y)) + mul(y, bar(x)), 2 * (x @ y) * one)
                if d <= 8:
                    for z in basis:
                        delta = associator(mul, x, y, z)
                        if d <= 4:
                            exact(delta, np.zeros(d, dtype=int))
                        else:
                            exact(delta, -associator(mul, y, x, z))
                            exact(delta, -associator(mul, x, z, y))
        if d <= 2:
            exact(table.swapaxes(0, 1), table)
        if d == 4:
            exact(mul(basis[1], basis[2]), -mul(basis[2], basis[1]))

        # Basis vectors and their pairwise sums detect every homogeneous
        # quadratic in one block of variables. The defect is biquadratic.
        if d <= 8:
            probes = np.array(list(basis) + [x + y for x, y in combinations(basis, 2)])
            products = np.einsum("ai,bj,ijk->abk", probes, probes, table)
            sizes = np.sum(probes**2, axis=1)
            exact(np.sum(products**2, axis=2), np.outer(sizes, sizes))

        for _ in range(12):
            x, y, z, v = (unit(d) for _ in range(4))
            close(mul(x, bar(x)), one)
            close(mul(bar(x), x), one)
            close(transport(mul, x, x, z), z)
            if d == 16:
                continue
            close(transport(mul, x, y, y), x)
            close(kappa(x, -x), 0)
            close(kappa(x, x), 1)
            close(kappa(x, y), kappa(y, x))
            assert 0 <= kappa(x, y) <= 1
            close(kappa(transport(mul, x, y, z), transport(mul, x, y, v)), kappa(z, v))
            close(kappa(transport(mul, z, y, x), transport(mul, v, y, x)), kappa(z, v))
            reflected = transport(mul, x, y, x)
            close(reflected, 2 * (x @ y) * x - y)
            close(kappa(y, reflected), (x @ y)**2)
            close(kappa(z, reflected), 2 * (x @ y) * kappa(z, x) - kappa(z, y) + 1 - x @ y)
            if d <= 4:
                close(transport(mul, transport(mul, x, y, z), v, one),
                      transport(mul, x, y, transport(mul, z, v, one)))
            else:
                close(mul(mul(x, y), mul(z, x)), mul(mul(x, mul(y, z)), x))
                close(mul(mul(mul(x, y), x), z), mul(x, mul(y, mul(x, z))))
                close(mul(z, mul(mul(x, y), x)), mul(mul(mul(z, x), y), x))
                close(associator(mul, x, y, mul(x, y)), np.zeros(d))

    # A concrete odd-dimensional unital algebra with the real-eigenvalue witness.
    # Product from R[t]/(t^3), x=t, v=t^2, lambda=0.
    close(np.convolve([0, 1, 0], [0, 0, 1])[:3], np.zeros(3))


def check_fano_and_zero_divisors():
    basis, _, mul = multiplication(8)
    e = basis[[0, 1, 2, 4, 3, 6, 7, 5]].copy()
    e[6] *= -1
    lines = [(1, 2, 4), (2, 3, 5), (3, 4, 6), (4, 5, 7),
             (5, 6, 1), (6, 7, 2), (7, 1, 3)]
    line_sets = {frozenset(line) for line in lines}
    assert len(line_sets) == 7
    for i, j, k in lines:
        for a, b, c in [(i, j, k), (j, k, i), (k, i, j)]:
            exact(mul(e[a], e[b]), e[c])
            exact(mul(e[b], e[a]), -e[c])
            exact(mul(e[a], e[a]), -e[0])
    assert all(len(a & b) == 1 for a, b in combinations(line_sets, 2))
    assert all(np.count_nonzero(e[1:].sum(axis=0)) > len(line) for line in line_sets)
    triples = list(combinations(range(1, 8), 3))
    assert len(triples) == 35
    noncollinear = 0
    for triple in triples:
        on_line = frozenset(triple) in line_sets
        noncollinear += not on_line
        for i, j, k in permutations(triple):
            assert norm_sq(associator(mul, e[i], e[j], e[k])) == (0 if on_line else 4)
    assert noncollinear == 28
    visited = set()
    for (i, j, k), sign, ell in [
        ((1, 2, 3), -1, 6), ((1, 2, 5), 1, 7),
        ((1, 2, 6), 1, 3), ((1, 3, 5), -1, 4),
    ]:
        orbit = {frozenset(1 + (a - 1 + h) % 7 for a in (i, j, k)) for h in range(7)}
        assert len(orbit) == 7 and not visited & orbit
        visited |= orbit
        exact(mul(mul(e[i], e[j]), e[k]), sign * e[ell])
        exact(mul(e[i], mul(e[j], e[k])), -sign * e[ell])
    assert visited == set(map(frozenset, triples)) - line_sets

    s_basis, _, sd = multiplication(16)
    checks = [
        ((1, 2), (3, 6), e[7], e[5]),
        ((1, 3), (2, -6), e[4], -e[5]),
        ((1, 4), (3, 5), e[7], -e[6]),
    ]
    for (a, b), (p, q), first, second in checks:
        a, b, p, q = e[a], e[b], e[p], e[abs(q)] * np.sign(q)
        u, v = np.r_[a, b], np.r_[p, q]
        exact(mul(a, p), first)
        exact(mul(bar(q), b), first)
        exact(mul(q, a), second)
        exact(mul(b, bar(p)), -second)
        exact(sd(u, v), np.zeros(16, dtype=int))
        exact(sd(v, u), np.zeros(16, dtype=int))
        assert u @ v == 0 and norm_sq(u) == norm_sq(v) == 2
        assert norm_sq(u) * norm_sq(v) == 4
        x, w = u / np.sqrt(2), v / np.sqrt(2)
        close(sd(x, bar(x)), s_basis[0])
        close(sd(w, bar(w)), s_basis[0])
        close(sd(w, w), -s_basis[0])
        for middle, last in [(s_basis[0], w), (w, w), (w, x)]:
            close(transport(sd, x, middle, last), np.zeros(16))
        close(sd(x, sd(w, w)), -x)
        close(2 * (x @ w) * x - w, -w)
        extended_u, extended_v = np.r_[u, np.zeros(16, dtype=int)], np.r_[v, np.zeros(16, dtype=int)]
        exact(doubling(extended_u, extended_v), np.zeros(32, dtype=int))

    cross = np.array([mul(e[i], e[j])[1:] for i, j in combinations(range(1, 8), 2)])
    assert cross.shape == (21, 7) and np.linalg.matrix_rank(cross) == 7
    assert len(cross) - np.linalg.matrix_rank(cross) == 14
    sign_change = np.eye(8, dtype=int) - 2 * (np.outer(e[4], e[4]) + np.outer(e[5], e[5]))
    assert np.linalg.det(sign_change) == 1
    exact(mul(sign_change @ e[1], sign_change @ e[2]), -(sign_change @ mul(e[1], e[2])))
    for _ in range(16):
        x, y = np.r_[0, rng.normal(size=7)], np.r_[0, rng.normal(size=7)]
        xy = mul(x, y)
        close(xy[0], -x @ y)
        close(xy @ x, 0)
        close(xy @ y, 0)
        close(norm_sq(xy[1:]), norm_sq(x) * norm_sq(y) - (x @ y)**2)


identity = np.eye(2)
pauli = np.array([
    [[0, 1], [1, 0]],
    [[0, -1j], [1j, 0]],
    [[1, 0], [0, -1]],
])


def phi(a):
    return a[0] * identity + np.einsum("i,ijk->jk", a[1:], pauli)


def jordan(a, b):
    return np.r_[a @ b, a[0] * b[1:] + b[0] * a[1:]]


def order_norm(a):
    return abs(a[0]) + np.linalg.norm(a[1:])


def check_spin_geometry():
    for d in [1, 2, 3, 5, 9]:
        for _ in range(8):
            a, b, c = rng.normal(size=(3, d + 1))
            a_sq = jordan(a, a)
            close(jordan(a, jordan(a_sq, b)), jordan(a_sq, jordan(a, b)))
            close(jordan(a, b) @ c, b @ jordan(a, c))
            assert a_sq[0] + 1e-12 >= np.linalg.norm(a_sq[1:])
            x, y = unit(d), unit(d)
            p, q = np.r_[1, x] / 2, np.r_[1, y] / 2
            close(jordan(p, p), p)
            p_opp = np.r_[1, -x] / 2
            close(jordan(p, p_opp), np.zeros(d + 1))
            close(p + p_opp, np.r_[1, np.zeros(d)])
            close(2 * jordan(p, q)[0], kappa(x, y))
            close(q + 8 * (jordan(p, jordan(p, q)) - jordan(p, q)), np.r_[1, 2 * (x @ y) * x - y] / 2)
            extreme = np.r_[np.linalg.norm(a[1:]), a[1:]]
            root = np.sqrt(extreme[0] * 2) * np.r_[1, a[1:] / extreme[0]] / 2
            close(jordan(root, root), extreme)

    dims = [1, 2, 4, 8]
    exact(np.array(dims) + 2, [3, 4, 6, 10])
    for d in dims:
        basis, _, mul = multiplication(d)
        one = basis[0]
        s, t = rng.normal(size=2)
        z = rng.normal(size=d)
        a, b = (s + t) * one, (s - t) * one
        top, bottom = mul(a, a) + mul(z, bar(z)), mul(b, b) + mul(bar(z), z)
        close((top + bottom) / 2, (s*s + t*t + norm_sq(z)) * one)
        close((top - bottom) / 2, 2*s*t * one)
        close(mul(a, z) + mul(z, b), 2*s*z)

    for t in np.linspace(-0.5, 1.5, 11):
        for b in np.linspace(-1.0, 1.0, 13):
            close(b*b - t*(1-t), (t-0.5)**2 + b*b - 0.25)
    for n in [2, 3, 4, 5]:
        bases = hermitian_basis(n - 1)[1:]
        assert len(bases) == (n - 1)**2 - 1
        p = np.outer(np.eye(n)[0], np.eye(n)[0])
        pure = np.outer(np.eye(n)[-1], np.eye(n)[-1])
        close(np.trace(p @ pure), 0)
        close(np.trace(p @ (identity_in_dimension(n) / n)), 1/n)


def identity_in_dimension(n):
    return np.eye(n, dtype=complex)


def check_pauli():
    for i in range(3):
        for j in range(3):
            basis = np.eye(3)
            close(pauli[i] @ pauli[j], (i == j) * identity + 1j * phi(np.r_[0, np.cross(basis[i], basis[j])]))
    close(phi([1, 0, 0, 1]) / 2, np.diag([1, 0]))
    for sign in [-1, 1]:
        def d(a, b):
            return np.r_[0, sign * np.cross(a[1:], b[1:])]

        def star(a, b):
            return a @ b if sign == -1 else b @ a

        for _ in range(20):
            a, b, c, a1, b1 = rng.normal(size=(5, 4))
            close(phi(jordan(a, b)) - 1j * phi(d(a, b)), star(phi(a), phi(b)))
            close(d(a, b), -d(b, a))
            close(d(a + a1, b), d(a, b) + d(a1, b))
            close(d(a, 2*b), 2*d(a, b))
            close(d([1, 0, 0, 0], b), np.zeros(4))
            assert order_norm(d(a, b)) <= order_norm(a) * order_norm(b) + 1e-12
            assert order_norm(d(a, b) - d(a1, b1)) <= (
                order_norm(a-a1) * order_norm(b) + order_norm(a1) * order_norm(b-b1) + 1e-12
            )
            close(jordan(jordan(a, b), c) - jordan(a, jordan(b, c)), d(d(a, b), c) - d(a, d(b, c)))
            close(np.linalg.eigvalsh(phi(a)), [a[0]-np.linalg.norm(a[1:]), a[0]+np.linalg.norm(a[1:])])
            close(np.linalg.norm(phi(a), ord=2), order_norm(a))
            v = rng.normal(size=3)
            for m in [np.linalg.norm(v) + 1, np.linalg.norm(v), 0, -1]:
                parameters = np.r_[m, v]
                rho = phi(parameters) / 2
                close(np.trace(rho), m)
                close(np.trace(rho @ phi(a)), parameters @ a)
                assert (np.min(np.linalg.eigvalsh(rho)) >= -1e-12) == (m >= np.linalg.norm(v))
                if m < np.linalg.norm(v):
                    assert parameters @ np.r_[1, -v / np.linalg.norm(v)] < 0
                    continue
                inputs = [a, b, c, a1, b1]
                gram = np.array([[parameters @ jordan(x, y) - 1j * (parameters @ d(x, y))
                                  for y in inputs] for x in inputs])
                close(gram, gram.conj().T)
                assert np.min(np.linalg.eigvalsh(gram)) >= -1e-12

                def square(x, y):
                    return parameters @ (jordan(x, x) + jordan(y, y) + 2*d(x, y))

                h, k = d(a, b) - jordan(a, c), jordan(a, b) + d(a, c)
                close(square(b+h, c+k), square(b-h, c-k))
                z = phi(b) + 1j*phi(c)
                close(square(b+h, c+k), np.trace(rho @ star(star(z.conj().T, identity + phi(a) @ phi(a)), z)))


def clifford(d):
    size = 1 << d
    left, right = np.indices((size, size))
    order = np.zeros_like(left)
    for i in range(d):
        for j in range(i):
            order += ((left >> i) & 1) * ((right >> j) & 1)
    signs = 1 - 2*(order % 2)
    indices = (left ^ right).ravel()

    def multiply(a, b):
        return np.bincount(indices, weights=(signs * np.outer(a, b)).ravel(), minlength=size)

    return np.eye(size)[0], np.eye(size)[[1 << i for i in range(d)]], multiply


def check_clifford_rotors_and_phase():
    for d in [2, 3, 4, 7]:
        one, basis, mul = clifford(d)
        for _ in range(10):
            x, y, w, z = (unit(d) for _ in range(4))
            a, b, g = (u @ basis for u in (x, y, w))
            close(mul(b, b), one)
            p = mul(a, b)
            scalar = x @ y
            area = p - scalar * one
            close(p[0], scalar)
            close(mul(area, area), -norm_sq(area)*one)
            close(norm_sq(area), 1-scalar**2)
            close(mul(b, a), scalar*one - area)
            theta = np.arccos(scalar)
            close(p, np.cos(theta)*one + np.sin(theta)*area/np.linalg.norm(area))
            close(mul(mul(a, g), a), (2*(x @ w)*x-w) @ basis)
            close(z @ (2*(x @ w)*x-w), 2*(x @ w)*(z @ x)-z @ w)
            for sign in [1, -1]:
                close(mul(a, sign*a), sign*one)
                close(mul(mul(a, sign*a), a), sign*a)
        u = mul(basis[0], basis[1])
        close(mul(u, u), -one)
        for t in [0, np.pi/2, 2*np.pi, 4*np.pi]:
            rotor = np.cos(t/2)*one - np.sin(t/2)*u
            inverse = np.cos(t/2)*one + np.sin(t/2)*u
            close(mul(mul(rotor, basis[0]), inverse), np.cos(t)*basis[0] + np.sin(t)*basis[1])
            for e in basis[2:]:
                close(mul(mul(rotor, e), inverse), e)
        close(np.cos(np.pi)*one - np.sin(np.pi)*u, -one)
        close(np.cos(2*np.pi)*one - np.sin(2*np.pi)*u, one)

    e, _, mul = multiplication(4)
    one, i, j, k = e
    for a, b, c in [(i, j, k), (j, k, i), (k, i, j)]:
        close(mul(a, b) - mul(b, a), 2*c)
        close(mul(a/2, b/2) - mul(b/2, a/2), c/2)
    close(mul((one+j)/np.sqrt(2), (one+i)/np.sqrt(2)), (one+i+j-k)/2)
    close(np.cos(np.pi/3)*one + np.sin(np.pi/3)*(i+j-k)/np.sqrt(3), (one+i+j-k)/2)
    for t in np.linspace(0, 4*np.pi, 11):
        q = np.cos(t/2)*one + np.sin(t/2)*i
        rotation = np.array([mul(mul(q, v), bar(q))[1:] for v in [i, j, k]]).T
        close(rotation @ rotation.T, np.eye(3))
        close(rotation[:, 1], [0, np.cos(t), np.sin(t)])
        close(np.trace(rotation), 1 + 2*np.cos(t))
        close(np.trace(rotation), 4*q[0]**2-1)
        close(np.trace(phi([q[0], 0, 0, 0]) - 1j*q[1]*pauli[2])/2, q[0])
    for radius in np.linspace(0, 1, 5):
        p = np.r_[radius*unit(2), np.sqrt(1-radius**2), 0]
        close(norm_sq(p), 1)
        close(np.linalg.norm(p[:2]), radius)

    for u in pauli:
        A, B = identity/np.sqrt(2), 1j*u/np.sqrt(2)
        S = A+B
        close(S @ S.conj().T, identity)
        close(A @ A.conj().T, identity/2)
        close(B @ B.conj().T, identity/2)
        close(B.conj().T @ B, identity/2)
        close(A @ B.conj().T + B @ A.conj().T, np.zeros((2, 2)))
        J = 2*A @ B.conj().T
        close(J.conj().T, -J)
        close(J @ J.conj().T, identity)
        close(J @ J, -identity)
        close((1j*J).conj().T, 1j*J)
        close((1j*J) @ (1j*J), identity)
        phase = np.exp(1j*0.37)
        close((phase*S) @ u @ (phase*S).conj().T, S @ u @ S.conj().T)
    a = np.array([1, 0], dtype=complex)
    for overlap in np.linspace(0, 1, 11):
        b = np.array([overlap, np.sqrt(1-overlap**2)*np.exp(0.37j)])
        records = np.vstack([a, b])/np.sqrt(2)
        path = records @ records.conj().T
        close(np.diag(path), [0.5, 0.5])
        close(2*abs(path[0, 1]), overlap)
        diff = np.outer(a, a.conj()) - np.outer(b, b.conj())
        eigenvalues = np.linalg.eigvalsh(diff)
        close(eigenvalues, np.sqrt(1-overlap**2) * np.array([-1, 1]))
        close((2*abs(path[0, 1]))**2 + (np.abs(eigenvalues).sum()/2)**2, 1)


def hodge_two(signature):
    pairs = list(combinations(range(4), 2))
    star = np.zeros((6, 6), dtype=int)
    for j, pair in enumerate(pairs):
        other = tuple(i for i in range(4) if i not in pair)
        parity = sum(i > k for i in pair for k in other)
        star[pairs.index(other), j] = (-1)**parity * np.prod([signature[i] for i in pair])
    return pairs, star


def check_curl_and_spin_covers():
    for d in range(1, 22):
        dim_two = len(list(combinations(range(d), 2)))
        assert dim_two == d*(d-1)//2
        assert (dim_two == d) == (d == 3)
    assert [len(list(combinations(range(3), j))) for j in range(4)] == [1, 3, 3, 1]
    e, _, mul = multiplication(4)
    for i, j, k in [(1, 2, 3), (2, 3, 1), (3, 1, 2)]:
        close(mul(e[i], e[j]) - mul(e[j], e[i]), 2*e[k])
        # d(eta_k)(E_i,E_j) = -eta_k([E_i,E_j]).
        close(-e[k] @ (mul(e[i], e[j]) - mul(e[j], e[i])), -2)
    # d^2 eta_i vanishes because each term of d(eta_j wedge eta_k)
    # has a repeated index.
    for i, j, k in [(1, 2, 3), (2, 3, 1), (3, 1, 2)]:
        close(np.linalg.det(e[[k, i, k], 1:]) - np.linalg.det(e[[j, i, j], 1:]), 0)

    pairs, star = hodge_two([1, 1, 1, 1])
    exact(star @ star, np.eye(6))
    exact(np.linalg.eigvalsh(star), [-1, -1, -1, 1, 1, 1])
    _, lorentz = hodge_two([1, -1, -1, -1])
    exact(lorentz @ lorentz, -np.eye(6))
    close(np.sort(np.linalg.eigvals(lorentz).imag), [-1, -1, -1, 1, 1, 1])
    close(np.linalg.eigvals(lorentz).real, np.zeros(6))
    for u in e[1:]:
        left = np.array([mul(u, v) for v in e]).T
        right = np.array([-mul(v, u) for v in e]).T
        for matrix, sign in [(left, 1), (right, -1)]:
            exact(matrix, -matrix.T)
            form = np.array([matrix[j, i] for i, j in pairs])
            exact(star @ form, sign*form)
    for _ in range(12):
        a, b, c, d, x = (unit(4) for _ in range(5))

        def action(left, right, v):
            return mul(mul(left, v), bar(right))

        close(action(a, b, action(c, d, x)), action(mul(a, c), mul(b, d), x))
        close(action(a, b, x), action(-a, -b, x))
        close(np.linalg.det(np.array([action(a, b, v) for v in e])), 1)
        s = rng.normal(size=4)
        close(np.linalg.det(phi(s)), s[0]**2 - norm_sq(s[1:]))
        g = np.array([[1, rng.normal() + 1j*rng.normal()], [0, 1]])
        close(np.linalg.det(g @ phi(s) @ g.conj().T), np.linalg.det(phi(s)))
        psi = rng.normal(size=2) + 1j*rng.normal(size=2)
        future_null = np.outer(psi, psi.conj())
        assert np.trace(future_null).real > 0
        close(np.linalg.det(future_null), 0)


def hermitian_basis(dimension):
    basis = [np.eye(dimension) / np.sqrt(dimension)]
    for j in range(1, dimension):
        diagonal = np.r_[np.ones(j), -j, np.zeros(dimension-j-1)]
        basis.append(np.diag(diagonal) / np.sqrt(j*(j+1)))
    for i, j in combinations(range(dimension), 2):
        off_diagonal = np.outer(np.eye(dimension)[i], np.eye(dimension)[j])
        basis.append((off_diagonal + off_diagonal.T) / np.sqrt(2))
        basis.append(1j*(off_diagonal - off_diagonal.T) / np.sqrt(2))
    return np.array(basis)


def check_blocks_and_modes():
    for k, expected in [(1, (3, 3, 0)), (2, (6, 15, 9)), (3, (9, 36, 27)),
                        (4, (12, 66, 54)), (5, (15, 105, 90))]:
        pairs = list(combinations(range(3*k), 2))
        local = sum(i//3 == j//3 for i, j in pairs)
        assert (local, len(pairs), len(pairs) - local) == expected
        assert len(pairs) - local == 9*k*(k-1)//2
        weights = rng.dirichlet(np.ones(k))
        weighted = np.concatenate([np.sqrt(w)*unit(3) for w in weights])
        close(norm_sq(weighted), 1)

    for m, n, expected in [(1, 1, (0, 0, 0)), (1, 2, (3, 0, 3)),
                            (2, 2, (6, 9, 15)), (2, 3, (11, 24, 35)), (3, 3, (16, 64, 80))]:
        a, b = hermitian_basis(m), hermitian_basis(n)
        tensors = np.array([np.kron(x, y) for x in a for y in b])
        close(np.einsum("aij,bij->ab", tensors.conj(), tensors), np.eye((m*n)**2))
        assert (len(a)+len(b)-2, (len(a)-1)*(len(b)-1), len(tensors)-1) == expected
        for x in a[1:]:
            for y in b[1:]:
                joint = np.kron(x, y).reshape(m, n, m, n)
                close(np.trace(joint, axis1=0, axis2=2), np.zeros((n, n)))
                close(np.trace(joint, axis1=1, axis2=3), np.zeros((m, m)))
        ax, by = np.kron(a[-1], np.eye(n)), np.kron(np.eye(m), b[-1])
        close(ax @ by, by @ ax)

        def exp_hermitian(matrix):
            values, vectors = np.linalg.eigh(matrix)
            return (vectors * np.exp(1j*values)) @ vectors.conj().T

        close(exp_hermitian(ax+by), exp_hermitian(ax) @ exp_hermitian(by))

    basis = np.eye(12)
    for j in range(12):
        projection = basis[:j].T @ basis[:j]
        complement = basis[j:].T @ basis[j:]
        next_projection = basis[:j+1].T @ basis[:j+1]
        shell = np.outer(basis[j], basis[j])
        close(projection + complement, basis)
        close(projection + shell, next_projection)
        close(complement, shell + basis - next_projection)
        close(np.linalg.norm(basis - projection, ord=2), 1)
    spectrum = 2.0**(-np.arange(1, 61))
    close(spectrum.sum(), 1)
    for threshold in [0.5, 0.25, 0.07, 0.003, 1.5]:
        assert np.count_nonzero(spectrum >= threshold) <= np.floor(1/threshold)
        assert np.any(spectrum < threshold)
    for n in [1, 2, 4, 6, 8]:
        dimension = 2**n
        assert dimension**2 - 1 == 4**n - 1
        assert dimension * 2 - 2 == 2*(dimension-1)
        assert 3*n == 3 * len([2] * n)
        for bond in [1, 2, 3]:
            cut = 2**(n//2)
            left_factor = rng.normal(size=(cut, bond))
            right_factor = rng.normal(size=(bond, dimension//cut))
            assert np.linalg.matrix_rank(left_factor @ right_factor) <= bond
            if n >= 2:
                entries = 2*bond + (n-2)*2*bond**2 + 2*bond
                assert entries <= 2*n*bond**2
        if n % 2 == 0:
            dimension_per_side = 2**(n//2)
            witness = np.eye(dimension_per_side)/np.sqrt(dimension_per_side)
            assert np.linalg.matrix_rank(witness) == dimension_per_side
            close(norm_sq(witness), 1)

    site_matrices = [np.diag([1, 0]), np.diag([0, 1])]
    for n in [4, 5, 6]:
        states = []
        densities = []
        for sign in [-1, 1]:
            amplitudes = []
            for word in product(range(2), repeat=n):
                matrix = np.eye(2)
                for bit in word:
                    matrix = matrix @ site_matrices[bit]
                amplitudes.append(np.ones(2) @ matrix @ np.array([1, sign])/np.sqrt(2))
            state = np.array(amplitudes)
            close(state[[0, -1]], np.array([1, sign])/np.sqrt(2))
            assert np.count_nonzero(state) == 2
            states.append(state)
            prefix = state.reshape(8, -1)
            densities.append(prefix @ prefix.T)
        close(states[0] @ states[1], 0)
        close(densities[0], densities[1])

    # The sample higher-dimensional field uses A_2=x_1.
    derivative = np.zeros((4, 4))
    derivative[0, 1] = 1
    exact(np.flatnonzero(np.triu(derivative - derivative.T)), [1])
    assert len(hermitian_basis(3)[1:]) == 8
    assert len(list(combinations(range(4), 2))) == 6
    log_stretches = rng.normal(size=3)
    mean = np.mean(log_stretches)
    close((log_stretches-mean).sum(), 0)
    close(np.linalg.det(np.diag(np.exp(log_stretches))), np.exp(3*mean))


def main():
    checks = [
        check_ladder,
        check_fano_and_zero_divisors,
        check_spin_geometry,
        check_pauli,
        check_clifford_rotors_and_phase,
        check_curl_and_spin_covers,
        check_blocks_and_modes,
    ]
    for check in checks:
        check()
        print(f"PASS {check.__name__}")
    print("All seven NumPy check groups passed.")


if __name__ == "__main__":
    main()
