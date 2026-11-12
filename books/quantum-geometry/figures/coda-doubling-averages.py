"""定理只管几乎所有起点：浮点数恰好落进例外集。
The theorem speaks of almost every start; floating-point starts fall exactly into the exceptions.

The doubling map T(x) = 2x mod 1 with g = 1_[0,1/2): the time average A_N g(x) is the share of 0s among the
first N binary digits. Three starts, N from 10 to 10⁶ on a log axis: binary digits drawn by Python's random
module (seed 20261111, getrandbits(1); the chapter's table of zeros is asserted here), the rational 1/3
(digits 0101…, average 1/2 for even N), and the double nearest to 0.1, iterated in floating point (exact for
this map), which reaches 0 at step 55 and then stays there, so its average tends to 1.
"""

import random

SIZE = (480, 300)
ALT = {
    "zh": "对数横轴是步数 N，从 10 到一百万；纵轴是倍乘映射的时间平均 A_N g，即前 N 位二进制数字里 0 的比例，"
          "虚线是空间平均 1/2。青色曲线是伪随机数字给出的起点，在 1/2 上下摆动，偏差时大时小；灰色的 1/3 一直贴着 1/2；"
          "品红的浮点数 0.1 在第 55 步落到 0，此后时间平均一路升向 1。",
    "en": "A log axis of steps N from 10 to one million against the time average A_N g of the doubling map, the share of 0s "
          "among the first N binary digits; a dashed line marks the space average 1/2. The cyan curve, from pseudo-random "
          "digits, swings around 1/2 with a deviation that grows and shrinks; the grey curve for 1/3 stays on 1/2; the "
          "magenta curve for the floating-point number 0.1 reaches 0 at step 55 and from then on its time average climbs "
          "towards 1.",
}

NMAX = 10 ** 6


def averages(bits):
    """A_N for every N: the share of zeros among the first N digits."""
    out, zeros = [], 0
    for n, b in enumerate(bits, 1):
        zeros += b == 0
        out.append(zeros / n)
    return out


def draw(fig):
    t = fig.t
    rng = random.Random(20261111)
    rnd = [rng.getrandbits(1) for _ in range(NMAX)]
    zeros = {n: sum(1 for b in rnd[:n] if b == 0) for n in (10, 100, 1000, 10 ** 4, 10 ** 5, 10 ** 6)}
    assert zeros == {10: 6, 100: 60, 1000: 492, 10 ** 4: 5006, 10 ** 5: 50205, 10 ** 6: 499954}
    third = [(n + 1) % 2 for n in range(NMAX)]          # 1/3 = 0.010101… in binary
    x, flt, hit = 0.1, [], None                          # T^k x for k = 0 … N−1, g(T^k x) = 1 iff T^k x < 1/2
    for k in range(NMAX):
        if x == 0 and hit is None:
            hit = k
        flt.append(0 if x < 0.5 else 1)
        x = x * 2
        if x >= 1:
            x -= 1
    assert hit == 55
    A_r, A_t, A_f = averages(rnd), averages(third), averages(flt)
    assert abs(A_t[NMAX - 1] - 0.5) < 1e-9 and A_f[NMAX - 1] > 0.9999

    ax = fig.axes(66, 22, 392, 220, (10, NMAX), (0.35, 1.02), logx=True)
    ax.grid(xs=[100, 10 ** 4], ys=[0.5, 0.75, 1.0])
    ax.xaxis(size=14, label="*N*")
    ax.yaxis(ticks=[0.5, 0.75, 1.0], labels=["1/2", "3/4", "1"], size=14, label="*A*_{*N*} *g*")
    ax.hline(0.5, "dim", 1.2, dash="5 4")
    samp = sorted({int(round(10 ** (1 + 5 * i / 400))) for i in range(401)})
    ax.path([(n, A_t[n - 1]) for n in samp], "dim", 1.8)
    ax.path([(n, A_r[n - 1]) for n in samp], "cyan", 2.0)
    ax.path([(n, A_f[n - 1]) for n in samp], "magenta", 2.2)
    ax.points([(55, A_f[54])], "magenta", 3.6)
    ax.text(55, A_f[54], t("第 55 步落到 0", "reaches 0 at step 55"), dx=4, dy=30, size=14, color="magenta")
    fig.legend(300, 96, [("cyan", t("伪随机数字", "pseudo-random digits")), ("dim", t("1/3", "1/3")), ("magenta", t("浮点数 0.1", "the float 0.1"))], size=14)
