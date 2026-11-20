"""Independent checks for Section 5A: generic CP^3 Bargmann identity with Re Delta, phase family, product-space closing failure."""
import numpy as np
rng=np.random.default_rng(5)
P=lambda v:np.outer(v,v.conj())
def u(n): v=rng.normal(size=n)+1j*rng.normal(size=n); return v/np.linalg.norm(v)
err=0
for _ in range(500):
    x,w,y=u(4),u(4),u(4)
    sw=2*x*np.vdot(x,w)-w
    b=lambda a,c:abs(np.vdot(a,c))**2
    D=np.vdot(y,x)*np.vdot(x,w)*np.vdot(w,y)
    err=max(err,abs(b(y,sw)-(4*b(y,x)*b(x,w)+b(y,w)-4*D.real)),abs(np.trace(P(y)@P(x)@P(w))-D))
print('CP^3 Bargmann max err %.1e'%err); assert err<1e-13
x=np.array([1,0,0]);w=np.array([1,1,0])/np.sqrt(2);sw=2*x*np.vdot(x,w)-w
th=np.linspace(0,2*np.pi,721); vals=[]
for t in th:
    y=np.array([1,2*np.exp(1j*t)-1,np.sqrt(4+4*np.cos(t))])/np.sqrt(10)
    assert abs(np.linalg.norm(y)-1)<1e-14 and abs(abs(np.vdot(y,x))**2-.1)<1e-14 and abs(abs(np.vdot(y,w))**2-.2)<1e-14
    vals.append(abs(np.vdot(y,sw))**2)
print('phase family reflected weight range [%.6f, %.6f]'%(min(vals),max(vals)))
# product S^2 x S^2 with kappa=k1*k2 and product reflection: closing law fails
a=np.array([1,0,0.]);b=np.array([np.cos(1),np.sin(1),0])
k=lambda p,q:(1+p@q)/2; r=lambda p,q:2*(p@q)*p-q
lhs=k(b,r(a,b))*k(b,r(a,b)); rhs=(2*k(b,a)*k(b,a)-1)**2
print('S^2xS^2 product: lhs %.4f rhs %.4f'%(lhs,rhs))
