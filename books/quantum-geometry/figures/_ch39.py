"""Shared drawing for the chapter 39 figures (not a figure itself).

Four pictures: cells that each point back to themselves (p ≡ *p everywhere, no separate pointer);
the golden readout thread of a non-negative real, level ↦ ⌊φ^level · x⌋ written as a Zeckendorf word;
the golden cut of the lattice Z², where only the points inside the knife's strip are drawn and the
chain they project to reads, short step = 1 and long step = 0, a word with no adjacent 11; and the
orthogonal self-folding of one unit purity budget into cos²θ (the local observer) and sin²θ (the rest).

Colours follow the chapter's lab page and the book: cyan for what stays on the observer's line (the
readout cells, the shadow cos θ, the lit lattice points), magenta for what is spread out across it
(the orthogonal part sin θ, the seam where two readouts part), amber only for the knife the observer
holds now and for a reading head, violet not used; struck-out things in dim.
"""

import math

PHI = (1 + math.sqrt(5)) / 2


def title(p, zh, en, *, size=14):
    """A one-line panel title, centred at the top."""
    p.text(p.width / 2, 22, p.t(zh, en), size=size, weight=600, anchor="middle")


# ---------------------------------------------------------------- p ≡ *p: cells pointing at themselves

def self_loop(cv, cx, top, r=10.0, color="line", width=1.8):
    """A small arrow that leaves the top of a cell at (cx, top) and comes back into it."""
    cy = top - r * 0.55
    pts = [(cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a)))
           for a in range(-35, 216, 10)]
    pts.reverse()  # start on the left, go over the top, come down on the right
    cv.curve_arrow(pts, color, width, head=6.5)


def cell(cv, x, y, w, h, label="*p*", *, size=14, color="ink", loop=True):
    cv.rect(x, y, w, h, color=color, fill="panel", rx=4, width=1.5)
    if label:
        cv.text(x + w / 2, y + h / 2, label, size=size, color=color, anchor="middle", middle=True)
    if loop:
        self_loop(cv, x + w / 2, y)


# ---------------------------------------------------------------- the golden readout thread

def readout(level, x):
    """goldenQuantization: ⌊φ^level · x⌋ for x ≥ 0."""
    return math.floor(PHI ** level * x)


def zeckendorf(n):
    """The Zeckendorf word of n (Fibonacci weights …, 5, 3, 2, 1, most significant first)."""
    if n == 0:
        return "0"
    fib = [1, 2]
    while fib[-1] <= n:
        fib.append(fib[-1] + fib[-2])
    out, rest = [], n
    for f in reversed(fib):
        if f <= rest:
            out.append("1")
            rest -= f
        else:
            out.append("0")
    word = "".join(out).lstrip("0")
    assert "11" not in word
    assert sum(int(c) * f for c, f in zip(reversed(word), fib)) == n
    return word


assert [zeckendorf(n) for n in range(9)] == ["0", "1", "10", "100", "101", "1000", "1001", "1010", "10000"]


def cell_of(level, x):
    """The readout cell [n/φ^level, (n + 1)/φ^level) that holds x."""
    n = readout(level, x)
    s = PHI ** level
    assert n / s <= x < (n + 1) / s
    return n / s, (n + 1) / s


# ---------------------------------------------------------------- the golden cut of Z²

def lit(a, b):
    """The point (b right, a up) lies in the knife's strip: its internal coordinate a − b/φ is in [−φ⁻², φ⁻¹)."""
    w = a - b / PHI
    return -PHI ** -2 - 1e-12 <= w < PHI ** -1 - 1e-12


PAR = (PHI, 1.0)  # the knife E∥ in (b, a)
PERP = (-1 / PHI, 1.0)
assert abs(PAR[0] * PERP[0] + PAR[1] * PERP[1]) < 1e-12


def lit_points(bs, as_):
    pts = [(a, b) for a in as_ for b in bs if lit(a, b)]
    return sorted(pts, key=lambda p: p[1] * PAR[0] + p[0] * PAR[1])


def chain(pts):
    """Steps between successive lit points along the knife: '1' for a short step (b + 1),
    '0' for a long one (a + 1, b + 1); with their projected positions along E∥."""
    n2 = PAR[0] ** 2 + PAR[1] ** 2
    pos = [(b * PAR[0] + a * PAR[1]) / math.sqrt(n2) for a, b in pts]
    word = []
    for (a0, b0), (a1, b1) in zip(pts, pts[1:]):
        step = (a1 - a0, b1 - b0)
        assert step in ((0, 1), (1, 1)), step
        word.append("1" if step == (0, 1) else "0")
    short, long_ = PHI / math.sqrt(n2), (PHI + 1) / math.sqrt(n2)
    for p, q, c in zip(pos, pos[1:], word):
        assert abs((q - p) - (short if c == "1" else long_)) < 1e-9
    assert abs(long_ / short - PHI) < 1e-12
    w = "".join(word)
    assert "11" not in w
    return pos, w


def strip_polygon(bmin, bmax, amin, amax):
    """The knife's strip, clipped to the box [bmin, bmax] × [amin, amax], as (b, a) vertices."""
    n2 = PERP[0] ** 2 + PERP[1] ** 2
    lo, hi = -PHI ** -2, PHI ** -1
    big = 50.0
    poly = []
    for w, ts in ((lo, (-big, big)), (hi, (big, -big))):
        off = (w * PERP[0] / n2, w * PERP[1] / n2)
        poly += [(off[0] + t * PAR[0], off[1] + t * PAR[1]) for t in ts]
    for k, lim, keep in ((0, bmin, 1), (0, bmax, -1), (1, amin, 1), (1, amax, -1)):
        out = []
        for i, p in enumerate(poly):
            q = poly[(i + 1) % len(poly)]
            ip, iq = keep * (p[k] - lim) >= 0, keep * (q[k] - lim) >= 0
            if ip:
                out.append(p)
            if ip != iq:
                t = (lim - p[k]) / (q[k] - p[k])
                out.append((p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])))
        poly = out
    return poly


def golden_cut(cv, x0, y0, step, bs, as_, *, ghosts=False, knife=True):
    """Draw the strip and the lit points of Z² with (b_min, a_min) at the canvas point (x0, y0).
    Returns the canvas map and the lit points."""
    bmin, bmax, amin, amax = min(bs), max(bs), min(as_), max(as_)

    def P(b, a):
        return x0 + step * (b - bmin), y0 - step * (a - amin)

    m = 0.45
    poly = strip_polygon(bmin - m, bmax + m, amin - m, amax + m)
    cv.polygon([P(*p) for p in poly], "cyan", fill_opacity=0.2, color=None)
    if knife:
        # E∥ through the origin, clipped to the box
        tt = min((bmax + m) / PAR[0], (amax + m) / PAR[1])
        t0 = max((bmin - m) / PAR[0], (amin - m) / PAR[1])
        cv.line(*P(t0 * PAR[0], t0 * PAR[1]), *P(tt * PAR[0], tt * PAR[1]), "now", 2.2)
    pts = lit_points(bs, as_)
    if ghosts:
        for a in as_:
            for b in bs:
                if (a, b) not in pts:
                    x, y = P(b, a)
                    cv.circle(x, y, 2.6, color="faint", width=1.0)
    for a, b in pts:
        cv.dot(*P(b, a), 4.2, "line", ring="bg")
    return P, pts


# ---------------------------------------------------------------- the orthogonal self-folding

def folding(cv, ox, oy, R, theta_deg, *, squares=False, size=14):
    """One unit arrow Ψ at angle θ above the observer's line (horizontal); its cyan shadow cos θ on that
    line and the magenta drop sin θ across it. With ``squares``, the squares on the three sides."""
    th = math.radians(theta_deg)
    c, s = math.cos(th), math.sin(th)
    assert abs(c * c + s * s - 1) < 1e-12
    tx, ty = ox + R * c, oy - R * s
    fx, fy = ox + R * c, oy
    if squares:
        # the square on Ψ (the whole budget, area 1), outward to the upper left
        nx, ny = -s, -c  # canvas normal to Ψ pointing up-left
        sq = [(ox, oy), (tx, ty), (tx + R * nx, ty + R * ny), (ox + R * nx, oy + R * ny)]
        cv.polygon(sq, None, color="dim", width=1.3, dash="5 4")
        # the cyan square under the shadow, the magenta square right of the drop
        cv.polygon([(ox, oy), (fx, fy), (fx, fy + R * c), (ox, oy + R * c)], "line", fill_opacity=0.16,
                   color="line", width=1.4)
        cv.polygon([(fx, fy), (tx, ty), (tx + R * s, ty), (fx + R * s, fy)], "area", fill_opacity=0.16,
                   color="area", width=1.4)
        assert abs((R * c) ** 2 + (R * s) ** 2 - R * R) < 1e-6
    else:
        cv.arc(ox, oy, R, 0, 90, "faint", 1.2, dash="3 4")
        cv.line(ox, oy, ox, oy - R - 12, "dim", 1.3)
    cv.line(ox - (0 if squares else 10), oy, ox + R + 22, oy, "dim", 1.3)
    cv.line(tx, ty, fx, fy, "area", 3.2, cap="round")
    cv.line(ox, oy, fx, fy, "line", 4.4, cap="round")
    cv.right_angle(fx, fy, 180, 8)
    cv.arrow(ox, oy, tx, ty, "ink", 2.4, head=10)
    cv.angle(ox, oy, R * 0.26, 0, theta_deg, "θ", size=size)
    cv.dot(ox, oy, 3.2, "ink")
    return (tx, ty), (fx, fy)
