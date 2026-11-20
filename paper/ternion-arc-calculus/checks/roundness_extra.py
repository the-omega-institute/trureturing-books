"""Additional float64 checks for Theorem 5.18 and its lemmas (numpy only)."""
import numpy as np

def _expm(A):
    # scaling and squaring with a Taylor series (numpy only)
    n = max(0, int(np.ceil(np.log2(max(np.linalg.norm(A, 1), 1e-300)))) + 4)
    B = A / 2.0 ** n; E = np.eye(A.shape[0]); term = np.eye(A.shape[0])
    for k in range(1, 20):
        term = term @ B / k; E = E + term
    for _ in range(n):
        E = E @ E
    return E
rng = np.random.default_rng(20261120)
TOL = 1e-9
fails = []
def check(name, ok):
    print(("PASS " if ok else "FAIL ") + name)
    if not ok:
        fails.append(name)

# ---------- algebra ----------
def qmul(p, q):
    a1, b1, c1, d1 = p; a2, b2, c2, d2 = q
    return np.array([a1*a2-b1*b2-c1*c2-d1*d2, a1*b2+b1*a2+c1*d2-d1*c2,
                     a1*c2-b1*d2+c1*a2+d1*b2, a1*d2+b1*c2-c1*b2+d1*a2])
def qconj(p): return np.array([p[0], -p[1], -p[2], -p[3]])
def omul(x, y):  # Cayley-Dickson (a,b)(c,d) = (ac - d* b, d a + b c*)
    a, b = x[:4], x[4:]; c, d = y[:4], y[4:]
    return np.concatenate([qmul(a, c) - qmul(qconj(d), b), qmul(d, a) + qmul(b, qconj(c))])
def oconj(x): return np.concatenate([qconj(x[:4]), -x[4:]])

def rand_orth_fix1(m, det):
    Q, _ = np.linalg.qr(rng.normal(size=(m-1, m-1)))
    if np.sign(np.linalg.det(Q)) != det:
        Q[:, 0] *= -1
    P = np.eye(m); P[1:, 1:] = Q
    return P

def unit(v): return v/np.linalg.norm(v)

def make_B(m, det):
    mul, conj = (qmul, qconj) if m == 4 else (omul, oconj)
    phi = rand_orth_fix1(m, det); phii = phi.T
    mu = lambda u, v: phi @ mul(phii @ u, phii @ v)
    w = unit(rng.normal(size=m))
    # B(a,x) = T(a,w,x) = w mu(w^-1 a, w^-1 x); w^-1 = conj(w); left mult by w is orthogonal (alternativity)
    B = lambda a, x: mul(w, mu(mul(conj(w), a), mul(conj(w), x)))
    return B, w

def matrix_of(f, m):  # linear map a -> f(a) as matrix (f is linear in its argument in R^m)
    return np.column_stack([f(e) for e in np.eye(m)])

def section_A(m, det):
    tag = f"S^{m-1}, det phi={det:+d}"
    B, w = make_B(m, det)
    xs = [unit(rng.normal(size=m)) for _ in range(6)]
    check(f"A1 {tag}: two-sided unit", all(np.allclose(B(w, x), x) and np.allclose(B(x, w), x) for x in xs))
    ok = True
    for a in xs:
        La = matrix_of(lambda y: B(a, y), m); Ra = matrix_of(lambda y: B(y, a), m)
        ok &= np.allclose(La.T @ La, np.eye(m)) and np.allclose(Ra.T @ Ra, np.eye(m))
    check(f"A2 {tag}: L_a, R_a orthogonal (preserve kappa)", ok)
    kap = lambda x, y: 0.25*np.dot(x+y, x+y)
    check(f"A3 {tag}: round trip at w", all(abs(kap(w, B(x, x)) - (2*kap(w, x)-1)**2) < TOL for x in xs))
    # Killing fields: X_v(x) = d(R_x)_w v = B(v,x) (bilinear extension), Y_v(x) = B(x,v)
    v = rng.normal(size=m); v -= np.dot(v, w)*w; v = unit(v)
    Lv = matrix_of(lambda y: B(v, y), m); Rv = matrix_of(lambda y: B(y, v), m)
    check(f"A4 {tag}: X_v = Lv x, Lv skew, Lv^2 = -I", np.allclose(Lv, -Lv.T) and np.allclose(Lv @ Lv, -np.eye(m)))
    check(f"A5 {tag}: Y_v = Rv x, Rv skew, Rv^2 = -I", np.allclose(Rv, -Rv.T) and np.allclose(Rv @ Rv, -np.eye(m)))
    gam = lambda t: np.cos(t)*w + np.sin(t)*v
    ts = np.linspace(-7, 7, 29)
    check(f"A6 {tag}: gamma_v integral curve of X_v and Y_v",
          all(np.allclose(Lv @ gam(t), -np.sin(t)*w + np.cos(t)*v) and np.allclose(Rv @ gam(t), -np.sin(t)*w + np.cos(t)*v) for t in ts))
    check(f"A7 {tag}: B(gamma(s),gamma(t)) = gamma(s+t)",
          all(np.allclose(B(gam(s), gam(t)), gam(s+t)) for s in ts[::4] for t in ts[::3]))
    p = lambda t: 2*kap(w, gam(t)) - 1
    check(f"A8 {tag}: p_v(t) = cos t (period 2pi, a = pi)", all(abs(p(t) - np.cos(t)) < TOL for t in ts))
    # A0 Z = tangential part of Lv Z at w
    Pw = np.eye(m) - np.outer(w, w)
    A0 = Pw @ Lv @ Pw
    basis = np.linalg.svd(np.column_stack([w, v]).T)[2][2:]  # orthonormal basis of span(w,v)^perp
    M = -A0 @ A0
    check(f"A9 {tag}: A0 v = 0, -A0^2 = id on v^perp in T_w (curvature 1 = k^2)",
          np.allclose(A0 @ v, 0) and all(np.allclose(M @ z, z) for z in basis))
    # Jacobi field of variation gamma_{v(s)}, v(s) = cos s v + sin s z, by finite differences
    z = basis[0]; h = 1e-6
    J = lambda t: ((np.cos(t)*w + np.sin(t)*unit(v + h*z)) - (np.cos(t)*w + np.sin(t)*unit(v - h*z)))/(2*h)
    tt = np.linspace(0, 2*np.pi, 401)
    norms = np.array([np.linalg.norm(J(t)) for t in tt])
    check(f"A10 {tag}: |J(t)| = |sin t|, zeros only at 0, pi, 2pi",
          np.allclose(norms, np.abs(np.sin(tt)), atol=1e-6))
    # flow Jacobi field F_t Z0 = exp(t Lv) Z0 satisfies J'' = F_t A0^2 Z0 (here check via R(Z,g')g' = Z - <Z,g'>g' on unit sphere)
    expm = _expm
    Z0 = basis[1]
    ok = True
    for t in ts:
        Ft = expm(t*Lv)
        Zt = Ft @ Z0; g1 = -np.sin(t)*w + np.cos(t)*v; x = gam(t)
        # second covariant derivative along gamma of Z(t)=F_t Z0 on the unit sphere: tangential part of Z''
        Zpp = Lv @ Lv @ Zt
        Px = np.eye(m) - np.outer(x, x)
        cov2 = Px @ Zpp
        Rterm = Zt - np.dot(Zt, g1)*g1  # R(Z, g')g' on unit sphere (Z tangent)
        ok &= np.allclose(cov2 + Rterm, 0, atol=1e-8)
    check(f"A11 {tag}: F_t Z0 is a Jacobi field (Z'' + R(Z,g')g' = 0)", ok)

for m in (4, 8):
    for det in (+1, -1):
        section_A(m, det)

# ---------- B. Berger sphere: R(Z,X)X = -(nabla X)^2 Z for the constant-length Killing field X ----------
def berger_check(lam):
    # left-invariant frame E1,E2,E3 on SU(2) with [E1,E2]=2E3 (cyclic); metric g = diag(lam^2,1,1)
    eps = np.zeros((3, 3, 3))
    for (i, j, k) in [(0, 1, 2), (1, 2, 0), (2, 0, 1)]:
        eps[i, j, k] = 2; eps[j, i, k] = -2
    g = np.diag([lam**2, 1., 1.])
    br = lambda X, Y: np.einsum('i,j,ijk->k', X, Y, eps)
    def nabla(X, Y):  # Koszul for left-invariant fields: g(nabla_X Y, Z) = 1/2(g([X,Y],Z) - g([Y,Z],X) + g([Z,X],Y))
        rhs = np.array([0.5*(br(X, Y) @ g @ Zc - br(Y, Zc) @ g @ X + br(Zc, X) @ g @ Y) for Zc in np.eye(3)])
        return np.linalg.solve(g, rhs)
    def R(X, Y, Z):  # R(X,Y)Z = nabla_X nabla_Y Z - nabla_Y nabla_X Z - nabla_[X,Y] Z  (left-invariant)
        return nabla(X, nabla(Y, Z)) - nabla(Y, nabla(X, Z)) - nabla(br(X, Y), Z)
    E = np.eye(3)
    X = E[0]  # the Hopf field E1: Killing (right translations by exp(tE1) are isometries), length lam
    # A Z = nabla_Z X ; as X is left-invariant, nabla_Z X for left-invariant Z
    A = np.column_stack([nabla(E[i], X) for i in range(3)])
    ok = True
    for Z in E:
        ok &= np.allclose(R(Z, X, X), -A @ A @ Z, atol=1e-12)
    sec12 = (R(E[1], E[0], E[0]) @ g @ E[1]) / (lam**2)  # sec(E1,E2)
    sec23 = R(E[1], E[2], E[2]) @ g @ E[1]
    return ok, sec12, sec23

for lam in (1.0, 0.5, 1.7):
    ok, s12, s23 = berger_check(lam)
    check(f"B lam={lam}: R(Z,X)X = -A^2 Z for Hopf Killing field (sec(X,E2)={s12:.4f}=lam^2, sec(E2,E3)={s23:.4f}=4-3lam^2)",
          ok and abs(s12 - lam**2) < 1e-12 and abs(s23 - (4-3*lam**2)) < 1e-12)

# ---------- C. witnesses of Remark 5.24 ----------
def rot(axis, ang):
    axis = unit(np.asarray(axis, float)); K = np.array([[0, -axis[2], axis[1]], [axis[2], 0, -axis[0]], [-axis[1], axis[0], 0]])
    return np.eye(3) + np.sin(ang)*K + (1-np.cos(ang))*K @ K
def angle(Rm): return np.arccos(np.clip((np.trace(Rm)-1)/2, -1, 1))
kSO = lambda R1, R2: np.cos(angle(R1.T @ R2)/2)**2
ok = True
for _ in range(200):
    W = rot(rng.normal(size=3), rng.uniform(0, np.pi)); Xr = rot(rng.normal(size=3), rng.uniform(0, np.pi))
    ok &= abs(kSO(W, Xr @ W.T @ Xr) - (2*kSO(W, Xr)-1)**2) < 1e-9
check("C1 SO(3), kappa=cos^2(alpha/2), heap x w^-1 x: round trip (200 random)", ok)
Is = [np.eye(3), rot([1, 0, 0], np.pi), rot([0, 1, 0], np.pi), rot([0, 0, 1], np.pi)]
check("C2 SO(3): three distinct zero partners of I", all(abs(kSO(np.eye(3), H)) < 1e-12 for H in Is[1:]))
Gc = np.array([[2*kSO(P, Q)-1 for Q in Is] for P in Is])
ev = np.linalg.eigvalsh(Gc)
check(f"C3 SO(3): c-Gram = 2I - 11^T, eigenvalues {np.round(ev, 9)}", np.allclose(Gc, 2*np.eye(4)-np.ones((4, 4))) and abs(ev.min()+2) < 1e-9)
for mm in (2, 3):
    c = lambda x, y: np.mean(np.cos(np.asarray(y)-np.asarray(x)))
    x = np.zeros(mm); x[0] = np.pi
    lhs = c(np.zeros(mm), 2*x); rhs = 2*c(np.zeros(mm), x)**2-1
    check(f"C4 torus m={mm}: round trip fails at (pi,0..): c(0,2x)={lhs:.4f} vs 2c^2-1={rhs:.4f}", abs(lhs-rhs) > 0.1)
ccyl = lambda p, q: np.exp(-(q[1]-p[1])**2)*np.cos(q[0]-p[0])
lhs = ccyl((0, 0), (0, 2)); rhs = 2*ccyl((0, 0), (0, 1))**2-1
check(f"C5 cylinder: c(w,2x)={lhs:.5f}=e^-4, 2c(w,x)^2-1={rhs:.5f}=2e^-2-1", abs(lhs-np.exp(-4)) < 1e-12 and abs(rhs-(2*np.exp(-2)-1)) < 1e-12)
# cylinder: unique zero partner and kappa=1 only on diagonal (grid)
zs = [(th, s) for th in np.linspace(-np.pi, np.pi, 721)[:-1] for s in np.linspace(-3, 3, 241)]
zp = [p for p in zs if abs(ccyl((0, 0), p)+1) < 1e-9]
check(f"C6 cylinder: zero partners of w on grid {zp}", len(zp) == 1)

# ---------- D. counterexample attempts ----------
# D1: non-cosine continuous duplication solution on the line, f(t)=cos(|t| q(log2|t|)), q 1-periodic positive.
q = lambda u: 1 + 0.3*np.sin(2*np.pi*u)
f = lambda t: 1.0 if t == 0 else np.cos(abs(t)*q(np.log2(abs(t))))
tsD = rng.uniform(-30, 30, 2000)
check("D1a line, kappa=(1+f(y-x))/2, B=+: duplication holds (so round trip at w)", all(abs(f(2*t) - (2*f(t)**2-1)) < 1e-9 for t in tsD))
# faithfulness fails: f(t)=1 for some t != 0; count zero partners in [0,40]
grid = np.linspace(1e-6, 40, 400001); vals = np.array([f(t) for t in grid])
ones = np.sum((vals[1:-1] > vals[:-2]) & (vals[1:-1] > vals[2:]) & (vals[1:-1] > 1-1e-6))
mins = np.sum((vals[1:-1] < vals[:-2]) & (vals[1:-1] < vals[2:]) & (vals[1:-1] < -1+1e-6))
check(f"D1b line example: kappa=1 off the diagonal ({ones} points in (0,40]) and {mins} zero partners -> killed by faithfulness", ones > 0)
# D2: S^1 x S^3 with c = (c1+c3)/2 and product operation: round trip fails
def cS3(x, y): return np.dot(x, y)
x1 = np.array([0., 1.]); x3 = unit(rng.normal(size=4)); one3 = np.array([1., 0, 0, 0])
c_prod = lambda a1, a3, b1, b3: 0.5*(np.dot(a1, b1) + cS3(a3, b3))
sq1 = np.array([x1[0]**2-x1[1]**2, 2*x1[0]*x1[1]]); sq3 = qmul(x3, x3)
lhs = c_prod(np.array([1., 0]), one3, sq1, sq3); rhs = 2*c_prod(np.array([1., 0]), one3, x1, x3)**2-1
check(f"D2 S^1xS^3 product: round trip fails ({lhs:.4f} vs {rhs:.4f})", abs(lhs-rhs) > 1e-3)
# D3: S^3 with kappa = g(<x,y>) bi-invariant: duplication forces g = (1+t)/2. Try g(t) = ((1+t)/2)^p.
for pexp in (0.5, 2.0):
    gk = lambda t: ((1+t)/2)**pexp
    xx = unit(rng.normal(size=4))
    lhs = gk(np.dot(one3, qmul(xx, xx))); rhs = (2*gk(np.dot(one3, xx))-1)**2
    check(f"D3 S^3, kappa=((1+c)/2)^{pexp}: round trip fails ({lhs:.4f} vs {rhs:.4f})", abs(lhs-rhs) > 1e-3)
# D4: RP^3 = SO(3) with c = cos(alpha/2) (kappa = cos^2(alpha/4)): faithful, NO zero partner (allowed by "at most one").
kSO4 = lambda R1, R2: np.cos(angle(R1.T @ R2)/4)**2
ok_small = True; worst = 0
for _ in range(400):
    Xr = rot(rng.normal(size=3), rng.uniform(0, np.pi))
    d = abs(kSO4(np.eye(3), Xr @ Xr) - (2*kSO4(np.eye(3), Xr)-1)**2)
    if angle(Xr) < np.pi/2: ok_small &= d < 1e-9
    else: worst = max(worst, d)
minkap = min(kSO4(np.eye(3), rot(rng.normal(size=3), a)) for a in np.linspace(0, np.pi, 1001))
check(f"D4 SO(3), kappa=cos^2(alpha/4): min kappa(I,.)={minkap:.4f}>0 (no zero partner); round trip holds for alpha<pi/2, fails beyond (max defect {worst:.3f})",
      ok_small and worst > 0.1 and minkap > 0.4)
# D5: is joint continuity automatic? On the model, B is bilinear => jointly continuous; nothing to test.
print()
print("TOTAL FAILURES:", len(fails))
for n in fails: print("  ", n)
