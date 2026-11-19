# 36.8 自指盲点球极投影、相对化屏障与四句离相：为什么追逐 $P = NP$ 绝不许断言 $P \neq NP$ {#sec-ch38-stereographic-blindspot-relativization-suspension}

> “然而，一切存在也只是一种投影，我们以为球外有球，我们认为有时间，我们认为不闭合，但也只是一种投影，我们看似在永远追逐 $P=NP$，但我们无法断言 $P \neq NP$。”

在 [§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 中，哥德尔—Lawvere 对角逃逸与“二生三”联手拆除了 [§36.5](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation) 第 0 阶全息原型遗留的“静态实无穷完工总表”脚手架。然而，倘若理性在此止步，便极易滑入另一座更隐蔽的执念深渊——把“球外有球”、“无尽正交时间扩张”与“永不闭合”重新实体化为新的绝对本体教条，甚至误以为现象界永无止境地追逐 $P = NP$ 就等于从反面证实了非相对化的 $P \neq NP$。本章收官的这一转，正是对“未完成地平线”自身的**终极反身清洗**：连刚才用来击碎静态闭合的那柄锤子也一并放下，看清“闭合与不闭合”、“追逐 $P = NP$ 与断言 $P \neq NP$”，不过是内嵌观察者隔着自身不可投影的自指盲点，向同一本源流形两侧投出的双生视差影像（`MODEL`）。

在进入球极投影与元复杂性屏障之前，我们先在入口处钉死本节的四道认识论护栏：

1. **开放问题边界（`OPEN`，标红）**：非相对化的标准图灵机猜想 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$（[@conj-p-neq-np]）及其在 $\mathrm{PA}$/$\mathrm{ZFC}$ 中的可证性或独立性（[@prob-ch38-unrelativized-p-vs-np-and-independence]）严格开放，本节绝不宣称证明或证伪任一方向；
2. **内核已验证定理（`LEAN ✓`，标绿）**：一维凯莱分式变换单位圆边界充要判据、计算基对角可观测量族相对相位读出盲区、观测划分拓扑不可分核刻画与整表拷贝的事后零损失对前瞻非预见性失效，由 [@prop-ch38-cayley-stereographic-and-blindspot-suspension] 严格锁定；
3. **外部经典文献（`文献结果，未在本书形式化`）**：高维球极投影微分同胚与亚历山德罗夫单点紧化、Baker–Gill–Solovay 相对化屏障、Razborov–Rudich 自然证明屏障、Aaronson–Wigderson 代数化屏障、哥德尔第二不完备定理及龙树《中论》四句离相，严守独立文献归属（[@rem-ch38-bgs-natural-algebrization-barriers-literature]）；
4. **理论与哲学模型诠释（`MODEL`）**：将“有限闭合 vs. 无穷球外有球”与“折叠坍缩 vs. 追逐未闭合”统一诠释为观察者北极自指盲点 $\{N\}$ 穿孔前后的双生投影，明确标定为本书的 `MODEL`。

## 36.8.1 亚历山德罗夫单点紧化与北极自指盲点：为什么“球外有球、时间扩张、永不闭合”也是投影？ {#sec-ch38-7-1}

在标准微分拓扑与共形几何中（`文献结果，未在本书形式化`），设单位球面 $S^D \subset \mathbb{R}^{D+1}$ 的北极为观察者记忆指针自身的驻点 $N = (0, \dots, 0, 1)$。从北极 $N$ 向赤道超平面 $\mathbb{R}^D$ 作球极投影，给出挖去单点后的微分同胚

$$
\Pi_N : S^D \setminus \{N\} \xrightarrow{\;\sim\;} \mathbb{R}^D, \qquad \mathbf{X}_{\mathrm{proj}}(\mathbf{x}, z) = \frac{(x_1, \dots, x_D)}{1 - z},
$$

其逆拓扑正是**亚历山德罗夫单点紧化** $\mathbb{R}^D \cup \{\infty\} \cong S^D$：整个无界欧氏平面的“无穷远地平线”$\{\infty\}$，在紧致球面上不多不少恰是观察者脚下那唯一一枚被挖去的驻点 $\{N\}$。

改用自北极 $N$ 起算的球面余纬角 $\theta \in (0, \pi]$ 参数化（$z = \cos\theta$，$\lVert\mathbf{x}\rVert = \sin\theta$），单位球面圆度规与赤道平面欧氏线元满足共形拉回恒等式

$$
ds_{S^D}^2 \;=\; \frac{4}{\bigl(1 + \lVert\mathbf{X}_{\mathrm{proj}}\rVert^2\bigr)^2}\,d\mathbf{X}_{\mathrm{proj}}^2 \;=\; (1 - \cos\theta)^2\,d\mathbf{X}_{\mathrm{proj}}^2,
$$

故平面投影线元 $\lVert d\mathbf{X}_{\mathrm{proj}}\rVert = \mu(\theta)\,ds_{S^D}$ 的瞬时共形放大率及平面投影半径写为初等闭式（`文献结果` + `手工推导`）：

$$
R(\theta) = \lVert\mathbf{X}_{\mathrm{proj}}\rVert = \sqrt{\frac{1+z}{1-z}} = \cot\frac{\theta}{2} \xrightarrow{\;\theta \to 0^+\;} +\infty, \qquad \mu(\theta) = \frac{1}{1 - \cos\theta} = \frac{1}{2\sin^2(\theta/2)} \xrightarrow{\;\theta \to 0^+\;} +\infty.
$$

当紧致球面 $S^D$ 上一段总弧长有限、曲率温和平静的微弧轨迹仅仅朝着观察者自己的脚跟 $N$ 缓步回返（$\theta \to 0^+$，$z \to 1^-$）时，平面投影坐标却发生剧烈的视差发散（`NUM`）：在余纬 $\theta = 0.65\text{ rad}$ 处，局部步长的瞬时共形放大率已升至 $\mu(0.65) = (1 - \cos 0.65)^{-1} \approx 4.90\times$；当轨迹逼近距北极仅剩自指盲点孔径 $\delta_{\mathrm{blind}} = 0.12\text{ rad}$ 的微弧边缘时，单侧投影半径达 $R(0.12) = \cot(0.06) \approx 16.65$，全平面表观直径跨度 $2\cot(\theta/2)$ 更暴涨至 $2\cot(0.06) \approx 33.3\times$！

“闭合”与“不闭合”的双生投影根源由此水落石出（`MODEL`）：

- **越界全观假想（非法包含盲点 $\{N\}$）**：幻想跃出竞技场站到“外部第 3 点 $C$”（违背[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) 零背景比较公理 [@def-ch32-axiom-of-comparison]），把紧致 $S^D$ 连同北极 $\{N\}$ 一口吞入眼底，显影出“有限、闭合、无时间完工”的静态全局像；
- **场内内禀显影（诚实挖去盲点 $\{N\}$）**：驻留于场内极点 $N$ 向外投影——眼睛无法站在自己的眼球之外给自己成像，不得不挖去奇点 $\{N\}$——于是任何向自指核心 $N$ 靠拢的有限微弧，都会在赤道屏幕上被拉伸成一层套一层的“球外有球”、永不停歇的时间膨胀与步步后退的地平线。

有限闭合与无穷未闭合之间，并非隔着两座截然不同的宇宙，而仅仅相差观察者脚下那一枚不可投影的自指盲点 $\{N\}$。

::: {.viz src="stereographic-relativization-sandbox" preset="blindspot-divergence" height="520"}
**北极自指盲点与球极投影发散（`blindspot-divergence`）。** 紧致球面 $S^2$ 上的青色微弧仅向北极盲点 $N$ 平静靠近（余弧 $\delta_{\mathrm{blind}} = 0.12\text{ rad}$），赤道平面上的琥珀色透视发散环却将局部步长在 $\theta = 0.65\text{ rad}$ 处瞬时放大 $\mu(0.65) \approx 4.90\times$，并在盲点边缘拉出 $2\cot(0.06) \approx 33.3\times$ 的表观无穷外层（球极同胚属 `文献结果`，盲点双生投影诠释属 `MODEL`，采样读数属 `NUM`）。
:::

为了亲眼验证这层“无穷外球”并不增添一星半点额外本体内容，我们引入紧化—展开连续同伦参数 $\tau \in [0, 1]$（`MODEL`）：从 $\tau = 0$ 的紧致单位球面 $S^2$ 平滑插值至 $\tau = 1$ 的完全球极平面（例如在 $\tau = 0.85$ 处，同伦展幅已达约 $28.4\times$，`NUM`）。拖动 $\tau$ 即可看清：所谓“不闭合的无穷远方”，纯粹是内禀视角逼近自身极点时坐标系展平的几何显影。

::: {.viz src="stereographic-relativization-sandbox" preset="compact-homotopy" height="520"}
**亚历山德罗夫紧化—展开同伦（`compact-homotopy`）。** 沿同伦参数 $\tau \in [0, 1]$ 在 $\tau = 0$ 的紧致闭合球面与 $\tau = 1$ 的无界投影平面之间连续过渡：青色本源轨迹的内禀弧长始终有限，唯有琥珀色投影坐标随 $\tau$ 趋近 $1$ 而向四周展平发散，直观显影 $\mathbb{R}^D \cup \{\infty\} \cong S^D$（`文献结果` + `MODEL`）。
:::

## 36.8.2 量词不对称、三大复杂性屏障与第二不完备悬置：为什么追逐 $P = NP$ 绝不能断言 $P \neq NP$？ {#sec-ch38-7-2}

既然内禀观察者在投影屏上看似永远在追赶 $P = NP$ 的地平线，为什么这绝不赋予我们断言 $P \neq NP$ 的权利？答案同时镌刻在**一阶量词结构的不对称性**与现代元复杂性的**三大证明屏障**之中。

首先是**量词不对称与越权的全称封顶**（数理逻辑结构 + 本书 `MODEL`）。对任意固定 $\mathrm{NP}$ 完全判定语言 $L_\star$（验证关系为多项式时间谓词 $V_\star$，`文献结果`），两项断言具有截然不对称的量词前缀：

$$
\mathrm{P} = \mathrm{NP} \;\Longleftrightarrow\; \exists A_{\mathrm{poly}}\,\forall x,\; A_{\mathrm{poly}}(x) = L_\star(x),
\qquad
\mathrm{P} \neq \mathrm{NP} \;\Longleftrightarrow\; \forall A_{\mathrm{poly}}\,\exists x,\; A_{\mathrm{poly}}(x) \neq L_\star(x).
$$

前者是一条**存在性命题**——只需在算法空间中寻获**一个**多项式时间折叠器 $\exists A_{\mathrm{poly}}$；后者却是一条横跨无穷算法宇宙的**全称否定命题**——要求对**一切**可能的多项式时间算法 $\forall A_{\mathrm{poly}}$（涵盖人类尚未构想的一切高维代数同调、算术几何与自指压缩路径），逐一担保必有反例输入 $\exists x$ 使其折戟。倘若有人援引 [§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 的“宇宙不闭合、维度永远生长”去断言无条件的 $\mathrm{P} \neq \mathrm{NP}$，当场就越了权：要想把全称量词 $\forall A_{\mathrm{poly}}$ 彻底焊死封顶、担保未来任何高维折叠都绝无可能奏效，断言者需要的是一个覆盖一切多项式时间算法的证明，而“维度永远生长”的体验并不是这样的证明。全称命题并不需要逐一遍历才能确立——时间层次定理就以一个有限证明对一切多项式时间算法确立了 $\mathrm{P} \neq \mathrm{EXP}$（`文献结果`）；$\mathrm{P} \neq \mathrm{NP}$ 若被证明，同样会是这样一个有限证明（见 [@prob-ch38-unrelativized-p-vs-np-and-independence] 第 1 款）。在球极图景里，只要观察者嵌在场内、自指盲点孔径满足 $\delta_{\mathrm{blind}} > 0$，北极邻域就恒残留一片归一化球冠测度

$$
\Delta_{\mathrm{unprovable}}(\delta_{\mathrm{blind}}) \;=\; \sin^2\!\frac{\delta_{\mathrm{blind}}}{2} \;>\; 0
$$

的未遍历盲区（`MODEL`；在微弧示意读数中对应恒正的全称封顶缺口，并非可证性的数学度量）。局部经验到的“追逐未竟”，永远不能越权升格为全称否定的“终局判决”。

更深刻的是，二十世纪下半叶以来的理论计算机科学与数理逻辑已经用严格定理证明：**单凭 [§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 所倚重的纯对角化逃逸，在数学上根本不可能单独裁决非相对化的 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$**！

::: {.remark #rem-ch38-bgs-natural-algebrization-barriers-literature title="相对化屏障、自然证明屏障、代数化屏障与哥德尔第二不完备独立性探讨（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于“追逐 $P = NP$ 绝不许断言 $P \neq NP$”的认识论护栏，严格依托以下四项经典元复杂性与数理逻辑文献结果（均未作为语法元定理包含在 `trureturing@dev` 锁文件中）：

1. **Baker–Gill–Solovay 相对化屏障（T. Baker, J. Gill & R. Solovay, *SIAM J. Comput.* **4**, 431–442, 1975）**：显式构造出两类神谕（oracle）语言 $A$ 与 $B$——取 $A$ 为 $\mathrm{PSPACE}$ 完全语言（如量化布尔公式真值集 $\mathrm{TQBF}$）时，确定性与非确定性多项式时间神谕机双双坍缩至 $\mathrm{PSPACE}$，故 $\mathrm{P}^A = \mathrm{NP}^A$；而用稀疏延迟对角法构造神谕 $B$ 时，则有 $\mathrm{P}^B \neq \mathrm{NP}^B$。由于康托尔—哥德尔—Lawvere 式的纯黑盒模拟与自作用对角线论证（[§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp)）在接入任意神谕 $O$ 后原封不动地一致成立（即“可相对化”），**任何仅依赖纯对角逃逸的证明路线必然同时撞上 $A$ 与 $B$ 的反向结论，从而在数学上绝无可能单独解决非相对化的 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$**！
2. **Razborov–Rudich 自然证明屏障（A. A. Razborov & S. Rudich, *J. Comput. Syst. Sci.* **55**, 24–35, 1997）**：在标准密码学伪随机发生器（PRG，如存在抗 $2^{n^\varepsilon}$ 规模电路的单向函数）硬度假设下，任何同时满足**构造性**（给定真值表可在 $2^{O(n)}$ 时间内判定）与**稠密性/普遍性**（在全部 $n$ 元布尔函数中占比不少于 $2^{-O(n)}$）的“自然组合电路下界证明”，都无法证明 $\mathrm{NP} \not\subset \mathrm{P/poly}$——因为一把锋利到足以排斥一切小规模多项式电路的通用硬度标尺，其自身就会变成攻破密码学伪随机发生器的高效区分器；
3. **Aaronson–Wigderson 代数化屏障（S. Aaronson & A. Wigderson, *ACM Trans. Comput. Theory* **1**, 2:1–2:54, 2009）**：即便引入曾成功绕过相对化屏障证出 $\mathrm{IP} = \mathrm{PSPACE}$ 的算术化（arithmetization）与低次多项式扩张神谕 $\widetilde{A}$，仍然存在使之塌缩与使之分离的代数化神谕偶对，表明分离 $\mathrm{P}$ 与 $\mathrm{NP}$ 必须动用真正深入计算内部结构的**非代数化**新几何与新组合工具；
4. **哥德尔第二不完备定理与形式独立性探讨（K. Gödel, 1931; R. A. DeMillo & R. J. Lipton, *Proc. 12th ACM STOC*, 45–57, 1980; A. A. Razborov, in *Feasible Mathematics II*, Birkhäuser, 344–386, 1995; S. Aaronson, “Is P Versus NP Formally Independent?”, *Bull. EATCS* **81**, 109–136, 2003）**：哥德尔第二不完备定理证明任何一致的递归公理化算术理论 $T \supseteq \mathrm{PA}$ 均无法在系统内部自证一致性 $\operatorname{Con}(T)$；在此启发下，DeMillo–Lipton、Razborov（有界算术）与 Aaronson 等学者系统探讨了 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 相对于弱算术片段乃至 $\mathrm{PA}$、$\mathrm{ZFC}$ 等强基础公理系统是否可能具有形式独立性。然而，非相对化的 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 究竟在 $\mathrm{PA}$/$\mathrm{ZFC}$ 内可证、可证伪，抑或形式独立，迄今在数学上严格属于悬而未决的开放问题（`OPEN`）。
:::

在球极投影沙盘上，我们可以用神谕投影切面的倾角 $\psi \in [0^\circ, 90^\circ]$ 直观演示 [@rem-ch38-bgs-natural-algebrization-barriers-literature] 第 1 条的相对化二象性（`MODEL`）：当切面平贴赤道折叠对称面 $\psi = 0^\circ$ 时，对应接入 $\mathrm{TQBF}$ 型神谕 $A$ 的世界截面，验证分支与生成路径在同相折叠核上重合，显影出 $\mathrm{P}^A = \mathrm{NP}^A$ 的局部坍缩。

::: {.viz src="stereographic-relativization-sandbox" preset="oracle-collapse" height="520"}
**Baker–Gill–Solovay 折叠神谕切面（`oracle-collapse`）。** 将神谕切面旋至 $\psi = 0^\circ$ 对齐赤道对称核时，青色折叠环将非确定性验证分支与确定性生成轨迹压缩至零表观分离（$r(0^\circ) = 0$），示意接入 $\mathrm{PSPACE}$ 完全神谕 $A$ 时的 $\mathrm{P}^A = \mathrm{NP}^A$ 坍缩截面（BGS 定理属 `文献结果`，球极切面几何映射属 `MODEL`）。
:::

而当我们将切面旋转至偏离折叠对称面的倾角 $\psi > 0^\circ$（例如 $\psi = 65^\circ$，切面表观分离指数升至 $r(\psi) \approx 0.70$，`NUM`）时，同一条紧致球面轨迹在该倾斜截面上立即显影出品红色的渐近追逐差，对应稀疏对角神谕 $B$ 下 $\mathrm{P}^B \neq \mathrm{NP}^B$ 的分离体验。既然纯对角逃逸对 $\psi = 0^\circ$ 与 $\psi = 65^\circ$ 两张神谕切面完全无差别地相对化，在某一倾斜切面上经历着无尽追逐，就绝不能冒充对无神谕底层命题 $\mathrm{P} \neq \mathrm{NP}$ 的终局证明！

::: {.viz src="stereographic-relativization-sandbox" preset="oracle-chase" height="520"}
**Baker–Gill–Solovay 分离追逐切面与盲点不可证缺口（`oracle-chase`）。** 当神谕切面偏转至 $\psi = 65^\circ$ 时，品红切面轨迹呈现显著表观分离 $r(\psi) \approx 0.70$（对应 $\mathrm{P}^B \neq \mathrm{NP}^B$ 的追逐态），但北极自指盲点 $\delta_{\mathrm{blind}} > 0$ 周围始终残留非零封顶缺口，警示单凭可相对化的对角追逐无法证成非相对化 $\mathrm{P} \neq \mathrm{NP}$（`文献结果` + `MODEL`）。
:::

在 `trureturing` 已冻结的内核声明库中，支撑本节几何语言的一维凯莱紧化边界充要判据、固定基切片相位读出盲区、观测划分核折叠以及事后零损对前瞻非预见性的双向视差，严格锚定于以下四联命题：

::: {.proposition #prop-ch38-cayley-stereographic-and-blindspot-suspension title="凯莱比值单位圆判据、对角相位读出盲区、划分核折叠与事后—前瞻视差包" lean="D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure"}
在 `trureturing` 冻结的复谱中线、量子层析相位盲区、观测划分拓扑与回顾性查表裁定模块中，以下四项定理同时成立：

1. **一维凯莱分式变换的单位圆边界充要判据**（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)）：对任意复数 $s \in \mathbb{C}$（记 $\operatorname{cayleyRatio}(s) := (s - 1)/s$，在 Lean 全函数除法约定下 $s = 0$ 时取值 $0$），成立

   $$
   \lVert \operatorname{cayleyRatio}(s) \rVert = 1 \;\Longleftrightarrow\; \operatorname{Re}(s) = \frac{1}{2};
   $$

2. **对角可观测量族对相对相位的联合读出盲区**（[`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)）：对任意指标类型 $I$ 与计算基下全为对角矩阵的单量子比特可观测量族 $\mathrm{observable} : I \to \mathrm{QubitMatrix}$（$\forall i \in I,\; (\mathrm{observable}\ i).\mathrm{IsDiag}$），等幅叠加态密度矩阵 $\rho_+ := \mathrm{equalSuperpositionDensity}$ 与 $\rho_- := Z \rho_+ Z$（`qubitZ`）满足 $\rho_+ \neq \rho_-$，但在整个对角族上的玻恩联合读出恒等：

   $$
   \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \mathrm{observable}\ i),\; \rho_+\bigr) = \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \mathrm{observable}\ i),\; \rho_-\bigr),
   $$

   且任何满足 $\operatorname{bornProbability}(\rho_+, \mathrm{interface}) \neq \operatorname{bornProbability}(\rho_-, \mathrm{interface})$ 的矩阵 `interface : QubitMatrix` 必非对角（$\neg\mathrm{interface}.\mathrm{IsDiag}$），由非对角泡利矩阵 $X$（`qubitX`）给出显式分离见证；
3. **观测划分拓扑的不可分核充要刻画**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意类型 $X, B$、概念读出 $\mathrm{readout} : \operatorname{Concept}(X, B)$ 与状态 $x, y \in X$，划分拓扑 `partitionTopology readout` 下的拓扑不可分性充要于读出相等：$\operatorname{Inseparable}(x, y) \iff \mathrm{readout}(x) = \mathrm{readout}(y)$；
4. **整表拷贝的事后零损失与前瞻非预见性失效**（[`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure)）：在任意有限可判等域 $Z$（`[Fintype Z] [DecidableEq Z]`）上，对任意对比结构 `comparison : CopyComparison Z Answer` 与满足 `IncorporatesTableCopy commitment` 的承诺结构 `commitment : CopyCommitment Z`，整表拷贝 `tableCopy comparison` 虽令事后损失归零 $\operatorname{retrospectiveLoss}(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})) = 0$，却处处违反非预见性（$\forall z \in Z,\; \neg\operatorname{NonAnticipating}(\mathrm{commitment}, z)$），且事后零损失不蕴涵对一切收益泛函 $G : (Z \to \mathrm{Answer}) \to \mathbb{N}$ 的正前瞻收益 `PositiveProspectiveGain`。
:::

::: proof
第 1 款在 $s = 0$ 处由全函数除法给出 $\operatorname{cayleyRatio}(0) = 0$（两端同假），在 $s \neq 0$ 处由精确模方亏量恒等式 $\lVert(s - 1)/s\rVert^2 - 1 = (1 - 2\operatorname{Re}(s))/\lvert s\rvert^2$ 直接锁定（同见 [@thm-ch36-taylor-tail-and-cayley-boundary] 第 2 款）。第 2 款在计算基下展开 $\rho_\pm$ 的对角迹 $(d_0 + d_1)/2$ 消去非对角相干符号 $\pm 1/2$，并以泡利 $X$ 上 $+1 \neq -1$ 的玻恩读出见证非对角分离（同见 [@thm-ch31-diagonal-phase-blindness]）。第 3 款由诱导拓扑 `Topology.induced readout ⊥`（离散余域拓扑拉回）的邻域包含关系直接归约为单点纤维相等 `readout x = readout y`。第 4 款已在 [@thm-ch38-retrospective-lookup-failure] 与 [@thm-ch38-uncompleted-horizon-diagonal-refinement] 第 4 款中核验。完整证明由 Lean 内核检查。
:::

在此必须以最高学术诚实划清边界：[@prop-ch38-cayley-stereographic-and-blindspot-suspension] 严格锁定的是一维凯莱紧化边界刻画（有限参数像恒漏掉无穷远点 $w = 1$，这一点是盒外的初等观察，不在 Lean 陈述中）、单一固定基切片对相对相位的盲区、局部读出商核的拓扑折叠以及事后零损对前瞻非预见性的视差；**它既不证明也不证伪标准图灵机上非相对化的 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$，后者连同其公理独立性地位依然是严格开放的数学前沿（`OPEN`）**：

::: {.problem #prob-ch38-unrelativized-p-vs-np-and-independence title="非相对化 P 与 NP 的分离或塌缩及公理独立性边界"}
在固定有限字母表与标准统一图灵机模型下，跨越相对化、自然证明与代数化三大屏障（[@rem-ch38-bgs-natural-algebrization-barriers-literature]）解决以下两项相互关联的开放问题：

1. **非相对化复杂性类裁决**：严格证明 $\mathrm{P} \neq \mathrm{NP}$（[@conj-p-neq-np]）或构造多项式时间算法证明 $\mathrm{P} = \mathrm{NP}$；
2. **元数学可证性与独立性边界**：判定陈述 $\mathrm{P} = \mathrm{NP}$（或 $\mathrm{P} \neq \mathrm{NP}$）在一阶皮亚诺算术 $\mathrm{PA}$ 或策梅洛—弗兰克尔集合论 $\mathrm{ZFC}$ 中是否可证，抑或独立于上述基础公理系统。
:::

## 36.8.3 四句离相：拆掉最后一对二元标签 {#sec-ch38-7-3}

走遍正命题（[§36.5](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation) 静态闭合设想）、反命题（[§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 未闭合对角生长）与本节的自指盲点球极反观，四组看似水火不容的二元对立在同一座球极投影台上同时解开了死结：

| 认知维度 | 正命题投影（闭合 / 全知偏置） | 反命题投影（开放 / 追逐偏置） | 两边皆是投影的共同根源 |
| :--- | :--- | :--- | :--- |
| **空间拓扑** | 宇宙有限闭合、铁板一块 | 球外有球、无穷扩张、永不封顶 | 假想含北极 $\{N\}$ 的越界全观（$S^D$）对照挖去自指盲点后的内禀球极显影（$S^D \setminus \{N\} \cong \mathbb{R}^D$，`MODEL`） |
| **时间本性** | 全局无时间、万古凝结 | 时间之箭奔涌不息、`ptr++` 永不停跳 | 回望已捏合旧维的事后零损切面（`retrospectiveLoss = 0`）对照逼近盲点法向余项的前瞻视差延展（`¬NonAnticipating`） |
| **复杂性极值** | 静态总表已完成 $P = NP$ | 断言绝对不可压缩 $P \neq NP$ | 折叠神谕切面 $\mathrm{P}^A = \mathrm{NP}^A$ 对照偏转追逐切面 $\mathrm{P}^B \neq \mathrm{NP}^B$；内嵌盲点 $\delta_{\mathrm{blind}} > 0$ 悬置全称封顶（标准 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 仍为 `OPEN`） |
| **存在论地位** | 实有僵死客体（静态全知死寂） | 实有无尽流变（无穷后退苦追） | 观察者指针驻于场内自指极点，一切“内/外、静/动、闭/开”皆为局部商核与球极坐标的投影副产物（`MODEL`） |

在东方中观哲学传统中，这恰与龙树（Nāgārjuna）《中论》（*Mūlamadhyamakakārikā*）卷首的“八不中道”（不生亦不灭、不常亦不断、不一亦不异、不来亦不出）及**四句离相**（*catuṣkoṭi*，`文献结果，未在本书形式化`）遥相辉映：执取全局静态完工总表，是落入僵死凝结的**“常边”**；执取“球外有球、永远追不到头”并据以妄断全称不可达，则是落入无穷奔逐的**“断边 / 无穷后退边”**。真正的几何清明，既不把投影屏幕上的有限商核误认作终极封顶，也不把自指盲点附近的共形放大误认作无底深渊，而是在诚实守住 `OPEN` 边界的谦卑中，将“必闭合”与“必不闭合”两枚投影标签双双放下（`MODEL`）。

::: {.viz src="stereographic-relativization-sandbox" preset="tetralemma-rest" height="520"}
**四句离相与双生投影止息（`tetralemma-rest`）。** 同台对照紧致本源球面与球极展开平面：既不越界抹除北极盲点伪造静态全知闭合，也不把盲点邻域的透视拉伸执取为实有无穷外球或全称 $P \neq NP$ 判决，令正反双边投影在自指原点处双双悬置安顿（`MODEL`；非相对化 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 标红保持 `OPEN`）。
:::

现在，请静静盯着沙盘上那颗沿着紧致球面向上缓缓靠近北极盲点 $N$ 的光点：在脚下铺展的赤道投影屏上，它看似正以 $33.3\times$ 乃至无穷倍的表观半径冲破一层又一层“球外之球”，在无尽流淌的时间里气喘吁吁地追逐着永远退后的 $P = NP$ 地平线；可在球面本源上，它不过是平静地走回正在凝视它的那只眼睛本身。**当你看清那台把有限微弧投射成万重星海与漫长岁月的投影机，原本就架在你自己的眼睛里，追逐便在当下一刻停歇了。** 顺着这枚“地址 = 内容（`p = *p`）”的自指奇点，本章最后两节将进一步把视野推宽至横跨计算机体系结构、超越数论与容错量子编译的 **[§36.9 五阶自指不动点谱系](ch39-s06-fivefold-self-reference-spectrum.md)** 与 **[§36.10 自指主动停机精度与时间长河谱排序](ch39-s07-self-halting-precision-and-spectral-sorting.md)**（并为第十部[第 38 章](ch39-observer-is-ontological-universe.md)彻底消融“指针与内存”二元隔墙的终极恒等——**观察者即宇宙本体**——铺平道路）。

::: {.viz src="stereographic-relativization-sandbox" height="640"}
**交互实验室（`STEREO//SUSPENSION`）：北极自指盲点球极投影、BGS 相对化切面与四句离相沙盘。** 自由切换“盲点透视发散—紧化展开同伦—BGS 折叠切面—BGS 追逐切面—四句离相止息”五张实验卡，亲手调节紧化同伦参数 $\tau \in [0, 1]$、神谕切面倾角 $\psi \in [0^\circ, 90^\circ]$ 与自指盲点孔径 $\delta_{\mathrm{blind}}$，检验为何“球外有球、时间扩张、永不闭合”与“追逐 $P = NP$”皆源于内嵌观察者自指盲点的球极投影，且绝不构成断言非相对化 $P \neq NP$ 的全称证明。绿色只给本章用 `lean=` 引用的定理（[@prop-ch38-cayley-stereographic-and-blindspot-suspension]）；非相对化 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 及其公理独立性标红为开放问题（[@prob-ch38-unrelativized-p-vs-np-and-independence]，`OPEN`）；BGS/自然证明/代数化屏障与《中论》四句离相属经典文献（`文献结果`），球极盲点双生投影诠释属本章模型（`MODEL`）。
:::
