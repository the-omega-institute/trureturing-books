"""秩一归约的证明是一条重写链：从迹一路改写到内积的模方，每一步换一次形状。
The proof of the rank-one reduction is a chain of rewrites: from the trace down to the squared modulus
of an inner product, one change of shape per step.

The rows follow the six numbered steps of the chapter's proof block; the lemma names beside each arrow
are the ones that block names for that step. Bras and kets stand for `vecMulVec` and `star`.
"""

from _ch27 import lean_box, link

SIZE = (560, 420)
ALT = {
    "zh": "一条自上而下的重写链。recordWeight P ρ k 依次改写为 Tr(ρP_k)（recordWeight、bornProbability），"
          "Tr(|ψ⟩⟨ψ| · |φ⟩⟨φ|)（hPureState、hProjection），⟨ψ|φ⟩ · Tr(|ψ⟩⟨φ|)（vecMulVec_mul_vecMulVec），"
          "⟨ψ|φ⟩ · ⟨φ|ψ⟩（trace_vecMulVec、dotProduct_smul），conj(z) · z，其中 z = ⟨φ|ψ⟩（dotProduct_comm、star_dotProduct、smul_eq_mul），"
          "最后得到 |z|²（normSq_eq_conj_mul_self、normSq_eq_norm_sq）。链的终点是底部绿色的 LEAN ✓ "
          "rank_one_pure_state_modulus_square_reduction。",
    "en": "A chain of rewrites, top to bottom. recordWeight P ρ k becomes Tr(ρP_k) (recordWeight, bornProbability), then "
          "Tr(|ψ⟩⟨ψ| · |φ⟩⟨φ|) (hPureState, hProjection), then ⟨ψ|φ⟩ · Tr(|ψ⟩⟨φ|) (vecMulVec_mul_vecMulVec), then "
          "⟨ψ|φ⟩ · ⟨φ|ψ⟩ (trace_vecMulVec, dotProduct_smul), then conj(z) · z with z = ⟨φ|ψ⟩ (dotProduct_comm, star_dotProduct, "
          "smul_eq_mul), and finally |z|² (normSq_eq_conj_mul_self, normSq_eq_norm_sq). The chain ends in the green LEAN ✓ "
          "rank_one_pure_state_modulus_square_reduction at the bottom.",
}

ROWS = [
    "recordWeight *P* *ρ* *k*",
    "Tr(*ρP*_{k})",
    "Tr(|*ψ*⟩⟨*ψ*| · |*φ*⟩⟨*φ*|)",
    "⟨*ψ*|*φ*⟩ · Tr(|*ψ*⟩⟨*φ*|)",
    "⟨*ψ*|*φ*⟩ · ⟨*φ*|*ψ*⟩",
    "conj(*z*) · *z*",
    "|*z*|^{2}",
]
STEPS = [
    "recordWeight · bornProbability",
    "hPureState · hProjection",
    "vecMulVec_mul_vecMulVec",
    "trace_vecMulVec · dotProduct_smul",
    "dotProduct_comm · star_dotProduct · smul_eq_mul",
    "normSq_eq_conj_mul_self · normSq_eq_norm_sq",
]


def draw(fig):
    assert len(STEPS) == len(ROWS) - 1 == 6          # the six numbered steps of the proof block
    cx, top, gap = 110, 22, 52
    ys = [top + i * gap for i in range(len(ROWS))]
    for i, (y, row) in enumerate(zip(ys, ROWS)):
        last = i == len(ROWS) - 1
        fig.text(cx, y, row, size=15 if last else 14, color="line" if last else "ink", anchor="middle", middle=True,
                 weight=600 if last else None)
    fig.text(cx + 66, ys[5], "*z* = ⟨*φ*|*ψ*⟩", size=13, color="dim", middle=True)
    for i, step in enumerate(STEPS):
        a, b = ys[i] + 12, ys[i + 1] - 12
        link(fig, (cx, a), (cx, b))
        fig.text(cx + 30 if i != 4 else cx + 30, (a + b) / 2, f"{i + 1}", size=13, color="dim", anchor="end", middle=True)
        fig.text(cx + 40, (a + b) / 2, step, size=13, color="dim", mono=True, middle=True)
    goal = lean_box(fig, 280, ys[-1] + 30, "D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction")
    link(fig, (cx, ys[-1] + 12), (cx if cx > goal.x + 16 else goal.x + 16, goal.y), "ink")
