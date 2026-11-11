"""第二十八章地图：秩一权重是影子的平方；未读态是条件态按权重的混合，每个条件态的迹被放大回 1；不动点就是交叉块为零的矩阵。
Chapter 28 at a glance: a rank-one weight is the square of a shadow; the unread state mixes the
conditional states by their weights, each conditional state rescaled to trace 1; the fixed points are
exactly the matrices without cross blocks.

All numbers come from the chapter's worked example ψ = (3/5, 4i/5) measured in the Z basis:
w₀ = |⟨φ₀|ψ⟩|² = 9/25, w₁ = 16/25 (asserted). Panel I draws |⟨φ|ψ⟩| as the shadow of a unit arrow at
angle θ with cos θ = 3/5 on the line of φ, and the weight as the square on that shadow. Panel II, upper
half: the unit bar of the unread state split into w₀ and w₁; lower half: each piece divided by its weight
fills a whole bar (trace 1). Panel III: ρ with its off-diagonal blocks is moved by the pinching, ρ′
without them is not.
"""

import math

from _ch27 import blocks, title

SIZE = (740, 280)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：青色的线 φ 水平向右，琥珀色的箭头 ψ 斜向上；从 ψ 的尖端向 φ 作垂线，落下青色的影子 |⟨φ|ψ⟩| = 3/5，"
          "影子下方是以它为边的青色正方形，面积 |⟨φ|ψ⟩|² = 9/25。第二栏：上半，一根长为 1 的横条分成青色深浅两段，"
          "w₀ = 9/25 与 w₁ = 16/25，合起来是未读态；下半，两段各除以自己的权重，各自撑满一整根横条，标着 ρ₀ 与 ρ₁ 的迹为 1。"
          "第三栏：上面是带品红交叉块的 2 × 2 块矩阵 ρ，旁注 U(ρ) ≠ ρ；下面是交叉块已划掉的 ρ′，带一个回到自身的小圈箭头，旁注 U(ρ′) = ρ′。",
    "en": "Three panels. Panel I: a cyan line φ points right and an amber arrow ψ points up and to the right; a perpendicular "
          "from the tip of ψ drops a cyan shadow |⟨φ|ψ⟩| = 3/5 on φ, and below it lies the cyan square on that shadow, of area "
          "|⟨φ|ψ⟩|² = 9/25. Panel II, upper half: a bar of length 1 split into a darker and a lighter cyan piece, w₀ = 9/25 "
          "and w₁ = 16/25, which together make the unread state; lower half: each piece divided by its own weight fills a "
          "whole bar, labelled ρ₀ and ρ₁ with trace 1. Panel III: above, the 2 × 2 block matrix ρ with magenta cross blocks, "
          "marked U(ρ) ≠ ρ; below, ρ′ with its cross blocks struck out and a small loop arrow back to itself, marked U(ρ′) = ρ′.",
}

PSI = (3 / 5, 4j / 5)          # the chapter's example state
PHI = [(1, 0), (0, 1)]         # the Z basis


def weights():
    w = [abs(sum(complex(a).conjugate() * b for a, b in zip(phi, PSI))) ** 2 for phi in PHI]
    assert abs(w[0] - 9 / 25) < 1e-12 and abs(w[1] - 16 / 25) < 1e-12 and abs(sum(w) - 1) < 1e-12
    return w


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 280, gap=16)
    w = weights()

    # ---- I: the rank-one weight is the square of the shadow
    title(one, "I　秩一：权重 = 影子²", "I  rank one: weight = shadow²")
    ox, oy, R = 34, 170, 128
    c = math.sqrt(w[0])
    theta = math.degrees(math.acos(c))
    tip = (ox + R * math.cos(math.radians(theta)), oy - R * math.sin(math.radians(theta)))
    foot = (ox + R * c, oy)
    one.arc(ox, oy, R, 0, 70, "faint", 1.2, dash="3 4")
    one.line(ox, oy, ox + R + 26, oy, "line", 1.6)
    one.text(ox + R + 24, oy - 10, "*φ*", size=15, color="line", anchor="middle")
    one.polygon([(ox, oy), foot, (foot[0], oy + R * c), (ox, oy + R * c)], "line", fill_opacity=0.18, color="line", width=1.3)
    one.line(tip[0], tip[1], foot[0], foot[1], "dim", 1.2, dash="3 3")
    one.right_angle(foot[0], foot[1], 180)
    one.line(ox, oy, foot[0], foot[1], "line", 5, cap="round")
    one.arrow(ox, oy, tip[0], tip[1], "now", 2.4)
    one.text(tip[0] + 8, tip[1] + 4, "*ψ*", size=15, color="now")
    one.angle(ox, oy, 34, 0, theta, "*θ*")
    sq = R * c
    one.text(ox + sq / 2, oy + sq / 2 - 6, "|⟨*φ*|*ψ*⟩|^{2}", size=14, color="line", anchor="middle")
    one.text(ox + sq / 2, oy + sq / 2 + 14, "= 9/25", size=13, color="line", anchor="middle")
    one.text(foot[0] + 8, oy + 22, "|⟨*φ*|*ψ*⟩| = 3/5", size=13, color="line")

    # ---- II: weighted ensemble (upper) and conditional normalisation (lower)
    title(two, "II　按权重混合，各自归一", "II  mix by weight, renormalise")
    x0, L, bh = 18, 200, 26
    two.text(x0, 62, two.t("未读态 *U*(*ρ*) = Σ *w*_{j}*ρ*_{j}", "unread *U*(*ρ*) = Σ *w*_{j}*ρ*_{j}"), size=13, color="dim")
    yb = 72
    shades = [0.42, 0.16]
    xs = [x0, x0 + L * w[0], x0 + L]
    for k in range(2):
        two.rect(xs[k], yb, xs[k + 1] - xs[k], bh, color="line", fill="line", fill_opacity=shades[k], width=1.3)
        two.text((xs[k] + xs[k + 1]) / 2, yb + bh / 2, ["*w*_{0} = 9/25", "*w*_{1} = 16/25"][k], size=13, anchor="middle", middle=True)
    two.text(x0, 150, two.t("条件态 *ρ*_{k} = *P*_{k}*ρP*_{k} ÷ *w*_{k}", "conditional *ρ*_{k} = *P*_{k}*ρP*_{k} ÷ *w*_{k}"),
             size=13, color="dim")
    for k, y in enumerate((160, 204)):
        two.rect(x0, y, L, bh, color="line", fill="line", fill_opacity=shades[k], width=1.3)
        two.text(x0 + L / 2, y + bh / 2, f"*ρ*_{{{k}}}：Tr = 1" if two.lang == "zh" else f"*ρ*_{{{k}}}: Tr = 1", size=13,
                 anchor="middle", middle=True)

    # ---- III: fixed point iff the cross blocks vanish
    title(three, "III　不动点 ⟺ 交叉块为 0", "III  fixed ⟺ no cross blocks")
    cell, mx = 32, 28
    for top, keep, name, verdict in ((62, True, "*ρ*", "*U*(*ρ*) ≠ *ρ*"), (170, False, "*ρ*′", "*U*(*ρ*′) = *ρ*′")):
        blocks(three, mx, top, cell, 2, lambda i, j, keep=keep: keep)
        three.text(mx - 12, top + cell, name, size=15, anchor="end", middle=True)
        if not keep:
            three.cross(mx + cell * 1.5, top + cell * 0.5, 7, "area", 1.6)
            three.cross(mx + cell * 0.5, top + cell * 1.5, 7, "area", 1.6)
            lcx, lcy = mx + 2 * cell + 20, top + cell
            loop = [(lcx + 14 * math.cos(math.radians(t)), lcy - 18 * math.sin(math.radians(t))) for t in range(130, -131, -10)]
            three.curve_arrow(loop, "ink", 1.6, head=7)
        three.text(mx + 2 * cell + 44, top + cell, verdict, size=14, middle=True)
