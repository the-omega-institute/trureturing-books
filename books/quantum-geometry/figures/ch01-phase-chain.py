"""最近邻测试射线像锁链一样把相位锁成一个；链一断，两岛各自可差一个相位（第一章 §1.3）。
Nearest-neighbour test rays lock the phases into one like a chain; break the chain and the two islands
may differ by a phase (chapter 1, §1.3).

N = 6 modes. A diagonal unitary A = diag(c₀ … c₅) is drawn as one phase dial per mode. Top: the tests
e_i + e_{i+1} (i = 0 … 4) connect all modes; the script checks that A preserves all five test rays exactly
when the six phases are equal, the case of thm-ray-phase-rigidity. Bottom: the test e₂ + e₃ is missing;
A = diag(c₁, c₁, c₁, c₂, c₂, c₂) with c₁ ≠ c₂ preserves the four remaining test rays (checked) and is not a
multiple of I: a hand counterexample where the theorem's connectivity premise fails.
"""

import cmath
import math

SIZE = (480, 316)
ALT = {
    "zh": "两行，每行六个圆形的相位刻盘，编号 0 到 5。上行：相邻两个刻盘之间各有一条青色的边，标着 e_i + e_{i+1}，"
          "五条边把六个刻盘连成一串，所有指针指向同一个方向，右边写着 A = cI。下行：2 号与 3 号之间的那条边断开，画成虚线并打叉；"
          "左边三个刻盘的指针指一个方向，右边三个指另一个方向，下方写着“两岛各差一个相位，检验察觉不到”。",
    "en": "Two rows of six round phase dials, numbered 0 to 5. Top row: a cyan edge labelled e_i + e_{i+1} joins each pair of "
          "neighbours, the five edges link all six dials into one chain, and every pointer points the same way; A = cI is "
          "written at the right. Bottom row: the edge between dials 2 and 3 is missing, drawn dashed and crossed out; the "
          "three dials on the left point one way and the three on the right another, with the note “the two islands differ "
          "by a phase the tests cannot see” below.",
}

N = 6
PHI_ALL, PHI_LEFT, PHI_RIGHT = 60.0, 60.0, 150.0


def preserves_ray(diag, x):
    """Is A x a multiple of x, for A = diag(diag)?"""
    ax = [d * v for d, v in zip(diag, x)]
    k = next(i for i, v in enumerate(x) if abs(v) > 0)
    lam = ax[k] / x[k]
    return all(abs(ax[i] - lam * x[i]) < 1e-12 for i in range(len(x)))


def test(i):
    return [1.0 if j in (i, i + 1) else 0.0 for j in range(N)]


def dial(cv, x, y, r, deg, k):
    cv.circle(x, y, r, color="dim", fill="panel", width=1.4)
    a = math.radians(deg)
    cv.arrow(x, y, x + 0.8 * r * math.cos(a), y - 0.8 * r * math.sin(a), "ink", 2.0, head=6)
    cv.text(x, y + r + 16, str(k), size=14, color="dim", anchor="middle")


def draw(fig):
    t = fig.t
    same = [cmath.exp(1j * math.radians(PHI_ALL))] * N
    split = [cmath.exp(1j * math.radians(PHI_LEFT))] * 3 + [cmath.exp(1j * math.radians(PHI_RIGHT))] * 3
    assert all(preserves_ray(same, test(i)) for i in range(N - 1))
    assert all(preserves_ray(split, test(i)) for i in (0, 1, 3, 4)) and not preserves_ray(split, test(2))
    assert len(set(round(c.real, 9) + 1j * round(c.imag, 9) for c in split)) == 2       # not a multiple of I

    x0, dx, r = 40, 64, 17
    xs = [x0 + dx * k for k in range(N)]

    # ---- top: the whole chain
    y = 74
    fig.text(16, 24, t("五条测试连成一串", "five tests link one chain"), size=14, weight=600)
    for k in range(N - 1):
        fig.line(xs[k] + r, y, xs[k + 1] - r, y, "line", 3.0)
    fig.text((xs[0] + xs[1]) / 2, y - 12, "*e*_{0}+*e*_{1}", size=14, color="line", anchor="middle")
    for k in range(N):
        dial(fig, xs[k], y, r, PHI_ALL, k)
    fig.text(xs[-1] + r + 14, y + 5, "*A* = *cI*", size=15, color="ink")

    # ---- bottom: the chain broken between 2 and 3
    y = 214
    fig.text(16, 164, t("断开一环：两座孤岛", "one link missing: two islands"), size=14, weight=600)
    for k in range(N - 1):
        if k == 2:
            fig.line(xs[k] + r, y, xs[k + 1] - r, y, "dim", 1.4, dash="4 4")
            fig.cross((xs[k] + xs[k + 1]) / 2, y, 7, "dim", 1.8)
        else:
            fig.line(xs[k] + r, y, xs[k + 1] - r, y, "line", 3.0)
    for k in range(N):
        dial(fig, xs[k], y, r, PHI_LEFT if k < 3 else PHI_RIGHT, k)
    fig.text(xs[1], y + 52, "*c*_{1}", size=15, anchor="middle")
    fig.text(xs[4], y + 52, "*c*_{2} ≠ *c*_{1}", size=15, anchor="middle")
    fig.text(xs[-1] + r + 14, y + 5, "*A* ≠ *cI*", size=15, color="ink")
    fig.text(240, 300, t("两岛各差一个相位，检验察觉不到", "the islands differ by a phase the tests cannot see"),
             size=14, color="dim", anchor="middle")
