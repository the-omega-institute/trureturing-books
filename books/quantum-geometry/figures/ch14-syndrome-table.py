"""校验读出错了哪一位，读不出 α、β：|000⟩ 与 |111⟩ 出同一个错，亮同样的灯（第十四章 §Pauli 字与稳定子综合征）。
The checks read which bit flipped, never α or β: |000⟩ and |111⟩ with the same error light the same lamps
(chapter 14, Pauli words and stabilizer syndromes).

Rows are the errors I, X₁, X₂, X₃; each row shows the two damaged basis strings E|000⟩ and E|111⟩ and, beside
each, the two parity checks g₁ = Z₁Z₂ and g₂ = Z₂Z₃ (lit = −1). The syndromes are computed from the bits,
asserted equal for the two strings of a row and distinct across rows, and match the chapter's table.
"""

from _ch14 import ERRORS, NAMES, flip, syndrome

SIZE = (410, 300)
ALT = {
    "zh": "一张四行的表，行依次是错误 I、X₁、X₂、X₃。每行有两串三个比特：左边是 E|000⟩，右边是 E|111⟩，被翻的那一位描成品红；"
          "每串旁边各有两盏灯 g₁、g₂。I 那一行两串都是青色，四盏灯全暗；X₁ 那行两串旁都只亮 g₁；X₂ 那行两盏都亮；X₃ 那行只亮 g₂。"
          "同一行左右两串亮的灯完全一样。",
    "en": "A table of four rows for the errors I, X₁, X₂ and X₃. Each row has two strings of three bits, E|000⟩ on the left and "
          "E|111⟩ on the right, with the flipped bit outlined in magenta; beside each string are two lamps g₁ and g₂. In row I "
          "both strings are cyan and all lamps are dark; in row X₁ only g₁ lights beside both strings; in row X₂ both lamps "
          "light; in row X₃ only g₂ lights. Within a row the two strings light exactly the same lamps.",
}

TABLE = {"I": (1, 1), "X₁": (-1, 1), "X₂": (-1, -1), "X₃": (1, -1)}


def bits_and_lamps(fig, x, y, bits, err, code):
    c = 30
    for i, b in enumerate(bits):
        flipped = i in err
        role = "area" if flipped else ("line" if code else "edge")
        fig.rect(x + i * c, y, c - 4, c - 4, color=role, fill=role if (code or flipped) else None,
                 fill_opacity=0.18 if (code or flipped) else None, width=1.8 if flipped else 1.2, rx=3)
        fig.text(x + i * c + (c - 4) / 2, y + (c - 4) / 2, str(b), size=15, anchor="middle", middle=True,
                 color="area" if flipped else ("line" if code else "ink"))
    s = syndrome(bits)
    for k, v in enumerate(s):
        lx = x + 3 * c + 16 + k * 26
        ly = y + (c - 4) / 2
        if v < 0:
            fig.circle(lx, ly, 8.5, color="area", fill="area", fill_opacity=0.85, width=1.4)
        else:
            fig.circle(lx, ly, 8.5, color="dim", width=1.3)
    return s


def draw(fig):
    t = fig.t
    left, right = 66, 250
    top, row = 70, 54
    for x, head in ((left, "*E*|000⟩"), (right, "*E*|111⟩")):
        fig.text(x + 43, top - 26, head, size=14, color="dim", anchor="middle")
        fig.text(x + 3 * 30 + 16, top - 26, "*g*_{1}", size=13, color="dim", anchor="middle")
        fig.text(x + 3 * 30 + 42, top - 26, "*g*_{2}", size=13, color="dim", anchor="middle")
    seen = set()
    for r, (err, name) in enumerate(zip(ERRORS, NAMES)):
        y = top + r * row
        code = not err
        fig.text(left - 22, y + 13, name, size=15, color="area" if err else "line", anchor="end", middle=True, weight=600)
        s0 = bits_and_lamps(fig, left, y, flip((0, 0, 0), err), err, code)
        s1 = bits_and_lamps(fig, right, y, flip((1, 1, 1), err), err, code)
        assert s0 == s1 == TABLE[name]
        seen.add(s0)
        fig.text((left + 3 * 30 + 50 + right) / 2, y + 13, "=", size=16, color="dim", anchor="middle", middle=True)
    assert len(seen) == 4
    fig.text(SIZE[0] / 2, top + 4 * row + 12, t("同一行：左右亮的灯一样", "within a row: the same lamps on both sides"),
             size=13, color="dim", anchor="middle")
