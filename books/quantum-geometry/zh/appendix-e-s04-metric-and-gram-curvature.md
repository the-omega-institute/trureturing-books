# E.4 度规几何、平行四边形极化与格拉姆—球面曲率 {#sec-appe-geometry}

第三条推导链（对应推论 [@cor-ch32-parallelogram-quadratic-and-gram]）检验欧氏与酉度规几何、距离矩阵的内积可实现性，以及平直欧氏公设与非欧球面曲率之间的精确分界：

$$
\|x \pm y\|^2 \;\xrightarrow{\;\text{平行四边形律 (T2)}\;}\; \langle x, y\rangle \;\xrightarrow{\;G \succeq 0\text{ (Layer 1)}\;}\; W = UV\text{ 刚性实现} \;\xrightarrow{\;S(x,x)=1\text{ vs. 仿射平直 (T3)}\;}\; \Omega(\epsilon) > 0\text{ 或 }\Omega = 0.
$$

::: {.remark #rem-appe-geometry-chain title="推导链三审计：平行四边形极化、格拉姆嵌入与球面曲率过剩（LEAN ✓、文献结果与有限反例）"}
**逐步推导链与有限维几何反例。**

1. **平行四边形恒等式与约当—冯·诺依曼极化恢复（`LEAN ✓` + `文献结果` + 二维有限维反例）**：
   在内积空间中，实平行四边形恒等式 [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 与拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)（`LEAN ✓`）恒成立；反过来，约当—冯·诺依曼定理（Jordan & von Neumann 1935，`文献结果`）证明赋范线性空间由双线性内积诱导当且仅当其范数满足平行四边形律。
   - **二维 $\ell^1_2$ 曼哈顿范数反例（`手工推导`）**：在二维实平面 $\mathbb{R}^2$ 上赋曼哈顿范数 $\|(u_1, u_2)\|_1 = |u_1| + |u_2|$，取基向量 $e_1 = (1, 0)$、$e_2 = (0, 1)$，直接计算得

     $$
     \|e_1 + e_2\|_1^2 + \|e_1 - e_2\|_1^2 \;=\; 2^2 + 2^2 \;=\; 8 \;\neq\; 4 \;=\; 2\bigl(\|e_1\|_1^2 + \|e_2\|_1^2\bigr).
     $$

     这说明单凭一般赋范距离不足以还原内积相似读数，平行四边形对称性是淘汰 $\ell^p$（$p \neq 2$）各向异性范数的充要桥梁；在复相位侧，公共相位多项式定理 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)（`LEAN ✓`）进一步证明低阶相位不变可观测量必然收敛于二次半双线性型。
2. **舍恩伯格半正定判据与格拉姆幺正刚性实现（`文献结果` + `LEAN ✓`）**：
   如 E.1 节反例 (d) 所示，成对余弦值落在 $[-1, 1]$ 内并不保证三点距离可嵌入欧氏空间。舍恩伯格定理（Schoenberg 1935，`文献结果`）给出充要条件：$n$ 点距离表可等距嵌入欧氏空间当且仅当中心化格拉姆矩阵半正定 $G \succeq 0$；一旦 $G = V^\dagger V = W^\dagger W \succeq 0$ 成立，格拉姆幺正延拓定理 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)（`LEAN ✓`）保证向量实现刚性唯一至整体幺正变换 $W = UV$。
3. **单位球面归一化、“二生三”载体维数与欧氏平行公设的曲率分岔（`T3` + 第 1 层）**：
   欧几里得第五平行公设（三角形内角和恒等于 $\pi$）**不能**无条件从归一化量子态空间推出——恰恰相反，在**选定定向的环境维数 $D \ge 3$ 实内积载体**上（注意二维平面 $\Lambda^2\mathbb{R}^2 \not\subset \mathbb{R}^2$ 无法容纳面内正交法向，故[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) 的“二生三”霍奇星法向自举 $\mathbf{e}_\perp = \star(\mathbf{A}\wedge\mathbf{B})/\sin\epsilon$ 显式依赖定向 $D \ge 3$ 载体，并由[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 完全图 $K_N$ 麦克斯韦—拉曼三维刚性锁 $\Delta E(3) = \Delta E(4) = 0$ 在宏观三维收口），一旦将状态约束在单位球面 $S(x, x) = 1$ 上，[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) 构造的倾斜三态球面三面角原胞 $\Delta\mathcal{T}_\epsilon$（步长 $\epsilon \in (0, \frac{\pi}{2}]$；注意必须区分纯正交单位法向组 $(\mathbf{A}, \mathbf{B}, \mathbf{e}_\perp)$ 的格拉姆行列式 $\det G = \sin^2\epsilon$ 与平权倾斜投影态 $\mathbf{P} = \cos\epsilon\,\mathbf{A} + \sin\epsilon\,\mathbf{e}_\perp$ 的三面角格拉姆行列式 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon$，且精确循环群对称 $C_3 \subset \mathrm{SO}(3)$ 成立于等边/标准正交对称构型，而一旦抽去 Layer 1 全局半正定条件 $G \succeq 0$，E.1 节反例 (d) 的 $\det S = -3 < 0$ 依然成立）严格产生吉拉尔（Girard）正球面角超（`手工推导` + `文献结果`）：

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   平直欧氏几何 $\Omega = 0$ 仅在一阶切空间无穷小极限 $\epsilon \to 0^+$ 或放弃单位球面约束的仿射向量空间中成立；零曲率欧氏平面、正曲率球面与负曲率双曲空间构成标准的 `T3` 常曲率几何分岔。
:::
