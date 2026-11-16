"""第三十四章地图：同一纬圈上的点在极轴上只投下一个影子；看不见的那块面与它的法轴；黄金切片与它看不见的内部方向。
Chapter 34 at a glance: every point of a latitude circle casts one shadow on the polar axis; the
hidden plane and its normal axis; the golden slice and the internal direction it cannot see.

Panel I: the latitude circle at polar angle θ = 60°; v₁ (φ = 0, filled) and v₂(φ) for φ = 90°, 180°, 270°
(hollow) all project to the one point cos θ = 1/2 on the polar axis (asserted in _ch34). Panel II:
the equatorial disc e₁∧e₂ with the 90° turn of the octant holonomy, and its normal +e₃ where the
observer stands. Panel III: the golden cut-and-project scheme in the lattice plane Z² (b right, a
up): the amber slice E∥ along (φ, 1), the cyan window −φ⁻² ≤ a − b/φ ≤ φ⁻¹, and the magenta
projection along E⊥. Panels I and II are the chapter's worked example; Panel III is the lattice of
the chapter's proposition, read through the chapter's interpretive model (MODEL).
"""

from _ch34 import golden_slice, hidden_plane, shadow_sphere

SIZE = (740, 262)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一颗球，紫色竖轴上站着琥珀色的观察者 O；极角 θ = 60° 的品红纬圈上有一个实心点和三个空心圈，"
          "四条青色虚线都汇到竖轴上同一个青色点 cos θ。第二栏：同一颗球，赤道面是一块品红的圆盘，盘里一段品红弧从 e₁ 转到 e₂，标着 90°；"
          "琥珀色的观察者 O 站在圆盘的法轴顶端。第三栏：方格点阵上一条琥珀色的斜线 E∥，两侧是一条青色的窄带；带里的点是青色的，"
          "各自沿品红短线落到斜线上，品红虚线是与斜线垂直的内部方向 E⊥。",
    "en": "Three panels. Panel I: a sphere with the amber observer O on the violet vertical axis; on the magenta latitude "
          "circle at polar angle θ = 60° sit one filled dot and three hollow rings, and four cyan dashed lines all meet at the one cyan "
          "point cos θ on the axis. Panel II: the same sphere with the equatorial plane as a magenta disc; a magenta arc "
          "inside it turns from e₁ to e₂, marked 90°; the amber observer O stands at the top of the disc's normal axis. "
          "Panel III: a square lattice with an amber slanted line E∥ inside a narrow cyan strip; the points in the strip "
          "are cyan and drop along short magenta lines onto the line; the magenta dashed line is the internal direction "
          "E⊥, perpendicular to the slice.",
}


def title(p, zh, en):
    p.text(p.width / 2, 22, p.t(zh, en), size=14, weight=600, anchor="middle")


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 262, gap=16)

    title(one, "I　一圈纬线，一个影子", "I  one circle, one shadow")
    shadow_sphere(one, 118, 148, 88)

    title(two, "II　看不见的面，所站的轴", "II  the hidden plane, its axis")
    hidden_plane(two, 118, 148, 88)

    title(three, "III　黄金切片", "III  the golden slice")
    step = 26
    P, ea, eb, (ka, kb), acc = golden_slice(three, 118 - 3.5 * step, 222, step)
    x, y = P(*eb)
    three.text(x - 4, y - 10, "*E*_{∥}", size=14, color="now", weight=600, anchor="end")
    top = ka if ka[1] > kb[1] else kb
    x, y = P(*top)
    three.text(x + 8, y + 6, "*E*_{⊥}", size=14, color="magenta")
