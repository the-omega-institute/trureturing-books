"""Shared drawing for the chapter 13 figures (not a figure itself).

The two-qubit Pauli ledger: a 4 × 4 board whose rows are Alice's {I, X, Y, Z} and whose columns are
Bob's. The corner I ⊗ I is the scalar, the rest of the top row and of the left column are the local
lines (cyan), and the 3 × 3 block is the correlation sector (magenta). The coefficients
T_ij = Tr(ρ σ_i ⊗ σ_j) are computed here from 4 × 4 matrices, not typed in.
"""

import math

PAULI = {
    "I": ((1, 0), (0, 1)),
    "X": ((0, 1), (1, 0)),
    "Y": ((0, -1j), (1j, 0)),
    "Z": ((1, 0), (0, -1)),
}
NAMES = "IXYZ"


def kron(a, b):
    return [[a[i // 2][j // 2] * b[i % 2][j % 2] for j in range(4)] for i in range(4)]


def trace_with(rho, m):
    return sum(rho[i][k] * m[k][i] for i in range(4) for k in range(4))


def coefficients(rho):
    """{(p, q): Tr(ρ σ_p ⊗ σ_q)} for p, q in I, X, Y, Z, rounded to real numbers."""
    out = {}
    for p in NAMES:
        for q in NAMES:
            v = trace_with(rho, kron(PAULI[p], PAULI[q]))
            assert abs(v.imag if isinstance(v, complex) else 0) < 1e-12
            out[(p, q)] = round((v.real if isinstance(v, complex) else v), 12)
    return out


def bell_density():
    v = [1 / math.sqrt(2), 0, 0, 1 / math.sqrt(2)]
    return [[v[i] * v[j] for j in range(4)] for i in range(4)]


def classical_density():
    return [[0.5 if i == j and i in (0, 3) else 0 for j in range(4)] for i in range(4)]


def sector(p, q):
    if p == "I" and q == "I":
        return "scalar"
    if p == "I" or q == "I":
        return "local"
    return "corr"


def board(cv, x, y, cell, *, values=None, header=True, size=14):
    """Draw the 4 × 4 board with its top-left cell at (x, y); ``values`` writes a coefficient in a cell.

    Local cells are cyan, correlation cells magenta; with ``values`` a cell is filled only where the
    coefficient is non-zero, so an empty cell reads as 0."""
    for i, p in enumerate(NAMES):
        for j, q in enumerate(NAMES):
            cx, cy = x + j * cell, y + i * cell
            kind = sector(p, q)
            role = {"scalar": "dim", "local": "line", "corr": "area"}[kind]
            if values is None:
                filled = True
                op = 0.26 if kind != "scalar" else 0.12
            else:
                filled = abs(values[(p, q)]) > 1e-9
                op = 0.32 if kind != "scalar" else 0.12
            cv.rect(cx + 2, cy + 2, cell - 4, cell - 4, color=role, fill=role if filled else None,
                    fill_opacity=op if filled else None, width=1.3, rx=3)
            if values is not None and filled:
                v = values[(p, q)]
                s = "1" if kind == "scalar" else ("+1" if v > 0 else "−1")
                cv.text(cx + cell / 2, cy + cell / 2, s, size=size, color="ink" if kind == "scalar" else role,
                        anchor="middle", middle=True, weight=600)
    if header:
        for j, q in enumerate(NAMES):
            cv.text(x + j * cell + cell / 2, y - 9, q, size=13, color="dim", anchor="middle")
        for i, p in enumerate(NAMES):
            cv.text(x - 9, y + i * cell + cell / 2, p, size=13, color="dim", anchor="end", middle=True)
