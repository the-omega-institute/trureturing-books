# 34.11 共享时间箭头与视界盲点边界：过去假设、反例审计与宇宙学常数问题 {#sec-ch34-cosmological-arrow-and-horizon-floor}

在 [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)、[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 与上一节 [§34.10](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning) 中，我们阐明了单个受限观察者如何通过偏迹截断涌现局域温度，以及如何通过擦除冗余微观纤维向周围热库支付兰道尔热 $k_B T \ln 2 \cdot H(H \mid Q)$ 来完成八度概念蒸馏。然而，只要将视野从一位局域观察者扩展到由无数彼此分离的受限观察者共同栖居的可观测宇宙，两道横亘在统计物理与现代宇宙学根基处的终极追问便避无可避：

1. **共享时间箭头之问**：微观双体与多体幺正演化 $U^\dagger U = \mathbf{1}$ 在时间反演 $U \leftrightarrow U^\dagger$ 下严格对称。既然局域兰道尔擦除要求观察者与环境热库在耦合前处于低关联、未饱和状态，为什么宇宙中相距亿万光年的恒星、生物与实验仪器全部指向**同一支正向热力学时间箭头**，而从未观测到某片星域自发发生“热浴向记忆倒灌负熵”的逆时间退纠缠？
2. **宇宙学常数与视界下界之问**：在 [§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 与 [§36.8](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension) 中，内嵌观察者的不可完备正交投影逃逸与球极投影北极盲点 $\{N\}$ 揭示了“有限局部视界永不闭合”的认识论与拓扑结构。这一自指视界盲点能否在物理上充当正宇宙学常数 $\Lambda_{\mathrm{cos}} > 0$（注：本节全程以 $\Lambda_{\mathrm{cos}}$ 记宇宙学常数，以严格区别于 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的外代数阶 $\Lambda^k_\ell$）的几何候选机制（`MODEL`）？它又在何处触碰不可逾越的反循环红线？

本节秉持全书最严格的认识论诚实准则：用内核精确恒等式与显式量子门、广义相对论精确解逐项展开反例审计，把真正已获证明的局部熵收支、富有启发性的物理哲学模型（`MODEL`）与当代物理学尚未攻克的开放难题（`OPEN`）划得一清二楚。

## 34.11.1 双体幺正互信息平衡与过去假设的双重初始条件 {#sec-ch34-23-1}

为什么单靠“局域观察者做偏迹截断”（[§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)）或“双体幺正演化守恒全局纯度”本身，绝对推导不出全宇宙共享的单向熵增定律？答案就写在双体幺正演化的边缘熵—互信息精确收支恒等式里。设有限维复合系统 $A \times B$ 经历任意联合幺正门 $U \in \mathrm{U}(A \times B)$，将初态 $\rho_0$ 推演至末态 $\rho_1 = U \rho_0 U^\dagger$。因联合冯·诺依曼熵在幺正共轭下严格不变 $S_{AB}(\rho_1) = S_{AB}(\rho_0)$，将量子互信息定义 $I(A{:}B) := S_A + S_B - S_{AB}$ 在初末两端相减，立即得到无近似精确恒等式：

$$
\Delta S_A + \Delta S_B \;=\; \Delta I(A{:}B) \;=\; I_1(A{:}B) - I_0(A{:}B).
$$

审视等号右端的两项：量子相对熵非负性保证末态互信息恒满足 $I_1(A{:}B) \ge 0$，但幺正动力学本身并不限制 $-I_0(A{:}B)$ 的大小！从严格数学逻辑上看，`marginal_entropy_change_eq_mutual_information_change` 并不证明“单步正向熵增必以 $I_0 = 0$ 或极低初态熵为逻辑必要前提”（满足 $0 < I_0 < I_1$ 的部分关联态或近饱和态仍可给出单步 $\Delta S_A, \Delta S_B > 0$），而是精确划定了**两项充分性与容量余量角色**，从而揭示为何宇宙学必须额外引入**过去假设作为边界公设**（`MODEL` / `OPEN`，见 [@prob-ch34-past-hypothesis-and-cosmological-constant]）：

1. **初始跨区域因子化作为总边缘熵变非负的充分条件（$I_0(A{:}B) = 0 \implies \Delta S_A + \Delta S_B = I_1 \ge 0$）**：当初始联合态为直积态 $\rho_0 = \rho_{A,0} \otimes \sigma_{B,0}$ 时，初态互信息归零 $I_0(A{:}B) = 0$，足以担保对任意幺正门 $U$ 恒有总边缘熵变非负 $\Delta S_A + \Delta S_B = I_1(A{:}B) \ge 0$。反之，若无边界限制而存在 $I_0 > I_1$ 的预存关联，幺正演化即可使两侧边缘熵之和倒流（$\Delta S_A + \Delta S_B = I_1 - I_0 < 0$）！
2. **未饱和初始边缘熵提供热力学增长余量（$S_{\alpha,0} < \ln d_\alpha$）**：即便满足初始因子化 $I_0(A{:}B) = 0$，子系统 $A$ 的严格局域正熵增仍需局域未饱和余量 $\ln d_A - S_{A,0} > 0$——若单侧边缘已最大混合（$S_{A,0} = \ln d_A$），其熵**不可能继续增加**（$\Delta S_A \le 0$），但当伴随子系统 $B$ 未饱和时，联合幺正门仍可令其**降低**（如下表行 (iv) 中 $\mathrm{SWAP}$ 作用于 $(\mathbf{1}_2/2)\otimes\lvert 0\rangle\langle 0\rvert$ 给出 $\Delta S_A = -\ln 2 < 0 < +\ln 2 = \Delta S_B$）；唯有当初态乘积态的**双侧边缘同时**最大混合（$\rho_{AB} = \frac{\mathbf{1}_A}{d_A}\otimes\frac{\mathbf{1}_B}{d_B} = \frac{\mathbf{1}_{d_A d_B}}{d_A d_B}$）时，全局幺正不变性才在一切联合幺正门下锁死 $\Delta S_A = \Delta S_B = 0$。要支撑跨宇宙纪元的持续正向耗散，遂需作为宏观边界公设采纳双侧巨大的初始熵余量 $S_{\alpha,0} \ll \ln d_\alpha$。

我们将上述形式内核契约与宇宙学“过去假设”经典文献的边界归档如下：

::: {.remark #rem-ch34-past-hypothesis-contract title="双体幺正边缘熵平衡与宇宙学过去假设的形式契约（文献结果与 MODEL）"}
本小节关于局部边缘熵之和与跨观察者共享时间箭头的边界分析，严格区分以下内核定理、经典文献与模型诠释：

1. **直积态互信息归零与双体幺正边缘熵—互信息平衡恒等式（内核定理）**：在有限可判等指标类型 $A, B$ 上，[`quantumMutualInformation_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.quantumMutualInformation_productState) 证明对任意密度态 $\rho : \operatorname{DensityState} A$ 与 $\sigma : \operatorname{DensityState} B$，独立直积态满足 $\operatorname{quantumMutualInformation}(\operatorname{productState}(\rho, \sigma)) = 0$；[`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change) 进一步证明：对任意联合幺正矩阵 $U \in \operatorname{Matrix.unitaryGroup}(A \times B, \mathbb{C})$ 与任意初始联合态 $\rho : \operatorname{DensityState}(A \times B)$（无需预设初态为直积态），记末态 $\mathrm{final} := \operatorname{unitaryConjugateState}(U, h_U, \rho)$，右偏迹保留 $A$ 上的边缘态 $\operatorname{marginalRight}$，左偏迹保留 $B$ 上的边缘态 $\operatorname{marginalLeft}$，恒有精确等式

   $$
   \bigl(S(\operatorname{marginalRight}\mathrm{final}) - S(\operatorname{marginalRight}\rho)\bigr) + \bigl(S(\operatorname{marginalLeft}\mathrm{final}) - S(\operatorname{marginalLeft}\rho)\bigr) \;=\; I(\mathrm{final}) - I(\rho).
   $$

   这从纯线性代数与谱熵层面锁死了：任何声称“无需特殊初态、仅凭幺正演化加偏迹即可无条件导出 $\Delta S_A + \Delta S_B \ge 0$”的论证皆违背上述恒等式中的 $-I(\rho)$ 项。
2. **宇宙学过去假设与早期低引力熵边界（`文献结果，未在本书形式化`）**：R. Penrose（载 *General Relativity: An Einstein Centenary Survey*, S. W. Hawking & W. Israel 编, Cambridge Univ. Press, 581–638, 1979）指出早期宇宙辐射与物质虽接近局域热平衡，引力自由度却处于外尔曲率张量近乎归零（$C_{\mu\nu\rho\sigma} \to 0$）的极端低熵态，可观测宇宙重子数对应的贝肯斯坦—霍金最大黑洞熵相空间体积比高达约 $10^{10^{123}}$；D. Z. Albert（*Time and Chance*, Harvard Univ. Press, 2000）将这一宇宙初始低熵边界条件系统命名为**过去假设（Past Hypothesis）**，论证统计力学正向时间箭头与可靠记忆记录均依赖该额外公设；S. M. Carroll & J. Chen（[arXiv:hep-th/0410270](https://arxiv.org/abs/hep-th/0410270), 2004）进一步探讨了在无界熵容量引力背景下通过德西特背景暴胀自发孕育双向时间箭头子宇宙的宇宙学假说。
3. **比较网络共享初始走廊诠释（`MODEL`）**：在本书的比较几何模型中，我们所能观测到的亿万受限观察者之所以共享一致的兰道尔擦除正向时间箭头，是因为所有这些局域格拉姆窗口皆从同一条低边缘熵、跨区域近似无纠缠（$I_0 \approx 0,\; S_{\alpha,0} \ll S_{\alpha,\max}$）的早期宇宙分支走廊分岔展开（`MODEL`）；至于这条初始走廊本身能否从零背景比较公理动力学中非循环导出，则严格归入节末开放问题 [@prob-ch34-past-hypothesis-and-cosmological-constant]（`OPEN`）。
:::

为了在完全透明的有限维舞台上构造性证明“若无初始边界限制，单凭双体幺正演化加偏迹无法无条件担保 $\Delta S_A, \Delta S_B \ge 0$”，我们在双量子比特空间 $\mathbb{C}^2 \otimes \mathbb{C}^2$ 上并置四类初态对照表：

::: {.example #ex-ch34-thermodynamic-arrow-countermodels title="双量子比特幺正演化下的四类初态热力学箭头对照算例"}
**手工推导。** 在双量子比特希尔伯特空间 $\mathcal{H}_A \otimes \mathcal{H}_B = \mathbb{C}^2 \otimes \mathbb{C}^2$ 上（冯·诺依曼熵与互信息均以自然对数 $\mathrm{nats}$ 计，单比特最大熵为 $S_{\max} = \ln 2$），引入纠缠幺正门

$$
U \;:=\; \frac{\mathbf{1}_4 - i\,X \otimes X}{\sqrt{2}}, \qquad U^\dagger U \;=\; \frac{(\mathbf{1}_4 + i\,X \otimes X)(\mathbf{1}_4 - i\,X \otimes X)}{2} \;=\; \frac{\mathbf{1}_4 + (X \otimes X)^2}{2} \;=\; \mathbf{1}_4,
$$

以及双量子比特交换幺正门 $\mathrm{SWAP}$（定义为 $\mathrm{SWAP}\lvert j k\rangle = \lvert k j\rangle$，$\mathrm{SWAP}^\dagger \mathrm{SWAP} = \mathbf{1}_4$）。下表逐项对比四类典型初态 $\rho_0$ 的局部边缘熵变 $(\Delta S_A, \Delta S_B)$ 与互信息变化 $\Delta I(A{:}B)$：

| 初态类别与联合密度算符 $\rho_0$ | 演化幺正门 | 初态 $(S_{A,0}, S_{B,0};\, I_0)$ | 末态 $(S_{A,1}, S_{B,1};\, I_1)$ | 局部熵变 $(\Delta S_A, \Delta S_B)$ 与时间箭头诊断 |
| :--- | :---: | :---: | :---: | :--- |
| **(i) 纯因子化初态** $\lvert 00\rangle\langle 00\rvert$ | $U$ | $(0,\, 0;\; 0)$ | $(\ln 2,\, \ln 2;\; 2\ln 2)$ | $(+\ln 2,\, +\ln 2)$：**双侧同向正向熵增箭头** |
| **(ii) 预纠缠贝尔初态** $\lvert\Psi_{\mathrm{ent}}\rangle\langle\Psi_{\mathrm{ent}}\rvert$ | $U$ | $(\ln 2,\, \ln 2;\; 2\ln 2)$ | $(0,\, 0;\; 0)$ | $(-\ln 2,\, -\ln 2)$：**双侧同步反热力学逆箭头** |
| **(iii) 最大混合乘积态** $\frac{\mathbf{1}_2}{2} \otimes \frac{\mathbf{1}_2}{2}$ | $U$ 或任意 $V$ | $(\ln 2,\, \ln 2;\; 0)$ | $(\ln 2,\, \ln 2;\; 0)$ | $(0,\, 0)$：**热寂平衡态，零时间箭头** |
| **(iv) 非对称混纯乘积态** $\frac{\mathbf{1}_2}{2} \otimes \lvert 0\rangle\langle 0\rvert$ | $\mathrm{SWAP}$ | $(\ln 2,\, 0;\; 0)$ | $(0,\, \ln 2;\; 0)$ | $(-\ln 2,\, +\ln 2)$：**两侧局域时间箭头完全相反** |

逐行核验全部矩阵乘法与偏迹谱值：

1. **行 (i)（纯因子化过去假设原型）**：初态 $\rho_0^{(\mathrm{i})} = \lvert 0\rangle\langle 0\rvert \otimes \lvert 0\rangle\langle 0\rvert$ 同时满足初始无纠缠 $I_0 = 0$ 与双侧零边缘熵 $S_{A,0} = S_{B,0} = 0$。因 $(X \otimes X)\lvert 00\rangle = \lvert 11\rangle$，作用 $U$ 得贝尔态 $\lvert\Psi_1^{(\mathrm{i})}\rangle = U\lvert 00\rangle = \frac{\lvert 00\rangle - i\,\lvert 11\rangle}{\sqrt{2}}$，双侧边缘态皆化为最大混合态 $\rho_{A,1} = \rho_{B,1} = \frac{1}{2}\mathbf{1}_2$，故 $\Delta S_A = \Delta S_B = +\ln 2 > 0$，且 $\Delta S_A + \Delta S_B = 2\ln 2 = \Delta I(A{:}B)$：$A, B$ 两位局域观察者同步见证正向热力学时间箭头。
2. **行 (ii)（违反 $I_0 = 0$ 的预纠缠反例）**：取预纠缠纯态

   $$
   \lvert\Psi_{\mathrm{ent}}\rangle \;:=\; \frac{\lvert 00\rangle + i\,\lvert 11\rangle}{\sqrt{2}} \;=\; U^\dagger\lvert 00\rangle,
   $$

   其初始边缘态为 $\rho_{A,0} = \rho_{B,0} = \frac{1}{2}\mathbf{1}_2$（$S_{A,0} = S_{B,0} = \ln 2$），但全局纯度使 $S_{AB,0} = 0$、初始互信息高达 $I_0(A{:}B) = 2\ln 2 > 0$。在与行 (i) **完全相同的物理动力学算子 $U$** 下显式展开相位：

   $$
   U\lvert\Psi_{\mathrm{ent}}\rangle \;=\; \frac{\mathbf{1}_4 - i\,X \otimes X}{\sqrt{2}} \cdot \frac{\lvert 00\rangle + i\,\lvert 11\rangle}{\sqrt{2}} \;=\; \frac{\lvert 00\rangle + i\,\lvert 11\rangle - i\,\lvert 11\rangle - i^2\,\lvert 00\rangle}{2} \;=\; \lvert 00\rangle
   $$

   （等价地，对行 (i) 末态 $\frac{\lvert 00\rangle - i\lvert 11\rangle}{\sqrt{2}}$ 作用逆门 $U^\dagger = \frac{\mathbf{1}_4 + i X\otimes X}{\sqrt{2}}$ 同样精确退回 $\lvert 00\rangle$）！末态退纠缠为纯乘积态 $\lvert 00\rangle$，$S_{A,1} = S_{B,1} = 0$，$I_1 = 0$，导致 **$\Delta S_A = -\ln 2 < 0$ 且 $\Delta S_B = -\ln 2 < 0$**（$\Delta S_A + \Delta S_B = -2\ln 2 = \Delta I$）：若不排除初始预纠缠，纯局域看似完全相同的混合边缘态 $\frac{1}{2}\mathbf{1}_2$ 竟会自发逆向纯化！
3. **行 (iii)（满足 $I_0 = 0$ 但违反低初态熵的热寂反例）**：初态 $\rho_0^{(\mathrm{iii})} = \frac{\mathbf{1}_2}{2} \otimes \frac{\mathbf{1}_2}{2} = \frac{1}{4}\mathbf{1}_4$ 严格满足直积无关联 $I_0(A{:}B) = 0$（由 [`quantumMutualInformation_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.quantumMutualInformation_productState) 保证），但双侧初始熵已封顶 $S_{A,0} = S_{B,0} = \ln 2$。对**任意**双量子比特幺正门 $V \in \mathrm{U}(4)$，皆有 $V\bigl(\frac{1}{4}\mathbf{1}_4\bigr)V^\dagger = \frac{1}{4}V V^\dagger = \frac{1}{4}\mathbf{1}_4$，从而 $\Delta S_A = \Delta S_B = \Delta I = 0$：单有“初始无关联 $I_0 = 0$”而无低初态熵，系统永远停滞在无时间箭头的热寂死水之中。
4. **行 (iv)（满足 $I_0 = 0$ 且总熵未满，但初始未饱和余量分布不均的反方向箭头反例）**：初态 $\rho_0^{(\mathrm{iv})} = \frac{\mathbf{1}_2}{2} \otimes \lvert 0\rangle\langle 0\rvert$ 既是严格直积态（$I_0 = 0$），又满足全局非最大熵（$S_{AB,0} = \ln 2 < 2\ln 2$）。经幺正门 $\mathrm{SWAP}$ 演化后，$\rho_1^{(\mathrm{iv})} = \lvert 0\rangle\langle 0\rvert \otimes \frac{\mathbf{1}_2}{2}$ 仍为直积态（$I_1 = 0,\; \Delta I = 0$），但 $A$ 侧边缘熵变为 $\Delta S_A = 0 - \ln 2 = -\ln 2 < 0$，而 $B$ 侧边缘熵变为 $\Delta S_B = \ln 2 - 0 = +\ln 2 > 0$（总和 $\Delta S_A + \Delta S_B = 0 = \Delta I$ 依然守恒）！两位观察者体验到**截然相反**的局部热力学箭头。这四行算例构造性地锁定了精确逻辑边界：若无边界限制，幺正动力学加偏迹**不能无条件担保** $\Delta S_A, \Delta S_B \ge 0$（纵使满足 $0 < I_0 < I_1$ 的特殊部分关联态或近最大混合态仍可呈现正熵步，但 $I_0 > I_1$ 的预存关联会使 $\Delta S_A + \Delta S_B < 0$ 逆流，而全局最大混合乘积热浴 $\frac{\mathbf{1}_A}{d_A}\otimes\frac{\mathbf{1}_B}{d_B}$ 则停滞于 $\Delta S_A = \Delta S_B = 0$）；因而宇宙初始低关联与宏大宏观熵余量（过去假设）系作为**采纳的宇宙学边界公设**（`MODEL` / `OPEN`，[@prob-ch34-past-hypothesis-and-cosmological-constant]）进入物理学，绝非单靠局域偏迹即可证出的必然性定理。
:::

## 34.11.2 视界盲点宇宙学常数试探模型的三重反例与反循环审计 {#sec-ch34-23-2}

现在转向第二个核心问题：在 [§36.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 与 [§36.8](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension) 中，任何内嵌有限观察者都背负着两项结构性边界——其一，任意真闭子空间的正交补投影算子范数恒为 $1$（$\lVert\operatorname{id} - P_S\rVert = 1$）；其二，球极投影 $S^D \setminus \{N\} \to \mathbb{R}^D$（$R(\theta) = \cot(\theta/2)$）虽仅挖去单点北极 $N$ 而将一切 $\theta > 0$ 留在定义域内，但一旦施加**有限平面视界/分辨率截断 $R \le R_{\max}$（`MODEL`）**，便裁出严格正孔径角 $\delta_{\mathrm{blind}} = 2\arctan(1/R_{\max}) > 0$ 的北极盲冠。在物理直觉上，人们极易萌生一种诱人的宇宙学试探模型（`MODEL`）：这枚有限截断盲冠孔径 $\delta_{\mathrm{blind}}$ 乘上因果视界尺度 $R_H^{-2}$，是否就能直接导出驱动宇宙加速膨胀的正宇宙学常数下界 $\Lambda_{\mathrm{cos}} \sim c\,\delta_{\mathrm{blind}}^2 / R_H^2 > 0$？

作为严谨的学术专著，我们必须亲自对这一候选模型执行无死角的**量纲分析、算子拓扑辨析与广义相对论精确解反循环审计**：

::: {.example #ex-ch34-horizon-blindspot-anticircularity title="视界盲点宇宙学常数试探模型对闵可夫斯基、反德西特与德西特时空的反循环审计"}
**手工推导（配形式定理边界、`文献结果` 与 `MODEL` 审计）。** 我们分两步检验“由算子投影残差或球极盲点孔径导出 $\Lambda_{\mathrm{cos}} > 0$”这一候选构想（`MODEL`）的数学边界：

**第一步：内核紧化/投影逃逸定理的无标度性与极冠收缩检核。**
审视本书涉及无穷远紧化边界与正交补逃逸的三条内核定理：

1. **一维凯莱分式紧化临界线判据（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)）**：对任意复谱参数 $s \in \mathbb{C}$，定义 $\operatorname{cayleyRatio}(s) := (s - 1)/s$（在 Lean 全函数除法约定下 $s = 0$ 处取值为 $0$；对 $s \neq 0$ 将无界临界直线 $\operatorname{Re}(s) = \frac{1}{2}$ 共形映入挖去无穷远像点 $\{1\}$ 的穿孔单位圆 $S^1 \setminus \{1\}$），恒有 $\lVert\operatorname{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$。这刻画了亚历山德罗夫单点紧化中无穷远边界与单点穿孔的拓扑对偶，但该分式变换本身**不含任何物理长度单位**——对临界线作任意正实数重标度 $s - \frac{1}{2} \mapsto \lambda\bigl(s - \frac{1}{2}\bigr)$（$\lambda > 0$）仍严格映回同一单位圆 $S^1 \setminus \{1\}$。
2. **真闭子空间单步正交逃逸与一致完备化阻断（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)、[`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction)）**：在完备内积空间 $V$ 中，任何带非零正交补（$S^\perp \neq \bot$）的闭子空间 $S$ 均存在单位法向逃逸元 $e \in S^\perp$ 满足 $\lVert e\rVert = 1$、$P_S(e) = 0$、$\operatorname{Metric.infDist}(e, S) = 1$ 与 $\lVert\operatorname{id} - P_S\rVert = 1$；更一般地，在内积空间 $H$ 上沿任意非平凡滤子 `stageFilter`（`[NeBot stageFilter]`）演进的真可投影子空间族 $S_i \neq \top$ 恒满足 $\forall i,\; \lVert\operatorname{id} - P_{S_i}\rVert = 1$，故算子范数距离序列不可能收敛于 $0$。
   **无标度与极冠收缩检核（`手工推导`）**：在无穷维可分希尔伯特空间 $\ell^2(\mathbb{N})$ 中取前 $n$ 维坐标截断投影 $P_n$（投向 $\operatorname{span}\{e_0, \dots, e_{n-1}\}$），算子范数残差 $\lVert I - P_n\rVert = 1$ 是一个**纯无量纲常数 $1$**（绝非带有 $[\text{长度}]^{-2}$ 量纲的物理曲率！），且对每个固定态矢量 $\psi \in \ell^2(\mathbb{N})$ 依然成立强算子拓扑逐点收敛 $\lVert(I - P_n)\psi\rVert = \bigl(\sum_{k \ge n}\lvert\psi_k\rvert^2\bigr)^{1/2} \xrightarrow{n \to \infty} 0$。同样地，在二维单位球面 $S^2$ 上，围绕北极盲点 $N$ 张角为 $\delta_{\mathrm{blind}} \in (0, \pi]$ 的极冠归一化球面测度为

   $$
   \frac{A_{\mathrm{cap}}(\delta_{\mathrm{blind}})}{4\pi} \;=\; \frac{2\pi(1 - \cos\delta_{\mathrm{blind}})}{4\pi} \;=\; \sin^2\!\frac{\delta_{\mathrm{blind}}}{2};
   $$

   纯微分拓扑与内积几何本身并不阻止孔径沿加细序列 $\delta_n = \frac{1}{n} \to 0$ 连续收缩，此时极冠面积占比 $\sin^2\!\bigl(\frac{1}{2n}\bigr) \sim \frac{1}{4n^2} \xrightarrow{n \to \infty} 0$ 平滑归零，单凭拓扑穿孔推不出非零紫外物理下界！

**第二步：候选量纲试探式 $\Lambda_{\mathrm{cos}} \sim c\,\delta_{\mathrm{blind}}^2 / R_H^2$ 对三大爱因斯坦真空精确解的反例与循环性测试。**
设某候选模型（`MODEL`）试图引入紫外最小像素赋予固定非零孔径 $\delta_{\mathrm{blind}} > 0$，并除以观察者因果视界半径 $R_H$ 的平方以拼出曲率量纲 $[\Lambda_{\mathrm{cos}}] = L^{-2}$：

$$
\Lambda_{\mathrm{cos}}^{\mathrm{ansatz}} \;:=\; c\,\frac{\delta_{\mathrm{blind}}^2}{R_H^2} \qquad (c > 0).
$$

将此试探式放入广义相对论真空场方程 $G_{\mu\nu} + \Lambda_{\mathrm{cos}}\,g_{\mu\nu} = 0$ 的三类标准精确解中逐一核验（`手工推导`）：

1. **反例 A——精确闵可夫斯基平直时空（$\Lambda_{\mathrm{cos}} = 0$）中的林德勒视界与有限因果菱形**：
   在精确 $(3+1)$ 维平直闵可夫斯基时空 $ds^2 = -c_{\mathrm{light}}^2 dt^2 + dx^2 + dy^2 + dz^2$ 中，黎曼曲率张量与宇宙学常数恒等于零（$R_{\mu\nu\rho\sigma} = 0$，**$\Lambda_{\mathrm{cos}} = 0$**）。然而，任何以固有加速度 $a > 0$ 作匀加速运动的观察者都在有限固有距离 $R_H = c_{\mathrm{light}}^2 / a < \infty$ 处拥有真实的因果林德勒（Rindler）视界（伴随非零盎鲁温度 $k_B T_U = \hbar a / (2\pi c_{\mathrm{light}})$），且任何有限固有时寿命 $\Delta\tau < \infty$ 的局域观察者也只能访问半径为 $R_H = c_{\mathrm{light}}\Delta\tau / 2 < \infty$ 的有限因果菱形。将 $R_H < \infty$ 与 $\delta_{\mathrm{blind}} > 0$ 代入试探式会给出 $\Lambda_{\mathrm{cos}}^{\mathrm{ansatz}} > 0$，与真实背景曲率 $\Lambda_{\mathrm{cos}} = 0$ 直接矛盾！**“局域观察者存在有限视界”绝不蕴涵背景时空必须具有正曲率。**
2. **反例 B——四维反德西特时空 $\mathrm{AdS}_4$（$\Lambda_{\mathrm{cos}} = -3 / L_{\mathrm{AdS}}^2 < 0$）的负曲率相容性**：
   四维反德西特时空是高度自洽的最大对称洛伦兹爱因斯坦流形（亦是全息纠缠熵面积律最标准的严格舞台），其宇宙学常数严格为负：**$\Lambda_{\mathrm{cos}} = -3 / L_{\mathrm{AdS}}^2 < 0$**。$\mathrm{AdS}_4$ 内任意有限边界因果楔对应的 $\mathrm{AdS}$–林德勒观察者同样具有有限视界与盲点，但非负平方试探式 $c\,\delta_{\mathrm{blind}}^2 / R_H^2 \ge 0$（$c > 0$）在代数上永远不可能变号为负。这证明在平直、正曲率与负曲率背景下均成立的抽象希尔伯特投影或盲点拓扑，本身不足以锁定 $\operatorname{sgn}(\Lambda_{\mathrm{cos}}) = +1$。
3. **反例 C——静态德西特区域 $\mathrm{dS}_4$（$\Lambda_{\mathrm{cos}} > 0$）中的代数消去与同义反复循环**：
   在 $\Lambda_{\mathrm{cos}} > 0$ 的 $(3+1)$ 维德西特时空静态坐标片（static patch）中，度规为

   $$
   ds^2 \;=\; -\Bigl(1 - \frac{\Lambda_{\mathrm{cos}}\,r^2}{3}\Bigr)c_{\mathrm{light}}^2 dt^2 + \Bigl(1 - \frac{\Lambda_{\mathrm{cos}}\,r^2}{3}\Bigr)^{-1} dr^2 + r^2 d\Omega_2^2,
   $$

   宇宙学事件视界由度规分量归零条件 $1 - \frac{\Lambda_{\mathrm{cos}}}{3}R_H^2 = 0$ 唯一决定，即

   $$
   R_H^2 \;=\; \frac{3}{\Lambda_{\mathrm{cos}}} \quad \Longleftrightarrow \quad \Lambda_{\mathrm{cos}} \;=\; \frac{3}{R_H^2}.
   $$

   现在把德西特视界定义式 $R_H^2 = 3 / \Lambda_{\mathrm{cos}}$ 代回候选试探式 $\Lambda_{\mathrm{cos}} = c\,\delta_{\mathrm{blind}}^2 / R_H^2$，立即看到：

   $$
   \Lambda_{\mathrm{cos}} \;=\; c\,\delta_{\mathrm{blind}}^2 \cdot \frac{\Lambda_{\mathrm{cos}}}{3} \quad \Longrightarrow \quad \Lambda_{\mathrm{cos}}\Bigl(1 - \frac{c\,\delta_{\mathrm{blind}}^2}{3}\Bigr) \;=\; 0!
   $$

   对任何 $\Lambda_{\mathrm{cos}} \neq 0$，**待求的物理标度 $\Lambda_{\mathrm{cos}}$ 在方程两侧恒等对消**，只剩一条无标度参数绑定关系 $c\,\delta_{\mathrm{blind}}^2 = 3$，而 $\Lambda_{\mathrm{cos}}$ 本身相对于普朗克曲率标度 $\ell_P^{-2} := c_{\mathrm{light}}^3 / (\hbar G)$ 的数值大小**完全悬空未定**！正如 S. Weinberg 在经典综述 *The cosmological constant problem*（*Rev. Mod. Phys.* **61**, 1–23, 1989, DOI: [10.1103/RevModPhys.61.1](https://doi.org/10.1103/RevModPhys.61.1)，`文献结果`）中所深刻揭示的，宇宙学常数真正的定量硬骨头在于解释观测值与朴素普朗克截断零点能之间跨越 **$122$ 个数量级**的无量纲等级鸿沟：

   $$
   \Lambda_{\mathrm{cos}}\,\ell_P^2 \;\sim\; \Bigl(\frac{\ell_P}{R_H}\Bigr)^2 \;\sim\; 10^{-122} \;\ll\; 1.
   $$

   即便在全息模型（`MODEL`）中改令盲点角分辨率等于普朗克长度与视界半径之比 $\delta_{\mathrm{blind}} \sim \ell_P / R_H$（对应视界全息像素总数 $N_{\mathrm{holo}} \sim (R_H / \ell_P)^2 \sim \delta_{\mathrm{blind}}^{-2} \sim 10^{122}$），代回 $\Lambda_{\mathrm{cos}} \sim \delta_{\mathrm{blind}}^2 / \ell_P^2$ 依旧原封不动退回同义反复 $\Lambda_{\mathrm{cos}} \sim R_H^{-2}$——全部定量之谜只是被等价改写为“为何可观测宇宙的全息自由度总预算恰好巨大到 $N_{\mathrm{holo}} \sim 10^{122}$ 而非 $O(1)$”。
:::

通过上述双重审计，我们为“未完备视界与北极盲点对应正德西特视界”的宏观诠释（`MODEL`）划定了坚不可摧的科学护栏：它可以作为理解“有限观察者为何具有最大因果视界”的几何图景，但绝不能冒充对暗能量密度与宇宙初始低熵边界的定量证明。我们将这两项诚实留白的根本问题正式登记为本章开放问题：

::: {.problem #prob-ch34-past-hypothesis-and-cosmological-constant title="宇宙学过去假设与正常数真空曲率标度的微观非循环导出问题"}
在零背景比较公理 $\mathcal{A}_0$ 与离散极小圆弧路径积分框架下，以下两项宇宙学基础定量导出问题目前仍严格开放（`OPEN`）：

1. **过去假设（Past Hypothesis）的非循环起源**：在不人为手写特殊初始边界条件的前提下，能否从无特权比较网络或自指扩表动力学中严格证明，典型内嵌观察者分支必然涌现于同时满足跨区域近似因子化（$I_0 \approx 0$）与局域普遍低边缘熵（$S_{\alpha,0} \ll S_{\alpha,\max}$，含极低初始外尔引力熵）的共享初始走廊？
2. **宇宙学常数符号与 $10^{-122}$ 量级等级的非循环定量导出**：在不把宏观哈勃/德西特视界半径 $R_H$ 或全息总像素数 $N_{\mathrm{holo}} \sim 10^{122}$ 预先偷渡为输入参数的前提下，能否从微观比较代数与紫外有限截断结构中非循环地唯一固定有效真空曲率的符号 $\Lambda_{\mathrm{cos}} > 0$，并从第一性原理推算出无量纲比值 $\Lambda_{\mathrm{cos}}\,\ell_P^2 \sim 10^{-122}$ 的数量级？
:::

至此，第三十四章从多观察者互吸引子与指针共识（[§34.1](ch33-s01-universal-observers.md)–[§34.5](ch33-s05-consensus-and-pointer-bases.md)）、受限不妄我偏迹热力学与滑动格拉姆窗口（[§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)–[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)），直至单次记录选支、感知—行动和乐、八度记忆蒸馏与宇宙学时间箭头反循环护栏（[§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–§34.11）的十一节画卷已全部合拢。当有限观察者在比较网络中的外部共识与热力学边界已被擦拭得一清二楚，接下来我们将走入观察者自身的生命与认知演化腹地——翻开 **[第三十五章 光之来路、双曲破执与自指扩表](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)**（从 [§35.1](ch35-light-pulse-and-self-referential-table.md) 见证一位有限记忆的生命观察者如何“乘着光来”，在遗忘初始化之后一步步开启 $T = T(T)$ 的自指扩表与破执觉醒之旅）。
