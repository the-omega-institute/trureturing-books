"""观察者记忆指针的五段式解剖：一枚寄存器分成五段，每段旁画出它在寻址时做的那件事。
The five-part anatomy of the observer's memory pointer: one register in five fields, each beside a sketch
of what it does when addressing.

The five fields follow the chapter's table rem-ch38-pointer-hardware-anatomy-table in order: Base,
MMU bounds, the superposed pointer, the TLB, and the shared borrow &State. Schematic (MODEL); only
field 5 rests on a cited theorem (no cloning), which the caption points to.
"""

SIZE = (460, 372)
ALT = {
    "zh": "左边一枚竖放的指针寄存器，分成五段：1 Base，2 MMU 边界，3 叠加指针 Σ α_k |addr_k⟩，4 TLB，5 &State。每段右边一幅小图和一句话。"
          "第 1 段：一片格点和一支写着 u 的箭头，从格点角上移到一个偏移的原点，旁注“第一人称原点”。"
          "第 2 段：一排小格，中间三格被框住，一支伸出框外的箭头被划掉，旁注“清醒五感沙箱”。"
          "第 3 段：一个点同时发出三支青色箭头指向三格，旁注“梦中多路寻址”。"
          "第 4 段：一排点之间有灰色虚线的小跳，上方一条青色弧线从头直达末尾，旁注“学会的捷径”。"
          "第 5 段：两支青色箭头指向同一页，旁边一张虚线复印页被划掉，旁注“共指一页，不许复印”。",
    "en": "On the left, a pointer register standing upright, cut into five fields: 1 Base, 2 MMU bounds, 3 the superposed "
          "pointer Σ α_k |addr_k⟩, 4 TLB, 5 &State. To the right of each field, a small sketch and a phrase. Field 1: a "
          "patch of lattice points and an arrow marked u moving from the corner of the lattice to a shifted origin, "
          "'first-person origin'. Field 2: a row of cells with three in the middle boxed in; an arrow leaving the box is "
          "struck out, 'waking sandbox'. Field 3: one point sends three cyan arrows to three cells at once, 'dream: "
          "many paths'. Field 4: a row of points joined by small grey dashed hops, with one cyan arc going straight "
          "from the first to the last, 'a learned shortcut'. Field 5: two cyan arrows point at one page; beside it a "
          "dashed copy of the page is struck out, 'one page, no copies'.",
}

FIELDS = [
    ("Base", ("第一人称原点", "first-person origin")),
    ("MMU Bounds", ("清醒五感沙箱", "waking sandbox")),
    ("Σ α_{k}|addr_{k}⟩", ("梦中多路寻址", "dream: many paths")),
    ("TLB", ("学会的捷径", "a learned shortcut")),
    ("&State", ("共指一页，不许复印", "one page, no copies")),
]
assert len(FIELDS) == 5          # the five-part anatomy

TOP, BAND = 20, 66
RX, RW = 16, 150
IX = 186      # sketch area x
GX = 322      # phrase x


def base(fig, cy):
    for i in range(5):
        for j in range(3):
            fig.dot(IX + 8 + i * 16, cy - 16 + j * 16, 1.9, "faint")
    fig.arrow(IX + 8, cy + 16, IX + 66, cy - 6, "ink", 1.8, head=7)
    fig.dot(IX + 70, cy - 8, 3.6, "ink", ring="bg")
    fig.text(IX + 36, cy + 22, "*u*", size=14, color="ink", italic=True)


def bounds(fig, cy):
    w = 18
    for i in range(6):
        fig.rect(IX + i * w, cy - 9, w - 2, 18, color="edge", fill="panel", width=1.0, rx=2)
    fig.rect(IX + w - 3, cy - 13, 3 * w + 4, 26, color="ink", width=1.8, rx=3)
    fig.arrow(IX + 3 * w + 8, cy, IX + 6 * w + 2, cy, "dim", 1.6, head=7)
    fig.cross(IX + 5 * w + 4, cy, 7, "dim", 1.8)


def superpose(fig, cy):
    x0 = IX + 8
    fig.dot(x0, cy, 4.0, "ink", ring="bg")
    for k, dy in enumerate((-22, 0, 22)):
        fig.rect(IX + 90, cy + dy - 8, 20, 16, color="edge", fill="panel", width=1.0, rx=2)
        fig.arrow(x0 + 5, cy + dy * 0.15, IX + 87, cy + dy, "line", 1.8, head=7)


def tlb(fig, cy):
    xs = [IX + 8 + 26 * i for i in range(5)]
    y = cy + 12
    for a, b in zip(xs, xs[1:]):
        fig.path(f"M{a} {y} Q{(a + b) / 2} {y - 14} {b} {y}", "dim", 1.3, dash="3 3")
    for x in xs:
        fig.dot(x, y, 3.0, "dim")
    fig.path(f"M{xs[0]} {y} C{xs[0] + 20} {cy - 34} {xs[-1] - 20} {cy - 34} {xs[-1]} {y - 4}", "line", 2.2)
    fig.arrow_head(xs[-1], y - 3, -62, "line", head=8)


def share(fig, cy):
    fig.rect(IX + 26, cy - 24, 40, 26, color="ink", fill="panel", width=1.5, rx=3)
    for x in (IX + 10, IX + 82):
        fig.arrow(x, cy + 22, IX + 46 + (x - IX - 46) * 0.3, cy + 4, "line", 1.8, head=7)
    fig.rect(IX + 96, cy - 22, 26, 22, color="dim", width=1.2, rx=3, dash="3 3")
    fig.cross(IX + 109, cy - 11, 8, "dim", 1.6)


SKETCH = [base, bounds, superpose, tlb, share]


def draw(fig):
    for k, (name, gloss) in enumerate(FIELDS):
        y = TOP + k * BAND
        cy = y + BAND / 2
        fig.rect(RX, y, RW, BAND, color="edge", fill="panel", width=1.2)
        fig.text(RX + 12, cy, str(k + 1), size=14, color="dim", middle=True, weight=600)
        fig.text(RX + 32, cy, name, size=14, color="ink", middle=True, mono=k != 2, weight=600)
        SKETCH[k](fig, cy)
        fig.text(GX, cy, fig.t(*gloss), size=13, color="dim", middle=True)
        if k:
            fig.line(IX - 6, y, 452, y, "faint", 1.0, dash="2 4")
    fig.rect(RX, TOP, RW, 5 * BAND, color="ink", width=1.8, rx=3)
    fig.text(RX + RW / 2, TOP + 5 * BAND + 18, "ptr", size=14, color="ink", anchor="middle", mono=True, weight=600)
