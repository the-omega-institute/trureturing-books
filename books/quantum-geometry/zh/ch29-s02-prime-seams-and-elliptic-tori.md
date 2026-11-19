# 23.2 $\pm 1$ 算术接缝、素数二象性与椭圆曲线环面上的 $S^3$ 投影 {#sec-coda-primes-elliptic-curves}

当我们凝视希帕索斯在整数网格上留下的那道佩尔余项 $m^2 - 2n^2 = \pm 1$（[@thm-ch29-silver-pell-remainder]）时，一个更深邃的数论追问自然浮现：**这道在 $+1$ 与 $-1$ 之间交替跳荡的算术接缝，难道仅仅是 $\sqrt{2}$ 的孤立巧合吗？它与素数的分布、椭圆曲线的拓扑以及全书反复出现的 $\cos\theta$ 投影究竟有着怎样的关联？**

顺着这道 $\pm 1$ 裂隙向下挖掘，数论、代数几何与量子旋量几何在三座桥梁上轰然汇合。

## 23.2.1 第一座桥：$\pm 1$ 佩尔接缝将奇素数一分为二——“线素数”与“面素数” {#sec-coda-pell-prime-splitting}

在自然数的底层网格中，一旦最小偶素数 $2$ 与最小奇素数 $3$ 张成六角密排周期基底 $2 \times 3 = 6$，此后一切大于 $3$ 的素数 $p \ge 5$ 都只能栖居在 $6$ 的倍数的两侧接缝上：

$$
p = 6k \pm 1.
$$

更深刻的分岔发生在把佩尔方程 $m^2 - 2n^2 = \pm 1$ 中的基底 $2$ 替换为任意奇素数 $p$ 的那一刻——考察广义佩尔方程

$$
m^2 - p\,n^2 = \pm 1.
$$

表面上看，右边只是 $+1$ 与 $-1$ 的符号之差；但在克利福德二维外积平面中，$-1$ 正是反自伴幺正复结构算子（双向量虚数生成元）$\hat{\mathbf{I}}$ 的平方 $\hat{\mathbf{I}}^2 = -1$（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）！取决于在模 $p$ 算术下能否开出 $\sqrt{-1}$（即二次剩余勒让德符号 $\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2}$ 取 $+1$ 还是 $-1$；这道分界由下文的手工推导 2 从冻结定理得出），全体奇素数被这道 $\pm 1$ 接缝严格劈成两族几何维度截然不同的素数：

**面素数**是 $p \equiv 1 \pmod 4$ 的奇素数（$5, 13, 17, 29, 37, \dots$），**线素数**是 $p \equiv 3 \pmod 4$ 的奇素数（$3, 7, 11, 19, 23, \dots$）。这道分界的主体已冻结在所钉的 `trureturing@dev` 中，下面的两个引理与两个定理都由 Lean 内核检查。先看最朴素的机制：把整数的平方放到只有四格的模 $4$ 表盘上。偶数 $2k$ 的平方是 $4k^2$，落在第 $0$ 格；奇数 $2k + 1$ 的平方是 $4(k^2 + k) + 1$，落在第 $1$ 格。两个平方相加只能落在第 $0$、$1$、$2$ 格，第 $3$ 格永远空着。

::: {.figure src="ch29-mod-four-dial"}
**模 $4$ 表盘：两个平方之和只落在第 $0$、$1$、$2$ 格，第 $3$ 格永远空着。** 青色的三格标着落在那里的两个平方余数之和 $0 + 0$、$0 + 1$、$1 + 1$；品红虚线围出的第 $3$ 格是空的，左边品红的线素数 $3, 7, 11, 19, 23$ 正指向它，右边青色的面素数 $5, 13, 17, 29, 37$ 落在第 $1$ 格（[@lem-ch29-square-residues-mod-four]）。
:::

::: {.lemma #lem-ch29-square-residues-mod-four title="平方数模 4 只取 0 或 1，两平方和模 4 不等于 3" lean="D5/S3/PrimeForms/QuadraticResidues.square_residues_and_sum_obstruction"}
对每个自然数 $n$，有 $n^2 \bmod 4 = 0$ 或 $n^2 \bmod 4 = 1$；对所有自然数 $a, b$，有 $(a^2 + b^2) \bmod 4 \neq 3$。
:::

::: proof
Lean 证明就是上面的表盘。把 $n$ 写成 $r + 2k$，其中 $r \in \{0, 1\}$ 是 $n$ 除以 $2$ 的余数；对 $r = 0$ 与 $r = 1$ 分别展开平方（`ring_nf`），读出余数 $0$ 与 $1$（`omega`）。第二部分让 $a^2$、$b^2$ 的余数各取两种可能，四种组合之和是 $0, 1, 1, 2$，没有一个是 $3$。完整证明由 Lean 内核检查。
:::

表盘立刻说明线素数**写不成**两平方和：$p \bmod 4 = 3$ 恰是那个空格。反方向——面素数**一定写得成**——却不是表盘能看出来的，它要求模 $p$ 算术里真的住着一个 $90^\circ$ 旋转。

::: {.viz src="pythagoras-number-escape" preset="seven" height="500"}
**$7$：圆上没有格点。** 半径 $\sqrt{7}$ 的品红圆从格点之间穿过，一个也碰不到：$7 \bmod 4 = 3$，正落在表盘上那个空格里，$7$ 写不成两个平方之和（[@lem-ch29-square-residues-mod-four]），是线素数。
:::

::: {.theorem #thm-ch29-face-prime-two-squares title="模 4 余 1 的素数是两个平方之和；高斯整数乘以其共轭等于两平方和" lean="D5/S3/PrimeForms/SumTwoSquares.prime_eq_sq_add_sq_of_mod_four_eq_one D5/S3/PrimeForms/GaussianIntegers/GaussianIntegerNorm.gaussian_integer_mul_conj_eq_sq_add_sq"}
1. 设自然数 $p$ 为素数且 $p \bmod 4 = 1$，则存在自然数 $a, b$ 使 $p = a^2 + b^2$。
2. 对任意整数 $a, b$，在复数域 $\mathbb{C}$ 中有 $(a + bi)\,\overline{(a + bi)} = a^2 + b^2$。
:::

::: proof
第一部分在 Lean 文件里只有一层包装：由 $p \bmod 4 = 1$ 得 $p \bmod 4 \neq 3$，再调用 Mathlib 的费马两平方和定理 `Nat.Prime.sq_add_sq`。后者在高斯整数环 $\mathbb{Z}[i]$ 中论证：$p \bmod 4 \neq 3$ 时 $-1$ 是模 $p$ 的平方（`ZMod.exists_sq_eq_neg_one_iff`），于是有 $0 \le k < p$ 使 $p \mid k^2 + 1 = (k + i)(k - i)$；两个因子的范数 $k^2 + 1$ 都小于 $p$ 的范数 $p^2$，$p$ 哪一个也整除不了，所以 $p$ 不是 $\mathbb{Z}[i]$ 的素元。在欧几里得环 $\mathbb{Z}[i]$ 中这等于说 $p$ 可约：$p = uv$，$u, v$ 都不是单位。范数相乘得 $N(u)\,N(v) = p^2$ 且两者都不为 $1$，只能 $N(u) = p$；取 $a, b$ 为 $u$ 的实部与虚部的绝对值，就得到 $p = a^2 + b^2$。第二部分先用 `Complex.mul_conj` 把 $z\,\overline{z}$ 改写成模长平方，再对 $z = a + bi$ 算出模长平方 $a^2 + b^2$（`norm_num`）。完整证明由 Lean 内核检查。
:::

几何上，$p = a^2 + b^2$ 说的是半径 $\sqrt{p}$ 的圆穿过格点 $(a, b)$；第二部分把它写成高斯平面上一对共轭向量之积 $p = (a + bi)(a - bi)$。把 $i$ 读成上文的双矢量生成元 $\hat{\mathbf{I}}$，素数 $p$ 便张开了一块正交的面，这正是“面素数”一词的来历。线素数则还有一种更强的刚性：它不但自己写不成两平方和，一旦整除某个两平方和，还必须同时整除两条直角边。

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**面素数与线素数。** 半径 $\sqrt{p}$ 的圆穿过格点时，$p = a^2 + b^2$ 是面素数，把 $a + bi$ 平方就得到整数直角三角形；用图下方的时间轴逐个走过奇素数，$p \equiv 3 \pmod 4$ 时圆上一个格点也没有。
:::

::: {.lemma #lem-ch29-line-prime-descent title="模 4 余 3 的素数整除两平方和时整除两个底数" lean="D5/S3/PrimeForms/ThreeModFourDescent.prime_dvd_dvd_of_dvd_sq_add_sq"}
设 $q$ 为素数，$q \bmod 4 = 3$，$a, b$ 为自然数。若 $q \mid a^2 + b^2$，则 $q \mid a$ 且 $q \mid b$。
:::

::: proof
把整除式搬进有限域 $\mathbb{Z}/q\mathbb{Z}$（Lean 中的 `ZMod q`），得到 $a^2 + b^2 = 0$。若 $b \neq 0$，则 $b$ 可逆，$a^2 = -b^2$ 给出 $(a\,b^{-1})^2 = -1$，即 $-1$ 是模 $q$ 的平方；Mathlib 的 `ZMod.mod_four_ne_three_of_sq_eq_neg_sq'` 断言这时 $q \bmod 4 \neq 3$，与假设矛盾。故 $b = 0$，于是 $a^2 = 0$，域中没有零因子，$a = 0$。最后把 $a = 0$、$b = 0$ 译回 $q \mid a$、$q \mid b$。完整证明由 Lean 内核检查。
:::

把两种素数的行为拼起来，就得到一切自然数的判据：面素数与 $2 = 1^2 + 1^2$ 可以随意相乘，线素数却只能成对出现。

::: {.theorem #thm-ch29-two-squares-classification title="两平方和的素因子分解判据" lean="D5/S3/PrimeForms/SumTwoSquaresClassification.eq_sq_add_sq_iff_even_factorization"}
对自然数 $n$ 与素数 $q$，记 $v_q(n)$ 为 $q$ 在 $n$ 的素因子分解中的指数（$q \nmid n$ 时为 $0$；按 Lean 的约定，$n = 0$ 时一切指数都为 $0$）。则对每个自然数 $n$：存在自然数 $a, b$ 使 $n = a^2 + b^2$，当且仅当对每个满足 $q \bmod 4 = 3$ 的素数 $q$，$v_q(n)$ 都是偶数。
:::

::: proof
Lean 文件只做形式转换：Mathlib 的 `Nat.eq_sq_add_sq_iff` 只对整除 $n$ 的素数陈述条件，并用 $p$ 进赋值 `padicValNat` 记指数；包装把它改写成对一切素数的形式——整除 $n$ 的素数两种指数相等（`Nat.factorization_def`），不整除 $n$ 的素数指数为 $0$（`Nat.factorization_eq_zero_of_not_dvd`），$n = 0$ 时两边都成立。数学内容在 Mathlib 的证明里，它经过中间形式“$n = g^2 m$，且 $-1$ 是模 $m$ 的平方”。$\Rightarrow$：若 $n = x^2 + y^2 > 0$，提出 $g = \gcd(x, y)$，余下 $m = x_1^2 + y_1^2$ 中 $x_1, y_1$ 互素，$-1$ 是模 $m$ 的平方；模 $4$ 余 $3$ 的素数若整除 $m$，$-1$ 就成了模它的平方，不可能，所以 $v_q(n) = 2v_q(g)$。$\Leftarrow$：把 $n$ 写成平方数乘无平方因子的 $m$；指数条件使 $m$ 不含模 $4$ 余 $3$ 的素因子，$-1$ 是模 $m$ 每个素因子的平方，由中国剩余定理也是模 $m$ 的平方；再对 $m$ 的素因子归纳：每个素因子是两平方和（费马定理），而两平方和之积仍是两平方和，

$$
(x^2 + y^2)(u^2 + v^2) = (xu - yv)^2 + (xv + yu)^2,
$$

最后乘回平方因子。完整证明由 Lean 内核检查。
:::

**三条手工推导。** 下面三条结论没有单独冻结；除初等的同余运算外，它们只用到上面的引理与定理（推导本身是本书的手工推导）：

1. **奇素数 $p$ 是两平方和，当且仅当 $p \equiv 1 \pmod 4$。** 充分性是 [@thm-ch29-face-prime-two-squares] 的第一部分；必要性来自 [@lem-ch29-square-residues-mod-four]：奇素数模 $4$ 只能余 $1$ 或 $3$，而第 $3$ 格是空的。
2. **对奇素数 $p$，同余方程 $x^2 \equiv -1 \pmod p$ 有解，当且仅当 $p \equiv 1 \pmod 4$。** 若 $p \equiv 1$，取 $p = a^2 + b^2$：$b = 0$ 会使素数 $p = a^2$ 成为平方数，而 $b^2 \le p < p^2$ 给出 $b < p$，所以 $0 < b < p$，$b$ 模 $p$ 可逆；由 $a^2 \equiv -b^2$ 得 $x \equiv a\,b^{-1}$ 满足 $x^2 \equiv -1$。若 $p \equiv 3$ 而 $x^2 \equiv -1$，取 $0 \le x < p$，则 $p \mid x^2 + 1^2$，[@lem-ch29-line-prime-descent] 给出 $p \mid 1$，矛盾。这就是上文“能否在模 $p$ 算术中开出 $\sqrt{-1}$”的分界。
3. **线素数的负佩尔方程无解：$p \equiv 3 \pmod 4$ 时，$m^2 - p\,n^2 = -1$ 没有整数解。** 否则 $m^2 + 1 = p\,n^2$，于是 $p \mid \lvert m\rvert^2 + 1^2$，[@lem-ch29-line-prime-descent] 再次给出 $p \mid 1$。右边的 $+1$ 却可以达到，例如 $2^2 - 3 \cdot 1^2 = +1$、$8^2 - 7 \cdot 3^2 = +1$。

::: {.viz src="pythagoras-number-escape" preset="locked" height="500"}
**$d = 7$：永远到不了 $-1$。** 渐近分数 $2/1, 3/1, 5/2, 8/3, \dots$ 沿直线 $m = \sqrt{7}\,n$ 越贴越近，$m^2 - 7n^2$ 依次是 $-3, +2, -3, +1$ 并循环：品红的点（差为负）只到 $-3$，每一圈都回到青色的 $+1$（如 $8/3$），却从不碰到 $-1$。这正是手工推导 3。
:::

::: {.example #ex-ch29-face-and-line-primes title="面素数的两条直角边、模 p 的 90° 旋转，以及 2024 至 2027 四个年份"}
前五个面素数的分解、由手工推导 2 构造的 $\sqrt{-1}$，以及供下面文献评注对照的负佩尔方程最小正解如下（$n \ge 1$ 中最小者；表中每个数都可以用整数运算直接验算）：

| $p$ | $p = a^2 + b^2$ | $p = (a + bi)(a - bi)$ | $x \equiv \pm a\,b^{-1}$，$x < p/2$ | $x^2 + 1$ | 负佩尔方程最小解 $(m, n)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $5$ | $1^2 + 2^2$ | $(1 + 2i)(1 - 2i)$ | $2$ | $5 = 1 \cdot 5$ | $(2, 1)$ |
| $13$ | $2^2 + 3^2$ | $(2 + 3i)(2 - 3i)$ | $5$ | $26 = 2 \cdot 13$ | $(18, 5)$ |
| $17$ | $1^2 + 4^2$ | $(1 + 4i)(1 - 4i)$ | $4$ | $17 = 1 \cdot 17$ | $(4, 1)$ |
| $29$ | $2^2 + 5^2$ | $(2 + 5i)(2 - 5i)$ | $12$ | $145 = 5 \cdot 29$ | $(70, 13)$ |
| $37$ | $1^2 + 6^2$ | $(1 + 6i)(1 - 6i)$ | $6$ | $37 = 1 \cdot 37$ | $(6, 1)$ |

线素数 $3, 7, 11, 19, 23$ 一行也填不出来：第二列被 [@lem-ch29-square-residues-mod-four] 挡住，第四列与最后一列分别由手工推导 2 与 3 排除。

再把 [@thm-ch29-two-squares-classification] 用到几个具体的数上：

| $n$ | $n \bmod 4$ | 素因子分解 | 模 $4$ 余 $3$ 的素数的指数 | 两平方和 |
| :---: | :---: | :---: | :---: | :---: |
| $45$ | $1$ | $3^2 \cdot 5$ | $v_3 = 2$ | $3^2 + 6^2$ |
| $2024$ | $0$ | $2^3 \cdot 11 \cdot 23$ | $v_{11} = 1$，$v_{23} = 1$ | 不是 |
| $2025$ | $1$ | $3^4 \cdot 5^2$ | $v_3 = 4$ | $0^2 + 45^2 = 27^2 + 36^2$ |
| $2026$ | $2$ | $2 \cdot 1013$ | 没有这样的素因子 | $1^2 + 45^2$ |
| $2027$ | $3$ | $2027$（素数） | $v_{2027} = 1$ | 不是 |

$2027$ 在表盘上就被拦下；$2024$ 模 $4$ 余 $0$，表盘拦不住它，挡住它的是奇指数 $v_{11} = v_{23} = 1$。$45$ 展示下降：$3 \mid 3^2 + 6^2$，按 [@lem-ch29-line-prime-descent] 它同时整除 $3$ 与 $6$，约去 $3^2$ 剩下 $5 = 1^2 + 2^2$，指数 $v_3$ 一次降 $2$。$2026 = 2 \cdot 1013$ 中的 $1013$ 模 $4$ 余 $1$，是面素数，$1013 = 22^2 + 23^2$；用上面的乘积恒等式，

$$
\begin{aligned}
2026 &= (1^2 + 1^2)(22^2 + 23^2) \\
&= (22 - 23)^2 + (23 + 22)^2 = 1^2 + 45^2,
\end{aligned}
$$

这正是高斯整数的乘法 $(1 + i)(22 + 23i) = -1 + 45i$ 读出的两条直角边。
:::

::: {.remark #rem-ch29-pell-primes-hilbert-literature title="素数在高斯整数中的分裂与惰性、面素数的负佩尔方程与希尔伯特互反律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 上面的方框与手工推导止步于“写成两平方和”与“整除时的下降”。以下三条经典结论不在本书锁定的 `trureturing@dev` 冻结声明集中：

1. **高斯整数中的分裂、惰性与分歧。** 在高斯整数环 $\mathbb{Z}[i]$ 中，$p \equiv 1 \pmod 4$ 时 $a + bi$ 与 $a - bi$ 是两个互不相伴的高斯素元（分裂）；$p \equiv 3 \pmod 4$ 时 $p$ 本身仍是高斯素元（惰性）；$2 = -i(1 + i)^2$ 是唯一的分歧素数。
2. **面素数的负佩尔方程。** 对每个素数 $p \equiv 1 \pmod 4$，负佩尔方程 $m^2 - p\,n^2 = -1$ 都有整数解（上表最后一列是前五例），因而实二次域 $\mathbb{Q}(\sqrt{p})$ 的基本单位范数为 $-1$。在本书的几何读法中，范数 $-1$ 的单位是一次带手性翻转的滑移反射，平方 $(-1)^2 = +1$ 之后才回到纯旋转分支。线素数一侧的“无解”已由手工推导 3 从冻结引理得出。
3. **希尔伯特互反律。** 对任意非零有理数 $a, b \in \mathbb{Q}^\times$，局部希尔伯特符号 $(a, b)_v \in \{+1, -1\}$ 只在有限多个位 $v$ 处等于 $-1$，且在全体素位与实无穷位上的乘积等于 $+1$：

   $$
   \prod_{v \le \infty} (a, b)_v = +1.
   $$

   在本书的几何读法中，这意味着 $-1$ 手性扭结不会在单个素数轴上孤立出现，它必须在成对的位之间正反相消，与第三部第 10 章“两两比较，永远一致，顺序无关”形成算术呼应。
:::

## 23.2.2 第二座桥：两道二次接缝相交（$2 \times 2 = 4$）——从二次曲线到同余数椭圆曲线环面 {#sec-coda-congruent-elliptic-torus}

如果把单条二次圆锥曲线进一步推广到有理直角三角形勾股斜边与面积同时给定的经典同余数情境，两道二次约束的正交交集便引出以下经典代数几何与黎曼面文献结构：

::: {.remark #rem-ch29-elliptic-torus-literature title="同余数椭圆曲线双有理变换、复环面拓扑与阿贝尔群加法律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在经典数论、代数几何与复黎曼面理论中（未在本书锁定的 `trureturing@dev` 库中形式化），从单条二次曲线向射影三维空间 $\mathbb{P}^3$ 中两个二次曲面交集的跨越由以下经典结论刻画：

- **从亏格 $0$ 二次曲线到同余数椭圆曲线双有理变换**：单个佩尔方程 $m^2 - d\,n^2 = \pm 1$ 只是一条二次圆锥曲线（代数亏格 $g = 0$；仿射上它的解按 $m + n\sqrt{d}$ 的乘法成群，但这是乘法群型的结构，不是椭圆曲线型的）；在复射影几何中，亏格 $0$ 的光滑曲线拓扑上同胚于二维球面 $S^2$（欧拉示性数 $\chi(S^2) = 2$；毛球定理详见第 21 章 [@rem-hairy-ball-adams-literature]），无法承载全局无奇点的平坦群加法流。而在经典的**同余数问题（Congruent Number Problem）**——哪些正整数 $d$ 能够充当有理直角三角形 $(a, b, c) \in \mathbb{Q}_{>0}^3$ 的面积——中，同时联立两条二次约束

  $$
  a^2 + b^2 = c^2 \quad (\text{勾股斜边}), \qquad \frac{1}{2}ab = d \quad (\text{正交双向量面积}),
  $$

  等价于令 $(a + b)^2 = c^2 + 4d$ 与 $(a - b)^2 = c^2 - 4d$ 所定义的两个二次曲面齐次化后在射影三维空间 $\mathbb{P}^3$ 中相交（阶数 $2 \times 2 = 4$）。通过经典双有理变换 $x = (a+c)/b,\; y = 2(a+c)/b^2$（若进一步令 $X = dx = d(a+c)/b,\; Y = d^2 y = 2d^2(a+c)/b^2$ 则化为标准魏尔斯特拉斯形式 $Y^2 = X^3 - d^2 X$），该有理直角三角形面积方程组双有理等价于**同余数椭圆曲线（Congruent-Number Elliptic Curve）**：

  $$
  E_d :\quad d\,y^2 = x^3 - x = x(x - 1)(x + 1),
  $$

  其右端三个根 $0,\; +1,\; -1$ 恰对应原点与 $\pm 1$ 接缝边界。
- **复环面拓扑与阿贝尔群加法律**：在复数域上，被在四个支点 $\{0, +1, -1, \infty\}$ 处切开并双层缝合的黎曼面 $E_d(\mathbb{C}) \cong \mathbb{C}/(\mathbb{Z}\omega_1 \oplus \mathbb{Z}\omega_2)$，不再是亏格 $g = 0$、$\chi = 2$ 的二维球面 $S^2$，而是跃迁为**亏格 $g = 1$、欧拉示性数 $\chi(T^2) = 2 - 2g = 0$ 的二维环面（Torus）$T^2 = S^1 \times S^1$**；
- 因为 $\chi(T^2) = 0$，偶维毛球面的拓扑零点阻碍（见 [@rem-hairy-ball-adams-literature]）在环面上消失：不变全纯微分 $\omega = dx/y$ 在整条光滑射影椭圆曲线上处处非零且无极点，赋予椭圆曲线一个全局光滑的阿贝尔群加法律 $P \oplus Q$（参见下文 [§23.5](ch23-s05-quaternion-diophantine-skeleton.md) [@rem-diophantine-z-in-q-literature] 中关于 Poonen 椭圆曲线整除性锁的文献背景）。
:::

::: {.viz src="hairy-ball-normal-escape" preset="torus" height="500"}
**环面上的箭头处处不为零。** 环面 $\bigl((R + r\cos\theta)\cos\phi,\, (R + r\cos\theta)\sin\phi,\, r\sin\theta\bigr)$（$R > r > 0$）上青色的单位切向量 $\hat{\mathbf{e}}_\phi = (-\sin\phi, \cos\phi, 0)$ 都沿大圈的方向，长度处处为 $1$；琥珀色的点绕大圈走一周，它的箭头一刻也不缩短，环面上没有品红的零点环。$\chi(T^2) = 0$，与球面的 $\chi(S^2) = 2$ 相对（文献结果，未在本书形式化，见 [@rem-ch29-elliptic-torus-literature]）。图中只是拓扑上同一种曲面，不是椭圆曲线本身。
:::

## 23.2.3 第三座桥：有限域椭圆曲线约化、弗罗贝尼乌斯余弦与 $S^3 \cong \mathrm{SU}(2)$ 投影 {#sec-coda-hasse-sato-tate}

更深一层的算术—几何呼应出现在把标准同余数椭圆曲线 $E : y^2 = x^3 - x$ 约化到第 22 章的每一根奇素数轴 $\mathbb{F}_p$（$p \ge 3$）上的时刻：

::: {.remark #rem-ch29-hasse-gauss-literature title="有限域椭圆曲线点数偏差、哈塞界与复乘曲线高斯点数公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在经典算术几何文献中（未包含在本书锁定的 `trureturing@dev` 形式化声明集中），在有限域 $\mathbb{F}_p$（$p \ge 3$）上，平坦射影直线 $\mathbb{P}^1(\mathbb{F}_p)$ 共有 $p + 1$ 个点（含无穷远点），光滑射影椭圆曲线 $E(\mathbb{F}_p)$（$E : y^2 = x^3 - x$）的点数与 $p + 1$ 的偏差由勒让德符号求和

$$
a_p = p + 1 - \#E(\mathbb{F}_p) = -\sum_{x=0}^{p-1} \left(\frac{x^3 - x}{p}\right)
$$

给出，并受到以下两条经典定理的精确刻画：

1. **哈塞定理（Hasse's Theorem，H. Hasse, 1936；有限域上椭圆曲线已获证明的黎曼猜想）**：对任意良约化素数 $p$，点数偏差严格满足

   $$
   |a_p| \le 2\sqrt{p}.
   $$

   分母尺度因子 $\sqrt{p} = p^{1/2}$ 中的指数 $1/2$ 对应有限域局部 zeta 函数的临界线实部 $\sigma = 1/2$。用 $2\sqrt{p}$ 对 $a_p$ 归一化后，哈塞界将每个良约化素数 $p$ 处的点数偏差映射为闭区间 $[-1, +1]$ 内的**弗罗贝尼乌斯余弦角（Frobenius cosine angle）**：

   $$
   \cos\theta_p := \frac{a_p}{2\sqrt{p}} \in [-1, +1], \qquad \alpha_p, \bar{\alpha}_p = \sqrt{p}\,e^{\pm i\theta_p}.
   $$

   用 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-1) 的弦—矢高语言说：归一化的弗罗贝尼乌斯本征值 $\alpha_p/\sqrt p=e^{i\theta_p}$ 是一个旋子，$v_p:=1-\dfrac{a_p}{2\sqrt p}=1-\cos\theta_p$ 是它的矢高；哈塞界 $\lvert a_p\rvert\le2\sqrt p$ 就是 $0\le v_p\le2$，而点数公式 $\#E(\mathbb{F}_{p^n})=p^n+1-\alpha_p^n-\bar\alpha_p^{\,n}$（文献结果）写成 $\#E(\mathbb{F}_{p^n})=(p^{n/2}-1)^2+2p^{n/2}\bigl[1-T_n(1-v_p)\bigr]$，$T_n$ 为第一类切比雪夫多项式。

2. **高斯复乘点数公式与奇素数线/面分野**：在具有 $\mathbb{Z}[i]$ 复乘的勾股同余曲线 $y^2 = x^3 - x$ 上，第一座桥（[@thm-ch29-face-prime-two-squares]、[@lem-ch29-line-prime-descent]）中的两族奇素数在 $\cos\theta_p$ 下截然分开：
   - **在惰性“线素数” $p \equiv 3 \pmod 4$ 上**：由于 $(-x)^3 - (-x) = -(x^3 - x)$ 且 $\left(\frac{-1}{p}\right) = -1$，$+x$ 与 $-x$ 的勒让德符号反号相消，自旋和恒为零：

     $$
     a_p = 0 \implies \cos\theta_p = 0 \quad (\theta_p = \pi/2\text{，正交赤道})！
     $$

   - **在分裂“面素数” $p \equiv 1 \pmod 4$ 上**：对任意满足 $p = a^2 + b^2$、$a$ 为奇数且 $b$ 为偶数的整数 $a,b$，经典高斯公式（文献结果，见 [@rem-ch29-gauss-character-application]）给出 $|a_p| = 2|a|$。因此，弗罗贝尼乌斯余弦的绝对值等于该素数自身高斯直角三角形 $(|a|, |b|, \sqrt{p})$ 的**勾股邻边/斜边余弦**：

     $$
     |\cos\theta_p| = \frac{|a_p|}{2\sqrt{p}} = \frac{|a|}{\sqrt{p}} = \frac{|a|}{\sqrt{a^2 + b^2}}.
     $$
:::

::: {.viz src="pythagoras-number-escape" preset="count" height="500"}
**在模 $13$ 的世界里数点。** 把 $y^2 = x^3 - x$ 放进只有 $13$ 个数的格子里逐格检查：青色的 $4$ 个格点加中性色的 $3$ 个 $y = 0$ 的分支点，再加无穷远点共 $8$ 个，比 $p + 1 = 14$ 少 $6$，即 $a_{13} = 6$。右上的自旋环把 $x = 0, 1, \dots, 12$ 排成一圈，按勒让德符号 $\left(\frac{x^3 - x}{13}\right)$ 着色：$2$ 个青色 $+1$（那一列有一对点 $\pm y$）、$8$ 个品红 $-1$（那一列没有点）、$3$ 个中性色 $0$，和为 $-6$，正是上面公式里的 $-a_{13}$；右边琥珀色的余弦是 $6/(2\sqrt{13}) \approx 0.832$。$13 = 3^2 + 2^2$，而 $6 = 2 \cdot 3$：差正是高斯三角形奇数边的两倍，与上面第 2 条一致（文献结果，未在本书形式化）。
:::

::: {.remark #rem-ch29-gauss-character-application title="从平方纤维到高斯三角形（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为什么同一个奇数直角边 $|a|$ 会出现在曲线的点数中？关键是把点数偏差写成一对共轭复数的和：共轭消去虚部，留下两倍实部；复数的长度则由素数 $p$ 的平方根决定。下面把这条经典特征和推导展开。点数与复乘的背景可参见 Schoof 的综述[^gauss-count-background]。

固定任意素数 $p \equiv 1 \pmod 4$，以及任意满足 $p=a^2+b^2$、$a$ 奇、$b$ 偶的整数 $a,b$。始终取 $F=\mathbb{F}_p$ 和同一条曲线 $E:y^2=x^3-x$。其射影方程为 $Y^2Z=X^3-XZ^2$；判别式为 $64\ne0$，所以曲线光滑。令 $Z=0$ 可知唯一的无穷远点是 $O=[0:1:0]$。记

$$
N=\#E(F),\qquad T=p+1-N=a_p.
$$

令 $\phi(t)=\left(\frac{t}{p}\right)$ 为二次特征，约定 $\phi(0)=0$。每条竖直线 $x=\text{常数}$ 与仿射曲线相交于零个、一个或两个点，因为对每个 $t\in F$，

$$
\#\{y\in F:y^2=t\}=1+\phi(t).
$$

非零平方给两个根，非平方给零个根，$t=0$ 给一个根。因此，真正的曲线点数包含这些竖直纤维和恰好一个 $O$：

$$
N=1+\sum_{x\in F}\bigl(1+\phi(x^3-x)\bigr),\qquad
T=-\sum_{x\in F}\phi(x^3-x).
$$

接着在复数平面中记录这些纤维。由于 $F^\times$ 是阶为 $p-1$ 的循环群，且 $4\mid p-1$，可以选取一个恰好四阶的乘法特征 $\chi:F\to\mathbb{C}$，在零处同样延拓为零。它在非零元素上的值为 $1,i,-1,-i$，平方就是唯一的非平凡二次特征。因此 $\chi^2=\phi$，其中整数值 $\phi$ 在复数公式中按通常嵌入理解。这里 $\chi$ 是从 $p$ 构造的辅助量，并非附加假设；$\phi(-1)=1$，且 $\chi,\phi,\chi\phi=\chi^{-1}$ 都非平凡。

定义 Jacobi 和

$$
J(\chi,\phi)=\sum_{t\in F}\chi(t)\phi(1-t).
$$

现在按 $t=x^2$ 归组。因为 $\chi(x^2)=\phi(x)$，有 $\phi(x^3-x)=\chi(x^2)\phi(x^2-1)$。每个平方纤维的权重只依赖 $t$，故

$$
\begin{aligned}
\sum_{x\in F}\phi(x^3-x)
&=\sum_{t\in F}\#\{x\in F:x^2=t\}\,\chi(t)\phi(t-1)\\
&=\sum_{t\in F}(1+\phi(t))\chi(t)\phi(1-t)\\
&=J(\chi,\phi)+J(\chi^{-1},\phi)\\
&=J(\chi,\phi)+\overline{J(\chi,\phi)}.
\end{aligned}
$$

第二行用了 $\phi(-1)=1$，第三行用了 $\phi\chi=\chi^{-1}$，最后一行用了特征值的复共轭关系。这个归组包括零纤维：$t=0$ 的平方根只有一个，而 $\chi(0)=0$；$t=1$ 的权重含 $\phi(0)=0$。因此 $x=0,\pm1$ 没有被漏掉，它们各自在原来的点数中贡献一个仿射点。记 $J=J(\chi,\phi)$，便得到 $T=-2\operatorname{Re}J$。

这些特征值都在高斯整数环 $\mathbb{Z}[i]$ 中，故 $J=r+si$，其中 $r,s\in\mathbb{Z}$。经典 Jacobi 和的范数公式在两个特征及其乘积均非平凡时给出 $|J|=\sqrt p$[^gauss-jacobi-background]，于是 $r^2+s^2=p$。还需要辨认哪一条直角边是实部。四阶 Jacobi 和的整性同余给出某个 $z\in\mathbb{Z}[i]$ 使

$$
J=-1+z(i-1)^2.
$$

写成 $z=u+vi$（$u,v\in\mathbb{Z}$），并用 $(i-1)^2=-2i$，就有

$$
J=(-1+2v)-2ui,\qquad r=-1+2v\text{ 为奇数},\quad s=-2u\text{ 为偶数}.
$$

最后将 $r+si$ 与题设的 $a+bi$ 比较。高斯范数为 $N_G(x+yi)=(x+yi)(x-yi)=x^2+y^2$，且对乘法保持。两者的范数均为素数 $p$，排除了非单位之间的分解；在欧几里得环 $\mathbb{Z}[i]$ 中，它们因而都是高斯素元。由 $p=(a+bi)(a-bi)$ 及高斯整数环的唯一分解，$r+si$ 必与 $a+bi$ 或 $a-bi$ 相伴。单位的范数必须为 $1$，而整数方程 $x^2+y^2=1$ 只给出单位 $1,-1,i,-i$：乘以 $\pm i$ 会把偶数虚坐标放到实坐标，违背 $r$ 为奇数；乘以 $\pm1$ 只改变实部符号。因此，对题设中任意这样的 $a,b$ 都有 $|r|=|a|$，进而

$$
|T|=2|r|=2|a|,\qquad
\left|\frac{T}{2\sqrt p}\right|
=\frac{|a|}{\sqrt p}
=\frac{|a|}{\sqrt{a^2+b^2}}.
$$

这就是邻边投影的几何来源：$J$ 的长度是 $\sqrt p$，而它的实部绝对值正是奇数边 $|a|$。全程不选取 $T$ 的正负，也不对 $p$ 加入模 $8$ 的限制。例如 $p=5=1^2+2^2$ 时，按 $x=0,1,2,3,4$ 排列的 $\phi(x^3-x)$ 为 $0,0,1,1,0$；仿射点数是 $7$，加上 $O$ 得 $N=8$，所以 $T=-2$，绝对余弦为 $1/\sqrt5$。

这里用到的三个代数结果各有明确的适用范围。[幂纤维计数公式](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum)适用于任意有限域 $K$、正整数 $d$ 及恰好 $d$ 阶的复值乘法特征 $\eta:K\to\mathbb{C}$：对每个 $t\in K$，在复数中有

$$
\#\{x\in K:x^d=t\}
=1+\sum_{j=1}^{d-1}\eta^j(t).
$$

特征在零处延拓为零，左边的自然数点数按通常方式嵌入复数。取 $K=\mathbb{F}_p$、$d=2$、$\eta=\phi$，便得到前面的平方纤维公式，包括 $t=0$。

[Jacobi 和范数公式](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum)适用于任意有限域 $K$ 上的复值乘法特征 $\alpha,\beta$，前提是 $\alpha\ne1$、$\beta\ne1$ 且 $\alpha\beta\ne1$；结论为

$$
\left|\sum_{t\in K}\alpha(t)\beta(1-t)\right|
=\sqrt{\#K}.
$$

这里的 $1$ 是非零处恒为 $1$、零处为 $0$ 的平凡乘法特征。取 $K=\mathbb{F}_p$、$\alpha=\chi$、$\beta=\phi$，恰好四阶的 $\chi$、二阶的 $\phi$ 及四阶的 $\chi\phi=\chi^{-1}$ 满足全部三个非平凡条件。[高斯整数单位分类](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit)则对每个可逆高斯整数 $u\in\mathbb{Z}[i]^\times$ 给出 $u=1$、$u=i$、$u=-1$ 或 $u=-i$，正是上面排除直角边互换时所用的四种可能。

四阶整性同余对应 Mathlib 的 `exists_jacobiSum_eq_neg_one_add`，参数为 $n=4$、本原四次单位根 $i$ 以及 $4\mid p-1$。上述三个代数结果分别控制单个纤维、Jacobi 和的长度及高斯整数的单位；它们都不以曲线的迹公式为前提。把实际曲线点数、Jacobi 和、高斯素元与归一化余弦连接起来的完整推导，仍是**文献结果，未在本书形式化**。相邻的惰性素数抵消、一般哈塞界和非复乘佐藤—泰特分布也不因此获得形式化证明。
:::

[^gauss-count-background]: René Schoof, “Counting points on elliptic curves over finite fields”, *Journal de Théorie des Nombres de Bordeaux* 7 (1995), §§1、3。此处仅用作标准 Weierstrass 点数与高斯复乘背景的参考。

[^gauss-jacobi-background]: Keith Conrad, *Gauss and Jacobi Sums*，作者讲义，Theorem 2.4、Corollary 2.5，说明非平凡特征的 Gauss 和范数以及在两个特征及其乘积均非平凡时的 Jacobi 和范数。该引用只支持这里的范数步骤，不代替整条曲线的迹公式推导。

::: {.remark #rem-ch29-arithmetic-geometry-literature title="非复乘椭圆曲线佐藤—泰特分布定理与算术几何文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 如果我们进一步考察有理数域 $\mathbb{Q}$ 上没有额外复乘（non-CM）对称性的典型椭圆曲线（例如 $y^2 = x^3 - x + 1$），当素数 $p \to \infty$ 遍历一切良约化素数时，归一化余弦值 $\cos\theta_p \in [-1, +1]$ 的渐近统计分布由 2011 年 Barnet-Lamb、Geraghty、Harris 与 Taylor 证明的**佐藤—泰特猜想（Sato–Tate Theorem，*Publ. Res. Inst. Math. Sci.* **47**(1), 29–98 (2011)）**给出：$\theta_p \in [0, \pi]$ 并非均匀分布，而是遵循**四维球面赤道切片定律**：

$$
d\mu_{\mathrm{ST}}(\theta) = \frac{2}{\pi}\sin^2\theta\,d\theta \quad \Longleftrightarrow \quad \frac{2}{\pi}\sqrt{1 - u^2}\,du \quad (u = \cos\theta \in [-1, +1]).
$$

从几何上看，三维单位旋量球面 $S^3 \cong \mathrm{SU}(2)$（由四元数范数 $s^2 + x^2 + y^2 + z^2 = 1$ 定义、欧拉示性数 $\chi(S^3) = 0$ 的可平行化超球面，见 [@rem-hairy-ball-adams-literature]）在极角 $\theta \in [0, \pi]$ 处的二维纬球面 $S^2(\sin\theta)$ 面积正比于 $\sin^2\theta$；将 $S^3 \cong \mathrm{SU}(2)$ 上的均匀哈尔测度（Haar measure）向实迹直径 $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ 作投影，所得 $u$ 坐标密度恰为 $\frac{2}{\pi}\sqrt{1-u^2}\,du$；改用极角 $\theta$ 表示时则为 $\frac{2}{\pi}\sin^2\theta\,d\theta$。

综观本章前两节，林德曼—魏尔斯特拉斯定理与 T. Y. Chow (1999) 在沙努埃尔猜想（[@conj-schanuel-dottie]）条件下的初等域逃逸定理、[@rem-ch29-pell-primes-hilbert-literature] 中的素数在高斯整数中的分裂与惰性 / 模 4 余 1 素数的负佩尔可解性 / 希尔伯特互反律、[@rem-ch29-elliptic-torus-literature] 中的复椭圆曲线环面拓扑与阿贝尔群律、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-gauss-character-application] 中的哈塞界及高斯复乘点数推导，以及本评注中的佐藤—泰特分布定理，均为外部经典数学文献结果，未包含在本书锁定的 `trureturing@dev` 形式化声明集中；本书内核验证的结论严格限定于带 `lean` 属性的方框（如 [@lem-ch29-square-residues-mod-four]、[@thm-ch29-face-prime-two-squares]、[@lem-ch29-line-prime-descent]、[@thm-ch29-two-squares-classification]、[@thm-ch29-silver-pell-remainder] 与 [@thm-ch29-silver-best-approximation]）以及显式标注 `lean:` 的代数与内积恒等式（如 [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)、[`power_fiber_card_eq_one_add_character_sum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum)、[`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum) 与 [`gaussian_unit`](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit) 等）。
:::

::: {.viz src="pythagoras-number-escape" preset="sato" height="500"}
**换一条曲线：半圆。** 曲线换成 $y^2 = x^3 - x + 1$（青色的点）：线素数不再落在零上，弗罗贝尼乌斯余弦散布在 $-1$ 到 $1$ 之间，例如 $p = 53$ 时是 $0.137$。右边对 $3000$ 以内的 $428$ 个良约化素数作直方图（紫色），轮廓贴近琥珀色虚线的半圆律 $\frac{2}{\pi}\sqrt{1 - u^2}$，琥珀色的竖线标出 $p = 53$ 的那个 $0.137$。有限个素数的直方图只是数值演示；佐藤—泰特分布是上面注记里的文献结果。
:::

在本书的跨学科几何视野下，从希帕索斯直角三角形裂开的佩尔接缝（[@thm-ch29-silver-pell-remainder]）出发，对照上述文献评注（[@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-arithmetic-geometry-literature]），无复乘曲线在素数轴上的点数偏差振荡便与三维量子旋量球面 $S^3 \cong \mathrm{SU}(2)$ 向一维直径 $[-1, +1]$ 投下的余弦影子形成了深邃的几何同构意象（同余数曲线 $y^2 = x^3 - x$ 有复乘，其分布不是半圆）。

::: {.viz src="pythagoras-number-escape" height="640"}
**交互实验室 `ORTHO//PYTHAGORAS`**：沿着 $\pm 1$ 接缝走一遍的三个场景。佩尔接缝：$\sqrt{d}$ 的渐近分数沿直线越贴越近，$m^2 - d\,n^2$ 却是非零整数（$d = 5$ 时灰圈标出由 Lean 验证的 $\pm 4$ 解族中的点）；线素数与面素数：半径 $\sqrt{p}$ 的圆上有没有格点；模 $p$ 数点：曲线 $y^2 = x^3 - x$ 的 $a_p$ 被哈塞界关住，线素数恰在零上，面素数的弗罗贝尼乌斯余弦的绝对值等于以奇数边 $|a|$ 为邻边的高斯三角形余弦。面素数是两平方和、线素数不是，已由 Lean 验证（[@thm-ch29-face-prime-two-squares]、[@lem-ch29-square-residues-mod-four]）；哈塞定理与佐藤—泰特分布是文献结果，未在本书形式化。
:::

---
