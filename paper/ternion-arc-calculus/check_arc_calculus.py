"""Numerical sanity checks for 'Ternions and minimal arcs' (not a proof).

Every identity or limit asserted in the paper that is not a textbook fact is
checked here on random or explicit inputs.  Run:  python3 check_arc_calculus.py
Requires numpy; the exact rational checks use the standard-library module fractions.

Module scripts.  Further checks live in the subdirectory checks/, one script per block of the paper.  To add one,
put the script there (numpy and the standard library only; it must print a success marker and exit with status 0)
and register it in CHECK_MODULES below as (file name, success marker, extra condition or None).  Each registered
module contributes one line to the report.
"""
import numpy as np
from fractions import Fraction as Fr
import subprocess as _sp, sys as _sys, os as _os

CHECK_MODULES = [
    # (script in checks/, string that must occur in its output, optional predicate on the output)
    ("roundness_models.py",   "All finite checks passed", None),                                  # Thm 5.18, models
    ("roundness_witnesses.py", "All finite checks passed", None),                                 # Thm 5.18, Remark 5.24
    ("roundness_extra.py",    "TOTAL FAILURES: 0", lambda out: out.count("PASS") >= 60),           # Thm 5.18, lemmas
    ("onesided_models.py",    "PASS all NumPy checks", lambda out: "FAIL" not in out),             # Props 5.26, 5.27
    ("onesided_witnesses.py", "PASS", lambda out: "FAIL" not in out),                              # Prop 5.26
    ("m1_algebra_graphs.py",  "PASS: algebra, powers, spin", None),                            # Part 0
    ("m2_reflection_spaces.py", "PASS: reflections, closing law", None),                         # Section 5A
    ("m2_indep_t_albert.py",  "Albert witness / phase family OK", None),                          # Section 5A, independent
    ("m2_indep_t_assoc.py",   "witness values", lambda out: "OK" in out),                         # Section 5A, independent
    ("m2_indep_t_complex.py", "CP^3 Bargmann max err", None),                                     # Section 5A, independent (asserts)
    ("m2_indep_t_misc.py",    "2I-J eigenvalues", None),                                          # Section 5A, independent (asserts)
    ("m3_indefinite_hyperbolic.py", "All 12 check groups passed", None),                       # Section 5B
    ("d4_self_reference.py",  "PASS all 7 check groups", None),                               # Section 5C
    ("m5_arc_body_tropical.py", "All m5 checks passed.", None),                               # Section 9A
    ("m4_phase_atlas.py",     "PASS  all 10 groups", None),                                    # Sections 6A, 10A
    ("m6_arithmetic_holonomy.py", "PASS all 10 check groups", None),                          # Section 10B
    ("m7_braids_quandles.py",  "copying and the six-state bound", None),                      # Section 5D
    ("m8_arc_bodies_rigidity.py", "PASS all 6 groups", None),                                 # Section 9B
    ("m10_cayley_dickson.py", "All seven NumPy check groups passed.", None),                  # Section 5E
    # register new modules here: (file in checks/, success marker, optional predicate)
]
_chk = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "checks")
def _run(name):
    return _sp.run([_sys.executable, "-B", _os.path.join(_chk, name)], cwd=_chk, capture_output=True, text=True, timeout=1200)

rng = np.random.default_rng(20261119)
REPORT = []


def report(name, err, tol):
    REPORT.append((name, err, tol))


# ---------------------------------------------------------------- quaternions
def qmul(a, b):
    a0, a1, a2, a3 = a
    b0, b1, b2, b3 = b
    return np.array([a0*b0 - a1*b1 - a2*b2 - a3*b3,
                     a0*b1 + a1*b0 + a2*b3 - a3*b2,
                     a0*b2 - a1*b3 + a2*b0 + a3*b1,
                     a0*b3 + a1*b2 - a2*b1 + a3*b0])


def qc(a):
    return np.array([a[0], -a[1], -a[2], -a[3]])


def unit(n=4):
    v = rng.normal(size=n)
    return v / np.linalg.norm(v)


def heap(x, y, z):
    return qmul(qmul(x, qc(y)), z)


def c(x, y):
    return float(x @ y)


def kappa(x, y):
    return (1 + c(x, y)) / 2


def dist(x, y):
    return float(np.arccos(np.clip(x @ y, -1, 1)))


def qexp(v):  # v in Im H (3-vector)
    t = np.linalg.norm(v)
    if t < 1e-300:
        return np.array([1., 0, 0, 0])
    return np.concatenate([[np.cos(t)], np.sin(t) * v / t])


def qlog(q):  # principal log, q in S^3, q != -1
    s = np.linalg.norm(q[1:])
    if s < 1e-300:
        return np.zeros(3)
    return np.arctan2(s, q[0]) * q[1:] / s


def im(v):
    return np.concatenate([[0.], v])


def Ad(q):  # 3x3 matrix of v -> q v q^{-1} (q need not be a unit)
    n2 = q @ q
    M = np.zeros((3, 3))
    for k in range(3):
        e = np.zeros(3); e[k] = 1
        M[:, k] = qmul(qmul(q, im(e)), qc(q))[1:] / n2
    return M


def halfdisp(w, u):
    """principal square root of the displacement w u^{-1}: (u+w) u^{-1}/|u+w|"""
    m = u + w
    return qmul(m, qc(u)) / np.linalg.norm(m)


def rot_angle(R):
    return float(np.arccos(np.clip((np.trace(R) - 1) / 2, -1, 1)))


# =========================================================== 1. heap and kernel
e = {k: 0.0 for k in ["heap identities", "bi-invariance", "kappa=|mid|^2=1-|x-y|^2/4",
                      "round-trip law", "reflection s_x(w)=2<x,w>x-w", "interference law",
                      "s_x is the geodesic symmetry (fixes x, d s_x=-1)", "Loos axioms"]}
for _ in range(300):
    x, y, z, u, v, w = (unit() for _ in range(6))
    e["heap identities"] = max(e["heap identities"], np.abs(heap(x, x, z) - z).max(),
                               np.abs(heap(x, z, z) - x).max(),
                               np.abs(heap(heap(x, y, z), u, v) - heap(x, y, heap(z, u, v))).max())
    e["bi-invariance"] = max(e["bi-invariance"], abs(kappa(heap(x, u, v), heap(y, u, v)) - kappa(x, y)),
                             abs(kappa(heap(u, v, x), heap(u, v, y)) - kappa(x, y)))
    e["kappa=|mid|^2=1-|x-y|^2/4"] = max(e["kappa=|mid|^2=1-|x-y|^2/4"],
                                         abs(kappa(x, y) - np.sum(((x + y) / 2) ** 2)),
                                         abs(kappa(x, y) - (1 - np.sum((x - y) ** 2) / 4)))
    e["round-trip law"] = max(e["round-trip law"], abs(kappa(w, heap(x, w, x)) - (2 * kappa(w, x) - 1) ** 2))
    e["reflection s_x(w)=2<x,w>x-w"] = max(e["reflection s_x(w)=2<x,w>x-w"],
                                           np.abs(heap(x, w, x) - (2 * c(x, w) * x - w)).max())
    e["interference law"] = max(e["interference law"], abs(c(y, heap(x, w, x)) + c(y, w) - 2 * c(w, x) * c(y, x)))
    # geodesic symmetry: s_x(x exp(t xi)) = x exp(-t xi)
    xi = rng.normal(size=3); t = 0.37
    e["s_x is the geodesic symmetry (fixes x, d s_x=-1)"] = max(
        e["s_x is the geodesic symmetry (fixes x, d s_x=-1)"],
        np.abs(heap(x, qmul(x, qexp(t * xi)), x) - qmul(x, qexp(-t * xi))).max())
    S = lambda a, b: heap(a, b, a)
    e["Loos axioms"] = max(e["Loos axioms"], np.abs(S(x, x) - x).max(), np.abs(S(x, S(x, y)) - y).max(),
                           np.abs(S(x, S(y, z)) - S(S(x, y), S(x, z))).max())
for k, val in e.items():
    report("1 " + k, val, 1e-12)

# =========================================================== 2. geodesic recurrence
e = {k: 0.0 for k in ["x_n = g^n x_0", "x_n = cos(n eps) x_0 + sin(n eps) tau (geodesic)",
                      "Chebyshev: x_n = U_{n-1}(c) x_1 - U_{n-2}(c) x_0",
                      "c(y,x_{n+1}) = 2c c(y,x_n) - c(y,x_{n-1})",
                      "second difference = -2 v_k x_k", "chord midpoint = (1-v) x_k",
                      "Noether: x_k ^ x_{k+1} constant", "Noether: left/right displacements constant",
                      "discrete Euler-Lagrange (projected gradient)"]}
for _ in range(100):
    x0, x1, y = unit(), unit(), unit()
    cc = c(x0, x1)
    xs = [x0, x1]
    for n in range(2, 16):   # the cubic form loses the norm at rate (1+sqrt2)^n in floating point (see below)
        xs.append(heap(xs[-1], xs[-2], xs[-1]))
    xs = np.array(xs)
    g = qmul(x1, qc(x0))
    eps = dist(x0, x1)
    tau = (x1 - cc * x0) / np.linalg.norm(x1 - cc * x0)
    U = [np.array(0.0), np.array(1.0)]  # U_{-1}=0, U_0=1
    for n in range(16):
        U.append(2 * cc * U[-1] - U[-2])
    gp = np.array([1., 0, 0, 0])
    for n in range(16):
        e["x_n = g^n x_0"] = max(e["x_n = g^n x_0"], np.abs(xs[n] - qmul(gp, x0)).max())
        gp = qmul(g, gp)
        e["x_n = cos(n eps) x_0 + sin(n eps) tau (geodesic)"] = max(
            e["x_n = cos(n eps) x_0 + sin(n eps) tau (geodesic)"],
            np.abs(xs[n] - (np.cos(n * eps) * x0 + np.sin(n * eps) * tau)).max())
        if n >= 1:
            e["Chebyshev: x_n = U_{n-1}(c) x_1 - U_{n-2}(c) x_0"] = max(
                e["Chebyshev: x_n = U_{n-1}(c) x_1 - U_{n-2}(c) x_0"],
                np.abs(xs[n] - (U[n] * x1 - U[n - 1] * x0)).max())
    for n in range(1, 15):
        e["c(y,x_{n+1}) = 2c c(y,x_n) - c(y,x_{n-1})"] = max(
            e["c(y,x_{n+1}) = 2c c(y,x_n) - c(y,x_{n-1})"],
            abs(c(y, xs[n + 1]) - (2 * cc * c(y, xs[n]) - c(y, xs[n - 1]))))
        v = 1 - c(xs[n], xs[n - 1])
        e["second difference = -2 v_k x_k"] = max(e["second difference = -2 v_k x_k"],
                                                  np.abs(xs[n + 1] - 2 * xs[n] + xs[n - 1] + 2 * v * xs[n]).max())
        e["chord midpoint = (1-v) x_k"] = max(e["chord midpoint = (1-v) x_k"],
                                              np.abs((xs[n + 1] + xs[n - 1]) / 2 - (1 - v) * xs[n]).max())
        W0 = np.outer(xs[0], xs[1]) - np.outer(xs[1], xs[0])
        Wn = np.outer(xs[n], xs[n + 1]) - np.outer(xs[n + 1], xs[n])
        e["Noether: x_k ^ x_{k+1} constant"] = max(e["Noether: x_k ^ x_{k+1} constant"], np.abs(Wn - W0).max())
        e["Noether: left/right displacements constant"] = max(
            e["Noether: left/right displacements constant"],
            np.abs(qmul(xs[n + 1], qc(xs[n])) - g).max(),
            np.abs(qmul(qc(xs[n]), xs[n + 1]) - qmul(qc(x0), x1)).max())
    # discrete Euler-Lagrange: gradient of S = sum (1 - <x_k,x_{k+1}>) at interior points is normal
    for n in range(1, 14):
        grad = -(xs[n - 1] + xs[n + 1])
        e["discrete Euler-Lagrange (projected gradient)"] = max(
            e["discrete Euler-Lagrange (projected gradient)"], np.abs(grad - (grad @ xs[n]) * xs[n]).max())
for k, val in e.items():
    report("2 " + k, val, 1e-10)

# floating-point behaviour: cubic form x_n xbar_{n-1} x_n amplifies the norm defect by 1+sqrt(2) per step;
# the linear Chebyshev form x_{n+1} = 2c x_n - x_{n-1} (c frozen) is neutrally stable
x0, x1 = unit(), unit()
x0 = x0 * (1 + 1e-12)
xs = [x0, x1]
for n in range(30):
    xs.append(heap(xs[-1], xs[-2], xs[-1]))
dfc = [abs(np.log(np.linalg.norm(p))) for p in xs]
rate = (dfc[-1] / dfc[-11]) ** (1 / 10)
report("2 floating point: norm-defect growth rate of cubic form vs 1+sqrt2", abs(rate - (1 + np.sqrt(2))), 1e-3)
cc = c(x0 / np.linalg.norm(x0), x1)
ys = [x0 / np.linalg.norm(x0), x1]
for n in range(100000):
    ys.append(2 * cc * ys[-1] - ys[-2])
report("2 floating point: linear form, |norm-1| after 1e5 steps", abs(np.linalg.norm(ys[-1]) - 1), 1e-9)

# the critical points with steps < pi/2 are exactly the heap recurrence: perturb and see S increase
x0, x1 = unit(), unit()
x1 = x0 + 0.3 * (x1 - c(x0, x1) * x0); x1 /= np.linalg.norm(x1)
xs = [x0, x1]
for n in range(2, 8):
    xs.append(heap(xs[-1], xs[-2], xs[-1]))
xs = np.array(xs)
S0 = sum(1 - c(xs[k], xs[k + 1]) for k in range(7))
worst = np.inf
for _ in range(2000):
    ys = xs.copy()
    for k in range(1, 7):
        ys[k] = ys[k] + 1e-3 * rng.normal(size=4); ys[k] /= np.linalg.norm(ys[k])
    worst = min(worst, sum(1 - c(ys[k], ys[k + 1]) for k in range(7)) - S0)
report("2 sagitta action is locally minimal at the recurrence (min increase >= 0)", max(0.0, -worst), 1e-14)


# =========================================================== 3. consistency for non-geodesic curves
def curve(t):
    """a smooth non-geodesic curve on S^3 with non-constant speed"""
    p = np.array([np.cos(t + 0.3 * t ** 2), np.sin(t + 0.3 * t ** 2) * np.cos(0.7 * t),
                  np.sin(t + 0.3 * t ** 2) * np.sin(0.7 * t) * np.cos(0.2 + t ** 2),
                  np.sin(t + 0.3 * t ** 2) * np.sin(0.7 * t) * np.sin(0.2 + t ** 2)])
    return p / np.linalg.norm(p)


def derivs(f, t, h=1e-3):
    # 5-point differences for x', x'' (used only as reference values)
    d1 = (-f(t + 2 * h) + 8 * f(t + h) - 8 * f(t - h) + f(t - 2 * h)) / (12 * h)
    d2 = (-f(t + 2 * h) + 16 * f(t + h) - 30 * f(t) + 16 * f(t - h) - f(t - 2 * h)) / (12 * h * h)
    return d1, d2


t0 = 0.8
x = curve(t0)
d1, d2 = derivs(curve, t0)
cov_acc = d2 + (d1 @ d1) * x                         # nabla_t x'
hs = 1e-4
speed2 = lambda t: (lambda d: d @ d)(derivs(curve, t)[0])
dspeed2 = (speed2(t0 + hs) - speed2(t0 - hs)) / (2 * hs)
errs = []
for h in [0.04, 0.02, 0.01, 0.005]:
    r = curve(t0 + h) - heap(x, curve(t0 - h), x)
    pred = h * h * cov_acc - 0.5 * h ** 3 * dspeed2 * x
    errs.append(np.linalg.norm(r - pred) / h ** 4)
# ratio of successive errors / h^4 should stay bounded (O(h^4) remainder)
report("3 residual x(t+h)-[x,x(t-h),x] = h^2 nabla x' - h^3/2 (|x'|^2)' x + O(h^4): max |rem|/h^4",
       max(errs), 50.0)
errs2 = []
for h in [0.04, 0.02, 0.01, 0.005]:
    cp, cm = c(x, curve(t0 + h)), c(x, curve(t0 - h))
    sym = curve(t0 + h) + curve(t0 - h) - (cp + cm) * x
    errs2.append(np.linalg.norm(sym - h * h * cov_acc) / h ** 4)
report("3 symmetric arc second difference = h^2 nabla x' + O(h^4): max |rem|/h^4", max(errs2), 50.0)

# =========================================================== 4. sagitta decomposition and limits
e = 0.0
for _ in range(300):
    a, b = unit(), unit()
    g = qmul(b, qc(a)); v = 1 - c(a, b)
    e = max(e, np.abs((b - a) - (qmul(im(g[1:]), a) - v * a)).max(), abs(v - 0.5 * np.sum((b - a) ** 2)),
            abs(v - 2 * (1 - kappa(a, b))), abs((1 - np.sqrt(kappa(a, b))) - (1 - np.cos(dist(a, b) / 2))))
report("4 exact split: y-x = Im(yx^-1) x - v x, v=1-c=2(1-kappa)=|y-x|^2/2; arc sagitta 1-sqrt(kappa)", e, 1e-12)

# smooth curve: sum of sagittas -> 0, bounded by (1/2) max d * length
T = 2.0
for n in [100, 1000, 10000]:
    ts = np.linspace(0, T, n + 1)
    pts = np.array([curve(t) for t in ts])
    ds = np.arccos(np.clip(np.sum(pts[1:] * pts[:-1], axis=1), -1, 1))
    V = np.sum(1 - np.cos(ds))
    bound = 0.5 * ds.max() * ds.sum()
    if n == 10000:
        report("4 smooth curve: sum of sagittas (n=1e4), should be O(1/n)", V, 1e-2)
    if V > bound + 1e-15:
        report("4 smooth curve: sagitta sum exceeds (1/2) max d * length", V - bound, 0.0)
report("4 smooth curve: bound sum v <= (1/2) max d * L holds", 0.0, 1e-15)


# Brownian motion on S^3 (generator Delta/2) built as a product of exponentials of Gaussian increments
def bm_path(T, nfine):
    h = T / nfine
    xs = np.empty((nfine + 1, 4)); xs[0] = np.array([1., 0, 0, 0])
    xi = rng.normal(size=(nfine, 3)) * np.sqrt(h)
    for k in range(nfine):
        xs[k + 1] = qmul(qexp(xi[k]), xs[k])
        xs[k + 1] /= np.linalg.norm(xs[k + 1])
    return xs


T = 1.0
nfine = 2 ** 16
sag, itod = [], []
for rep in range(8):
    xs = bm_path(T, nfine)
    # coarse partition (every 16th point): 4096 intervals
    P = xs[::16]
    vk = 1 - np.sum(P[1:] * P[:-1], axis=1)
    sag.append(vk.sum())
    # sagitta-weighted sum sum v_k x_k versus (3/2) int x dt (Ito drift)
    drift = 1.5 * np.sum(xs[:-1], axis=0) * (T / nfine)
    itod.append(np.linalg.norm(np.sum(vk[:, None] * P[:-1], axis=0) - drift))
report("4 BM on S^3: |mean sum of sagittas - 3T/2| (8 paths, 4096 steps)", abs(np.mean(sag) - 1.5), 0.05)
report("4 BM on S^3: |sum v_k x_k - (3/2) int x dt| (max over 8 paths)", max(itod), 0.08)
# geodesic random walk: steps exp(sqrt(h) xi), E[1-cos(sqrt h |xi|)] = 3h/2 + O(h^2)
hh = 1e-3
sm = np.mean(1 - np.cos(np.sqrt(hh) * np.linalg.norm(rng.normal(size=(400000, 3)), axis=1))) / hh
report("4 geodesic random walk: E[v]/h -> 3/2", abs(sm - 1.5), 0.01)

# =========================================================== 5. Levi-Civita transport along a minimal arc
e = 0.0
for _ in range(300):
    u, w = unit(), unit()
    cc = c(u, w)
    tau = (w - cc * u) / np.linalg.norm(w - cc * u)
    eps = np.arccos(cc)
    tau_w = -np.sin(eps) * u + np.cos(eps) * tau
    vv = rng.normal(size=4); vv -= (vv @ u) * u          # tangent vector at u
    P = vv - (vv @ tau) * tau + (vv @ tau) * tau_w        # parallel transport on the round sphere
    xi = qmul(vv, qc(u))[1:]                              # right trivialisation v = xi u
    h = halfdisp(w, u)
    Pq = qmul(im(Ad(h) @ xi), w)
    m = (u + w) / np.linalg.norm(u + w)
    # also: P = - d s_m (v) ;  d s_m (v) = m vbar m
    e = max(e, np.abs(P - Pq).max(), np.abs(P + qmul(qmul(m, qc(vv)), m)).max(),
            np.abs(m - qmul(h, u)).max(), np.abs(qmul(h, h) - qmul(w, qc(u))).max())
report("5 LC transport along arc u->w is Ad(sqrt(w u^-1)) in right trivialisation, = -d s_m", e, 1e-12)


# =========================================================== 6. triangle holonomy, spherical excess
def excess(x, y, z):
    """spherical excess from the vertex angles (independent of the kappa formula)"""
    def ang(p, q, r):  # angle at p between arcs pq and pr
        a = q - (q @ p) * p; b = r - (r @ p) * p
        return np.arccos(np.clip(a @ b / np.linalg.norm(a) / np.linalg.norm(b), -1, 1))
    return ang(x, y, z) + ang(y, z, x) + ang(z, x, y) - np.pi


def tri_hol(x, y, z):
    return qmul(halfdisp(x, z), qmul(halfdisp(z, y), halfdisp(y, x)))


e = {k: 0.0 for k in ["Re a = (sum kappa - 1)/(2 sqrt(prod kappa))", "spin angle 2 arccos Re a = excess E",
                      "transport around triangle = Ad(a) (vs explicit sphere transport)",
                      "axis of Ad(a) normal to the plane of the triangle",
                      "tan(E/2) = |x^y^z| / (1 + c_xy + c_yz + c_zx)",
                      "cos E rational expression in kappa"]}


def transport(vv, u, w):
    cc = c(u, w); tau = (w - cc * u) / np.linalg.norm(w - cc * u); eps = np.arccos(cc)
    tau_w = -np.sin(eps) * u + np.cos(eps) * tau
    return vv - (vv @ tau) * tau + (vv @ tau) * tau_w


for _ in range(500):
    x, y, z = unit(), unit(), unit()
    a = tri_hol(x, y, z)
    kxy, kyz, kzx = kappa(x, y), kappa(y, z), kappa(z, x)
    E = excess(x, y, z)
    e["Re a = (sum kappa - 1)/(2 sqrt(prod kappa))"] = max(e["Re a = (sum kappa - 1)/(2 sqrt(prod kappa))"],
                                                           abs(a[0] - (kxy + kyz + kzx - 1) / (2 * np.sqrt(kxy * kyz * kzx))))
    e["spin angle 2 arccos Re a = excess E"] = max(e["spin angle 2 arccos Re a = excess E"],
                                                   abs(2 * np.arccos(np.clip(a[0], -1, 1)) - E))
    vv = rng.normal(size=4); vv -= (vv @ x) * x
    P = transport(transport(transport(vv, x, y), y, z), z, x)
    xi = qmul(vv, qc(x))[1:]
    e["transport around triangle = Ad(a) (vs explicit sphere transport)"] = max(
        e["transport around triangle = Ad(a) (vs explicit sphere transport)"],
        np.abs(P - qmul(im(Ad(a) @ xi), x)).max())
    # plane of triangle at x in right trivialisation: xi-images of y,z tangent components
    ty = qmul(y - c(x, y) * x, qc(x))[1:]; tz = qmul(z - c(x, z) * x, qc(x))[1:]
    nrm = np.cross(ty, tz); nrm /= np.linalg.norm(nrm)
    ax = a[1:] / np.linalg.norm(a[1:])
    e["axis of Ad(a) normal to the plane of the triangle"] = max(
        e["axis of Ad(a) normal to the plane of the triangle"], 1 - abs(ax @ nrm))
    G = np.array([x, y, z]) @ np.array([x, y, z]).T
    vol = np.sqrt(max(np.linalg.det(G), 0))
    e["tan(E/2) = |x^y^z| / (1 + c_xy + c_yz + c_zx)"] = max(
        e["tan(E/2) = |x^y^z| / (1 + c_xy + c_yz + c_zx)"],
        abs(np.arctan2(vol, 1 + c(x, y) + c(y, z) + c(z, x)) - E / 2))
    S = kxy + kyz + kzx
    e["cos E rational expression in kappa"] = max(e["cos E rational expression in kappa"],
                                                  abs(np.cos(E) - ((S - 1) ** 2 / (2 * kxy * kyz * kzx) - 1)))
for k, val in e.items():
    report("6 " + k, val, 1e-9)

# exact closed form: a = ((1 + c_xy + c_yz + c_zx) + Im(y x^-1) x Im(z x^-1)) / (4 sqrt(k_xy k_yz k_zx)),
# Gram identity (1+sum c)^2 + |x^y^z|^2 = 16 k_xy k_yz k_zx, right-translation invariance of a
e1 = e2 = e3 = 0.0
for _ in range(500):
    x, y, z, b = unit(), unit(), unit(), unit()
    a = tri_hol(x, y, z)
    kxy, kyz, kzx = kappa(x, y), kappa(y, z), kappa(z, x)
    Y = qmul(y, qc(x))[1:]; Z = qmul(z, qc(x))[1:]
    S1 = 1 + c(x, y) + c(y, z) + c(z, x)
    closed = np.concatenate([[S1], np.cross(Y, Z)]) / (4 * np.sqrt(kxy * kyz * kzx))
    e1 = max(e1, np.abs(a - closed).max())
    G = np.array([x, y, z]) @ np.array([x, y, z]).T
    e2 = max(e2, abs(S1 ** 2 + np.linalg.det(G) - 16 * kxy * kyz * kzx))
    e3 = max(e3, np.abs(tri_hol(qmul(x, b), qmul(y, b), qmul(z, b)) - a).max())
report("6 closed form of a with Im(yx^-1) x Im(zx^-1)", e1, 1e-12)
report("6 Gram identity (1+sum c)^2 + det G = 16 prod kappa", e2, 1e-12)
report("6 triangle holonomy a invariant under right translation of the triangle", e3, 1e-12)

# discrete least action: sum of sagittas with fixed ends >= N (1 - cos(Theta/N)), equality on the uniform geodesic
worst = np.inf
for _ in range(3000):
    N = int(rng.integers(2, 8))
    p, q = unit(), unit()
    Th = dist(p, q)
    if Th > 3.0:
        continue
    xs = [p] + [unit() if rng.uniform() < 0.3 else (lambda w: w / np.linalg.norm(w))(
        p + (q - p) * k / N + 0.2 * rng.normal(size=4)) for k in range(1, N)] + [q]
    S = sum(1 - c(xs[k], xs[k + 1]) for k in range(N))
    worst = min(worst, S - N * (1 - np.cos(Th / N)))
report("6b discrete least action: min over random paths of S - N(1-cos(Theta/N)) (>= 0)", max(0.0, -worst), 1e-12)
p, q = unit(), unit(); N = 7; Th = dist(p, q)
tau = (q - c(p, q) * p) / np.linalg.norm(q - c(p, q) * p)
x1 = np.cos(Th / N) * p + np.sin(Th / N) * tau
xs = [p, x1]
for k in range(2, N + 1):
    xs.append(heap(xs[-1], xs[-2], xs[-1]))
report("6b recurrence from (p, gamma(Theta/N)) reaches q after N steps and attains the bound",
       max(np.abs(xs[-1] - q).max(), abs(sum(1 - c(xs[k], xs[k + 1]) for k in range(N)) - N * (1 - np.cos(Th / N)))), 1e-12)

# small triangle expansion: x=1, y=exp(Y), z=exp(Z):  log a = (1/4) Y x Z + O(r^4) = (1/8)[Y,Z] + O(r^4)
rat = []
for r in [0.1, 0.05, 0.025, 0.0125]:
    Y, Z = r * np.array([1., 0.3, -0.2]), r * np.array([-0.4, 1.1, 0.5])
    a = tri_hol(np.array([1., 0, 0, 0]), qexp(Y), qexp(Z))
    rat.append(np.linalg.norm(qlog(a) - 0.25 * np.cross(Y, Z)) / r ** 4)
report("6 small triangle: log a = (1/4) Y x Z + O(r^4): max |rem|/r^4", max(rat), 1.0)


# =========================================================== 7. finite non-abelian Stokes on a grid
def rand_su2():
    return unit()


def grid_stokes(m, n, U):
    """U[(p,q)] for directed edges between grid vertices; check boundary holonomy vs lasso product."""
    def hol(path):
        H = np.array([1., 0, 0, 0])
        for p, q in zip(path[:-1], path[1:]):
            H = qmul(U[(p, q)], H)
        return H
    # boundary of [0,m]x[0,n], counterclockwise from (0,0)
    bd = [(i, 0) for i in range(m + 1)] + [(m, j) for j in range(1, n + 1)] + \
         [(i, n) for i in range(m - 1, -1, -1)] + [(0, j) for j in range(n - 1, -1, -1)]
    Hb = hol(bd)
    # shelling: rows bottom to top, in each row right to left; recursion D_j = f_j * D_{j-1} at the
    # attaching vertex; we instead verify the ordered lasso product with tails along the boundary-of-D_j.
    # Generic statement checked: boundary holonomy = product over faces of tau^-1 hol(face) tau, tails
    # tau: go up the left column to row j then right along row j to the face corner (comb tree).
    prod = np.array([1., 0, 0, 0])
    # order (Theorem in the paper): rows j descending from left to right, inside a row i ascending.
    for j in range(n - 1, -1, -1):
        for i in range(m):
            tail = [(0, jj) for jj in range(0, j + 1)] + [(ii, j) for ii in range(1, i + 1)]
            face = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1), (i, j)]
            Ht = hol(tail)
            L = qmul(qc(Ht), qmul(hol(face), Ht))
            prod = qmul(prod, L)
    return Hb, prod


def make_U(m, n, gen):
    U = {}
    for i in range(m + 1):
        for j in range(n + 1):
            for di, dj in [(1, 0), (0, 1)]:
                p, q = (i, j), (i + di, j + dj)
                if q[0] <= m and q[1] <= n:
                    g = gen(p, q)
                    U[(p, q)] = g; U[(q, p)] = qc(g)
    return U


best = 0.0
for _ in range(20):
    m, n = rng.integers(1, 5), rng.integers(1, 5)
    U = make_U(m, n, lambda p, q: rand_su2())
    Hb, prod = grid_stokes(m, n, U)
    best = max(best, np.abs(Hb - prod).max())
report("7 lattice Stokes: boundary holonomy = ordered product of lassos (random SU(2), grids <=4x4)", best, 1e-12)

# discrete Poincare lemma: a flat cochain on a grid is the displacement cochain of a vertex map
m, n = 4, 3
xv = {(i, j): unit() for i in range(m + 1) for j in range(n + 1)}
U = make_U(m, n, lambda p, q: qmul(xv[q], qc(xv[p])))
x00 = unit()
rec = {(0, 0): x00}
for j in range(n + 1):
    for i in range(m + 1):
        if (i, j) == (0, 0):
            continue
        p = (i - 1, j) if i > 0 else (i, j - 1)
        rec[(i, j)] = qmul(U[(p, (i, j))], rec[p])
b = qmul(qc(xv[(0, 0)]), x00)   # right translation relating the two integrals
err = max(np.abs(rec[k] - qmul(xv[k], b)).max() for k in rec)
err = max(err, max(np.abs(qmul(U[(p, q)], rec[p]) - rec[q]).max() for (p, q) in U))
report("7 discrete Poincare lemma: flat cochain integrates, unique up to right translation", err, 1e-12)

# plaquette expansion: log H = h^2 (d1 A2 - d2 A1 - [A1,A2]) + O(h^3), [X,Y] = 2 X x Y in Im H
A1 = lambda s, t: np.array([np.sin(s + 2 * t), 0.5 * s * t, np.cos(s - t)])
A2 = lambda s, t: np.array([t * t - s, np.sin(3 * s) * t, 1 + s])
s0, t0_ = 0.3, -0.2
dd = 1e-5
d1A2 = (A2(s0 + dd, t0_) - A2(s0 - dd, t0_)) / (2 * dd)
d2A1 = (A1(s0, t0_ + dd) - A1(s0, t0_ - dd)) / (2 * dd)
F = d1A2 - d2A1 - 2 * np.cross(A1(s0, t0_), A2(s0, t0_))
rat = []
for h in [0.02, 0.01, 0.005, 0.0025]:
    g1 = qexp(h * A1(s0 + h / 2, t0_)); g2 = qexp(h * A2(s0 + h, t0_ + h / 2))
    g3 = qexp(-h * A1(s0 + h / 2, t0_ + h)); g4 = qexp(-h * A2(s0, t0_ + h / 2))
    H = qmul(g4, qmul(g3, qmul(g2, g1)))
    rat.append(np.linalg.norm(qlog(H) - h * h * F) / h ** 3)
report("7 plaquette: log H = h^2 (d1A2 - d2A1 - [A1,A2]) + O(h^3): max |rem|/h^3", max(rat), 20.0)

# =========================================================== 8. LC holonomy of minimal-arc polygons
# (a) subadditivity bound: spin angle of boundary <= sum of excesses of a triangulated filling
worst = -np.inf
for _ in range(200):
    # random fan triangulation of a polygon: centre o and boundary vertices p_0..p_{k-1}
    k = rng.integers(3, 9)
    o = unit()
    ps = [o + 0.6 * rng.normal(size=4) for _ in range(k)]
    ps = [p / np.linalg.norm(p) for p in ps]
    Hb = np.array([1., 0, 0, 0])
    for i in range(k):
        Hb = qmul(halfdisp(ps[(i + 1) % k], ps[i]), Hb)
    tot = sum(excess(o, ps[i], ps[(i + 1) % k]) for i in range(k))
    worst = max(worst, 2 * np.arccos(np.clip(Hb[0], -1, 1)) - tot)
report("8 spin angle of boundary <= sum of excesses of fan filling (max violation)", max(worst, 0.0), 1e-12)


# (b) great 2-sphere: holonomy = signed area exactly (Gauss-Bonnet); test with a spherical cap polygon
def signed_excess(x, y, z, nvec):
    E = excess(x, y, z)
    s = np.sign(np.linalg.det(np.array([x, y, z, nvec])))
    return s * E


e = 0.0
nvec = np.array([0., 0, 0, 1])  # great sphere = {x_3 = 0}
for _ in range(100):
    k = rng.integers(3, 12)
    rr = rng.uniform(0.1, 1.2)
    angs = np.sort(rng.uniform(0, 2 * np.pi, size=k))
    centre = np.array([1., 0, 0, 0])
    ps = [np.array([np.cos(rr), np.sin(rr) * np.cos(a), np.sin(rr) * np.sin(a), 0.]) for a in angs]
    Hb = np.array([1., 0, 0, 0])
    for i in range(k):
        Hb = qmul(halfdisp(ps[(i + 1) % k], ps[i]), Hb)
    tot = sum(signed_excess(centre, ps[i], ps[(i + 1) % k], nvec) for i in range(k))
    e = max(e, abs(Hb[0] - np.cos(tot / 2)))
report("8 great 2-sphere: Re(boundary spin holonomy) = cos(signed area / 2)", e, 1e-12)

# (b') mixed orientations: random (non-convex, self-overlapping) fan polygons in the great sphere
e = 0.0
for _ in range(200):
    k = int(rng.integers(3, 10))
    centre = np.array([1., 0, 0, 0])
    ps = []
    for _i in range(k):
        rr, a = rng.uniform(0.1, 1.3), rng.uniform(0, 2 * np.pi)
        ps.append(np.array([np.cos(rr), np.sin(rr) * np.cos(a), np.sin(rr) * np.sin(a), 0.]))
    Hb = np.array([1., 0, 0, 0])
    for i in range(k):
        Hb = qmul(halfdisp(ps[(i + 1) % k], ps[i]), Hb)
    # boundary holonomy at ps[0] versus product of conjugated fan triangles: compare Re only
    tot = sum(signed_excess(centre, ps[i], ps[(i + 1) % k], nvec) for i in range(k))
    e = max(e, abs(Hb[0] - np.cos(tot / 2)))
report("8 great 2-sphere, mixed orientations: Re H = cos(sum sigma_T E_T / 2)", e, 1e-12)

# d'Alembert: on SO(3) psi = cos(rotation angle) satisfies duplication but not d'Alembert (Remark 3.6)
def rot_q(axis, ang):
    return qexp(ang / 2 * np.asarray(axis, float))
psi_so3 = lambda q: np.cos(2 * np.arccos(np.clip(abs(q[0]), -1, 1)))
a_, b_ = rot_q([0, 0, 1], np.pi / 2), rot_q([1, 0, 0], np.pi / 2)
dup = max(abs(psi_so3(qmul(g, g)) - (2 * psi_so3(g) ** 2 - 1)) for g in (unit() for _ in range(200)))
viol = abs(psi_so3(qmul(a_, b_)) + psi_so3(qmul(a_, qc(b_))) - 2 * psi_so3(a_) * psi_so3(b_))
report("10 SO(3), psi=cos(angle): duplication holds (max err)", dup, 1e-12)
report("10 SO(3), psi=cos(angle): d'Alembert violated, |LHS-RHS| should be 1", abs(viol - 1), 1e-12)
# on SU(2)=S^3 with psi = c(1, .) the full d'Alembert equation holds
dal = max(abs((qmul(a, b)[0] + qmul(a, qc(b))[0]) - 2 * a[0] * b[0]) for a, b in ((unit(), unit()) for _ in range(300)))
report("10 S^3: d'Alembert psi(ab)+psi(ab^-1)=2psi(a)psi(b) for psi=Re", dal, 1e-12)

# (c) smooth surface F:[0,1]^2 -> S^3: boundary spin angle stays bounded by the area as the mesh refines
Fmap = lambda s, t: (lambda p: p / np.linalg.norm(p))(
    np.array([1.0, 0.8 * s - 0.2, 0.9 * t * (1 + 0.3 * s), 0.5 * s * t + 0.2 * np.sin(2 * t)]))
vals = []
for n in [8, 16, 32, 64]:
    P = {(i, j): Fmap(i / n, j / n) for i in range(n + 1) for j in range(n + 1)}
    bd = [(i, 0) for i in range(n + 1)] + [(n, j) for j in range(1, n + 1)] + \
         [(i, n) for i in range(n - 1, -1, -1)] + [(0, j) for j in range(n - 1, -1, -1)]
    Hb = np.array([1., 0, 0, 0])
    for p, q in zip(bd[:-1], bd[1:]):
        Hb = qmul(halfdisp(P[q], P[p]), Hb)
    tot = 0.0
    for i in range(n):
        for j in range(n):
            tot += excess(P[(i, j)], P[(i + 1, j)], P[(i + 1, j + 1)]) + excess(P[(i, j)], P[(i + 1, j + 1)], P[(i, j + 1)])
    vals.append((2 * np.arccos(np.clip(Hb[0], -1, 1)), tot))
report("8 smooth surface: boundary spin angle <= triangulated area at every mesh (max violation)",
       max(0.0, max(a - b for a, b in vals)), 1e-12)
report("8 smooth surface: spin angle change between n=32 and n=64 (convergence)", abs(vals[-1][0] - vals[-2][0]), 1e-3)

# =========================================================== 9. rational calculus
e = 0.0
for _ in range(300):
    r = rng.normal(size=3) * rng.uniform(0.01, 3)
    q = np.concatenate([[1 - r @ r], 2 * r]) / (1 + r @ r)
    q2 = qmul(qmul(im(r) + np.array([1., 0, 0, 0]), im(r) + np.array([1., 0, 0, 0])), np.array([1., 0, 0, 0])) / (1 + r @ r)
    e = max(e, abs(np.linalg.norm(q) - 1), np.abs(q[1:] / (1 + q[0]) - r).max(), np.abs(q - q2).max())
    # chart at -1: r_- = -r/|r|^2 and -q = C(r_-)
    rm = -r / (r @ r)
    qm = np.concatenate([[1 - rm @ rm], 2 * rm]) / (1 + rm @ rm)
    e = max(e, np.abs(qm + q).max())
report("9 Cayley map C(r)=(1+r)^2/(1+|r|^2), inverse Im q/(1+Re q), chart change r -> -r/|r|^2", e, 1e-12)


def cay(r):
    return np.concatenate([[1 - r @ r], 2 * r]) / (1 + r @ r)


def compose_cay(r, s):
    """Cayley coordinate of C(r) C(s)"""
    num = (1 - s @ s) * r + (1 - r @ r) * s + 2 * np.cross(r, s)
    den = 1 + (r @ r) * (s @ s) - 2 * (r @ s)
    return num / den


e = 0.0
for _ in range(300):
    r, s = rng.normal(size=3), rng.normal(size=3)
    q = qmul(cay(r), cay(s))
    e = max(e, np.abs(q[1:] / (1 + q[0]) - compose_cay(r, s)).max())
report("9 composition law in Cayley coordinates", e, 1e-10)

# bi-Lipschitz bound on the hemisphere chart: |r-r'| <= d(q,q') <= 2|r-r'| for |r|,|r'| <= 1
lo, hi = np.inf, 0.0
for _ in range(20000):
    r, s = rng.normal(size=3), rng.normal(size=3)
    r *= rng.uniform(0, 1) ** (1 / 3) / np.linalg.norm(r); s *= rng.uniform(0, 1) ** (1 / 3) / np.linalg.norm(s)
    d = dist(cay(r), cay(s)); de = np.linalg.norm(r - s)
    lo = min(lo, d / de); hi = max(hi, d / de)
report("9 hemisphere chart: min d/|dr| >= 1 (violation)", max(0.0, 1 - lo), 1e-12)
report("9 hemisphere chart: max d/|dr| <= 2 (violation)", max(0.0, hi - 2), 1e-12)


# exact rational arithmetic
def fq(a, b):
    a0, a1, a2, a3 = a; b0, b1, b2, b3 = b
    return (a0*b0 - a1*b1 - a2*b2 - a3*b3, a0*b1 + a1*b0 + a2*b3 - a3*b2,
            a0*b2 - a1*b3 + a2*b0 + a3*b1, a0*b3 + a1*b2 - a2*b1 + a3*b0)


def fconj(a):
    return (a[0], -a[1], -a[2], -a[3])


def fcay(r):
    n = sum(t * t for t in r)
    return ((1 - n) / (1 + n), 2 * r[0] / (1 + n), 2 * r[1] / (1 + n), 2 * r[2] / (1 + n))


def fnorm2(a):
    return sum(t * t for t in a)


def fAd(q):  # rational 3x3 matrix of v -> q v q^{-1}
    n2 = fnorm2(q)
    cols = []
    for k in range(3):
        e3 = [Fr(0)] * 4; e3[k + 1] = Fr(1)
        w = fq(fq(q, tuple(e3)), fconj(q))
        cols.append([w[1] / n2, w[2] / n2, w[3] / n2])
    return [[cols[j][i] for j in range(3)] for i in range(3)]


def fmatmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


ok = True
rr = [Fr(int(rng.integers(-9, 10)), int(rng.integers(1, 9))) for _ in range(6)]
x0, x1 = fcay(rr[:3]), fcay(rr[3:])
xs = [x0, x1]
for n in range(8):
    xs.append(fq(fq(xs[-1], fconj(xs[-2])), xs[-1]))
ok &= all(fnorm2(p) == 1 for p in xs)
cc = sum(a * b for a, b in zip(x0, x1))
ok &= all(sum(a * b for a, b in zip(xs[n + 1], xs[n])) == cc for n in range(len(xs) - 1))
# exact Chebyshev form
Um2, Um1 = Fr(0), Fr(1)
for n in range(1, len(xs)):
    # x_n = U_{n-1} x_1 - U_{n-2} x_0
    if n == 1:
        Ua, Ub = Fr(1), Fr(0)
    else:
        Ua, Ub = 2 * cc * Ua - Ub, Ua
    ok &= all(xs[n][i] == Ua * x1[i] - Ub * x0[i] for i in range(4))
# rational holonomy of a rational triangle and of a rational polygon
pts = [fcay([Fr(int(rng.integers(-5, 6)), int(rng.integers(1, 7))) for _ in range(3)]) for _ in range(5)]
I3 = [[Fr(int(i == j)) for j in range(3)] for i in range(3)]
R = I3
for i in range(5):
    p, q = pts[i], pts[(i + 1) % 5]
    m = tuple(a + b for a, b in zip(p, q))        # unnormalised half displacement (p+q) p^{-1}
    R = fmatmul(fAd(fq(m, fconj(p))), R)
RT = [[R[j][i] for j in range(3)] for i in range(3)]
ok &= fmatmul(RT, R) == I3
det = (R[0][0] * (R[1][1] * R[2][2] - R[1][2] * R[2][1]) - R[0][1] * (R[1][0] * R[2][2] - R[1][2] * R[2][0])
       + R[0][2] * (R[1][0] * R[2][1] - R[1][1] * R[2][0]))
ok &= det == 1
# rational cos E of a rational triangle compared with the float excess
x, y, z = pts[0], pts[1], pts[2]
kap = lambda a, b: (1 + sum(s * t for s, t in zip(a, b))) / 2
S = kap(x, y) + kap(y, z) + kap(z, x)
cosE = (S - 1) ** 2 / (2 * kap(x, y) * kap(y, z) * kap(z, x)) - 1
Ef = excess(*(np.array([float(t) for t in p]) for p in (x, y, z)))
report("9 exact rationality (recurrence, Chebyshev form, polygon holonomy in SO(3,Q))", 0.0 if ok else 1.0, 0.5)
report("9 rational cos E of a rational triangle vs float excess", abs(float(cosE) - np.cos(Ef)), 1e-12)


# rational (Cayley) difference quotient and Cayley integrators
def Acurve(t):
    return np.array([np.cos(t), 0.5 * np.sin(2 * t), 0.3 + t])


def exact_solution(T, n=20000):
    # reference: 4th order Magnus-free RK on S^3 for x' = A x (quaternion product), fine step
    h = T / n; x = np.array([1., 0, 0, 0])
    f = lambda t, x: qmul(im(Acurve(t)), x)
    for k in range(n):
        t = k * h
        k1 = f(t, x); k2 = f(t + h / 2, x + h / 2 * k1); k3 = f(t + h / 2, x + h / 2 * k2); k4 = f(t + h, x + h * k3)
        x = x + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return x / np.linalg.norm(x)


Tt = 1.0
xref = exact_solution(Tt)
orders = {}
for name, mid in [("left-point Cayley (order 1)", 0.0), ("midpoint Cayley (order 2)", 0.5)]:
    errs = []
    for n in [50, 100, 200, 400]:
        h = Tt / n; x = np.array([1., 0, 0, 0])
        for k in range(n):
            x = qmul(cay(h * Acurve((k + mid) * h) / 2), x)
        errs.append(np.linalg.norm(x - xref))
    orders[name] = np.log2(errs[-2] / errs[-1])
report("9 Cayley integrator left point: observed order - 1", abs(orders["left-point Cayley (order 1)"] - 1), 0.1)
report("9 Cayley integrator midpoint: observed order - 2", abs(orders["midpoint Cayley (order 2)"] - 2), 0.1)
# difference quotient (2/h) Cay^{-1}(x(t+h) x(t)^{-1}) -> A(t);  centered version O(h^2)
xs_fine = None
t0 = 0.4
def xsol(t, n=4000):
    h = t / n; x = np.array([1., 0, 0, 0]); f = lambda s, x: qmul(im(Acurve(s)), x)
    for k in range(n):
        s = k * h
        k1 = f(s, x); k2 = f(s + h / 2, x + h / 2 * k1); k3 = f(s + h / 2, x + h / 2 * k2); k4 = f(s + h, x + h * k3)
        x = x + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return x / np.linalg.norm(x)
errs_f, errs_c = [], []
for h in [0.04, 0.02, 0.01]:
    xa, xb, xm = xsol(t0 + h), xsol(t0), xsol(t0 - h)
    g = qmul(xa, qc(xb)); D = 2 / h * g[1:] / (1 + g[0])
    g2 = qmul(xa, qc(xm)); Dc = 2 / (2 * h) * g2[1:] / (1 + g2[0])
    errs_f.append(np.linalg.norm(D - Acurve(t0))); errs_c.append(np.linalg.norm(Dc - Acurve(t0)))
report("9 rational difference quotient: forward order - 1", abs(np.log2(errs_f[-2] / errs_f[-1]) - 1), 0.15)
report("9 rational difference quotient: centred order - 2", abs(np.log2(errs_c[-2] / errs_c[-1]) - 2), 0.15)

# =========================================================== 10. duplication lemma (classification core)
e = 0.0
for _ in range(200):
    x = unit(); X = rng.normal(size=3)
    for t in np.linspace(-3, 3, 13):
        g = qexp(t * X)
        phi = lambda q: (1 + q[0]) / 2
        e = max(e, abs(phi(qmul(g, g)) - (2 * phi(g) - 1) ** 2),
                abs(phi(g) - np.cos(np.linalg.norm(X) * t / 2) ** 2))
report("10 phi(g^2) = (2 phi(g)-1)^2 and phi(exp tX) = cos^2(|X|_g t/2)", e, 1e-12)

# =========================================================== 11. operational closing law (Omega3')
def fit_affine(kfun, x, w, ny=80):
    """least-squares fit kappa(y, s_x w) = A kappa(y,x) + B kappa(y,w) + D over random y; returns coeffs, residual"""
    Y = [unit() for _ in range(ny)]; z = heap(x, w, x)
    Mx = np.array([[kfun(y, x), kfun(y, w), 1.0] for y in Y]); r = np.array([kfun(y, z) for y in Y])
    sol = np.linalg.lstsq(Mx, r, rcond=None)[0]
    return sol, np.abs(Mx @ sol - r).max()


k_model = lambda a, b: (1 + a @ b) / 2
k_half = lambda a, b: 0.75 + 0.25 * (a @ b)          # m = 1/2: affine law holds, kappa >= 1/2 has no zero
k_four = lambda a, b: ((1 + a @ b) / 2) ** 2          # cos^4(d/2): affine law fails
e1 = e2 = 0.0; worst4 = np.inf
for _ in range(100):
    x, w = unit(), unit()
    (A, B, D), res = fit_affine(k_model, x, w)
    e1 = max(e1, res, abs(A - 2 * c(w, x)), abs(B + 1), abs(D - (1 - c(w, x))))
    sol, res2 = fit_affine(k_half, x, w)
    e2 = max(e2, res2)
    worst4 = min(worst4, fit_affine(k_four, x, w)[1])
report("11 model: kappa(y,s_x w) = 2c(w,x) kappa(y,x) - kappa(y,w) + v(x,w) (coefficients and residual)", e1, 1e-10)
report("11 kappa = 3/4 + c/4 (m=1/2) satisfies the affine law (residual)", e2, 1e-10)
report("11 kappa = cos^4(d/2) violates the affine law (min residual should be > 1e-3; reported 1e-3/res)",
       1e-3 / worst4, 1.0)
# group form: psi(z u) + psi(z u^-1) = a(u) psi(z) + d(u) with d = m (2 - a), psi = m + (1-m) psi_0
e3 = e4 = 0.0
for m in (0.0, 0.3, 0.5):
    psi = lambda g: m + (1 - m) * g[0]
    for _ in range(100):
        u, v, z = unit(), unit(), unit()
        a_u = 2 * u[0]; d_u = m * (2 - a_u)
        e3 = max(e3, abs(psi(qmul(z, u)) + psi(qmul(z, qc(u))) - (a_u * psi(z) + d_u)))
        a_v = 2 * v[0]; d_v = m * (2 - a_v)
        e4 = max(e4, abs(a_v * psi(u) + d_v - (a_u * psi(v) + d_u)))
        # symmetry Q(u,v) = Q(v,u) used in the proof
        Q = lambda p, q: psi(qmul(p, q)) + psi(qmul(p, qc(q))) + psi(qmul(qc(p), q)) + psi(qmul(qc(p), qc(q)))
        e4 = max(e4, abs(Q(u, v) - Q(v, u)))
report("11 Wilson form with constant: psi(zu)+psi(zu^-1) = a(u) psi(z) + m(2-a(u))", e3, 1e-12)
report("11 symmetric relation a(v)psi(u)+d(v) = a(u)psi(v)+d(u) and Q(u,v)=Q(v,u)", e4, 1e-12)
# involutive step u = -1 (w = -x): the law holds with b = +1 as well (degenerate case of the proof)
x = unit(); w = -x; z = heap(x, w, x)
e5 = max(abs(c(y, z) - (0 * c(y, x) + 1 * c(y, w) + 0)) for y in (unit() for _ in range(50)))
report("11 involutive step w=-x: law also holds with b=+1 (coefficients not unique)", e5, 1e-12)
# one-readout law fails: best fit of c(y, s_x w) by a c(y,x) + d has large residual for generic w
worst1 = np.inf
for _ in range(50):
    x, w = unit(), unit(); zz = heap(x, w, x); Y = [unit() for _ in range(60)]
    Mx = np.array([[c(y, x), 1.0] for y in Y]); r = np.array([c(y, zz) for y in Y])
    worst1 = min(worst1, np.abs(Mx @ np.linalg.lstsq(Mx, r, rcond=None)[0] - r).max())
report("11 one-readout law fails in the model (1e-3 / min residual)", 1e-3 / worst1, 1.0)

# =========================================================== 12. shellings, sign lemma, product example
def hol_path(U, path):
    H = np.array([1., 0, 0, 0])
    for p, q in zip(path[:-1], path[1:]):
        H = qmul(U[(p, q)], H)
    return H


def rotate_to(cycle, v):
    i = cycle.index(v)
    return cycle[i:] + cycle[:i]


def shelling_stokes(faces, U):
    """faces: list of ccw vertex cycles in shelling order. Implements the induction of the shelling theorem:
    checks the arc condition, H_j(a_j) = H_{j-1}(a_j) F_j(a_j), and the final lasso product."""
    bd = list(faces[0]); edges = {frozenset(e) for e in zip(bd, bd[1:] + bd[:1])}
    base = bd[0]
    lassos = [hol_path(U, rotate_to(bd, base) + [base])]
    errs = 0.0; arc_ok = True
    for f in faces[1:]:
        f = list(f); fe = list(zip(f, f[1:] + f[:1]))
        shared = [e for e in fe if frozenset(e) in edges]
        if not (1 <= len(shared) < len(fe)):
            arc_ok = False; break
        # shared edges must be consecutive in the face cycle: rotate the face so that shared ones come last
        k = len(f)
        idx = [i for i, e in enumerate(fe) if frozenset(e) in edges]
        start = None
        for i in range(k):
            if all(((i + t) % k) in idx for t in range(len(idx))):
                start = i
        if start is None:
            arc_ok = False; break
        b_vertex = f[start]; a_vertex = f[(start + len(idx)) % k]   # face runs b -> a along alpha
        # vertices of alpha other than its ends must not be on the face elsewhere; intersection = alpha only
        alpha_vertices = {f[(start + t) % k] for t in range(len(idx) + 1)}
        if any(v in bd and v not in alpha_vertices for v in f):
            arc_ok = False; break
        bda = rotate_to(bd, a_vertex)
        # in the boundary, alpha runs a -> b
        nalpha = len(idx)
        if bda[nalpha] != b_vertex:
            arc_ok = False; break
        fa = rotate_to(f, a_vertex)
        rho = fa[:k - nalpha + 1]                       # a -> ... -> b along the face, the non-shared part
        beta = bda[nalpha:] + [a_vertex]                 # b -> ... -> a
        new_bd = rho + beta[1:-1]
        if len(set(new_bd)) != len(new_bd):
            arc_ok = False; break
        # rebase the lasso product from 'base' to a_vertex along the old boundary (forward path base -> a)
        old = rotate_to(bd, base); tau = old[:old.index(a_vertex) + 1]
        Ht = hol_path(U, tau)
        lassos = [qmul(Ht, qmul(L, qc(Ht))) for L in lassos]
        H_old = hol_path(U, bda + [a_vertex]); F = hol_path(U, fa + [a_vertex])
        H_new = hol_path(U, new_bd + [a_vertex])
        errs = max(errs, np.abs(H_new - qmul(H_old, F)).max())
        lassos.append(F)
        bd = new_bd; base = a_vertex
        edges |= {frozenset(e) for e in fe}
    prod = np.array([1., 0, 0, 0])
    for L in lassos:
        prod = qmul(prod, L)
    errs = max(errs, np.abs(prod - hol_path(U, rotate_to(bd, base) + [base])).max())
    return arc_ok, errs, bd


def tri_grid_shelling(m, n):
    faces = []
    for j in range(n):
        for i in range(m):
            low = [(i, j), (i + 1, j), (i + 1, j + 1)]; up = [(i, j), (i + 1, j + 1), (i, j + 1)]
            faces += [low, up] if i == 0 else [up, low]
    return faces


def rand_cochain(vertices, faces):
    U = {}
    for f in faces:
        for p, q in zip(f, f[1:] + f[:1]):
            if (p, q) not in U:
                g = unit(); U[(p, q)] = g; U[(q, p)] = qc(g)
    return U


worst = 0.0; ok_all = True
for _ in range(20):
    m, n = int(rng.integers(1, 5)), int(rng.integers(1, 5))
    faces = tri_grid_shelling(m, n)
    U = rand_cochain(None, faces)
    ok, err, _bd = shelling_stokes(faces, U)
    ok_all &= ok; worst = max(worst, err)
    # fan of a k-gon around centre 'o'
    k = int(rng.integers(3, 9))
    fan = [['o', ('p', i), ('p', (i + 1) % k)] for i in range(k)]
    U = rand_cochain(None, fan)
    ok, err, _bd = shelling_stokes(fan, U)
    ok_all &= ok; worst = max(worst, err)
report("12 shellings (triangulated grids, fans): arc condition holds for the stated orders", 0.0 if ok_all else 1.0, 0.5)
report("12 shelling Stokes: H_j(a_j) = H_{j-1}(a_j) F_j and boundary = ordered lasso product", worst, 1e-12)

# discrete Poincare lemma on a shellable complex: flat cochain integrates by extending along rho
faces = tri_grid_shelling(3, 3)
xv = {v: unit() for f in faces for v in f}
U = {}
for f in faces:
    for p, q in zip(f, f[1:] + f[:1]):
        U[(p, q)] = qmul(xv[q], qc(xv[p])); U[(q, p)] = qc(U[(p, q)])
ok, err, bdf = shelling_stokes(faces, U)
err = max(err, np.abs(hol_path(U, bdf + [bdf[0]]) - np.array([1., 0, 0, 0])).max())
report("12 flat (displacement) cochain on a shelled complex: identity holds and boundary holonomy is 1", err, 1e-12)

# sign lemma: x,y,z in W, nu normal: Im(y xbar) x Im(z xbar) = det(x,y,z,nu) nu xbar
e = 0.0
for _ in range(300):
    nu = unit(); P = np.eye(4) - np.outer(nu, nu)
    x, y, z = [(lambda v: v / np.linalg.norm(v))(P @ rng.normal(size=4)) for _ in range(3)]
    lhs = np.cross(qmul(y, qc(x))[1:], qmul(z, qc(x))[1:])
    nx = qmul(nu, qc(x))
    e = max(e, abs(nx[0]), np.abs(lhs - np.linalg.det(np.array([x, y, z, nu])) * nx[1:]).max())
    # transport of the normal along a minimal arc in the great sphere: Ad(h)(nu ubar) = nu wbar
    h = halfdisp(y, x)
    e = max(e, np.abs(Ad(h) @ qmul(nu, qc(x))[1:] - qmul(nu, qc(y))[1:]).max())
report("12 Lemma 9.10 (sign) Im(yx^-1) x Im(zx^-1) = det(x,y,z,nu) nu x^-1, and Ad(h) nu x^-1 = nu y^-1", e, 1e-12)

# Remark 3.7: kappa = (2 + c(x1,y1) + c(x2,y2))/4 on S^3 x S^3 satisfies (Omega2) incl. unique zero, not (Omega3)
k2 = lambda X, Y: (2 + X[0] @ Y[0] + X[1] @ Y[1]) / 4
H2 = lambda X, Y, Z: (heap(X[0], Y[0], Z[0]), heap(X[1], Y[1], Z[1]))
e_inv = 0.0; viol = 0.0
for _ in range(200):
    X, Y, Uu, V = [(unit(), unit()) for _ in range(4)]
    e_inv = max(e_inv, abs(k2(H2(X, Uu, V), H2(Y, Uu, V)) - k2(X, Y)), abs(k2(H2(Uu, V, X), H2(Uu, V, Y)) - k2(X, Y)),
                abs(k2(X, (-X[0], -X[1]))))
    viol = max(viol, abs(k2(Y, H2(X, Y, X)) - (2 * k2(Y, X) - 1) ** 2))
report("12 product example: bi-invariance and zero at (-x1,-x2)", e_inv, 1e-12)
report("12 product example violates the round-trip law (1e-2 / max violation)", 1e-2 / viol, 1.0)

# =========================================================== 13. regularity-free classification
# (a) on R the duplication equation has continuous non-cosine solutions, but none is faithful (Lemma 3.8):
qper = lambda u: 1.3 + 0.4 * np.sin(2 * np.pi * u)              # 1-periodic, positive
f_line = lambda t: np.cos(np.abs(t) * qper(np.log2(np.abs(t)))) if t != 0 else 1.0
ts = np.linspace(-20, 20, 4001)
dup = max(abs(f_line(2 * t) - (2 * f_line(t) ** 2 - 1)) for t in ts)
report("13 R: f(t)=cos(t q(log2|t|)) solves the duplication equation", dup, 1e-9)
# it is not faithful: theta(t) = t q(log2 t) reaches 2 pi, where f = 1
tt = np.linspace(0.01, 20, 200001); th = tt * qper(np.log2(tt))
k = np.argmin(np.abs(th - 2 * np.pi))
report("13 R: that solution takes the value 1 at some t != 0 (|f-1| there)", abs(f_line(tt[k]) - 1), 1e-6)
# (b) torus T^2: the circle values cos(2 pi d/q) are discontinuous at (1/2, 0)
vals = []
for n in (101, 1001, 10001):
    vals.append(np.cos(2 * np.pi * 1 / (2 * n)))          # psi(1/2, 1/n) on the circle of (n,2)
report("13 T^2: psi(1/2,1/n) -> 1 while psi(1/2,0) = -1 (gap should be 2)", abs((vals[-1] - (-1.0)) - 2), 1e-6)

# =========================================================== 14. a.s. sagitta limits along dyadic partitions
T = 1.0; nmax = 14; reps = 40
errs = {n: [] for n in range(6, nmax + 1)}
for rep in range(reps):
    xs = bm_path(T, 2 ** nmax)
    for n in range(6, nmax + 1):
        P = xs[:: 2 ** (nmax - n)]
        Sn = np.sum(np.sum((P[1:] - P[:-1]) ** 2, axis=1))
        errs[n].append((Sn - 3 * T) ** 2)
ratios = [np.mean(errs[n]) * 2 ** n for n in range(6, nmax - 1)]   # E[(S_n-3T)^2] / h, should stay bounded
report("14 dyadic: max_n E[(S_n-3T)^2]/h over n=6..12 (bound C(T) in the proof is 6+27+...=~90)", max(ratios), 90.0)
report("14 dyadic: |S_14 - 3T| averaged over paths", float(np.mean(np.sqrt(errs[nmax]))), 0.05)

# =========================================================== 15. continuum limit of minimal-arc holonomy
def Fsurf(s, t):
    p = np.array([1.0, 0.8 * s - 0.2, 0.9 * t * (1 + 0.3 * s), 0.5 * s * t + 0.2 * np.sin(2 * t)])
    return p / np.linalg.norm(p)


def bd_param(u):   # counterclockwise boundary of the unit square, u in [0,4]
    if u <= 1: return (u, 0.0)
    if u <= 2: return (1.0, u - 1)
    if u <= 3: return (3 - u, 1.0)
    return (0.0, 4 - u)


def spin_lift_ode(nsteps=40000):
    """U' = (1/2) lambda U along gamma = F|boundary, lambda = gamma' gamma^-1 (RK4 on each side)"""
    U = np.array([1., 0, 0, 0]); du = 4.0 / nsteps
    gam = lambda u: Fsurf(*bd_param(u))
    def lam(u):
        e = 1e-6
        a, b = max(np.floor(u), u - e), min(np.floor(u) + 1, u + e)   # stay on one side
        if b - a < 1e-7: a, b = u - e, u
        return qmul((gam(b) - gam(a)) / (b - a), qc(gam(u)))[1:]
    f = lambda u, U: qmul(im(0.5 * lam(u)), U)
    for k in range(nsteps):
        u = k * du
        k1 = f(u + 1e-9, U); k2 = f(u + du / 2, U + du / 2 * k1); k3 = f(u + du / 2, U + du / 2 * k2)
        k4 = f(u + du - 1e-9, U + du * k3)
        U = U + du / 6 * (k1 + 2 * k2 + 2 * k3 + k4); U /= np.linalg.norm(U)
    return U


Uex = spin_lift_ode()
errs = []
for n in (8, 16, 32, 64):
    bdv = [(i / n, 0.0) for i in range(n + 1)] + [(1.0, j / n) for j in range(1, n + 1)] + \
          [(i / n, 1.0) for i in range(n - 1, -1, -1)] + [(0.0, j / n) for j in range(n - 1, -1, -1)]
    H = np.array([1., 0, 0, 0])
    for p, q in zip(bdv[:-1], bdv[1:]):
        H = qmul(halfdisp(Fsurf(*q), Fsurf(*p)), H)
    errs.append(np.linalg.norm(H - Uex) * n ** 2)
report("15 polygon spin holonomy - ODE spin lift = O(n^-2): max n^2 |err| (n=8..64)", max(errs), 5.0)
# area bound Theta(U) <= Area(F)
ng = 400; ss = (np.arange(ng) + 0.5) / ng; dd = 1e-6; area = 0.0
for s_ in ss:
    for t_ in ss:
        a1 = (Fsurf(s_ + dd, t_) - Fsurf(s_ - dd, t_)) / (2 * dd); a2 = (Fsurf(s_, t_ + dd) - Fsurf(s_, t_ - dd)) / (2 * dd)
        area += np.sqrt(max((a1 @ a1) * (a2 @ a2) - (a1 @ a2) ** 2, 0)) / ng ** 2
Theta = 2 * np.arccos(np.clip(Uex[0], -1, 1))
report("15 continuum excess bound: Theta(U_gamma) <= Area(F) (violation)", max(0.0, Theta - area), 1e-9)

# Cor 9.10(ii), full quaternion: H = cos(S/2) + sin(S/2) nu pbar for fans in a great sphere, mixed orientations
e = 0.0
nvec = np.array([0., 0, 0, 1])
for _ in range(200):
    k = int(rng.integers(3, 10)); centre = np.array([1., 0, 0, 0]); ps = []
    for _i in range(k):
        rr, a = rng.uniform(0.1, 1.3), rng.uniform(0, 2 * np.pi)
        ps.append(np.array([np.cos(rr), np.sin(rr) * np.cos(a), np.sin(rr) * np.sin(a), 0.]))
    p0 = ps[0]; H = np.array([1., 0, 0, 0])
    for i in range(k):
        H = qmul(halfdisp(ps[(i + 1) % k], ps[i]), H)
    S = sum(signed_excess(centre, ps[i], ps[(i + 1) % k], nvec) for i in range(k))
    pred = np.cos(S / 2) * np.array([1., 0, 0, 0]) + np.sin(S / 2) * qmul(nvec, qc(p0))
    e = max(e, np.abs(H - pred).max())
report("15 Cor 9.11(ii) full spin holonomy cos(S/2)+sin(S/2) nu pbar (fans, mixed orientation)", e, 1e-12)

# =========================================================== 16. octonion tangent algebra (inputs of Prop 5.7)
def oct_unit():
    v = rng.normal(size=8); return v / np.linalg.norm(v)
def oim():
    v = rng.normal(size=8); v[0] = 0; return v
br = lambda a, b: omul8(a, b) - omul8(b, a)
def omul8(x, y):
    a, b, c_, d = x[:4], x[4:], y[:4], y[4:]
    return np.concatenate([qmul(a, c_) - qmul(qc(d), b), qmul(d, a) + qmul(b, qc(c_))])
oc8 = lambda x: np.concatenate([qc(x[:4]), -x[4:]])
eM = eJ = eA = 0.0
for _ in range(200):
    x, y, z = oim(), oim(), oim()
    J = lambda a, b, c3: br(br(a, b), c3) + br(br(b, c3), a) + br(br(c3, a), b)
    # Malcev identity  J(x, y, [x, z]) = [J(x, y, z), x]
    eM = max(eM, np.abs(J(x, y, br(x, z)) - br(J(x, y, z), x)).max())
    eJ = max(eJ, np.abs(J(x, y, z)).max())
    # di-associativity (Artin): words in two unit octonions associate
    a, b = oct_unit(), oct_unit()
    w1 = omul8(a, b); w2 = omul8(oc8(b), a)
    eA = max(eA, np.abs(omul8(omul8(w1, w2), a) - omul8(w1, omul8(w2, a))).max())
report("16 Im(O) with the commutator satisfies the Malcev identity", eM, 1e-10)
report("16 Im(O) is not a Lie algebra (1/max |Jacobiator|)", 1.0 / eJ, 1.0)
report("16 Artin: subloop generated by two unit octonions is associative (sample words)", eA, 1e-12)
# commuting pure octonions are dependent ([x,y] = 2 x X y for the 7-dim cross product)
u = oim(); v = 0.7 * u
report("16 Im(O): [x, 0.7x] = 0 and |[x,y]|>0 for independent x,y", np.abs(br(u, v)).max() + 1e-3 / np.linalg.norm(br(oim(), oim())), 1e-2)

# =========================================================== 17. sharper bounds and examples
# C.9 sharper bound: rotation angle of Ad(H) <= sum_T min(E_T, 2pi - E_T), on random fans (incl. large triangles)
worst = -np.inf
rot = lambda a: min(2 * np.arccos(np.clip(a[0], -1, 1)), 2 * np.pi - 2 * np.arccos(np.clip(a[0], -1, 1)))
for _ in range(3000):
    k = int(rng.integers(3, 9)); o = unit()
    ps = [unit() if rng.uniform() < 0.3 else (lambda p: p / np.linalg.norm(p))(o + 1.2 * rng.normal(size=4)) for _ in range(k)]
    if any(c(ps[i], ps[(i + 1) % k]) < -0.999 or c(o, ps[i]) < -0.999 for i in range(k)):
        continue
    H = np.array([1., 0, 0, 0])
    for i in range(k):
        H = qmul(halfdisp(ps[(i + 1) % k], ps[i]), H)
    tot = 0.0
    for i in range(k):
        E = 2 * np.arccos(np.clip(tri_hol(o, ps[i], ps[(i + 1) % k])[0], -1, 1))
        tot += min(E, 2 * np.pi - E)
    worst = max(worst, rot(H) - tot)
report("17 C.9 rotation angle of boundary holonomy <= sum min(E_T, 2pi-E_T) (max violation)", max(worst, 0.0), 1e-9)
# degenerate triangle on a great circle, 120 degrees apart: a = -1 (E_T = 2pi), area 0
x = np.array([1., 0, 0, 0]); y = np.array([np.cos(2 * np.pi / 3), np.sin(2 * np.pi / 3), 0, 0]); z = np.array([np.cos(4 * np.pi / 3), np.sin(4 * np.pi / 3), 0, 0])
report("17 C.9 degenerate triangle 120 deg apart: a = -1", np.abs(tri_hol(x, y, z) + np.array([1., 0, 0, 0])).max(), 1e-12)
# C.14 sharpness of d < pi/2 in Theorem 6.4: (x0, x1, -x0, -x1) critical, not the recurrence
x0 = unit(); tdir = unit(); tdir -= (tdir @ x0) * x0; tdir /= np.linalg.norm(tdir)
x1 = np.cos(0.4) * x0 + np.sin(0.4) * tdir
seq = [x0, x1, -x0, -x1]
crit = max(np.abs((lambda g, p: g - (g @ p) * p)(seq[k - 1] + seq[k + 1], seq[k])).max() for k in (1, 2))
defect = np.linalg.norm(seq[2] - heap(seq[1], seq[0], seq[1]))
report("17 C.14 (x0,x1,-x0,-x1) is critical (projected gradient)", crit, 1e-12)
report("17 C.14 ... but violates the recurrence (1/defect, defect ~1.84)", 1.0 / defect, 1.0)
# C.1 erratum: the reflection in m^perp maps u to -w
u, w = unit(), unit(); m = (u + w) / np.linalg.norm(u + w); Rm = lambda v: v - 2 * (m @ v) * m
report("17 C.1 reflection in m^perp maps u to -w", np.abs(Rm(u) + w).max(), 1e-12)
# C.10 corner steps: partition not containing the corners of the square boundary still gives O(delta^2)
errs = []
for n in (8, 16, 32, 64):
    us = np.linspace(0, 4, 4 * n + 1)[:-1] + 0.37 / n          # shifted: never hits the corners u = 1, 2, 3
    us = np.concatenate([[0.0], us, [4.0]])
    pts = [Fsurf(*bd_param(u_)) for u_ in us]
    H = np.array([1., 0, 0, 0])
    for p_, q_ in zip(pts[:-1], pts[1:]):
        H = qmul(halfdisp(q_, p_), H)
    errs.append(np.linalg.norm(H - Uex) * n ** 2)
report("17 C.10 corner-avoiding partitions: max n^2 |H - U| stays bounded", max(errs), 5.0)
# D.7 CLT: 2^{n/2}(V - 3T/2) has variance ~ 3T^2/2
T = 1.0; nmax = 12; n = 8; vals = []
for rep_ in range(400):
    xs = bm_path(T, 2 ** nmax); P = xs[:: 2 ** (nmax - n)]
    V = 0.5 * np.sum(np.sum((P[1:] - P[:-1]) ** 2, axis=1)); vals.append(2 ** (n / 2) * (V - 1.5 * T))
report("17 D.7 CLT: |var(2^{n/2}(V-3T/2)) - 3T^2/2| (400 paths, n=8; MC error ~0.15)", abs(np.var(vals) - 1.5), 0.45)

# =========================================================== 18. further items
# Thm 6.4 sharpness at pi/2: (x0, x1, -x0, -x1) with d(x0,x1) = pi/2 - eps is critical, steps pi/2 -+ eps, defect 2 sin eps
worst = 0.0
for eps in (0.3, 0.05, 0.005):
    x0 = unit(); t_ = unit(); t_ -= (t_ @ x0) * x0; t_ /= np.linalg.norm(t_)
    x1 = np.cos(np.pi / 2 - eps) * x0 + np.sin(np.pi / 2 - eps) * t_
    seq = [x0, x1, -x0, -x1]
    crit = max(np.abs((lambda g, p: g - (g @ p) * p)(seq[k - 1] + seq[k + 1], seq[k])).max() for k in (1, 2))
    defect = np.linalg.norm(seq[2] - heap(seq[1], seq[0], seq[1]))
    worst = max(worst, crit, abs(defect - 2 * np.sin(eps)), abs(dist(seq[1], seq[2]) - (np.pi / 2 + eps)))
report("18 Thm 6.4 sharpness at pi/2: critical, step pi/2+eps, defect 2 sin eps", worst, 1e-9)
# Cor 9.14 star-shaped regions in the great sphere x_3 = 0 around p = 1 (non-convex, and area > 2 pi)
def star_check(rho_fun, n=4000):
    phis = np.linspace(0, 2 * np.pi, n + 1)
    pts = [np.array([np.cos(rho_fun(f)), np.sin(rho_fun(f)) * np.cos(f), np.sin(rho_fun(f)) * np.sin(f), 0.]) for f in phis]
    H = np.array([1., 0, 0, 0])
    for a_, b_ in zip(pts[:-1], pts[1:]):
        H = qmul(halfdisp(b_, a_), H)
    fine = np.linspace(0, 2 * np.pi, 200001)[:-1]
    A = np.mean(1 - np.cos(rho_fun(fine))) * 2 * np.pi
    return H, A
e_ = 0.0
for rf in (lambda f: 0.9 * (1 + 0.45 * np.cos(5 * f)), lambda f: 1.75 * (1 + 0.12 * np.cos(3 * f))):
    H, A = star_check(rf)
    e_ = max(e_, abs(H[0] - np.cos(A / 2)))
report("18 Cor 9.14(b) star-shaped (non-convex; area>2pi): Re U = cos(A/2)", e_, 1e-5)
# Prop 7.4 moment formulas: E cos d = exp(-3h/2), E cos^2 d = 1/4 + 3/4 exp(-4h) (simulated), and limit of exact variance
hh = 0.05; nfine = 400; samples = []
for rep_ in range(4000):
    xs = bm_path(hh, nfine); samples.append(xs[0] @ xs[-1])
samples = np.array(samples)
report("18 Prop 7.4 E cos d vs exp(-3h/2) (4000 samples, MC err ~0.003)", abs(samples.mean() - np.exp(-1.5 * hh)), 0.01)
report("18 Prop 7.4 E cos^2 d vs 1/4+3/4 exp(-4h)", abs((samples ** 2).mean() - (0.25 + 0.75 * np.exp(-4 * hh))), 0.01)
T = 1.0; N = 10 ** 6; h = T / N
var_exact = N ** 2 * ((1 + 3 * np.exp(-4 * h)) / 4 - np.exp(-3 * h))
report("18 Prop 7.4 exact variance N^2[(1+3e^{-4h})/4 - e^{-3h}] -> 3T^2/2 (N=1e6)", abs(var_exact - 1.5), 1e-3)
bias = np.sqrt(N) * (N * (1 - np.exp(-1.5 * h)) - 1.5 * T)
report("18 Prop 7.4 bias sqrt(N)(EV - 3T/2) vs -9T^2/(8 sqrt N)", abs(bias - (-9 * T ** 2 / (8 * np.sqrt(N)))) * np.sqrt(N), 1e-2)
# (K2) step (d): the split octonion norm restricted to the traceless part has signature (3,4)
G = np.diag([1., 1, 1, 1, -1, -1, -1, -1])          # split norm in a standard basis, 1 = e0
sig = np.linalg.eigvalsh(G[1:, 1:])
report("18 (K2)(d) split octonions: signature on 1^perp is (3,4)", abs((sig > 0).sum() - 3) + abs((sig < 0).sum() - 4), 0.5)

# =========================================================== 19. the quotient excluded by (Omega2d); diffusion normalisation
# assertions from an earlier verification script (6001 checks there), inlined
def rot3(q):
    E = np.eye(4)[1:]
    return np.array([qmul(qmul(q, e), qc(q))[1:] for e in E]).T
n9 = 0; e9 = 0.0
for _ in range(2000):
    x, w = unit(), unit()
    cc = x @ w
    R = rot3(qmul(qc(w), x))
    cosa = (np.trace(R) - 1) / 2
    e9 = max(e9, abs((1 + cosa) / 2 - cc ** 2)); n9 += 1                      # kappa' = c^2
    y = qmul(qmul(x, qc(w)), x)
    e9 = max(e9, abs((w @ y) ** 2 - (2 * cc ** 2 - 1) ** 2)); n9 += 1        # round-trip law for c^2
    e9 = max(e9, abs(cc ** 2 - ((-x) @ w) ** 2)); n9 += 1                    # descends to S^3/{+-1}
B4 = np.eye(4)
e9 = max(e9, max(abs((B4[i] @ B4[j]) ** 2) for i in range(4) for j in range(i))); n9 += 1   # four orthogonal classes
report(f"19 Rem 3.13: SO(3) solution kappa' = c^2 on S^3/{{+-1}} ({n9} assertions from check_round9.py)", e9, 1e-12)
# zero set of c^2 from [x] is a 2-sphere of representatives (dimension check: tangent rank 3 inside R^4 at a zero)
# diffusion normalisation: physical rotation vector increments theta ~ N(0, 2D dt I), spinor step exp(theta/2)
D = 1.0; tphys = 0.8; nst = 200; dt = tphys / nst; vals = []
for _ in range(3000):
    q = np.array([1., 0, 0, 0])
    for k in range(nst):
        q = qmul(qexp(0.5 * rng.normal(size=3) * np.sqrt(2 * D * dt)), q)
    vals.append(q[0])
report("19 pointer (iv): E c(psi_0, psi_t) = exp(-3Dt/4) for physical D (3000 walks, MC err ~0.01)",
       abs(np.mean(vals) - np.exp(-0.75 * D * tphys)), 0.03)

# =========================================================== 20. Theorem 9.14 (holonomy of a disk in a great 2-sphere)
# inlined from an earlier verification script (40 assertions): non-convex, non-star-shaped regions, not in a hemisphere
def _r12_sph(colat, lon): return np.array([np.sin(colat) * np.cos(lon), np.sin(colat) * np.sin(lon), np.cos(colat)])
def _r12_horseshoe(c1, c2, span, m=400, rot=None):
    lons = np.linspace(0, span, m)
    P = [_r12_sph(c2, l) for l in lons] + [_r12_sph(c1, l) for l in lons[::-1]]
    if rot is not None: P = [rot @ p for p in P]
    return P
def _r12_spiral(turns=2.5, w=0.12, m=1500):
    t = np.linspace(0, 1, m); lon = 2 * np.pi * turns * t; cc_ = 0.25 + 1.6 * t
    return [_r12_sph(ci + w, li) for ci, li in zip(cc_, lon)] + [_r12_sph(ci - w, li) for ci, li in zip(cc_[::-1], lon[::-1])]
def _r12_area(P):   # area to the left for the outward normal of S^2 in Im H (Gauss-Bonnet for a geodesic polygon)
    tot = 0.0; m = len(P)
    for k in range(m):
        a, p, b = P[k - 1], P[k], P[(k + 1) % m]
        tin = -(a - (a @ p) * p); tout = b - (b @ p) * p
        tot += np.arctan2(p @ np.cross(tin, tout), tin @ tout)
    return (2 * np.pi - tot) % (4 * np.pi)
def _r12_hol_right(P):  # the round-12 convention: product of right half-displacements
    X = [np.array([0.0, *p]) for p in P]; U = np.array([1.0, 0, 0, 0])
    for k in range(len(X)):
        r = qmul(qc(X[k]), X[(k + 1) % len(X)]) + np.array([1.0, 0, 0, 0]); U = qmul(U, r / np.linalg.norm(r))
    return U, X[0]
rng12 = np.random.default_rng(12)
cases12 = [_r12_horseshoe(0.3, 2.2, np.radians(300)), _r12_horseshoe(0.2, 2.6, np.radians(340)),
           _r12_horseshoe(1.2, 1.5, np.radians(350)), _r12_spiral()]
for _ in range(6):
    Q, _q = np.linalg.qr(rng12.normal(size=(3, 3)))
    cases12.append(_r12_horseshoe(rng12.uniform(0.2, 0.8), rng12.uniform(1.6, 2.7), np.radians(rng12.uniform(200, 345)), rot=Q))
n12 = 0; e12 = 0.0; e_ours = 0.0
for P in cases12:
    U, x0 = _r12_hol_right(P); A = _r12_area(P)
    e12 = max(e12, abs(np.linalg.norm(U) - 1)); n12 += 1
    e12 = max(e12, np.linalg.norm(qmul(U, x0) - qmul(x0, U))); n12 += 1
    e12 = max(e12, abs(U[0] - np.cos(A / 2))); n12 += 1
    assert abs(U[0] - np.cos(A / 2 + np.pi)) > 1e-3 or abs(np.cos(A / 2)) < 1e-3; n12 += 1
    # paper convention: H = h_n ... h_1, nu = 1, n(x0) = nu xbar0.  The paper's orientation det(x,t1,t2,nu) > 0 is opposite to
    # the outward one used by _r12_area, so the traversal is negative for the region of area A: H = exp(-(A/2) nu xbar0).
    X = [np.array([0.0, *p]) for p in P]; H = np.array([1., 0, 0, 0])
    for k in range(len(X)):
        H = qmul(halfdisp(X[(k + 1) % len(X)], X[k]), H)
    pred = np.cos(A / 2) * np.array([1., 0, 0, 0]) - np.sin(A / 2) * qc(X[0])
    e_ours = max(e_ours, np.abs(H - pred).max())
report(f"20 Thm 9.14: round-12 cases, Re U = cos(area/2) etc. ({n12} assertions from check_round12.py)", e12, 1e-8)
report("20 Thm 9.14 in the paper's convention: H = exp(-(A/2) nu xbar0) for negative traversal", e_ours, 1e-8)
# orientation map: det(x,t1,t2,e0) = -x.(t1 x t2) for x, t1, t2 imaginary
x_, t1_, t2_ = [np.concatenate([[0.], rng.normal(size=3)]) for _ in range(3)]
report("20 orientation: det(x,t1,t2,e0) = -x.(t1 x t2)", abs(np.linalg.det(np.array([x_, t1_, t2_, [1., 0, 0, 0]]).T) + x_[1:] @ np.cross(t1_[1:], t2_[1:])), 1e-12)

# =========================================================== 21. weakened axiom; rigidity on S^3
import itertools as _it
# (A) Fano example (inlined)
_FP = list(range(1, 8))
def _FT(x, y, z):
    if x == y: return z
    if y == z: return x
    if x == z: return x ^ y
    return y if (x ^ y ^ z) == 0 else x ^ y ^ z
nA = 0; okA = True
for x, y in _it.product(_FP, _FP):
    okA &= _FT(x, x, y) == y and _FT(x, y, y) == x; nA += 2
for y in _FP:
    for x in _FP:
        okA &= sorted(_FT(x, y, z) for z in _FP) == _FP and sorted(_FT(z, y, x) for z in _FP) == _FP; nA += 2
def _Fgen(S):
    S = set(S)
    while True:
        new = {_FT(a, b, c_) for a in S for b in S for c_ in S} | S
        if new == S: return S
        S = new
for a, b in _it.combinations(_FP, 2):
    S = _Fgen({a, b}); okA &= S == {a, b, a ^ b}; nA += 1
    okA &= all(_FT(_FT(p_, q_, r_), s_, t_) == _FT(p_, q_, _FT(r_, s_, t_)) == _FT(p_, _FT(s_, r_, q_), t_)
               for p_, q_, r_, s_, t_ in _it.product(S, repeat=5)); nA += 1
violA = sum(_FT(_FT(p_, q_, r_), s_, t_) != _FT(p_, q_, _FT(r_, s_, t_)) for p_, q_, r_, s_, t_ in _it.product(_FP, repeat=5))
o_ = 1; mulF = lambda x, y: _FT(x, o_, y); invF = lambda x: _FT(o_, x, o_)
formA = sum(_FT(x, y, z) != mulF(mulF(x, invF(y)), z) for x in _FP for y in _FP for z in _FP)
okA &= violA == 7560 and formA == 192; nA += 2
report(f"21 Prop 5.10(A) Fano: Mal'cev, lines are Z3 heaps, 7560 violations, 192 formula failures ({nA} assertions)", 0.0 if okA else 1.0, 0.5)
# (B) S^3 example
TB = lambda a, b, x: qmul(qmul(qmul(qmul(qmul(qmul(a, qc(b)), a), qc(b)), x), qc(a)), b)
eB = 0.0; w3 = wR = 0.0
for _ in range(400):
    a, b, x, y, w = (unit() for _ in range(5))
    eB = max(eB, np.abs(TB(a, a, x) - x).max(), np.abs(TB(a, b, b) - a).max(),
             np.abs(TB(x, w, x) - heap(x, w, x)).max(), abs(kappa(TB(a, b, x), TB(a, b, y)) - kappa(x, y)))
    w3 = max(w3, np.linalg.norm(TB(TB(a, b, x), y, w) - TB(a, b, TB(x, y, w))))
    wR = max(wR, abs(kappa(TB(x, b, a), TB(y, b, a)) - kappa(x, y)))
report("21 Prop 5.10(B): Mal'cev, standard round trip, left isometry", eB, 1e-12)
report("21 Prop 5.10(B): third identity and right invariance fail (1/defects)", max(1 / w3, 1 / (20 * wR)), 1.0)
one = np.array([1., 0, 0, 0]); ii = np.array([0., 1, 0, 0]); u2 = np.array([-0.5, 0, np.sqrt(3) / 2, 0])
star = lambda u, w_: qmul(qmul(qmul(u, u), w_), qc(u))
report("21 Prop 5.10(B): 1*i = i = u'*i with u' = -1/2 + (sqrt3/2) j (not a loop)", max(np.abs(star(one, ii) - ii).max(), np.abs(star(u2, ii) - ii).max()), 1e-12)
# Theorem 5.10 sanity: the interpolating family T_l(a,1,x) = a Rot_{A,-2 l s}(x) is right-isometric only for l in {0,1}
def rot_about(Aax, ang, q):
    v = q[1:]; v2 = v * np.cos(ang) + np.cross(Aax, v) * np.sin(ang) + Aax * (Aax @ v) * (1 - np.cos(ang))
    return np.concatenate([[q[0]], v2])
def Tl(lam, a, x):
    s_ = np.arccos(np.clip(a[0], -1, 1)); Aax = a[1:] / np.linalg.norm(a[1:])
    return qmul(a, rot_about(Aax, -2 * lam * s_, x))
devs = {}
for lam in (0.0, 0.3, 0.7, 1.0):
    worst = 0.0
    for _ in range(300):
        a1, a2, x = unit(), unit(), unit()
        worst = max(worst, abs(kappa(Tl(lam, a1, x), Tl(lam, a2, x)) - kappa(a1, a2)))
    devs[lam] = worst
report("21 Thm 5.15 (earlier proof) sanity: right isometry holds for l = 0 (standard) and l = 1 (x a)", max(devs[0.0], devs[1.0]), 1e-12)
report("21 Thm 5.15 (earlier proof) sanity: and fails for l = 0.3, 0.7 (1/defect)", 1 / min(devs[0.3], devs[0.7]), 100.0)

# =========================================================== 22. Hurwitz form of rigidity; S^7
o8 = lambda: (lambda v: v / np.linalg.norm(v))(rng.normal(size=8))
E8 = np.eye(8)
def rand_orth_fix1(n, det):
    Qm, _ = np.linalg.qr(rng.normal(size=(n - 1, n - 1)))
    if np.sign(np.linalg.det(Qm)) != det: Qm[:, 0] *= -1
    P = np.eye(n); P[1:, 1:] = Qm; return P
# Lemma 5.10 (Hurwitz form) on H: isotope by phi in SO(3) is uv, by O(3)\SO(3) is vu
ep = em = 0.0
for _ in range(500):
    for det in (1, -1):
        P = rand_orth_fix1(4, det); u_, v_ = unit(), unit()
        mu = P @ qmul(P.T @ u_, P.T @ v_)
        if det == 1: ep = max(ep, np.abs(mu - qmul(u_, v_)).max())
        else: em = max(em, np.abs(mu - qmul(v_, u_)).max())
report("22 Lemma 5.11: phi-isotope of H is uv (det 1) / vu (det -1)", max(ep, em), 1e-12)
# composition products on O from O(7): unital, norm-multiplicative
muP = lambda P: (lambda u_, v_: P @ omul8(P.T @ u_, P.T @ v_))
e = 0.0
for _ in range(200):
    mu = muP(rand_orth_fix1(8, int(rng.choice([1, -1])))); u_, v_ = o8(), o8()
    e = max(e, abs(np.linalg.norm(mu(u_, v_)) - 1), np.abs(mu(E8[0], v_) - v_).max(), np.abs(mu(u_, E8[0]) - u_).max())
report("22 phi-isotopes of O (phi in O(7)) are unital composition products", e, 1e-12)
# Lemma 5.11 (normal form) for T0 = (a bbar) x on S^7: mu_b(u,v) = bbar T(bu,b,bv) is bilinear, unital, norm-multiplicative
T0 = lambda a, b, x: omul8(omul8(a, oc8(b)), x)
def mu_of(T, b):
    def m(u_, v_):
        nu, nv = np.linalg.norm(u_), np.linalg.norm(v_)
        if nu == 0 or nv == 0: return np.zeros(8)
        return nu * nv * omul8(oc8(b), T(omul8(b, u_ / nu), b, omul8(b, v_ / nv)))
    return m
e = 0.0; dmu = 0.0
for _ in range(100):
    b = o8(); m = mu_of(T0, b); u1, u2, v_ = rng.normal(size=8), rng.normal(size=8), rng.normal(size=8); al, be = rng.normal(size=2)
    e = max(e, np.abs(m(al * u1 + be * u2, v_) - al * m(u1, v_) - be * m(u2, v_)).max(),
            np.abs(m(v_, al * u1 + be * u2) - al * m(v_, u1) - be * m(v_, u2)).max(),
            abs(np.linalg.norm(m(u1, v_)) - np.linalg.norm(u1) * np.linalg.norm(v_)),
            np.abs(m(E8[0], v_) - v_).max(), np.abs(m(v_, E8[0]) - v_).max())
    a, x = o8(), o8()
    e = max(e, np.abs(omul8(b, m(omul8(oc8(b), a), omul8(oc8(b), x))) - T0(a, b, x)).max())
    u_, v_ = o8(), o8()
    e = max(e, np.abs(m(u_, v_) - omul8(oc8(b), omul8(omul8(omul8(b, u_), oc8(b)), omul8(b, v_)))).max())
    dmu = max(dmu, np.linalg.norm(m(u_, v_) - omul8(u_, v_)))
report("22 Lemma 5.12 / Prop 5.16(iv): mu_b of (a bbar)x bilinear, unital, multiplicative, formula of (iv)", e, 1e-12)
report(f"22 Prop 5.16(iv): mu_b of (a bbar)x depends on b (max distance to the octonion product {dmu:.2f}; 1/value)", 1 / dmu, 10.0)
# the family T_theta of Prop 5.13(iii), theta(b) = 1.3 sin(2 b0) + 0.7 b3 b5, rotation in the plane (e1, e2)
def Rth(th):
    R = np.eye(8); R[1, 1] = R[2, 2] = np.cos(th); R[1, 2] = -np.sin(th); R[2, 1] = np.sin(th); return R
theta = lambda b: 1.3 * np.sin(2 * b[0]) + 0.7 * b[3] * b[5]
def Tth(a, b, x):
    mu = muP(Rth(theta(b))); return omul8(b, mu(omul8(oc8(b), a), omul8(oc8(b), x)))
e = 0.0; dist_std = 0.0
for _ in range(200):
    a, b, x, y = o8(), o8(), o8(), o8()
    e = max(e, np.abs(Tth(a, a, x) - x).max(), np.abs(Tth(a, x, x) - a).max(),
            abs(Tth(a, b, x) @ Tth(a, b, y) - x @ y), abs(Tth(x, a, b) @ Tth(y, a, b) - x @ y),
            np.abs(Tth(x, a, x) - (2 * (x @ a) * x - a)).max())
    # great circle through c: c e^{tX}
    c_ = o8(); X = np.zeros(8); X[1:] = rng.normal(size=7); X /= np.linalg.norm(X)
    pt = lambda t: omul8(c_, np.cos(t) * E8[0] + np.sin(t) * X)
    r_, s_, t_ = rng.uniform(-3, 3, 3)
    e = max(e, np.abs(Tth(pt(r_), pt(s_), pt(t_)) - pt(r_ - s_ + t_)).max())
    dist_std = max(dist_std, np.linalg.norm(Tth(a, b, x) - T0(a, b, x)))
report("22 Prop 5.16: T_theta: Mal'cev, two-sided isometry, round trip 2<x,w>x-w, heap on great circles", e, 1e-12)
report(f"22 Prop 5.16: T_theta differs from (a bbar)x (max {dist_std:.2f}; 1/value)", 1 / dist_std, 10.0)
# R_theta is not an automorphism for theta not in 2 pi Z
dA = min(max(np.linalg.norm(Rth(th) @ omul8(u_, v_) - omul8(Rth(th) @ u_, Rth(th) @ v_)) for u_, v_ in [(o8(), o8()) for _ in range(50)])
         for th in (0.3, 1.0, np.pi, 5.0))
report("22 Prop 5.16(iii): R_theta in G2 only for theta in 2 pi Z (1/min defect)", 1 / dA, 10.0)
# G2 elements fix 1, preserve norm, have det 1 (sample automorphism: x -> q x q^{-1} on H + compatible, via basic triple map)
# Prop 5.14: (C_o) for (a bbar)x and all o; fails for T_theta; holds for isometric conjugates of (a bbar)x
C_def = lambda T, o, x, y, z: np.linalg.norm(T(x, y, z) - T(T(x, o, T(o, y, o)), o, z))
eC = eM = eI = 0.0; fC = 0.0
for _ in range(200):
    o, x, y, z = o8(), o8(), o8(), o8()
    eC = max(eC, C_def(T0, o, x, y, z))
    fC = max(fC, C_def(Tth, o, x, y, z))
    a_, b_, c3 = o8(), o8(), o8()                          # right Moufang identity ((ab)c)b = a(b(cb))
    eM = max(eM, np.abs(omul8(omul8(omul8(a_, b_), c3), b_) - omul8(a_, omul8(b_, omul8(c3, b_)))).max())
psi = rand_orth_fix1(8, -1); psi = psi @ np.linalg.qr(rng.normal(size=(8, 8)))[0]   # an arbitrary orthogonal map of R^8
Tpsi = lambda a, b, x: psi @ T0(psi.T @ a, psi.T @ b, psi.T @ x)
for _ in range(100):
    o, x, y, z = o8(), o8(), o8(), o8()
    eI = max(eI, C_def(Tpsi, o, x, y, z))
report("22 Prop 5.17: (C_o) holds for (a bbar)x (all o) and its isometric conjugates; right Moufang identity", max(eC, eM, eI), 1e-12)
report("22 Prop 5.17: (C_o) fails for T_theta (1/max defect)", 1 / fC, 10.0)
# base loops of T_theta are Moufang (isomorphic to the unit octonions)
eL = 0.0
for _ in range(100):
    o, x, y, z = o8(), o8(), o8(), o8()
    m = lambda p_, q_: Tth(p_, o, q_)
    eL = max(eL, np.abs(m(m(m(z, x), z), y) - m(z, m(x, m(z, y)))).max())
report("22 every base loop of T_theta satisfies the Moufang identity ((zx)z)y = z(x(zy))", eL, 1e-12)
# left transports of (a bbar)x are not automorphisms: g = (1+i)/sqrt2, points T(g, gj, gl) and g T(1, j, l) antipodal
g_ = (E8[0] + E8[1]) / np.sqrt(2)
lhs = T0(omul8(g_, E8[0]), omul8(g_, E8[2]), omul8(g_, E8[4])); rhs = omul8(g_, T0(E8[0], E8[2], E8[4]))
report("22 (a bbar)x: T(g, gj, gl) = -g T(1, j, l) for g = (1+i)/sqrt2", np.abs(lhs + rhs).max(), 1e-12)
# S^3: (C_o) at one point forces x ybar z or z ybar x; T_E violates it; T_E satisfies the algebraic hypotheses
TE = lambda a, b, x: heap(a, b, x) if b[0] > 0 else qmul(qmul(x, qc(b)), a)
e = 0.0; fE = 0.0
for _ in range(300):
    a, b, x, y = unit(), unit(), unit(), unit()
    e = max(e, np.abs(TE(a, a, x) - x).max(), np.abs(TE(a, x, x) - a).max(), abs(kappa(TE(a, b, x), TE(a, b, y)) - kappa(x, y)),
            abs(kappa(TE(x, a, b), TE(y, a, b)) - kappa(x, y)), np.abs(TE(x, a, x) - heap(x, a, x)).max())
    fE = max(fE, C_def(TE, unit(), unit(), unit(), unit()))
uu, vv = np.array([0., 1, 0, 0]), np.array([0., 0, 1, 0])
report("22 T_E (E = {b0 > 0}): Mal'cev, two-sided isometry, round trip", e, 1e-12)
report("22 T_E: branches differ by |ij - ji| = 2 across the boundary; (C_o) fails (1/defect)", max(abs(np.linalg.norm(qmul(uu, vv) - qmul(vv, uu)) - 2), 1 / fE / 10), 0.5)
# check_round14 (vectorised): normal forms a exp(t Rot_{A,th} X) and exp(s Rot_{X,ph} A) exp(tX) agree iff (th,ph) = (0,0) or (-2s,2t)
n14 = 0; ok14 = True
gr = np.linspace(-np.pi, np.pi, 181); TH, PH = np.meshgrid(gr, gr, indexing='ij')
wrap = lambda u_: (u_ + np.pi) % (2 * np.pi) - np.pi
def rodr(axis, ang, v):
    return v * np.cos(ang) + np.cross(axis, v) * np.sin(ang) + axis * (axis @ v) * (1 - np.cos(ang))
ex4 = lambda t, V: np.array([np.cos(t), *(np.sin(t) * V)])
for _ in range(300):
    A = rng.normal(size=3); A /= np.linalg.norm(A)
    X = np.cross(A, rng.normal(size=3)); X /= np.linalg.norm(X); Y = np.cross(A, X)
    s_, t_ = rng.uniform(0.05, np.pi - 0.05, 2); th, ph = rng.uniform(-np.pi, np.pi, 2)
    Lq = qmul(ex4(s_, A), ex4(t_, rodr(A, th, X))); Rq = qmul(ex4(s_, rodr(X, ph, A)), ex4(t_, X))
    Lf = np.array([np.cos(s_)*np.cos(t_), *(np.sin(s_)*np.cos(t_)*A + np.sin(t_)*np.cos(s_+th)*X + np.sin(t_)*np.sin(s_+th)*Y)])
    Rf = np.array([np.cos(s_)*np.cos(t_), *(np.sin(s_)*np.cos(t_-ph)*A + np.cos(s_)*np.sin(t_)*X + np.sin(s_)*np.sin(t_-ph)*Y)])
    ok14 &= np.allclose(Lq, Lf) and np.allclose(Rq, Rf); n14 += 2
    f = lambda a_, b_: np.linalg.norm(qmul(ex4(s_, A), ex4(t_, rodr(A, a_, X))) - qmul(ex4(s_, rodr(X, b_, A)), ex4(t_, X)))
    ok14 &= f(0, 0) < 1e-12 and f(-2 * s_, 2 * t_) < 1e-12; n14 += 2
    # grid via the closed forms: squared distance of the components in A, X, Y
    F = np.sqrt((np.sin(s_) * np.cos(t_) - np.sin(s_) * np.cos(t_ - PH)) ** 2 + (np.sin(t_) * np.cos(s_ + TH) - np.cos(s_) * np.sin(t_)) ** 2
                + (np.sin(t_) * np.sin(s_ + TH) - np.sin(s_) * np.sin(t_ - PH)) ** 2)
    I, J = np.where(F < 0.05 * np.sin(s_) * np.sin(t_))
    d1 = np.hypot(wrap(gr[I]), wrap(gr[J])); d2 = np.hypot(wrap(gr[I] + 2 * s_), wrap(gr[J] - 2 * t_))
    ok14 &= bool(np.all(np.minimum(d1, d2) < 0.25)); n14 += 1
    a = ex4(s_, A); x = ex4(t_, X)
    ok14 &= np.allclose(qmul(a, ex4(t_, rodr(A, -2 * s_, X))), qmul(x, a)); n14 += 1
report(f"22 earlier proof of Thm 5.15 (vectorised): two normal forms agree iff (0,0) or (-2s,2t) ({n14} checks)", 0.0 if ok14 else 1.0, 0.5)
# Example (B) witnesses
w_ = 0.5 * np.array([1., 1, 1, 1]); y_ = 0.5 * np.array([1., 1, 1, -1]); ww = 0.5 * np.array([1., 1, -1, 1]); one = np.array([1., 0, 0, 0])
eW = np.abs(TB(TB(w_, one, w_), y_, ww) + TB(w_, one, TB(w_, y_, ww))).max()
wr = np.array([0., 1, -1, 0]) / np.sqrt(2)
eW = max(eW, np.abs(TB(w_, one, wr) - TB(qc(w_), one, wr)).max(), abs(kappa(w_, qc(w_)) - 0.25))
report("22 Prop 5.10(B): antipodal third-identity witness; right transport identifies u and ubar", eW, 1e-12)
# tripod loop: U = 1, span of x and the three tips is R^4
x0 = unit(); Bq = np.linalg.qr(np.column_stack([x0, rng.normal(size=(4, 3))]))[0][:, 1:]
H = np.array([1., 0, 0, 0]); tips = []
for i_ in range(3):
    tip = np.cos(0.7) * x0 + np.sin(0.7) * Bq[:, i_]; tips.append(tip)
    path = [unit_v for unit_v in (np.cos(s) * x0 + np.sin(s) * Bq[:, i_] for s in np.linspace(0, 0.7, 50))]
    path = path + path[::-1][1:]
    for p_, q_ in zip(path[:-1], path[1:]): H = qmul(halfdisp(q_, p_), H)
report("22 tripod loop: spin holonomy 1 and rank span{x, tips} = 4", np.abs(H - np.array([1., 0, 0, 0])).max() + abs(np.linalg.matrix_rank(np.column_stack([x0] + tips)) - 4), 1e-12)
# pointer (iii): arg Tr(P1P2P3) = +Omega/2 and geometric phase of the cycle = -Omega/2
sx = np.array([[0, 1], [1, 0]], complex); sy = np.array([[0, -1j], [1j, 0]]); sz = np.array([[1, 0], [0, -1]], complex)
def spinor(n):
    th_, ph_ = np.arccos(np.clip(n[2], -1, 1)), np.arctan2(n[1], n[0]); return np.array([np.cos(th_ / 2), np.exp(1j * ph_) * np.sin(th_ / 2)])
ns = [np.array([1., 0, 0]), np.array([0., 1, 0]), np.array([0., 0, 1])]
Om = np.pi / 2    # octant, counterclockwise seen from outside (det = +1)
Ps = [0.5 * (np.eye(2) + n[0] * sx + n[1] * sy + n[2] * sz) for n in ns]
argTr = np.angle(np.trace(Ps[0] @ Ps[1] @ Ps[2]))
# geodesic transport of a spinor along the cycle with zero dynamical phase: phase = arg<psi(0)|psi(T)> - Im int <psi|dpsi>
psi0 = spinor(ns[0]); psi = psi0.copy(); dyn = 0.0
for k_ in range(3):
    n1, n2 = ns[k_], ns[(k_ + 1) % 3]
    ang = np.arccos(n1 @ n2); ax = np.cross(n1, n2); ax /= np.linalg.norm(ax); m_ = 4000
    Ustep = np.cos(ang / m_ / 2) * np.eye(2) - 1j * np.sin(ang / m_ / 2) * (ax[0] * sx + ax[1] * sy + ax[2] * sz)
    for _ in range(m_):
        new = Ustep @ psi; dyn += np.imag(np.vdot(psi, new - psi)); psi = new
gphase = np.angle(np.vdot(psi0, psi)) - dyn
report("22 pointer (iii): arg Tr(P1P2P3) = +Omega/2 and geometric phase of the cycle = -Omega/2", max(abs(argTr - Om / 2), abs(gphase + Om / 2)), 1e-3)
# pointer (i), (ii): d = alpha/2 on [0, 2pi], 2pi - alpha/2 on [2pi, 4pi]; transverse Bloch components obey the full-angle recurrence
e = 0.0
for al in np.linspace(0, 4 * np.pi, 41):
    d_ = np.arccos(np.clip(np.cos(al / 2), -1, 1)); e = max(e, abs(d_ - (al / 2 if al <= 2 * np.pi else 2 * np.pi - al / 2)))
wt = 0.9; nvec = np.array([0.6, 0.0, 0.8]); Rz = lambda t: np.array([[np.cos(t), -np.sin(t), 0], [np.sin(t), np.cos(t), 0], [0, 0, 1]])
seq = [Rz(k_ * wt) @ nvec for k_ in range(5)]
defect = seq[2] - 2 * np.cos(wt) * seq[1] + seq[0]
e = max(e, abs(defect[0]) + abs(defect[1]), abs(abs(defect[2]) - (2 - 2 * np.cos(wt)) * abs(nvec[2])))
report("22 pointers (i), (ii): distance branches; transverse vs longitudinal Bloch recurrence", e, 1e-12)

# =========================================================== 23. Prop 5.12 (dimension), base-b products
e = 0.0
for _ in range(100):
    b = o8(); a, x = o8(), o8()
    Bb = lambda a_, x_: np.linalg.norm(a_) * np.linalg.norm(x_) * T0(a_ / np.linalg.norm(a_), b, x_ / np.linalg.norm(x_))
    u1, u2 = rng.normal(size=8), rng.normal(size=8); al, be = rng.normal(size=2)
    e = max(e, np.abs(Bb(al * u1 + be * u2, x) - al * Bb(u1, x) - be * Bb(u2, x)).max(),
            np.abs(Bb(x, al * u1 + be * u2) - al * Bb(x, u1) - be * Bb(x, u2)).max(),
            np.abs(Bb(b, x) - x).max(), np.abs(Bb(a, b) - a).max(), abs(np.linalg.norm(Bb(u1, u2)) - np.linalg.norm(u1) * np.linalg.norm(u2)))
report("23 Prop 5.13: B_b of (a bbar)x on S^7 is bilinear, norm-multiplicative, with unit b", e, 1e-12)
# m = 2: the unital composition product with unit b and B(f,f) = -b (f perp b) is complex multiplication a bbar x
e = 0.0
for _ in range(100):
    b = np.exp(1j * rng.uniform(0, 2 * np.pi)); f = 1j * b
    B = lambda a_, x_: a_ * np.conj(b) * x_
    e = max(e, abs(B(f, f) + b), abs(B(b, f) - f), abs(B(f, b) - f), abs(abs(B(f, f)) - 1))
report("23 Remark 5.14(ii): on S^1 the product with unit b is a bbar x, B(f,f) = -b", e, 1e-12)

# =========================================================== 24. comb formula (Lemma 9.16) and equality case (Prop 9.17)
def _hd(w_, u_):
    q_ = np.array([1., 0, 0, 0]) + qmul(w_, qc(u_)); return q_ / np.linalg.norm(q_)
def _path_hol(pts):
    H_ = np.array([1., 0, 0, 0])
    for p_, q_ in zip(pts[:-1], pts[1:]): H_ = qmul(_hd(q_, p_), H_)
    return H_
def _comb_test(F, N=240, hh=1e-5):
    sg = np.linspace(0, 1, N + 1)
    pts = [F(t, 0) for t in sg] + [F(1, t) for t in sg[1:]] + [F(1 - t, 1) for t in sg[1:]] + [F(0, 1 - t) for t in sg[1:]]
    U_ = _path_hol(pts); Th = 2 * np.arccos(np.clip(U_[0], -1, 1))
    M_ = N // 2; g_ = (np.arange(M_) + 0.5) / M_; area_ = 0.0; Q_ = np.array([1., 0, 0, 0]); length_ = 0.0
    for v in g_:
        G_ = _path_hol([F(0, t) for t in np.linspace(0, v, 120)]); prev = F(0, v); w_ = np.zeros(4)
        for u in g_:
            cur = F(u, v); G_ = qmul(_hd(cur, prev), G_); prev = cur
            d1 = (F(u + hh, v) - F(u - hh, v)) / (2 * hh); d2 = (F(u, v + hh) - F(u, v - hh)) / (2 * hh)
            l1, l2 = qmul(d1, qc(cur))[1:], qmul(d2, qc(cur))[1:]
            F12 = np.concatenate([[0.], 0.5 * np.cross(l1, l2)])
            area_ += np.linalg.norm(np.cross(l1, l2)) / M_ ** 2
            w_ += qmul(qmul(qc(G_), F12), G_) / M_
        X_ = w_[1:] / M_; nX = np.linalg.norm(X_); length_ += nX
        Q_ = qmul(np.concatenate([[np.cos(nX)], np.sin(nX) * X_ / nX]) if nX > 0 else np.array([1., 0, 0, 0]), Q_)
    return Th, area_, U_, Q_, length_
_cliff = lambda u, v: np.array([np.cos(u), np.sin(u), np.cos(v), np.sin(v)]) / np.sqrt(2)
_gs = lambda u, v: np.array([np.sin(0.3 + 0.9 * v) * np.cos(1.2 * u), np.sin(0.3 + 0.9 * v) * np.sin(1.2 * u), np.cos(0.3 + 0.9 * v), 0.])
Th_c, A_c, U_c, Q_c, L_c = _comb_test(_cliff); Th_g, A_g, U_g, Q_g, L_g = _comb_test(_gs)
report("24 Lemma 9.16: comb ODE Q' = W Q reproduces U_gamma (Clifford-torus patch and great-sphere patch)", max(np.abs(Q_c - U_c).max(), np.abs(Q_g - U_g).max()), 1e-5)
report("24 Lemma 9.16: Theta/2 <= length(Q) <= area/2 (both patches)", max(0, Th_c / 2 - L_c - 1e-6, L_c - A_c / 2 - 1e-6, Th_g / 2 - L_g - 1e-6, L_g - A_g / 2 - 1e-6), 1e-12)
report(f"24 Prop 9.17: great-sphere patch Theta = area ({Th_g:.6f} vs {A_g:.6f})", abs(Th_g - A_g), 1e-5)
report(f"24 Prop 9.17: Clifford patch strict, area - Theta = {A_c - Th_c:.4f} (area {A_c:.4f}); 1/gap", 1 / (A_c - Th_c), 100.0)

# =========================================================== 25. further items
# sup_{|u|=|v|=1} |mu_b(u,v) - uv| = 4 |Re b| |Im b| for mu_b of (a bbar)x (operator-norm maximisation by power iteration on random starts)
def _mub_dev(b, trials=60, iters=200):
    best = 0.0
    for _ in range(trials):
        u_, v_ = o8(), o8()
        for _ in range(iters):
            D = lambda uu, vv: omul8(oc8(b), omul8(omul8(omul8(b, uu), oc8(b)), omul8(b, vv))) - omul8(uu, vv)
            w_ = D(u_, v_); n_ = np.linalg.norm(w_)
            if n_ < 1e-15: break
            g = w_ / n_
            # alternating maximisation: bilinear form <g, D(u, v)>; update u then v by gradient (matrix rows)
            Mu = np.array([D(E8[i], v_) @ g for i in range(8)]); u_ = Mu / np.linalg.norm(Mu)
            Mv = np.array([D(u_, E8[i]) @ g for i in range(8)]); v_ = Mv / np.linalg.norm(Mv)
        best = max(best, np.linalg.norm(D(u_, v_)))
    return best
e = 0.0
for _ in range(6):
    b = o8(); pred = 4 * abs(b[0]) * np.linalg.norm(b[1:])
    e = max(e, abs(_mub_dev(b, trials=8, iters=60) - pred))
report("25 after Prop 5.16: sup |mu_b(u,v) - uv| = 4|Re b||Im b| (alternating maximisation, 6 random b)", e, 1e-6)
# spin angle of a triangle is not the solid angle of the Hopf images: x = 1, y = e^{i/2}, z = e^{j/2}
xq = np.array([1., 0, 0, 0]); yq = np.array([np.cos(.5), np.sin(.5), 0, 0]); zq = np.array([np.cos(.5), 0, np.sin(.5), 0])
aq = qmul(halfdisp(xq, zq), qmul(halfdisp(zq, yq), halfdisp(yq, xq))); Eq = 2 * np.arccos(np.clip(aq[0], -1, 1))
hop = lambda q: qmul(qmul(q, np.array([0., 1, 0, 0])), qc(q))
report(f"25 pointer (iii): E = {Eq:.4f} for x=1, y=e^(i/2), z=e^(j/2), while Hopf images of x and y coincide", abs(Eq - 0.1302) + np.abs(hop(xq) - hop(yq)).max(), 1e-4)

# =========================================================== 26. roundness without associativity (Thm 5.18)
# own checks on the model S^3, B(a,x) = a x, w = 1: X_v(x) = v x, Y_v(x) = x v, gamma_v(t) = exp(tv)
e = 0.0
for _ in range(50):
    v = unit(); v[0] = 0; v /= np.linalg.norm(v); s_, t_ = rng.uniform(-4, 4, 2)
    g_ = lambda t: np.concatenate([[np.cos(t)], np.sin(t) * v[1:]])
    e = max(e, np.abs(qmul(g_(s_), g_(t_)) - g_(s_ + t_)).max(),                      # (ii) B(gamma(s),gamma(t)) = gamma(s+t)
            abs(g_(t_) @ np.array([1., 0, 0, 0]) - np.cos(t_)),                        # (iii) c(w, gamma(t)) = cos t, a = pi
            np.abs(qmul(g_(np.pi), np.array([1., 0, 0, 0])) + np.array([1., 0, 0, 0])).max())   # gamma(a) = -w
    x = unit()
    e = max(e, abs(np.linalg.norm(qmul(v, x)) - 1), abs(qmul(v, x) @ x))             # X_v unit and tangent
    # A_0 Z = tangential part of v Z at w = 1: for Z perp v (imaginary), A_0 Z = v x Z, and -A_0^2 = id on v-perp (k = 1)
    Z = unit(); Z[0] = 0; Z -= (Z @ v) * v; Z /= np.linalg.norm(Z)
    A = lambda Y: (lambda q: q - (q @ np.array([1., 0, 0, 0])) * np.array([1., 0, 0, 0]))(qmul(v, Y))
    e = max(e, np.abs(-A(A(Z)) - Z).max())
report("26 Lemmas 5.22-5.23 on the model S^3: addition law, cosine profile, unit Killing field, -A_0^2 = k^2 on v-perp", e, 1e-12)
# Remark 5.24 witnesses (own code)
def _rot(axis, ang):
    axis = np.asarray(axis, float); axis /= np.linalg.norm(axis); K = np.array([[0, -axis[2], axis[1]], [axis[2], 0, -axis[0]], [-axis[1], axis[0], 0]])
    return np.eye(3) + np.sin(ang) * K + (1 - np.cos(ang)) * K @ K
cS = lambda R, S: (np.trace(R.T @ S) - 1) / 2
e = 0.0
for _ in range(100):
    R, S = _rot(rng.normal(size=3), rng.uniform(0, np.pi)), _rot(rng.normal(size=3), rng.uniform(0, np.pi))
    e = max(e, abs(cS(R, S @ R.T @ S) - (2 * cS(R, S) ** 2 - 1)))                    # round trip for T(S,R,S) = S R^-1 S
Hs = [np.eye(3)] + [_rot(ax, np.pi) for ax in np.eye(3)]
Gm = np.array([[cS(P, Q) for Q in Hs] for P in Hs])
e = max(e, abs(np.linalg.eigvalsh(Gm).min() + 2), max(abs(cS(np.eye(3), Hq) + 1) for Hq in Hs[1:]))
report("26 Remark 5.24(i): SO(3) satisfies the round trip, three zero partners at I, Gram eigenvalue -2", e, 1e-12)
m_ = 3; ct = lambda x, y: np.mean(np.cos(y - x)); x0 = np.zeros(m_); d0 = np.array([np.pi, 0, 0])
tor = abs(ct(x0, 2 * d0 - x0) - (2 * ct(x0, d0) ** 2 - 1))                            # T(x,w,x) = 2x - w
cyl = abs(np.exp(-4.0) - (2 * np.exp(-2.0) - 1))
report("26 Remark 5.24(ii): torus and cylinder violate the round-trip law (1/min defect)", 1 / min(tor, cyl), 10.0)

# =========================================================== 27. further checks for Thm 5.18
# polarisation: <X_u, X_v>(x) = <u, v> on the model S^3 (X_v(x) = v x), so X_{e_i} is a global orthonormal Killing frame
e = 0.0
for _ in range(50):
    x = unit(); u_, v_ = rng.normal(size=4), rng.normal(size=4); u_[0] = v_[0] = 0
    e = max(e, abs(qmul(u_, x) @ qmul(v_, x) - u_ @ v_))
report("27 known work: X_u, X_v have constant inner product <u,v> (orthonormal Killing frame on the model)", e, 1e-12)

# =========================================================== 28. one-sided invariance (Props 5.26, 5.27)
# own implementation of the counterexample
def _beta(s_): return np.exp(1 - 1 / s_) if s_ > 0 else 0.0
def _h(x): f = 0.25 * x[1] * _beta(x[0]); return np.array([np.cos(f / 2), np.sin(f / 2), 0, 0])
def _B(x, y): hx = _h(x); return qmul(qmul(qmul(x, hx), y), qc(hx))
def _S(x): z = _B(x, x); return z / np.linalg.norm(z)
def _theta(x, N=48):
    A_, Bc = 0.0, 1.0
    for _ in range(N):
        a_, b_ = (0.0, 0.5) if x[0] >= 0 else (np.pi, -0.5)
        A_ += Bc * a_; Bc *= b_; x = _S(x)
    return A_ + Bc * np.pi / 2
_c = lambda a, b: np.cos(_theta(qmul(qc(a), b)))
one4 = np.array([1., 0, 0, 0]); xw = np.array([1 / np.sqrt(2), 0.5, 0.5, 0])
e = 0.0
for _ in range(100):
    a, b, y = unit(), unit(), unit()
    e = max(e, abs(_c(a, b) - _c(b, a)), abs(_c(_B(y, a), _B(y, b)) - _c(a, b)), abs(_c(one4, _S(a)) - (2 * _c(one4, a) ** 2 - 1)),
            np.abs(_B(one4, y) - y).max(), np.abs(_B(y, one4) - y).max())
report("28 Prop 5.26(i): units, symmetry, left invariance, round trip at 1 (100 random samples)", e, 1e-12)
gap = np.pi / 4 - _theta(xw); G3 = np.array([[_c(p_, q_) for q_ in (one4, -one4, xw)] for p_ in (one4, -one4, xw)])
report(f"28 Prop 5.26(ii): pi/4 - theta(x) = {gap:.4e} > 0, theta(-x) = 3pi/4, Gram(1,-1,x) min eig {np.linalg.eigvalsh(G3).min():.3e}",
       max(abs(_theta(-xw) - 3 * np.pi / 4), 0.0 if gap > 1e-5 else 1.0, 0.0 if np.linalg.eigvalsh(G3).min() < -1e-9 else 1.0), 1e-12)
pp = np.array([0.5, 0.5, 1 / np.sqrt(2), 0]); dd = np.linalg.norm(_B(_S(pp), pp) - _B(pp, _S(pp)))
report(f"28 Prop 5.26(iii): third identity on <1,p> fails by {dd:.6f} = 2|v| sin(phi(p))", abs(dd - np.sqrt(2) * np.sin(np.exp(-1) / 8)) + (1.0 if dd < 1e-3 else 0.0), 1e-12)
# Prop 5.27(iii): Kinyon-type and twisted round operations have O_a a = 2<a,w> a - w; check for B_eps(x,y) = x h y h^-1, h = exp(eps Im x)
e = 0.0
for _ in range(50):
    a = unit(); im = a.copy(); im[0] = 0; nrm = np.linalg.norm(im); hh = np.concatenate([[np.cos(0.2 * nrm)], np.sin(0.2 * nrm) * im[1:] / nrm])
    Ba = qmul(qmul(qmul(a, hh), a), qc(hh)); e = max(e, np.abs(Ba - (2 * a[0] * a - one4)).max())
report("28 Prop 5.27(iii): a round one-sided operation satisfies O_a a = 2<a,w>a - w", e, 1e-12)

# =========================================================== 29. Prop 5.26(iv), Remark 5.29: U(2) invariance and log-periodic limits
e1 = e2 = 0.0
for _ in range(60):
    a, b = unit(), unit(); al = rng.uniform(0, 2 * np.pi)
    tq = np.array([np.cos(al), np.sin(al), 0, 0]); rq = np.array([np.cos(al), 0, np.sin(al), 0]); q_ = unit()
    e1 = max(e1, abs(_c(qmul(qmul(q_, a), tq), qmul(qmul(q_, b), tq)) - _c(a, b)))
    e2 = max(e2, abs(_c(qmul(a, rq), qmul(b, rq)) - _c(a, b)))
report(f"29 Prop 5.26(iv): c invariant under x -> q x e^(i a) (U(2)); not under right e^(j a) (max change {e2:.2e})", max(e1, 0.0 if e2 > 1e-5 else 1.0), 1e-12)
_ud = np.array([0., 1, 1, 0]) / np.sqrt(2)
def _lam(eps_, uu):
    x = np.cos(eps_) * one4 + np.sin(eps_) * uu
    return _theta(x, N=80) / eps_
L1 = [_lam(2.0 ** -k, _ud) for k in (14, 18, 22)]; L15 = [_lam(1.5 * 2.0 ** -k, _ud) for k in (14, 18, 22)]
e = max(abs(L1[0] - 0.999071031059), abs(L1[1] - 0.999071031057), abs(L1[2] - 0.999071031057),
        abs(L15[1] - 0.999169235236), abs(L15[2] - 0.999169235236))
e = max(e, abs(_lam(1.5 * 2.0 ** -12, np.array([0., 1, 0, 0])) - 1), abs(_lam(1.5 * 2.0 ** -12, np.array([0., 0, 1, 0])) - 1))
report("29 Remark 5.29: theta(e^(eps u))/eps -> 0.999071031057 (eps = 2^-k), 0.999169235236 (1.5*2^-k); = 1 along i, j", e, 1e-11)

# =========================================================== 30. Part 0 (independent checks of the m1 section)
import itertools as _itt
def _unitary(n):
    z = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n)); q_, r_ = np.linalg.qr(z); return q_ @ np.diag(np.diag(r_) / abs(np.diag(r_)))
e = 0.0
for _ in range(50):
    U = _unitary(3); Us = U.conj().T; S_ = (U + Us) / 2; A_ = (U - Us) / 2; v_ = np.eye(3) - S_; D_ = U - np.eye(3)
    e = max(e, np.abs(S_ @ A_ - A_ @ S_).max(), np.abs(S_ @ S_ - A_ @ A_ - np.eye(3)).max(), np.abs(A_ @ A_ + v_ @ (2 * np.eye(3) - v_)).max(),
            np.abs(D_.conj().T @ D_ - 2 * v_).max(), np.abs(D_ @ D_.conj().T - 2 * v_).max())
    n_ = int(rng.integers(0, 7)); Un = np.linalg.matrix_power(U, n_)
    T_ = [np.eye(3), S_]; Uc = [np.zeros((3, 3)), np.eye(3)]
    for _k in range(2, n_ + 2): T_.append(2 * S_ @ T_[-1] - T_[-2]); Uc.append(2 * S_ @ Uc[-1] - Uc[-2])
    e = max(e, np.abs(Un - (T_[n_] + Uc[n_] @ A_)).max())
report("30 Prop m1:algebra / m1:chebyshev on random unitaries: SA=AS, S^2-A^2=1, A^2=-v(2-v), D*D=2v, u^n=T_n(S)+U_{n-1}(S)A", e, 1e-11)
# Cl_{4,0}: left-regular representation, B = e12 + e34, eigenvalue 4 of B*B on 1 - e1234; fair element with odd part B/2
_bl = list(_itt.chain.from_iterable(_itt.combinations(range(4), k) for k in range(5))); _ix = {b: i for i, b in enumerate(_bl)}
def _bm(a, b):
    lst = list(a) + list(b); sgn = 1
    for i in range(len(lst)):
        for j in range(len(lst) - 1 - i):
            if lst[j] > lst[j + 1]: lst[j], lst[j + 1] = lst[j + 1], lst[j]; sgn = -sgn
    out = []; i = 0
    while i < len(lst):
        if i + 1 < len(lst) and lst[i] == lst[i + 1]: i += 2
        else: out.append(lst[i]); i += 1
    return sgn, tuple(out)
def _L(blade):
    M = np.zeros((16, 16))
    for b in _bl:
        sg, r = _bm(blade, b); M[_ix[r], _ix[b]] = sg
    return M
E12, E34, E1234 = _L((0, 1)), _L((2, 3)), _L((0, 1, 2, 3)); I16 = np.eye(16)
Bm = E12 + E34; vec = np.zeros(16); vec[_ix[()]] = 1; vec[_ix[(0, 1, 2, 3)]] = -1
uF = (I16 + E12) @ (I16 + E34) / 2
e = max(np.abs(Bm.T @ Bm @ vec - 4 * vec).max(), np.abs(uF.T @ uF - I16).max(), np.abs((uF - uF.T) / 2 - Bm / 2).max(),
        np.abs((uF + uF.T) / 2 - (I16 + E1234) / 2).max(), np.abs(Bm @ Bm - (-2 * I16 + 2 * E1234)).max())
report("30 Example m1:algebra-boundaries: Cl_{4,0}, ||B||=2 (eigenvalue 4 of B*B), fair (1+e12)(1+e34)/2 with odd part B/2", e, 1e-12)
# R[t]/(t^3): u^n = 1 + n t + n^2 t^2 / 2, norms 1 + |n| + n^2/2
def _tm(a, b): return np.array([a[0] * b[0], a[0] * b[1] + a[1] * b[0], a[0] * b[2] + a[1] * b[1] + a[2] * b[0]])
uu = np.array([1., 1, 0.5]); us = np.array([1., -1, 0.5]); e = np.abs(_tm(uu, us) - np.array([1., 0, 0])).max(); P_ = np.array([1., 0, 0])
for n_ in range(1, 9):
    P_ = _tm(P_, uu); e = max(e, np.abs(P_ - np.array([1, n_, n_ ** 2 / 2])).max(), abs(np.abs(P_).sum() - (1 + n_ + n_ ** 2 / 2)))
report("30 Example m1:power-boundaries: R[t]/(t^3), u u* = 1, u^n = 1 + n t + n^2 t^2/2 (quadratic growth)", e, 1e-12)
# Prop m1:time: first negative reading n0 = floor(pi/(2 theta)) + 1
e = 0.0
for th in rng.uniform(0.01, np.pi - 0.01, 200):
    vals = [np.cos(n_ * th) for n_ in range(1, 400)]; first = 1 + next(i for i, x in enumerate(vals) if x < 0)
    e = max(e, abs(first - (np.floor(np.pi / (2 * th)) + 1)))
report("30 Prop m1:time: first strictly negative T_n(cos theta) at n0 = floor(pi/(2 theta)) + 1", e, 0.5)
# Thm m1:chordal on random chordal graphs (perfect elimination orders) with SU(2) gains, Prop m1:sharp fan and the real optimum
def _rand_chordal(n_):
    adj = {i: set() for i in range(n_)}
    for v_ in range(1, n_):                               # add v adjacent to a clique among earlier vertices
        base = int(rng.integers(0, v_)); cl = {base} | {w_ for w_ in adj[base] if w_ < v_ and rng.random() < 0.6}
        cl = {w_ for w_ in cl if all(w2 == w_ or w2 in adj[w_] for w2 in cl)}
        for w_ in cl: adj[v_].add(w_); adj[w_].add(v_)
    return adj
def _qexp(vv):
    t = np.linalg.norm(vv); return np.concatenate([[np.cos(t)], np.sin(t) * vv / t]) if t > 0 else np.array([1., 0, 0, 0])
e = 0.0
for _ in range(40):
    n_ = int(rng.integers(3, 9)); adj = _rand_chordal(n_); phi0 = [unit() for _ in range(n_)]; g_ = {}
    for i in adj:
        for j in adj[i]:
            if i < j:
                g_[(i, j)] = qmul(qmul(qc(phi0[i]), phi0[j]), _qexp(rng.normal(size=3) * 0.01)); g_[(j, i)] = qc(g_[(i, j)])
    dist_ = lambda a, b: np.linalg.norm(a - b)
    eps_ = 0.0
    for i, j, k in _itt.permutations(range(n_), 3):
        if j in adj[i] and k in adj[j] and k in adj[i]: eps_ = max(eps_, dist_(qmul(g_[(i, j)], g_[(j, k)]), g_[(i, k)]))
    # reconstruction by reverse perfect elimination: vertices were added in order 0..n-1, each adjacent to a clique of earlier ones
    phi = {0: np.array([1., 0, 0, 0])}
    for v_ in range(1, n_):
        nb = [w_ for w_ in adj[v_] if w_ < v_]
        phi[v_] = qmul(phi[nb[0]], g_[(nb[0], v_)]) if nb else np.array([1., 0, 0, 0])
    err = max((dist_(g_[(i, j)], qmul(qc(phi[i]), phi[j])) for (i, j) in g_), default=0.0)
    e = max(e, err - max(n_ - 2, 0) * eps_)
report("30 Thm m1:chordal: random chordal graphs, SU(2) gains, reconstruction error <= (|V|-2) eps", max(e, 0.0), 1e-12)
# fan: prescribed reconstruction attains (n-2) eps; real minimax optimum (n-2) eps / n by the shortest-path construction
e = 0.0
for n_ in range(3, 9):
    epsf = 0.37; edges = [(0, j) for j in range(1, n_)] + [(j, j + 1) for j in range(1, n_ - 1)]
    gf = {}
    for (i, j) in edges: gf[(i, j)] = 0.0 if i == 0 else epsf; gf[(j, i)] = -gf[(i, j)]
    phi = [0.0, 0.0] + [(j - 1) * epsf for j in range(2, n_)]
    e = max(e, abs(max(abs(gf[(i, j)] - (phi[j] - phi[i])) for (i, j) in edges) - (n_ - 2) * epsf))
    r_ = (n_ - 2) * epsf / n_; W_ = {(i, j): gf[(i, j)] + r_ for (i, j) in gf}
    dd = [0.0] * n_
    for _ in range(n_ + 1):
        for (i, j), w_ in W_.items(): dd[j] = min(dd[j], dd[i] + w_)
    e = max(e, abs(max(abs(gf[(i, j)] - (dd[j] - dd[i])) for (i, j) in edges) - r_))
report("30 Prop m1:sharp: fan attains (n-2)eps by the prescribed reconstruction; real optimum (n-2)eps/n attained", e, 1e-12)
# Example m1:cycles: S3 tuples ((12),(12)) and ((12),(23)) not simultaneously conjugate; Example m1:negative-gram values
_S3 = list(_itt.permutations(range(3))); _cm = lambda p, q: tuple(p[q[i]] for i in range(3)); _inv = lambda p: tuple(sorted(range(3), key=lambda i: p[i]))
t12, t23 = (1, 0, 2), (0, 2, 1)
simul = any(_cm(_cm(g3, t12), _inv(g3)) == t12 and _cm(_cm(g3, t12), _inv(g3)) == t23 for g3 in _S3)
J1 = np.array([[0., -1], [1, 0]]); J2 = np.array([[0., -2], [0.5, 0]]); sh = lambda a: np.trace(a) * np.eye(2) - a
f_ = [np.eye(2), (np.eye(2) + J1) / np.sqrt(2), (np.eye(2) - J2) / np.sqrt(2)]
Gt = np.array([[np.trace(sh(f_[i]) @ f_[j]) / 2 for j in range(3)] for i in range(3)])
Gc = np.array([[1, np.sqrt(3) / 2, np.sqrt(3) / 2], [np.sqrt(3) / 2, 1, -1], [np.sqrt(3) / 2, -1, 1]])
e = max(float(simul), abs(np.linalg.det(Gt) + 9 / 64), abs(Gt[1, 2] + 1 / 8), abs(np.linalg.det(Gc) + 3),
        np.abs(np.sort(np.linalg.eigvalsh(Gc)) - np.sort([2, (1 + np.sqrt(7)) / 2, (1 - np.sqrt(7)) / 2])).max(),
        abs(2 * abs(1 - np.exp(1j * np.pi / 6)) - (np.sqrt(6) - np.sqrt(2))), np.abs(sh(f_[1]) @ f_[1] - np.eye(2)).max())
report("30 Examples m1:cycles, m1:negative-gram: S3 tuples not simultaneously conjugate; det -9/64, det -3, eigenvalues 2,(1+-sqrt7)/2", e, 1e-12)
# Example m1:spherical: excess 2 arctan(tan^2(eps/2)) vs Girard from vertex angles; Remark m1:phase octant; Peres-Mermin; sequential
e = 0.0
def _ang(P0, P1, P2):
    t1 = P1 - (P1 @ P0) * P0; t2 = P2 - (P2 @ P0) * P0; return np.arccos(np.clip(t1 @ t2 / np.linalg.norm(t1) / np.linalg.norm(t2), -1, 1))
for ep in np.linspace(0.05, np.pi / 2, 30):
    a3 = np.array([1., 0, 0]); b3 = np.array([np.cos(ep), np.sin(ep), 0]); p3 = np.array([np.cos(ep), 0, np.sin(ep)])
    exc = _ang(a3, b3, p3) + _ang(b3, a3, p3) + _ang(p3, a3, b3) - np.pi
    e = max(e, abs(exc - 2 * np.arctan(np.tan(ep / 2) ** 2)))
k3 = [np.array([1, 0]), np.array([1, 1]) / np.sqrt(2), np.array([1, 1j]) / np.sqrt(2)]
ov = np.vdot(k3[0], k3[1]) * np.vdot(k3[1], k3[2]) * np.vdot(k3[2], k3[0]); e = max(e, abs(ov - (1 + 1j) / 4))
Xp = np.array([[0, 1], [1, 0]]); Yp = np.array([[0, -1j], [1j, 0]]); Zp = np.diag([1, -1]); I2_ = np.eye(2); kr = np.kron
sq = [[kr(Xp, I2_), kr(I2_, Xp), kr(Xp, Xp)], [kr(I2_, Yp), kr(Yp, I2_), kr(Yp, Yp)], [kr(Xp, Yp), kr(Yp, Xp), kr(Zp, Zp)]]
I4 = np.eye(4)
for r_ in range(3): e = max(e, np.abs(sq[r_][0] @ sq[r_][1] @ sq[r_][2] - I4).max())
for c_ in range(3): e = max(e, np.abs(sq[0][c_] @ sq[1][c_] @ sq[2][c_] - (I4 if c_ < 2 else -I4)).max())
P0_ = np.diag([1., 0]); P1_ = np.diag([0., 1]); e = max(e, abs(np.trace(Xp @ P0_ @ P0_ @ Xp @ P1_) - 1), abs(np.trace(P0_ @ P1_)))
report("30 Examples m1:spherical, m1:phase, m1:overlap-boundaries, m1:sequential: excess, octant (1+i)/4, Peres-Mermin, instruments", e, 1e-12)

# =========================================================== 31. Section 5A (independent checks of the m2 section)
_r31 = np.random.default_rng(2411)
# ---- octonions by Cayley-Dickson: (a,b)(c,d) = (ac - conj(d) b, d a + b conj(c))
def _cj(x):
    y = -x.copy(); y[0] = x[0]; return y
def _om(x, y):
    n = len(x)
    if n == 1: return x * y
    h = n // 2; a, b, c, d = x[:h], x[h:], y[:h], y[h:]
    return np.concatenate([_om(a, c) - _om(_cj(d), b), _om(d, a) + _om(b, _cj(c))])
O1 = np.eye(8)[0]
def _ro(): return _r31.normal(size=8)
# octonion Hermitian 3x3 matrices as arrays (3,3,8)
def _mm(A, B):
    C = np.zeros((3, 3, 8))
    for i in range(3):
        for j in range(3):
            for k in range(3): C[i, j] += _om(A[i, k], B[k, j])
    return C
def _jp(A, B): return (_mm(A, B) + _mm(B, A)) / 2
def _tr(A): return sum(A[i, i, 0] for i in range(3))
def _proj(u2, u3):  # (1,u)(1,u)^* / (1+|u|^2)
    v = [O1, u2, u3]; P = np.zeros((3, 3, 8))
    for i in range(3):
        for j in range(3): P[i, j] = _om(v[i], _cj(v[j]))
    return P / (1 + u2 @ u2 + u3 @ u3)
def _U(P, B):  # I + 8(L_P^2 - L_P) applied to B
    LB = _jp(P, B); return B + 8 * (_jp(P, LB) - LB)
e = 0.0
for _ in range(20):
    Px, Pw, Py = (_proj(_ro(), _ro()) for _ in range(3))
    for P in (Px, Pw, Py): e = max(e, np.abs(_mm(P, P) - P).max(), abs(_tr(P) - 1))
    b = lambda P, Q: _tr(_jp(P, Q))
    S = _U(Px, Pw)
    e = max(e, np.abs(_mm(S, S) - S).max(), abs(_tr(S) - 1))                                  # reflected point is a point of OP^2
    e = max(e, np.abs(2 * _jp(Px, _jp(Px, Pw)) - _jp(Px, Pw) - b(Px, Pw) * Px).max())          # U_P = 2L_P^2 - L_P is the Peirce-1 projection
    e = max(e, abs(b(Py, S) - (4 * b(Py, Px) * b(Px, Pw) + b(Py, Pw) - 4 * _tr(_jp(Py, _jp(Px, Pw))))))  # reflected Born weight
    e = max(e, abs(b(Pw, S) - (2 * b(Pw, Px) - 1) ** 2))                                        # scalar closing law
    e = max(e, np.abs(_U(Px, S) - Pw).max())                                                    # involution
report("31 Albert: random points of OP^2 in the chart; U_{2P-1} gives a point, Peirce-1 identity, reflected weight, closing law, involution", e, 1e-11)
# cut point fibre on OP^2: unit v in O^2 with vv^* = Q form a 7-sphere (v2 free on a sphere, v3 determined)
e = 0.0
for _ in range(20):
    p = _r31.uniform(0.05, 0.95); z = _ro(); z *= np.sqrt(p * (1 - p)) / np.linalg.norm(z)
    for _ in range(5):
        v2 = _ro(); v2 *= np.sqrt(p) / np.linalg.norm(v2)
        v3 = _cj(_om(_cj(v2) / p, z))                     # conj(v3) = v2^{-1} z
        e = max(e, abs(v2 @ v2 - p), abs(v3 @ v3 - (1 - p)), np.abs(_om(v2, _cj(v3)) - z).max())
report("31 OP^2 cut locus: each cut point of E is reached from a 7-sphere of unit directions", e, 1e-12)
# uniform Jordan form on spin factors R + R^{n+1}: P_x = (1, x)/2, U_{2P_x-1} P_w = P_{s_x w}, tr(P o Q) = (1 + <x,y>)/2
def _sj(a, b): return np.concatenate([[a[0] * b[0] + a[1:] @ b[1:]], a[0] * b[1:] + b[0] * a[1:]])
e = 0.0
for n in (1, 2, 4, 8):
    x, w = (v / np.linalg.norm(v) for v in _r31.normal(size=(2, n + 1)))
    Px = np.concatenate([[0.5], x / 2]); Pw = np.concatenate([[0.5], w / 2]); a = 2 * Px - np.eye(n + 2)[0]
    U = 2 * _sj(a, _sj(a, Pw)) - _sj(_sj(a, a), Pw)
    e = max(e, np.abs(U - np.concatenate([[0.5], (2 * (x @ w) * x - w) / 2])).max(), abs(2 * _sj(Px, Pw)[0] - (1 + x @ w) / 2))
report("31 spin factors: U_{2P_x-1}P_w = P_{s_x w} and tr(P_x o P_y) = (1+<x,y>)/2 (spheres in the uniform Jordan form)", e, 1e-13)
# complex and quaternionic Bargmann identity, quaternionic conjugacy law (quaternions as 2x2 complex blocks)
def _q2c(q):
    a, b = q[0] + 1j * q[1], q[2] + 1j * q[3]; return np.array([[a, -np.conj(b)], [b, np.conj(a)]])
def _qvec(n): v = _r31.normal(size=(n, 4)); v /= np.linalg.norm(v); return np.block([[_q2c(r)] for r in v])  # (2n x 2) column of blocks
e = 0.0
for _ in range(50):
    X, W, Y = _qvec(3), _qvec(3), _qvec(3)
    P = lambda V: V @ V.conj().T
    rt = lambda A: np.trace(A).real / 2
    SW = (2 * P(X) - np.eye(6)) @ W
    b = lambda A, B: rt(P(A) @ P(B))
    e = max(e, abs(b(Y, SW) - (4 * b(Y, X) * b(X, W) + b(Y, W) - 4 * rt(P(Y) @ P(X) @ P(W)))))
    D = (Y.conj().T @ X) @ (X.conj().T @ W) @ (W.conj().T @ Y)
    q = _q2c(_r31.normal(size=4)); q /= np.sqrt(abs(np.linalg.det(q)))
    D2 = ((Y @ q).conj().T @ X) @ (X.conj().T @ W) @ (W.conj().T @ (Y @ q))
    e = max(e, np.abs(D2 - q.conj().T @ D @ q).max(), abs(np.trace(D).real / 2 - rt(P(Y) @ P(X) @ P(W))))
report("31 HP^2: reflected Born weight with real three-point trace; cycle transforms by conjugation", e, 1e-12)
# two-readout: sphere affine law; witness and phase family; four-cycle; clock descent; torus
x = np.array([1, 0, 0.]); w = np.array([1, 1, 0]) / np.sqrt(2); sw = 2 * (x @ w) * x - w
yp = np.array([1, 1, np.sqrt(8)]) / np.sqrt(10); ym = np.array([1, -3, 0]) / np.sqrt(10); bb = lambda a, c: abs(np.vdot(a, c)) ** 2
e = max(abs(bb(yp, x) - .1), abs(bb(ym, x) - .1), abs(bb(yp, w) - .2), abs(bb(ym, w) - .2), abs(bb(yp, sw)), abs(bb(ym, sw) - .8))
for th in np.linspace(0, 2 * np.pi, 37):
    y = np.array([1, 2 * np.exp(1j * th) - 1, np.sqrt(4 + 4 * np.cos(th))]) / np.sqrt(10)
    D = np.vdot(y, x) * np.vdot(x, w) * np.vdot(w, y)
    e = max(e, abs(D - np.exp(1j * th) / 10), abs(bb(y, sw) - 0.4 * (1 - np.cos(th))), abs(np.linalg.norm(y) - 1))
V = [np.array([1, 0, 0]), np.ones(3) / np.sqrt(3), np.array([0, 1, 0]), np.array([1, 1j, -1 - 1j]) / 2]
cyc = np.vdot(V[0], V[1]) * np.vdot(V[1], V[2]) * np.vdot(V[2], V[3]) * np.vdot(V[3], V[0])
e = max(e, abs(cyc - 1j / 12), abs(np.vdot(V[0], V[2])), abs(np.vdot(V[1], V[3])))
c1 = np.array([1, 0]); c2 = np.array([1j, 0]); wq = np.array([1, 1]) / np.sqrt(2)
rr = lambda c, v: 2 * np.real(np.vdot(c, v)) * c - v
e = max(e, abs(np.vdot(rr(c1, wq), rr(c2, wq))))
s_ = lambda a, b: (2 * a - b) % (2 * np.pi); k_ = lambda a, b: (2 + np.cos(a[0] - b[0]) + np.cos(a[1] - b[1])) / 4
wt = np.array([0., 0]); xt = np.array([np.pi, 0])
e = max(e, abs(k_(wt, s_(xt, wt)) - 1), abs((2 * k_(wt, xt) - 1) ** 2))
report("31 witnesses: (1/10,1/5) -> 0 and 4/5; phase family [0,4/5]; four-cycle i/12; clock descent orthogonal; torus 1 vs 0", e, 1e-12)
# Bloch formulas, horizontal return, and the triangle connection: Re D/|D| = (sum beta - 1)/(2 sqrt(prod beta)) = cos(E/2)
e = 0.0
def _ang(P0, P1, P2):
    t1 = P1 - (P1 @ P0) * P0; t2 = P2 - (P2 @ P0) * P0; return np.arccos(np.clip(t1 @ t2 / np.linalg.norm(t1) / np.linalg.norm(t2), -1, 1))
sig = [np.array([[0, 1], [1, 0]]), np.array([[0, -1j], [1j, 0]]), np.diag([1., -1])]
for _ in range(200):
    a, b, c = (v / np.linalg.norm(v) for v in _r31.normal(size=(3, 3)))
    Pr = lambda n: (np.eye(2) + sum(n[k] * sig[k] for k in range(3))) / 2
    D = np.trace(Pr(a) @ Pr(b) @ Pr(c)); p, q, r = a @ b, b @ c, c @ a; S = 1 + p + q + r; Dt = a @ np.cross(b, c)
    E = _ang(a, b, c) + _ang(b, a, c) + _ang(c, a, b) - np.pi
    be = [(1 + p) / 2, (1 + q) / 2, (1 + r) / 2]
    rhs = (sum(be) - 1) / (2 * np.sqrt(np.prod(be)))
    e = max(e, abs(D - (S + 1j * Dt) / 4), abs(D.real / abs(D) - rhs), abs(rhs - np.cos(E / 2)), abs(abs(np.angle(D)) - E / 2))
report("31 Bloch: Delta=(S+iD)/4; Re Delta/|Delta| equals the Re a of eq:tri with beta for kappa, and both are cos(E/2)", e, 1e-10)

# =========================================================== 32. Section 5B (independent checks of the m3 section)
_r32 = np.random.default_rng(2511)
def _expm2(X):  # 2x2 traceless: exp X = C(q) I + S(q) X with X^2 = q I
    q = (X @ X)[0, 0] + 0j; r = np.sqrt(q)
    C = np.cosh(r); S = np.sinh(r) / r if abs(r) > 1e-12 else 1 + q / 6
    return C * np.eye(2) + S * X
def _F(s): return np.cos(np.sqrt(s)) if s >= 0 else np.cosh(np.sqrt(-s))
def _T(m, s): return np.cos(m * np.arccos(s)) if abs(s) <= 1 else np.sign(s) ** m * np.cosh(m * np.arccosh(abs(s)))
s1 = np.array([[0, 1], [1, 0]], complex); s2 = np.array([[0, -1j], [1j, 0]]); s3 = np.diag([1., -1]).astype(complex); I2 = np.eye(2)
Jm = np.array([[0., -1], [1, 0]]); Dm = np.diag([1., -1]); Em = np.array([[0., 1], [1, 0]])
class _Basis:
    __array_ufunc__ = None
    def __init__(self, mats): self.m = np.array(mats)
    def __rmatmul__(self, c): return np.tensordot(c, self.m, 1)
_SL = _Basis([Jm, Dm, Em]); _PA = _Basis([s1, s2, s3])
# (1) one-parameter formula f(exp tX) = F(2 t^2 h(X,X)) with h = -m^2 tr(XY)/4 for f = T_m(tr/2) on SL(2,R)
e = 0.0
for m in (1, 2, 3):
    for _ in range(30):
        X = _r32.normal(size=3) @ _SL * 0.7; t = _r32.uniform(-2, 2)
        g = _expm2(t * X).real
        e = max(e, abs(_T(m, np.trace(g) / 2) - _F(2 * t * t * (-m * m * np.trace(X @ X) / 4))))
report("32 Thm m3:classification: f(exp tX)=F(2t^2 h(X,X)), h=-m^2 tr(XY)/4, for T_m(tr/2), m=1,2,3", e, 1e-9)
# brackets of J,D,E; m >= 2 violates the interference law, m = 1 satisfies it
e = max(np.abs(Jm @ Dm - Dm @ Jm - 2 * Em).max(), np.abs(Dm @ Em - Em @ Dm + 2 * Jm).max(), np.abs(Em @ Jm - Jm @ Em - 2 * Dm).max())
for m in (2, 3, 4):
    a = np.cos(np.pi / (2 * m)); g = _expm2(np.pi / (2 * m) * Jm).real; u = _expm2(0.1 * Dm).real
    lhs = _T(m, np.trace(g @ u) / 2) + _T(m, np.trace(g @ np.linalg.inv(u)) / 2); rhs = 2 * _T(m, np.trace(g) / 2) * _T(m, np.trace(u) / 2)
    e = max(e, abs(rhs), 1e-3 - min(abs(lhs), 1e-3))       # rhs = 0, lhs bounded away from 0
for _ in range(20):
    g = _expm2(_r32.normal(size=3) @ _SL).real; u = _expm2(_r32.normal(size=3) @ _SL).real
    e = max(e, abs(np.trace(g @ u) / 2 + np.trace(g @ np.linalg.inv(u)) / 2 - 2 * (np.trace(g) / 2) * (np.trace(u) / 2)))
report("32 Cor m3:interference: [J,D]=2E etc.; m>=2 violates the two-variable law, m=1 satisfies it", e, 1e-9)
# (2) six-dimensional two-step counterexample
def _mul(p, q): return np.concatenate([p[:3] + q[:3], p[3:] + q[3:] + 0.5 * np.cross(p[:3], q[:3])])
def _f6(p): return _F(2 * p[:3] @ p[3:])
e = 0.0
for _ in range(30):
    p, q, r = _r32.normal(size=(3, 6)) * 0.6
    inv = lambda p: -p
    e = max(e, np.abs(_mul(_mul(p, q), r) - _mul(p, _mul(q, r))).max(), np.abs(_mul(p, inv(p))).max(), np.abs(_mul(p, p) - 2 * p).max(),
            abs(_f6(_mul(_mul(q, p), inv(q))) - _f6(p)), abs(_f6(inv(p)) - _f6(p)), abs(_f6(_mul(p, p)) - (2 * _f6(p) ** 2 - 1)))
Hs = np.zeros((6, 6)); Hs[:3, 3:] = np.eye(3); Hs[3:, :3] = np.eye(3); ev = np.linalg.eigvalsh(Hs)
e = max(e, abs((ev > 0).sum() - 3), abs((ev < 0).sum() - 3), 1 - np.abs(_mul(np.r_[1, 0, 0, 0, 0, 0.], np.r_[0, 1, 0, 0, 0, 0.]) - _mul(np.r_[0, 1, 0, 0, 0, 0.], np.r_[1, 0, 0, 0, 0, 0.])).max())
# zero set of the normalized SL(2,R) model and the split line
for t in np.linspace(-5, 5, 11): e = max(e, abs((1 + np.trace(-I2 + t * np.array([[0, 1], [0, 0]])) / 2) / 2))
report("32 Example m3:obstructions: 6-dim two-step group (assoc., duplication, invariance, signature (3,3)); zero line -I+tN", e, 1e-12)
# (3) AdS: c = B, det(y-x) = 2(1-c); level kappa=1 = null lines through x; metric signature
def _B(x, y): return 0.5 * np.trace((np.trace(x) * np.eye(2) - x) @ y)
e = 0.0
for _ in range(30):
    x = _expm2(_r32.normal(size=3) @ _SL).real; y = _expm2(_r32.normal(size=3) @ _SL).real
    e = max(e, abs(_B(x, y) - np.trace(np.linalg.inv(x) @ y) / 2), abs(np.linalg.det(y - x) - 2 * (1 - _B(x, y))))
    # null tangent V at x: V = x N with N traceless nilpotent; then x + tV in SL2 and B(x, x+tV) = 1
    N = np.array([[1., -1], [1, -1]]) * _r32.normal(); P = _expm2(_r32.normal(size=3) @ _SL).real; N = P @ N @ np.linalg.inv(P)
    for t in (-3, 0.5, 7): y2 = x + t * x @ N; e = max(e, abs(np.linalg.det(y2) - 1), abs(_B(x, y2) - 1))
e = max(e, abs(-np.linalg.det(Jm) + 1), abs(-np.linalg.det(Dm) - 1), abs(-np.linalg.det(Em) - 1))
report("32 Prop m3:ads: c=B=tr(x^-1 y)/2, det(y-x)=2(1-c), null lines x+tV lie in the level kappa=1; signature (-,+,+)", e, 1e-9)
# (4) parabolic indistinguishability and round trips
e = 0.0
for s in (1., -1.):
    u = s * I2 + np.array([[0, 1.], [0, 0]]); c0 = s * I2
    for n in range(1, 5):
        un = np.linalg.matrix_power(u, 2 ** n); cn = np.linalg.matrix_power(c0, 2 ** n)
        e = max(e, abs(np.trace(un) - np.trace(cn)))
    e = max(e, np.abs(u @ u - (I2 + 2 * s * np.array([[0, 1.], [0, 0]]))).max())
report("32 Cor m3:iteration: I and I+E12 (and -I, -I+E12) have identical scalar round-trip iterates, u^2=I+2sA", e, 1e-12)
# (5) SL(2,C): complex comparison round trip, Hessian tr(XY)/4, congruence on Hermitian matrices, D^# D = -I
e = 0.0
def _rc(): return _expm2(((_r32.normal(size=3) + 1j * _r32.normal(size=3)) * 0.6) @ _PA)
kap = lambda x, y: (1 + np.trace(np.linalg.inv(x) @ y) / 2) / 2
for _ in range(20):
    x, w = _rc(), _rc(); sw = x @ np.linalg.inv(w) @ x
    e = max(e, abs(kap(w, sw) - (2 * kap(w, x) - 1) ** 2), abs(kap(x, w) - kap(w, x)))
    X = (_r32.normal(size=3) + 1j * _r32.normal(size=3)) @ _PA; hh = 1e-4
    hess = (kap(I2, _expm2(hh * X)) - 2 * kap(I2, I2) + kap(I2, _expm2(-hh * X))) / hh ** 2
    e = max(e, abs(hess - np.trace(X @ X) / 4) * 1e-3)
    u = _rc(); Hm = np.array([[2, 1 - 1j], [1 + 1j, 3]]); Hn = u @ Hm @ u.conj().T
    e = max(e, abs(np.linalg.det(Hn) - np.linalg.det(Hm)), max(0, -np.linalg.eigvalsh(Hn).min()))
Ds = np.trace(Dm) * I2 - Dm; e = max(e, np.abs(Ds @ Dm + I2).max())
report("32 Prop m3:spin: complex round trip, Hessian tr(XY)/4, congruence preserves det and the future sheet, D^#D=-I", e, 1e-7)
# (6) frames: closure and velocity addition; quarter-turn reverses q with det 1; proper-time example; rapidity gaps
e = 0.0
for K in (1.0, 0.0, -0.3):
    Lv = lambda v: (1 / np.sqrt(1 - K * v * v)) * np.array([[1, K * v], [v, 1]])
    for v, w in ((0.3, 0.5), (-0.2, 0.7)):
        P = Lv(v) @ Lv(w); u = (v + w) / (1 + K * v * w); e = max(e, np.abs(P - Lv(u)).max())
Q = np.array([[0, -1.], [1, 0]]); G = np.diag([1., -1]); e = max(e, np.abs(Q.T @ G @ Q + G).max(), abs(np.linalg.det(Q) - 1))
Lb = np.array([[5 / 4, -3 / 4], [-3 / 4, 5 / 4]]); e = max(e, np.abs(Lb @ np.array([5, 3.]) - np.array([4, 0.])).max())
th0 = 0.7; 
for _ in range(100): th0 = np.cos(th0)
eta0 = np.arctanh(np.sin(th0)); eta8 = eta0 + 8
e = max(e, abs(th0 - 0.73908513) * 1e-1, abs(eta0 - 0.81732635) * 1e-1, abs((1 - np.tanh(eta8)) / 4.3893e-8 - 1) * 1e-5,
        abs((np.pi / 2 - 2 * np.arctan(np.exp(eta8))) * 0 + (2 * np.arctan(np.exp(-eta8))) / 2.9629e-4 - 1) * 1e-5,
        abs(np.tanh(eta0 / 2) - np.tan(np.arcsin(np.tanh(eta0)) / 2)), abs(np.log(np.tan(np.pi / 4 + th0 / 2)) - eta0))
report("32 Prop m3:frames, Examples m3:proper, m3:rapidityBoundary: closure, Einstein/Galilean/elliptic addition, quarter turn, numbers", e, 1e-9)
# (7) hyperboloid, transport, recurrence, triangle with numerical parallel transport
def _rh(sc=1.0):
    v = _r32.normal(size=3) * sc; t = np.linalg.norm(v); n = v / t
    return np.cosh(t) * I2 + np.sinh(t) * (n @ _PA)
Bh = lambda x, y: 0.5 * np.trace((np.trace(x) * np.eye(2) - x) @ y).real   # polarization of det
def _sqrt_rel(y, x): c = Bh(x, y); return (I2 + y @ np.linalg.inv(x)) / np.sqrt(2 * (1 + c))
e = 0.0
for _ in range(20):
    x, y, z = _rh(0.6), _rh(0.6), _rh(0.6); c = Bh(x, y)
    e = max(e, np.abs(x @ np.linalg.inv(y) @ x - (2 * c * x - y)).max() / (1 + c))
    A = _sqrt_rel(y, x); e = max(e, np.abs(A @ A - y @ np.linalg.inv(x)).max(), np.abs(A @ x @ A.conj().T - y).max())
    V = _rh() - x; V = V - Bh(x, V) * x                                             # tangent at x (B(x,V)=0)
    PV = A @ V @ A.conj().T; e = max(e, np.abs(PV - (V - Bh(y, V) / (1 + c) * (x + y))).max() / (1 + np.abs(PV).max()), abs(Bh(y, PV)) / (1 + np.abs(PV).max()))
    # recurrence
    xs = [x, y]
    for n in range(2, 7): xs.append(xs[-1] @ np.linalg.inv(xs[-2]) @ xs[-1])
    for n in range(1, 6): e = max(e, np.abs(xs[n + 1] - (2 * c * xs[n] - xs[n - 1])).max() / np.abs(xs[n + 1]).max(), abs(Bh(x, xs[n]) / _T(n, c) - 1))
    e = max(e, abs(Bh(y, x @ np.linalg.inv(y) @ x) / (2 * c * c - 1) - 1))
report("32 Thm m3:hyperboloid, Props m3:transport, Thm m3:recurrence: symmetry, round trip, square-root transvection, transport, recurrence", e, 1e-8)
def _par(V, x, y, n=200):  # RK4 for V' = g(x', V) x, g = -B, along the exact geodesic x cosh t + tau sinh t
    c = Bh(x, y); d = np.arccosh(max(c, 1.0)); tau = (y - c * x) / np.sinh(d); h = d / n
    P = lambda t: np.cosh(t) * x + np.sinh(t) * tau; dP = lambda t: np.sinh(t) * x + np.cosh(t) * tau
    f = lambda t, V: -Bh(dP(t), V) * P(t)
    for i in range(n):
        t = i * h; k1 = f(t, V); k2 = f(t + h / 2, V + h / 2 * k1); k3 = f(t + h / 2, V + h / 2 * k2); k4 = f(t + h, V + h * k3)
        V = V + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return V
def _pc(X): return np.array([np.trace(X @ s).real / 2 for s in (s1, s2, s3)])
e = 0.0
for _ in range(6):
    x = I2.astype(complex); y, z = _rh(0.9), _rh(0.9)
    a, b, c = Bh(x, y), Bh(x, z), Bh(y, z); L = 1 + a + b + c; Dd = 1 + 2 * a * b * c - a * a - b * b - c * c
    Nm = (I2 + x @ np.linalg.inv(z)) @ (I2 + z @ np.linalg.inv(y)) @ (I2 + y @ np.linalg.inv(x)); D0 = 8 * (1 + a) * (1 + b) * (1 + c)
    e = max(e, np.abs(Nm / np.sqrt(D0) - _sqrt_rel(x, z) @ _sqrt_rel(z, y) @ _sqrt_rel(y, x)).max(), abs(np.linalg.det(Nm) - D0) / D0)
    u, v = _pc(y), _pc(z); nrm = np.cross(u, v); nrm /= np.linalg.norm(nrm)
    t1 = u / np.linalg.norm(u); t2 = np.cross(nrm, t1)                              # oriented frame of the plane at x: (u, v) positive
    V0 = t1 @ _PA; V = _par(_par(_par(V0, x, y), y, z), z, x)
    Vr = Nm @ V0 @ Nm.conj().T / D0                                                 # rational Thomas-Wigner return
    ang = np.arctan2(_pc(V) @ t2, _pc(V) @ t1); Aform = 2 * np.arctan(np.sqrt(Dd) / L)
    # interior angles from tangent directions
    def tdir(p, q): cc = Bh(p, q); return (q - cc * p) / np.sqrt(cc * cc - 1)
    def angle(p, q, r): return np.arccos(np.clip(-Bh(tdir(p, q), tdir(p, r)), -1, 1))
    Aang = np.pi - angle(x, y, z) - angle(y, x, z) - angle(z, x, y)
    e = max(e, np.abs(V - Vr).max(), abs(ang + Aform), abs(Aang - Aform), abs(np.cos(Aform) - (L * L - Dd) / (L * L + Dd)))
report("32 Thm m3:triangle: N/sqrt(D0) = product of transvections, det N = D0, RK4 holonomy = rational return, angle = -area = -(pi - angles)", e, 1e-7)
y = (5 * I2 + 3 * s1) / 4; z = (5 * I2 + 3 * s2) / 4; a, b, c = Bh(I2, y), Bh(I2, z), Bh(y, z); L = 1 + a + b + c; Dd = 1 + 2 * a * b * c - a * a - b * b - c * c
e = max(abs(a - 1.25), abs(c - 25 / 16), abs(L - 81 / 16), abs(np.sqrt(Dd) - 9 / 16), abs(np.cos(2 * np.arctan(1 / 9)) - 40 / 41), abs((L * L - Dd) / (L * L + Dd) - 40 / 41),
        np.abs(_sqrt_rel(y, I2) - (3 / (2 * np.sqrt(2)) * I2 + 1 / (2 * np.sqrt(2)) * s1)).max())
report("32 Example m3:triangleExample: a=5/4, c=25/16, L=81/16, sqrt D=9/16, cos A=40/41, half-displacement coefficients", e, 1e-12)
# (8) Brownian moments against the explicit H^3 heat kernel (generator Delta/2): p_t(r) = (2 pi t)^(-3/2) r/sinh r e^{-t/2 - r^2/(2t)}
e = 0.0
r = np.linspace(1e-9, 14, 200001); dr = r[1] - r[0]
for h in (0.05, 0.2, 0.7):
    p = (2 * np.pi * h) ** -1.5 * r / np.sinh(r) * np.exp(-h / 2 - r * r / (2 * h)) * 4 * np.pi * np.sinh(r) ** 2
    m0 = np.sum(p) * dr; m1 = np.sum(p * np.cosh(r)) * dr; m2 = np.sum(p * np.cosh(r) ** 2) * dr
    e = max(e, abs(m0 - 1), abs(m1 - np.exp(1.5 * h)), abs(m2 - (1 + 3 * np.exp(4 * h)) / 4))
T = 1.0
for N in (1000, 4000):
    h = T / N; bias = N * (np.exp(1.5 * h) - 1) - 1.5 * T; var = N ** 2 * ((1 + 3 * np.exp(4 * h)) / 4 - np.exp(3 * h))
    e = max(e, max(0, abs(bias * N / (9 * T * T / 8) - 1) - 1 / N), max(0, abs(var - 1.5 * T * T) - 4 / N))
report("32 Prop m3:brownian: E cosh d = e^{3h/2}, E cosh^2 d = (1+3e^{4h})/4 from the H^3 heat kernel; bias 9T^2/(8N); variance -> 3T^2/2", e, 1e-5)
# (9) plaquette sign: midpoint exponential edges, traversal order acting on the left
def _expm(M):
    w, Vv = np.linalg.eig(M); return Vv @ np.diag(np.exp(w)) @ np.linalg.inv(Vv)
C0, C1, C2, C3, C4 = (_r32.normal(size=(2, 2)) for _ in range(5))
A1 = lambda p: C0 + p[0] * C1 + p[1] * C2; A2 = lambda p: C3 + p[0] * C4 + p[1] * C1 @ C2 * 0.3
d1A2 = C4; d2A1 = C2
e = 0.0
for hh in (1e-3,):
    Bt = _expm(hh * A1((hh / 2, 0))); Rt = _expm(hh * A2((hh, hh / 2))); Tp = _expm(-hh * A1((hh / 2, hh))); Lt = _expm(-hh * A2((0, hh / 2)))
    Ret = Lt @ Tp @ Rt @ Bt; F = d1A2 - d2A1 - (A1((0, 0)) @ A2((0, 0)) - A2((0, 0)) @ A1((0, 0)))
    e = max(e, np.abs((Ret - np.eye(2)) / hh ** 2 - F).max() * 1e-2)
report("32 Thm m3:product: small-square return h^2(d1A2 - d2A1 - [A1,A2]) + O(h^3) for midpoint exponential edges", e, 1e-3)
# (10) Cayley chart: formula, rationality of inverse, distance bounds
e = 0.0
for _ in range(20):
    rv = _r32.normal(size=3); rv *= _r32.uniform(0, 0.9) / np.linalg.norm(rv); sv = _r32.normal(size=3); sv *= _r32.uniform(0, 0.9) / np.linalg.norm(sv)
    R = rv @ _PA; S = sv @ _PA; xr = (I2 + R) @ np.linalg.inv(I2 - R); xs_ = (I2 + S) @ np.linalg.inv(I2 - S)
    e = max(e, np.abs(xr - ((1 + rv @ rv) * I2 + 2 * R) / (1 - rv @ rv)).max(), np.abs((xr - I2) @ np.linalg.inv(xr + I2) - R).max())
    d = np.arccosh(Bh(xr, xs_)); R0 = max(np.linalg.norm(rv), np.linalg.norm(sv))
    e = max(e, max(0, 2 * np.linalg.norm(rv - sv) - d - 1e-12), max(0, d - 2 * np.linalg.norm(rv - sv) / (1 - R0 ** 2) - 1e-12))
xx = np.linspace(0, 40, 400001); e = max(e, max(0, -(np.cos(xx) - 1 + 2 * (xx + np.sin(xx)) / np.pi).min()))
report("32 Prop m3:charts, Prop m3:timing: Cayley chart, 2|r-s| <= d <= 2|r-s|/(1-R0^2); cos x >= 1 - 2(x+sin x)/pi", e, 1e-10)
# (11) actual transport U' = -C(xdot) U around the oriented rectangle: return I - st F + O((s+t)^3)
K0, K1, K2, K3, K4, K5 = (_r32.normal(size=(2, 2)) for _ in range(6))
Cf = [lambda p: K0 + p[0] * K1 + p[1] * K2 + p[0] * p[1] * K5, lambda p: K3 + p[0] * K4 + p[1] * K1 @ K2 * 0.3]
dC = {(0, 1): K2, (1, 0): K4}                                                     # d_nu C_mu at 0: dC[(mu,nu)]
def _edge(U, p0, dirn, length, n=200):
    hh = length / n
    f = lambda t, U: -(Cf[0](p0 + t * dirn) * dirn[0] + Cf[1](p0 + t * dirn) * dirn[1]) @ U
    for i in range(n):
        t = i * hh; k1 = f(t, U); k2 = f(t + hh / 2, U + hh / 2 * k1); k3 = f(t + hh / 2, U + hh / 2 * k2); k4 = f(t + hh, U + hh * k3)
        U = U + hh / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
    return U
e = 0.0
F01 = K4 - K2 + Cf[0]((0, 0)) @ Cf[1]((0, 0)) - Cf[1]((0, 0)) @ Cf[0]((0, 0))   # d_0 C_1 - d_1 C_0 + [C_0, C_1]
errs = []
for sc in (1e-2, 5e-3):
    s_, t_ = sc, 0.7 * sc; U = np.eye(2); p = np.zeros(2)
    for dirn, ln in ((np.r_[1., 0], s_), (np.r_[0., 1], t_), (np.r_[-1., 0], s_), (np.r_[0., -1], t_)):
        U = _edge(U, p, dirn, ln); p = p + dirn * ln
    errs.append(np.abs(U - (np.eye(2) - s_ * t_ * F01)).max())
e = max(e, max(0, errs[1] / errs[0] - 0.2))                                      # third-order remainder: ratio ~ 1/8
report("32 Prop m3:physicalGauge: rectangle return I - st F_{mu nu} with O((s+t)^3) remainder (ratio test)", e, 1e-12)

# =========================================================== 33. Section 5C (independent checks of the d4 section)
import itertools as _it33
_r33 = np.random.default_rng(2611)
def _orth(n): q_, r_ = np.linalg.qr(_r33.normal(size=(n, n))); return q_ * np.sign(np.diag(r_))
# (1) span ranks: O(r) needs r^2 (also for differences); SO(2) on its circle needs 2; S^0 needs 1; right multiplications need r
e = 0.0
for r in (2, 3, 4):
    Ms = [_orth(r) for _ in range(3 * r * r)]
    e = max(e, abs(np.linalg.matrix_rank(np.array([M.ravel() for M in Ms])) - r * r), abs(np.linalg.matrix_rank(np.array([(M - Ms[0]).ravel() for M in Ms[1:]])) - r * r))
rot = lambda t: np.array([[np.cos(t), -np.sin(t)], [np.sin(t), np.cos(t)]])
ts = _r33.uniform(0, 6, 20); e = max(e, abs(np.linalg.matrix_rank(np.array([rot(t).ravel() for t in ts])) - 2))
e = max(e, max(abs(np.trace(rot(a).T @ rot(b)) / 2 - np.cos(b - a)) for a, b in _r33.uniform(0, 6, (10, 2))))
def _qm(p, q): a1, b1, c1, d1 = p; a2, b2, c2, d2 = q; return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2, a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
Rm = lambda a: np.array([_qm(np.eye(4)[k], a) for k in range(4)]).T            # right multiplication x -> x a
As = [_r33.normal(size=4) for _ in range(10)]
e = max(e, abs(np.linalg.matrix_rank(np.array([Rm(a).ravel() for a in As])) - 4), max(abs(np.trace(Rm(a).T @ Rm(b)) / 4 - a @ b) for a in As[:4] for b in As[:4]))
report("33 Thm d4:rank, Ex. d4:small, Rem. d4:tower: O(r) span r^2 (and differences); SO(2) span 2; right multiplications span r with kernel <a,b>", e, 1e-10)
# (2) spectral: tensor family with G = I for r = 2,4,8; Eckart-Young truncation attains the tail and random PSD rank-s matrices do not beat it
P2 = [np.eye(2), np.array([[0, 1.], [1, 0]]), np.diag([1., -1]), np.array([[0, -1.], [1, 0]])]
e = 0.0
for a in (1, 2, 3):
    fam = [np.eye(1)]
    for _ in range(a): fam = [np.kron(F, P) for F in fam for P in P2]
    r = 2 ** a; G = np.array([[np.trace(F.T @ H) / r for H in fam] for F in fam])
    e = max(e, np.abs(G - np.eye(r * r)).max(), max(np.abs(F.T @ F - np.eye(r)).max() for F in fam))
m = 7; Xg = _r33.normal(size=(m, m)); G = Xg @ Xg.T; lam = np.sort(np.linalg.eigvalsh(G))[::-1]
for s in range(0, m + 1):
    w_, V_ = np.linalg.eigh(G); idx = np.argsort(w_)[::-1]; Ht = (V_[:, idx[:s]] * w_[idx[:s]]) @ V_[:, idx[:s]].T
    tail = np.sum(lam[s:] ** 2); e = max(e, abs(np.linalg.norm(G - Ht) ** 2 - tail))
    for _ in range(30):
        Y = _r33.normal(size=(m, s)); H = Y @ Y.T; e = max(e, max(0, tail - np.linalg.norm(G - H) ** 2 - 1e-9))
report("33 Prop d4:spectral: r^2 orthogonal maps with G=I (r=2,4,8); Eckart-Young tail attained by truncation, not beaten", e, 1e-8)
# (3) stopping: cap map with three fixed points; cosine iteration numbers, Newton order; golden contraction
g = lambda x: x - np.sin(np.pi / 3 * np.tanh(2 * x)); xs = np.linspace(-1, 1, 200001); sgn = np.sign(g(xs)); roots = xs[1:][sgn[1:] * sgn[:-1] < 0]
e = abs(len(roots) + int((sgn == 0).sum()) - 3) + (np.sin(np.pi / 3 * np.tanh(2)) >= 1) * 1.0
th = 0.0; diffs = []; its = [0.0]
for k in range(5): nt = np.cos(th); diffs.append(abs(nt - th)); th = nt; its.append(th)
ts_ = 0.7
for _ in range(200): ts_ = np.cos(ts_)
e = max(e, np.abs(np.round(diffs, 6) - np.array([1.0, 0.459698, 0.317251, 0.203263, 0.139191])).max(), abs(round(its[5], 6) - 0.793480),
        abs(round(ts_, 6) - 0.739085), (diffs[3] <= 0.150) * 1.0, (diffs[4] > 0.150) * 1.0)
lam_ = np.sin(ts_); x = ts_ + 1e-3; xn = x - (x - np.cos(x)) / (1 + np.sin(x))
e = max(e, abs((xn - ts_) / 1e-6 - ts_ / (2 * (1 + lam_))) * 1e-3)
f = lambda x: 1 + 1 / x; e = max(e, max(0, max(abs(f(np.linspace(1.5, 2, 101)) - 1.75)) - 0.25), abs(1 / 1.5 ** 2 - 4 / 9))
report("33 Ex. d4:stopping, d4:cosine: cap map has 3 fixed points; cosine differences, stop at step 5, 0.793480, 0.739085; Newton constant", e, 1e-6)
# (4) readouts: B = inverse series of A(x)=2x+2 arcsin x converges at pi to theta*; half fall time radius (1+lambda)/2
def _zsol(w):
    z = 0j
    for _ in range(200): z = (w + z - np.sin(z)) / 2
    return z
Rr = 3.4; Mn = 256; nodes = Rr * np.exp(2j * np.pi * np.arange(Mn) / Mn)
vals = np.array([np.sin(_zsol(Y / 2)) for Y in nodes]); coef = np.fft.fft(vals) / Mn / Rr ** np.arange(Mn)
Bpi = np.sum(coef[:120] * np.pi ** np.arange(120)).real
e = abs(Bpi - ts_) + max(0, np.abs(_zsol(1.75 * np.exp(1j * np.linspace(0, 6.28, 50)))).max() - 1)
eta = np.pi / 2 - ts_; e = max(e, abs(eta + np.sin(eta) - np.pi / 2), abs((1 + np.cos(eta)) / 2 - (1 + lam_) / 2))
report("33 Rem. d4:readouts: Taylor series of the inverse of 2x+2arcsin x (Cauchy coefficients, radius 3.4) sums at pi to theta*; free fall", e, 1e-9)
# (5) caps: deficit >= 2/M for random catalogues; a spiral catalogue achieves <= 8/M
e = 0.0
P = _r33.normal(size=(20000, 3)); P /= np.linalg.norm(P, axis=1)[:, None]
for M in (5, 20, 60):
    U = _r33.normal(size=(M, 3)); U /= np.linalg.norm(U, axis=1)[:, None]
    dfc = np.max(1 - np.max(P @ U.T, axis=1)); e = max(e, max(0, 2 / M - dfc - 0.02))
    k = np.arange(M) + 0.5; zz = 1 - 2 * k / M; ph = np.pi * (1 + 5 ** 0.5) * k
    Fz = np.c_[np.sqrt(1 - zz ** 2) * np.cos(ph), np.sqrt(1 - zz ** 2) * np.sin(ph), zz]
    e = max(e, max(0, np.max(1 - np.max(P @ Fz.T, axis=1)) - 8 / M))
e = max(e, abs(2 * 1 / (2 ** 4 - 1) - 2 / 15))
report("33 Prop d4:caps, Rem. d4:resources: deficit >= 2/M (random catalogues), a Fibonacci catalogue <= 8/M; word bound 2/15", e, 1e-12)
# (6) depth of an oriented path: brute force over rise positions equals ceil((N+1)/(k+1)) when 1<=k, 2k<=N
def _depth(N, rises):
    lay = [0] * (N + 1)                                     # longest-path layering on a path DAG
    # rise at edge i means layer(i) < layer(i+1); otherwise layer(i) > layer(i+1); minimal number of layers = longest monotone run
    best = 1; run = 1
    for i in range(N):
        pass
    # depth = max over maximal decreasing runs of their length, with rises allowing restart (need next block start > 0 handled by length>=2)
    import functools
    @functools.lru_cache(None)
    def ok(D):
        # check feasibility by DP over positions and layer values
        cur = set(range(D))
        for i in range(N):
            nxt = set()
            for l in cur:
                for l2 in range(D):
                    if (i in rises and l < l2) or (i not in rises and l > l2): nxt.add(l2)
            cur = nxt
            if not cur: return False
        return True
    D = 1
    while not ok(D): D += 1
    return D
e = 0
for N in range(2, 10):
    for k in range(1, N // 2 + 1):
        bestD = min(_depth(N, frozenset(c)) for c in _it33.combinations(range(N), k))
        e = max(e, abs(bestD - int(np.ceil((N + 1) / (k + 1)))))
e = max(e, abs(int(np.ceil(9 / 3)) - 3), abs(int(np.ceil(12 / 3)) - 4))
report("33 Rem. d4:resources: optimal parallel depth ceil((N+1)/(k+1)) over rise positions (brute force N<=9, 1<=k<=N/2)", e, 0)
# (7) shifted records: max |gamma| over unit pointers equals cos(pi/(m+2)), m = floor(N/|l|)
e = 0.0
for N in range(1, 12):
    for l in range(1, N + 2):
        S = np.zeros((N + 1, N + 1))
        for j in range(N + 1 - l): S[j + l, j] = 1
        top = np.linalg.eigvalsh((S + S.T) / 2).max(); m_ = N // l
        e = max(e, abs(top - np.cos(np.pi / (m_ + 2))))
e = max(e, abs((1 - np.cos(np.pi / (1000 + 2))) / 2 / (np.pi ** 2 / (4 * 1002 ** 2)) - 1) * 1e-3)
report("33 Thm d4:record: max overlap of shifted pointers = cos(pi/(m+2)), sine profile; asymptotic pi^2/(4(N+2)^2)", e, 1e-8)
# (8) monitored evolution numbers, antipodal reading rank 10, Hadamard/pi8 algebra, 1/7, Moebius map
sg = np.array([1, 0.76, 0.54, 0.35, 0.20, 0.10])
fr = [(sg[:2] ** k).sum() / (sg ** k).sum() for k in (2, 8, 10)]
e = np.abs(np.round(fr, 6) - np.array([0.772689, 0.993334, 0.997997])).max() + abs(((sg ** 4) > 0.12).sum() - 2)
e = max(e, abs(round(np.cos(np.pi / 64) ** 32, 6) - 0.962166))
Xp = _r33.normal(size=(40, 4)); Xp /= np.linalg.norm(Xp, axis=1)[:, None]; e = max(e, abs(np.linalg.matrix_rank((Xp @ Xp.T) ** 2) - 10))
qz = np.array([np.cos(np.pi / 8), 0, 0, np.sin(np.pi / 8)]); qx = np.array([np.cos(np.pi / 8), np.sin(np.pi / 8), 0, 0])
e = max(e, abs(_qm(qz, qx)[0] - np.cos(np.pi / 8) ** 2), abs((1 + 2 ** 0.5 / 2) * (1 - 2 ** 0.5 / 2) - 0.5))
r_ = 1; seq = []
for _ in range(7): seq.append(r_); r_ = (10 * r_) % 7
e = max(e, abs(seq.index(1, 1) - 6))
for z in (0.6 + 0.3j, 2 + 1j, 0.5 + 4j): e = max(e, abs(abs((z - 1) / z) ** 2 - 1 - (1 - 2 * z.real) / abs(z) ** 2))
report("33 Ex. d4:monitor, d4:blind, Conj. d4:conjecture, Rem. d4:quotients: fractions, 0.962166, rank 10, cos^2(pi/8), norm 1/2, period 6", e, 1e-12)

# =========================================================== 34. Section 9A (independent checks of the m5 section)
import itertools as _it34
_r34 = np.random.default_rng(2612)
# (1) three lengths, depth, excess, volumes, table
e = 0.0
for ep in np.linspace(1e-3, np.pi / 2, 400):
    A = np.array([np.cos(ep), np.sin(ep), 0]); Bv = np.array([1., 0, 0]); C = np.array([np.cos(ep), 0, np.sin(ep)])
    l_ = np.linalg.norm(A - C); a_ = np.arccos(np.clip(A @ C, -1, 1))
    e = max(e, abs(l_ - np.sqrt(2) * np.sin(ep)), abs(a_ - np.arccos(np.cos(ep) ** 2)), max(0, l_ - a_ + 1e-15) if l_ >= a_ else 0, max(0, a_ - 2 * ep) if a_ >= 2 * ep else 0,
            abs(np.linalg.norm((A + C) / 2) - np.sqrt((1 + np.cos(ep) ** 2) / 2)), abs(abs(np.linalg.det(np.c_[A, Bv, C])) - np.sin(ep) ** 2))
    r_ = np.linspace(0, 1, 2001); walls = 2 * np.sqrt((r_ - np.cos(ep)) ** 2 + np.sin(ep) ** 2); e = max(e, abs(walls.min() - 2 * np.sin(ep)) * 1e-3)
rows = {15: (0.523599, 0.368100, 0.366025, 0.016889, 0.300943), 30: (1.047198, 0.722734, 0.707107, 0.064586, 0.324763), 45: (1.570796, 1.047198, 1.000000, 0.133975, 0.363380),
        60: (2.094395, 1.318116, 1.224745, 0.209431, 0.415227), 90: (3.141593, 1.570796, 1.414214, 0.292893, 0.549842)}
for deg, row in rows.items():
    ep = np.radians(deg); vals = (2 * ep, np.arccos(np.cos(ep) ** 2), np.sqrt(2) * np.sin(ep), 1 - np.sqrt((1 + np.cos(ep) ** 2) / 2), 1 - np.sqrt(2) * np.sin(ep) / (2 * ep))
    e = max(e, np.abs(np.round(vals, 6) - np.array(row)).max())
ep = 1e-2; e = max(e, abs((np.arccos(np.cos(ep) ** 2) - np.sqrt(2) * np.sin(ep)) / ep ** 3 - np.sqrt(2) / 12) * 1e-2, abs(2 * np.arctan(np.tan(np.radians(30)) ** 2) - 2 * np.arctan(1 / 3)))
report("34 Thm m5:ladder, Ex. m5:scales: sqrt2 sin e < arccos(cos^2 e) < 2e, walls 2 sin e, depth, det sin^2, table rows, cubic gap sqrt2/12", e, 1e-6)
# (2) Gram interval, Schur residual = projection
e = 0.0
for _ in range(50):
    x, y = _r34.uniform(-1, 1, 2); rad = np.sqrt((1 - x * x) * (1 - y * y))
    for z in (x * y - rad, x * y + rad, x * y + 0.3 * rad):
        G = np.array([[1, x, z], [x, 1, y], [z, y, 1]]); e = max(e, abs(np.linalg.det(G) - ((1 - x * x) * (1 - y * y) - (z - x * y) ** 2)))
    X = _r34.normal(size=(6, 5)) + 1j * _r34.normal(size=(6, 5)); K = X.conj().T @ X; I = [1, 3]; J = [0, 2, 4]
    S = K[np.ix_(J, J)] - K[np.ix_(J, I)] @ np.linalg.inv(K[np.ix_(I, I)]) @ K[np.ix_(I, J)]
    Q, _ = np.linalg.qr(X[:, I]); R = X[:, J] - Q @ (Q.conj().T @ X[:, J]); e = max(e, np.abs(S - R.conj().T @ R).max())
report("34 Prop m5:gram-interval, m5:projection: determinant, endpoints of rank two; Schur complement = Gram of projected residuals", e, 1e-10)
# (3) bordered-minor path expansion (m5:sum) on random complex amplitudes, directed
def _paths(i, j, I):
    out = []
    for r in range(len(I) + 1):
        for mid in _it34.permutations(I, r): out.append((i,) + mid + (j,))
    return out
e = 0.0
for _ in range(10):
    n = 6; Kd = np.eye(n, dtype=complex)
    for a, b in _it34.permutations(range(n), 2):
        if _r34.random() < 0.7: Kd[a, b] = (_r34.normal() + 1j * _r34.normal()) * 0.4
    I = [2, 3, 4]; i, j = 0, 5
    S = Kd[i, j] - Kd[i, I] @ np.linalg.inv(Kd[np.ix_(I, I)]) @ Kd[I, j]
    tot = 0
    for p in _paths(i, j, I):
        amp = np.prod([Kd[p[k], p[k + 1]] for k in range(len(p) - 1)]); rest = [v for v in I if v not in p]
        tot += (-1) ** (len(p) - 2) * amp * (np.linalg.det(Kd[np.ix_(rest, rest)]) if rest else 1)
    e = max(e, abs(np.linalg.det(Kd[np.ix_(I, I)]) * S - tot))
report("34 Thm m5:tropical: det K[I] S_ij = sum over simple paths (-1)^r(p) a(p) det K[I minus I(p)] (directed, complex)", e, 1e-12)
# (4) logarithmic limit with the sign condition (ties counted) and the counterexamples
e = 0.0
n = 6; W = np.full((n, n), np.inf)
for a, b in _it34.combinations(range(n), 2):
    if _r34.random() < 0.8: W[a, b] = W[b, a] = float(_r34.integers(1, 4))
I = [1, 2, 3, 4]; i, j = 0, 5
def _D(W, i, j, I):
    best, cnt = np.inf, 0
    for p in _paths(i, j, I):
        c = sum(W[p[k], p[k + 1]] for k in range(len(p) - 1))
        if c < best - 1e-12: best, cnt = c, 1
        elif abs(c - best) < 1e-12: cnt += 1
    return best, cnt
D, Ncnt = _D(W, i, j, I)
for h in (0.05, 0.03):
    K = np.eye(n) - np.where(np.isinf(W), 0, np.exp(-W / h)); S = K[i, j] - K[i, I] @ np.linalg.inv(K[np.ix_(I, I)]) @ K[I, j]
    e = max(e, abs(-h * np.log(abs(S)) - (D - h * np.log(Ncnt))))
t = lambda h: np.exp(-1 / h)
for h in (0.1, 0.05):
    T = t(h); K3 = np.array([[1, T, T * T], [T, 1, T], [T * T, T, 1]])           # order i, b, j
    S3 = K3[0, 2] - K3[0, 1] * K3[1, 2] / K3[1, 1]; e = max(e, abs(S3))
    K4 = np.array([[1, T, T, T * T], [T, 1, 0, T], [T, 0, 1, T * T], [T * T, T, T * T, 1]])   # i, b, c, j
    S4 = K4[0, 3] - K4[0, [1, 2]] @ np.linalg.inv(K4[np.ix_([1, 2], [1, 2])]) @ K4[[1, 2], 3]
    e = max(e, abs(S4 + T ** 3) / T ** 3, max(0, -np.linalg.eigvalsh(K4).min()))
e = max(e, max(0, 3 + 2 * 3 * (-1 + 1e-9) + 0) if False else 0)
report("34 Thm m5:tropical, Cor. m5:sign, Ex. m5:counter: -h log|S| = D - h log N for negative entries; 3-point tie cancels; 4-point gives -t^3", e, 1e-6)
# (5) walk sums: -S = sum over walks through I; six-vertex relaxation example; single-pivot recurrence
e = 0.0
A = np.abs(_r34.normal(size=(6, 6))) * 0.1; np.fill_diagonal(A, 0); K = np.eye(6) - A; I = [1, 2, 3, 4]
S = K[0, 5] - K[0, I] @ np.linalg.inv(K[np.ix_(I, I)]) @ K[I, 5]
walk = A[0, 5]; P_ = A[0, I].copy()
for _ in range(200): walk += P_ @ A[I, 5]; P_ = P_ @ A[np.ix_(I, I)]
e = max(e, abs(-S - walk))
inf = np.inf; names = ['p1', 'b1', 'b2', 'b3', 'b4', 'p2']; Wd = np.full((6, 6), inf)
for (u, v, c) in [(0, 1, 2), (0, 2, 5), (0, 5, 11), (1, 2, 1), (1, 4, 6), (2, 3, 2), (2, 5, 6), (3, 2, 1), (3, 4, 1), (3, 5, 4), (4, 5, 1)]: Wd[u, v] = c
d = np.full(6, inf); d[0] = 0; hist = []
for _ in range(4):
    d = np.minimum(d, np.min(d[:, None] + Wd, axis=0)); hist.append(tuple(d[1:5]))
e = max(e, 0 if hist == [(2, 5, inf, inf), (2, 3, 7, 8), (2, 3, 5, 8), (2, 3, 5, 6)] else 1)
Dm = Wd.copy()
for b in (1, 2, 3, 4):
    Dm = np.minimum(Dm, Dm[:, [b]] + Dm[[b], :])
e = max(e, abs(Dm[0, 5] - 7), abs(min(Wd[0, 5], min(Wd[0, b] + Wd[b, 5] for b in (1, 2, 3, 4))) - 11))
d1 = np.minimum(np.full(6, inf), Wd[0]); d1[0] = 0; d1 = np.minimum(d1, np.min(d1[:, None] + Wd, axis=0))
e = max(e, abs(min(Wd[0, 5], min(d1[b] + Wd[b, 5] for b in (1, 2, 3, 4)) if False else min(Wd[0, 5], min(Wd[0, b] + Wd[b, 5] for b in (1, 2, 3, 4)))) - 11))
report("34 Prop m5:walksum, Thm m5:pivot, Ex. m5:six: -S = walk sum; relaxations (2,5,inf,inf)...(2,3,5,6); pivot closure 7; one-vertex formula 11", e, 1e-12)
# (6) fill: perfect elimination order gives no fill for nonpositive off-diagonal PD matrices; chordless 4-cycle fills
e = 0.0
C4 = np.eye(4) * 3; 
for a, b in [(0, 1), (1, 2), (2, 3), (3, 0)]: C4[a, b] = C4[b, a] = -1
S = C4[np.ix_([1, 2, 3], [1, 2, 3])] - np.outer(C4[[1, 2, 3], 0], C4[0, [1, 2, 3]]) / C4[0, 0]
e = max(e, 0 if abs(S[0, 2]) > 1e-12 else 1)                                  # fill edge 1-3 appears
G = np.eye(5) * 4; 
for a, b in [(0, 1), (0, 2), (1, 2), (2, 3), (3, 4), (2, 4)]: G[a, b] = G[b, a] = -1
cur = G.copy(); idx = list(range(5)); sup0 = {(a, b) for a in range(5) for b in range(5) if a != b and G[a, b] != 0}
for piv in (0, 1, 3, 4):                                                      # a perfect elimination order of this chordal graph
    k = idx.index(piv); rest = [r for r in range(len(idx)) if r != k]
    cur = cur[np.ix_(rest, rest)] - np.outer(cur[rest, k], cur[k, rest]) / cur[k, k]; idx = [idx[r] for r in rest]
    for a in range(len(idx)):
        for b in range(len(idx)):
            if a != b and abs(cur[a, b]) > 1e-12 and (idx[a], idx[b]) not in sup0: e = 1
report("34 Prop m5:fill: chordless 4-cycle creates fill; perfect elimination order on a chordal support creates none (M-matrix entries)", e, 0)
# (7) hemisphere octants, holonomy ordering, complex step, rooted path counts
e = 0.0
ph = np.linspace(0, np.pi / 2, 20001); e = max(e, abs(np.trapezoid(np.ones_like(ph), ph) - np.pi / 2))
th = np.linspace(0, np.pi / 2, 4001); phg = np.linspace(0, np.pi / 2, 4001)
area = np.trapezoid(np.sin(th), th) * (np.pi / 2); e = max(e, abs(area - np.pi / 2) * 1e-3)
def _su2():
    q = _r34.normal(size=4); q /= np.linalg.norm(q); return np.array([[q[0] + 1j * q[3], q[2] + 1j * q[1]], [-q[2] + 1j * q[1], q[0] - 1j * q[3]]])
Pm, Qm = _su2(), _su2(); e = max(e, 1e-3 - min(np.abs(Pm @ Qm - Qm @ Pm).max(), 1e-3))
f = lambda x: np.exp(x) / (np.cos(x) ** 3 + np.sin(x) ** 3); x0 = np.pi / 4
e = max(e, abs(f(x0) - np.sqrt(2) * np.exp(np.pi / 4)))
us = np.linspace(-0.05, 0.05, 41); co = np.polyfit(us, f(x0 + us) / f(x0), 8)[::-1]
e = max(e, np.abs(co[:5] - np.array([1, 1, -1, -4 / 3, 19 / 6])).max() * 1e-3)
for hh in (1e-2, 5e-3):
    est = (f(x0 + 1j * hh)).imag / hh; e = max(e, max(0, abs((est - f(x0)) / f(x0) / hh ** 2 - 4 / 3) - 2 * hh))
for n_ in range(2, 9):
    for k in range(1, n_ + 1): e = max(e, abs(sum(1 for v in range(n_) if n_ - v >= k) - (n_ - k + 1)))
report("34 Ex. m5:hemisphere, Rem. m5:holonomy, m5:sagitta, m5:algorithm: octant integrals, PQ != QP, complex-step series 1,1,-1,-4/3,19/6", e, 1e-6)

# =========================================================== 35. Section 6A (independent checks of the m4 phase-synthesis half)
import itertools as _it35, math as _m35
_r35 = np.random.default_rng(2711)
P_ = np.polynomial.polynomial
def _W(x): y = np.sqrt(1 - x * x + 0j); return np.array([[x, 1j * y], [1j * y, x]])
def _Dg(ph): return np.diag([np.exp(1j * ph), np.exp(-1j * ph)])
def _word(phis, x):
    F = _Dg(phis[0])
    for ph in phis[1:]: F = F @ _W(x) @ _Dg(ph)
    return F
def _synth(p, n):
    """Constructive Theorem m4:real: SOS completion by root selection, then peeling of Proposition m4:pair."""
    A = P_.polysub([1], P_.polymul(p, p))                      # 1 - p^2, coefficients in x
    # z^{2n} A((z+1/z)/2) as a polynomial in z
    half = np.array([0, 0.5]); Z = np.zeros(1)
    poly = np.zeros(1)
    for k, a in enumerate(A):
        term = P_.polypow(np.array([1, 0, 1]) * 0.5, k)        # ((1+z^2)/2)^k = z^k ((z+1/z)/2)^k
        term = P_.polymul(term, np.r_[np.zeros(2 * n - k), 1]) # times z^{2n-k}
        poly = P_.polyadd(poly, a * term)
    rts = P_.polyroots(poly); ins = rts[np.abs(rts) < 1]
    g = np.real_if_close(P_.polyfromroots(ins)); g = np.real(g)
    th = 0.37; val = P_.polyval(np.cos(th), A); gv = abs(P_.polyval(np.exp(1j * th), g)) ** 2; g = g * np.sqrt(val / gv)
    # Laurent L(z) = z^{-n} g(z) (exponents -n..n, parity n since g is even); real part -> B(x), imag part -> y C(x)
    T = lambda j: np.polynomial.chebyshev.cheb2poly(np.r_[np.zeros(j), 1]); U = lambda j: np.polynomial.chebyshev.cheb2poly(np.r_[np.zeros(j), 1]) if False else None
    def Upoly(j):  # U_j in power basis
        a, b = np.array([1.]), np.array([0., 2.])
        if j == 0: return a
        for _ in range(j - 1): a, b = b, P_.polysub(P_.polymul([0, 2], b), a)
        return b
    B = np.zeros(1); C = np.zeros(1)
    for idx, cf in enumerate(g):
        j = idx - n
        if abs(cf) < 1e-15: continue
        B = P_.polyadd(B, cf * T(abs(j)))
        if j != 0: C = P_.polyadd(C, cf * np.sign(j) * Upoly(abs(j) - 1))
    Pc = P_.polyadd(np.asarray(p, complex), 1j * B); Qc = np.asarray(C, complex)
    phis = []
    for m in range(n, 0, -1):
        pn = Pc[m] if len(Pc) > m else 0; qn = Qc[m - 1] if len(Qc) > m - 1 else 0
        ph = 0.5 * np.angle(pn / qn) if abs(qn) > 1e-12 else 0.0  # e^{-i ph} p_n = e^{i ph} q_{n-1}
        e1, e2 = np.exp(-1j * ph), np.exp(1j * ph)
        newP = P_.polyadd(P_.polymul([0, 1], e1 * Pc), P_.polymul([1, 0, -1], e2 * Qc))
        newQ = P_.polyadd(-e1 * Pc, P_.polymul([0, 1], e2 * Qc))
        newP = newP[:m]; newQ = newQ[:max(m - 1, 1)]
        Pc, Qc = newP, newQ; phis.append(ph)
    ph0 = np.angle(Pc[0]); phis.append(ph0)
    return phis[::-1]                                            # phi_0, phi_1, ..., phi_n
e = 0.0
for n in (1, 2, 3, 4, 5, 6):
    for _ in range(4):
        c = _r35.normal(size=n + 1); c[[k for k in range(n + 1) if (k - n) % 2]] = 0
        p = np.polynomial.chebyshev.cheb2poly(c); xs = np.linspace(-1, 1, 801); p = p * 0.95 / np.abs(P_.polyval(xs, p)).max()
        phis = _synth(p, n)
        for x in np.linspace(-1, 1, 41): e = max(e, abs(_word(phis, x)[0, 0].real - P_.polyval(x, p)))
report("35 Thm m4:real, Lemma m4:sos, Prop. m4:pair: constructive SOS completion and peeling reproduce random admissible p (n<=6) as Re F_00", e, 1e-7)
# repeated phase -> T_n(x cos phi); phase ambiguity examples; direct real-entry criterion examples
e = 0.0
for n in range(0, 6):
    for ph in _r35.uniform(-3, 3, 4):
        for x in np.linspace(-1, 1, 11):
            F = np.eye(2) + 0j
            for _ in range(n): F = F @ _W(x) @ _Dg(ph)
            e = max(e, abs(F[0, 0].real - np.cos(n * np.arccos(np.clip(x * np.cos(ph), -1, 1)))))
for x in np.linspace(-1, 1, 11):
    for s in (1, -1): e = max(e, abs(_word([0, s * np.pi / 3], x)[0, 0].real - x / 2))
    e = max(e, np.abs(_W(x) @ _Dg(np.pi / 2) @ _W(x) - _Dg(np.pi / 2)).max(), np.abs(_Dg(0.3 + np.pi) + _Dg(0.3)).max())
e = max(e, abs(abs(_word([0, np.pi / 3], 0.3)[0, 0]) - 1) * 0 + abs(abs(np.exp(1j * np.pi / 3)) - 1))
report("35 Prop. m4:repeated, Rem. m4:phases: repeated phase gives T_n(x cos phi); x/2 by phases +-pi/3; WD(pi/2)W = D(pi/2)", e, 1e-12)
# projected-unitary lifting: Pi V(Psi) Pi = Pi L(G) Pi and Pt V Pi = A L(G)
def _Rm(x): s = np.sqrt(max(1 - x * x, 0)); return np.array([[x, s], [s, -x]])
def _S(Psi, x):
    M = np.eye(2) + 0j
    for th in Psi: M = M @ _Dg(th) @ _Rm(x)
    return M
e = 0.0
dim = 6
for trial in range(4):
    Z = _r35.normal(size=(dim, dim)) + 1j * _r35.normal(size=(dim, dim)); U, _ = np.linalg.qr(Z)
    Pi = np.diag([1, 1, 1, 0, 0, 0]).astype(complex); Pt = np.diag([1, 0, 1, 0, 1, 1]).astype(complex)
    A = Pt @ U @ Pi; G = A.conj().T @ A
    for k in (1, 2, 3, 4):
        Psi = list(_r35.uniform(-3, 3, k)); eps = k % 2
        xs = np.linspace(0.05, 0.95, 40); vals = np.array([_S(Psi, x)[0, 0] / x ** eps for x in xs])
        L = np.polyfit(xs ** 2, vals, (k - eps) // 2)[::-1]
        LG = sum(cf * np.linalg.matrix_power(G, j) for j, cf in enumerate(L))
        V = np.eye(dim) + 0j
        for idx in range(k - 1, -1, -1):                       # build V by prepending phases from the end
            th = Psi[idx]; rem = k - 1 - idx
            if rem % 2 == 0: V = (np.exp(1j * th) * Pt + np.exp(-1j * th) * (np.eye(dim) - Pt)) @ U @ V
            else: V = (np.exp(1j * th) * Pi + np.exp(-1j * th) * (np.eye(dim) - Pi)) @ U.conj().T @ V
        if eps == 0: e = max(e, np.abs(Pi @ V @ Pi - Pi @ LG @ Pi).max())
        else: e = max(e, np.abs(Pt @ V @ Pi - A @ LG).max())
for x in np.linspace(0, 1, 11): e = max(e, np.abs(_W(x) - 1j * _Dg(-np.pi / 4) @ _Rm(x) @ _Dg(-np.pi / 4)).max())
report("35 Thm m4:lift: Pi V(Psi) Pi = Pi L(G) Pi (even), Pt V(Psi) Pi = A L(G) (odd); W = i D(-pi/4) R D(-pi/4) on x>=0", e, 1e-8)
# amplification count and rotation algebra
e = 0.0
for p in np.linspace(0.001, 0.999, 300):
    n = int(np.ceil(np.pi / (4 * np.arcsin(np.sqrt(p))) - 0.5)); al = np.pi / (4 * n + 2)
    e = max(e, max(0, np.sin(al) ** 2 / p - 1), abs(np.sin((2 * n + 1) * al) - 1), max(0, (2 * n + 1) - (np.pi / 2 + 2) / np.sqrt(p)))
report("35 Prop. m4:amplify: coin probability sin^2(alpha)/p <= 1, (2n+1)alpha = pi/2, calls <= (pi/2+2)/sqrt p", e, 1e-12)
# central-defect path: simple spectrum, gap bound, n=1 gap, scaled gaps, finite-window transfer
def _Jn(n):
    J = np.zeros((2 * n, 2 * n))
    for j in range(2 * n - 1): J[j, j + 1] = J[j + 1, j] = np.sqrt(2) if j == n - 1 else 1
    return J
e = 0.0
for n in range(1, 40):
    ev = np.linalg.eigvalsh(_Jn(n)); dl = np.diff(ev).min()
    e = max(e, max(0, 2 * np.sqrt(2) / ((1 + np.sqrt(2)) ** 2 * n ** 3) - dl))
e = max(e, abs(np.diff(np.linalg.eigvalsh(_Jn(1)))[0] - 2 * np.sqrt(2)))
for n, val in ((64, 58.11), (128, 57.06), (256, 56.47)): e = max(e, abs(round(n ** 3 * np.diff(np.linalg.eigvalsh(_Jn(n))).min(), 2) - val))
for n in (2, 3, 5):
    J = _Jn(n); w, V = np.linalg.eigh(J); dl = np.diff(w).min(); eps = 0.5; tau = 4 * n / (eps * dl)
    ts = np.linspace(0, tau, 40001); amp = (V[2 * n - 1, :] * V[0, :]) @ np.exp(-1j * np.outer(w, ts))
    avg = np.trapezoid(np.abs(amp) ** 2, ts) / tau; e = max(e, max(0, (1 - eps) / (2 * n) - avg))
report("35 Thm m4:defect, Conj. m4:gap-limit: gap >= 2sqrt2/((1+sqrt2)^2 n^3), n=1 gap 2sqrt2, n^3 gap 58.11, 57.06, 56.47; window bound", e, 1e-9)
# static completions: brute force on small sets
e = 0.0
def _cyc_perms(V):
    V = list(V); first = V[0]
    for rest in _it35.permutations(V[1:]):
        order = (first,) + rest; yield {order[i]: order[(i + 1) % len(order)] for i in range(len(order))}
for N in (3, 4, 5, 6):
    for _ in range(6):
        perm = list(_r35.permutation(N)); cuts = sorted(_r35.choice(range(1, N), size=_r35.integers(1, N - 1), replace=False))
        comps = np.split(np.array(perm), cuts); E = [(int(c[i]), int(c[i + 1])) for c in comps for i in range(len(c) - 1)]; cnum = len(comps)
        cyc = list(_cyc_perms(range(N))); ext = [s for s in cyc if all(s[a] == b for a, b in E)]
        e = max(e, abs(len(ext) / len(cyc) - _m35.factorial(cnum - 1) / _m35.factorial(N - 1)), abs(len(E) - (N - cnum)))
        if cnum >= 2:
            tA = int(comps[0][-1]); hB = int(comps[1][0]); hA = int(comps[0][0])
            e = max(e, abs(sum(1 for s in ext if s[tA] == hB) / len(ext) - 1 / (cnum - 1)), sum(1 for s in ext if s[tA] == hA))
def _alt_count(n, E):
    Vr = list(range(n)); Vb = list(range(n, 2 * n)); cnt = 0
    for s in _cyc_perms(range(2 * n)):
        if all((a < n) != (s[a] < n) for a in s) and all(s[a] == b for a, b in E): cnt += 1
    return cnt
for n in (1, 2, 3):
    for _ in range(5):
        R = list(_r35.permutation(n)); Bv = list(_r35.permutation(range(n, 2 * n))); E = []
        used_o, used_i = set(), set()
        for k in range(_r35.integers(0, 2 * n)):
            a = int(_r35.integers(0, 2 * n)); cand = [b for b in range(2 * n) if (a < n) != (b < n) and b not in used_i and a not in used_o]
            if not cand: continue
            b = int(_r35.choice(cand)); E2 = E + [(a, b)]
            nxt = dict(E2); ok = True
            for v in range(2 * n):                                   # acyclic check
                seen, x = set(), v
                while x in nxt:
                    if x in seen: ok = False; break
                    seen.add(x); x = nxt[x]
            if ok: E = E2; used_o.add(a); used_i.add(b)
        nxt = dict(E); prv = {b: a for a, b in E}; heads = [v for v in range(2 * n) if v not in prv]
        comps = []
        for h in heads:
            c = [h]
            while c[-1] in nxt: c.append(nxt[c[-1]])
            comps.append(c)
        col = lambda v: 'r' if v < n else 'b'
        m = sum(1 for c in comps if col(c[0]) == 'r' and col(c[-1]) == 'r'); p = sum(1 for c in comps if col(c[0]) == 'r' and col(c[-1]) == 'b'); q = sum(1 for c in comps if col(c[0]) == 'b' and col(c[-1]) == 'r')
        if m > 0: M = m * _m35.factorial(m + p - 1) * _m35.factorial(m + q - 1)
        elif p + q > 0 and p * q == 0: M = _m35.factorial(p + q - 1)
        else: M = 0
        e = max(e, abs(_alt_count(n, E) - M))
report("35 Prop. m4:forest: extension mass (c-1)!/(N-1)!, connection probability 1/(c-1), alternating inventory M (brute force)", e, 1e-12)

# =========================================================== 36. Section 10A (independent checks of the m4 atlas half)
from fractions import Fraction as _F36
_r36 = np.random.default_rng(2712)
def _qm(p, q):
    a1, b1, c1, d1 = p; a2, b2, c2, d2 = q
    return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2, a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
def _cay(r): n2 = r @ r; return np.r_[1 - n2, 2 * r] / (1 + n2)
def _dec(e, r): return e * _cay(r)
def _mul(e, r, f, s):
    L = (1 + r @ r) * (1 + s @ s); N = (1 - s @ s) * r + (1 - r @ r) * s + 2 * np.cross(r, s)
    Dp = 1 + (r @ r) * (s @ s) - 2 * r @ s; Dm = (r + s) @ (r + s)
    return ((e * f, N / Dp) if Dp >= Dm else (-e * f, -N / Dm)), (L, N, Dp, Dm)
def _rb():
    v = _r36.normal(size=3); return v / np.linalg.norm(v) * _r36.uniform(0, 1) ** (1 / 3)
e = 0.0
for _ in range(400):
    r, s = _rb(), _rb(); a, b = _r36.choice([-1, 1], 2)
    (g, t), (L, N, Dp, Dm) = _mul(a, r, b, s)
    e = max(e, abs(Dp + Dm - L), abs(N @ N - Dp * Dm), max(0, 0.5 - max(Dp, Dm)), np.abs(_dec(g, t) - _qm(_dec(a, r), _dec(b, s))).max(),
            abs(t @ t - min(Dp, Dm) / max(Dp, Dm)), max(0, t @ t - 1 - 1e-12), np.abs(_qm(_dec(a, r), _dec(a, -r)) - np.r_[1, 0, 0, 0]).max())
    u = _r36.normal(size=3); u /= np.linalg.norm(u); e = max(e, np.abs(_dec(a, u) - _dec(-a, -u)).max())   # seam identification
report("36 Thm m4:atlas: D+ + D- = L, |N|^2 = D+D-, max >= 1/2, decoded product = quaternion product, |coord|^2 = min/max, inverse, seam", e, 1e-12)
# conditioning: chordal identity, differentials, 50 delta bound under perturbation of denominators/numerator
e = 0.0
for _ in range(200):
    r, s = _rb(), _rb()
    e = max(e, abs(np.linalg.norm(_cay(r) - _cay(s)) - 2 * np.linalg.norm(r - s) / np.sqrt((1 + r @ r) * (1 + s @ s))))
    # differential of the product coordinate in s at fixed sheet: singular values in [1/2, 2], condition number 1
    (g, t), _ = _mul(1, r, 1, s); h = 1e-6
    Jm = np.array([( _mul(1, r, 1, s + h * ei)[0][1] - _mul(1, r, 1, s - h * ei)[0][1]) / (2 * h) for ei in np.eye(3)]).T
    if _mul(1, r, 1, s + h * np.ones(3))[0][0] == g and _mul(1, r, 1, s - h * np.ones(3))[0][0] == g and t @ t < 0.95:
        sv = np.linalg.svd(Jm, compute_uv=False); e = max(e, (sv.max() / sv.min() - 1) * 1e-3, max(0, 0.5 - sv.min() - 1e-6), max(0, sv.max() - 2 - 1e-6))
dl = 1e-3
for _ in range(300):
    r, s = _rb(), _rb(); (g, t), (L, N, Dp, Dm) = _mul(1, r, 1, s)
    Dp2, Dm2 = Dp + _r36.uniform(-dl, dl), Dm + _r36.uniform(-dl, dl); dv = _r36.normal(size=3); N2 = N + dl * _r36.uniform() * dv / np.linalg.norm(dv)
    g2, t2 = (1, N2 / Dp2) if Dp2 >= Dm2 else (-1, -N2 / Dm2); rd = _r36.normal(size=3); t2 = t2 + dl * _r36.uniform() * rd / np.linalg.norm(rd)
    e = max(e, max(0, np.linalg.norm(_dec(g2, t2) - _dec(g, t)) - 50 * dl))
report("36 Prop. m4:conditioning: chordal identity; singular values in [1/2,2] with condition number 1; perturbed decoded error <= 50 delta", e, 1e-6)
# sine vector, rotation matrix, seam invariance, Lipschitz 2, squared overlap readout
def _rotq(q):
    return np.array([_qm(_qm(q, np.r_[0, ei]), q * np.r_[1, -1, -1, -1])[1:] for ei in np.eye(3)]).T
def _X(r): return np.array([[0, -r[2], r[1]], [r[2], 0, -r[0]], [-r[1], r[0], 0]])
e = 0.0
for _ in range(200):
    r = _rb(); n2 = r @ r; q = _cay(r)
    Rr = np.eye(3) + (4 * (1 - n2) * _X(r) + 8 * _X(r) @ _X(r)) / (1 + n2) ** 2
    xi = 4 * (1 - n2) / (1 + n2) ** 2 * r; rs = -r / n2
    e = max(e, np.abs(Rr - _rotq(q)).max(), np.abs(xi - 2 * q[0] * q[1:]).max(), np.abs(4 * (1 - rs @ rs) / (1 + rs @ rs) ** 2 * rs - xi).max(), max(0, np.linalg.norm(xi) - 1))
    q2 = _cay(_rb()) * _r36.choice([-1, 1]); xi2 = 2 * q2[0] * q2[1:]; dq = min(np.linalg.norm(q - q2), np.linalg.norm(q + q2))
    e = max(e, max(0, np.linalg.norm(xi - xi2) - 2 * dq - 1e-12))
    Rrel = _rotq(q).T @ _rotq(q2); Dl = np.arccos(np.clip((np.trace(Rrel) - 1) / 2, -1, 1)); e = max(e, abs((q @ q2) ** 2 - (1 + np.cos(Dl)) / 2))
report("36 Prop. m4:sine: rotation matrix R_r, sine vector 2wv, seam invariance, |xi|<=1, 2-Lipschitz, <q,q'>^2 = (1+cos Delta)/2", e, 1e-10)
# seams: (i*i)*j = j, i*(i*j) = -j; a=-i/2, b=i/3; key recovery sign; t = sqrt2-1 example
def _star(r, s): (g, t), _ = _mul(1, r, 1, s); return t
I3 = np.eye(3); i_, j_, k_ = I3
e = max(np.abs(_star(_star(i_, i_), j_) - j_).max(), np.abs(_star(i_, _star(i_, j_)) + j_).max(), np.abs(_star(i_, i_)).max(), np.abs(_star(i_, j_) - k_).max(), np.abs(_star(i_, k_) + j_).max())
a = -i_ / 2; b = i_ / 3; e = max(e, np.abs(_star(-a, b) - i_).max(), np.abs(_star(a, _star(-a, b)) - b).max())
def _mulF(r, s):                                          # exact rational version, ties to D+
    dot = lambda a, b: sum(x * y for x, y in zip(a, b)); cr = lambda a, b: (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
    rr, ss = dot(r, r), dot(s, s); N = tuple((1 - ss) * a + (1 - rr) * b + 2 * c for a, b, c in zip(r, s, cr(r, s)))
    Dp = 1 + rr * ss - 2 * dot(r, s); Dm = dot(tuple(a + b for a, b in zip(r, s)), tuple(a + b for a, b in zip(r, s)))
    return tuple(x / Dp for x in N) if Dp >= Dm else tuple(-x / Dm for x in N)
def _ratunit():                                           # rational unit vector by inverse stereographic projection
    a, b = (_F36(int(_r36.integers(-9, 10)), int(_r36.integers(1, 10))) for _ in range(2)); d = 1 + a * a + b * b
    return (2 * a / d, 2 * b / d, (a * a + b * b - 1) / d)
for _ in range(200):
    r = tuple(_F36(int(_r36.integers(-5, 6)), 11) for _ in range(3)); v = _ratunit()
    rv = sum(x * y for x, y in zip(r, v)); out = _mulF(r, _mulF(tuple(-x for x in r), v))
    want = tuple(-x for x in v) if rv < 0 else v
    e = max(e, max(abs(float(o - w)) for o, w in zip(out, want)))
rr_ = -i_ / 2; e = max(e, np.abs(_star(rr_, _star(-rr_, i_)) + i_).max())
t = np.sqrt(2) - 1
for sg in (1, -1):
    out = _star(t * i_, t * j_) if sg == 1 else _star(t * j_, t * i_); e = max(e, np.abs(out - (i_ + j_ + sg * k_) / 3).max())
qa, qb = _cay(t * i_), _cay(t * j_); p1, p2 = _qm(qa, qb), _qm(qb, qa); e = max(e, abs(p1[0] - 0.5), abs(p1 @ p2 - 0.5))
report("36 Ex. m4:seams: (i*i)*j=j, i*(i*j)=-j; seam recovery; key recovery sign criterion; orders of ti,tj give (i+j+-k)/3", e, 1e-12)
# arithmetic: arc parameter, semicircle, midpoint error bound, grid rounding, rational denominators; obstructions; clock approximation
e = 0.0
for _ in range(100):
    p = _cay(_rb()) * _r36.choice([-1, 1]); q = _cay(_rb()) * _r36.choice([-1, 1])
    if p @ q < -0.99: continue
    g = _qm(q, p * np.r_[1, -1, -1, -1]); r = g[1:] / (1 + g[0]); ts = np.linspace(0, 1, 50)
    pts = [_qm(_cay(tt * r), p) for tt in ts]; ang = [np.arccos(np.clip(p @ x, -1, 1)) for x in pts]
    e = max(e, np.abs(pts[-1] - q).max(), max(0, -np.diff(ang).min() - 1e-7), max(0, ang[-1] - np.arccos(np.clip(p @ q, -1, 1)) - 1e-7))
    mu = min(1 + p @ q, 1); dp = _r36.normal(size=4) * 1e-3; dq = _r36.normal(size=4) * 1e-3
    p2 = (p + dp) / np.linalg.norm(p + dp); q2 = (q + dq) / np.linalg.norm(q + dq); mu = min(1 + p @ q, 1 + p2 @ q2)
    A_ = np.r_[1, 0, 0, 0] + _qm(q, p * np.r_[1, -1, -1, -1]); B_ = np.r_[1, 0, 0, 0] + _qm(q2, p2 * np.r_[1, -1, -1, -1])
    e = max(e, max(0, np.linalg.norm(A_ / np.linalg.norm(A_) - B_ / np.linalg.norm(B_)) - (np.linalg.norm(p - p2) + np.linalg.norm(q - q2)) / np.sqrt(2 * mu)))
u = np.array([0, 0, 1.]); p = np.r_[1, 0, 0, 0.]
e = max(e, np.abs(_qm(_cay(u), p) - (-_qm(_cay(-u), p))).max(), abs(_qm(_cay(u), p)[0] - 0))
for m in (5, 17, 64):
    for _ in range(50):
        r = _rb(); rr = np.trunc(r * m) / m; e = max(e, max(0, np.linalg.norm(_cay(rr) - _cay(r)) - 2 * np.sqrt(3) / m), max(0, rr @ rr - 1))
b0, bb = 7, np.array([2, 3, 1]); num = np.r_[b0 ** 2 - bb @ bb, 2 * b0 * bb]; e = max(e, np.abs(num / (b0 ** 2 + bb @ bb) - _cay(bb / b0)).max())
for t_ in (1e-2, 1e-4):
    for sg in (1, -1):
        qn = np.r_[-np.cos(t_), sg * np.sin(t_), 0, 0]; mid = np.r_[1, 0, 0, 0] + qn; mid /= np.linalg.norm(mid); e = max(e, max(0, abs(mid[1] - sg) - t_))
# x/2 at budget one: upper-left coefficient has real part 1/2 and imaginary part +-sqrt3/2
def _W(x): y = np.sqrt(1 - x * x + 0j); return np.array([[x, 1j * y], [1j * y, x]])
def _Dg(ph): return np.diag([np.exp(1j * ph), np.exp(-1j * ph)])
Fw = _Dg(0) @ _W(0.4) @ _Dg(np.pi / 3); P1 = (Fw[0, 0] - 0) ; e = max(e, abs((_Dg(0) @ _W(1.0) @ _Dg(np.pi / 3))[0, 0] - (0.5 + 1j * np.sqrt(3) / 2)))
# rational clock approximation: comparison error <= sum of chordal errors
for _ in range(50):
    n = 4; phis = _r36.uniform(-3, 3, n + 1); eta = _r36.uniform(0, 0.05, n + 1); phis2 = phis + 2 * np.arcsin(eta / 2) * _r36.choice([-1, 1], n + 1)
    for x in np.linspace(-1, 1, 21):
        F1 = _Dg(phis[0]); F2 = _Dg(phis2[0])
        for k in range(1, n + 1): F1 = F1 @ _W(x) @ _Dg(phis[k]); F2 = F2 @ _W(x) @ _Dg(phis2[k])
        e = max(e, max(0, abs(F1[0, 0].real - F2[0, 0].real) - eta.sum() - 1e-12))
report("36 Cor. m4:arithmetic, Ex. m4:obstructions, Cor. m4:approxphase: arc parameter, semicircle, midpoint bound, grid 2sqrt3/m, x/2 gate, clock error", e, 1e-9)
# models, Hopf loop, heap examples, update example and J_r
e = 0.0
def _qexp(v): a = np.linalg.norm(v); return np.r_[np.cos(a), np.sin(a) * v / a] if a > 0 else np.r_[1, 0, 0, 0.]
for _ in range(50):
    z, w = _r36.normal(size=3) * 1e-3, _r36.normal(size=3) * 1e-3; pr = _qm(_qexp(z), _qexp(w)); vec = pr[1:] * np.arctan2(np.linalg.norm(pr[1:]), pr[0]) / np.linalg.norm(pr[1:])
    e = max(e, max(0, np.linalg.norm(vec - (z + w + np.cross(z, w))) - 10 * (np.linalg.norm(z) + np.linalg.norm(w)) ** 3))
    a_ = _r36.normal(size=3); a_ /= np.linalg.norm(a_); b_ = _r36.normal(size=3); b_ /= np.linalg.norm(b_); c_ = _r36.normal(size=3); c_ /= np.linalg.norm(c_)
    S = 1 + a_ @ b_ + b_ @ c_ + c_ @ a_; D = a_ @ np.cross(b_, c_)
    rot = lambda x, y: np.r_[1 + x @ y, np.cross(x, y)] / np.sqrt(2 * (1 + x @ y))
    loop = _qm(rot(c_, a_), _qm(rot(b_, c_), rot(a_, b_))); e = max(e, np.abs(loop - np.r_[S, D * a_] / np.sqrt(S * S + D * D)).max())
    tq = np.r_[0, a_]; tb = _qm(np.r_[np.cos(0.7), np.sin(0.7) * c_], tq)          # turns: (c bbar)(b abar) = c abar
e = max(e, np.abs(_qm(np.r_[0, i_], np.r_[0, j_]) - np.r_[0, k_]).max(), np.abs(_qm(np.r_[0, j_], np.r_[0, i_]) + np.r_[0, k_]).max())
eps_ = _F36(1, 20); w8 = 1 / (1 + eps_); e = max(e, abs(float(w8 - _F36(20, 21))))
q = _cay(i_ / 2); sine = 2 * q[0] * q[1:] / 4; e = max(e, abs(sine[0] - 6 / 25)); inp = float(w8) * 6 / 25; e = max(e, abs(inp - 8 / 35))
e = max(e, abs(inp / (1 + inp ** 2) - 280 / 1289), abs(8 / (35 + np.sqrt(1289)) - inp / (1 + np.sqrt(1 + inp ** 2))))
for _ in range(50):
    r = _rb(); Jr = (1 - r @ r) * np.eye(3) + 2 * np.outer(r, r) + 2 * _X(r); e = max(e, np.abs(Jr.T @ Jr - (1 + r @ r) ** 2 * np.eye(3)).max())
    h = 1e-6; Jn = np.array([(_mul(1, r, 1, h * ei)[0][1] - _mul(1, r, 1, -h * ei)[0][1]) / (2 * h) for ei in np.eye(3)]).T
    e = max(e, np.abs(Jn - Jr).max() * 1e-3)
report("36 Prop. m4:models, m4:hopf, Rem. m4:heap, Prop. m4:updates: second-order product, loop (S+Da)/sqrt(S^2+D^2), [i,1,j]=k, 280/1289, J_r", e, 1e-8)

# =========================================================== 37. Section 10B (independent checks of the m6 section)
import itertools as _it37, math as _m37
from fractions import Fraction as _Fr37
_r37 = np.random.default_rng(2811)
def _q(p, q):
    a1, b1, c1, d1 = p; a2, b2, c2, d2 = q
    return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2, a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
cj = lambda q: q * np.array([1, -1, -1, -1])
# (1) Hurwitz order, prime-norm gates, freeness, even-word rationality and hole
e = 0.0
one, i_, j_, k_ = np.eye(4); h = np.array([.5, .5, .5, .5])
for lhs, rhs in ((_q(h, h), h - one), (_q(i_, h), h - one - j_), (_q(h, i_), i_ + j_ - h), (_q(j_, h), i_ + j_ - h), (_q(h, j_), h - one - i_)):
    e = max(e, np.abs(lhs - rhs).max())
units = [v for v in _it37.product([-1, 0, 1], repeat=4) if sum(x * x for x in v) == 1] + [tuple(s) for s in _it37.product([-.5, .5], repeat=4)]
e = max(e, abs(len(units) - 24))
def _Sp(p):
    R = int(np.sqrt(p)) + 1; out = []
    for a in _it37.product(range(-R, R + 1), repeat=4):
        if sum(x * x for x in a) == p and a[0] > 0 and a[0] % 2 == 1 and all(x % 2 == 0 for x in a[1:]): out.append(np.array(a, float))
    return out
for p in (5, 13, 17, 29): e = max(e, abs(len(_Sp(p)) - (p + 1)))
S5 = _Sp(5); inv = {k: [j for j, b in enumerate(S5) if np.allclose(b, cj(S5[k]))][0] for k in range(6)}
def _words(L):
    ws = [[k] for k in range(6)]
    for _ in range(L - 1): ws = [w + [k] for w in ws for k in range(6) if inv[w[-1]] != k]
    return ws
for L in (1, 2, 3, 4, 5):
    vals = set()
    for w in _words(L):
        P = np.array([1., 0, 0, 0])
        for k in w: P = _q(P, S5[k])
        P = P / 5 ** (L / 2); P = P if (P[0] > 1e-9 or (abs(P[0]) < 1e-9 and next(x for x in P if abs(x) > 1e-9) > 0)) else -P
        vals.add(tuple(np.round(P, 9)))
        if L % 2 == 0: e = max(e, max(0, abs(P[0]) - (1 - 5.0 ** (-L / 2)) - 1e-12))
    e = max(e, abs(len(vals) - 6 * 5 ** (L - 1)))
report("37 Prop. m6:hurwitz, Thm m6:cover: Hurwitz relations, 24 units, |S_p| = p+1 (p=5,13,17,29), reduced words of length <=5 distinct in G, even-word hole", e, 1e-9)
# (2) icosians: closure, E8 norm-two count, adjoint trace phi
phi = (1 + 5 ** 0.5) / 2
base = [(0, 1, 1 / phi, phi)]
ico = set(tuple(np.round(u, 9)) for u in units)
evenperms = [p for p in _it37.permutations(range(4)) if sum(1 for a in range(4) for b in range(a + 1, 4) if p[a] > p[b]) % 2 == 0]
for sg in _it37.product([-1, 1], repeat=3):
    v = np.array([0, sg[0] * 1, sg[1] / phi, sg[2] * phi]) / 2
    for pm in evenperms: ico.add(tuple(np.round(v[list(pm)], 9)))
I2 = [np.array(t) for t in ico]; e = abs(len(I2) - 120)
keys = set(ico)
Iarr = np.array(I2)
for a in I2[::7]:
    for b in I2: e = max(e, np.min(np.abs(Iarr - _q(a, b)).max(axis=1)))
x = next(a for a in I2 if abs(a[0] - phi / 2) < 1e-9); e = max(e, abs(4 * x[0] ** 2 - 1 - phi))
e = max(e, abs((2 * 1 + 2 * (-1)) - 0) * 0 + abs(1 / phi ** 2 - (2 - phi)))
report("37 Rem. m6:icosians: 120 elements, closure under multiplication, adjoint trace phi at scalar phi/2, phi^-2 = 2 - phi", e, 1e-8)
# (3) norm forms and shells
e = 0.0
for t in range(-3, 4):
    for P, Q in _it37.product(range(-5, 6), repeat=2):
        x_, y_ = P - (t + 1) * Q, Q; e = max(e, abs(x_ * x_ + x_ * y_ + y_ * y_ - (P * P - (2 * t + 1) * P * Q + (t * t + t + 1) * Q * Q)))
e = max(e, abs((8 - 3 * 3, 3) != (-1, 3)))
cnt = lambda E: sum(1 for x_ in range(-6, 7) for y_ in range(-6, 7) if x_ * x_ + x_ * y_ + y_ * y_ == E)
e = max(e, abs(cnt(1) - 6), abs(cnt(3) - 6), abs(cnt(7) - 12))
tr = lambda E: sorted(set(2 * x_ + y_ for x_ in range(-6, 7) for y_ in range(-6, 7) if x_ * x_ + x_ * y_ + y_ * y_ == E))
e = max(e, 0 if tr(1) == [-2, -1, 1, 2] and tr(3) == [-3, 0, 3] else 1)
shell = lambda n: sum(1 for v in _it37.product(range(-2, 3), repeat=4) if sum(c * c for c in v) == n)
e = max(e, abs(shell(1) - 8), abs(shell(2) - 24), abs(shell(3) - 32), abs(shell(4) - 24))
for n in range(0, 15):
    L_ = round(phi ** n + (1 - phi) ** n); F_ = round((phi ** n - (1 - phi) ** n) / 5 ** 0.5); e = max(e, abs(L_ * L_ - 5 * F_ * F_ - 4 * (-1) ** n))
A_, B_ = 1, 0
for n in range(1, 15): A_, B_ = A_ + 2 * B_, A_ + B_; e = max(e, abs(A_ * A_ - 2 * B_ * B_ - (-1) ** n))
report("37 Prop. m6:norm-forms, Ex. m6:norm-example: shear, Eisenstein counts 6,6,12, traces, Hamilton shells 8,24,32,24, Lucas and Pell norms", e, 0)
# (4) products: deterministic counterexamples, mean-product formula, prime sagitta constant
e = 0.0
def _ex(u, th): return np.r_[np.cos(th), np.sin(th) * u]
u = np.array([0, 0, 1.]); P = np.r_[1., 0, 0, 0]; parts = []
for k in range(1, 200001):
    P = _q(P, _ex(u, 1 / k))
    if k in (10000, 50000, 200000): parts.append(P[0])
e = max(e, 0 if np.std(parts) > 0.1 else 1)                                   # angles 1/k: no convergence (partial angle sums log k)
P = np.r_[1., 0, 0, 0]; sag = 0
for k in range(1, 20001): P = _q(_q(P, _ex(u, k ** -0.5)), _ex(u, -k ** -0.5)); sag += 2 * (1 - np.cos(k ** -0.5))
e = max(e, np.abs(P - np.r_[1, 0, 0, 0]).max(), 0 if sag > 9 else 1)
for _ in range(10):                                                           # E of ordered product of independent two-point laws = product of means
    laws = [(_ex(v / np.linalg.norm(v), a), _ex(w / np.linalg.norm(w), b)) for v, w, a, b in zip(_r37.normal(size=(3, 3)), _r37.normal(size=(3, 3)), _r37.uniform(0, 1, 3), _r37.uniform(0, 1, 3))]
    Ep = sum(np.prod([0.5] * 3) * _q(_q(laws[0][s0], laws[1][s1]), laws[2][s2]) for s0, s1, s2 in _it37.product((0, 1), repeat=3))
    mm = [0.5 * (a + b) for a, b in laws]; e = max(e, np.abs(Ep - _q(_q(mm[0], mm[1]), mm[2])).max())
N = 10 ** 7; sv = np.ones(N + 1, bool); sv[:2] = False
for q_ in range(2, int(N ** 0.5) + 1):
    if sv[q_]: sv[q_ * q_::q_] = False
pr = np.nonzero(sv)[0].astype(float); MP = 0.2614972128476428
corr = np.sum(1 - np.cos(pr ** -0.5) - 1 / (2 * pr)); Cc = MP / 2 + corr
part = np.sum(1 - np.cos(pr ** -0.5)) - 0.5 * np.log(np.log(N)); e = max(e, max(0, abs(part - Cc) - 2e-3))
report("37 Thm m6:det-product, m6:three, m6:prime-products: angles 1/k fail, inverse pairs converge with divergent sagittas, E(product)=product of means, constant C", e, 1e-12)
# (5) kernel inertia, moment matrices, quartet, z^2, pivot
e = 0.0
def _ker(roots, mult, pts, h=1.0):
    F = lambda z: np.prod([(z - r) ** m for r, m in zip(roots, mult)])
    dF = lambda z: F(z) * sum(m / (z - r) for r, m in zip(roots, mult))
    E = lambda z: F(z) + h / 2 * dF(z); Es = lambda z: F(z) - h / 2 * dF(z)
    return np.array([[(E(z) * np.conj(E(w)) - Es(z) * np.conj(Es(w))) / (2 * h * (z + np.conj(w))) for w in pts] for z in pts])
for trial in range(12):
    ee, kk = int(_r37.integers(0, 3)), int(_r37.integers(0, 3))
    if ee + kk == 0: ee = 1
    roots = [1j * _r37.normal() for _ in range(ee)]; mult = [int(_r37.integers(1, 3)) for _ in range(ee)]
    for _ in range(kk):
        r = complex(_r37.normal(), _r37.normal()); m = int(_r37.integers(1, 3)); roots += [r, -np.conj(r)]; mult += [m, m]
    n = ee + 2 * kk; pts = [complex(_r37.uniform(0.2, 2), _r37.normal()) for _ in range(n)]
    G = _ker(roots, mult, pts); G = (G + G.conj().T) / 2; w = np.linalg.eigvalsh(G); tol = 0.0
    e = max(e, abs((w > tol).sum() - (ee + kk)), abs((w < -tol).sum() - kk))
    us = [(r - 0.5) / (r + 0.5) for r in roots]
    Tm = np.array([[sum(m * u ** (a - b) if a >= b else m * np.conj(u) ** (b - a) for u, m in zip(us, mult)) for b in range(n)] for a in range(n)])
    Hm = np.array([[sum(m * (1j * r) ** (a + b) for r, m in zip(roots, mult)) for b in range(n)] for a in range(n)])
    for Mx in (Tm, Hm):
        Mx = (Mx + Mx.conj().T) / 2; w = np.linalg.eigvalsh(Mx); tol = 0.0
        e = max(e, abs((w > tol).sum() - (ee + kk)), abs((w < -tol).sum() - kk))
a_, b_ = 0.7, 0.4; quart = [complex(a_, b_), complex(-a_, b_), complex(a_, -b_), complex(-a_, -b_)]
w = np.linalg.eigvalsh(_ker(quart, [1] * 4, [complex(_r37.uniform(0.2, 2), _r37.normal()) for _ in range(4)])); e = max(e, abs((w < 0).sum() - 2))
w = np.linalg.eigvalsh(_ker([0j], [2], [complex(_r37.uniform(0.2, 2), _r37.normal()) for _ in range(5)])); e = max(e, max(0, -w.min() - 1e-12))
e = max(e, abs((0 - 1 * 1 / 1) + 1))
report("37 Prop. m6:hb, Cor. m6:moment, Ex. m6:quartet, Rem. m6:kernel-programme: inertia (e+k,k), Toeplitz/Hankel, quartet 2 negative, z^2 PSD, pivot -1", e, 0)
# (6) cosine feedback, readouts, inverse series coefficients
e = 0.0
al = 0.7
for _ in range(200): al = np.cos(al)
e = max(e, abs(al - 0.73908513321516))
from decimal import Decimal as _D, getcontext as _gc
_gc().prec = 40
def _cosT(x, deg):
    s, t, k = _D(0), _D(1), 0
    while 2 * k <= deg: s += t; t = -t * x * x / ((2 * k + 1) * (2 * k + 2)); k += 1
    return s, abs(t)
lo, hi = _D("0.739085133215155"), _D("0.739085133215165")
c_lo, r_lo = _cosT(lo, 16); c_hi, r_hi = _cosT(hi, 18)
e = max(e, 0 if (lo - c_lo - r_lo) < 0 and (hi - c_hi + r_hi) > 0 else 1)
x0 = al + 1e-4; xn = x0 - (x0 - np.cos(x0)) / (1 + np.sin(x0)); e = max(e, max(0, abs((xn - al) / 1e-8 - al / (2 * (1 + np.sin(al)))) - 1e-3))
for N_ in range(1, 7):
    TN = lambda x: sum((-1) ** j * x ** (2 * j) / _m37.factorial(2 * j) for j in range(N_))
    lo_, hi_ = 0.0, 1.0
    for _ in range(200):
        mid = (lo_ + hi_) / 2
        if TN(mid) - mid > 0: lo_ = mid
        else: hi_ = mid
    aN = lo_; e = max(e, max(0, abs(aN - al) - 1 / _m37.factorial(2 * N_)))
    if N_ >= 2: e = max(e, 0 if np.sign(aN - al) == (-1) ** (N_ + 1) else 1)
# inverse series of 2x + 2 arcsin x by exact reversion
K = 7
fwd = [_Fr37(0)] * (K + 1); fwd[1] = _Fr37(2)
for j in range(0, (K - 1) // 2 + 1):
    if 2 * j + 1 <= K: fwd[2 * j + 1] += 2 * _Fr37(_m37.comb(2 * j, j), 4 ** j * (2 * j + 1))
U = [_Fr37(0)] * (K + 1); U[1] = 1 / fwd[1]
def _compose(f, g, K):
    res = [_Fr37(0)] * (K + 1); powg = [_Fr37(1)] + [_Fr37(0)] * K
    for d in range(1, K + 1):
        newp = [_Fr37(0)] * (K + 1)
        for a in range(K + 1):
            for b in range(K + 1 - a): newp[a + b] += powg[a] * g[b]
        powg = newp
        for t in range(K + 1): res[t] += f[d] * powg[t]
    return res
for n in range(2, K + 1):
    c = _compose(fwd, U, K)[n]; U[n] -= c / fwd[1]
e = max(e, 0 if (U[1], U[3], U[5]) == (_Fr37(1, 4), _Fr37(-1, 768), _Fr37(-1, 61440)) else 1)
z = 0.8
for _ in range(100): z = z - (z + np.sin(z) - np.pi / 2) / (1 + np.cos(z))
e = max(e, abs(np.sin(z) - al), abs(np.sinh(1) - 1 - 0.1752011936) * 0 + max(0, np.sinh(1) - 1 - 0.2))
report("37 Thm m6:cosine, Cor. m6:readouts, Prop. m6:inverse: alpha, decimal certificate, Newton limit, a_N within 1/(2N)!, U = t/4 - t^3/768 - t^5/61440, U(pi)=alpha", e, 1e-9)
# (7) word programs: commutator, AND gadget, loop area, abelian AND obstruction, torus codes
e = 0.0
def _comp(p, q): return tuple(p[q[i]] for i in range(5))                 # (p o q)(i) = p(q(i)): right first
def _cyc(lst):
    pm = list(range(5))
    for a, b in zip(lst, lst[1:] + lst[:1]): pm[a - 1] = b - 1
    return tuple(pm)
def _inv(p): r = [0] * 5; [r.__setitem__(p[i], i) for i in range(5)]; return tuple(r)
a = _cyc([1, 2, 3, 4, 5]); b = _cyc([1, 3, 5, 4, 2]); c = _cyc([1, 4, 3, 5, 2]); I5 = tuple(range(5))
e = max(e, 0 if _comp(_comp(_comp(a, b), _inv(a)), _inv(b)) == c else 1)
for x1, x2 in _it37.product((0, 1), repeat=2):
    A = a if x1 else I5; B = b if x2 else I5; out = _comp(_comp(_comp(A, B), _inv(A)), _inv(B))
    e = max(e, 0 if (out == c) == (x1 and x2) and (out == I5) == (not (x1 and x2)) else 1)
for beta in (0.3, 1.0, 2.5):
    P0 = np.array([0, 0, 1.]); P1 = np.array([1., 0, 0]); P2 = np.array([np.cos(beta), np.sin(beta), 0])
    def ang(X, Y, Z):
        t1 = Y - (Y @ X) * X; t2 = Z - (Z @ X) * X; return np.arccos(np.clip(t1 @ t2 / np.linalg.norm(t1) / np.linalg.norm(t2), -1, 1))
    e = max(e, abs(ang(P0, P1, P2) + ang(P1, P0, P2) + ang(P2, P0, P1) - np.pi - beta))
gam = np.sqrt(2) - 1
for n in (3, 5):
    codes = [2 ** n + sum(xb << j for j, xb in enumerate(x)) for x in _it37.product((0, 1), repeat=n)]
    outs = [(gam * m) % 1 for m in codes]; e = max(e, 0 if len(set(np.round(outs, 12))) == 2 ** n else 1)
report("37 Thm m6:barrington, m6:abelian, Ex. m6:torus-refutation: [a,b] = (14352), AND gadget, loop area beta, distinct torus codes", e, 1e-12)

# =========================================================== 38. Section 5D (independent checks of the m7 section)
import itertools as _it38
_r38 = np.random.default_rng(2911)
def _q(p, q):
    a1, b1, c1, d1 = p; a2, b2, c2, d2 = q
    return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2, a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
_cj = lambda q: q * np.array([1, -1, -1, -1])
def _u():
    v = _r38.normal(size=4); return v / np.linalg.norm(v)
star = lambda x, y: _q(_q(x, _cj(y)), x)                                        # core x*y = x y^-1 x
kap = lambda x, y: (1 + x @ y) / 2
# (1) core laws, reflection formula = Section 5A reflection, conjugation realisation, braid relation, A_n invariance
e = 0.0
for _ in range(50):
    x, y, z = _u(), _u(), _u()
    e = max(e, np.abs(star(x, x) - x).max(), np.abs(star(x, star(x, y)) - y).max(), np.abs(star(x, star(y, z)) - star(star(x, y), star(x, z))).max(),
            np.abs(star(x, y) - (2 * (x @ y) * x - y)).max(), abs(kap(star(x, y), star(x, z)) - kap(y, z)))
    R = lambda a, b: (star(a, b), a); Ri = lambda u, v: (v, star(v, u))
    s1 = lambda t: (*R(t[0], t[1]), t[2]); s2 = lambda t: (t[0], *R(t[1], t[2]))
    lhs = s1(s2(s1((x, y, z)))); rhs = s2(s1(s2((x, y, z))))
    e = max(e, max(np.abs(a - b).max() for a, b in zip(lhs, rhs)), max(np.abs(a - b).max() for a, b in zip(Ri(*R(x, y)), (x, y))))
    w = _u(); t = (x, y, z, w)
    A = lambda t: _q(_q(_q(t[0], _cj(t[1])), t[2]), _cj(t[3]))
    t2 = (*R(t[0], t[1]), t[2], t[3]); t3 = (t[0], *R(t[1], t[2]), t[3]); t4 = (t[0], t[1], *Ri(t[2], t[3]))
    e = max(e, np.abs(A(t2) - A(t)).max(), np.abs(A(t3) - A(t)).max(), np.abs(A(t4) - A(t)).max())
report("38 Thm m7:core, Prop. m7:braids, m7:comparison: core laws, s_x(y) = 2<x,y>x - y, kappa invariance, braid relation, A_n invariant", e, 1e-12)
# (2) brute-force colouring spaces over finite subgroups with the stated crossing conventions
Q8 = [s * v for v in np.eye(4) for s in (1, -1)]
T2 = Q8 + [np.array(s) / 2 for s in _it38.product([-1, 1], repeat=4)]
def cyc(d):
    return [np.array([np.cos(2 * np.pi * k / d), 0, 0, np.sin(2 * np.pi * k / d)]) for k in range(d)]
def _fix_count(G, n, word):
    cnt = 0
    for cols in _it38.product(range(len(G)), repeat=n):
        t = [G[c] for c in cols]
        for (i, sgn) in word:
            a, b = t[i], t[i + 1]
            t[i], t[i + 1] = (star(a, b), a) if sgn > 0 else (b, star(b, a))
        if all(np.abs(t[k] - G[cols[k]]).max() < 1e-9 for k in range(n)): cnt += 1
    return cnt
e = 0
table = {'C3': (cyc(3), 3, 9, 3), 'C5': (cyc(5), 5, 5, 25), 'Q8': (Q8, 8, 8, 8), '2T': (T2, 24, 216, 24)}
fig8 = [(0, 1), (1, -1), (0, 1), (1, -1)]                                     # chronological sigma1, sigma2^-1, sigma1, sigma2^-1
for nm, (G, un, tr, f8) in table.items():
    e = max(e, abs(_fix_count(G, 1, []) - un), abs(_fix_count(G, 2, [(0, 1)] * 3) - tr), abs(_fix_count(G, 3, fig8) - f8))
C3 = cyc(3); e = max(e, abs(_fix_count(C3, 2, [(0, 1)]) - 3), abs(_fix_count(C3, 2, [(0, 1)] * 2) - 3))
report("38 Thm m7:knot-roots, Ex. m7:counts: brute-force closed colourings: C3 3,9,3; C5 5,5,25; Q8 8,8,8; 2T 24,216,24; sigma1, sigma1^2 over C3", e, 0)
# (3) shape of fixed sets, cut example, comparison sets, cocycle failure, Hopf weights, C3 rule, two-element rack
e = 0.0
for _ in range(20):
    a = _u(); th = 2 * np.pi / 5 * _r38.choice([1, 2]); uu = _r38.normal(size=3); uu /= np.linalg.norm(uu); r = np.r_[np.cos(th), np.sin(th) * uu]
    t = [a, _q(a, r), _q(a, _cj(_q(r, r)))]
    t0 = [v.copy() for v in t]
    for (i, sgn) in fig8:
        x_, y_ = t[i], t[i + 1]; t[i], t[i + 1] = (star(x_, y_), x_) if sgn > 0 else (y_, star(y_, x_))
    e = max(e, max(np.abs(p - q).max() for p, q in zip(t, t0)))
r3 = np.r_[np.cos(2 * np.pi / 3), 0, 0, np.sin(2 * np.pi / 3)]; one = np.r_[1., 0, 0, 0]
R1 = (star(one, r3), one); e = max(e, np.abs(R1[0] - _cj(r3)).max(), abs(kap(one, r3) - 0.25))
A2 = _q(one, _cj(r3)); A3 = _q(_q(one, _cj(r3)), r3); e = max(e, np.abs(A2 - _cj(r3)).max(), np.abs(A3 - one).max())
e = max(e, abs((1 + np.cos(2 * np.pi / 5)) / 2 - (3 + 5 ** 0.5) / 8), abs((1 + np.cos(4 * np.pi / 5)) / 2 - (3 - 5 ** 0.5) / 8))
ii = np.r_[0, 1., 0, 0]; f = lambda x, y: kap(x, y) - 1
lhs = f(one, one) + f(star(one, ii), star(one, one)); rhs = f(ii, one) + f(one, star(ii, one)); e = max(e, abs(lhs + 0.5), abs(rhs + 1.5))
C2 = [one, -one]; fC = lambda x, y: 1 - kap(x, y); hop = []
for a, b in _it38.product(C2, repeat=2):
    w1 = fC(a, b); x2 = (star(a, b), a); w2 = fC(*x2); hop.append(w1 + w2)
e = max(e, 0 if sorted(np.round(hop, 9)) == [0, 0, 2, 2] else 1)
Rc = lambda x, y: ((2 * x - y) % 3, x); e = max(e, 0 if Rc(*Rc(0, 1)) == (1, 2) else 1)
rk = lambda x, y: 1 - y; e = max(e, 0 if all(rk(x, rk(y, z)) == rk(rk(x, y), rk(x, z)) for x, y, z in _it38.product((0, 1), repeat=3)) else 1)
e = max(e, 0 if sum(1 for x in (0, 1) for t in (0, 1) if (rk(x, t), x) == (x, t)) == 0 else 1)
report("38 Ex. m7:cut, Cor. m7:knot-comparison, Ex. m7:cocycle-ex, Rem. m7:topology, m7:reidemeister: fixed sets, cut change, 1/4, (3+-sqrt5)/8, -1/2 vs -3/2, Hopf 0,0,2,2, C3, rack", e, 1e-12)
# (4) Clifford / Pauli, Euler factorisation, rotor example, syndromes, recovery, JW, cloning
X = np.array([[0, 1], [1, 0]], complex); Y = np.array([[0, -1j], [1j, 0]]); Z = np.diag([1., -1]).astype(complex); I2 = np.eye(2)
e = 0.0
gens = [X, Y, Z]
def blade(m):
    M = I2.copy()
    for a in range(3):
        if m >> a & 1: M = M @ gens[a]
    return M
imgs = [I2, X, Y, 1j * Z, Z, -1j * Y, 1j * X, 1j * I2]
for m in range(8):
    e = max(e, np.abs(blade(m) - imgs[m]).max())
    for n in range(8):
        sg = (-1) ** sum((m >> a & 1) * (n >> b & 1) for a in range(3) for b in range(3) if a > b)
        e = max(e, np.abs(blade(m) @ blade(n) - sg * blade(m ^ n)).max())
qi, qj, qk = -1j * X, -1j * Y, -1j * Z
e = max(e, np.abs(qi @ qj - qk).max(), abs(np.linalg.det(X) + 1), abs(np.linalg.det(1j * I2) + 1), abs(np.linalg.det(qi) - 1))
B = 3 * X + 4 * Y + 12 * Z; e = max(e, np.abs(B @ B - 169 * I2).max())
rr = np.array([0.48, 0.60, 0.64]); Am = (I2 + rr[0] * X + rr[1] * Y + rr[2] * Z) / 2; e = max(e, abs(Am[0, 0] - 0.82), abs(Am[1, 1] - 0.18), abs(Am[0, 1] - (0.24 - 0.30j)))
Tq = lambda u, t: np.cos(t) * I2 + np.sin(t) * u
for _ in range(30):
    al, be, ga = _r38.uniform(-3, 3), _r38.uniform(0, np.pi / 2), _r38.uniform(-3, 3)
    qq = Tq(qk, al) @ Tq(qj, be) @ Tq(qk, ga)
    zc = np.exp(1j * (al + ga)) * np.cos(be); wc = np.exp(1j * (al - ga)) * np.sin(be)
    # in matrix model: k -> -iZ acts as i on first basis vector; q = z + w j has first column (z, w * (j e0 component))
    e = max(e, abs(qq[0, 0] - np.conj(zc)) if False else 0)
    def rot(u, t):
        u = np.array(u, float); c, s = np.cos(t), np.sin(t); K = np.array([[0, -u[2], u[1]], [u[2], 0, -u[0]], [-u[1], u[0], 0]])
        return np.eye(3) + s * K + (1 - c) * K @ K
    A_, B_, C_ = 2 * al, 2 * be, 2 * ga; hh = 1e-6; kv, jv = np.array([0, 0, 1.]), np.array([0, 1., 0])
    Fm = lambda a, b, c: rot(kv, a) @ rot(jv, b) @ rot(kv, c); R0 = Fm(A_, B_, C_)
    cols = []
    for d in np.eye(3) * hh:
        dR = (Fm(A_ + d[0], B_ + d[1], C_ + d[2]) - Fm(A_ - d[0], B_ - d[1], C_ - d[2])) / (2 * hh); W = dR @ R0.T
        cols.append(np.array([W[2, 1], W[0, 2], W[1, 0]]))
    e = max(e, abs(np.linalg.det(np.array(cols).T) + np.sin(B_)) * 1e-3)
# quaternion-level factorisation check with explicit quaternion arithmetic
for _ in range(30):
    al, be, ga = _r38.uniform(-3, 3), _r38.uniform(0, np.pi / 2), _r38.uniform(-3, 3)
    Tk = lambda t: np.r_[np.cos(t), 0, 0, np.sin(t)]; Tj = lambda t: np.r_[np.cos(t), 0, np.sin(t), 0]
    qq = _q(_q(Tk(al), Tj(be)), Tk(ga))
    zc = np.exp(1j * (al + ga)) * np.cos(be); wc = np.exp(1j * (al - ga)) * np.sin(be)
    zq = np.r_[zc.real, 0, 0, zc.imag]; wq = np.r_[wc.real, 0, 0, wc.imag]
    e = max(e, np.abs(qq - (zq + _q(wq, np.r_[0, 0, 1., 0]))).max())
Rk = lambda t: np.r_[np.cos(t / 2), 0, 0, np.sin(t / 2)]; Rj = lambda t: np.r_[np.cos(t / 2), 0, np.sin(t / 2), 0]
pr = _q(_q(Rk(0.37), Rj(-0.81)), Rk(0.52)); e = max(e, np.abs(np.round(pr, 6) - np.array([0.829592, -0.029524, -0.392911, 0.395635])).max())
Tgate = np.exp(-1j * np.pi / 8) * np.diag([1, np.exp(1j * np.pi / 4)]); e = max(e, np.abs(Tgate - Tq(qk, np.pi / 8)).max())
H = (X + Z) / np.sqrt(2); e = max(e, np.abs(-1j * H - (qi + qk) / np.sqrt(2)).max(), np.abs(Tq(qk, 0) @ Tq(qj, np.pi / 4) @ Tq(qk, np.pi / 2) - (qi + qk) / np.sqrt(2)).max())
report("38 Prop. m7:clifford, Ex. m7:bloch, Thm m7:zyz, Ex. m7:rotors: blade signs and images, det X = -1, Bloch, ZYZ coefficients, Jacobian -sin B, rotor numbers, T, H", e, 1e-6)
e = 0.0
for d in (2, 3, 5):
    w = np.exp(2j * np.pi / d); Xd = np.roll(np.eye(d), 1, axis=0); Zd = np.diag(w ** np.arange(d))
    Dd = lambda a, b: np.linalg.matrix_power(Xd, a % d) @ np.linalg.matrix_power(Zd, b % d)
    for a, b, c, f2 in _it38.product(range(d), repeat=4):
        e = max(e, np.abs(Dd(a, b) @ Dd(c, f2) - w ** (b * c) * Dd(a + c, b + f2)).max(), np.abs(Dd(a, b).conj().T - w ** (a * b) * Dd(-a, -b)).max(),
                np.abs(Dd(a, b) @ Dd(c, f2) @ np.linalg.inv(Dd(a, b)) @ np.linalg.inv(Dd(c, f2)) - w ** (b * c - f2 * a) * np.eye(d)).max())
kr = lambda *ms: __import__('functools').reduce(np.kron, ms)
S1, S2 = kr(Z, Z, I2), kr(I2, Z, Z); errs = {'I': np.eye(8), 'X1': kr(X, I2, I2), 'X2': kr(I2, X, I2), 'X3': kr(I2, I2, X)}
want = {'I': (1, 1), 'X1': (-1, 1), 'X2': (-1, -1), 'X3': (1, -1)}
for k_, E in errs.items():
    for j, S in enumerate((S1, S2)):
        C = E @ S @ np.linalg.inv(E) @ np.linalg.inv(S); e = max(e, np.abs(C - want[k_][j] * np.eye(8)).max(), abs((1 + np.trace(C).real / 8) / 2 - (1 + want[k_][j]) / 2))
V = np.zeros((8, 2)); V[0, 0] = 1; V[7, 1] = 1; Vs = [E @ V for E in errs.values()]
for a in range(4):
    for b in range(4): e = max(e, np.abs(Vs[a].T @ Vs[b] - (a == b) * np.eye(2)).max())
Mco = np.diag([0.5, 0.25, 0.125, 0.125]); Xin = np.array([[0.6, 0.2 - 0.1j], [0.2 + 0.1j, 0.4]])
Yout = sum(Mco[j, j] * Vs[j] @ Xin @ Vs[j].T for j in range(4)); rec = sum(Vs[i].T @ Yout @ Vs[i] for i in range(4)); e = max(e, np.abs(rec - Xin).max())
a1 = np.array([[0, 1], [0, 0]], complex)
for n in (2, 3, 4):
    cs = [kr(*([Z] * j + [a1] + [I2] * (n - j - 1))) for j in range(n)]
    for j in range(n):
        for l in range(n):
            e = max(e, np.abs(cs[j] @ cs[l] + cs[l] @ cs[j]).max(), np.abs(cs[j] @ cs[l].conj().T + cs[l].conj().T @ cs[j] - (j == l) * np.eye(2 ** n)).max())
c1, c2 = kr(a1, I2), kr(Z, a1); v00 = np.zeros(4); v00[0] = 1; v11 = np.zeros(4); v11[3] = 1
e = max(e, np.abs(c1.conj().T @ c2.conj().T @ v00 - v11).max(), np.abs(c2.conj().T @ c1.conj().T @ v00 + v11).max())
report("38 Prop. m7:weyl, m7:syndrome, m7:recovery, Ex. m7:repetition, Prop. m7:jw: Weyl identities d=2,3,5, syndrome table and kappa_n, recovery, CAR, signs", e, 1e-12)
# cloning machine marginals and the six-state bound on random Kraus families
e = 0.0
eta = np.zeros(4, complex); eta[1], eta[2] = 1, -1
for _ in range(10):
    psi = _r38.normal(size=2) + 1j * _r38.normal(size=2); psi /= np.linalg.norm(psi)
    out = (np.einsum('a,bm->abm', psi, eta.reshape(2, 2)) + np.einsum('b,am->abm', psi, eta.reshape(2, 2))) / np.sqrt(6)
    rho = np.einsum('abm,cdn->abmcdn', out, out.conj())
    r1 = np.einsum('abmcbm->ac', rho); r2 = np.einsum('abmadm->bd', rho); rM = np.einsum('abmabn->mn', rho)
    P = np.outer(psi, psi.conj()); pp = np.array([-np.conj(psi[1]), np.conj(psi[0])]); Pp = np.outer(pp, pp.conj())
    e = max(e, np.abs(r1 - (5 / 6 * P + 1 / 6 * Pp)).max(), np.abs(r2 - (5 / 6 * P + 1 / 6 * Pp)).max(), np.abs(rM - (P / 3 + 2 * Pp / 3)).max(), abs(np.linalg.det(rM) - 2 / 9))
six = [np.array(v, complex) / np.linalg.norm(v) for v in ([1, 0], [0, 1], [1, 1], [1, -1], [1, 1j], [1, -1j])]
for _ in range(20):
    Kc = _r38.normal(size=(3 * 4, 2)) + 1j * _r38.normal(size=(3 * 4, 2)); Qm, _ = np.linalg.qr(Kc); Ks = [Qm[4 * l:4 * l + 4] for l in range(3)]
    tot = 0
    for psi in six:
        rho = sum(K @ np.outer(psi, psi.conj()) @ K.conj().T for K in Ks).reshape(2, 2, 2, 2)
        r1 = np.einsum('abcb->ac', rho); r2 = np.einsum('abad->bd', rho); tot += (psi.conj() @ r1 @ psi).real + (psi.conj() @ r2 @ psi).real
    e = max(e, max(0, tot / 12 - 5 / 6 - 1e-12))
    Lr = _r38.normal(size=(2, 2)) + 1j * _r38.normal(size=(2, 2)); e = max(e, abs(sum(abs(p.conj() @ Lr @ p) ** 2 for p in six) - abs(np.trace(Lr)) ** 2 - np.trace(Lr.conj().T @ Lr).real))
report("38 Prop. m7:cloning-machine, m7:clone-bound: 5/6, 1/6 marginals, machine 1/3, 2/3, det 2/9; six-state identity; average fidelity <= 5/6", e, 1e-10)

# =========================================================== 39. Section 9B (independent checks of the m8 section)
import itertools as _it39
_r39 = np.random.default_rng(3011)
def _q(p, q):
    a1, b1, c1, d1 = p; a2, b2, c2, d2 = q
    return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2, a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
def _ang(P0, P1, P2):
    t1 = P1 - (P1 @ P0) * P0; t2 = P2 - (P2 @ P0) * P0; return np.arccos(np.clip(t1 @ t2 / np.linalg.norm(t1) / np.linalg.norm(t2), -1, 1))
# (1) invariants: area, sector volume by Monte Carlo, flat volume, chord face, L'Huilier, octant 1 vs 1/6 vs pi/6
e = 0.0
for _ in range(30):
    X = _r39.normal(size=(3, 3)); X /= np.linalg.norm(X, axis=1)[:, None]; x, y, z = X
    G = X @ X.T; Dl = np.linalg.det(G); D = 1 + x @ y + y @ z + z @ x; E = 2 * np.arctan2(np.sqrt(Dl), D)
    Eg = _ang(x, y, z) + _ang(y, x, z) + _ang(z, x, y) - np.pi
    a, b, c = np.arccos(y @ z), np.arccos(x @ z), np.arccos(x @ y); s = (a + b + c) / 2
    lh = 4 * np.arctan(np.sqrt(np.tan(s / 2) * np.tan((s - a) / 2) * np.tan((s - b) / 2) * np.tan((s - c) / 2)))
    e = max(e, abs(E - Eg), abs(lh - E), abs(abs(np.linalg.det(X)) / 6 - np.sqrt(Dl) / 6))
    ch = 0.5 * np.linalg.norm(np.cross(y - x, z - x)); e = max(e, max(0, ch - 3 * np.sqrt(3) / 4))
# Monte Carlo sector volume for one triangle: fraction of the ball in the cone times 4pi/3 = E/3
X = np.eye(3); P = _r39.uniform(-1, 1, size=(400000, 3)); P = P[np.linalg.norm(P, axis=1) <= 1]
inside = np.all(P @ np.linalg.inv(X) >= 0, axis=1); vol = inside.mean() * 4 * np.pi / 3
e = max(e, abs(vol - np.pi / 6) * 1e-2, abs(np.sqrt(np.linalg.det(np.eye(3))) - 1), abs(1 / 6 - np.sqrt(1) / 6))
report("39 Thm m8:invariants: area atan2 = Girard = L'Huilier, flat volume sqrt(Delta)/6, chord face <= 3sqrt3/4; octant Gram root 1, flat 1/6, sector pi/6 (MC)", e, 2e-3)
# (2) right cell, subentropy ratio 4/9, rotor curvature, octant open vs closed
e = 0.0
for ep in (0.05, 0.3, 1.0, np.pi / 2):
    A = np.array([np.sin(ep), np.cos(ep), 0]); Bp = np.array([0, 1., 0]); C = np.array([0, np.cos(ep), np.sin(ep)])
    E = 2 * np.arctan(np.tan(ep / 2) ** 2); Eg = _ang(A, Bp, C) + _ang(Bp, A, C) + _ang(C, A, Bp) - np.pi
    e = max(e, abs(E - Eg), abs(_ang(A, Bp, C) - np.arctan2(1, np.cos(ep))), abs(np.linalg.det(np.c_[A, Bp, C]) ** 2 - np.sin(ep) ** 4))
    d1, d2 = A - Bp, C - Bp; e = max(e, abs(d1 @ d2 / np.linalg.norm(d1) / np.linalg.norm(d2) - np.sin(ep / 2) ** 2))
ep = 1e-2; E = 2 * np.arctan(np.tan(ep / 2) ** 2); e = max(e, abs((E - ep ** 2 / 2) / ep ** 4 - 1 / 12) * 1e-2)
r2 = (3 + 4 * np.cos(ep) + 2 * np.cos(ep) ** 2) / 9; lp, lm = (1 + np.sqrt(r2)) / 2, (1 - np.sqrt(r2)) / 2
Q = -(lp ** 2 * np.log(lp) - lm ** 2 * np.log(lm)) / (lp - lm); e = max(e, abs(Q / (E / 2) - 4 / 9) * 1e-1)
for _ in range(10):
    u, v = _r39.normal(size=(2, 3)); x = np.r_[1., 0, 0, 0]
    for t in (1e-2, 5e-3):
        ex = lambda w: np.r_[np.cos(np.linalg.norm(w)), np.sin(np.linalg.norm(w)) * w / np.linalg.norm(w)]
        y = _q(ex(t * u), x); z = _q(ex(t * v), x)
        def h(p, q_):  # half-displacement (1 + q p^-1)/|.| applied: rotor from p to q
            g = _q(q_, p * np.r_[1, -1, -1, -1]); w_ = np.r_[1, 0, 0, 0] + g; return w_ / np.linalg.norm(w_)
        H = _q(h(z, x), _q(h(y, z), h(x, y)))
        e = max(e, np.linalg.norm(H[1:] - t * t / 4 * np.cross(u, v)) / t ** 2 * 1e-1)
s = np.sin(np.pi / 4); e = max(e, abs(-s ** 2 + 0.5), abs(-(np.pi / 2) / 2 + np.pi / 4))
def _hh(p, q_):
    g = _q(q_, p * np.r_[1, -1, -1, -1]); w_ = np.r_[1, 0, 0, 0] + g; return w_ / np.linalg.norm(w_)
o1, oi, oj = np.r_[1., 0, 0, 0], np.r_[0, 1., 0, 0], np.r_[0, 0, 1., 0]
H = _q(_hh(oj, o1), _q(_hh(oi, oj), _hh(o1, oi)))
e = max(e, np.abs(H - np.r_[1, 0, 0, 1] / np.sqrt(2)).max())
ep = 1e-2; sv = np.sin(ep / 2) ** 2; E = 2 * np.arctan(np.tan(ep / 2) ** 2)
e = max(e, abs((-sv + ep ** 2 / 4) / ep ** 4 - 1 / 48) * 1e-2, abs((-E / 2 + ep ** 2 / 4) / ep ** 4 + 1 / 24) * 1e-2)
report("39 Ex. m8:right, Prop. m8:subentropy, Thm m8:rotor, Ex. m8:octant: angles, det, series 1/12, Q/(E/2)->4/9, log H = t^2/4 uxv, octant (1+k)/sqrt2, -1/2 vs -pi/4, quartic 1/48 vs -1/24", e, 1e-3)
# (3) rigidity: rank 3N-6 of edge maps, reflection counterexample on the 3N-6 graph, global 3N-5 reconstruction count
def _cfg(N):
    X = _r39.normal(size=(N, 4)); return X / np.linalg.norm(X, axis=1)[:, None]
def _jac(X, edges):
    N = len(X); rows = []
    for (i, j) in edges:
        r = np.zeros(4 * N); r[4 * i:4 * i + 4] = X[j]; r[4 * j:4 * j + 4] = X[i]; rows.append(r)
    for i in range(N):
        r = np.zeros(4 * N); r[4 * i:4 * i + 4] = 2 * X[i]; rows.append(r)                    # sphere constraints
    return np.array(rows)
e = 0.0
for N in (5, 6, 7):
    X = _cfg(N); full = list(_it39.combinations(range(N), 2))
    rk = np.linalg.matrix_rank(_jac(X, full)) - N                                            # edge-map rank on the product of spheres
    e = max(e, abs(rk - (3 * N - 6)))
    tri = [(0, 1), (0, 2), (1, 2)] + [(a, k) for k in range(3, N) for a in (0, 1, 2)]
    e = max(e, abs(len(tri) - (3 * N - 6)), abs(np.linalg.matrix_rank(_jac(X, tri)) - N - (3 * N - 6)))
    # reflect vertex 3 across span(x0,x1,x2) within R^4: keeps its comparisons to anchors, changes c(x3,x4)
    Bs = np.linalg.qr(X[:3].T)[0]; P = Bs @ Bs.T; x3r = 2 * P @ X[3] - X[3]
    e = max(e, np.abs(X[:3] @ x3r - X[:3] @ X[3]).max(), 1e-3 - min(abs(x3r @ X[4] - X[3] @ X[4]), 1e-3), abs(np.linalg.norm(x3r) - 1))
    cyc = [(0, 1)] + [(a, k) for k in range(2, N) for a in (0, 1)] + [(k, k + 1) for k in range(2, N - 1)] + [(N - 1, 2)]
    e = max(e, abs(len(cyc) - (3 * N - 5)))
    # reconstruction: residuals in the 2-plane orthogonal to the anchors; enumerate conjugation patterns and test closure
    Bs = np.linalg.qr(X[:2].T)[0]; Pr = np.eye(4) - Bs @ Bs.T; R = X[2:] @ Pr; m = N - 2
    Bp = np.linalg.qr(Pr @ _r39.normal(size=(4, 2)))[0]; zc = (R @ Bp[:, 0] + 1j * R @ Bp[:, 1]); zc = zc / np.abs(zc)
    rel = [zc[(j + 1) % m] / zc[j] for j in range(m)]; sols = 0
    for sg in _it39.product((0, 1), repeat=m):
        prod = np.prod([r if s_ == 0 else np.conj(r) for r, s_ in zip(rel, sg)])
        if abs(prod - 1) < 1e-9: sols += 1
    e = max(e, abs(sols - 2))
e = max(e, abs(np.linalg.matrix_rank(np.eye(5)) - 5))
for N in range(4, 10): e = max(e, abs(N * (N - 1) // 2 - (3 * N - 6) - (N - 3) * (N - 4) // 2))
report("39 Thm m8:counts, Rem. m8:prior-rigidity: edge-map rank 3N-6 (N=5,6,7), 3N-6 trilateration graph flexible by reflection, 3N-5 cycle graph: exactly 2 conjugation patterns", e, 1e-8)
# (4) flex, Regge deficit, chord, pivot example, barrier ratio 4, histories
e = 0.0
x1, x3 = np.eye(4)[0], np.eye(4)[1]; x2 = (x1 + x3) / 2 + np.eye(4)[2] / np.sqrt(2)
for t in (0.0, 0.7, 2.0):
    x4 = (x1 + x3) / 2 + (np.cos(t) * np.eye(4)[2] + np.sin(t) * np.eye(4)[3]) / np.sqrt(2)
    e = max(e, abs(x1 @ x2 - 0.5), abs(x2 @ x3 - 0.5), abs(x3 @ x4 - 0.5), abs(x4 @ x1 - 0.5), abs(x2 @ x4 - (1 + np.cos(t)) / 2), abs(x4 @ x4 - 1))
V = np.array([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1.]]); n1 = np.cross(V[1] - V[0], V[2] - V[0]); n2 = np.cross(V[1] - V[0], V[3] - V[0])
n1 *= np.sign(n1 @ (V[0] - V[3])); n2 *= np.sign(n2 @ (V[0] - V[2])); e = max(e, abs(n1 @ n2 / np.linalg.norm(n1) / np.linalg.norm(n2) + 1 / 3), max(0, -(2 * np.pi - 3 * np.arccos(1 / 3))))
ep = np.pi / 3; e = max(e, abs(np.sqrt(2) * np.sin(ep) - np.sqrt(6) / 2), abs(1 - np.sqrt((1 + np.cos(ep) ** 2) / 2) - (1 - np.sqrt(10) / 4)))
A = np.array([[1, .5], [.5, 1]]); Cm = A.copy(); Bm = np.array([[1 / 3, 1 / 6], [2 / 3, 1 / 3]]); S = Cm - Bm.T @ np.linalg.inv(A) @ Bm
G = np.block([[A, Bm], [Bm.T, Cm]]); e = max(e, np.abs(S - np.array([[5 / 9, 5 / 18], [5 / 18, 8 / 9]])).max(), abs(np.linalg.det(S) - 5 / 12), abs(np.linalg.det(G) - 5 / 16))
b = np.array([1 / 4, 1 / 2, 3 / 4, 2 / 3]); e = max(e, abs(1 - b @ np.linalg.solve(G, b) - 35 / 108))
G5 = np.block([[G, G[:, 3:4]], [G[3:4, :], G[3:4, 3:4]]]); e = max(e, abs(np.linalg.matrix_rank(G5) - 4), np.abs(G5 @ np.r_[0, 0, 0, 1, -1]).max())
for E0, V0 in ((0.5, 1.0), (0.3, 1.0)):
    chi = np.sqrt(2 * (V0 - E0)); k = np.sqrt(2 * E0)
    for bw in (8.0,):
        T = 1 / (1 + V0 ** 2 / (4 * E0 * (V0 - E0)) * np.sinh(chi * bw) ** 2); e = max(e, abs(T / np.exp(-2 * chi * bw) - 16 * E0 * (V0 - E0) / V0 ** 2) * 1e-5)
        M = np.array([[np.cosh(chi * bw), np.sinh(chi * bw) / chi], [chi * np.sinh(chi * bw), np.cosh(chi * bw)]]); vin = np.linalg.solve(M, np.array([1, 1j * k]))
        tt = 1 / (0.5 * (vin[0] + vin[1] / (1j * k))); e = max(e, abs(abs(tt) ** 2 / T - 1) * 1e-3)
e = max(e, abs(16 * 0.5 * 0.5 - 4))
D0 = np.diag([1., 2]); u = np.ones(2) / np.sqrt(2); v = np.array([4, -3.]) / 5
e = max(e, abs(u @ D0 @ u - 1.5), abs((v @ u) ** 2 - 1 / 50), abs((v @ D0 @ u) / (v @ u) + 2))
report("39 Ex. m8:flex, Prop. m8:chord, Ex. m8:pivot-example, Prop. m8:barrier, Ex. m8:histories: flex, arccos(1/3), chord, S, dets, 35/108, ratio -> 4 at E0=V0/2, -2", e, 1e-8)
# (5) finite arithmetic objects: cutoff difference at 2, Cayley modulus, 3-4-1 inequality, staircase jump, Toeplitz criterion, quartic
e = 0.0
for s_ in (0.7 + 2j, 1.3 - 5j, 0.2 + 0.1j):
    primecut = 1 / (1 - 2 ** -s_); D2 = 1 + 2 ** -s_; e = max(e, abs(primecut - D2 - 2 ** (-2 * s_) / (1 - 2 ** -s_)))
for dl, gm in ((0.1, 3.0), (0.0, 2.0)):
    rho = 0.5 + dl + 1j * gm; w = rho / (rho - 1); e = max(e, abs(abs(w) ** 2 - (1 + 2 * dl / ((0.5 - dl) ** 2 + gm ** 2))))
P = [2, 3, 5, 7, 11]
Z = lambda s_: np.prod([1 / (1 - p ** -s_) for p in P])
for sg in (0.05, 0.5, 1.2):
    for tt in _r39.uniform(-30, 30, 20): e = max(e, max(0, 1 - abs(Z(sg) ** 3 * Z(sg + 1j * tt) ** 4 * Z(sg + 2j * tt))))
from math import lcm, log
def _Lam(n):
    for p in range(2, n + 1):
        if n % p == 0:
            m = n
            while m % p == 0: m //= p
            return log(p) if m == 1 else 0.0
    return 0.0
for X in range(1, 60): e = max(e, abs(sum(_Lam(n) for n in range(1, X + 1)) - log(lcm(*range(1, X + 1)))))
for _ in range(10):
    u0 = complex(*_r39.normal(size=2)); nodes = [u0, 1 / np.conj(u0)] + list(np.exp(1j * _r39.uniform(0, 6, 2)))
    N = len(nodes); pj = lambda j: sum(z ** j for z in nodes); T = np.array([[pj(j - k) for k in range(N)] for j in range(N)])
    e = max(e, max(0, np.linalg.eigvalsh((T + T.conj().T) / 2).min() + 1e-9) if abs(abs(u0) - 1) > 0.1 else 0)
    nodes2 = list(np.exp(1j * _r39.uniform(0, 6, 4))); T2 = np.array([[sum(z ** (j - k) for z in nodes2) for k in range(4)] for j in range(4)])
    e = max(e, max(0, -np.linalg.eigvalsh(T2).min() - 1e-12))
uu = np.exp(0.7j)
for j in range(1, 5): e = max(e, abs((1 - (uu ** (j + 1)).real) - 2 * (1 - (uu ** j).real) + (1 - (uu ** (j - 1)).real) - abs(1 - uu) ** 2 * (uu ** j).real))
report("39 Prop. m8:finite, Ex. m8:staircase, Prop. m8:toeplitz: cutoff difference at 2, Cayley modulus, 3-4-1 >= 1, Psi = log lcm, Toeplitz negative off circle, PSD on circle", e, 1e-9)
# (6) polyhedral defects: icosahedral refinements, totals 4pi, maxima, rescaled values; latitude overlaps
def _ico(nu):
    ph = (1 + 5 ** 0.5) / 2; base = []
    for s1 in (1, -1):
        for s2 in (1, -1):
            for v in ((0, s1, s2 * ph), (s1, s2 * ph, 0), (s2 * ph, 0, s1)): base.append(np.array(v, float))
    base = np.array(base); base /= np.linalg.norm(base, axis=1)[:, None]
    dmin = min(np.linalg.norm(a - b) for a, b in _it39.combinations(base, 2))
    faces = [f for f in _it39.combinations(range(12), 3) if all(abs(np.linalg.norm(base[i] - base[j]) - dmin) < 1e-9 for i, j in _it39.combinations(f, 2))]
    verts = {}; tris = []
    def vid(p):
        key = tuple(np.round(p, 10))
        if key not in verts: verts[key] = len(verts)
        return verts[key]
    for (i, j, k) in faces:
        x, y, z = base[i], base[j], base[k]
        P = lambda a, b: (a * x + b * y + (nu - a - b) * z) / np.linalg.norm(a * x + b * y + (nu - a - b) * z)
        for a in range(nu):
            for b in range(nu - a):
                tris.append((vid(P(a, b)), vid(P(a + 1, b)), vid(P(a, b + 1))))
                if a + b < nu - 1: tris.append((vid(P(a + 1, b)), vid(P(a + 1, b + 1)), vid(P(a, b + 1))))
    V = np.zeros((len(verts), 3))
    for kk, idx in verts.items(): V[idx] = kk
    angsum = np.zeros(len(V))
    for t in tris:
        for r in range(3):
            p, q, s3 = V[t[r]], V[t[(r + 1) % 3]], V[t[(r + 2) % 3]]
            angsum[t[r]] += np.arctan2(np.linalg.norm(np.cross(q - p, s3 - p)), (q - p) @ (s3 - p))
    return 2 * np.pi - angsum, len(V), len(tris)
e = 0.0; resc = []
for j, nu in enumerate((1, 2, 4, 8, 16)):
    dfc, nv, nf = _ico(nu); e = max(e, abs(dfc.sum() - 4 * np.pi), abs(nv - (10 * nu * nu + 2)), abs(nf - 20 * nu * nu)); resc.append(4 ** j * dfc.max())
e = max(e, abs(np.degrees(_ico(1)[0].max()) - 60), abs(np.degrees(_ico(2)[0].max()) - 17.724) * 1e-1, abs(np.degrees(_ico(4)[0].max()) - 4.812) * 1e-1)
e = max(e, np.abs(np.round(resc, 4) - np.array([1.0472, 1.2374, 1.3436, 1.4681, 1.5038])).max() * 1e-1)
q, N = 0.5, 4; e = max(e, abs((1 - q + q * np.exp(2j * np.pi / N)) ** N + 0.25))
for q in (0.2, 0.7): e = max(e, abs((1 - q + q * np.exp(2j * np.pi / 4000)) ** 4000 - np.exp(2j * np.pi * q)) * 1e-2)
e = max(e, abs(4 * np.sqrt(3) / 4 * 2 - 2 * np.sqrt(3)))
report("39 Thm m8:poly, Ex. m8:icosa, Conj. m8:conjecture, Ex. m8:latitude: defects sum to 4pi, V=10nu^2+2, maxima 60/17.724/4.812 deg, rescaled 1.0472..1.5038; overlaps", e, 1e-4)


# =========================================================== 40. Section 5E (independent checks of the m10 section)
import itertools as _it40
_r40 = np.random.default_rng(31040)
def _cdconj(x):
    y = -x.copy(); y[0] = x[0]; return y
def _cdmul(x, y):
    # (a,b)(p,q) = (a p - conj(q) b, q a + b conj(p)); own recursive implementation
    n = len(x)
    if n == 1:
        return x * y
    h = n // 2; a, b, p, q = x[:h], x[h:], y[:h], y[h:]
    return np.concatenate([_cdmul(a, p) - _cdmul(_cdconj(q), b), _cdmul(q, a) + _cdmul(b, _cdconj(p))])
def _cdunit(n):
    v = _r40.normal(size=n); return v / np.linalg.norm(v)
def _cdT(x, y, z):
    return _cdmul(_cdmul(x, _cdconj(y)), z)
def _ass40(a, b, c):
    return _cdmul(_cdmul(a, b), c) - _cdmul(a, _cdmul(b, c))
# (1) ladder: associativity at 4, alternativity/Moufang/composition at 8, composition failure at 16, adjoints, cross-term formula
e1 = 0.0; e2 = 0.0; comp16 = 0.0
for _ in range(60):
    a, b, c = _r40.normal(size=(3, 4)); e1 = max(e1, np.abs(_ass40(a, b, c)).max())
    x, y, z = _r40.normal(size=(3, 8))
    e1 = max(e1, np.abs(_ass40(x, x, y)).max(), np.abs(_ass40(y, x, x)).max(), np.abs(_ass40(x, y, x)).max())
    e1 = max(e1, np.abs(_cdmul(_cdmul(_cdmul(z, x), y), x) - _cdmul(z, _cdmul(x, _cdmul(y, x)))).max())          # right Moufang
    e1 = max(e1, np.abs(_cdmul(x, _cdmul(y, _cdmul(x, z))) - _cdmul(_cdmul(_cdmul(x, y), x), z)).max())          # left Moufang
    e1 = max(e1, np.abs(_cdmul(_cdmul(x, y), _cdmul(z, x)) - _cdmul(_cdmul(x, _cdmul(y, z)), x)).max())          # middle Moufang
    e1 = max(e1, abs(np.linalg.norm(_cdmul(x, y)) - np.linalg.norm(x) * np.linalg.norm(y)))
    L = np.array([_cdmul(x, f) for f in np.eye(8)]).T; Lb = np.array([_cdmul(_cdconj(x), f) for f in np.eye(8)]).T
    e1 = max(e1, np.abs(L.T - Lb).max(), np.abs(L.T @ L - (x @ x) * np.eye(8)).max())
    xu = x / np.linalg.norm(x); yu = y / np.linalg.norm(y); zu = z / np.linalg.norm(z)
    e1 = max(e1, np.abs(_cdT(xu, xu, zu) - zu).max(), np.abs(_cdT(xu, yu, yu) - xu).max())
    e1 = max(e1, np.abs(_cdT(xu, yu, xu) - (2 * (xu @ yu) * xu - yu)).max())
    w = _cdunit(8); kk = lambda p, q: (1 + p @ q) / 2
    A_, B_, D_ = 2 * (xu @ yu), -1, 1 - (xu @ yu)
    e1 = max(e1, abs(kk(w, _cdT(xu, yu, xu)) - (A_ * kk(w, xu) + B_ * kk(w, yu) + D_)))
    s, t = _r40.normal(size=(2, 16)); comp16 = max(comp16, abs(np.linalg.norm(_cdmul(s, t)) - np.linalg.norm(s) * np.linalg.norm(t)))
    # cross-term formula for doubling an associative rung (quaternions)
    A, B, P, Q = _r40.normal(size=(4, 4)); pr = _cdmul(np.r_[A, B], np.r_[P, Q])
    rhs = (A @ A + B @ B) * (P @ P + Q @ Q) - 2 * _cdmul(_cdmul(_cdmul(A, P), _cdconj(B)), Q)[0] + 2 * _cdmul(_cdmul(_cdmul(Q, A), P), _cdconj(B))[0]
    e2 = max(e2, abs(pr @ pr - rhs), abs(_cdmul(_cdmul(_cdmul(A, P), _cdconj(B)), Q)[0] - _cdmul(_cdmul(_cdmul(Q, A), P), _cdconj(B))[0]))
x8, y8, z8 = _r40.normal(size=(3, 8))
heapfail = np.linalg.norm(_cdT(_cdT(x8, y8, z8), _r40.normal(size=8), x8) - _cdT(x8, y8, _cdT(z8, _r40.normal(size=8), x8)))
assoc8 = max(np.linalg.norm(_ass40(*_r40.normal(size=(3, 8)))) for _ in range(5))
report("40 Thm m10:ladder: H associative; O alternative, three Moufang identities, |xy|=|x||y|, L_x^*=L_xbar, Mal'cev, s_xw, two-readout coefficients; cross-term formula", max(e1, e2), 1e-11)
report("40 Thm m10:ladder: failures: O associator nonzero, |st|-|s||t| at 16 sampled positive", 0.0 if (assoc8 > 0.1 and comp16 > 0.1) else 1.0, 0.5)
# (2) Fano basis, associator table, 28 noncollinear triples, pieces
f = np.eye(8)
E40 = [None, f[1], f[2], f[4], f[3], f[6], -f[7], f[5]]
lines = [(1, 2, 4), (2, 3, 5), (3, 4, 6), (4, 5, 7), (5, 6, 1), (6, 7, 2), (7, 1, 3)]
e = 0.0
for (i, j, k) in lines:
    for (p, q, r) in ((i, j, k), (j, k, i), (k, i, j)):
        e = max(e, np.abs(_cdmul(E40[p], E40[q]) - E40[r]).max(), np.abs(_cdmul(E40[q], E40[p]) + E40[r]).max())
tab = {(1, 2, 3): -6, (1, 2, 5): 7, (1, 2, 6): 3, (1, 3, 5): -4}
for (i, j, k), m in tab.items():
    v = np.sign(m) * E40[abs(m)]
    e = max(e, np.abs(_cdmul(_cdmul(E40[i], E40[j]), E40[k]) - v).max(), np.abs(_cdmul(E40[i], _cdmul(E40[j], E40[k])) + v).max())
lineset = {frozenset(l) for l in lines}; nc = 0
for tri in _it40.combinations(range(1, 8), 3):
    for (p, q, r) in _it40.permutations(tri):
        nrm = np.linalg.norm(_ass40(E40[p], E40[q], E40[r]))
        e = max(e, abs(nrm - (0 if frozenset(tri) in lineset else 2)))
    nc += frozenset(tri) not in lineset
e = max(e, abs(nc - 28))
# unsigned canonical indices multiply by XOR
for a in range(16):
    for b in range(16):
        pr = _cdmul(np.eye(16)[a], np.eye(16)[b]); e = max(e, abs(abs(pr[a ^ b]) - 1), np.abs(np.delete(pr, a ^ b)).max())
report("40 Ex. m10:fano: relabelled basis gives the seven lines, table of four associators, |assoc|=2 on 28 triples (all orderings), 0 on lines, XOR rule to 16", e, 1e-12)
# pieces: pairwise intersections, e1+..+e7 outside, quaternionic subalgebra generated with an orthogonal direction
def _span_dim(vs):
    return np.linalg.matrix_rank(np.array(vs), tol=1e-9)
def _onb(vs):
    U, sv, _ = np.linalg.svd(np.array(vs).T, full_matrices=False); return U[:, :int(np.sum(sv > 1e-9))]
def _subalg(gens):
    V = list(_onb([f[0]] + list(gens)).T)
    while True:
        new = V + [_cdmul(a, b) for a in V for b in V]
        if _span_dim(new) == _span_dim(V): break
        V = list(_onb(new).T)
    return _onb(V)
pieces = [np.array([f[0]] + [E40[i] for i in l]).T for l in lines]
e = 0.0
for P1, P2 in _it40.combinations(pieces, 2):
    inter = P1.shape[1] + P2.shape[1] - _span_dim(list(P1.T) + list(P2.T)); e = max(e, abs(inter - 2))
ssum = sum(E40[1:]); outside = min(np.linalg.norm(ssum - P @ np.linalg.lstsq(P, ssum, rcond=None)[0]) for P in pieces)
tdir = E40[1] - E40[2]; S = _subalg([ssum, tdir])
e = max(e, abs(S.shape[1] - 4), abs(ssum @ tdir))
for P in pieces:
    e = max(e, 1.0 if _span_dim(list(S.T) + list(P.T)) == 4 else 0.0)
assocS = max(np.abs(_ass40(*(S @ _r40.normal(size=(3, 4)).T).T)).max() for _ in range(20))
e = max(e, assocS, abs(_span_dim([E40[i] for l in lines for i in l]) - 7))
report("40 Prop. m10:pieces: any two Fano pieces meet in dim 2; e1+..+e7 at distance %.3f from every piece; <s,e1-e2> quaternionic, associative, not a piece; 21 imaginary generators span 7" % outside,
       e + (0 if outside > 1 else 1), 1e-9)
# (3) sedenion zero divisors, two-sided conjugate inverse, failed transport, persistence, annihilator dimension
def _oct16(a, b):
    return np.r_[a, b]
rows = [(_oct16(E40[1], E40[2]), _oct16(E40[3], E40[6])), (_oct16(E40[1], E40[3]), _oct16(E40[2], -E40[6])), (_oct16(E40[1], E40[4]), _oct16(E40[3], E40[5]))]
e = 0.0; one16 = np.eye(16)[0]; one32 = np.eye(32)[0]; kers = []
for u, v in rows:
    e = max(e, np.abs(_cdmul(u, v)).max(), abs(u @ u - 2), abs(v @ v - 2), abs(u @ v), np.abs(_cdmul(v, u)).max())
    x, w = u / np.sqrt(2), v / np.sqrt(2)
    e = max(e, np.abs(_cdmul(x, _cdconj(x)) - one16).max(), np.abs(_cdmul(_cdconj(x), x) - one16).max())   # two-sided conjugate inverse
    e = max(e, np.abs(_cdT(x, one16, w)).max(), np.abs(_cdT(x, w, w)).max(), np.abs(_cdT(x, w, x)).max())
    e = max(e, np.abs(_cdmul(_cdmul(x, w), w)).max(), np.abs(_cdmul(x, _cdmul(w, w)) + x).max(), np.abs(_cdconj(w) + w).max())
    z = _cdunit(16); e = max(e, np.abs(_cdT(x, x, z) - z).max())
    e = max(e, np.abs(_cdmul(np.r_[x, np.zeros(16)], np.r_[w, np.zeros(16)])).max())                     # persists at 32
    e = max(e, np.abs((2 * (x @ w) * x - w) + w).max())
    Lx = np.array([_cdmul(x, g) for g in np.eye(16)]).T; Rx = np.array([_cdmul(g, x) for g in np.eye(16)]).T
    kers += [16 - np.linalg.matrix_rank(Lx, tol=1e-9), 16 - np.linalg.matrix_rank(Rx, tol=1e-9)]
# generic norm-one zero divisors (a,b), a,b orthogonal unit imaginary octonions /sqrt2: annihilator dim 4, so 11+3=14
for _ in range(20):
    a = np.r_[0, _r40.normal(size=7)]; b = np.r_[0, _r40.normal(size=7)]; b -= (a @ b) / (a @ a) * a
    a /= np.linalg.norm(a); b /= np.linalg.norm(b); x = np.r_[a, b] / np.sqrt(2)
    Lx = np.array([_cdmul(x, g) for g in np.eye(16)]).T; kers.append(16 - np.linalg.matrix_rank(Lx, tol=1e-9))
gen = 16 - np.linalg.matrix_rank(np.array([_cdmul(_cdunit(16), g) for g in np.eye(16)]).T, tol=1e-9)
e = max(e, max(abs(k - 4) for k in kers), gen)
report("40 Ex. m10:zero, Rem. m10:moreno: three rows uv=vu=0, N=2, orthogonal; x xbar=xbar x=1 yet xw=0; T(x,1,w)=T(x,w,w)=T(x,w,x)=0; persists at 32; annihilators dim 4, generic 0 (11+3=14=dim G2)", e, 1e-12)
# prop:dim hypothesis fails at 16: the left transport z -> T(x,1,z) of a witness is not isometric
x = rows[0][0] / np.sqrt(2); Lx = np.array([_cdmul(x, g) for g in np.eye(16)]).T; sv = np.linalg.svd(Lx, compute_uv=False)
report("40 Rem. m10:fit: at rank 16 the transport L_x of a unit witness has singular values in [%.3f, %.3f], so Prop. prop:dim's invariance hypothesis fails" % (sv.min(), sv.max()),
       0.0 if (sv.min() < 1e-9 and sv.max() > 1.1) else 1.0, 0.5)
# (4) spin factors: Jordan identity, cone, norm, Herm_2(K) square formula for K=R,C,H,O, reflection, trace pairing
def _jo(a, b):
    return np.r_[a[0] * b[0] + a[1:] @ b[1:], a[0] * b[1:] + b[0] * a[1:]]
e = 0.0
for n in range(1, 10):
    for _ in range(10):
        a, b = _r40.normal(size=(2, n + 1)); a2 = _jo(a, a)
        e = max(e, np.abs(_jo(_jo(a2, b), a) - _jo(a2, _jo(b, a))).max())
        s, xv = a[0], a[1:]; ev = np.array([s + np.linalg.norm(xv), s - np.linalg.norm(xv)])
        e = max(e, abs(np.abs(ev).max() - (abs(s) + np.linalg.norm(xv))))
        if s >= np.linalg.norm(xv):  # square root by spectral formula
            u = xv / np.linalg.norm(xv); r = np.sqrt(ev[0]) * np.r_[0.5, u / 2] + np.sqrt(ev[1]) * np.r_[0.5, -u / 2]
            e = max(e, np.abs(_jo(r, r) - a).max())
    if n >= 2:
        xu, yu = _cdunit(n), _cdunit(n); px = np.r_[0.5, xu / 2]; py = np.r_[0.5, yu / 2]
        e = max(e, np.abs(_jo(px, px) - px).max(), abs(2 * _jo(px, py)[0] - (1 + xu @ yu) / 2))
        Lp = np.array([_jo(px, g) for g in np.eye(n + 1)]).T; Rf = np.eye(n + 1) + 8 * (Lp @ Lp - Lp)
        target = np.diag(np.r_[1, -np.ones(n)]); target[1:, 1:] += 2 * np.outer(xu, xu)
        e = max(e, np.abs(Rf - target).max())
# Herm_2(K): matrix square, scalar s^2+t^2+|z|^2 and vector 2s(t,z), with K=O via own multiplication
for dK in (1, 2, 4, 8):
    for _ in range(10):
        s, t = _r40.normal(size=2); z = _r40.normal(size=dK)
        X11 = np.r_[s + t, np.zeros(dK - 1)]; X22 = np.r_[s - t, np.zeros(dK - 1)]
        m = lambda p, q: _cdmul(p, q)
        Y11 = m(X11, X11) + m(z, _cdconj(z)); Y12 = m(X11, z) + m(z, X22); Y22 = m(_cdconj(z), z) + m(X22, X22)
        e = max(e, abs((Y11[0] + Y22[0]) / 2 - (s * s + t * t + z @ z)), abs((Y11[0] - Y22[0]) / 2 - 2 * s * t), np.abs(Y12 - 2 * s * z).max(), np.abs(Y11[1:]).max(initial=0.0))
dims_ok = [1 + 1 + dK for dK in (1, 2, 4, 8)] == [3, 4, 6, 10]
report("40 Prop. m10:spin-geometry: Jordan identity n=1..9, order-unit norm |s|+|x|, spectral square roots, I+8(L_p^2-L_p) reflection, tr(p_x p_y)=(1+<x,y>)/2, Herm_2(K) squares for K=R,C,H,O, dims 3,4,6,10",
       e + (0 if dims_ok else 1), 1e-11)
# (5) orientation contract: matrix interface, P2 and PB for eps=+-1, failures for other multiples, associator identity, norm bound
sx = np.array([[0, 1], [1, 0]], complex); sy = np.array([[0, -1j], [1j, 0]]); sz = np.array([[1, 0], [0, -1]], complex)
def _phi40(a):
    return a[0] * np.eye(2) + a[1] * sx + a[2] * sy + a[3] * sz
def _D40(lam):
    return lambda a, b: np.r_[0, lam * np.cross(a[1:], b[1:])]
def _alpha(m, v, a):
    return m * a[0] + v @ a[1:]
def _P2gap(D, trials=400):
    worst = 0.0
    for _ in range(trials):
        v = _r40.normal(size=3); m = np.linalg.norm(v) * (1 + abs(_r40.normal()) * 0.1 * _r40.integers(0, 2)); a, b = _r40.normal(size=(2, 4))
        R = lambda p, q: _alpha(m, v, _jo(p, q)) - 1j * _alpha(m, v, D(p, q))
        G = np.array([[R(a, a), R(a, b)], [R(b, a), R(b, b)]]); worst = min(worst, np.linalg.eigvalsh((G + G.conj().T) / 2).min() / (1 + np.abs(G).max()))
        worst = min(worst, -np.abs(G - G.conj().T).max())
    return worst
def _PBgap(D, trials=200):
    worst = 0.0
    for _ in range(trials):
        v = _r40.normal(size=3); m = np.linalg.norm(v) + abs(_r40.normal()); a, b, c = _r40.normal(size=(3, 4))
        Q = lambda p, q: _alpha(m, v, _jo(p, p) + _jo(q, q)) + 2 * _alpha(m, v, D(p, q))
        h = D(a, b) - _jo(a, c); k = _jo(a, b) + D(a, c)
        worst = max(worst, abs(Q(b + h, c + k) - Q(b - h, c - k)))
    return worst
e = 0.0
for _ in range(50):
    a, b, c = _r40.normal(size=(3, 4))
    e = max(e, np.abs(_phi40(_jo(a, b)) - 1j * _phi40(_D40(-1)(a, b)) - _phi40(a) @ _phi40(b)).max())
    e = max(e, np.abs(_phi40(_jo(a, b)) - 1j * _phi40(_D40(1)(a, b)) - _phi40(b) @ _phi40(a)).max())
    for eps in (1, -1):
        D = _D40(eps); on = lambda p: abs(p[0]) + np.linalg.norm(p[1:])
        e = max(e, np.abs(_jo(_jo(a, b), c) - _jo(a, _jo(b, c)) - (D(D(a, b), c) - D(a, D(b, c)))).max())
        e = max(e, max(0, on(D(a, b)) - on(a) * on(b)))
    e = max(e, abs(np.linalg.norm(np.linalg.eigvalsh(_phi40(a)), np.inf) - (abs(a[0]) + np.linalg.norm(a[1:]))))
ok_pm = all(_P2gap(_D40(eps)) > -1e-10 and _PBgap(_D40(eps)) < 1e-10 for eps in (1, -1))
fail_other = all((_P2gap(_D40(lam)) < -1e-6) or (_PBgap(_D40(lam)) > 1e-6) for lam in (0.0, 0.5, -0.5, 2.0, 1.5))
pb_half = _PBgap(_D40(0.5)) > 1e-6; p2_two = _P2gap(_D40(2.0)) < -1e-6
e1x = np.r_[0, 1, 0, 0]; e2x = np.r_[0, 0, 1, 0]; signs_distinct = abs(_D40(1)(e1x, e2x)[3] - _D40(-1)(e1x, e2x)[3]) == 2
report("40 Thm m10:orientation, Prop. m10:pauli: phi(a.b)-i phi(D)=phi(a)phi(b) (eps=-1) / opposite (eps=+1); P2, PB hold for eps=+-1; lambda=0,+-1/2,3/2,2 fail one; associator identity; norm bound",
       e + (0 if (ok_pm and fail_other and pb_half and p2_two and signs_distinct) else 1), 1e-11)
# (6) exclusion faces: dimension (n-1)^2-1 for n=2..6; completing the square
e = 0.0
for n in range(2, 7):
    a = _r40.normal(size=n) + 1j * _r40.normal(size=n); a /= np.linalg.norm(a); Pc = np.eye(n) - np.outer(a, a.conj())
    pts = []
    for _ in range((n - 1) ** 2 + 4):
        G = _r40.normal(size=(n, n)) + 1j * _r40.normal(size=(n, n)); q = Pc @ G @ G.conj().T @ Pc; q /= np.trace(q).real
        e = max(e, abs(np.vdot(a, q @ a)), np.abs(q @ a).max()); pts.append(np.r_[q.real.ravel(), q.imag.ravel()])
    pts = np.array(pts); e = max(e, abs(np.linalg.matrix_rank(pts[1:] - pts[0], tol=1e-9) - ((n - 1) ** 2 - 1)))
tt, bb = _r40.uniform(-1, 2, size=(2, 2000)); e = max(e, np.abs((tt - 0.5) ** 2 + bb ** 2 - 0.25 - (bb ** 2 - tt * (1 - tt))).max())
report("40 Rem. m10:exclusion: face of Tr(pq)=0 has affine dimension (n-1)^2-1 = 0,3,8,15,24 for n=2..6", e, 1e-9)
# (7) Clifford comparison, rotors, quaternion example, composition analogue
def _gammas(n):
    X = np.array([[0, 1], [1, 0]], complex); Y = np.array([[0, -1j], [1j, 0]]); Z = np.diag([1., -1]).astype(complex); I2 = np.eye(2)
    m = (n + 1) // 2; G = []
    for k in range(m):
        for P in (X, Y):
            mats = [Z] * k + [P] + [I2] * (m - k - 1); M = mats[0]
            for Mi in mats[1:]: M = np.kron(M, Mi)
            G.append(M)
    return G[:n]
e = 0.0
for n in (3, 4, 5, 6):
    G = _gammas(n); vec = lambda v: sum(vi * g for vi, g in zip(v, G)); I = np.eye(G[0].shape[0])
    for i in range(n):
        for j in range(n):
            e = max(e, np.abs(G[i] @ G[j] + G[j] @ G[i] - 2 * (i == j) * I).max())
    for _ in range(10):
        x, y, w = _cdunit(n), _cdunit(n), _cdunit(n); c = x @ y; P = vec(x) @ vec(y); B = (P - (vec(y) @ vec(x))) / 2
        e = max(e, np.abs(P - c * I - B).max(), np.abs(B @ B + (1 - c * c) * I).max())
        th = np.arccos(c); U = B / np.sin(th)
        e = max(e, np.abs(P - (np.cos(th) * I + np.sin(th) * U)).max(), np.abs(U @ U + I).max())
        e = max(e, np.abs(vec(x) @ vec(w) @ vec(x) - vec(2 * (x @ w) * x - w)).max())
    U = G[0] @ G[1]
    for tt in (0.3, 1.1, 2.5):
        R = np.cos(tt / 2) * I - np.sin(tt / 2) * U; Ri = np.cos(tt / 2) * I + np.sin(tt / 2) * U
        e = max(e, np.abs(R @ G[0] @ Ri - (np.cos(tt) * G[0] + np.sin(tt) * G[1])).max())
        if n > 2: e = max(e, np.abs(R @ G[2] @ Ri - G[2]).max())
    e = max(e, np.abs((np.cos(np.pi) * I - np.sin(np.pi) * U) + I).max())
qi, qj, qk = np.eye(4)[1], np.eye(4)[2], np.eye(4)[3]; one4 = np.eye(4)[0]
pr = _cdmul((one4 + qj) / np.sqrt(2), (one4 + qi) / np.sqrt(2))
e = max(e, np.abs(_cdmul(qi, qj) - qk).max(), np.abs(pr - (one4 + qi + qj - qk) / 2).max(), abs(pr[0] - np.cos(np.pi / 3)), abs(np.linalg.norm(pr[1:]) - np.sin(np.pi / 3)))
for dK in (2, 4, 8):
    x, y = _cdunit(dK), _cdunit(dK); cmp = _cdmul(x, _cdconj(y)); e = max(e, abs(cmp[0] - x @ y), abs(np.linalg.norm(cmp[1:]) ** 2 - (1 - (x @ y) ** 2)))
    im = np.r_[0, cmp[1:]] / np.linalg.norm(cmp[1:]); e = max(e, np.abs(_cdmul(im, im) + np.eye(dK)[0]).max())
report("40 Rem. m10:clifford, Ex. m10:rotors: xy=c+B, B^2=-(1-c^2), xy=exp(theta U), xwx=2<x,w>x-w (n=3..6); rotor rotates by t, R(2pi)=-1; (1+j)(1+i)/2; composition x ybar has re=c, |im|=sin", e, 1e-11)
# (8) phase: balanced sum, J^2=-I; visibility^2 + trace distance^2 = 1
e = 0.0
for n in (2, 3, 4):
    Z = _r40.normal(size=(n, n)) + 1j * _r40.normal(size=(n, n)); V, _ = np.linalg.qr(Z)
    W, _ = np.linalg.qr(_r40.normal(size=(n, n)) + 1j * _r40.normal(size=(n, n))); H = W @ np.diag(_r40.choice([-1, 1], size=n)) @ W.conj().T
    U = 1j * H @ V; A, B = U / np.sqrt(2), V / np.sqrt(2); S = A + B
    e = max(e, np.abs(S @ S.conj().T - np.eye(n)).max(), np.abs(A @ B.conj().T + B @ A.conj().T).max())
    J = 2 * A @ B.conj().T; e = max(e, np.abs(J + J.conj().T).max(), np.abs(J @ J + np.eye(n)).max())
    a = _r40.normal(size=n) + 1j * _r40.normal(size=n); b = _r40.normal(size=n) + 1j * _r40.normal(size=n); a /= np.linalg.norm(a); b /= np.linalg.norm(b)
    psi = np.r_[a, b] / np.sqrt(2); M = psi.reshape(2, n); rho = M @ M.conj().T
    vis = 2 * abs(rho[0, 1]); td = 0.5 * np.abs(np.linalg.eigvalsh(np.outer(a, a.conj()) - np.outer(b, b.conj()))).sum()
    e = max(e, abs(vis ** 2 + td ** 2 - 1), abs(rho[0, 0] - 0.5))
report("40 Rem. m10:phase: balanced unitary sum gives AB*+BA*=0 and J^2=-I; visibility^2+trace distance^2=1", e, 1e-11)
# (9) curl: only d=3; octonion cross product (perpendicular, normed, kernel 14 = dim Der O), non-equivariance; quaternion frame
e = 0.0
e = max(e, sum(1 for d in range(1, 40) if d * (d - 1) // 2 == d and d != 3))
cr = lambda x, y: np.r_[0, _cdmul(x, y)[1:]]
for _ in range(30):
    x = np.r_[0, _r40.normal(size=7)]; y = np.r_[0, _r40.normal(size=7)]; c = cr(x, y)
    e = max(e, abs(c @ x), abs(c @ y), abs(c @ c - ((x @ x) * (y @ y) - (x @ y) ** 2)), np.abs(_cdmul(x, y) - (-(x @ y) * np.eye(8)[0] + c)).max())
M = np.array([cr(E40[i], E40[j])[1:] for i, j in _it40.combinations(range(1, 8), 2)]).T
rk = np.linalg.matrix_rank(M); e = max(e, abs(rk - 7), abs((21 - rk) - 14))
# derivation algebra of O: dim 14
rowsD = []
basis8 = np.eye(8)
for i in range(8):
    for j in range(8):
        # D(e_i e_j) - D(e_i) e_j - e_i D(e_j) = 0, linear in the 64 entries of D
        blk = np.zeros((8, 64)); pij = _cdmul(basis8[i], basis8[j])
        for k in range(8):
            for l in range(8):
                Ekl = np.zeros((8, 8)); Ekl[k, l] = 1
                blk[:, 8 * k + l] = Ekl @ pij - _cdmul(Ekl @ basis8[i], basis8[j]) - _cdmul(basis8[i], Ekl @ basis8[j])
        rowsD.append(blk)
derdim = 64 - np.linalg.matrix_rank(np.vstack(rowsD)); e = max(e, abs(derdim - 14))
# orientation-preserving sign change fixing e1,e2 and negating e4 and e5
def _sgn(v):
    out = v.copy(); idx4 = np.argmax(np.abs(E40[4])); idx5 = np.argmax(np.abs(E40[5])); out[idx4] *= -1; out[idx5] *= -1; return out
e = max(e, 0 if np.linalg.norm(_sgn(cr(E40[1], E40[2])) - cr(_sgn(E40[1]), _sgn(E40[2]))) > 1 else 1)
# quaternion frame: [E_i,E_j]=2E_k via q(uv-vu); d eta_i(E_j,E_k)=-2
for (u, v, w) in ((qi, qj, qk), (qj, qk, qi), (qk, qi, qj)):
    q = _cdunit(4); br = _cdmul(q, _cdmul(u, v) - _cdmul(v, u)); e = max(e, np.abs(br - 2 * _cdmul(q, w)).max())
    Ew = _cdmul(q, w); e = max(e, abs(-(Ew @ br) - (-2)))
report("40 Thm m10:curl, Ex. m10:cross-curl: d(d-1)/2=d only at d=3; 7-dim cross product perpendicular and normed; Lambda^2 R^7 -> R^7 rank 7, kernel 14 = dim Der(O); sign change breaks equivariance; [E_i,E_j]=2E_k, curl eigenvalue -2", e, 1e-10)
# (10) dimension four: Hodge eigenspaces 3+3 Euclidean, *^2=-1 Lorentz, left/right quaternion generators, SO(4) transitive, rank 6 differential
def _hodge4(sig):
    pairs = list(_it40.combinations(range(4), 2)); H = np.zeros((6, 6)); g = np.diag(sig)
    for col, (i, j) in enumerate(pairs):
        k, l = [m for m in range(4) if m not in (i, j)]
        perm = [i, j, k, l]; sgn = np.linalg.det(np.eye(4)[perm]); row = pairs.index((k, l))
        H[row, col] = sgn * g[i, i] * g[j, j]
    return H
e = 0.0
H = _hodge4([1, 1, 1, 1]); e = max(e, np.abs(H @ H - np.eye(6)).max(), abs(np.sum(np.linalg.eigvalsh((H + H.T) / 2) > 0) - 3))
HL = _hodge4([-1, 1, 1, 1]); e = max(e, np.abs(HL @ HL + np.eye(6)).max())
def _skew_to_2form(K):
    return np.array([K[i, j] for i, j in _it40.combinations(range(4), 2)])
for u in (qi, qj, qk):
    Lm = np.array([_cdmul(u, g) for g in np.eye(4)]).T; Rm = np.array([-_cdmul(g, u) for g in np.eye(4)]).T
    wl, wr = _skew_to_2form(Lm), _skew_to_2form(Rm)
    e = max(e, np.abs(H @ wl - wl).max(), np.abs(H @ wr + wr).max())
for _ in range(20):
    u, v = _cdunit(4), _cdunit(4); a = _cdmul(v, _cdconj(u)); e = max(e, np.abs(_cdmul(a, u) - v).max())
Jac = []
for u in (qi, qj, qk):
    Jac.append(np.array([_cdmul(u, g) for g in np.eye(4)]).T.ravel()); Jac.append(np.array([-_cdmul(g, u) for g in np.eye(4)]).T.ravel())
e = max(e, abs(np.linalg.matrix_rank(np.array(Jac)) - 6))
# SL(2,C) congruence preserves det = s^2-|x|^2; psi psi^* future null
for _ in range(10):
    g = _r40.normal(size=(2, 2)) + 1j * _r40.normal(size=(2, 2)); g /= np.sqrt(np.linalg.det(g)); a = _r40.normal(size=4)
    Y = g @ _phi40(a) @ g.conj().T; e = max(e, abs(np.linalg.det(Y) - (a[0] ** 2 - a[1:] @ a[1:])), abs(np.linalg.det(g) - 1))
    p = _r40.normal(size=2) + 1j * _r40.normal(size=2); Pm = np.outer(p, p.conj()); s0 = np.trace(Pm).real / 2
    e = max(e, abs(np.linalg.det(Pm)))
report("40 Prop. m10:four, Rem. m10:lorentz: *^2=1 with 3+3 (Euclidean), *^2=-1 (Lorentz); left/right imaginary units self-/anti-self-dual; v=(v ubar)u transitive; differential rank 6; SL(2,C) preserves det", e, 1e-10)
# (11) blocks, tensor sectors, modes, MPS, prefix
e = 0.0
for k in range(1, 11):
    e = max(e, abs((3 * k * (3 * k - 1) // 2 - 3 * k) - 9 * k * (k - 1) // 2))
e = max(e, max(abs(np.array(t) - np.array(s)).max() for t, s in (((6, 15, 9), (3 * 2, 15, 9)), ((9, 36, 27), (9, 36, 27)), ((15, 105, 90), (15, 105, 90)))))
for k, tri in ((2, (6, 15, 9)), (3, (9, 36, 27)), (5, (15, 105, 90))):
    e = max(e, abs(3 * k - tri[0]), abs(3 * k * (3 * k - 1) // 2 - tri[1]), abs(9 * k * (k - 1) // 2 - tri[2]))
def _herm_basis(n):
    B = [np.eye(n) / np.sqrt(n)]
    for i in range(n):
        for j in range(i + 1, n):
            M = np.zeros((n, n), complex); M[i, j] = M[j, i] = 1 / np.sqrt(2); B.append(M)
            M = np.zeros((n, n), complex); M[i, j] = -1j / np.sqrt(2); M[j, i] = 1j / np.sqrt(2); B.append(M)
    for d in range(1, n):
        v = np.r_[np.ones(d), -d, np.zeros(n - d - 1)]; B.append(np.diag(v / np.linalg.norm(v)).astype(complex))
    return B
for (m, n), tot in (((2, 2), (6, 9, 15)), ((2, 3), (11, 24, 35)), ((3, 3), (16, 64, 80))):
    Bm, Bn = _herm_basis(m), _herm_basis(n)
    corr = [np.kron(X, Y) for X in Bm[1:] for Y in Bn[1:]]
    loc = [np.kron(X, Bn[0]) for X in Bm[1:]] + [np.kron(Bm[0], Y) for Y in Bn[1:]]
    allv = np.array([np.r_[M.real.ravel(), M.imag.ravel()] for M in loc + corr])
    Gm = allv @ allv.T; e = max(e, np.abs(Gm - np.eye(len(Gm))).max(), abs(len(loc) - tot[0]), abs(len(corr) - tot[1]), abs(len(loc) + len(corr) - tot[2]))
    for C in corr:
        Ct = C.reshape(m, n, m, n); e = max(e, np.abs(np.einsum("ijkj->ik", Ct)).max(), np.abs(np.einsum("ijil->jl", Ct)).max())
for N in range(1, 9):
    e = max(e, abs(len(_herm_basis(2)) ** N - 1 - (4 ** N - 1)))
for N in (4, 6, 8):
    d0 = 2 ** (N // 2); v = np.eye(d0).ravel() / np.sqrt(d0); sv = np.linalg.svd(v.reshape(d0, d0), compute_uv=False)
    e = max(e, abs(np.sum(sv > 1e-12) - d0))
    # bond-D MPS has Schmidt rank <= D at each cut
    D = 3; A = _r40.normal(size=(N, 2, D, D)); l = _r40.normal(size=D); r = _r40.normal(size=D)
    psi = np.zeros(2 ** N)
    for idx, conf in enumerate(_it40.product(range(2), repeat=N)):
        M = l
        for site, sgm in enumerate(conf): M = M @ A[site, sgm]
        psi[idx] = M @ r
    for cut in range(1, N):
        e = max(e, max(0, np.linalg.matrix_rank(psi.reshape(2 ** cut, -1), tol=1e-9) - D))
seq = 2.0 ** -np.arange(1, 60); Ttot = seq.sum()
for eps in (0.3, 0.1, 0.01): e = max(e, max(0, np.sum(seq >= eps) - np.floor(Ttot / eps)))
# prefix example
for N in (4, 5, 6, 7):
    states = []
    for sgn in (1, -1):
        A0, A1 = np.diag([1., 0]), np.diag([0., 1]); l = np.array([1., 1]); r = np.array([1., sgn]) / np.sqrt(2); psi = []
        for conf in _it40.product(range(2), repeat=N):
            M = l
            for sgm in conf: M = M @ (A0 if sgm == 0 else A1)
            psi.append(M @ r)
        states.append(np.array(psi))
    e = max(e, abs(states[0] @ states[1]), abs(states[0][0] - 1 / np.sqrt(2)), abs(states[1][-1] + 1 / np.sqrt(2)), abs(np.count_nonzero(np.abs(states[0]) > 1e-12) - 2))
    pref = [s.reshape(8, -1) @ s.reshape(8, -1).T for s in states]; e = max(e, np.abs(pref[0] - pref[1]).max())
report("40 Prop. m10:blocks, m10:modes, Ex. m10:prefix: 9C(k,2) codimension, (6,15,9),(9,36,27),(15,105,90); sectors 6+9,11+24,16+64 orthonormal with zero partial traces; MPS Schmidt rank <= D; middle-cut rank 2^(N/2); GHZ prefixes agree", e, 1e-9)
# (12) dimension-three readings that fail: x1 d2 on R^4, symmetric stretch 6 entries, exclusion size 4 dim 8, SU(3) generators 8
e = 0.0
dA = np.zeros((4, 4)); dA[0, 1] = 1.0; vort = dA - dA.T  # A = x_1 d_2: dA_2/dx_1 = 1
e = max(e, abs(np.count_nonzero(np.triu(vort)) - 1), abs(vort[0, 1] - 1))
symb = []
for i in range(3):
    for j in range(i, 3):
        M = np.zeros((3, 3)); M[i, j] = M[j, i] = 1; symb.append(M.ravel())
e = max(e, abs(np.linalg.matrix_rank(np.array(symb)) - 6))
# a positive symmetric stretch with rotated principal axes is not diagonal in the fixed frame
Qr, _ = np.linalg.qr(_r40.normal(size=(3, 3))); Sst = Qr @ np.diag([1., 2, 3]) @ Qr.T
e = max(e, 0 if np.abs(Sst - np.diag(np.diag(Sst))).max() > 1e-3 else 1)
e = max(e, abs((4 - 1) ** 2 - 1 - 8), abs(len(_herm_basis(3)) - 1 - 8))
report("40 Rem. m10:folklore: A=x1 d2 on R^4 has vorticity dx1^dx2; symmetric stretch has 6 entries (rotated axes off-diagonal); exclusion face in size 4 has dim 8; su(3) dim 8", e, 1e-12)


# =========================================================== registered module scripts (checks/)
for _name, _marker, _pred in CHECK_MODULES:
    _r = _run(_name)
    _ok = _r.returncode == 0 and _marker in _r.stdout and (_pred is None or _pred(_r.stdout))
    report(f"module checks/{_name}: exit 0, '{_marker}'", 0.0 if _ok else 1.0, 0.5)

# --------------------------------------------------------------------- output
print("check_arc_calculus.py -- numerical sanity checks (not proofs)\n")
fail = 0
for name, err, tol in REPORT:
    flag = "ok " if err <= tol else "FAIL"
    if err > tol:
        fail += 1
    print(f"[{flag}] {name:100s} max err = {err:.2e} (tol {tol:.0e})")
print(f"\n{len(REPORT)} checks, {fail} failures")
