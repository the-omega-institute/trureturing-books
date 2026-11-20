#!/usr/bin/env python3
"""Finite checks for Section 5B (indefinite comparisons and the hyperbolic arc calculus)."""

import re
from fractions import Fraction

import numpy as np
from numpy.polynomial import Chebyshev
from numpy.testing import assert_allclose


I = np.eye(2, dtype=complex)
PAULI = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])
LORENTZ = np.diag([1, -1, -1, -1])
RNG = np.random.default_rng(173)


def close(actual, expected, atol=2e-10, rtol=2e-10):
    assert_allclose(actual, expected, atol=atol, rtol=rtol)


def tr(matrix):
    return np.trace(matrix) / 2


def sharp(matrix):
    return 2 * tr(matrix) * I - matrix


def adj(matrix):
    return matrix.conj().T


def herm(vector):
    return vector[0] * I + np.einsum("i,ijk->jk", vector[1:], PAULI)


def coords(matrix):
    return np.array([tr(matrix), *(tr(matrix @ sigma) for sigma in PAULI)]).real


def bilinear(x, y):
    return x @ LORENTZ @ y


def matrix_comparison(x, y):
    return tr(sharp(x) @ y).real


def point(spatial):
    return np.r_[np.sqrt(1 + spatial @ spatial), spatial]


def expm(matrix):
    """Small fixed-size exponentials for finite controls via the Taylor series."""
    result = np.eye(len(matrix), dtype=complex)
    term = result.copy()
    for order in range(1, 45):
        term = term @ matrix / order
        result += term
    return result


def special_linear_coordinates():
    j = (-1j * PAULI[1]).real
    d = PAULI[2].real
    e = PAULI[0].real
    close(j @ d - d @ j, 2 * e)
    close(d @ e - e @ d, -2 * j)
    close(e @ j - j @ e, 2 * d)
    close(np.array([[tr(x @ y) for y in (j, d, e)] for x in (j, d, e)]),
          np.diag([-1, 1, 1]))
    for tangent in (0.3 * j + 0.1 * d, 0.2 * e + d, j + d):
        square = tr(tangent @ tangent).real
        for t in (0.0, 0.25, 0.9):
            matrix = expm(t * tangent)
            halftrace = tr(matrix)
            expected = np.cosh(t * np.sqrt(complex(square)))
            close(halftrace, expected)
            close(sharp(matrix), np.linalg.inv(matrix))
            close(tr(matrix @ matrix), 2 * halftrace**2 - 1)
            for m in (1, 2, 3, 5):
                polynomial = Chebyshev.basis(m)
                close(polynomial(halftrace), np.cosh(m * t * np.sqrt(complex(square))))
                close(polynomial(-halftrace), (-1)**m * polynomial(halftrace))
        dt = 1e-4
        close((Chebyshev.basis(3)(tr(expm(dt * tangent))) - 1) / dt**2,
              9 * square / 2, atol=2e-6, rtol=2e-6)

    for m in (1,2,3,5):
        g = expm(np.pi*j/(2*m))
        u = expm(0.2*d)
        chebyshev = Chebyshev.basis(m)
        read = lambda matrix: chebyshev(tr(matrix)).real
        close(read(g),0)
        close(tr(g @ u),tr(g @ np.linalg.inv(u)))
        defect = read(g @ u)+read(g @ np.linalg.inv(u))-2*read(g)*read(u)
        if m == 1:
            close(defect,0)
        else:
            assert abs(defect) > 1e-3

    tangent = np.array([[0, 1], [0, 0]])
    x = expm(0.31 * j) @ expm(0.72 * e)
    y = x @ (I + 0.8 * tangent)
    close(np.linalg.det(y - x), 0)
    close(tr(sharp(x) @ y), 1)
    assert np.linalg.norm(x - y) > 0.1
    for t in (-2, 0, 1, 3):
        close(tr(-I + t * tangent), -1)
        close(np.linalg.det(-I + t * tangent), 1)

    # Gauss sign and ambient determinant signature for the split quadric.
    basis = (I, j, d, e)
    gram = np.array([[tr(sharp(x) @ y).real for y in basis] for x in basis])
    close(gram, np.diag([1, 1, -1, -1]))
    for x, y, z in ((j, d, d), (d, e, e), (e, j, d)):
        bracket = x @ y - y @ x
        close(-0.25 * (bracket @ z - z @ bracket),
              -tr(y @ z) * x + tr(x @ z) * y)


def abelian_and_nilpotent():
    def scalar_reading(q):
        return np.cosh(np.sqrt(complex(-q))).real

    close(scalar_reading(0.25), np.cos(0.5))
    close(scalar_reading(-0.25), np.cosh(0.5))
    close(np.diag([np.exp(0.8), np.exp(-0.8)]) @
          np.diag([np.exp(-0.3), np.exp(0.3)]),
          np.diag([np.exp(0.5), np.exp(-0.5)]))
    close(np.cos(2 * np.pi + 0.37), np.cos(0.37))
    assert not np.isclose(np.cos(np.hypot(2 * np.pi, 0.4)), np.cos(0.4))
    close(np.linalg.matrix_rank(np.block([[np.zeros((3, 3)), np.eye(3)],
                                         [np.eye(3), np.zeros((3, 3))]])), 6)

    def multiply(g, h):
        x, a = g
        y, b = h
        return np.array([x + y, a + b + 0.5 * np.cross(x, y)])

    def read(g):
        return scalar_reading(2 * (g[0] @ g[1]))

    for _ in range(12):
        g, h, k = RNG.normal(size=(3, 2, 3))
        close(multiply(multiply(g, h), k), multiply(g, multiply(h, k)))
        close(multiply(g, -g), 0)
        close(multiply(g, g), 2 * g)
        close(read(multiply(multiply(h, g), -h)), read(g))
        close(read(multiply(g, g)), 2 * read(g)**2 - 1)
        assert not np.allclose(multiply(g, h), multiply(h, g))


def trichotomy_and_spin():
    j = -1j * PAULI[1]
    powers = [
        expm(0.29 * j), expm(-0.66 * j), expm(np.pi * j / 2),
        I, -I, np.array([[1, 1], [0, 1]]), np.array([[-1, 1], [0, -1]]),
        np.diag([1.4, 1 / 1.4]), -np.diag([1.4, 1 / 1.4]),
        np.diag([np.exp(0.4 + 0.3j), np.exp(-0.4 - 0.3j)]),
    ]
    for matrix in powers:
        s = tr(matrix)
        skew = matrix - s * I
        close(sharp(skew), -skew)
        close(skew @ skew, (s*s - 1) * I)
        close(sharp(matrix - I) @ (matrix - I), 2 * (1 - s) * I)
        close((matrix - I) @ sharp(matrix - I), 2 * (1 - s) * I)
        close(matrix @ sharp(matrix), I)
        u_prev, u = 0, 1
        for n in range(9):
            polynomial = Chebyshev.basis(n)(s)
            close(np.linalg.matrix_power(matrix, n), polynomial * I + u_prev * skew)
            close(np.linalg.matrix_power(matrix, -n), polynomial * I - u_prev * skew)
            u_prev, u = u, 2 * s * u - u_prev
        old = (1+s) / 2
        close((1+tr(matrix @ matrix)) / 2, (2 * old - 1)**2)
    for alpha in (0.17, 0.6, np.pi / 2, np.pi / 6, 2.4):
        n0 = int(np.floor(np.pi / (2 * alpha))) + 1
        assert np.cos(n0 * alpha) < 0
        assert np.all(np.cos(np.arange(n0) * alpha) >= -1e-14)
    for a, b in RNG.normal(size=(12, 2, 3)):
        av, bv = herm(np.r_[0, a]), herm(np.r_[0, b])
        close(av @ bv, a @ b * I + 1j * herm(np.r_[0, np.cross(a, b)]))

    for _ in range(10):
        coefficients = RNG.normal(size=3) + 1j * RNG.normal(size=3)
        generator = np.einsum("i,ijk->jk", coefficients, PAULI) / 3
        spin = expm(generator)
        lorentz = np.stack([coords(spin @ herm(v) @ adj(spin))
                            for v in np.eye(4)], axis=1)
        close(lorentz.T @ LORENTZ @ lorentz, LORENTZ)
        close(np.linalg.det(lorentz), 1)
        assert lorentz[0, 0] >= 1
        close(coords((-spin) @ I @ adj(-spin)), coords(spin @ adj(spin)))
        for component in (generator, np.real(generator).astype(complex)):
            close(tr(expm(component)),
                  np.cosh(np.sqrt(tr(component @ component))))
    for theta in (0.23, 2*np.pi, 4*np.pi):
        spin = expm(-0.5j*theta*PAULI[2])
        close(coords(spin@PAULI[0]@adj(spin)),[0,np.cos(theta),np.sin(theta),0])
    close(expm(-1j*np.pi*PAULI[2]),-I)
    close(expm(-2j*np.pi*PAULI[2]),I)
    close(sharp(PAULI[2]) @ PAULI[2], -I)
    quaternion = I + 1j * sum(PAULI)
    close(sharp(quaternion) @ quaternion, 4 * I)
    close(PAULI[0] @ PAULI[2] + PAULI[2] @ PAULI[0], 0)


def inertial_frames_and_clocks():
    for k in (-1, 0, 1.7):
        v, w = 0.15, -0.32

        def frame(speed):
            return np.array([[1, k * speed], [speed, 1]]) / np.sqrt(1-k*speed**2)

        first = frame(v)
        close(np.linalg.det(first), 1)
        close(first @ frame(-v), I)
        close(first @ frame(w), frame((v+w)/(1+k*v*w)))
        skew = first - first[0, 0]*I
        close(skew @ skew, first[0, 0]**2 * k * v**2 * I)
        if k > 0:
            for sign in (-1, 1):
                line = np.array([1, sign/np.sqrt(k)])
                close((first @ line)[1], sign/np.sqrt(k) * (first @ line)[0])
        if k == 0:
            close(first @ np.array([0., 1.]), [0, 1])
    a, b = np.cosh(np.log(2)), np.sinh(np.log(2))
    close([a, b, b/a], [5/4, 3/4, 3/5])
    close(a*a-b*b, 1)
    boost = np.array([[a, -b], [-b, a]])
    q = np.diag([1, -1])
    close(boost.T @ q @ boost, q)
    close(boost @ [5, 3], [4, 0])
    close(np.array([5, 3]) @ q @ [5, 3], 16)
    close(np.array([5, 3]) @ [5, 3], 34)
    close(2*np.sqrt(16), 8)
    close(np.sqrt(np.array([10, 0]) @ q @ [10, 0]), 10)
    close(np.array([[0, 1], [-1, 0]]).T @ q @ [[0, 1], [-1, 0]], -q)
    for d in range(1, 8):
        w = RNG.normal(size=d)
        w /= np.linalg.norm(w)
        for sign in (-1, 1):
            sample = np.r_[1., sign*w]
            gram = np.diag(np.r_[1., -np.ones(d)])
            close(sample @ gram @ sample, 0)
            close(np.linalg.det(1.7*np.eye(d+1))**2,
                  (sample[0] * 1.7**2)**(d+1))
    n = np.arange(1, 21)
    assert np.all(np.tanh(n * np.log(2)) < 1)
    assert np.all(np.tanh(n * np.log(2) / 2) < 1)
    theta = 0.7
    for _ in range(150):
        theta = np.cos(theta)
    eta = np.arctanh(np.sin(theta))
    close(theta,0.73908513,atol=5e-9,rtol=0)
    close(eta,0.81732635,atol=5e-9,rtol=0)
    close(eta,np.log(np.tan(np.pi/4+theta/2)))
    close(np.tanh(eta/2),np.tan(theta/2))
    close(np.cos(theta),1/np.cosh(eta))
    eta += 8
    close(1-np.tanh(eta),2/(np.exp(2*eta)+1))
    close(2/(np.exp(2*eta)+1),4.3893e-8,atol=5e-13,rtol=0)
    close(2*np.arctan(np.exp(-eta)),2.9629e-4,atol=5e-9,rtol=0)
    p = np.linspace(-7, 7, 50)
    assert np.all(np.diff(p + 0.5*np.sin(p)) > 0)
    assert np.all(np.diff(p**3 + p) > 0)
    assert not np.isclose(np.sin(2), 2*np.sin(1))


def edge(x, y):
    relative = y @ sharp(x)
    return (I + relative) / np.sqrt(2 + 2 * tr(relative).real)


def tangent_projection(x, v):
    return v - bilinear(x, v) * x


def geodesic(x, y, t):
    c = bilinear(x, y)
    if abs(c - 1) < 1e-14:
        return x.copy()
    d = np.arccosh(c)
    tangent = (y-c*x)/np.sinh(d)
    return np.cosh(t*d)*x + np.sinh(t*d)*tangent


def hyperbolic_arcs():
    for _ in range(18):
        x, y, z = [point(RNG.normal(size=3) / 2) for _ in range(3)]
        c = bilinear(x, y)
        d = np.arccosh(c)
        X, Y = herm(x), herm(y)
        close(matrix_comparison(X, Y), c)
        close(np.linalg.det(Y), 1)
        close((1+c)/2, np.cosh(d/2)**2)
        mapped = 2*c*x-y
        close(coords(X @ sharp(Y) @ X), mapped)
        close((1+bilinear(y, mapped))/2, c*c)
        half = edge(X, Y)
        close(half @ half, Y @ sharp(X))
        close(half @ X @ adj(half), Y)
        close(half @ edge(Y, X), I)
        midpoint = (x+y)/np.sqrt(2*(1+c))
        close(geodesic(x, y, 0.5), midpoint)
        tangent = tangent_projection(x, RNG.normal(size=4))
        transported = coords(half @ herm(tangent) @ adj(half))
        close(transported, tangent-bilinear(y,tangent)*(x+y)/(1+c))
        close(bilinear(transported, y), 0)
        close(bilinear(transported, transported), bilinear(tangent, tangent))
        close(y-x, y-c*x+(c-1)*x)
        close(-bilinear(y-x,y-x)/2, c-1)
        close(-bilinear(y-c*x,y-c*x), np.sinh(d)**2)
        close((y+mapped)/2, (1+(c-1))*x)
        close((x+y)/2, np.cosh(d/2)*midpoint)
        for n in range(1, 6):
            previous, current, following = [geodesic(x, y, k) for k in (n-1,n,n+1)]
            close(following, 2*c*current-previous, atol=5e-7)
            close(following-2*current+previous, 2*(c-1)*current, atol=5e-7)
            close(bilinear(x, current), Chebyshev.basis(n)(c), atol=1e-7)
            close(bilinear(z, following), 2*c*bilinear(z,current)-bilinear(z,previous),
                  atol=5e-7)
            close(herm(current), np.linalg.matrix_power(Y @ sharp(X), n) @ X,
                  atol=1e-7)
            close(np.outer(current, following)-np.outer(following,current),
                  np.outer(previous,current)-np.outer(current,previous), atol=1e-6)
        chain = [x, z, y]
        best = [geodesic(x,y,s) for s in (0, 0.5, 1)]
        cost = lambda path: sum(bilinear(u,v)-1 for u,v in zip(path,path[1:]))
        assert cost(chain) > cost(best) - 1e-12
        close(cost(best), 2*(np.cosh(d/2)-1))
        close(tangent_projection(best[1],best[0]+best[2]), 0)
        close(sum((v-bilinear(u,v)*u for u,v in zip(chain,chain[1:])), start=np.zeros(4)),
              y-x-sum(((bilinear(u,v)-1)*u for u,v in zip(chain,chain[1:])),
                      start=np.zeros(4)))

    anchor = point(np.zeros(3))
    close(edge(herm(anchor), herm(anchor)), I)
    close(geodesic(anchor, anchor, 0.3), anchor)
    assert not np.allclose(herm(point(np.array([1., 0, 0]))) @
                           herm(point(np.array([0., 0, 1]))),
                           herm(point(np.array([0., 0, 1]))) @
                           herm(point(np.array([1., 0, 0]))))
    r = np.array([0.3, -0.4, 0.1])
    bloch = (I + herm(np.r_[0, r]))/2
    close(coords(bloch / np.sqrt(np.linalg.det(bloch))), np.r_[1, r]/np.sqrt(1-r@r))


def sagitta_and_consistency():
    sizes = np.array([0.001, 0.1, 0.6, 1.3])
    w = 2*np.sinh(sizes/2)**2
    qv = np.sum(sizes**2)
    assert qv/2 <= sum(w) <= np.cosh(max(sizes))*qv/2
    assert sum(w) <= np.cosh(max(sizes))*max(sizes)*sum(sizes)/2
    n = 2**15
    for alpha in (0.25, 0.5, 0.75, 1.0):
        a = 0.6
        total = n * 2*np.sinh(a*n**(-alpha)/2)**2
        close(total/(a*a*n**(1-2*alpha)/2), 1, atol=3e-4, rtol=0)
    time = 0.2
    rate = 0.7+0.4*time
    accel = 0.4
    sample = lambda t: np.array([np.cosh(0.7*t+0.2*t*t), np.sinh(0.7*t+0.2*t*t), 0, 0])
    x = sample(time)
    tangent = x[[1,0,2,3]]
    ratios = []
    for h in (0.04, 0.02, 0.01):
        plus, minus = sample(time+h), sample(time-h)
        c_plus, c_minus = bilinear(x,plus), bilinear(x,minus)
        residual = plus + minus - 2*c_minus*x
        symmetrical = plus + minus - (c_plus+c_minus)*x
        close(bilinear(x,symmetrical), 0)
        ratios.append(np.linalg.norm(residual-h*h*accel*tangent-h**3*rate*accel*x))
    assert np.all(np.array(ratios[:-1])/ratios[1:] > 14)


def brownian_moments():
    # Hyperbolic H^3 radial heat law, integrated independently in polar radius.
    n = 50000
    radius = np.linspace(0, 14, n)
    for h in (0.04, 0.12, 0.35):
        density = np.sqrt(2/np.pi) * np.exp(-h/2) * radius * np.sinh(radius)
        density *= np.exp(-radius**2/(2*h))/h**1.5
        close(np.trapezoid(density, radius), 1)
        close(np.trapezoid(density*np.cosh(radius),radius), np.exp(1.5*h))
        close(np.trapezoid(density*np.cosh(radius)**2,radius),
              (1+3*np.exp(4*h))/4)
    for moment in range(1, 7):
        for b in (1.0, 1.1, 2.0):
            linear = moment*(moment+2)*b**moment/2
            lower = moment*(moment-1)*b**(moment-2)/2
            close(linear-lower,
                  (3*b*moment*b**(moment-1)+(b*b-1)*moment*(moment-1)*b**(moment-2))/2)
            j = b-1
            if j > 0:
                close((3*b*moment*j**(moment-1)+(b*b-1)*moment*(moment-1)*j**(moment-2))/2,
                      (moment*(moment+2)*j**moment+moment*(2*moment+1)*j**(moment-1))/2)
    x = point(np.array([0.7,0.4,-0.15]))
    tangent = np.stack([tangent_projection(x,v) for v in np.eye(4)[1:]],axis=1)
    metric = -LORENTZ
    eigvals, eigvecs = np.linalg.eigh(tangent.T@metric@tangent)
    frame = tangent@eigvecs@np.diag(eigvals**(-0.5))
    covariance = frame@frame.T
    close(np.trace(metric@covariance),3)
    close(np.trace(metric@covariance@metric@covariance),3)
    n = 10000
    t = 0.7
    h = t/n
    expectation = n*np.expm1(1.5*h)
    variance = n*n*(0.75*np.expm1(4*h)-np.expm1(3*h))
    close(n*(expectation-1.5*t), 9*t*t/8, atol=4e-5)
    close(variance, 1.5*t*t, atol=4e-4)


def polygon(vertices):
    product = I.copy()
    for x, y in zip(vertices, vertices[1:]):
        product = edge(herm(x), herm(y)) @ product
    return product


def angle_at(x, y, z):
    first, second = tangent_projection(x,y), tangent_projection(x,z)
    cosine = -bilinear(first,second)/np.sqrt(bilinear(first,first)*bilinear(second,second))
    return np.arccos(np.clip(cosine,-1,1))


def triangle_data(x,y,z):
    X,Y,Z = map(herm,(x,y,z))
    a,b,c = bilinear(x,y),bilinear(x,z),bilinear(y,z)
    n = (I+X@sharp(Z)) @ (I+Z@sharp(Y)) @ (I+Y@sharp(X))
    norm_squared = 8*(1+a)*(1+b)*(1+c)
    gram = 1+2*a*b*c-a*a-b*b-c*c
    return n,norm_squared,1+a+b+c,gram


def rational_rotation_and_area():
    for _ in range(20):
        x,y,z = [point(RNG.normal(size=3)/2) for _ in range(3)]
        n,d,scalar,gram = triangle_data(x,y,z)
        return_spin = polygon([x,y,z,x])
        close(n/np.sqrt(d),return_spin)
        close(tr(n),2*scalar)
        close(d,4*(scalar**2+gram))
        close(n@herm(x)@adj(n),d*herm(x))
        close(np.linalg.det(n),d)
        tangent = herm(tangent_projection(x,RNG.normal(size=4)))
        close(n@tangent@adj(n)/d,n@tangent@sharp(herm(x))@np.linalg.inv(n)@herm(x))
        close(bilinear(x,coords(n@tangent@adj(n)/d)),0)
        area = np.pi-sum((angle_at(x,y,z),angle_at(y,z,x),angle_at(z,x,y)))
        assert 0 < area < np.pi
        close(area, 2*np.arctan(np.sqrt(gram)/scalar))
        close(np.cos(area),(scalar**2-gram)/(scalar**2+gram))
        boost = expm(0.31*PAULI[0])@expm(0.2j*PAULI[2])
        mapped = [coords(boost@herm(v)@adj(boost)) for v in (x,y,z)]
        close(triangle_data(*mapped)[0],boost@n@np.linalg.inv(boost))
        close(polygon([x,z,y,x]),np.linalg.inv(return_spin))
        y2 = geodesic(x,y,1.5)
        close(polygon([x,y,y2,x]),I,atol=1e-8)
        close(polygon([x,x,y,x]),I)

    x,y,z = np.eye(4)[0],np.array([1.25,0.75,0,0]),np.array([1.25,0,0.75,0])
    n,d,scalar,gram = triangle_data(x,y,z)
    close([bilinear(x,y),bilinear(x,z),bilinear(y,z), scalar,np.sqrt(gram)],
          [1.25,1.25,25/16,81/16,9/16])
    assert Fraction(81-1,81+1) == Fraction(40,41)
    close(edge(herm(x),herm(y)),(3*I+PAULI[0])/(2*np.sqrt(2)))
    rotated = coords(n@PAULI[0]@adj(n)/d)
    close(rotated,[0,40/41,-9/41,0])
    # Independent region integration in Klein coordinates with area density
    # (1 - |r|^2)^(-3/2) on the Euclidean triangle.
    nodes, weights = np.polynomial.legendre.leggauss(44)
    u = (1+nodes)/2
    w = weights/2
    x_coord = 0.6*u[:,None]
    y_coord = 0.6*(1-u[:,None])*u[None,:]
    area_integral = np.sum(w[:,None]*w[None,:]*0.36*(1-u[:,None]) /
                           (1-x_coord*x_coord-y_coord*y_coord)**1.5)
    close(area_integral,2*np.arctan(1/9))


def finite_stokes_and_gauges():
    x,y,z,w = [point(RNG.normal(size=3)/2) for _ in range(4)]
    boundary = polygon([x,y,z,w,x])
    close(boundary,polygon([x,z,w,x]) @ polygon([x,y,z,x]))
    distance = lambda spin: 2*np.arccos(np.clip(tr(spin).real,-1,1))
    assert distance(boundary) <= (distance(polygon([x,z,w,x])) +
                                  distance(polygon([x,y,z,x])) + 1e-12)
    origin = np.eye(4)[0]
    y,z,w = [point(np.r_[xy,0]) for xy in ((0.7,0), (0.7,0.7), (0,0.7))]
    first = polygon([origin,y,z,origin])
    second = polygon([origin,z,w,origin])
    close(first@second,second@first)
    close(polygon([origin,y,z,w,origin]),second@first)
    area = distance(first)+distance(second)
    close(second@first,expm(0.5j*area*PAULI[2]))

    phases = np.array([1,1,1,1j])
    gauge = np.array([1,1j,-1,-1j])
    changed = np.roll(gauge,-1)*phases/gauge
    close(changed,[1j,1j,1j,-1])
    close(np.prod(changed),1j)
    source, target = expm(0.23j*PAULI[0]),expm(0.17j*PAULI[1])
    arbitrary_edge = expm(0.5j*PAULI[2])
    chord = np.linalg.inv(target)@arbitrary_edge@source
    close(chord, adj(target) @ (arbitrary_edge @ source))
    close(np.linalg.inv(target) @ (target @ np.linalg.inv(source)) @ source, I)
    close(target@chord@np.linalg.inv(source),arbitrary_edge)


def integrate(coefficient, stop=1, steps=256):
    """Solve a matrix transport equation independently with RK4."""
    state = I.copy()
    h = stop/steps
    for k in range(steps):
        t = k*h
        k1 = coefficient(t)@state
        k2 = coefficient(t+h/2)@(state+h*k1/2)
        k3 = coefficient(t+h/2)@(state+h*k2/2)
        k4 = coefficient(t+h)@(state+h*k3)
        state += h*(k1+2*k2+2*k3+k4)/6
    return state


def smooth_curve(t):
    u = np.array([0.4*np.sin(1.3*t),0.5*t*t,0.2*t])
    derivative = np.array([0.52*np.cos(1.3*t),t,0.2])
    x = point(u)
    return x, np.r_[u@derivative/x[0],derivative]


def product_integral():
    def coefficient(t):
        x, derivative = smooth_curve(t)
        return herm(derivative)@sharp(herm(x))

    exact = integrate(lambda t: coefficient(t)/2)
    close(exact @ I @ adj(exact), herm(smooth_curve(1)[0]))
    close(np.linalg.det(exact),1)
    initial = np.array([0.,0.4,-0.1,0.2])
    eps = 0.0005
    at = 0.7
    transformed = lambda t: (lambda spin: coords(spin@herm(initial)@adj(spin)))(
        integrate(lambda u: coefficient(u)/2, stop=t))
    v = transformed(at)
    derivative = (transformed(at+eps)-transformed(at-eps))/(2*eps)
    x, dx = smooth_curve(at)
    close(bilinear(v,x),0)
    close(derivative,-bilinear(v,dx)*x,atol=2e-7)
    errors = []
    for n in (8,16,32,64):
        samples = [smooth_curve(t)[0] for t in np.linspace(0,1,n+1)]
        errors.append(np.linalg.norm(polygon(samples)-exact))
        full = I.copy()
        for x,y in zip(samples,samples[1:]):
            full = herm(y)@sharp(herm(x))@full
        close(full,herm(samples[-1]))
    assert min(np.array(errors[:-1])/errors[1:]) > 3.8

    # A curve with a speed and direction break not visited by the test meshes.
    corner = 0.37
    break_point = smooth_curve(corner)[0]
    ending = point(np.array([0.2,-0.1,0.3]))
    continuous = lambda t: (smooth_curve(t)[0] if t <= corner else
                            geodesic(break_point,ending,(t-corner)/(1-corner)))
    exact = edge(herm(break_point),herm(ending)) @ integrate(
        lambda t: coefficient(t)/2, stop=corner)
    for n in (11,23,47,95):
        samples = [continuous(t) for t in np.linspace(0,1,n+1)]
        assert np.linalg.norm(polygon(samples)-exact) < 0.2/n**2


def plaquettes_and_chirality():
    a,b,c,d = (0.27j*PAULI[0],0.38j*PAULI[1],0.16j*PAULI[2],-0.2j*PAULI[2])
    connection = lambda x,y: (a+y*c,b+x*d)
    f = d-c+a@b-b@a
    errors = []
    for h in (0.05,0.025,0.0125):
        u1 = expm(-h*connection(h/2,0)[0])
        u2 = expm(-h*connection(h,h/2)[1])
        u3 = expm(h*connection(h/2,h)[0])
        u4 = expm(h*connection(0,h/2)[1])
        errors.append(np.linalg.norm(u4@u3@u2@u1-I+h*h*f))
        s,t = h,0.7*h
        u1 = integrate(lambda u: -s*connection(s*u,0)[0],steps=16)
        u2 = integrate(lambda u: -t*connection(s,t*u)[1],steps=16)
        u3 = integrate(lambda u: s*connection(s*(1-u),t)[0],steps=16)
        u4 = integrate(lambda u: t*connection(0,t*(1-u))[1],steps=16)
        assert np.linalg.norm(u4@u3@u2@u1-I+s*t*f) < 0.2*(s+t)**3
    assert min(np.array(errors[:-1])/errors[1:]) > 7.5
    transported = expm(a)@b@expm(-a)
    close(expm(a)@b-b@expm(a),(transported-b)@expm(a))
    for momentum,mass,time in ((0.5,0.8,0.9),(0.3,0,0.4),(0,0.8,0.9),(0,0,1)):
        hamiltonian = momentum*PAULI[2]+mass*PAULI[0]
        energy = np.hypot(momentum,mass)
        close(hamiltonian@hamiltonian,energy**2*I)
        exact = expm(-1j*time*hamiltonian)
        if energy:
            close(exact,np.cos(time*energy)*I-1j*np.sin(time*energy)*hamiltonian/energy)
            close(abs(exact[1,0])**2,(mass*np.sin(time*energy)/energy)**2)
        else:
            close(exact,I)
        p = momentum*np.array([0.6,0.0,0.8])
        pm = herm(np.r_[0,p])
        four = np.block([[-pm,mass*I],[mass*I,pm]])
        close(four@four,energy**2*np.eye(4))
        close(np.linalg.eigvalsh(four),[-energy,-energy,energy,energy])
    theta = 0.81
    close(abs(expm(-1j*theta*PAULI[0])[1,0])**2,np.sin(theta)**2)

    argument = np.linspace(0,50,10001)
    assert min(np.cos(argument)-1+2*(argument+np.sin(argument))/np.pi) >= -1e-13
    initial = np.array([1,0],dtype=complex)
    speed = np.linalg.norm(PAULI[0]@initial)
    close(speed,1)
    elapsed = np.pi/2
    evolved = expm(-1j*elapsed*PAULI[0])@initial
    close(np.vdot(initial,evolved),0)
    close(elapsed,np.pi/(2*speed))
    # The two equally weighted energies 0 and 2 saturate the mean bound.
    close((1+np.exp(-2j*elapsed))/2,0)
    close(elapsed,np.pi/(2*(0+2)/2))


def cayley_checks():
    def cayley(r):
        return (I+r)@np.linalg.inv(I-r)

    def inverse(u):
        return (u-I)@np.linalg.inv(u+I)

    for _ in range(14):
        r,s = RNG.normal(size=(2,3))/8
        R,S = herm(np.r_[0,r]),herm(np.r_[0,s])
        x = cayley(R)
        y = cayley(S)
        close(coords(x),np.r_[1+r@r,2*r]/(1-r@r))
        vector = coords(x)
        close(vector[1:]/vector[0],2*r/(1+r@r))
        close(inverse(x),R)
        close(np.linalg.det(x),1)
        assert min(np.linalg.eigvalsh(x)) > 0
        radius = max(np.linalg.norm(r),np.linalg.norm(s))
        distance = np.arccosh(matrix_comparison(x,y))
        length = np.linalg.norm(r-s)
        assert 2*length <= distance <= 2*length/(1-radius*radius)
        close(cayley(inverse(y@sharp(x)))@x,y)
        direction = RNG.normal(size=3)
        eps = 1e-5
        velocity = coords((cayley(R+eps*herm(np.r_[0,direction])) -
                           cayley(R-eps*herm(np.r_[0,direction])))/(2*eps))
        close(-bilinear(velocity,velocity),4*(direction@direction)/(1-r@r)**2,
              atol=2e-7,rtol=1e-8)
    at = 0.56
    x,dx = smooth_curve(at)
    exact = herm(dx)@sharp(herm(x))
    error_forward = []
    error_central = []
    for h in (0.04,0.02,0.01):
        y = herm(smooth_curve(at+h)[0])
        z = herm(smooth_curve(at-h)[0])
        forward = 2*inverse(y@sharp(herm(x)))/h
        central = inverse(y@sharp(z))/h
        close(cayley(h*forward/2)@herm(x),y)
        error_forward.append(np.linalg.norm(forward-exact))
        error_central.append(np.linalg.norm(central-exact))
    assert min(np.array(error_forward[:-1])/error_forward[1:]) > 1.9
    assert min(np.array(error_central[:-1])/error_central[1:]) > 3.9


def main():
    checks = (
        special_linear_coordinates, abelian_and_nilpotent, trichotomy_and_spin,
        inertial_frames_and_clocks, hyperbolic_arcs, sagitta_and_consistency,
        brownian_moments, rational_rotation_and_area, finite_stokes_and_gauges,
        product_integral, plaquettes_and_chirality, cayley_checks,
    )
    for check in checks:
        check()
        print(f"PASS {check.__name__.replace('_', ' ')}")
    print(f"All {len(checks)} check groups passed (NumPy {np.__version__}).")


if __name__ == "__main__":
    main()
