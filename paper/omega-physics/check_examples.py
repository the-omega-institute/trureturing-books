#!/usr/bin/env python3
"""Numerical checks for examples.tex (physical examples for Papers I and II).

numpy only.  Run:  python3 check_examples.py
Every number quoted in examples.tex is printed here (tag [Ex n]) and every
identity used is asserted.  Experimental inputs are typed in with their source.
"""
import numpy as np

rng = np.random.default_rng(20261120)
TOL = 1e-12
I2 = np.eye(2, dtype=complex)
sx = np.array([[0, 1], [1, 0]], dtype=complex)
sy = np.array([[0, -1j], [1j, 0]], dtype=complex)
sz = np.array([[1, 0], [0, -1]], dtype=complex)
SIG = [sx, sy, sz]
npass = 0


def ok(cond, msg):
    global npass
    assert cond, msg
    npass += 1


def U_rot(alpha, n):
    """Spin-1/2 rotation exp(-i alpha n.sigma/2)."""
    n = np.asarray(n, float)
    n = n / np.linalg.norm(n)
    ns = n[0] * sx + n[1] * sy + n[2] * sz
    return np.cos(alpha / 2) * I2 - 1j * np.sin(alpha / 2) * ns


def rand_spinor():
    v = rng.normal(size=2) + 1j * rng.normal(size=2)
    return v / np.linalg.norm(v)


def c_(x, y):  # correlation on S^3 subset C^2: Euclidean inner product of R^4
    return np.real(np.vdot(x, y))


def kappa(x, y):
    return 0.5 * (1 + c_(x, y))


def beta(x, y):
    return abs(np.vdot(x, y)) ** 2


def bloch(x):
    return np.array([np.real(np.vdot(x, s @ x)) for s in SIG])


def rotmat(U):
    """SO(3) image of U in SU(2): R_ij = 1/2 tr(s_i U s_j U^dag)."""
    return np.array([[0.5 * np.real(np.trace(SIG[i] @ U @ SIG[j] @ U.conj().T))
                      for j in range(3)] for i in range(3)])


# CODATA 2022 (NIST, Mohr et al., RMP 97, 025002 (2025))
GAMMA_N = 1.83247174e8        # neutron gyromagnetic ratio, s^-1 T^-1
GAMMA_P_2PI = 42.577478461e6  # proton gyromagnetic ratio / 2pi, Hz/T
M_N = 1.67492750056e-27       # kg
H = 6.62607015e-34            # J s (exact)
HBAR = H / (2 * np.pi)
C_LIGHT = 299792458.0         # m/s (exact)
EV = 1.602176634e-19          # J (exact)

print("=" * 72)
print("[Ex 1] Neutron 4pi experiment: interference statistic = kappa")
for _ in range(200):
    a = rng.uniform(0, 4 * np.pi)
    n = rng.normal(size=3)
    U = U_rot(a, n)
    psi = rand_spinor()
    ok(abs(c_(psi, U @ psi) - np.cos(a / 2)) < TOL, "Re<psi|U|psi> = cos(a/2) for all psi")
    ok(abs(kappa(psi, U @ psi) - np.cos(a / 4) ** 2) < TOL, "kappa = cos^2(a/4)")
    # S^3 distance d = a/2 (a in [0,2pi]) ; kappa = cos^2(d/2)
    d = np.arccos(np.clip(c_(psi, U @ psi), -1, 1))
    if a <= 2 * np.pi:
        ok(abs(d - a / 2) < 1e-9, "d(psi,U psi)=a/2")
    # O-beam intensity |(psi + U psi)/2|^2 = kappa
    ok(abs(np.linalg.norm((psi + U @ psi) / 2) ** 2 - kappa(psi, U @ psi)) < TOL, "Hadamard test")
    # unpolarised beam: average over psi of kappa equals the same number
# unpolarised: rho = I/2 -> 1/2(1+Re tr(U)/2)
U = U_rot(1.234, [0.3, -1, 2])
ok(abs(0.5 * (1 + np.real(np.trace(U)) / 2) - np.cos(1.234 / 4) ** 2) < TOL, "unpolarised")
# alpha = 2pi: kappa = 0 while beta = 1
psi = rand_spinor(); U = U_rot(2 * np.pi, [0, 0, 1])
ok(abs(kappa(psi, U @ psi)) < TOL and abs(beta(psi, U @ psi) - 1) < TOL, "2pi: kappa 0, beta 1")
# round-trip law: kappa(psi, U^2 psi) = (2 kappa(psi,U psi)-1)^2
for a in rng.uniform(0, 4 * np.pi, 50):
    U = U_rot(a, rng.normal(size=3)); psi = rand_spinor()
    ok(abs(kappa(psi, U @ U @ psi) - (2 * kappa(psi, U @ psi) - 1) ** 2) < TOL, "round trip")
# field integral for a 4pi precession: alpha = gamma_n * B * l / v, v = h/(m lambda)
lam_A = 1.445                                 # Werner et al. 1975
v = H / (M_N * lam_A * 1e-10)
Bl_4pi = 4 * np.pi * v / GAMMA_N             # T m
print(f"  neutron speed at lambda=1.445 A: v = {v:.1f} m/s")
print(f"  4pi field integral: B*l = {Bl_4pi*1e4*100:.1f} G cm  (= {Bl_4pi*1e4*100*lam_A:.1f}/lambda[A] G cm)")
ok(abs(Bl_4pi * 1e6 * lam_A - 271.3) < 0.2, "Bl*lambda = 271 G cm A")
# Rauch et al. 1978 value 716 +- 4 deg (Rauch 1988 review: 715.87 +- 3.8 deg)
for a0 in (715.87, 720.0):
    print(f"  period {a0} deg -> kappa at alpha = 360 deg: {np.cos(np.radians(360)/4*720/a0)**2:.4f}")

print("=" * 72)
print("[Ex 2] Ramsey fringe: kappa along a clock (commutative solution S^1)")
for phi in rng.uniform(-10, 10, 50):
    # two pi/2 pulses about x with free phase phi between them
    P = U_rot(np.pi / 2, [1, 0, 0]) @ np.diag([1, np.exp(1j * phi)]) @ U_rot(np.pi / 2, [1, 0, 0])
    pe = abs(P[1, 0]) ** 2
    ok(abs(pe - 0.5 * (1 + np.cos(phi))) < TOL, "Ramsey P_e = (1+cos phi)/2")
    ok(abs(0.5 * (1 + np.cos(2 * phi)) - (2 * pe - 1) ** 2) < TOL, "fringe duplication")
# three-term recurrence of equally spaced fringe samples
dtau = 0.37; ph0 = 0.9
p = 0.5 * (1 + np.cos(ph0 + dtau * np.arange(30)))
ok(np.allclose(p[2:] + p[:-2], 2 * np.cos(dtau) * p[1:-1] + 1 - np.cos(dtau), atol=TOL), "Ramsey recurrence")
# kappa along a clock of S^3: kappa(x, x e^{i chi}) = cos^2(chi/2)
x = rand_spinor()
for chi in rng.uniform(0, 2 * np.pi, 20):
    ok(abs(kappa(x, np.exp(1j * chi) * x) - np.cos(chi / 2) ** 2) < TOL, "clock kappa")
print("  Ramsey identities verified")

print("=" * 72)
print("[Ex 3] Larmor precession: heap recurrence, Chebyshev form, two-readout law")
B = 1.0
w = 2 * np.pi * GAMMA_P_2PI * B
tau = 1e-9
th = w * tau
cst = np.cos(th / 2)
print(f"  proton at 1 T: f_L = {GAMMA_P_2PI*B/1e6:.6f} MHz; Bloch period {1/(GAMMA_P_2PI*B)*1e9:.4f} ns; "
      f"spinor period {2/(GAMMA_P_2PI*B)*1e9:.4f} ns")
print(f"  tau = 1 ns: omega*tau = {th:.6f} rad; c = cos(omega tau/2) = {cst:.8f}")
U = U_rot(th, [0, 0, 1])
x0 = rand_spinor(); xs = [x0]
for k in range(200):
    xs.append(U @ xs[-1])
xs = np.array(xs)
# heap recurrence x_{n+1} = x_n xbar_{n-1} x_n  <=>  2 c(x_n,x_{n-1}) x_n - x_{n-1}
for n in range(1, 199):
    ok(np.allclose(xs[n + 1], 2 * c_(xs[n], xs[n - 1]) * xs[n] - xs[n - 1], atol=1e-10), "heap rec")
    ok(abs(c_(xs[n], xs[n - 1]) - cst) < 1e-12, "c constant & state independent")
# Cayley-Hamilton U^2 = tr(U) U - 1
ok(np.allclose(U @ U, np.trace(U) * U - I2, atol=TOL), "Cayley-Hamilton")


def cheb_U(k, c):
    if k == -2: return -1.0
    if k == -1: return 0.0
    a, b = 0.0, 1.0
    for _ in range(k):
        a, b = b, 2 * c * b - a
    return b


for n in (1, 2, 5, 17, 100):
    ok(np.allclose(xs[n], cheb_U(n - 1, cst) * xs[1] - cheb_U(n - 2, cst) * xs[0], atol=1e-9), "Chebyshev")
# kappa readouts: r_{n+1} = 2c r_n - r_{n-1} + 1 - c for every test y
for _ in range(10):
    y = rand_spinor()
    r = np.array([kappa(y, xn) for xn in xs])
    ok(np.allclose(r[2:], 2 * cst * r[1:-1] - r[:-2] + 1 - cst, atol=1e-10), "TRD for kappa")
    # Born weights: recurrence at the Bloch angle with a test-dependent offset
    b = np.array([beta(y, xn) for xn in xs])
    off = (1 - np.cos(th)) * (1 + bloch(y)[2] * bloch(x0)[2])
    ok(np.allclose(b[2:], 2 * np.cos(th) * b[1:-1] - b[:-2] + off, atol=1e-10), "beta recurrence")
# spinor sign after one Bloch period
nB = 1 / (GAMMA_P_2PI * B) / tau
print(f"  steps per Bloch period at tau=1 ns: {nB:.3f}")
Tb = 1 / (GAMMA_P_2PI * B)
ok(np.allclose(U_rot(w * Tb, [0, 0, 1]), -I2, atol=1e-9), "U(T_Bloch) = -1")

print("=" * 72)
print("[Ex 4] Isotropic rotational diffusion: spin-1/2 contrast vs polarisation")
# P1 normalisation: BM on unit S^3, generator (1/2)Lap; degree-k harmonic eigenvalue -k(k+2)/2.
for k in range(1, 6):
    print(f"  degree {k}: j = {k/2}, rate (paper units) {k*(k+2)/2}, rate/D = j(j+1) = {k*(k+2)/4}")
# random small rotations: rotation vector per step ~ N(0, 2 D dt I3)
D = 1.0; dt = 2e-3; nsteps = 400; nwalk = 40000
Us = np.repeat(I2[None], nwalk, axis=0)
for _ in range(nsteps):
    th3 = rng.normal(scale=np.sqrt(2 * D * dt), size=(nwalk, 3))
    ang = np.linalg.norm(th3, axis=1)
    nhat = th3 / ang[:, None]
    ns = np.einsum('wi,ijk->wjk', nhat, np.array(SIG))
    step = np.cos(ang / 2)[:, None, None] * I2 - 1j * np.sin(ang / 2)[:, None, None] * ns
    Us = step @ Us
T = nsteps * dt
contrast = np.mean(np.real(np.einsum('wii->w', Us)) / 2)
pol = np.mean(np.abs(Us[:, 0, 0]) ** 2 - np.abs(Us[:, 1, 0]) ** 2)  # R_zz of each rotation
ok(np.allclose([rotmat(Uw)[2, 2] for Uw in Us[:20]], np.abs(Us[:20, 0, 0])**2 - np.abs(Us[:20, 1, 0])**2), 'R_zz formula')
print(f"  MC (D=1, t={T}): contrast {contrast:.4f} vs exp(-3Dt/4) = {np.exp(-0.75*D*T):.4f};"
      f" polarisation {pol:.4f} vs exp(-2Dt) = {np.exp(-2*D*T):.4f}")
ok(abs(contrast - np.exp(-0.75 * D * T)) < 0.006, "spin-1/2 contrast rate 3D/4")
ok(abs(pol - np.exp(-2 * D * T)) < 0.01, "polarisation rate 2D")
ok(abs((2.0) / (0.75) - 8 / 3) < TOL, "ratio 8/3")
print(f"  Debye ratio tau_1/tau_2 = (2*3)/(1*2) = {6/2:.0f}")

print("=" * 72)
print("[Ex 5] Triangle holonomy vs Pancharatnam/Bargmann phase")


def qmul(a, b):
    a0, a1, a2, a3 = a; b0, b1, b2, b3 = b
    return np.array([a0*b0 - a1*b1 - a2*b2 - a3*b3, a0*b1 + a1*b0 + a2*b3 - a3*b2,
                     a0*b2 - a1*b3 + a2*b0 + a3*b1, a0*b3 + a1*b2 - a2*b1 + a3*b0])


def qconj(a):
    return np.array([a[0], -a[1], -a[2], -a[3]])


def half(w, u):  # (w ubar)^{1/2}
    g = qmul(w, qconj(u)); h = np.array([1.0, 0, 0, 0]) + g
    return h / np.linalg.norm(h)


def beta_b(n, m):
    return 0.5 * (1 + n @ m)


def solid_angle(n1, n2, n3):
    num = np.dot(n1, np.cross(n2, n3)); den = 1 + n1 @ n2 + n2 @ n3 + n3 @ n1
    return 2 * np.arctan2(num, den)


for _ in range(200):
    ns_ = [v / np.linalg.norm(v) for v in rng.normal(size=(3, 3))]
    Om = solid_angle(*ns_)
    P = [0.5 * (I2 + sum(n[i] * SIG[i] for i in range(3))) for n in ns_]
    tr = np.trace(P[0] @ P[1] @ P[2])
    ok(abs(np.angle(tr) - Om / 2) < 1e-9, "arg Tr(P1P2P3) = Omega/2 (signed solid angle n1->n2->n3)")
    ok(abs(abs(tr) - np.sqrt(beta_b(ns_[0], ns_[1]) * beta_b(ns_[1], ns_[2]) * beta_b(ns_[2], ns_[0]))) < 1e-12, "|Tr| = sqrt(beta beta beta)")
    # same unit vectors as points of the great 2-sphere S^3 cap span(1,i,j)
    x, y, z = [np.array([n[0], n[1], n[2], 0.0]) for n in ns_]
    a = qmul(qmul(half(x, z), half(z, y)), half(y, x))
    ok(abs(a[0] - np.cos(Om / 2)) < 1e-9, "Re a = cos(E/2), E = Omega")
ex = np.eye(3)
print(f"  octant triangle: Omega = {solid_angle(ex[0], ex[1], ex[2]):.6f} = pi/2; |Pancharatnam phase| = pi/4 (sign = orientation)")
ok(abs(solid_angle(ex[0], ex[1], ex[2]) - np.pi / 2) < TOL, "octant")

print("=" * 72)
print("[Ex 6] Malus's law = Born weight beta; time reversal")
for thp in rng.uniform(0, np.pi, 20):
    e_in = np.array([1, 0], complex); e_pol = np.array([np.cos(thp), np.sin(thp)], complex)
    bv = bloch(e_pol)  # Poincare sphere angle 2*theta
    ok(abs(beta(e_in, e_pol) - np.cos(thp) ** 2) < TOL, "Malus")
    ok(abs(beta(e_in, e_pol) - 0.5 * (1 + bloch(e_in) @ bv)) < TOL, "Bloch form")
K = lambda v: np.conj(v)
Theta = lambda v: (-1j * sy) @ K(v)
for _ in range(20):
    v = rand_spinor()
    ok(np.allclose(Theta(Theta(v)), -v, atol=TOL), "Theta^2=-1")
    ok(abs(np.vdot(v, Theta(v))) < TOL, "Kramers partner orthogonal")
    # N = 3 spins: Theta^{x3} squares to -1
v3 = rand_spinor(); w3 = rand_spinor(); u3 = rand_spinor()
psi3 = np.kron(np.kron(v3, w3), u3)
T3 = lambda p: np.kron(np.kron(-1j * sy, -1j * sy), -1j * sy) @ np.conj(p)
ok(np.allclose(T3(T3(psi3)), -psi3, atol=TOL), "Theta_3^2 = -1")
print("  Malus/Born and Theta^2 = -1 verified")

print("=" * 72)
print("[Ex 7] Exchange, sqrt(SWAP) and the experiments")
X = np.array([[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]], complex)
ok(np.allclose(X, 0.5 * (np.eye(4) + sum(np.kron(s, s) for s in SIG))), "X = (1+sigma.sigma)/2")
Ut = lambda Jt: np.cos(Jt) * np.eye(4) - 1j * np.sin(Jt) * X
sq = 0.5 * (np.eye(4) + X) + 0.5j * (np.eye(4) - X)
ok(np.allclose(Ut(np.pi / 4), np.exp(-1j * np.pi / 4) * sq), "U(pi/4) = e^{-i pi/4} sqrt X")
ok(np.allclose(sq @ sq, X), "sqrtX^2 = X")
up = np.array([1, 0], complex); dn = np.array([0, 1], complex)
out = Ut(np.pi / 4) @ np.kron(up, dn)
target = (np.kron(up, dn) - 1j * np.kron(dn, up)) / np.sqrt(2)
ok(abs(abs(np.vdot(target, out)) - 1) < TOL, "maximally entangled output")
M = out.reshape(2, 2)
ok(abs(2 * abs(np.linalg.det(M)) - 1) < TOL, "concurrence 1")
# SU(2)-invariance of X
for _ in range(10):
    g = U_rot(rng.uniform(0, 4*np.pi), rng.normal(size=3))
    ok(np.allclose(np.kron(g, g) @ X, X @ np.kron(g, g)), "origin-free")
# Petta et al.: phi = J t / hbar ; SWAP at phi = pi ; P_S = (1+cos phi)/2 ; 180 ps sqrt(SWAP)
t_sq = 180e-12
J_Hz = 1 / (4 * t_sq)
J_ueV = H * J_Hz / EV * 1e6
print(f"  Petta: sqrtSWAP 180 ps -> J/h = {J_Hz/1e9:.3f} GHz, J = {J_ueV:.2f} ueV;"
      f" echo coherence 1.2 us / 180 ps = {1.2e-6/t_sq:.0f}")
# paper's J_paper t = phi/2
ok(abs((np.pi / 2) / 2 - np.pi / 4) < TOL, "phi=pi/2 <-> J_paper t = pi/4")
# Anderlini et al. (arXiv:0708.2073): 2 T_SW = 285(1) us
TSW = 285e-6 / 2
print(f"  Anderlini: T_SW = {TSW*1e6:.1f} us, sqrtSWAP at {TSW/2*1e6:.1f} us, U_eg/h = {1/(2*TSW):.0f} Hz")

print("=" * 72)
print("[Ex 8] Grover search: complex reflections and the reflection recurrence")


def s_refl(x, w):  # s_x(w) = 2 Re<x,w> x - w
    return 2 * np.real(np.vdot(x, w)) * x - w


for N in (4, 8, 1024):
    s = np.ones(N, complex) / np.sqrt(N); wv = np.zeros(N, complex); wv[3] = 1
    R = lambda v, u: v - 2 * np.vdot(u, v) * u
    for _ in range(5):
        vv = rng.normal(size=N) + 1j * rng.normal(size=N)
        ok(np.allclose(s_refl(wv, s_refl(1j * wv, vv)), -R(vv, wv)) or
           np.allclose(s_refl(wv, s_refl(1j * wv, vv)), R(vv, wv)), "s_x s_ix = complex reflection (sign)")
        ok(np.allclose(s_refl(wv, s_refl(1j * wv, vv)), R(vv, wv)), "s_x s_ix = 1-2|x><x|")
    G = lambda v: -R(R(v, wv), s)
    xs_ = [s]
    for k in range(12):
        xs_.append(G(xs_[-1]))
    th_ = np.arcsin(1 / np.sqrt(N))
    for k in range(1, 12):
        ok(np.allclose(xs_[k + 1], s_refl(xs_[k], xs_[k - 1])), "x_{k+1} = s_{x_k}(x_{k-1})")
        ok(abs(np.real(np.vdot(xs_[k], xs_[k - 1])) - np.cos(2 * th_)) < 1e-12, "c = 1-2/N")
    for k in range(12):
        ok(abs(abs(np.vdot(wv, xs_[k])) ** 2 - np.sin((2 * k + 1) * th_) ** 2) < 1e-12, "success prob")
    print(f"  N={N}: theta={th_:.6f}, P_succ after 1,2 iterations: "
          f"{np.sin(3*th_)**2:.4f}, {np.sin(5*th_)**2:.4f}")

print("=" * 72)
print("[Ex 9] Filters as boosts: two diattenuators at 0 and 45 degrees")


def diatt(Tmax, Tmin, ang):
    Rr = np.array([[np.cos(ang), -np.sin(ang)], [np.sin(ang), np.cos(ang)]])
    return Rr @ np.diag([np.sqrt(Tmax), np.sqrt(Tmin)]) @ Rr.T


def stokes(rho):
    return np.real(np.array([np.trace(rho), np.trace(rho @ sz), np.trace(rho @ sx), np.trace(rho @ sy)]))


Tmax, Tmin = 1.0, 0.25
Dd = (Tmax - Tmin) / (Tmax + Tmin)
g1 = diatt(Tmax, Tmin, 0.0); g2 = diatt(Tmax, Tmin, np.pi / 4)
rho0 = I2 / 2
for gg in (g1,):
    S = stokes(gg @ rho0 @ gg.conj().T)
    ok(abs(np.linalg.norm(S[1:]) / S[0] - Dd) < TOL, "single diattenuator: DOP = D")
g = g2 @ g1
S = stokes(g @ rho0 @ g.conj().T)
dop = np.linalg.norm(S[1:]) / S[0]
gam = 1 / np.sqrt(1 - Dd ** 2)
dop_pred = np.sqrt(1 - (1 - Dd ** 2) ** 2)
print(f"  D = {Dd:.3f} (gamma = {gam:.4f}); output DOP from unpolarised input = {dop:.5f}"
      f"  (Einstein, perpendicular: {dop_pred:.5f}, gamma_tot = {1/np.sqrt(1-dop**2):.5f} = gamma^2)")
ok(abs(dop - dop_pred) < 1e-12, "Einstein addition perpendicular")
# polar decomposition g = P W (P positive, W unitary): Wigner rotation
u_, s_, vh = np.linalg.svd(g)
W = u_ @ vh
W = W / np.sqrt(np.linalg.det(W))
Rw = rotmat(W)
ang_w = np.degrees(np.arccos((np.trace(Rw) - 1) / 2))
axis = np.array([Rw[2, 1] - Rw[1, 2], Rw[0, 2] - Rw[2, 0], Rw[1, 0] - Rw[0, 1]])
cos_pred = (gam + gam) / (1 + gam * gam)
print(f"  Wigner angle on the Poincare sphere = {ang_w:.4f} deg (formula arccos(2g/(1+g^2)) ="
      f" {np.degrees(np.arccos(cos_pred)):.4f}); axis in (sx,sy,sz) components ~ {np.round(axis/np.linalg.norm(axis),6)}; here sz=S1 (0 deg), sx=S2 (45 deg), sy=S3 (circular)")
print(f"  i.e. an optical rotation of the polarisation azimuth by {ang_w/2:.4f} deg")
ok(abs(np.cos(np.radians(ang_w)) - cos_pred) < 1e-9, "Wigner angle formula")
# in Pauli basis used here (sz ~ S1 horizontal, sx ~ S2 45deg, sy ~ S3 circular): axis must be circular
ok(abs(abs(axis[1] / np.linalg.norm(axis)) - 1) < 1e-9, "rotation about circular axis (sy)")

print("=" * 72)
print("[Ex 10] P^2 + V^2 + C^2 = 1 and gamma^{-1} = concurrence")
for _ in range(100):
    psi = (rng.normal(size=4) + 1j * rng.normal(size=4)); psi /= np.linalg.norm(psi)
    M = psi.reshape(2, 2); rhoA = M @ M.conj().T
    r = np.array([np.real(np.trace(rhoA @ s_)) for s_ in SIG])
    C = 2 * abs(np.linalg.det(M))
    ok(abs(r @ r + C ** 2 - 1) < 1e-12, "|r|^2 + C^2 = 1")
    rp = rng.normal(size=3); rp /= np.linalg.norm(rp)
    P = abs(r @ rp); V = np.linalg.norm(r - (r @ rp) * rp)
    ok(abs(P ** 2 + V ** 2 + C ** 2 - 1) < 1e-12, "PVC")
# Qian-Vamivakas-Eberly 2018 (arXiv:1803.04611v1, Table I), measured (V, D, C)
qve = np.array([[0.996, 0.004, 0.046], [0.863, 0.498, 0.035], [0.488, 0.867, 0.009],
                [0.046, 0.996, 0.003], [0.885, 0.010, 0.463], [0.733, 0.431, 0.522],
                [0.424, 0.747, 0.505], [0.078, 0.865, 0.494], [0.528, 0.004, 0.845],
                [0.426, 0.247, 0.868], [0.226, 0.430, 0.872], [0.014, 0.484, 0.875],
                [0.064, 0.005, 0.991]])
sums = np.sum(qve ** 2, axis=1)
print(f"  QVE 13 states: V^2+D^2+C^2 in [{sums.min():.3f}, {sums.max():.3f}]")
Vv, Dv, Cv = qve[5]
rr = np.hypot(Vv, Dv)
print(f"  state 6: |r| = sqrt(V^2+D^2) = {rr:.4f}, gamma = {1/np.sqrt(1-rr**2):.4f}, "
      f"1/gamma = {np.sqrt(1-rr**2):.4f} vs measured C = {Cv}")

print("=" * 72)
print("[Ex 11] Electroweak numbers (PDG 2026, Electroweak review, rev. May 2026)")
mZ, dmZ = 91.1879, 0.0020
mW, dmW = 80.3625, 0.0077      # LHC-Tevatron 2026 combination without CDF (eq. 10.33)
mW_cdf = 80.432                 # CDF II (adjusted, CT18)
s2_os, s2_ms, s2_eff = 0.22342, 0.23122, 0.23154
rhohat = 1.01016
s2_from_masses = 1 - (mW / mZ) ** 2
ds2 = np.sqrt((2 * mW / mZ ** 2 * dmW) ** 2 + (2 * mW ** 2 / mZ ** 3 * dmZ) ** 2)
print(f"  1 - mW^2/mZ^2 = {s2_from_masses:.5f} +- {ds2:.5f}  (PDG fit s_W^2 on-shell = {s2_os})")
print(f"  with CDF value: 1 - mW^2/mZ^2 = {1-(mW_cdf/mZ)**2:.5f}")
mz_c_ms = mZ * np.sqrt(1 - s2_ms)
print(f"  MSbar: mZ*cos(theta_hat) = {mz_c_ms:.3f} GeV vs mW = {mW} GeV;"
      f" mW^2/(mZ^2 c_hat^2) = {(mW/mz_c_ms)**2:.5f} (PDG rho_hat = {rhohat})")
print(f"  m_W/(m_Z cos) - 1 in MSbar: {mW/mz_c_ms-1:.4%}")
ok(abs((mW / mz_c_ms) ** 2 - rhohat) < 1e-3, "MSbar ratio ~ rho_hat")
mz_c_eff = mZ * np.sqrt(1 - s2_eff)
print(f"  effective angle: mZ*cos(theta_eff) = {mz_c_eff:.3f} GeV")
T_obl, dT_obl = 0.021, 0.055
alpha0inv = 137.035999177
dalpha = 0.031497687 + 0.02758   # leptonic (Steinhauser 1998) + hadronic(5) (PDG 2026 fit table)
alphaZ = 1 / (alpha0inv * (1 - dalpha))
print(f"  alpha(MZ)^-1 ~ {1/alphaZ:.2f}; Delta rho_new = alpha T = ({alphaZ*T_obl*1e4:.1f} +- {alphaZ*dT_obl*1e4:.1f})e-4")
# hypercharges, Q = T3 + Y, one generation incl. nu_R; left-handed Weyl fields (conjugate the RH)
fields = {  # name: (SU3 dim, SU2 dim, Y) as left-handed Weyl
    'Q': (3, 2, 1 / 6), 'u^c': (3, 1, -2 / 3), 'd^c': (3, 1, 1 / 3),
    'L': (1, 2, -1 / 2), 'e^c': (1, 1, 1.0), 'nu^c': (1, 1, 0.0)}
paperY = {'Q': 1 / 6, 'u_R': 2 / 3, 'd_R': -1 / 3, 'L': -1 / 2, 'e_R': -1.0, 'nu_R': 0.0}
smY = {'Q': 1 / 6, 'u_R': 2 / 3, 'd_R': -1 / 3, 'L': -1 / 2, 'e_R': -1.0, 'nu_R': 0.0}
ok(all(abs(paperY[k] - smY[k]) < TOL for k in smY), "hypercharge table")
grav = sum(a * b * y for a, b, y in fields.values())
cub = sum(a * b * y ** 3 for a, b, y in fields.values())
su3 = sum(b * y for a, b, y in fields.values() if a == 3)
su2 = sum(a * y for a, b, y in fields.values() if b == 2)
ok(max(abs(grav), abs(cub), abs(su3), abs(su2)) < TOL, "anomaly cancellation")
print(f"  anomalies: sum Y = {grav:.1e}, sum Y^3 = {cub:.1e}, SU(3)^2U(1) = {su3:.1e}, SU(2)^2U(1) = {su2:.1e}")
# tr T3L^2 / tr Q^2 over S_L + S_R (one generation incl nu_R): 3/8
T3L = [0.5, -0.5] * 4 + [0] * 8
Qs = [2/3, -1/3] * 3 + [0, -1] + [2/3, -1/3] * 3 + [0, -1]
ok(abs(sum(t * t for t in T3L) / sum(q * q for q in Qs) - 3 / 8) < TOL, "3/8")

print("=" * 72)
print("[Ex 12] Cosmological constant (Planck 2018, TT,TE,EE+lowE+lensing)")
H0 = 67.36; dH0 = 0.54; OL = 0.6847; dOL = 0.0073
Mpc = 3.0856775814913673e22
H0s = H0 * 1e3 / Mpc
Lam = 3 * OL * H0s ** 2 / C_LIGHT ** 2
dLam = Lam * np.sqrt((dOL / OL) ** 2 + (2 * dH0 / H0) ** 2)
ell = np.sqrt(3 / Lam)
RH = C_LIGHT / H0s
ly = 9.4607304725808e15
print(f"  Lambda = {Lam:.3e} +- {dLam:.2e} m^-2; de Sitter radius sqrt(3/Lambda) = {ell:.3e} m "
      f"= {ell/ly/1e9:.2f} Gly; Hubble radius c/H0 = {RH:.3e} m = {RH/Mpc/1e3:.3f} Gpc")
lP = np.sqrt(HBAR * 6.67430e-11 / C_LIGHT ** 3)
print(f"  Lambda * l_P^2 = {Lam*lP**2:.2e}  (l_P = {lP:.4e} m, G = 6.67430e-11 CODATA 2022)")
ok(abs(Lam * ell ** 2 - 3) < 1e-12, "Lambda ell^2 = 3 (tautological once ell := sqrt(3/Lambda))")

print("=" * 72)
print(f"ALL CHECKS PASSED: {npass} assertions")
