"""Independent checks for Section 5A (associative models R,C,H): Bargmann identity, quaternionic cycle
conjugacy law, closing law through cut locus, fixed sets, kappa=cos^2 d on RP^n/CP^n/HP^n
with d computed from the path metric 1/2 tr(dQ^2), witness values."""
import numpy as np
rng = np.random.default_rng(11)
# quaternions as 4-vectors; quaternion matrices as (n,m,4)
def qmul(a,b):
    a0,a1,a2,a3 = a; b0,b1,b2,b3 = b
    return np.array([a0*b0-a1*b1-a2*b2-a3*b3, a0*b1+a1*b0+a2*b3-a3*b2,
                     a0*b2-a1*b3+a2*b0+a3*b1, a0*b3+a1*b2-a2*b1+a3*b0])
def qconj(a): return a*np.array([1,-1,-1,-1])
def mm(A,B):
    n,k,_ = A.shape; m = B.shape[1]; C = np.zeros((n,m,4))
    for i in range(n):
        for j in range(m):
            for l in range(k): C[i,j]+=qmul(A[i,l],B[l,j])
    return C
def adj(A): return np.array([[qconj(A[j,i]) for j in range(A.shape[0])] for i in range(A.shape[1])])
def rtr(A): return sum(A[i,i,0] for i in range(A.shape[0]))
def unitq(n):
    v = rng.normal(size=(n,1,4)); return v/np.sqrt((v**2).sum())
def proj(v): return mm(v, adj(v))
def ip(a,b): return mm(adj(a),b)[0,0]   # a^* b, quaternion
n=4
I = np.zeros((n,n,4)); I[range(n),range(n),0]=1
err=0
for _ in range(40):
    x,w,y = unitq(n),unitq(n),unitq(n)
    Px,Pw,Py = proj(x),proj(w),proj(y)
    R = 2*Px - I
    Ps = mm(mm(R,Pw),R)
    beta = lambda A,B: rtr(mm(A,B))
    lhs = beta(Py,Ps)
    Bt = rtr(mm(mm(Py,Px),Pw))
    rhs = 4*beta(Py,Px)*beta(Px,Pw)+beta(Py,Pw)-4*Bt
    err=max(err,abs(lhs-rhs))
    # Bt = Re of cyclic scalar (y*x)(x*w)(w*y)
    D = qmul(qmul(ip(y,x),ip(x,w)),ip(w,y))
    err=max(err,abs(Bt-D[0]))
    # |D|^2 = product of betas
    err=max(err,abs((D**2).sum()-beta(Py,Px)*beta(Px,Pw)*beta(Pw,Py)))
    # rephasing law: D -> conj(q_y) D q_y
    qy,qx,qw = [q/np.linalg.norm(q) for q in rng.normal(size=(3,4))]
    rs = lambda v,q: np.array([[qmul(v[i,0],q)] for i in range(n)])
    D2 = qmul(qmul(ip(rs(y,qy),rs(x,qx)),ip(rs(x,qx),rs(w,qw))),ip(rs(w,qw),rs(y,qy)))
    err=max(err,np.abs(D2-qmul(qmul(qconj(qy),D),qy)).max())
    # closing law
    err=max(err,abs(beta(Pw,Ps)-(2*beta(Pw,Px)-1)**2))
# closing law at the cut locus: x orthogonal to w -> s_x w = w
x = unitq(n); w = unitq(n); w = w - np.array([[qmul(x[i,0],ip(x,w))] for i in range(n)]); w/=np.sqrt((w**2).sum())
Px,Pw = proj(x),proj(w); R=2*Px-I
err=max(err,np.abs(mm(mm(R,Pw),R)-Pw).max())
print('HP^3 Bargmann/cycle/closing max err %.2e'%err); assert err<1e-12

# Complex / real: kappa = cos^2 d with d the length metric of 1/2 Tr(dQ^2): compare
# arccos|x*y| with the length of the explicit geodesic and with random perturbed paths.
def P(v): return np.outer(v,v.conj())
def length(path):
    L=0
    for a,b in zip(path[:-1],path[1:]):
        d=b-a; L+=np.sqrt(0.5*np.real(np.trace(d@d)))
    return L
for field in ('R','C'):
    worst=0; minratio=np.inf
    for _ in range(30):
        m=3
        x = rng.normal(size=m)+ (1j*rng.normal(size=m) if field=='C' else 0); x/=np.linalg.norm(x)
        y = rng.normal(size=m)+ (1j*rng.normal(size=m) if field=='C' else 0); y/=np.linalg.norm(y)
        ov = np.vdot(x,y); ph = ov/abs(ov); yy = y/ph     # x^* yy >0
        d = np.arccos(min(1,abs(ov)))
        u = yy - np.vdot(x,yy)*x; u/=np.linalg.norm(u)
        ts = np.linspace(0,d,2001)
        geo = [P(np.cos(t)*x+np.sin(t)*u) for t in ts]
        worst=max(worst,abs(length(geo)-d), abs(abs(ov)**2-np.cos(d)**2))
        for _k in range(5):
            bump = rng.normal(size=m)+(1j*rng.normal(size=m) if field=='C' else 0)
            path=[]
            for t in ts:
                v=np.cos(t)*x+np.sin(t)*u+0.3*np.sin(np.pi*t/d)*bump; v/=np.linalg.norm(v); path.append(P(v))
            minratio=min(minratio,length(path)/d)
    print(field,'P^2: |geodesic length - arccos|x*y|| <= %.1e ; min(perturbed/geodesic) = %.4f'%(worst,minratio))
    assert worst<1e-5 and minratio>=1-1e-9
# RP^n: kappa=|<x,y>|^2 is symmetric, faithful, closing law holds everywhere incl. cut locus
for _ in range(200):
    x,w = rng.normal(size=(2,4)); x/=np.linalg.norm(x); w/=np.linalg.norm(w)
    sw = 2*(x@w)*x - w
    assert abs((w@sw)**2 - (2*(x@w)**2-1)**2) < 1e-13
# fixed set of s_x on CP^2: lines invariant under 2P_x - I are x and lines in x-perp
x=np.array([1,0,0],complex); R=2*P(x)-np.eye(3)
for _ in range(100):
    y=rng.normal(size=3)+1j*rng.normal(size=3); y/=np.linalg.norm(y)
    fixed = abs(abs(np.vdot(y,R@y))-1)<1e-12
    assert not fixed
y=np.array([0,1,1j])/np.sqrt(2); assert abs(abs(np.vdot(y,R@y))-1)<1e-14
# witness
x=np.array([1,0,0.]); w=np.array([1,1,0])/np.sqrt(2)
yp=np.array([1,1,np.sqrt(8)])/np.sqrt(10); ym=np.array([1,-3,0])/np.sqrt(10)
sxw=2*(x@w)*x-w
for y,sgn,val in ((yp,1,0.0),(ym,-1,0.8)):
    vals=((y@x)**2,(y@w)**2,(x@w)**2,(y@x)*(x@w)*(w@y),(y@sxw)**2)
    assert np.allclose(vals,(0.1,0.2,0.5,sgn*0.1,val),atol=1e-14), vals
print('witness values (1/10,1/5,1/2, B=+-1/10) -> reflected 0 and 4/5: OK')
