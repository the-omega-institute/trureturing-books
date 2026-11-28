"""On a coarse mesh, opposite orientations cancel locally and coning constructs a primitive."""

SIZE = (704, 345)
WRAP = True
ALT = {
    "zh": "左图中，三角面 (0,1,3) 与 (1,2,3) 反向经过共边。沿 0→1 锚定第二面，"
          "按 W₁W̃₂ 相乘使内边输运与其逆相邻消去，留下外边界 0→1→2→3→0。"
          "右图通过加锥顶 b 构造 H₁、H₂、H₃。由锥同伦恒等式，"
          "δ₂F=0 当且仅当 F=δ₁(H₂F)。",
    "en": "Left, triangles (0,1,3) and (1,2,3) traverse their common edge oppositely. Whisker the second "
          "face along 0→1 so that in W₁W̃₂ the interior edge transport is next to its inverse. "
          "Their cancellation leaves the outer cycle 0→1→2→3→0. Right, adjoining "
          "the vertex b defines H₁, H₂, and H₃. The cone homotopy gives δ₂F=0 exactly when F=δ₁(H₂F).",
}


def draw(fig):
    left, right = fig.row([344, 344], 345)
    left.text(172, 24, left.t("粗网格 Stokes · 内边消去", "Coarse Stokes · interior cancellation"),
              size=17, anchor="middle", weight=600)
    vertices = [(60, 72), (284, 72), (284, 212), (60, 212)]
    for face, role in (((0, 1, 3), "cyan"), ((1, 2, 3), "violet")):
        left.polygon([vertices[i] for i in face], role, fill_opacity=0.14)
    for a, b in zip(vertices, vertices[1:] + vertices[:1]):
        x1, y1 = a
        x2, y2 = b
        left.line(*a, *b, "cyan", 1.7)
        left.arrow(x1 + 0.31*(x2-x1), y1 + 0.31*(y2-y1),
                   x1 + 0.60*(x2-x1), y1 + 0.60*(y2-y1), "cyan", 2, head=7)
    left.line(*vertices[1], *vertices[3], "dim", 1.2, dash="5 4")
    left.arrow(224, 97, 106, 171, "violet", 2.2, head=8)
    left.arrow(119, 190, 237, 116, "violet", 2.2, head=8)
    left.text(158, 113, "U₁₃", size=15, anchor="middle", color="violet")
    left.text(188, 178, "U₃₁", size=15, anchor="middle", color="violet")
    for i, ((x, y), dx, dy) in enumerate(zip(vertices, [-13, 13, 13, -13], [-10, -10, 17, 17])):
        left.dot(x, y, 4, "ink", ring="bg")
        left.text(x + dx, y + dy, str(i), size=15, anchor="middle")
    left.text(172, 57, left.t("第二面的锚定路径 0→1", "Whisker for the second face 0→1"),
              size=14, anchor="middle")
    left.text(172, 267, "W₁W̃₂ = Hol(∂Σ)", size=18, anchor="middle", weight=600)
    left.text(172, 303, left.t("展开后相邻逆元消去", "Adjacent inverses cancel in the product"),
              size=14, anchor="middle")

    right.text(172, 24, right.t("加一个顶点 · 锥同伦", "Adjoin a vertex · cone homotopy"),
               size=17, anchor="middle", weight=600)
    base = [(69, 170), (186, 204), (273, 156)]
    apex = (151, 68)
    right.polygon(base, "cyan", color="cyan", width=1.5, fill_opacity=0.14)
    right.polygon([apex, *base[:2]], "violet", fill_opacity=0.16)
    for (x, y), label, dx, dy in zip(base, "xyz", [-14, 1, 16], [2, 19, 3]):
        right.line(*apex, x, y, "violet", 1.7)
        right.dot(x, y, 3.6, "cyan")
        right.text(x + dx, y + dy, label, size=15, anchor="middle")
    right.dot(*apex, 4.4, "violet", ring="bg")
    right.text(apex[0], apex[1] - 12, "b", size=16, anchor="middle", color="violet")
    right.text(172, 253, "H₁e(x) = e(b, x)    ·    H₂F(x,y) = F(b,x,y)", size=14, anchor="middle")
    right.text(172, 278, "H₃D(x,y,z) = D(b,x,y,z)", size=14, anchor="middle")
    right.text(172, 316, "δ₂F = 0    ⇔    F = δ₁(H₂F)", size=18, anchor="middle", color="blue", weight=600)
