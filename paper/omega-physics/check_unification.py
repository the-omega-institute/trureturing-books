#!/usr/bin/env python3
"""Numerical and finite algebra checks for the unification section (sec:unification), vendored from module n8. Requires NumPy."""

import numpy as np


def close(actual, expected, *, rtol=1e-11, atol=1e-12):
    np.testing.assert_allclose(actual, expected, rtol=rtol, atol=atol)


def entropy(weights):
    positive = np.asarray(weights)[np.asarray(weights) > 0]
    return -np.dot(positive, np.log(positive))


def unit(rows, cols, row, col):
    matrix = np.zeros((rows, cols))
    matrix[row, col] = 1
    return matrix


def test_running():
    # Each row is the index of an individual Weyl multiplet, with spectators.
    low_fermions = [
        (1 / 10, 3 / 2, 1), (4 / 5, 0, 1 / 2),
        (1 / 5, 0, 1 / 2), (3 / 10, 1 / 2, 0), (3 / 5, 0, 0),
    ]
    left_right_fermions = [
        (1 / 4, 3 / 2, 0, 1), (3 / 4, 1 / 2, 0, 0),
        (1 / 4, 0, 3 / 2, 1), (3 / 4, 0, 1 / 2, 0),
    ]
    ps_fermions = [(1, 2, 0), (1, 0, 2)]
    for rows in (low_fermions, left_right_fermions, ps_fermions):
        close(3 * np.sum(rows, axis=0), 6)
    low = -(11 / 3) * np.array([0, 2, 3]) + 4 + np.array([3 / 10, 1 / 2, 0]) / 3
    lr = (-(11 / 3) * np.array([0, 2, 2, 3]) + 4
          + np.array([0, 1, 1, 0]) / 6 + np.array([3 / 4, 0, 1 / 2, 0]) / 3)
    ps = (-(11 / 3) * np.array([4, 2, 2]) + 4
          + np.array([4, 1, 1]) / 6 + np.array([1, 0, 2]) / 3)
    close(low, [41 / 10, -19 / 6, -7])
    close(lr, [17 / 4, -19 / 6, -3, -7])
    close(ps, [-29 / 3, -19 / 6, -5 / 2])
    close(ps + [0, 1 / 6, 1 / 6], [-29 / 3, -3, -7 / 3])
    x_generator = np.array([1, 1, 1, -3]) / (2 * np.sqrt(6))
    close(np.dot(x_generator, x_generator), 1 / 2)
    close(np.sqrt(2 / 3) * x_generator, [1 / 6, 1 / 6, 1 / 6, -1 / 2])
    close(.5 + np.sqrt(2 / 3) * x_generator[-1], 0)
    mz, electromagnetic_inverse, sine_squared = 91.1879, 127.95, .23122
    fits = [
        (lr, .1180, (1.2928e10, 9.7068e16, 47.0233)),
        (lr + [0, 1 / 6, 1 / 6, 0], .1180, (2.5798e10, 5.1653e16, 46.3205)),
        (lr, .1177, (1.3266e10, 9.3691e16, 47.0055)),
    ]
    for slopes, strong, expected in fits:
        data = np.array([.6 * (1 - sine_squared) * electromagnetic_inverse,
                         sine_squared * electromagnetic_inverse, 1 / strong])
        projection = np.array([.6 * slopes[2] + .4 * slopes[0], slopes[1], slopes[3]])
        matrix = np.column_stack((low, projection, np.ones(3)))
        x, y, inverse = np.linalg.solve(matrix, data)
        assert x > 0 and y > 0
        mr, mps = mz * np.exp(2 * np.pi * np.array([x, x + y]))
        close([mr, mps, inverse], expected, rtol=4e-5)
        lower_couplings = data - low * x
        upper_couplings = inverse + slopes * y
        assert np.all(lower_couplings > 0) and np.all(upper_couplings > 0)
        close(lower_couplings, [.6 * upper_couplings[2] + .4 * upper_couplings[0],
                                upper_couplings[1], upper_couplings[3]])
        close(np.linalg.matrix_rank(matrix), 3)
        if slopes[1] == lr[1]:
            log_length = (data[1] - data[2]) * 6 / 23
            close(projection, [-1 / 10, -19 / 6, -7])
            close(x + y, log_length)
            close(x, (data[0] - data[1] - (46 / 15) * log_length) / (21 / 5))
            close(inverse, data[2] + 7 * log_length)
        else:
            differences = matrix[:-1, :2] - matrix[1:, :2]
            close(np.linalg.det(differences), 527 / 30)
            close([x, y], [3.0972580, 2.3093001], atol=6e-8)
    data = np.array([.6 * (1 - sine_squared) * electromagnetic_inverse,
                     sine_squared * electromagnetic_inverse, 1 / .1180])
    crossing_logs = np.diff(data) / np.diff(low)
    assert not np.isclose(*crossing_logs)
    close(mz * np.exp(2 * np.pi * crossing_logs), [1.031e13, 9.7068e16], rtol=6e-4)
    close([2.9872913, 2.5196712], [(data[0] - data[1] - 46 / 15 * crossing_logs[1])
                                    / (21 / 5),
                                    crossing_logs[1] - 2.9872912897497983], atol=6e-8)
    # Chain rule from beta_g to beta_{alpha^{-1}} at both loop orders.
    g = np.array([.7, 1.1, .4])
    b, cross, yukawa = -3, np.array([1.2, -2.1, 4.0]), .35
    beta_g = b * g[0]**3 / (16 * np.pi**2)
    beta_g += g[0]**3 * (cross @ g**2 - yukawa) / (16 * np.pi**2)**2
    beta_inverse = -b / (2 * np.pi) - cross @ (g**2 / (4 * np.pi)) / (8 * np.pi**2)
    beta_inverse += yukawa / (32 * np.pi**3)
    close(-8 * np.pi * beta_g / g[0]**3, beta_inverse)


def test_traces_and_anomalies():
    for colors in range(2, 17):
        doublet_trace = (colors + 1) / 2
        q_up, q_down = (1 + colors) / (2 * colors), (1 - colors) / (2 * colors)
        electric_trace = 2 * (1 + colors * (q_up**2 + q_down**2))
        normalized = doublet_trace / electric_trace
        fixed = doublet_trace / (2 * (1 + colors * (4 / 9 + 1 / 9)))
        close(normalized, colors / (2 * (colors + 1)))
        close(fixed, 9 * (colors + 1) / (4 * (9 + 5 * colors)))
        close(normalized - fixed, (colors**2 - 9) / (4 * (colors + 1) * (9 + 5 * colors)))
        close((electric_trace - doublet_trace) / doublet_trace, (colors + 2) / colors)
        close((colors + 1) / 4, doublet_trace / (4 * .5))
        if colors % 2:
            quark_counts = (np.array([colors + 1, colors - 1]) / 2,
                            np.array([colors - 1, colors + 1]) / 2)
            close(np.array(quark_counts) @ [q_up, q_down], [1, 0])
        for q, t, w in [(0, .25, .75), (.25, 1, 1), (.25, 1, -1), (.27, -.31, .19)]:
            u, d, l = -q + t, -q - t, -colors * q
            e, n = colors * q + w, colors * q - w
            close([2 * q + u + d, colors * q + l,
                   colors * (2 * q + u + d) + 2 * l + e + n], 0)
            cubic = colors * (2 * q**3 + u**3 + d**3) + 2 * l**3 + e**3 + n**3
            close(cubic, 6 * colors * q * (w - t) * (w + t))
        q, u, d, l, e = 1 / 6, -2 / 3, 1 / 3, -colors / 6, colors / 3
        close(colors * (2 * q**3 + u**3 + d**3) + 2 * l**3 + e**3,
              colors * (colors**2 - 9) / 36)
        q = .21
        close([q + .5 + (-q - .5), q - .5 + (-q + .5),
               -colors * q - .5 + (colors * q + .5),
               -colors * q + .5 + (colors * q - .5)], 0)
    close((1 / 2) / (1 / 2 + 2 * (1 / 2)**2), .5)
    close((3 + 1) / (2 + 1 + 1), 1)
    close(3 / (2 * (3 + 1)), 3 / 8)


def test_gauge_examples():
    x = np.array([[0, 1], [1, 0]])
    z = np.diag([1, -1])
    h = 3 * z + 4 * x
    close(z @ x + x @ z, 0)
    close(h @ h, 25 * np.eye(2))
    close(np.linalg.eigvalsh(h), [-5, 5])
    eigenvectors = np.array([[2, 1], [1, -2]]) / np.sqrt(5)
    close(h @ eigenvectors, eigenvectors * [5, -5])
    phase = .31
    propagator = np.cos(phase) * np.eye(2) - 1j * np.sin(phase) * h / 5
    close(abs(propagator[1, 0])**2, 16 / 25 * np.sin(phase)**2)
    u = np.diag(np.exp(1j * np.array([.2, .6])))
    transported = u @ x @ u.conj().T
    close(u @ x - x @ u, (transported - x) @ u)
    j = 1j * x
    close(j.conj().T @ j, np.eye(2))
    close(-j @ j, np.eye(2))
    angles = np.array([.002, .003])
    close(np.sum(1 - np.cos(angles)), np.sum(angles**2) / 2, rtol=8e-7)
    close(2 * np.pi - np.array([3, 6]) * np.pi / 2, [np.pi / 2, -np.pi])
    nodes = np.arange(3, 14)
    close(nodes * (nodes - 1) / 2 - 3 * nodes + 6, (nodes - 3) * (nodes - 4) / 2)
    close(3 * (1 / 6) - .5, 0)
    close(3 * (1 / 3), 1)
    action = 2 * np.pi * .23122 * 127.95
    close(action, 185.9, atol=.05)
    close(np.exp(-action), 1.9e-81, rtol=.03, atol=0)
    close(np.exp(-2 * action), 3.5e-162, rtol=.02, atol=0)
    mr, mps, proton_mass = 1.29275555e10, 9.70679625e16, .938
    hbar_per_year = 6.5821e-25 / 3.15576e7
    lifetimes = hbar_per_year * np.array([mps, mr, 1.22e19])**4 / proton_mass**5
    close(lifetimes, [2.55e36, 8.0e8, 6.4e44], rtol=.025, atol=0)
    close((2.4e34 * proton_mass**5 / hbar_per_year)**.25, 3.0e16, rtol=.01)
    light_mass = .050e-9
    dirac_mass = np.sqrt(light_mass * (mr + light_mass))
    close(dirac_mass, .804, rtol=.001)
    close(dirac_mass / 174, .00462, rtol=.001)
    # Stable form of the smaller eigenvalue avoids subtracting close large numbers.
    close(2 * 100**2 / (mr + np.hypot(mr, 200)) * 1e9, 774, rtol=.001)
    majorana_mass = mr**2 / mps
    close(majorana_mass, 1.72e3, rtol=.002)
    close(np.sqrt(light_mass * (majorana_mass + light_mass)), 2.93e-4, rtol=.002)


def test_clocks():
    rng = np.random.default_rng(8)
    pauli = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])
    for fraction in [0, .2, .8, .99, 1]:
        direction = rng.normal(size=3)
        r = fraction * direction / np.linalg.norm(direction)
        density = (np.eye(2) + np.einsum("i,ijk->jk", r, pauli)) / 2
        lapse = np.sqrt(1 - fraction**2)
        eigenvalues, base = np.linalg.eigh(density)
        root = (base * np.sqrt(np.maximum(eigenvalues, 0))) @ base.conj().T
        close(root @ root.conj().T, density)
        close(4 * np.linalg.det(density), lapse**2)
        close(4 * abs(np.linalg.det(root))**2, lapse**2)
        close(fraction**2 + lapse**2, 1)
    close(np.hypot(0, .5), .5)
    assert .5 < 1
    boosted = np.array([[np.cosh(.6), np.sinh(.6)], [np.sinh(.6), np.cosh(.6)]])
    metric = np.diag([1, -1])
    close(boosted.T @ metric @ boosted, metric)
    vector = np.array([1., .8])
    close((boosted @ vector) @ metric @ (boosted @ vector), 1 - .8**2)
    u, v = rng.normal(size=(2, 6))
    gram = np.dot(u, u) * np.dot(v, v) - np.dot(u, v)**2
    minor_sums = np.sum(np.triu((np.outer(u, v) - np.outer(v, u))**2, 1))
    close(gram, minor_sums)
    for sign in [-1, 1]:
        null = np.r_[sign * np.linalg.norm(u), u]
        close(null[0]**2 - np.dot(null[1:], null[1:]), 0)
    omega = 3
    time = np.pi / omega
    evolved = np.array([np.cos(omega * time / 2), -1j * np.sin(omega * time / 2)])
    close(abs(evolved[0])**2, 0)
    delta_energy = omega / 2
    close(time, np.pi / (2 * delta_energy))
    angles = np.arccos(np.abs(np.eye(2) @ (np.ones(2) / np.sqrt(2))))
    close(angles.sum(), np.pi / 2)
    close(angles, np.pi / 4)
    close(np.sum(np.full(11, np.pi / 4)), 11 * np.pi / 4)
    hops = rng.normal(size=(20, 3))
    length = np.linalg.norm(hops, axis=1)
    assert np.linalg.norm(hops.sum(axis=0)) <= length.sum() <= 20 * length.max()
    close(2 * (3 * 7 / 2), 3 * 7)
    beta = np.array([0, .8, 0, .6, 0])
    eta = np.array([0, 0, .4, .36, 1])
    rates = np.sqrt((1 - eta) * (1 - beta**2))
    close(rates, [1, .6, np.sqrt(.6), .64, 0])
    close(np.round(1 / (20 * rates[:-1]), 4), [.0500, .0833, .0645, .0781])
    close([1 / 2.5, rates[3]**2, 1 - rates[3]**2], [.4, .4096, .5904])
    close((rates[:-1] * 3) / (rates[:-1] * 4), 3 / 4)
    radius, g, c, hbar = 4, 2, 3, .5
    saturated_mass = radius * c**2 / (2 * g)
    length_sq = hbar * g / c**3
    close(2 * g * saturated_mass / c**2, radius)
    close(2 * np.pi * radius * saturated_mass * c / hbar,
          (4 * np.pi * radius**2) / (4 * length_sq))


def test_networks():
    def flow(left, right):
        return sum(np.kron(a, b) for a, b in zip(left, right))

    left = [np.eye(2, 3), unit(2, 3, 0, 2), unit(2, 3, 1, 2)]
    right = [np.eye(3, 2), unit(3, 2, 2, 0), unit(3, 2, 2, 1)]
    bridge = flow(left, right)
    close(bridge.T @ bridge, np.eye(6))
    close(np.argmax(bridge, axis=0), [0, 1, 3, 4, 2, 5])
    close(entropy(np.linalg.svd(bridge, compute_uv=False)**2 / 6), np.log(6))
    odd_right = [np.eye(5, 3), unit(5, 3, 3, 0),
                 unit(5, 3, 3, 1) + unit(5, 3, 4, 2)]
    bridge = np.sqrt(2) * flow(left, odd_right)
    close(bridge.T @ bridge, 2 * np.eye(9))
    close(np.argmax(bridge, axis=0), [0, 1, 2, 5, 6, 7, 3, 8, 9])
    close(entropy(np.linalg.svd(bridge, compute_uv=False)**2 / 18), np.log(9))
    left = [unit(1, 5, 0, i) for i in range(3)]
    right = [unit(5, 1, i, 0) for i in range(3)]
    close(np.linalg.matrix_rank(flow(left, right)), 3)
    for d, expected in [(2, 4), (3, 6), (4, 6)]:
        capacities = [12, 2 * d, 6]
        assert min(capacities) == expected
        close(np.min(np.log(capacities)), np.log(expected))
    for a, b, c, d, capacity in [(2, 5, 2, 5, 10), (3, 5, 3, 5, 15)]:
        assert 0 < a <= b and 0 < c <= d
        assert a*a + b*b <= 3*a*b and c*c + d*d <= 3*c*d
        assert min(3*a*c, a*d, b*c) == capacity
        assert b > 2*a or 3*a < 2*b and d < 2*c
        rng = np.random.default_rng(a)
        # A full-rank sample is a control, not the exclusion proof.
        bridge = flow(rng.normal(size=(3, a, b)), rng.normal(size=(3, d, c)))
        singular_values = np.linalg.svd(bridge, compute_uv=False)
        assert np.linalg.matrix_rank(bridge) == capacity
        weights = singular_values**2 / np.dot(singular_values, singular_values)
        assert entropy(weights) < np.log(capacity)
    for k in range(1, 25):
        a, b, c, d = 2*k, 5*k, 2*k, 5*k
        assert b > 2*a and d < 3*c and min(3*a*c, a*d, b*c) == 10*k*k
        # For this scaling each side of the bipartition has dimension 10 k^2.
        close((3*a-b)**2 + a*a - 3*(3*a-b)*a, a*a+b*b-3*a*b)
        assert 0 < 3*a-b <= a and a+c < b+d
    matrices = []
    for rows, cols in [(range(3), range(3)), (range(3), range(3, 6)),
                       (range(3, 5), range(2)), (range(3, 5), range(2, 4)),
                       (range(3, 5), range(4, 6))]:
        partial = sum(unit(5, 6, a, b) for a, b in zip(rows, cols))
        matrices.append(partial)
    routed = flow(matrices, [m.T for m in matrices])
    close(routed.conj().T @ routed, np.eye(30))
    close(routed @ routed.conj().T, np.eye(30))
    realigned = routed.reshape(5, 6, 6, 5).transpose(0, 2, 1, 3).reshape(30, 30)
    close(np.linalg.matrix_rank(realigned), 5)
    ghz = np.zeros((2, 32))
    ghz[:, 0] = 1 / np.sqrt(2)
    ghz[:, -1] = [1 / np.sqrt(2), -1 / np.sqrt(2)]
    close(ghz @ ghz.T, np.eye(2))
    for kept in [(0, 1, 2), (1, 2, 3), (0, 2, 4)]:
        order = kept + tuple(i for i in range(5) if i not in kept)
        matrices = [state.reshape([2] * 5).transpose(order).reshape(8, 4) for state in ghz]
        close(matrices[0] @ matrices[0].T, matrices[1] @ matrices[1].T)
        phased = np.exp(.31j) * matrices[0]
        close(phased @ phased.conj().T, matrices[0] @ matrices[0].T)


def test_entropy_and_gravity():
    reference = np.array([.2, .3, .5])
    k_modular = -np.log(reference)
    directions = np.array([.3, -.4, .1])
    actual = reference + .01 * directions
    relative = np.dot(actual, np.log(actual / reference))
    close(entropy(actual) - entropy(reference),
          (actual - reference) @ k_modular - relative)
    dt = 1e-5
    close((entropy(reference + dt * directions) - entropy(reference - dt * directions))
          / (2 * dt), directions @ k_modular, atol=2e-11)
    singular_steps = 10.**(-np.arange(2, 9))
    quotients = np.array([entropy([1 - e, e]) / e for e in singular_steps])
    assert np.all(np.diff(quotients) > 0)
    close(quotients[-1] + np.log(singular_steps[-1]), 1, atol=1e-8)
    for m in range(1, 7):
        close(entropy(np.full(2**m, 2.**(-m))), m * np.log(2))
        close((-np.log(2.**(-m))) * directions.sum(), 0)
    bell = np.eye(2) / np.sqrt(2)
    close(bell @ bell.T, np.eye(2) / 2)
    close(bell.T, bell)
    pure_pair = bell.ravel()
    close(entropy(np.linalg.eigvalsh(np.outer(pure_pair, pure_pair))), 0)
    spins = 2 * np.indices([2] * 3).reshape(3, -1) - 1
    h = sum(spins[i] * spins[j] for i, j in [(0, 1), (0, 2), (1, 2)])
    probabilities = np.exp(-.27 * h)
    probabilities /= probabilities.sum()
    close(-np.log(probabilities) + np.log(probabilities).mean(), .27 * h)
    assert np.ptp(h) > 0
    theta = .7
    for _ in range(100):
        theta = np.cos(theta)
    close(theta, np.cos(theta))
    q = np.sin(theta)**2
    h = entropy([1 - q, q])
    gap = 2 * np.log(1 / np.tan(theta))
    close(gap, np.log((1 - q) / q))
    close(np.exp(-gap) / (1 + np.exp(-gap)), q)
    close((1 - q)**2 + q**2, 1 - 2 * q * (1 - q))
    close(np.log(2) - h, np.dot([1 - q, q], np.log([2 * (1 - q), 2 * q])))
    close([np.log(2) / gap, h / gap, 6*h], [3.736288, 3.713198, 4.133181], atol=7e-7)
    for j in range(13):
        cut = sum((i <= j) != (13-i <= j) for i in range(1, 7))
        close(cut, min(j, 12-j))
        if cut:
            distribution = np.array([1.])
            for _ in range(cut):
                distribution = np.kron(distribution, [1 - q, q])
            close(entropy(distribution), cut * h)
    close(entropy([1, 0]), 0)
    close(entropy([.5, .5]), np.log(2))
    radius = .013
    nodes, weights = np.polynomial.legendre.leggauss(12)
    r = radius * (nodes + 1) / 2
    volume_element = (radius / 2) * weights * r**2 * (4 * np.pi)
    curvature = -.8
    volume = np.dot(volume_element, 1 - curvature*r**2/18)
    close(volume, 4*np.pi * (radius**3/3-curvature*radius**5/90))
    area = 4*np.pi * radius**2 * (1 - curvature*radius**2/18)
    close(area, 4*np.pi * (radius**2-curvature*radius**4/18))
    coefficient = 4*np.pi/15 * radius**4
    close(np.dot(volume_element, (radius**2-r**2)/(2*radius)), coefficient)
    area_at_fixed_volume = 4*np.pi*radius**4 * (-1/18 + 2/90)
    close(area_at_fixed_volume, -coefficient/2)
    close(8 * np.pi / (4 * .7 * 1.2), (2 * np.pi / .7) / 1.2)
    test_radius, angle = .007, .002
    cylinder = (np.cos(angle) - np.cos(test_radius)) / np.sin(test_radius)
    close(cylinder, (test_radius**2-angle**2)/(2*test_radius), rtol=5e-6)
    close((np.cos(test_radius) - np.cos(test_radius)) / np.sin(test_radius), 0)
    close(-np.sin(np.array([-test_radius, test_radius])) / np.sin(test_radius), [1, -1])


if __name__ == "__main__":
    for check in (test_running, test_traces_and_anomalies, test_gauge_examples,
                  test_clocks, test_networks, test_entropy_and_gravity):
        check()
        print(f"PASS {check.__name__}")
