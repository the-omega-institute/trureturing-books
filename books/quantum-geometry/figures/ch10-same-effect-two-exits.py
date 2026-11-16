"""相同的效应元，不同的出口态：投影仪器 K = P₀ 与翻转仪器 L = X P₀（第十章 §保留仪器）。
Same effect, different exits: the projective instrument K = P₀ and the flipped one L = X P₀ (chapter 10).

Both rows start from the north pole P₀ and record the outcome "false". The script computes, with 2 × 2 complex
matrices, that the two effects K*K and L*L are both P₀ (and that both instruments sum to I), that the exit
states are K P₀ K* = P₀ (still the north pole) and L P₀ L* = I − P₀ (the south pole), and that the second shutter
I − P₀ reads Tr(branch · (I − P₀)) = 0 and 1: the proposition the chapter cites with lean=.
"""

from _ch10 import title

SIZE = (500, 340)
ALT = {
    "zh": "两行，同一个开始。每行左边是一颗小球，琥珀色的点在北极 N。中间是同一个青色的框“效应 E = P₀”，两行一模一样，"
          "旁边写着单看概率两台仪器分不出来。右边是出口态：上一行投影仪器 K = P₀ 让点留在北极；下一行翻转仪器 L = X P₀ "
          "把点翻到南极。最右是第二道快门 I − P₀ 的读数：上一行 0，下一行 1。底部一枚绿色标签 LEAN ✓。",
    "en": "Two rows with the same start. On the left of each row a small sphere with the amber point at the north pole N. In the "
          "middle the same cyan box “effect E = P₀”, identical in both rows, with a note that the probabilities alone cannot "
          "tell the two instruments apart. On the right the exit state: in the top row the projective instrument K = P₀ "
          "leaves the point at the north pole; in the bottom row the flipped instrument L = X P₀ turns it over to the south "
          "pole. Far right, the reading of the second shutter I − P₀: 0 in the top row, 1 in the bottom row. A green LEAN ✓ "
          "tag sits at the bottom.",
}

I2 = ((1 + 0j, 0j), (0j, 1 + 0j))
P0 = ((1 + 0j, 0j), (0j, 0j))
X = ((0j, 1 + 0j), (1 + 0j, 0j))


def mul(a, b):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)) for i in range(2))


def add(a, b, s=1):
    return tuple(tuple(a[i][j] + s * b[i][j] for j in range(2)) for i in range(2))


def dag(a):
    return tuple(tuple(a[j][i].conjugate() for j in range(2)) for i in range(2))


def tr(a):
    return a[0][0] + a[1][1]


def same(a, b):
    return all(abs(a[i][j] - b[i][j]) < 1e-12 for i in range(2) for j in range(2))


SECOND = add(I2, P0, -1)                       # the second shutter I − P₀
K = {False: P0, True: SECOND}                  # projectiveKraus
L = {b: mul(X, K[b]) for b in (False, True)}   # flippedKraus = X · projectiveKraus
for b in (False, True):
    assert same(mul(dag(K[b]), K[b]), mul(dag(L[b]), L[b]))
assert same(add(mul(dag(K[False]), K[False]), mul(dag(K[True]), K[True])), I2)
assert same(add(mul(dag(L[False]), L[False]), mul(dag(L[True]), L[True])), I2)
EFFECT = mul(dag(K[False]), K[False])
assert same(EFFECT, P0)
EXIT_K = mul(mul(K[False], P0), dag(K[False]))
EXIT_L = mul(mul(L[False], P0), dag(L[False]))
assert same(EXIT_K, P0) and same(EXIT_L, SECOND)
READ = (tr(mul(EXIT_K, SECOND)).real, tr(mul(EXIT_L, SECOND)).real)
assert READ == (0.0, 1.0)


def ball(fig, cx, cy, north):
    """A small Bloch sphere with the state at the north pole (north=True) or at the south pole."""
    sp = fig.sphere(cx, cy, 30, el=18)
    sp.outline()
    sp.small_circle((0, 0, 1), 90, "faint", 1.0)
    sp.segment((0, 0, -1), (0, 0, 1), "faint", 1.0, dash="3 3")
    v = (0.0, 0.0, 1.0 if north else -1.0)
    sp.arrow(v, "now", 2.2)
    sp.dot(v, "now", 4.6, ring="bg")
    sp.label((0, 0, 1), "*N*", dx=8, dy=-4, size=14, color="dim")
    return sp


def draw(fig):
    title(fig, "相同的效应，不同的出口", "Same effect, different exits")
    rows = ((118, fig.t("投影仪器 K = P₀", "projective K = P₀"), True, READ[0]),
            (242, fig.t("翻转仪器 L = X P₀", "flipped L = X P₀"), False, READ[1]))
    fig.text(50, 60, fig.t("初态", "start"), size=14, color="dim", anchor="middle")
    fig.text(178, 60, fig.t("结果 false 的效应", "effect of “false”"), size=14, color="dim", anchor="middle")
    fig.text(330, 60, fig.t("出口态", "exit state"), size=14, color="dim", anchor="middle")
    fig.text(450, 60, "I − P₀", size=14, color="dim", anchor="middle")
    for y, name, north, read in rows:
        ball(fig, 50, y, True)
        fig.arrow(86, y, 124, y, "dim", 1.4)
        fig.rect(126, y - 17, 104, 34, color="line", fill="line", fill_opacity=0.12, width=1.6, rx=5)
        fig.text(178, y + 5, "*E* = *P*₀", size=15, color="line", anchor="middle")
        fig.arrow(232, y, 290, y, "dim", 1.4)
        fig.text(178, y - 26, name, size=14, color="ink", anchor="middle")
        ball(fig, 330, y, north)
        fig.text(330, y + 50, fig.t("留在北极", "stays at the north pole") if north else fig.t("翻到南极", "turned to the south pole"),
                 size=14, color="now", anchor="middle")
        fig.arrow(366, y, 420, y, "dim", 1.4)
        fig.text(450, y + 9, f"{read:.0f}", size=26, weight=700, color="ink", anchor="middle")
    fig.text(178, 188, fig.t("两行一样", "identical"), size=14, color="line", anchor="middle")
    fig.chip(450, 292, "LEAN ✓", "lean", anchor="middle", size=14)
