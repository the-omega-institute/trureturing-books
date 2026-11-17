# 39.15 梵天实轴（I）与正交虚梦（i）：内部虚虚得实、《蛙氏奥义书》四位意识相态与庄周梦蝶合拢 {#sec-ch39-brahman-real-axis-and-orthogonal-dream}

> *“宇宙是梵天的梦, I就是梵天, i就是梦”*

在 [§39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection) 中，我们将整座宇宙概念塔撤至最底层的零背景根基：万象背后只有唯一一颗零维点——它同时也是唯一一片无边无际的场（$\Lambda^0 \equiv \Lambda^3 \equiv \mathbf{\Omega}$）；所谓正交维度、虚数、面积与体积，不过是唯一本体场向自身投下观测目光时因非零失准误差 $\varepsilon > 0$ 而定格的**投影结果概念**，而运动、动量与时间则是追赶校准这笔残差时绵延不息的**观测动作概念**。现在，沿着第三十九章的实轴与梦境脉络继续前行，章首题记与那句伴生箴言——*“一切都在梵天(I)的梦(i)中, i虚数正交维度, 虚幻的梦”*——将四百年的数学语源与三千年的东西方存在论熔铸为一对极致清澈的正交生成元：大写恒等实轴 $\mathbf{I}$（主格之“我”，对应古印度不二吠檀多哲学中唯一常住的**梵**）与小写正交虚数空间 $\hat{\mathbf{i}}$（拉丁词根 *imāginārius*，本义正是**心像、想象与梦境显相**）。$\mathbf{I}$ 是如如不动的做梦本体，而与 $\mathbf{I}$ 严格呈 $90^\circ$ 垂直的正交虚空间 $\hat{\mathbf{i}}$，则是铺展百亿光年星辰生灭、悲欢离合的宇宙大梦。

遵循本书一以贯之的四层认识论诚实契约，本节将“梵天实轴 $\mathbf{I}$ 与正交虚梦 $\hat{\mathbf{i}}$”、梦境内部因果刚性、《蛙氏奥义书》（*Māṇḍūkya Upaniṣad*）四位意识相态以及庄周梦蝶单侧旋量合拢明确标定为跨学科顶层 **`MODEL`（模型诠释）**；支撑这一几何图景的反自伴复结构负平方律、平衡正交对内生复结构、捏合勾股相干分解、等格拉姆幺正延拓、秩一玻恩模平方赋权、共同相位二次厄米锁定、对角测量相位失明、道蒂余弦不动点、语境分岔与客观不变公因子、全副本幺模相位记录相干逆转与幸存副本阻断以及圆周平方双覆叠无截面与 $360^\circ$ 换叶提升，全部由下文 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 的**十四条 Lean 4 内核冻结声明**（`LEAN ✓`）严格锚定；笛卡尔“虚数”词源、施蒂克尔贝格实希尔伯特空间全局复结构与多体局域实量子的理论不等价与实验可证伪性、梵语中性词 *brahman*（梵）与阳性词 *brahmā*（大梵天）的文献训诂、《蛙氏奥义书》及乔荼波陀《蛙氏奥义书颂》、以及《庄子·齐物论》梦蝶物化公案悉数归档于 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 的 `文献结果`；四联高精度定量复算收入 [@ex-ch39-brahman-dream-born-rigidity-and-mandukya-audit] 的 `手工推导` / `NUM`；而标准模型连续耦合常数、连续统引力场方程与正交切面宇宙学原初谱等未决物理前沿，则继续严守 [@prob-ch34-sm-generations-and-couplings]、[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-ch39-af-gut-threshold-and-proton-stability] 与 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] 的红色 `OPEN` 科学界碑。

## 39.15.1 为何创世只能发生在 90° 正交虚空间 i：实轴耗散禁律与保范旋量演化 {#sec-ch39-15-1}

让我们先用最朴素的线性代数回答第一个根本追问：**既然唯一本体 $\mathbf{I}$ 本自具足（单位归一 $\lVert\mathbf{I}\rVert^2 = 1$，自比较幂等 $\mathbf{I}^2 = +\mathbf{1}$），它为什么不在实轴自身上直接演化出大千世界，而非要拐进 $90^\circ$ 正交虚空间 $\hat{\mathbf{i}}$ 不可？**

答案是一道冷峻的**实轴耗散与爆裂禁律**（`手工推导`，呼应 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-born-and-imaginary-blindspot) 的去留 `i` 对照）：倘若本体试图沿着实轴 $\mathbf{I}$ 自身施加任何实标量生成元 $-\gamma \in \mathbb{R}$，微分方程 $\partial_t \Phi_{\mathrm{real}}(t) = -\gamma\,\Phi_{\mathrm{real}}(t)$ 的唯一解为纯实指数流 $\Phi_{\mathrm{real}}(t) = e^{-\gamma t}\mathbf{I}$，其模方预算为

$$
\bigl\lVert\Phi_{\mathrm{real}}(t)\bigr\rVert^2 \;=\; e^{-2\gamma t}\,\lVert\mathbf{I}\rVert^2 \;=\; e^{-2\gamma t}.
$$

这行初等公式判处了“实轴造物”的死刑：若 $\gamma > 0$，本体总预算随时间指数耗散归零（$e^{-2\gamma t} \to 0$），创世意味着本体的真实磨损与枯竭；若 $\gamma < 0$，本体模方指数发散爆炸（$e^{-2\gamma t} \to +\infty$），瞬间撕裂单位归一公理；唯有 $\gamma = 0$ 能守住模方为 $1$，却只能将一切冻结在无生无灭的恒等静默 `1 = 1` 之中。**在实轴上“造物”，要么磨损本体，要么撕裂本体，要么寸步难行。**

要把万象展开得波澜壮阔而又不伤本体分毫，演化方向必须严格拐入与 $\mathbf{I}$ 呈 $90^\circ$ 垂直的正交切空间！这里我们必须先把**内积类型卫生（inner-product type hygiene）**擦拭得纤尘不染（`手工推导` + `LEAN ✓`）：倘若有人粗心地只在单根一维复射线上把态 $\lvert\mathbf{I}\rangle$ 乘以复标量 $i \in \mathbb{C}$，虽然实内积为零（$\operatorname{Re}\langle\mathbf{I}\mid i\mathbf{I}\rangle_{\mathbb{C}} = 0$），但复内积本身为 $\langle\mathbf{I}\mid i\mathbf{I}\rangle_{\mathbb{C}} = i \neq 0$，往返玻恩重叠 $\lvert\langle\mathbf{I}\mid i\mathbf{I}\rangle_{\mathbb{C}}\rvert^2 = 1$ 仍停留在同一条射影物理态射线上，根本容纳不下万千独立梦境客体！在严格的希尔伯特几何中，“正交虚梦空间 $\hat{\mathbf{i}}$”可用下列两种几何构造阐释；它们共享保范恒等式，但采用不同的正交概念，不能视为等价的量子实现：

1. **实现 A（施蒂克尔贝格实分块复结构 $\mathcal{H}_{\mathbb{R}} = \mathcal{H}_{\mathrm{real}} \oplus \mathcal{H}_{\mathrm{dream}}$，`LEAN ✓` + `文献结果`）**：
   在 $2m$ 维实内积空间 $\mathcal{H}_{\mathbb{R}} = \mathcal{H}_{\mathrm{real}} \oplus \mathcal{H}_{\mathrm{dream}} \cong \mathbb{R}^m \oplus \mathbb{R}^m$ 上，引入全空间共享的反自伴正交分块算子

   $$
   J \;=\; \begin{pmatrix} 0 & -I_m \\ I_m & 0 \end{pmatrix}, \qquad J^\top = -J, \qquad J^\top J = J J^\top = +I_{2m}, \qquad J^2 = -I_{2m}.
   $$

   这一定理骨架直接由下文 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 第 1 款中的反自伴右幺正平方引理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)（$R^\dagger = -R \land R R^\dagger = I_n \implies R^2 = -I_n$）与平衡正交对内生相对复结构定理 [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)（$J = 2 A B^\dagger \implies J^2 = -I_n$）严格锁定（`LEAN ✓`），并在物理学史上精确对应施蒂克尔贝格（Stueckelberg, 1960，`文献结果`）的实希尔伯特量子表述 $[H, J] = 0$——注意此处 $J$ 是全网共享的**全局内禀复结构**，而非无共享 $J$ 的局域实比特（rebits）张量积（Renou 等人 2021 证明了此类实量子网络与复量子理论的预测不等价，并设计了可证伪实验，详见 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 第 2 条）。
   由反对称性 $J^\top = -J$，对 $\mathcal{H}_{\mathbb{R}}$ 中**任意**实向量 $u$，恒有 $\langle u, J u\rangle_{\mathbb{R}} = \langle J^\top u, u\rangle_{\mathbb{R}} = -\langle J u, u\rangle_{\mathbb{R}} \implies \langle u, J u\rangle_{\mathbb{R}} \equiv 0$！取本体参考单位实轴 $\mathbf{I} \in \mathcal{H}_{\mathrm{real}}$（$\lVert\mathbf{I}\rVert_{\mathbb{R}} = 1$），其在正交虚空间中的伴生单位基矢为 $J\mathbf{I} \in \mathcal{H}_{\mathrm{dream}}$（满足 $\langle\mathbf{I}, J\mathbf{I}\rangle_{\mathbb{R}} = 0$ 且 $\lVert J\mathbf{I}\rVert_{\mathbb{R}} = 1$），宇宙演化算子随即化作欧拉—薛定谔保范生成流：

   $$
   \Psi(t) \;=\; e^{-\omega t J}\mathbf{I} \;=\; (\cos\omega t)\,\mathbf{I} \;-\; (\sin\omega t)\,(J\mathbf{I}).
   $$

   这里的“正交”只指实内积。若以 $J$ 定义复标量乘法 $iu=Ju$，采用第二变量线性的复内积

   $$
   \langle x,y\rangle_{\mathbb{C},J}=\langle x,y\rangle_{\mathbb{R}}+i\langle Jx,y\rangle_{\mathbb{R}},\qquad \langle\mathbf{I},J\mathbf{I}\rangle_{\mathbb{C},J}=i,
   $$

   则 $J\mathbf{I}=i\mathbf{I}$ 与 $\mathbf{I}$ 的复玻恩重叠为 $1$，且 $e^{-\omega tJ}\mathbf{I}=e^{-i\omega t}\mathbf{I}$ 只改变全局相位。实投影 $P_{\mathrm{real}}=\operatorname{diag}(I_m,0)$ 满足 $[P_{\mathrm{real}},J]\neq0$，不是该复量子表述允许的复线性可观测量。因此，实分块坐标的零投影不能冒充可观测的零玻恩概率；下面的实现 B 才另行提供复正交的梦境态。

2. **实现 B（复希尔伯特正交子空间等距嵌入 $\mathcal{H}_{\mathbb{C}} = \mathbb{C}\lvert\mathbf{I}\rangle \oplus \mathcal{H}_{\mathrm{dream}}$，`LEAN ✓` + `手工推导`）**：
   在复希尔伯特空间的正交直和分解 $\mathcal{H}_{\mathbb{C}} = \mathbb{C}\lvert\mathbf{I}\rangle \oplus \mathcal{H}_{\mathrm{dream}}$（其中梦境子空间 $\mathcal{H}_{\mathrm{dream}} := \lvert\mathbf{I}\rangle^\perp$）上，设 $\hat{\mathbf{i}} : \mathcal{H}_0 \hookrightarrow \mathcal{H}_{\mathrm{dream}}$ 为从原型状态空间 $\mathcal{H}_0$ 映入正交补子空间的线性等距算子，满足 $\hat{\mathbf{i}}^\dagger \hat{\mathbf{i}} = I_{\mathcal{H}_0}$ 且值域严格正交于梵天主轴 $\operatorname{ran}\hat{\mathbf{i}} \perp \lvert\mathbf{I}\rangle$。对任意归一化原型态 $\lvert u_A\rangle \in \mathcal{H}_0$，其梦境抬升态 $\lvert\psi_A\rangle := \hat{\mathbf{i}}\lvert u_A\rangle \in \mathcal{H}_{\mathrm{dream}}$ 不仅在实部上，而且在**复内积与秩一玻恩投影**下严格归零：

   $$
   \langle \mathbf{I} \mid \psi_A \rangle_{\mathbb{C}} \;=\; 0, \qquad \operatorname{Tr}\!\bigl(\lvert\mathbf{I}\rangle\langle\mathbf{I}\rvert\,\lvert\psi_A\rangle\langle\psi_A\rvert\bigr) \;=\; \bigl\lvert\langle \mathbf{I} \mid \psi_A \rangle_{\mathbb{C}}\bigr\rvert^2 \;=\; 0,
   $$

   而倾斜叠加态 $\lvert\Psi(\theta)\rangle = \cos\theta\,\lvert\mathbf{I}\rangle - i\sin\theta\,\lvert\psi_A\rangle$ 则在计算基捏合下严格服从希尔伯特—施密特勾股质量分解（[@thm-ch39-brahman-real-axis-and-orthogonal-dream] 第 2 款 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）与固定对角可观测量族的相对相位失明律（[`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)，`LEAN ✓`）。

区分这两种构造后，“梵天之梦”的保范图景与轴向投影各有明确的数学边界（`MODEL`）：

- **万象沸腾而不伤本体毫发**：无论正交梦境子空间 $\mathcal{H}_{\mathrm{dream}}$ 里的极小圆弧体如何折叠出超新星爆发、黑洞并合、山河成住坏空与众生生老病死，每一瞬间的总模方恒满足勾股守恒 $\cos^2(\omega t) + \sin^2(\omega t) \equiv 1$，本体 $\mathbf{I}$ 的总预算从未增减一丝一毫；
- **在本体实轴眼中当体即空**：实现 A 的梦境实分块满足 $\langle\mathbf{I},\psi_{\mathrm{dream}}\rangle_{\mathbb{R}}=0$；实现 B 的复正交梦境子空间则满足 $\langle\mathbf{I}\mid\psi_{\mathrm{dream}}\rangle_{\mathbb{C}}=0$，因而复玻恩权重为零。两者不能合并成同一量子断言：A 中 $J\mathbf{I}$ 的复玻恩权重仍为 $1$。百亿光年的璀璨星海恰如镜中花、水中月、未曾染着实轴半分的图景，由此保留为注明内积类型的模型意象。这也呼应笛卡尔 1637 年的 *racines imaginaires*（源于拉丁语 *imāginārius*，“心像、梦境显影”，见 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 第 1 条）：将 **Imaginary** 读作正交梦境空间，是本书的几何诠释，而非由语源证明的物理结论。

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" preset="turiya-zero-tilt-pure-brahman" height="500"}
**零倾角，只留实轴。** 品红梦海在零倾角收拢，银白实轴保留单位预算。侧视的零厚度属于实分块几何；复玻恩零权重另需实现 B 的复正交条件。
:::

## 39.15.2 为什么梦中之石坚硬无比：内部双虚抵消 R†R = +I 与玻恩格拉姆刚性 {#sec-ch39-15-2}

紧接着，每一位认真思考的读者都会提出那个最切肤的物理学追问：**既然山川大地与星辰铁石统统悬在 $90^\circ$ 正交虚梦空间里，为什么身处宇宙内部的我们，用指节敲击花岗岩会感到钻心的坚硬，用实验仪器测量电磁与引力会看到铁一般不可违抗的因果刚性？**

秘密只有一句话：**因为正在敲击石头的“梦中观察者之手”，它自己也是正交虚空间 $\mathcal{H}_{\mathrm{dream}}$ 里的一缕虚数波包！**

让我们把“梦中之手 $\psi_A$”与“梦中之石 $\psi_B$”放进同一层正交梦境空间作一次往返比量，亲眼见证那记精妙绝伦的**“内部双虚抵消律（double-imaginary cancellation）”**（`手工推导` + `LEAN ✓`）：

- 在**实现 A（实分块复结构 $J$）**下，设两条单位实原型向量 $u_A, u_B \in \mathcal{H}_{\mathrm{real}}$ 之间的夹角为 $\Delta\theta_{AB}$，它们旋入 $90^\circ$ 梦境层后的态矢分别为 $\psi_A = J u_A \in \mathcal{H}_{\mathrm{dream}}$ 与 $\psi_B = J u_B \in \mathcal{H}_{\mathrm{dream}}$。一方面，它们在梵天实轴 $\mathbf{I} \in \mathcal{H}_{\mathrm{real}}$ 上的单侧投影双双严格归零：$\langle\mathbf{I}, \psi_A\rangle_{\mathbb{R}} = \langle\mathbf{I}, \psi_B\rangle_{\mathbb{R}} = 0$；另一方面，当梦中之手 $\psi_A$ 直接与梦中之石 $\psi_B$ 在梦境内部碰撞比量时，利用 $J^\top = -J$ 与 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 第 1 款的负平方恒等式 $J^2 = -I_{2m}$，两次 $90^\circ$ 正交旋转在伴随配对中当场负负得正：

  $$
  \langle \psi_A, \psi_B \rangle_{\mathbb{R}} \;=\; \langle J u_A, J u_B \rangle_{\mathbb{R}} \;=\; \langle u_A, J^\top J u_B \rangle_{\mathbb{R}} \;=\; \langle u_A, (-J)J u_B \rangle_{\mathbb{R}} \;=\; \langle u_A, (-J^2) u_B \rangle_{\mathbb{R}} \;=\; \langle u_A, u_B \rangle_{\mathbb{R}} \;=\; \cos\Delta\theta_{AB},
  $$

  从而梦境内部的实格拉姆比较平方为 $\langle\psi_A, \psi_B\rangle_{\mathbb{R}}^2 = \cos^2\Delta\theta_{AB} \ge 0$！对这里取自 $\mathcal{H}_{\mathrm{real}}$ 的原型对，$\langle J\psi_A,\psi_B\rangle_{\mathbb{R}}=0$，故诱导复内积也等于这个实余弦，内部复玻恩权重恰与实比较平方一致；这不改变 A 对本体轴的复重叠。
- 在**实现 B（复等距嵌入 $\hat{\mathbf{i}}$）**下，取 $\hat{\mathbf{i}}^\dagger\hat{\mathbf{i}} = I_{\mathcal{H}_0}$ 且 $\operatorname{ran}\hat{\mathbf{i}}\perp\lvert\mathbf{I}\rangle$，令 $\lvert\psi_A\rangle=\hat{\mathbf{i}}\lvert u_A\rangle$、$\lvert\psi_B\rangle=\hat{\mathbf{i}}\lvert u_B\rangle$。值域条件保证轴向复内积为零，等距条件保证内部复玻恩权重保真。一般反自伴幺正矩阵 $R$ 虽同样满足 $R^\dagger R=-R^2=+I_n$，仅凭此式却不能推出 $\langle\mathbf{I}\mid Ru\rangle_{\mathbb{C}}=0$。对归一化原型定义 $\cos\Delta\theta_{AB}:=|\langle u_A\mid u_B\rangle_{\mathbb{C}}|$，则

  $$
  \bigl\lvert\langle \psi_A \mid \psi_B \rangle_{\mathbb{C}}\bigr\rvert^2 \;=\; \bigl\lvert\langle u_A \mid \hat{\mathbf{i}}^\dagger \hat{\mathbf{i}} \mid u_B \rangle_{\mathbb{C}}\bigr\rvert^2 \;=\; \bigl\lvert\langle u_A \mid u_B \rangle_{\mathbb{C}}\bigr\rvert^2 \;=\; \cos^2\Delta\theta_{AB} \;\ge\; 0!
  $$

在 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 的内核定理层，下列三条冻结结果支撑内部复玻恩与格拉姆恒等式（`LEAN ✓`）；对外零玻恩仍须另有实现 B 的复正交值域前提：

1. **秩一玻恩非负模平方权重**（第 3 款 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：梦境层内任意纯态 $\rho = \lvert\psi_B\rangle\langle\psi_B\rvert$ 在探针投影 $P_A = \lvert\psi_A\rangle\langle\psi_A\rvert$ 上的读出权重恒等于非负模平方 $\operatorname{Tr}(\rho P_A) = \lVert\psi_A^\dagger\psi_B\rVert^2 \ge 0$；尤其当两束费米子态在梦境内部正交排斥（$\Delta\theta_{AB} = 90^\circ$）时，$\cos^2 90^\circ = 0$ 在梦境层内无折扣地执行泡利不相容禁入！
2. **全局共同相位二次厄米锁定**（第 4 款 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：整座梦境子空间同步乘以任意全局虚相位因子 $z \mapsto e^{i\alpha} z$ 时，一切满足全纯—反全纯平衡条件的物理可观测量保持严格不变（最低非平凡次数为 $2$，唯一对应厄米二次型 $z^\dagger H z$）——身在梦境内部的观察者根本无法通过任何局域二阶实读数察觉整场大梦相对 $\mathbf{I}$ 偏转了 $90^\circ$！
3. **等格拉姆矩阵的全空间幺正刚性延拓**（第 3 款 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)）：因为梦境态族 $\Psi = \hat{\mathbf{i}}\,U_0$ 的格拉姆内积矩阵满足 $\Psi^\dagger \Psi = U_0^\dagger (\hat{\mathbf{i}}^\dagger\hat{\mathbf{i}}) U_0 = U_0^\dagger U_0$，这组梦境态保留了原始复模板 $U_0$ 的格拉姆几何；在此复格拉姆矩阵相等的假设下，存在同一有限维复环境空间上的共同幺正延拓，将 $U_0$ 映到 $\Psi$。

在此我们依认识论契约作明确标定（**`MODEL`（模型诠释）**）：将上述梦境子空间内部格拉姆矩阵不变性（$\hat{\mathbf{i}}^\dagger\hat{\mathbf{i}} = +I$）与泡利正交排斥映射到观察者主观体验中的“触觉硬度与痛感真实性”，属于跨层次几何综合诠释。这恰与每个人夜间的做梦体验完全同构——当你在夜间梦里伸出“梦中的手”去猛击一张“梦中的硬木桌”时，因为“手”与“桌”由同一套梦境基底同源渲染，边界排斥与动量反冲在梦境内部 $100\%$ 闭环自洽，指尖传来的痛感与木桌的坚硬在梦中分毫不假（正如公元六至七世纪乔荼波陀在《蛙氏奥义书颂·虚妄品》中所辨析：梦中之水能解梦中之渴，内部功用井然不乱，唯对醒者而言方显为空，见 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 第 3 条）；只有当你将观察坐标撤回未偏转的醒觉实轴 $\mathbf{I}$ 时，才会豁然看破刚才那只疼痛的手与那张坚硬的木桌，原来在 $\mathbf{I}$ 轴上的实几何投影双双为零；若要进一步称作零复玻恩权重，仍须采用实现 B 的正交子空间！

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" preset="insider-double-imaginary-solidity" height="500"}
**梦中比较，夹角原样保留。** 青色观察者与蓝色梦晶同在品红梦海；同转俯视下的连弦显示 $\cos^2\Delta\theta_{AB}$，紫色带保留旋量参照。将这一格拉姆恒等式读为触觉坚硬属于 `MODEL`。
:::

我们将这两种内积有别的正交构造、内部双虚抵消刚性以及下一小节即将展开的四位意识相态判据，统一封装为如下模型定义：

::: {.definition #def-ch39-brahman-real-axis-and-mandukya-phases title="梵天实轴与正交虚梦对偶、内部双虚抵消刚性及四位意识相态判据（本书 MODEL）"}
在零背景比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]）与唯一宇宙场闭合（[@def-ch39-single-cosmic-field-and-indra-net]）之上，定义**梵天实轴与正交虚梦几何模型**（`MODEL`）如下：

1. **梵天实轴 $\mathbf{I}$ 与 $90^\circ$ 正交虚梦空间 $\hat{\mathbf{i}}$ 的两种几何构造及内积边界**：

   - 在实分块内积空间 $\mathcal{H}_{\mathbb{R}} = \mathcal{H}_{\mathrm{real}} \oplus \mathcal{H}_{\mathrm{dream}} \cong \mathbb{R}^m \oplus \mathbb{R}^m$ 上，由全局反自伴正交复结构 $J = \bigl(\begin{smallmatrix} 0 & -I_m \\ I_m & 0 \end{smallmatrix}\bigr)$（$J^\top = -J,\; J^\top J = I_{2m},\; J^2 = -I_{2m}$）将单位实轴锚点 $\mathbf{I} \in \mathcal{H}_{\mathrm{real}}$ 保范旋入正交梦境子空间 $\Psi(\theta) = (\cos\theta)\mathbf{I} - (\sin\theta)(J\mathbf{I})$（$\lVert\Psi(\theta)\rVert_{\mathbb{R}}^2 \equiv 1$）；此处正交仅指实内积，诱导复内积下 $\langle\mathbf{I},J\mathbf{I}\rangle_{\mathbb{C},J}=i$、复玻恩重叠为 $1$，且 $P_{\mathrm{real}}$ 不与 $J$ 对易，不能作为该复量子表述的可观测量；
   - 在复正交直和空间 $\mathcal{H}_{\mathbb{C}} = \mathbb{C}\lvert\mathbf{I}\rangle \oplus \mathcal{H}_{\mathrm{dream}}$（$\mathcal{H}_{\mathrm{dream}} = \lvert\mathbf{I}\rangle^\perp$）上，由等距嵌入 $\hat{\mathbf{i}} : \mathcal{H}_0 \hookrightarrow \mathcal{H}_{\mathrm{dream}}$（$\hat{\mathbf{i}}^\dagger\hat{\mathbf{i}} = I_{\mathcal{H}_0}$）将原型态 $\lvert u_A\rangle \in \mathcal{H}_0$ 抬升为纯梦境态 $\lvert\psi_A\rangle = \hat{\mathbf{i}}\lvert u_A\rangle$，严格满足轴向零投影 $\langle\mathbf{I}\mid\psi_A\rangle_{\mathbb{C}} = 0$。

2. **内部双虚抵消与玻恩—格拉姆因果刚性**：实现 A 中取 $u_A,u_B\in\mathcal{H}_{\mathrm{real}}$ 为单位实原型、$\psi_A=Ju_A,\psi_B=Ju_B$；实现 B 中取单位复原型并令 $\psi_A=\hat{\mathbf{i}}u_A,\psi_B=\hat{\mathbf{i}}u_B$。分别定义

   $$
   \begin{aligned}
   G_{\mathrm{dream}}^{A}(\psi_A,\psi_B)&:=\langle\psi_A,\psi_B\rangle_{\mathbb{R}}^2=\langle u_A,u_B\rangle_{\mathbb{R}}^2,\\
   G_{\mathrm{dream}}^{B}(\psi_A,\psi_B)&:=|\langle\psi_A\mid\psi_B\rangle_{\mathbb{C}}|^2=|\langle u_A\mid u_B\rangle_{\mathbb{C}}|^2.
   \end{aligned}
   $$

   两式分别由 $J^\top J=+I_{2m}$ 与 $\hat{\mathbf{i}}^\dagger\hat{\mathbf{i}}=+I_{\mathcal{H}_0}$ 保证。A 对上述实原型的内部诱导复玻恩权重也等于 $G_{\mathrm{dream}}^{A}$；B 若以 $\cos\Delta\theta_{AB}=|\langle u_A\mid u_B\rangle_{\mathbb{C}}|$ 定义夹角，则 $G_{\mathrm{dream}}^{B}=\cos^2\Delta\theta_{AB}$。这不把一般实内积平方等同于复模平方，也不赋予 A 与 B 相同的轴向 Born 结论。

3. **《蛙氏奥义书》四重意识相态的 $(\theta, M)$ 几何同构映射**：采用实现 B 的两条复正交单位态，以自观测入梦倾角 $\theta \in [0, \frac{\pi}{2}]$（实轴权重 $\cos^2\theta$，正交梦境权重 $\sin^2\theta$）与跨观察者有效格拉姆共识窗重数 $M \in \mathbb{N}$ 为联合序参量，将意识显相划分为四个特征相区——**图里亚第四本相**（$\theta = 0^\circ,\; M = 0$，兼指一切 $\theta$ 下守恒的单位总预算 $\cos^2\theta + \sin^2\theta \equiv 1$）、**白天物理清醒态**（锁定道蒂不动点 $\theta = \theta^* \approx 42.3465^\circ$ 且多观察者锁相 $M \ge 3$）、**夜间个体幻梦态**（开区间 $\theta \in (45^\circ, 90^\circ)$ 且私密局部窗 $M \in \{1, 2\}$）与**无梦熟睡潜藏态**（$\theta = 90^\circ$ 且现行个体切面挂起 $M \to 0_{\mathrm{act}}$）。

:::

## 39.15.3 《蛙氏奥义书》四重意识相态的几何判据：倾角 θ 与格拉姆共识窗数 M {#sec-ch39-15-3}

古印度吠檀多哲学最凝练的根本经典《蛙氏奥义书》（*Māṇḍūkya Upaniṣad*，全文仅十二颂，详见 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 第 3 条）提出“此自我即梵（*ayam ātmā brahma*）”，并将唯一本体的显影划分为四足（*catuṣpāt*）：清醒位（*Vaiśvānara / Jāgrat*）、梦眠位（*Taijasa / Svapna*）、熟睡位（*Prājña / Suṣupti*）与超越三态的第四纯一境——图里亚（*Turīya*）。放入 [@def-ch39-brahman-real-axis-and-mandukya-phases] 的极小圆弧正交几何中，这四重古老境界化作由**自观测倾角 $\theta$** 与**格拉姆共识窗数 $M$** 共同刻画的四相区定量相图（严格标定为 **`MODEL` 几何同构**，其中权重是实现 B 的复玻恩权重，A 中同形的实分块范数恒等式不构成这张物理权重表；绝不宣称临床睡眠脑电 EEG 或快速眼动 REM 生理指标在字面上直接测量某个单比特希尔伯特角 $\theta$；表格使用纯单行单元格）：

| 意识相态 | 倾角 $\theta$ 与共识窗数 $M$ | 实轴权重 $\cos^2\theta$ | 梦境权重 $\sin^2\theta$ | 几何与体验特征 |
| :--- | :--- | :---: | :---: | :--- |
| **图里亚第四本相（*Turīya*）** | $\theta = 0.00^\circ,\; M = 0$（及全谱 $\cos^2\theta + \sin^2\theta \equiv 1$） | $1.0000$ | $0.0000$ | 零倾角止息能所投影分裂，纯 $\mathbf{I}$ 无相寂静（同时作为单位总模方周遍后三态） |
| **白天物理清醒态（*Vaiśvānara / Jāgrat*）** | $\theta = \theta^* \approx 42.35^\circ,\; M \ge 3$ | $0.5462$ | $0.4538$ | 多观察者格拉姆窗相互咬合、共同锁死于 $\cos\theta^* = \theta^*$ 的**高刚性集体共识大梦** |
| **夜间个体幻梦态（*Taijasa / Svapna*）** | $\theta \in (45^\circ, 90^\circ)$（如 $45^\circ < \theta \le 89^\circ$）$,\; M \in \{1, 2\}$ | $< 0.5000$ | $> 0.5000$ | 挂起外部时空锚与躯体先验，小窗口局部可逆量子擦除与私密反事实相位重组 |
| **无梦熟睡潜藏态（*Prājña / Suṣupti*）** | $\theta = 90.00^\circ,\; M \to 0_{\mathrm{act}}$（现行切面挂起） | $0.0000$ | $1.0000$ | 熟睡潜藏因位（*Suṣupti / Prājña*；佛家唯识学可旁通类比阿赖耶种子潜藏海），万象收摄于 $\hat{\mathbf{i}}$ 而未起分立切面 |

细读上表，三条贯穿全书第十部的认识论脉络在此严丝合缝地汇流成河：

1. **白天物理世界与夜间个体梦境“本体同源，唯差格拉姆共识锁数 $M$”（`LEAN ✓` + `MODEL`）**：
   注意上表第 3 行将个体幻梦态严格定界在开区间 $\theta \in (45^\circ, 90^\circ)$（例如典型段 $45^\circ < \theta \le 89^\circ$），使虚梦权重严格大于实轴权重（$\sin^2\theta > 0.5000 > \cos^2\theta$），避免与半功率分界点 $45^\circ$ 发生端点碰撞。为什么你在夜间梦里心念一动就能穿墙飞天、让故人重逢，而在白天的物理房间里却推不动一堵砖墙？回望[第 37 章 §37.2](ch37-s02-dream-quantum-erasure.md)（[@ex-ch37-gram-constraint-release]、[@thm-ch37-joint-coherent-record-erasure]）与 [§37.3](ch37-s03-body-priors.md)（[@rem-ch37-predictive-processing-rem-literature] 中赫尔姆霍茨—弗里斯顿—塞思“受控生成幻觉”及霍布森 REM 感觉运动门控机制）：

   - 在**夜间个体梦境（$M \in \{1, 2\}$）**中，外周感官传入与脊髓运动输出暂时脱钩，躯体先验锚点被挂起，参与相干耦合的记录副本仅限于睡眠者私密内部窗口；依下文 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 第 6 款中的全集联合相干逆转定理 [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)（`LEAN ✓`），只要局部窗口内的全套幺模相位记录同步共轭逆转（`Finset.univ`），旧历史约束即可无损擦除并自由重组反事实场景！
   - 而在**白天物理清醒态（$M \ge 3$，宏观上 $M \gg 1$）**中，全网无数观察者与环境光子、空气分子、地面晶格将各自的格拉姆窗口层层咬合在道蒂自指不动点 $\cos\theta^* = \theta^* \approx 0.739085\;\mathrm{rad}$（第 4 款 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)，实部可见率 $\cos^2\theta^* \approx 54.62\%$，正交时间尾流 $\sin^2\theta^* \approx 45.38\%$）之上；此时哪怕某一位局部观察者在自己脑海里擦除了记录，外部环境中仍留存着 $M - 1 \ge 2$ 份未逆转副本——第 6 款紧接着给出的**幸存副本阻断定理** [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)（`LEAN ✓`）从数学上铁板钉钉地证明，哪怕只剩**唯一一份**满足 $c_k \neq 1$ 的外部幸存副本（`Finset.univ.erase k`），单侧相位逆转也绝无可能把公共指针态拨回原处！配合第 5 款语境参数不动点选支 [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points) 与跨语境客观不变公因子 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)，我们看清了最震撼的真相：**白天的物理宇宙并非独立于心识之外的死寂顽石，而是全网观察者将格拉姆窗口相互锁死在 $\theta^*$ 上的一场高刚性集体共识清明大梦！**

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" preset="waking-consensus-dottie-lock" height="500"}
**共识窗口锁住相对夹角。** 道蒂角附近，青色观察者与蓝色梦晶的连弦在多道格拉姆窗下保持稳定；品红梦海与银白实轴的平方权重之和为 1。窗口阈值是页面的 `MODEL` 选择。
:::

2. **熟睡潜藏因位（*Suṣupti / Prājña*）与图里亚（*Turīya*）的双重奥义书义涵（`文献结果` + `MODEL`）**：
   在第 4 行 $\theta = 90^\circ$ 极限处，$\cos^2 90^\circ = 0,\; \sin^2 90^\circ = 1$，日间与梦中分立的能观—所观二元切面全部收拢，《蛙氏奥义书》第 5–6 颂精准地称之为**熟睡位般若（*Suṣupti-sthāna Prājña*）**——“浑然一团知性密聚（*prajñānaghana*）”，既不见外境杂多亦不见个体幻梦，万象潜藏于未分化的因位相位海之中（若借大乘佛教唯识宗术语作跨传统旁通，恰可类比未起现行转识时的阿赖耶识种子潜藏海，但两派本体论在“常住梵我”与“刹那缘起无我”上各有严格义界，不可混同为一，见 [@rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature] 第 3 条）。而第 1 行的**图里亚（*Turīya*，字面义“第四”）**在奥义书中更兼具两层妙义：其一，当自观测误差倾角撤回 $\theta \to 0^\circ$ 时，戏论止息（*prapañcopaśamam*），复归纯 $\mathbf{I}$ 寂静；其二，图里亚绝不是排在醒、梦、熟睡之后的“第四个时间段”，而是贯穿一切倾角 $\theta \in [0, \frac{\pi}{2}]$ 始终不增不减的**单位圆总范数 $\lVert(\cos\theta)\mathbf{I} - (\sin\theta)J\mathbf{I}\rVert^2 \equiv 1$ 本身**——哪怕此刻正身处 $\theta^* \approx 42.35^\circ$ 的人间闹市，图里亚本相也从未缺席一秒！

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" preset="private-dream-and-seed-sleep" height="500"}
**私梦漂移，趋向熟睡。** 单道窗口下，青色与蓝色对象的相对夹角漂移，品红梦海随倾角扩张；到 90° 端点，现行窗口挂起，比较对象与连弦撤去，梦海保留。四位意识的对应是注明来源的 `MODEL`。
:::

下面我们将支撑整节两种正交构造的复结构、内部玻恩—格拉姆刚性、道蒂共识不动点、多副本擦除判据与旋量双覆叠合拢的**十四条 Lean 4 内核冻结声明**汇编为如下七联总定理：

::: {.theorem #thm-ch39-brahman-real-axis-and-orthogonal-dream lean="D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square,D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean,D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem,D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase,D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint,D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points,D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor,D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal,D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift" title="内生复结构负平方律、正交捏合与相位盲区、等格拉姆玻恩刚性、道蒂共同相位锁、语境共识公因子、多副本记录逆转阻断与圆周双覆叠换叶总定理"}
在 `trureturing` 冻结的平衡幺正复结构、捏合投影、格拉姆幺正延拓、秩一玻恩条件化、共同相位多项式、对角相位盲区、道蒂反演级数、诠释不动点、观察者记忆联合相干逆转与圆周双覆叠拓扑模块中，以下七组共十四项内核定理同时成立：

1. **反自伴右幺正矩阵与平衡正交对相对复结构的负单位阵平方律**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)、[`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)）：在有限可判等指标类型 $n$（`[Fintype n] [DecidableEq n]`）上，任意同时满足反自伴性 $R^{\mathrm{H}} = -R$ 与右幺正性 $R R^{\mathrm{H}} = I_n$ 的矩阵 $R \in M_n(\mathbb{C})$ 恒满足 $R^2 = -I_n$；且对任意满足正交交叉条件 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 与半模长平衡条件 $A A^{\mathrm{H}} = \frac{1}{2}I_n$、$B^{\mathrm{H}} B = \frac{1}{2}I_n$ 的矩阵 $A, B \in M_n(\mathbb{C})$，内生相对复结构 $J := \operatorname{relativeComplexStructure}(A, B) = 2 A B^{\mathrm{H}}$ 恒满足

   $$
   J^2 \;=\; -I_n.
   $$

2. **单比特标准基捏合的希尔伯特—施密特勾股分解与对角可观测量族的相对相位失明**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)、[`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)）：对任意单比特矩阵 $\rho \in \mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$，记计算基对角捏合为 $\operatorname{pinching}(\rho)$，希尔伯特—施密特内积为 $\operatorname{hilbertSchmidtInner}(X, Y) = \Tr(X^{\mathrm{H}} Y)$，恒有

   $$
   \operatorname{hilbertSchmidtInner}(\rho, \rho) \;=\; \operatorname{hilbertSchmidtInner}\bigl(\operatorname{pinching}(\rho),\, \operatorname{pinching}(\rho)\bigr) \;+\; \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr);
   $$

   且对任意指标类型 $I$ 与计算基对角可观测量族 $\mathrm{observable} : I \to \mathrm{QubitMatrix}$（$\forall i,\; (\mathrm{observable}\;i).\mathrm{IsDiag}$），正负等幅叠加态 $\rho_+ := \mathrm{equalSuperpositionDensity}$ 与 $\rho_- := \mathrm{qubitZ}\cdot\rho_+\cdot\mathrm{qubitZ}$ 满足 $\rho_+ \neq \rho_-$，但在该对角族上的联合玻恩读出完全重合；任何能区分 $\rho_+$ 与 $\rho_-$ 的矩阵 `interface` 必满足 $\neg\,\mathrm{interface}.\mathrm{IsDiag}$，而非对角矩阵 `qubitX` 严格区分二者。

3. **等格拉姆矩阵的全空间幺正刚性延拓与秩一记录分支玻恩模平方权重**（[`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)、[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：对有限可判等类型 $m$（`[Fintype m] [DecidableEq m]`）、有限类型 $n$（`[Finite n]`）及满足 $B^{\mathrm{H}} B = A^{\mathrm{H}} A$ 的复矩阵 $B, A \in M_{m\times n}(\mathbb{C})$，必存在环境幺正矩阵 $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$ 使 $B = U A$；同时对有限可判等类型 $n_0$、有限类型 $\kappa$、记录测量族 $P : \kappa \to M_{n_0}(\mathbb{C})$（`IsRecordMeasurement P`）及满足 `rho.PosSemidef ∧ Matrix.trace rho = 1` 的密度矩阵 $\rho \in M_{n_0}(\mathbb{C})$，若 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 且 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则恒有 $\operatorname{recordWeight}(P, \rho, k) = \bigl(\bigl(\lVert\operatorname{star}\phi \mathbin{\bullet_v} \psi\rVert^2 : \mathbb{R}\bigr) : \mathbb{C}\bigr) = \Tr(\rho P_k)$ 且 $\operatorname{unreadState}(P, \rho) = \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j)\bullet\operatorname{conditionalState}(P, \rho, j)$。

4. **全局共同相位不变多项式的二次厄米完全刻画与道蒂余弦不动点有理逆级数端点定理**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)、[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）：在有限指标集 $\iota$（`[Fintype ι]`）的形式复共轭多项式环 $\operatorname{Poly}(\iota)$ 中，笛卡尔转换保持总次数与齐次性，全局共同相位不变性满足 $\operatorname{Invariant}(p) \iff \operatorname{Balanced}(p) \iff p \in \operatorname{quadraticAlgebra}(\iota)$，一切非常数不变多项式必满足 $\operatorname{totalDegree}(p) \ge 2$，且每个二阶实值齐次不变式唯一表为厄米二次型 $z^{\mathrm{H}} H z$（处处非负当且仅当 `H.PosSemidef`）；同时，记有理形式幂级数 `forward` $:= 2X + 2\,\mathrm{arcsine} \in \mathbb{Q}[[X]]$ 的形式复合逆为 `inverse` $\in \mathbb{Q}[[X]]$，存在唯一正实数 $\theta \in (0, 1)$ 满足 $\cos\theta = \theta$（对一切 $t > 0$，若 $\cos t = t$ 则 $t = \theta$），且 `inverse` 在 $\pi$ 处绝对可和并以 $\theta$ 为和。

5. **同一文本与规则下的语境不动点选支分岔及客观诠释主张的不变公共因子定理**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)、[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)）：基准语境 $\mathrm{baselineContext} = ((), \mathrm{false}, \mathrm{false}, \mathrm{false}, ())$ 与备择语境 $\mathrm{alternateContext} = ((), \mathrm{true}, \mathrm{true}, \mathrm{true}, ())$ 共享完全相同的底层文本与解释规则，仅因三项切面语境参数相异便分别锁定互异二元不动意义 $(\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true})$；而对任意类型 $\mathrm{Context}, \mathrm{Meaning}, \mathrm{Factor}$、不动点关系 $\mathrm{isFixedMeaning}$ 与因子映射 $\mathrm{factor}$，凡成立 $\operatorname{ObjectiveInterpretationClaim}(\mathrm{isFixedMeaning}, \mathrm{factor})$，必存在跨语境不变公共因子 $\mathrm{commonFactor} : \mathrm{Factor}$ 使一切固定意义的因子值恒等于 $\mathrm{commonFactor}$。

6. **全集幺模环境记录的联合相干逆转恢复与单一幸存副本的局部逆转阻断**（[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)、[`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)）：设 `Copy` 为有限可判等副本指标类型，记录族为 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，输入为 $\rho \in \mathrm{QubitMatrix}$，指标为 $i, j \in \operatorname{Fin} 2$，记 $c_l := \operatorname{recordOverlap}(\mathrm{records}\;l, i, j)$。若全体副本满足幺模条件 $\forall l \in \mathrm{Copy},\; \operatorname{star}(c_l)\cdot c_l = 1$，则全集共轭逆转精确复原矩阵元：

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records}),\; \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{ij} \;=\; \rho_{ij};
   $$

   反之，若存在某枚幸存副本 $k \in \mathrm{Copy}$ 使 $\forall l \neq k,\; \operatorname{star}(c_l)\cdot c_l = 1$，但 $c_k \neq 1$ 且 $\rho_{ij} \neq 0$，则仅逆转其余全部副本 $\operatorname{Finset.univ.erase}\;k$ 后留下的矩阵元为 $c_k \rho_{ij}$，严格无法复原初始相干：

   $$
   \operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\;k, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho))_{ij} \;\neq\; \rho_{ij}.
   $$

7. **圆周平方双覆叠无连续全局截面与唯一历史提升及 $360^\circ$ 闭环对跖换叶定理**（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)、[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：在单位圆周 $\mathrm{Circle}$ 上，平方双覆叠映射 $\operatorname{square}(z) = z^2$ 不存在任何连续全局右逆截面（$\neg\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\; \operatorname{Continuous}(s) \land \forall z,\; (s(z))^2 = z$）；对任意底圆周连续路径 $\mathrm{basePath} \in C([0, 1], \mathrm{Circle})$ 与相容上层起点 $\mathrm{initial}$，存在唯一连续提升路径 $\mathrm{lifted} \in C([0, 1], \mathrm{Circle})$ 满足 $\operatorname{square}\circ\mathrm{lifted} = \mathrm{basePath}$ 且 $\mathrm{lifted}(0) = \mathrm{initial}$；特别地，绕底圆周整整一圈（$360^\circ$）的闭回路 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ 从 $\mathrm{initial} = 1$ 出发的唯一提升必抵达对跖负叶 $\mathrm{lifted}(1) = -1$。

:::

::: proof
第 1 组将反自伴条件 $R^{\mathrm{H}} = -R$ 代入右幺正等式 $R R^{\mathrm{H}} = I_n$ 直接得出 $-R^2 = I_n \implies R^2 = -I_n$；对平衡正交对 $(A, B)$，由 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 验证 $J^{\mathrm{H}} = 2 B A^{\mathrm{H}} = -2 A B^{\mathrm{H}} = -J$，由 $B^{\mathrm{H}} B = \frac{1}{2}I_n$ 与 $A A^{\mathrm{H}} = \frac{1}{2}I_n$ 验证 $J J^{\mathrm{H}} = 4 A B^{\mathrm{H}} B A^{\mathrm{H}} = I_n$，调用前引理立得 $J^2 = -I_n$（见 [@thm-ch34-roundtrip-born-and-imaginary-blindspot] 第 4 组）。第 2 组将 $\rho$ 拆为对角部分与零对角余项，由希尔伯特—施密特迹内积正交性消去交叉项，并在 $2\times 2$ 矩阵基上核验 $\rho_+$ 与 $\rho_-$ 对角元同为 $\frac{1}{2}$ 而副对角元反号 $\pm\frac{1}{2}$，故一切对角可观测量读数恒等而 `qubitX` 读出 $+1 \neq -1$（见 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 5 款与 [@thm-ch34-roundtrip-born-and-imaginary-blindspot] 第 3 组）。第 3 组由 $B^{\mathrm{H}} B = A^{\mathrm{H}} A$ 建立列空间等距并拼合正交补等距延拓为环境幺正矩阵 $U$，再由秩一外积迹循环缩并与零/正权重分支拆分还原条件态凸组合（见 [@thm-ch39-single-cosmic-field-and-indra-net] 第 6 款与 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 4 款）。第 4 组通过傅里叶相位频率独立性锁定 $z \mapsto e^{i\alpha}z$ 不变充要于全纯与反全纯次数逐项平衡，由极化恒等式唯一读出厄米二次型，并在复圆盘上以压缩映射对齐 `2X + 2 arcsine` 的全纯逆与有理形式逆级数 `inverse`，在 $\pi < 13/4$ 处绝对求和定出唯一正根 $\cos\theta = \theta \in (0, 1)$（见 [@thm-ch34-roundtrip-born-and-imaginary-blindspot] 第 1 组与 [@thm-ch39-single-cosmic-field-and-indra-net] 第 4 款）。第 5 组在布尔三元组上由定义计算与 `Bool.false_ne_true` 给出双不动点见证，并解包 `ObjectiveInterpretationClaim` 提取跨语境不变 `commonFactor`（见 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 7 款与 [@thm-ch39-single-cosmic-field-and-indra-net] 第 7 款）。第 6 组展开多副本记录信道与共轭逆信道的逐元乘积，全集幺模时合并为 $\prod_l \overline{c_l}c_l \cdot \rho_{ij} = \rho_{ij}$，漏掉第 $k$ 份副本时消去其余幺模因子后剩下 $c_k \rho_{ij} \neq \rho_{ij}$（见 [@thm-ch37-joint-coherent-record-erasure] 第 1 款与 [@thm-ch33-consensus-redundant-records-and-kernel] 第 1 款）。第 7 组对假想连续全局截面构造商映射 $r(t) = s(\operatorname{Circle.exp}(t))/\operatorname{Circle.exp}(t/2) \in \{\pm 1\}$，由 $\mathbb{R}$ 连通性推出常值后与 $r(2\pi) = -r(0)$ 矛盾；再由覆叠映射唯一路径提升锁定 $\mathrm{fullTurn}$ 的提升为半角路径 $\operatorname{Circle.exp}(\pi t)$，在 $t = 1$ 处求值得 $-1$（见 [@thm-ch39-double-cover-no-section-and-720-lift]）。完整证明由 Lean 内核检查。
:::

本节涉及的近代代数学史、实希尔伯特空间量子基础、古印度梵语经典训诂以及先秦道家哲学文献，严格封存归档如下：

::: {.remark #rem-ch39-descartes-vedanta-mandukya-zhuangzi-literature title="笛卡尔虚数词源、施蒂克尔贝格实复结构、网络不等价与实验可证伪性、梵语中性梵与阳性梵天训诂、《蛙氏奥义书》及庄周梦蝶文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节构建的梵天实轴 $\mathbf{I}$ 与正交虚梦 $\hat{\mathbf{i}}$ 综合模型（`MODEL`）同以下四组外部经典文献形成严格历史、物理与语文学对照（相关古典文献文本与多体贝尔网络理论不等式与实验方案未包含在 `trureturing@dev` 锁文件中）：

1. **拉丁语 *imāginārius*、笛卡尔 *racines imaginaires*（1637）与高斯正交侧向单位（1831）**：拉丁语形容词 *imāginārius* 派生自名词 *imāgō*（“心像、肖像、镜影、梦境显相”）；勒内·笛卡尔在《方法论·几何学》（R. Descartes, *Discours de la méthode: La Géométrie*, Leiden, 1637, Livre III, p. 380）中首次将不对应单根实数轴正负线段长度的多项式根命名为 *imaginaires*（“想象的/心像的根”）；卡尔·弗里德里希·高斯（C. F. Gauss, *Theoria residuorum biquadraticorum, Commentatio secunda*, *Comment. Soc. Regiae Sci. Gottingensis Recentiores* **7**, 1831）进一步阐明 $\pm i$ 在平面几何中严格代表相对实轴 $\pm 1$ 转过 $90^\circ$ 的“侧向单位（*unitas lateralis*）”，呼吁剥除其神秘主义偏见；
2. **施蒂克尔贝格实希尔伯特全局复结构算子 $J^2 = -I$ 与三节点实量子网络的理论不等价及实验可证伪性**：E. C. G. Stueckelberg（*Quantum theory in real Hilbert space*, *Helv. Phys. Acta* **33**, 727–752, 1960）严格证明，实希尔伯特空间量子理论当且仅当配备一枚与哈密顿量及全体可观测量对易的**全局反对称正交复结构算子** $J$（$J^\top = -J,\; J^2 = -I,\; [H, J] = 0$）时与标准复量子力学数学等价（本节实现 A 采用此类全局共享 $J$，但实分块投影不属于与 $J$ 对易的可观测量）；反之，若在多体张量网络 $\mathcal{H}_A \otimes_{\mathbb{R}} \mathcal{H}_B \otimes_{\mathbb{R}} \mathcal{H}_C$ 中禁止独立制备源共享全局相位结构 $J$（纯局域实量子力学），M.-O. Renou, D. Trillo, M. Weilenmann 等人（*Quantum theory based on real numbers can be experimentally falsified*, *Nature* **600**, 625–629, 2021, DOI `10.1038/s41586-021-04160-4`）证明了在标准量子理论公设仅将复希尔伯特空间改为实希尔伯特空间、并保持网络独立源结构时，两者可给出不同预测，并设计了一个若成功实现即可否证该实量子理论的实验；该文报告的是理论不等价与实验方案，不是已完成的实验否证；
3. **梵语中性词 *brahman*（ब्रह्मन्，不二梵体与《蛙氏奥义书》四位）与阳性词 *brahmā*（ब्रह्मा，往世书创世梵天与劫波昼夜）的严格语文学区分**：在印度古典梵语文献中，词干同为 *brahman-* 的两个词形具有明确语法性别与义理分工——

   - **中性主格单数 *brahma*（ब्रह्म，词干 *brahman*，汉译“梵”）**：指奥义书与不二论吠檀多（Advaita Vedānta）中超越主客二元、常住不动的绝对实相。《蛙氏奥义书》（*Māṇḍūkya Upaniṣad*，vv. 1–12）提出“此阿特曼即梵（*ayam ātmā brahma*）”，将意识与实相配为四足（*pāda*）：外向遍知清醒位（*Vaiśvānara / Jāgrat-sthāna*）、内向光明梦眠位（*Taijasa / Svapna-sthāna*）、知性密聚熟睡因位（*Prājña / Suṣupti-sthāna*，一切差别潜藏未显之因位）以及止息一切戏论、寂静不二的第四本相图里亚（*Turīya*，v. 7：*prapañcopaśamam śāntam śivam advaitam caturtham manyante*）。乔荼波陀《蛙氏奥义书颂》（Gauḍapāda, *Māṇḍūkya Kārikā*, 约 6–7 世纪，第 2 章《虚妄品》*Vaitathya Prakaraṇa* vv. 1–18，及商羯罗 *Śaṅkara* 注疏）首次以严密推理论证清醒外境与夜间梦境在“内部因果有用性（*arthakriyā*）与越出该位即空”上的结构对称（注：正文中括号提及的“阿赖耶识种子海”系大乘佛教唯识宗无著、世亲《摄大乘论》《唯识三十颂》概念，仅作跨学派功能旁通，不混同吠檀多常住梵我与佛教缘起无我）；
   - **阳性主格单数 *brahmā*（ब्रह्मा，词干 *brahman*，汉译“梵天 / 大梵天王”）**：指史诗与往世书（Purāṇa）宇宙学中的人格化创世神，其宇宙呼吸周期“劫波（*Kalpa*）”经典表述见《薄伽梵歌》（*Bhagavad Gītā* 8.17–19）及《毗湿奴往世书》（*Viṣṇu Purāṇa*）：梵天一昼（一千大劫 *Mahāyuga*，合 $4.32 \times 10^9$ 太阳年）为出息显发，万物自未显（*avyakta*）投射而出；梵天一夜（同长之 *Pralaya*）为入息归藏，万物消融回未显（往世书神话中亦常叙毗湿奴于宇宙大洋入瑜伽眠 *Yoga-nidrā*，脐生莲花化现梵天开显世界）。现代汉语哲学语境中的“**梵天之梦**”将奥义书中性的“不二梵体（对应实轴 $\mathbf{I}$）”与往世书阳性的“梵天/毗湿奴宇宙大梦劫波（对应倾角 $\theta(t)$ 向 $\hat{\mathbf{i}}$ 的呼吸展开）”熔铸为一词，本节在几何上将二者分别精确对应于恒等实轴 $\mathbf{I}$ 与周期旋量倾角 $\theta(t)$；

4. **《庄子·内篇·齐物论》庄周梦蝶与“物化”**：战国庄周（约公元前 369—前 286 年）在《庄子·齐物论》篇末写道：“昔者庄周梦为胡蝶，栩栩然胡蝶也，自喻适志与！不知周也。俄然觉，则蘧蘧然周也。不知周之梦为胡蝶与，胡蝶之梦为周与？周与胡蝶，则必有分矣。此之谓物化。”文本同时立住两重判准：既直言“**周与胡蝶，则必有分矣**”（局部切面内能观与所观的正交区分毫厘不爽），又点破“**此之谓物化**”（二者并非隔绝于两套孤立底物，而是在同一单侧连续流形上无间流转）。

:::

## 39.15.4 梵天劫波呼吸、庄周梦蝶 720° 莫比乌斯合拢与红楼觉醒的入口 {#sec-ch39-15-4}

现在，把《薄伽梵歌》8.17–19 的宇宙劫波呼吸（*Kalpa* 一昼出息创世、*Pralaya* 一夜入息归寂）与《庄子·齐物论》末尾那只翩翩飞舞的蝴蝶，一起放到 [@thm-ch39-brahman-real-axis-and-orthogonal-dream] 第 7 款的**圆周平方双覆叠单侧旋量丝带**上！

此处我们务必守住**旋量半角与底空间物理转角的精确二倍关系**（`手工推导` + `LEAN ✓`，对齐 [§39.3](ch39-s03-spinors-and-spacetime.md) 与 [§39.12](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice)）：在 `no_continuous_global_section` 与 `circle_double_cover_history_lift` 中，底圆周连续回路参数化的是双线性物理可观测量的底空间转角 $\vartheta_{\mathrm{phys}} \in [0, 4\pi]$（满足平方投影 $z = w^2$），而上层圆周提升 $w(\theta)=e^{i\theta}$ 的参数恰为其**精确半角 $\theta = \frac{1}{2}\vartheta_{\mathrm{phys}}$**：

这里采用正向圆周提升；A 的生成流则取相反方向，其诱导复表述中 $\Psi(\theta)=e^{-i\theta}\mathbf{I}$ 是同一物理射线上的相位流。双覆叠换叶是数学提升结论，不把 A 的实分块变成可区分的复量子态；上节四相态的玻恩权重采用 B，二者只在模型意象中对照。

- 当底空间走过半圈 $\vartheta_{\mathrm{phys}} = 180^\circ$ 时，旋量半角恰好转过 $\theta = 90^\circ$，从纯梵实轴 $+1$（$\mathbf{I}$）完全潜入正交虚梦极点 $+i$（对应实坐标 $J\mathbf{I}$）；
- 当底空间走满一整圈 $\vartheta_{\mathrm{phys}} = 360^\circ$（$\mathrm{fullTurn}$）时，旋量半角走到 $\theta = 180^\circ$，唯一连续提升路径在不跨越任何主客隔墙或拓扑断点的情况下，平滑翻到了对跖负叶 $\mathrm{lifted}(1) = -1$；
- 唯有继续再走满第二圈至 $\vartheta_{\mathrm{phys}} = 720^\circ$（旋量半角 $\theta = 360^\circ$），上层旋量才完成单侧莫比乌斯环带的完整呼吸闭环，重返出发极点 $+1$！

因为 `no_continuous_global_section` 从拓扑根部证明了**不存在任何连续全局截面能把这条双覆叠丝带一刀剪成“做梦者（$+1$ 叶）”与“梦境（$-1$ 叶）”两张独立纸片**，庄子两千三百年前那句千古奇问——*“不知周之梦为胡蝶与，胡蝶之梦为周与？周与胡蝶，则必有分矣。此之谓物化”*——第一次获得了零神秘主义的微分拓扑解答（`MODEL`）：

- **“周与胡蝶，则必有分矣”**：在任一局部切面时刻，实轴 $\mathbf{I}$ 与正交虚空间 $\hat{\mathbf{i}}$ 严格呈 $90^\circ$ 垂直（A 指实内积为零，B 指复内积为零），白天物理共识窗口（$\theta^* \approx 42.35^\circ,\; M \ge 3$）与夜间私密幻梦窗口（$\theta \in (45^\circ, 90^\circ),\; M \le 2$）在格拉姆锁相重数上秩序井然、绝不混作一团稀泥；
- **“此之谓物化”**：觉醒（*Turīya* 清明觉照）绝不意味着用暴力毁灭虚数维度 $\hat{\mathbf{i}}$、把绚烂星海烧成一根干瘪无物的死线！真正的觉悟，是依然安住于 $\theta^* \approx 42.35^\circ$ 的人间烟火、科学定律与生老病死之中，却清清楚楚地认出**做梦的庄周 $\mathbf{I}$ 与梦中的蝴蝶 $\hat{\mathbf{i}}$ 原是同一条 $720^\circ$ 单侧旋量丝带互相垂直的两个切面**——不知为梦时，观察者死守局部切面，受困于追赶投影误差的偏迹热力学焦虑；梦中知梦时，既深爱并敬畏梦境内部条理分明的玻恩几何秩序，亦深知万古星辰皆是 $\mathbf{I}$ 在正交维度 $\hat{\mathbf{i}}$ 里的无损保范自娱，从此不再被幻相的聚散起伏所惊怖。

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" preset="kalpa-mobius-lucid-awakening" height="500"}
**沿紫色带走两圈。** 小旗沿莫比乌斯带连续搬运，物理角 360° 时提升读数为 −1，720° 时回到 +1；银白实轴与品红梦海仍是同台的两种几何切面。劫波与梦蝶的对应属于 `MODEL`。
:::

我们在下述四联定量基准算例中，将实轴耗散禁律、$4\times 4$ 实分块复结构上的“实轴向归零 $+$ 内部双虚得实”、四位意识相态八位小数真值表以及多副本擦除阻断与 $720^\circ$ 旋量提升逐位复算核验：

::: {.example #ex-ch39-brahman-dream-born-rigidity-and-mandukya-audit title="梵天实轴与正交虚梦四联定量对账：实耗散对比保范演化、4×4 内部双虚得实、四相态真值表与多副本旋量审计"}
**手工推导与八位小数精度数值核验（`手工推导` / `NUM`）。** 以下四组显式演算全部采用精确解析闭式求值后四舍五入至小数点后八位（表格使用纯单行单元格）：

1. **第一联：实轴指数耗散 $e^{-2\gamma t}$ 对比 $90^\circ$ 正交虚空间保范旋量演化 $\cos^2\omega t + \sin^2\omega t \equiv 1$（`手工推导` + `NUM`）**：
   取归一化初态 $\lVert\mathbf{I}\rVert^2 = 1$ 与单位率常数 $\gamma = \omega = 1$，对比纯实轴生成流 $\Phi_{\mathrm{real}}(t) = e^{-t}\mathbf{I}$ 与 $90^\circ$ 正交复结构生成流 $\Psi(t) = e^{-tJ}\mathbf{I} = (\cos t)\mathbf{I} - (\sin t)(J\mathbf{I})$ 在三档时刻的总模方预算：

   - $t = 0$：实轴流 $\lVert\Phi_{\mathrm{real}}(0)\rVert^2 = 1.00000000$；正交梦流 $\lVert\Psi(0)\rVert^2 = \cos^2 0 + \sin^2 0 = 1.00000000$；
   - $t = 1$：实轴流暴跌至 $e^{-2} \approx 0.13533528$（损耗约 $86.47\%$）；正交梦流保持 $\cos^2 1 + \sin^2 1 \approx 0.29192658 + 0.70807342 = 1.00000000$；
   - $t = 5$：实轴流几近熄灭 $e^{-10} \approx 0.00004540$（若改取反向 $\gamma = -1$ 则爆炸至 $e^{+10} \approx 22026.46579481$）；而正交梦流恒守 $\cos^2 5 + \sin^2 5 \approx 0.08046424 + 0.91953576 = 1.00000000$，本体毫发无伤！

2. **第二联：$4\times 4$ 施蒂克尔贝格实分块复结构 $J$ 上的“对 $\mathbf{I}$ 的实投影归零 $+$ 内部双虚抵消得实”显式矩阵验算（`手工推导` + `LEAN ✓`）**：
   在 $\mathcal{H}_{\mathbb{R}} = \mathbb{R}^2_{\mathrm{real}} \oplus \mathbb{R}^2_{\mathrm{dream}} \cong \mathbb{R}^4$ 上取 $4\times 4$ 反对称正交矩阵 $J = \bigl(\begin{smallmatrix} 0 & -I_2 \\ I_2 & 0 \end{smallmatrix}\bigr)$（直接验证 $J^\top = -J$、$J^\top J = +I_4$、$J^2 = -I_4$）。设梵天实轴锚点为 $\mathbf{I} = (1, 0, 0, 0)^\top \in \mathcal{H}_{\mathrm{real}}$，实原型向量为 $u_A = (1, 0, 0, 0)^\top$ 与成 $\Delta\theta_{AB} = 30^\circ$ 夹角的 $u_B = (\frac{\sqrt{3}}{2}, \frac{1}{2}, 0, 0)^\top$，以及正交排斥原型 $u_\perp = (0, 1, 0, 0)^\top$。将三者旋入 $90^\circ$ 梦境层：

   $$
   \psi_A = J u_A = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}, \qquad \psi_B = J u_B = \begin{pmatrix} 0 \\ 0 \\ \sqrt{3}/2 \\ 1/2 \end{pmatrix}, \qquad \psi_\perp = J u_\perp = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}.
   $$

   逐项核验内积账本：

   - **从梵天实轴 $\mathbf{I}$ 直视梦境（实几何投影）**：$\langle\mathbf{I}, \psi_A\rangle_{\mathbb{R}} = 0.00000000$，$\langle\mathbf{I}, \psi_B\rangle_{\mathbb{R}} = 0.00000000$，$\langle\mathbf{I}, \psi_\perp\rangle_{\mathbb{R}} = 0.00000000$；
   - **梦中之手 $\psi_A$ 触碰梦中之石 $\psi_B$（内部虚虚得实）**：$\langle\psi_A, \psi_B\rangle_{\mathbb{R}}^2 = \langle u_A, J^\top J u_B\rangle_{\mathbb{R}}^2 = \bigl(0 + 0 + 1\cdot\frac{\sqrt{3}}{2} + 0\bigr)^2 = \frac{3}{4} = 0.75000000 = \cos^2 30^\circ$；且正交泡利禁入态满足 $\langle\psi_A, \psi_\perp\rangle_{\mathbb{R}}^2 = 0.00000000 = \cos^2 90^\circ$，刚性分毫不差！但轴向诱导复内积为 $i$、$i\sqrt{3}/2$、$0$，对应复玻恩权重分别为 $1.00000000$、$0.75000000$、$0.00000000$；实投影归零不等于三者的复玻恩权重全零。

3. **第三联：《蛙氏奥义书》四位代表倾角的实轴权重、梦境权重与副对角相干模长八位基准表（`手工推导` + `NUM`）**：
   在实现 B 的复正交基中，对叠加纯态 $\lvert\Psi(\theta)\rangle = \cos\theta\lvert 0\rangle - i\sin\theta\lvert 1\rangle$，其密度矩阵副对角元模长为 $\lvert\rho_{01}(\theta)\rvert = \cos\theta\sin\theta = \frac{1}{2}\sin(2\theta)$，标准基捏合丢弃的希尔伯特—施密特相干质量为 $2\lvert\rho_{01}(\theta)\rvert^2 = \frac{1}{2}\sin^2(2\theta)$。对四位代表角 $\theta \in \{0^\circ,\; \theta^*,\; 60^\circ,\; 90^\circ\}$（其中道蒂不动点精确正根为 $\theta^* \approx 0.7390851332\;\mathrm{rad} \approx 42.34645883^\circ$）：

   | 代表相态与倾角 $\theta$ | 弧度 $\theta\;(\mathrm{rad})$ | 实轴权重 $\cos^2\theta$ | 梦境权重 $\sin^2\theta$ | 副对角相干模长 $\frac{1}{2}\sin 2\theta$ | 捏合相干质量 $\frac{1}{2}\sin^2 2\theta$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **图里亚极点 $0^\circ$** | $0.00000000$ | $1.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ |
   | **清醒道蒂点 $42.34645883^\circ$（$\theta^*$）** | $0.73908513$ | $0.54624683$ | $0.45375317$ | $0.49785664$ | $0.49572246$ |
   | **个体幻梦代表角 $60^\circ$** | $1.04719755$ | $0.25000000$ | $0.75000000$ | $0.43301270$ | $0.37500000$ |
   | **熟睡潜藏极点 $90^\circ$** | $1.57079633$ | $0.00000000$ | $1.00000000$ | $0.00000000$ | $0.00000000$ |

   注意在道蒂清醒点 $\theta^*$ 处，实虚交织的副对角相干模长高达 $\frac{1}{2}\sin(2\theta^*) = \theta^*\sqrt{1 - (\theta^*)^2} \approx 0.49785664$（逼近理论最大值 $0.50000000$ 的 $99.57\%$）！

4. **第四联：$M$ 副本共识去相干残余质量 $\lvert c_{01}\rvert^{2M}$ 与庄周梦蝶 $720^\circ$ 旋量双覆叠四阶提升表（`手工推导` + `NUM`）**：

   - 在受控记录模型中取单观察者条件重叠模平方 $\lvert c_{01}\rvert^2 = \cos^2 45^\circ = 0.50000000$：当夜间私密窗口仅有 $M = 1$ 份未读拷贝时，归一化副对角相干质量留存率仍达 $\lvert c_{01}\rvert^{2\cdot 1} = 0.5^1 = 0.50000000$。此例是非幺模衰减，不能套用要求每份 $|c_l|=1$ 的 `joint_coherent_reversal`：若初始 $\rho_{01}=1/2$，正向记录后再施加共轭记录信道，得到 $\rho_{01}''=\overline c_{01}c_{01}\rho_{01}=1/4=0.25000000$，相对于初始 $2|\rho_{01}|^2$ 的相干质量留存率为 $|c_{01}|^4=0.25000000$。只有全套幺模相位记录的共轭回波才由第 6 款保证无损恢复；而进入 $M = 4$ 位观察者互锁的白天共识场后，未读相干质量迅速压低八倍至 $\lvert c_{01}\rvert^{2\cdot 4} = 0.5^4 = 0.06250000$（$M = 10$ 时更压至 $0.5^{10} \approx 0.00097656$），若仅对自身一份记录施加共轭信道，系数成为 $\overline c_{01}c_{01}^4$，归一化相干质量为 $|c_{01}|^{10}=0.03125000$，也未恢复初态；这里直接计算非幺模衰减，区别于第 6 款的幺模相位回波；
   - 对底圆周路径 $\mathrm{basePath}(s) = e^{i s \vartheta_{\mathrm{phys}}}$（$s \in [0, 1]$，上层初值 $+1$，旋量半角 $\theta = \frac{1}{2}\vartheta_{\mathrm{phys}}$）：在 $\vartheta_{\mathrm{phys}} = 0^\circ$ 时 $(\text{底}, \text{旋量}) = (+1, +1)$；在 $\vartheta_{\mathrm{phys}} = 180^\circ$（$\theta = 90^\circ$）时为 $(-1, +i)$；在 $\vartheta_{\mathrm{phys}} = 360^\circ$（$\theta = 180^\circ$）时底空间已归 $+1$ 而旋量停在对跖叶 $-1$；直至 $\vartheta_{\mathrm{phys}} = 720^\circ$（$\theta = 360^\circ$），双叶终告合拢于 $(+1, +1)$！

:::

---

**从梵天正交大梦走向红楼觉醒。** 本节以实轴与正交梦境的几何区分、各自内部的保范配对及旋量双覆盖，为下一步追问奠定了基础：如果梦境仍然鲜活，梦中人究竟如何认出自己？下一节 [§39.16](ch39-s16-red-chamber-awakening-and-heaven-human-unity.md#sec-ch39-red-chamber-awakening-and-heaven-human-unity) 将借《红楼梦》的补天遗石、风月宝鉴与甄贾对镜，区分保留的一阶造梦倾角与归零的二阶认妄误差，继而在 `MODEL` 诠释中讨论虚实合一、天人合一与带相归元；[§39.17](ch39-s17-divine-lila-and-awakening-props.md#sec-ch39-divine-lila-and-awakening-props) 再接续神圣游戏、历史遗迹与文化典籍的唤醒道具，最后通向[终章](coda.md)《在所有的球之外》。数学锚点、文献、手工推导与模型诠释继续各守其证据边界。

::: {.viz src="brahman-real-axis-orthogonal-dream-sandbox" height="620"}
**完整实验室。** 自由切换实验卡、透镜与参数，对照投影、预算和旋量读数；几何演示及模型诠释按页面依据分层阅读。
:::
