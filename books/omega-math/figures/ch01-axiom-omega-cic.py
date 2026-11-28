"""Three routes from the same kernel have different axiom dependencies."""

SIZE = (704, 305)
WRAP = True
ALT = {
    "zh": "三条路线均以裸 CIC 为起点。AXIOM-Ω 的消去与结合律、读数条件及非交换条件"
          "需要逐条给出证书。Mathlib 实数路线依赖三个标准公理。数据公理 n : Nat 没有实现，对 n 的模式匹配停滞。",
    "en": "All three routes start from bare CIC. The AXIOM-Ω model laws require individual certificates "
          "for cancellation and associativity, the reading, and noncommutativity. "
          "Mathlib reals bring in three standard axioms. Matching on the unimplemented data axiom n : Nat stalls.",
}


def draw(fig):
    core, real, custom = fig.row([224, 224, 224], 305)

    for panel, name, role in (
        (core, core.t("构造路线", "Constructive route"), "cyan"),
        (real, real.t("经典路线", "Classical route"), "violet"),
        (custom, custom.t("自定义公理陷阱", "Custom-axiom trap"), "magenta"),
    ):
        panel.text(112, 24, name, size=17, anchor="middle", weight=600)
        kernel = panel.box(112, 43, panel.t("裸 CIC", "Bare CIC"), w=184, dashed=True)
        panel.arrow(*kernel.bottom, 112, 99, role, 1.6, head=6)

    laws = core.box(112, 103, "AXIOM-Ω", "cyan", w=194, size=16)
    for y, label in (
        (158, core.t("I · 流群消去与结合律", "I · Cancellation and associativity")),
        (182, core.t("II · 不变性与格拉姆正性", "II · Invariance and Gram positivity")),
        (206, core.t("III · 次序敏感", "III · Order sensitivity")),
    ):
        core.text(112, y, label, size=13, anchor="middle")
    core.line(112, laws.bottom[1], 112, 141, "cyan", 1.2)
    core.arrow(112, 216, 112, 239, "cyan", 1.6, head=6)
    core.rect(15, 243, 194, 56, color="cyan", fill="cyan", fill_opacity=0.10, rx=6)
    core.text(112, 264, core.t("逐项验证", "Check each law"), size=14, anchor="middle", color="cyan")
    core.text(112, 288, core.t("运算与证书", "Operations and certificates"),
              size=13, anchor="middle", color="dim")

    reals = real.box(112, 103, "Mathlib.Real", "violet", w=194, size=16)
    real.rect(15, 150, 194, 77, color="violet", fill="violet", fill_opacity=0.10, rx=6)
    real.arrow(*reals.bottom, 112, 148, "violet", 1.4, head=5)
    for y, name in zip((169, 192, 215), ("propext", "Classical.choice", "Quot.sound")):
        real.text(112, y, name, size=14, anchor="middle", color="violet")
    real.arrow(112, 227, 112, 240, "violet", 1.6, head=5)
    real.box(112, 243, real.t("经典实数分析", "Classical real analysis"), "violet", w=194)

    assumption = custom.box(112, 103, custom.t("自定义 axiom", "Custom axiom"), "magenta", w=194, size=16)
    custom.rect(15, 150, 194, 62, color="magenta", fill="magenta", fill_opacity=0.10, rx=6)
    custom.arrow(*assumption.bottom, 112, 148, "magenta", 1.4, head=5)
    custom.text(112, 173, custom.t("边界遗漏 ⇒ False", "Missing guard ⇒ False"),
                size=13, anchor="middle", color="magenta")
    custom.text(112, 198, "axiom n : Nat",
                size=14, anchor="middle", color="magenta")
    custom.line(112, 212, 112, 224, "magenta", 1.5, dash="4 4")
    custom.cross(112, 232, color="magenta")
    custom.box(112, 243, custom.t("对 n 的匹配停滞", "Matching on n stalls"), "magenta", w=194)
