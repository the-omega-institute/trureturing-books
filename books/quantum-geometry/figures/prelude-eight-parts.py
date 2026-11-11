"""八部是一架阶梯：每部各四章，一级比一级高。
The eight parts form a staircase: four chapters to each of the eight parts, each
step higher than the last.

The chapters of each part are read from zh/SUMMARY.md (_coda.parts); every bar spans its chapters on a
common axis of chapters 1–32 and stands one step above the previous part. The short names follow the
ladder in the prelude's reader's guide.
"""

from _coda import parts

SIZE = (480, 300)
ALT = {
    "zh": "八条横条排成一架向右上方升起的阶梯，最下面是第一部（点 → 线，第 1–4 章），往上依次是第二部（线 → 面，5–8）、"
          "第三部（面 → 球，9–12）、第四部（多球共振，13–16）、第五部（时空之球，17–20）、第六部（球外之球，21–24）、"
          "第七部（铸器与验证，25–28），最上面是第八部（贯通，29–32）。每条横条里写着它的章号范围，部名写在左边。",
    "en": "Eight bars form a staircase rising to the upper right. The lowest is Part I (point → line, chapters 1–4); above it "
          "come Part II (line → plane, 5–8), Part III (plane → sphere, 9–12), Part IV (entangled spheres, 13–16), Part V "
          "(spacetime sphere, 17–20), Part VI (beyond the sphere, 21–24), Part VII (construction, 25–28), and at the top "
          "Part VIII (synthesis, 29–32). Each bar carries its chapter range, with the part's name on the left.",
}

NAMES_ZH = ["点 → 线", "线 → 面", "面 → 球", "多球共振", "时空之球", "球外之球", "铸器与验证", "贯通"]
NAMES_EN = ["point → line", "line → plane", "plane → sphere", "entangled spheres", "spacetime sphere",
            "beyond the sphere", "construction", "synthesis"]
NUM_ZH = "一二三四五六七八"
NUM_EN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]


def draw(fig):
    groups = parts()
    assert [len(g) for g in groups] == [4] * 8
    x0, w = 166, 9.4                      # chapter c occupies [x0 + (c − 1) w, x0 + c w]
    base, step = 270, 30
    for k, g in enumerate(groups):
        y = base - (k + 1) * step
        xa, xb = x0 + (g[0] - 1) * w, x0 + g[-1] * w
        fig.rect(xa, y + 3, xb - xa, step - 6, color="line", fill="line", fill_opacity=0.16, width=1.3, rx=3)
        if len(g) >= 4:
            fig.text((xa + xb) / 2, y + step / 2, f"{g[0]}–{g[-1]}", size=12, color="line", anchor="middle", middle=True)
        else:                                                   # too narrow: write the range beside it
            fig.text(xa - 6, y + step / 2, f"{g[0]}–{g[-1]}", size=12, color="line", anchor="end", middle=True, halo=True)
        fig.line(4, y + step, xa, y + step, "faint", 1.0, dash="2 4")
        fig.text(4, y + step / 2, fig.t(f"第{NUM_ZH[k]}部　{NAMES_ZH[k]}", f"{NUM_EN[k]}  {NAMES_EN[k]}"),
                 size=13, color="ink", middle=True)
    fig.line(x0, base, x0 + 32 * w, base, "dim", 1.3)
    fig.text(x0 + 16 * w, base + 20, fig.t("第 1 至第 32 章", "chapters 1 to 32"), size=13, color="dim", anchor="middle")
