"""Shared computation and drawing for the chapter 16 figures (not a figure itself).

Gate words: the Bloch rotations of H and T from the chapter's worked example,
R_H(x, y, z) = (z, −y, x) and R_T(x, y, z) = ((x − y)/√2, (x + y)/√2, z); the reachable set S_L from the
north pole and the faces of its convex hull P_L = conv(S_L).

Source queries: the exact amplitude-amplification word of the chapter's corollary,
n = ⌈π/(4 arcsin √p) − ½⌉₊, sourceQueries = 2n + 1 (1 when p = 1), bound (π/2 + 2)/√p.
"""

import itertools
import math

S2 = 1 / math.sqrt(2)


def r_h(v):
    x, y, z = v
    return (z, -y, x)


def r_t(v):
    x, y, z = v
    return ((x - y) * S2, (x + y) * S2, z)


def _key(v):
    return tuple(round(c, 9) + 0.0 for c in v)


def reachable(L):
    """S_L: the distinct points R_w e_z over words w in {H, T} of length at most L."""
    seen = {_key((0.0, 0.0, 1.0)): (0.0, 0.0, 1.0)}
    layer = list(seen.values())
    for _ in range(L):
        nxt = []
        for v in layer:
            for f in (r_h, r_t):
                w = f(v)
                k = _key(w)
                if k not in seen:
                    seen[k] = w
                    nxt.append(w)
        layer = nxt
    return list(seen.values())


def _sub(a, b):
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def _cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def _dot(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def hull_faces(pts, eps=1e-9):
    """The faces of conv(pts) as (outward unit normal, offset, vertex indices in cyclic order)."""
    faces = {}
    for i, j, k in itertools.combinations(range(len(pts)), 3):
        n = _cross(_sub(pts[j], pts[i]), _sub(pts[k], pts[i]))
        ln = math.sqrt(_dot(n, n))
        if ln < 1e-9:
            continue
        n = (n[0] / ln, n[1] / ln, n[2] / ln)
        d = _dot(n, pts[i])
        side = [_dot(n, p) - d for p in pts]
        if all(s <= eps for s in side):
            pass
        elif all(s >= -eps for s in side):
            n, d = (-n[0], -n[1], -n[2]), -d
        else:
            continue
        on = frozenset(m for m, s in enumerate(side) if abs(s) <= eps)
        if on in faces:
            continue
        # order the face's vertices around its centroid
        c = [sum(pts[m][a] for m in on) / len(on) for a in range(3)]
        u = _sub(pts[next(iter(on))], c)
        lu = math.sqrt(_dot(u, u))
        u = (u[0] / lu, u[1] / lu, u[2] / lu)
        v = _cross(n, u)
        order = sorted(on, key=lambda m: math.atan2(_dot(_sub(pts[m], c), v), _dot(_sub(pts[m], c), u)))
        faces[on] = (n, d, order)
    return list(faces.values())


def draw_polytope(sp, pts, faces):
    """The hull on the sphere ``sp``: front faces lightly filled, edges solid in front and dashed behind."""
    edges = {}
    for n, _, order in faces:
        front = _dot(n, sp.toward) > 0
        if front:
            sp.cv.polygon([sp.xy(pts[m]) for m in order], "cyan", fill_opacity=0.07)
        for a, b in zip(order, order[1:] + order[:1]):
            e = (min(a, b), max(a, b))
            edges[e] = edges.get(e, False) or front
    for (a, b), front in edges.items():
        if not front:
            sp.segment(pts[a], pts[b], "dim", 1.0, dash="3 3", opacity=0.6)
    for (a, b), front in edges.items():
        if front:
            sp.segment(pts[a], pts[b], "line", 1.5)
    for p in pts:
        if _dot(p, sp.toward) >= 0:
            sp.dot(p, "line", 3.6, ring="bg")
        else:
            sp.dot(p, "dim", 2.6)


def queries(p):
    """(n, sourceQueries) for the exact amplification word at success probability p."""
    if p >= 1:
        return 0, 1
    n = max(0, math.ceil(math.pi / (4 * math.asin(math.sqrt(p))) - 0.5 - 1e-12))
    return n, 2 * n + 1


def query_bound(p):
    return (math.pi / 2 + 2) / math.sqrt(p)
