# 第十三章 欧几里得素数逃逸、有限连分数与四分深度预算

经过第四卷对三维球面有理调和分析的系统构建——从[第十章](ch10-peter-weyl-rational-spin-shells.md)的整系数切比雪夫特征标核、[第十一章](ch11-pi-free-haar-integration.md)的无 $\pi$ 阶乘哈尔积分，到[第十二章](ch12-algebraic-extensions-and-schur-positivity.md)的零公理二次扩张与有理舒尔正定性——全书正式迈入第五卷：**阿代尔算术与纯有理赫克—黎曼谱论**。

古典数论往往从“全体自然数 $\mathbb{N}$ 构成一个已完成无穷集合，全体素数 $\mathbb{P}$ 早已静止排列在数轴尽头”这一柏拉图式前提起步；分析数论则紧接着引入实数完备化 $\mathbb{R}$、无穷级数极限与超越对数 $\ln x$。然而在无无穷、无超越数的零公理有理数学（`OmegaMath`）中，我们必须首先回答一道根基性问题：**倘若不承认已完成实无穷，也不借用任何极限过程与超越函数，整数算术的三大支柱——素数的永不枯竭、有理数的最佳逼近与分析误差的几何衰减预算——能否彻底重写为有限、可终止、可执行的纯整数构造？**

本章给出三记正面回答，并将三大支柱的核心整数定理全部锚定于 D5 冻结声明，其严格端记录为 `strict_omega.axioms: []`。第一，以欧几里得带余除法、零公理裴蜀恒等式与有界最小素因子搜索锁定**素数逃逸机制**，把“素数有无穷多个”还原为“任何乘积为正的有限自然数列表都自带显式盲区见证 $N_S = 1 + \prod S$，迫使新素数按需诞生”；第二，以零公理有限连分数与**欧拉—沃利斯渐近行列式**确立渐近分数的自动互素性，结合既约分母公式、对数长度上界与可判定幺半群素因子剥离完善有限有理逼近；第三，将分析中的几何级数衰减压缩为一条零公理、零极限、零实对数的**四分深度整数预算不等式**，再展示其如何经由第二层单向阴影桥传递到经典实数主界之上。

## 13.1 从已完成无穷集合到可计算算术地平线

观察者站在有限步算术地平线之内，手中永远只有有限长的整数表与有限次四则运算。古典教材习惯用反证法宣称“假设只有有限个素数，推出矛盾，因此全体素数构成一个已完成无穷集 $\mathbb{P}$”。但在纯归纳构造演算中，这一步把原本最具建设性的算法强行改造成了消极的归谬法。

在零公理视角下，算术的真正规律不是静态的无穷清单，而是**可计算的闭合与越界规则**：给定任意自然数 $a, b$（$b > 0$），**欧几里得带余除法**在至多 $a$ 步有限递归内产出唯一商 $q$ 与余数 $r$，满足

$$
a = q b + r, \qquad 0 \le r < b.
$$

对任意自然数对 $(a, b)$ 反复执行带余除法 $(a, b) \mapsto (b, a \bmod b)$，余数序列严格递减，必在有限步后归零；最后一个非零余数（或在 $a = b = 0$ 时约定为 $0$）即最大公约数 $\gcd(a, b)$。沿递归轨迹逆向回代每一步的商，直接在裸归纳构造演算中交付下述**零公理裴蜀恒等式（Bézout's identity）**，其传递公理闭包严格为空（`OmegaInit` 与 `OmegaMath`，`strict_omega.axioms: []`）：

::: {.theorem #thm-ch13-bezout-identity title="自然数裴蜀恒等式" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意自然数 $a, b \in \mathbb{N}$（`Omega.Nat`，包含零元情形），均存在有号整数 $x, y \in \mathbb{Z}$（`Omega.Int`）满足

$$
a x + b y = \gcd(a, b).
$$

:::

::: {.proof}
对第二参数 $b$ 作强归纳。当 $b = 0$ 时，$\gcd(a, 0) = a$，直接取 $(x, y) = (1, 0)$ 即得 $a \cdot 1 + 0 \cdot 0 = a$。当 $b > 0$ 时，由欧几里得带余除法写出 $a = q b + r$ 且 $0 \le r < b$，并有 $\gcd(a, b) = \gcd(b, r)$；对严格更小的余数 $r < b$ 施用归纳假设，得到整数 $x', y'$ 满足 $b x' + r y' = \gcd(b, r)$。将 $r = a - q b$ 回代，即得 $a y' + b (x' - q y') = \gcd(a, b)$，取 $x = y'$、$y = x' - q y'$ 即完成零公理构造。完整证明由 Lean 内核检查。
:::

欧几里得带余除法与 [@thm-ch13-bezout-identity] 已经足够支撑整个初等算术地基：若素数 $p$ 整除乘积 $a b$ 且 $p \nmid a$，则 $\gcd(p, a) = 1$，由 $p x + a y = 1$ 两边同乘 $b$ 得 $p (b x) + (a b) y = b$，从而立得 $p \mid b$（欧几里得引理，完全无需实无穷或选择公理，`手工推导`）。

## 13.2 欧几里得带余除法、裴蜀恒等式与素数逃逸机制

把欧几里得古老的证明从反证法还原为构造性算子，就得到算术地平线的第一条动力学铁律：**任何乘积为正的有限自然数列表（特别是任何有限素数清单）都自带一道共同盲区，一旦跨入该盲区，必然在有限搜索步内催生一颗不在列表中的全新素数。**

::: {.definition #def-ch13-euclid-escape-witness title="欧几里得素数逃逸见证与最小素因子搜索"}
给定任意有限自然数列表 $S = [a_1, a_2, \dots, a_k]$（允许空表 $S = []$，约定空乘积等于 $1$；特别地，任意有限素数列表满足 $\prod S > 0$），定义其**欧几里得乘积加一见证**为

$$
N_S := 1 + \prod_{a \in S} a \;\ge\; 2 \qquad (\text{当 } \prod S > 0).
$$

对任意整数 $n \ge 2$，定义**有界最小素因子算子** $\operatorname{minPrimeDiv}(n)$ 为有限区间 $\{2, 3, \dots, n\}$ 中能整除 $n$ 的最小自然数：

$$
\operatorname{minPrimeDiv}(n) := \min\{\, d \in \{2, 3, \dots, n\} : d \mid n \,\}.
$$

:::

上述构造不依赖任何非构造性存在命题，其完整的素数逃逸律已在D5 声明的严格构建中得到验证（`strict_omega.axioms: []`）：

::: {.theorem #thm-ch13-euclid-prime-escape title="欧几里得素数逃逸定理" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 $s$ 为任意有限自然数列表（`s : NatList`）且其元素乘积严格为正（$0 < s.\mathrm{prod}$）。则存在自然数 $p$ 同时满足

$$
\operatorname{IsPrime}(p) \;\wedge\; \bigl(p \mid (s.\mathrm{prod} + 1)\bigr) \;\wedge\; p \notin s.
$$

:::

::: {.proof}
由假设 $0 < s.\mathrm{prod}$ 得 $s.\mathrm{prod} \ge 1$，从而见证数 $N_s := s.\mathrm{prod} + 1 \ge 2$。在有限区间 $\{2, \dots, N_s\}$ 中，至少 $N_s$ 自身整除 $N_s$，故有界最小因子搜索必产出满足 $2 \le p \le N_s$ 且 $p \mid N_s$ 的最小自然数 $p$；若存在 $1 < a < p$ 使 $a \mid p$，则由整除传递性得 $a \mid N_s$，与最小性矛盾，因此 $\operatorname{IsPrime}(p)$ 成立。再证逃逸性：若反设 $p \in s$，则 $p$ 必整除列表乘积 $s.\mathrm{prod}$；结合 $p \mid (s.\mathrm{prod} + 1)$ 立得 $p \mid 1$（其显式算术依据亦体现为余数 $1$ 与裴蜀证书 $1 \cdot N_s - M_p \cdot p = 1$），这与素数满足 $p \ge 2$ 矛盾。因此必有 $p \notin s$。完整证明由 Lean 内核检查。
:::

需要格外警醒一条常见误解：**见证数 $N_S$ 本身不必是素数**；[@thm-ch13-euclid-prime-escape] 保证的是 $N_S$ 必有不在 $S$ 中的素因子（例如有界最小因子 $q = \operatorname{minPrimeDiv}(N_S)$），而非 $N_S$ 自身不可分解。下面的手算账本清晰呈现了这一临界转折。

::: {.example #ex-ch13-euclid-escape-chain title="构造性素数逃逸手算：从空列表到 30031 = 59 × 509"}
从空列表出发，依次考察前缀素数列表 $S$ 对应的乘积加一见证 $N_S$、相对所有 $p \in S$ 的余数及有界最小素因子 $q = \operatorname{minPrimeDiv}(N_S)$（核验 [@thm-ch13-euclid-prime-escape] 与 [@thm-ch13-bezout-identity]）：

| 既有素数清单 $S$ | 乘积 $\prod S$ | 逃逸见证 $N_S = 1 + \prod S$ | 对一切 $p \in S$ 的余数 | 最小素因子 $q$ | $N_S$ 的完全分解 |
| :--- | ---: | ---: | :---: | ---: | :--- |
| $[]$ | $1$ | $2$ | （空检验） | $2$ | $2$（素数） |
| $[2]$ | $2$ | $3$ | $1$ | $3$ | $3$（素数） |
| $[2, 3]$ | $6$ | $7$ | $1, 1$ | $7$ | $7$（素数） |
| $[2, 3, 5]$ | $30$ | $31$ | $1, 1, 1$ | $31$ | $31$（素数） |
| $[2, 3, 5, 7]$ | $210$ | $211$ | $1, 1, 1, 1$ | $211$ | $211$（素数） |
| $[2, 3, 5, 7, 11]$ | $2310$ | $2311$ | 全为 $1$ | $2311$ | $2311$（素数） |
| $[2, 3, 5, 7, 11, 13]$ | $30030$ | $30031$ | 全为 $1$ | $59$ | $59 \times 509$（合数） |

在前六行中，$N_S$ 恰好自身为素数；抵达第七行 $S = [2, 3, 5, 7, 11, 13]$ 时，$N_S = 30031$ 首次分裂为合数 $59 \times 509$。无论如何，$30031$ 除以 $2, 3, 5, 7, 11, 13$ 的余数恒为 $1$，有界搜索在检验至 $d = 59$ 时立刻捕获新素数 $q = 59 \notin S$，同时裴蜀证书 $1 \cdot 30031 - 2310 \cdot 13 = 1$（及对其余五颗素数的同类等式）以纯整数算术封死了任何旧素数整除 $N_S$ 的可能。
:::

## 13.3 有限连分数、欧拉—沃利斯行列式与对数收敛长界

把欧几里得辗转相除法的每一步商收集起来，便从整除性自然过渡到有理数的**有限连分数展开**。对于任意有理数 $x \in \mathbb{Q}$，令 $a_0 = \lfloor x \rfloor$；只要小数部分 $\operatorname{fract}(x) = x - \lfloor x \rfloor$ 非零，就对其倒数 $\operatorname{fract}(x)^{-1}$ 重复取整。因为每一步倒数的新分母严格小于旧分母，整个过程必在有限步 $m$ 内终止，产出有限部分商列 $[a_0; a_1, \dots, a_m]$（其中 $a_0 \in \mathbb{Z}$，且当 $k \ge 1$ 时 $a_k \in \mathbb{Z}_{\ge 1}$）。

::: {.definition #def-ch13-euler-wallis-convergents title="有限连分数渐近分数与欧拉—沃利斯递推"}
给定整数部分商列 $[a_0; a_1, \dots, a_m]$（$a_0 \in \mathbb{Z}$，$a_k \ge 1$ 对 $1 \le k \le m$），定义**欧拉—沃利斯分子与分母序列** $(p_n), (q_n)$ 为

$$
p_{-2} = 0,\quad p_{-1} = 1,\qquad q_{-2} = 1,\quad q_{-1} = 0,
$$

并按二阶线性整递推生成

$$
p_n = a_n p_{n-1} + p_{n-2}, \qquad q_n = a_n q_{n-1} + q_{n-2} \qquad (0 \le n \le m).
$$

记矩阵 $M_k := \begin{pmatrix} a_k & 1 \\ 1 & 0 \end{pmatrix} \in \mathrm{GL}_2(\mathbb{Z})$，则对一切 $0 \le n \le m$ 恒有矩阵乘积恒等式

$$
\begin{pmatrix} p_n & p_{n-1} \\ q_n & q_{n-1} \end{pmatrix}
= M_0 M_1 \cdots M_n.
$$

:::

这组 $2 \times 2$ 整矩阵乘积立刻暴露出连分数最深层的几何刚性：每一枚单步转移矩阵的行列式恒为 $\det(M_k) = a_k \cdot 0 - 1 \cdot 1 = -1$。对包含 $k = m + 1$ 项自然数部分商的列表 `coeffs`（长度为 `coefficientCount coeffs`）执行递推，其渐近矩阵对 `convergentPair coeffs` 的行列式随系数个数逐拍翻号而面积绝对值恒守为 $1$。这一**欧拉—沃利斯渐近行列式恒等式**及其推论**渐近分数自动互素性**均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由内核锁死：

::: {.theorem #thm-ch13-cf-convergent-determinant title="有限连分数渐近行列式恒等式" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意有限自然数部分商列表 $\mathrm{coeffs} : \mathrm{NatList}$，其欧拉—沃利斯渐近对 $\operatorname{convergentPair}(\mathrm{coeffs})$ 的整数行列式精确等于

$$
\bigl(\operatorname{convergentPair}(\mathrm{coeffs})\bigr).\mathrm{determinant} = (-1)^{\operatorname{coefficientCount}(\mathrm{coeffs})}.
$$

:::

::: {.proof}
对自然数列表 `coeffs` 作结构归纳。基例为空表（`coefficientCount = 0`）时，初始渐近对为单位阵 $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$（对应 $p_{-1} = 1, p_{-2} = 0, q_{-1} = 0, q_{-2} = 1$），行列式为 $1 \cdot 1 - 0 \cdot 0 = 1 = (-1)^0$。归纳步纳入一枚新部分商 $a \in \mathbb{N}$ 时，转移矩阵 $M(a) = \begin{pmatrix} a & 1 \\ 1 & 0 \end{pmatrix}$ 满足 $(a p + p') q - p (a q + q') = -(p q' - p' q)$，使行列式精确乘以 $-1$，同时系数计数 `coefficientCount` 递增 $1$。对非空前缀 $[a_0, \dots, a_m]$（系数个数 $m + 1$），该恒等式写作 $p_m q_{m-1} - p_{m-1} q_m = (-1)^{m+1}$，移位一项即等价于 $p_{n+1} q_n - p_n q_{n+1} = (-1)^{n+2} = (-1)^n$（$-1 \le n \le m - 1$）。完整证明由 Lean 内核检查。
:::

由行列式恒为 $\pm 1$ 当场落下第一条免费的零公理结构推论：每一项连分数渐近分数自动处于最简既约形态，永无需额外约分。

::: {.theorem #thm-ch13-cf-convergent-coprime title="连分数渐近分子与分母互素定理" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意有限自然数部分商列表 $\mathrm{coeffs} : \mathrm{NatList}$，记 $\operatorname{convergentPair}(\mathrm{coeffs})$ 的当前渐近分子为 $\mathrm{num}$、渐近分母为 $\mathrm{den}$。则对任意自然数 $d \in \mathbb{N}$，若同时满足 $d \mid \mathrm{num}$ 与 $d \mid \mathrm{den}$，必有

$$
d = 1.
$$

:::

::: {.proof}
由 [@thm-ch13-cf-convergent-determinant]，由 $\mathrm{num}$、$\mathrm{den}$ 与前一步渐近项组成的整数行列式精确等于 $(-1)^{\operatorname{coefficientCount}(\mathrm{coeffs})} \in \{-1, 1\}$。既然 $d \mid \mathrm{num}$ 且 $d \mid \mathrm{den}$，自然数 $d$ 必整除二者的该整数线性组合，从而在 `Omega.Nat` 中导出 $d \mid 1$，故唯一解为 $d = 1$。完整证明由 Lean 内核检查。
:::

与此同时，将行列式恒等式两端除以正分母乘积 $q_n q_{n+1}$ 即得第二条免费推论：相邻渐近分数之差精确等于 $\frac{p_{n+1}}{q_{n+1}} - \frac{p_n}{q_n} = \frac{(-1)^n}{q_n q_{n+1}}$，以交替包抄方式把目标有理数锁死在宽度为 $(q_n q_{n+1})^{-1}$ 的纯有理夹逼区间内（`手工推导`）。

在所钉 `trureturing` 经典 `Mathlib` 冻结库中，一般有理分数的既约分母公式与可执行欧几里得渐近列表的对数步长上界亦已由内核严格锁定：

::: {.theorem #thm-ch13-reduced-den title="既约有理数分母的精确最大公约数公式" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den"}
对任意自然数 $s, r \in \mathbb{N}$，若 $0 < r$，记既约有理数 $\operatorname{reduced}(s, r) := (s : \mathbb{Q}) / r$，则其规范正分母精确满足

$$
\operatorname{den}\bigl(\operatorname{reduced}(s, r)\bigr) = \frac{r}{\gcd(s, r)}.
$$

:::

::: {.proof}
在有理数的规范构造中，由正分母 $r > 0$ 与分子 $s$ 构造分数 `mkRat s r` 时，分子与分母同除以二者最大公约数 $\gcd(s, r)$，于是规范正分母精确化为 $r / \gcd(s, r)$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch13-convergents-length-log title="有理数连分数渐近列长度的对数上界" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
对任意有理数 $x \in \mathbb{Q}$，定义可执行欧几里得渐近列表 $\operatorname{convergents}(x) : \mathrm{List}\,\mathbb{Q}$：若小数部分 $\operatorname{fract}(x) = 0$，返回单元素表 $[\lfloor x \rfloor]$；否则在列表 $\operatorname{convergents}(\operatorname{fract}(x)^{-1})$ 每项 $z$ 经映射 $z \mapsto \lfloor x \rfloor + z^{-1}$ 所得结果之前冠以 $\lfloor x \rfloor$。则该有限列表的长度恒受其规范分母的离散二进制对数控制：

$$
\operatorname{length}\bigl(\operatorname{convergents}(x)\bigr) \le 2\lfloor\log_2 \operatorname{den}(x)\rfloor + 1,
$$

其中 $\lfloor\log_2 d\rfloor$ 为自然数整除意义下的二进制对数（`Nat.log 2 d`，且 `Nat.log 2 1 = 0`）。
:::

::: {.proof}
对 $x$ 的规范分母 $d = \operatorname{den}(x)$ 作强归纳。当 $\operatorname{fract}(x) = 0$ 时列表长为 $1 \le 2\lfloor\log_2 d\rfloor + 1$。若小数部分非零，令 $t = \operatorname{fract}(x)^{-1}$，则 $t$ 的分母严格小于 $d$；若 $\operatorname{fract}(t) = 0$，则 $d \ge 2$ 故 $\lfloor\log_2 d\rfloor \ge 1$，列表长为 $2 \le 3 \le 2\lfloor\log_2 d\rfloor + 1$。若 $\operatorname{fract}(t)$ 亦非零，令 $u = \operatorname{fract}(t)^{-1}$，由于 $\lfloor t \rfloor \ge 1$，核心引理 `second_den_sum_le` 证出两步后的分母满足 $\operatorname{den}(u) + \operatorname{den}(t) \le d$；再结合 $\operatorname{den}(u) < \operatorname{den}(t)$ 立得 $2\operatorname{den}(u) \le d$，即每跨过两阶欧几里得完全商，分母至少减半一次（$\lfloor\log_2\operatorname{den}(u)\rfloor + 1 \le \lfloor\log_2 d\rfloor$）。对 $u$ 施用归纳假设即收束证毕（此处计入的是完全商阶数，不涉及位运算复杂度）。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch13-fibonacci-convergents title="手算核验：斐波那契分数 34/21 的欧拉—沃利斯行列式与对数长度界"}
取连续斐波那契数之比 $x = \frac{34}{21}$（连分数长度的最坏增长代表）。先由 [@thm-ch13-reduced-den] 对可约分数 $\frac{12}{30}$ 核验：$\gcd(12, 30) = 6$，故 $\operatorname{den}(\operatorname{reduced}(12, 30)) = 30 / 6 = 5$；而 $\gcd(34, 21) = 1$，故 $\operatorname{den}(34/21) = 21$。展开 $\frac{34}{21} = [1; 1, 1, 1, 1, 1, 2]$，得到全部 $7$ 阶渐近分数与欧拉—沃利斯行列式（核验 [@thm-ch13-cf-convergent-determinant] 与 [@thm-ch13-cf-convergent-coprime]，其中第 $n$ 行对应系数个数 $k = n + 2$ 的前缀）：

| 阶数 $n$ | 部分商 $a_n$ | 渐近分数 $p_n / q_n$ | 行列式 $p_{n+1} q_n - p_n q_{n+1}$ | $(-1)^n = (-1)^{n+2}$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1$ | $1 / 1$ | $2\cdot 1 - 1\cdot 1 = +1$ | $+1$ |
| $1$ | $1$ | $2 / 1$ | $3\cdot 1 - 2\cdot 2 = -1$ | $-1$ |
| $2$ | $1$ | $3 / 2$ | $5\cdot 2 - 3\cdot 3 = +1$ | $+1$ |
| $3$ | $1$ | $5 / 3$ | $8\cdot 3 - 5\cdot 5 = -1$ | $-1$ |
| $4$ | $1$ | $8 / 5$ | $13\cdot 5 - 8\cdot 8 = +1$ | $+1$ |
| $5$ | $1$ | $13 / 8$ | $34\cdot 8 - 13\cdot 21 = 272 - 273 = -1$ | $-1$ |
| $6$ | $2$ | $34 / 21$ | （终结） | — |

每一项渐近分数都由 [@thm-ch13-cf-convergent-coprime] 自动保证互素。再核对 [@thm-ch13-convergents-length-log] 的对数长度界：因 $2^4 = 16 \le 21 < 32 = 2^5$，有 $\lfloor\log_2 21\rfloor = 4$，上界为 $2 \times 4 + 1 = 9$，确满足 $7 \le 9$；同时每两步的分母和清晰印证了折半机制：$8 + 13 = 21 \le 21$、$3 + 5 = 8 \le 8$。
:::

下面的静态图把本章的三根零公理算术支柱并置在同一幅视野之中：左侧展示从空表一路推进至 $30031 = 59 \times 509$ 的欧几里得素数逃逸链（[@thm-ch13-euclid-prime-escape]、[@ex-ch13-euclid-escape-chain]），中栏刻画斐波那契分数 $34/21$ 的欧拉—沃利斯交替行列式与既约夹逼（[@thm-ch13-cf-convergent-determinant]、[@thm-ch13-cf-convergent-coprime]、[@ex-ch13-fibonacci-convergents]），右侧则预告第 13.5 节的四分深度整数预算 $70 < 128$（[@thm-ch13-omega-quarter-depth-integer]、[@ex-ch13-quarter-depth-worked]）。

::: {.figure src="ch13-euclid-cf-depth"}
**素数逃逸、有限连分数与四分深度预算。** 图中依次呈现有限素数表的欧几里得逃逸见证 $N_S = 1 + \prod S$ 及其在 $30031 = 59 \times 509$ 处的首次合数分裂（[@thm-ch13-euclid-prime-escape]）、有理数 $34/21$ 沿欧拉—沃利斯递推保持单位交替行列式 $p_{n+1}q_n - p_n q_{n+1} = (-1)^n$ 与自动互素性的七阶渐近链（[@thm-ch13-cf-convergent-determinant]、[@thm-ch13-cf-convergent-coprime]），以及主界 $7/2$ 与容差 $1/10$ 在深度 $N = 2$ 下锁死精确整数不等式 $70 < 2 \cdot 4^3 = 128$ 的无极限衰减门槛（[@thm-ch13-omega-quarter-depth-integer]）。
:::

## 13.4 可判定幺半群中的可执行素因子剥离

有限算术构造的威力远不止于有理数约分。当我们已知某个离散对称算子或旋转元素 $x$ 在可判定幺半群 $G$ 中满足回归关系 $x^m = 1$（$m > 0$），却想知道它的**精确最小周期（阶）** $\operatorname{orderOf}(x)$ 时，根本不需要穷举 $1, 2, \dots, m$ 全部指数——只要手头有一份涵盖 $m$ 全部素因子的有限列表 $P$，对列表中每个因子 $p$ 反复检验“删去一个 $p$ 后是否仍满足 $x^{n/p} = 1$”，便能在有限次幂检验后分毫不差地剥离出精确阶！

::: {.theorem #thm-ch13-strip-factors-correct title="可判定幺半群中素因子剥离取阶的正确性" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct"}
设 $G$ 为带可判定等号（`DecidableEq`）的幺半群，$x \in G$，$m \in \mathbb{N}$ 满足 $0 < m$ 且 $x^m = 1$。设有限自然数列表 $P : \mathrm{List}\,\mathbb{N}$ 覆盖 $m$ 的全部素因子（即对任意素数 $p$，若 $p \mid m$ 则 $p \in P$；列表允许含重复项或无关自然数）。定义单因子剥离函数 $\operatorname{stripFactor}(x, p, n)$：当 $1 < p$、$0 < n$、$p \mid n$ 且 $x^{n/p} = 1$ 时递归计算 $\operatorname{stripFactor}(x, p, n/p)$，否则返回 $n$；再按列表顺序折叠定义 $M := \operatorname{stripFactors}(x, P, m)$。则恒有

$$
0 < M, \qquad M \mid m, \qquad x^M = 1, \qquad M = \operatorname{orderOf}(x).
$$

:::

::: {.proof}
先对自然数 $m$ 作强归纳证明单因子不变量：令 $M_p = \operatorname{stripFactor}(x, p, m)$，则 $0 < M_p$、存在 $k \in \mathbb{N}$ 使 $m = p^k M_p$、$x^{M_p} = 1$，且一旦 $1 < p$ 必有 $p \nmid M_p / \operatorname{orderOf}(x)$（否则 $M_p / p$ 仍为 $\operatorname{orderOf}(x)$ 的倍数，从而 $x^{M_p / p} = 1$，算法本应继续剥离）。再对列表 $P$ 归纳可知，整轮折叠结束后的 $M$ 保持 $0 < M$、$M \mid m$、$x^M = 1$，且对一切 $p \in P$（$1 < p$）均满足 $p \nmid M / \operatorname{orderOf}(x)$。因为 $P$ 覆盖了 $m$（从而覆盖了 $M$）的全部素因子，商 $M / \operatorname{orderOf}(x)$ 没有任何素因子，只能等于 $1$，即 $M = \operatorname{orderOf}(x)$（声明本身只刻画精确正确性，不作时间复杂度断言）。完整证明由 Lean 内核检查。
:::

这条定理把“有限素因子覆盖”直接转化为抽象代数中的精确周期发现器：例如在模 $13$ 乘法群 $(\mathbb{Z}/13\mathbb{Z})^\times$ 中，已知 $x = 3$ 满足 $3^{12} \equiv 1 \pmod{13}$，覆盖 $12 = 2^2 \cdot 3$ 的素因子清单为 $P = [2, 3]$：剥离 $p = 2$ 时，检验 $3^6 \equiv 729 \equiv 1 \pmod{13}$ 放行至 $6$，再检验 $3^3 \equiv 27 \equiv 1 \pmod{13}$ 放行至 $3$；剥离 $p = 3$ 时，$3^1 \equiv 3 \not\equiv 1 \pmod{13}$ 终止，立刻输出精确阶 $M = 3 = \operatorname{orderOf}(3)$（`手工推导`）。

## 13.5 四分深度整数预算与无极限实数转移

分析数论与谱估计中充斥着一类看似离不开实对数与极限的陈述：“给定某主界常数 $C > 0$ 与目标容差 $\varepsilon > 0$，因为 $(1/4)^N \to 0$，所以存在足够大的卷积深度 $N$ 使得 $(1/4)^{N+1} C < \varepsilon$。”在传统实分析中，求这个 $N$ 要么求助存在性极限，要么调用无理对数 $\log_4(C/\varepsilon)$ 并忍受浮点舍入。

然而只要把主界上压为一个有理分数 $C \le c/d$，把目标容差写为有理分数 $\varepsilon = p/q$，整个几何衰减预算立刻坍缩为一行纯自然数算术函数：

$$
\operatorname{quarterDepth}(c, d, p, q) := \left\lfloor \log_4 \left\lfloor \frac{c q}{d p} \right\rfloor \right\rfloor.
$$

这条预算在所钉 `trureturing` 冻结库中呈现出全书最清晰的**零公理核心 vs. 第二层实数影子**架构分层。首先，核心整数严格不等式已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 严格构建中以**字面零公理（`strict_omega.axioms: []`）**独立证毕，全程不导入官方 `Init` 或 `Mathlib`：

::: {.theorem #thm-ch13-omega-quarter-depth-integer title="四分深度整数预算严格不等式" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.quarterDepth_integer_sound"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意自然数 $c, d, p, q, N \in \mathbb{N}$（`Omega.Nat`），若满足 $0 < d$、$0 < p$ 以及可执行四分深度界 $\operatorname{quarterDepth}(c, d, p, q) \le N$，则精确整数严格不等式成立：

$$
c \cdot q < (d \cdot p) \cdot 4^{N + 1}.
$$

:::

::: {.proof}
由前提 $0 < d$ 与 $0 < p$ 得自然数乘积 $d \cdot p > 0$。令 $m := \lfloor (c \cdot q) / (d \cdot p) \rfloor$ 为 `Omega.Nat` 中的带余除法商。按零公理四分深度函数 `quarterDepth` 的离散底 $4$ 计数构造，条件 $\operatorname{quarterDepth}(c, d, p, q) \le N$ 直接保证 $m < 4^{N + 1}$，在自然数中即 $m + 1 \le 4^{N + 1}$。结合带余除法分解 $c \cdot q = (d \cdot p) m + r$ 与严格余数界 $r < d \cdot p$，立得

$$
c \cdot q = (d \cdot p) m + r < (d \cdot p)(m + 1) \le (d \cdot p) \cdot 4^{N + 1}.
$$

全过程仅动用 `OmegaInit` 与 `OmegaMath` 中的自然数归纳算术，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

当外围分析需要将该整数预算接入经典实分析中的韦伊—布尔诺尔（Weil–Burnol）主界时，第二层经典 `Mathlib` 冻结库中的 `BurnolRationalDepthBudget` 给出了与上述零公理核心平行的 `Init`/`Mathlib` 版本（`rationalQuarterDepth_integer_sound`）及其单向无极限实数影子转移（`rationalQuarterDepth_real_sound`）：

::: {.theorem #thm-ch13-quarter-depth-integer title="四分深度预算的精确整数严格不等式" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound"}
对自然数 $c, d, p, q \in \mathbb{N}$，定义可执行整数深度函数

$$
\operatorname{rationalQuarterDepth}(c, d, p, q) := \operatorname{Nat.log}\; 4\; \bigl((c \cdot q) / (d \cdot p)\bigr),
$$

其中除法为自然数整除，且 $\operatorname{Nat.log}\; 4\; 0 = 0$。若 $0 < d$、$0 < p$，且自然数 $N$ 满足 $\operatorname{rationalQuarterDepth}(c, d, p, q) \le N$，则精确整数严格不等式成立：

$$
c q < (d p) \cdot 4^{N + 1}.
$$

:::

::: {.proof}
记 $m := \lfloor (c q) / (d p) \rfloor$。由假设 $d > 0, p > 0$ 得 $d p > 0$，且 $\operatorname{Nat.log}\; 4\; m \le N < N + 1$。根据离散底 $4$ 对数的基本上界性质，立得 $m < 4^{N + 1}$，因为二者皆为自然数，等价于 $m + 1 \le 4^{N + 1}$。另一方面，带余除法给出 $c q = (d p) m + r$ 且余数严格满足 $r < d p$，于是

$$
c q = (d p) m + r < (d p)(m + 1) \le (d p) \cdot 4^{N + 1}.
$$

全过程只动用自然数乘除与离散整数对数，不依赖任何实数完备化或浮点近似。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch13-quarter-depth-real title="四分深度整数预算的无极限实数转移" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
设自然数 $c, d, p, q, N \in \mathbb{N}$ 满足 $0 < d$、$0 < p$、$0 < q$ 以及 $\operatorname{rationalQuarterDepth}(c, d, p, q) \le N$。则对任意满足有理上界 $C \le \frac{c}{d}$ 的实数 $C \in \mathbb{R}$，无需任何极限论证即有

$$
\left(\frac{1}{4}\right)^{N + 1} C < \frac{p}{q}.
$$

:::

::: {.proof}
先由 [@thm-ch13-quarter-depth-integer] 得到整数不等式 $c q < (d p) \cdot 4^{N + 1}$，嵌入 $\mathbb{R}$ 后两边同除以严格正实数 $d q \cdot 4^{N + 1}$，得 $\frac{c / d}{4^{N + 1}} < \frac{p}{q}$。再将前提 $C \le \frac{c}{d}$ 同除以 $4^{N + 1} > 0$，串联不等式即得 $(1/4)^{N + 1} C \le \frac{c/d}{4^{N+1}} < \frac{p}{q}$。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch13-quarter-depth-worked title="定量算例：主界 7/2 与误差预算 1/10 下的锐利深度 N = 2"}
取有理主界 $\frac{c}{d} = \frac{7}{2}$（$c = 7, d = 2$）与目标误差容差 $\frac{p}{q} = \frac{1}{10}$（$p = 1, q = 10$），对照 [@thm-ch13-omega-quarter-depth-integer] 与 [@thm-ch13-quarter-depth-real] 逐步手算（`手工推导`）。先计算交叉乘积 $c q = 7 \times 10 = 70$ 与 $d p = 2 \times 1 = 2$，取自然数整除商 $\lfloor 70 / 2 \rfloor = 35$。因为 $4^2 = 16 \le 35 < 64 = 4^3$，可执行深度精确等于

$$
N_0 = \operatorname{quarterDepth}(7, 2, 1, 10) = \lfloor\log_4 35\rfloor = 2.
$$

由此直接核验 $N = 2$ 处的精确整数不等式与无极限实数传递界：

$$
c q = 70 < (d p) \cdot 4^{2 + 1} = 2 \times 64 = 128,
\qquad
\left(\frac{1}{4}\right)^3 \cdot \frac{7}{2} = \frac{7}{128} = 0.0546875 < \frac{1}{10} = 0.1.
$$

反之，若尝试将深度压缩至 $N = 1$，则 $(d p) \cdot 4^{1 + 1} = 2 \times 16 = 32 < 70$，对应 $(1/4)^2 \cdot (7/2) = \frac{7}{32} = 0.21875 > 0.1$，误差界即刻告破。因此 $N = 2$ 不仅充分，而且恰好是满足该误差预算的最小整数深度。
:::

::: {.remark #rem-ch13-zero-axiom-horizon title="严格后端的整数核心与经典实数影子"}
回头纵览本章全部十条冻结定理，一条极其清晰的公理边界跃然纸上：裴蜀恒等式（[@thm-ch13-bezout-identity]）、欧几里得素数逃逸（[@thm-ch13-euclid-prime-escape]）、欧拉—沃利斯渐近行列式（[@thm-ch13-cf-convergent-determinant]）、连分数渐近互素性（[@thm-ch13-cf-convergent-coprime]）以及四分深度预算的整数半部（[@thm-ch13-omega-quarter-depth-integer]），均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 严格构建中以**字面零公理（`strict_omega.axioms: []`）**完成形式化冻结，全程不触碰经典选择公理、商类型公理或实数完备化。与此同时，[@thm-ch13-reduced-den]、[@thm-ch13-convergents-length-log]、[@thm-ch13-strip-factors-correct] 以及经典层的四分深度对偶（[@thm-ch13-quarter-depth-integer] 与 [@thm-ch13-quarter-depth-real]）构成了面向 `Mathlib` 与经典韦伊—布尔诺尔（Weil–Burnol）实分析的第二层单向阴影接口——这一“零公理有理内核驱动、经典连续统作单向影子”的分层模式，将在[第十八章](ch18-zero-axiom-kernel-and-shadow-bridge.md)升华为全书的终极审计架构。
:::

下面的讲解视频沿本章的手算算例，把带余除法、素数逃逸、有限连分数与四分深度预算依次串成一条线。

::: {.film src="euclids-escape"}
**一个只会停下的除法，就足以让素数源源逃逸、让分数自行收束、让误差预算落成整数（2 分 45 秒）。** 青色长条把 $30031$ 切成 $2310$ 段 $13$ 与品红色余数 $1$，琥珀色证书 $1 \cdot 30031 - 2310 \cdot 13 = 1$ 引出绿色的裴蜀恒等式（[@thm-ch13-bezout-identity]）；逃逸账本中前六个见证数 $2, 3, 7, 31, 211, 2311$ 都是素数，到 $30031$ 时有界试除在琥珀色的 $59$ 处停下，$30031 = 59 \times 509$，绿色标签指向 [@thm-ch13-euclid-prime-escape]。辗转相除把 $34/21$ 展开为 $[1; 1, 1, 1, 1, 1, 2]$，欧拉—沃利斯渐近分数 $1/1$ 至 $34/21$ 满足长度界 $7 \le 2 \cdot 4 + 1 = 9$（[@thm-ch13-convergents-length-log]）；单步矩阵行列式 $-1$、$M(1)^6 M(2)$ 的行列式 $(-1)^7$ 与相邻交叉积 $\pm 1$ 对应 [@thm-ch13-cf-convergent-determinant] 与 [@thm-ch13-cf-convergent-coprime]，数轴上从两侧交替逼近的间距 $1/(q_n q_{n+1})$ 为紫色的手工推导。最后主界 $7/2$、容差 $1/10$ 给出 $\lfloor 70/2 \rfloor = 35$ 与深度 $2$，绿色的整数不等式 $70 < 128$（[@thm-ch13-omega-quarter-depth-integer]）与经典阴影 $7/128 < 1/10$（[@thm-ch13-quarter-depth-real]）并列，深度 $1$ 不够。片中算例均为屏幕计算；“严格后端零公理”只标在本章如此记录的五条定理上。
:::

在迈入阿代尔乘积闭环之前，读者可直接在下方的交互实验卡中逐拍检验这三套有限整数构造：从任意前缀素数表触发 $30031 = 59 \times 509$ 的逃逸搜索，逐步展开 $34/21$ 的欧拉—沃利斯交替行列式，并即时调节有理主界与容差核验 $70 < 128$ 的四分深度门槛。

::: {.viz src="adelic-arithmetic-observer-lab" preset="euclid-cf-quarter-depth" height="520"}
**素数逃逸、有限连分数与四分深度预算实验卡（`euclid-cf-quarter-depth`）。** 交互步进检验有限素数表见证 $N_S = 1 + \prod S$ 及 $30031 = 59 \times 509$ 的有界最小素因子捕获（[@thm-ch13-euclid-prime-escape]）、有理数 $34/21$ 的欧拉—沃利斯渐近分数与交替单位行列式 $\pm 1$（[@thm-ch13-cf-convergent-determinant]、[@thm-ch13-cf-convergent-coprime]），以及主界 $c/d = 7/2$、容差 $p/q = 1/10$ 在深度 $N = 2$ 下满足 $c q = 70 < (d p)\cdot 4^{N+1} = 128$ 的整数预算与无极限实数传递（[@thm-ch13-omega-quarter-depth-integer]、[@thm-ch13-quarter-depth-real]）。
:::

既然有限算术已经证明素数必在旧周期的共同盲区中源源不断地按需诞生，下一个核心追问自然浮现：**在有理数域的全体度量通道中，平直尺度上的膨胀与每一颗素数通道上的收缩如何精确闭合？而当素数走出标量整数、裂变为三维球面上的非对易整旋子时，又会编织出怎样一座自由群迷宫？** 这正是[第十四章](ch14-adelic-closure-and-hurwitz-primes.md)的主题。
