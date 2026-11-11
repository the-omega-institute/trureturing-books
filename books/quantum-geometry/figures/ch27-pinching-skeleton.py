"""挤压幂等的证明是一条直链：左投影吸收，右乘再吸收，外延到每个 ρ。
The proof that pinching is idempotent is one straight chain: absorb on the left, multiply on the right
and absorb again, then extend to every ρ.

Only the steps the chapter's proof block names are drawn: `left_project_unread` (by
`Finset.sum_eq_single` with orthogonality and idempotence), `unreadState_idempotent`, `funext`.
"""

from _ch27 import box, hyp, lean_box, link

SIZE = (560, 312)
ALT = {
    "zh": "证明骨架图，自上而下一条直链。第一步：P_k · U(ρ) = P_kρP_k，用 left_project_unread 与 sum_eq_single，"
          "左侧虚线框的前提“正交 P_kP_l = 0（k ≠ l）”与“幂等 P_k² = P_k”指向它。第二步：Σ_k P_k U(ρ) P_k = U(ρ)，"
          "用 unreadState_idempotent，幂等前提也指向它。第三步：U ∘ U = U，用 funext ρ。"
          "最后到达底部绿色的 LEAN ✓ finite_record_pinching_idempotent。左下角注明 U(ρ) = Σ_k P_kρP_k。",
    "en": "A proof skeleton: one straight chain, top to bottom. Step one: P_k · U(ρ) = P_kρP_k, by left_project_unread and "
          "sum_eq_single; the dashed hypotheses on the left, 'orthogonal P_kP_l = 0 (k ≠ l)' and 'idempotent P_k² = P_k', "
          "point into it. Step two: Σ_k P_k U(ρ) P_k = U(ρ), by unreadState_idempotent; the idempotence hypothesis points "
          "into it as well. Step three: U ∘ U = U, by funext ρ. The chain ends in the green LEAN ✓ "
          "finite_record_pinching_idempotent at the bottom. A note at the lower left reads U(ρ) = Σ_k P_kρP_k.",
}


def draw(fig):
    t = fig.t
    cx = 370
    s1 = box(fig, cx, 12, "*P*_{k} · *U*(*ρ*) = *P*_{k}*ρP*_{k}", "left_project_unread · sum_eq_single")
    s2 = box(fig, cx, 96, "Σ_{k} *P*_{k} *U*(*ρ*) *P*_{k} = *U*(*ρ*)", "unreadState_idempotent")
    s3 = box(fig, cx, 180, "*U* ∘ *U* = *U*", "funext ρ")
    h_orth = hyp(fig, 6, 4, t("正交 *P*_{k}*P*_{l} = 0（*k* ≠ *l*）", "orthogonal *P*_{k}*P*_{l} = 0 (*k* ≠ *l*)"), anchor="start")
    h_idem = hyp(fig, 6, 64, t("幂等 *P*_{k}*P*_{k} = *P*_{k}", "idempotent *P*_{k}*P*_{k} = *P*_{k}"), anchor="start")
    link(fig, h_orth.right, (s1.x, s1.y + 14))
    link(fig, h_idem.right, (s1.x, s1.y + 38))
    link(fig, (h_idem.x + h_idem.w - 20, h_idem.y + h_idem.h), (s2.x, s2.cy))
    link(fig, s1.bottom, s2.top)
    link(fig, s2.bottom, s3.top)
    goal = lean_box(fig, 330, 266, "D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent")
    link(fig, s3.bottom, (s3.cx, goal.y), "ink")
    fig.text(14, 214, "*U*(*ρ*) = Σ_{k} *P*_{k}*ρP*_{k}", size=13, color="dim")
