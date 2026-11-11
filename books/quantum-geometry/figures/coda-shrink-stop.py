"""每改一次至少少一个元素，所以改的次数不超过 |S(0)|，之后再也不动。
Every change removes at least one element, so there are at most |S(0)| changes, and after the last
one nothing moves.

X = {0, …, 7}, S(0) = {0, …, 6} and the update U(A) = A without its two largest elements when |A| > 4,
without its largest when |A| > 2, and A itself otherwise; U(A) ⊆ A always. The rows are S(0), S(1), …:
7, 5, 3, 2, 2, 2. The script iterates U and asserts N = 3 ≤ |S(0)| = 7 and that the changes number
3 ≤ 7 (the two bounds of the chapter's theorem, cited with lean=).
"""

SIZE = (480, 300)
ALT = {
    "zh": "六行点阵，自上而下是 S(0) 到 S(5)，每行有 8 个位置 0 到 7。S(0) 有 7 个青色的点；每往下一行，"
          "被这一步去掉的点画成品红的叉：S(1) 剩 5 个，S(2) 剩 3 个，S(3) 剩 2 个，此后各行不再变化。"
          "右边一列写着每行的元素个数 7、5、3、2、2、2；从第 3 行到最后一行旁有一个括号，写着“不再变”，下方绿色的框写着 N = 3 ≤ |S(0)| = 7。",
    "en": "Six rows of dots, S(0) to S(5) from top to bottom, each with eight places 0 to 7. S(0) has 7 cyan dots; in each "
          "next row the dots removed by that step are magenta crosses: S(1) keeps 5, S(2) keeps 3, S(3) keeps 2, and the "
          "rows after it no longer change. A column on the right gives the sizes 7, 5, 3, 2, 2, 2; a bracket "
          "from row 3 to the last row reads “no change”, and a green box below reads N = 3 ≤ |S(0)| = 7.",
}


def U(A):
    A = sorted(A)
    if len(A) > 4:
        return set(A[:-2])
    if len(A) > 2:
        return set(A[:-1])
    return set(A)


def draw(fig):
    t = fig.t
    S = [set(range(7))]
    for _ in range(5):
        nxt = U(S[-1])
        assert nxt <= S[-1]
        S.append(nxt)
    sizes = [len(s) for s in S]
    assert sizes == [7, 5, 3, 2, 2, 2]
    changes = [n for n in range(5) if S[n + 1] != S[n]]
    N = next(n for n in range(6) if all(S[m] == S[n] for m in range(n, 6)))
    assert N == 3 and N <= sizes[0] and len(changes) == 3 <= sizes[0]

    x0, dx, y0, dy = 78, 31, 54, 34
    for k in range(8):
        fig.text(x0 + k * dx, 26, str(k), size=13, color="dim", anchor="middle")
    fig.text(x0 + 8 * dx + 18, 26, "|*S*(*n*)|", size=13, color="dim", anchor="middle")
    for n, s in enumerate(S):
        y = y0 + n * dy
        fig.text(20, y, f"*S*({n})", size=14, color="dim", middle=True)
        prev = S[n - 1] if n else s
        for k in range(8):
            x = x0 + k * dx
            if k in s:
                fig.dot(x, y, 6, "line", ring="bg")
            elif k in prev:
                fig.cross(x, y, 6, "area", 2.0)
            else:
                fig.circle(x, y, 5, color="faint", width=1.1)
        fig.text(x0 + 8 * dx + 18, y, str(len(s)), size=14, color="line" if n <= N else "dim", weight=600,
                 anchor="middle", middle=True)
    yN = y0 + N * dy
    bx = x0 + 8 * dx + 40
    fig.brace(bx, yN - 10, bx, y0 + 5 * dy + 10, t("不再变", "no change"))
    fig.chip(fig.width / 2, 288, f"LEAN ✓  N = {N} ≤ |S(0)| = {sizes[0]}", "lean", size=13, anchor="middle")
