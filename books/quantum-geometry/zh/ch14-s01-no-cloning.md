# 14.1 不可克隆：保内积与平方内积 {#sec-no-cloning-overlap}

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

第 4 条边界说，[@thm-no-cloning-overlap] 只是必要条件。那么反过来问：既然精确克隆做不到，近似克隆在文献中如何构造，代价又落在哪里（[@rem-buzek-hillery-isometry-literature]）？

::: {.remark #rem-buzek-hillery-isometry-literature title="Bužek–Hillery 通用 1→2 克隆等距与最优性的外部形式化边界"}
**文献结果，未在本书形式化。** Bužek 与 Hillery（1996）构造了一台对一切输入一视同仁的 $1 \to 2$ 克隆机（其单拷贝最优保真度由 Gisin 与 Massar 于 1997 年证明；出处见 [@ex-buzek-hillery-three-marginals]）。它用三个量子比特：输入、空白副本，以及一个辅助的“机器”比特 $M$。对单位向量 $\psi$，记 $\psi^\perp$ 为与它正交的单位向量；克隆等距把输入送到

$$
\lvert\psi\rangle \;\longmapsto\; \sqrt{\tfrac{2}{3}}\;\lvert\psi\rangle\lvert\psi\rangle\lvert\psi^\perp\rangle_M \;-\; \sqrt{\tfrac{1}{3}}\;\frac{\lvert\psi\rangle\lvert\psi^\perp\rangle + \lvert\psi^\perp\rangle\lvert\psi\rangle}{\sqrt{2}}\;\lvert\psi\rangle_M ,
$$

三个因子依次是克隆体一、克隆体二与机器比特。对两个克隆体求偏迹，机器比特落在约化态 $\frac{1}{3}\lvert\psi\rangle\langle\psi\rvert + \frac{2}{3}\lvert\psi^\perp\rangle\langle\psi^\perp\rvert$ 上。

**通用 $5/6$ 上界的外部形式来源。** JD Jones 的 [qubit-cloning-lean 固定版本](https://github.com/JD-Jones-ASES/qubit-cloning-lean/tree/f619a52e67849f80205127e3ba7877f7f7658e50)（MIT 许可）给出这一最优性的外部 Lean 证明。其 [Defs.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Defs.lean) 中，信道由任意有限个 $4\times2$ 复 Kraus 矩阵表示：

$$
\begin{aligned}
\mathcal{E}_K(\rho)&=\sum_{i=0}^{r-1}K_i\rho K_i^*,\\
\sum_{i=0}^{r-1}K_i^*K_i&=I_2.
\end{aligned}
$$

第二式就是 `IsChannel K` 的保迹条件；Kraus 形式已保证完全正性，不预设两个输出对称或信道旋转协变。对每个单位输入 $\psi\in\mathbb{C}^2$，令 $P_\psi=\lvert\psi\rangle\langle\psi\rvert$，$\rho_1=\Tr_2\mathcal{E}_K(P_\psi)$、$\rho_2=\Tr_1\mathcal{E}_K(P_\psi)$。源码的两个保真度为

$$
\begin{aligned}
F_j(K,\psi)&=\operatorname{Re}\Tr(P_\psi\rho_j)\\
&=\langle\psi\rvert\rho_j\lvert\psi\rangle,\qquad j=1,2.
\end{aligned}
$$

这是纯态重叠，也就是**平方保真度约定**；若使用取平方根的保真度约定，相应数值为 $\sqrt{5/6}$。

取六个泡利本征输入 $\mathcal{S}=\{\lvert0\rangle,\lvert1\rangle,\lvert+\rangle,\lvert-\rangle,\lvert+i\rangle,\lvert-i\rangle\}$，其中 $\lvert\pm\rangle=(\lvert0\rangle\pm\lvert1\rangle)/\sqrt2$、$\lvert\pm i\rangle=(\lvert0\rangle\pm i\lvert1\rangle)/\sqrt2$，记 $A_j(K)=\frac16\sum_{\psi\in\mathcal{S}}F_j(K,\psi)$。[Form.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Form.lean) 的 `sixAvg_le_internal` 断言

$$
\begin{aligned}
\frac{A_1(K)+A_2(K)}{2}
&=\frac1{12}\sum_{\psi\in\mathcal{S}}\bigl(F_1(K,\psi)+F_2(K,\psi)\bigr)\\
&\le\frac56.
\end{aligned}
$$

这个平均同时计入两克隆体，共十二个数。其代数机制是一个平方和证书：按输出基 $00,01,10,11$ 排列，把 $K_i$ 写成

$$
K_i=\begin{pmatrix}a_i&b_i\\c_i&d_i\\e_i&f_i\\g_i&h_i\end{pmatrix},
$$

则源码中的 `form_sos` 经 Kraus 求和给出

$$
\begin{aligned}
q_i={}&|a_i-d_i-f_i|^2+2|c_i-h_i/2|^2\\
&+2|e_i-h_i/2|^2+3|g_i|^2\\
&+3|b_i|^2+|d_i-f_i|^2\ge0,\\
6(A_1+A_2)&=5\sum_i\norm{K_i}_{\mathrm F}^2-\sum_iq_i.
\end{aligned}
$$

这里 $\norm{K_i}_{\mathrm F}^2$ 是全部矩阵元模平方之和。对保迹条件取迹，有 $\sum_i\norm{K_i}_{\mathrm F}^2=\Tr I_2=2$，于是 $6(A_1+A_2)\le10$，除以 $12$ 即得上界。

同文件的 `exists_unit_min_le_internal` 因而给出精确的最坏情形结论：**对每个上述有限 Kraus 保迹信道，都存在一个单位纯输入**使

$$
\min\{F_1(K,\psi),F_2(K,\psi)\}\le\frac56.
$$

理由也可直接从有限平均看出：若每个单位输入的两个保真度都严格大于 $5/6$，六个泡利输入上的十二个数就都严格大于 $5/6$，与平均上界矛盾。这里限制的是两个克隆体对所有纯输入能**共同保证**的质量；它不声称非对称装置的每个克隆体都各自受逐点 $5/6$ 上界限制，也没有断言球面的 Haar 平均恒等式。

[Unique.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Unique.lean) 的 `isGreatest_cloning_fidelity_internal` 还包含可达性：在“存在有限 Kraus 保迹信道，使每个单位输入都满足 $t\le F_1$ 且 $t\le F_2$”的所有实数 $t$ 中，$5/6$ 是最大元。其构造给出两算子的 Bužek–Hillery 信道，对所有单位输入都有 $F_1=F_2=5/6$；因此这里的 $5/6$ 是达到的共同保证，而非仅有上界。

**验证边界。** 这份外部源码使用 Lean `4.35.0-rc2` 与 mathlib [`06535612`](https://github.com/leanprover-community/mathlib4/tree/065356127b1dc0016f66b7283ce0ce2c4055aa55)，本书所钉 trureturing 使用 Lean `4.35.0` 与 mathlib [`56a00585`](https://github.com/leanprover-community/mathlib4/tree/56a005855ea17e0b0958f73ec801ae140b0a1679)。上述外部证明尚未移植、编译或冻结到本书所用的 trureturing 版本中；此处引用其明确陈述与证明源码，不主张本书工具链已独立完成内核复核。下文 [@thm-cloning-machine-spectrum] 的本地形式化范围仍是所定义机器约化态的谱与熵；克隆等距及三个边缘态的文献说明保持各自的适用边界。
:::

Lean 模块 `D5/S3/Quantum/CloningMachine` 直接把这一候选机器约化态矩阵定义出来，并证明它的谱与输入无关。

::: {.definition #def-cloning-machine-reduced-state title="正交补比特、克隆机的机器约化态与机器熵" lean="D5/S3/Quantum/CloningMachine.orthogonalQubit D5/S3/Quantum/CloningMachine.machineReducedState D5/S3/Quantum/CloningMachine.binaryEntropyBits D5/S3/Quantum/CloningMachine.machineEntropy"}
在模块 `CloningMachine` 中（`QubitState` 为 $\operatorname{Fin} 2 \to \mathbb{C}$，`QubitMatrix` 为 $2 \times 2$ 复矩阵）：

1. **正交补比特** [`orthogonalQubit`](lean:D5/S3/Quantum/CloningMachine.orthogonalQubit) $\psi = \bigl(-\overline{\psi_1},\ \overline{\psi_0}\bigr)$；
2. **机器约化态** [`machineReducedState`](lean:D5/S3/Quantum/CloningMachine.machineReducedState) 定义为

   $$
   \operatorname{machineReducedState}\ \psi \;=\; \frac{1}{3}\,\psi\,\psi^{*} \;+\; \frac{2}{3}\,\psi^\perp\,(\psi^\perp)^{*}, \qquad \psi^\perp = \operatorname{orthogonalQubit}\ \psi,
   $$

   其中 $v\,v^{*}$ 表示外积矩阵 `Matrix.vecMulVec v (star v)`；
3. 以比特为单位的二元熵 [`binaryEntropyBits`](lean:D5/S3/Quantum/CloningMachine.binaryEntropyBits) $p = -p\log_2 p - (1 - p)\log_2(1 - p)$，**机器熵** [`machineEntropy`](lean:D5/S3/Quantum/CloningMachine.machineEntropy) $= \operatorname{binaryEntropyBits}\ \frac{1}{3}$。
:::

::: {.theorem #thm-cloning-machine-spectrum title="克隆机机器约化态的输入无关谱与机器熵的闭式" lean="D5/S3/Quantum/CloningMachine.orthogonal_qubit_inner D5/S3/Quantum/CloningMachine.machine_reduced_is_density D5/S3/Quantum/CloningMachine.machine_reduced_det D5/S3/Quantum/CloningMachine.machine_reduced_spectrum D5/S3/Quantum/CloningMachine.machine_entropy_closed_form"}
设 $\psi$ 为 `QubitState`，沿用 [@def-cloning-machine-reduced-state] 的记号。

1. **正交性**（无需归一化）：$\psi^{*} \cdot \operatorname{orthogonalQubit}\ \psi = 0$，即 `star ψ ⬝ᵥ orthogonalQubit ψ = 0`。

若再设 $\psi$ 归一化（`hUnit : star ψ ⬝ᵥ ψ = 1`），则：

2. **是密度矩阵**：$\operatorname{machineReducedState}\ \psi$ 半正定，且迹等于 $1$；
3. **行列式**：$\det\bigl(\operatorname{machineReducedState}\ \psi\bigr) = \frac{2}{9}$；
4. **谱**：$\operatorname{machineReducedState}\ \psi$ 在 $\mathbb{C}$ 上的谱恰为 $\bigl\{\frac{1}{3},\ \frac{2}{3}\bigr\}$。

此外，不涉及 $\psi$：

5. **机器熵的闭式**：$\operatorname{machineEntropy} = \log_2 3 - \frac{2}{3}$。
:::

::: proof
结论 1 展开点积后由环运算化简。结论 2：两个外积 $\psi\psi^{*}$ 与 $\psi^\perp(\psi^\perp)^{*}$ 各自半正定，非负系数的线性组合仍半正定；取正交补保持范数平方，所以迹等于 $\frac{1}{3} + \frac{2}{3} = 1$。结论 3：把 $\psi^\perp(\psi^\perp)^{*}$ 写成显式的 $2 \times 2$ 矩阵，展开行列式，再用归一化条件化简得 $\frac{2}{9}$。结论 4：$2 \times 2$ 矩阵的特征多项式由迹与行列式决定，这里是 $X^2 - X + \frac{2}{9} = \bigl(X - \frac{1}{3}\bigr)\bigl(X - \frac{2}{3}\bigr)$（`machine_reduced_charpoly`），谱就是它的根集。结论 5：把 $\log_2\frac{1}{3} = -\log_2 3$ 与 $\log_2\frac{2}{3} = 1 - \log_2 3$ 代入 $\operatorname{binaryEntropyBits}\ \frac{1}{3}$ 并化简。完整证明由 Lean 内核检查。
:::

[@thm-cloning-machine-spectrum] 严格证明的是 [@def-cloning-machine-reduced-state] 中给定 $2\times 2$ 矩阵的密度态性质、行列式、输入无关谱与机器熵闭式；它与三比特克隆等距偏迹之间的对应见下例（[@ex-buzek-hillery-three-marginals]）。

::: {.example #ex-buzek-hillery-three-marginals title="Bužek–Hillery 克隆机的三个边缘态：克隆体保真度 5/6，机器比特反向收缩到 1/3"}
**文献结果，未在本书形式化**（V. Bužek 与 M. Hillery，Phys. Rev. A **54**, 1844, 1996；最优性见 N. Gisin 与 S. Massar，Phys. Rev. Lett. **79**, 2153, 1997；亦见 [@rem-buzek-hillery-isometry-literature]）。下面的三个边缘态由该克隆等距直接求偏迹得到，并已对随机输入态作数值核对。

记输出态为 $\lvert\Omega\rangle = \sqrt{\frac{2}{3}}\,\lvert\psi\psi\rangle\lvert\psi^\perp\rangle_M - \sqrt{\frac{1}{3}}\,\lvert S\rangle\lvert\psi\rangle_M$，其中 $\lvert S\rangle = \frac{1}{\sqrt{2}}\bigl(\lvert\psi\psi^\perp\rangle + \lvert\psi^\perp\psi\rangle\bigr)$。

- **机器比特。** $\lvert\psi\psi\rangle$ 与 $\lvert S\rangle$ 正交，对两个克隆体求偏迹时交叉项消失，剩下 $\rho_M = \frac{2}{3}\lvert\psi^\perp\rangle\langle\psi^\perp\rvert + \frac{1}{3}\lvert\psi\rangle\langle\psi\rvert$，正是 [@def-cloning-machine-reduced-state] 中的 $\operatorname{machineReducedState}\ \psi$。
- **单个克隆体。** 两项的机器因子 $\lvert\psi^\perp\rangle$ 与 $\lvert\psi\rangle$ 正交，对机器求偏迹后克隆对处于混合态 $\frac{2}{3}\lvert\psi\psi\rangle\langle\psi\psi\rvert + \frac{1}{3}\lvert S\rangle\langle S\rvert$。再对另一个克隆体求偏迹：$\lvert\psi\psi\rangle$ 贡献 $\lvert\psi\rangle\langle\psi\rvert$，$\lvert S\rangle$ 贡献 $\frac{1}{2}\bigl(\lvert\psi\rangle\langle\psi\rvert + \lvert\psi^\perp\rangle\langle\psi^\perp\rvert\bigr)$，合计

  $$
  \rho_{\mathrm{clone}} \;=\; \Bigl(\frac{2}{3} + \frac{1}{6}\Bigr)\lvert\psi\rangle\langle\psi\rvert + \frac{1}{6}\,\lvert\psi^\perp\rangle\langle\psi^\perp\rvert \;=\; \frac{5}{6}\,\lvert\psi\rangle\langle\psi\rvert + \frac{1}{6}\,\lvert\psi^\perp\rangle\langle\psi^\perp\rvert .
  $$

设输入的布洛赫矢量为单位向量 $\vv{r}$（于是 $\lvert\psi^\perp\rangle$ 对应 $-\vv{r}$）：

| 子系统 | 约化态的本征值 | 布洛赫矢量 | 与输入的保真度 $\langle\psi\rvert\rho\lvert\psi\rangle$ | 熵（比特） |
| :---: | :---: | :---: | :---: | :---: |
| 输入 | $1,\ 0$ | $\vv{r}$ | $1$ | $0$ |
| 克隆体一、克隆体二 | $\frac{5}{6},\ \frac{1}{6}$ | $\frac{2}{3}\,\vv{r}$ | $\frac{5}{6} \approx 0.8333$ | $0.6500$ |
| 机器比特 | $\frac{2}{3},\ \frac{1}{3}$ | $-\frac{1}{3}\,\vv{r}$ | $\frac{1}{3}$ | $\log_2 3 - \frac{2}{3} \approx 0.9183$ |

机器一行的本征值与熵即 [@thm-cloning-machine-spectrum] 的结论 4 与 5。数值核对（三个随机输入态）：克隆体保真度 $0.833333$，克隆体与机器的布洛赫收缩因子 $0.666667$ 与 $-0.333333$，机器谱 $\{0.333333,\ 0.666667\}$，行列式 $0.222222$；上式在计算基上的线性延拓与对一般 $\psi$ 的表达式只差整体相位，并保持内积。

由此可见，精确克隆受 [@thm-no-cloning-overlap] 的 $z = z^2$ 判据阻断；而在上述近似克隆方案中，每个克隆体的布洛赫矢量均匀收缩到 $\frac{2}{3}$，机器比特则携带着长度为 $\frac{1}{3}$ 的反向布洛赫矢量与输入方向无关的熵 $\log_2 3 - \frac{2}{3} \approx 0.918$ 比特，三个边缘态的混合度均源于三体纯态纠缠。
:::

::: {.figure src="ch14-approx-clone"}
**近似克隆的代价：克隆体缩到 2/3，机器反向带走 1/3。** 琥珀色的点是球皮上的输入 $\vv{r}$；青色的箭头是每个克隆体的布洛赫矢量 $\frac{2}{3}\vv{r}$，落在青色虚线圆上；品红的箭头是机器比特的 $-\frac{1}{3}\vv{r}$，落在半径 $\frac{1}{3}$ 的品红虚线圆上。三个矢量由克隆等距求偏迹算出。文献结果，未在本书形式化；机器比特的谱见 [@thm-cloning-machine-spectrum]。
:::
