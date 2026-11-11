"""Shared drawing for the chapter 30 figures (not a figure itself).

Three pictures: the finite observer's horizon (the hidden target sits almost at 90° from the start,
cos θ₀ = 2^{−n/2}); the schematic exponent-rate curve r(n) = log₂log₂n / √log₂n against the PPSZ
level 0.386, crossing far beyond the observable universe; and a vortex tube that grows longer and
thinner while its circulation Γ = ωA stays fixed.

Colours follow the chapter's lab pages: amber for the observer's current state, cyan for the shadow
(what stays on the observer's line) and for the curve and the circulation loop, magenta for the
PPSZ level and for the vorticity; red only for the open problem.
"""

import math


# ---------------------------------------------------------------- the horizon

def theta0(n):
    """The angle between the uniform start and a single hidden target among N = 2ⁿ."""
    return math.acos(2 ** (-n / 2))


assert abs(math.degrees(theta0(2)) - 60) < 1e-9
assert abs(theta0(8) - (math.pi / 2 - 2 ** -4)) < 1e-3  # θ₀ ≈ π/2 − 2^{−n/2}


def horizon(cv, ox, oy, R, ns=(2, 4, 8), *, labels=True):
    """Origin at (ox, oy); the observer's state P₀ along +x, the 90° horizon up the y axis."""
    cv.arc(ox, oy, R, 0, 90, "faint", 1.2, dash="3 4")
    cv.line(ox, oy, ox, oy - R - 10, "dim", 1.4, dash="6 4")
    cv.arrow(ox, oy, ox + R, oy, "now", 2.6, head=10)
    tips = []
    for n in ns:
        a = theta0(n)
        tx, ty = ox + R * math.cos(a), oy - R * math.sin(a)
        tips.append((tx, ty))
        cv.line(tx, ty, tx, oy, "line", 1.2, dash="3 3")
        cv.arrow(ox, oy, tx, ty, "ink", 1.8, head=8)
    for n, (tx, ty) in zip(ns, tips):
        cv.line(ox, oy, tx, oy, "line", 4.4, cap="round")
        cv.dot(tx, oy, 3.4, "line", ring="bg")
        if labels:
            cv.text(tx, oy + 20, "1/" + str(2 ** (n // 2)), size=13, color="line", anchor="middle")
            cv.text(tx, oy + 38, f"*n* = {n}", size=13, color="dim", anchor="middle")
    return tips


# ---------------------------------------------------------------- the crossover

PPSZ = 0.386


def rate(L):
    """Schematic exponent rate with c = 1, as a function of L = log₂ n."""
    return math.log2(L) / math.sqrt(L)


def crossing():
    lo, hi = 100.0, 2000.0
    for _ in range(200):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if rate(mid) > PPSZ else (lo, mid)
    return lo


L_STAR = crossing()
assert abs(rate(16) - 1.0) < 1e-12 and abs(rate(266) - 0.494) < 5e-4 and abs(L_STAR - 558) < 1.5


def crossover(cv, x, y, w, h, *, size=13):
    t = cv.t
    ax = cv.axes(x, y, w, h, (0, 720), (0, 1.15))
    shade = [(0, 1.15), (266, 1.15)]
    ax.area(shade, "dim", fill_opacity=0.12)
    ax.hline(PPSZ, "area", 2.0)
    ax.plot(rate, 2, 720, color="line", width=2.4)
    ax.xaxis(ticks=[0, 266, 558], labels=["0", "266", "558"], size=13)
    ax.cv.line(ax.X(0), ax.Y(0), ax.X(0), ax.Y(1.15), "dim", 1.3)
    ax.points([(L_STAR, PPSZ)], "ink", r=4.4, ring="bg")
    ax.text(133, 0.16, t("可观测宇宙", "universe"), size=size, color="dim", anchor="middle", middle=True)
    ax.text(720, PPSZ, "0.386", dy=-9, size=size, color="area", anchor="end")
    return ax


# ---------------------------------------------------------------- the stretched tube

def tube(cv, cx, cy, r, L, omega, *, scale=26):
    """A vertical vortex tube of radius r and length L centred at (cx, cy): ink outline, a magenta
    vorticity arrow of length scale·ω along the axis, a cyan circulation loop round the middle."""
    ry = 0.32 * r
    top, bot = cy - L / 2, cy + L / 2
    cv.line(cx - r, top, cx - r, bot, "ink", 1.6)
    cv.line(cx + r, top, cx + r, bot, "ink", 1.6)
    cv.ellipse(cx, top, r, ry, color="ink", width=1.6, fill="area", fill_opacity=0.10)
    cv.arc(cx, bot, r, 180, 360, "ink", 1.6, ry=ry)
    cv.arc(cx, bot, r, 0, 180, "ink", 1.2, ry=ry, dash="3 3")
    a = scale * omega
    cv.arrow(cx, cy + a / 2, cx, cy - a / 2, "area", 2.8, head=9)
    pts = [(cx + (r + 6) * math.cos(math.radians(d)), cy + 0.32 * (r + 6) * math.sin(math.radians(d)))
           for d in range(200, 520, 10)]
    cv.curve_arrow(pts, "line", 1.8, head=7)
