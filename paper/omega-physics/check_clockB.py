"""Round 15 (Paper 2): binarity [B] as a conclusion.
Input [Cl]: the unobservable group K (closed subgroup of the right transports SU(2)) contains a clock T
(a one-parameter group): the phase of the system's own clock is unobservable for a closed system.
Input [NT]: some pair of classes is orthogonal (s_K = 0 somewhere).
Closed subgroups of SU(2) containing a one-parameter subgroup: T, its normaliser N(T) = T u T j, and SU(2).
  K = T    : s_K = |<x,y>_C| = cos(theta/2), minimum 0, each class has exactly one orthogonal class (binary);
  K = N(T) : s_K = max(cos(theta/2), sin(theta/2)), minimum 1/sqrt 2 > 0 (no orthogonal classes);
  K = SU(2): s_K = 1.
So [Cl] + [NT] force K = T, and binarity follows.  The real reading K = {+-1} contains no clock."""
import numpy as np
rng = np.random.default_rng(15); n = 0
def qm(a, b):
    w1, x1, y1, z1 = a; w2, x2, y2, z2 = b
    return np.array([w1*w2-x1*x2-y1*y2-z1*z2, w1*x2+x1*w2+y1*z2-z1*y2,
                     w1*y2-x1*z2+y1*w2+z1*x2, w1*z2+x1*y2-y1*x2+z1*w2])
unit = lambda: (lambda v: v / np.linalg.norm(v))(rng.normal(size=4))
I = np.array([0, 1.0, 0, 0]); Jq = np.array([0, 0, 1.0, 0])
def sT(x, y):                         # sup over the clock exp(t i) acting on the right
    return np.hypot(x @ y, qm(x, I) @ y)
def sN(x, y): return max(sT(x, y), sT(qm(x, Jq), y))
def brute(x, y, with_j):
    ts = np.linspace(0, 2 * np.pi, 4001); best = -9
    for base in ([x, qm(x, Jq)] if with_j else [x]):
        vals = np.cos(ts) * (base @ y) + np.sin(ts) * (qm(base, I) @ y); best = max(best, vals.max())
    return best
def bloch(x):                         # Hopf image for the right action of exp(t i): n = x i conj(x)
    c = x * np.array([1, -1, -1, -1]); return qm(qm(x, I), c)[1:]
mT, mN = 9.0, 9.0
for _ in range(4000):
    x, y = unit(), unit()
    th = np.arccos(np.clip(bloch(x) @ bloch(y), -1, 1))
    assert abs(sT(x, y) - np.cos(th / 2)) < 1e-9; n += 1
    assert abs(sN(x, y) - max(np.cos(th / 2), np.sin(th / 2))) < 1e-9; n += 1
    mT, mN = min(mT, sT(x, y)), min(mN, sN(x, y))
for _ in range(60):
    x, y = unit(), unit()
    assert abs(sT(x, y) - brute(x, y, False)) < 1e-5 and abs(sN(x, y) - brute(x, y, True)) < 1e-5; n += 2
assert mN > 1 / np.sqrt(2) - 1e-9; n += 1                      # N(T): no orthogonal classes
x = unit(); y = qm(x, Jq)                                      # T: the orthogonal class of x is the class of x j
assert sT(x, y) < 1e-12 and abs(sN(x, y) - 1) < 1e-12; n += 2  # and N(T) identifies the two
for _ in range(500):                                           # binarity for T: s_T(x,z) = 0 forces z in the class of x j
    z = unit(); z = z - (z @ x) * x - (z @ qm(x, I)) * qm(x, I); z /= np.linalg.norm(z)
    assert sT(x, z) < 1e-12 and abs(sT(y, z) - 1) < 1e-9; n += 2
print(f"min s_T sampled {mT:.4f} (true 0), min s_N(T) sampled {mN:.4f} (true {1/np.sqrt(2):.4f})")
print(f"ALL PASSED: {n} checks")
