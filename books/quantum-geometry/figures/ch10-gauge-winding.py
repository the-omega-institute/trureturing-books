"""北极规范下的相位绕南极转满一圈，所以在南极定不下来：整颗球上挑不出一个处处连续的相位（第十章 §10.3）。
In the north gauge the phase turns once around the south pole, so it has no value there: no single continuous
choice of phase covers the whole sphere (chapter 10, §10.3).

The picture looks down on the southern cap, flattened onto the equatorial plane, with the south pole at the
centre. On two latitude circles (θ = 140° and θ = 165°) each dial shows the phase of ⟨1|ψ_N⟩ for the north-gauge
representative ψ_N = (cos θ/2, e^{iφ} sin θ/2); the script computes it with complex numbers and asserts that it
equals φ and turns by exactly 360° once around each circle. The Hopf obstruction itself is a literature result,
so the pole is marked violet (argued).
"""

import cmath
import math

SIZE = (460, 380)
ALT = {
    "zh": "从上往下看南半球，南极在中心，被一个紫色的虚线圈标出，旁注“南极：相位定不下来”。"
          "两圈纬线上各摆着一圈小表盘，外圈八个、内圈八个；每个表盘里青色的指针是北极规范下 ⟨1|ψ_N⟩ 的相位，"
          "沿着纬线走一圈，指针也跟着转满一圈，内圈虽然离南极更近，同样转满一圈。外侧一支灰色的弧箭头标出 φ 增加的方向。",
    "en": "The southern hemisphere seen from above, with the south pole at the centre, marked by a dashed violet ring and the note "
          "“south pole: no phase fits”. Two latitude circles carry small dials, eight on the outer and eight on the inner; the "
          "cyan hand in each dial is the phase of ⟨1|ψ_N⟩ in the north gauge. Going once round a circle, the hands turn once "
          "round as well, on the inner circle just as on the outer, although it is closer to the pole. A grey curved arrow "
          "outside marks the direction of increasing φ.",
}

RINGS = ((140, 128, 17), (165, 62, 13))      # polar angle θ, radius on the page, dial radius


def psi_north(theta, phi):
    t, p = math.radians(theta), math.radians(phi)
    return (math.cos(t / 2), cmath.exp(1j * p) * math.sin(t / 2))


def draw(fig):
    t = fig.t
    cx, cy = 222, 192

    fig.circle(cx, cy, RINGS[0][1], color="faint", width=1.1, dash="3 4")
    fig.circle(cx, cy, RINGS[1][1], color="faint", width=1.1, dash="3 4")
    for theta, rr, dr in RINGS:
        turned = 0.0
        prev = None
        for k in range(9):
            phi = 45 * k + 22.5
            hand = math.degrees(cmath.phase(psi_north(theta, phi)[1])) % 360
            assert abs((hand - phi) % 360) < 1e-9 or abs((hand - phi) % 360 - 360) < 1e-9
            if prev is not None:
                turned += (hand - prev + 180) % 360 - 180
            prev = hand
            if k == 8:
                break
            x = cx + rr * math.cos(math.radians(phi))
            y = cy - rr * math.sin(math.radians(phi))
            fig.circle(x, y, dr, color="dim", width=1.1, fill="bg")
            fig.dot(x, y, 1.6, "dim")
            hx = x + (dr - 3) * math.cos(math.radians(hand))
            hy = y - (dr - 3) * math.sin(math.radians(hand))
            fig.line(x, y, hx, hy, "line", 2.2, cap="round")
        assert abs(turned - 360) < 1e-9

    fig.circle(cx, cy, 10, color="argued", width=2.0, dash="3 2")
    fig.line(cx, cy + 12, cx, cy + 158, "argued", 1.1, dash="2 3")
    fig.text(cx, cy + 174, t("南极：相位定不下来", "south pole: no phase fits"), size=13, color="argued",
             anchor="middle", halo=True)

    pts = [(cx + 166 * math.cos(math.radians(a)), cy - 166 * math.sin(math.radians(a))) for a in range(20, 71, 2)]
    fig.curve_arrow(pts, "dim", 1.6, head=8)
    fig.text(pts[-1][0] + 8, pts[-1][1] - 2, t("φ 增加", "φ increases"), size=13, color="dim")
    fig.text(14, 24, t("指针：⟨1|ψ_{N}⟩ 的相位", "hand: the phase of ⟨1|ψ_{N}⟩"), size=13, color="line")
