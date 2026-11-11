"""折返点把门链切成 κ + 1 段，每段里的门各占一层：12 道门只用 4 层。
The turning points cut the chain of gates into κ + 1 runs, one layer per gate in each run: 12 gates in
only 4 layers.

N = 11, κ = 2, S = {4, 8} as in the chapter's example. The gates are indexed k = 0 … N by pathGate
(K1, U1 … U10, KN); the script lays them out with path_layers, checks that the layers read along
pathOrder are the example's map [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 3, 3], and that the best S over all
|S| = 2 needs ⌊N/(κ+1)⌋ + 1 = 4 layers (asserted, also for N = 8).
"""

from itertools import combinations

from _ch20 import gate_name, path_layers, path_order

N, S = 11, {4, 8}

SIZE = (560, 300)
ALT = {
    "zh": "一张格子图：横向是 12 道门 K1、U1 到 U10、KN，纵向是层 0 到 3。每道门是一块青色的砖，排成三段向右下降的台阶，每段 4 块，从第 3 层降到第 0 层；"
          "U4 与 U8 上方各有一个品红的小三角，是折返点，台阶在这里跳回第 3 层。相邻两块砖之间的箭头指向先执行的那一块之后执行的那一块。"
          "右边写着 4 层，底下写着 12 道门。",
    "en": "A grid: across are the 12 gates K1, U1 to U10, KN; up are layers 0 to 3. Each gate is a cyan brick, and the bricks form "
          "three staircases stepping down to the right, four bricks each, from layer 3 to layer 0; above U4 and U8 a small "
          "magenta triangle marks a turning point, where the staircase jumps back to layer 3. Arrows between neighbouring bricks "
          "point from the gate that runs first to the one that runs after it. On the right: 4 layers; below: 12 gates.",
}


def best_depth(n, kappa):
    return min(max(path_layers(n, set(c))) + 1 for c in combinations(range(1, n + 1), kappa))


def draw(fig):
    t = fig.t
    g = path_layers(N, S)
    assert [g[k] for k in path_order(N, S)] == [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 3, 3]
    L = max(g) + 1
    assert L == N // 3 + 1 == 4
    assert best_depth(11, 2) == 4 and best_depth(8, 2) == 3

    x0, dx = 74, 38
    ybase, dy = 214, 44
    X = lambda k: x0 + dx * k
    Y = lambda layer: ybase - dy * layer
    for layer in range(L):
        fig.line(X(0) - 22, Y(layer), X(N) + 22, Y(layer), "faint", 1.0, dash="2 4")
        fig.text(X(0) - 30, Y(layer), t(f"层 {layer}", f"layer {layer}"), size=13, color="dim", anchor="end", middle=True)
    for k in range(N):
        a, b = (k, k + 1) if (k + 1) in S else (k + 1, k)          # a runs first
        sgn = 1 if b > a else -1
        fig.arrow(X(a) + 13 * sgn, Y(g[a]), X(b) - 15 * sgn, Y(g[b]), "dim", 1.5, head=8)
    for k in range(N + 1):
        fig.rect(X(k) - 13, Y(g[k]) - 11, 26, 22, color="line", fill="line", fill_opacity=0.25, width=1.8, rx=4)
        fig.text(X(k), ybase + 34, gate_name(N, k), size=13, color="dim", anchor="middle")
    for k in sorted(S):
        x, y = X(k), Y(g[k]) - 20
        fig.polygon([(x - 7, y - 10), (x + 7, y - 10), (x, y)], "area", fill_opacity=1, color="area", width=1.0)
    fig.text(X(N) + 22, Y(L - 1) - 30, t("共 4 层", "4 layers"), size=15, color="ink", weight=600, anchor="end")
    fig.text(X(N / 2), ybase + 62, t("12 道门 · 折返点 *S* = {4, 8}", "12 gates · turning points *S* = {4, 8}"),
             size=14, color="dim", anchor="middle")
