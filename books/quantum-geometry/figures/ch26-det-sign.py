"""迹为 1 时，行列式 (1 − |r|²)/4 的符号告诉你箭头在哪：球面上为 0，球内为正，球外为负，所以正半定的都在球里（第二十六章 §正半定球界）。
With trace 1 the determinant (1 − |r|²)/4 tells where the arrow ends: zero on the shell, positive inside,
negative outside, so every positive semidefinite matrix lies in the ball (chapter 26, the PSD ball bound).

The x–z cross-section of the ball. For three points the script builds blochMatrix(1, r), computes its
determinant directly and checks it against (1 − |r|²)/4 (the identity `he` of the proof of
norm_bloch_le_trace_of_posSemidef); the disc and the shell are the two cited theorems, so they are green.
"""

import math

SIZE = (500, 330)
ALT = {
    "zh": "布洛赫球的 x–z 截面：绿色的圆盘与绿色的圆周。圆周上一个琥珀色的点，旁注 det = 0（纯态）；圆盘里一个墨色的点，|r| = 0.5，"
          "旁注 det = 0.19 > 0；圆外一个品红的点，|r| = 1.3，旁注 det = −0.17 < 0，不是正半定。右边写着：迹为 1 时 det = (1 − |r|²)/4。",
    "en": "The x–z cross-section of the Bloch ball: a green disc and a green circle. An amber point on the circle is marked "
          "det = 0 (pure); a dark point inside, |r| = 0.5, is marked det = 0.19 > 0; a magenta point outside, |r| = 1.3, is "
          "marked det = −0.17 < 0, not positive semidefinite. On the right: with trace 1, det = (1 − |r|²)/4.",
}


def bloch_matrix(a, r):
    return [[complex((a + r[2]) / 2), complex(r[0], -r[1]) / 2], [complex(r[0], r[1]) / 2, complex((a - r[2]) / 2)]]


def det(M):
    return (M[0][0] * M[1][1] - M[0][1] * M[1][0]).real


def draw(fig):
    t = fig.t
    cx, cy, R = 160, 170, 118
    P = lambda x, z: (cx + R * x, cy - R * z)
    pts = {
        "pure": (math.cos(math.radians(125)), math.sin(math.radians(125))),
        "mixed": (0.5 * math.cos(math.radians(250)), 0.5 * math.sin(math.radians(250))),
        "out": (1.3 * math.cos(math.radians(-40)), 1.3 * math.sin(math.radians(-40))),
    }
    dets = {}
    for k, (x, z) in pts.items():
        r2 = x * x + z * z
        d = det(bloch_matrix(1.0, (x, 0.0, z)))
        assert abs(d - (1 - r2) / 4) < 1e-12
        dets[k] = d
    assert abs(dets["pure"]) < 1e-12 and dets["mixed"] > 0 and dets["out"] < 0
    assert f"{dets['mixed']:.2f}" == "0.19" and f"{dets['out']:.2f}" == "-0.17"

    fig.line(cx - R * 1.45, cy, cx + R * 1.45, cy, "faint", 1.1, dash="3 4")
    fig.line(cx, cy + R * 1.2, cx, cy - R * 1.2, "faint", 1.1, dash="3 4")
    fig.circle(cx, cy, R, color="lean", fill="lean", width=2.4, fill_opacity=0.12)
    fig.text(cx + R * 1.45 - 2, cy - 6, "*x*", size=14, color="dim", anchor="end")
    fig.text(cx + 6, cy - R * 1.2 + 10, "*z*", size=14, color="dim")

    for k, role, rad in (("pure", "now", 5.6), ("mixed", "ink", 5.0), ("out", "area", 5.6)):
        x, y = P(*pts[k])
        fig.line(cx, cy, x, y, role, 1.6, dash=None if k != "out" else "5 3")
        fig.dot(x, y, rad, role, ring="bg")
    x, y = P(*pts["pure"])
    fig.text(x, y - 14, t("det = 0　纯态", "det = 0  pure"), size=14, color="now", weight=600, anchor="middle", halo=True)
    x, y = P(*pts["mixed"])
    fig.text(x - 10, y + 4, "det = 0.19 > 0", size=14, color="ink", anchor="end", halo=True)
    x, y = P(*pts["out"])
    fig.text(x + 10, y + 4, "det = −0.17 < 0", size=14, color="area", weight=600, halo=True)
    fig.text(x + 10, y + 22, t("不是正半定", "not PSD"), size=14, color="area", halo=True)

    fig.text(340, 70, t("迹为 1 时", "with trace 1"), size=14, color="dim")
    fig.text(340, 94, "det = (1 − |*r*|^{2}) / 4", size=15, color="ink", weight=600)
    fig.text(340, 130, t("正半定 ⇒ |*r*| ≤ 1", "PSD ⇒ |*r*| ≤ 1"), size=14, color="lean", weight=600)
