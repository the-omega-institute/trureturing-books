"""十部是一架阶梯：每一级横跨该部所含的章。
The ten parts form a staircase, with each step spanning the chapters in that part.

The chapters of each part are read from zh/SUMMARY.md (_coda.parts); every bar spans its chapters on a
common axis of chapters 1–39 and stands one step above the previous part. The short names follow the
ladder in the prelude's reader's guide.
"""

from _coda import parts

SIZE = (480, 320)
ALT = {
    "zh": "十条横条排成一架向右上方升起的阶梯，最下面是第一部（点 → 线，第 1–4 章），往上依次是第二部（线 → 面，5–8）、"
          "第三部（面 → 球，9–12）、第四部（多球共振，13–16）、第五部（时空之球，17–20）、第六部（球外之球，21–24）、"
          "第七部（立极，25–28）、第八部（造微与归弧，29–33）、第九部（互照与破执，34–37），最上面是第十部（不二与归元，38–39）。"
          "每条横条右侧写着它的章号范围，部名写在左边。",
    "en": "Ten bars form a staircase rising to the upper right. The lowest is Part I (point → line, chapters 1–4); above it "
          "come Part II (line → plane, 5–8), Part III (plane → sphere, 9–12), Part IV (entangled spheres, 13–16), Part V "
          "(spacetime sphere, 17–20), Part VI (beyond the sphere, 21–24), Part VII (foundations, 25–28), Part VIII "
          "(arcs and unification, 29–33), Part IX (mutual illumination, 34–37), and at the top Part X (non-duality, 38–39). Each bar "
          "has its chapter range to its right, with the part's name on the left.",
}

NAMES_ZH = ["点 → 线", "线 → 面", "面 → 球", "多球共振", "时空之球", "球外之球", "立极", "造微与归弧", "互照与破执", "不二与归元"]
NAMES_EN = ["point → line", "line → plane", "plane → sphere", "entangled spheres", "spacetime sphere",
            "beyond the sphere", "foundations", "arcs and unification", "mutual illumination", "non-duality"]
NUM_ZH = "一二三四五六七八九十"
NUM_EN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def draw(fig):
    groups = parts()
    assert len(groups) == len(NAMES_ZH) == len(NAMES_EN)
    assert [chapter for group in groups for chapter in group] == list(range(1, 40))
    x0, w = 168, 6.6                      # chapter c occupies [x0 + (c − 1) w, x0 + c w]
    base, step = 290, 28
    for k, g in enumerate(groups):
        y = base - (k + 1) * step
        xa, xb = x0 + (g[0] - 1) * w, x0 + g[-1] * w
        fig.rect(xa, y + 3, xb - xa, step - 6, color="line", fill="line", fill_opacity=0.16, width=1.3, rx=3)
        fig.text(xb + 6, y + step / 2, f"{g[0]}–{g[-1]}", size=14, color="line", middle=True)
        fig.line(4, y + step, xa, y + step, "faint", 1.0, dash="2 4")
        fig.text(4, y + step / 2, fig.t(f"第{NUM_ZH[k]}部　{NAMES_ZH[k]}", f"{NUM_EN[k]}  {NAMES_EN[k]}"),
                 size=14, color="ink", middle=True)
    fig.line(x0, base, x0 + 39 * w, base, "dim", 1.3)
    fig.text(x0 + 19.5 * w, base + 20, fig.t("第 1 至第 39 章", "chapters 1 to 39"), size=14, color="dim", anchor="middle")
