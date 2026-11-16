"""同一个定向，在每个面上、在每个 nice 偶圈上，反向的 dart 都是奇数个。
One orientation is odd on every face and on every nice even cycle.

The graph is the 4 × 4 grid with its planar rotation (neighbours in counter-clockwise order). The
faces are the orbits of φ(d) = ρ(α(d)): nine squares and the outer face, and |V| − |E| + |F| =
16 − 24 + 10 = 2. The orientation is found here by Gaussian elimination over 𝔽₂ from the face
conditions opp(f) = 1 (the existence of such an orientation is the frozen theorem); the script then
enumerates every simple cycle of the grid and asserts that each even one whose deleted complement
has a perfect matching ("nice") has an odd number of darts against the arrows. The amber cycle is one
of them: it encloses the two cyan vertices I, the row of magenta vertices J lies outside, and the
six faces on its inner side are shaded.
"""

import itertools
import math

SIZE = (358, 350)
ALT = {
    "zh": "4 × 4 的格点图，每条边一支箭头。九个方格里各写着一个奇数：沿这个面的边界走一圈，与箭头相反的 dart 个数；外面那个面的个数写在下方，也是奇数。"
          "琥珀色描出一条十条边的偶圈，圈内六个方格淡青，圈内的两个顶点是青色的 I，圈外最下面一行四个顶点是品红的 J；沿琥珀色的圈走一圈，与箭头相反的 dart 也是奇数个。",
    "en": "A 4 × 4 grid graph with one arrow on every edge. Each of the nine squares carries an odd number: walking once "
          "around that face, the count of darts against the arrows; the count for the outer face, written below, is odd "
          "too. Amber traces an even cycle of ten edges; the six squares inside it are pale cyan, the two vertices inside "
          "are the cyan I and the four vertices of the bottom row, outside, are the magenta J. Walking once around the "
          "amber cycle, the darts against the arrows are again odd in number.",
}

N = 4
VERTS = [(r, c) for r in range(N) for c in range(N)]
EDGES = [((r, c), (r, c + 1)) for r in range(N) for c in range(N - 1)] + \
        [((r, c), (r + 1, c)) for r in range(N - 1) for c in range(N)]
NB = {v: [] for v in VERTS}
for a, b in EDGES:
    NB[a].append(b)
    NB[b].append(a)


def ang(v, w):  # angle of v → w with rows growing downwards (screen) read as y up
    return math.atan2(-(w[0] - v[0]), w[1] - v[1])


ROT = {v: sorted(NB[v], key=lambda w: ang(v, w)) for v in VERTS}
DARTS = [(a, b) for a, b in EDGES] + [(b, a) for a, b in EDGES]


def phi(d):  # face successor: reverse, then rotate counter-clockwise at the head
    v, w = d[1], d[0]
    nb = ROT[v]
    return (v, nb[(nb.index(w) + 1) % len(nb)])


FACES, seen = [], set()
for d in DARTS:
    if d in seen:
        continue
    orb, x = [], d
    while x not in seen:
        seen.add(x)
        orb.append(x)
        x = phi(x)
    FACES.append(orb)
assert len(VERTS) - len(EDGES) + len(FACES) == 2 and len(FACES) == 10
OUTER = max(FACES, key=len)
assert len(OUTER) == 12

# ---- solve opp(f) = 1 over 𝔽₂; x_e = 1 flips edge e from its base direction a → b
IDX = {e: i for i, e in enumerate(EDGES)}
BASE = {}
for a, b in EDGES:
    BASE[(a, b)] = (IDX[(a, b)], 0)
    BASE[(b, a)] = (IDX[(a, b)], 1)
rows = []
for f in FACES:
    row = [0] * (len(EDGES) + 1)
    rhs = 1
    for d in f:
        i, off = BASE[d]
        row[i] ^= 1
        rhs ^= off
    row[-1] = rhs
    rows.append(row)
piv, r0 = [], 0
for col in range(len(EDGES)):
    p = next((k for k in range(r0, len(rows)) if rows[k][col]), None)
    if p is None:
        continue
    rows[r0], rows[p] = rows[p], rows[r0]
    for k in range(len(rows)):
        if k != r0 and rows[k][col]:
            rows[k] = [x ^ y for x, y in zip(rows[k], rows[r0])]
    piv.append(col)
    r0 += 1
assert all(any(r[:-1]) or r[-1] == 0 for r in rows)  # consistent
X = [0] * len(EDGES)
for k, col in enumerate(piv):
    X[col] = rows[k][-1]


def against(d):  # ε(d) = 1 when the arrow points against the dart d
    i, off = BASE[d]
    return X[i] ^ off


ARROW = [(a, b) if X[IDX[(a, b)]] == 0 else (b, a) for a, b in EDGES]
OPP = [sum(against(d) for d in f) for f in FACES]
assert all(k % 2 == 1 for k in OPP)  # every face, including the outer one, is odd


# ---- every nice even simple cycle is odd
def has_pm(vs):
    vs = sorted(vs)
    if not vs:
        return True
    v = vs[0]
    return any(has_pm([u for u in vs if u not in (v, w)]) for w in NB[v] if w in vs)


cycles = set()


def dfs(start, path):
    for w in NB[path[-1]]:
        if w == start and len(path) >= 4:
            cycles.add(tuple(path))
        elif w not in path and w > start:
            dfs(start, path + [w])


for s in VERTS:
    dfs(s, [s])
nice = 0
for cyc in cycles:
    if len(cyc) % 2 or not has_pm(set(VERTS) - set(cyc)):
        continue
    nice += 1
    darts = [(cyc[i], cyc[(i + 1) % len(cyc)]) for i in range(len(cyc))]
    assert sum(against(d) for d in darts) % 2 == 1
assert nice > 20

# ---- the cycle drawn: the boundary of rows 0–2
CYC = [(0, c) for c in range(4)] + [(1, 3), (2, 3)] + [(2, c) for c in (2, 1, 0)] + [(1, 0)]
assert tuple(CYC) in cycles or tuple(CYC[:1] + CYC[1:][::-1]) in cycles
CDARTS = [(CYC[i], CYC[(i + 1) % len(CYC)]) for i in range(len(CYC))]
CSUM = sum(against(d) for d in CDARTS)
assert CSUM % 2 == 1
I = [(1, 1), (1, 2)]
J = [(3, c) for c in range(4)]
assert has_pm(I) and has_pm(J) and len(CYC) % 2 == 0

X0, Y0, S = 64, 46, 76


def xy(v):
    return X0 + v[1] * S, Y0 + v[0] * S


def draw(fig):
    t = fig.t
    # inner side of the amber cycle
    for r in range(2):
        for c in range(3):
            (x, y) = xy((r, c))
            fig.rect(x, y, S, S, color=None, fill="cyan", fill_opacity=0.14)
    fig.polyline([xy(v) for v in CYC], "now", 4.2, closed=True)
    for a, b in ARROW:
        (x1, y1), (x2, y2) = xy(a), xy(b)
        fig.line(x1, y1, x2, y2, "ink", 1.5)
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        fig.arrow_head(mx + (x2 - x1) / S * 6, my + (y2 - y1) / S * 6, math.degrees(math.atan2(-(y2 - y1), x2 - x1)),
                       "ink", head=10)
    for f, k in zip(FACES, OPP):
        if f is OUTER:
            continue
        cx = sum(xy(d[0])[0] for d in f) / len(f)
        cy = sum(xy(d[0])[1] for d in f) / len(f)
        fig.text(cx, cy, str(k), size=16, color="dim", anchor="middle", middle=True, weight=600)
    for v in VERTS:
        x, y = xy(v)
        role = "cyan" if v in I else "magenta" if v in J else "ink"
        fig.dot(x, y, 6 if role != "ink" else 4.2, role, ring="bg")
    yb = Y0 + 3 * S + 34
    fig.text(X0 - 20, yb, t(f"外面的面：{OPP[FACES.index(OUTER)]}", f"outer face: {OPP[FACES.index(OUTER)]}"),
             size=14, color="dim")
    fig.text(X0 - 20, yb + 24, t(f"琥珀色的圈：{CSUM}", f"amber cycle: {CSUM}"), size=14, color="now")
    fig.text(X0 + 3 * S + 20, yb, t("青色 *I* · 品红 *J*", "cyan *I* · magenta *J*"), size=14, color="dim", anchor="end")
    fig.text(X0 + 3 * S + 20, yb + 24, t("数字：反向 dart", "numbers: darts against"), size=14, color="dim",
             anchor="end")
