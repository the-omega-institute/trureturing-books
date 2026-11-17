"""复算“极小圆弧体微积分与统一场相关论断”研究笔记（ARC-CALCULUS-UNIFIED-FIELD-2026-11-17.md）中的恒等式、界、反例与数值；依赖 numpy、sympy、mpmath，不代替普遍证明。

运行：python3 docs/project/unified_arc_check.py
每一节以断言结束，打印的各行是笔记第 10 节引用的读数；随机种子固定，任何断言失败即非零退出。
"""
import itertools
import math
import time

import mpmath as mp
import numpy as np
import sympy as sp

T0 = time.time()
RNG = np.random.default_rng(20261117)
TOL = 1e-10
PASSED = []


def ok(label, text=""):
    PASSED.append(label)
    print(f"[OK] {label}: {text}")


# ----------------------------------------------------------------------------
# 辅助函数
# ----------------------------------------------------------------------------
def haar_unitary(n):
    z = (RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))) / math.sqrt(2)
    q, r = np.linalg.qr(z)
    d = np.diag(r)
    return q * (d / np.abs(d))


def haar_su(n):
    u = haar_unitary(n)
    return u / np.linalg.det(u) ** (1.0 / n)


def near_identity_su(n, eps):
    h = RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))
    h = (h + h.conj().T) / 2
    h -= np.trace(h) / n * np.eye(n)
    return expi(eps * h)


def expi(h):
    """厄米矩阵 h 的 exp(i h)。"""
    w, v = np.linalg.eigh(h)
    return (v * np.exp(1j * w)) @ v.conj().T


def dag(a):
    return a.conj().T


def phi(a):
    """归一迹读数。"""
    return np.trace(a) / a.shape[0]


def sagitta(u):
    """phi(v)，其中 v = 1 - (u + u*)/2：先构造矩阵 v 再取归一迹，返回实数。"""
    v = np.eye(u.shape[0]) - (u + dag(u)) / 2
    return float(phi(v).real)


def chord_norm(u):
    """割弦范数 ||u - 1||_phi = sqrt(phi((u-1)*(u-1)))。"""
    d = u - np.eye(u.shape[0])
    return math.sqrt(max(phi(dag(d) @ d).real, 0.0))


SIG = [np.array([[0, 1], [1, 0]], complex),
       np.array([[0, -1j], [1j, 0]], complex),
       np.array([[1, 0], [0, -1]], complex)]
I2 = np.eye(2, dtype=complex)


# 自由群的字：非零整数的元组，g 与 -g 互逆
def wred(word):
    out = []
    for g in word:
        if out and out[-1] == -g:
            out.pop()
        else:
            out.append(g)
    return tuple(out)


def winv(word):
    return tuple(-g for g in reversed(word))


def wmul(*words):
    acc = []
    for w in words:
        acc.extend(w)
    return wred(acc)


def weval(word, links):
    n = next(iter(links.values())).shape[0]
    m = np.eye(n, dtype=complex)
    for g in word:
        m = m @ (links[g] if g > 0 else dag(links[-g]))
    return m


# ----------------------------------------------------------------------------
# F1  小方格矢高 = 威尔逊项；不变读数的唯一性
# ----------------------------------------------------------------------------
worst = 0.0
for n in (2, 3, 4):
    for _ in range(200):
        u = haar_unitary(n) if n == 4 else haar_su(n)
        a = 1.0 - np.trace(u).real / n                      # 威尔逊项
        b = np.linalg.norm(u - np.eye(n)) ** 2 / (2 * n)     # ||U-1||_HS^2/2N
        c = 0.5 * chord_norm(u) ** 2
        worst = max(worst, abs(a - b), abs(a - c), abs(a - sagitta(u)))
assert worst < 1e-12
ok("F1a", f"1-(1/N)Re tr U = ||U-1||_HS^2/(2N) = phi(v), max dev {worst:.1e} (SU2, SU3, U4)")

worst = 0.0
for _ in range(200):
    u = haar_su(2)
    s = (u + dag(u)) / 2
    worst = max(worst, np.linalg.norm(s - np.trace(u).real / 2 * I2))
assert worst < 1e-12
ok("F1b", f"SU(2): similarity part S is the scalar (1/2)tr U, max dev {worst:.1e}")

# 精确的酉 1-设计（时钟与移位，N=3）：g X g* 的平均是 (tr X/N) 1，
# 所以共轭不变的态只能是归一迹
N = 3
om = np.exp(2j * np.pi / N)
Xs = np.roll(np.eye(N), 1, axis=0).astype(complex)
Zc = np.diag([om ** k for k in range(N)])
M = RNG.normal(size=(N, N)) + 1j * RNG.normal(size=(N, N))
avg = sum(np.linalg.matrix_power(Xs, a) @ np.linalg.matrix_power(Zc, b) @ M
          @ dag(np.linalg.matrix_power(Xs, a) @ np.linalg.matrix_power(Zc, b))
          for a in range(N) for b in range(N)) / N ** 2
assert np.linalg.norm(avg - np.trace(M) / N * np.eye(N)) < 1e-12
ok("F1c", "finite twirl over the clock-shift group gives (tr X/N) 1 exactly")

# ----------------------------------------------------------------------------
# F2  矢高与曲率范数的双侧界
# ----------------------------------------------------------------------------
mp.mp.dps = 40
for k in range(-400, 401):
    x = mp.mpf(k) * mp.pi / 400
    v = 1 - mp.cos(x)
    assert 2 * x ** 2 / mp.pi ** 2 <= v + mp.mpf(10) ** -35
    assert v <= x ** 2 / 2 + mp.mpf(10) ** -35
for k in range(-2000, 2001):
    x = mp.mpf(k) / 100
    assert x ** 2 / 2 - x ** 4 / 24 <= 1 - mp.cos(x) + mp.mpf(10) ** -35
slack_lo, slack_hi, slack_q = 1e9, 1e9, 1e9
for n in (2, 3, 5):
    for _ in range(300):
        u = haar_unitary(n) if RNG.random() < 0.5 else near_identity_su(n, RNG.random())
        th = np.angle(np.linalg.eigvals(u))                 # 主值本征角
        f2 = np.sum(th ** 2) / n                            # ||F||_phi^2
        f4 = np.sum(th ** 4) / n
        v = sagitta(u)
        assert abs(v - np.sum(1 - np.cos(th)) / n) < 1e-10
        slack_lo = min(slack_lo, v - 2 / np.pi ** 2 * f2)
        slack_hi = min(slack_hi, f2 / 2 - v)
        slack_q = min(slack_q, v - (f2 / 2 - f4 / 24))
assert slack_lo > -1e-10 and slack_hi > -1e-10 and slack_q > -1e-10
ok("F2", "(2/pi^2)||F||^2 <= phi(v) <= ||F||^2/2 and phi(v) >= ||F||^2/2 - phi(F^4)/24 "
         f"(min slacks {slack_lo:.2e}, {slack_hi:.2e}, {slack_q:.2e})")
u = np.diag([-1.0, 1.0]).astype(complex)                    # 下界取等的情形
assert abs(sagitta(u) - 2 / np.pi ** 2 * (np.pi ** 2 / 2)) < 1e-12
ok("F2eq", "lower constant 2/pi^2 is attained at eigen-angles in {0, pi}")

# ----------------------------------------------------------------------------
# F3  中点链变量的连续极限（光滑 su(2) 场，二维）
# ----------------------------------------------------------------------------
xs, ys = sp.symbols("x y", real=True)
s1, s2, s3 = (sp.Matrix(m.tolist()) for m in SIG)
A1 = sp.Rational(7, 10) * sp.sin(xs + 2 * ys) * s1 + sp.Rational(2, 5) * sp.cos(ys) * s3 \
    + sp.Rational(3, 10) * xs * ys * s2
A2 = sp.Rational(1, 2) * sp.cos(2 * xs - ys) * s2 + sp.Rational(3, 5) * xs * s1 \
    + sp.Rational(1, 5) * sp.sin(xs * ys) * s3
F12 = sp.diff(A2, xs) - sp.diff(A1, ys) + sp.I * (A1 * A2 - A2 * A1)
fA1 = sp.lambdify((xs, ys), A1, "numpy")
fA2 = sp.lambdify((xs, ys), A2, "numpy")
xc, yc = 0.3, -0.2
Fc = np.array(F12.subs({xs: xc, ys: yc}).evalf(30).tolist(), dtype=complex)
assert np.linalg.norm(Fc - dag(Fc)) < 1e-12
lead = np.trace(Fc @ Fc).real / (2 * 2)


def plaq_sagitta(a):
    e1 = expi(a * np.array(fA1(xc, yc - a / 2), complex))
    e2 = expi(a * np.array(fA2(xc + a / 2, yc), complex))
    e3 = expi(-a * np.array(fA1(xc, yc + a / 2), complex))
    e4 = expi(-a * np.array(fA2(xc - a / 2, yc), complex))
    return sagitta(e1 @ e2 @ e3 @ e4)


rem = []
for a in (0.2, 0.1, 0.05, 0.025):
    f = plaq_sagitta(a)
    assert abs(f - plaq_sagitta(-a)) < 1e-14               # 关于 a 是偶函数
    rem.append(f - a ** 4 * lead)
orders = [math.log(abs(rem[i] / rem[i + 1]), 2) for i in range(3)]
assert all(5.8 < o < 6.2 for o in orders[1:])
ok("F3", f"1-(1/2)Re tr U_p = (a^4/4) tr F^2 + O(a^6): tr F^2 = {np.trace(Fc @ Fc).real:.6f}, "
         f"observed remainder orders {orders[0]:.3f}, {orders[1]:.3f}, {orders[2]:.3f}; even in a")

# ----------------------------------------------------------------------------
# F4  有限孔径上的曲率 = 对易子
# ----------------------------------------------------------------------------
worst = 0.0
for n in (2, 3, 4):
    for _ in range(100):
        u1, u2 = haar_unitary(n), haar_unitary(n)
        h = u1 @ u2 @ dag(u1) @ dag(u2)
        com = u1 @ u2 - u2 @ u1
        worst = max(worst, np.linalg.norm(h - np.eye(n) - com @ dag(u2 @ u1)))
        worst = max(worst, abs(sagitta(h) - 0.5 * phi(dag(com) @ com).real))
assert worst < 1e-12
ok("F4a", f"h-1 = [u1,u2](u2 u1)^* and phi(v_h) = (1/2)||[u1,u2]||_phi^2, max dev {worst:.1e}")


def su2_rot(angle, axis):
    axis = np.asarray(axis, float) / np.linalg.norm(axis)
    return math.cos(angle / 2) * I2 - 1j * math.sin(angle / 2) * sum(axis[k] * SIG[k] for k in range(3))


worst = 0.0
for _ in range(200):
    a, b = RNG.uniform(0, 2 * np.pi, 2)
    n1, n2 = RNG.normal(size=3), RNG.normal(size=3)
    n1, n2 = n1 / np.linalg.norm(n1), n2 / np.linalg.norm(n2)
    sinpsi2 = np.linalg.norm(np.cross(n1, n2)) ** 2
    u1, u2 = su2_rot(a, n1), su2_rot(b, n2)
    h = u1 @ u2 @ dag(u1) @ dag(u2)
    worst = max(worst, abs(sagitta(h) - 2 * math.sin(a / 2) ** 2 * math.sin(b / 2) ** 2 * sinpsi2))
assert worst < 1e-12
h = su2_rot(np.pi / 3, [1, 0, 0]) @ su2_rot(np.pi / 3, [0, 1, 0]) \
    @ dag(su2_rot(np.pi / 3, [1, 0, 0])) @ dag(su2_rot(np.pi / 3, [0, 1, 0]))
ang = math.degrees(2 * math.acos(np.trace(h).real / 2))
assert abs(sagitta(h) - 1 / 8) < 1e-12 and abs(ang - 57.91) < 0.005
ok("F4b", f"SU(2): v_h = 2 sin^2(a/2) sin^2(b/2) sin^2(psi); book card (60,60,90 deg): v = 1/8, angle {ang:.2f} deg")

# 3x3 周期格点上的协变移位，SU(3)
L, N = 3, 3
site = lambda x, y: (x % L) * L + (y % L)
U1 = {(x, y): haar_su(N) for x in range(L) for y in range(L)}
U2 = {(x, y): haar_su(N) for x in range(L) for y in range(L)}
T1 = np.zeros((L * L * N, L * L * N), complex)
T2 = np.zeros_like(T1)
MU = np.zeros_like(T1)
action = 0.0
for x in range(L):
    for y in range(L):
        s = site(x, y)
        T1[s * N:(s + 1) * N, site(x + 1, y) * N:(site(x + 1, y) + 1) * N] = U1[(x, y)]
        T2[s * N:(s + 1) * N, site(x, y + 1) * N:(site(x, y + 1) + 1) * N] = U2[(x, y)]
        up = U1[(x, y)] @ U2[((x + 1) % L, y)] @ dag(U1[(x, (y + 1) % L)]) @ dag(U2[(x, y)])
        MU[s * N:(s + 1) * N, s * N:(s + 1) * N] = up
        action += sagitta(up)
C = T1 @ T2 - T2 @ T1
assert np.linalg.norm(C - (MU - np.eye(L * L * N)) @ T2 @ T1) < 1e-11
assert abs(np.linalg.norm(C) ** 2 - 2 * N * action) < 1e-9
ok("F4c", f"[T1,T2] = (U_p - 1) T2 T1 and sum_p (1-(1/N)Re tr U_p) = ||[T1,T2]||_HS^2/(2N) = {action:.6f}")

# ----------------------------------------------------------------------------
# F5  格点比安基恒等式：四面体（R4）与立方体（自由群恒等式）
# ----------------------------------------------------------------------------
n = 3
c = {}
for i in range(4):
    c[(i, i)] = np.eye(n, dtype=complex)
    for j in range(i + 1, 4):
        c[(i, j)] = haar_unitary(n)
        c[(j, i)] = dag(c[(i, j)])
hol = lambda x, y, z: c[(x, y)] @ c[(y, z)] @ c[(z, x)]
lhs = hol(0, 1, 2) @ hol(0, 2, 3) @ hol(0, 3, 1)
rhs = c[(0, 1)] @ hol(1, 2, 3) @ c[(1, 0)]
assert np.linalg.norm(lhs - rhs) < 1e-12 and np.linalg.norm(hol(1, 2, 3) - np.eye(n)) > 0.1
ok("F5a", "tetrahedron: h(x,y,z)h(x,z,w)h(x,w,y) = c_xy h(y,z,w) c_yx for non-flat random comparisons")

V = [(x, y, z) for z in (0, 1) for y in (0, 1) for x in (0, 1)]
vid = {v: i for i, v in enumerate(V)}
edges = [(a, b) for a in range(8) for b in range(a + 1, 8)
         if sum(abs(V[a][k] - V[b][k]) for k in range(3)) == 1]
eid = {e: k + 1 for k, e in enumerate(edges)}
assert len(edges) == 12


def gen(a, b):
    return eid[(a, b)] if a < b else -eid[(b, a)]


faces = {
    "top":    [(0, 0, 1), (1, 0, 1), (1, 1, 1), (0, 1, 1)],
    "front":  [(0, 0, 0), (1, 0, 0), (1, 0, 1), (0, 0, 1)],
    "right":  [(1, 0, 0), (1, 1, 0), (1, 1, 1), (1, 0, 1)],
    "back":   [(0, 1, 0), (0, 1, 1), (1, 1, 1), (1, 1, 0)],
    "left":   [(0, 0, 0), (0, 0, 1), (0, 1, 1), (0, 1, 0)],
    "bottom": [(0, 0, 0), (0, 1, 0), (1, 1, 0), (1, 0, 0)],
}
count = {}
for cyc in faces.values():
    for k in range(4):
        g = gen(vid[cyc[k]], vid[cyc[(k + 1) % 4]])
        count[g] = count.get(g, 0) + 1
assert sorted(count) == sorted([g for k in range(1, 13) for g in (k, -k)]) and set(count.values()) == {1}
order = ["top", "front", "right", "back", "left", "bottom"]
cut = set()
for f, g in zip(order, order[1:]):
    shared = set(map(frozenset, zip(faces[f], faces[f][1:] + faces[f][:1]))) & \
             set(map(frozenset, zip(faces[g], faces[g][1:] + faces[g][:1])))
    assert len(shared) == 1
    cut.add(tuple(sorted(vid[p] for p in next(iter(shared)))))
tree = [e for e in edges if e not in cut]
assert len(tree) == 7
path = {0: ()}
frontier = [0]
while frontier:
    a = frontier.pop()
    for (p, q) in tree:
        for (s, t) in ((p, q), (q, p)):
            if s == a and t not in path:
                path[t] = wmul(path[a], (gen(s, t),))
                frontier.append(t)
assert len(path) == 8                                      # 留下的 7 条棱构成生成树


def lasso(name, start):
    cyc = [vid[p] for p in faces[name]]
    cyc = cyc[start:] + cyc[:start]
    loop = tuple(gen(cyc[k], cyc[(k + 1) % 4]) for k in range(4))
    return wmul(path[cyc[0]], loop, winv(path[cyc[0]]))


solution = None
for seq in (order, order[::-1]):
    for starts in itertools.product(range(4), repeat=6):
        if wmul(*[lasso(f, s) for f, s in zip(seq, starts)]) == ():
            solution = (seq, starts)
            break
    if solution:
        break
assert solution is not None
links = {k: haar_su(3) for k in range(1, 13)}
prod = np.eye(3, dtype=complex)
for f, s in zip(*solution):
    w = weval(lasso(f, s), links)
    assert np.linalg.norm(w - np.eye(3)) > 0.1
    prod = prod @ w
assert np.linalg.norm(prod - np.eye(3)) < 1e-10
ok("F5b", f"cube: ordered product of six tree-lassoed plaquettes is the empty word in F(12); "
          f"order {'>'.join(solution[0])}, base corners {solution[1]}; random SU(3) links dev "
          f"{np.linalg.norm(prod - np.eye(3)):.1e}")
theta = {k: RNG.uniform(-np.pi, np.pi) for k in range(1, 13)}
tot = sum(sum((1 if g > 0 else -1) * theta[abs(g)]
              for g in (gen(vid[cyc[k]], vid[cyc[(k + 1) % 4]]) for k in range(4)))
          for cyc in faces.values())
assert abs(tot) < 1e-12
ok("F5c", "cube, abelian: the six outward plaquette fluxes of an edge potential sum to 0")

# ----------------------------------------------------------------------------
# F6  非阿贝尔斯托克斯分解与界
# ----------------------------------------------------------------------------
# 扇形恒等式（R5），取任意非平坦的比较
m = 7
c = {}
for i in range(m):
    c[(i, i)] = np.eye(3, dtype=complex)
    for j in range(i + 1, m):
        c[(i, j)] = near_identity_su(3, 0.3)
        c[(j, i)] = dag(c[(i, j)])
bd = np.eye(3, dtype=complex)
for k in range(m):
    bd = bd @ c[(k, (k + 1) % m)]
fan = np.eye(3, dtype=complex)
fans = []
for k in range(1, m - 1):
    hk = c[(0, k)] @ c[(k, k + 1)] @ c[(k + 1, 0)]
    fans.append(hk)
    fan = fan @ hk
assert np.linalg.norm(bd - fan) < 1e-12
assert math.sqrt(sagitta(bd)) <= sum(math.sqrt(sagitta(h)) for h in fans) + 1e-12
ok("F6a", "fan Stokes identity and sqrt-sagitta subadditivity on a heptagon (non-flat SU(3) data)")



def grid_factorisation_holds(nr, nt):
    """nr x nt 矩形网格：锚定小方格按“列从右到左、列内从下到上”相乘，在自由群中等于边界回路。"""
    h_ = lambda i, j: 1 + i + j * nr
    w_ = lambda i, j: 1 + nr * (nt + 1) + i + j * (nr + 1)

    def lasso_(i, j):
        b = tuple(h_(k, 0) for k in range(i))
        v = tuple(w_(i, k) for k in range(j))
        return wmul(b, v, (h_(i, j), w_(i + 1, j), -h_(i, j + 1), -w_(i, j)), winv(v), winv(b))

    bd = wmul(tuple(h_(i, 0) for i in range(nr)), tuple(w_(nr, j) for j in range(nt)),
              tuple(-h_(i, nt) for i in reversed(range(nr))), tuple(-w_(0, j) for j in reversed(range(nt))))
    return wmul(*[lasso_(i, j) for i in reversed(range(nr)) for j in range(nt)]) == bd


assert all(grid_factorisation_holds(nr, nt) for nr in range(1, 7) for nt in range(1, 7))
R, Tt = 4, 3
hid = lambda i, j: 1 + i + j * R                            # 水平棱 (i,j)->(i+1,j)，j 取 0..Tt
vidx = lambda i, j: 1 + R * (Tt + 1) + i + j * (R + 1)      # 竖直棱 (i,j)->(i,j+1)，i 取 0..R


def plaq_word(i, j):
    return (hid(i, j), vidx(i + 1, j), -hid(i, j + 1), -vidx(i, j))


def lasso_grid(i, j):
    b = tuple(hid(k, 0) for k in range(i))
    v = tuple(vidx(i, k) for k in range(j))
    return wmul(b, v, plaq_word(i, j), winv(v), winv(b))


boundary = wmul(tuple(hid(i, 0) for i in range(R)), tuple(vidx(R, j) for j in range(Tt)),
                tuple(-hid(i, Tt) for i in reversed(range(R))), tuple(-vidx(0, j) for j in reversed(range(Tt))))
seq = [(i, j) for i in reversed(range(R)) for j in range(Tt)]
assert wmul(*[lasso_grid(i, j) for i, j in seq]) == boundary
nlinks = R * (Tt + 1) + (R + 1) * Tt
worst_ratio = 0.0
for eps in (0.02, 0.3, None):
    for _ in range(20):
        links = {k: (haar_su(3) if eps is None else near_identity_su(3, eps)) for k in range(1, nlinks + 1)}
        W = weval(boundary, links)
        ps = [weval(plaq_word(i, j), links) for i, j in seq]
        lhs = chord_norm(W)
        rhs = sum(chord_norm(p) for p in ps)
        assert lhs <= rhs + 1e-10
        assert sagitta(W) <= len(ps) * sum(sagitta(p) for p in ps) + 1e-10
        worst_ratio = max(worst_ratio, lhs / rhs)
ok("F6b", f"{R}x{Tt} Wilson loop = ordered product of {R * Tt} lassoed plaquettes (free-group identity); "
          f"||W-1|| <= sum ||U_p-1|| and v_C <= M sum v_p hold, max ratio {worst_ratio:.3f}; "
          "the word identity holds for every grid up to 6x6")
th = 0.01                                                    # 相干的阿贝尔情形在领头阶取到界
ratio = math.sqrt(1 - math.cos(R * Tt * th)) / (R * Tt * math.sqrt(1 - math.cos(th)))
assert 0.999 < ratio <= 1.0
ok("F6c", f"tightness: coherent U(1) fluxes give ratio {ratio:.6f}")

# ----------------------------------------------------------------------------
# F7  零作用量：圆盘上是纯规范，环面上有缝扇区
# ----------------------------------------------------------------------------
g = {(i, j): haar_su(3) for i in range(R + 1) for j in range(Tt + 1)}
links = {}
for i in range(R):
    for j in range(Tt + 1):
        links[hid(i, j)] = dag(g[(i, j)]) @ g[(i + 1, j)]
for i in range(R + 1):
    for j in range(Tt):
        links[vidx(i, j)] = dag(g[(i, j)]) @ g[(i, j + 1)]
assert max(sagitta(weval(plaq_word(i, j), links)) for i in range(R) for j in range(Tt)) < 1e-12
assert sagitta(weval(boundary, links)) < 1e-12
# 沿梳状树由平坦链变量重建势并比较
pot = {(0, 0): np.eye(3, dtype=complex)}
for i in range(R):
    pot[(i + 1, 0)] = pot[(i, 0)] @ links[hid(i, 0)]
for i in range(R + 1):
    for j in range(Tt):
        pot[(i, j + 1)] = pot[(i, j)] @ links[vidx(i, j)]
dev = max(np.linalg.norm(links[hid(i, j)] - dag(pot[(i, j)]) @ pot[(i + 1, j)])
          for i in range(R) for j in range(Tt + 1))
assert dev < 1e-10
ok("F7a", f"disc: U_xy = g_x^* g_y has zero action; flat links are recovered from a tree potential (dev {dev:.1e})")
Lt, alpha = 4, np.pi
hor = {(i, j): (np.exp(1j * alpha) if i == Lt - 1 else 1.0) for i in range(Lt) for j in range(Lt)}
ver = {(i, j): 1.0 for i in range(Lt) for j in range(Lt)}
plaqs = [hor[(i, j)] * ver[((i + 1) % Lt, j)] / hor[(i, (j + 1) % Lt)] / ver[(i, j)]
         for i in range(Lt) for j in range(Lt)]
row = np.prod([hor[(i, 0)] for i in range(Lt)])
assert max(abs(p - 1) for p in plaqs) < 1e-12 and abs(row + 1) < 1e-12
ok("F7b", "torus: one seam of -1 links has zero action but row holonomy -1, so it is not a pure gauge")

# ----------------------------------------------------------------------------
# F8  雷吉角亏与矢高；角亏 = 法向所张球面三角形的吉拉尔角盈
# ----------------------------------------------------------------------------
# （面的边数 p，顶点度数 q，顶点数）；顶点数直接给出，不由欧拉公式推出
plat = {"tetrahedron": (3, 3, 4), "cube": (4, 3, 8), "octahedron": (3, 4, 6),
        "dodecahedron": (5, 3, 20), "icosahedron": (3, 5, 12)}
line = []
for name, (p, q, nv) in plat.items():
    assert (nv * q) % p == 0 and nv - nv * q // 2 + nv * q // p == 2      # V - E + F = 2，E = Vq/2，F = Vq/p
    d = 2 * math.pi - q * math.pi * (1 - 2 / p)
    assert abs(nv * d - 4 * math.pi) < 1e-12
    line.append(f"{name} {nv * (1 - math.cos(d)):.4f}")
ok("F8a", "sum of deficits = 720 deg for all five; sagitta sums differ: " + ", ".join(line))


def deficit_from_normals(n1, n2, n3):
    return 2 * math.atan2(abs(np.dot(n1, np.cross(n2, n3))), 1 + n1 @ n2 + n2 @ n3 + n3 @ n1)


worst = 0.0
for _ in range(500):
    e = RNG.normal(size=(3, 3))
    e /= np.linalg.norm(e, axis=1)[:, None]
    if abs(np.linalg.det(e)) < 0.05:
        continue
    th = [math.acos(np.clip(e[(k + 1) % 3] @ e[(k + 2) % 3], -1, 1)) for k in range(3)]
    ns = []
    for k in range(3):
        nrm = np.cross(e[(k + 1) % 3], e[(k + 2) % 3])
        nrm /= np.linalg.norm(nrm)
        if nrm @ e[k] > 0:
            nrm = -nrm
        ns.append(nrm)
    worst = max(worst, abs((2 * math.pi - sum(th)) - deficit_from_normals(*ns)))
assert worst < 1e-9
cube_d = deficit_from_normals(np.array([1., 0, 0]), np.array([0, 1., 0]), np.array([0, 0, 1.]))
tn = [np.array(v, float) / math.sqrt(3) for v in ((-1, -1, 1), (-1, 1, -1), (1, -1, -1))]
tet_d = deficit_from_normals(*tn)
assert abs(cube_d - math.pi / 2) < 1e-12 and abs(tet_d - math.pi) < 1e-12
ok("F8b", f"trihedral corner: 2pi - sum(face angles) = 2 atan2([n1,n2,n3], 1+sum n.n) "
          f"(500 random corners, max dev {worst:.1e}; cube 90 deg, tetrahedron 180 deg)")

# 二十面体的测地细分：角亏之和是拓扑量，矢高之和衰减
gphi = (1 + math.sqrt(5)) / 2
verts = [np.array(v, float) for v in
         [(-1, gphi, 0), (1, gphi, 0), (-1, -gphi, 0), (1, -gphi, 0), (0, -1, gphi), (0, 1, gphi),
          (0, -1, -gphi), (0, 1, -gphi), (gphi, 0, -1), (gphi, 0, 1), (-gphi, 0, -1), (-gphi, 0, 1)]]
verts = [v / np.linalg.norm(v) for v in verts]
tris = [(0, 11, 5), (0, 5, 1), (0, 1, 7), (0, 7, 10), (0, 10, 11), (1, 5, 9), (5, 11, 4), (11, 10, 2),
        (10, 7, 6), (7, 1, 8), (3, 9, 4), (3, 4, 2), (3, 2, 6), (3, 6, 8), (3, 8, 9), (4, 9, 5),
        (2, 4, 11), (6, 2, 10), (8, 6, 7), (9, 8, 1)]
rows = []
for level in range(4):
    ang = np.zeros(len(verts))
    for (a, b, cc) in tris:
        for (p, q, r) in ((a, b, cc), (b, cc, a), (cc, a, b)):
            u_, w_ = verts[q] - verts[p], verts[r] - verts[p]
            ang[p] += math.acos(np.clip(u_ @ w_ / np.linalg.norm(u_) / np.linalg.norm(w_), -1, 1))
    d = 2 * math.pi - ang
    assert abs(d.sum() - 4 * math.pi) < 1e-9
    rows.append((len(verts), float(np.sum(1 - np.cos(d)))))
    cache, new = {}, []
    for (a, b, cc) in tris:
        mids = []
        for (p, q) in ((a, b), (b, cc), (cc, a)):
            key = (min(p, q), max(p, q))
            if key not in cache:
                mvec = verts[p] + verts[q]
                verts.append(mvec / np.linalg.norm(mvec))
                cache[key] = len(verts) - 1
            mids.append(cache[key])
        new += [(a, mids[0], mids[2]), (b, mids[1], mids[0]), (cc, mids[2], mids[1]), tuple(mids)]
    tris = new
assert abs(rows[0][1] - 6.0) < 1e-9
assert all(rows[k + 1][1] < rows[k][1] / 3.0 for k in range(3))
ok("F8c", "geodesic spheres (V, sum of 1-cos deficit): " + ", ".join(f"({v}, {s:.4f})" for v, s in rows)
          + "; sum of deficits stays 4 pi")
dh = 2 * math.pi - 4 * math.acos(1 / 3)
assert abs(math.degrees(dh) - 77.885) < 0.001 and abs(math.degrees(4 * math.acos(1 / 3)) - 282.12) < 0.01
ok("F8d", f"book hinge (4 regular tetrahedra): deficit {math.degrees(dh):.3f} deg = {dh:.4f} rad, "
          f"sin = {math.sin(dh):.4f}, 1-cos = {1 - math.cos(dh):.4f}, d^2/2 = {dh ** 2 / 2:.4f}")
exc = 2 * math.atan(math.tan(math.pi / 8) ** 2)
assert abs(math.degrees(exc) - 19.4712) < 1e-3 and abs(exc - math.asin(1 / 3)) < 1e-12
ok("F8e", f"right spherical triangle with two 45 deg legs: excess {math.degrees(exc):.2f} deg = asin(1/3)")
k5 = 2 * math.pi - 3 * math.acos(1 / 3)
assert abs(math.degrees(k5) - 148.41) < 0.01
ok("F8f", f"boundary of the regular 4-simplex: deficit {math.degrees(k5):.2f} deg on each of the 10 edges")

# ----------------------------------------------------------------------------
# F9  读数的奇偶性
# ----------------------------------------------------------------------------
worst = max(abs(np.trace(haar_su(2)).imag) for _ in range(200))
assert worst < 1e-12
im3 = max(abs(np.trace(haar_su(3)).imag) for _ in range(50))
assert im3 > 0.1
for _ in range(100):
    nvec = RNG.normal(size=3)
    nvec /= np.linalg.norm(nvec)
    K = np.array([[0, -nvec[2], nvec[1]], [nvec[2], 0, -nvec[0]], [-nvec[1], nvec[0], 0]])
    d = RNG.uniform(-np.pi, np.pi)
    Rm = np.eye(3) + math.sin(d) * K + (1 - math.cos(d)) * K @ K
    assert abs(-0.5 * np.trace(K @ Rm) - math.sin(d)) < 1e-12
    assert abs(0.5 * (np.trace(Rm) - 1) - math.cos(d)) < 1e-12
    assert abs(-0.5 * np.trace(K @ Rm.T) + math.sin(d)) < 1e-12      # 回路反向：奇
    assert abs(np.trace(Rm.T) - np.trace(Rm)) < 1e-12                 # 回路反向：偶
ok("F9", f"odd channel: tr(h-h*) = 0 on SU(2) (max {worst:.1e}), nonzero on SU(3) ({im3:.2f}); "
         "hinge reading -tr(J R)/2 = sin(deficit) flips under loop reversal, tr R does not")

# ----------------------------------------------------------------------------
# F10  有界与无界的结构群
# ----------------------------------------------------------------------------
for eta in (0.5, 1.0, 3.0):
    b = np.diag([math.exp(eta / 2), math.exp(-eta / 2)])                 # SL(2,C) 推进
    assert abs((1 - np.trace(b) / 2) - (1 - math.cosh(eta / 2))) < 1e-12
    Lb = np.eye(4)
    Lb[0, 0] = Lb[1, 1] = math.cosh(eta)
    Lb[0, 1] = Lb[1, 0] = math.sinh(eta)
    assert abs((1 - np.trace(Lb) / 4) - (1 - math.cosh(eta)) / 2) < 1e-12
    Lr = np.eye(4)
    Lr[1, 1] = Lr[2, 2] = math.cos(eta)
    Lr[1, 2], Lr[2, 1] = -math.sin(eta), math.sin(eta)
    assert abs((1 - np.trace(Lr) / 4) - (1 - math.cos(eta)) / 2) < 1e-12
Kb = np.zeros((4, 4)); Kb[0, 1] = Kb[1, 0] = 1
Jr = np.zeros((4, 4)); Jr[1, 2], Jr[2, 1] = -1, 1
assert np.trace(Kb @ Kb) == 2 and np.trace(Jr @ Jr) == -2
ok("F10", "trace reading on SO(1,3): rotation (1-cos)/2 >= 0, boost (1-cosh)/2 <= 0; "
          "tr K^2 = +2, tr J^2 = -2 (indefinite trace form)")

# ----------------------------------------------------------------------------
# F11  电荷量子化需要精确回归，有界回归不够
# ----------------------------------------------------------------------------
q = np.array([1.0, math.sqrt(2.0)])
ns = np.arange(1, 200001)
dist = np.sqrt(np.sum(np.abs(np.exp(1j * np.outer(ns, q) * 1.0) - 1) ** 2, axis=1) / 2)
assert dist.min() > 0 and dist.min() < 0.01 and dist.max() <= 2.0 + 1e-12
k = int(ns[np.argmin(dist)])
ok("F11a", f"u = diag(e^i, e^(i sqrt2)): all powers bounded, closest return for n <= 2e5 is "
           f"{dist.min():.2e} at n = {k}, never 0")
u = np.diag(np.exp(2j * np.pi * np.array([3 / 7, 2 / 5])))
assert np.linalg.norm(np.linalg.matrix_power(u, 35) - np.eye(2)) < 1e-12
Vq = haar_unitary(3)
Qi = Vq @ np.diag([2.0, -1.0, 5.0]) @ dag(Vq)
Qn = Vq @ np.diag([2.0, -1.0, 0.5]) @ dag(Vq)
assert np.linalg.norm(expi(2 * np.pi * Qi) - np.eye(3)) < 1e-10
assert np.linalg.norm(expi(2 * np.pi * Qn) - np.eye(3)) > 1.0
ok("F11b", "rational eigen-angles return exactly (n = 35); exp(2 pi i Q) = 1 iff spec Q is integral")

# ----------------------------------------------------------------------------
# F12  一般色数下 §39.11.2 的迹代数
# ----------------------------------------------------------------------------
Nc, Ns = sp.symbols("N_c N_star", positive=True)
half = sp.Rational(1, 2)
YQ = 1 / (2 * Nc)
Qu, Qd = (Nc + 1) / (2 * Nc), -(Nc - 1) / (2 * Nc)
# 左手外尔场的（色维数，弱维数，超荷）
gen_fields = [(Nc, 2, YQ), (Nc, 1, -Qu), (Nc, 1, -Qd), (1, 2, -half), (1, 1, sp.Integer(1))]
trT3 = sum(dc * half for dc, dw, y in gen_fields if dw == 2)
trY = sum(dc * dw * y ** 2 for dc, dw, y in gen_fields)
trTc = sum(dw * half for dc, dw, y in gen_fields if dc != 1)
assert sp.simplify(trT3 - (Nc + 1) / 2) == 0
assert sp.simplify(trY - (Nc + 1) * (Nc + 2) / (2 * Nc)) == 0
assert sp.simplify(trTc - 2) == 0
assert sp.simplify(trT3 + trY - (Nc + 1) ** 2 / Nc) == 0
anomalies = [sum(dc * y for dc, dw, y in gen_fields if dw == 2),            # SU(2)^2 U(1)
             sum(dw * y for dc, dw, y in gen_fields if dc != 1),            # SU(N)^2 U(1)
             sum(dc * dw * y for dc, dw, y in gen_fields),                  # grav^2 U(1)
             sum(dc * dw * y ** 3 for dc, dw, y in gen_fields)]             # U(1)^3
assert all(sp.simplify(a) == 0 for a in anomalies)
sin_anom = sp.simplify(trT3 / (trT3 + trY))
assert sp.simplify(sin_anom - Nc / (2 * (Nc + 1))) == 0
assert sp.simplify(trT3 / trTc - (Nc + 1) / 4) == 0
assert sp.simplify(trY / trT3 - (Nc + 2) / Nc) == 0
ok("F12a", "Tr T3^2 = (N+1)/2, Tr Tc^2 = 2, Tr Y^2 = (N+1)(N+2)/(2N), four anomalies vanish for all N; "
           "sin^2 = N/(2(N+1)), g3^2/g2^2 = (N+1)/4, k_Y = (N+2)/N")
# 用任意 N_star 处反常相消的电荷构造“固定电荷”曲线
q2 = ((Ns + 1) ** 2 + (Ns - 1) ** 2) / (4 * Ns ** 2)
sin_fixed = ((Nc + 1) / 2) / (2 * (1 + Nc * q2))
diff = sp.factor(sp.together(sin_anom - sin_fixed))
closed = (Nc - Ns) * (Nc + Ns) / (2 * (Nc + 1) * (Nc * Ns ** 2 + Nc + 2 * Ns ** 2))
assert sp.simplify(sin_anom - sin_fixed - closed) == 0
roots = sp.solve(sp.Eq(sin_anom, sin_fixed), Nc)
assert roots == [Ns]
assert sp.simplify(sin_fixed.subs(Ns, 3) - 9 * (Nc + 1) / (4 * (9 + 5 * Nc))) == 0
# 实测电荷 (2/3, -1/3) 给出 Y_Q = 1/6；[SU(2)]^2 U(1) 反常相消 N_c Y_Q = 1/2 的解同样是 N_c = 3
assert sp.solve(sp.Eq(Nc * (sp.Rational(2, 3) - half), half), Nc) == [3]
ok("F12b", f"the two curves of 39.11.2 meet exactly at N_c = N_star for every N_star (difference {diff}); "
           "with the measured charges, N_c Y_Q = 1/2 and Y_Q = 1/6 give N_c = 3")
tab = [(n_, sp.Rational(n_, 2 * (n_ + 1)), sp.Rational(9 * (n_ + 1), 4 * (9 + 5 * n_))) for n_ in range(1, 6)]
assert tab[0][1:] == (sp.Rational(1, 4), sp.Rational(9, 28)) and tab[1][2] == sp.Rational(27, 76)
assert tab[2][1:] == (sp.Rational(3, 8), sp.Rational(3, 8)) and tab[3][2] == sp.Rational(45, 116)
assert tab[4][1:] == (sp.Rational(5, 12), sp.Rational(27, 68))
ok("F12c", "book table rows N_c = 1..5 reproduced exactly")

# Tr T3^2 / Tr Q^2 对表示的依赖与不依赖
w5 = [(sp.Integer(0), sp.Rational(-1, 3), half), (sp.Integer(0), sp.Rational(-1, 3), -half),
      (sp.Integer(0), sp.Rational(-1, 3), sp.Integer(0)), (half, half, sp.Integer(0)),
      (-half, half, sp.Integer(0))]                                         # 5 表示的 (T3, Y, Tc3)
add = lambda a, b, s=1: tuple(x + s * y for x, y in zip(a, b))
reps = {"5": w5,
        "10": [add(w5[i], w5[j]) for i in range(5) for j in range(i + 1, 5)],
        "24": [add(w5[i], w5[j], -1) for i in range(5) for j in range(5) if i != j] + [(0, 0, 0)] * 4,
        "15": [add(w5[i], w5[j]) for i in range(5) for j in range(i, 5)]}
for name, ws in reps.items():
    t3 = sum(w[0] ** 2 for w in ws)
    yy = sum(w[1] ** 2 for w in ws)
    tc = sum(w[2] ** 2 for w in ws)
    qq = sum((w[0] + w[1]) ** 2 for w in ws)
    assert sp.Rational(t3, qq) == sp.Rational(3, 8) and t3 == tc and yy == sp.Rational(5, 3) * t3
higgs = [(half, half), (-half, half)]
r_h = sp.Rational(sum(w[0] ** 2 for w in higgs), sum((w[0] + w[1]) ** 2 for w in higgs))
assert r_h == half
t3_ind = 3 * 2 * sp.Rational(2, 3) + half * sp.Rational(1, 3)                # 三代费米子加一个标量二重态
y_ind = 3 * sp.Rational(10, 3) * sp.Rational(2, 3) + half * sp.Rational(1, 3)
assert sp.Rational(t3_ind, t3_ind + y_ind) == sp.Rational(25, 66)
assert sp.Rational(3, 5) * y_ind == sp.Rational(41, 10) and t3_ind == sp.Rational(25, 6)
ok("F12d", "Tr T3^2/Tr Q^2 = 3/8 on the SU(5) representations 5, 10, 15, 24; Higgs doublet alone 1/2; "
           "matter-weighted SM ledger 25/66")

# G_SM 不变但不均匀的多重态权：三条刚度关系照样成立，所以公设不蕴涵读数在全体酉变换下不变
wts = {"Q": sp.Integer(1), "u": half, "d": sp.Rational(3, 2), "L": sp.Integer(1), "e": sp.Rational(3, 2)}
fields3 = [("Q", 3, 2, sp.Rational(1, 6)), ("u", 3, 1, -sp.Rational(2, 3)), ("d", 3, 1, sp.Rational(1, 3)),
           ("L", 1, 2, -half), ("e", 1, 1, sp.Integer(1))]            # （名字，色维数，弱维数，超荷）
w_t3 = sum(wts[k] * dc * half for k, dc, dw, y in fields3 if dw == 2)
w_tc = sum(wts[k] * dw * half for k, dc, dw, y in fields3 if dc != 1)
w_y = sum(wts[k] * dc * dw * y ** 2 for k, dc, dw, y in fields3)
assert len(set(wts.values())) > 1 and (w_t3, w_tc, w_y) == (2, 2, sp.Rational(10, 3))
assert w_y / w_t3 == sp.Rational(5, 3) and w_t3 / (w_t3 + w_y) == sp.Rational(3, 8)
wQ, wu, wd, wL = sp.symbols("w_Q w_u w_d w_L", positive=True)
ratio = (3 * wQ + wL) / (2 * wQ + wu + wd)                            # g3^2/g2^2 = Tr_w T3^2 / Tr_w Tc^2
assert ratio.subs({wQ: 1, wu: 1, wd: 1, wL: 1}) == 1 and ratio.subs({wQ: 1, wu: 1, wd: 1, wL: 5}) == 2
assert sp.limit(ratio.subs({wQ: 1, wu: 1, wd: 1}), wL, sp.oo) == sp.oo
assert sp.limit(ratio.subs({wQ: 1, wL: 1, wd: 1}), wu, sp.oo) == 0
ok("F12e", "G_SM-invariant weights (w_Q, w_u, w_d, w_L, w_e) = (1, 1/2, 3/2, 1, 3/2) give Tr T3^2 = Tr Tc^2 = 2, "
           "Tr Y^2 = 10/3, sin^2 = 3/8; with free weights g3^2/g2^2 = (3 w_Q + w_L)/(2 w_Q + w_u + w_d) is unbounded")

# ----------------------------------------------------------------------------
# F13  §39.9 与 §39.11 的跑动数值
# ----------------------------------------------------------------------------
MZ, AINV, S2, A3 = 91.1876, 127.930, 0.23129, 0.1180
B = (41 / 10, -19 / 6, -7.0)
a0 = (3 / 5 * AINV * (1 - S2), AINV * S2, 1 / A3)
assert [round(v, 2) for v in a0] == [59.00, 29.59, 8.47]
inv = lambda i, mu: a0[i] - B[i] / (2 * math.pi) * math.log(mu / MZ)
cross = lambda i, j: MZ * math.exp(2 * math.pi * (a0[i] - a0[j]) / (B[i] - B[j]))
mu12, mu13, mu23 = cross(0, 1), cross(0, 2), cross(1, 2)
assert abs(mu12 / 1.014e13 - 1) < 2e-3 and abs(math.log(mu12 / MZ) - 25.4345) < 2e-3
assert abs(math.log10(mu12) - 13.0060) < 5e-4
assert abs(mu13 / 2.41e14 - 1) < 5e-3 and abs(mu23 / 9.77e16 - 1) < 5e-3
assert [round(inv(i, mu12), 2) for i in range(3)] == [42.41, 42.41, 36.81]
assert [round(inv(i, mu13), 2) for i in range(3)] == [40.34, 44.00, 40.34]
assert [round(inv(i, mu23), 2) for i in range(3)] == [36.42, 47.03, 47.03]
EP = 1.220890e19
assert [round(inv(i, EP), 2) for i in range(3)] == [33.27, 49.46, 52.41]
sw = lambda mu: inv(1, mu) / (5 / 3 * inv(0, mu) + inv(1, mu))
assert abs(sw(mu12) - 0.375) < 1e-12 and abs(sw(mu13) - 0.39559) < 2e-5
assert abs(sw(mu23) - 0.43655) < 2e-5 and abs(sw(EP) - 0.47146) < 2e-5
span13 = inv(1, mu13) - inv(0, mu13)
spans = [max(inv(i, m_) for i in range(3)) - min(inv(i, m_) for i in range(3)) for m_ in (mu12, mu13, mu23)]
assert abs(span13 - 3.664) < 2e-3 and abs(min(spans) - span13) < 1e-9
shift = 109 / (48 * math.pi) / AINV * math.log(mu12 / MZ)
assert abs(shift - 0.14371) < 1e-5 and abs(0.375 - shift - S2) < 1e-12
ok("F13a", f"mu12 = {mu12:.4e} GeV (ln = {math.log(mu12 / MZ):.4f}); 3/8 - {shift:.5f} = {0.375 - shift:.5f} "
           "is the input value again (mu12 is defined from it)")
Lg = 2 * math.pi * (8 / 3 / A3 - AINV) / (8 / 3 * B[2] - B[1] - 5 / 3 * B[0])
mug = MZ * math.exp(Lg)
sgqw = 0.375 - 109 / (48 * math.pi) / AINV * Lg
assert abs(mug / 6.76e14 - 1) < 5e-3 and abs(sgqw - 0.2076) < 1e-4
a3pred = 1 / (inv(0, mu12) + B[2] / (2 * math.pi) * math.log(mu12 / MZ))
splanck = 0.375 - 109 / (48 * math.pi) / AINV * math.log(EP / MZ)
ok("F13b", f"three-line one-loop value sin^2 = {sgqw:.4f} at {mug:.3e} GeV; alpha_s(MZ) implied by mu12 = "
           f"{a3pred:.4f} (input 0.1180); 3/8 imposed at E_P gives sin^2(MZ) = {splanck:.4f}; "
           f"minimal span {span13:.3f} at mu13")
assert abs(a3pred - 0.0711) < 5e-4 and abs(splanck - 0.1522) < 5e-4
xg = []
for i in range(3):
    mu = EP
    for _ in range(200):
        mu = EP * math.sqrt(1 / inv(i, mu))
    xg.append(mu)
assert all(0.13 < m_ / EP < 0.18 for m_ in xg)
ratios = [1 / (1 / inv(i, EP)) for i in range(3)]
ok("F13c", "alpha_G(E)=(E/E_P)^2 equals alpha_i at E/E_P = " + ", ".join(f"{m_ / EP:.3f}" for m_ in xg)
           + f"; at E_P itself alpha_G/alpha_i = {ratios[0]:.1f}, {ratios[1]:.1f}, {ratios[2]:.1f}")
ME, MP_, AEM = 5.1099895e-4, 0.9382721, 1 / 137.035999
ag_e, ag_p = (ME / EP) ** 2, (MP_ / EP) ** 2
assert abs(ag_e / 1.7518e-45 - 1) < 1e-3 and abs(ag_p / 5.9062e-39 - 1) < 1e-3
assert abs(AEM / ag_e / 4.1656e42 - 1) < 1e-3 and abs(AEM / ag_p / 1.2356e36 - 1) < 1e-3
assert abs((MZ / EP) ** 2 / 5.58e-35 - 1) < 5e-3 and abs((1 / EP) ** 2 / 6.71e-39 - 1) < 5e-3
sinst = 2 * math.pi * a0[1]
assert abs(sinst - 185.91) < 0.02
assert abs(math.exp(-sinst) / 1.82e-81 - 1) < 0.02 and abs(math.exp(-2 * sinst) / 3.30e-162 - 1) < 0.03
hbar = 6.582119569e-25                                      # GeV s
tau = EP ** 4 / MP_ ** 5 * hbar / 3.15576e7
assert 44 < math.log10(tau) < 46
vev = 246.22
assert abs(math.sqrt(2) * ME / vev / 2.935e-6 - 1) < 1e-3 and abs(math.sqrt(2) * 172.57 / vev - 0.9912) < 1e-4
assert abs(125.20 ** 2 / (2 * vev ** 2) - 0.129) < 5e-4
assert abs(197.3269804 / 80369 / 2.46e-3 - 1) < 5e-3 and abs(math.exp(-80.369 / 100) - 0.448) < 5e-4
assert abs(0.18 / 0.1973269804 - 0.91) < 5e-3 and abs(0.91 * 1.20 - 1.09) < 5e-3
ok("F13d", f"hierarchy, instanton (S = {sinst:.2f}), Yukawa, Yukawa-range and string-tension numbers reproduced; "
           f"Planck-suppressed lifetime 10^{math.log10(tau):.1f} yr")
c_light, H0 = 2.99792458e8, 67.4e3 / 3.0856775814913673e22
lP, OL = 1.616255e-35, 0.685
eps = lP * H0 / c_light
with mp.workdps(160):                                      # eps^2 ~ 1e-122，需要多于 122 位有效数字
    floor_ = 1 - mp.cos(mp.mpf(eps))
lam = 3 * OL * eps ** 2
assert abs(float(floor_) / (eps ** 2 / 2) - 1) < 1e-6 and abs(float(floor_) / lam - 1 / (6 * OL)) < 1e-6
ok("F13e", f"with H0 = 67.4, Omega_L = 0.685: l_P/R_H = {eps:.3e}, sagitta floor {float(floor_):.2e}, "
           f"Lambda l_P^2 = {lam:.2e}, ratio = 1/(6 Omega_L) = {1 / (6 * OL):.3f}")

# ----------------------------------------------------------------------------
# F14  “三维封顶”包含什么、不包含什么
# ----------------------------------------------------------------------------
assert [d for d in range(0, 50) if math.comb(d, 2) == d] == [0, 3]
dd, NN, kk = sp.symbols("d N k")
rig = sp.factor(NN * (NN - 1) / 2 - (dd * NN - dd * (dd + 1) / 2))
assert sp.simplify(rig - (NN - dd) * (NN - dd - 1) / 2) == 0
spur = sp.factor(kk * dd * (kk * dd - 1) / 2 - kk * dd * (dd - 1) / 2)
assert sp.simplify(spur - dd ** 2 * kk * (kk - 1) / 2) == 0
assert [9 * math.comb(k_, 2) for k_ in range(1, 6)] == [0, 9, 27, 54, 90]
assert [(m_ * m_ * n_ * n_ - 1, m_ * m_ - 1 + n_ * n_ - 1, (m_ * m_ - 1) * (n_ * n_ - 1))
        for m_, n_ in ((2, 2), (2, 3), (3, 3))] == [(15, 6, 9), (35, 11, 24), (80, 16, 64)]
lam_j = [2.0 ** -(j + 1) for j in range(60)]
assert sum(1 for v in lam_j if v >= 0.05) == 4 and abs(sum(lam_j[:4]) - 15 / 16) < 1e-15


def commutant_dim(d):
    pairs = [(i, j) for i in range(d) for j in range(i + 1, d)]
    basis = []
    for (i, j) in pairs:
        m_ = np.zeros((d, d))
        m_[i, j], m_[j, i] = 1, -1
        basis.append(m_)
    nb = len(basis)
    flat = np.array([b[np.triu_indices(d, 1)] for b in basis])
    ads = []
    for x in basis:
        ad = np.zeros((nb, nb))
        for b_idx, y in enumerate(basis):
            ad[:, b_idx] = np.linalg.solve(flat.T, (x @ y - y @ x)[np.triu_indices(d, 1)])
        ads.append(ad)
    rows_ = [np.kron(np.eye(nb), ad) - np.kron(ad.T, np.eye(nb)) for ad in ads]
    sv = np.linalg.svd(np.vstack(rows_), compute_uv=False)
    return int(np.sum(sv < 1e-9))


cd = {d_: commutant_dim(d_) for d_ in (3, 4, 5, 6)}
assert cd == {3: 1, 4: 2, 5: 1, 6: 1}
ok("F14a", f"C(d,2) = d only for d in {{0,3}}; rigidity surplus = (N-d)(N-d-1)/2 for every d; "
           f"cross-block count = d^2 C(k,2); commutant of ad so(d): {cd} (only so(4) splits)")
g1, g2 = np.kron(SIG[0], I2), np.kron(SIG[1], I2)
g3, g4 = np.kron(SIG[2], SIG[0]), np.kron(SIG[2], SIG[1])
gam = [g1, g2, g3, g4]
gram = np.zeros((4, 4))
for i in range(4):
    for j in range(4):
        cij = gam[i] @ gam[j]
        assert np.linalg.norm(gam[j] @ gam[i] - dag(cij)) < 1e-12              # 条款 II
        assert np.linalg.norm(cij @ dag(cij) - np.eye(4)) < 1e-12              # 条款 III
        sij = (cij + dag(cij)) / 2
        assert np.linalg.norm(sij - sij[0, 0] * np.eye(4)) < 1e-12             # 求同读数为标量
        gram[i, j] = sij[0, 0].real
        for k_ in range(4):
            assert np.linalg.norm(cij @ gam[j] @ gam[k_] - gam[i] @ gam[k_]) < 1e-12   # 条款 IV
assert np.linalg.matrix_rank(gram) == 4
G5 = 1.25 * np.eye(5) - 0.25 * np.ones((5, 5))
ev = np.sort(np.linalg.eigvalsh(G5))
assert abs(ev[0]) < 1e-12 and np.all(ev[1:] > 1.2) and np.linalg.matrix_rank(G5) == 4
CM = np.ones((6, 6)) - np.eye(6)
assert abs(np.linalg.det(CM)) > 1.0                           # 五个两两等距的点放不进 R^3
ok("F14b", "an orthonormal 4-frame satisfies clauses II-IV with scalar similarity and has Gram rank 4; "
           "five equidistant points need R^4 (Cayley-Menger determinant "
           f"{np.linalg.det(CM):.1f} != 0)")

# ----------------------------------------------------------------------------
# F15  只给时间流逝函数的模型：加速度的模需要空间度规
# ----------------------------------------------------------------------------
r, rs = sp.symbols("r r_s", positive=True)
f = 1 - rs / r
a_up = sp.diff(f, r) / 2                                      # 静止观察者的 a^r（c = 1）
a_proper = sp.simplify(a_up / sp.sqrt(f))                     # sqrt(g_rr) a^r
a_coord = sp.simplify(sp.diff(sp.log(sp.sqrt(f)), r))         # d/dr ln(lapse)
assert sp.simplify(a_proper - rs / (2 * r ** 2 * sp.sqrt(1 - rs / r))) == 0
assert sp.simplify(a_coord / a_proper - 1 / sp.sqrt(f)) == 0
val = float((a_coord / a_proper).subs({r: sp.Rational(5, 2), rs: 1}))
eta = sp.symbols("eta")
laws = [sp.sqrt(1 - eta), 1 - eta / 2, sp.exp(-eta / 2), 1 / sp.sqrt(1 + eta)]
assert all(sp.series(l_, eta, 0, 2).removeO() == 1 - eta / 2 for l_ in laws)
second = [sp.series(l_, eta, 0, 3).removeO().coeff(eta, 2) for l_ in laws]
assert len(set(second)) == 4
ok("F15", f"static observers: |a| = GM/(r^2 sqrt(1-r_s/r)); the coordinate gradient of ln(lapse) is larger by "
          f"1/sqrt(1-r_s/r) (= {val:.3f} at r = 2.5 r_s); four budget laws share the Newtonian limit, "
          f"second-order coefficients {second}")

# ----------------------------------------------------------------------------
# F16  SU(2) 矢高的哈尔分布；旋量读数与向量读数
# ----------------------------------------------------------------------------
s = sp.symbols("s", real=True)
dens = 2 / sp.pi * sp.sqrt(1 - s ** 2)
assert sp.integrate(dens, (s, -1, 1)) == 1
assert sp.integrate(dens * (1 - s), (s, -1, 1)) == 1
assert sp.integrate(dens * (1 - s) ** 2, (s, -1, 1)) - 1 == sp.Rational(1, 4)
vals = np.array([sagitta(haar_su(2)) for _ in range(20000)])
assert abs(vals.mean() - 1) < 0.02 and abs(vals.var() - 0.25) < 0.02
worst = 0.0
for _ in range(100):
    u = haar_su(2)
    Rv = np.array([[0.5 * np.trace(SIG[i] @ u @ SIG[j] @ dag(u)).real for j in range(3)] for i in range(3)])
    v = sagitta(u)
    worst = max(worst, abs((1 - np.trace(Rv) / 3) - 2 / 3 * sagitta(u @ u)),
                abs((1 - np.trace(Rv) / 3) - 4 / 3 * v * (2 - v)))
assert worst < 1e-12
ok("F16", f"Haar SU(2): sagitta has the semicircle law on [0,2], mean 1, variance 1/4 "
          f"(sample {vals.mean():.3f}, {vals.var():.3f}); vector sagitta = (2/3) v(u^2) = (4/3) v (2-v)")

print(f"\nall {len(PASSED)} checks passed in {time.time() - T0:.1f} s")
