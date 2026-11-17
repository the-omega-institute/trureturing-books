"""复算“比较公理与极小圆弧体微积分”研究笔记中的恒等式、界与反例；依赖 numpy、sympy、mpmath，不代替普遍证明。

运行：python3 docs/project/arc_comparison_gap_check.py
每一节打印所核对的命题编号与最大偏差；任何断言失败即非零退出。
"""

from itertools import product
import math

import mpmath as mp
import numpy as np
import sympy as sp


RNG = np.random.default_rng(20261117)
TOL = 1e-11
REPORT = []


def record(tag, value, note=""):
    REPORT.append((tag, float(value), note))


def dagger(a):
    return a.conj().T


def adj2(a):
    """2x2 经典伴随：a @ adj2(a) = det(a) * I。"""
    return np.trace(a) * np.eye(2) - a


def random_unitary(n):
    z = RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))
    q, r = np.linalg.qr(z)
    return q * (np.diag(r) / np.abs(np.diag(r)))


def random_sl2c():
    while True:
        a = RNG.normal(size=(2, 2)) + 1j * RNG.normal(size=(2, 2))
        d = np.linalg.det(a)
        if abs(d) > 0.2:
            return a / np.sqrt(d)


def parity_parts(u, star):
    s = (u + star(u)) / 2
    a = (u - star(u)) / 2
    return s, a


# ---------------------------------------------------------------------------
# P1  公平元的奇偶分解：对易、S^2 - A^2 = 1、A^2 = -v(2 - v)、Delta* Delta = 2v
# ---------------------------------------------------------------------------
def check_p1():
    worst = 0.0
    samples = [(random_unitary(n), dagger) for n in (2, 3, 5) for _ in range(40)]
    samples += [(random_sl2c(), adj2) for _ in range(120)]
    for u, star in samples:
        one = np.eye(u.shape[0])
        assert np.allclose(u @ star(u), one, atol=1e-9)
        assert np.allclose(star(u) @ u, one, atol=1e-9)
        s, a = parity_parts(u, star)
        v = one - s
        delta = u - one
        worst = max(
            worst,
            np.abs(s @ a - a @ s).max(),
            np.abs(s @ s - a @ a - one).max(),
            np.abs(a @ a + v @ (2 * one - v)).max(),
            np.abs(star(delta) @ delta - 2 * v).max(),
            np.abs(delta @ star(delta) - 2 * v).max(),
        )
    assert worst < 1e-9, worst
    record("P1 公平元恒等式（酉矩阵与 SL(2,C)，共 240 例）", worst)

    # 只有单侧公平时，对易可以失败：截断的单侧移位给出 u u* = 1 而 u* u != 1 的有限维近似不存在，
    # 这里改用符号核对“两侧公平 => 对易”的推导本身。
    S, A = sp.symbols("S A", commutative=False)
    left = sp.expand((S + A) * (S - A))
    right = sp.expand((S - A) * (S + A))
    assert sp.expand(right - left) == sp.expand(2 * (S * A - A * S))
    assert sp.expand(left + right) == sp.expand(2 * (S * S - A * A))


# ---------------------------------------------------------------------------
# P2 / P3  矢高分类：对偶数、分裂复数、椭圆；(M_2(C), adj) 中的四类
# ---------------------------------------------------------------------------
def classify(v, tol=1e-9):
    if abs(v.imag) > tol:
        return "loxodromic"
    x = v.real
    if abs(x) < tol or abs(x - 2) < tol:
        return "parabolic"
    return "elliptic" if 0 < x < 2 else "hyperbolic"


def check_p2_p3():
    eps = np.array([[0, 1], [0, 0]], dtype=complex)  # 对偶数 epsilon
    j = np.diag([1, -1]).astype(complex)  # 分裂复数 j
    i2 = np.diag([1j, -1j])  # 椭圆生成元
    eta, theta = 0.7, 0.9
    models = {
        "parabolic": np.eye(2) + eps,
        "hyperbolic": math.cosh(eta) * np.eye(2) + math.sinh(eta) * j,
        "elliptic": math.cos(theta) * np.eye(2) + math.sin(theta) * i2,
        "loxodromic": np.diag([1.3 * np.exp(0.4j), 1 / (1.3 * np.exp(0.4j))]),
    }
    worst = 0.0
    for expected, u in models.items():
        assert np.allclose(u @ adj2(u), np.eye(2))
        s, a = parity_parts(u, adj2)
        assert np.allclose(s, s[0, 0] * np.eye(2))  # S 恒为中心标量
        v = 1 - s[0, 0]
        assert classify(v) == expected, (expected, v)
        worst = max(worst, np.abs(a @ a + v * (2 - v) * np.eye(2)).max())
    # 生成元的对合符号与平方
    for g, sq in ((eps, 0), (j, 1), (i2, -1)):
        assert np.allclose(adj2(g), -g)
        assert np.allclose(g @ g, sq * np.eye(2))
    # 同时对 dagger 公平 => SU(2) => 只剩椭圆
    for _ in range(200):
        u = random_unitary(2)
        u = u / np.sqrt(np.linalg.det(u))
        assert np.allclose(adj2(u), dagger(u))
        v = 1 - np.trace(u) / 2
        assert abs(v.imag) < 1e-9 and -1e-9 <= v.real <= 2 + 1e-9
    # 随机 SL(2,C)：迹判别与矢高判别一致；洛伦兹形式 det X 守恒
    for _ in range(300):
        u = random_sl2c()
        t = RNG.normal(size=4)
        x = np.array([[t[0] + t[3], t[1] - 1j * t[2]], [t[1] + 1j * t[2], t[0] - t[3]]])
        y = u @ x @ dagger(u)
        assert np.allclose(y, dagger(y))
        worst = max(worst, abs(np.linalg.det(y) - np.linalg.det(x)))
    assert worst < 1e-9, worst
    record("P2/P3 矢高四分类与 det 守恒", worst)

    # 负自配对的排除：a* a = -t (t >= 0) 的存在性。分裂复数 j 给出 j* j = -1。
    assert np.allclose(adj2(j) @ j, -np.eye(2))
    assert np.allclose(adj2(eps) @ eps, 0 * np.eye(2))  # 非真对合：a* a = 0 而 a != 0


# ---------------------------------------------------------------------------
# P4  第三点冗余 => 锚定表示；附录 E 反例 (a)、(d) 违反链式律
# ---------------------------------------------------------------------------
def check_p4():
    n, m = 4, 7
    g = [random_unitary(n) for _ in range(m)]
    c = [[dagger(g[i]) @ g[k] for k in range(m)] for i in range(m)]
    worst = 0.0
    for i, k, l in product(range(m), repeat=3):
        worst = max(worst, np.abs(c[i][k] @ c[k][l] - c[i][l]).max())
    # 由 c 恢复锚定：g'_x = c(o, x) 与 g 只差一个左乘的固定酉元
    o = 2
    h = [c[o][x] for x in range(m)]
    for x, y in product(range(m), repeat=2):
        worst = max(worst, np.abs(dagger(h[x]) @ h[y] - c[x][y]).max())
        worst = max(worst, np.abs(h[x] - dagger(g[o]) @ g[x]).max())
    assert worst < 1e-9, worst
    record("P4 链式律与锚定表示", worst)

    # 反例 (a)：单点 CMP = -1，往返为 +1，但链式律要求 c*c = c
    ca = -1.0
    assert ca * ca == 1.0 and ca * ca != ca
    # 反例 (d)：U(1) 实现 e^{i pi/6}, e^{i pi/6}, -1，三点和乐为 -1
    u01 = np.exp(1j * math.pi / 6)
    u02 = np.exp(1j * math.pi / 6)
    u12 = -1.0
    hol = u01 * u12 * np.conj(u02)
    assert abs(hol + 1) < 1e-12
    s = np.array([[1, u01.real, u02.real], [u01.real, 1, -1], [u02.real, -1, 1]])
    eig = np.linalg.eigvalsh(s)
    assert abs(np.linalg.det(s) + 3) < 1e-12
    assert abs(eig[0] - (1 - math.sqrt(7)) / 2) < 1e-12
    record("附录 E 反例 (d) 的三点和乐 + 1", abs(hol + 1), "和乐为 -1，det S = -3")


# ---------------------------------------------------------------------------
# P5  平坦 + 正泛函 => Gram 半正定；弦距平方 = 2 * 矢高读数
# ---------------------------------------------------------------------------
def check_p5():
    worst = 0.0
    min_eig = np.inf
    for n, m in ((2, 6), (3, 8), (4, 9)):
        for _ in range(30):
            g = [random_unitary(n) for _ in range(m)]
            z = RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))
            rho = z @ dagger(z)
            rho = rho / np.trace(rho).real
            phi = lambda a: np.trace(rho @ a)
            k = np.array([[phi(dagger(g[i]) @ g[l]) for l in range(m)] for i in range(m)])
            gram = k.real
            min_eig = min(min_eig, np.linalg.eigvalsh(gram).min(), np.linalg.eigvalsh(k).min())
            # GNS 向量 xi_x = g_x rho^{1/2}（Hilbert–Schmidt 内积）
            w, vec = np.linalg.eigh(rho)
            root = vec @ np.diag(np.sqrt(np.clip(w, 0, None))) @ dagger(vec)
            xi = [gx @ root for gx in g]
            for i, l in product(range(m), repeat=2):
                c = dagger(g[i]) @ g[l]
                v = np.eye(n) - (c + dagger(c)) / 2
                d2 = 2 * phi(v).real
                worst = max(worst, abs(d2 - np.linalg.norm(xi[l] - xi[i]) ** 2))
            # 弦距三角不等式
            d = np.array([[np.linalg.norm(xi[l] - xi[i]) for l in range(m)] for i in range(m)])
            for i, l, r in product(range(m), repeat=3):
                assert d[i, r] <= d[i, l] + d[l, r] + 1e-9
    assert min_eig > -1e-9, min_eig
    assert worst < 1e-9, worst
    record("P5 Gram 最小特征值（应 >= 0）", min_eig)
    record("P5 弦距平方 = 2 phi(v)", worst)

    # 逆向：任给单位向量组，Clifford 比较 x y（此处用泡利矩阵实现 Cl_3）平坦且读数为内积
    sig = pauli()
    xs = RNG.normal(size=(6, 3))
    xs /= np.linalg.norm(xs, axis=1, keepdims=True)
    mats = [sum(x[k] * sig[k] for k in range(3)) for x in xs]
    back = 0.0
    for i, l, r in product(range(6), repeat=3):
        back = max(back, np.abs(mats[i] @ mats[l] @ mats[l] @ mats[r] - mats[i] @ mats[r]).max())
    for i, l in product(range(6), repeat=2):
        back = max(back, abs(np.trace(mats[i] @ mats[l]).real / 2 - xs[i] @ xs[l]))
    assert back < 1e-9
    record("P5 逆向：Clifford 比较的平坦性与读数", back)


def pauli():
    return [
        np.array([[0, 1], [1, 0]], dtype=complex),
        np.array([[0, -1j], [1j, 0]], dtype=complex),
        np.array([[1, 0], [0, -1]], dtype=complex),
    ]


# ---------------------------------------------------------------------------
# P6  半比较的和乐 = 吉拉尔角盈；全比较平坦
# ---------------------------------------------------------------------------
def girard_excess(a, b, c):
    def angle_at(p, q, r):
        tq = q - (q @ p) * p
        tr = r - (r @ p) * p
        return math.acos(np.clip(tq @ tr / (np.linalg.norm(tq) * np.linalg.norm(tr)), -1, 1))

    return angle_at(a, b, c) + angle_at(b, c, a) + angle_at(c, a, b) - math.pi


def check_p6():
    sig = pauli()
    to_m = lambda x: sum(x[k] * sig[k] for k in range(3))
    worst_flat = worst_id = worst_tan = worst_transport = worst_barg = 0.0
    for _ in range(400):
        a, b, c = RNG.normal(size=(3, 3))
        a, b, c = (x / np.linalg.norm(x) for x in (a, b, c))
        if np.linalg.det(np.array([a, b, c])) < 0:
            b, c = c, b
        ma, mb, mc = map(to_m, (a, b, c))
        one = np.eye(2)
        worst_flat = max(worst_flat, np.abs(ma @ mb @ mb @ mc @ mc @ ma - one).max())

        def half(mx, my, x, y):
            return (one + mx @ my) / math.sqrt(2 * (1 + x @ y))

        rab, rbc, rca = half(ma, mb, a, b), half(mb, mc, b, c), half(mc, ma, c, a)
        worst_id = max(worst_id, np.abs(rab @ rab - ma @ mb).max())
        worst_transport = max(worst_transport, np.abs(rab @ mb @ dagger(rab) - ma).max())
        hol = rab @ rbc @ rca
        worst_transport = max(worst_transport, np.abs(hol @ ma @ dagger(hol) - ma).max())
        sigma = 1 + a @ b + b @ c + c @ a
        triple = a @ np.cross(b, c)
        norm2 = 2 * (1 + a @ b) * (1 + b @ c) * (1 + c @ a)
        worst_id = max(worst_id, abs(sigma**2 + triple**2 - norm2))
        omega = girard_excess(a, b, c)
        worst_tan = max(worst_tan, abs(2 * math.atan2(triple, sigma) - omega))
        worst_tan = max(worst_tan, abs(np.trace(hol).real / 2 - math.cos(omega / 2)))
        # 冻结定理 triple_bargmann_bloch 的同一分子
        pa, pb, pc = ((one + m) / 2 for m in (ma, mb, mc))
        worst_barg = max(worst_barg, abs(np.trace(pa @ pb @ pc) - (sigma + 1j * triple) / 4))
    for tag, val in (
        ("P6 全比较三点闭环 = 1", worst_flat),
        ("P6 半旋子平方与范数恒等式", worst_id),
        ("P6 半旋子输运与和乐保持顶点", worst_transport),
        ("P6 tan(Omega/2) 公式对照吉拉尔角盈", worst_tan),
        ("P6 三点巴格曼迹分子", worst_barg),
    ):
        assert val < 1e-8, (tag, val)
        record(tag, val)


# ---------------------------------------------------------------------------
# P7  圆的坐标环在单位元处的 m-进滤过：m^2 = (v)，m^3 = (cv, v^2)
# ---------------------------------------------------------------------------
def check_p7():
    c, v = sp.symbols("c v")
    rel = c**2 - v * (2 - v)

    def contains(gens, f):
        gb = sp.groebner(gens, c, v, order="grevlex")
        return gb.contains(sp.expand(f))

    def same_ideal(g1, g2):
        return all(contains(g1, f) for f in g2) and all(contains(g2, f) for f in g1)

    def quotient_dim(gens):
        gb = sp.groebner(gens, c, v, order="grevlex")
        leads = [sp.Poly(g, c, v).monoms(order="grevlex")[0] for g in gb.exprs]
        count = 0
        for i, k in product(range(12), repeat=2):
            if not any(i >= a and k >= b for a, b in leads):
                count += 1
        return count

    m1 = [c, v]
    m2 = [c**2, c * v, v**2]
    m3 = [c**3, c**2 * v, c * v**2, v**3]
    assert same_ideal(m2 + [rel], [v, rel])  # m^2 = (v)
    assert same_ideal(m3 + [rel], [c * v, v**2, rel])  # m^3 = (cv, v^2)
    assert quotient_dim(m1 + [rel]) == 1
    assert quotient_dim([v, rel]) == 2  # 对偶数
    assert quotient_dim([c * v, v**2, rel]) == 3  # 伊藤代数
    for k in range(1, 5):
        assert quotient_dim([v**k, rel]) == 2 * k  # R/(v^k) 与 R[c]/(c^{2k}) 同维
        assert contains([v**k, rel], c ** (2 * k))
        assert not contains([v**k, rel], c ** (2 * k - 1))
    # 伊藤乘法表：c*c = 2v, c*v = 0, v*v = 0 (mod m^3)
    ito = [c * v, v**2, rel]
    assert contains(ito, c * c - 2 * v) and contains(ito, c * v) and contains(ito, v * v)
    assert not contains(ito, v) and not contains(ito, c)
    record("P7 m-进滤过与商代数维数（符号核对）", 0.0, "Groebner 基成员判定全部通过")


# ---------------------------------------------------------------------------
# P8  累计矢高的非渐近界、四相极限与均值旋子夹逼
# ---------------------------------------------------------------------------
def check_p8():
    mp.mp.dps = 40
    worst_gap = mp.mpf(0)
    for alpha in (mp.mpf(1), mp.mpf(3) / 4, mp.mpf(1) / 2, mp.mpf(1) / 3):
        for n in (10, 10**2, 10**4, 10**6):
            for sigma, t in ((1, 1), (mp.mpf("1.7"), mp.mpf("0.6"))):
                theta = sigma * (mp.mpf(t) / n) ** alpha
                if theta > mp.pi:
                    continue
                sag = n * 2 * mp.sin(theta / 2) ** 2
                upper = n * theta**2 / 2
                lower = upper * (1 - theta**2 / 12)
                crude = n * 2 * theta**2 / mp.pi**2
                assert lower <= sag <= upper and crude <= sag
                worst_gap = max(worst_gap, (upper - sag) / upper - theta**2 / 12)
    assert worst_gap <= 0
    # 书中算例表的四个角点
    table = {
        (1, 10**6): "0.00000050",
        (mp.mpf(3) / 4, 10**6): "0.00050000",
        (mp.mpf(1) / 2, 10**6): "0.49999996",
        (mp.mpf(1) / 3, 10**6): "49.99958333",
        (mp.mpf(1) / 2, 10): "0.49584720",
    }
    for (alpha, n), text in table.items():
        val = n * 2 * mp.sin((mp.mpf(1) / n) ** alpha / 2) ** 2
        assert abs(val - mp.mpf(text)) < mp.mpf("6e-9"), (alpha, n, val)
    # 均值旋子：exp(-N v/(1-v)) <= (1-v)^N <= exp(-N v)
    worst = mp.mpf(0)
    for n in (1, 7, 10**2, 10**4, 10**6):
        for sigma in (mp.mpf("0.3"), 1, mp.mpf("2.5")):
            theta = sigma / mp.sqrt(n)
            v = 2 * mp.sin(theta / 2) ** 2
            if v >= 1:
                continue
            mean = (1 - v) ** n
            assert mp.e ** (-n * v / (1 - v)) <= mean <= mp.e ** (-n * v)
            if n >= 10**4:
                worst = max(worst, abs(mean - mp.e ** (-(sigma**2) / 2)))
    assert worst < mp.mpf("1e-3")
    record("P8 均值旋子对 exp(-sigma^2/2) 的偏差（N >= 1e4）", worst)

    # 随机符号游走的精确均值：E[e^{i Theta_N}] = cos(theta)^N（N = 12 时穷举 2^12 条路径）
    n, theta = 12, 0.37
    total = sum(np.exp(1j * theta * sum(signs)) for signs in product((-1, 1), repeat=n)) / 2**n
    exact = abs(total - math.cos(theta) ** n)
    assert exact < 1e-12
    record("P8 随机符号旋子游走的精确均值", exact)


# ---------------------------------------------------------------------------
# P9  复合律：S12 = S1 S2 + {A1, A2}/2，A12 = S1 A2 + S2 A1 + [A1, A2]/2
# ---------------------------------------------------------------------------
def check_p9():
    worst = 0.0
    one = np.eye(2)
    for _ in range(300):
        u1, u2 = random_sl2c(), random_sl2c()
        s1, a1 = parity_parts(u1, adj2)
        s2, a2 = parity_parts(u2, adj2)
        s12, a12 = parity_parts(u1 @ u2, adj2)
        worst = max(
            worst,
            np.abs(s12 - (s1 @ s2 + (a1 @ a2 + a2 @ a1) / 2)).max(),
            np.abs(a12 - (s1 @ a2 + s2 @ a1 + (a1 @ a2 - a2 @ a1) / 2)).max(),
        )
    # 正交平面：(1 - v12) = (1 - v1)(1 - v2)；同平面：角度相加
    sig = pauli()
    t1, t2 = 0.4, 0.9
    u1 = math.cos(t1) * one + 1j * math.sin(t1) * sig[0]
    u2 = math.cos(t2) * one + 1j * math.sin(t2) * sig[1]
    s12, _ = parity_parts(u1 @ u2, adj2)
    worst = max(worst, abs(s12[0, 0] - math.cos(t1) * math.cos(t2)))
    u3 = math.cos(t2) * one + 1j * math.sin(t2) * sig[0]
    s13, _ = parity_parts(u1 @ u3, adj2)
    worst = max(worst, abs(s13[0, 0] - math.cos(t1 + t2)))
    assert worst < 1e-9, worst
    record("P9 奇偶复合律", worst)


# ---------------------------------------------------------------------------
# P10  复步导数的有限孔径误差界（Squire–Trapp 测试函数）
# ---------------------------------------------------------------------------
def check_p10():
    mp.mp.dps = 50
    f = lambda z: mp.exp(z) / (mp.cos(z) ** 3 + mp.sin(z) ** 3)
    x0 = mp.pi / 4
    f1 = mp.sqrt(2) * mp.exp(mp.pi / 4)
    f2 = -2 * f1
    # 最近奇点：u = +- i arccosh(2)/2
    nearest = mp.acosh(2) / 2
    assert abs(mp.cos(x0 + 1j * nearest) ** 3 + mp.sin(x0 + 1j * nearest) ** 3) < mp.mpf("1e-40")
    radius = mp.mpf("0.5")
    assert radius < nearest
    big_m = max(abs(f(x0 + radius * mp.e ** (2j * mp.pi * k / 4000))) for k in range(4000))
    worst_ratio = mp.mpf(0)
    for eps in (mp.mpf("0.1"), mp.mpf("1e-2"), mp.mpf("1e-4"), mp.mpf("1e-8")):
        val = f(x0 + 1j * eps)
        err1 = abs(val.imag / eps - f1)
        bound1 = big_m * eps**2 / (radius * (radius**2 - eps**2))
        err2 = abs(2 * (f(x0) - val.real) / eps**2 - f2)
        bound2 = 2 * big_m * eps**2 / (radius**2 * (radius**2 - eps**2))
        assert err1 <= bound1 and err2 <= bound2, (eps, err1, bound1, err2, bound2)
        worst_ratio = max(worst_ratio, err1 / bound1, err2 / bound2)
        # 对合代替减法：Im f(x0 + i eps) = [f(x0 + i eps) - f(x0 - i eps)] / (2i)
        assert abs(val.imag - ((val - f(x0 - 1j * eps)) / 2j).real) < mp.mpf("1e-45")
    record("P10 复步误差 / 柯西界（应 <= 1）", worst_ratio)


# ---------------------------------------------------------------------------
# H7  复合系统的奇偶计数：Sym(n1 n2) = Sym x Sym + Skew x Skew；J x J 局域不可见
# ---------------------------------------------------------------------------
def basis_real(n, sign):
    out = []
    for i in range(n):
        for k in range(i if sign > 0 else i + 1, n):
            e = np.zeros((n, n))
            e[i, k] = 1
            e[k, i] += sign
            out.append(e)
    return out


def span_rank(mats):
    return np.linalg.matrix_rank(np.array([m.reshape(-1) for m in mats]), tol=1e-9)


def check_h7():
    for n1, n2 in ((2, 2), (2, 3), (3, 3)):
        sym1, sym2 = basis_real(n1, 1), basis_real(n2, 1)
        skw1, skw2 = basis_real(n1, -1), basis_real(n2, -1)
        local = [np.kron(a, b) for a in sym1 for b in sym2]
        hidden = [np.kron(a, b) for a in skw1 for b in skw2]
        total = n1 * n2 * (n1 * n2 + 1) // 2
        assert span_rank(local) == len(local)
        assert span_rank(local + hidden) == total == len(local) + len(hidden)
        assert len(hidden) == n1 * (n1 - 1) * n2 * (n2 - 1) // 4
        for h in hidden:
            assert np.allclose(h, h.T)
            assert all(abs(np.trace(h @ l)) < 1e-12 for l in local)
    # 复情形：Herm(n1 n2) 的实维数恰为 n1^2 n2^2，局域乘积张成全体
    for n1, n2 in ((2, 2), (2, 3)):
        def herm_basis(n):
            out = []
            for i in range(n):
                for k in range(i, n):
                    e = np.zeros((n, n), dtype=complex)
                    e[i, k] = e[k, i] = 1
                    out.append(e)
                    if k > i:
                        f = np.zeros((n, n), dtype=complex)
                        f[i, k], f[k, i] = 1j, -1j
                        out.append(f)
            return out

        prods = [np.kron(a, b) for a in herm_basis(n1) for b in herm_basis(n2)]
        stacked = np.array([np.concatenate([p.real.reshape(-1), p.imag.reshape(-1)]) for p in prods])
        assert np.linalg.matrix_rank(stacked, tol=1e-9) == (n1 * n2) ** 2
    # 中心直角比较：M_n(R) 与 M_n(H) 的中心为 R，M_n(C) 的中心含 i
    jr = np.array([[0.0, -1.0], [1.0, 0.0]])
    sz = np.diag([1.0, -1.0])
    assert not np.allclose(jr @ sz, sz @ jr)  # 实理论的 J 不居中心
    w = np.kron(jr, jr)
    assert np.allclose(w, w.T)
    record("H7 奇偶计数与 J x J 的局域不可见性", 0.0, "秩与迹正交核对全部通过")


# ---------------------------------------------------------------------------
# D1  近似平坦 => 近似 Gram 半正定：lambda_min(G) >= -(m - 2) * delta_o
# ---------------------------------------------------------------------------
def random_skew(n, scale):
    z = RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))
    return scale * (z - dagger(z)) / 2


def expm_skew(k):
    w, vec = np.linalg.eigh(-1j * k)
    return vec @ np.diag(np.exp(1j * w)) @ dagger(vec)


def check_d1():
    worst_margin = np.inf
    for scale in (0.0, 0.02, 0.2, 1.0):
        for n, m in ((2, 5), (3, 6)):
            for _ in range(25):
                g = [random_unitary(n) for _ in range(m)]
                c = [[None] * m for _ in range(m)]
                for i in range(m):
                    c[i][i] = np.eye(n)
                    for l in range(i + 1, m):
                        c[i][l] = dagger(g[i]) @ expm_skew(random_skew(n, scale)) @ g[l]
                        c[l][i] = dagger(c[i][l])
                o = 0
                delta = max(
                    np.linalg.norm(c[i][l] - c[i][o] @ c[o][l], 2) for i in range(m) for l in range(m)
                )
                z = RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))
                rho = z @ dagger(z)
                rho /= np.trace(rho).real
                gram = np.array([[np.trace(rho @ c[i][l]).real for l in range(m)] for i in range(m)])
                lam = np.linalg.eigvalsh(gram).min()
                worst_margin = min(worst_margin, lam + (m - 2) * delta)
    assert worst_margin > -1e-9, worst_margin
    record("D1 lambda_min(G) + (m-2) delta_o（应 >= 0）", worst_margin)


# ---------------------------------------------------------------------------
# D2  det G(a,b,c) = (2 - v_ab)(2 - v_bc)(2 - v_ca) * (1 - cos Omega)
# ---------------------------------------------------------------------------
def check_d2():
    worst = 0.0
    for _ in range(400):
        a, b, c = RNG.normal(size=(3, 3))
        a, b, c = (x / np.linalg.norm(x) for x in (a, b, c))
        gram = np.array([[x @ y for y in (a, b, c)] for x in (a, b, c)])
        omega = girard_excess(a, b, c)
        rhs = (1 + a @ b) * (1 + b @ c) * (1 + c @ a) * (1 - math.cos(omega))
        worst = max(worst, abs(np.linalg.det(gram) - rhs))
    assert worst < 1e-9, worst
    record("D2 三点 Gram 行列式的矢高形式", worst)
    # 书中“二生三”原胞：det G = sin^4(eps)
    eps = 0.37
    a = np.array([1.0, 0, 0])
    b = np.array([math.cos(eps), math.sin(eps), 0])
    p = np.array([math.cos(eps), 0, math.sin(eps)])
    gram = np.array([[x @ y for y in (a, b, p)] for x in (a, b, p)])
    assert abs(np.linalg.det(gram) - math.sin(eps) ** 4) < 1e-12


# ---------------------------------------------------------------------------
# D3  移位旋子：中心差分 = 奇部，二阶差分 = -2 * 矢高算子；精确离散伊藤式与余项界
# ---------------------------------------------------------------------------
def check_d3():
    mp.mp.dps = 40
    f = lambda x: mp.exp(mp.sin(x)) + x**3 / 7
    f2 = lambda x: mp.diff(f, x, 2)
    f4_sup = max(abs(mp.diff(f, mp.mpf(k) / 50, 4)) for k in range(-150, 151))
    worst_exact = mp.mpf(0)
    worst_ratio = mp.mpf(0)
    for delta in (mp.mpf("0.5"), mp.mpf("0.1"), mp.mpf("1e-2")):
        for x in (mp.mpf("-1.3"), mp.mpf("0.2"), mp.mpf("1.1")):
            even = (f(x + delta) + f(x - delta)) / 2  # S f
            odd = (f(x + delta) - f(x - delta)) / 2  # A f
            sag = f(x) - even  # v f
            worst_exact = max(worst_exact, abs(f(x + delta) - (f(x) + odd - sag)))
            # 对称随机步的条件均值增量恰为 -v f
            worst_exact = max(worst_exact, abs(even - f(x) + sag))
            # A^2 = S^2 - 1 作用在 f 上：两步中心差分对照两步均值
            a2 = (f(x + 2 * delta) - 2 * f(x) + f(x - 2 * delta)) / 4
            s2 = (f(x + 2 * delta) + 2 * f(x) + f(x - 2 * delta)) / 4
            worst_exact = max(worst_exact, abs(a2 - (s2 - f(x))))
            bound = delta**4 / 24 * f4_sup
            err = abs(sag + delta**2 / 2 * f2(x))
            assert err <= bound, (delta, x, err, bound)
            worst_ratio = max(worst_ratio, err / bound)
    assert worst_exact < mp.mpf("1e-30")
    record("D3 移位旋子的奇偶分解与 A^2 = S^2 - 1", worst_exact)
    record("D3 矢高算子对 -(delta^2/2) f'' 的偏差 / 余项界（应 <= 1）", worst_ratio)


# ---------------------------------------------------------------------------
# E4 / E5  条款 III => 三点和乐的比安基恒等式、扇形斯托克斯恒等式与矢高平方根次可加
# ---------------------------------------------------------------------------
def check_e4_e5():
    n, m = 3, 7
    worst_bianchi = worst_fan = 0.0
    worst_sub = np.inf
    for _ in range(40):
        c = [[None] * m for _ in range(m)]
        for i in range(m):
            c[i][i] = np.eye(n)
            for l in range(i + 1, m):
                c[i][l] = random_unitary(n)  # 任意公平比较，不要求链式律
                c[l][i] = dagger(c[i][l])
        hol = lambda x, y, z: c[x][y] @ c[y][z] @ c[z][x]
        for x, y, z, w in product(range(m), repeat=4):
            lhs = hol(x, y, z) @ hol(x, z, w) @ hol(x, w, y)
            rhs = c[x][y] @ hol(y, z, w) @ c[y][x]
            worst_bianchi = max(worst_bianchi, np.abs(lhs - rhs).max())
        # 扇形斯托克斯：闭链 0 -> 1 -> ... -> m-1 -> 0
        boundary = np.eye(n)
        for k in range(m):
            boundary = boundary @ c[k][(k + 1) % m]
        fan = np.eye(n)
        for k in range(1, m - 1):
            fan = fan @ hol(0, k, k + 1)
        worst_fan = max(worst_fan, np.abs(boundary - fan).max())
        # 弦范数次可加：||Hol - 1|| <= sum ||h_k - 1||，且 ||u - 1||^2 = 2 ||v||
        chord = lambda u: np.linalg.norm(u - np.eye(n), 2)
        total = sum(chord(hol(0, k, k + 1)) for k in range(1, m - 1))
        worst_sub = min(worst_sub, total - chord(boundary))
        u = random_unitary(n)
        v = np.eye(n) - (u + dagger(u)) / 2
        assert abs(chord(u) ** 2 - 2 * np.linalg.norm(v, 2)) < 1e-9
    assert worst_bianchi < 1e-9 and worst_fan < 1e-9 and worst_sub > -1e-9
    record("E4 三点和乐的比安基恒等式", worst_bianchi)
    record("E5 扇形斯托克斯恒等式", worst_fan)
    record("E5 弦范数次可加的余量（应 >= 0）", worst_sub)

    # 阿贝尔化：相位和乐满足冻结定理 tetra_defects_incidence_repair_and_exactness 的四面体条件
    phases = RNG.uniform(-1, 1, size=(m, m))
    edge = phases - phases.T  # 反对称的边相位
    face = lambda i, k, l: edge[k, l] - edge[i, l] + edge[i, k]
    worst = 0.0
    for r, i, k, l in product(range(m), repeat=4):
        worst = max(worst, abs(face(i, k, l) - face(r, k, l) + face(r, i, l) - face(r, i, k)))
    assert worst < 1e-12
    record("E4 阿贝尔化的四面体上边缘条件", worst)


# ---------------------------------------------------------------------------
# R18  三角相容何时足够：树规范固定后的平坦增益个数等于 |Hom(pi_1, H)|
# ---------------------------------------------------------------------------
def s3_table():
    perms = [(0, 1, 2), (1, 0, 2), (0, 2, 1), (2, 1, 0), (1, 2, 0), (2, 0, 1)]
    index = {q: i for i, q in enumerate(perms)}
    mul = [[index[tuple(a[b[k]] for k in range(3))] for b in perms] for a in perms]
    inv = [next(j for j in range(6) if mul[i][j] == 0) for i in range(6)]
    return mul, inv


def count_tree_gauged_flat_gains(nv, edges):
    """树边规范固定为单位元后，满足三角相容的 S3 值增益的个数。"""
    mul, inv = s3_table()
    adj = {frozenset(e) for e in edges}
    tris = [
        (a, b, c)
        for a in range(nv)
        for b in range(a + 1, nv)
        for c in range(b + 1, nv)
        if {frozenset((a, b)), frozenset((b, c)), frozenset((a, c))} <= adj
    ]
    seen, tree, stack = {0}, set(), [0]
    while stack:
        x = stack.pop()
        for e in edges:
            if x in e:
                y = e[0] if e[1] == x else e[1]
                if y not in seen:
                    seen.add(y)
                    tree.add(frozenset(e))
                    stack.append(y)
    assert len(seen) == nv
    free = [tuple(sorted(e)) for e in edges if frozenset(e) not in tree]
    val = {tuple(sorted(e)): 0 for e in tree}

    def g(a, b):
        return val[(a, b)] if a < b else inv[val[(b, a)]]

    def ok():
        for a, b, c in tris:
            if (a, b) in val and (b, c) in val and (a, c) in val:
                if mul[g(a, b)][g(b, c)] != g(a, c):
                    return False
        return True

    def dfs(k):
        if k == len(free):
            return 1
        total = 0
        for h in range(6):
            val[free[k]] = h
            if ok():
                total += dfs(k + 1)
        del val[free[k]]
        return total

    return dfs(0)


def check_r18():
    c4 = [(0, 1), (1, 2), (2, 3), (3, 0)]
    wheel = [(0, i) for i in range(1, 5)] + [(1, 2), (2, 3), (3, 4), (4, 1)]
    octa = [(a, b) for a in range(6) for b in range(a + 1, 6) if b - a != 3]
    annulus = (
        [(i, (i + 1) % 4) for i in range(4)]
        + [(4 + i, 4 + (i + 1) % 4) for i in range(4)]
        + [(i, 4 + i) for i in range(4)]
        + [(i, 4 + (i + 1) % 4) for i in range(4)]
    )
    # 计数等于 |Hom(pi_1, S3)|：单连通（四轮、八面体，均非弦图）时为 1，这是必要而非充分条件；
    # pi_1 = Z（四圈、三角剖分圆环）时为 6
    assert count_tree_gauged_flat_gains(5, wheel) == 1
    assert count_tree_gauged_flat_gains(6, octa) == 1
    assert count_tree_gauged_flat_gains(4, c4) == 6
    assert count_tree_gauged_flat_gains(8, annulus) == 6
    # 第 3 款：四轮图上轮辋和乐的偏差不超过 4 个三角形偏差之和
    worst = 0.0
    for scale in (0.01, 0.1, 0.5):
        for _ in range(40):
            n = 3
            hub = [random_unitary(n) for _ in range(4)]
            defect = [expm_skew(random_skew(n, scale)) for _ in range(4)]
            rim = [dagger(hub[i]) @ defect[i] @ hub[(i + 1) % 4] for i in range(4)]
            eps = max(np.linalg.norm(hub[i] @ rim[i] - hub[(i + 1) % 4], 2) for i in range(4))
            hol = rim[0] @ rim[1] @ rim[2] @ rim[3]
            dev = np.linalg.norm(hol - np.eye(n), 2)
            assert dev <= 4 * eps + 1e-12
            worst = max(worst, dev / (4 * eps))
    record("R18 平坦增益计数与面积界（比值应 <= 1）", worst, "规范固定后 四轮/八面体: 1; 四圈/圆环: 6")


# ---------------------------------------------------------------------------
# R19  带状概率规则的层析秩：仿射 <=> 秩 d^2
# ---------------------------------------------------------------------------
def numeric_rank(m, tol=1e-9):
    sv = np.linalg.svd(m, compute_uv=False)
    return int((sv > tol * sv[0]).sum())


def check_r19():
    x = RNG.normal(size=(80, 3))
    x /= np.linalg.norm(x, axis=1)[:, None]
    t = x @ x.T
    p3 = (5 * t**3 - 3 * t) / 2
    assert numeric_rank((1 + t) / 2) == 4  # 玻恩律
    assert numeric_rank((1 + t**3) / 2) == 11  # 附录 E 的三次规则：l = 0, 1, 3
    assert numeric_rank(0.5 + p3 / 2) == 8  # 只含 l = 0, 3 的归一规则
    tt = sp.symbols("t")
    assert sp.expand(sp.Rational(3, 5) * tt + sp.Rational(2, 5) * (5 * tt**3 - 3 * tt) / 2 - tt**3) == 0
    for d in (2, 3, 4):
        z = RNG.normal(size=(130, d)) + 1j * RNG.normal(size=(130, d))
        z /= np.linalg.norm(z, axis=1)[:, None]
        w = np.abs(z @ dagger(z)) ** 2
        assert numeric_rank(w) == d * d
        assert numeric_rank(0.3 + 0.7 * w) == d * d
        assert numeric_rank(w**2) == (d * (d + 1) // 2) ** 2
        assert numeric_rank(3 * w**2 - 2 * w**3) > d * d
    # d = 2：对径归一允许非仿射的多项式规则
    assert sp.expand((3 * tt**2 - 2 * tt**3) + (3 * (1 - tt) ** 2 - 2 * (1 - tt) ** 3) - 1) == 0
    # d = 3：单纯形上 sum f(t_i) = 1 的多项式解（次数 <= 5）只有仿射的 a + (1 - 3a) t；f(1) = 1 再给出 a = 0
    t1, t2 = sp.symbols("t1 t2")
    coeffs = sp.symbols("a0:6")

    def poly(x):
        return sum(c * x**k for k, c in enumerate(coeffs))

    constraint = sp.Poly(sp.expand(poly(t1) + poly(t2) + poly(1 - t1 - t2) - 1), t1, t2)
    solution = sp.solve(constraint.coeffs(), coeffs, dict=True)
    assert len(solution) == 1
    solved = [sp.simplify(sp.sympify(c).subs(solution[0])) for c in coeffs]
    assert all(c == 0 for c in solved[2:])
    assert sp.simplify(3 * solved[0] + solved[1] - 1) == 0
    record("R19 层析秩与 d = 3 的可加性", 0.0, "S^2: 4/11/8; CP^{d-1} 仿射 d^2; d = 3 归一解仿射")



# ---------------------------------------------------------------------------
# R20  u^n = T_n(s) + U_{n-1}(s) A，轨道有界 <=> 椭圆或 +-1
# ---------------------------------------------------------------------------
def cheb_pair(n, s):
    """返回 (T_n(s), U_{n-1}(s))，n >= 0，U_{-1} = 0。"""
    t_prev, t_cur = 1.0 + 0j, s
    u_prev, u_cur = 0j, 1.0 + 0j
    if n == 0:
        return t_prev, u_prev
    for _ in range(n - 1):
        t_prev, t_cur = t_cur, 2 * s * t_cur - t_prev
        u_prev, u_cur = u_cur, 2 * s * u_cur - u_prev
    return t_cur, u_cur


def check_r20():
    worst = 0.0
    for _ in range(200):
        u = random_sl2c()
        s = np.trace(u) / 2
        a = (u - adj2(u)) / 2
        assert np.allclose(a @ a, (s * s - 1) * np.eye(2))
        p = np.eye(2, dtype=complex)
        q = np.eye(2, dtype=complex)
        for n in range(9):
            tn, un = cheb_pair(n, s)
            scale = max(1.0, np.abs(p).max())
            worst = max(worst, np.abs(p - (tn * np.eye(2) + un * a)).max() / scale)
            worst = max(worst, np.abs(q - (tn * np.eye(2) - un * a)).max() / scale)
            p, q = p @ u, q @ adj2(u)
    assert worst < 1e-12

    def orbit_sup(u, steps=400):
        p = np.eye(2, dtype=complex)
        q = np.eye(2, dtype=complex)
        ui = np.linalg.inv(u)
        m = 1.0
        for _ in range(steps):
            p, q = p @ u, q @ ui
            m = max(m, np.abs(p).max(), np.abs(q).max())
        return m

    th = 0.7
    ell = np.array([[np.cos(th), -np.sin(th)], [np.sin(th), np.cos(th)]], dtype=complex)
    par = np.array([[1, 1], [0, 1]], dtype=complex)
    hyp = np.diag([np.exp(0.05), np.exp(-0.05)]).astype(complex)
    lox = np.diag([np.exp(0.02 + 0.6j), np.exp(-0.02 - 0.6j)])
    assert orbit_sup(ell) < 1.0 + 1e-9
    assert orbit_sup(-np.eye(2, dtype=complex)) < 1.0 + 1e-9
    assert abs(orbit_sup(par) - 400) < 1e-6
    assert orbit_sup(hyp) > 1e8 and orbit_sup(lox) > 1e3
    # s = -1 的抛物元：u^n = (-1)^n (1 - n A)
    neg_par = -par
    a_par = (neg_par - adj2(neg_par)) / 2
    for n in range(7):
        assert np.allclose(np.linalg.matrix_power(neg_par, n), (-1) ** n * (np.eye(2) - n * a_par))
    # 逐个比较有界而读数表非半正定：M_2(R) 中三点，CMP(x, y) = adj(x) y
    lam = 2.0
    j0 = np.array([[0.0, -1.0], [1.0, 0.0]])
    j1 = np.array([[0.0, -lam], [1.0 / lam, 0.0]])
    pts = [np.eye(2), np.cos(np.pi / 4) * np.eye(2) + np.sin(np.pi / 4) * j0,
           np.cos(np.pi / 4) * np.eye(2) - np.sin(np.pi / 4) * j1]
    cmp_ = [[adj2(x) @ y for y in pts] for x in pts]
    gram = np.zeros((3, 3))
    for i in range(3):
        for k in range(3):
            c = cmp_[i][k]
            assert np.allclose(adj2(c), cmp_[k][i]) and np.allclose(c @ adj2(c), np.eye(2))
            assert np.allclose((c + adj2(c)) / 2, np.trace(c) / 2 * np.eye(2))
            gram[i, k] = np.trace(c) / 2
            for m in range(3):
                assert np.allclose(cmp_[i][k] @ cmp_[k][m], cmp_[i][m])
            assert orbit_sup(c.astype(complex), steps=2000) < 3.0
    assert np.allclose([gram[0, 1], gram[0, 2], gram[1, 2]], [np.sqrt(0.5), np.sqrt(0.5), -0.125])
    assert abs(np.linalg.det(gram) + 9 / 64) < 1e-12 and np.linalg.eigvalsh(gram)[0] < -0.05
    assert abs(np.trace(pts[1] @ pts[2])) > 2  # 生成的群含双曲元，无界
    # 矢高的 n 次复合：v_2 = 2 v (2 - v)
    v = sp.symbols("v")
    assert sp.expand(1 - sp.chebyshevt(2, 1 - v) - 2 * v * (2 - v)) == 0
    record("R20 切比雪夫幂公式的相对偏差", worst, "椭圆有界; 抛物线性; 双曲与斜驶指数")



def main():
    check_e4_e5()
    check_d1()
    check_d2()
    check_d3()
    check_p1()
    check_p2_p3()
    check_p4()
    check_p5()
    check_p6()
    check_p7()
    check_p8()
    check_p9()
    check_p10()
    check_h7()
    check_r18()
    check_r19()
    check_r20()
    width = max(len(tag) for tag, _, _ in REPORT)
    for tag, value, note in REPORT:
        print(f"{tag:<{width}}  {value:.3e}  {note}")
    print("全部核对通过。")


if __name__ == "__main__":
    main()
