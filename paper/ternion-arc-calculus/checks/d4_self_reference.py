"""Finite numerical checks for Section 5C (self-reference at finite comparison rank)."""
from itertools import combinations, product
from math import comb, factorial

import numpy as np


ATOL = 3e-12
RNG = np.random.default_rng(24)


def close(actual, expected, atol=ATOL):
    np.testing.assert_allclose(actual, expected, atol=atol, rtol=0)


def rotation(theta):
    return np.array([
        [np.cos(theta), -np.sin(theta)],
        [np.sin(theta), np.cos(theta)],
    ])


def unit(vector):
    return vector / np.linalg.norm(vector)


def ranks():
    """d4:def, rank, mapkernel, small, spectral, gram-tail, tower."""
    for r in (1, 2, 3, 4, 8):
        identity = np.eye(r)
        differences = []
        for i, j in product(range(r), repeat=2):
            perm = identity.copy()
            perm[:, [i, j]] = perm[:, [j, i]]
            flipped = perm.copy()
            flipped[:, j] *= -1
            close(perm.T @ perm, identity)
            close(flipped.T @ flipped, identity)
            differences.append(((perm - flipped) / 2).ravel())
        assert np.linalg.matrix_rank(differences) == r**2
        a, b = np.array(differences[:2]) if r > 1 else (np.ones(1), -np.ones(1))
        close(2 * (a @ b), a @ a + b @ b - (a - b) @ (a - b))
        points = RNG.normal(size=(r + 3, r))
        close((points @ perm).dot((points @ perm).T), points @ points.T)
        assert np.linalg.matrix_rank(points @ points.T) == r

    factors = [np.eye(2), np.array([[0, 1], [1, 0]]),
               np.diag([1, -1]), rotation(np.pi / 2)]
    for exponent in (1, 2, 3):
        r = 2**exponent
        vectors = []
        for sequence in product(factors, repeat=exponent):
            matrix = np.ones((1, 1))
            for factor in sequence:
                matrix = np.kron(matrix, factor)
            close(matrix.T @ matrix, np.eye(r))
            vectors.append(matrix.ravel() / np.sqrt(r))
        frame = np.array(vectors)
        close(frame @ frame.T, np.eye(r**2))
        assert np.linalg.matrix_rank(frame) == r**2
        truncated = frame[:, :r] @ frame[:, :r].T
        close(np.linalg.norm(np.eye(r**2) - truncated, 'fro')**2, r**2 - r)
        assert np.max(np.abs(np.eye(r**2) - truncated)) >= np.sqrt(r**2-r)/r**2

    feature = RNG.normal(size=(7, 5))
    gram = feature @ feature.T
    eigenvalues, eigenvectors = np.linalg.eigh(gram)
    p = eigenvectors[:, -3:]
    candidate = (p * eigenvalues[-3:]) @ p.T
    close(np.linalg.norm(gram - candidate, 'fro')**2, np.sum(eigenvalues[:-3]**2))
    # A constant update to the truncation reaches its fixed table in one step.
    table = np.zeros_like(gram)
    update = lambda table: candidate.copy()
    fixed_table = update(table)
    close(update(fixed_table), fixed_table)
    assert np.linalg.norm(gram-fixed_table, 'fro') > 0
    random_projection, _ = np.linalg.qr(RNG.normal(size=(7, 3)))
    remainder = (np.eye(7) - random_projection @ random_projection.T) @ gram
    assert np.linalg.norm(remainder, 'fro')**2 >= np.sum(eigenvalues[:-3]**2)
    for alpha, beta in ((0, 1), (1, 2), (3, -1)):
        close(np.trace(rotation(alpha).T @ rotation(beta)) / 2, np.cos(beta-alpha))
    close(np.trace(factors[0].T @ factors[1]), 0)
    close(np.array([[-1], [1]]) @ np.array([[-1, 1]]), [[1, -1], [-1, 1]])
    close(np.diag([1, -1]) @ [1, 0], [1, 0])
    # Right multiplication by a+bi on C and by a unit imaginary on H.
    quat_right_i = np.kron(np.eye(2), rotation(np.pi / 2))
    close(quat_right_i.T @ quat_right_i, np.eye(4))
    a, b = unit(RNG.normal(size=2)), unit(RNG.normal(size=2))
    right_a = a[0] * np.eye(4) + a[1] * quat_right_i
    right_b = b[0] * np.eye(4) + b[1] * quat_right_i
    close(np.trace(right_a.T @ right_b) / 4, a @ b)
    assert [r**2 for r in (2, 4, 8)] == [4, 16, 64]
    assert [(-1)**(n+1) for n in (2, 4, 6)] == [-1, -1, -1]
    for vertices, edges, faces in ((4, 6, 4), (6, 12, 8), (12, 30, 20)):
        assert 3*faces == 2*edges and vertices-edges+faces == 2
        close(2*np.pi*vertices-np.pi*faces, 4*np.pi)


def tables():
    """d4:diagonal, tables, logic."""
    rows = np.array(list(product((0, 1), repeat=2)))
    q = np.array([0, 0, 0, 1])
    diag = 1 - rows[np.arange(4), q]
    close(diag, [1, 1, 0, 0])
    assert len(set(q)) == 2 and len(set(zip(q, diag))) == 3
    for i, row in enumerate(rows):
        assert np.max(abs(diag - row[q])) >= abs(diag[i] - row[q[i]]) == 1
    for n in range(1, 5):
        predicates = np.array(list(product((0, 1), repeat=n)))
        assert len(predicates) == 2**n
        assert np.linalg.matrix_rank(predicates @ predicates.T) == n
        assert np.array_equal(np.eye(n) @ np.eye(n).T, np.eye(n))
        # The affine diagonal escape is tested over all Boolean catalogues on two addresses.
        for entries in product((0, 1), repeat=4):
            evaluation = np.reshape(entries, (2, 2))
            diagonal = 1 - evaluation.diagonal()
            assert all(np.any(row != diagonal) for row in evaluation)
    w = np.array([1, 0, 1])
    x = np.array(list(product((0, 1), repeat=3)))
    close(x @ w % 2, [0, 1, 0, 1, 1, 0, 1, 0])
    angles = np.array([0.2, -0.8, 1.4])
    for row in x:
        composed = np.eye(2)
        for bit, theta in zip(row, angles):
            composed = composed @ rotation(bit * theta)
        close(composed, rotation(row @ angles))
    assert all(t + np.exp(-t) > t for t in (0, 1, 10))
    assert np.exp(-30) < 1e-12


def fixed_points():
    """d4:fixed, defect, iteration, full, stopping, cosine, readouts."""
    for q in (0, 0.2, 0.9):
        for n in range(15):
            z = q**n
            eta = abs(q*z-z)
            close(eta, (1-q)*q**n)
            assert (1-q)*abs(z) <= eta + ATOL <= (1+q)*abs(z)+2*ATOL
            close(abs(z), q**n * (1-q)/(1-q))
            for b in (0, 0.025, -0.8):
                close(np.linalg.norm([q*z-z, b])**2, eta**2 + b**2)
    cap = lambda x: np.sin((np.pi/3)*np.tanh(2*x))
    assert cap(0.01) > 0.01 and cap(1) < 1
    close(cap(-0.37), -cap(0.37))
    assert np.cos((np.pi/3)*np.tanh(2)) > 0
    assert len({frozenset(range(i)) for i in range(5)}) - 1 == 4
    assert [0, 0, 1, 1][0:2] == [0, 0] and [0, 0, 1, 1][2] == 1

    x = np.zeros(101)
    for j in range(100):
        x[j+1] = np.cos(x[j])
    theta = x[-1]
    lam = np.sin(theta)
    close(theta, np.cos(theta))
    assert 0 < theta < 1
    close(theta**2 + lam**2, 1)
    errors = np.abs(np.diff(x[:6]))
    close(np.round(errors, 6), [1, 0.459698, 0.317251, 0.203263, 0.139191])
    assert np.all(errors[:4] > 0.150) and errors[4] <= 0.150
    close(np.round([x[5], theta], 6), [0.793480, 0.739085])
    assert np.all((x[:20] - theta)*(x[1:21] - theta) < 0)
    for dx in (-0.001, 0.001):
        a = theta + dx
        cos_taylor = -lam*dx-theta*dx**2/2
        close(np.cos(a)-theta, cos_taylor, atol=2e-10)
        newton = a - (a-np.cos(a))/(1+np.sin(a))
        close(newton-theta, theta*dx**2/(2*(1+lam)), atol=3e-10)
    samples = np.linspace(0, 1, 1001)
    distance = abs(samples-theta)
    defect = abs(samples-np.cos(samples))
    assert np.all((distance <= defect + ATOL) &
                  (defect <= (1+np.sin(1))*distance + ATOL))
    for a, b in ((3, 4), (14, 19), (17, 23), (711, 962)):
        assert 0 < abs(a/b-theta) < 1/b**2
        assert 0 < abs(a/b-np.cos(a/b)) < (1+np.sin(1))/b**2

    phi = (1+np.sqrt(5))/2
    close([1 + 1/phi, 1/(1+1/phi)], [phi, 1/phi])
    close(phi**2-phi-1, 0)
    assert np.all(1 + 1/np.linspace(1.5, 2, 21) >= 1.5)
    assert np.all(1 + 1/np.linspace(1.5, 2, 21) <= 2)
    close(1/1.5**2, 4/9)

    close(2*(theta+np.arcsin(theta)), np.pi)
    terms = [comb(2*k, k)*theta**(2*k+1)/(4**k*(2*k+1)) for k in range(70)]
    close(sum(terms), np.arcsin(theta))
    # Reversion by Lagrange inversion: [Y^n] B = [X^(n-1)] (X/A(X))^n / n.
    nmax = 32
    a_over_x = np.zeros(nmax)
    a_over_x[0] = 4
    for k in range(1, (nmax+1)//2):
        a_over_x[2*k] = 2*comb(2*k, k)/(4**k*(2*k+1))
    reciprocal = np.zeros(nmax)
    reciprocal[0] = 1/4
    for n in range(1, nmax):
        reciprocal[n] = -np.dot(a_over_x[1:n+1], reciprocal[n-1::-1])/4
    powers = np.array([1.0])
    inverse_partial = 0
    for n in range(1, nmax+1):
        powers = np.convolve(powers, reciprocal)[:nmax]
        inverse_partial += powers[n-1]*np.pi**n/n
    close(inverse_partial, theta, atol=1e-10)
    assert 7/2 > np.pi and 1/6/(1-1/20) < 1/5
    assert 1/2/(1-1/12) < 3/5 and (7/4+1/5)/2 < 1
    for angle in np.linspace(0.1, 3, 12):
        r0, gm = 2.0, 3.0
        r = r0*(1+np.cos(angle))/2
        t_ff = np.pi/2*np.sqrt(r0**3/(2*gm))
        speed_sq = (r0*np.pi/(2*t_ff))**2*(1-np.cos(angle))/(1+np.cos(angle))
        close(speed_sq, 2*gm*(1/r-1/r0), atol=2e-10)
    eta = np.pi/2-theta
    close((eta+np.sin(eta))/np.pi, 0.5)
    close((1+np.cos(eta))/2, (1+lam)/2)
    for r in (0, 0.2, theta, 1, np.pi/2):
        for n in range(8):
            a = 1j*r
            bound = np.exp(r)*r**n/factorial(n)
            assert abs(np.exp(a)-sum(a**k/factorial(k) for k in range(n))) <= bound + ATOL
    for n in range(1, 7):
        tail = abs(np.cos(theta)-sum((-1)**k*theta**(2*k)/factorial(2*k) for k in range(n)))
        assert 0 < tail <= theta**(2*n)/factorial(2*n) + 2e-16
    decimal = [int((theta * 10**j % 1)*1000) for j in range(5)]
    assert decimal == [739, 390, 908, 85, 851]


def caps_and_depth():
    """d4:tickhyp, caps, resources, conjecture, programme."""
    single = np.array([[1., 0., 0.]])
    axes = np.vstack((np.eye(3), -np.eye(3)))
    close(1 - ((-single) @ single.T).max(), 2)
    u = unit(np.ones(3))
    radius = np.arccos(np.max(axes @ u))
    residual = 1 - np.cos(radius)
    close(residual, 1-1/np.sqrt(3))
    assert 2/6 <= residual <= 8/6
    close((1-(1+axes @ u)/2).min(), residual/2)
    for m in (2, 3, 4, 6, 20, 1000):
        a = 2*np.arccos(1-2/m)
        close(1-np.cos(a), 8/m-8/m**2)
        close(2*np.pi*(1-np.cos(a/2)), 4*np.pi/m)
    for gate_count in (2, 3, 4):
        for length in range(8):
            assert sum(gate_count**j for j in range(length+1)) == (gate_count**(length+1)-1)//(gate_count-1)
    close(2*(2-1)/(2**4-1), 2/15)
    assert 8*2.0**(-24) < 2/24

    # Compute the minimum depth directly as a longest path in each orientation.
    for n in range(2, 13):
        for kappa in range(1, n//2+1):
            best = n+1
            for rises in combinations(range(n), kappa):
                outgoing = [[] for _ in range(n+1)]
                indegree = [0]*(n+1)
                for i in range(n):
                    source, target = (i, i+1) if i in rises else (i+1, i)
                    outgoing[source].append(target)
                    indegree[target] += 1
                layer = [1]*(n+1)
                queue = [i for i, deg in enumerate(indegree) if deg == 0]
                for i in queue:
                    for target in outgoing[i]:
                        layer[target] = max(layer[target], layer[i]+1)
                        indegree[target] -= 1
                        if indegree[target] == 0:
                            queue.append(target)
                best = min(best, max(layer))
            assert best == n//(kappa+1)+1
    assert 8//3+1 == 3 and 11//3+1 == 4
    c, s = np.cos(np.pi/8), np.sin(np.pi/8)
    close(2*c*c, 1+np.sqrt(2)/2)
    close((1+np.sqrt(2)/2)*(1-np.sqrt(2)/2), 0.5)
    axis = np.array([s*c, -s*s, c*s])
    conjugate = np.r_[rotation(np.pi/4) @ axis[:2], axis[2]]
    assert np.linalg.norm(np.cross(axis, conjugate)) > 0
    hop, rate, time = 0.2, 5, 12
    close(hop*rate*time, 2*(hop*rate*time/2))


def records():
    """d4:record and record-bound, including equality and out-of-support shifts."""
    plus, minus = np.array([1, 1])/np.sqrt(2), np.array([1, -1])/np.sqrt(2)
    rho, sigma = np.outer(plus, plus), np.outer(minus, minus)
    close(np.sum(abs(np.linalg.eigvalsh(rho-sigma)))/2, 1)
    for n in (0, 1, 2, 4, 9, 16, 39):
        for ell in (1, 2, 3, n+2):
            m = n//ell
            chain = np.arange(1, m+2)
            pointer = np.zeros(n+1)
            pointer[::ell] = unit(np.sin(np.pi*chain/(m+2)))
            gamma = np.vdot(pointer[:max(0,n+1-ell)], pointer[ell:])
            close(abs(gamma), np.cos(np.pi/(m+2)))
            assert (1-abs(gamma))/2 > 0
            random_pointer = unit(RNG.normal(size=n+1)+1j*RNG.normal(size=n+1))
            gamma = np.vdot(random_pointer[:max(0,n+1-ell)], random_pointer[ell:])
            assert abs(gamma) <= np.cos(np.pi/(m+2))+ATOL
            channel = np.array([[1, gamma], [gamma.conjugate(), 1]])
            close(np.sum(abs(np.linalg.eigvalsh(channel*(rho-sigma))))/2, abs(gamma))
            corrected = np.abs(channel)
            close(np.sum(abs(np.linalg.eigvalsh(corrected*rho-rho)))/2, (1-abs(gamma))/2)
            close(channel*np.diag([0.3, 0.7]), np.diag([0.3, 0.7]))
            shifted = np.array([np.pad(random_pointer, (0, ell)),
                                np.pad(random_pointer, (ell, 0))])
            close(np.abs(shifted @ shifted.conj().T), np.abs(channel))
    n = 1000
    stable_deficit = np.sin(np.pi/(2*(n+2)))**2
    close(stable_deficit*(n+2)**2, np.pi**2/4, atol=3e-6)


def observations():
    """d4:krylov, monitor, clockhyp, clock, differential, blind."""
    dims = []
    t = np.roll(np.eye(5), 1, axis=1)
    c = np.eye(5)[:1]
    observations = []
    state = RNG.normal(size=5)
    for m in range(7):
        observations.append(c @ np.linalg.matrix_power(t, m))
        matrix = np.vstack(observations)
        dims.append(np.linalg.matrix_rank(matrix))
        _, _, vh = np.linalg.svd(matrix, full_matrices=True)
        close(matrix @ vh[dims[-1]:].T, 0)
        close((matrix @ state).ravel(),
              [float((c @ np.linalg.matrix_power(t, j) @ state)[0]) for j in range(m+1)])
    assert dims == [1, 2, 3, 4, 5, 5, 5]
    sigma = np.array([1, 0.76, 0.54, 0.35, 0.20, 0.10])
    g = np.diag(sigma)
    gn = np.linalg.matrix_power(g, 4)
    close(np.diag(gn), sigma**4)
    close(np.linalg.norm(gn - np.diag(sigma**4*(np.arange(6)<2)), 'fro')**2,
          np.sum(sigma[2:]**8))
    random_vector = unit(RNG.normal(size=6))
    rayleigh = random_vector @ g @ random_vector
    close(rayleigh, np.sum(sigma*random_vector**2))
    assert rayleigh <= sigma[0]
    density = np.outer(random_vector, random_vector)
    unread = np.zeros_like(density)
    for basis in np.eye(6):
        projector = np.outer(basis, basis)
        weight = np.trace(projector @ density)
        close(projector @ density @ projector, weight*projector)
        unread += weight*projector
    close(unread, np.diag(np.diag(density)))
    close(np.trace(unread), 1)
    assert np.sum(sigma**4 > 0.120) == 2
    fractions = [np.sum(sigma[:2]**k)/np.sum(sigma**k) for k in (2, 8, 10)]
    close(np.round(fractions, 6), [0.772689, 0.993334, 0.997997])
    a = RNG.normal(size=(2, 2)) + 1j*RNG.normal(size=(2, 2))
    pinched = np.diag(a.diagonal())
    close(np.linalg.norm(a, 'fro')**2, np.linalg.norm(pinched, 'fro')**2 +
          abs(a[0, 1])**2 + abs(a[1, 0])**2)
    close(np.diag(np.ones((2, 2))/2), np.diag(np.array([[1, -1], [-1, 1]])/2))

    v = np.array([1., 0.])
    p = np.outer(v, v)
    for n in (1, 2, 4, 8, 16, 32, 128):
        u = rotation(np.pi/(4*n))
        h = v.copy()
        survival = v.copy()
        spent = 0.
        for _ in range(n):
            returned = np.linalg.norm(p @ u @ h)**2
            h_new = (np.eye(2)-p) @ u @ h
            close(returned, np.linalg.norm(h)**2-np.linalg.norm(h_new)**2)
            h = h_new
            spent += returned
            survival = p @ u @ survival
        close(spent+np.linalg.norm(h)**2, 1)
        close(np.linalg.norm(survival)**2, np.cos(np.pi/(4*n))**(2*n))
    close(np.round(np.cos(np.pi/64)**32, 6), 0.962166)
    n = 2048
    close(n*(1-np.cos(np.pi/(4*n))**(2*n)), np.pi**2/16, atol=1e-4)

    j = np.kron(np.eye(2), rotation(np.pi/2))
    close(j.T, -j)
    close(j @ j, -np.eye(4))
    v4 = unit(RNG.normal(size=4))
    for angle in (0, 0.1, np.pi/2, np.pi, 2*np.pi):
        phase = np.cos(angle)*np.eye(4)+np.sin(angle)*j
        close(phase.T @ phase, np.eye(4))
        close(v4 @ phase @ v4, np.cos(angle))
        psi = np.array([v4[0]+1j*v4[1], v4[2]+1j*v4[3]])
        effect = np.array([[0.5, 0.2j], [-0.2j, 0.6]])
        phase_psi = np.exp(1j*angle)*psi
        close(np.vdot(phase_psi, effect @ phase_psi), np.vdot(psi, effect @ psi))
    for s in (0, 1, 2, 3):
        c = np.eye(4)[:s]
        x0 = np.r_[np.full(s, 0.2), np.zeros(4-s)]
        w = np.eye(4)[-1]*np.sqrt(1-x0 @ x0)
        close(c @ (x0+w), c @ (x0-w))
        close(np.linalg.norm(x0+w), 1)
        close(np.linalg.norm(x0-w), 1)
    # Hopf ray readout has equality under the right phase and rank two.
    psi = unit(np.array([1+1j, 2+1j]))
    v_perp = unit(np.array([-psi[1].conjugate(), psi[0].conjugate()]))
    tangent = (1j*psi, v_perp, 1j*v_perp)
    d_q = [np.outer(t, psi.conj())+np.outer(psi, t.conj()) for t in tangent]
    assert np.linalg.matrix_rank(np.reshape(d_q, (3, 4)).T) == 2
    close(d_q[0], 0)
    xs = list(np.eye(4))
    xs += [unit(np.eye(4)[i]+np.eye(4)[j]) for i, j in combinations(range(4), 2)]
    projectors = np.array([np.outer(x, x).ravel() for x in xs])
    x = np.array(xs)
    assert np.linalg.matrix_rank(projectors) == 10
    close(projectors @ projectors.T, (x @ x.T)**2)
    close(np.outer(v4, v4), np.outer(-v4, -v4))


def quotient_and_copying():
    """d4:quotients and cloning."""
    digits, remainders = [], []
    r = 1
    for _ in range(6):
        remainders.append(r)
        digit, r = divmod(10*r, 7)
        digits.append(digit)
    assert digits == [1, 4, 2, 8, 5, 7] and r == 1 and len(set(remainders)) == 6
    close(142857/(10**6-1), 1/7)
    for m in (4, 6, 9, 10):
        for d in range(1, m+1):
            if m % d == 0:
                for k in range(m):
                    close(np.sum(np.exp(2j*np.pi*np.arange(d)*k/d)), d if k % d == 0 else 0)
    phase = np.exp(2j*np.pi*np.sqrt(2))
    for n in (1, 10, 100, 1000):
        close(np.sum(phase**np.arange(n)), (1-phase**n)/(1-phase))
        assert abs(np.sum(phase**np.arange(n))) <= 2/abs(1-phase)+ATOL
    for p in (2, 3, 5):
        distance = np.zeros((16, 16))
        for x,y in product(range(16), repeat=2):
            if x != y:
                level = next(k for k in range(1, 8) if x%p**k != y%p**k)
                assert (x-y)%p**(level-1) == 0 and (x-y)%p**level != 0
                distance[x, y] = p**(1-level)
        for y in range(16):
            assert np.all(distance <= np.maximum(distance[:, [y]], distance[[y], :]))
    assert len({(x % 4, x % 3, x % 5) for x in range(60)}) == 60
    for n in range(12):
        s = 0.8+n
        close(1-np.tanh(s), 2/(np.exp(2*s)+1))
        theta = np.arcsin(np.tanh(s))
        close(np.cos(theta), 1/np.cosh(s), atol=3e-12)
        assert np.cos(theta) > 0
    for z in (0.25+1j, 0.5-3j, 1.25+0.2j, 3):
        w = (z-1)/z
        close(abs(w)**2-1, (1-2*np.real(z))/abs(z)**2)
        close(1/(1-w), z)
    x = np.array([1, 0])
    y = unit(np.array([1, 1]))
    overlap = x @ y
    close(np.kron(x,x) @ np.kron(y,y), overlap**2)
    assert 0 < overlap**2 < overlap < 1
    u, v = np.eye(2), np.diag([1, -1])
    assert not np.allclose(u.T @ v, np.trace(u.T @ v)/2*np.eye(2))
    # A controlled gate with orthogonal program states realizes the identity.
    programs = np.eye(2)
    processor = np.block([[u, np.zeros_like(u)], [np.zeros_like(v), v]])
    close(processor.T @ processor, np.eye(4))
    close(processor @ np.kron(programs[0], y), np.kron(programs[0], u @ y))
    close(processor @ np.kron(programs[1], y), np.kron(programs[1], v @ y))


if __name__ == "__main__":
    checks = (ranks, tables, fixed_points, caps_and_depth, records, observations,
              quotient_and_copying)
    for check in checks:
        check()
        print(f"PASS {check.__name__}")
    print(f"PASS all {len(checks)} check groups")

