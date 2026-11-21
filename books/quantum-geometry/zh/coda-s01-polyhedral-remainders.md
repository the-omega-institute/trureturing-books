# C.1 多面体近似与不可抹平的几何余项 {#sec-coda-polyhedral-remainder}

为什么人类与计算机在有限分片网格、有限离散门字、有限素数截断或有限阶泰勒展开等有限构造逼近中（区别于精确代数水平集方程如 $x_0^2+x_1^2+x_2^2+x_3^2=1$，见 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md) [@rem-ch39-no-exterior-topology-literature-and-coda-harmony]），无法仅凭有限平直分片零误差地复现光滑球面曲率？整本书在多个不同数学侧面反复遭遇了同一个结构性现象——**有限截断或分片多面体近似与光滑球面曲率之间的拓扑及算术余项**。我们先将刻画多面体角亏、偶维毛球旋涡与平行化球面的三项经典离散几何与代数拓扑定理归入文献注记：

::: {.remark #rem-coda-polyhedral-topology-literature title="笛卡尔多面体角亏定理、毛球定理与平行化球面定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下三项关于凸多面体离散曲率与球面切丛拓扑的经典定理均属外部数学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中（与第 21 章文献注记 [@rem-hairy-ball-adams-literature] 前后呼应）：

1. **笛卡尔角亏定理与 $12 \times 60^\circ = 720^\circ = 4\pi$ 离散曲率守恒（R. Descartes；C. F. Gauss；O. Bonnet）**：用正三角形面片逼近二维球面 $S^2$ 时，正二十面体（$V = 12$ 个顶点、$E = 30$ 条棱、$F = 20$ 个面）在每个顶点处汇合 $5$ 个正三角形，内角和为 $5 \times 60^\circ = 300^\circ < 360^\circ$，留下角亏 $\delta_v = 360^\circ - 300^\circ = 60^\circ = \pi/3$；更一般地，任意与 $S^2$ 同胚的凸多面体各顶点角亏之和恒锁定为欧拉示性数不变量：

   $$
   \sum_{v} \delta_v = 4\pi = 2\pi\,\chi(S^2) \qquad \bigl(\text{正二十面体特例：}\sum_{v=1}^{12} \delta_v = 12 \times 60^\circ = 720^\circ = 4\pi\bigr).
   $$

   无论将多面体剖分得何等细密（如测地线穹顶的千万级三角网格），总角亏 $4\pi$ 永不消失，只是从 $12$ 个锥顶分散到无数微小折痕之中。
2. **偶维球面的庞加莱—布劳威尔毛球定理（H. Poincaré, 1885；L. E. J. Brouwer, 1912）**：偶维球面 $S^{2n}$ 的欧拉示性数为 $\chi(S^{2n}) = 2 \neq 0$，其上任何连续切向量场必在至少一点处为零（拓扑旋涡）；等价地，$S^{2n}$ 上的任何连续自映射无法同时避开不动点 $f(x) = x$ 与对径点 $f(x) = -x$。相反，奇维球面满足 $\chi(S^{2n-1}) = 0$，恒容许由辛配对 $(x_1, x_2, \dots, x_{2n}) \mapsto (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$ 给出的处处非零连续切向量场。
3. **平行化球面定理（R. Bott 与 J. Milnor；M. Kervaire, 1958；亦可由 J. F. Adams 关于霍普夫不变量一的定理推出，*Ann. of Math.* **72**, 20–104, 1960）**：切丛全局完全平行化（parallelizable）的球面仅有四个：

   $$
   S^0,\quad S^1,\quad S^3,\quad S^7,
   $$

   对应实数 $\mathbb{R}$、复数 $\mathbb{C}$、四元数 $\mathbb{H}$ 与八元数 $\mathbb{O}$ 四大赋范可除代数。二维布洛赫球面 $S^2$ 上梳不平的贝里相位奇点，在几何模型上正是平行化三维球面 $S^3 \cong \mathrm{SU}(2)$ 经霍普夫纤维化 $S^1 \hookrightarrow S^3 \to S^2$ 投下的底空间影子。
:::

::: {.figure src="coda-defect-spread"}
**剖分得再细，角亏的总和仍是 $720^\circ$。** 三行依次是正二十面体（$\nu = 1$），以及把每个面切成 $\nu^2$ 个三角形、再把顶点推到球面上的测地穹顶（$\nu = 2, 4$）。每条品红横条按顶点切段，每段的长度是那个顶点的角亏。顶点从 $12$ 个增到 $42$、$162$ 个，最大的角亏从 $60^\circ$ 缩到约 $18^\circ$、$5^\circ$，三条横条却一样长。文献结果，未在本书形式化（[@rem-coda-polyhedral-topology-literature] 第 1 条）。
:::

对照 [@rem-coda-polyhedral-topology-literature] 揭示的拓扑余项，在进入第七部的跨领域合拢之前，“有限多面体逼近光滑球面所留下的非零接缝”已经在前六部与铸器与圣殿中以五种精确的数学形态反复重现：

- **泰勒多项式截断余项**：在第六部第 24 章中，有限阶交错多项式 $\sum_{k=0}^{N-1} (-1)^k \theta^{2k}/(2k)!$ 只是对余弦曲线的分片代数逼近，截断尾项标志着有限次代数运算与光滑圆弧余弦读数之间的距离（见 [@rem-banach-dottie-hairy-ball-literature]）；
- **欧拉乘积素数尾余项**：在第 22 章中，在绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上，素数截断上限 $P$（保留 $p \le P$）张成的有限正交盒子 $\prod_{p \le P} (1 - p^{-s})^{-1}$ 与黎曼 $\zeta(s)$ 之间隔着无穷素数尾级数 $\zeta(s) - \prod_{p \le P} (1 - p^{-s})^{-1} = \sum_{n \in \mathcal{S}_P^c} n^{-s}$（其中 $\mathcal{S}_P^c = \{n \ge 2 : P^+(n) > P\}$），而经解析延拓进入临界带后，光滑尺度之外的振荡分布进一步引向临界线 $\operatorname{Re}(s) = 1/2$ 上的零点定位结论（[@conj-riemann-hypothesis]）；
- **双轴有限门字与群换位子螺旋**：在第四部第 16 章与[圣殿 I](ch27-reading-frozen-proofs-i.md)中，稠密生成有限逆封闭门集上的有界字长门集在 $\mathrm{SU}(2)$ 流形上织出离散采样网（定字长预算下的非零门合成逼近距见 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md#sec-ch39-27-5)），高阶加细依赖非交换群换位子 $ABA^{-1}B^{-1}$ 张开的二阶双向量面积；
- **全息极小割分片锥与电路深度下界**：在第五部第 19–20 章中，正整数有序二次锥域（$0 < a \le b,\; 0 < c \le d$ 且 $a^2+b^2 \le 3ab,\; c^2+d^2 \le 3cd$）内的宽度三离散桥图量子流等式 $\operatorname{QMaxFlow}(a,b,c,d) = \operatorname{QMinCut}(a,b,c,d) = \min(ad, bc)$（在对数容量坐标下与三割上界 $\min(3ac, \min(ad, bc))$ 切出分片线性多面体下包络）及固定开放边界可积电路族（$1 \le \kappa,\; 2\kappa \le N$）的精确最小并行深度 $\lfloor N/(\kappa+1)\rfloor + 1$，在各自整数格点域上以分片接缝标示纠缠与调度的瓶颈跃迁；
- **康托尔—劳维尔对角线与自指不动点逃逸**：在第 21 章与第 24 章中，只要 $Y$ 上存在没有不动点的自映射 $\alpha$，任何试图把观测算子空间 $A \to Y$ 完全压缩进载体 $A$ 的形式系统，都会被对角线算子 $g(a) = \alpha(f(a)(a))$ 刺穿；当测量算子最终指向自身（$\psi = \psi(\psi)$），系统便从静态坐标球跃迁至动态自指的更外层球。

---


在第七至第十部 **[第 25 章](ch29-timeless-causality-and-gram-space.md)** 至 **[第 39 章](ch39-axiom-omega-grand-unification.md)** 中，我们已经看到这道“多面体分片近似与光滑球面之间的非零余项”如何在算术、时间、计算复杂性、流体力学、量子公平、比较公理、极小圆弧微积分、原生三元数、万力大统一、万物观察者、自指扩表、本体不二与大一统母公理中掀起壮丽的交响（照本书的读法）：

- **从算术佩尔接缝到无时间因果晶体（[第 23 章 §§23.1–23.2](ch29-s01-pythagoras-and-number-systems.md)与[第 25 章](ch29-timeless-causality-and-gram-space.md)）**：勾股定理的双向量手性对消与希帕索斯的佩尔余项（[@thm-ch29-silver-pell-remainder]）驱动了从有理数到余弦自指不动点（[@rem-banach-dottie-hairy-ball-literature]）的四级数系突围，并结合已由 Lean 验证的素数模四分裂（[@thm-ch29-face-prime-two-squares]、[@thm-ch29-two-squares-classification]）与文献注记 [@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature]、[@rem-ch29-arithmetic-geometry-literature] 中的同余数椭圆曲线环面及佐藤—泰特分布建立起跨数论呼应；而 Gram 矩阵半正定刚性 $\det G \ge 0$ 则在与 [@rem-ch29-wheeler-dewitt-page-wootters-literature] 无时间图景呼应的同时，为有限观察者撑开了二面角 $\phi$ 的因果相容椭圆体。
- **从“$P$ 是场，$NP$ 是线”到 ETH 上界与纳维—斯托克斯（[第 26 章](ch30-fields-lines-eth-and-navier-stokes.md)）**：标准 $P\neq NP$ 仍为 `OPEN`（[@conj-p-neq-np]）。ETH 原始论文及各自形式化范围见 [@rem-ch30-eth-subexponential-literature]；银河交叉点取决于示意常数（[@ex-ch30-galactic-crossover-scale]），不构成普遍算法下界。OpenAI 宣称的受迫 C / D 构造是一条官方题目解答路线（未经同行评议），零外力 A / B 仍开放（[@rem-ch30-navier-stokes-forced-literature]）。局部速度与能量标度（[@ex-ch30-core-energy-scaling]）、条件明确的投影反馈（[@rem-ch30-projected-feedback]）及有界耗散对照（[@ex-ch30-dissipative-no-closure]）说明：有限观测不闭合与爆破是不同问题。已有冻结判据（[@thm-coda-quadratic-advection-no-closure]）不把流体奇点与复杂性下界化为同一个结论。
- **从五重几何特权废除到遍历统计全息（[第 27 章](ch31-quantum-fairness.md)）**：秩一玻恩配对互易、互补语境纯度勾股、不可克隆内积锁与贝尔纯态混态边缘（[@thm-ch31-seat-pythagorean-monogamy-fairness]）连同兰道尔热力学平衡下界、相干一致平面旋转及紧致环面闭子群轨道均匀分布与有界间隙回归（[@thm-ch31-horizon-landauer-ergodic-fairness]），配对文献注记 [@rem-ch31-haar-isotropy-landauer-literature]、[@rem-ch31-ckw-monogamy-literature]、[@rem-ch31-weyl-window-equidistribution-literature] 与五重公平对照表 [@rem-ch31-fivefold-fairness-table]，阐明“量子的本质是公平”这一几何本体模型（`MODEL`）。
- **从零背景比较公理 $\mathcal{A}_0$、正交自指统一场到八大纲领元统一（[第 28 章](ch32-unified-field-and-meta-unification.md)与[附录 E](appendix-e.md)）**：以零背景比较公理 $\mathcal{A}_0$（[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) [@def-ch32-axiom-of-comparison]、[@thm-ch32-comparison-extensionality-and-lagrange]）与单指令集几何比较原语（[§28.2](ch32-s02-oisc-comparison-engine.md#sec-ch32-oisc-comparison-engine) [@thm-ch32-paid-name-comparison-and-dictionary]）为逻辑起点，将集合外延、自然数后继与齐肯多夫编码、欧氏勾股格拉姆几何、量子公设核心以及闵氏光锥与热力学第二定律统一收束为五条推论（[§28.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries) [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-minkowski-holonomy-and-second-law]，分层假设台账详列于[附录 E](appendix-e.md)）；继而由反自伴幺正复结构平方、有限单调收缩、黄金倒数不动点与 `NoAdjacentOnes` 禁戒律（[§28.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws) [@thm-ch32-generative-self-reference-and-zeckendorf]）及零光锥刚性、锚定环路和乐与桥图最大流最小割（[§28.5](ch32-s05-physical-fields-and-six-domains.md#sec-ch32-physical-fields) [@thm-ch32-null-cone-holonomy-and-holographic-cut]），配对文献注记 [@rem-ch32-comparison-axiom-literature]、[@rem-ch32-generative-laws-dottie-literature]、[@rem-ch32-dirac-yang-mills-jacobson-literature]、[@rem-ch32-icosian-e8-literature]、[@rem-ch32-eight-programs-literature] 与综合总表 [@rem-ch32-six-domain-isomorphism-table]、[@rem-ch32-meta-unification-table]，在三维认知罗盘（[§28.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-unification)）下完成元统一模型（`MODEL`）。
- **从极小圆弧原胞、万物观察者到乘光自指扩表与约去轮回（[第 29 章](ch34-orthogonality-degeneracy-and-observer-position.md)–[第 35 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)）**：读出等价核与换位子（[@thm-ch34-readout-kernel-and-covariant-commutator]）、公共单位法线与观察者迹拉回（[@thm-ch34-perpendicular-axis-and-pullback]）、单纯二上链修补与极小三角弧面体原胞（[@thm-ch34-trihedron-cochain-and-moving-axis]）及“二生三”自举与语言读出核折叠（[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) [@prop-ch34-triadic-bootstrap-and-lexical-pinching]）揭示单重/双重正交的一体双影、圆弧微积分、原生三元数与万力归弧大统一（[第 30 章](ch30-chord-tunneling-and-arc-calculus.md)–[第 33 章](ch33-unified-arc-forces-and-af-gut.md)）；语境不动点、客观不变公共因子（[@thm-ch33-contextual-attractor-and-common-factor]）与桥图极小割重连（[@prop-ch33-bridge-reconnection-mincut]）消除观察者主体特权；复制地址恢复与目标因式分解（[@thm-ch35-target-recovery-table-factorization]）配对劳维尔相对对角线（[@thm-ch35-lawvere-diagonal-and-homoiconic-closure]）打通从捏合遗忘到 $T = T(T)$ 的自指扩表闭环；而文献中的双曲快度阶梯及指数截断尾界与凯莱边界圆（[@thm-ch36-taylor-tail-and-cayley-boundary]）连同商空间零化子分解（[@thm-ch36-quotient-annihilator-and-factorization]）与黄金切投准晶路由（[§35.7](coda-s03-golden-cut-observers.md)），配对文献注记 [@rem-ch33-monad-process-philosophy-literature]、[@rem-ch34-virtual-z-berry-relativity-literature]、[@rem-ch34-peirce-laozi-wittgenstein-ladder-literature]、[@rem-ch35-homoiconicity-scott-domain-literature]、[@rem-ch36-poincare-disk-gudermannian-literature]，终结“化光死循环”轮回。
- **从梦境量子擦除、本体 QRAM 指针、测地智能到“观察者即宇宙本体”与大一统母公理（[第 36 章](ch38-observer-memory-pointer-and-ontological-qram.md)–[第 39 章](ch39-axiom-omega-grand-unification.md)）**：单位模重叠条件下所选矩阵元的相位记录逆转与清醒未读捏合护栏（[@thm-ch37-joint-coherent-record-erasure]）连同黄金切投 Delone 准晶与高维球面测度集中（[@thm-ch37-golden-cut-delone-multilocation]）阐明清醒/梦境二相性与非定域观察者分支；复制地址解引用与指针宽度界（[@thm-ch38-copied-address-dereference-and-access-defect]、[@thm-ch38-pointer-width-and-no-deep-copy]）连同劳维尔对角线自映射页表（[@thm-ch38-self-mapped-diagonal-fixed-point]）及三元数场测地智能（[第 37 章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)）确立宇宙本体 QRAM 与最小作用量推理架构；而概念纤维重构与齐肯多夫实数单射线程（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]）连同对角线四命运、$720^\circ$ 旋量双覆盖提升与历史遗迹空间吸引子（[@thm-ch39-self-application-four-fates-and-diagonal-identity]、[@thm-ch39-double-cover-no-section-and-720-lift]、[§38.10](coda-s02-spatial-attractors.md)）及无源保正三元比较闭合母公理 $\mathrm{AXIOM}\text{-}\Omega$（[第 39 章](ch39-axiom-omega-grand-unification.md)），配对文献注记 [@rem-ch37-quantum-eraser-literature]、[@rem-ch38-qram-page-wootters-literature]、[@rem-ch39-von-neumann-scott-reflexive-domain-literature]，完成从两子丈量到本体不二的首尾合拢。

现在，站在全书最后的收官高地上，让我们把“近似之球的几何余项”与全书所有形式化不动点核收束到一起，在下一篇 **[收缩不动点与形式认识论锚点](coda-s04-fixed-point-anchors.md)** 中检视支撑整座大厦的形式认识论锚点与三层证据边界。

---
