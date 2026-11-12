"""挤压幂等的证明是一条直链：左投影吸收，右乘再吸收，外延到每个 ρ。
The proof that pinching is idempotent is one straight chain: absorb on the left, multiply on the right
and absorb again, then extend to every ρ.

Only the steps the chapter's proof block names are drawn: `left_project_unread` (by
`Finset.sum_eq_single` with orthogonality and idempotence), `unreadState_idempotent`, `funext`.
"""

from _ch27 import WIDTH, box, hyp, lean_box, link

SIZE = (WIDTH, 352)
ALT = {
    "zh": "证明骨架图，自上而下一条直链。第一步：P_k · U(ρ) = P_kρP_k，用 left_project_unread 与 sum_eq_single，"
          "顶上两个虚线框的前提“正交 P_kP_l = 0（k ≠ l）”与“幂等 P_k² = P_k”指向它。第二步：Σ_k P_k U(ρ) P_k = U(ρ)，"
          "用 unreadState_idempotent，幂等前提沿右侧也指向它。第三步：U ∘ U = U，用 funext ρ。"
          "最后到达底部绿色的 LEAN ✓ finite_record_pinching_idempotent。第三步左侧注明 U(ρ) = Σ_k P_kρP_k。",
    "en": "A proof skeleton: one straight chain, top to bottom. Step one: P_k · U(ρ) = P_kρP_k, by left_project_unread and "
          "sum_eq_single; the two dashed hypotheses on top, 'orthogonal P_kP_l = 0 (k ≠ l)' and 'idempotent P_k² = P_k', "
          "point into it. Step two: Σ_k P_k U(ρ) P_k = U(ρ), by unreadState_idempotent; the idempotence hypothesis points "
          "into it as well, down the right-hand side. Step three: U ∘ U = U, by funext ρ. The chain ends in the green LEAN ✓ "
          "finite_record_pinching_idempotent at the bottom. A note left of step three reads U(ρ) = Σ_k P_kρP_k.",
}


def draw(fig):
    t = fig.t
    cx = WIDTH / 2
    h_orth = hyp(fig, 8, 10, t("正交 *P*_{k}*P*_{l} = 0（*k* ≠ *l*）", "orthogonal *P*_{k}*P*_{l} = 0 (*k* ≠ *l*)"), anchor="start")
    h_idem = hyp(fig, WIDTH - 30, 10, t("幂等 *P*_{k}*P*_{k} = *P*_{k}", "idempotent *P*_{k}*P*_{k} = *P*_{k}"), anchor="end")
    s1 = box(fig, cx, 68, "*P*_{k} · *U*(*ρ*) = *P*_{k}*ρP*_{k}", "left_project_unread · sum_eq_single")
    s2 = box(fig, cx, 144, "Σ_{k} *P*_{k} *U*(*ρ*) *P*_{k} = *U*(*ρ*)", "unreadState_idempotent")
    s3 = box(fig, cx, 220, "*U* ∘ *U* = *U*", "funext ρ")
    assert h_orth.x + h_orth.w < h_idem.x and s1.x > 4 and s1.x + s1.w < WIDTH - 22
    link(fig, h_orth.bottom, (h_orth.cx, s1.y))
    link(fig, (h_idem.cx - 24, h_idem.y + h_idem.h), (h_idem.cx - 24, s1.y))
    # idempotence is used again in step two: down the right-hand side
    bus = WIDTH - 12
    fig.curve_arrow([h_idem.right, (bus, h_idem.cy), (bus, s2.cy), s2.right], "dim", 1.4, head=7)
    link(fig, s1.bottom, s2.top)
    link(fig, s2.bottom, s3.top)
    goal = lean_box(fig, cx, 306, "D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent")
    link(fig, s3.bottom, (s3.cx, goal.y), "ink")
    fig.text(14, s3.cy, "*U*(*ρ*) = Σ_{k} *P*_{k}*ρP*_{k}", size=13, color="dim", middle=True)
