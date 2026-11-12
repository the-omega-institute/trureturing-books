"""Shared drawing for the chapter 34 figures (not a figure itself).

The chapter's one law in four stages: two operations that end in different places can still give an
observer the same reading, and the place where the reading is blind (the kernel) has the observer on
its normal.

- shadow_sphere: on the unit sphere, every point v₂(θ, φ) of a latitude circle casts the same shadow
  cos θ on the polar axis, so an observer on ±e₃ cannot read the azimuth.
- hidden_plane: the equatorial plane e₁∧e₂ carrying the 90° octant holonomy, with its normal ±e₃.
- readout_fibers: the readout x ↦ O·x on the e₁–e₂ plane; its fibers are the lines perpendicular to O,
  and the two images of the equatorial test state s(α) lie on one fiber when O₁ + O₂ = 0.
- single_plane: u₀ = e₁ turned once (u₁ = e₂) and twice (u₂ = −e₁); the observers with O·u₁ = O·u₂
  lie on the anti-bisector O₂ = −O₁, perpendicular to the difference u₂ − u₁.
- simultaneity: a spacetime diagram (x right, t up, c = 1) with the worldline of an observer moving at
  speed v and its line of simultaneity Δt = v·Δx, Minkowski-orthogonal to the worldline.
- golden_slice: the golden cut-and-project scheme of the chapter's proposition, drawn in the lattice
  plane Z² with b to the right and a up; the lattice point (a, b) is a + bφ, its physical coordinate is
  a + bφ (projection on the direction (φ, 1)) and its internal coordinate is a − b/φ (projection on the
  orthogonal direction (−1/φ, 1)); the window is −φ⁻² ≤ a − b/φ ≤ φ⁻¹.

Colours follow the chapter's lab page: amber for the observer and its axis or slice, cyan for readings
(shadows, fibers, accepted points), magenta for what the reading cannot see (the second turn, the
difference, the kernel), violet for the polar axis; filled dots are the once-turned results, hollow
rings the twice-turned ones.
"""

import math

from tbook import figkit

PHI = (1 + math.sqrt(5)) / 2

# ---------------------------------------------------------------- the sphere: one shadow on the pole


def shadow_sphere(cv, cx, cy, r, theta=60.0, phis=(0.0, 90.0, 180.0, 270.0), *, labels=True, size=14):
    """A latitude circle at polar angle θ; its points cast one shadow cos θ on the polar axis."""
    t = cv.t
    sp = cv.sphere(cx, cy, r, az=118, el=22)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.1)                      # equator, for reference
    sp.segment((0, 0, -1), (0, 0, 1), "violet", 1.6)              # the polar axis
    sp.small_circle((0, 0, 1), theta, "magenta", 2.0)             # all azimuths of the second turn
    c = math.cos(math.radians(theta))
    foot = (0.0, 0.0, c)
    pts = [figkit.sph(theta, p) for p in phis]
    for v in pts:
        assert abs(figkit.dot3(v, (0, 0, 1)) - c) < 1e-12        # every point reads cos θ on ±e₃
        sp.segment(v, foot, "line", 1.4, dash="4 3")
    for i, v in enumerate(pts):
        if i == 0:
            sp.dot(v, "ink", 4.2)                                 # v₁: once
        else:
            sp.dot(v, "bg", 4.2, ring="ink")                      # v₂(φ): twice
    sp.dot(foot, "line", 4.6, ring="bg")                          # the one shadow
    sp.arrow((0, 0, 1), "now", 2.6, scale=1.0, start=0.0)
    sp.dot((0, 0, 1), "now", 4.8, ring="bg")
    if labels:
        sp.label((0, 0, 1), "*O*", dx=10, dy=-6, size=size, color="now", weight=600)
        x, y = sp.xy(foot)
        cv.text(x + 8, y + 20, "cos θ", size=13, color="line", halo=True)
    return sp


# ---------------------------------------------------------------- the sphere: the hidden plane


def hidden_plane(cv, cx, cy, r, *, labels=True, size=14):
    """The equatorial disc e₁∧e₂ with the 90° turn inside it, and its normal ±e₃ (the observer)."""
    sp = cv.sphere(cx, cy, r, az=118, el=22)
    sp.outline()
    sp.disc((0, 0, 1), "magenta", fill_opacity=0.16, color="magenta", width=1.4)
    sp.segment((0, 0, -1), (0, 0, 0), "violet", 1.6, dash="4 3")
    e1, e2 = (1.0, 0.0, 0.0), (0.0, 1.0, 0.0)
    # the 90° turn of the flag inside e₁∧e₂ (the octant holonomy exp(−π/4 e₁e₂))
    arc = [figkit.rotate(e1, (0, 0, 1), 90.0 * k / 40) for k in range(41)]
    assert max(abs(a - b) for a, b in zip(arc[-1], e2)) < 1e-12
    sp.curve(arc, "magenta", 2.4, scale=0.62)
    (xa, ya), (xb, yb) = sp.xy(arc[-2], 0.62), sp.xy(arc[-1], 0.62)
    cv.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "magenta", head=8)
    sp.segment((0, 0, 0), e1, "dim", 1.3)
    sp.segment((0, 0, 0), e2, "dim", 1.3)
    sp.dot(e1, "ink", 3.6)
    sp.dot(e2, "ink", 3.6)
    sp.arrow((0, 0, 1), "now", 2.6)
    sp.dot((0, 0, 1), "now", 4.8, ring="bg")
    sp.dot((0, 0, -1), "violet", 3.6)
    if labels:
        sp.label(e1, "*e*₁", dx=-8, dy=14, size=size, color="dim", anchor="end")
        sp.label(e2, "*e*₂", dx=8, dy=4, size=size, color="dim")
        sp.label((0, 0, 1), "*O*", dx=10, dy=-6, size=size, color="now", weight=600)
        x, y = sp.xy(figkit.rotate(e1, (0, 0, 1), 45.0), 0.62)
        cv.text(x + 18, y - 12, "90°", size=13, color="magenta", anchor="middle", halo=True)
    return sp


# ---------------------------------------------------------------- readout fibers on the e₁–e₂ plane


def readout_fibers(cv, ox, oy, R, alpha=60.0, *, size=14):
    """Fibers of x ↦ O·x for O = (−e₁ + e₂)/√2; the images of s(α) under the one- and two-step rotors."""
    t = cv.t
    a = math.radians(alpha)
    O = (-1 / math.sqrt(2), 1 / math.sqrt(2))
    # the e₁, e₂ components of s_once(α) = cos α e₃ + sin α e₂ and s_twice(α) = cos α e₃ − sin α e₁
    once = (0.0, math.sin(a))
    twice = (-math.sin(a), 0.0)
    read = lambda p: p[0] * O[0] + p[1] * O[1]  # noqa: E731
    r = read(once)
    assert abs(r - read(twice)) < 1e-12 and abs(r - math.sin(a) / math.sqrt(2)) < 1e-12
    d = (twice[0] - once[0], twice[1] - once[1])
    assert abs(read(d)) < 1e-12                                     # the difference is in the kernel
    tang = (1 / math.sqrt(2), 1 / math.sqrt(2))                     # the fiber direction (ker O)

    def P(p):
        return ox + R * p[0], oy - R * p[1]

    # axes e₁, e₂ (faint)
    cv.line(*P((-1.25, 0)), *P((1.25, 0)), "faint", 1.1)
    cv.line(*P((0, -1.25)), *P((0, 1.25)), "faint", 1.1)
    cv.text(*P((1.28, 0)), "*e*₁", size=13, color="dim", middle=True)
    x, y = P((0, 1.25))
    cv.text(x + 8, y + 4, "*e*₂", size=13, color="dim")
    # fibers: lines O·x = c
    rho = 1.2                                                       # fibers drawn inside this disc
    for c in (-0.9, -0.6, -0.3, 0.0, 0.3, r, 0.9):
        L = math.sqrt(rho * rho - c * c)
        base = (c * O[0], c * O[1])
        p0 = (base[0] - L * tang[0], base[1] - L * tang[1])
        p1 = (base[0] + L * tang[0], base[1] + L * tang[1])
        if abs(c - r) < 1e-12:
            cv.line(*P(p0), *P(p1), "line", 2.0)
        else:
            cv.line(*P(p0), *P(p1), "line", 1.1, dash="4 4", opacity=0.55)
    # the observer axis and its scale
    cv.line(*P((-1.2 * O[0], -1.2 * O[1])), *P((0.0, 0.0)), "now", 1.4, dash="3 3")
    cv.arrow(*P((0.0, 0.0)), *P((1.25 * O[0], 1.25 * O[1])), "now", 2.4)
    x, y = P((1.25 * O[0], 1.25 * O[1]))
    cv.text(x - 6, y - 8, "*O*", size=size + 1, color="now", weight=600, anchor="end")
    foot = (r * O[0], r * O[1])
    cv.dot(*P(foot), 4.4, "line", ring="bg")
    x, y = P(foot)
    cv.text(x - 12, y + 4, f"{r:.2f}".rstrip("0"), size=13, color="line", anchor="end", halo=True)
    # the two images and their difference
    cv.line(*P(once), *P(twice), "magenta", 2.6, cap="round")
    cv.dot(*P(once), 5.0, "ink", ring="bg")
    cv.dot(*P(twice), 5.0, "bg", ring="ink")
    x, y = P(once)
    cv.text(x - 10, y - 8, "*s*_{once}", size=size, color="ink", anchor="end", halo=True)
    x, y = P(twice)
    cv.text(x - 10, y + 20, "*s*_{twice}", size=size, color="ink", anchor="end", halo=True)
    return P, r, tang


# ---------------------------------------------------------------- the single plane


def single_plane(cv, ox, oy, R, *, size=14):
    """u₀ = e₁, u₁ = e₂ (once), u₂ = −e₁ (twice); observers with O·u₁ = O·u₂ on the anti-bisector."""
    u0, u1, u2 = (1.0, 0.0), (0.0, 1.0), (-1.0, 0.0)
    O = (1 / math.sqrt(2), -1 / math.sqrt(2))
    d = (u2[0] - u1[0], u2[1] - u1[1])
    assert abs(O[0] * d[0] + O[1] * d[1]) < 1e-12                  # O ⟂ (u₂ − u₁)
    s1 = O[0] * u1[0] + O[1] * u1[1]
    s2 = O[0] * u2[0] + O[1] * u2[1]
    assert abs(s1 - s2) < 1e-12 and abs(s1 + 1 / math.sqrt(2)) < 1e-12

    def P(p, s=1.0):
        return ox + R * s * p[0], oy - R * s * p[1]

    cv.circle(ox, oy, R, color="faint", width=1.2)
    cv.arc(ox, oy, R * 0.32, 0, 90, "dim", 1.4)
    cv.arrow_head(*P((math.cos(math.radians(88)), math.sin(math.radians(88))), 0.32), 178, "dim", head=7)
    cv.arc(ox, oy, R * 0.32, 90, 180, "magenta", 2.0)
    cv.arrow_head(*P((math.cos(math.radians(178)), math.sin(math.radians(178))), 0.32), 268, "magenta", head=7)
    # the blind observers: the anti-bisector through the origin
    cv.line(*P((-1.12 * O[0], -1.12 * O[1])), *P((1.12 * O[0], 1.12 * O[1])), "now", 2.0, dash="6 4")
    foot = (s1 * O[0], s1 * O[1])            # common foot of u₁ and u₂: the chord meets O there
    assert abs((u1[0] + u2[0]) / 2 - foot[0]) < 1e-12 and abs((u1[1] + u2[1]) / 2 - foot[1]) < 1e-12
    cv.line(*P(u1), *P(u2), "magenta", 2.2, cap="round")
    cv.dot(*P(foot), 4.6, "line", ring="bg")
    cv.dot(*P(u0), 3.8, "dim")
    cv.dot(*P(u1), 4.8, "ink", ring="bg")
    cv.dot(*P(u2), 4.8, "bg", ring="ink")
    x, y = P(u0)
    cv.text(x + 8, y + 4, "*u*₀", size=size, color="dim")
    x, y = P(u1)
    cv.text(x + 8, y - 6, "*u*₁", size=size)
    x, y = P(u2)
    cv.text(x - 8, y - 8, "*u*₂", size=size, anchor="end")
    x, y = P((1.12 * O[0], 1.12 * O[1]))
    cv.text(x + 4, y + 16, "*O*", size=size, color="now", weight=600)
    return P


# ---------------------------------------------------------------- simultaneity in spacetime


def simultaneity(cv, ox, oy, R, v=0.5, *, size=14):
    """Light cone, the worldline of an observer at speed v, and its line of simultaneity t = v·x."""
    u = (v, 1.0)                    # (x, t) along the worldline
    s = (1.0, v)                    # (x, t) along the simultaneity line
    assert abs(u[1] * s[1] - u[0] * s[0]) < 1e-12                   # η(u, s) = 0 with signature (+, −)

    def P(p):
        return ox + R * p[0], oy - R * p[1]

    cv.line(*P((-1.15, 0)), *P((1.15, 0)), "faint", 1.1)
    cv.line(*P((0, -1.0)), *P((0, 1.15)), "faint", 1.1)
    cv.text(*P((1.17, 0)), "*x*", size=13, color="dim", middle=True)
    x, y = P((0, 1.15))
    cv.text(x + 8, y + 4, "*t*", size=13, color="dim")
    for sgn in (1, -1):              # the light cone x = ±t
        cv.line(*P((-0.95 * sgn, -0.95)), *P((1.0 * sgn, 1.0)), "dim", 1.2, dash="5 4")
    k = 1.0 / math.hypot(*u)
    cv.line(*P((-0.9 * u[0] * k, -0.9 * u[1] * k)), *P((0, 0)), "now", 1.4, dash="3 3")
    cv.arrow(*P((0, 0)), *P((1.1 * u[0] * k, 1.1 * u[1] * k)), "now", 2.4)
    m = 1.08 / math.hypot(*s)
    cv.line(*P((-m * s[0], -m * s[1])), *P((m * s[0], m * s[1])), "magenta", 2.2)
    for f in (-0.62, 0.62):
        cv.dot(*P((f * s[0], f * s[1])), 4.6, "ink", ring="bg")
    x, y = P((1.1 * u[0] * k, 1.1 * u[1] * k))
    cv.text(x + 8, y + 4, "*u*", size=size, color="now", weight=600)
    return P


# ---------------------------------------------------------------- the golden cut-and-project slice


def golden_in_window(a, b):
    """The internal coordinate a − b/φ of the lattice point a + bφ lies in [−φ⁻², φ⁻¹]."""
    w = a - b / PHI
    return -PHI ** -2 - 1e-12 <= w <= PHI ** -1 + 1e-12


def golden_slice(cv, x0, y0, step, bs=range(-1, 7), as_=range(-1, 5), *, labels=True, size=14):
    """Lattice Z² (b right, a up) from the corner (x0, y0) = (b_min, a_min); the slice and its window."""
    bmin, bmax = min(bs), max(bs)
    amin, amax = min(as_), max(as_)

    def P(b, a):
        return x0 + step * (b - bmin), y0 - step * (a - amin)

    par = (PHI, 1.0)                                    # E∥ direction in (b, a)
    perp = (-1 / PHI, 1.0)                              # E⊥ direction in (b, a)
    assert abs(par[0] * perp[0] + par[1] * perp[1]) < 1e-12
    np2 = perp[0] ** 2 + perp[1] ** 2
    # known accepted points (asserted against the window)
    for a, b in ((0, 0), (1, 1), (1, 2), (2, 3), (3, 5)):
        assert golden_in_window(a, b)
    for a, b in ((1, 0), (0, 1), (2, 2)):
        assert not golden_in_window(a, b)
    # the window strip: offsets w·perp/|perp|² for w = −φ⁻² and φ⁻¹, clipped to the lattice box
    lo, hi = -PHI ** -2, PHI ** -1
    tmin, tmax = (bmin - 0.4) / par[0], (bmax + 0.4) / par[0]

    def edge(w):
        off = (w * perp[0] / np2, w * perp[1] / np2)
        return [(off[0] + tt * par[0], off[1] + tt * par[1]) for tt in (tmin, tmax)]

    lo_e, hi_e = edge(lo), edge(hi)
    poly = [lo_e[0], lo_e[1], hi_e[1], hi_e[0]]
    clipped = _clip_box(poly, bmin - 0.45, bmax + 0.45, amin - 0.45, amax + 0.45)
    cv.polygon([P(*p) for p in clipped], "cyan", fill_opacity=0.14, color=None)
    # E⊥ (the kernel of the physical projection) and E∥ (the slice)
    ka, kb = _line_in_box(perp, bmin - 0.45, bmax + 0.45, amin - 0.45, amax + 0.45)
    cv.line(*P(*ka), *P(*kb), "magenta", 1.6, dash="6 4")
    ea, eb = _line_in_box(par, bmin - 0.45, bmax + 0.45, amin - 0.45, amax + 0.45)
    cv.line(*P(*ea), *P(*eb), "now", 2.4)
    # lattice points; accepted ones projected onto E∥ along E⊥
    acc = []
    for a in as_:
        for b in bs:
            if golden_in_window(a, b):
                acc.append((a, b))
    for a, b in acc:
        tt = (b * par[0] + a * par[1]) / (par[0] ** 2 + par[1] ** 2)
        fb, fa = tt * par[0], tt * par[1]
        if bmin - 0.45 <= fb <= bmax + 0.45 and amin - 0.45 <= fa <= amax + 0.45:
            cv.line(*P(b, a), *P(fb, fa), "magenta", 1.2)
            cv.dot(*P(fb, fa), 2.8, "now")
    for a in as_:
        for b in bs:
            if (a, b) in acc:
                cv.dot(*P(b, a), 4.0, "line", ring="bg")
            else:
                cv.dot(*P(b, a), 2.4, "dim")
    return P, ea, eb, (ka, kb), acc


def _line_in_box(d, x0, x1, y0, y1):
    """The segment of the line through the origin with direction d inside the box."""
    ts = []
    for lim, k in ((x0, 0), (x1, 0), (y0, 1), (y1, 1)):
        if abs(d[k]) > 1e-12:
            tt = lim / d[k]
            p = (tt * d[0], tt * d[1])
            if x0 - 1e-9 <= p[0] <= x1 + 1e-9 and y0 - 1e-9 <= p[1] <= y1 + 1e-9:
                ts.append(tt)
    t0, t1 = min(ts), max(ts)
    return (t0 * d[0], t0 * d[1]), (t1 * d[0], t1 * d[1])


def _clip_box(poly, x0, x1, y0, y1):
    """Sutherland–Hodgman clipping of a convex polygon to an axis-aligned box."""
    def clip(pts, inside, inter):
        out = []
        for i, p in enumerate(pts):
            q = pts[i - 1]
            if inside(p):
                if not inside(q):
                    out.append(inter(q, p))
                out.append(p)
            elif inside(q):
                out.append(inter(q, p))
        return out

    def ix(xc):
        return lambda q, p: (xc, q[1] + (p[1] - q[1]) * (xc - q[0]) / (p[0] - q[0]))

    def iy(yc):
        return lambda q, p: (q[0] + (p[0] - q[0]) * (yc - q[1]) / (p[1] - q[1]), yc)

    pts = poly
    pts = clip(pts, lambda p: p[0] >= x0, ix(x0))
    pts = clip(pts, lambda p: p[0] <= x1, ix(x1))
    pts = clip(pts, lambda p: p[1] >= y0, iy(y0))
    pts = clip(pts, lambda p: p[1] <= y1, iy(y1))
    return pts
