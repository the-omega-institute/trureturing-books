"""三种向内的更新都会停下，停在哪里却各不相同：停下不等于唯一，也不等于非空。
Three inward updates all stop, but at different places: stopping is neither uniqueness nor
non-emptiness.

All three start from S₀ = {0, 1, 2} and satisfy U(A) ⊆ A: "drop the largest element above 0" (the
chapter's example) stops at {0} after 2 changes; U(A) = A stops at once at {0, 1, 2}; U(A) = ∅
stops at ∅ after 1 change. Each row is iterated until two neighbours agree, and the number of
changes is checked against |S₀| = 3.
"""

import math

from _ch24 import set_capsule

SIZE = (420, 290)
ALT = {
    "zh": "三行，每行从同一个候选集 {0, 1, 2} 出发，向右每走一步作用一次更新，直到相邻两步相同为止，停下的那一格用青色框出。"
          "第一行“删去大于 0 的最大元”：{0, 1, 2}、{0, 1}、{0}，停在 {0}。第二行 U(A) = A：一开始就停在 {0, 1, 2}。"
          "第三行 U(A) = ∅：下一步就删空，停在空集。三行都在 3 步之内停下，停下的集合却各不相同，其中一个是空的。",
    "en": "Three rows, each starting from the same candidate set {0, 1, 2}; each step to the right applies the update once, "
          "until two neighbours agree, and the box where it stops is outlined in cyan. Row one, 'drop the largest element "
          "above 0': {0, 1, 2}, {0, 1}, {0}, stopping at {0}. Row two, U(A) = A: it stops at once at {0, 1, 2}. Row three, "
          "U(A) = ∅: the next step empties it, and it stops at the empty set. All three stop within 3 steps, at three "
          "different sets, one of them empty.",
}

RULES = [
    (("删去大于 0 的最大元", "drop the largest above 0"), lambda A: A - {max(A)} if max(A, default=0) > 0 else A),
    (("*U*(*A*) = *A*", "*U*(*A*) = *A*"), lambda A: A),
    (("*U*(*A*) = ∅", "*U*(*A*) = ∅"), lambda A: set()),
]


def run(U, S0):
    seq = [set(S0)]
    while True:
        nxt = U(seq[-1])
        assert nxt <= seq[-1]
        if nxt == seq[-1]:
            return seq
        seq.append(nxt)


def draw(fig):
    t = fig.t
    S0 = {0, 1, 2}
    rows = [run(U, S0) for _, U in RULES]
    assert [sorted(map(sorted, r), key=len, reverse=True) for r in rows] == [[[0, 1, 2], [0, 1], [0]], [[0, 1, 2]], [[0, 1, 2], []]]
    assert all(len(r) - 1 <= len(S0) for r in rows)

    x0, step = 18, 134
    ys = [84, 172, 260]
    for k in range(3):
        fig.text(x0 + k * step + 49, 24, f"*S*_{{{k}}}", size=14, color="dim", anchor="middle")
    for (name, _), seq, y in zip(RULES, rows, ys):
        fig.text(x0, y - 32, t(*name), size=14, color="ink")
        for k, s in enumerate(seq):
            last = k == len(seq) - 1
            x = x0 + k * step
            w = set_capsule(fig, x, y, s, r=13, gap=4, size=14, outline="line" if last else "dim")
            if not last:
                fig.arrow(x + w + 4, y, x + step - 4, y, "dim", 1.4, head=7)
            else:
                # a small loop: one more step lands on the same set
                lx, ly = x + w + 14, y
                pts = [(lx + 9 * math.cos(a / 10), ly - 9 * math.sin(a / 10))
                       for a in range(-28, 30)]
                fig.curve_arrow(pts, "line", 1.6, head=8)
