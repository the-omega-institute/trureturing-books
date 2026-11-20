"""Numerical checks for the observer, horizon, divergence and fluid sections (vendored from module n9)."""
import numpy as np


def check_updates_and_channels():
    equal = np.testing.assert_allclose
    rng = np.random.default_rng(409)
    eye = np.eye(2, dtype=complex)
    x = np.array([[0, 1], [1, 0]], dtype=complex)
    y = np.array([[0, -1j], [1j, 0]], dtype=complex)
    z = np.diag([1, -1])
    pauli = np.stack([x, y, z])
    ex, ey, ez = np.eye(3)

    def sigma(r):
        return np.einsum("i,ijk->jk", r, pauli)

    def rho(r):
        return (eye + sigma(r)) / 2

    def distance(a, b):
        return np.linalg.svd(a - b, compute_uv=False).sum() / 2

    def state():
        direction = rng.normal(size=3)
        return rng.random() * direction / np.linalg.norm(direction)

    def retention(n, c):
        return c * np.eye(3) + (1 - c) * np.outer(n, n)

    half_damping = np.diag([2**-0.5, 2**-0.5, 0.5])
    for _ in range(50):
        r, s = state(), state()
        equal(sigma(r) @ sigma(s), np.dot(r, s) * eye + 1j * sigma(np.cross(r, s)))
        equal(np.trace(rho(ez) @ rho(r)), (1 + r[2]) / 2)
        equal(distance(rho(r), rho(s)), np.linalg.norm(r - s) / 2)
        for c in [-1, -0.6, 0, 0.7, 1]:
            output = ((1 + c) * rho(r) + (1 - c) * z @ rho(r) @ z) / 2
            equal(output, rho(retention(ez, c) @ r), atol=1e-14)
        for lam in [-1 / 3, -0.1, 0, 0.5, 1]:
            output = ((1 + 3 * lam) * rho(r) + (1 - lam) *
                      sum(p @ rho(r) @ p for p in pauli)) / 4
            equal(output, rho(lam * r), atol=1e-14)
        for gamma in [0, 0.15, 0.5, 1]:
            a = 1 - gamma
            k0 = np.diag([1, np.sqrt(a)])
            k1 = np.array([[0, np.sqrt(gamma)], [0, 0]])
            equal(k0.T @ k0 + k1.T @ k1, eye)
            output = k0 @ rho(r) @ k0.T + k1 @ rho(r) @ k1.T
            equal(output, rho(np.diag([np.sqrt(a), np.sqrt(a), a]) @ r + gamma * ez))
            assert distance(output, k0 @ rho(s) @ k0.T + k1 @ rho(s) @ k1.T) <= (
                np.sqrt(a) * distance(rho(r), rho(s)) + 1e-14
            )
            if a > 0:
                u = r[2]
                next_u = a * u + gamma
                ratio = a * (1 - u*u) / (1 - next_u*next_u)
                equal(ratio, (1 + u) / (1 + next_u))
                assert ratio <= 1 + 1e-14
            for ell in [0, np.sqrt(a), -np.sqrt(a)]:
                image = np.array([ell * r[0], ell * r[1], a * r[2] + 1 - a])
                assert np.linalg.norm(image) <= 1 + 1e-14

    for c in [-0.8, 0, 0.4, 1]:
        equal(np.linalg.norm(retention(ez, c), 2), 1)
    aligned = retention(ez, 0.5)
    tilted = retention((ex + ez) / np.sqrt(2), 0.75)
    assert np.linalg.norm(aligned @ tilted, 2) < 1
    for n, m in [(ex, ez), (ex, (ex + ez) / np.sqrt(2)), (ex, ex), (ex, -ex)]:
        first = retention(n, 0)
        second = retention(m, 0)
        for k in range(1, 8):
            equal(np.linalg.norm(np.linalg.matrix_power(first @ second, k), 2),
                  abs(np.dot(n, m)) ** (2*k - 1), atol=1e-15)

    a, b = half_damping, retention(ex, 0.5)
    u, v = 0.5 * ez, np.zeros(3)
    point = np.linalg.solve(np.eye(3) - a @ b, a @ v + u)
    other = b @ point + v
    equal(a @ other + u, point)
    pair_x, pair_y = ex, -ex
    for _ in range(220):
        pair_x, pair_y = a @ pair_y + u, b @ pair_x + v
    equal(pair_x, point, atol=1e-13)
    equal(pair_y, other, atol=1e-13)

    values = [0.1]
    for _ in range(100):
        values.append(np.cos(values[-1]))
    equal(values[-1], 0.73908513, atol=5e-9, rtol=0)
    equal(values[1:6], [0.995004, 0.544499, 0.855387, 0.655927, 0.792483],
          atol=5e-7, rtol=0)
    equal(values[2:11:2], [0.544499, 0.655927, 0.702079, 0.722420, 0.731547],
          atol=5e-7, rtol=0)
    errors = np.asarray(values[:21]) - values[-1]
    assert np.all(errors[1:] * errors[:-1] < 0)
    assert np.all(np.diff(errors[::2]) > 0)
    equal(np.cos(-values[-1]), values[-1])
    equal(errors[20] / errors[19], -np.sqrt(1 - values[-1]**2), atol=5e-4)
    equal(errors[20] / errors[18], 1 - values[-1]**2, atol=5e-4)
    grid = np.linspace(-10, 10, 2001)
    assert np.max(abs(np.sin(np.cos(grid)) * np.sin(grid))) <= np.sin(1)
    revision = lambda s, p: (s & p) or p
    assert revision(revision({0}, {1, 2}), {0, 1}) == {1}
    assert revision(revision({0}, {0, 1}), {1, 2}) == {1, 2}

    expected = [(1/np.sqrt(2), 1), (np.sqrt(5)/4, 0.5),
                (np.sqrt(3)/4, 1/np.sqrt(2)), (1/(2*np.sqrt(2)), 0.5)]
    for matrix, target in zip(
        [np.eye(3), aligned, half_damping, np.eye(3)/2], expected
    ):
        equal([np.linalg.norm(matrix @ delta)/2 for delta in (ez-ex, 2*ex)], target)
    equal((rho(ex) + rho(-ex)) / 2, eye / 2)
    equal(np.trace(rho(ez) @ eye / 2), 0.5)
    target = rho(ex / 2)
    eigs = np.linalg.eigvalsh(target)
    equal(eigs, [0.25, 0.75])
    equal(-eigs @ np.log(eigs) + np.log(0.75), np.log(3)/4)
    for _ in range(20):
        r = state()
        matrix = rho(r)
        pinched = np.diag(np.diag(matrix))
        equal(np.linalg.norm(matrix)**2,
              np.linalg.norm(pinched)**2 + np.linalg.norm(matrix - pinched)**2)
        equal(np.linalg.norm(matrix - pinched)**2, np.dot(r[:2], r[:2]) / 2)
        equal(np.diag(np.diag(pinched)), pinched)
        eigs = np.linalg.eigvalsh(matrix)
        s_in = -eigs @ np.log(eigs)
        diagonal = np.diag(pinched).real
        s_out = -diagonal @ np.log(diagonal)
        equal(s_out - s_in, -s_in - np.trace(matrix @ np.diag(np.log(diagonal))))
        assert distance(pinched, rho(-ez)) <= distance(matrix, rho(-ez)) + 1e-14

    for lam in [0, 0.2, 0.5, 0.9, 1]:
        def root_fidelity(r, s):
            radicand = (1 + r @ s + np.sqrt((1 - r @ r) * (1 - s @ s))) / 2
            return np.sqrt(np.clip(radicand, 0, 1))

        for _ in range(30):
            r, s = state(), state()
            assert 1 - root_fidelity(lam * r, lam * s) <= (
                lam * (1 - root_fidelity(r, s)) + 1e-14
            )

    n, m = ex, np.array([3, 4, 0]) / 5
    nk, mk = retention(n, 0.5), retention(m, 1/3)
    equal((nk @ mk)[0, 1], 8/25)
    equal((mk @ nk)[0, 1], 4/25)
    equal(nk @ mk - mk @ nk, (1-0.5) * (1-1/3) * (n @ m) *
          (np.outer(n, m) - np.outer(m, n)), atol=1e-14)
    equal(np.linalg.eigvalsh((np.outer(ex, ex) + np.outer(ez, ez)) / 2), [0, 0.5, 0.5])
    equal(np.trace(rho(ex) @ rho(ez)) / 2, 0.25)
    equal(retention(ex, 0) @ retention(ez, 0), retention(ez, 0) @ retention(ex, 0))
    equal([0.60, (3*0.60-1)/2, 0.60-0.25], [0.60, 0.40, 0.35])
    equal(sum(retention(n, 0.7) for n in [ex, ey, ez, -ex, -ey, -ez]) / 6,
          np.eye(3) * (1 + 2*0.7) / 3)
    alpha = 0.003
    equal(((1 + 2*np.cos(alpha))/3) ** int(1/alpha**2), np.exp(-1/3), rtol=5e-6)
    for length in range(1, 13):
        for _ in range(20):
            r = state()
            point = r.copy()
            coverage = 0
            for _ in range(length):
                direction = rng.normal(size=3)
                n = direction / np.linalg.norm(direction)
                c = rng.random()
                coverage += (1-c) * np.linalg.norm(r - (r @ n)*n)**2
                point = retention(n, c) @ point
            assert coverage <= length*(length+1)/2 * (r @ r - point @ point) + 1e-13

    def rotation(angle):
        return np.array([[np.cos(angle/2), -np.sin(angle/2)],
                         [np.sin(angle/2), np.cos(angle/2)]])

    for angle in np.linspace(-np.pi, np.pi, 15):
        u = rotation(angle)
        reference, prepared = rho(ez), rho(ex)
        equal(np.trace(reference @ u @ prepared @ u.T), (1 - np.sin(angle)) / 2)
        equal(np.trace(u @ reference @ u.T @ prepared), (1 + np.sin(angle)) / 2)
        equal(np.trace(u @ reference @ prepared @ u.T), 0.5)
    eta, angle = 0.15, np.pi/4
    n = np.array([np.cos(angle), 0, np.sin(angle)])
    tensor = (1-eta)*np.diag([0.7, 0.3, 0]) + eta * np.outer(n, n)
    equal(np.linalg.det(tensor), (1-eta)**2 * 0.7 * 0.3 * eta * np.sin(angle)**2)
    equal(n[2], 1/np.sqrt(2))
    probabilities = (1 + 0.5*np.cos([np.pi/3, 2*np.pi/3]))/2
    equal(probabilities, [5/8, 3/8])
    equal(abs(np.array([np.pi/3, 2*np.pi/3])-np.pi/2)/2, np.pi/12)
    cross_entropies = -np.stack([probabilities, 1-probabilities], axis=1) @ np.log([3/4, 1/4])
    equal(np.diff(cross_entropies), np.log(3)/4)
    a1, a2, a3 = ez, ex, (ex + ez)/np.sqrt(2)
    groups = np.stack([a1 + 2*a2, 2*a1 - 2*a2 + a3, a2 + a3])
    norms = np.linalg.norm(groups, axis=1)
    b_vectors = -groups / norms[:, None]
    bell = np.array([1, 0, 0, 1]) / np.sqrt(2)
    correlations = np.array([[np.vdot(bell, np.kron(sigma(a), sigma(b)) @ bell).real
                              for b in b_vectors] for a in (a1, a2, a3)])
    weights = np.array([[-1, -2, 0], [-2, 2, -1], [0, -1, -1]])
    total = np.sum(correlations * weights)
    equal(total, np.sqrt(5) + 3 + np.sqrt(2 + np.sqrt(2)))
    equal(6 / total, 0.847, atol=5e-4, rtol=0)
    equal(-np.log((np.sqrt(2)-1)*(np.sqrt(2)+1)), 0, atol=1e-15)
    equal(-np.log(0.2*2.2), 0.82, atol=0.005, rtol=0)


def check_record_models():
    equal = np.testing.assert_allclose
    rng = np.random.default_rng(907)
    plus = np.array([1, 1]) / np.sqrt(2)
    x = np.array([[0, 1], [1, 0]])
    z = np.diag([1, -1])

    def density(vector):
        return np.outer(vector, vector.conj())

    def reduced(joint, env_dimension):
        return np.trace(joint.reshape(2, env_dimension, 2, env_dimension), axis1=1, axis2=3)

    def distance(a, b):
        return np.linalg.svd(a - b, compute_uv=False).sum() / 2

    records = np.array([[1, 0], [1j, 0], [0.3, np.sqrt(1-0.3**2)]], dtype=complex)
    multipliers = records @ records.conj().T
    for _ in range(25):
        m = rng.normal(size=(3, 3)) + 1j*rng.normal(size=(3, 3))
        state = m @ m.conj().T
        state /= np.trace(state)
        isometry = np.stack([np.kron(e, row) for e, row in zip(np.eye(3), records)], axis=1)
        joint = isometry @ state @ isometry.conj().T
        reshaped = joint.reshape(3, 2, 3, 2)
        system = np.trace(reshaped, axis1=1, axis2=3)
        environment = np.trace(reshaped, axis1=0, axis2=2)
        equal(system, state*multipliers, atol=1e-14)
        population = np.diag(state).real
        equal(environment, records.T @ np.diag(population) @ records.conj())
        lost = np.linalg.norm(state)**2 - np.linalg.norm(system)**2
        factors = 1 - abs(multipliers)**2
        equal(lost, np.sum(abs(state)**2 * factors))
        gap = 1 - np.linalg.norm(environment)**2
        equal(gap, np.sum(np.outer(population, population) * factors))
        assert 0 <= lost <= gap + 1e-14
        projector = np.array([[1, 1, 0], [1, 1, 0], [0, 0, 1]])
        for n in range(1, 8):
            rotating = np.outer(np.array([1, 1j, 1])**n, np.array([1, -1j, 1])**n)
            error = np.linalg.norm(state*multipliers**n - state*projector*rotating)
            assert error <= 0.3**n * np.linalg.norm(state*(1-projector)) + 1e-14

    phase = z @ plus
    equal(np.vdot(phase, plus), 0, atol=1e-15)
    w = np.block([[np.eye(2), np.zeros((2, 2))], [np.zeros((2, 2)), x]])
    reset = density(np.array([1, 0]))
    tau = np.kron(density(plus), reset)
    initial = tau.copy()
    discrepancies = []
    rho_reset = density(plus)
    for tick in range(6):
        rho = reduced(tau, 2)
        discrepancy = distance(tau, np.kron(rho, reset))
        epsilon = np.clip(1 - np.trace(tau @ np.kron(np.eye(2), reset)).real, 0, 1)
        assert discrepancy <= np.sqrt(epsilon) + epsilon/2 + 1e-14
        assert distance(rho, rho_reset) <= sum(discrepancies) + 1e-14
        discrepancies.append(discrepancy)
        rho_reset = reduced(w @ np.kron(rho_reset, reset) @ w.T, 2)
        tau = w @ tau @ w.T
    equal(reduced(w @ initial @ w.T, 2), np.eye(2)/2)
    equal(reduced(w @ w @ initial @ w.T @ w.T, 2), density(plus))

    permutations = [np.eye(3)[:, [1, 0, 2]], np.eye(3)[:, [1, 2, 0]]]
    for tick, expected in [(1, density(plus)), (2, np.eye(2)/2)]:
        branch = [np.linalg.matrix_power(p, tick)[:, 0] for p in permutations]
        vector = np.concatenate(branch)/np.sqrt(2)
        equal(reduced(density(vector), 3), expected)

    rotation = 0.8 * np.eye(2) + 0.6j * x
    equal(rotation.conj().T @ rotation, np.eye(2))
    equal(np.linalg.matrix_power(rotation, 2)[0, 0], 7/25)
    equal(np.linalg.matrix_power(rotation, 39)[0, 0].real, 0.99934, atol=5e-6, rtol=0)
    equal(0.8**39, 0.00017, atol=5e-6, rtol=0)
    amplitudes = np.zeros(12, dtype=complex)
    amplitudes[0] = 1
    for n in range(1, 12):
        indices = [0, n]
        amplitudes[indices] = rotation @ amplitudes[indices]
        equal(amplitudes[0], 0.8**n)
        equal(np.linalg.norm(amplitudes[1:])**2, 1 - 0.8**(2*n))

    for lam in np.r_[np.linspace(-0.99, 0.99, 31), 0.0]:
        d0 = np.sqrt(lam**2 + 2*lam + 5)
        xp, xm = (lam-1+d0)/4, (lam-1-d0)/4
        p, h = (1 + lam)/(5 - 3*lam), 2*lam/d0
        assert -1 < xm < xp < 1 and 0 < p < 1 and abs(h) < 1
        tp, tm = np.arccos([xp, xm])
        a, b = (tp + tm)/2, (tm - tp)/2
        hamiltonian = h*z + np.sqrt(1-h*h)*x
        initial_environment = np.diag([p, (1-p)/2, (1-p)/2])
        for n in range(5):
            first = np.eye(3, dtype=complex)
            second = first.copy()
            first[1:, 1:] = np.cos(n*a)*np.eye(2) + 1j*np.sin(n*a)*z
            second[1:, 1:] = np.cos(n*b)*np.eye(2) - 1j*np.sin(n*b)*hamiltonian
            equal(np.trace(first @ initial_environment @ second), lam**n, atol=3e-15)

    for d in range(1, 8):
        indices = np.arange(d)
        fourier = np.exp(2j*np.pi*np.outer(indices, indices)/d)/np.sqrt(d)
        equal(fourier @ fourier.conj().T, np.eye(d), atol=3e-15)
        omega = np.exp(2j*np.pi/d**2)
        nodes = omega ** (indices[:, None] + d*indices)
        for n in range(1, d*d):
            equal(np.mean(nodes**n), 0, atol=1e-13)
    theta = np.pi/16
    assert 1 - np.cos(theta) >= 1/128
    assert 1 - 0.999 < 1/384
    for r in [0.1, 0.4, 0.9, 0.999]:
        indices = np.arange(9)
        toeplitz = r ** np.abs(indices[:, None] - indices)
        assert np.linalg.eigvalsh(toeplitz)[0] > 0
        coefficients = np.zeros(10, dtype=complex)
        coefficients[[0, 1, 8, 9]] = [1j, -1j*r, -r, 1]
        roots = np.polynomial.polynomial.polyroots(coefficients)
        equal(abs(roots), 1, atol=1e-13)
        assert np.count_nonzero(abs(np.angle(roots)) <= theta) <= 2
        equal([np.sum(roots**k) for k in (1, 2, 3)], r**np.arange(1, 4), atol=3e-14)
    for _ in range(15):
        matrix = rng.normal(size=(6, 6)) + 1j*rng.normal(size=(6, 6))
        w, _ = np.linalg.qr(matrix)
        sigma_root = np.diag([np.sqrt(0.7), np.sqrt(0.3), 0])
        for side in range(2):
            embed = np.eye(6)[:, side*3:side*3+3]
            q = np.eye(6) - embed @ embed.T
            history = [np.linalg.matrix_power(w, n) @ embed @ sigma_root for n in range(6)]
            epsilon = max(np.linalg.norm(q @ matrix) for matrix in history)
            u, _, vh = np.linalg.svd(embed.T @ w @ embed)
            a = u @ vh
            for n, vector in enumerate(history):
                assert np.linalg.norm(vector - embed @ np.linalg.matrix_power(a, n)
                                      @ sigma_root) <= 4*n*epsilon + 1e-14

    def h2(x):
        if x in (0, 1):
            return 0.0
        return -x*np.log2(x)-(1-x)*np.log2(1-x)

    s = h2((1 - 0.3**16)/2)
    for m in range(3, 14):
        info = s + h2((1 - 0.3**m)/2) - h2((1 - 0.3**(16-m))/2)
        assert abs(info-s) < 5.27e-4
    assert (0.3**3)**2 / (2 * (1 - (0.3**3)**2) * np.log(2)) < 5.27e-4


def check_posterior_models():
    equal = np.testing.assert_allclose
    rng = np.random.default_rng(640)
    for n in range(2, 15):
        posteriors = rng.dirichlet(np.ones(n), size=7)
        probabilities = rng.dirichlet(np.ones(7))
        prior = probabilities @ posteriors
        delta = probabilities @ np.sum((posteriors-prior)**2, axis=1)
        equal(delta, probabilities @ np.sum(posteriors**2, axis=1) - prior @ prior)
        total_variation = probabilities @ np.sum(abs(posteriors-prior), axis=1)/2
        assert total_variation**2 <= (n*n//4)*delta/n + 1e-14
        left_size = n//2
        left = np.r_[np.ones(left_size)/left_size, np.zeros(n-left_size)]
        right = np.r_[np.zeros(left_size), np.ones(n-left_size)/(n-left_size)]
        equal(np.linalg.norm(left-right, 1)/4, 0.5)
        equal(np.linalg.norm(left-right)**2/4, n/(4*left_size*(n-left_size)))
        for m in range(1, n):
            equal(2*m*(n-m)/n**2 / ((n-1)/n), 2*m*(n-m)/(n*(n-1)))

    # Enumerate binary cuts to compare the variance with its edge decomposition.
    for n in range(4, 9):
        i, j = np.triu_indices(n, k=1)
        weights = np.zeros((n, n))
        weights[i, j] = rng.normal(size=len(i))
        weights += weights.T
        centred = weights[i, j] - weights[i, j].mean()
        degree = (weights.sum(axis=1) - (n-1)*weights[i, j].mean()) / (n-2)
        star = degree[i] + degree[j]
        residual = centred - star
        binary = (np.arange(1 << n)[:, None] >> np.arange(n)) & 1
        for m in range(2, n-1):
            membership = binary[binary.sum(axis=1) == m]
            cuts = (membership[:, i] != membership[:, j]) @ weights[i, j]
            degree_coefficient = m*(n-m)*(n-2*m)**2 / (n*(n-1)*(n-2))
            residual_coefficient = (
                4*m*(m-1)*(n-m)*(n-m-1) / (n*(n-1)*(n-2)*(n-3))
            )
            equal(cuts.var(), degree_coefficient*(star @ star) +
                  residual_coefficient*(residual @ residual))

    eye = np.eye(5)
    cyclic = np.roll(eye, 1, axis=1)
    w = cyclic + cyclic.T
    j = np.ones((5, 5))
    moment = (5*eye + 3*w)/55
    prior = np.ones(5)/5
    h = w + 2*eye - 4*j/5
    equal(w @ w, eye + j - w)
    equal(moment @ np.ones(5), prior)
    equal(h @ h/55, moment - np.outer(prior, prior))
    equal(np.trace(moment), 25/55)
    equal(np.sum(moment*w), 30/55)

    def orbit_matrix(v):
        return sum(np.outer(np.roll(v, k), np.roll(v, k)) for k in range(5))/5

    equal((60*orbit_matrix([1, 2, 1, 0, 0]) + 15*orbit_matrix([2, 2, 0, -1, 0])
           + eye)/1100, moment)
    certificate = 4*j/5 - 2*w
    equal(np.linalg.norm(certificate)**2, 24)
    for t in np.r_[np.linspace(1/20, 11/160, 21), 3/55]:
        delta = 20*t - 1
        mixture = 8*delta/3
        projected = ((1-mixture)*orbit_matrix([0.5, 0.5, 0, 0, 0]) +
                     mixture*orbit_matrix([0.25, 0.5, 0.25, 0, 0]))
        target = (0.2-2*t)*eye + t*w
        equal(projected[0, :3], [0.1-delta/15, 1/20, delta/30], atol=1e-14)
        equal(np.sum(certificate * projected), -1/5)
        equal(np.linalg.norm(projected-target)**2, delta**2/24, atol=1e-14)
    equal((20*3/55-1)**2/24, 1/2904)

    histories = np.array([[i, k, m] for i in (0, 1) for k in (0, 1) for m in (0, 1)])
    first, second, third = histories.T
    target = first ^ second
    for labels, information, erase, impurity in [
        (np.arange(8), 1, 0, 0), (third, 0, 2, 0.5),
        (second ^ third, 0, 2, 0.5), (target, 1, 2, 0),
    ]:
        conditions = [target[labels == lab] for lab in np.unique(labels)]
        measured_info = 0
        measured_erase = 0
        measured_impurity = 0
        for group in conditions:
            count = len(group)
            probs = np.bincount(group, minlength=2)/count
            nonzero = probs[probs > 0]
            measured_info += (count/8) * (1 + nonzero @ np.log2(nonzero))
            measured_erase += (count/8) * np.log2(count)
            measured_impurity += (count/8) * (1 - probs @ probs)
        equal([measured_info, measured_erase, measured_impurity], [information, erase, impurity])
    anchor = np.ones(3)/np.sqrt(3)
    for q, numerical in [(np.array([2, 2, 1])/3, np.array([2, 12, 24])/27),
                         (np.array([1, 2, -2])/3, np.array([26, 3, 15])/27)]:
        equal([1-(q@anchor)**2, q[0]**2, 1-q[2]**2], numerical)


def check_horizons():
    def density(ket):
        return np.outer(ket, ket.conj())

    def marginals(rho):
        tensor = rho.reshape(2, 2, 2, 2)
        return (
            np.trace(tensor, axis1=1, axis2=3),
            np.trace(tensor, axis1=0, axis2=2),
        )

    def entropy(probabilities):
        probabilities = np.asarray(probabilities)
        positive = probabilities[probabilities > 1e-14]
        return -np.dot(positive, np.log(positive))

    def balances(rho):
        a, b = (entropy(np.linalg.eigvalsh(x)) for x in marginals(rho))
        return np.array([a, b, a + b - entropy(np.linalg.eigvalsh(rho))])

    def word(update, readout, depth):
        points = np.arange(len(update))
        columns = [readout[points]]
        for _ in range(depth):
            points = update[points]
            columns.append(readout[points])
        return np.stack(columns, axis=1)

    def kernel(words):
        return (words[:, None, :] == words[None, :, :]).all(axis=2)

    id2 = np.eye(2)
    id4 = np.eye(4)
    pauli_x = np.array([[0, 1], [1, 0]])
    pauli_y = np.array([[0, -1j], [1j, 0]])
    pauli_z = np.diag([1, -1])
    basis = np.array([id2, pauli_x, pauli_y, pauli_z])
    ex = np.kron(pauli_x, pauli_x)
    ell = np.log(2)

    for theta in [0.01, 0.4, 1.0]:
        u, v = np.sin(theta), np.cos(theta)
        directions = np.array([[0, 0, 1], [u, 0, v], [0, u, v]])
        assert np.linalg.matrix_rank(directions) == 3
        r = np.array([0.2, -0.4, 0.5])
        state = (id2 + np.einsum("i,ijk->jk", r, basis[1:])) / 2
        tests = (id2 + np.einsum("ni,ijk->njk", directions, basis[1:])) / 2
        readouts = np.array([np.trace(state @ test).real for test in tests])
        np.testing.assert_allclose(np.linalg.solve(directions, 2 * readouts - 1), r)
    rho_plus = id2 / 2 + pauli_x / 10
    rho_minus = id2 / 2 - pauli_x / 10
    test_z = (id2 + pauli_z) / 2
    assert np.linalg.eigvalsh(rho_plus).min() > 0
    assert np.linalg.eigvalsh(rho_minus).min() > 0
    np.testing.assert_allclose(np.trace(test_z @ rho_plus), np.trace(test_z @ rho_minus))
    assert np.trace(pauli_x @ rho_plus) > np.trace(pauli_x @ rho_minus)
    for ai, a in enumerate(basis):
        for bi, b in enumerate(basis):
            out_a, out_b = marginals(np.kron(a, b))
            np.testing.assert_allclose(out_a, 2 * a if bi == 0 else 0)
            np.testing.assert_allclose(out_b, 2 * b if ai == 0 else 0)

    correlation = [
        np.kron(a, b).ravel() for a in basis[1:] for b in basis[1:]
    ]
    assert np.linalg.matrix_rank(correlation) == (2**2 - 1)**2 == 9
    assert len(correlation) / (4**2 - 1) == 3 / 5

    ket00, _, _, ket11 = id4
    bells = [density((ket00 + sign * ket11) / np.sqrt(2)) for sign in [1, -1]]
    for rho, expected in zip([*bells, sum(bells) / 2], [1, -1, 0]):
        np.testing.assert_allclose(marginals(rho), [id2 / 2, id2 / 2])
        np.testing.assert_allclose(np.trace(rho @ ex), expected, atol=1e-12)
    np.testing.assert_allclose(
        sum(bells) / 2, (density(ket00) + density(ket11)) / 2
    )
    for alpha in np.linspace(0, np.pi / 4, 25):
        psi = np.cos(alpha) * ket00 + np.sin(alpha) * ket11
        rho = density(psi)
        p, q = np.cos(alpha) ** 2, np.sin(alpha) ** 2
        marg = marginals(rho)[0]
        np.testing.assert_allclose(marg, np.diag([p, q]))
        np.testing.assert_allclose(entropy(np.linalg.eigvalsh(marg)), entropy([p, q]))
        z = np.trace(marg @ pauli_z)
        concurrence = 2 * np.sqrt(np.linalg.det(marg))
        purity = np.trace(marg @ marg)
        np.testing.assert_allclose([z, purity, concurrence], [
            np.cos(2 * alpha), (1 + np.cos(2 * alpha) ** 2) / 2, np.sin(2 * alpha)
        ], atol=1e-12)
        np.testing.assert_allclose(z**2 + concurrence**2, 1)
        np.testing.assert_allclose(concurrence**2, 2 * (1 - purity), atol=1e-12)

    for n in range(1, 5):
        for update_tuple in np.ndindex(*(n,) * n):
            update = np.array(update_tuple)
            for readout_tuple in np.ndindex(*(2,) * n):
                readout = np.array(readout_tuple)
                r0 = kernel(word(update, readout, 0))
                depth_bound = n - len(np.unique(readout))
                last = r0
                np.testing.assert_array_equal(word(update, readout, 0)[:, 0], readout)
                for depth in range(1, depth_bound + 2):
                    following = kernel(word(update, readout, depth))
                    np.testing.assert_array_equal(
                        following, r0 & last[np.ix_(update, update)]
                    )
                    assert np.all(~following | last)
                    if depth == depth_bound + 1:
                        np.testing.assert_array_equal(following, last)
                    last = following
    np.testing.assert_array_equal(word(np.array([1, 2, 2]), np.array([0, 0, 1]), 1), [
        [0, 0], [0, 1], [1, 1]
    ])
    split_delay = word(np.array([2, 2, 3, 3]), np.array([0, 0, 0, 1]), 2)
    assert len(np.unique(split_delay, axis=0)) == 3
    for m in range(20):
        steps = np.arange(m + 1)
        assert np.all(np.maximum((m + 1) - steps, 0) > 0)
        assert np.all(np.maximum((m + 2) - steps, 0) > 0)
        assert (m + 1) - (m + 1) == 0 < (m + 2) - (m + 1)

    phase = np.array([0, 0.5, 0.25, 0.75])
    memory = np.column_stack([phase < 0.5, (-phase % 1) < 0.5])
    np.testing.assert_array_equal(memory, [[1, 1], [0, 0], [1, 0], [0, 1]])
    np.testing.assert_array_equal(memory[[0, 1, 3, 2]], memory[:, ::-1])
    levels = np.arange(1, 25)
    k = 1 / levels % 1
    l = 2 / levels % 1
    np.testing.assert_allclose((k + l) % 1, 3 / levels % 1)
    np.testing.assert_allclose([k[0], l[0], k[1], l[1], l[2]], [0, 0, 0.5, 0, 2 / 3])
    for m in range(1, 21):
        assert m / m % 1 == 0 < m / (m + 1) % 1
    grid = np.arange(-6, 7)
    np.testing.assert_array_equal(grid[grid % 2 == 0], 2 * np.arange(-3, 4))

    pair_bits = entropy([3 / 4, 1 / 4]) / ell
    np.testing.assert_allclose(pair_bits, 2 - 3 / 4 * np.log2(3))
    for n_pairs in [2, 8]:
        spectrum = np.array([1.0])
        for _ in range(n_pairs):
            spectrum = np.kron(spectrum, [3 / 4, 1 / 4])
        assert np.count_nonzero(spectrum) == 2**n_pairs
        np.testing.assert_allclose(np.exp(entropy(spectrum)), 4**n_pairs / 3**(3 * n_pairs / 4))
        assert np.exp(entropy(spectrum)) < np.count_nonzero(spectrum)
    assert len(np.full(2**8, 1.0 / 2**8)) == 256
    np.testing.assert_allclose(entropy(np.full(256, 1 / 256)) / ell, 8)
    for r in [2, 4, 16, 64, 256]:
        epsilon = 1 / r
        spectrum = np.r_[1 - epsilon, np.full(r - 1, epsilon / (r - 1))]
        assert np.count_nonzero(spectrum) == r
        np.testing.assert_allclose(
            entropy(spectrum), entropy([epsilon, 1 - epsilon]) + epsilon * np.log(r - 1)
        )
        assert entropy(spectrum) <= np.log(r)
    for m in range(13):
        assert sum((i < m) != (j < m) for i, j in zip(range(6), range(11, 5, -1))) == min(m, 12-m)
    for n in [4, 16, 32]:
        haar_average = np.sum(1 / np.arange(n + 1, n**2 + 1)) - (n - 1) / (2 * n)
        assert abs(haar_average - (np.log(n) - 0.5)) <= 1 / n

    unitary = (id4 - 1j * ex) / np.sqrt(2)
    swap = id4[[0, 2, 1, 3]]
    bell = (ket00 + 1j * ket11) / np.sqrt(2)
    np.testing.assert_allclose(unitary.conj().T @ unitary, id4)
    np.testing.assert_allclose(unitary @ ket00, bell.conj())
    np.testing.assert_allclose(unitary @ bell, ket00)
    for rho, gate, change in [
        (density(ket00), unitary, [ell, ell, 2 * ell]),
        (density(bell), unitary, [-ell, -ell, -2 * ell]),
        (id4 / 4, unitary, [0, 0, 0]),
        (np.kron(id2 / 2, density(id2[0])), swap, [-ell, ell, 0]),
        (density(ket00), id4, [0, 0, 0]),
    ]:
        delta = balances(gate @ rho @ gate.conj().T) - balances(rho)
        np.testing.assert_allclose(delta, change, atol=1e-12)
        np.testing.assert_allclose(delta[0] + delta[1], delta[2], atol=1e-12)

    x = 1.0
    for _ in range(100):
        x = np.cos(x)
    np.testing.assert_allclose(np.cos(x), x, atol=1e-14)
    for alpha, expected in [
        (x / 2, [0.739085, 0.558691]),
        (x, [0.092494, 0.993820]),
    ]:
        p = np.cos(alpha)**2
        np.testing.assert_allclose([2 * p - 1, entropy([p, 1 - p]) / ell], expected, atol=5e-7, rtol=0)
    np.testing.assert_allclose([x*x, 1 - x*x], [0.546247, 0.453753], atol=5e-7, rtol=0)
    beta = 2 * np.log(1 / np.tan(x))
    thermal_entropy = entropy([x*x, 1 - x*x])
    np.testing.assert_allclose([
        1 / beta, 6 * thermal_entropy / ell,
        1 / (2 * np.log(1 / np.tan(np.deg2rad(42.35)))),
        ell / beta, thermal_entropy / beta, (ell - thermal_entropy) / beta,
    ], [5.390324, 5.962920, 5.397548, 3.736288, 3.713198, 0.023090],
       atol=5e-7, rtol=0)
    h = np.array([0, 1])
    gibbs = np.exp(-beta * h)
    gibbs /= gibbs.sum()
    np.testing.assert_allclose(gibbs, [x*x, 1 - x*x])
    for probabilities in [gibbs, np.array([0.2, 0.8]), np.array([0.5, 0.5])]:
        relative_entropy = probabilities @ np.log(probabilities / gibbs)
        excess_energy = h @ (probabilities - gibbs)
        excess_entropy = entropy(probabilities) - entropy(gibbs)
        np.testing.assert_allclose(relative_entropy / beta, excess_energy - excess_entropy / beta)
    total_h = np.kron(id2, np.diag(h)) + np.kron(np.diag(h), id2)
    np.testing.assert_allclose(swap @ total_h, total_h @ swap)
    gibbs_product = np.kron(np.diag(gibbs), np.diag(gibbs))
    np.testing.assert_allclose(swap @ gibbs_product @ swap, gibbs_product)

    for n in [1, 2, 5, 10]:
        identity = np.eye(12)
        projection = np.diag(np.arange(12) < n)
        np.testing.assert_allclose(np.linalg.norm(identity - projection, ord=2), 1)
        vector = 1 / (1 + np.arange(12))
        np.testing.assert_allclose(np.sum(((identity - projection) @ vector)**2), np.sum(vector[n:]**2))
    for radius in [0.5, 1, 2, 100]:
        delta = 2 * np.arctan(1 / radius)
        np.testing.assert_allclose(1 / np.tan(delta / 2), radius)
        np.testing.assert_allclose((1 - np.cos(delta)) / 2, 1 / (1 + radius**2))
    for y in [-8.0, 0.0, 1.5]:
        s = 0.5 + 1j * y
        w = (s - 1) / s
        np.testing.assert_allclose(abs(w), 1)
        assert w != 1
        np.testing.assert_allclose(1 / (1 - w), s)
    for s in [1.5 + 2j, 2.5j]:
        assert not np.isclose(abs((s - 1) / s), 1)
    for proper_time in [-2.0, 0.0, 0.4]:
        c, acceleration = 3.0, 2.0
        scale = c*c / acceleration
        s = acceleration * proper_time / c
        ct, xcoord = scale * np.array([np.sinh(s), np.cosh(s)])
        np.testing.assert_allclose(xcoord**2 - ct**2, scale**2)
        np.testing.assert_allclose(
            [ct - xcoord, ct + xcoord], scale * np.array([-np.exp(-s), np.exp(s)])
        )
    for cosmological_constant in [0.01, 1, 3]:
        horizon = np.sqrt(3 / cosmological_constant)
        np.testing.assert_allclose(1 - cosmological_constant * horizon**2 / 3, 0, atol=1e-12)
        delta, coefficient = 0.4, 3 / 0.4**2
        np.testing.assert_allclose(coefficient * delta**2 / horizon**2, cosmological_constant)
        planck_length = 1e-8
        np.testing.assert_allclose((planck_length / horizon)**2 / planck_length**2, 1 / horizon**2)


def check_magic_and_divergences():
    """Check closed forms, endpoint cases, and finite certificates in G and I."""
    import numpy as np
    from itertools import combinations, permutations, product

    rng = np.random.default_rng(9026)
    pauli = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])
    ident = np.eye(2)
    eps = 2e-7

    def close(actual, expected, why, atol=1e-10):
        np.testing.assert_allclose(actual, expected, rtol=0, atol=atol, err_msg=why)

    def density(r):
        return (ident + np.einsum("i,ijk->jk", r, pauli)) / 2

    def positive_function(matrix, function):
        values, vectors = np.linalg.eigh(matrix)
        return (vectors * function(values)) @ vectors.conj().T

    def positive_sqrt(matrix):
        return positive_function(matrix, lambda v: np.sqrt(np.maximum(v, 0)))

    def root_fidelity(rho, sigma):
        return np.linalg.svd(positive_sqrt(rho) @ positive_sqrt(sigma), compute_uv=False).sum()

    def xlogx(v):
        return np.where(v > 0, v * np.log(np.maximum(v, 1e-300)), 0)

    def random_density(dimension):
        columns = rng.normal(size=(dimension, dimension)) + 1j * rng.normal(size=(dimension, dimension))
        state = columns @ columns.conj().T
        return state / np.trace(state)

    def trace_distance(rho, sigma):
        return np.abs(np.linalg.eigvalsh(rho - sigma)).sum() / 2

    axes = np.eye(3)
    bloch_directions = rng.normal(size=(40, 3))
    bloch_directions /= np.linalg.norm(bloch_directions, axis=1)[:, None]
    for i in range(40):
        r = bloch_directions[i] * (i % 5) / 4
        s = bloch_directions[39 - i] * ((i + 1) % 5) / 4
        u, v = np.linalg.norm(r), np.linalg.norm(s)
        rho, sigma = density(r), density(s)
        f = root_fidelity(rho, sigma)
        expected_f = (1 + r @ s + np.sqrt(max(0, (1 - u*u) * (1 - v*v)))) / 2
        close(f*f, expected_f, "qubit fidelity", eps)
        close(trace_distance(rho, sigma), np.linalg.norm(r - s) / 2, "trace distance")
        if v >= 1 - 1e-12:
            continue
        log_sigma = positive_function(sigma, np.log)
        entropy_r = np.sum(xlogx(np.array([(1-u)/2, (1+u)/2])))
        scalar_a = np.log((1-v*v) / 4) / 2
        scalar_b = 0 if v == 0 else np.arctanh(v) * (r @ s) / v
        close(entropy_r - np.trace(rho @ log_sigma), entropy_r - scalar_a - scalar_b, "Umegaki formula")
        inv_root = positive_function(sigma, lambda x: 1 / np.sqrt(x))
        likelihood = inv_root @ rho @ inv_root
        eigen = np.linalg.eigvalsh(likelihood)
        close(eigen.sum(), 2 * (1 - r @ s) / (1 - v*v), "likelihood trace")
        close(eigen.prod(), (1 - u*u) / (1 - v*v), "likelihood determinant")
        b_s = np.trace(sigma @ positive_function(likelihood, xlogx))
        lo, hi = eigen
        if hi - lo > 1e-12:
            close(b_s, ((1-lo) * xlogx(hi) + (hi-1) * xlogx(lo)) / (hi-lo), "BS formula")
        if abs(u - 1) < 1e-12:
            close(b_s, np.log(eigen.sum()), "pure BS formula")

    for _ in range(20):
        rho, sigma, third = (random_density(2) for _ in range(3))
        def bures(a, b):
            return np.sqrt(max(0, 2 - 2 * root_fidelity(a, b)))
        assert bures(rho, third) <= bures(rho, sigma) + bures(sigma, third) + eps
        random_matrix = rng.normal(size=(6, 2)) + 1j * rng.normal(size=(6, 2))
        kraus = np.linalg.qr(random_matrix)[0].reshape(2, 3, 2)
        def channel(x):
            return sum(k @ x @ k.conj().T for k in kraus)
        assert root_fidelity(channel(rho), channel(sigma)) + eps >= root_fidelity(rho, sigma)
        assert trace_distance(channel(rho), channel(sigma)) <= trace_distance(rho, sigma) + eps
        def ordered_entropy(a, b):
            return np.trace(a @ (positive_function(a, np.log) - positive_function(b, np.log))).real
        assert ordered_entropy(channel(rho), channel(sigma)) <= ordered_entropy(rho, sigma) + eps

    same_ref = density(axes[2] / 2)
    close(root_fidelity(same_ref, same_ref)**2, 1, "equal directional comparison")
    close(root_fidelity(density(axes[2]), same_ref)**2, 3/4, "same-direction pure input")
    close(-np.log(same_ref[0, 0]), np.log(4/3), "aligned pure Umegaki")
    rho = density(axes[0])
    close(-np.trace(rho @ positive_function(same_ref, np.log)), np.log(4/np.sqrt(3)), "orthogonal directional Umegaki")
    close(np.log(np.trace(rho @ np.linalg.inv(same_ref))), np.log(8/3), "orthogonal directional BS")
    assert 8 / 3 > 4 / np.sqrt(3)

    weights = np.array([0.2, 0.3, 0.5])
    diagonal_inputs = np.array([[.8, .2], [.3, .7], [.6, .4]])
    average_root = weights @ np.sqrt(diagonal_inputs)
    cone_centre = np.diag(average_root**2)
    transports = np.sqrt(diagonal_inputs) / average_root
    close(weights @ transports, np.ones(2), "cone transport balance")
    for factor, input_diagonal in zip(transports, diagonal_inputs):
        close(np.diag(factor) @ cone_centre @ np.diag(factor), np.diag(input_diagonal), "transport congruence")
    total = np.trace(cone_centre)
    state_centre = cone_centre / total
    close(weights @ (np.sqrt(total) * transports), np.sqrt(total) * np.ones(2), "state transport balance")

    def bary_objective(matrix, inputs, local_weights):
        return float(sum(w * (np.trace(matrix + a).real - 2 * root_fidelity(matrix, a))
                         for w, a in zip(local_weights, inputs)))

    inputs = list(map(np.diag, diagonal_inputs))
    baseline = bary_objective(cone_centre, inputs, weights)
    state_baseline = bary_objective(state_centre, inputs, weights)
    for _ in range(20):
        arbitrary = random_density(2)
        assert baseline <= bary_objective(arbitrary * rng.uniform(0, 2), inputs, weights) + eps
        assert state_baseline <= bary_objective(arbitrary, inputs, weights) + eps
    projectors = [np.diag([1., 0]), np.diag([0., 1])]
    for z in [0, .24, .1 + .1j, -.25j]:
        minimizer = np.array([[.25, z], [np.conjugate(z), .25]])
        close(bary_objective(minimizer, projectors, [.5, .5]), .5, "singular cone centre", eps)
        close(bary_objective(2 * minimizer, projectors, [.5, .5]), 2-np.sqrt(2), "singular state centre", eps)

    for _ in range(15):
        prepared = [random_density(2) for _ in range(3)]
        p, q = rng.dirichlet(np.ones(3), size=2)
        rho = sum(w * state for w, state in zip(p, prepared))
        sigma = sum(w * state for w, state in zip(q, prepared))
        inv_root = positive_function(sigma, lambda x: 1 / np.sqrt(x))
        root = positive_sqrt(sigma)
        likelihood = inv_root @ rho @ inv_root
        bound = np.trace(sigma @ positive_function(likelihood, xlogx)).real
        assert bound <= p @ np.log(p / q) + eps
        values, vectors = np.linalg.eigh(likelihood)
        eigprojs = [np.outer(vec, vec.conj()) for vec in vectors.T]
        masses = [root @ projector @ root for projector in eigprojs]
        close(sum(masses), sigma, "reverse q state")
        close(sum(x * mass for x, mass in zip(values, masses)), rho, "reverse p state")
        close(sum(np.trace(mass) * xlogx(x) for x, mass in zip(values, masses)), bound, "reverse attaining cost")
    p, q = np.array([1., 2.]) / 3, np.array([2., 1.]) / 3
    close(p @ np.log(p / q), np.log(2) / 3, "commuting reverse test")

    z = np.geomspace(.001, 1000, 60)
    pure_integrand = z / (1 + z) - 1 / (1 + 1 / z)
    binary_integrand = z / (1 + z) - 1 / (1 + .5 / z)**2
    close(pure_integrand, np.zeros_like(z), "pure subentropy")
    close(binary_integrand, 1/(z+.5) - 1/(z+1) - 1/(4*(z+.5)**2), "binary subentropy integrand")
    binary_value = -np.log(.5) - .5
    guessing = np.array([1., .5])
    assert np.all([0., binary_value] <= 1-guessing)
    assert np.all(1-guessing <= -np.log(guessing))
    close(-np.sum(xlogx(np.array([.5, .5]))), np.log(2), "identical-record conditional entropy")

    for _ in range(5):
        matrix = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
        P = projectors[0]
        Q = ident - P
        added = [np.outer(np.eye(2)[0], basis) @ Q for basis in np.eye(2)]
        close(sum(k.conj().T @ k for k in [P, *added]), ident, "Kraus completion")
        close(sum(k @ matrix @ k.conj().T for k in [P, *added]), np.trace(matrix) * P, "reset all matrices")

    bell = np.array([1., 0, 0, 1]) / np.sqrt(2)
    R = np.outer(bell, bell)
    P = R / 2 + np.eye(4) / 4
    W = P - R
    pair_sum = sum(np.kron(density(s * axis), density(sign * s * axis))
                   for axis, sign in zip(axes, [1, -1, 1]) for s in [-1, 1])
    close(pair_sum, 4 * P, "separable Bell projection")
    close(np.trace(P), 1.5, "non-normalized cone projection")
    close(np.trace(P @ W), 0, "polar orthogonality")
    close(np.trace(R @ W), -.25, "Bell witness")
    close(W @ W, np.eye(4) / 16, "Bell residual norm")
    for _ in range(10):
        product_state = np.kron(random_density(2), random_density(2))
        assert np.trace(product_state @ W).real >= -eps
        assert np.linalg.norm(R - product_state)**2 >= .25

    signed_permutations = [
        np.diag(signs) @ np.eye(3)[list(permutation)]
        for permutation in permutations(range(3)) for signs in product([-1, 1], repeat=3)
    ]
    cliffords = [group for group in signed_permutations if np.linalg.det(group) > 0]
    assert len(cliffords) == 24 and len({tuple(g @ axes[2]) for g in cliffords}) == 6
    for g, h in product(cliffords, repeat=2):
        assert any(np.array_equal(g @ h, candidate) for candidate in cliffords)
    phase_state = density(np.array([1., 1, 0]) / np.sqrt(2))
    close(trace_distance(phase_state, density([.5, .5, 0])), (1 - 1/np.sqrt(2)) / 2, "octahedral distance")
    gate = np.diag([1., np.exp(1j*np.pi/4)]) @ np.array([[1., 1], [1, -1]]) / np.sqrt(2)
    close(gate @ projectors[0] @ gate.conj().T, phase_state, "phase-state preparation")

    points = np.array(list(product([0, 1], repeat=4)), dtype=int)
    columns = np.column_stack((np.ones(16, dtype=int), points))
    generators = columns.T
    close(generators @ generators.T % 2, np.zeros((5, 5)), "Majorana self-orthogonality")
    affine_words = np.array(list(product([0, 1], repeat=5))) @ generators % 2
    assert len(np.unique(affine_words, axis=0)) == 32
    assert set(affine_words.sum(axis=1)) == {0, 8, 16}
    for pair in combinations(range(16), 2):
        assert np.any(columns[list(pair)].sum(axis=0) % 2)
    plane = np.all(points[:, :2] == 0, axis=1)
    assert plane.sum() == 4
    close(columns[plane].sum(axis=0) % 2, np.zeros(5), "weight-four centralizer")
    pair_code = np.array([[1, 1, 0, 0], [0, 0, 1, 1]])
    parity_dual = np.array([1, 1, 0, 0])
    assert parity_dual.sum() == 2 and parity_dual @ np.ones(4, dtype=int) % 2 == 0
    four_words = np.array(list(product([0, 1], repeat=4)))
    assert np.sum(np.all(four_words @ pair_code.T % 2 == 0, axis=1)) == 4
    for k, degree, expected in [(3, 0, {0, 8}), (4, 1, {0, 8, 16}),
                                (5, 2, {0, 8, 12, 16, 20, 24, 32})]:
        cube = np.array(list(product([0, 1], repeat=k)), dtype=np.int16)
        monomials = [cube[:, J].prod(axis=1) for d in range(degree+1) for J in combinations(range(k), d)]
        coefficients = (np.arange(2**len(monomials))[:, None] >> np.arange(len(monomials))) & 1
        observed = ((coefficients @ monomials) % 2).sum(axis=1)
        assert set(observed) == expected
        assert not any(2*(k+1) < weight <= 14 for weight in expected)

    tetrahedron = np.array([[1, 1, 1], [-1, -1, 1], [1, -1, -1], [-1, 1, -1]])
    phase_points = np.array([(ident + np.einsum("i,ijk->jk", s, pauli))/2 for s in tetrahedron])

    def wigner(r):
        return (1 + tetrahedron @ r) / 4

    one_vertices = [wigner(s * axis) for axis in axes for s in [-1, 1]]
    product_vertices = [np.outer(a, b) for a, b in product(one_vertices, repeat=2)]
    entangled_vertices = [(1 + tetrahedron @ O @ tetrahedron.T) / 16
                          for O in signed_permutations if np.linalg.det(O) < 0]
    assert len(product_vertices) == 36 and len(entangled_vertices) == 24
    free = np.array(product_vertices + entangled_vertices)
    for vertex in entangled_vertices:
        close(vertex.sum(axis=0), np.ones(4)/4, "uniform entangled marginal")
        close(vertex.sum(axis=1), np.ones(4)/4, "uniform entangled marginal")
        assert set(vertex.ravel()) in ({0., .25}, {-.125, .125})
    for i in range(12):
        phi = i * np.pi / 11
        w = wigner(np.array([np.cos(phi), np.sin(phi), 0]) * (.6 + i/30))
        v = wigner(np.array([np.sin(phi / 2), np.cos(phi / 2), 0]))
        p, q = np.clip(w, 0, .5), np.clip(v, 0, .5)
        close([p.sum(), q.sum()], [1, 1], "equatorial clip feasibility")
        c1, c2 = np.abs(w-p).sum(), np.abs(v-q).sum()
        close([np.abs(w).sum(), np.abs(v).sum()], [1+c1, 1+c2], "equatorial one-qubit distance")
        dual = np.outer(np.where(w < 0, -1, 1), np.where(v < 0, -1, 1))
        assert np.max(np.sum(free * dual, axis=(1, 2))) <= 1
        close(np.abs(np.outer(w, v)-np.outer(p, q)).sum(), c1+c2+c1*c2, "equatorial primal certificate")
    ra, rb, rs = np.array([3, 4, 0])/5, np.array([5, 12, 0])/13, np.array([1, 4, 8])/9
    wa, wb, ws = [wigner(v) for v in [ra, rb, rs]]
    close(wa, [3/5, -1/10, 1/5, 3/10], "first rational Wigner example")
    close(wb, [15/26, -1/13, 3/26, 5/13], "second rational Wigner example")
    close(ws, np.array([11, 6, -1, 2]) / 18, "non-equatorial Wigner example")
    close(np.abs(ws-np.array([9, 7, 0, 2]) / 18).sum(), 2/9, "one-qubit non-equatorial distance")
    close(np.abs(wa).sum()**2 - 1, 11/25, "equatorial tensor value")
    dual = np.array([[1, 1, -1, 1], [-1, -1, 1, -1], [1, -1, -1, -1], [1, -1, -1, -1]])
    close(dual.sum(), -4, "nonfactorising dual sum")
    close(np.max(np.sum(free * dual, axis=(1, 2))), .5, "nonfactorising dual maximum")
    ent_vector = np.array([1, -1, 1j, 1j]) / 2
    entangled = np.outer(ent_vector, ent_vector.conj())
    W_entangled = np.array([[np.trace(entangled @ np.kron(a, b)).real / 4 for b in phase_points]
                            for a in phase_points])
    close(W_entangled, np.array([[1, 1, -1, 1], [-1, 1, 1, 1], [1, -1, 1, 1], [1, 1, 1, -1]])/8,
          "entangled primal certificate")
    qX, qY, qZ = [wigner(axis) for axis in axes]
    primal = np.array([np.outer(qX, qY), np.outer(qY, qY), np.outer(qX, qZ), np.outer(qY, qZ),
                       W_entangled])
    close(np.sum(primal * dual, axis=(1, 2)), np.ones(5)/2, "active free vertices")
    for w, mix, joint, ratio, one in [(wa, np.array([3, 8, 15, 17, 2])/45, 7/18, 7/18, 1/5),
                                      (wb, np.array([4, 24, 27, 58, 4])/117, 79/234, 17/36, 2/13)]:
        assert np.all(mix >= 0)
        close(mix.sum(), 1, "primal weights")
        marginal_matrix = np.outer(w, ws)
        close(np.abs(marginal_matrix-np.einsum("i,ijk->jk", mix, primal)).sum(), joint, "primal Wigner distance")
        close(np.sum(marginal_matrix * dual) - .5, joint, "dual Wigner distance")
        close(((1+one)*(1+2/9)-1-joint)/one, ratio, "tensor deficit ratio")
    assert 7/18 != 17/36

    orthogonal = np.array([[7, 8, 8], [8, 7, 8], [8, 8, 7]])
    close(orthogonal.sum(axis=1), [23, 23, 23], "Clifford graph row sums")
    close(orthogonal.T @ orthogonal, np.eye(3)*177 + (np.ones((3, 3))-np.eye(3))*176,
          "Clifford graph Gram")
    close((orthogonal.T @ orthogonal) % 11, np.eye(3), "Clifford graph orthogonality")
    gaussian = np.array([-2, 0, -2j, 1-2j, -1-1j, 1+2j, -1-2j, -2, -2j, 2-1j, 1-1j])
    close(np.vdot(gaussian, gaussian), 40, "third-moment normalization")
    words = np.indices((11, 11, 11)).reshape(3, -1).T
    images = words @ orthogonal.T % 11
    terms = gaussian[words].prod(axis=1) * gaussian[images].prod(axis=1).conj()
    row_sums = terms.reshape(11, 121).sum(axis=1)
    close(row_sums.real, [58, 0, -236, 153, -644, -10, -47, 0, -208, 301, -563],
          "third-moment exact row sums")
    close(row_sums.sum(), -1196, "third-moment exact numerator")
    close(terms.sum() / 40**3, -299/16000, "negative third moment")

    correlations = np.array([[np.kron(a, b) for b in pauli] for a in pauli])
    left_paulis = np.array([np.kron(a, ident) for a in pauli])
    right_paulis = np.array([np.kron(ident, a) for a in pauli])

    def steering_statistics(state):
        a = np.trace(state @ left_paulis, axis1=-2, axis2=-1).real
        b = np.trace(state @ right_paulis, axis1=-2, axis2=-1).real
        corr = np.trace(state @ correlations, axis1=-2, axis2=-1).real
        norm_sq = a @ a
        centre = b if norm_sq >= 1 - 1e-12 else (b - corr.T @ a) / (1 - norm_sq)
        return np.linalg.norm(centre), np.linalg.norm(corr)

    for state, t, f3 in [(R, 0, np.sqrt(3)), (np.eye(4)/4, 0, 0),
                          (np.kron(projectors[0], projectors[0]), 1, 1)]:
        close(steering_statistics(state), [t, f3], "steering endpoint")
    for _ in range(40):
        t, f3 = steering_statistics(random_density(4))
        assert f3 <= max(1., np.sqrt(3 * (1 - t))) + eps
    for t in [0., .2, .4, .6, .65, 2/3]:
        d = 2 - 2*t - t*t
        s = t*(1-t)/d
        vector = np.array([np.sqrt(1+s), 0., 0., np.sqrt((1-t)*(1-s))])
        unswapped = np.outer(vector, vector)/2 + np.diag([0., t*(1-s)/2, 0., 0.])
        state = unswapped[np.ix_([0, 2, 1, 3], [0, 2, 1, 3])]
        close(np.trace(state), 1, "steering witness normalization")
        assert np.linalg.eigvalsh(state)[0] >= -eps
        radius, f3 = steering_statistics(state)
        close(radius, t if t < 2/3 else 1, "steering witness centre")
        close((f3*f3 - 1)*d, (2 - 3*t)**2, "steering witness correlation")
        assert (f3 > 1) if t < 2/3 else abs(f3 - 1) <= eps

    print("Magic and divergences: matrix formulas and finite certificates pass.")


def check_fluid():
    rng = np.random.default_rng(971)
    equal = np.testing.assert_allclose

    # Lamb vector and its curl, tested on arbitrary affine velocity jets.
    for _ in range(24):
        derivative = rng.normal(size=(3, 3))
        derivative -= np.trace(derivative) * np.eye(3) / 3
        velocity = rng.normal(size=3)
        vorticity = np.array([
            derivative[2, 1] - derivative[1, 2],
            derivative[0, 2] - derivative[2, 0],
            derivative[1, 0] - derivative[0, 1],
        ])
        lamb = np.cross(vorticity, velocity)
        equal(derivative @ velocity, derivative.T @ velocity + lamb)
        lamb_derivative = np.cross(vorticity, derivative.T).T
        lamb_curl = np.array([
            lamb_derivative[2, 1] - lamb_derivative[1, 2],
            lamb_derivative[0, 2] - lamb_derivative[2, 0],
            lamb_derivative[1, 0] - lamb_derivative[0, 1],
        ])
        equal(lamb_curl, -derivative @ vorticity, atol=1e-12)
    xv, yv = 0.2, -0.7
    equal(np.cross([0, 0, 2], [-yv, xv, 0]), [-2 * xv, -2 * yv, 0])
    for s in (0.0, 0.3, 0.8, 1.0):
        planar = np.array([[1-s, -s], [s, s-1]])
        equal(planar @ planar, (1-2*s) * np.eye(2), atol=1e-12)
        equal(planar[1, 0] - planar[0, 1], 2*s)
    equal(2*0.8, 1.6)
    for radius in (0.4, 1.0, 2.0):
        angles = np.linspace(0, 2*np.pi, 128, endpoint=False)
        xy = radius * np.array([np.cos(angles), np.sin(angles)]).T
        tangent = xy @ np.array([[0, 1], [-1, 0]])
        equal(2*np.pi * np.mean(np.sum(tangent*tangent, axis=1)),
              2*np.pi*radius**2)

    alpha, viscosity, circulation = 1.7, 0.2, 1.2
    q = alpha / (4 * viscosity)
    radius = np.linspace(0.01, 3.0, 100)
    vorticity = alpha * circulation / (4 * np.pi * viscosity) * np.exp(-q*radius**2)
    w_prime = -2*q*radius*vorticity
    w_second = (4*q*q*radius**2 - 2*q)*vorticity
    equal(-alpha*radius*w_prime/2, alpha*vorticity+viscosity*(w_second+w_prime/radius))
    radii = np.linspace(0, 6, 10001)
    center = alpha * circulation / (4 * np.pi * viscosity)
    equal(np.trapezoid(center * np.exp(-q*radii**2)*2*np.pi*radii, radii),
          circulation, rtol=1e-6)
    equal(circulation / center, 4 * np.pi * viscosity / alpha)
    equal(np.prod(np.exp([-alpha*1.5/2, -alpha*1.5/2])), np.exp(-alpha*1.5))
    diffusion = 4*np.pi*0.012
    slope = 0.5 - diffusion
    area = 1 - slope*2.4
    equal(round(diffusion, 3), 0.151)
    equal(round(area, 3), 0.162)
    equal(round(1/area, 2), 6.18)
    equal(round(1/slope, 2), 2.86)

    # Generic quadratic readout increment and independent leakage terms.
    projection = np.diag([1., 0., 0.])
    linear = rng.normal(size=(3, 3))
    coefficients = rng.normal(size=(3, 3, 3))

    def bilinear(x, y):
        return np.einsum("ijk,j,k->i", coefficients, x, y)

    def field(x):
        return linear @ x - bilinear(x, x)

    visible = np.array([0.7, 0., 0.])
    hidden = np.array([0., -0.5, 1.1])
    increment = projection @ (field(visible+hidden) - field(visible))
    equal(increment, projection @ (linear @ hidden - bilinear(hidden, hidden)
                                  - bilinear(visible, hidden) - bilinear(hidden, visible)))
    equal(projection @ (field(hidden) - field(-hidden)), 2*projection @ linear @ hidden)
    equal(projection @ (field(hidden) + field(-hidden)), -2*projection @ bilinear(hidden, hidden))
    coefficients[0, 0, 1:] = 0
    coefficients[0, 1:, 0] = 0
    coefficients[0, 1:, 1:] = 0
    linear[0, 1:] = 0
    equal(projection @ field(visible+hidden), projection @ field(visible))

    # Compute retained Fourier convolution directly with both input orders.
    retained = ((0, 1), (1, 0), (-1, 0), (-1, 1), (1, -1), (0, -1))
    a = {(1, 0): np.array([0., 0.5]), (-1, 0): np.array([0., 0.5])}
    b = {(-1, 1): np.array([0.5, 0.5]), (1, -1): np.array([0.5, 0.5])}

    def advect(left, right, k):
        wave = np.asarray(k)
        total = np.zeros(2, dtype=complex)
        for h, u in left.items():
            for j, v in right.items():
                if tuple(np.asarray(h) + j) == k:
                    total += 1j * np.dot(u, j) * v
        return total - np.dot(wave, total) * wave / np.dot(wave, wave)

    for k in retained:
        full = advect(a | b, a | b, k)
        equal(full, advect(a, a, k) + advect(a, b, k)
              + advect(b, a, k) + advect(b, b, k))
        equal(np.dot(k, full), 0., atol=1e-12)
        equal(full.conj(), advect(a | b, a | b, (-k[0], -k[1])))
    k = (0, 1)
    equal(advect(a, b, k) + advect(b, a, k), [0.25j, 0.])
    equal(advect(b, b, k), [0., 0.])
    for nu in (0., 0.5, 4.):
        zero = np.zeros(2)
        gap = -nu * np.dot(k, k) * b.get(k, zero) - advect(a | b, a | b, k) + advect(a, a, k)
        equal(gap, [-0.25j, 0.])
    # A single shear mode satisfies the Duhamel equation in every tested grade.
    for grade in (0, 2, 4, 10):
        time = 0.7
        damping = 0.3
        weight = 2**(grade/2)
        derivative = weight * (np.exp(-damping*(time+1e-5)) -
                               np.exp(-damping*(time-1e-5))) / (2e-5)
        equal(derivative, -damping*weight*np.exp(-damping*time))
    for m in (1, 3, -4):
        theta = np.linspace(0, 2*np.pi, 256, endpoint=False)
        wave = 2.3 * np.cos(m*theta)
        equal(wave.mean(), 0., atol=1e-12)
        equal((wave**2).mean(), 2.3**2/2)

    def damped_field(point, nu):
        x, y = point
        return np.array([-nu*x-y*y, -nu*y+x*y])

    for nu in (0., 0.25, 1.):
        equal(damped_field([0, 0], nu)[0], 0.)
        equal(damped_field([0, 1], nu)[0], -1.)
        point = rng.normal(size=2)
        norm_squared = point @ point
        equal(2 * point @ damped_field(point, nu), -2*nu*norm_squared, atol=1e-12)
        for _ in range(100):
            step = .01
            k1 = damped_field(point, nu)
            k2 = damped_field(point + step*k1/2, nu)
            k3 = damped_field(point + step*k2/2, nu)
            k4 = damped_field(point + step*k3, nu)
            point += step*(k1 + 2*k2 + 2*k3 + k4)/6
        equal(point @ point, norm_squared*np.exp(-2*nu), atol=2e-8)
    for h in (0.001, 0.005, 0.009):
        tau = np.logspace(-9, -1)
        radial, axial, speed = tau**0.5, tau**(0.5-h), tau**(-0.5-h)
        equal(radial / axial, tau**h)
        equal(speed**2 * radial**2 * axial, tau**(0.5-3*h))
        assert np.all(np.diff(speed) < 0) and np.all(np.diff(radial) > 0)
    for speed, length, nu in ((1., 1., 0.1), (2., 3., 0.05)):
        epsilon = speed**3 / length
        eta = (nu**3/epsilon)**0.25
        equal((epsilon*eta)**(1/3)*eta/nu, 1.)
        equal((length/eta)**3, (speed*length/nu)**(9/4))

    # Differentiate the Cartesian vector field, independently of the Fourier proof.
    rotation = np.array([[0., -1.], [1., 0.]])

    def vortex_field(points, b, omega):
        signs = (-1.)**np.arange(len(points))
        result = omega * signs[:, None] * (points @ rotation.T)
        for j, point in enumerate(points):
            for k, other in enumerate(points):
                if k != j:
                    chord = point - other
                    result[j] += (b/2) * signs[k] * (rotation @ chord) / (chord @ chord)
        return result

    def vortex_jacobian(points, b, omega):
        signs = (-1.)**np.arange(len(points))
        count = len(points)
        blocks = np.zeros((count, 2, count, 2))
        for j, point in enumerate(points):
            blocks[j, :, j, :] = signs[j] * omega * rotation
            for k, other in enumerate(points):
                if k != j:
                    chord = point - other
                    squared = chord @ chord
                    derivative = (b/2) * signs[k] * rotation @ (
                        np.eye(2)/squared - 2*np.outer(chord, chord)/squared**2
                    )
                    blocks[j, :, j, :] += derivative
                    blocks[j, :, k, :] -= derivative
        return blocks.reshape(2*count, 2*count)

    def polygon(count, radius=1., angle=0.):
        theta = 2*np.pi*np.arange(count)/count + angle
        return radius*np.stack((np.cos(theta), np.sin(theta)), axis=1)

    expected_small = {
        1: [1j/np.sqrt(2)],
        2: [np.sqrt(2)*1j, 0.5j, 0.5j],
        3: [3j/np.sqrt(2), 1j, 1j, 1/np.sqrt(2), 1/np.sqrt(2)],
        4: [2*np.sqrt(2)*1j, 1.5j, 1.5j, np.sqrt(2), np.sqrt(2),
            np.sqrt(7)/2, np.sqrt(7)/2],
    }
    for m in range(1, 10):
        count = 2*m
        points = polygon(count)
        signs = (-1.)**np.arange(count)
        jacobian = vortex_jacobian(points, 2., 0.5)
        equal(vortex_field(points, 2., 0.5), 0., atol=1e-12)
        for delta in (-0.04, 0.05):
            away = points*(1+delta)
            wedge = np.sum((away @ rotation.T)*vortex_field(away, 2., 0.5), axis=1)
            equal(wedge, signs*((1+delta)**2/2-0.5), atol=1e-12)
        odd = polygon(2*m+1)
        equal((rotation @ odd[0]) @ vortex_field(odd, 2., 0.5)[0], 0.5)
        chord = points[:, None] - points[None, :]
        squared = np.sum(chord**2, axis=-1)
        weights = np.divide(1., squared, out=np.zeros_like(squared), where=squared != 0.)
        modes = np.arange(count)
        fourier = np.exp(2j*np.pi*np.outer(modes, modes)/count)
        eigenvalues = (count*count-1)/12 - modes*(count-modes)/2
        equal(weights @ fourier, fourier * eigenvalues, atol=2e-12)
        local = np.zeros((count, 2, count, 2))
        local[modes, :, modes, 0] = points
        local[modes, :, modes, 1] = points @ rotation.T
        local = local.reshape(2*count, 2*count)
        radial = np.arange(0, 2*count, 2)
        tangent = radial+1
        transformed = local.T @ jacobian @ local
        equal(transformed[np.ix_(radial, radial)], 0., atol=2e-12)
        equal(transformed[np.ix_(tangent, tangent)], 0., atol=2e-12)
        equal(transformed[np.ix_(radial, tangent)],
              (eigenvalues[m]*np.eye(count)-weights)*signs, atol=2e-12)
        equal(transformed[np.ix_(tangent, radial)],
              ((eigenvalues[m]+1)*np.eye(count)-weights)*signs, atol=2e-12)

        chain0 = (points @ rotation.T).ravel()
        chain1 = (signs[:, None]*points/(1-m*m/2)).ravel()
        equal(jacobian @ chain0, 0., atol=2e-12)
        equal(jacobian @ chain1, chain0, atol=2e-12)
        equal(jacobian @ (chain1+10*chain0), chain0, atol=2e-11)
        assert np.linalg.matrix_rank(jacobian, tol=1e-8) == 2*count-1
        assert np.linalg.matrix_rank(jacobian @ jacobian, tol=1e-8) == 2*count-2
        assert np.linalg.matrix_rank(jacobian @ jacobian @ jacobian, tol=1e-8) == 2*count-2

        squared = (m-np.minimum(modes, count-modes))**2 * (
            np.minimum(modes, count-modes)**2 - 2
        )/4
        roots = np.sqrt(squared.astype(complex))
        for root in np.unique(roots):
            multiplicity = np.count_nonzero(roots == root)
            if root != 0:
                for sign in (-1, 1):
                    rank = np.linalg.matrix_rank(jacobian-sign*root*np.eye(2*count), tol=1e-8)
                    assert 2*count-rank == multiplicity
        assert len(np.unique(roots[roots.real > 0])) == max(0, m-2)
        assert np.count_nonzero(roots.real > 0) == 2*max(0, m-2)
        if m <= 4:
            for root in np.unique(expected_small[m]):
                assert np.count_nonzero(np.isclose(roots, root)) == expected_small[m].count(root)
        for b_coefficient, omega in ((1., 1.), (1.35, 0.25)):
            radius = np.sqrt(b_coefficient/(4*omega))
            equal(vortex_field(polygon(count, radius, 0.3), b_coefficient, omega), 0., atol=2e-12)
            physical = vortex_jacobian(radius*points, b_coefficient, omega)
            equal(physical, 2*omega*jacobian, atol=2e-12)
            if m == 4:
                positives = np.sort(np.linalg.eigvals(physical).real)[-4:]
                expected = omega*np.array([np.sqrt(7), np.sqrt(7), 2*np.sqrt(2), 2*np.sqrt(2)])
                equal(positives, expected)
    equal(round(np.exp(10/np.sqrt(2)), 3), 1177.405)
    equal(1e-3*np.array([10, 100]), [0.01, 0.1])
    # Evolve displacement from the normalized equilibrium. The difference quotient
    # below evaluates g(d+h)-g(d) without subtracting nearly equal velocities.
    def vortex_displacement(points, displacement):
        count = len(points)
        signs = (-1.)**np.arange(count)
        chords = points[:, None] - points[None, :]
        shifts = displacement[:, None] - displacement[None, :]
        diagonal = np.eye(count)
        old_squared = np.sum(chords*chords, axis=-1) + diagonal
        change_squared = np.sum(shifts*(2*chords+shifts), axis=-1)
        new_squared = old_squared + change_squared
        interaction = (shifts/new_squared[..., None]
                       - chords*(change_squared/(old_squared*new_squared))[..., None])
        total = np.einsum("k,jkc->jc", signs, interaction)
        return (signs[:, None]*displacement/2 + total) @ rotation.T

    def vortex_run(points, perturbation, final_time, step):
        displacement = perturbation.copy()
        for _ in range(round(final_time / step)):
            k1 = vortex_displacement(points, displacement)
            k2 = vortex_displacement(points, displacement+step*k1/2)
            k3 = vortex_displacement(points, displacement+step*k2/2)
            k4 = vortex_displacement(points, displacement+step*k3)
            displacement += step*(k1+2*k2+2*k3+k4)/6
        return displacement

    hexagon = polygon(6)
    _, _, right_vectors = np.linalg.svd(vortex_jacobian(hexagon, 2., .5)
                                        - np.eye(12)/np.sqrt(2))
    unstable = right_vectors[-1].reshape(6, 2)
    for step in (0.1, 0.05):
        magnification = np.linalg.norm(vortex_run(hexagon, 1e-9*unstable, 10, step))/1e-9
        equal(magnification, np.exp(10/np.sqrt(2)), rtol=2e-6)
        equal(round(magnification, 1), 1177.4)

    square = polygon(4)
    alternating = (-1.)**np.arange(4)
    initial = -1e-3*alternating[:, None]*square
    for step in (0.1, 0.05):
        for final_time, angle in ((10, .0100001), (100, .100001)):
            displaced = square + vortex_run(square, initial, final_time, step)
            cross = square[:, 0]*displaced[:, 1] - square[:, 1]*displaced[:, 0]
            dot = np.sum(square*displaced, axis=1)
            equal(np.mean(np.arctan2(cross, dot)), angle, atol=4e-7)
    print("Lamb identity, reduced advection, fluid scalings and point-vortex checks passed")

def check_five_step_interval():
    """Verify the integer certificate and sample the polynomial state near zero."""
    u = np.array([[-3, -4, 0], [4, -3, 0], [0, 0, 5]], dtype=object)
    v = np.array([[13, 0, 0], [0, -12, -5], [0, 5, -12]], dtype=object)
    np.testing.assert_array_equal(u.T @ u, 25 * np.eye(3, dtype=int))
    np.testing.assert_array_equal(v.T @ v, 169 * np.eye(3, dtype=int))
    rows = []
    for k in range(6):
        c = np.linalg.matrix_power(v.T, k) @ np.linalg.matrix_power(u, k)
        rows.append([c[0, 0], c[1, 1], c[2, 2],
                     c[0, 1] + c[1, 0], c[0, 2] + c[2, 0], c[1, 2] + c[2, 1]])
    matrix = np.array(rows, dtype=object)
    reduced = matrix % 17
    pivots = []
    swap_count = 0
    for j in range(6):
        pivot = next(i for i in range(j, 6) if reduced[i, j])
        if pivot != j:
            reduced[[j, pivot]] = reduced[[pivot, j]]
            swap_count += 1
        value = int(reduced[j, j])
        pivots.append(value)
        for i in range(j + 1, 6):
            factor = int(reduced[i, j]) * pow(value, -1, 17) % 17
            reduced[i] = (reduced[i] - factor * reduced[j]) % 17
    assert pivots == [1, 7, 6, 1, 1, 2] and swap_count == 1
    assert (-pivots[0] * pivots[1] * pivots[2] * pivots[3] * pivots[4] * pivots[5]) % 17 == 1
    numerator = np.array([10965864067184, 23135350229691, 6642961175125,
                          -1761032689988, 614008149300, -4261233628850], dtype=object)
    denominator = 40744175472000
    np.testing.assert_array_equal(matrix @ numerator, [denominator, 0, 0, 0, 0, 0])

    def symmetric(values):
        a, b, c, d, e, f = values
        return np.array([[a, d, e], [d, b, f], [e, f, c]])

    state_numerator = symmetric(numerator)
    margins = state_numerator.diagonal() - np.abs(
        state_numerator - np.diag(state_numerator.diagonal())
    ).sum(axis=1)
    np.testing.assert_array_equal(margins, [8590823227896, 17113083910853, 1767719396975])
    matrix_scaled = matrix.astype(float) / (65.0 ** np.arange(6))[:, None]
    a, b = u.astype(float) / 5, v.astype(float) / 13
    for multiplier in np.linspace(-.01, .01, 11):
        target = multiplier ** np.arange(6)
        state = symmetric(np.linalg.solve(matrix_scaled, target))
        assert np.linalg.eigvalsh(state)[0] > 0
        observed = [np.trace(np.linalg.matrix_power(b.T, k) @ np.linalg.matrix_power(a, k) @ state)
                    for k in range(6)]
        np.testing.assert_allclose(observed, target, rtol=0, atol=1e-12)
    print("Five-step dephasing interval: integer certificate and trace equations pass.")


if __name__ == "__main__":
    check_updates_and_channels()
    check_record_models()
    check_five_step_interval()
    check_posterior_models()
    check_horizons()
    check_magic_and_divergences()
    check_fluid()
    print("All n9 checks passed.")
