#!/usr/bin/env python3
"""Finite numerical checks for section.tex. NumPy is the only dependency."""

from itertools import combinations
from math import comb

import numpy as np
from numpy.testing import assert_allclose


TOL = 2e-10
RNG = np.random.default_rng(731)
I2 = np.eye(2)
PAULI = (
    np.array([[0, 1], [1, 0]]),
    np.array([[0, -1j], [1j, 0]]),
    np.diag([1, -1]),
)
SINGLET = np.array([0, 1, -1, 0]) / np.sqrt(2)
TRIPLET = (np.eye(4)[0], np.array([0, 1, 1, 0]) / np.sqrt(2), np.eye(4)[3])
MINUS = np.kron(SINGLET, SINGLET)
PLUS = (
    np.kron(TRIPLET[0], TRIPLET[2])
    - np.kron(TRIPLET[1], TRIPLET[1])
    + np.kron(TRIPLET[2], TRIPLET[0])
) / np.sqrt(3)


def close(actual, expected, atol=TOL):
    assert_allclose(actual, expected, atol=atol, rtol=0)


def kron(*factors):
    result = np.array(1)
    for factor in factors:
        result = np.kron(result, factor)
    return result


def projector(vector):
    return np.outer(vector, vector.conj())


def matrix(state, sites):
    """Reshape the state as a coefficient matrix in the indicated cut order."""
    size = state.size.bit_length() - 1
    rest = tuple(k for k in range(size) if k not in sites)
    return state.reshape((2,) * size).transpose(tuple(sites) + rest).reshape(2**len(sites), -1)


def reduced(state, sites):
    coeff = matrix(state, sites)
    return coeff @ coeff.conj().T


def swaps(size, k, l):
    order = np.arange(2**size).reshape((2,) * size)
    permuted = order.swapaxes(k, l).ravel()
    return np.eye(2**size)[permuted]


def paired(matching, vector=SINGLET):
    order = tuple(site for pair in matching for site in pair)
    return kron(*([vector] * len(matching))).reshape((2,) * len(order)).transpose(
        np.argsort(order)
    ).ravel()


def eig_function(matrix, function):
    values, vectors = np.linalg.eigh(matrix)
    return (vectors * function(values)) @ vectors.conj().T


def phase(hamiltonian, t):
    return eig_function(hamiltonian, lambda values: np.exp(-1j * t * values))


def entropy(values):
    values = np.asarray(values)
    positive = values[values > 1e-14]
    return -positive @ np.log(positive)


def state_entropy(state):
    return entropy(np.linalg.eigvalsh(state))


def relative(state, reference):
    values, vectors = np.linalg.eigh(reference)
    weights = np.diag(vectors.conj().T @ state @ vectors).real
    support = values > 1e-14
    close(weights[~support], 0)
    return -state_entropy(state) - weights[support] @ np.log(values[support])


def complex_random(*shape):
    return RNG.normal(size=shape) + 1j * RNG.normal(size=shape)


def density(size):
    root = complex_random(size, size)
    result = root @ root.conj().T
    return result / np.trace(result)


def singlet_basis(n):
    """Kernel of collective raising restricted to the zero-weight bit strings."""
    weight_zero = [b for b in range(2 ** (2 * n)) if b.bit_count() == n]
    weight_one = [b for b in range(2 ** (2 * n)) if b.bit_count() == n - 1]
    addresses = {b: i for i, b in enumerate(weight_one)}
    raising = np.zeros((len(weight_one), len(weight_zero)))
    for column, b in enumerate(weight_zero):
        for k in range(2 * n):
            if b & (1 << k):
                raising[addresses[b ^ (1 << k)], column] = 1
    _, singular, vh = np.linalg.svd(raising, full_matrices=True)
    rank = np.count_nonzero(singular > TOL)
    basis = np.zeros((2 ** (2 * n), len(weight_zero) - rank))
    basis[weight_zero] = vh[rank:].T
    return basis


def check_singlets_and_kernel():
    for n, catalan in enumerate((1, 2, 5, 14, 42), 1):
        size = 2 * n
        basis = singlet_basis(n)
        close(basis.shape[1], catalan)
        close(catalan, comb(size, n) - comb(size, n - 1))
        close(catalan, comb(size, n) / (n + 1))
        close(basis.T @ basis, np.eye(catalan))
        pure_state = projector(basis[:, 0])
        close(pure_state @ pure_state, pure_state)
        close(state_entropy(pure_state), 0)
        spinors = [phase(axis / 2, 0.73) for axis in PAULI]
        for spinor in spinors:
            close(kron(*([spinor] * size)) @ basis, basis)
        pair_restriction = basis.T @ swaps(size, 0, 1) @ basis
        close(pair_restriction @ pair_restriction, np.eye(catalan))
        full_exchange = sum(swaps(size, k, l) @ basis
                            for k, l in combinations(range(size), 2))
        close(basis.T @ full_exchange, n * (n - 2) * np.eye(catalan))
        if n >= 3:
            matched_exchange = sum(swaps(size, k, k+1) @ basis for k in range(0, size, 2))
            shifted = basis.T @ (matched_exchange + full_exchange / (n-2))
            eigenvalues = np.linalg.eigvalsh(shifted)
            close(eigenvalues[0], 0)
            assert eigenvalues[1] > TOL
        elif n == 2:
            arbitrary_exchange = sum((k + l/3) * swaps(size, k, l) @ basis
                                     for k, l in combinations(range(size), 2))
            close(np.trace(basis.T @ arbitrary_exchange), 0)
        assert n * (size - 1) / 2 - n * (n - 2) == 3 * n / 2
        close(state_entropy(np.eye(2**size) / 2**size), size * np.log(2))

        singlet_weights = sum(reduced(basis[:, k], [0, 1]) for k in range(catalan)) / catalan
        weight = (n + 1) / (2 * (2 * n - 1))
        close(singlet_weights, weight * projector(SINGLET)
              + (1 - weight) * (np.eye(4) - projector(SINGLET)) / 3)
        close(np.sum(np.abs(np.linalg.eigvalsh(singlet_weights - np.eye(4) / 4))),
              3 / (2 * (2 * n - 1)))

        state = basis @ complex_random(catalan)
        state /= np.linalg.norm(state)
        close(reduced(state, []), [[1]])
        for k in range(size):
            close(reduced(state, [k]), I2 / 2)
        assert any(not np.allclose(reduced(state, pair), np.eye(4) / 4)
                   for pair in combinations(range(size), 2))

        if n <= 3:
            for length in range(size + 1):
                for cut in combinations(range(size), length):
                    rest = [k for k in range(size) if k not in cut]
                    if length > n:
                        assert np.linalg.matrix_rank(matrix(state, cut)) < 2**length
                    else:
                        matching = list(zip(cut, rest[:length]))
                        matching += list(zip(rest[length::2], rest[length + 1::2]))
                        pair_state = paired(matching)
                        close(reduced(pair_state, cut), np.eye(2**length) / 2**length)

    close(reduced(MINUS, [0, 1]), projector(SINGLET))
    close(reduced(paired([(0, 2), (1, 3)]), [0, 1]), np.eye(4) / 4)
    # For four sites a sum with independently chosen edges has a simple zero.
    four = np.column_stack([MINUS, PLUS])
    weighted = swaps(4, 0, 1) + swaps(4, 0, 2) + np.eye(16)
    close(np.linalg.eigvalsh(four.T @ weighted @ four), [0, 2])


def check_twirling_and_correlations():
    for n in range(1, 5):
        size = 2 * n
        dimer = paired(list(zip(range(0, size, 2), range(1, size, 2))))
        shift = np.roll(np.arange(size), -1)
        shifted = dimer.reshape((2,) * size).transpose(shift).ravel()
        close(shifted.reshape((2,) * size).transpose(shift).ravel(), dimer)
        if n == 1:
            close(shifted, -dimer)
        else:
            assert np.linalg.norm(dimer + shifted) > 1
            close((dimer + shifted).reshape((2,) * size).transpose(shift).ravel(),
                  dimer + shifted)
            # Invariance of the density ray under all swaps would give rank one here.
            assert np.linalg.matrix_rank(singlet_basis(n).T @ swaps(size, 0, 1)
                                         @ singlet_basis(n) - np.eye(comb(size, n) // (n + 1))) > 0

    sigma = (I2,) + PAULI
    basis = [np.kron(a, b) / 2 for a in sigma for b in sigma]
    close(np.array([[np.trace(a @ b) for b in basis] for a in basis]), np.eye(16))
    singlet_density = projector(SINGLET)
    for k in range(1, 4):
        close(np.trace(singlet_density @ basis[k]), 0)
        close(np.trace(singlet_density @ basis[4 * k]), 0)
    assert len([a for k, a in enumerate(basis) if k % 4 and k // 4]) == 9
    close(swaps(2, 0, 1), sum(np.kron(s, s) for s in sigma) / 2)

    # A discrete average over joint single-qubit Clifford rotations implements
    # the two-spin Haar twirl, verified below by the explicit singlet/triplet formula.
    x, y, z = [phase(axis / 2, np.pi / 2) for axis in PAULI]
    pending = [I2.astype(complex)]
    rotations = {}
    while pending:
        unitary = pending.pop()
        key = tuple(np.rint([
            np.trace(a @ unitary @ b @ unitary.conj().T).real / 2
            for a in PAULI for b in PAULI
        ]).astype(int))
        if key not in rotations:
            rotations[key] = unitary
            pending.extend(g @ unitary for g in (x, y, z))
    close(len(rotations), 24)
    joint = [np.kron(u, u) for u in rotations.values()]
    p = projector(SINGLET)
    q = np.eye(4) - p
    for entry in (projector(np.eye(4)[1]), density(4)):
        twirl = sum(u @ entry @ u.conj().T for u in joint) / len(joint)
        close(twirl, np.trace(p @ entry) * p + np.trace(q @ entry) * q / 3)
        if np.linalg.matrix_rank(entry) == 1:
            close(np.linalg.eigvalsh(twirl), [1 / 6, 1 / 6, 1 / 6, 1 / 2])
    entry = density(4)
    local = list(rotations.values())
    average = sum(np.kron(u, v) @ entry @ np.kron(u, v).conj().T
                  for u in local for v in local) / len(local)**2
    close(average, np.eye(4) / 4)


def check_clock_examples():
    code = np.column_stack([MINUS, PLUS])
    exchange = code.T @ swaps(4, 1, 2) @ code
    close(exchange, np.array([[1, np.sqrt(3)], [np.sqrt(3), -1]]) / 2)
    close((2*exchange+np.diag([-1, 1]))/np.sqrt(3), PAULI[0])
    for t in [-2, 0, 0.173, 0.9]:
        j = 1.7
        hc = j * swaps(4, 0, 1)
        for p in (0, 0.23, 0.5, 0.71, 1):
            state = np.sqrt(p) * np.kron(PLUS, MINUS) + np.sqrt(1-p) * np.kron(MINUS, PLUS)
            close((np.kron(hc, np.eye(16)) + np.kron(np.eye(16), hc)) @ state, 0)
            seed = (PLUS + MINUS) / np.sqrt(2)
            contraction = (phase(hc, t) @ seed).conj() @ state.reshape(16, 16)
            close(np.linalg.norm(contraction)**2, 1 / 2)
            conditional = np.sqrt(2) * contraction
            close(conditional, np.sqrt(p) * np.exp(1j*j*t) * MINUS
                  + np.sqrt(1-p) * np.exp(-1j*j*t) * PLUS)
            observable = np.outer(MINUS, PLUS) + np.outer(PLUS, MINUS)
            close(np.vdot(conditional, observable @ conditional),
                  2 * np.sqrt(p*(1-p)) * np.cos(2*j*t))
            close(np.vdot(seed, phase(hc, np.pi/(2*j)) @ seed), 0)
            close(phase(hc, np.pi/j) @ seed, -seed)
            close(reduced(state, [0]), I2 / 2)

        cross = j / 2 * sum(swaps(4, k, l) for k in (0, 1) for l in (2, 3))
        hc = j * swaps(2, 0, 1)
        state = (PLUS + MINUS) / np.sqrt(2)
        close((np.kron(hc, np.eye(4)) + cross) @ state, 0)
        c = phase(hc, t) @ ((TRIPLET[1] + SINGLET) / np.sqrt(2))
        contraction = c.conj() @ state.reshape(4, 4)
        close(contraction, np.exp(-1j*j*t)*SINGLET/2
              - np.exp(1j*j*t)*TRIPLET[1]/(2*np.sqrt(3)))
        close(np.linalg.norm(contraction)**2, 1 / 3)

        cross_source = c.conj() @ (cross @ state).reshape(4, 4)
        pauli_source = np.zeros(4, dtype=complex)
        for k in (0, 1):
            for l in (0, 1):
                pauli_source += j/4 * contraction
                for a in PAULI:
                    clock_pauli = np.kron(a, I2) if k == 0 else np.kron(I2, a)
                    system_pauli = np.kron(a, I2) if l == 0 else np.kron(I2, a)
                    pauli_source += j/4 * system_pauli @ (
                        c.conj() @ clock_pauli @ state.reshape(4, 4)
                    )
        close(pauli_source, cross_source)
    close(swaps(2, 0, 1) @ SINGLET, -SINGLET)

    j, p = 1.7, 0.67
    energies = np.array([-j, j])
    exchange_13 = swaps(4, 0, 2)
    close(exchange_13, swaps(4, 0, 1) @ swaps(4, 1, 2) @ swaps(4, 0, 1))
    close((code.T @ exchange_13 @ code)[0, 1], -np.sqrt(3)/2)
    entropies = []
    for t in (0, np.pi/(2*j), np.pi/j):
        coefficients = np.sqrt([p, 1-p]) * np.exp(-1j * t * energies)
        conditional = code @ coefficients
        rho = reduced(conditional, [0, 2])
        weight = (1-np.vdot(conditional, exchange_13 @ conditional).real)/2
        spectrum = np.array([weight] + [(1-weight)/3]*3)
        close(np.linalg.eigvalsh(rho), np.sort(spectrum))
        close(state_entropy(rho), entropy([weight, 1-weight])+(1-weight)*np.log(3))
        entropies.append(state_entropy(rho))
    assert abs(entropies[0]-entropies[1]) > 0.01
    close(entropies[0], entropies[2])


def check_conditional_equations():
    hc, hs = np.diag([-1., 1.]), np.diag([1., -1.])
    state = np.sqrt(0.7) * np.eye(4)[0] + np.sqrt(0.3) * np.eye(4)[3]
    seed = np.ones(2) / np.sqrt(2)
    extra_seed_rotation = 0.07 * PAULI[0]
    v = 0.08 * swaps(2, 0, 1)
    h = np.kron(hc, I2) + np.kron(I2, hs) + v
    residual = h @ state
    eps = 1e-5
    for clock_error in (0, 1):
        def bra(t):
            vector = phase(hc, t) @ phase(extra_seed_rotation, clock_error*t) @ seed
            return np.kron(vector.conj()[None, :], I2)

        for t in (-0.23, 0.45):
            readout, initial = bra(t), bra(0) @ state
            derivative = (bra(t+eps) - bra(t-eps))/(2*eps)
            defect = 1j*derivative + readout @ np.kron(hc, I2)
            phi = readout @ state
            source = readout @ (v @ state - residual) + defect @ state
            close(1j * derivative @ state, hs @ phi + source)
            future, past = bra(t+eps) @ state, bra(t-eps) @ state
            normalized = lambda value: value / np.linalg.norm(value)
            p = np.linalg.norm(phi)**2
            pdot = (np.vdot(future, future) - np.vdot(past, past))/(2*eps)
            close(pdot, 2*np.vdot(phi, source).imag)
            close(1j*(normalized(future)-normalized(past))/(2*eps),
                  hs @ normalized(phi) + source/np.sqrt(p) - 1j*pdot/(2*p)*normalized(phi))
            budget = abs(t)*(np.linalg.norm(v, 2) + np.linalg.norm(residual)
                             + clock_error*np.linalg.norm(extra_seed_rotation, 2))
            ideal = phase(hs, t) @ initial
            assert np.linalg.norm(phi-ideal) <= budget + TOL
            assert budget < np.linalg.norm(initial)
            assert np.linalg.norm(normalized(phi)-normalized(ideal)) <= 2*budget/np.linalg.norm(initial)

    # A stationary vector with nonzero source and changing clock weights.
    v = -PAULI[0]
    h_local = PAULI[2] + v
    eigvals, eigvecs = np.linalg.eigh(h_local)
    clock_state = eigvecs[:, 0]
    hs_scalar = -eigvals[0]
    close((h_local + hs_scalar*I2) @ clock_state, 0)
    t = 0.31
    def clock_vector(t):
        return phase(PAULI[2], t) @ seed
    c = clock_vector(t)
    phi = np.vdot(c, clock_state)
    source = np.vdot(c, v @ clock_state)
    prob = lambda t: abs(np.vdot(clock_vector(t), clock_state))**2
    pdot = (prob(t+eps) - prob(t-eps))/(2*eps)
    assert abs(pdot) > 0.1
    close(pdot, 2*(phi.conjugate()*source).imag)
    # Kernel criterion and Hermiticity criterion on two possible contraction maps.
    left = np.array([[1, 0], [0, 0]])
    good = np.array([[2, 0], [1j, 0]])
    extension = np.array([[2, -1j], [1j, 0]])
    close(left.conj().T @ good, good.conj().T @ left)
    close(extension @ left, good)
    close(extension, extension.conj().T)
    bad = np.eye(2)
    assert np.linalg.norm(bad @ np.array([0, 1])) > 0


def check_finite_readouts():
    for levels in (np.arange(5), np.array([0, 1, 3, 7])):
        ticks = 2*np.pi*np.arange(12)/12
        readouts = np.exp(-1j * ticks[:, None] * (levels + 0.37))
        close(readouts.conj().T @ readouts / len(ticks), np.eye(len(levels)))
    levels = np.arange(5)
    ticks = 2*np.pi*np.arange(5)/5
    readouts = np.exp(-1j * ticks[:, None] * levels) / np.sqrt(5)
    close(readouts @ readouts.conj().T, np.eye(5))
    gap = np.sqrt(2)
    grid = np.linspace(0, 11, 100_001)
    uniform = np.exp(1j*gap*grid)
    midpoint = (uniform[:-1] + uniform[1:]) / 2
    coeff = np.expm1(11j*gap)/(11j*gap)
    close(np.mean(midpoint), coeff, atol=2e-9)
    assert abs(coeff) <= 2/(11*gap)
    close(np.trace(PAULI[0] @ PAULI[1] - PAULI[1] @ PAULI[0]), 0)
    offsets = 2*np.pi*np.arange(100)/100
    close(np.mean(np.exp(2j*offsets)), 0)
    assert abs(0.4*np.exp(0.3j) + 0.6*np.exp(1.2j)) <= 1
    joint = kron(phase(np.diag([-1., 1.]), 1.12), phase(np.diag([1., -1.]), 1.12))
    close(joint @ ((np.eye(4)[0]+np.eye(4)[3])/np.sqrt(2)),
          (np.eye(4)[0]+np.eye(4)[3])/np.sqrt(2))


def check_phase_and_restrictions():
    state = complex_random(8)
    state /= np.linalg.norm(state)
    phase_factor = np.exp(0.9j)
    close(projector(phase_factor*state), projector(state))
    close(kron(phase_factor*I2, np.eye(4)) @ state, phase_factor*state)
    close(projector(-MINUS), projector(MINUS))
    effect = density(4)
    close(np.trace(reduced(state, [1, 2]) @ effect),
          np.vdot(state, np.kron(I2, effect) @ state))
    coeff = matrix(state, [0])
    close(reduced(state, [0]), coeff @ coeff.conj().T)
    schmidt = np.linalg.svd(coeff, compute_uv=False)**2
    close(np.linalg.eigvalsh(reduced(state, [0]))[::-1], schmidt)
    close(state_entropy(reduced(state, [1, 2])), entropy(schmidt))
    close(np.linalg.norm(reduced(state, [0]))**2, schmidt @ schmidt)
    conditioned = coeff[0] / np.linalg.norm(coeff[0])
    close(projector(conditioned), projector(conditioned) @ projector(conditioned))
    close(sum(projector(branch) for branch in coeff), reduced(state, [1, 2]))
    close(np.linalg.norm(SINGLET.reshape(2, 2)[0])**2, 1/2)
    for angle in np.linspace(0, np.pi, 13):
        close(abs(np.array([np.cos(angle), np.sin(angle)])
                  @ (np.sqrt(2)*SINGLET.reshape(2, 2)[0]))**2, np.sin(angle)**2)
    branch = MINUS.reshape(2, 8)[0].copy()
    branch /= np.linalg.norm(branch)
    close(reduced(branch, [1]), I2/2)


def check_paired_entropy():
    matching = [(k, 11-k) for k in range(6)]
    for p in (0., 0.07, 0.25, 0.5, 1.):
        pair = np.array([np.sqrt(p), 0, 0, np.sqrt(1-p)])
        state = paired(matching, pair)
        for m in range(13):
            spectrum = np.linalg.svd(matrix(state, range(m)), compute_uv=False)**2
            close(entropy(spectrum), min(m, 12-m)*entropy([p, 1-p]))
    state = paired(matching)
    close(entropy(np.linalg.svd(matrix(state, range(6)), compute_uv=False)**2),
          6*np.log(2))


def check_modular():
    beta = 0.8
    h = 0.43*PAULI[0] + 0.27*PAULI[1] - 0.6*PAULI[2]
    rho = eig_function(h, lambda e: np.exp(-beta*e))
    z = np.trace(rho)
    rho /= z
    k = -eig_function(rho, np.log)
    close(k, beta*h + np.log(z)*I2)
    root = eig_function(rho, np.sqrt)
    inverse_root = eig_function(rho, lambda x: x**(-1/2))
    b, d = complex_random(2, 2), complex_random(2, 2)
    tomita = (b @ np.linalg.inv(root)).conj().T @ root
    close(tomita, (root @ b @ inverse_root).conj().T)
    close((root @ (root @ b @ inverse_root) @ inverse_root), rho @ b @ np.linalg.inv(rho))
    close(np.linalg.norm(b.conj().T), np.linalg.norm(b))
    for s in (-1.7, 0., 0.28, 0.51):
        sigma = lambda t, a: eig_function(rho, lambda x: x**(1j*t)) @ a @ eig_function(
            rho, lambda x: x**(-1j*t))
        close(sigma(s, d), phase(k, s) @ d @ phase(k, -s))
        close(sigma(s, d), phase(h, beta*s) @ d @ phase(h, -beta*s))
        close(sigma(0.3, sigma(s, d)), sigma(0.3+s, d))
        close(np.trace(rho @ b @ sigma(s-1j, d)), np.trace(rho @ sigma(s, d) @ b))
        alpha = lambda t: eig_function(h, lambda x: np.exp(1j*t*x)) @ d @ eig_function(
            h, lambda x: np.exp(-1j*t*x))
        close(np.trace(rho @ b @ alpha(s+1j*beta)), np.trace(rho @ alpha(s) @ b))
    singular = np.diag([1., 0.])
    close(np.diag([0., 1.]) @ singular, 0)
    close(-np.log(singular[0, 0]), 0)
    p, j = 0.71, 1.8
    matched = np.exp(-np.log(p/(1-p))/(2*j) * np.array([-j, j]))
    close(matched / matched.sum(), [p, 1-p])
    close(eig_function(I2/2, lambda x: x**(1j))*2**1j, I2)
    for theta in (0.001, 0.34, 0.739, np.pi/4 - 0.001):
        q = np.sin(theta)**2
        close(q/(1-q), np.tan(theta)**2)
        close(np.log((1-q)/q), 2*np.log(1/np.tan(theta)))
    assert 1/(2*np.log(1/np.tan(1e-12))) < 0.02
    assert 1/(2*np.log(1/np.tan(np.pi/4-1e-5))) > 1e4
    assert np.linalg.norm(PAULI[0] @ rho-rho @ PAULI[0]) > 0.1


def check_thermodynamics():
    rho, tau = density(3), density(3)
    log_rho = eig_function(rho, np.log)
    diff = tau-rho
    close(state_entropy(tau)-state_entropy(rho),
          -np.trace(diff @ log_rho) - relative(tau, rho))
    eps = 2e-6
    close((state_entropy(rho+eps*diff)-state_entropy(rho-eps*diff))/(2*eps),
          -np.trace(diff @ log_rho), atol=2e-8)
    assert relative(tau, rho) > 0
    close(relative(rho, rho), 0)
    pure = projector(np.ones(3) / np.sqrt(3))
    close(relative(pure, pure), 0)
    pinched = lambda state: np.diag(np.diag(state))
    change = 0
    for entry in (tau, density(3), pure):
        after = pinched(entry)
        close(np.linalg.norm(entry)**2,
              np.linalg.norm(after)**2 + np.linalg.norm(entry-after)**2)
        close(state_entropy(after)-state_entropy(entry), relative(entry, after))
        assert relative(entry, after) > 0
    close(state_entropy(pinched(pure)), np.log(3))
    close(relative(pinched(tau), pinched(tau)), 0)
    qubit = density(2)
    close(np.linalg.norm(qubit-pinched(qubit))**2,
          abs(qubit[0, 1])**2 + abs(qubit[1, 0])**2)
    start = qubit
    for ham in PAULI:
        unitary = phase(ham, 0.48)
        before = unitary @ qubit @ unitary.conj().T
        qubit = pinched(before)
        change += relative(before, qubit)
    close(state_entropy(qubit)-state_entropy(start), change)

    delta, q = 1.91, 0.25
    beta = np.log((1-q)/q)/delta
    bath = np.diag([1-q, q])
    mem = I2/2
    swap = swaps(2, 0, 1)
    close(swap @ np.kron(mem, bath) @ swap, np.kron(bath, mem))
    heat = delta*(0.5-q)
    close(beta*heat, np.log(2)-entropy([q, 1-q])+relative(mem, bath))
    assert heat > 0 and relative(mem, bath) > 0
    close(np.linalg.matrix_rank(np.kron(mem, bath)), 4)
    close(np.linalg.matrix_rank(np.kron(np.diag([1, 0]), bath)), 2)

    unitary = phase(np.kron(PAULI[0], PAULI[1]), 0.41)
    initial = np.kron(density(2), bath)
    final = unitary @ initial @ unitary.conj().T
    final_m = np.trace(final.reshape(2, 2, 2, 2), axis1=1, axis2=3)
    final_r = np.trace(final.reshape(2, 2, 2, 2), axis1=0, axis2=2)
    delta_m = state_entropy(final_m)-state_entropy(np.trace(
        initial.reshape(2, 2, 2, 2), axis1=1, axis2=3))
    mutual = relative(final, np.kron(final_m, final_r))
    close(beta*delta*(final_r[1, 1]-q), -delta_m + mutual + relative(final_r, bath))
    assert mutual > 0
    close(swap @ np.kron(mem, np.diag([1, 0])) @ swap, np.kron(np.diag([1, 0]), mem))


def check_records():
    cnot = np.eye(4)[[0, 1, 3, 2]]
    for sign in [-1, 1]:
        input_vector = np.array([1., sign])/np.sqrt(2)
        full = np.kron(input_vector, [1, 0])
        copied = cnot @ full
        close(copied, np.array([1., 0, 0, sign])/np.sqrt(2))
        close(reduced(copied, [0]), I2/2)
        close(cnot @ copied, full)
        twice = np.array([1., 0, 0, 0, 0, 0, 0, sign])/np.sqrt(2)
        partially_recovered = np.kron(cnot, I2) @ twice
        close(reduced(partially_recovered, [0]), I2/2)
        close(state_entropy(reduced(cnot @ copied, [0])), 0)
    q1, q2, gap = 0.15, 0.42, 2.7
    before = np.kron(np.diag([1-q1, q1]), np.diag([1-q2, q2]))
    swap = swaps(2, 0, 1)
    close(np.trace((swap @ before @ swap - before) @ np.kron(np.diag([0, gap]), I2)),
          gap*(q2-q1))


def check_fixed_point_and_interference():
    x = 1.
    for _ in range(110):
        x = np.cos(x)
    close(x, np.cos(x))
    close(x, 0.73908513, atol=5e-9)
    assert 0 < x < np.pi/4 and np.sin(1) < 1
    q = np.sin(x)**2
    close(entropy([q, 1-q]), 0.688864, atol=5e-7)
    close(1/(2*np.log(1/np.tan(x))), 5.390324, atol=5e-7)
    close(np.log(2)-entropy([q, 1-q]), 0.004284, atol=5e-7)

    angle, a, omega = 0.33, 2.77, 3.6
    delta = 2*np.pi/a * (np.array([1., 0.]) - np.array([np.cos(angle), np.sin(angle)]))
    spacing = a/(2*np.sin(angle/2))
    normal = delta / np.linalg.norm(delta)
    close(np.linalg.norm(delta) * spacing, 2*np.pi)
    location = np.array([0.56, -0.73])
    intensity = lambda q: abs(1+np.exp(1j*q))**2/4
    for dt in (-0.84, 0., 0.92):
        q = delta @ location - omega*dt
        close(intensity(q), (1+np.cos(q))/2)
        close(delta @ (location + normal*omega*dt/np.linalg.norm(delta))-omega*dt,
              delta @ location)
    length = 3.21
    grid = (np.arange(100_000)+0.5)*length/100_000-length/2
    offset = delta @ location
    close(np.mean(intensity(offset+np.linalg.norm(delta)*grid)),
          (1+np.cos(offset)*np.sinc(np.linalg.norm(delta)*length/(2*np.pi)))/2)
    close(intensity(-omega), (1+np.cos(omega))/2)
    alpha, count = np.sqrt(2), 100_003
    for mode in (-5, -1, 1, 7):
        step = np.exp(2j*np.pi*mode*alpha)
        average = np.mean(np.exp(2j*np.pi*mode*alpha*np.arange(count)))
        close(average, (1-step**count)/(count*(1-step)))
        assert abs(average) <= 2 / (count*abs(1-step))
    metric = np.diag([-1., 1., 1., 1.])
    stress = RNG.normal(size=(4, 4))
    stress += stress.T.copy()
    trace_free = lambda tensor: tensor - metric*np.trace(metric @ tensor)/4
    close(trace_free(stress+1.4*metric), trace_free(stress))


def check_singlet_chain_benchmarks():
    samples = np.random.default_rng(441)
    expected = (
        (2, 2, 0.432733), (4, 5, 0.251560),
        (13, 15, 0.209589), (43, 47, 0.165086),
    )
    for n, (minimum, maximum, mean_distance) in enumerate(expected, 3):
        size = 2*n
        bits = np.array([b for b in range(2**size) if b.bit_count() == n])
        bit_indices = np.full(2**size, -1)
        bit_indices[bits] = np.arange(bits.size)
        basis = singlet_basis(n)[bits]
        restricted = []
        for spacing in (1, 2):
            for a in range(size):
                b = (a+spacing) % size
                different = ((bits >> a) ^ (bits >> b)) & 1
                swapped = bits ^ (different * ((1 << a) | (1 << b)))
                restricted.append(basis.T @ basis[bit_indices[swapped]])
        restricted = np.stack(restricted)
        distances, counts = [], []
        for _ in range(20):
            couplings = np.concatenate((samples.uniform(0.9, 1.1, size),
                                        samples.uniform(0.45, 0.55, size)))
            hamiltonian = np.einsum("a,aij->ij", couplings, restricted)
            values, vectors = np.linalg.eigh(hamiltonian)
            keep = abs(values - values.mean()) <= n**0.25
            counts.append(np.count_nonzero(keep))
            assert counts[-1] > 0
            occupied = vectors[:, keep]
            swap_means = np.sum(occupied * (restricted[0] @ occupied), axis=0)
            pair_weights = (1-swap_means)/2
            distances.append(np.mean(2*abs(pair_weights-1/4)))
        assert (min(counts), max(counts)) == (minimum, maximum)
        close(np.mean(distances), mean_distance, atol=5e-7)


def main():
    checks = (
        check_singlets_and_kernel, check_twirling_and_correlations,
        check_clock_examples, check_conditional_equations, check_finite_readouts,
        check_phase_and_restrictions, check_paired_entropy, check_modular,
        check_thermodynamics, check_records, check_fixed_point_and_interference,
        check_singlet_chain_benchmarks,
    )
    for check in checks:
        check()
        print(f"PASS  {check.__name__}")
    print(f"All {len(checks)} groups passed.")


if __name__ == "__main__":
    main()
