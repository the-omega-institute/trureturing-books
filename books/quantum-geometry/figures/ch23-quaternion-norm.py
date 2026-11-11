"""四元数也被同一把锁锁住：哈密顿整四元数在 Nrd = 1、2、3、4 上只有有限几个，迹 2x₀ 只取有限几个整数。
Quaternions are held by the same lock: integer Hamilton quaternions with Nrd = 1, 2, 3, 4 are finitely
many, and their trace 2x₀ takes only a few integers.

The example takes a = b = −1 (Hamilton quaternions), so Nrd(α) = x₀² + x₁² + x₂² + x₃². A quaternion
is drawn at (x₀, |v|) with v = (x₁, x₂, x₃): the horizontal coordinate is half the trace, the height
the length of the vector part, and Nrd = n is the half circle of radius √n. Every point is found by
search over integer quadruples; the number of quaternions on each circle is counted (8, 24, 32, 24,
asserted against Jacobi's formula 8·Σ_{4∤d|n} d).
"""

import itertools
import math

SIZE = (520, 300)
ALT = {
    "zh": "以 a = b = −1（哈密顿四元数）为例。横轴是标量部 x₀，也就是迹的一半，纵轴是向量部的长度 |v|。"
          "四个青色的半圆是约化范数 Nrd = 1、2、3、4。每个整四元数落在某个半圆与竖线 x₀ = 整数的交点上；"
          "点旁的数是落在这一点的整四元数个数，四个半圆上分别一共 8、24、32、24 个。半圆之间没有点，迹 2x₀ 只取 −4 到 4 的偶数。",
    "en": "The example takes a = b = −1 (Hamilton quaternions). The horizontal axis is the scalar part x₀, half the trace; "
          "the vertical axis is the length |v| of the vector part. Four cyan half circles are the reduced norms "
          "Nrd = 1, 2, 3, 4. Every integer quaternion sits where a half circle meets a vertical line x₀ = integer; the "
          "number beside a point counts the quaternions there, 8, 24, 32 and 24 on the four half circles. No point lies "
          "between the circles, and the trace 2x₀ takes only the even numbers from −4 to 4.",
}

NMAX = 4
CX, BASE, S = 286, 222, 84


def quaternions():
    """{(x₀, |v|²): count} for integer quaternions with 1 ≤ Nrd ≤ NMAX."""
    out = {}
    for q in itertools.product(range(-2, 3), repeat=4):
        n = sum(c * c for c in q)
        if 1 <= n <= NMAX:
            key = (q[0], n - q[0] * q[0])
            out[key] = out.get(key, 0) + 1
    return out


def draw(fig):
    t = fig.t
    pts = quaternions()
    per_n = {n: sum(c for (x0, m), c in pts.items() if x0 * x0 + m == n) for n in range(1, NMAX + 1)}
    jacobi = {n: 8 * sum(d for d in range(1, n + 1) if n % d == 0 and d % 4) for n in range(1, NMAX + 1)}
    assert per_n == jacobi == {1: 8, 2: 24, 3: 32, 4: 24}

    X = lambda x0: CX + S * x0
    Y = lambda h: BASE - S * h

    fig.line(X(-2.45), BASE, X(2.45), BASE, "dim", 1.3)
    for x0 in range(-2, 3):
        fig.line(X(x0), BASE, X(x0), Y(2.05), "faint", 1.0, dash="2 4")
        fig.line(X(x0), BASE, X(x0), BASE + 5, "dim", 1.2)
        fig.text(X(x0), BASE + 20, str(x0).replace("-", "−"), size=13, color="dim", anchor="middle")
        fig.text(X(x0), BASE + 44, str(2 * x0).replace("-", "−"), size=13, color="line", anchor="middle")
    fig.text(X(-2.45) - 8, BASE + 20, "*x*_{0}", size=14, color="dim", anchor="end")
    fig.text(X(-2.45) - 8, BASE + 44, t("迹 2*x*_{0}", "trace 2*x*_{0}"), size=13, color="line", anchor="end")
    fig.line(X(0), BASE, X(0), Y(2.2), "dim", 1.3)
    fig.text(X(0) - 8, Y(2.2) + 6, "|*v*|", size=14, color="dim", anchor="end")

    for n in range(1, NMAX + 1):
        r = math.sqrt(n)
        fig.arc(CX, BASE, S * r, 0, 180, "line", 1.8)
    for n in range(1, NMAX + 1):
        a = math.radians(112 if n == 1 else 160)
        r = math.sqrt(n) * S
        fig.text(CX + r * math.cos(a), BASE - r * math.sin(a), f"{n}", size=14, color="line", anchor="middle",
                 middle=True, weight=600, halo=True)
    fig.text(X(-2.12), Y(0.5), "Nrd", size=14, color="line", anchor="end", weight=600)

    for (x0, m), c in sorted(pts.items()):
        x, y = X(x0), Y(math.sqrt(m))
        fig.dot(x, y, 4.8, "line", ring="bg")
        fig.text(x + 8, y - 7 if m else y - 9, f"{c}", size=13, color="ink", halo=True)
