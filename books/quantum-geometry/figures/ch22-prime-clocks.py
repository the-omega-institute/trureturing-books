"""两只素数时钟差一点就对齐：时钟 2 走完第 12 圈回到十二点时，时钟 3 越过十二点 7.04°（第二十二章 §22.3）。
Two prime clocks almost line up: when clock 2 finishes its 12th turn and is back at twelve, clock 3 is 7.04°
past twelve (chapter 22, §22.3).

Clock p reads p^{-it} = e^{-it ln p}, so its hand turns clockwise through t ln p radians. At
t = 12 · 2π / ln 2 ≈ 108.78 clock 3 has turned 12 ln 3 / ln 2 ≈ 19.01955 times (checked against the text).
"""

import math

SIZE = (460, 262)
ALT = {
    "zh": "两只钟面并排。上方写着 t = 12 · 2π / ln 2 ≈ 108.78。左边的时钟 2 转了 12 圈，琥珀色的指针正指十二点。"
          "右边的时钟 3 转了 19.02 圈，琥珀色的指针刚越过十二点一点点，指针与十二点之间的小扇形涂成品红，标着 7.04°。",
    "en": "Two clock faces side by side, under the caption t = 12 · 2π / ln 2 ≈ 108.78. On the left, clock 2 has made 12 turns "
          "and its amber hand points straight at twelve. On the right, clock 3 has made 19.02 turns and its amber hand is just "
          "past twelve; the thin wedge between the hand and twelve is shaded magenta and labelled 7.04°.",
}


def face(fig, cx, cy, r, turns, label):
    fig.circle(cx, cy, r, color="dim", fill="panel", width=1.6)
    for h in range(12):
        a = math.radians(90 - 30 * h)
        inner = r - (12 if h == 0 else 7)
        fig.line(cx + inner * math.cos(a), cy - inner * math.sin(a), cx + r * math.cos(a), cy - r * math.sin(a),
                 "ink" if h == 0 else "faint", 2.6 if h == 0 else 1.3)
    past = (turns - math.floor(turns)) * 360            # clockwise from twelve
    if past > 1e-6:
        fig.arc(cx, cy, r - 2, 90 - past, 90, None, fill="area", fill_opacity=0.35)
        fig.arc(cx, cy, r + 8, 90 - past, 90, "area", 2.2)
    a = math.radians(90 - past)
    fig.arrow(cx, cy, cx + (r - 14) * math.cos(a), cy - (r - 14) * math.sin(a), "now", 3, head=11)
    fig.dot(cx, cy, 4, "now")
    fig.text(cx, cy + r + 28, label, size=14, anchor="middle")
    return past


def draw(fig):
    t = fig.t
    T = 12 * 2 * math.pi / math.log(2)
    n2 = T * math.log(2) / (2 * math.pi)
    n3 = T * math.log(3) / (2 * math.pi)
    assert abs(n2 - 12) < 1e-12 and round(n3, 5) == 19.01955 and round(T, 2) == 108.78
    assert abs(2 * math.pi / math.log(2) - 9.0647) < 1e-4 and abs(2 * math.pi / math.log(3) - 5.7192) < 1e-4
    fig.text(230, 24, "*t* = 12 · 2π / ln 2 ≈ 108.78", size=14, color="dim", anchor="middle")
    face(fig, 120, 130, 76, n2, t("时钟 2：12 圈", "clock 2: 12 turns"))
    past = face(fig, 340, 130, 76, n3, t("时钟 3：19.02 圈", "clock 3: 19.02 turns"))
    assert round(past, 2) == 7.04
    fig.text(352, 42, "7.04°", size=14, color="area", weight=600)
