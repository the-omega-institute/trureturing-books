#!/usr/bin/env python3
"""Deterministic numerical checks for Section 5A (reflection spaces). Requires only NumPy.

The global manifold classification, smoothness and cut-locus exhaustiveness
are proved in the text. This script checks their explicit model formulas,
normalizations and witnesses using both generic and boundary inputs.
"""

import numpy as np


RNG = np.random.default_rng(20261120)
ATOL = 2e-11


def near(actual, expected):
    np.testing.assert_allclose(actual, expected, rtol=ATOL, atol=ATOL)


def unit(vector):
    return vector / np.linalg.norm(vector)


def sphere_weight(x, y):
    return (1 + x @ y) / 2


def sphere_reflect(x, y):
    return 2 * (x @ y) * x - y


def check_spheres():
    for dimension in (1, 2, 3, 4, 7, 8, 12):
        x, y, w, z = [unit(RNG.normal(size=dimension + 1)) for _ in range(4)]
        for w in (w, x, -x, unit(w - (x @ w) * x)):
            sxw = sphere_reflect(x, w)
            c = x @ w
            near(sphere_reflect(x, sxw), w)
            near(sphere_reflect(x, sphere_reflect(w, sphere_reflect(x, z))),
                 sphere_reflect(sxw, z))
            near(sphere_weight(sphere_reflect(x, y), sphere_reflect(x, z)),
                 sphere_weight(y, z))
            near(sphere_weight(w, sxw), c**2)
            near(sphere_weight(y, sxw),
                 2 * c * sphere_weight(y, x) - sphere_weight(y, w) + 1 - c)
            near(sphere_weight(x, w), np.cos(np.arccos(np.clip(c, -1, 1)) / 2)**2)
        near(sphere_weight(x, -x), 0)
        near(sphere_reflect(x, -x), -x)
    for t in np.linspace(-3, 3, 101):
        phase = lambda s: 2 * np.pi * abs(s - np.rint(s))
        f = phase(t)
        near(phase(2*t), 2 * min(f, np.pi-f))
        near((2 * np.cos(np.pi*t)**2 - 1)**2, np.cos(2*np.pi*t)**2)
    near(np.cos(np.pi/4)**2, 0.5)


def check_torus():
    def compare(x, y):
        return (2 + np.cos(x - y).sum()) / 4

    def reflect(x, w):
        return 2*x - w

    x, y, w = RNG.normal(size=(3, 2))
    near(reflect(x, reflect(x, w)), w)
    near(reflect(x, reflect(y, reflect(x, w))), reflect(reflect(x, y), w))
    near(compare(reflect(x, y), reflect(x, w)), compare(y, w))
    near(compare(x, x), 1)
    near(compare(x, x + np.pi), 0)
    zero = np.zeros(2)
    mirror = np.array([np.pi, 0])
    near(compare(zero, reflect(mirror, zero)), 1)
    near((2*compare(zero, mirror)-1)**2, 0)
    slopes = np.array([1, np.sqrt(2)])
    first_coordinate_returns = 2*np.pi*np.arange(1, 101)
    assert np.all(abs(first_coordinate_returns * slopes[1] / (2*np.pi)
                      - np.rint(first_coordinate_returns * slopes[1] / (2*np.pi))) > 1e-5)


def cd_conjugate(a):
    result = a.copy()
    result[1:] *= -1
    return result


def cd_product(a, b):
    if len(a) == 1:
        return a * b
    left, right = np.split(a, 2)
    u, v = np.split(b, 2)
    return np.concatenate((
        cd_product(left, u) - cd_product(cd_conjugate(v), right),
        cd_product(v, left) + cd_product(right, cd_conjugate(u)),
    ))


class Matrices:
    """Matrices over the first four real Cayley–Dickson algebras."""

    def __init__(self, components, size):
        self.components = components
        self.size = size
        units = np.eye(components)
        self.product_tensor = np.array([
            [cd_product(a, b) for b in units] for a in units
        ])
        self.conjugation = cd_conjugate(np.ones(components))
        self.identity = np.zeros((size, size, components))
        self.identity[:, :, 0] = np.eye(size)
        self.coordinate = np.zeros((size, components))
        self.coordinate[0, 0] = 1

    def multiply(self, a, b):
        return np.einsum("ija,jkb,abc->ikc", a, b, self.product_tensor,
                         optimize=True)

    def jordan(self, a, b):
        return (self.multiply(a, b) + self.multiply(b, a)) / 2

    def projector(self, vector):
        return self.multiply(vector[:, None, :],
                             vector[None, :, :] * self.conjugation)

    def random_vector(self):
        vector = RNG.normal(size=(self.size, self.components))
        if self.components == 8:
            # The (1,u,v) chart uses only two octonion generators.
            vector[0] = self.coordinate[0]
        return unit(vector)

    def weight(self, a, b):
        return np.trace(self.jordan(a, b)[:, :, 0])

    def reflection(self, a, b):
        once = self.jordan(a, b)
        return b + 8 * (self.jordan(a, once) - once)

    def invariant(self, y, x, w):
        return self.weight(y, self.jordan(x, w))

    def check_projector(self, p):
        near(p, p.transpose(1, 0, 2) * self.conjugation)
        near(self.jordan(p, p), p)
        near(np.trace(p[:, :, 0]), 1)


def check_projective(algebra):
    m = algebra
    center = m.projector(m.coordinate)
    sign = np.repeat(-1.0, m.size)
    sign[0] = 1
    for _ in range(9):
        x, y, w, z = [m.projector(m.random_vector()) for _ in range(4)]
        for p in (x, y, w, z):
            m.check_projector(p)
        reflected = m.reflection(x, w)
        m.check_projector(reflected)
        near(m.reflection(x, x), x)
        near(m.reflection(x, reflected), w)
        near(m.reflection(x, m.reflection(w, m.reflection(x, y))),
             m.reflection(reflected, y))
        near(m.weight(m.reflection(x, y), m.reflection(x, z)), m.weight(y, z))
        near(m.reflection(center, w), w * sign[:, None, None] * sign[None, :, None])
        beta_xw = m.weight(x, w)
        beta_yw = m.weight(y, w)
        beta_yx = m.weight(y, x)
        for beta in (beta_xw, beta_yw, beta_yx):
            assert -ATOL <= beta <= 1 + ATOL
        near(m.weight(w, x), beta_xw)
        near(m.weight(w, reflected), (2*beta_xw - 1)**2)
        once = m.jordan(x, w)
        near(2*m.jordan(x, once) - once, beta_xw * x)
        invariant = m.invariant(y, x, w)
        near(m.weight(y, reflected), 4*beta_yx*beta_xw + beta_yw - 4*invariant)
        if m.components < 8:
            matrix = 2*x - m.identity
            near(m.multiply(m.multiply(matrix, w), matrix), reflected)
            near(np.trace(m.multiply(m.multiply(y, x), w)[:, :, 0]), invariant)
        gram = np.array([[m.weight(a, b) for b in (x, y, w)] for a in (x, y, w)])
        assert np.linalg.eigvalsh(gram)[0] >= -ATOL
        lower = m.random_vector()
        lower[0] = 0
        lower = unit(lower)
        cut = m.projector(lower)
        m.check_projector(cut)
        near(m.weight(center, cut), 0)
        near(m.reflection(center, cut), cut)
        near(m.weight(center, m.reflection(w, center)),
             (2*m.weight(center, w)-1)**2)

    for t in (0, 0.23, np.pi/4, np.pi/2, 2.0, np.pi):
        def geodesic(time):
            return m.projector(np.cos(time)*m.coordinate + np.sin(time)*lower)

        p = geodesic(t)
        near(m.weight(center, p), np.cos(t)**2)
        near(p, geodesic(t + np.pi))
        near(m.reflection(p, geodesic(t + 0.37)), geodesic(t - 0.37))
        near(m.reflection(p, center), geodesic(2*t))
        if 0 < t < np.pi/2:
            near(p[1:, 0] / p[0, 0, 0], lower[1:] * np.tan(t))
    near(geodesic(np.pi/2), cut)
    near(geodesic(-np.pi/2), cut)

    if m.size == 2:
        p, q = [m.projector(m.random_vector()) for _ in range(2)]

        def bloch(a):
            return np.r_[2*a[0, 0, 0] - 1, 2*a[0, 1]]

        near(np.linalg.norm(bloch(p)), 1)
        near(m.weight(p, q), sphere_weight(bloch(p), bloch(q)))
        near(bloch(m.reflection(p, q)), sphere_reflect(bloch(p), bloch(q)))


def check_witnesses():
    for components in (1, 2, 4, 8):
        m = Matrices(components, 3)
        x = m.projector(m.coordinate)
        vector = np.zeros_like(m.coordinate)
        vector[:2, 0] = 1 / np.sqrt(2)
        w = m.projector(vector)
        near(m.weight(x, w), 0.5)
        for sign, coordinates, answer in (
            (1, [1, 1, np.sqrt(8)], 0), (-1, [1, -3, 0], 0.8)
        ):
            vector[:, 0] = np.array(coordinates) / np.sqrt(10)
            near(np.linalg.norm(vector), 1)
            y = m.projector(vector)
            near(m.weight(y, x), 0.1)
            near(m.weight(y, w), 0.2)
            near(m.invariant(y, x, w), sign * 0.1)
            near(m.weight(y, m.reflection(x, w)), answer)
        if components >= 2:
            for theta in np.linspace(0, 2*np.pi, 41):
                second = 2*np.exp(1j*theta) - 1
                vector[:, 0] = [1, second.real, np.sqrt(4 + 4*np.cos(theta))]
                vector[:, 1] = [0, second.imag, 0]
                vector /= np.sqrt(10)
                near(np.linalg.norm(vector), 1)
                y = m.projector(vector)
                m.check_projector(y)
                near(m.weight(y, x), 0.1)
                near(m.weight(y, w), 0.2)
                near(m.invariant(y, x, w), np.cos(theta) / 10)
                near(m.weight(y, m.reflection(x, w)), 0.4*(1-np.cos(theta)))
                if components == 2:
                    trace = np.trace(m.multiply(m.multiply(y, x), w), axis1=0, axis2=1)
                    near(trace[0] + 1j*trace[1], np.exp(1j*theta) / 10)
    near(np.linalg.eigvalsh(2*np.eye(3) - np.ones((3, 3))), [-1, 2, 2])


def check_quaternionic_phase():
    m = Matrices(4, 3)
    y, x, w = [m.random_vector() for _ in range(3)]
    p = [m.projector(a) for a in (y, x, w)]
    units = [unit(RNG.normal(size=4)) for _ in range(3)]
    lifted = [np.array([cd_product(z, u) for z in a])
              for a, u in zip((y, x, w), units)]
    for a, b in zip(p, lifted):
        near(m.projector(b), a)

    def overlap(a, b):
        return sum(cd_product(cd_conjugate(z), t) for z, t in zip(a, b))

    def phase(a, b, c):
        return cd_product(cd_product(overlap(a, b), overlap(b, c)), overlap(c, a))

    delta = phase(y, x, w)
    near(phase(*lifted), cd_product(cd_product(cd_conjugate(units[0]), delta), units[0]))
    near(delta[0], m.invariant(*p))
    near(delta @ delta, m.weight(p[0], p[1])*m.weight(p[1], p[2])*m.weight(p[2], p[0]))


PAULI = np.array([[[0, 1], [1, 0]], [[0, -1j], [1j, 0]], [[1, 0], [0, -1]]])


def bloch_projector(v):
    return (np.eye(2) + np.einsum("i,ijk->jk", v, PAULI)) / 2


def check_gram_and_phase():
    for dimension in (2, 4):
        vectors = np.array([unit(RNG.normal(size=dimension) + 1j*RNG.normal(size=dimension))
                            for _ in range(4)]).T
        unitary, _ = np.linalg.qr(RNG.normal(size=(dimension, dimension))
                                  + 1j*RNG.normal(size=(dimension, dimension)))
        gram = vectors.conj().T @ vectors
        transformed = unitary @ vectors
        near(transformed.conj().T @ transformed, gram)
        for count in range(1, 5):
            projectors = [np.outer(a, a.conj()) for a in vectors[:, :count].T]
            product = np.eye(dimension)
            for p in projectors:
                product = product @ p
            cycle = np.prod([gram[i, (i+1) % count] for i in range(count)])
            near(np.trace(product), cycle)
        delta = gram[0, 1]*gram[1, 2]*gram[2, 0]
        probabilities = abs(gram[[0, 1, 2], [1, 2, 0]])**2
        near(abs(delta)**2, np.prod(probabilities))
        near(np.linalg.det(gram[:3, :3]), 1 - probabilities.sum() + 2*delta.real)
        if dimension == 2:
            near(delta.real, (probabilities.sum()-1)/2)
        u = vectors[:, 0]
        for v in vectors[:, [1, 2, 0]].T:
            u = unit(v * np.vdot(v, u))
        near(np.vdot(vectors[:, 0], u), delta.conjugate()/abs(delta))

    basis = np.eye(3)
    for i in range(3):
        for j in range(3):
            near(PAULI[i] @ PAULI[j],
                 (i == j)*np.eye(2) + 1j*np.einsum("k,kab->ab", np.cross(basis[i], basis[j]), PAULI))
    a, b, c = [unit(row) for row in RNG.normal(size=(3, 3))]
    for a, b, c in ((a, b, c), (basis[2], basis[0], basis[1]),
                    (basis[2], basis[0], -basis[1])):
        p, q, r = a@b, b@c, c@a
        signed = a @ np.cross(b, c)
        total = 1 + p + q + r
        matrices = [bloch_projector(t) for t in (a, b, c)]
        delta = np.trace(matrices[0] @ matrices[1] @ matrices[2])
        near(delta, (total + 1j*signed)/4)
        near(signed**2, 1 + 2*p*q*r - p*p - q*q - r*r)
        near(total**2 + signed**2, 2*(1+p)*(1+q)*(1+r))
        near(np.trace(matrices[0].conj() @ matrices[1].conj() @ matrices[2].conj()), delta.conj())
        if p == q == r == 0:
            near(-np.angle(delta), -np.sign(signed)*np.pi/4)
            near(np.trace(matrices[0] @ matrices[1]), 0.5)
    for degrees in (30, 60, 90, 120, 150):
        t = np.deg2rad(degrees)
        a = basis[2]
        b = np.array([np.sin(t), 0, np.cos(t)])
        c = np.array([0, np.sin(t), np.cos(t)])
        delta = np.trace(bloch_projector(a) @ bloch_projector(b) @ bloch_projector(c))
        near(delta, ((1+np.cos(t))**2 + 1j*np.sin(t)**2)/4)
        sides = np.arccos([a@b, b@c, c@a])
        semi = sides.sum()/2
        area = 4*np.arctan(np.sqrt(np.tan(semi/2)*np.prod(np.tan((semi-sides)/2))))
        near(np.angle(delta), area/2)
        near(np.angle(delta), np.arctan(np.tan(t/2)**2))
    near(4*np.pi/8, np.pi/2)
    for theta, expected in ((0, 0), (np.pi, np.pi/2)):
        nearby = theta + (1e-4 if theta == 0 else -1e-4)
        assert abs(np.arctan(np.tan(nearby/2)**2) - expected) < 3e-9
    equator = np.array([[1, 1j**j] for j in range(4)]) / np.sqrt(2)
    edges = [np.vdot(equator[j], equator[(j+1) % 4]) for j in range(4)]
    near(edges, np.full(4, (1+1j)/2))
    near(np.prod(edges), -0.25)

    vectors = np.array([[1, 0, 0], [1, 1, 1], [0, 1, 0], [1, 1j, -(1+1j)]])
    vectors = np.array([unit(row) for row in vectors])
    gram = vectors.conj() @ vectors.T
    near(gram[0, 2], 0)
    near(gram[1, 3], 0)
    edges = gram[[0, 1, 2, 3], [1, 2, 3, 0]]
    near(edges, [1/np.sqrt(3), 1/np.sqrt(3), 0.5j, 0.5])
    near(np.prod(edges), 1j/12)
    phases = np.array([1, 1j, -1, -1j])
    rephased = (vectors * phases[:, None]).conj() @ (vectors * phases[:, None]).T
    near(np.prod(rephased[[0, 1, 2, 3], [1, 2, 3, 0]]), 1j/12)


def check_polarization_and_readings():
    e1, e2, e3 = np.eye(3)
    u, v = RNG.normal(size=(2, 3))
    near(np.linalg.norm(u+v)**2 + np.linalg.norm(u-v)**2,
         2*(u@u + v@v))
    gram_area = (u@u)*(v@v) - (u@v)**2
    assert gram_area >= 0
    near(gram_area, np.linalg.norm(np.cross(u, v))**2)
    near(np.linalg.norm(e1+e2, 1)**2 + np.linalg.norm(e1-e2, 1)**2, 8)
    near(2*(np.linalg.norm(e1, 1)**2 + np.linalg.norm(e2, 1)**2), 4)
    r = np.sqrt(3)/2
    near(np.linalg.det([[1, r, r], [r, 1, -1], [r, -1, 1]]), -3)
    vectors = RNG.normal(size=(5, 3))
    centering = np.eye(5) - np.ones((5, 5))/5
    distance_squared = np.sum((vectors[:, None] - vectors[None, :])**2, axis=2)
    centered = centering @ vectors
    near(-centering @ distance_squared @ centering/2, centered @ centered.T)
    impossible = np.array([[0, 1, 9], [1, 0, 1], [9, 1, 0]])
    j3 = np.eye(3) - np.ones((3, 3))/3
    assert np.linalg.eigvalsh(-j3 @ impossible @ j3 / 2)[0] < 0
    for theta in (0.01, 0.08, 0.3, 1.1, np.pi/2):
        b = np.cos(theta)*e1 + np.sin(theta)*e2
        p = np.cos(theta)*e1 + np.sin(theta)*e3
        for endpoint, power in ((e3, 2), (p, 4)):
            rows = np.array([e1, b, endpoint])
            near(np.linalg.det(rows @ rows.T), np.sin(theta)**power)
        excess = 2*np.arctan(np.tan(theta/2)**2)
        assert 0 < excess and abs(excess - theta**2/2) < theta**4/2
    positive = (e1+e2)/np.sqrt(2)
    near((e1@positive)**2, 0.5)
    near((positive@e2)**2, 0.5)
    near((e1@positive)**2*(positive@e2)**2, 0.25)
    near((e1@e2)**2, 0)
    near(np.outer(positive, positive) @ e1 / np.sqrt(0.5), positive)
    p, q = np.diag([1, 0]), np.diag([0, 1])
    swap = PAULI[0]
    for branch in (p, q):
        flipped = swap @ branch
        near(branch.conj().T @ branch, flipped.conj().T @ flipped)
    near(np.trace(q @ p), 0)
    near(np.trace(q @ swap @ p @ swap.conj().T), 1)
    x, w = np.array([1, 0], dtype=complex), np.array([1, 1], dtype=complex) / np.sqrt(2)
    real_reflection = lambda a, b: 2 * np.vdot(a, b).real * a - b
    near(real_reflection(x, w), np.array([1, -1]) / np.sqrt(2))
    near(real_reflection(-x, w), real_reflection(x, w))
    near(real_reflection(x, -w), -real_reflection(x, w))
    near(real_reflection(1j*x, w), -w)
    near(np.vdot(real_reflection(x, w), real_reflection(1j*x, w)), 0)
    rephased = np.exp(0.72j) * x
    aligned = rephased * np.vdot(rephased, w) / abs(np.vdot(rephased, w))
    near(real_reflection(aligned, w), (2*np.outer(x, x.conj())-np.eye(2)) @ w)
    for components, count in ((1, 4), (2, 2), (4, 1)):
        m = Matrices(components, count)
        projectors = [m.projector(np.eye(count)[j, :, None] * m.coordinate[0])
                      for j in range(count)]
        near(sum(projectors), m.identity)
        p = m.projector(m.random_vector())
        near(sum(m.weight(p, q) for q in projectors), 1)
        near([[m.weight(a, b) for b in projectors] for a in projectors], np.eye(count))


def main():
    check_spheres()
    check_torus()
    for components in (1, 2, 4, 8):
        for size in (2, 3):
            check_projective(Matrices(components, size))
    check_witnesses()
    check_quaternionic_phase()
    check_gram_and_phase()
    check_polarization_and_readings()
    print("PASS: reflections, closing law, cut models, Bargmann terms, witnesses, Gram data and readings")


if __name__ == "__main__":
    main()
