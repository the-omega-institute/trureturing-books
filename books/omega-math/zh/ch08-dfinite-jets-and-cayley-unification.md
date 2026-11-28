# 第八章 任意阶 D-有限微分射流与马青有理包络

[第七章](ch07-second-order-jet-calculus.md)证明了在二阶幂零射流商环 $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$ 中，任意有理函数的状态、联络与曲率都可以通过有限步有理四则运算精确读出，无需半步 $\epsilon\text{-}\delta$ 极限。然而，数学与物理中遍布指数、正弦、余弦与反正切等经典“超越函数”，传统教科书往往以此作为不得不引入实数连续统 $\mathbb{R}$、无穷级数与超越常数 $\pi, e$ 的终极理由。

本章将这一成见彻底翻转。循着斯坦利（R. P. Stanley，1980）的 D-有限（differentiably finite）幂级数代数框架，我们把二阶射流推广至任意截断阶 $N \in \mathbb{N}$ 的有限有理多项式商环 $J_N(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^{N+1})$ 与统一有理系数流 `JetSeq`：本章在原点构造的指数、正弦、余弦与反正切射流，在任意截断阶 $N$ 下，都是由纯有理线性微分递推唯一锁定的有限多项式，其普适莱布尼茨律、指数加法律与求逆律、毕达哥拉斯恒等式以及反正切微分方程均已由零公理内核定理认证。更令人惊叹的是，我们在 `OmegaInit` 与 `OmegaMath` 零公理内核中进一步认证了**有理凯莱圆的单位模与耦合微分方程唯一性、普适形式复合链式法则以及对一切截断阶 $N$ 成立的凯莱—三角代数大一统**，并认证了一条全程不出现 $\pi$ 或反三角函数的**纯有理马青切线链**，再以交替双边包络按需把有理区间宽度收窄至 $1.57 \times 10^{-25}$ 以下。

## 8.1 任意阶 D-有限微分射流环与四大基本代数律 {#sec-ch08-dfinite-jet-ring}

要让射流留在有理域，微分方程和所选展开点的初值都得给出有理数据。设 $f$ 满足 $m$ 阶线性方程 $\sum_{j=0}^m p_j(x)f^{(j)}(x)=0$，其中 $p_j\in\mathbb{Q}[x]$。在有理普通点 $a$（即 $p_m(a)\ne0$），整条泰勒系数流有理，当且仅当 $f(a),f'(a),\ldots,f^{(m-1)}(a)$ 都有理。这可直接手推：将方程微分 $n$ 次，在 $a$ 处解出最高阶项 $p_m(a)f^{(m+n)}(a)$，其余项仅含较低阶导数、有理多项式导数与整数二项式系数。逐阶递推后除以 $k!$ 即得有理泰勒系数 $f^{(k)}(a)/k!$。这些系数可直接装进截断多项式商环。

换一个有理展开点，初值可能已经出域。譬如 $f(x)=\sqrt{1+x}$ 满足 $2(1+x)f'(x)=f(x)$，在普通点 $0$ 有 $f(0)=1$，而在另一普通点 $1$ 处，$f(1)=\sqrt{2}$、$f'(1)=\sqrt{2}/4$。以下冻结定律针对形式系数流及所列初值。

::: {.definition #def-ch08-dfinite-jets title="任意阶 D-有限有理微分射流环与四枚标准生成多项式"}
对任意自然数 $N \in \mathbb{N}$，定义 **$N$ 阶有理微分射流环**为截断商环

$$
J_N(\mathbb{Q}) \;:=\; \mathbb{Q}[\eta]/(\eta^{N+1}) \;=\; \left\{\,\sum_{k=0}^{N} c_k \eta^k \;\middle|\; c_k \in \mathbb{Q}\,\right\}, \qquad \eta^{N+1} \equiv 0.
$$

定义纯代数形式导数算子 $D : J_N(\mathbb{Q}) \to J_{N-1}(\mathbb{Q})$（记作 $f \mapsto f'$）为 $D\!\left(\sum_{k=0}^N c_k \eta^k\right) := \sum_{k=1}^N k c_k \eta^{k-1}$（$N = 0$ 时取零映射）。在零公理 `OmegaMath` 中，将所有截断阶统一表示为有理系数流 `JetSeq := ℕ → IntRatio`，系数流等价 `Equivalent` 指对一切 $k \in \mathbb{N}$ 成立 $f_k \equiv g_k$，而截断至 $N$ 阶等价 `EquivalentAt N` 指对一切 $k \le N$ 成立 $f_k \equiv g_k$（即在 $J_N(\mathbb{Q})$ 中同余）；乘法取柯西卷积 $(f \cdot g)_k = \sum_{i=0}^k f_i g_{k-i}$，形式导数取 $(Df)_k = (k+1) f_{k+1}$。四枚标准 D-有限射流生成元由其各阶有理系数唯一确定：

$$
\begin{aligned}
\mathrm{Exp}(a)_n &= \frac{a^n}{n!}, &
\mathrm{Cos}_{2k} &= \frac{(-1)^k}{(2k)!},\quad \mathrm{Cos}_{2k+1} = 0, \\
\mathrm{Sin}_{2k+1} &= \frac{(-1)^k}{(2k+1)!},\quad \mathrm{Sin}_{2k} = 0, &
\mathrm{Atan}_{2k+1} &= \frac{(-1)^k}{2k+1},\quad \mathrm{Atan}_{2k} = 0,
\end{aligned}
$$

将其截断至 $k \le N$ 即得 $J_N(\mathbb{Q})$ 中的有限多项式 $\mathrm{Exp}_N(a\eta)$、$\mathrm{Cos}_N(\eta)$、$\mathrm{Sin}_N(\eta)$ 与 $\mathrm{Atan}_N(\eta)$。
:::

无需引入任何实收敛半径或解析延拓，上述有理系数流的全部核心微积分定律——涵盖任意截断阶 $N$ 的莱布尼茨律、指数加法律与求逆律、三角微分律、毕达哥拉斯恒等式以及反正切微分方程——均已在零公理 `OmegaInit` 与 `OmegaMath` 内核中冻结认证：

::: {.theorem #thm-ch08-dfinite-calculus-laws title="任意阶 D-有限有理射流的普适微积分基本定律" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_mul_equivAt D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_exp D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_cos D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_sin D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_add D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_inverse D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq D5/S3/Quantum/AURICOmega/OmegaJetCalculus.atan_ode"}
在零公理有理系数流载体 `Omega.JetSeq`（记 `oneAddEtaSq` 为 $1 + \eta^2$）上，以下六组恒等式全部以空公理闭包严格成立：

1. **任意截断阶莱布尼茨律**（[`deriv_mul_equivAt`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_mul_equivAt)）：对一切 $N \in \mathbb{N}$ 及一切 $f, g \in \mathrm{JetSeq}$，截至 $N$ 阶（含）系数逐项等价：

   $$
   D(f \cdot g) \;\equiv_N\; (Df)\cdot g + f \cdot (Dg).
   $$

2. **指数与三角形式微分律**（[`deriv_exp`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_exp)、[`deriv_cos`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_cos)、[`deriv_sin`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_sin)）：对一切 $a \in \mathrm{IntRatio}$，全阶等价

   $$
   D\bigl(\mathrm{Exp}(a)\bigr) \;\equiv\; a \cdot \mathrm{Exp}(a), \qquad D(\mathrm{Cos}) \;\equiv\; -\mathrm{Sin}, \qquad D(\mathrm{Sin}) \;\equiv\; \mathrm{Cos}.
   $$

3. **指数加法律与有限参数求逆律**（[`exp_add`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_add)、[`exp_inverse`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_inverse)）：对一切 $a, b \in \mathrm{IntRatio}$ 有 $\mathrm{Exp}(a)\cdot\mathrm{Exp}(b) \equiv \mathrm{Exp}(a + b)$；特别地，对任意有限有理参数 $a$（$a.\mathrm{Finite}$）有

   $$
   \mathrm{Exp}(a)\cdot\mathrm{Exp}(-a) \;\equiv\; 1.
   $$

4. **精确代数毕达哥拉斯恒等式**（[`cos_sq_add_sin_sq`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq)）：全阶等价

   $$
   \mathrm{Cos}\cdot\mathrm{Cos} + \mathrm{Sin}\cdot\mathrm{Sin} \;\equiv\; 1.
   $$

5. **反正切有理微分方程**（[`atan_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.atan_ode)）：全阶等价

   $$
   (1 + \eta^2)\cdot D(\mathrm{Atan}) \;\equiv\; 1.
   $$
:::

::: {.proof}
莱布尼茨律按柯西卷积第 $k$ 项展开 $(k+1)\sum_{i=0}^{k+1} f_i g_{k+1-i} = \sum_{i=1}^{k+1} i f_i g_{k+1-i} + \sum_{i=0}^k f_i (k+1-i) g_{k+1-i}$ 并平移求和指标即对一切 $k \le N$ 逐项证毕。指数与三角导数由 $(k+1) \cdot \frac{1}{(k+1)!} = \frac{1}{k!}$ 及虚数单位幂坐标循环直接核验。指数加法律在每阶 $m$ 借二项式系数归纳化简 $\sum_{j=0}^m \frac{a^j}{j!}\frac{b^{m-j}}{(m-j)!} = \frac{(a+b)^m}{m!}$；当 $a$ 有限时 $a + (-a) \equiv 0$ 且 $\mathrm{Exp}(0) \equiv 1$，给出求逆律。对 $\mathrm{Cos}^2 + \mathrm{Sin}^2$ 施以莱布尼茨律与三角微分律得导数恒零，配以常数项 $1^2 + 0^2 = 1$ 及有理数特征零的零导数刚性（$(k+1)c_{k+1} = 0 \implies c_{k+1} = 0$）逐阶锁死为 $1$。反正切微分律由 $D(\mathrm{Atan})$ 的交替偶次系数与 $1 + \eta^2$ 逐阶伸缩相消即得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch08-stanley-dfinite title="D-有限幂级数环的文献脉络"}
**文献结果，未在本书形式化。** 将满足有限阶多项式系数线性微分方程的幂级数统称为 D-有限（differentiably finite / holonomic）级数，并证明其在加法、乘法、阿达马积及代数函数复合下封闭，源自 R. P. Stanley（*Differentiably finite power series*, *European J. Combin.* **1**(2), 175–188, 1980）。本节将其限制在纯有理截断环 $J_N(\mathbb{Q})$ 内，从而彻底绕开实数收敛域与超越数值构造。
:::

## 8.2 凯莱—三角代数大一统与 $\eta = 1/2$ 截断对账 {#sec-ch08-cayley-trig-unification}

在传统数学里，三角函数 $(\cos\theta, \sin\theta)$ 似乎天生属于超越分析，而有理凯莱圆周映射 $t \mapsto \bigl(\frac{1-t^2}{1+t^2}, \frac{2t}{1+t^2}\bigr)$ 似乎只是一条初等代数技巧。现在我们揭示两者在任意阶射流环 $J_N(\mathbb{Q})$ 内的深层同一性。首先，在零公理齐次射影圆上，凯莱像恒落单位圆已由所钉内核零公理定理严格锁定：

::: {.theorem #thm-ch08-cayley-circle-unit title="齐次有理凯莱圆的单位模恒等式" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit"}
设 $p, q \in \mathbb{Z}$ 为不全为零的带号整数（满足 `Nonzero p q`，即 $p \neq 0 \lor q \neq 0$）。在有理比值载体 `IntRatio` 上记平方和分母 $\operatorname{normSq}(p, q) = p^2 + q^2$ 与凯莱坐标

$$
\operatorname{cayleyX}(p, q) = \frac{q^2 - p^2}{p^2 + q^2}, \qquad \operatorname{cayleyY}(p, q) = \frac{2pq}{p^2 + q^2}.
$$

则两坐标平方和在比值等价关系 `IntRatio.Equivalent` 下恒等于单位 $1$：

$$
\operatorname{cayleyX}(p, q)^2 + \operatorname{cayleyY}(p, q)^2 \;\sim\; 1.
$$
:::

::: {.proof}
在纯整数算术中展开恒等式 $(q^2 - p^2)^2 + (2pq)^2 = q^4 - 2p^2 q^2 + p^4 + 4p^2 q^2 = (p^2 + q^2)^2$；由于条件 `Nonzero p q` 保证分母 $p^2 + q^2$ 为严格正自然数，平方和分子与分母平方精确相等，按 `IntRatio.Equivalent` 交叉相乘立得与 $1/1$ 等价，全程不依赖任何经典公理。完整证明由 Lean 内核检查。
:::

现在我们将这一零公理有理凯莱圆与 $J_N(\mathbb{Q})$ 中的 D-有限三角射流直接对接。因 $1 + \eta^2$ 的常数项为 $1 \neq 0$，其在有理系数流 `Omega.JetSeq` 中的逆乘积给出两条纯整数系数流 $\mathrm{CayleyCos}$ 与 $\mathrm{CayleySin}$（记作 $U, V$）：

$$
U(\eta) \;:=\; \frac{1 - \eta^2}{1 + \eta^2} \;\equiv\; 1 + 2\sum_{k \ge 1} (-1)^k \eta^{2k}, \qquad
V(\eta) \;:=\; \frac{2\eta}{1 + \eta^2} \;\equiv\; 2\sum_{k \ge 0} (-1)^k \eta^{2k+1}.
$$

在零公理 `OmegaInit` 与 `OmegaMath` 内核中，两条有理凯莱射流的耦合微分方程以及它们在任意截断阶 $N$ 下的初值唯一性均已冻结认证：

::: {.theorem #thm-ch08-cayley-ode-uniqueness title="有理凯莱射流耦合微分方程与任意截断阶唯一性" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_cos_ode D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_sin_ode D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_unique_at"}
在 `Omega.JetSeq` 中记 `CayleyCos` 为 $1 + 2\sum_{k \ge 1}(-1)^k \eta^{2k}$、`CayleySin` 为 $2\sum_{k \ge 0}(-1)^k \eta^{2k+1}$。以下三条零公理命题严格成立：

1. **有理凯莱耦合微分方程组**（[`cayley_cos_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_cos_ode)、[`cayley_sin_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_sin_ode)）：在全部次数上逐项等价

   $$
   (1 + \eta^2)\cdot D(\mathrm{CayleyCos}) \;\equiv\; (-2)\cdot\mathrm{CayleySin}, \qquad
   (1 + \eta^2)\cdot D(\mathrm{CayleySin}) \;\equiv\; 2\cdot\mathrm{CayleyCos}.
   $$

2. **任意截断阶初值唯一性**（[`cayley_unique_at`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_unique_at)）：对任意截断阶 $N \in \mathbb{N}$ 及任意一对有理系数流 $f, g \in \mathrm{JetSeq}$，若满足初值条件 $f_0 \equiv 1$、$g_0 \equiv 0$，且对一切 $k < N$ 满足耦合方程

   $$
   \bigl((1 + \eta^2)\cdot Df\bigr)_k \;\equiv\; (-2 g)_k, \qquad
   \bigl((1 + \eta^2)\cdot Dg\bigr)_k \;\equiv\; (2 f)_k,
   $$

   则 $(f, g)$ 在截至 $N$ 阶（含）的全部系数上强制等同于 $(\mathrm{CayleyCos}, \mathrm{CayleySin})$：

   $$
   f \;\equiv_N\; \mathrm{CayleyCos} \quad \land \quad g \;\equiv_N\; \mathrm{CayleySin}.
   $$
:::

::: {.proof}
耦合微分方程由 `CayleyCos` 与 `CayleySin` 的交错整数系数直接代入 $(1 + \eta^2) D(\cdot)$ 按奇偶次数逐项相消验证。对于唯一性，按次数 $k$ 强归纳：初值锁定 $k = 0$ 处 $f_0 \equiv 1 = \mathrm{CayleyCos}_0$、$g_0 \equiv 0 = \mathrm{CayleySin}_0$；设对一切 $j \le k$（$k < N$）结论已成立，比较方程在第 $k$ 阶的系数 $(k+1) f_{k+1} + (k-1) f_{k-1} \equiv -2 g_k$ 与 $(k+1) g_{k+1} + (k-1) g_{k-1} \equiv 2 f_k$（$k = 0$ 时无 $k-1$ 项），由于右端与低阶项均已分别等同于 `CayleyCos`、`CayleySin` 且乘子 $k + 1 \ge 1$ 在有理数中可逆，立得 $f_{k+1} \equiv \mathrm{CayleyCos}_{k+1}$ 且 $g_{k+1} \equiv \mathrm{CayleySin}_{k+1}$，归纳至 $N$ 证毕。完整证明由 Lean 内核检查。
:::

现在我们将形式复合算子与普适形式链式法则本身一并纳入使用 `OmegaInit` 与 `OmegaMath` 的严格端 D5 形式化（`strict_omega.axioms: []`）：对任意系数皆有限的有理流 $f, g \in \mathrm{JetSeq}$（即对一切 $k \in \mathbb{N}$ 满足 `IntRatio.Finite`）且内层常数项为零（$g_0 \equiv 0$），将形式复合 $(\mathrm{compose}\;f\;g)_n := \bigl(\sum_{k=0}^{n} f_k \cdot g^k\bigr)_n$ 定义为有限截断求和，即可对一切截断阶 $N \in \mathbb{N}$ 直接冻结普适链式法则与**凯莱—三角代数大一统**：

::: {.theorem #thm-ch08-cayley-composition-unification title="形式复合链式法则与任意阶凯莱—三角代数大一统" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.deriv_compose_equivAt D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.cos_two_atan_eq_cayley D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.sin_two_atan_eq_cayley"}
在所引 D5 声明（`strict_omega.axioms: []`）使用的有理系数流载体 `Omega.JetSeq` 上，记柯西卷积幂为 $g^k := \mathrm{power}\;g\;k$，有限截断复合为 $(\mathrm{compose}\;f\;g)_n := \bigl(\sum_{k=0}^{n} f_k \cdot g^k\bigr)_n$。以下三条零公理恒等式对**一切自然数截断阶 $N \in \mathbb{N}$** 严格成立：

1. **任意截断阶形式复合链式法则**（[`deriv_compose_equivAt`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.deriv_compose_equivAt)）：对一切 $N \in \mathbb{N}$ 与一切系数有限的有理流 $f, g \in \mathrm{JetSeq}$（满足 `Finite f`、`Finite g`）且 $g_0 \equiv 0$，截至 $N$ 阶（含）逐项等价

   $$
   D(\mathrm{compose}\;f\;g) \;\equiv_N\; \bigl(\mathrm{compose}\;(Df)\;g\bigr) \cdot Dg.
   $$

2. **凯莱—余弦代数大一统**（[`cos_two_atan_eq_cayley`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.cos_two_atan_eq_cayley)）：对一切 $N \in \mathbb{N}$，截至 $N$ 阶（含）逐项等价

   $$
   \mathrm{compose}\;\mathrm{Cos}\;(2\,\mathrm{Atan}) \;\equiv_N\; \mathrm{CayleyCos}.
   $$

3. **凯莱—正弦代数大一统**（[`sin_two_atan_eq_cayley`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.sin_two_atan_eq_cayley)）：对一切 $N \in \mathbb{N}$，截至 $N$ 阶（含）逐项等价

   $$
   \mathrm{compose}\;\mathrm{Sin}\;(2\,\mathrm{Atan}) \;\equiv_N\; \mathrm{CayleySin}.
   $$
:::

::: {.proof}
先证形式复合链式法则。因 $g$ 系数有限且 $g_0 \equiv 0$，对幂次 $k$ 归纳得所有低于 $k$ 阶的系数恒为零（$n < k \implies (g^k)_n \equiv 0$），故部分和复合 $\mathrm{partialCompose}\;f\;g\;m = \sum_{k=0}^{m-1} f_k \cdot g^k$ 只要截断项数满足 $m > n$ 即在第 $n$ 阶精确稳定于 $(\mathrm{compose}\;f\;g)_n$。另一方面，由莱布尼茨律（[@thm-ch08-dfinite-calculus-laws]）对 $k$ 归纳证得幂次求导公式 $D(g^{k+1}) \equiv (k+1)\,g^k \cdot Dg$，对有限和逐项线性相加即得 $D(\mathrm{partialCompose}\;f\;g\;(m+1)) \equiv \mathrm{partialCompose}\;(Df)\;g\;m \cdot Dg$。取 $n \le N$ 并配合上述截断稳定性，即对一切 $n \le N$ 锁定 $(D(\mathrm{compose}\;f\;g))_n \equiv \bigl(\mathrm{compose}\;(Df)\;g \cdot Dg\bigr)_n$。

再证凯莱—三角大一统。令内层流为 $g := 2\,\mathrm{Atan}$，其各项有限且常数项 $g_0 \equiv 0$；由 [@thm-ch08-dfinite-calculus-laws] 的反正切微分方程乘以 $2$ 得 $(1 + \eta^2)\cdot Dg \equiv 2$。对任意系数有限的外层流 $f$ 应用前述链式法则并与 $1 + \eta^2$ 相乘，立得 $(1 + \eta^2)\cdot D(\mathrm{compose}\;f\;g) \equiv 2\cdot\mathrm{compose}\;(Df)\;g$。分别取 $f = \mathrm{Cos}$ 与 $f = \mathrm{Sin}$，代入 $D(\mathrm{Cos}) \equiv -\mathrm{Sin}$、$D(\mathrm{Sin}) \equiv \mathrm{Cos}$ 以及常数项 $(\mathrm{compose}\;\mathrm{Cos}\;g)_0 \equiv 1$、$(\mathrm{compose}\;\mathrm{Sin}\;g)_0 \equiv 0$，恰满足 [@thm-ch08-cayley-ode-uniqueness] 所需的全部初值与耦合微分方程假设；调用唯一性定理 `cayley_unique_at` 即对任意 $N \in \mathbb{N}$ 同时证毕两式。完整证明由 Lean 内核检查。
:::

这一零公理恒等式在 $J_N(\mathbb{Q})$ 中写作 $\mathrm{Cos}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \equiv \frac{1 - \eta^2}{1 + \eta^2} \pmod{\eta^{N+1}}$ 与 $\mathrm{Sin}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \equiv \frac{2\eta}{1 + \eta^2} \pmod{\eta^{N+1}}$，彻底颠倒了传统认知：**不是有理凯莱映射在“近似”超越三角函数，而是无穷级数三角函数在绕了一大圈之后，不过是在低效地重新展开本就一步闭式的有理凯莱分数！** 下面的算例展示了求值后的坐标误差。

::: {.example #ex-ch08-cayley-first-product-tolerance title="两步凯莱乘积的最小坐标误差"}
取 $t=2/5$，精确凯莱步为 $P=(21+20i)/29$。三阶规范截断的最大坐标误差是 $32/725$。以此为每一步的容差，并要求两个有理复数因子各自的最小公分母至多为 $28$。这里的最小公分母是能同时消去两坐标分母的最小正整数。

相对于目标 $P^2=(41+840i)/841$，乘积的最小最大坐标误差是 $1/841$。唯一达到此值的无序因子对是 $z=(5+5i)/7$ 与 $w=(11+10i)/15$。乘积为 $1/21+i$，有号坐标误差为 $(-20/17661,1/841)$，模长平方偏差 $\bigl\lvert\lvert zw\rvert^2-1\bigr\rvert$ 为 $1/441$。

可用整数验算端点。把因子写成 $(a+bi)/d$，其中 $1\le d\le28$、$\gcd(a,b,d)=1$，并令 $493d\le725a\le557d$、$468d\le725b\le532d$。用分母 $D=df$ 写两因子的乘积为 $(X+Yi)/D$。若虚部误差至多为 $1/841$，则 $0\le D-Y\le2D/841<2$，因为 $D\le784$。51 个因子组成的无序对中，有 29 对满足 $D-Y=0$，另有 15 对满足 $D-Y=1$ 且 $2D\ge841$。其中只有上述因子对还满足实部条件 $\lvert841X-41D\rvert\le D$。它的虚部误差恰为 $1/841$，故任何更小的容差都无法达到。[精确算术复算](https://github.com/the-omega-institute/trureturing-books/issues/1964#issuecomment-7243255979)

若两步共用同一个因子，则 $z^2$ 的最小最大坐标误差增至 $E=1851/142129$，仅由 $z=(19+18i)/26$ 达到。平方为 $(37+684i)/676$，有号坐标误差为 $(3401/568516,1851/142129)$，模长平方偏差为 $12249/456976$。

平方的实部为 $(a+b)(a-b)/d^2$。若实部误差至多为 $E$，该实部为正且至多为 $8780/142129$。由 $a+b\ge961d/725$ 与 $d\le28$ 可知 $a-b=1$、$d\ge22$。在剩余分母内，只有 $(16+15i)/22$ 和 $(19+18i)/26$ 的平方满足虚部容差，其中只有后者也满足实部容差，其虚部误差恰为 $E$。[精确算术复算](https://github.com/the-omega-institute/trureturing-books/issues/1964#issuecomment-7243405631)
:::

::: {.example #ex-ch08-cayley-half-truncation title="有理点 $\eta = 1/2$ 映射到 $(3/5, 4/5)$ 的五档截断误差表"}
取 $\eta = \frac{1}{2}$。未截断的零公理有理凯莱映射（[@thm-ch08-cayley-circle-unit]，取 $p = 1, q = 2$）仅需两次乘法即一步命中精确毕达哥拉斯有理点 $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$，误差恒为 $0/1$。若改将 $J_N(\mathbb{Q})$ 中次数至多 $N$ 的规范多项式代表元 $U_N(\eta)$、$V_N(\eta)$ 在非零点 $\eta = \frac{1}{2}$ 处求值（注意非零点求值不下沉至商环），则截断余项在 $N = 2, 4, 6, 8, 12$ 处呈现精确的等比交错分数（手工推导）：

| 截断阶 $N$ | 规范多项式值 $U_N(\frac{1}{2})$ | 精确余弦误差 $U_N(\frac{1}{2}) - \frac{3}{5}$ | 规范多项式值 $V_N(\frac{1}{2})$ | 精确正弦误差 $V_N(\frac{1}{2}) - \frac{4}{5}$ |
| :---: | :---: | :---: | :---: | :---: |
| $2$ | $1/2$ | $-1/10$ | $1$ | $+1/5$ |
| $4$ | $5/8$ | $+1/40$ | $3/4$ | $-1/20$ |
| $6$ | $19/32$ | $-1/160$ | $13/16$ | $+1/80$ |
| $8$ | $77/128$ | $+1/640$ | $51/64$ | $-1/320$ |
| $12$ | $1229/2048$ | $+1/10240$ | $819/1024$ | $-1/5120$ |

可见每将截断阶提高 $2$，规范截断多项式误差恰好乘以公比 $-\frac{1}{4}$；若不作模 $\eta^{N+1}$ 二次截断而直接嵌套求值 $\bigl(\mathrm{Cos}_N(2\,\mathrm{Atan}_N(\frac{1}{2})),\; \mathrm{Sin}_N(2\,\mathrm{Atan}_N(\frac{1}{2}))\bigr)$，则在 $N = 12$ 处仍残留有号误差 $+1.235579 \times 10^{-5}$ 与 $-9.267049 \times 10^{-6}$——而原生有理凯莱分数在一步之内早已精准落定于 $(\frac{3}{5}, \frac{4}{5})$。
:::

这套“纯有理形式幂级数系数 $\to$ 经典实分析阴影”的双向结构，也同样照亮了经典自指超越方程 $\cos\theta = \theta$（道蒂不动点 $\theta^* \approx 0.739085$）与有理中点之间的精确桥梁。在所钉内核中，经典实分析层面的冻结定理揭示：哪怕是超越数 $\theta^*$，其全部展开系数依然诞生于纯有理形式幂级数环 $\mathbb{Q}[[X]]$ 的形式复合逆：

::: {.theorem #thm-ch08-dottie-rational-inverse-endpoint title="道蒂余弦不动点的有理形式复合逆级数端点收敛定理" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
在有理形式幂级数环 $\mathbb{Q}[[X]]$ 中，定义奇次反正弦形式幂级数 $\mathrm{arcsine} = \sum_{n=0}^{\infty} \alpha_n X^n$，其中偶次项 $\alpha_{2k} = 0$、奇次项 $\alpha_{2k+1} = \binom{2k}{k} / \bigl(4^k (2k+1)\bigr)$，并置正向级数 $\mathrm{forward} := 2X + 2\,\mathrm{arcsine} \in \mathbb{Q}[[X]]$ 及其形式复合逆 $\mathrm{inverse} \in \mathbb{Q}[[X]]$（满足 $\mathrm{forward}(\mathrm{inverse}(X)) = X$）。则存在唯一正实数 $\theta \in (0, 1)$ 满足 $\cos\theta = \theta$（对一切 $t > 0$ 且 $\cos t = t$ 必有 $t = \theta$），且纯有理系数级数在 $\pi$ 处绝对可和并收敛于 $\theta$：

$$
\sum_{n=0}^{\infty} \bigl\lvert(\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\bigr\rvert\,\pi^n < \infty, \qquad \sum_{n=0}^{\infty} (\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\,\pi^n = \theta.
$$
:::

::: {.proof}
将复平面映射 $z \mapsto z + \sin z$ 借收缩迭代 $z \mapsto (w + z - \sin z)/2$ 在开盘 $\lvert w\rvert < \frac{7}{4}$ 上唯一求逆，证明复合函数 $y \mapsto \sin(\mathrm{selectedInverse}(y/2))$ 在闭盘 $\lvert y\rvert \le \frac{13}{4}$ 上全纯且在实轴上取实值；借幂级数复合逆唯一性将其泰勒系数逐项等同于有理形式逆级数 $\mathrm{inverse}$ 的系数；最后因 $\pi < \frac{13}{4}$ 落于收敛圆盘内部，在 $y = \pi$ 处求值即得绝对可和性并满足 $\cos\theta = \theta$ 及在 $(0, \infty)$ 上的唯一性。完整证明由 Lean 内核检查。
:::

请注意 [@thm-ch08-cayley-circle-unit] 与 [@thm-ch08-dottie-rational-inverse-endpoint] 的认识论分层：前者驻留在零公理 `OmegaMath` 内核中，连 $\pi$ 与 $\mathbb{R}$ 都从未提及；后者则架起通往经典实分析阴影层的严格桥梁——它说明在经典弧度坐标下被迫陷入超越数 $\theta^*$ 的自指方程，在系数的底层基因上依然是 $\mathbb{Q}[[X]]$ 的有理对象，而一旦回到本书原生的有理保真度坐标 $\kappa \in [0, 1]$，自对偶不动点便直接还原为线性有理方程 $\kappa = 1 - \kappa \iff \kappa^* = \frac{1}{2}$。

## 8.3 纯有理马青切线链与无 $\pi$ 交替双边包络 {#sec-ch08-machin-brackets}

最后，假使下游工程或跨学科对照确实需要按给定有理精度视界 $\varepsilon_{\mathrm{self}}$ 估测传统弧度制中的圆周率常数 $\pi$，我们是否必须先假设实数 $\pi$ 存在？完全不必。只需把[第二章](ch02-homogeneous-projective-line.md)的齐次射影圆乘法写回仿射有理正切运算，整条经典的马青公式便化作一条分母处处非零的有限整数等式链与可任意收紧的纯有理交替包络。

::: {.definition #def-ch08-rational-tangent-law title="有理正切加减法与纯有理马青交替包络"}
对满足 $uv \neq 1$ 与 $uv \neq -1$ 的有理数 $u, v \in \mathbb{Q}$，分别定义**有理正切加法**与**有理正切减法**：

$$
u \oplus v \;:=\; \frac{u + v}{1 - uv}, \qquad u \ominus v \;:=\; \frac{u - v}{1 + uv}.
$$

对任意有理数 $x \in (0, 1) \cap \mathbb{Q}$ 与正整数 $M \ge 1$，记 $M$ 项截断交替和 $A_M(x) := \sum_{k=0}^{M-1} \frac{(-1)^k x^{2k+1}}{2k+1} \in \mathbb{Q}$。对任意正整数 $M \ge 1$，利用正项严格单调递减的交替奇偶界，定义纯有理上下端点

$$
\begin{aligned}
L_M &:= 16 \min\!\bigl(A_M(\tfrac{1}{5}),\; A_{M+1}(\tfrac{1}{5})\bigr) - 4 \max\!\bigl(A_M(\tfrac{1}{239}),\; A_{M+1}(\tfrac{1}{239})\bigr) \;\in\; \mathbb{Q}, \\
U_M &:= 16 \max\!\bigl(A_M(\tfrac{1}{5}),\; A_{M+1}(\tfrac{1}{5})\bigr) - 4 \min\!\bigl(A_M(\tfrac{1}{239}),\; A_{M+1}(\tfrac{1}{239})\bigr) \;\in\; \mathbb{Q},
\end{aligned}
$$

称闭区间 $[L_M, U_M] \subset \mathbb{Q}$ 为 **$M$ 阶无 $\pi$ 马青有理包络**，其精确有理宽度为 $W_M := U_M - L_M \in \mathbb{Q}_{>0}$。
:::

从单一种子有理数 $t_1 = \frac{1}{5}$ 出发，仅作三次纯有理加减运算，便得到**分母处处非零、全程不出现 $\pi$ 或 $\arctan$ 的有限马青切线链**：

$$
t_1 = \frac{1}{5} \;\longmapsto\; t_2 = t_1 \oplus t_1 = \frac{2/5}{24/25} = \frac{5}{12} \;\longmapsto\; t_4 = t_2 \oplus t_2 = \frac{5/6}{119/144} = \frac{120}{119} \;\longmapsto\; t_4 \ominus \frac{1}{239} = \frac{120 \cdot 239 - 119}{119 \cdot 239 + 120} = \frac{28561}{28561} = 1.
$$

末步约分前分子与分母严格同等于 $28561 = 13^4$，一举抵达自对偶锚点 $1$（即齐次射影圆上的赤道点 $[1 : 1]$）。这一有限整数切线链已在零公理 `OmegaInit` 与 `OmegaMath` 内核中冻结认证：

::: {.theorem #thm-ch08-machin-rational-chain title="纯有理马青切线链直抵自对偶锚点" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.machin_rational_chain"}
在零公理有理比值载体 `Omega.IntRatio` 上，以齐次圆群乘法诱导的有理正切加减法 `tangentAdd`（$\oplus$）与 `tangentSub`（$\ominus$）定义马青切线链

$$
\mathrm{machinChain} \;:=\; \left(\left(\frac{1}{5} \oplus \frac{1}{5}\right) \oplus \left(\frac{1}{5} \oplus \frac{1}{5}\right)\right) \ominus \frac{1}{239}.
$$

则 $\mathrm{machinChain}$ 在 `IntRatio.Equivalent` 下等价于整数 $1$：

$$
\mathrm{machinChain} \;\equiv\; 1.
$$
:::

::: {.proof}
经齐次圆群乘法逐次倍增：首步把 $(1, 5)$ 自乘得 $(10, 24)$，与约简代表 $(5, 12)$ 等价；次步把 $(5, 12)$ 自乘得 $(120, 119)$；末步减去有理数 $1/239$（即与 $(-1, 239)$ 作齐次圆群乘法）得未约简整数对 $(28561, 28561)$，因 $28561 = 13^4 > 0$，交叉相乘立得与 `IntRatio.ofInt 1` 等价。完整证明由 Lean 内核检查。
:::

在此零公理切线链之上，利用相邻部分和之差恰为第 $M$ 项绝对值 $\lvert A_{M+1}(x) - A_M(x)\rvert = \frac{x^{2M+1}}{2M+1}$，上下端点之差当场化为精确闭式有理宽度（手工推导）：

$$
W_M \;=\; U_M - L_M \;=\; \frac{16}{5^{2M+1}(2M+1)} \;+\; \frac{4}{239^{2M+1}(2M+1)} \;\in\; \mathbb{Q}_{>0}.
$$

在纯有理世界内部，这套嵌套区间列 $[L_1, U_1] \supset [L_2, U_2] \supset \cdots$ 满足严格的有理不等式 $L_M < L_{M+1} < U_{M+1} < U_M$，且只要观察者提出任何正有理精度预算 $\varepsilon_{\mathrm{self}} = p/q > 0$，有限次乘法即可挑出使 $W_M < \varepsilon_{\mathrm{self}}$ 的阶数 $M$——**全程无需假定实数 $\pi$ 作为已完成无穷小数先验存在**。仅当经单向阴影函子 $\Pi_{\mathbb{R}}$ 投射至经典实分析时，由 $\tan(4\arctan\frac{1}{5} - \arctan\frac{1}{239}) = 1$ 及 $0 < 4\arctan\frac{1}{5} - \arctan\frac{1}{239} < \frac{\pi}{2}$ 才将这一嵌套有理族的交点认作传统常数 $\pi$。

下图将本章两条纯有理收敛机制并置对照：左侧展示 $\eta = \frac{1}{2}$ 处 $J_N(\mathbb{Q})$ 规范截断多项式如何以公比 $-\frac{1}{4}$ 逼近一步命中的凯莱圆点 $(\frac{3}{5}, \frac{4}{5})$，右侧展示无 $\pi$ 马青有理区间 $[L_M, U_M]$ 的精确宽度收缩。

::: {.figure src="ch08-dfinite-machin-brackets"}
**D-有限凯莱截断收敛与无 $\pi$ 马青有理包络收缩。** 左侧对照一步命中的有理凯莱圆点 $(\frac{3}{5}, \frac{4}{5})$（[@thm-ch08-cayley-circle-unit]）与 $J_N(\mathbb{Q})$ 规范多项式在 $\eta = \frac{1}{2}$ 处随截断阶 $N = 2, 4, 6, 8, 12$ 呈现的 $-\frac{1}{4}$ 交错几何误差衰减（[@thm-ch08-cayley-ode-uniqueness]、[@thm-ch08-cayley-composition-unification]、[@ex-ch08-cayley-half-truncation]）；右侧展示由纯有理马青切线链（[@thm-ch08-machin-rational-chain]）驱动的嵌套有理区间 $[L_M, U_M]$ 及其精确宽度 $W_M = \frac{16}{5^{2M+1}(2M+1)} + \frac{4}{239^{2M+1}(2M+1)}$ 随阶数 $M$ 的几何收缩。
:::

::: {.example #ex-ch08-machin-width-table title="无 $\pi$ 马青有理包络宽度 $W_M$ 的七档精确收缩表"}
在首阶 $M = 1$ 处，纯分数算术直接给出精确闭区间 $[L_1, U_1] = \bigl[\frac{281476}{89625},\; \frac{651864872}{204778785}\bigr]$（端点四舍五入至六位小数为 $3.140597$ 与 $3.183264$），精确有理宽度为 $W_1 = \frac{218431204}{5119469625} \approx 4.266676 \times 10^{-2}$。随截断阶 $M$ 递增，精确宽度 $W_M$ 按每步约 $25^{-1}$ 的几何倍率急剧收窄，至 $M = 17$ 时已收紧至 $1.57 \times 10^{-25}$ 量级（手工推导与精确有理算术核验）：

| 阶数 $M$ | $5$-主项分母 $5^{2M+1}(2M+1)$ | 精确包络宽度 $W_M$（七位有效数字） | 等效十进制锁定精度 |
| :---: | :---: | :---: | :---: |
| $1$ | $375$ | $4.266676 \times 10^{-2}$ | 约 $1$ 位 |
| $2$ | $15{,}625$ | $1.024000 \times 10^{-3}$ | 约 $3$ 位 |
| $4$ | $17{,}578{,}125$ | $9.102222 \times 10^{-7}$ | 约 $6$ 位 |
| $6$ | $15{,}869{,}140{,}625$ | $1.008246 \times 10^{-9}$ | 约 $9$ 位 |
| $8$ | $12{,}969{,}970{,}703{,}125$ | $1.233619 \times 10^{-12}$ | 约 $12$ 位 |
| $12$ | $7{,}450{,}580{,}596{,}923{,}828{,}125$ | $2.147484 \times 10^{-18}$ | 约 $17$ 位 |
| $17$ | $1.018634 \times 10^{26}$ | $1.570731 \times 10^{-25}$ | 逾 $24$ 位 |

即便在 $M = 17$ 处，所有计算依然是有限位整数分子与分母的四则运算，不触碰半个超越数或无穷极限。
:::

## 8.4 从局部代数射流走向全域无细分积分 {#sec-ch08-bridge-to-ch09}

走完第七章与第八章，微积分的“微分”一翼已在纯有理域内彻底脱胎换骨：二阶射流环 $\mathcal{J}_2(\mathbb{Q})$ 精确锁住了状态、联络与曲率的 `{0 · 1/2 · 1}` 同步读出，而任意阶 D-有限射流环 $J_N(\mathbb{Q})$ 给出了指数、正弦、余弦与反正切在原点的有理截断；配合有理凯莱切线链，还能逐阶收紧圆周率包络。

::: {.film src="jets-of-any-order"}
**从一行有理系数到马青切线链：任意阶射流不借 $\pi$ 讲清三角函数与圆周率（2 分 52 秒）。** 片中先把 $N$ 阶射流画成一行 $N + 1$ 个有理系数，求导即把每个系数左移一格并乘以原来的次数；指数、余弦、正弦与反正切四行系数逐格列出，余弦平方加正弦平方在 $0$ 至 $12$ 阶逐格算得 $1, 0, 0, \dots$（青色 NUM，屏幕计算），绿色 LEAN ✓ 只给每一阶都成立的毕达哥拉斯恒等式（[@thm-ch08-dfinite-calculus-laws]）。随后单位圆上的品红色弦把 $t = \frac{1}{2}$ 送到琥珀色点 $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$（[@thm-ch08-cayley-circle-unit]）；余弦行与两倍反正切行复合后，阶乘与奇数分母相消只剩 $\pm 2$，与 CayleyCos 逐格相等（[@thm-ch08-cayley-composition-unification]），“级数只是在重新展开分式”以紫色框标为本章解读。$\eta = \frac{1}{2}$ 处的截断误差表与公比 $-\frac{1}{4}$（[@ex-ch08-cayley-half-truncation]）、无 $\pi$ 包络的端点与逐阶宽度柱状图（[@ex-ch08-machin-width-table]）均为屏幕上的精确重算；马青切线链 $\frac{1}{5} \mapsto \frac{5}{12} \mapsto \frac{120}{119} \mapsto \frac{28561}{28561} = 1$ 带绿色 LEAN ✓（[@thm-ch08-machin-rational-chain]）；只有在经典阴影中才把嵌套区间的交点称作 $\pi$，标为紫色论证。
:::

在下面的交互实验卡中，读者可以亲自步进调节截断阶 $N = 2, 4, \dots, 12$ 与马青包络阶数 $M$：在 $\eta = \frac{1}{2}$ 处实时对比一步精确命中的有理凯莱点 $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ 与规范多项式 $U_N(\frac{1}{2})$、$V_N(\frac{1}{2})$ 逐档收敛至 $\bigl(+\frac{1}{10240}, -\frac{1}{5120}\bigr)$ 的分数余项，同时沿着纯有理马青切线链 $\frac{1}{5} \mapsto \frac{5}{12} \mapsto \frac{120}{119} \mapsto \frac{28561}{28561} = 1$ 观测无 $\pi$ 包络宽度 $W_M$ 按每步约 $25^{-1}$ 的倍率向零收窄。

::: {.viz src="dfinite-algebraic-schur-lab" preset="dfinite-cayley-machin" height="520"}
**D-有限凯莱统一与无 $\pi$ 马青包络实验卡（`dfinite-cayley-machin`）。** 步进切换截断阶 $N = 2 \dots 12$，在有理点 $\eta = \frac{1}{2} \mapsto \bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ 处实时对照一步闭式凯莱有理点与 $J_N(\mathbb{Q})$ 截断多项式的精确分数误差（[@thm-ch08-dfinite-calculus-laws]、[@thm-ch08-cayley-ode-uniqueness]、[@thm-ch08-cayley-composition-unification]），并递增马青阶数 $M$ 追踪有理切线链（[@thm-ch08-machin-rational-chain]）与嵌套区间 $[L_M, U_M]$ 宽度 $W_M$ 的收缩过程。
:::

剩下的另一翼同样关键：如果微分的原子不再是平直切线，那么**积分、斯托克斯定理与光滑流形本身**，能否也彻底摆脱无限加密的黎曼矩形、平直切板 $T_p M \cong \mathbb{R}^n$ 与非解析 $C^\infty$ 隆起函数？这正是[第九章](ch09-telescoping-stokes-and-arc-manifold.md)的主题——我们将用流群精确伸缩消去、无选择公理单纯形锥同伦与吻合三元球流形 $\mathcal{M}_\Omega$，为第三卷画上圆满句号。
