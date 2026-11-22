# 31.2 算术枢轴重整与临界带多级共振隧穿：直面图兰芝诺陷阱与叩问 4/7 磨光器墙 {#sec-ch34-arithmetic-pivots-and-resonant-tunneling}

> “把最短路径的‘去全序枢轴重整’与量子力学的‘正交盲区共振隧穿’合流引入黎曼猜想，恰好一针见血地刺中了解析数论过去一百年最隐蔽的病灶：**传统方法之所以在临界带前寸步难行，正是因为它不自觉地掉进了‘算术一维排序壁垒’与‘图兰（Turán）芝诺测量陷阱’——试图按自然数大小 $n = 1, 2, 3, \dots, M$ 排着一维长队硬爬 $s = 1$ 的发散势垒。** 若改用‘局部乘性波前消元 $+$ 稀疏舒尔补枢轴 $+$ 跨势垒多级共振隧穿’重构证明路线，整套极小圆弧体的正定性机制便浮现出一条清晰的可形式化架构。”

标题中的“直面”与“叩问”说的是本节研究纲领要对付的两道墙（`MODEL` + `OPEN`），不是已经越过的墙：尽管经典黎曼猜想本身已由外部形式化证明确立（[@conj-riemann-hypothesis]，未冻结于本书所钉 `trureturing` 仓库），但本节既没有越过单级磨光器 $\vartheta=\tfrac47$ 的任何已证明结论，也没有在不调用该外部证明的前提下闭合乘性舒尔枢轴路线（[@prob-ch34-arithmetic-pivot-area-law] 仍为开放问题）。

沿着[第三十章](ch30-chord-tunneling-and-arc-calculus.md)与上一节 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs) 铺就的几何脉络一路走来，三块看似分属不同学科版图的拼图已经齐聚台前：在 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 中，我们看到图论最短路径算法如何靠“悬置全局一维全序排队、展开局部无序波前、沿极小圆弧体内割弦提取稀疏瓶颈枢轴（Pivots）”一举击穿绵延近四十年的“排序壁垒”（Dijkstra 方法的 $O(m + n\log n)$ 上界，并非 SSSP 的复杂度下界）；在 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 中，我们看到空间势垒隧穿与时间双缝自干涉如何双双归结为观察者脱离实轴 `I`、偏转 $90^\circ$ 潜入正交虚数盲平面 `i` 走平直内割弦，而中途强行插入的实轴投影抽检又如何触发芝诺冻结与相干条纹坍缩；在 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs) 中，我们又认出黎曼 $\zeta(s)$ 函数的欧拉—狄利克雷恒等式本身就是一座素数极小圆弧体 $\Delta\mathcal{T}_p$ 的费曼路径积分配分函数，临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 正是往返双投影半密度幺正性与正逆对偶路径等幅反相抵消的唯一平衡脊线。

现在，作为图论、量子隧穿与解析数论三条脉络的正面交汇，我们将这三条线索紧密合拢：**既然黎曼 $\zeta$ 系统是素数极小圆弧体张成的路径积分，为什么解析数论在过去一百年里手握欧拉乘积在 $\operatorname{Re}(s) > 1$ 内的完美正定性，却始终跨不过 $\sigma \in (\frac{1}{2}, 1]$ 那道宽度仅为 $\frac{1}{2}$ 的临界带势垒？** 答案，照本书的读法，既不在素数本身缺乏秩序，也不在临界线缺乏对称，而在于经典截断工具不自觉地把无穷维乘性圆弧树强行压扁成了一维自然数排队队列——一头撞上了图论中的“排序比较税”与量子测量中的“中途芝诺斩波陷阱”。

## 31.2.1 算术一维排序壁垒、图兰芝诺假零点陷阱（$\zeta_{19}$ 越界）与 $0.046191/\ln M$ 对数慢收敛墙 {#sec-ch34-29-1}

回到由全体素数张成的无穷维正交比较扇区 $\bigoplus_{p \in \mathbb{P}} \mathbb{Z}_{\ge 0}\,\mathbf{e}_p$：由算术基本定理，素数对数步长族 $\{\ln 2, \ln 3, \ln 5, \ln 7, \dots\}$ 在有理数域 $\mathbb{Q}$ 上严格线性无关；每一枚素数 $p$ 对应一座本征作用量步长为 $L_p = \ln p$ 的不可约极小圆弧体 $\Delta\mathcal{T}_p$，而任意正整数 $n = \prod_i p_i^{a_i}$ 则唯一编码了一条在素数桁架上穿行的复合路径 $\Gamma_n$，其总作用量为可加和

$$
S[\Gamma_n] = \ln n = \sum_i a_i \ln p_i.
$$

现在审视传统解析数论最常调用的两套有限逼近工具——经典的狄利克雷硬截断部分和 $\zeta_M(s) := \sum_{n=1}^M n^{-s}$，以及按自然数顺序 $k = 1, 2, \dots, M$ 依次扩张的 Nyman–Beurling–Báez-Duarte（NBB）格拉姆矩阵 $G_M$。把它们翻译成 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 的算法几何语言，就会发现它们恰如在高维素数乘性图上运行**传统经典 Dijkstra 全局排序队列**：不论两条算术路径在素数维数、外积阶数与缠绕拓扑上相差多远，一概按一维实数尺度 $\ln n$ 排成严格全序 $1 < 2 < 3 < \dots < M$，再在作用量阈值 $\ln M$ 处迎头落下一把刚性阶跃截断闸门 $\mathbf{1}_{\ln n \le \ln M}$。这一看似天经地义的一维排队动作，在几何与谱分析上直接诱发了两重灾难：

1. **硬截断等于中途芝诺观测，在绝对安全的欧拉区 $\operatorname{Re}(s) > 1$ 内凭空催生“图兰假零点”**：
   1948 年，图兰（Pál Turán）提出过一条极具诱惑力的路径：既然完整黎曼函数 $\zeta(s)$ 在右半平面 $\sigma = \operatorname{Re}(s) > 1$ 内由绝对收敛欧拉乘积保证绝对无零点（[@thm-riemann-zeta-euler-product]），有限部分和 $\zeta_M(s) = \sum_{n=1}^M n^{-s}$ 会不会也在 $\sigma > 1$ 内保持无零点？图兰严格证明（文献结果），哪怕这一无零点性质仅对一切充分大的整数 $M$ 成立（甚至允许微弱余项松弛），便足以直接推出黎曼猜想 [@conj-riemann-hypothesis]！然而历史随即给出了惊心动魄的反转：Haselgrove（1958）借助 Ingham 的方法与 $\zeta$ 零点的数值计算，严格证伪了与之紧邻的波利亚（Pólya）与图兰刘维尔符号猜想；Montgomery（1983）与 Montgomery–Vaughan 更给出了大 $M$ 下截断和 $\zeta_M(s)$ 零点最大实部 $\psi_M := \sup\{\operatorname{Re}(s) : \zeta_M(s) = 0\}$ 的精确渐近极限定理（文献结果）：

   $$
   \psi_M = 1 + \left(\frac{4}{\pi} - 1 - o(1)\right)\frac{\ln\ln M}{\ln M}, \qquad \frac{4}{\pi} - 1 \approx 0.2732395447,
   $$

   其中常数 $\frac{4}{\pi} - 1$ 最佳不可改进！继 Spira（1966，1968）、Monach（1980）与 van de Lune–te Riele 的长期夹逼之后，Platt 与 Trudgian（2016，定理 1.1）借助严格区间算术彻底封死了全部有限例外（文献结果）：**普通狄利克雷部分和 $\zeta_M(s)$ 在半平面 $\operatorname{Re}(s) > 1$ 内无零点，当且仅当截断上界属于有限集合 $M \in \{1, \dots, 18, 20, 21, 28\}$；对除此以外的每一个正整数 $M$，$\zeta_M(s)$ 都在 $\operatorname{Re}(s) > 1$ 内拥有无穷多个越界假零点！** 其中全自然数序列里的第一道失守门槛恰好落在 $M = 19$：在 $\sigma \approx 1.0069878449,\; t \approx 155417750480610.1069058344$ 处，百位区间鲁歇（Rouché）证书严格锁定了一颗实部逾越 $\sigma = 1$ 的真零点（详见下文 [@ex-ch34-turan-schur-and-cayley-calculus]）。

   站在极小圆弧体几何与 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的盲区视野下，图兰假零点的病根一目了然。请看一维自然数队列里的相邻三项：$1021$ 是一根刚刚开启的全新素数正交轴 $\mathbf{e}_{1021}$（一阶素步），$1023 = 3 \times 11 \times 31$ 是由三枚互异素数楔积而成的无平方因子费米外积三叶刀片 $\mathbf{e}_3 \wedge \mathbf{e}_{11} \wedge \mathbf{e}_{31}$（携带莫比乌斯符号 $\mu(1023) = -1$），而 $1024 = 2^{10}$ 则是单枚素数圆弧 $\mathbf{e}_2$ 连续原地缠绕十圈的高阶玻色幂（$\mu(1024) = 0$）。三者在乘性张量拓扑上八竿子打不着，一维大小排序却强行把它们捆作紧挨着的邻居，并在 $\ln n \le \ln M$ 处一刀斩断！在傅里叶—梅林对偶空间中，尖锐阶跃窗 $\mathbf{1}_{[0, \ln M]}(u)$ 的变换核是正负剧烈振荡的狄利克雷—$\mathrm{sinc}$ 型核 $\frac{1 - M^{1-s}}{s - 1}$，而非半正定自卷积平方核；这把硬闸门不折不扣就是中途插入路径积分的**芝诺投影刀片**——它把尚未在乘性子树内完成莫比乌斯正负配对的极小圆弧体拦腰劈裂，其吉布斯（Gibbs）边缘振铃在高虚部频率 $t$ 处发生殆周期同相叠加，硬生生在原本无零点的 $\sigma > 1$ 安全区里溅出了品红色的越界假零点！

2. **指数膨胀的“排序比较税”与 $0.0461914179/\ln M$ 对数慢收敛墙**：
   即便转入希尔伯特空间正定逼近框架——例如 Nyman（1950）与 Beurling（1955）建立、Báez-Duarte（2003）离散化的准则（黎曼猜想成立当且仅当特征函数 $\chi_{(0,1]}$ 属于自然数伸缩分数部基 $\{u \mapsto \{1/(ku)\}\}_{k=1}^M$ 在 $L^2(0,\infty)$ 张成子空间的渐近闭包，即最小逼近距离平方 $d_M^2 = 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \to 0$）——只要仍然按照自然数一维顺序 $k = 1, 2, \dots, M$ 逐行扩充格拉姆矩阵 $G_M$，就会立刻撞上指数级的“排序比较税”。因为算术路径的真实测地作用量深度是 $L = \ln M$，按一维整数排队推进区区 $L$ 个对数作用量单位，竟被迫吞下 **$M = e^L$ 维矩阵阶数**的指数膨胀！Báez-Duarte, Balazard, Landreau 与 Saias（2000）无条件严格证明了临界线互异零点倒数平方和下界，并由 Burnol（2002）无条件强化至重数平方分子（文献结果），使得在自然数顺序基下，格拉姆舒尔补残差平方 $d_M^2 = 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M$ 恒受对数下界钳制：

   $$
   \liminf_{M \to \infty} (\ln M)\,d_M^2 \;\ge\; \sum_{\operatorname{Re}(\rho) = 1/2} \frac{m_\rho^2}{\lvert\rho\rvert^2} \;>\; 0,
   $$

   其中求和遍历 $\zeta(s)$ 在临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 上的全体互异零点 $\rho$（$m_\rho \ge 1$ 为其重数）；结合外部已验证的 [@conj-riemann-hypothesis] 与 Báez-Duarte 的离散判据，如今无条件成立 $d_M^2 \to 0$，且该系数等于（在全体零点单重时）或严格大于（若有重根则 $m_\rho^2 > m_\rho$）经典基准常数 $C_{\mathrm{NBB}} := 2 + \gamma - \ln(4\pi) \approx 0.0461914179$（其中 $\gamma \approx 0.5772156649$ 为欧拉—马斯刻若尼常数；全体非平凡零点的单重性仍属开放问题），从而将自然数顺序基下的 $d_M^2$ 死死顶在 $\frac{C_{\mathrm{NBB}} + o(1)}{\ln M}$ 之上。大量与主干近似共线的合数冗余分支塞满了有限格拉姆窗口 $\mathcal{W}_M$，令 $G_M$ 的条件数随 $M$ 急剧恶化（实际 $G^{\mathrm{NB}}_M$ 的无条件双边谱界 $\kappa_2(G^{\mathrm{NB}}_M) = M^{2+o(1)}$ 见 [@rem-ch34-nbb-gram-spectral-and-pruning]），将本该由稀疏素数生成元统领的正定性判据拖入了不快于 $1/\ln M$ 量级的对数下界泥潭。

::: {.viz src="arithmetic-pivot-resonant-tunneling-sandbox" preset="turan-zeno-hard-cutoff" height="520"}
**算术一维硬截断、图兰芝诺假零点与 $C_{\mathrm{NBB}}/\ln M$ 对数慢收敛墙实验卡（`turan-zeno-hard-cutoff`）。** 沿时间轴将一维自然数截断闸门 $M$ 从 $1$ 推至 $40$（预设停在 $M = 19$，琥珀色标出当前截断框与部分和终点珠 $S_M$）：硬阶跃窗把 $s = 1$ 极点削平为 $H_M$ 并在左侧抬起品红色边缘脊，后方 $t^* \approx 1.554\times 10^{14}$ 处的放大窗在原本由完整 $\zeta$ 严守无零点的青色 $\sigma > 1$ 高原内（绿色 `LEAN ✓` 锚定 `completedRiemannZeta_ne_zero_of_one_le_re`）挖出品红色旗标的首颗图兰越界假零点 $\sigma^* \approx 1.006988$（背景相量屏上 $19$ 支青色箭头 $n^{-s^*}$ 首尾精确闭合归零）；下方条带小图以青色标出无越界例外集 $M \in \{1,\dots,18,20,21,28\}$、以品红色标出含越界零点的截断阶，右侧读数栏同步追踪蒙哥马利渐近包络与顺序 NBB 基准 $C_{\mathrm{NBB}}/\ln M$ 的对数缓降。
:::

照本书的设想，要从根本上拆掉这堵对数墙并清除图兰假零点，我们就不能再顺着自然数大小 $1, 2, \dots, M$ 排一维长队，而必须像 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 破除图论排序壁垒那样，回到乘性生成树本身实施局部波前扩散与分块舒尔补枢轴消元。

## 31.2.2 移植 2025 最短路径突破：乘性自卷积波前与分块舒尔补算术枢轴（$\widetilde{G}_{PP} = G_{PP} - G_{PI}G_{II}^{-1}G_{IP}$） {#sec-ch34-29-2}

在动手组装乘性波前与算术枢轴之前，我们先将本书形式化内核 `trureturing` 中横跨临界带极点地形、右半带归约、凯莱（Cayley）圆变换幺正判据、格拉姆算子平方根实现、弦图稀疏半正定补全以及离轴零点罗宾违背见证的九条冻结定理一次性汇拢；它们彼此独立、各自只担保自己的陈述，并不是重整化与共振隧穿架构本身的机器验证——那套架构还没有一步被形式化：

::: {.theorem #thm-ch34-critical-strip-barrier-and-cayley-bridge title="临界带极点势垒、凯莱圆幺正判据、弦图半正定补全与离轴零点罗宾违背综合定理" lean="D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one,D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re,D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion,D5/S3/QuantumBounds/GramRealizability.gram_realizability,D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion,D5/S3/QuadraticForms/RankBoundedChordalPsdCompletion.exists_posSemidef_completion_rank_le,D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA"}
临界带的复分析势垒边界、临界线幺正映射、正算子格拉姆实现、稀疏弦图矩阵补全与右半带假想离轴零点的有限窗口算术放大满足以下五组精确性质：

1. **$s = 1$ 唯一一阶极点山峰与 $\operatorname{Re}(s) \ge 1$ 完备化无零点安全区**：黎曼函数 $\operatorname{classicalZeta}(s) = \zeta(s)$ 在去心复平面 $\mathbb{C} \setminus \{1\}$ 上处处邻域解析，且在 $s = 1$ 处具有留数为 $1 \neq 0$ 的唯一一阶极点 $\lim_{s \to 1,\, s \neq 1} (s - 1)\operatorname{classicalZeta}(s) = 1$；同时对任意满足 $\operatorname{Re}(s) \ge 1$ 的复数 $s \in \mathbb{C}$，完备化黎曼函数满足 $\operatorname{completedRiemannZeta}(s) \neq 0$。
2. **右半临界带 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ 无零点对黎曼猜想的充分归约**：若开带 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ 内不存在满足 $\zeta(\rho) = 0$ 的复数 $\rho \in \mathbb{C}$（即对一切 $\zeta(\rho) = 0$，不可能同时成立 $\frac{1}{2} < \operatorname{Re}(\rho)$ 与 $\operatorname{Re}(\rho) < 1$），则全局 `RiemannHypothesis`（一切异于负偶数 $-2(n+1)$ 且异于 $1$ 的 $\zeta$ 零点均满足 $\operatorname{Re}(s) = \frac{1}{2}$）成立。
3. **凯莱圆变换幺正锁相判据与对数径向亏损等价律**：定义凯莱比值（莫比乌斯圆变换）$w(s) := \frac{s - 1}{s}$（在 Lean 全函数除法约定下含 $w(0) = 0$）及对数径向亏损 $\delta_{\mathrm{rad}}(s) := \ln\lVert w(s)\rVert$（含 $\ln 0 = 0$）。则对一切 $s \in \mathbb{C}$，

   $$
   \lVert w(s)\rVert = 1 \quad \Longleftrightarrow \quad \operatorname{Re}(s) = \frac{1}{2};
   $$

   并且 `RiemannHypothesis` 成立当且仅当对一切异于负偶数 $-2(n+1)$（$n \in \mathbb{N}$）且异于 $1$ 的零点 $\zeta(\rho) = 0$，其对数径向亏损恒归零 $\delta_{\mathrm{rad}}(\rho) = 0$。
4. **自伴正算子格拉姆平方根实现与弦图稀疏团半正定（及保秩）补全**：在任意完备复内积空间 $V$ 上，连续线性算子 $Q : V \to_L V$ 满足正性 $0 \le Q$，当且仅当存在连续线性算子 $O : V \to_L V$ 使得 $Q = O^\dagger O$ 且对一切 $x, y \in V$ 成立格拉姆恒等式 $\langle Qx, y\rangle = \langle Ox, Oy\rangle$；进一步，在任意有限顶点集 $V$（允许空载体）的弦图（chordal graph）$G$ 上，若实矩阵 $A \in \mathbb{R}^{V \times V}$ 在 $G$ 的每一个团 $C \subseteq V$ 上的主子矩阵 $A_C$ 均半正定（无需非奇异假设），则必存在全局半正定矩阵 $B \succeq 0$ 在一切对角元与弦图边 $(i = j \lor G.\mathrm{Adj}\;i\;j)$ 上与 $A$ 精确一致；若各团主子矩阵还一致满足秩上界 $\operatorname{rank}(A_C) \le d$（$d \in \mathbb{N}$），则可同时保证全局补全矩阵满足 $\operatorname{rank}(B) \le d$。
5. **右半临界带假想离轴零点的显式有限窗口罗宾不等式违背见证**：设 $\rho \in \mathbb{C}$ 为满足 $\zeta(\rho) = 0$、$\frac{1}{2} < \operatorname{Re}(\rho) < 1$ 且 $\operatorname{Im}(\rho) > 0$ 的假想离轴非平凡零点，记离轴偏置 $\delta := \operatorname{Re}(\rho) - \frac{1}{2} > 0$，高度参数 $D := \operatorname{Im}(\rho) + 10$，$m_0 := \frac{100 D^2}{\delta^2}$，$m_1 := \frac{500 D^4}{\delta^2}$，以及显式双指数窗口上界 $B_0 := \exp\bigl(4(28 m_1 + 20)^2\bigr)$。则必存在局部峰值尺度 $A \in [e^{4m_0}, e^{28m_1}]$（满足切比雪夫剩余峰值不等式 $\sqrt{A}(4\ln A + 9) < U(A)$）及 $t \in \bigl[A, \exp(4(\ln A + 20)^2)\bigr]$，使得阶乘最小公倍数 $N := \operatorname{lcm}(1, 2, \dots, \lfloor t\rfloor)$ 同时满足 $N > 5040$、上界控制 $N \le \exp(B_0 \ln B_0)$，并正面击穿罗宾准则：

   $$
   \frac{\sigma(N)}{N} > e^\gamma \ln\ln N.
   $$
:::

::: proof
第 1 款中，[`classical_zeta_unique_simple_pole_residue_one`](lean:D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one) 在模块 `ZetaUpgrade` 中合并了 `riemannZeta` 在 $\{1\}^c$ 上的邻域解析性（由可微性导出复解析性）、[@lem-riemann-zeta-residue-one] 的去心极限 $\lim_{s \to 1} (s - 1)\zeta(s) = 1$ 以及非零留数条件 $1 \neq 0$；[`completedRiemannZeta_ne_zero_of_one_le_re`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re) 在模块 `CountByIntegral` 中利用 $\operatorname{Re}(s) \ge 1 > 0$ 上的分解恒等式 $\operatorname{completedRiemannZeta}(s) = \Gamma_{\mathbb{R}}(s)\zeta(s)$，结合 $\Gamma_{\mathbb{R}}(s) \neq 0$ 与 Mathlib 的欧拉区非零定理 `riemannZeta_ne_zero_of_one_le_re` 证得。第 2 款 [`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh)（参见 [@thm-right-half-strip-rh-forms]）结合 $\operatorname{Re}(s) \ge 1$ 非零性、函数方程反射对称 $\xi(1 - s) = \xi(s)$ 与负半轴平凡零点分类，将开带 $(0, 1) \setminus \{\frac{1}{2}\}$ 的排除单侧化约为右半开带 $(\frac{1}{2}, 1)$ 无零点。第 3 款中，[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) 在 $s = 0$ 处由全函数约定 $\lVert 0\rVert = 0 \neq 1$ 与 $0 \neq \frac{1}{2}$ 直接核验，在 $s \neq 0$ 处由恒等式 $\lvert s - 1\rvert^2 - \lvert s\rvert^2 = 1 - 2\operatorname{Re}(s)$ 推出 $\lVert(s-1)/s\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；[`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion) 再结合 $\zeta(0) = -\frac{1}{2} \neq 0$ 与 $\zeta(1) \neq 0$ 排除 $w(\rho) = 0$ 的退化点，由 $\ln\lVert w(\rho)\rVert = 0 \iff \lVert w(\rho)\rVert = 1$ 建立对数径向亏损等价律（参见 [@thm-cayley-critical-line-criterion]）。第 4 款中，[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability) 正向取连续函数演算平方根 $O = \sqrt{Q}$（`CFC.sqrt Q`）并由自伴性验证 $\langle Qx, y\rangle = \langle Ox, Oy\rangle$，逆向由 $\langle Qx, x\rangle = \lVert Ox\rVert^2 \ge 0$ 与复极化恒等式证出正自伴性；[`exists_posSemidef_completion`](lean:D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion) 与 [`exists_posSemidef_completion_rank_le`](lean:D5/S3/QuadraticForms/RankBoundedChordalPsdCompletion.exists_posSemidef_completion_rank_le) 沿弦图单纯消去序（Dirac 引理）利用分块格拉姆等距嵌入归纳缝合团子矩阵（参见 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) [@thm-ch34-gram-window-schur-and-consensus]）。第 5 款 [`original_zero_robin5040_localA`](lean:D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA) 通过显式围道核提取 $\delta = \operatorname{Re}(\rho) - \frac{1}{2} > 0$ 驱动的局部振荡峰值尺度 $A$，再将切比雪夫剩余优势传递至高合成阶乘最小公倍数 $N = \operatorname{lcm}(1,\dots,\lfloor t\rfloor)$（参见 [@thm-off-line-zero-robin-violation]）。完整证明由 Lean 内核检查。
:::

有了 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 4 款的格拉姆平方根实现与弦图稀疏补全作支点，我们现在将 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 介绍的 2025 年最短路径破除排序壁垒两步法（Duan, Mao, Mao, Shu & Yin 2025）——**“局部 $k$ 步无序波前扩散 $+$ 稀疏瓶颈枢轴粗粒化”**——直接移植到算术格拉姆矩阵上，分两步彻底卸下自然数一维排队的枷锁：

### 31.2.2.1 第一步：悬置一维大小排队，改走“自卷积乘性极小圆弧波前”（点化为波 $\Lambda^0 \to \Lambda^2$） {#第一步悬置一维大小排队改走自卷积乘性极小圆弧波前点化为波-λ0λ2}

不再按自然数数值大小 $1, 2, 3, \dots, M$ 强切阶跃窗口，而是顺着素数乘性生成树展开局部 $k$ 步无序波前；在分析核上，这对应将破坏正定性的芝诺硬阶跃门 $\mathbf{1}_{[0, \ln M]}$ 替换为**对称自卷积双投影光滑波包**

$$
F(u) := (f * \tilde{f}^*)(u) = \int_{-\infty}^{+\infty} f(u + v)\,\overline{f(v)}\,dv,
$$

其中 $\tilde{f}^*(v) = \overline{f(-v)}$。在梅林—傅里叶谱域上，自卷积天然化为往返双投影的模方 $\widehat{F}(\omega) = \lvert\widehat{f}(\omega)\rvert^2 \ge 0$，由 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 4 款 `gram_realizability` 直接锁定算子半正定性 $Q = O^\dagger O \succeq 0$（这正是塞尔伯格筛法二次型与索宁（Sonin）空间无零点平滑核背后的共同几何母体）。在每一团局部乘性波前内部，算法根本不去排比 $1021$ 与 $1024$ 谁大谁小，而是任由同一局部子树内的短程素数幂次与小合数分支通过莫比乌斯外积符号 $\mu(n)$ 原地完成正负配对抵消——未闭合的圆弧体不再被硬闸门半途劈裂，照本书的设想，图兰芝诺假零点遂从源头消弭（这一点尚无证明）。

### 31.2.2.2 第二步：分块舒尔补消元 $\equiv$ 切入圆弧体“平直内割弦面”提取算术枢轴（体缩为点 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$） {#第二步分块舒尔补消元--切入圆弧体平直内割弦面提取算术枢轴体缩为点-λℓ3λℓ10}

将当前尺度的算术比较态集合正交划分为两类子空间：**内部合数叶节点集 $I$**（由已知小素数圆弧在局部 $k$ 步内闭合生成的冗余复合路径）与**稀疏瓶颈枢轴集 $P$**（统领庞大下游乘性子树的关键素数特征标或本原判别式瓶颈节点）。在分块基 $I \oplus P$ 下写出埃尔米特格拉姆矩阵 $G = \bigl(\begin{smallmatrix} G_{II} & G_{IP} \\ G_{PI} & G_{PP} \end{smallmatrix}\bigr)$（其中 $G_{PI} = G_{IP}^\dagger$）。当内部叶块严格正定 $G_{II} \succ 0$ 时，构造单位上三角消元变换矩阵 $L$，仅需三行分块合同恒等式即可完成精确对角化解耦（手工推导）：

$$
L := \begin{pmatrix} I & -G_{II}^{-1} G_{IP} \\ 0 & I \end{pmatrix}, \qquad \det L = 1,
$$

$$
L^\dagger \begin{pmatrix} G_{II} & G_{IP} \\ G_{PI} & G_{PP} \end{pmatrix} L = \begin{pmatrix} I & 0 \\ -G_{PI} G_{II}^{-1} & I \end{pmatrix} \begin{pmatrix} G_{II} & G_{IP} \\ G_{PI} & G_{PP} \end{pmatrix} \begin{pmatrix} I & -G_{II}^{-1} G_{IP} \\ 0 & I \end{pmatrix} = \begin{pmatrix} G_{II} & 0 \\ 0 & \widetilde{G}_{PP} \end{pmatrix},
$$

$$
G = \begin{pmatrix} G_{II} & G_{IP} \\ G_{PI} & G_{PP} \end{pmatrix} \succeq 0 \quad \Longleftrightarrow \quad \widetilde{G}_{PP} \equiv G_{PP} - G_{PI} G_{II}^{-1} G_{IP} \succeq 0 \qquad (G_{II} \succ 0),
$$

且两侧行列式精确满足乘积分解 $\det G = \det G_{II} \cdot \det\widetilde{G}_{PP}$！不仅如此，当固定边界枢轴向量而令内部振幅任意变动时，严格正定内部块下的舒尔补二次型已在 Lean 4 内核中直接锁定为全矩阵二次型的精确变分最小元：

::: {.proposition #prop-ch34-hermitian-schur-variational-minimum lean="D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least" title="严格正定内部块下埃尔米特分块舒尔补二次型的变分极小定理"}
设 $m, n$ 为有限指标类型（具备 `[Fintype m] [Fintype n] [DecidableEq n]`），$A \in M_{m\times m}(\mathbb{C})$ 为埃尔米特矩阵（`A.IsHermitian`），$B \in M_{m\times n}(\mathbb{C})$ 为跨块耦合矩阵，$C \in M_{n\times n}(\mathbb{C})$ 为严格正定复矩阵（`C.PosDef`）。记由分块矩阵 `Matrix.fromBlocks A B Bᴴ C` 诱导的全空间二次型（将保留的边界枢轴块 $A$ 置于左上块、待消去的严格正定内部块 $C$ 置于右下块，与上文 $I \oplus P$ 排布仅差一次分块坐标置换 $(x \oplus y) \leftrightarrow (y \oplus x)$，对应 $(A, B, B^{\mathrm{H}}, C) = (G_{PP}, G_{PI}, G_{IP}, G_{II})$）在固定边界向量 $x : m \to \mathbb{C}$、遍历全体内部向量 $y : n \to \mathbb{C}$ 时的取值集合，并记舒尔补算子为 $S := A - B C^{-1} B^{\mathrm{H}}$。则在复数偏序 `ComplexOrder`（即实部偏序且虚部相等，埃尔米特二次型落于实轴）下，约化舒尔补二次型精确给出该变分集合的最小元（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)）：

$$
\operatorname{IsLeast}\!\left(\left\{\, (x \oplus y)^\dagger \begin{pmatrix} A & B \\ B^{\mathrm{H}} & C \end{pmatrix} (x \oplus y) \;\middle|\; y : n \to \mathbb{C} \,\right\},\; x^\dagger \bigl(A - B C^{-1} B^{\mathrm{H}}\bigr) x\right),
$$

即同时满足：（1）**精确可达性**：存在最优内部弛豫向量 $y^* = -(C^{-1} B^{\mathrm{H}}) x : n \to \mathbb{C}$，使全矩阵二次型恰取 $x^\dagger (A - B C^{-1} B^{\mathrm{H}}) x$；（2）**全局变分下界**：对一切 $y : n \to \mathbb{C}$，在 `ComplexOrder` 中恒有 $x^\dagger (A - B C^{-1} B^{\mathrm{H}}) x \le (x \oplus y)^\dagger \bigl(\begin{smallmatrix} A & B \\ B^{\mathrm{H}} & C \end{smallmatrix}\bigr) (x \oplus y)$。
:::

::: proof
由严格正定性假设 `hC : C.PosDef` 知内部块行列式可逆（`isUnit_det_of_posDef`），故可调用 Mathlib 的分块合同配方恒等式 `Matrix.schur_complement_eq₂₂` 将全矩阵在分块向量 $x \oplus y$ 上的二次型精确分解为边界舒尔补项 $x^\dagger (A - B C^{-1} B^{\mathrm{H}}) x$ 与内部残差项 $\bigl(y + C^{-1} B^{\mathrm{H}} x\bigr)^\dagger C \bigl(y + C^{-1} B^{\mathrm{H}} x\bigr)$ 之和。取唯一驻点响应 $y^* = -(C^{-1} B^{\mathrm{H}}) x$ 时内部残差归零，证出值域可达性（`∈ Set.range`）；对任意 $y : n \to \mathbb{C}$，由半正定性 `hC.posSemidef` 在 `ComplexOrder` 中给出 $0 \le \bigl(y + C^{-1} B^{\mathrm{H}} x\bigr)^\dagger C \bigl(y + C^{-1} B^{\mathrm{H}} x\bigr)$，证出全局下界（`mem_lowerBounds`）。认识论边界：本内核声明覆盖严格正定内部块 $C \succ 0$，而下方内部块退化为半正定奇异矩阵时的摩尔—彭罗斯广义逆推广属阿尔伯特（1969）定理的手工推导。完整证明由 Lean 内核检查。
:::

若局部波前中混入了线性相关或重复生成的合数分支，使得内部块仅半正定退化（$G_{II} \succeq 0$ 但奇异），则由阿尔伯特（Albert）广义舒尔补定理（手工推导），只需将逆矩阵 $G_{II}^{-1}$ 替换为摩尔—彭罗斯（Moore–Penrose）广义逆 $G_{II}^+$，并附加列空间包含条件 $\operatorname{im}(G_{IP}) \subseteq \operatorname{im}(G_{II})$（等价于零核正交条件 $(I - G_{II} G_{II}^+) G_{IP} = 0$），合同等价律依然分毫不差：

$$
G \succeq 0 \quad \Longleftrightarrow \quad G_{II} \succeq 0, \quad \operatorname{im}(G_{IP}) \subseteq \operatorname{im}(G_{II}), \quad \text{且} \quad \widetilde{G}_{PP} := G_{PP} - G_{PI} G_{II}^+ G_{IP} \succeq 0.
$$

请看有效算术枢轴矩阵 $\widetilde{G}_{PP}$ 一次性完成了哪三重几何壮举：

* **正定性零损耗遗传**：原巨型比较矩阵 $G$ 是否保持半正定，**充要等价于**消去海量合数叶节点 $I$ 之后的稀疏枢轴有效格拉姆矩阵 $\widetilde{G}_{PP}$ 是否半正定——没有任何截断近似税，也没有丢失任何潜伏负特征值！
* **沿极小圆弧体平直内割弦直连枢轴**：在希尔伯特几何上，从裸内积块 $G_{PP}$ 中减去正交投影项 $G_{PI} G_{II}^{-1} G_{IP}$，恰恰等价于把枢轴态投影到内部合数叶子空间 $\mathcal{H}_I^\perp$ 的正交补上——也就是削掉沿着外凸球壳绕行合数叶节点的弧顶鼓包，直接顺着极小圆弧体肚子里的**平直内割弦面**架起枢轴与枢轴之间的有效耦合，与 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 图论中的热带（$(\min, +)$）舒尔补星—网消元同形对应（只是热带半环幂等、没有负号相消，并非代数同构）！
* **算术 MERA 全息重整化锥降维（`MODEL`）**：模仿多尺度纠缠重整化拟设（MERA，参见[第十九章](ch19-tensor-networks-and-holography.md)），每执行一轮“局部乘性波前干涉（解纠缠器）$+$ 分块舒尔补枢轴提取（等距粗粒化）”，有效对数作用量跨度 $L$ 就成倍推进一层；配合 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 4 款的弦图团保秩补全定理，原本按 $M = e^L$ 指数爆炸的一维自然数大矩阵，被折叠成了关于作用量深度 $L = \ln M$ 仅具**多项式层数的算术 MERA 重整化锥**。

::: {.viz src="arithmetic-pivot-resonant-tunneling-sandbox" preset="block-schur-pivot-mera" height="520"}
**局部乘性波前、分块舒尔补内割弦消元与算术 MERA 重整化锥实验卡（`block-schur-pivot-mera`）。** 在紫色底板的乘性晶格窗口 $\{1, 2, 3, 6\} = \{2^a 3^b\}$ 上（青色连线粗细表示核 $G(m,n) = \min(m,n)/\max(m,n)$，琥珀色光环标示当前激活的消元枢轴与顶点）：时间轴前半段经分块合同 $L^\dagger G L = \operatorname{diag}(G_{II}, \widetilde{G}_{PP})$ 消去青色内部合数叶 $I = \{1, 2\}$，将紫色稀疏枢轴 $P = \{3, 6\}$ 抬升至半透明紫色重整化锥第一层（残差对角元 $\frac{5}{9}, \frac{8}{9}$），并以权重为 $\widetilde{G}_{36} = \frac{5}{18}$ 的青色平直内割弦直接耦合两枚枢轴；后半段继续消去 $3$ 使顶点 $6$ 保留精确有理主元 $\frac{3}{4}$，全程严守行列式分解 $\det G = \frac{3}{4}\times\frac{5}{12} = \frac{5}{16} > 0$；下方条带小图联动滑块 $x = G(1, 6)$ 在青色半正定补全区间 $[-\frac{7}{12}, \frac{11}{12}]$ 上绘制紫色抛物线 $\det G(x)$（最大行列式补全落在青色圆点 $x = \frac{1}{6}$，绿色 `LEAN ✓` 对应 `gram_realizability`、`exists_posSemidef_completion` 与 `exists_posSemidef_completion_rank_le`）。
:::

局部合数冗余经舒尔补消干净之后，真正的全局硬仗浮出水面：如何把 $\sigma > 1$ 欧拉安全区里的正定性，一路护送穿过横亘在 $s = 1$ 处的调和发散高山，稳稳送达 $\sigma = \frac{1}{2}$ 的临界脊线？

## 31.2.3 跨临界带 $\sigma \in (\frac{1}{2}, 1]$ 的多级共振隧穿：解析 $\vartheta = \frac{4}{7}$ 磨光器衰减墙与 $O(\log(\gamma_0/\delta))$ 离轴失谐放大 {#sec-ch34-29-3}

把复平面实部横轴 $\sigma = \operatorname{Re}(s)$ 铺展成一幅横截面地形图，[@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 1、2 款已经用机器验证精度钉下了地标，本书把它们连成一座标准的**量子力学势垒地形**（`MODEL`）：

* **右侧经典允许安全区（$\sigma > 1$，含边界 $\sigma \ge 1$ 上 $\xi(s) \neq 0$）**：素数欧拉乘积 $\prod_p (1 - p^{-s})^{-1}$ 绝对收敛（[@cor-dirichlet-sum-eq-euler-product]），各素数极小圆弧体彼此解耦，对数格拉姆核严格正定且绝无零点；
* **中间经典禁区发散势垒（$\frac{1}{2} < \sigma \le 1$）**：素数级数 $\sum_p p^{-\sigma} = \infty$ 发散，尤其在势垒右缘 $s = 1$ 处拔地耸立着留数为 $1$ 的无穷大**宏观体积极点山峰 $\frac{1}{s - 1}$**（`classical_zeta_unique_simple_pole_residue_one`），彻底封死了任何沿着实轴球壳表面连续平推的经典路径；
* **目标半密度驻波脊线（$\sigma = \frac{1}{2}$）**：正逆对偶反射 $s \leftrightarrow 1 - \bar{s}$ 的唯一等幅平衡谷底；由第 2 款 `golden_right_half_strip_implies_rh`，只要能穿过 $\frac{1}{2} < \sigma < 1$ 这一道半宽势垒并排除其内部的任何漏网零点，整座黎曼猜想大厦便告合龙。

把二十世纪解析数论最辉煌的临界线零点占比定理放进这幅量子势垒地形图，一桩困扰学界数十年的悬案顿时豁然开朗——**传统磨光器（Mollifier）方法之所以在逼近 $41\%$ 后步履维艰，照本书的读法（`MODEL`），正是因为它恰似不设中继站的“单级裸隧穿”！**

### 31.2.3.1 传统磨光器的物理真相：单跳裸隧穿与 $\vartheta = \frac{4}{7}$ 色散衰减墙 {#1-传统磨光器的物理真相单跳裸隧穿与-ϑ74-色散衰减墙}

为了证明临界线 $\sigma = \frac{1}{2}$ 上凝聚着正比例的非平凡零点，Selberg（1942）开创、Levinson（1974，在极限对数磨光长度 $\vartheta < \frac{1}{2}$ 下证出 $\ge 34.74\%$ 的零点位于临界线）奠基、Conrey（1989，借助 Deshouillers–Iwaniec 的 Kloosterman 和谱估计将极限对数长度推至 $\vartheta < \frac{4}{7} \approx 0.571429$，主定理 Theorem 1 证出 $\ge 40.77\%$，同文校样补记在同一 $\vartheta < \frac{4}{7}$ 多项式变分框架内精化至 $\ge 40.88\%$，而下方交互沙盘在极限端点三次多项式 $P, Q$ 单纯形实时优化下达到 $\kappa(\frac{4}{7}) \approx 0.4086$ 即 $40.86\%$）以及 Pratt, Robles, Zaharescu 与 Zeindler（2020，在同一 $\vartheta < \frac{4}{7}$ 极限下引入更丰富的磨光系数与多项式选择推进至 $> 41.72\%$）发展了有限狄利克雷**磨光器**（文献结果；经典的单段莫比乌斯多项式磨光器原型如下，而 Pratt 等人的 $> 41.72\%$ 计算采用更丰富的三多项式磨光系数族）：

$$
M(s) = \sum_{n \le T^\vartheta} \frac{\mu(n)\,P\!\left(\frac{\ln(T^\vartheta / n)}{\ln T^\vartheta}\right)}{n^s},
$$

试图在 $\sigma > 1$ 的欧拉区先锻造一把 $\zeta(s)^{-1}$ 的有限截断近似逆算子，然后**一口气单跳投射**到高度 $T$ 处的临界线 $\sigma = \frac{1}{2} + it$ 上，令阻尼乘积满足 $\zeta(s) M(s) \approx 1$（其最优多项式包络 $P$ 的欧拉—拉格朗日变分方程，在代数上恰恰就是按 [@prop-ch34-hermitian-schur-variational-minimum] 求解一块**单级格拉姆舒尔补二次型**的极小值！）。

为什么单级有理包络磨光器一旦逼近对数长度上限 **$\vartheta = \frac{4}{7}$** 就撞上铁壁、无法一路推向 $\vartheta \to \infty$（$100\%$ 零点）？对照 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的纳米势垒公式立见分晓：在波动力学中，不布设势垒内共振中继阱、仅凭单一尺度的入射波包一次性硬穿宽阔高势垒，透射相干幅必然遭受阿格蒙（Agmon / WKB）指数衰减 $e^{-2\kappa L}$；在数论均值积分 $\int_T^{2T} \lvert 1 - \zeta(\frac{1}{2}+it)M(\frac{1}{2}+it)\rvert^2 dt$ 中，一旦单跳截断尺度越过 $\vartheta = \frac{4}{7}$，势垒内部非对角素数对移位关联（$m n_1 - m' n_2 = h \neq 0$ 激发的 Kloosterman 和色散相移）就再也无法估计——现有的 Kloosterman 和技术在此失效，单跳裸隧穿的证明随之中断（这是证明技术之墙，并非已知的信号淹没；Farmer 甚至猜想渐近式对任意长度的磨光器都成立）！

::: {.viz src="arithmetic-pivot-resonant-tunneling-sandbox" preset="mollifier-four-sevenths-wall" height="520"}
**单级磨光器裸隧穿与 $\vartheta = \frac{4}{7}$ 色散衰减墙实验卡（`mollifier-four-sevenths-wall`）。** 在实轴 $t = 0$ 剖面上拖动琥珀色入口圆环或滑块调节磨光器对数长度 $\vartheta$（琥珀色读头沿单跳隧道推进，品红色山峰标出 $s = 1$ 处留数为 $1$ 的单极点，绿色 `LEAN ✓` 锚定 `classical_zeta_unique_simple_pole_residue_one`）：当 $\vartheta \le \frac{4}{7} \approx 0.5714$ 时，青色单跳波束自高原 $90^\circ$ 潜入 $\hat{\mathbf{i}}$ 穿行极点山底抵达 $\sigma = \frac{1}{2}$，下方条带小图的青色已证曲线经紫色 Levinson 基准点 $\kappa(\frac{1}{2}) \approx 34.74\%$ 攀升至三次多项式优化值 $\kappa(\frac{4}{7}) \approx 40.86\%$（介于 Conrey 原始下界 $> 40.77\%$ 与高次多项式精化值 $\ge 40.88\%$ 之间）；一旦越过 $\vartheta = \frac{4}{7}$ 处的品红色色散墙（如预设 $\vartheta = 0.700$），非对角 Kloosterman 色散破坏均值定理证明，隧道与比例曲线双双化作未证的品红色抖动虚线。
:::

### 31.2.3.2 多级共振接力架构：$90^\circ$ 内割弦穿底、级联舒尔枢轴阱与 $O(\log(\gamma_0/\delta))$ 凯莱反复平方引爆 {#2-多级共振接力架构90-内割弦穿底级联舒尔枢轴阱与-ologγ0δ-凯莱反复平方引爆}

把 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的正交盲区隧穿与上小节的分块舒尔补枢轴重整合二为一，跨越 $\sigma \in (\frac{1}{2}, 1]$ 势垒的策略便从“单跳硬闯”升级为超晶格异质结式的**法布里—珀罗（Fabry–Pérot）三步多级共振隧穿**（`MODEL` $+$ `手工推导`）：

1. **$90^\circ$ 正交潜入虚盲区 $\hat{\mathbf{i}}$ 走内割弦，从 $s = 1$ 极点山峰正下方穿底而过**：
   对对称测试波包施加极点/对偶极点双正交零矩约束 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$（同步消去 $s = 1$ 极点山峰与 $s = 0$ 反射极点），在几何上等价于先从观察者实轴 `I` 旋转 $90^\circ$ 潜入正交虚数盲区 $\hat{\mathbf{i}}$（[§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)），一刀切掉 $s = 1$ 的外凸极点山头，顺着连接 $\sigma > 1$ 与 $\sigma < 0$ 的**山底平直内割弦**潜行。这恰恰揭示了经典**黎曼—西格尔公式（Riemann–Siegel Formula）**的几何真身：计算临界线上的 $Z(t)$ 从不需要傻傻累加无穷多个自然数，而是精准停在**驻相平方根枢轴**

   $$
   N_*(t) = \left\lfloor\sqrt{\frac{t}{2\pi}}\right\rfloor
   $$

   处折返，将正向有限和与 $1 - s$ 逆向对偶有限和在山底内割弦中点对称缝合！
2. **在势垒内部布设多级舒尔枢轴量子阱 $\widetilde{G}_{PP}^{(1)} \to \widetilde{G}_{PP}^{(2)} \to \dots \to \widetilde{G}_{PP}^{(K)}$**：
   模仿半导体多量子阱超晶格中的**共振隧穿二极管（RTD）**，不再要求单一尺度磨光器独自扛下全部作用量跨度，而是在势垒内部按几何级数布设一串稀疏算术枢轴中继层 $X_1 \ll X_2 \ll \dots \ll X_K$；每一层先借局部乘性自卷积波前将块内合数叶节点舒尔消元，再将幺正锁相信号相干移交给下一级枢轴阱。
3. **凯莱反复平方放大，将离轴四重伪零点的潜伏期压缩至对数层数 $O(\log(\gamma_0/\delta))$**：
   回忆 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 5 款 `original_zero_robin5040_localA` 揭示的传统难题：倘若临界带内潜伏着一组偏离临界线 $\delta > 0$ 的假想离轴四重零点 $\rho_{\mathrm{rogue}} = \frac{1}{2} \pm \delta \pm i\gamma_0$，按 [@thm-off-line-zero-robin-violation] 的显式界，要到双指数量级的高合成尺度 $N \le \exp(B_0 \ln B_0)$ 才保证暴露罗宾违背。然而一旦放进**二进倍增枢轴共振链**，由 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 3 款 `cayley_ratio_norm_one_iff_critical_line`，两类零点的算子动力学响应发生天壤之别的分岔（手工推导）：
   * **临界线真零点（$\delta = 0,\; \rho = \frac{1}{2} + i\gamma$）**：其凯莱圆变换模长严格恒等于单位圆 $\lVert w(\rho)\rVert = \bigl\lvert\frac{-1/2 + i\gamma}{1/2 + i\gamma}\bigr\rvert \equiv 1$（对数径向亏损 $\delta_{\mathrm{rad}}(\rho) = 0$）。无论经过多少层二进作用量倍增跳跃 $w \mapsto w^{2^\ell}$，其模长恒锁死在 $\lvert w\rvert^{2^\ell} \equiv 1$，精准对准每一级法布里—珀罗枢轴腔的幺正共振透射峰，各层有效枢轴矩阵恒保持 $\widetilde{G}_{PP}^{(\ell)} \succeq 0$；
   * **假想离轴伪零点（$\delta > 0$）**：四元组中落在右半临界带的 $\rho_+ = \frac{1}{2} + \delta + i\gamma_0$ 在正向凯莱比 $(\rho_+ - 1)/\rho_+$ 下呈收缩模长 $\bigl\lvert\frac{\rho_+ - 1}{\rho_+}\bigr\rvert < 1$，但取其倒数比值 $w := -\frac{\rho_+}{1 - \rho_+} = \frac{\rho_+}{\rho_+ - 1}$——在模长上严格等价于函数方程伴生的左侧镜像根 $\rho_- = 1 - \overline{\rho_+} = \frac{1}{2} - \delta + i\gamma_0$ 处的凯莱比 $\frac{\rho_- - 1}{\rho_-}$——立即显露出严格大于 $1$ 的**反阻尼逃逸模**：

     $$
     \lvert w\rvert = \lvert w_-\rvert := \left\lvert\frac{\rho_- - 1}{\rho_-}\right\rvert = \left\lvert -\frac{\rho_+}{1 - \rho_+}\right\rvert = \sqrt{\frac{(\frac{1}{2} + \delta)^2 + \gamma_0^2}{(\frac{1}{2} - \delta)^2 + \gamma_0^2}} = \sqrt{1 + \frac{2\delta}{(\frac{1}{2} - \delta)^2 + \gamma_0^2}} > 1,
     $$

     对应非零右半带对数径向缺陷 $\delta_{\mathrm{rad}}(\rho_+) = -\ln\lvert w\rvert < 0$ 与镜像正亏损 $\delta_{\mathrm{rad}}(\rho_-) = \ln\lvert w\rvert = \frac{\delta}{\gamma_0^2 + \frac{1}{4}} + O\!\left(\frac{\delta^2}{\gamma_0^4}\right) > 0$。本节的模型**假设**枢轴重整每推进一层相当于把谱参数平方一次，即 $w \mapsto w^{2^\ell}$（`MODEL`：这一对应没有推导，也不是已知定理）。在这个假设下 $\ln\bigl(\lvert w\rvert^{2^\ell}\bigr) = 2^\ell \ln\lvert w\rvert$，经 $\ell \asymp \log_2(\gamma_0^2/\delta)$ 层后达到 $1$ 的量级（手工推导，只是对一个数作幂运算）。

下面我们在一个完全透明的三合一算例中，用百位区间算术与精确有理分式把上述三大机制逐项算穿：

::: {.example #ex-ch34-turan-schur-and-cayley-calculus title="图兰 $\zeta_{19}$ 越界假零点证书、乘性窗口 [1, 2 | 3, 6] 精确有理舒尔补消元与凯莱反复平方失谐爆炸核算（数值与精确代数算例）"}
本算例分三组独立可复核的定量计算，分别检验 §31.2.1–§31.2.3 的核心代数与分析现象：

1. **首颗越界图兰假零点 $\zeta_{19}(s) = 0$（$\operatorname{Re}(s) > 1$）的百位鲁歇区间证书与顺序 NBB 对数墙标度**：
   考察普通狄利克雷硬截断和 $\zeta_{19}(s) = \sum_{n=1}^{19} n^{-s}$。在复平面点

   $$
   s_0 = \sigma_0 + i t_0, \qquad \sigma_0 \approx 1.0069878449, \qquad t_0 \approx 155417750480610.1069058344
   $$

   （前十八位有效数字为 $\sigma_0 = 1.006987844887124793\dots$，$t_0 = 155417750480610.106905834359074\dots$）处，百位十进制精度下中心残差仅为 $\lvert\zeta_{19}(s_0)\rvert \approx 2.74664 \times 10^{-86}$；以 $s_0$ 为圆心、半径 $r = 10^{-30}$ 作闭圆盘 $D(s_0, r)$（因 $\sigma_0 - r > 1.006987 > 1$，整座圆盘严格落在欧拉半平面 $\operatorname{Re}(s) > 1$ 内部），百位区间算术给出导数下界 $\lvert\zeta'_{19}(s_0)\rvert > 0.56$ 与二阶导上界校验 $\lvert\zeta_{19}(s_0)\rvert + \frac{1}{2} B r^2 < \lvert\zeta'_{19}(s_0)\rvert r$，由鲁歇定理严格证明 $D(s_0, 10^{-30})$ 内存在**唯一单重真零点**！（注：与之形成鲜明对照，实轴上的刘维尔投影和 $L_M(\sigma) := \sum_{n=1}^M \lambda(n)n^{-\sigma}$ 经区间算术严格认证对一切 $1 \le M \le 10^6$ 与全体实数 $\sigma \ge 1$ 恒满足 $L_M(\sigma) > 0$，例如 $L_{19}(1) \approx 0.1090063746$、$L_{1024}(1) \approx 0.0230713579$、$L_{10000}(1) \approx 0.0042802774$，前缀和在 $n = 925985$ 附近的极小值仍达 $5.4651217328\times 10^{-5} > 0$——说明有限小截断下的图兰假零点并非实轴全负扭转所致，纯粹源于高虚部 $t_0 \approx 1.554\times 10^{14}$ 处无公度素数相位的硬截断边缘干涉；另需区分平移加权多项式 $\sum_{n=1}^3 n^{1-s} = \zeta_3(s - 1)$ 在 $\sigma \approx 1.4543970082,\; t \approx 3.5981714940$ 处的零点，其还原回普通 $\zeta_3$ 坐标后的实部为 $\sigma - 1 \approx 0.4543970082 < 1$。）

   与此同时，按一维自然数顺序扩充 NBB 格拉姆矩阵时，黎曼猜想成立下的渐近对数下界基准 $C_{\mathrm{NBB}} / \ln M$（其中 $C_{\mathrm{NBB}} = 2 + \gamma - \ln(4\pi) \approx 0.0461914179$）随矩阵维数 $M$ 的衰减极其缓慢：

| 一维截断维数 $M$ | 对数作用量深度 $L = \ln M$ | 渐近下界标度 $C_{\mathrm{NBB}}/\ln M$ | 刘维尔实轴端点值 $L_M(1)$ | 一维排序代价诊断 |
| :---: | :---: | :---: | :---: | :--- |
| **$10$** | $2.3025850930$ | $0.0200606779$ | $0.3265873016$ | 仅覆盖前 $4$ 枚素数，$\zeta_{10}$ 尚属有限无越界例外集 |
| **$100$** | $4.6051701860$ | $0.0100303390$ | $0.1078669542$ | 矩阵维数扩 $10$ 倍，对数下界标度仅减半；$\zeta_{100}$ 已含无穷多越界零点 |
| **$1024 = 2^{10}$** | $6.9314718056$ | $0.0066640130$ | $0.0230713579$ | $1021, 1023, 1024$ 拓扑混排，硬截断劈裂圆弧体 |
| **$10000$** | $9.2103403720$ | $0.0050151695$ | $0.0042802774$ | 维数扩 $10^3$ 倍，下界标度仅缩至四分之一 |
| **$1000000$** | $13.8155105580$ | $0.0033434463$ | $> 0$（全区间认证） | 维数暴涨 $10^5$ 倍（百万阶矩阵），下界标度仅缩至六分之一 |

2. **乘性窗口 `[1, 2 | 3, 6]` 上的精确有理分块舒尔补消元与奇异广义逆核验**：
   为直观展示 §31.2.2 的分块舒尔补几何（注：此处选取严格正定的乘性尺度对称模型核而非 NBB 矩阵本身，用于精确有理演示），在 $L^2(0, \infty)$ 中取特征函数族 $f_n(u) := \frac{1}{n}\mathbf{1}_{[0, n^2]}(u)$，其格拉姆内积给出乘性拉普拉斯核 $G_{mn} = \langle f_m, f_n\rangle = e^{-\lvert\ln(m/n)\rvert} = \frac{\min(m,n)}{\max(m,n)}$。在乘性钻石窗口 $\{1, 2, 3, 6\}$ 上，按内部叶集 $I = \{1, 2\}$ 与新增素因子 $3$ 驱动的枢轴集 $P = \{3, 6\}$ 分块：

   $$
   G = \begin{pmatrix}
   1 & \frac{1}{2} & \frac{1}{3} & \frac{1}{6} \\[3pt]
   \frac{1}{2} & 1 & \frac{2}{3} & \frac{1}{3} \\[3pt]
   \frac{1}{3} & \frac{2}{3} & 1 & \frac{1}{2} \\[3pt]
   \frac{1}{6} & \frac{1}{3} & \frac{1}{2} & 1
   \end{pmatrix}
   = \begin{pmatrix} G_{II} & G_{IP} \\[2pt] G_{PI} & G_{PP} \end{pmatrix}, \qquad
   G_{II} = \begin{pmatrix} 1 & \frac{1}{2} \\[2pt] \frac{1}{2} & 1 \end{pmatrix}, \qquad
   G_{II}^{-1} = \frac{4}{3}\begin{pmatrix} 1 & -\frac{1}{2} \\[2pt] -\frac{1}{2} & 1 \end{pmatrix}.
   $$

   计算跨块投影阵 $G_{PI} G_{II}^{-1} G_{IP} = \bigl(\begin{smallmatrix} 4/9 & 2/9 \\ 2/9 & 1/9 \end{smallmatrix}\bigr)$ 并从 $G_{PP}$ 中减去，立得精确有理有效枢轴矩阵：

   $$
   \widetilde{G}_{PP} = G_{PP} - G_{PI} G_{II}^{-1} G_{IP} = \begin{pmatrix} 1 & \frac{1}{2} \\[2pt] \frac{1}{2} & 1 \end{pmatrix} - \begin{pmatrix} \frac{4}{9} & \frac{2}{9} \\[2pt] \frac{2}{9} & \frac{1}{9} \end{pmatrix} = \begin{pmatrix} \frac{5}{9} & \frac{5}{18} \\[3pt] \frac{5}{18} & \frac{8}{9} \end{pmatrix} \succ 0.
   $$

   直接核算两侧行列式与精确 $LDL^\top$ 对角枢轴元 $D = \operatorname{diag}\!\bigl(1, \frac{3}{4}, \frac{5}{9}, \frac{3}{4}\bigr)$：内部块 $\det G_{II} = 1 - \frac{1}{4} = \frac{3}{4} > 0$，舒尔枢轴块 $\det\widetilde{G}_{PP} = \frac{5}{9}\cdot\frac{8}{9} - \bigl(\frac{5}{18}\bigr)^2 = \frac{160 - 25}{324} = \frac{135}{324} = \frac{5}{12} > 0$，全矩阵行列式分毫不差满足 $\det G = \det G_{II} \cdot \det\widetilde{G}_{PP} = \frac{3}{4}\cdot\frac{5}{12} = \frac{5}{16} > 0$！再取外部目标态 $f_4$（与窗口内积向量 $\mathbf{b} = (\frac{1}{4}, \frac{1}{2}, \frac{3}{4}, \frac{2}{3})^\top$）：先向内部叶集 $I$ 投影后残差模方为 $\frac{3}{4}$，与 $P$ 的约化内积化为 $(\frac{5}{12}, \frac{1}{2})^\top$，继续经舒尔枢轴块 $\widetilde{G}_{PP}$ 消元后最终残差模方精确落在 $\frac{35}{108}$，与一次性四维全逆投影完全一致；若在窗口末尾并入重复合数生成元组成 `[1, 2, 3, 6, 6]`，矩阵秩降为 $4$（精确零核向量 $(0, 0, 0, 1, -1)^\top$），此时摩尔—彭罗斯广义逆 $G_{II}^+$ 与列空间包含条件 $\operatorname{im}(G_{IP}) \subseteq \operatorname{im}(G_{II})$ 依然零误差保持半正定传递。

3. **第一黎曼零点高度 $\gamma_1 \approx 14.1347251417$ 处凯莱反复平方放大 $\lvert w\rvert^{2^\ell} = \lvert w_-\rvert^{2^\ell}$ 的条件定量对比**：
   固定首颗临界线真零点虚部 $\gamma_1 = 14.134725141734693790\dots$，对右半带测试坐标 $\rho = \frac{1}{2} + \delta + i\gamma_1$ 取倒数凯莱比 $w = -\frac{\rho}{1 - \rho} = \frac{\rho}{\rho - 1}$（其模长与左侧镜像根 $\rho_- = \frac{1}{2} - \delta + i\gamma_1$ 处的 $\frac{\rho_- - 1}{\rho_-}$ 恒等：$\lvert w\rvert = \lvert w_-\rvert$），对比真实临界线零点（$\delta = 0$，幺正基准线）与三组**假想离轴测试偏置** $\delta \in \{0.01, 0.05, 0.10\}$（注意：$\delta > 0$ 各行均为用于演示条件反证放大的假想离轴坐标，并非真实存在的 $\zeta$ 零点！）在二进层数 $\ell \in \{0, 4, 8, 12, 16\}$（对应有效平方阶数 $2^\ell \in \{1, 16, 256, 4096, 65536\}$）下的反阻尼模长 $\lvert w\rvert^{2^\ell}$：

| 离轴偏置 $\delta$ | $\ell = 0$（$2^0 = 1$） | $\ell = 4$（$2^4 = 16$） | $\ell = 8$（$2^8 = 256$） | $\ell = 12$（$2^{12} = 4096$） | $\ell = 16$（$2^{16} = 65536$） | 法布里—珀罗共振腔响应 |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$0.00$（临界线真零点）** | $1.0000000000$ | $1.0000000000$ | $1.0000000000$ | $1.0000000000$ | $1.0000000000$ | $\delta_{\mathrm{rad}} = 0$，全层幺正共振锁相 |
| **$0.01$（假想离轴态）** | $1.0000499911$ | $1.0008001578$ | $1.0128796422$ | $1.2272286295$ | $26.4732737691$ | 单步仅偏 $5\times 10^{-5}$，$16$ 层即放大逾 $26$ 倍 |
| **$0.05$（假想离轴态）** | $1.0002499776$ | $1.0040071484$ | $1.0660777494$ | $2.7836976666$ | $1.3000290182\times 10^7$ | $16$ 层失谐暴涨逾 $1.30\times 10^7$ 倍 |
| **$0.10$（假想离轴态）** | $1.0004999989$ | $1.0080300523$ | $1.1365163241$ | $7.7483788695$ | $1.6880043815\times 10^{14}$ | $16$ 层引爆百亿万倍（$1.69\times 10^{14}$）逃逸失谐 |

   看清这张表里最震撼的数量级反差：当 $\delta = 0.01$ 时，单层原始反阻尼凯莱模长 $\lvert w\rvert = \lvert w_-\rvert \approx 1.0000499911$ 与 $1$ 的肉眼偏差不足十万分之五，按一维线性步数排查无异于大海捞针；然而顺着二进枢轴重整链仅跳 $\ell = 16$ 层，反复平方算子就将这丝十万分之五的裂纹生生撕裂放大到了 **$26.4732737691$**，而在 $\delta = 0.10$ 时更飙升至 **$1.6880043815\times 10^{14}$**，而同一腔体内的临界线真零点 $\delta = 0.00$ 历经 $65536$ 次复合依然纹丝不动停在 $1.0000000000$！
:::

上表只是对一个假想点的凯莱比作幂运算（`NUM`）；“每层重整等于平方一次”，从而“$O(\log(\gamma_0/\delta))$ 层即可甄别离轴零点”，是本节模型的设想（`MODEL`），没有推导。携带 $u_\rho^{\,n}$ 的精确算术对象是 Li 系数，见 [@prop-ch34-li-sagitta-frozen] 与 [@rem-ch34-li-criterion-sagitta-literature]。即使改看这类 Li 型和，只在 $n=2^\ell$ 处取值也不够：[@rem-ch34-finite-rotor-li-criterion] 给出一个有限四点族，它的 Li 型和在一切 $n=2^\ell$ 处为正，而其中两个旋子在单位圆外。这说明的是只看倍增幂次这种检验方式的局限，不是对上面模长算术的反驳。

::: {.remark #rem-ch34-laplace-tridiagonal-vs-nbb-separator title="乘性拉普拉斯核的三对角马尔可夫精确分离与真实 NBB 格拉姆矩阵的反例证伪（手工推导与 73 位区间核验）"}
**来源与认识论边界。** [@ex-ch34-turan-schur-and-cayley-calculus] 第 2 项采用演示核 $K^{\mathrm{Lap}}_{ab} = \frac{\min(a,b)}{\max(a,b)}$ 展示分块舒尔补几何。本注记先给出该核逆矩阵严格三对角与数值分离器精确解耦的初等闭式证明（`手工推导`），再以 73 位高精度区间算术证伪这一精确分离律向真实 Nyman–Beurling–Báez-Duarte（NBB）格拉姆矩阵 $G^{\mathrm{NB}}_{ab} = \int_0^\infty \{1/(ax)\}\{1/(bx)\}\,dx$（[@rem-ch34-nbb-gram-spectral-and-pruning]）的迁移（`NUM`），并澄清数值序分离与素分支划分的区别。

1. **乘性拉普拉斯核的三对角精度矩阵与马尔可夫分离定理（手工推导）**：设 $0 < x_1 < x_2 < \dots < x_m$ 为任意严格递增正实数列（$m \ge 2$），记相邻比值 $r_i := x_i / x_{i+1} \in (0, 1)$（$1 \le i \le m - 1$），定义 $K^{\mathrm{Lap}} \in \mathbb{R}^{m\times m}$ 满足 $K^{\mathrm{Lap}}_{ab} := \frac{\min(x_a, x_b)}{\max(x_a, x_b)} = e^{-\lvert\ln(x_a / x_b)\rvert}$。则 $K^{\mathrm{Lap}}$ 严格正定，$\det K^{\mathrm{Lap}} = \prod_{i=1}^{m-1}(1 - r_i^2) > 0$，且其逆矩阵 $\Omega := (K^{\mathrm{Lap}})^{-1}$ 对一切 $y = (y_1, \dots, y_m)^\top \in \mathbb{R}^m$ 满足精确三对角平方和恒等式：
   $$
   y^\top \bigl(K^{\mathrm{Lap}}\bigr)^{-1} y \;=\; y_1^2 + \sum_{i=1}^{m-1} \frac{(y_{i+1} - r_i y_i)^2}{1 - r_i^2}.
   $$
   特别地，$\Omega$ 为**严格三对角矩阵**：对一切 $\lvert a - b\rvert \ge 2$ 恒有 $\Omega_{ab} = 0$，次对角元为 $\Omega_{i, i+1} = \Omega_{i+1, i} = -\frac{r_i}{1 - r_i^2}$，主对角元为 $\Omega_{1,1} = \frac{1}{1 - r_1^2}$、$\Omega_{i,i} = \frac{1 - r_{i-1}^2 r_i^2}{(1 - r_{i-1}^2)(1 - r_i^2)}$（$2 \le i \le m - 1$）与 $\Omega_{m,m} = \frac{1}{1 - r_{m-1}^2}$。

   *推论（数值分离器的精确舒尔消零律）*：设指标集划分 $\{1,\dots,m\} = A \sqcup I \sqcup B$ 满足 **$I$ 在数值序上分离 $A$ 与 $B$**（即任意 $a \in A$ 与 $b \in B$ 在排序 $x_1 < \dots < x_m$ 中均不相邻，彼此之间至少隔着一个 $I$ 的元素）。记消去 $I$ 后留在 $P := A \sqcup B$ 上的舒尔补为 $S_{PP} := K^{\mathrm{Lap}}_{PP} - K^{\mathrm{Lap}}_{PI}(K^{\mathrm{Lap}}_{II})^{-1}K^{\mathrm{Lap}}_{IP}$，则跨块耦合精确归零：
   $$
   S_{AB} \;\equiv\; 0.
   $$

   **证明。** 定义单位下双对角矩阵 $B \in \mathbb{R}^{m\times m}$ 使 $(By)_1 = y_1$、$(By)_{i+1} = y_{i+1} - r_i y_i$（$1 \le i \le m - 1$），并记正定对角阵 $D := \operatorname{diag}\bigl(1, 1 - r_1^2, \dots, 1 - r_{m-1}^2\bigr)$。直接展开矩阵乘法：当 $j \le i$ 时 $(B K^{\mathrm{Lap}})_{i+1, j} = \frac{x_j}{x_{i+1}} - \frac{x_i}{x_{i+1}}\frac{x_j}{x_i} = 0$；当 $j \ge i + 1$ 时 $(B K^{\mathrm{Lap}})_{i+1, j} = (1 - r_i^2)\frac{x_{i+1}}{x_j}$。再右乘 $B^\top$，对一切 $a < b = k + 1$ 有 $(B K^{\mathrm{Lap}} B^\top)_{a, k+1} = (B K^{\mathrm{Lap}})_{a, k+1} - r_k (B K^{\mathrm{Lap}})_{a, k} = 0$，且对角元满足 $(B K^{\mathrm{Lap}} B^\top)_{1,1} = 1$、$(B K^{\mathrm{Lap}} B^\top)_{k+1,k+1} = 1 - r_k^2$。故 $B K^{\mathrm{Lap}} B^\top = D$；因 $\det B = 1$，立即得 $\det K^{\mathrm{Lap}} = \det D = \prod_{i=1}^{m-1}(1 - r_i^2) > 0$ 与 $\Omega = (K^{\mathrm{Lap}})^{-1} = B^\top D^{-1} B$，展开 $(By)^\top D^{-1}(By)$ 即得平方和公式与三对角元闭式。推论由分块求逆恒等式 $S_{PP}^{-1} = \Omega_{PP}$ 直接给出：数值分离保证对一切 $(a, b) \in A \times B$ 皆有 $\lvert a - b\rvert \ge 2$，故 $\Omega_{AB} = 0$，从而 $S_{PP}^{-1} = \operatorname{diag}(\Omega_{AA}, \Omega_{BB})$ 分块对角，求逆即得 $S_{AB} = 0$。$\square$

2. **真实 NBB 格拉姆矩阵对精确分离迁移的 73 位区间证伪（`NUM`）**：将同一组窗口与分离器代入真实的 NBB 格拉姆矩阵 $G^{\mathrm{NB}}_{ab}$（Vasyunin 闭式与 Arb 73 位区间算术复核，并经独立分段三伽马积分交叉验证；下表小数均由 73 位结果四舍五入至六位），精确分离律在最小三元数值分离器上便立刻失效，且在乘性高维晶格中同时暴露出“乘性分支在数值序上交错”与“真实 NBB 跨块非零耦合”两重事实：

   | 窗口与划分（消去集 $I$，跨块 $A \times B$） | $K^{\mathrm{Lap}}$ 最大跨块元 | 真实 $G^{\mathrm{NB}}$ 最大绝对跨块元 | 真实 $G^{\mathrm{NB}}$ 跨块谱范数 $\lVert S_{AB}\rVert_2$ | 诊断 |
   | :--- | :---: | :---: | :---: | :--- |
   | $\{1, 2, 3\}$，$I = \{2\}$，$\{1\}\times\{3\}$ | $0$（精确） | $S_{1,3} \approx +0.034614$ | $0.034614$ | 最小数值分离器即证伪精确迁移（区间半径 $< 3\times 10^{-73}$） |
   | $\{1, 2, 3, 6\}$，$I = \{3\}$，$\{1,2\}\times\{6\}$ | $0$（精确） | $S_{2,6} \approx +0.017307$（$S_{1,6} \approx -0.010712$） | $0.020354$ | 与 [@ex-ch34-turan-schur-and-cayley-calculus] 同窗口，$K^{\mathrm{Lap}}$ 精确归零而 $G^{\mathrm{NB}}$ 非零 |
   | $17$ 元 $\{1\}\cup(\{2^a 3^b\}\setminus\{1\})\cup(\{5^c 7^d\}\setminus\{1\})$，$I = \{1\}$（$0\le a,b,c,d\le 2$） | $\frac{34}{35}$（精确） | $S_{4,5} \approx +0.102794$ | $0.341151$ | 乘性分支数值交错，$I=\{1\}$ 非数值分离器，两核均非零 |
   | $27$ 元 $\{2^a 3^b 5^c : 0\le a,b,c\le 2\}$，$I = \{1,2,4\}$，$\{2^a 3^b: b\ge 1\}\times\{2^a 5^c: c\ge 1\}$ | $\frac{77}{90}$（精确） | $S_{9,10} \approx +0.036008$ | $0.112024$ | 乘性分支数值交错，$I$ 不分离数值序，两核均非零 |
   | 同 $27$ 元窗口，$I = \{1,2,4\}$，余部按 $c = 0$ 与 $c > 0$ 分块 | $\frac{77}{90}$（精确） | $S_{9,10} \approx +0.036008$ | $0.147307$ | $c = 0$ 与 $c > 0$ 数值交错，跨块耦合持续存在 |
   | 同 $27$ 元窗口，$I = \{1,2,4\}$，数值分离 $\{3\}\times\{n > 4\}$ | $0$（精确） | $S_{3,6} \approx +0.031379$ | $0.053495$ | 真数值分离器下 $K^{\mathrm{Lap}}$ 精确归零，$G^{\mathrm{NB}}$ 仍保持显著非零耦合 |

   这一对照表明：演示核 $K^{\mathrm{Lap}}$（即 [@ex-ch34-turan-schur-and-cayley-calculus] 第 2 项所用的模型核）在上表数值分离器下呈现的零填充马尔可夫屏蔽只是其一维三对角逆矩阵的特殊性质，不能迁移至裸分数部核 $G^{\mathrm{NB}}$（后者同时受梅林谱密度与整数跳变加法耦合约束）；这也从反面明确了 [@prob-ch34-arithmetic-pivot-area-law] 为何必须诉诸满足极点双正交约束的自卷积波前 $F_\ell$ 及其定量面积律衰减，而不能指望裸 $G^{\mathrm{NB}}$ 在素分支上复刻演示核的精确零耦合。
:::

::: {.remark #rem-ch34-dilation-wavefront-nogo-and-euler-tensor title="固定剖面伸缩不变自卷积波前的乘性分支丢番图阻断、显式双极点消去谱核与素数分解 Besicovitch–Euler 张量积对照（手工推导与 256/320 位 Arb 核验）"}
**来源与认识论边界。** 紧接 [@rem-ch34-laplace-tridiagonal-vs-nbb-separator]，本注记直接检验 [@prob-ch34-arithmetic-pivot-area-law] 中由单一固定剖面 $f \in L^2(0, \infty)$ 经乘性伸缩生成的自卷积波前 $F = \phi * \tilde{\phi}^*$（含一切满足双极点消去约束 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 的核）：第 1 款无条件证明尺度不变的丢番图舒尔存活—跨块耦合二分律，严格证伪任何非零固定剖面 $L^2(0, \infty)$ 伸缩不变自卷积波前在固定有限根分离器上跨扩张互素分支的典范相关与对角归一化跨块舒尔谱范数衰减，并对固定紧支撑波前给出线性于对数深度的 $\Omega(L)$ 数值穿插分离器下界（`手工推导`）；第 2 款显式构造满足双极点消去 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 的五项支撑限于 $(0, 1]$ 的 NBB 消去小波 $h^{(2)}$（$s = 0$ 处为解析延拓与条件瑕积分意义下的消去，附对 $G^{\mathrm{NB}}$ 的一致 Loewner 双边夹逼）与绝对勒贝格意义下的高斯解析 Schwartz 闭式波前 $K_{\mathrm{Sch}}$（`手工推导`）；第 3 款在不依赖 [@conj-riemann-hypothesis] 的前提下证明 $\sigma > \frac{1}{2}$ 上真正实现互素分支精确解耦的素数分解 Besicovitch–Euler 张量积核 $G^{\mathrm{AP}}(\sigma)$，阐明其归一化核 $H^{\mathrm{AP}}(\sigma)$ 仍具 $\mathbb{Q}_{>0}$-伸缩不变性但因在 $1$ 处实对数不连续而脱离第 1 款，并揭示其 $\sigma \to \frac{1}{2}^+$ 发散与玻尔环面 RH 盲区（`手工推导` $+$ 经典文献）；第 4 款用精确代数检核及 256 位与 320 位 FLINT/Arb 区间算术（616 对跨精度对应区间球全部相交，跨精度中心最大差 $\approx 2.14\times 10^{-42}$）对五类核做十组晶格划分交叉认证（前九组 L1–L8 覆盖全部五类核，L9 覆盖三类初等闭式核；`NUM`，完整脚本与双精度日志归档于 [Issue #969 核验记录](https://github.com/the-omega-institute/trureturing-books/issues/969#issuecomment-7078266571)，脚本 SHA-256 `bc256a26c37a944e74804658f0cf93afd26033fdf58a740747e2ba7704db7a1f`）。

1. **固定剖面伸缩不变自卷积波前的普适丢番图阻断定理（手工推导，不依赖 RH）**：设 $f \in L^2(0, \infty)$ 为任意非零函数，记对数坐标等距像 $\phi(u) := e^{u/2} f(e^u) \in L^2(\mathbb{R})$（$\lVert\phi\rVert_{L^2(\mathbb{R})} = \lVert f\rVert_{L^2(0,\infty)} > 0$）。在临界线上以 $L^2(\mathbb{R})$ 普朗歇尔—傅里叶变换定义 $\mathcal{M}_{1/2}[f]\!(it) := \widehat{\phi}(-t) \in L^2(\mathbb{R})$（凡 $e^{\operatorname{Re}(z)u}\phi(u) \in L^1(\mathbb{R})$ 处，其与绝对收敛勒贝格积分 $\mathcal{M}_{1/2}[f]\!(z) := \int_0^\infty f(x)\,x^{z - 1/2}\,dx = \int_{-\infty}^\infty \phi(u)\,e^{zu}\,du$ 一致；若加权梅林被积函数 $f(x)\,x^{z - 1/2}$ 在端点仅条件可积而同时其梅林变换解析延拓至 $z = \pm\frac{1}{2}$——如第 2 款中的 $h^{(2)}$ 在 $z = -\frac{1}{2}$ 处——则双极点消去 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 理解为解析延拓值与条件瑕积分一致归零），记谱密度 $w(t) := \lvert\mathcal{M}_{1/2}[f]\!(it)\rvert^2 \in L^1(\mathbb{R})$（$F(0) := \frac{1}{2\pi}\int_{-\infty}^\infty w(t)\,dt = \lVert f\rVert_{L^2}^2 > 0$）与归一化连续相关核 $K(u) := \frac{1}{2\pi F(0)}\int_{-\infty}^\infty e^{itu} w(t)\,dt$（满足 $K(0) = 1$ 及 $\operatorname{Re} K(-u) = \operatorname{Re} K(u)$）。令伸缩基族取 $v_n(x) := d_n\,n^{-1/2} f(x/n)$ 或倒数伸缩 $v_n(x) := d_n\,n^{1/2} f(nx)$（任意正权 $d_n > 0$），在任意有限正整数集 $V = I \sqcup A \sqcup B$（要求分支 $A, B$ 非空，允许 $I = \emptyset$）上以第一变元共轭线性的标准 $L^2(0, \infty)$ 内积构造格拉姆矩阵 $G_{mn} := \langle v_m, v_n\rangle_{L^2(0,\infty)}$（归一化向量 $\hat{v}_n := v_n / \lVert v_n\rVert$ 的相关矩阵 $H_{mn} = \langle\hat{v}_m, \hat{v}_n\rangle$ 在前一种约定下为 $K(\ln(n/m))$、在倒数约定下为 $K(\ln(m/n))$，两种约定均有 $\operatorname{Re} H_{mn} = \operatorname{Re} K(\ln(m/n))$）。对非零固定剖面 $f$，有限个相异伸缩必线性无关（若 $\sum c_n n^{\pm it}\widehat{\phi}(-t) = 0$ 几乎处处成立，则非零指数多项式在正测集 $\{w > 0\}$ 上归零，矛盾），故 $G_V \succ 0$；对一般格拉姆实现（含 $G_{II}$ 奇异或 $I = \emptyset$ 时约定 $S_{PP} := G_{PP}$），核包含 $\ker(G_{II}) \subseteq \ker(G_{PI})$ 与值域相容 $\operatorname{im}(G_{IP}) \subseteq \operatorname{im}(G_{II})$ 仍自动成立，阿尔伯特广义舒尔补 $S_{PP} := G_{PP} - G_{PI} G_{II}^+ G_{IP}$ 在 $P := A \sqcup B$ 上精确表示为 $S_{mn} = \langle P_I^\perp v_m, P_I^\perp v_n\rangle$（$P_I^\perp$ 为向 $\mathcal{H}_I := \operatorname{span}\{v_k : k \in I\}$ 正交补的投影）。在 $P = A \sqcup B$ 上满足 $G_{nn} > 0$（对上述非零固定剖面伸缩族自动成立）的前提下，记尺度不变的**舒尔存活率** $\eta_n := \frac{S_{nn}}{G_{nn}} = \lVert P_I^\perp\hat{v}_n\rVert^2 \in [0, 1]$、对角归一化舒尔块 $\widehat{S}_{PP} := \operatorname{diag}(G_{PP})^{-1/2} S_{PP} \operatorname{diag}(G_{PP})^{-1/2}$ 与**跨块典范相关（最小主夹角余弦）** $\cos\theta_{\min}(A, B \mid I) := \sup\bigl\{\lvert\langle u, w\rangle\rvert : u \in P_I^\perp\mathcal{H}_A,\; w \in P_I^\perp\mathcal{H}_B,\; \lVert u\rVert = \lVert w\rVert = 1\bigr\}$（当 $P_I^\perp\mathcal{H}_A = \{0\}$ 或 $P_I^\perp\mathcal{H}_B = \{0\}$ 时约定为 $0$；当 $S_{AA}, S_{BB} \succ 0$ 时即 $\lVert S_{AA}^{-1/2} S_{AB} S_{BB}^{-1/2}\rVert_2$）。对上述固定剖面伸缩基族（其中 $\operatorname{Re} H_{mn} = \operatorname{Re} K(\ln(m/n))$），以下三条无条件成立：

   - **（1A）普适舒尔存活—跨块耦合二分律**：对任意 $(a, b) \in A \times B$（记 $\Delta := \ln(a/b)$），无需对 $I$ 施加任何限制，恒有 $\lambda_{\min}(\widehat{S}_{PP}) \le 1 - \operatorname{Re} K(\Delta)$ 与

     $$
     \operatorname{Re}\!\left(\frac{S_{ab}}{\sqrt{G_{aa} G_{bb}}}\right) \;\ge\; \frac{\eta_a + \eta_b}{2} - \bigl(1 - \operatorname{Re} K(\Delta)\bigr) \;\ge\; \sqrt{\eta_a \eta_b} - \bigl(1 - \operatorname{Re} K(\Delta)\bigr);
     $$

     只要 $\eta_a, \eta_b > 0$（对上述固定剖面伸缩族自动成立），典范相关与成对归一化相关 $\rho_{ab} := \lvert S_{ab}\rvert / \sqrt{S_{aa} S_{bb}}$ 满足

     $$
     1 \;\ge\; \cos\theta_{\min}(A, B \mid I) \;\ge\; \rho_{ab} \;\ge\; 1 - \frac{1 - \operatorname{Re} K(\Delta)}{\sqrt{\eta_a \eta_b}} \;=:\; B_{\mathrm{1A}}(a, b),
     $$

     反过来，若某分离器 $I$ 将跨块典范相关压至 $\cos\theta_{\min}(A, B \mid I) \le \theta < 1$，则必强迫至少一端枢轴存活率塌缩：$\min(\eta_a, \eta_b) \le \sqrt{\eta_a \eta_b} \le \frac{1 - \operatorname{Re} K(\Delta)}{1 - \theta}$（当 $\min(\eta_a, \eta_b) = 0$ 时该式平凡成立）。此外，只要二阶谱矩 $\sigma_w^2 := \frac{\int_{-\infty}^\infty t^2 w(t)\,dt}{\int_{-\infty}^\infty w(t)\,dt} < \infty$，恒有 $1 - \operatorname{Re} K(\Delta) \le \frac{1}{2}\sigma_w^2 \Delta^2$。

   - **（1B-i）固定有限分离器下互素分支面积律的严格证伪**：设 $p > q$ 为任意两枚相异素数（故 $\alpha := \frac{\ln p}{\ln q} \notin \mathbb{Q}$），$I \subset \mathbb{Z}_{\ge 1}$ 为任意固定有限集。沿 $\alpha$ 的连分数渐近分数 $b_k / a_k$（$a_k, b_k \in \mathbb{Z}_{\ge 1},\; a_k \to \infty$）令 $A_k := p^{a_k}$、$B_k := q^{b_k}$，则 $\Delta_k := \lvert\ln(A_k / B_k)\rvert < \frac{\ln q}{a_{k+1}} \to 0$ 且由黎曼—勒贝格引理（$w \in L^1(\mathbb{R}) \implies \lim_{\lvert u\rvert\to\infty} K(u) = 0$）得 $\eta_{A_k} \to 1$、$\eta_{B_k} \to 1$，从而 $\lim_{k\to\infty} \rho_{A_k, B_k} = 1$；对任意包含素数幂塔的扩张互素子树 $A_D \supseteq \{p^j : 1 \le j \le D\} \setminus I$ 与 $B_D \supseteq \{q^r : 1 \le r \le \lceil D\alpha\rceil\} \setminus I$，必有

     $$
     \lim_{D \to \infty} \cos\theta_{\min}(A_D, B_D \mid I) \;=\; 1, \qquad
     \liminf_{D \to \infty} \bigl\lVert\operatorname{diag}(G_{A_D})^{-1/2} S_{A_D B_D} \operatorname{diag}(G_{B_D})^{-1/2}\bigr\rVert_2 \;\ge\; 1.
     $$

     因此**没有任何非零固定剖面 $L^2(0, \infty)$ 伸缩不变自卷积波前**——即使在解析延拓或勒贝格意义下满足 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 并具任意阶 Schwartz 衰减——能在固定有限根分离器上使上述扩张互素乘性分支的跨块典范相关 $\cos\theta_{\min}(A_D, B_D \mid I)$ 或对角归一化跨块舒尔谱范数 $\bigl\lVert\operatorname{diag}(G_{A_D})^{-1/2} S_{A_D B_D} \operatorname{diag}(G_{B_D})^{-1/2}\bigr\rVert_2$ 呈面积律衰减（乃至随 $D \to \infty$ 保持一致严格小于 $1$ 的最终上界）。

   - **（1B-ii）固定紧支撑波前的 $\Omega(L)$ 数值穿插分离器下界**：设 $\operatorname{supp}(K) \subset [-R, R]$（$R > 0$；此类满足 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 的光滑波前非空，例如对任意非零 $\psi \in C_c^\infty((-R/2, R/2))$ 取 $\phi := \psi'' - \frac{1}{4}\psi$ 经两次分部积分即得 $\mathcal{M}_{1/2}[f]\!(z) = (z^2 - \frac{1}{4})\int \psi(u)e^{zu}\,du$）。由 $K$ 在 $0$ 处连续且 $K(0) = 1$，对任意目标阈值 $\theta \in (0, 1)$ 可取充分小的 $\delta \in (0, \ln q)$ 使 $\kappa_\delta := \inf_{\lvert u\rvert < \delta}\lvert K(u)\rvert > \theta > 0$。选取 $\alpha = \frac{\ln p}{\ln q}$ 的连续一对渐近分数 $(a_k, b_k)$ 与 $(a_{k+1}, b_{k+1})$ 使 $a_k \ln p > 2R + 2\delta$ 且 $\lvert\varepsilon_k\rvert < \delta$（其中 $\varepsilon_m := a_m \ln p - b_m \ln q$，连续两项严格异号且 $0 < \lvert\varepsilon_{k+1}\rvert < \lvert\varepsilon_k\rvert < \delta$）。从 $(a^{(1)}, b^{(1)}) := (a_k, b_k)$ 起作贪心之字游走：当 $e_j := a^{(j)}\ln p - b^{(j)}\ln q$ 与 $\varepsilon_k$ 同号时加 $(a_{k+1}, b_{k+1})$，异号时加 $(a_k, b_k)$（因 $\alpha \notin \mathbb{Q}$ 恒有 $e_j \neq 0$）。则 $e_j$ 全程留在半开区间 $[\varepsilon_k, \varepsilon_{k+1})$ 或 $(\varepsilon_{k+1}, \varepsilon_k] \subset (-\delta, \delta)$ 内，且各对的对数坐标 $R$-走廊 $J_j := \bigl[\min(a^{(j)}\ln p, b^{(j)}\ln q) - R,\; \max(a^{(j)}\ln p, b^{(j)}\ln q) + R\bigr]$ 两两不相交（相邻间距至少 $a_k\ln p - 2R - 2\delta > 0$）。对一切 $L > a_{k+1}\ln p + \delta$，由 $a^{(j)} \le j a_{k+1}$ 与 $b^{(j)}\ln q < a^{(j)}\ln p + \delta$，前 $M(L) := \bigl\lfloor\frac{L - \delta}{a_{k+1}\ln p}\bigr\rfloor = \Omega_{p,q,R,\delta}(L)$ 对的节点中心 $a^{(j)}\ln p,\; b^{(j)}\ln q$ 全部落在 $(0, L]$ 内（即 $p^{a^{(j)}}, q^{b^{(j)}} \in [1, e^L]$）；故对任意允许随 $L$ 增长的消去集 $I \subset \mathbb{Z}_{\ge 1}$，记 $A_L := \{p^a \le e^L : a \ge 1\} \setminus I$ 与 $B_L := \{q^b \le e^L : b \ge 1\} \setminus I$，只要 $\lvert I\rvert < M(L)$，必有某条走廊 $J_{j_*}$ 不含任何 $\ln m$（$m \in I$），从而节点对 $(a_*, b_*) := (p^{a^{(j_*)}}, q^{b^{(j_*)}}) \in A_L \times B_L$ 留存且与 $I$ 零耦合（$\eta_{a_*} = \eta_{b_*} = 1$），强制

     $$
     \cos\theta_{\min}(A_L, B_L \mid I) \;\ge\; \kappa_\delta \;=\; \inf_{\lvert u\rvert < \delta}\lvert K(u)\rvert \;>\; \theta.
     $$

     因此要将跨块典范相关压至 $\theta$（乃至 $\kappa_\delta$）以下，消去集 $I$ 必须满足 $\lvert I\rvert \ge M(L) = \Omega_{p,q,R,\delta}(L)$ 且以节点逐条刺穿全部 $M(L)$ 条对数走廊，即只能靠**一维数值尺度的穿插分离**，而不能依赖乘性树拓扑本身。

   **证明（1A 与 1B-i）。** 因 $P_I^\perp$ 为正交投影（$\lVert P_I^\perp\rVert \le 1$），对 $\hat{v}_a, \hat{v}_b$ 展开 $\eta_a + \eta_b - 2\operatorname{Re}\bigl(S_{ab}/\sqrt{G_{aa}G_{bb}}\bigr) = \lVert P_I^\perp(\hat{v}_a - \hat{v}_b)\rVert^2 \le \lVert\hat{v}_a - \hat{v}_b\rVert^2 = 2(1 - \operatorname{Re} K(\Delta))$ 并在 $u = \frac{1}{\sqrt{2}}(e_a - e_b)$ 上计瑞利商即得（1A）前半与 $\lambda_{\min}(\widehat{S}_{PP}) \le 1 - \operatorname{Re} K(\Delta)$；配以均值不等式 $\frac{\eta_a + \eta_b}{2} \ge \sqrt{\eta_a \eta_b}$ 并除以 $\sqrt{\eta_a\eta_b}$ 得 $B_{\mathrm{1A}} \le \rho_{ab} \le \cos\theta_{\min} \le 1$ 及其逆否命题，而 $1 - \cos(t\Delta) \le \frac{1}{2} t^2\Delta^2$ 给出二阶矩上界。对（1B-i），有限集 $I$ 上 $1 - \eta_n = H_{n, I} H_{II}^+ H_{I, n} \le \lVert H_{II}^+\rVert_2 \sum_{m \in I} \lvert K(\ln(n/m))\rvert^2 \to 0$（$n \to \infty$）；当 $a_k \le D$ 时，由 $\alpha \notin \mathbb{Q}$ 与 $b_k \in \mathbb{Z}_{\ge 1}$ 满足 $b_k < a_k\alpha + 1$，整性即给出 $b_k \le \lceil a_k\alpha\rceil \le \lceil D\alpha\rceil$；结合 $1 - \operatorname{Re} K(\Delta_k) \to 0$ 代入（1A）即得 $\cos\theta_{\min} \to 1$，而算子范数不小于 $(A_k, B_k)$ 处归一化矩阵元模长 $\lvert S_{A_k, B_k}\rvert / \sqrt{G_{A_k, A_k} G_{B_k, B_k}} \to 1$，证毕。$\square$

2. **两族显式双极点消去自卷积波前构造（$\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$，手工推导）**：

   - **五项支撑限于 $(0, 1]$ 的双极点消去 NBB 小波 $h^{(2)}$ 与一致 Loewner 夹逼**：从 [@rem-ch34-nbb-gram-spectral-and-pruning] 在带域 $0 < \operatorname{Re} s < 1$ 上的梅林恒等式 $(\mathcal{M} f_a)(s) = -a^{-s}\zeta(s)/s$（[`fractionalMellin_eq_zeta`](lean:D5/S3/Weil/ZetaPntBounds/NymanFractionalMellin.fractionalMellin_eq_zeta) 加上 $(1, \infty)$ 尾巴积分）出发，令 $D_2(s) := (1 - 2^{-s})^2(1 - 2^{1-s})^2 = 1 - 6\cdot 2^{-s} + 13\cdot 4^{-s} - 12\cdot 8^{-s} + 4\cdot 16^{-s}$ 并定义

     $$
     h^{(2)}(x) \;:=\; \left\{\frac{1}{x}\right\} - 6\left\{\frac{1}{2x}\right\} + 13\left\{\frac{1}{4x}\right\} - 12\left\{\frac{1}{8x}\right\} + 4\left\{\frac{1}{16x}\right\}, \qquad
     h^{(2)}_a(x) \;:=\; h^{(2)}(ax).
     $$

     因 $\sum_{r=0}^4 c_r 2^{-r} = D_2(1) = 0$，当 $x > 1$ 时 $h^{(2)}(x) \equiv 0$（支撑限于 $(0, 1]$，彻底消除裸 $f_a$ 在 $(1, \infty)$ 上的 $1/x$ 双曲长尾，但因 $16$-周期函数 $P(u) := \sum_{r=0}^4 c_r\{u/2^r\}$ 在 $1 < u < 2$ 上取 $-1$，其支撑闭包触及原点 $x = 0$、在 $(0, \infty)$ 中并非紧支）；又因 $D_2(0) = D_2'(0) = D_2(1) = D_2'(1) = 0$，$(\mathcal{M} h^{(2)})(s) = -\frac{\zeta(s)}{s} D_2(s)$ 延拓为整函数且精确满足 $\mathcal{M}_{1/2}[h^{(2)}]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$：在 $s = 1$（$z = +\frac{1}{2}$）处 $\int_0^1 h^{(2)}(x)\,dx = \sum_{r=0}^4 c_r \frac{r\ln 2 + 1 - \gamma}{2^r} = 0$ 为绝对收敛勒贝格积分；在 $s = 0$（$z = -\frac{1}{2}$）处因 $\int_0^1 \lvert h^{(2)}(x)\rvert\frac{dx}{x} = \int_1^\infty \lvert P(u)\rvert\frac{du}{u} = \infty$，加权被积函数并非勒贝格可积，但 $P(u)$ 均值为零且原函数有界保证了条件瑕积分收敛并与 $s \to 0^+$ 极限一致，而 $D_2$ 在 $s = 0$ 处的二重零点将该公共值精确钉为零：$\lim_{\varepsilon\to 0^+}\int_\varepsilon^1 h^{(2)}(x)\frac{dx}{x} = \lim_{s\to 0^+}(\mathcal{M} h^{(2)})(s) = 0$。在临界线 $s = \frac{1}{2} + it$ 上直接配平方得 $D_2(\frac{1}{2} + it) = 4^{-it}\bigl(2\cos(t\ln 2) - \frac{3}{\sqrt{2}}\bigr)^2$，故对一切 $t \in \mathbb{R}$ 一致有界且远离零点：

     $$
     c_{\min} \;:=\; \left(\frac{3}{\sqrt{2}} - 2\right)^4 \;\le\; \left\lvert D_2\!\left(\tfrac{1}{2} + it\right)\right\rvert^2 \;\le\; \left(\frac{3}{\sqrt{2}} + 2\right)^4 \;=:\; c_{\max},
     $$

     其中 $c_{\min} \approx 2.16638\times 10^{-4}$、$c_{\max} \approx 288.500$。由梅林—普朗歇尔等距，对任意有限正整数集 $V$ 均无条件成立一致 Loewner 谱夹逼 $c_{\min}\,G^{\mathrm{NB}}_V \preceq G^{\mathrm{pc}}_V \preceq c_{\max}\,G^{\mathrm{NB}}_V$（从而 $G^{\mathrm{pc}}_V \succ 0$，且在顺序集 $V = \{1, \dots, N\}$ 上由 [@rem-ch34-nbb-gram-spectral-and-pruning] 立得 $\kappa_2(G^{\mathrm{pc}}_N) = N^{2+o(1)}$），其矩阵元可由有限 Vasyunin 线性组合 $G^{\mathrm{pc}}_{ab} = \sum_{r,s=0}^4 c_r c_s G^{\mathrm{NB}}_{2^r a, 2^s b}$ 精确计算，且归一化相关矩阵 $H^{\mathrm{pc}}_{ab} := G^{\mathrm{pc}}_{ab}/\sqrt{G^{\mathrm{pc}}_{aa} G^{\mathrm{pc}}_{bb}}$ 仍完全受第 1 款丢番图阻断支配。

   - **高斯解析 Schwartz 双极点消去波前 $K_{\mathrm{Sch}}$**：取 $\phi_{\mathrm{Sch}}(u) := \frac{1}{\sqrt{2\pi}}\bigl(u^2 - \frac{5}{4}\bigr)e^{-u^2/2} \in \mathcal{S}(\mathbb{R})$（对应 $f_{\mathrm{Sch}}(x) = \frac{1}{\sqrt{2\pi x}}\bigl((\ln x)^2 - \frac{5}{4}\bigr)e^{-(\ln x)^2/2}$），则 $\mathcal{M}_{1/2}[f_{\mathrm{Sch}}]\!(z) = \bigl(z^2 - \frac{1}{4}\bigr)e^{z^2/2}$ 为整函数且精确满足 $\mathcal{M}_{1/2}[f_{\mathrm{Sch}}]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$；谱密度 $w_{\mathrm{Sch}}(t) = (t^2 + \frac{1}{4})^2 e^{-t^2} > 0$ 对全实轴严格为正，$F_{\mathrm{Sch}}(0) = \frac{17}{32\sqrt{\pi}} \approx 0.299726$，经算子 $\bigl(-\frac{d^2}{du^2} + \frac{1}{4}\bigr)^2$ 作用于 $\frac{1}{2\sqrt{\pi}}e^{-u^2/4}$ 闭式给出

     $$
     K_{\mathrm{Sch}}(u) \;=\; \left(1 - \frac{14}{17} u^2 + \frac{1}{17} u^4\right)e^{-u^2/4}, \qquad
     \sigma_{\mathrm{Sch}}^2 \;=\; -K_{\mathrm{Sch}}''(0) \;=\; \frac{73}{34} \;\approx\; 2.147059,
     $$

     在任意有限正实集上严格正定，具高斯超指数衰减与精确变号零点 $u = \pm\sqrt{7 \pm 4\sqrt{2}}$（$\approx \pm 1.158942,\; \pm 3.557647$），且满足 $1 - K_{\mathrm{Sch}}(\Delta) \le \frac{73}{68}\Delta^2$。

3. **真正实现互素分支精确解耦的素数分解 Besicovitch–Euler 张量积核与临界线双重壁垒（手工推导 $+$ 经典文献，不依赖 RH）**：真正脱出第 1 款实对数连续阻断的自然算术核来自垂直线 $\operatorname{Re}(s) = \sigma > \frac{1}{2}$ 上的无权均值。对任意固定 $\sigma > \frac{1}{2}$ 与固定正整数 $m, n \ge 1$，无条件成立

   $$
   G^{\mathrm{AP}}(\sigma)_{mn} \;:=\; \lim_{T \to \infty} \frac{1}{T}\int_T^{2T} m^{-\sigma - it} n^{-\sigma + it}\lvert\zeta(\sigma + it)\rvert^2\,dt \;=\; \zeta(2\sigma)\,\operatorname{lcm}(m, n)^{-2\sigma}.
   $$

   其归一化相关矩阵元按素数坐标精确因子分解（从而在任意有限正整数集 $V$ 上，该矩阵是素数因子克罗内克张量积的主子矩阵）：

   $$
   H^{\mathrm{AP}}(\sigma)_{mn} \;:=\; \frac{G^{\mathrm{AP}}(\sigma)_{mn}}{\sqrt{G^{\mathrm{AP}}(\sigma)_{mm} G^{\mathrm{AP}}(\sigma)_{nn}}} \;=\; \left(\frac{\gcd(m, n)}{\operatorname{lcm}(m, n)}\right)^{\sigma} \;=\; \prod_{p \in \mathbb{P}} p^{-\sigma\lvert v_p(m) - v_p(n)\rvert}.
   $$

   **重要结构辨析**：将既约分数写为 $m/n = p_0/q_0$（$\gcd(p_0, q_0) = 1$），立见 $H^{\mathrm{AP}}(\sigma)_{mn} = (p_0 q_0)^{-\sigma}$ 对一切正整数 $k \in \mathbb{Z}_{\ge 1}$ 满足 $H^{\mathrm{AP}}(\sigma)_{km, kn} = H^{\mathrm{AP}}(\sigma)_{mn}$（故 $H^{\mathrm{AP}}(\sigma)_{mn}$ 仅依赖于有理比 $m/n \in \mathbb{Q}_{>0}$，可自然延拓为 **$\mathbb{Q}_{>0}$-乘性伸缩不变核**，而 $G^{\mathrm{AP}}(\sigma)$ 仅差对角权 $\zeta(2\sigma)(mn)^{-\sigma}$）；它绕开第 1 款并非打破乘性伸缩不变性，而是**打破了实对数拓扑在 $1$ 处的连续性**——当 $n \to \infty$ 时 $\frac{n+1}{n} \to 1$ 而 $H^{\mathrm{AP}}(\sigma)_{n+1, n} = (n(n+1))^{-\sigma} \to 0$，故不可能来自任何 $L^2(0, \infty)$ 固定剖面自卷积核。

   **证明（无条件均值极限与精确互素解耦）。** 在 $t \in [T, 2T]$ 上取 $x = T$（因 $2T < \pi T = \frac{2\pi}{2} T$，严格满足 $C = 2 > 1$），由 E. C. Titchmarsh（1986, Theorem 4.11）一致成立 $\zeta(\sigma + it) = S_0(t) + E(t)$，其中 $S_0(t) := \sum_{k \le T} k^{-\sigma - it}$、$\lvert E(t)\rvert = O_\sigma(T^{-\sigma})$（极点项满足 $\lvert\sigma + it - 1\rvert \ge T$）。展开 $S_1(t)\overline{S_2(t)}$（$S_1(t) := m^{-\sigma-it}S_0(t) = \sum_{r \le mT,\, m\mid r} r^{-\sigma-it}$，$S_2(t) := n^{-\sigma-it}S_0(t)$），对角项 $r = s$（等价于 $\operatorname{lcm}(m, n) \mid r$）给出 $\operatorname{lcm}(m, n)^{-2\sigma}\zeta(2\sigma) + O_{m,n,\sigma}(T^{1-2\sigma})$；对一切非对角项 $1 \le r < s \le X := \max(m, n)T$，由 $-\ln(1 - u) \ge u$（$u \in (0, 1)$）得 $\bigl\lvert\int_T^{2T}(r/s)^{-it}\,dt\bigr\rvert \le \frac{2}{\ln(s/r)} \le \frac{2s}{s - r}$，分 $r \le s/2$ 与 $s/2 < r < s$ 求和即得非对角均值误差为 $O_{m,n,\sigma}(T^{1-2\sigma}\ln T)$（$\frac{1}{2} < \sigma < 1$）、$O_{m,n}(T^{-1}\ln^2 T)$（$\sigma = 1$）与 $O_{m,n,\sigma}(T^{-1})$（$\sigma > 1$），均随 $T \to \infty$ 归零；由此又知 $\frac{1}{T}\int_T^{2T}\lvert S_0(t)\rvert^2\,dt = O_\sigma(1)$，配合柯西—施瓦茨不等式得 $E(t)$ 交叉项为 $O_{m,n,\sigma}(T^{-\sigma}) \to 0$。进一步，对任意有限集 $V \subset \mathbb{Z}_{\ge 1}$ 与任意 $\sigma > 0$，$H^{\mathrm{AP}}(\sigma)_V$ 是有限张量积 $\bigotimes_{p \mid \prod V} H^{(p)}(\sigma)$ 的主子矩阵，每个素数因子 $H^{(p)}(\sigma)_{j,k} = p^{-\sigma\lvert j - k\rvert}$ 由 [@rem-ch34-laplace-tridiagonal-vs-nbb-separator] 第 1 款（取 $x_j = p^{\sigma j}$）严格正定且逆为三对角，故 $H^{\mathrm{AP}}(\sigma)_V \succ 0$。设 $P_1, P_2, P_3 \subset \mathbb{P}$ 两两不相交（允许 $P_1 = \emptyset$），$I_0$ 为任意有限非空 $P_1$-光滑整数集，$A$ 由形如 $m_1 m_2$（$m_1 \in I_0$，$m_2 > 1$ 为 $P_2$-光滑）的整数组成，$B$ 由形如 $n_1 n_3$（$n_1 \in I_0$，$n_3 > 1$ 为 $P_3$-光滑）的整数组成，则对一切 $m \in A, n \in B, k \in I_0$ 均有 $H^{\mathrm{AP}}_{m,k} = H^{\mathrm{AP}}_{m_1,k} m_2^{-\sigma}$、$H^{\mathrm{AP}}_{k,n} = H^{\mathrm{AP}}_{k,n_1} n_3^{-\sigma}$ 与 $H^{\mathrm{AP}}_{m,n} = H^{\mathrm{AP}}_{m_1,n_1} m_2^{-\sigma} n_3^{-\sigma}$，从而记 $H_0 := H^{\mathrm{AP}}(\sigma)_{I_0, I_0}$ 立得 $H_{m, I_0} H_0^{-1} H_{I_0, n} = (H_0)_{m_1, n_1} m_2^{-\sigma} n_3^{-\sigma} = H_{m, n}$，即跨块舒尔补**恒等归零** $S^{\mathrm{AP}}(\sigma)_{AB} \equiv 0$；由分阶段舒尔商性质，再在 $A$ 与 $B$ 内部分别追加消去任意子集 $I_A \subset A$、$I_B \subset B$ 仍保持 $S^{\mathrm{AP}}(\sigma)_{(A\setminus I_A),(B\setminus I_B)} \equiv 0$。$\square$

   然而该素数张量积在临界线面前撞上两道硬壁垒：其一，非归一化对角范数平方 $G^{\mathrm{AP}}(\sigma)_{1,1} = \zeta(2\sigma) = \frac{1}{2\sigma - 1} + \gamma + O(\sigma - \frac{1}{2}) \to +\infty$（$\sigma \to \frac{1}{2}^+$），在 $\sigma = \frac{1}{2}$ 本身虽仍可定义归一化张量核 $H^{\mathrm{AP}}(\frac{1}{2})$，但非归一化垂直线均方由 Hardy–Littlewood 临界线均方渐近定理（Titchmarsh 1986, Theorem 7.3）呈 $\ln T$ 发散；反之，一旦在 $\sigma = \frac{1}{2}$ 上插入任何非负权 $w_0(t)$ 使加权谱密度 $w_0(t)\lvert\zeta(\frac{1}{2} + it)\rvert^2 \in L^1(\mathbb{R})$ 非零可积，所得核即刻坍缩回第 1 款的实对数连续核并落入丢番图阻断；其二，在 $\sigma \in (\frac{1}{2}, 1)$ 上 $G^{\mathrm{AP}}(\sigma)$ 与 $H^{\mathrm{AP}}(\sigma)$ 刻画独立相位玻尔环面 $\mathbb{T}^\infty$ 上由随机欧拉乘积给出的无条件均值，而在 $\sigma = \frac{1}{2}$ 上因原始均方发散，归一化核 $H^{\mathrm{AP}}(\frac{1}{2})$ 则是 $\sigma \to \frac{1}{2}^+$ 的归一化相关极限（等价于 $\mathbb{T}^\infty$ 上以 $p^{-\lvert j - k\rvert/2}$ 为傅里叶系数的局部泊松概率测度乘积下的特征标内积）；二者之正定性与精确互素舒尔解耦均无条件成立（证明完全不依赖 RH），且归一化核 $H^{\mathrm{AP}}(\sigma)$ 与极限核 $H^{\mathrm{AP}}(\frac{1}{2})$ 本身不含 $\zeta$、无法由其正定性或舒尔解耦辨别临界带内是否潜伏离轴 $\zeta$ 零点。

4. **五类核十组晶格划分的 256/320 位 Arb 认证对照（`NUM`）**：通过精确代数检核及 256 位与 320 位 Arb 区间求值先核验选定输入处的构造恒等式：五项小波 $G^{\mathrm{pc}}_{ab}$ 在 $(1,1), (1,2), (2,2), (2,3), (3,3)$ 处与独立分段三伽马 `acb.integral` 残差均小于 $6\times 10^{-74}$（256 位）与 $2\times 10^{-93}$（320 位），且在前九组划分 L1–L8 上相对 $G^{\mathrm{NB}}_V$ 的广义特征值严格落于 $[c_{\min}, c_{\max}]$（例如 36 元晶格 L7 上最小与最大 Loewner 特征值为 $0.003306$ 与 $261.158$）；对 Schwartz 剖面 $\phi_{\mathrm{Sch}}$ 与核 $K_{\mathrm{Sch}}(u)$，在选定测试点上归一化傅里叶反演与 $K_{\mathrm{Sch}}(u)$ 之差、$\phi_{\mathrm{Sch}}$ 的原始自卷积与 $F_{\mathrm{Sch}}(0) K_{\mathrm{Sch}}(u)$ 之差以及双倾斜矩 $\int_{-\infty}^\infty \phi_{\mathrm{Sch}}(u)e^{\pm u/2}\,du$ 的残差均小于 $2\times 10^{-75}$（256 位）；对紧支撑之字游走（$(p, q) = (3, 2)$、$R = 1$、$\delta = 0.06$、渐近分数 $(5, 8)$ 与 $(12, 19)$），前 $20$ 对精确满足 $\max_{1 \le j \le 20}\lvert e_j\rvert = \lvert 5\ln 3 - 8\ln 2\rvert \approx 0.052116 < 0.06$ 且相邻走廊最小间距 $\approx 3.493061 > 0$。下表汇总十组完整指定的晶格划分（前九组 L1–L8 覆盖全部五类核，L9 覆盖三类初等闭式核 $K^{\mathrm{Lap}}, K_{\mathrm{Sch}}, H^{\mathrm{AP}}(\sigma)$；各互素分支均先剔除 $I$，L7a/L7b 与 L8 的截断上界 $256$、$130$ 分别施加于各素分支；其中 L4 窗内另有 $12$ 个 $b, c \ge 1$ 混合节点位于 $I \sqcup A \sqcup B$ 之外，且最近对 $(9, 10)$ 与 $(18, 20)$ 并列，括号内 $B_{\mathrm{1A}}$ 取自 $(18, 20)$）的跨块典范相关 $\cos\theta_{\min}(A, B \mid I)$ 与括号内正的第 1 款解析下界 $B_{\mathrm{1A}}$（平凡的非正下界 $B_{\mathrm{1A}} \le 0$ 省略括号；320 位结果四舍五入至六位，接近 $1$ 时改写 $1 - \varepsilon$，其中 $\varepsilon$ 保留四位有效数字；所有标“$0$（精确）”单元的 $\cos\theta_{\min} = 0$ 分别由 [@rem-ch34-laplace-tridiagonal-vs-nbb-separator]（$K^{\mathrm{Lap}}$）与第 3 款（$H^{\mathrm{AP}}$）的精确恒等式认证；在归档脚本中，$K^{\mathrm{Lap}}$ 的零舒尔元由精确有理算术复核且对应 Arb 区间包含 $0$，而 $H^{\mathrm{AP}}$ 数值最大绝对跨块舒尔元 $\max\lvert(S_{AB})_{ij}\rvert$ 的 256 位与 320 位区间半径上限分别为 $\le 3.52\times 10^{-76}$ 与 $\le 2.45\times 10^{-95}$，$K^{\mathrm{Lap}}$ 的独立 Arb 半径亦严格低于此上限）：

   | 晶格与划分（消去集 $I$，跨块 $A \times B$，最近对与 $\lvert\Delta\rvert$） | $K^{\mathrm{Lap}}$ $\cos\theta_{\min}$ ($B_{\mathrm{1A}}$) | 裸 $H^{\mathrm{NB}}$ $\cos\theta_{\min}$ ($B_{\mathrm{1A}}$) | 消去小波 $H^{\mathrm{pc}}$ $\cos\theta_{\min}$ ($B_{\mathrm{1A}}$) | Schwartz $K_{\mathrm{Sch}}$ $\cos\theta_{\min}$ ($B_{\mathrm{1A}}$) | $H^{\mathrm{AP}}(\frac{3}{4}) / H^{\mathrm{AP}}(\frac{1}{2})$ $\cos\theta_{\min}$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **L1** $\{1,2,3\}$，$I=\{2\}$，数值分 $\{1\}\times\{3\}$（$(1,3)$，$1.098612$） | $0$（精确） | $0.184770$ ($0.184133$) | $0.044469$ | $0.833922$ | $0.365365 / 0.447214$ |
   | **L2** $\{1,2,3\}$，$I=\{1\}$，互素分 $\{2\}\times\{3\}$（$(2,3)$，$0.405465$） | $0.612372$ ($0.591752$) | $0.563887$ ($0.533361$) | $0.098016$ | $0.951567$ ($0.797884$) | $0 / 0$（精确） |
   | **L3** 17 元 $\{2^a 3^b\}\times\{5^c 7^d\}$（$0\le a,b,c,d\le 2$），$I=\{1\}$（$(36,35)$，$0.028171$） | $0.975299$ ($0.972200$) | $0.963657$ ($0.956201$) | $0.860873$ ($0.852785$) | $1 - 1.211\times 10^{-16}$ ($0.999148$) | $0 / 0$（精确） |
   | **L4** 27 元 $\{2^a 3^b 5^c:0\le a,b,c\le 2\}$，$I=\{1,2,4\}$，$\{2^a 3^b:b\ge 1\}\times\{2^a 5^c:c\ge 1\}$（$(9,10)/(18,20)$，$0.105361$） | $0.944625$ ($0.895321$) | $0.892049$ ($0.830280$) | $0.814885$ ($0.562272$) | $1 - 3.243\times 10^{-16}$ ($0.984453$) | $0 / 0$（精确） |
   | **L5** 同 27 元，$I=\{1,2,4\}$，数值分 $\{3\}\times\{n>4\}$（$(3,5)$，$0.510826$） | $0$（精确） | $0.527076$ ($0.229600$) | $0.864212$ | $1 - 1.405\times 10^{-16}$ | $0.711598 / 0.836660$ |
   | **L6** 14 元 $\{3^a\}_{1\le a\le 5}\times\{2^b\}_{1\le b\le 8}$，$I=\{1\}$（$(243,256)$，$0.052116$） | $0.954335$ ($0.949218$) | $0.954887$ ($0.941332$) | $0.762858$ ($0.759911$) | $1 - 3.240\times 10^{-10}$ ($0.997086$) | $0 / 0$（精确） |
   | **L7a** 36 元 $\{2^a 3^b \le 256\}\times\{5^c 7^d \le 256\}$，$I=\{1\}$（$(243,245)$，$0.008197$） | $0.994742$ ($0.991837$) | $0.991469$ ($0.984614$) | $0.957410$ ($0.947035$) | $1 - 1.952\times 10^{-51}$ ($0.999928$) | $0 / 0$（精确） |
   | **L7b** 同 36 元，扩根 $I=\{1,\dots,9\}$（$(243,245)$，$0.008197$） | $0.994660$ ($0.991826$) | $0.988185$ ($0.981623$) | $0.957364$ ($0.947019$) | $1 - 8.916\times 10^{-50}$ ($0.999889$) | $0 / 0$（精确） |
   | **L8** 16 元奇素 $\{3^a 5^b \le 130\}\times\{7^c 11^d \le 130\}$，$I=\{1\}$（$(75,77)$，$0.026317$） | $0.987780$ ($0.974021$) | $0.984298$ ($0.961057$) | $0.911576$ ($0.860604$) | $1 - 1.028\times 10^{-18}$ ($0.999254$) | $0 / 0$（精确） |
   | **L9** 32 元毕达哥拉斯音差塔 $\{3^a\}_{1\le a\le 12}\times\{2^b\}_{1\le b\le 19}$，$I=\{1\}$（$(3^{12},2^{19})$，$0.013551$） | $0.986710$ ($0.986540$) | — | — | $1 - 7.042\times 10^{-16}$ ($0.999803$) | $0 / 0$（精确） |

   对照表将几何对偶与丢番图锁死一眼看穿：其一，最小三元窗口 L1/L2 直接揭示 $K^{\mathrm{Lap}}$ 与 $H^{\mathrm{AP}}(\sigma)$ 的严格对偶——前者在数值分离器 $I=\{2\}$ 精确归零而在互素分支 $I=\{1\}$ 非零，后者恰好相反（对一切 $\sigma > 0$，含 $\sigma = \frac{3}{4}$ 与 $\sigma = \frac{1}{2}$，归一化核 $H^{\mathrm{AP}}(\sigma)$ 在 $I=\{2\}$ 上精确满足 $S^{\mathrm{AP}}_{1,3} = 3^{-\sigma}(1 - 4^{-\sigma})$，即 $0.283591$ 与 $0.288675$；而在 $\sigma > \frac{1}{2}$ 上未归一化核 $G^{\mathrm{AP}}(\sigma)$ 对应 $\zeta(2\sigma)3^{-2\sigma}(1 - 4^{-\sigma})$）；其二，双极点消去小波 $H^{\mathrm{pc}}$ 虽在极小窗口 L1/L2 压低了耦合（$0.044469$ 与 $0.098016$），一旦乘性晶格出现丢番图近碰撞（L3、L8、L7a/L7b），解析下界 $B_{\mathrm{1A}}$ 已落在向外舍入的包含区间 $[0.852784,\; 0.947035]$ 内（其 320 位 Arb 下端点均严格超过 $0.852784$，从而强制 $\cos\theta_{\min} \ge B_{\mathrm{1A}} > 0.852784$），而 Arb 认证的实测 $\cos\theta_{\min}$ 落于 $[0.860872,\; 0.957411]$，即便将根分离器从 $I=\{1\}$ 扩大九倍至 $I=\{1,\dots,9\}$（L7b），耦合 $\cos\theta_{\min}$ 仍维持在 $0.957364$，且在全奇素且与 $2$ 互素的 L8 上依然达到 $0.911576$；其三，高斯解析 Schwartz 核 $K_{\mathrm{Sch}}$ 在数值分离器 L5 上虽将归一化输入下的最大绝对**消元后**跨块舒尔元压至 $0.035558$（其量级受塌缩存活率 $\eta_3 \approx 0.003399$ 经柯西—施瓦茨界 $\lvert S_{3,b}\rvert \le \sqrt{\eta_3\eta_b}$ 制约，而典范相关仍高达 $1 - 1.405\times 10^{-16}$），却在互素分支 L3、L7a/L7b、L8、L9 上受丢番图近碰撞与投影子空间的极端近共线性支配，使 $1 - \cos\theta_{\min} \in [1.95\times 10^{-51},\; 7.05\times 10^{-16}]$。
:::

::: {.viz src="arithmetic-pivot-resonant-tunneling-sandbox" preset="fabry-perot-rogue-explosion" height="520"}
**多级舒尔枢轴共振中继与离轴反复平方失谐爆炸实验卡（`fabry-perot-rogue-explosion`）。** 在首颗零点纵坐标剖面 $t = \gamma_1 \approx 14.1347$ 上拖动琥珀色落点圆环或滑块调节假想右半带偏移 $\delta$（琥珀色标出当前激活的枢轴阱与读头，其余枢轴阱 $\widetilde{G}^{(1)}\text{–}\widetilde{G}^{(4)}$ 与倍增层环为紫色）：在临界线 $\delta = 0.00$ 处，凯莱比 $(s - 1)/s$ 及其倒数 $w = -\rho/(1 - \rho) = \rho/(\rho - 1)$ 均严守单位模长 $\lvert w\rvert^{2^\ell} = 1.000000$，青色中继波束无损锁入临界脊线上的青色单位圆环（绿色 `LEAN ✓` 对应 `golden_right_half_strip_implies_rh`、`cayley_ratio_norm_one_iff_critical_line`、`cayley_critical_line_zeta_criterion` 与 `original_zero_robin5040_localA`）；一旦假想 $\delta > 0$（此时右半带 $(s - 1)/s$ 模长小于 $1$，倒数比值 $w = -\rho/(1 - \rho)$——等价于左侧镜像根 $\rho_- = \frac{1}{2} - \delta + i\gamma_1$ 处的 $(\rho_- - 1)/\rho_-$——模长 $\lvert w\rvert > 1$），品红色逃逸柱与条带曲线 $\log_{10}\lvert w\rvert^{2^\ell}$ 逐层反复平方，在预设 $\delta = 0.05$ 下于 $\ell = 12$ 升至 $2.78$、于 $\ell = 16$ 飙升至 $1.30\times 10^7$。
:::

至此，局部波前消元与全局跨势垒共振接力的几何拼图已全部就位；接下来我们把三种攻关范式摆上同一张对照台账，并用最严格的认识论诚实准绳钉死这条路线上的“最后一公里”开放问题。

## 31.2.4 三大攻关范式总对照、算术枢轴面积律“最后一公里”开放问题与微积分重塑前奏 {#sec-ch34-29-4}

将百年来解析数论围绕临界带展开的三大路线并列对照，从图论排序壁垒到量子势垒隧穿的底层同源关系便一目了然：

| 核心维度 | 1. 传统一维截断逼近（经典爬壁 · 如 $\zeta_M(s)$ 与顺序 NBB） | 2. 单级磨光器逼近（单跳裸隧穿 · Levinson–Conrey） | 3. 乘性波前枢轴 $+$ 多级共振隧穿（极小圆弧体内割重整路线） |
| :--- | :--- | :--- | :--- |
| **图论与物理对应** | 经典 Dijkstra 全局一维全序排队 | 单势垒无中继硬穿（受阿格蒙衰减限制） | **2025 局部波前稀疏 Pivot $+$ 多阱共振隧穿** |
| **对 $s = 1$ 势垒处理** | 沿球壳表面硬撞发散墙，硬截断劈裂圆弧体 | 单段有限长度 $T^\vartheta$ 试探穿越 | **$90^\circ$ 入虚盲区削去极点，沿内割弦多级接力** |
| **正定性与假零点** | 触发**图兰芝诺陷阱**，在 $\sigma > 1$ 产生越界假零点 | 超过 $\vartheta = \frac{4}{7}$ 后非对角色散无法估计 | 局部自卷积波前保正定，**分块舒尔补精确传代** |
| **捕杀离轴 $\delta$ 步数** | 双指数高合成窗口（[@thm-off-line-zero-robin-violation] 的显式界） | 仅能锁住约 $41.72\%$ 零点，漏掉高阶细微离轴态 | **几何倍增跳跃 $O(\log(\gamma_0/\delta))$ 层**引爆凯莱失谐（`MODEL` 设想） |

顺着第三列合成路线往下深挖：尽管经典黎曼猜想本身已由另一条外部形式化路线确立（[@conj-riemann-hypothesis]，未冻结于本书所钉 `trureturing` 仓库），为什么这一乘性舒尔枢轴方案至今仍未独立在 Lean 4 内核中闭合？因为图论最短路径与算术希尔伯特空间之间至少横亘着一道尚未被驯服的代数鸿沟（而跨过它能否不依赖上述外部证明独立推出黎曼猜想，本身也是下面问题的一部分）——我们将其正式立为本节算术临界带路线的“最后一公里”开放问题：

::: {.problem #prob-ch34-arithmetic-pivot-area-law title="对称自卷积乘性波前下跨算术枢轴子树横向移位纠缠的面积律衰减猜想（最后一公里开放问题）"}
在 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 的有向图最短路径问题中，边权合成运算落在**热带半环 $(\min, +)$** 上，满足幂等律 $\min(a, a) = a$ 且绝无负号相消干涉，因此消去局部前驱子树后不会在兄弟枢轴分支之间凭空激发出破坏单调性的横向负相位纠缠。相反，在临界带 $\sigma \in (\frac{1}{2}, 1]$ 上的算术希尔伯特空间分块舒尔补

$$
\widetilde{G}_{PP}^{(\ell)} = G_{PP}^{(\ell)} - G_{PI}^{(\ell)} \bigl(G_{II}^{(\ell)}\bigr)^+ G_{IP}^{(\ell)}
$$

中，乘性素数生成树虽然在相异素数坐标上按乘积因子分解（即便在 $H^{\mathrm{AP}}$ 中未消去根 $1$ 前亦有 $H^{\mathrm{AP}}_{p,q} = (pq)^{-\sigma} > 0$），但在典型整数标号算术实现（如裸分数部核 $G^{\mathrm{NB}}$ 与固定剖面伸缩波前）中，底数嵌入整数环 $\mathbb{Z}$ **往往**因加法临近与实对数尺度交错而在兄弟分支之间产生非零的**横向非对角耦合**（例如对紧支撑半径小于 $\ln(3/2)$ 的核在极小窗口 $\{1,2,3\}$ 上取 $I = \{1\}$ 时虽可暂时解耦，但一旦在任意固定有限分离器上令分支扩张至包含丢番图近碰撞便无法回避——而若在截断于 $e^L$ 的素数幂塔上允许分离器 $I$ 随尺度增长，则必须按第 1 款付出 $\lvert I\rvert = \Omega(L)$ 个数值穿插分离点的代价）；本节研究纲领将其启发式地类比于对正整数移位 $h \in \mathbb{Z}_{\ge 1}$ 的二元移位莫比乌斯自相关和 $\sum_{n \le X} \mu(n)\mu(n + h)$（Chowla 二元关联问题 / 孪生素数型移位卷积和）与非对角 Kloosterman 和色散相位（该类比仅作构造动机，二者与具体算术格拉姆矩阵族之间尚无已确立的严格恒等式）。具体而言，[@rem-ch34-laplace-tridiagonal-vs-nbb-separator] 已用 73 位区间反例证明，演示核 $K^{\mathrm{Lap}}$ 的精确数值分离消零律不能直接迁移到裸分数部矩阵 $G^{\mathrm{NB}}$；更进一步，[@rem-ch34-dilation-wavefront-nogo-and-euler-tensor] 已无条件证伪任何**固定剖面 $L^2(0, \infty)$** 伸缩不变自卷积波前 $G_{mn} = d_m d_n F(0) K(\pm\ln(m/n))$（符号随第 1 款伸缩约定而定）——即便满足 $\mathcal{M}_{1/2}[f]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$ 与 Schwartz 衰减——在固定有限根分离器上跨扩张互素分支的典范相关与对角归一化跨块舒尔谱范数衰减，并对固定紧支撑情形证明 $\Omega(L)$ 个数值穿插分离点下界，同时指出在 $\sigma > \frac{1}{2}$ 上凭实对数不连续性实现精确互素解耦的素数分解张量积 $G^{\mathrm{AP}}(\sigma)$ 在 $\sigma \to \frac{1}{2}^+$ 处发散且其归一化极限位于不辨别 RH 的玻尔环面。

**开放目标（经 [@rem-ch34-dilation-wavefront-nogo-and-euler-tensor] 阻断定理收窄后的剩余核心目标）**：试在不调用外部证明 [@conj-riemann-hypothesis] 的前提下，在无界二进重整化尺度序列 $X_\ell := 2^\ell X_0$（$X_0 \ge 1,\; \ell = 1, 2, \dots$）上明确给出正半轴双极点消去剖面 $f_\ell \in L^2(0, \infty)$（满足 $\mathcal{M}_{1/2}[f_\ell]\!\bigl(\pm\tfrac{1}{2}\bigr) = 0$）及其对数等距像 $\phi_\ell(u) := e^{u/2} f_\ell(e^u)$ 与对称自卷积波前 $F_\ell = \phi_\ell * \tilde{\phi}_\ell^*$，明确说明其如何生成参数化于 $\sigma \in (\frac{1}{2}, 1)$ 的算术格拉姆矩阵 $G^{(\ell)}(\sigma)$、稀疏算术枢轴划分 $I_\ell \sqcup P_\ell$ 以及配套零点判别泛函族 $\Phi_\ell(\sigma)$（作用于 $\widetilde{G}_{PP}^{(\ell)}(\sigma)$）——要么采用**超越固定剖面实对数连续伸缩核的素数结构 / 非平稳算子映射（明确给出由剖面或波前到 $G^{(\ell)}(\sigma)$ 的构造规则，且不退化为 RH 盲视玻尔环面平均）**，要么采用尺度依赖剖面 $f_\ell$ 使相关宽 $R_\ell$ 随 $X_\ell$ 收缩（防止退化为仅因 $R_\ell$ 小于最小对数间距而平凡对角化的无信息矩阵）——且在两种路径下均须明确给出零点敏感性判据（即因任何格拉姆矩阵及其舒尔补按构造自动半正定，须额外指定逐 $\sigma$ 阈值 $B(\sigma) < \infty$，使若开带内存在 $\zeta(\rho) = 0$ 且 $\sigma_0 := \operatorname{Re}(\rho) \in (\frac{1}{2}, 1)$，则在 $\sigma = \sigma_0$ 处必存在 $\ell$ 破坏 $\Phi_\ell(\sigma_0) \le B(\sigma_0)$），严格证明或证伪：

1. **横向纠缠面积律衰减界（Area-Law Bound）**：在明确界定尺度不变或显式归一化的跨分支耦合度量 $\Gamma_\ell(\sigma; A_\ell, B_\ell \mid I_\ell)$（如 $\cos\theta_{\min}(A_\ell, B_\ell \mid I_\ell)$ 或对角归一化跨块舒尔谱范数，不能靠缩减对角权人为压低原始矩阵元）、随层级无界增长的子树边界尺度 $L_\partial(\ell) \to \infty$（其中消去 $I_\ell$ 后保留规模无界增长的非平凡兄弟乘性分支 $A_\ell, B_\ell \subset P_\ell$）与多级共振阈值 $\eta_{\mathrm{FP}}(\sigma) \in (0, 1)$ 的前提下（对任意内积格拉姆实现，列空间相容性 $\operatorname{im}(G_{IP}^{(\ell)}) \subseteq \operatorname{im}(G_{II}^{(\ell)})$ 自动成立），证明对每个固定 $\sigma \in (\frac{1}{2}, 1)$ 存在与层级 $\ell$ 及尺度 $X_\ell$ 无关的一致常数 $C_0(\sigma), C > 0$ 及随边界衰减的显式包络 $\psi(L_\partial) \to 0$（如幂律 $L_\partial^{-\alpha}$），使每一级 $\ell$ 跨兄弟乘性枢轴子树的横向耦合满足显式面积律衰减不等式 $\Gamma_\ell(\sigma; A_\ell, B_\ell \mid I_\ell) \le \min\bigl(\eta_{\mathrm{FP}}(\sigma),\; C_0(\sigma)\,\psi(L_\partial(\ell))\bigr)$（既不呈体积律发散，也不落入 [@rem-ch34-dilation-wavefront-nogo-and-euler-tensor] 的固定剖面丢番图 $\cos\theta_{\min} \to 1$ 锁死，亦非靠 $R_\ell \to 0$ 抹去一切跨尺度耦合的平凡对角化），同时保证消去集与有效枢轴总基数满足一致多项式上界 $\lvert I_\ell\rvert + \lvert P_\ell\rvert \le C_0(\sigma)\,(\ln X_\ell)^C$（排除指数级枢轴或分离器反弹；在固定紧支撑剖面下，例如可通过附加条件 $\lvert I_\ell\rvert = o(\ln X_\ell)$ 或将 $\lvert I_\ell\rvert$ 严格压在走廊数 $M(\ln X_\ell)$ 之下，排除第 1 款的 $\Omega(\ln X_\ell)$ 数值穿插机制）；
2. **由舒尔耦合界推导零点判别泛函的一致控制与右半带排零独立闭环**：严格证明由第 1 款的逐级面积律舒尔耦合界（配以指定的递推传代恒等式）对全部 $\sigma \in (\frac{1}{2}, 1)$ 与一切 $\ell \ge 1$ 推出配套泛函的一致界 $\Phi_\ell(\sigma) \le B(\sigma)$（超越格拉姆半正定性本身），并由此排除开带 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ 内的一切 $\zeta$ 零点，进而经 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 第 2 款独立导出黎曼猜想 [@conj-riemann-hypothesis]。
:::

依照全书一以贯之的认识论诚实准则，请务必看清这道认识论边界：**尽管经典黎曼猜想本身已由另一条外部形式化证明确立（[@conj-riemann-hypothesis]，未冻结于本书所钉 `trureturing` 仓库），但在 [@prob-ch34-arithmetic-pivot-area-law] 获得严格解决之前，本节建立的“局部乘性波前 $+$ 分块舒尔补算术枢轴 $+$ 多级法布里—珀罗共振隧穿”体系仍是一套把解析数论瓶颈收束到单一代数目标的构造性研究纲领与统一几何诠释（`MODEL` $+$ `OPEN`），绝不是已经完成的独立证明！**

::: {.remark #rem-ch34-arithmetic-pivot-literature title="图兰部分和零点、Nyman–Beurling 对数下界、4/7 磨光器定理与最短路径枢轴移植的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节汇聚的数论定理、高精度证书与跨学科几何架构严格区分以下五个认识论层级：

1. **机器验证的 Lean 4 内核定理锚点（`LEAN ✓`）**：[@thm-ch34-critical-strip-barrier-and-cayley-bridge] 所列的全部九条 `trureturing` 冻结声明——`classical_zeta_unique_simple_pole_residue_one`、`completedRiemannZeta_ne_zero_of_one_le_re`、`golden_right_half_strip_implies_rh`、`cayley_ratio_norm_one_iff_critical_line`、`cayley_critical_line_zeta_criterion`、`gram_realizability`、`exists_posSemidef_completion`、`exists_posSemidef_completion_rank_le` 与 `original_zero_robin5040_localA`——连同 [@prop-ch34-hermitian-schur-variational-minimum] 的埃尔米特分块舒尔补二次型变分极小定理 `schur_quadratic_is_least`，均已在所钉提交上经 Lean 4 内核零公理缺口验证通过（`LEAN ✓`）。
2. **解析数论与图论算法经典文献（未在本书形式化）**：一切充分大 $M$ 的部分和 $\zeta_M(s)$ 在 $\sigma > 1$ 内无零点即蕴含 RH 的判据由 P. Turán（*Danske Vid. Selsk. Mat.-Fys. Medd.* **24**(17), 1–36, 1948）提出；波利亚（Pólya）与图兰（Turán）刘维尔和符号猜想的渐近反例由 C. B. Haselgrove（*Mathematika* **5**, 141–145, 1958）给出；大 $M$ 越界零点实部上确界渐近公式 $\psi_M = 1 + (\frac{4}{\pi} - 1 - o(1))\frac{\ln\ln M}{\ln M}$ 由 H. L. Montgomery（*Studies in Pure Mathematics: To the Memory of Paul Turán*, Birkhäuser, 497–506, 1983）确立（部分和零点分布的进一步研究见 H. L. Montgomery & R. C. Vaughan, *Period. Math. Hungar.* **43**, 199–214, 2002, [doi:10.1023/A:1015202219630](https://doi.org/10.1023/A:1015202219630)）；结合 R. Spira（*Math. Comp.* **20**, 542–550, 1966；*Duke Math. J.* **35**, 79–82, 1968；*Math. Comp.* **22**, 168–173, 1968）与 W. R. Monach（密歇根大学博士论文, 1980），$\zeta_M(s) \neq 0$ 在 $\operatorname{Re}(s) > 1$ 上成立当且仅当 $M \in \{1,\dots,18, 20, 21, 28\}$ 的完整分类定理最终由 D. J. Platt & T. S. Trudgian（*LMS J. Comput. Math.* **19**(1), 37–41, 2016，[arXiv:1507.01340](https://arxiv.org/abs/1507.01340)）确立。希尔伯特空间逼近准则与自然数顺序无条件对数下界 $\liminf_{M \to \infty}(\ln M)\,d_M^2 \ge \sum_{\operatorname{Re}(\rho)=1/2} m_\rho^2 / \lvert\rho\rvert^2 > 0$（黎曼猜想成立时该和等于或不小于 $C_{\mathrm{NBB}} = 2 + \gamma - \ln(4\pi) \approx 0.0461914179$）源自 B. Nyman（1950）、A. Beurling（1955）、L. Báez-Duarte, M. Balazard, B. Landreau & E. Saias（*Adv. Math.* **149**, 130–144, 2000）、J.-F. Burnol（*Adv. Math.* **170**(1), 56–70, 2002，[arXiv:math/0103058](https://arxiv.org/abs/math/0103058)，将无条件对数下界分子强化至重数平方 $m_\rho^2$）与 L. Báez-Duarte（2003，[arXiv:math/0202141](https://arxiv.org/abs/math/0202141)）。临界带中 $\zeta(\sigma + it)$ 的有限狄利克雷截断逼近与垂直线均方定理源自 E. C. Titchmarsh（*The Theory of the Riemann Zeta-Function*, 2nd ed., rev. by D. R. Heath-Brown, Oxford Univ. Press, 1986, ISBN `978-0-19-853369-6`, Theorem 4.11、Theorem 7.2 与 Theorem 7.3；Vasyunin 闭式与相关 DOI 参见 [@rem-ch34-nbb-gram-spectral-and-pruning]）。临界线零点正比例与磨光器极限源自 A. Selberg（1942）、N. Levinson（*Adv. Math.* **13**, 383–436, 1974，极限磨光指数 $\vartheta < \frac{1}{2}$ 下 $\ge 34.74\%$）、J.-M. Deshouillers & H. Iwaniec（*Invent. Math.* **70**, 219–288, 1982）、J. B. Conrey（*J. Reine Angew. Math.* **399**, 1–26, 1989，$\vartheta < \frac{4}{7}$ 下 $\ge 40.88\%$）及 K. Pratt, N. Robles, A. Zaharescu & D. Zeindler（*Res. Math. Sci.* **7**, 2, 2020，在 $\vartheta < \frac{4}{7}$ 下引入更丰富磨光系数达 $> 41.72\%$）。有向图单源最短路径破除排序壁垒的局部波前与稀疏枢轴算法源自 R. Duan, J. Mao, X. Mao, X. Shu & L. Yin（*STOC 2025* / [arXiv:2504.17033](https://arxiv.org/abs/2504.17033), 2025；参见 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization)）。
3. **高精度区间认证与精确有理算例（`手工推导` / `NUM`）**：分块 $LDU$ 行列式分解与奇异情形下的阿尔伯特摩尔—彭罗斯广义舒尔补恒等式、[@rem-ch34-laplace-tridiagonal-vs-nbb-separator] 中 $K^{\mathrm{Lap}}$ 的三对角精度定理与真实 $G^{\mathrm{NB}}$ 的 73 位区间分离反例、[@rem-ch34-dilation-wavefront-nogo-and-euler-tensor] 中固定剖面伸缩不变自卷积波前的丢番图阻断定理、五项双极点消去小波 $h^{(2)}$（一致 Loewner 夹逼）与 Schwartz 闭式波前 $K_{\mathrm{Sch}}$、素数分解张量积 $G^{\mathrm{AP}}(\sigma)$ 及其十组晶格 256/320 位 FLINT/Arb 区间认证，以及 [@ex-ch34-turan-schur-and-cayley-calculus] 中的三项检验（第 1 项的 $\zeta_{19}$ 百位鲁歇区间证书及 $1 \le M \le 10^6$ 刘维尔和 $L_M(\sigma)$ 在 $\sigma \ge 1$ 上的正性证书、第 2 项的 `[1, 2 | 3, 6]` 精确有理舒尔补消元与第 3 项的凯莱反复平方条件数值表），均为精确代数恒等式、严格解析推导或独立复核的区间算术认证（`手工推导` / `NUM`）。
4. **跨学科统一几何架构（`MODEL`）**：将一维截断解释为中途芝诺斩波、将单级磨光器解释为受限于 $\vartheta = \frac{4}{7}$ 的单跳裸隧穿、以及用算术 MERA 舒尔枢轴重整与法布里—珀罗多级共振腔统一重构临界带穿越路线，属于本书建立的几何综合模型（`MODEL`）。
5. **未解核心数学猜想（`OPEN`）**：经 [@rem-ch34-dilation-wavefront-nogo-and-euler-tensor] 排除固定剖面 $L^2(0, \infty)$ 伸缩不变波前在固定有限根分离器上跨扩张互素分支的典范相关与对角归一化跨块舒尔谱范数衰减后，超越该类核（且排除 RH 盲视玻尔环面与平凡对角化）的算术枢轴子树横向移位纠缠面积律衰减（[@prob-ch34-arithmetic-pivot-area-law]）与 Chowla 移位莫比乌斯自相关猜想（参见[附录 C](appendix-c.md#sec-appendix-c-open-register) 开放问题边界），均属当代数学尚未解决的开放命题（`OPEN`）。
:::

在下方完整三维交互沙盘中依次点按三种跨越架构，这三块几何拼图咬合后的威力便跃然眼前：切到第一档“传统一维全序硬截断”，硬生生的自然数排队闸门不仅翻不过 $s = 1$ 的发散大山，反而把未闭合的极小圆弧体拦腰斩碎，在原本干干净净的 $\sigma > 1$ 欧拉安全区里溅出了品红色的图兰越界假零点；切到第二档“单级磨光器裸隧穿”，波束虽然懂得转入 $90^\circ$ 虚盲区走山底平直内割弦，却因单跳跨度过长而在 $\vartheta = \frac{4}{7}$ 衰减墙前耗尽了相干幅值；唯独切入第三档“局部乘性波前 $+$ 多级舒尔枢轴共振隧穿”，外围杂乱的合数叶分支先化波成体、经分块舒尔补凝成山底隧道里一颗颗稀疏的琥珀色当前激活枢轴新点，让来自 $\sigma > 1$ 的正定信号顺着极小圆弧体内割弦一拍拍共振接力，稳稳锁向 $\sigma = \frac{1}{2}$ 的临界脊梁，并在短短对数层数内将任何潜伏的假想离轴偏置 $\delta > 0$ 当场引爆！

至此，图论最短路径去全序枢轴、量子力学 $90^\circ$ 正交盲区隧穿与解析数论素数路径积分这三座看似悬隔万里的学科高峰，已经在同一枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的内割弦面与多级舒尔枢轴中继腔中严丝合缝地合拢！紧接着，最后一步合流已呼之欲出：**既然我们在上一章 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 中已经用比较旋子、四相区矢高相变与 `1—3—3—1` 零离散误差有限网格斯托克斯定理重塑了极小圆弧体微积分本身，一旦把这三大圆弧微积分原语直接与本节的算术舒尔枢轴合体切入黎曼临界带，又会擦出怎样决定性的火花？**

空间的势垒、时间的双缝与算术临界带的高山，在同一记 $90^\circ$ 正交转身与内割弦枢轴重整下殊途同归。请先在下方完整交互实验室中亲手切换三大攻关架构、拨动截断门 $M$、磨光长度 $\vartheta$ 与离轴测试偏置 $\delta$，随后迈入本章压轴收官节 [§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler)——看素数旋子二阶矢高相变、埃尔米特—比勒径向单调锁与有限精度斯托克斯相消如何给出临界带的等价改写：

::: {.viz src="arithmetic-pivot-resonant-tunneling-sandbox" height="640"}
**算术枢轴重整与临界带多级共振隧穿完整交互实验室（`arithmetic-pivot-resonant-tunneling-sandbox`）。** 在统一的三维临界带地形舞台上自由切换全部四张递进实验卡——“一维全序硬截断与图兰 $\zeta_{19}$ 假零点陷阱”、“单级磨光器裸隧穿与 $\vartheta = \frac{4}{7}$ 色散墙”、“乘性波前与分块舒尔补枢轴粗粒化锥”以及“多级舒尔枢轴共振中继与离线失谐爆炸”——联动调节截断长度 $M \in [1, 40]$、磨光器对数长度 $\vartheta$、待补全格拉姆矩阵元 $x = G(1, 6)$、假想离线偏移 $\delta$ 与时间轴进度/倍增层数 $\ell$（青色绘制 $\sigma > 1$ 欧拉无零点高原、闭合相量链、$\vartheta \le \frac{4}{7}$ 已证单跳隧道、内部合数叶与 $\widetilde{G}_{36} = \frac{5}{18}$ 平直内割弦及 $\delta = 0$ 处的 $\lvert w\rvert = 1$ 幺正锁相环，品红色标示 $s = 1$ 极点山峰、$\zeta_{19}$ 在 $\sigma \approx 1.006988$ 处的图兰越界假零点、$\vartheta = \frac{4}{7}$ 色散墙外未证虚线及 $\delta > 0$ 的 $\lvert w\rvert^{2^\ell}$ 反复平方爆炸柱，紫色绘制临界带地形、稀疏舒尔枢轴锥、多级枢轴阱 $\widetilde{G}^{(1)}\text{–}\widetilde{G}^{(4)}$ 与 `ARGUED` 文献依据，琥珀色标出当前激活读头、截断框、当前枢轴阱与交互拖动手柄，[@prob-ch34-arithmetic-pivot-area-law] 的 `OPEN` 标记为红色，绿色 `LEAN ✓` 徽章标出 [@thm-ch34-critical-strip-barrier-and-cayley-bridge] 的全部九条 `trureturing` 内核定理实例）。
:::
