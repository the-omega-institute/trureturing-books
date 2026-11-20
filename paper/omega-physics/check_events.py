"""Numerical sanity check: dichotomies (caps) of S^3 as points of de Sitter space; inclusion = causal order."""
import numpy as np
rng = np.random.default_rng(5)
def unit(n=4):
    v = rng.normal(size=n); return v/np.linalg.norm(v)
def xi(n, a): return np.concatenate([[-np.cos(a)/np.sin(a)], n/np.sin(a)])   # (t, v), cap {x: t + <v,x> > 0}
def B(p, q): return p[0]*q[0] - p[1:]@q[1:]
bad = 0; cnt = {"nested": 0, "cross": 0, "disjoint": 0}
for _ in range(20000):
    n, m = unit(), unit(); a, b = rng.uniform(0.05, np.pi-0.05, size=2)
    p, q = xi(n, a), xi(m, b); P = -B(p, q); th = np.arccos(np.clip(n@m, -1, 1))
    assert abs(B(p, p) + 1) < 1e-9
    incl = th + a <= b            # C_p inside C_q
    crossing = abs(a-b) < th < min(a+b, 2*np.pi-a-b)
    if incl != (P >= 1 and p[0] <= q[0]): bad += 1
    if crossing != (abs(P) < 1): bad += 1
    cnt["nested" if (th+a<=b or th+b<=a) else "cross" if crossing else "disjoint"] += 1
print("mismatches:", bad, cnt)
# Moebius maps: a Lorentz boost of R^{1,4} maps caps to caps and preserves P
def boost(u, s):
    L = np.eye(5); ch, sh = np.cosh(s), np.sinh(s)
    L[0, 0] = ch; L[0, 1:] = sh*u; L[1:, 0] = sh*u; L[1:, 1:] += (ch-1)*np.outer(u, u); return L
err = 0.0
for _ in range(200):
    L = boost(unit(), rng.uniform(-1.5, 1.5)); n, m = unit(), unit(); a, b = rng.uniform(0.1, 3.0, size=2)
    p, q = xi(n, a), xi(m, b); err = max(err, abs(B(L@p, L@q) - B(p, q)))
    x = unit(); X = np.concatenate([[1.0], x]); Y = L@X; y = Y[1:]/Y[0]
    err = max(err, abs(np.linalg.norm(y) - 1))
    # membership t + <v,x> = B((t,-v),(1,x)) is preserved because L preserves B
    pt = np.concatenate([[p[0]], -p[1:]]); err = max(err, abs(B(L@pt, Y) - B(pt, X)))
print("boost invariance error: %.1e" % err)
