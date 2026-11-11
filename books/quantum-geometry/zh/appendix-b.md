# 附录 B：克利福德代数速查手册

本附录汇集了贯穿全书的克利福德几何代数（Clifford Geometric Algebra）核心恒等式：从单量子比特布洛赫球面所属的三维欧氏几何代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$，到二维泡利辛相表 $\mathbb{F}_2^{2n}$，再到第五部狭义相对论与狄拉克旋量所使用的时空代数 $\mathcal{Cl}_{1,1}(\mathbb{R})$ 与 $\mathcal{Cl}_{1,3}(\mathbb{R})$。每一条恒等式均标注其精确的认识论状态：凡对应本仓库已锁定 `trureturing@dev` 定理的条目均附有 `LEAN ✓` 与 GID 链接，其余公理定义与经典代数背景则明确标为 `definition` 或 `文献结果`。

---

## B.1 基本几何积与等级分解（$\mathcal{Cl}_{3,0}(\mathbb{R})$） {#sec-appendix-b-geometric-product}

::: {.remark #rem-appendix-b-cl3-grades-literature title="三维克利福德代数分级公理与基片分解（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（标准克利福德代数教材定义与恒等式；单比特外尔星代数与布洛赫分解的形式化锚点见表 B.6）。** 在三维欧氏向量空间 $\mathbb{R}^3$ 上，克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 由三条正交单位基向量 $e_1, e_2, e_3$ 生成，满足正定平方律与反交换正交律：

$$
e_1^2 = e_2^2 = e_3^2 = +1, \qquad e_i e_j = -e_j e_i \quad (i \neq j).
$$

对任意两个一阶向量 $\mathbf{u} = \sum_{i=1}^3 u_i e_i$ 与 $\mathbf{v} = \sum_{j=1}^3 v_j e_j$，其**几何积（geometric product）**统一了对称的标量内积（grade $0$）与反对称的双向量外积（grade $2$）：

$$
\mathbf{u}\mathbf{v} = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\wedge\mathbf{v},
$$

其中：

$$
\mathbf{u}\cdot\mathbf{v} = \frac{1}{2}(\mathbf{u}\mathbf{v} + \mathbf{v}\mathbf{u}) = \sum_{i=1}^3 u_i v_i \quad (\text{标量，衡量共线投影}),
$$

$$
\mathbf{u}\wedge\mathbf{v} = \frac{1}{2}(\mathbf{u}\mathbf{v} - \mathbf{v}\mathbf{u}) = (u_1 v_2 - u_2 v_1)e_{12} + (u_2 v_3 - u_3 v_2)e_{23} + (u_3 v_1 - u_1 v_3)e_{31} \quad (\text{双向量，衡量有向旋转面积}).
$$

整个八维代数按外积阶数（grade $k \in \{0, 1, 2, 3\}$）直和分解为四个子空间，维数遵循帕斯卡二项式系数 $\binom{3}{0} + \binom{3}{1} + \binom{3}{2} + \binom{3}{3} = 1 + 3 + 3 + 1 = 8$：

| 等级 (Grade $k$) | 子空间名称 | 维数 $\binom{3}{k}$ | 标准基片（Basis Blades） | 3 比特掩码 $m = b_0 + 2b_1 + 4b_2 \in \operatorname{Fin} 8$ | 平方值 $B^2$ | 几何与物理意义 |
| :---: | :--- | :---: | :--- | :---: | :---: | :--- |
| $0$ | 标量（Scalars） | $1$ | $1$ | `000` ($0$) | $+1$ | 内积实部、概率幅模平方与迹 |
| $1$ | 向量（Vectors） | $3$ | $e_1,\; e_2,\; e_3$ | `001` ($1$), `010` ($2$), `100` ($4$) | $+1$ | 布洛赫球面测量轴与反射平面法向 |
| $2$ | 双向量（Bivectors） | $3$ | $e_{12},\; e_{13},\; e_{23}$ | `011` ($3$), `101` ($5$), `110` ($6$) | $-1$ | 有向旋转平面、李代数 $\mathfrak{su}(2)$ 生成元 |
| $3$ | 伪标量（Pseudoscalar） | $1$ | $I_3 = e_{123} = e_1 e_2 e_3$ | `111` ($7$) | $-1$ | 三维有向体积元、手性算子与中心虚数单位 |

:::

---

## B.2 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 的 3 比特异或与 $8\times 8$ 基片乘法表 {#sec-appendix-b-cayley-table}

::: {.remark #rem-appendix-b-cayley-table-literature title="3 比特掩码异或法则与八维基片凯莱表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 若将每个基片编码为 3 比特掩码 $a, b \in \{0, 1, \dots, 7\}$（第 $i-1$ 比特指示是否含因子 $e_i$），则两个基片 $E_a$ 与 $E_b$ 的克利福德乘积由**按位异或（XOR）**目标索引 $a \oplus b$ 与**跨位逆序对计数（inversion parity）**完全决定：

$$
E_a E_b = (-1)^{\operatorname{inv}(a, b)}\, E_{a \oplus b}, \qquad \operatorname{inv}(a, b) = \#\bigl\{(i, j) \in \{1, 2, 3\}^2 \;\big|\; i > j,\; a_i = 1,\; b_j = 1\bigr\}.
$$

下表给出 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 全部 $8$ 个标准基片的 $8\times 8$ 完整乘法凯莱表（行代表左因子 $E_a$，列代表右因子 $E_b$）：

| $E_a \backslash E_b$ | $1$ (`000`) | $e_1$ (`001`) | $e_2$ (`010`) | $e_3$ (`100`) | $e_{12}$ (`011`) | $e_{13}$ (`101`) | $e_{23}$ (`110`) | $e_{123}$ (`111`) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$1$ (`000`)** | $+1$ | $+e_1$ | $+e_2$ | $+e_3$ | $+e_{12}$ | $+e_{13}$ | $+e_{23}$ | $+e_{123}$ |
| **$e_1$ (`001`)** | $+e_1$ | $+1$ | $+e_{12}$ | $+e_{13}$ | $+e_2$ | $+e_3$ | $+e_{123}$ | $+e_{23}$ |
| **$e_2$ (`010`)** | $+e_2$ | $-e_{12}$ | $+1$ | $+e_{23}$ | $-e_1$ | $-e_{123}$ | $+e_3$ | $-e_{13}$ |
| **$e_3$ (`100`)** | $+e_3$ | $-e_{13}$ | $-e_{23}$ | $+1$ | $+e_{123}$ | $-e_1$ | $-e_2$ | $+e_{12}$ |
| **$e_{12}$ (`011`)** | $+e_{12}$ | $-e_2$ | $+e_1$ | $+e_{123}$ | $-1$ | $-e_{23}$ | $+e_{13}$ | $-e_3$ |
| **$e_{13}$ (`101`)** | $+e_{13}$ | $-e_3$ | $-e_{123}$ | $+e_1$ | $+e_{23}$ | $-1$ | $-e_{12}$ | $+e_2$ |
| **$e_{23}$ (`110`)** | $+e_{23}$ | $+e_{123}$ | $-e_3$ | $+e_2$ | $-e_{13}$ | $+e_{12}$ | $-1$ | $-e_1$ |
| **$e_{123}$ (`111`)** | $+e_{123}$ | $+e_{23}$ | $-e_{13}$ | $+e_{12}$ | $-e_3$ | $+e_2$ | $-e_1$ | $-1$ |

:::

---

## B.3 伪标量 $I_3$、逆序自同构 $\widetilde{A}$、旋量与 ZYZ 欧拉合成 {#sec-appendix-b-rotors-and-zyz}

::: {.remark #rem-appendix-b-rotors-zyz-literature title="霍奇对偶、逆序反自同构、旋量双覆盖与 ZYZ 欧拉合成（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（标准三维几何代数与 $\mathrm{SU}(2)\to\mathrm{SO}(3)$ 旋量恒等式；本书中复结构平方 $-1$ 与双轴有限交替字合成定理的形式化锚点见表 B.6）。**

1. **伪标量 $I_3 = e_1 e_2 e_3$ 与霍奇对偶（Hodge Duality）**：
   - 平方性质：$I_3^2 = (e_1 e_2 e_3)(e_1 e_2 e_3) = -1$；
   - 中心交换性：在三维空间中，$I_3$ 与全部一阶向量、二阶双向量均对易（$e_i I_3 = I_3 e_i$），故 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 的中心为 $\mathbb{R} \oplus \mathbb{R} I_3 \cong \mathbb{C}$；
   - 向量与双向量的对偶互换：

     $$
     e_{23} = e_1 I_3, \qquad e_{31} = -e_{13} = e_2 I_3, \qquad e_{12} = e_3 I_3, \qquad \mathbf{u}\wedge\mathbf{v} = (\mathbf{u}\times\mathbf{v})\,I_3.
     $$

2. **逆序反自同构（Reversion $\widetilde{A}$）**：
   将基片内向量因子的排列顺序完全颠倒（满足 $(AB)^{\sim} = \widetilde{B}\,\widetilde{A}$），在等级 $k$ 子空间上的符号因子为 $(-1)^{k(k-1)/2}$：

   $$
   \langle A\rangle_0^{\sim} = +\langle A\rangle_0, \qquad \langle A\rangle_1^{\sim} = +\langle A\rangle_1, \qquad \langle A\rangle_2^{\sim} = -\langle A\rangle_2, \qquad \langle A\rangle_3^{\sim} = -\langle A\rangle_3.
   $$

3. **三维旋量（Rotor）与双面夹心作用**：
   设 $\hat{B}$ 为满足 $\hat{B}^2 = -1$ 的单位双向量（代表有向旋转平面），绕 $\hat{B}$ 平面旋转角度 $\theta$ 的单位旋量属于偶子代数 $\mathcal{Cl}_{3,0}^+(\mathbb{R}) = \operatorname{span}\{1, e_{23}, e_{31}, e_{12}\} \cong \mathbb{H}$：

   $$
   R(\theta, \hat{B}) = \exp\left(-\frac{\theta}{2}\hat{B}\right) = \cos\frac{\theta}{2} - \hat{B}\sin\frac{\theta}{2}, \qquad \widetilde{R}(\theta, \hat{B}) = \cos\frac{\theta}{2} + \hat{B}\sin\frac{\theta}{2}, \qquad R\widetilde{R} = \cos^2\frac{\theta}{2} + \sin^2\frac{\theta}{2} = 1.
   $$

   对任意三维向量 $\mathbf{v} \in \mathbb{R}^3$，双面夹心映射 $\mathbf{v} \mapsto R\mathbf{v}\widetilde{R}$ 保持 $\mathbf{v}$ 为纯一阶向量且严格保持欧氏内积（当 $\theta = 2\pi$ 时 $R(2\pi) = -1$，但 $(-1)\mathbf{v}(-1) = +\mathbf{v}$，体现 $S^3 \to \mathrm{SO}(3)$ 的二重覆盖）。

4. **ZYZ 欧拉旋量分解与级联律**：
   以基本双向量 $B_z = e_{12}$ 与 $B_y = e_{31} = -e_{13}$ 生成绕 $Z$ 轴和 $Y$ 轴的基本旋量：

   $$
   R_z(\alpha) = \cos\frac{\alpha}{2} - e_{12}\sin\frac{\alpha}{2}, \qquad R_y(\beta) = \cos\frac{\beta}{2} - e_{31}\sin\frac{\beta}{2}.
   $$

   它们满足同轴半角加法律 $R_z(\alpha)R_z(\gamma) = R_z(\alpha + \gamma)$、$R_y(\alpha)R_y(\beta) = R_y(\alpha + \beta)$、逆元相消律 $R_z(\alpha)R_z(-\alpha) = 1$，以及任意单比特门的三因子 ZYZ 合成：

   $$
   R_{\mathrm{ZYZ}}(\alpha, \beta, \gamma) = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma), \qquad R_{\mathrm{ZYZ}}(\alpha, 0, \gamma) = R_z(\alpha + \gamma).
   $$
:::

---

## B.4 泡利矩阵对应与 2 比特辛内积相表 {#sec-appendix-b-pauli-symplectic}

::: {.remark #rem-appendix-b-pauli-isomorphism-literature title="$\mathcal{Cl}_{3,0}(\mathbb{R}) \cong M_2(\mathbb{C})$ 泡利表示同构（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（单比特外尔星代数生成元恒等式见表 B.6 中的 `qubit_weyl_star`）。** 通过将 $e_1, e_2, e_3$ 映射为三枚泡利矩阵 $\sigma_x, \sigma_y, \sigma_z$，并将伪标量 $I_3 = e_1 e_2 e_3$ 映射为复矩阵中的 $i I_2$（满足 $\sigma_x \sigma_y \sigma_z = i I_2$），实八维克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 与 $2\times 2$ 复矩阵代数 $M_2(\mathbb{C})$ 建立标准同构。
:::

在稳定子与克利福德电路计算中，单比特泡利算子 $P \in \{I, X, Z, Y\}$ 用二元域向量 $(x, z) \in \mathbb{F}_2^2$ 编码为 $P(x, z) = i^{xz} X^x Z^z$。两个泡利算子 $p = (x_1, z_1)$ 与 $q = (x_2, z_2)$ 的群索引乘积就是**按位异或** $(x_1 \oplus x_2, z_1 \oplus z_2)$，而它们的对易/反对易关系由**辛内积（symplectic inner product）**

$$
\omega(p, q) = x_1 z_2 \oplus z_1 x_2 \in \mathbb{F}_2, \qquad P(p)P(q) = (-1)^{\omega(p, q)} P(q)P(p)
$$

完全裁决（[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul)）：

| 左因子 $P(p)$ $\backslash$ 右因子 $P(q)$ | $I = (0,0)$ | $X = (1,0)$ | $Z = (0,1)$ | $Y = (1,1)$ |
| :---: | :---: | :---: | :---: | :---: |
| **$I = (0,0)$** | $+I$ ($\omega=0$) | $+X$ ($\omega=0$) | $+Z$ ($\omega=0$) | $+Y$ ($\omega=0$) |
| **$X = (1,0)$** | $+X$ ($\omega=0$) | $+I$ ($\omega=0$) | $-iY$ ($\omega=1$) | $+iZ$ ($\omega=1$) |
| **$Z = (0,1)$** | $+Z$ ($\omega=0$) | $+iY$ ($\omega=1$) | $+I$ ($\omega=0$) | $-iX$ ($\omega=1$) |
| **$Y = (1,1)$** | $+Y$ ($\omega=0$) | $-iZ$ ($\omega=1$) | $+iX$ ($\omega=1$) | $+I$ ($\omega=0$) |

---

## B.5 相对论时空代数 $\mathcal{Cl}_{1,1}(\mathbb{R})$ 与 $\mathcal{Cl}_{1,3}(\mathbb{R})$ {#sec-appendix-b-spacetime-algebra}

::: {.remark #rem-appendix-b-sta-lorentz-literature title="四维时空代数 $\mathcal{Cl}_{1,3}(\mathbb{R})$、双曲助推旋量与洛伦兹李括号（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（其中双曲余弦—正弦闵氏差守恒律已由下引 `bogoliubov_norm_conservation` 形式化验证，零光锥二次型刚性见表 B.6 `eq_smul_minkowski_of_null`）。** 在第五部第 17–18 章中，我们将正定欧氏度规升级为闵可夫斯基度规 $\eta_{\mu\nu} = \operatorname{diag}(+1, -1, -1, -1)$，生成四维时空代数（Spacetime Algebra, STA）$\mathcal{Cl}_{1,3}(\mathbb{R})$（其二维光锥切片即 $\mathcal{Cl}_{1,1}(\mathbb{R})$）：

1. **狄拉克生成元 $\gamma_\mu$ 与度规反对易律**：

   $$
   \gamma_0^2 = +1, \qquad \gamma_1^2 = \gamma_2^2 = \gamma_3^2 = -1, \qquad \gamma_\mu \gamma_\nu + \gamma_\nu \gamma_\mu = 2\eta_{\mu\nu}.
   $$

2. **时空劈裂（Spacetime Split）与相对空间基向量 $\boldsymbol{\sigma}_k$**：
   定义类时双向量 $\boldsymbol{\sigma}_k = \gamma_k \gamma_0$（$k = 1, 2, 3$），则：

   $$
   \boldsymbol{\sigma}_k^2 = (\gamma_k \gamma_0)(\gamma_k \gamma_0) = -\gamma_k^2 \gamma_0^2 = -(-1)(+1) = +1, \qquad \boldsymbol{\sigma}_j \boldsymbol{\sigma}_k = -\boldsymbol{\sigma}_k \boldsymbol{\sigma}_j \quad (j \neq k).
   $$

   因此，$\mathcal{Cl}_{1,3}(\mathbb{R})$ 的偶子代数 $\mathcal{Cl}_{1,3}^+(\mathbb{R})$ 同构于三维欧氏克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$！四维伪标量 $I_4 = \gamma_0 \gamma_1 \gamma_2 \gamma_3 = \boldsymbol{\sigma}_1 \boldsymbol{\sigma}_2 \boldsymbol{\sigma}_3$ 满足 $I_4^2 = -1$。
3. **双曲旋量（Hyperbolic Boost Rotor）与洛伦兹变换**：
   由于 $\boldsymbol{\sigma}_1 = \gamma_1 \gamma_0$ 满足 $\boldsymbol{\sigma}_1^2 = +1$，沿 $x^1$ 轴快度为 $\eta$ 的洛伦兹助推旋量展开为双曲余弦与双曲正弦：

   $$
   L(\eta) = \exp\left(\frac{\eta}{2}\gamma_1\gamma_0\right) = \cosh\frac{\eta}{2} + \gamma_1\gamma_0\sinh\frac{\eta}{2}, \qquad L(\eta)\widetilde{L}(\eta) = \cosh^2\frac{\eta}{2} - \sinh^2\frac{\eta}{2} = 1.
   $$

   双面夹心作用 $x^\mu \gamma_\mu \mapsto L(\eta)(x^\mu \gamma_\mu)\widetilde{L}(\eta)$ 自动保持闵可夫斯基二次型 $Q(x) = (x^0)^2 - (x^1)^2 - (x^2)^2 - (x^3)^2$ 不变（离散双曲模差守恒核见 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)）。
4. **洛伦兹群六维双向量李代数对易关系**：
   记空间旋转生成元 $J_k = \frac{1}{4}\varepsilon_{klm}\gamma_l\gamma_m$（即 $J_1 = \frac{1}{2}\gamma_2\gamma_3,\; J_2 = \frac{1}{2}\gamma_3\gamma_1,\; J_3 = \frac{1}{2}\gamma_1\gamma_2$，满足 $J_k^2 = -1/4$）与洛伦兹助推生成元 $K_k = \frac{1}{2}\gamma_k\gamma_0$（满足 $K_k^2 = +1/4$），则对易括号为：

   $$
   [J_i, J_j] = \varepsilon_{ijk} J_k, \qquad [J_i, K_j] = \varepsilon_{ijk} K_k, \qquad [K_i, K_j] = -\varepsilon_{ijk} J_k.
   $$

   第三式 $[K_i, K_j] = -\varepsilon_{ijk} J_k$ 正是两次不同方向洛伦兹助推合成出空间托马斯进动（Thomas precession）的几何根源。
:::

---

## B.6 核心恒等式与形式化状态总览表 {#sec-appendix-b-identity-catalog}

::: {.remark #rem-appendix-b-epistemic-boundary title="克利福德速查手册的形式化边界声明"}
文献结果，未在本书形式化：本速查手册中凡标注 `LEAN ✓` 并附有具体 GID 链接的恒等式（下表 B.1–B.10），均直接对应 `trureturing@dev` 提交 `a660b9333c0f8d25aaa22af1bbbfab43c2f94a46` 下经由 Lean 4 内核验证并冻结的定理（详见 [附录 C](appendix-c.md)）。而一般维数克利福德代数 $\mathcal{Cl}_{p,q}(\mathbb{R})$ 的通用分级公理、3 比特掩码 $8\times 8$ 展开表的显式枚举以及四维时空代数 $\mathcal{Cl}_{1,3}(\mathbb{R})$ 的连续李代数括号（下表 B.11，标注为 `definition` 或 `文献结果`）则作为服务读者计算演练的经典代数参考工具呈现：

| 序号 | 代数体系 | 恒等式 / 定律名称 | 精确公式 | 认识论标签与 `trureturing@dev` 锚点 |
| :---: | :---: | :--- | :--- | :--- |
| B.1 | $\mathcal{Cl}_{3,0}$ / $M_2(\mathbb{C})$ | 单比特外尔算子反对易与对合律 | $ZX = -XZ,\; X^\dagger = X,\; Z^\dagger = Z,\; X^2 = Z^2 = I$ | `LEAN ✓` ([`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star)) |
| B.2 | $M_2(\mathbb{C})$ | 量子比特代数无一维复特征标 | $\operatorname{IsEmpty}(M_2(\mathbb{C}) \to_{\mathbb{C}} \mathbb{C})$ | `LEAN ✓` ([`qubit_matrix_algebra_has_no_character`](lean:D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character)) |
| B.3 | $M_2(\mathbb{C})$ | 非对易泡利算子无公共非零本征态 | $X\psi = x\psi \land Z\psi = z\psi \implies \psi = 0$ | `LEAN ✓` ([`pauli_observables_have_no_common_eigenvector`](lean:D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector)) |
| B.4 | $\mathcal{Cl}_{3,0}$ / Bloch | 反自伴幺正复结构平方等于 $-1$ | $J^\dagger = -J \land J^\dagger J = I \implies J^2 = -I$ | `LEAN ✓` ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)) |
| B.5 | $\mathcal{Cl}_{3,0}$ / Bloch | 平衡幺正和的叉积项反自伴性 | $(U V^\dagger - V U^\dagger)^\dagger = -(U V^\dagger - V U^\dagger)$ | `LEAN ✓` ([`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)) |
| B.6 | $\mathcal{Cl}_{3,0}$ / Bloch | 厄米量子态的实三维布洛赫分解 | $\rho = \frac{1}{2}(I + r_x X + r_y Y + r_z Z),\; \|\mathbf{r}\| \le \operatorname{Tr}(\rho)$ | `LEAN ✓` ([`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian), [`norm_bloch_le_trace_of_posSemidef`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef)) |
| B.7 | $\mathbb{F}_2^{2n}$ / Pauli | 多比特泡利词乘法与对易秩恒等式 | $P(a)P(b) = \text{phase}(a,b)\,P(a \oplus b)$ | `LEAN ✓` ([`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul)) |
| B.8 | $\mathrm{SU}(2)$ / $\mathrm{SO}(3)$ | 双轴模型有限交替字子群满生成定理 | `TwoAxisModel` 下由两单参数轴诱导的不超过 $N$ 步交替字集生成全群 $\top$ | `LEAN ✓` ([`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)) |
| B.9 | $\mathcal{Cl}_{1,1}$ / $\mathcal{Cl}_{1,3}$ | 博戈留波夫双曲旋量范数守恒 | $\cosh^2 r - \sinh^2 r = 1$（从而双曲旋量保闵氏差 $|\alpha'|^2 - |\beta'|^2 = |\alpha|^2 - |\beta|^2$） | `LEAN ✓` ([`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)) |
| B.10 | $\mathcal{Cl}_{1,3}$ | 闵可夫斯基零光锥二次型刚性 | $(\forall v,\; \eta(v,v)=0 \implies Q(v)=0) \implies Q = c\,\eta$ | `LEAN ✓` ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)) |
| B.11 | $\mathcal{Cl}_{3,0}$ / $\mathcal{Cl}_{1,3}$ | 8 维基片凯莱表、霍奇对偶与洛伦兹李括号 | $E_a E_b = (-1)^{\operatorname{inv}(a,b)}E_{a\oplus b},\; [K_i, K_j] = -\varepsilon_{ijk}J_k$ | `definition` / `文献结果`（标准克利福德代数教材恒等式） |

:::
