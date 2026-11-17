# 极小圆弧体微积分与统一场相关论断：缺口审计与可严格推出的部分

研究日期：2026-11-17。书库基线为 `db49c9f018703d0d84dd125046ffc3d79f7fc1e3`，trureturing 钉版为 `776129eb1e0e88033b2f3d3cc5854e97dd4cdbae`。行号指中文权威版本在该基线上的行号。

## 0. 范围与诚实声明

审计对象是 [§39.8](../../books/quantum-geometry/zh/ch39-s08-universal-clock-and-gravitational-dilation.md)、[§39.9](../../books/quantum-geometry/zh/ch39-s09-unified-arc-forces-and-planck-convergence.md)、[§39.10](../../books/quantum-geometry/zh/ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)、[§39.11](../../books/quantum-geometry/zh/ch39-s11-af-gut-arc-field-grand-unification.md) 与 [§32.1](../../books/quantum-geometry/zh/ch32-s01-axiom-of-comparison.md)、[§32.5](../../books/quantum-geometry/zh/ch32-s05-physical-fields-and-six-domains.md)、[§32.6](../../books/quantum-geometry/zh/ch32-s06-meta-unification-and-icosian-bridge.md) 中的统一场论断；工具是 [§34.30](../../books/quantum-geometry/zh/ch34-s30-arc-body-calculus-and-finite-stokes.md) 的弦—矢高分解、有序乘积积分与有限网格上边缘，以及[比较公理缺口笔记](COMPARISON-AXIOM-ARC-CALCULUS-GAPS-2026-11-17.md)的结果 R1–R20（下文直接引用编号，不重证）；“附录 E”指[附录 E](../../books/quantum-geometry/zh/appendix-e.md)。

每条结论带一个标签：`手工推导`（本文给出完整证明）、`文献结果`（已发表定理，给出作者、年份与前提）、`MODEL`（建模选择或读法）、`OPEN`（未证明）。标签不升级；数值复算不是证明。

本文不从零推出物理，也不以“尚未证明宇宙如此”代替分析。每条结论都写明所用前提。本文没有新增 Lean 验证结果；多数单条结论在格点规范理论、雷吉演算或李群表示论中是经典结果，本文的工作是把它们接到比较公理的条款与弦—矢高语言上，并指出书稿中哪些说法超出了证据。**文献原文除 Chamseddine–Connes 1997 的摘要外均未核对**，引用按通行表述给出，见第 8 节。

记号沿用 R1：公平元 $u$（$uu^*=u^*u=\mathbf 1$），$S=\tfrac12(u+u^*)$，$A=\tfrac12(u-u^*)$，矢高 $v=\mathbf 1-S$，割弦 $\Delta=u-\mathbf 1$，$\Delta^*\Delta=2v$。读数 $\varphi$ 指 $M_N(\mathbb C)$ 上的归一迹 $\varphi(X)=\tfrac1N\operatorname{tr}X$，$\lVert X\rVert_\varphi^2=\varphi(X^*X)$。

## 1. 审计：超出已有推导的论断

### 1.1 逐条清单

| 编号 | 位置（锚点，行） | 书中论断 | 书中标签 | 暗含前提 | 极小反例或缺失步骤 |
| --- | --- | --- | --- | --- | --- |
| A1 | §39.9.1 `sec-ch39-09-1`，第 18 行 | 规范项写作 $\kappa_{\mathrm{gauge}}\operatorname{Tr}(\Omega_{\mathrm{intra}})$ | `MODEL` | $\Omega$ 的迹非零 | $\mathfrak{su}(N)$ 的元素无迹，该项对 $\mathrm{SU}(2)$、$\mathrm{SU}(3)$ 恒为零；对 $\mathrm U(1)$ 是线性通量，求和后只剩边界项（R5）。第 24 行文字所说的威尔逊项是 $\operatorname{Re}\operatorname{Tr}(I-U_\square)$，即矢高（F1），公式与文字不一致 |
| A2 | 同上，第 27–33 行 | 铰链 $h\in\mathcal K^{(1)}$，权重 $A_h/\ell_P^2$，极限为四维 $\int R\sqrt{-g}\,d^4x$ | `MODEL`＋`文献结果` | 复形维数与铰链维数相容 | 三维复形的余维 2 铰链是棱，雷吉权重是长度 $L_h$；面积权重属于四维复形的三角形铰链。所引收敛定理针对黎曼（正定）分片平直度量 |
| A3 | §39.9.1 第 15、35–42 行 | 两项“同源”，同为无量纲弧度相位 | `MODEL` | 两项以同一方式读取和乐 | 规范项读偶通道（矢高，二次）；雷吉项读带符号的转角（一次），角的大小在 $0\le\delta\le\pi$ 时是矢高的函数 $\arccos(1-v)$，符号要靠奇通道确定；见 F8、F9 |
| A4 | §39.9.1 第 27 行；§39.11 定义第 3 款 | $N\ge5$ 的多余比较弦“无需撑开四维容器”，而激发角亏 | `MODEL` | 弯曲三维读法是所取的读法 | 五个两两等距的点：在 $\mathbb R^4$ 中平直（正五胞体），其边界是三维弯曲球面，每条棱角亏 $148.41^\circ$。两种读法并存（F14）。书中的“无需”本身不排除另一种读法，这一条是补充说明，不是纠错 |
| A5 | §39.9.3(2) 第 98–113 行、第 233 行总表 | $\alpha_G(E_P)=1$ 与规范耦合“会师”“合流” | `MODEL`＋`手工推导`＋`NUM` | $\alpha_G(E):=(E/E_P)^2$ 是可比较的跑动耦合 | $\alpha_G(E_P)=1$ 是 $E_P$ 的定义。书中算例（第 222 行）与总表已给出 $\alpha_i(E_P)\approx(0.0301,0.0202,0.0191)$，也没有把它称为预言；没有明说的是两者在 $E_P$ 相差 $33\text{–}52$ 倍，“会师”不指数值相等（F13） |
| A6 | §39.9.3(3) 第 119–125 行 | `face_cycle_exact` “导出”刚性盈余 $\tfrac{(N-3)(N-4)}2$；单胞极限“消融”引力紫外行为 | `MODEL`＋`LEAN ✓` | 该多项式依赖欧拉正合定理 | 多项式是 $\binom N2-(3N-6)$ 的算术展开；一般维数为 $\tfrac{(N-d)(N-d-1)}2$，根 $\{d,d+1\}$ 对每个 $d$ 都出现（F14）。紫外有限性没有推导 |
| A7 | §39.8.2 第 83–98 行 | 由勾股预算“立得”史瓦西钟慢 | `MODEL`＋`手工推导`＋`文献结果` | $\eta=M/M_{\max}(r)$，$M_{\max}=rc^2/2G$；预算按平方分配 | 这两项合起来已经决定 $g_{00}=1-r_s/r$（面积半径坐标）。$1-\eta/2$、$e^{-\eta/2}$、$(1+\eta)^{-1/2}$ 有同一牛顿极限（F15）。书中第 107 行的边界说明已写明 $M_{\max}$ 是借用的、只复现时间流逝函数；这里补上的是平方预算律同样是输入 |
| A8 | §39.11 `def-ch39-af-gut-master-connection` 第 4 款，第 51 行 | 普适圆弧迹刚度；“范式反转” | `MODEL` | 账本由完整的费米子代组成；读数对整本账本取迹 | 公设所取的读数是整本账本上的迹，即唯一在全体 $\mathrm U(\mathcal H_{\mathrm{Weyl}})$ 共轭下不变的读数，这些共轭包含 §39.10 排除的跨概念转动。公设只约束三个规范理想上的迹，并不蕴涵这种不变性：$G_{\mathrm{SM}}$ 不变的非均匀权 $(w_Q,w_u,w_d,w_L,w_e)=(1,\tfrac12,\tfrac32,1,\tfrac32)$ 给出同样的三条关系；只要求 $G_{\mathrm{SM}}$ 不变时 $g_3^2/g_2^2$ 可取任意正值（F12）。同一归一化关系已见于谱作用量文献 |
| A9 | §39.11.2 第 61–131 行 | 两条曲线“唯一正根 $N_c=3$”，“一石四鸟” | `手工推导` | 固定电荷 $(\tfrac23,-\tfrac13)$ 独立于 $N_c$ | 固定电荷正是反常相消曲线在 $N_c=3$ 处的取值；对任意 $N_\star$ 用其电荷重复构造，交点恰在 $N_c=N_\star$（F12）。交点与线性条件 $N_cY_Q=\tfrac12$（实测电荷给出 $Y_Q=\tfrac16$）同解：实测电荷加反常相消确实给出 $N_c=3$，但它不是独立于电荷输入的第二重约束。(a) 在反常相消曲线的电荷下对一切奇数 $N_c$ 成立，在固定的实测电荷下只在 $N_c=3$ 成立；不依赖电荷输入而选出 $3$ 的只有 (b)。`three_anchor_gram_det_pos_iff` 不含 $N_c$ |
| A10 | §39.11.2 第 133–140 行 | $\tfrac38$ 经单圈跑动“精准拉低至实验值 $0.23129$” | `手工推导`＋`文献结果` | $\mu_{12}$ 是模型给出的标度 | $\mu_{12}$ 由输入值 $0.23129$ 反解，等式是恒等式；书中第 134 行已称之为“恒等式”，第 140 行也给出三线交汇的 $0.2076$，超出证据的只是“精准拉低至实验值”一句。若把 $\tfrac38$ 放在单胞标度 $E_P$，得 $0.1522$（F13）；§39.11 没有断言 $\mu_{\mathrm{arc}}=E_P$，这个数只作对照 |
| A11 | §39.11.3(1) 第 150–152 行 | `covariant_commutator_formula` “自动生成”希格斯协变导数与双阱势 | `MODEL`＋`LEAN ✓` | 势的形状与符号由该恒等式决定 | 冻结定理是环恒等式 $Uf-fU=(\mathit{translated}-f)U$；势的次数与 $-\mu_H^2$ 的符号是输入 |
| A12 | §39.11.3(2) 第 167–180 行 | 拉格朗日恒等式给出时钟负载同号累加；四面体缺陷定理说明曲率阻挫；驻相“直接锁合”爱因斯坦方程；“从根源上消除”紫外发散 | `MODEL`＋`LEAN ✓` | 见右 | 拉格朗日恒等式不含时钟预算。四面体定理是交换群系数的 $d^2=0$ 正合判据（F5）；书中“上边缘不为零时没有边势能消去它”一句是该定理第三款的正确推论，没有依据的是把它等同于度量曲率。场方程一步依赖雅各布森的全部热力学前提，书中已用“在……下”与“`MODEL` 连续统靶标”限定，偏强的只是“直接”二字。紫外有限性没有推导 |
| A13 | §39.11.3(3) 第 186–222 行，第 344–353 行总表 | 四条选择定则是 AF-GUT 的“试金石”“可证伪判据” | `手工推导`＋`文献结果` | 这些定则区分 AF-GUT 与标准模型 | 四条都是规范群为 $G_{\mathrm{SM}}$ 的标准模型自身的性质；与标准模型相比没有新增可区分的预言 |
| A14 | §39.10.3 第 126–158 行，第 94 行 | 四条路径“锁死 $d=3$”；$d\ge4$ “自动劈裂回双三维场”；三锚定理锁定 $N_c=3$ | `手工推导`＋`文献结果`＋`LEAN ✓` | 各处的“3”是同一个不变量 | $\mathfrak{so}(5)$、$\mathfrak{so}(6)$ 是单李代数，只有 $d=4$ 分裂；书中第 152 行关于四维的那句话本身成立，偏强的是小标题把劈裂写到 $d\ge4$。空间的 3 是实维数，色的 3 是复维数（$\dim\mathfrak{su}(3)=8$），布洛赫的 3 是 $\dim\mathfrak{su}(2)$。正交 4-标架满足条款 II–IV 与正性而秩为 4（F14）；§39.10 没有从比较公理推出封顶，这个反例属于附录 E 的台账，不针对该节 |
| A15 | §39.9.2 第 46–74 行 | `1D—2D—3D` 对应 $\mathrm U(1)$、$\mathrm{SU}(2)$、$\mathrm{SU}(3)$ | `MODEL`＋`LEAN ✓` | 阶梯在 3 处停止 | 停止来自 A14 的封顶假设；$\mathrm{SU}(4)$ 不被任何所引定理排除 |

以下各条所指的措辞已在书稿相应位置改正：A2 中收敛定理的前提，A6 中的“导出”，A7，A9 中的定理链接，A10，A12，A13，A14 中的小标题与 $d\ge5$ 的括注。表中“书中论断”一栏记录的是改正前的说法；其余各条留给作者，见第 11 节。

§32.5 的统一场论断都已标为 `MODEL` 并把连续场论归入文献注记，没有发现措辞强于证据之处；该节实验卡的数值 $57.9^\circ$ 复算无误（F4）。§32.6 只通读了三根诊断轴与两个文献注记框，同样已标 `MODEL` 与 `文献结果`；八大纲领总表没有逐格审计（见第 8 节）。

### 1.2 中间假设表（仿附录 E）

| 编号 | 中间假设 | 进入处 | 去掉后的极小反例 | 分类 | 建议处理 |
| --- | --- | --- | --- | --- | --- |
| `U1` | 读数取定义表示上的归一迹 | A1；F1 | 非迹态 $X\mapsto\langle e_1,Xe_1\rangle$ 在规范变换下改变 | 定义（在 F9 的三条要求下唯一） | 写明“矢高经归一迹读成标量”；非线性类函数（弧长平方等）列为分岔 |
| `U2` | 只有相邻点可比，且小方格上不要求条款 IV | A1、A3；F7 | 全体点可比加条款 IV 时一切和乐为 $\mathbf 1$（R6），作用量恒为零 | 外部输入（同 `H8`） | 沿用附录 E 的第 2 层说明 |
| `U3` | 结构群有界（正性条件） | F10 | 推进的迹读数 $\tfrac12(1-\cosh\eta)<0$ | 分岔选择（同 `H2`/`H8`，R20） | 把“内部群紧致、洛伦兹群非紧致”写成同一处取舍 |
| `U4` | 统计权重 $e^{-S}$ 或 $e^{iS}$ 与哈尔测度 | §39.9.1、§39.11 配分函数 | 权重恒为 1 时矢高均值为 1（F16），没有连续理论 | 外部输入；连续极限为 `OPEN`（同 `H9`） | 保持 `OPEN` |
| `U5` | 每个理想各有一个耦合常数 | F10 | $\mathfrak u(1)\oplus\mathfrak{su}(2)\oplus\mathfrak{su}(3)$ 上的不变二次型有三个独立尺度 | 外部输入（三个测量值） | 明说未推出 |
| `U6` | 普适圆弧迹刚度 | A8；F12 | $G_{\mathrm{SM}}$ 不变的分块加权读数给出任意 $g_3^2/g_2^2$ | 分岔选择；所取的迹读数在跨概念转动下不变，它与 §39.10 的分块独立是否相容留给作者判断 | 写成“读数取整本账本上的迹”，并注明与谱作用量归一化相同 |
| `U7` | 账本由完整的费米子代组成（代数不影响比值），$N_c=3$ | A8、A9；F12 | 计入希格斯二重态后比值为 $\tfrac{25}{66}$；单独希格斯为 $\tfrac12$ | 外部输入（经验） | 把 $\tfrac38$ 的来源写成“一代费米子是 $\bar{\mathbf 5}\oplus\mathbf{10}$” |
| `U8` | 标度 $\mu_{\mathrm{arc}}$ 与无阈值单圈跑动 | A10；F13 | $\mu_{\mathrm{arc}}=E_P$ 给 $0.1522$；三线交汇给 $0.2076$ | 外部输入＋`OPEN` | 把 $\mu_{12}$ 称为拟合标度 |
| `U9` | 引力项取角亏的一次式并以铰链度量加权 | A2、A3；F8、F9 | 矢高加权和在加细下按 $a^2$ 趋零 | `文献结果`＋分岔（`H8`）＋`OPEN`（`H9`） | 修正铰链维数；写明读的是带符号的转角 |
| `U10` | $N\ge5$ 时取“弯曲三维”而非“平直四维” | A4；F14 | 正五胞体 | 分岔选择 | 补一句说明两种读法并存 |
| `U11` | 每个概念场的秩不超过 3 | A14、A15；F14 | 正交 4-标架；$\mathfrak{so}(5)$ | 定义或分岔，不由 $\mathcal A_0$、条款 IV 与正性推出 | 把封顶写成模型原理（`MODEL`），分列三种“3” |
| `U12` | 平方预算律与 $\eta=r_s/r$ | A7；F15 | 其他预算律；空间度量缺失时加速度的模不确定 | 外部输入（广义相对论文献） | 改“立得”为“按此标定重写为” |
| `U13` | $\mathrm U(1)$ 紧致，即存在公共的精确周期 | F11 | $\operatorname{diag}(e^{it},e^{i\sqrt2t})$ 有界而永不精确回归 | 操作假设 | 若书中谈电荷量子化，前提写“精确回归”，不写“有界” |
| `U14` | 驻相给出场方程；雅各布森前提 | A12 | 无（未推导） | 外部输入＋`OPEN` | 保持 `OPEN` |
| `U15` | $\alpha_G(E)=(E/E_P)^2$ 作为跑动耦合 | A5；F13 | 定义本身 | 定义 | 在“会师”处注明它不指数值相等 |

## 2. 规范作用量与矢高

### F1 威尔逊小方格项就是小方格和乐的矢高（`手工推导`；与威尔逊作用量的对应为 `文献结果`）

1. 对 $U\in\mathrm U(N)$，$\varphi(v(U))=1-\tfrac1N\operatorname{Re}\operatorname{tr}U=\tfrac12\lVert U-\mathbf 1\rVert_\varphi^2=\tfrac1{2N}\lVert U-\mathbf 1\rVert_{\mathrm{HS}}^2$。
2. 设 $G\subseteq\mathrm U(N)$ 在 $\mathbb C^N$ 上不可约。$M_N(\mathbb C)$ 上满足 $\omega(gXg^*)=\omega(X)$（$g\in G$）且 $\omega(\mathbf 1)=1$ 的线性泛函只有 $\varphi$。
3. $N=2$、$U\in\mathrm{SU}(2)$ 时 $S(U)=\tfrac12\operatorname{tr}U\cdot\mathbf 1$ 已是实标量，矢高不经读数就是数。

证明。第 1 款是 R1 第 4 款 $\Delta^*\Delta=2v$ 取 $\varphi$。第 2 款：$\overline G$ 是紧群，令 $E(X)=\int_{\overline G}gXg^*\,dg$；$E(X)$ 与 $G$ 对易，由舒尔引理是标量，取迹得 $E(X)=\tfrac{\operatorname{tr}X}{N}\mathbf 1$，于是 $\omega(X)=\omega(E(X))=\varphi(X)$。第 3 款：$U=\begin{pmatrix}a&b\\-\bar b&\bar a\end{pmatrix}$，$U+U^*=2\operatorname{Re}a\cdot\mathbf 1$。$\square$

用本书的话说：“求同部分”是 $S(U_p)=\tfrac12(U_p+U_p^*)$，“读数”是归一迹；威尔逊小方格作用量按通行归一化写作 $S_W=\beta\sum_p\bigl(1-\tfrac1N\operatorname{Re}\operatorname{tr}U_p\bigr)$（小方格迹作用量出自 Wilson 1974；这一写法与原文相差一个常数与归一化），它逐项等于 $\beta\,\varphi(v(U_p))$，也等于 $\tfrac\beta2\lVert\Delta_p\rVert_\varphi^2$。$\mathrm{SU}(2)$ 属于标量相似情形（R2），$N\ge3$ 不属于，所以读数 $\varphi$ 是多出来的一步（`U1`）。账本可约时第 2 款的唯一性失效，这正是 F12 中耦合常数自由度的来源。

### F2 矢高与曲率范数的双侧界（`手工推导`）

设 $U\in\mathrm U(N)$ 的本征角 $\theta_j\in(-\pi,\pi]$，$F=\sum_j\theta_jP_j$（主值对数除以 $i$），$\lVert F\rVert_\varphi^2=\tfrac1N\sum_j\theta_j^2$。则

$$
\frac{2}{\pi^2}\lVert F\rVert_\varphi^2\;\le\;\varphi(v(U))\;\le\;\frac12\lVert F\rVert_\varphi^2,\qquad
\varphi(v(U))\;\ge\;\frac12\lVert F\rVert_\varphi^2-\frac1{24}\varphi(F^4)\;\ge\;\frac12\Bigl(1-\frac{\lVert F\rVert_{\mathrm{op}}^2}{12}\Bigr)\lVert F\rVert_\varphi^2 .
$$

上界取等当且仅当 $U=\mathbf 1$；常数 $\tfrac2{\pi^2}$ 当且仅当一切 $\theta_j\in\{0,\pi\}$ 时取到。

证明。谱定理给出 $\varphi(v)=\tfrac1N\sum_j(1-\cos\theta_j)$。逐项用 $\tfrac{x^2}2-\tfrac{x^4}{24}\le1-\cos x\le\tfrac{x^2}2$（R12 所用的不等式），以及 $\lvert x\rvert\le\pi$ 时 $1-\cos x=2\sin^2\tfrac x2\ge\tfrac{2x^2}{\pi^2}$（若尔当不等式 $\sin t\ge\tfrac{2t}\pi$，$0\le t\le\tfrac\pi2$，取等仅在端点）。$\square$

$\lVert F\rVert_\varphi$ 是 $U$ 到单位元的测地弧长，$\sqrt{2\varphi(v)}$ 是弦长；上式即“弦不超过弧，且不短于弧的 $\tfrac2\pi$ 倍”。以弧长平方作小方格作用量的方案在文献中存在（Manton 1980，`文献结果`），与威尔逊作用量相差的正是第二式的四次项。

### F3 连续极限（中点链变量情形为 `手工推导`；一般情形与量子理论为 `文献结果`）

设 $A_1,A_2$ 是平面区域上取值于厄米矩阵的 $C^6$ 函数，$x_c$ 为小方格中心，边变量取中点值：$E_1=e^{iaA_1(x_c-\frac a2e_2)}$，$E_2=e^{iaA_2(x_c+\frac a2e_1)}$，$E_3=e^{-iaA_1(x_c+\frac a2e_2)}$，$E_4=e^{-iaA_2(x_c-\frac a2e_1)}$，$U_p(a)=E_1E_2E_3E_4$。则

$$
1-\frac1N\operatorname{Re}\operatorname{tr}U_p(a)=\frac{a^4}{2N}\operatorname{tr}\bigl(F_{12}(x_c)^2\bigr)+O(a^6),\qquad F_{12}=\partial_1A_2-\partial_2A_1+i[A_1,A_2].
$$

证明。记 $X=iaA_1$、$Y=iaA_2$ 在相应中点的值。贝克—坎贝尔—豪斯多夫公式到二阶给出 $\log U_p=(X-X')+(Y-Y')+[X,Y]+O(a^3)$，其中 $X-X'=-ia^2\partial_2A_1+O(a^4)$，$Y-Y'=ia^2\partial_1A_2+O(a^4)$，$[X,Y]=-a^2[A_1,A_2]+O(a^3)$，故 $\log U_p=ia^2F_{12}(x_c)+O(a^3)$，左端等于 $\tfrac{a^4}{2N}\operatorname{tr}F_{12}^2+O(a^5)$。再看 $a\mapsto-a$：$E_1(-a)=E_3(a)$，$E_2(-a)=E_4(a)$，$E_3(-a)=E_1(a)$，$E_4(-a)=E_2(a)$，所以 $U_p(-a)=E_3E_4E_1E_2=(E_1E_2)^{-1}U_p(a)(E_1E_2)$，迹是 $a$ 的偶函数，$a^5$ 项为零。$\square$

取 $\beta=\tfrac{2N}{g^2}$，四维超立方格点上 $S_W=\beta\sum_{x,\mu<\nu}\tfrac{a^4}{2N}\operatorname{tr}F_{\mu\nu}^2+\dots$ 是 $\tfrac1{2g^2}\int\operatorname{tr}(F_{\mu\nu}F_{\mu\nu})\,d^4x$ 的黎曼和（Wilson 1974，`文献结果`；前提是光滑经典场）。在小方格角点而不是中心展开时余项是 $O(a^5)$。这是经典场的陈述；量子连续极限属于 `OPEN`（附录 E `H9`）。

### F4 有限孔径上的曲率就是对易子（`手工推导`；第 1 款的环恒等式有冻结依据）

1. 对任意 $*$-代数中的公平元 $u_1,u_2$，令 $h=u_1u_2u_1^*u_2^*$，则 $h-\mathbf 1=[u_1,u_2](u_2u_1)^*$，$2v(h)=(u_2u_1)[u_1,u_2]^*[u_1,u_2](u_2u_1)^*$。若 $\varphi$ 是迹态，$\varphi(v(h))=\tfrac12\varphi\bigl([u_1,u_2]^*[u_1,u_2]\bigr)$；若 $S_1,S_2$ 在中心内，$[u_1,u_2]=[A_1,A_2]$。
2. $\mathrm{SU}(2)$ 中绕夹角为 $\psi$ 的两轴各转 $a$、$b$：$v(h)=2\sin^2\tfrac a2\sin^2\tfrac b2\sin^2\psi$。
3. 周期格点上令协变移位 $(T_\mu\psi)(x)=U_\mu(x)\psi(x+\hat\mu)$，则 $[T_\mu,T_\nu]=(M_{U_{\mu\nu}}-\mathbf 1)T_\nu T_\mu$，$M_{U_{\mu\nu}}$ 是逐点乘小方格和乐；因而 $S_W=\tfrac{\beta}{2N}\sum_{\mu<\nu}\lVert[T_\mu,T_\nu]\rVert_{\mathrm{HS}}^2$。

证明。$(h-\mathbf 1)u_2u_1=u_1u_2-u_2u_1$，这是冻结定理 `covariant_commutator_formula` 取 $U=u_1$、$f=u_2$、$\mathit{translated}=u_1u_2u_1^*$ 的情形；其余由 R1 第 4 款。第 2 款：$A_k=-i\sin\tfrac{a_k}2\,n_k\cdot\boldsymbol\sigma$，$[A_1,A_2]^*[A_1,A_2]=4\sin^2\tfrac a2\sin^2\tfrac b2\lvert n_1\times n_2\rvert^2\mathbf 1$。第 3 款：$T_\mu T_\nu$ 与 $T_\nu T_\mu$ 都把 $\psi(x+\hat\mu+\hat\nu)$ 搬到 $x$，系数之比是 $U_{\mu\nu}(x)$。$\square$

§32.5 实验卡的读数是第 2 款在 $a=b=60^\circ$、$\psi=90^\circ$ 的值：$v=\tfrac18$，转角 $2\arccos\tfrac78=57.91^\circ$。连续公式 $F_{\mu\nu}=[D_\mu,D_\nu]$ 是第 3 款的极限；有限孔径上不需要极限。

### F5 格点比安基恒等式（`手工推导`；阿贝尔化有冻结依据）

1. 四面体：R4，$h(x,y,z)h(x,z,w)h(x,w,y)=c_{xy}h(y,z,w)c_{yx}$，只用条款 III。
2. 立方体：取 12 条棱上任意群值链变量。存在生成树与六个面的基点，使六个经树路径锚定的小方格和乐按“顶、前、右、后、左、底”的次序相乘，在 12 个生成元的自由群中约化为空字；因而对任何群成立。
3. 取相位后第 1 款化为冻结定理 `tetra_defects_incidence_repair_and_exactness` 中的四面体条件；第 2 款化为“闭曲面上边势的通量和为零”。

证明。第 2 款：对偶图中该次序是一条哈密顿路；去掉路上相邻两面的五条公共棱，余下七条棱构成生成树。对每条非树棱 $e$ 记 $x_e$ 为“树路径—$e$—树路径”的基本回路。用树路径把每个面的回路拉回根点后，树棱的贡献相消，面的锚定回路等于其边界上各 $x_e^{\pm1}$ 按环绕次序的乘积；首尾两面各含一个 $x_e$，中间四面各含两个，同一个 $x_e$ 在相邻两面中方向相反。适当选取各面的基点后乘积逐对相消。脚本在至多 $2\times4^6$ 种次序与基点选择中用自由约化找到解，并用随机 $\mathrm{SU}(3)$ 链变量复核。$\square$

格点规范理论文献中的对应陈述见 Batrouni 1982（`文献结果`）。紧致 $\mathrm U(1)$ 把小方格角约化到 $(-\pi,\pi]$ 后，立方体六面之和可以是 $2\pi$ 的非零整数倍，即格点磁单极（DeGrand–Toussaint 1980，`文献结果`）；这不与第 3 款冲突，因为约化后的角不再是边势的上边缘。

### F6 非阿贝尔斯托克斯界（`手工推导`；一般填充的存在性为 `文献结果`）

设回路 $C$ 是由 $M$ 个小方格（或三角形）拼成的圆盘 $\Sigma$ 的边界，链变量取值于 $\mathrm U(N)$。则

$$
\lVert W_C-\mathbf 1\rVert_\varphi\le\sum_{p\in\Sigma}\lVert U_p-\mathbf 1\rVert_\varphi,\qquad
\sqrt{\varphi(v(W_C))}\le\sum_{p\in\Sigma}\sqrt{\varphi(v(U_p))},\qquad
1-\frac1N\operatorname{Re}\operatorname{tr}W_C\le M\sum_{p\in\Sigma}\Bigl(1-\frac1N\operatorname{Re}\operatorname{tr}U_p\Bigr).
$$

证明。$W_C$ 等于 $M$ 个面和乐的共轭按某一次序的乘积：扇形情形是 R5；矩形网格上按“列从右到左、列内从下到上”的次序、以“沿底边再沿该列左侧”的路径作锚线，等式由下面的归纳给出；一般圆盘是非阿贝尔面斯托克斯恒等式（范坎彭引理，`文献结果`；书中见 [§34.30.3](../../books/quantum-geometry/zh/ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-3) 的生成树锚定与剥壳次序）。$\lVert\cdot\rVert_\varphi$ 在酉元左右乘下不变，且 $ab-\mathbf 1=(a-\mathbf 1)b+(b-\mathbf 1)$，故得第一式；第二式用 $\lVert u-\mathbf 1\rVert_\varphi^2=2\varphi(v(u))$；第三式用柯西—施瓦茨不等式。$\square$

矩形网格的归纳。设网格有 $R$ 列 $T$ 行，$h_{i,j}$ 是从 $(i,j)$ 到 $(i+1,j)$ 的水平链变量，$w_{i,j}$ 是从 $(i,j)$ 到 $(i,j+1)$ 的竖直链变量，$P_{i,j}=h_{i,j}\,w_{i+1,j}\,h_{i,j+1}^{-1}\,w_{i,j}^{-1}$ 是以左下角为基点的小方格和乐。记 $b_i=h_{0,0}\cdots h_{i-1,0}$，$V_{i,J}=w_{i,0}\cdots w_{i,J-1}$，锚定小方格为 $\ell_{i,j}=b_iV_{i,j}P_{i,j}V_{i,j}^{-1}b_i^{-1}$。按 $j$ 递增的次序相乘，对 $J$ 归纳得

$$
\prod_{j=0}^{J-1}V_{i,j}P_{i,j}V_{i,j}^{-1}=h_{i,0}\,V_{i+1,J}\,h_{i,J}^{-1}\,V_{i,J}^{-1}:
$$

$J=1$ 时两端都是 $P_{i,0}$；右乘 $V_{i,J}P_{i,J}V_{i,J}^{-1}$ 时，$V_{i,J}^{-1}V_{i,J}$ 与 $h_{i,J}^{-1}h_{i,J}$ 相消，余下 $h_{i,0}V_{i+1,J+1}h_{i,J+1}^{-1}V_{i,J+1}^{-1}$。于是第 $i$ 列的乘积是 $C_i=b_{i+1}V_{i+1,T}\,h_{i,T}^{-1}\,V_{i,T}^{-1}b_i^{-1}$。按列从右到左相乘，$C_iC_{i-1}$ 中间的 $V_{i,T}^{-1}b_i^{-1}b_iV_{i,T}$ 相消，逐列叠缩得 $C_{R-1}\cdots C_0=b_RV_{R,T}\,h_{R-1,T}^{-1}\cdots h_{0,T}^{-1}\,V_{0,T}^{-1}$，即沿底边、右边、顶边、左边绕行一周的 $W_C$。脚本在自由群中对 $R,T\le6$ 的全部网格复核了这一等式。

这是 R18 第 3 款取双侧不变度量 $d(g,h)=\lVert g-h\rVert_\varphi$ 的形式：偏差不超过填充面积乘单面偏差。相干的阿贝尔通量在小角时取到第二式的量级。第三式说：威尔逊圈的矢高不超过“所围面积”乘“该面上的作用量”，对任何构型成立，不涉及测度。

### F7 平坦、纯规范与条款的对应（`手工推导`；有冻结依据）

| 比较公理一侧 | 格点规范一侧 |
| --- | --- |
| 条款 II：$c_{yx}=c_{xy}^*$ | 反向链变量取逆 |
| 条款 III：$c_{xy}c_{yx}=\mathbf 1$，加正性 | 链变量是酉元，结构群紧致 |
| 条款 IV 在一个面上成立 | 该面和乐为 $\mathbf 1$，矢高为零 |
| 条款 IV 处处成立，$c_{xy}=g_x^*g_y$（R6） | 纯规范构型 |
| 换锚点与逐点重标 $c_{xy}\mapsto\Omega_x^*c_{xy}\Omega_y$ | 规范变换；$\varphi(v)$ 不变因为 $\varphi$ 是迹 |
| 条款 IV 的偏差之和 $\sum_p\varphi(v(h_p))$ | $S_W/\beta$ |

条款 IV 在附录 E 的定义里只对两两可比的三点提出。在三角形面上，上表第三行是字面意义；在没有对角比较的小方格上，它指的是把同一条件（面和乐为 $\mathbf 1$）搬到四点闭环。

$\varphi$ 忠实，所以 $S_W=0$ 当且仅当每个面和乐为 $\mathbf 1$。此时是否为纯规范取决于面是否填满每个圈（R18）：圆盘上是（脚本由树势重建链变量）；环面上不是，一条缝上的链变量取 $-1$ 时作用量为零而绕行和乐为 $-1$。这两点在所钉提交上有冻结定理：弦图上 `IsChordal.exists_gain_potential`（附录 E 已引用），$\mathbb Z/2$ 系数的周期网格上 `PeriodicGridHolonomy.flat_exact_iff` 与 `horizontal_seam_counterexample`（书稿尚未引用，见第 6 节）。

读法（`MODEL`）：规范场的运动学是“相邻可比、条款 IV 不强制”的比较结构，威尔逊作用量是条款 IV 偏差的矢高总和。权重 $e^{-S_W}$、测度与连续极限都不在这条读法之内（`U4`）。

## 3. 引力项：角亏、矢高与半比较

### F8 雷吉角亏与矢高（`手工推导`；雷吉作用量及其收敛为 `文献结果`）

1. 二维：闭凸多面体的顶点角亏之和恒为 $4\pi=720^\circ$（笛卡尔定理，即书中的 $720^\circ$ 陈述）；矢高之和 $\sum_v(1-\cos\delta_v)$ 不是拓扑量：正四面体 $8$，立方体 $8$，正八面体 $9$，正十二面体 $3.8197$，正二十面体 $6$。
2. 测地细分的二十面体（$V=12,42,162,642$）上，角亏之和保持 $4\pi$，矢高之和为 $6.0000,\ 1.8711,\ 0.4886,\ 0.1235$，按 $1/V$ 衰减。
3. 三面角顶点：设三个面的外法向为 $n_1,n_2,n_3$，面角为 $\theta_1,\theta_2,\theta_3$，则

$$
\delta_v=2\pi-(\theta_1+\theta_2+\theta_3)=2\operatorname{atan2}\bigl(\lvert[n_1,n_2,n_3]\rvert,\;1+n_1\cdot n_2+n_2\cdot n_3+n_3\cdot n_1\bigr),
$$

   右端是 R9 中半比较三点和乐的转角。
4. 书中的示例铰链（四个正四面体共棱）：$\delta_h=2\pi-4\arccos\tfrac13=77.885^\circ=1.3593$，$\sin\delta_h=0.9777$，$1-\cos\delta_h=0.7901$，$\tfrac12\delta_h^2=0.9239$。

证明。第 1 款：正多面体 $\{p,q\}$ 的顶点数 $V=\tfrac{4p}{4-(p-2)(q-2)}$，角亏 $2\pi-q\pi(1-\tfrac2p)$，直接计算。第 3 款：以三条棱方向为顶点的球面三角形边长是 $\theta_i$；三个外法向构成它的极三角形，极三角形的内角是 $\pi-\theta_i$（极三角形定理，`文献结果`），吉拉尔角盈为 $\sum(\pi-\theta_i)-\pi=\delta_v$；再代入 R9 的闭式。第 2、4 款是数值。$\square$

含义。雷吉作用量 $\sum_hA_h\delta_h$（Regge 1961）对角亏是一次的；矢高是二次的。铰链度量按 $a^{D-2}$、角亏按 $a^2$、铰链个数按 $a^{-D}$ 标度时，一次式之和为 $O(1)$（并在胖单纯形加细下收敛到 $\tfrac12\int R\,dV$，Cheeger–Müller–Schrader 1984，`文献结果`），矢高加权和为 $O(a^2)$，第 2 款是它的二维实例。所以**雷吉项不是矢高之和**；小角亏时两者也不相等，只是 $1-\cos\delta$ 与 $\tfrac12\delta^2$ 接近，而第 4 款的示例铰链上这两个量已相差 $14.5\%$。

### F9 偶通道与奇通道（`手工推导`；与连续作用量的对应为 `文献结果` 或 `MODEL`）

1. 设 $\ell$ 是 $M_N(\mathbb C)$ 上的实线性泛函，在 $\mathrm{SU}(N)$ 共轭下不变，且对回路反向不变（$\ell(h^*)=\ell(h)$）。则在 $\mathrm U(N)$ 上 $\ell(h)=aN\bigl(1-\varphi(v(h))\bigr)$，$a\in\mathbb R$：矢高是唯一的这种读数（差一个仿射变换）。
2. 奇通道 $A(h)=\tfrac12(h-h^*)$ 的不变线性读数只有 $\tfrac1N\operatorname{Im}\operatorname{tr}h$；它在 $\mathrm{SU}(2)$ 上恒为零，在 $N\ge3$ 时随回路反向变号。
3. 绕单位轴 $n$ 转角 $\delta$ 的转动 $R$ 满足 $-\tfrac12\operatorname{tr}(K_nR)=\sin\delta$、$\tfrac12(\operatorname{tr}R-1)=\cos\delta$，$K_n$ 是该轴的生成元；前者随回路反向变号，后者不变。这是三维的写法；$D$ 维时取转动平面的生成元 $K$，有 $-\tfrac12\operatorname{tr}(KR)=\sin\delta$、$\tfrac12\bigl(\operatorname{tr}R-(D-2)\bigr)=\cos\delta$。

证明。第 1 款：F1 第 2 款的论证给出 $\ell(h)=\operatorname{Re}(c\operatorname{tr}h)$，$c\in\mathbb C$；反向不变消去 $\operatorname{Im}\operatorname{tr}h$ 的系数（$\mathrm{SU}(2)$ 上该项本来为零）。第 2、3 款直接计算。$\square$

由此得到一个精确的区分。规范项读偶通道，不需要回路定向。雷吉角亏 $\delta_h=\operatorname{atan2}(\sin\delta_h,\cos\delta_h)$ 是带符号的转角：$0\le\delta_h\le\pi$ 时它的大小是矢高的函数 $\arccos(1-v)$，符号只能由奇通道给出，而奇通道要求一个随回路反向而变号的配对对象；在引力里这个对象是铰链的对偶平面（由度量给出），$-\tfrac12\operatorname{tr}(K_hR_h)=\sin\delta_h$。以 $A_h\sin\delta_h$ 为铰链项的格点引力作用量见 Caselle–D'Adda–Magnea 1989（`文献结果`）。内部规范群没有这样的配对对象，所以它的最低阶局部作用量只能是矢高。把“规范项读偶通道，引力项读带符号的转角并以铰链度量加权”当作两类力的结构区别是 `MODEL` 读法；其中的代数陈述是上面三款。

## 4. “统一”的确切含义

### F10 成立的、不成立的与不蕴涵的（`手工推导`；第 4 款含 `文献结果`）

1. **成立。** 紧致结构群的小方格项是回路和乐的矢高（F1），满足 $0\le\varphi(v)\le2$（R2）；雷吉铰链和乐是转角为 $\delta_h$ 的转动，其矢高为 $1-\cos\delta_h$（向量读数经 $2\times2$ 块归一）。两类场都由“回路和乐偏离单位元”描述，条款 III 给出两者共同的比安基与斯托克斯恒等式（F5、F6）。
2. **不成立。** “杨—米尔斯作用量与引力作用量都是和乐矢高之和”对爱因斯坦—希尔伯特（雷吉）作用量不成立（F8、F9）。
3. **有界与无界。** 对洛伦兹群，向量表示的迹读数在转动上为 $\tfrac12(1-\cos\theta)\ge0$，在推进上为 $\tfrac12(1-\cosh\eta)\le0$；相应地 $\operatorname{tr}J^2=-2$、$\operatorname{tr}K^2=+2$，迹型不定。R20 把这两种情形分开：有界群可酉化，矢高非负；推进无界，矢高读数没有下界。这与 R3 的读法一致（`MODEL`）。
4. **不蕴涵。** 上述结构不确定规范群、表示内容、代数；不确定耦合常数：$\mathfrak g=\bigoplus_i\mathfrak g_i$（单理想或 $\mathfrak u(1)$）上的不变对称双线性型恰由每个理想一个尺度参数给出（舒尔引理），对 $G_{\mathrm{SM}}$ 是三个；不确定动力学：任何在单位元附近二阶展开相同的类函数给出同一经典连续极限（F2、F3；量子层面的普适性为 `文献结果`）。

所以 §39.9 的“万力归弧”在数学上可以落实为第 1 款与 F9 的偶奇区分；它是运动学层面的共同语言，不是把四种力的耦合或动力学归并成一个。

### F11 电荷量子化需要精确回归，有界回归不够（`手工推导`；物理陈述为 `文献结果`）

设 $w:\mathbb R\to\mathrm U(n)$ 是连续单参数群，$w(t)=e^{itQ}$。

1. 若存在 $T\ne0$ 使 $w(T)=\mathbf 1$，则 $Q$ 的谱含于 $\tfrac{2\pi}T\mathbb Z$。
2. 有界性不蕴涵第 1 款的前提：$Q=\operatorname{diag}(1,\sqrt2)$ 时一切 $w(t)$ 是酉元，条款 II–IV 与正性条件成立，但 $t\ne0$ 时 $w(t)\ne\mathbf 1$；$\{w(t)\}$ 的闭包是二维环面。
3. 单个比较 $u$ 满足 $u^n=\mathbf 1$（某个 $n\ge1$）当且仅当它的本征角都是 $2\pi$ 的有理倍数。有界时总有近似回归：对任意 $Q_0\ge1$ 存在 $1\le n\le Q_0^{\,r}$（$r$ 为不同本征角的个数）使 $\lVert u^n-\mathbf 1\rVert_{\mathrm{op}}\le\tfrac{2\pi}{Q_0}$。

证明。第 1 款：$e^{iTQ}=\mathbf 1$ 且 $Q$ 厄米，谱映射。第 2 款：$e^{it}=e^{i\sqrt2t}=1$ 要求 $t\in2\pi\mathbb Z\cap\sqrt2\pi\mathbb Z=\{0\}$。第 3 款前半同第 1 款；后半是狄利克雷联立逼近定理（`文献结果`）加 $\lvert e^{ix}-1\rvert\le\lvert x\rvert$。$\square$

紧致 $\mathrm U(1)$ 的电荷量子化不是“有界回归（R20）”的推论。R20 给出的是电荷为实数（椭圆类）；量子化等价于各场的相位有公共的精确周期，即规范群是圆周而不是直线（Yang 1970，`文献结果`）。脚本中 $u=\operatorname{diag}(e^{i},e^{i\sqrt2})$ 在 $n\le2\times10^5$ 内最近只回到 $4.1\times10^{-3}$。

### F12 §39.11.2 的迹代数究竟说了什么（`手工推导`；与谱作用量的关系为 `文献结果`）

对一般色数 $N_c$ 与反常相消电荷 $Y_Q=\tfrac1{2N_c}$、$Q_u=\tfrac{N_c+1}{2N_c}$、$Q_d=-\tfrac{N_c-1}{2N_c}$：

1. 书中的迹全部成立：$\operatorname{Tr}T_3^2=\tfrac{N_c+1}2$，$\operatorname{Tr}(T_c^a)^2=2$，$\operatorname{Tr}Y^2=\tfrac{(N_c+1)(N_c+2)}{2N_c}$，四个反常系数对一切 $N_c$ 为零，$\sin^2\theta_W=\tfrac{N_c}{2(N_c+1)}$，$g_3^2/g_2^2=\tfrac{N_c+1}4$，$k_Y=\tfrac{N_c+2}{N_c}$；$N_c=1,\dots,5$ 的表逐格相符。
2. **双曲线交点是恒等式。** 把“固定电荷”取为反常相消曲线在 $N_\star$ 处的电荷，两条曲线之差为

$$
\frac{(N_c-N_\star)(N_c+N_\star)}{2(N_c+1)\bigl(N_cN_\star^2+N_c+2N_\star^2\bigr)},
$$

   对每个 $N_\star>0$ 唯一正根都是 $N_c=N_\star$。书中的 $N_\star=3$ 来自输入的夸克电荷 $(\tfrac23,-\tfrac13)$。交点与一条线性条件同解：实测电荷给出 $Y_Q=Q_u-\tfrac12=\tfrac16$，$[\mathrm{SU}(2)_L]^2\mathrm U(1)_Y$ 反常相消要求 $N_cY_Q=\tfrac12$，故 $N_c=3$。所以“实测电荷加反常相消给出 $N_c=3$”成立，这是反常相消把夸克电荷与色数联系起来的通行陈述；交点不是独立于电荷输入的第二重约束。
3. **不依赖电荷输入而单独选出 $N_c=3$ 的只有一条。** 在刚度公设下 $g_3^2=g_2^2$ 当且仅当 $\operatorname{Tr}T_3^2=\operatorname{Tr}(T_c^a)^2$，即 $N_c=3$。书中的 (a) 在反常相消曲线的电荷下对一切奇数 $N_c$ 成立（在固定的实测电荷下只在 $N_c=3$ 成立）；(c)、(d) 是该曲线上的量在 $N_c=3$ 处的取值。
4. **公设所取的读数。** 设 $G$ 经 $\rho$ 作用在账本 $\mathcal H$ 上。$\tfrac1{g_A^2}=\kappa\operatorname{Tr}_{\mathcal H}(X_A^2)$ 就是：动能型取 $\operatorname{End}(\mathcal H)$ 上归一迹读数的拉回。归一迹是唯一在全体 $\mathrm U(\mathcal H)$ 共轭下不变的态（F1 第 2 款）；只要求 $\rho(G)$ 不变时，可对各不可约多重态取任意正权 $w_Q,w_u,w_d,w_L,w_e$，得到 $g_3^2/g_2^2=\tfrac{N_cw_Q+w_L}{2w_Q+w_u+w_d}$，可为任意正数。反过来，公设只约束三个规范理想上的迹，并不蕴涵读数在全体 $\mathrm U(\mathcal H)$ 下不变：$N_c=3$ 时取 $(w_Q,w_u,w_d,w_L,w_e)=(1,\tfrac12,\tfrac32,1,\tfrac32)$，加权迹为 $\operatorname{Tr}_wT_3^2=\operatorname{Tr}_w(T_c^a)^2=2$、$\operatorname{Tr}_wY^2=\tfrac{10}3$，三条关系 $g_3^2=g_2^2=\tfrac53g_Y^2$ 与 $\sin^2\theta_W=\tfrac38$ 全部成立，而这个读数不是迹。
5. **$\tfrac38$ 依赖账本内容。** 对单李群，$\operatorname{Tr}_R(XY)$ 在任何表示 $R$ 中都是同一个不变型的倍数（舒尔引理），所以比值与 $R$ 无关：$\mathrm{SU}(5)$ 的 $\mathbf5$、$\mathbf{10}$、$\mathbf{15}$、$\mathbf{24}$ 上都有 $\operatorname{Tr}T_3^2/\operatorname{Tr}Q^2=\tfrac38$、$\operatorname{Tr}T_3^2=\operatorname{Tr}T_c^2$、$\operatorname{Tr}Y^2=\tfrac53\operatorname{Tr}T_3^2$。对 $G_{\mathrm{SM}}$ 比值依赖表示：单独一个希格斯二重态给 $\tfrac12$；三代费米子加一个希格斯二重态、按单圈真空极化的权重（外尔费米子 $\tfrac23$、复标量 $\tfrac13$）给 $\tfrac{25}{66}\approx0.3788$。一代费米子给出 $\tfrac38$，是因为它作为 $G_{\mathrm{SM}}$ 表示恰是 $\mathrm{SU}(5)$ 的 $\bar{\mathbf5}\oplus\mathbf{10}$ 的限制。

证明。第 1–3 款是有理函数恒等式（脚本用符号计算核对）。第 4 款：迹读数的拉回即 $\operatorname{Tr}(d\rho(X)d\rho(Y))$；分块加权时 $\tfrac1{g_3^2}\propto w_Q+\tfrac12(w_u+w_d)$，$\tfrac1{g_2^2}\propto\tfrac12(N_cw_Q+w_L)$。第 5 款：权重求平方和。$\square$

三点说明。其一，第 4 款表明刚度公设所取的迹读数在跨概念的酉变换下不变，而 §39.10 把跨概念转动称为“语法幽灵”；公设的三条耦合关系本身并不要求这种不变性（上面的加权读数是例子）。这里只提出一个留给作者的问题：公设应表述为“取整本账本上的迹”，还是只表述为三条迹关系。其二，“不借 $\mathrm{SU}(5)$ 而得 $\tfrac38$”在“不引入 $(X,Y)$ 规范玻色子”的意义上成立，数值内容则来自一代费米子的 $\mathrm{SU}(5)$ 完备性（经验输入加反常相消）。其三，同一归一化 $g_3^2=g_2^2=\tfrac53g_1^2$ 在谱作用量框架里由对费米子空间取迹得到（Chamseddine–Connes 1997，`文献结果`；其摘要写明规范耦合常数之间的关系与 $\mathrm{SU}(5)$ 相同）；书中第 4 款的归一化与之相同，是否保留“范式反转”的说法由作者决定。附带的算术事实：书中所用的 $(b_1,b_2,b_3)$ 的物质部分 $(\tfrac{41}{10},\tfrac{25}6,4)$ 正是带上述权重的这些迹。

### F13 跑动与“普朗克合流”的数值（输入给定下的算术；`NUM`，不是预言）

输入：$M_Z=91.1876$ GeV，$\widehat\alpha^{-1}=127.930$，$\sin^2\widehat\theta_W=0.23129$，$\alpha_3=0.1180$，$(b_1,b_2,b_3)=(\tfrac{41}{10},-\tfrac{19}6,-7)$，$E_P=1.220890\times10^{19}$ GeV。书中两张跑动表、等级比、瞬子指数、希格斯账本各项全部复算相符。另有四个书中没有写出的读数：

1. $\mu_{12}$ 的定义是 $\alpha_1(\mu_{12})=\alpha_2(\mu_{12})$，它由输入的 $\sin^2\widehat\theta_W(M_Z)$ 解出；$\tfrac38-0.14371=0.23129$ 是把输入代回，属于一个参数拟合一个数据。
2. 用 $\widehat\alpha$ 与 $\sin^2\widehat\theta_W$ 定出 $\mu_{12}$ 后，三耦合在该处相等所蕴涵的 $\alpha_3(M_Z)=0.0711$，输入值为 $0.1180$；等价的说法是书中已给的 $0.2076$ 与 $\Delta\alpha^{-1}=3.664$。
3. 若把 $\tfrac38$ 放在单胞标度 $E_P$（§39.11 没有作这一认定，该节的 $\mu_{\mathrm{arc}}$ 取为 $\mu_{12}$；这里只作对照），无阈值单圈跑动给出 $\sin^2\widehat\theta_W(M_Z)=0.1522$；书中表格已列出 $\sin^2\widehat\theta_W(E_P)=0.47146\ne\tfrac38$。
4. $\alpha_G(E)=(E/E_P)^2$ 与 $\alpha_i(E)$ 相等的能标是 $E/E_P=0.170,\ 0.144,\ 0.141$；在 $E_P$ 处 $\alpha_G/\alpha_i=33.3,\ 49.5,\ 52.4$。

另：取 $H_0=67.4\ \mathrm{km\,s^{-1}Mpc^{-1}}$、$\Omega_\Lambda=0.685$，$\epsilon_{\min}=\ell_P/R_H=1.18\times10^{-61}$，矢高底板 $1-\cos\epsilon_{\min}=6.9\times10^{-123}$，$\Lambda\ell_P^2=3\Omega_\Lambda\epsilon_{\min}^2=2.85\times10^{-122}$，两者之比恒为 $\tfrac1{6\Omega_\Lambda}=0.243$。“$10^{-122}$ 的呼应”等价于弗里德曼方程下 $\Omega_\Lambda=O(1)$，书中已标 `MODEL` 并设反循环护栏，此处只补上精确比值。

状态：这些是给定输入下的数值说明。作为可检验陈述，“$\tfrac38$ 加最小标准模型单圈跑动”在第 2、3 款的意义上与数据不符，除非引入未指定的阈值；书中已把阈值闭合列为 `OPEN`。

## 5. 三维封顶与钟慢

### F14 “三维概念场封顶”的数学内容（`手工推导`；叉乘分类为 `文献结果`）

1. $\binom d2=d$ 当且仅当 $d\in\{0,3\}$。等价地，对 $d\ge1$，$\mathfrak{so}(d)$ 的伴随表示与向量表示同维当且仅当 $d=3$；此时霍奇星给出等变同构。这是该节可以称为定理的内容。
2. 以下三个计数对每个 $d$ 都有同形公式，不选出 $3$：刚性盈余 $\binom N2-\bigl(dN-\binom{d+1}2\bigr)=\tfrac{(N-d)(N-d-1)}2$，根为 $\{d,d+1\}$；$k$ 个 $d$ 维块的跨块生成元数 $d^2\binom k2$；$n$ 个向量的格拉姆行列式为正当且仅当线性无关。
3. $\mathfrak{so}(d)$ 的伴随表示的交换子代数维数：$d=3,4,5,6$ 时为 $1,2,1,1$。只有 $\mathfrak{so}(4)$ 分裂；$\mathfrak{so}(5)$（10 维）与 $\mathfrak{so}(6)$ 是单的。
4. $\mathcal{Cl}_{4,0}$ 中的正交 4-标架 $e_1,\dots,e_4$，$c_{ij}=e_ie_j$：条款 II、III、IV 成立，求同读数是标量 $\delta_{ij}$，正性条件成立，格拉姆矩阵秩为 4。五个两两内积为 $-\tfrac14$ 的单位向量的格拉姆矩阵半正定、秩 4，不能放进 $\mathbb R^3$。所以 $\mathcal A_0$ 加条款 IV 加正性不给出秩不超过 3。
5. 各处的“3”不是同一个不变量：空间是实维数 3；色是定义表示的复维数 3（实维数 6，$\dim\mathfrak{su}(3)=8$）；布洛赫球是 $\dim\mathfrak{su}(2)=3$，三能级系统的同一计数是 8。

证明。第 1、2 款是多项式恒等式；第 3 款由数值线性代数给出交换子维数（维数为 1 即伴随表示不可约）；第 4 款逐项验证；第 5 款是计数。$\square$

第 4 款针对的是比较公理的条款；§39.10 的封顶论证用的是“旋度回到向量”，并不援引比较公理，所以这个反例应归入附录 E 的台账。

“为什么都是三维的？因为都是场”因此是 `MODEL`：做功的假设是“二阶旋度量要与一阶方向量同型”，即要求存在叉乘。麦克斯韦方程 $dF=0$、$d{\star}F=J$ 在任意维数都有意义，磁场在 $d\ne3$ 时是二形式而不是向量；这是去掉该假设后的反例。满足“与两因子正交、模长等于面积”的双线性叉乘只在 $d=1,3,7$ 存在（Eckmann 1943；Brown–Gray 1967，`文献结果`），其中 $d=7$ 不满足雅可比恒等式。

### F15 只给时间流逝函数的模型缺什么（`手工推导`；度规为 `文献结果`）

静态度规中静止观察者的固有加速度是 $a_i=c^2\partial_i\ln N$，其模要用空间度规量取。史瓦西外部解中 $\lvert a\rvert=\tfrac{GM}{r^2\sqrt{1-r_s/r}}$；对坐标 $r$ 求导而不用空间度规，得到的是 $\tfrac{GM}{r^2(1-r_s/r)}$，两者之比为 $(1-r_s/r)^{-1/2}$，在书中算例 $r=2.5r_s$ 处是 $1.291$。预算律 $\sqrt{1-\eta}$、$1-\tfrac\eta2$、$e^{-\eta/2}$、$(1+\eta)^{-1/2}$ 的一阶项相同，二阶系数为 $-\tfrac18,\ 0,\ \tfrac18,\ \tfrac38$。所以 §39.8 的钟慢公式与 §39.9.3 的加速度公式在牛顿极限之外的内容，都来自所借用的史瓦西标定（`U12`）；书中已说明缺 $g_{rr}$，这里补上的是加速度一式同样依赖它。

### F16 附：哈尔测度下的矢高与旋量—向量读数（`手工推导`）

$\mathrm{SU}(2)$ 上哈尔测度下 $s=\tfrac12\operatorname{tr}U$ 的密度是 $\tfrac2\pi\sqrt{1-s^2}$，故矢高 $v=1-s$ 服从 $[0,2]$ 上的半圆律，均值 $1$，方差 $\tfrac14$（$S^3$ 上均匀测度向一个坐标的投影）。向量（伴随）表示的矢高与旋量矢高的关系是

$$
1-\tfrac13\operatorname{tr}R(U)=\tfrac23\,v(U^2)=\tfrac43\,v(U)\bigl(2-v(U)\bigr),
$$

其中 $v(U^2)=2v(2-v)$ 是 R20 第 1 款的倍角公式。转角 $2\pi$ 时旋量矢高取最大值 $2$ 而向量矢高为 $0$：这是 $720^\circ$ 双覆叠在矢高读数上的形式。

## 6. 所钉提交上的冻结声明

检索方式：在钉版的祖先提交 `4e2a0d3fcca69885dfcf5b56184838554ebb5239` 上对 `D5` 的 `digest` 行按 holonomy、plaquette、gauge、curvature、Regge、deficit、Bianchi、Stokes、Lorentz、Clifford、anomaly、hypercharge、Weinberg、Gauss–Bonnet 等词检索，读取候选文件；表中各声明随后在钉版上逐个复核：`Golden/Frozen/state/<路径>.lean.json` 存在，声明种类为 `theorem`，源文件与检索时相同。

| 冻结 GID | 实际陈述 | 与本文的关系 | 锁文件 |
| --- | --- | --- | --- |
| `D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula` | 任意环中 `SemiconjBy U f translated` 推出 $Uf-fU=(\mathit{translated}-f)U$ | F4 第 1 款的环恒等式 | 已解析 |
| `D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness` | 交换群值二上链：四面体条件恒零当且仅当是边一上链的上边缘，另含缺陷计数界 | F5 第 3 款 | 已解析 |
| `D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential` | 有限弦图上取逆且三角相容的群值增益是顶点势之比 | F7：平坦推出纯规范 | 已解析 |
| `D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential` | 三角偏差不超过 $\varepsilon$ 时存在势，边偏差不超过 $(\lvert V\rvert-2)\varepsilon$ | F6、F7 的稳定性一侧 | 已解析 |
| `D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification` | 有限图上圆群边相位模锚定规范变换同构于 $m+k-n$ 维环面 | $\mathrm U(1)$ 规范轨道 | 已解析 |
| `D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.flat_exact_iff` | $M\times N$ 周期网格上 $\mathbb Z/2$ 边标号 $y$ 若平坦（每个小方格四边之和为零），则 $y$ 是顶点标号的梯度当且仅当 `rowHolonomy y 0 = 0` 且 `columnHolonomy y 0 = 0` | F7：环面上零作用量不等于纯规范 | 未引用，需 `./tbook pin --refresh` |
| `…PeriodicGridHolonomy.horizontal_seam_counterexample` | $M,N\ge3$ 时 `seam 1 0` 平坦，行和乐为 1，列和乐为 0，且不是任何梯度（两个下界在证明中没有用到，但属于冻结陈述） | 同上，反例 | 未引用 |
| `…PeriodicGridHolonomy.flat_decomposition`、`flat_holonomy_constant`、`holonomy_sector_card`、`flat_label_card` | 平坦标号等于梯度加两条缝；行、列和乐与位置无关；每个和乐扇区有 $2^{MN-1}$ 个，平坦标号共 $2^{MN+1}$ 个 | 同上 | 未引用 |
| `D5/S3/Observer/AgencyHolonomy/ZeroLoopPotentialEquivalence.closed_path_zero_iff_exists_potential` | 连通群胚上取值于交换群的可加代价在一切闭路为零，当且仅当是顶点势之差 | F7 的阿贝尔情形 | 未引用 |
| `D5/S3/ConceptDynamics/Gluing/GlobalFrameCoboundaryCriterion.global_frame_iff_transition_coboundary` | 群值转移数据存在相容的整体标架系数，当且仅当转移数据是局部单位的上边缘 | F7：纯规范的另一表述 | 未引用 |
| `D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff` | 任意实内积空间中三个向量的格拉姆行列式为正当且仅当线性无关 | 不含 $N_c$ 或维数上界（A9、A14） | 已解析 |
| `D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences` | 载体固定为 $\mathbb R\times\mathbb R^3$，满足 `P2`、`PB` 的二元运算是正负叉乘 | 维数 3 在假设里（A14） | 已解析 |
| `D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity` | 实数组的拉格朗日恒等式 | 不含时钟预算（A12） | 已解析 |

在所查范围内没有找到以下内容的冻结声明：小方格矢高与曲率范数的界（F2）、非阿贝尔比安基或斯托克斯界（F5、F6）、雷吉角亏或笛卡尔定理（F8）、反常迹与温伯格角（F12）、单圈跑动（F13）。

## 7. 新内容与经典内容

| 结果 | 经典来源 | 本文所做 |
| --- | --- | --- |
| F1 第 1 款 | 威尔逊作用量的定义（Wilson 1974） | 改写为 R1 的矢高；指出 $N\ge3$ 需要读数 |
| F1 第 2 款、F9 第 1 款 | 舒尔引理 | 作为“矢高读数唯一”的陈述写出 |
| F2 | 初等不等式；Manton 1980 的弧长作用量 | 给出带常数的双侧界与取等条件 |
| F3 | 格点规范理论教科书 | 给出中点链变量下 $O(a^6)$ 的完整证明（偶性论证） |
| F4 | $F=[D,D]$；矩阵模型中的对易子作用量 | 有限孔径的精确形式，并接到冻结的环恒等式 |
| F5、F6 | 格点比安基恒等式、非阿贝尔斯托克斯、范坎彭引理 | 立方体上的自由群验证；带常数的“面积乘作用量”界 |
| F7 | 平坦联络与 $\operatorname{Hom}(\pi_1,G)$ | 条款对照表；找到 $\mathbb Z/2$ 环面情形的冻结定理 |
| F8 | 笛卡尔定理、极三角形、雷吉演算 | 角亏与 R9 的闭式相接；指出雷吉项不是矢高和 |
| F9、F10 | 一阶形式的引力作用量；不变型的分类 | 偶奇通道的表述；否定“都是矢高之和” |
| F11 | Yang 1970；狄利克雷逼近 | 否定“由 R20 推出量子化”，给出反例 |
| F12 | Georgi–Quinn–Weinberg 1974 的迹公式；谱作用量 | 指出交点恒等式、公设所取读数的刻画与加权反例、账本依赖 |
| F13 | 单圈重整化群 | 复算；补四个读数 |
| F14 | 李代数维数、叉乘分类 | 分列三种“3”，给出不封顶的反例 |
| F15、F16 | 静态时空；$\mathrm{SU}(2)$ 的哈尔测度 | 补充说明 |

除 F12 第 2 款（交点恒等式）、F6 的显式常数与 F8 第 3 款的接法之外，本文不主张数学新颖性；这三处也未做文献查新。

## 8. 没有核实的事项

- 文献（Wilson 1974；Regge 1961；Cheeger–Müller–Schrader 1984；Manton 1980；Batrouni 1982；DeGrand–Toussaint 1980；Caselle–D'Adda–Magnea 1989；Yang 1970；Georgi–Quinn–Weinberg 1974；Chamseddine–Connes 1997；Eckmann 1943；Brown–Gray 1967）除下一条外均未核对原文，陈述、年份与归属按通行表述；其中“Caselle–D'Adda–Magnea 的铰链项为 $A_h\sin\delta_h$”最需要回查。
- Chamseddine–Connes 1997 只核对了 arXiv 摘要（hep-th/9606001）：摘要写明规范耦合常数之间的关系与 $\mathrm{SU}(5)$ 相同；$g_3^2=g_2^2=\tfrac53g_1^2$ 的具体写法与正文没有核对。
- PDG、CODATA 与超级神冈的数值取自书稿，未对照来源。
- 没有编译或运行任何 Lean；冻结状态只按状态片存在与声明种类判断。
- 英文版只核对了相关句子，没有通读；交互页面只按“合流”“会师”“唯一”等词检索了 `unified-arc-forces-planck-sandbox` 与 `af-gut-arc-field-unification-sandbox` 的源文件，没有逐页查看；静态图没有检查。
- §32.6 的八大纲领总表没有逐格审计。
- F3 只在二维切片上对一个 $\mathrm{SU}(2)$ 场做了数值复核；F5 只覆盖四面体与立方体。
- 没有计算两圈跑动或任何阈值修正。

## 9. 未解决

- 条款 IV 的偏差为什么以 $e^{-\beta\sum\varphi(v)}$ 加权，以及由此出发的四维连续极限与质量间隙（`OPEN`，附录 E `H9`）。
- 引力读奇通道所需的铰链平面在比较结构中如何给出；洛伦兹签名下的雷吉路径积分与无质量自旋 2 传播子（`OPEN`，[@prob-ch34-gravity-dynamics-and-coupling]）。
- 刚度公设能否由更弱的比较条件得到；阈值闭合（`OPEN`，[@prob-ch39-af-gut-threshold-and-proton-stability] 第 1 款）。
- 秩不超过 3 的封顶能否由某条操作条件推出（F14 表明现有条款不够）。
- 宇宙学常数的符号与大小（`OPEN`）。

## 10. 数值复算输出

复算脚本：[unified_arc_check.py](unified_arc_check.py)，在安装 `numpy`、`sympy`、`mpmath` 的环境运行 `python3 docs/project/unified_arc_check.py`，种子 `20261117`。输出如下（末行的耗时随机器变化）。

```text
[OK] F1a: 1-(1/N)Re tr U = ||U-1||_HS^2/(2N) = phi(v), max dev 6.7e-16 (SU2, SU3, U4)
[OK] F1b: SU(2): similarity part S is the scalar (1/2)tr U, max dev 4.8e-16
[OK] F1c: finite twirl over the clock-shift group gives (tr X/N) 1 exactly
[OK] F2: (2/pi^2)||F||^2 <= phi(v) <= ||F||^2/2 and phi(v) >= ||F||^2/2 - phi(F^4)/24 (min slacks 1.55e-06, 1.14e-12, -1.31e-16)
[OK] F2eq: lower constant 2/pi^2 is attained at eigen-angles in {0, pi}
[OK] F3: 1-(1/2)Re tr U_p = (a^4/4) tr F^2 + O(a^6): tr F^2 = 2.346257, observed remainder orders 6.016, 6.004, 6.001; even in a
[OK] F4a: h-1 = [u1,u2](u2 u1)^* and phi(v_h) = (1/2)||[u1,u2]||_phi^2, max dev 2.2e-15
[OK] F4b: SU(2): v_h = 2 sin^2(a/2) sin^2(b/2) sin^2(psi); book card (60,60,90 deg): v = 1/8, angle 57.91 deg
[OK] F4c: [T1,T2] = (U_p - 1) T2 T1 and sum_p (1-(1/N)Re tr U_p) = ||[T1,T2]||_HS^2/(2N) = 9.099213
[OK] F5a: tetrahedron: h(x,y,z)h(x,z,w)h(x,w,y) = c_xy h(y,z,w) c_yx for non-flat random comparisons
[OK] F5b: cube: ordered product of six tree-lassoed plaquettes is the empty word in F(12); order top>front>right>back>left>bottom, base corners (0, 2, 2, 1, 0, 0); random SU(3) links dev 3.1e-15
[OK] F5c: cube, abelian: the six outward plaquette fluxes of an edge potential sum to 0
[OK] F6a: fan Stokes identity and sqrt-sagitta subadditivity on a heptagon (non-flat SU(3) data)
[OK] F6b: 4x3 Wilson loop = ordered product of 12 lassoed plaquettes (free-group identity); ||W-1|| <= sum ||U_p-1|| and v_C <= M sum v_p hold, max ratio 0.230; the word identity holds for every grid up to 6x6
[OK] F6c: tightness: coherent U(1) fluxes give ratio 0.999404
[OK] F7a: disc: U_xy = g_x^* g_y has zero action; flat links are recovered from a tree potential (dev 2.9e-15)
[OK] F7b: torus: one seam of -1 links has zero action but row holonomy -1, so it is not a pure gauge
[OK] F8a: sum of deficits = 720 deg for all five; sagitta sums differ: tetrahedron 8.0000, cube 8.0000, octahedron 9.0000, dodecahedron 3.8197, icosahedron 6.0000
[OK] F8b: trihedral corner: 2pi - sum(face angles) = 2 atan2([n1,n2,n3], 1+sum n.n) (500 random corners, max dev 3.1e-14; cube 90 deg, tetrahedron 180 deg)
[OK] F8c: geodesic spheres (V, sum of 1-cos deficit): (12, 6.0000), (42, 1.8711), (162, 0.4886), (642, 0.1235); sum of deficits stays 4 pi
[OK] F8d: book hinge (4 regular tetrahedra): deficit 77.885 deg = 1.3593 rad, sin = 0.9777, 1-cos = 0.7901, d^2/2 = 0.9239
[OK] F8e: right spherical triangle with two 45 deg legs: excess 19.47 deg = asin(1/3)
[OK] F8f: boundary of the regular 4-simplex: deficit 148.41 deg on each of the 10 edges
[OK] F9: odd channel: tr(h-h*) = 0 on SU(2) (max 6.7e-16), nonzero on SU(3) (1.58); hinge reading -tr(J R)/2 = sin(deficit) flips under loop reversal, tr R does not
[OK] F10: trace reading on SO(1,3): rotation (1-cos)/2 >= 0, boost (1-cosh)/2 <= 0; tr K^2 = +2, tr J^2 = -2 (indefinite trace form)
[OK] F11a: u = diag(e^i, e^(i sqrt2)): all powers bounded, closest return for n <= 2e5 is 4.13e-03 at n = 150476, never 0
[OK] F11b: rational eigen-angles return exactly (n = 35); exp(2 pi i Q) = 1 iff spec Q is integral
[OK] F12a: Tr T3^2 = (N+1)/2, Tr Tc^2 = 2, Tr Y^2 = (N+1)(N+2)/(2N), four anomalies vanish for all N; sin^2 = N/(2(N+1)), g3^2/g2^2 = (N+1)/4, k_Y = (N+2)/N
[OK] F12b: the two curves of 39.11.2 meet exactly at N_c = N_star for every N_star (difference (N_c - N_star)*(N_c + N_star)/(2*(N_c + 1)*(N_c*N_star**2 + N_c + 2*N_star**2))); with the measured charges, N_c Y_Q = 1/2 and Y_Q = 1/6 give N_c = 3
[OK] F12c: book table rows N_c = 1..5 reproduced exactly
[OK] F12d: Tr T3^2/Tr Q^2 = 3/8 on the SU(5) representations 5, 10, 15, 24; Higgs doublet alone 1/2; matter-weighted SM ledger 25/66
[OK] F12e: G_SM-invariant weights (w_Q, w_u, w_d, w_L, w_e) = (1, 1/2, 3/2, 1, 3/2) give Tr T3^2 = Tr Tc^2 = 2, Tr Y^2 = 10/3, sin^2 = 3/8; with free weights g3^2/g2^2 = (3 w_Q + w_L)/(2 w_Q + w_u + w_d) is unbounded
[OK] F13a: mu12 = 1.0140e+13 GeV (ln = 25.4345); 3/8 - 0.14371 = 0.23129 is the input value again (mu12 is defined from it)
[OK] F13b: three-line one-loop value sin^2 = 0.2076 at 6.755e+14 GeV; alpha_s(MZ) implied by mu12 = 0.0711 (input 0.1180); 3/8 imposed at E_P gives sin^2(MZ) = 0.1522; minimal span 3.664 at mu13
[OK] F13c: alpha_G(E)=(E/E_P)^2 equals alpha_i at E/E_P = 0.170, 0.144, 0.141; at E_P itself alpha_G/alpha_i = 33.3, 49.5, 52.4
[OK] F13d: hierarchy, instanton (S = 185.91), Yukawa, Yukawa-range and string-tension numbers reproduced; Planck-suppressed lifetime 10^44.8 yr
[OK] F13e: with H0 = 67.4, Omega_L = 0.685: l_P/R_H = 1.178e-61, sagitta floor 6.93e-123, Lambda l_P^2 = 2.85e-122, ratio = 1/(6 Omega_L) = 0.243
[OK] F14a: C(d,2) = d only for d in {0,3}; rigidity surplus = (N-d)(N-d-1)/2 for every d; cross-block count = d^2 C(k,2); commutant of ad so(d): {3: 1, 4: 2, 5: 1, 6: 1} (only so(4) splits)
[OK] F14b: an orthonormal 4-frame satisfies clauses II-IV with scalar similarity and has Gram rank 4; five equidistant points need R^4 (Cayley-Menger determinant -5.0 != 0)
[OK] F15: static observers: |a| = GM/(r^2 sqrt(1-r_s/r)); the coordinate gradient of ln(lapse) is larger by 1/sqrt(1-r_s/r) (= 1.291 at r = 2.5 r_s); four budget laws share the Newtonian limit, second-order coefficients [-1/8, 0, 1/8, 3/8]
[OK] F16: Haar SU(2): sagitta has the semicircle law on [0,2], mean 1, variance 1/4 (sample 0.994, 0.250); vector sagitta = (2/3) v(u^2) = (4/3) v (2-v)

all 41 checks passed in 3.5 s
```

## 11. 留给作者决定的事项

下列各项涉及模型的表述或作者的行文，没有随本笔记改动书稿。每项给出位置、问题与建议措辞；中文为权威版本，英文说同一件事。行号是基线上的行号，“旧”指书稿现有文字。各项可以分别取舍，相互依赖之处已注明。

### D1 规范项的公式（A1）

位置：[§39.9.1](../../books/quantum-geometry/zh/ch39-s09-unified-arc-forces-and-planck-convergence.md#sec-ch39-09-1) 第 18 行的公式与第 23 行的条目标题；英文版同处。

问题：公式写的是 $\kappa_{\mathrm{gauge}}\operatorname{Tr}(\Omega_{\mathrm{intra}})$，第 24 行的文字说的是威尔逊小方格项 $\operatorname{Re}\operatorname{Tr}(I-U_\square)$。$\mathfrak{su}(n)$ 的元素无迹，前者对 $\mathrm{SU}(2)$、$\mathrm{SU}(3)$ 恒为零；对 $\mathrm U(1)$ 是线性通量，求和后只剩边界项。把公式改成矢高会让左项不再是“角的一次式”，触及“两项同为弧度角”的对称写法，所以留给作者。

建议：公式片段改为下式，两种语言相同；第 23 行标题里的 `$\operatorname{Tr}\bigl(\Omega_{\mathrm{intra}}(\Delta\mathcal{T}_\epsilon)\bigr)$` 同改为 `$\operatorname{Re}\operatorname{Tr}\bigl(I - U_{\partial\Delta\mathcal{T}_\epsilon}\bigr)$`。不用 $\tfrac1N$ 归一，因为同一公式里 $N$ 已经表示顶点数。

```text
\underbrace{\sum_{\Delta\mathcal{T}_\epsilon \in \mathcal{K}} \kappa_{\mathrm{gauge}}\,\operatorname{Re}\operatorname{Tr}\!\bigl(I - U_{\partial\Delta\mathcal{T}_\epsilon}\bigr)}
```

并在第 24 行“……$U_{\partial\Delta\mathcal{T}_\epsilon} = \exp\bigl(i\Omega_{\mathrm{intra}}(\Delta\mathcal{T}_\epsilon)\bigr)$。”之后加一句（句末的交叉引用只在采用 D10 的新增注记时保留）：

```text
zh：这一项取的是和乐的矢高 $\operatorname{Re}\operatorname{Tr}(I - U)$，对 $\Omega_{\mathrm{intra}}$ 是二次的；$\mathfrak{su}(n)$ 的元素无迹，$\operatorname{Tr}\Omega_{\mathrm{intra}}$ 本身对 $\mathrm{SU}(2)$ 与 $\mathrm{SU}(3)$ 恒为零（见 [@rem-ch39-plaquette-sagitta-and-wilson-action]）。
en：This term is the sagitta of the holonomy, $\operatorname{Re}\operatorname{Tr}(I - U)$, quadratic in $\Omega_{\mathrm{intra}}$; elements of $\mathfrak{su}(n)$ are traceless, so $\operatorname{Tr}\Omega_{\mathrm{intra}}$ itself vanishes identically for $\mathrm{SU}(2)$ and $\mathrm{SU}(3)$ (see [@rem-ch39-plaquette-sagitta-and-wilson-action]).
```

### D2 铰链的维数与权重（A2）

位置：§39.9.1 第 18、27–33 行；[§39.11](../../books/quantum-geometry/zh/ch39-s11-af-gut-arc-field-grand-unification.md) `def-ch39-af-gut-master-connection` 第 3 款（第 37、40 行）；英文版同处。

问题：求和下标 $h\in\mathcal K^{(1)}$（棱）与“相邻四面体原胞”属于三维复形，权重 $A_h/\ell_P^2$ 与极限 $\int R\sqrt{-g}\,d^4x$ 属于四维复形。书中的示例铰链（四个正四面体共棱，$77.88^\circ$）与交互页面画的是三维的棱。需要作者选定复形的维数：取三维时权重是 $L_h/\ell_P$，连续极限是三维标量曲率的积分，不再是四维爱因斯坦—希尔伯特作用量；取四维时铰链是三角形，需要在 §39.9.1 开头引入四维单纯复形，并把“相邻四面体原胞”改为“相邻原胞”。

建议：在选定之前，先在第 27 行“**雷吉角亏（Regge deficit angle）**”之后加一个括注，把两种情形说清：

```text
zh：（三维空间复形中铰链是棱，以长度 $L_h$ 加权；下面与四维爱因斯坦—希尔伯特作用量对照时，铰链是四维单纯复形里的三角形，以面积 $A_h$ 加权）
en：(in a three-dimensional spatial complex the hinges are edges, weighted by length $L_h$; in the comparison with the four-dimensional Einstein–Hilbert action below, the hinges are triangles of a four-dimensional simplicial complex, weighted by area $A_h$)
```

### D3 “无需四维容器”的补充说明（A4）

位置：§39.9.1 第 27 行；[§39.10](../../books/quantum-geometry/zh/ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 第 5 行；英文版同处。

问题：“无需”本身成立。可以补一句说明两种读法并存、本书取其一，并给出 $N=5$ 的实例。这是补充，不是纠错。

建议（第 27 行）：

```text
zh 旧：条超静定比较弦无需撑开四维以上平直空间容器，而是在相邻四面体原胞共享的余维 $2$ 铰链 $h$ 上激发出无量纲**雷吉角亏（Regge deficit angle）**
zh 新：条超静定比较弦有两种读法：放进更高维的平直空间（五个两两等距的点在 $\mathbb{R}^4$ 中是平直的正五胞体），或者留在三维而让铰链带角亏（同一个五胞体的边界，每条棱角亏 $148.41^\circ$）。本书取后一种读法（`MODEL`）：多出的比较弦记在相邻四面体原胞共享的余维 $2$ 铰链 $h$ 上，成为无量纲**雷吉角亏（Regge deficit angle）**
en 旧：surplus comparison chords need no flat `4D+` container; instead, dihedral angles $\theta_k$ of tetrahedral cells meeting along shared codimension-$2$ hinges $h$ register a dimensionless **Regge deficit angle**
en 新：surplus comparison chords admit two readings: place the points in a higher-dimensional flat space (five mutually equidistant points form a flat regular 4-simplex in $\mathbb{R}^4$), or stay in three dimensions and let the hinges carry deficit angles (the boundary of that same simplex, with a deficit of $148.41^\circ$ on every edge). This book adopts the second reading (`MODEL`): the surplus chords are recorded on the codimension-$2$ hinges $h$ shared by neighbouring tetrahedral cells, where the dihedral angles $\theta_k$ meeting at $h$ leave a dimensionless **Regge deficit angle**
```

建议（§39.10 第 5 行）：

```text
zh 旧：同样没有撑开任何四维以上的平直欧氏容器，而是将多余比较弦转化为共享铰链上的雷吉曲率角亏
zh 新：的多余比较弦，在本书的读法里（`MODEL`）记为共享铰链上的雷吉角亏，而不放进更高维的平直空间
en 旧：converted surplus comparison chords into Regge hinge deficits rather than prising open any flat Euclidean container above three dimensions
en 新：have their surplus comparison chords read in this book (`MODEL`) as Regge deficits on shared hinges rather than placed in a higher-dimensional flat space
```

### D4 “普朗克合流”（A5）

位置：§39.9.3 第 113 行（正文）、第 98 行（条目标题）、第 233 行（总表）；英文版同处。

问题：$\alpha_G(E_P)=1$ 由 $E_P$ 的定义给出。书中算例与总表已给出 $E_P$ 处规范耦合为 $\mathcal O(10^{-2})$，没有把它称为预言；“精准合流为 $1$”“正面会师”容易被读成数值相等。是否保留这些修辞由作者定；建议保留原句，在句后注明含义。第 222 行的算例与第 130 行的图注已如实给出数值，不必改。

建议（第 113 行，原句保留，在“……正面会师！”之后加括注；英文在“…circular-arc cell!”之后）：

```text
zh：（$\alpha_G(E_P) = 1$ 由 $E_P$ 的定义给出；同一能标上单圈外推的规范耦合为 $\alpha_i \approx 0.019\text{–}0.030$（见 [@ex-ch39-hierarchy-and-one-loop-rg-calculus]），所以“会师”说的是引力耦合不再比规范耦合小几十个数量级，两者在 $E_P$ 仍相差 $33\text{–}52$ 倍，`NUM`。）
en：(Here $\alpha_G(E_P) = 1$ holds by the definition of $E_P$; the one-loop extrapolated gauge couplings at the same scale are $\alpha_i \approx 0.019\text{–}0.030$ (see [@ex-ch39-hierarchy-and-one-loop-rg-calculus]), so "rejoining" means that gravity is no longer dozens of orders of magnitude weaker than the gauge forces; at $E_P$ the two still differ by a factor of $33\text{–}52$, `NUM`.)
```

建议（第 98 行标题与第 233 行总表；英文标题 “quadratic convergence at the Planck scale” 不必改）：

```text
zh 旧（第 98 行）：却在普朗克能标精准合流为 $1$？
zh 新（第 98 行）：而引力耦合在普朗克能标升到 $1$？
zh 旧（第 233 行）：$\alpha_G(E)=(E/E_P)^2 \to 1$ 与 $\mathcal{O}(10^{-2})$ 规范曲线会师
zh 新（第 233 行）：$\alpha_G(E)=(E/E_P)^2 \to 1$，规范曲线为 $\mathcal{O}(10^{-2})$（相差 $33\text{–}52$ 倍）
en 旧（第 233 行）：as $\alpha_G(E)=(E/E_P)^2 \to 1$ meets $\mathcal{O}(10^{-2})$ gauge band
en 新（第 233 行）：as $\alpha_G(E)=(E/E_P)^2 \to 1$ while the gauge band stays at $\mathcal{O}(10^{-2})$ (a factor of $33\text{–}52$ apart)
```

### D5 刚度公设的表述与“范式反转”（A8、`U6`、`U7`）

位置：§39.11.1 第 51 行；`rem-ch39-georgi-glashow-connes-jacobson-literature` 第 4 条（第 283 行）；英文版同处。

问题：公设所取的读数是整本账本上的迹，它在跨概念的酉变换下不变，而 §39.10 把跨概念转动称为“语法幽灵”；公设的三条耦合关系本身并不要求这种不变性（F12 第 4 款的加权读数）。需要作者决定公设表述为“取整本账本上的迹”还是只表述为三条迹关系。另外，$g_3^2 = g_2^2 = \frac{5}{3}g_Y^2$ 在谱作用量框架里同样出现，“范式反转”是否保留由作者定。

建议（在第 51 行段末加两句）：

```text
zh：这条公设取的读数是整本账本 $\mathcal{H}_{\mathrm{Weyl}}$ 上的迹，也就是唯一在账本的全体酉变换下不变的读数；若只要求读数在 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 下不变，各不可约多重态可以带不同的权 $w_Q, w_u, w_d, w_L, w_e > 0$，此时 $g_3^2/g_2^2 = \frac{3w_Q + w_L}{2w_Q + w_u + w_d}$ 可取任意正值。数值 $\frac{3}{8}$ 还依赖账本由完整的费米子代组成：一代外尔费米子作为规范群表示是 $\mathrm{SU}(5)$ 的 $\bar{\mathbf{5}} \oplus \mathbf{10}$ 的限制；单独一个希格斯二重态给出 $\frac{1}{2}$。
en：The postulate takes as its reading the trace over the whole ledger $\mathcal{H}_{\mathrm{Weyl}}$, the only reading invariant under all unitary transformations of the ledger; if the reading is required to be invariant only under $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$, each irreducible multiplet may carry its own weight $w_Q, w_u, w_d, w_L, w_e > 0$, and $g_3^2/g_2^2 = \frac{3w_Q + w_L}{2w_Q + w_u + w_d}$ can take any positive value. The value $\frac{3}{8}$ also depends on the ledger consisting of complete fermion generations: one generation of Weyl fermions is, as a representation of the gauge group, the restriction of $\bar{\mathbf{5}} \oplus \mathbf{10}$ of $\mathrm{SU}(5)$; a single Higgs doublet alone would give $\frac{1}{2}$.
```

建议（文献注记第 4 条，把耦合关系记在出处上；只核对了摘要，见第 8 节）：

```text
zh 旧：`10.1007/JHEP09(2012)104`）发展；
zh 新：`10.1007/JHEP09(2012)104`）发展，该框架在截断标度给出与 $\mathrm{SU}(5)$ 相同的规范耦合关系；
en 旧：`10.1007/JHEP09(2012)104`);
en 新：`10.1007/JHEP09(2012)104`); at the cutoff scale this framework yields relations between the gauge couplings identical to those of $\mathrm{SU}(5)$;
```

若作者决定不保留“范式反转”，第 51 行句首可改为：

```text
zh 旧：请注意 [@def-ch39-af-gut-master-connection] 第 4 款带来的范式反转：
zh 新：请注意 [@def-ch39-af-gut-master-connection] 第 4 款与单群嵌入的区别（同一归一化关系 $g_3^2 = g_2^2 = \frac{5}{3}g_Y^2$ 在谱作用量框架中同样出现，见 [@rem-ch39-georgi-glashow-connes-jacobson-literature] 第 4 条）：
en 旧：Notice the conceptual inversion achieved by Clause 4 of [@def-ch39-af-gut-master-connection]:
en 新：Notice how Clause 4 of [@def-ch39-af-gut-master-connection] differs from embedding in a simple group (the same normalization $g_3^2 = g_2^2 = \frac{5}{3}g_Y^2$ also arises in the spectral-action framework, see item 4 of [@rem-ch39-georgi-glashow-connes-jacobson-literature]):
```

### D6 “唯一正根 $N_c = 3$”的读法与小节标题（A9）

位置：§39.11.2 第 127 行（正文）、第 57 行（小节标题）；§39.10 第 94 行；英文版同处。

问题：两条曲线之差的唯一正根是 $N_c=3$，这一步代数成立。曲线 II 所固定的电荷正是曲线 I 在 $N_c=3$ 处的取值，交点与线性条件 $N_cY_Q=\frac12$ 同解；“一石四鸟”中不依赖电荷输入而单独选出 $N_c=3$ 的只有 (b)。是否按这一读法改写由作者定。

建议（第 127 行）：

```text
zh 旧：在全部正实数域 $N_c > 0$ 上，上式存在**唯一正根 $N_c = 3$**！也就是说，唯有在三维概念场封顶锁定的 $N_c = 3$ 处，宇宙才能一石四鸟地同时达成：
zh 新：在 $N_c > 0$ 上，上式的唯一正根是 $N_c = 3$。这个交点与一条线性条件有同一个解：实测电荷给出 $Y_Q = Q_u - \frac{1}{2} = \frac{1}{6}$，反常相消要求 $N_c Y_Q = \frac{1}{2}$，故 $N_c = 3$；曲线 II 所固定的电荷 $(+\frac{2}{3}, -\frac{1}{3})$ 正是曲线 I 在 $N_c = 3$ 处的取值，所以交点把实测电荷与色数联系起来，不是独立于电荷输入的第二重约束。四项结论中，(a) 在曲线 I 的电荷下对一切奇数 $N_c$ 成立（在固定的实测电荷下只在 $N_c = 3$ 成立）；(c)、(d) 是曲线 I 在 $N_c = 3$ 处的取值；不依赖电荷输入而单独选出 $N_c = 3$ 的只有 (b)：在刚度公设下 $g_3^2 = g_2^2$ 当且仅当 $N_c = 3$。在实测的 $N_c = 3$ 处，以下四项同时成立：
en 旧：On $N_c > 0$, this rational difference vanishes **if and only if $N_c = 3$**! Thus the three-dimensional color-field cap $N_c = 3$ is the **unique positive dimension** that simultaneously achieves
en 新：On $N_c > 0$, this rational difference vanishes only at $N_c = 3$. The crossing has the same solution as one linear condition: the measured charges give $Y_Q = Q_u - \frac{1}{2} = \frac{1}{6}$, and anomaly cancellation requires $N_c Y_Q = \frac{1}{2}$, hence $N_c = 3$; the charges $(+\frac{2}{3}, -\frac{1}{3})$ held fixed on curve II are exactly the values of curve I at $N_c = 3$, so the crossing ties the measured charges to the number of colours and is not a second constraint independent of the charge input. Of the four statements, (a) holds for every odd $N_c$ with the curve-I charges (and only at $N_c = 3$ with the measured charges held fixed); (c) and (d) are the curve-I values at $N_c = 3$; the only one that singles out $N_c = 3$ without the charge input is (b): under the stiffness postulate $g_3^2 = g_2^2$ if and only if $N_c = 3$. At the measured $N_c = 3$ the following hold together:
```

建议（第 57 行标题；片段 id `sec-ch39-11-2` 不变；英文标题 “Unique $N_c = 3$ Curve Intersection” 已是这个意思，不必改）：

```text
zh 旧：色数 $N_c = 3$ 唯一双曲线锁死
zh 新：色数 $N_c = 3$ 处的唯一双曲线交点
```

建议（§39.10 第 94 行，可选；原句在代数上成立）：

```text
zh 旧：我们还将严格证出，色维数 $N_c = 3$ 更是令量子手征反常相消与温伯格角几何初值精确咬合的唯一正整数根！
zh 新：我们还将看到，在普适圆弧迹刚度公设下，$N_c = 3$ 是使强弱耦合在紫外相等的唯一色数。
en 旧：will prove algebraically, $N_c = 3$ is the unique positive dimension where chiral anomaly cancellation intersects the geometric Weinberg mixing angle!
en 新：will show, under the universal arc-trace stiffness postulate, $N_c = 3$ is the only color number for which the strong and weak couplings are equal in the ultraviolet.
```

### D7 §39.11 导语中的“可证伪”（A13）

位置：§39.11 第 7 行；英文版同处。

问题：四条选择定则与标准模型相同，模型在规范扇区没有区别于标准模型的低能判据；它与单群大统一可以区分，所以“可证伪”本身不错。建议保留原句；若作者愿意加限定，可用下面的写法。

```text
zh 旧：合拢为一整座可算、可验、可证伪的物理统一体系
zh 新：合拢为一整座可算、可验、可证伪的物理统一体系（其规范扇区的低能判据与标准模型相同，定量闭合仍为 `OPEN`）
en 旧：into a quantitative, falsifiable synthesis
en 新：into a quantitative, falsifiable synthesis (its low-energy gauge-sector criteria coincide with those of the Standard Model, and its quantitative closure remains `OPEN`)
```

### D8 希格斯一句与单胞紫外的措辞（A11、A6）

位置：§39.11.3 第 152 行；§39.9.3 第 125 行；§39.9.4 总表第 233 行；英文版同处。

问题：冻结的协变换位子恒等式不决定势的次数与 $-\mu_H^2$ 的符号，“自动生成”“凝结为”偏强。“单胞极限下消融紫外行为”“消去胞间角亏奇点”没有紫外有限性的推导支持；§39.11.3 第 180 行的同类说法已加限定，这两处是否照改由作者定。

建议（§39.11.3 第 152 行）：

```text
zh 旧：非对易余项 $(\mathit{translated} - f)U_\ell$ 自动生成希格斯协变导数项 $D_\mu\Phi_H$；而纯垂直方向的自换位曲率则凝结为双阱势 $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$。
zh 新：非对易余项 $(\mathit{translated} - f)U_\ell$ 在本模型中读作希格斯协变导数项 $D_\mu\Phi_H$；而纯垂直方向的自换位曲率则读作双阱势 $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$（势的次数与 $-\mu_H^2$ 的符号是输入，`MODEL`）。
en 旧：failing to commute horizontal spatial transport $U_\ell$ with vertical chiral folding $f = \Phi_H$ generates the covariant Higgs derivative $D_\mu\Phi_H$, while purely vertical curvature generates the Mexican-hat potential $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$.
en 新：the failure of horizontal spatial transport $U_\ell$ to commute with vertical chiral folding $f = \Phi_H$ is read in this model as the covariant Higgs derivative $D_\mu\Phi_H$, while purely vertical curvature is read as the Mexican-hat potential $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$ (the degree of the potential and the sign of $-\mu_H^2$ are inputs, `MODEL`).
```

建议（§39.9.3 第 125 行，在句末感叹号之前加括注）：

```text
zh：（`MODEL`；这不是紫外有限性的证明）
en：(`MODEL`; this is not a proof of ultraviolet finiteness)
```

建议（第 233 行总表）：

```text
zh 旧：$\Delta E(3)=\Delta E(4)=0$ 消去胞间角亏奇点
zh 新：$\Delta E(3)=\Delta E(4)=0$ 时没有独立的胞间角亏自由度
en 旧：$\Delta E(3)=\Delta E(4)=0$ removes inter-cell hinge singularities
en 新：$\Delta E(3)=\Delta E(4)=0$ leaves no independent inter-cell deficit mode
```

### D9 “都是三维”的身份与总表的维数一栏（A14、`U11`）

位置：§39.10.3（第 132–158 行）；§39.11.4 总表“宏观物理空间维数”一栏（第 348 行）；英文版同处。

问题：各处的“3”不是同一个不变量，封顶依赖“旋度要回到向量”这一对“场”的规定，属于模型原理。总表把封顶归于“三锚格拉姆与麦克斯韦—拉曼双根锁死”，而格拉姆定理不含维数上界，刚性盈余的根 $\{d,d+1\}$ 对每个 $d$ 都出现（F14）。另外，第 132 行说“四条完全独立的数学路径”，编号列出的是三重锁死，第四条（单纯形刚性）没有单列。

建议（放在第三重锁死之后、`hodge-curl-field-cap-3d` 实验卡之前，单独成段）：

```text
zh：本节各处的“3”不是同一个不变量：空间的 3 是实维数；$\operatorname{Im}\mathbb{H}$、$\mathfrak{su}(2)$ 与布洛赫球的 3 是同一个李代数维数（三能级系统的同一计数是 $8$）；色的 3 是定义表示的复维数（$\dim\mathfrak{su}(3) = 8$）。把每个概念场封顶于三维是本书的原理（`MODEL`），不是由上述各条推出的定理。
en：The "3"s in this section are not one invariant: for space it is a real dimension; for $\operatorname{Im}\mathbb{H}$, $\mathfrak{su}(2)$ and the Bloch ball it is one and the same Lie-algebra dimension (the same count for a three-level system is $8$); for colour it is the complex dimension of the defining representation ($\dim\mathfrak{su}(3) = 8$). Capping each concept field at three dimensions is a principle of this book (`MODEL`), not a theorem derived from the items above.
```

建议（第 348 行总表；与上一段同取同舍）：

```text
zh 旧：（三锚格拉姆与麦克斯韦—拉曼 $N \in \{3, 4\}$ 双根锁死）
zh 新：（三维概念场封顶原理，`MODEL`；见 §39.10）
en 旧：(three-anchor Gram & Maxwell–Laman $N \in \{3, 4\}$ root lock)
en 新：(the three-dimensional cap principle, `MODEL`; see §39.10)
```

### D10 新增 §39.9.4 正文（F1、F2、F4、F6–F9）

位置：§39.9.4，`rem-ch39-yang-mills-regge-rg-literature` 之后、`ex-ch39-hierarchy-and-one-loop-rg-calculus` 的引导句之前。

内容：两条注记、一个算例与一个定理盒，全文（中英）另行提交审阅。第一条注记 `rem-ch39-plaquette-sagitta-and-wilson-action` 把威尔逊小方格项写成小方格和乐的矢高（F1、F2、F4、F6），第二条 `rem-ch39-regge-deficit-odd-channel` 说明雷吉角亏读的是带符号的转角而不是矢高之和（F8、F9），算例给出五种正多面体、示例铰链与一个换位和乐的数值，定理盒引用 `PeriodicGridHolonomy.flat_exact_iff` 与 `horizontal_seam_counterexample`（需要 `./tbook pin --refresh`）。这段正文会把 §39.9.1 的“两项同源”限定为“都由回路和乐偏离单位元描述，读法不同”，是否采用由作者决定；D1 的交叉引用依赖它。
