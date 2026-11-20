# Numerical checks for Theorem oneclock (called by check_physics.py).
"""Round 10: one clock for a composite from normalisation.
W = V1 (x)_R V2 with V = C^2 = R^4.  Local clocks T1 x T2 are the unobservable group of the composite.
Claims checked:
 (1) the commutant of U(2) x U(2) on W is C + C  (so an equivariant bilinear product map is a P+ + b P-);
 (2) s_K(u,v) = sup over T1 x T2 of <u,kv> equals |z+| + |z-|  (z+- the Hermitian products in H+-);
 (3) on products s_K = s_1 s_2 for every a, b (multiplicativity does not see a, b);
 (4) if a b != 0 the reading (W, T1 x T2, s^p) is not normalised for any p >= 0:
     the 8-element family forces p = 2 and a 4-element maximal family then sums to 1/2;
 (5) on H+ alone (single clock) s^2 is normalised on every orthonormal complex basis.
"""
import numpy as np
rng = np.random.default_rng(10); n = 0
J = np.kron(np.array([[0., -1.], [1., 0.]]), np.eye(2))          # complex structure on R^4 = C^2 (re, im blocks)
I4 = np.eye(4); J1 = np.kron(J, I4); J2 = np.kron(I4, J)
Pp = (np.eye(16) - J1 @ J2) / 2; Pm = (np.eye(16) + J1 @ J2) / 2   # on H+: J1 = J2 ; on H-: J1 = -J2
assert np.allclose(Pp @ Pp, Pp) and np.allclose(Pm @ Pm, Pm) and np.allclose(Pp @ Pm, 0); n += 1
assert round(np.trace(Pp)) == 8 and round(np.trace(Pm)) == 8; n += 1

def c2r(M):                                                       # complex 2x2 -> real 4x4 commuting with J
    return np.block([[M.real, -M.imag], [M.imag, M.real]])
# (1) commutant of the Lie algebra u(2) + u(2) acting on W
paul = [np.array([[0, 1], [1, 0]], complex), np.array([[0, -1j], [1j, 0]]), np.array([[1, 0], [0, -1]], complex), np.eye(2, dtype=complex)]
gens = [np.kron(c2r(1j * s), I4) for s in paul] + [np.kron(I4, c2r(1j * s)) for s in paul]
A = np.vstack([np.kron(G, np.eye(16)) - np.kron(np.eye(16), G.T) for G in gens])   # vec(GX - XG) = 0
sv = np.linalg.svd(A, compute_uv=False)
assert int(np.sum(sv < 1e-9)) == 4; n += 1                         # C + C as a real algebra

def z(u, v, P):                                                    # Hermitian product inside H+-: <u,Pv> + i <u, P J1 v>... sign-free modulus
    return complex(u @ P @ v, u @ P @ J1 @ v)
def sK(u, v):                                                      # closed form
    return abs(z(u, v, Pp)) + abs(z(u, v, Pm))
def sK_brute(u, v, m=240):
    th = np.linspace(0, 2 * np.pi, m, endpoint=False); best = -9
    for t1 in th:
        R1 = np.cos(t1) * np.eye(16) + np.sin(t1) * J1
        w = R1 @ v
        vals = np.cos(th) * (u @ w) + np.sin(th) * (u @ (J2 @ w))
        best = max(best, vals.max())
    return best
unit = lambda k: (lambda x: x / np.linalg.norm(x))(rng.normal(size=k))
for _ in range(40):                                                # (2)
    u, v = unit(16), unit(16)
    assert abs(sK(u, v) - sK_brute(u, v)) < 2e-3; n += 1

def herm(x, y):                                                    # |<x,y>_C| on C^2 = R^4
    return abs(complex(x @ y, x @ J @ y))
for _ in range(200):                                               # (3)
    a, b = rng.normal(size=2); nb = np.hypot(a, b) / np.sqrt(2)
    x, y, x2, y2 = unit(4), unit(4), unit(4), unit(4)
    Phi = lambda p, q: (a * Pp + b * Pm) @ np.kron(p, q) / nb
    assert abs(np.linalg.norm(Phi(x, y)) - 1) < 1e-12; n += 1
    assert abs(sK(Phi(x, y), Phi(x2, y2)) - herm(x, x2) * herm(y, y2)) < 1e-12; n += 1

# (4) two maximal pairwise-orthogonal families of different sizes when both components are present
def cbasis(P):                                                     # complex-orthonormal basis of a component (4 vectors)
    Q, _ = np.linalg.qr(P @ rng.normal(size=(16, 16))); vecs = []
    for q in Q.T:
        q = P @ q
        for e in vecs:
            zz = z(e, q, P); q = q - zz.real * e + zz.imag * (J1 @ e)   # remove the complex line of e (<J1 e,q> = -Im z)
        if np.linalg.norm(q) > 1e-8:
            vecs.append(q / np.linalg.norm(q))
        if len(vecs) == 4: break
    return vecs
ep, em = cbasis(Pp), cbasis(Pm)
famA = ep + em                                                     # 8 classes
famB = [(p + m) / np.sqrt(2) for p, m in zip(ep, em)]              # 4 classes
for fam in (famA, famB):
    for i in range(len(fam)):
        for j in range(i):
            assert sK(fam[i], fam[j]) < 1e-10; n += 1
# maximality of famB: any w with sK(w, v_i) = 0 for all i has both components zero
M = np.array([[abs(z(w, v, Pp)) + abs(z(w, v, Pm)) for v in famB] for w in [unit(16) for _ in range(2000)]])
assert M.max(axis=1).min() > 1e-3; n += 1
for _ in range(100):
    u = unit(16)
    assert abs(sum(sK(u, v) ** 2 for v in famA) - 1) < 1e-10; n += 1          # p = 2 normalises family A
    # and p = 2 is forced on family A: take u = (e1+ + e2+)/sqrt2 -> 2 (1/sqrt2)^p = 1
u = ep[0]
assert abs(sum(sK(u, v) ** 2 for v in famB) - 0.5) < 1e-12; n += 1             # family B sums to 1/2 at p = 2
for p in (0.5, 1, 2, 3):
    assert abs(sum(sK(u, v) ** p for v in famB) - 1) > 0.1 or p == 0; n += 1  # (1/sqrt2)^p != 1 for p > 0
# (5) single clock: H+ with s^2 is normalised
for _ in range(50):
    basis = cbasis(Pp); u = Pp @ rng.normal(size=16); u /= np.linalg.norm(u)
    assert abs(sum(sK(u, v) ** 2 for v in basis) - 1) < 1e-9; n += 1
    assert abs(z(u, basis[0], Pm)) < 1e-12; n += 1
print(f"ALL PASSED: {n} checks")
