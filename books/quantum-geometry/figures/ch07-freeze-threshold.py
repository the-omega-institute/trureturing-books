"""记账余量为正，当且仅当 β 越过 β_c = ΔS/ΔE_pass（第七章 §7.4，定理 thm-decoherence-freeze-critical）。
The deposit is positive exactly when β passes β_c = ΔS/ΔE_pass (chapter 7, §7.4).

The (β, ΔS) plane at fixed ΔE_pass = 1: the line ΔS = β·ΔE_pass is where D_freeze = 0; below it the
deposit is positive, above it negative (checked at sample points). A horizontal walk at ΔS = ½ crosses
the line at β_c = ½.
"""

from _ch07 import freeze_deposit

SIZE = (440, 300)
ALT = {
    "zh": "横轴是逆温度 β，纵轴是熵税 ΔS，被动能量 ΔE_pass 固定为 1。一条斜线 ΔS = β·ΔE_pass 把平面分成两块："
          "斜线下方是青色的 D > 0，上方是品红的 D < 0。一条琥珀色的水平虚线停在 ΔS = ½ 的高度，在 β_c = ½ 处穿过斜线，"
          "右边进入青色区。",
    "en": "The horizontal axis is the inverse temperature β and the vertical axis the entropy tax ΔS, with the passive energy "
          "ΔE_pass fixed at 1. The line ΔS = β·ΔE_pass splits the plane: below it is cyan, D > 0; above it magenta, D < 0. "
          "An amber dashed horizontal line at height ΔS = ½ crosses the line at β_c = ½ and enters the cyan region to the "
          "right.",
}


def draw(fig):
    t = fig.t
    de = 1.0
    x0, x1, y0, y1 = 0.0, 2.0, -0.6, 1.6
    ax = fig.axes(64, 26, 340, 220, (x0, x1), (y0, y1))
    # D = 0 on ΔS = β·ΔE_pass; check the sign on both sides
    for b, s in ((1.5, 0.2), (0.3, 1.2), (1.0, -0.4)):
        d = freeze_deposit(b, s, de)
        assert (d > 0) == (s < b * de)
    top = y1 / de
    assert top < x1                                   # the line leaves through the top edge
    ax.cv.polygon([ax.pt(x0, y0), ax.pt(x1, y0), ax.pt(x1, y1), ax.pt(top, y1), ax.pt(x0, 0)], "line", fill_opacity=0.18)
    ax.cv.polygon([ax.pt(x0, 0), ax.pt(top, y1), ax.pt(x0, y1)], "area", fill_opacity=0.18)
    ax.hline(0, "dim", 1.2)
    ax.xaxis(at=y0, ticks=[0, 0.5, 1, 1.5, 2], labels=["0", "*β*_{c}", "1", "1.5", "2"], size=13,
             label=t("逆温度 *β*", "inverse temperature *β*"))
    ax.yaxis(ticks=[0, 0.5, 1, 1.5], labels=["0", "½", "1", "1.5"], size=13)
    ax.path([(x0, 0), (top, y1)], "ink", 2.4)
    ds = 0.5
    bc = ds / de
    assert abs(freeze_deposit(bc, ds, de)) < 1e-12
    ax.path([(0.02, ds), (x1, ds)], "now", 2.0, dash="6 4")
    ax.cv.arrow_head(ax.X(x1), ax.Y(ds), 0, "now", head=9)
    ax.points([(bc, ds)], color="now", r=5.4, ring="bg")
    ax.vline(bc, "dim", 1.1, dash="3 3")
    ax.text(1.5, 0.15, "*D* > 0", dy=0, size=15, color="line", anchor="middle", weight=600)
    ax.text(0.32, 1.25, "*D* < 0", size=15, color="area", anchor="middle", weight=600)
    ax.text(1.1, 1.1, "Δ*S* = *β*·Δ*E*_{pass}", dx=12, dy=8, size=14, color="ink", halo=True)
    ax.text(x1, ds, "Δ*S* = ½", dx=-4, dy=-10, size=13, color="now", anchor="end")
    fig.text(ax.x + 6, ax.y + 14, "Δ*S*", size=13, color="dim")
