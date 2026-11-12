"""相位刚性的证明怎样走：先把 A 压成对角，再沿支撑链把对角元传成同一个，最后分空与非空收尾。
How the proof of phase rigidity runs: first force A diagonal, then pass one diagonal entry along the
support chain, then close on the empty and the non-empty index type.

Only the steps the chapter's proof block names are drawn: the private lemma
`coordinate_shape_of_connected_ray_tests` (hoff, hstep with `Finset.sum_eq_single` and
`mul_right_cancel₀`, induction on `Relation.ReflTransGen`), then `isEmpty_or_nonempty ι`.
"""

from _ch27 import WIDTH, box, hyp, lean_box, link

SIZE = (WIDTH, 448)
ALT = {
    "zh": "证明骨架图，自上而下。虚线框是私有引理 coordinate_shape_of_connected_ray_tests，里面三步："
          "由前提“坐标射线不变”得到非对角元 A_{ij} = 0（hoff）；由前提“测试射线不变”得到支撑重叠的两格 A_{ii} = A_{jj}"
          "（hstep，用 sum_eq_single 与 mul_right_cancel₀）；由前提“支撑连通”沿 ReflTransGen 归纳，得到所有对角元相等。"
          "框下分两支（isEmpty_or_nonempty）：ι 为空时取 c = 1；ι 非空时取 c = A_{bb}，再由前提“A 幺正”得到 |c| = 1。"
          "两支汇入底部绿色的 LEAN ✓ unitary_phase_of_connected_ray_tests。",
    "en": "A proof skeleton, top to bottom. The dashed frame is the private lemma coordinate_shape_of_connected_ray_tests, "
          "with three steps inside: from the hypothesis 'coordinate rays kept', the off-diagonal entries vanish, A_{ij} = 0 "
          "(hoff); from 'test rays kept', two coordinates sharing a support have A_{ii} = A_{jj} (hstep, by sum_eq_single "
          "and mul_right_cancel₀); from 'supports connected', induction on ReflTransGen makes every diagonal entry equal. "
          "Below the frame the proof splits (isEmpty_or_nonempty): for empty ι take c = 1; for non-empty ι take c = A_{bb}, "
          "and the hypothesis 'A unitary' gives |c| = 1. Both branches meet in the green LEAN ✓ "
          "unitary_phase_of_connected_ray_tests at the bottom.",
}


def draw(fig):
    t = fig.t
    cx = 302
    fx0, fx1 = 148, WIDTH - 4                     # the dashed frame of the private lemma
    fig.text(fx0, 18, "coordinate_shape_of_connected_ray_tests", size=13, color="dim", mono=True)
    fig.rect(fx0, 26, fx1 - fx0, 240, color="dim", rx=8, width=1.2, dash="5 4")
    s1 = box(fig, cx, 52, t("非对角元 *A*_{ij} = 0", "off-diagonal *A*_{ij} = 0"), "hoff")
    s2 = box(fig, cx, 128, "*x*_{i}, *x*_{j} ≠ 0 ⇒ *A*_{ii} = *A*_{jj}", "sum_eq_single · mul_right_cancel₀")
    s3 = box(fig, cx, 204, t("所有 *A*_{ii} 相等", "all *A*_{ii} equal"), t("ReflTransGen 归纳", "ReflTransGen induction"))
    h1 = hyp(fig, fx0 - 8, s1.cy - 14, t("坐标射线不变", "coordinate rays"), anchor="end")
    h2 = hyp(fig, fx0 - 8, s2.cy - 14, t("测试射线不变", "test rays"), anchor="end")
    h3 = hyp(fig, fx0 - 6, s3.cy - 14, t("支撑连通", "supports connected"), anchor="end")
    assert min(h.x for h in (h1, h2, h3)) >= 0 and fx0 < s2.x and s2.x + s2.w < fx1
    link(fig, s1.bottom, s2.top)
    link(fig, s2.bottom, s3.top)
    for h, s in ((h1, s1), (h2, s2), (h3, s3)):
        link(fig, h.right, s.left)

    # below the frame the proof splits on whether ι is empty
    fork, row = 280, 334
    e = box(fig, 100, row, t("ι 为空：*c* = 1", "ι empty: *c* = 1"), "Subsingleton.elim")
    ne = box(fig, 330, row, t("ι 非空：*c* = *A*_{bb}，|*c*| = 1", "ι non-empty: *c* = *A*_{bb}, |*c*| = 1"), "nlinarith")
    ha = hyp(fig, ne.x + ne.w - 40, fork - 8, t("*A* 幺正", "*A* unitary"))
    assert e.x + e.w < ne.x < cx < ha.x and ne.x + ne.w < WIDTH
    fig.polyline([(cx, 266), (cx, fork)], "dim", 1.4)
    fig.polyline([(e.cx, fork), (cx, fork)], "dim", 1.4)
    link(fig, (e.cx, fork), e.top)
    link(fig, (cx, fork), (cx, ne.y))
    fig.text(cx - 8, fork + 16, "isEmpty_or_nonempty ι", size=13, color="dim", mono=True, anchor="end")
    link(fig, ha.bottom, (ha.cx, ne.y))
    goal = lean_box(fig, WIDTH / 2, 408, "D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests")
    link(fig, e.bottom, (max(e.cx, goal.x + 16), goal.y), "ink")
    link(fig, ne.bottom, (ne.cx, goal.y), "ink")
