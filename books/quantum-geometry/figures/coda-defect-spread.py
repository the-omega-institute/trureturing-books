"""剖分得再细，角亏的总和仍是 720°：它只是从 12 个锥顶分散到越来越多的折痕上。
However finely the polyhedron is cut, the angular defects still add up to 720°: they only spread from
12 cone points onto more and more creases.

Each row is a geodesic polyhedron of frequency ν = 1, 2, 4 (the icosahedron with every face cut into ν²
triangles and the new vertices pushed out to the sphere). Its bar has the same length, 720°, cut into one
piece per vertex, as long as that vertex's defect 360° − (sum of the flat corners there). The defects are
computed from the triangles in _coda and their sum is asserted to be 720° (Descartes: a literature result).
"""

from _coda import defects, geodesic, wireframe

SIZE = (480, 270)
ALT = {
    "zh": "三行，每行左边是一个多面体的线框，右边是一条同样长的品红横条。第一行是正二十面体，12 个顶点，横条分成 12 段，每段 60°。"
          "第二行把每个面切成 4 块再推到球面上，42 个顶点，横条分成 42 段，最长的一段约 18°。"
          "第三行切成 16 块，162 个顶点，横条分成 162 段细条纹，最长约 5°。三条横条右端都对齐在 720°。右下角标着文献结果。",
    "en": "Three rows, each with a polyhedron wireframe on the left and a magenta bar of the same length on the right. Row one "
          "is the icosahedron: 12 vertices, the bar cut into 12 pieces of 60°. Row two cuts every face into 4 and pushes the "
          "vertices out to the sphere: 42 vertices, 42 pieces, the longest about 18°. Row three cuts every face into 16: 162 "
          "vertices, 162 thin stripes, the longest about 5°. All three bars end together at 720°. A tag in the bottom right marks "
          "this as a literature result.",
}


def draw(fig):
    t = fig.t
    x0, x1 = 108, 452                                   # the bar: 0° … 720°
    scale = (x1 - x0) / 720
    rows = [(1, 72), (2, 152), (4, 232)]
    for freq, y in rows:
        verts, tris = geodesic(freq)
        edges = sorted({tuple(sorted((tr[m], tr[(m + 1) % 3]))) for tr in tris for m in range(3)})
        wireframe(fig, 46, y - 6, 30, verts=verts, edges=edges, dots=None)
        d = sorted(defects(freq), reverse=True)
        x = x0
        for k, piece in enumerate(d):
            w = piece * scale
            fig.rect(x, y - 22, w, 22, color=None, fill="area", fill_opacity=0.62 if k % 2 == 0 else 0.26)
            x += w
        assert abs(x - x1) < 1e-6
        fig.rect(x0, y - 22, x1 - x0, 22, color="area", width=1.2)
        fig.text(x0, y + 20, t(f"{len(d)} 个顶点，最大角亏 {max(d):.0f}°", f"{len(d)} vertices, largest defect {max(d):.0f}°"),
                 size=13, color="dim")
    d1, d2, d4 = (defects(f) for f in (1, 2, 4))
    assert round(max(d1)) == 60 and round(max(d2)) == 18 and round(max(d4)) == 5
    fig.text(x0, 30, "0°", size=13, color="dim", anchor="middle")
    fig.text(x1, 30, "720°", size=14, color="area", weight=600, anchor="middle")
    fig.line(x1, 36, x1, 240, "area", 1.2, dash="3 3")
    fig.text(28, 30, "*ν*", size=14, color="dim", anchor="middle")
    for freq, y in rows:
        fig.text(8, y + 20, f"{freq}", size=13, color="dim")
    fig.chip(x1, 262, t("文献结果", "literature"), "argued", anchor="end")
