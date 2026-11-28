"""Euclidean arithmetic gives explicit escape witnesses, convergent determinants, and a depth certificate."""

from math import isqrt, prod

SIZE = (704, 356)
WRAP = True
ALT = {
    "zh": "左图上方按素数前缀生成欧几里得见证数，最后一个是 30031=59×509。下方列出 34/21 的渐近分数，"
          "相邻行列式交替取 +1、−1。右图以 N 为横轴绘出 2·4^(N+1)，阶梯首次超过 70 时 N=2，"
          "给出 70<128 的整数证书。",
    "en": "Top left, Euclid witnesses from successive prime prefixes end at 30031=59×509. Below, "
          "successive convergents of 34/21 have alternating determinants +1 and −1. Right, the "
          "staircase 2·4^(N+1) first exceeds 70 at N=2, certifying 70<128.",
}


def convergents(numerator, denominator):
    p_prev, p = 0, 1
    q_prev, q = 1, 0
    while denominator:
        coefficient, remainder = divmod(numerator, denominator)
        p_prev, p = p, coefficient*p + p_prev
        q_prev, q = q, coefficient*q + q_prev
        yield p, q
        numerator, denominator = denominator, remainder


def draw(fig):
    left, right = fig.row([344, 344], 356)
    primes = (2, 3, 5, 7, 11, 13)
    witnesses = [1 + prod(primes[:i]) for i in range(len(primes) + 1)]
    witness = witnesses[-1]
    factor = next(p for p in range(2, isqrt(witness) + 1) if witness % p == 0)
    assert (witness, factor, witness//factor) == (30031, 59, 509)
    assert all(witness % p == 1 for p in primes)

    left.text(172, 24, left.t("欧几里得逃逸链", "Euclid escape chain"), size=18, anchor="middle", weight=600)
    left.text(172, 50, "N_{S} = 1 + ∏ S", size=15, anchor="middle")
    stops = [(51, 80), (130, 80), (209, 80), (288, 80), (288, 122), (172, 122), (56, 122)]
    for (x, y), value in zip(stops, witnesses):
        left.text(x, y, str(value), anchor="middle", middle=True, size=15,
                  color="cyan" if value != witness else "magenta")
    for (x, y), (u, v) in zip(stops, stops[1:]):
        left.arrow(x + 0.34*(u-x), y + 0.34*(v-y),
                   x + 0.66*(u-x), y + 0.66*(v-y), "dim", 1.3, head=5)
    left.text(172, 153, f"{witness} = {factor} × {witness//factor}", size=17,
              anchor="middle", color="magenta", weight=600)

    fractions = list(convergents(34, 21))
    determinants = [p2*q1 - p1*q2 for (p1, q1), (p2, q2) in zip(fractions, fractions[1:])]
    assert fractions[-1] == (34, 21) and determinants == [1, -1, 1, -1, 1, -1]
    left.line(32, 175, 312, 175, "faint", 1)
    left.text(172, 207, left.t("34/21 的欧拉–沃利斯行列式", "Euler–Wallis determinants for 34/21"),
              size=16, anchor="middle", weight=600)
    for i, (p, q) in enumerate(fractions):
        x = 36 + 45*i
        left.dot(x, 261, 3.6, "cyan", ring="bg")
        left.text(x, 243, f"{p}/{q}", size=13, anchor="middle")
        if i < len(determinants):
            left.arrow(x + 6, 261, x + 38, 261, "dim", 1.2, head=5)
            sign = "+1" if determinants[i] > 0 else "−1"
            left.text(x + 22, 286, sign, size=14, color="cyan", anchor="middle")
    left.text(172, 322, "p_{n+1} q_{n} − p_{n} q_{n+1} = ±1", size=15, anchor="middle")

    target, weight = 7*10, 2*1
    limits = [(n, weight * 4**(n+1)) for n in range(3)]
    depth = next(n for n, bound in limits if target < bound)
    assert (depth, target, limits[depth][1]) == (2, 70, 128)

    right.text(172, 24, right.t("四分深度 · 整数预算", "Quarter-depth integer budget"),
               size=18, anchor="middle", weight=600)
    ax = right.axes(58, 69, 235, 167, (0, 2.9), (0, 145))
    ax.xaxis(ticks=[0, 1, 2])
    ax.yaxis(ticks=[0, 32, 70, 128])
    ax.step([*limits, (2.9, limits[-1][1])], "cyan", 2.5)
    ax.hline(target, "magenta", 1.5, dash="5 4")
    ax.points(limits, "cyan", 4.3)
    ax.text(2.9, target, "c q = 70", dy=-9, anchor="end", size=15, color="magenta")
    ax.text(2.9, 128, "2·4^{N+1}", dy=-10, anchor="end", size=15, color="cyan")
    right.text(307, 241, "N", size=14)
    right.text(172, 293, "N = 2   ⟹   70 < 128", size=19, anchor="middle", color="blue", weight=600)
    right.text(172, 322, "4² ≤ ⌊70/2⌋ < 4³", size=15, anchor="middle")
