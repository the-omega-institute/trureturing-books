#!/usr/bin/env python3
"""Deterministic numerical and exact-rational checks (vendored from module m4: pulses, frames and the coined walk)."""

from fractions import Fraction
from itertools import product
import re

import numpy as np
from numpy.polynomial import Polynomial
from numpy.testing import assert_allclose

RNG = np.random.default_rng(420)
TOL = 3e-10
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.diag([1, -1]).astype(complex)
PAULI = np.array([X, Y, Z])
I2 = np.eye(2)
BASIS = np.eye(3)
QI = np.array([1., 0, 0, 0])
PVAR = Polynomial([0, 1])


def close(actual, expected, tol=TOL):
    assert_allclose(actual, expected, rtol=tol, atol=tol)


def unit(v):
    return v / np.linalg.norm(v)


def diagonal(phi):
    return np.diag(np.exp(1j * np.array([phi, -phi])))


def signal(x, y):
    return x * I2 + 1j * y * X


def reflection(x, y):
    return np.array([[x, y], [y, -x]])


def phase_word(x, y, angles):
    word = diagonal(angles[0])
    for phi in angles[1:]:
        word = word @ signal(x, y) @ diagonal(phi)
    return word


def polynomial_word(angles):
    p, q = Polynomial([np.exp(1j * angles[0])]), Polynomial([0j])
    for phi in angles[1:]:
        p, q = (np.exp(1j * phi) * (PVAR * p - (1 - PVAR**2) * q),
                np.exp(-1j * phi) * (p + PVAR * q))
    return p, q


def recover_word(p, q, n):
    """Peel polynomial pairs, allowing insignificant residual coefficients."""
    phases = []
    for k in range(n, 0, -1):
        p_top = p.coef[k] if k <= p.degree() else 0
        q_top = q.coef[k - 1] if k - 1 <= q.degree() else 0
        close(abs(p_top), abs(q_top))
        phi = np.angle(p_top / q_top) / 2 if abs(q_top) > 1e-12 else 0
        p_base = np.exp(-1j * phi) * p
        q_base = np.exp(1j * phi) * q
        p_next = PVAR * p_base + (1 - PVAR**2) * q_base
        q_next = -p_base + PVAR * q_base
        close(p_next.coef[k:], np.zeros_like(p_next.coef[k:]))
        close(q_next.coef[k - 1:], np.zeros_like(q_next.coef[k - 1:]))
        p = Polynomial(p_next.coef[:k])
        q = Polynomial(q_next.coef[:k - 1]) if k > 1 else Polynomial([0])
        phases.append(phi)
    close(abs(p.coef[0]), 1)
    return [np.angle(p.coef[0]), *reversed(phases)]


def matrix_pair(p, q, x, y):
    return np.array([[p(x), 1j * y * q(x)],
                     [1j * y * np.conj(q(x)), np.conj(p(x))]])


def reflection_angles(angles):
    n = len(angles) - 1
    return [angles[0] + angles[-1] + (n - 1) * np.pi / 2,
            *(np.array(angles[1:-1]) - np.pi / 2)]


def reflection_word(x, y, angles):
    word = I2.copy()
    for phi in angles:
        word = word @ diagonal(phi) @ reflection(x, y)
    return word


def sos_from_factor(coefficients, budget):
    """Use the real and imaginary Laurent coefficients as in the proof."""
    chebyshev = [Polynomial([1]), PVAR]
    second = [Polynomial([1]), 2 * PVAR]
    for _ in range(2, budget + 1):
        chebyshev.append(2 * PVAR * chebyshev[-1] - chebyshev[-2])
        second.append(2 * PVAR * second[-1] - second[-2])
    b, c = Polynomial([0.]), Polynomial([0.])
    for j, coefficient in enumerate(coefficients):
        index = 2 * j - budget
        b += coefficient * chebyshev[abs(index)]
        if index:
            c += np.sign(index) * coefficient * second[abs(index) - 1]
    return b, c


def spectral_factor(target, budget):
    """Factor using a real Fourier polynomial before converting to Laurent form."""
    samples = 4 * budget + 5
    theta = 2 * np.pi * np.arange(samples) / samples
    residual = 1 - target(np.cos(theta))**2
    coefficients = (np.fft.fft(residual) / samples).real
    degree = max((j for j in range(1, budget + 1)
                  if abs(coefficients[2 * j]) > 1e-11), default=0)
    if not degree:
        return sos_from_factor([np.sqrt(max(coefficients[0], 0))], budget)
    laurent = Polynomial([coefficients[(2 * j) % samples]
                          for j in range(-degree, degree + 1)])
    roots = sorted(laurent.roots(), key=abs)[:degree]
    factor = np.polynomial.polynomial.polyfromroots(roots)
    close(factor.imag, np.zeros_like(factor.imag))
    factor = Polynomial(factor.real)
    scale = np.sqrt((1 - target(1)**2) / factor(1)**2)
    return sos_from_factor(factor.coef * scale, budget)


def check_synthesis():
    angles_grid = np.linspace(-np.pi, np.pi, 29)
    circle = [(np.cos(t), np.sin(t)) for t in angles_grid]
    for n in range(9):
        angles = RNG.uniform(-np.pi, np.pi, n + 1)
        p, q = polynomial_word(angles)
        recovered = recover_word(p, q, n)
        close(p.coef[1 - n % 2::2], 0)
        close(q.coef[n % 2::2], 0)
        assert p.degree() <= n and (q.degree() < n or np.all(q.coef == 0))
        for x, y in circle:
            direct = phase_word(x, y, angles)
            close(direct, matrix_pair(p, q, x, y))
            close(direct, phase_word(x, y, recovered))
            close(direct.conj().T @ direct, I2)
            close(np.linalg.det(direct), 1)
            close(abs(p(x))**2 + (1 - x*x) * abs(q(x))**2, 1)
            assert abs(direct[0, 0].real) <= 1 + TOL
            if n:
                absorbed = angles.copy()
                absorbed[-1] += absorbed[0]
                absorbed[0] = 0
                close(phase_word(x, y, absorbed)[0, 0].real, direct[0, 0].real)
                plus_pi = angles.copy()
                plus_pi[:2] += np.pi
                close(phase_word(x, y, plus_pi), direct)
            close(phase_word(x, y, [*angles, np.pi / 2, -np.pi / 2]), direct)
    targets = [(0, Polynomial([.4])), (1, PVAR / 2),
               (1, PVAR), (2, Polynomial([0.])),
               (4, Polynomial([.2, 0, -.3, 0, .6])),
               (5, Polynomial([0, .1, 0, .2, 0, .4])),
               (6, Polynomial([.3, 0, .2]))]
    for n, target in targets:
        if n == 1 and target(1) == 1:
            b, c = Polynomial([0]), Polynomial([1])
        else:
            b, c = spectral_factor(target, n)
        close((1 - target**2 - b**2 - (1 - PVAR**2) * c**2).coef, 0)
        phases = recover_word(target + 1j * b, c, n)
        for x, y in circle:
            close(phase_word(x, y, phases)[0, 0].real, target(x))
    # A real spectral factor with unit-circle roots, including the budget change.
    for n in range(2, 6):
        b, c = sos_from_factor([1., -2., 1.], n)
        close((b**2 + (1 - PVAR**2) * c**2 - 16 * (1 - PVAR**2)**2).coef, 0)
    for x, y in circle:
        a = phase_word(x, y, [0, np.pi / 3])
        b = phase_word(x, y, [0, -np.pi / 3])
        close(a[0, 0].real, x / 2)
        close(b[0, 0].real, x / 2)
        close(a[0, 0].imag, np.sqrt(3) * x / 2)
        for phi in (0, .31, np.pi / 2):
            h = signal(x, y) @ diagonal(phi)
            z = x * np.cos(phi)
            for n in range(6):
                power = np.linalg.matrix_power(h, n)
                close(power[0, 0].real, np.cos(n * np.arccos(np.clip(z, -1, 1))))
                close(power @ h @ h, 2 * z * (power @ h) - power)
        close(signal(x, y), 1j * diagonal(-np.pi / 4) @
              reflection(x, y) @ diagonal(-np.pi / 4))
    for a in (Fraction(2, 3), Fraction(-5, 7), Fraction(1)):
        b = 1 / a
        for n in range(8):
            assert a**(n + 2) + b**(n + 2) == (
                (a + b) * (a**(n + 1) + b**(n + 1)) - (a**n + b**n))
    # The direct real-entry criteria, including the even imaginary-axis test.
    for n in range(1, 7):
        tc = np.polynomial.Chebyshev.basis(n).convert(kind=Polynomial)
        assert np.min(abs(tc(np.array([-2., -1., 1., 2.])))) >= 1 - TOL
        if n % 2 == 0:
            assert np.min((tc(1j * np.linspace(-2, 2, 17))**2).real) >= 1 - TOL
    for phi in (0, .3, np.pi / 2):
        close(phase_word(0, 1, [0, phi, phi])[0, 0].real, -1)
    witness = (1 + PVAR**2) / 2
    assert witness(1) == 1 and witness(2) > 1 and witness(0)**2 < 1
    assert (PVAR / 2)(1)**2 == .25
    assert (1 - (PVAR / 2)(1)**2) > 0
    assert not np.isclose(phase_word(1, 0, [0, np.pi / 3])[0, 0],
                          phase_word(1, 0, [0, -np.pi / 3])[0, 0])


def projector():
    v = unit(RNG.normal(size=2) + 1j * RNG.normal(size=2))
    return np.outer(v, v.conj())


def check_laurent():
    for n in range(6):
        projectors = [projector() for _ in range(n)]
        constant = diagonal(.4) @ signal(.6, .8)
        coefficients = {0: constant}
        for proj in projectors:
            new = {j: np.zeros((2, 2), complex)
                   for j in range(-max(coefficients) - 1, max(coefficients) + 2, 2)}
            for j, value in coefficients.items():
                new[j + 1] += value @ proj
                new[j - 1] += value @ (I2 - proj)
            coefficients = new
        for degree in range(n, 0, -1):
            high, low = coefficients[degree], coefficients[-degree]
            close(np.linalg.det(high), 0)
            close(high @ low.conj().T, 0)
            gram = high.conj().T @ high
            proj = gram / gram.trace()
            close(proj, projectors[degree - 1])
            close(high @ (I2 - proj), 0)
            close(low @ proj, 0)
            coefficients = {
                j: coefficients[j + 1] @ proj + coefficients[j - 1] @ (I2 - proj)
                for j in range(1 - degree, degree, 2)}
        close(coefficients[0], constant)
        proj = projector()
        z = np.exp(1j * .7)
        close((z * proj + (I2 - proj) / z) @
              (z * (I2 - proj) + proj / z), I2)


def check_lifting():
    singular = np.array([0, .35, 1.])
    left, right = (np.linalg.qr(RNG.normal(size=(6, 6)) +
                                1j * RNG.normal(size=(6, 6)))[0] for _ in range(2))
    window = np.diag([1, 1, 1, 0, 0, 0])
    pin, pout = right @ window @ right.conj().T, left @ window @ left.conj().T
    base = np.zeros((6, 6))
    for j, x in enumerate(singular):
        idx = [j, j + 3]
        base[np.ix_(idx, idx)] = reflection(x, np.sqrt(1 - x*x))
    u = left @ base @ right.conj().T
    a = pout @ u @ pin
    gram = a.conj().T @ a

    def raw_word(phases):
        raw = np.eye(6)
        for j, phi in enumerate(reversed(phases)):
            window = pout if j % 2 == 0 else pin
            s = u if j % 2 == 0 else u.conj().T
            d = np.exp(1j * phi) * window + np.exp(-1j * phi) * (np.eye(6) - window)
            raw = d @ s @ raw
        return raw

    for n in range(1, 8):
        b, c = spectral_factor((.5 * PVAR**(n % 2)), n)
        target = .5 * PVAR**(n % 2)
        p = target + 1j * b
        angles = recover_word(p, c, n)
        phases = reflection_angles(angles)
        raw = raw_word(phases)
        conjugate_branch = raw_word(-np.array(phases))
        parity = n % 2
        output = pout if parity else pin
        project = a if parity else pin
        coeffs = p.coef[parity::2]
        polynomial = sum(coefficient * np.linalg.matrix_power(gram, j)
                         for j, coefficient in enumerate(coeffs))
        close(output @ raw @ pin, project @ polynomial)
        close(output @ (raw + conjugate_branch) @ pin / 2, .5 * project)
        for j, x in enumerate(singular):
            y = np.sqrt(1 - x*x)
            expected = reflection_word(x, y, phases)
            close(expected[0, 0], p(x))
            frame = left if parity else right
            close(raw @ right[:, j], expected[0, 0] * frame[:, j] +
                  expected[1, 0] * frame[:, j + 3])
    close(raw_word([]), np.eye(6))
    close((np.exp(1j * np.arccos(.4)) + np.exp(-1j * np.arccos(.4))) / 2, .4)


def path(n):
    edges = np.ones(2 * n - 1)
    edges[n - 1] = np.sqrt(2)
    return np.diag(edges, 1) + np.diag(edges, -1)


def check_path():
    for n in range(1, 25):
        eigenvalues, v = np.linalg.eigh(path(n))
        gap = np.diff(eigenvalues).min()
        assert gap >= 2 * np.sqrt(2) / ((1 + np.sqrt(2))**2 * n**3) - TOL
        w = v[0, :]**2
        end = v[-1, :] * v[0, :]
        close(abs(end), w)
        close(w.sum(), 1)
        diagonal = w @ w
        assert diagonal >= 1 / (2 * n) - TOL
        omega = eigenvalues[:, None] - eigenvalues
        for eps in (.01, .2, 1., 2.):
            tau = 4 * n / (eps * gap)
            f = np.exp(-.5j * tau * omega) * np.sinc(tau * omega / (2 * np.pi))
            avg = (end @ f @ end).real
            assert abs(avg - diagonal) < 2 / (tau * gap) * (1 - diagonal) + TOL
            assert avg > (1 - eps) / (2 * n)
        j = path(n)[:n, :n]
        for sign in (-1, 1):
            folded = j.copy()
            folded[-1, -1] = sign * np.sqrt(2)
            eig, u = np.linalg.eigh(folded)
            assert np.min(abs(u[-1, :])) >= 1 / ((1 + np.sqrt(2)) * n**1.5) - TOL
            for t, vector in zip(eig, u.T):
                extended = np.r_[0, vector, sign * np.sqrt(2) * vector[-1]]
                close(extended[2:], t * extended[1:-1] - extended[:-2])
    close(np.diff(np.linalg.eigvalsh(path(1))), 2 * np.sqrt(2))
    for n, expected in [(64, 58.11), (128, 57.06), (256, 56.47)]:
        assert round(n**3 * np.diff(np.linalg.eigvalsh(path(n))).min(), 2) == expected
    assert round(4 * np.sqrt(2) * np.pi**2, 2) == 55.83


def mul(q, p):
    w, v = q[0], q[1:]
    a, b = p[0], p[1:]
    return np.r_[w*a - v @ b, w*b + a*v + np.cross(v, b)]


def conjugate(q):
    return np.r_[q[0], -q[1:]]


def chart(r):
    rr = r @ r
    return np.r_[1 - rr, 2*r] / (1 + rr)


def encode(q):
    sign = 1 if q[0] >= 0 else -1
    return sign, sign * q[1:] / (1 + sign * q[0])


def decode(pair):
    sign, r = pair
    return sign * chart(r)


def data(r, s):
    rr, ss = r @ r, s @ s
    n = (1 - ss) * r + (1 - rr) * s + 2 * np.cross(r, s)
    return n, 1 + rr*ss - 2 * (r @ s), (r+s) @ (r+s)


def signed_product(a, b):
    e, r = a
    f, s = b
    n, dp, dm = data(r, s)
    return (e*f, n/dp) if dp >= dm else (-e*f, -n/dm)


def star(r, s):
    return signed_product((1, r), (1, s))[1]


def cross_matrix(r):
    return np.cross(r, BASIS).T


def sine(r):
    return 4 * (1 - r @ r) * r / (1 + r @ r)**2


def exp_quaternion(r):
    norm = np.linalg.norm(r)
    return np.r_[np.cos(norm), np.sinc(norm / np.pi) * r]


def check_atlas():
    i, j, k = BASIS
    zero = np.zeros(3)
    close(star(star(i, i), j), j)
    close(star(i, star(i, j)), -j)
    lhs = signed_product(signed_product((1, i), (1, i)), (1, j))
    rhs = signed_product((1, i), signed_product((1, i), (1, j)))
    assert lhs[0] == -1 and rhs[0] == 1
    close(lhs[1], j)
    close(rhs[1], -j)
    close(decode(lhs), decode(rhs))
    close(star(i/2, i/3), i)
    close(star(-i/2, star(i/2, i/3)), i/3)
    t = np.sqrt(2) - 1
    close(1 - t*t, 2*t)
    n, dp, dm = data(t*i, t*j)
    close(n, 2*t*t*(i+j+k))
    close([dp, dm], [6*t*t, 2*t*t])
    qa, qb = chart(star(t*i, t*j)), chart(star(t*j, t*i))
    close(qa, np.r_[.5, (i+j+k)/2])
    close(qb, np.r_[.5, (i+j-k)/2])
    close(2 * np.arccos(qa @ qb), 2 * np.pi / 3)

    pairs = [(zero, zero), (i, i), (i, j), (zero, i)]
    pairs += [(unit(RNG.normal(size=3)) * RNG.random(),
               unit(RNG.normal(size=3)) * RNG.random()) for _ in range(260)]
    for r, s in pairs:
        assert float(np.linalg.norm(r)) <= 1 + TOL
        n, dp, dm = data(r, s)
        l = (1 + r @ r) * (1 + s @ s)
        close(dp + dm, l)
        close(n @ n, dp * dm)
        close(dp, (1-r@s)**2 + np.linalg.norm(np.cross(r, s))**2)
        assert max(dp, dm) >= .5
        close(star(r, s) @ star(r, s), min(dp, dm) / max(dp, dm))
        for e, f in product((-1, 1), repeat=2):
            a, b = (e, r), (f, s)
            close(decode(signed_product(a, b)), mul(decode(a), decode(b)))
            close(decode(signed_product(a, (e, -r))), QI)
            c = encode(unit(RNG.normal(size=4)))
            close(decode(signed_product(signed_product(a, b), c)),
                  decode(signed_product(a, signed_product(b, c))))
            close(decode(encode(decode(a))), decode(a))
        q, p = chart(r), chart(s)
        close(np.linalg.norm(q - p), 2*np.linalg.norm(r-s)/np.sqrt(l))
        delta = RNG.uniform(0, 1/8)
        nd = n + delta * unit(RNG.normal(size=3))
        ddp, ddm = np.array([dp, dm]) + RNG.uniform(-delta, delta, 2)
        e, rd = (1, nd/ddp) if ddp >= ddm else (-1, -nd/ddm)
        rd += delta * unit(RNG.normal(size=3))
        assert np.linalg.norm(e * chart(rd) - mul(q, p)) <= 50 * delta + TOL
        if r @ r:
            close(chart(-r/(r@r)), -q)
            close(sine(-r/(r@r)), sine(r))
        skew = cross_matrix(r)
        rot = np.eye(3) + (4*(1-r@r)*skew + 8*(skew@skew))/(1+r@r)**2
        expected = np.array([mul(mul(q, np.r_[0, v]), conjugate(q))[1:] for v in BASIS]).T
        close(rot, expected)
        close((rot - rot.T)/2, cross_matrix(sine(r)))
        close(sine(r), 2*q[0]*q[1:])
        assert np.linalg.norm(sine(r)) <= 1 + TOL
        close((1 + np.cos(2*np.arccos(np.clip(abs(q@p), 0, 1))))/2, (q@p)**2)
        assert np.linalg.norm(sine(r)-sine(s)) <= 2 * min(
            np.linalg.norm(q-p), np.linalg.norm(q+p)) + TOL
        length_scale = 2/(1+r@r)
        assert 1 - TOL <= length_scale <= 2
        h = 1e-5
        differential = np.array([(chart(r+h*v)-chart(r-h*v))/(2*h) for v in BASIS]).T
        close(differential.T @ differential, length_scale**2*np.eye(3), 2e-8)
        jitter = RNG.normal(size=(3, 3)) * .001
        third = RNG.normal(size=3)/3
        word1 = mul(mul(q, p), chart(third))
        word2 = mul(mul(chart(r+jitter[0]), chart(s+jitter[1])), chart(third+jitter[2]))
        assert np.linalg.norm(word1-word2) <= 2*sum(np.linalg.norm(jitter, axis=1)) + TOL
        output_sheet = encode(mul(q, p))[0]

        def fixed_product(a, b):
            n, dp, dm = data(a, b)
            return n/dp if output_sheet == 1 else -n/dm

        differential_r = np.array([(fixed_product(r+h*v, s)-fixed_product(r-h*v, s))/(2*h)
                                   for v in BASIS]).T
        differential_s = np.array([(fixed_product(r, s+h*v)-fixed_product(r, s-h*v))/(2*h)
                                   for v in BASIS]).T
        partial_values = np.linalg.svd(differential_r, compute_uv=False)
        joint_values = np.linalg.svd(np.c_[differential_r, differential_s], compute_uv=False)
        close(partial_values, partial_values[0], 2e-8)
        close(joint_values, joint_values[0], 2e-8)
        assert np.min(partial_values) >= .5 - TOL and np.max(partial_values) <= 2 + TOL

    for row in BASIS:
        close(sine(row), 0)
    for k in range(1, 300):
        r = np.array([Fraction(k % 11 - 5, 19), Fraction((3*k+1) % 13 - 6, 19),
                      Fraction((7*k+2) % 17 - 8, 19)], dtype=object)
        s = np.array([Fraction((2*k+3) % 13 - 6, 19), Fraction((5*k+4) % 17 - 8, 19),
                      Fraction((11*k+1) % 19 - 9, 19)], dtype=object)
        n, dp, dm = data(r, s)
        assert dp + dm == (1+r@r) * (1+s@s)
        assert n @ n == dp * dm
        for a, b in [(r, s), (s, r)]:
            product_coord = signed_product((1, a), (1, b))
            assert np.array_equal(decode(product_coord), mul(chart(a), chart(b)))
    for m in (5, 31, 120):
        r = unit(RNG.normal(size=3))
        grid = np.trunc(m*r) / m
        assert grid @ grid <= 1 and np.linalg.norm(chart(r)-chart(grid)) <= 2*np.sqrt(3)/m
    homogeneous = np.array([Fraction(25-14, 39), Fraction(10, 39),
                            Fraction(20, 39), Fraction(30, 39)], dtype=object)
    close(np.array(homogeneous, float), chart(np.array([1, 2, 3])/5))
    assert mul(homogeneous, homogeneous)[0].denominator <= 39**2


def check_arcs():
    i, j, _ = BASIS
    p = chart(np.array([.2, .3, .4]))
    r = 4*i - 3*j
    q = mul(chart(r), p)
    g = mul(q, conjugate(p))
    close(g[1:]/(1+g[0]), r)
    amounts = np.linspace(0, 1, 17)
    comparisons = [p @ mul(chart(t*r), p) for t in amounts]
    close(comparisons, np.cos(2*np.arctan(amounts*np.linalg.norm(r))))
    assert np.all(np.diff(comparisons) < 0)
    close(mul(chart(r), p), q)
    close(chart(i), -chart(-i))
    close(mul(-chart(np.zeros(3)), p), -p)
    close(unit(QI + np.r_[0, i]), np.r_[1., i] / np.sqrt(2))
    for sign in (1, -1):
        t = 1e-5
        target = np.r_[-np.cos(t), sign * np.sin(t) * i]
        midpoint = unit(QI + target)
        close(midpoint, np.r_[np.sin(t/2), sign*np.cos(t/2)*i], 1e-10)
    for a, b in [(QI, np.r_[0, i]), (p, q)]:
        d = mul(b, conjugate(a))
        h = QI + d
        normalized = unit(h)
        close(mul(normalized, normalized), d)
        probe = np.r_[0, j]
        close(mul(mul(h, probe), conjugate(h))/(h@h),
              mul(mul(normalized, probe), conjugate(normalized)))
        c = a @ b
        close(1 - c, np.linalg.norm(a-b)**2 / 2)
        close((1+c)/2, 1-(1-c)/2)
        x0, x1 = a, b
        for _ in range(5):
            x2 = mul(mul(x1, conjugate(x0)), x1)
            close(x2, 2*c*x1 - x0)
            close(mul(x2, conjugate(x1)), d)
            x0, x1 = x1, x2
    for _ in range(40):
        a, b, a2, b2 = (unit(RNG.normal(size=4)) for _ in range(4))
        g1, g2 = mul(b, conjugate(a)), mul(b2, conjugate(a2))
        margin = min(1 + g1[0], 1 + g2[0])
        h1, h2 = unit(QI + g1), unit(QI + g2)
        error = (np.linalg.norm(a-a2) + np.linalg.norm(b-b2))/np.sqrt(2*margin)
        assert np.linalg.norm(h1-h2) <= error + TOL
        for v in BASIS:
            source = np.r_[0, v]
            assert np.linalg.norm(mul(mul(h1, source), conjugate(h1)) -
                                  mul(mul(h2, source), conjugate(h2))) <= 2*error + TOL
    # Word-wide comparison bound with inexact, rational clock coordinates.
    axis = np.array([0., 0, 1])
    angles = RNG.uniform(-np.pi, np.pi, 6)
    clocks = [exp_quaternion(phi*axis) for phi in angles]
    quantized = []
    for clock in clocks:
        e, r = encode(clock)
        quantized.append(decode((e, np.trunc(111*r)/111)))
    for t in np.linspace(-np.pi, np.pi, 41):
        signal_q = exp_quaternion(t*i)
        q, qa = clocks[0], quantized[0]
        for cp, cq in zip(clocks[1:], quantized[1:]):
            q = mul(mul(q, signal_q), cp)
            qa = mul(mul(qa, signal_q), cq)
        error = sum(np.linalg.norm(cp-cq) for cp, cq in zip(clocks, quantized))
        assert abs(q[0]-qa[0]) <= error + TOL
        left, right, origin = (unit(RNG.normal(size=4)) for _ in range(3))
        moved_origin = mul(mul(left, origin), right)
        moved_word = mul(mul(conjugate(right), q), right)
        close(moved_origin @ mul(moved_origin, moved_word), q[0])
        close(mul(moved_origin, moved_word), mul(mul(left, mul(origin,q)),right))


def pauli(v):
    return np.tensordot(v, PAULI, axes=1)


def quaternion_matrix(q):
    return q[0] * I2 - 1j * pauli(q[1:])


def check_models():
    i, j, k = BASIS
    for _ in range(50):
        u, v = (unit(RNG.normal(size=3)) for _ in range(2))
        a, b = RNG.uniform(0, np.pi, 2)
        q, p = exp_quaternion(a*u), exp_quaternion(b*v)
        w = np.cos(a)*np.cos(b) - (u@v)*np.sin(a)*np.sin(b)
        f = (u*np.sin(a)*np.cos(b) + v*np.cos(a)*np.sin(b) +
             np.cross(u,v)*np.sin(a)*np.sin(b))
        close(mul(q, p), np.r_[w, f])
        close(np.arctan2(np.linalg.norm(q[1:]), q[0])*unit(q[1:]), a*u)
        close(chart(np.tan(a/2)*u), q)
        close(exp_quaternion(np.pi*u), -QI)
        middle = unit(np.cross(q[1:], p[1:]))
        a_turn = mul(conjugate(q), np.r_[0, middle])
        c_turn = mul(p, np.r_[0, middle])
        close(a_turn[0], 0)
        close(c_turn[0], 0)
        close(mul(np.r_[0, middle], conjugate(a_turn)), q)
        close(mul(c_turn, conjugate(np.r_[0, middle])), p)
        turn = mul(c_turn, conjugate(a_turn))
        close(turn, mul(p, q))
        close(turn, np.r_[a_turn[1:]@c_turn[1:], np.cross(a_turn[1:], c_turn[1:])])
        center = unit(RNG.normal(size=4))
        x, y, z = (unit(RNG.normal(size=4)) for _ in range(3))
        heap = lambda d, e, f: mul(mul(d, conjugate(e)), f)
        close(heap(x, x, z), z)
        close(mul(conjugate(center), heap(x, center, y)),
              mul(mul(conjugate(center), x), mul(conjugate(center), y)))
        close(heap(mul(center, x), mul(center, y), mul(center, z)), mul(center, heap(x, y, z)))
        close(heap(mul(x, center), mul(y, center), mul(z, center)), mul(heap(x, y, z), center))
        close(heap(heap(x, y, z), center, x), heap(x, heap(center, z, y), x))
        close(heap(heap(x, y, z), center, x), heap(x, y, heap(z, center, x)))
        triple = lambda a, b, c: np.cross(np.cross(a, b), c)
        a, b, c = RNG.normal(size=(3, 3))
        close(triple(a, b, c), (a@c)*b - (b@c)*a)
        close(triple(a, b, c), -triple(b, a, c))
        close(triple(a, b, c) + triple(b, c, a) + triple(c, a, b), 0)
        derivation = lambda x: triple(u, v, x)
        close(derivation(triple(a,b,c)), triple(derivation(a),b,c) +
              triple(a,derivation(b),c) + triple(a,b,derivation(c)))
        close(triple(a,b,c), np.cross(2*np.cross(a,b), 2*c)/4)
        scale = 1e-3
        small = mul(exp_quaternion(scale*a), exp_quaternion(scale*b))
        assert np.linalg.norm(small[1:] - scale*(a+b) - scale**2*np.cross(a,b)) <= (
            scale*(np.linalg.norm(a)+np.linalg.norm(b)))**3
        quarter = exp_quaternion(np.pi*u/4)
        third = mul(mul(quarter, np.r_[0, v]), conjugate(quarter))[1:]
        assert abs(np.linalg.det(np.array([u, v, third]))) > 1e-8
    close(mul(np.r_[0, i], np.r_[0, j]), np.r_[0, k])
    close(mul(np.r_[0, j], np.r_[0, i]), -np.r_[0, k])
    close(exp_quaternion(np.pi*i), -QI)

    def bloch_projector(a):
        return (I2 + pauli(a))/2

    def shortest(a, b):
        return np.r_[1 + a @ b, np.cross(a, b)] / np.sqrt(2 * (1+a@b))

    triangles = [(i, j, k), (i, i, j)]
    triangles += [tuple(unit(x) for x in RNG.normal(size=(3, 3))) for _ in range(55)]
    for a, b, c in triangles:
        x, y, z = shortest(a, b), shortest(b, c), shortest(c, a)
        close(mul(mul(x, np.r_[0, a]), conjugate(x)), np.r_[0, b])
        loop = mul(z, mul(y, x))
        s, d = 1+a@b+b@c+c@a, a@np.cross(b,c)
        close(loop, np.r_[s, d*a]/np.hypot(s,d))
        pa, pb, pc = (bloch_projector(v) for v in (a,b,c))
        trace = np.trace(pa @ pb @ pc)
        close(trace, (s+1j*d)/4)
        close(abs(trace), np.sqrt((1+a@b)*(1+b@c)*(1+c@a)/8))
        close(np.trace(pa @ quaternion_matrix(loop)), (s-1j*d)/np.hypot(s,d))
        vec = np.linalg.eigh(pa)[1][:, -1]
        close(quaternion_matrix(x)@vec, unit(pb@vec))
        close(np.trace(pa @ pb @ pc @ pa), trace)
    close((1-1j)/np.sqrt(2), np.exp(-1j*np.pi/4))
    close(np.pi/2, np.trapezoid(np.ones(31), np.linspace(0, np.pi/2, 31)))
    for theta in np.linspace(0, np.pi, 9):
        phi, psi = .87, -.53
        north = np.array([np.cos(theta/2), np.exp(1j*phi)*np.sin(theta/2)])
        south = north*np.exp(-1j*phi)
        d_n = np.array([0, 1j*north[1]])
        d_s = np.array([-1j*south[0], 0])
        close(north*np.exp(1j*psi), south*np.exp(1j*(psi+phi)))
        close(-1j*np.vdot(north,d_n), (1-np.cos(theta))/2)
        close(-1j*np.vdot(south,d_s), (-1-np.cos(theta))/2)
        z0, z1 = north
        matrix = np.array([[z0, -z1.conjugate()], [z1, z0.conjugate()]])
        close(matrix.conj().T@matrix, I2)
        close(np.linalg.det(matrix), 1)
        direction = [np.sin(theta)*np.cos(phi), np.sin(theta)*np.sin(phi), np.cos(theta)]
        close(np.outer(north,north.conj()), bloch_projector(direction))


def walk(p, n, coin):
    states = np.zeros((2, p), complex)
    states[:, 0] = coin
    for _ in range(n):
        left, right = (states[0] + states[1])/np.sqrt(2), (states[0] - states[1])/np.sqrt(2)
        states = np.array([np.roll(left, -1), np.roll(right, 1)])
    return states


def check_applications():
    for p in range(1, 13):
        for n in range(18):
            coin = unit(RNG.normal(size=2) + 1j*RNG.normal(size=2))
            sample, sym = (abs(walk(p, n, c))**2 for c in (coin, np.array([1,1j])/np.sqrt(2)))
            mirror = (-np.arange(p)) % p
            close(sym[0], sym[1, mirror])
            close(sample[0]+sample[1, mirror], sym[0]+sym[1, mirror])
            close(sample.sum(), 1)
            for a, b in zip(*sample):
                base = RNG.normal(size=2) + 1j*RNG.normal(size=2)
                balanced = np.sqrt((a+b)/2)
                matrix = lambda x, y: np.array([[base[0], base[1]*x], [base[1]*y, 0]])
                assert np.linalg.norm(matrix(balanced,balanced), 2) <= np.linalg.norm(
                    matrix(np.sqrt(a), np.sqrt(b)), 2) + TOL
    for p in (*np.geomspace(.0001, .999, 80), 1.):
        n = int(np.ceil(np.pi/(4*np.arcsin(np.sqrt(p))) - .5))
        alpha = np.pi/(4*n+2)
        good = np.sin(alpha)
        bad = np.cos(alpha)
        state = np.array([good, bad])
        actual = (2*np.outer(state,state)-np.eye(2)) @ np.diag([-1,1])
        close(actual, [[np.cos(2*alpha),np.sin(2*alpha)],
                       [-np.sin(2*alpha),np.cos(2*alpha)]])
        assert good**2/p <= 1 + TOL
        close(np.linalg.matrix_power(actual,n)@state, [1,0])
        assert 2*n+1 <= (np.pi/2+2)/np.sqrt(p)
    for r in [np.zeros(3), *BASIS, *RNG.normal(size=(100,3))]:
        rh = r/(1+np.sqrt(1+r@r))
        close(2*rh/(1-rh@rh), r)
        damped = r/(1+r@r)
        assert np.linalg.norm(damped) <= .5 + TOL
        tangent = (1-r@r)*np.eye(3)+2*np.outer(r,r)+2*cross_matrix(r)
        close(tangent.T@tangent, (1+r@r)**2*np.eye(3))
        grad, direction = RNG.normal(size=(2,3))
        e = 1e-5
        plus, dp, _ = data(r,e*direction/2)
        minus, dm, _ = data(r,-e*direction/2)
        close(grad@(plus/dp-minus/dm)/(2*e), (.5*tangent.T@grad)@direction, 1e-8)
        plus, dp, _ = data(e*direction/2,r)
        minus, dm, _ = data(-e*direction/2,r)
        close(grad@(plus/dp-minus/dm)/(2*e), (.5*tangent@grad)@direction, 1e-8)
    for size in range(1, 20):
        scores = RNG.random(size)**2
        weights = scores / (.05 + scores.sum())
        assert weights.sum() < 1
        close(weights.sum(), scores.sum()/(.05+scores.sum()))
        assert ((scores*1e-8)/(.05+scores.sum()*1e-8)).sum() < weights.sum()
    e1 = BASIS[0]
    close(star(-e1/2, star(e1/2, e1)), -e1)
    close(sine(e1/2)/4, 6*e1/25)
    close(1/(1+1/20), 20/21)
    single = 20/21 * sine(e1/2)/4
    close(single, 8*e1/35)
    close(single/(1+single@single), 280*e1/1289)
    close(single/(1+np.sqrt(1+single@single)), 8*e1/(35+np.sqrt(1289)))


def check_pulses():
    def pulse(phi, theta):
        return np.cos(theta/2)*I2 - 1j*np.sin(theta/2)*(np.cos(phi)*X + np.sin(phi)*Y)

    for phi, theta, lam in RNG.uniform(-np.pi,np.pi,(30,3)):
        rz = diagonal(-lam/2)
        close(pulse(phi,theta)@rz, rz@pulse(phi-lam,theta))
        close(rz@pulse(phi,theta)@rz.conj().T, pulse(phi+lam,theta))
        state = unit(RNG.normal(size=2)+1j*RNG.normal(size=2))
        close(abs(rz@state)**2, abs(state)**2)
        h = pauli(RNG.normal(size=3))
        eig, vectors = np.linalg.eigh(h)
        evolution = (vectors*np.exp(-1j*theta*eig))@vectors.conj().T
        close(evolution@vectors[:,0], np.exp(-1j*theta*eig[0])*vectors[:,0])
        rho = np.outer(state,state.conj())
        close(np.trace(h@rz@rho@rz.conj().T), np.trace(rz.conj().T@h@rz@rho))
    state = np.ones(2)/np.sqrt(2)
    quarter = np.pi/2
    close(pulse(0,quarter)@diagonal(-np.pi/4)@state, np.exp(-1j*np.pi/4)*BASIS[0,:2])
    close(pulse(-quarter,quarter)@state, [1,0])
    close(pulse(quarter,quarter)@state, [0,1])
    carrier = 5e9
    pulse_time = 25e-9
    close(1/carrier*1e9, .2)
    close(pulse_time*carrier, 125)
    close(2*np.pi*1e7*pulse_time, np.pi/2)
    close(abs(pulse(0,quarter)[1,0])**2, .5)
    close(5/4 * .1**2, 1/80)

    def pulse_kernel(a, t):
        eig, v = np.linalg.eigh(a)
        return (v*(np.expm1(1j*t*eig)/(1j*t)))@v.T if t else a

    for _ in range(40):
        a,b,c = ((m+m.T)/np.linalg.norm(m+m.T) for m in RNG.normal(size=(3,3,3)))
        close(pulse_kernel(a,0), a)
        for t in (.01,.1,1.0,-.4):
            u = np.linspace(0,1,201)
            eig, v = np.linalg.eigh(a)
            samples = np.exp(1j*t*u[:,None]*eig)*eig
            integrated = (v*np.trapezoid(samples,u,axis=0))@v.T
            close(pulse_kernel(a,t), integrated, 4e-6)
            actual = (pulse_kernel(a,t)@pulse_kernel(b,t)@pulse_kernel(c,t)).trace().real
            assert abs(actual-(a@b@c).trace()) <= (5/4)*t*t + TOL


def check_forests():
    from itertools import permutations
    from math import factorial

    def cycles(labels):
        if labels:
            for suffix in permutations(labels[1:]):
                seq = labels[:1] + suffix
                yield dict(zip(seq, seq[1:]+seq[:1]))

    def inventory(m, p, q):
        if m:
            return m*factorial(m+p-1)*factorial(m+q-1)
        return factorial(p+q-1) if p+q and not p*q else 0

    for m, p, q in product(range(4), repeat=3):
        if 2*m+p+q > 7:
            continue
        edges = [(0,1)]*m + [(1,0)]*m + [(0,0)]*p + [(1,1)]*q
        visited = list(cycles(tuple(range(len(edges)))))
        good = [c for c in visited if all(edges[a][1] == edges[b][0] for a,b in c.items())]
        assert len(good) == inventory(m,p,q)
        for a in range(len(edges)):
            for b in range(len(edges)):
                if a == b or edges[a][1] != edges[b][0]:
                    continue
                fused = [edge for k, edge in enumerate(edges) if k not in (a,b)]
                fused.append((edges[a][0],edges[b][1]))
                count = inventory(fused.count((0,1)),fused.count((0,0)),fused.count((1,1)))
                assert sum(c[a] == b for c in good) == count

    def undirected(cycle):
        return frozenset(frozenset((a,b)) for a,b in cycle.items())

    for length in range(3,8):
        all_cycles = list(cycles(tuple(range(length))))
        edges = {0:1, 1:2}
        extensions = [c for c in all_cycles if all(c[a] == b for a,b in edges.items())]
        components = length-len(edges)
        assert len(extensions) == factorial(components-1)
        if components == 1:
            assert extensions[0][2] == 0
        else:
            assert all(c[2] != 0 for c in extensions)
        for head in range(3,length):
            assert Fraction(sum(c[2] == head for c in extensions),len(extensions)) == Fraction(1,components-1)
        shadows = {}
        for c in all_cycles:
            shadows.setdefault(undirected(c),[]).append(c)
        for shadow, fibers in shadows.items():
            assert len(fibers) == 2
            assert fibers[1] == {b:a for a,b in fibers[0].items()}
            if frozenset((0,2)) in shadow:
                assert all(c[0] == 2 or c[2] == 0 for c in fibers)


if __name__ == "__main__":
    for test in (check_pulses, check_applications):
        test()
        print(f"PASS {test.__name__}")
