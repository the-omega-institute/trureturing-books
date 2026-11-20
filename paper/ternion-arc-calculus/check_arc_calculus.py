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
