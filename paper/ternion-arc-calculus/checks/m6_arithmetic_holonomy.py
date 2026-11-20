#!/usr/bin/env python3
"""Reproduce finite and numerical checks for Section 10B (arithmetic and holonomy) with Python and NumPy.

The proofs in the paper supply the universal and asymptotic claims.
This script checks exact finite examples, identities on representative data,
boundary cases, and consistency of manuscript labels and references.
"""
from fractions import Fraction
from itertools import combinations, permutations, product
from math import comb, factorial
import re

import numpy as np
from numpy.testing import assert_allclose


ONE = np.array([1, 0, 0, 0])
I, J, K = np.eye(4, dtype=int)[1:]
BASIS = np.eye(3)
RNG = np.random.default_rng(8246)


def mul(a, b):
    """Hamilton product, including vectorized leading dimensions."""
    a, b = np.asarray(a), np.asarray(b)
    real = a[..., 0] * b[..., 0] - np.sum(a[..., 1:] * b[..., 1:], axis=-1)
    imag = (a[..., :1] * b[..., 1:] + b[..., :1] * a[..., 1:]
            + np.cross(a[..., 1:], b[..., 1:]))
    return np.concatenate((real[..., None], imag), axis=-1)


def conj(q):
    return np.asarray(q) * [1, -1, -1, -1]


def exp_axis(u, angle):
    return np.r_[np.cos(angle), np.sin(angle) * np.asarray(u)]


def cayley(x):
    squared = np.dot(x, x)
    return np.r_[1 - squared, 2 * x] / (1 + squared)


def dist(q, w):
    return 2 * np.arcsin(min(1, np.linalg.norm(q - w) / 2))


def projective_dist(q, w):
    return min(dist(q, w), dist(q, -w))


def bracketed_bisection(f, lo, hi):
    assert f(lo) <= 0 <= f(hi)
    for _ in range(65):
        middle = (lo + hi) / 2
        if f(middle) <= 0:
            lo = middle
        else:
            hi = middle
    return (lo + hi) / 2


def primes_through(n):
    sieve = np.ones(n + 1, dtype=bool)
    sieve[:2] = False
    for p in range(2, int(np.sqrt(n)) + 1):
        if sieve[p]:
            sieve[p * p::p] = False
    return np.flatnonzero(sieve)


def check_hurwitz():
    h = np.ones(4) / 2
    assert_allclose(mul(h, h), h - ONE)
    for a, b, expected in [
        (I, h, h - ONE - J), (h, I, I + J - h),
        (J, h, I + J - h), (h, J, h - ONE - I),
    ]:
        assert_allclose(mul(a, b), expected)
    assert_allclose(conj(h), ONE - h)
    unit = np.vstack((np.eye(4), -np.eye(4), np.array(list(product([-1, 1], repeat=4))) / 2))
    assert len({tuple(q) for q in unit}) == 24
    assert_allclose(np.sum(unit**2, axis=1), 1)
    products = mul(unit[:, None], unit[None, :])
    assert {tuple(q) for q in products.reshape(-1, 4)} == {tuple(q) for q in unit}
    for a, b in RNG.integers(-10, 11, size=(60, 2, 4)):
        for u, w in ((a, b), (a + 0.5, b), (a, b + 0.5), (a + 0.5, b + 0.5)):
            result = mul(u, w)
            assert np.all(result % 1 == result[0] % 1)
            assert np.dot(result, result) == np.dot(u, u) * np.dot(w, w)
            assert np.dot(u, u) % 1 == 0 and (2 * u[0]) % 1 == 0


def check_icosians():
    # Store twice the coordinates in the exact integral basis (1, phi).
    one, phi, inverse_phi = (1, 0), (0, 1), (-1, 1)

    def scalar_times(a, b):
        return (a[0] * b[0] + a[1] * b[1],
                a[0] * b[1] + a[1] * b[0] + a[1] * b[1])

    def quaternion_times(a, b):
        result = np.zeros((4, 2), dtype=int)
        for r, s in product(range(4), repeat=2):
            units = mul(np.eye(4, dtype=int)[r], np.eye(4, dtype=int)[s])
            factor = np.array(scalar_times(a[r], b[s]))
            result += units[:, None] * factor
        return tuple(map(tuple, result))

    # Precompute the signs and locations used for exact multiplication.
    table = {}
    for r, s in product(range(4), repeat=2):
        basis = np.eye(4, dtype=int)
        unit = mul(basis[r], basis[s])
        t = np.flatnonzero(unit)[0]
        table[r, s] = (t, int(unit[t]))

    def times(a, b):
        result = [[0, 0] for _ in range(4)]
        for (r, s), (t, sign) in table.items():
            const, linear = scalar_times(a[r], b[s])
            result[t][0] += sign * const
            result[t][1] += sign * linear
        return tuple(map(tuple, result))

    axes = {tuple((int(c), 0) for c in row) for row in np.vstack((2 * np.eye(4), -2 * np.eye(4)))}
    halves = {tuple((c, 0) for c in signs) for signs in product([-1, 1], repeat=4)}
    golden = set()
    for permutation in permutations(range(4)):
        if sum(permutation[a] > permutation[b] for a, b in combinations(range(4), 2)) % 2:
            continue
        for signs in product([-1, 1], repeat=3):
            base = [(0, 0)] + [
                tuple(sign * c for c in pair)
                for sign, pair in zip(signs, (one, inverse_phi, phi))
            ]
            golden.add(tuple(base[j] for j in permutation))
    units = axes | halves | golden
    assert (len(axes), len(halves), len(golden), len(units)) == (8, 16, 96, 120)
    assert sum(q[0] == (0, 0) for q in units) == 30
    assert sum(all(coordinate[1] == 0 for coordinate in q) for q in units) == 24
    for a in units:
        conjugate = (a[0],) + tuple((-x, -y) for x, y in a[1:])
        assert times(a, conjugate) == ((4, 0), (0, 0), (0, 0), (0, 0))
        for b in units:
            twice = times(a, b)
            assert all(c % 2 == 0 for coordinate in twice for c in coordinate)
            assert tuple((x // 2, y // 2) for x, y in twice) in units
    for a, b in zip(sorted(units)[:5], sorted(units)[-5:]):
        assert times(a, b) == quaternion_times(a, b)
    scaled = {tuple(scalar_times(x, inverse_phi) for x in q) for q in units}
    assert len(units | scaled) == 240
    for q in units | scaled:
        norm = np.sum([scalar_times(x, x) for x in q], axis=0) / 4
        a, b = norm
        golden_ratio = (1 + np.sqrt(5)) / 2
        other = 1 - golden_ratio
        weighted = (2 / np.sqrt(5)) * (
            golden_ratio * (a + b * golden_ratio) + (a + b * other) / golden_ratio
        )
        assert_allclose([2 * (a + b), weighted], 2)


def check_norm_forms():
    def eis(x, y):
        return x * x + x * y + y * y

    assert eis(-1, 3) == 7
    for t, p, q in RNG.integers(-100, 101, size=(100, 3)):
        assert p * p - (2 * t + 1) * p * q + (t * t + t + 1) * q * q == eis(p - (t + 1) * q, q)
        assert (2 * t + 1)**2 - 4 * (t * t + t + 1) == -3
        assert (2 * p + q)**2 - 5 * q * q == 4 * (p * p + p * q - q * q)
    shells = {n: [(x, y) for x, y in product(range(-4, 5), repeat=2) if eis(x, y) == n]
              for n in (1, 3, 7)}
    assert [len(shells[n]) for n in (1, 3, 7)] == [6, 6, 12]
    assert {2 * x + y for x, y in shells[1]} == {-2, -1, 1, 2}
    assert {2 * x + y for x, y in shells[3]} == {-3, 0, 3}
    lattice = np.array(list(product(range(-2, 3), repeat=4)))
    shell = np.einsum("ij,ij->i", lattice, lattice)
    assert [np.count_nonzero(shell == j) for j in range(1, 5)] == [8, 24, 32, 24]
    a, b, lucas, fib = 1, 0, 2, 0
    next_lucas, next_fib = 1, 1
    for n in range(25):
        assert a * a - 2 * b * b == (-1)**n
        assert lucas * lucas - 5 * fib * fib == 4 * (-1)**n
        a, b = a + 2 * b, a + b
        lucas, next_lucas = next_lucas, lucas + next_lucas
        fib, next_fib = next_fib, fib + next_fib
    for a, b, x0, x1, x2, x3 in RNG.integers(-8, 9, size=(100, 6)):
        vector_square = a * x1**2 + b * x2**2 - a * b * x3**2
        q = (x0, x1, x2, x3)
        bar = (x0, -x1, -x2, -x3)
        norm = [0] * 4
        for u, v in product(range(4), repeat=2):
            sign = -1 if (u & 2) and (v & 1) else 1
            factor_a = a if u & v & 1 else 1
            factor_b = b if u & v & 2 else 1
            norm[u ^ v] += sign * factor_a * factor_b * q[u] * bar[v]
        assert norm == [x0**2 - vector_square, 0, 0, 0]
    squares = {x * x + y * y for x, y in product(range(23), repeat=2)}
    for n in range(1, 501):
        remainder = n
        allowed = True
        for p in primes_through(500):
            exponent = 0
            while remainder % p == 0:
                exponent += 1
                remainder //= p
            if p % 4 == 3 and exponent % 2:
                allowed = False
        assert (n in squares) == allowed
    # Example E: y^2 = x^3 - x, with good reduction at all odd primes.
    for p in (3, 5, 7, 11, 13, 17):
        count = 1 + sum((y * y - x**3 + x) % p == 0 for x, y in product(range(p), repeat=2))
        a_p = p + 1 - count
        assert abs(a_p) <= 2 * np.sqrt(p)
        phase = np.arccos(a_p / (2 * np.sqrt(p)))
        eigenvalue = np.exp(1j * phase)
        assert_allclose(eigenvalue**2 - a_p * eigenvalue / np.sqrt(p) + 1, 0, atol=1e-14)


def check_gates_and_arcs():
    def gate_shell(p):
        r = int(np.sqrt(p))
        return np.array([a for a in product(range(-r, r + 1), repeat=4)
                         if a[0] > 0 and a[0] % 2 and all(x % 2 == 0 for x in a[1:])
                         and sum(x * x for x in a) == p])

    for p in (5, 13, 17, 29):
        gates = gate_shell(p)
        assert len(gates) == p + 1
        assert {tuple(q) for q in gates} == {tuple(q) for q in conj(gates)}
        images = set()
        root = next(u for u in range(1, p) if u * u % p == p - 1)
        imag_i = np.diag([root, -root])
        imag_j = np.array([[0, 1], [-1, 0]])
        for q in gates:
            a = (q[0] * np.eye(2, dtype=int) + q[1] * imag_i + q[2] * imag_j
                 + q[3] * imag_i @ imag_j) % p
            assert (a[0, 0] * a[1, 1] - a[0, 1] * a[1, 0]) % p == 0
            column = next(col for col in a.T if np.any(col))
            entry = next(int(x) for x in column if x)
            images.add(tuple(column * pow(entry, -1, p) % p))
        assert len(images) == p + 1
        if p == 5:
            expected = {tuple(ONE + sign * 2 * u) for u in (I, J, K) for sign in (-1, 1)}
            assert {tuple(q) for q in gates} == expected
            for gate in gates:
                rotation = np.array([mul(mul(gate, u), conj(gate))[1:] for u in (I, J, K)]).T / p
                assert_allclose(rotation.T @ rotation, np.eye(3), atol=1e-15)
                assert_allclose(np.linalg.det(rotation), 1)
    gates = gate_shell(5)
    inverse = [next(j for j, w in enumerate(gates) if np.array_equal(w, conj(q))) for q in gates]
    words = [(ONE, -1)]
    for n in range(1, 6):
        words = [(mul(q, g), j) for q, last in words for j, g in enumerate(gates)
                 if last == -1 or j != inverse[last]]
        projective = {min(tuple(q), tuple(-q)) for q, _ in words}
        assert len(projective) == 6 * 5**(n - 1)
        assert all(q @ q == 5**n for q, _ in words)
        if n % 2 == 0:
            half_hole = np.arccos(1 - 5**(-n // 2)) / 2
            test = exp_axis(BASIS[0], half_hole)
            assert min(projective_dist(q / 5**(n // 2), test) for q, _ in words) >= half_hole - 1e-14
    for p in (5, 13):
        a = np.linspace(-2 * np.sqrt(p), 2 * np.sqrt(p), 101)
        previous_u, u = np.ones_like(a), a / np.sqrt(p)
        previous_b, b = np.ones_like(a), a
        for n in range(2, 12):
            next_u = (a / np.sqrt(p)) * u - previous_u
            next_b = a * b - (p + 1 if n == 2 else p) * previous_b
            assert_allclose(next_b / p**(n / 2), next_u - previous_u / p, atol=1e-12)
            assert np.max(np.abs(next_u)) <= n + 1 + 1e-12
            previous_u, u = u, next_u
            previous_b, b = b, next_b
    delta, epsilon = 0.7, 0.01
    for angle in (0, 0.4, 1.9, np.pi - delta):
        x = ONE
        y = exp_axis(BASIS[0], angle)
        xp = exp_axis(BASIS[1], epsilon)
        yp = mul(y, exp_axis(BASIS[2], epsilon))
        for t in np.linspace(0, 1, 101):
            left, right = (1 - t) * x + t * y, (1 - t) * xp + t * yp
            assert np.linalg.norm(left) >= np.cos(angle / 2) - 1e-14
            assert dist(left / np.linalg.norm(left), right / np.linalg.norm(right)) <= (
                np.pi * epsilon / np.sin(delta / 4)
            )
    north = np.array([0., 0., 1.])
    h_gate = np.array([[0, 0, 1], [0, -1, 0], [1, 0, 0]])
    c = np.sqrt(0.5)
    t_gate = np.array([[c, -c, 0], [c, c, 0], [0, 0, 1]])
    levels = np.array([north])
    for depth in range(3):
        assert np.linalg.matrix_rank(levels - north, tol=1e-12) == depth
        levels = np.unique(np.vstack((levels, levels @ h_gate.T, levels @ t_gate.T)), axis=0)
    for target in BASIS:
        support = np.clip(np.max(levels @ target), -1, 1)
        angle = np.arccos(support)
        assert_allclose(1 - support, 1 - np.cos(angle), atol=1e-15)


def check_infinite_products():
    theta = np.linspace(0, np.pi, 2001)
    v = 2 * np.sin(theta / 2)**2
    assert np.all(2 * theta**2 / np.pi**2 <= v + 1e-14)
    assert np.all(v <= theta**2 / 2 + 1e-14)
    assert_allclose(2 * v, (np.cos(theta) - 1)**2 + np.sin(theta)**2, atol=1e-14)
    partial = np.cumsum(1 / np.arange(1, 100_001, dtype=float))
    stop = np.searchsorted(partial, (np.pi, 2 * np.pi, 3 * np.pi))
    assert_allclose(np.cos(partial[stop]), [-1, 1, -1], atol=0.005)
    for n in (1, 9, 200):
        q = exp_axis(BASIS[0], n**-0.5)
        assert_allclose(mul(q, conj(q)), ONE, atol=1e-15)
        assert 2 * np.sin(n**-0.5 / 2)**2 >= 2 / (np.pi**2 * n)

    choices = [[exp_axis(BASIS[j], t), exp_axis(BASIS[j], -t)]
               for j, t in enumerate((0.2, 0.4, 0.6))]
    weights = np.array([[0.9, 0.1], [0.3, 0.7], [0.8, 0.2]])
    means = (weights[..., None] * choices).sum(axis=1)
    radii = np.linalg.norm(means, axis=1)
    directions = means / radii[:, None]
    expected_sagitta = (weights * (1 - np.array(choices)[..., 0])).sum(axis=1)
    assert_allclose(1 - radii, expected_sagitta - radii * (1 - directions[:, 0]))
    variance = (weights * np.sum((choices - means[:, None, :])**2, axis=-1)).sum(axis=1)
    assert_allclose(variance, 1 - radii**2)
    b_prefix = ONE
    random_prefix = ONE
    scale = 1.
    for options, weight, mean, radius, direction in zip(choices, weights, means, radii, directions):
        previous = mul(random_prefix, conj(b_prefix)) / scale
        b_prefix = mul(b_prefix, direction)
        scale *= radius
        next_states = mul(mul(random_prefix, options), conj(b_prefix)) / scale
        assert_allclose(weight @ next_states, previous, atol=1e-15)
        assert_allclose(mean @ mean, radius**2)
        random_prefix = mul(random_prefix, options[0])
    # Strong signs first and deterministic independent drift then exercise the
    # large-jump and zero-variance endpoints separately.
    truncated = np.array([ONE if dist(ONE, q) > 0.5 else q
                          for q in choices[0] + choices[2]])
    assert_allclose(truncated[2:], np.tile(ONE, (2, 1)))
    mean_fair = np.mean(choices, axis=1)
    assert_allclose(mean_fair[:, 1:], 0)
    outcomes = np.array([mul(mul(*items[:2]), items[2]) for items in product(*choices)])
    assert_allclose(np.linalg.norm(outcomes, axis=1), 1)
    assert_allclose(np.mean(outcomes, axis=0), np.prod(mean_fair[:, 0]) * ONE, atol=1e-15)

    primes = primes_through(200_000).astype(float)
    for sigma in (0.25, 0.5, 0.75, 1, 1.25):
        steps = primes**(-sigma)
        sagittas = 2 * np.sin(steps / 2)**2
        remainder = sagittas - steps**2 / 2 + steps**4 / 24
        assert np.all(remainder >= -1e-15)
        assert np.all(remainder <= steps**6 / 720 + 1e-15)
        assert_allclose((sagittas / steps**2)[-1], 0.5, atol=1e-4)
        alternating = np.cumsum(steps * np.where(np.arange(len(steps)) % 2, -1, 1))
        assert np.all(alternating[1::2] <= alternating[-2] + steps[-2])
        assert abs(alternating[-2] - alternating[-1]) <= steps[-2] + 1e-14
    x = primes[-1]
    reciprocal = np.sum(1 / primes)
    high_powers = np.sum(-np.log1p(-1 / primes) - 1 / primes)
    assert_allclose(-np.sum(np.log1p(-1 / primes)), reciprocal + high_powers)
    assert abs(reciprocal - np.log(np.log(x)) - 0.2615) < 0.004
    critical = 2 * np.sin(0.5 / np.sqrt(primes))**2
    correction = critical - 0.5 / primes
    assert np.all(correction < 0)
    assert_allclose(np.sum(critical), 0.5 * reciprocal + np.sum(correction))
    assert abs(np.sum(correction) + 0.018602816348) < 2e-7


def check_kernel_and_phase():
    roots = np.array([0.3j, 0.4 + 1.3j, -0.4 + 1.3j, 0.4 - 1.3j, -0.4 - 1.3j])
    multiplicities = [2, 1, 1, 1, 1]
    f = np.poly1d(np.poly(np.repeat(roots, multiplicities)))
    derivative = f.deriv()
    points = np.array([0.17, 0.31 + 0.8j, 0.7 - 0.3j, 0.4 + 0.8j, 1.3 + 1j, 0.28 - 0.75j])
    tau = [0, 2, 1, 4, 3]
    form = np.zeros((len(roots), len(roots)))
    form[np.arange(len(roots)), tau] = multiplicities

    def kernel(poly):
        values, derivs = poly(points), poly.deriv()(points)
        return (np.outer(derivs, values.conj()) + np.outer(values, derivs.conj())) / (
            2 * (points[:, None] + points[None, :].conj())
        )

    def inertia(matrix):
        eig = np.linalg.eigvalsh(matrix)
        tol = np.max(np.abs(eig)) * 1e-10
        return tuple(np.count_nonzero(mask) for mask in (eig > tol, eig < -tol, abs(eig) <= tol))

    h = 0.37
    advance = f(points) + h * derivative(points) / 2
    reflect = np.conj(f(-points.conj()) + h * derivative(-points.conj()) / 2)
    assert_allclose(reflect, f(points) - h * derivative(points) / 2)
    assert_allclose(abs(advance)**2 - abs(reflect)**2, 2 * h * (derivative(points) * f(points).conj()).real)
    feature = f(points)[:, None] / (points[:, None] - roots[None, :])
    assert_allclose(kernel(f), feature @ form @ feature.conj().T / 2, atol=1e-12)
    assert inertia(kernel(f)) == (3, 2, 1)
    axis_f = np.poly1d(1j * np.poly([0.3j, -0.7j, 1.2j]))
    assert inertia(kernel(axis_f)) == (3, 0, 3)
    assert np.all((axis_f.deriv()(points) / axis_f(points)).real > 0)
    u = (roots - 0.5) / (roots + 0.5)
    index = np.arange(len(points))
    toeplitz = (u[None, None, :]**(index[:, None, None] - index[None, :, None])) @ multiplicities
    hankel = ((1j * roots)[None, None, :]**(index[:, None, None] + index[None, :, None])) @ multiplicities
    assert inertia(toeplitz) == (3, 2, 1)
    assert inertia(hankel) == (3, 2, 1)
    quartet = np.poly1d(np.poly(roots[1:]))
    near = 0.3999 + 1.3j
    assert (quartet.deriv()(near) * quartet(near).conj()).real < 0
    assert inertia(kernel(quartet)) == (2, 2, 2)

    modifier = np.poly1d([1, 0, 2])
    assert_allclose(kernel(modifier * f),
                    np.outer(modifier(points), modifier(points).conj()) * kernel(f)
                    + np.outer(f(points), f(points).conj()) * kernel(modifier))
    a = RNG.normal(size=(3, 3))
    a = a + a.T
    b = RNG.normal(size=(3, 4))
    raw = RNG.normal(size=(4, 4))
    c = raw.T @ raw + np.eye(4)
    x, y = RNG.normal(size=3), RNG.normal(size=4)
    d = np.linalg.solve(c, b.T @ x)
    assert_allclose(x @ a @ x + 2 * x @ b @ y + y @ c @ y,
                    x @ (a - b @ np.linalg.solve(c, b.T)) @ x + (y + d) @ c @ (y + d))
    assert 0 - 1 / 1 == -1
    boundary_double_root = np.poly1d([1, 0, 0])
    assert inertia(kernel(boundary_double_root)) == (1, 0, 5)
    assert boundary_double_root(0) == boundary_double_root.deriv()(0) == 0

    # For F(z)=z² the quotient extends to k(z,zeta)=z*zeta.
    center, radius = 0.6 + 0.2j, 0.1
    angles = 2 * np.pi * np.arange(32) / 32
    nodes = center + radius * np.exp(1j * angles)
    disk_kernel = np.outer(nodes, nodes.conj())
    modes = np.exp(1j * np.outer(angles, np.arange(3))) / radius**np.arange(3)
    coefficients = modes.conj().T @ disk_kernel @ modes / len(nodes)**2
    expected = np.array([center, 1, 0])
    assert_allclose(coefficients, np.outer(expected, expected.conj()), atol=1e-12)
    elsewhere = np.array([-0.6j, -0.9 + 0.2j, 1.2])
    features = (elsewhere[:, None] - center)**np.arange(3)
    assert_allclose(features @ coefficients @ features.conj().T,
                    np.outer(elsewhere, elsewhere.conj()), atol=1e-12)


    def phase(start, end):
        q = np.linspace(start, end, 80)
        values = q - (0.3 + 0.6j)
        exact = np.unwrap(np.angle(values))[-1] - np.unwrap(np.angle(values))[0]
        assert abs(exact) < np.pi
        assert_allclose(exact, np.angle(values[-1] / values[0]), atol=1e-14)
        return exact

    def grid_cell(left, right):
        vertices = [left, right, right + 1j, left + 1j]
        return sum(phase(a, b) for a, b in zip(vertices, vertices[1:] + vertices[:1]))

    assert_allclose(grid_cell(0, 0.5), 2 * np.pi)
    assert_allclose(grid_cell(0.5, 1), 0, atol=1e-14)
    assert_allclose(grid_cell(0, 1), grid_cell(0, 0.5) + grid_cell(0.5, 1))
    assert_allclose(np.exp(1j * np.pi), np.exp(-1j * np.pi), atol=1e-14)


def check_fixed_points():
    def residual(x):
        return x - np.cos(x)

    def taylor(x, n):
        return sum((-1)**j * x**(2 * j) / factorial(2 * j) for j in range(n))

    lower = Fraction("0.739085133215155")
    upper = Fraction("0.739085133215165")
    assert lower < taylor(lower, 10) and upper > taylor(upper, 9)
    alpha = bracketed_bisection(residual, 0, 1)
    assert round(alpha, 14) == 0.73908513321516
    for start in [-alpha, -7., -1., 0., 0.5, 1., 11.]:
        x = np.cos(np.cos(start))
        assert 0 <= x <= 1
        for n in range(28):
            new = np.cos(x)
            assert abs(new - alpha) <= np.sin(1) * abs(x - alpha) + 1e-15
            if n == 22 and abs(x - alpha) > 1e-9:
                assert abs((new - alpha) / (x - alpha) + np.sin(alpha)) < 1e-4
            x = new
    assert_allclose(np.cos(-alpha), alpha)
    assert_allclose(np.cos(np.array([alpha, alpha])[::-1]), [alpha, alpha])
    for x in np.linspace(0, 1, 101):
        assert abs(x - alpha) <= abs(residual(x)) + 1e-15
        assert abs(residual(x)) <= (1 + np.sin(1)) * abs(x - alpha) + 1e-15
    x = alpha + 1e-4
    update = x - residual(x) / (1 + np.sin(x))
    assert_allclose((update - alpha) / (x - alpha)**2, alpha / (2 * (1 + np.sin(alpha))), rtol=2e-4)
    for n in range(1, 7):
        root = bracketed_bisection(lambda x: x - taylor(x, n), 0, 1)
        assert (-1)**(n + 1) * (root - alpha) > 0
        assert abs(root - alpha) <= 1 / factorial(2 * n)
        for x in np.linspace(0.1, 1, 20):
            remainder = (-1)**n * (np.cos(x) - taylor(x, n))
            assert -2e-16 <= remainder <= x**(2 * n) / factorial(2 * n) + 2e-16
    fraction = alpha
    a0, a1, b0, b1 = 0, 1, 1, 0
    for _ in range(11):
        integer = int(fraction)
        a0, a1, b0, b1 = a1, integer * a1 + a0, b1, integer * b1 + b0
        if 0 <= a1 / b1 <= 1:
            assert 0 < abs(residual(a1 / b1)) < (1 + np.sin(1)) / b1**2
        fraction = 1 / (fraction - integer)
    a, b, c = Fraction(1, 4), Fraction(-1, 768), Fraction(-1, 61440)
    assert 4 * a == 1
    assert 4 * b + a**3 / 3 == 0
    assert 4 * c + a * a * b + 3 * a**5 / 20 == 0
    for x in np.linspace(0, 0.85, 12):
        assert_allclose(sum(comb(2 * j, j) * x**(2 * j + 1) / (4**j * (2 * j + 1))
                            for j in range(80)), np.arcsin(x), atol=1e-12)
    assert np.sinh(1) - 1 < 1 / 5
    eccentric = np.arcsin(alpha)
    assert eccentric < 1 and np.pi < 18 / 5
    assert_allclose(eccentric + np.sin(eccentric), np.pi / 2)
    golden = (1 + np.sqrt(5)) / 2
    assert_allclose([1 + 1 / golden, 1 / (1 + 1 / golden)], [golden, 1 / golden])
    x, f, g = Fraction(1), 1, 1
    for _ in range(18):
        assert x == Fraction(g, f)
        x, f, g = 1 + 1 / x, g, f + g
    for k in range(1, 5):
        q = np.exp(1j * k * alpha)
        series = np.sum(q**np.arange(1000))
        assert_allclose(series, (1 - q**1000) / (1 - q), atol=1e-12)
    values = {0, 1, 2}
    for size in (3, 2, 1):
        assert len(values) == size
        values = values - {max(values)} if max(values) else values
    assert values == {0}
    for q in RNG.normal(size=(20, 4)):
        q /= np.linalg.norm(q)
        assert_allclose([dist(mul(I, q), q), dist(mul(I, q), -q)], np.pi / 2)


def check_words_and_rotors():
    identity = tuple(range(5))

    def compose(a, b):
        return tuple(a[j] for j in b)

    def inverse(a):
        return tuple(a.index(j) for j in identity)

    def commutator(a, b):
        return compose(compose(compose(a, b), inverse(a)), inverse(b))

    a, b, c = (1, 2, 3, 4, 0), (2, 0, 4, 1, 3), (3, 0, 4, 2, 1)
    assert commutator(a, b) == c
    for x, y in product((0, 1), repeat=2):
        assert commutator(a if x else identity, b if y else identity) == (c if x and y else identity)
        assert compose(c, inverse(c if x else identity)) == (identity if x else c)
    order5 = exp_axis(BASIS[0], np.pi / 5)
    assert_allclose(mul(order5, order5), mul(-order5, -order5))
    assert dist(mul(order5, order5), ONE) > 0
    quarter = np.pi / 2
    for turn in (0.01, quarter, 2.4):
        y = exp_axis(BASIS[0], quarter)
        z = exp_axis([np.cos(turn), np.sin(turn), 0], quarter)

        def half_displacement(end, start):
            vector = ONE + mul(end, conj(start))
            return vector / np.linalg.norm(vector)

        h = mul(mul(half_displacement(ONE, z), half_displacement(z, y)), half_displacement(y, ONE))
        assert_allclose(h, exp_axis(BASIS[2], turn / 2), atol=1e-14)
    # Concretely exercise the telescoping bound for the rational readout.
    alphabet = [exp_axis(BASIS[0], 0.8), exp_axis(BASIS[1], -0.2)]
    exact, approximate, errors = ONE, ONE, []
    for g in alphabet * 10:
        t = np.round(g[1:] / (1 + g[0]), 3)
        changed = cayley(t)
        exact, approximate = mul(exact, g), mul(approximate, changed)
        errors.append(dist(g, changed))
    assert dist(exact, approximate) <= sum(errors) + 1e-14
    for modulus in (2, 3, 5):
        for x, y in product((0, 1), repeat=2):
            offsets = (2 + 3 * x + 5 * y) % modulus
            assert offsets == {(0, 0): 2, (0, 1): 7, (1, 0): 5, (1, 1): 10}[x, y] % modulus
    # S3 = Z/3 semidirect Z/2. Verify the quotient-prefix collection.
    def semidirect(g, h):
        return ((g[0] + (-1)**g[1] * h[0]) % 3, (g[1] + h[1]) % 2)
    letters = [(1, 1), (2, 1), (1, 0), (2, 1)]
    state, prefix, derived = (0, 0), 0, 0
    for g in letters:
        following = (prefix + g[1]) % 2
        n = semidirect(semidirect((0, prefix), g), (0, following))
        assert n[1] == 0
        derived = (derived + n[0]) % 3
        prefix = following
        state = semidirect(state, g)
    assert state == semidirect((derived, 0), (0, prefix))
    codes = [2**n + sum(bit * 2**j for j, bit in enumerate(bits))
             for n in range(1, 8) for bits in product((0, 1), repeat=n)]
    assert len(set(codes)) == len(codes)
    theta = np.mod(np.sqrt(2) * np.array(codes), 1)
    assert len(set(theta)) == len(codes)

    def xi(q):
        return 2 * q[0] * q[1:]

    def overlap(q, w):
        return float(q @ w)**2

    data = RNG.normal(size=(50, 2, 3))
    for x, y in data / (1 + np.linalg.norm(data, axis=2, keepdims=True)):
        q, w = cayley(x), cayley(y)
        p = mul(q, w)
        denom = (1 + x @ x) * (1 + y @ y)
        plus, minus = (1 + p[0]) * denom / 2, (1 - p[0]) * denom / 2
        numerator = denom * p[1:] / 2
        assert_allclose(plus + minus, denom)
        assert_allclose(plus * minus, numerator @ numerator, atol=1e-14)
        assert max(plus, minus) >= 0.5
        chart = numerator / plus if plus >= minus else -numerator / minus
        assert np.linalg.norm(chart) <= 1
        assert projective_dist(cayley(chart), p) < 1e-14
        assert_allclose(xi(q), xi(-q))
        assert_allclose(xi(q), 4 * (1 - x @ x) * x / (1 + x @ x)**2)
        assert np.linalg.norm(xi(q)) <= 1 + 1e-14
        assert 0 <= overlap(q, w) <= 1
        assert overlap(q, w) == overlap(-q, -w) == overlap(-q, w)
        assert_allclose(mul(mul(q, conj(q)), w), w, atol=1e-14)
    for v in BASIS:
        assert_allclose(xi(cayley(v)), 0)
        assert projective_dist(cayley(-v), cayley(v)) == 0
    for r in (0, 1e-7, 0.2, 1, 5):
        upd = r / (1 + r * r)
        root_upd = r / (1 + np.sqrt(1 + r * r))
        assert 0 <= upd <= 0.5 and 0 <= root_upd < 1
        assert_allclose(2 * root_upd / (1 - root_upd**2), r)
        if r == 1:
            assert upd == 0.5
        if r == 1e-7:
            assert_allclose([upd / r, root_upd / r], [1, 0.5], atol=1e-14)
    for weights in (np.array([0, 0, 0.]), np.array([0.4, 0.7, 0.1])):
        sums = np.sum(weights)
        denominator = 0.1 + sums
        assert_allclose(np.sum(weights / denominator), sums / denominator)
        assert sums / denominator < 1
    q, w = (ONE + I) / np.sqrt(2), (ONE + J) / np.sqrt(2)
    left, right = mul(q, w), mul(w, q)
    assert_allclose(left[1:] / (1 + left[0]), [1 / 3, 1 / 3, 1 / 3])
    assert_allclose(right[1:] / (1 + right[0]), [1 / 3, 1 / 3, -1 / 3])
    assert projective_dist(left, right) > 0
    weight = 1 / (1 + Fraction(1, 20))
    r = Fraction(1, 2)
    sine = 4 * (1 - r**2) * r / (1 + r**2)**2
    step = weight * sine / 4
    assert weight == Fraction(20, 21)
    assert step == Fraction(8, 35)
    assert step / (1 + step**2) == Fraction(280, 1289)
    golden = (1 + np.sqrt(5)) / 2
    assert_allclose(4 * (golden / 2)**2 - 1, golden)


def check_unread():
    state = np.array([1, 1j, 2]) / np.sqrt(6)
    density = np.outer(state, state.conj())
    projections = np.array([np.diag(v) for v in BASIS])
    blocks = np.array([p @ density @ p for p in projections])
    probabilities = np.array([np.trace(p @ density).real for p in projections])
    assert_allclose(probabilities, abs(state)**2)
    for block, probability in zip(blocks, probabilities):
        assert np.min(np.linalg.eigvalsh(block)) >= 0
        assert_allclose(np.trace(block / probability), 1)
    output = blocks.sum(axis=0)
    assert not np.allclose(output, density)
    assert_allclose(sum(p @ output @ p for p in projections), output)
    for i, j in permutations(range(3), 2):
        assert_allclose(projections[i] @ output @ projections[j], 0)


def check_finite_algorithms():
    for angle in (0, 0.2, 0.7, np.pi / 2):
        line = np.array([np.cos(angle), np.sin(angle)])
        first = np.diag([1, -1])
        second = 2 * np.outer(line, line) - np.eye(2)
        assert_allclose((second @ first)[:, 0], [np.cos(2 * angle), np.sin(2 * angle)], atol=1e-14)
    for modulus in range(1, 12):
        for j in range(-modulus, modulus + 1):
            values = np.exp(2j * np.pi * j * np.arange(modulus) / modulus)
            assert_allclose(np.sum(values), modulus if j % modulus == 0 else 0, atol=1e-13)
    orbit = [pow(2, j, 15) for j in range(4)]
    assert orbit == [1, 2, 4, 8] and pow(2, 4, 15) == 1
    chars = np.exp(2j * np.pi * np.arange(4)[:, None] * np.arange(4) / 4) / 2
    assert_allclose(chars.conj().T @ chars, np.eye(4), atol=1e-14)
    assert_allclose(abs(chars[0])**2, 0.25)


if __name__ == "__main__":
    checks = (
        check_hurwitz, check_icosians, check_norm_forms, check_gates_and_arcs,
        check_infinite_products, check_kernel_and_phase, check_fixed_points,
        check_words_and_rotors, check_unread, check_finite_algorithms,
    )
    for check in checks:
        check()
        print(f"PASS {check.__name__}")
    print(f"PASS all {len(checks)} check groups")
