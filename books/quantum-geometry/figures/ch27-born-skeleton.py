"""玻恩骨架的证明怎样分三路：前两项各一步，第三项绕道三明治 PρP∗。
How the proof of the Born skeleton splits three ways: one step each for the first two conjuncts, and a
detour through the sandwich PρP∗ for the third.

Only the steps the chapter's proof block names are drawn: `simpa … using hTrace`, `Matrix.mul_add`,
`mul_mul_conjTranspose_same`, the `trace_mul_cycle` calc chain and `trace_nonneg`.
"""

from _ch27 import WIDTH, box, hyp, lean_box, link

SIZE = (WIDTH, 346)
ALT = {
    "zh": "证明骨架图，自上而下。左侧虚线框的前提 Tr ρ = 1 引出第①路：Tr(ρ · 1) = 1，用 simpa … using hTrace。"
          "第②路：可加，用 Matrix.mul_add，不需要前提。右侧第③路从前提 ρ ⪰ 0 出发，三步向下："
          "PρP∗ ⪰ 0（mul_mul_conjTranspose_same），Tr(PρP∗) = Tr(ρP)（trace_mul_cycle，此处用到前提 P∗ = P、P² = P），"
          "0 ≤ Tr(ρP)（trace_nonneg）。三路汇入底部绿色的 LEAN ✓ born_probability_skeleton。",
    "en": "A proof skeleton, top to bottom. On the left the dashed hypothesis Tr ρ = 1 leads to branch ①: Tr(ρ · 1) = 1, by "
          "simpa … using hTrace. Branch ②: additivity, by Matrix.mul_add, with no hypothesis. On the right branch ③ starts "
          "from the hypothesis ρ ⪰ 0 and goes down in three steps: PρP∗ ⪰ 0 (mul_mul_conjTranspose_same), "
          "Tr(PρP∗) = Tr(ρP) (trace_mul_cycle, using the hypotheses P∗ = P and P² = P), and 0 ≤ Tr(ρP) (trace_nonneg). "
          "The three branches meet in the green LEAN ✓ born_probability_skeleton at the bottom.",
}


def draw(fig):
    t = fig.t
    # the three conjuncts side by side in one row; branch ③ climbs above its own column
    c1, c2, c3 = 78, 224, 372
    h_tr = hyp(fig, c1, 10, "Tr *ρ* = 1")
    h_rho = hyp(fig, c3, 10, "*ρ* ⪰ 0")
    s1 = box(fig, c3 - 44, 56, "*PρP*^{∗} ⪰ 0", "mul_mul_conjTranspose_same")
    s2 = box(fig, c3, 132, "Tr(*PρP*^{∗}) = Tr(*ρP*)", "trace_mul_cycle")
    s3 = box(fig, c3, 208, "③ 0 ≤ Tr(*ρP*)", "trace_nonneg")
    h_p = hyp(fig, s2.x - 26, s2.cy - 14, "*P*^{∗} = *P*，*P*^{2} = *P*" if fig.lang == "zh" else "*P*^{∗} = *P*, *P*^{2} = *P*",
              anchor="end")
    b1 = box(fig, c1, 208, t("① 归一", "① unit"), "simpa … hTrace")
    b2 = box(fig, c2, 208, t("② 可加", "② additive"), "Matrix.mul_add")
    goal = lean_box(fig, WIDTH / 2, 300, "D5/S3/Quantum/FiniteDimensional.born_probability_skeleton")
    assert b1.x + b1.w < b2.x and b2.x + b2.w < s3.x and s1.x + s1.w <= WIDTH - 4

    link(fig, h_tr.bottom, b1.top)
    link(fig, h_rho.bottom, (c3, s1.y))
    link(fig, (c3, s1.y + s1.h), s2.top)
    link(fig, s2.bottom, s3.top)
    link(fig, h_p.right, s2.left)
    for b in (b1, b2, s3):
        link(fig, b.bottom, (min(max(b.cx, goal.x + 16), goal.x + goal.w - 16), goal.y), "ink")
