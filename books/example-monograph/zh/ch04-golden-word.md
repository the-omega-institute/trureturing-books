# 第四章 黄金词与回归

[第一章](ch01-golden-deficit.md)把两个自然数的 Zeckendorf 数位相加，研究进位留下的亏量。本章换一个角度：把每个自然数最低的 Zeckendorf 数位依次排开，得到一个无穷的二字母词。它就是由一条替换规则生成的黄金词（[@prop-golden-word-zeckendorf]），而且长度为 $n$ 的不同片段恰有 $n+1$ 种（[@thm-factor-complexity]）。后两节分别讨论黄金比旋转的回归，以及亏量在素因子分解上的一个用处。

本章用到下面几个记号。

词
: 字母的有限或无穷序列。有限词 $u$ 的长度记作 $|u|$；字母从第 $0$ 个数起。

因子
: 无穷词中从某个位置起连续若干个字母组成的有限词。长度为 $0$ 的因子只有空词。

$\mathrm{zeck}(i)$
: 自然数 $i$ 的 Zeckendorf 表示所用的 Fibonacci 下标，从大到小排列，即 Lean 中的 `wdigits i`（mathlib 的 `Nat.zeckendorf i`）。下标沿用 mathlib 的约定 $F_0 = 0$、$F_1 = F_2 = 1$、$F_3 = 2$：每个下标都不小于 $2$，任意两个不相邻。例如 $12 = F_6 + F_4 + F_2$，所以 $\mathrm{zeck}(12) = [6, 4, 2]$。存在与唯一见[附录 A](appendix-a-zeckendorf.md) 的 [@thm-zeckendorf-exists] 与 [@thm-zeckendorf-unique]。

::: {.definition #def-golden-word title="黄金词" lean="D5/S1/Words/GoldenWord.goldenWord"}
取两个字母 $\mathtt{a}$、$\mathtt{b}$，分别对应 Lean 中的 `true` 与 `false`。替换 $\sigma$ 定义为

$$
\sigma(\mathtt{a}) = \mathtt{ab}, \qquad \sigma(\mathtt{b}) = \mathtt{a},
$$

作用在有限词上时逐个字母替换，再按原顺序连接。令

$$
w_0 = \mathtt{a}, \qquad w_{Q+1} = \sigma(w_Q) \quad (Q \in \mathbb{N}).
$$

黄金词是无穷词 $g = g(0)\,g(1)\,g(2) \cdots$，其中 $g(i)$ 是 $w_i$ 的第 $i$ 个字母。
:::

定义取的是对角线：第 $i$ 个字母到第 $i$ 层去读。这总是可行的，因为 $|w_Q| = F_{Q+2}$（trureturing 中的 `fibWord_length`），而 $i < F_{i+2}$。前几层如下。

| $Q$ | $w_Q$ | 长度 $F_{Q+2}$ |
| ---: | :--- | ---: |
| 0 | $\mathtt{a}$ | 1 |
| 1 | $\mathtt{ab}$ | 2 |
| 2 | $\mathtt{aba}$ | 3 |
| 3 | $\mathtt{abaab}$ | 5 |
| 4 | $\mathtt{abaababa}$ | 8 |
| 5 | $\mathtt{abaababaabaab}$ | 13 |
| 6 | $\mathtt{abaababaabaababaababa}$ | 21 |

每一层都是下一层的前缀：$w_0 = \mathtt{a}$ 是 $w_1 = \mathtt{ab}$ 的前缀，而 $u$ 是 $u'$ 的前缀时 $\sigma(u)$ 也是 $\sigma(u')$ 的前缀。所以各层都是同一个无穷词的前缀，$g(i)$ 可以从任何一个长度超过 $i$ 的层中读出（trureturing 中的 `goldenWord_eq_fibWord_get`）；在这个意义上，$g$ 是 $w_Q$ 的极限。例如 $g$ 的前 21 个字母就是 $w_6$。Lean 的定义直接取对角线，用不到极限的概念。

::: {.proposition #prop-golden-word-zeckendorf title="黄金词与最低的 Zeckendorf 数位" lean="D5/S1/Words/GoldenWord.goldenWord_char_zeckendorf"}
对每个自然数 $i$，

$$
g(i) = \mathtt{a} \iff 2 \notin \mathrm{zeck}(i).
$$

也就是说，$g(i) = \mathtt{a}$ 当且仅当 $i$ 的 Zeckendorf 表示不用权重 $F_2 = 1$。
:::

下表列出 $0 \le i \le 20$ 的情形。$g(i)$ 由替换直接算出，$\mathrm{zeck}(i)$ 由贪心算法算出（每次取不超过余数的最大 Fibonacci 数）。对 $i < 3000$，两者都符合上述命题；这是有限的核对，不是证明。

| $i$ | $\mathrm{zeck}(i)$ | $g(i)$ | $i$ | $\mathrm{zeck}(i)$ | $g(i)$ |
| ---: | :--- | :---: | ---: | :--- | :---: |
| 0 | $[\,]$ | $\mathtt{a}$ | 11 | $[6, 4]$ | $\mathtt{a}$ |
| 1 | $[2]$ | $\mathtt{b}$ | 12 | $[6, 4, 2]$ | $\mathtt{b}$ |
| 2 | $[3]$ | $\mathtt{a}$ | 13 | $[7]$ | $\mathtt{a}$ |
| 3 | $[4]$ | $\mathtt{a}$ | 14 | $[7, 2]$ | $\mathtt{b}$ |
| 4 | $[4, 2]$ | $\mathtt{b}$ | 15 | $[7, 3]$ | $\mathtt{a}$ |
| 5 | $[5]$ | $\mathtt{a}$ | 16 | $[7, 4]$ | $\mathtt{a}$ |
| 6 | $[5, 2]$ | $\mathtt{b}$ | 17 | $[7, 4, 2]$ | $\mathtt{b}$ |
| 7 | $[5, 3]$ | $\mathtt{a}$ | 18 | $[7, 5]$ | $\mathtt{a}$ |
| 8 | $[6]$ | $\mathtt{a}$ | 19 | $[7, 5, 2]$ | $\mathtt{b}$ |
| 9 | $[6, 2]$ | $\mathtt{b}$ | 20 | $[7, 5, 3]$ | $\mathtt{a}$ |
| 10 | $[6, 3]$ | $\mathtt{a}$ | | | |

::: proof
Lean 证明不逐个位置比较，而是说明两边满足同一个递推。一方面，对 $Q$ 归纳可得 $w_{Q+2} = w_{Q+1}\,w_Q$。另一方面，对 $0 \le j < F_{Q+2}$，$\mathrm{zeck}(F_{Q+3} + j)$ 就是在 $\mathrm{zeck}(j)$ 前面添上下标 $Q+3$（trureturing 中的 `wdigits_fib_add`）；因为 $Q+3 \ne 2$，位置 $F_{Q+3} + j$ 与位置 $j$ 的判据相同。于是按判据 $2 \notin \mathrm{zeck}(i)$ 写出的、长度为 $F_{Q+2}$ 的词也满足这个递推，前两层同样是 $\mathtt{a}$ 与 $\mathtt{ab}$，所以它与 $w_Q$ 逐层相等。在第 $i$ 层读第 $i$ 个字母，就得到命题。完整证明由 Lean 内核检查。
:::

[@prop-golden-word-zeckendorf] 刻画单个字母；下面的定理关心连续的字母。从位置 $i$ 起长度为 $n$ 的因子是 $g(i)\,g(i+1) \cdots g(i+n-1)$。

::: {.theorem #thm-factor-complexity title="长度为 $n$ 的因子恰有 $n+1$ 个" lean="D5/S1/Words/GoldenFactorComplexity.golden_factor_complexity"}
对每个自然数 $n$，黄金词恰有 $n + 1$ 个不同的长度为 $n$ 的因子：

$$
\#\bigl\{\, g(i)\,g(i+1) \cdots g(i+n-1) \;:\; i \in \mathbb{N} \,\bigr\} = n + 1 .
$$
:::

$n = 0$ 时集合只含空词。下表列出 $n = 1, 2, 3, 4$ 时的因子，括号内是首次出现的位置。这些因子是在长度为 $F_{27} = 196418$ 的前缀 $w_{25}$ 中找到的；这样的计算只能说明它们出现，不能说明更远处没有别的因子，后者正是定理的内容。

| $n$ | 长度为 $n$ 的因子（首次出现的位置） | 个数 |
| ---: | :--- | ---: |
| 1 | $\mathtt{a}$ (0)，$\mathtt{b}$ (1) | 2 |
| 2 | $\mathtt{aa}$ (2)，$\mathtt{ab}$ (0)，$\mathtt{ba}$ (1) | 3 |
| 3 | $\mathtt{aab}$ (2)，$\mathtt{aba}$ (0)，$\mathtt{baa}$ (1)，$\mathtt{bab}$ (4) | 4 |
| 4 | $\mathtt{aaba}$ (2)，$\mathtt{abaa}$ (0)，$\mathtt{abab}$ (3)，$\mathtt{baab}$ (1)，$\mathtt{baba}$ (4) | 5 |

例如 $\mathtt{bb}$ 从不出现：每一层 $w_{Q+1} = \sigma(w_Q)$ 都由 $\mathtt{ab}$ 与 $\mathtt{a}$ 两种块连接而成，每个 $\mathtt{b}$ 都是某个块 $\mathtt{ab}$ 的末字母，其后的块总以 $\mathtt{a}$ 开头。

$n + 1$ 是很小的数：一个无穷词若对某个 $n$ 只有不超过 $n$ 个长度为 $n$ 的因子，它从某个位置起就是周期的[^sturm]。所以在不是最终周期的词中，[@thm-factor-complexity] 给出的复杂度已经最小；因子复杂度恰为 $n+1$ 的词称为 Sturm 词。

::: proof
Lean 证明沿用 Sturm 词的经典思路。先把黄金词写成取整之差：从位置 $i$ 起的 $m$ 个字母中 $\mathtt{a}$ 的个数等于

$$
\left\lfloor \frac{i+m+1}{\varphi} \right\rfloor - \left\lfloor \frac{i+1}{\varphi} \right\rfloor
$$

（trureturing 中的 `goldenWindowTrueCount_eq_floor`，由 [@prop-golden-word-zeckendorf] 经 Beatty 序列得到）。记 $\{x\}$ 为小数部分，相位 $x_i = \{(i+1)/\varphi\}$；因为 $1/\varphi = \varphi - 1$，它就是 [@thm-golden-phase] 中的 $p(i)$。对 $1 \le m \le n$，上面的个数等于 $\lfloor m/\varphi \rfloor$，在 $x_i \ge 1 - \{m/\varphi\}$ 时再加 $1$。这 $n$ 个分点 $1 - \{m/\varphi\}$ 互不相同（$1/\varphi$ 是无理数），把 $[0, 1)$ 分成 $n + 1$ 段。长度为 $n$ 的因子由这些个数逐个相减得出，只依赖 $x_i$ 落在哪一段，所以至多有 $n + 1$ 个。反过来，相位 $x_i$ 在 $[0, 1)$ 中稠密，每一段都有相位落入，而落在不同段的相位给出不同的因子，所以至少有 $n + 1$ 个。完整证明由 Lean 内核检查。
:::

[^sturm]: M. Morse, G. A. Hedlund, Symbolic dynamics, *Amer. J. Math.* 60 (1938), 815–866；Sturm 词见二人的 Symbolic dynamics II. Sturmian trajectories, *Amer. J. Math.* 62 (1940), 1–42。这是文献结果，未在本书形式化：所引的 Lean 声明只计算黄金词的因子个数，不含这条周期性定理。反方向是初等的：最终周期的词只有有界多个不同的因子，而 $n + 1$ 无界，所以黄金词不是最终周期的。

## 回归 {#sec-returns}

在 [@thm-factor-complexity] 的证明中，黄金词由相位 $x_i$ 控制，而 $x_{i+1}$ 是把 $x_i$ 在周长为 $1$ 的圆周上转过 $1/\varphi$。因为 $\varphi = 1 + 1/\varphi$，转过 $1/\varphi$ 与转过 $\varphi$ 是同一个旋转。相位回到同一段时，同一个因子重新出现；因子多快重现，取决于这个旋转多快回到起点附近。

有限的循环窗口转满一圈就精确复原（trureturing 称之为 revival，见 `CyclicWindowRevival` 模块）。黄金旋转永远不会精确复原：转 $q$ 步之后，离起点的距离是 $q\varphi$ 到最近整数的距离 $\norm{q\varphi}$，它对每个 $q \ge 1$ 都不是 $0$。沿 Fibonacci 时刻看，[`fibonacci_golden_residual`](lean:D5/S1/Scale/FibonacciErrorRatio.fibonacci_golden_residual) 给出精确的余差

$$
F_n\varphi - F_{n+1} = -\left(-\frac{1}{\varphi}\right)^{n},
$$

所以 $n \ge 2$ 时 $F_{n+1}$ 是离 $F_n\varphi$ 最近的整数，$\norm{F_n\varphi} = \varphi^{-n}$。误差按 $\varphi^{-n}$ 缩小，等待的时间 $F_n$ 却按 $\varphi^{n}$ 的量级增长；两者之积 $F_n\,|F_n\varphi - F_{n+1}|$ 称为回归得分。

::: {.theorem #thm-revival-score title="回归得分的极限" lean="D5/S3/ObserverMemory/GoldenRevivalScore.golden_fibonacci_revival_score_tendsto"}
设 $F_n$ 为 Fibonacci 数（$F_0 = 0$，$F_1 = 1$），$\varphi = (1+\sqrt5)/2$。则

$$
\lim_{n \to \infty} F_n \left| F_n\varphi - F_{n+1} \right| = \frac{1}{\sqrt5}.
$$
:::

::: proof
由上面的余差公式，$|F_n\varphi - F_{n+1}| = \varphi^{-n}$。再用 Binet 公式 $F_n = (\varphi^n - \psi^n)/\sqrt5$（mathlib 中的 `Real.coe_fib_eq`），其中 $\psi = -1/\varphi$，得到精确的闭式

$$
F_n \left| F_n\varphi - F_{n+1} \right| = \frac{\varphi^n - \psi^n}{\sqrt5}\,\varphi^{-n} = \frac{1 - (-\psi^2)^n}{\sqrt5}.
$$

因为 $\psi^2 = 1/\varphi^2 < 1$，修正项 $(-\psi^2)^n$ 趋于 $0$。Lean 证明正是先建立这个闭式，再取极限。完整证明由 Lean 内核检查。
:::

下表是 $n = 1, \dots, 12$ 时的数值，$1/\sqrt5 \approx 0.4472136$。得分在 $1/\sqrt5$ 两侧交替：由闭式，$n$ 为奇数时偏高、为偶数时偏低，偏差的绝对值是 $\varphi^{-2n}/\sqrt5$。表中每个得分都按定义与闭式各算一遍（60 位有效数字）；这是计算，不是证明。

| $n$ | $F_n$ | $F_{n+1}$ | $\lvert F_n\varphi - F_{n+1}\rvert$ | 得分 | 得分减 $1/\sqrt5$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 1 | 1 | 0.618034 | 0.618034 | +0.170820 |
| 2 | 1 | 2 | 0.381966 | 0.381966 | −0.065248 |
| 3 | 2 | 3 | 0.236068 | 0.472136 | +0.024922 |
| 4 | 3 | 5 | 0.145898 | 0.437694 | −0.009519 |
| 5 | 5 | 8 | 0.090170 | 0.450850 | +0.003636 |
| 6 | 8 | 13 | 0.055728 | 0.445825 | −0.001389 |
| 7 | 13 | 21 | 0.034442 | 0.447744 | +0.000531 |
| 8 | 21 | 34 | 0.021286 | 0.447011 | −0.000203 |
| 9 | 34 | 55 | 0.013156 | 0.447291 | +0.000077 |
| 10 | 55 | 89 | 0.008131 | 0.447184 | −0.000030 |
| 11 | 89 | 144 | 0.005025 | 0.447225 | +0.000011 |
| 12 | 144 | 233 | 0.003106 | 0.447209 | −0.000004 |

Fibonacci 时刻给出一个极限；如果允许所有回归时刻，还能得到哪些有限极限？对固定的实二次无理数，这已有文献中的完整答案。下面先陈述 Dhanda–Haynes 的一般定理，再把它换成本章的最近整数距离[^dhanda-haynes]。

::: {.theorem #thm-quadratic-accumulation title="实二次无理数的归一化逼近聚点" status="written-proof" proof="pf-quadratic-accumulation" doi="10.1016/j.jnt.2024.09.002" source="Theorem 4" request="https://github.com/the-omega-institute/trureturing-requests/issues/111"}
设 $D\ge2$ 是无平方因子的整数，$A,B\in\mathbb Q$，$B\ne0$，$\alpha=A+B\sqrt D$，$K=\mathbb Q(\alpha)$。令

$$
\begin{aligned}
\Lambda&=\mathbb Z+\alpha\mathbb Z,\\
\Lambda^*&=\{s\in K:\operatorname{Tr}_{K/\mathbb Q}(s\lambda)\in\mathbb Z
\text{ 对所有 }\lambda\in\Lambda\}.
\end{aligned}
$$

记 $\mathcal A_1(\alpha)$ 为实数集

$$
\mathrm{NA}_1(\alpha)=\{|q|(q\alpha-p):q\in\mathbb Z\setminus\{0\},\ p\in\mathbb Z\}
$$

在 $\mathbb R$ 中的聚点集：每个聚点的任意邻域都含有不同于它的集合元素。则

$$
\mathcal A_1(\alpha)=
\{\pm2B\sqrt D\,\operatorname N_{K/\mathbb Q}(s):s\in\Lambda^*\setminus\{0\}\}.
$$

这里的迹与范数分别为 $\operatorname{Tr}_{K/\mathbb Q}(x)=x+x'$、$\operatorname N_{K/\mathbb Q}(x)=xx'$，撇号表示把 $\sqrt D$ 换成 $-\sqrt D$ 的共轭。$p,q$ 不要求互素。
:::

::: {.proof #pf-quadratic-accumulation}
以下展开原文第 6 节引理 18–19 与第 7 节式 (35)–(36) 的论证。记 $\alpha_0^*,\alpha_1^*$ 为基 $1,\alpha$ 关于迹配对的对偶基。原文第 2.3 节考虑乘子环

$$
\mathcal Z_\Lambda=\{v\in\mathcal O_K:v\Lambda\subseteq\Lambda\},
$$

其中 $\mathcal O_K$ 为 $K$ 的代数整数环。它的单位乘法保持 $\Lambda^*$；由该节引理 13 的单位格，在二次情形可取正的主导单位 $u_k\to\infty$，其共轭满足 $|u_k'|=u_k^{-1}$。引理 18 说明：对每个 $C>0$，存在有限集 $S_C\subseteq\Lambda^*$，使得所有满足 $q>0$、$q|q\alpha-p|\le C$ 的整数对都可写成

$$
q\alpha_0^*+p\alpha_1^*=su,
\qquad s\in S_C,\quad u\in\mathcal Z_\Lambda^\times
$$

且 $u$ 是主导单位；此时 $|u|$ 与 $q$、$|u'|$ 与 $q^{-1}$ 分别在固定正常数倍内可比。这个有限约化来自把两嵌入下分别为 $O(q)$、$O(q^{-1})$ 的对偶格元素除以这样的单位，得到有界格集。

对任意固定的 $s\in\Lambda^*\setminus\{0\}$ 和这样的单位 $u$，令 $t=su$，并取整数

$$
q_u=\operatorname{Tr}_{K/\mathbb Q}(t),\qquad
p_u=\operatorname{Tr}_{K/\mathbb Q}(t\alpha).
$$

直接展开迹，得到引理 19 在一维的公式

$$
\begin{aligned}
q_u\alpha-p_u&=(\alpha-\alpha')t'=2B\sqrt D\,t',\\
\gamma_u:=|q_u|\,|t'|
&=|\operatorname N_{K/\mathbb Q}(s)|\left|1+\frac{t'}{t}\right|.
\end{aligned}
$$

单位的范数绝对值为 $1$；当 $|u|\to\infty$ 时，$t'/t\to0$，故 $\gamma_u\to|\operatorname N_{K/\mathbb Q}(s)|$，而 $|q_u|(q_u\alpha-p_u)=\pm2B\sqrt D\,\gamma_u$。

先证聚点集包含在所述范数集合中。取趋于某个聚点的互异归一化逼近值。它们有界；若 $|q|$ 有界，则相应的 $p$ 也只有有限多个，与互异性矛盾。因此可取 $|q|\to\infty$ 的子序列。变换 $(q,p)\mapsto(-q,-p)$ 把归一化值变号，所以只需处理正分母序列及其相反数。用引理 18 的有限集再取子序列，可固定非零的 $s$，相应的主导单位满足 $|u|\to\infty$。上式给出的极限只能是 $\pm2B\sqrt D\,|\operatorname N_{K/\mathbb Q}(s)|$，属于定理右边。

反过来，固定任意非零 $s\in\Lambda^*$，令 $u=u_k\to\infty$。此时 $q_{u_k}$ 最终非零，上式的绝对值趋于 $2|B|\sqrt D\,|\operatorname N_{K/\mathbb Q}(s)|$。还须保证这给出集合的真正聚点，而非重复同一个值。原文式 (33) 的上述表达式保证 $\gamma_u\ne|\operatorname N_{K/\mathbb Q}(s)|$：若相等，则非零实数 $t'/t$ 只能是 $-2$；但 $t'=-2t$ 再取共轭会给出 $t=4t$，与 $t\ne0$ 矛盾。取符号固定的子序列，便有不同于极限的集合元素趋于两种符号之一的极限；再用 $\mathrm{NA}_1(\alpha)$ 关于 $0$ 的对称性，两个符号都成为聚点。这证明了反向包含。上述两种符号也使范数取绝对值与否给出同一个集合。
:::

[^dhanda-haynes]: Kavita Dhanda, Alan Haynes, *Accumulation points of normalized approximations*, *Journal of Number Theory* 268 (2025), 1–38，DOI：[10.1016/j.jnt.2024.09.002](https://doi.org/10.1016/j.jnt.2024.09.002)。一般陈述见 Theorem 4，迹对偶见第 2.3 节，证明见第 6 节引理 18–19 与第 7 节；可读[原文版本](https://arxiv.org/html/2310.00173v2)。

现在专门取 $\alpha=\varphi$。先核对两种问题的参数：令 $\mathcal C_\varphi$ 为沿严格递增正整数 $q_j$ 的 $q_j\norm{q_j\varphi}$ 的所有有限极限组成的集合。从 $x\in\mathcal A_1(\varphi)$ 出发，取互异集合值趋于 $x$；有界归一化误差在有限多个分母处只能给出有限多个值，故可抽取 $|q_j|$ 严格递增的子序列。必要时同时把 $q_j,p_j$ 变号，使分母为正，绝对误差不变。由于 $|q_j\varphi-p_j|=O(1/q_j)<1/2$ 最终成立，$p_j$ 最终就是最近整数，所以 $q_j\norm{q_j\varphi}\to|x|$。

反过来，若正整数 $q_j$ 严格递增且 $q_j\norm{q_j\varphi}\to L$，为每个 $q_j$ 取最近整数 $p_j$，再取误差符号固定的子序列，就有 $q_j(q_j\varphi-p_j)\to x$ 且 $|x|=L$。这些带符号的值互不相同：若正分母 $q,r$ 与对应整数 $p,s$ 给出同一个值，则

$$
(q^2-r^2)\varphi=qp-rs;
$$

$\varphi$ 的无理性迫使 $q=r$。因此这确为原文所用的集合聚点，$x\in\mathcal A_1(\varphi)$。两向合起来，$\mathcal C_\varphi=\{|x|:x\in\mathcal A_1(\varphi)\}$。

迹对偶也可以手算。$1,\varphi$ 的对偶基是 $(\varphi-1)/\sqrt5,\ 1/\sqrt5$：前者与 $1,\varphi$ 的迹配对依次为 $1,0$，后者依次为 $0,1$。所以

$$
\Lambda^*=\frac1{\sqrt5}(\mathbb Z+\varphi\mathbb Z).
$$

写 $z=a-b\varphi$，其中 $a,b\in\mathbb Z$，则

$$
\begin{aligned}
Q(a,b):=\operatorname N_{K/\mathbb Q}(z)&=a^2-ab-b^2,\\
\operatorname N_{K/\mathbb Q}(\sqrt5)&=-5,\\
\operatorname N_{K/\mathbb Q}(z/\sqrt5)&=-Q(a,b)/5.
\end{aligned}
$$

分母的范数 $-5$ 决定了最后一式的负号。在 [@thm-quadratic-accumulation] 中取 $A=B=1/2$、$D=5$，先保留两种符号，再取绝对值，便得到

$$
\begin{aligned}
\mathcal A_1(\varphi)
&=\left\{\pm\frac{Q(a,b)}{\sqrt5}:(a,b)\in\mathbb Z^2\setminus\{(0,0)\}\right\},\\
\mathcal C_\varphi
&=\left\{\frac{|a^2-ab-b^2|}{\sqrt5}:(a,b)\in\mathbb Z^2\setminus\{(0,0)\}\right\}.
\end{aligned}
$$

非零整数对的范数不会为零，因为 $a-b\varphi$ 及其共轭都非零。这里仍不加互素条件；这些公式是一般文献定理的黄金比特例与上述双向对应所得的书面推导。

::: {.remark #prob-revival-spectrum title="回归谱的文献结论与形式化边界"}
[@thm-revival-score] 的 Lean 验证只处理 Fibonacci 时刻；固定 $\varphi$ 的所有实聚点则由 [@thm-quadratic-accumulation] 及上面的换算给出，不能再把这个分类列为数学开放问题。本章引用的 `GoldenRevivalScore` 与 `GoldenHurwitzBound` 冻结声明都不包含这个完整聚点集等式。

`Blueprint/D5/S3/ObserverMemory/GoldenRevivalScore.md` 所说的“完整回归谱”与“全局最优性”没有精确定义[^hurwitz]；对应 Lean 文件也明确不声称完整的 Lagrange–Markov 谱分类。固定一个二次无理数的聚点集与让 $\alpha$ 变化的谱问题不同，前者的文献结果并不自动解决这些更宽泛、尚未写成命题的表述。一般二次聚点定理的形式化需求及相关声明的适用范围见[形式化请求](https://github.com/the-omega-institute/trureturing-requests/issues/111)。
:::

[^hurwitz]: trureturing 没有说明这里的“全局最优”具体指什么，下面只是一种读法。若把它理解为“对全体正整数 $q$，$q\norm{q\varphi}$ 的下极限等于 $1/\sqrt5$”，这是经典结果（A. Hurwitz, Ueber die angenäherte Darstellung der Irrationalzahlen durch rationale Brüche, *Math. Ann.* 39 (1891), 279–284）。trureturing 已冻结其中一半所需的界：模块 `D5/S1/Depth/GoldenHurwitzBound` 中的 `golden_hurwitz_bound` 说，对每个既约分母为 $d$ 的有理数 $r$，$|\varphi - r| > 1/(\sqrt5 d^2 + d)$，由此用纸面推理可得这个下极限不小于 $1/\sqrt5$；另一方面，$n \ge 2$ 时 $\norm{F_n\varphi} = |F_n\varphi - F_{n+1}|$，所以 [@thm-revival-score] 给出它不大于 $1/\sqrt5$。把两者合成的下极限陈述不在上述引用的冻结声明中，本书也未把它形式化。

## 亏量的一个用处 {#sec-almost-additive}

[@thm-deficit-three-valued] 说亏量只取 $-1$、$0$、$1$。本节把这个界用在素因子分解的指数上。对素数 $p$ 与正整数 $n$，记 $v_p(n)$ 为 $p$ 在 $n$ 的素因子分解中的指数。

$\lambda_-(n)$
: 对正整数 $n$，$\lambda_-(n) = \sum_{p \mid n} \beta'(v_p(n)) \log p$，求和取遍 $n$ 的素因子，$\beta'$ 是第一章的收缩面读数（[@def-beta-contraction]），$\log$ 是自然对数。这是 Lean 中的 `lambdaMinus`；它对 $n = 0$ 也有定义（值为 $0$），下面用不到。

$\operatorname{rad}(k)$
: 正整数 $k$ 的不同素因子之积，$\operatorname{rad}(1) = 1$。这是 Lean 中的 `primeRadical`。

若把 $\beta'$ 换成 $v \mapsto v$，和式就成了 $\sum_{p \mid n} v_p(n) \log p = \log n$，它对乘法严格可加。$\beta'$ 不可加，$\lambda_-$ 也就不可加：$\lambda_-(2) = \beta'(1) \log 2 = \psi^2 \log 2 \approx 0.2648$，$\lambda_-(4) = \beta'(2) \log 2 = \psi^3 \log 2 \approx -0.1636$，所以 $\lambda_-(4) - 2\lambda_-(2) = (\psi^3 - 2\psi^2) \log 2 = -\log 2$。下面的定理说明偏差有多大。

::: {.theorem #thm-almost-additive title="$\lambda_-$ 的几乎可加性" lean="D5/S1/Deficit/AlmostAdditivity.lambdaMinus_almost_additive"}
对所有满足 $m \ge 1$、$n \ge 1$ 的自然数 $m, n$，

$$
\bigl| \lambda_-(mn) - \lambda_-(m) - \lambda_-(n) \bigr| \le \log \operatorname{rad}(\gcd(m, n)).
$$
:::

特别地，$m$ 与 $n$ 互素时右边是 $\log 1 = 0$，于是 $\lambda_-(mn) = \lambda_-(m) + \lambda_-(n)$。

::: proof
取素数 $p$，记 $a = v_p(m)$，$b = v_p(n)$，则 $v_p(mn) = a + b$。只整除 $m$、$n$ 之一的素数，其贡献因 $\beta'(0) = 0$ 而相消；公共素数 $p$ 的贡献是 $\bigl(\beta'(a+b) - \beta'(a) - \beta'(b)\bigr) \log p$。由 [@thm-deficit-integer]，亏量等于收缩面上的读数 $c(a, b) = \beta'(a) + \beta'(b) - \beta'(a+b)$，所以

$$
\lambda_-(mn) - \lambda_-(m) - \lambda_-(n) = -\sum_{p \mid \gcd(m, n)} c\bigl(v_p(m), v_p(n)\bigr) \log p .
$$

由 [@thm-deficit-three-valued]，每一项的 $|c| \le 1$；用三角不等式，左边的绝对值不超过 $\sum_{p \mid \gcd(m, n)} \log p = \log \operatorname{rad}(\gcd(m, n))$。Lean 证明按同样的步骤进行，起决定作用的一步是 [`deficit_three_valued`](lean:D5/S1/Deficit/DeficitThreeValued.deficit_three_valued)。完整证明由 Lean 内核检查。
:::

下表按上面的等式列出几个例子，$c$ 的值取自第一章的 [@ex-small-deficits]；误差一列又按 $\lambda_-$ 的定义直接算过一遍。对 $1 \le m, n < 300$ 的全部数对，直接计算都符合 [@thm-almost-additive]，互素时误差都是 $0$。这是有限的核对，不是证明。

| $m$ | $n$ | 公共素数 $p$：$(v_p(m), v_p(n))$，$c$ | 误差 | 界 $\log \operatorname{rad}(\gcd(m, n))$ |
| ---: | ---: | :--- | ---: | ---: |
| 2 | 2 | $2$：$(1, 1)$，$+1$ | $-\log 2 \approx -0.693$ | $\log 2 \approx 0.693$ |
| 4 | 4 | $2$：$(2, 2)$，$-1$ | $\log 2 \approx 0.693$ | $\log 2 \approx 0.693$ |
| 2 | 4 | $2$：$(1, 2)$，$0$ | $0$ | $\log 2 \approx 0.693$ |
| 6 | 6 | $2$：$(1, 1)$，$+1$；$3$：$(1, 1)$，$+1$ | $-\log 6 \approx -1.792$ | $\log 6 \approx 1.792$ |
| 18 | 18 | $2$：$(1, 1)$，$+1$；$3$：$(2, 2)$，$-1$ | $\log(3/2) \approx 0.405$ | $\log 6 \approx 1.792$ |
| 10 | 40 | $2$：$(1, 3)$，$0$；$5$：$(1, 1)$，$+1$ | $-\log 5 \approx -1.609$ | $\log 10 \approx 2.303$ |
| 4 | 9 | 无 | $0$ | $\log 1 = 0$ |

表中“误差”指 $\lambda_-(mn) - \lambda_-(m) - \lambda_-(n)$。第一、二、四行取到等号；第五行两个公共素数上的亏量符号相反，部分抵消。

$\lambda_-$ 把收缩面读数放在素数的指数上。把展开面读数放在同样的位置，再写成 Euler 乘积的形状，就得到 trureturing 中一个仍然开放的问题。对自然数 $v$，令 $S(v) = \lfloor (v+1)\varphi \rfloor - 1$（即 [@thm-beatty-deficit] 中的 $s(v)$），$\psi = 1 - \varphi$，

$$
\beta(v) = S(v) - v\psi .
$$

由 [@thm-beatty-deficit] 证明中的两条闭式，这正是第一章的展开面读数 $\beta(v)$（对 $v < 500$ 我们也逐一核对过）；例如 $\beta(1) = \varphi^2$，$\beta(2) = \varphi^3$。对复数 $s$，定义 Euler 胚

$$
E(s) = \prod_{p} \sum_{v=0}^{\infty} p^{-s\beta(v)}, \qquad p^{w} = e^{w \log p},
$$

乘积取遍全体素数 $p$。

::: {.conjecture #conj-independence title="独立性猜想 O-5"}
存在函数 $Z \colon \mathbb{C} \to \mathbb{C}$，同时满足：

1. $Z$ 在右半平面 $\{s : \operatorname{Re} s > 0\}$ 上亚纯；
2. 对所有满足 $\operatorname{Re} s > 1/\varphi^2$ 的 $s$，$Z(s) = E(s)$；
3. 对所有满足 $1/(2\varphi^3) < \operatorname{Re} s < 1/\varphi^2$ 的 $s$：若 $Z$ 在 $s$ 处解析且 $Z(s) = 0$，则 $\operatorname{Re} s = 1/(2\varphi^2)$。
:::

三个常数约为 $1/\varphi^2 \approx 0.382$、$1/(2\varphi^2) \approx 0.191$、$1/(2\varphi^3) \approx 0.118$。这里的亚纯与解析都按 Mathlib 的定义理解[^conv]。

令 $u = \varphi^2 s$。因为 $\beta(1) = \varphi^2$，$E(s)$ 中 $v = 1$ 的项是 $p^{-\varphi^2 s} = p^{-u}$；条件 3 中的带变为 $1/(2\varphi) < \operatorname{Re} u < 1$，其中的直线变为 $\operatorname{Re} u = 1/2$（trureturing 的 Blueprint 页面 GoldenSpectralCoordinate 记录了这一换算）。在这个坐标下，直线的位置与 Riemann $\zeta$ 函数的临界线相同；这只是形式上的类比，trureturing 的 README 明确说明该仓库没有证明 Riemann 猜想。$E$ 与 $\lambda_-$ 也有联系：把乘积形式地展开（不讨论收敛），每个正整数 $n$ 恰好贡献一项 $\prod_{p \mid n} p^{-s\beta(v_p(n))}$；由 [@lem-two-faces]，$\beta(v) = \beta'(v) + \sqrt5\, v$，所以这一项等于 $n^{-\sqrt5 s} e^{-s\lambda_-(n)}$，形式上

$$
E(s) = \sum_{n=1}^{\infty} n^{-\sqrt5 s} e^{-s\lambda_-(n)} .
$$

这只是形式运算，本书不讨论它在哪里成立。

O-5 是开放问题，不是定理，本书不为它引用任何 Lean 声明。trureturing 把它写成 `Hearts.lean` 中的 `o5_independence`，证明体是 `sorry`；模块注释说明，这一声明只记录开放的断言，并不表示它已被证明。trureturing 的 README 与 VISION 文档也都把 O-5 列为仍有未完成证明义务的问题。

trureturing 在 `GoldenWindowZeroObstruction` 模块中证明了两条与 O-5 有关的结果，都不决定它。一条说：若某个函数在半平面 $\operatorname{Re} s > r$（$0 < r < 1/\varphi^2$）上解析、在 $\operatorname{Re} s > 1/\varphi^2$ 上等于 $E$，并在这个半平面内、条件 3 的带中有一个实部不等于 $1/(2\varphi^2)$ 的零点，那么满足条件 1、2 且在 $\operatorname{Re} s > r$ 上额外满足一种正规形式条件（Mathlib 的 `MeromorphicNFOn`）的候选，都不满足条件 3。另一条说：只改动一点的函数值，就能让亚纯的候选在该点不解析，从而避开条件 3 在这一点的检验。Blueprint 据此说明，前者并不否定原始的 O-5 陈述，后者则把原陈述的一个局限写成了定理。

以上关于 O-5 的说法出自 trureturing 所钉提交中的下列文件：

- `D5/X_Frontier/Hearts.lean`：O-5 的陈述 `o5_independence` 及其中的定义；
- `README.md` 与 `docs/VISION.md`：把 O-5 列为开放问题；
- `Blueprint/D5/X_Frontier/GoldenWindowZeroObstruction.md`：上面两条已证结果；
- `Blueprint/D5/S1/Deficit/Beatty/GoldenSpectralCoordinate.md`：换算 $\varphi^2 \cdot 1/(2\varphi^2) = 1/2$。

[^conv]: 在 `Hearts.lean` 中，$Z$ 的亚纯性是 Mathlib 的 `MeromorphicOn`，它不约束函数在极点处取什么值；条件 3 要求 $Z$ 在 $s$ 处解析（`AnalyticAt`），正是为了让零点的判断不受这些值影响。$E$ 中的无穷和与无穷积是 Lean 的无条件和与无条件积，不收敛时 Lean 赋予约定值（和为 $0$，积为 $1$）；猜想只在 $\operatorname{Re} s > 1/\varphi^2$ 上用到 $E$。
