"""Shared drawing for the chapter 33 figures (not a figure itself).

Three pictures: the continuum of memory orders, from the free photon (M = 0) through the atom
(M = 1) and the crystal to the self-referential mind (M ≫ 1); a marble kicked inside a profile
(a well pulls it back, a flat table lets it drift, an inverted bowl lets it fall off); and two
translated acceptance windows W + u_A, W + u_B whose intersection W_AB is the support both see.

All three are schematic (MODEL). The marble iterates are the linear maps x ↦ q·x (q = 0.45 in the
well, 1.7 on the inverted bowl) and a fixed sequence of kicks on the flat table. The window is drawn
as a regular decagon, a two-dimensional stand-in for the rhombic triacontahedron; its intersection
with a translate is computed by convex clipping and its area by the shoelace formula.

Colours: amber for the marble's current position (the "now"), cyan for what stays inside (the
window, the shared support W_AB), magenta for what only one observer sees.
"""

import math


# ---------------------------------------------------------------- the memory spectrum

STATIONS = (  # position along the axis (0..1), label zh, label en, tick
    (0.07, "光子", "photon", "0"),
    (0.33, "原子", "atom", "1"),
    (0.62, "晶体", "crystal", ""),
    (0.92, "心智", "mind", "≫ 1"),
)


def _photon(cv, x, y, s):
    cv.curve(lambda t: (x - s + 2 * s * t, y - 0.45 * s * math.sin(t * 4 * math.pi)), 0, 1, n=64, color="ink",
             width=1.8)
    cv.arrow_head(x + s + 3, y, 0, "ink", head=7)


def _atom(cv, x, y, s):
    cv.ellipse(x, y, s, 0.42 * s, rotate=20, color="dim", width=1.3)
    cv.dot(x, y, 4.2, "ink")
    a = math.radians(70)
    ex, ey = s * math.cos(a), 0.42 * s * math.sin(a)
    r = math.radians(20)
    cv.dot(x + ex * math.cos(r) - ey * math.sin(r), y - (ex * math.sin(r) + ey * math.cos(r)), 2.6, "ink")


def _crystal(cv, x, y, s):
    h = s * 0.62
    for i in (-1, 0, 1):
        cv.line(x - h, y + i * h, x + h, y + i * h, "faint", 1.1)
        cv.line(x + i * h, y - h, x + i * h, y + h, "faint", 1.1)
    for i in (-1, 0, 1):
        for j in (-1, 0, 1):
            cv.dot(x + i * h, y + j * h, 2.6, "ink")


def _mind(cv, x, y, s):
    r = 0.62 * s
    cv.arc(x, y, r, 110, 410, "ink", 1.8)
    a = math.radians(410)
    cv.arrow_head(x + r * math.cos(a), y - r * math.sin(a), 410 + 90, "ink", head=7)
    cv.dot(x, y, 3.0, "ink")


ICONS = (_photon, _atom, _crystal, _mind)


def spectrum(cv, x0, y, w, *, s=16.0, label=True, axis_label=True):
    """The axis at baseline y from x0 to x0 + w; icons sit above it, names and ticks below."""
    cv.arrow(x0, y, x0 + w, y, "dim", 1.6, head=9)
    xs = []
    for (f, zh, en, tick), icon in zip(STATIONS, ICONS):
        x = x0 + f * (w - 10)
        xs.append(x)
        cv.line(x, y - 4, x, y + 4, "dim", 1.4)
        icon(cv, x, y - s - 14, s)
        if label:
            cv.text(x, y + 20, cv.t(zh, en), size=13, color="ink", anchor="middle")
        if tick:
            cv.text(x, y + (38 if label else 20), "*M* = " + tick if tick != "≫ 1" else "*M* ≫ 1", size=13,
                    color="dim", anchor="middle")
    if axis_label:
        cv.text(x0 + w / 2, y + 62, cv.t("记忆阶数 *M* 递增 →", "memory order *M* grows →"), size=13, color="dim",
                anchor="middle")
    return xs


# ---------------------------------------------------------------- the marble in a profile

Q_WELL, Q_HILL = 0.45, 1.7
KICKS = (0.5, -0.25, 0.7)  # the flat table: a fixed sequence of kicks, no pull either way


def iterates(kind, n=4):
    """Normalised positions x_k ∈ [−1, 1] of the marble, k = 0 .. n − 1."""
    if kind == "well":
        xs = [0.8]
        for _ in range(n - 1):
            xs.append(Q_WELL * xs[-1])
    elif kind == "hill":
        xs = [0.18]
        for _ in range(n - 1):
            xs.append(Q_HILL * xs[-1])
    else:
        xs = [-0.7]
        for k in range(n - 1):
            xs.append(xs[-1] + KICKS[k % len(KICKS)])
    return xs


_w = iterates("well")
assert all(abs(b) < abs(a) for a, b in zip(_w, _w[1:]))  # the well pulls the marble in, every step
_h = iterates("hill")
assert all(abs(b) > abs(a) for a, b in zip(_h, _h[1:])) and abs(_h[-1]) < 1  # the bowl lets it run off
assert abs(sum(KICKS)) > 0.9  # the table lets it drift away from where it started


def profile(cv, cx, cy, hw, depth, kind, *, window=True, r=6.0, labels=True, n=4):
    """The profile y = ±depth·(x/hw)² (or flat) through (cx, cy), with the marble's iterates."""
    sign = {"well": 1, "hill": -1, "flat": 0}[kind]

    def at(u):  # u ∈ [−1, 1]
        return cx + u * hw, cy - sign * depth * u * u

    cv.curve(lambda t: at(-1 + 2 * t), 0, 1, n=80, color="ink", width=2.0)
    if kind == "well" and window:
        a, b = at(-0.32), at(0.32)
        cv.line(a[0], cy + 9, b[0], cy + 9, "line", 4.0, cap="round")
        if labels:
            cv.text(cx, cy + 28, "*W* + *u*_{*i*}", size=13, color="line", anchor="middle")
    xs = iterates(kind, n)
    pts = [at(u) for u in xs]
    pts = [(x, y - r - 1) for x, y in pts]
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        dist = math.hypot(x2 - x1, y2 - y1)
        if dist < 2.2 * r:  # too close to tell apart: the ring and the marble say it already
            continue
        mx, my = (x1 + x2) / 2, min(y1, y2) - min(16, 0.35 * dist)
        cv.curve_arrow([((1 - t) ** 2 * x1 + 2 * t * (1 - t) * mx + t * t * x2,
                         (1 - t) ** 2 * y1 + 2 * t * (1 - t) * my + t * t * y2) for t in [i / 16 for i in range(17)]],
                       "dim", 1.3, head=6)
    for x, y in pts[:-1]:
        cv.circle(x, y, r, color="dim", width=1.3)
    x, y = pts[-1]
    cv.dot(x, y, r, "now", ring="bg")
    return pts


# ---------------------------------------------------------------- the acceptance windows

def decagon(cx, cy, R, rot=90.0):
    return [(cx + R * math.cos(math.radians(rot + 36 * k)), cy - R * math.sin(math.radians(rot + 36 * k)))
            for k in range(10)]


def area(poly):
    return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(poly, poly[1:] + poly[:1]))) / 2


def clip(subject, clipper):
    """Sutherland–Hodgman: the part of the convex polygon ``subject`` inside the convex ``clipper``."""
    def inside(p, a, b, s):
        return s * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) >= -1e-12

    s = 1 if sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(clipper, clipper[1:] + clipper[:1])) > 0 else -1
    out = list(subject)
    for a, b in zip(clipper, clipper[1:] + clipper[:1]):
        inp, out = out, []
        if not inp:
            break
        for p, q in zip(inp, inp[1:] + inp[:1]):
            pin, qin = inside(p, a, b, s), inside(q, a, b, s)
            if pin:
                out.append(p)
            if pin != qin:
                dx, dy = q[0] - p[0], q[1] - p[1]
                ex, ey = b[0] - a[0], b[1] - a[1]
                t = (ex * (a[1] - p[1]) - ey * (a[0] - p[0])) / (ex * dy - ey * dx)
                out.append((p[0] + t * dx, p[1] + t * dy))
    return out


def overlap_fraction(d):
    """Vol(W_AB) / Vol(W) for two unit decagons whose centres are d apart (along the x axis)."""
    a, b = decagon(-d / 2, 0, 1), decagon(d / 2, 0, 1)
    return area(clip(a, b)) / area(a)


assert abs(area(decagon(0, 0, 1)) - 5 * math.sin(math.radians(36))) < 1e-12
assert abs(overlap_fraction(0) - 1) < 1e-12
assert overlap_fraction(2.1) == 0  # beyond the circumdiameter nothing is shared
assert all(overlap_fraction(a) > overlap_fraction(b) for a, b in ((0.3, 0.6), (0.6, 0.9), (0.9, 1.2)))


def windows(cv, cx, cy, R, d, *, labels=True, size=14):
    """W + u_A and W + u_B with centres d·R apart; returns (centre A, centre B, Vol fraction)."""
    ca, cb = (cx - d * R / 2, cy), (cx + d * R / 2, cy)
    A, B = decagon(*ca, R), decagon(*cb, R)
    AB = clip(A, B)
    cv.polygon(A, "magenta", fill_opacity=0.14)
    cv.polygon(B, "magenta", fill_opacity=0.14)
    cv.polygon(AB, "bg", fill_opacity=1)
    cv.polygon(AB, "line", fill_opacity=0.30, color="line", width=2.0)
    cv.polygon(A, None, color="ink", width=1.6, fill_opacity=None)
    cv.polygon(B, None, color="ink", width=1.6, fill_opacity=None)
    for c in (ca, cb):
        cv.dot(*c, 3.4, "ink", ring="bg")
    frac = area(AB) / area(A)
    assert abs(frac - overlap_fraction(d)) < 1e-9
    if labels:
        cv.text(cx, cy, "*W*_{*AB*}", size=size, color="line", anchor="middle", middle=True, weight=600, halo=True)
    return ca, cb, frac
