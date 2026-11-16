"""范数一旦钉在整数上，迹就只剩几个整数可取：艾森斯坦整数在 N = 1 与 N = 3 两个圆上的迹。
Once the norm is pinned to an integer, the trace has only a few integers left: the traces of the
Eisenstein integers on the circles N = 1 and N = 3.

The lattice is x + y·e^{iπ/3}; N = x² + xy + y² is the squared distance from 0 and the trace is
g + ḡ = 2 Re g. The points on each circle are found by search, and their traces (asserted) are
{−2, −1, 1, 2} for N = 1 and {−3, 0, 3} for N = 3. Each lattice point on a circle drops a dashed line
onto a ruler below, read in units of Tr = 2 Re.
"""

from _ch23 import eis, eis_norm, lattice

SIZE = (420, 344)
ALT = {
    "zh": "复平面上的艾森斯坦整数排成六角格（灰点）。两个青色的圆是范数 N = 1 与 N = 3，分别穿过 6 个格点。"
          "每个格点向下引一条虚线，落到下面的两把迹尺上：N = 1 的六个点只落在迹 −2、−1、1、2 上，N = 3 的六个点只落在 −3、0、3 上。"
          "范数固定之后，迹只能取有限几个整数。",
    "en": "Eisenstein integers form a hexagonal lattice in the complex plane (grey dots). Two cyan circles are the norms "
          "N = 1 and N = 3, each through six lattice points. From each point a dashed line drops to one of two trace "
          "rulers below: the six points of N = 1 land only on traces −2, −1, 1, 2, the six of N = 3 only on −3, 0, 3. "
          "Once the norm is fixed, the trace can take only a few integers.",
}

CX, CY, S = 252, 132, 56


def P(x, y):
    px, py = eis(x, y)
    return CX + S * px, CY - S * py


def draw(fig):
    t = fig.t
    pts = lattice(2.45)
    on = {n: sorted({(x, y) for x, y in pts if eis_norm(x, y) == n}) for n in (1, 3)}
    assert len(on[1]) == 6 and len(on[3]) == 6
    traces = {n: sorted({round(2 * eis(*p)[0]) for p in on[n]}) for n in on}
    for n in on:
        for p in on[n]:
            assert abs(2 * eis(*p)[0] - round(2 * eis(*p)[0])) < 1e-9      # the trace is an integer
    assert traces[1] == [-2, -1, 1, 2] and traces[3] == [-3, 0, 3]

    rows = {1: 264, 3: 314}
    ruler_x = lambda tr: CX + S * tr / 2

    # the real axis and the lattice
    fig.line(CX - S * 2.4, CY, CX + S * 2.4, CY, "faint", 1.2)
    fig.text(CX + S * 2.4 + 4, CY, "Re", size=14, color="dim", middle=True)
    for p in pts:
        if eis_norm(*p) not in (1, 3):
            fig.dot(*P(*p), 2.6, "faint")

    # drops from the lowest point at each abscissa down to its ruler
    for n in (1, 3):
        lowest = {}
        for p in on[n]:
            x, y = P(*p)
            k = round(x)
            if k not in lowest or y > lowest[k]:
                lowest[k] = y
        for x, y in lowest.items():
            fig.line(x, y + 4, x, rows[n] - 8, "dim", 1.1, dash="3 4")

    for n, label in ((1, "*N* = 1"), (3, "*N* = 3")):
        fig.circle(CX, CY, S * n ** 0.5, color="line", width=2.0)
        for p in on[n]:
            fig.dot(*P(*p), 4.6, "line", ring="bg")
    fig.dot(CX, CY, 3.0, "dim")
    fig.text(CX, CY - S * 0.45, "*N* = 1", size=14, color="line", anchor="middle", middle=True)
    fig.text(CX + S * 1.55, CY - S * 1.42, "*N* = 3", size=14, color="line", halo=True)

    # the two trace rulers
    for n, y in rows.items():
        fig.line(ruler_x(-3.6), y, ruler_x(3.6), y, "dim", 1.2)
        for tr in range(-3, 4):
            fig.line(ruler_x(tr), y - 4, ruler_x(tr), y + 4, "faint", 1.2)
        for tr in traces[n]:
            fig.dot(ruler_x(tr), y, 5.0, "line", ring="bg")
            fig.text(ruler_x(tr), y + 20, str(tr).replace("-", "−"), size=14, color="line", anchor="middle")
        fig.text(14, y, t(f"*N* = {n} 的迹", f"trace at *N* = {n}"), size=14, color="dim", middle=True)
    fig.text(ruler_x(3.6) + 6, rows[1], "Tr", size=14, color="dim", middle=True)
