"""Reversing two quaternion factors changes whether the unwinding step is divisible by five."""

SIZE = (704, 314)
WRAP = True
ALT = {
    "zh": "两条计算链的初始模方都是 25。XY 的右乘结果 (5,10,0,0) 四个分量均被 5 整除，"
          "转移到 (1,2,0,0)。YX 的右乘结果 (5,−6,0,−8) 在模 5 下有非零分量，闸门阻塞。",
    "en": "Both input states have squared norm 25. The XY product (5,10,0,0) is divisible by five "
          "in every coordinate and transitions to (1,2,0,0). The YX product (5,−6,0,−8) has nonzero "
          "coordinates modulo five and the gate is blocked.",
}


def multiply(a, b):
    w, x, y, z = a
    s, i, j, k = b
    return (
        w * s - x * i - y * j - z * k,
        w * i + x * s + y * k - z * j,
        w * j - x * k + y * s + z * i,
        w * k + x * j - y * i + z * s,
    )


def coordinates(q):
    return "(" + ", ".join(str(v).replace("-", "−") for v in q) + ")"


def draw(fig):
    left, right = fig.row([344, 344], 314)
    x, y = (1, 2, 0, 0), (1, 0, 2, 0)
    unwind = (y[0], *(-v for v in y[1:]))
    xy, yx = multiply(x, y), multiply(y, x)
    assert xy == (1, 2, 2, 4) and yx == (1, 2, 2, -4)
    assert multiply(xy, unwind) == (5, 10, 0, 0)
    assert multiply(yx, unwind) == (5, -6, 0, -8)

    for p, state, name in ((left, xy, "psiXY"), (right, yx, "psiYX")):
        norm = sum(v * v for v in state)
        product = multiply(state, unwind)
        residues = tuple(v % 5 for v in product)
        enabled = not any(residues)
        assert norm == 25 and enabled == (state == xy)
        color = "cyan" if enabled else "magenta"
        relation = "≡" if enabled else "≢"
        title = p.t("通过 · 整除转移", "Clean transition") if enabled else p.t("阻塞 · 闸门关闭", "Blocked gate")
        result = (p.t("除以 5 得 ", "Divide by 5 to get ") + coordinates(tuple(v // 5 for v in product))
                  if enabled else p.t("模 5 余数 ", "Residues mod 5 ") + coordinates(residues))

        steps = [
            (name + " = " + coordinates(state), f"normSq = {norm}", "ink"),
            ("× gateUnwindY", coordinates(unwind), "violet"),
            (coordinates(product), relation + " 0  (mod 5)", color),
            (title, result, color),
        ]
        for index, (heading, detail, role) in enumerate(steps):
            top = 10 + 75 * index
            p.rect(31, top, 282, 58, color=role, fill=role, fill_opacity=0.08, rx=6)
            p.text(172, top + 22, heading, size=15, color=role, anchor="middle", weight=600)
            p.text(172, top + 45, detail, size=15, color=role, anchor="middle")
            if index < len(steps) - 1:
                p.arrow(172, top + 59, 172, top + 74, "ink", 1.3, head=5)
