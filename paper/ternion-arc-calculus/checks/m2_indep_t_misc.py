"""Independent checks for Section 5A: refuted-item counterexamples, Bloch/octant, rephasing,
Gram, Schoenberg, tilted determinants, tent-map normalisation."""
import numpy as np
rng=np.random.default_rng(3)
# --- torus (m2:torus)
k=lambda x,y:(2+np.cos(x[0]-y[0])+np.cos(x[1]-y[1]))/4
s=lambda x,w:(2*np.asarray(x)-np.asarray(w))%(2*np.pi)
for _ in range(200):
    x,y,z,w=rng.uniform(0,2*np.pi,(4,2))
    assert np.allclose(s(x,x),x%(2*np.pi)) and np.allclose(s(x,s(x,w)),w)
    assert np.allclose(s(x,s(y,s(x,z))),s(s(x,y),z))
    assert abs(k(s(z,x),s(z,y))-k(x,y))<1e-14 and 0<=k(x,y)<=1
w=np.array([0.,0.]); x=np.array([np.pi,0.])
print('torus: lhs',k(w,s(x,w)),' rhs',(2*k(w,x)-1)**2)
# --- four-cycle (m2:rephasing)
v=[np.array([1,0,0]),np.array([1,1,1])/np.sqrt(3),np.array([0,1,0]),np.array([1,1j,-(1+1j)])/2]
G=np.array([[np.vdot(a,b) for b in v] for a in v])
assert np.allclose(np.diag(G),1) and abs(G[0,2])<1e-15 and abs(G[1,3])<1e-15
cyc=G[0,1]*G[1,2]*G[2,3]*G[3,0]
print('four-cycle overlaps',np.round([G[0,1],G[1,2],G[2,3],G[3,0]],6),' product',np.round(cyc,12))
# --- table with det -3
r=np.sqrt(3)/2; S=np.array([[1,r,r],[r,1,-1],[r,-1,1]]); print('table det',round(np.linalg.det(S),12),'eigs',np.round(np.linalg.eigvalsh(S),6))
# --- instruments
P=np.diag([1.,0]);Q=np.eye(2)-P;X=np.array([[0,1],[1,0.]])
assert np.allclose((X@P).T@(X@P),P) and np.allclose((X@Q).T@(X@Q),Q)
print('instrument joint weights',np.trace(Q@P@P@P),np.trace(Q@(X@P)@P@(X@P).T))
# --- Paper II descent: real sphere reflection at e1 vs i e1
w=np.array([1,1],complex)/np.sqrt(2)
rre=lambda x,w:2*np.real(np.vdot(x,w))*x-w
a=rre(np.array([1,0],complex),w); b=rre(np.array([1j,0]),w)
print('clock descent: outputs',a,b,' overlap',abs(np.vdot(a,b)))
# --- Bloch formulas and octant
sig=[np.array([[0,1],[1,0]]),np.array([[0,-1j],[1j,0]]),np.array([[1,0],[0,-1]])]
Pb=lambda a:(np.eye(2)+sum(ai*si for ai,si in zip(a,sig)))/2
for _ in range(100):
    a,b,c=[u/np.linalg.norm(u) for u in rng.normal(size=(3,3))]
    D=np.trace(Pb(a)@Pb(b)@Pb(c)); p,q,rr=a@b,b@c,c@a; Sx=1+p+q+rr; Dt=a@np.cross(b,c)
    assert abs(D-(Sx+1j*Dt)/4)<1e-14
    assert abs(Dt**2-(1+2*p*q*rr-p*p-q*q-rr*rr))<1e-13 and abs(Sx**2+Dt**2-2*(1+p)*(1+q)*(1+rr))<1e-13
# horizontal transport return phase = -arg Delta
def ray(a):
    Pm=Pb(a); ev,V=np.linalg.eigh(Pm); return V[:,-1]
for _ in range(50):
    a,b,c=[u/np.linalg.norm(u) for u in rng.normal(size=(3,3))]
    psi=ray(a); psi0=psi.copy()
    for t in (b,c,a):
        r_=ray(t); psi=r_*np.vdot(r_,psi); psi/=np.linalg.norm(psi)
    Dl=np.trace(Pb(a)@Pb(b)@Pb(c))
    assert abs(np.angle(np.vdot(psi0,psi))+np.angle(Dl))<1e-10
for th in (0.3,1.1,2.5):
    a=np.array([0,0,1.]);b=np.array([np.sin(th),0,np.cos(th)]);c=np.array([0,np.sin(th),np.cos(th)])
    Dl=np.trace(Pb(a)@Pb(b)@Pb(c))
    # solid angle by L'Huilier-free formula (van Oosterom-Strackee with atan2)
    Om=2*np.arctan2(a@np.cross(b,c),1+a@b+b@c+c@a)
    assert abs(np.angle(Dl)-np.arctan(np.tan(th/2)**2))<1e-13 and abs(np.angle(Dl)-Om/2)<1e-13
lifts=[np.array([1,1j**j])/np.sqrt(2) for j in range(4)]
ov=[np.vdot(lifts[j],lifts[(j+1)%4]) for j in range(4)]
print('equatorial overlaps',np.round(ov,12),'product',np.round(np.prod(ov),12))
# --- tilted determinants
for th in (0.2,0.9):
    A=np.array([1,0,0.]);B=np.array([np.cos(th),np.sin(th),0]);Pp=np.array([np.cos(th),0,np.sin(th)])
    g1=np.linalg.det(np.array([A,B,[0,0,1]])@np.array([A,B,[0,0,1]]).T); g2=np.linalg.det(np.array([A,B,Pp])@np.array([A,B,Pp]).T)
    assert abs(g1-np.sin(th)**2)<1e-14 and abs(g2-np.sin(th)**4)<1e-14
# --- Schoenberg double centering converse (random Euclidean config + perturbed non-Euclidean)
N=6; Xp=rng.normal(size=(N,3)); D=((Xp[:,None]-Xp[None])**2).sum(-1); J=np.eye(N)-1/N
assert np.linalg.eigvalsh(-J@D@J/2).min()>-1e-12
# --- three orthogonal rays: Gram of 2beta-1
print('2I-J eigenvalues',np.linalg.eigvalsh(2*np.eye(3)-np.ones((3,3))))
# --- tent-map normalisation: f(2t)=T(f(t)) with zero set LZ forces f=f0. Probe: a continuous
# candidate obeying the same level sets but different branch shape violates the tent law.
T=lambda u: 2*u if u<=np.pi/2 else 2*np.pi-2*u
f0=lambda t:2*np.pi*abs(t-np.rint(t))
g=lambda t: np.pi*(1-np.cos(f0(t)))/2      # same zeros, same pi/2 and pi level sets
viol=max(abs(g(2*t)-T(g(t))) for t in np.linspace(0,1,1001))
print('alternative same-level-set profile violates tent law by',round(viol,4))
