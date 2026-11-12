"""CNOT 下界数的是导线上的奇偶标签：每个非零偶标签都要诞生一次，每次诞生都要一次奇复原来抵消。
The CNOT lower bound counts parity labels on the wires: every nonzero even label must be born once, and
every birth must be undone by an odd return.

Left, n = 1 (two qubits): CNOT(control 0, target 1), R_z on wire 1, CNOT(control 0, target 1). The wire labels
in F₂² are tracked gate by gate (wire 0 keeps z₀; wire 1 goes z₁ → z₀ ⊕ z₁ → z₁); the circuit matrix is checked
entry by entry to be a global phase times diag(e^{iθ_hard(x)}) with θ_hard = π/2 at 00 and 11 and 0 elsewhere,
using R_z(φ) = diag(e^{−iφ/2}, e^{iφ/2}) and φ = −π/2. Right, n = 2: the 2^{2n−1} − 1 = 7 nonzero even-weight
vectors of F₂⁴ (enumerated) that must all appear on a wire, and the 2n − 1 = 3 returns, adding to the bound
2^{2n−1} + 2n − 2 = 10 of the chapter's proposition. The right panel says nothing about whether 10 is reached.
"""

import cmath
import itertools
import math

SIZE = (716, 300)
WRAP = True
ALT = {
    "zh": "两栏。左栏：两比特电路，两根横线是导线 0 与 1，从左到右依次是一个 CNOT（控制在导线 0、目标在导线 1）、导线 1 上的 R_z、再一个 CNOT。"
          "每段导线上方写着它此刻的奇偶标签：导线 0 始终是青色的 z₀；导线 1 先是青色的 z₁，第一个 CNOT 之后变成品红的 z₀ ⊕ z₁，R_z 在它上面注入相位，第二个 CNOT 之后又回到青色的 z₁。"
          "第一个 CNOT 下标着“偶诞生”，第二个下标着“奇复原”，底下写着 1 + 1 = 2 个 CNOT。"
          "右栏：四比特时必须在导线上出现的 7 个非零偶奇偶标签，品红色，从 z₀ ⊕ z₁ 到 z₀ ⊕ z₁ ⊕ z₂ ⊕ z₃ 排成两列；下面写着至少 7 个偶输出加至少 3 次复原等于 10，旁边一枚绿色的 LEAN ✓ 标签。",
    "en": "Two panels. Left: a two-qubit circuit; two horizontal lines are wires 0 and 1, and from left to right come a CNOT "
          "(control on wire 0, target on wire 1), an R_z on wire 1, and another CNOT. Above each stretch of wire is its parity "
          "label at that moment: wire 0 stays cyan z₀; wire 1 starts as cyan z₁, becomes magenta z₀ ⊕ z₁ after the first "
          "CNOT, where R_z puts in its phase, and returns to cyan z₁ after the second. The first CNOT is marked “even birth”, "
          "the second “odd return”, and beneath: 1 + 1 = 2 CNOTs. Right: the 7 nonzero even parity labels that must appear "
          "on a wire for four qubits, in magenta, from z₀ ⊕ z₁ to z₀ ⊕ z₁ ⊕ z₂ ⊕ z₃ in two columns; below, at least 7 even "
          "outputs plus at least 3 returns make 10, with a green LEAN ✓ tag.",
}

SUB = "₀₁₂₃"


def label(v):
    """The parity z_{i} ⊕ … for a 0/1 vector v."""
    return " ⊕ ".join(f"z{SUB[i]}" for i, b in enumerate(v) if b)


def check_two_qubit_circuit():
    """Track the wire labels and multiply out the n = 1 circuit; return the labels after each gate."""
    labels = [(1, 0), (0, 1)]                                       # wire q carries e_q
    history = [list(labels)]
    cnot = lambda ls: [ls[0], tuple(a ^ b for a, b in zip(ls[1], ls[0]))]   # target 1 ⊕= control 0
    labels = cnot(labels); history.append(list(labels))
    assert sum(labels[1]) % 2 == 0                                 # an even label is born on wire 1
    labels = cnot(labels); history.append(list(labels))
    assert labels == [(1, 0), (0, 1)]                              # and returned: the label matrix is the identity again

    # the matrices, basis |z0 z1⟩ with z0 the high bit
    basis = list(itertools.product((0, 1), repeat=2))
    def perm(f):
        return [[1 if basis[r] == f(basis[c]) else 0 for c in range(4)] for r in range(4)]
    CX = perm(lambda z: (z[0], z[1] ^ z[0]))
    phi = -math.pi / 2
    RZ = [[(cmath.exp(-1j * phi / 2) if basis[r][1] == 0 else cmath.exp(1j * phi / 2)) if r == c else 0 for c in range(4)]
          for r in range(4)]
    mul = lambda A, B: [[sum(A[i][k] * B[k][j] for k in range(4)) for j in range(4)] for i in range(4)]
    U = mul(CX, mul(RZ, CX))
    theta = [math.pi / 2 if z in ((0, 0), (1, 1)) else 0.0 for z in basis]
    c = U[0][0] / cmath.exp(1j * theta[0])
    assert abs(abs(c) - 1) < 1e-12
    assert all(abs(U[r][s] - (c * cmath.exp(1j * theta[r]) if r == s else 0)) < 1e-12 for r in range(4) for s in range(4))
    return history


def draw(fig):
    t = fig.t
    left, right = fig.row([372, 328], 300, gap=16)
    hist = check_two_qubit_circuit()

    # ---- left: n = 1, birth and return
    left.text(left.width / 2, 22, t("两比特：诞生、注相、复原", "two qubits: birth, phase, return"), size=14, weight=600, anchor="middle")
    x0, x1 = 44, 356
    y = {0: 104, 1: 184}
    gx = [104, 200, 296]                                            # CNOT, R_z, CNOT
    for q in (0, 1):
        left.line(x0, y[q], x1, y[q], "dim", 1.8)
        left.text(x0 - 8, y[q], f"q{SUB[q]}", size=14, color="dim", anchor="end", middle=True)
    # the labels on each stretch of wire
    stretches = [(x0, gx[0], hist[0]), (gx[0], gx[2], hist[1]), (gx[2], x1, hist[2])]
    for a, b, ls in stretches:
        for q in (0, 1):
            v = ls[q]
            even = sum(v) % 2 == 0
            s = label(v)
            if q == 1 and even:
                left.line(a + 6, y[q], b - 6, y[q], "area", 4.0)
            left.text((a + b) / 2, y[q] - (30 if (q == 1 and even) else 12), s, size=14,
                      color="area" if even else "line", anchor="middle", weight=600 if even else 400)
    for gxx in (gx[0], gx[2]):
        left.line(gxx, y[0], gxx, y[1] + 13, "ink", 2.0)
        left.dot(gxx, y[0], 5, "ink")
        left.circle(gxx, y[1], 13, color="ink", fill="bg", width=2.0)
        left.line(gxx - 13, y[1], gxx + 13, y[1], "ink", 2.0)
    left.rect(gx[1] - 22, y[1] - 15, 44, 30, color="ink", fill="panel", width=1.8, rx=4)
    left.text(gx[1], y[1], "*R*_{*z*}", size=14, color="ink", anchor="middle", middle=True)
    left.text(gx[0], y[1] + 40, t("偶诞生", "even birth"), size=13, color="area", anchor="middle")
    left.text(gx[2], y[1] + 40, t("奇复原", "odd return"), size=13, color="line", anchor="middle")
    left.text(left.width / 2, 274, t("CNOT：1 + 1 = 2 = 2¹ + 2 − 2", "CNOTs: 1 + 1 = 2 = 2¹ + 2 − 2"), size=14, color="ink", anchor="middle")

    # ---- right: n = 2, the seven even labels and the count
    n = 2
    evens = [v for v in itertools.product((0, 1), repeat=2 * n) if any(v) and sum(v) % 2 == 0]
    evens.sort(key=lambda v: (sum(v), [-b for b in v]))
    assert len(evens) == 2 ** (2 * n - 1) - 1 == 7
    births, returns = 2 * n - 1, 2 * n - 1
    bound = len(evens) + returns
    assert bound == 2 ** (2 * n - 1) + 2 * n - 2 == 10 and births == 3
    right.text(right.width / 2, 22, t("四比特：7 个偶标签都要出现", "four qubits: all 7 even labels"), size=14, weight=600, anchor="middle")
    pairs, quad = evens[:6], evens[6]
    for k, v in enumerate(pairs):
        col, row = k // 3, k % 3
        right.text(28 + 150 * col, 66 + 30 * row, label(v), size=14, color="area")
    right.text(right.width / 2, 66 + 30 * 3, label(quad), size=14, color="area", anchor="middle")
    right.text(right.width / 2, 204, t("≥ 7 个偶输出 + ≥ 3 次复原 = 10", "≥ 7 even outputs + ≥ 3 returns = 10"), size=14, color="ink", anchor="middle")
    right.chip(right.width / 2, 250, "LEAN ✓  CNOT ≥ 2²ⁿ⁻¹ + 2n − 2", "lean", anchor="middle", size=13)
