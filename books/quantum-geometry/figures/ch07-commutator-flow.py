"""转轴与尺子不平行，影子才会动：投影概率的流动来自对易子 [H, P]（第七章 §7.1，单比特特例）。
The shadow moves only when the axis and the ruler are not parallel: the flow of a projection probability comes from
the commutator [H, P] (chapter 7, §7.1, the one-qubit special case).

One qubit, P = |0⟩⟨0| (the ruler is the z axis) and H = (ω/2) n̂·σ, so the Bloch vector turns about n̂ at rate ω and
p(t) = Tr(ρ_t P) = (1 + r(t)·ẑ)/2. Left: n̂ at 40° from z in the y–z plane, the state |0⟩ going round its cone, and its
shadow on the ruler. Right: p(t) for the tilted axis (it swings between 1 and (1 + cos 80°)/2) and for n̂ = ẑ, where
[H, P] = 0 and p stays at 1. The script checks p(t) against ρ_t = U ρ U* computed with 2×2 matrices, and the slope
against the commutator formula p′(t) = Re(i Tr(ρ_t (HP − PH))) of prop-projection-probability-flow.
"""

import cmath
import math

from tbook import figkit

SIZE = (560, 270)
WRAP = True
ALT = {
    "zh": "两栏。左栏一颗布洛赫球：紫色的转轴 H 从竖直方向斜开 40°，青色的竖轴是尺子 P，琥珀色的态从北极出发，绕紫色的轴走一圈虚线小圆，"
          "它落在青色竖轴上的影子随之上下移动。右栏横轴是时间 ωt，从 0 到 720°：青色的曲线是转轴斜 40° 时留在 |0⟩ 的概率 p(t)，"
          "在 1 与 0.59 之间起伏；灰色的水平线是转轴与尺子重合、[H, P] = 0 时的 p(t)，一直是 1。",
    "en": "Two panels. Left, a Bloch sphere: the violet axis H tilted 40° from the vertical, the cyan vertical axis is the "
          "ruler P, and the amber state starts at the north pole and goes once round a dashed small circle about the violet "
          "axis, while its shadow on the cyan axis moves up and down. Right, time ωt across from 0 to 720°: the cyan curve is "
          "the probability p(t) of |0⟩ with the axis tilted by 40°, swinging between 1 and 0.59; the grey horizontal line is "
          "p(t) when the axis and the ruler coincide and [H, P] = 0, which stays at 1.",
}

TILT = 40
NOW = 160          # the moment drawn on the sphere, ωt in degrees


def axis(tilt):
    a = math.radians(tilt)
    return (0.0, math.sin(a), math.cos(a))


def bloch_turn(n, deg):
    return figkit.rotate((0.0, 0.0, 1.0), n, deg)


def p_matrix(n, wt):
    """p(t) = Tr(U ρ U* P) with U = cos(ωt/2) I − i sin(ωt/2) n·σ, ρ = |0⟩⟨0|, P = |0⟩⟨0|: the |0⟩ entry of U|0⟩."""
    c, s = math.cos(wt / 2), math.sin(wt / 2)
    u00 = complex(c, -s * n[2])                        # ⟨0|U|0⟩ = cos − i sin n_z
    return abs(u00) ** 2


def slope_commutator(n, wt, w=1.0):
    """Re(i Tr(ρ_t (HP − PH))) for H = (ω/2) n·σ, with 2×2 complex matrices."""
    c, s = math.cos(wt / 2), math.sin(wt / 2)
    U = [[complex(c, -s * n[2]), complex(-s * n[1], -s * n[0])], [complex(s * n[1], -s * n[0]), complex(c, s * n[2])]]
    psi = [U[0][0], U[1][0]]
    rho = [[psi[i] * psi[j].conjugate() for j in range(2)] for i in range(2)]
    H = [[w / 2 * n[2], w / 2 * complex(n[0], -n[1])], [w / 2 * complex(n[0], n[1]), -w / 2 * n[2]]]
    P = [[1, 0], [0, 0]]
    mm = lambda A, B: [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    HP, PH = mm(H, P), mm(P, H)
    C = [[HP[i][j] - PH[i][j] for j in range(2)] for i in range(2)]
    M = mm(rho, C)
    return (1j * (M[0][0] + M[1][1])).real


def check():
    for tilt in (TILT, 0):
        n = axis(tilt)
        for wt in (0.3, 1.1, 2.5, 4.0):
            r = bloch_turn(n, math.degrees(wt))
            assert abs(p_matrix(n, wt) - (1 + r[2]) / 2) < 1e-12
            h = 1e-6
            fd = (p_matrix(n, wt + h) - p_matrix(n, wt - h)) / (2 * h)
            assert abs(fd - slope_commutator(n, wt)) < 1e-6
            if tilt == 0:
                assert abs(p_matrix(n, wt) - 1) < 1e-12
    lo = (1 + math.cos(math.radians(2 * TILT))) / 2
    assert abs(min(p_matrix(axis(TILT), k * math.pi / 200) for k in range(401)) - lo) < 1e-9


def draw(fig):
    t = fig.t
    check()
    left, right = fig.row([240, 300], 270, gap=20)
    n = axis(TILT)

    left.text(120, 22, t("转轴 *H* 斜开 40°", "axis *H* tilted 40°"), size=14, weight=600, anchor="middle")
    sp = left.sphere(120, 152, 92, el=18)
    sp.outline()
    sp.great_circle((0, 0, 1), "faint", 1.0)
    sp.segment((0, 0, -1.22), (0, 0, 1.22), "line", 1.6, dash="5 3")
    sp.label((0, 0, 1.22), "*P*", dx=-10, dy=4, size=15, color="line", anchor="end")
    sp.segment(tuple(-1.25 * c for c in n), tuple(1.25 * c for c in n), "axis", 2.2)
    sp.label(tuple(1.25 * c for c in n), "*H*", dx=8, dy=4, size=15, color="axis")
    orbit = [bloch_turn(n, k * 360 / 96) for k in range(97)]
    sp.curve(orbit, "dim", 1.4, dash="4 3")
    r = bloch_turn(n, NOW)
    sp.segment((0, 0, 0), (0, 0, r[2]), "line", 5, cap="round")
    sp.segment(r, (0, 0, r[2]), "dim", 1.1, dash="3 3")
    sp.arrow(r, "now", 2.6)
    sp.dot((0, 0, 1), "dim", 3.4, ring="bg")
    sp.label((0, 0, 1), "|0⟩", dx=10, dy=-6, size=14, color="dim")
    sp.label((0, 0, r[2]), t("影子", "shadow"), dx=-8, dy=4, size=13, color="line", anchor="end", halo=True)

    right.text(150, 22, t("留在 |0⟩ 的概率 *p*(*t*)", "chance to stay in |0⟩, *p*(*t*)"), size=14, weight=600, anchor="middle")
    ax = right.axes(44, 46, 236, 170, (0, 720), (0.5, 1.04))
    ax.xaxis(ticks=[0, 360, 720], labels=["0", "360°", "720°"], label="ω*t*")
    ax.yaxis(ticks=[0.5, 0.75, 1.0], labels=["0.5", "0.75", "1"])
    ax.path([(d, 1.0) for d in (0, 720)], color="dim", width=2.2)
    ax.plot(lambda d: p_matrix(n, math.radians(d)), color="line", width=2.4)
    ax.text(470, 1.015, t("[*H*, *P*] = 0：不动", "[*H*, *P*] = 0: still"), size=13, color="dim", anchor="middle")
    ax.text(360, 0.555, t("斜 40°：起伏", "tilted 40°: swings"), size=13, color="line", anchor="middle")
    ax.points([(NOW, p_matrix(n, math.radians(NOW)))], color="now", r=4.6)
