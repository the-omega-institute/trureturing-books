"""近似克隆的代价：每个克隆体缩到 2/3，机器比特反向带走 1/3（第十四章 §不可克隆，Bužek–Hillery 例）。
The price of approximate cloning: each clone shrinks to 2/3 and the machine qubit carries −1/3 (chapter 14,
no cloning, the Bužek–Hillery example).

The three-qubit output of the Bužek–Hillery isometry is built for an input at 35° in the x–z plane; partial
traces give the Bloch vectors of a clone and of the machine, asserted to be (2/3) r and −(1/3) r.
The isometry is a literature result, not formalized in this book.
"""

import math

SIZE = (480, 310)
ALT = {
    "zh": "布洛赫球的一个截面。琥珀色的点是球皮上的输入 r，一条琥珀色虚线把它连到球心；青色的粗箭头沿同一方向只到 2/3，标着“克隆体 ×2”；"
          "品红的箭头朝反方向，长 1/3，标着“机器”。一圈青色虚线是半径 2/3 的圆。",
    "en": "A cross-section of the Bloch ball. The amber point on the shell is the input r, joined to the centre by an amber "
          "dashed line; a thick cyan "
          "arrow along the same direction stops at 2/3 and is labelled clone ×2; a magenta arrow points the opposite way with "
          "length 1/3 and is labelled machine. A cyan dashed circle has radius 2/3.",
}


def ket(theta):
    """|ψ⟩ and |ψ⊥⟩ for Bloch angle θ in the x–z plane."""
    a, b = math.cos(theta / 2), math.sin(theta / 2)
    return (a, b), (-b, a)


def bloch_vectors(theta):
    psi, perp = ket(theta)
    out = [0.0] * 8                                       # index = 4·clone1 + 2·clone2 + machine
    for i in range(2):
        for j in range(2):
            for m in range(2):
                v = math.sqrt(2 / 3) * psi[i] * psi[j] * perp[m]
                v -= math.sqrt(1 / 3) * (psi[i] * perp[j] + perp[i] * psi[j]) / math.sqrt(2) * psi[m]
                out[4 * i + 2 * j + m] += v
    assert abs(sum(v * v for v in out) - 1) < 1e-12

    def reduced(slot):
        r = [[0.0, 0.0], [0.0, 0.0]]
        for a in range(8):
            for b in range(8):
                bits_a, bits_b = [(a >> 2) & 1, (a >> 1) & 1, a & 1], [(b >> 2) & 1, (b >> 1) & 1, b & 1]
                if all(bits_a[k] == bits_b[k] for k in range(3) if k != slot):
                    r[bits_a[slot]][bits_b[slot]] += out[a] * out[b]
        return (2 * r[0][1], r[0][0] - r[1][1])          # (x, z) Bloch components
    return reduced(0), reduced(2)


def draw(fig):
    t = fig.t
    theta = math.radians(35)
    r = (math.sin(theta), math.cos(theta))
    clone, machine = bloch_vectors(theta)
    assert all(abs(c - 2 / 3 * v) < 1e-12 for c, v in zip(clone, r))
    assert all(abs(m + 1 / 3 * v) < 1e-12 for m, v in zip(machine, r))

    cx, cy, R = 210, 160, 126
    fig.circle(cx, cy, R, color="dim", fill="cyan", fill_opacity=0.04, width=1.5)
    fig.circle(cx, cy, R * 2 / 3, color="line", width=1.2, dash="4 4")
    fig.line(cx - R - 10, cy, cx + R + 10, cy, "faint", 1.0)
    fig.line(cx, cy - R - 10, cx, cy + R + 10, "faint", 1.0)

    def P(v, s=1.0):
        return cx + R * s * v[0], cy - R * s * v[1]

    tip, two3, m = P(r), P(clone), P(machine)
    fig.line(cx, cy, *tip, "now", 1.6, dash="5 4")
    fig.dot(*tip, 6.0, "now", ring="bg")
    fig.arrow(cx, cy, *two3, "line", 4.4, head=14)
    fig.arrow(cx, cy, *m, "area", 3.4, head=12)
    fig.dot(cx, cy, 3.2, "dim")

    fig.text(tip[0] + 10, tip[1] + 2, t("输入 *r*", "input *r*"), size=14, color="now")
    # above and to the left of the arrow head, between the dashed 2/3 circle and the shell, clear of the amber line
    fig.text(two3[0] - 12, two3[1] - 21, t("克隆体 ×2：2/3", "clone ×2: 2/3"), size=14, color="line", anchor="end", halo=True)
    fig.text(m[0] - 10, m[1] + 18, t("机器：−1/3", "machine: −1/3"), size=14, color="area", anchor="end", halo=True)
