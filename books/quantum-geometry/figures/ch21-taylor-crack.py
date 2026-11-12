"""有限项的余弦多项式贴不住 cos θ：每多一项，裂缝推远一些，但永远留着（第二十一章 §21.3）。
A cosine polynomial with finitely many terms does not hold on to cos θ: each extra term pushes the crack
further out, but it never closes (chapter 21, §21.3).

The polynomials are T_N(θ) = Σ_{k<N} (−1)^k θ^{2k}/(2k)!, N = 2, 3, 4. The script checks the actual remainders
|R_{2N}(θ*)| and the bound (θ*)^{2N}/(2N)! · e^{θ*} at the cosine fixed point against the table of
ex-taylor-remainder-three-bounds.
"""

import math

SIZE = (440, 300)
ALT = {
    "zh": "坐标图，横轴 θ 从 0 到 3.5，纵轴从 −1.6 到 1.3。墨色的粗曲线是 cos θ。三条青色曲线是只取前 N 项的余弦多项式，N = 2、3、4："
          "在 θ 小时都与 cos θ 重合，往右依次在越来越远处离开它。N = 3 那条与 cos θ 之间的缝涂成品红，标着 R₆(θ)；"
          "它在左端薄得看不见，往右越张越大。",
    "en": "A plot with θ across from 0 to 3.5 and values from −1.6 to 1.3. The thick ink curve is cos θ. Three cyan curves are "
          "the cosine polynomials with the first N terms, N = 2, 3, 4: for small θ all lie on cos θ, and to the right they "
          "leave it one after another, each further out. The gap between the N = 3 curve and cos θ is shaded magenta and "
          "labelled R₆(θ); at the left it is too thin to see, to the right it opens wider and wider.",
}


def poly(N, x):
    return sum((-1) ** k * x ** (2 * k) / math.factorial(2 * k) for k in range(N))


def check_table():
    th = 0.7390851332151607                                      # cos θ* = θ*
    assert abs(math.cos(th) - th) < 1e-12
    actual = [2.61e-1, 1.22e-2, 2.24e-4, 2.19e-6, 1.33e-8, 5.53e-11]
    lagrange = [2.73e-1, 1.24e-2, 2.26e-4, 2.21e-6, 1.34e-8, 5.55e-11]
    verified = [5.72e-1, 2.60e-2, 4.74e-4, 4.62e-6, 2.81e-8, 1.16e-10]
    for N in range(1, 7):
        r = abs(math.cos(th) - poly(N, th))
        lg = th ** (2 * N) / math.factorial(2 * N)
        assert abs(r / actual[N - 1] - 1) < 0.01, (N, r)
        assert abs(lg / lagrange[N - 1] - 1) < 0.01, (N, lg)
        assert abs(lg * math.exp(th) / verified[N - 1] - 1) < 0.01, (N, lg * math.exp(th))
        assert 0 < r <= lg                                          # strictly positive, inside the bound


def draw(fig):
    t = fig.t
    check_table()
    ax = fig.axes(52, 24, 368, 232, (0, 3.5), (-1.6, 1.3))
    ax.grid(ys=[-1, 1])
    ax.hline(0, "faint", 1.2)
    ax.xaxis(ticks=[0, math.pi / 2, math.pi], labels=["0", "π/2", "π"], label="θ", size=14)
    ax.yaxis(ticks=[-1, 0, 1], labels=["−1", "0", "1"], size=14)
    pts = []
    n = 200
    for i in range(n + 1):
        x = 3.5 * i / n
        pts.append((x, math.cos(x), poly(3, x)))
    gap = [ax.pt(x, c) for x, c, _ in pts] + [ax.pt(x, p) for x, _, p in reversed(pts)]
    fig.polygon(gap, "area", fill_opacity=0.24)
    for N in (2, 3, 4):
        ax.plot(lambda x, N=N: poly(N, x), color="line", width=1.8)
    ax.plot(math.cos, color="ink", width=2.8)
    # labels where each polynomial leaves the plot or ends
    ax.text(math.sqrt(2 * 2.6), -1.6, "*N* = 2", dx=-12, dy=-6, size=14, color="line", anchor="end")
    ax.text(3.5, poly(3, 3.5), "*N* = 3", dx=-8, dy=-2, size=14, color="line", anchor="end")
    assert -1.6 < poly(4, 3.5) < math.cos(3.5)                    # N = 4 stays in the frame, below cos θ
    ax.text(3.5, -1.6, "*N* = 4", dx=-6, dy=-6, size=14, color="line", anchor="end")
    ax.text(0.5, 1.0, "cos θ", dy=-12, size=14, anchor="middle")
    xm = 3.0
    ax.text(xm, (math.cos(xm) + poly(3, xm)) / 2, "*R*_{6}(θ)", size=14, color="area", anchor="middle", halo=True)
