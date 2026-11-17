#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Independent numerical / symbolic checks for ARC-CALCULUS-RIEMANN-NOTE.md.

Only mpmath, numpy and sympy are used.  Every section checks identities or
numerical claims of the note (results Z1 ... Z12) and uses asserts.

What this script can and cannot show
------------------------------------
* Algebraic identities are checked symbolically (sympy) or at sample points.
* Statements about the zeros of zeta are checked on the first K zeros returned
  by mpmath.zetazero (numerical data).  Nothing here proves, or gives evidence
  beyond those K zeros for, the Riemann hypothesis.
* Sums over all zeros are evaluated as "first K zeros + smooth-density tail";
  the tail model is the Riemann-von Mangoldt density (1/2pi) log(t/2pi).

Run:  python3 check_riemann_arc.py
"""
import math
import time

import mpmath as mp
import numpy as np
import sympy as sp

T_START = time.time()
mp.mp.dps = 30
RNG = np.random.default_rng(20261117)
K = 80                      # number of zeros with positive ordinate that are used


def section(title):
    print("\n== " + title)


def rnd_complex(lo_re, hi_re, lo_im, hi_im):
    return mp.mpc(RNG.uniform(lo_re, hi_re), RNG.uniform(lo_im, hi_im))


def cayley(rho):
    """Cayley rotor u = 1 - 1/rho of a point rho."""
    return 1 - 1 / rho


def sagitta(rho):
    """SL(2,C) sagitta v = 1 - (u + 1/u)/2 = 1/(2 rho (1 - rho))."""
    return 1 / (2 * rho * (1 - rho))


def xi(s):
    if s == 0 or s == 1:                       # removable points: xi(0) = xi(1) = 1/2
        return mp.mpf(1) / 2
    return mp.mpf(1) / 2 * s * (s - 1) * mp.pi ** (-s / 2) * mp.gamma(s / 2) * mp.zeta(s)


def chi(s):
    return mp.pi ** (s - mp.mpf(1) / 2) * mp.gamma((1 - s) / 2) / mp.gamma(s / 2)


def density(t):
    """Smooth zero density N'(t) for ordinates t > 0."""
    return mp.log(t / (2 * mp.pi)) / (2 * mp.pi)


# --------------------------------------------------------------------------
section("0. data: first K+1 zeros (mpmath.zetazero)")
ZEROS = [mp.zetazero(k) for k in range(1, K + 2)]
GAM = [z.imag for z in ZEROS]
for z in ZEROS:
    assert abs(z.real - mp.mpf(1) / 2) < mp.mpf(10) ** (-25)
    assert abs(mp.zeta(z)) < mp.mpf(10) ** (-20)
T_CUT = (GAM[K - 1] + GAM[K]) / 2          # cut between zero K and zero K+1
GK = GAM[:K]
print("K = %d, gamma_1 = %s, gamma_K = %s, cut T = %s"
      % (K, mp.nstr(GK[0], 15), mp.nstr(GK[-1], 15), mp.nstr(T_CUT, 10)))
LAM1 = 1 + mp.euler / 2 - mp.log(4 * mp.pi) / 2      # closed form of lambda_1

# --------------------------------------------------------------------------
section("Z1. Cayley rotor of a zero: unimodular iff Re = 1/2; chord and sagitta")
for _ in range(20):
    s = rnd_complex(-2, 3, -40, 40)
    u = cayley(s)
    assert abs((abs(u) ** 2 - 1) - (1 - 2 * s.real) / abs(s) ** 2) < mp.mpf(10) ** (-24)
for g in GK[:10]:
    rho = mp.mpc(mp.mpf(1) / 2, g)
    u = cayley(rho)
    v = (1 / rho).real                       # sagitta 1 - Re u
    theta = 2 * mp.atan(1 / (2 * g))
    assert abs(abs(u) - 1) < mp.mpf(10) ** (-25)
    assert abs(v - 2 / (1 + 4 * g ** 2)) < mp.mpf(10) ** (-25)
    assert abs(abs(u - 1) ** 2 - 2 * v) < mp.mpf(10) ** (-25)        # lock: chord^2 = 2 v
    assert abs(abs(u - 1) - 1 / abs(rho)) < mp.mpf(10) ** (-25)      # chord = 1/|rho|
    assert abs(u - mp.expj(theta)) < mp.mpf(10) ** (-25)
    assert abs(mp.cos(theta) - (1 - v)) < mp.mpf(10) ** (-25)
    # the frozen Lean objects spectralWeight / cayleyNode (FiniteSpectralCayleyIdentity)
    x = 1 / (4 * g ** 2 + 1)
    node = mp.mpc(1 - 2 * x, 2 * mp.sqrt(x * (1 - x)))
    assert abs(x - v / 2) < mp.mpf(10) ** (-25) and abs(node - u) < mp.mpf(10) ** (-25)
    assert abs(abs(1 - node) ** 2 - 4 * x) < mp.mpf(10) ** (-25)
print("first zero: theta = %s rad, sagitta v = %s, chord = %s"
      % (mp.nstr(2 * mp.atan(1 / (2 * GK[0])), 12),
         mp.nstr(2 / (1 + 4 * GK[0] ** 2), 12), mp.nstr(1 / abs(ZEROS[0]), 12)))

# --------------------------------------------------------------------------
section("Z2. zero rotor in SL(2,C): v = 1/(2 rho (1-rho)); elliptic iff on the line")
for _ in range(20):
    rho = rnd_complex(0.05, 0.95, 1, 60)
    u = cayley(rho)
    assert abs(cayley(1 - rho) - 1 / u) < mp.mpf(10) ** (-24)                # rho <-> 1-rho
    assert abs(cayley(1 - mp.conj(rho)) - 1 / mp.conj(u)) < mp.mpf(10) ** (-24)  # mirror
    v = 1 - (u + 1 / u) / 2
    assert abs(v - sagitta(rho)) < mp.mpf(10) ** (-24)
    sig, gam = rho.real, rho.imag
    im_formula = -gam * (1 - 2 * sig) / (2 * abs(rho * (1 - rho)) ** 2)
    assert abs(v.imag - im_formula) < mp.mpf(10) ** (-24)
    assert abs(v.imag) > 0 or abs(sig - 0.5) < 1e-15          # off the line: loxodromic


def moebius_class(v, tol=mp.mpf(10) ** (-20)):
    if abs(v.imag) > tol:
        return "loxodromic"
    x = v.real
    if abs(x) < tol or abs(x - 2) < tol:
        return "parabolic-or-central"
    return "elliptic" if 0 < x < 2 else "hyperbolic"


for g in GK[:10]:
    v = sagitta(mp.mpc(mp.mpf(1) / 2, g))
    assert moebius_class(v) == "elliptic" and 0 < v.real < 2
assert moebius_class(sagitta(mp.mpc("0.6", 14))) == "loxodromic"
assert moebius_class(sagitta(mp.mpf("0.3") + 0j)) == "hyperbolic"     # a real point of (0,1)
assert moebius_class(sagitta(mp.mpf("0.5") + 0j)) == "parabolic-or-central"  # u = -1
print("classes: on-line zeros elliptic; 0.6+14i loxodromic; real 0.3 hyperbolic; 1/2 gives u=-1")

# Krein (J-) unitarity versus unitarity on one off-line quartet and one on-line pair
quartet = [complex(0.6, 14), complex(0.4, 14), complex(0.6, -14), complex(0.4, -14)]
idx = {r: i for i, r in enumerate(quartet)}
U = np.diag([1 - 1 / r for r in quartet])
J = np.zeros((4, 4))
for r in quartet:
    mirror = complex(1 - r.real, r.imag)           # 1 - conj(rho): same height
    J[idx[r], [k for k, q in enumerate(quartet) if abs(q - mirror) < 1e-12][0]] = 1
assert np.allclose(U.conj().T @ J @ U, J, atol=1e-13)            # J-unitary, unconditional
assert not np.allclose(U.conj().T @ U, np.eye(4), atol=1e-6)     # not unitary off the line
A = np.diag([1.0, -1.0, 1.0, -1.0])
assert np.allclose(J @ A.conj().T @ J @ A, -np.eye(4))           # (Pos) fails for a^# = J a^* J
online = [complex(0.5, float(GK[0])), complex(0.5, -float(GK[0]))]
U1 = np.diag([1 - 1 / r for r in online])
assert np.allclose(U1.conj().T @ U1, np.eye(2), atol=1e-13)
growth = [float(np.linalg.norm(np.linalg.matrix_power(U, n), 2)) for n in (1, 10 ** 3, 10 ** 4)]
assert growth[2] > growth[1] > growth[0] > 1
print("off-line quartet: U^* J U = J holds, U^* U != 1; ||U^n|| for n=1,1e3,1e4:",
      ["%.6g" % x for x in growth])

# --------------------------------------------------------------------------
section("Z3. Chebyshev / sagitta form of the Li sum and the chord-defect split")
usym, vsym = sp.symbols("u v")
for n in range(1, 9):
    lhs = (1 - usym ** n) + (1 - usym ** (-n))
    rhs = 2 * (1 - sp.chebyshevt(n, 1 - vsym)).subs(vsym, 1 - (usym + 1 / usym) / 2)
    assert sp.simplify(sp.together(lhs - rhs)) == 0
COEF = {}
for n in range(1, 13):
    poly = sp.Poly(sp.expand(1 - sp.chebyshevt(n, 1 - vsym)), vsym)
    a = {k: poly.coeff_monomial(vsym ** k) for k in range(0, n + 1)}
    assert a[0] == 0 and a[1] == n ** 2
    if n >= 2:
        assert a[2] == -sp.Rational(n ** 2 * (n ** 2 - 1), 6)
    COEF[n] = a
assert sp.expand(1 - sp.chebyshevt(2, 1 - vsym) - 2 * vsym * (2 - vsym)) == 0   # v_2 = 2v(2-v)
for _ in range(10):
    rho = rnd_complex(0.05, 0.95, 2, 50)
    u, v = cayley(rho), sagitta(rho)
    for n in (1, 2, 3, 7, 12):
        pair = (1 - u ** n) + (1 - cayley(1 - rho) ** n)
        assert abs(pair - 2 * (1 - mp.chebyt(n, 1 - v))) < mp.mpf(10) ** (-18)
        # Re(1-w) = |1-w|^2/2 - (|w|^2-1)/2  with w = u^n
        w = u ** n
        assert abs((1 - w).real - (abs(1 - w) ** 2 / 2 - (abs(w) ** 2 - 1) / 2)) < mp.mpf(10) ** (-18)
print("symbolic: (1-u^n)+(1-u^-n) = 2(1-T_n(1-v)) for n<=8; a_{n,1}=n^2, a_{n,2}=-n^2(n^2-1)/6")

# (a) derivative-defined Li coefficients by a Cauchy integral around s = 1
M_C, R_C = 96, mp.mpf(1) / 2
PH = [(2 * mp.mpf(j) + 1) / M_C for j in range(M_C)]               # angles / pi
LOGXI = [mp.log(xi(1 + R_C * mp.expjpi(p))) for p in PH]


def taylor_logxi(k):
    return sum(LOGXI[j] * mp.expjpi(-k * PH[j]) for j in range(M_C)) / M_C / R_C ** k


CK = [taylor_logxi(k) for k in range(0, 13)]
LAM_D = {n: (n * sum(mp.binomial(n - 1, k - 1) * CK[k] for k in range(1, n + 1))).real
         for n in range(1, 13)}
assert abs(LAM_D[1] - LAM1) < mp.mpf(10) ** (-22)
assert abs(CK[0] - mp.log(mp.mpf(1) / 2)) < mp.mpf(10) ** (-22)          # xi(1) = 1/2

# (b) zero-side: lambda_n = n^2 lambda_1 + sum_{k>=2} a_{n,k} P_k,  P_k = sum_rho v_rho^k
VK = [2 / (1 + 4 * g ** 2) for g in GK]                 # sagittas of on-line zeros


def tail_power(k):
    return 2 * mp.quad(lambda t: (2 / (1 + 4 * t ** 2)) ** k * density(t), [T_CUT, mp.inf])


P = {k: 2 * sum(v ** k for v in VK) + tail_power(k) for k in range(2, 13)}
LAM_Z = {n: n ** 2 * LAM1 + sum(COEF[n][k] * P[k] for k in range(2, n + 1)) for n in range(1, 13)}
print(" n   lambda_n (derivative)     lambda_n (sagitta sums)   difference   lambda_n/(n^2 lambda_1)")
for n in range(1, 13):
    d = LAM_D[n] - LAM_Z[n]
    assert abs(d) < mp.mpf(10) ** (-6)
    assert 0 < LAM_D[n] <= n ** 2 * LAM1 + mp.mpf(10) ** (-25)     # numerical observation only
    print("%2d   %s   %s   %s   %s" % (n, mp.nstr(LAM_D[n], 18), mp.nstr(LAM_Z[n], 18),
                                    mp.nstr(d, 3), mp.nstr(LAM_D[n] / (n ** 2 * LAM1), 10)))
assert abs(LAM_D[2] - (4 * LAM1 - 2 * P[2])) < mp.mpf(10) ** (-9)        # lambda_2 = 4 lambda_1 - 2 P_2
# (c) raw symmetric partial sums converge slowly; the deficit is the density tail
part1 = 2 * sum(VK)
tail1 = tail_power(1)
print("lambda_1 = %s; partial sum over %d pairs = %s; deficit = %s; density tail = %s"
      % (mp.nstr(LAM1, 15), K, mp.nstr(part1, 12), mp.nstr(LAM1 - part1, 6), mp.nstr(tail1, 6)))
assert abs((LAM1 - part1) - tail1) < mp.mpf("0.03") * tail1
# doubling law lambda_{2n} = 4 lambda_n - 2 sum_rho v_n(rho)^2   (n = 2, 3)
for n in (2, 3):
    th = [2 * mp.atan(1 / (2 * g)) for g in GK]
    s2 = 2 * sum((1 - mp.cos(n * t)) ** 2 for t in th)
    s2 += 2 * mp.quad(lambda t: (1 - mp.cos(2 * n * mp.atan(1 / (2 * t)))) ** 2 * density(t),
                      [T_CUT, mp.inf])
    assert abs(LAM_D[2 * n] - (4 * LAM_D[n] - 2 * s2)) < mp.mpf(10) ** (-6)
print("doubling law lambda_{2n} = 4 lambda_n - 2 sum v_n^2 verified for n = 2, 3")

# --------------------------------------------------------------------------
section("Z4/Z5. off-line rotors make Li-type sums negative (finite toy families only)")
toy = [mp.mpc(mp.mpf(7) / 10, 5), mp.mpc(mp.mpf(7) / 10, -5),
       mp.mpc(mp.mpf(3) / 10, 5), mp.mpc(mp.mpf(3) / 10, -5)]


def li_sum(points, n):
    return sum(1 - cayley(r) ** n for r in points).real


neg = [n for n in range(1, 80) if li_sum(toy, n) < 0]
assert neg[0] == 31                                   # the frozen toy theorem uses n = 31
theta = -1j * mp.log(cayley(toy[0]))
closed = 4 * (1 - mp.cos(31 * theta.real) * mp.cosh(31 * theta.imag))
assert abs(closed - li_sum(toy, 31)) < mp.mpf(10) ** (-20)
print("toy quartet 0.5+-0.2+-5i: first negative index n = %d, value %s"
      % (neg[0], mp.nstr(li_sum(toy, 31), 12)))
# chord term minus defect term
for n in (1, 5, 31):
    us = [cayley(r) for r in toy]
    chord = sum(abs(1 - x ** n) ** 2 for x in us) / 2
    defect = sum((abs(x) ** n - abs(x) ** (-n)) ** 2 for x in us) / 4
    assert defect > 0 and abs(li_sum(toy, n) - (chord - defect)) < mp.mpf(10) ** (-18)
    radial = sum(mp.sinh(n * mp.log(abs(x))) ** 2 for x in us)       # sum of sinh^2(n * radial defect)
    assert abs(defect - radial) < mp.mpf(10) ** (-18)
# hybrid finite family: K on-line pairs (numerical zeros) + one fake quartet at 1/2 +- 0.1 +- 14i
fake = [complex(0.6, 14), complex(0.4, 14), complex(0.6, -14), complex(0.4, -14)]
gam_np = np.array([float(g) for g in GK])
theta_np = 2 * np.arctan(1 / (2 * gam_np))
uf = np.array([1 - 1 / r for r in fake])
eta = abs(math.log(abs(uf[0])))
NMAX = 40000
ns = np.arange(1, NMAX + 1)
online_part = 2 * (1 - np.cos(np.outer(ns, theta_np))).sum(axis=1)
fake_part = (1 - np.exp(np.outer(ns, np.log(uf)))).sum(axis=1).real
total = online_part + fake_part
first_neg = int(ns[np.argmax(total < 0)])
assert total.min() < 0 and first_neg > 1000
check = sum(2 * (1 - mp.cos(first_neg * 2 * mp.atan(1 / (2 * g)))) for g in GK) \
    + sum(1 - (1 - 1 / mp.mpc(r.real, r.imag)) ** first_neg for r in fake).real
assert check < 0
print("fake quartet 0.5+-0.1+-14i: growth exponent eta = |log|u|| = %.6e (delta/|rho|^2 ~ %.6e)"
      % (eta, 0.1 / (0.25 + 196)))
print("  finite family = %d on-line pairs + fake quartet: first negative index n = %d (value %.4f)"
      % (K, first_neg, float(check)))
print("  quartet alone first negative at n = %d" % int(ns[np.argmax(fake_part < 0)]))
# exponential rate (Bombieri-Lagarias (c) / Pringsheim): Lambda_n q^-n unbounded below for q < e^eta
q = math.exp(0.9 * eta)
scaled = total * np.exp(-ns * math.log(q))
assert scaled[20000:].min() < scaled[:20000].min() < 0
print("  min of Lambda_n q^-n (q = e^{0.9 eta}) on n<=2e4: %.4f, on 2e4<n<=4e4: %.4f"
      % (scaled[:20000].min(), scaled[20000:].min()))

# --------------------------------------------------------------------------
section("Z6. finite fields: point counts of elliptic curves are sagittas of Frobenius powers")


def find_irreducible(p, n):
    """Monic irreducible polynomial of degree n in {2,3} over F_p (no root test)."""
    for coeffs in np.ndindex(*([p] * n)):
        c = list(coeffs)                       # x^n + c[n-1] x^{n-1} + ... + c[0]
        if all((pow(x, n, p) + sum(c[i] * pow(x, i, p) for i in range(n))) % p for x in range(p)):
            return c
    raise RuntimeError("no irreducible polynomial found")


def make_field(p, n):
    if n == 1:
        elems = [(x,) for x in range(p)]
        return elems, (lambda a, b: ((a[0] * b[0]) % p,)), (lambda a, b: ((a[0] + b[0]) % p,))
    red = find_irreducible(p, n)
    elems = [tuple(int(t) for t in idx) for idx in np.ndindex(*([p] * n))]

    def add(a, b):
        return tuple((x + y) % p for x, y in zip(a, b))

    def mul(a, b):
        prod = [0] * (2 * n - 1)
        for i, x in enumerate(a):
            if x:
                for j, y in enumerate(b):
                    prod[i + j] += x * y
        for d in range(2 * n - 2, n - 1, -1):          # reduce x^d
            c = prod[d] % p
            if c:
                for i in range(n):
                    prod[d - n + i] -= c * red[i]
            prod[d] = 0
        return tuple(x % p for x in prod[:n])

    return elems, mul, add


def count_points(p, n, A, B):
    elems, mul, add = make_field(p, n)
    emb = lambda c: tuple([c % p] + [0] * (n - 1))
    squares = {}
    for y in elems:
        y2 = mul(y, y)
        squares[y2] = squares.get(y2, 0) + 1
    total_pts = 1                                       # point at infinity
    for x in elems:
        rhs = add(add(mul(mul(x, x), x), mul(emb(A), x)), emb(B))
        total_pts += squares.get(rhs, 0)
    return total_pts


CURVES = [(5, -1, 0, 3), (13, -1, 0, 2), (7, 1, 1, 3), (5, 1, 1, 3), (11, 1, 6, 2)]
for p, A, B, nmax in CURVES:
    assert (4 * A ** 3 + 27 * B ** 2) % p != 0
    N1 = count_points(p, 1, A, B)
    a = p + 1 - N1
    s = mp.mpf(a) / (2 * mp.sqrt(p))                    # similarity of the Frobenius rotor
    v = 1 - s                                           # its sagitta
    assert 0 <= v <= 2 and a * a <= 4 * p               # Hasse bound = elliptic class
    assert abs(N1 - ((mp.sqrt(p) - 1) ** 2 + 2 * mp.sqrt(p) * v)) < mp.mpf(10) ** (-20)
    row = []
    for n in range(1, nmax + 1):
        Nn = count_points(p, n, A, B)
        q_half = mp.mpf(p) ** (mp.mpf(n) / 2)
        vn = 1 - mp.chebyt(n, 1 - v)                    # R20: sagitta of the n-th power
        pred = (q_half - 1) ** 2 + 2 * q_half * vn
        assert abs(pred - Nn) < mp.mpf(10) ** (-15)
        assert 0 <= vn <= 2 + mp.mpf(10) ** (-25)
        assert (q_half - 1) ** 2 - mp.mpf(10) ** (-15) <= Nn <= (q_half + 1) ** 2 + mp.mpf(10) ** (-15)
        row.append(Nn)
    print("y^2 = x^3 %+d x %+d over F_%d: a = %d, sagitta v = %s, #E(F_{p^n}) = %s"
          % (A, B, p, a, mp.nstr(v, 10), row))

# --------------------------------------------------------------------------
section("Z7. functional-equation rotor chi, Riemann-Siegel theta, Hardy Z")
for _ in range(8):
    s = rnd_complex(-1.5, 2.5, 1, 40)
    assert abs(mp.zeta(s) - chi(s) * mp.zeta(1 - s)) < mp.mpf(10) ** (-18) * (1 + abs(mp.zeta(s)))
    assert abs(chi(s) * chi(1 - s) - 1) < mp.mpf(10) ** (-20)
    assert abs(chi(mp.conj(s)) - mp.conj(chi(s))) < mp.mpf(10) ** (-20) * (1 + abs(chi(s)))
for t in [mp.mpf(3), mp.mpf(10), GK[0], mp.mpf(25), mp.mpf(50), mp.mpf(100)]:
    s = mp.mpc(mp.mpf(1) / 2, t)
    c, th = chi(s), mp.siegeltheta(t)
    assert abs(abs(c) - 1) < mp.mpf(10) ** (-22)
    assert abs(c - mp.expj(-2 * th)) < mp.mpf(10) ** (-20)
    assert abs((1 - c.real) - 2 * mp.sin(th) ** 2) < mp.mpf(10) ** (-20)     # sagitta of chi
    Z = mp.expj(th) * mp.zeta(s)
    assert abs(Z.imag) < mp.mpf(10) ** (-18) and abs(Z.real - mp.siegelz(t)) < mp.mpf(10) ** (-15)
    z = mp.zeta(s)
    assert abs(z.real - Z.real * mp.cos(th)) < mp.mpf(10) ** (-18)
    assert abs(z.imag + Z.real * mp.sin(th)) < mp.mpf(10) ** (-18)
for n in range(0, 6):
    g = mp.grampoint(n)
    assert abs(chi(mp.mpc(mp.mpf(1) / 2, g)) - 1) < mp.mpf(10) ** (-18)      # rotor back at 1
for T in [mp.mpf(20), mp.mpf("50.5"), mp.mpf(100), mp.mpf(150), mp.mpf(163)]:
    N = sum(1 for g in GAM if g < T)
    S = mp.arg(mp.zeta(mp.mpc(mp.mpf(1) / 2, T))) / mp.pi
    val = mp.siegeltheta(T) / mp.pi + 1 + S
    assert abs(val - N) < mp.mpf(10) ** (-12)
print("N(T) = theta(T)/pi + 1 + S(T) checked at T = 20, 50.5, 100, 150, 163")
gram = [mp.grampoint(n) for n in range(-1, 40)]
counts = [sum(1 for g in GAM if gram[i] < g <= gram[i + 1]) for i in range(len(gram) - 1)]
assert all(c == 1 for c in counts)
print("one zero in each of the first %d Gram intervals (numerical observation)" % len(counts))


def dlogchi(t):
    return mp.log(mp.pi) - mp.digamma(mp.mpc(mp.mpf(1) / 4, t / 2)).real


T0 = mp.findroot(dlogchi, 6.3)
assert abs(T0 - mp.mpf("6.289835988836903")) < mp.mpf(10) ** (-12)
for t in [mp.mpf(3), mp.mpf(6), mp.mpf(7), mp.mpf(30)]:
    h = mp.mpf(10) ** (-10)
    num = (mp.log(abs(chi(mp.mpc(0.5 + h, t)))) - mp.log(abs(chi(mp.mpc(0.5 - h, t))))) / (2 * h)
    assert abs(num - dlogchi(t)) < mp.mpf(10) ** (-8)
    assert (dlogchi(t) < 0) == (t > T0)
for t in ["6.2899", "6.29073", "7", "10", "20", "50", "200"]:
    for sg in ["0.51", "0.6", "0.75", "1.0", "2.0", "5.0"]:
        assert abs(chi(mp.mpc(sg, t))) < 1                    # grid evidence only
assert abs(chi(mp.mpc("0.6", 6))) > 1 and abs(chi(mp.mpc("0.75", 3))) > 1
print("t0 = %s (root of log(pi) = Re psi(1/4 + it/2)); |chi(0.6+6i)| = %s > 1"
      % (mp.nstr(T0, 16), mp.nstr(abs(chi(mp.mpc('0.6', 6))), 10)))
worst = max(mp.log(abs(chi(mp.mpc(0.5 + 0.01 * j, "6.2899")))) for j in range(1, 800))
assert worst < 0
print("max of log|chi(sigma + 6.2899i)| over sigma = 0.51 ... 8.49: %s (negative: no violation on this grid)"
      % mp.nstr(worst, 6))

# --------------------------------------------------------------------------
section("Z8. base-point rotors: (2 sigma - 1) d/dsigma log|xi| is a total sagitta")


def logder_xi(s):
    """xi'/xi from the definition of xi (s != 0, 1); at s = 1 use the Cauchy coefficient CK[1]."""
    if s == 1:
        return CK[1]
    return 1 / s + 1 / (s - 1) - mp.log(mp.pi) / 2 + mp.digamma(s / 2) / 2 \
        + mp.zeta(s, derivative=1) / mp.zeta(s)


def sagitta_sum(s):
    w = 1 - mp.conj(s)                                  # mirror image of the base point
    tot = mp.mpc(0)
    for g in GK:
        for rho in (mp.mpc(mp.mpf(1) / 2, g), mp.mpc(mp.mpf(1) / 2, -g)):
            ub = (rho - s) / (rho - w)
            assert abs(abs(ub) - 1) < mp.mpf(10) ** (-22)     # unimodular for on-line zeros
            tot += 1 - ub
    half = mp.mpf(1) / 2 - w
    tail = (2 * s.real - 1) * mp.quad(lambda t: 2 * half / (half ** 2 + t ** 2) * density(t),
                                      [T_CUT, mp.inf])
    return tot, tail


for s in [mp.mpc(1, 0), mp.mpc(2, 3), mp.mpc("0.9", 20), mp.mpc(3, -40), mp.mpc("0.55", "14.1")]:
    tot, tail = sagitta_sum(s)
    rhs = (2 * s.real - 1) * mp.conj(logder_xi(s))
    err = abs(tot + tail - rhs)
    assert err < mp.mpf("0.02") * abs(tail) + mp.mpf(10) ** (-10)
    assert tot.real > 0
    print("s = %s: sum of sagittas (K pairs + tail) = %s, (2sigma-1) conj(xi'/xi) = %s"
          % (mp.nstr(s, 6), mp.nstr(tot + tail, 9), mp.nstr(rhs, 9)))
assert abs(logder_xi(mp.mpf(1)) - LAM1) < mp.mpf(10) ** (-18)          # base point 1 gives lambda_1
for s in [mp.mpc(2, 3), mp.mpc("0.9", 20)]:                             # formula versus numerical derivative
    assert abs(logder_xi(s) - mp.diff(xi, s) / xi(s)) < mp.mpf(10) ** (-15)
for t in [0, 5, float(GK[0]), 20, 30]:
    vals = [abs(xi(mp.mpc(0.5 + 0.05 * j, t))) for j in range(0, 51)]
    assert all(vals[j + 1] > vals[j] for j in range(len(vals) - 1))    # numerical observation


# off-line toy: a polynomial with the two symmetries is not monotone in |.|
def quartic(s, delta=mp.mpf(1) / 4, gam=mp.mpf(14)):
    z = s - mp.mpf(1) / 2
    return ((z - delta) ** 2 + gam ** 2) * ((z + delta) ** 2 + gam ** 2)


assert abs(quartic(mp.mpc("0.6", 14))) > abs(quartic(mp.mpc("0.7", 14)))
print("|xi(sigma+it)| increasing on 0.5<=sigma<=3 at the sampled heights; the symmetric quartic is not")

# --------------------------------------------------------------------------
section("Z9. Euler product in sagitta form and the 3-4-1 identity")
PRIMES = np.array(list(sp.primerange(2, 200000)), dtype=np.float64)
for _ in range(5):
    s = rnd_complex(1.1, 3, -30, 30)
    for p in (2, 3, 5, 7, 11, 47):
        vp = 1 - mp.cos(s.imag * mp.log(p))
        lhs = abs(1 - mp.mpf(p) ** (-s)) ** 2
        assert abs(lhs - ((1 - mp.mpf(p) ** (-s.real)) ** 2 + 2 * mp.mpf(p) ** (-s.real) * vp)) < mp.mpf(10) ** (-22)
sig, t = 2.0, 3.7
vp = 1 - np.cos(t * np.log(PRIMES))
prod = np.prod(1 / (1 + 2 * PRIMES ** (-sig) * vp / (1 - PRIMES ** (-sig)) ** 2))
exact = float(abs(mp.zeta(mp.mpc(sig, t))) ** 2 / mp.zeta(sig) ** 2)
assert abs(prod - exact) < 2e-5 and prod < 1
print("|zeta(2+3.7i)|^2/zeta(2)^2 = %.8f; sagitta product over p < 2e5 = %.8f" % (exact, prod))
v1 = sp.symbols("v1")
v2 = 2 * v1 * (2 - v1)
assert sp.expand(8 - 4 * v1 - v2 - 2 * (2 - v1) ** 2) == 0
phi = sp.symbols("phi", real=True)
assert sp.simplify(3 + 4 * sp.cos(phi) + sp.cos(2 * phi) - 2 * (1 + sp.cos(phi)) ** 2) == 0
for sig, t in [(1.05, 14.1347), (1.2, 7.0), (2.0, 3.7)]:
    lhs = 3 * mp.log(mp.zeta(sig)) + 4 * mp.log(abs(mp.zeta(mp.mpc(sig, t)))) \
        + mp.log(abs(mp.zeta(mp.mpc(sig, 2 * t))))
    assert lhs > 0
sig, t = 2.0, 3.7
acc = 0.0
for k in range(1, 40):
    vpk = 1 - np.cos(k * t * np.log(PRIMES))
    acc += float(np.sum(PRIMES ** (-k * sig) / k * 2 * (2 - vpk) ** 2))
lhs = float(3 * mp.log(mp.zeta(sig)) + 4 * mp.log(abs(mp.zeta(mp.mpc(sig, t))))
            + mp.log(abs(mp.zeta(mp.mpc(sig, 2 * t)))))
assert abs(acc - lhs) < 1e-4
print("3 log zeta(s) + 4 log|zeta(s+it)| + log|zeta(s+2it)| = %.6f = sum of 2(2-v)^2 terms %.6f" % (lhs, acc))

# --------------------------------------------------------------------------
section("Z10. accumulated sagitta of Dirichlet steps; mean squares; random phases")
for sig in (0.75, 0.5, 0.25):
    for N in (10 ** 3, 10 ** 4, 10 ** 5):
        n = np.arange(1, N + 1, dtype=np.float64)
        x = n ** (-sig)
        acc = float(np.sum(2 * np.sin(x / 2) ** 2))
        upper = float(np.sum(x ** 2) / 2)
        lower = upper - float(np.sum(x ** 4) / 24)
        assert lower - 1e-9 <= acc <= upper + 1e-9
        if sig == 0.5:
            print("  sigma=1/2, N=%d: sum (1-cos n^-1/2) = %.6f, minus (1/2) log N = %.6f"
                  % (N, acc, acc - 0.5 * math.log(N)))
        elif N == 10 ** 5:
            print("  sigma=%.2f, N=1e5: sum = %.6f (upper bound %.6f)" % (sig, acc, upper))
n = np.arange(1, 10 ** 5 + 1, dtype=np.float64)
a34 = float(np.sum(2 * np.sin(n ** (-0.75) / 2) ** 2))
assert a34 < float(mp.zeta(1.5)) / 2                                  # converges for sigma > 1/2
a12 = [float(np.sum(2 * np.sin(np.arange(1, N + 1) ** (-0.5) / 2) ** 2)) - 0.5 * math.log(N)
       for N in (10 ** 4, 10 ** 5)]
assert abs(a12[0] - a12[1]) < 1e-4                                    # log divergence, slope 1/2
a14 = float(np.sum(2 * np.sin(n ** (-0.25) / 2) ** 2))
assert a14 > 0.9 * math.sqrt(10 ** 5)                                 # ~ N^{1/2} for sigma = 1/4
eq = [N * 2 * math.sin(N ** (-0.5) / 2) ** 2 for N in (10 ** 2, 10 ** 4, 10 ** 6)]
assert abs(eq[-1] - 0.5) < 1e-6                                       # equal steps: finite limit 1/2
print("  equal steps N(1-cos N^-1/2):", ["%.8f" % e for e in eq])

# exact finite-T mean square of a Dirichlet polynomial
Nd, sigd, Td = 12, mp.mpf(1) / 2, mp.mpf(40)
D = lambda t: sum(mp.mpf(k) ** (-sigd) * mp.expj(-t * mp.log(k)) for k in range(1, Nd + 1))
numeric = mp.quad(lambda t: abs(D(t)) ** 2, mp.linspace(-Td, Td, 161)) / (2 * Td)
diag = sum(mp.mpf(k) ** (-2 * sigd) for k in range(1, Nd + 1))
off = sum((mp.mpf(m) * k) ** (-sigd) * mp.sinc(Td * mp.log(mp.mpf(m) / k))
          for m in range(1, Nd + 1) for k in range(1, Nd + 1) if m != k)
assert abs(numeric - (diag + off)) < mp.mpf(10) ** (-12)
off_big = sum((mp.mpf(m) * k) ** (-sigd) * mp.sinc(mp.mpf(10) ** 6 * mp.log(mp.mpf(m) / k))
              for m in range(1, Nd + 1) for k in range(1, Nd + 1) if m != k)
assert abs(off_big) < mp.mpf(10) ** (-3)
print("  mean square of sum_{n<=12} n^{-1/2-it} over |t|<=40: %s = diagonal %s + off-diagonal %s"
      % (mp.nstr(numeric, 12), mp.nstr(diag, 12), mp.nstr(off, 6)))
# primes: sum 1/p - log log x -> Mertens constant; prime sagittas at sigma = 1/2
pr = np.array(list(sp.primerange(2, 10 ** 6)), dtype=np.float64)
mert = float(np.sum(1 / pr)) - math.log(math.log(10 ** 6))
assert abs(mert - 0.2614972128) < 1e-3
sag_p = float(np.sum(2 * np.sin(pr ** (-0.5) / 2) ** 2))
assert float(np.sum(1 / pr)) / 2 - float(np.sum(pr ** (-2.0))) / 24 <= sag_p <= float(np.sum(1 / pr)) / 2
print("  sum_{p<1e6} 1/p - log log 1e6 = %.6f; sum_p (1-cos p^-1/2) = %.6f" % (mert, sag_p))
# exact second moment for independent phases (roots of unity average is exact)
ps, Mroot, sigr = [2, 3, 5], 5, 0.5
grid = np.exp(2j * np.pi * np.arange(Mroot) / Mroot)
acc = 0.0
for i in range(Mroot):
    for j in range(Mroot):
        for k in range(Mroot):
            acc += abs(grid[i] * ps[0] ** (-sigr) + grid[j] * ps[1] ** (-sigr) + grid[k] * ps[2] ** (-sigr)) ** 2
assert abs(acc / Mroot ** 3 - sum(p ** (-2 * sigr) for p in ps)) < 1e-12
for p in (2, 3):
    w = p ** (-0.5)
    ang = 2 * np.pi * np.arange(4096) / 4096
    lg = np.log(np.abs(1 - w * np.exp(1j * ang)))
    assert abs(lg.mean()) < 1e-12
    assert abs(lg.var() - float(mp.polylog(2, w * w)) / 2) < 1e-10
print("  E|sum X_p p^-s|^2 = sum p^-2sigma (exact); Var log|1 - X p^-1/2| = Li_2(1/p)/2 checked")

# --------------------------------------------------------------------------
section("Z11. sagitta weights in the integrated explicit formula")
C_NBB = 2 + mp.euler - mp.log(4 * mp.pi)
assert abs(C_NBB - 2 * LAM1) < mp.mpf(10) ** (-25)
part = 2 * sum(1 / (mp.mpf(1) / 4 + g ** 2) for g in GK)        # sum of 1/(rho(1-rho)) = 2 v_rho
remaining = C_NBB - part
assert abs(remaining - 2 * tail1) < mp.mpf("0.03") * 2 * tail1
print("sum_rho 1/(rho(1-rho)) = 2+gamma-log(4 pi) = %s; first %d pairs give %s" % (
    mp.nstr(C_NBB, 15), K, mp.nstr(part, 12)))


def mangoldt(k):
    f = sp.factorint(k)
    return mp.log(list(f)[0]) if len(f) == 1 else mp.mpf(0)


def U_fun(x):
    m = int(mp.floor(x))
    lam = [mangoldt(k) for k in range(1, m + 1)]
    return x * sum(l / k for k, l in zip(range(1, m + 1), lam)) - sum(lam) \
        - x * mp.log(x) + (1 + mp.euler) * x


def trivial_T(y):
    return mp.nsum(lambda n: mp.exp(-2 * (n + 1) * y) / (2 * (n + 1) * (2 * (n + 1) + 1)), [0, mp.inf])


for x in [mp.mpf("10.5"), mp.mpf("30.5"), mp.mpf("100.5")]:
    y = mp.log(x)
    lhs = sum((mp.exp(mp.mpc(mp.mpf(1) / 2, g) * y) / (mp.mpf(1) / 4 + g ** 2)).real * 2 for g in GK)
    rhs = U_fun(x) - mp.log(2 * mp.pi) + trivial_T(y)
    bound = mp.exp(y / 2) * remaining                # valid if the remaining zeros are on the line
    assert abs(lhs - rhs) <= bound
    print("x = %s: zero side (first %d pairs) = %s, arithmetic side = %s, |diff| = %s <= %s"
          % (mp.nstr(x, 5), K, mp.nstr(lhs, 9), mp.nstr(rhs, 9), mp.nstr(abs(lhs - rhs), 3), mp.nstr(bound, 3)))

# --------------------------------------------------------------------------
section("Z12. Weil-type quadratic form as a Krein form (toy with a Gaussian test function)")


def weil_toy(gam0, delta, c, w):
    """sum over the quartet of ghat(gamma) * conj(ghat(conj gamma)); ghat is even, real on R,
    ghat(z) = exp(-(z-c)^2/(2 w^2)) + exp(-(z+c)^2/(2 w^2))  (g(x) ~ exp(-w^2 x^2/2) cos(c x))."""
    ghat = lambda z: mp.exp(-(z - c) ** 2 / (2 * w ** 2)) + mp.exp(-(z + c) ** 2 / (2 * w ** 2))
    gammas = [mp.mpc(gam0, -delta), mp.mpc(gam0, delta), mp.mpc(-gam0, delta), mp.mpc(-gam0, -delta)]
    return sum(ghat(g) * mp.conj(ghat(mp.conj(g))) for g in gammas)


g0, dl = mp.mpf(14), mp.mpf(1) / 10
w_t = dl                                        # spectral width = offset (spatial width 1/delta)
c_bad = g0 + mp.pi * w_t ** 2 / (2 * dl)        # tunes arg ghat(gamma) to a quarter turn
val_off = weil_toy(g0, dl, c_bad, w_t)
assert abs(val_off.imag) < mp.mpf(10) ** (-20) and val_off.real < 0
assert abs(val_off.real + 4 * mp.exp(1 - mp.pi ** 2 / 4)) < mp.mpf(10) ** (-15)
for c in (mp.mpf(10), mp.mpf(14), c_bad):
    val_on = weil_toy(g0, mp.mpf(0), c, w_t)
    assert abs(val_on.imag) < mp.mpf(10) ** (-20) and val_on.real >= 0
wide = weil_toy(g0, dl, g0, mp.mpf(1))          # a test function too short to resolve delta
assert wide.real > 0
# translations act by diag(e^{i gamma a}); J-unitary always, bounded only for real gamma
a_shift = mp.mpf(3)
gq = [mp.mpc(g0, -dl), mp.mpc(g0, dl)]          # gamma and its mirror conj(gamma)
assert abs(mp.conj(mp.expj(gq[0] * a_shift)) * mp.expj(gq[1] * a_shift) - 1) < mp.mpf(10) ** (-20)
assert abs(abs(mp.expj(gq[0] * a_shift)) - mp.exp(dl * a_shift)) < mp.mpf(10) ** (-20)
# Cayley transform of the spectral parameter: (gamma + i/2)/(gamma - i/2) = (rho - 1)/rho
for g in gq + [mp.mpc(GK[0], 0)]:
    rho = mp.mpf(1) / 2 + 1j * g
    assert abs((g + 0.5j) / (g - 0.5j) - (rho - 1) / rho) < mp.mpf(10) ** (-22)
print("toy Weil form: off-line quartet, Gaussian of spectral width delta: %s = -4 exp(1 - pi^2/4) < 0;"
      % mp.nstr(val_off.real, 10))
print("  same quartet, spectral width 1: %s > 0; on-line values >= 0" % mp.nstr(wide.real, 10))

print("\nALL CHECKS PASSED in %.1f s (mpmath %s, numpy %s, sympy %s, dps=%d, K=%d)"
      % (time.time() - T_START, mp.__version__, np.__version__, sp.__version__, mp.mp.dps, K))
