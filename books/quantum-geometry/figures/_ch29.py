"""Shared drawing for the chapter 29 figures (not a figure itself).

Three pictures recur: the four tiers of numbers, each broken open by the next operation; the mod 4
dial on which a sum of two squares never lands in cell 3; and the Gram window, the slice of the
Gram elliptope at a fixed c_AB, whose rim is the two cosine-addition tracks.

Colours follow the chapter's lab pages: cyan is what a tier (or the list of sums of two squares)
already holds, magenta is what escapes it; violet is the volume of three vectors (det G > 0 inside
the window); amber is kept for the window at the current θ₂.
"""

import math

S = math.sqrt(2) - 1  # the silver slope


def dottie(x=1.0):
    for _ in range(200):
        x = math.cos(x)
    return x


THETA_STAR = dottie()
assert abs(THETA_STAR - 0.7390851332) < 1e-9 and abs(math.cos(THETA_STAR) - THETA_STAR) < 1e-12


# ---------------------------------------------------------------- the four tiers

def tier_icon(cv, k, cx, cy, s=1.0, fs=13):
    """The picture of tier ``k`` (0…3) in a box about 100·s × 70·s centred at (cx, cy); ``fs`` is the
    size of its smallest labels.
    Cyan: what the tier is built from; magenta: the constant that escaped the tier below."""
    w, h = 100 * s, 70 * s
    if k == 0:  # rationals m/n with n ≤ 4 on [0, 2]
        y = cy + 6 * s
        x0, x1 = cx - w / 2, cx + w / 2
        cv.line(x0, y, x1, y, "dim", 1.3)
        fr = sorted({m / n for n in range(1, 5) for m in range(0, 2 * n + 1)})
        assert len(fr) == 13  # 0, 1/4, 1/3, 1/2, 2/3, 3/4, 1, 5/4, 4/3, 3/2, 5/3, 7/4, 2
        for v in fr:
            cv.dot(x0 + v / 2 * w, y, 2.6 * max(s, 0.8), "line")
        for v, lab in ((0, "0"), (1, "1"), (2, "2")):
            cv.text(x0 + v / 2 * w, y + 18 * s + 4, lab, size=fs, color="dim", anchor="middle")
        cv.text(cx, y - 16 * s, "*m*/*n*", size=fs + 1, color="line", anchor="middle")
    elif k == 1:  # the unit square and its diagonal √2
        a = 46 * s
        x0, y0 = cx - a / 2, cy + a / 2
        cv.polygon([(x0, y0), (x0 + a, y0), (x0 + a, y0 - a), (x0, y0 - a)], "line", color="line", width=1.6,
                   fill_opacity=0.10)
        cv.line(x0, y0, x0 + a, y0 - a, "area", 2.6, cap="round")
        cv.text(x0 + a + 8, y0 - a - 2, "√2", size=fs + 1, color="area", weight=600)
        cv.text(x0 + a / 2, y0 + 16, "1", size=fs, color="dim", anchor="middle")
        cv.text(x0 - 6, y0 - a / 2, "1", size=fs, color="dim", anchor="end", middle=True)
    elif k == 2:  # a regular octagon inside its circle
        r = 31 * s
        cv.circle(cx, cy, r, color="area", width=2.2)
        pts = [(cx + r * math.cos(2 * math.pi * j / 8), cy - r * math.sin(2 * math.pi * j / 8)) for j in range(8)]
        cv.polygon(pts, "line", color="line", width=1.3, fill_opacity=0.10)
        cv.text(cx, cy, "π", size=fs + 2, color="area", anchor="middle", middle=True, weight=600)
    else:  # y = cos θ meets y = θ at θ*
        ax = cv.axes(cx - w / 2 + 6, cy - h / 2 + 4, w - 12, h - 10, (0, 1.4), (0, 1.15))
        ax.plot(math.cos, 0, 1.4, color="line", width=2.0)
        ax.plot(lambda t: t, 0, 1.15, color="dim", width=1.3, dash="4 3")
        ax.cv.line(ax.X(0), ax.Y(0), ax.X(1.4), ax.Y(0), "faint", 1.2)
        ax.points([(THETA_STAR, THETA_STAR)], "area", r=4.6, ring="bg")
        ax.text(THETA_STAR, THETA_STAR, "θ*", dx=0, dy=22, size=fs + 1, color="area", weight=600, anchor="middle",
                halo=True)
        ax.text(0, 1, "cos θ", dx=0, dy=-8, size=fs, color="line")


TIERS = [
    ("第 1 层", "Tier 1", "ℤ、ℚ", "ℤ, ℚ"),
    ("第 2 层", "Tier 2", "√2、φ", "√2, φ"),
    ("第 3 层", "Tier 3", "π、e", "π, e"),
    ("第 4 层", "Tier 4", "θ* ≈ 0.739", "θ* ≈ 0.739"),
]


def stairs(cv, x0, col_w, base, top0, rise, *, icons=True, gap=6, fs=13, icon_s=1.2, icon_dy=58):
    """Four steps rising to the right; step k has its top at ``top0 - k·rise``. Returns the step tops.
    ``fs`` is the size of the smallest labels; the icons are drawn at scale ``icon_s``, ``icon_dy`` above the step."""
    tops = []
    for k, (zh, en, czh, cen) in enumerate(TIERS):
        top = top0 - k * rise
        tops.append(top)
        x = x0 + k * col_w
        cv.rect(x + gap / 2, top, col_w - gap, base - top, color="edge", fill="panel", width=1.2, rx=3)
        cx = x + col_w / 2
        cv.text(cx, top + fs + 7, cv.t(zh, en), size=fs, color="dim", anchor="middle")
        cv.text(cx, top + 2 * fs + 14, cv.t(czh, cen), size=fs + 1, color="line" if k == 0 else "area", anchor="middle",
                weight=600)
        if icons:
            tier_icon(cv, k, cx, top - icon_dy, icon_s, fs)
    return tops


# ---------------------------------------------------------------- the mod 4 dial

# cell c sits at the clock position: 0 at the top, then clockwise 1, 2, 3
CELL_ANGLE = {0: 90, 1: 0, 2: -90, 3: 180}  # centre angle of each cell, degrees counter-clockwise


def squares_mod4(limit=200):
    return {n * n % 4 for n in range(limit)}


def sums_mod4(limit=60):
    return {(a * a + b * b) % 4 for a in range(limit) for b in range(limit)}


assert squares_mod4() == {0, 1} and sums_mod4() == {0, 1, 2}


def dial(cv, cx, cy, r, *, sums=True, digit=22):
    """The four-cell dial: cells 0, 1, 2 (where a² + b² lands) cyan; cell 3 empty, dashed magenta."""
    for c in range(4):
        a = CELL_ANGLE[c]
        if c < 3:
            cv.arc(cx, cy, r, a - 45, a + 45, "line", 1.6, fill="line", fill_opacity=0.16)
        else:
            cv.arc(cx, cy, r, a - 45, a + 45, "area", 2.0, fill="area", fill_opacity=0.04, dash="5 4")
    for a in (45, 135, 225, 315):
        cv.line(cx, cy, cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a)), "dim", 1.3)
    cv.circle(cx, cy, r, color="dim", width=1.4)
    labels = {0: "0 + 0", 1: "0 + 1", 2: "1 + 1"}
    for c in range(4):
        a = math.radians(CELL_ANGLE[c])
        rr = r * (0.56 if sums else 0.58)
        px, py = cx + rr * math.cos(a), cy - rr * math.sin(a)
        dy = -9 if sums else 0
        cv.text(px, py + dy, str(c), size=digit, color="area" if c == 3 else "ink", anchor="middle", middle=True,
                weight=700)
        if sums:
            cv.text(px, py + 14, labels.get(c, cv.t("空", "empty")), size=13,
                    color="area" if c == 3 else "dim", anchor="middle", middle=True)


def odd_primes(lo, hi):
    return [p for p in range(lo, hi) if p > 2 and all(p % d for d in range(2, int(p ** 0.5) + 1))]


def two_squares(n):
    return any(math.isqrt(n - a * a) ** 2 == n - a * a for a in range(math.isqrt(n) + 1))


FACE = [p for p in odd_primes(3, 40) if p % 4 == 1][:5]
LINE = [p for p in odd_primes(3, 40) if p % 4 == 3][:5]
assert FACE == [5, 13, 17, 29, 37] and LINE == [3, 7, 11, 19, 23]
assert all(two_squares(p) for p in FACE) and not any(two_squares(p) for p in LINE)


# ---------------------------------------------------------------- the Gram window

def det_g(x, y, z):
    return 1 - x * x - y * y - z * z + 2 * x * y * z


def gram_window(cv, x, y, w, h, *, theta1=60.0, theta2=45.0, labels=True, ticks=True):
    """The slice c_AB = cos θ₁ of the Gram elliptope in the (c_BC, c_AC) plane: violet inside
    (det G > 0), ink rim (det G = 0, the two cosine-addition tracks), amber window at θ₂."""
    t1 = math.radians(theta1)
    cab = math.cos(t1)
    ax = cv.axes(x, y, w, h, (-1, 1), (-1, 1))
    rim = [(math.cos(t), math.cos(t1 - t)) for t in [2 * math.pi * i / 240 for i in range(241)]]
    for u, v in rim:
        assert abs(det_g(cab, u, v)) < 1e-12
    assert det_g(cab, 0.0, cab * 0.0) > 0
    ax.grid([-1, 0, 1], [-1, 0, 1], "faint", 1.0, dash="2 4")
    ax.cv.polygon([ax.pt(u, v) for u, v in rim], "violet", fill_opacity=0.16)
    # the two tracks: θ₂ from 0 to 180°, upper cos(θ₁ − θ₂), lower cos(θ₁ + θ₂)
    up = [(math.cos(t), math.cos(t1 - t)) for t in [math.pi * i / 120 for i in range(121)]]
    lo = [(math.cos(t), math.cos(t1 + t)) for t in [math.pi * i / 120 for i in range(121)]]
    ax.path(up, "ink", 2.2)
    ax.path(lo, "ink", 2.2)
    for u, v in ((1, cab), (-1, -cab)):  # where the two tracks meet (θ₂ = 0 and θ₂ = 180°)
        ax.points([(u, v)], "ink", r=3.4, ring="bg")
    if ticks:
        ax.xaxis(at=-1, ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=13)
        ax.yaxis(at=-1, ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=13)
    # the window at θ₂
    t2 = math.radians(theta2)
    cbc = math.cos(t2)
    hi, low = math.cos(t1 - t2), math.cos(t1 + t2)
    assert abs(hi - (cab * cbc + math.sqrt((1 - cab ** 2) * (1 - cbc ** 2)))) < 1e-12
    assert abs(low - (cab * cbc - math.sqrt((1 - cab ** 2) * (1 - cbc ** 2)))) < 1e-12
    xa, ya = ax.pt(cbc, hi)
    xb, yb = ax.pt(cbc, low)
    cv.line(xa, ya, xb, yb, "now", 3.2, cap="round")
    cv.dot(xa, ya, 4.6, "now", ring="bg")
    cv.dot(xb, yb, 4.6, "now", ring="bg")
    return ax, (xa, ya), (xb, yb)
