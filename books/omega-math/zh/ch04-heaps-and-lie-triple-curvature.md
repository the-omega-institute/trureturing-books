# 第四章 无原点流群、利雅三元曲率与有号旋量双覆叠

> *“弯曲球面拒绝的从来不是严格代数，而是强行钉死外置原点与平行四边形加法的平直执念；一旦把二元加法让位于无原点三元迁移，把单向内积让位于双覆叠旋量核，曲率与自旋便不再是附加在坐标上的补丁，而是代数自身长出的骨架。”*

在第一卷（[第一章](ch01-axiom-omega-and-cic.md)至[第三章](ch03-canonical-ternion-manifold.md)）中，我们已经从纯归纳构造演算出发，用齐次射影对与规范整四元组搭起了零公理、无无穷、无超越数的数系与三维本原载体。然而，一旦试图在这座弯曲的三维载体上做代数运算，传统线性代数留下的两处旧习惯立刻显得格格不入：其一，向量加法 $\mathbf{a} + \mathbf{b}$ 暗中预设了唯一的特权原点 $\mathbf{0}$ 与平直切空间叠加，对单位球面上的任意两点相加，一步就会刺破球壳；其二，整四元数的射影读数把 $p$ 与 $-p$ 认成同一条射线，因而读不出有号旋量的 $720^\circ$ 周期。

本章正是在这两道分水岭上展开第二卷的非线性有理代数地基。我们将首先废除依赖原点的平直加法，建立无原点三元流群与定基群分解；接着从一阶换位子跨入二阶“关系之关系”——利雅三元系（亦称李三元系）括号，以仅依赖 `OmegaInit` 与 `OmegaMath` 的零公理内核定理锁死其反对称、雅可比—比安基、三元导子三条代数公理与恒常单位截面曲率 $K \equiv +1$，不经克里斯托费尔符号与局部坐标卡直接读出球面黎曼曲率；随后精确解剖射影射线特征秩 $10$ 与本原毕达哥拉斯旋量 `PythSpinor` 特征秩 $5$ 的代数分野，并用零公理内核定理锁死球极凯莱提升的毕达哥拉斯闭合、通用二次核桥与体对角旋子 `g120_spin` 的六拍 $720^\circ$ 双覆叠轨道见证，将双覆叠几何算到最后一颗整数；最后在霍普夫投影与双侧两点齐性的经典阴影内核定理上收束全章。

## 4.1 废除平直加法：无原点流群与定基群分解

在欧氏空间 $\mathbb{R}^n$ 里，人们习以为常地把 $\mathbf{a} + \mathbf{b}$ 视为最基本的运算。但仔细追问：若不先在空白空间里钉下一根绝对原点 $\mathbf{0}$，所谓“$\mathbf{a}$ 加 $\mathbf{b}$”根本没有几何意义——改变原点 $\mathbf{0} \mapsto \mathbf{0} + \mathbf{t}$，和向量 $\mathbf{a} + \mathbf{b}$ 便会漂移 $2\mathbf{t}$ 而不再落在原来的位置上。唯有形如 $\mathbf{a} - \mathbf{b} + \mathbf{c}$ 的三元仿射组合才在任意平移下保持不变：它先把从 $\mathbf{b}$ 指向 $\mathbf{a}$ 的相对位移取出来，再原封不动地搬运到 $\mathbf{c}$ 上。

进入弯曲的非交换三维球面后，平直减法与加法退场，取而代之的正是普吕弗（H. Prüfer，1924）、贝尔（R. Baer，1929）与瑟坦（J. Certaine，1943）确立的**无原点三元流群**（heap / torsor，亦称“堆”）。在无外部参照原点的载体上，最原生的代数操作不是二元乘法，而是三元比较迁移 $[\mathbf{a}, \mathbf{b}, \mathbf{c}]$：以局部中继态 $\mathbf{b}$ 为桥，将 $\mathbf{a}$ 相对于 $\mathbf{b}$ 的弯曲比较关系无损施加于 $\mathbf{c}$。

::: {.definition #def-ch04-origin-free-heap title="无原点三元流群与比较结构"}
设 $\mathcal{M}$ 为非空集合。称三元映射 $[-, -, -] : \mathcal{M}^3 \to \mathcal{M}$ 为 $\mathcal{M}$ 上的**流群（heap）运算**，若对一切 $x, y, z, u, v \in \mathcal{M}$ 满足左、右马尔采夫消去律与外结合律：

$$
[x, x, z] = z, \qquad [x, z, z] = x, \qquad \bigl[[x, y, z],\, u,\, v\bigr] = \bigl[x,\, y,\, [z, u, v]\bigr].
$$

若 $\mathcal{M}$ 同时配备对称映射 $\kappa : \mathcal{M}^2 \to \mathbb{R}$，满足外延分离 $\kappa(x, y) = 1 \iff x = y$、非负性 $\kappa(x, y) \ge 0$、双侧迁移不变性 $\kappa([x, u, v], [y, u, v]) = \kappa([u, v, x], [u, v, y]) = \kappa(x, y)$，以及对任意有限点列与实系数成立格拉姆半正定性 $\sum_{i,j} c_i c_j \kappa(x_i, x_j) \ge 0$，则称 $(\mathcal{M}, [-, -, -], \kappa)$ 为**三元比较结构**。
:::

这套三元语法彻底抹除了“谁是单位元 $\mathbf{1}$”的特权：载体上的每一点都彼此平权。唯有当某位观察者临时选定一点 $o \in \mathcal{M}$ 作为自己的观测切面时，三元流群才在其脚下诱导出一座标准的群结构 `groupAt o`，并且原始三元迁移与迭代流群点反射在这座定基群里各自还原为精确的乘逆公式与整数幂次。

::: {.theorem #thm-ch04-anchored-heap-and-reflection title="定基群分解与迭代流群反射幂次律" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow"}
设 $(\mathcal{M}, [-, -, -], \kappa)$ 为三元比较结构，任取基点 $o \in \mathcal{M}$。定义诱导二元积 $x \star_o z := [x, o, z]$ 与诱导逆元 $x^{-1_o} := [o, x, o]$，则 $(\mathcal{M}, \star_o, o)$ 构成以 $o$ 为单位元的群（记为 `groupAt o`），并且以下两条恒等式对一切元素无条件成立：

1. **定基群分解**（[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)）：对一切 $x, y, z \in \mathcal{M}$，原始三元迁移精确分解为

   $$
   [x, y, z] = x \star_o y^{-1_o} \star_o z.
   $$

2. **迭代流群反射等于定基幂次**（[`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow)）：对任意 $a, b \in \mathcal{M}$，定义递归序列 $x_0 := a$、$x_1 := b$、$x_{n+2} := [x_{n+1}, x_n, x_{n+1}]$（$n \in \mathbb{N}$），则在以起点 $a$ 为基点的群 `groupAt a` 中，对一切 $n \in \mathbb{N}$ 均有

   $$
   x_n = b^n.
   $$
:::

::: {.proof}
先核对 `groupAt o` 的群公理：单位元由 $[o, o, z] = z$ 与 $[x, o, o] = x$ 给出；结合律由外结合律 $[[x, o, y], o, z] = [x, o, [y, o, z]]$ 直接给出；右逆与左逆分别为

$$
x \star_o x^{-1_o} = \bigl[x, o, [o, x, o]\bigr] = \bigl[[x, o, o], x, o\bigr] = [x, x, o] = o,
$$

$$
x^{-1_o} \star_o x = \bigl[[o, x, o], o, x\bigr] = \bigl[o, x, [o, o, x]\bigr] = [o, x, x] = o.
$$

由此一步导出定基群分解：

$$
x \star_o y^{-1_o} \star_o z = \bigl[x, o, [[o, y, o], o, z]\bigr] = \bigl[x, o, [o, y, [o, o, z]]\bigr] = \bigl[x, o, [o, y, z]\bigr] = \bigl[[x, o, o], y, z\bigr] = [x, y, z].
$$

对第 2 款在 `groupAt a` 上按 $n$ 施数学归纳：$n = 0$ 时 $x_0 = a = b^0$，$n = 1$ 时 $x_1 = b = b^1$；设对 $n$ 与 $n + 1$ 成立，代入第 1 款即得

$$
x_{n+2} = [x_{n+1}, x_n, x_{n+1}] = b^{n+1} \star_a (b^n)^{-1_a} \star_a b^{n+1} = b^{n+2}.
$$

完整证明由 Lean 内核检查。
:::

审视 [@thm-ch04-anchored-heap-and-reflection] 第 2 款的几何威力：递推式 $x_{n+1} = [x_n, x_{n-1}, x_n]$ 通篇未曾动用任何坐标、角度、求导或外部原点，仅靠相邻两步的局部点反射就把单步比较关系等步长地延拓成整条离散测地轨道 $b^0, b^1, b^2, \dots$。在单位四元数模型上，当 $\mathbf{a}, \mathbf{b}, \mathbf{c}$ 取自 `ProjTernion` 或有理单位四元数时，$[\mathbf{a}, \mathbf{b}, \mathbf{c}] = \mathbf{a}\bar{\mathbf{b}}\mathbf{c}$ 完全由整数加减乘构成，且由四平方模方乘性 $\lVert\mathbf{a}\bar{\mathbf{b}}\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 \ge 1$ 永不退化为零元。值得注意的是，无原点平权绝不意味着交换性：取 $\mathbf{i} = (0, 1, 0, 0)$、$\mathbf{j} = (0, 0, 1, 0)$ 与 $\mathbf{1} = (1, 0, 0, 0)$，立见 $[\mathbf{i}, \mathbf{1}, \mathbf{j}] = +\mathbf{k} \neq -\mathbf{k} = [\mathbf{j}, \mathbf{1}, \mathbf{i}]$，非阿贝尔手性被完整封存在流群的次序里。

## 4.2 从一阶换位子到利雅三元系曲率括号

固定流群载体上的任意局部基点，考察其切方向构成的三维纯虚有理空间 $\operatorname{Im}\mathbb{H}(\mathbb{Q}) \cong \mathbb{Q}^3$。两个纯虚元 $\mathbf{u}, \mathbf{v} \in \mathbb{Q}^3$ 的四元数乘积把对称内积与反对称叉乘熔于一炉：

$$
\mathbf{u}\mathbf{v} = -\langle\mathbf{u}, \mathbf{v}\rangle\,\mathbf{1} + \mathbf{u} \times \mathbf{v}.
$$

这一式子说明纯虚空间对普通二元乘法并不封闭——标量实部 $-\langle\mathbf{u}, \mathbf{v}\rangle$ 会把乘积拉出切空间之外。然而，只需做一次反对称差，标量部便精确抵消，生出严格闭合于三维切空间内的**一阶换位子**（Lie bracket）：

$$
[\mathbf{u}, \mathbf{v}] := \mathbf{u}\mathbf{v} - \mathbf{v}\mathbf{u} = 2(\mathbf{u} \times \mathbf{v}) \in \mathbb{Q}^3.
$$

几何上，$[\mathbf{u}, \mathbf{v}]$ 同时垂直于 $\mathbf{u}$ 与 $\mathbf{v}$（$\langle[\mathbf{u}, \mathbf{v}], \mathbf{u}\rangle = \langle[\mathbf{u}, \mathbf{v}], \mathbf{v}\rangle = 0$），捕捉了两支不共线方向之间“交换次序所涌现的第三维正交面积关系”。但是，单凭一阶换位子只记录了无穷小环路闭合时的面积扭转方向，尚未把这一面积关系重新作用回第三支待输运向量 $\mathbf{w}$ 之上。

把一阶关系 $[\mathbf{u}, \mathbf{v}]$ 再与第三支切方向 $\mathbf{w}$ 做一次换位比较——即构造二阶的**“关系之关系”**——便直接诞生了嘉当（É. Cartan，1926）与雅各布森（N. Jacobson，1949）确立的**利雅三元系括号**（Lie triple system bracket，亦称李三元系括号）。

::: {.definition #def-ch04-lie-triple-bracket title="利雅三元系曲率括号"}
在装备标准内积 $\langle\cdot, \cdot\rangle$ 与叉乘 $\times$ 的三维有理切空间 $\mathbb{Q}^3$ 上，定义三元映射 $\{\cdot, \cdot, \cdot\} : (\mathbb{Q}^3)^3 \to \mathbb{Q}^3$ 为归一化的二重换位子：

$$
\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} := \frac{1}{4}\bigl[[\mathbf{u}, \mathbf{v}],\, \mathbf{w}\bigr] = (\mathbf{u} \times \mathbf{v}) \times \mathbf{w} = \langle\mathbf{u}, \mathbf{w}\rangle\,\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\,\mathbf{u}.
$$
:::

所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。纯虚切方向编码为整三维向量 `Vec3`（$\mathbb{Z}^3$），一阶换位子写为 `commutator u v` $= 2(\mathbf{u} \times \mathbf{v})$，而利雅三元括号定义为纯整系数三元映射 `lieTriple u v w` $:= \langle\mathbf{u}, \mathbf{w}\rangle\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\mathbf{u}$。无需任何连续微积分或实数公理，嘉当与雅各布森刻画利雅三元系的全部三条核心代数公理便在裸 CIC 内核中直接闭合。

::: {.theorem #thm-ch04-lie-triple-axioms title="利雅三元系曲率括号的三条代数公理" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_antisymm D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_jacobi D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_derivation"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。记整三维向量空间 `Vec3` 上的利雅三元括号为 $\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} := \operatorname{lieTriple}(\mathbf{u}, \mathbf{v}, \mathbf{w}) = \langle\mathbf{u}, \mathbf{w}\rangle\,\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\,\mathbf{u}$。则对一切 $\mathbf{x}, \mathbf{y}, \mathbf{u}, \mathbf{v}, \mathbf{w} : \mathrm{Vec3}$，以下三条精确等式无条件成立：

1. **前两元反对称律**（[`lieTriple_antisymm`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_antisymm)）：

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = -\{\mathbf{v}, \mathbf{u}, \mathbf{w}\}.
   $$

2. **轮换雅可比—比安基恒等式**（[`lieTriple_jacobi`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_jacobi)）：

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} + \{\mathbf{v}, \mathbf{w}, \mathbf{u}\} + \{\mathbf{w}, \mathbf{u}, \mathbf{v}\} = \mathbf{0}.
   $$

3. **三元导子律**（[`lieTriple_derivation`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_derivation)）：

   $$
   \bigl\{\mathbf{x}, \mathbf{y}, \{\mathbf{u}, \mathbf{v}, \mathbf{w}\}\bigr\}
   = \bigl\{\{\mathbf{x}, \mathbf{y}, \mathbf{u}\}, \mathbf{v}, \mathbf{w}\bigr\}
   + \bigl\{\mathbf{u}, \{\mathbf{x}, \mathbf{y}, \mathbf{v}\}, \mathbf{w}\bigr\}
   + \bigl\{\mathbf{u}, \mathbf{v}, \{\mathbf{x}, \mathbf{y}, \mathbf{w}\}\bigr\}.
   $$
:::

::: {.proof}
几何上看，固定 $(\mathbf{x}, \mathbf{y})$ 诱导的线性映射 $D_{\mathbf{x}, \mathbf{y}}(\mathbf{w}) := \{\mathbf{x}, \mathbf{y}, \mathbf{w}\}$ 关于标准内积严格反对称：$\langle D_{\mathbf{x}, \mathbf{y}}\mathbf{a}, \mathbf{b}\rangle = \langle\mathbf{x}, \mathbf{a}\rangle\langle\mathbf{y}, \mathbf{b}\rangle - \langle\mathbf{y}, \mathbf{a}\rangle\langle\mathbf{x}, \mathbf{b}\rangle = -\langle\mathbf{a}, D_{\mathbf{x}, \mathbf{y}}\mathbf{b}\rangle$，因此 $D_{\mathbf{x}, \mathbf{y}} \in \mathfrak{so}(3)$ 保持内积无穷小不变，从而自动成为由内积构造的三元括号的导子。在 `OmegaMath` 零公理内核中，三条等式均通过整系数多变量多项式正规化反射（`PolyVec` 与 `Expr.sound`）在三个分量上逐位归约为 `Eq.refl`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

这枚纯粹由整数加减乘写出的三元括号与单位三维球面的黎曼曲率张量字面重合（手工推导）：在 $S^3 \cong \mathrm{SU}(2)$ 上，左不变向量场的双不变列维—奇维塔联络满足 $\nabla_X Y = \frac{1}{2}[X, Y]$。取曲率约定 $R(X, Y)Z := \nabla_{[X, Y]}Z - [\nabla_X, \nabla_Y]Z$，展开并代入雅可比恒等式 $-[X, [Y, Z]] + [Y, [X, Z]] = -[[X, Y], Z]$，立得

$$
R(X, Y)Z = \frac{1}{2}\bigl[[X, Y], Z\bigr] - \frac{1}{4}\bigl[X, [Y, Z]\bigr] + \frac{1}{4}\bigl[Y, [X, Z]\bigr] = \frac{1}{4}\bigl[[X, Y], Z\bigr] = \{X, Y, Z\}.
$$

若改采微分几何中同样常见的反向曲率约定 $R_{\mathrm{alt}}(X, Y)Z := [\nabla_X, \nabla_Y]Z - \nabla_{[X, Y]}Z = -\{X, Y, Z\}$，则截面曲率分子需对调末两位，写为 $\langle R_{\mathrm{alt}}(X, Y)Y, X\rangle = -\langle\{X, Y, Y\}, X\rangle = \langle\{X, Y, X\}, Y\rangle$。为了把两种符号约定以及任意非退化有理切面上的恒常单位截面曲率 $K \equiv +1$ 一并焊死在无坐标、无克氏符号的零公理层面上，下面这条冻结定理在 `Vec3` 与 `RatVec3` 上同时锁定正向缩并、反序变号与有理截面曲率比。

::: {.theorem #thm-ch04-lie-triple-sectional-curvature title="利雅三元系恒常单位截面曲率与反序变号律" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_curvature_reversed D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对整三维向量 $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$，定义格拉姆面积平方 $\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}) := \langle\mathbf{u}, \mathbf{u}\rangle\langle\mathbf{v}, \mathbf{v}\rangle - \langle\mathbf{u}, \mathbf{v}\rangle^2 \in \mathbb{Z}$。对携带整分子 `u.num, v.num : Vec3` 与严格正分母 `u.den, v.den` 的有理三维向量 `u, v : RatVec3`，在 `Omega.IntRatio` 中以公共分母 $(u.\mathrm{den}\cdot v.\mathrm{den})^2$ 定义有理格拉姆面积平方 $\operatorname{rationalGramAreaSq}(\mathbf{u}, \mathbf{v})$ 与有理曲率分子 $\operatorname{rationalCurvatureNumerator}(\mathbf{u}, \mathbf{v}) := \langle\{\mathbf{u}.\mathrm{num}, \mathbf{v}.\mathrm{num}, \mathbf{u}.\mathrm{num}\}, \mathbf{v}.\mathrm{num}\rangle / (u.\mathrm{den}\cdot v.\mathrm{den})^2$。则以下三条精确关系无条件成立：

1. **正向单位截面曲率缩并**（[`lieTriple_unit_sectional_curvature`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature)）：对一切 $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$，

   $$
   \bigl\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\},\, \mathbf{v}\bigr\rangle = \operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}).
   $$

2. **末两位反序变号律**（[`lieTriple_sectional_curvature_reversed`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_curvature_reversed)）：对一切 $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$，

   $$
   \bigl\langle\{\mathbf{u}, \mathbf{v}, \mathbf{v}\},\, \mathbf{u}\bigr\rangle = -\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}).
   $$

3. **非退化有理切面恒常单位截面曲率**（[`lieTriple_sectional_ratio`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio)）：对任意满足非退化条件 $\operatorname{gramAreaSq}(u.\mathrm{num}, v.\mathrm{num}) \neq 0$ 的有理向量 `u, v : RatVec3`，在 `Omega.IntRatio.Equivalent` 下成立

   $$
   \operatorname{rationalCurvatureNumerator}(\mathbf{u}, \mathbf{v}) \cdot \bigl(\operatorname{rationalGramAreaSq}(\mathbf{u}, \mathbf{v})\bigr)^{-1} \;\equiv\; 1.
   $$
:::

::: {.proof}
按三元括号定义展开，立得 $\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\}, \mathbf{v}\rangle = \langle\langle\mathbf{u}, \mathbf{u}\rangle\mathbf{v} - \langle\mathbf{v}, \mathbf{u}\rangle\mathbf{u},\, \mathbf{v}\rangle = \langle\mathbf{u}, \mathbf{u}\rangle\langle\mathbf{v}, \mathbf{v}\rangle - \langle\mathbf{u}, \mathbf{v}\rangle^2 = \operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v})$；同理对调末两位后 $\langle\{\mathbf{u}, \mathbf{v}, \mathbf{v}\}, \mathbf{u}\rangle = \langle\mathbf{u}, \mathbf{v}\rangle^2 - \langle\mathbf{v}, \mathbf{v}\rangle\langle\mathbf{u}, \mathbf{u}\rangle = -\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v})$，两式在内核中均由多变量多项式正规化一步证毕。对第 3 款，由于曲率分子与格拉姆面积平方关于两输入皆为齐二次，两者共享公共严格正分母 $(u.\mathrm{den}\cdot v.\mathrm{den})^2$；代入第 1 款使 `rationalCurvatureNumerator u v` 的分子整数与 `rationalGramAreaSq u v` 相等，再由非退化前提 $\operatorname{gramAreaSq}(u.\mathrm{num}, v.\mathrm{num}) \neq 0$ 调用分数逆消去律 `IntRatio.mul_inv_cancel`，即在 `Omega.IntRatio.Equivalent` 下零公理证得比值恒等于 $1$。完整证明由 Lean 内核检查。
:::

几何直觉上，令 $\mathbf{w} = \mathbf{u}$ 所得向量 $\{\mathbf{u}, \mathbf{v}, \mathbf{u}\} = \lVert\mathbf{u}\rVert^2\mathbf{v} - \langle\mathbf{u}, \mathbf{v}\rangle\mathbf{u}$ 自动剔除 $\mathbf{v}$ 沿当前惯性方向 $\mathbf{u}$ 的共线分量，只留下垂直于 $\mathbf{u}$ 的横向测地偏折矢；下面以一组最简非正交整向量逐项手算核验 [@thm-ch04-lie-triple-axioms] 与 [@thm-ch04-lie-triple-sectional-curvature]。

::: {.example #ex-ch04-lie-triple-sectional-curvature title="利雅三元括号与常截面曲率 K = +1 的纯有理手算"}
取 $\mathbb{Q}^3$ 中两支非正交整向量 $\mathbf{u} = (1, 1, 0)$ 与 $\mathbf{v} = (1, 0, 2)$，以及第三支检验向量 $\mathbf{w} = (0, 1, 1)$：

1. **一阶换位子**：$\mathbf{u} \times \mathbf{v} = (2, -2, -1)$，故 $[\mathbf{u}, \mathbf{v}] = (4, -4, -2)$，核验 $\langle[\mathbf{u}, \mathbf{v}], \mathbf{u}\rangle = 4 - 4 = 0$ 且 $\langle[\mathbf{u}, \mathbf{v}], \mathbf{v}\rangle = 4 - 4 = 0$；
2. **二阶利雅三元括号**：由内积 $\langle\mathbf{u}, \mathbf{w}\rangle = 1$、$\langle\mathbf{v}, \mathbf{w}\rangle = 2$ 立得

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = 1\cdot(1, 0, 2) - 2\cdot(1, 1, 0) = (-1, -2, 2),
   $$

   直接按叉乘验算 $(\mathbf{u}\times\mathbf{v})\times\mathbf{w} = (2, -2, -1)\times(0, 1, 1) = (-1, -2, 2)$，逐分量全同；
3. **代数比安基归零**：算得 $\{\mathbf{v}, \mathbf{w}, \mathbf{u}\} = 1\cdot(0, 1, 1) - 1\cdot(1, 0, 2) = (-1, 1, -1)$ 与 $\{\mathbf{w}, \mathbf{u}, \mathbf{v}\} = 2\cdot(1, 1, 0) - 1\cdot(0, 1, 1) = (2, 1, -1)$，三项相加 $(-1-1+2, -2+1+1, 2-1-1) = (0, 0, 0)$；
4. **有理截面曲率**：$\{\mathbf{u}, \mathbf{v}, \mathbf{u}\} = 2(1, 0, 2) - 1(1, 1, 0) = (1, -1, 4)$，与 $\mathbf{v}$ 内积得 $1 + 0 + 8 = 9$；而面积平方 $\lVert\mathbf{u}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{u}, \mathbf{v}\rangle^2 = 2\cdot 5 - 1^2 = 9$，二者之比精确给出 $K(\mathbf{u}, \mathbf{v}) = \frac{9}{9} = 1$，全程未涉半个坐标导数或克氏符号。
:::

## 4.3 射影射线秩 10 与有号旋量 PythSpinor 秩 5 的精确分离

从切空间的局部曲率回到全局球面载体，两个读数的特征秩有精确的差别。规范整三元数的射影射线核具有秩 $10$，有号旋量核保留 $720^\circ$ 的符号记忆，具有秩 $5$。这里的秩指有限格拉姆矩阵所能达到的最大秩。秩 $5$ 对应 [§3.4](ch03-canonical-ternion-manifold.md#sec-ch03-real-shadow-completion) 所述实值模型类的锐利欧氏特征维数下界。

### 4.3.1 射影射线核与 10×10 格拉姆见证

对任意非零有理四元组 $p,q\in\mathbb{Q}^4\setminus\{\mathbf{0}\}$，在模去非零缩放与全局符号 $p \sim -p$ 后，纯有理射影保真度定义为

$$
\kappa_{\mathrm{proj}}(p, q) := \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \in \mathbb{Q} \cap [0, 1].
$$

为读出 $\kappa_{\mathrm{proj}}$ 的精确特征秩，为每条非零射线构造 $4 \times 4$ 秩一对称正交投影矩阵 $P(p) := \frac{p p^\top}{\lVert p\rVert^2} \in \operatorname{Sym}_4(\mathbb{Q})$。直接展开矩阵迹立得线性特征表示

$$
\kappa_{\mathrm{proj}}(p, q) = \operatorname{Tr}\bigl(P(p)\,P(q)\bigr).
$$

因为 $4 \times 4$ 有理对称矩阵空间 $\operatorname{Sym}_4(\mathbb{Q})$ 拥有 $4$ 个对角槽位与 $\binom{4}{2} = 6$ 个非对角槽位，其维数精确为 $4 + 6 = 10$；且迹内积 $\langle A, B\rangle_{\mathrm{HS}} = \operatorname{Tr}(AB)$ 严格正定（$\operatorname{Tr}(A^2) = \sum_{i,j} A_{ij}^2 > 0$ 对一切非零对称阵成立）。由此推出任意有限射线族的射影格拉姆矩阵 $G^{\mathrm{proj}}_{ij} = \kappa_{\mathrm{proj}}(p_i, p_j)$ 均满足 $\operatorname{rank}(G^{\mathrm{proj}}) \le 10$。

取四条坐标轴 $e_i$ 与六条对角射线 $e_i+e_j$（$i<j$）。在有理迹正交基 $\{E_{ii}\}\cup\{E_{ij}+E_{ji}:i<j\}$ 下，迹配对的矩阵为 $D=\operatorname{diag}(I_4,2I_6)$，且

$$
P(e_i)=E_{ii},\qquad P(e_i+e_j)=\tfrac12(E_{ii}+E_{jj}+E_{ij}+E_{ji}).
$$

十列投影坐标组成分块上三角阵 $M=\bigl(\begin{smallmatrix} I_4 & A \\ 0 & \frac12 I_6 \end{smallmatrix}\bigr)$。前四个顺序主子式为 $1$，随后每加一列，乘上 $2(\frac12)^2=\frac12$。因此

$$
\det G^{\mathrm{proj}}_{10}=\det(M^\top D M)=(2^{-6})^2\,2^6=\frac{1}{64}>0.
$$

在实数上，把六个非对角坐标乘以 $\sqrt2$ 就得到标准欧氏内积下的十维特征实现。

一旦再追加第十一条体对角射线 $p_{11} = (1, 1, 1, 1)$，因 $P(p_{11}) = \frac{1}{2}\sum_{1 \le i < j \le 4} P(e_i + e_j) - \frac{1}{2}\sum_{i=1}^4 P(e_i)$ 严格落入前十枚投影阵的线性张成之内，十一阶射影格拉姆行列式必然归零：$\det G^{\mathrm{proj}}_{11} = 0$。这就严格确立了射影射线核的特征秩恰为 $10$。

### 4.3.2 本原毕达哥拉斯旋量 PythSpinor、球极凯莱提升与秩 5 锁死

射影核的秩为 $10$，因为 $\kappa_{\mathrm{proj}}$ 是内积的二次式，把 $p$ 与 $-p$ 读成同一条射线。若要保留对径旋量的符号，可以改用 $S^3(\mathbb{Q})$ 上的有号读数。它的特征秩为 $5$，而有理单位旋量只双覆叠那些有有理单位提升的旋转。要用整数算这一层，可以把分子与正分母存成毕达哥拉斯旋量。

::: {.definition #def-ch04-pyth-spinor-and-bridge title="本原毕达哥拉斯旋量 PythSpinor、球极凯莱提升与二次核桥"}
1. **载体 `PythSpinor`**：定义为满足毕达哥拉斯模方方程与五元互素条件的有号整五元组

   $$
   (w, x, y, z;\, r) \in \mathbb{Z}^4 \times \mathbb{Z}_{>0}, \qquad w^2 + x^2 + y^2 + z^2 = r^2, \qquad \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert, r) = 1.
   $$

   它唯一代表有理单位三维球面上的有号点 $v = \frac{1}{r}(w, x, y, z) \in S^3(\mathbb{Q})$，严格区分 $(p;\, r)$ 与对径旋量 $(-p;\, r)$（半径 $r$ 恒正），并在四元数乘法、共轭求逆与三元流群 $[a, b, c] = a\bar{b}c$（积后同除五元正最大公约数）下封闭。
2. **有理球极—凯莱提升 $\Phi$**：对任意非零整四元组 $(a, b, c, d) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$，记 $s := b^2 + c^2 + d^2$，定义

   $$
   \Phi(a, b, c, d) := \operatorname{reduce}\bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad;\; a^2 + s\bigr) \in \mathrm{PythSpinor},
   $$

   其中 $\operatorname{reduce}$ 除以五元正最大公约数。
3. **有号旋量核与通用二次核桥**：对 $u_1 = (p_1;\, r_1)$、$u_2 = (p_2;\, r_2) \in \mathrm{PythSpinor}$，定义

   $$
   \kappa_{\mathrm{spin}}(u_1, u_2) := \frac{r_1 r_2 + \langle p_1, p_2\rangle}{2 r_1 r_2} \in \mathbb{Q} \cap [0, 1].
   $$
:::

恒等式 $(a^2 - s)^2 + 4a^2(b^2 + c^2 + d^2) = (a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$ 保证了 $\Phi(a, b, c, d)$ 的像点无一例外地落在 `PythSpinor` 中。反之，对任意不等于南极 $(-1, 0, 0, 0;\, 1)$ 的旋量 $(w, x, y, z;\, r)$（故 $r + w > 0$），取 $(a, b, c, d) = (r + w, x, y, z)$ 立得 $s = r^2 - w^2 = (r - w)(r + w)$，从而 $a^2 - s = 2w(r + w)$、$a^2 + s = 2r(r + w)$，约分后精确还原 $(w, x, y, z;\, r)$；而任意满足 $a = 0$ 的非零输入均映至南极 $(-1, 0, 0, 0;\, 1)$，因此 $\Phi$ 满射覆盖整座有理单位球面 $S^3(\mathbb{Q})$。

令 $v_i = p_i / r_i \in S^3(\mathbb{Q})$，有号旋量核立即可写成五维有理空间 $\mathbb{Q}^5$ 中的线性内积：

$$
\kappa_{\mathrm{spin}}(u_1, u_2) = \frac{1}{2}\bigl\langle (1, v_1),\, (1, v_2)\bigr\rangle_{\mathbb{Q}^5}.
$$

这一线性嵌入将一切有限 `PythSpinor` 格拉姆矩阵的秩普遍封顶于 **$5$**。更妙的是，因为 $p_i \cdot p_i = r_i^2$，线性变换 $2\kappa_{\mathrm{spin}}(u_1, u_2) - 1 = \frac{\langle p_1, p_2\rangle}{r_1 r_2}$ 的平方无需任何开方即精确连结射影层与旋量层，形成**通用二次核桥**：

$$
\kappa_{\mathrm{proj}}(p_1, p_2) = \frac{\langle p_1, p_2\rangle^2}{r_1^2 r_2^2} = \bigl(2\kappa_{\mathrm{spin}}(u_1, u_2) - 1\bigr)^2.
$$

这一简洁方程揭示了双覆叠几何的核心对照：当两枚旋量互为对径 $u_2 = -u_1$ 时，有号旋量核精确跌零 $\kappa_{\mathrm{spin}} = 0$，但经二次桥投影到射影层后 $(2\cdot 0 - 1)^2 = 1$，射影层当场将它们混同为一。

上述球极凯莱提升的模方闭合与通用二次核桥并不依赖任何实分析工具：在零公理基础库 `OmegaMath` 中，将 `PythSpinor` 形式化为携带严格正半径与毕达哥拉斯模方等式证书的有号整五元组 $(\mathbf{p};\, r)$（无需在底层结构中强加最大公约数互素约分），下面两条零公理冻结定理直接在裸 CIC 内核中将其锁死：

::: {.theorem #thm-ch04-pythspinor-lift-and-quadratic-bridge title="球极凯莱提升的毕达哥拉斯模方闭合与通用二次核桥" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lift_normSq D5/S3/Quantum/AURICOmega/OmegaTernionHeap.quadratic_kernel"}
在零公理库 `OmegaMath`（仅依赖 `OmegaInit` 与 `OmegaMath`，零公理）中，记有号毕达哥拉斯旋量 $p = (\mathbf{p};\, r_p) : \mathrm{PythSpinor}$ 由整四元数分子 $\mathbf{p} = p.\mathrm{num} : \mathrm{Quaternion}$、严格正自然数半径 $r_p = p.\mathrm{radius} \in \mathbb{N}_{>0}$ 与模方等式证书 $\lVert\mathbf{p}\rVert^2 = r_p^2$ 构成。对任意整数 $a, b, c, d \in \mathbb{Z}$，令 $s := b^2 + c^2 + d^2$，定义球极凯莱提升的未约分整四元数分子与自然数半径

$$
\operatorname{liftNum}(a, b, c, d) \;:=\; \bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad\bigr), \qquad \operatorname{liftRadius}(a, b, c, d) \;:=\; \lvert a\rvert^2 + \lvert b\rvert^2 + \lvert c\rvert^2 + \lvert d\rvert^2 \;\in\; \mathbb{N}.
$$

对任意 $p = (\mathbf{p};\, r_p)$ 与 $q = (\mathbf{q};\, r_q) : \mathrm{PythSpinor}$，在 `Omega.IntRatio` 中定义有号旋量核 $\kappa_{\mathrm{spin}}(p, q) := \operatorname{IntRatio.value}\bigl(r_p r_q + \langle\mathbf{p}, \mathbf{q}\rangle,\, 2 r_p r_q\bigr)$ 与射影射线核 $\kappa_{\mathrm{proj}}(p, q) := \kappa(\mathbf{p}, \mathbf{q}) = \operatorname{IntRatio.value}\bigl(\langle\mathbf{p}, \mathbf{q}\rangle^2,\, \lVert\mathbf{p}\rVert^2\lVert\mathbf{q}\rVert^2\bigr)$。则以下两条定理无条件成立：

1. **球极凯莱提升的毕达哥拉斯模方闭合**（[`lift_normSq`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lift_normSq)）：对一切 $a, b, c, d \in \mathbb{Z}$，在自然数中精确成立

   $$
   \bigl\lVert\operatorname{liftNum}(a, b, c, d)\bigr\rVert^2 \;=\; \bigl(\operatorname{liftRadius}(a, b, c, d)\bigr)^2.
   $$

2. **通用二次核桥**（[`quadratic_kernel`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.quadratic_kernel)）：对一切 $p, q : \mathrm{PythSpinor}$，在有号分数等价关系 `Omega.IntRatio.Equivalent` 下成立

   $$
   \kappa_{\mathrm{proj}}(p, q) \;\equiv\; \bigl(2\,\kappa_{\mathrm{spin}}(p, q) - 1\bigr)^2.
   $$
:::

::: {.proof}
第 1 款先合并三项虚部平方得 $(2ab)^2 + (2ac)^2 + (2ad)^2 = 4a^2(b^2 + c^2 + d^2) = 4a^2 s$，再以纯整数多项式展开证得 $(a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$；由于每个整数绝对值平方嵌回 $\mathbb{Z}$ 等于其自身平方，借助 `Int.ofNat` 单射性即得自然数等式 $\lVert\operatorname{liftNum}(a, b, c, d)\rVert^2 = (\operatorname{liftRadius}(a, b, c, d))^2$。第 2 款记 $r := r_p r_q > 0$ 与 $d := \langle\mathbf{p}, \mathbf{q}\rangle$：将 $\kappa_{\mathrm{spin}}(p, q) = (r + d)/(2r)$ 乘以 $2$ 再减去 $1 = 2r/(2r)$，在 `IntRatio.Equivalent` 下约去公因子 $2$ 得到 $2\kappa_{\mathrm{spin}}(p, q) - 1 \equiv d/r$；另一方面，代入毕达哥拉斯证书 $\lVert\mathbf{p}\rVert^2 = r_p^2$ 与 $\lVert\mathbf{q}\rVert^2 = r_q^2$ 知 $\lVert\mathbf{p}\rVert^2\lVert\mathbf{q}\rVert^2 = (r_p r_q)^2 = r^2$，故 $\kappa_{\mathrm{proj}}(p, q) = d^2/r^2 = (d/r)^2 \equiv (2\kappa_{\mathrm{spin}}(p, q) - 1)^2$。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

特别地，只要输入四元组 $(a, b, c, d)$ 非零，其自然数半径 $\operatorname{liftRadius}(a, b, c, d)$ 便严格大于 $0$，配合 [@thm-ch04-pythspinor-lift-and-quadratic-bridge] 第 1 款立刻保证球极凯莱提升 $\Phi(a, b, c, d)$ 精准落于有理三维单位球面 $S^3(\mathbb{Q})$ 之上；第 2 款则在不触碰任何实数公理的前提下，将秩 $5$ 有号旋量核与秩 $10$ 射影射线核永久桥接。

::: {.example #ex-ch04-rank10-rank5-and-720-orbit title="秩 5 旋量格拉姆见证（det = 1/32）与 $g_{120}$ 的六拍 720° 双覆叠轨道"}
我们以全整数分数核验 `PythSpinor` 的特征秩 $5$ 锁死与 $720^\circ$ 双覆叠周期：

1. **五枚提升旋量打满秩 $5$（$\det G^{\mathrm{spin}}_5 = \frac{1}{32}$）**：用 $\Phi$ 依次提升 $(1,0,0,0)$、$(1,1,0,0)$、$(1,0,1,0)$、$(1,0,0,1)$ 与 $(3,1,1,1)$，得到前四枚坐标单位旋量 $u_1 = (1,0,0,0;\,1)$、$u_2 = (0,1,0,0;\,1)$、$u_3 = (0,0,1,0;\,1)$、$u_4 = (0,0,0,1;\,1)$ 以及体对角旋量 $u_5 = \operatorname{reduce}(6,6,6,6;\,12) = (1,1,1,1;\,2)$。令 $V \in \mathbb{Q}^{5\times 5}$ 以 $(1, v_i)$ 为第 $i$ 行：

   $$
   V = \begin{pmatrix} 1 & 1 & 0 & 0 & 0 \\ 1 & 0 & 1 & 0 & 0 \\ 1 & 0 & 0 & 1 & 0 \\ 1 & 0 & 0 & 0 & 1 \\ 1 & \frac{1}{2} & \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \end{pmatrix}.
   $$

   从末行减去前四行之和的一半，末行化为 $(-1, 0, 0, 0, 0)$，按末行展开即得 $\det V = -1$。于是旋量格拉姆矩阵 $G^{\mathrm{spin}}_5 = \frac{1}{2} V V^\top$ 的行列式为

   $$
   \det G^{\mathrm{spin}}_5 = \frac{(\det V)^2}{2^5} = \frac{1}{32} > 0,
   $$

   其五个顺序主子式依次为 $1,\; \frac{3}{4},\; \frac{1}{2},\; \frac{5}{16},\; \frac{1}{32}$。若追加第六枚提升旋量 $u_6 = \Phi(1, 1, 1, 1) = (-1, 1, 1, 1;\, 2)$，直接核验 $(1, v_6) = \frac{1}{2}\bigl(-(1, v_1) + (1, v_2) + (1, v_3) + (1, v_4)\bigr)$，线性相关迫使 $\det G^{\mathrm{spin}}_6 = 0$。

   一般地，在 $\mathbb Q^5$ 上用特征 $(1,u)$ 和配对 $\tfrac12$ 倍的点积，或在 $\mathbb R^5$ 上用特征 $(1,u)/\sqrt2$ 和标准点积，均实现此读数。若五维标准有理点积也能实现读数，这五点的格拉姆行列式就会是某个有理行列式的平方，而 $1/32$ 在素数 $2$ 处的赋值为 $-5$，不可能是平方。

2. **体对角旋子 `g120_spin = (1, 1, 1, 1; 2)` 的六拍 $720^\circ$ 轨迹**：取单位元 $e = (1, 0, 0, 0;\, 1)$ 与体对角整旋子 $g = (1, 1, 1, 1;\, 2)$，逐拍作本原四元数乘法并按 $\kappa_{\mathrm{spin}}(e, g^n) = \frac{r_n + w_n}{2 r_n}$ 与二次桥 $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ 对账如下：

| 节拍 $n$ | 空间转角 | `PythSpinor` 幂次 $g^n$ | 有号旋量核 $\kappa_{\mathrm{spin}}(e, g^n)$ | 射影射线核 $\kappa_{\mathrm{proj}}(e, g^n)$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $120^\circ$ | $(1, 1, 1, 1;\, 2)$ | $\frac{3}{4}$ | $\frac{1}{4}$ |
| $2$ | $240^\circ$ | $(-1, 1, 1, 1;\, 2)$ | $\frac{1}{4}$ | $\frac{1}{4}$ |
| $3$ | $360^\circ$ | $(-1, 0, 0, 0;\, 1)$ | $0$ | $1$ |
| $4$ | $480^\circ$ | $(-1, -1, -1, -1;\, 2)$ | $\frac{1}{4}$ | $\frac{1}{4}$ |
| $5$ | $600^\circ$ | $(1, -1, -1, -1;\, 2)$ | $\frac{3}{4}$ | $\frac{1}{4}$ |
| $6$ | $720^\circ$ | $(1, 0, 0, 0;\, 1)$ | $1$ | $1$ |

在第 $3$ 拍（空间旋转满 $360^\circ$）处，射影层已读出 $\kappa_{\mathrm{proj}} = 1$ 而误以为回到起点，而 `PythSpinor` 精确落在对径负元 $(-1, 0, 0, 0;\, 1)$ 并读出 $\kappa_{\mathrm{spin}} = 0$；直至第 $6$ 拍（空间转满 $720^\circ$），旋量核按序列 $\frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ 走完完整双覆叠闭环，精准归位 $+1$。
:::

不仅如此，上表第 2 款中体对角旋子 `g120_spin = (1, 1, 1, 1; 2)` 的全部六拍有号齐次轨道，连同第 $3$ 拍的精确对径归零 $\kappa_{\mathrm{spin}}(e, g^3) \equiv 0$ 与第 $6$ 拍的完整闭合 $\kappa_{\mathrm{spin}}(e, g^6) \equiv 1$，已作为零公理见证定理 `PythSpinor.SixBeatOrbit` 直接冻结在 `OmegaInit` 与 `OmegaMath` 内核之中：

::: {.theorem #thm-ch04-g120-spin-six-beat-orbit title="体对角旋子六拍双覆叠轨道与对径归零见证" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.g120_spin_six_beat_orbit"}
在零公理库 `OmegaMath`（仅依赖 `OmegaInit` 与 `OmegaMath`，零公理）中，记 `PythSpinor` 上的有号齐次等价关系为 $p \sim_{\mathrm{spin}} q$（`PythSpinor.Equivalent`，即 $r_q\,\mathbf{p} = r_p\,\mathbf{q}$，因半径 $r_p, r_q > 0$ 而严格区分 $+p$ 与 $-p$）。取单位旋量 $e := (1, 0, 0, 0;\, 1)$、对径旋量 $-e := (-1, 0, 0, 0;\, 1)$ 与体对角旋子 $g := (1, 1, 1, 1;\, 2)$（`g120_spin`），按 $g^0 := e$、$g^{n+1} := g^n \cdot g$ 递归定义乘幂 `g120_spin.pow n`。则六拍双覆叠轨道谓词 `PythSpinor.SixBeatOrbit` 全部八项合取同时成立：

1. 六拍有号齐次旋量轨道精确落于

   $$
   \begin{aligned}
   g^1 &\sim_{\mathrm{spin}} (1, 1, 1, 1;\, 2), & g^2 &\sim_{\mathrm{spin}} (-1, 1, 1, 1;\, 2), & g^3 &\sim_{\mathrm{spin}} (-1, 0, 0, 0;\, 1), \\
   g^4 &\sim_{\mathrm{spin}} (-1, -1, -1, -1;\, 2), & g^5 &\sim_{\mathrm{spin}} (1, -1, -1, -1;\, 2), & g^6 &\sim_{\mathrm{spin}} (1, 0, 0, 0;\, 1);
   \end{aligned}
   $$

2. 第 $3$ 拍（$360^\circ$ 对径）与第 $6$ 拍（$720^\circ$ 闭合）的有号旋量核在 `Omega.IntRatio.Equivalent` 下满足

   $$
   \kappa_{\mathrm{spin}}(e, g^3) \;\equiv\; 0, \qquad \kappa_{\mathrm{spin}}(e, g^6) \;\equiv\; 1.
   $$
:::

::: {.proof}
按未约分的 `PythSpinor.mul` 依次乘出六拍代表元：第 $1$ 至第 $6$ 拍分别为 $(1, 1, 1, 1;\, 2)$、$(-2, 2, 2, 2;\, 4)$、$(-8, 0, 0, 0;\, 8)$、$(-8, -8, -8, -8;\, 16)$、$(16, -16, -16, -16;\, 32)$ 与 $(64, 0, 0, 0;\, 64)$。交叉乘以各自正半径后，六项 `PythSpinor.Equivalent` 等式均在定义上直接化归为 `Eq.refl`。再代入有号旋量核定义式 $\kappa_{\mathrm{spin}}(e, p) = \operatorname{IntRatio.value}(r_p + w_p,\, 2 r_p)$：第 $3$ 拍给出 $\frac{8 + (-8)}{16} = \frac{0}{16} \equiv 0$，第 $6$ 拍给出 $\frac{64 + 64}{128} = \frac{128}{128} \equiv 1$，均因分母严格为正而在 `Omega.IntRatio.Equivalent` 中零公理证毕。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

下图将 `PythSpinor` 的特征秩 $5$ 线性嵌入与特征秩 $10$ 的射影射线核并置对照，并把体对角旋子 `g120_spin = (1, 1, 1, 1; 2)` 的六拍 $720^\circ$ 双覆叠闭环完整绘出。

::: {.figure src="ch04-pythspinor-720-orbit"}
**有号毕达哥拉斯旋量 `PythSpinor`（秩 $5$）对比射影射线商（秩 $10$）与六拍 $720^\circ$ 双覆叠轨道。** 图中展示 `g120_spin = (1, 1, 1, 1; 2)` 沿六拍依次走过 $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ 并在第 $3$ 拍（$360^\circ$）抵达对径负元 $(-1, 0, 0, 0;\, 1)$，而二次核桥 $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ 在第 $3$ 拍便提前折叠回 $1$；定理见 [@thm-ch04-pythspinor-lift-and-quadratic-bridge]，手算轨迹见 [@ex-ch04-rank10-rank5-and-720-orbit]。
:::

## 4.4 旋量射线核、霍普夫投影与双侧两点齐性

当有理载体 `PythSpinor` 经单向嵌入投入连续单位四元数群 $\mathrm{Sp}(1) = \{q \in \mathbb{H} : \lVert q\rVert = 1\}$ 时，上面构造的代数结构与量子力学的复二维旋量、布洛赫球面霍普夫纤维以及整个三维球面的等距对称群严丝合缝地咬合在一起。以下冻结定理把三条核心纽带钉死在内核层面上。

::: {.theorem #thm-ch04-ray-kernel-hopf-and-homogeneity title="旋量射线核的玻恩权重与霍普夫等同，及双侧平移两点齐性" lean="D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq"}
在单位四元数群 $\mathrm{Sp}(1) \subset \mathbb{H}$ 上取标准实内积 $\langle -, -\rangle$ 与旋量比较读数 $\kappa(x, y) := \frac{1 + \langle x, y\rangle}{2}$。定义霍普夫像 $h(x) := x\,\mathbf{i}\,\bar{x}$、两项射线核

$$
R(x, y) := \bigl(2\kappa(x, y) - 1\bigr)^2 + \bigl(2\kappa(x, y\,\mathbf{i}) - 1\bigr)^2,
$$

以及实线性等距双射 $s : \mathbb{H} \to \mathbb{C}^2$，$s(q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}) := (q_0 + q_1\hat{\mathbf{i}},\; -q_2 + q_3\hat{\mathbf{i}})$（$\hat{\mathbf{i}}$ 为复虚单位），记 $P_v := v v^*$ 为复二维秩一投影矩阵。则对一切 $x, y, x', y' \in \mathrm{Sp}(1)$：

1. **旋量玻恩权重等同**（[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)）：对任意 $q \in \mathbb{H}$ 有 $s(q\,\mathbf{i}) = \hat{\mathbf{i}}\,s(q)$，秩一投影 $P_{s(x)}$ 的布洛赫向量等于 $\bigl(h(x)_{\mathbf{k}},\, h(x)_{\mathbf{j}},\, h(x)_{\mathbf{i}}\bigr)$，射线核等于复旋量内积模平方 $R(x, y) = \lvert\langle s(x), s(y)\rangle_{\mathbb{C}}\rvert^2$，并在复数嵌入下等于玻恩配对权重 $\operatorname{Tr}(P_{s(y)} P_{s(x)})$；
2. **霍普夫球面内积等同**（[`rayKernel_eq_hopf`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf)）：

   $$
   R(x, y) = \frac{1 + \langle h(x), h(y)\rangle}{2};
   $$

3. **双侧平移两点齐性**（[`exists_mul_mul_eq_of_kappa_eq`](lean:D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq)）：若 $\kappa(x, y) = \kappa(x', y')$，则存在单位四元数 $p, q \in \mathrm{Sp}(1)$ 使得双侧平移 $z \mapsto p z q$ 同时把 $x$ 映至 $x'$、把 $y$ 映至 $y'$：

   $$
   p x q = x', \qquad p y q = y'.
   $$
:::

::: {.proof}
第 1、2 款的核心恒等式均为逐分量四次多项式展开：由 $2\kappa(x, y) - 1 = \langle x, y\rangle$ 知 $R(x, y) = \langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2$；展开四元数坐标验证 $s(q\mathbf{i}) = \hat{\mathbf{i}}\,s(q)$ 以及 $\lvert\langle s(x), s(y)\rangle_{\mathbb{C}}\rvert^2 = \langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2 = \operatorname{Tr}(P_{s(y)} P_{s(x)})$，同时验证齐次四元数恒等式 $\langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2 = \frac{1}{2}(\lVert x\rVert^2\lVert y\rVert^2 + \langle x\mathbf{i}\bar{x}, y\mathbf{i}\bar{y}\rangle)$，代入单位范数即得霍普夫形式。第 3 款记 $u := \bar{x}y$ 与 $u' := \bar{x}'y'$。由 $\kappa(x, y) = \kappa(x', y')$ 知 $\operatorname{Re}(u) = \langle x, y\rangle = \langle x', y'\rangle = \operatorname{Re}(u')$，故纯虚部满足 $\lVert\operatorname{Im}(u)\rVert = \lVert\operatorname{Im}(u')\rVert$。三维球面上的伴随旋转传递作用给出单位四元数 $c \in \mathrm{Sp}(1)$ 使 $c u \bar{c} = u'$；取 $p := x' c \bar{x}$ 与 $q := \bar{c}$，直接乘开即得 $p x q = x' c \bar{c} = x'$ 与 $p y q = x' c u \bar{c} = x' u' = y'$。完整证明由 Lean 内核检查。
:::

读者可以在下方交互实验卡中亲手拨动球极—凯莱提升 $\Phi(a, b, c, d)$ 的整数输入并逐拍推进 `g120_spin = (1, 1, 1, 1; 2)` 的六拍 $720^\circ$ 双覆叠轨道（[@thm-ch04-g120-spin-six-beat-orbit]）：实时核验每枚提升旋量均严丝合缝地满足毕达哥拉斯模方方程 $w^2 + x^2 + y^2 + z^2 = r^2$，并在第 $3$ 拍（空间旋转满 $360^\circ$）直观看到有号旋量核跌至 $\kappa_{\mathrm{spin}} = 0$ 而二次核桥 $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ 已折回 $1$，直至第 $6$ 拍（$720^\circ$）才真正闭环回归 $+1$。

::: {.viz src="ternion-cayley-lab" preset="pythspinor-720-double-cover" height="520"}
**有理球极—凯莱提升 $\Phi(a, b, c, d)$ 与 `g120_spin = (1, 1, 1, 1; 2)` 的六拍 $720^\circ$ 双覆叠实验。** 实时调节整数输入 $(a, b, c, d)$ 观察提升像落于有理三维球面 $S^3(\mathbb{Q})$，并逐拍推进 `g120_spin` 追踪有号旋量核序列 $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ 与射影二次桥 $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ 的分合；证明见 [@thm-ch04-pythspinor-lift-and-quadratic-bridge]，轨道算表见 [@ex-ch04-rank10-rank5-and-720-orbit]。
:::

::: {.remark #rem-ch04-double-cover-summary title="三层核函数对照与向第五章的过渡"}
有号核 $\kappa_{\mathrm{spin}}=(1+\langle v_1,v_2\rangle)/2$ 区分 $+v$ 与 $-v$，在有理单位旋量上特征秩为 $5$。平方核通过 $\kappa_{\mathrm{proj}}=(2\kappa_{\mathrm{spin}}-1)^2$ 识别两枚旋量的射线，并延伸到全部有理射影旋转，特征秩为 $10$。本节的霍普夫投影和双侧两点齐性使用实单位四元数。在这一实载体上，对相位圆的两项平方求和便得到 $S^2$ 上的霍普夫—玻恩射线核。第五章回到有理坐标，分别构造普通凯莱图和有理单位旋量的双卡乘法。见[第五章](ch05-rational-cayley-rotations.md)。
:::

最后，下面这部短片沿本章的路线重走一遍：从没有原点的三元迁移出发，经过利雅三元曲率与秩 $10$、秩 $5$ 的分离，走到 $720^\circ$ 双覆叠与霍普夫投影。

::: {.film src="addition-without-an-origin"}
**平直加法离不开原点，三元括号 $[a, b, c] = a\bar{b}c$ 却不需要：它的反射之路走出六拍 $720^\circ$ 轨道（2 分 45 秒）。** 平面格点上，从跳动的琥珀色原点 $O$ 量出的品红点 $a + b$ 随之移动，青色点 $a - b + c = (1, 4)$ 纹丝不动；$\lvert i + j\rvert^2 = 2$ 刺破单位圆，$[1 + i, 1 + j, k] = (1, -1, -1, 1)$ 的模方为 $4 = 2 \cdot 2 \cdot 1$，$[i, 1, j] = k$ 而 $[j, 1, i] = -k$（屏幕计算）；绿色标签对应 [@thm-ch04-anchored-heap-and-reflection] 的定基群分解。取 $\mathbf{u} = (1, 1, 0)$、$\mathbf{v} = (1, 0, 2)$、$\mathbf{w} = (0, 1, 1)$，品红的 $\frac{1}{2}[\mathbf{u}, \mathbf{v}]$ 垂直于两者，琥珀色的 $\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = (-1, -2, 2)$，轮换和为零，$\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\}, \mathbf{v}\rangle = 9$ 等于面积平方（[@ex-ch04-lie-triple-sectional-curvature]）；绿色标签对应 [@thm-ch04-lie-triple-axioms] 的比安基恒等式与 [@thm-ch04-lie-triple-sectional-curvature] 的 $K \equiv 1$。青色方阵给出 $\det G^{\mathrm{proj}}_{10} = \frac{1}{64}$，品红方阵给出 $\det G^{\mathrm{spin}}_5 = \frac{1}{32}$，琥珀色的第十一条射线与第六枚旋量使行列式归零（屏幕计算）；绿色标签对应 [@thm-ch04-pythspinor-lift-and-quadratic-bridge] 的二次核桥。大圆上的反射之路 $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ 从 $e$ 经 $g = (1, 1, 1, 1;\, 2)$ 走出 $g^0$ 至 $g^6$，品红的 $x_3 = (-1, 0, 0, 0;\, 1)$ 是对径点；立方体每拍绕体对角线转 $120^\circ$，品红柱 $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ 与青色柱 $\kappa_{\mathrm{proj}} = \frac{1}{4}, \frac{1}{4}, 1, \frac{1}{4}, \frac{1}{4}, 1$ 并排（[@ex-ch04-rank10-rank5-and-720-orbit]）；绿色标签对应 [@thm-ch04-anchored-heap-and-reflection] 的反射幂次律与 [@thm-ch04-g120-spin-six-beat-orbit]。最后在实单位四元数上，$e$ 与 $g$ 的射线核按两种算法都是 $\frac{1}{2}$，霍普夫像 $i$ 与琥珀色的 $j$ 互相垂直，$p = i$、$q = -i$ 把 $(e, g)$ 搬到 $(e, \frac{1}{2}(1, 1, -1, -1))$（屏幕计算）；绿色标签对应 [@thm-ch04-ray-kernel-hopf-and-homogeneity]，“没有哪个点是特殊的”是对齐性的诠释（紫色）。
:::
