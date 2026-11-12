"""截断余弦的不动点：每多保留一项，就离 θ* 近好几位，却每次都差一点。
Fixed points of the truncated cosine: each extra term brings them several digits closer to θ*, yet
every one of them misses.

T_N(x) = Σ_{k<N} (−1)^k x^{2k}/(2k)! is the even Taylor polynomial of degree 2N − 2. Its fixed point
q_N near θ* (found by bisection on [0.5, 1]) is a root of a polynomial with rational coefficients,
hence algebraic. The stems are the signed errors q_N − θ* for N = 1…6 on a logarithmic scale of the
size (10⁻¹² at the centre line, 1 at the edge): cyan above (q_N > θ*), magenta below. q_1 = 1 and
q_2 = √3 − 1 are checked in closed form.
"""

import math

from _ch24 import THETA

SIZE = (520, 306)
ALT = {
    "zh": "横轴是截断多项式的次数 0、2、4、6、8、10，纵轴是它的不动点 q 与 θ* 的差，按绝对值取对数刻度。"
          "六根竖线交替朝上（青色，q 比 θ* 大）和朝下（品红，q 比 θ* 小），长度一次比一次短：差依次约为 0.26、0.0070、0.00013、"
          "1.3×10⁻⁶、8×10⁻⁹、3.3×10⁻¹¹，越来越小，却没有一根落到中线上。竖线旁标着 q 的值，前两个是 1 与 √3 − 1。",
    "en": "The horizontal axis is the degree of the truncated polynomial, 0, 2, 4, 6, 8, 10; the vertical axis is the "
          "difference between its fixed point q and θ*, on a logarithmic scale of its size. Six stems alternate up (cyan, q "
          "above θ*) and down (magenta, q below θ*), each shorter than the last: the differences are about 0.26, 0.0070, "
          "0.00013, 1.3×10⁻⁶, 8×10⁻⁹ and 3.3×10⁻¹¹, ever smaller, yet none reaches the centre line. The stems carry the "
          "values of q, the first two being 1 and √3 − 1.",
}

LOG0 = 12        # the centre line is 10⁻¹²


def T(N, x):
    return sum((-1) ** k * x ** (2 * k) / math.factorial(2 * k) for k in range(N))


def fixed(N):
    lo, hi = 0.5, 1.0001
    for _ in range(200):
        m = (lo + hi) / 2
        if (T(N, lo) - lo) * (T(N, m) - m) <= 0:
            hi = m
        else:
            lo = m
    return (lo + hi) / 2


Q = [fixed(N) for N in range(1, 7)]
ERR = [q - THETA for q in Q]
assert abs(Q[0] - 1) < 1e-12 and abs(Q[1] - (math.sqrt(3) - 1)) < 1e-12
assert all(abs(T(N, q) - q) < 1e-13 for N, q in zip(range(1, 7), Q))
assert all(e != 0 and (e > 0) == (k % 2 == 0) for k, e in enumerate(ERR))        # signs alternate
assert all(abs(b) < abs(a) / 30 for a, b in zip(ERR, ERR[1:]))                     # each misses by far less
assert abs(abs(ERR[5]) - 3.3e-11) < 0.1e-11


def L(e):
    return math.copysign(math.log10(abs(e)) + LOG0, e)


def draw(fig):
    t = fig.t
    ax = fig.axes(84, 40, 410, 210, (-0.5, 5.6), (-LOG0, LOG0))
    ax.hline(0, "dim", 1.3)
    for v, lab in ((4, "10⁻⁸"), (8, "10⁻⁴"), (12, "1")):
        for sg in (1, -1):
            fig.line(ax.X(-0.5) - 5, ax.Y(sg * v), ax.X(-0.5), ax.Y(sg * v), "dim", 1.2)
            fig.text(ax.X(-0.5) - 8, ax.Y(sg * v), ("" if sg > 0 else "−") + lab, size=15, color="dim", anchor="end",
                     middle=True)
    fig.line(ax.X(-0.5), ax.Y(LOG0), ax.X(-0.5), ax.Y(-LOG0), "dim", 1.3)
    fig.text(ax.X(5.6), ax.Y(0) - 8, "*θ*^{∗}", size=15, color="ink", anchor="end")
    labels = ["1", "√3 − 1", "0.73922", "0.739084", "0.73908514", "0.739085133"]
    for k, (e, lab) in enumerate(zip(ERR, labels)):
        role = "line" if e > 0 else "area"
        x0, y0 = ax.pt(k, 0)
        x1, y1 = ax.pt(k, L(e))
        fig.line(x0, y0, x1, y1, role, 4.2, cap="round")
        fig.dot(x1, y1, 4.4, role, ring="bg")
        if k == 0:                                               # beside the tallest stem, clear of the axis title
            fig.text(x1 + 10, y1, lab, size=15, color=role, middle=True, halo=True)
        else:
            fig.text(x1, y1 + (-12 if e > 0 else 23), lab, size=15, color=role, anchor="middle", halo=True)
        fig.text(ax.X(k), 280, str(2 * k), size=15, color="dim", anchor="middle")
    fig.text(ax.X(-0.5) - 8, 280, t("次数", "degree"), size=15, color="dim", anchor="end")
    fig.text(12, 20, t("*q* − *θ*^{∗}（对数刻度）", "*q* − *θ*^{∗} (log scale)"), size=15, color="dim")
