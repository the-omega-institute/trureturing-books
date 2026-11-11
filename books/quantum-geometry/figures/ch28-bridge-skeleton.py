"""三合取桥的证明：第一项借上一条定理，第二项按定义，第三项逐项分权重为零与不为零两种情形。
The proof of the three-conjunct bridge: the first conjunct borrows the previous theorem, the second
holds by definition, the third splits each term on whether its weight vanishes.

Only what the chapter's proof block names is drawn: `refine ⟨?_, ?_, ?_⟩`, the call to
rank_one_pure_state_modulus_square_reduction (green: cited with lean= in this chapter), `rfl`,
`unread_eq_weighted_ensemble` and its `by_cases` on recordWeight P ρ j = 0 (`smul_smul`,
`mul_inv_cancel₀`; `compressed_eq_zero_of_recordWeight_eq_zero`).
"""

from _ch27 import box, hyp, lean_box, link

SIZE = (560, 312)
ALT = {
    "zh": "证明骨架图。底部绿色的 LEAN ✓ rank_one_born_pairing_weight 由三路汇入：第①路是绿色的上一条定理“秩一归约”；"
          "第②路“= Tr(ρP_k)”用 rfl；第③路“U(ρ) = Σ w_j ρ_j”用 unread_eq_weighted_ensemble，它上方分两种情形："
          "w_j ≠ 0 时用 smul_smul 与 mul_inv_cancel₀ 得到 w_j ρ_j = P_jρP_j；w_j = 0 时用 compressed_eq_zero_of_recordWeight_eq_zero "
          "得到 P_jρP_j = 0，这一支还用到虚线圈里的前提 ρ ⪰ 0。",
    "en": "A proof skeleton. The green LEAN ✓ rank_one_born_pairing_weight at the bottom is fed by three branches: branch ① is "
          "the previous theorem, the rank-one reduction, in green; branch ②, the trace pairing = Tr(ρP_k), is rfl; branch ③, "
          "U(ρ) = Σ w_j ρ_j, is unread_eq_weighted_ensemble, which above it splits into two cases: for w_j ≠ 0, smul_smul "
          "and mul_inv_cancel₀ give w_j ρ_j = P_jρP_j; for w_j = 0, compressed_eq_zero_of_recordWeight_eq_zero gives "
          "P_jρP_j = 0, a case that also uses the dashed hypothesis ρ ⪰ 0.",
}


def draw(fig):
    t = fig.t
    c2 = box(fig, 360, 8, "*w*_{j} = 0 ⇒ *P*_{j}*ρP*_{j} = 0", "compressed_eq_zero_of_recordWeight_eq_zero")
    h = hyp(fig, 70, c2.cy - 14, "*ρ* ⪰ 0")
    c1 = box(fig, 190, 84, "*w*_{j} ≠ 0 ⇒ *w*_{j}*ρ*_{j} = *P*_{j}*ρP*_{j}", "smul_smul · mul_inv_cancel₀")
    s3 = box(fig, 420, 162, "③ *U*(*ρ*) = Σ *w*_{j}*ρ*_{j}", "unread_eq_weighted_ensemble")
    s2 = box(fig, 244, 162, "② = Tr(*ρP*_{k})", "rfl")
    s1 = lean_box(fig, 98, 170, "D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction",
                  label=t("① 秩一归约", "① rank one"))
    goal = lean_box(fig, 280, 268, "D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight")
    link(fig, h.right, c2.left)
    x_in = s3.x + 34
    link(fig, (x_in + 60, c2.y + c2.h), (x_in + 60, s3.y))
    fig.curve_arrow([c1.right, (x_in, c1.cy), (x_in, s3.y)], "dim", 1.4, head=7)
    fig.text(x_in + 68, 148, "by_cases", size=13, color="dim", mono=True)
    for b in (s1, s2, s3):
        link(fig, b.bottom, (min(max(b.cx, goal.x + 16), goal.x + goal.w - 16), goal.y), "ink")
