"""Shared algebra and drawing for the appendix B figures (not a figure itself).

A basis blade is a bit mask: bit i says whether the i-th generator is a factor (the factors always in
increasing order). The product of two blades follows appendix B.2: the target is the XOR of the masks, the
sign is (−1) to the number of inversions — pairs i > j with bit i in the left mask and bit j in the right —
times the squares of the generators that meet (all +1 in Cl₃,₀; the metric of Cl₁,₃ otherwise).
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[3]
BOOK = ROOT / "books" / "quantum-geometry"


def inversions(a, b):
    n = 0
    i = 0
    while (a >> i):
        if (a >> i) & 1:
            n += bin(b & ((1 << i) - 1)).count("1")
        i += 1
    return n


def blade_mul(a, b, metric=(1, 1, 1)):
    """E_a E_b = sign · E_{a ⊕ b}; returns (sign, a ⊕ b)."""
    sign = -1 if inversions(a, b) % 2 else 1
    common = a & b
    for i, m in enumerate(metric):
        if (common >> i) & 1:
            sign *= m
    return sign, a ^ b


def grade(m):
    return bin(m).count("1")


# the eight blades of Cl₃,₀ in the order of the tables of appendix B (masks 0, 1, 2, 4, 3, 5, 6, 7)
ORDER = [0, 1, 2, 4, 3, 5, 6, 7]
NAME = {0: "1", 1: "*e*_{1}", 2: "*e*_{2}", 4: "*e*_{3}", 3: "*e*_{12}", 5: "*e*_{13}", 6: "*e*_{23}", 7: "*e*_{123}"}
TEX = {0: "1", 1: "e_1", 2: "e_2", 4: "e_3", 3: "e_{12}", 5: "e_{13}", 6: "e_{23}", 7: "e_{123}"}


def cayley_table_from_text(lang="zh"):
    """The 8 × 8 table of appendix B.2 as printed: {(a, b): (sign, mask)}."""
    text = (BOOK / lang / "appendix-b.md").read_text(encoding="utf-8")
    by_tex = {v: k for k, v in TEX.items()}
    out = {}
    rows = [r for r in text.splitlines() if re.match(r"^\| \*\*\$", r)][:8]
    assert len(rows) == 8
    for a, row in zip(ORDER, rows):
        cells = [c.strip() for c in row.strip("|").split("|")][1:]
        assert len(cells) == 8, row
        for b, cell in zip(ORDER, cells):
            m = re.fullmatch(r"\$([+-])(.+)\$", cell)
            assert m, cell
            out[(a, b)] = (1 if m.group(1) == "+" else -1, by_tex[m.group(2)])
    return out
