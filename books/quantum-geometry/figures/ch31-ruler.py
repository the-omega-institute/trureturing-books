"""平视的尺子：ψ 与 φ 互相丈量，各自投到对方上的青色影子一样长，用不着外面的第 3 点 C。
The eye-level ruler: ψ and φ measure each other; each one's cyan shadow on the other has the same
length cos θ, and no outside third point C is needed.

A real plane slice through two unit vectors θ = 60° apart, drawn symmetric about the vertical so the
two shadows are mirror images: the shadow of φ on ψ and of ψ on φ both have length cos 60° = 1/2
(asserted in _ch31). The rank-one weight is the squared modulus of the same inner product read either
way, |⟨φ, ψ⟩|² = |⟨ψ, φ⟩|². The dim point C above, joined to both tips, is crossed out.
"""

from _ch31 import ruler

SIZE = (440, 330)
ALT = {
    "zh": "从同一点出发的两支墨色单位箭头 φ（左）与 ψ（右），夹角 θ。从 φ 的箭头尖垂直落到 ψ 上，"
          "得到一段青色的影子；从 ψ 的箭头尖落到 φ 上，得到另一段青色的影子，两段左右对称、一样长，都标着 cos θ。"
          "上方有一个灰色的点 C，用虚线连到两个箭头尖，被一个叉划掉。",
    "en": "Two ink unit arrows from one point, φ on the left and ψ on the right, at angle θ. Dropping "
          "perpendicularly from the tip of φ onto ψ gives one cyan shadow; dropping from the tip of ψ onto φ gives "
          "another. The two are mirror images, equally long, each labelled cos θ. Above, a grey point C joined to "
          "both tips by dashed lines is struck out with a cross.",
}


def draw(fig):
    t = fig.t
    ruler(fig, 220, 300, 196, 60.0)
    fig.text(238, 68, t("不需要第 3 点", "no third point needed"), size=13, color="dim", halo=True)
