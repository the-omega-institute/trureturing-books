#!/usr/bin/env python3
"""Deterministic finite checks for Section sec:finitemem (vendored from module n2). Requires NumPy."""

from itertools import combinations
from math import factorial
import re

import numpy as np
from numpy.testing import assert_allclose


TOL = 2e-10
I = np.eye(2)
X = np.array([[0, 1], [1, 0]])
Y = np.array([[0, -1j], [1j, 0]])
Z = np.diag([1, -1])
PAULI = np.array([X, Y, Z])
RNG = np.random.default_rng(1419)


def close(actual, expected, atol=TOL):
    assert_allclose(actual, expected, atol=atol, rtol=0)


def ket_density(ket):
    return np.outer(ket, ket.conj())


def random_density(d):
    matrix = RNG.normal(size=(d, d)) + 1j * RNG.normal(size=(d, d))
    positive = matrix @ matrix.conj().T
    return positive / np.trace(positive)


def entropy(rho):
    p = np.linalg.eigvalsh(rho)
    p = p[p > 1e-14]
    return -np.sum(p * np.log(p))


def relative_entropy(rho, sigma):
    p, basis = np.linalg.eigh(sigma)
    q = np.diag(basis.conj().T @ rho @ basis).real
    assert np.all(np.abs(q[p < 1e-14]) < TOL)
    return -entropy(rho) - q[p > 1e-14] @ np.log(p[p > 1e-14])


def marginal(rho, left, right, keep_left=True):
    return rho.reshape(left, right, left, right).trace(
        axis1=1 if keep_left else 0, axis2=3 if keep_left else 2
    )


def root(matrix):
    p, u = np.linalg.eigh(matrix)
    assert min(p) > -TOL
    return (u * np.sqrt(np.maximum(p, 0))) @ u.conj().T


def trace_norm(matrix):
    return np.linalg.svd(matrix, compute_uv=False).sum()


def gram_checks():
    for complex_entries in (False, True):
        columns = RNG.normal(size=(5, 5)).astype(complex)
        if complex_entries:
            columns += 1j * RNG.normal(size=columns.shape)
        columns /= np.linalg.norm(columns, axis=0)
        test = columns[:, -1]
        columns = columns[:, [0, 1, 0, 2, 3, 4]]
        old_projection = np.zeros(5)
        old_slack = 1
        for width in range(1, 7):
            anchors = columns[:, :width]
            gram = anchors.conj().T @ anchors
            overlap = anchors.conj().T @ test
            inverse = np.linalg.pinv(gram, hermitian=True)
            projection = anchors @ inverse @ overlap
            close(anchors.conj().T @ projection, overlap)
            slack = 1 - np.vdot(overlap, inverse @ overlap).real
            border = np.block([[gram, overlap[:, None]], [overlap.conj()[None, :], np.ones((1, 1))]])
            assert np.linalg.eigvalsh(border).min() > -TOL
            close(np.linalg.norm(test - projection) ** 2, slack)
            close(old_slack - slack, np.linalg.norm(projection - old_projection) ** 2)
            assert np.linalg.matrix_rank(border) == np.linalg.matrix_rank(gram) + (slack > TOL)
            if np.linalg.matrix_rank(gram) == width:
                close(np.linalg.det(border), np.linalg.det(gram) * slack)
            old_slack, old_projection = slack, projection
        close(old_slack, 0)
    bad_range = np.array(
        [[1, 1, .2], [1, 1, -.2], [.2, -.2, 1]]
    )
    assert min(np.linalg.eigvalsh(bad_range)) < 0
    close(np.linalg.pinv(bad_range[:2, :2]) @ bad_range[:2, 2], [0, 0])
    for m in range(1, 21):
        c = np.ones(m) / 2
        g = (2 * np.eye(m) + np.ones((m, m))) / 3
        close(np.linalg.det(g), (2/3)**(m-1) * (m+2)/3)
        close(c @ np.linalg.solve(g, c), 3*m/(4*(m+2)))
        close(1 - c @ np.linalg.solve(g, c), (m+8)/(4*(m+2)))
        close(1 - c @ c, 1-m/4)
    a = b = .8
    for c, expected in [(0, -7/25), (.8, 13/125), (.28, 0), (1, 0)]:
        close(np.linalg.det([[1, a, b], [a, 1, c], [b, c, 1]]), expected)
        close((1-a*a)*(1-b*b)-(c-a*b)**2, expected)
    close(1-b*b, 9/25)
    close(.25 + np.array([-1, 1]) * .75, [-.5, 1])
    close(np.linalg.det(np.diag([1, -1, 1])), -1)
    close(np.eye(3).T @ np.eye(3), np.diag([1, -1, 1]).T @ np.diag([1, -1, 1]))
    close(np.linalg.norm(np.eye(6)[:, 0] - np.eye(6)[:, 1:] @ np.zeros(5))**2, 1)
    v, u = np.eye(3)[0], np.eye(3)[1]
    close(np.linalg.norm(v-u)**2, 2 - 2 * (v @ u))
    for d in (2, 3, 5):
        effects = [ket_density(v) for v in np.eye(d)]
        close([[np.trace(a @ b) for a in effects] for b in effects], np.eye(d))
    # Linear ellipsoid volume in dimension two.
    gram = np.array([[1, .4], [.4, 1]])
    close(np.pi * np.linalg.det(root(gram)), np.pi * np.sqrt(np.linalg.det(gram)))


def cap_geometry(axes, height=.5):
    """Gauss--Bonnet from all oriented feasible small-circle arcs."""
    arcs = []
    turning = []
    for i, normal in enumerate(axes):
        trial = np.eye(3)[np.argmin(abs(normal))]
        u = np.cross(trial, normal)
        u /= np.linalg.norm(u)
        v = np.cross(normal, u)
        radius = np.sqrt(1 - height**2)
        circle = lambda angle: height*normal + radius*(np.cos(angle)*u + np.sin(angle)*v)
        events = []
        for j, other in enumerate(axes):
            if i == j:
                continue
            a, b = radius*(other @ u), radius*(other @ v)
            amplitude = np.hypot(a, b)
            rhs = height * (1 - other @ normal)
            if amplitude > rhs:
                centre = np.arctan2(b, a)
                angle = np.arccos(rhs/amplitude)
                events.extend([((centre-angle) % (2*np.pi), j), ((centre+angle) % (2*np.pi), j)])
        if not events:
            if np.min(axes @ circle(0)) >= height - TOL:
                arcs.append(2*np.pi)
            continue
        events.sort()
        cyclic = events[1:] + [(events[0][0]+2*np.pi, events[0][1])]
        for (lo, _), (hi, end_axis) in zip(events, cyclic):
            if np.min(axes @ circle((lo+hi)/2)) >= height - TOL:
                arcs.append(hi-lo)
                turning.append(np.arccos(np.clip((normal @ axes[end_axis]-height**2)/(1-height**2), -1, 1)))
    if not arcs:
        return 0.0, 0
    return 2*np.pi-height*sum(arcs)-sum(turning), len(turning)


def infeasibility_certificate(axes, height=.5):
    """Find positive weights summing to one with weighted normal norm < height."""
    for count in (2, 3):
        for indices in combinations(range(len(axes)), count):
            rows = axes[list(indices)]
            gram = rows @ rows.T
            if np.linalg.cond(gram) > 1e10:
                continue
            weights = np.linalg.solve(gram, np.ones(count))
            weights /= weights.sum()
            if min(weights) > 0 and np.linalg.norm(weights @ rows) < height - TOL:
                return indices, weights, np.linalg.norm(weights @ rows)
    raise AssertionError("no infeasibility certificate")


def cap_checks():
    angle = np.pi*(3-np.sqrt(5))
    close(np.rad2deg(angle), 137.507764, atol=5e-7)
    polar = np.deg2rad(12+6*np.arange(12))
    azimuth = angle*np.arange(12)
    evaluation_angles = np.r_[polar, (azimuth + np.pi) % (2*np.pi)-np.pi]
    powers = np.arange(25)
    factors = np.array([factorial(i) for i in powers], dtype=float)
    coefficients = (1j**powers)/factors
    exp_series = np.polynomial.polynomial.polyval(evaluation_angles, coefficients)
    error_bound = np.pi**25/factorial(25)
    close(exp_series.real, np.cos(evaluation_angles), atol=error_bound+2e-15)
    close(exp_series.imag, np.sin(evaluation_angles), atol=error_bound+2e-15)
    axes = np.column_stack([np.sin(polar)*np.cos(azimuth),
                            np.sin(polar)*np.sin(azimuth), np.cos(polar)])
    measured = [cap_geometry(axes[:m]) for m in range(1, 10)]
    areas, corners = np.array(measured).T
    expected = [np.pi, 2.297861, 1.802272, 1.412802, 1.049640,
                .720881, .436215, .208320, .054604]
    close(areas, expected, atol=5.1e-7)
    close(corners, [0, 2, 3, 3, 3, 3, 3, 3, 3])
    close(np.linalg.det(axes[:3] @ axes[:3].T), .041133, atol=5e-7)
    logs = np.log(np.r_[4*np.pi, areas[:-1]] / areas)
    close(logs[-1], 1.338960, atol=5e-7)
    close(logs[-1]/np.log(2), 1.931710, atol=5e-7)
    close(logs.sum(), 5.438666, atol=5e-7)
    close(logs.sum(), np.log(4*np.pi/areas[-1]))
    close(areas[2]/areas[-1], 33.0060, atol=5e-5)
    indices, _, norm = infeasibility_certificate(axes[:10])
    assert indices == (7, 8, 9) and norm < .496
    weights = np.array([.2388, .4261, .3351])
    close(weights.sum(), 1)
    rounded_axes = np.round(axes[list(indices)], 5)
    assert np.linalg.norm(weights @ rounded_axes)+np.sqrt(3)*1e-5 < .496
    for degree in (10, 25, 30):
        theta = np.deg2rad(degree)
        rotation = np.array([[np.cos(theta), 0, np.sin(theta)], [0, 1, 0],
                             [-np.sin(theta), 0, np.cos(theta)]])
        if degree == 10:
            dual_areas = []
            for m, area, count, spectrum in [
                (3, 1.570105, 5, [.167199, .456613, 5.376189]),
                (9, .010419, 3, [2.744723, 3.881656, 11.373621]),
            ]:
                both = np.vstack([axes[:m], axes[:m] @ rotation.T])
                actual, corners = cap_geometry(both)
                dual_areas.append(actual)
                close([actual, corners], [area, count], atol=5e-7)
                close(np.linalg.eigvalsh(both.T @ both), spectrum, atol=5e-7)
                block = both @ both.T
                close(np.linalg.eigvalsh(block)[:2*m-3], np.zeros(2*m-3))
            close(np.array(dual_areas)/areas[[2, 8]], [.871181, .190813], atol=5e-7)
            close(dual_areas[0]/dual_areas[1], 150.6932, atol=5e-5)
        else:
            both = np.vstack([axes[:8], axes[:8] @ rotation.T])
            close(cap_geometry(both)[0], {25:.043804, 30:.022659}[degree], atol=5e-7)
            both = np.vstack([axes[:9], axes[:9] @ rotation.T])
            indices, weights, witness_norm = infeasibility_certificate(both)
            assert indices == {25:(7,17), 30:(4,17)}[degree]
            close(weights, [.5,.5])
            close(witness_norm, {25:.498642, 30:.468178}[degree], atol=5e-7)
    close(cap_geometry(np.array([[0., 0., 1.]]))[0], np.pi)
    midpoint = np.array([0., 0., 1.])
    angle = np.pi/3
    pair = np.array([[np.sin(angle), 0, np.cos(angle)], [-np.sin(angle), 0, np.cos(angle)]])
    close(pair @ midpoint, [.5, .5])
    close(np.arccos(pair[0] @ pair[1]), 2*angle)


def thermodynamic_checks():
    gap, beta = .9, 1.6
    heat_operator = gap * Z
    bath = np.diag(np.exp(-beta * np.diag(heat_operator)))
    bath /= np.trace(bath)
    rho_lk = random_density(4)
    # A unitary on L and R preserves the K marginal.
    unitary, _ = np.linalg.qr(RNG.normal(size=(4, 4)) + 1j*RNG.normal(size=(4, 4)))
    unitary = np.einsum("abcd,ij->aibcjd", unitary.reshape(2, 2, 2, 2), I).reshape(8, 8)
    initial = np.kron(rho_lk, bath)
    out = unitary @ initial @ unitary.conj().T
    lk, reservoir = marginal(out, 4, 2), marginal(out, 4, 2, False)
    close(marginal(lk, 2, 2, False), marginal(rho_lk, 2, 2, False))
    heat = np.trace(heat_operator @ (reservoir-bath)).real
    joint_d = relative_entropy(out, np.kron(lk, bath))
    reservoir_d = relative_entropy(reservoir, bath)
    mutual = entropy(lk)+entropy(reservoir)-entropy(out)
    close(beta*heat+entropy(lk)-entropy(rho_lk), joint_d)
    close(mutual+reservoir_d, joint_d)
    assert joint_d >= reservoir_d >= -TOL
    close(relative_entropy(initial, np.kron(rho_lk, bath)), 0)
    correlated = np.diag([bath[0,0], 0, 0, bath[1,1]])
    close(entropy(marginal(correlated, 2, 2)), entropy(bath))
    close(entropy(correlated), entropy(bath))
    # Product pinching via an energy-degenerate controlled copy.
    for theta in np.linspace(0, np.pi/2, 17):
        psi = np.array([np.cos(theta), np.sin(theta)])
        state = ket_density(psi)
        pinched = np.diag(np.diag(state))
        close(np.linalg.norm(state-pinched)**2, .5*np.sin(2*theta)**2)
        close(entropy(pinched)-entropy(state), relative_entropy(state, pinched))
        close(marginal(ket_density(np.array([psi[0],0,0,psi[1]])), 2, 2), pinched)
    close(entropy(I/2), np.log(2))
    for d in (2, 3, 5):
        fourier = np.exp(2j*np.pi*np.outer(np.arange(d), np.arange(d))/d)/np.sqrt(d)
        rho = np.diag(np.arange(1, d+1)/sum(range(1, d+1)))
        out = np.diag(np.diag(fourier.conj().T @ rho @ fourier))
        close(out, np.eye(d)/d)
        close(relative_entropy(rho, out), np.log(d)-entropy(rho))
    close(np.log(12/3), np.log(12/6)+np.log(6/3))


def eraser_checks():
    for d_a, d_e in [(2, 2), (3, 2), (2, 3)]:
        c0 = RNG.normal(size=(d_a, d_e)) + 1j * RNG.normal(size=(d_a, d_e))
        c1 = RNG.normal(size=(d_a, d_e)) + 1j * RNG.normal(size=(d_a, d_e))
        c0, c1 = (c / np.linalg.norm(c) for c in (c0, c1))
        psi_plus = np.r_[c0.ravel(), c1.ravel()]/np.sqrt(2)
        psi_minus = np.r_[c0.ravel(), -c1.ravel()]/np.sqrt(2)
        difference = marginal(ket_density(psi_plus)-ket_density(psi_minus), 2*d_a, d_e)
        overlap = c0 @ c1.conj().T
        sigma0, sigma1 = ((c.conj().T @ c).T for c in (c0, c1))
        close(trace_norm(difference)/2, trace_norm(overlap))
        close(trace_norm(overlap), trace_norm(root(sigma0) @ root(sigma1)))
        assert trace_norm(overlap) < 1
    a0, a1 = np.eye(2)
    e0 = a0
    p = .37
    phase = .7
    for gamma in (0, .3, 1):
        e1 = np.array([gamma, np.sqrt(1-gamma**2)])
        psi = np.r_[np.sqrt(p)*np.kron(a0,e0), np.exp(1j*phase)*np.sqrt(1-p)*np.kron(a1,e1)]
        sa = marginal(ket_density(psi), 4, 2)
        unread = np.zeros((2, 2), dtype=complex)
        for sign in [1, -1]:
            effect = ket_density((a0 + sign*a1)/np.sqrt(2))
            out = marginal(np.kron(I,effect) @ sa, 2, 2)
            close(np.trace(out), .5)
            close(out[0,1], sign*np.exp(-1j*phase)*np.sqrt(p*(1-p))*gamma/2)
            assert 2*abs(out[0,1])/np.trace(out).real <= gamma + TOL
            unread += out
        close(unread, np.diag([p,1-p]))
    close([.5*(-1j)**2, .5*(-1j)**2*1j, .5*(-1j)**2*1j**2], [-.5,-.5j,.5])
    for width in range(17):
        def h(overlap):
            p = np.array([(1-overlap)/2, (1+overlap)/2])
            return entropy(np.diag(p))
        mutual = h(.3**16)+h(.3**width)-h(.3**(16-width))
        if width in (0, 16):
            close(mutual, 0 if width == 0 else 2*h(.3**16))
        if 3 <= width <= 13:
            assert abs(mutual - h(.3**16))/np.log(2) < 5.26e-4
    assert (.027**2/2 + .027**4/(12*(1-.027**2)))/np.log(2) < 5.26e-4
    # Verify the entropy formula independently by a full small bipartition.
    co = [.2, .45, .72]
    for count in range(4):
        left = np.array([1.])
        for value in co[:count]:
            left = np.kron(left, [value, np.sqrt(1-value**2)])
        right = np.array([1.])
        for value in co[count:]:
            right = np.kron(right, [value, np.sqrt(1-value**2)])
        blank = np.zeros(len(left)*len(right))
        blank[0] = 1
        psi = np.r_[np.sqrt(p)*blank, np.sqrt(1-p)*np.kron(left, right)]
        sf = marginal(ket_density(psi), 2*len(left), len(right))
        f = marginal(sf, 2, len(left), False)
        g = np.prod(co[:count])
        eigenvalue = (1-np.sqrt(1-4*p*(1-p)*(1-g*g)))/2
        close(entropy(f), entropy(np.diag([eigenvalue, 1-eigenvalue])))


def agreement_checks():
    left = np.array([[1, 0, 1], [0, 1, 0.]])
    right = np.array([[0, -1, 0], [1, 0, 1.]])
    shared_left, shared_right = left[:, 1:], right[:, :2]
    close(shared_left.T @ shared_left, shared_right.T @ shared_right)
    align = shared_left @ np.linalg.inv(shared_right)
    close(align.T @ align, I)
    glued = np.column_stack([left, align @ right[:, 2]])
    full = glued.T @ glued
    close(full[:3, :3], left.T @ left)
    close(full[1:, 1:], right.T @ right)
    assert np.linalg.matrix_rank(full) == 2
    assert np.linalg.matrix_rank(np.eye(4)) == 4
    for cycle_length in range(4, 14):
        r = 1-1/(2*cycle_length**2)
        assert np.linalg.eigvalsh([[1, r], [r, 1]])[0] > 0
        close(np.sqrt(2-2*r), 1/cycle_length)
        assert (cycle_length-1)/cycle_length < np.sqrt(2+2*r)
    bell = np.array([1, 0, 0, 1])/np.sqrt(2)
    close(marginal(ket_density(bell), 2, 2), I/2)
    assert np.linalg.matrix_rank(ket_density(bell)) == 1
    assert np.linalg.matrix_rank(np.kron(I/2, ket_density(np.eye(2)[0]))) == 2
    correlations = [[np.vdot(bell, np.kron(a, b) @ bell)
                     for b in [(Z+X)/np.sqrt(2), (Z-X)/np.sqrt(2)]] for a in (Z, X)]
    axes = np.array([[1, 0], [0, 1], [1, 1], [1, -1.]])
    axes /= np.linalg.norm(axes, axis=1, keepdims=True)
    close(axes[:2] @ axes[2:].T, correlations)
    close(np.sum(np.array(correlations)*[[1, 1], [1, -1]]), 2*np.sqrt(2))
    signs = np.array(np.meshgrid(*[[-1, 1]]*4)).reshape(4, -1)
    a1, a2, b1, b2 = signs
    close(abs(a1*(b1+b2)+a2*(b1-b2)), np.full(16, 2))
    square = [[np.kron(X,I), np.kron(I,X), np.kron(X,X)],
              [np.kron(I,Z), np.kron(Z,I), np.kron(Z,Z)],
              [np.kron(X,Z), np.kron(Z,X), np.kron(Y,Y)]]
    for index, (a, b, c) in enumerate(square + list(zip(*square))):
        close(a @ b, b @ a)
        close(a @ b @ c, (-1 if index == 5 else 1)*np.eye(4))
    bell_state = ket_density(bell)
    witness = np.eye(4)/4-bell_state/2
    separable_point = bell_state+witness
    poles = [np.array([1., 0.]), np.array([0., 1.])]
    for phase in (1, 1j):
        poles.extend(np.array([1, sign*phase])/np.sqrt(2) for sign in (1,-1))
    product_states = [ket_density(np.kron(ket, ket.conj())) for ket in poles]
    close(sum(product_states)/4, separable_point)
    assert all(np.trace(witness @ product).real >= -TOL for product in product_states)
    close(np.trace(witness @ separable_point), 0)
    close(np.trace(witness @ bell_state), -np.linalg.norm(witness)**2)
    encoded = np.diag([.4, 0, 0, 0, 0, 0, 0, .6])
    f0 = np.kron(I, np.kron((I+Z)/2, I))
    f1 = np.kron(I, np.kron(I, (I+Z)/2))
    close(f0 @ encoded, f1 @ encoded)
    close(f0 @ encoded @ f0 + (np.eye(8)-f0) @ encoded @ (np.eye(8)-f0), encoded)


def barycentre_checks():
    weights = np.array([.2, .3, .5])
    values = np.array([[1., 2, 3], [2., 1, 4], [2., 4, 1]])
    s = weights @ np.sqrt(values)
    for scale in [1, 1/(s @ s)]:
        w = s*s*scale
        transports = np.sqrt(values/w)
        close(weights @ transports, np.full(3, 1/np.sqrt(scale)))
        close(transports**2*w, values)
    scalar = lambda x: ((np.sqrt(x)-1)**2+(np.sqrt(x)-3)**2)/2
    close(scalar(4), 1)
    close(scalar(5), 10-4*np.sqrt(5))
    assert scalar(5) > scalar(4)
    centre = random_density(3)+np.eye(3)
    transport = random_density(3)-np.eye(3)/3
    factors = [np.eye(3)+transport/2, np.eye(3)-transport/2]
    matrices = [factor @ centre @ factor for factor in factors]
    close(sum(factors)/2, np.eye(3))
    centre_root = root(centre)
    inverse_root = np.linalg.inv(centre_root)
    for a, t in zip(matrices, factors):
        close(inverse_root @ root(centre_root @ a @ centre_root) @ inverse_root, t)

    def objective(x):
        return np.mean([np.trace(x+a-2*root(root(a) @ x @ root(a))).real for a in matrices])

    for trial in [centre, centre + .01*np.eye(3), np.diag([.1, 0, .2]), random_density(3)]:
        assert objective(trial) >= objective(centre)-TOL
        for a, t in zip(matrices, factors):
            mixed = 2*np.trace(root(root(a) @ trial @ root(a))).real
            majorant = np.trace(trial @ t + a @ np.linalg.inv(t)).real
            assert mixed <= majorant+TOL
            if trial is centre:
                close(mixed, majorant)
    close(np.linalg.eigvalsh(I/2), [.5, .5])
    close(X @ (I/2) @ X, I/2)


def control_checks():
    for theta in np.linspace(-np.pi, np.pi, 17):
        unitary = np.cos(theta/2)*I - 1j*np.sin(theta/2)*Y
        p, rho = (I+Z)/2, (I+X)/2
        after = unitary @ rho @ unitary.conj().T
        close(np.trace(p @ after), (1-np.sin(theta))/2)
        moved_effect = unitary @ p @ unitary.conj().T
        close(np.trace(moved_effect @ rho), (1+np.sin(theta))/2)
        close(np.trace(p @ unitary @ np.diag(np.diag(rho)) @ unitary.conj().T), .5)
        close(np.trace(p @ np.diag(np.diag(after))), np.trace(p @ after))
        close(np.trace(moved_effect @ after), np.trace(p @ rho))
    p = (I+Z)/2
    q = I-p
    reset = np.array([[0,1],[0,0]])
    close(p.conj().T @ p + reset.conj().T @ reset, I)
    for candidate in (np.diag([1/3,2/3]), random_density(2), X+1j*Y):
        close(reset @ candidate @ reset.T, np.trace(q@candidate)*p)
        close(p @ candidate @ p + reset @ candidate @ reset.T, np.trace(candidate)*p)
    for i in (0, 1):
        p = np.diag(np.eye(2)[i])
        close((X@p).T @ X@p, p)
        close(np.trace(p @ (X @ p @ X)), 0)
        close(np.trace(p @ p), 1)
    angles = np.array([np.pi/3, 2*np.pi/3])
    probes = np.column_stack([np.cos(angles/2), np.sin(angles/2)])
    close(np.arccos(probes @ np.ones(2)/np.sqrt(2)), [np.pi/12]*2)
    outcomes = (1 + .5*np.cos(angles))/2
    close(outcomes, [5/8, 3/8])
    scores = -outcomes*np.log(.75)-(1-outcomes)*np.log(.25)
    close(scores, np.log(4)-outcomes*np.log(3))
    close(np.diff(scores), [np.log(3)/4])
    close(entropy(np.diag([5/8,3/8])), entropy(np.diag([3/8,5/8])))
    close(np.arccos(1/np.sqrt(2)), np.pi/4)
    close(np.eye(3)[:2] @ np.eye(3)[2], [0, 0])
    for count in (1, 2, 20, 2000):
        angle_budget = 1.2
        success = np.cos(angle_budget/count)**(2*count)
        assert 1-success <= angle_budget**2/count + TOL
    number = 8
    axes = RNG.normal(size=(number, 3))
    axes /= np.linalg.norm(axes, axis=1, keepdims=True)
    initial = np.array([.3, .4, .5])
    projectors = [np.outer(axis, axis) for axis in axes]
    mean = sum(projectors)/number
    close(np.trace(mean), 1)
    close(sum(np.outer(axis, axis) for axis in np.eye(3))/3, np.eye(3)/3)
    for strength in (0, .6, 1):
        channels = [strength*np.eye(3) + (1-strength)*p for p in projectors]
        mean_step = strength*np.eye(3) + (1-strength)*mean
        explicit_two_step = sum(a @ b @ initial for a in channels for b in channels)/number**2
        close(explicit_two_step, mean_step @ mean_step @ initial)
        current = initial.copy()
        for p, channel in zip(projectors, channels):
            new = channel @ current
            close(current @ current-new @ new, (1-strength**2)*np.linalg.norm(current-p@current)**2)
            current = new
        if strength == 0:
            coverage = sum(np.linalg.norm(initial-p@initial)**2 for p in projectors)
            assert initial @ initial-current @ current >= 2*coverage/(number*(number+1))
    n, m = axes[:2]
    close(projectors[0] @ projectors[1]-projectors[1] @ projectors[0],
          (n@m)*(np.outer(n,m)-np.outer(m,n)))
    close(X @ Z, -Z @ X)
    ref = np.array([[.3, .1], [.2, .4]])
    q = np.array([.4, .6])
    evidence = ref[0].sum()
    close(q @ np.log(q/ref[0]), q @ np.log(q/(ref[0]/evidence))-np.log(evidence))
    for beta in [.25, .5, .75]:
        close(np.sign(2-1/beta), np.sign(beta-.5))


def holonomy_checks():
    u = np.exp(1j * np.array([.23, .78, -.37]))
    phases = np.array([1, u[0], u[0]*u[1]])
    gauge = np.exp(1j*np.array([0, -1.3, 0]))
    transformed = gauge[[1, 2, 0]] * u / gauge[[0, 1, 2]]
    new_phases = np.array([1, transformed[0], transformed[0]*transformed[1]])
    close(new_phases, gauge * phases)
    close([np.prod(u), phases[2]], [np.prod(transformed), new_phases[2]])
    close(len([np.prod(u), phases[2]]), 3+2-3)
    x, y, z = [ket_density(v) for v in
               (np.array([1.,1.])/np.sqrt(2), np.array([1,1j])/np.sqrt(2), np.array([1.,0]))]
    close(np.trace(x@y@z), (1+1j)/4)
    close(np.trace(z@y@x), (1-1j)/4)
    close(np.angle(np.trace(x@y@z)), np.pi/4)
    for _ in range(9):
        directions = RNG.normal(size=(3,3))
        directions /= np.linalg.norm(directions, axis=1, keepdims=True)
        a, b, c = directions
        pa, pb, pc = [(I+np.einsum('a,aij->ij', d, PAULI))/2 for d in directions]
        close(np.trace(pa@pb@pc), (1+a@b+b@c+c@a+1j*(a@np.cross(b,c)))/4)
    theta = .84
    length = 2*np.pi*np.sin(theta)
    assert np.pi*(1-np.cos(theta)) <= length/2*np.tan(length/4)
    for count in (200, 2000):
        phi = np.linspace(0, 2*np.pi, count, endpoint=False)
        psi = np.column_stack([np.full(count,np.cos(theta/2)), np.sin(theta/2)*np.exp(1j*phi)])
        product = np.prod(np.sum(psi.conj()*np.roll(psi,-1,axis=0), axis=1))
        close(np.angle(product), np.pi*(1-np.cos(theta)), atol=4e-4 if count == 200 else 4e-6)
    for phi in np.linspace(0, 2*np.pi, 8):
        n = np.array([np.sin(theta)*np.cos(phi), np.sin(theta)*np.sin(phi), np.cos(theta)])
        velocity = np.array([-n[1], n[0], 0])
        acceleration = np.array([-n[0], -n[1], 0])
        p = (I+np.einsum('a,aij->ij', n, PAULI))/2
        dot = np.einsum('a,aij->ij', velocity, PAULI)/2
        ddot = np.einsum('a,aij->ij', acceleration, PAULI)/2
        h = 1j*(dot@p-p@dot)
        dh = 1j*(ddot@p-p@ddot)
        close(h@p-p@h, 1j*dot)
        close([np.trace(p@h), np.trace(p@dh)], [0,0])
        close(np.sqrt(np.trace(p@h@h)), np.linalg.norm(velocity)/2)
    for scale in (.05, .2, .7):
        square = np.array([[0,0], [scale,0], [scale,scale], [0,scale]])
        steps = np.roll(square, -1, axis=0)-square
        close(np.sum(abs(steps)), 4*np.sqrt(np.sum(square[:,0]*steps[:,1])))


def elimination_checks():
    grid = np.arange(2, 7)
    adjacency = ((grid[:, None] % grid[None, :]) == 0)
    np.fill_diagonal(adjacency, False)
    adjacency = adjacency | adjacency.T
    laplacian = np.diag(adjacency.sum(axis=1))-adjacency
    matrix = laplacian + np.eye(5)/4
    trial = RNG.normal(size=5)
    edges = zip(*np.where(np.triu(adjacency,1)))
    close(trial @ matrix @ trial,
          sum((trial[i]-trial[j])**2 for i,j in edges)+trial@trial/4)
    for order in ((2,3,4), (4,3,2)):
        reduced = matrix.copy()
        live = list(grid)
        for index, vertex in enumerate(order):
            pivot = live.index(vertex)
            keep = [i for i in range(len(live)) if i != pivot]
            column = reduced[keep,pivot]
            if order[0] == 4:
                assert np.count_nonzero(column) == 1
            reduced = reduced[np.ix_(keep,keep)]-np.outer(column,column)/reduced[pivot,pivot]
            live.pop(pivot)
            if index == 0 and vertex == 2:
                close(reduced[live.index(4), live.index(6)], -4/9)
        close(reduced, np.diag([1/4,441/580]))
    grid = np.arange(2, 15)
    adjacency = (grid[:,None] % grid[None,:]) == 0
    adjacency = adjacency | adjacency.T
    np.fill_diagonal(adjacency, False)
    degree = adjacency.sum(axis=1)
    laplacian = np.diag(degree)-adjacency
    gram = laplacian+np.eye(len(grid))/4
    terminals = grid > .75*grid[-1]
    a = gram[np.ix_(~terminals,~terminals)]
    b = gram[np.ix_(~terminals,terminals)]
    c = gram[np.ix_(terminals,terminals)]
    schur = c-b.T@np.linalg.solve(a,b)
    approximate = np.diag(np.diag(schur))
    rhs = np.ones(terminals.sum())
    solution = np.linalg.solve(approximate,rhs)
    extended = np.r_[-np.linalg.solve(a,b@solution), solution]
    residual = gram@extended - np.r_[np.zeros(len(a)),rhs]
    close(residual, np.r_[np.zeros(len(a)),(schur-approximate)@solution])
    lazy = np.eye(len(grid))-laplacian/(1+max(degree))
    close(lazy.sum(axis=1), np.ones(len(grid)))
    assert min(np.linalg.eigvalsh(lazy)) > -1
    reachable = adjacency | np.eye(len(grid), dtype=bool)
    power = lazy.copy()
    for j in range(5):
        close(np.linalg.norm(power,2), 1)
        assert np.array_equal(power > 0, reachable)
        if j > 0:
            assert min(np.linalg.eigvalsh(power)) >= -TOL
        power = power @ power
        reachable = reachable @ reachable
    centroid = np.ones(3)/np.sqrt(3)
    for vec, expected in [([2,2,1], [2/27,8/9,4/9]), ([1,2,-2], [26/27,5/9,1/9])]:
        q = np.array(vec)/3
        close(q@q, 1)
        close([1-(centroid@q)**2, 1-q[2]**2, q[0]**2], expected)


if __name__ == "__main__":
    for check in (gram_checks, cap_checks, thermodynamic_checks, eraser_checks,
                  agreement_checks, barycentre_checks, control_checks, holonomy_checks,
                  elimination_checks):
        check()
        print(f"PASS {check.__name__.replace('_', ' ')}")
    print("All 9 check groups passed.")
