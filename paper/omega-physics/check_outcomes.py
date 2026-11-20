#!/usr/bin/env python3
"""Finite regression checks for Section sec:outcomes (vendored from module n3)."""

import numpy as np
from numpy.testing import assert_allclose, assert_array_equal


def close(actual, expected, *, atol=2e-12):
    assert_allclose(actual, expected, atol=atol, rtol=0)


def density(rng, dimension):
    factor = rng.normal(size=(dimension, dimension))
    factor = factor + 1j * rng.normal(size=factor.shape)
    state = factor @ factor.conj().T
    return state / np.trace(state)


def check_records(rng):
    rho = density(rng, 3)
    identity = np.eye(3)
    projections = np.array([np.diag([1, 1, 0]), np.diag([0, 0, 1])])
    blocks = projections @ rho @ projections
    weights = np.trace(blocks, axis1=1, axis2=2)
    close(weights, [np.trace(projection @ rho) for projection in projections])
    close(weights.sum(), 1)
    assert np.all(weights.real > 0)
    conditional = blocks / weights[:, None, None]
    close(np.trace(conditional, axis1=1, axis2=2), [1, 1])
    assert np.all(np.linalg.eigvalsh(conditional) > -1e-14)
    close(np.einsum("i,ijk->jk", weights, conditional), blocks.sum(axis=0))
    close(projections @ blocks.sum(axis=0) @ projections, blocks)
    close(projections[0] @ blocks.sum(axis=0) @ projections[1], np.zeros((3, 3)))
    assert np.linalg.norm(projections[0] @ rho @ projections[1]) > 0
    isometry = sum(np.kron(projection, record[:, None])
                   for projection, record in zip(projections, np.eye(2)))
    close(isometry.conj().T @ isometry, identity)
    joint = (isometry @ rho @ isometry.conj().T).reshape(3, 2, 3, 2)
    close(np.trace(joint, axis1=1, axis2=3), blocks.sum(axis=0))
    close(projections @ identity @ projections, projections)

    with_zero_weight = projections[1].astype(complex)
    close(projections[0] @ with_zero_weight @ projections[0], np.zeros((3, 3)))
    diag = np.diag([0.75, 0.25])
    close(np.diag(np.diag(diag)), diag)
    starting_set = frozenset(range(5))
    traces = [[starting_set], [starting_set]]
    for _ in range(5):
        traces[0].append(traces[0][-1])
        current = traces[1][-1]
        traces[1].append(current - {max(current)} if len(current) > 1 else current)
    assert all(item == starting_set for item in traces[0])
    assert [len(item) for item in traces[1]] == [5, 4, 3, 2, 1, 1]

    # Fresh environmental records yield powers of the complex overlap.
    psi = np.array([np.sqrt(0.75), 1j*np.sqrt(0.25)])
    pure = np.outer(psi, psi.conj())
    env0 = np.array([1., 0.])
    env1 = np.array([0.8j, 0.6])
    overlap = np.vdot(env1, env0)
    pinched = np.diag(pure.diagonal())
    tensor0, tensor1 = np.ones(1), np.ones(1)
    for repeats in range(1, 7):
        tensor0 = np.kron(tensor0, env0)
        tensor1 = np.kron(tensor1, env1)
        enlarged = np.stack([psi[0]*tensor0, psi[1]*tensor1])
        reduced = enlarged @ enlarged.conj().T
        close(reduced.diagonal(), pure.diagonal())
        close(reduced[0, 1], pure[0, 1] * overlap**repeats)
        close(np.linalg.norm(reduced-pinched),
              abs(overlap)**repeats * np.linalg.norm(pure-pinched))

    # A local CPTP channel with a degenerate record face.
    mixing = np.array([[0, 1, 0], [1, 0, 0], [0, 0, 1]])
    self_dual_channel = lambda x: (x + mixing @ x @ mixing.T) / 2
    close(self_dual_channel(projections), projections)
    close(np.trace(projections @ self_dual_channel(rho), axis1=1, axis2=2), weights)

    # Steering in the eigenbasis of the local reduced state.
    sigma0, sigma1 = density(rng, 3), density(rng, 3)
    average = (sigma0 + sigma1) / 2
    eigvals, eigvecs = np.linalg.eigh(average)
    purification = np.diag(np.sqrt(eigvals)).ravel()
    effects = []
    for component in (sigma0 / 2, sigma1 / 2):
        unnormalized = eigvecs.conj().T @ component @ eigvecs
        inverse = np.diag(eigvals**-0.5)
        effect = (inverse @ unnormalized @ inverse).T
        effects.append(effect)
        assert np.all(np.linalg.eigvalsh(effect) >= -1e-14)
        joint_density = np.outer(purification, purification)
        weighted = joint_density @ np.kron(identity, effect)
        close(np.trace(weighted.reshape(3, 3, 3, 3), axis1=1, axis2=3), unnormalized)
    close(sum(effects), identity)
    bipartite = density(rng, 6)
    acted = np.kron(mixing, np.eye(2))
    result = (bipartite + acted @ bipartite @ acted.T) / 2
    close(np.trace(result.reshape(3, 2, 3, 2), axis1=0, axis2=2),
          np.trace(bipartite.reshape(3, 2, 3, 2), axis1=0, axis2=2))


def check_martingales(rng):
    p = np.linspace(0, 1, 101)
    deviation = p * (1 - p)
    intermediate = np.stack([p - deviation, p + deviation])
    assert np.all((intermediate >= 0) & (intermediate <= 1))
    close(intermediate[0], p**2)
    close(1 - intermediate[1], (1 - p)**2)
    close(intermediate.mean(axis=0), p)
    conditional_winner = np.broadcast_to(p, intermediate.shape)
    assert np.all(conditional_winner[:, 1:-1] != intermediate[:, 1:-1])
    close((conditional_winner - intermediate).mean(axis=0), 0)

    # A literal finite conditional-probability tree, with an optional declaration.
    leaf_mass = np.array([[0.45, 0.05], [0.10, 0.40]])
    conditional = leaf_mass / leaf_mass.sum(axis=1, keepdims=True)
    close(leaf_mass.sum(axis=1) @ conditional, leaf_mass.sum(axis=0))
    close(conditional[0, 0], 0.9)
    close(leaf_mass[0, 1] / leaf_mass[0].sum(), 0.1)

    rho = density(rng, 3)
    diagonal = np.array([0.4, -0.5, 1.3])
    observable = np.diag(diagonal)
    commutator = observable @ rho - rho @ observable
    gamma, time = 0.7, 1.1
    drift = -gamma * (observable @ commutator - commutator @ observable)
    close(drift.diagonal(), 0)
    gaps = diagonal[:, None] - diagonal
    close(drift, -gamma * gaps**2 * rho)
    p = rho.diagonal().real
    mean = diagonal @ p
    noise = np.sqrt(2 * gamma) * (observable @ rho + rho @ observable - 2 * mean * rho)
    close(noise.diagonal(), 2 * np.sqrt(2 * gamma) * (diagonal - mean) * p)
    close(noise.trace(), 0)
    two_level_mean = p[0] * diagonal[0] + (1 - p[0]) * diagonal[1]
    close((diagonal[0] - two_level_mean) * p[0],
          (diagonal[0] - diagonal[1]) * p[0] * (1 - p[0]))
    # Gaussian likelihood, trace normalization and the Itô quotient drift.
    eta = np.sqrt(2 * gamma)
    observation = 0.53
    likelihood = np.exp(2*eta*diagonal*observation - 2*eta**2*diagonal**2*time)
    factors = np.sqrt(likelihood)
    weighted = factors[:, None] * rho * factors
    close(weighted.trace(), likelihood @ p)
    posterior = weighted / weighted.trace()
    close(posterior.diagonal(), likelihood*p/(likelihood @ p))
    assert np.linalg.eigvalsh(posterior).min() >= -1e-14
    unnormalized_noise = eta*(observable @ posterior + posterior @ observable)
    trace_noise = unnormalized_noise.trace()
    normalized_noise = unnormalized_noise-posterior*trace_noise
    quotient_correction = posterior*trace_noise**2-unnormalized_noise*trace_noise
    close(quotient_correction, -trace_noise*normalized_noise)

    channel = np.exp(-gamma * time * gaps**2)
    assert np.linalg.eigvalsh(channel).min() > -1e-14
    gaussian = rng.normal(scale=np.sqrt(2 * gamma * time), size=160_000)
    close(np.exp(-1j * gaussian[:, None, None] * gaps).mean(axis=0), channel, atol=0.007)


def check_sphere(rng):
    angles = np.deg2rad([0, 30, 45, 60, 90])
    p = np.cos(angles)**2
    z = np.cos(2 * angles)
    close(z, [1, 1/2, 0, -1/2, -1])
    close(p, [1, 3/4, 1/2, 1/4, 0])
    close(z, 2*p - 1)
    close((1 + z**3) / 2, [1, 9/16, 1/2, 7/16, 0])
    assert_array_equal(np.sign(np.round(z, 12)), [1, 1, 0, -1, -1])

    u = np.array([0., 0., 1.])
    for height in (-0.77, -0.2, 0.3, 0.7):
        azimuth = 0.63
        radius = np.sqrt(1 - height**2)
        r = np.array([radius*np.cos(azimuth), radius*np.sin(azimuth), height])
        dz = np.array([-height*np.cos(azimuth)/radius, -height*np.sin(azimuth)/radius, 1])
        dphi = np.array([-radius*np.sin(azimuth), radius*np.cos(azimuth), 0])
        close(dz @ dz, (1 - height**2)**-1)
        close(dphi @ dphi, 1 - height**2)
        close(dz @ dphi, 0)
        close(np.linalg.norm(np.cross(dz, dphi)), 1)
        close(np.linalg.norm(r-u)**2, 2*(1-height))
        close(np.linalg.norm(r+u)**2, 2*(1+height))
        for threshold in (-0.8, -0.1, 0.4, 0.9, height):
            velocity = (height-threshold)*(u-height*r)
            close(velocity @ r, 0)
            close(velocity[2], (height-threshold)*(1-height**2))
            derivative = lambda t: 1-t*t-2*t*(t-threshold)
            close([derivative(1), derivative(-1), derivative(threshold)],
                  [-2*(1-threshold), -2*(1+threshold), 1-threshold**2])
        lam = np.linspace(-1, 1, 501)
        close(np.mean((height-lam)*(1-height**2)), height*(1-height**2))
        assert height*(1-height**2) != 0
        close((r + r*np.array([-1, -1, 1])) / 2,
              (1+height)/2*u - (1-height)/2*u)
        threshold = height / 2
        state = height
        for _ in range(4000):
            state += 0.01 * (state-threshold)*(1-state**2)
        close(state, np.sign(height), atol=1e-7)

    sphere = rng.normal(size=(150_000, 3))
    sphere /= np.linalg.norm(sphere, axis=1, keepdims=True)
    cuts = np.linspace(-1, 1, 9)
    counts, _ = np.histogram(sphere[:, 2], cuts)
    close(counts / len(sphere), np.diff(cuts)/2, atol=0.006)
    nodes, quadrature = np.polynomial.legendre.leggauss(5)
    close(quadrature @ (1.5*nodes**2), 1)


def check_simplex(rng):
    dimension = 4
    gaussian = rng.normal(size=(200_000, dimension, 2)) / np.sqrt(2)
    mass = np.sum(gaussian**2, axis=-1)
    sample = mass / mass.sum(axis=1, keepdims=True)
    close(sample.sum(axis=1), 1)
    close(mass.mean(axis=0), np.ones(dimension), atol=0.008)
    close(sample.mean(axis=0), np.full(dimension, 1 / dimension), atol=0.003)
    point = np.array([0.09, 0.16, 0.23, 0.52])
    jacobian = np.column_stack([2.3 * (np.eye(4)[:, :3] - np.eye(4)[:, [3]]), point])
    close(np.linalg.det(jacobian), 2.3**3)
    laguerre, weights = np.polynomial.laguerre.laggauss(6)
    close(weights @ laguerre**3, 6)
    for p in (point, np.array([0., 0.3, 0.7, 0.]), np.eye(4)[1]):
        ratio = np.divide(sample, p, out=np.full_like(sample, np.inf), where=p > 0)
        winners = np.argmin(ratio, axis=1)
        close(np.bincount(winners, minlength=4) / len(sample), p, atol=0.006)
        active = p > 0
        assert np.all(np.all(np.isfinite(ratio[:, active]), axis=1))
        if p[-1] > 0:
            event = np.all(sample[:, :-1] / sample[:, [-1]] > p[:-1] / p[-1], axis=1)
            assert_array_equal(event, winners == 3)
            close(event.mean(), p[-1], atol=0.006)
        u = sample[10]
        winner = winners[10]
        scale = u[winner]/p[winner]
        coefficients = u - scale*p
        assert np.all(coefficients >= -1e-14)
        close(coefficients.sum() + scale, 1)
        scores = p/u
        scaled = p*np.exp(60*(scores-scores.max()))
        close(scaled.sum() > 0, True)
        flowed = scaled / scaled.sum()
        close(flowed.sum(), 1)
        close(flowed[~active], 0)
        assert flowed[winner] > 0.99

    binary_mass = sample[:, :2] / sample[:, :2].sum(axis=1, keepdims=True)
    assert_array_equal(binary_mass[:, 0] < 0.75, 2*binary_mass[:, 0]-1 < 0.5)
    block_mass = mass[:, :2].sum(axis=1) / mass[:, :3].sum(axis=1)
    close(np.mean(block_mass < 0.5), 0.25, atol=0.006)
    close(np.mean(block_mass), 2/3, atol=0.004)
    tied = np.array([0.2, 0.3, 0.5])
    close(tied/tied, [1, 1, 1])
    close(tied*np.exp(tied/tied) / np.sum(tied*np.exp(tied/tied)), tied)


def check_chain():
    j = np.arange(5)
    for q, expected in ((0.5, j/4), (2/3, [0, 8/15, 4/5, 14/15, 1])):
        transition = np.zeros((5, 5))
        transition[0, 0] = transition[4, 4] = 1
        transition[j[1:-1], j[1:-1]+1] = q
        transition[j[1:-1], j[1:-1]-1] = 1-q
        transient = transition[1:-1, 1:-1]
        close(transition.sum(axis=1), 1)
        close((transition @ (j/4) - j/4)[1:-1], (2*q-1)/4)
        result = np.linalg.solve(np.eye(3) - transient, transition[1:-1, 4])
        close(np.r_[0, result, 1], expected)
        close(np.diff(expected)[1:] / np.diff(expected)[:-1], (1-q)/q)
        for blocks in range(1, 9):
            tail = np.linalg.matrix_power(transient, 4*blocks).sum(axis=1)
            assert np.all(tail <= (1-q**4)**blocks)
            assert tail[1] >= (q*(1-q))**(2*blocks) - 1e-14
        if q == 0.5:
            hitting_time = np.linalg.solve(np.eye(3) - transient, np.ones(3))
            close(np.r_[0, hitting_time, 0], j*(4-j))
            close(hitting_time, [3, 4, 3])
        else:
            close((2*q-1)/4, 1/12)
            close((1-2.0**-j)/(1-2.0**-4), expected)


def check_ticks():
    for count in (1, 2, 4, 20, 64):
        cells = np.linspace(0, 1, count+1)
        close(np.diff(cells), np.full(count, 1/count))
        midpoint = (cells[1:] + cells[:-1])/2
        close(midpoint - cells[:-1], np.full(count, 1/(2*count)))
    close(1/20, 0.05)
    for depth in range(1, 11):
        grid = np.linspace(0, 1, 2**depth+1)
        left = np.zeros_like(grid)
        right = np.ones_like(grid)
        for _ in range(depth):
            middle = (left+right)/2
            upper = grid >= middle
            left = np.where(upper, middle, left)
            right = np.where(upper, right, middle)
        close(right-left, 2.0**-depth)
        assert np.all((left <= grid) & (grid <= right))
    for constant in (1, 1e-3, 1e-12):
        assert 64*2.0**-64 < constant
    frequency, duration, hop = 7.0, 3.03, 0.4
    light_speed = frequency*hop
    budget = int(np.floor(frequency*duration))
    assert 1/budget >= hop/(light_speed*duration)
    close(light_speed*duration/2, 4.242)
    assert np.linalg.norm([1, 1]) < np.sum(np.abs([1, 1]))
    energy, hbar = 2.4, 0.83
    n = 6
    stage = np.pi*hbar/(4*energy)
    close(2*energy*stage/hbar, np.pi/2)
    close(4*energy*n*stage/(np.pi*hbar), n)

    values = [0.0]
    for _ in range(80):
        values.append(np.cos(values[-1]))
    values = np.array(values)
    close(values[1:6], [1, 0.540302, 0.857553, 0.654290, 0.793480], atol=5e-7)
    residual = np.abs(np.diff(values))
    assert np.all(residual[:4] > 0.15) and residual[4] <= 0.15
    close(residual[4], 0.139191, atol=5e-7)
    close(abs(values[5]-values[-1]), 0.054395, atol=5e-7)
    close(residual[0], 1)
    assert np.all(residual[:12] > 0)
    close(values[-1], 0.7390851332, atol=5e-11)
    q = np.sin(1.0)
    assert q < 1
    assert np.all(residual[1:12] <= q*residual[:11])
    assert np.all(residual[:12] <= q**np.arange(12)*residual[0])
    assert np.all(abs(values[1:13]-values[-1]) <= q/(1-q)*residual[:12])
    for target, expected in ((0.150, 0.6476), (-0.150, 0.8270)):
        low, high = 0., 1.
        for _ in range(50):
            midpoint = (low+high)/2
            if np.cos(midpoint)-midpoint > target:
                low = midpoint
            else:
                high = midpoint
        close((low+high)/2, expected, atol=5e-5)
    windows = []
    point = values[-1]
    for rate in range(5):
        windows.append(int(np.floor(1000*point)))
        close(point, (10.0**rate * values[-1]) % 1, atol=2e-12)
        point = (10*point) % 1
    assert_array_equal(windows, [739, 390, 908, 85, 851])


def check_spectra(rng):
    rotation = np.array([[0., -1.], [1., 0.]])
    vector = np.array([0.31, 0.47])
    projection = np.diag([1, 0])
    tail = (np.eye(2) - projection) @ vector
    close(rotation.T, -rotation)
    close(rotation @ rotation.T, np.eye(2))
    close(rotation @ rotation, -np.eye(2))
    close(np.linalg.norm(projection @ vector)**2 + np.linalg.norm(rotation @ tail)**2,
          np.linalg.norm(vector)**2)
    close(vector @ rotation @ vector, 0)
    assert np.linalg.norm(projection @ rotation @ tail) > 0
    rho = density(rng, 2)
    kept = np.diag(rho.diagonal())
    close(np.vdot(kept, rho-kept), 0)
    close(np.linalg.norm(rho-kept, 'fro')**2, abs(rho[0, 1])**2 + abs(rho[1, 0])**2)
    close(np.linalg.norm(rho, 'fro')**2,
          np.linalg.norm(kept, 'fro')**2 + np.linalg.norm(rho-kept, 'fro')**2)
    update_adjoint = np.eye(5, k=-1)
    read_adjoint = np.eye(5)[:, :2]
    for operator, expected in ((update_adjoint, [2, 3, 4, 5, 5, 5]),
                               (np.eye(5), [2, 2, 2, 2, 2, 2])):
        generators = [np.linalg.matrix_power(operator, n) @ read_adjoint for n in range(6)]
        ranks = [np.linalg.matrix_rank(np.column_stack(generators[:m+1])) for m in range(6)]
        assert_array_equal(ranks, expected)
        assert np.count_nonzero(np.diff(ranks)) <= 5 - read_adjoint.shape[1]

    sigma = np.array([1., 0.76, 0.54, 0.35, 0.20, 0.10])
    fourth = sigma**4
    close(fourth, [1, 0.333622, 0.085031, 0.015006, 0.001600, 0.000100], atol=5e-7)
    assert_array_equal(np.flatnonzero(fourth >= 0.120), [0, 1])
    shares = [(sigma[:2]**power).sum()/(sigma**power).sum() for power in (2, 8, 10)]
    close(shares, [0.772689, 0.993334, 0.997997], atol=5e-7)
    masses = sigma**2/(sigma @ sigma)
    assert_array_equal(np.flatnonzero(masses >= 0.100), [0, 1, 2])
    close([masses[:3].sum(), masses[3:].sum(), masses[:5].sum(), masses[5]],
          [0.9155, 0.0845, 0.9951, 0.0049], atol=5e-5)
    left, _ = np.linalg.qr(rng.normal(size=(6, 6)))
    right, _ = np.linalg.qr(rng.normal(size=(6, 6)))
    g = (left*sigma) @ left.T
    c = rng.normal(size=6)
    for step in range(1, 9):
        out = np.linalg.matrix_power(g, step) @ left @ c
        close(out, left @ (sigma**step*c))
        perpendicular = np.linalg.norm((left.T @ (out/np.linalg.norm(out)))[1:])
        assert perpendicular <= sigma[1]**step*np.linalg.norm(c[1:])/abs(c[0])

    d = (left*sigma) @ right.T
    for rank in range(7):
        approximation = (left[:, :rank]*sigma[:rank]) @ right[:, :rank].T
        error = d - approximation
        spectral = sigma[rank] if rank < len(sigma) else 0
        frobenius = np.linalg.norm(sigma[rank:])
        close(np.linalg.norm(error, 2), spectral)
        close(np.linalg.norm(error, 'fro'), frobenius)
        competitor = rng.normal(size=(6, rank)) @ rng.normal(size=(rank, 6))
        assert np.linalg.norm(d-competitor, 2) >= spectral - 1e-12
        assert np.linalg.norm(d-competitor, 'fro') >= frobenius - 1e-12
    psi = np.array([1., 2., 5.])/np.sqrt(30)
    rho = np.outer(psi, psi)
    close(rho.diagonal(), np.array([1, 4, 25])/30)
    basis, _ = np.linalg.qr(np.column_stack((psi, np.eye(3)[:, :2])))
    close(np.diag(basis.T @ rho @ basis), [1, 0, 0])
    frequency = np.column_stack([np.array([1, 1, 1])/np.sqrt(3),
                                 np.array([1, 0, -1])/np.sqrt(2),
                                 np.array([-1, 2, -1])/np.sqrt(6)])
    close(frequency.T @ frequency, np.eye(3))
    close(np.linalg.det(frequency), 1)
    close(np.cross(frequency[:, 0], frequency[:, 1]), frequency[:, 2])
    angle = np.arccos((frequency.trace()-1)/2)
    generator = (frequency-frequency.T)/(2*np.sin(angle))
    def basis_at(fraction):
        argument = fraction*angle
        return np.eye(3)+np.sin(argument)*generator + (1-np.cos(argument))*generator @ generator
    close(basis_at(0), np.eye(3))
    close(basis_at(1), frequency)
    turned = basis_at(65/90)
    close(turned.T @ turned, np.eye(3))
    rotated_weights = (turned.T @ psi)**2
    close(rotated_weights, [0.6273, 0.2525, 0.1202], atol=5e-5)
    close(rotated_weights.sum(), 1)
    assert_array_equal(rotated_weights >= 0.150, [True, True, False])
    logits = (np.array([[1., 2.]]) @ np.eye(2)) / np.sqrt(2)
    softmax = np.exp(logits - logits.max())
    softmax /= softmax.sum()
    close(softmax.sum(), 1)
    assert softmax[0, 1] > softmax[0, 0]


def check_zeno_and_recoherence():
    a = np.pi/4
    checks = ((1, 0.500000), (2, 0.728553), (4, 0.856232),
              (8, 0.925676), (16, 0.962166), (64, 0.990408))
    previous = 0
    for n, expected in checks:
        diagonal = np.cos(a/n)**2
        loss = np.sin(a/n)**2
        survival = diagonal**n
        close(survival, expected, atol=5e-7)
        assert survival > previous
        previous = survival
        markov = np.array([[diagonal, loss], [loss, diagonal]])
        final = (1+(np.cos(2*a/n))**n)/2
        close(np.linalg.matrix_power(markov, n)[0, 0], final)
        if n == 16:
            close(a/n, np.pi/64)
            close(loss, 0.002408, atol=5e-7)
            close(final, 0.962838, atol=5e-7)
    n = np.array([64, 128, 256, 512])
    assert np.all(abs((np.cos(a/n)**2)**n - (1-a*a/n))*n*n < 1)
    assert np.all(abs(np.sin(a/n)**2 - a*a/n**2)*n**4 < 1)

    v = np.array([1., 0.])
    projector = np.outer(v, v)
    unitary = np.array([[np.cos(a), -np.sin(a)], [np.sin(a), np.cos(a)]])
    history = v.copy()
    returned = 0
    for _ in range(10):
        advanced = unitary @ history
        first = abs(v @ advanced)**2
        next_history = (np.eye(2)-projector) @ advanced
        close(first, np.linalg.norm(history)**2-np.linalg.norm(next_history)**2)
        returned += first
        close(returned + np.linalg.norm(next_history)**2, 1)
        history = next_history

    for p in (0., 0.25, 0.5, 0.75, 1.):
        psi = np.array([np.sqrt(p), 0, 0, np.sqrt(1-p)])
        pure = np.outer(psi, psi)
        mixture = np.diag([p, 0, 0, 1-p])
        close(np.trace(pure.reshape(2, 2, 2, 2), axis1=1, axis2=3),
              np.trace(mixture.reshape(2, 2, 2, 2), axis1=1, axis2=3))
        close(psi @ pure @ psi, 1)
        close(psi @ mixture @ psi, p*p+(1-p)**2)
        close(psi @ (pure-mixture) @ psi, 2*p*(1-p))


def main():
    rng = np.random.default_rng(167820)
    checks = (
        ("pinching, instruments and steering", lambda: check_records(rng)),
        ("martingales, stopping and diffusion", lambda: check_martingales(rng)),
        ("Bloch basins and hat-box marginals", lambda: check_sphere(rng)),
        ("simplex laws and degenerate blocks", lambda: check_simplex(rng)),
        ("five-state absorption and drift", check_chain),
        ("tick capacity and residual certificates", check_ticks),
        ("spectral truncation and observability", lambda: check_spectra(rng)),
        ("Zeno survival, first returns and interference", check_zeno_and_recoherence),
    )
    for subject, check in checks:
        check()
        print(f"PASS {subject}")
    print(f"PASS all {len(checks)} groups")


if __name__ == "__main__":
    main()
