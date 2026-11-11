"""Shared drawing for the chapter 8 figures (not a figure itself).

A vertical cross-section of the Bloch ball (x to the right, z up), the binary entropy in nats, and
the one-qubit reservoir swap of example ex-one-qubit-reservoir-swap-erasure with its table.
"""

import math

LN2 = math.log(2)


def h(p):
    """Binary entropy in nats."""
    return -sum(q * math.log(q) for q in (p, 1 - p) if q > 0)


def disc(cv, cx, cy, R, *, labels=True):
    """Draw the cross-section of the Bloch ball; return the map (x, z) → canvas point."""
    cv.circle(cx, cy, R, color="dim", fill="cyan", width=1.4, fill_opacity=0.04)
    cv.line(cx - R - 6, cy, cx + R + 6, cy, "faint", 1.1, dash="3 3")
    cv.line(cx, cy + R + 6, cx, cy - R - 6, "faint", 1.1, dash="3 3")
    if labels:
        cv.text(cx, cy - R - 10, "|0⟩", size=13, color="dim", anchor="middle")
    return lambda x, z: (cx + R * x, cy - R * z)


def swap_row(p):
    """(−ΔS_sys, I, D, βQ) for a reservoir qubit with ground population p swapped with ½I."""
    ds = LN2 - h(p)
    d = -LN2 - 0.5 * math.log(p * (1 - p))
    bq = (p - 0.5) * math.log(p / (1 - p))
    assert abs(bq - (ds + 0 + d)) < 1e-12          # βQ = −ΔS_sys + I + D with I = 0
    return ds, 0.0, d, bq


# the chapter's table, rounded to four places: p → (−ΔS_sys, D, βQ)
SWAP_TABLE = {
    0.6: (0.0201, 0.0204, 0.0405),
    0.75: (0.1308, 0.1438, 0.2747),
    0.9: (0.3681, 0.5108, 0.8789),
    0.99: (0.6371, 1.6145, 2.2516),
    0.999: (0.6852, 2.7612, 3.4465),
}
for _p, (_ds, _d, _bq) in SWAP_TABLE.items():
    _r = swap_row(_p)
    assert abs(_r[0] - _ds) < 6e-5 and abs(_r[2] - _d) < 6e-5 and abs(_r[3] - _bq) < 6e-5, (_p, _r)
