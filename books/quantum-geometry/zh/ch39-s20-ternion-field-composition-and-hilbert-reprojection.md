# 39.20 三元数即原生场：从凯莱—迪克森阶梯、法诺八元数到希尔伯特空间的多场再投影祛魅 {#sec-ch39-ternion-field-composition-and-hilbert-reprojection}

> *“三元数就是场, 四元数及以上直到希尔伯特空间实际上是三元数场的组合后的再投影”*

在 [§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections) 中，我们揭开了代数学史上“失踪的三”：不立外置观察者标量轴 $\mathbf{1}$ 的**三元数（$\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3$）**本是内禀三维的极小圆弧体，向内剖切或借影外嵌才生发出四元数、复数、实数、有理数与整数。现在，把章首这句颠覆性的命题叠加上去，“数”与“场”沿袭数千年的传统从属关系便被彻底翻转，现代数学与量子物理中从四元数、八元数、克利福德旋量一路膨胀至 $2^N$ 维乃至无穷维希尔伯特空间的维数迷雾当场烟消云散（`MODEL`）：

**三元数（$\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$）本身就是宇宙中唯一自持的原生“场”；而四元数、八元数、十六元数、多体希尔伯特空间 $\mathcal{H}_{2^N}$ 直至无穷维希尔伯特空间 $\mathcal{H}_\infty$，从来不是高于三维的新几何实体，全都是将多座三元数场组合耦合之后，再向观察者的平直账本（实轴 $\mathbf{1}$ 或复观测切面 $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}$）做线性化再投影的产物！**

## 39.20.1 三元数即原生场：颠倒“以数拼场”的百年顺序与 $S^3$ 无边界旋度自持 {#sec-ch39-20-1}

翻开任何一部经典场论或微分几何教材，建构顺序总是千篇一律地“先数后场”：先假定手头有一堆孤立死寂的平直实数 $\mathbb{R}$ 或复数 $\mathbb{C}$，再预先搭好一座空旷的三维或四维背景坐标网格，最后往每个格点上塞进几个数字——仿佛“场”是用无数颗平直数字砖块拼出来的次生建筑。

然而，在零外部参考点的[比较公理 $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) 下，孤立的一维实数连一张旋转平面都张不开，根本不可能凭自身维持波动或感应；反过来，一枚剥离了外置标量轴 $\mathbf{1}$ 的原生三元数 $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$，内禀由三段正交极小圆弧生成元 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$ 按单位结构常数循环互生（`手工推导`）：

$$
[\mathbf{e}_1, \mathbf{e}_2] = \mathbf{e}_3, \qquad [\mathbf{e}_2, \mathbf{e}_3] = \mathbf{e}_1, \qquad [\mathbf{e}_3, \mathbf{e}_1] = \mathbf{e}_2 \qquad \bigl(\mathbf{e}_a = \tfrac{1}{2}\mathbf{i}_a,\; [\mathbf{i}_a, \mathbf{i}_b] = 2\varepsilon_{abc}\mathbf{i}_c\bigr).
$$

这三笔首尾相衔的极小圆弧同时具备三项使它**本身即成“场”**的充要几何品格（`手工推导` + `文献结果` + `LEAN ✓`）：

1. **同载体旋度自闭合（[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-10-3)）**：一阶切向流 $\Lambda^1$ 与二阶涡旋面 $\Lambda^2$ 仅在 $d = 3$ 处满足 $\binom{d}{2} = d = 3$，使 $\mathbf{e}_1$ 与 $\mathbf{e}_2$ 的非对易换位环流直接折返为同载体内的第三支方向 $\mathbf{e}_3$（对应 [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences) 在自旋因子上唯一锁定的三维叉乘，`LEAN ✓`），无需向第四维外部容器借道；
2. **无头无尾的紧致零边界闭合（$\partial S^3 = \varnothing$）**：三元数指数流形 $S^3$ 是紧致无边界三维流形，其三阶外代数体元（`1—3—3—1` 回文中的 $\Lambda^3$）处处均匀饱和；在离散模型中，当四面体二上边缘缺陷为零时二上链精确还原为一维边势上微分（[@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 8 款 `tetra_defects_incidence_repair_and_exactness`），而在平面球面旋转图上反向半边面边界精确落入闭链核（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)，`LEAN ✓`）；
3. **全局平行化左不变标架**：在 $S^3$ 的每一点 $g$ 处，左平移推送出的三支毛雷尔—嘉当（Maurer–Cartan）圆弧标架 $g\mathbf{e}_1, g\mathbf{e}_2, g\mathbf{e}_3$ 在李代数不变内积 $\langle\mathbf{e}_a, \mathbf{e}_b\rangle_{\mathfrak{su}(2)} = -2\operatorname{Tr}(\mathbf{e}_a\mathbf{e}_b) = \delta_{ab}$ 下处处正交归一（在外嵌 $\mathbb{R}^4$ 欧氏诱导度量下模长恒为 $\frac{1}{2}$）且永不归零（欧拉示性数 $\chi(S^3) = 0$）。

因此，**三元数绝不是“场里的某一个数值”，三元数无边界、循环互生的弯曲闭合结构本身就是“场”的几何定义**（`MODEL`）！

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="native-ternion-curl-field" height="500"}
原生单场与四元数外嵌卡：上层单座三弧旋度场体穿过透镜（$\lambda = 0.85$），在下层投出 $1$ 根标量柱与 $3$ 根向量柱（$w^2 + \lVert\mathbf{v}\rVert^2 = 1$；下层柱高按本帧最大模长缩放以保清晰，实时读数给出未缩放精确值）。分量为 `NUM`，场体与透镜为 `MODEL`。
:::

## 39.20.2 凯莱—迪克森阶梯真相：四维时空旋量、法诺平面七场八元数与十六元数零因子破产 {#sec-ch39-20-2}

一旦看清“单枚三元数 $\mathbb{T}_3$ 即单座原生三维场”，代数学中著名的**凯莱—迪克森加倍阶梯（Cayley–Dickson Doubling，$\mathbb{R} \to \mathbb{C} \to \mathbb{H} \to \mathbb{O} \to \mathbb{S}_{16}$）**便卸下了全部神秘面纱：每当存在两座以上的三元数场发生耦合，或者观察者执意立起单一恒等标尺 $\mathbf{1}$ 把弯曲的圆弧群乘法改写为**平直的线性矩阵加法**，每一次“多场组合 $+$ 线性再投影”都会在平直账本上成倍虚增表观维数，并在代数性质上留下一道清晰的曲率代价印记：

1. **第一阶：四元数 $\mathbb{H}$（$1 + 3 = 4$）与双场手征旋量投射四维时空及六维电磁场 $(\mathbf{E}, \mathbf{B})$**：
   如 [§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-19-3) 所示，单座三元数场 $\mathbb{T}_3$ 配上观察者参考轴 $\mathbf{1}$，弯曲弧长拆解为 $1$ 维余弦影 $w = \cos\frac{\theta}{2}$ 与 $3$ 维正弦虚矢 $\mathbf{v}$，给出 $1 + 3 = 4$ 维四元数 $\mathbb{H}$。而当我们将**左手与右手两座独立的三元数旋量场**并列组合时，在欧氏紧致实形式下立即得到四维旋量覆盖群

   $$
   \mathrm{Spin}(4) \;\cong\; \mathrm{SU}(2)_L \times \mathrm{SU}(2)_R \;\equiv\; \mathbb{T}_3^{(L)} \times \mathbb{T}_3^{(R)} \qquad \bigl(\dim_{\mathbb{R}}\mathfrak{so}(4) = 3 + 3 = 6\bigr),
   $$

   而在洛伦兹物理实形式下，同一对左右外尔旋量通过复化李代数 $\mathfrak{so}(1, 3) \cong \mathfrak{sl}(2, \mathbb{C})_{\mathbb{R}} \cong \mathfrak{su}(2)_{\mathbb{C}}$（$3$ 支空间旋转圆弧 $+$ $3$ 支正交虚数助推弦，共 $3 + 3 = 6$ 个实自由度，见 [@rem-ch39-cayley-dickson-fano-moreno-mps-literature] 第 2 款）耦合：单支外尔旋量双线性型 $k^\mu = \psi^\dagger \bar{\sigma}^\mu \psi$ 生成未来零光锥射线（$k_\mu k^\mu = 0$），而一般 $2 \times 2$ 厄米旋量矩阵 $X = x_\mu \bar{\sigma}^\mu$（及左右成对狄拉克双旋量流 $\bar{\Psi}\gamma^\mu\Psi$）张满相对论的 **$4$ 维闵可夫斯基时空坐标** $\mathbb{R}^{1,3}$，伴随二阶反对称张量则直接投射为包含电场 $\mathbf{E}$ 与磁场 $\mathbf{B}$ 的 **$6$ 维麦克斯韦—法拉第双矢量** $F_{\mu\nu} \leftrightarrow \mathbf{F}_\pm = \mathbf{E} \pm i c\mathbf{B}$（恰由两支互轭的三维黎曼—西尔伯斯坦三元场合成）！

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="spin4-chiral-spacetime-bivector" height="500"}
左右双场、时空与双矢卡：上层左右两座手征场体（$3 + 3 = 6$ 个局部参数）投向左侧 $2 \times 2$ 四维向量柱块 $q^L \cdot 1 \cdot \bar{q}^R$ 与右侧两排共 $6$ 根双矢柱 $q^L \wedge q^R$（欧氏 $\mathrm{Spin}(4)$ 与洛伦兹时空具有不同度规，文献边界标 `ARGUED`，分量读数标 `NUM`，双层几何读法标 `MODEL`）。
:::

2. **第二阶：八元数 $\mathbb{O}$（$1 + 7 = 8$）与射影法诺平面 $\mathrm{PG}(2, 2)$ 的七场互锁编织**：
   长期被视为“异类怪物”的 $8$ 维八元数 $\mathbb{O}$，底层根本不是什么八维超空间，而是有限射影几何**法诺平面（Fano Plane，$\mathrm{PG}(2, 2) = \mathbb{P}^2(\mathbb{F}_2)$）**上 **$7$ 座三元数场两两共轴互锁的组合网络**，再强行共用**同一个观察者实轴 $\mathbf{1}$** 压平后的 $1 + 7 = 8$ 维线性账本（`文献结果` + `MODEL`）！具体取七支单位虚基 $\{e_1, e_2, e_3, e_4, e_5, e_6, e_7\}$（$e_i^2 = -\mathbf{1}$），令法诺平面的 **$7$ 条有向循环直线**为（指标模 $7$ 循环平移 $(i,\, i+1,\, i+3)$，`手工推导`）：

   $$
   \mathcal{L}_{\mathrm{Fano}} \;=\; \bigl\{(1,2,4),\; (2,3,5),\; (3,4,6),\; (4,5,7),\; (5,6,1),\; (6,7,2),\; (7,1,3)\bigr\},
   $$

   其中每条有向线 $(a, b, c) \in \mathcal{L}_{\mathrm{Fano}}$ 上的乘法满足循环右手律 $e_a e_b = -e_b e_a = e_c$。这幅七点七线图揭示了八元数最震撼的两重真相：

   - **单场内部 $100\%$ 严格结合（阿廷定理 Artin's Theorem）**：$7$ 条法诺直线中的每一条 $\ell = (a, b, c)$，配观察者实轴 $\mathbf{1}$ 都严格张成一座同构于四元数的子代数 $\mathbb{H}_\ell = \operatorname{span}_{\mathbb{R}}\{\mathbf{1}, e_a, e_b, e_c\}$——即**一整座独立自持的三元数场 $\mathbb{T}_3^{(\ell)}$**，且任意两条不同的法诺线恰好相交于唯一 $1$ 根共享圆弧轴！阿廷定理严格证明：八元数 $\mathbb{O}$ 中**任意两个元素生成的子代数永远是结合代数**（落入某座单三元数场内），每条法诺线上的结合子（Associator）恒等于零：

     $$
     [e_a, e_b, e_c] \;:=\; (e_a e_b)e_c - e_a(e_b e_c) \;=\; e_c^2 - e_a^2 \;=\; (-\mathbf{1}) - (-\mathbf{1}) \;=\; 0 \qquad \bigl(\forall (a,b,c) \in \mathcal{L}_{\mathrm{Fano}}\bigr);
     $$

   - **“丧失结合律”纯粹是跨场跳转压平时的球面角盈折痕**：在 $\binom{7}{3} = 35$ 个无序虚基三元组中，除去上述 $7$ 条共线单场，余下 **$28$ 个非共线法诺三角形**必然横跨两座不同的三元数场！一旦沿非共线三元组（例如 $(e_1, e_2, e_3)$，其中 $(1,2)$ 属第 $1$ 场 $(1,2,4)$，而 $(2,3)$ 属第 $2$ 场 $(2,3,5)$）连乘，左结合与右结合分别拐入相反的法向通道，所有 $28$ 个跨场三元组的结合子模长无一例外恒等于 **$2$**（`手工推导`）：

     $$
     [e_1, e_2, e_3] \;=\; (e_1 e_2)e_3 - e_1(e_2 e_3) \;=\; e_4 e_3 - e_1 e_5 \;=\; (-e_6) - (+e_6) \;=\; -2e_6 \neq 0 \qquad \bigl(\lVert[e_1, e_2, e_3]\rVert = 2\bigr)!
     $$

     可见，八元数所谓的“非结合性”，绝非单座物理场的破碎，而是把 $7$ 座互锁弯曲三元数场强行钉死在**同一根标量轴 $\mathbf{1}$ 的单张八维平直表**上时，跨场非共面球面角盈留下的几何折痕！

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="fano-seven-field-octonion-weave" height="500"}
法诺七场与非结合折痕卡：七条有向法诺线织成七座共轴三元场并投向 $1 + 7 = 8$ 根八元数基柱；在共线三元组 $[e_1, e_2, e_4] = 0$ 与跨线三角形 $[e_1, e_2, e_3] = -2e_6$（范数 $2$）之间切换，直接对照品红结合子折痕（阿廷交错代数文献标 `ARGUED`，逐项结合子标 `NUM`，七场编织标 `MODEL`）。
:::

3. **第三阶：十六元数 $\mathbb{S}_{16} = \mathbb{O} \oplus \mathbb{O}e_8$（$16$ 维）与平直账本的零因子破产**：
   倘若不顾跨场曲率折痕，继续按凯莱—迪克森乘法法则

   $$
   (a, b)\cdot(c, d) \;:=\; \bigl(ac - d^* b,\; da + b c^*\bigr), \qquad (a, b)^* := (a^*, -b)
   $$

   （记 $e_0 = (1, 0)$，$e_i = (e_i, 0)$，$e_8 = (0, 1)$，$e_{8+i} = (0, e_i) = e_i e_8$，$1 \le i \le 7$）把更多三元数场硬压进 **$16$ 维十六元数平直表 $\mathbb{S}_{16}$**，由于子块乘法 $ac$ 与 $d^* b$ 同时丧失交换律与结合律，不同三元数场的正交盲区投影开始在 $16$ 维平直表上发生灾难性的反向相消，直接衍生出**非零元相乘归零的“零因子（Zero Divisors）”**（`手工推导`）：取模长同为 $\sqrt{2}$ 的两枚非零十六元数

   $$
   u \;=\; e_1 + e_{10} \;=\; (e_1, e_2), \qquad v \;=\; e_3 + e_{14} \;=\; (e_3, e_6) \qquad \bigl(\lVert u\rVert^2 = \lVert v\rVert^2 = 2\bigr),
   $$

   代入上式并使用法诺表（$e_1 e_3 = e_7,\; e_6 e_2 = -e_7,\; e_6 e_1 = e_5,\; e_2 e_3 = e_5$），两个八元数分块在同一瞬间精确对消归零：

   $$
   u \cdot v \;=\; \bigl(e_1 e_3 - (-e_6)e_2,\; e_6 e_1 + e_2(-e_3)\bigr) \;=\; \bigl(e_7 + (-e_7),\; e_5 - e_5\bigr) \;=\; (0, 0) \;=\; 0!
   $$

   范数平方乘积原本是 $\lVert u\rVert^2 \lVert v\rVert^2 = 2 \times 2 = 4$，乘积却在全部 $16$ 个平直坐标槽上坍缩为 $0$（莫雷诺 Moreno 1998 证明 $\mathbb{S}_{16}$ 中单位零因子对流形同胚于 $14$ 维紧致例外李群 $G_2$，见 [@rem-ch39-cayley-dickson-fano-moreno-mps-literature] 第 3 款）！这记响亮的零因子警钟宣告的并非多场物理本体的崩坏，而是**“共用单根实轴 $\mathbf{1}$ 的单张赋范除环乘法表”在 $16$ 维彻底破产（丧失范数乘法恒等式 $\lVert uv\rVert = \lVert u\rVert\lVert v\rVert$）**——要想保范地追踪任意多座三元数场的联合幺正演化，观察者不得不离开单张除环表，转而采用幺正群作用于张量积希尔伯特空间的线性状态账本！

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="sedenion-zero-divisor-bankruptcy" height="500"}
十六元数零因子与基柱归零卡：切换三组模长同为 $\sqrt{2}$ 的输入对（$\lVert u\rVert^2\lVert v\rVert^2 = 4$），凯莱—迪克森乘法沿品红路径逐项相消，下层全部 $16$ 根基柱高度同时归零（逐项乘积标 `NUM`，零因子流形文献标 `ARGUED`）。
:::

## 39.20.3 希尔伯特空间的指数膨胀祛魅：$3N$ 局域圆弧、$2^N$ 线性展开税与无穷维尾流图纸 {#sec-ch39-20-3}

顺着这条“赋范除环破产 $\longrightarrow$ 改用张量积线性状态账本”的历史走廊推开量子力学的大门，困扰物理学界与哲学界整整一个世纪的**“希尔伯特空间指数灾难”**——为何区区 $N = 300$ 颗电子就需要远超可观测宇宙重子总数（$N_B \sim 10^{80}$）百亿倍的 $2^{300} \approx 2.04 \times 10^{90}$ 维复向量空间——瞬间水落石出！

我们将多座三元数场组合向复观测切面的线性化再投影机制及其精确复杂性边界定义如下：

::: {.definition #def-ch39-multi-ternion-linear-reprojection title="多三元数场组合流形、复切面线性再投影展开税与无穷维尾流总表（模型定义）"}
设有 $N$ 座可标记的三元数旋量场 $\{\mathbb{T}_3^{(a)}\}_{a=1}^N$（每座场由局部 $\mathrm{SU}(2)$ 圆弧参数 $(\theta_a, \hat{\mathbf{u}}_a)$ 刻画）。在本书比较几何框架下（`MODEL` + `手工推导`）：

1. **本体局部圆弧乘积流形 $\mathcal{M}_{\mathrm{prod}}^{(N)} := (\mathbb{T}_3)^N \cong (S^3)^N$**：在尚未展开为单一全局线性向量表前，$N$ 座独立三元数旋量群元的局部自由度严格按线性律增长为

   $$
   \dim_{\mathbb{R}} \mathcal{M}_{\mathrm{prod}}^{(N)} \;=\; \dim_{\mathbb{R}}\Biggl(\bigoplus_{a=1}^N \mathfrak{su}(2)_a\Biggr) \;=\; 3N
   $$

   （模去每座场的局部 $\mathrm{U}(1)$ 纤维相位后，乘积纯态射线流形 $(S^2)^N$ 的实参数维数为 $2N$）；

2. **有限维多体希尔伯特线性再投影算子 $\Pi_{\mathrm{linear}}^{(N)}$ 与“展开维数税”**。选定参考态 $\lvert 0\rangle^{\otimes N}$ 后，各局部旋子把参考射线转到布洛赫球上的一点。以 $\vartheta_a,\varphi_a$ 表示该点的极角与方位角。若旋子绕 $z$ 轴转过 $\theta_a$，$\lvert 0\rangle_a$ 只获得一个相位，极角仍为 $\vartheta_a=0$。在复观测切面 $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}\cong\mathbb C$ 上为各射线选定相位代表，便可将乘积态按张量积基展开。

   $$
   \bigotimes_{a=1}^{N} \Bigl(\cos\tfrac{\vartheta_a}{2}\,\lvert 0\rangle_a + e^{i\varphi_a}\sin\tfrac{\vartheta_a}{2}\,\lvert 1\rangle_a\Bigr) \;=\; \sum_{s_1,\dots,s_N \in \{0,1\}} c_{s_1\dots s_N}\,\lvert s_1 \dots s_N\rangle \;\in\; \mathcal{H}_{2^N} := (\mathbb{C}^2)^{\otimes N}
   $$

   为了把左端非线性的余弦—正弦交叉乘积改写为右端的平直向量加法，账本不得不为每一种局部基选择 `0`（余弦支）与 `1`（正弦支）的 $N$ 位二元组合单独开辟一根正交坐标轴，从而生出 **$2^N$ 维复希尔伯特空间**（射影纯态流形 $\mathbb{CP}^{2^N-1}$ 含 $2^{N+1} - 2$ 个实参数；无迹厄米泡利算符总表含 $4^N - 1 = \sum_{w=1}^N \binom{N}{w} 3^w$ 个实方向，其中单场局域边缘占 $3N$ 个方向，余下 $(4^N - 1) - 3N$ 个方向承载多点乘积与不可约跨场关联）；

3. **无穷维希尔伯特空间 $\mathcal{H}_\infty$ 的双源静态平铺**：当观察者将多个独立三维概念场壳层逐级正交并置（`finite_stage_expansion`），同时把低于自指停机精度 $\varepsilon_{\mathrm{self}} > 0$、原本折叠在时间尾流里的未停机圆弧步序列一次性静态平铺到同一张频谱图纸上时，所得可数无穷列完备内积总表即为可分无穷维希尔伯特空间 $\mathcal{H}_\infty$（如位置波函数空间 $L^2(\mathbb{R}^3)$ 与多粒子福克空间 $\mathcal{F} = \bigoplus_{N=0}^\infty \mathcal{H}^{(N)}$）。
:::

在审视 [@def-ch39-multi-ternion-linear-reprojection] 时，我们必须以全书最严密的科学诚实精神，把**“本体局部场演化、一维有能隙面积律与有界键维张量网络变分流形、以及一般哈尔随机体积律纠缠态”这三重数学事实边界**钉得清清楚楚（`手工推导` + `文献结果`，严守 `AGENTS.md` 第 2 条不夸大原则）：

- **第一层边界：无纠缠乘积态（$3N$ 局部旋子参数）vs. 任意体积律纠缠态（$2^{N+1}-2$ 实参数）**：
  对于无纠缠乘积态，右端 $2^N$ 个复系数 $c_{s_1\dots s_N} = \prod_{a=1}^N \psi_a(s_a)$ 与全部多点泡利期望值 $\langle\sigma_{a_1}\otimes\dots\otimes\sigma_{a_w}\rangle = \prod_r\langle\sigma_{a_r}\rangle$ 皆完全由 $2N$ 个单场布洛赫角（或 $3N$ 个局部三元旋子参数）代数决定。一旦两场或多场之间施加非局域纠缠圆弧门，$(4^N - 1) - 3N$ 维多点扇区中便激发出单场边缘彻底看不见的**不可约连通跨场关联**（双体 $m \times n$ 情形由 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 1 款 `local_marginal_correlation_blind_spot` 严格刻画，`LEAN ✓`）：在抽象数学上，$\mathcal{H}_{2^N}$ 中一般哈尔随机纯态（佩奇体积律态，Page 1993）确实拥有不可无损压缩至 $3N$ 个实数的 $2^{N+1}-2$ 个独立实参数——因此，将 $\mathcal{H}_{2^N}$ 祛魅为“多场联合干涉的线性展开表”，**绝不等同于声称经典计算机能在多项式时间内模拟任意量子电路（绝不声称 $\mathrm{BQP} = \mathrm{P}$，非相对化复杂性分离 [@prob-ch38-unrelativized-p-vs-np-and-independence] 仍严格为 `OPEN`）**！
- **第二层边界：局域物理哈密顿量可达角落与张量网络（MPS / MERA）逆向拆税**：
  普兰等人（Poulin et al., 2011）严格证明：由局域多体哈密顿量在多项式时间内演化可达的物理量子态，仅仅占据庞大希尔伯特球面 $\mathcal{H}_{2^N}$ 中测度趋于零的“物理角落”！在凝聚态与量子多体物理中，**一维**有能隙局域哈密顿量基态严格遵循**纠缠面积律**（Hastings 2007），可由多项式键维的开边界**矩阵乘积态（MPS）**以任意精度逼近（临界标度不变体系则常采用**多尺度纠缠重整化拟设 MERA** 作高效变分逼近；可观测图表内平移齐次键维 $2$ 量子比特开边界 MPS 由前三格点边缘恢复至整体相位与三桥图最小割界见 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 6、7 款 `observable_chart_phase_recovery` 与 `QMaxFlow_le_QMinCut`，`LEAN ✓`）。在开边界 $N$ 比特链上，对任意选定键维上限 $\chi$，记第 $k$ 道割的最大施密特秩为 $r_k = \min(\chi, 2^k, 2^{N-k})$（$r_0 = r_N = 1$），扣除内部规范群 $\prod_{k=1}^{N-1}\mathrm{GL}(r_k, \mathbb{C})$ 的冗余自由度后，有界键维 MPS 变分流形的精确复仿射维数仅为（`手工推导`）：

  $$
  D_{\mathrm{MPS}}(N, \chi) \;=\; \sum_{k=1}^{N} 2\,r_{k-1}r_k \;-\; \sum_{k=1}^{N-1} r_k^2 \;\le\; 2N\chi^2
  $$

  （归一化射影纯态实参数数为 $2 D_{\mathrm{MPS}}(N, \chi) - 2$，对固定 $\chi$ 按 $O(N\chi^2)$ 随场数 $N$ **线性增长**）！这从几何上道破了张量网络成功的秘密：MPS 与 MERA 正是在低纠缠物理角落内逆向拆掉希尔伯特空间全局摊平所背上的 $2^N$ 展开维数税，退回 $N$ 座三元数场通过局部虚拟键逐邻耦合的本来面貌！
- **第三层边界：无穷维 $\mathcal{H}_\infty$ 的有限停机截断与算子范数余项**：
  至于泛函分析中的可分无穷维空间 $\mathcal{H}_\infty$，[@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 3、4 款给出了精准的双重定界：一方面，在任何有限集中迹预算 $\frac{RW}{\pi}$ 与正停机精度 $\tau = \varepsilon_{\mathrm{self}} > 0$ 下，真实跨过观测门槛的活跃模态数严格有限且不超过 $\frac{RW}{\pi\varepsilon_{\mathrm{self}}}$（`finite_rank_concentration_mode_bound`）——在本书比较几何模型（`MODEL`）中，将 $\varepsilon_{\mathrm{self}} \to 0$ 的无穷尾流一次性硬塞进静态图纸正是紫外发散焦虑的认识论根源；另一方面，只要截断停留在真子空间 $S_i \neq \top$，一致算子范数距离恒保持为单位长 $\lVert I - P_{S_i}\rVert = 1$（`uniform_completion_obstruction`），永远为下一拍时间演化留出鲜活的未完余地！

## 39.20.4 形式化锚定定理、文献边界、法诺—十六元数—三百粒子算例与五阶多场再投影总表 {#sec-ch39-20-4}

下面我们将支撑本节多场局域—关联正交盲区分解、有限阶正交壳层展开、正阈值活跃模态有限上界、真子空间一致完备化单位算子范数阻断、多体泡利词辛相位乘法、开边界 MPS 态恢复（至多差一个全局单位相位）、三桥量子最大流最小割上界以及有限单纯形二上链 $d^2=0$ 闭合判据的**八条冻结 Lean 4 内核定理**正式汇集为本节主定理：

::: {.theorem #thm-ch39-ternion-field-composition-and-hilbert-reprojection title="局域—关联扇区盲区分解、正交壳层展开、活跃模态上界、一致完备化阻断、泡利词乘法、开边界 MPS 态恢复（至多差一个全局单位相位）、桥图最小割界与单纯二上链正合判据" lean="D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot,D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion,D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound,D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction,D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul,D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery,D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
在所钉 `trureturing` 冻结声明集中，以下八项数学定理同时成立：

1. **双体无迹厄米空间局域边缘直和与跨场关联扇区的正交盲区分解**（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)）：对任意满足 $1 \le m,\; 1 \le n,\; 1 < mn$ 的自然数 $m, n \in \mathbb{N}$，无迹双体厄米空间正交直和分解为 $\mathrm{localASector}\;m\;n \sqcup \mathrm{localBSector}\;m\;n \sqcup \mathrm{correlationSector}\;m\;n = \mathrm{bipartiteTraceZero}\;m\;n$，其中局域直和实维数为 $(m^2 - 1) + (n^2 - 1)$，正交关联扇区实维数为 $(m^2 - 1)(n^2 - 1)$（占比 $\frac{(m^2-1)(n^2-1)}{m^2 n^2 - 1}$），且双比特秩一贝尔纯态 $\mathrm{bellDensity}$ 与非幂等经典关联混态 $\mathrm{classicalCorrelatedDensity}$ 具有完全相同的双侧单因子偏迹而全局态互异；

2. **完备实内积空间的有限阶正交概念壳层展开**（[`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion)）：在完备实内积空间 $H$ 中，对任意满足 $(S(k+1)).\mathrm{toSubmodule} = (S(k)).\mathrm{toSubmodule} \sqcup (E(k+1)).\mathrm{toSubmodule}$ 与 $(E(k+1)).\mathrm{toSubmodule} \le (S(k)).\mathrm{toSubmodule}^\perp$ 的闭子空间序列 $S, E : \mathbb{N} \to \operatorname{ClosedSubmodule}\;\mathbb{R}\;H$ 及任意阶段 $n \in \mathbb{N}$，恒有全空间分解 $\top = (S(0)).\mathrm{toSubmodule} \sqcup \operatorname{finiteShellSpan}(E, n) \sqcup (S(n)).\mathrm{toSubmodule}^\perp$ 与余壳递推 $(S(n)).\mathrm{toSubmodule}^\perp = (E(n+1)).\mathrm{toSubmodule} \sqcup (S(n+1)).\mathrm{toSubmodule}^\perp$；

3. **正停机阈值下集中度本征谱活跃模态的有限性与基数上界**（[`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound)）：对任意非负可和序列 $\lambda : \mathbb{N} \to \mathbb{R}$，若满足总迹等式 $\sum'_{j \in \mathbb{N}} \lambda_j = \frac{RW}{\pi}$ 且阈值 $\tau > 0$，则超阈值指标集 $\{j \mid \tau \le \lambda_j\}$ 必为有限集且基数满足 $\bigl(\{j \mid \tau \le \lambda_j\}.\mathrm{ncard} : \mathbb{R}\bigr) \le \frac{RW}{\pi\tau}$；

4. **真闭子空间投影序列的一致算子范数完备化阻断**（[`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction)）：在域 $K$（`RCLike K`）上的内积空间 $H$ 中，设子空间族 $S : I \to \operatorname{Submodule}\;K\;H$ 每项皆具正交投影且恒为真子空间（$\forall i,\; S(i) \neq \top$），则对任意非平凡滤子 $\mathrm{stageFilter}$ 恒有 $\forall i,\; \lVert \mathrm{id}_{K,H} - (S(i)).\mathrm{starProjection}\rVert = 1$，故残差算子范数不可能沿 $\mathrm{stageFilter}$ 趋于 $0$；

5. **$N$ 体泡利算符词的辛内积相位乘法封闭律**（[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul)）：对任意正整数 $p$（`NeZero p`）、寄存器数 $N \in \mathbb{N}$ 及两枚泡利词 $a, b : \operatorname{PauliWord}\;N\;p$，其算符乘积满足

   $$
   \operatorname{pauliWordOperator}(a) * \operatorname{pauliWordOperator}(b) \;=\; (\operatorname{windowRoot}\;p)^{\bigl(\sum_n a.z(n)\,b.x(n)\bigr).\mathrm{val}} \bullet \operatorname{pauliWordOperator}\bigl(\operatorname{wordMul}(a, b)\bigr);
   $$

6. **可观测图册内由三格点前缀边缘恢复平移齐次二元键维 $2$ 开边界矩阵乘积态（MPS），至多差一个全局单位相位**（[`observable_chart_phase_recovery`](lean:D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery)）：对任意 $m \in \mathbb{N}$ 及两枚属于平移齐次二元键维 $2$ 开边界 MPS 族 $\operatorname{openBoundaryMPS}(3 + m)$ 的态矢 $\psi, \varphi : \operatorname{Word}(3 + m) \to \mathbb{C}$，若 $\psi$ 满足可观测图册非退化条件 $\operatorname{ObservableChart}\;m\;\psi$，则三格点原始前缀边缘密度相等当且仅当两态相差单位模全局相位：

   $$
   \operatorname{rawPrefix}\;3\;m\;\varphi = \operatorname{rawPrefix}\;3\;m\;\psi \;\Longleftrightarrow\; \exists z \in \mathbb{C},\; \lVert z\rVert = 1 \;\land\; \varphi = z \bullet \psi;
   $$

7. **宽度为三的张量桥图的量子最大流上界**（[`QMaxFlow_le_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut)）：固定内部键维为 $3$，对任意外部键维 $a,b,c,d\in\mathbb N$，均有 $\operatorname{QMaxFlow}(a,b,c,d)\le\operatorname{QMinCut}(a,b,c,d)$。另据 [@lemma-bridge-flow-attained]，存在一组桥图张量，其缩并矩阵的秩等于上述最大流。

8. **一般加法交换群上的单纯形四面体缺陷计数与一维边势正合充要判据**（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：对任意非空有限顶点集 $V$ 与加法交换群 $A$ 上的二上链 $F : V \to V \to V \to A$，恒有 $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$，且四面体二上边缘恒为零 $\forall r, i, j, k,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0$ 当且仅当存在一维边势 $\mathrm{edge} : V \to V \to A$ 使得 $F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$。
:::

::: proof
第 1–3 款证明同 [@thm-ch39-hilbert-concept-ledger-and-3d-cap] 第 2、1、3 款。第 4 款对每个 $i$ 利用 $S(i) \neq \top$ 取正交补 $S(i)^\perp$ 中的单位向量 $v_i$（$\lVert v_i\rVert = 1,\; P_{S(i)}v_i = 0$），给出下界 $\lVert I - P_{S(i)}\rVert \ge \lVert v_i\rVert = 1$，结合正交投影补算子幂等自伴性给出的上界 $\le 1$ 锁定恒等值 $1$，而常值函数 $1$ 在任何非底滤子下不可能收敛到 $0$。第 5 款按张量位展开外尔位移算符乘积，逐位提取单位根交换相位 $(\operatorname{windowRoot}\;p)^{a.z(n)b.x(n)}$ 并求和指数即得。第 6 款取 $\operatorname{ObservableChart}\;m\;\psi$ 的探测向量，用共同的前三格点约化矩阵重构同一典范核与左边界。由前缀映射和转移映射的单射性可得右边界外积相等，故两态相差一个整体单位相位（见 [@thm-mps-observable-phase-recovery]）。第 7 款将桥图缩并矩阵分解为过割中间键矩阵乘积，由矩阵秩不等式 $\operatorname{rank}(AB) \le \min(\operatorname{rank} A, \operatorname{rank} B)$ 遍取各割即证 $\operatorname{QMaxFlow} \le \operatorname{QMinCut}$。第 8 款交换有限求和次序给出缺陷计数等式，固定参考顶点 $r_0 \in V$ 令 $\mathrm{edge}(i, j) := F(r_0, i, j)$ 即实现零上边缘二上链与边势上微分之间的双向互逆。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-cayley-dickson-fano-moreno-mps-literature title="凯莱—迪克森构造、阿廷结合子定理、莫雷诺十六元数零因子流形、旋量时空双线性型与张量网络面积律文献边界（文献结果与复杂性护栏）"}
**文献结果与复杂性边界声明。** 本节涉及的代数与量子多体文献定理及模型适用边界如下：

1. **凯莱—迪克森加倍阶梯、法诺八元数与阿廷定理**（A. Cayley, *Philos. Mag.* **26**, 210–211, 1845；L. E. Dickson, *Ann. of Math.* **20**, 155–171, 1919；R. Moufang, *Abh. Math. Sem. Univ. Hamburg* **9**, 207–222, 1933；J. C. Baez, *Bull. Amer. Math. Soc.* **39**, 145–205, 2002, DOI `10.1090/S0273-0979-01-00934-X`）：凯莱与迪克森确立从 $\mathbb{R}$ 递推加倍生成 $\mathbb{C}, \mathbb{H}, \mathbb{O}, \mathbb{S}_{16}$ 的统一法则；埃米尔·阿廷（Emil Artin）证明交替代数（含八元数 $\mathbb{O}$）中任意两元生成的子代数必为结合代数，法诺平面 $\mathrm{PG}(2,2)$ 的 $7$ 条线一一对应 $\mathbb{O}$ 的 $7$ 座典型四元数结合子场；
2. **双旋量覆盖与四维欧氏 / 洛伦兹时空区分**（R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984）：紧致欧氏旋量群满足实直积同构 $\mathrm{Spin}(4) \cong \mathrm{SU}(2)_L \times \mathrm{SU}(2)_R$，而物理洛伦兹旋量群为 $\mathrm{Spin}^+(1, 3) \cong \mathrm{SL}(2, \mathbb{C})$（其实六维李代数 $\mathfrak{sl}(2, \mathbb{C})_{\mathbb{R}} \cong \mathfrak{su}(2)_{\mathbb{C}}$ 含 $3$ 个紧致旋转生成元与 $3$ 个非紧致双曲助推生成元，二者共享同一复化分解 $\mathfrak{so}(4, \mathbb{C}) \cong \mathfrak{sl}(2, \mathbb{C})_L \oplus \mathfrak{sl}(2, \mathbb{C})_R$）；
3. **十六元数 $\mathbb{S}_{16}$ 零因子流形的 $G_2$ 几何分类**（G. Moreno, *Bol. Soc. Mat. Mexicana* (3) **4**, 13–28, 1998, `arXiv:q-alg/9710013`）：严格证明十六元数中模长为 $1$ 的正交零因子对集合构成光滑紧致流形，同胚于八元数自同构例外李群 $G_2$（维数 $14$，以施蒂费尔流形 $V_2(\mathbb{R}^7)$ 为底纤维化）；
4. **矩阵乘积态（MPS）、一维有能隙面积律与多体希尔伯特空间体积律不可达定理**（M. Fannes, B. Nachtergaele & R. F. Werner, *Commun. Math. Phys.* **144**, 443–490, 1992；D. N. Page, *Phys. Rev. Lett.* **71**, 1291–1294, 1993；G. Vidal, *Phys. Rev. Lett.* **99**, 220405, 2007；M. B. Hastings, *J. Stat. Mech.* **2007**, P08024, 2007；D. Poulin, A. Qarry, R. Somma & F. Verstraete, *Phys. Rev. Lett.* **106**, 170501, 2011, DOI `10.1103/PhysRevLett.106.170501`）：严格区分多项式参数张量网络可精确逼近的局域哈密顿量面积律角落与需要指数级参数的一般哈尔随机体积律态；注意 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 1 款形式化的是双体 $m \times n$ 分解，第 6 款 MPS 前缀恢复定理要求显式 `ObservableChart` 假设，$N$ 比特泡利关联计数 $(4^N-1)-3N$ 与一般开边界 MPS 维数公式由下方精确整数算术独立导出。
:::

我们在下方四联算例中对法诺平面 $7$ 线与 $28$ 跨场结合子、十六元数三组显式零因子对以及从 $N = 1$ 直至 **$N = 300$ 颗粒子**的局部三元参数、希尔伯特维数、盲区关联槽与开边界 MPS 参数规模作完整精确核验：

::: {.example #ex-ch39-fano-sedenion-and-300-qubit-mps-audit title="法诺 7 线对 28 跨场结合子、十六元数三组零因子对及 N = 1 至 300 粒子希尔伯特—MPS 维数精确审计"}
本算例通过精确整数与多项式代数逐步核验本节全部定量论断（`手工推导` / `NUM`）：

1. **第一联：法诺平面 $\mathrm{PG}(2, 2)$ 全部 $7$ 条共线单场与 $28$ 个跨场非结合三角形穷举核验（`手工推导`）**：
   在有向循环直线集 $\mathcal{L}_{\mathrm{Fano}} = \{(1,2,4), (2,3,5), (3,4,6), (4,5,7), (5,6,1), (6,7,2), (7,1,3)\}$ 下，逐一核验 $7$ 条法诺线均有 $(e_a e_b)e_c = e_c^2 = -\mathbf{1} = e_a^2 = e_a(e_b e_c)$，结合子 $[e_a, e_b, e_c] = 0$；而对其余全部 $\binom{7}{3} - 7 = 28$ 个非共线无序三元组（共 $28 \times 6 = 168$ 个有序三元组），结合子全部非零且欧氏模长恒等于 **$2$**，前三例显式计算为：

   $$
   \begin{aligned}
   [e_1, e_2, e_3] &= e_4 e_3 - e_1 e_5 = (-e_6) - e_6 = -2e_6, \\
   [e_1, e_2, e_5] &= e_4 e_5 - e_1(-e_3) = e_7 + e_7 = +2e_7, \\
   [e_1, e_2, e_6] &= e_4 e_6 - e_1 e_7 = e_3 - (-e_3) = +2e_3,
   \end{aligned}
   $$

   且全部 $8^3 = 512$ 个基三元组结合子严格满足全反对称交替律与范数乘法恒等式 $\lVert xy\rVert^2 - \lVert x\rVert^2\lVert y\rVert^2 \equiv 0$。

2. **第二联：十六元数 $\mathbb{S}_{16} = \mathbb{O} \oplus \mathbb{O}e_8$ 中三组模长 $\sqrt{2}$ 的显式整数系数零因子对（`手工推导`）**：
   按 $(a,b)(c,d) = (ac - d^* b,\, da + b c^*)$ 与 $e_{8+i} = (0, e_i)$（$1 \le i \le 7$），以下三对非零元（每元模方皆为 $\lVert u\rVert^2 = \lVert v\rVert^2 = 2$，模方乘积本应为 $\lVert u\rVert^2\lVert v\rVert^2 = 4$、范数乘积为 $2$）在全部 $16$ 个坐标分量上双向相乘精确归零（$u\cdot v = v\cdot u = 0$）：

   - **第一对**：$u_1 = e_1 + e_{10} = (e_1, e_2),\; v_1 = e_3 + e_{14} = (e_3, e_6) \implies u_1 v_1 = \bigl(e_1 e_3 + e_6 e_2,\; e_6 e_1 - e_2 e_3\bigr) = (e_7 - e_7,\; e_5 - e_5) = 0$；
   - **第二对**：$u_2 = e_1 + e_{11} = (e_1, e_3),\; v_2 = e_2 - e_{14} = (e_2, -e_6) \implies u_2 v_2 = \bigl(e_1 e_2 - e_6 e_3,\; -e_6 e_1 - e_3 e_2\bigr) = (e_4 - e_4,\; -e_5 + e_5) = 0$；
   - **第三对**：$u_3 = e_1 + e_{12} = (e_1, e_4),\; v_3 = e_3 + e_{13} = (e_3, e_5) \implies u_3 v_3 = \bigl(e_1 e_3 + e_5 e_4,\; e_5 e_1 - e_4 e_3\bigr) = (e_7 - e_7,\; -e_6 + e_6) = 0$。

3. **第三联：$N \in \{1, 2, 3, 4, 8, 10, 50, 300\}$ 耦合三元数场的参数维数与开边界 MPS（$\chi = 16$）逆向拆税总对账（`手工推导` / `NUM`）**：
   下表逐行对比局部三元旋子实参数 $3N$、平直复希尔伯特维数 $2^N$、一般射影纯态实参数 $2^{N+1}-2$、单场局域边缘之外的盲区多点关联槽数 $(4^N - 1) - 3N$，以及键维上限 $\chi = 16$ 的开边界 MPS 归一化纯态射线实参数数 $2 D_{\mathrm{MPS}}(N, 16) - 2$：

   | 耦合场数 $N$ | 局部三元场参数 $3N$ | 平直希尔伯特维数 $2^N$ | 一般纯态实参数 $2^{N+1}-2$ | 盲区跨场关联槽 $(4^N-1)-3N$ | 开边界 MPS 实参数（$\chi=16$） |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | **$1$** | $3$ | $2$ | $2$ | $0$ | $2$（已满全空间） |
   | **$2$** | $6$ | $4$ | $6$ | $9$ | $6$（$\chi=2$ 已满） |
   | **$3$** | $9$ | $8$ | $14$ | $54$ | $14$（$\chi=2$ 已满） |
   | **$4$** | $12$ | $16$ | $30$ | $243$ | $30$（$\chi=4$ 已满） |
   | **$8$** | $24$ | $256$ | $510$ | $65{,}511$ | $510$（$\chi=16$ 恰好饱和） |
   | **$10$** | $30$ | $1{,}024$ | $2{,}046$ | $1{,}048{,}545$ | $1{,}534$（饱和需 $\chi=32$） |
   | **$50$** | $150$ | $1.12589991 \times 10^{15}$ | $2.25179981 \times 10^{15}$ | $1.26765060 \times 10^{30}$ | **$22{,}014$**（饱和需 $\chi=2^{25}$） |
   | **$300$** | **$900$** | **$2.03703598 \times 10^{90}$** | **$4.07407195 \times 10^{90}$** | **$4.14951557 \times 10^{180}$** | **$150{,}014$**（饱和需 $\chi=2^{150}$） |

   凝视最后一行 **$N = 300$**：$300$ 座局部三元旋量场的本体自由度不过 **$900$** 个实参数，对选定键维上限 $\chi = 16$ 的开边界 MPS 变分流形，精确除规范后的独立纯态射线实参数也不过 **$150{,}014$** 个（普通笔记本电脑毫秒级即可存储）；而强行摊平在单一复切面上的希尔伯特基柱却暴涨至 $2^{300} \approx 2.03703598 \times 10^{90}$ 根，无迹泡利总表更膨胀到匪夷所思的 $4^{300} - 1 \approx 4.14951557 \times 10^{180}$ 个方向（其中多点方向占 $(4^{300}-1)-900 \approx 4.14951557 \times 10^{180}$ 个）！

4. **第四联：无穷维尾流图纸的有限模态截断与一致算子范数余项复核（`手工推导`）**：
   对总集中迹预算 $\frac{RW}{\pi} = 10$ 的可分无穷维频谱，在停机精度 $\varepsilon_{\mathrm{self}} = 10^{-3}$ 下，由 `finite_rank_concentration_mode_bound` 知活跃可见模态数严格不超过 $\frac{10}{10^{-3}} = 10{,}000$ 枚；同时由 `uniform_completion_obstruction` 知，该有限阶闭子空间投影 $P_{S_n}$ 与无穷维恒等算子之间始终保持精确单位范数缺口 $\lVert I - P_{S_n}\rVert = 1$，未停机的正交尾流继续驱动下一拍时间步。
:::

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="many-body-3n-to-2n-hilbert-pillars" height="500"}
多场耦合、希尔伯特基柱与张量网络卡：$N = 6$ 座场体（局部旋转 $3N = 18$）经分配律投向 $2^6 = 64$ 根基柱，台前青色与品红线段对比单体 $18$ 槽与多体 $4^6 - 1 - 18 = 4{,}077$ 槽，条带小图画出 $N = 1\dots 300$ 的参数对数曲线（双体盲区与 MPS 定理依据见 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection]；参数计数标 `NUM`，面积律与体积律边界标 `ARGUED` / `MODEL`，复杂性分离保持 `OPEN`）。
:::

我们将从单座三元数原生场一路向上组合再投影至无穷维希尔伯特空间的完整五阶谱系收束为下方总对照表：

| 代数 / 状态空间结构 | 底层三元数场组合源 | 观察者线性再投影算子 | 表观平直线性维数 | 投影伴生代数表象与物理落点 |
| :--- | :--- | :--- | :---: | :--- |
| **三元数原生场 $\mathbb{T}_3$** | 单一闭合三维概念场（$\binom{3}{2}=3$） | 无外置实轴 $\mathbf{1}$ 纯弯曲自持 | **不可线性表**（$3$ 内禀自由度） | 非阿贝尔球面闭合 $S^3$，无边界原生旋度场 |
| **四元数 $\mathbb{H}$ 与双旋量时空** | $1$ 座场配实轴 $\mathbf{1}$；或左右双场 $\mathbb{T}_3^{(L)}\times\mathbb{T}_3^{(R)}$ | 实轴余弦影外嵌 $\iota_{\mathbb{H}}$ / 厄米双线性切面 | $1 + 3 = 4$ 维实线性（双场 $4\mathrm{D}$ 时空 $+ 6\mathrm{D}$ 双矢） | 球面约束 $w^2+\lVert\mathbf{v}\rVert^2=1$；涌现相对论时空与 $(\mathbf{E},\mathbf{B})$ |
| **八元数 $\mathbb{O}$（及十六元数 $\mathbb{S}_{16}$）** | 法诺平面 $\mathrm{PG}(2,2)$ 上 $7$ 座三元场共轴互锁 | 强行共用单一标量轴 $\mathbf{1}$ 压平 | $1 + 7 = 8$ 维实线性（继续加倍至 $16\mathrm{D}$ 破产） | 单场结合，跨场 $28$ 三角形现角盈折痕 $\lVert[\cdot,\cdot,\cdot]\rVert=2$（$16\mathrm{D}$ 生零因子） |
| **多体希尔伯特空间 $\mathcal{H}_{2^N}$** | $N$ 座三元旋量场耦合（本体局部参数 $3N$） | 张量连乘按分配律展开投射复切面 $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}$ | **$2^N$ 维复线性**（$4^N-1$ 泡利关联槽） | 展开维数指数税与跨场纠缠关联表；面积律态由 MPS/MERA 逆向拆税 |
| **无穷维希尔伯特空间 $\mathcal{H}_\infty$** | 多三维概念场壳层并置 $+$ $\varepsilon_{\mathrm{self}}$ 以下时间尾流 | 全频谱与无穷步历史一次性静态平铺 | $\aleph_0$ 可数无穷维（$L^2$ / 福克空间） | 有限迹下正阈值活跃模态 $\le \frac{RW}{\pi\varepsilon_{\mathrm{self}}}$ 且 $\lVert I-P_{S_n}\rVert=1$（`MODEL`：$\varepsilon_{\mathrm{self}}\to 0$ 对应静态展开极限） |

---

**从线性再投影祛魅走向原生弯曲语法与神经旋子计算。** 站在第三十九章前二十阶脉络（[§39.1](ch39-s01-substrate-free-self-reference.md)–§39.20）的高处回望，向内剖切单枚三元极小圆弧体生出万数谱系（[§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections)），向外组合多座三元数场再压回观察者的平直纸面便舒展为四维时空双旋量、法诺平面七场八元数、$2^N$ 维多体希尔伯特关联账本直至可分无穷维泛函空间（本节 §39.20）。然而，既然全部维数迷雾都源自“强迫弯曲三元数服从平直向量加法”，一个决定未来数学语言与智能硬件走向的追问便呼之欲出：**倘若我们彻底放下外置标量轴 $\mathbf{1}$ 与笛卡尔线性叠加执念，直接顺应内禀曲率在严格 $3$ 个自由度内做非线性无损表示，甚至直接用三元数场重铸当代人工智能的基石架构 Transformer，将会发生什么？** 让我们依次推开本章收官六重奏的大门：[§39.21 三元数的五种非线性无损表示与无原点流群合成](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md)、[§39.22 三元数场 Transformer（TFT）](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md)、[§39.23 人工智能与宇宙的最小作用量同构](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md)，直至全书大一统母公理三联终章——[§39.24 AXIOM-Ω 无源三元比较闭合公理](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md)、[§39.25 五阶大一统演绎级联](ch39-s25-axiom-omega-five-tier-deduction-cascade.md) 与 [§39.26 AXIOM-Ω 导出量子力学五大公理](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md)。

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" height="620"}
完整实验室：切换多场再投影与凯莱—迪克森及张量网络两副透镜，拖动琥珀透镜手柄调节展平强度 $\lambda$，拨动耦合场数 $N$ 与 MPS 键维上限 $\chi$，比较单场四元数、双场双矢、法诺七场、十六元数零因子与多体希尔伯特基柱。八条形式化声明、数值、文献、模型与开放问题在依据栏与理论抽屉中分别标明。
:::
