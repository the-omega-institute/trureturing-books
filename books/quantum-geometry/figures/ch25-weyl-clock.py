"""M = 3 时交换一次不是变号，而是转过 120°（第二十五章，外尔位移词）。
For M = 3 one swap is not a change of sign but a turn by 120° (chapter 25, Weyl displacement words).

Panel I is the three basis vectors |0⟩, |1⟩, |2⟩ of one three-level system on a ring: the shift X moves
each one a step round the ring (cyan), and the clock Z gives |k⟩ the phase ω^k (violet). Panel II is the
unit circle of phases: ZX = ω XZ puts ZX a turn of 120° past XZ (violet), where for M = 2 the same arc
is 180°, ZX = −XZ (dashed). The script builds the clock and shift matrices of thm-weyl-displacement-laws
for M = 2 and M = 3, checks the composition law D(a, b) D(c, d) = ω^{bc} D(a + c, b + d) for every
index, and reads both angles off ZX (XZ)^{-1}.
"""

import cmath
import math

SIZE = (488, 270)
WRAP = True
ALT = {
    "zh": "两栏。第一栏：三能级系统的三个基矢 |0⟩、|1⟩、|2⟩ 排在一个圆环上，青色的箭头是移位 X，把每个基矢沿环推到下一个；"
          "每个基矢旁紫色的 1、ω、ω² 是时钟 Z 给它的相位。第二栏：相位的单位圆，XZ 在 1 处，ZX 在逆时针转过 120° 的 ω 处，"
          "两点之间是一段紫色的弧，标着 120°；虚线的弧与虚线的点标着 M = 2：转过 180° 落在 −1，那就是变号。",
    "en": "Two panels. Panel I: the three basis vectors |0⟩, |1⟩, |2⟩ of a three-level system sit on a ring; cyan arrows are "
          "the shift X, which pushes each one to the next round the ring, and the violet 1, ω, ω² beside them are the "
          "phases the clock Z gives them. Panel II: the unit circle of phases; XZ sits at 1 and ZX at ω, 120° further "
          "counter-clockwise, joined by a violet arc labelled 120°; a dashed arc and a dashed point marked M = 2 turn "
          "180° to −1, which is a change of sign.",
}


def matmul(a, b):
    n = len(a)
    return [[sum(a[i][k] * b[k][j] for k in range(n)) for j in range(n)] for i in range(n)]


def matpow(a, e):
    n = len(a)
    out = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    for _ in range(e):
        out = matmul(out, a)
    return out


def close(a, b):
    return all(abs(a[i][j] - b[i][j]) < 1e-12 for i in range(len(a)) for j in range(len(a)))


def weyl(m):
    """Clock, shift, ω for M = m, and the angle (degrees) by which ZX is turned past XZ."""
    w = cmath.exp(2j * math.pi / m)
    z = [[w ** i if i == j else 0 for j in range(m)] for i in range(m)]
    x = [[1 if (i - j) % m == 1 else 0 for j in range(m)] for i in range(m)]   # (i, j) = 1 when i − j = 1
    d = lambda a, b: matmul(matpow(x, a % m), matpow(z, b % m))
    for a in range(m):
        for b in range(m):
            for c in range(m):
                for e in range(m):
                    assert close(matmul(d(a, b), d(c, e)), [[w ** ((b * c) % m) * v for v in row] for row in d(a + c, b + e)])
    zx, xz = matmul(z, x), matmul(x, z)
    ratio = zx[1][0] / xz[1][0]            # both send |0⟩ to a multiple of |1⟩
    assert close(zx, [[ratio * v for v in row] for row in xz])
    return x, z, w, math.degrees(cmath.phase(ratio)) % 360


X3, Z3, W3, TURN3 = weyl(3)
_, _, _, TURN2 = weyl(2)
assert abs(TURN3 - 120) < 1e-9 and abs(TURN2 - 180) < 1e-9
# the clock phases written on panel I: Z|k⟩ = ω^k |k⟩, and X|k⟩ = |k + 1⟩
assert all(abs(Z3[k][k] - W3 ** k) < 1e-12 and X3[(k + 1) % 3][k] == 1 for k in range(3))

CX, CY, RR = 118, 142, 64


def draw(fig):
    one, two = fig.row([236, 236], 270, gap=16)

    # ---- I: the ring of three basis vectors, shift and clock
    one.text(118, 22, one.t("*M* = 3：移位 *X*，时钟 *Z*", "*M* = 3: shift *X*, clock *Z*"), size=14, weight=600,
             anchor="middle")
    ang = {0: 90, 1: -30, 2: 210}          # X goes round clockwise: |0⟩ → |1⟩ → |2⟩ → |0⟩
    pos = {k: (CX + RR * math.cos(math.radians(a)), CY - RR * math.sin(math.radians(a))) for k, a in ang.items()}
    one.circle(CX, CY, RR, color="faint", width=1.1, dash="3 4")
    for k in range(3):
        a0, a1 = ang[k] - 16, ang[k] - 104      # the arc from |k⟩ to |k + 1⟩, clear of both dots
        pts = [(CX + RR * math.cos(math.radians(a0 + (a1 - a0) * i / 24)),
                CY - RR * math.sin(math.radians(a0 + (a1 - a0) * i / 24))) for i in range(25)]
        one.curve_arrow(pts, "line", 2.2, head=8)
        am = math.radians((a0 + a1) / 2)
        one.text(CX + (RR - 16) * math.cos(am), CY - (RR - 16) * math.sin(am), "*X*", size=14, color="line",
                 anchor="middle", middle=True)
    phase = {0: "1", 1: "ω", 2: "ω^{2}"}
    for k in range(3):
        x, y = pos[k]
        one.dot(x, y, 4.2, "ink", ring="bg")
        a = math.radians(ang[k])
        lx, ly = CX + (RR + 22) * math.cos(a), CY - (RR + 22) * math.sin(a)
        if k == 0:
            one.text(x - 10, y - 10, f"|{k}⟩", size=15, anchor="end", halo=True)
            one.text(x + 10, y - 10, phase[k], size=14, color="axis", halo=True)
        else:
            one.text(lx, ly - 8, f"|{k}⟩", size=15, anchor="middle", middle=True, halo=True)
            one.text(lx, ly + 10, phase[k], size=14, color="axis", anchor="middle", middle=True, halo=True)
    one.text(118, 256, "*Z*|*k*⟩ = ω^{*k*}|*k*⟩", size=14, color="axis", anchor="middle")

    # ---- II: the unit circle of phases
    two.text(118, 22, two.t("交换一次：转过 120°", "one swap: a turn of 120°"), size=14, weight=600, anchor="middle")
    two.circle(CX, CY, RR, color="faint", width=1.2)
    two.line(CX - RR - 10, CY, CX + RR + 10, CY, "faint", 1.0)
    two.line(CX, CY - RR - 10, CX, CY + RR + 10, "faint", 1.0)
    P = lambda deg, r=RR: (CX + r * math.cos(math.radians(deg)), CY - r * math.sin(math.radians(deg)))
    # M = 2: the same arc is half a turn (dashed)
    two.arc(CX, CY, RR + 12, 0, TURN2, "dim", 1.3, dash="4 3")
    two.dot(*P(TURN2), 4.0, "bg", ring="dim")
    two.text(CX - 32, CY + 30, "*M* = 2: −1", size=13, color="dim", anchor="middle", halo=True)
    # M = 3: ZX = ω XZ
    two.arc(CX, CY, RR, 0, TURN3, "axis", 3.0)
    two.angle(CX, CY, 24, 0, TURN3, "120°", color="axis", size=13, width=1.3, label_r=40)
    two.dot(*P(0), 4.6, "ink", ring="bg")
    two.text(P(0)[0] - 6, P(0)[1] + 18, "*XZ*", size=14, anchor="middle", halo=True)
    two.dot(*P(TURN3), 4.6, "axis", ring="bg")
    lab = P(TURN3, RR + 30)
    two.text(lab[0], lab[1] - 2, "*ZX* = ω *XZ*", size=14, color="axis", anchor="middle", halo=True)
    two.text(118, 256, "ω = *e*^{2π*i*/3}", size=14, color="axis", anchor="middle")
