"""同一文本、同一规则，只换读者的三格参数，固定意义就从 (F, F, F) 换成 (T, T, T)。
Same text, same rule: change only the reader's three slots, and the fixed meaning moves from
(F, F, F) to (T, T, T).

The two columns are baselineContext ((), false, false, false, ()) and alternateContext
((), true, true, true, ()) of the chapter's proposition; the bottom box of each is its fixed meaning
(readerAdmission, background, evaluationGoal). The fields shared by both columns are joined by a
dashed line.
"""

SIZE = (520, 330)
ALT = {
    "zh": "两列，各是一个解释语境的五个字段，自上而下：文本、读者准入、背景、评估目标、解释规则。"
          "两列的文本都是 ()，解释规则都是 ()，用虚线连起来表示相同；中间三格左列全是 F，右列全是 T。"
          "每列下方的箭头指向它的固定意义：左列 (F, F, F)，右列 (T, T, T)，两者之间写着 ≠。",
    "en": "Two columns, each the five fields of an interpretation context, from top to bottom: text, reader admission, "
          "background, evaluation goal, interpretation rule. Both texts are () and both rules are (), joined by dashed lines "
          "to show they are the same; the three middle slots are all F on the left and all T on the right. An arrow under "
          "each column points to its fixed meaning: (F, F, F) on the left, (T, T, T) on the right, with ≠ between them.",
}

FIELDS = [("文本", "text"), ("读者准入", "reader admission"), ("背景", "background"), ("评估目标", "evaluation goal"),
          ("解释规则", "rule")]
BASE = ((), False, False, False, ())
ALT_CTX = ((), True, True, True, ())


def fixed_meaning(ctx):
    return ctx[1], ctx[2], ctx[3]


def show(v):
    return "()" if v == () else ("T" if v else "F")


def draw(fig):
    t = fig.t
    assert BASE[0] == ALT_CTX[0] and BASE[4] == ALT_CTX[4]
    assert all(BASE[i] != ALT_CTX[i] for i in (1, 2, 3))
    mb, ma = fixed_meaning(BASE), fixed_meaning(ALT_CTX)
    assert mb == (False, False, False) and ma == (True, True, True) and mb != ma

    cols = [(250, t("基准语境", "baseline"), BASE), (410, t("备择语境", "alternate"), ALT_CTX)]
    top, h, bw = 50, 34, 104
    for cx, name, ctx in cols:
        fig.text(cx, 30, name, size=14, color="ink", weight=600, anchor="middle")
        for i, v in enumerate(ctx):
            y = top + i * (h + 6)
            varies = i in (1, 2, 3)
            fig.rect(cx - bw / 2, y, bw, h, color="ink" if varies else "edge", fill="panel", rx=5,
                     width=1.6 if varies else 1.2)
            fig.text(cx, y + h / 2, show(v), size=16 if varies else 14, color="ink" if varies else "dim",
                     anchor="middle", middle=True, weight=600 if varies else None, mono=not varies)
        yb = top + 5 * (h + 6) + 10
        fig.arrow(cx, yb - 12, cx, yb + 18, "dim", 1.4, head=7)
        m = fixed_meaning(ctx)
        fig.rect(cx - 60, yb + 22, 120, 38, color="ink", fill="panel", rx=6, width=1.8)
        fig.text(cx, yb + 41, "(" + ", ".join(show(v) for v in m) + ")", size=16, color="ink", weight=600,
                 anchor="middle", middle=True)
    for i in (0, 4):
        y = top + i * (h + 6) + h / 2
        fig.line(250 + bw / 2 + 4, y, 410 - bw / 2 - 4, y, "dim", 1.3, dash="4 3")
        fig.text(330, y - 6, t("相同", "same"), size=13, color="dim", anchor="middle")
    yb = top + 5 * (h + 6) + 10
    fig.text(330, yb + 41, "≠", size=22, color="ink", weight=600, anchor="middle", middle=True)
    for i, (zh, en) in enumerate(FIELDS):
        y = top + i * (h + 6) + h / 2
        fig.text(250 - bw / 2 - 12, y, t(zh, en), size=13, color="dim", anchor="end", middle=True)
    fig.text(250 - bw / 2 - 12, yb + 41, t("固定意义", "fixed meaning"), size=13, color="dim", anchor="end", middle=True)
