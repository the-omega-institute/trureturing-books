"""从纯上分量出发，上分量的布居来回摆动；从能量本征态出发，它停着不动。
Started in the pure upper component, the upper population swings back and forth; started in an energy
eigenstate, it stands still.

H = 3Z + 4X as in the chapter's worked example. Left: the x–z section of the Bloch sphere. The violet axis is
n = (4, 0, 3)/5, the direction of H; the state (1, 0) is the north pole (amber), and e^{−iHt} turns it about n,
so its orbit is the circle through the pole perpendicular to n, seen edge-on as the dashed amber segment from
(0, 1) to (24/25, −7/25). Its shadow on the z axis (cyan) runs from z = 1 to z = −7/25, that is
P(upper) = (1 + z)/2 from 1 to 9/25. Right: P(upper) against t, computed from e^{−iHt} = cos 5t − i sin 5t · H/5
(the identity H² = 25 I of the example): 1 − (16/25) sin² 5t for the start (1, 0) (cyan), and a flat 4/5 for the
eigenvector (2, 1)/√5 of E = +5 (violet), which lies on the axis. All asserted; nothing here is a theorem.
"""

import cmath
import math

SIZE = (646, 300)
WRAP = True
ALT = {
    "zh": "两栏。左栏：布洛赫球的 x–z 截面，一个圆。紫色的转轴从圆心指向 (4, 0, 3)/5，即 H = 3Z + 4X 的方向，轴端一个紫色的点是 E = +5 的本征态。"
          "琥珀色的箭头指向北极，是纯上分量 (1, 0)；它绕紫轴转出的圈在这个截面里侧着看成一条琥珀色虚线，从北极斜到圆的右下方。"
          "这条虚线在竖直的 z 轴上的影子是一段青色的粗线，从 P = 1 到 P = 9/25。"
          "右栏：坐标图，横轴是时间 t，标着 π/5 与 2π/5；纵轴是上分量的布居 P(上)。青色的曲线从 1 出发，往下摆到 9/25 再回到 1，摆了两回；紫色的水平线停在 4/5，是从本征态出发的情形。",
    "en": "Two panels. Left: the x–z section of the Bloch sphere, a circle. The violet axis runs from the centre towards "
          "(4, 0, 3)/5, the direction of H = 3Z + 4X, and a violet dot at its tip is the eigenstate of E = +5. An amber "
          "arrow points to the north pole, the pure upper component (1, 0); the circle it sweeps about the violet axis is "
          "seen edge-on in this section as a dashed amber segment slanting from the pole to the lower right of the circle. "
          "Its shadow on the vertical z axis is a thick cyan bar from P = 1 down to P = 9/25. Right: a plot of the upper "
          "population P(upper) against time t, with ticks at π/5 and 2π/5. The cyan curve starts at 1, swings down to "
          "9/25 and back to 1, twice; a flat violet line stays at 4/5, the case that starts in the eigenstate.",
}

H = [[3, 4], [4, -3]]


def evolve(psi, t):
    """e^{−iHt} ψ with e^{−iHt} = cos 5t · I − i sin 5t · H/5, which holds because H² = 25 I."""
    c, s = math.cos(5 * t), math.sin(5 * t)
    return [c * psi[i] - 1j * s * (H[i][0] * psi[0] + H[i][1] * psi[1]) / 5 for i in range(2)]


def p_up(psi, t):
    return abs(evolve(psi, t)[0]) ** 2


def bloch(psi):
    a, b = psi
    return (2 * (a.conjugate() * b).real, 2 * (a.conjugate() * b).imag, abs(a) ** 2 - abs(b) ** 2)


def draw(fig):
    t = fig.t
    left, right = fig.row([266, 364], 300, gap=16)

    # ---- the numbers the figure shows, checked against an independent series for e^{−iHt}
    H2 = [[sum(H[i][k] * H[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    assert H2 == [[25, 0], [0, 25]]
    for tt in (0.0, 0.13, 0.4, 1.1):
        M = [[0j, 0j], [0j, 0j]]                                    # Taylor series of e^{−iHt}
        term = [[1 + 0j, 0j], [0j, 1 + 0j]]
        for k in range(1, 60):
            M = [[M[i][j] + term[i][j] for j in range(2)] for i in range(2)]
            term = [[sum(term[i][m] * H[m][j] for m in range(2)) * (-1j * tt) / k for j in range(2)] for i in range(2)]
        for psi in ([1, 0], [2 / math.sqrt(5), 1 / math.sqrt(5)]):
            direct = [M[i][0] * psi[0] + M[i][1] * psi[1] for i in range(2)]
            assert all(abs(x - y) < 1e-9 for x, y in zip(direct, evolve(psi, tt)))
    pure, eig = [1 + 0j, 0j], [2 / math.sqrt(5) + 0j, 1 / math.sqrt(5) + 0j]
    period = math.pi / 5
    ts = [period * k / 400 for k in range(801)]
    pmin = min(p_up(pure, x) for x in ts)
    assert abs(pmin - 9 / 25) < 1e-9 and abs(p_up(pure, period / 2) - 9 / 25) < 1e-12
    assert all(abs(p_up(pure, x) - (1 - 16 / 25 * math.sin(5 * x) ** 2)) < 1e-12 for x in ts)
    assert all(abs(p_up(eig, x) - 4 / 5) < 1e-12 for x in ts)
    n = (4 / 5, 0, 3 / 5)
    assert all(abs(u - v) < 1e-12 for u, v in zip(bloch(eig), n))                         # the eigenstate sits on the axis
    far = bloch(evolve(pure, period / 2))
    assert all(abs(u - v) < 1e-12 for u, v in zip(far, (24 / 25, 0, -7 / 25)))           # the far side of the orbit
    for x in ts[::40]:                                                                    # every point of the orbit is at the
        r = bloch(evolve(pure, x))                                                        # same angle from the axis
        assert abs(sum(u * v for u, v in zip(r, n)) - 3 / 5) < 1e-12

    # ---- left: the x–z section of the Bloch sphere
    left.text(left.width / 2, 22, t("布洛赫球的 *x*–*z* 截面", "the *x*–*z* section"), size=14, weight=600, anchor="middle")
    cx, cy, R = 112, 160, 96
    P = lambda x, z: (cx + R * x, cy - R * z)
    left.circle(cx, cy, R, color="dim", width=1.4)
    left.line(cx - R - 10, cy, cx + R + 10, cy, "faint", 1.2)
    left.line(cx, cy + R + 10, cx, cy - R - 12, "faint", 1.2)
    left.text(cx + R + 12, cy + 4, "*x*", size=14, color="dim")
    # the cyan shadow on the z axis, from z = 1 to z = −7/25
    (ax_, s1), (_, s2) = P(0, 1), P(0, far[2])
    sx = ax_ - 7                                                   # the shadow is drawn just beside the z axis
    left.line(sx, s1, sx, s2, "line", 5.0, cap="round")
    left.line(sx, s2, *P(far[0], far[2]), "line", 1.2, dash="2 3")
    left.text(sx - 10, s1 + 26, "*P* = 1", size=13, color="line", anchor="end", halo=True)
    left.text(sx - 10, s2 + 4, "*P* = 9/25", size=13, color="line", anchor="end", halo=True)
    # the orbit, edge-on
    left.line(*P(0, 1), *P(far[0], far[2]), "now", 2.2, dash="6 4")
    # the violet axis and the eigenstate on it
    left.line(cx, cy, *P(n[0] * 1.12, n[2] * 1.12), "violet", 2.6)
    left.dot(*P(n[0], n[2]), 5, "violet", ring="bg")
    ex, ey = P(n[0], n[2])
    left.text(ex + 10, ey + 5, t("本征态", "eigenstate"), size=13, color="violet", halo=True)
    # the start state (1, 0): amber, at the pole
    left.arrow(cx, cy, *P(0, 0.97), "now", 2.6, head=9)
    left.text(ax_ + 8, s1 - 8, "(1, 0)", size=13, color="now", halo=True)

    # ---- right: the upper population against time
    right.text(right.width / 2, 22, t("上分量的布居", "the upper population"), size=14, weight=600, anchor="middle")
    right.legend(54, 50, [("line", t("从 (1, 0) 出发", "from (1, 0)"))], size=13)
    right.legend(196, 50, [("violet", t("从本征态出发", "from the eigenstate"))], size=13)
    ax = right.axes(54, 70, 290, 176, (0, 2 * period), (0, 1.08))
    ax.xaxis(ticks=[0, period, 2 * period], labels=["0", "π/5", "2π/5"], label="*t*", size=13)
    ax.yaxis(ticks=[0, 9 / 25, 4 / 5, 1], labels=["0", "9/25", "4/5", "1"], label=t("*P*(上)", "*P*(upper)"), size=13)
    ax.hline(9 / 25, "faint", 1.0, dash="2 4")
    ax.hline(4 / 5, "violet", 2.4)
    ax.plot(lambda x: p_up(pure, x), 0, 2 * period, n=240, color="line", width=2.8)
