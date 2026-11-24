"""The isolated constructive stack exports results to Mathlib through a one-way bridge."""

SIZE = (358, 460)
ALT = {
    "zh": "第 0 层 OmegaInit 有 10 个模块，第 1 层 OmegaMath 有 78 个模块；核心审计覆盖 2,211 条声明。"
          "D5 注册表含 14 个模块的 127 条零公理定理。第 2 层的单向桥接 Πℝ OmegaShadowBridge 用 11 条冻结定理"
          "把核心结果传到 Mathlib 实数。",
    "en": "Layer 0 OmegaInit has 10 modules and Layer 1 OmegaMath has 78. The core audit covers "
          "2,211 declarations. The D5 registry has 127 zero-axiom theorems in 14 modules. At Layer 2, "
          "the one-way bridge Πℝ OmegaShadowBridge transports core results to Mathlib reals through "
          "11 frozen theorems.",
}


def draw(p):
    p.text(179, 26, p.t("三层架构 · 单向输运", "Three layers · one-way transport"),
           size=18, anchor="middle", weight=600)
    p.rect(28, 49, 302, 210, color="blue", fill="panel", rx=7)
    for y, name, detail in (
        (61, p.t("第 0 层 · OmegaInit", "Layer 0 · OmegaInit"),
         p.t("10 模块 · 归纳基础", "10 modules · inductive foundation")),
        (136, p.t("第 1 层 · OmegaMath", "Layer 1 · OmegaMath"),
         p.t("78 模块 · 构造数学", "78 modules · constructive math")),
    ):
        p.rect(48, y, 262, 54, color="blue", fill="blue", fill_opacity=0.10, rx=6)
        p.text(179, y + 20, name, size=14, color="blue", anchor="middle")
        p.text(179, y + 44, detail, size=13, color="dim", anchor="middle")
    p.arrow(179, 116, 179, 133, "blue", 1.5, head=6)
    p.text(179, 211, p.t("module + prelude · 2,211 条声明", "module + prelude · 2,211 declarations"),
           size=14, anchor="middle")
    p.text(179, 239, p.t("D5 · 14 模块 · 127 条定理", "D5 · 14 modules · 127 theorems") + " · axioms: []",
           size=13, anchor="middle", color="blue")

    p.arrow(179, 260, 179, 288, "violet", 1.7, head=7)
    p.rect(45, 293, 268, 59, color="violet", fill="violet", fill_opacity=0.10, rx=6)
    p.text(179, 314, "Π_{ℝ} · OmegaShadowBridge", size=14, color="violet", anchor="middle")
    p.text(179, 339, p.t("单向 · 11 条冻结定理", "One way · 11 frozen theorems"),
           size=13, color="dim", anchor="middle")
    p.arrow(179, 352, 179, 376, "violet", 1.7, head=7)
    p.box(179, 381, p.t("第 2 层 · Mathlib ℝ", "Layer 2 · Mathlib ℝ"), "violet",
          w=262, note=p.t("经典实数阴影", "Classical real shadow"))
