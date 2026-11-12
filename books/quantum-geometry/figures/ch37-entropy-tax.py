"""清醒的单步捏合税：被剪掉的相干质量与熵增都在 θ = π/4 处最大。
The waking tax of one pinching step: the discarded coherence mass and the entropy increase both peak
at θ = π/4.

The 2 × 2 example of §37.1: ρ̃ = U(θ)|0⟩⟨0|U(θ)† is pinched to diag(cos² θ, sin² θ). The magenta curve
is the discarded mass |ρ₀₁|² + |ρ₁₀|² = ½ sin² 2θ, computed from the matrices; the ink curve is the
entropy increase S(ρ(1)) − S(ρ(0)) = −cos² θ ln cos² θ − sin² θ ln sin² θ (both asserted in _ch37).
"""

import math

from _ch37 import coherence_mass, entropy_tax

SIZE = (460, 250)
ALT = {
    "zh": "横轴是旋转角 θ，从 0 到 π/2；纵轴从 0 到 0.75。品红的曲线是捏合剪掉的相干质量 ½ sin² 2θ，墨色的曲线是熵增 −cos² θ ln cos² θ − sin² θ ln sin² θ。"
          "两条曲线在 θ = 0 与 θ = π/2 处都是 0，在 θ = π/4 处同时到顶：相干质量 1/2，熵增 ln 2 ≈ 0.693。",
    "en": "The horizontal axis is the rotation angle θ from 0 to π/2; the vertical axis runs from 0 to 0.75. The magenta "
          "curve is the coherence mass ½ sin² 2θ that the pinching discards; the ink curve is the entropy increase "
          "−cos² θ ln cos² θ − sin² θ ln sin² θ. Both are 0 at θ = 0 and θ = π/2 and peak together at θ = π/4: the "
          "mass at 1/2, the entropy at ln 2 ≈ 0.693.",
}


def draw(fig):
    t = fig.t
    ax = fig.axes(52, 26, 380, 172, (0, math.pi / 2), (0, 0.75))
    q = math.pi / 4
    ax.grid(xs=[q], ys=[0.5, math.log(2)])
    ax.xaxis(ticks=[0, q, math.pi / 2], labels=["0", "π/4", "π/2"], label="θ", size=13)
    ax.yaxis(ticks=[0, 0.5, math.log(2)], labels=["0", "1/2", "ln 2"], size=13)
    ax.area([(x, coherence_mass(x)) for x in [i * math.pi / 2 / 160 for i in range(161)]], "area", fill_opacity=0.16)
    ax.plot(coherence_mass, color="area", width=2.4)
    ax.plot(entropy_tax, 1e-9, math.pi / 2 - 1e-9, color="ink", width=2.4)
    assert abs(coherence_mass(q) - 0.5) < 1e-12 and abs(entropy_tax(q) - math.log(2)) < 1e-12
    ax.points([(q, 0.5)], color="area", r=4.2, ring="bg")
    ax.points([(q, math.log(2))], color="ink", r=4.2, ring="bg")
    ax.text(1.15, entropy_tax(1.15), t("熵增", "entropy increase"), dx=10, dy=-2, size=14, color="ink", halo=True)
    q4 = math.pi / 4
    ax.text(q4, 0.25, t("剪掉的相干", "discarded coherence"), size=14, color="area", anchor="middle", halo=True)
    ax.text(q4, 0.13, "½ sin² 2θ", size=14, color="area", anchor="middle", halo=True)
