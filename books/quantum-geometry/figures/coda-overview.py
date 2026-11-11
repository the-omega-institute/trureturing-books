"""终章地图：内接于球的多面体、落回同一对翅膀的两轮轨道、从黄金格点里切出点列的窗口。
The coda at a glance: a polyhedron inscribed in the sphere, two rounds that fall back onto the same pair
of wings, and a window that cuts a row of points out of the golden lattice.

Panel I is the regular icosahedron inside its circumscribed sphere; the twelve vertex defects of 60° add
up to 720° (Descartes, a literature result; asserted in _coda). Panel II integrates the Lorenz system at
(σ, ρ, β) = (10, 28, 8/3) from two far-apart starts and draws x against z after the first time unit:
a numerical picture, and reading the orbits as "rounds" is the chapter's interpretive model. Panel III
is the lattice (a + bφ, a + bψ) with the window [φ − 2, φ − 1] on the conjugate axis; the points in it
are dropped to the line below (the chapter's theorem cites the model-set characterization with lean=).
"""

from _coda import PHI, WINDOW, defects, golden_points, in_window, lorenz, wireframe

SIZE = (740, 270)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一个正二十面体内接在一个圆里（球的轮廓），十二个顶点点成品红，下面写着 12 × 60° = 720°，标着文献结果。"
          "第二栏：两条洛伦兹轨道，一条青色、一条品红，从相距很远的两个圆圈出发，都绕成同一对翅膀。"
          "第三栏：黄金格点散在平面上，一条琥珀色的横带是窗口 [φ − 2, φ − 1]；落在带里的点是青色的，"
          "它们向下投到底部的直线上，成了一串疏密不齐的点。",
    "en": "Three panels. Panel I: a regular icosahedron inscribed in a circle (the outline of the sphere), its twelve vertices "
          "dotted magenta, with 12 × 60° = 720° below and a literature tag. Panel II: two Lorenz orbits, one cyan and one "
          "magenta, start from two far-apart circles and both wind into the same pair of wings. Panel III: the golden lattice "
          "points scattered over the plane, with an amber horizontal band for the window [φ − 2, φ − 1]; the points inside the "
          "band are cyan and drop onto the line at the bottom, giving an unevenly spaced row of points.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 270, gap=16)

    # ---- I: the approximate sphere
    title(one, "I　近似之球", "I  the approximate sphere")
    cx, cy, R = 118, 138, 84
    one.circle(cx, cy, R, color="dim", fill="cyan", fill_opacity=0.05, width=1.5)
    wireframe(one, cx, cy, R)
    d = defects(1)
    assert len(d) == 12 and all(abs(x - 60) < 1e-9 for x in d)
    one.text(cx, 246, "12 × 60° = 720°", size=14, color="area", weight=600, anchor="middle")
    one.chip(one.width - 4, 50, one.t("文献", "literature"), "argued", anchor="end")

    # ---- II: two rounds, one pair of wings
    title(two, "II　落回同一对翅膀", "II  back to the same wings")
    ax = two.axes(18, 40, 200, 196, (-22, 22), (0, 52))
    starts = [(-15.0, -20.0, 48.0), (16.0, 22.0, 4.0)]
    for start, color in zip(starts, ("line", "area")):
        orbit = lorenz(start, 16)
        ax.path([(s[0], s[2]) for s in orbit[::4]], color=color, width=1.0, opacity=0.85)
        x0, y0 = ax.pt(start[0], start[2])
        two.circle(x0, y0, 5, color=color, fill="bg", width=1.8)
    two.text(118, 258, two.t("数值积分 · 示意", "numerical · schematic"), size=13, color="dim", anchor="middle")

    # ---- III: a window cuts a row of points
    title(three, "III　窗口切出点列", "III  a window cuts a row")
    ax3 = three.axes(14, 40, 208, 160, (-6.5, 6.5), (-2.2, 2.2))
    lo, hi = ax3.pt(-6.5, WINDOW[1]), ax3.pt(6.5, WINDOW[0])
    three.rect(lo[0], lo[1], hi[0] - lo[0], hi[1] - lo[1], color="now", fill="now", fill_opacity=0.14, width=1.2)
    assert abs((WINDOW[1] - WINDOW[0]) - 1) < 1e-12                           # vol(goldenWindow) = 1
    base = 228
    three.line(14, base, 222, base, "dim", 1.3)
    kept = []
    for a, b, x, y in golden_points((-6.5, 6.5), (-2.2, 2.2)):
        px, py = ax3.pt(x, y)
        if in_window(y):
            kept.append(x)
            three.line(px, py, px, base, "line", 1.0, dash="2 3", opacity=0.6)
            three.dot(px, py, 3.4, "line", ring="bg")
            three.dot(px, base, 3.6, "line", ring="bg")
        else:
            three.dot(px, py, 2.4, "faint")
    kept.sort()
    gaps = {round(b - a, 9) for a, b in zip(kept, kept[1:])}
    assert gaps <= {1.0, round(PHI, 9), round(PHI * PHI, 9)}, gaps
    three.text(16, lo[1] - 6, "[*φ* − 2, *φ* − 1]", size=13, color="now", halo=True)
    three.chip(118, 262, "LEAN ✓", "lean", anchor="middle")
