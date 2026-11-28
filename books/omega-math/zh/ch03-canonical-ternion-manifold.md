# 第三章 非交换模型的维数与规范整三元数 {#第三章-三维本原流形锁定与规范整三元数}

> *“一维只能沿着圆环前后滑动，二维平面上任何保正定不变内积的换位子都会同时垂直于两根基轴而当场归零；直到第三个自由度立起，非对易旋转才首次合龙——而用规范齐次整四元组 $[w : x : y : z]$ 书写它，连商公理 `Quot.sound` 与无理根号 $\sqrt{2}$ 都一并消失。”*

[第二章](ch02-homogeneous-projective-line.md)虽然用齐次射影闭环 $\mathbb{QP}^1$ 彻底驯服了 $\infty$，却留下一道无法回避的缺口：圆周上的复合运算处处可交换，无法满足母公理 `AXIOM-Ω` 的法则 III（次序敏感非对易性）。本章回答两个决定全书几何命运的核心问题：

1. **为什么配备正定不变型的李代数至少要有三维才能非交换？** 在三维，这一条件又如何锁定叉积？
2. **如何用纯整数构造无公理、免根号、免商集的非交换算例**——规范齐次整三元数载体 $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$？这个射影模型与经典实值比较模型的维数和特征秩下界有什么关系？

在认识论分层上，本章清晰区分两条轨道：第一节与第四节的**经典阴影锚点定理**位于 `Mathlib` 实/复分析侧（官方后端允许的公理上界为 `{propext, Classical.choice, Quot.sound}`，未记录这四条各自的公理闭包），为三维刚性锁定与完备化边界提供外部对照基准；第二节与第三节的**八条零公理内核定理**（汇总为三个绿色定理盒，仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集）则在纯整数与精确分数上直接锁死了欧拉—拉格朗日四平方乘性、射线流群三元公理、四维拉格朗日恒等式、保真度上界 $\kappa \le 1$、流群平移不变性与绕正交轴各转四分之一圈的锚点的射影三元非交换见证；规范代表元约分、特征秩对照与第三节的其余整锚手算则按对应层级标明（`ARGUED` / `NUM`）。

## 3.1 低维退化与三维非阿贝尔锁定：经典阴影侧的冻结锚点 {#sec-ch03-dimension-lock}

先看一个几乎令人难以置信的两行代数事实（`ARGUED`）：**在一维与二维世界里，只要度量在伴随演化下保持不变且非退化，非对易性就会被几何刚性彻底掐死。**

设 $L$ 是域 $K$ 上的有限维李代数，携带一个满足不变条件

$$
\Phi\bigl([x, y],\, z\bigr) \;=\; -\Phi\bigl(y,\, [x, z]\bigr) \qquad (\forall\, x, y, z \in L)
$$

的双线性型 $\Phi : L \times L \to K$（此处甚至不要求 $\Phi$ 对称）。利用反对称性 $[x, x] = 0$ 与 $[x, y] = -[y, x]$，立刻推出括号 $[x, y]$ 与 $x$、$y$ 在 $\Phi$ 的左侧槽位上同时正交：

$$
\Phi\bigl([x, y],\, x\bigr) \;=\; -\Phi\bigl(y,\, [x, x]\bigr) \;=\; 0, \qquad \Phi\bigl([x, y],\, y\bigr) \;=\; \Phi\bigl(x,\, [y, y]\bigr) \;=\; 0.
$$

现在检查维数 $\dim_K L \le 2$：若存在 $x, y \in L$ 使 $[x, y] \neq 0$，则 $x \neq 0$ 且 $x, y$ 必线性无关（若 $sx + ty = 0$，与 $x$ 取括号得 $t[x, y] = 0 \implies t = 0 \implies s = 0$），从而 $x, y$ 张成整个空间 $L$。但线性泛函 $\Phi([x, y], \cdot)$ 在生成元 $x$ 和 $y$ 上同时为零，故它在整个 $L$ 上恒为零！只要 $\Phi$ 左非退化（即由 $\forall z,\; \Phi(u, z) = 0$ 可推 $u = 0$），就必然导出 $[x, y] = 0$，矛盾！

这就说明，配备左非退化不变双线性型的一维与二维李代数只能交换。二维仿射李代数 $[H,E]=E$ 若要配备正定不变型，便会遇上 $\Phi(E,E)=\Phi([H,E],E)=\Phi(H,[E,E])=0$ 的矛盾。

配备左非退化不变双线性型的非交换李代数至少有 **$3$** 维，实三维叉积李代数与它的标准内积达到此下界。以下两条定理在经典实数侧给出三维叉积与泡利结构的分类。

同一低维结论也有经典侧冻结声明，见[维数至多二的消去定理](lean:D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.isLieAbelian_of_finrank_le_two)。

::: {.theorem #thm-ch03-dim3-cross-bracket title="三维正定不变型非交换李代数的叉积锁定（经典阴影锚点）" lean="D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross"}
设 $L$ 为实数域 $\mathbb{R}$ 上的三维非交换李代数（$\dim_{\mathbb{R}} L = 3$ 且非阿贝尔），$\Phi : L \times L \to \mathbb{R}$ 为满足不变性 $\Phi([x, y], z) = -\Phi(y, [x, z])$ 且对一切 $x \neq 0$ 满足 $\Phi(x, x) > 0$ 的双线性型（不预先假设对称）。则存在 $L$ 的一组基 $b_0, b_1, b_2$ 与严格正实数 $c > 0$，使得：

1. 该基关于 $\Phi$ 标准正交：对一切 $i, j \in \{0, 1, 2\}$，$\Phi(b_i, b_j) = \delta_{ij}$；
2. 记 $v_b \in \mathbb{R}^3$ 为 $v \in L$ 在基 $b$ 下的坐标，则对一切 $x, y \in L$，李括号精确等于坐标叉积的正倍数：

   $$
   [x, y]_b \;=\; c\,(x_b \times y_b).
   $$
:::

::: {.proof}
因 $L$ 非交换，取 $x, y$ 使 $[x, y] \neq 0$。由不变性，$\Phi([x, [x, y]], y) = -\Phi([x, y], [x, y]) < 0$，故 $[x, [x, y]] \neq 0$。前述正交观察表明 $x$、$[x, y]$ 与 $[x, [x, y]]$ 两两在 $\Phi$ 的双槽位上正交且均非零；借助正定性将三者分别按正实倍数归一化为 $e_1, e_2, e_3$，立刻得到 $[e_1, e_2] = c\,e_3$（$c > 0$）。三枚两两正交单位向量构成三维空间的一组基，再利用不变性计算 $\Phi([e_2, e_3], e_1) = -\Phi(e_3, [e_2, e_1]) = c\,\Phi(e_3, e_3) = c$ 与 $\Phi([e_3, e_1], e_2) = c$，遂锁死全部基向量循环叉乘关系，双线性延拓即得对一切 $x, y$ 成立。本声明位于经典 `Mathlib` 阴影侧；完整证明由 Lean 内核检查。
:::

[@thm-ch03-dim3-cross-bracket] 顺手就把全部三维非紧非交换候选一扫而空（`ARGUED`）：海森堡代数 $H_3(\mathbb{R})$（$[X, Y] = Z$ 落在中心）导代数是真子代数，而叉积满足 $[L, L] = L$；$\mathfrak{sl}(2, \mathbb{R})$ 的伴随算子 $\operatorname{ad}_H$ 带有实特征值 $\pm 2$，而正倍数叉积对应的反对称矩阵的非零特征值必为纯虚数。三维非阿贝尔正定不变世界只剩下唯一赢家：旋转代数 $\mathfrak{so}(3) \cong \mathfrak{su}(2)$！

另一条经典阴影侧的冻结锚点从完全不同的角度——四维自旋因子上的正定格拉姆读出与相位平衡——再度锁定了同一个三维定向叉积：

::: {.theorem #thm-ch03-spinfactor-cross-lock title="四维自旋因子的三维有向叉积分类（经典阴影锚点）" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences"}
在四维实自旋因子载体 $E = \mathbb{R} \times \mathbb{R}^3$ 上，配标准约当代数乘积 $\operatorname{jordan}\bigl((s, x), (t, y)\bigr) = (st + x \cdot y,\, s y + t x)$、正锥 $\lVert x\rVert \le s$、序单位范数 $\lvert s\rvert + \lVert x\rVert$ 与全体正评价 $\alpha(s, x) = m s + v \cdot x$（$\lVert v\rVert \le m$）。若全域二元运算 $D : E \to E \to E$ 满足有向二标签复格拉姆半正定条件（`P2 D`）与 $\pm 1$ 相位平方平衡条件（`PB D`），则必存在全局定向 $\varepsilon \in \{\mathrm{plus}, \mathrm{minus}\}$ 使得：

1. 对一切 $(s, x), (t, y) \in E$，$D$ 精确等于对应定向的三维向量叉积通道 $D\bigl((s, x), (t, y)\bigr) = \bigl(0,\, \pm(x \times y)\bigr)$（即 $\operatorname{crossD}(\varepsilon)$）；
2. 同时导出全部结构后果 `Consequences D`（单位元湮灭、平移不变、实双线性、范数界、连续性、任意有限标签复格拉姆半正定以及约当—叉积重结合恒等式）与 $2 \times 2$ 复厄米泡利矩阵实现接口 `MatrixInterfaces`。
:::

::: {.proof}
先由 `P2 D` 在二阶复格拉姆阵上的厄米性与行列式非负性无正则性预设地推出 $D$ 反对称、比例输入归零与零行消去；再结合 `PB D` 在纯向量方向上的刚性分类锁死全局单一符号 $\varepsilon \in \{\mathrm{plus}, \mathrm{minus}\}$ 并推广到含标量分量的全体输入；最后将两种定向分别映射到 $2 \times 2$ 厄米矩阵的正序乘积与反序乘积，一次性验证全部有限格拉姆半正定与矩阵接口。本声明位于经典 `Mathlib` 阴影侧；完整证明由 Lean 内核检查。
:::

下图并置两个层次：低维李代数的不变型约束，以及三维有理射影旋转的整四元数非交换见证。

::: {.figure src="ch03-ternion-3d-lock"}
**低维李代数的括号与整三元数的次序。** 左图的非退化不变型迫使一维与二维李代数的括号归零。右图用两枚整四元数演示三维有理射影旋转的非交换见证。叉积分类与具体射线见证分别见 [@thm-ch03-dim3-cross-bracket] 与 [@thm-ch03-phalf-qhalf-noncommutative]。
:::

## 3.2 规范齐次整三元数流形 $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$：免商集、免根号 {#sec-ch03-canonical-ternions}

下面用纯整数构造一个非交换的有理射影模型。其平方读数的特征秩为 $10$。经典实值比较模型的锐利下界由有号单位四元数实现，见 [§3.4](#sec-ch03-real-shadow-completion)。

先看为什么“强行把四元组归一为单位向量”会在第一步就碰壁：考虑最简单不过的 $90^\circ$ 绕第一坐标轴旋转的状态 $p_{\mathrm{Half}} = (1, 1, 0, 0)$。它的平方范数是 $1^2 + 1^2 + 0^2 + 0^2 = 2$，而 $2$ 不是整数平方数！如果执意把它变成单位四元数，立刻被迫引入无理数 $\frac{1 + \mathbf{i}}{\sqrt{2}}$，整座零公理有理建筑当场破功。

沿用[第二章](ch02-homogeneous-projective-line.md)的齐次坐标，把整数对 $[P : Q] \in \mathbb{QP}^1$ 换成整四元组 $[w : x : y : z] \in \mathbb{QP}^3$。每个非零坐标都可用作分母，得到三个有理射影坐标。只需两步整数运算，就能为每条射线选出唯一的规范代表元，无需求助于 `Quot.sound`：

1. 计算四元最大公约数 $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$，将四个分量同时整除 $g$ 得到互素四元组 $(w', x', y', z')$；
2. 选取符号因子 $s \in \{+1, -1\}$，锁定**第一个非零分量为严格正整数**。

规范子类型 `CanonProjTernion` 的相等性由逐项比较整数坐标判定，无需额外公理。[第一章](ch01-axiom-omega-and-cic.md)的赫德伯格定理再由可判定相等性推出恒等证明的唯一性。这个模型的平方读数与伴随旋转都可以用有理分子、分母直接计算。

::: {.definition #def-ch03-canonical-ternion title="规范齐次整三元数载体、三元迁移与无根号保真度（ARGUED）"}
定义**规范齐次整三元数流形** $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$（书中的规范非零子类型记作 `CanonProjTernion`）为满足规范谓词 $\operatorname{IsCanonical}(w, x, y, z)$ 的整数四元组集合：$(w, x, y, z) \neq (0, 0, 0, 0)$，$\gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) = 1$，且第一个非零分量严格大于 $0$。记上述约分并锁正号的规范化算子为 $\operatorname{norm}$。对任意整四元组 $\mathbf{a} = (a_w, a_x, a_y, a_z)$ 与 $\mathbf{b} = (b_w, b_x, b_y, b_z)$，定义：

1. **纯整数哈密顿乘积与共轭**：$\bar{\mathbf{b}} := (b_w, -b_x, -b_y, -b_z)$，

   $$
   \mathbf{a}\mathbf{b} \;:=\; \begin{pmatrix}
   a_w b_w - a_x b_x - a_y b_y - a_z b_z \\
   a_w b_x + a_x b_w + a_y b_z - a_z b_y \\
   a_w b_y - a_x b_z + a_y b_w + a_z b_x \\
   a_w b_z + a_x b_y - a_y b_x + a_z b_w
   \end{pmatrix}^{\!\top}.
   $$

2. **无原点三元比较迁移**：

   $$
   [\mathbf{a}, \mathbf{b}, \mathbf{c}] \;:=\; \operatorname{norm}\bigl(\mathbf{a}\,\bar{\mathbf{b}}\,\mathbf{c}\bigr).
   $$

3. **无根号纯有理射影保真度**：记欧氏整内积 $\langle\mathbf{a}, \mathbf{b}\rangle := a_w b_w + a_x b_x + a_y b_y + a_z b_z$ 与平方范数 $\lVert\mathbf{a}\rVert^2 := \langle\mathbf{a}, \mathbf{a}\rangle \in \mathbb{Z}_{\ge 1}$，定义

   $$
   \kappa_{\mathrm{proj}}(\mathbf{a}, \mathbf{b}) \;:=\; \frac{\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2} \;\in\; \mathbb{Q} \cap [0, 1].
   $$

4. **无根号三维有理伴随旋转**：对任意纯虚向量 $\mathbf{v} = (0, v_x, v_y, v_z) \in \mathbb{Q}^3$，

   $$
   \operatorname{Ad}(\mathbf{p})(\mathbf{v}) \;:=\; \frac{\mathbf{p}\,\mathbf{v}\,\bar{\mathbf{p}}}{\lVert\mathbf{p}\rVert^2} \;\in\; \mathrm{SO}(3, \mathbb{Q}).
   $$
:::

为什么三元迁移 $[\mathbf{a}, \mathbf{b}, \mathbf{c}] = \operatorname{norm}(\mathbf{a}\bar{\mathbf{b}}\mathbf{c})$ 永远不会把三个合法非零整三元数乘成零四元组 $(0, 0, 0, 0)$，又为何左右消去律与外结合律在射影层面上无条件成立？在零公理基础库 `OmegaMath` 中，我们甚至不需要把最大公约数约分硬塞进核心代数定律里：直接在整四元数 `Quaternion` 上取未约分三元代表元 $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$，并以纯整数缩放关系 `RayEquiv` 刻画有号射影共线（完全不碰 `Quot.sound`），下面四条零公理冻结定理一次性把范数乘性与流群公理钉死在裸 CIC 内核之中：

::: {.theorem #thm-ch03-quaternion-norm-and-heap-laws title="整四元数四平方乘性与射影流群公理" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.normSq_mul D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_right_absorption D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc"}
设 `Quaternion` 为 `Omega.Int` 上的整四元数类型，配哈密顿乘积 $\mathbf{a}\mathbf{b}$、共轭 $\bar{\mathbf{b}}$、自然数平方范数 $\lVert\mathbf{a}\rVert^2 := \operatorname{normSq}(\mathbf{a}) \in \mathbb{N}$、非零谓词 `Nonzero` 与整数三元代表元 $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$。称两枚整四元数 $\mathbf{a}, \mathbf{b}$ 满足射影射线等价 $\mathbf{a} \sim_{\mathrm{ray}} \mathbf{b}$（`RayEquiv a b`），若二者均非零且存在非零整数 $k, l \in \mathbb{Z} \setminus \{0\}$ 使 $k\mathbf{a} = l\mathbf{b}$。则在裸 CIC（仅依赖 `OmegaInit` 与 `OmegaMath`，零公理）中，以下四条定理全部成立：

1. **欧拉—拉格朗日四平方乘性**（[`normSq_mul`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.normSq_mul)）：对一切 $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$，

   $$
   \lVert\mathbf{a}\mathbf{b}\rVert^2 \;=\; \lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2.
   $$

2. **射线左消去律**（[`triad_left_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption)）：对一切非零 $\mathbf{x}, \mathbf{z} : \mathrm{Quaternion}$，

   $$
   \operatorname{triad}(\mathbf{x}, \mathbf{x}, \mathbf{z}) \;\sim_{\mathrm{ray}}\; \mathbf{z}.
   $$

3. **射线右消去律**（[`triad_right_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_right_absorption)）：对一切非零 $\mathbf{x}, \mathbf{z} : \mathrm{Quaternion}$，

   $$
   \operatorname{triad}(\mathbf{x}, \mathbf{z}, \mathbf{z}) \;\sim_{\mathrm{ray}}\; \mathbf{x}.
   $$

4. **射线外结合律**（[`triad_assoc`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc)）：对一切非零 $\mathbf{x}, \mathbf{y}, \mathbf{z}, \mathbf{u}, \mathbf{v} : \mathrm{Quaternion}$，

   $$
   \operatorname{triad}\bigl(\operatorname{triad}(\mathbf{x}, \mathbf{y}, \mathbf{z}),\, \mathbf{u},\, \mathbf{v}\bigr) \;\sim_{\mathrm{ray}}\; \operatorname{triad}\bigl(\mathbf{x},\, \mathbf{y},\, \operatorname{triad}(\mathbf{z}, \mathbf{u}, \mathbf{v})\bigr).
   $$
:::

::: {.proof}
第 1 款将乘积 $\mathbf{a}\mathbf{b}$ 的四个整数分量平方展开，交叉项两两精确抵消，化为 $(a_w^2 + a_x^2 + a_y^2 + a_z^2)(b_w^2 + b_x^2 + b_y^2 + b_z^2)$ 并由自然数映射单射性落回 $\mathbb{N}$；由此立见任意三枚非零整四元数的三元积满足 $\lVert\mathbf{a}\bar{\mathbf{b}}\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 \ge 1$，永不退化为零。第 2、3 款直接利用共轭乘积恒等式 $\mathbf{x}\bar{\mathbf{x}} = \lVert\mathbf{x}\rVert^2\mathbf{1}$ 与 $\bar{\mathbf{z}}\mathbf{z} = \lVert\mathbf{z}\rVert^2\mathbf{1}$，分别得出 $\operatorname{triad}(\mathbf{x}, \mathbf{x}, \mathbf{z}) = \lVert\mathbf{x}\rVert^2\mathbf{z}$ 与 $\operatorname{triad}(\mathbf{x}, \mathbf{z}, \mathbf{z}) = \lVert\mathbf{z}\rVert^2\mathbf{x}$；非零假设保证标量因子 $\lVert\mathbf{x}\rVert^2$ 与 $\lVert\mathbf{z}\rVert^2$ 均非零，按 `RayEquiv` 的定义即与 $\mathbf{z}$、$\mathbf{x}$ 共射线。第 4 款由整四元数乘法结合律直接给出分量逐项相等 $\bigl(((\mathbf{x}\bar{\mathbf{y}})\mathbf{z})\bar{\mathbf{u}}\bigr)\mathbf{v} = (\mathbf{x}\bar{\mathbf{y}})\bigl((\mathbf{z}\bar{\mathbf{u}})\mathbf{v}\bigr)$，再结合 `triad` 的非零闭合性与 `RayEquiv` 自反性即得。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

有了四平方乘性与流群公理，接下来要锁死读数通道：如何不借实数柯西—施瓦茨不等式、全凭整数恒等式证出射影保真度 $\kappa(\mathbf{a}, \mathbf{b}) \le 1$，并确认它在共同流群平移下精确不变？答案藏在四维拉格朗日恒等式里——$\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$ 与 $\langle\mathbf{a}, \mathbf{b}\rangle^2$ 的差值，恰好等于六枚 $2 \times 2$ 普吕克子式（Plücker minors）的整数平方和！这三条定理同样落在零公理 `OmegaInit` 与 `OmegaMath` 内核层中：

::: {.theorem #thm-ch03-lagrange-and-kappa-invariance title="四维拉格朗日恒等式、射影保真度上界与流群平移不变性" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lagrange_identity D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_le_one D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant"}
对整四元数 $\mathbf{a} = (a_w, a_x, a_y, a_z)$ 与 $\mathbf{b} = (b_w, b_x, b_y, b_z)$，记欧氏整内积为 $\langle\mathbf{a}, \mathbf{b}\rangle := \mathbf{a}\cdot\mathbf{b} \in \mathbb{Z}$，在 `Omega.IntRatio` 中定义射影保真度 $\kappa(\mathbf{a}, \mathbf{b}) := \operatorname{IntRatio.value}\bigl(\langle\mathbf{a}, \mathbf{b}\rangle^2,\, \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\bigr)$，并定义六枚 $2 \times 2$ 普吕克子式的平方和为

$$
\begin{aligned}
\operatorname{minorSquares}(\mathbf{a}, \mathbf{b}) \;:=\;& (a_w b_x - a_x b_w)^2 + (a_w b_y - a_y b_w)^2 + (a_w b_z - a_z b_w)^2 \\
&+ (a_x b_y - a_y b_x)^2 + (a_x b_z - a_z b_x)^2 + (a_y b_z - a_z b_y)^2 \;\in\; \mathbb{Z}.
\end{aligned}
$$

则在裸 CIC（仅依赖 `OmegaInit` 与 `OmegaMath`，零公理）中，以下三条定理成立：

1. **四维拉格朗日恒等式**（[`lagrange_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lagrange_identity)）：对一切 $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$，

   $$
   \lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2 - \langle\mathbf{a}, \mathbf{b}\rangle^2 \;=\; \operatorname{minorSquares}(\mathbf{a}, \mathbf{b}).
   $$

2. **射影保真度上界**（[`kappa_le_one`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_le_one)）：对一切非零 $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$，在有号分数序关系 `IntRatio.Le` 下满足

   $$
   \kappa(\mathbf{a}, \mathbf{b}) \;\le\; 1.
   $$

3. **流群右平移不变性**（[`kappa_heap_invariant`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant)）：对一切 $\mathbf{a}, \mathbf{b}, \mathbf{u}, \mathbf{v} : \mathrm{Quaternion}$，只要 $\mathbf{u}, \mathbf{v}$ 非零，即在 `IntRatio.Equivalent` 下成立

   $$
   \kappa\bigl(\operatorname{triad}(\mathbf{a}, \mathbf{u}, \mathbf{v}),\, \operatorname{triad}(\mathbf{b}, \mathbf{u}, \mathbf{v})\bigr) \;\equiv\; \kappa(\mathbf{a}, \mathbf{b}).
   $$
:::

::: {.proof}
第 1 款在八元整多项式环上直接展开两侧，四对角项 $a_i^2 b_i^2$ 彼此消去，其余十二项恰好配成六枚 $2 \times 2$ 行列式平方 $(a_i b_j - a_j b_i)^2$ 之和。第 2 款由每个整数平方非负立即推出 $\operatorname{minorSquares}(\mathbf{a}, \mathbf{b}) \ge 0$，代入第 1 款即得 $\langle\mathbf{a}, \mathbf{b}\rangle^2 \le \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$；因 $\mathbf{a}, \mathbf{b}$ 非零，分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$ 严格为正，按 `IntRatio.Le` 定义直接证得 $\kappa(\mathbf{a}, \mathbf{b}) \le 1$。第 3 款令 $\mathbf{p} := \bar{\mathbf{u}}\mathbf{v}$；由 $\mathbf{u}, \mathbf{v}$ 非零知 $\mathbf{p}$ 非零且平方范数 $n := \lVert\mathbf{p}\rVert^2 > 0$。结合律给出 $\operatorname{triad}(\mathbf{a}, \mathbf{u}, \mathbf{v}) = \mathbf{a}\mathbf{p}$，而右乘 $\mathbf{p}$ 使内积满足 $\langle\mathbf{a}\mathbf{p}, \mathbf{b}\mathbf{p}\rangle = \langle\mathbf{a}, \mathbf{b}\rangle\,n$（平方放大 $n^2$ 倍），同时由 [@thm-ch03-quaternion-norm-and-heap-laws] 第 1 款使分母满足 $\lVert\mathbf{a}\mathbf{p}\rVert^2\lVert\mathbf{b}\mathbf{p}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\,n^2$；分子与分母同乘正整数因子 $n^2$ 在 `IntRatio.Equivalent` 中精确消去（若 $\mathbf{a}$ 或 $\mathbf{b}$ 为零则两端同为 `undefined` 亦等价）。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

实际 Lean 载体 `Omega.Ternion.ProjTernion` 只要求代表元的平方范数为正。其三元积保留原始乘积，因此 $p_{\mathrm{Half}}\overline{p_{\mathrm{Half}}}\,p_0=2p_0=(2,0,0,0)$ 与 $p_0$ 共射线，代表元却不同。右消去 $p_0\overline{p_{\mathrm{Half}}}\,p_{\mathrm{Half}}$ 同样得到 $2p_0$。原始外结合律本身已有分量等式，见底层的 `triad_assoc_eq`。

规范模型的桥接是另一步手工推导（`ARGUED`）。若两个互素四元组共射线，写成 $\mathbf{b}=(m/n)\mathbf{a}$，其中 $m,n$ 互素且 $n>0$。则 $n$ 整除 $\mathbf{a}$ 的每个分量，故 $n=1$，再由 $\mathbf{b}$ 互素得 $\lvert m\rvert=1$。首个非零分量取正便强制 $m=1$。三元积对每个槽位的非零缩放只会改变整体标量，因此中间是否约分都得到同一条射线。对最终代表元施以 $\operatorname{norm}$，射线消去律变成逐分量等式，原始外结合律也传到规范模型。

读数在缩放下不变。六个子式同时为零当且仅当两非零向量共射线，因此 [@thm-ch03-lagrange-and-kappa-invariance] 也给出规范模型的分离。读数平方保证非负，$1$ 与 $\mathbf{i}$ 给出零读数。共同左乘与右乘都让内积和平方范数按同一个正因子伸缩。有限格拉姆半正定性则来自下述投影坐标，二次型等于 $\sum_{i,j}(\sum_k c_k P(\mathbf{a}_k)_{ij})^2$。

另一种做法是保留有号单位旋量。两种载体及其读数的区别如下（手工推导）。

- **射影商载体 `CanonProjTernion`（$\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$）**：锁定首非零项为正，把 $+\mathbf{a}$ 与 $-\mathbf{a}$ 粘成同一射线，伴随旋转 $\operatorname{Ad}(\mathbf{p})$ 一一对应有理三维旋转群；其射线核 $\kappa_{\mathrm{proj}}(\mathbf{a}, \mathbf{b}) = \operatorname{Tr}\bigl(P(\mathbf{a})P(\mathbf{b})\bigr)$（其中 $P(\mathbf{a}) = \frac{\mathbf{a}\mathbf{a}^\top}{\lVert\mathbf{a}\rVert^2} \in \mathrm{Sym}_4(\mathbb{Q})$）的特征秩为 **$10$**。
- **有号单位旋量（$S^3(\mathbb{Q}) \subset \mathrm{Sp}(1)$）**：保留 $+u$ 与 $-u$ 的区别，承载有号核 $\kappa_{S^3}(u,v)=(1+\langle u,v\rangle)/2$。伴随作用以 $\{\pm1\}$ 为核，二对一覆盖能提升为有理单位旋量的旋转子群。该子群是 $\mathrm{SO}(3,\mathbb{Q})$ 的真子群，见[第五章](ch05-rational-cayley-rotations.md)。第四章用整五元组计算有号核的特征秩 $5$。

## 3.3 整三元数手算演练：锚点、三拍闭合与非交换见证 {#sec-ch03-worked-calculations}

抽象定义说得再漂亮，不如拿五枚最简单的整四元组亲手算一遍。下面的每一步只用到小学整数加减乘与最大公约数约分，却一口气演完三维非对易旋转、无 $\sqrt{2}$ 伴随作用与三拍精确闭合。

::: {.example #ex-ch03-five-anchors-and-closure title="五枚整三元数锚点、三拍闭合、伴随旋转与非交换见证（NUM）"}
取五枚规范整三元数：

$$
\begin{aligned}
p_0 &= (1, 0, 0, 0), & p_{\mathrm{Half}} &= (1, 1, 0, 0), & q_{\mathrm{Half}} &= (1, 0, 1, 0), \\
p_{\mathrm{Inf}} &= (0, 1, 0, 0), & g_{120} &= (1, 1, 1, 1).
\end{aligned}
$$

逐项手算核验如下：

1. **无根号有理保真度谱**：各锚点平方范数依次为 $1, 2, 2, 1, 4$，相对过去基点 $p_0$ 的保真度直接给出精确分数：

   $$
   \begin{aligned}
   \kappa_{\mathrm{proj}}(p_0, p_0) &= 1, & \kappa_{\mathrm{proj}}(p_0, p_{\mathrm{Half}}) &= \frac{1^2}{1 \cdot 2} = \frac{1}{2}, & \kappa_{\mathrm{proj}}(p_0, q_{\mathrm{Half}}) &= \frac{1}{2}, \\
   \kappa_{\mathrm{proj}}(p_0, p_{\mathrm{Inf}}) &= 0, & \kappa_{\mathrm{proj}}(p_0, g_{120}) &= \frac{1^2}{1 \cdot 4} = \frac{1}{4},
   \end{aligned}
   $$

   且两枚正交赤道半转锚点之间的互保真度为 $\kappa_{\mathrm{proj}}(p_{\mathrm{Half}}, q_{\mathrm{Half}}) = \frac{1^2}{2 \cdot 2} = \frac{1}{4}$。

2. **不含 $\sqrt{2}$ 的整系数 $90^\circ$ 伴随旋转**：尽管 $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ 不是平方数，直接计算 $(1 + \mathbf{i})(x\mathbf{i} + y\mathbf{j} + z\mathbf{k})(1 - \mathbf{i}) = 2x\mathbf{i} - 2z\mathbf{j} + 2y\mathbf{k}$，除以 $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ 立即得到纯整数旋转

   $$
   \operatorname{Ad}(p_{\mathrm{Half}})(x, y, z) \;=\; (x,\; -z,\; y) \;\in\; \mathrm{SO}(3, \mathbb{Z}),
   $$

   正是绕 $x$ 轴的精确右手 $90^\circ$ 旋转（将 $\mathbf{j} \mapsto \mathbf{k}$、$\mathbf{k} \mapsto -\mathbf{j}$）！同时检查现在倍增：$[p_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}] = \operatorname{norm}\bigl((1 + \mathbf{i})\cdot 1 \cdot (1 + \mathbf{i})\bigr) = \operatorname{norm}(0, 2, 0, 0) = (0, 1, 0, 0) = p_{\mathrm{Inf}}$，把[第二章](ch02-homogeneous-projective-line.md)的一维对径闭环原封不动地嵌进了三维流形。

3. **`g120 = (1, 1, 1, 1)` 三拍射影闭合与左消去核验**：以 $p_0$ 为基点连续复合 $g_{120}$（$\lVert g_{120}\rVert^2 = 4$）：
   - 第二拍：未约分积 $(1 + \mathbf{i} + \mathbf{j} + \mathbf{k})^2 = (-2, 2, 2, 2)$（核对模方：$4 + 4 + 4 + 4 = 16 = 4 \times 4$），除以 $\gcd = 2$ 得 $(-1, 1, 1, 1)$，首非零项为负故翻号得 $g_2 = (1, -1, -1, -1)$；
   - 第三拍：未约分积 $(1 - \mathbf{i} - \mathbf{j} - \mathbf{k})(1 + \mathbf{i} + \mathbf{j} + \mathbf{k}) = (4, 0, 0, 0)$（核对模方：$16 = 4 \times 4$），除以 $\gcd = 4$ 精确回到 $g_3 = (1, 0, 0, 0) = p_0$！（若不锁正号以保留自旋双覆叠，第三拍未翻号积为 $(-1, 1, 1, 1)(1, 1, 1, 1) = (-4, 0, 0, 0) \to (-1, 0, 0, 0)$，须走满六拍才回到 $(+1, 0, 0, 0)$。）
   - 左消去核验：$[p_{\mathrm{Half}}, p_{\mathrm{Half}}, g_{120}] = \operatorname{norm}\bigl((1+\mathbf{i})(1-\mathbf{i})(1+\mathbf{i}+\mathbf{j}+\mathbf{k})\bigr) = \operatorname{norm}(2, 2, 2, 2) = (1, 1, 1, 1) = g_{120}$。

4. **一步纯整数非交换见证**：分别按两种顺序在 $p_0$ 处复合 $p_{\mathrm{Half}}$ 与 $q_{\mathrm{Half}}$：

   $$
   \begin{aligned}
   [p_{\mathrm{Half}},\, p_0,\, q_{\mathrm{Half}}] &= \operatorname{norm}\bigl((1 + \mathbf{i})(1 + \mathbf{j})\bigr) = (1, 1, 1, 1) = g_{120}, \\
   [q_{\mathrm{Half}},\, p_0,\, p_{\mathrm{Half}}] &= \operatorname{norm}\bigl((1 + \mathbf{j})(1 + \mathbf{i})\bigr) = (1, 1, 1, -1).
   \end{aligned}
   $$

   两者在第四分量上显式分裂（$+1 \neq -1$），互保真度为 $\frac{(1 + 1 + 1 - 1)^2}{4 \cdot 4} = \frac{1}{4}$。三行整数乘法便见证了规范模型的非交换性。
:::

上述第 4 款中两枚绕正交轴各转四分之一圈的锚点的次序敏感分裂并不止于手工验算：无需约分、无需商集公理 `Quot.sound`，下面这条冻结在零公理基础库 `OmegaInit` 与 `OmegaMath` 中的见证定理直接在射影射线等价关系 `Ternion.RayEquiv` 上锁死了非交换性：

::: {.theorem #thm-ch03-phalf-qhalf-noncommutative title="绕正交轴各转四分之一圈的锚点的射影三元非交换见证" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative"}
在零公理库 `OmegaMath`（仅依赖 `OmegaInit` 与 `OmegaMath`，零公理）中，取整四元数锚点 $p_0 := (1, 0, 0, 0)$、$p_{\mathrm{Half}} := (1, 1, 0, 0)$ 与 $q_{\mathrm{Half}} := (1, 0, 1, 0)$，沿用 [@thm-ch03-quaternion-norm-and-heap-laws] 中的整数三元代表元 $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$ 与射影射线等价关系 $\sim_{\mathrm{ray}}$（`Ternion.RayEquiv`）。则反序三元积不共射线：

$$
\neg\Bigl(\operatorname{triad}(p_{\mathrm{Half}},\, p_0,\, q_{\mathrm{Half}}) \;\sim_{\mathrm{ray}}\; \operatorname{triad}(q_{\mathrm{Half}},\, p_0,\, p_{\mathrm{Half}})\Bigr).
$$
:::

::: {.proof}
按整数四元数乘法直接展开得 $\operatorname{triad}(p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}) = (1, 1, 1, 1)$ 与 $\operatorname{triad}(q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}) = (1, 1, 1, -1)$。反设二者满足 `Ternion.RayEquiv`，则存在非零整数 $k, l \in \mathbb{Z} \setminus \{0\}$ 使 $k(1, 1, 1, 1) = l(1, 1, 1, -1)$。比较标量分量 $w$ 得 $k = l$，比较第四分量 $z$ 得 $k = -l$，从而推出 $l = -l$；在 `Omega.Int` 上该等式迫使 $l = 0$，与 $l \neq 0$ 矛盾。由此直接在不依赖任何经典公理的裸 CIC 内核中见证了 `AXIOM-Ω` 法则 III 在 $\mathbb{T}_3(\mathbb{Q})$ 上的严格非交换性。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

## 3.4 实连续统阴影的完备化边界：从秩五单射嵌入到单位四元数同构 {#sec-ch03-real-shadow-completion}

经典侧的 `TernaryComparison` 配备实值读数，并要求消去、结合、对称、分离、非负、双侧不变及对实系数的有限格拉姆半正定。考虑载体预连通且局部紧、三元迁移连续、对每个 $x$ 映射 $y\mapsto\kappa(x,y)$ 在 $y=x$ 连续的非交换模型。要求有一个映入 $\mathbb R^d$ 的映射，在某点的一个邻域上连续且单射，并要求读数可由映入 $\mathbb R^r$ 的特征映射的内积给出。在这个模型类中，模型存在当且仅当 $d\ge3$ 且 $r\ge5$。有号实单位四元数以读数 $(1+\langle u,v\rangle)/2$ 和正实部半球上的虚部坐标，实现 $(d,r)=(3,5)$。见经典侧冻结声明 [`exists_model_tfae`](lean:D5/S3/Quantum/AURICOmega/DimensionRankRealization.exists_model_tfae)。

预连通性确实限制了模型类（手工推导）。离散的 $S_3$ 用 $[x,y,z]=xy^{-1}z$ 作迁移，以置换矩阵的归一化内积 $\kappa(x,y)=\operatorname{Tr}(P_x^{\mathsf T}P_y)/3$ 作读数。两侧平移保持内积，单位读数分离各点，单位元和一个三循环给出零读数，两个不同的换位给出非交换见证。单点邻域可嵌入 $\mathbb R^0$，而离散的 $S_3$ 不满足预连通性。

以下转向秩五模型的分类。对实值比较结构，非交换性与链连通性迫使任一欧氏特征实现的维数至少为 $5$（[`five_le_of_hasFeatureRank`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.five_le_of_hasFeatureRank)）。链连通性指对每个 $\varepsilon>0$，任意两点可由相邻读数 $>1-\varepsilon$ 的有限链相连。若再有触零性及到 $\mathbb{R}^5$ 的特征实现，得到下面的单射结论。

::: {.theorem #thm-ch03-rank-five-embedding title="秩五三元比较结构的单位四元数单射嵌入（经典阴影锚点）" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.exists_unitQuaternion_embedding"}
设 $C=(M,\operatorname{tri},\kappa)$ 为上述实值三元比较结构。若 $C$ 非交换、链连通、触零（对每个 $\varepsilon>0$ 都有 $\kappa(x,y)<\varepsilon$ 的一对点），且存在 $\varphi:M\to\mathbb{R}^5$ 使 $\kappa(x,y)=\langle\varphi(x),\varphi(y)\rangle$（`HasFeatureRank 5`），则存在单射 $u:M\to\mathrm{Sp}(1)$，使得对一切 $x,y,z\in M$：

$$
u\bigl(\operatorname{tri}(x, y, z)\bigr) \;=\; u(x)\,u(y)^{-1}\,u(z), \qquad \kappa(x, y) \;=\; \frac{1 + \langle u(x), u(y)\rangle_{\mathbb{R}}}{2}.
$$
:::

::: {.proof}
取特征像的张成子空间 $W \subseteq \mathbb{R}^5$，利用左平移诱导等距锁定闭凸包最小范数不动点 $m \neq 0$，并在正交补 $E = (\mathbb{R} m)^\perp$（维数至多为 $4$）上将左、右平移实现为彼此交换的两族正交等距。结合非交换性与链连通（保证左平移群由不含反号特征向量的元生成），迫使 $\dim_{\mathbb{R}} E = 4$ 并在 $E$ 上建立四元数坐标，导出单射 $q : M \to \mathrm{Sp}(1)$ 使 $\kappa(x, y) = a + (1 - a)\langle q(x), q(y)\rangle$（$a = \lVert m\rVert^2 < 1$）。触零性迫使 $a \le \frac{1}{2}$，而单位四元数幂次实部压至 $-\operatorname{Re} p$ 以下配合链连通性迫使 $a \ge \frac{1}{2}$，唯一锁定 $a = \frac{1}{2}$；取共轭 $u = \bar{q}$ 即把反序积转为正序三元积并保持内积。本声明位于经典 `Mathlib` 阴影侧；完整证明由 Lean 内核检查。
:::

有理单位四元数群 $S^3(\mathbb{Q})$ 给出单射可以有真像的例子（手工推导）。取实值读数 $(1+\langle u,v\rangle)/2$，特征向量为 $(1,u)/\sqrt{2}$。$\mathbf{i},\mathbf{j}$ 见证非交换，$\pm1$ 见证触零。有理球极参数在实参数空间稠密，其像在实单位球面稠密。将实球面上一条连接两端的路径切成足够短的段，并用有理单位点逼近分点，就得到任意精度的有限链。这个可数群满足嵌入定理的全部假设。下面再要求读数完备性（`ReadingComplete`）。若 $\kappa(x_m,x_n)$ 在 $m,n$ 同趋无穷时趋于 $1$，须存在 $a\in M$ 使 $\kappa(x_n,a)\to 1$。在单位四元数像上，这是弦距 $d_\kappa=2\sqrt{1-\kappa}$ 的柯西完备性。

::: {.theorem #thm-ch03-rank-five-isomorphism title="读数完备的秩五三元比较结构同构于单位四元数（经典阴影锚点）" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv"}
在 [@thm-ch03-rank-five-embedding] 的全部假设之上，再设 $C$ 满足读数完备性（`ReadingComplete C`）。则对任意指定基点 $o \in M$，存在双射 $u : M \simeq \mathrm{Sp}(1)$，使得 $u(o) = 1$，且对一切 $x, y, z \in M$ 有

$$
u\bigl(\operatorname{tri}(x, y, z)\bigr) \;=\; u(x)\,u(y)^{-1}\,u(z), \qquad \kappa(x, y) \;=\; \frac{1 + \langle u(x), u(y)\rangle_{\mathbb{R}}}{2}.
$$
:::

::: {.proof}
取 [@thm-ch03-rank-five-embedding] 给出的单射并左乘 $u(o)^{-1}$ 使其满足 $u(o) = 1$；左乘单位四元数保内积且保三元迁移，于是像集 $H$ 构成 $\mathrm{Sp}(1)$ 的非交换链连通子群。由恒等式 $\kappa(a, b) = 1 - \frac{1}{4}\operatorname{dist}(a, b)^2$，任何在 $\mathrm{Sp}(1)$ 中收敛的 $H$ 中序列其原像的读数一致趋于 $1$，读数完备性立即保证极限点落在 $H$ 内，故 $H$ 在 $\mathrm{Sp}(1)$ 中闭。而 $\mathrm{Sp}(1)$ 中任何闭的、链连通的、非交换子群必等于整个 $\mathrm{Sp}(1)$，从而 $u$ 是双射。本声明位于经典 `Mathlib` 阴影侧；完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch03-shadow-boundary title="有理骨架与实阴影的精确分工（MODEL）"}
两条秩五定理都在实值比较结构上起步。完备性补上的是单射之像闭合这一步，在全部共同假设下由此得到满射。对这里的有号有理单位子群，其弦距完备化是实单位球面。规范整三元数用的是秩 $10$ 的平方读数，且会识别对径点。第四章的二次核桥给出二者在有理单位旋量上的读数关系。
:::

下面的影片从带不变型的李括号讲到有理旋量的实完备化。

::: {.film src="four-integers-one-turn"}
**带左非退化不变型的二维李代数括号为零。三维已有非交换的例子，四个整数便可表示有理旋转。** 左侧平面里，琥珀色的候选括号 $[x, y]$ 同时与青色的 $x$、$y$ 正交，只能缩为零（紫色，书面论证，示意图）；右侧立起的品红第三轴给出叉积，绿色标签对应 [@thm-ch03-dim3-cross-bracket]（经典 `Mathlib` 侧）。$p_{\mathrm{Half}} = (1, 1, 0, 0)$ 的模方为 $2$，用它共轭再除以 $2$ 得到精确的四分之一圈 $(x, y, z) \mapsto (x, -z, y)$；$(-2, 2, 2, 2)$ 经 $\gcd = 2$ 约分并翻号得到规范名 $(1, -1, -1, -1)$（屏幕计算）。四平方乘性、射线左消去、四维拉格朗日恒等式与 $\kappa \le 1$ 的绿色标签对应 [@thm-ch03-quaternion-norm-and-heap-laws] 与 [@thm-ch03-lagrange-and-kappa-invariance]，算例 $\lvert(1 + \mathbf{i})(1 + \mathbf{j})\rvert^2 = 4$、$\kappa(p_0, p_{\mathrm{Half}}) = 1/2$ 与六个子式平方和 $1 + 1 + 0 + 1 + 0 + 0 = 3$ 为屏幕计算。青色三角形上 $g_{120} = (1, 1, 1, 1)$ 三拍回到 $p_0$，保留符号的紫色六边形要走六拍（[@ex-ch03-five-anchors-and-closure]，屏幕计算）。两种次序的精确整数旋转矩阵与四元组 $(1, 1, 1, 1) \neq (1, 1, 1, -1)$ 并排对照，$k = l$ 与 $k = -l$ 迫使 $l = 0$，绿色标签对应 [@thm-ch03-phalf-qhalf-noncommutative]。最后，圆上的有理点示意有理单位四元数留下的缝隙（手工推导），在非交换、链连通、触零与秩五实现之外再要求读数完备性，便补成 $\mathrm{Sp}(1)$，绿色标签对应 [@thm-ch03-rank-five-isomorphism]（经典侧）；秩 $10$ 的平方读数与对径点粘合按 [@rem-ch03-shadow-boundary] 的诠释标注。

**旧版影片勘误。** 开场的低维结论针对带左非退化不变型的李代数。§3.4 的维数下界另有实值比较模型的假设。
:::

在合上第一卷之前，不妨在下方交互实验卡中亲手检验整三元数的规范化与非交换自锁：切换整四元组输入，观察 `gcd` 最大公约数约分与首非零正号锁定如何将每条射线归约为全宇宙唯一的规范整代表元（彻底免除 `Quot.sound`），并一步对比反序三元迁移 $[p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}] = (1, 1, 1, 1) \neq (1, 1, 1, -1) = [q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}]$ 在第四分量上的显式分裂（[@thm-ch03-phalf-qhalf-noncommutative]）与精确分数保真度读数。

::: {.viz src="ternion-cayley-lab" preset="canonical-ternion-noncomm" height="520"}
**规范整三元数约分与非对易三元迁移实时实验。** 在实验室中检验 `gcd` 约分与首非零正号规范化算子 `norm`，并直观对照 $[p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}] = (1, 1, 1, 1) \neq (1, 1, 1, -1) = [q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}]$ 的次序敏感分裂、$g_{120} = (1, 1, 1, 1)$ 的三拍射影闭合及精确射影保真度 $\kappa_{\mathrm{proj}}$；对应定理见 [@thm-ch03-quaternion-norm-and-heap-laws] 与 [@thm-ch03-lagrange-and-kappa-invariance]，手算见证见 [@ex-ch03-five-anchors-and-closure]。
:::

至此，第一卷的逻辑地基与齐次有理数系全部落成：我们拥有裸 CIC 地板、观察者精度契约 $\varepsilon_{\mathrm{self}} = 1/M$、AXIOM-Ω 的模型法则、零公理一维射影闭环 $\mathbb{QP}^1$ 与三维规范整三元数载体 $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$。进入第二卷[第四章](ch04-heaps-and-lie-triple-curvature.md)，我们将正式拆解无原点流群、李三元曲率与有号旋量双覆叠，把特征秩 $5$ 的双覆叠旋量同样铸造进纯整数零公理代数之中。
