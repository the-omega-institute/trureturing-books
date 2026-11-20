"""Numerical checks for RESULT.md. Run with python3 check.py."""

import numpy as np


TOL = 2e-10
RNG = np.random.default_rng(1947)


def close(actual, expected):
    np.testing.assert_allclose(actual, expected, rtol=0, atol=TOL)


def random_complex(shape):
    return RNG.normal(size=shape) + 1j * RNG.normal(size=shape)


def unit(vector):
    return vector / np.linalg.norm(vector)


def basis(dimension):
    return np.linalg.qr(random_complex((dimension, dimension)))[0]


def reflect(axis, vector):
    return 2 * np.vdot(axis, vector).real * axis - vector


def weight(left, right):
    return abs(np.vdot(left, right)) ** 2


def rotation(source, target, angle):
    """Rotation on a real coordinate plane, sending source toward target."""
    matrix = np.eye(len(source)) + (np.cos(angle) - 1) * (
        np.outer(source, source) + np.outer(target, target)
    )
    return matrix + np.sin(angle) * (
        np.outer(target, source) - np.outer(source, target)
    )


def check_real_classification():
    x, v, other, extra = np.eye(4)
    sample = unit(RNG.normal(size=4))
    for angle in (0, np.pi / 2, np.pi, -0.4, np.pi / np.sqrt(2)):
        axis = np.cos(angle) * x + np.sin(angle) * v
        close(reflect(axis, axis), axis)
        close(reflect(axis, other), -other)
        close(reflect(axis, reflect(axis, sample)), sample)
        close(np.linalg.norm(reflect(axis, sample)), 1)
        close(
            reflect(axis, reflect(x, sample)),
            rotation(x, v, 2 * angle) @ sample,
        )

    target = -0.73
    errors = []
    for step in (0.1, 0.01, 0.001, 0.00001):
        direction = np.cos(step) * v + np.sin(step) * other
        axis = np.cos(step) * x + np.sin(step) * direction
        turn = (2 * np.outer(axis, axis) - np.eye(4)) @ (
            2 * np.outer(x, x) - np.eye(4)
        )
        exponent = int(np.rint(target / (2 * step)))
        assert abs(2 * exponent * step - target) <= step + TOL
        approximate = np.linalg.matrix_power(turn, exponent) @ x
        close(
            approximate,
            np.cos(2 * exponent * step) * x
            + np.sin(2 * exponent * step) * direction,
        )
        errors.append(
            np.linalg.norm(approximate - np.cos(target) * x - np.sin(target) * v)
        )
    assert errors[-1] < 2e-5 and errors[-1] < errors[0] / 1000

    # A full circle and a point with nonzero projection into its plane.
    outside = (v + other) / np.sqrt(2)
    mixed = unit(2 * x - outside)
    for offset in (0.01, 0.001, 0.000001):
        nearby = np.cos(offset) * x + np.sin(offset) * v
        cosine = nearby @ outside
        tangent = unit(outside - cosine * nearby)
        chord = unit(2 * nearby - outside)
        coordinate_angle = np.arctan2(tangent @ chord, nearby @ chord)
        close(
            reflect(
                np.cos(coordinate_angle / 2) * nearby
                + np.sin(coordinate_angle / 2) * tangent,
                nearby,
            ),
            chord,
        )
    assert np.linalg.norm(chord - mixed) < 2e-6

    for count in (3, 4, 5, 6, 9):
        radians = 2 * np.pi * np.arange(count) / count
        polygon = np.stack((np.cos(radians), np.sin(radians)), axis=1)
        for i, axis in enumerate(polygon):
            hyperplane = np.eye(2) - 2 * np.outer(axis, axis)
            close(np.linalg.det(hyperplane), -1)
            for j, vector in enumerate(polygon):
                expected = polygon[(2 * i - j) % count]
                close(reflect(axis, vector), expected)
                close(np.linalg.det(hyperplane) * hyperplane @ vector, expected)
        assert min(np.linalg.norm(polygon - [np.cos(np.pi / count),
                                             np.sin(np.pi / count)], axis=1)) > 0.1

    close(reflect(x, x), x)
    close(reflect(x, -x), -x)
    axes = np.concatenate((np.eye(8), -np.eye(8)))
    for axis in axes:
        for vector in axes:
            assert any(np.array_equal(point, reflect(axis, vector)) for point in axes)
    close(reflect(x, other), -other)  # A singleton residual would fail here.
    close(reflect(other, extra), -extra)
    close(reflect(other, x), -x)


def check_clock_and_weights():
    for host_dimension in (2, 4, 8):
        host_basis = basis(host_dimension)
        for dimension in range(1, host_dimension + 1):
            embedding = host_basis[:, :dimension]
            complement = host_basis[:, dimension:]
            coordinates = unit(random_complex(dimension))
            u = embedding @ coordinates
            v = embedding @ unit(random_complex(dimension))
            close(-u, 1j * (1j * u))
            close(np.vdot(u, v), np.vdot(u, v).real + 1j * np.vdot(1j * u, v).real)
            angle = 0.72
            phase = np.exp(1j * angle)
            close(phase * u, np.cos(angle) * u + np.sin(angle) * 1j * u)
            reflected = reflect(u, v)
            close(np.linalg.norm(reflected), 1)
            close(complement.conj().T @ reflected, 0)
            close(complement.conj().T @ (phase * u), 0)
            overlap = np.vdot(u, v)
            close(
                reflect(u, reflect(1j * u, v)),
                v - 2 * overlap * u,
            )
            for outside in complement.T:
                close(reflect(u, reflect(1j * u, outside)), outside)

            pairs = [(u, v), (u, u)]
            if complement.shape[1]:
                pairs.append((u, complement[:, 0]))
            for left, right in pairs:
                overlap = np.vdot(left, right)
                phases = np.exp(2j * np.pi * np.arange(32) / 32)
                real_correlations = np.real(phases.conj() * overlap)
                sampled = [
                    (1 + np.vdot(right, reflect(phase * left, right)).real) / 2
                    for phase in phases
                ]
                close(sampled, real_correlations ** 2)
                close(2 * np.mean(sampled), abs(overlap) ** 2)
                best_phase = np.exp(1j * np.angle(overlap))
                close(np.vdot(best_phase * left, right).real, abs(overlap))
                close(
                    (1 + np.vdot(right, reflect(best_phase * left, right)).real) / 2,
                    weight(left, right),
                )
                close(weight(phase * left, phase.conjugate() * right), weight(left, right))

            test_weights = abs(host_basis.conj().T @ u) ** 2
            close(test_weights[:dimension], abs(coordinates) ** 2)
            close(test_weights[dimension:], 0)
            close(test_weights.sum(), 1)
            block = embedding[:, ::2]
            close(test_weights[:dimension:2].sum(), np.linalg.norm(block.conj().T @ u) ** 2)
            close(np.trace(embedding @ embedding.conj().T), dimension)
            assert np.count_nonzero(abs(embedding.conj().T @ embedding[:, 0]) < TOL) == (
                dimension - 1
            )

    # Two orthogonal complex circles are closed under both operations and omit mixtures.
    e, f = np.eye(2, dtype=complex)
    for phase in np.exp(2j * np.pi * np.arange(7) / 7):
        u, v = phase * e, (1j * phase) * f
        close(reflect(u, v), -v)
        close(reflect(u, 1j * u), -1j * u)
        close(abs(np.vdot(unit(u + v), u)) ** 2, 0.5)
        close(abs(np.vdot(unit(u + v), v)) ** 2, 0.5)
    probabilities = np.linspace(0, 1, 101)
    alternative = 3 * probabilities ** 2 - 2 * probabilities ** 3
    close(alternative + alternative[::-1], 1)
    assert np.all((0 <= alternative) & (alternative <= 1))
    assert np.count_nonzero(alternative == 0) == 1
    assert abs(alternative[25] - 0.25) > 0.09
    a, b = 0.27, 0.14
    for probabilities in ([a, b, 1 - a - b], [a + b, 0, 1 - a - b]):
        state = np.sqrt(probabilities)
        sampled = np.array([weight(state, axis) for axis in np.eye(3)])
        close(sampled, probabilities)
        close(sampled.sum(), 1)
        close(sum(3 * sampled ** 2 - 2 * sampled ** 3), 1 - 6 * np.prod(sampled))


def adjacent_permutations(count):
    identity = tuple(range(count))
    permutations = [identity]
    seen = {identity}
    for permutation in permutations:
        for index in range(count - 1):
            swapped = list(permutation)
            swapped[index:index + 2] = swapped[index:index + 2][::-1]
            candidate = tuple(swapped)
            if candidate not in seen:
                seen.add(candidate)
                permutations.append(candidate)
    return permutations


def tensor_power(matrix, count):
    result = np.ones((1, 1))
    for _ in range(count):
        result = np.kron(result, matrix)
    return result


def collective_operator(single_slot, count):
    result = np.zeros((2 ** count, 2 ** count), dtype=single_slot.dtype)
    for slot in range(count):
        result += np.kron(np.kron(np.eye(2 ** slot), single_slot),
                          np.eye(2 ** (count - slot - 1)))
    return result


def check_exchange_and_spin():
    for count in range(1, 5):
        dimension = 2 ** count
        indices = np.arange(dimension)
        places = 2 ** np.arange(count - 1, -1, -1)
        bits = (indices[:, None] // places) % 2
        permutations = adjacent_permutations(count)
        assert len(permutations) == int(np.prod(np.arange(1, count + 1)))
        maps = {p: bits[:, np.argsort(p)] @ places for p in permutations}
        assert len({tuple(mapping[places]) for mapping in maps.values()}) == len(maps)
        for p, first in maps.items():
            for q, second in maps.items():
                np.testing.assert_array_equal(first[second], maps[tuple(p[i] for i in q)])

        identity = np.eye(dimension)
        matrices = [identity[:, mapping] for mapping in maps.values()]
        weights = bits.sum(axis=1)
        dicke = np.column_stack([unit((weights == k).astype(float))
                                 for k in range(count + 1)])
        projector = np.mean(matrices, axis=0)
        close(dicke.T @ dicke, np.eye(count + 1))
        close(projector.T, projector)
        close(projector @ projector, projector)
        close(projector, dicke @ dicke.T)
        assert np.linalg.matrix_rank(projector, tol=TOL) == count + 1

        g = basis(2)
        g[:, 0] /= np.linalg.det(g)
        close(np.linalg.det(g), 1)
        collective = tensor_power(g, count)
        u = dicke @ unit(random_complex(count + 1))
        v = dicke @ unit(random_complex(count + 1))
        for exchange in matrices:
            close(exchange @ collective, collective @ exchange)
            close(exchange @ dicke, dicke)
            close(exchange @ reflect(u, v), reflect(u, v))
            close(exchange @ (1j * u), 1j * u)

        for index in range(count - 1):
            transposition = list(range(count))
            transposition[index:index + 2] = transposition[index:index + 2][::-1]
            exchange = identity[:, maps[tuple(transposition)]]
            eigenvalues, eigenvectors = np.linalg.eigh(exchange)
            exchange_at_pi_2 = (
                eigenvectors * np.exp(-1j * np.pi * eigenvalues / 2)
            ) @ eigenvectors.T
            close(1j * exchange_at_pi_2, exchange)
            assert np.linalg.norm(exchange @ identity[:, places[index]]
                                  - identity[:, places[index]]) > 1

        z = collective_operator(np.diag([0.5, -0.5]), count)
        lowering = collective_operator(np.array([[0., 0.], [1., 0.]]), count)
        close(z @ dicke, dicke * (count / 2 - np.arange(count + 1)))
        close(lowering @ dicke[:, -1], 0)
        close(lowering.T @ dicke[:, 0], 0)
        k = np.arange(count)
        factors = np.sqrt((k + 1) * (count - k))
        close(lowering @ dicke[:, :-1], dicke[:, 1:] * factors)
        close(lowering.T @ dicke[:, 1:], dicke[:, :-1] * factors)
        coherent = collective @ dicke[:, 0]
        close(coherent[[0, -1]], g[:, 0] ** count)
        assert np.linalg.norm(coherent[[0, -1]]) > 0

        if count == 2:
            e00, e01, e10, e11 = identity.T
            close(dicke, np.column_stack((e00, (e01 + e10) / np.sqrt(2), e11)))
            singlet = (e01 - e10) / np.sqrt(2)
            exchange = matrices[1]
            close(exchange @ singlet, -singlet)
            close(weight(singlet, exchange @ singlet), 1)
            close(projector @ singlet, 0)
            close(projector @ e01, (e01 + e10) / 2)
            close(np.linalg.norm(projector @ e01) ** 2, 0.5)
            close(unit(projector @ e01), dicke[:, 1])
            close(weight(dicke[:, 0], dicke[:, 1]), 0)
            close(weight(dicke[:, 0], dicke[:, 2]), 0)
            qutrit = dicke
    return qutrit


def check_composites(qutrit):
    for left, right in (
        (qutrit, qutrit),
        (qutrit, basis(2)),
        (qutrit[:, :1], qutrit),
        (qutrit[:, :1], qutrit[:, :1]),
    ):
        embedded = np.kron(left, right)
        dimensions = left.shape[1], right.shape[1]
        dimension = int(np.prod(dimensions))
        close(embedded.conj().T @ embedded, np.eye(dimension))
        projector = embedded @ embedded.conj().T
        close(projector, np.kron(left @ left.conj().T, right @ right.conj().T))

        u1, v1, w1 = [left @ unit(random_complex(dimensions[0])) for _ in range(3)]
        u2, v2 = [right @ unit(random_complex(dimensions[1])) for _ in range(2)]
        u, v = np.kron(u1, u2), np.kron(v1, v2)
        close(np.vdot(u, v), np.vdot(u1, v1) * np.vdot(u2, v2))
        close(weight(u, v), weight(u1, v1) * weight(u2, v2))
        close(abs(np.vdot(u, v)), abs(np.vdot(u1, v1)) * abs(np.vdot(u2, v2)))
        triple = (u1, v1, w1)
        product_triple = tuple(np.kron(vector, u2) for vector in triple)
        for i in range(3):
            close(np.vdot(product_triple[i], product_triple[(i + 1) % 3]),
                  np.vdot(triple[i], triple[(i + 1) % 3]))
        theta, phi = RNG.uniform(-np.pi, np.pi, 2)
        close(np.kron(np.exp(1j * theta) * u1, np.exp(1j * phi) * u2),
              np.exp(1j * (theta + phi)) * u)
        close(np.kron(np.exp(1j * theta) * u1, np.exp(-1j * theta) * u2), u)
        close(np.kron(1j * u1, u2), np.kron(u1, 1j * u2))
        close(np.kron(1j * u1, u2), 1j * u)
        close(projector @ reflect(u, v), reflect(u, v))

        state = embedded @ unit(random_complex(dimension))
        close(np.linalg.norm(embedded.conj().T @ state) ** 2, 1)
        close(np.linalg.norm(projector @ state - state), 0)
        if dimensions[1] == 2:
            close(sum(weight(u, np.kron(v1, a)) for a in right.T), weight(u1, v1))

    embed = np.kron(qutrit, qutrit)
    block_projector = embed @ embed.conj().T
    indices = np.arange(16)
    bits = (indices[:, None] // np.array([8, 4, 2, 1])) % 2
    four_weights = bits.sum(axis=1)
    fully_symmetric = np.column_stack(
        [unit((four_weights == k).astype(float)) for k in range(5)]
    )
    cross_exchange = np.eye(16)[:, bits[:, [0, 2, 1, 3]] @ [8, 4, 2, 1]]
    close(block_projector @ fully_symmetric, fully_symmetric)
    close(cross_exchange @ fully_symmetric, fully_symmetric)
    assert np.linalg.matrix_rank(block_projector, tol=TOL) == 9
    assert np.linalg.matrix_rank(fully_symmetric, tol=TOL) == 5
    product = np.eye(16)[:, 3]  # |00> on the first pair and |11> on the second.
    close(block_projector @ product, product)
    assert np.linalg.norm((np.eye(16) - block_projector) @ cross_exchange @ product) > 0.8

    # Connect opposite corners of two triplet bases by an edge-plane quarter turn.
    a, b, c = np.eye(9)[[0, 1, 4]]
    angle = np.pi / 4
    quarter = rotation(b, a, np.pi / 2)
    edge = rotation(b, c, angle)
    for source, target, turn in ((b, a, np.pi / 2), (b, c, angle)):
        axis = np.cos(turn / 2) * source + np.sin(turn / 2) * target
        assert np.linalg.matrix_rank(axis.reshape(3, 3), tol=TOL) == 1
        for coordinate in np.eye(9):
            close(reflect(axis, reflect(source, coordinate)),
                  rotation(source, target, turn) @ coordinate)
    generated = quarter @ edge @ quarter.T @ a
    close(generated, (a + c) / np.sqrt(2))
    assert np.linalg.matrix_rank(generated.reshape(3, 3), tol=TOL) == 2
    close(np.linalg.norm(embed @ generated), 1)


def check_instruments(qutrit):
    # Three Kraus operators and a padded zero on a four-dimensional ancilla.
    raw = random_complex((12, 3))
    raw[-3:] = 0
    isometry = np.linalg.qr(raw)[0]
    kraus = isometry.reshape(4, 3, 3)
    complete = sum(operator.conj().T @ operator for operator in kraus)
    close(complete, np.eye(3))

    ancilla = basis(4)
    seed_columns = np.kron(np.eye(3), ancilla[:, :1])
    target_columns = sum(np.kron(operator, ancilla[:, j:j + 1])
                         for j, operator in enumerate(kraus))
    close(target_columns.conj().T @ target_columns, np.eye(3))
    _, _, seed_vh = np.linalg.svd(seed_columns.conj().T, full_matrices=True)
    _, _, target_vh = np.linalg.svd(target_columns.conj().T, full_matrices=True)
    domain = np.column_stack((seed_columns, seed_vh.conj().T[:, 3:]))
    image = np.column_stack((target_columns, target_vh.conj().T[:, 3:]))
    extension = image @ domain.conj().T
    embed = np.kron(qutrit, np.eye(4))
    host = embed @ extension @ embed.conj().T + np.eye(16) - embed @ embed.conj().T
    close(host.conj().T @ host, np.eye(16))
    close(host @ embed @ seed_columns, embed @ target_columns)

    psi, other = (unit(random_complex(3)) for _ in range(2))
    output = host @ embed @ seed_columns @ psi
    test = qutrit @ basis(3)
    outcome_weights = []
    for j, a in enumerate(ancilla.T):
        branch = output.reshape(4, 4) @ a.conj()
        close(branch, qutrit @ kraus[j] @ psi)
        probability = np.linalg.norm(branch) ** 2
        close(probability, np.vdot(psi, kraus[j].conj().T @ kraus[j] @ psi))
        joint = np.array([weight(np.kron(f, a), output) for f in test.T])
        close(joint.sum(), probability)
        if j < 3:
            assert probability > TOL
            close(joint / probability, abs(test.conj().T @ unit(branch)) ** 2)
        else:
            close(probability, 0)
        outcome_weights.append(probability)
    close(sum(outcome_weights), 1)
    block_effect = sum(operator.conj().T @ operator for operator in kraus[:2])
    close(sum(np.vdot(operator @ psi, operator @ other) for operator in kraus[:2]),
          np.vdot(psi, block_effect @ other))
    close(sum(outcome_weights[:2]), np.vdot(psi, block_effect @ psi))

    entangled = unit(random_complex(6))
    density = np.outer(entangled, entangled.conj())
    lifted = [np.kron(operator, np.eye(2)) for operator in kraus[:2]]
    reduced = sum(operator @ density @ operator.conj().T for operator in lifted)
    close(reduced, reduced.conj().T)
    assert min(np.linalg.eigvalsh(reduced)) > -TOL
    eigenvalues, eigenvectors = np.linalg.eigh(block_effect)
    close((eigenvectors * eigenvalues) @ eigenvectors.conj().T, block_effect)
    assert min(eigenvalues) >= -TOL and max(eigenvalues) <= 1 + TOL
    root = (eigenvectors * np.sqrt(np.clip(eigenvalues, 0, 1))) @ eigenvectors.conj().T
    complement = (eigenvectors * np.sqrt(np.clip(1 - eigenvalues, 0, 1))) @ (
        eigenvectors.conj().T
    )
    close(root.conj().T @ root, block_effect)
    close(root.conj().T @ root + complement.conj().T @ complement, np.eye(3))


def main():
    check_real_classification()
    print("PASS real reflections, circle limits, and discrete examples")
    check_clock_and_weights()
    print("PASS clock, Born weights, [N], binarity, and complex reflections")
    qutrit = check_exchange_and_spin()
    print("PASS exchanges and spin for N=1..4, including the triplet qutrit")
    check_composites(qutrit)
    print("PASS restricted products, block exchanges, entangled round trip, and one clock")
    check_instruments(qutrit)
    print("PASS embedded qutrit effects, Kraus dilation, and conditioning")


if __name__ == "__main__":
    main()
