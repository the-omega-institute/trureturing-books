"""一扇宽度为 1 的内禀窗口同时点亮实轴上的一串分开的位置。
One internal window of width 1 lights up a whole row of separated places on the real line at once.

Top: the golden lattice, u = ⟨a, b⟩ drawn at (a + bφ, a + b(1 − φ)) (physical coordinate across,
conjugate coordinate up), with the horizontal strip goldenWindow = [φ − 2, φ − 1]. Bottom: the real line
E∥; every lattice point in the strip drops straight down to a lit place. The five places y₋₂ … y₂ and
the rejected ⟨0, 1⟩ ↦ φ are those of the hand count in §37.4 (asserted in _ch37).
"""

from _ch37 import PHI, W_HI, W_LO, in_window, lattice

SIZE = (460, 262)
ALT = {
    "zh": "上半是黄金格点：横坐标是物理坐标 a + bφ，纵坐标是共轭坐标 a + b(1 − φ)。一条青色的水平带是窗口 [φ − 2, φ − 1]，宽度 1。带里的五个格点涂成青色，"
          "各自沿竖直虚线落到下方的实轴 E∥ 上，点亮 y₋₂ ≈ −2.62、y₋₁ ≈ −1.62、y₀ = 0、y₁ ≈ 2.62、y₂ ≈ 4.24；相邻两点至少相隔 1。"
          "格点 ⟨0, 1⟩ 落在带的下方，它在实轴上的位置 φ ≈ 1.62 被打叉。带外的其余格点是灰色的。",
    "en": "Top: the golden lattice, with the physical coordinate a + bφ across and the conjugate coordinate a + b(1 − φ) up. A "
          "cyan horizontal strip is the window [φ − 2, φ − 1], of width 1. The five lattice points inside it are cyan and "
          "drop along dashed verticals onto the real line E∥ below, lighting y₋₂ ≈ −2.62, y₋₁ ≈ −1.62, y₀ = 0, y₁ ≈ 2.62 and "
          "y₂ ≈ 4.24, every two neighbours at least 1 apart. The lattice point ⟨0, 1⟩ lies below the strip, and its place "
          "φ ≈ 1.62 on the real line is crossed out. The other lattice points, outside the strip, are grey.",
}

X0, X1 = -3.3, 4.7
S = 48.0
LEFT = 38.0
P_TOP = 1.3
TOP = 34.0
LINE_Y = 214.0
NAMES = {-2: "y₋₂", -1: "y₋₁", 0: "y₀", 1: "y₁", 2: "y₂"}


def X(x):
    return LEFT + (x - X0) * S


def P(p):
    return TOP + (P_TOP - p) * S


def draw(fig):
    t = fig.t
    right = X(X1)
    # the conjugate axis and the window strip
    fig.line(X(0), P(P_TOP) - 4, X(0), P(-P_TOP), "faint", 1.2)
    fig.line(LEFT, P(0), right, P(0), "faint", 1.2)
    fig.rect(LEFT, P(W_HI), right - LEFT, P(W_LO) - P(W_HI), color="line", fill="line", fill_opacity=0.14, width=1.2)
    fig.text(X(0) + 6, P(P_TOP) + 8, "E⊥", size=14, color="dim")
    fig.text(right - 4, P(W_HI) - 7, t("窗口 [φ − 2, φ − 1]", "window [φ − 2, φ − 1]"), size=13, color="line",
             anchor="end", halo=True)

    pts = lattice(X0, X1, -P_TOP, P_TOP)
    lit = sorted((x, p) for a, b, x, p in pts if in_window(p))
    assert len(lit) == 5
    for a, b, x, p in pts:
        if not in_window(p):
            fig.dot(X(x), P(p), 2.8, "faint")

    # the real line
    fig.arrow(LEFT - 8, LINE_Y, right + 8, LINE_Y, "ink", 1.6, head=8)
    fig.text(LEFT - 8, LINE_Y - 10, "E∥", size=14, color="ink")

    # ⟨0, 1⟩ ↦ φ: just below the window, rejected
    rp = 1 - PHI
    assert not in_window(rp) and rp < W_LO
    fig.line(X(PHI), P(rp), X(PHI), LINE_Y, "faint", 1.2, dash="2 4")
    fig.dot(X(PHI), P(rp), 3.4, "dim")
    fig.cross(X(PHI), LINE_Y, 6, "dim", 2.0)
    fig.text(X(PHI), LINE_Y + 24, "φ", size=14, color="dim", anchor="middle")

    for k, (x, p) in enumerate(lit, start=-2):
        fig.line(X(x), P(p), X(x), LINE_Y, "line", 1.2, dash="3 3")
        fig.dot(X(x), P(p), 4.4, "line", ring="bg")
        fig.dot(X(x), LINE_Y, 5.0, "line", ring="bg")
        fig.text(X(x), LINE_Y + 24, NAMES[k], size=14, color="line", anchor="middle")
    gaps = [b[0] - a[0] for a, b in zip(lit, lit[1:])]
    assert min(gaps) >= 1 - 1e-9
    # the gap of exactly 1 between y₋₂ and y₋₁ (both window endpoints)
    assert abs(gaps[0] - 1) < 1e-9
