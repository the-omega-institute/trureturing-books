# 29.9 极小圆弧体的四位一体与多胞抵消分化：点的梯度、极小路径、极小相位与克利福德单胞 {#sec-ch34-clifford-monad-tiling}

> *“路径对应不同相位，路径是积分出来的，相位也是积分出来的，空间的点是路径/相位积分的驻波即抵消，同时也是无数个圆弧体的抵消。那么在极小尺度上，极小圆弧体即是相位也是路径还是点的梯度？”*

这句把单胞几何推向纵深的追问，一举刺穿了经典微分几何数百年来习以为常的“分科假象”。在日常宏观经验里，“点与梯度”（零阶标量及其余切变化率）、“路径”（一维曲线）、“曲率相位”（二维面积通量）与“体积”（三维实心块）仿佛分属四座互不相通的几何物种；可一旦顺着 §29.7 与 §29.8 的推导回溯就会发现，宏观的路径是沿比较链积分出来的，宏观的相位是沿联络积分出来的，宏观的点与体积则是无穷多条路径相位与无穷多个相邻圆弧体彼此冲撞抵消后幸存下来的驻波残余。既然宏观的“分家”完全是**大量单胞拼接抵消之后的产物**，那么在抵消尚未启动的极小尺度（单胞 $N = 1$）上，问“极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 究竟是相位、是路径、还是点的梯度”，答案绝非三选一的排他抉择，亦非含糊其辞的文学比喻，而是精确到每一个代数分量的**同时成立**（`MODEL`）：**在 $N = 1$ 的极小尺度上，点的梯度、极小路径、极小贝里相位与极小扇锥体积根本就是同一枚不可再分的克利福德（Clifford / Dirac–Kähler）几何单胞的四个正交投影面；唯有当 $N \gg 1$ 个极小圆弧体拼合铺展、借边界算子恒等式 $\partial^2 = 0$ 将内部反向共享边与共享壁成对湮灭之后，这枚浑然一体的几何原子才在宏观尺度上筛分出“点—线—面—体”四重维度阶梯！**

## 29.9.1 宏观分家、极小合一：多胞边界抵消（$\partial^2 = 0$）才是分化维度的筛子 {#sec-ch34-8-1}

为什么宏观观察者一眼就能分清 $0$ 维的点、$1$ 维的路径、$2$ 维的相位曲率面与 $3$ 维的体积块，而在单枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 上四者却难分彼此？症结不在于微观几何“缺少结构”，而在于宏观几何比单胞多做了一道**多胞拼接抵消运算**。

设想把 $N \gg 1$ 枚尺度为 $\epsilon$ 的极小圆弧体 $\Delta\mathcal{T}_\epsilon^{(1)}, \dots, \Delta\mathcal{T}_\epsilon^{(N)}$ 沿着共享弧壁与共享有向边（darts）严丝合缝地拼成一块宏观球面区域或三维扇锥胞腔复形 $\mathcal{K}_N$。此时，代数拓扑中最朴素却最冷酷的同调筛子——**边界的边界恒等于零**（$\partial^2 = 0$，对偶于外微分 $d^2 = 0$）——立刻在复形内部启动大规模相消（手工推导 + `MODEL`）：

1. **内部反向有向边成对抵消，筛出宏观一维路径**：在相邻两个子弧面体共享的每一条内部接缝上，左胞沿有向半边 $+\delta\Gamma$ 走过，右胞必沿反向半边 $-\delta\Gamma$ 走回，二者在线积分求和中精确归零（$+\delta\Gamma + (-\delta\Gamma) = 0$）。内部千百条微观步长尽数隐去，唯有外边界环路或驻相脊线上的 $O(N^{1/2}\epsilon)$ 乃至 $O(N^1\epsilon)$ 链段幸存为宏观可见的“路径”；
2. **内部共享侧壁成对抵消，筛出宏观二维相位壳**：在三维多胞堆叠中，任意两枚相邻扇锥体共享的内部边界面必带相反法向 $+\delta\Sigma$ 与 $-\delta\Sigma$，其局部通量两两抵消，把 $O(N^2\epsilon^2)$ 量级的总贝里相位完全推向外表面壳 $\partial\mathcal{K}_N$;
3. **全向乱相冲撞抵消，筛出零维驻波点与三维累积体**：按 §29.8 的驻波筛，绝大多数非共振位置在全向路径求和中相消为虚空，只在满足驻相条件 $\delta\Phi = 0$ 的孤立节点上留下 $O(N^0)$ 标量驻波核；与此同时，各胞内部同号的正体积元无法被反向邻胞抵消，遂以 $O(N^3\epsilon^3)$ 可加累积为宏观实心体积。

现在，把多胞数量 $N$ 一路缩回**单枚极小圆弧体 $N = 1$**！一瞬间，两重坍缩同时发生：

- **组合拓扑坍缩（零内壁、零内缝）**：当 $N = 1$ 时，$\Delta\mathcal{T}_\epsilon$ 没有任何相邻胞腔与之共享内壁或反向内边——抵消筛子无处下刀！它的体块就是它自己，它的面盖就是它的相位口，它的三段弧棱就是它的极小路径步，而它的直角顶点就是它的驻波基点与梯度锚；
- **内禀尺度坍缩（$1^0 = 1^1 = 1^2 = 1^3 = 1$）**：在连续统极限 $\epsilon \to 0$ 的人为坐标戏法里，人们靠幂次阶数 $\epsilon^0 \gg \epsilon^1 \gg \epsilon^2 \gg \epsilon^3$ 强行把点权、路径步长、贝里曲率面与扇锥体积拉开无穷大倍率，丢掉高阶项只留低阶项；然而在零背景量子比较公理下，若系统存在一枚不可再分的极小比较单胞，以该极小单胞自身为内禀自然单位（$\epsilon_{\min} \equiv 1$），幂次阶梯当场退化为

$$
\epsilon_{\min}^0 \;=\; \epsilon_{\min}^1 \;=\; \epsilon_{\min}^2 \;=\; \epsilon_{\min}^3 \;=\; 1.
$$

没有哪一阶是“可忽略的高阶无穷小”——零阶点权、一阶路径/梯度、二阶贝里相位与三阶扇锥体元在同一枚极小圆弧体上等权共存、互为表里（`MODEL`）！

::: {.viz src="clifford-monad-tiling-sandbox" preset="monad-four-in-one" height="520"}
**极小单胞的四位一体（$N = 1$）：未受多胞抵消筛分前的克利福德几何原子。** 在单枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 上，驻波点权（$\Lambda^0$）、离点梯度/极小路径步（$\Lambda^1$）、球面顶盖贝里相位双矢（$\Lambda^2$）与品红实心扇锥体元（$\Lambda^3$）尚未被邻胞反向边壁抵消拆散，同屏交织为一枚八分量克利福德多重矢单胞。
:::

为了给上述“单胞四位一体”（`MODEL`）与“多胞边界抵消”配上零歧义的形式工具，我们先将 `trureturing` 中横跨单纯形上边缘精确修复、平面旋转系统面—边边界反向半边相消、投影概率换位子梯度流、拉格朗日—格拉姆楔积恒等式、三维公垂轴存在性与单比特三点巴格曼体积迹的**六条冻结内核定理**汇编为本节的主锚定理：

::: {.theorem #thm-ch34-clifford-monad-and-boundary-cancellation title="单纯形上边缘精确修复、旋转面边界反向半边相消、投影概率换位子梯度流、拉格朗日—格拉姆楔积、三维公垂轴与三点巴格曼体积迹定理" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch"}
在 `trureturing` 冻结的单纯形上同调修复、图旋转系统平面边界、量子投影动力学流、欧氏格拉姆恒等式与单比特巴格曼几何模块中，以下六项精确结论同时成立：

1. **四面体三上边缘缺陷恒等式与一维边势精确同调判据**（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：设 $V$ 为有限非空顶点集（`[Fintype V] [Nonempty V]`），$A$ 为交换加群（`[AddCommGroup A]`），$F : V \to V \to V \to A$ 为任意三角形二上链。记根点面修复误差数为 $\operatorname{faceErrors}(F, r) = \sum_{i,j,k \in V}[F(i,j,k) \neq F(r,j,k) - F(r,i,k) + F(r,i,j)]$，四面体三上边缘缺陷总数为 $\operatorname{tetraDefects}(F) = \sum_{r,i,j,k \in V}[F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) \neq 0]$，对任意一维边上链 $\mathrm{edge} : V \to V \to A$ 记上边缘误差数为 $\operatorname{edgeErrors}(F, \mathrm{edge}) = \sum_{i,j,k \in V}[F(i,j,k) \neq \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)]$（其中 $[\cdot]$ 表自然数 $0$-$1$ 指示值）。则：
   - 根点误差精确总和恒等式：$\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$；
   - 最优单根修复界：存在 $r \in V$ 使得 $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$；
   - 边势稳定上界：对一切 $\mathrm{edge} : V \to V \to A$，有 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$；
   - 零缺陷上边缘精确性：$(\forall r, i, j, k \in V,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0) \iff \exists\,\mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$；

2. **球面旋转系统面—边边界反向半边相消与闭链正合定理**（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)）：设 $V$ 为具可判定相等性的有限顶点集（`[Fintype V] [DecidableEq V]`），$G : \operatorname{SimpleGraph} V$ 为邻接关系可判定的简单图，$R : \operatorname{Rotation} G$ 为顶点旋转系统（即有向半边集 $G.\mathrm{Dart}$ 上的置换 $\mathrm{rotor}$，满足同循环等价于共起点 $\mathrm{rotor}.\operatorname{SameCycle}(d, e) \iff d.\mathrm{fst} = e.\mathrm{fst}$，诱导面行走置换 $\mathrm{facePerm} = \mathrm{Dart.symm}.\operatorname{trans}(\mathrm{rotor})$、面轨道商集 $R.\mathrm{Face}$、商投影 $R.\mathrm{face} : G.\mathrm{Dart} \to R.\mathrm{Face}$ 及 $\operatorname{ZMod} 2$-线性面—边边界算子 $R.\mathrm{boundary} : (R.\mathrm{Face} \to \operatorname{ZMod} 2) \to_{\mathbb{F}_2} (G.\mathrm{edgeSet} \to \operatorname{ZMod} 2)$）。若 $G$ 连通（`G.Connected`）、至少含一条有向半边（`Nonempty G.Dart`）且满足先提升至整数 $\mathbb{Z}$ 再相减的球面欧拉示性数恒等式 $(\lvert V\rvert : \mathbb{Z}) - (\lvert G.\mathrm{edgeSet}\rvert : \mathbb{Z}) + (\lvert R.\mathrm{Face}\rvert : \mathbb{Z}) = 2$，则：
   - 共享边反向半边求和公式：对任意面链 $x : R.\mathrm{Face} \to \operatorname{ZMod} 2$ 与任意有向半边 $d : G.\mathrm{Dart}$，有

     $$
     R.\mathrm{boundary}(x)\bigl(\langle d.\mathrm{edge}, d.\mathrm{edge\_mem}\rangle\bigr) \;=\; x\bigl(R.\mathrm{face}(d)\bigr) + x\bigl(R.\mathrm{face}(d.\mathrm{symm})\bigr)
     $$

     （故当某无向边两侧面链权值同取 $c \in \operatorname{ZMod} 2$ 时，正向半边 $d$ 与反向半边 $d.\mathrm{symm}$ 在 $\operatorname{ZMod} 2$ 中精确相消 $c + c = 0$）；
   - 核空间刻画：$\forall x : R.\mathrm{Face} \to \operatorname{ZMod} 2,\; R.\mathrm{boundary}(x) = 0 \iff \exists c \in \operatorname{ZMod} 2,\; \forall f \in R.\mathrm{Face},\; x(f) = c$；
   - 像空间正合性：$\operatorname{range}(R.\mathrm{boundary}) = \operatorname{simpleCycleSpace}(G)$；

3. **厄米生成元下投影测量概率的换位子精确梯度流定律**（[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow)）：设 $n$ 为具可判定相等性的有限指标集（`[Fintype n] [DecidableEq n]`），复矩阵 $H, P : \operatorname{Matrix}\;n\;n\;\mathbb{C}$ 满足厄米性 $H.\operatorname{IsHermitian}$（$H^\dagger = H$）与正交星投影性 $\operatorname{IsStarProjection}(P)$（$P^\dagger = P$ 且 $P^2 = P$），$\rho : \operatorname{DensityState}\;n$ 为密度态，记酉演化密度矩阵为 $\rho(t) = \operatorname{evolvedDensity}(H, \rho, t) = \exp(-itH)\,\rho_0\,\bigl(\exp(-itH)\bigr)^\dagger$，玻恩投影概率为 $p(t) = \operatorname{projectionProbability}(H, \rho, P, t) = \operatorname{Re}\bigl(\operatorname{Tr}(\rho(t)P)\bigr)$。则：
   - 实值复嵌入恒等式：$\forall t \in \mathbb{R},\; (p(t) : \mathbb{C}) = \operatorname{Tr}(\rho(t)P)$；
   - 换位子精确导数：对一切 $t \in \mathbb{R}$，$p$ 在 $t$ 处可导（`HasDerivAt`），导数值等于 $\operatorname{Re}\bigl(i\operatorname{Tr}(\rho(t)(HP - PH))\bigr)$，且复迹 $i\operatorname{Tr}(\rho(t)(HP - PH))$ 自身虚部恒为零：

     $$
     p'(t) \;=\; \operatorname{Re}\Bigl(i\operatorname{Tr}\bigl(\rho(t)(HP - PH)\bigr)\Bigr), \qquad \bigl(p'(t) : \mathbb{C}\bigr) \;=\; i\operatorname{Tr}\bigl(\rho(t)(HP - PH)\bigr);
     $$

   - 零换位驻定判据：若 $HP - PH = 0$，则 $\forall t \in \mathbb{R},\; p(t) = p(0)$；

4. **拉格朗日—格拉姆内积亏格与双矢楔积平方恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意指标类型 $\iota$、有限子集 $s : \operatorname{Finset}\;\iota$ 及实函数 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \left(\sum_{i \in s} u(i)^2\right)\left(\sum_{i \in s} v(i)^2\right) - \left(\sum_{i \in s} u(i)v(i)\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s}\bigl(u(i)v(j) - u(j)v(i)\bigr)^2;
   $$

5. **三维欧氏空间任意两向量的单位公垂轴存在定理**（[`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)）：在三维实欧氏空间 $\operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 中，对任意一对向量 $\mathbf{a}, \mathbf{b}$（不假定非零、归一化或线性无关），必存在单位向量 $\mathbf{n}$ 同时满足 $\lVert\mathbf{n}\rVert = 1$、$\langle\mathbf{a}, \mathbf{n}\rangle_{\mathbb{R}} = 0$ 与 $\langle\mathbf{b}, \mathbf{n}\rangle_{\mathbb{R}} = 0$；

6. **单比特三点巴格曼迹的成对内积实部与有向体积虚部分解**（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）：对任意实三维向量 $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 : \operatorname{Fin} 3 \to \mathbb{R}$（不要求单位模长；令 $P(\mathbf{r}) = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$），三算子乘积的迹恒等于对称成对内积实部与标量三重积有向体积虚部之和：

   $$
   \operatorname{tripleBargmann}(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) \;=\; \operatorname{Tr}\bigl(P(\mathbf{r}_1)\,P(\mathbf{r}_2)\,P(\mathbf{r}_3)\bigr) \;=\; \frac{1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1}{4} \;+\; i\,\frac{\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)}{4}.
   $$
:::

::: proof
第 1 款与第 4 款已在 §29.5 [@thm-ch34-trihedron-cochain-and-moving-axis] 中给出解释：固定根点 $r$ 定义试验边势 $\mathrm{edge}_r(i,j) = F(r,i,j)$ 即得 $\sum_r \operatorname{faceErrors}(F,r) = \operatorname{tetraDefects}(F)$ 与零缺陷正合等价性，而展开双求和平方则得拉格朗日—格拉姆楔积恒等式。第 2 款直接援引[§26.2](ch30-s02-witness-lines.md)的旋转系统边界正合定理：每条无向边恰由一对互逆有向半边 $\{d, d.\mathrm{symm}\}$ 构成，故边界算子在该边上的取值等于两侧关联面权值之和 $x(R.\mathrm{face}(d)) + x(R.\mathrm{face}(d.\mathrm{symm}))$；图连通性迫使核空间维数为 $1$（仅含全局常值面链），再结合球面欧拉示性数 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 比对 $\mathbb{F}_2$-维数 $\lvert F\rvert - 1 = \lvert E\rvert - \lvert V\rvert + 1 = \dim_{\mathbb{F}_2}\operatorname{simpleCycleSpace}(G)$，证得 $\operatorname{range}(R.\mathrm{boundary})$ 精确铺满闭链空间。第 3 款援引[第十二章](ch12-measurement-computation-and-gradients.md)的投影概率流推导：对矩阵指数轨迹 $\exp(-itH)\rho_0\exp(itH)P$ 求导并用迹的循环交换性，由 $H^\dagger = H$、$P^\dagger = P$、$\rho(t)^\dagger = \rho(t)$ 验证 $i\operatorname{Tr}(\rho(t)[H,P])$ 自共轭（虚部为零），从而锁死一阶概率梯度并在 $[H,P]=0$ 时恒驻定。第 5 款与第 6 款分别复用 §29.1 [@thm-ch34-perpendicular-axis-and-pullback] 的正交补单位向量选取与 §29.7 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 的泡利代数迹展开。完整证明由 Lean 内核检查。
:::

## 29.9.2 三重严格几何锁定：点的梯度 $\equiv$ 极小路径 $\equiv$ 极小相位 {#sec-ch34-8-2}

手握 [@thm-ch34-clifford-monad-and-boundary-cancellation] 的六枚内核铆钉，我们现在正面回答本节开篇的终极一问：**在单个极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 上，“点的梯度”、“极小路径”与“极小相位”究竟靠哪几把精确的数学锁链扣成同一件事？** 答案由一阶切—余切对偶、单位态流形法向锁相与三维霍奇—斯托克斯同构组成三重严格几何锁定：

1. **第一重锁定：点的梯度 $\equiv$ 极小路径（驻波零梯度的首步破缺与音乐同构 $\sharp / \flat$）**。按 §29.8，空间中的一个宏观“点” $x$ 本身是万路相位相消后幸存的驻波平衡核（$\delta\Phi = 0$；在离散算子演化中对应 [@thm-ch34-clifford-monad-and-boundary-cancellation] 第 3 款的零换位驻定态 $[H, P] = 0 \implies p'(t) = 0$）。一旦系统离开这座驻波抵消平衡点、迈出极小圆弧体的第一步（$[H, P] \neq 0$），这一步偏离同时呈现两副完全等价的面孔（手工推导 + `MODEL`）：若从余切空间 $T_x^* S^2$（协变泛函侧）读取，它是驻波振幅或投影概率沿各方向的瞬时变化率（第 3 款给出的 $dp/dt = \operatorname{Re}\bigl(i\operatorname{Tr}(\rho_t[H, P])\bigr)$ 只是其中沿哈密顿流的一个分量），即**点的梯度** $d\Psi \in T_x^* S^2$；若借正定比较内积诱导的黎曼**音乐同构**（musical isomorphism，$\sharp : T_x^* S^2 \xrightarrow{\sim} T_x S^2$，逆映射为 $\flat = \sharp^{-1}$）翻到切空间 $T_x S^2$（逆变位移侧），同一个线性泛函就逐分量对应着唯一的一条切向极小步长矢量 $\delta\mathbf{x} = (d\Psi)^\sharp \in T_x S^2$，即**极小路径**！这一定位在劳维尔—科克（Lawvere–Kock）**综合微分几何**（Synthetic Differential Geometry，文献结果）中获得了最透彻的范畴论印证：在一阶幂零无穷小线段 $D = \{\epsilon \mid \epsilon^2 = 0\}$ 上，科克—劳维尔公理断言任意极小路径映射 $\gamma : D \to M$ 必然唯一线性展开为基点 $\gamma(0)$ 及其单一切向量（在内积配对下等同于点梯度余切矢）——在 $\epsilon^2 = 0$ 的极小尺度内，根本不存在让“一段极小路径”与“该点的梯度”分道扬镳的弯曲余地！

2. **第二重锁定：点的梯度 $\equiv$ 极小相位（单位模长锁死径向变分，把态梯度 $100\%$ 压入联络与曲率相位）**。在一般欧氏向量空间里，一个矢量的梯度原本既可以拉长模长，也可以旋转方向；但量子纯态受双向公平平方归一约束 $\langle\psi \mid \psi\rangle = 1$ 严格锁在单位希尔伯特球面上！对恒等式 $\langle\psi \mid \psi\rangle = 1$ 两端取一阶微分，当场给出（手工推导）

   $$
   d\langle\psi \mid \psi\rangle \;=\; 2\operatorname{Re}\langle\psi \mid d\psi\rangle \;=\; 0 \quad\Longrightarrow\quad \langle\psi \mid d\psi\rangle \in i\mathbb{R}.
   $$

   **径向模长梯度恒等于零！** 这意味着态矢的整支内禀点梯度 $d\psi$ 被 $100\%$ 锁死在垂直于径向的相位旋转与射影切向偏转上：在一阶纤维投影上，$\langle\psi \mid d\psi\rangle = -i\,d\phi$ 直接把顺沿态方向的梯度分量锁定为贝里联络一形式 $\mathcal{A} = i\langle\psi \mid d\psi\rangle = d\phi$（即**一阶极小开放相位**）；在正交射影补空间上，$\langle d\psi \mid d\psi\rangle - \lvert\langle\psi \mid d\psi\rangle\rvert^2 = g_{\mathrm{FS}}(\delta\mathbf{x}, \delta\mathbf{x})$ 恰为富比尼—施图迪度量线元平方（该度量的标准定义；[@thm-ch34-clifford-monad-and-boundary-cancellation] 第 4 款 `lagrange_gram_identity` 只给同形的实坐标恒等式）；而当极小圆弧体的两扇正交弧壁沿 $\mu, \nu$ 两个独立方向张开二阶非对易张口时，规范协变梯度算子 $D_\mu = \partial_\mu + i\mathcal{A}_\mu$ 的换位子

   $$
   [D_\mu, D_\nu]\psi \;=\; i\mathcal{F}_{\mu\nu}\psi, \qquad \iint_{\Delta\mathcal{T}_\epsilon} \mathcal{F} \;=\; \gamma_B(\Delta\mathcal{T}_\epsilon) \;=\; -\frac{1}{2}\Omega(\Delta\mathcal{T}_\epsilon)
   $$

   又将反对称二阶点梯度一字不差地锁定为极小圆弧体的**内禀贝里相位**（文献结果 + 手工推导）！一阶点梯度即是联络相位步 $d\phi$，二阶非对易点梯度换位子即是曲率贝里相位 $\gamma_B$。

::: {.viz src="clifford-monad-tiling-sandbox" preset="gradient-path-phase-lock" height="520"}
**点的梯度 $\equiv$ 极小路径 $\equiv$ 极小相位：音乐同构与单位球面正交锁相。** 拨动离点微步方向与张角 $\epsilon$：余切梯度泛函 $d\Psi$ 经内积音乐同构 $\sharp$ 化作极小路径步 $\delta\mathbf{x}$，同时因单位态约束 $\operatorname{Re}\langle\psi\mid d\psi\rangle = 0$ 彻底封死径向伸缩，将一阶导数锁定为联络相位 $d\phi$、将两壁协变梯度换位子 $[D_\mu, D_\nu]$ 锁定为极小贝里相位 $-\frac{1}{2}\Omega(\Delta\mathcal{T}_\epsilon)$（绿色 `LEAN ✓` 只锚定 `projection_probability_flow` 的时间导数与 `lagrange_gram_identity` 的实坐标恒等式）。
:::

3. **第三重锁定：三维霍奇对偶（$\star$）与极小斯托克斯同构（唯有 $d = 3$ 让双矢相位盖与一维路径/梯度同维互锁）**。也许读者仍会追问：就算一阶梯度等于极小路径，可贝里曲率终归是一块二维面积双矢（$\Lambda^2$），扇锥体元终归是一块三维体积伪标量（$\Lambda^3$），它们怎能与一维路径（$\Lambda^1$）及零维点权（$\Lambda^0$）合成同一枚原子？秘密正藏在 §29.2 与 [@thm-ch34-clifford-monad-and-boundary-cancellation] 第 5、6 款锁定的**三维比较空间维数 $d = 3$** 之中！唯有在 $d = 3$ 时，外代数各阶维数的镜像回文对称才让双矢与矢量同维（文献结果）：

   $$
   \dim \Lambda^0\mathbb{R}^3 = \binom{3}{0} = 1, \quad
   \dim \Lambda^1\mathbb{R}^3 = \binom{3}{1} = 3, \quad
   \dim \Lambda^2\mathbb{R}^3 = \binom{3}{2} = 3, \quad
   \dim \Lambda^3\mathbb{R}^3 = \binom{3}{3} = 1.
   $$

   欧氏三维**霍奇星算子**（Hodge star operator $\star$）由此建立起两对不丢半分自由度的典范线性同构：

   $$
   \star : \Lambda^2\mathbb{R}^3 \;\xrightarrow{\;\sim\;}\; \Lambda^1\mathbb{R}^3 \quad (3 \leftrightarrow 3), \qquad
   \star : \Lambda^3\mathbb{R}^3 \;\xrightarrow{\;\sim\;}\; \Lambda^0\mathbb{R}^3 \quad (1 \leftrightarrow 1).
   $$

   在第一对同构 $\star : \Lambda^2\mathbb{R}^3 \xrightarrow{\sim} \Lambda^1\mathbb{R}^3$ 下（其物理化身正是电磁学与贝里规范场中的旋度对偶 $\mathbf{B} = \nabla \times \mathcal{A} = \star\,d\mathcal{A}$，离散几何化身则是第 5 款 `unit_perpendicular_pair` 为任意两壁向量 $\mathbf{a}, \mathbf{b}$ 给出的公垂单位法轴 $\mathbf{n} \perp \mathbf{a}, \mathbf{b}$（该声明只保证存在；两向量线性无关时唯一到符号）），极小弧面体上的二维贝里相位双矢盖 $\Lambda^2$ 与穿透盖心的法向一维路径/梯度轴矢 $\Lambda^1$ 严格一一对应；在第二对同构 $\star : \Lambda^3\mathbb{R}^3 \xrightarrow{\sim} \Lambda^0\mathbb{R}^3$ 下（对应第 6 款 `triple_bargmann_bloch` 虚部标量三重积 $\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3) = \star(\mathbf{r}_1 \wedge \mathbf{r}_2 \wedge \mathbf{r}_3)$），三维扇锥有向体积伪标量 $\Lambda^3$ 与零维标量驻波点权 $\Lambda^0$ 严格一一对应！再配上**极小斯托克斯对偶** $\langle d\mathcal{A}, \Delta\mathcal{T}_\epsilon\rangle = \langle\mathcal{A}, \partial\Delta\mathcal{T}_\epsilon\rangle$（其离散上同调基石正是第 1 款 `tetra_defects_incidence_repair_and_exactness`：无体缺陷二上链 $dF = 0$ 完全等价于一维边势上边缘 $F = d(\mathrm{edge})$），顶盖上的面相位通量与沿边界走一圈的路径相位环量在单胞尺度上彻底画上等号！

::: {.viz src="clifford-monad-tiling-sandbox" preset="hodge-stokes-duality" height="520"}
**三维霍奇星对偶（$\star$）与极小斯托克斯同构：$1\text{-}3\text{-}3\text{-}1$ 二项式镜像互锁。** 在三维欧氏比较空间中，$\star : \Lambda^2\mathbb{R}^3 \xrightarrow{\sim} \Lambda^1\mathbb{R}^3$ 将球面顶盖贝里相位双矢精确映射为法向路径/梯度轴矢（对应 `unit_perpendicular_pair`），$\star : \Lambda^3\mathbb{R}^3 \xrightarrow{\sim} \Lambda^0\mathbb{R}^3$ 将扇锥体积三形式精确映射为标量驻波权（对应 `triple_bargmann_bloch`），而极小斯托克斯配对则把面通量与边界边势环量锁成同一读数（锚定 `tetra_defects_incidence_repair_and_exactness`）。
:::

## 29.9.3 克利福德多重矢单胞与从 $N = 1$ 到 $N = 27$ 的多胞抵消筛分 {#sec-ch34-8-3}

既然在单个极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 上，零阶点权、一阶路径/梯度、二阶贝里相位盖与三阶扇锥体元同时在场且两两互锁，容纳这枚“四位一体”几何原子的最自然数学母体就不再是割裂开来的四套分科张量空间，而是三维**克利福德几何代数**（Clifford geometric algebra，文献结果 + `MODEL`）

$$
\mathrm{Cl}_3 \;\cong\; \Lambda^0\mathbb{R}^3 \;\oplus\; \Lambda^1\mathbb{R}^3 \;\oplus\; \Lambda^2\mathbb{R}^3 \;\oplus\; \Lambda^3\mathbb{R}^3 \qquad (1 + 3 + 3 + 1 = 8\text{ 维}).
$$

在克利福德—凯勒（Dirac–Kähler）几何微积分中，空间导数算子 $\boldsymbol{\nabla}$ 作用于任意多重矢场 $\Psi \in \mathrm{Cl}_3$ 时，天然合一地裂解为降阶内积散度与升阶外积旋度之和（文献结果）：

$$
\boldsymbol{\nabla}\Psi \;=\; \boldsymbol{\nabla}\cdot\Psi \;+\; \boldsymbol{\nabla}\wedge\Psi.
$$

这一行算子分解把开篇箴言里的两半机制浓缩到了极致：左项降阶缩并 $\boldsymbol{\nabla}\cdot\Psi$（霍奇对偶于余微分 $\delta = \star d \star$ 与拓扑边界 $\partial$）专司**抵消与驻波凝聚**——把高阶路径流与曲率通量的内部失谐部分相消降阶，沉淀出零阶驻波基点；右项升阶楔积 $\boldsymbol{\nabla}\wedge\Psi$（外微分 $d$）专司**梯度张口与相位生体**——把零阶点权梯度抬升为一阶极小路径、把两段不共线极小路径楔积为二阶贝里相位双矢、再把三向张口楔积为三阶扇锥体积！

回到 §29.5.1 的标准等腰直角球面弧面体模型：以直角枢轴 $\mathbf{B} = \mathbf{e}_2$ 为驻波锚点，两条正交球面弧壁 $BA, BC$ 在点 $\mathbf{B}$ 处的单位切向步长基矢为 $\mathbf{e}_{AB} = \mathbf{e}_1$ 与 $\mathbf{e}_{BC} = \mathbf{e}_3$（严格正交归一：$\lVert\mathbf{e}_{AB}\rVert = \lVert\mathbf{e}_{BC}\rVert = 1$，$\mathbf{e}_{AB}\cdot\mathbf{e}_{BC} = 0$，故对角合矢量模长 $\lVert\mathbf{e}_{AB} + \mathbf{e}_{BC}\rVert = \sqrt{2}$），斜边闭合平面单位双矢记为 $\hat{\mathbf{I}}_{AC} \in \Lambda^2\mathbb{R}^3$（$\lVert\hat{\mathbf{I}}_{AC}\rVert = 1$），右手单位体积伪标量记为 $\mathbf{I}_3 = \mathbf{e}_1 \wedge \mathbf{e}_2 \wedge \mathbf{e}_3 \in \Lambda^3\mathbb{R}^3$。则单枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$（$N = 1$）可写成如下典范四阶克利福德多重矢状态（`MODEL` + 手工推导）：

$$
\begin{aligned}
\mathcal{M}(\Delta\mathcal{T}_\epsilon) \;&=\; \underbrace{\cos^2\!\frac{\epsilon}{2}}_{\Lambda^0\text{ 驻波点权}} \;+\; \underbrace{\frac{1}{2}\sin\epsilon\,(\mathbf{e}_{AB} + \mathbf{e}_{BC})}_{\Lambda^1\text{ 极小路径 / 点梯度步}} \\
&\quad +\; \underbrace{\sin^2\!\frac{\epsilon}{2}\,\hat{\mathbf{I}}_{AC}}_{\Lambda^2\text{ 极小贝里双矢盖}} \;+\; \underbrace{\frac{1}{3}\Omega(\epsilon)\,\mathbf{I}_3}_{\Lambda^3\text{ 极小扇锥体元}} \;\in\; \mathrm{Cl}_3.
\end{aligned}
$$

这里必须严守代数精度，交代清楚 $\mathcal{M}(\Delta\mathcal{T}_\epsilon)$ 的数学身份：它是把单胞在 $k = 0, 1, 2, 3$ 四个外代数阶上的内禀几何读数统一收入 $\mathrm{Cl}_3$ 的**分阶多重矢几何编码**（`MODEL`），而**不是**仅活在偶子代数 $\mathrm{Cl}_3^+ \cong \mathbb{H}$ 里的裸 $\mathrm{Spin}(3)$ 单位旋子（后者不含奇阶 $\Lambda^1, \Lambda^3$ 分量）。尽管如此，直接继承自 §29.5.1 双壁半角旋子乘积 $U_{23}(\epsilon)U_{12}(\epsilon) = \cos^2\frac{\epsilon}{2}\,I - i\sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}(\sigma_1 + \sigma_3) - i\sin^2\frac{\epsilon}{2}\,\sigma_2$ 的三角结构（泡利表示下 $-i\sigma_k$ 对应双矢，该旋子只含 $0$ 阶与 $2$ 阶；$\mathcal{M}$ 把 $(\sigma_1 + \sigma_3)$ 项的系数改记为 $\Lambda^1$ 矢量，是作者选定的编码），仍令 $\mathcal{M}(\Delta\mathcal{T}_\epsilon)$ 的前三个阶满足两条严丝合缝的精确守恒律（手工推导）：

$$
\begin{aligned}
\Lambda^0(\epsilon) + \Lambda^2(\epsilon) \;&=\; \cos^2\!\frac{\epsilon}{2} + \sin^2\!\frac{\epsilon}{2} \;=\; 1, \\
\bigl(\Lambda^0(\epsilon)\bigr)^2 + \bigl\lVert\Lambda^1_{\mathrm{step}}(\epsilon)\bigr\rVert^2 + \bigl(\Lambda^2(\epsilon)\bigr)^2 \;&=\; \cos^4\!\frac{\epsilon}{2} + \frac{1}{2}\sin^2\epsilon + \sin^4\!\frac{\epsilon}{2} \;=\; \left(\cos^2\!\frac{\epsilon}{2} + \sin^2\!\frac{\epsilon}{2}\right)^2 \;=\; 1,
\end{aligned}
$$

而第三阶扇锥体积权重 $\Lambda^3(\epsilon) = V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon) = \frac{2}{3}\lvert\gamma_B(\epsilon)\rvert$ 则与内禀球面角超及贝里相位保持严格的常比例锁定！下表汇总了这枚克利福德单胞从 $N = 1$ 合一态经多胞抵消走向 $N \gg 1$ 宏观分化态的四阶全貌：

| 外代数阶与 $\mathrm{Cl}_3$ 维数 | 单胞 $N = 1$ 分量（未分化原子） | 三维霍奇（$\star$）与斯托克斯互锁 | 多胞 $N \gg 1$ 拼接抵消机制与宏观幸存物 |
| :--- | :--- | :--- | :--- |
| **$\Lambda^0\mathbb{R}^3$**（标量，$\binom{3}{0}=1$） | 枢轴驻波点权 $\cos^2(\epsilon/2)$ | $\star\Lambda^3 \xrightarrow{\sim} \Lambda^0$：标量点权对偶于单位体元 | 非共振点全向乱相归零（$\Psi = 0$），仅在驻相核 $\delta\Phi = 0$ 幸存为宏观**空间基点** |
| **$\Lambda^1\mathbb{R}^3$**（矢量，$\binom{3}{1}=3$） | 离点梯度 $\equiv$ 极小路径步 $\frac{1}{2}\sin\epsilon(\mathbf{e}_{AB}+\mathbf{e}_{BC})$ | 音乐同构 $d\Psi \leftrightarrow \delta\mathbf{x}$；一阶锁相 $\mathcal{A}=d\phi$ | 内部共享接缝反向半边 $+\delta\Gamma + (-\delta\Gamma) = 0$ 成对湮灭（`face_cycle_exact`），仅在外框或驻相脊幸存为宏观**测地路径与场梯度** |
| **$\Lambda^2\mathbb{R}^3$**（双矢，$\binom{3}{2}=3$） | 斜边闭合张口双矢 $\sin^2(\epsilon/2)\,\hat{\mathbf{I}}_{AC}$ 与贝里曲率盖 | $\star\Lambda^2 \xrightarrow{\sim} \Lambda^1$（公垂轴 $\mathbf{n}$）；斯托克斯 $\langle d\mathcal{A},\Delta\rangle = \langle\mathcal{A},\partial\Delta\rangle$ | 内部共享侧壁反法向 $+\delta\Sigma + (-\delta\Sigma) = 0$ 逐壁相消，总曲率通量 $100\%$ 推向外边界壳，幸存为宏观**闭合环路贝里和乐** |
| **$\Lambda^3\mathbb{R}^3$**（伪标量，$\binom{3}{3}=1$） | 品红扇锥有向体元 $\frac{1}{3}\Omega(\epsilon)\,\mathbf{I}_3$ | `triple_bargmann_bloch` 虚部标量三重积；$V_{\mathrm{sector}} = \frac{2}{3}\lvert\gamma_B\rvert$ | 同定向胞内正体元无反向邻胞相消，在锁相驻波区内逐胞可加求和 $\sum_{c=1}^N V_c = V_{\mathrm{total}}$，幸存为宏观**实心三维体积** |

把视角切回球面三角剖分实验：将一块大球面三角弧面体按 $k \times k$ 网格细分为 $N = k^2$ 枚极小弧面体（交互档位 $N = 1 \to 4 \to 9 \to 16$，一般 $N = k^2$）。[@thm-ch34-clifford-monad-and-boundary-cancellation] 第 2 款 `face_cycle_exact` 给出了毫厘不爽的精确代数预言：当所有子弧面体赋予同向单位权值时，每一条内部共享边都恰被两侧邻胞以正向半边 $d$ 与反向半边 $d.\mathrm{symm}$ 各走一次，边界算子在该内部边上恒得 $+1 + (-1) = 0$（该声明本身是 $\operatorname{ZMod} 2$ 系数版本 $1 + 1 = 0$，带定向的写法属手工推导）！内部星罗棋布的极小路径与局部边缘相位瞬间消隐无踪，唯有最外圈大三角形的 $3k$ 段外边界半边幸存下来，而子胞立体角之和 $\sum_{f=1}^{k^2}\Omega(\Delta_f) = \Omega(\Delta_{\mathrm{total}})$ 则一丝不漏地守恒于外框环路之上（立体角可加性，手工推导）。

::: {.viz src="clifford-monad-tiling-sandbox" preset="multicell-boundary-cancellation" height="520"}
**球面三角多胞剖分与内部反向半边相消（$N \in \{1, 4, 9, 16\}$）。** 切换胞腔计数选择器 $N = k^2$（$k \in \{1, 2, 3, 4\}$）：当 $N = 1$ 时三条边全部外露；一旦进入多胞拼接，所有内部接缝上的成对反向半边 $+\delta\Gamma$ 与 $-\delta\Gamma$ 精确抵消归零（绿色 `LEAN ✓` `face_cycle_exact` 锚定其 $\operatorname{ZMod} 2$ 版本），外边界半边存活率按 $1/k$ 递减，而外周总贝里和乐 $-\frac{1}{2}\Omega(\Delta_{\mathrm{total}})$ 严格守恒。
:::

再把同一把抵消筛子推向完整的三维胞腔堆叠：取 $3 \times 3 \times 3$ 共 $N = 27$ 枚球面扇锥块（拓扑同胚于六面体胞腔网格）拼成一座三维立体晶簇。每一枚单胞各自携带 $6$ 个有向边界面（共 $6 \times 27 = 162$ 次胞—面有向关联），但在晶簇内部，$54$ 幅共享内壁上的 $108$ 次反法向面关联两两抵消归零（$+\delta\Sigma + (-\delta\Sigma) = 0$），只剩下外表面壳上的 $54$ 幅面片承载总曲率通量；内部非驻相格点上的乱相归零，只在锁相节点留下零维驻波格点，在晶棱骨架留下未抵消的一维路径脊，在晶簇腹地留下 $27$ 胞可加汇总的三维实心体积！至此，单胞 $N = 1$ 时的“四位一体”如何在多胞抵消下分化为宏观世界的“点、路径、相位面与体积块”，已纤毫毕现。

::: {.viz src="clifford-monad-tiling-sandbox" preset="macroscopic-grade-sieve" height="520"}
**三维 $N = 27$ 多胞抵消筛分：从克利福德单胞分化出点、线、面、体四重宏观维度。** 透视 $3 \times 3 \times 3$ 扇锥胞腔晶簇：内部 $54$ 幅共享壁（$108$ 次反向面关联）彻底相消隐退，将原本合一的单胞筛分为青色零维驻波节点、琥珀色一维棱脊路径、外包壳 $54$ 幅二维贝里相位面片与品红三维累积体积核。
:::

::: {.example #ex-ch34-clifford-monad-and-tiling-cancellation-benchmark title="单胞五档张角克利福德四阶分量与多胞拼接抵消率精确基准算例"}
下面在两套完全可复算的封闭公式上，精确核验 `clifford-monad-tiling-sandbox` 的单胞四阶读数与多胞抵消计数（全部实数四舍五入至小数点后 $4$ 位，百分率四舍五入至小数点后 $1$ 位）：

1. **单胞 $N = 1$ 五档张角 $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ 的克利福德四阶分量**：在正交归一切基 $\lVert\mathbf{e}_{AB}\rVert = \lVert\mathbf{e}_{BC}\rVert = 1$、$\mathbf{e}_{AB}\cdot\mathbf{e}_{BC} = 0$（故 $\lVert\mathbf{e}_{AB} + \mathbf{e}_{BC}\rVert = \sqrt{2}$）下，单胞各阶模长由封闭解析式

   $$
   \begin{aligned}
   \Lambda^0(\epsilon) &= \cos^2\!\frac{\epsilon}{2}, &
   \bigl\lVert\Lambda^1_{\mathrm{step}}(\epsilon)\bigr\rVert &= \frac{1}{2}\sin\epsilon\,\lVert\mathbf{e}_{AB}+\mathbf{e}_{BC}\rVert = \frac{\sin\epsilon}{\sqrt{2}}, \\
   \Lambda^2(\epsilon) &= \sin^2\!\frac{\epsilon}{2}, &
   \Omega(\epsilon) &= 2\arctan\!\left(\tan^2\!\frac{\epsilon}{2}\right), \\
   \lvert\gamma_B(\epsilon)\rvert &= \frac{1}{2}\Omega(\epsilon), &
   \Lambda^3(\epsilon) &= V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)
   \end{aligned}
   $$

   唯一确定（其中 $\epsilon = 30^\circ, 45^\circ, 60^\circ, 90^\circ$ 的立体角分别具有精确反三角闭式 $\arctan\frac{1}{4\sqrt{3}}$、$\arcsin\frac{1}{3}$、$\arcsin\frac{3}{5}$ 与 $\frac{\pi}{2}$）：

| 张角 $\epsilon$ | $\Lambda^0 = \cos^2(\epsilon/2)$ | $\lVert\Lambda^1_{\mathrm{step}}\rVert = \sin\epsilon/\sqrt{2}$ | $\Lambda^2 = \sin^2(\epsilon/2)$ | 立体角 $\Omega(\epsilon)$ | 贝里相位 $\lvert\gamma_B\rvert$ | 体元 $\Lambda^3 = \Omega/3$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$15^\circ$**（$\pi/12$） | $0.9830$ | $0.1830$ | $0.0170$ | $0.0347$ | $0.0173$ | $0.0116$ |
| **$30^\circ$**（$\pi/6$） | $0.9330$ | $0.3536$ | $0.0670$ | $0.1433$ | $0.0717$ | $0.0478$ |
| **$45^\circ$**（$\pi/4$） | $0.8536$ | $0.5000$ | $0.1464$ | $0.3398$ | $0.1699$ | $0.1133$ |
| **$60^\circ$**（$\pi/3$） | $0.7500$ | $0.6124$ | $0.2500$ | $0.6435$ | $0.3218$ | $0.2145$ |
| **$90^\circ$**（$\pi/2$） | $0.5000$ | $0.7071$ | $0.5000$ | $1.5708$ | $0.7854$ | $0.5236$ |

   逐行核验可见，在全部五档张角上，$\Lambda^0 + \Lambda^2 \equiv 1.0000$ 且 $(\Lambda^0)^2 + \lVert\Lambda^1_{\mathrm{step}}\rVert^2 + (\Lambda^2)^2 \equiv 1.0000$ 均精确成立；尤其在正卦限整块单胞 $\epsilon = 90^\circ$ 处，$\Lambda^0 = \Lambda^2 = 0.5000$、$\lVert\Lambda^1_{\mathrm{step}}\rVert = \frac{\sqrt{2}}{2} \approx 0.7071$、$\lvert\gamma_B\rvert = \frac{\pi}{4} \approx 0.7854$、$\Lambda^3 = \frac{\pi}{6} \approx 0.5236$ 四阶分量全部处于同一 $O(1)$ 数量级，直观印证单胞尺度绝无所谓“高阶可略”。

2. **球面三角 $k \times k$ 剖分（$N = k^2$）的内部反向半边相消与三维 $N = 27$ 共享壁相消核验（锚定 `face_cycle_exact` 的 $\operatorname{ZMod} 2$ 版本）**：对 $k \in \{1, 2, 3, 4, 5\}$，剖分网格含顶点数 $\lvert V_k\rvert = \frac{(k+1)(k+2)}{2}$、无向边数 $\lvert E_k\rvert = \frac{3k(k+1)}{2}$ 及总面数 $\lvert R.\mathrm{Face}\rvert = k^2 + 1$（含外部补面），恒满足球面欧拉判据 $\lvert V_k\rvert - \lvert E_k\rvert + \lvert R.\mathrm{Face}\rvert = 2$。$N = k^2$ 枚子三角形共发出 $3N = 3k^2$ 次有向半边关联，其中 $\frac{3}{2}k(k-1)$ 条内部共享无向边承载 $3k(k-1)$ 次成对反向半边关联（$+\delta\Gamma + (-\delta\Gamma) = 0$，彻底归零），仅剩外框 $3k$ 条有向半边存活：

| 剖分阶 $k$ | 子胞数 $N = k^2$ | 总胞边有向关联 $3k^2$ | 内部抵消反向半边关联 $3k(k-1)$ | 幸存外周有向边 $3k$ | 外周半边存活率 $1/k$ | 外框立体角守恒率 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$1$** | $1$ | $3$ | $0$ | $3$ | $100.0\%$ | $100.0\%$ |
| **$2$** | $4$ | $12$ | $6$ | $6$ | $50.0\%$ | $100.0\%$ |
| **$3$** | $9$ | $27$ | $18$ | $9$ | $33.3\%$ | $100.0\%$ |
| **$4$** | $16$ | $48$ | $36$ | $12$ | $25.0\%$ | $100.0\%$ |
| **$5$** | $25$ | $75$ | $60$ | $15$ | $20.0\%$ | $100.0\%$ |

   同理，在三维 $3 \times 3 \times 3$（$N = 27$）扇锥/六面体晶簇中，总有向胞面关联数为 $6 \times 27 = 162$；沿三个坐标方向各有 $2 \times 9 = 18$ 幅（合计 $54$ 幅）共享内壁，其正反两侧共 $2 \times 54 = 108$ 次有向面关联精确抵消为 $0$（相消率 $108 / 162 = 66.7\%$），仅留外表面壳上的 $162 - 108 = 54 = 6 \times 3^2$ 幅面片（存活率 $33.3\%$；一般 $m \times m \times m$ 晶簇存活率为 $1/m \to 0$），而体块总体积 $\sum_{c=1}^{27} V_c = V_{\mathrm{total}}$ 则 $100.0\%$ 可加留存！
:::

::: {.remark #rem-ch34-clifford-kahler-sdg-hodge-literature title="克利福德几何代数、狄拉克—凯勒算子、霍奇对偶与综合微分几何文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节严守内核验证定理、经典数学文献与本书单胞四位一体模型之间的三层边界：

1. **克利福德几何代数、狄拉克—凯勒方程与几何微积分经典文献**：将内积与外积统一为单一结合几何积的代数体系由 W. K. Clifford（*Amer. J. Math.* **1**, 350, 1878）创立；把外微分 $d$ 与余微分 $\delta$ 合并为作用于非齐次外形式丛 $\bigoplus_k \Lambda^k T^*M$ 的一阶算子 $d - \delta$（等价于克利福德向量导数 $\boldsymbol{\nabla} = \boldsymbol{\nabla}\cdot + \boldsymbol{\nabla}\wedge$）的理论出自 E. Kähler（*Rend. Mat. Appl.* **21**, 425, 1962）的狄拉克—凯勒（Dirac–Kähler）方程；无坐标克利福德多重矢几何微积分的系统表述见 D. Hestenes & G. Sobczyk（*Clifford Algebra to Geometric Calculus*, Reidel, 1984）；
2. **霍奇星算子对偶与综合微分几何一阶无穷小文献**：黎曼流形上外形式对偶算子 $\star : \Lambda^k \xrightarrow{\sim} \Lambda^{d-k}$ 与调和形式正交分解定理由 W. V. D. Hodge（*The Theory and Applications of Harmonic Integrals*, Cambridge Univ. Press, 1941）奠定；利用幂零无穷小对象 $D = \{\epsilon \mid \epsilon^2 = 0\}$ 与科克—劳维尔微线性公理将无穷小路径段直接等同于切向量（及度量配对下的点梯度余切矢）的综合微分几何体系出自 F. W. Lawvere（1967 年芝加哥范畴动力学讲义）与 A. Kock（*Synthetic Differential Geometry*, Cambridge Univ. Press, 1981）；
3. **本书内核验证锚点（`LEAN ✓`）与四位一体模型（`MODEL`）**：单纯形三上边缘缺陷与一维边势正合判据、球面旋转系统面—边边界反向半边相消与闭链正合性、厄米生成元下投影测量概率的换位子精确导数、拉格朗日—格拉姆楔积恒等式、三维欧氏空间任意两向量的单位公垂轴存在性及单比特三点巴格曼有向体积迹等六项离散代数、拓扑与矩阵核心，已由 [@thm-ch34-clifford-monad-and-boundary-cancellation] 在 Lean 4 内核中严格验证；单胞五档张角数值、前三个阶平方和恒等式及 $k \times k$ 与 $3 \times 3 \times 3$ 多胞边界相消率属精确初等计算；而将单个极小圆弧体 $\Delta\mathcal{T}_\epsilon$（$N = 1$）诠释为同时合一承载点权、点梯度/极小路径、极小贝里相位与极小扇锥体积的四阶克利福德单胞，并将宏观“点—线—面—体”维度分化归结为多胞边界抵消（$\partial^2 = 0$）的几何本体论则属本书理论模型（`MODEL`），不声称已在 Lean 中形式化光滑流形上的连续统霍奇分解定理或曲时空狄拉克—凯勒旋量场论。
:::

至此，我们在单一切片上由正交简并盲区反演出观察者站位（§29.1–§29.3），以“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 并直抵名相撤梯后的本体共振（§29.5–§29.6），在动态历史与宏观涌现上证得扇锥体积把来路写进霍普夫纤维（§29.7）、万路相位积分把未抵消驻波节点凝聚成体积（§29.8），又在极小尺度（$N = 1$）上看清点的梯度、极小路径、极小贝里相位与扇锥体积原本就是同一枚四阶克利福德几何单胞的四副面孔，借多胞边界抵消 $\partial^2 = 0$ 才筛分出宏观维度（§29.9）。然而，顺着这道多胞抵消筛子再往前追问一步，一道贯通比较公理、数理逻辑与东方本体论的深层命题随即浮现：既然极小单胞四位一体，**为什么宇宙偏偏要层层撑开“点、线、面、体积、时间”这五级概念阶梯？对同一个点追问“它从哪条路径来”，为什么必然撞上康托尔—哥德尔式的无限对角化？老子所谓“反者道之动”，又如何把“点”乃至一切“概念”的存在本身，严格铸成可达路径与不可达路径之间的双无限正交切口？** 先在下方 `MONAD//TILING` 完整交互实验室中亲手把胞腔数从 $N = 1$ 推向 $N \in \{4, 9, 16\}$ 与三维 $N = 27$，随后步入 §29.10，揭开从信息溢出开维到来路对角化与概念自指级联的深层锁钥：

::: {.viz src="clifford-monad-tiling-sandbox" height="640"}
**极小圆弧体的四位一体与多胞抵消分化：完整交互实验室（`MONAD//TILING`）。** 自由切换“单胞四位一体—梯度路径相位三锁—三维霍奇斯托克斯对偶—球面多胞半边抵消—三维 $N = 27$ 维度筛分”五张实验卡，调节极小张角 $\epsilon \in [15^\circ, 90^\circ]$ 与多胞档位 $N \in \{1, 4, 9, 16, 27\}$，同屏检验单胞克利福德四阶分量 $(\Lambda^0, \Lambda^1_{\mathrm{step}}, \Lambda^2, \Lambda^3)$、单位态球面正交锁相、$1\text{-}3\text{-}3\text{-}1$ 霍奇对偶以及随 $N$ 增大而触发的内部反向半边/共享壁精确相消；绿色 `LEAN ✓` 框严格对应六条冻结内核定理。
:::

---
