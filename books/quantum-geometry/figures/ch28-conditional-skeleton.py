"""条件态完备性的证明分四步，第三步借第二十七章的玻恩骨架。
The proof that a conditional state is a state takes four steps, and the third borrows the Born skeleton
of Chapter 27.

Only what the chapter's proof block names is drawn: `mul_mul_conjTranspose_same`, the
`trace_mul_cycle` / `trace_mul_comm` calc chain, `born_probability_skeleton` (green: cited with lean=)
with `inv_nonneg`, and `PosSemidef.smul`, `trace_smul`, `inv_mul_cancel₀`.
"""

from _ch27 import WIDTH, box, hyp, lean_box, link

SIZE = (WIDTH, 368)
ALT = {
    "zh": "证明骨架图，四步自上而下。① P_kρP_k ⪰ 0（mul_mul_conjTranspose_same），左侧前提 P_k 自伴、ρ ⪰ 0 指向它；"
          "② Tr(P_kρP_k) = w_k（trace_mul_cycle、trace_mul_comm），前提 P_k 幂等指向它；"
          "③ 0 ≤ w_k⁻¹（inv_nonneg），左侧绿色的 LEAN ✓ born_probability_skeleton 指向它；"
          "④ ρ_k ⪰ 0 且 Tr ρ_k = 1（smul、trace_smul、inv_mul_cancel₀），前提 w_k ≠ 0 指向它。"
          "链的终点是底部绿色的 LEAN ✓ conditionalState_isState。",
    "en": "A proof skeleton, four steps top to bottom. ① P_kρP_k ⪰ 0 (mul_mul_conjTranspose_same), fed by the hypotheses "
          "P_k self-adjoint and ρ ⪰ 0 on the left; ② Tr(P_kρP_k) = w_k (trace_mul_cycle, trace_mul_comm), fed by P_k "
          "idempotent; ③ 0 ≤ w_k⁻¹ (inv_nonneg), fed by the green LEAN ✓ born_probability_skeleton on the left; "
          "④ ρ_k ⪰ 0 and Tr ρ_k = 1 (smul, trace_smul, inv_mul_cancel₀), fed by w_k ≠ 0. The chain ends in the green "
          "LEAN ✓ conditionalState_isState at the bottom.",
}


def draw(fig):
    t = fig.t
    cx, c3 = 300, 390                              # the chain, and step ③ moved right to make room for the Born box
    s1 = box(fig, cx, 10, "① *P*_{k}*ρP*_{k} ⪰ 0", "mul_mul_conjTranspose_same")
    s2 = box(fig, cx, 86, "② Tr(*P*_{k}*ρP*_{k}) = *w*_{k}", "trace_mul_cycle · trace_mul_comm")
    s3 = box(fig, c3, 162, "③ 0 ≤ *w*_{k}^{−1}", "inv_nonneg")
    s4 = box(fig, cx, 238, t("④ *ρ*_{k} ⪰ 0，Tr *ρ*_{k} = 1", "④ *ρ*_{k} ⪰ 0, Tr *ρ*_{k} = 1"), "smul · trace_smul · inv_mul_cancel₀")
    h1 = hyp(fig, 8, s1.cy - 14, t("*P*_{k}^{∗} = *P*_{k}，*ρ* ⪰ 0", "*P*_{k}^{∗} = *P*_{k}, *ρ* ⪰ 0"), anchor="start")
    h2 = hyp(fig, 8, s2.cy - 14, "*P*_{k}*P*_{k} = *P*_{k}", anchor="start")
    born = lean_box(fig, 8 + 146, s3.cy - 17, "D5/S3/Quantum/FiniteDimensional.born_probability_skeleton")
    h4 = hyp(fig, 8, s4.cy - 14, "*w*_{k} ≠ 0", anchor="start")
    assert born.x >= 4 and born.x + born.w + 20 < s3.x and s3.x + s3.w <= WIDTH - 4 and s4.x + s4.w <= WIDTH - 4
    assert all(h.x + h.w + 20 < s.x for h, s in ((h1, s1), (h2, s2), (h4, s4)))
    link(fig, s1.bottom, s2.top)
    link(fig, (c3, s2.y + s2.h), s3.top)
    link(fig, s3.bottom, (c3, s4.y))
    for h, s in ((h1, s1), (h2, s2), (h4, s4)):
        link(fig, h.right, s.left)
    link(fig, born.right, s3.left)
    goal = lean_box(fig, WIDTH / 2, 324, "D5/S3/Observer/Conditioning.conditionalState_isState")
    link(fig, s4.bottom, (s4.cx, goal.y), "ink")
