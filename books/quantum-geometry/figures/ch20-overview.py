"""第二十章地图：熵封顶而门数还在长（玩具示意）、导线上诞生的偶奇偶标签必须复原（CNOT 下界，已验证）、P 与 NP 之间的边界（开放）。
Chapter 20 at a glance: the entropy caps while the gate count keeps growing (a toy sketch), an even parity
label born on a wire must be returned (the CNOT lower bound, verified), and the border between P and NP (open).

Panel I plots the chapter's toy functions C(t) = 2t and S(t) = min(2t, 4) at t = 0, 1, 2, 3 (asserted
against the worked example). Panel II is the n = 1 circuit of ch20-parity-labels in miniature: CNOT, R_z on the label z₀ ⊕ z₁, CNOT
(the circuit itself is checked there).
Panel III draws P inside NP with the question mark on the ring between them.
"""

SIZE = (740, 290)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：示意坐标图，横轴 t 从 0 到 3；品红的直线 C(t) = 2t 一直上升（与青线重合的一段画成虚线），青色的折线 S(t) = min(2t, 4) 在 t = 2 撞上灰色虚线 4 后横着走；四个点 t = 0、1、2、3 标在两条线上。"
          "第二栏：两比特电路，两根导线，一个 CNOT、导线 1 上的 R_z、再一个 CNOT；导线 1 的标签从青色的 z₁ 变成品红的 z₀ ⊕ z₁（标“诞生”），再回到青色的 z₁（标“复原”）；下面写着 2 比特 1 + 1 = 2 个 CNOT，一枚绿色的 LEAN ✓ 标签：CNOT ≥ 2²ⁿ⁻¹ + 2n − 2。"
          "第三栏：一个大椭圆 NP 里套着一个青色的小椭圆 P，两者之间的环带上写着红色的问号；下方一枚红色标签：P ≠ NP 开放。",
    "en": "Three panels. Panel I: a schematic plot, t from 0 to 3 across; the magenta line C(t) = 2t keeps rising (dashed where it runs along the cyan line), while the cyan "
          "line S(t) = min(2t, 4) runs into the grey dashed level 4 at t = 2 and goes flat; the points t = 0, 1, 2, 3 are marked "
          "on both. Panel II: a two-qubit circuit, two wires with a CNOT, an R_z on wire 1 and "
          "another CNOT; the label of wire 1 goes from cyan z₁ to magenta z₀ ⊕ z₁ (marked birth) and back to cyan z₁ (marked "
          "return); beneath, 2 qubits: 1 + 1 = 2 CNOTs, and a green LEAN ✓ tag: CNOT ≥ 2²ⁿ⁻¹ + 2n − 2. Panel III: a large ellipse NP holding a small "
          "cyan ellipse P, with a red question mark on the ring between them; a red tag beneath: P ≠ NP open.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 290, gap=16)

    # ---- I: the toy curves of the chapter's worked example
    title(one, "I　熵封顶，门数还在长", "I  entropy caps, gates grow")
    C = lambda t: 2 * t
    S = lambda t: min(2 * t, 4)
    assert [(C(t), S(t)) for t in range(4)] == [(0, 0), (2, 2), (4, 4), (6, 4)]
    ax = one.axes(40, 52, 176, 176, (0, 3.3), (0, 7))
    ax.xaxis(ticks=[0, 1, 2, 3], label="*t*", size=13)
    ax.yaxis(ticks=[0, 4], size=13)
    ax.hline(4, "dim", 1.3, dash="4 4")
    ax.plot(S, 0, 3.3, color="line", width=3.4)
    ax.plot(C, 0, 2, color="area", width=2.2, dash="6 5")      # where C and S coincide, C is drawn dashed on top
    ax.plot(C, 2, 3.3, color="area", width=3.0)
    ax.points([(t, C(t)) for t in range(4)], color="area", r=4)
    ax.points([(t, S(t)) for t in range(4)], color="line", r=4)
    ax.text(3, 6, "*C*", dx=-12, dy=-4, size=15, color="area", anchor="end", weight=600)
    ax.text(3.3, 4, "*S*", dx=-2, dy=-8, size=15, color="line", anchor="end", weight=600)
    one.text(one.width / 2, 280, one.t("玩具示意", "toy sketch"), size=13, color="dim", anchor="middle")

    # ---- II: the CNOT lower bound: an even label is born and must be returned (n = 1)
    title(two, "II　偶标签生了要还", "II  born, then returned")
    y0, y1 = 100, 170
    xa, xb = 26, 214
    gx = [70, 120, 170]                                             # CNOT, R_z, CNOT
    lab = {0: ["z₀", "z₀", "z₀"], 1: ["z₁", "z₀ ⊕ z₁", "z₁"]}
    assert [sum(v) % 2 for v in ((0, 1), (1, 1), (0, 1))] == [1, 0, 1]   # odd, even, odd on wire 1
    for q, y in ((0, y0), (1, y1)):
        two.line(xa, y, xb, y, "dim", 1.8)
    two.line(gx[0] + 6, y1, gx[2] - 6, y1, "area", 4.0)
    for k, (a_, b_) in enumerate(((xa, gx[0]), (gx[0], gx[2]), (gx[2], xb))):
        for q, y in ((0, y0), (1, y1)):
            even = q == 1 and k == 1
            if q == 0 and k == 1:
                continue
            two.text((a_ + b_) / 2 if not even else gx[1], y - (30 if even else 10), lab[q][k], size=13,
                     color="area" if even else "line", anchor="middle", weight=600 if even else 400)
    two.text((gx[0] + gx[2]) / 2, y0 - 10, "z₀", size=13, color="line", anchor="middle")
    for x in (gx[0], gx[2]):
        two.line(x, y0, x, y1 + 11, "ink", 1.8)
        two.dot(x, y0, 4.2, "ink")
        two.circle(x, y1, 11, color="ink", fill="bg", width=1.8)
        two.line(x - 11, y1, x + 11, y1, "ink", 1.8)
    two.rect(gx[1] - 18, y1 - 13, 36, 26, color="ink", fill="panel", width=1.6, rx=4)
    two.text(gx[1], y1, "*R*_{*z*}", size=13, color="ink", anchor="middle", middle=True)
    two.text(gx[0], y1 + 34, two.t("诞生", "birth"), size=13, color="area", anchor="middle")
    two.text(gx[2], y1 + 34, two.t("复原", "return"), size=13, color="line", anchor="middle")
    two.text(118, 238, two.t("2 比特：1 + 1 = 2 个 CNOT", "2 qubits: 1 + 1 = 2 CNOTs"), size=13, color="dim", anchor="middle")
    two.chip(118, 280, "LEAN ✓ CNOT ≥ 2²ⁿ⁻¹ + 2n − 2", "lean", anchor="middle")

    # ---- III: P inside NP, the border open
    title(three, "III　P 与 NP 之间", "III  between P and NP")
    cx, cy = 118, 146
    three.ellipse(cx, cy, 100, 86, color="ink", fill="panel", width=2.0)
    three.ellipse(cx - 26, cy + 14, 52, 46, color="line", fill="line", fill_opacity=0.22, width=2.2)
    three.text(cx - 26, cy + 14, "P", size=22, color="line", anchor="middle", middle=True, weight=600)
    three.text(cx + 8, cy - 58, "NP", size=20, color="ink", anchor="middle", middle=True, weight=600)
    three.text(cx + 58, cy + 10, "?", size=30, color="open", anchor="middle", middle=True, weight=700)
    three.chip(118, 280, three.t("P ≠ NP：开放", "P ≠ NP: OPEN"), "open", anchor="middle")
