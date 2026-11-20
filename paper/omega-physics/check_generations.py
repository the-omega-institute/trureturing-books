#!/usr/bin/env python3
"""Finite checks for the generations section (sec:generations), vendored from module d2. NumPy is the only external dependency."""
from fractions import Fraction
from itertools import permutations, product
from math import comb
import re

import numpy as np
from numpy.testing import assert_allclose, assert_array_equal


def quaternion_product(left, right):
    """Hamilton product, with optional broadcast dimensions."""
    scalar = left[..., 0] * right[..., 0] - np.sum(left[..., 1:] * right[..., 1:], axis=-1)
    vector = (left[..., :1] * right[..., 1:] + right[..., :1] * left[..., 1:]
              + np.cross(left[..., 1:], right[..., 1:]))
    return np.concatenate((scalar[..., None], vector), axis=-1)


def check_clocks():
    identity = np.eye(4, dtype=int)
    unit, i, j, k = identity

    def right(q):
        return quaternion_product(identity, q).T

    def left(q):
        return quaternion_product(q, identity).T

    first, second, third = right(i), right(j), right(-k)
    for clock in (first, second, third):
        assert_array_equal(clock @ clock, -identity)
        assert_array_equal(clock.T @ clock, identity)
        for transport in map(left, (i, j, k)):
            assert_array_equal(clock @ transport, transport @ clock)
    for a, b, c in ((first, second, third), (second, third, first), (third, first, second)):
        assert_array_equal(a @ b, c)
        assert_array_equal(b @ a, -c)
    assert_array_equal(second @ first, -first @ second)
    assert_array_equal(third @ first, -first @ third)
    for q in (unit, i, j, k, np.array([1, 2, 3, 4])):
        assert_array_equal(left(q).T @ left(q), (q @ q) * identity)
    basis = np.vstack((i, j, k))[:, 1:]
    for u in (*basis, np.array([1, 2, 2]) / 3):
        for v in (*basis, np.array([2, -2, 1]) / 3):
            ru, rv = (right(np.r_[0, direction]) for direction in (u, v))
            assert_allclose(ru @ rv + rv @ ru, -2 * (u @ v) * identity, atol=1e-14)


def check_indices():
    for degree in range(-24, 25):
        # Laurent transition conditions on each chart leave these exponents.
        positive = sum(0 <= power <= degree - 1 for power in range(25))
        negative = sum(0 <= power <= -degree - 1 for power in range(25))
        assert (positive, negative) == (max(degree, 0), max(-degree, 0))
        assert positive - negative == degree
        assert 2 * degree != 3 and 2 * degree != -3
    assert (max(3, 0), max(-3, 0)) == (3, 0)
    assert max(3, 0) + max(-3, 0) == max(-3, 0) + max(3, 0) == 3
    for dimension, spin_rank in ((2, 2), (4, 4)):
        betti = np.zeros(dimension + 1, dtype=int)
        betti[[0, dimension]] = 1
        euler = sum((-1)**degree * value for degree, value in enumerate(betti))
        assert euler == 2 and spin_rank == 2**(dimension // 2)
        for rank in range(17):
            assert (euler * rank) % 2 == 0
    three = []
    for n in range(41):
        weights = n - 2 * np.arange(n + 1)
        coefficient = comb(n + 2, 3)
        assert weights.sum() == 0 and weights @ weights == 2 * coefficient
        assert (coefficient >= 4) == (n >= 2)
        for charge in range(-9, 10):
            index = -charge * coefficient
            assert index == -charge * (weights @ weights) // 2
            assert np.sign(index) == -np.sign(charge) * (n > 0)
            assert (4 * index) % 4 == 0
            if abs(index) == 3:
                three.append((n, charge))
    assert three == [(1, -3), (1, 3)]
    assert comb(3, 3) == 1
    for fundamental, adjoint in product(range(6), repeat=2):
        assert (fundamental + 4 * adjoint == 3) == (fundamental == 3 and adjoint == 0)
    assert 3 * 15 == 45 and 3 * 16 == 48


def golden_product(left, right):
    """Multiply pairs a,b representing a + b*phi, phi**2 = phi + 1."""
    a, b = np.moveaxis(left, -1, 0)
    c, d = np.moveaxis(right, -1, 0)
    return np.stack((a*c + b*d, a*d + b*c + b*d), axis=-1)


def golden_quaternion_product(left, right):
    """Multiply coordinate pairs in the integral golden ring."""
    a, b, c, d = np.moveaxis(left, -2, 0)
    p, q, r, s = np.moveaxis(right, -2, 0)
    mul = golden_product
    return np.stack((
        mul(a, p) - mul(b, q) - mul(c, r) - mul(d, s),
        mul(a, q) + mul(b, p) + mul(c, s) - mul(d, r),
        mul(a, r) - mul(b, s) + mul(c, p) + mul(d, q),
        mul(a, s) + mul(b, r) - mul(c, q) + mul(d, p),
    ), axis=-2)


def icosahedral_vertices():
    """Doubled 600-cell coordinates over Z[phi]."""
    axes = np.zeros((8, 4, 2), dtype=int)
    axes[:4, :, 0] = 2 * np.eye(4, dtype=int)
    axes[4:] = -axes[:4]
    half = np.zeros((16, 4, 2), dtype=int)
    half[..., 0] = list(product((-1, 1), repeat=4))
    golden = []
    for order in permutations(range(4)):
        inversions = sum(order[i] > order[j] for i in range(4) for j in range(i+1, 4))
        if inversions % 2:
            continue
        for a, b, c in product((-1, 1), repeat=3):
            point = np.array([(0, 0), (a, 0), (-b, b), (0, c)])
            golden.append(point[list(order)])
    assert (len(axes), len(half), len(golden)) == (8, 16, 96)
    return np.concatenate((axes, half, golden))


def check_mckay_and_icosians():
    vertices = icosahedral_vertices()
    phi = (1 + np.sqrt(5)) / 2
    inverse_phi = phi - 1
    unit_norm = np.tile([4, 0], (120, 1))
    assert_array_equal(golden_product(vertices, vertices).sum(axis=1), unit_norm)
    vertex_keys = {tuple(point.ravel()) for point in vertices}
    assert len(vertex_keys) == 120
    for point in vertices:
        doubled_products = golden_quaternion_product(point, vertices)
        assert np.all(doubled_products % 2 == 0)
        assert {tuple(item.ravel()) for item in doubled_products // 2} == vertex_keys

    traces, counts = np.unique(vertices[:, 0, :], axis=0, return_counts=True)
    expected_counts = {(2, 0): 1, (0, 1): 12, (1, 0): 20, (-1, 1): 12, (0, 0): 30,
                       (-2, 0): 1, (0, -1): 12, (-1, 0): 20, (1, -1): 12}
    assert dict(zip(map(tuple, traces), counts)) == expected_counts
    assert_allclose(2*np.cos(np.pi/np.array([5, 2, 3])), [phi, 0, 1], atol=1e-14)
    assert_allclose(2*np.cos(2*np.pi/5), inverse_phi)
    assert_allclose([phi * inverse_phi, phi**2 + inverse_phi**2], [1, 3])
    assert [30//2, 20//2, 12//2] == [15, 10, 6]

    trace = vertices[:, 0, :]
    zero = np.zeros_like(trace)
    one = zero + [1, 0]
    characters = [one, trace]
    for _ in range(6):
        characters.append(golden_product(trace, characters[-1]) - characters[-2])
    b2 = characters[7] - characters[5]
    b4 = golden_product(trace, b2)
    b3 = golden_product(trace, characters[5]) - characters[4] - b4
    character = np.array([*characters[:6], b3, b4, b2])
    dimensions = character[:, 0, :]
    assert_array_equal(dimensions[:, 0], [1, 2, 3, 4, 5, 6, 3, 4, 2])
    assert_array_equal(dimensions[:, 1], 0)
    assert dimensions[:, 0] @ dimensions[:, 0] == 120

    first_columns = [(2, 0), (0, 1), (1, 0), (-1, 1), (0, 0)]
    indices = [np.where(np.all(trace == value, axis=1))[0][0] for value in first_columns]
    tabulated = [[1, 1, 1, 1, 1], [2, phi, 1, inverse_phi, 0],
                 [3, phi, 0, -inverse_phi, -1], [4, 1, -1, -1, 0],
                 [5, 0, -1, 0, 1], [6, -1, 0, 1, 0],
                 [3, -inverse_phi, 0, phi, -1], [4, -1, 1, -1, 0],
                 [2, -inverse_phi, 1, -phi, 0]]
    assert_allclose(character[:, indices] @ np.array([1, phi]), tabulated, atol=1e-14)
    assert_array_equal(character[:, 4:8], character[:, :4] *
                       np.array([1, -1, 1, -1, 1, -1, 1, 1, -1])[:, None, None])
    products = golden_product(character[:, None], character[None, :]).sum(axis=2)
    assert_array_equal(products[..., 0], 120 * np.eye(9, dtype=int))
    assert_array_equal(products[..., 1], 0)

    adjacency = np.zeros((9, 9), dtype=int)
    paths = [(5, 4, 3, 2, 1, 0), (5, 7, 8), (5, 6)]
    for path in paths:
        for first, second in zip(path, path[1:]):
            adjacency[first, second] = adjacency[second, first] = 1
    tensor = golden_product(trace, character)
    assert_array_equal(tensor, np.einsum("ij,jka->ika", adjacency, character))
    assert_array_equal(adjacency - adjacency.T, 0)
    assert [len(path) - 1 for path in paths] == [5, 2, 1]
    finite_arms = [paths[0][:-1], *paths[1:]]
    assert [len(path) for path in finite_arms] == [5, 3, 2]
    assert [len(path) - 1 for path in finite_arms] == [4, 2, 1]

    all_roots = np.concatenate((vertices, golden_product(vertices, np.array([-1, 1]))))
    assert len({tuple(item.ravel()) for item in all_roots}) == 240
    norms = golden_product(all_roots, all_roots).sum(axis=1)
    assert_array_equal(norms[120:], np.tile([8, -4], (120, 1)))
    assert_array_equal(norms.sum(axis=1), 4)
    assert np.count_nonzero(np.all(all_roots[:, 0, :] == 0, axis=1)) == 60
    real_vectors = all_roots @ np.array([1, phi]) / 2
    conjugates = all_roots @ np.array([1, 1 - phi]) / 2
    two_embeddings = np.hstack((np.sqrt(2*phi/np.sqrt(5))*real_vectors,
                                np.sqrt(2*inverse_phi/np.sqrt(5))*conjugates))
    assert np.linalg.matrix_rank(two_embeddings) == 8
    assert np.linalg.matrix_rank(two_embeddings[np.all(all_roots[:, 0, :] == 0, axis=1)]) == 6
    gram = two_embeddings @ two_embeddings.T
    assert_allclose(np.diag(gram), 2)
    assert_allclose(gram, np.rint(gram), atol=1e-14)
    basis = np.array([
        [[2, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [2, 0], [0, 0], [0, 0]],
        [[1, 0], [1, 0], [1, 0], [1, 0]],
        [[0, 0], [1, 0], [-1, 1], [0, 1]],
    ])
    assert all(tuple(point.ravel()) in vertex_keys for point in basis)
    assert_allclose(np.linalg.det((basis @ [1, phi]) / 2), 1/4)
    assert_allclose(np.linalg.det((basis @ [1, 1 - phi]) / 2), 1/4)
    spanning = np.concatenate((basis, golden_product(basis, np.array([0, 1]))))
    products = golden_product(spanning[:, None], spanning[None]).sum(axis=2)
    gram = products.sum(axis=2) / 2
    assert_array_equal(gram, np.rint(gram))
    assert_allclose(np.linalg.det(gram), 1)
    assert 4**4 * Fraction(1, 16)**2 == 1


def check_triality():
    # Columns index the same group elements in every module.
    central_characters = np.array([[1, 1, -1, -1], [1, -1, 1, -1], [1, -1, -1, 1]])
    kernels = [set(np.where(row == 1)[0]) for row in central_characters]
    assert kernels == [{0, 1}, {0, 2}, {0, 3}]
    assert len({tuple(row) for row in central_characters}) == 3
    weights = [signs for signs in product((-1, 1), repeat=5) if np.prod(signs) == 1]
    assert len(weights) == 16
    assert sum(np.prod(weight[:3]) == 1 for weight in weights) == 4*2
    assert sum(np.prod(weight[:3]) == -1 for weight in weights) == 4*2
    assert all(np.prod(weight[:3]) == np.prod(weight[3:]) for weight in weights)
    restriction = [weight[:4] for weight in weights]
    assert len(set(restriction)) == 16
    assert sum(np.prod(weight) == 1 for weight in restriction) == 8
    assert sum(np.prod(weight) == -1 for weight in restriction) == 8
    assert 8 < 15 < 16 and 1 + 7 == 8 and 8 + 1 + 1 == 10


def check_physics():
    q, u, d, lepton, electron = [Fraction(a, 6) for a in (1, -4, 2, -3, 6)]
    widths = [6, 3, 3, 2, 1]
    charges = [q, u, d, lepton, electron]
    assert 2 - 1 - 1 == 0
    assert Fraction(1, 2) * (2*q + u + d) == 0
    assert Fraction(1, 2) * (3*q + lepton) == 0
    assert sum(mult * y for mult, y in zip(widths, charges)) == 0
    cubic_terms = [36 * mult * y**3 for mult, y in zip(widths, charges)]
    assert cubic_terms == [1, -32, 4, -9, 36]
    assert sum(cubic_terms) == 0
    assert sum(widths) == 15 and (-1)**(3 + 1) == 1
    for count in range(1, 24):
        phases = (count - 1) * (count - 2) // 2
        assert phases == count**2 - (2*count - 1) - comb(count, 2)
        assert (phases > 0) == (count >= 3)
        assert (-1)**(4 * count) == 1
        b0 = 11 - Fraction(4 * count, 3)
        assert (b0 > 0) == (count <= 8)
        assert (b0 > 0 and phases > 0) == (3 <= count <= 8)
    assert 11 - Fraction(4*8, 3) == Fraction(1, 3)
    assert 11 - Fraction(4*9, 3) == -1
    assert [f for f in range(1, 25) if 11 - Fraction(2*f, 3) > 0][-1] == 16

    labels = np.arange(3)
    omega = np.exp(2j*np.pi/3)
    fourier = omega**np.outer(labels, labels) / np.sqrt(3)
    assert_allclose(1 + omega + omega**2, 0, atol=1e-14)
    assert_allclose(fourier @ fourier.conj().T, np.eye(3), atol=1e-14)
    plaquette = fourier[0, 0] * fourier[1, 1] * (fourier[0, 1] * fourier[1, 0]).conj()
    assert_allclose(plaquette.imag, np.sqrt(3)/18)
    rephased = np.exp(1j*labels)[:, None] * fourier * np.exp(-0.37j*labels)[None, :]
    rephased_plaquette = (rephased[0, 0] * rephased[1, 1]
                           * (rephased[0, 1] * rephased[1, 0]).conj())
    assert_allclose(rephased_plaquette, plaquette)

    up, down = q + Fraction(1, 2), q - Fraction(1, 2)
    assert (up, down) == (Fraction(2, 3), Fraction(-1, 3))
    assert Fraction(1, 2) / q == 3
    trace_q = 2 * (1 + 3 * (up**2 + down**2))
    trace_t = Fraction(3 + 1, 2)
    assert trace_q == Fraction(16, 3) and trace_t == 2
    assert trace_t / trace_q == Fraction(3, 8)
    for count, sector in product(range(1, 10), range(-5, 6)):
        assert 3 * count * Fraction(1, 3) * sector == count * sector
        assert count * (3 * Fraction(1, 3) - 1) * sector == 0
        assert 3 * sector not in (-2, -1, 1, 2)

    masses = np.array([2., 4., 5.])
    matrix = fourier @ np.diag(masses)
    assert_allclose(matrix @ matrix.conj().T, fourier @ np.diag(masses**2) @ fourier.conj().T)
    assert_allclose(np.linalg.svd(2*matrix, compute_uv=False), 2*masses[::-1])
    nineteen = 3 + 2 + 9 + 4 + 1
    twenty_six = nineteen + 3 + 4
    assert (nineteen, twenty_six, twenty_six + 2) == (19, 26, 28)

    # The experimental values are inputs. Only transcription and arithmetic are tested.
    reported, error = Fraction("2.9840"), Fraction("0.0082")
    assert (round(reported, 3), round(error, 3)) == (Fraction("2.984"), Fraction("0.008"))
    assert round((3 - reported) / error, 2) == Fraction("1.95")
    for value, sigma in ((reported, error), (Fraction("2.9963"), Fraction("0.0074"))):
        lower, upper = value - Fraction("1.95996")*sigma, value + Fraction("1.95996")*sigma
        assert [n for n in range(9) if lower <= n <= upper] == [3]
    assert round(Fraction("137.035999177"), 3) == Fraction("137.036")
    assert Fraction("0.23122") - Fraction("0.00006") == Fraction("0.23116")
    assert Fraction("127.95") < Fraction("137.036")


def check_cavity_and_arithmetic():
    # Midpoint sine quadrature is exact for these discrete harmonics.
    x = (np.arange(128) + 0.5) * np.pi / 128
    labels = np.arange(1, 13)
    samples = np.sin(labels[:, None] * x)
    assert_allclose(np.pi / 128 * samples @ samples.T, np.pi/2 * np.eye(12), atol=1e-14)
    modes = product(range(1, 5), repeat=3)
    for mode in modes:
        n = np.array(mode)
        u = np.sin(n * np.array([0.3, 1.3, 2.3]))
        minus_laplace = sum(n[j]**2 * u.prod() for j in range(3))
        assert_allclose(minus_laplace, (n @ n) * u.prod())
    assert np.all(np.diff(labels**2 + 2) > 0)
    assert [comb(3, grade) for grade in range(4)] == [1, 3, 3, 1]

    for d in range(2, 22):
        assert Fraction(d) > 1
        assert sum(Fraction(1, 2**j) for j in range(1, d+1)) == 1 - Fraction(1, 2**d)
    roots = np.roots([1, -1, -1, -1])
    real = roots[np.isreal(roots)].real
    assert len(real) == 1 and 1 < real[0] < 2
    assert_allclose(real[0]**3, real[0]**2 + real[0] + 1)
    for denominator in range(2, 26):
        for numerator in range(denominator):
            for n in range(1, denominator + 3):
                points = sorted({i*numerator % denominator for i in range(n)})
                lengths = np.diff(points + [points[0] + denominator])
                assert 1 <= len(set(lengths)) <= 3
    assert len(set(np.diff([0, 1, 2, 3]))) == 1
    assert len(set(np.diff([0, 2, 5]))) == 2
    three_gaps = sorted({3*i % 8 for i in range(4)})
    assert_array_equal(np.diff(three_gaps + [8]), [1, 2, 3, 2])
    axes = np.array([[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2],
                     [2, 0, 1], [-2, 0, 1]])
    assert_array_equal((axes**2).sum(axis=1), 5)
    lattice = np.array(list(product(range(-7, 8), repeat=3)))
    squared_norm = (lattice**2).sum(axis=1)
    projection = ((lattice @ axes.T)**2).max(axis=1)
    assert np.all(projection >= 3 * squared_norm)
    assert np.all(2 * projection[squared_norm > 0] > 5 * squared_norm[squared_norm > 0])

    for t, p, q in product(range(-5, 6), repeat=3):
        x = p - (t+1)*q
        assert x + (t+1)*q == p
        assert (2*t+1)**2 - 4*(t*t+t+1) == -3
        assert p*p - (2*t+1)*p*q + (t*t+t+1)*q*q == x*x + x*q + q*q
    for a, b in product(range(-12, 13), repeat=2):
        assert (2*a+b)**2 - 5*b*b == 4*(a*a+a*b-b*b)
    for base in (np.array([0, 1]), np.array([-1, 1])):
        golden = np.array([1, 0])
        for n in range(16):
            a, b = golden
            assert (2*a+b)**2 - 5*b*b == 4*(-1)**n
            golden = golden_product(golden, base)
    for n in range(1, 5):
        assert sum(sum(x*x for x in point) == n
                   for point in product(range(-2, 3), repeat=4)) == [8, 24, 32, 24][n-1]
    for s, t in product((-3, -1, 1, 2), repeat=2):
        basis_products = np.array([
            [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
            [[0, 1, 0, 0], [s, 0, 0, 0], [0, 0, 0, 1], [0, 0, s, 0]],
            [[0, 0, 1, 0], [0, 0, 0, -1], [t, 0, 0, 0], [0, -t, 0, 0]],
            [[0, 0, 0, 1], [0, 0, -s, 0], [0, t, 0, 0], [-s*t, 0, 0, 0]],
        ])
        point = np.array([2, -3, 5, 7])
        conjugate = point * [1, -1, -1, -1]
        assert_array_equal(point + conjugate, [4, 0, 0, 0])
        expected = point**2 @ [1, -s, -t, s*t]
        assert_array_equal(np.einsum("i,j,ijk->k", point, conjugate, basis_products),
                           [expected, 0, 0, 0])


if __name__ == "__main__":
    for check in (check_clocks, check_indices, check_mckay_and_icosians, check_triality,
                  check_physics, check_cavity_and_arithmetic):
        check()
        print(f"PASS {check.__name__}")
    print("All d2 finite checks passed.")
