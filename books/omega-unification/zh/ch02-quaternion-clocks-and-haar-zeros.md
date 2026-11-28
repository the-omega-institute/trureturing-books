# 第二章 四元数双时钟、非交换逆谱与零点哈尔积分 {#sec-ou-ch02}

[第一章](ch01-behrend-shell-and-frequencies.md)把十九点贝伦德球壳的静态算术底盘交代清楚了：$19$ 个整点、$135$ 条原边、$529$ 个三角面、$22$ 个有理独立频率。但只要时钟相位还停留在普通复数单位圆 $e^{i\theta} \in \mathrm{U}(1)$ 上，所有相位因子就都是彼此交换的——先走边 $A$ 再走边 $B$，与先走边 $B$ 再走边 $A$ 毫无差别。然而弱相互作用 $\mathrm{SU}(2)_L$、色相互作用 $\mathrm{SU}(3)_C$ 与三维空间自旋的命门恰恰在于**次序不可互换**。

于是本章把问题猛推进一步：当我们把球壳上两类时钟边（$d^2 = 724$ 与 $d^2 = 804$）承载的相位从交换复数提升为**一对单位四元数双时钟 $(U, V) \in \mathrm{Sp}(1)^2$** 时，三个根本问题同时摆到台面：

1. **谱能听出非交换性吗？** 如果只把一台双分量量子球壳算子的全部本征值（含重数）摆在你面前，不告诉你内部的四元数轴向，你能唯一还原出 $(U, V)$ 吗？用有限个实数读数就能做到全局单射吗？
2. **零点能替我们做规范群积分吗？** 不用任何伪随机数发生器，单凭黎曼正零点纵坐标 $\gamma$ 驱动第一章证明的 $22$ 个球壳独立频率，能否在某个精确最优密度的零点子序列上，以无权算术平均精确复现整个标准模型规范群 $\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$ 的哈尔积分？
3. **几何积分器能否替代物理动力学？** 当我们把同一套零点采样推进到带相互作用的二维面积律与有限威尔逊圈检验时，什么地方会撞上指数级密度坍缩，又在哪个确切数字上与 $1\,\mathrm{TeV}$ 物理现实迎面相撞？

## 2.1 四元数双时钟、巴格曼—格拉姆凸体与自由群刚性 {#sec-ou-2-1}

两枚单位四元数 $U, V \in \mathrm{Sp}(1) \cong \mathrm{SU}(2)$ 表面上各有三个实自由度，合计六维；但物理谱只依赖它们在**同时共轭** $(U, V) \mapsto (g U g^{-1}, g V g^{-1})$ 下的等价类，而 $\mathrm{SO}(3)$ 共轭恰好吃掉三个角向自由度，留下整整三个不变量——三个实半迹。我们把这套几何结构与零点挑选规则一并定格为本章核心定义。

::: {.definition #def-ou-ch02-dual-clocks title="四元数双时钟、交换子亏量与四阶原弧零点挑选规则"}
设 $U = x + \mathbf{u}$、$V = y + \mathbf{v}$ 为两枚单位四元数（$x, y \in [-1, 1]$ 为标量部，$\mathbf{u}, \mathbf{v} \in \mathbb{R}^3$ 为纯虚部，满足 $x^2 + |\mathbf{u}|^2 = y^2 + |\mathbf{v}|^2 = 1$）。定义三项同时共轭不变半迹与**交换子亏量** $E$：

$$
x := \operatorname{Re} U, \qquad y := \operatorname{Re} V, \qquad z := \operatorname{Re}(UV^{-1}) = xy + \mathbf{u}\cdot\mathbf{v},
$$

$$
E := 1 + 2xyz - x^2 - y^2 - z^2 = |\mathbf{u}\times\mathbf{v}|^2 \ge 0.
$$

在标准二维复表示中，三者分别等于矩阵半迹，且群交换子实部与线性交换子模方精确满足

$$
\operatorname{Re}(UVU^{-1}V^{-1}) = 1 - 2E, \qquad |UV - VU|^2 = 4E.
$$

可行域 $\{ (x, y, z) \in [-1, 1]^3 : |z - xy| \le \sqrt{(1 - x^2)(1 - y^2)} \}$ 是三维紧凸体（欧氏体积 $\pi^2 / 2$），其边界恰为交换子流形 $E = 0$。

进一步，在[第一章](ch01-behrend-shell-and-frequencies.md)的十九点贝伦德球壳（[@def-ou-ch01-behrend-shell]）上，对正黎曼零点纵坐标 $\gamma > 0$，保留原双钟角 $p := (\theta_{724} - \theta_{244})\gamma$、$q := (\theta_{804} - \theta_{244})\gamma$，以**最短原弧** $d^2 = 12$ 引入第三个相对轴转角 $v := \theta_{12}\gamma$，构造单位四元数对

$$
U(\gamma) := \cos p + \mathbf{i}\sin p, \qquad V(\gamma) := \cos q + (\mathbf{i}\cos v + \mathbf{j}\sin v)\sin q;
$$

再以原边 $d^2 = 200$ 给出第四个挑选角的小数部分 $u := \{\theta_{200}\gamma / (2\pi)\} \in [0, 1)$，定义无拟合参数的**哈尔零点挑选规则**：保留全部满足

$$
u < \sin^2 p\,\sin^2 q\,|\sin v|
$$

的实际正黎曼零点。
:::

最短原弧给出了轴角 $v$。若要移动两只原始钟的标量相位，改动多短的边就够了？固定单位荷的背景边输运，允许所有顶点重定相，并令 $D$ 为可改边的平方弦长上限。闭路上的相位乘积消去了顶点相位。$D<372$ 时两钟都不能移动（最短弦的平方长为 $12$），$372\le D<724$ 时恰可让两钟同移任意角，$D\ge724$ 时可让两钟独立移动。按同一单位荷比较[第七章](ch07-chiral-three-generations.md)选取的两枚正零点，两个钟移不同，故所需的最小上限恰为 $724$，在这一上限下最少须改动 $42$ 条无向壳边。[闭路与最少改边数](https://github.com/the-omega-institute/trureturing-experiments/blob/78d69c0ea72a7e4e1b8b63562031d5bf35e5e655/experiments/ch39-omega-research/replay/%E5%8D%81%E4%B9%9D%E7%82%B9%E5%A3%B3%E4%B8%A4%E9%92%9F%E8%81%94%E7%BB%9C%E7%9A%84%E5%B1%80%E9%83%A8%E5%BC%A6%E9%95%BF%E9%98%88%E5%80%BC.md)

细看交换子亏量 $E = 1 + 2xyz - x^2 - y^2 - z^2$：它并不是临时拼出的多项式，而是三个比较锚点 $(1, U, V)$ 所张成的 $3 \times 3$ 巴格曼—格拉姆行列式！只要把两对纯虚轴拉离共线，$E > 0$ 就化作三维球面 $S^3$ 上不可消去的非交换面积平方与恒常单位截面曲率 $K \equiv +1$。下面这条 Lean 4 冻结定理在纯整数与有理分数层面上把这两条几何铁律一起钉死：

::: {.theorem #thm-ou-ch02-bargmann-gram title="三锚巴格曼—格拉姆行列式非负性与利雅三元恒常单位截面曲率" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature"}
1. **三锚格拉姆行列式非负性**（[`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg)）：设 $a, b, c \in \mathrm{Quad4}$ 为任意三枚非零整四元数（$a \neq 0, b \neq 0, c \neq 0$）。在有号分数类型 `Omega.IntRatio` 及其序关系 `IntRatio.Le` 下，归一化 $3 \times 3$ 巴格曼—格拉姆闭合行列式普遍非负：

   $$
   0 \;\le\; \det\mathbf{G}_3(a, b, c) \;=\; 1 + 2B(a, b, c) - \bigl(\kappa(a, b) + \kappa(b, c) + \kappa(c, a)\bigr).
   $$

2. **利雅三元恒常单位截面曲率**（[`lieTriple_unit_sectional_curvature`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature)）：对任意整三维向量 $u, v : \mathrm{Vec3}$，定义利雅三元括号 $\{u, v, w\} := \langle u, w\rangle v - \langle v, w\rangle u$ 与格拉姆面积平方 $\operatorname{gramAreaSq}(u, v) := \langle u, u\rangle\langle v, v\rangle - \langle u, v\rangle^2$。则精确成立

   $$
   \bigl\langle \{u, v, u\},\, v \bigr\rangle \;=\; \operatorname{gramAreaSq}(u, v).
   $$

:::

::: proof
第一款在 $a$ 的正交补方向构造两条整向量 $w := \|a\|^2 b - \langle a, b\rangle a$ 与 $v := \|a\|^2 c - \langle a, c\rangle a$。展开 $\|w\|^2 \|v\|^2 - \langle w, v\rangle^2$ 时，四次交叉项精确抵消，余下 $\|a\|^6 \det G_{\mathrm{raw}}(a, b, c) = \frac{1}{2}\sum_{i,j=1}^4 (w_i v_j - w_j v_i)^2 \ge 0$；因 $a, b, c$ 非零，平方范数与公有分母严格为正，遂得有理序下的非负性。第二款按定义直接展开得 $\langle \langle u, u\rangle v - \langle v, u\rangle u,\, v\rangle = \langle u, u\rangle\langle v, v\rangle - \langle u, v\rangle^2 = \operatorname{gramAreaSq}(u, v)$。完整证明由 Lean 内核检查。
:::

除了两只连续角度时钟之外，纯整数四元数本身也能生成彻底摆脱交换坍缩的稠密非交换旋转群。取六枚模方为 $5$ 的赫维茨（Hurwitz）整四元数生成元 $(1, \pm 2, 0, 0)$、$(1, 0, \pm 2, 0)$、$(1, 0, 0, \pm 2)$；它们在三维有理空间上的伴随旋转 $\operatorname{Ad}(p)(v) = p v \bar{p} / \|p\|^2 \in \mathrm{SO}(3, \mathbb{Q})$ 之间没有任何隐藏代数关系——哪怕仅仅检验两串既约词在 $x, y$ 两条坐标轴上的像，就足以迫使两串词逐字母完全一致：

::: {.theorem #thm-ou-ch02-free-group-f3 title="模方 5 赫维茨既约词的伴随单射定理" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective"}
设 $u, v : \mathrm{Word}$ 为由六枚模方 $5$ 赫维茨生成元组成的两条既约词（满足 `IsReduced u` 与 `IsReduced v`，即相邻字母互不为共轭逆元），记 $\operatorname{evalQuat}(w)$ 为整四元数连乘求值，$\operatorname{Ad}$ 为有理伴随旋转，$\mathrm{axisX} := (1, 0, 0)$、$\mathrm{axisY} := (0, 1, 0)$。若在有理向量等价关系 `RatVec3.Equiv` 下同时成立

$$
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisX}) \equiv \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisX}), \qquad \operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisY}) \equiv \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisY}),
$$

则两条既约词字面完全相等：$u = v$。
:::

::: proof
记 $p := \operatorname{evalQuat}(u)$、$q := \operatorname{evalQuat}(v)$，由生成元模方为 $5$ 知 $\|p\|^2 = 5^{|u|} > 0$ 与 $\|q\|^2 = 5^{|v|} > 0$。交叉去分母并左右乘 $\bar{p}, q$，得出 $\bar{p}q$ 同时与纯虚基元 $\mathbf{i}, \mathbf{j}$ 交换，从而 $\bar{p}q$ 必为整标量四元数。对词 $u$ 施归纳，剥去长度为 $k$ 的公共前缀会同步从 $\bar{p}q$ 中消去标量因子 $5^k$；若两词仍不相等，则把前词余部反序取逆再拼接后词余部所得的非空既约词其求值为约去 $5^k$ 后的整标量 $\bar{p}q / 5^k$；然而模 $5$ 秩一外积分裂给出任意既约词的四坐标绝不同时被 $5$ 整除，与该标量平方等于 $5^L$（$L \ge 1$）矛盾。因此 $u = v$。完整证明由 Lean 内核检查。
:::

回到球壳上的具体几何轴选择（`CERT / ARGUED`，见[四元数双时钟专题](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E5%9B%9B%E5%85%83%E6%95%B0%E5%8F%8C%E6%97%B6%E9%92%9F%E4%B8%8E%E6%9E%81%E5%B0%8F%E5%9C%86%E5%BC%A7.md)）：若不引入第三钟 $v$，而是直接以外点 $P = (1, 5, 29)$ 出发的两条时钟边叉积法向 $n_1 \parallel P \times (13, 23, 13)$ 与 $n_2 \parallel P \times (23, 13, 13)$ 作为 $U, V$ 的固定转轴，两轴内积为 $c = \sqrt{8741547 / 12563572}$。在第 $35$ 枚正零点（$\gamma_{35} \approx 111.87466$）处，这立刻给出 $E = (1 - c^2)\sin^2 p_1 \sin^2 p_2 \approx 0.17056379$、交换子半迹 $1 - 2E \approx 0.65887242$，以及五个比较锚点 $1, U, U^{-1}, V, UV$ 恰好达到特征秩 $5$（五阶格拉姆行列式 $(1 - x)^2 E^2 / 8 \approx 0.00844423$）。更关键的一点概念辨析则关系到“开弧操作”：如果最短弧 $d^2 = 12$（自旋提升 $T$，满足 $\sin(\theta/2) = 1/17$）作为同一寄存器的独立操作与两只共轴时钟复合，立即在所有正高度上生成稠密的 $\mathrm{Sp}(1)$；但如果它仅充当不同顶点纤维之间的平行输运 $T_{ij} n_j T_{ij}^{-1} = n_i$，则任意基点闭路积仍稳定起点径向轴、被锁死在单一交换圆内。从最小弧获得可观测非交换性，离不开明确的纤维识别（`ARGUED`）。

## 2.2 从双分量全谱听出非交换性：逆谱唯一性与三点全局单射 {#sec-ou-2-2}

现在检验第一道物理问题：**只看球壳上的能级（全谱含重数），能分辨 $(U, V)$ 是否交换、甚至把同时共轭类 $(x, y, z)$ 全部反推出来吗？**

在平方半径 $867$ 的十九点连续弧图上，给每个顶点与弧上的场赋予两个内部复分量；沿外向内的统一方向，给全部 $d^2 = 724$ 边右乘 $U$，给全部 $d^2 = 804$ 边右乘 $V$（反向取逆），其余端点势、惯性与自旋因子在两分量上作标量作用。对这套双分量算子族，有两项极强的逆谱结论（`ARGUED / CERT`，见[四元数双时钟专题](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E5%9B%9B%E5%85%83%E6%95%B0%E5%8F%8C%E6%97%B6%E9%92%9F%E4%B8%8E%E6%9E%81%E5%B0%8F%E5%9C%86%E5%BC%A7.md)）：

1. **双分量全谱唯一决定同时共轭类**：两组双分量算子具有相同全谱（含重数），**当且仅当两对时钟 $(U, V)$ 与 $(U', V')$ 同时共轭**。证明利用负能量端点行列式的闭走展开：在弧长截断 $0.016810$ 以内，任何闭走至多包含两条时钟边（三条最短时钟边总长已逾 $0.0203$）。经逐条认证的全部简单环中，按总弧长先后首次出现的三类有绕数闭走，依次携带（i）一条 $724$ 边、（ii）一条 $724$ 边与一条反向 $804$ 边、（iii）一条 $804$ 边。在两套算子的负能量大极限首项比较中，三类闭走之差依次正比于 $2(x - x')$、$2(z - z')$ 与 $2(y - y')$，于是逐层迫使 $(x, y, z) = (x', y', z')$！特别地，双分量全谱恰等于原复标量谱的两份拷贝，**当且仅当 $E = 0$（两只时钟交换）**。
2. **三个负能量行列式读数在整个共轭类空间全局单射**：取归一化移位行列式探针

   $$
   Y_u(x, y, z) := \frac{\det D_{U, V}^{(2)}(-u)}{\det D_{I, I}^{(2)}(-u)} - 1.
   $$

   在以极点 $(17, 17, 17)$ 为基准的自旋标架中，先消去内层三顶点以外的标量块，再对内层三点施三阶离散傅里叶变换，矩阵块干净分解为三个 $2 \times 2$ 块 $b I + \sum_{j=1}^3 (c_j Z_j + \bar{c}_j Z_j^{-1})$（其中 $(Z_1, Z_2, Z_3) = (U, V, U^{-1}V)$）。由此立得每个 $Y_u$ 都是 $X = (x, y, z)$ 的**至多六次实多项式**！把三个不同移位 $u_1, u_2, u_3$ 的读数组成列向量，拆分一次线性部 $A_1 X$ 与高次余项 $R(X)$；利用严格区间算术在 $[-1, 1]^3$ 上估算压缩常数 $\operatorname{Lip}_\infty(A_1^{-1} R)$，得到如下两组获证方案：

| 无量纲移位组 $(u_1, u_2, u_3)$ | $\operatorname{Lip}_\infty(A_1^{-1} R)$ 上界 | 从读数到 $(x, y, z)$ 的误差放大上界 |
| :--- | :---: | :---: |
| $(15000,\; 20000,\; 60000)$ | $\le 0.400$ | $\le 1.187 \times 10^{16}$ |
| $(-1000,\; -204000,\; -215000)$ | $\le 0.331$ | $\le 5.196 \times 10^{10}$ |

因为 $\operatorname{Lip}_\infty(A_1^{-1} R) \le 0.331 < 1$，由三角不等式立证这三个实读数在整个三维紧凸共轭类空间上**全局单射**！而由区域不变性定理，含三维开集的紧凸体绝不可能连续单射映入 $\mathbb{R}^2$，故 **$3$ 个实读数也是全空间的绝对下限**。若相位已经锚定在具体零点（如第 $35$ 枚正零点），则单凭一次零移位比较即可区分共轴与双轴构造：双轴行列式比共轴增加 $0.0154019\ldots$（半宽 $0.01$ 方格内始终处于 $(0.0146267, 0.0161849)$），且该零移位读数在任意保边输运乘积的有限弧细分下精确不变。

## 2.3 最优密度 $1/(2\pi)$ 的零点驱动标准模型规范群哈尔积分 {#sec-ou-2-3}

解决了双时钟的逆谱辨识，现在把[第一章](ch01-behrend-shell-and-frequencies.md)证明的 $22$ 个有理独立球壳频率全部发动起来，直取本章最具冲击力的算术—群论合流：**用实际黎曼正零点做确定性无权采样，精确计算标准模型规范群 $G = \mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$ 上的双元哈尔积分。**

群积分与热核展开的底层分析基石，是紧群不可约表示矩阵元的舒尔正交关系。下面这条 Lean 4 冻结定理为紧群上的特征标积分与奇扭曲热核归一化提供内核支撑：

::: {.theorem #thm-ou-ch02-schur-orthogonality title="紧群不可约表示矩阵元的舒尔正交关系" lean="D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self"}
设 $G$ 为配备有限左不变哈尔测度 $\mu$ 的紧拓扑群。

1. **不等价不可约表示的矩阵元正交消去**（[`integral_dual_mul_dual_inv_eq_zero`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero)）：设域 $\mathbb{k}$ 为实数域或复数域（`[RCLike 𝕜]`），$V$ 为 $\mathbb{k}$ 上有限维赋范空间，$W$ 为 $\mathbb{k}$ 上向量空间；设 $\rho$（作用在 $V$ 上）与 $\sigma$（作用在 $W$ 上）是 $G$ 两个互不等价的不可约表示（`IsEmpty (ρ.Equiv σ)`），满足对任意 $v \in V$ 映射 $g \mapsto \rho(g)v$ 连续；对给定的 $\varphi \in V^*$、$\psi \in W^*$，若对任意 $w \in W$ 映射 $g \mapsto \psi(\sigma(g)w)$ 连续，则对一切 $v \in V, w \in W$，

   $$
   \int_G \varphi\bigl(\rho(g)v\bigr)\,\psi\bigl(\sigma(g^{-1})w\bigr)\,d\mu(g) \;=\; 0.
   $$

2. **同一复不可约表示的自积分公式**（[`integral_dual_mul_dual_inv_self`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self)）：设 $V$ 为有限维复赋范空间，$\rho$ 为 $G$ 在 $V$ 上的不可约连续复表示。则对一切 $\varphi, \psi \in V^*$ 与 $v, w \in V$，

   $$
   \int_G \varphi\bigl(\rho(g)v\bigr)\,\psi\bigl(\rho(g^{-1})w\bigr)\,d\mu(g) \;=\; \frac{\mu(G)}{\dim_{\mathbb{C}} V}\,\varphi(w)\,\psi(v).
   $$

:::

::: proof
对 $v \in V, \psi \in W^*$ 定义线性缠绕算子 $T(w) := \int_G \psi(\sigma(g^{-1})w)\,\rho(g)v\,d\mu(g)$。利用测度 $\mu$ 的左不变性直接验证 $\rho(h)T(w) = T(\sigma(h)w)$，故 $T$ 是从 $\sigma$ 到 $\rho$ 的表示同态。在第一款中，$\rho$ 与 $\sigma$ 不可约且互不等价，舒尔引理迫使 $T = 0$，再作用 $\varphi$ 即得积分为零。在第二款中，$\rho = \sigma$ 为复数域上的有限维不可约表示，舒尔引理迫使 $T$ 为标量倍 $c\,I_V$；两端取迹并利用 $\operatorname{Tr}(\rho(g)\circ (v\otimes\psi)\circ\rho(g^{-1})) = \psi(v)$，得到 $c\,\dim_{\mathbb{C}} V = \mu(G)\,\psi(v)$，再作用 $\varphi(w)$ 即得所求公式。完整证明由 Lean 内核检查。
:::

现在来看 [@def-ou-ch02-dual-clocks] 的四阶原弧挑选规则究竟如何从黎曼零点里“筛”出纯粹的哈尔测度（`ARGUED / EXT-LEAN`，详见[规范群积分专题](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E9%9B%B6%E7%82%B9%E4%B8%8E%E6%A0%87%E5%87%86%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83%E7%BE%A4%E7%A7%AF%E5%88%86.md)）：

1. **三半迹上的常数哈尔体积密度**：对两枚独立哈尔随机单位四元数 $U, V$，各自标量部服从半圆律 $\frac{2}{\pi}\sqrt{1 - x^2}\,dx$；给定标量部后，两根单位虚轴在 $S^2$ 上独立均匀，故其内积在 $[-1, 1]$ 上均匀。由 $z = xy + \sqrt{(1-x^2)(1-y^2)}\cos\psi$ 做雅可比变换，平方根因子竟神奇地全数相消，留下**整个三维凸可行域上的常数密度 $2/\pi^2$**！
2. **从均匀环面角到最优相对密度 $1/(2\pi)$**：然而当 $p, q, v$ 各自沿圆周均匀分布时，$x = \cos p$、$y = \cos q$ 与 $\cos v$ 服从反正弦律。要把反正弦律折算成上述常数哈尔密度，必须乘上归一化雅可比权重

   $$
   w(p, q, v) = 2\pi\sin^2 p\,\sin^2 q\,|\sin v| = 2\pi\sqrt{1 - x^2}\sqrt{1 - y^2}\sqrt{E}.
   $$

   此时第四个独立原弧角 $u = \{\theta_{200}\gamma / (2\pi)\}$ 登场充当无参数拒绝采样门槛：$u < w / (2\pi) = \sin^2 p\,\sin^2 q\,|\sin v|$！由于经典 RH（`EXT-LEAN`）保证每个非零实频 $\lambda$ 均由朗道显式公式给出 $\sum_{0 < \gamma \le T} e^{i\lambda\gamma} = O_\lambda(T) = o(N(T))$，外尔（Weyl）判据遂把[第一章](ch01-behrend-shell-and-frequencies.md)证明的 $22$ 个有理独立频率送入满维环面 $\mathbb{T}^{22}$ 的联合等分布；挑选曲面的边界测度为零，故按该规则选出的零点子序列具有**精确相对密度**

   $$
   \rho_{\max} = \frac{1}{2\pi} \approx 0.159154943091895\ldots
   $$

   而且这个密度已是该参数化下的**数学极值**：若任意子序列以相对密度 $r$ 收敛至双份哈尔测度，与非负连续测试函数比较立得 $r\,w \le 1$ 几乎处处成立，而 $\operatorname{ess\,sup} w = 2\pi$，故必有 $r \le 1/(2\pi)$！对未加偏置的零点表做直接复算，前 $128$ 枚正零点恰命中 $16$ 枚，前六枚编号依次为 **$8, 15, 28, 31, 38, 50$**（`CERT`）。
3. **二十二个频率全额装配 $G = \mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$**：$22$ 个球壳独立频率丝毫不浪费——先拨出 $4$ 个角给上述弱双钟 $(U, V)$ 与挑选门槛 $u$；再拨出 $\theta_{32}, \theta_{52}$ 给出两枚独立 $\mathrm{U}(1)$ 相位；余下恰好 **$16$ 个原弧频率**（平方弦长 $56, 68, 72, 152, 172, 216, 224, 244, 292, 296, 372, 392, 504, 512, 544, 632$）均分为两组各 $8$ 个角，每组经“概率单纯形 $(1-\sqrt{1-s}, \sqrt{1-s}\,t, \sqrt{1-s}(1-t))$ $\to$ $\mathbb{C}^3$ 单位球面 $S^5$ 均匀列向量 $v$ $\to$ 共轭叉积补全 $S(v) \in \mathrm{SU}(3)$ $\to$ 右乘稳定子 $\operatorname{diag}(1, H)$（$H \in \mathrm{SU}(2)$ 哈尔分布）”生成一枚完整的 $\mathrm{SU}(3)$ 哈尔随机矩阵！于是对任意连续同时共轭不变函数 $F : G^2 \to \mathbb{C}$（及任意有限中心商，如标准模型商群 $G/\mathbb{Z}_6$），沿**同一批密度 $1/(2\pi)$ 的正黎曼零点**，无权算术平均精确收敛至 $\int_{G^2} F(g, h)\,dg\,dh$。
4. **奇数中心扭曲的二维 $\mathrm{SU}(2)$ 热核权重**：借助 [@thm-ou-ch02-schur-orthogonality] 给出 $\int \chi_n(UVU^{-1}V^{-1})\,dU\,dV = 1/(n+1)$，二维环面单格奇扭曲热核 $K_t(-[U, V])$（其中 $K_t(g) = \sum_{n\ge 0}(n+1)e^{-n(n+2)t}\chi_n(g)$）的配分函数与单位元峰值为

   $$
   Z_-(t) = \sum_{n \ge 0} (-1)^n e^{-n(n+2)t}, \qquad K_t(I) = \sum_{n \ge 0} (n + 1)^2 e^{-n(n+2)t}.
   $$

   直接把挑选门槛改为 $u < w K_t(-[U, V]) / (2\pi K_t(I))$，便获得该相互作用规范分布的无权零点采样，其最大可达相对密度为 $Z_-(t) / (2\pi K_t(I))$，并在 $t \downarrow 0$ 时按泊松求和渐近于 $(t/\pi)^{3/2}$（`ARGUED / CERT`）：

| 无量纲热时间 $t$ | 奇扭曲配分积分 $Z_-(t)$ | 可达最大零点相对密度 $Z_-(t)/(2\pi K_t(I))$ |
| :---: | :---: | :---: |
| $1/4$ | $0.64177727725\ldots$ | $0.02244015826\ldots$ |
| $1$ | $0.95054808840\ldots$ | $0.12584254589\ldots$ |
| $2$ | $0.99752136036\ldots$ | $0.15720164049\ldots$ |

## 2.4 最短原弧的无穷分裂素数细分与二维面积律密度坍缩 {#sec-ou-2-4}

单靠十九点球壳的 $22$ 个原频率，只能驱动两个标准模型群元（一条两回路规范积分）。倘若要扩展到任意大规模有限格点规范场，新的独立频率从哪里来？难道必须丢弃原球壳吗？

不必——**单单一小段最短原弧 $d^2 = 12$（从 $P = (11, 11, 25)$ 到 $Q = (13, 13, 23)$）里，就埋着无穷多个与原有 $22$ 频率全部 $\mathbb{Q}$-线性无关的有理细分角！**（`ARGUED / CERT`）

构造法美得像一首数论小诗：在平面 $x_1 = x_2$ 上，将球壳点写成高斯型复整数 $z + x\sqrt{-2}$，满足范数 $z^2 + 2x^2 = 867$。环 $\mathbb{Z}[\sqrt{-2}]$ 是范数欧几里得整环（任意复数就近取整后余范数至多 $1/4 + 2/4 = 3/4 < 1$）。任取 $m$ 个不等于 $17$ 且满足 $p_j \equiv 1 \pmod 8$ 的有理素数；它们在 $\mathbb{Z}[\sqrt{-2}]$ 中全部完全分裂为 $p_j = \pi_j \bar{\pi}_j$。对任意网格上限 $h > 0$，令 $K = \lceil 4\pi\max(m, h^{-1})/\theta_{12}\rceil$，由圆周鸽巢原理对每个 $p_j$ 存在非零整数 $|k_j| \le K$ 使范数为 $1$ 的有理旋转元 $(\pi_j/\bar{\pi}_j)^{k_j}$ 的正主角不超过 $2\pi/K$，全部 $m$ 段角总和不超过 $\theta_{12}/2$，依次旋转所得的有理点全数落在原弧 $PQ$ 内部！因为原有 $22$ 个相位的分母只含素因子 $2, 3, 17$，而第 $j$ 个新相位 $(\pi_j/\bar{\pi}_j)^{k_j}$ 在 $(\pi_j)$ 处赋值为 $+k_j$、在共轭素理想 $(\bar{\pi}_j)$ 处赋值为 $-k_j$、在其余全部素理想处赋值为零，故在每个互异有理素数 $p_j$ 上方各检一枚素理想 $(\pi_j)$ 即可迫使全部整数系数归零，从而证得这 $m$ 个新频率与原有 $22$ 个频率整体 $\mathbb{Q}$-线性无关！递归选取无穷多个分裂素数，即可得到可数无穷张有理独立频率表，为任意有限格点的全部独立边提供乘积哈尔积分。

当然，这种精确算术坐标是有位长代价的：在 $m = 12, h = 0.01$ 的显式有理算例中，选出的 $12$ 个新角仅占原弧 $PQ$ 长度的 $2.30222\%$，但清分母所需的共同整数放大倍数已长达 **$360{,}297$ 位十进制数字**。

更深刻的一道物理分水岭出现在**带相互作用的二维面积律格点细分**上。考虑自由边界二维圆盘上的 $N$ 个等面积小面，总热时间为 $t$，每个面带 $\mathrm{SU}(2)$ 热核权重 $K_{t/N}(g_f)$（积分为 $1$）：

- **路线一（固定坐标拒绝采样 $\to$ 超指数密度坍缩）**：若坚持沿用原有独立的哈尔面坐标，仅靠筛选实际零点子序列来获得相互作用面分布 $\prod_{f=1}^N K_{t/N}(g_f)$，则相对哈尔样本的最大可达零点密度为 $\rho_N = K_{t/N}(I)^{-N}$。由高斯泊松求和立得

  $$
  \log \rho_N \;=\; -\frac{3}{2} N\log N \;+\; N\log\!\left(\frac{4t^{3/2}}{\sqrt{\pi}}\right) \;-\; t \;+\; o(1).
  $$

  随着网格细分 $N \to \infty$，零点子序列的相对密度按 $N^{-3N/2}$ 灾难性崩塌，**不存在任何正密度零点子序列能同时实现任意细的相互作用边缘分布**（`ARGUED`）。
- **路线二（条件热核映射 $\to$ 逐零点精确保持面积律）**：反过来，若把面积作用直接写进“新独立角 $\to$ 子面回路”的条件反演映射中——先用三个角采样根面 $K_t(g)\,dg$，再把热时间 $s + s'$ 的父面 $g$ 剖分时，用新的三个独立角从精确条件律

  $$
  h \sim \frac{K_s(h)\,K_{s'}(h^{-1}g)}{K_{s+s'}(g)}\,dh, \qquad (g_1, g_2) = (h,\; h^{-1}g)
  $$

  抽取子面——由热核卷积律，子面联合分布精确成为两个独立热核律，且在**每一个零点上逐点满足 $g_1 g_2 = g$**！由此在任意有限二分层上迭代保持相容柱分布，并在面积 $A$ 的简单收缩回路上精确给出第 $n$ 阶不可约表示的威尔逊圈期望 $e^{-n(n+2)\tau A}$。但请注意诚实的边界：RH 与整数弧只提供确定性无权采样器，弦张力系数 $\tau$ 与二维格点作用本身仍是外部输入（`MODEL`）。

## 2.5 有限威尔逊扩散判据：$D = 0$ 耦合统一检验与 $1\,\mathrm{TeV}$ 现实对照 {#sec-ou-2-5}

本章最后把目光从“怎么算规范积分”转向“怎么用有限个可观测量检验统一动力学”。在完整标准模型商群 $G = (\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3))/\mathbb{Z}_6$（取整数超荷 $q = 6Y$）上，考察盘上面回路的连续卷积半群分布（共轭不变、取逆不变、小面积弱收敛至单位元）。每个不可约表示 $R$ 的归一化实威尔逊圈读数必呈指数衰减 $W_R(A) = \exp(-A\lambda_R)$。

取忠实夸克双重态表示 $Q = (q = 1, \mathbf{2}, \mathbf{3})$（$\dim Q = 6$），记归一化实特征标 $\phi_Q := \operatorname{Re}\operatorname{tr} Q / 6$，考察仅在单位元处归零且三阶导数全消的四阶检验函数 $f := (1 - \phi_Q)^2$。直接展开张量积 $Q \otimes Q$ 与 $Q \otimes \bar{Q}$ 的八个不可约分量，立得非负**跳跃亏量泛函**（`ARGUED`）：

$$
D \;:=\; \lim_{a \downarrow 0} \frac{\mathbb{E}_a[f]}{a} \;=\; 2\lambda_Q - \frac{1}{72}\sum_{R \subset Q\otimes Q\text{ 或 }Q\otimes\bar{Q}} (\dim R)\,\lambda_R \;\ge\; 0.
$$

这一有限线性组合是一台极锐利的动力学听诊器：

1. **$D = 0$ 唯一锁死纯高斯二次卡西米尔扩散**：因为 $Q$ 在商群上忠实，单位元附近有 $1 - \phi_Q \asymp |X|^2$。若 $D = 0$，则大跳跃与四阶矩全部在 $o(a)$ 阶消失，整个半群由三个独立二次扩散系数 $(a_Y, a_2, a_3)$ 唯一决定：对允许表示 $(q, j; p, r)$（满足商群相容律 $q + 6j + 2(p + 2r) \equiv 0 \pmod 6$），

   $$
   \lambda_{q, j; p, r} \;=\; a_Y q^2 \;+\; a_2\,j(j + 1) \;+\; \frac{a_3}{3}(p^2 + r^2 + pr + 3p + 3r).
   $$

   反之，若存在非零跳跃测度 $\nu$，则 $D = \int f\,d\nu$，幅度 $\|Q(g) - I\|_{\mathrm{HS}} \ge u$ 的大跳跃率严格受 $144 D / u^4$ 控制。
2. **耦合统一的有限威尔逊等式 vs. $1\,\mathrm{TeV}$ 现实读数**：令 $C, W, e$ 依次为超荷零色伴随、超荷零弱伴随与 $q = 6$ 双单态轻子表示，其衰减率依次为 $3a_3$、$2a_2$、$36a_Y$。在规范归一 $g_1^2 = \frac{5}{3}g_Y^2$ 下，三支耦合相等对应 $a_Y : a_2 : a_3 = 1/60 : 1 : 1$，从而在 $D = 0$ 条件下，**耦合统一等价于两条零参数威尔逊圈幂律恒等式**：

   $$
   W_C(A)^2 = W_W(A)^3, \qquad W_e(A)^{10} = W_W(A)^3 \qquad \Longleftrightarrow \qquad \frac{\lambda_C}{\lambda_W} = 1.5, \quad \frac{\lambda_e}{\lambda_W} = 0.3.
   $$

   现在把 $1\,\mathrm{TeV}$ 处的真实标准模型三规范耦合直接代入这一二维热扩散假设：算得的比值却是

   $$
   \frac{\lambda_C}{\lambda_W} \approx 4.1259\;\;(4.12589\ldots), \qquad \frac{\lambda_e}{\lambda_W} \approx 0.1610\;\;(0.160993\ldots),
   $$

   与统一边界 $(1.5,\; 0.3)$ 相距万里！这一简洁而冷峻的对照再次提醒我们：零点哈尔测度容许三系数 $(a_Y, a_2, a_3)$ 各自独立游走，它自身绝不会白送你高能耦合交汇，也无法替代四维重整化群跑动（这正是[第二卷](ch04-gauge-crossings-and-monotone-barriers.md)的核心战场）。
3. **色弱关联的锐误差界**：记 $CW$ 为色伴随与弱伴随的外张量积，由初等不等式 $(1 - u^2)(1 - v^2) \le (1 - uv)^2$ 得 $(1 - \phi_C)(1 - \phi_W) \le \frac{3}{2}(1 - \phi_Q)^2$，取小面积极限立得

   $$
   0 \;\le\; \lambda_C + \lambda_W - \lambda_{CW} \;\le\; \frac{3}{2} D,
   $$

   且常数 $3/2$ 精确可达（由集中在弱、色基本迹皆为零的共轭类上的复合泊松跳跃饱和）。

::: {.example #ex-ou-ch02-commutator-and-wilson title="八分量夸克张量分解中 D = 0 的手算核验"}
直接把纯二次卡西米尔谱 $\lambda_{q,j;p,r}$ 代回跳跃亏量公式，检验为何三个独立系数 $(a_Y, a_2, a_3)$ 的贡献全部精确相消。对夸克双重态 $Q = (1, \frac{1}{2}; 1, 0)$，有 $\lambda_Q = a_Y + \frac{3}{4}a_2 + \frac{4}{3}a_3$，故 $2\lambda_Q = 2a_Y + \frac{3}{2}a_2 + \frac{8}{3}a_3$。另一方面，$Q \otimes Q$ 拆为 $(q = 2,\; \mathbf{1}\oplus\mathbf{3},\; \bar{\mathbf{3}}\oplus\mathbf{6})$（维数 $3 + 6 + 9 + 18 = 36$），$Q \otimes \bar{Q}$ 拆为 $(q = 0,\; \mathbf{1}\oplus\mathbf{3},\; \mathbf{1}\oplus\mathbf{8})$（维数 $1 + 8 + 3 + 24 = 36$），总维数恰为 $72$。逐扇区加权求平均：

- **$a_Y$ 扇区**：仅 $Q \otimes Q$ 携带 $q^2 = 4$，故 $\frac{36 \times 4}{72} = 2$；
- **$a_2$ 扇区**：弱三重态（$j(j+1) = 2$）总维数为 $(9 + 18) + (3 + 24) = 54$，故 $\frac{54 \times 2}{72} = \frac{3}{2}$；
- **$a_3$ 扇区**：色卡西米尔为 $0$（$\mathbf{1}$）、$\frac{4}{3}$（$\bar{\mathbf{3}}$，维数 $12$）、$\frac{10}{3}$（$\mathbf{6}$，维数 $24$）与 $3$（$\mathbf{8}$，维数 $32$），加权和为 $\frac{12\cdot(4/3) + 24\cdot(10/3) + 32\cdot 3}{72} = \frac{16 + 80 + 96}{72} = \frac{192}{72} = \frac{8}{3}$。

三项与 $2\lambda_Q$ 逐一相等，因此 $D \equiv 0$ 恒等成立；任何偏离二次扩散的非局域跳跃都会立刻把 $D$ 推离零点。
:::

至此，我们已看清十九点贝伦德球壳与黎曼零点如何通过四元数双时钟和 $22$ 个独立频率构筑起完整的非交换逆谱与规范群积分框架。

::: {.film src="two-quaternion-clocks"}
**两只四元数时钟：交换子亏量、格拉姆凸体、赫维茨词与零点骰子（2 分 48 秒）。** 青色的 $U = (1 + 2i)/\sqrt{5}$ 与品红的 $V = (1 + 2j)/\sqrt{5}$ 两根虚轴张出白色平行四边形，琥珀色法向 $u \times v$ 标出交换子亏量 $E = 16/25$，账本给出 $x = y = 1/\sqrt{5}$、$z = 1/5$、$|UV - VU|^2 = 4E = 64/25$（屏幕上的计算）。青色线框是允许的 $(x, y, z)$ 凸体，表皮 $E = 0$ 是两钟交换之处，琥珀点是样本；绿色标签是三锚格拉姆行列式非负与利雅三元曲率恒等式（[@thm-ou-ch02-bargmann-gram]），算例 $16/25$ 与 $16$ 是屏幕上的计算。球面上的点是长度不超过 $3$ 的 $186$ 个赫维茨既约词转出的 $x$ 轴像，$186$ 个标架互不相同（屏幕上的计算），绿色标签是既约词伴随单射定理（[@thm-ou-ch02-free-group-f3]）。紫色面板是逆谱唯一性与“谱加倍当且仅当 $E = 0$”（书面论证），闭走三角形与球壳环是示意；青色面板是三读数区间证书 $\operatorname{Lip}_\infty \le 0.331$。柱状图是前 $128$ 个正黎曼零点：青柱高 $\sin^2 p\,\sin^2 q\,|\sin v|$，琥珀点是 $u$，保留 $16$ 个，开头为 $8, 15, 28, 31, 38, 50$（屏幕上的计算）；紫色面板中的极限密度 $1/(2\pi)$ 依赖经典 RH（外部 Lean 证明）。$22$ 个频率色块按 $4 + 2 + 16$ 分配；绿色标签是舒尔正交关系（[@thm-ou-ch02-schur-orthogonality]），交换子特征标平均 $1/(n+1)$ 由它论证得到，并对 $n = 0, 1, 2, 3$ 精确重算；末尾紫色条重申零点只给出采样器，耦合与格点作用量仍是外部输入（`MODEL`）。
:::

然而，本章的零点等分布依赖的是**全局渐近平均**——当我们把镜头推近，追问 Lean 内核对有限截止零点谱的定量相位抵消、费耶尔碰撞极限、兰道围道竖边以及具体候选零点窗口（如第 $11431$ 枚与第 $8236$ / $8359$ 枚）究竟证明了什么、又留下了哪一道诚实缺口时，我们便踏入了第一卷收官之章：[第三章 黎曼零点谱底座：费耶尔碰撞、兰道围道与候选零点窗](ch03-riemann-zeros-fejer-and-landau.md)。
