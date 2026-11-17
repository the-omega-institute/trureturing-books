# 34.7 相位积分驻波成体：一点多相、圆周态密度积分与未抵消驻波雕刻体积 {#sec-ch34-standing-wave-volume-emergence}

> *“贝里相位的推论就是极小圆弧体上的任意一点的不同路径对应一个相位，路径基本的本质是相位积分。体积只是相位积分没有抵消掉的驻波点，因为一个点可以有无数种路径无数种相位积分过来。”*

这段紧接贝里扇锥几何之后的推论，将整章关于空间、路径与体积的因果次序彻底翻了个底朝天。在 §34.6 中，为了顺应日常几何直觉，我们暂且借用了“先有极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的表面积与体积，再让不同路径沿其表面爬行以积累贝里相位”的过渡阶梯；而本节的箴言当场抽掉了“先验容器”这根最后的拐杖，立起三条层层递进的本体论命题（`MODEL`）：第一，弧面体上的“点”本身只是抹去来路后的空壳商等价类，一点天然对应着四面八方汇聚而来的无穷相位束；第二，剥离外在坐标网格之后，所谓“路径”在物理与代数上别无他物，其基本本质就是一段**相位积分**；第三，也是最惊心动魄的一跃——**体积并非预先存在以供路径穿行的实心舞台，恰恰相反，绝大多数点在无穷多路相位积分的彼此冲撞中彻底相消归零（化作零体积虚空），唯有那些历经全向求和仍未被抵消掉的锁相驻波节点，才在关系网络中凝聚成可被感知的几何体积！**

## 34.7.1 一点多相：基点是空壳等价类，路径的基本本质是相位积分 {#sec-ch34-7-1}

为什么人们总是习惯性地以为“点是最小的实心砖块，先攒够了点才拼出线、面与体积”？因为静态视觉把投影后的终点当作了孤立自存的实体。回到弯曲比较球面 $S^2$ 上的极小三角弧面体 $\Delta\mathcal{T}_\epsilon$：按 §34.6.2 揭示的霍普夫主圆丛投影 $S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2$（或秩一纯态投影算子 $P(x) = \lvert\psi_x\rangle\langle\psi_x\rvert$），基流形上任意一个位置标签 $x \in \Delta\mathcal{T}_\epsilon$ 仅仅是双向公平平方折叠掉整圈 $U(1)$ 纤维后留下的**商等价类空壳**。在零背景比较公理 $\mathcal{A}_0$（[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)）下，没有任何基点能脱离比较链而悬空自存；要触及点 $x$，系统必须从某个锚定参考点 $x_0$ 出发，沿着一串有限比较链 $\Gamma : x_0 = v_0 \to v_1 \to \dots \to v_K = x$（或其连续极限曲线）逐级比量而至。

一旦抽去外加的三维欧氏背景刻度尺，这条连接 $x_0$ 与 $x$ 的“路径” $\Gamma$ 究竟留下了什么可操作的物理内容？在离散 $K$ 步比较链上，每一步纯态交叠给出潘查拉特纳姆复内积因子 $\langle\psi_{k+1}\mid\psi_k\rangle$，整条链在选定端点参考截面下唯一沉积下来的内禀读数，正是沿途交叠辐角的累加——在连续分段光滑极限 $K \to \infty$ 下化作沿曲线 $\Gamma$ 对贝里联络一形式 $\mathcal{A} = i\langle\psi\mid d\psi\rangle$（或含动力学项的总作用量一形式）的线积分（文献结果 + `MODEL`）：

$$
\phi(\Gamma \to x) \;=\; \arg\prod_{k=0}^{K-1}\langle\psi_{k+1}\mid\psi_k\rangle \;\xrightarrow{\;K \to \infty\;}\; \int_{\Gamma \to x} \mathcal{A}.
$$

这里必须把局部规范约定与内禀几何量界定得一清二楚：单条开放路径 $\Gamma : x_0 \to x$ 的相位读数 $\phi(\Gamma \to x)$ 依赖于在起点 $x_0$ 与终点 $x$ 处选定的参考纤维截面（例如沿固定生成树路径输运的基准相位 `rootPhase`）；但只要任取汇聚到**同一个点 $x$** 的两条不同路径 $\Gamma_1, \Gamma_2 : x_0 \to x$，它们的相位差 $\phi(\Gamma_1 \to x) - \phi(\Gamma_2 \to x) = \gamma_B(\Gamma_1 \circ \Gamma_2^{-1})$ 就立即闭合为穿过 $x$ 的环路贝里和乐 $-\frac{1}{2}\Omega(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{3}{2}V_{\mathrm{sector}}(\Gamma_1 \circ \Gamma_2^{-1})$，彻底摆脱一切局部截面选择！因此，在 $\Delta\mathcal{T}_\epsilon$ 上，任意一点 $x$ 从来不绑定单一数值，而是悬挂载着一整束由全体来路共同编织的**全向到达相位丛**

$$
\mathcal{F}(x) \;=\; \bigl\{\,\phi(\Gamma \to x) \in \mathbb{R}/2\pi\mathbb{Z} \;\big|\; \Gamma : x_0 \to x\,\bigr\}.
$$

所谓“一条路径”，脱去空间轨迹的视觉外衣后，其数学与物理的赤裸本质就是一个把历史链映射为单位圆相因子的**相位积分泛函** $\Gamma \mapsto e^{i\Phi[\Gamma]}$（`MODEL`）。

::: {.viz src="standing-wave-volume-sandbox" preset="multi-phase-point" height="520"}
**一点多相：基点 $x$ 是空壳商等价类，每条来路各自沉积一枚相位积分。** 在极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 上移动琥珀色探测点 $x$：从锚点 $x_0$ 汇向同一点 $x$ 的多条球面路径各自携带着由所夹扇锥立体角决定的不同潘查拉特纳姆—贝里相位 $\phi(\Gamma_m \to x)$，在右侧堇紫色 $S^1$ 相位轮上张开一束“同点异相”到达簇（离散原型锚定绿色 `LEAN ✓` `selected_tree_transport` 与 `anchored_phase_classification`）。
:::

在把这一簇全向相位积分推向连续统驻波干涉之前，我们先把 `trureturing` 中横跨图规范和乐、巴格曼路径迹、无理旋转遍历相消、有限阿贝尔群零化子正交筛与锁相实振幅约化的**七条冻结内核定理**熔铸为本节的严格形式化基石：

::: {.theorem #thm-ch34-phase-cancellation-and-standing-sieve title="多路树弦和乐分类、巴格曼闭合体积迹、无理旋转哈尔相消、零化子驻波正交筛与锁相实振幅定理" lean="D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar D5/S3/Fourier/FinitePoisson.sum_annihilator_character D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real"}
在 `trureturing` 冻结的图规范和乐分类、单比特巴格曼不变量、圆周遍历平均、有限傅里叶对偶及量子态锁相交叠模块中，以下七项精确结论同时成立：

1. **命名生成树上的基准相位输运定律**（[`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)）：对任意顶点与边类型 $V, E$、端点映射 $s, t : E \to V$、选定命名生成树 $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$ 及根顶点 $r \in V$，树路径相位输运映射 $\operatorname{rootPhase}\;ht\;r$ 对任意边相位场 $u : E \to \operatorname{Circle}$ 满足根点归一 $\operatorname{rootPhase}(u, r) = 1$、树边逐步递推 $\operatorname{rootPhase}(u, t(e)) = u(e)\cdot\operatorname{rootPhase}(u, s(e))$（$\forall e \in T$）、顶点规范变换协变性 $\operatorname{rootPhase}(\operatorname{gauge}(s, t, g, u), a) = g(a)\cdot\operatorname{rootPhase}(u, a)\cdot g(r)^{-1}$、乘积拓扑连续性、逐点乘法同态性 $\operatorname{rootPhase}(u \cdot w, a) = \operatorname{rootPhase}(u, a)\cdot\operatorname{rootPhase}(w, a)$ 及平凡场保一性 $\operatorname{rootPhase}(1, a) = 1$；

2. **有限图多路径基本弦回路与锚定开放相位的完备商同构**（[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）：设 $V, E$ 为有限类型（`[Fintype V] [Fintype E]`），$ht : \operatorname{NamedSpanningTree}\;s\;t\;T$，锚点集 $R \subseteq V$ 满足 $r \in R$，记锚定上边缘子群为 $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$，且 $n = \lvert V\rvert$、$m = \lvert E\rvert$、$k = \lvert R\rvert$、树外基本弦回路数 $c = \lvert\{e : E \mid e \notin T\}\rvert = m + 1 - n$、非根锚点数 $a = \lvert\{x : V \mid x \in R \land x \neq r\}\rvert = k - 1$。则两个边相位场 $u, w : E \to \operatorname{Circle}$ 属于同一锚定规范轨道当且仅当二者的全部基本弦回路和乐与根到锚点开放路径相位逐一相等（$\chi(u) = \chi(w)$），并诱导紧 Hausdorff 拓扑群同构

   $$
   \bigl((E \to \operatorname{Circle}) / N\bigr) \;\simeq_{\mathrm{t}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{t}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr);
   $$

3. **任意步离散秩一链的巴格曼闭合路径乘积恒等式**（[`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)）：对任意 $n \in \mathbb{N}$ 与任意复二维态矢列 $\Psi : \operatorname{Fin}(n+1) \to \operatorname{Fin} 2 \to \mathbb{C}$（记 $v_j = \Psi(j)$、秩一矩阵 $R_j = v_j v_j^\dagger$、内积 $\langle u, v\rangle = u^\dagger v$，不要求归一化或非零），循环巴格曼迹恒等于相邻交叠连乘与首尾闭合内积之积：

   $$
   \operatorname{bargmann}(\Psi) \;=\; \operatorname{Tr}(R_0 \cdots R_n) \;=\; \left(\prod_{j=0}^{n-1}\langle v_j, v_{j+1}\rangle\right)\langle v_n, v_0\rangle;
   $$

4. **单比特三点巴格曼迹的标量内积与有向体积分解**（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）：对任意实三维向量 $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 \in \mathbb{R}^3$（不要求单位模长；令 $P(\mathbf{r}) = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$），三算子乘积的迹精确分解为成对内积实部与混合积有向体积虚部：

   $$
   \operatorname{tripleBargmann}(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) \;=\; \operatorname{Tr}\bigl(P(\mathbf{r}_1)\,P(\mathbf{r}_2)\,P(\mathbf{r}_3)\bigr) \;=\; \frac{1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1}{4} \;+\; i\,\frac{\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)}{4};
   $$

5. **无理相位步长下圆周轨道平均向哈尔积分的收敛定理**（[`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar)）：对任意无理实数 $\alpha \in \mathbb{R}$（`Irrational α`）、任意初相 $\rho \in \mathbb{R}$ 与单位加群圆周 $\operatorname{AddCircle}(1 : \mathbb{R}) = \mathbb{R}/\mathbb{Z}$ 上的任意连续复值函数 $f$（`Continuous f`），其 $N$ 步离散轨道算术平均在 $N \to \infty$ 时收敛于归一化哈尔概率测度积分（`AddCircle.haarAddCircle`）：

   $$
   \lim_{N \to \infty} \frac{1}{(N : \mathbb{C})} \sum_{i=0}^{N-1} f\bigl((\rho + i\alpha : \operatorname{AddCircle}(1 : \mathbb{R}))\bigr) \;=\; \int_{\operatorname{AddCircle}(1 : \mathbb{R})} f(x)\,d\mu_{\mathrm{Haar}}(x);
   $$

6. **有限循环群子群零化子的特征标正交相消与驻波筛定理**（[`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character)）：设模数 $m \in \mathbb{N}$ 非零（`[NeZero m]`），$H \le \operatorname{ZMod} m$ 为任意加法子群，记标准加法特征标为 $\operatorname{character}(k, x) = \operatorname{stdAddChar}(k \cdot x)$，显式零化子子群为 $\operatorname{annihilator}(H) = \{k \in \operatorname{ZMod} m \mid \forall h \in H,\; \operatorname{character}(k, h) = 1\}$。则对任意点 $x \in \operatorname{ZMod} m$，沿对偶零化子求和在子群外恒等于零、在子群节点上精确相长叠加为零化子阶数：

   $$
   \sum_{k \in \operatorname{annihilator}(H)} \operatorname{character}(k.1, x) \;=\;
   \begin{cases}
   \bigl(\lvert\operatorname{annihilator}(H)\rvert : \mathbb{C}\bigr), & x \in H, \\
   0, & x \notin H;
   \end{cases}
   $$

7. **相位锁定复交叠幅的旋转实振幅因式分解定理**（[`phase_locked_overlap_is_rotated_real`](lean:D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real)）：对任意复数 $\mathrm{phase}, \mathrm{overlap} \in \mathbb{C}$，若基准相位具有单位模长 $\lVert\mathrm{phase}\rVert = 1$ 且复交叠满足共轭锁相条件 $\overline{\mathrm{overlap}} = (\mathrm{phase}^{-1})^2 \cdot \mathrm{overlap}$，则必存在实数振幅 $r \in \mathbb{R}$（可显式取为 $r = \operatorname{Re}(\mathrm{phase}^{-1}\cdot\mathrm{overlap})$）使得

   $$
   \mathrm{overlap} \;=\; \mathrm{phase} \cdot r.
   $$
:::

::: proof
第 1 款至第 4 款直接复用 §34.6 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 已核验的树输运、锚定回路分类与单比特巴格曼链/三点迹恒等式：选定生成树 $T$ 为每个顶点提供基准到达相位 `rootPhase`，每条树外弦边 $e \notin T$ 则代表通向同一顶点的另一条竞争路径，二者拼成的闭合环路和乐构成规范不变的自由相位坐标，并通过 `bargmann_path_product` 与 `triple_bargmann_bloch` 的虚部直接关联弦四面体的有向体积 $\frac{1}{6}\,\mathbf{r}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)$。第 5 款直接引用[第二十四章](ch24-cosine-fixed-points-and-self-reference.md) [@lem-irrational-rotation-equidistribution]：对任意非零整数频模 $q \neq 0$，无理步长使特征标几何级数有界、轨道平均按 $O(N^{-1})$ 坍缩至哈尔积分 $0$，再由平均算子列的 $1$-利普希茨等度连续性与三角多项式稠密性推广至全体连续可观测量。第 6 款直接引用[第十五章](ch15-grover-qft-and-period-finding.md) [@prop-finite-character-cancellation] 与[第三十六章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) [@thm-ch36-quotient-annihilator-and-factorization] 第 2 款：借双射 `annihilatorEquivQuotient H` 将 $\operatorname{annihilator}(H)$ 识别为商群 $(\operatorname{ZMod} m)/H$ 的对偶特征标群，由有限群特征标正交关系立得 $x \notin H$ 时全相消归零、$x \in H$ 时同相累加为 $\lvert\operatorname{annihilator}(H)\rvert$。第 7 款直接引用[第五章](ch05-complex-phase-and-rotors.md) [@prop-phase-locked-overlap]：由 $\lVert\mathrm{phase}\rVert = 1$ 得 $\overline{\mathrm{phase}^{-1}} = \mathrm{phase}$，从而去相位量 $w = \mathrm{phase}^{-1}\cdot\mathrm{overlap}$ 满足自共轭等式 $\overline{w} = \mathrm{phase}\cdot(\mathrm{phase}^{-1})^2\mathrm{overlap} = w$，故虚部恒为零、$w = r \in \mathbb{R}$，左乘 $\mathrm{phase}$ 即得 $\mathrm{overlap} = \mathrm{phase}\cdot r$。完整证明由 Lean 内核检查。
:::

## 34.7.2 路径积分的脱壳还原：圆周相位态密度前推与闭合贝里余弦自洽方程 {#sec-ch34-7-2}

手握上述七条内核锚点，我们现在可以把看似高不可攀的无穷维路径积分，一层层剥开外衣、还原为最透明的一维圆周几何（手工推导 + `MODEL`）。

为什么传统场论一写出路径积分 $\Psi(x) = \int_{\Gamma \to x} \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]}$，就会让人觉得仿佛必须在无穷维空间曲线迷宫里逐条追踪轨迹？那是因为记号里还留着“空间轨道 $\Gamma$”这层尚未脱去的躯壳！既然箴言已经点明**“路径基本的本质是相位积分”**，那么在汇向终点 $x$ 的相干求和里，任何一条候选路径 $\Gamma$ 能够投进加法器的唯一有效荷载，仅仅是它模 $2\pi$ 之后的**终点总相位角** $\Phi[\Gamma] \bmod 2\pi \in [0, 2\pi) \cong S^1$——哪怕两条路径在球面上绕了截然不同的几何弯路，只要它们沉积到 $x$ 点的相位积分模 $2\pi$ 相等，二者在干涉求和账本上就拥有完全相同的相因子 $e^{i\phi}$！

于是，在任意给定正则化路径系综 $\{\Gamma \to x\}$（配备归一化路径权重 $\int_{\Gamma \to x}\mathcal{D}\Gamma = 1$，或有限 $M$ 路等权束 $\frac{1}{M}\sum_{m=0}^{M-1}$）上，我们只需沿相位泛函 $\Phi : \{\Gamma \to x\} \to S^1$ 作一次**测度前推（measure pushforward）**，定义点 $x$ 处的**圆周到达相位态密度（arrival phase-density distribution）**

$$
\rho(x, \phi) \;=\; \int_{\Gamma \to x} \mathcal{D}\Gamma\,\delta_{\bmod 2\pi}\!\bigl(\phi - \Phi[\Gamma]\bigr), \qquad \int_0^{2\pi} \rho(x, \phi)\,d\phi \;=\; 1
$$

（其中 $\delta_{\bmod 2\pi}$ 为单位圆周上的 $2\pi$ 周期狄拉克梳分布）。一瞬间，无穷维路径空间上的泛函求和彻底脱去了外在空间轨迹的空壳，坍缩为单位圆 $U(1) \cong S^1$ 上最纯粹的**一阶傅里叶矩积分**（及其离散 $M$ 路求积实现）：

$$
\Psi(x) \;=\; \int_{\Gamma \to x} \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]} \;=\; \int_0^{2\pi} \rho(x, \phi)\,e^{i\phi}\,d\phi, \qquad \Psi_M(x) \;=\; \frac{1}{M}\sum_{m=0}^{M-1} e^{i\phi_m(x)}.
$$

这幅几何图像简明得令人屏息：点 $x$ 的总路径积分振幅 $\Psi(x) \in \mathbb{C}$，不多不少，正是包裹在 $x$ 上方的**堇紫色相位态密度环 $\rho(x, \phi)$ 在复平面单位圆盘内的几何质心**！特别地，当某一点的到达相位密度关于主锁相角 $\phi_0$ 具有左右镜像对称性 $\rho(x, 2\phi_0 - \phi) = \rho(x, \phi)$ 时，复共轭立即满足 $\overline{\Psi(x)} = e^{-2i\phi_0}\Psi(x) = \bigl((e^{i\phi_0})^{-1}\bigr)^2\Psi(x)$；直接调用 [@thm-ch34-phase-cancellation-and-standing-sieve] 第 7 款 `phase_locked_overlap_is_rotated_real`，横向正弦漂移当场清零，总振幅严格退化为沿主相位轴 $e^{i\phi_0}$ 伸缩的**纯实数驻波振幅** $\Psi(x) = e^{i\phi_0}\,r(x)$（$r(x) \in \mathbb{R}$）！

更进一步，正如 §34.7.1 所指出的，单个复振幅 $\Psi(x)$ 的总辐角 $e^{i\phi_0}$ 仍带着起点与终点参考截面的约定痕迹；要提取彻底不依赖任何截面与坐标的物理驻波存活权重，只需再度祭出[第 31 章 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)的**双向互易公平平方律**，计算模平方强度 $\lvert\Psi(x)\rvert^2 = \Psi(x)\,\overline{\Psi(x)}$（手工推导）：

$$
\begin{aligned}
\lvert\Psi(x)\rvert^2 \;=\; \Psi(x)\,\overline{\Psi(x)} &\;=\; \iint_{\Gamma_1, \Gamma_2 \to x} \mathcal{D}\Gamma_1\,\mathcal{D}\Gamma_2\,\exp\!\Bigl(i\bigl(\Phi[\Gamma_1] - \Phi[\Gamma_2]\bigr)\Bigr) \\
&\;=\; \iint_{\Gamma_1, \Gamma_2 \to x} \mathcal{D}\Gamma_1\,\mathcal{D}\Gamma_2\,\cos\!\Bigl(\gamma_B\bigl(\Gamma_1 \circ \Gamma_2^{-1}\bigr)\Bigr) \;\equiv\; \bigl\langle \cos\gamma_B \bigr\rangle_x.
\end{aligned}
$$

细看这两步等号背后的双重奇迹：

1. **开放来路自动缝合为规范不变闭合环路**：共轭项 $\overline{\Psi(x)}$ 把第二条来路 $\Gamma_2 : x_0 \to x$ 反向倒走为回程 $\Gamma_2^{-1} : x \to x_0$，与第一条去程 $\Gamma_1 : x_0 \to x$ 首尾咬合成一条穿过点 $x$ 的**闭合环路** $\Gamma_1 \circ \Gamma_2^{-1}$；在纯几何和乐扇区中，相位差 $\Phi[\Gamma_1] - \Phi[\Gamma_2] = \gamma_B(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{1}{2}\Omega(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{3}{2}V_{\mathrm{sector}}(\Gamma_1 \circ \Gamma_2^{-1})$ 成为百分之百规范不变的闭合通量；
2. **奇对称正弦虚部在成对互换下精确自毁**：对二重积分（或离散双重和 $\lvert\Psi_M(x)\rvert^2 = \frac{1}{M^2}\sum_{m_1, m_2=0}^{M-1}\cos(\phi_{m_1} - \phi_{m_2})$）作对称路径互换 $(\Gamma_1, \Gamma_2) \leftrightarrow (\Gamma_2, \Gamma_1)$，闭合环路定向反转，奇函数项 $i\sin(\Phi_1 - \Phi_2)$ 变号对消、恒等于零，唯独留下偶对称的**闭合贝里余弦自洽平均值** $\langle\cos\gamma_B\rangle_x \in [0, 1]$！

这条零坐标恒等式 $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$ 把驻波存活的物理判据写到了极致：**空间中一个点 $x$ 能否在全向干涉后留存下来，完全取决于穿过它的所有成对闭合路径回路的贝里相位余弦平均值是否大于零！**

::: {.viz src="standing-wave-volume-sandbox" preset="circle-density-pushforward" height="520"}
**路径积分的圆周态密度脱壳还原：无穷路径塌缩为 $S^1$ 质心矩与闭合贝里余弦 $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$。** 左侧多条球面路径经相位映射前推为右侧单位圆上的堇紫色相位态密度环 $\rho(x, \phi)$：当密度集中在锁相峰附近时，青色圆盘质心矢量 $\Psi(x) = \int_0^{2\pi}\rho(x,\phi)e^{i\phi}\,d\phi$ 逼近单位圆周（锁相共轭对称锚定绿色 `LEAN ✓` `phase_locked_overlap_is_rotated_real`）；双向公平平方后精准等价于成对闭合环路的余弦自洽均值 $\langle\cos\gamma_B\rangle_x$（`MODEL` / 手工推导）。
:::

## 34.7.3 体积的因果倒转：相消即虚空，未抵消的驻波节点凝成体积 {#sec-ch34-7-3}

至此，我们终于抵达箴言后半段那句石破天惊的本体论断——**“体积只是相位积分没有抵消掉的驻波点，因为一个点可以有无数种路径无数种相位积分过来。”** 注意这句话里的因果连接词“**因为**”：为什么“无数种路径、无数种相位积分涌向同一点”，非但没有把所有点都堆满成均质实心块，反而把绝大多数区域掏空成了虚无，只留下孤立或量子化的驻波体积？答案分两步水落石出：

1. **相消即虚空（零体积背景并非“没有路径”，而是万相均布自毁）**：
   考察不满足锁相条件的一般非共振点 $x_{\mathrm{off}}$。正因为通向 $x_{\mathrm{off}}$ 的路径无穷无尽，不同绕行方向与不同曲率张角扫过的扇锥立体角千差万别，前推到单位圆周上的到达相位态密度迅速铺平为各向同性的**均匀哈尔分布** $\rho(x_{\mathrm{off}}, \phi) = \frac{1}{2\pi}$（`MODEL` 假设）。圆盘质心当场归零：

   $$
   \Psi(x_{\mathrm{off}}) \;=\; \int_0^{2\pi} \frac{1}{2\pi}\,e^{i\phi}\,d\phi \;=\; 0 \qquad \Longleftrightarrow \qquad \bigl\langle \cos\gamma_B \bigr\rangle_{x_{\mathrm{off}}} \;=\; 0.
   $$

   在有限 $M$ 条路径组成的离散路径束中，若相邻路径间的相对贝里相位步长为非平凡角 $\Delta\gamma \notin 2\pi\mathbb{Z}$，有限几何级数求和 $\Psi_M = \frac{1}{M}\sum_{m=0}^{M-1} e^{im\Delta\gamma} = \frac{1 - e^{iM\Delta\gamma}}{M(1 - e^{i\Delta\gamma})}$ 直接给出精确的**狄利克雷（Dirichlet）相干核上界**（手工推导）：

   $$
   \lvert\Psi_M\rvert \;=\; C_M(\Delta\gamma) \;=\; \left|\frac{\sin(M\Delta\gamma / 2)}{M\sin(\Delta\gamma / 2)}\right| \;\le\; \frac{1}{M\,\lvert\sin(\Delta\gamma / 2)\rvert} \;\xrightarrow{\;M \to \infty\;}\; 0.
   $$

   而当相位步长与圆周不可公度——例如取黄金分割无理转角 $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1}$（即 $\alpha = \varphi^{-1} \notin \mathbb{Q}$）——[@thm-ch34-phase-cancellation-and-standing-sieve] 第 5 款 `continuous_average_tendsto_haar` 更在零连续统近似下严格保证：轨道算术平均随着路径数 $M \to \infty$ 必然收敛到非平凡特征标的哈尔积分 $\int_{\mathbb{R}/\mathbb{Z}} e^{2\pi i u}\,d\mu_{\mathrm{Haar}}(u) = 0$！这揭示了零背景几何中最深刻的虚空观（`MODEL`）：**“空无一物的零体积虚空”绝不是没有任何路径经过的死地，恰恰相反，它是无穷多条路径、无穷多种相位积分在圆周上均匀散开、彼此反相抵消至零的完美动态寂灭！** 汇聚过来的路径越稠密，非锁相处的品红相量卷曲得越彻底，背景虚空反而被清扫得越纯净！

::: {.viz src="standing-wave-volume-sandbox" preset="void-cancellation" height="520"}
**相消即虚空：无穷非公度相位积分均匀铺满圆周，质心归零化作零体积背景。** 在失谐点 $x_{\mathrm{off}}$ 处增加汇聚路径数 $M$：当相邻路径相位步长取无理黄金角 $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1}$ 或非共振步长时，堇紫色到达相点均匀铺满整圈 $S^1$，品红相量链在复平面内首尾闭合自毁，使 $\lvert\Psi_M\rvert \to 0$、$\langle\cos\gamma_B\rangle_M \to 0$（锚定绿色 `LEAN ✓` `continuous_average_tendsto_haar`）。
:::

2. **双重锁相筛与驻波成体（唯有躲过全向相消的驻波节点才凝结为体积）**：
   既然乱相必归虚空，一个点 $x_*$ 究竟要满足怎样严苛的条件，才能在千军万马的相位冲刷中屹立不倒，成为**“相位积分没有抵消掉的驻波点”**？它必须同时闯过局部与全局**两道锁相筛**（手工推导 + `文献结果` + `MODEL`）：
   - **第一道筛（局部一阶驻相锁相 $\delta\Phi = 0$）**：在每一束局部邻近路径簇内部，无穷小横向形变的一阶相位变分必须归零（$\delta\Phi = 0$，即 §34.6.4 的测地驻相条件），阻止局部邻近路径卷曲成科纽螺线自毁；
   - **第二道筛（全局单值环路量子化 $\gamma_B(\Sigma_{\mathrm{closed}}) \in 2\pi\mathbb{Z}$）**：仅仅局部驻相还远远不够！在闭合弯曲原胞或紧致流形上，从不同拓扑方向（如北侧弧族 $\Gamma_{\mathrm{N}}$ 与南侧绕行弧族 $\Gamma_{\mathrm{S}}$）包抄同一点 $x_*$ 的多束宏观路径还会再次相遇干涉；倘若它们围成的闭合环路或闭合二维曲面 $\Sigma_{\mathrm{closed}}$ 攒下的总相位差落在半整数拍（如 $\Delta\Phi = \pi$），南北两束驻相波照样会在 $x_*$ 点迎头反相湮灭（$e^{i\Phi_{\mathrm{N}}} + e^{i\Phi_{\mathrm{S}}} = 0$）！要让绕行任意圈数的全局路径族同相相长，闭合回程总和乐必须满足严格的**拓扑单值量子化条件** $e^{i\gamma_B(\Sigma_{\mathrm{closed}})} = +1 \Longleftrightarrow \gamma_B(\Sigma_{\mathrm{closed}}) = 2\pi n$（$n \in \mathbb{Z}$）：对整数自旋矢量联络（$\gamma = -\Omega$）这锁定立体角量子 $\Omega = 2\pi n$（扇锥体积 $V_{\mathrm{sector}} = \frac{2\pi}{3}n$）；而在自旋-$\frac{1}{2}$ 霍普夫旋量双覆盖（$\gamma_B = -\frac{1}{2}\Omega$）上，旋量波函数恢复同号 $+1$ 则要求闭合立体角满足 $\Omega = 4\pi n$（对应 `circle_double_cover_history_lift` 转一圈换叶至 $-1$、转两圈 $720^\circ$ 方才同相归位 $+1$；一般自旋-$s$ 闭合球面总通量则遵循狄拉克整性条件 $2s \in \mathbb{Z}$）。在有限离散交换群 $\operatorname{ZMod} m$ 上，这道“合拍即驻波存活、失拍即精确归零”的全或无筛子，正由 [@thm-ch34-phase-cancellation-and-standing-sieve] 第 6 款 `sum_annihilator_character` 给出了零近似内核原型：对偶零化子特征标求和 $\sum_{k \in \operatorname{annihilator}(H)} \operatorname{character}(k.1, x)$ 在非共振点 $x \notin H$ 处**分毫不差地恒等于 $0$**，唯独在满足全局周期锁相的子群驻波节点 $x \in H$ 上挺立起高度为 $\lvert\operatorname{annihilator}(H)\rvert$ 的相长尖峰！

   一旦站上这道反转后的高地回望现代数学物理，四座原本分属不同学科的经典丰碑（均为**文献结果，未在本书形式化**，此处纳入本书 `MODEL` 统一审视）顿时显露出同一个几何底牌：
   - **玻尔—索末菲与科斯坦特—苏里奥（Kostant–Souriau）几何量子化**：经典辛流形 $(M, \omega)$ 并非天然拥有量子态空间；唯有当辛曲率二形式通过全局整性锁相筛 $\frac{1}{2\pi}\oint_{\Sigma_2}\omega \in \mathbb{Z}$ 时，预量子复线丛 $\mathcal{L} \to M$ 上的平行移动才不会因多路径多值干涉而自毁，从而在连续相空间中筛出离散的玻尔—索末菲驻波叶片 $\oint_\gamma p\,dq = 2\pi\hbar\bigl(n + \frac{\mu}{4}\bigr)$；
   - **外尔（Weyl 1912）渐近体积律的右向左倒读**：半经典谱几何著名的外尔定律指出，相空间区域 $\Omega$ 的宏观辛体积与其中容纳的正交驻波本征态数目渐近正比（在 $\hbar = 1$ 自然单位制下）：

     $$
     N_{\mathrm{standing}} \;\sim\; \frac{\mathrm{Vol}_\Omega}{(2\pi)^d} \qquad \Longleftrightarrow \qquad \mathrm{Vol}_\Omega \;\sim\; (2\pi)^d \cdot N_{\mathrm{standing}}.
     $$

     传统教科书总是**从左往右**读它：“因为先有一个体积为 $\mathrm{Vol}_\Omega$ 的盒子，所以里面能塞进 $N_{\mathrm{standing}}$ 个驻波模式”；而本节的本体翻转（`MODEL`）则把等式**从右往左**倒过来读：**根本没有先在的盒子，每一个闯过全向相消筛存活下来的独立驻波节点，本身就撑开并定义了一枚 $(2\pi)^d$ 的基本体积量子——哪里驻波尽数抵消（$N_{\mathrm{standing}} = 0$），哪里体积就恒等于零（$\mathrm{Vol}_\Omega = 0$）！**
   - **庞扎诺—雷吉（Ponzano–Regge 1968）与圈量子引力自旋网络（Rovelli–Smolin 1995）**：在三维离散量子引力配分函数中，底层根本不预设边长与四面体体积，而是对自旋网络边与面上的 $\mathrm{SU}(2)$ 群元作哈尔积分；非几何的乱相自旋构型在哈尔积分下悉数相消归零，唯有满足驻相锁相鞍点条件的表示才涌现出渐近正比于 $\cos\bigl(S_{\mathrm{Regge}} + \frac{\pi}{4}\bigr)/\sqrt{12\pi V}$ 的经典雷吉四面体振幅（$V$ 为四面体体积），而量子化面积与体积谱则出自圈量子引力（Rovelli–Smolin 1995）；
   - **伽柏（Gabor 1948）三维全息光学波前重建成像**：当再现参考波穿过记录着参考波与物波干涉条纹的干板时，凡相位失配之处尽皆相消，唯有与原物光程相位锁定的衍射波前会聚成像，在半空中凭空浮现出具有真实视差与景深的三维立体体像——这正可读作“万路相位积分未抵消处凝结成三维体积”在宏观光学实验室里的直观写照！

::: {.viz src="standing-wave-volume-sandbox" preset="bohr-sommerfeld-quantization" height="520"}
**双重锁相筛与玻尔—索末菲驻波量子化：唯独满足闭合整周期锁相的驻波壳层幸存成体。** 连续调节球面环路包络面积与曲率通量：偏离整周期量子化条件时多圈绕行相位彼此反相抵消，壳层暗灭；一旦闭合通量命中整周期锁相条件（离散原型锚定绿色 `LEAN ✓` `sum_annihilator_character`），青色驻波节点瞬间点亮锁死，按外尔计数律撑开量子化体积壳层（`文献结果` / `MODEL`）。
:::

## 34.7.4 本体翻转对照总表与“路径越密、虚空越净、晶核越清”反差实验 {#sec-ch34-7-4}

我们将这场从“先验体积容器”向“相位积分驻波成体”的本体论大翻转，浓缩为下述五维对照总表：

| 结构要素 | 传统“容器先行”图景 | 零背景“驻波成体”翻转图景（`MODEL`） | 形式化锚点与定量判据 |
| :--- | :--- | :--- | :--- |
| **1. 基点 $x$ 的地位** | 预先存在于欧氏/黎曼容器中的实心几何点 | 公平平方抹去纤维后的商等价类空壳，承载全向到达相位丛 $\mathcal{F}(x)$ | `selected_tree_transport`、`anchored_phase_classification` |
| **2. 路径积分的本质** | 粒子在现成空间舞台上遍历几何轨迹的求和 | 路径即相位积分泛函 $\Gamma \mapsto e^{i\Phi[\Gamma]}$；测度前推还原为单位圆 $S^1$ 一阶傅里叶质心矩 | $\Psi(x) = \int_0^{2\pi}\rho(x,\phi)e^{i\phi}\,d\phi$，`phase_locked_overlap_is_rotated_real` |
| **3. 虚空（零体积区）** | 没有任何物质或路径踏足的“空盒子” | 无数条来路相位在 $S^1$ 上均匀散开、彼此反相自毁的动态相消区 | $\rho = \frac{1}{2\pi} \implies \Psi = 0$，$\langle\cos\gamma_B\rangle_x = 0$，`continuous_average_tendsto_haar` |
| **4. 涌现体积的本质** | 先验给定的连续度规测度 $\iiint dV$ | 闯过局部驻相 $\delta\Phi = 0$ 与全局整周期锁相 $\gamma_B \in 2\pi\mathbb{Z}$ 未被抵消的驻波节点计数 | $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x > 0$，`sum_annihilator_character`，$\mathrm{Vol}_\Omega \sim (2\pi)^d N_{\mathrm{standing}}$ |
| **5. 加密路径束 $M \to \infty$** | 路径越多，似乎越把空间涂抹得拥挤不堪 | **路径越密，失谐背景按 $O(M^{-2})$ 清扫得越黑净，锁相驻波晶核反而越锋利清晰** | 失谐处 $\lvert C_M\rvert^2 \le \bigl(M\lvert\sin\frac{\Delta\gamma}{2}\rvert\bigr)^{-2} \to 0$，驻波核 $\lvert C_M(0)\rvert^2 \equiv 1$ |

表中第 5 行给出了整节最具视觉冲击力的反直觉预言——**“路径越密，虚空越净，体积晶核越清”**。当汇向各点的采样路径数仅为稀疏的 $M = 3$ 时，失谐点上的三支相量尚未充分抵消（残余振幅模长仍在 $0.11 \sim 0.16$ 附近徘徊），整个场域笼罩在一层混沌灰雾之中，看不清哪里是体、哪里是空；而当我们把汇聚到每一点的路径密度一路推高至 $M = 8 \to 16 \to 32 \to 64$ 时，奇迹发生了：**涌入每一点的路径翻了二十多倍，空间非但没有变得更拥挤，广袤的非共振区域反而因相量环精密闭合而褪尽残影、化作澄澈漆黑的零体积虚空，唯有满足双重锁相条件的青色驻波节点保持 $\lvert\Psi_M\rvert^2 = 1$ 分毫无损，在虚空中央浮现出一座棱角分明的三维驻波体积晶格！**

::: {.viz src="standing-wave-volume-sandbox" preset="standing-volume-emergence" height="520"}
**路径密度扫描反差实验（$M = 3 \to 64$）：来路越稠密，背景相消越净，未抵消的青色驻波点越凝聚成清晰三维体积。** 拖动琥珀色路径束密度滑块从 $M = 3$ 推向 $M = 64$：稀疏路径下的背景杂散迷雾按狄利克雷平方律 $O(M^{-2})$ 迅速坍缩为纯净虚空，而满足闭合贝里余弦锁相 $\langle\cos\gamma_B\rangle_M = 1$ 的青色驻波节点毫发无损，从纯相位积分中直接雕刻出三维立体晶核（`NUM` / `MODEL`）。
:::

::: {.example #ex-ch34-standing-wave-density-sweep-benchmark title="路径束密度扫描狄利克雷相消与 ZMod 12 零化子驻波筛基准算例（手工推导与数值核验）"}
我们将本节的连续相位密度相消律与离散有限群驻波筛汇集为两组可独立复算的精确基准：

1. **五档路径束密度 $M \in \{3, 8, 16, 32, 64\}$ 下的驻波核 vs. 失谐虚空对比**：对含 $M$ 条等权到达路径、相邻相对贝里相位步长为 $\Delta\gamma$ 的路径束，其圆周质心模长具有精确闭式解

   $$
   \lvert C_M(\Delta\gamma)\rvert \;=\; \left|\frac{1}{M}\sum_{m=0}^{M-1} e^{im\Delta\gamma}\right| \;=\; \left|\frac{\sin(M\Delta\gamma / 2)}{M\sin(\Delta\gamma / 2)}\right| \qquad (\Delta\gamma \notin 2\pi\mathbb{Z}),
   $$

   且双向公平平方后的闭合回路余弦自洽密度恒等于 $\langle\cos\gamma_B\rangle_M = \frac{1}{M^2}\sum_{m_1, m_2=0}^{M-1}\cos\bigl((m_1 - m_2)\Delta\gamma\bigr) = \lvert C_M(\Delta\gamma)\rvert^2$。对比三类典型点位——（i）**锁相驻波核节点** $\Delta\gamma = 0$（或 $2\pi$）；（ii）**一般失谐点** $\Delta\gamma_{\mathrm{off}} = 0.73\pi \approx 2.293363\;\mathrm{rad}$（$131.400^\circ$）；以及（iii）**黄金无理步长虚空点** $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1} \approx 3.883222\;\mathrm{rad}$（$222.492^\circ$，其互补黄金角 $2\pi\varphi^{-2} \approx 2.399963\;\mathrm{rad} \approx 137.508^\circ$ 给出完全相同的模长与余弦均值，且因 $\varphi^{-1} \notin \mathbb{Q}$ 严格服从 `continuous_average_tendsto_haar`）。下表将振幅模长 $\lvert C_M\rvert$ 四舍五入至小数点后 $4$ 位，将闭合余弦密度 $\langle\cos\gamma_B\rangle_M = \lvert C_M\rvert^2$ 四舍五入至小数点后 $6$ 位以完整保留 $O(M^{-2})$ 压制精度：

| 路径数 $M$ | 驻波核 $\lvert C_M(0)\rvert$ | 驻波核 $\langle\cos\gamma_B\rangle_M$ | 失谐点 $\lvert C_M(0.73\pi)\rvert$ | 失谐点 $\langle\cos\gamma_B\rangle_M$ | 黄金虚空 $\lvert C_M(2\pi\varphi^{-1})\rvert$ | 黄金虚空 $\langle\cos\gamma_B\rangle_M$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **$3$** | $1.0000$ | $1.000000$ | $0.1075$ | $0.011565$ | $0.1582$ | $0.025042$ |
| **$8$** | $1.0000$ | $1.000000$ | $0.0341$ | $0.001163$ | $0.0234$ | $0.000546$ |
| **$16$** | $1.0000$ | $1.000000$ | $0.0330$ | $0.001091$ | $0.0230$ | $0.000529$ |
| **$32$** | $1.0000$ | $1.000000$ | $0.0290$ | $0.000838$ | $0.0216$ | $0.000467$ |
| **$64$** | $1.0000$ | $1.000000$ | $0.0155$ | $0.000241$ | $0.0165$ | $0.000273$ |

   可以看到：当 $M$ 从 $3$ 加密至 $64$ 时，锁相驻波核始终稳守 $\langle\cos\gamma_B\rangle_{64} = 1.000000$，而失谐点与黄金无理虚空点的存活强度则双双跌破 $3 \times 10^{-4}$（振幅模长严格受包络上界 $\bigl(64\lvert\sin(\Delta\gamma/2)\rvert\bigr)^{-1}$ 约束，两处上界分别为 $0.0171$ 与 $0.0168$），驻波核与虚空背景之间的信噪反差高达 $3600 : 1$ 以上！

2. **有限循环群 $\operatorname{ZMod} 12$ 上的零化子驻波正交筛精确核验（锚定 `sum_annihilator_character`）**：取模数 $m = 12$ 及阶数为 $\lvert H\rvert = 4$ 的共振周期子群 $H = \{0, 3, 6, 9\} \le \operatorname{ZMod} 12$。频模 $k \in \operatorname{ZMod} 12$ 属于显式零化子 $\operatorname{annihilator}(H)$ 当且仅当对一切 $h \in H$ 满足 $e^{2\pi i k h / 12} = 1 \Longleftrightarrow 3k \equiv 0 \pmod{12}$，即精确筛出 $3$ 个对偶驻波频模 $\operatorname{annihilator}(H) = \{0, 4, 8\}$（满足互补基数积 $\lvert H\rvert \cdot \lvert\operatorname{annihilator}(H)\rvert = 4 \times 3 = 12$）。对任意点 $x \in \operatorname{ZMod} 12$ 计算三路特征标叠加

   $$
   S(x) \;=\; \sum_{k \in \{0, 4, 8\}} e^{2\pi i k x / 12} \;=\; 1 + e^{2\pi i x / 3} + e^{4\pi i x / 3} :
   $$

   - 在 $4$ 个锁相驻波节点 $x \in H = \{0, 3, 6, 9\}$ 处，$e^{2\pi i x / 3} = 1$，三路相因子同向排开，精确叠加为 $S(x) = 1 + 1 + 1 = 3 = \lvert\operatorname{annihilator}(H)\rvert$；
   - 在其余全部 $8$ 个非共振点 $x \in \{1, 2, 4, 5, 7, 8, 10, 11\} = (\operatorname{ZMod} 12) \setminus H$ 处，三次单位根精确闭合为正三角形 $1 + \omega + \omega^2 = 0$（$\omega = e^{\pm 2\pi i / 3}$），给出**零误差全相消** $S(x) = 0$！$8$ 处绝对虚空烘托出 $4$ 枚高度为 $3$ 的离散驻波体积核。
:::

::: {.remark #rem-ch34-geometric-quantization-weyl-spinfoam-literature title="几何量子化、外尔渐近体积律、庞扎诺—雷吉自旋泡沫与全息驻波文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节严守内核验证定理、经典数学物理文献与本书本体论翻转模型之间的三层边界：

1. **玻尔—索末菲条件、几何量子化与外尔渐近体积律经典文献**：闭合回路相位积分量子化条件肇始于 N. Bohr（*Phil. Mag.* **26**, 1, 1913）与 A. Sommerfeld（*Ann. Phys.* **51**, 1, 1916），焦散面马斯洛夫（Maslov）指标修正出自 J. B. Keller（*Ann. Phys.* **4**, 180, 1958）与 V. P. Maslov（1965）；辛流形预量子复线丛存在性的整上同调判据 $\frac{1}{2\pi}[\omega] \in H^2(M, \mathbb{Z})$ 由 B. Kostant（*Lecture Notes in Math.* **170**, 87, 1970）与 J.-M. Souriau（*Structure des systèmes dynamiques*, Dunod, 1970）独立奠定；本征驻波态计数与相空间辛体积的渐近正比定律 $N_{\mathrm{standing}} \sim (2\pi)^{-d}\mathrm{Vol}_\Omega$ 出自 H. Weyl（*Math. Ann.* **71**, 441, 1912）；
2. **离散自旋泡沫量子引力体积涌现与三维全息波前重构文献**：由 $\mathrm{SU}(2)$ 表示维格纳 `{6j}` 符号的驻相鞍点渐近涌现三维欧氏四面体雷吉作用量与体积的发现出自 G. Ponzano & T. Regge（*Spectroscopic and Group Theoretical Methods in Physics*, North-Holland, 1, 1968），面积与体积算符离散谱及自旋泡沫路径求和形式体系见 C. Rovelli & L. Smolin（*Nucl. Phys. B* **442**, 593, 1995）与 J. C. Baez（*Class. Quantum Grav.* **15**, 1827, 1998）；相干波前全向干涉在自由空间重构三维体像的原理出自 D. Gabor（*Nature* **161**, 777, 1948）；
3. **本书内核验证锚点（`LEAN ✓`）与本体翻转模型（`MODEL`）**：命名生成树相位输运、有限图锚定基本回路与开放路径相位完备分类、离散巴格曼路径乘积、单比特三点布洛赫有向体积迹、无理旋转连续可观测量向哈尔积分收敛、有限循环群零化子特征标正交筛及锁相复交叠实振幅分解等七项代数与拓扑核心，已由 [@thm-ch34-phase-cancellation-and-standing-sieve] 在 Lean 4 内核中严格验证；圆周相位态密度前推一阶矩、闭合贝里余弦恒等式 $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$ 与狄利克雷核衰减上界属初等分析手工推导；而将外尔定律与几何相位因果倒转、把三维空间体积诠释为全向相位积分抵消后幸存驻波节点的统一图景则属本书理论模型（`MODEL`），不声称已给出四维洛伦兹连续统引力路径积分测度的收敛性证明，亦不把有限群 `ZMod m` 正交筛直接等同于无穷维流形上的完整科斯坦特—苏里奥量子化定理。
:::

至此，我们在单一切片上由正交简并盲区反演出观察者站位（§34.1–§34.3），以“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$（§34.4–§34.5），又在动态历史与本体生成上看到扇锥体积把来路写进霍普夫纤维（§34.6），而万千来路的相位积分在全向干涉中清扫乱相虚空、把未抵消的锁相驻波节点凝聚成宏观可感的三维体积（§34.7）。然而，把 §34.6 与 §34.7 合在一起凝视，一道更锋利的终极追问便破土而出：既然宏观路径是一步步积分出来的，宏观相位也是一段段积分出来的，而空间的点与体块既是路径/相位积分抵消后的驻波，同时又是无数个相邻圆弧体拼接抵消后的残余——那么当我们把镜头一直推回尚未发生多胞抵消的**单个极小圆弧体**（$N = 1$）时，这枚不可再分的几何原子究竟是**极小相位**、**极小路径**，还是**点的梯度**？先在下方 `STANDING//VOLUME` 完整交互实验室中亲手拨动路径密度滑块 $M = 3 \to 64$、见证驻波晶核从相位迷雾中破空凝结，随后进入 §34.8 揭开极小尺度上的“四位一体”克利福德单胞与多胞抵消分化定律：

::: {.viz src="standing-wave-volume-sandbox" height="640"}
**相位积分驻波成体：完整交互实验室（`STANDING//VOLUME`）。** 自由切换“一点多相—圆周前推—相消虚空—锁相量子化—驻波成体”五张实验卡，拖动琥珀色探测点 $x$、路径束密度 $M \in [3, 64]$ 与相位失谐/通量滑块，同屏观察极小弧面体上的多路到达相位簇、单位圆周堇紫色相位态密度环 $\rho(x,\phi)$ 的质心矩 $\Psi(x)$、非共振黄金角相消虚空以及由闭合贝里余弦锁相 $\langle\cos\gamma_B\rangle_x = 1$ 凝聚浮现的青色三维驻波体积晶核；绿色 `LEAN ✓` 框严格对应七条冻结内核定理。
:::

---
