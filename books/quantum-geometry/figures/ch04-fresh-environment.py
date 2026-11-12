"""漏出去的振幅不回来，是因为迎面来的环境永远是新的（第四章 §4.2，例 ex-halmos-one-step-recurrence）。
The amplitude that leaks out does not come back because the environment met at each step is always new
(chapter 4, §4.2, example ex-halmos-one-step-recurrence).

c = 0.8. Cyan: the collision model, where cell 0 meets a fresh environment every step and keeps c^n, the
value of the Sz.-Nagy dilation. Grey: reusing the same environment, (J^n)₀₀ = cos nφ with φ = arccos 0.8,
the one-step Halmos unitary J = [[c, is], [is, c]] raised to the n-th power (computed below with complex
2 × 2 matrices). At n = 39 the grey value is 0.99934 while c^39 = 0.00017.
"""

import math

SIZE = (400, 290)
ALT = {
    "zh": "横轴是步数 n，从 0 到 40；纵轴从 −1 到 1。青色的点列是 c^n（c = 0.8），一路衰减到零，再也不回来；"
          "灰色的点列是同一份环境反复用时的 cos nφ，在 −1 与 1 之间来回摆，到 n = 39 回到 0.999，图上圈出了这一点。",
    "en": "The horizontal axis is the step n from 0 to 40, the vertical axis runs from −1 to 1. The cyan points are c^n "
          "(c = 0.8), decaying to zero and never coming back; the grey points are cos nφ, the same environment reused, "
          "swinging between −1 and 1 and back at 0.999 at n = 39, which is circled.",
}

C = 0.8
N = 40


def jpow(n):
    """(J^n)₀₀ for J = [[c, i s], [i s, c]], s = √(1 − c²), by repeated complex matrix products."""
    s = math.sqrt(1 - C * C)
    J = [[complex(C, 0), complex(0, s)], [complex(0, s), complex(C, 0)]]
    M = [[1 + 0j, 0j], [0j, 1 + 0j]]
    for _ in range(n):
        M = [[sum(M[i][k] * J[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    return M[0][0]


def draw(fig):
    t = fig.t
    phi = math.acos(C)
    same = [jpow(n) for n in range(N + 1)]
    assert all(abs(z.imag) < 1e-9 and abs(z.real - math.cos(n * phi)) < 1e-9 for n, z in enumerate(same))
    assert abs(same[39].real - 0.99934) < 5e-6 and abs(C ** 39 - 0.00017) < 5e-6
    table = [(1, 0.8, 0.8), (2, 0.64, 0.28), (3, 0.512, -0.352), (4, 0.4096, -0.8432)]
    assert all(abs(C ** n - a) < 1e-12 and abs(same[n].real - b) < 1e-9 for n, a, b in table)

    ax = fig.axes(46, 40, 330, 190, (0, N), (-1.05, 1.05))
    ax.grid(ys=[-1, 0, 1])
    ax.xaxis(ticks=[0, 10, 20, 30, 39], labels=["0", "10", "20", "30", "39"], label=t("步数 *n*", "step *n*"))
    ax.yaxis(ticks=[-1, 0, 1], labels=["−1", "0", "1"])
    ax.path([(n, same[n].real) for n in range(N + 1)], color="dim", width=1.2)
    ax.points([(n, same[n].real) for n in range(N + 1)], color="dim", r=2.6)
    ax.path([(n, C ** n) for n in range(N + 1)], color="line", width=1.8)
    ax.points([(n, C ** n) for n in range(N + 1)], color="line", r=3.0)
    x, y = ax.pt(39, same[39].real)
    fig.circle(x, y, 8, color="ink", width=1.6)
    fig.text(x - 10, y - 12, "0.999", size=14, anchor="end", halo=True)
    fig.text(60, 30, t("青：新环境 *c*^{*n*}", "cyan: fresh environment, *c*^{*n*}"), size=14, color="line")
    fig.text(60, 272, t("灰：同一份环境 cos *nφ*", "grey: the same environment, cos *nφ*"), size=14, color="dim")
