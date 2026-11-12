"""ψ(x) 贴着 x 走，π(x) ln x / x 落得慢（第二十二章 §22.4，例 ex-chebyshev-psi-table）。
ψ(x) hugs x, while π(x) ln x / x falls slowly (chapter 22, §22.4, example ex-chebyshev-psi-table).

Top: the staircase ψ(x) = Σ_{p^k ≤ x} ln p for x ≤ 100 against the line x; each step is ln p at a prime power p^k.
Bottom: ψ(x)/x − 1 and π(x) ln x / x − 1 for 10 ≤ x ≤ 10⁶ on a logarithmic axis. Both are summed exactly over the
primes; the script asserts the values of the chapter's table.
"""

import math

from _ch22 import primes

SIZE = (440, 420)
ALT = {
    "zh": "两张图上下排。上图：横轴 x 从 0 到 100，青色阶梯 ψ(x) 在每个素数幂处跳 ln p，紧贴着墨色的直线 y = x 往上爬，"
          "x = 100 时 ψ = 94.0。下图：对数横轴 x 从 10 到 10⁶，青色曲线 ψ(x)/x − 1 从 −0.22 很快贴到零线上，"
          "灰色曲线 π(x) ln x / x − 1 先在 0.1 到 0.25 之间起伏，再慢慢回落，到 10⁶ 仍有 0.08。",
    "en": "Two plots, one above the other. Top: x from 0 to 100 across; the cyan staircase ψ(x) jumps by ln p at each prime "
          "power and climbs close to the ink line y = x, with ψ = 94.0 at x = 100. Bottom: x from 10 to 10⁶ on a logarithmic "
          "axis; the cyan curve ψ(x)/x − 1 rises from −0.22 and soon lies on the zero line, while the grey curve "
          "π(x) ln x / x − 1 wobbles between 0.1 and 0.25 and then falls back only slowly, still 0.08 at 10⁶.",
}

X = 10 ** 6


def draw(fig):
    t = fig.t
    ps = primes(X)
    jump = [0.0] * (X + 1)          # ln p at every prime power p^k ≤ X
    isp = [0] * (X + 1)
    for p in ps:
        isp[p] = 1
        q = p
        while q <= X:
            jump[q] += math.log(p)
            q *= p
    psi = [0.0] * (X + 1)
    pi = [0] * (X + 1)
    for n in range(1, X + 1):
        psi[n] = psi[n - 1] + jump[n]
        pi[n] = pi[n - 1] + isp[n]
    for x, val, cnt in ((10, 7.832, 4), (100, 94.045, 25), (1000, 996.681, 168), (10 ** 4, 10013.397, 1229),
                        (10 ** 5, 100051.564, 9592), (10 ** 6, 999586.597, 78498)):
        assert abs(psi[x] - val) < 5e-4 and pi[x] == cnt, x

    # ---- top: the staircase
    ax = fig.axes(52, 30, 360, 150, (0, 100), (0, 100))
    ax.grid(ys=[25, 50, 75], xs=[25, 50, 75])
    ax.xaxis(ticks=[0, 25, 50, 75, 100], size=14, label="*x*")
    ax.yaxis(ticks=[0, 50, 100], size=14)
    ax.path([(0, 0), (100, 100)], "ink", 1.8)
    ax.step([(n, psi[n]) for n in range(1, 101)], "cyan", 2.2, where="post")
    ax.text(0, 100, "ψ(*x*)", dx=8, dy=14, size=14, color="cyan")
    ax.text(60, 60, "*y* = *x*", dx=-10, dy=-12, size=14, color="ink", anchor="end", halo=True)

    # ---- bottom: the relative errors
    bx = fig.axes(52, 238, 360, 140, (10, X), (-0.25, 0.2), logx=True)
    bx.grid(ys=[-0.2, -0.1, 0.1])
    bx.xaxis(ticks=[10, 100, 1000, 10 ** 4, 10 ** 5, 10 ** 6], size=14, label="*x*")
    bx.yaxis(ticks=[-0.2, -0.1, 0, 0.1, 0.2], labels=["−0.2", "−0.1", "0", "0.1", "0.2"], size=13)
    bx.hline(0, "dim", 1.2, dash="4 3")
    grid = sorted({int(round(10 ** (1 + 5 * i / 600))) for i in range(601)})
    bx.path([(x, pi[x] * math.log(x) / x - 1) for x in grid], "dim", 2.0)
    bx.path([(x, psi[x] / x - 1) for x in grid], "cyan", 2.2)
    bx.text(10 ** 6, pi[X] * math.log(X) / X - 1, "π(*x*) ln *x* / *x* − 1", dx=-4, dy=-10, size=13, color="dim", anchor="end", halo=True)
    bx.text(10 ** 6, 0, "ψ(*x*)/*x* − 1", dx=-4, dy=22, size=13, color="cyan", anchor="end", halo=True)
    assert abs(psi[X] / X - 1) < 5e-4 and abs(pi[X] * math.log(X) / X - 1.0845) < 1e-4
