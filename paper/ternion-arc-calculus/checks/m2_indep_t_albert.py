"""Independent checks for Section 5A (Albert algebra): idempotents, reflection operator, closing law,
Bargmann identity, Peirce projection identity, automorphism + Loos laws, witness and phase family."""
import numpy as np
from m2_indep_alg import *
rng = np.random.default_rng(7)
check_octonions(rng)
def rnd_pt(scale=1.0):
    return chart_point(scale*rng.normal(size=8), scale*rng.normal(size=8))
def rnd_herm():
    A = np.zeros((3,3,8))
    for i in range(3):
        A[i,i,0] = rng.normal()
        for j in range(i+1,3):
            A[i,j] = rng.normal(size=8); A[j,i] = oconj(A[i,j])
    return A
maxerr = {}
def rec(k,v): maxerr[k] = max(maxerr.get(k,0), abs(v))
for trial in range(25):
    X, W, Y = rnd_pt(), rnd_pt(), rnd_pt()
    for P in (X,W,Y):
        rec('idempotent', np.abs(hmul(P,P)-P).max()); rec('trace1', htr(P)-1)
    S = refl(X,W)
    rec('refl idempotent', np.abs(hmul(S,S)-S).max()); rec('refl trace', htr(S)-1)
    rec('refl herm', 0 if is_herm(S) else 1)
    b = lambda A,B: tform(A,B)
    rec('closing', b(W,S) - (2*b(W,X)-1)**2)
    Bt = htr(jordan(Y, jordan(X,W)))
    rec('bargmann', b(Y,S) - (4*b(Y,X)*b(X,W) + b(Y,W) - 4*Bt))
    Lw = L(X,W); prim = 2*L(X,Lw) - Lw
    rec('primitive', np.abs(prim - b(X,W)*X).max())
    rec('fix center', np.abs(refl(X,X)-X).max())
    rec('involution', np.abs(refl(X,refl(X,W))-W).max())
    # automorphism of Jordan product, general elements
    A, B = rnd_herm(), rnd_herm()
    rec('automorphism', np.abs(jordan(refl(X,A),refl(X,B)) - refl(X,jordan(A,B))).max())
    rec('trace pres', htr(refl(X,A)) - htr(A))
    # Loos third law as operators: s_x s_y s_x = s_{s_x y}
    sxy = refl(X,Y)
    lhs = refl(X, refl(Y, refl(X, A))); rhs = refl(sxy, A)
    rec('loos3', np.abs(lhs-rhs).max())
    # comparison invariance
    rec('invariance', b(refl(X,Y),refl(X,W)) - b(Y,W))
for k,v in maxerr.items(): print(f'{k:18s} max err {v:.2e}')
assert all(v < 1e-9 for v in maxerr.values())
# cut locus: fixed points of s_E include OP^1 points
E = np.zeros((3,3,8)); E[0,0,0]=1
p = 0.3; z = rng.normal(size=8); z *= np.sqrt(p*(1-p))/np.linalg.norm(z)
C = np.zeros((3,3,8)); C[1,1,0]=p; C[2,2,0]=1-p; C[1,2]=z; C[2,1]=oconj(z)
assert np.abs(hmul(C,C)-C).max()<1e-12 and abs(tform(E,C))<1e-14 and np.abs(refl(E,C)-C).max()<1e-12
# geodesic Q_v(t) from E: beta = cos^2 t, unit speed for metric 1/2 tr(dQ o dQ)
v1, v2 = rng.normal(size=8), rng.normal(size=8); nv = np.sqrt(onorm2(v1)+onorm2(v2)); v1/=nv; v2/=nv
def Q(t):
    one=np.zeros(8); one[0]=np.cos(t); return outer(np.array([one, v1*np.sin(t), v2*np.sin(t)]))
for t in np.linspace(0,np.pi,13):
    assert abs(tform(E,Q(t))-np.cos(t)**2)<1e-12
    h=1e-5; dQ=(Q(t+h)-Q(t-h))/(2*h)
    assert abs(0.5*tform(dQ,dQ)-1)<1e-7
    # symmetry at Q(t) maps Q(t+s) to Q(t-s)
    assert np.abs(refl(Q(t),Q(t+0.37))-Q(t-0.37)).max()<1e-10
assert np.abs(Q(np.pi)-Q(0)).max()<1e-12
print('Albert cut locus / geodesics OK')
# witness and phase family embedded in Herm_3(O) (real / complex entries)
def emb(vec):  # complex vector -> octonion vector using e0,e1 as C
    return np.array([[c.real, c.imag,0,0,0,0,0,0] for c in vec])
x = np.array([1,0,0],complex); w = np.array([1,1,0],complex)/np.sqrt(2)
X, W = outer(emb(x)), outer(emb(w))
for th in np.linspace(0,np.pi,9):
    y = np.array([1, 2*np.exp(1j*th)-1, np.sqrt(4+4*np.cos(th))])/np.sqrt(10)
    Y = outer(emb(y)); S = refl(X,W)
    vals = (tform(Y,X), tform(Y,W), tform(X,W), tform(Y,S), htr(jordan(Y,jordan(X,W))))
    exp = (0.1, 0.2, 0.5, 0.4*(1-np.cos(th)), np.cos(th)/10)
    assert np.allclose(vals, exp, atol=1e-12), (th, vals, exp)
print('Albert witness / phase family OK: beta(y,s_x w) = 2/5(1-cos th), B = cos th /10')
