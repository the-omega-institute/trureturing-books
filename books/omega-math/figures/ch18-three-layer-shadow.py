"""The isolated constructive stack exports results to Mathlib through a one-way bridge."""

SIZE = (358, 500)
ALT = {
    "zh": "严格库 OmegaInit 与 OmegaMath 的选定导入闭包在空内核中重放。D5 消费模块在两端编译，"
          "成对声明行的 strict_omega.axioms 和 axioms 分别给出严格端与官方端公理。紫色单向桥把核心结果传到 Mathlib 实数。",
    "en": "Selected strict library closures replay in an empty kernel. D5 consumers build on both "
          "backends. Each paired declaration row gives strict_omega.axioms for the strict backend "
          "and axioms for the official backend. The violet bridge transports core results one way to the Mathlib reals.",
}


def draw(p):
    p.text(179, 26, p.t("三层架构 · 单向输运", "Three layers · one-way transport"),
           size=18, anchor="middle", weight=600)
    p.rect(28, 49, 302, 174, color="blue", fill="panel", rx=7)
    for y, name, detail in (
        (61, p.t("第 0 层 · OmegaInit", "Layer 0 · OmegaInit"),
         p.t("归纳基础", "Inductive foundation")),
        (136, p.t("第 1 层 · OmegaMath", "Layer 1 · OmegaMath"),
         p.t("构造数学", "Constructive mathematics")),
    ):
        p.rect(48, y, 262, 54, color="blue", fill="blue", fill_opacity=0.10, rx=6)
        p.text(179, y + 20, name, size=14, color="blue", anchor="middle")
        p.text(179, y + 44, detail, size=13, color="dim", anchor="middle")
    p.arrow(179, 116, 179, 133, "blue", 1.5, head=6)
    p.text(179, 214, p.t("选定导入闭包 · 空内核重放", "Selected closure · empty-kernel replay"),
           size=13, anchor="middle")
    p.rect(28, 231, 302, 60, color="edge", fill="panel", rx=7)
    p.text(179, 251, p.t("D5 · 双后端编译与对照", "D5 · paired builds and comparison"),
           size=14, anchor="middle")
    p.text(179, 273, p.t("严格端 / 官方端公理记录", "Strict and official axiom records"),
           size=13, anchor="middle", color="dim")

    p.arrow(179, 293, 179, 313, "violet", 1.7, head=7)
    p.rect(45, 318, 268, 59, color="violet", fill="violet", fill_opacity=0.10, rx=6)
    p.text(179, 339, "Π_{ℝ} · OmegaShadowBridge", size=14, color="violet", anchor="middle")
    p.text(179, 364, p.t("单向 · 冻结桥接定理", "One way · frozen bridge theorems"),
           size=13, color="dim", anchor="middle")
    p.arrow(179, 377, 179, 401, "violet", 1.7, head=7)
    p.box(179, 406, p.t("第 2 层 · Mathlib ℝ", "Layer 2 · Mathlib ℝ"), "violet",
          w=262, note=p.t("经典实数阴影", "Classical real shadow"))
