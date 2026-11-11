"""Shared drawing for the chapter 25 figures (not a figure itself).

The Weyl pair acts on the real plane of state vectors (ψ₀ across, ψ₁ up): qubitX swaps the two coordinates
(the mirror along the diagonal), qubitZ negates ψ₁ (the mirror along the ψ₀ axis). A reflection is drawn as
the chord that jumps straight across its mirror. Blades are 3-bit masks, bit i standing for e_{i+1}; the sign
of a product counts inversions exactly as the chapter's _blade_sign.
"""

import math

X = ((0, 1), (1, 0))
Z = ((1, 0), (0, -1))


def apply(m, v):
    return (m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1])


def matmul(a, b):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)) for i in range(2))


def blade_sign(left, right):
    """The chapter's _blade_sign, line for line."""
    inversions = 0
    for i in range(3):
        if (left >> i) & 1:
            inversions += bin(right & ((1 << i) - 1)).count("1")
    return -1 if inversions % 2 else 1


NAMES = {0: "1", 1: "*e*_{1}", 2: "*e*_{2}", 3: "*e*_{12}", 4: "*e*_{3}", 5: "*e*_{13}", 6: "*e*_{23}", 7: "*I*_{3}"}


def title(p, zh, en, y=22):
    p.text(p.width / 2, y, p.t(zh, en), size=14, weight=600, anchor="middle")


def unit_deg(a):
    return (math.cos(math.radians(a)), math.sin(math.radians(a)))


def mirrors(cv, pt, *, labels=True, ext=1.18):
    """The two mirrors (cyan dashed): the ψ₀ axis for Z, the diagonal for X."""
    d = math.sqrt(0.5)
    cv.line(*pt((-ext, 0)), *pt((ext, 0)), "line", 1.6, dash="6 4")
    cv.line(*pt((-d * ext, -d * ext)), *pt((d * ext, d * ext)), "line", 1.6, dash="6 4")
    if labels:
        x, y = pt((-ext, 0))
        cv.text(x, y - 8, cv.t("*Z* 的镜子", "mirror of *Z*"), size=13, color="line", halo=True)
        x, y = pt((-d * ext, -d * ext))
        cv.text(x + 12, y + 4, cv.t("*X* 的镜子", "mirror of *X*"), size=13, color="line", halo=True)


def weyl_plane(cv, cx, cy, R, u_deg=25.0, *, labels=True):
    """The state u and its two images: X then Z (dashed jumps) and Z then X (solid jumps)."""
    pt = lambda v: (cx + R * v[0], cy - R * v[1])
    u = unit_deg(u_deg)
    xu, zu = apply(X, u), apply(Z, u)
    zx, xz = apply(Z, xu), apply(X, zu)
    assert matmul(Z, X) == tuple(tuple(-c for c in row) for row in matmul(X, Z))      # ZX = −XZ
    assert zx == apply(matmul(Z, X), u) and xz == apply(matmul(X, Z), u)
    assert abs(zx[0] + xz[0]) < 1e-12 and abs(zx[1] + xz[1]) < 1e-12                # opposite ends

    cv.circle(cx, cy, R, color="faint", width=1.2)
    mirrors(cv, pt, labels=labels)
    for a, b, dash in ((u, xu, "4 3"), (xu, zx, "4 3"), (u, zu, None), (zu, xz, None)):
        (x1, y1), (x2, y2) = pt(a), pt(b)
        L = math.hypot(x2 - x1, y2 - y1)
        k = 7 / L
        cv.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, "dim", 1.4,
                 head=7, dash=dash)
    for v in (xu, zu):
        cv.dot(*pt(v), 3.4, "dim", ring="bg")
    cv.arrow(cx, cy, *pt(zx), "ink", 2.6)
    cv.arrow(cx, cy, *pt(xz), "ink", 2.6)
    cv.arrow(cx, cy, *pt(u), "now", 2.6)
    cv.dot(cx, cy, 3.0, "ink")
    return pt, u, xu, zu, zx, xz
