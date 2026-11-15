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

::: {.theorem #thm-quadratic-accumulation title="实二次无理数的归一化逼近聚点" lean="D5/S3/Arith/QuadraticFields/QuadraticAccumulationClassification.derivedSet_eq_signed_norm_values"}
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
先保留原文第 6 节引理 18–19 与第 7 节式 (35)–(36) 的单位论证，作为文献证明的解释；随后说明 Lean 用来证明聚点到范数方向的离散格论证。两者证明同一分类，但这里并不声称 Lean 逐行验证了论文的单位约化。记 $\alpha_0^*,\alpha_1^*$ 为基 $1,\alpha$ 关于迹配对的对偶基。原文第 2.3 节考虑乘子环

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

Lean 的逆向包含直接从任意真正聚点 $x$ 出发。有界归一化值若又有有界的 $|q|$，就只有有限多个整数 $p,q$；去心邻域可以避开这个有限集。因此可选 $q_n\ne0,p_n\in\mathbb Z$，使 $|q_n|>n$ 且 $y_n=|q_n|(q_n\alpha-p_n)\to x$。置 $e_n=q_n\alpha-p_n=y_n/|q_n|$，便有 $e_n\to0$。令 $\delta=2B\sqrt D\ne0$，并在 $K$ 中取

$$
s_n=\frac{q_n}{2}+\frac{p_n-Aq_n}{2DB}\sqrt D.
$$

直接计算得 $\operatorname{Tr}(s_n)=q_n$、$\operatorname{Tr}(s_n\alpha)=p_n$，所以 $s_n\in\Lambda^*$；其常数坐标 $q_n/2\ne0$，故 $s_n\ne0$。其范数满足

$$
\begin{aligned}
\operatorname N(s_n)
&=\left(\frac14-\frac{A^2}{4DB^2}\right)q_n^2
 +\frac{A}{2DB^2}q_np_n-\frac{p_n^2}{4DB^2},\\
\delta\operatorname N(s_n)&=q_ne_n-\frac{e_n^2}{\delta}.
\end{aligned}
$$

这个二次型的三个系数都是固定有理数。取正整数 $m$ 清除它们的分母，则 $m\operatorname N(s_n)\in\mathbb Z$。记 $\varepsilon_n=\operatorname{sgn}(q_n)\in\{1,-1\}$，得到整数序列

$$
j_n:=m\varepsilon_n\operatorname N(s_n)
=\frac m\delta\left(y_n-\frac{\varepsilon_ne_n^2}{\delta}\right)
\longrightarrow\frac m\delta x.
$$

整数在实数中是闭且离散的，故极限也是整数，且 $j_n$ 最终恒等于该极限。取尾部任一项便得 $x=\varepsilon_n\delta\operatorname N(s_n)$，即所需的两种符号之一。Lean 在坐标二次代数中完成这些计算，再经保持迹与范数的代数同构送入实际子域 $\mathbb Q(\alpha)\subset\mathbb R$。另一包含方向调用下一个定理的 Pell 乘子构造，它还给出单射且避开极限的逼近序列。完整证明由 Lean 内核检查。
:::

[^dhanda-haynes]: Kavita Dhanda, Alan Haynes, *Accumulation points of normalized approximations*, *Journal of Number Theory* 268 (2025), 1–38，DOI：[10.1016/j.jnt.2024.09.002](https://doi.org/10.1016/j.jnt.2024.09.002)。一般陈述见 Theorem 4，迹对偶见第 2.3 节，证明见第 6 节引理 18–19 与第 7 节；可读[原文版本](https://arxiv.org/html/2310.00173v2)。

下列定理给出完整分类中范数到聚点的包含方向，并保留比集合等式更强的单射序列数据。

::: {.theorem #thm-quadratic-norm-inclusion title="非零迹对偶范数产生真正聚点" lean="D5/S3/Arith/QuadraticFields/QuadraticAccumulation.signed_norm_values_accumulate"}
设 $D\ge2$ 是无平方因子的整数，$A,B\in\mathbb Q$，$B\ne0$，$\alpha=A+B\sqrt D$。在实际子域 $K=\mathbb Q(\alpha)\subset\mathbb R$ 中，令 $\Lambda^*$ 为 $\mathbb Z+\alpha\mathbb Z$ 关于域迹的对偶。对每个 $s\in\Lambda^*\setminus\{0\}$，置 $c=2B\sqrt D\,\operatorname N_{K/\mathbb Q}(s)$。对每个 $x\in\{c,-c\}$，存在单射序列 $f:\mathbb N\to\mathbb R$，使得

$$
\begin{aligned}
f(n)&\in\mathrm{NA}_1(\alpha),& f(n)&\ne x\quad(n\in\mathbb N),\\
\lim_{n\to\infty}f(n)&=x,& x&\in\mathcal A_1(\alpha).
\end{aligned}
$$

此处保留 $B<0$ 的情形、两种符号与所有非零整数分母；分子分母不要求互素。
:::

::: proof
选取一个范数为 $1$、在正平方根嵌入下大于 $1$ 的 Pell 乘子，使其乘法保持同一个迹对偶格。对固定非零对偶向量取该乘子的幂，迹坐标给出整数分子、分母。去掉有限个初项后，归一化逼近值等于目标范数值加上非零几何递减修正项，因此各项互异且避开极限；同时变号分子、分母给出另一种符号。坐标二次代数与实际生成域之间的代数同构保持迹与范数，把这条构造送到陈述中的原始格。完整证明由 Lean 内核检查。
:::

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

非零整数对的范数不会为零，因为 $a-b\varphi$ 及其共轭都非零。这里仍不加互素条件；这些公式是一般分类定理的黄金比特例与上述双向对应所得的书面推导；最近整数距离的换算和黄金迹对偶的手算本身未作为这里引用的 Lean 声明。

::: {.remark #prob-revival-spectrum title="回归谱的文献结论与形式化边界"}
[@thm-revival-score] 的 Lean 验证只处理 Fibonacci 时刻；固定 $\varphi$ 的所有实聚点则由 [@thm-quadratic-accumulation] 及上面的换算给出，不能再把这个分类列为数学开放问题。[@thm-quadratic-accumulation] 已由 Lean 给出一般二次无理数的完整带符号聚点集等式；[@thm-quadratic-norm-inclusion] 另保留单射逼近序列。`GoldenRevivalScore` 与 `GoldenHurwitzBound` 本身仍不包含这个等式，最近整数距离与黄金迹对偶的专门换算仍是上面的书面推导。

`Blueprint/D5/S3/ObserverMemory/GoldenRevivalScore.md` 所说的“完整回归谱”与“全局最优性”没有精确定义[^hurwitz]；对应 Lean 文件也明确不声称完整的 Lagrange–Markov 谱分类。固定一个二次无理数的聚点集与让 $\alpha$ 变化的谱问题不同，前者的分类定理并不自动解决这些更宽泛、尚未写成命题的表述。一般二次聚点定理的形式化记录及相关声明的适用范围见[形式化请求](https://github.com/the-omega-institute/trureturing-requests/issues/111)。
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

这里的 $\beta(v)=S(v)-v\psi$ 正是源码中的 `o5Beta v`。对素数 $p$，原始局部因子定义为

$$
\operatorname{germLocalFactor}(s,p)
=\sum_{v=0}^{\infty}p^{-s\beta(v)}.
$$

这沿用源码 `germLocalFactor` 的参数顺序 $s,p$，包含 $v=0$ 的常数项 $1$，没有提取或除去任何校正因子。

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

对单个素数的局部因子，可以给出一个无条件的精确零点结论。

::: {.theorem #thm-o5-prime-two-local-zero title="素数 $2$ 的原始局部因子零点" lean="D5/S3/Analytic/GermWindow/GermZeroCertificate.germLocalFactor_two_has_zero_near_candidate"}
令复数圆心

$$
c=\frac{23815329946211908}{10^{17}}
+\frac{5256712292901926}{10^{15}}\,i.
$$

存在 $z\in\mathbb C$，使得

$$
\|z-c\|<10^{-8},\qquad
\operatorname{germLocalFactor}(z,2)=0.
$$
:::

::: proof
令 $G(s)=\sum_{v=0}^{60}2^{-s\beta(v)}$，即源码中的 `g 60 s`。对这 $61$ 项及其导数的实部、虚部逐项建立有理上下界，求和后得到 $\|G(c)\|<4/10^{10}$ 与 $\operatorname{Re}G'(c)>187/100$。在以 $c$ 为中心、半边长为 $1/(2\cdot10^8)$ 的闭矩形上，曲率界 $\|G''(s)\|\le400$ 控制一次 Taylor 余项，而一致尾界 $\|\operatorname{germLocalFactor}(s,2)-G(s)\|<58/10^{11}$ 控制截断误差。仿射比较函数 $G(c)+G'(c)(s-c)$ 在矩形内有一个单零点，其边界模长大于两种误差之和。`GermZeroCertificateReduction` 中已有的矩形 Rouché 归约因此给出原始局部因子在该矩形内的零点；矩形包含于所述开球。完整证明由 Lean 内核检查。
:::

定理盒只陈述这个精确开球内的存在性。球的位置还可由初等有理界直接确定：圆心与半径满足

$$
\begin{aligned}
\frac15&<\operatorname{Re}c-10^{-8},\\
\operatorname{Re}c+10^{-8}&<\frac14.
\end{aligned}
$$

由 $|\operatorname{Re}z-\operatorname{Re}c|\le\|z-c\|<10^{-8}$，球中每一点的实部都在 $(1/5,1/4)$ 内。再用 $8/5<\varphi<5/3$、$\varphi^2=\varphi+1$ 与 $\varphi^3=2\varphi+1$，得到 $1/(2\varphi^3)<1/8$、$1/(2\varphi^2)<1/5$ 和 $1/\varphi^2>1/3$。因此整个球都在条件 3 的原始窗口内，且在结构线 $\operatorname{Re}s=1/(2\varphi^2)$ 的右侧；这是定理盒之外的位置推论。

这里确实发生了局部因子消零，但定理没有断言原始无穷乘积 `tprod` 所定义的 $E(z)$ 为零，也没有断言某个延拓胚在该点为零。这个球位于条件 2 的原始相等域之外；若要把局部零点传递给延拓后的整体乘积，还须建立相应的因子分解与解析或亚纯延拓等式，并核对余下乘积在该点的行为及可能的零极点相消。上述正规形式与单点改值的限制仍然适用：本定理不否定只要求 `MeromorphicOn` 的原始 O-5，也不证明或反驳 Riemann 猜想。

::: {.remark #rem-o5-continuation-route title="O-5 的延拓路线与剩余接口"}
**文献结果，未在本书形式化。** Bhowmik–Essouabri–Lichtin（BEL）的多变量 Euler 乘积方法提供了一条延拓路线[^bel-continuation]。对有限个解析函数 $\ell_j$ 和整数 $a_j$，其引理 1 的证明允许局部因子形如 $1+\sum_j a_jp^{-\ell_j(s)}+R_p(s)$，其中 $R_p$ 在目标域上解析，且对素数 $p$ 和域内的 $s$ 一致为 $O(p^{-2})$。在 $W(\ell;\delta)=\{s:\operatorname{Re}\ell_j(s)>\delta\text{ 对所有 }j\}$（$\delta>0$）上，反复消去低阶项可提取有限个整数次幂的 $\zeta$ 因子，留下全纯、绝对收敛的余项乘积。整数幂保证提取的因子仍是亚纯函数；这是一种已知的文献方法，并不是本书已经完成的 O-5 应用。

具体的参数对应从 $\beta(v)=\lfloor(v+1)/\varphi\rfloor+v\varphi\ge\sqrt5\,v-1$ 出发。记 $H_\epsilon=\{s:\operatorname{Re}s>\epsilon\}$。给定 $0<\epsilon<1/\varphi^2$，取 $M\ge1$ 使 $\epsilon(\sqrt5(M+1)-1)\ge2$；待建立的截断接口是在 $H_\epsilon$ 上证明尾项解析，并一致满足

$$
\left|\sum_{v>M}p^{-s\beta(v)}\right|
\le \frac{p^{-2}}{1-2^{-\epsilon\sqrt5}}.
$$

这一估计的纸面依据是用 $p^{-\epsilon(\sqrt5\,v-1)}$ 控制各项，再求比值为 $p^{-\epsilon\sqrt5}$ 的几何级数；解析性则需衔接局部一致收敛。保留的权重为 $b_v=\beta(v)$（$1\le v\le M$），取 $\ell_v(s)=b_vs$、$a_v=1$。其最小权重为 $\beta(1)=\varphi^2$，因此 BEL 的域在此对应为

$$
W(\ell;\epsilon\varphi^2)=H_\epsilon,
\qquad W(\ell;1)=H_{1/\varphi^2}.
$$

这些参数给出原始函数胚的截断目标；[@rem-o5-finite-cancellation] 保留完整的有限代数论证，[@thm-o5-finite-integer-cancellation] 则同时给出任意有限阶消去与其一致解析求值。应用该定理之前，仍须为实际的无限尾项 $R_p(s)=\sum_{v>M}p^{-s\beta(v)}$ 建立上述解析性与统一界，并证明它确实是原始局部因子减去保留项的余项。随后可取 $J=\{1,\ldots,M\}$、$a_v=1$、$b_v=\beta(v)$、$m=\varphi^2$、$A=(1-2^{-\epsilon\sqrt5})^{-1}$，再选 $N$ 使 $(N+1)\epsilon m\ge2$。该有限定理允许相等或有有理关系的权重，并在这个半平面上控制负校正指数带来的分母；不必先把同权重的多重指标合并。

此后仍须建立相应的 $\zeta$ 因子分解恒等式，证明余项素数乘积局部一致收敛，为**每个** $\epsilon>0$ 构造延拓，并使重叠半平面上的正规形式亚纯代表相容，拼成 $H_0$ 上的函数；一个固定截断不够。条件 2 还要求在原始域 $H_{1/\varphi^2}$ 的**每一点**都等于 $E(s)$，包括表面奇点可去时应取的值。亚纯函数胚相等，并不保证任意仅满足 `MeromorphicOn` 的函数逐点相等，所以上述正规形式与单点改值的限制仍须保留。这些原始尾项接口、无穷乘积与拼接步骤尚未在本书中形式化；有限定理也不给出局部因子或乘积的非零性，更不给出条件 3 的零点定位。O-5 仍然开放，条件 3 仍需另行研究。
:::

::: {.remark #rem-o5-finite-cancellation title="整数 Euler 消去的有限代数形式"}
**文献中的无穷展开与有限消去的完整论证。** Delabarre 在第 2.2 节引理 2 中给出已发表的整数指数展开[^delabarre-cancellation]。用有限变量集 $J$ 重记其变量，令 $a_j\in\mathbb Z$、$S=\sum_{j\in J}|a_j|$。当 $S>0$ 且每个 $|Y_j|<1/S$ 时，

$$
Q(Y):=1+\sum_{j\in J}a_jY_j
=\prod_{\nu\in\mathbb N^J\setminus\{0\}}(1-Y^\nu)^{\gamma(\nu)},
\qquad \gamma(\nu)\in\mathbb Z,
$$

这里 $Y^\nu=\prod_jY_j^{\nu_j}$，右侧绝对收敛；原文式 (6) 给出指数公式，评注 4 指出可按总次数归纳证明其整数性。若 $S=0$（包括 $J$ 为空），则 $Q=1$，可直接取所有指数为零，不使用 $1/S$。若把展开写成 $Q\prod_\nu(1-Y^\nu)^{c_\nu}=1$，校正指数的符号约定就是 $c_\nu=-\gamma(\nu)$。下面保留这种消去法清除分母后的**完整书面论证**，作为 [@thm-o5-finite-integer-cancellation] 代数部分的解释。有限多项式结论并非引理 2 的逐字陈述，也不主张新的文献方法；上面的已发表无穷展开并不是下述有限 Lean 定理的结论。

在 $\mathbb Z[X_j:j\in J]$ 中，记 $|\nu|=\sum_j\nu_j$、$X^\nu=\prod_jX_j^{\nu_j}$，并任取 $N\in\mathbb N$。有限集

$$
E_N=\{\nu\in\mathbb N^J:1\le|\nu|\le N\}
$$

上存在整数 $c_\nu$。令 $c_\nu^+=\max(c_\nu,0)$、$c_\nu^-=\max(-c_\nu,0)$，则可得到以下有限多项式恒等式：

$$
\begin{aligned}
U&=\prod_{\nu\in E_N}(1-X^\nu)^{c_\nu^+},\\
V&=\prod_{\nu\in E_N}(1-X^\nu)^{c_\nu^-},\\
QU&=V+\sum_{t\in T}h_tX^t,
\qquad |t|\ge N+1\quad(t\in T).
\end{aligned}
$$

这里取 $H_{\mathrm{poly}}=QU-V$、$T=\operatorname{supp}(H_{\mathrm{poly}})$、$h_t=[X^t]H_{\mathrm{poly}}\in\mathbb Z$，所有幂的指数都是自然数；负的 $c_\nu$ 只使相应因子进入 $V$。特别地，$N=0$ 时 $E_N$ 为空，$U=V=1$，余项为 $Q-1$，其常数项为零，但余项一般不为零。

为证明此式，令 $\mathcal F_d$ 为总次数小于 $d$ 的系数全为零的多项式集合。有限系数卷积中每一项的次数相加，故 $\mathcal F_d$ 对加减和任意多项式乘法封闭，且

$$
\mathcal F_r\mathcal F_s\subseteq\mathcal F_{r+s},
\qquad \mathcal F_{d+1}\subseteq\mathcal F_d.
$$

从 $U=V=1$ 开始，$H=QU-V=Q-1\in\mathcal F_1$，且 $U,V$ 的常数项均为 $1$。设已到第 $d\ge1$ 层，$H\in\mathcal F_d$。因 $J$ 有限，$L_d=\{\nu:|\nu|=d\}$ 有限。置 $r_\nu=[X^\nu]H$、$h_d=\sum_{\nu\in L_d}r_\nu X^\nu$，并取

$$
\begin{aligned}
A&=\prod_{\nu\in L_d}(1-X^\nu)^{\max(r_\nu,0)},\\
B&=\prod_{\nu\in L_d}(1-X^\nu)^{\max(-r_\nu,0)}.
\end{aligned}
$$

自然数次幂的二项展开给出 $(1-X^\nu)^m=1-mX^\nu$ 加上属于 $\mathcal F_{2d}$ 的项。有限乘积中选取两个或更多非常数项，也至少有次数 $2d$。由于 $2d\ge d+1$，得到

$$
A-1,\ B-1\in\mathcal F_d,
\qquad A-B+h_d\in\mathcal F_{d+1}.
$$

把 $U,V$ 分别更新为 $UA,VB$。处理旧分母因子 $V$ 与新层的相互作用，需用精确恒等式

$$
\begin{aligned}
QUA-VB
&=HA+V(A-B)\\
&=H+(A-B)+H(A-1)+(V-1)(A-B).
\end{aligned}
$$

其中 $H-h_d\in\mathcal F_{d+1}$，故 $H+(A-B)\in\mathcal F_{d+1}$；又有 $H(A-1)\in\mathcal F_{2d}\subseteq\mathcal F_{d+1}$。旧 $V$ 的常数项为 $1$，于是 $V-1\in\mathcal F_1$，从而 $(V-1)(A-B)\in\mathcal F_{d+1}$。新 $H$ 因此属于 $\mathcal F_{d+1}$，而更新后的 $U,V$ 常数项仍为 $1$。这同时消去第 $d$ 层并保留全部较低次数的消去结果。

依次做 $d=1,\ldots,N$，在互不相交的层上指定 $c_\nu=r_\nu$，即得所列 $U,V$，且 $H=QU-V\in\mathcal F_{N+1}$。取 $T$ 为最终 $H$ 的有限支集、$h_t=[X^t]H$，便得余项及其次数界。每层校正指数由该层残差系数唯一确定，这也与文献展开中 $c=-\gamma$ 的符号相合。作为手算检查，$Q=1+X$ 时，$N=1$ 给出 $c_1=1$、$H=-X^2$；$N=2$ 再取 $c_2=-1$，则 $U=1-X$、$V=1-X^2$、$H=0$。

上述选择全在引入解析权重之前完成。对任意 $z=(z_j)_{j\in J}\in\mathbb C^J$，多项式求值保持有限和、积与自然数次幂，故

$$
Q(z)U(z)=V(z)+\sum_{t\in T}h_tz^t
$$

在每个 $z$ 都成立，即使某个 $1-z^\nu=0$；这里没有除法。代入 $z_j=p^{-b_js}$ 后，不同多重指标可能因权重的有理关系而合并，但不会破坏这个恒等式。这个多项式恒等式本身不包含一致解析估计、可除性或非零性。下面的定理另给出带明确假设的一致解析结论；原始尾项、素数乘积、正规形式拼接和逐点相等义务仍如上条评注所述，O-5 的条件 2、3 不由有限消去解决。
:::

::: {.theorem #thm-o5-finite-integer-cancellation title="有限整数 Euler 消去及其一致解析求值" lean="D5/S3/Analytic/EulerGerm/FiniteIntegerEulerCancellation.finite_integer_euler_cancellation"}
对每个有限集 $J$、每个整数系数族 $a:J\to\mathbb Z$ 和每个 $N\in\mathbb N$，存在 $c:E_N\to\mathbb Z$，使下述各项同时成立。这里 $J$ 允许为空，$N$ 允许为 $0$，$a_j$ 与 $c(u)$ 均无符号限制；$|u|=\sum_j u_j$，$E_N=\{u:J\to\mathbb N:1\le|u|\le N\}$。对这个 $c$ 定义

$$
\begin{aligned}
Q&=1+\sum_j a_jX_j,\\
U&=\prod_{u\in E_N}(1-X^u)^{\max(c(u),0)},\\
V&=\prod_{u\in E_N}(1-X^u)^{\max(-c(u),0)},\\
H_{\mathrm{poly}}&=QU-V,\qquad T=\operatorname{supp}(H_{\mathrm{poly}}),\\
h_t&=[X^t]H_{\mathrm{poly}}\quad(t\in T).
\end{aligned}
$$

$T$ 是实际的有限多项式支集。令 $d$ 为 `Data` 中的有限数据，指标集为 $J,E_N,T$，其各字段为

$$
\begin{aligned}
d.\mathrm{linear}(j)&=a_j,&d.\mathrm{mode}(u,j)&=u_j,\\
d.\mathrm{power}(u)&=c(u),&d.\mathrm{tailMode}(t,j)&=t_j,\\
d.\mathrm{tailCoeff}(t)&=h_t.
\end{aligned}
$$

这正是 `tailData a (polynomialMode N) c`；`polynomialMode` 只把有限集上的普通函数转成相同的有限支集多重指标。

1. 对每个 $u:J\to\mathbb N$，若 $|u|\le N$，则 $[X^u]H_{\mathrm{poly}}=0$。
2. $d$ 满足 `Data.Certificate`，即对所有 $z\in\mathbb C^J$，

   $$
   Q(z)U(z)=V(z)+\sum_{t\in T}h_tz^t.
   $$

   这包括校正二项式 $1-z^u$ 为零的点；此式只用自然数次幂，不含除法。
3. 对每个 $u\in E_N$，$1\le\sum_jd.\mathrm{mode}(u,j)\le N$。
4. 对每个 $t\in T$，$N+1\le\sum_jd.\mathrm{tailMode}(t,j)$。
5. 对每个 $b:J\to\mathbb R$ 和每个 $m,\epsilon,A\in\mathbb R$，若

   $$
   \begin{aligned}
   &m>0,\qquad b_j\ge m\quad(j\in J),\\
   &\epsilon>0,\qquad A\ge0,\qquad 2\le(N+1)\epsilon m,
   \end{aligned}
   $$

   则存在 $C\in\mathbb R$、$C\ge0$，使对每个族 $R:\operatorname{Primes}\to(\mathbb C\to\mathbb C)$，只要对所有素数 $p$ 都有

   $$
   \begin{aligned}
   &\operatorname{AnalyticOnNhd}_{\mathbb C}(R_p,H_\epsilon),\\
   &\|R_p(s)\|\le A/p^2\quad(s\in H_\epsilon),
   \end{aligned}
   $$

   就对所有素数 $p$ 都有

   $$
   \begin{aligned}
   &\operatorname{AnalyticOnNhd}_{\mathbb C}(K_p,H_\epsilon),\\
   &\|K_p(s)-1\|\le C/p^2\quad(s\in H_\epsilon).
   \end{aligned}
   $$

   这里 $H_\epsilon=\{s\in\mathbb C:\operatorname{Re}s>\epsilon\}$，并定义

   $$
   \begin{aligned}
   z_j(p,s)&=\exp(-b_js\log p),\\
   K_p(s)&=\bigl(Q(z(p,s))+R_p(s)\bigr)
   \prod_{u\in E_N}(1-z(p,s)^u)^{c(u)}.
   \end{aligned}
   $$

   $\log p$ 是正实数 $p$ 的实对数，$K_p$ 正是 `Data.corrected`，其中幂为整数次幂。`AnalyticOnNhd` 指函数在集合每一点的某个邻域中复解析。

量词顺序为：先给定 $J,a,N$，再选 $c$；该 $c$ 同时适用于全部 $b,m,\epsilon,A$。固定后四者并满足假设后，先选 $C$，再任取整个扰动族 $R$；$C$ 同时适用于全部素数和整个半平面。截断条件允许等号，不要求权重互异或有理无关。
:::

::: proof
[@rem-o5-finite-cancellation] 的完整逐层论证解释了代数部分。Lean 用变量理想的幂表示总次数过滤，逐层消去后补齐 $E_N$ 上未使用的零指数；有限支集与普通函数多重指标之间的转换保持总次数。残差支集中的每个系数非零，故第一项推出第四项；对该实际支集作多项式求值，就得到第二项的全体复数证书。

解析部分复用 `evaluated_certificate_uniform`。令 $q=\exp(-m\epsilon\log2)<1$。在 $H_\epsilon$ 上每个校正单项式的模至多为 $q$，所以 $1-z^u$ 不为零，整数次幂在此解析。令

$$
\begin{aligned}
U_0&=\prod_{u\in E_N}(1+q)^{\max(c(u),0)},\\
V_0&=\prod_{u\in E_N}(1-q)^{\max(-c(u),0)}>0,\\
D_0&=\sum_{t\in T}|h_t|.
\end{aligned}
$$

次数间隙与 $(N+1)\epsilon m\ge2$ 给出每个尾单项式的模至多为 $p^{-2}$。仅在已证明 $V(z)\ne0$ 的这个半平面上，把证书改写为

$$
K_p(s)-1=\frac{\sum_{t\in T}h_tz^t+R_p(s)U(z)}{V(z)}.
$$

于是可取 $C=(D_0+AU_0)/V_0$，它不依赖 $R,p,s$。这里的除法只用于此解析域内的估计，并不把全体复数上的多项式证书改成在二项式零点处也可相除的断言。完整证明由 Lean 内核检查。
:::

这个结果只构造有限代数校正并给出满足假设时的逐素数解析估计。它不证明上述实际无限 $\beta$ 尾项满足假设，不构造无穷素数乘积或全局延拓，也不声称 $K_p$ 或乘积非零。[@thm-o5-prime-two-local-zero] 的局部零点与上述正规形式、单点改值限制均保持原来的范围；O-5 及黎曼猜想不由此得到证明或反驳。

[^bel-continuation]: G. Bhowmik, D. Essouabri, B. Lichtin, *Meromorphic continuation of multivariable Euler products*, [DOI: 10.1515/forum.2007.044](https://doi.org/10.1515/forum.2007.044)。这里的原文定位采用[作者预印本](https://arxiv.org/pdf/math/0502508v1)第 1.1 节：引理 1 及其证明，第 5–8 页，尤其式 (2)–(4) 中的一致解析扰动；定理 1 及其证明，第 8–10 页，将方法用于单位多圆盘上常数项为零、Taylor 系数为整数的解析幂级数。这些文献结论未在本书形式化。

[^delabarre-cancellation]: L. Delabarre, *Extension of Estermann's theorem to Euler products associated to a multivariate polynomial*, *Bulletin de la Société Mathématique de France* **141**(2) (2013), 225–265，[DOI: 10.24033/bsmf.2647](https://doi.org/10.24033/bsmf.2647)，[期刊原文](https://www.numdam.org/item/BSMF_2013__141_2_225_0.pdf)。第 1.1 节规定系数为整数；第 2.2 节引理 2、式 (5)–(6) 与评注 4 见印刷页 233，证明见 234–235 页。这里引用的是已发表的整数指数展开；本评注另行完整写出其有限消去形式的证明。

O-5 的原始陈述、上述局部零点与有限消去结果及正规形式和单点改值限制，出自 trureturing 所钉提交中的下列文件：

- `D5/X_Frontier/Hearts.lean`：O-5 的陈述 `o5_independence` 及其中的定义；
- `README.md` 与 `docs/VISION.md`：把 O-5 列为开放问题；
- `Blueprint/D5/X_Frontier/GoldenWindowZeroObstruction.md`：上面两条已证结果；
- `Blueprint/D5/S1/Deficit/Beatty/GoldenSpectralCoordinate.md`：换算 $\varphi^2 \cdot 1/(2\varphi^2) = 1/2$；
- `D5/S3/Analytic/GoldenEulerBeta.lean` 与 `D5/S3/Analytic/EulerGerm/GoldenLocalFactor.lean`：`o5Beta` 与原始局部因子 `germLocalFactor` 的定义；
- [`GermZeroCertificate`](lean:D5/S3/Analytic/GermWindow/GermZeroCertificate.germLocalFactor_two_has_zero_near_candidate)：[@thm-o5-prime-two-local-zero] 的公开声明；圆心与矩形归约在同目录的 `GermZeroCertificateReduction.lean`，曲率界在 `GermZeroCertificateJet.lean`；
- [`FiniteIntegerEulerCancellation`](lean:D5/S3/Analytic/EulerGerm/FiniteIntegerEulerCancellation.finite_integer_euler_cancellation)：[@thm-o5-finite-integer-cancellation] 的声明，以及同模块中的 `linearPolynomial`、`correctionProduct`、`residual`、`FunctionMode`、`polynomialMode` 与 `tailData`；对应说明为 `Blueprint/D5/S3/Analytic/EulerGerm/FiniteIntegerEulerCancellation.md`；
- [`EvaluatedEulerCertificate`](lean:D5/S3/Analytic/EulerGerm/EvaluatedEulerCertificate.evaluated_certificate_uniform)：一致解析求值所复用的声明，以及同模块中的 `Data`、`Data.Certificate`、`point` 与 `Data.corrected`。

[^conv]: 在 `Hearts.lean` 中，$Z$ 的亚纯性是 Mathlib 的 `MeromorphicOn`，它不约束函数在极点处取什么值；条件 3 要求 $Z$ 在 $s$ 处解析（`AnalyticAt`），正是为了让零点的判断不受这些值影响。$E$ 中的无穷和与无穷积是 Lean 的无条件和与无条件积，不收敛时 Lean 赋予约定值（和为 $0$，积为 $1$）；猜想只在 $\operatorname{Re} s > 1/\varphi^2$ 上用到 $E$。
