"""Shared computation for the chapter 14 figures (not a figure itself).

The three-qubit bit-flip code of the chapter's worked example: the embedding V|0⟩ = |000⟩, V|1⟩ = |111⟩,
the four errors E ∈ {I, X₁, X₂, X₃}, the rooms S_j = E_j V and the parity checks g₁ = Z₁Z₂, g₂ = Z₂Z₃.
Matrices are plain nested lists; everything a figure draws about the code is computed here.
"""

ERRORS = [(), (0,), (1,), (2,)]          # which bits each error flips
NAMES = ["I", "X₁", "X₂", "X₃"]


def flip(bits, err):
    return tuple(b ^ (1 if i in err else 0) for i, b in enumerate(bits))


def syndrome(bits):
    """(g₁, g₂) as ±1: each check is +1 when its two neighbouring bits agree."""
    return (1 if bits[0] == bits[1] else -1, 1 if bits[1] == bits[2] else -1)


def index(bits):
    return bits[0] * 4 + bits[1] * 2 + bits[2]


def room(err):
    """The 8 × 2 matrix S = E V."""
    s = [[0, 0] for _ in range(8)]
    for col, bits in enumerate(((0, 0, 0), (1, 1, 1))):
        s[index(flip(bits, err))][col] = 1
    return s


def mat(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]


def dag(a):
    return [[complex(a[j][i]).conjugate() for j in range(len(a))] for i in range(len(a[0]))]


def recover(sigma, rho):
    """syndromeDecoding(S, syndromeEncoding(S, σ, ρ)) for the four rooms of the code."""
    S = [room(e) for e in ERRORS]
    enc = [[0] * 8 for _ in range(8)]
    for j in range(4):
        for k in range(4):
            term = mat(mat(S[j], rho), dag(S[k]))
            for r in range(8):
                for c in range(8):
                    enc[r][c] += sigma[j][k] * term[r][c]
    out = [[0, 0], [0, 0]]
    for i in range(4):
        term = mat(mat(dag(S[i]), enc), S[i])
        for r in range(2):
            for c in range(2):
                out[r][c] += term[r][c]
    return out


def orthogonal():
    S = [room(e) for e in ERRORS]
    for i in range(4):
        for j in range(4):
            g = mat(dag(S[i]), S[j])
            want = [[1, 0], [0, 1]] if i == j else [[0, 0], [0, 0]]
            if any(abs(g[r][c] - want[r][c]) > 1e-12 for r in range(2) for c in range(2)):
                return False
    return True
