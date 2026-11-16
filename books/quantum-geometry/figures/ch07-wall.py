"""两段各不超过 Eτ/ℏ 的路，加起来至少要跨过 90°（第七章 §7.2，定理 thm-fubini-study-record-time）。
Two legs, each at most Eτ/ℏ long, must together span at least 90° (chapter 7, §7.2).

Schematic: real unit state vectors on the unit sphere, where the Fubini–Study angle arccos|⟨x, y⟩| is
the arc length (all overlaps here are positive, asserted). m₀ and m₁ are orthogonal on the equator;
the anchor a sits above; the triangle inequality θ(a, m₀) + θ(a, m₁) ≥ θ(m₀, m₁) = π/2 is asserted.
"""

import math

from tbook import figkit

SIZE = (420, 330)
ALT = {
    "zh": "一个单位球。赤道上两点 m₀ 与 m₁ 相隔 90°，它们之间的赤道弧是品红的，标着 90°。上方一点 a 是琥珀色的锚点，"
          "从 a 到 m₀、从 a 到 m₁ 各有一段青色的大圆弧，每段标着 ≤ Eτ/ℏ。两段青色弧加起来比品红的 90° 弧长。",
    "en": "A unit sphere. Two points m₀ and m₁ on the equator are 90° apart, and the equatorial arc between them is magenta, "
          "labelled 90°. Above them sits the amber anchor a; a cyan great-circle arc runs from a to m₀ and another from a to "
          "m₁, each labelled ≤ Eτ/ℏ. The two cyan arcs together are longer than the magenta 90° arc.",
}


def ang(u, v):
    return math.acos(max(-1.0, min(1.0, figkit.dot3(u, v))))


def draw(fig):
    t = fig.t
    sp = fig.sphere(210, 156, 132, el=32)
    sp.outline(fill="cyan", fill_opacity=0.03)
    sp.great_circle((0, 0, 1), "faint", 1.2)
    m0 = figkit.sph(90, -20)
    m1 = figkit.sph(90, 70)
    a = figkit.sph(38, 30)
    assert abs(figkit.dot3(m0, m1)) < 1e-12                                   # ⟨m₀, m₁⟩ = 0
    assert figkit.dot3(a, m0) > 0 and figkit.dot3(a, m1) > 0                 # FS angle = arc length
    t0, t1 = ang(a, m0), ang(a, m1)
    assert t0 + t1 >= math.pi / 2 - 1e-12                                     # the triangle inequality
    sp.arc(m0, m1, "area", 4.0, cap="round")
    sp.arc(a, m0, "line", 2.6)
    sp.arc(a, m1, "line", 2.6)
    for v in (m0, m1):
        sp.dot(v, "ink", 5.0, ring="bg")
    sp.dot(a, "now", 6.0, ring="bg")
    sp.label(m0, "*m*_{0}", dx=-10, dy=20, size=16, anchor="end")
    sp.label(m1, "*m*_{1}", dx=12, dy=6, size=16)
    sp.label(a, "*a*", dx=0, dy=-14, size=16, color="now", anchor="middle")
    mid = figkit.slerp(m0, m1, 0.5)
    sp.label(mid, "90°", dx=0, dy=26, size=15, color="area", anchor="middle", halo=True)
    for v, dx, anchor in ((figkit.slerp(a, m0, 0.5), -12, "end"), (figkit.slerp(a, m1, 0.5), 12, "start")):
        sp.label(v, "≤ *Eτ*/ℏ", dx=dx, dy=0, size=14, color="line", anchor=anchor, halo=True)
    fig.text(210, 320, t("两段青色弧之和 ≥ 90°", "the two cyan arcs add up to ≥ 90°"), size=13, color="dim", anchor="middle")
