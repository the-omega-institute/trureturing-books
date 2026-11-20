"""Independent algebra helpers for Section 5A. Octonions via explicit Fano-plane table,
quaternions via explicit Hamilton table; Herm_3(O) Jordan algebra."""
import numpy as np

# Octonion multiplication table e_i e_j for i,j in 1..7 via Fano triples (Baez convention)
TRIPLES = [(1,2,4),(2,3,5),(3,4,6),(4,5,7),(5,6,1),(6,7,2),(7,1,3)]
MT = np.zeros((8,8,8))  # MT[i,j,k]: coefficient of e_k in e_i e_j
for i in range(8):
    MT[0,i,i] = 1; MT[i,0,i] = 1
for i in range(1,8):
    MT[i,i,0] = -1
for (a,b,c) in TRIPLES:
    for (x,y,z) in [(a,b,c),(b,c,a),(c,a,b)]:
        MT[x,y,z] = 1; MT[y,x,z] = -1
def omul(a,b):
    return np.einsum('i,j,ijk->k', a, b, MT)
def oconj(a):
    c = -a.copy(); c[0] = a[0]; return c
def onorm2(a):
    return float(a @ a)

def check_octonions(rng):
    # alternativity + norm multiplicativity + non-associativity
    for _ in range(50):
        a,b,c = rng.normal(size=(3,8))
        assert np.allclose(omul(omul(a,a),b), omul(a,omul(a,b)))
        assert np.allclose(omul(omul(b,a),a), omul(b,omul(a,a)))
        assert np.isclose(onorm2(omul(a,b)), onorm2(a)*onorm2(b))
    a,b,c = rng.normal(size=(3,8))
    assoc = omul(omul(a,b),c) - omul(a,omul(b,c))
    assert np.linalg.norm(assoc) > 1e-3
    return True

# Herm_3(O): array (3,3,8)
def hmul(A,B):
    n = A.shape[0]
    C = np.zeros((n,n,8))
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i,j] += omul(A[i,k],B[k,j])
    return C
def jordan(A,B):
    return 0.5*(hmul(A,B)+hmul(B,A))
def htr(A):
    return sum(A[i,i,0] for i in range(A.shape[0]))
def tform(A,B):
    return htr(jordan(A,B))
def outer(v):
    n = v.shape[0]
    P = np.zeros((n,n,8))
    for i in range(n):
        for j in range(n):
            P[i,j] = omul(v[i], oconj(v[j]))
    return P
def is_herm(A):
    return all(np.allclose(A[i,j], oconj(A[j,i])) for i in range(3) for j in range(3))
def chart_point(u1,u2):
    one = np.zeros(8); one[0]=1
    v = np.array([one,u1,u2])
    return outer(v)/(1+onorm2(u1)+onorm2(u2))
def L(P,A): return jordan(P,A)
def refl(P,A):
    # (I + 8(L_P^2 - L_P)) A
    LA = L(P,A); LLA = L(P,LA)
    return A + 8*(LLA - LA)
