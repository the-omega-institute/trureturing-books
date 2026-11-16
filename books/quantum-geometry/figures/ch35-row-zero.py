"""第 0 行存下合成规则：三比特奇偶查询，逐行死表要 8 行，第 0 行加三条基行只要 4 行，同一个查询读出同一个值。
Row 0 holds the composition rule: for a three-bit parity query the flat table needs 8 rows, Row 0
with three basis rows needs only 4, and the same query reads out the same value.

The data are the chapter's example n = 3, w = (1, 0, 1): every value f_w(x) = ⊕ wᵣxᵣ is computed and
checked against the chapter's list, and the query x = (1, 1, 1) gives 0 both ways (asserted in _ch35).
"""

from _ch35 import KEYS, N_BITS, VALUES, W, parity

SIZE = (460, 316)
ALT = {
    "zh": "左右两张表。左边是逐行死表，8 行青色的格子依次写着 000 ↦ 0、001 ↦ 1、010 ↦ 0、011 ↦ 1、100 ↦ 1、101 ↦ 0、110 ↦ 1、111 ↦ 0，"
          "最后一行 111 ↦ 0 被琥珀色框住。右边是同像表：紫色的第 0 行写着读出规则 T(x) = ⊕ xᵣ T(eᵣ)，下面三行青色的基行 e₁ ↦ 1、e₂ ↦ 0、e₃ ↦ 1；"
          "下方琥珀色写着查询 x = 111 的算式 1·1 ⊕ 1·0 ⊕ 1·1 = 0。",
    "en": "Two tables side by side. On the left, the flat table: eight cyan rows reading 000 ↦ 0, 001 ↦ 1, 010 ↦ 0, "
          "011 ↦ 1, 100 ↦ 1, 101 ↦ 0, 110 ↦ 1, 111 ↦ 0, the last one framed in amber. On the right, the homoiconic "
          "table: the violet Row 0 holds the read-out rule T(x) = ⊕ xᵣ T(eᵣ), with three cyan basis rows e₁ ↦ 1, "
          "e₂ ↦ 0, e₃ ↦ 1 below; underneath, in amber, the query x = 111 worked out as 1·1 ⊕ 1·0 ⊕ 1·1 = 0.",
}

QUERY = (1, 1, 1)


def bits(x):
    return "".join(str(b) for b in x)


def draw(fig):
    rh, gap = 27, 4
    # ---- left: the flat table
    lx, lw, y0 = 24, 150, 58
    fig.text(lx + lw / 2, 30, fig.t(f"逐行死表：2³ = {len(KEYS)} 行", f"flat table: 2³ = {len(KEYS)} rows"), size=14,
             weight=600, anchor="middle")
    for i, (x, v) in enumerate(zip(KEYS, VALUES)):
        y = y0 + i * (rh + gap)
        cur = x == QUERY
        fig.rect(lx, y, lw, rh, color="now" if cur else "cyan", fill="cyan", fill_opacity=0.14,
                 width=2.2 if cur else 1.1, rx=3)
        fig.text(lx + lw / 2, y + rh / 2, f"{bits(x)}  ↦  {v}", size=14, mono=True, anchor="middle", middle=True,
                 color="now" if cur else "ink")
    # ---- right: Row 0 and the basis rows
    rx, rw = 228, 208
    fig.text(rx + rw / 2, 30, fig.t(f"同像表：1 + {N_BITS} = {N_BITS + 1} 行", f"homoiconic: 1 + {N_BITS} = {N_BITS + 1} rows"),
             size=14, weight=600, anchor="middle")
    fig.rect(rx, y0, rw, rh + 6, color="argued", fill="argued", fill_opacity=0.18, width=1.6, rx=3)
    fig.text(rx - 8, y0 + (rh + 6) / 2, "0", size=13, color="argued", anchor="end", middle=True, weight=600)
    fig.text(rx + rw / 2, y0 + (rh + 6) / 2, "*T*(*x*) = ⊕ *x*ᵣ *T*(**e**ᵣ)", size=14, color="argued", anchor="middle",
             middle=True)
    for s in range(N_BITS):
        y = y0 + rh + 6 + 8 + s * (rh + gap)
        fig.rect(rx, y, rw, rh, color="cyan", fill="cyan", fill_opacity=0.14, width=1.1, rx=3)
        fig.text(rx - 8, y + rh / 2, str(s + 1), size=13, color="dim", anchor="end", middle=True)
        fig.text(rx + rw / 2, y + rh / 2, f"**e**{'₁₂₃'[s]}  ↦  {W[s]}", size=14, anchor="middle", middle=True)
    # the same query, read through Row 0
    terms = " ⊕ ".join(f"{q}·{w}" for q, w in zip(QUERY, W))
    val = parity(QUERY)
    assert val == VALUES[KEYS.index(QUERY)] == 0
    yq = y0 + rh + 6 + 8 + N_BITS * (rh + gap) + 34
    fig.text(rx + rw / 2, yq, "*x* = " + bits(QUERY), size=14, color="now", anchor="middle", weight=600)
    fig.text(rx + rw / 2, yq + 26, f"{terms} = {val}", size=14, color="now", anchor="middle")
