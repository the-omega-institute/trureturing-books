#!/usr/bin/env python3
"""Deterministic numerical controls for Section 9B (arc bodies, rotor curvature, rigidity, chords); requires NumPy."""
from itertools import combinations, product
from math import factorial, lcm
import re

import numpy as np


RNG = np.random.default_rng(81120)
PI = np.pi
NORM = np.linalg.norm


def close(actual, expected, atol=2e-10, rtol=2e-10):
    np.testing.assert_allclose(actual, expected, atol=atol, rtol=rtol)


def unit(vector):
    return vector / NORM(vector)


def angle(a, b):
    return np.arctan2(NORM(np.cross(a, b)), a @ b)


def area(vertices):
    gram = vertices @ vertices.T
    return 2 * np.arctan2(abs(np.linalg.det(vertices)),
                          1 + np.sum(gram[np.triu_indices(3, 1)]))


def right_cell(epsilon):
    s, c = np.sin(epsilon), np.cos(epsilon)
    return np.array([[s, c, 0], [0, 1, 0], [0, c, s]])


def geometry():
    nodes, weights = np.polynomial.legendre.leggauss(24)
    t = (nodes + 1) / 2
    u, v = np.meshgrid(t, t, indexing="ij")
    uv_weights = np.outer(weights, weights) / 4
    barycentric = np.stack([(1-u)*(1-v), u, (1-u)*v], axis=-1)
    for _ in range(64):
        vertices = np.array([unit(vec) for vec in RNG.normal(size=(3, 3))])
        determinant = abs(np.linalg.det(vertices))
        excess = area(vertices)
        lengths = np.array([angle(vertices[i], vertices[j])
                            for i, j in combinations(range(3), 2)])
        s = lengths.sum() / 2
        assert 0 < excess < 2 * PI and 0 < s < PI
        close(np.tan(excess / 4)**2,
              np.tan(s/2) * np.prod(np.tan((s-lengths)/2)), atol=1e-8)
        equi = np.full((3, 3), np.cos(2*s/3))
        np.fill_diagonal(equi, 1)
        assert excess <= area(np.linalg.cholesky(equi)) + 2e-10
        norm2 = np.sum([NORM(vertices[i]-vertices[j])**2
                                    for i, j in combinations(range(3), 2)])
        close(norm2, 9 - NORM(vertices.sum(axis=0))**2)
        chord_area = NORM(np.cross(vertices[1]-vertices[0],
                                   vertices[2]-vertices[0])) / 2
        assert chord_area < 3 * np.sqrt(3) / 4
        assert determinant <= 1 and determinant / 6 < excess / 3
    for epsilon in [PI/12, PI/4, PI/3, PI/2]:
        vertices = right_cell(epsilon)
        a, b, c = vertices
        cose = np.cos(epsilon)
        sinu = np.sin(epsilon)
        excess = area(vertices)
        length = angle(a, c)
        close(a @ c, cose**2)
        close(np.linalg.det(vertices @ vertices.T), sinu**4)
        close(angle(b-(a@b)*a, c-(a@c)*a), np.arctan2(1, cose))
        close(excess, 2*np.arctan(np.tan(epsilon/2)**2))
        close(np.cos(angle(a-b, c-b)), np.sin(epsilon/2)**2)
        radii = NORM(barycentric @ vertices, axis=-1)
        cap_integral = np.sum(uv_weights * (1-u) * sinu**2 / radii**3)
        close(cap_integral, excess, atol=7e-9)
        close(np.dot(weights/2, t*t)*cap_integral, excess/3, atol=3e-9)
        close(np.dot(weights/2, t)*(length+2*epsilon), (length+2*epsilon)/2)
        close(NORM(a-c), np.sqrt(2)*sinu)
        close(1-NORM((a+c)/2), 1-np.sqrt((1+cose**2)/2))
        assert NORM(a-c) < length < 2*epsilon
    close(area(np.eye(3)), PI/2)
    close(abs(np.linalg.det(np.eye(3)))/6, 1/6)
    a, _, c = right_cell(PI/3)
    close(NORM(a-c), np.sqrt(6)/2)
    close(1-NORM((a+c)/2), 1-np.sqrt(10)/4)
    for d in [0, .001, .3, 1.5, PI]:
        a = np.array([1., 0., 0.])
        b = np.array([np.cos(d), np.sin(d), 0.])
        close((a-b)@(a+b), 0)
        close(NORM(a-b), 2*np.sin(d/2))
        close(1-NORM((a+b)/2), 1-np.cos(d/2))
        assert d == 0 or NORM(a-b) < d
    d = .001
    close((d-2*np.sin(d/2))/d**3, 1/24, atol=2e-9)
    close(2*np.sin(d/4)**2/d**2, 1/8, atol=3e-9)
    e = .025
    close((area(right_cell(e))-e**2/2)/e**4, 1/12, atol=3e-5)
    close((-np.sin(e/2)**2+e**2/4)/e**4, 1/48, atol=2e-6)
    e = .02
    c = np.cos(e)
    r = np.sqrt((3+4*c+2*c*c)/9)
    close(r, NORM(right_cell(e).mean(axis=0)))
    eig = np.array([(1+r)/2, (1-r)/2])
    entropy = -(eig[0]**2*np.log(eig[0])-eig[1]**2*np.log(eig[1]))/r
    close(entropy/e**2, 1/9, atol=6e-5)
    close(entropy/(area(right_cell(e))/2), 4/9, atol=3e-4)
    assert np.linalg.matrix_rank(right_cell(e)) == 3
    o = unit(np.array([1., 1., 2.]))
    theta = .6
    latitude = np.array([[np.sin(theta)*np.cos(phi),
                          np.sin(theta)*np.sin(phi), np.cos(theta)]
                         for phi in np.arange(4)*PI/2])
    close(o @ latitude[0], o @ latitude[1])
    close(latitude[:, 2], np.cos(theta))
    rot, _ = np.linalg.qr(RNG.normal(size=(3, 3)))
    close(latitude @ (rot.T @ o), (latitude @ rot.T) @ o)
    close(np.cross(latitude[0], latitude[1]) @ latitude[:2].T, [0, 0])
    cyclic = np.roll(np.eye(3), 1, axis=0)
    close(cyclic @ np.ones(3), np.ones(3))
    close(np.sort_complex(np.linalg.eigvals(cyclic)),
          np.sort_complex(np.array([1, np.exp(2j*PI/3), np.exp(-2j*PI/3)])))


def qmul(p, q):
    return np.r_[p[0]*q[0] - p[1:] @ q[1:],
                 p[0]*q[1:] + q[0]*p[1:] + np.cross(p[1:], q[1:])]


def qconj(q):
    return q * [1, -1, -1, -1]


def exponential(vector):
    length = NORM(vector)
    return np.r_[np.cos(length), np.sinc(length/PI)*vector]


def half(source, target):
    return unit(qmul(source+target, qconj(source)))


def rotor_and_cochains():
    base, i, j, k = np.eye(4)
    rotor = qmul(half(j, base), qmul(half(i, j), half(base, i)))
    close(rotor, (base+k)/np.sqrt(2))
    close(qmul(qmul(rotor, i), qconj(rotor)), j)
    close(qmul(qmul(rotor, k), qconj(rotor)), k)
    u, v, w = RNG.normal(size=(3, 3))
    pauli = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]],
                      [[1, 0], [0, -1]]])
    projections = (np.eye(2) + pauli)/2
    close(np.angle(np.trace(projections[0] @ projections[1] @ projections[2])),
          PI/4)
    for t in [.004, .002]:
        y, z = exponential(t*u), exponential(t*v)
        rotor = qmul(half(z, base), qmul(half(y, z), half(base, y)))
        spin_log = NORM(rotor[1:])
        signed_log = np.arctan2(spin_log, rotor[0])*rotor[1:]/spin_log
        close(signed_log/t**2, np.cross(u, v)/4, atol=5e-5)
        rotated = qmul(qmul(rotor, np.r_[0., w]), qconj(rotor))[1:]
        close((rotated-w)/(t**2/2), np.cross(np.cross(u, v), w), atol=3e-4)
        gamma = np.stack([exponential(t*(a*u+b*v))
                          for a,b in [(0,0),(1,0),(1,1),(0,1)]])
        square = base
        for p, q in zip(gamma, np.roll(gamma, -1, axis=0)):
            square = qmul(half(p, q), square)
        close(square[1:]/t**2, np.cross(u, v)/2, atol=.003)
    for q in [0, .23, .5, 1]:
        n = 512
        z, w = np.exp(.8j), np.exp(1.2j)
        spinor = lambda z: np.array([np.sqrt(1-q), np.sqrt(q)*z])
        close(np.vdot(spinor(z), spinor(w)), 1-q+q*z.conjugate()*w)
        close((1-q+q*np.exp(2j*PI/n))**n, np.exp(2j*PI*q), atol=.012)
    close(((1+1j)/2)**4, -.25)
    gauge = np.array([.3, .7, -.3, -.7])
    meridian = gauge+.5
    equator = PI/2+np.roll(gauge,-1)-gauge
    close(meridian+equator-np.roll(meridian,-1), np.full(4,PI/2))
    close(equator.sum(),2*PI)
    close(4*NORM(np.cross(i[1:]-k[1:],j[1:]-k[1:]))/2,2*np.sqrt(3))
    n = 5
    f = RNG.integers(-2, 3, size=(n,n,n))
    defects = np.array([np.count_nonzero(f-f[r][None,:,:]
                         +f[r][:,None,:]-f[r][:,:,None]) for r in range(n)])
    e = RNG.integers(-2, 3, size=(n,n))
    given_errors = np.count_nonzero(f-(e[None,:,:]-e[:,None,:]+e[:,:,None]))
    assert n * min(defects) <= sum(defects) <= 4*n*given_errors
    exact_f = e[None,:,:]-e[:,None,:]+e[:,:,None]
    for r in range(n):
        assert not np.any(exact_f-exact_f[r][None,:,:]
                          +exact_f[r][:,None,:]-exact_f[r][:,:,None])
    oriented = e-e.T
    def boundary(i, j, k):
        return oriented[i,j]+oriented[j,k]+oriented[k,i]
    close(boundary(0,1,2)+boundary(0,2,3),
          sum(oriented[i,(i+1)%4] for i in range(4)))
    vectors = RNG.normal(size=(5,2))+1j*RNG.normal(size=(5,2))
    path = np.eye(2, dtype=complex)
    for vector in vectors:
        path = path @ np.outer(vector, vector.conj())
    close(np.trace(path),
          np.prod(np.sum(vectors.conj()*np.roll(vectors,-1,axis=0),axis=1)))
    k = np.arange(12)
    chars = np.exp(2j*PI*np.outer(k,k)/12)
    close(chars[::3].mean(axis=0), k%4 == 0)
    close(chars @ (chars.conj().T @ f.ravel()[:12])/12, f.ravel()[:12])
    for size in [1, 2, 23, 61]:
        phi = 0.7
        magnitude = abs(np.exp(1j*phi*np.arange(size)).mean())
        assert magnitude <= 2/(size*abs(1-np.exp(1j*phi))) + 2e-12
        close(np.exp(0j*np.arange(size)).mean(),1)


def rigidity():
    for n in range(1, 11):
        points = np.array([unit(x) for x in RNG.normal(size=(n,4))])
        q, _ = np.linalg.qr(RNG.normal(size=(4,4)))
        close(points @ points.T, (points @ q) @ (points @ q).T)
        if n <= 4:
            assert np.min(np.linalg.eigvalsh(points @ points.T)) > 0
            continue
        local = list(combinations(range(3),2))
        local.extend((a,b) for a in range(3) for b in range(3,n))
        assert len(local) == 3*n-6
        jacobian = np.zeros((len(local),4*n))
        for row,(a,b) in zip(jacobian,local):
            row[4*a:4*a+4] = points[b]-(points[a]@points[b])*points[a]
            row[4*b:4*b+4] = points[a]-(points[a]@points[b])*points[b]
        assert np.linalg.matrix_rank(jacobian) == 3*n-6
        assert n*(n-1)//2-len(local) == (n-3)*(n-4)//2
        normal = np.linalg.svd(points[:3])[2][-1]
        reflected = points.copy()
        reflected[3] -= 2*(points[3]@normal)*normal
        close([points[a]@points[b] for a,b in local],
              [reflected[a]@reflected[b] for a,b in local])
        assert abs(points[3]@points[4]-reflected[3]@points[4]) > 1e-8
        global_edges = [(0,1)]+[(a,b) for a in range(2) for b in range(2,n)]
        global_edges += [(b,2+(b-1)%(n-2)) for b in range(2,n)]
        assert len(global_edges) == 3*n-5
        circle = np.exp(1j * RNG.uniform(0,2*PI,n-2))
        steps = np.roll(circle,-1)/circle
        solutions = [signs for signs in product([-1,1],repeat=n-2)
                     if abs(np.prod(steps**signs)-1) < 1e-9]
        assert len(solutions) == 2
    e1,e2,e3,e4 = np.eye(4)
    mag = e1/2+e2/2
    for t in [0, .3, PI/2, PI]:
        x2 = mag+e3/np.sqrt(2)
        x4 = mag+(np.cos(t)*e3+np.sin(t)*e4)/np.sqrt(2)
        close([e1@x2, x2@e2, e2@x4, x4@e1], .5)
        close(x2@x4, (1+np.cos(t))/2)
    normals = np.array([s for s in product([-1,1],repeat=3)
                        if np.prod(s) == 1])/np.sqrt(3)
    close((normals@normals.T)[np.triu_indices(4,1)], -1/3)
    assert 2*PI-3*np.arccos(1/3) > 0


def elimination_and_amplitudes():
    a = np.array([[1, .5],[.5,1]])
    b = np.array([[1/3,1/6],[2/3,1/3]])
    g = np.block([[a,b],[b.T,a]])
    s = a-b.T @ np.linalg.solve(a,b)
    close(s, [[5/9,5/18],[5/18,8/9]])
    close([np.linalg.det(a),np.linalg.det(s),np.linalg.det(g)],[3/4,5/12,5/16])
    rhs = np.array([1/4,1/2,3/4,2/3])
    close(1-rhs @ np.linalg.solve(g,rhs), 35/108)
    residual_rhs = rhs[2:]-b.T @ np.linalg.solve(a,rhs[:2])
    close(residual_rhs, [5/12,1/2])
    close(residual_rhs @ np.linalg.solve(s,residual_rhs),23/54)
    repeated = g[np.ix_([0,1,2,3,3],[0,1,2,3,3])]
    close(repeated @ [0,0,0,1,-1],0)
    assert np.linalg.matrix_rank(repeated) == 4
    a = np.array([[1,1],[1,1]])
    b = np.ones((2,1))
    close(a @ np.linalg.pinv(a) @ b,b)
    close(b.T @ np.linalg.pinv(a) @ b,1)
    graph = np.array([[0,1,np.inf,9],[np.inf,0,1,6],
                      [np.inf,np.inf,0,1],[np.inf,np.inf,np.inf,0]])
    for v in [1,2]:
        graph = np.minimum(graph,graph[:,[v]]+graph[[v],:])
    close(graph[0,3],3)
    for energy in [.01,.2,.5,.8,.99999999]:
        k, chi = np.sqrt(energy), np.sqrt(1-energy)
        width = 1.3
        c,s = np.cosh(chi*width), np.sinh(chi*width)
        amplitude = 2/(c-1j*k*s/chi+(1j*k*c-chi*s)/(1j*k))
        predicted = 1/(1+s*s/(4*energy*(1-energy)))
        close(abs(amplitude)**2,predicted)
    close(predicted, 1/(1+width**2/4), atol=1e-8)
    x, energy = 21., .2
    transmission = 1/(1+np.sinh(x)**2/(4*energy*(1-energy)))
    close(transmission/np.exp(-2*x),16*energy*(1-energy))
    delay = 2.1
    z1,z2 = .6+.4j, -.2+.5j
    def intensity(e):
        return abs(z1+z2*np.exp(-1j*e*delay))**2
    close(intensity(.7),abs(z1)**2+abs(z2)**2+
          2*np.real(z1*z2.conjugate()*np.exp(.7j*delay)))
    close(intensity(.7),intensity(.7+2*PI/delay))
    close(abs(1+np.exp(-1j*PI))**2,0)
    a, phase, g = .37, .91, .2+.5j
    record1 = np.array([1.,0.])
    record2 = np.array([g.conjugate(),np.sqrt(1-abs(g)**2)])
    state = np.stack([np.sqrt(a)*record1,
                      np.exp(1j*phase)*np.sqrt(1-a)*record2])
    reduced = state @ state.conj().T
    close(reduced[0,1],np.sqrt(a*(1-a))*np.exp(-1j*phase)*g)
    close(np.linalg.det(reduced),a*(1-a)*(1-abs(g)**2))
    close(np.diff(np.linalg.eigvalsh(reduced))**2,
          (2*a-1)**2+4*a*(1-a)*abs(g)**2)
    initial = np.array([1,1])/np.sqrt(2)
    final = np.array([4,-3])/5
    observable = np.diag([1,2])
    close(initial@observable@initial,3/2)
    close(abs(final@initial)**2,1/50)
    close((final@observable@initial)/(final@initial),-2)
    for t in [0, .01, .7, -13, 2*PI]:
        rotor = exponential(np.array([t,0,0]))
        depth = 1-np.cos(t)
        close(rotor-np.eye(4)[0],[-depth,np.sin(t),0,0])
        close(NORM(rotor-np.eye(4)[0])**2,2*depth)
        assert -1e-10 <= t*t/2-depth <= t**4/24+1e-10
    h, point = .002, .37
    f = np.exp
    close(f(point+1j*h).imag/h, f(point)*(1-h*h/6), atol=1e-12)
    close(2*(f(point)-f(point+1j*h).real)/h**2, f(point), atol=6e-7)
    close(f(point)*np.sin(h)**2/h**2, f(point), atol=2e-6)
    close(np.imag(abs(point+1j*h))/h,0)
    a,t = .8, .0001
    near_flat = np.array([[1,0,0],[np.cos(a),np.sin(a),0],
                          [np.cos(2*a),np.sin(2*a)*np.cos(t),np.sin(2*a)*np.sin(t)]])
    assert 0 < area(near_flat) < .001
    assert min(angle(x,y) for x,y in combinations(near_flat,2)) > .7
    for n in [10,100,1000]:
        close(n*2*np.sin(1/(2*n))**2,1/(2*n),atol=1/(24*n**3))
        close(n*2*np.sin(1/(2*np.sqrt(n)))**2, .5-1/(24*n),
              atol=1/(720*n**2))
    n = 1000
    for alpha in [.25,.5,.9]:
        close(n*2*np.sin(n**(-alpha)/2)**2/n**(1-2*alpha),.5,atol=.002)
    close(n*2*np.sin(1.1/(2*np.sqrt(n)))**2, 1.1**2/2,atol=.00007)
    q = np.array([1.,0,0,0])
    axis = np.array([.6,0.,1.])
    for _ in range(100):
        q = qmul(exponential(axis/100),q)
    close(q,exponential(axis))
    j = np.arange(-20,21)
    phi = PI*j*j/16
    close(j @ np.exp(1j*phi),0)
    close(-8*np.array([-PI/4,-PI/2,-PI])/PI,[2,4,8])
    state = np.exp(1j*phi)/np.sqrt(41)
    density = np.outer(state,state.conj())
    diagonal = np.diag(np.diag(density))
    assert np.count_nonzero(density-diagonal) == 1640
    close(np.sum(abs(density-diagonal)**2),40/41)
    close(-np.sum(diagonal.diagonal().real*np.log(diagonal.diagonal().real)),np.log(41))
    t = .37
    # Multiply ordered Clifford blades by one new generator at a time.
    grades = {0: 1.}
    for generator in [1,2,4]:
        grades = {**{b: value*np.cos(t) for b,value in grades.items()},
                  **{b|generator: value*np.sin(t) for b,value in grades.items()}}
    assert [sum(b.bit_count()==k for b in grades) for k in range(4)] == [1,3,3,1]
    for b,value in grades.items():
        k = b.bit_count()
        close(value,np.cos(t)**(3-k)*np.sin(t)**k)


def primes_through(limit):
    prime = np.ones(limit + 1,dtype=bool)
    prime[:2] = False
    for k in range(2,int(np.sqrt(limit))+1):
        if prime[k]:
            prime[k*k::k] = False
    return np.flatnonzero(prime)


def arithmetic():
    s = 1.4+.63j
    p = np.array([2,3,5])
    amplitudes = p**(-s)
    factors = 1-amplitudes
    assert np.all(abs(factors)>0)
    close(np.prod(1/factors), sum(np.prod(amplitudes**m)
                                 for m in product(range(28),repeat=3)))
    close(np.prod(factors),sum((-1)**sum(m)*np.prod(amplitudes**m)
                               for m in product([0,1],repeat=3)))
    close(1/(1-2**(-s))-(1+2**(-s)),2**(-2*s)/(1-2**(-s)))
    for sigma in [.3,.5,.7]:
        a,b = 7**(-sigma),7**(-(1-sigma))
        close(a*b,1/7)
        close(abs(a*np.exp(.7j)-b)**2,(a-b)**2+2/7*(1-np.cos(.7)))
        assert bool(abs(a-b)<1e-12) == (sigma == .5)
    p = primes_through(200000)
    for sigma in [.2,.4,.5,.7]:
        u = p.astype(float)**(-sigma)
        depth = 2*np.sin(u/2)**2
        assert np.all(depth <= .5*u**2+1e-14)
        close(depth[-100:]/u[-100:]**2,.5,atol=.0004)
        if sigma <= .5:
            close((depth[-100:]-.5*u[-100:]**2)/u[-100:]**4,-1/24,atol=.0001)
    m = .2614972128
    u = p.astype(float)**(-.5)
    remainder = (2*np.sin(u/2)**2-.5*u**2).sum()
    close((2*np.sin(u/2)**2).sum()-.5*np.log(np.log(p[-1])),m/2+remainder,atol=.001)
    for delta in [0,.01,.05,.10]:
        gamma = 14.0
        rho = .5+delta+1j*gamma
        w = rho/(rho-1)
        close(abs(w)**2,1+2*delta/((.5-delta)**2+gamma**2))
        close(abs((1-rho)/(0-rho)),1/abs(w))
        if delta > 0:
            logw = np.log(abs(w))
            level = max(0,int(np.ceil(np.log2(np.log(10)/logw))))
            assert np.exp(2**level*logw) >= 10
            assert np.exp(2**(level-1)*logw) < 10
    f = np.poly1d(np.poly([a*.2+1j*b*.7 for a,b in product([-1,1],repeat=2)]))
    fp = f.deriv()
    z = .26+.91j
    close(f(z),f(-z))
    close(f(z.conjugate()),f(z).conjugate())
    close(f(.4j).imag,0)
    eta = .03
    close(abs(f(z)+eta*fp(z)/2)**2-abs(f(z)-eta*fp(z)/2)**2,
          2*eta*np.real(fp(z)*f(z).conjugate()))
    rect = [0,1,1+1j,1j,0]
    vertices = np.concatenate([np.linspace(a,b,40,endpoint=False)
                               for a,b in zip(rect,rect[1:])]+[np.array([0])])
    increments = np.angle(f(vertices[1:])/f(vertices[:-1]))
    close(increments.sum(),2*PI)
    f_samples = RNG.normal(size=8)+1j*RNG.normal(size=8)
    columns = np.stack([np.roll(f_samples,-h) for h in (0,1,3)],axis=1)
    gram = columns.conj().T @ columns
    assert min(np.linalg.eigvalsh(gram)) > 0
    for i,j in product(range(3),repeat=2):
        h = (0,1,3)[j]-(0,1,3)[i]
        close(gram[i,j],np.vdot(f_samples,np.roll(f_samples,-h)))

    shell = np.array([.8*np.exp(.41j),1.25*np.exp(.41j),np.exp(-.9j)])
    nodes = np.arange(len(shell))
    moments = (shell[:,None,None]**(nodes[:,None]-nodes[None,:])).sum(axis=0)
    close(moments,moments.conj().T)
    interpolant = np.linalg.solve(np.vander(shell.conj(),increasing=True), [1,-1,0])
    close(np.vdot(interpolant,moments@interpolant),-2)
    assert np.linalg.eigvalsh(moments)[0] < 0
    circular = np.exp(1j*np.array([.41,.8,-.9]))
    powers = circular[:,None]**nodes
    weights = abs(1-circular)**2
    gram = powers.T @ (weights[:,None]*powers.conj())
    assert np.linalg.eigvalsh(gram)[0] > 0
    for j in range(1,8):
        close((1-circular**(j+1)).real-2*(1-circular**j).real+
              (1-circular**(j-1)).real, weights*(circular**j).real)
    p = np.array([2.,3.,5.,7.,11.])
    for sigma,t in [(.1,0),(.3,3),(1,18)]:
        def zp(s):
            return np.prod(1/(1-p**(-s)))
        assert abs(zp(sigma)**3*zp(sigma+1j*t)**4*zp(sigma+2j*t)) >= 1
        phi = np.log(p)*t
        close(3+4*np.cos(phi)+np.cos(2*phi),2*(1+np.cos(phi))**2)
    p = primes_through(32)
    mangoldt = np.zeros(33)
    for prime in p:
        exponent = int(prime)
        while exponent <= 32:
            mangoldt[exponent] = np.log(prime)
            exponent *= int(prime)
    for n in range(1,33):
        close(mangoldt[:n+1].sum(),np.log(float(lcm(*range(1,n+1)))))
    close(mangoldt[[4,6,8,10]], [np.log(2),0,np.log(2),0])
    gamma, x = 2.3, 4.8
    phase = gamma*np.log(x)
    close(2*(x**(.5+1j*gamma)/(.5+1j*gamma)).real,
          2*np.sqrt(x)*(.5*np.cos(phase)+gamma*np.sin(phase))/(.25+gamma**2))


def icosa_mesh(nu):
    phi = (1+np.sqrt(5))/2
    vertices = np.array([unit(np.roll([0,a,b*phi],shift))
                         for shift in range(3) for a,b in product([-1,1],repeat=2)])
    distances = NORM(vertices[:,None,:]-vertices[None,:,:],axis=-1)
    shortest = np.min(distances[distances>0])
    faces = [face for face in combinations(range(12),3)
             if all(abs(distances[i,j]-shortest)<1e-12
                    for i,j in combinations(face,2))]
    assert len(faces) == 20
    lattice_vertices = []
    indices = {}
    triangles = []
    for i,j,k in faces:
        lattice = {}
        for a in range(nu+1):
            for b in range(nu-a+1):
                coeffs = tuple((vertex,coeff)
                               for vertex,coeff in zip([i,j,k],[a,b,nu-a-b])
                               if coeff)
                if coeffs not in indices:
                    indices[coeffs] = len(lattice_vertices)
                    lattice_vertices.append(unit(a*vertices[i]+b*vertices[j]+
                                                 (nu-a-b)*vertices[k]))
                lattice[a,b] = indices[coeffs]
        for a in range(nu):
            for b in range(nu-a):
                triangles.append([lattice[a,b],lattice[a+1,b],lattice[a,b+1]])
                if a+b <= nu-2:
                    triangles.append([lattice[a+1,b],lattice[a+1,b+1],lattice[a,b+1]])
    return np.array(lattice_vertices), np.array(triangles)


def polyhedra():
    evidence = [1.0472,1.2374,1.3436,1.4681,1.5038]
    for nu, scaled in zip([1,2,4,8,16],evidence):
        vertices, faces = icosa_mesh(nu)
        assert len(vertices) == 10*nu**2+2 and len(faces) == 20*nu**2
        edges = {tuple(sorted((a,b))) for face in faces
                 for a,b in combinations(face,2)}
        assert len(edges) == 30*nu**2
        defects = np.full(len(vertices),2*PI)
        coordinates = vertices[faces]
        for j in range(3):
            first = coordinates[:,(j+1)%3]-coordinates[:,j]
            second = coordinates[:,(j+2)%3]-coordinates[:,j]
            angles = np.arctan2(NORM(np.cross(first,second),axis=1),
                                np.einsum('ij,ij->i',first,second))
            np.add.at(defects,faces[:,j],-angles)
        close(defects.sum(),4*PI)
        d = np.degrees(defects.max())
        if nu == 1:
            close(defects,PI/3)
        if nu == 2:
            close(d,17.724,atol=.0005)
        if nu == 4:
            close(d,4.812,atol=.0005)
        close(nu**2 * defects.max(),scaled,atol=.00005)
        print(f"  Icosahedral nu={nu:2}: max defect {d:.6f} deg, "
              f"rescaled {nu**2 * defects.max():.6f} rad")
    vertices, faces = icosa_mesh(1)
    x,y,z = vertices[faces].transpose(1,0,2)
    normals = np.cross(y-x,z-x)
    normals /= NORM(normals,axis=1)[:,None]
    inradius = np.min(abs(np.einsum('ij,ij->i',normals,x)))
    total_volume = np.sum(abs(np.einsum('ij,ij->i',x,np.cross(y,z))))/6
    assert 0 < 4*PI/3-total_volume <= 4*PI/3*(1-inradius**3)
    for n in [1,2,3,4]:
        assert round(np.linalg.det(-np.eye(2*n+1))) == -1
        skew = np.kron(np.eye(n),[[0,-1],[1,0]])
        x = unit(RNG.normal(size=2*n))
        close(x @ (skew @ x),0)
        close(NORM(skew @ x),1)
    q = exponential(np.array([.2,.3,.4]))
    x,j = qconj(q),np.eye(4)[2]
    normal = qmul(qmul(q,j),x)
    close(normal @ qmul(qmul(q,np.eye(4)[1]),x),0)
    for t in [-2.4,-.2,0,.7,2.8]:
        for n in range(1,8):
            partial = sum((-1)**k*t**(2*k)/factorial(2*k) for k in range(n))
            assert abs(partial-np.cos(t)) <= abs(t)**(2*n)/factorial(2*n)+3e-16


def main():
    checks = (geometry, rotor_and_cochains, rigidity, elimination_and_amplitudes,
              arithmetic, polyhedra)
    for check in checks:
        check()
        print(f"PASS {check.__name__}")
    print(f"PASS all {len(checks)} groups")


if __name__ == "__main__":
    main()
