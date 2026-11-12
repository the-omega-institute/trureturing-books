"""Shared drawing for the chapter 35 figures (not a figure itself).

The chapter's numbers are computed here and checked: the self-referential angle θ* with cos θ* = θ*,
the two-anchor Gram determinant det G₂ = 1 − c², the logarithmic subjective time τ = k ln(t/t₀) and the
parity table of the worked example (n = 3, w = (1, 0, 1)).

Colours follow the chapter's lab page and the book: cyan for the one-dimensional persistence share
cos θ and for stored rows, magenta for the transverse share sin θ and for the Gram area, violet for
Row 0 (the rule that reads the table), amber only for the current query or the current candidate.
"""

import math


# ---------------------------------------------------------------- the self-referential angle

def dottie(x=1.0):
    for _ in range(300):
        x = math.cos(x)
    return x


THETA_STAR = dottie()
assert abs(math.cos(THETA_STAR) - THETA_STAR) < 1e-15
assert abs(math.degrees(THETA_STAR) - 42.35) < 5e-3  # the chapter's θ* ≈ 42.35°


# ---------------------------------------------------------------- the Gram corridor

def gram2(c):
    """det [[1, c], [c, 1]]."""
    return 1 - c * c


assert gram2(1) == 0 and gram2(-1) == 0 and gram2(0) == 1
for _c in (0.2, 0.5, 0.9):
    _t = math.acos(_c)
    assert abs(gram2(_c) - math.sin(_t) ** 2) < 1e-12  # the area of the unit parallelogram, squared


# ---------------------------------------------------------------- logarithmic subjective time

def tau(t, k=1.0, t0=1.0):
    return k * math.log(t / t0)


EARLY = tau(2) - tau(1)
LATE = tau(41) - tau(40)
assert abs(EARLY - 0.6931) < 5e-5 and abs(LATE - 0.0247) < 5e-5
RATIO = EARLY / LATE
assert abs(RATIO - 28) < 0.5  # "二者相差约 28 倍"


# ---------------------------------------------------------------- the parity table

N_BITS = 3
W = (1, 0, 1)


def parity(x, w=W):
    return sum(a * b for a, b in zip(x, w)) % 2


KEYS = [tuple((i >> (N_BITS - 1 - r)) & 1 for r in range(N_BITS)) for i in range(2 ** N_BITS)]
VALUES = [parity(x) for x in KEYS]
# the chapter's list: (000)↦0, (001)↦1, (010)↦0, (011)↦1, (100)↦1, (101)↦0, (110)↦1, (111)↦0
assert VALUES == [0, 1, 0, 1, 1, 0, 1, 0]
assert [parity(tuple(int(r == s) for r in range(N_BITS))) for s in range(N_BITS)] == list(W)
assert parity((1, 1, 1)) == 0
assert 2 ** 10 == 1024 and 1 + 10 == 11 and 1024 / 11 > 93  # "压缩逾 93 倍"


# ---------------------------------------------------------------- pieces

def table_rows(cv, x, y, cols, rows, cw, rh, *, rule_color="argued", gap=6, row_labels=True, pattern=None):
    """A stack of rows: Row 0 (the rule, violet) on top, then ``rows`` stored rows (cyan).
    ``pattern(r, j)`` gives the opacity of cell j in stored row r. Returns the y of each row's centre."""
    centres = []
    yy = y
    for r in range(rows + 1):
        if r == 0:
            cv.rect(x, yy, cols * cw, rh, color=rule_color, fill=rule_color, fill_opacity=0.22, width=1.6, rx=3)
        else:
            for j in range(cols):
                op = pattern(r, j) if pattern else 0.25
                cv.rect(x + j * cw, yy, cw, rh, color="cyan", fill="cyan", fill_opacity=op, width=1.1)
        if row_labels:
            cv.text(x - 8, yy + rh / 2, str(r), size=13, color=rule_color if r == 0 else "dim",
                    anchor="end", middle=True, weight=600 if r == 0 else None)
        centres.append(yy + rh / 2)
        yy += rh + (gap if r == 0 else 2)
    return centres
