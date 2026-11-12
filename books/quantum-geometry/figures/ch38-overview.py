"""第三十八章地图：指针扫过静止的阵列、众指针共指一页而不许复印、零号槽指回页目录自己。
Chapter 38 at a glance: a pointer sweeps a still array; many pointers share one page and none may
copy it; slot 0 of the page directory points back to the directory itself.

Panel I: a 7 × 5 memory array that never moves; the pointer register reads the amber cell now (*ptr)
along a cyan beam, and a dashed arrow steps it to the next cell (ptr++). Panel II: three pointers hold
shared borrows of one page; a copy of the page is struck out (no deep copy). Panel III: the page
directory P of the worked example (N = 4): slot 0 holds P's own address 0x1000 and loops back into P,
slots 1–3 lead to the leaf tables T₁–T₃. All schematic (MODEL), except the addresses, which _ch38 checks.
"""

from _ch38 import ADDR_P, MEM, N_SLOTS, bezier, cell, hexa, page_directory, title

SIZE = (740, 272)
WRAP = True
ALT = {
    "zh": "三栏。第一栏：一块七列五行的静止内存阵列，其中一格是琥珀色的当前格；下方的指针寄存器 ptr 发出一束青色的光落在这一格上，"
          "写着 *ptr；一支虚线箭头指向右边的下一格，写着 ptr++。第二栏：上方一张页面 &State，三支青色箭头从下面的 ptr_A、ptr_B、ptr_C "
          "同时指向它；旁边一张虚线画的复印页被划掉，写着 memcpy。第三栏：四格的页目录 P，零号槽里写着 0x1000，一支青色箭头从零号槽出发绕回 P 自己，"
          "旁边写着 p = *p；第 1、2、3 格各有一支箭头指向右边的叶页表 T₁、T₂、T₃。",
    "en": "Three panels. Panel I: a still memory array of seven columns and five rows, one cell amber, the current cell; "
          "below it the pointer register ptr sends a cyan beam onto that cell, marked *ptr, and a dashed arrow points to "
          "the next cell on the right, marked ptr++. Panel II: one page &State at the top, with three cyan arrows from "
          "ptr_A, ptr_B and ptr_C below all pointing at it; beside it a dashed copy of the page is struck out, marked "
          "memcpy. Panel III: a four-slot page directory P whose slot 0 holds 0x1000; a cyan arrow leaves slot 0 and "
          "loops back into P itself, marked p = *p; slots 1, 2 and 3 each send an arrow to the leaf tables T₁, T₂, T₃ "
          "on the right.",
}

COLS, ROWS = 7, 5
NOW = (3, 0)       # (column, row) of the cell being read


def draw(fig):
    one, two, three = fig.row([236, 236, 236], 272, gap=16)

    # ---- I: the array stays, the pointer moves
    title(one, "I　时间是 ptr++，观察是 *ptr", "I  time is ptr++, seeing is *ptr")
    cw, ch = 26, 22
    x0, y0 = (one.width - COLS * cw) / 2, 66
    for r in range(ROWS):
        for c in range(COLS):
            cell(one, x0 + c * cw + 1, y0 + r * ch + 1, cw - 2, ch - 2, now=(c, r) == NOW)
    nx, ny = x0 + NOW[0] * cw + cw / 2, y0 + NOW[1] * ch + ch / 2
    rx, ry, rw, rh = one.width / 2 - 34, 208, 68, 28
    one.rect(rx, ry, rw, rh, color="ink", fill="panel", width=1.6, rx=4)
    one.text(rx + rw / 2, ry + rh / 2, "ptr", size=15, color="ink", anchor="middle", middle=True, mono=True, weight=600)
    one.line(rx + rw / 2, ry, nx, ny + ch / 2 - 1, "line", 2.6, cap="round")
    one.text(nx + 10, ry - 12, "*ptr", size=14, color="now", mono=True, weight=600, halo=True)
    one.arrow(nx + 4, ny - ch / 2 - 6, nx + cw - 2, ny - ch / 2 - 6, "dim", 1.6, head=7, dash="3 3")
    one.text(nx + cw / 2, ny - ch / 2 - 12, "ptr++", size=13, color="dim", anchor="middle", mono=True, halo=True)
    one.text(one.width / 2, 262, one.t("阵列从不移动", "the array never moves"), size=13, color="dim", anchor="middle")

    # ---- II: shared borrows of one page, no deep copy
    title(two, "II　共指一页，不许复印", "II  one page, no copies")
    px, py, pw, ph = 52, 50, 92, 62
    two.rect(px, py, pw, ph, color="ink", fill="panel", width=1.6, rx=4)
    two.text(px + pw / 2, py + ph / 2, "&State", size=15, color="ink", anchor="middle", middle=True, mono=True, weight=600)
    # the struck-out copy
    qx = px + pw + 30
    two.rect(qx, py + 8, 50, ph - 16, color="dim", width=1.3, rx=4, dash="4 3")
    two.cross(qx + 25, py + ph / 2, 14, "dim", 2.0)
    two.text(qx + 25, py + ph + 10, "memcpy", size=13, color="dim", anchor="middle", mono=True)
    names = ["ptr_{A}", "ptr_{B}", "ptr_{C}"]
    bx = [42, 98, 154]
    for x, name in zip(bx, names):
        two.text(x, 222, name, size=14, color="ink", anchor="middle", mono=True)
        two.arrow(x, 204, px + pw / 2 + (x - 98) * 0.45, py + ph + 4, "line", 2.2, head=9)
    two.text(two.width / 2, 262, two.t("共享借用 &State", "shared borrow &State"), size=13, color="dim", anchor="middle")

    # ---- III: slot 0 points home
    title(three, "III　零号槽指回自己", "III  slot 0 points home")
    sx, sy, sw, sh = 66, 66, 76, 30
    centres = page_directory(three, sx, sy, sw, sh)
    three.text(sx + sw - 8, centres[0][1], hexa(MEM[ADDR_P][0]), size=13, color="line", anchor="end", middle=True,
               mono=True, weight=600)
    # loop from slot 0 out the left side and back into P's top
    loop = bezier((sx - 2, centres[0][1]), (sx - 54, centres[0][1] + 4), (sx - 34, sy - 46), (sx + 12, sy - 2))
    three.curve_arrow(loop, "line", 2.4, head=9)
    three.text(sx + sw / 2, 240, "p = *p", size=17, color="line", anchor="middle", mono=True, weight=700)
    # leaf tables
    tx = sx + sw + 44
    for i in range(1, N_SLOTS):
        cy = centres[i][1]
        three.arrow(sx + sw + 2, cy, tx - 3, cy, "dim", 1.5, head=7)
        three.rect(tx, cy - 11, 34, 22, color="edge", fill="panel", width=1.1, rx=2)
        three.text(tx + 17, cy, f"*T*_{{{i}}}", size=13, color="dim", anchor="middle", middle=True)
