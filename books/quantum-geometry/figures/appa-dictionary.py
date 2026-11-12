"""六个最常用的传统写法，各自对应一幅几何图景（附录 A §全书概念与形式化锚点总对照表）。
Six of the most used conventional notations, each next to the geometric picture the book reads it as
(appendix A, master table).

The six cards follow the order of the rows of the master table: pure state, Born rule, density matrix,
decoherence, commutator, single-qubit gate. Each card names the conventional term on top, draws the
picture, and gives the book's term below. The pictures are computed: the shadow is cos θ of the drawn
angle, the mixed state sits strictly inside the ball, pinching keeps only the component along the
measurement axis, and the rotor turns the arrow about its axis by the drawn angle.
"""

import math

from tbook import figkit

SIZE = (560, 448)
WRAP = True
ALT = {
    "zh": "六张同样大小的小图，排成两行，每张上面写传统写法，下面写本书的几何说法，最下面一行是这一条的认识论状态里列出的章。纯态 |ψ⟩：球面上一支琥珀色的箭头，即球面上的方向。"
          "玻恩法则 |⟨φ|ψ⟩|²：标尺 a 与琥珀色的箭头 b 夹角 θ，b 落在 a 上的青色影子长 cos θ，概率是影子的平方 cos²θ。"
          "密度矩阵 ρ：圆盘里一个琥珀色的点，到圆心的距离小于 1，即球内的点。"
          "退相干：琥珀色的点沿品红的横向虚线移到竖直的青色测量轴上，横着的那一份被抹掉，即捏合到测量轴。"
          "对易子 [A, B]：两支箭头 u、v 张成品红的平行四边形，带一个转向箭头，即有向面积 2 u∧v。"
          "单比特门 U：紫色的转轴，灰色箭头绕它转到琥珀色箭头，即旋转器。",
    "en": "Six cards of the same size in two rows; each names the conventional notation on top and the book's geometric "
          "reading below, with the chapters listed in that row's status at the foot. Pure state |ψ⟩: an amber arrow on a sphere, a direction on the sphere. Born rule |⟨φ|ψ⟩|²: a "
          "ruler a and an amber arrow b at angle θ; the cyan shadow of b on a has length cos θ, and the probability is the "
          "squared shadow cos²θ. Density matrix ρ: an amber point inside a disc, closer than 1 to the centre, a point "
          "inside the ball. Decoherence: the amber point moves along a magenta dashed transverse segment onto the vertical "
          "cyan measurement axis; the transverse part is erased, a pinch onto the axis. Commutator [A, B]: two arrows u, v "
          "span a magenta parallelogram with a turning arrow, the oriented area 2 u∧v. Single-qubit gate U: a violet axis; "
          "a grey arrow turns about it to the amber arrow, a rotor.",
}

W, H, GAP = 176, 216, 16
CX, CY = W / 2, 104          # centre of each picture


# where each row of the master table is anchored: the chapters in its status column ("认识论状态")
CHAPTERS = {"pure": (1, 2, 3, 26), "born": (2, 28), "density": (3, 26), "decoherence": (4, 6), "commutator": (5, 6), "gate": (7, 27)}


def chapters(p, key):
    """'第 1–3、26 章' / 'Chapters 1–3, 26' from the chapter list, runs of consecutive numbers joined by a dash."""
    runs, ns = [], CHAPTERS[key]
    for n in ns:
        if runs and n == runs[-1][1] + 1:
            runs[-1][1] = n
        else:
            runs.append([n, n])
    parts = [f"{a}–{b}" if b > a else str(a) for a, b in runs]
    return p.t(f"第 {'、'.join(parts)} 章", f"Chapter{'s' if len(ns) > 1 else ''} {', '.join(parts)}")


def card(p, top_zh, top_en, foot_zh, foot_en, foot_role, key):
    p.rect(1, 1, W - 2, H - 2, color="edge", width=1.1, rx=8)
    p.text(CX, 24, p.t(top_zh, top_en), size=14, color="dim", anchor="middle")
    p.text(CX, H - 36, p.t(foot_zh, foot_en), size=14, weight=600, color=foot_role, anchor="middle")
    p.text(CX, H - 13, chapters(p, key), size=13, color="dim", anchor="middle")


def pure_state(p):
    card(p, "纯态 |ψ⟩", "pure state |ψ⟩", "球面上的方向", "direction on the sphere", "now", "pure")
    sp = p.sphere(CX, CY + 2, 54)
    sp.outline()
    sp.great_circle((0, 0, 1))
    v = figkit.sph(52, 70)
    assert abs(figkit.dot3(v, v) - 1) < 1e-12
    sp.dot((0, 0, 0), "ink", 2.6)
    sp.arrow(v, "now", 2.6)


def born(p):
    card(p, "玻恩法则 |⟨φ|ψ⟩|²", "Born rule |⟨φ|ψ⟩|²", "影子的平方 cos²θ", "squared shadow cos²θ", "line", "born")
    ox, oy, r, th = 34, 140, 112, 52
    c = math.cos(math.radians(th))
    bx, by = ox + r * c, oy - r * math.sin(math.radians(th))
    assert abs((bx - ox) / r - c) < 1e-12 and abs(c * c - 0.3790) < 1e-3
    p.arc(ox, oy, r, 0, 62, "faint", 1.2, dash="3 4")
    p.arrow(ox, oy, ox + r + 14, oy, "ink", 2.0)
    p.line(bx, by, bx, oy, "dim", 1.3, dash="4 3")
    p.right_angle(bx, oy, 90, 7)
    p.line(ox, oy, bx, oy, "line", 4.5, cap="round")
    p.arrow(ox, oy, bx, by, "now", 2.4)
    p.angle(ox, oy, 30, 0, th, "θ")
    p.text(ox + r + 10, oy - 8, "*a*", size=15)
    p.text(bx + 7, by - 2, "*b*", size=15, color="now")
    p.text((ox + bx) / 2, oy + 19, "cos θ", size=13, color="line", anchor="middle")


def disc(p, R=60):
    p.circle(CX, CY, R, color="dim", width=1.5, fill="cyan", fill_opacity=0.05)
    p.dot(CX, CY, 2.6, "ink")


def density(p):
    card(p, "密度矩阵 ρ", "density matrix ρ", "球内的点", "point inside the ball", "now", "density")
    R = 60
    disc(p, R)
    r, a = 0.58, math.radians(35)
    assert 0 < r < 1                                   # mixed: strictly inside
    x, y = CX + R * r * math.cos(a), CY - R * r * math.sin(a)
    p.line(CX, CY, x, y, "now", 1.6, dash="4 3")
    p.dot(x, y, 5.2, "now", ring="bg")
    p.text(CX, CY + 26, "|*r*| < 1", size=13, color="now", anchor="middle", halo=True)


def decoherence(p):
    card(p, "退相干 Φ(ρ)", "decoherence Φ(ρ)", "捏合到测量轴", "pinch onto the axis", "line", "decoherence")
    R = 60
    disc(p, R)
    p.line(CX, CY - R, CX, CY + R, "line", 2.2)
    rx, rz = 0.62, 0.42                                # Bloch vector (x, z); the axis is z
    pin = (0.0, rz)                                    # pinching keeps z and drops x
    x0, y0 = CX + R * rx, CY - R * rz
    x1, y1 = CX + R * pin[0], CY - R * pin[1]
    p.arrow(x0 - 6, y0, x1 + 7, y1, "area", 1.8, head=8, dash="4 3")
    p.dot(x0, y0, 5.2, "now", ring="bg")
    p.dot(x1, y1, 5.2, "line", ring="bg")


def commutator(p):
    card(p, "对易子 [*A*, *B*]", "commutator [*A*, *B*]", "有向面积 2 *u*∧*v*", "oriented area 2 *u*∧*v*", "area", "commutator")
    ox, oy = 40, 150
    u = (96, -12)
    v = (30, -78)
    pts = [(ox, oy), (ox + u[0], oy + u[1]), (ox + u[0] + v[0], oy + u[1] + v[1]), (ox + v[0], oy + v[1])]
    p.polygon(pts, "area", fill_opacity=0.2, color="area", width=1.2)
    p.arrow(ox, oy, ox + u[0], oy + u[1], "ink", 2.2)
    p.arrow(ox, oy, ox + v[0], oy + v[1], "ink", 2.2)
    mx, my = ox + (u[0] + v[0]) / 2, oy + (u[1] + v[1]) / 2
    pts = [(mx + 17 * math.cos(math.radians(a)), my - 17 * math.sin(math.radians(a))) for a in range(-60, 200, 10)]
    p.curve_arrow(pts, "area", 1.8, head=8)
    p.text(ox + u[0] + 6, oy + u[1] + 16, "*u*", size=15)
    p.text(ox + v[0] - 6, oy + v[1] - 2, "*v*", size=15, anchor="end")


def gate(p):
    card(p, "单比特门 *U*", "single-qubit gate *U*", "旋转器", "rotor", "axis", "gate")
    sp = p.sphere(CX, CY + 2, 54)
    sp.outline()
    axis = (0.0, 0.0, 1.0)
    sp.small_circle(axis, 50)
    sp.segment((0, 0, -1.12), (0, 0, 1.12), "axis", 2.4)
    v0 = figkit.sph(50, -60)
    turn = 150
    v1 = figkit.rotate(v0, axis, turn)
    assert abs(figkit.dot3(v0, axis) - figkit.dot3(v1, axis)) < 1e-12      # same latitude about the axis
    path = [figkit.rotate(v0, axis, turn * k / 30) for k in range(31)]
    sp.curve(path, "axis", 1.8, scale=1.0)
    (xa, ya), (xb, yb) = sp.xy(path[-2]), sp.xy(path[-1])
    p.arrow_head(xb, yb, math.degrees(math.atan2(-(yb - ya), xb - xa)), "axis", head=8)
    sp.arrow(v0, "dim", 2.0)
    sp.arrow(v1, "now", 2.6)


def draw(fig):
    top = fig.row([W, W, W], H, gap=GAP)
    bottom = fig.row([W, W, W], H, gap=GAP, y=H + GAP)
    for p, f in zip(top + bottom, (pure_state, born, density, decoherence, commutator, gate)):
        f(p)
