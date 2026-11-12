"""Shared drawing and numbers for the chapter 38 figures (not a figure itself).

The chapter's hardware model is a still memory array read by a moving pointer: time is ptr++ and
observation is *ptr. The worked example of section 38.3 is a page directory P whose slot 0 holds
P's own base address, so that p = *p there; its addresses (N = 4, P at 0x1000, T₁ at 0x2000, the
data frame D₁,₂ at 0x9000) are reproduced and checked here.

Colours follow the chapter's lab page and the book: cyan for the addressing paths and what stays
inside, magenta for what leaves (coherence moved into the record, the slide to the 90° horizon),
amber only for the cell being read now.
"""

import math

# ---------------------------------------------------------------- the self-mapped page directory

N_SLOTS = 4
ADDR_P = 0x1000
ADDR_T = {i: 0x1000 + 0x1000 * i for i in range(1, N_SLOTS)}      # T₁ at 0x2000, …
ADDR_D12 = 0x9000

# memory: an address maps to a table (a list of N slots)
P = [ADDR_P] + [ADDR_T[i] for i in range(1, N_SLOTS)]
MEM = {ADDR_P: P}
for _i in range(1, N_SLOTS):
    MEM[ADDR_T[_i]] = [0x8000 + 0x1000 * _i + 0x100 * _j for _j in range(N_SLOTS)]
MEM[ADDR_T[1]][2] = ADDR_D12


def walk(b, idx):
    for i in idx:
        b = MEM[b][i]
    return b


assert ADDR_T[1] == 0x2000
assert walk(ADDR_P, [1, 2]) == 0x9000           # the table's first row
assert walk(ADDR_P, [0, 1]) == 0x2000           # second row: T₁ itself comes back as data
assert walk(ADDR_P, [0, 0]) == ADDR_P           # third row: p = *p
assert walk(ADDR_P, [0, 0, 0, 0]) == ADDR_P     # four loops through slot 0
assert MEM[ADDR_P][0] == ADDR_P


def hexa(v):
    return f"0x{v:04X}"


# ---------------------------------------------------------------- the discrete rapidity ladder

def sech(eta):
    return 2.0 / (math.exp(eta) + math.exp(-eta))


ETA0, DETA = 0.5, 0.3     # illustrative parameters, not taken from the text
for _k in range(0, 60):
    _e = ETA0 + _k * DETA
    assert abs(sech(_e) - 1 / math.cosh(_e)) < 1e-15
    assert 0 < sech(_e) <= 1


def title(p, zh, en, y=22):
    p.text(p.width / 2, y, p.t(zh, en), size=14, weight=600, anchor="middle")


def cell(cv, x, y, w, h, *, now=False, fill="panel"):
    if now:
        cv.rect(x, y, w, h, color="now", fill="now", fill_opacity=0.22, width=2.0, rx=2)
    else:
        cv.rect(x, y, w, h, color="edge", fill=fill, width=1.1, rx=2)


def page_directory(cv, x, y, w, h, *, label="P", label_dy=-10):
    """A page directory of N_SLOTS stacked slots; returns the slot centres."""
    cv.text(x + w / 2, y + label_dy, label, size=15, color="ink", anchor="middle", weight=700, italic=True)
    centres = []
    for i in range(N_SLOTS):
        cv.rect(x, y + i * h, w, h, color="edge", fill="panel", width=1.2)
        cv.text(x + 9, y + i * h + h / 2, str(i), size=13, color="dim", middle=True, mono=True)
        centres.append((x + w / 2, y + i * h + h / 2))
    cv.rect(x, y, w, N_SLOTS * h, color="ink", width=1.5)
    return centres


def bezier(p0, p1, p2, p3, n=36):
    out = []
    for k in range(n + 1):
        s = k / n
        a, b, c, d = (1 - s) ** 3, 3 * (1 - s) ** 2 * s, 3 * (1 - s) * s * s, s ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out
