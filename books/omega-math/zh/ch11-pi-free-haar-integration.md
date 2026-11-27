# 第十一章 三维球面无 π 阶乘哈尔积分与特征核正交性

> *“在实单位四元数群上，表面积与四个半整数伽马因子中的 $\pi$ 恰好对消。每个偶次单项式的归一化哈尔矩都能写成有限的阶乘比。”*

[第十章](ch10-peter-weyl-rational-spin-shells.md) 在有号实单位四元数群 $\mathrm{SU}(2)\cong S^3(\mathbb R)$ 上用 $D^j(q)$ 的矩阵元计算傅里叶系数。各自旋表示的迹 $\chi_j(q)=U_{2j}(c)$（$c=\operatorname{Re}(q)$）在归一化哈尔测度下构成平方可积类函数空间的标准正交基。整数自旋 $j=n$ 的特征标等于 $E_n(\kappa)$，其中 $\kappa=c^2$。对 $j=n+\tfrac12$，特征标在 $q\mapsto-q$ 时变号，而其平方是 $\kappa$ 的多项式。本章用有限阶乘公式计算多项式信号的归一化哈尔平均，包括整数自旋特征标的内积。

第 11.1 节的高斯推导把实单位三维球面的归一化哈尔矩写为阶乘比。特别地，$\mathbb E_{\mathrm{SU}(2)}[\kappa^k]=C_k/4^k$，其中 $C_k$ 是第 $k$ 个卡塔兰数。下文四条 Lean 声明在 `Omega.IntRatio.Equivalent` 下证明有理矩递推、前三个特征标的格拉姆矩阵，以及全阶均值和内积恒等式。它们的公理依赖在严格后端记录为 `[]`，在官方后端记录为 `[propext]`。

---

## 11.1 三维球面无 $\pi$ 奇迹：为何 $\pi^2$ 在维度 $3$ 上百分之百精确对消 {#sec-ch11-pi-cancellation-miracle}

让我们先用经典分析的视角解剖这个奇迹的来历，再把它彻底重写为零公理的内部代数定义。

考虑四维欧氏空间 $\mathbb{R}^4$（其单位球面正是三维三元球面 $S^3 = \{q = (w, x, y, z) \in \mathbb{R}^4 \mid w^2 + x^2 + y^2 + z^2 = 1\}$）上的四重高斯矩积分，其中 $a, b, c, d \in \mathbb{N}$ 且 $m := a + b + c + d$：

$$
I(a, b, c, d) \;:=\; \int_{\mathbb{R}^4} w^{2a} x^{2b} y^{2c} z^{2d}\,e^{-(w^2 + x^2 + y^2 + z^2)}\,dw\,dx\,dy\,dz.
$$

用两种坐标系分别计算同一个积分 $I(a, b, c, d)$，奇迹便在等号两侧当场发生。

**第一路：笛卡尔直角坐标分离变量。** 积分裂解为四枚独立的一维偶次高斯积分之积。对任意自然数 $k \in \mathbb{N}$，代换 $u = t^2$ 立即给出半整数伽马函数：

$$
\int_{-\infty}^{+\infty} t^{2k}\,e^{-t^2}\,dt \;=\; \Gamma\!\left(k + \frac{1}{2}\right) \;=\; \frac{(2k - 1)!!}{2^k}\,\Gamma\!\left(\frac{1}{2}\right) \;=\; \frac{(2k)!}{4^k\,k!}\,\sqrt{\pi}.
$$

四根坐标轴的因子相乘，四枚 $\Gamma(\frac{1}{2}) = \sqrt{\pi}$ 恰好两两凑整为完整的**二次幂 $\pi^2$**，不留半点根号：

$$
I(a, b, c, d) \;=\; \Gamma\!\left(\frac{1}{2}\right)^4 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^{a+b+c+d}\,a!\,b!\,c!\,d!} \;=\; \pi^2 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!}.
$$

**第二路：四维超球面极坐标分解。** 令 $q = r\,\omega$（$r > 0$，$\omega \in S^3$），体积元化为 $r^3\,dr\,d\sigma(\omega)$。记 $S^3$ 的三维超表面积为 $\sigma(S^3) = \frac{2\pi^2}{\Gamma(2)} = 2\pi^2$，归一化哈尔概率测度为 $d\mu(\omega) = \frac{d\sigma(\omega)}{2\pi^2}$。于是积分分离为径向积分与球面哈尔期望之积：

$$
I(a, b, c, d) \;=\; \left(\int_0^{\infty} r^{2m + 3}\,e^{-r^2}\,dr\right) \cdot \sigma(S^3) \cdot \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right].
$$

对径向积分令 $u = r^2$（$r\,dr = \frac{1}{2}\,du$），得到**纯整数阶乘的伽马值**：

$$
\int_0^{\infty} r^{2m + 3}\,e^{-r^2}\,dr \;=\; \frac{1}{2}\int_0^{\infty} u^{m + 1}\,e^{-u}\,du \;=\; \frac{1}{2}\,\Gamma(m + 2) \;=\; \frac{(m + 1)!}{2}.
$$

把它乘上三维球面表面积 $\sigma(S^3) = 2\pi^2$，因子 $2$ 与 $\frac{1}{2}$ 抵消，左侧系数精确等于 $\pi^2\,(m + 1)!$！现在把两路结果划上等号：

$$
\pi^2 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!} \;=\; \pi^2\,(m + 1)! \cdot \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right].
$$

两边同时划去 $\pi^2$——整部调和分析中最惊心动魄的净空时刻出现了：

$$
\mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right] \;\equiv\; \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!\,(m + 1)!} \;\in\; \mathbb{Q}_+, \qquad m \;=\; a + b + c + d.
$$

本章选取经典实单位球面 $S^3\subset\mathbb R^4$。在这个维数上，矩公式有两处约消。

- **对比一维圆周 $S^1$（$n = 2$）**：虽也有 $\sigma(S^1) = 2\pi$ 与 $\Gamma(\frac{1}{2})^2 = \pi$ 对消及分母 $m!$，但 $S^1$ 是阿贝尔交换群，一切不可约表示都是一维标量，无法承载非对易三维曲率与旋转旋量；
- **对比二维球面 $S^2$（$n = 3$）**：$\Gamma(\frac{1}{2})^3 = \pi\sqrt{\pi}$ 带有无理根号，径向分母 $\Gamma(m + \frac{3}{2})$ 落在半整数阶乘之上；更根本的是，$S^2$ 因 $\chi(S^2) = 2$ 根本不是群，连群不变哈尔测度与彼得—魏尔特征标代数都不存在；
- **唯有三维球面 $S^3 \cong \mathrm{Sp}(1)$（$n = 4$）**：它是**唯一既非阿贝尔又是紧李群的球面**，同时四维坐标使 $\Gamma(\frac{1}{2})^4 = \pi^2$ 与 $\sigma(S^3) = 2\pi^2$ 无根号精确对消，且径向伽马因子 $\Gamma(m + 2) / \Gamma(2) = (m + 1)!$ 直接化为纯整数阶乘！

::: {.remark #rem-ch11-shadow-vs-intrinsic title="经典高斯推导与内生阶乘定义（文献结果与代数重构）"}
借助高斯积分与伽马函数计算球面单项式积分的经典技巧见 G. B. Folland（*Amer. Math. Monthly* **108**(5), 446–448, 2001，文献结果）。在 `OmegaMath` 的零公理体系中，上述推导扮演的是**阴影对齐验证**的角色：它向熟悉经典实分析的读者解释“为何 $\pi$ 必定消失”；而在零公理内核内部，我们根本不需要先构造 $\mathbb{R}$、$\pi$ 或勒贝格测度，而是直接把阶乘公式作为有理线性泛函的内生定义，并仅凭整数四则运算验明其齐次不变性、归一性、对称性与正交性！
:::

---

## 11.2 阶乘泛函、齐次不变性与精确有理矩递推 {#sec-ch11-intrinsic-functional-and-recurrence}

把多项式矩公式用于射影读数 $P(q)/\lVert q\rVert^{2m}$，其中 $P$ 是有理系数的 $2m$ 次齐次多项式。在实单位球面上分母等于一，由线性性可将哈尔期望逐项化为 $P$ 的单项式矩。该读数与非零齐次代表元的选取无关。

::: {.definition #def-ch11-pi-free-haar title="三维球面无 π 有理阶乘哈尔期望泛函"}
对任意非负整数四元组 $(p, q, r, s) \in \mathbb{N}^4$，记总次数 $2m = p + q + r + s$。定义零次齐次单项式 $w^p x^q y^r z^s / \lVert q\rVert^{p+q+r+s}$ 上的有理线性泛函 $\mathbb{E}_{\mathrm{SU}(2)}$：

1. 若 $p, q, r, s$ 中至少有一个为奇数，则由四坐标轴独立符号翻转对称性，定义其期望严格为 $0$；
2. 若全为偶数 $(p, q, r, s) = (2a, 2b, 2c, 2d)$ 且 $m = a + b + c + d$，则定义

   $$
   H(a, b, c, d) \;:=\; \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right] \;:=\; \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!\,(m + 1)!} \;\in\; \mathbb{Q}_+,
   $$

   并按有理数线性组合延拓至一切以 $\lVert q\rVert^{2m}$ 为分母的偶次齐次多项式比。
:::

这套纯有理定义要成为良定义的球面泛函，必须通过一道最锋利的内部一致性检验：同一有理函数写成 $\frac{P(q)}{\lVert q\rVert^{2m}}$ 与分子分母同乘 $\lVert q\rVert^2 = w^2 + x^2 + y^2 + z^2$ 写成 $\frac{(w^2 + x^2 + y^2 + z^2)P(q)}{\lVert q\rVert^{2m + 2}}$ 时，泛函给出的数值必须分毫不差地相等！

用不到三行纯整数阶乘约分，就能不借任何积分或极限将其证毕。对任意 $(a, b, c, d) \in \mathbb{N}^4$（$m = a + b + c + d$），将 $a$ 递增 $1$ 后阶乘比值立得：

$$
\frac{H(a + 1, b, c, d)}{H(a, b, c, d)} \;=\; \frac{(2a + 2)(2a + 1)}{4\,(a + 1)\,(m + 2)} \;=\; \frac{2a + 1}{2\,(m + 2)}.
$$

由于公式对四枚坐标完全对称，将四项分子直接相加：

$$
\frac{H(a + 1, b, c, d) + H(a, b + 1, c, d) + H(a, b, c + 1, d) + H(a, b, c, d + 1)}{H(a, b, c, d)} \;=\; \frac{(2a + 1) + (2b + 1) + (2c + 1) + (2d + 1)}{2\,(m + 2)} \;=\; \frac{2m + 4}{2\,(m + 2)} \;\equiv\; 1.
$$

这一行恒等式堪称零公理代数之玉：**无需面积微元、无需极坐标雅可比行列式，单纯凭 $(2a + 1) + (2b + 1) + (2c + 1) + (2d + 1) = 2(m + 2)$ 这条小学加法，就证明了 $H(a, b, c, d)$ 在球面关系 $w^2 + x^2 + y^2 + z^2 = \lVert q\rVert^2$ 下严格良定义，且自然满足归一化 $H(0, 0, 0, 0) = 1$**。作为顺手交叉检验，取二次幂展开 $(w^2 + x^2 + y^2 + z^2)^2$ 的四项纯四次方与十二项交叉平方项：由 $H(2, 0, 0, 0) = \frac{4!}{4^2 \cdot 2! \cdot 3!} = \frac{1}{8}$ 与 $H(1, 1, 0, 0) = \frac{2! \cdot 2!}{4^2 \cdot 1! \cdot 1! \cdot 3!} = \frac{1}{24}$，立即核对 $4 \times \frac{1}{8} + 12 \times \frac{1}{24} = \frac{1}{2} + \frac{1}{2} = 1$。

现在把上述步进比值特化到保真度 $\kappa = w^2 / \lVert q\rVert^2$ 的纯幂次，即令 $a = k$、$b = c = d = 0$（于是 $m = k$），记第 $k$ 阶无 $\pi$ 标量矩为 $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^k] = H(k, 0, 0, 0) = \frac{(2k)!}{4^k\,k!\,(k + 1)!}$（零阶初值由定义立得 $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^0] = 1$）。相邻两阶有理矩之间的精确阶乘比递推律已在 `OmegaInit` 与 `OmegaMath` 的严格后端上对一切自然数 $k \in \mathbb{N}$ 严格证成：

::: {.theorem #thm-ch11-haar-kappa-moment-succ title="三维球面无 π 标量保真度矩的阶乘递推律" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.haarKappaMoment_succ"}
对 $k\in\mathbb N$，`haarKappaMoment k` 表示 $(2k)!/(4^k k!(k+1)!)$，`haarKappaStep k` 表示 $(2k+1)/(2(k+2))$。在 `Omega.IntRatio.Equivalent` 下有递推式

$$
\operatorname{haarKappaMoment}(k+1)\;\equiv\;\operatorname{haarKappaMoment}(k)\cdot\operatorname{haarKappaStep}(k).
$$
:::

::: {.proof}
按阶乘递推展开左端：分子为 $(2k + 2)! = 2(k + 1)(2k + 1)(2k)!$，严格正分母为 $4^{k + 1}(k + 1)!(k + 2)! = 4(k + 1)(k + 2)\cdot 4^k\,k!\,(k + 1)!$。右端两分数相乘给出分子 $(2k)!(2k + 1)$ 与严格正分母 $2(k + 2)\cdot 4^k\,k!\,(k + 1)!$。由于 $4(k + 1)(k + 2) = 2(k + 1)\cdot 2(k + 2)$，两端在 `Omega.IntRatio.Equivalent` 下交叉相乘得到完全相同的自然数乘积，全程不依赖实数或任何公理。完整证明由 Lean 内核检查。
:::

展开封闭式更藏着一颗意想不到的组合明珠：

$$
\mathbb{E}_{\mathrm{SU}(2)}\!\left[\kappa^k\right] \;=\; H(k, 0, 0, 0) \;=\; \frac{(2k)!}{4^k\,k!\,(k + 1)!} \;=\; \frac{1}{4^k}\,\frac{1}{k + 1}\binom{2k}{k} \;=\; \frac{C_k}{4^k},
$$

其中 $C_k = 1, 1, 2, 5, 14, 42, \dots$ 正是组合数学中大名鼎鼎的**第 $k$ 个卡塔兰数（Catalan number）**！从经典阴影回望，这一巧合并非偶然：$\mathrm{SU}(2)$ 上共轭类关于半角 $\phi$ 的外尔积分权重正是 $\frac{2}{\pi}\sin^2\phi\,d\phi$，映到 $c = \cos\phi \in [-1, 1]$ 上恰好化为维格纳半圆律 $\frac{2}{\pi}\sqrt{1 - c^2}\,dc$，而半圆律的第 $2k$ 阶矩历来就是 $C_k / 4^k$。但在 `OmegaMath` 中，我们彻底抛弃了半圆积分和 $\pi$，仅靠一步乘以 $\frac{2k+1}{2(k+2)}$ 便生成全部精确矩：

| 阶数 $k$ | 卡塔兰数 $C_k$ | 递推倍率 $\frac{2k - 1}{2(k + 1)}$ | 精确有理矩 $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^k] = C_k / 4^k$ |
| ---: | ---: | ---: | ---: |
| $0$ | $1$ | — | $1$ |
| $1$ | $1$ | $1/4$ | $1/4$ |
| $2$ | $2$ | $1/2$ | $1/8$ |
| $3$ | $5$ | $5/8$ | $5/64$ |
| $4$ | $14$ | $7/10$ | $7/128$ |
| $5$ | $42$ | $3/4$ | $21/512$ |

::: {.figure src="ch11-haar-shells"}
**无 π 的矩给出特征标的哈尔正交归一性。** 左图的青色标记给出五个精确分数。右图画出三个特征标，并标出其哈尔内积。
:::

---

## 11.3 纯有理正交归一性：彼得—魏尔特征核的精确对账 {#sec-ch11-peter-weyl-orthonormality}

拿到由 [@thm-ch11-haar-kappa-moment-succ] 与初值 $\mathbb{E}[\kappa^0] = 1$ 生成的五个精确有理分数 $\mathbb{E}[\kappa^0] = 1$ 到 $\mathbb{E}[\kappa^4] = \frac{7}{128}$ 之后，最痛快的一刻来了：不需要任何三角函数积化和差公式，不需要任何分部积分，甚至不需要知道 $\pi \approx 3.14159$，我们在关于 $\kappa$ 的多项式上定义无 $\pi$ 球面有理内积

$$
\langle f, g\rangle_{\mathrm{SU}(2)} \;:=\; \operatorname{haarInner}(f, g) \;:=\; \mathbb{E}_{\mathrm{SU}(2)}\!\bigl[f(\kappa)\,g(\kappa)\bigr].
$$

在登顶全阶普遍定理之前，先看最透明的低阶具体锚点：在 `OmegaInit` 与 `OmegaMath` 的严格后端上，[第十章](ch10-peter-weyl-rational-spin-shells.md)的前三座核心整数自旋壳特征标 $\chi_0(\kappa) = 1$、$\chi_1(\kappa) = 4\kappa - 1$ 与 $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ 立刻被证成精确标准正交系：

::: {.theorem #thm-ch11-peter-weyl-chi012-orthonormal title="前三阶偶次彼得—魏尔特征核的哈尔正交归一性" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal"}
记 $H_{ij}=\operatorname{haarInner}(\chi_i,\chi_j)$ 为系数表 $\chi_0,\chi_1,\chi_2$ 的有理配对。在 `Omega.IntRatio.Equivalent` 下，六个矩阵元满足

$$
\begin{aligned}
H_{00} &\equiv 1, & H_{01} &\equiv 0, & H_{02} &\equiv 0, \\
H_{11} &\equiv 1, & H_{12} &\equiv 0, & H_{22} &\equiv 1.
\end{aligned}
$$
:::

::: {.proof}
将六组多项式乘积 $\chi_i(\kappa)\chi_j(\kappa)$（$0 \le i \le j \le 2$）分别展开为次数不超过 $4$ 的整系数多项式，由 `haarInner` 的线性性逐项代入由 [@thm-ch11-haar-kappa-moment-succ] 与 $\mathbb{E}[\kappa^0] = 1$ 给出的五枚精确矩 $1, \frac{1}{4}, \frac{1}{8}, \frac{5}{64}, \frac{7}{128}$（完整逐项展开见下述 [@ex-ch11-orthonormality-hand-ledger]）。全部六项在 `Omega.IntRatio.Equivalent` 下经纯整数交叉相乘化简后，三条对角项等价于 $1$、三条非对角项等价于 $0$，全程零 $\pi$、零实数、零公理。完整证明由 Lean 内核检查。
:::

下面把 [@thm-ch11-peter-weyl-chi012-orthonormal] 的六组有理展开连同半整数壳归一化摊开在纸面上逐项核对：

::: {.example #ex-ch11-orthonormality-hand-ledger title="零误差手算对账：$\chi_0, \chi_1, \chi_2$ 与半整数平方核的无 π 正交归一性"}
将 $\mathbb{E}[\kappa^0] = 1,\; \mathbb{E}[\kappa^1] = \frac{1}{4},\; \mathbb{E}[\kappa^2] = \frac{1}{8},\; \mathbb{E}[\kappa^3] = \frac{5}{64},\; \mathbb{E}[\kappa^4] = \frac{7}{128}$ 逐项代入各项多项式展开：

1. **零阶单极壳自范数 $\langle \chi_0, \chi_0\rangle$**：

   $$
   \langle \chi_0, \chi_0\rangle \;=\; \mathbb{E}[1] \;=\; 1.
   $$

2. **零阶与一阶伴随壳正交 $\langle \chi_0, \chi_1\rangle$**：

   $$
   \langle \chi_0, \chi_1\rangle \;=\; \mathbb{E}[4\kappa - 1] \;=\; 4 \cdot \frac{1}{4} - 1 \;=\; 1 - 1 \;=\; 0.
   $$

3. **零阶与二阶四极壳正交 $\langle \chi_0, \chi_2\rangle$**：

   $$
   \langle \chi_0, \chi_2\rangle \;=\; \mathbb{E}[16\kappa^2 - 12\kappa + 1] \;=\; 16 \cdot \frac{1}{8} - 12 \cdot \frac{1}{4} + 1 \;=\; 2 - 3 + 1 \;=\; 0.
   $$

4. **一阶伴随壳自范数 $\langle \chi_1, \chi_1\rangle$**：展开 $(4\kappa - 1)^2 = 16\kappa^2 - 8\kappa + 1$，得

   $$
   \langle \chi_1, \chi_1\rangle \;=\; 16 \cdot \frac{1}{8} - 8 \cdot \frac{1}{4} + 1 \;=\; 2 - 2 + 1 \;=\; 1.
   $$

5. **一阶与二阶壳正交 $\langle \chi_1, \chi_2\rangle$**：展开 $(4\kappa - 1)(16\kappa^2 - 12\kappa + 1) = 64\kappa^3 - 64\kappa^2 + 16\kappa - 1$，得

   $$
   \langle \chi_1, \chi_2\rangle \;=\; 64 \cdot \frac{5}{64} - 64 \cdot \frac{1}{8} + 16 \cdot \frac{1}{4} - 1 \;=\; 5 - 8 + 4 - 1 \;=\; 0.
   $$

6. **二阶四极壳自范数 $\langle \chi_2, \chi_2\rangle$**：展开 $(16\kappa^2 - 12\kappa + 1)^2 = 256\kappa^4 - 384\kappa^3 + 176\kappa^2 - 24\kappa + 1$，得

   $$
   \langle \chi_2, \chi_2\rangle \;=\; 256 \cdot \frac{7}{128} - 384 \cdot \frac{5}{64} + 176 \cdot \frac{1}{8} - 24 \cdot \frac{1}{4} + 1 \;=\; 14 - 30 + 22 - 6 + 1 \;=\; 1.
   $$

所有分母竟然在乘上多项式系数后统统化为整数！这三座壳层的格拉姆矩阵精确等于三阶单位阵：

$$
\bigl(\langle \chi_i, \chi_j\rangle_{\mathrm{SU}(2)}\bigr)_{i, j \in \{0, 1, 2\}} \;=\; \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \;=\; I_3.
$$

连半整数自旋壳的归一化也可一步验明：$\mathbb{E}[\chi_{1/2}^2] = \mathbb{E}[4\kappa] = 4 \cdot \frac{1}{4} = 1$，而 $\mathbb{E}[\chi_{3/2}^2] = \mathbb{E}[64\kappa^3 - 64\kappa^2 + 16\kappa] = 5 - 8 + 4 = 1$！同时，因为任意奇数次单项式期望为零，整数壳与半整数壳的交叉内积 $\langle \chi_m, \chi_{n + 1/2}\rangle$ 亦恒等于 $0$。
:::

阶乘矩泛函将常值特征标映至一，将所有正阶偶次特征标映至零。第 11.1 节的高斯推导将这一有理泛函的取值与实球面的归一化哈尔均值对应。

::: {.theorem #thm-ch11-haar-even-char-expectation title="全阶偶次特征标的无 π 哈尔期望归零律" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.haar_evenChar_expectation"}
对每个 $r\in\mathbb N$，`evenCharPoly r` 是 [@thm-ch10-even-char-product-sum] 中 $E_r$ 的系数表。泛函 `haarKappaPoly` 按 `haarKappaMoment k` 加权各个 $k$ 次系数。`zeroDelta r` 在 $r=0$ 时取一，其余取零。声明给出下列 `Omega.IntRatio.Equivalent` 恒等式。

$$
\operatorname{haarKappaPoly}(\operatorname{evenCharPoly}\;r)\;\equiv\;\operatorname{zeroDelta}(r).
$$
:::

::: {.proof}
证明不局限于 $j = 0$ 轴线，而是对一切平移幂次 $j \in \mathbb{N}$ 与特征阶数 $r \in \mathbb{N}$ 同步建立精确移位混合矩封闭表（`MomentTable.expected j r`）：

$$
\operatorname{haarKappaPoly}\!\left(\kappa^j E_r\right) \;\equiv\; \operatorname{haarKappaMoment}(j) \cdot \frac{(2r + 1)\,\prod_{k = 0}^{r - 1}(j - k)}{\prod_{k = 0}^{r - 1}(j + k + 2)},
$$

其中 $r = 0$ 时分子分母空乘积均取 $1$。对 $r$ 施以相邻双阶归纳（对全部 $j$ 同步量化）：基步 $r = 0$ 平凡成立，基步 $r = 1$ 由 `haarKappaPoly` 线性性与标量矩递推律 [@thm-ch11-haar-kappa-moment-succ] 将 $4\,\mathbb{E}[\kappa^{j+1}] - \mathbb{E}[\kappa^j]$ 化为 $\mathbb{E}[\kappa^j]\cdot\frac{3j}{j+2}$；归纳步把递推式 $E_{r+2}(\kappa) = (4\kappa - 2)E_{r+1}(\kappa) - E_r(\kappa)$ 代入移位积分，再次借 [@thm-ch11-haar-kappa-moment-succ] 将 $4\,\mathbb{E}[\kappa^{j+1}]$ 吸收回 $\mathbb{E}[\kappa^j]$，通分至公共上升阶乘 $\prod_{k = 0}^{r + 1}(j + k + 2)$ 后化为关于 $(j, r, \prod_{k = 0}^{r - 1}(j - k))$ 的有限整系数多项式恒等式。最后令 $j = 0$：$r = 0$ 处给出 $\mathbb{E}[\kappa^0] \equiv 1$，而对一切 $r \ge 1$，下降阶乘 $\prod_{k = 0}^{r - 1}(0 - k)$ 含首因子 $0$，使分子恒等归零。完整证明由 Lean 内核检查。
:::

将[第十章](ch10-peter-weyl-rational-spin-shells.md)的乘积律 [@thm-ch10-even-char-product-sum] 与 [@thm-ch11-haar-even-char-expectation] 结合，可得有理内积公式。根据第 11.1 节，其对应的实哈尔内积为 $\langle E_m,E_n\rangle_{\mathrm{SU}(2)}=\delta_{mn}$。

::: {.theorem #thm-ch11-all-degree-peter-weyl-orthonormal title="全阶偶次彼得—魏尔特征核的哈尔正交归一性" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal"}
有理配对 `haarInner` 将 `haarKappaPoly` 应用于两个系数表的乘积。对 $m,n\in\mathbb N$，`degreeDelta m n` 在 $m=n$ 时取一，其余取零。声明给出下列 `Omega.IntRatio.Equivalent` 恒等式。

$$
\operatorname{haarInner}(\operatorname{evenCharPoly}\;m,\operatorname{evenCharPoly}\;n)\;\equiv\;\operatorname{degreeDelta}(m,n).
$$
:::

::: {.proof}
由 [@thm-ch10-even-char-product-sum]（`Characters.product m n` 与 `Poly.ratios_mul`）以及 `haarKappaPoly` 在逐项相等系数表（含尾部补零）下的良定义性（`Integration.integral_congr`），乘积内积 $\operatorname{haarInner}(E_m,E_n)$ 化归为有限闭区间和 $\sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa)$ 的无 $\pi$ 哈尔期望。对求和跨度归纳并反复运用 `haarKappaPoly` 的可加性与 [@thm-ch11-haar-even-char-expectation]，所有满足 $r \ge 1$ 的项悉数归零，仅存下端点指示量 $\delta_{\lvert m - n\rvert, 0} = \delta_{m, n}$（因指标 $r = 0$ 落入 $[\lvert m - n\rvert, m + n]$ 当且仅当 $\lvert m - n\rvert = 0$，即 $m = n$）。完整证明由 Lean 内核检查。
:::

至此，[@thm-ch11-peter-weyl-chi012-orthonormal] 的三阶正交格拉姆矩阵 $I_3$ 被无缝纳入 [@thm-ch11-all-degree-peter-weyl-orthonormal] 覆盖全部 $m, n \in \mathbb{N}$ 的零公理全谱定理中，全程不依赖实数、极限或半个 $\pi$。（从组合直觉旁观，把 $\mathbb{E}[\kappa^k] = \frac{1}{4^k(k + 1)}\binom{2k}{k}$ 代入 $E_r(\kappa) = \sum_{k = 0}^{r} (-1)^{r - k}\binom{r + k}{2k} 4^k \kappa^k$ 也会看见 $4^k$ 与 $4^{-k}$ 彻底对消，留下 $r$ 次多项式 $\binom{r + x}{r}$ 的 $(r + 1)$ 阶前向差分，恰与上述内核移位矩表互为映照。）同理，回到[第十章](ch10-peter-weyl-rational-spin-shells.md)的 $5d^8$ 四极张量 $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \diag(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7})$：在旋转作用 $\operatorname{Ad}(q)\,\mathbf{Q}\,\operatorname{Ad}(q)^\top$ 下，旋转矩阵元的二次积展开为 $(w, x, y, z)$ 的四次齐次多项式除以 $\lVert q\rVert^4$；代入 $H(2,0,0,0) = \frac{1}{8}$、$H(1,1,0,0) = \frac{1}{24}$ 与奇次项归零，旋转平均直接坍缩为 $\frac{1}{3}(\Tr \mathbf{Q})\,I_3 = \mathbf{0}_{3\times 3}$，全程不借半个 $\pi$。

::: {.film src="averages-without-pi"}
**同一个四维高斯积分算两遍，两边恰好都带着 $\pi^2$；划掉它只剩阶乘比，各阶整数自旋特征标由此精确正交归一（@DUR_ZH@）。** 紫色“论证”标签下，逐轴分离给出四个 $\sqrt{\pi}$，极坐标给出 $\frac{(m+1)!}{2}$ 乘面积 $2\pi^2$，两边的 $\pi^2$ 被琥珀色斜线划去；这是第 11.1 节的经典推导（文献结果），与圆周、二维球面的三栏对比同属论证，球面图为示意。青色“屏幕计算”标签下，阶乘比 $H(a,b,c,d)$ 直接作为定义：在 $(1,0,0,0)$ 处四段步进比 $\frac12+\frac16+\frac16+\frac16=1$，十六块瓷砖给出 $4\times\frac18+12\times\frac1{24}=1$；$\kappa$ 的矩阶梯 $1,\frac14,\frac18,\frac5{64},\frac7{128},\frac{21}{512}$ 乘以 $4^k$ 即卡塔兰数 $1,1,2,5,14,42$。绿色 LEAN ✓ 标签对应 [@thm-ch11-haar-kappa-moment-succ] 的步进递推、[@thm-ch11-peter-weyl-chi012-orthonormal] 的 $3\times 3$ 单位格拉姆表（账本中的 $5-8+4-1=0$ 与 $14-30+22-6+1=1$ 为屏幕计算）、[@thm-ch11-haar-even-char-expectation] 的“正阶偶次特征标平均为零”、第十章的乘积律与 [@thm-ch11-all-degree-peter-weyl-orthonormal]；$(m,n)=(2,3)$ 与 $(3,3)$ 两串的平均为屏幕计算。片尾仍会挤进来的 $\sqrt2$、$2\sqrt2$、$\sqrt5$ 以及第十二章的分数对属论证。
:::

---

## 11.4 交互实验台与迈向二次代数扩张的边界 {#sec-ch11-interactive-haar-lab}

在下面这座交互实验卡中，读者可以在紫色三元球面上拖动琥珀色保真度层级 $\kappa$，并在抽屉控件中切换单项式指数 $(a, b, c, d)$ 与特征核对 $(\chi_i, \chi_j)$，实时核对无 $\pi$ 阶乘比 $H(a, b, c, d)$、[@thm-ch11-haar-kappa-moment-succ] 的卡塔兰矩递推律 $\mathbb{E}[\kappa^{k+1}] = \frac{2k+1}{2(k+2)}\mathbb{E}[\kappa^k]$，以及作为 [@thm-ch11-all-degree-peter-weyl-orthonormal] 低阶切片的 [@thm-ch11-peter-weyl-chi012-orthonormal] $3 \times 3$ 单位正交格拉姆表。

::: {.viz src="omega-math-workbench" preset="pi-free-haar-peter-weyl" height="520"}
**三维球面无 $\pi$ 阶乘哈尔积分与彼得—魏尔特征核正交性实验卡（`pi-free-haar-peter-weyl`）。** 在紫色三元球面 $\mathrm{SU}(2)$ 上拖动琥珀色 $\kappa$ 水平环观察偶次切比雪夫特征核 $\chi_0 = 1,\;\chi_1 = 4\kappa - 1,\;\chi_2 = 16\kappa^2 - 12\kappa + 1$ 的带状节线壳层；打开参数抽屉或完整工作台即可选择单项式幂次 $(a, b, c, d)$ 与特征核对 $(\chi_i, \chi_j)$，实时检视青色精确有理矩 $\mathbb{E}[\kappa^k]$（$1, \frac{1}{4}, \frac{1}{8}, \frac{5}{64}, \frac{7}{128}$）与无 $\pi$ 内积生成的单位正交矩阵 $I_3$。
:::

回顾前两章的战果，我们仿佛已经把一切无理数与超越数驱逐出境：整数自旋壳的特征标 $E_n(\kappa)$ 消去了 $\sqrt{\kappa}$ 并以零公理完成全阶融合（[@thm-ch10-even-char-product-sum]），三维球面哈尔积分 $H(a, b, c, d)$ 消去了 $\pi$ 与黎曼和极限并以零公理锁定全阶彼得—魏尔正交归一性（[@thm-ch11-all-degree-peter-weyl-orthonormal]），连凝聚态 $5d^8$ 四极张量也全是分母为 $7$ 的有理分数。但是一位诚实的数学家必须追问最后一道尖锐边界：**当某个物理实验或对称构造确实无可回避地触及二次无理代数数时——例如把正交赤道态 `pHalf = (1, 1, 0, 0)` 沿同一射线作单位归一化（需要 $\sqrt{2}$），达到量子贝尔不等式的 CHSH 齐雷尔森上界 $2\sqrt{2}$，或者闭合五角黄金比切比雪夫周期（需要 $\varphi = \frac{1+\sqrt{5}}{2}$）——难道我们就必须缴械投降、退回依赖选择公理的实数连续统 $\mathbb{R}$ 吗？**

[第十二章](ch12-algebraic-extensions-and-schur-positivity.md) 将给出响亮的否定回答：我们只需在 `QRat` 之上架起纯有序对的零公理二次扩张域，再配上有理拉格朗日—格拉姆恒等式与舒尔补正定性，就能在不引入半条实分析公理的前提下，精确锁住这些代数极值与全部正定判据。
