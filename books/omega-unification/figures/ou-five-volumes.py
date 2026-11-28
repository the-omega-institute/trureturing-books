"""The five volumes connect the common inputs to the four-question verdict."""

SIZE = (356, 542)
ALT = {
    "zh": "从十九点贝伦德球壳与黎曼零点出发，五卷依次讨论球壳与双钟、规范交汇与希格斯门户、"
          "手征三代与质子稳定性、雷吉引力与暗能量，以及共同算术钟与联合真空。四问都有模型见证，"
          "零拟合推导为零项。",
    "en": "The 19-point Behrend shell and Riemann zeros lead through five volumes on shell geometry "
          "and dual clocks, gauge crossing and Higgs portals, chiral generations and proton stability, "
          "Regge gravity and dark energy, and the shared clock and joint vacuum. All four questions "
          "have model witnesses, and zero have zero-fit derivations.",
}


def draw(fig):
    t = fig.t
    center = fig.width / 2
    width = 320
    gap = 18
    previous = fig.box(center, 8, t("十九点贝伦德球壳＋黎曼零点", "19-Point Behrend Shell + Riemann Zeros"),
                       "cyan", w=width, size=15)
    volumes = (
        (t("第一卷", "Volume I"), t("球壳、双钟与零点算术", "Shell, Dual Clocks, and Zero Arithmetic")),
        (t("第二卷", "Volume II"), t("规范交汇与希格斯门户", "Gauge Crossing and Higgs Portals")),
        (t("第三卷", "Volume III"), t("手征三代、味与质子稳定性", "Chiral Generations, Flavor, and Proton Stability")),
        (t("第四卷", "Volume IV"), t("雷吉引力与暗能量", "Regge Gravity and Dark Energy")),
        (t("第五卷", "Volume V"), t("共同算术钟、联合真空与记忆秩", "Shared Clock, Joint Vacuum, and Memory Rank")),
    )
    for volume, topics in volumes:
        box = fig.box(center, previous.bottom[1] + gap, f"**{volume}**\n{topics}",
                      "edge", w=width, size=14, pad=8)
        fig.arrow(center, previous.bottom[1] + 2, center, box.top[1] - 2, "cyan", 1.6, head=5)
        previous = box

    verdict = fig.box(center, previous.bottom[1] + gap,
                      t("4/4 项有模型见证 · 0/4 项有零拟合推导",
                        "4/4 Model Witnesses · 0/4 Zero-Fit Derivations"),
                      "model", w=width, size=14)
    fig.arrow(center, previous.bottom[1] + 2, center, verdict.top[1] - 2, "cyan", 1.6, head=5)
    assert verdict.bottom[1] <= fig.height
