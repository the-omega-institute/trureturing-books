# 单量子比特旋转器编译：布洛赫几何定理与 ZYZ 欧拉角编译器

> *“量子态是方向,量子门是让量子态转向的,那么可以理解为一种有面积的几何结构”*

在[第二十五章](ch25-rewriting-and-xor.md)中，我们把三维欧氏克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 铸造成了一台基于 3 比特刀片掩码与按位异或（XOR）的代数引擎 `GeometricState`，并在 `D5/S3/Quantum/Measurement/Bloch/QubitBloch.lean` 中检验了无迹布洛赫算符 $B(a) = a_0 X + a_1 Y + a_2 Z$ 的 $2\times 2$ 复矩阵核公式（[@cor-bloch-operator-core]）。

现在，我们要在这台引擎之上完成单量子比特几何闭环的最后一步建造：

1. **在状态空间侧（Lean 4 形式化证明）**：任何一颗 $2\times 2$ 厄米矩阵 $M \in M_2(\mathbb{C})$ 是如何与它的实迹 $\operatorname{Re}(\Tr M)$ 和三维布洛赫向量 $\operatorname{bloch}(M) \in \mathbb{R}^3$ 一一对应的？为什么迹为 $1$ 的幂等纯态（$M^2 = M$）恰好落在单位球面 $\norm{\operatorname{bloch}(M)} = 1$ 上，而任意正半定矩阵（`M.PosSemidef`）都必然被锁在球体内部 $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$？
2. **在算符编译侧（Python 3 旋转器编译器）**：当给定任意三组欧拉转角 $(\alpha, \beta, \gamma)$ 时，如何不借道 $2\times 2$ 复矩阵乘法，直接在 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 的四维偶子代数 $\mathcal{Cl}^+_{3,0}(\mathbb{R}) = \operatorname{span}_{\mathbb{R}}\{1, e_1 e_2, e_1 e_3, e_2 e_3\}$ 中将它们编译成单一的单位旋转器（rotor）
   $$
   R(\alpha, \beta, \gamma) = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma),
   $$
   并通过双侧夹心积 $v \mapsto R v \widetilde{R}$ 一步算出三维方向向量 $v \in \mathbb{R}^3$ 的精确转向？

::: {.figure src="ch26-overview"}
**图 26。** 本章地图：左栏，绿色的布洛赫球，琥珀色的纯态箭头伸到球面 $\lvert r\rvert = 1$，墨色的点在球内，正半定的矩阵都落在这里（[@prop-hermitian-bloch-geometry]、[@cor-psd-bloch-ball-bound]）；中栏，夹心积绕紫色的 $z$ 轴转 $90^\circ$，青色的影子留在轴上，品红的扇形被虚线分成两个半角；右栏，$e_1$ 依次绕 $z$、$y$、$z$ 转过 $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$，琥珀色的三段路停在 $R e_1 \widetilde{R}$（旋子编译是数值演示，没有冻结定理）。
:::

## 布洛赫矩阵的迹与坐标还原 {#sec-bloch-matrix-trace-and-recovery}

在 Lean 4 模块 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean`（命名空间为 `D5.S3.Quantum.Information.ActualPureQubitCostInfimum`）中，为了建立任意 $2\times 2$ 复矩阵 $M \in M_2(\mathbb{C})$ 与三维欧氏空间 $\operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$ 之间的精确双向映射，源码首先给出了两个核心定义：

1. **布洛赫向量提取映射 `bloch`**：对任意 $M \in M_2(\mathbb{C})$，提取其实布洛赫三维坐标向量
   $$
   \operatorname{bloch}(M) = \operatorname{WithLp.toLp}_2\,\bigl[\,2\operatorname{Re}(M_{01}),\;\; -2\operatorname{Im}(M_{01}),\;\; \operatorname{Re}(M_{00}) - \operatorname{Re}(M_{11})\,\bigr] \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3);
   $$
2. **布洛赫矩阵重构映射 `blochMatrix`**：给定实迹参数 $a \in \mathbb{R}$ 与三维实向量 $r = (r_0, r_1, r_2) \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$，构造 $2\times 2$ 复矩阵
   $$
   \operatorname{blochMatrix}(a, r) = \begin{pmatrix} \dfrac{(a + r_2 : \mathbb{R})}{2} & \dfrac{(r_0 : \mathbb{C}) - (r_1 : \mathbb{C})i}{2} \\ \dfrac{(r_0 : \mathbb{C}) + (r_1 : \mathbb{C})i}{2} & \dfrac{(a - r_2 : \mathbb{R})}{2} \end{pmatrix} = \frac{a}{2} I_2 + \frac{1}{2}\bigl(r_0 X + r_1 Y + r_2 Z\bigr).
   $$

下面的第一条冻结定理与第二条冻结引理共同证明：映射 $(a, r) \mapsto \operatorname{blochMatrix}(a, r)$ 在迹通道与三维向量通道上具有零损耗的精确左逆还原性质。

::: {.theorem #thm-bloch-matrix-trace title="布洛赫重构矩阵的精确迹恒等式" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace"}
对任意实数 $a \in \mathbb{R}$ 与三维实欧氏向量 $r \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$，布洛赫矩阵 $\operatorname{blochMatrix}(a, r)$ 的矩阵迹恒等于复标量 $(a : \mathbb{C})$：

$$
\Tr\bigl(\operatorname{blochMatrix}(a, r)\bigr) = (a : \mathbb{C}).
$$
:::

::: proof
在 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:58` 中，证明调用 `simp [blochMatrix, Matrix.trace, Fin.sum_univ_two]` 将 $2\times 2$ 矩阵迹展开为两个对角元之和：

$$
\Tr\bigl(\operatorname{blochMatrix}(a, r)\bigr) = \frac{(a : \mathbb{C}) + (r_2 : \mathbb{C})}{2} + \frac{(a : \mathbb{C}) - (r_2 : \mathbb{C})}{2},
$$

随后由环消去策略 `ring` 直接消去 $\pm (r_2 : \mathbb{C})/2$ 项，得到 $(a : \mathbb{C})$。完整证明由 Lean 内核检查。
:::

::: {.lemma #lemma-bloch-coordinate-recovery title="布洛赫重构矩阵的三维坐标向量还原引理" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix"}
对任意实数 $a \in \mathbb{R}$ 与三维实欧氏向量 $r \in \operatorname{EuclideanSpace}\,\mathbb{R}\,(\operatorname{Fin} 3)$，对 $\operatorname{blochMatrix}(a, r)$ 提取布洛赫向量恒还原出原始向量 $r$：

$$
\operatorname{bloch}\bigl(\operatorname{blochMatrix}(a, r)\bigr) = r.
$$
:::

::: proof
在 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:63` 中，证明对三维向量分量下标调用 `ext i` 与 `fin_cases i <;> (simp [blochMatrix, bloch]; ring)`：

- 当 $i = 0$ 时，$2\operatorname{Re}\bigl(\frac{r_0 - i r_1}{2}\bigr) = r_0$；
- 当 $i = 1$ 时，$-2\operatorname{Im}\bigl(\frac{r_0 - i r_1}{2}\bigr) = -2\bigl(-\frac{r_1}{2}\bigr) = r_1$；
- 当 $i = 2$ 时，$\frac{a + r_2}{2} - \frac{a - r_2}{2} = r_2$。

三个分量逐一恒等，故 $\operatorname{bloch}(\operatorname{blochMatrix}(a, r)) = r$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch26-read-coords"}
**从矩阵读回迹与三个坐标。** 取 $a = 1$、$r = (0.48, 0.60, 0.64)$ 的 $\operatorname{blochMatrix}(1, r)$：青色的对角两格相加得迹 $1$、相减得 $z = 0.64$；墨色的右上一格给出 $x = 2 \times 0.24$ 与 $y = -2 \times (-0.30)$；虚线框的左下一格只是它的共轭，不必读。读回的正是 $r$（[@thm-bloch-matrix-trace]、[@lemma-bloch-coordinate-recovery]）。
:::

## 厄米重构、纯态单位球面与正半定球界 {#sec-hermitian-bloch-and-psd-ball}

前两条定理从参数 $(a, r)$ 出发验证了 $\operatorname{blochMatrix}(a, r)$ 的迹与向量还原。反过来，若给定任意一个满足厄米条件 `M.IsHermitian`（即 $M^* = M$）的 $2\times 2$ 复矩阵 $M \in M_2(\mathbb{C})$，它是否必然等于由其自身实迹 $\operatorname{Re}(\Tr M)$ 与自身布洛赫向量 $\operatorname{bloch}(M)$ 重构出的布洛赫矩阵？而且，当它进一步满足迹为 $1$（$\Tr M = 1$）与幂等性（$M \cdot M = M$，即[第三章](ch03-projectors-and-duality.md)的纯态投影线条件）时，它的布洛赫向量模长为什么一定精确等于 $1$？

下面的冻结命题将这两条核心几何性质完整封装在一起。

::: {.proposition #prop-hermitian-bloch-geometry title="厄米 2×2 矩阵的布洛赫完全重构与幂等纯态单位球面定理" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian"}
设 $M \in M_2(\mathbb{C})$ 为 $2\times 2$ 复矩阵，且满足厄米性假设 `hM : M.IsHermitian`。则同时成立以下两条结论：

1. **厄米矩阵的布洛赫精确重构**：
   $$
   M = \operatorname{blochMatrix}\bigl(\operatorname{Re}(\Tr M),\; \operatorname{bloch}(M)\bigr);
   $$
2. **迹一幂等投影算子的单位布洛赫球面判据**：
   $$
   \Tr M = 1 \;\longrightarrow\; M \cdot M = M \;\longrightarrow\; \norm{\operatorname{bloch}(M)} = 1.
   $$
:::

::: proof
在 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:68` 中，证明首先从厄米条件 $M^* = M$ 提取出四个实虚部约束：对角元虚部为零 $\operatorname{Im}(M_{00}) = 0$（`h00`）、$\operatorname{Im}(M_{11}) = 0$（`h11`），以及非对角元共轭对称 $\operatorname{Re}(M_{10}) = \operatorname{Re}(M_{01})$（`h10r`）、$\operatorname{Im}(M_{10}) = -\operatorname{Im}(M_{01})$（`h10i`）。

- 对第一合取项，调用 `ext i j`、`fin_cases i <;> fin_cases j` 与复数实虚部外延性 `Complex.ext`，代入上述四条约束后由 `simp` 与 `ring` 直接核实 $M$ 的四个矩阵元与 $\operatorname{blochMatrix}(\operatorname{Re}(\Tr M), \operatorname{bloch}(M))$ 恒等；
- 对第二合取项，设 `ht : Matrix.trace M = 1` 且 `hp : M * M = M`。对两式取迹的实部并展开 $2\times 2$ 矩阵乘法，得 $\operatorname{Re}(M_{00}) + \operatorname{Re}(M_{11}) = 1$ 以及 $\operatorname{Re}(M_{00})^2 + \operatorname{Re}(M_{11})^2 + 2\bigl(\operatorname{Re}(M_{01})^2 + \operatorname{Im}(M_{01})^2\bigr) = 1$。代入欧氏范数平方公式 `EuclideanSpace.real_norm_sq_eq`：
  $$
  \norm{\operatorname{bloch}(M)}^2 = 4\operatorname{Re}(M_{01})^2 + 4\operatorname{Im}(M_{01})^2 + \bigl(\operatorname{Re}(M_{00}) - \operatorname{Re}(M_{11})\bigr)^2 = 1,
  $$
  结合范数非负性 `norm_nonneg (bloch M)` 由 `nlinarith` 推出 $\norm{\operatorname{bloch}(M)} = 1$。

完整证明由 Lean 内核检查。
:::

如果把幂等纯态条件 $M^2 = M$ 放宽为一般的**正半定条件** `hM : M.PosSemidef`（涵盖所有混态密度矩阵与正半定测量效应元，对应[第四章](ch04-decoherence.md)缩入球内的截短弦），布洛赫向量的模长会发生什么？下面的冻结推论利用行列式恒等式证明：任何正半定 $2\times 2$ 矩阵的布洛赫范数都严格受其实迹控制！

::: {.corollary #cor-psd-bloch-ball-bound title="正半定 2×2 矩阵的布洛赫向量模长受实迹控制定理" lean="D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef"}
设 $M \in M_2(\mathbb{C})$ 为 $2\times 2$ 复矩阵。若 $M$ 正半定（`hM : M.PosSemidef`），则其布洛赫向量的欧氏范数不超过其迹的实部：

$$
\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M).
$$
:::

::: proof
在 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean:100` 中，由正半定性质 `hM.trace_nonneg` 与 `hM.det_nonneg`，知迹的实部与行列式的实部均非负：$\operatorname{Re}(\Tr M) \ge 0$（`ht`）且 $\operatorname{Re}(\det M) \ge 0$（`hd`）。接着利用 [@prop-hermitian-bloch-geometry] 的第一合取项将 $M$ 重写为 $\operatorname{blochMatrix}(\operatorname{Re}(\Tr M), \operatorname{bloch}(M))$，结合 [@thm-bloch-matrix-trace]、[@lemma-bloch-coordinate-recovery] 与 $2\times 2$ 行列式公式 `Matrix.det_fin_two`，证得关键代数恒等式（`he`）：

$$
\operatorname{Re}(\det M) = \frac{\bigl(\operatorname{Re}(\Tr M)\bigr)^2 - \norm{\operatorname{bloch}(M)}^2}{4}.
$$

由于 $\operatorname{Re}(\det M) \ge 0$，必有 $\norm{\operatorname{bloch}(M)}^2 \le \bigl(\operatorname{Re}(\Tr M)\bigr)^2$；再结合 $\operatorname{Re}(\Tr M) \ge 0$ 与 $\norm{\operatorname{bloch}(M)} \ge 0$，由非线性算术决策过程 `nlinarith` 推出 $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$（特别地，对迹为 $1$ 的混态密度矩阵有 $\norm{\operatorname{bloch}(\rho)} \le 1$）。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch26-det-sign"}
**迹为 $1$ 时，行列式的符号说出箭头在哪。** 布洛赫球的 $x$–$z$ 截面：$\det = (1 - \lvert r\rvert^2)/4$，琥珀色的纯态在绿色的圆周上，$\det = 0$；墨色的点在球内，$\det = 0.19 > 0$；品红的点在球外，$\det = -0.17 < 0$，不是正半定。绿色的圆盘是正半定矩阵所能到达的范围（[@cor-psd-bloch-ball-bound]），圆周是迹一幂等的纯态（[@prop-hermitian-bloch-geometry]）。
:::

## 偶子代数双矢量与双侧夹心积 {#sec-even-rotor-sandwich-action}

有了 [@thm-bloch-matrix-trace] 至 [@cor-psd-bloch-ball-bound] 奠定的布洛赫球体状态几何，现在让我们把目光转向**旋转器（Rotor）编译**：当单比特量子门作用在布洛赫向量 $v = r_0 e_1 + r_1 e_2 + r_2 e_3 \in \mathbb{R}^3 \subset \mathcal{Cl}_{3,0}(\mathbb{R})$ 上时，如何完全在实克利福德偶子代数 $\mathcal{Cl}^+_{3,0}(\mathbb{R})$ 内部完成编译与旋转？

在 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 中，垂直于坐标轴 $x, y, z$（即 $e_1, e_2, e_3$）的三块右手有向单位双矢量平面（rotation bivectors）分别为：

$$
B_x = e_2 e_3 \;\;(\text{掩码 }6 = 110_2), \qquad
B_y = e_3 e_1 = -e_1 e_3 \;\;(-\text{掩码 }5 = 101_2), \qquad
B_z = e_1 e_2 \;\;(\text{掩码 }3 = 011_2).
$$

请注意 $B_y = e_3 e_1 = -e_1 e_3$ 的符号：按照右手螺旋定则，从 $+z$ 轴（$e_3$）转向 $+x$ 轴（$e_1$）的有向面积元是 $e_3 \wedge e_1 = e_3 e_1 = -e_1 e_3$。由于每块单位双矢量都满足 $B_u^2 = -1$ 且 $\widetilde{B}_u = -B_u$（$u \in \{x, y, z\}$），绕 $u$ 轴右手旋转角度 $\theta$ 的**基本旋转器（elementary rotor）**由半角欧拉公式给出（图 26 中栏）：

$$
R_u(\theta) = \exp\Bigl(-\frac{\theta}{2} B_u\Bigr) = \cos\frac{\theta}{2} - \sin\frac{\theta}{2}\,B_u \in \mathcal{Cl}^+_{3,0}(\mathbb{R}).
$$

::: {.figure src="ch26-half-angle"}
**旋子只走半角，箭头走整角。** 取 $\theta = 120^\circ$、绕 $z$ 轴：左栏紫色的点 $R_z(\theta)$ 停在单位圆上 $\theta/2 = 60^\circ$ 处，横坐标是标量 $\cos 60^\circ$，纵坐标是 $-e_{12}$ 的系数 $\sin 60^\circ$，落在圆上即 $R\widetilde{R} = 1$；右栏夹心积把 $e_1$ 转过品红扇形的整角 $120^\circ$，停在琥珀色的 $R e_1 \widetilde{R}$。
:::

直接用[第二十五章](ch25-rewriting-and-xor.md)的逆序共轭 $\widetilde{R}_u(\theta) = \cos\frac{\theta}{2} + \sin\frac{\theta}{2}\,B_u$ 检验归一化：

$$
R_u(\theta)\,\widetilde{R}_u(\theta) = \cos^2\frac{\theta}{2} - \sin^2\frac{\theta}{2}\,B_u^2 = \cos^2\frac{\theta}{2} + \sin^2\frac{\theta}{2} = 1!
$$

当这枚旋转器通过**双侧夹心积（sandwich product）** $v \mapsto R_u(\theta)\,v\,\widetilde{R}_u(\theta)$ 作用在任意三维向量 $v \in \operatorname{span}_{\mathbb{R}}\{e_1, e_2, e_3\}$ 上时：

- 与旋转轴平行（即正交于双矢量平面 $B_u$）的分量 $v_\parallel$ 与 $B_u$ **可交换**（例如 $e_3 (e_1 e_2) = e_1 e_2 e_3 = (e_1 e_2) e_3$），故 $R_u(\theta) v_\parallel \widetilde{R}_u(\theta) = R_u(\theta)\widetilde{R}_u(\theta) v_\parallel = v_\parallel$ 保持不动；
- 落在双矢量平面 $B_u$ 内的分量 $v_\perp$ 与 $B_u$ **反对易**（例如 $e_1 (e_1 e_2) = e_2 = -(e_1 e_2) e_1$），把右侧的 $\widetilde{R}_u(\theta) = \exp(+\frac{\theta}{2}B_u)$ 穿过 $v_\perp$ 拉到左侧时指数变号，半角 $\frac{\theta}{2} + \frac{\theta}{2} = \theta$ 自动合拢为整角：
  $$
  R_u(\theta)\,v_\perp\,\widetilde{R}_u(\theta) = R_u(\theta)^2\,v_\perp = \bigl(\cos\theta - \sin\theta\,B_u\bigr) v_\perp!
  $$

::: {.viz src="zyz-compile" preset="sandwich" height="500"}
**夹心积：轴上的影子不动，平面里转整角。** 琥珀色的箭头 $v = (\tfrac{\sqrt{3}}{2}, 0, \tfrac{1}{2})$ 绕紫色的 $z$ 轴转 $90^\circ$：青色的影子 $\tfrac{1}{2}e_3$ 留在轴上不动，品红的那一份在 $z = \tfrac{1}{2}$ 的平面里扫出 $90^\circ$ 的扇形，虚线把它分成 $45^\circ + 45^\circ$ 两半，即左边的 $R_z$ 与右边的 $\widetilde{R}_z$ 各贡献的半角。这是本节的手算，页面为数值演示。
:::

更美妙的是，当我们将三段欧拉旋转依次串接为 **ZYZ 欧拉角序列** $(\alpha, \beta, \gamma)$ 时，编译器只需在四维偶子代数 $\mathcal{Cl}^+_{3,0}(\mathbb{R})$ 中做两次异或刀片乘法：

$$
R(\alpha, \beta, \gamma) = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma),
$$

就能把任意长串的旋转门折叠成**唯一一枚四分量偶多重向量** $R = s + b_{12} e_1 e_2 + b_{13} e_1 e_3 + b_{23} e_2 e_3$！

::: {.viz src="zyz-compile" preset="chain" height="500"}
**三段转动乘成一枚旋子。** 取下面例题的 $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$：琥珀色的箭头 $v$ 先绕紫色的 $z$ 轴转 $\gamma$，再绕 $y$ 轴转 $\beta$，最后绕 $z$ 轴转 $\alpha$；白色三脚架停在 $Re_1$、$Re_2$、$Re_3$，图顶写出乘完的旋子 $0.830 - 0.396\,e_1e_2 - 0.393\,e_1e_3 + 0.030\,e_2e_3$。旋子编译没有冻结定理，页面上它只是数值演示。
:::

## ZYZ 旋转器编译器 Python 3 实现与数值核验 {#sec-zyz-rotor-compiler-python}

下面是紧接在 `GeometricState` 之后的完整 Python 3 `RotorCompiler` 实现与自检函数（取自 `part7_engine.py` 的后半部分）：

```python
from __future__ import annotations

from dataclasses import dataclass
from math import cos, sin, isclose, pi
from typing import Dict, Mapping, Tuple

BLADE_NAMES: Dict[int, str] = {
    0: "1", 1: "e1", 2: "e2", 3: "e12",
    4: "e3", 5: "e13", 6: "e23", 7: "e123",
}


def _blade_sign(left: int, right: int) -> int:
    """Sign of e_left * e_right in Cl(3,0), with e_i^2 = 1."""
    inversions = 0
    for i in range(3):
        if (left >> i) & 1:
            inversions += (right & ((1 << i) - 1)).bit_count()
    return -1 if inversions % 2 else 1


@dataclass(frozen=True)
class GeometricState:
    """Sparse multivector in the eight-dimensional Cl(3,0) basis."""

    terms: Mapping[int, complex]

    def __post_init__(self) -> None:
        clean = {int(k): complex(v) for k, v in self.terms.items() if abs(v) > 1e-14}
        if any(k < 0 or k > 7 for k in clean):
            raise ValueError("a Cl(3,0) blade mask must use three bits")
        object.__setattr__(self, "terms", clean)

    @staticmethod
    def zero() -> "GeometricState":
        return GeometricState({})

    @staticmethod
    def scalar(value: complex) -> "GeometricState":
        return GeometricState({0: value})

    @staticmethod
    def basis(index: int) -> "GeometricState":
        if index not in (0, 1, 2):
            raise ValueError("basis index must be 0, 1, or 2")
        return GeometricState({1 << index: 1})

    @staticmethod
    def pauli(x: int, z: int, phase: int = 0) -> "GeometricState":
        """Binary Pauli word, encoded by the X/Z symplectic bits."""
        if x not in (0, 1) or z not in (0, 1):
            raise ValueError("Pauli bits must be 0 or 1")
        mask = (1 if x else 0) | (2 if z else 0)
        return GeometricState({mask: (1j) ** phase})

    def __add__(self, other: "GeometricState") -> "GeometricState":
        out: Dict[int, complex] = dict(self.terms)
        for mask, value in other.terms.items():
            out[mask] = out.get(mask, 0j) + value
        return GeometricState(out)

    def __neg__(self) -> "GeometricState":
        return GeometricState({m: -v for m, v in self.terms.items()})

    def __sub__(self, other: "GeometricState") -> "GeometricState":
        return self + (-other)

    def __rmul__(self, scalar: complex) -> "GeometricState":
        return GeometricState({m: scalar * v for m, v in self.terms.items()})

    def __mul__(self, other: "GeometricState") -> "GeometricState":
        out: Dict[int, complex] = {}
        for left, a in self.terms.items():
            for right, b in other.terms.items():
                mask = left ^ right
                value = a * b * _blade_sign(left, right)
                out[mask] = out.get(mask, 0j) + value
        return GeometricState(out)

    def reverse(self) -> "GeometricState":
        out = {}
        for mask, value in self.terms.items():
            grade = mask.bit_count()
            out[mask] = value * (-1 if grade * (grade - 1) // 2 % 2 else 1)
        return GeometricState(out)

    def scalar_part(self) -> complex:
        return self.terms.get(0, 0j)

    def norm_squared(self) -> float:
        value = (self * self.reverse()).scalar_part()
        return float(value.real)

    def close(self, other: "GeometricState", tol: float = 1e-10) -> bool:
        return all(abs((self - other).terms.get(m, 0j)) <= tol
                   for m in set(self.terms) | set(other.terms))


def _bivector(axis: str) -> GeometricState:
    # Right-handed rotation planes: z -> e12, y -> e31, x -> e23.
    planes = {"x": (2, 4), "y": (4, 1), "z": (1, 2)}
    try:
        a, b = planes[axis.lower()]
    except KeyError as exc:
        raise ValueError("axis must be x, y, or z") from exc
    return GeometricState.basis(a.bit_length() - 1) * GeometricState.basis(b.bit_length() - 1)


class RotorCompiler:
    """Compile a ZYZ Euler triple into an even Clifford rotor."""

    @staticmethod
    def rotor(axis: str, angle: float) -> GeometricState:
        plane = _bivector(axis)
        return GeometricState.scalar(cos(angle / 2.0)) - sin(angle / 2.0) * plane

    @classmethod
    def compile(cls, alpha: float, beta: float, gamma: float) -> GeometricState:
        return cls.rotor("z", alpha) * cls.rotor("y", beta) * cls.rotor("z", gamma)

    @staticmethod
    def apply(rotor: GeometricState, vector: GeometricState) -> GeometricState:
        return rotor * vector * rotor.reverse()

    @classmethod
    def zyz_matrix(cls, alpha: float, beta: float, gamma: float) -> Tuple[Tuple[float, ...], ...]:
        ca, sa = cos(alpha), sin(alpha)
        cb, sb = cos(beta), sin(beta)
        cg, sg = cos(gamma), sin(gamma)
        return (
            (ca * cb * cg - sa * sg, -ca * cb * sg - sa * cg, ca * sb),
            (sa * cb * cg + ca * sg, -sa * cb * sg + ca * cg, sa * sb),
            (-sb * cg, sb * sg, cb),
        )


def _assert_state(actual: GeometricState, expected: GeometricState) -> None:
    assert actual.close(expected), (actual, expected)


def self_test() -> None:
    e1, e2, e3 = (GeometricState.basis(i) for i in range(3))
    one = GeometricState.scalar(1)
    _assert_state(e1 * e1, one)
    _assert_state(e1 * e2, -e2 * e1)
    _assert_state(e1 * e2 * e3 * e1 * e2 * e3, GeometricState.scalar(-1))
    _assert_state(GeometricState.pauli(1, 0) * GeometricState.pauli(0, 1), e1 * e2)
    _assert_state(GeometricState.pauli(0, 1) * GeometricState.pauli(1, 0), -(e1 * e2))
    _assert_state(GeometricState.pauli(1, 1, phase=1), 1j * (e1 * e2))

    compiler = RotorCompiler()
    rotor = compiler.compile(0.37, -0.81, 0.52)
    _assert_state(rotor * rotor.reverse(), one)
    assert isclose(rotor.norm_squared(), 1.0, abs_tol=1e-12)
    x = e1
    rotated = compiler.apply(compiler.rotor("z", 0.5), x)
    assert isclose(rotated.terms.get(1, 0j).real, cos(0.5), abs_tol=1e-10)
    assert isclose(rotated.terms.get(2, 0j).real, sin(0.5), abs_tol=1e-10)
    matrix = compiler.zyz_matrix(0.37, -0.81, 0.52)
    assert all(isclose(sum(row[k] * row[k] for k in range(3)), 1.0, abs_tol=1e-10)
               for row in matrix)
    r_h = compiler.compile(0.0, pi / 2.0, pi)
    _assert_state(compiler.apply(r_h, e1), e3)
    _assert_state(compiler.apply(r_h, e2), -e2)
    _assert_state(compiler.apply(r_h, e3), e1)
    print("part7_engine: self-test passed (Cl(3,0) XOR/Pauli + ZYZ rotor)")


self_test()
```

让我们在下面的数值实例中，把非平凡欧拉角三元组 $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$ 以及标准量子门 $T$ 与阿达玛门 $H$ 的旋转器编译结果逐位打印核对。

::: {.figure src="ch26-rotor-product"}
**三枚两项的旋子乘成一枚四项的旋子。** 四栏是同一副小坐标，紫色柱子依次是 $1, e_{12}, e_{13}, e_{23}$ 的系数：$R_z(0.37)$、$R_y(-0.81)$、$R_z(0.52)$ 各只有两根柱子，乘积 $R$ 的四根都不为零，每栏的平方和都是 $1$。这是下面例题的数值，旋子编译没有冻结定理。
:::

::: {.example #ex-zyz-compilation-trace title="非平凡欧拉角 (0.37, −0.81, 0.52) 与 H、T 门的旋转器编译核验"}
1. **编译非平凡欧拉角三元组 $(\alpha, \beta, \gamma) = (0.37, -0.81, 0.52)$**：调用 `RotorCompiler.compile(0.37, -0.81, 0.52)`，三次半角旋转器在 $\mathcal{Cl}^+_{3,0}(\mathbb{R})$ 中相乘后，仅在掩码 `0`（标量 $1$）、`3`（$e_1 e_2$）、`5`（$e_1 e_3$）、`6`（$e_2 e_3$）四个偶阶位上留有非零实系数（保留 6 位小数）：
   $$
   R(0.37, -0.81, 0.52) \approx 0.829592 - 0.395635\,e_1 e_2 - 0.392911\,e_1 e_3 + 0.029524\,e_2 e_3.
   $$
   在未截断的双精度浮点对象 `rotor` 上直接调用 `rotor.norm_squared()`（即 `(R * R.reverse()).scalar_part().real`），返回值在机器精度下精确为 `1.000000000000`；若用上方保留 6 位小数的展示系数手算平方和，亦满足
   $$
   0.829592^2 + (-0.395635)^2 + (-0.392911)^2 + 0.029524^2 \approx 1.000001 \approx 1.
   $$
   将 $R$ 通过夹心积 `apply(R, e_k)` 作用在三根基向量 $e_1, e_2, e_3$ 上，得到的三个输出向量恰与正交矩阵 `zyz_matrix(0.37, -0.81, 0.52)` 的三列完全重合：
   $$
   M_{\mathrm{ZYZ}}(0.37, -0.81, 0.52) \approx \begin{pmatrix}
   0.378188 & -0.633230 & -0.675273 \\
   0.679631 & 0.685203 & -0.261913 \\
   0.628550 & -0.359884 & 0.689498
   \end{pmatrix}.
   $$
2. **编译 $\pi/8$ 相位门（$T$ 门）**：在布洛赫球面上，$T = \operatorname{diag}(1, e^{i\pi/4}) = e^{i\pi/8} R_z(\pi/4)$ 对应欧拉角 $(\alpha, \beta, \gamma) = (\pi/4, 0, 0)$。调用 `compile(pi/4, 0, 0)` 直接给出赤道旋转器
   $$
   R_T = \cos\frac{\pi}{8} - \sin\frac{\pi}{8}\,e_1 e_2 \approx 0.923880 - 0.382683\,e_1 e_2.
   $$
3. **编译阿达玛门（Hadamard $H$ 门）**：在布洛赫球面上，$H = \frac{1}{\sqrt{2}}(X + Z)$ 将 $X \leftrightarrow Z$ 互换并将 $Y \mapsto -Y$（即绕 $x+z$ 对角轴旋转 $\pi$ 弧度），对应欧拉角三元组 $(\alpha, \beta, \gamma) = (0, \pi/2, \pi)$。调用 `compile(0, pi/2, pi)` 得纯双矢量旋转器：
   $$
   R_H = -\frac{1}{\sqrt{2}}\,e_1 e_2 - \frac{1}{\sqrt{2}}\,e_2 e_3 \approx -0.707107\,e_1 e_2 - 0.707107\,e_2 e_3,
   $$
   直接执行夹心积检验得 $R_H e_1 \widetilde{R}_H = e_3$、$R_H e_2 \widetilde{R}_H = -e_2$、$R_H e_3 \widetilde{R}_H = e_1$，分毫不差！
:::

::: {.viz src="zyz-compile" preset="t" height="500"}
**$T$ 门：中间一段为零。** $(\alpha, \beta, \gamma) = (\pi/4, 0, 0)$ 的前两段角为零，琥珀色的箭头和白色三脚架一动不动；最后一段绕紫色的 $z$ 轴转 $45^\circ$，箭头沿赤道从 $e_1$ 走过 $45^\circ$，$Re_3$ 留在北极，图顶的旋子是 $0.924 - 0.383\,e_1e_2$。
:::

::: {.viz src="zyz-compile" preset="h" height="500"}
**阿达玛门 $(0, \pi/2, \pi)$。** 第一段绕 $z$ 转 $180^\circ$：琥珀色的箭头在北极、就在轴上，只剩青色的影子，三脚架的 $Re_1$、$Re_2$ 翻到反面；第二段绕 $y$ 转 $90^\circ$，箭头落到 $e_1$。紫色虚线是对角轴 $(e_1 + e_3)/\sqrt{2}$，三脚架停在 $Re_1 = e_3$、$Re_2 = -e_2$、$Re_3 = e_1$。
:::

::: {.remark #rem-zyz-euler-compilation-literature title="SU(2)→SO(3) 双覆盖与单比特 ZYZ 欧拉角分解定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 关于任意单比特幺正门 $U \in \mathrm{U}(2)$ 的 ZYZ 欧拉角完备分解与双覆盖同态，其经典文献出处与本章冻结定理的职责边界如下：

1. **单比特幺正门的通用 ZYZ 欧拉角分解**（参见 M. A. Nielsen & I. L. Chuang, *Quantum Computation and Quantum Information*, 10th Anniversary Ed., Cambridge University Press, 2010, Theorem 4.1, §4.2；以及 A. Barenco et al., *Elementary gates for quantum computation*, Phys. Rev. A **52**, 3457, 1995, DOI `10.1103/PhysRevA.52.3457`）：对任意单比特幺正矩阵 $U \in \mathrm{U}(2)$，存在实角 $(\delta, \alpha, \beta, \gamma) \in \mathbb{R}^4$ 使得
   $$
   U = e^{i\delta}\,R_z(\alpha)\,R_y(\beta)\,R_z(\gamma).
   $$
2. **旋量旋转器群 $\operatorname{Spin}(3) \cong \mathrm{SU}(2)$ 到 $\mathrm{SO}(3)$ 的二对一满同态**：在 $\mathcal{Cl}^+_{3,0}(\mathbb{R})$ 中，单位偶多重向量群 $\operatorname{Spin}(3) = \{R \in \mathcal{Cl}^+_{3,0}(\mathbb{R}) \mid R\widetilde{R} = 1\} \cong S^3 \cong \mathrm{SU}(2)$ 通过夹心伴随作用 $\operatorname{Ad}_R(v) = R v \widetilde{R}$ 满射到三维特殊正交群 $\mathrm{SO}(3)$，其核为 $\{\pm 1\}$（故 $R$ 与 $-R$ 诱导出同一个三维球面旋转）。固定旋转平面时这一二对一映射的拓扑——路径提升唯一、无连续整体截面、整圈使旋子变号——已由[第五章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift] 验证。
3. **冻结定理的精确边界**：本章经 Lean 4 内核验证的四条定理均来自 `D5/S3/Quantum/Information/ActualPureQubitGeometry.lean`，严格刻画布洛赫重构矩阵的迹（[@thm-bloch-matrix-trace]）、三维布洛赫向量还原（[@lemma-bloch-coordinate-recovery]）、厄米 $2\times 2$ 矩阵的布洛赫分解与幂等纯态单位球面性质（[@prop-hermitian-bloch-geometry]）以及正半定矩阵的布洛赫球界 $\norm{\operatorname{bloch}(M)} \le \operatorname{Re}(\Tr M)$（[@cor-psd-bloch-ball-bound]）。通用 $\mathrm{U}(2)$ 门的 ZYZ 欧拉角存在性分解与 $\mathrm{SU}(2) \to \mathrm{SO}(3)$ 满射性属于上述经典文献结论，而 `RotorCompiler` 则是给定 $(\alpha, \beta, \gamma)$ 后的可执行正向旋转器合成器。
:::

::: {.viz src="zyz-compile" preset="fold" height="500"}
**三段等于绕一根轴转一次。** 同一组角 $(0.37, -0.81, 0.52)$：紫色虚线是乘完的旋子自己的转轴 $n$，紫色虚弧是绕 $n$ 一次转 $67.9^\circ$，它从白色的起点圈出发，落在白色的路（三段）走到的同一点。“单位旋子就是绕一根轴的一次转动”属于上面的文献结果，未在本书形式化；轴与转角由页面数值算出。
:::

::: {.viz src="zyz-compile" height="560"}
**ZYZ 编译实验室。** 拖动三个欧拉角、换箭头的起点或打开单一转轴 $n$：青色的影子在每一段里都不动，品红的扇形扫过整角，条带小图里标量$^2$ 与面积$^2$ 此消彼长、和恒为 $1$。绿色框只给本章的四条冻结定理（[@thm-bloch-matrix-trace]、[@lemma-bloch-coordinate-recovery]、[@prop-hermitian-bloch-geometry]、[@cor-psd-bloch-ball-bound]），页面在箭头对应的纯态 $\rho = \operatorname{blochMatrix}(1, v)$ 上逐一核对。
:::

至此，我们已经亲手建造并运行了第七部的前两章工程构件（`GeometricState` 与 `RotorCompiler`）。

::: {.film src="007-zyz-compile"}
**把一个旋转编译成三段：ZYZ 与夹心作用（2 分 3 秒）。** 绕紫色 $z$ 轴转动时，青色的影子 $\tfrac{1}{2}e_3$ 不动，品红的那一份扫过整角，而旋转器在小圆盘上只走半角；接着琥珀色的箭头依次绕 $z$、$y$、$z$ 转过 $\gamma$、$\beta$、$\alpha$，三枚旋转器乘成一枚四系数的旋转器 $0.830 - 0.396\,e_1e_2 - 0.393\,e_1e_3 + 0.030\,e_2e_3$，夹住三根基向量即得 ZYZ 矩阵的三列；绕它自己的轴转一次 $67.9^\circ$ 落在同一点（单一转轴属于 [@rem-zyz-euler-compilation-literature] 的文献结果，旋转器编译是数值演示）；随后演示 $T$ 门与阿达玛门，最后在纯态 $\rho = \operatorname{blochMatrix}(1, v)$ 上引用本章四条冻结定理（[@thm-bloch-matrix-trace]、[@lemma-bloch-coordinate-recovery]、[@prop-hermitian-bloch-geometry]、[@cor-psd-bloch-ball-bound]）。
:::

从下一章开始，我们将进入第七部最庄严的收官双章——**直接打开 `trureturing@dev` 的冻结 Lean 4 源码卷宗，逐行精读并审计支撑起整部专著的公理圣殿**！让我们迈入[第二十七章](ch27-reading-frozen-proofs-i.md)。
