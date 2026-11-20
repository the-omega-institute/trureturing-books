"""Numerical sanity checks for the identities used in the draft (not a proof)."""
import numpy as np
rng = np.random.default_rng(7)

def unit(n=4):
    v = rng.normal(size=n); return v / np.linalg.norm(v)
def qmul(a, b):
    a0, a1, a2, a3 = a; b0, b1, b2, b3 = b
    return np.array([a0*b0-a1*b1-a2*b2-a3*b3, a0*b1+a1*b0+a2*b3-a3*b2,
                     a0*b2-a1*b3+a2*b0+a3*b1, a0*b3+a1*b2-a2*b1+a3*b0])
def qinv(a): return np.array([a[0], -a[1], -a[2], -a[3]])
def heap(x, y, z): return qmul(qmul(x, qinv(y)), z)
def kappa(x, y): return (1 + x @ y) / 2
def c(x, y): return x @ y
qi = np.array([0., 1, 0, 0]); qj = np.array([0., 0, 1, 0])
def clock(x, chi): return qmul(x, np.array([np.cos(chi), np.sin(chi), 0, 0]))  # right translation
def to_c2(x):  # x = z0 + j z1-type split compatible with right mult by e^{i chi}
    return np.array([x[0] + 1j*x[1], x[2] - 1j*x[3]])
def hopf(x): return qmul(qmul(x, qi), qinv(x))[1:]

err = {k: 0.0 for k in ["heap", "kappa=|mid|^2", "reflection", "round-trip", "d'Alembert", "clock is scalar",
                         "amplitude", "Born max", "Born mean", "Born Bloch", "Born round-trip",
                         "time reversal", "uncertainty", "geodesic", "composite avg", "biinv", "Born not biinv"]}
chis = np.linspace(0, 2*np.pi, 20001)[:-1]
for _ in range(300):
    x, y, z, u, v, w = (unit() for _ in range(6))
    err["heap"] = max(err["heap"], np.abs(heap(x, x, z) - z).max(), np.abs(heap(x, z, z) - x).max(),
                      np.abs(heap(heap(x, y, z), u, v) - heap(x, y, heap(z, u, v))).max())
    err["kappa=|mid|^2"] = max(err["kappa=|mid|^2"], abs(kappa(x, y) - np.sum(((x+y)/2)**2)),
                               abs(kappa(x, y) - (1 - np.sum((x-y)**2)/4)))
    err["reflection"] = max(err["reflection"], np.abs(heap(x, w, x) - (2*(x@w)*x - w)).max())
    err["round-trip"] = max(err["round-trip"], abs(kappa(w, heap(x, w, x)) - (2*kappa(w, x) - 1)**2))
    err["d'Alembert"] = max(err["d'Alembert"], abs(c(y, heap(x, w, x)) + c(y, w) - 2*c(w, x)*c(y, x)))
    err["biinv"] = max(err["biinv"], abs(kappa(heap(x, u, v), heap(y, u, v)) - kappa(x, y)),
                       abs(kappa(heap(u, v, x), heap(u, v, y)) - kappa(x, y)))
    chi = rng.uniform(0, 2*np.pi)
    err["clock is scalar"] = max(err["clock is scalar"], np.abs(to_c2(clock(x, chi)) - np.exp(1j*chi)*to_c2(x)).max())
    amp = np.vdot(to_c2(x), to_c2(y))
    err["amplitude"] = max(err["amplitude"], abs(amp - (c(x, y) + 1j*c(clock(x, np.pi/2), y))))
    vals = np.array([c(clock(x, t), y) for t in chis[::40]])
    born = abs(amp)**2
    err["Born max"] = max(err["Born max"], abs(vals.max()**2 - born) )
    err["Born mean"] = max(err["Born mean"], abs(2*np.mean(vals**2) - born))
    err["Born Bloch"] = max(err["Born Bloch"], abs((1 + hopf(x) @ hopf(y))/2 - born))
    rt = max(kappa(y, heap(clock(x, t), y, clock(x, t))) for t in chis[::40])
    err["Born round-trip"] = max(err["Born round-trip"], abs(rt - born))
    err["time reversal"] = max(err["time reversal"], np.abs(hopf(qmul(x, qj)) + hopf(x)).max())
    a, b, r = rng.normal(size=3), rng.normal(size=3), hopf(x)
    lhs = (a@a - (a@r)**2) * (b@b - (b@r)**2)
    rhs = (a@b - (a@r)*(b@r))**2 + (np.cross(a, b) @ r)**2
    err["uncertainty"] = max(err["uncertainty"], abs(lhs - rhs))
    g = qmul(y, qinv(x)); x2 = heap(y, x, y)
    err["geodesic"] = max(err["geodesic"], np.abs(x2 - qmul(qmul(g, g), x)).max())
    x2_, y2_ = unit(), unit()
    a1 = np.vdot(to_c2(x), to_c2(x2_)); a2 = np.vdot(to_c2(y), to_c2(y2_))
    avg = np.mean([c(clock(x, t), x2_) * c(clock(y, -t), y2_) for t in chis[::40]])
    err["composite avg"] = max(err["composite avg"], abs(avg - 0.5*np.real(a1*a2)))
    bx = abs(np.vdot(to_c2(qmul(x, u)), to_c2(qmul(y, u))))**2
    err["Born not biinv"] = max(err["Born not biinv"], abs(bx - born))
for k, e in err.items(): print(f"{k:18s} max err = {e:.2e}")
# rank of the comparison kernel and of the Born kernel
X = np.array([unit() for _ in range(60)])
K = (1 + X @ X.T)/2; print("rank kappa Gram:", np.linalg.matrix_rank(K, tol=1e-9), " min eig %.1e" % np.linalg.eigvalsh(K).min())
R = np.array([hopf(x) for x in X]); B = (1 + R @ R.T)/2; print("rank Born Gram:", np.linalg.matrix_rank(B, tol=1e-9))
# antidiagonal-clock invariant subspace of R^4 (x) R^4
J = np.zeros((4, 4)); 
for k in range(4):
    e = np.zeros(4); e[k] = 1; J[:, k] = qmul(e, qi)
P = (np.eye(16) - np.kron(J, J))/2; print("dim of J1=J2 subspace:", int(round(np.trace(P))))
