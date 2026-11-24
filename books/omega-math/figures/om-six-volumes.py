"""The six volumes build from the projective line to the empty-kernel audit."""

SIZE = (356, 629)
ALT = {
    "zh": "以纯 CIC 与 AXIOM-Ω 为起点，六卷依次建立齐次有理射影线与三元数、流群与球面几何、"
          "射流与单纯形斯托克斯公式、彼得—魏尔壳与哈尔积分、阿代尔算术与赫克谱，"
          "最后到 Ω-FRACTRAN、观察者宇宙、空内核审计与实数阴影。",
    "en": "From bare CIC and AXIOM-Ω, the cascade builds the rational projective line and ternions, "
          "heap and spherical geometry, jets and simplicial Stokes, Peter–Weyl shells and Haar integration, "
          "adelic arithmetic and Hecke spectra, then Ω-FRACTRAN, the observer universe, and the empty-kernel "
          "audit with its real shadow.",
}


def draw(fig):
    t = fig.t
    root = fig.box(fig.width / 2, 8, t("纯 CIC 与 AXIOM-Ω", "Bare CIC + AXIOM-Ω"), "cyan", w=320, size=16)
    volumes = [
        (t("第一卷", "Volume I"), t("ℚP¹ · 𝕋₃(ℚ)", "ℚP¹ · 𝕋₃(ℚ)")),
        (t("第二卷", "Volume II"), t("流群 · 凯莱 SO(3, ℚ)\n巴格曼—格拉姆", "Heaps · Cayley SO(3, ℚ)\nBargmann–Gram")),
        (t("第三卷", "Volume III"), t("𝒥₂(ℚ) · D-有限射流\n单纯形斯托克斯", "𝒥₂(ℚ) · D-finite jets\nSimplicial Stokes")),
        (t("第四卷", "Volume IV"), t("彼得—魏尔壳 · 无 π 哈尔积分\nℚ(√2) · ℚ(φ) · 舒尔", "Peter–Weyl shells · π-free Haar\nℚ(√2) · ℚ(φ) · Schur")),
        (t("第五卷", "Volume V"), t("阿代尔乘积 · 赫维茨 S₅\n赫克—拉马努金半正定性", "Adelic product · Hurwitz S₅\nHecke–Ramanujan PSD")),
        (t("第六卷", "Volume VI"), t("Ω-FRACTRAN · 观察者宇宙\n空内核审计 · 阴影 Π_{ℝ}", "Ω-FRACTRAN · Observer universe\nEmpty-kernel audit · Shadow Π_{ℝ}")),
    ]

    center = fig.width / 2
    previous_bottom = root.bottom[1]
    for volume, topics in volumes:
        y = previous_bottom + 18
        lines = topics.splitlines()
        height = 35 + 23 * len(lines)
        fig.rect(18, y, 320, height, color="ink", fill="ink", fill_opacity=0.04, rx=6)
        fig.text(center, y + 23, volume, size=15, anchor="middle", weight=600)
        for i, line in enumerate(lines, start=1):
            fig.text(center, y + 23 + i * 23, line, size=15, anchor="middle")
        fig.arrow(center, previous_bottom + 2, center, y - 2, "cyan", 1.6, head=5)
        previous_bottom = y + height
