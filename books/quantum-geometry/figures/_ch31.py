"""Shared drawing for the chapter 31 figures (not a figure itself).

Three pictures: the eye-level ruler (two unit vectors ψ, φ measure each other; each one's cyan
shadow on the other has the same length cos θ, and no outside point C is needed); the inner-product
lock of the cloning machine (x = x² meets the diagonal only at 0 and 1); and the fixed step of
coherent amplification (the state sits at angle (2n + 1)θ from the failure axis B, one 2θ turn per
step). A fourth helper draws a golden-angle orbit on a circle with a window holding 2 − φ of it.

Colours follow the chapter's lab page: ink for the states, cyan for shadows and inner products,
violet for rotations, amber only for the current step; struck-out things in dim.
"""

import math

# ---------------------------------------------------------------- the eye-level ruler


def ruler(cv, ox, oy, R, theta_deg=60.0, *, labels=True, size=14):
    """ψ and φ from the origin (ox, oy), symmetric about the vertical, θ apart; their mutual shadows."""
    t = cv.t
    h = theta_deg / 2
    aphi, apsi = math.radians(90 + h), math.radians(90 - h)
    phi = (math.cos(aphi), math.sin(aphi))
    psi = (math.cos(apsi), math.sin(apsi))
    c = phi[0] * psi[0] + phi[1] * psi[1]
    assert abs(c - math.cos(math.radians(theta_deg))) < 1e-12

    def P(v, s=1.0):
        return ox + R * s * v[0], oy - R * s * v[1]

    # the struck-out outside judge C, above both tips
    cx, cy = ox, oy - R * 1.32
    for v in (phi, psi):
        x, y = P(v)
        cv.line(cx, cy, x, y, "faint", 1.2, dash="3 4")
    cv.dot(cx, cy, 4.2, "dim")
    cv.cross(cx, cy, 11, "dim", 2.2)
    cv.text(cx + 18, cy + 5, "*C*", size=size + 1, color="dim")

    # the two shadows: φ onto ψ and ψ onto φ, both of length cos θ
    feet = []
    for src, dst in ((phi, psi), (psi, phi)):
        fx, fy = P(dst, c)
        tx, ty = P(src)
        # the drop is perpendicular to dst
        assert abs((tx - fx) * dst[0] - (ty - fy) * dst[1]) < 1e-9
        cv.line(tx, ty, fx, fy, "line", 1.2, dash="3 3")
        feet.append((fx, fy))
    for fx, fy in feet:
        cv.line(ox, oy, fx, fy, "line", 5.0, cap="round", opacity=0.85)
        cv.dot(fx, fy, 3.4, "line", ring="bg")
    d0 = math.hypot(feet[0][0] - ox, feet[0][1] - oy)
    d1 = math.hypot(feet[1][0] - ox, feet[1][1] - oy)
    assert abs(d0 - d1) < 1e-9 and abs(d0 - R * c) < 1e-9

    for v in (phi, psi):
        x, y = P(v)
        cv.arrow(ox, oy, x, y, "ink", 2.2, head=10)
    cv.angle(ox, oy, R * 0.2, 90 - h, 90 + h, "θ", size=size)
    cv.dot(ox, oy, 3.2, "ink")
    px, py = P(phi)
    qx, qy = P(psi)
    cv.text(px - 8, py - 2, "φ", size=size + 2, weight=600, anchor="end")
    cv.text(qx + 8, qy - 2, "ψ", size=size + 2, weight=600)
    if labels:
        for (fx, fy), sgn in zip(feet, (1, -1)):
            cv.text(fx + sgn * 12, fy + 14, "cos θ", size=size, color="line",
                    anchor="start" if sgn > 0 else "end", halo=True)
    return feet


# ---------------------------------------------------------------- the inner-product lock

def lock_roots():
    """Roots of x = x², from the quadratic x² − x = 0."""
    a, b, c = 1.0, -1.0, 0.0
    d = math.sqrt(b * b - 4 * a * c)
    return sorted(((-b - d) / (2 * a), (-b + d) / (2 * a)))


ROOTS = lock_roots()
assert ROOTS == [0.0, 1.0]
assert all(abs(x - x * x) > 1e-3 for x in [i / 100 for i in range(1, 100)])  # nothing strictly between


def lock(cv, x, y, w, h, *, size=14, labels=True):
    t = cv.t
    ax = cv.axes(x, y, w, h, (-0.35, 1.35), (-0.3, 1.6))
    ax.grid(xs=[1], ys=[1])
    cv.arrow(ax.X(-0.35), ax.Y(0), ax.X(1.35) + 6, ax.Y(0), "dim", 1.3, head=7)
    cv.arrow(ax.X(0), ax.Y(-0.3), ax.X(0), ax.Y(1.6) - 6, "dim", 1.3, head=7)
    ax.plot(lambda v: v, color="ink", width=1.8)
    ax.plot(lambda v: v * v, -0.22, 1.24, color="line", width=2.6)
    # the stretch strictly between the roots: the two sides never meet there
    cv.line(ax.X(0.08), ax.Y(0) + 12, ax.X(0.92), ax.Y(0) + 12, "dim", 1.3, dash="4 3")
    ax.points([(r, r) for r in ROOTS], "ink", r=5.6, ring="bg")
    if labels:
        ax.text(0.5, 0.5, "*y* = *x*", dx=-10, dy=-8, size=size, color="ink", anchor="end", halo=True)
        ax.text(0.62, 0.62 ** 2, "*y* = *x*²", dx=10, dy=14, size=size, color="line", halo=True)
        ax.text(0, 0, "φ ⊥ ψ", dx=-10, dy=-16, size=size, anchor="end", halo=True)
        ax.text(1, 1, "φ = ψ", dx=-10, dy=-8, size=size, anchor="end")
        ax.text(0.5, 0, t("此处无解", "no solution here"), dy=32, size=size - 1, color="dim", anchor="middle")
        ax.text(1.35, 0, "⟨φ, ψ⟩", dx=-2, dy=-10, size=size - 1, color="dim", anchor="end")
    return ax


# ---------------------------------------------------------------- the fixed rotation step

THETA = math.pi / 14  # p = sin²θ; after 3 steps (2·3 + 1)θ = π/2 exactly
P_OVERLAP = math.sin(THETA) ** 2
assert abs(math.sin(7 * THETA) - 1) < 1e-12 and abs(P_OVERLAP - 0.0495) < 1e-4


def rotation(cv, ox, oy, R, *, steps=3, size=14, labels=True):
    t = cv.t
    cv.arc(ox, oy, R, 0, 90, "faint", 1.2, dash="3 4")
    cv.arrow(ox, oy, ox + R + 26, oy, "dim", 1.4, head=8)
    cv.arrow(ox, oy, ox, oy - R - 26, "dim", 1.4, head=8)
    tips = []
    for n in range(steps + 1):
        a = (2 * n + 1) * THETA
        tips.append((ox + R * math.cos(a), oy - R * math.sin(a), a))
    # one violet 2θ arc per step, just outside the circle
    for n in range(steps):
        a0, a1 = math.degrees(tips[n][2]), math.degrees(tips[n + 1][2])
        pts = [(ox + (R + 14) * math.cos(math.radians(a0 + (a1 - a0) * k / 24)),
                oy - (R + 14) * math.sin(math.radians(a0 + (a1 - a0) * k / 24))) for k in range(25)]
        cv.curve_arrow(pts[1:-1], "violet", 2.0, head=7)
    for n, (tx, ty, a) in enumerate(tips):
        last = n == steps
        cv.arrow(ox, oy, tx, ty, "now" if last else "ink", 2.6 if last else 1.8, head=10 if last else 8,
                 opacity=None if last else 0.55 + 0.15 * n)
    cv.angle(ox, oy, R * 0.32, 0, math.degrees(THETA), "θ", size=size, label_r=R * 0.32 + 14)
    cv.dot(ox, oy, 3.2, "ink")
    if labels:
        for n, (tx, ty, a) in enumerate(tips[:-1]):
            b, rr = a - math.radians(5.5), R - 30
            cv.text(ox + rr * math.cos(b), oy - rr * math.sin(b), f"*n* = {n}", size=size - 1, color="dim",
                    anchor="middle", middle=True, halo=True)
        mid = (tips[1][2] + tips[2][2]) / 2
        cv.text(ox + (R + 26) * math.cos(mid), oy - (R + 26) * math.sin(mid), "2θ", size=size, color="violet",
                anchor="start", middle=True)
    return tips


# ---------------------------------------------------------------- golden-angle orbit on a circle

GOLD = (3 - math.sqrt(5)) / 2  # 2 − φ ≈ 0.382: the golden angle as a fraction of a turn


def orbit(n_pts, start=0.0):
    return [(start + k * GOLD) % 1.0 for k in range(1, n_pts + 1)]


def window_hits(pts, w=GOLD):
    return sum(1 for x in pts if x < w)


for _n in (8, 13, 21, 34, 55, 89):
    assert abs(window_hits(orbit(_n)) - _n * GOLD) < 1  # bounded remainder (Hecke–Kesten)


def ergodic(cv, cx, cy, R, n_pts=21, start=0.0):
    """A circle, a cyan window of 2 − φ of a turn, and the orbit points k·(golden angle)."""
    cv.circle(cx, cy, R, color="faint", width=1.3)
    w0, w1 = 90.0, 90.0 + 360 * GOLD
    cv.arc(cx, cy, R, w0, w1, "line", 7.0, cap="round", opacity=0.55)
    pts = orbit(n_pts, start)
    r = R - 16
    for x in pts:
        a = math.radians(90 + 360 * x)
        inside = x < GOLD
        cv.dot(cx + r * math.cos(a), cy - r * math.sin(a), 4.4 if inside else 3.4,
               "line" if inside else "dim", ring="bg")
    return window_hits(pts), len(pts)
