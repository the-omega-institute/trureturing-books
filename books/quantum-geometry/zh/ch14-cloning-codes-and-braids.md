# 把脆弱的线藏进高维的面：量子纠错码与任意子拓扑死结

> *“面积是波,粒子是线,如果线与面积都是一种状态的投影,那看起来似乎是很好的波粒二象性的解释”*

在[第十三章](ch13-entanglement-and-chsh.md)中，我们看到双比特贝尔态把单颗球上的局部方向线缩成了零（$\vv{r} = \vv{s} = \vv{0}$），而在最大混合基线 $\frac{1}{4}I_4$ 之上，把全部非单位纯度盈余 $\Tr(\rho^2) - \frac{1}{4} = \frac{3}{4}$（即 $\frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$）悉数储存在 $9$ 维关联张量扇区 $\mathcal{W}_{\mathrm{corr}}$ 之中。现在，让我们把这一几何洞见转化为量子信息工程中最核心的防御战略：**容错量子纠错与拓扑保护**。

在经典数字电路里，对抗噪声的办法简单粗暴——**备份（克隆）**。怕一根电线上的电压被热涨落掀翻，就把比特 $0$ 复制成三份 $000$，把比特 $1$ 复制成三份 $111$，少数服从多数。然而，在踏入量子纠错的大门之前，一条铁面无私的内积几何定律当头拦住了所有照搬经典备份思路的去路：**未知量子叠加态不可克隆**。既然不能把一根脆弱的局部方向线简单复印成两根独立的局部线，我们唯一的选择就是反其道而行之——不再执着于局部的“线”，而是利用多体泡利稳定子或二维时空中的编织轨迹，把逻辑信息编码进局部噪声无法单独窥探的高维“面”与代数死结之中。

![图 14](../assets/fig-14-nocloning-stabilizer-braid.svg)

## 不可克隆：保内积与平方内积 {#sec-no-cloning-overlap}

为什么经典世界可以随手复印一页纸上的文字，而量子世界却绝不允许一台通用机器把任意未知纯态 $\psi$ 精确复制成两份 $\psi \otimes \psi$？

传统的科普解释常常诉诸“测量会破坏量子态”，但这并没有触及幺正演化本身最底层的几何症结。真正的理由连测量都不需要提，它直接写在希尔伯特空间内积的两条基本性质里：

1. **线性等距演化必须保内积不变**：如果复制过程由联合空间 $H \otimes_{\mathbb{C}} H$ 上的一个复线性等距变换 $U$ 实现，那么在 $U$ 作用前后，任意两个输入态之间的内积重叠度 $z = \langle\phi, \psi\rangle_{\mathbb{C}}$ 必须分毫不差地保持原值 $z$；
2. **张量积克隆会把内积自动平方**：一旦状态 $\psi$ 与 $\phi$ 被各自复制成双份张量积 $\psi \otimes \psi$ 与 $\phi \otimes \phi$，根据张量积空间的内积乘法律，两份输出之间的内积立刻变成两个因子内积的乘积 $\langle\phi, \psi\rangle_{\mathbb{C}} \cdot \langle\phi, \psi\rangle_{\mathbb{C}} = z^2$！

一面要求“保内积 $z$”，一面又要求“变成平方 $z^2$”，两相碰撞，立刻逼出代数方程 $z = z^2$。在整个复平面 $\mathbb{C}$ 上，满足等于自身平方的数只有两个：**$z = 1$（两向量完全相同）或 $z = 0$（两向量严格正交）**！

下面的定理在无需假定空间完备或有限维的一般复内积空间 $H$ 上，完整形式化了这一不可克隆内积判据（其中 Mathlib 的复内积 `inner Complex` 在第一槽共轭线性、第二槽线性，且 $U$ 为内积张量积 $H \otimes_{\mathbb{C}} H$ 上的复线性等距等价 `LinearIsometryEquiv`）。

::: {.theorem #thm-no-cloning-overlap title="量子不可克隆定理的内积判据" lean="D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion"}
设 $H$ 为任意复内积空间（`[NormedAddCommGroup H] [InnerProductSpace Complex H]`），$U : (H \otimes_{\mathbb{C}} H) \simeq_{\mathrm{li}}[\mathbb{C}] (H \otimes_{\mathbb{C}} H)$ 为 $H \otimes_{\mathbb{C}} H$ 上的复线性等距等价。设 $\psi, \phi, \mathrm{blank} \in H$ 为满足单位范数条件

$$
\norm{\psi} = 1, \qquad \norm{\phi} = 1, \qquad \norm{\mathrm{blank}} = 1
$$

的三个向量。若同一个算子 $U$ 在同一个空白初态 $\mathrm{blank}$ 上同时实现精确向量克隆

$$
U\bigl(\psi \otimes_{\mathbb{C}} \mathrm{blank}\bigr) = \psi \otimes_{\mathbb{C}} \psi, \qquad
U\bigl(\phi \otimes_{\mathbb{C}} \mathrm{blank}\bigr) = \phi \otimes_{\mathbb{C}} \phi,
$$

则 $\phi$ 与 $\psi$ 的复内积必满足自平方方程，且两向量要么完全相等、要么严格正交：

$$
\langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 \;\land\; \bigl(\phi = \psi \lor \langle\phi, \psi\rangle_{\mathbb{C}} = 0\bigr).
$$
:::

::: proof
记 $z = \langle\phi, \psi\rangle_{\mathbb{C}}$。因 $U$ 为复线性等距映射，它保持张量积空间 $H \otimes_{\mathbb{C}} H$ 上的内积：

$$
\bigl\langle \phi \otimes_{\mathbb{C}} \mathrm{blank},\; \psi \otimes_{\mathbb{C}} \mathrm{blank}\bigr\rangle_{\mathbb{C}}
= \bigl\langle U(\phi \otimes_{\mathbb{C}} \mathrm{blank}),\; U(\psi \otimes_{\mathbb{C}} \mathrm{blank})\bigr\rangle_{\mathbb{C}}.
$$

按纯张量的内积公式 $\langle x_1 \otimes y_1, x_2 \otimes y_2\rangle_{\mathbb{C}} = \langle x_1, x_2\rangle_{\mathbb{C}}\langle y_1, y_2\rangle_{\mathbb{C}}$ 分别计算上式两端：左端等于 $\langle\phi, \psi\rangle_{\mathbb{C}}\langle\mathrm{blank}, \mathrm{blank}\rangle_{\mathbb{C}} = z \cdot \norm{\mathrm{blank}}^2 = z \cdot 1 = z$；右端代入两条克隆假设后等于 $\langle\phi \otimes_{\mathbb{C}} \phi,\; \psi \otimes_{\mathbb{C}} \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}\langle\phi, \psi\rangle_{\mathbb{C}} = z^2$。故 $z = z^2$，证明了合取式的第一部分。

再由复数域整环性质，$z(z - 1) = 0$ 蕴涵 $z = 1$ 或 $z = 0$。当 $z = 0$ 时直接落入右析取支 $\langle\phi, \psi\rangle_{\mathbb{C}} = 0$；当 $z = \langle\phi, \psi\rangle_{\mathbb{C}} = 1$ 时，计算差向量的范数平方：

$$
\norm{\phi - \psi}^2 = \norm{\phi}^2 - 2\operatorname{Re}\langle\phi, \psi\rangle_{\mathbb{C}} + \norm{\psi}^2 = 1 - 2(1) + 1 = 0,
$$

故 $\phi - \psi = 0$，即 $\phi = \psi$，落入左析取支。完整证明由 Lean 内核检查。
:::

观察图 14 面板 I：在实非负重叠截面 $z = \cos\vartheta \in [0, 1]$ 上，保内积要求输出停在对角直线 $y = z$ 上，而双份张量积却把输出拽到了抛物线 $y = z^2$ 上。整条抛物线与对角线只交于两个端点 $(0, 0)$ 与 $(1, 1)$，在中间一切倾斜叠加方向 $0 < z < 1$（例如 $\vartheta = 45^\circ$ 时 $z = \frac{1}{\sqrt{2}} \approx 0.7071$，而 $z^2 = 0.5$）上，两曲线之间都裂开了一道不可弥合的几何鸿沟 $z - z^2 > 0$！

在引用 [@thm-no-cloning-overlap] 时，必须严格把握以下四条数学边界：

1. **复内积 $z \in \mathbb{C}$ 与实重叠截面 $\cos\vartheta$ 的区分**：定理中的 $z = \langle\phi, \psi\rangle_{\mathbb{C}}$ 一般是复数；仅当我们在取定实正交相位规范使 $z = \cos\vartheta \in [0, 1]$ 的截面上讨论时，方程 $z = z^2$ 才写为 $\cos\vartheta = \cos^2\vartheta$。同时切勿将希尔伯特空间重叠角 $\vartheta$ 与单比特布洛赫球面夹角 $\theta_{\mathrm{Bloch}}$ 混为一谈：由[第二章](ch02-born-rule.md)半角公式 $|\langle\phi, \psi\rangle|^2 = \cos^2(\theta_{\mathrm{Bloch}}/2)$，纯比特的布洛赫球面夹角是希尔伯特射线角的两倍（$\theta_{\mathrm{Bloch}} = 2\vartheta$）。
2. **精确向量相等与射影射线版本的区别**：[@thm-no-cloning-overlap] 的克隆前提要求严格的**向量等式** $U(\psi \otimes \mathrm{blank}) = \psi \otimes \psi$ 与 $U(\phi \otimes \mathrm{blank}) = \phi \otimes \phi$（使用同一个 $U$ 与同一个 $\mathrm{blank}$），因此当 $z = 1$ 时推出的是严格的向量同一 $\phi = \psi$，而非相差任意相位 $e^{i\alpha}$ 的“共线”。若讨论允许克隆输出带状态相关全局相位 $e^{i\alpha(\psi)}\psi \otimes \psi$ 的射影射线版本，则需对内积取模 $|\langle\phi, \psi\rangle| = |\langle\phi, \psi\rangle|^2$ 并另行固定相位规范。
3. **空间一般性**：定理对任意带 `NormedAddCommGroup` 与 `InnerProductSpace Complex` 的空间 $H$ 成立，无需假定 $H$ 为有限维或完备希尔伯特空间。
4. **必要条件不等于通用克隆器构造**：$z \in \{0, 1\}$ 是存在满足两条克隆等式的线性等距算子 $U$ 的**必要条件**，不能反过来把该判据曲解为已构造出某种通用克隆装置。

## Pauli 字与稳定子综合征 {#sec-pauli-syndrome-parity}

既然 [@thm-no-cloning-overlap] 禁止我们把任意未知叠加态 $\alpha\lvert 0\rangle + \beta\lvert 1\rangle$ 复制成 $(\alpha\lvert 0\rangle + \beta\lvert 1\rangle)^{\otimes 3}$，量子纠错码究竟靠什么施展魔法？

诀窍在于：**不复制整个叠加态，而是只把正交基嵌入多体纠缠空间**（例如将 $\lvert 0\rangle \mapsto \lvert 000\rangle$、$\lvert 1\rangle \mapsto \lvert 111\rangle$ 线性延拓为 $\alpha\lvert 0\rangle + \beta\lvert 1\rangle \mapsto \alpha\lvert 000\rangle + \beta\lvert 111\rangle$），然后不再测量任何会暴露 $\alpha, \beta$ 的局部单比特方向线，而是专门测量多体**泡利字（Pauli words）**的联合奇偶校验面！

为了在任意有限模式数 $N \in \mathbb{N}$ 与任意局部能级数 $p \in \mathbb{N}$（满足非零条件 `[NeZero p]`；注意此处 **$p$ 未要求是素数，且 $N$ 允许为 $0$**）的一般框架下刻画这套代数，源码模块 `StabilizerGenuineEntanglementCommutationRank` 定义了 $N$ 模式模 $p$ 泡利字结构 `PauliWord N p`，包含三个字段：

- 离散相位指标 $\mathrm{phase} : \mathrm{ZMod}\,p$；
- 位移（翻转）指数向量 $x : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$；
- 时钟（相位）指数向量 $z : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$。

记 $p$ 次本原单位根为 $\omega_p = \mathrm{windowRoot}\,p = \exp(2\pi i / p)$。在单个 $p$ 能级模式（$M_{\mathrm{Fin}\,p}(\mathbb{C})$）上，循环移位矩阵 $X$ 与对角时钟矩阵 $Z = \operatorname{diag}(\omega_p^{j.\mathrm{val}})$ 组成单模 Weyl 位移算子 $D(e, f) = X^{e.\mathrm{val}} Z^{f.\mathrm{val}}$（注意算子固定次序为先作用 $Z$、后作用 $X$）。由此，泡利字 $w \in \mathrm{PauliWord}\,N\,p$ 在 $N$ 模式联合空间 $(\mathrm{Fin}\,N \to \mathrm{Fin}\,p)$ 上对应的矩阵算子定义为

$$
\bigl(\mathrm{pauliWordOperator}(w)\bigr)_{u, v} = \omega_p^{w.\mathrm{phase}.\mathrm{val}} \prod_{n \in \mathrm{Fin}\,N} D(w.x_n, w.z_n)_{u_n, v_n},
$$

而两个泡利字 $a, b$ 的形式字乘积定义为各字段在 $\mathrm{ZMod}\,p$ 中的逐分量加法：

$$
\mathrm{wordMul}(a, b) = \bigl(a.\mathrm{phase} + b.\mathrm{phase},\; a.x + b.x,\; a.z + b.z\bigr).
$$

当两个泡利字算子相乘时，由于每个格点 $n$ 上左侧的 $Z^{a.z_n}$ 必须跨过右侧的 $X^{b.x_n}$ 才能归并成标准次序 $X^{a.x_n + b.x_n} Z^{a.z_n + b.z_n}$，每一次跨越都会因为非对易关系 $Z^{a.z_n} X^{b.x_n} = \omega_p^{(a.z_n b.x_n).\mathrm{val}} X^{b.x_n} Z^{a.z_n}$ 吐出一枚交叉相位！下面的引理精确锁定了这一核心乘法法则。

::: {.lemma #lemma-pauli-word-phase title="多模广义泡利字算子的乘法与交叉相位引理" lean="D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul"}
设 $N, p \in \mathbb{N}$ 且满足 `[NeZero p]`。对任意两个泡利字 $a, b : \mathrm{PauliWord}\,N\,p$，其对应矩阵算子的乘积恒等于

$$
\mathrm{pauliWordOperator}(a) \cdot \mathrm{pauliWordOperator}(b) = \mathrm{windowRoot}(p)^{\bigl(\sum_{n \in \mathrm{Fin}\,N} a.z_n \cdot b.x_n\bigr).\mathrm{val}} \bullet \mathrm{pauliWordOperator}\bigl(\mathrm{wordMul}(a, b)\bigr).
$$
:::

::: proof
在每个模式 $n \in \mathrm{Fin}\,N$ 上，单模 Weyl 算子的乘积为 $D(a.x_n, a.z_n) D(b.x_n, b.z_n) = X^{a.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{b.z_n.\mathrm{val}}$。利用时钟矩阵与循环移位矩阵的交换关系 $Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} = \omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}}$，以及循环群与对角相位在模 $p$ 加法下的周期性 $X^{(a.x_n + b.x_n).\mathrm{val}}$、$Z^{(a.z_n + b.z_n).\mathrm{val}}$，单模乘积化为 $\omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} D(a.x_n + b.x_n, a.z_n + b.z_n)$。对全体 $n \in \mathrm{Fin}\,N$ 求乘积，将各模式的交叉相位指数在 $\mathrm{ZMod}\,p$ 中相加为 $\sum_{n} a.z_n \cdot b.x_n$，同时外部固有相位 $\omega_p^{a.\mathrm{phase}.\mathrm{val}} \omega_p^{b.\mathrm{phase}.\mathrm{val}} = \omega_p^{(a.\mathrm{phase} + b.\mathrm{phase}).\mathrm{val}}$ 归入 $\mathrm{wordMul}(a, b)$ 的相位字段，即得结论。完整证明由 Lean 内核检查。
:::

请仔细留意 [@lemma-pauli-word-phase] 中的精妙分工：

1. **绝不能漏掉外部交叉相位标量**：在源码定义中，形式加法 $\mathrm{wordMul}(a, b)$ 的 `phase` 字段只负责把两人原有的相位 $a.\mathrm{phase} + b.\mathrm{phase}$ 相加；所有因非对易跨越产生的交叉相位 $\omega_p^{(\sum_n a.z_n b.x_n).\mathrm{val}}$ **全部以标量数乘 $\bullet$ 的形式立在 $\mathrm{pauliWordOperator}(\mathrm{wordMul}(a,b))$ 外部**。哪怕在最熟悉的多量子比特情形 $p = 2$（$\omega_2 = -1$）下，单模算子依然严格按 $X^{x_n} Z^{z_n}$ 排列，每一次 $Z X = -X Z$ 都会通过指数 $(a.z_n \cdot b.x_n).\mathrm{val}$ 贡献一个负号 $(-1)$，绝不能在计算中忽略。
2. **从双向交叉相位差导出辛内积与稳定子综合征**：由于 $\mathrm{wordMul}(a, b) = \mathrm{wordMul}(b, a)$，若我们将 [@lemma-pauli-word-phase] 正向乘一次 $(a \cdot b)$、反向乘一次 $(b \cdot a)$，两者的唯一差别就在于外部指数从 $\sum_n a.z_n b.x_n$ 变成了 $\sum_n b.z_n a.x_n$！特别地，当 $p = 2$ 时，稳定子校验算子 $a$ 与错误算子 $b$ 是对易（特征值 $+1$，无警报）还是反对易（特征值 $-1$，拉响警报），完全由模 $2$ 二元辛奇偶校验和

   $$
   \langle a, b\rangle_{\mathrm{symp}} = \sum_{n \in \mathrm{Fin}\,N} \bigl(a.z_n b.x_n + a.x_n b.z_n\bigr) \pmod 2
   $$

   决定！需要强调的是，[@lemma-pauli-word-phase] 本身是泡利字算子的精确代数乘法引理；至于如何利用这套综合征在不破坏逻辑态的前提下完整恢复受损信息，还需要引入码空间与正交综合征投影的恢复架构——这正是下一节的主题。

## 正交综合征中的逻辑恢复 {#sec-orthogonal-syndrome-recovery}

当环境噪声把原本安居在基准码空间里的逻辑态 $\rho \in M_d(\mathbb{C})$ 踢进了不同的错误通道时，为什么我们能够像外科手术一样把错误剥离、让 $\rho$ 原封不动地复原？

从几何上看，秘密全在于**正交分室（orthogonal syndrome subspaces）**（见图 14 面板 II）。设想物理空间 $\mathbb{C}^n$ 中有 $|s|$ 间两两正交、每间都是 $d$ 维的房间，由一族等距嵌入矩阵 $S : s \to M_{n \times d}(\mathbb{C})$ 刻画（此处 $s, n, d$ 为有限指标类型，带 `[DecidableEq s]` 与 `[DecidableEq d]`，$n$ 无需显式可判等假设）。源码模块 `OrthogonalSyndromeDecoding` 定义谓词 `OrthogonalSyndromes S` 为：

$$
\forall i, j : s,\qquad S_i^* S_j = \begin{cases} I_d & \text{若 } i = j, \\ 0 & \text{若 } i \neq j. \end{cases}
$$

这意味着：对每一个综合征编号 $i \in s$，$S_i^* S_i = I_d$ 保证 $S_i$ 把 $d$ 维逻辑球体无畸变地等距放进第 $i$ 间综合征子空间；而当 $i \neq j$ 时，$S_i^* S_j = 0$ 保证不同综合征房间之间严格垂直、绝不串门！

在此几何舞台上，任意携带综合征系数矩阵 $\sigma \in M_s(\mathbb{C})$（允许包含不同错误分支之间的非对角相干项 $\sigma_{jk}$）的受损物理态由**综合征编码映射**给出：

$$
\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, S_j \rho S_k^* \in M_n(\mathbb{C}),
$$

而将各综合征房间里的状态重新拉回逻辑空间叠加的**综合征解码映射**定义为：

$$
\mathrm{syndromeDecoding}(S, \mathrm{state}) = \sum_{i \in s} S_i^* \,\mathrm{state}\, S_i \in M_d(\mathbb{C}).
$$

下面的命题证明：无论噪声矩阵 $\sigma$ 与逻辑矩阵 $\rho$ 长什么模样，只要房间之间两两正交，解码映射就能一举抹平全部跨房间的非对角干扰，把输出精确归约为 $\Tr(\sigma) \cdot \rho$！

::: {.proposition #prop-orthogonal-syndrome-recovery title="正交综合征子空间上的精确逻辑恢复恒等式" lean="D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery"}
设 $s, n, d$ 为有限指标类型（带 `[DecidableEq s]` 与 `[DecidableEq d]`），$S : s \to M_{n \times d}(\mathbb{C})$ 满足正交综合征条件 `OrthogonalSyndromes S`。则对任意复矩阵 $\sigma \in M_s(\mathbb{C})$ 与任意复矩阵 $\rho \in M_d(\mathbb{C})$，恒有

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) = \Tr(\sigma) \bullet \rho.
$$
:::

::: proof
将 $\mathrm{syndromeEncoding}(S, \sigma, \rho)$ 的双重求和代入 $\mathrm{syndromeDecoding}$ 的定义，利用矩阵乘法对加法的分配律与标量提出律，得

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr)
= \sum_{i \in s} \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, (S_i^* S_j)\, \rho\, (S_k^* S_i).
$$

由前提 `OrthogonalSyndromes S`，左侧内积满足 $S_i^* S_j = \delta_{ij} I_d$，右侧内积满足 $S_k^* S_i = (S_i^* S_k)^* = \delta_{ik} I_d$。因此在固定 $i \in s$ 时，所有 $j \neq i$ 或 $k \neq i$ 的项全部乘以零矩阵而消失，唯独 $j = i$ 且 $k = i$ 的对角项幸存为 $\sigma_{ii} (I_d \rho I_d) = \sigma_{ii} \rho$。对全体 $i \in s$ 求和，即得 $\bigl(\sum_{i \in s} \sigma_{ii}\bigr)\rho = \Tr(\sigma) \bullet \rho$。完整证明由 Lean 内核检查。
:::

[@prop-orthogonal-syndrome-recovery] 的代数结构干净得令人赞叹，在应用时需把握两条精确边界：

1. **无需假设 $\sigma$ 对角、半正定或迹一**：定理对**任意**复矩阵 $\sigma \in M_s(\mathbb{C})$ 和 $\rho \in M_d(\mathbb{C})$ 均成立。哪怕物理噪声是多个错误算子的相干叠加（使得 $\sigma$ 具有非零的非对角元 $\sigma_{jk}$，$j \neq k$），正交投影夹逼 $S_i^* S_j \rho S_k^* S_i$ 也会自动切掉所有 $j \neq k$ 的跨综合征相干项，只留下对角迹和 $\sum_i \sigma_{ii} = \Tr(\sigma)$；特别地，当噪声权重归一化满足 $\Tr(\sigma) = 1$ 时，立刻作为特例给出无缩放的精确恢复 $\mathrm{syndromeDecoding}(S, \mathrm{syndromeEncoding}(S, \sigma, \rho)) = \rho$。
2. **支持子空间上的代数解码与全空间迹保持信道的区分**：$\mathrm{syndromeDecoding}(S, \cdot) = \sum_{i \in s} S_i^* (\cdot) S_i$ 是在可纠综合征支持集 $\mathcal{W} = \bigoplus_{i \in s} \operatorname{range}(S_i)$ 上定义的解码代数式。由于 $s$ 个 $d$ 维正交房间占用的总维数为 $|s|d \le n$，当 $|s|d < n$（即 $\sum_{i \in s} S_i S_i^* \neq I_n$）时，不能无条件声称仅由 $\{S_i^*\}_{i \in s}$ 构成的映射已在整个 $n$ 维物理空间 $M_n(\mathbb{C})$ 上定义了一个迹保持（CPTP）量子信道；若要延拓为全空间上的迹保持信道，还必须把支持子空间正交补 $I_n - \sum_{i \in s} S_i S_i^*$ 上的附加 Kraus 算子补齐。

## 二维编织与第三正交方向 {#sec-braids-and-third-axis}

除了用泡利稳定子校验面主动侦测并纠正错误之外，大自然还提供了一种更加匪夷所思的被动防御机制：**用二维平面粒子的世界线编织（braiding）打结**。

为什么在二维平面 $(e_1, e_2)$ 加一维时间 $t$ 构成的 $(2+1)$ 维时空里，交换两颗粒子两次并不能回到原地，而在三维空间 $(e_1, e_2, e_3)$ 里交换两颗点粒子两次却能轻松解开？

正如章首与图 14 面板 III 所示，秘密在于**第三根正交方向**！当两颗不可碰撞的点粒子被限制在二维平面上运动时，它们在 $(x, t)$ 时空中的世界线就像两根拉紧的竖直琴弦：第 1 股绳子跨过第 2 股绳子（正向交叉 $\mathrm{crossing}$）与从底下钻过去（反向交叉 $\mathrm{crossingInv}$）是截然不同的拓扑路径。而在三股绳子 $(x, (y, z))$ 的编织中，先交换前两股、再交换后两股、再交换前两股（$\sigma_1 \sigma_2 \sigma_1$），与先交换后两股、再交换前两股、再交换后两股（$\sigma_2 \sigma_1 \sigma_2$），在几何上恰好对应把中间那根绳子滑过另外两根绳子的交点——著名的**三股编织恒等式（Yang–Baxter 方程）**。

在源码模块 `D5/S0/Certificates/Quandles/BraidColoringTransport.lean` 中，这一编织不变量通过架（`Rack Q`）的代数着色传输得到了纯组合形式化。设类型 $Q$ 带有 `Rack Q` 实例，其上配备二元运算 $\star : Q \to Q \to Q$（源码记作 `act`）及逆运算 $\star^{-1} : Q \to Q \to Q$（源码记作 `invAct`），使得对每个固定的第一宗量 $x \in Q$，左平移作用映射 $L_x : y \mapsto x \star y$ 是双射（其逆映射为 $L_x^{-1} : y \mapsto x \star^{-1} y$，满足 `Function.LeftInverse (invAct x) (act x)` 与 `Function.RightInverse (invAct x) (act x)`，即 $x \star^{-1} (x \star y) = y$ 且 $x \star (x \star^{-1} y) = y$），并满足左自分配公理（left self-distributivity）：

$$
(x \star y) \star (x \star z) = x \star (y \star z) \qquad (\forall x, y, z \in Q).
$$

定义双股正向交叉与反向交叉映射为

$$
\mathrm{crossing}(x, y) = (x \star y,\, x), \qquad \mathrm{crossingInv}(u, v) = (v,\, v \star^{-1} u),
$$

易见 $\mathrm{crossingInv}\bigl(\mathrm{crossing}(x, y)\bigr) = \mathrm{crossingInv}(x \star y, x) = \bigl(x,\, x \star^{-1}(x \star y)\bigr) = (x, y)$。将它们提升到三股状态空间 $Q \times (Q \times Q)$ 上的两个相邻生成元：

$$
\mathrm{crossing}_1\bigl(x, (y, z)\bigr) = \bigl(x \star y,\, (x, z)\bigr), \qquad
\mathrm{crossing}_2\bigl(x, (y, z)\bigr) = \bigl(x,\, (y \star z,\, y)\bigr).
$$

下面的推论证明，这两个相邻交叉算子在任意架 $Q$ 上严格满足三股 Yang–Baxter 编织恒等式。

::: {.corollary #cor-braid-yang-baxter title="架着色传输下的三股编织 Yang–Baxter 恒等式" lean="D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter"}
设 $Q$ 为带有 `[Rack Q]` 实例的任意类型。对任意三个元素 $x, y, z \in Q$，三股编织的两个相邻交叉映射满足

$$
\mathrm{crossing}_1\bigl(\mathrm{crossing}_2\bigl(\mathrm{crossing}_1(x, (y, z))\bigr)\bigr) = \mathrm{crossing}_2\bigl(\mathrm{crossing}_1\bigl(\mathrm{crossing}_2(x, (y, z))\bigr)\bigr).
$$
:::

::: proof
按 $\mathrm{crossing}_1$ 与 $\mathrm{crossing}_2$ 的定义，逐步展开等式左端的三次交叉作用：

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star y,\, (x, z)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x \star y,\, (x \star z,\, x)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \Bigl((x \star y) \star (x \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

再逐步展开等式右端的三次交叉作用：

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x,\, (y \star z,\, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star (y \star z),\, (x, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \Bigl(x \star (y \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

比较左端与右端的最终三元组：后两个分量均为 $(x \star y, x)$，完全一致；第一个分量由 `Rack Q` 的自分配律 $(x \star y) \star (x \star z) = x \star (y \star z)$ 严格相等。完整证明由 Lean 内核检查。
:::

在将 [@cor-braid-yang-baxter] 与物理中的拓扑编织联系起来时，必须严格守住三条理论边界：

1. **代数着色实现 vs 完整拓扑基本群分类**：[@cor-braid-yang-baxter] 是在抽象代数结构 `Rack Q` 上对三股编织关系 $\sigma_1 \sigma_2 \sigma_1 = \sigma_2 \sigma_1 \sigma_2$ 的代数着色实现（源码完全不包含拓扑流形、时空维数或量子统计的假设）。它证明了架着色在三股 Reidemeister III / Yang–Baxter 移动下的传输不变性，但并不证明二维平面上一切编织皆非平凡，也不等同于配置空间完整基本群的分类定理。
2. **严格区分“点粒子的交换轨迹（exchange paths）”与“三维空间中的闭合绳结（knots）”**：如图 14 面板 III 所示，当点粒子拥有第三个空间正交方向 $e_3$ 时，原本在二维平面内绕着另一颗粒子转一圈的双交换轨迹（回路）可以沿着第三空间维 $e_3$ 向上抬起并越过被绕粒子，从而使点粒子交换群从无穷阶辫群 $B_n$ 退化为有限对称群 $S_n$（$\sigma_i^2 = 1$）。**但这绝不意味着三维空间里的闭合一维绳结（如三叶结 trefoil knot）也能自动解开！** 闭合绳结在 $\mathbb{R}^3$ 中禁止自身穿越，依然具有非平凡的结拓扑（事实上，架与双架 quandle 着色正是区分三维非平凡绳结的经典代数工具）。
3. **任意子统计与物理容错边界归入文献**：非阿贝尔任意子的物理实现、配置空间同伦群以及有限温度下的拓扑纠错界限属于凝聚态与量子信息文献结果，详见下文 [@rem-error-correction-anyons-literature]。

现在，让我们通过一个四步连贯的具体数值与矩阵算例，把不可克隆内积差、三比特重复码的二元辛综合征、编码态局部布洛赫向量的精确行为以及正交综合征矩阵恢复完整地验算一遍。

::: {.example #ex-repetition-code-syndrome title="不可克隆数值缺口、三比特重复码综合征奇偶校验与 8×2 正交恢复全流程验算"}
本例分四步手算验证本章的核心定理与物理边界：

**第一步：不可克隆定理在 $45^\circ$ 叠加态上的数值缺口与正交基特例。**
在单比特空间 $H = \mathbb{C}^2$ 中，取初态 $\lvert\psi\rangle = \lvert 0\rangle = \binom{1}{0}$、叠加态 $\lvert\phi\rangle = \lvert +\rangle = \frac{1}{\sqrt{2}}\binom{1}{1}$ 以及空白寄存器 $\lvert\mathrm{blank}\rangle = \lvert 0\rangle$。此时输入对的内积重叠度为

$$
z = \langle\phi, \psi\rangle_{\mathbb{C}} = \frac{1}{\sqrt{2}} \approx 0.7071067811865476,
$$

而目标克隆输出 $\lvert\phi\rangle\otimes\lvert\phi\rangle$ 与 $\lvert\psi\rangle\otimes\lvert\psi\rangle$ 的内积为

$$
z^2 = \Bigl(\frac{1}{\sqrt{2}}\Bigr)^2 = \frac{1}{2} = 0.5.
$$

两者之间存在非零缺口 $z - z^2 = \frac{\sqrt{2} - 1}{2} \approx 0.2071067811865476 \neq 0$，直接违背 [@thm-no-cloning-overlap] 的必要条件 $z = z^2$，故绝不存在同时克隆 $\lvert 0\rangle$ 与 $\lvert +\rangle$ 的线性等距算子 $U$。反之，若取正交对 $\lvert\psi\rangle = \lvert 0\rangle$ 与 $\lvert\phi\rangle = \lvert 1\rangle$，则 $z = \langle 1, 0\rangle_{\mathbb{C}} = 0 = 0^2$ 满足判据；此时受控非门 $\mathrm{CNOT}$ 在固定空白态 $\lvert 0\rangle$ 上精确实现 $\mathrm{CNOT}\lvert 00\rangle = \lvert 00\rangle$ 与 $\mathrm{CNOT}\lvert 10\rangle = \lvert 11\rangle$（注意该操作仅复制这对特定正交基，并不克隆它们的叠加态 $\lvert +\rangle$）。

**第二步：三比特位翻转重复码（bit-flip repetition code）与模 $2$ 辛奇偶校验。**
取 $N = 3, p = 2$。定义逻辑等距嵌入 $V : \mathbb{C}^2 \to \mathbb{C}^8$ 为 $V\lvert 0\rangle = \lvert 000\rangle$、$V\lvert 1\rangle = \lvert 111\rangle$。码空间由两个稳定子校验算子

$$
g_1 = Z_1 Z_2 = Z \otimes Z \otimes I, \qquad g_2 = Z_2 Z_3 = I \otimes Z \otimes Z
$$

共同稳定（在码空间上 $g_1 V = V$，$g_2 V = V$）。用 `PauliWord 3 2` 表示时，$g_1, g_2$ 的位移向量均为 $x = (0, 0, 0)$，相位检查行向量分别为 $z^{(1)} = (1, 1, 0)$ 与 $z^{(2)} = (0, 1, 1)$。考察四个候选单比特位翻转错误 $E \in \{I, X_1, X_2, X_3\}$，其 $z$ 向量均为 $(0, 0, 0)$，而位移向量 $x^{(E)}$ 依次为 $(0,0,0), (1,0,0), (0,1,0), (0,0,1)$。由 [@lemma-pauli-word-phase]，校验算子 $g_r$（$r \in \{1, 2\}$）跨过错误算子 $E$ 时的相对交换相位为 $(-1)^{(z^{(r)} \cdot x^{(E)}).\mathrm{val}}$，给出如下一一对应的二元综合征表：

| 错误算子 $E$ | 位移向量 $x^{(E)} \in (\mathrm{ZMod}\,2)^3$ | 模 $2$ 点积 $\bigl(z^{(1)}\cdot x^{(E)},\; z^{(2)}\cdot x^{(E)}\bigr)$ | 稳定子本征值综合征 $(g_1, g_2)$ | 受损码空间基态 $\{E\lvert 000\rangle, E\lvert 111\rangle\}$ |
| :---: | :---: | :---: | :---: | :---: |
| $E_0 = I$ | $(0, 0, 0)$ | $(0, 0)$ | $(+1, +1)$ | $\{\lvert 000\rangle, \lvert 111\rangle\}$ |
| $E_1 = X_1$ | $(1, 0, 0)$ | $(1, 0)$ | $(-1, +1)$ | $\{\lvert 100\rangle, \lvert 011\rangle\}$ |
| $E_2 = X_2$ | $(0, 1, 0)$ | $(1, 1)$ | $(-1, -1)$ | $\{\lvert 010\rangle, \lvert 101\rangle\}$ |
| $E_3 = X_3$ | $(0, 0, 1)$ | $(0, 1)$ | $(+1, -1)$ | $\{\lvert 001\rangle, \lvert 110\rangle\}$ |

**第三步：编码逻辑态的局部布洛赫向量分析（区分 GHZ 特例与一般逻辑态）。**
若取逻辑正东态 $\lvert +\rangle = \frac{\lvert 0\rangle + \lvert 1\rangle}{\sqrt{2}}$，编码后得到三比特 GHZ 态

$$
\lvert +_L\rangle = V\lvert +\rangle = \frac{\lvert 000\rangle + \lvert 111\rangle}{\sqrt{2}}.
$$

对任意两颗比特求偏迹，剩下的单比特约化密度矩阵均为 $\frac{1}{2}I_2$，因此在这一个特定状态上，三颗物理比特的局部布洛赫向量确实全部为零：$\vv{r}_1 = \vv{r}_2 = \vv{r}_3 = \vv{0}$。

**但绝不能由此夸大写成“所有稳定子码在一切逻辑态上都抽干每个局部方向”！** 事实上，若取一般逻辑叠加态 $\lvert\psi_L\rangle = \alpha\lvert 000\rangle + \beta\lvert 111\rangle$（$|\alpha|^2 + |\beta|^2 = 1$），虽然单比特横向分量 $\langle X_i\rangle = \langle Y_i\rangle = 0$ 恒为零，但单比特竖直分量却等于

$$
\langle Z_i\rangle_{\psi_L} = |\alpha|^2 - |\beta|^2 \qquad (i = 1, 2, 3),
$$

只要 $|\alpha| \neq |\beta|$（例如逻辑北极 $\lvert 0_L\rangle = \lvert 000\rangle$），局部布洛赫向量 $\vv{r}_i = (0, 0, |\alpha|^2 - |\beta|^2)$ 就非零！原因在于三比特重复码只防护 $X$ 翻转（对 $Z$ 错误的码距仅为 $1$，单比特 $Z_1$ 本身就是逻辑算子 $\bar{Z}$）。唯有当稳定子码为**码距 $d_{\mathrm{code}} \ge 2$ 的纯（非退化）稳定子码（即稳定子群 $\mathcal{S}$ 中不含任何权重为 $1$ 的单比特生成元，不同于额外附着固定辅助态 $\lvert 0\rangle$ 使 $Z_i \in \mathcal{S}$ 的退化情形）**时，每个单比特泡利算子 $P_i \in \{X_i, Y_i, Z_i\}$ 才会至少与某个生成元 $g \in \mathcal{S}$ 反对易，从而在码投影下被强制压缩为零（$P_{\mathcal{C}} P_i P_{\mathcal{C}} = 0$），使任意逻辑态的单比特约化态恒等于 $\rho_i = \frac{1}{2}I_2$（局部布洛赫向量恒为零）。

**第四步：按 [@prop-orthogonal-syndrome-recovery] 验算 $8\times 2$ 正交综合征恢复与相位错误边界。**
令 $s = \mathrm{Fin}\,4$、$n = \mathrm{Fin}\,8$、$d = \mathrm{Fin}\,2$，定义四个 $8\times 2$ 综合征嵌入矩阵为 $S_j = E_j V$（$j \in \{0, 1, 2, 3\}$）。如第二步表格最后一列所示，四个二维子空间 $\operatorname{range}(S_j)$ 恰好将 $\mathbb{C}^8$ 的 $8$ 个标准基向量划分为四组互不相交的正交对，故严格满足 `OrthogonalSyndromes S`：

$$
S_i^* S_j = V^* E_i^* E_j V = \delta_{ij} I_2 \qquad (\forall i, j \in \{0, 1, 2, 3\}).
$$

现在取噪声系数矩阵 $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr) \in M_4(\mathbb{C})$（其迹为 $\Tr(\sigma) = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{8} = 1$），并取逻辑密度矩阵 $\rho = \lvert +\rangle\langle +\rvert = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix} \in M_2(\mathbb{C})$。受损物理态为 $8\times 8$ 块混合矩阵 $\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j=0}^3 \sigma_{jj} S_j \rho S_j^*$。对其应用解码映射 $\mathrm{syndromeDecoding}(S, \cdot)$，由 [@prop-orthogonal-syndrome-recovery] 逐块缩并得：

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr)
= \sum_{i=0}^3 S_i^* \Bigl(\sum_{j=0}^3 \sigma_{jj} S_j \rho S_j^*\Bigr) S_i
= \Bigl(\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{8}\Bigr)\begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix} = \rho!
$$

最后必须指明该码的纠错边界：这套四分支正交综合征仅能纠正至多一个 $X$ 位翻转错误 $\{I, X_1, X_2, X_3\}$；倘若发生的是单比特相位翻转错误 $Z_1 = Z \otimes I \otimes I$，由于 $Z_1$ 与 $g_1 = Z_1 Z_2$、$g_2 = Z_2 Z_3$ 均对易，它不会触发任何综合征警报（停留在 $S_0$ 子空间内），却把逻辑态 $\lvert +_L\rangle$ 翻转成了正交的 $\lvert -_L\rangle = \frac{\lvert 000\rangle - \lvert 111\rangle}{\sqrt{2}}$。因此三比特重复码绝不能纠正任意单比特量子噪声（纠正任意单比特错误至少需要五比特码或七比特 Steane 码、九比特 Shor 码）。
:::

::: {.remark #rem-error-correction-anyons-literature title="Knill–Laflamme 纠错条件、稳定子码与任意子拓扑编织（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章的形式化结果聚焦于不可克隆内积判据（[@thm-no-cloning-overlap]）、泡利字算子乘法相位（[@lemma-pauli-word-phase]）、正交综合征子空间恢复代数式（[@prop-orthogonal-syndrome-recovery]）以及架着色的三股编织恒等式（[@cor-braid-yang-baxter]）。在量子纠错与拓扑量子计算的完整理论中，以下四项核心定理由经典文献给出：

1. **Knill–Laflamme 充要条件**（E. Knill and R. Laflamme, *Theory of quantum error-correcting codes*, Phys. Rev. A **55**, 900–911, 1997, doi:10.1103/PhysRevA.55.900）：设 $P_{\mathcal{C}} = V V^*$ 为物理空间到码子空间 $\mathcal{C}$ 的正交投影。一族噪声 Kraus 算子 $\{E_i\}$ 在 $\mathcal{C}$ 上可被某个完全正且保迹（CPTP）恢复信道精确纠正，当且仅当存在厄米系数矩阵 $\alpha_{ij} \in \mathbb{C}$ 使得

   $$
   P_{\mathcal{C}} E_i^* E_j P_{\mathcal{C}} = \alpha_{ij} P_{\mathcal{C}} \qquad (\forall i, j).
   $$

   将 $\alpha$ 对角化后，即可在可纠子空间上化归为本章 [@prop-orthogonal-syndrome-recovery] 的正交综合征结构 $S_i^* S_j = \delta_{ij} I_d$，并且标量因子 $\alpha_{ij}$ 独立于码空间内的具体逻辑态，从根本上保证了综合征测量不会泄露任何逻辑叠加幅度。
2. **Gottesman 稳定子码形式体系**（D. Gottesman, *Stabilizer Codes and Quantum Error Correction*, Caltech Ph.D. thesis, 1997, arXiv:quant-ph/9705052）：在 $N$ 比特泡利群 $\mathcal{P}_N$ 中，取由 $N - k$ 个相互独立且两两对易的泡利生成元生成、阶为 $|\mathcal{S}| = 2^{N-k}$ 且不含 $-I^{\otimes N}$ 的阿贝尔子群 $\mathcal{S} \cong (\mathbb{Z}/2\mathbb{Z})^{N-k}$，其公共 $+1$ 特征子空间构成 $2^k$ 维码空间 $\mathcal{C}$。凡与 $\mathcal{S}$ 中某个生成元反对易的泡利错误算子均由二元辛内积唯一标记非零综合征；而在 $\mathcal{S}$ 的正规化子（即中心化子）$N(\mathcal{S})$ 中，商去全局标量相位中心群 $\langle i I^{\otimes N}\rangle = \{\pm I^{\otimes N}, \pm i I^{\otimes N}\}$ 与稳定子群 $\mathcal{S}$ 后，集合 $N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 中的算子代表商群 $N(\mathcal{S}) / (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 中的非平凡逻辑算子（商去标量相位排除了诸如 $-I^{\otimes N}$ 这类仅改变全局相位、泡利权重为 $0$ 的平凡中心元），码距 $d_{\mathrm{code}}$ 则严格定义为全体 $E \in N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 的最小泡利汉明权重。
3. **二维配置空间辫群与任意子分数统计**（J. M. Leinaas and J. Myrheim, *On the theory of identical particles*, Nuovo Cimento B **37**, 1–23, 1977, doi:10.1007/BF02727953）：对空间流形 $M$ 上 $n$ 个全同不可碰撞点粒子的配置空间 $\mathrm{Conf}_n(M) = \{(x_1, \dots, x_n) \in M^n : i \neq j \Rightarrow x_i \neq x_j\} / S_n$，当空间维数 $\dim M \ge 3$ 时基本群同构于有限对称群 $\pi_1(\mathrm{Conf}_n(\mathbb{R}^d)) \cong S_n$（故仅允许玻色子与费米子）；唯有当 $\dim M = 2$ 时，基本群扩张为无穷阶 Artin 辫群 $\pi_1(\mathrm{Conf}_n(\mathbb{R}^2)) \cong B_n$，允许连续阿贝尔任意子相位或非阿贝尔高维幺正编织表示。
4. **非阿贝尔任意子与拓扑容错的物理边界**（C. Nayak, S. H. Simon, A. Stern, M. Freedman, and S. Das Sarma, *Non-Abelian anyons and topological quantum computation*, Rev. Mod. Phys. **80**, 1083–1159, 2008, doi:10.1103/RevModPhys.80.1083）：在具有能隙的二维拓扑物相中，非阿贝尔准粒子的简并融合空间对局域微扰具有随准粒子间距 $L$ 指数衰减的分裂保护 $\Delta E \propto e^{-L/\xi}$，世界线编织在简并子空间上诱导出满足 Yang–Baxter 关系的非平凡幺正门。但需注意：首先，如正文所述，三维空间中点粒子交换回路可借第三空间轴解开，绝不意味着三维闭合一维绳结（knots）会自动解开；其次，拓扑保护在真实有限温度硬件中仍受热激发准粒子游走（thermal poisoning）与有限尺寸效应限制，并非在物理实现中绝对零错误。
:::

现在，我们已经学会了如何用纠缠和正交综合征把脆弱的量子态稳稳护在多比特高维子空间里。一旦拥有了受保护的逻辑量子寄存器，我们接下来自然要问：**在这片高维球面上，量子算法究竟如何利用“两子正交反射”与“赤道相位齿轮”完成经典计算机望尘莫及的加速？** 让我们推开[第十五章](ch15-grover-qft-and-period-finding.md)的大门，走进 Grover 搜索、量子傅里叶变换（QFT）与 Shor 周期寻找的几何心脏。
