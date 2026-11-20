#!/usr/bin/env python3
"""Finite exhaustive checks and seeded numerical checks for Section 5D (braids, quandles and stabilisers).

Only NumPy is required. The group actions are evaluated on integer tables
after checking closure and unique matching in the matrix model. Random
checks use fixed seeds and complement the general proofs in the section.
"""
from itertools import product

import numpy as np
from numpy.testing import assert_allclose, assert_array_equal


ATOL = 2e-12
I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.diag([1, -1]).astype(complex)
PAULI = np.array([X, Y, Z])
H = (X + Z) / np.sqrt(2)
QUATERNION = np.array([I, *(-1j * PAULI)])
TREFOIL = (1, 1, 1)
FIGURE_EIGHT = (1, -2, 1, -2)


def close(actual, expected, tol=ATOL):
    assert_allclose(actual, expected, atol=tol, rtol=0)


def adjoint(matrix):
    return matrix.conj().swapaxes(-2, -1)


def coordinates(matrix):
    return np.einsum("aij,...ij->...a", QUATERNION.conj(), matrix).real / 2


def quaternion(vector):
    return np.einsum("...a,aij->...ij", vector, QUATERNION)


def comparison(left, right):
    dimension = left.shape[-1]
    return (1 + np.trace(adjoint(left) @ right, axis1=-2, axis2=-1).real / dimension) / 2


def commutator(left, right):
    return left @ right @ adjoint(left) @ adjoint(right)


def sphere_samples(rng, dimension, count):
    vectors = rng.normal(size=(count, dimension))
    return vectors / np.linalg.norm(vectors, axis=1)[:, None]


def tensor(matrices):
    result = np.ones((1, 1), dtype=complex)
    for matrix in matrices:
        result = np.kron(result, matrix)
    return result


def rotor(axis, angle):
    return np.cos(angle) * I - 1j * np.sin(angle) * PAULI[axis]


def finite_group(matrices):
    products = matrices[:, None] @ matrices[None, :]
    distances = np.linalg.norm(products[:, :, None] - matrices, axis=(-2, -1))
    matches = distances < ATOL
    assert_array_equal(matches.sum(axis=-1), 1)
    multiply = matches.argmax(axis=-1)
    inverse = (multiply == 0).argmax(axis=-1)
    indexes = np.arange(len(matrices))
    assert_array_equal(multiply[indexes, inverse], 0)
    assert_array_equal(multiply[inverse, indexes], 0)
    assert_array_equal(multiply[:, 0], indexes)
    assert_array_equal(multiply[0, :], indexes)
    assert_array_equal(multiply[multiply[:, :, None], indexes],
                       multiply[indexes[:, None, None], multiply[None, :, :]])
    return multiply, inverse


def act(core, word, colours):
    result = np.array(colours, copy=True)
    for letter in word:
        first = abs(letter) - 1
        x = result[..., first].copy()
        y = result[..., first + 1].copy()
        if letter > 0:
            result[..., first] = core[x, y]
            result[..., first + 1] = x
        else:
            result[..., first] = y
            result[..., first + 1] = core[y, x]
    return result


def fixed(core, word, strands):
    states = np.array(list(product(range(len(core)), repeat=strands)), dtype=int)
    return states[np.all(states == act(core, word, states), axis=1)]


def power(multiply, base, exponent):
    result = 0
    for _ in range(exponent):
        result = multiply[result, base]
    return result


def generated(core, colours):
    previous = set()
    image = set(colours)
    while image != previous:
        previous = image
        image = image | {core[x, y] for x in image for y in image}
    return image


def check_core_and_braids(rng):
    quaternion_group = np.concatenate([QUATERNION, -QUATERNION])
    tetrahedral = np.concatenate([
        quaternion_group, quaternion(np.array(list(product((-0.5, 0.5), repeat=4))))
    ])
    examples = {
        "C3": (np.array([rotor(2, 2 * np.pi * k / 3) for k in range(3)]), (3, 9, 3)),
        "C5": (np.array([rotor(2, 2 * np.pi * k / 5) for k in range(5)]), (5, 5, 25)),
        "Q8": (quaternion_group, (8, 8, 8)),
        "2T": (tetrahedral, (24, 216, 24)),
    }

    for name, (matrices, expected_counts) in examples.items():
        multiply, inverse = finite_group(matrices)
        count = len(matrices)
        assert count == expected_counts[0]
        labels = np.arange(count)
        core = multiply[multiply[:, inverse], labels[:, None]]
        x, y, z = np.indices((count, count, count))
        assert_array_equal(core[labels, labels], labels)
        assert_array_equal(core[x, core[x, y]], y)
        assert_array_equal(core[x, core[y, z]], core[core[x, y], core[x, z]])
        # Conjugation of the lift (g, g^-1, swap) in the factor-swapping product.
        first_factor = multiply[multiply[labels[:, None], inverse[labels]], labels[:, None]]
        second_factor = multiply[multiply[inverse[labels][:, None], labels], inverse[labels][:, None]]
        assert_array_equal(first_factor, core)
        assert_array_equal(second_factor, inverse[core])
        assert_array_equal(multiply[labels, inverse[labels]], 0)

        central_order_two = [
            g for g in labels
            if multiply[g, g] == 0 and np.array_equal(multiply[g], multiply[:, g])
        ]
        for g in labels:
            same_action = np.flatnonzero(np.all(core == core[g, :], axis=1))
            assert set(same_action) == {multiply[g, h] for h in central_order_two}

        colours = np.stack([x, y, z], axis=-1).reshape(-1, 3)
        close(comparison(matrices[x], matrices[y]), comparison(matrices[x], matrices[core[x, y]]))
        close(comparison(matrices[y], matrices[z]), comparison(matrices[core[x, y]], matrices[core[x, z]]))
        assert_array_equal(act(core, (1, -1), colours), colours)
        assert_array_equal(act(core, (1, 2, 1), colours), act(core, (2, 1, 2), colours))

        def alternating_cut(states):
            a, b, c = states.T
            return multiply[multiply[a, inverse[b]], c]

        moved = act(core, (1, 2, -1), colours)
        assert_array_equal(alternating_cut(colours), alternating_cut(moved))
        for before, after in zip(colours[::max(1, len(colours) // 32)],
                                 moved[::max(1, len(colours) // 32)]):
            assert generated(core, before) == generated(core, after)

        actual = [len(fixed(core, (), 1))]
        for word, strands, degree in ((TREFOIL, 2, 3), (FIGURE_EIGHT, 3, 5)):
            closed = fixed(core, word, strands)
            roots = [r for r in labels if power(multiply, r, degree) == 0]
            formula = set()
            for a, r in product(labels, roots):
                first_two = (a, multiply[a, r])
                if strands == 2:
                    formula.add(first_two)
                else:
                    formula.add((*first_two, multiply[a, power(multiply, inverse[r], 2)]))
            assert formula == set(map(tuple, closed))
            actual.append(len(closed))

        closed = fixed(core, TREFOIL, 2)
        extensions = np.column_stack((closed, closed[:, -1]))
        for last in (2, -2):
            stabilized_word = (*TREFOIL, last)
            assert_array_equal(fixed(core, stabilized_word, 3), extensions)
            conjugate = fixed(core, (-1, *stabilized_word, 1), 3)
            assert set(map(tuple, conjugate)) == set(map(tuple, act(core, (1,), extensions)))
            for before, after in zip(extensions, act(core, (1,), extensions)):
                assert generated(core, before) == generated(core, after)
        assert tuple(actual) == expected_counts
        print(f"{name:>2} closed colourings (unknot, trefoil, figure-eight): {tuple(actual)}")
        if name == "C3":
            assert [len(fixed(core, (1,) * degree, 2)) for degree in (0, 1, 2, 3)] == [9, 3, 3, 9]
            assert_array_equal(core, (2 * labels[:, None] - labels) % 3)
            assert_array_equal(act(core, (1, 1), (0, 1)), (1, 2))
            original = np.array([0, 1, 1])
            moved = act(core, (1,), original)
            assert moved[0] == inverse[1]
            assert comparison(*matrices[original[-2:]]) == 1
            close(comparison(*matrices[moved[-2:]]), 0.25)
            assert alternating_cut(original[None, :])[0] == 0
            assert multiply[original[0], inverse[original[1]]] == inverse[1]

    _, qi, qj, qk = QUATERNION
    h = quaternion(np.full(4, 0.5))
    close(h @ qi @ adjoint(h), qj)
    close(h @ qj @ adjoint(h), qk)
    close(h @ qk @ adjoint(h), qi)
    close(np.linalg.matrix_power(h, 3), -I)
    rack = lambda a, b: 1 - b
    for x, y, z in product(range(2), repeat=3):
        assert rack(x, rack(y, z)) == rack(rack(x, y), rack(x, z))
    assert sum((rack(x, y), x) == (x, y) for x, y in product(range(2), repeat=2)) == 0

    for x, y, z in quaternion(sphere_samples(rng, 4, 96)).reshape(-1, 3, 2, 2):
        reflection = x @ adjoint(y) @ x
        scalar = 2 * comparison(x, y) - 1
        close(reflection, 2 * scalar * x - y)
        close(x @ adjoint(reflection) @ x, y)
        close((-x) @ adjoint(y) @ (-x), reflection)
        close(comparison(y, reflection), scalar ** 2)
        close(comparison(x @ adjoint(y) @ x, x @ adjoint(z) @ x), comparison(y, z))
        w = z
        delta = coordinates(w @ adjoint(y))
        angle = np.arctan2(np.linalg.norm(delta[1:]), delta[0]) / 2
        axis = delta[1:] / np.linalg.norm(delta[1:])
        v = quaternion(np.r_[np.cos(angle), np.sin(angle) * axis])
        close((v @ y) @ adjoint(y) @ (v @ y), w)

    for degree in (3, 5):
        for index in range(1, (degree + 1) // 2):
            angle = 2 * np.pi * index / degree
            for axis in sphere_samples(rng, 3, 12):
                r = quaternion(np.r_[np.cos(angle), np.sin(angle) * axis])
                close(np.linalg.matrix_power(r, degree), I)
                close(comparison(I, r), (1 + np.cos(angle)) / 2)
                if degree == 5:
                    colours = np.array([I, r, np.linalg.matrix_power(adjoint(r), 2)])
                    for letter in FIGURE_EIGHT:
                        i = abs(letter) - 1
                        a, b = colours[i:i + 2].copy()
                        colours[i:i + 2] = (a @ adjoint(b) @ a, a) if letter > 0 else (b, b @ adjoint(a) @ b)
                    close(colours, [I, r, np.linalg.matrix_power(adjoint(r), 2)])


def check_crossing_weights():
    core = lambda a, b: a @ adjoint(b) @ a
    f = lambda a, b: comparison(a, b) - 1
    x, y, z = I, QUATERNION[1], I
    close(core(y, z), -I)
    lhs = f(x, z) + f(core(x, y), core(x, z))
    rhs = f(y, z) + f(x, core(y, z))
    close((lhs, rhs), (-0.5, -1.5))
    close(comparison(I, I), 1)
    close(core(QUATERNION[1], I), -I)  # The square-root argument at the antipode.

    matrices = np.array([rotor(2, 2 * np.pi * k / 3) for k in range(3)])
    multiply, inverse = finite_group(matrices)
    ix = np.arange(3)
    colours = multiply[multiply[:, inverse], ix[:, None]]
    binary = np.broadcast_to(np.arange(2), (2, 2))
    def weight(a, b):
        return int(a != b)

    for x, y, z in product(range(2), repeat=3):
        assert weight(x, z) + weight(binary[x, y], binary[x, z]) == (
            weight(y, z) + weight(x, binary[y, z])
        )
    hopf = fixed(binary, (1, 1), 2)
    assert sorted(2 * int(x != y) for x, y in hopf) == [0, 0, 2, 2]
    assert len(fixed(binary, (), 2)) == 4
    for degree, records in ((3, [1, 0.25]),
                            (5, [1, (3 - np.sqrt(5)) / 8, (3 + np.sqrt(5)) / 8])):
        target = np.array([rotor(2, 2 * np.pi * k / degree) for k in range(degree)])
        multiplication, inverse = finite_group(target)
        ix = np.arange(degree)
        table = multiplication[multiplication[:, inverse], ix[:, None]]
        assert generated(table, (0, 1)) == set(ix)
        actual = np.unique(np.round(comparison(target[:, None], target), 13))
        close(actual, sorted(records))
    heights = np.array([0, 7, -2])
    for start in fixed(colours, TREFOIL, 2):
        state = start
        total = 0
        for crossing in TREFOIL:
            target = act(colours, (crossing,), state)
            total += heights[target[0]] - heights[state[1]]
            state = target
        assert total == 0


def check_blades_and_rotors(rng):
    blades = [
        tensor_matrix_product([PAULI[index] for index in range(3) if mask & (1 << index)])
        for mask in range(8)
    ]
    close(blades, [I, X, Y, 1j * Z, Z, -1j * Y, 1j * X, 1j * I])
    for left, right in product(range(8), repeat=2):
        inversions = sum(
            bool(left & (1 << high)) and bool(right & (1 << low))
            for high in range(3) for low in range(high)
        )
        close(blades[left] @ blades[right], (-1) ** inversions * blades[left ^ right])
    for mask, blade in enumerate(blades):
        grade = mask.bit_count()
        sign = (-1) ** (grade * (grade - 1) // 2)
        close(blade @ blade, sign * I)
        close(adjoint(blade), sign * blade)
        close(blades[7] @ blade, blade @ blades[7])
        close(np.linalg.det(blade), (-1) ** grade)
    close((3 * X + 4 * Y + 12 * Z) @ (3 * X + 4 * Y + 12 * Z), 169 * I)
    for matrix in (X, Y, Z):
        close(np.trace(matrix), 0)
    close(X @ Z, -Z @ X)
    for eigenvector in np.linalg.eigh(Z)[1].T:
        assert abs(np.vdot(eigenvector, X @ eigenvector)) < ATOL

    bloch_cases = [(1, np.array([0.48, 0.60, 0.64])), (0, np.zeros(3))]
    bloch_cases.extend((1, r) for r in sphere_samples(rng, 3, 12))
    bloch_cases.extend((t, r) for t, *r in rng.normal(size=(24, 4)))
    for t, r in bloch_cases:
        b = np.einsum("a,aij->ij", r, PAULI)
        matrix = (t * I + b) / 2
        close(b @ b, np.dot(r, r) * I)
        close(np.trace(matrix), t)
        close([2 * matrix[0, 1].real, -2 * matrix[0, 1].imag,
               (matrix[0, 0] - matrix[1, 1]).real], r)
        close(np.linalg.det(matrix), (t ** 2 - np.dot(r, r)) / 4)
        close(np.linalg.eigvalsh(matrix), (t + np.array([-1, 1]) * np.linalg.norm(r)) / 2)
        assert (np.linalg.eigvalsh(matrix)[0] >= -ATOL) == (t >= np.linalg.norm(r) - ATOL)
        if t == 1:
            assert np.allclose(matrix @ matrix, matrix, atol=ATOL, rtol=0) == (
                abs(np.linalg.norm(r) - 1) < ATOL
            )
    example = (I + 0.48 * X + 0.60 * Y + 0.64 * Z) / 2
    close(example, [[0.82, 0.24 - 0.30j], [0.24 + 0.30j, 0.18]])

    def reconstruct(alpha, beta, gamma):
        return rotor(2, alpha) @ rotor(1, beta) @ rotor(2, gamma)

    def angle_data(unit):
        a, b, c, d = coordinates(unit)
        z = a + 1j * d
        w = c - 1j * b
        first = np.angle(z) if abs(z) > ATOL else 0
        second = np.angle(w) if abs(w) > ATOL else 0
        return (first + second) / 2, np.arctan2(abs(w), abs(z)), (first - second) / 2

    inputs = list(quaternion(sphere_samples(rng, 4, 40)))
    inputs += [I, -I, QUATERNION[2], QUATERNION[3]]
    qr = reconstruct(*(np.array([0.37, -0.81, 0.52]) / 2))
    inputs.append(qr)
    for unit in inputs:
        alpha, beta, gamma = angle_data(unit)
        assert -ATOL <= beta <= np.pi / 2 + ATOL
        close(reconstruct(alpha, beta, gamma), unit)
        for m, n in product((-1, 0, 1), repeat=2):
            close(reconstruct(alpha + np.pi * (m + n), beta, gamma + np.pi * (m - n)), unit)
        a, b, c, d = coordinates(unit)
        close((a + 1j * d, c - 1j * b), (
            np.exp(1j * (alpha + gamma)) * np.cos(beta),
            np.exp(1j * (alpha - gamma)) * np.sin(beta),
        ))
        v, w = alpha + gamma, alpha - gamma
        assert -np.pi - ATOL <= v <= np.pi + ATOL
        assert -np.pi - ATOL <= w <= np.pi + ATOL
        first_rotation = unit @ PAULI @ adjoint(unit)
        close(first_rotation, (-unit) @ PAULI @ adjoint(-unit))
        for da, dg in ((np.pi, 0), (0, np.pi), (np.pi, np.pi)):
            second_lift = reconstruct(alpha + da, beta, gamma + dg)
            close(first_rotation, second_lift @ PAULI @ adjoint(second_lift))
        close(unit @ adjoint(unit), I)
    b = 0.4
    close(reconstruct(0.8, 0, -0.3), reconstruct(0.8 + b, 0, -0.3 - b))
    close(reconstruct(0.8, np.pi / 2, -0.3), reconstruct(0.8 + b, np.pi / 2, -0.3 + b))

    for a, b in product((0, 0.8, -2), (0, 0.5, np.pi / 2, np.pi)):
        first = rotor(2, a / 2)
        second = first @ rotor(1, b / 2)
        angular_axes = [Z, first @ Y @ adjoint(first), second @ Z @ adjoint(second)]
        jacobian = np.einsum("aij,bji->ab", PAULI, angular_axes).real / 2
        close(np.linalg.det(jacobian), -np.sin(b))
        assert np.linalg.matrix_rank(jacobian, tol=ATOL) == (2 if b in (0, np.pi) else 3)

    angle = 2 * np.pi / 3
    close(rotor(2, angle / 2) @ X @ rotor(2, -angle / 2),
          np.cos(angle) * X + np.sin(angle) * Y)
    close(coordinates(qr), [0.829592, -0.029524, -0.392911, 0.395635], tol=0.5e-6)
    adjoint_matrix = np.einsum("aij,bji->ab", PAULI, qr @ PAULI @ adjoint(qr)).real / 2
    close(adjoint_matrix, [[0.378188, -0.633230, -0.675273],
                           [0.679631, 0.685203, -0.261913],
                           [0.628550, -0.359884, 0.689498]], tol=0.5e-6)
    close(adjoint_matrix.T @ adjoint_matrix, np.eye(3))
    close(np.linalg.det(adjoint_matrix), 1)
    close(np.exp(-1j * np.pi / 8) * np.diag([1, np.exp(1j * np.pi / 4)]), rotor(2, np.pi / 8))
    close(reconstruct(0, np.pi / 4, np.pi / 2), -1j * H)
    close(H @ PAULI @ H, [Z, -Y, X])


def tensor_matrix_product(sequence):
    result = I.copy()
    for matrix in sequence:
        result = result @ matrix
    return result


def check_weyl_and_syndromes(rng):
    for dim in (2, 3, 4):
        clock = np.exp(2j * np.pi / dim)
        shift = np.roll(np.eye(dim), 1, axis=0)
        diagonal = np.diag(clock ** np.arange(dim))
        close(diagonal @ shift, clock * shift @ diagonal)
        displacements = np.array([
            [np.linalg.matrix_power(shift, a) @ np.linalg.matrix_power(diagonal, b)
             for b in range(dim)]
            for a in range(dim)
        ])
        for a, b, c, e in product(range(dim), repeat=4):
            left, right = displacements[a, b], displacements[c, e]
            exponent = b * c - e * a
            close(left @ right, clock ** (b * c) * displacements[(a + c) % dim, (b + e) % dim])
            close(adjoint(left), clock ** (a * b) * displacements[-a % dim, -b % dim])
            close(commutator(left, right), clock ** exponent * np.eye(dim))
            close(comparison(np.eye(dim), commutator(left, right)),
                  (1 + np.cos(2 * np.pi * exponent / dim)) / 2)
            close(np.trace(commutator(left, right)) / dim, clock ** exponent)
        if dim == 3:
            assert not np.isclose(clock, 1 / clock)
            close((clock.real, (1 / clock).real), (-0.5, -0.5))

    bits = list(product(range(2), repeat=2))
    one_site = np.array([np.linalg.matrix_power(X, a) @ np.linalg.matrix_power(Z, b)
                         for a, b in bits])
    n = 3
    labels = np.array(list(product(bits, repeat=n)))
    words = np.array([tensor(one_site[2 * a + b] for a, b in label) for label in labels])
    close(np.einsum("aij,bij->ab", words.conj(), words), 8 * np.eye(len(labels)))
    for left_index, (a, b) in enumerate(labels.transpose(0, 2, 1)):
        for right_index in rng.choice(len(labels), size=8, replace=False):
            c, e = labels[right_index].T
            left, right = words[left_index], words[right_index]
            phase = (-1) ** int(np.dot(b, c))
            bit = int(np.dot(b, c) + np.dot(e, a)) % 2
            output = words[np.flatnonzero(np.all(labels == (labels[left_index] ^ labels[right_index]), axis=(1, 2)))[0]]
            close(left @ right, phase * output)
            close(left @ right @ adjoint(left), (-1) ** bit * right)
            close(comparison(np.eye(8), commutator(left, right)), 1 - bit)
            site_signs = [
                2 * comparison(I, commutator(one_site[2 * aa + bb], one_site[2 * cc + ee])) - 1
                for aa, bb, cc, ee in zip(a, b, c, e)
            ]
            close((1 + np.prod(site_signs)) / 2, 1 - bit)

    tensor_quaternion = np.array([tensor(QUATERNION[k] for k in indices)
                                 for indices in product(range(4), repeat=n)])
    signed_words = np.concatenate([tensor_quaternion, -tensor_quaternion])
    assert len(np.unique(signed_words.reshape(len(signed_words), -1), axis=0)) == 2 ** (2 * n + 1)
    for a, b, c in product(range(4), repeat=3):
        xa, za = bits[a]
        xb, zb = bits[b]
        xc, zc = bits[c]
        assert (za * xb + (za ^ zb) * xc) % 2 == (zb * xc + za * (xb ^ xc)) % 2
    close(commutator(QUATERNION[1], QUATERNION[2]), -I)
    close(commutator(QUATERNION[1], I), I)

    identity = np.eye(8)
    embedding = identity[:, [0, 7]]
    x_sites = [tensor(X if j == k else I for j in range(n)) for k in range(n)]
    z_sites = [tensor(Z if j == k else I for j in range(n)) for k in range(n)]
    checks = (z_sites[0] @ z_sites[1], z_sites[1] @ z_sites[2])
    expected = ((1, 1), (-1, 1), (-1, -1), (1, -1))
    projectors = []
    isometries = []
    for error, signs in zip([identity, *x_sites], expected):
        image = error @ embedding
        isometries.append(image)
        p = identity
        for check, sign in zip(checks, signs):
            p = p @ ((identity + sign * check) / 2)
            close(check @ image, sign * image)
            close(comparison(check, error @ check @ adjoint(error)), (1 + sign) / 2)
        projectors.append(p)
        close(p @ p, p)
        close(np.trace(p), 2)
        close(image @ adjoint(image), p)
    close(sum(projectors), identity)
    for i, j in product(range(4), repeat=2):
        close(adjoint(isometries[i]) @ isometries[j], int(i == j) * I)
        close(projectors[i] @ projectors[j], int(i == j) * projectors[i])

    flipped_embedding = tensor([H] * n) @ embedding
    phase_checks = (x_sites[0] @ x_sites[1], x_sites[1] @ x_sites[2])
    for error, signs in zip([identity, *z_sites], expected):
        for check, sign in zip(phase_checks, signs):
            close(check @ error @ flipped_embedding, sign * error @ flipped_embedding)
    close(tensor([X] * n) @ embedding, embedding @ X)
    close(z_sites[0] @ embedding, embedding @ Z)
    close((x_sites[0] @ x_sites[1]) @ embedding, x_sites[2] @ embedding @ X)
    psi = embedding @ np.sqrt([0.3, 0.7])
    ghz = embedding @ (np.ones(2) / np.sqrt(2))
    for retained in range(3):
        for vector, desired in ((psi, np.diag([0.3, 0.7])), (ghz, I / 2)):
            amplitudes = np.moveaxis(vector.reshape(2, 2, 2), retained, 0).reshape(2, 4)
            close(amplitudes @ adjoint(amplitudes), desired)

    phase = np.diag([1, 1j])
    four = np.eye(4, dtype=complex)
    cnot = four[:, [0, 1, 3, 2]]
    two_words = np.array([tensor(pair) for pair in product(one_site, repeat=2)])
    for clifford in [tensor([H, I]), tensor([phase, I]), cnot]:
        conjugates = clifford @ two_words @ adjoint(clifford)
        trace_coefficients = np.einsum("aij,bij->ab", two_words.conj(), conjugates) / 4
        close(np.abs(trace_coefficients).max(axis=0), 1)
        assert np.all((np.abs(trace_coefficients) > 0.99).sum(axis=0) == 1)
        original_signs = commutator(two_words[:, None], two_words[None, :])
        close(commutator(conjugates[:, None], conjugates[None, :]), original_signs)
    return np.array(isometries)


def check_recovery(rng, isometries):
    def complex_matrix(shape):
        return rng.normal(size=shape) + 1j * rng.normal(size=shape)

    def channel(kraus, matrix):
        return sum(operator @ matrix @ adjoint(operator) for operator in kraus)

    for m in (np.diag([0.5, 0.25, 0.125, 0.125]), complex_matrix((4, 4))):
        logical = complex_matrix((2, 2))
        encoded = sum(m[j, k] * isometries[j] @ logical @ adjoint(isometries[k])
                      for j, k in product(range(4), repeat=2))
        close(channel(adjoint(isometries), encoded), np.trace(m) * logical)
    contiguous = np.eye(5, dtype=complex)
    orthogonal = np.array([contiguous[:, :2], contiguous[:, 2:4]])
    recovery = [*adjoint(orthogonal), np.outer([1, 0], contiguous[4])]
    close(sum(adjoint(operator) @ operator for operator in recovery), contiguous)
    assert np.trace(sum(v @ adjoint(v) for v in orthogonal)) == 4
    unitary = np.linalg.qr(complex_matrix((3, 3)))[0]
    weighted_errors = np.array([np.sqrt(0.2) * orthogonal[0], np.sqrt(0.8) * orthogonal[1],
                                np.zeros((5, 2))])
    mixed_errors = np.einsum("ab,aij->bij", unitary, weighted_errors)
    close(sum(adjoint(error) @ error for error in mixed_errors), I)
    gram = np.array([[np.trace(adjoint(e) @ f) / 2 for f in mixed_errors] for e in mixed_errors])
    close(np.linalg.eigvalsh(gram), [0, 0.2, 0.8])
    close(adjoint(mixed_errors[:, None]) @ mixed_errors[None, :], gram[:, :, None, None] * I)
    for logical in (X, Z, complex_matrix((2, 2))):
        encoded = channel(mixed_errors, logical)
        close(encoded, channel(weighted_errors, logical))
        close(channel(recovery, encoded), logical)


def check_fermions():
    a = np.array([[0, 1], [0, 0]], dtype=complex)

    def annihilation(n, j):
        return tensor([Z] * j + [a] + [I] * (n - j - 1))

    for n in (2, 3, 4):
        fermions = [annihilation(n, j) for j in range(n)]
        for j, k in product(range(n), repeat=2):
            u, v = fermions[j], fermions[k]
            close(u @ v + v @ u, 0)
            close(u @ adjoint(v) + adjoint(v) @ u, int(j == k) * np.eye(2 ** n))
        for j in range(n - 1):
            close(adjoint(fermions[j]) @ fermions[j + 1],
                  tensor([I] * j + [adjoint(a), a] + [I] * (n - j - 2)))
    plain0, plain1 = np.kron(a, I), np.kron(I, a)
    close(plain0 @ plain1 + plain1 @ plain0, 2 * np.kron(a, a))
    assert np.linalg.norm(2 * np.kron(a, a)) > 0
    first, second = (adjoint(annihilation(2, j)) for j in range(2))
    vacuum, full = np.eye(4)[:, [0, 3]].T
    close(first @ second @ vacuum, full)
    close(second @ first @ vacuum, -full)
    close(adjoint(annihilation(3, 0)) @ annihilation(3, 2), tensor([adjoint(a), Z, a]))


def check_copying(rng):
    for z in np.linspace(0, 1, 101):
        gap = z - z * z
        assert 0 <= gap <= 0.25
        close(gap, 0.25 - (z - 0.5) ** 2)
    overlap = 1 / np.sqrt(2)
    close(overlap - overlap ** 2, 1 / np.sqrt(2) - 0.5)
    ket0, ket1 = np.eye(2)
    eta = np.kron(ket0, ket1) - np.kron(ket1, ket0)

    def copying_map(psi):
        exchange = np.kron(psi, eta).reshape(2, 2, 2)
        return (exchange + exchange.swapaxes(0, 1)).ravel() / np.sqrt(6)

    isometry = np.column_stack([copying_map(ket0), copying_map(ket1)])
    close(adjoint(isometry) @ isometry, I)
    for vector in sphere_samples(rng, 4, 32):
        psi = vector[:2] + 1j * vector[2:]
        orthogonal = np.array([-psi[1].conj(), psi[0].conj()])
        p = np.outer(psi, psi.conj())
        q = np.outer(orthogonal, orthogonal.conj())
        close(np.vdot(psi, orthogonal), 0)
        close(p + q, I)
        output = isometry @ psi
        mixed_pair = np.kron(psi, orthogonal) + np.kron(orthogonal, psi)
        alternate = (np.sqrt(2 / 3) * np.kron(np.kron(psi, psi), orthogonal)
                     - np.kron(mixed_pair, psi) / np.sqrt(6))
        close(output, alternate)
        input_bloch = np.einsum("aij,ji->a", PAULI, p).real
        for retained, contraction in enumerate([2 / 3, 2 / 3, -1 / 3]):
            amplitudes = np.moveaxis(output.reshape(2, 2, 2), retained, 0).reshape(2, 4)
            marginal = amplitudes @ adjoint(amplitudes)
            aligned = 5 / 6 if retained < 2 else 1 / 3
            close(marginal, aligned * p + (1 - aligned) * q)
            close(np.vdot(psi, marginal @ psi), aligned)
            close(np.einsum("aij,ji->a", PAULI, marginal), contraction * input_bloch)
            spectrum = np.linalg.eigvalsh(marginal)
            close(spectrum, sorted([aligned, 1 - aligned]))
            entropy = -sum(spectrum * np.log2(spectrum))
            if retained == 2:
                close(np.linalg.det(marginal), 2 / 9)
                close(entropy, np.log2(3) - 2 / 3)
            else:
                close(entropy, -(np.log2(1 / 6) + 5 * np.log2(5 / 6)) / 6)

    eigenstates = np.concatenate([np.linalg.eigh(axis)[1].T for axis in PAULI])

    def random_matrix(rows, columns):
        shape = (rows, columns)
        return rng.normal(size=shape) + 1j * rng.normal(size=shape)

    for _ in range(24):
        l_matrix = random_matrix(2, 2)
        close(sum(abs(np.vdot(psi, l_matrix @ psi)) ** 2 for psi in eigenstates),
              abs(np.trace(l_matrix)) ** 2 + np.linalg.norm(l_matrix) ** 2)
        kraus = np.linalg.qr(random_matrix(12, 2))[0].reshape(3, 4, 2)
        fidelities = np.zeros((6, 2))
        remainder = 0
        for k in kraus:
            a, b, c, d, e, f, g, h = k.ravel()
            q = (abs(a - d - f) ** 2 + abs(d - f) ** 2 + 3 * abs(b) ** 2 +
                 3 * abs(g) ** 2 + 2 * abs(c - h / 2) ** 2 + 2 * abs(e - h / 2) ** 2)
            remainder += q
            close(q, 3 * np.linalg.norm(k) ** 2 - sum(abs(t) ** 2
                                                     for t in (a + f, c + h, a + d, e + h)))
            for index, psi in enumerate(eigenstates):
                amplitudes = (k @ psi).reshape(2, 2)
                fidelities[index] += [np.linalg.norm(psi.conj() @ amplitudes) ** 2,
                                      np.linalg.norm(amplitudes @ psi.conj()) ** 2]
        close(np.linalg.norm(kraus) ** 2, 2)
        close(fidelities.sum(), 10 - remainder)
        assert fidelities.mean() <= 5 / 6 + ATOL
        assert fidelities.min() <= 5 / 6 + ATOL


def main():
    rng = np.random.default_rng(731)
    check_core_and_braids(rng)
    check_crossing_weights()
    check_blades_and_rotors(rng)
    isometries = check_weyl_and_syndromes(rng)
    check_recovery(rng, isometries)
    check_fermions()
    check_copying(rng)
    print("PASS: core and braid transport, crossing weights, Clifford and Euler identities,")
    print("      Weyl phases, syndromes and recovery, fermionic signs, copying and the six-state bound.")


if __name__ == "__main__":
    main()
