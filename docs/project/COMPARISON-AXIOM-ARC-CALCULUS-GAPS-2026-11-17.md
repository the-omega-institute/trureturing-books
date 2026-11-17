# 比较公理与极小圆弧体微积分：中间假设缺口的推导

研究日期：2026-11-17。书库基线为 203f34bc8e2281f0f50d42f5328336b9fcbbd65c，trureturing 钉版为 4e2a0d3fcca69885dfcf5b56184838554ebb5239。

研究对象是[附录 E](../../books/quantum-geometry/zh/appendix-e.md) 审计出的九项中间假设 `H1`–`H9`，即零背景比较公理 $\mathcal{A}_0$（[§32.1](../../books/quantum-geometry/zh/ch32-s01-axiom-of-comparison.md)）与各学科公理之间的缺口；工具是 [§34.30](../../books/quantum-geometry/zh/ch34-s30-arc-body-calculus-and-finite-stokes.md) 的弦—矢高分解、有序乘积积分与有限网格上边缘。下文逐条给出陈述与证明，并标明每条属于手工推导、文献结果还是冻结依据。没有新增 Lean 验证结果，没有修改书稿或锁文件。

**主要结论。** `H2` 的三项几何条件（正自配对、椭圆负平方、多点 Gram 半正定）可以由两条更原始的条件推出：第三点冗余 $\mathrm{CMP}(x,y)\,\mathrm{CMP}(y,z)=\mathrm{CMP}(x,z)$ 与对合的正性。弦—矢高锁死、三点和乐的比安基恒等式与扇形斯托克斯恒等式只用条款 III 就成立，属于第 0 层。附录 E 的成对反例在同一个代数 $(M_2(\mathbb{C}),\operatorname{adj})$ 中恰好是 $\mathrm{SL}(2,\mathbb{C})$ 的非椭圆共轭类，所以 `H2` 的签名分岔与 `H8` 的洛伦兹签名是同一处分岔。曲率不必作为额外输入：全比较平坦，半比较的三点和乐等于吉拉尔角盈。§34.30 中“伊藤项即矢高”“对偶数是模去矢高的商影”两处模型表述各有精确的代数陈述。

其中“第三点冗余推出势表示”及其稳定性在有限弦图上已是冻结定理（`IsChordal.exists_gain_potential`、`IsChordal.exists_approximate_gain_potential`），可以直接进入书稿的定理盒；其余各条目前是手工推导。

这两条条件是加在 $\mathcal{A}_0$ 上的新条款，不是从 $\mathcal{A}_0$ 推出的；本笔记证明的是“若加入则推出”。是否把它们写进 $\mathcal{A}_0$ 属于作者的建模选择。多数单条结论在各自领域是经典结果，这里的工作是把它们接到比较公理的条款上并给出完整证明，不作数学新颖性主张。

## 0. 约定

$\mathcal{A}$ 是含幺结合代数，$2$ 可逆，带对合 $*$（$(ab)^*=b^*a^*$，$a^{**}=a$）。元素 $u$ 称为**公平元**，若 $uu^*=u^*u=1$。条款 II 给出 $\mathrm{CMP}(y,x)=\mathrm{CMP}(x,y)^*$，条款 III 对每个有序对成立，所以每个 $u=\mathrm{CMP}(x,y)$ 都是公平元。对公平元记

$$
S=\tfrac12(u+u^*),\qquad A=\tfrac12(u-u^*),\qquad v=1-S,\qquad \Delta=u-1 .
$$

$S$ 是求同通道，$A$ 是求异通道，$v$ 称为**矢高**，$\Delta$ 称为**割弦**。$S^*=S$，$A^*=-A$，$\Delta=A-v$。

对三点记**三点和乐** $h(x,y,z)=\mathrm{CMP}(x,y)\,\mathrm{CMP}(y,z)\,\mathrm{CMP}(z,x)$。下文把 $\mathrm{CMP}(x,y)$ 简写为 $c_{xy}$。

## 1. 单对比较：弦—矢高锁死属于第 0 层

### R1 对易与锁死（手工推导）

对任意公平元：

1. $SA=AS$；
2. $S^2-A^2=1$；
3. $A^2=-v(2-v)$；
4. $\Delta^*\Delta=\Delta\Delta^*=2v$。

反之，若 $S^*=S$、$A^*=-A$、$SA=AS$ 且 $S^2-A^2=1$，则 $S+A$ 是公平元。

证明。$uu^*=(S+A)(S-A)=S^2-SA+AS-A^2=1$，$u^*u=(S-A)(S+A)=S^2+SA-AS-A^2=1$。两式相减得 $2(AS-SA)=0$，$2$ 可逆，故对易；相加得第 2 款。第 3 款是 $A^2=S^2-1=-(1-S)(1+S)$。第 4 款：$\Delta^*\Delta=u^*u-u^*-u+1=2-2S$，另一侧同理。反向直接展开。$\square$

两点说明。其一，§32.1 条款 III 之后把“$S$ 与 $A$ 对易”写成特殊情形；它其实是条款 III 对 $(x,y)$ 与 $(y,x)$ 同时成立的推论。其二，§34.30.1 的恒等式 $(1-v_\epsilon)^2+c_\epsilon^2=1$ 与 $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ 是第 2、4 款在 $A=c_\epsilon\hat{\mathbf B}$ 时的特例，因此不依赖第 1 层的三角函数实现，在第 0 层已经成立。取 $v=1$（$S=0$）时第 3 款给出 $A^2=-1$：反自伴的公平元平方为 $-1$。它的复矩阵情形是冻结定理 `square_eq_neg_one_of_skewAdjoint_unitary`。

### R2 签名由矢高的位置决定（手工推导）

设 $\mathcal{A}$ 是实代数，$S=s\cdot 1$ 为实标量，$v=1-s$。由 R1 第 3 款，$A^2=-v(2-v)\cdot 1$，因而

| 矢高 | $A^2$ | 子代数 $\mathbb{R}[A]$（$A\neq0$） | 附录 E 反例 |
| --- | --- | --- | --- |
| $0<v<2$ | 负 | $\mathbb{C}$，椭圆 | 第 1 层 |
| $v\in\{0,2\}$ | $0$ | 对偶数，抛物 | $1\pm\varepsilon$，$v=0$ |
| $v<0$ 或 $v>2$ | 正 | 分裂复数，双曲 | $\cosh\eta\pm j\sinh\eta$，$v=1-\cosh\eta<0$ |

称对合满足**正性条件** $(\mathrm{Pos})$，若 $a^*a=-t\cdot1$ 且 $t\ge0$ 时必有 $a=0$。

命题。若 $(\mathrm{Pos})$ 成立，则每个标量相似的公平元 $u\neq\pm1$ 都满足 $0<v<2$，并可写成 $u=\cos\theta+J\sin\theta$，其中 $\theta=\arccos s\in(0,\pi)$，$J=A/\sin\theta$，$J^*=-J$，$J^2=-1$。

证明。$\Delta^*\Delta=2(1-s)$。若 $s\ge1$，取 $t=2(s-1)$ 得 $\Delta=0$，即 $u=1$。对公平元 $-u$ 重复同一论证，$s\le-1$ 时 $u=-1$。其余情形 $-1<s<1$，$A^2=-(1-s^2)$。$\square$

$(\mathrm{Pos})$ 在对偶数上失败（$\varepsilon^*\varepsilon=0$），在分裂复数上失败（$j^*j=-1$），恰好是两个反例。它在以下情形成立：$C^*$-代数；带忠实正泛函 $\varphi$（$\varphi(a^*a)\ge0$，等号仅当 $a=0$）的 $*$-代数。在 $C^*$-代数中还有不依赖标量假设的算子不等式 $0\le v\le2$，因为 $2v=\Delta^*\Delta$，$2(2-v)=(u+1)^*(u+1)$。

因此 `H2` 中“秩 2 简单双向量椭圆负平方”一项可以换成一条只涉及往返的条件：**非零的差异，其往返 $a^*a$ 不为零也不为负**。

### R3 四种签名同处一个代数（手工推导；分类为文献结果）

把 $M_2(\mathbb{C})$ 看作实代数，取对合为经典伴随 $a^\sharp=\operatorname{adj}(a)=\operatorname{tr}(a)\cdot1-a$。它是反自同构，$aa^\sharp=\det(a)\cdot1$。于是：

1. 公平元恰为 $\mathrm{SL}(2,\mathbb{C})$；
2. 每个公平元的 $S=\tfrac12\operatorname{tr}(u)\cdot1$ 自动落在中心，矢高 $v=1-\tfrac12\operatorname{tr}u\in\mathbb{C}$；
3. $u\neq\pm1$ 时：$v\in(0,2)$ 椭圆，$v\in\{0,2\}$ 抛物，$v\in\mathbb{R}\setminus[0,2]$ 双曲，$v\notin\mathbb{R}$ 斜驶；
4. 再要求对厄米共轭也公平（$uu^\dagger=1$），公平元缩为 $\mathrm{SU}(2)$，只剩椭圆类。

第 3 款是莫比乌斯变换按 $\operatorname{tr}^2$ 的经典分类（$\operatorname{tr}u=2(1-v)$）。附录 E 的成对反例都嵌入这个代数：$\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$，$j\mapsto\operatorname{diag}(1,-1)$，椭圆生成元 $\mapsto\operatorname{diag}(i,-i)$，三者都满足 $g^\sharp=-g$，平方分别为 $0,+1,-1$。实 $2\times2$ 无迹生成元的这三种正规形（迹为零，行列式为负、零、正，平方为正标量、零、负标量）已有冻结定理 `elliptic_hyperbolic_reflection_trichotomy`；按矢高对一般公平元分类的陈述在冻结库中没有。

$\mathrm{SL}(2,\mathbb{C})$ 通过 $X\mapsto uXu^\dagger$ 作用在厄米矩阵 $X=t+\mathbf{x}\cdot\boldsymbol\sigma$ 上并保持 $\det X=t^2-\lvert\mathbf{x}\rvert^2$，这是洛伦兹群的旋量覆盖（文献结果）；零锥决定二次型到一个标量倍，见冻结定理 `eq_smul_minkowski_of_null`。由此得到对 `H2` 与 `H8` 的一个统一读法：**第 0 层允许的非椭圆分支不是病态模型，它们就是洛伦兹变换的抛物、双曲与斜驶类；选椭圆签名（`H2`）与选洛伦兹签名（`H8`）是同一个代数里对合正性的取舍。** 取正对合 $\dagger$ 得到紧致的转动，取 $\operatorname{adj}$ 得到全体洛伦兹变换。

附录 E 反例 (c) 的非简单双向量 $B=e_1e_2+e_3e_4$ 属于另一种情形：$B^2=-2+2e_1e_2e_3e_4$ 说明求同通道离开了实标量而落在偶子代数的中心 $\mathbb{R}\oplus\mathbb{R}e_{1234}$ 里。它不是两点比较 $xy$ 的求异部分，只会出现在四个向量的复合比较中。

## 2. 三点：比安基与斯托克斯只需要条款 III

本节不假设链式律，只用 $c_{yx}=c_{xy}^{-1}$。

### R4 三点和乐的比安基恒等式（手工推导）

对任意四点，

$$
h(x,y,z)\,h(x,z,w)\,h(x,w,y)=c_{xy}\,h(y,z,w)\,c_{yx}.
$$

证明。$h(x,y,z)h(x,z,w)=c_{xy}c_{yz}(c_{zx}c_{xz})c_{zw}c_{wx}=c_{xy}c_{yz}c_{zw}c_{wx}$。再右乘 $h(x,w,y)=c_{xw}c_{wy}c_{yx}$，中间的 $c_{wx}c_{xw}=1$ 消去，得 $c_{xy}(c_{yz}c_{zw}c_{wy})c_{yx}$。$\square$

四面体的三个过 $x$ 的面按序相乘，等于第四个面沿棱 $c_{xy}$ 搬到 $x$。这是 §34.30.3 “$d_\epsilon^2=0$”的非阿贝尔形式，在任意有限孔径下精确成立。$\mathcal{A}$ 交换时右端的共轭消失；取相位 $F=\arg h$ 即得冻结定理 `tetra_defects_incidence_repair_and_exactness` 中的四面体条件 $F(i,j,k)-F(r,j,k)+F(r,i,k)-F(r,i,j)=0$，该定理进一步断言这个条件等价于 $F$ 是某个边势的上边缘。

### R5 扇形斯托克斯恒等式与次可加（手工推导）

对任意闭链 $x_0,x_1,\dots,x_n,x_0$，

$$
c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{n-1}x_n}c_{x_nx_0}=\prod_{k=1}^{n-1}h(x_0,x_k,x_{k+1})\quad(\text{按 }k\text{ 递增的次序}).
$$

证明。右端相邻两因子之间是 $c_{x_{k+1}x_0}c_{x_0x_{k+1}}=1$，逐对消去。$\square$

§34.30.3 把非阿贝尔面斯托克斯定理列为文献结果，并指出需要生成树锚定与剥壳次序。在比较结构里任意两点都可比，顶点 $x_0$ 到各点的直接比较就是现成的锚线，生成树不必另选；这一特殊情形有上面两行的完整证明。一般胞腔复形上的版本仍是文献结果。

在 $C^*$-代数中 $\lVert u-1\rVert^2=2\lVert v\rVert$（R1 第 4 款加 $C^*$ 恒等式），且对酉元 $\lVert ab-1\rVert\le\lVert a-1\rVert+\lVert b-1\rVert$。因此

$$
\sqrt{\lVert v_{\partial}\rVert}\le\sum_{k=1}^{n-1}\sqrt{\lVert v_k\rVert},
$$

其中 $v_\partial$ 是边界和乐的矢高，$v_k$ 是各扇形面和乐的矢高。矢高的平方根对复合次可加。$N$ 个矢高同为 $v$ 的因子复合后，总矢高不超过 $N^2v$；相干排列取到这个量级，随机排列的均值在 $Nv$ 的量级（见 R12、R13）。

## 3. 第三点冗余：从第 0 层到第 1 层

**条款 IV（第三点冗余）。** 对一切 $x,y,z$，$c_{xy}c_{yz}=c_{xz}$。等价地，一切三点和乐为 $1$。

它的含义与全书的出发点一致：比较 $x$ 与 $z$ 不因取道第三点 $y$ 而改变。第 1 层的克利福德实现 $c_{xy}=xy$（单位向量的几何积）满足它，因为 $xy\cdot yz=xz$；§32.1 对第 2 层的说明里已指出这一点。

### R6 锚定表示与乘积积分基本定理（手工推导）

设条款 II、III、IV 成立，$X$ 非空。

1. $c_{xx}=1$。因此负自配对反例 $\mathrm{CMP}(x_0,x_0)=-1$ 被条款 IV 排除，`H2` 的“正自配对”不再是独立条件。
2. 任取锚点 $o$，令 $g_x=c_{ox}$。则 $g_x$ 是公平元，且 $c_{xy}=g_x^*g_y$。
3. 满足第 2 款的 $g$ 在左乘一个固定公平元的意义下唯一。
4. 条款 I 的不可分关系即 $g_x=g_y$；比较外延商 $X/{\sim}$ 单射到公平元群。
5. 对任意采样路径，$c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$。

证明。IV 取 $y=z=x$ 得 $c_{xx}^2=c_{xx}$，III 给 $c_{xx}^2=1$，故 $c_{xx}=1$。第 2 款：$c_{xy}=c_{xo}c_{oy}$，而 $c_{xo}=c_{ox}^*$。第 3 款：若 $c_{xy}=g_x'^*g_y'$，则 $g'_xg_x^*$ 与 $x$ 无关。第 4 款：$c_{xz}=c_{yz}$ 对一切 $z$ 成立当且仅当 $g_x^*=g_y^*$。第 5 款对 $N$ 归纳。$\square$

在条款 IV 下，条款 III 等价于 $c_{xx}=1$。第 4 款说明：选定锚点之后，每个对象就是把锚点带到它的那个旋子。第 5 款是有序乘积积分的牛顿—莱布尼茨公式，在任意有限孔径下精确成立，不需要细分极限；反过来，一切采样路径的乘积只依赖端点，当且仅当条款 IV 成立。偏离平坦时，偏差由 R5 的扇形和乐乘积给出。

第 2 款在有限点集上已有更强的冻结定理 `IsChordal.exists_gain_potential`：系数取任意群，链式律只需在一张有限弦图的三角形上成立，结论是相邻点对上的势表示 $c_{xy}=\varphi_x^{-1}\varphi_y$。完全图是弦图，所以它覆盖有限 $X$ 上的第 2 款；更重要的是它说明**不必两两可比**：只要可比关系构成弦图、每个可比三角形平坦，锚定表示就存在。这与 [§29.3](../../books/quantum-geometry/zh/ch29-s03-timeless-gram-causality.md) 用弦图做局部到整体的半正定补全是同一种组合条件。交换群系数、连通群胚上的版本见 `closed_path_zero_iff_exists_potential`；圆群相位的生成树输运与锚定分类见 `selected_tree_transport`、`anchored_phase_classification`。上面的手工证明对无限 $X$ 仍然需要。

### R7 Gram 半正定与弦距（手工推导；逆向为文献结果）

设条款 II–IV 成立，$\varphi$ 是 $\mathcal{A}$ 上的正泛函，$\varphi(1)=1$。对任意有限点组 $x_1,\dots,x_m$：

1. $K_{ij}=\varphi(c_{x_ix_j})$ 是厄米半正定矩阵，$G_{ij}=\varphi(S(x_i,x_j))=\operatorname{Re}K_{ij}$ 是对角元为 $1$ 的实对称半正定矩阵；
2. $d(x,y)^2:=2\varphi(v(x,y))=\varphi(\Delta_{xy}^*\Delta_{xy})$ 是希尔伯特空间距离的平方：在 $\varphi$ 的 GNS 表示中 $d(x,y)=\lVert\pi(g_y)\Omega-\pi(g_x)\Omega\rVert$。特别地 $d$ 满足三角不等式。

证明。$\sum_{i,j}\bar a_ia_j\varphi(g_i^*g_j)=\varphi\bigl((\sum_ia_ig_i)^*(\sum_ja_jg_j)\bigr)\ge0$；对实系数，二次型只看到实部。第 2 款：$g_y-g_x=g_x\Delta_{xy}$，故 $\lVert(\pi(g_y)-\pi(g_x))\Omega\rVert^2=\varphi(\Delta_{xy}^*g_x^*g_x\Delta_{xy})=\varphi(\Delta_{xy}^*\Delta_{xy})$。$\square$

逆向：任给实内积空间中的单位向量组，克利福德比较 $c_{xy}=xy$ 对反转对合公平、满足条款 IV，标量部分是正泛函且读数为 $x\cdot y$。所以对角元为 $1$ 的实对称矩阵半正定，当且仅当它是某个平坦公平比较在某个正泛函下的求同读数表。

冻结库中的对应部分：向量组的复 Gram 矩阵半正定见 `gramPsd`；半正定算子可分解为 $O^\dagger O$ 见 `gram_realizability`；第 2 款的距离侧，即半正定矩阵 $A$ 的平方距离 $A_{ii}+A_{jj}-2A_{ij}$ 是条件负定核、其高斯核半正定，见 `gram_distance_conditionally_negative` 与 `gram_gaussian_posSemidef`（有限 Schoenberg 定理的一个方向）。本条新增的只是从条款 IV 到这些对象的连接。

于是 `H2` 的三项条件与 `H3` 的内积来源收拢为：

$$
\text{第 1 层的读数}\iff\text{第 0 层}+\text{条款 IV}+\text{正泛函};\qquad \text{椭圆签名}\Longleftarrow(\mathrm{Pos}).
$$

`H3` 中“平行四边形极化对称”一项在这里是结论：弦距来自 GNS 内积。柯西完备化仍按 `T1` 处理。

附录 E 反例 (d)（$S_{01}=S_{02}=\tfrac{\sqrt3}{2}$，$S_{12}=-1$，$\det S=-3$）可以用 $\mathrm{U}(1)$ 值比较 $c_{01}=c_{02}=e^{i\pi/6}$、$c_{12}=-1$ 实现，其三点和乐 $c_{01}c_{12}c_{20}=-1$。它满足条款 II、III，违反的正是条款 IV。四个反例的归属：

| 附录 E 反例 | 满足 II、III | 违反 |
| --- | --- | --- |
| (a) 单点 $\mathrm{CMP}=-1$ | 是 | 条款 IV |
| (b) 对偶数、分裂复数 | 是 | $(\mathrm{Pos})$ |
| (c) 非简单双向量 | 不是两点比较 | 求同通道非实标量 |
| (d) $3\times3$ 表 | 是 | 条款 IV |

### R8 近似平坦给出近似半正定（手工推导）

设条款 II、III 成立且 $c_{xx}=1$，$\mathcal{A}$ 是 $C^*$-代数，$\varphi$ 是态。固定锚点 $o$，令

$$
\delta_o=\max_{i,j}\lVert c_{x_ix_j}-c_{x_io}c_{ox_j}\rVert=\max_{i,j}\lVert h(x_i,o,x_j)-1\rVert .
$$

则 $m$ 点求同读数表满足 $\lambda_{\min}(G)\ge-(m-2)\,\delta_o$。

证明。写 $c_{ij}=g_i^*g_j+E_{ij}$，$g_i=c_{oi}$。$[\operatorname{Re}\varphi(g_i^*g_j)]$ 半正定。扰动矩阵 $F_{ij}=\operatorname{Re}\varphi(E_{ij})$ 对称，$\lvert F_{ij}\rvert\le\delta_o$，对角元与锚点所在的行列为零，每行至多 $m-2$ 个非零元；由盖尔圆定理 $\lVert F\rVert\le(m-2)\delta_o$。$\square$

Gram 矩阵的负特征值被三点和乐的弦范数控制。反例 (d) 中 $\delta_o=2$，$m=3$，界为 $-2$，实际最小特征值为 $\tfrac{1-\sqrt7}{2}\approx-0.823$。

势表示本身的稳定性已有冻结定理 `IsChordal.exists_approximate_gain_potential`：在带双不变度量的群里，若有限弦图上每个三角形的链式律偏差不超过 $\varepsilon$，则存在势 $\varphi$ 使每条边上 $\operatorname{dist}(c_{xy},\varphi_x^{-1}\varphi_y)\le(\lvert V\rvert-2)\varepsilon$。同一个因子 $m-2$ 在两处出现的原因相同：除两个端点外，每多一个点至多累积一份三点偏差。R8 是把这类偏差传到读数表的特征值上。

## 4. 曲率来自半比较

条款 IV 让一切三点和乐为 $1$，球面角盈、贝里相位这些曲率量却确实存在。两者并不冲突：平坦的是全比较，弯曲的是它的平方根。

### R9 半比较的和乐等于吉拉尔角盈（手工推导；公式为文献结果）

对标量相似 $s>-1$ 的公平元，$(1+u)^2=2(1+s)u$（由 $u^2=2su-1$），故

$$
r(u)=\frac{1+u}{\sqrt{2(1+s)}}
$$

是公平元且 $r(u)^2=u$。它的相似度满足 $S(r)^2=\tfrac{1+s}{2}=1-\tfrac v2$：**半比较相似度的平方等于 $1$ 减半矢高**，在布洛赫球上就是玻恩权重 $\cos^2(\theta/2)$。

在 $\mathcal{Cl}_{3,0}$ 中取两两不对径的单位向量 $a,b,c$，$r_{ab}=r(ab)$。则 $r_{ab}\,b\,r_{ab}^{\sim}=a$（沿大圆弧把 $b$ 输运到 $a$），并且

$$
r_{ab}r_{bc}r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}},\qquad [a,b,c]=a\cdot(b\times c),
$$

其中 $\mathbf{I}=e_1e_2e_3$。右端形如 $\cos\tfrac\Omega2+\sin\tfrac\Omega2\,\mathbf{I}a$，是绕 $a$ 的旋子，其中

$$
\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\;1+a\cdot b+b\cdot c+c\cdot a\bigr)\in(-\pi,\pi],\qquad\text{分母为正时即 }\tan\frac\Omega2=\frac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}.
$$

$\lvert\Omega\rvert$ 是球面三角形 $abc$ 的面积，即吉拉尔角盈；$\Omega$ 的符号由 $a,b,c$ 的定向 $[a,b,c]$ 的符号给出。同时全比较满足 $ab\cdot bc\cdot ca=1$。

证明。展开 $(1+ab)(1+bc)(1+ca)=2+ab+ba+ca+ac+bc+a(bc)a$，其中用到 $ab\cdot bc=ac$、$bc\cdot ca=ba$、$ab\cdot ca=a(bc)a$、$ab\cdot bc\cdot ca=1$。标量部分为 $2(1+a\cdot b+b\cdot c+c\cdot a)$。双向量部分为 $b\wedge c+a(b\wedge c)a$；记 $b\wedge c=\mathbf{I}n$，$n=b\times c$，则 $a\,\mathbf{I}n\,a=\mathbf{I}(2(a\cdot n)a-n)$，两项之和为 $2(a\cdot n)\mathbf{I}a$。模长由公平性决定。转角公式是 van Oosterom–Strackee 与 Eriksson 的立体角公式。$\square$

归一化给出恒等式 $(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)$。与 $\det G(a,b,c)=[a,b,c]^2$ 联立：

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega).
$$

三点 Gram 行列式等于三个互补矢高之积乘以角盈的矢高（球面三角学中 Cagnoli 公式的等价形式）。§32.1 “二生三”原胞的 $\det G=\sin^4\epsilon$ 是它的特例。$\det G$ 的展开式与正性判据见冻结定理 `three_anchor_gram_det_formula`、`three_anchor_gram_det_pos_iff`；分子 $1+a\cdot b+b\cdot c+c\cdot a$ 与 $[a,b,c]$ 正是冻结定理 `triple_bargmann_bloch` 中 $4\operatorname{Tr}(P_aP_bP_c)$ 的实部与虚部，所以三点巴格曼相位的大小是 $\Omega/2$。

对 `H8` 的含义：第 1 层内生的射影和乐不需要新的输入，它是条款 IV 之下全比较开平方的必然产物；需要第 2 层新输入的仍然是随时空基点变化的纤维联络与其动力学。

## 5. 移位旋子：差分、伊藤项与复步

### R10 移位算子的弦—矢高分解（手工推导；差分恒等式为文献结果）

设 $T_\delta f(x)=f(x+\delta)$，对合取 $T_\delta^*=T_{-\delta}$。$T_\delta$ 是公平元，

$$
S_\delta f=\tfrac12\bigl(f(x+\delta)+f(x-\delta)\bigr),\qquad A_\delta f=\tfrac12\bigl(f(x+\delta)-f(x-\delta)\bigr),\qquad \hat v_\delta=1-S_\delta .
$$

1. $f(x+\delta)=f(x)+A_\delta f(x)-\hat v_\delta f(x)$，对任意函数精确成立；
2. $A_\delta^2=S_\delta^2-1=-\hat v_\delta(2-\hat v_\delta)$；
3. $\hat v_\delta=-\tfrac12\times$（二阶中心差分），即离散拉普拉斯算子的 $-\tfrac12$ 倍；
4. 若 $\xi=\pm\delta$ 各以概率 $\tfrac12$ 出现，则 $\mathbb{E}f(x+\xi)-f(x)=-\hat v_\delta f(x)$；独立 $N$ 步之后 $\mathbb{E}f(x+\xi_1+\dots+\xi_N)=(1-\hat v_\delta)^Nf(x)$；
5. 若 $f\in C^4$，则 $\bigl\lvert\hat v_\delta f(x)+\tfrac{\delta^2}{2}f''(x)\bigr\rvert\le\tfrac{\delta^4}{24}\sup_{[x-\delta,x+\delta]}\lvert f''''\rvert$。

证明。第 1–3 款是 R1 用于 $T_\delta$；第 2 款即差分演算中的 $\mu^2=1+\tfrac14\delta_c^2$（半步形式）。第 4 款是第 1 款取均值，奇部的均值为零。第 5 款用四阶泰勒公式的拉格朗日余项。$\square$

第 4 款是 §34.30.2 “伊藤修正项就是矢高”的精确形式：对称随机步的均值演化，其生成元恰为移位旋子的负矢高算子，这在任意有限步长下是恒等式，没有余项。取 $\delta=\sigma\sqrt\epsilon$，第 5 款给出 $-\hat v_\delta/\epsilon=\tfrac{\sigma^2}{2}\partial_x^2+O(\epsilon)$ 及显式误差常数。

复步求导在这套记号里是把步长转 $90^\circ$：对实轴上取实值的全纯函数，施瓦茨反射给出 $f(x-i\delta)=\overline{f(x+i\delta)}$，于是 $S_{i\delta}f=\operatorname{Re}f(x+i\delta)$，$A_{i\delta}f=i\operatorname{Im}f(x+i\delta)$。实步长的奇部只能靠相减取出；虚步长的奇偶两部分落在实部与虚部两个正交坐标里，对合（复共轭）替代了减法。

### R11 对偶数与伊藤代数是圆在单位元处的一阶与二阶射流（手工推导；二阶微积分为文献结果）

令 $R=\mathbb{R}[c,v]/(c^2-v(2-v))$，即圆 $(1-v)^2+c^2=1$ 的坐标环，$\mathfrak m=(c,v)$ 是单位元处的极大理想。

1. $\mathfrak m^2=(v)$，$\mathfrak m^3=(cv,v^2)$；一般地 $\mathfrak m^{2k}=(v^k)$，$\mathfrak m^{2k+1}=(cv^k,v^{k+1})$；
2. $R/\mathfrak m^2\cong\mathbb{R}[\varepsilon]/(\varepsilon^2)$；
3. $R/\mathfrak m^3$ 以 $1,c,v$ 为基，乘法表为 $c\cdot c=2v$，$c\cdot v=0$，$v\cdot v=0$；
4. $R/(v^k)\cong\mathbb{R}[c]/(c^{2k})$。

证明。$c^2=v(2-v)$、$cv$、$v^2$ 都在 $(v)$ 中，故 $\mathfrak m^2\subseteq(v)$；又 $2v=c^2+v^2\in\mathfrak m^2$。其余由 $\mathfrak m^{j+1}=\mathfrak m\cdot\mathfrak m^j$ 归纳。$R$ 作为 $\mathbb{R}[v]$-模以 $1,c$ 为基，故 $\dim R/(v^k)=2k$；在 $R/(v^k)$ 中 $2-v$ 可逆，$v=c^2(2-v)^{-1}$，所以 $c$ 生成整个商且 $c^{2k}=0$，按维数得同构。$\square$

第 2 款把 §34.30.1 的说法“$D_1$ 是模去矢高理想之后的一阶切向商影”变成等式：矢高生成的理想恰是 $\mathfrak m^2$，也是圆与它在单位元处切线的交的理想。第 3 款在 $c\leftrightarrow dW$、$2v\leftrightarrow dt$（$\sigma=1$）之下就是伊藤乘法表 $(dW)^2=dt$、$dW\,dt=0$、$(dt)^2=0$：伊藤规则是圆方程 $c^2=v(2-v)$ 模 $\mathfrak m^3$ 的读数。两者的关系是正合列 $0\to\mathfrak m^2/\mathfrak m^3\to R/\mathfrak m^3\to R/\mathfrak m^2\to0$，核由矢高张成。把伊藤微分看成二阶切向量是 Schwartz、Meyer 与 Émery 的二阶随机微分几何；这里给出的是它在圆上的显式坐标形式。对偶数一侧，“$a\mapsto a+\varepsilon D(a)$ 保持乘法当且仅当 $D$ 满足乘积法则”已有冻结定理 `dual_number_lift_preserves_mul_iff_product_rule`；它说明 $R/\mathfrak m^2$ 恰好承载莱布尼茨法则，而二阶项只能住在 $\mathfrak m^2/\mathfrak m^3$ 里。

### R12 累计矢高的非渐近界与均值旋子（手工推导）

令 $\theta_N=\sigma(T/N)^\alpha$，$\Sigma_{\mathrm{sag}}(N)=N(1-\cos\theta_N)$。由 $\tfrac{\theta^2}{2}-\tfrac{\theta^4}{24}\le1-\cos\theta\le\tfrac{\theta^2}{2}$，

$$
\frac{\sigma^2T^{2\alpha}}{2}N^{1-2\alpha}\Bigl(1-\frac{\theta_N^2}{12}\Bigr)\le\Sigma_{\mathrm{sag}}(N)\le\frac{\sigma^2T^{2\alpha}}{2}N^{1-2\alpha}.
$$

设 $T>0$。$N\to\infty$ 时：$\alpha>\tfrac12$ 趋于 $0$；$\alpha=\tfrac12$ 趋于 $\tfrac12\sigma^2T$；$0<\alpha<\tfrac12$ 且 $\sigma\neq0$ 时趋于 $+\infty$。这是 §34.30.2 四相区的定理形式，且对每个有限 $N$ 给出双侧界。发散一款需要 $\alpha>0$：$\alpha\le0$ 时步角不趋于零，$1-\cos\theta_N$ 可以反复回到零附近（例如 $\alpha=0$、$\sigma=2\pi$ 时累计矢高恒为零），下界中的因子 $1-\theta_N^2/12$ 也不再为正。

随机符号旋子游走 $u_N=\prod_{k=1}^{N}(\cos\theta+\eta_kJ\sin\theta)$（$\eta_k=\pm1$ 独立等概率，$J^2=-1$）满足 $\mathbb{E}u_N=(\cos\theta)^N=(1-v_\theta)^N$：弦在均值中抵消，矢高以 $1-v$ 的乘积存留。对 $0\le v<1$，

$$
\exp\!\Bigl(-\frac{Nv}{1-v}\Bigr)\le(1-v)^N\le\exp(-Nv).
$$

因此平均复合矢高 $1-\mathbb{E}S(u_N)$ 夹在 $1-e^{-\Sigma_{\mathrm{sag}}}$ 与 $1-e^{-\Sigma_{\mathrm{sag}}/(1-v_\theta)}$ 之间；$\alpha=\tfrac12$ 时两端同趋于 $1-e^{-\sigma^2T/2}$。§34.30.2 实验卡中的“伊藤纬圈 $(1-v_\epsilon)^N$”即此量。累计矢高是均值旋子收缩的指数。

冻结库中与此相邻的是 `BernoulliNoiseWalkGaussianLimit.result`：局域化量子伯努利噪声游走的位置分布弱收敛到标准高斯。极限 $(\cos(t/\sqrt n))^n\to e^{-t^2/2}$ 是该证明内部的一步，以私有引理的形式存在，不能单独引用；上面的有限 $N$ 双侧界与四相极限在冻结库中没有对应声明。

### R13 复合律：弹道与扩散（手工推导）

设 $u_1,u_2$ 是公平元且 $S_1,S_2$ 是中心元。则

$$
S_{12}=S_1S_2+\tfrac12\{A_1,A_2\},\qquad A_{12}=S_1A_2+S_2A_1+\tfrac12[A_1,A_2].
$$

求同通道收到反对易子，求异通道收到对易子的一半；后者是 §34.30.2 提到的马格努斯面积项的首项。矢高的复合律为 $v_{12}=v_1+v_2-v_1v_2-\tfrac12\{A_1,A_2\}$。同一平面内（$A_i=c_iJ$）得 $v_{12}=v_1+v_2-v_1v_2+c_1c_2$；正交平面内（$\{A_1,A_2\}=0$）得 $1-v_{12}=(1-v_1)(1-v_2)$。

$N$ 步相干复合的总矢高为 $1-\cos(N\theta)$，主项 $\tfrac12(N\theta)^2$ 来自交叉项 $\sum_{j<k}c_jc_k$；当 $N\theta=\kappa T$ 固定时它不依赖孔径，同时 $\Sigma_{\mathrm{sag}}=Nv\to0$。随机符号下交叉项均值为零，只剩 $1-v$ 的乘积。牛顿相与伊藤相的区别在于弦是否相干叠加，这与 R5 的平方根次可加的两端对应。

### R14 复步导数的有限孔径界（手工推导；估计方法为文献结果）

设 $f$ 在闭圆盘 $\overline{D(x_0,R)}$ 的邻域内全纯，在实轴上取实值，$M=\max_{\lvert z-x_0\rvert=R}\lvert f\rvert$，$0<\epsilon<R$。则

$$
\Bigl\lvert\frac{\operatorname{Im}f(x_0+i\epsilon)}{\epsilon}-f'(x_0)\Bigr\rvert\le\frac{M\epsilon^2}{R(R^2-\epsilon^2)},\qquad
\Bigl\lvert\frac{2\bigl(f(x_0)-\operatorname{Re}f(x_0+i\epsilon)\bigr)}{\epsilon^2}-f''(x_0)\Bigr\rvert\le\frac{2M\epsilon^2}{R^2(R^2-\epsilon^2)}.
$$

证明。泰勒系数 $a_k$ 为实数，柯西估计给出 $\lvert a_k\rvert\le M/R^k$。$\operatorname{Im}f(x_0+i\epsilon)=\sum_{j\ge0}(-1)^ja_{2j+1}\epsilon^{2j+1}$，去掉首项后按几何级数求和；实部同理。$\square$

§34.30.1 用渐近式 $-\tfrac{\epsilon^2}{6}f'''(x_0)+O(\epsilon^4)$ 描述截断误差，上式给出不含未定常数的界。对 Squire–Trapp 测试函数，离 $x_0=\tfrac\pi4$ 最近的奇点在虚方向，距离 $\tfrac12\operatorname{arccosh}2\approx0.658$；取 $R=0.5$ 时实际误差不超过界的 $11\%$。舍入误差不在此界之内。

## 6. 复合系统、记录与动力学

### R15 复合系统的奇偶计数与中心直角比较（手工推导；结论为文献结果）

设 $(\mathcal{A}_i,*)$ 是实 $*$-代数，$E_i$、$O_i$ 为自伴与反自伴部分。在 $\mathcal{A}_1\otimes_{\mathbb{R}}\mathcal{A}_2$ 上取 $(a\otimes b)^*=a^*\otimes b^*$，则

$$
E=(E_1\otimes E_2)\oplus(O_1\otimes O_2),\qquad O=(E_1\otimes O_2)\oplus(O_1\otimes E_2).
$$

两个差异的乘积是一个求同量。局域求同读数的乘积只张成 $E_1\otimes E_2$，缺口的维数是 $\dim O_1\cdot\dim O_2$。

- 实矩阵代数（转置为对合）：$\operatorname{Sym}(n_1n_2)=\operatorname{Sym}\otimes\operatorname{Sym}\oplus\operatorname{Skew}\otimes\operatorname{Skew}$，缺口为 $\tfrac14n_1(n_1-1)n_2(n_2-1)$。$n_1=n_2=2$ 时缺口是 $1$ 维，由 $J\otimes J$ 张成，即附录 E `H7` 的“实双比特隐身算子”。
- 复矩阵代数：$O_i=iE_i$。在复数域上作张量积时 $(ia)\otimes(ib)=-a\otimes b$，$O_1\otimes O_2$ 并入 $E_1\otimes E_2$，缺口为零，$\dim\operatorname{Herm}(n_1n_2)=n_1^2n_2^2$。复情形的计数已有冻结定理：`hermitian_space_finrank` 给出 $\dim_{\mathbb{R}}\operatorname{Herm}(d)=d^2$，`bipartite_sector_decomposition` 把无迹厄米空间正交分解为两个局域扇区与一个关联扇区，维数为 $(m^2-1)+(n^2-1)+(m^2-1)(n^2-1)=(mn)^2-1$。实情形的 $\operatorname{Skew}\otimes\operatorname{Skew}$ 缺口在冻结库中没有对应声明。

一般地，若每个 $\mathcal{A}_i$ 的中心含有反自伴公平元 $J_i$，则由 R1 第 3 款 $J_i^2=-1$，$O_i=J_iE_i$；把 $J_1\otimes1$ 与 $1\otimes J_2$ 等同之后缺口消失。矢高恰为 $1$ 的公平元是直角比较，所以：**局域层析成立的代数条件，是各子系统共用一个位于中心的直角比较。** 在 $M_n(\mathbb{R})$、$M_n(\mathbb{C})$、$M_n(\mathbb{H})$ 中，中心分别是 $\mathbb{R}$、$\mathbb{C}$、$\mathbb{R}$，只有复情形具备。实理论中 $J$ 存在而不在中心。

这与 Stueckelberg 对实量子论须附加与一切可观测量对易的算子 $J$ 的分析、以及 Wootters、Araki、Hardy 的局域层析参数计数一致；奇偶分次给出的是同一事实在条款 II 语言下的推导，并把 `H7` 与 `H4` 中的复结构 $R^2=-I$ 连到同一个对象上。交换统计的分岔不在此列。

### R16 捏合是共轭作用下的偶部（手工推导；二能级情形有冻结依据）

对正交投影分解 $P_0+P_1=1$，$U=P_0-P_1$ 是自伴公平元，$\rho\mapsto U\rho U$ 是态空间上的对合。$\rho_{\mathrm{even}}=\tfrac12(\rho+U\rho U)=P_0\rho P_0+P_1\rho P_1$ 是未读态，$\rho_{\mathrm{odd}}=\tfrac12(\rho-U\rho U)$ 是被删除的相干。$\operatorname{Tr}(\rho_{\mathrm{even}}\rho_{\mathrm{odd}})=0$，故 $\operatorname{Tr}\rho^2=\operatorname{Tr}\rho_{\mathrm{even}}^2+\operatorname{Tr}\rho_{\mathrm{odd}}^2$。$n$ 个结果时把 $U$ 换成 $\sum_k\omega^kP_k$（$\omega=e^{2\pi i/n}$），捏合是对循环群的平均。条款 II 的奇偶分解作用在态上，就是“已读 / 相干”分解；纯度的勾股分解见冻结定理 `pinching_hilbert_schmidt_pythagorean`、`pinching_hilbert_schmidt_orthogonal`，冯·诺依曼熵的对应恒等式见 `entropy_production_coherence_deletion_identity`。

### R17 齐次链式律给出有限孔径上的群律（手工推导；连续极限为文献结果）

设一族对象 $x_t$ 满足条款 II–IV，且 $c_{x_sx_t}=w(t-s)$ 只依赖时间差。则 $w(a)w(b)=w(a+b)$，$w(0)=1$，$w(-a)=w(a)^*$。在采样格点 $t\in\epsilon\mathbb{Z}$ 上 $w(n\epsilon)=D^n$，$D=w(\epsilon)$，不需要极限。`H6` 中的“双侧可逆性”由条款 III 给出，“群律”由条款 IV 加时间齐次给出；仍需输入的是强连续性（之后由 Stone 定理得到 $w(t)=e^{-itH}$）与 $H$ 本身。

有限孔径下 $H$ 的可识别性有明确边界：$D=e^{-i\epsilon H}$ 只在谱落在 $(-\pi/\epsilon,\pi/\epsilon]$ 时唯一决定 $H$；与 $H$ 对易、谱为 $\tfrac{2\pi}{\epsilon}\mathbb{Z}$ 的修正给出同一组采样比较。

### 关于 `H5`

本轮没有缩小 `H5`。能说的只是重述：单比特上玻恩权重是矢高的仿射函数 $p=1-\tfrac v2$；对满足 $\sum_kw_kn_k=0$ 的 POVM，$\sum_kw_kv(r,n_k)=1$ 与 $r$ 无关，这正是归一化所需的一阶矩条件。附录 E 的三次反例对矢高不是仿射的。从两两公平推不出这条仿射性，全效应可加性或投影正交可加性仍是必需输入。

## 7. 缺口台账

| 假设 | 本轮结果 | 仍需的输入 |
| --- | --- | --- |
| `H1` | R1 的对易证明用到 $2$ 可逆；其余未变 | 核商化、特征非 $2$ |
| `H2` 正自配对 | 由条款 IV 推出（R6） | 条款 IV |
| `H2` 椭圆负平方 | 由 $(\mathrm{Pos})$ 推出；三种签名在 $(M_2(\mathbb{C}),\operatorname{adj})$ 中统一（R2、R3） | 对合正性 |
| `H2` 多点 Gram 半正定 | 由条款 IV 加正泛函推出，逆向成立；偏离平坦时有稳定界（R7、R8） | 条款 IV、正泛函 |
| `H3` | 内积由 GNS 给出，弦距自动满足极化（R7） | 柯西完备化 |
| `H4` | $R^2=-I$ 是锁死恒等式在 $v=1$ 处的切片（R1） | 正交余项不枯竭、估值选择 |
| `H5` | 未缩小；改述为“概率对矢高仿射” | 效应可加性 |
| `H6` | 群律来自条款 IV 加时间齐次；给出 $H$ 的混叠等价类（R17） | 强连续性、$H$ |
| `H7` | 缺口维数 $\dim O_1\dim O_2$；局域层析等价于共用中心直角比较（R15） | 中心复结构的存在、交换统计 |
| `H8` | 洛伦兹签名与 `H2` 签名同源（R3）；射影和乐来自半比较（R9）；比安基与斯托克斯来自条款 III（R4、R5）；捏合为偶部（R16） | 签名取舍、随基点变化的联络及其动力学 |
| `H9` | 未变。本笔记的有限孔径结论不构造连续统测度 | 同附录 E |

净效果：`H2` 的三项与 `H3` 的极化一项，换成“条款 IV + 正性”两项；`H6`、`H7`、`H8` 各有一部分转为推论。条款 IV 排除一切全比较的和乐，因此它刻画的是第 1 层的平坦骨架；带真实曲率的第 2 层联络必须放弃它，那时 R4、R5、R8 是仍然可用的工具。

## 8. 冻结依据与计算证据

列出的是各冻结声明覆盖的内容，上文的手工推导不计为新的冻结定理。第一张表中的声明已被书稿引用，在锁文件中解析；第二张表中的声明书稿尚未引用，本轮在所钉提交上逐个核对了源文件与 `Golden/Frozen/state/` 下的状态片，回写书稿时需要先 `./tbook pin --refresh`。

| 冻结 GID（锁文件已解析） | 与本笔记的关系 |
| --- | --- |
| D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary | R1 第 3 款在 $v=1$、复矩阵情形的切片 |
| D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity | 实向量情形的求同平方加求异面积平方 |
| D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness | R4 的阿贝尔化及其逆向（上边缘势的存在） |
| D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport | R6 在圆群系数、一般图上的锚定输运 |
| D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification | 同上，锚定相位的分类 |
| D5/S3/QuantumBounds/GramRealizability.gram_realizability | R7 逆向所用的半正定分解 |
| D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula | R9 中 $\det G$ 的展开 |
| D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff | $\det G>0$ 与线性无关 |
| D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch | R9 的分子 $1+a\cdot b+b\cdot c+c\cdot a$ 与 $[a,b,c]$ |
| D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null | R3 中零锥对二次型的刚性 |
| D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean | R16 的二能级纯度分解 |
| D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity | R16 的熵形式 |
| D5/S3/Quantum/Analysis/TrotterProduct.trotter_product | R13、R17 的连续极限一侧 |

| 冻结 GID（所钉提交上已冻结，书稿尚未引用） | 与本笔记的关系 |
| --- | --- |
| D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential | R6 第 2 款的有限版本，且只需弦图三角形上的链式律 |
| D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential | 势表示的稳定性，误差 $(\lvert V\rvert-2)\varepsilon$；与 R8 同因子 |
| D5/S3/Observer/AgencyHolonomy/ZeroLoopPotentialEquivalence.closed_path_zero_iff_exists_potential | R6 在交换群系数、连通群胚上的等价形式 |
| D5/S3/Quantum/Measurement/AntidistinguishabilityGram.gramPsd | R7 第 1 款的复 Gram 半正定 |
| D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_distance_conditionally_negative | R7 第 2 款的距离侧 |
| D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_gaussian_posSemidef | 同上，高斯核半正定 |
| D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy | R3 三个生成元的迹、行列式与平方 |
| D5/S3/ConceptDynamics/Algebra/DualNumberMultiplicativityCriterion.dual_number_lift_preserves_mul_iff_product_rule | R11 中 $R/\mathfrak m^2$ 与乘积法则 |
| D5/S3/Quantum/Dynamics/BernoulliNoiseWalkGaussianLimit.result | R12 极限的相邻定理（公开陈述是游走的高斯极限） |
| D5/S3/Quantum/Entanglement/BipartiteSectorDecomposition.bipartite_sector_decomposition | R15 复情形的扇区分解与维数 |
| D5/S3/Quantum/Entanglement/BipartiteSectorDecomposition.hermitian_space_finrank | R15 中 $\dim_{\mathbb{R}}\operatorname{Herm}(d)=d^2$ |

检索范围是所钉提交的 `D5/` 全树，按定理名与陈述形状检索。以下各条没有找到公开的冻结声明：一般星环中公平元的奇偶分解（R1）、按矢高的分类（R2、R3）、非阿贝尔的比安基与扇形斯托克斯（R4、R5）、半旋子和乐与 $\tan(\Omega/2)$（R9）、移位旋子的余项界（R10）、圆坐标环的射流商（R11）、累计矢高的界与极限（R12）、复步导数的界（R14）、实理论的奇偶计数（R15）。未找到不等于不存在；钉版 Mathlib 本轮没有检索。

文献结果及出处：莫比乌斯变换的迹分类（A. F. Beardon, *The Geometry of Discrete Groups*, Springer, 1983）；距离与正定核（I. J. Schoenberg, *Trans. Amer. Math. Soc.* **44**, 522–536, 1938）；立体角公式（A. van Oosterom & J. Strackee, *IEEE Trans. Biomed. Eng.* **30**, 125–126, 1983；F. Eriksson, *Math. Mag.* **63**, 184–187, 1990）；二阶随机微分几何（P.-A. Meyer, *Séminaire de Probabilités XV*, 1981；M. Émery, *Stochastic Calculus in Manifolds*, Springer, 1989）；复步导数（J. R. R. A. Martins, P. Sturdza & J. J. Alonso, *ACM Trans. Math. Softw.* **29**, 245–262, 2003）；实量子论与局域层析（E. C. G. Stueckelberg, *Helv. Phys. Acta* **33**, 727–752, 1960；H. Araki, *Commun. Math. Phys.* **75**, 1–24, 1980；W. K. Wootters, 收于 *Complexity, Entropy and the Physics of Information*, 1990；L. Hardy, arXiv:quant-ph/0101012）。本轮按记忆中的书目信息列出这些出处，没有逐篇调阅原文核对页码。

复算脚本：[arc_comparison_gap_check.py](arc_comparison_gap_check.py)，在安装 `numpy`、`sympy`、`mpmath` 的环境运行 `python3 docs/project/arc_comparison_gap_check.py`。它用种子 `20261117` 的随机酉矩阵与 $\mathrm{SL}(2,\mathbb{C})$ 元素核对 R1、R3–R9、R13、R15 的恒等式与不等式（代数浮点差不超过 $6\times10^{-14}$），用 Gröbner 基核对 R11 的理想等式与商代数维数，用 40–50 位精度核对 R10、R12、R14 的界与 §34.30.4 算例表的角点，并穷举 $2^{12}$ 条符号路径核对 R12 的精确均值。有限采样与有限精度提供复算证据，普遍结论依赖上文的证明。

## 9. 后续落点

**可以直接回写书稿的部分。** R6 第 2 款与势表示的稳定性已经冻结，不需要新的形式化。附录 E 可以在 E.7 之后增设一节，以 `IsChordal.exists_gain_potential` 与 `IsChordal.exists_approximate_gain_potential` 为定理盒，给出“条款 IV 推出正自配对与锚定表示”、四个反例的归属表，以及“条款 IV + 正性”对 `H2`、`H3` 的归约；`gramPsd`、`gram_distance_conditionally_negative` 与 `elliptic_hyperbolic_reflection_trichotomy` 分别支撑 Gram 半正定、弦距与三种签名的正规形。其余推导（R1–R5、R8、R9）以注记或算例进入正文并标明手工推导。同一批可顺带修订：§32.1 条款 III 之后说明对易是推论；§34.30.1 的 $D_1$ 一段换成 R11 的等式；§34.30.2 的四相区配上 R12 的双侧界；§34.30.3 补入 R4、R5。

**上游形式化。** 冻结库中尚无对应声明、且证明有实际内容的候选，按价值排序：R12（累计矢高的有限 $N$ 双侧界、四相极限与均值旋子夹逼；其中 $(\cos(t/\sqrt n))^n$ 的极限在上游已有私有引理，按上游规则应公开原声明后复用）、R9（半旋子和乐的闭式与 $\tan(\Omega/2)$）、R15 的实情形计数、R10 第 5 款、R14、R11。R1、R4、R5 是由假设代入加环运算得到的恒等式，适合作为上述定理证明中被消费的引理，不宜单独立项。形式化之前还须检索钉版 Mathlib。

**未解决。** $(\mathrm{Pos})$ 能否由更弱的比较条件推出，本轮没有结果。条款 IV 一侧，冻结定理已把“一切三点”减弱为“弦图上的可比三角形”；非弦图上三角形平坦不足以给出势表示（四圈上没有三角形，任意和乐都允许），所以弦性是这条路线上的自然边界。`H5` 没有进展。[@prob-ch34-rough-nonabelian-surface-calculus] 的两项目标未触及：R5 与 R8 只处理有限孔径，不涉及 $\alpha<\tfrac12$ 的细分极限。
