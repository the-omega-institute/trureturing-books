# 32.2 不可表达的三元数与万数归弧：弗罗贝尼乌斯缺口、哈密顿十三载死锁与数系切面投影谱系 {#sec-ch39-inexpressible-ternions-and-number-projections}

> *“一切数都是三元数的投影, 但三元数不可表达, 三元数即极小圆弧体”*

早在[第二十三章 §23.1](ch29-s01-pythagoras-and-number-systems.md#sec-coda-pythagoras-all-is-number) 中，我们曾追随毕达哥拉斯与希帕索斯的足迹，看清人类四代经典数系（$\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{H}$）都是不同维球面上的旋转投影账本；而在上一节 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger) 中，我们又证明了任何能够凭自身旋度闭合的原生概念场必然精确封顶于三维（对正维数 $d \ge 1$，$\binom{d}{2} = d \iff d = 3$）。然而，只要把这两条线索合拢到代数学的地基上，一道横亘了近两百年的著名裂缝便立刻浮出水面：为什么支撑整个物理空间、刚体转动与概念场闭合的核心维数是 **$3$**，偏偏弗罗贝尼乌斯（Frobenius, 1878）与胡尔维茨（Hurwitz, 1898）的实数域赋范可除代数定理给出的维数序列却是 **$1$（实数 $\mathbb{R}$）、$2$（复数 $\mathbb{C}$）、$4$（四元数 $\mathbb{H}$）、$8$（八元数 $\mathbb{O}$）**——唯独跳过了最关键的 **$3$**？

章首这句凝练到极致的命题，一举掀开了这道“弗罗贝尼乌斯缺口”背后的本体论谜底（`MODEL`）：那个在平直线性符号账本里看似“失踪”的**三元数（Ternion，$\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$）**从未缺席——一旦剥去观察者强加给平直向量空间的径向标尺与外置恒等实轴 $\mathbf{1}$，上述四座赋范除环的单位范数球流形恰好是 **$S^0$（$0$ 维离散双点）、$S^1$（$1$ 维圆周）、$S^3$（$3$ 维紧致李群流形）与 $S^7$（$7$ 维平行化球面）**！在平直纸面上遍寻不获的“三”，真身正是内禀自由度严格等于 **$3$** 的弯曲**极小圆弧体** $\Delta\mathcal{T}_\epsilon \cong S^3$：它因自身不设外置观察者标量轴 $\mathbf{1}$ 而对一切三维平直线性表达彻底免疫，同时又在观察者立起参考实轴 $\mathbf{1}$ 的那一刻，沿四把不同维度的投影切刀生发出四元数、复数、实数、有理数、整数与素数的整座数系家族。

## 32.2.1 弗罗贝尼乌斯—胡尔维茨缺口揭秘：从平直维数 1, 2, 4, 8 到单位球流形 $S^0, S^1, S^3, S^7$ {#sec-ch39-19-1}

传统算术与代数学总是默认一条“由简入繁”的平直谱系：仿佛宇宙中先躺着孤立死寂的自然数与实数轴 $\mathbb{R}^1$，数学家为了开方才人工添入虚轴 $\hat{\mathbf{i}}$ 拼出复平面 $\mathbb{R}^2 \cong \mathbb{C}$，继而又为了描述三维空间旋转被迫跳过 $\mathbb{R}^3$、跳进四维线性空间 $\mathbb{R}^4 \cong \mathbb{H}$ 乃至八维空间 $\mathbb{R}^8 \cong \mathbb{O}$。只要站在这张平直向量空间维度表 $d \in \{1, 2, 4, 8\}$ 上仰望，“为何没有三维数系”就会永远像一桩反直觉的代数怪谈。

然而，回到零外部背景的[比较公理 $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)，纯态比较预算恒守单位模方 $\lVert\Psi\rVert^2 = 1$——外置的径向伸缩标尺 $r \in (0, +\infty)$ 并非本体的内禀自由度，而是观察者在平直切空间里记账时外添的缩放倍率。一旦剥除这根冗余的径向标尺，只考察四座实赋范合成代数（满足 $\lVert xy\rVert = \lVert x\rVert\lVert y\rVert$，见 [@rem-ch39-frobenius-hurwitz-hopf-rodrigues-literature] 第 2 款）的**单位范数球面 $S^{d-1} = \{x \in \mathbb{A}_d \mid \lVert x\rVert = 1\}$**，整条维数序列当场发生震撼的几何归位（`文献结果` + `手工推导`）：

$$
\begin{aligned}
\mathbb{R}\;(\dim_{\mathbb{R}} = 1) &\;\longmapsto\; S^0 = \{\pm 1\}\;(\text{内禀维数 } \mathbf{0}), \\
\mathbb{C}\;(\dim_{\mathbb{R}} = 2) &\;\longmapsto\; S^1 \cong \mathrm{U}(1)\;(\text{内禀维数 } \mathbf{1}), \\
\mathbb{H}\;(\dim_{\mathbb{R}} = 4) &\;\longmapsto\; S^3 \cong \mathrm{SU}(2)\;(\text{内禀维数 } \mathbf{3}), \\
\mathbb{O}\;(\dim_{\mathbb{R}} = 8) &\;\longmapsto\; S^7\;(\text{内禀维数 } \mathbf{7}).
\end{aligned}
$$

博特—米尔诺与凯尔维尔（R. Bott & J. Milnor、M. Kervaire, 1958）的平行化定理在拓扑学上彻底锁死了这四颗球面的独一地位（亚当斯 1960 年的霍普夫不变量一定理则表明，承载连续带单位乘法的球面同样只有 $S^0, S^1, S^3, S^7$）：在一切正维球面 $S^m$（$m \ge 1$）中，切丛全局可平行化（即每一点都能无奇点、无“发旋”地铺满 $m$ 支处处线性无关的单位切圆弧方向）的球面，**唯有 $S^1, S^3, S^7$ 三者**；若再要求球面上的乘法满足结合律，使多步路径串接与括号次序无关，则 $S^7$ 亦因丧失结合律而出局——**在整列正维球面 $\{S^m\}_{m \ge 1}$ 之中**，唯一能承载非阿贝尔紧致单连通李群结构的球面流形，正是内禀维数严格等于 **$3$** 的单位三维球面 $S^3 \cong \mathrm{SU}(2)$（其对中心 $\{\pm\mathbf{1}\}$ 的二对一商流形即三维空间旋转群 $\mathrm{SO}(3) \cong \mathbb{RP}^3$）！

为了在全节与后续章节的推导中做到系数分毫不差，我们先将三维圆弧生成元的**两种等价归一化约定及其精确半角因子 `2`** 明确钉死（`手工推导`）：

1. **标准四元数虚单位约定 $(\mathbf{i}, \mathbf{j}, \mathbf{k})$**：满足负单位平方律 $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -\mathbf{1}$（对应 [@thm-ch39-ternion-spin-factor-and-number-projections] 第 5 款的反自伴幺正复结构平方律 $R^2 = -I_n$，`LEAN ✓`），此时两两反对易 $\mathbf{i}\mathbf{j} = -\mathbf{j}\mathbf{i} = \mathbf{k}$，故李括号带精确因子 **$2$**：

   $$
   [\mathbf{i}_a, \mathbf{i}_b] \;:=\; \mathbf{i}_a\mathbf{i}_b - \mathbf{i}_b\mathbf{i}_a \;=\; 2\varepsilon_{abc}\,\mathbf{i}_c \qquad (a, b, c \in \{1, 2, 3\}).
   $$

2. **无因子极小圆弧李生成元约定 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$**：取半幅缩放基 $\mathbf{e}_a := \frac{1}{2}\mathbf{i}_a \leftrightarrow -\frac{i}{2}\sigma_a$（满足 $\mathbf{e}_a^2 = -\frac{1}{4}\mathbf{1}$），则三段正交极小圆弧方向严格以单位结构常数循环互生：

   $$
   [\mathbf{e}_a, \mathbf{e}_b] \;=\; \varepsilon_{abc}\,\mathbf{e}_c, \qquad \Delta\mathcal{T}_\epsilon(\theta, \hat{\mathbf{u}}) \;:=\; \exp\bigl(\theta\,\hat{\mathbf{u}}\cdot\mathbf{e}\bigr) \;=\; \cos\frac{\theta}{2}\,\mathbf{1} + \sin\frac{\theta}{2}\,\bigl(u_1\mathbf{i} + u_2\mathbf{j} + u_3\mathbf{k}\bigr) \;\in\; S^3,
   $$

   其中 $\hat{\mathbf{u}} = (u_1, u_2, u_3) \in S^2$ 为单位转向轴，$\theta \in \mathbb{R}$ 为伴随作用 $x \mapsto \Delta\mathcal{T}_\epsilon\,x\,\Delta\mathcal{T}_\epsilon^{-1}$ 在三维纯虚空间上诱导的实际测地转角。正是 $[\mathbf{i}_a, \mathbf{i}_b] = 2\varepsilon_{abc}\mathbf{i}_c$ 中的这枚因子 $2$，直接铸就了旋量指数映射中的半角 $\frac{\theta}{2}$ 与 $\theta = 360^\circ$ 时的对跖变号 $\Delta\mathcal{T}_\epsilon(2\pi, \hat{\mathbf{u}}) = -\mathbf{1}$！

## 32.2.2 哈密顿十三载之困（1830–1843）：为何三元数不可线性表达？ {#sec-ch39-19-2}

既然内禀三维的极小圆弧体 $\Delta\mathcal{T}_\epsilon \cong S^3$ 如此自然地存在着，为什么从 1830 年到 1843 年整整十三年间，威廉·罗恩·哈密顿（William Rowan Hamilton）反复尝试构造形如 $x = a\mathbf{1} + b\hat{\mathbf{i}} + c\hat{\mathbf{j}} \in \mathbb{R}^3$ 的“线性三元数（Triplets）”乘法，却始终不得其法？他在 1865 年写给儿子的信里回忆，到了 1843 年 10 月上旬，每天早上他下楼吃早餐，两个儿子都会问：“爸爸，你能把三元组乘起来了吗？”他只能伤心地摇头回答：“不，我还是只能把它们加起来和减下去。”

哈密顿的失败绝非代数技巧的疏漏，而是“把数写成带恒等轴 $\mathbf{1}$ 的三维平直线性组合”这一企图本身，迎头撞上了平直线性空间与弯曲圆弧闭合之间的**两重绝对数学铁壁**（`手工推导` + `文献结果`）：

1. **第一重铁壁——实轴 $\mathbf{1}$ 的槽位挤占与奇数维实代数普适零因子死锁**：
   任何试图用线性符号“写出一个数”的动作，都预设要在基底里先腾出**第 $1$ 个槽位**安放观察者自身的恒等标尺 $\mathbf{1}$（满足 $\mathbf{1}\cdot x = x\cdot\mathbf{1} = x$）。这样一来，三维线性空间 $\mathbb{R}^3 = \operatorname{span}_{\mathbb{R}}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$ 里只剩下**两根**正交虚轴 $\hat{\mathbf{i}}, \hat{\mathbf{j}}$（$\hat{\mathbf{i}}^2 = \hat{\mathbf{j}}^2 = -\mathbf{1},\; \langle\mathbf{1},\hat{\mathbf{i}}\rangle = \langle\mathbf{1},\hat{\mathbf{j}}\rangle = \langle\hat{\mathbf{i}},\hat{\mathbf{j}}\rangle = 0$）。一旦计算乘积 $\hat{\mathbf{i}}\cdot\hat{\mathbf{j}}$，在保范性 $\lVert xy\rVert = \lVert x\rVert\lVert y\rVert$ 下左乘 $\hat{\mathbf{i}}$ 与右乘 $\hat{\mathbf{j}}$ 皆为正交变换：

   $$
   \langle \hat{\mathbf{i}}\hat{\mathbf{j}},\, \hat{\mathbf{i}}\rangle \;=\; \langle \hat{\mathbf{j}},\, \mathbf{1}\rangle \;=\; 0, \qquad \langle \hat{\mathbf{i}}\hat{\mathbf{j}},\, \hat{\mathbf{j}}\rangle \;=\; \langle \hat{\mathbf{i}},\, \mathbf{1}\rangle \;=\; 0.
   $$

   若强行把 $\hat{\mathbf{i}}\hat{\mathbf{j}}$ 压回三元线性槽位 $\alpha\mathbf{1} + \beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}$，上式立即迫使 $\beta = \gamma = 0$，即 $\hat{\mathbf{i}}\hat{\mathbf{j}} = \alpha\mathbf{1}$（$\alpha = \pm 1$）；两边右乘 $\hat{\mathbf{j}}$ 并取结合律 $(\hat{\mathbf{i}}\hat{\mathbf{j}})\hat{\mathbf{j}} = \hat{\mathbf{i}}(\hat{\mathbf{j}}^2)$，当场导出 $-\hat{\mathbf{i}} = \alpha\hat{\mathbf{j}}$，与 $\hat{\mathbf{i}}, \hat{\mathbf{j}}$ 线性无关正面相撞！反之，若保留反交换律 $\hat{\mathbf{i}}\hat{\mathbf{j}} = -\hat{\mathbf{j}}\hat{\mathbf{i}} = \alpha\mathbf{1} + \beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}$ 并结合平方，则 $(\hat{\mathbf{i}}\hat{\mathbf{j}})^2 = \hat{\mathbf{i}}(\hat{\mathbf{j}}\hat{\mathbf{i}})\hat{\mathbf{j}} = -\hat{\mathbf{i}}^2\hat{\mathbf{j}}^2 = -\mathbf{1}$，展开右端 $(\alpha\mathbf{1} + \beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}})^2 = (\alpha^2 - \beta^2 - \gamma^2)\mathbf{1} + 2\alpha(\beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}) = -\mathbf{1}$ 则要求 $\alpha(\beta,\gamma) = (0,0)$：若 $\beta = \gamma = 0$ 则 $\alpha^2 = -1$ 在 $\mathbb{R}$ 中无解；若 $\alpha = 0$ 则只给出恒等式 $-\beta^2-\gamma^2 = -1$，但此时左乘 $\hat{\mathbf{i}}$ 得到 $-\hat{\mathbf{j}} = \beta\hat{\mathbf{i}}^2 + \gamma\hat{\mathbf{i}}\hat{\mathbf{j}} = -\beta\mathbf{1} + \gamma(\beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}})$，比较 $\mathbf{1}$ 与 $\hat{\mathbf{j}}$ 系数迫使 $\beta = 0,\; \gamma^2 = -1$，再度在实数域无解！几何真相再清楚不过：双矢量 $\hat{\mathbf{i}}\wedge\hat{\mathbf{j}}$ 必然沿公共法线**垂直刺破** $\operatorname{span}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$ 这只平直三元方盒（对应 [@thm-ch39-ternion-spin-factor-and-number-projections] 第 1 款 `complete_consequences` 唯一锁定的三维外积法向，`LEAN ✓`）。

   **更深刻的是，哪怕彻底放弃结合律、交换律与保范性，任何奇数维 $d = 2m + 1 \ge 3$ 的带单位元 $\mathbf{1}$ 实双线性代数也必定含有零因子**（`手工推导`；它也是 [`exists_zero_divisor`](lean:D5/S3/QuadraticForms/BilinearZeroDivisor.exists_zero_divisor)（`LEAN ✓`）的特例：取 $U = V = W = \mathbb{R}^d$，$d$ 为奇数时每个实系数 $d$ 次多项式都有实根，那里不需要单位元，这一特化为 `手工推导`）：任取一枚不属于标量轴的元素 $x \in \mathbb{R}^d \setminus \mathbb{R}\mathbf{1}$，其线性左乘算子 $L_x : \mathbb{R}^d \to \mathbb{R}^d,\; y \mapsto x\cdot y$ 对应一张 $d \times d$ 实矩阵。由于 $d \ge 3$ 为奇数，其实系数特征多项式 $p_x(\lambda) = \det(L_x - \lambda I_d) = (-\lambda)^d + \dots$ 在 $\lambda \to \pm\infty$ 时异号发散，由实连续函数介值定理**必有至少一个实特征值 $\lambda_0 \in \mathbb{R}$** 及非零实特征向量 $v \in \mathbb{R}^d \setminus \{0\}$，满足

   $$
   L_x(v) = \lambda_0 v \quad \Longleftrightarrow \quad (x - \lambda_0\mathbf{1})\cdot v \;=\; 0!
   $$

   因 $x \notin \mathbb{R}\mathbf{1}$，必有 $x - \lambda_0\mathbf{1} \neq 0$ 且 $v \neq 0$——只要强留单位元 $\mathbf{1}$ 并把三元数塞进三维平直向量空间 $\mathbb{R}^3$，代数就注定当场崩裂出非零相乘归零的零因子死锁！（顺带指出，若放弃单位元 $\mathbf{1}$ 只保留纯三维叉乘 $\mathbb{R}^3 \times \mathbb{R}^3 \to \mathbb{R}^3$，则对任意 $x \neq 0$ 更有自乘归零 $x \times x = 0$，同样无法构成无零因子的线性数系。）

2. **第二重铁壁——弯曲球面角盈与三维平直坐标图的全局拓扑爆表奇点**：
   那么，倘若我们彻底撤去外置标量轴 $\mathbf{1}$，把三个自由度原原本本交还给三支平权的正交圆弧生成元 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$，令三元数以内禀弯曲指数体 $\Delta\mathcal{T}_\epsilon = \exp(\theta_1\mathbf{e}_1 + \theta_2\mathbf{e}_2 + \theta_3\mathbf{e}_3) \in S^3$ 存在，能否在平直空间 $\mathbb{R}^3$ 中为它建立一张**全局光滑无奇点的三维参数表**，从而把它间接地“线性写出来”？

   拓扑学再一次给出了斩钉截铁的“不可能”（`文献结果` + `手工推导`）：无论是单连通旋量流形 $S^3$ 还是伴随旋转流形 $\mathrm{SO}(3) \cong \mathbb{RP}^3$，它们都是**无边界的紧致连通三维流形**。根据布劳威尔区域不变性定理（Invariance of Domain），倘若存在从紧致三维流形 $M^3 \in \{S^3, \mathrm{SO}(3)\}$ 到平直 $\mathbb{R}^3$ 的全局连续单射 $\Phi : M^3 \hookrightarrow \mathbb{R}^3$，其像集 $\Phi(M^3)$ 作为紧致集的连续像必在 $\mathbb{R}^3$ 中有界闭，同时又作为等维流形的连续单射像必在 $\mathbb{R}^3$ 中开——在连通空间 $\mathbb{R}^3$ 中唯一既开又闭的非空子集只有整个无界的 $\mathbb{R}^3$，直接导出有界等于无界的荒谬矛盾！（施图尔普纳格尔 Stuelpnagel 1964 进一步证明覆盖 $\mathrm{SO}(3)$ 至少需要 $4$ 张光滑局部坐标图，覆盖 $S^3$ 至少需要 $2$ 张球极坐标图；在一维圆周双覆盖截面上，[@thm-ch39-ternion-spin-factor-and-number-projections] 第 6、7 款 `no_continuous_global_section` 与 `circle_double_cover_history_lift` 已在 Lean 4 内核中严格证成了连续全局截面的不存在性与 $360^\circ$ 整圈换叶变号。）

   在具体计算中，人类历史上发明的每一种三维平直旋转参数都在各自的视界极点处撞上这道拓扑铁壁（`手工推导`）：

   - **欧拉角 $(\alpha, \beta, \gamma)$ 万向节死锁**：在 `ZYZ` 欧拉分解下，角速度映射雅可比行列式正比于 $\sin\beta$（在航空俯仰—偏航—滚转 Tait–Bryan 角下正比于 $\cos\beta$）；一旦俯仰旋至 $\beta \in \{0, \pi\}$（或 $\pm\frac{\pi}{2}$），两根转轴瞬间共线重合，秩从 $3$ 坍缩为 $2$，触发著名的**万向节死锁（Gimbal Lock）**；
   - **罗德里格斯—吉布斯向量（Rodrigues–Gibbs Vector）$\pi$ 视界爆表**：1840 年奥林德·罗德里格斯（Olinde Rodrigues，早于哈密顿三年写出精确球面半角复合律）定义了三维平直切向量 $\mathbf{g} := \frac{\mathbf{v}}{w} = \tan\!\bigl(\frac{\theta}{2}\bigr)\hat{\mathbf{u}} \in \mathbb{R}^3$（$\mathbf{g}$ 在 $q \mapsto -q$ 下不变，所以它是 $\mathrm{SO}(3)$ 的坐标，不区分 $S^3$ 上的 $\pm q$），使弯曲圆弧乘法化为优美的有理分式合成

     $$
     \mathbf{g}_{12} \;=\; \frac{\mathbf{g}_1 + \mathbf{g}_2 - \mathbf{g}_1 \times \mathbf{g}_2}{1 - \mathbf{g}_1 \cdot \mathbf{g}_2}.
     $$

     然而，分母 $1 - \mathbf{g}_1\cdot\mathbf{g}_2$ 与模长 $\lVert\mathbf{g}(\theta)\rVert = \bigl\lvert\tan\frac{\theta}{2}\bigr\rvert$ 暴露了致命代价：只要合成转角推至半周视界 $\theta \to 180^\circ$（$w = \cos 90^\circ \to 0$），复合分母趋零失效，而三维平直坐标模长 $\lVert\mathbf{g}\rVert$ 当场向 $+\infty$ 垂直发散爆表！
   - **球极凯莱四分之一角向量（Modified Rodrigues / CayleySpinor Chart）$2\pi$ 南极爆表**：即便改用北极球极投影 $\mathbf{c} := \frac{\mathbf{v}}{1 + w} = \tan\!\bigl(\frac{\theta}{4}\bigr)\hat{\mathbf{u}} \in \mathbb{R}^3$ 侥幸跨过 $\theta = 180^\circ$（此处 $\lVert\mathbf{c}(180^\circ)\rVert = 1$），一旦继续推进至旋量对跖南极 $\theta \to 360^\circ$（$q = -\mathbf{1},\; w = -1$），模长 $\lVert\mathbf{c}(\theta)\rVert = \bigl\lvert\tan\frac{\theta}{4}\bigr\rvert$ 依旧不可逃逸地发散至 $+\infty$！

这就是“**三元数不可表达，三元数即极小圆弧体**”的全部几何深意（`MODEL`）：“不可表达”绝非三元数的缺陷，恰恰是无边界紧致圆弧体对平直笛卡尔纸笼的**内禀拓扑免疫**——两段极小圆弧在球面上的合成遵循精确非阿贝尔三角和乐（[@thm-ch39-ternion-spin-factor-and-number-projections] 第 4 款 `shortest_gate_triangle_holonomy`），唯独拒绝被压扁成三列没有奇点的平直加法账单！

::: {.viz src="ternion-number-projection-sandbox" preset="flat-3d-zero-divisor-gimbal-deadlock" height="500"}
平直死锁与 $180^\circ$ 极点卡：$\theta = 179^\circ$ 时，平直三元组左乘矩阵 $L_x$ 暴露实特征根与非零零因子见证，未经截断的罗德里格斯坐标读数为 $\lvert\tan(\theta/2)\rvert = 114.5887$（三维舞台品红柱按 $\min(4, \lvert\tan(\theta/2)\rvert)$ 封顶并在 $180^\circ$ 标极点环），而中央紫色极小圆弧体顺畅跨过半周。坐标与矩阵读数为 `NUM`，极点文献为 `ARGUED`，三元数本体读法为 `MODEL`。
:::

第一重铁壁也可以从三维箭头已有的那种乘法一侧来读：叉乘确实能把两个三元组乘起来，但它只记下两支箭头撑开的面积，把两者的重叠扔掉了；哈密顿添上的第四格，正是存放这份重叠的地方。下面这部短片用两支整数箭头把这笔账算清。

::: {.film src="why-no-ternions"}
**三维乘不拢（2 分 30 秒）。** 白色箭头 $a = (1, 2, 2)$ 与 $b = (0, 3, 4)$ 长 $3$ 与 $5$；品红的叉乘 $(2, -4, 3)$ 从品红平行四边形里竖起来，长 $\sqrt{29} \approx 5.39$，平方后只占 $15^2 = 225$ 中的 $29$；缺的 $196 = 14^2$ 是点积 $14$，它等于 $\lvert a\rvert = 3$ 乘以 $b$ 落在 $a$ 上的青色影子 $14/3$，在三格方盒里无处安放；并且 $a \times a = 0$。写成收据，各行平方恰好对上账：$14^2 + 29 = 225 = 15^2$，青色的点积与品红的叉乘是同一个直角三角形的两条直角边，斜边为 $\lvert a\rvert\lvert b\rvert$（拉格朗日恒等式，[@thm-ch39-nonlinear-ternion-representations-and-torsor] 中的 `lagrange_gram_identity`）。多留一个数位，四元数乘积给出 $ab = (-14;\, 2, -4, 3)$，长 $15 = 3 \times 5$，且 $aa = -9$。在载体 $\mathbb{R} \times \mathbb{R}^3$ 上，满足两点正性与相位平衡的任意关系都是叉乘，至多差一个整体符号；泡利矩阵的像相乘时，点积落在数位上、叉乘落在箭头位上，按 $\varphi(a)\varphi(b)$ 的次序 $D(a, b) = -a \times b$（[@thm-ch39-ternion-spin-factor-and-number-projections] 第 1 款）。收据是比方；哈密顿 1843 年 10 月的早餐问题见于他 1865 年致儿子的信，是史料；实数上不存在三维可除代数（弗罗贝尼乌斯证结合情形、胡尔维茨证赋范情形、霍普夫证一般情形）是文献结果（[@rem-ch39-frobenius-hurwitz-hopf-rodrigues-literature]）；把缺席的三元数读作闭合圆弧体是本书的模型（`MODEL`）；片中数字都是屏幕上的计算。
:::

## 32.2.3 万数归弧：四元数、复数、实数、整数、有理数与素数的四道投影切刀 {#sec-ch39-19-3}

既然原生三元数 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$ 本身没有中心原点、没有特权实轴 $\mathbf{1}$，只由三段互为因果的正交极小圆弧 $[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$ 循环自持，那么人类数学大厦里琳琅满目的“数”究竟从何而来？答案是：**唯当观察者在比较网络中立起自身的主格参考轴 $\mathbf{1}$（即 [§38.7](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream) 中的实轴 $\mathbf{I}$）去度量或书写这枚不可表达的三元圆弧体时，不同的观测嵌入与剖切算子才从同一枚 $\Delta\mathcal{T}_\epsilon$ 上分化出整座数系家族！**

我们将这一颠倒传统算术建构次序的“万数归弧”机制正式提炼为如下几何模型定义：

::: {.definition #def-ch39-ternion-and-number-projection-operators title="无外轴三元数（极小圆弧体）及其四道观察者数系投影算子（模型定义）"}
在比较几何本体框架下（`MODEL`），定义**原生三元数流形**为不预设外置线性标量轴 $\mathbf{1}$、由三维李代数 $\mathfrak{su}(2) = \operatorname{span}_{\mathbb{R}}\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$（$[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$）指数闭合生成的紧致三维极小圆弧体群流形 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3 \cong \mathrm{SU}(2)$。当观察者选定参考恒等基准 $\mathbf{1}$（及可附着的正标度因子 $r > 0$）时，四族经典数系分别由以下四道投影或外嵌算子给出：

1. **四元数外嵌算子 $\iota_{\mathbb{H}} : \mathbb{T}_3 \hookrightarrow \mathbb{H} \cong \mathbb{R} \oplus \mathfrak{su}(2)$（四维冗余余弦阴影外嵌）**：引入第四根辅助标量记账轴 $w = \cos\frac{\theta}{2}\,\mathbf{1}$，将三维弯曲流形 $\mathbb{T}_3$ 等距嵌入四维实线性空间：

   $$
   \iota_{\mathbb{H}}\bigl(\Delta\mathcal{T}_\epsilon(\theta, \hat{\mathbf{u}})\bigr) \;:=\; \underbrace{\cos\frac{\theta}{2}}_{w}\,\mathbf{1} \;+\; \underbrace{\sin\frac{\theta}{2}\,(u_1\mathbf{i} + u_2\mathbf{j} + u_3\mathbf{k})}_{\mathbf{v}} \;\in\; S^3 \subset \mathbb{H}, \qquad w^2 + \lVert\mathbf{v}\rVert^2 \;\equiv\; 1,
   $$

   乘以正径向标度 $r \ge 0$ 张满 $\mathbb{H} = \{r\,\iota_{\mathbb{H}}(U) \mid r \ge 0,\; U \in \mathbb{T}_3\}$，其中标量偏移 $v_{1/2}(\theta) := 1 - w = 2\sin^2\frac{\theta}{4}$ 称为三元圆弧体换取 $4 \times 4$ 实线性矩阵乘法所缴纳的**半角余弦矢高投影税**；

2. **复数赤道切片 $\Pi_{\mathbb C}^{(\hat{\mathbf i})}$ 与霍普夫底空间的复坐标**。取 $\hat{\mathbf i}=\mathbf i$，四元数 $q=w+x\mathbf i+y\mathbf j+z\mathbf k$ 在复平面 $\mathbb C_{\mathbf i}=\mathbb R\mathbf1\oplus\mathbb R\mathbf i$ 上的正交投影为 $\Pi_{\mathbb C}^{(\mathbf i)}(q)=w+x\mathbf i$。单位四元数 $S^3$ 的投影填满闭单位圆盘，而 $S^3$ 与该平面相交所得的大圆 $S^1_{\mathbf i}$ 是可交换的单位复数乘法群。允许径向缩放，就得到整个复平面。

   [@rem-pure-ray-literature] 中的霍普夫映射把归一化旋量 $(\psi_0,\psi_1)$ 送到布洛赫球上的射线。当 $\psi_0\ne0$ 时，这条射线有复坐标 $\zeta=\psi_1/\psi_0$，分子和分母中的共同相位在比值中抵消。北极 $[1:0]$ 对应 $\zeta=0$，南极 $[0:1]$ 在另一张图中取坐标 $\psi_0/\psi_1=0$。

3. **实数内积迹算子 $\Pi_{\mathbb{R}}^{\mathrm{tr}} : \mathbb{T}_3 \to [-1, 1] \subset \mathbb{R}$（一维观察者实轴迹与测地弧长拉直）**：对三元数的 $2 \times 2$ 幺正旋量表示 $U \in \mathrm{SU}(2)$ 取观察者恒等基准上的归一化内积迹

   $$
   \Pi_{\mathbb{R}}^{\mathrm{tr}}(U) \;:=\; \frac{1}{2}\operatorname{Tr}(U) \;=\; \cos\frac{\theta}{2} \;\in\; [-1, 1]
   $$

   （满射覆盖闭区间 $[-1, 1]$，在半周 $\theta = 180^\circ$ 处取 $0$；或沿固定单轴大圆将弯曲相位反解为一维展开测地弧长参数 $s \in \mathbb{R}$），彻底滤除全部 $90^\circ$ 正交盲区转向方位，所得一维实数代数 $\mathbb{R}$ 自身的单位范数球面仅余零维离散点对 $S^0 = \{x \in \mathbb{R} \mid \lvert x\rvert = 1\} = \{\pm 1\}$；

4. **整数、有理数与素数的拓扑同伦闭合算子 $\Pi_{\mathbb{Z}} : [S^3, \mathbb{T}_3] \xrightarrow{\deg} \mathbb{Z}$（零维整圈量子化）**：当紧致三维底空间 $S^3$ 到三元数流形的连续场构型实现 `1—3—3—1` 体点闭合（$\Lambda^3 \equiv \Lambda^0$）时，三维闭流形映射的**三阶同伦度** $\deg : \pi_3(\mathbb{T}_3) = \pi_3(S^3) \xrightarrow{\sim} \mathbb{Z}$（而在选定的一维赤道大圆切片 $S^1_{\hat{\mathbf{i}}}$ 上，则由一阶基本群绕数 $\pi_1(S^1_{\hat{\mathbf{i}}}) \xrightarrow{\sim} \mathbb{Z}$ 计数闭合时间轨道圈数，注意全流形 $\pi_1(S^3) = 0$ 单连通）将连续圆弧量子化为带正反定向符号的离散**整数 $\mathbb{Z}$**；两支选定赤道闭合圆弧周期轨道之间的可公度锁相绕数比 $p/q$（$q \neq 0$）投影为**有理数 $\mathbb{Q}$**；而不可再分解为更短周期整数倍的本原不可约闭合绕行元则在算术模型中对应**素数 $\mathbb{P}$**。
:::

::: {.viz src="ternion-number-projection-sandbox" preset="hamilton-quaternion-w-shadow-tax" height="500"}
第四维余弦影与矢高税卡：在 $\theta = 2\theta^* \approx 84.69^\circ$ 处（不动点依据见 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)，`LEAN ✓`），银白标量柱锁定 $w = \cos\theta^* = \theta^* \approx +0.7391$，青色向量模 $\lVert\mathbf{v}\rVert \approx 0.6736$（$w^2 + \lVert\mathbf{v}\rVert^2 = 1$），品红标出半角矢高税 $1 - w \approx 0.2609$。分量为 `NUM`，影子轴外嵌读法为 `MODEL`。
:::

细细品味 [@def-ch39-ternion-and-number-projection-operators] 中的四道切刀，哈密顿在 1843 年 10 月 16 日走过都柏林皇家运河布鲁厄姆桥（Brougham Bridge）时的电光石火便获得了前所未有的几何透视（`MODEL` + `文献结果`）：

- 哈密顿在桥栏石上刻下 $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -1$，看似是“放弃了三维、发明了四维数”，实则是**向观察者借来了第四根辅助影子轴 $w = \cos\frac{\theta}{2}\,\mathbf{1}$**，把原本弯曲自持的三维极小圆弧体 $S^3$ 外嵌进了四维平直记账盒 $\mathbb{R}^4$！由于单位球面恒等式 $w^2 + x^2 + y^2 + z^2 \equiv 1$ 在南北开半球上分别将 $w = \pm\sqrt{1 - \lVert\mathbf{v}\rVert^2}$ 锁死在 $(x, y, z)$ 的余弦半球面上（$\theta \in [0^\circ, 180^\circ)$ 居北半球 $w > 0$，跨过 $\theta = 180^\circ$ 赤道 $w = 0$ 后进入南半球 $w < 0$，并在 $\theta = 360^\circ$ 抵达对跖南极 $w = -1$），$w$ 根本不是什么神秘的“第四空间维”，它只是弯曲圆弧与平直切弦之间那道不可抹平的二阶矢高余项 $1 - w = 1 - \cos\frac{\theta}{2}$ 的补影；
- 进一步把乘法限制在 $\mathbf{1},\mathbf{i}$ 张成的平面内，任意两个元素的换位子都为零。这一平面在四元数乘法下就是**复数域 $\mathbb{C}$**；再压掉仅剩的一根虚轴 $\hat{\mathbf{i}}$ 只看观察者实轴上的归一化迹 $\frac{1}{2}\operatorname{Tr}(U)$，复数退化为只分正负大小的**实数 $\mathbb{R}$**（注意旋量迹 $\frac{1}{2}\operatorname{Tr}_{\mathrm{SU}(2)}(U(\theta)) = \cos\frac{\theta}{2}$ 在 $\theta = 360^\circ$ 处精准记录对跖负号 $-1$，而三维伴随旋转迹 $\operatorname{Tr}_{\mathrm{SO}(3)}(R(\theta)) = 1 + 2\cos\theta = 4w^2 - 1$ 因把 $w$ 平方抹平了符号，在 $360^\circ$ 处提前回到 $+3$）；最后忽略一切未走完的分数圆弧，只清点整圈闭合的拓扑荷 $\pi_3(S^3) \cong \mathbb{Z}$ 与 $\pi_1(S^1) \cong \mathbb{Z}$，连续流形便凝结成颗粒分明的**整数 $\mathbb{Z}$**、锁相比**有理数 $\mathbb{Q}$**（受长除商余恒等式 [`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant) 支配）与阿代尔乘积守恒下的**素数因子 $\mathbb{P}$**（受 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) 支配）！

::: {.viz src="ternion-number-projection-sandbox" preset="complex-equatorial-hopf-slice" height="500"}
赤道切片卡：$\theta = 120^\circ$、横倾角 $\alpha = 0^\circ$ 时，辅助球面三角形落回同一条赤道大圆，球面角盈收束为 $\Omega = 0.0000\;\mathrm{sr}$，留下可交换复平面上的单位相位；拨高 $\alpha$ 即重新唤醒非阿贝尔角盈（球面三角和乐依据见 [@thm-ch39-ternion-spin-factor-and-number-projections]，读数为 `NUM`）。
:::

## 32.2.4 形式化锚定定理、文献归属、八位小数奇点对账算例与数系谱系总表 {#sec-ch39-19-4}

下面我们将支撑本节三元极小圆弧体代数结构、双轴旋转完备生成、非阿贝尔球面三角和乐、复结构负平方切片、双覆盖全局截面禁律与 $360^\circ$ 换叶提升以及有理数素数位乘积守恒的**八条冻结 Lean 4 内核定理**正式汇集为本节主定理：

::: {.theorem #thm-ch39-ternion-spin-factor-and-number-projections title="自旋因子三维叉乘唯一性、布洛赫纯态球面、双轴旋转有限字、最短门球面三角和乐、复结构负平方、双覆盖无截面与换叶提升及有理阿代尔乘积公式" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences,D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian,D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
在所钉 `trureturing` 冻结声明集中，以下八项数学定理同时成立：

1. **四维自旋因子二元关系的三维叉乘唯一锁定与泡利矩阵接口**（[`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)）：在四维实自旋因子载体 $E = \mathbb{R} \times (\operatorname{Fin} 3 \to \mathbb{R})$ 上，对任意满足二点格拉姆半正定公理 `P2 D` 与正交相位平衡公理 `PB D` 的二元运算 $D : E \to E \to E$，必存在定向 $\varepsilon : \mathrm{Orientation}$（$\varepsilon = \mathrm{.plus}$ 或 $\varepsilon = \mathrm{.minus}$），使得对一切 $a, b \in E$ 恒有 $D(a, b) = \operatorname{crossD}(\varepsilon, a, b)$，且同时满足全部代数推论包 `Consequences D` 与 $2 \times 2$ 复泡利矩阵接口 `MatrixInterfaces (orientationBool ε) D`；

2. **$2 \times 2$ 厄米矩阵的三维实布洛赫重构与秩一纯态单位球面判据**（[`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)）：对任意满足厄米条件 $M.\mathrm{IsHermitian}$ 的矩阵 $M \in M_2(\mathbb{C})$，恒有重构等式 $M = \operatorname{blochMatrix}\bigl(\operatorname{Re}(\operatorname{Tr} M),\, \operatorname{bloch}(M)\bigr)$，且若 $\operatorname{Tr} M = 1$ 且幂等 $M \cdot M = M$，则三维实布洛赫向量必落在单位球面上：$\lVert\operatorname{bloch}(M)\rVert = 1$；

3. **三维空间任意不共线双圆弧轴有限字完备生成 $\mathrm{SO}(3)$**（[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)）：在三维实欧氏空间 $\mathrm{Space}$ 中，设 $a, b \in \mathrm{Space}$ 满足严格柯西—施瓦茨不共线条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$，则对任意满足 $\operatorname{determinant}(R) = 1$ 的正交旋转 $R \in \mathrm{Orthogonal}$，存在由绕轴 $a$ 与绕轴 $b$ 旋转交错组成的有限列表 $l : \operatorname{List}\;\mathrm{Orthogonal}$，使得 $\operatorname{IsAxisWord}(a, b, l)$ 成立且有限乘积精确等于 $R$：$l.\mathrm{prod} = R$；

4. **三方向最短旋子门的球面三角闭路非阿贝尔和乐恒等式**（[`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)）：对任意三支满足 $a \cdot a = b \cdot b = c \cdot c = 1$ 且两两非对跖（$b \neq -a,\; c \neq -b,\; a \neq -c$）的三维实单位方向 $a, b, c : \operatorname{Fin} 3 \to \mathbb{R}$，记标量部 $S_{abc} := \operatorname{triangleS}(a, b, c)$ 与有向行列式部 $D_{abc} := \operatorname{triangleD}(a, b, c)$，则恒有严格正范数分解

   $$
   S_{abc}^2 + D_{abc}^2 \;=\; 2(1 + a \cdot b)(1 + b \cdot c)(1 + c \cdot a) \;>\; 0,
   $$

   三步最短旋子门乘积绕起点轴 $a$ 纯相位闭合为

   $$
   \operatorname{rotor}(c, a)\,\operatorname{rotor}(b, c)\,\operatorname{rotor}(a, b) \;=\; \bigl(\sqrt{S_{abc}^2 + D_{abc}^2}\bigr)^{-1}\bigl(S_{abc}\,I_2 - i D_{abc}\,\operatorname{pauliCombination}(a)\bigr),
   $$

   且对任意满足 $\psi^\dagger \psi = 1$ 与 $\operatorname{qubitProjector}(a)\psi = \psi$ 的归一化本征态 $\psi$，三步最短门复合精确积累回返复相位因子 $\frac{S_{abc} - i D_{abc}}{\sqrt{S_{abc}^2 + D_{abc}^2}}\,\psi$；

5. **反自伴右幺正矩阵的负恒等平方律（复平面切片虚单位公理）**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）：对任意有限可判定指标集 $n$ 上的复矩阵 $R \in M_n(\mathbb{C})$，若满足反自伴性 $R^\dagger = -R$ 与右幺正性 $R R^\dagger = I_n$，则必有 $R^2 = -I_n$；

6. **圆周平方双覆盖不存在连续全局截面**（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：在单位圆群 $\mathrm{Circle}$ 上，不存在连续映射 $s : \mathrm{Circle} \to \mathrm{Circle}$ 使得对一切 $z \in \mathrm{Circle}$ 恒有 $(s(z))^2 = z$；

7. **圆周平方双覆盖的唯一历史依赖路径提升与 $360^\circ$ 整圈对跖变号**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：对平方覆盖映射 $\mathrm{square}(z) := z^2$，任意连续底路径 $\gamma \in C(I, \mathrm{Circle})$ 与满足 $\gamma(0) = z_0^2$ 的初值提升点 $z_0 \in \mathrm{Circle}$ 存在**唯一**连续提升路径 $\tilde{\gamma} \in C(I, \mathrm{Circle})$ 满足 $\mathrm{square} \circ \tilde{\gamma} = \gamma$ 且 $\tilde{\gamma}(0) = z_0$；特别地，从初值 $+1$ 出发沿底圆周走满一整圈 $\mathrm{fullTurn}(t) = \exp(2\pi i t)$（$t \in [0, 1]$）的唯一提升路径在终点精确抵达对跖负叶：$\tilde{\gamma}(0) = +1$ 而 $\tilde{\gamma}(1) = -1$；

8. **非零有理数的阿基米德绝对值与全体素数 $p$-进范数乘积守恒律**（[`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)）：对任意非零有理数 $x \in \mathbb{Q}$（$x \neq 0$），其实绝对值与跑遍全体素数 $p \in \mathrm{Nat.Primes}$ 的有限支撑 $p$-进范数乘积恒等于 $1$：

   $$
   \lvert x\rvert \cdot \prod_{p \in \mathrm{Nat.Primes}}^{\mathrm{fin}} \operatorname{padicNorm}(p, x) \;=\; 1.
   $$

:::

::: proof
第 1 款在 $E = \mathbb{R} \times \mathbb{R}^3$ 上由 `P2 D` 导出纯空间子空间反对称性与柯西—施瓦茨模长上界，再由 `PB D` 锁定正交标架叉乘模长与连通定向 $\varepsilon \in \{\mathrm{.plus}, \mathrm{.minus}\}$，延拓至四维全空间并通过泡利嵌入验证全部 `Consequences` 与 `MatrixInterfaces`（见 [@thm-appf-spin-factor-classification]）。第 2 款利用厄米矩阵对角实部与副对角共轭关系逐元复原 $M$，并在 $\operatorname{Tr} M = 1$ 与 $M^2 = M$ 下由 $\operatorname{Tr}(M^2) = \frac{1}{2}(1 + \lVert\operatorname{bloch}(M)\rVert^2) = 1$ 证得 $\lVert\operatorname{bloch}(M)\rVert = 1$。第 3 款利用不共线双轴单参数旋转群生成的子群在连通紧群 $\mathrm{SO}(3)$ 内既开又闭，故有限字乘积满射覆盖全部行列式为 $1$ 的正交变换。第 4 款利用两两非对跖测地最短旋子 $\operatorname{rotor}(u, v) = \frac{(1 + u\cdot v)I_2 - i((u\times v)\cdot\boldsymbol{\sigma})}{\sqrt{2(1 + u\cdot v)}}$（[`rotor_shortest_gate`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate)）展开三步泡利乘积，消去横向分量后收束至起点轴 $\operatorname{pauliCombination}(a)$，并由拉格朗日—格拉姆恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）核验模方 $S_{abc}^2 + D_{abc}^2 = 2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a) > 0$，作用于本征态 $\operatorname{pauliCombination}(a)\psi = \psi$ 即得回返复相位。第 5 款将 $R^\dagger = -R$ 代入 $R R^\dagger = I_n$ 直接得出 $R(-R) = I_n \implies -R^2 = I_n \implies R^2 = -I_n$。第 6、7 款利用圆周平方双覆盖的商覆盖映射性质证明路径提升存在唯一性，由 $\exp(\pi i t)$ 见证整圈提升从 $+1$ 变号至 $-1$，进而若存在连续全局截面 $s$，则复合回路 $s(\exp(2\pi i t))$ 将迫使起点与终点相等（$+1 = -1$），导出矛盾。第 8 款对非零有理数 $x$ 作唯一素因数幂次分解 $x = \pm \prod_p p^{v_p(x)}$，逐素数代入 $\operatorname{padicNorm}(p, x) = p^{-v_p(x)}$ 并与阿基米德绝对值 $\lvert x\rvert = \prod_p p^{v_p(x)}$ 逐项对消即得 $1$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-frobenius-hurwitz-hopf-rodrigues-literature title="哈密顿三元数手稿、罗德里格斯半角公式、弗罗贝尼乌斯—胡尔维茨—博特—米尔诺—亚当斯定理、流形图册下界与塞尔伯格素测地线边界说明（文献结果与认识论边界）"}
**文献结果与认识论边界声明。** 为严守四层诚实契约，我们将本节援引的外部经典文献定理与本书模型诠释的精确适用域单列如下：

1. **罗德里格斯旋转参数与哈密顿十三载三元数探索史**（O. Rodrigues, *J. Math. Pures Appl.* **5**, 380–440, 1840；W. R. Hamilton, *Proc. R. Irish Acad.* **2**, 424–434, 1844；*Philos. Mag.* **25**, 489–495, 1844）：罗德里格斯于 1840 年率先导出三维旋转半角复合公式与切向量 $\mathbf{g} = \tan(\frac{\theta}{2})\hat{\mathbf{u}}$；哈密顿自 1830 年起长期探索三元线性乘法无果，最终于 1843 年 10 月 16 日引入第四维实标量部创立四元数 $\mathbb{H}$；早餐桌上的问答见他 1865 年 8 月 5 日致儿子阿奇博尔德的信，所述为 1843 年 10 月上旬之事（R. P. Graves, *Life of Sir William Rowan Hamilton*, Vol. II, Ch. XXVIII）；
2. **实可除代数、赋范合成代数与球面平行化的 `1, 2, 4, 8` 分类链**（F. G. Frobenius, *J. Reine Angew. Math.* **84**, 1–63, 1878；A. Hurwitz, *Nachr. Ges. Wiss. Göttingen*, 309–316, 1898；H. Hopf, *Math. Ann.* **104**, 637–665, 1931 & *Comment. Math. Helv.* **13**, 219–239, 1940；R. Bott & J. Milnor, *Bull. Amer. Math. Soc.* **64**, 87–89, 1958；M. Kervaire, *Proc. Natl. Acad. Sci. USA* **44**, 280–283, 1958；J. F. Adams, *Ann. of Math.* **72**, 20–104, 1960）：弗罗贝尼乌斯分类有限维实结合可除代数为 $\mathbb{R}, \mathbb{C}, \mathbb{H}$；胡尔维茨分类带单位元实赋范合成代数为 $1, 2, 4, 8$ 维；霍普夫用上同调环证明有限维实可除代数维数必为 $2$ 的幂，博特—米尔诺与凯尔维尔最终利用 $K$-理论证明不要求结合律的有限维实可除代数亦仅存在于维数 $1, 2, 4, 8$，同一组定理也表明仅 $S^1, S^3, S^7$ 全局可平行化，亚当斯则证明承载连续带单位乘法的球面仅 $S^0, S^1, S^3, S^7$；
3. **$\mathrm{SO}(3)$ 与 $S^3$ 的全局平直坐标图禁律及图册下界**（J. Stuelpnagel, *SIAM Rev.* **6**(4), 422–430, 1964, DOI [10.1137/1006093](https://doi.org/10.1137/1006093)）：严格证明不存在任何无奇点或单射连续的三维平直参数化覆盖紧致群 $\mathrm{SO}(3)$，任何光滑图册至少需要 $4$ 张局部坐标图（而 $S^3$ 的柳斯捷尔尼克—施尼雷尔曼范畴决定其至少需要 $2$ 张球极坐标图）；
4. **同伦绕数 $\pi_3(S^3) \cong \mathbb{Z}$ 与素数本原闭合轨道的几何边界**（H. Hopf, 1931；A. Selberg, *J. Indian Math. Soc.* **20**, 47–87, 1956）：三阶同伦群 $\pi_3(S^3) \cong \mathbb{Z}$ 与一阶基本群 $\pi_1(S^1) \cong \mathbb{Z}$ 为严格代数拓扑定理；而将素数 $\mathbb{P}$ 诠释为“不可分解本原闭合圆弧结”（呼应 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)）属本书比较算术模型（`MODEL`）——须明确指出，常正曲率圆球面 $S^3$ 上的本原闭合测地大圆弧长恒为 $2\pi$，经典塞尔伯格迹公式中具有离散对数长度谱 $\{\ln N(\gamma_p)\}$ 的本原闭合测地线定义在**负常曲率双曲曲面 $\Gamma\backslash\mathbb{H}^2$**（或数域阿代尔商空间）上，绝不能误称为圆球面 $S^3$ 的黎曼拉普拉斯谱定理，经典黎曼猜想的外部证明见 [@conj-riemann-hypothesis]。
:::

::: {.viz src="ternion-number-projection-sandbox" preset="real-trace-geodesic-projection" height="500"}
实迹半角投影卡：$\theta = 360^\circ$ 时，半旋量迹停在对跖负叶 $\frac{1}{2}\operatorname{Tr} U = \cos 180^\circ = -1.0000$，而三维伴随旋转迹已提前回到 $1 + 2\cos 360^\circ = +3.0000$。整圈换叶依据见 [@thm-ch39-ternion-spin-factor-and-number-projections] 第 7 款（`LEAN ✓`），轨迹读数为 `NUM`。
:::

为了让读者亲手验证三维平直零因子死锁、罗德里格斯 $180^\circ$ 爆表奇点、非阿贝尔球面三角复合以及有理长除与阿代尔素数平衡，我们在下方四联算例中给出精确手算与八位小数对账：

::: {.example #ex-ch39-ternion-deadlock-and-eight-angle-projections title="三维平直零因子见证、八档转角投影与奇点八位小数对账、胡尔维茨整四元数 120° 复合及阿代尔乘积守恒算例"}
本算例分四步对本节全部核心命题作定量核验（`手工推导` / `NUM`）：

1. **第一联：平直 $\mathbb{R}^3 = \operatorname{span}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$ 上的显式三次特征根与零因子构造（`手工推导`）**：
   假设有人试图把 $\hat{\mathbf{i}}\hat{\mathbf{j}}$ 强行投影回平面内，例如设双线性乘法表满足 $\mathbf{1}$ 为双边单位元、$\hat{\mathbf{i}}^2 = \hat{\mathbf{j}}^2 = -\mathbf{1}$，且令 $\hat{\mathbf{i}}\hat{\mathbf{j}} = \hat{\mathbf{i}},\; \hat{\mathbf{j}}\hat{\mathbf{i}} = -\hat{\mathbf{i}}$（或任意实系数截断）。考察非标量元 $x = \hat{\mathbf{j}} \notin \mathbb{R}\mathbf{1}$ 在有序基 $(\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}})$ 下的 $3 \times 3$ 实左乘矩阵：由于 $L_{\hat{\mathbf{j}}}(\mathbf{1}) = \hat{\mathbf{j}}$、$L_{\hat{\mathbf{j}}}(\hat{\mathbf{i}}) = -\hat{\mathbf{i}}$、$L_{\hat{\mathbf{j}}}(\hat{\mathbf{j}}) = -\mathbf{1}$，得

   $$
   L_{\hat{\mathbf{j}}} \;=\; \begin{pmatrix} 0 & 0 & -1 \\ 0 & -1 & 0 \\ 1 & 0 & 0 \end{pmatrix}, \qquad \det(L_{\hat{\mathbf{j}}} - \lambda I_3) \;=\; -(\lambda + 1)(\lambda^2 + 1).
   $$

   三次特征多项式果然暴露出唯一实根 $\lambda_0 = -1 \in \mathbb{R}$，对应非零实特征向量 $v = \hat{\mathbf{i}} \neq 0$，当场给出非零元相乘归零的**显式零因子对**：

   $$
   (x - \lambda_0\mathbf{1}) \cdot v \;=\; (\hat{\mathbf{j}} + \mathbf{1}) \cdot \hat{\mathbf{i}} \;=\; \hat{\mathbf{j}}\hat{\mathbf{i}} + \hat{\mathbf{i}} \;=\; -\hat{\mathbf{i}} + \hat{\mathbf{i}} \;=\; 0 \qquad \bigl(\hat{\mathbf{j}} + \mathbf{1} \neq 0,\; \hat{\mathbf{i}} \neq 0\bigr)!
   $$

2. **第二联：八档特征测地转角 $\theta$ 下的数系投影与平直坐标奇点八位小数全指标对账（`NUM`，80 位精度复核）**：
   取自指余弦不动点 $\theta^* = \cos\theta^* \approx 0.73908513\;\mathrm{rad} \approx 42.34645883^\circ$（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)），当空间测地转角取两倍不动点角 $\theta = 2\theta^* \approx 84.69291767^\circ$ 时，四元数第四维余弦影恰好精准锁定在 $w(2\theta^*) = \cos\theta^* = \theta^* \approx 0.73908513$！下表逐行对比四元数余弦影 $w = \cos\frac{\theta}{2}$、虚部模长 $\lVert\mathbf{v}\rVert = \lvert\sin\frac{\theta}{2}\rvert$、半角矢高税 $v_{1/2} = 1 - \cos\frac{\theta}{2}$、罗德里格斯三维平直模长 $\lVert\mathbf{g}\rVert = \lvert\tan\frac{\theta}{2}\rvert$、球极凯莱四分之一角模长 $\lVert\mathbf{c}\rVert = \lvert\tan\frac{\theta}{4}\rvert$ 以及旋量迹 $\frac{1}{2}\operatorname{Tr}_{\mathrm{SU}(2)}(U) = w$ 对三维伴随旋转迹 $\operatorname{Tr}_{\mathrm{SO}(3)}(R) = 1 + 2\cos\theta = 4w^2 - 1$：

   | 空间转角 $\theta$ | 四元数影 $w = \cos\frac{\theta}{2}$ | 虚模 $\lVert\mathbf{v}\rVert = \lvert\sin\frac{\theta}{2}\rvert$ | 矢高税 $1 - \cos\frac{\theta}{2}$ | 罗德里格斯 $\lvert\tan\frac{\theta}{2}\rvert$ | 凯莱图 $\lvert\tan\frac{\theta}{4}\rvert$ | 伴随迹 $1 + 2\cos\theta$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | **$0^\circ$（恒等基点）** | $+1.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $+3.00000000$ |
   | **$60^\circ$（六分圆弧）** | $+0.86602540$ | $0.50000000$ | $0.13397460$ | $0.57735027$ | $0.26794919$ | $+2.00000000$ |
   | **$2\theta^* \approx 84.69291767^\circ$** | **$+0.73908513$** | $0.67361203$ | $0.26091487$ | $0.91141331$ | $0.38733701$ | $+1.18498734$ |
   | **$90^\circ$（正交四分周）** | $+0.70710678$ | $0.70710678$ | $0.29289322$ | $1.00000000$ | $0.41421356$ | $+1.00000000$ |
   | **$120^\circ$（胡尔维茨整元）** | $+0.50000000$ | $0.86602540$ | $0.50000000$ | $1.73205081$ | $0.57735027$ | $0.00000000$ |
   | **$179^\circ$（逼近 $\pi$ 视界）** | $+0.00872654$ | $0.99996192$ | $0.99127346$ | **$114.58865013$** | $0.99131121$ | $-0.99969539$ |
   | **$180^\circ$（罗德里格斯爆表）** | **$0.00000000$** | $1.00000000$ | $1.00000000$ | **$+\infty$（极点未定义）** | $1.00000000$ | $-1.00000000$ |
   | **$360^\circ$（对跖负叶 $-\mathbf{1}$）** | **$-1.00000000$** | $0.00000000$ | $2.00000000$ | $0.00000000$ | **$+\infty$（南极未定义）** | $+3.00000000$ |

   上表第 $6, 7, 8$ 行把平直表达的困境照得纤毫毕现：当 $\theta$ 从 $179^\circ$ 推至 $180^\circ$ 时，弯曲三元数自身不过是平静地滑过赤道大圆 $(w = 0,\; \lVert\mathbf{v}\rVert = 1)$，但三维罗德里格斯平直坐标却从 $114.58865013$ 瞬间炸裂为 $+\infty$；改用球极凯莱图虽能逃过 $180^\circ$，却又在 $\theta = 360^\circ$ 对跖负叶 $q = -\mathbf{1}$ 处炸裂为 $+\infty$！

3. **第三联：两段正交 $90^\circ$ 圆弧的非阿贝尔球面合成与胡尔维茨整四元数闭合（`手工推导`）**：
   先绕 $\mathbf{i}$ 轴转 $\theta_1 = 90^\circ$，再绕正交 $\mathbf{j}$ 轴转 $\theta_2 = 90^\circ$。若世界是平直三维加法，合成转角理应是勾股和 $\sqrt{90^2 + 90^2} \approx 127.27922061^\circ$ 且不生第三轴；而在弯曲三元数 $S^3$ 上，两枚旋子相乘直接给出著名的**胡尔维茨单位整四元数**（见 [第 23 章](ch23-diophantine-definability.md)）：

   $$
   \Delta\mathcal{T}(\tfrac{\pi}{2}, \mathbf{j})\,\Delta\mathcal{T}(\tfrac{\pi}{2}, \mathbf{i}) \;=\; \frac{\mathbf{1} + \mathbf{j}}{\sqrt{2}}\cdot\frac{\mathbf{1} + \mathbf{i}}{\sqrt{2}} \;=\; \frac{\mathbf{1} + \mathbf{i} + \mathbf{j} - \mathbf{k}}{2} \;=\; \cos 60^\circ\,\mathbf{1} + \sin 60^\circ\,\frac{\mathbf{i} + \mathbf{j} - \mathbf{k}}{\sqrt{3}},
   $$

   合成空间转角精确锁定为 **$120^\circ$**（而非 $127.28^\circ$），并沿立方体体对角轴 $\frac{1}{\sqrt{3}}(1, 1, -1)$ 自动唤醒第三正交分量 $-\frac{1}{2}\mathbf{k}$——这正是两轴有限字定理 `two_axis_finite_word`“二生三”的微观圆弧原型！

4. **第四联：锁相有理循环周期与素数位阿代尔乘积守恒核验（`手工推导`）**：
   取锁相绕数比 $p/q = 1/7$ 在十进制基 $b = 10$ 下检验 [`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant)：第 $n = 6$ 步商前缀 $\operatorname{longDivisionPrefix}(10, 1, 7, 6) = 142857$、余数 $\operatorname{remainder}(10, 1, 7, 6) = 1$，精确满足 $7 \times 142857 + 1 = 999999 + 1 = 10^6 \times 1$，六拍余数轨道 $(1 \to 3 \to 2 \to 6 \to 4 \to 5 \to 1)$ 形成闭合循环；再取复合有理比 $x = \frac{12}{35} = 2^2 \cdot 3^1 \cdot 5^{-1} \cdot 7^{-1}$ 检验 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)，其实绝对值 $\lvert x\rvert = \frac{12}{35}$ 与仅有的四枚非平凡素数位范数 $\lvert x\rvert_2 = \frac{1}{4},\; \lvert x\rvert_3 = \frac{1}{3},\; \lvert x\rvert_5 = 5,\; \lvert x\rvert_7 = 7$（其余一切素数 $p \notin \{2,3,5,7\}$ 皆有 $\lvert x\rvert_p = 1$）相乘得

   $$
   \left\lvert\frac{12}{35}\right\rvert \cdot \frac{1}{4} \cdot \frac{1}{3} \cdot 5 \cdot 7 \;=\; \frac{12}{35} \cdot \frac{35}{12} \;=\; 1.00000000!
   $$

:::

::: {.viz src="ternion-number-projection-sandbox" preset="homotopy-pi3-integer-winding" height="500"}
双圈闭合与素数赋值平衡卡：$\theta = 720^\circ$ 时，两颗银珠计出固定轴路径整圈数 $n = \lfloor\theta/360^\circ\rfloor = 2$，旋量提升闭合回 $+1.0000$；有理数滑块切换 $p/q \in \{1/7, 3/5, 12/35, 5/13\}$ 对照长除余数循环与阿代尔乘积 $\lvert x\rvert\prod_p\lvert x\rvert_p = 1.0000$（`LEAN ✓` / `ARGUED` / `NUM`；素数结类比为 `MODEL`）。
:::

至此，我们将整座数学大厦的数系家族沿观察者投影切刀收束为下方五阶谱系总览表：

| 数系名称 | 观察者投影 / 外嵌切刀算子 | 平直线性账本维数 | 单位范数球内禀维 | 伴生约束、丢失或冗余的几何量 |
| :--- | :--- | :---: | :---: | :--- |
| **原生三元数 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$** | 无切刀纯弯曲圆弧闭合 | **不可线性表**（奇维零因子与图册极点禁律） | **$3$ 维（$S^3 \cong \mathrm{SU}(2)$）** | 零冗余、无外置实轴 $\mathbf{1}$，完整保留三轴非阿贝尔角盈 |
| **四元数 $\mathbb{H}$** | 外添第四维余弦阴影轴 $\iota_{\mathbb{H}} : w = \cos\frac{\theta}{2}$ | $4$ 维实线性（$1 + 3$） | $3$ 维（$S^3$） | 冗余 $1$ 维受球面约束 $w^2 + \lVert\mathbf{v}\rVert^2 = 1$ 的标量影（矢高税 $1-w$） |
| **复数 $\mathbb{C}$** | 限制在 $\mathbf{1},\mathbf{i}$ 张成的子代数 | $2$ 维实线性（$1 + 1$） | $1$ 维（$S^1$） | 平面与 $S^3$ 相交于单位圆，$S^3$ 在平面上的正交投影填满闭圆盘 |
| **实数 $\mathbb{R}$** | 实轴归一化内积迹 $\Pi_{\mathbb{R}}^{\mathrm{tr}} = \frac{1}{2}\operatorname{Tr}(U)$ | $1$ 维实线性 | $0$ 维（$S^0 = \{\pm 1\}$） | 滤除全部 $90^\circ$ 正交盲区转向方位，仅留连续正负幅值 |
| **整数、有理数与素数 $\mathbb{Z}, \mathbb{Q}, \mathbb{P}$** | 同伦整圈绕数 $\pi_3(S^3) \cong \mathbb{Z}$ 与锁相比 | $0$ 维离散格 / 商域 | 离散拓扑荷 | 滤除未闭合连续分数圆弧，仅留整圈拓扑荷、锁相周期与素因子 |

上表将“数”的本体论次序彻底扶正了过来（`MODEL`）：在教科书的平直叙事里，人类先抓着离散手指头数出 $1, 2, 3$，再一路打补丁造出负数、分数、无理数、虚数与四元数，仿佛越往后越是远离真实的数学虚构；而在零外部背景的比较几何里，**最先浑然自持存在的恰恰是那枚不可线性书写的三元极小圆弧体 $\Delta\mathcal{T}_\epsilon$**！凡是能被线性符号写进账本里的“数”，无一例外都已向观察者主轴 $\mathbf{1}$ 俯首称臣——多借一维余弦影子就写成四元数，切一刀赤道平面就写成复数，压成一条实迹就写成实数，等它走满整圈清点拓扑结就写成整数。唯独生养万数的三元数本身，因不立孤立之“一”而不可书写，亦因不可书写而圆满具足。

然而，故事才刚刚讲完“向下切去曲率生万数”的上半阕！倘若我们不再向内剖切单枚三元数，而是反过来将**多座三元数场向上耦合拼接**，并再次强行压回观察者的平直线性账本上，又会发生怎样惊心动魄的代数奇观？为什么四元数之上会涌现出八元数的法诺平面七场编织、十六元数的零因子破产，乃至困扰物理学界百年的 **$2^N$ 维多体希尔伯特空间指数爆炸与无穷维泛函空间**？让我们一鼓作气推开本章第三节的大门——[§32.3 三元数即原生场：从凯莱—迪克森阶梯、法诺八元数到希尔伯特空间的多场再投影祛魅](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)。

::: {.viz src="ternion-number-projection-sandbox" height="620"}
完整实验室：切换万数归弧与除环同伦两副透镜，在 $0^\circ$ 至 $720^\circ$ 间拖动圆弧转角、切片横倾角与有理数 $p/q$，同台比较平直三元组死锁、四元数余弦影、赤道切片、实迹与整圈闭合。十条形式化声明、数值、文献、模型与开放问题在依据栏与理论抽屉中分别标明。
:::
