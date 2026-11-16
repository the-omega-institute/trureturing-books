"""不动点判据的证明分两个方向，各三步，两边都靠一次“和式只剩对角那一项”。
The proof of the fixed-point criterion has two directions of three steps each, and each side hinges on a
sum collapsing to its diagonal term.

Only what the chapter's proof block names is drawn. ⇒: rewrite ρ by ← hFixed, `left_project_unread`,
`hP.orthogonal`. ⇐: the row lemma hRow (`hP.complete`, `Finset.sum_eq_single` with the off-diagonal
hypothesis), then the sum over k with `hP.complete` again.
"""

from _ch27 import box, hyp, lean_box, link

SIZE = (440, 352)
ALT = {
    "zh": "证明骨架图，左右两列。左列“⇒”：从前提 U(ρ) = ρ 出发，P_kρP_l = P_k U(ρ) P_l（← hFixed），"
          "= P_kρP_k · P_l（left_project_unread），= 0（hP.orthogonal）。右列“⇐”：从前提 P_kρP_l = 0（k ≠ l）出发，"
          "P_kρ = Σ_l P_kρP_l（hP.complete），= P_kρP_k（sum_eq_single），再对 k 求和得 U(ρ) = ρ（hP.complete）。"
          "两列汇入底部绿色的 LEAN ✓ unreadState_fixed_iff。",
    "en": "A proof skeleton in two columns. Left, '⇒': from the hypothesis U(ρ) = ρ, P_kρP_l = P_k U(ρ) P_l (← hFixed), "
          "= P_kρP_k · P_l (left_project_unread), = 0 (hP.orthogonal). Right, '⇐': from the hypothesis P_kρP_l = 0 (k ≠ l), "
          "P_kρ = Σ_l P_kρP_l (hP.complete), = P_kρP_k (sum_eq_single), and summing over k gives U(ρ) = ρ (hP.complete). "
          "The two columns meet in the green LEAN ✓ unreadState_fixed_iff at the bottom.",
}


def draw(fig):
    L, R = 110, 330
    fig.text(L, 18, "⇒", size=16, weight=600, anchor="middle", middle=True)
    fig.text(R, 18, "⇐", size=16, weight=600, anchor="middle", middle=True)
    hl = hyp(fig, L, 34, "*U*(*ρ*) = *ρ*")
    hr = hyp(fig, R, 34, "*P*_{k}*ρP*_{l} = 0 (*k* ≠ *l*)")
    l1 = box(fig, L, 88, "*P*_{k}*ρP*_{l} = *P*_{k}*U*(*ρ*)*P*_{l}", "← hFixed")
    l2 = box(fig, L, 160, "= *P*_{k}*ρP*_{k} · *P*_{l}", "left_project_unread")
    l3 = box(fig, L, 232, "= 0", "hP.orthogonal")
    r1 = box(fig, R, 88, "*P*_{k}*ρ* = Σ_{l} *P*_{k}*ρP*_{l}", "hP.complete")
    r2 = box(fig, R, 160, "= *P*_{k}*ρP*_{k}", "sum_eq_single")
    r3 = box(fig, R, 232, "*U*(*ρ*) = Σ_{k} *P*_{k}*ρ* = *ρ*", "hP.complete")
    for a, b in ((hl, l1), (l1, l2), (l2, l3), (hr, r1), (r1, r2), (r2, r3)):
        link(fig, a.bottom, b.top)
    goal = lean_box(fig, fig.width / 2, 310, "D5/S3/Observer/Conditioning.unreadState_fixed_iff")
    assert all(b.x >= 4 and b.x + b.w <= fig.width - 4 for b in (hl, hr, l1, l2, l3, r1, r2, r3))
    assert l1.x + l1.w + 12 < r1.x and hl.x + hl.w + 12 < hr.x
    for b in (l3, r3):
        link(fig, b.bottom, (min(max(b.cx, goal.x + 16), goal.x + goal.w - 16), goal.y), "ink")
