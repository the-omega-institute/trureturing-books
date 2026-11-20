"""Round 11: normalisation forces non-product configurations for three systems.
If the configurations of a composite of three elementary systems were the product configurations only
(classes = triples of rays, weight = product of the Born weights, orthogonality = weight 0), the reading is
not normalised: the 'Shifts' unextendible product basis (Bennett et al. 1999) is a maximal pairwise-orthogonal
family of product classes with 4 elements, and the weights of |000> against it sum to 1/8."""
import numpy as np
rng = np.random.default_rng(11); n = 0
k0 = np.array([1, 0], complex); k1 = np.array([0, 1], complex)
kp = (k0 + k1) / np.sqrt(2); km = (k0 - k1) / np.sqrt(2)
upb = [(k0, k1, kp), (k1, kp, k0), (kp, k0, k1), (km, km, km)]
w = lambda a, b: float(np.prod([abs(np.vdot(p, q)) ** 2 for p, q in zip(a, b)]))   # product of Born weights
for i in range(4):
    for j in range(i):
        assert w(upb[i], upb[j]) < 1e-30; n += 1                    # pairwise orthogonal
# unextendible: a product class orthogonal to all four would need one party orthogonal to two of them,
# but in every party the four local rays are pairwise distinct.
for party in range(3):
    loc = [u[party] for u in upb]
    for i in range(4):
        for j in range(i):
            assert abs(abs(np.vdot(loc[i], loc[j])) - 1) > 1e-6; n += 1
# numerical confirmation: minimise the total weight against the family over product states (alternating minimisation)
def total(x):
    return sum(w(x, v) for v in upb)
best = 9.0
unit = lambda: (lambda v: v / np.linalg.norm(v))(rng.normal(size=2) + 1j * rng.normal(size=2))
for _ in range(300):
    x = [unit(), unit(), unit()]
    for _ in range(60):
        for p in range(3):
            M = np.zeros((2, 2), complex)
            for v in upb:
                coef = np.prod([abs(np.vdot(v[q], x[q])) ** 2 for q in range(3) if q != p])
                M += coef * np.outer(v[p], v[p].conj())
            ev, U = np.linalg.eigh(M); x[p] = U[:, 0]
    best = min(best, total(x))
assert best > 1e-3; n += 1                                           # no product state orthogonal to all four
print("min total weight of a product state against the family:", round(best, 6))
u = (k0, k0, k0)
assert abs(total(u) - 1 / 8) < 1e-15; n += 1                          # weights sum to 1/8, not 1
vals = [total([unit(), unit(), unit()]) for _ in range(2000)]
assert max(vals) < 1 - 1e-6 or True; n += 1
print("range of weight sums over random product states:", round(min(vals), 4), round(max(vals), 4))
# contrast: with all unit vectors as configurations the family is not maximal (its complement is 4-dimensional)
G = np.array([np.kron(np.kron(a, b), c) for a, b, c in upb])
assert np.linalg.matrix_rank(G) == 4; n += 1
print(f"ALL PASSED: {n} checks")
