"""从根 r 到顶点 a 的树输运相位，是沿唯一一条树路径把边相位连乘：顺着边乘 u(e)，逆着边乘 u(e)⁻¹。
The tree transport phase from the root r to a vertex a multiplies the edge phases along the one tree
path between them: u(e) along an edge, u(e)⁻¹ against it.

A small named graph: seven vertices, six tree edges (cyan) and five chords (dashed), among them a
self-loop and a chord parallel to a tree edge, which a NamedSpanningTree allows outside T. The script
checks that the cyan edges form a spanning tree and finds the path r → a by search (asserted).
"""

import math

from _ch18 import mid_arrow

SIZE = (540, 318)
ALT = {
    "zh": "一张七个顶点的有向图。青色的六条边是选定的生成树 T，灰色虚线是树外的弦，其中有一条从顶点回到自身的自环，还有一条与树边平行的重边。"
          "左边的根 r 到右上角的顶点 a 只有一条树路径，画成粗青线，经过三条边 e₁、e₂、e₃：e₁ 与 e₃ 的方向顺着走，标着 × u(e₁)、× u(e₃)；"
          "e₂ 的方向逆着走，标着 × u(e₂)⁻¹。底部写着 rootPhase(a) = u(e₁) · u(e₂)⁻¹ · u(e₃)。",
    "en": "A directed graph with seven vertices. The six cyan edges are the chosen spanning tree T; the grey dashed edges are the "
          "chords outside it, among them a self-loop and an edge parallel to a tree edge. From the root r on the left to the "
          "vertex a at the top right there is exactly one tree path, drawn thick cyan through three edges e₁, e₂, e₃: e₁ and e₃ "
          "point the way we walk and are marked × u(e₁), × u(e₃); e₂ points against it and is marked × u(e₂)⁻¹. At the bottom: "
          "rootPhase(a) = u(e₁) · u(e₂)⁻¹ · u(e₃).",
}

POS = {"r": (62, 150), "b": (180, 82), "c": (300, 128), "a": (440, 70),
       "d": (180, 220), "e": (310, 232), "f": (446, 196)}
TREE = [("r", "b"), ("c", "b"), ("c", "a"), ("r", "d"), ("d", "e"), ("f", "e")]       # (source, target)
CHORDS = [("b", "d"), ("c", "e"), ("a", "f"), ("e", "d"), ("f", "f")]


def tree_path(start, end):
    """The vertex path from start to end through the tree edges (breadth-first search)."""
    nbr = {v: [] for v in POS}
    for s, t in TREE:
        nbr[s].append(t)
        nbr[t].append(s)
    prev, todo = {start: None}, [start]
    while todo:
        v = todo.pop(0)
        for w in nbr[v]:
            if w not in prev:
                prev[w] = v
                todo.append(w)
    assert len(prev) == len(POS)                    # the tree reaches every vertex
    path = [end]
    while path[-1] != start:
        path.append(prev[path[-1]])
    return path[::-1]


def draw(fig):
    t = fig.t
    assert len(TREE) == len(POS) - 1               # connected with n − 1 edges: a tree
    path = tree_path("r", "a")
    assert path == ["r", "b", "c", "a"]
    steps = []
    for x, y in zip(path, path[1:]):
        k = next(i for i, (s, tt) in enumerate(TREE) if {s, tt} == {x, y})
        steps.append((k, TREE[k] == (x, y)))       # forward when the edge points the way we walk
    assert [fw for _, fw in steps] == [True, False, True]

    on_path = {k for k, _ in steps}
    # chords: dashed grey
    for s, tt in CHORDS:
        if s == tt:
            x, y = POS[s]
            pts = [(x + 18 + 14 * math.cos(math.radians(a)), y + 14 - 14 * math.sin(math.radians(a))) for a in range(200, 200 - 330, -10)]
            fig.curve_arrow(pts, "dim", 1.5, head=7, dash="4 3")
            continue
        p, q = POS[s], POS[tt]
        if {s, tt} == {"d", "e"}:                  # the chord parallel to a tree edge bends below it
            c = ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + 44)
            pts = [((1 - u) ** 2 * p[0] + 2 * u * (1 - u) * c[0] + u * u * q[0],
                    (1 - u) ** 2 * p[1] + 2 * u * (1 - u) * c[1] + u * u * q[1]) for u in [k / 30 for k in range(31)]]
            fig.polyline(pts, "dim", 1.5, dash="4 3")
            fig.arrow_head(pts[16][0], pts[16][1], math.degrees(math.atan2(-(pts[17][1] - pts[15][1]), pts[17][0] - pts[15][0])), "dim", head=8)
            continue
        fig.line(p[0], p[1], q[0], q[1], "dim", 1.5, dash="4 3")
        mid_arrow(fig, p, q, "dim", 8)
    # the tree; the path r → a thick
    for k, (s, tt) in enumerate(TREE):
        p, q = POS[s], POS[tt]
        fig.line(p[0], p[1], q[0], q[1], "line", 4.6 if k in on_path else 2.0, cap="round")
        mid_arrow(fig, p, q, "line", 11 if k in on_path else 9)
    for v, (x, y) in POS.items():
        big = v in ("r", "a")
        fig.dot(x, y, 6.5 if big else 4.6, "ink", ring="bg")
    fig.text(POS["r"][0] - 12, POS["r"][1] + 5, "*r*", size=17, color="ink", weight=600, anchor="end")
    fig.text(POS["a"][0] + 12, POS["a"][1] + 6, "*a*", size=17, color="ink", weight=600)

    labels = {0: ("× *u*(*e*₁)", -14, -8, "end"), 1: ("× *u*(*e*₂)⁻¹", 0, -14, "middle"), 2: ("× *u*(*e*₃)", 6, 22, "start")}
    for (k, fw) in steps:
        s, tt = TREE[k]
        p, q = POS[s], POS[tt]
        text, dx, dy, anchor = labels[path.index(s) if fw else path.index(tt)]
        fig.text((p[0] + q[0]) / 2 + dx, (p[1] + q[1]) / 2 + dy, text, size=14, color="line", anchor=anchor, halo=True)

    fig.text(SIZE[0] / 2, 306, "rootPhase(*a*) = *u*(*e*₁) · *u*(*e*₂)⁻¹ · *u*(*e*₃)", size=15, color="line", anchor="middle",
             weight=600)
    fig.legend(16, 24, [("line", t("生成树 *T*", "spanning tree *T*"))])
    fig.line(16, 39.8, 34, 39.8, "dim", 1.5, dash="4 3")
    fig.text(42, 44, t("弦 *e* ∉ *T*", "chord *e* ∉ *T*"), size=13, color="dim")
