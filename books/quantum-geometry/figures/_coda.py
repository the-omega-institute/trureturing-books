"""Shared drawing for the coda figures (not a figure itself).

The polyhedral approximation of the sphere (the icosahedron and its geodesic subdivisions, with the
angular defect at every vertex), the Lorenz system of the spatial-attractor section, the golden lattice
of the cut-and-project section, and the cross-chapter references of the reading map. Colours follow the
pages spatial-attractor-deja-vu and golden-cut-observer: round k is cyan, round k + 1 magenta; the window
is amber, the points it keeps are cyan.
"""

import collections
import math
import re
from pathlib import Path

from _ch21 import icosahedron, rot  # noqa: F401  (rot is re-exported for the figures)

PHI = (1 + math.sqrt(5)) / 2
PSI = 1 - PHI                                   # the conjugate of φ, −1/φ
WINDOW = (PHI - 2, PHI - 1)                     # goldenWindow = [φ − 2, φ − 1]
ROOT = Path(__file__).resolve().parents[3]
ZH = ROOT / "books" / "quantum-geometry" / "zh"


# ---------------------------------------------------------------- the polyhedral sphere

def _unit(v):
    n = math.sqrt(sum(c * c for c in v))
    return tuple(c / n for c in v)


def geodesic(freq):
    """The geodesic polyhedron of frequency ``freq``: every icosahedron face cut into freq² triangles,
    the new vertices pushed out to the unit sphere. Returns (vertices, triangles)."""
    verts, edges = icosahedron()
    es = set(edges)
    faces = [(i, j, k) for i in range(12) for j in range(i + 1, 12) for k in range(j + 1, 12)
             if (i, j) in es and (j, k) in es and (i, k) in es]
    index, out, tris = {}, [], []

    def vid(p):
        key = tuple(round(c, 9) for c in p)
        if key not in index:
            index[key] = len(out)
            out.append(p)
        return index[key]

    for i, j, k in faces:
        a, b, c = verts[i], verts[j], verts[k]

        def g(u, v):                                  # barycentric grid point, projected to the sphere
            w = freq - u - v
            return _unit(tuple((w * a[m] + u * b[m] + v * c[m]) / freq for m in range(3)))

        for u in range(freq):
            for v in range(freq - u):
                tris.append((vid(g(u, v)), vid(g(u + 1, v)), vid(g(u, v + 1))))
                if u + v < freq - 1:
                    tris.append((vid(g(u + 1, v)), vid(g(u + 1, v + 1)), vid(g(u, v + 1))))
    assert len(out) == 10 * freq * freq + 2 and len(tris) == 20 * freq * freq
    return out, tris


def defects(freq):
    """The angular defect (degrees) at every vertex of the geodesic polyhedron: 360° minus the corners
    of the flat triangles that meet there. Descartes: they add up to 720° (asserted)."""
    verts, tris = geodesic(freq)
    total = [0.0] * len(verts)
    for t in tris:
        for m in range(3):
            p, q, r = (verts[t[m]], verts[t[(m + 1) % 3]], verts[t[(m + 2) % 3]])
            u = [q[n] - p[n] for n in range(3)]
            v = [r[n] - p[n] for n in range(3)]
            cos = sum(u[n] * v[n] for n in range(3)) / math.sqrt(sum(c * c for c in u) * sum(c * c for c in v))
            total[t[m]] += math.degrees(math.acos(max(-1.0, min(1.0, cos))))
    d = [360 - s for s in total]
    assert abs(sum(d) - 720) < 1e-6 and min(d) > 0
    return d


def wireframe(cv, cx, cy, R, *, verts=None, edges=None, dots="area", tilt=-14, turn=20):
    """The icosahedron (or the given polyhedron) in the view of chapter 21: near edges solid, far ones dashed."""
    if verts is None:
        verts, edges = icosahedron()
    pv = [rot(v, math.radians(tilt), math.radians(turn)) for v in verts]
    xy = [(cx + R * p[0], cy - R * p[2]) for p in pv]
    for i, j in edges:
        front = pv[i][1] + pv[j][1] < 0.2
        cv.line(*xy[i], *xy[j], "dim" if front else "faint", 1.4 if front else 1.1, dash=None if front else "3 3")
    if dots:
        for (x, y), p in zip(xy, pv):
            cv.dot(x, y, 4.4 if p[1] < 0.2 else 3.4, dots, ring="bg")
    return xy


# ---------------------------------------------------------------- the Lorenz system

SIGMA, RHO, BETA = 10.0, 28.0, 8.0 / 3.0


def lorenz(start, t1, dt=0.005):
    """RK4 for ẋ = σ(y − x), ẏ = x(ρ − z) − y, ż = xy − βz from ``start`` up to time ``t1``."""
    def f(s):
        x, y, z = s
        return (SIGMA * (y - x), x * (RHO - z) - y, x * y - BETA * z)

    s, out = tuple(start), [tuple(start)]
    for _ in range(int(round(t1 / dt))):
        k1 = f(s)
        k2 = f(tuple(s[i] + dt / 2 * k1[i] for i in range(3)))
        k3 = f(tuple(s[i] + dt / 2 * k2[i] for i in range(3)))
        k4 = f(tuple(s[i] + dt * k3[i] for i in range(3)))
        s = tuple(s[i] + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) for i in range(3))
        out.append(s)
    assert abs(-(SIGMA + 1 + BETA) + 41 / 3) < 1e-12     # the divergence −41/3 of the chapter's note
    return out


# ---------------------------------------------------------------- the golden lattice

def golden_points(xr, yr, n=14):
    """The lattice points (a + bφ, a + bψ) inside the box xr × yr."""
    pts = []
    for a in range(-n, n + 1):
        for b in range(-n, n + 1):
            x, y = a + b * PHI, a + b * PSI
            if xr[0] <= x <= xr[1] and yr[0] <= y <= yr[1]:
                pts.append((a, b, x, y))
    return pts


def in_window(y):
    return WINDOW[0] - 1e-12 <= y <= WINDOW[1] + 1e-12


# ---------------------------------------------------------------- cross-chapter references

_CN = "零一二三四五六七八九"
_REF = re.compile(r"ch(\d\d)-[a-z0-9-]+\.md|第\s*([0-9]+|[一二三四五六七八九十]+)\s*章")


def _cn(s):
    if s.isdigit():
        return int(s)
    if s == "十":
        return 10
    if s.startswith("十"):
        return 10 + _CN.index(s[1])
    if s.endswith("十"):
        return _CN.index(s[0]) * 10
    if "十" in s:
        a, b = s.split("十")
        return _CN.index(a) * 10 + _CN.index(b)
    return _CN.index(s)


def chapter_references():
    """Counter {(cited, citing): mentions} over the Chinese chapters 1–30: a link to chNN-….md or the
    words “第 N 章” (Arabic or Chinese numerals) inside chapter M ≠ N. Captions of figures, lab cards and
    films are skipped: they describe a picture, not what the chapter builds on."""
    refs = collections.Counter()
    for f in sorted(ZH.glob("ch[0-3][0-9]-*.md")):
        me = int(f.name[2:4])
        media = False
        for line in f.read_text(encoding="utf-8").splitlines():
            if re.match(r":::\s*\{\.(figure|viz|film)\b", line):
                media = True
                continue
            if media:
                media = line.strip() != ":::"
                continue
            for m in _REF.finditer(line):
                n = int(m.group(1)) if m.group(1) else _cn(m.group(2))
                if n != me and 1 <= n <= 30:
                    refs[(n, me)] += 1
    return refs


def parts():
    """The chapters of each part, read from zh/SUMMARY.md: [[1, 2, 3, 4], [5, …], …]."""
    out = []
    for line in (ZH / "SUMMARY.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("# 第") and "部" in line:
            out.append([])
        m = re.search(r"\(ch(\d\d)-", line)
        if m and out:
            out[-1].append(int(m.group(1)))
    return out
