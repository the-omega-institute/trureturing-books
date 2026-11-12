"""翻转一条交替圈：两组完美匹配的系数之积等于圈上 dart 符号之积的相反数。
Flipping an alternating cycle: the product of the two matchings' coefficients is minus the product
of the dart signs around the cycle.

The graph is the 2 × 3 grid, vertices enumerated 0 1 2 (top) and 3 4 5 (bottom). M = {03, 14, 25}
and N = {01, 34, 25} share the edge 25; their symmetric difference is the alternating cycle
0 → 1 → 4 → 3 → 0. The arrows are an orientation solved here over 𝔽₂ so that every face (two
squares and the outer face) has an odd number of darts against them; δ(d) = +1 along an arrow and
−1 against it. τ(M) is the sign of the canonical listing (smaller ends increasing, each followed by
its partner) times the product of δ over the listed darts. The script asserts the transport identity
τ(M)τ(N) = −∏δ around the cycle, and that here ∏δ = −1, so τ(M) = τ(N).
"""

import math

SIZE = (436, 246)
WRAP = True
ALT = {
    "zh": "两栏，同一个 2 × 3 格点图，顶点 0、1、2 在上，3、4、5 在下。左栏：青色的完美匹配 M 是三条竖边，品红的 N 是两条横边 01、34 加上共同的竖边 25；"
          "两组不同的边围成一个琥珀色的四边形圈 0—1—4—3。右栏：每条边一支箭头，沿圈 0 → 1 → 4 → 3 → 0 走，每条圈边标出 δ = +1（顺箭头）或 −1（逆箭头），"
          "四个 δ 之积是 −1；下方写着 τ(M) τ(N) = −∏δ = +1。",
    "en": "Two panels, the same 2 × 3 grid, vertices 0, 1, 2 on top and 3, 4, 5 below. Left: the cyan perfect matching M "
          "is the three vertical edges; the magenta N is the two horizontal edges 01 and 34 together with the shared "
          "vertical edge 25; the edges where they differ form an amber square cycle 0–1–4–3. Right: every edge carries an "
          "arrow; walking the cycle 0 → 1 → 4 → 3 → 0, each cycle edge is marked δ = +1 (with the arrow) or −1 "
          "(against it), and the four δ multiply to −1; below, τ(M) τ(N) = −∏δ = +1.",
}

POS = {0: (0, 0), 1: (1, 0), 2: (2, 0), 3: (0, 1), 4: (1, 1), 5: (2, 1)}
EDGES = [(0, 1), (1, 2), (3, 4), (4, 5), (0, 3), (1, 4), (2, 5)]
NB = {v: [] for v in POS}
for a, b in EDGES:
    NB[a].append(b)
    NB[b].append(a)
M = [(0, 3), (1, 4), (2, 5)]
N_ = [(0, 1), (3, 4), (2, 5)]
CYCLE = [0, 1, 4, 3]


def is_pm(m):
    return sorted(v for e in m for v in e) == list(POS) and all(e in EDGES for e in m)


assert is_pm(M) and is_pm(N_)
assert {e for e in M} ^ {e for e in N_} == {(0, 3), (1, 4), (0, 1), (3, 4)}

# faces from the planar rotation (counter-clockwise, y up)
ROT = {v: sorted(NB[v], key=lambda w: math.atan2(-(POS[w][1] - POS[v][1]), POS[w][0] - POS[v][0])) for v in POS}
DARTS = EDGES + [(b, a) for a, b in EDGES]


def phi(d):
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
assert len(POS) - len(EDGES) + len(FACES) == 2

# orientation: x_e = 1 flips the base direction a → b; solve opp(f) = 1 on every face by brute force
best = None
for bits in range(1 << len(EDGES)):
    X = [(bits >> i) & 1 for i in range(len(EDGES))]
    ag = {}
    for i, (a, b) in enumerate(EDGES):
        ag[(a, b)], ag[(b, a)] = X[i], 1 - X[i]
    if all(sum(ag[d] for d in f) % 2 == 1 for f in FACES):
        best = ag
        break
assert best is not None
AGAINST = best


def delta(d):
    return -1 if AGAINST[d] else 1


def perm_sign(seq):
    s, seq = 1, list(seq)
    for i in range(len(seq)):
        for j in range(i + 1, len(seq)):
            if seq[i] > seq[j]:
                s = -s
    return s


def tau(m):
    pairs = sorted((min(e), max(e)) for e in m)
    listing = [v for p in pairs for v in p]
    out = perm_sign(listing)
    for a, b in pairs:
        out *= delta((a, b))
    return out


CDARTS = [(CYCLE[i], CYCLE[(i + 1) % 4]) for i in range(4)]
PROD = 1
for d in CDARTS:
    PROD *= delta(d)
assert tau(M) * tau(N_) == -PROD  # alternating_cycle_transport on this instance
assert PROD == -1 and tau(M) == tau(N_)  # the cycle is nice (25 is an edge), so it is odd

S, OX, OY = 66, 34, 76


def xy(v):
    return OX + POS[v][0] * S, OY + POS[v][1] * S


def base(p, title):
    p.text(p.width / 2, 22, title, size=14, weight=600, anchor="middle")
    p.polyline([xy(v) for v in CYCLE], "now", 7, closed=True, opacity=0.45)


def nodes(p):
    for v in POS:
        x, y = xy(v)
        p.circle(x, y, 10, color="ink", fill="bg", width=1.6, fill_opacity=1)
        p.text(x, y, str(v), size=13, color="ink", anchor="middle", middle=True, weight=600)


def draw(fig):
    t = fig.t
    left, right = fig.row([206, 206], 246, gap=24)

    base(left, t("两组匹配，差一个圈", "two matchings, one cycle apart"))
    for a, b in EDGES:
        (x1, y1), (x2, y2) = xy(a), xy(b)
        left.line(x1, y1, x2, y2, "faint", 1.2)
    for m, role, off in ((M, "cyan", -3.5), (N_, "magenta", 3.5)):
        for a, b in m:
            (x1, y1), (x2, y2) = xy(a), xy(b)
            dx, dy = (y2 - y1) / S, -(x2 - x1) / S
            left.line(x1 + dx * off, y1 + dy * off, x2 + dx * off, y2 + dy * off, role, 3.4)
    nodes(left)
    left.legend(30, 184, [("cyan", t("*M*", "*M*")), ("magenta", t("*N*", "*N*")), ("now", t("*M* △ *N*", "*M* △ *N*"))])

    base(right, t("圈上的 δ", "δ around the cycle"))
    for a, b in EDGES:
        (x1, y1), (x2, y2) = xy(a), xy(b)
        if AGAINST[(a, b)]:
            (x1, y1), (x2, y2) = (x2, y2), (x1, y1)
        right.line(x1, y1, x2, y2, "ink", 1.5)
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        right.arrow_head(mx + (x2 - x1) / S * 6, my + (y2 - y1) / S * 6,
                         math.degrees(math.atan2(-(y2 - y1), x2 - x1)), "ink", head=10)
    cx, cy = OX + S / 2, OY + S / 2
    for d in CDARTS:
        (x1, y1), (x2, y2) = xy(d[0]), xy(d[1])
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        ox, oy = mx - cx, my - cy
        L = math.hypot(ox, oy)
        right.text(mx + ox / L * 17, my + oy / L * 17, "+1" if delta(d) > 0 else "−1", size=14, color="now",
                   anchor="middle", middle=True, weight=600)
    nodes(right)
    right.text(right.width / 2, 194, "∏δ = −1", size=14, color="now", anchor="middle")
    right.text(right.width / 2, 220, "τ(*M*) τ(*N*) = −∏δ = +1", size=14, color="ink", anchor="middle")
