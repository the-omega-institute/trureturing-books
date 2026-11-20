"""Finite checks for octonionic triality. Run with python3 check.py."""
from collections import Counter
from fractions import Fraction
from itertools import combinations, product

import numpy as np


BASIS = np.eye(8, dtype=int)
SIGNS = np.array([1] + [-1] * 7)
FANO = [(1, 2, 4), (2, 3, 5), (3, 4, 6), (4, 5, 7),
        (5, 6, 1), (6, 7, 2), (7, 1, 3)]


def multiplication_table():
    f = np.zeros((8, 8, 8), dtype=int)
    f[0, :, :] = f[:, 0, :] = BASIS
    for i in range(1, 8):
        f[i, i] = -BASIS[0]
    for a, b, c in FANO:
        for i, j, k in [(a, b, c), (b, c, a), (c, a, b)]:
            f[i, j, k] = 1
            f[j, i, k] = -1
    # Convert the Fano table to (1,i,j,k,ell,iell,jell,kell).
    conversion = BASIS[[0, 1, 2, 4, 3, 7, 5, 6]].copy()
    conversion[-1] *= -1
    table = np.einsum("ai,bj,ck,ijk->abc", conversion, conversion, conversion, f)
    return f, table


FANO_TABLE, TABLE = multiplication_table()


def mul(x, y, table=TABLE):
    return np.einsum("i,j,ijk->k", x, y, table)


def conj(x):
    return SIGNS * x


def assoc(x, y, z, table=TABLE):
    return mul(mul(x, y, table), z, table) - mul(x, mul(y, z, table), table)


def double(x, y, base, conjugate):
    a, b = np.split(x, 2)
    c, d = np.split(y, 2)
    return np.r_[base(a, c) - base(conjugate(d), b),
                 base(d, a) + base(b, conjugate(c))]


def check_octonions():
    basis_and_sums = list(BASIS) + [x + y for x, y in combinations(BASIS, 2)]
    for x, y in product(BASIS, repeat=2):
        cd = double(x, y, lambda a, b: mul(a, b, TABLE[:4, :4, :4]),
                    lambda a: a * SIGNS[:4])
        np.testing.assert_array_equal(mul(x, y), cd)
        np.testing.assert_array_equal(conj(mul(x, y)), mul(conj(y), conj(x)))
    for x, y in product(basis_and_sums, repeat=2):
        xy = mul(x, y)
        assert xy @ xy == (x @ x) * (y @ y)
    for x, y in product(basis_and_sums, BASIS):
        np.testing.assert_array_equal(mul(conj(x), mul(x, y)), (x @ x) * y)
        np.testing.assert_array_equal(mul(mul(y, x), conj(x)), (x @ x) * y)
        np.testing.assert_array_equal(assoc(x, x, y), np.zeros(8))
        np.testing.assert_array_equal(assoc(y, x, x), np.zeros(8))
    for x, y, z in product(basis_and_sums, BASIS, BASIS):
        np.testing.assert_array_equal(
            mul(mul(x, y), mul(z, x)), mul(mul(x, mul(y, z)), x))
        np.testing.assert_array_equal(
            mul(x, mul(y, mul(x, z))), mul(mul(mul(x, y), x), z))
        np.testing.assert_array_equal(
            mul(mul(mul(z, x), y), x), mul(z, mul(x, mul(y, x))))
    lines = {frozenset(line) for line in FANO}
    assert len(lines) == 7
    assert len({frozenset(pair) for line in FANO for pair in combinations(line, 2)}) == 21
    noncollinear = 0
    for i, j, k in combinations(range(1, 8), 3):
        a = assoc(BASIS[i], BASIS[j], BASIS[k], FANO_TABLE)
        on_line = frozenset((i, j, k)) in lines
        assert a @ a == (0 if on_line else 4)
        noncollinear += not on_line
    assert noncollinear == 28
    for j, k, sign in [(3, 6, -1), (5, 7, 1), (6, 3, 1)]:
        np.testing.assert_array_equal(
            assoc(BASIS[1], BASIS[2], BASIS[j], FANO_TABLE), 2 * sign * BASIS[k])
    for pair in [(1, 2, 3, 6, 1), (1, 3, 2, 6, -1), (1, 4, 3, 5, 1)]:
        a, b, c, d, sign = pair
        x, y = np.r_[BASIS[a], BASIS[b]], np.r_[BASIS[c], sign * BASIS[d]]
        assert x @ x == y @ y == 2
        for lhs, rhs in [(x, y), (y, x)]:
            np.testing.assert_array_equal(
                double(lhs, rhs, lambda v, w: mul(v, w, FANO_TABLE), conj),
                np.zeros(16))


def clifford():
    zero = np.zeros((8, 8), dtype=int)
    return np.array([np.block([[zero, left.T], [-sign * left.T, zero]])
                     for left, sign in zip(TABLE, SIGNS)])


def rotation(size, j, k):
    result = np.zeros((size, size), dtype=int)
    result[k, j], result[j, k] = 1, -1
    return result


CLIFF = clifford()
PLANES = [(0, 1), (2, 3), (4, 5), (6, 7)]
VECT = np.array([rotation(8, j, k) for j, k in PLANES])
SPIN = np.array([CLIFF[j] @ CLIFF[k] for j, k in PLANES])
VOLUME = np.linalg.multi_dot(list(CLIFF))
PLUS = slice(8, 16)
MINUS = slice(0, 8)


def comm(x, y):
    return x @ y - y @ x


def differential_defect(a, b, c):
    """Defect of infinitesimal related triples on each basis product."""
    return (np.einsum("kl,ijl->ijk", a, TABLE)
            - np.einsum("li,ljk->ijk", b, TABLE)
            - np.einsum("lj,ilk->ijk", c, TABLE))


def check_triality():
    identity = np.eye(16, dtype=int)
    np.testing.assert_array_equal(VOLUME, np.diag([-1] * 8 + [1] * 8))
    for j, k in product(range(8), repeat=2):
        np.testing.assert_array_equal(
            CLIFF[j] @ CLIFF[k] + CLIFF[k] @ CLIFF[j], -2 * (j == k) * identity)
    for j, k in combinations(range(8), 2):
        lifted = CLIFF[j] @ CLIFF[k]
        b = rotation(8, j, k)
        assert not np.any(differential_defect(lifted[MINUS, MINUS], 2 * b,
                                               lifted[PLUS, PLUS]))
        for l in range(8):
            target = 2 * (int(l == j) * CLIFF[k] - int(l == k) * CLIFF[j])
            np.testing.assert_array_equal(comm(lifted, CLIFF[l]), target)
    # Cyclicity and conjugated transposition of the para-octonion tensor.
    para = SIGNS[:, None, None] * SIGNS[None, :, None] * TABLE
    np.testing.assert_array_equal(para, para.transpose(2, 0, 1))
    np.testing.assert_array_equal(para, para.swapaxes(0, 1)
                                  * np.einsum("i,j,k->ijk", SIGNS, SIGNS, SIGNS))
    assert all(not np.any(mul(BASIS[0], x) - x) for x in BASIS)
    for a in BASIS:
        np.testing.assert_array_equal(assoc(BASIS[1], BASIS[2], a),
                                      np.r_[np.zeros(4), -2 * mul(a, BASIS[3])[4:]])
    nucleus = np.array([[*assoc(x, y, a)] for a in BASIS
                        for x, y in product(BASIS, repeat=2)]).reshape(8, -1)
    assert np.linalg.matrix_rank(nucleus, tol=1e-10) == 7
    assert {signs for signs in product((-1, 1), repeat=3)
            if not np.any((signs[0] - signs[1] * signs[2]) * TABLE)} == {
                (1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)}


def joint_weights(generators):
    """Return simultaneous weights, in twice-angular units."""
    coefficients = 5 ** np.arange(len(generators))
    generic = -1j * np.einsum("a,aij->ij", coefficients, generators)
    _, eigenvectors = np.linalg.eigh(generic)
    basis = eigenvectors
    result = []
    for generator in generators:
        diagonal = basis.conj().T @ (-1j * generator) @ basis
        rounded = np.rint(diagonal.diagonal().real).astype(int)
        np.testing.assert_allclose(diagonal, np.diag(rounded), atol=1e-10)
        result.append(rounded)
    return list(np.array(result).T)


def vector_weights(rank):
    return [sign * 2 * row for row in np.eye(rank, dtype=int) for sign in (-1, 1)]


def spin_weights(rank, parity):
    return [np.array(signs) for signs in product((-1, 1), repeat=rank)
            if np.prod(signs) == parity]


def check_weights(actual, expected):
    assert Counter(map(tuple, actual)) == Counter(map(tuple, expected)), (
        Counter(map(tuple, actual)), Counter(map(tuple, expected)))


def tensor_weights(rank, j, k):
    return [signs[0] * np.eye(rank, dtype=int)[j] + signs[1] * np.eye(rank, dtype=int)[k]
            for signs in product((-2, 2), repeat=2)]


def check_representation_dimensions():
    basis = np.eye(4, dtype=int)
    positive_roots = [basis[j] + sign * basis[k]
                      for j, k in combinations(range(4), 2) for sign in (-1, 1)]
    rho_twice = sum(positive_roots)
    fundamental_twice = (2 * basis[0], 2 * (basis[0] + basis[1]),
                         np.array([1, 1, 1, -1]), np.ones(4, dtype=int))

    def weyl_dimension(highest_twice):
        value = Fraction(1)
        for root in positive_roots:
            value *= Fraction(int((highest_twice + rho_twice) @ root),
                              int(rho_twice @ root))
        return value

    assert [weyl_dimension(weight) for weight in fundamental_twice] == [8, 28, 8, 8]
    for j, k in combinations(range(4), 2):
        assert weyl_dimension(fundamental_twice[j] + fundamental_twice[k]) > 8
    assert all(weyl_dimension(2 * weight) > 8 for weight in fundamental_twice)

    small_colour_weights = {(a, b): (a + 1) * (b + 1) * (a + b + 2) // 2
                            for a, b in product(range(4), repeat=2)
                            if (a + 1) * (b + 1) * (a + b + 2) <= 16}
    assert small_colour_weights == {
        (0, 0): 1, (1, 0): 3, (0, 1): 3, (2, 0): 6, (0, 2): 6, (1, 1): 8}


def check_branches():
    check_representation_dimensions()
    modules = [joint_weights(2 * VECT), joint_weights(SPIN[:, PLUS, PLUS]),
               joint_weights(SPIN[:, MINUS, MINUS])]
    for actual, expected in zip(modules, [vector_weights(4), spin_weights(4, 1),
                                         spin_weights(4, -1)]):
        check_weights(actual, expected)
    two_blocks = np.array([[1, 1, 0, 0], [1, -1, 0, 0],
                           [0, 0, 1, 1], [0, 0, 1, -1]])
    for actual, pairs in zip(modules, [[(0, 1), (2, 3)], [(0, 2), (1, 3)],
                                       [(0, 3), (1, 2)]]):
        expected = [w for j, k in pairs for w in tensor_weights(4, j, k)]
        check_weights(np.array(actual) @ two_blocks, expected)

    check_weights([w[1:] for w in modules[0]], vector_weights(3) + [(0, 0, 0)] * 2)
    for actual in modules[1:]:
        check_weights([w[1:] for w in actual], spin_weights(3, 1) + spin_weights(3, -1))
    expected_v = [(0, *w) for w in vector_weights(3)] + [(2, 0, 0, 0), (-2, 0, 0, 0)]
    check_weights(modules[0], expected_v)
    for parity, actual in zip((1, -1), modules[1:]):
        expected = [(charge, *w) for charge in (1, -1)
                    for w in spin_weights(3, parity * charge)]
        check_weights(actual, expected)

    clock = np.array([1, -1, -1, 1])
    np.testing.assert_array_equal(np.einsum("a,aij->ij", clock, VECT), TABLE[:, 1, :].T)
    clock_torus = np.vstack([np.eye(3, dtype=int), -np.ones(3, dtype=int)])
    t = np.column_stack([clock_torus, np.ones(4, dtype=int)])
    fund = list(2 * t)
    dual = [-w for w in fund]
    exterior_square = [2 * (t[j] + t[k] - np.array([0, 0, 0, 2]))
                       for j, k in combinations(range(4), 2)]
    even = exterior_square + [(0, 0, 0, 4), (0, 0, 0, -4)]
    odd = [w - (0, 0, 0, 4) for w in fund] + [w + (0, 0, 0, 4) for w in dual]
    for actual, expected in zip(modules, [fund + dual, even, odd]):
        check_weights((np.array(actual) * clock) @ t, expected)
    left_clock = np.array([1, 1, 1, -1])
    np.testing.assert_array_equal(np.einsum("a,aij->ij", left_clock, VECT), TABLE[1].T)
    for actual, expected in zip(modules, [fund + dual, odd, even]):
        check_weights((np.array(actual) * left_clock) @ t, expected)
    for parity, actual in zip((0, 1), modules[1:]):
        wedge = [2 * np.eye(4, dtype=int)[list(indices)].sum(axis=0) - 1
                 for degree in range(parity, 5, 2)
                 for indices in combinations(range(4), degree)]
        check_weights(np.array(actual) * clock, wedge)

    colour_torus = np.array([[0, 0], [-1, 0], [0, -1], [-1, -1]])
    colour_weights = [(0, 0), (0, 0)] + [
        (2 * sign * j, 2 * sign * k)
        for j, k in [(1, 0), (0, 1), (-1, -1)] for sign in (-1, 1)]
    for actual in modules:
        check_weights(np.array(actual) @ colour_torus, colour_weights)
    pq = np.array([[0, 0], [2, 0], [-1, 1], [1, 1]])
    expected = [(0, 0), (0, 0), (4, 0), (-4, 0)] + list(product((-2, 2), repeat=2))
    for actual in modules:
        check_weights(np.array(actual) @ pq, expected)


def check_quaternion_automorphisms():
    one, i, j, k, _, _, _, _ = BASIS
    for p, q in [(i, j), (j, k), (k, -i), (-one, -one)]:
        def automorphism(x):
            a, b = np.r_[x[:4], np.zeros(4, dtype=int)], np.r_[x[4:], np.zeros(4, dtype=int)]
            return np.r_[mul(mul(p, a), conj(p))[:4], mul(mul(q, b), conj(p))[:4]]

        matrix = np.array([automorphism(x) for x in BASIS]).T
        np.testing.assert_array_equal(matrix.T @ matrix, np.eye(8))
        for x, y in product(BASIS, repeat=2):
            np.testing.assert_array_equal(matrix @ mul(x, y), mul(matrix @ x, matrix @ y))
        if np.array_equal(p, -one) and np.array_equal(q, -one):
            np.testing.assert_array_equal(matrix, np.eye(8))
        if not np.any(mul(p, i) - mul(i, p)):
            np.testing.assert_array_equal(comm(matrix, TABLE[:, 1, :].T), np.zeros((8, 8)))


def check_stabilisers():
    check_quaternion_automorphisms()
    skew = [rotation(8, j, k) for j, k in combinations(range(8), 2)]
    constraints = np.array([differential_defect(x, x, x).ravel() for x in skew]).T
    _, singulars, kernel = np.linalg.svd(constraints, full_matrices=False)
    derivations = np.einsum("ab,bij->aij", kernel[singulars < 1e-10], skew)
    # The automorphism group is 14-dimensional. The conjugate SU(3) stabiliser is 8.
    assert len(derivations) == 14
    q_clock = TABLE[:, 1, :].T
    assert np.linalg.matrix_rank(derivations[:, :, 1], tol=1e-10) == 6
    assert np.linalg.matrix_rank([comm(x, q_clock).ravel() for x in derivations], tol=1e-10) == 6
    assert np.linalg.matrix_rank(derivations[:, 4:, :4].reshape(14, -1), tol=1e-10) == 8
    dq = np.column_stack([derivations[:, :, 1], derivations[:, 4:, :4].reshape(14, -1)])
    assert np.linalg.matrix_rank(dq, tol=1e-10) == 10
    assert 28 - np.linalg.matrix_rank([comm(x, q_clock).ravel() for x in skew],
                                      tol=1e-10) == 16
    block_skew = [x for x in skew if not np.any(x[4:, :4])]
    assert len(block_skew) == 12
    assert 12 - np.linalg.matrix_rank([comm(x, q_clock).ravel() for x in block_skew],
                                      tol=1e-10) == 8
    traceless_basis = np.linalg.svd(derivations[:, :, 1].T, full_matrices=True)[2][6:]
    colour_rep = np.einsum("ab,bij->aij", traceless_basis, derivations)
    # Compare the 6+1+1 model with the adjoint real 8 model.
    colour_rep /= np.sqrt(np.einsum("aij,aij->a", colour_rep, colour_rep))[:, None, None]
    adjoint_rep = np.array([
        [[np.sum(z * comm(x, y)) for y in colour_rep] for z in colour_rep]
        for x in colour_rep])
    for representation, dimension in [(colour_rep, 2), (adjoint_rep, 0)]:
        np.testing.assert_allclose(representation + representation.transpose(0, 2, 1),
                                   0, atol=1e-10)
        constraints = np.array([
            np.concatenate([comm(x, y).ravel() for y in representation]) for x in skew]).T
        _, singulars, kernel = np.linalg.svd(constraints, full_matrices=False)
        centralizer = np.einsum("ab,bij->aij", kernel[singulars < 1e-10], skew)
        assert len(centralizer) == dimension
        for x, y in product(centralizer, repeat=2):
            np.testing.assert_allclose(comm(x, y), 0, atol=1e-10)

    basis = [BASIS[j] for j in (2, 4, 6)]
    complex_basis = np.array([value for x in basis for value in (x, q_clock @ x)])
    form = np.zeros((3, 3, 3), dtype=int)
    form[0, 1, 2] = form[1, 2, 0] = form[2, 0, 1] = 1
    form[0, 2, 1] = form[2, 1, 0] = form[1, 0, 2] = -1
    for i, j, k in product(range(6), repeat=3):
        x, y, z = complex_basis[[i, j, k]]
        phase = (1j ** (i % 2 + j % 2 + k % 2)).real
        assert mul(x, y) @ z == phase * form[i // 2, j // 2, k // 2]
        assert mul(x, y)[0] == -(x @ y)
        assert mul(x, y)[1] == -((q_clock @ x) @ y)


def extension_clifford():
    sigma_1 = np.array([[0, 1], [1, 0]])
    sigma_2 = np.array([[0, -1j], [1j, 0]])
    sigma_3 = np.diag([1, -1])
    return np.array([np.kron(c, sigma_3) for c in CLIFF]
                    + [np.kron(np.eye(16), 1j * sigma) for sigma in (sigma_1, sigma_2)])


def check_spin10():
    clifford_10 = extension_clifford()
    for j, k in product(range(10), repeat=2):
        np.testing.assert_array_equal(clifford_10[j] @ clifford_10[k]
                                      + clifford_10[k] @ clifford_10[j],
                                      -2 * (j == k) * np.eye(32))
    planes = [clifford_10[j] @ clifford_10[j + 1] for j in range(0, 10, 2)]
    all_weights = joint_weights(np.array(planes))
    for parity in (-1, 1):
        actual = [w for w in all_weights if np.prod(w) == parity]
        ps = [(*a, *b) for sign in (-1, 1) for a in spin_weights(3, sign)
              for b in spin_weights(2, parity * sign)]
        spin8 = [(*a, b) for b in (-1, 1) for a in spin_weights(4, parity * b)]
        check_weights(actual, ps)
        check_weights(actual, spin8)
    vector_generators = np.array([rotation(10, j, j + 1) for j in range(0, 10, 2)])
    vector = joint_weights(2 * vector_generators)
    for cutoff in (3, 4):
        left = [(*w, *((0,) * (5 - cutoff))) for w in vector_weights(cutoff)]
        right = [(*((0,) * cutoff), *w) for w in vector_weights(5 - cutoff)]
        check_weights(vector, left + right)
    adjoint = [x + y for x, y in combinations(vector, 2)]
    block_terms = [(0,) * 5] * 5 + [
        w for j, k in combinations(range(5), 2) for w in tensor_weights(5, j, k)]
    check_weights(adjoint, block_terms)
    assert len(adjoint) == 45
    # The common central -1 signs for the two blocks have the same
    # eigenvalues on a full turn, so their product is trivial.
    for w in all_weights:
        assert (w[0] + w[3]) % 2 == 0


def anomaly_coefficients(colours, charges):
    q, u, d, l, e, n = charges
    return np.array([2 * q + u + d, colours * q + l,
                     2 * colours * q + colours * (u + d) + 2 * l + e + n,
                     2 * colours * q**3 + colours * (u**3 + d**3) + 2 * l**3 + e**3 + n**3],
                    dtype=object)


def check_gauge_numbers():
    half = Fraction(1, 2)
    bl = [Fraction(-1), Fraction(1, 3)]
    electric_l = [(charge * half + weak) for charge in bl for weak in (half, -half)]
    assert electric_l == [0, -1, Fraction(2, 3), Fraction(-1, 3)]
    hyper_l = [b * half for b in bl]
    hyper_r = electric_l
    all_left = [hyper_l[1], -hyper_r[2], -hyper_r[3], hyper_l[0],
                -hyper_r[1], -hyper_r[0]]
    assert all_left == [Fraction(1, 6), Fraction(-2, 3), Fraction(1, 3), -half, 1, 0]
    assert len(list(product((half, -half), repeat=2))) == 4
    assert Counter(r for _, r in product((half, -half), repeat=2)) == {half: 2, -half: 2}
    assert 4 * 2 == 8 and 2 * 8 == 16
    assert 3 + 1 + 1 > 4
    assert sum((3, 1, 1)) == 5
    sixth_roots = np.exp(1j * np.pi * np.arange(6) / 3)
    for z in sixth_roots:
        colour, weak = z**-2, z**3
        np.testing.assert_allclose([colour**3, weak**2, z**2 * colour, z**-3 * weak],
                                   [1, 1, 1, 1], atol=1e-12)
    np.testing.assert_array_equal(anomaly_coefficients(3, all_left), np.zeros(4))
    for generation_count in range(1, 9):
        assert (4 * generation_count) % 2 == 0
        assert not np.any(generation_count * anomaly_coefficients(3, all_left))

    for colours in range(2, 13):
        for q, t, w in product(map(Fraction, (0, 1, -1, "1/3")), repeat=3):
            charges = [q, -q + t, -q - t, -colours * q, colours * q + w, colours * q - w]
            np.testing.assert_array_equal(anomaly_coefficients(colours, charges),
                                          [0, 0, 0, 6 * colours * q * (w*w - t*t)])
        for y_q, expected in [(Fraction(1, 2 * colours), Fraction(colours, 2 * (colours + 1))),
                              (Fraction(1, 6), Fraction(9 * (colours + 1), 4 * (9 + 5 * colours)))]:
            up, down = y_q + half, y_q - half
            t3 = [half, -half] * (colours + 1) + [0] * (2 * colours + 2)
            y = [-half, -half] + [y_q, y_q] * colours + [0, -1] + [up, down] * colours
            electric = [x + z for x, z in zip(t3, y)]
            tr_t3 = sum(x*x for x in t3)
            tr_y = sum(x*x for x in y)
            tr_q = sum(x*x for x in electric)
            assert tr_t3 == Fraction(colours + 1, 2)
            assert sum(x*z for x, z in zip(t3, y)) == 0
            assert tr_q == 2 * (1 + colours * (up*up + down*down))
            assert tr_t3 / tr_q == expected
            if colours == 3:
                assert (tr_t3, tr_y, expected) == (2, Fraction(10, 3), Fraction(3, 8))
        assert tr_t3 / 2 == Fraction(colours + 1, 4)
    for colours in map(Fraction, ("1/10", 1, 2, 3, 4, 20)):
        difference = colours / (2 * (colours + 1)) - 9 * (colours + 1) / (4 * (9 + 5 * colours))
        assert difference == (colours - 3) * (colours + 3) / (4 * (colours + 1) * (9 + 5 * colours))
        assert (difference == 0) == (colours == 3)

    sin2, alpha_inv, alpha_s = 0.23122, 127.95, 0.1180
    u = np.array([1 - sin2, sin2, 1 / (alpha_s * alpha_inv)]) * alpha_inv
    slopes = np.array([41 / 6, -19 / 6, -7])
    g1_g2 = (u[0] - (5 / 3) * u[1]) / (slopes[0] - (5 / 3) * slopes[1])
    g2_g3 = (u[1] - u[2]) / (slopes[1] - slopes[2])
    np.testing.assert_allclose([g1_g2, g2_g3], [4.05, 5.51], atol=0.006, rtol=0)
    assert g2_g3 - g1_g2 > 1
    at_g1_g2 = u - slopes * g1_g2
    np.testing.assert_allclose(at_g1_g2[1] / sum(at_g1_g2[:2]), 3 / 8)
    np.testing.assert_allclose(at_g1_g2 + slopes * g1_g2, u)
    for scale in (0.5, 1, 2):
        modified = u[:2] * [scale, 1]
        np.testing.assert_allclose(modified[1] / sum(modified), u[1] / (scale*u[0] + u[1]))


def check_controls():
    assert [2 ** (n + 1) - 1 for n in (1, 2, 3)] == [3, 7, 15]
    for theta in (0, np.pi / 5, np.pi / 2):
        b = np.cos(theta) * BASIS[2] + np.sin(theta) * BASIS[4]
        quaternion = np.array([BASIS[0], BASIS[1], b, mul(BASIS[1], b)])
        np.testing.assert_allclose(quaternion @ quaternion.T, np.eye(4), atol=1e-12)
        assert np.linalg.matrix_rank(quaternion[:, [2, 4]], tol=1e-10) == 1
    h = BASIS[:4]
    commutator_columns = np.array([
        np.concatenate([(mul(a, x) - mul(x, a))[:4] for x in h]) for a in h])
    assert np.linalg.matrix_rank(commutator_columns, tol=1e-10) == 3
    one, i, j, k = h
    np.testing.assert_array_equal(mul(mul(one, i), j), k)
    np.testing.assert_array_equal(mul(mul(one, j), i), -k)

    j = TABLE[:, 1, :].T
    f = np.arange(64).reshape(8, 8)
    translated = j @ f @ j.T
    np.testing.assert_array_equal(j @ f - f @ j, (translated - f) @ j)
    np.testing.assert_array_equal(j + j.T, np.zeros((8, 8)))
    np.testing.assert_array_equal(j @ j.T, np.eye(8))
    np.testing.assert_array_equal(j @ j, -np.eye(8))

    cavity = np.pi**2 * (np.arange(1, 22)**2 + 2) / 4
    assert np.all(np.diff(cavity) > 0)
    singular_values = np.linalg.svd(f, compute_uv=False)
    for scale in (0.5, 1, 2):
        np.testing.assert_allclose(np.linalg.svd(scale * f, compute_uv=False),
                                   scale * singular_values, atol=1e-10)


def main():
    for description, check in [
        ("octonion table, norm, Moufang, Fano and further doubling", check_octonions),
        ("Clifford relations, spin action and triality tensor", check_triality),
        ("Spin(8) weights and all specified subgroup restrictions", check_branches),
        ("quaternion and clock stabilisers, colour centralisers and volume", check_stabilisers),
        ("Spin(10), Pati--Salam and adjoint weights", check_spin10),
        ("hypercharges, anomalies, trace ratios and one-loop scales", check_gauge_numbers),
        ("dimension, cavity, Yukawa and algebraic examples", check_controls),
    ]:
        check()
        print("PASS " + description)
    print("All d1 checks passed.")


if __name__ == "__main__":
    main()
