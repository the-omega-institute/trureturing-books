"""Shared drawing for the chapter 20 figures (not a figure itself).

- path_layers: the layer of each gate k = 0 … N of circuit(N, S) in the chapter's single-chain picture
  (gate k + 1 runs after gate k when k + 1 ∈ S, before it otherwise); each gate goes in the earliest
  layer its neighbours allow, so the depth for a fixed S is the longest dependency chain.
- penrose: the two-sided black hole as a square (boundaries left and right, singularities top and
  bottom, horizons on the diagonals) with schematic slices Σ_t anchored at boundary time t.
- throat: a schematic Einstein–Rosen bridge seen from the side.
"""

import math


def path_layers(N, S):
    """Earliest layers g(0 … N): gate k + 1 runs after gate k when k + 1 ∈ S, before it otherwise."""
    edges = [(k, k + 1) if (k + 1) in S else (k + 1, k) for k in range(N)]   # (runs first, runs after)
    g = [0] * (N + 1)
    for _ in range(N + 1):
        for a, b in edges:
            g[b] = max(g[b], g[a] + 1)
    for k in range(N):
        assert (g[k] < g[k + 1]) if (k + 1) in S else (g[k + 1] < g[k])
    return g


def path_order(N, S):
    """pathOrder(N, S): the indices not in S in decreasing order, then those in S in increasing order."""
    return sorted((k for k in range(N + 1) if k not in S), reverse=True) + sorted(S)


def gate_name(N, k):
    return "K1" if k == 0 else "KN" if k == N else f"U{k}"


def bezier(p0, p1, p2, p3, n=48):
    out = []
    for i in range(n + 1):
        s = i / n
        a, b, c, d = (1 - s) ** 3, 3 * s * (1 - s) ** 2, 3 * s * s * (1 - s), s ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out


def length(pts):
    return sum(math.dist(p, q) for p, q in zip(pts, pts[1:]))


def zigzag(cv, x1, x2, y, amp=4.0, n=16, color="dim", width=1.6):
    pts = [(x1 + (x2 - x1) * i / n, y + (amp if i % 2 else -amp) * (0 < i < n)) for i in range(n + 1)]
    cv.polyline(pts, color, width)


def penrose(cv, cx, cy, s, ts=(0, 1, 2, 3), labels=True, size=13):
    """The square diagram and the slices Σ_t; returns the slice point lists (oldest first)."""
    h = s / 2
    x0, x1, y0, y1 = cx - h, cx + h, cy - h, cy + h
    cv.line(x0, y0, x1, y1, "faint", 1.3, dash="4 4")
    cv.line(x0, y1, x1, y0, "faint", 1.3, dash="4 4")
    cv.line(x0, y0, x0, y1, "ink", 2.2)
    cv.line(x1, y0, x1, y1, "ink", 2.2)
    zigzag(cv, x0, x1, y0)
    zigzag(cv, x0, x1, y1)
    slices = []
    for t in ts:
        a = 0.14 * s * t                         # anchor height of boundary time t, on both sides
        m = 0.30 * s * (1 - 0.6 ** t)          # the middle creeps up towards a final slice below the singularity
        yl, ym = cy - a, cy - m
        pts = bezier((x0, yl), (cx - h * 0.45, ym), (cx + h * 0.45, ym), (x1, yl))
        slices.append(pts)
    lens = [length(p) for p in slices]
    assert all(b > a for a, b in zip(lens, lens[1:]))       # each later slice is drawn longer
    for i, pts in enumerate(slices):
        last = i == len(slices) - 1
        cv.polyline(pts, "axis", 3.2 if last else 1.8, opacity=None if last else 0.75)
        cv.dot(pts[0][0], pts[0][1], 3.4, "axis")
        cv.dot(pts[-1][0], pts[-1][1], 3.4, "axis")
    return slices


def throat(cv, cx, cy, w, h, neck, color="ink", rings=5):
    """A side view of a bridge: two flaring mouths joined by a narrow neck."""
    hw = w / 2
    k = (h / 2 - neck) / hw ** 2
    top = [(cx + x, cy - (neck + k * x * x)) for x in [-hw + w * i / 60 for i in range(61)]]
    bot = [(x, 2 * cy - y) for x, y in top]
    cv.polyline(top, color, 2.2)
    cv.polyline(bot, color, 2.2)
    for i in range(rings):
        x = -hw + w * (i + 0.5) / rings
        r = neck + k * x * x
        cv.ellipse(cx + x, cy, max(2.5, r * 0.22), r, color="dim", width=1.2)
