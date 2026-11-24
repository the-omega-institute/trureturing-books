"""Two exact rational error sequences contract geometrically with increasing order."""

from fractions import Fraction

SIZE = (704, 330)
WRAP = True
ALT = {
    "zh": "对数坐标下，η=1/2 时 Cayley 截断的余弦绝对误差从 1/10 降至 1/10240，正弦误差是其两倍。"
          "不依赖 π 的 Machin 有理区间宽度从 M=1 的约 4.27×10⁻² 降至 M=17 的约 1.57×10⁻²⁵。",
    "en": "On logarithmic scales, the absolute Cayley cosine error at η=1/2 falls from 1/10 to "
          "1/10240. The sine error is twice as large. The π-free Machin bracket narrows from about "
          "4.27×10⁻² at M=1 to 1.57×10⁻²⁵ at M=17.",
}


def cayley_errors(order, eta):
    u = 1 + 2 * sum((-1)**k * eta**(2*k) for k in range(1, order//2 + 1))
    v = 2 * sum((-1)**k * eta**(2*k + 1) for k in range((order + 1)//2))
    return u - (1 - eta*eta)/(1 + eta*eta), v - 2*eta/(1 + eta*eta)


def bracket_width(order):
    power = 2*order + 1
    return Fraction(16, power * 5**power) + Fraction(4, power * 239**power)


def draw(fig):
    left, right = fig.row([344, 344], 330)
    orders = [2, 4, 6, 8, 10, 12]
    errors = [cayley_errors(n, Fraction(1, 2)) for n in orders]
    assert errors[0] == (Fraction(-1, 10), Fraction(1, 5))
    assert errors[-1] == (Fraction(1, 10240), Fraction(-1, 5120))
    assert all(v == -2*u for u, v in errors)
    widths = [(m, bracket_width(m)) for m in range(1, 18)]
    assert widths[0][1] == Fraction(218431204, 5119469625)
    assert f"{float(widths[-1][1]):.2e}" == "1.57e-25"

    left.text(172, 24, left.t("Cayley 截断 · η = 1/2", "Cayley truncation · η = 1/2"),
              size=18, anchor="middle", weight=600)
    ax = left.axes(54, 62, 246, 174, (1.6, 12.5), (5e-5, 0.6), logy=True)
    ax.xaxis(ticks=orders)
    ax.yaxis(ticks=[1e-4, 1e-3, 1e-2, 1e-1], labels=["10⁻⁴", "10⁻³", "10⁻²", "10⁻¹"])
    ax.grid(ys=[1e-4, 1e-3, 1e-2, 1e-1])
    for component, role in enumerate(("cyan", "violet")):
        points = [(n, abs(pair[component])) for n, pair in zip(orders, errors)]
        ax.path(points, role, 2)
        ax.points(points, role, 3.5)
    ax.text(2, abs(errors[0][0]), "1/10", dx=13, dy=18, size=14, color="cyan", halo=True)
    ax.text(12, abs(errors[-1][0]), "1/10240", dx=-9, dy=5, anchor="end", size=14, color="cyan", halo=True)
    left.text(319, 242, "N", size=14)
    left.legend(42, 288, [("cyan", left.t("余弦绝对误差", "Abs. cosine error"))], size=14)
    left.legend(188, 288, [("violet", left.t("正弦绝对误差", "Abs. sine error"))], size=14)

    right.text(172, 24, right.t("无 π 的 Machin 区间宽度", "π-free Machin bracket width"),
               size=18, anchor="middle", weight=600)
    ax = right.axes(58, 62, 242, 174, (0.6, 17.6), (3e-27, 1), logy=True)
    ticks = [1e-24, 1e-18, 1e-12, 1e-6, 1]
    ax.xaxis(ticks=[1, 5, 9, 13, 17])
    ax.yaxis(ticks=ticks, labels=["10⁻²⁴", "10⁻¹⁸", "10⁻¹²", "10⁻⁶", "1"])
    ax.grid(ys=ticks)
    ax.path(widths, "cyan", 2)
    ax.points(widths, "cyan", 3)
    ax.text(*widths[0], "4.27 × 10⁻²", dx=11, dy=-7, size=14, color="cyan")
    ax.text(*widths[-1], "1.57 × 10⁻²⁵", dx=-10, dy=4, size=14, anchor="end", color="cyan", halo=True)
    right.text(319, 242, "M", size=14)
    right.text(172, 289, "W_{M} = U_{M} − L_{M}", size=17, anchor="middle")
