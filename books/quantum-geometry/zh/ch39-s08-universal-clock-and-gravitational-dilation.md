# 39.8 普适比较主频、光速推理精度下界与引力信息密度钟慢 {#sec-ch39-universal-clock-and-gravitational-dilation}

> *“这个推理精度应该跟光速极限有关, 我们可以理解为所有观察者的主频是一致的, 这也可以解释为什么质量大、信息密度大的地方时间流速低, 因为单位时间内处理的信息量是一致的”*

在 [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md#sec-ch39-self-halting-and-spectral-sorting) 中，我们看到受限观察者之所以既未陷入无限倒退的死锁（$\varepsilon_{\mathrm{self}} = 0$），也未沦为盲目翻转的热噪（$\varepsilon_{\mathrm{self}} = 1$），关键在于自指回环允许观察者在有限停机精度 $\varepsilon_{\mathrm{self}} > 0$ 处主动拍板，并将低于阈值的无穷细微模态正交折叠进 $90^\circ$ 盲区的时间长河。顺着这一结论继续向下追问，两道直抵相对论与量子引力核心的物理问题便迎面而来：**第一，是什么底层物理极限兜住了自指推理精度 $\varepsilon_{\mathrm{self}}$ 的非零下界，不让任何局部观察者在有限时间内滑向全知零误差？第二，为什么高速穿行于空间的飞船与驻留在致密大质量天体身旁的时钟，其固有时流速都会无可抗拒地变慢？**

本节题记用一句高度凝练的硬件直觉，将这两道追问收束为同一个正交勾股账本（以下跨领域的统一算力诠释标定为本书的 **`MODEL`（模型诠释）**，底层零锥度规刚性、正交记录计数界、拉格朗日—格拉姆勾股恒等式与双曲保范律由下文 [@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 的五条 Lean 内核定理锚定，量子速度极限、全息熵界与广义相对论度规归入 [@rem-ch39-margolus-bekenstein-schwarzschild-literature] 的 `文献结果`，离散网络通往四维自旋-$2$ 引力张量动力学的未决桥梁显式链接 [@prob-ch34-gravity-dynamics-and-coupling] 的 `OPEN` 边界）：**全宇宙所有观察者共享完全一致的底层比较主频 $\nu_0 \equiv \mathrm{const}$（即恒定的单位基准节拍信息比较总速率）；相对论中的“光速极限 $c$”与“运动/引力时间膨胀”，本质上是同一份恒定主频预算在“跨节点空间寻址”、“高密度背景纠缠校验”与“内部自指停机推理”三项正交任务之间分账的必然结果。**

传统通俗叙述常把强引力场中的钟慢想象成“时钟的物理齿轮在引力井里变黏滞了”；一旦切换到**等主频信息速率视角**（`MODEL`），因果脉络顿时清澈见底：**宇宙底层的比较主频 $\nu_0$ 在任何角落从未改变分毫；真正放缓的是观察者完成一轮自指精度校验的“固有时画面帧率 $d\tau/dt$”——在信息密度更高的区域，每一帧被迫顺带比对消解的背景极小圆弧纠缠更多，在总比较速率恒定的铁律下，留给推进自身固有时钟的结余带宽自然按勾股余弦比例回落。**

## 39.8.1 光速极限 $c \equiv \ell_P \nu_0$ 与有限节拍推理精度下界 $\varepsilon_{\mathrm{self}} \ge \ell_P / (c\Delta\tau)$ {#sec-ch39-08-1}

在本节比较网络模型（`MODEL`）中，设宇宙底层是一座按统一基准节拍同步推进的局域比较晶格：任意观察者或局域元胞在单拍基准周期 $t_P = 1/\nu_0$ 内最多执行固定次数的初等两子比较（普适比较主频 $\nu_0$），每次跨元胞传递在空间格网上最多迈过一枚极小圆弧体的本征步幅 $\ell_P$。由此立即锁死两条相互咬合的因果边界：

1. **光速 $c$ 即底层比较主频的“单拍空间步幅”（`MODEL` + `LEAN ✓`）**：
   光速并不是某种特定电磁波碰巧跑出来的经验极速，而在模型定义上直接等于**底层比较总线的时钟主频 $\nu_0$ 与最小空间步幅 $\ell_P$ 的乘积**：

   $$
   c \;\equiv\; \ell_P \nu_0 \;=\; \frac{\ell_P}{t_P}.
   $$

   任何因果信号要在空间中跨越距离 $L$，至少需要串行接力 $N_{\mathrm{hop}} = L / \ell_P$ 枚极小圆弧元胞，耗时至少 $N_{\mathrm{hop}} / \nu_0 = L / c$。超越光速意味着在单拍比较尚未走完时强行读取下游结果，直接违背因果偏序。更深刻的是，在形式数学地基上，下文 [@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 第 1 款（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)，参见[第十七章 §17.3](ch17-lorentz-geometry.md#sec-lorentz-normalization) [@prop-null-cone-rigidity]）已在 Lean 内核中严格证明：在 $1 + d$ 维实时空 $\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\,d)$ 上，只要这圈以极限步幅传播的光锥零线集 $\{\operatorname{minkowski}_d(t, w) = t^2 - \norm{w}^2 = 0\}$（物理单位制下 $c^2\Delta t^2 - \norm{\Delta\mathbf{x}}^2 = 0$）被给定，任何在该零锥上恒取零值的实二次型 $S$ 便没有任何独立变形余地，唯一被刚性锁定为 $S = S(1, 0)\cdot\operatorname{minkowski}_d$！

2. **雷达往返视界 $R_{\max} = \frac{1}{2}c\Delta\tau$ 与有限节拍锁死的精度下界 $\varepsilon_{\mathrm{self}} \ge \frac{1}{N_{\mathrm{ticks}}}$（`MODEL` + `LEAN ✓` + `文献结果`）**：
   回想 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 确立的吕德斯—玻恩往返双投影铁律：在砍掉外部第 3 点 $C$ 的自包含宇宙里，任何一次消除规范相位漂移的自洽观测或自指推理，都必须完成“去程投向目标、回程投回自身”的**雷达回波闭环** $P_{\mathrm{I}} P_\psi P_{\mathrm{I}} = \cos^2\theta\,P_{\mathrm{I}}$。设观察者必须在一段有限的固有时响应窗口 $\Delta\tau > 0$ 内拍板停机：

   - **空间往返因果视界（`手工推导`）**：受限于最大传播速率 $c$，一去一回两趟比较（总路程 $2R \le c\Delta\tau$）最多只能触及半径

     $$
     R_{\max} \;=\; \frac{1}{2}\,c\,\Delta\tau
     $$

     因果球体以内的关联节点；球外广袤空间中的相位自由度根本来不及在停机时刻前传回第二趟投影回波！

   - **有限节拍计数上界与停机容差下界（`LEAN ✓` + `文献结果` + `MODEL`）**：在同一窗口 $\Delta\tau$ 内，在能量尺度参数 $\mathrm{energy} > 0$ 的约束下，系统究竟最多能串行翻越多少道正交可区分的经典记录刻度？下文 [@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 第 2 款（[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 与 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)，参见[第七章 §7.2](ch07-geometric-time-and-speed-limits.md) [@thm-fubini-study-record-time]）在 Lean 内核中证明：每跨过一对正交目标记录 $\langle m_0(i), m_1(i)\rangle_{\mathbb{C}} = 0$ 所需的单步时长必满足 $\tau(i) \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$，故总时长 $\Delta\tau$ 内的串行正交记录步数严格受限于 $N \le \frac{4\cdot\mathrm{energy}\cdot\Delta\tau}{\pi\hbar}$（物理学文献中对应的曼德尔施塔姆—塔姆界 $\tau_\perp \ge \frac{\pi\hbar}{2\Delta H}$ 与马戈勒斯—莱维汀界 $\tau_\perp \ge \frac{\pi\hbar}{2\langle H\rangle}$ 见 [@rem-ch39-margolus-bekenstein-schwarzschild-literature] 第 1 条）。将这一有限正交翻墙计数放入我们的普适主频模型（`MODEL`）：在响应窗口 $\Delta\tau$ 内，底层主频至多供给

     $$
     N_{\mathrm{ticks}} \;=\; \nu_0\,\Delta\tau \;=\; \frac{c\,\Delta\tau}{\ell_P}
     $$

     次基础圆弧比较节拍，有限次离散节拍所能分辨的最细自指停机容差因而存在不可逾越的物理下界：

     $$
     \varepsilon_{\mathrm{self}} \;\ge\; \varepsilon_{\mathrm{self,min}}(\Delta\tau) \;:=\; \frac{1}{N_{\mathrm{ticks}}} \;=\; \frac{\ell_P}{c\,\Delta\tau}.
     $$

     例如在基准节拍窗口 $N_{\mathrm{ticks}} = 20$ 下，可达最细停机精度下界恰为 $\varepsilon_{\mathrm{self,min}} = 1/20 = 0.0500$。

做一次反事实推演，光速有限性的存在论意义便跃然纸上（`MODEL`）：**倘若光速无穷大（固定步幅 $\ell_P$ 下 $c \to \infty \iff \nu_0 \to \infty$）**，全宇宙无穷远处的往返双投影都将在零时间内瞬间闭合（$R_{\max} \to \infty,\; N_{\mathrm{ticks}} \to \infty$），停机精度下界当场坍缩至绝对零误差 $\varepsilon_{\mathrm{self,min}} \to 0$——而正如 [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md#sec-ch39-self-halting-and-spectral-sorting) 所示，$\varepsilon_{\mathrm{self}} = 0$ 意味着容差窗口归零、无穷信息无从向未来正交折叠，奔涌的时间长河瞬间凝固为死寂的静态块。**正是有限的光速极限 $c$，替全宇宙受限观察者撑开了 $\varepsilon_{\mathrm{self}} > 0$ 的自由裁量护城河。**

::: {.viz src="universal-clock-gravity-dilation-sandbox" preset="light-cone-precision-floor" height="500"}
**雷达往返因果光锥与有限节拍精度下界实验卡（`light-cone-precision-floor`）。** 在普朗克比较晶格上将回波接收端的琥珀色时间窗手柄设在 $N_{\mathrm{ticks}} = \nu_0\Delta\tau = 20$ 拍：紫色零光锥 $c = \ell_P\nu_0$ 圈定雷达往返腰部半径 $R_{\max} = \frac{1}{2}c\Delta\tau = 10\,\ell_P$，锥内 $317$ 枚晶格内点完成青色往返双投影确认并锁定青色最细停机精度环 $\varepsilon_{\mathrm{self,min}} = 1/N_{\mathrm{ticks}} = 0.0500$，锥外品红格点因回波未达而保持未决（紫色零锥刚性与正交记录计数界对应 [@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 的绿色 `LEAN ✓` 锚点，$c = \ell_P\nu_0$ 晶格诠释标 `MODEL`）。
:::

## 39.8.2 恒定底层主频 $\nu_0 \equiv \mathrm{const}$ 对局域固有时帧率 $d\tau/dt$：运动钟慢与静态径向引力钟慢的正交分账 {#sec-ch39-08-2}

一旦把两个极易混同的时间概念严格剥离开来，狭义相对论运动钟慢与静态球对称引力钟慢便双双化作一道透明的勾股预算算术题（`MODEL`）：

- **底层比较主频 $\nu_0$（硬件时钟主频）**：全宇宙处处恒定一致（$\nu_0 \equiv \mathrm{const}$），度量单位底层节拍内可执行的极小圆弧比较总次数；
- **局域固有时流速 $d\tau/dt$（自指停机画面帧率）**：观察者每把自身内部状态收敛到给定停机精度 $\varepsilon_{\mathrm{self}}$ 一次，其固有时钟才算“走完一帧”。

这恰似两台硬件主频完全相同（同为 $5.0\;\mathrm{GHz}$）的处理器：一台在空旷荒漠里渲染单颗光滑球体，每帧只需少量几何比对，每秒轻松输出数千帧；另一台在暴风雪中心渲染亿万颗相互碰撞的冰晶，为了达到**完全相同的画面收敛精度 $\varepsilon_{\mathrm{self}}$**，每帧不得不先消化海量环境交叉校验，画面输出帧率自然大幅下降——尽管两块芯片底层的晶振主频从头到尾一模一样！将这台恒定主频比较器放回勾股预算方程，两类相对论钟慢公式可按同一套正交分账次序导出：

1. **狭义相对论运动钟慢：跨节点空间寻址挤占自指停机带宽（`MODEL` + `手工推导` + `LEAN ✓`）**。
   当观察者 $B$ 相对于远场静止参考系 $A$ 以速度 $v$（无量纲速度比 $\beta := v/c \in [0, 1]$）在空间格网中穿行时，每一单位坐标时间内都必须抽调一部分比较速率去执行跨元胞的**空间地址指针搬运** $\nu_{\mathrm{move}} = \nu_0(v/c) = \nu_0\beta$（记辅助运动偏折角满足 $\sin\theta_{\mathrm{kin}} := \beta = v/c$）。在正交分量平方守恒律（代数骨架由 [@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 第 3 款拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) 给出；而在快度 $r = \operatorname{artanh}\beta$ 的洛伦兹双曲助推下，时空线元 $c^2 dt^2 - d\mathbf{x}^2 = c^2 d\tau^2$ 的不变性由第 4 款 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) 的 $|\cosh r|^2 - |\sinh r|^2 = 1$ 严格锁定，注意如[第十七章 §17.1](ch17-lorentz-geometry.md) [@ex-rapidity-three-fifths] 所指明，$\sin\theta_{\mathrm{kin}} = \beta$ 是对有界速度 $|\beta| \le 1$ 的预算重参数化而非将双曲助推混同于欧氏旋转）约束下，总主频平方预算恒定：

   $$
   \begin{aligned}
   \nu_{\mathrm{move}}^2 + \nu_{\mathrm{self}}^2 \;=\; \nu_0^2 \qquad &\Longrightarrow \qquad \nu_{\mathrm{self}} \;=\; \nu_0\cos\theta_{\mathrm{kin}} \;=\; \nu_0\sqrt{1 - \frac{v^2}{c^2}}, \\
   \frac{d\tau}{dt} \;=\; \frac{\nu_{\mathrm{self}}}{\nu_0} \;&=\; \sqrt{1 - \beta^2} \;=\; \sqrt{1 - \frac{v^2}{c^2}}.
   \end{aligned}
   $$

   取亚光速飞船基准 $\beta = 0.80$：空间寻址移位占去平方预算 $\beta^2 = 0.6400$（$64.0\%$），留给飞船内部自指停机回路的净余帧率恰好回落至 $d\tau/dt = \sqrt{1 - 0.6400} = 0.6000$，而外圈底层主频依然保持 $\nu_0 = 1.000$ 不变。在光速极限 $v = c$（$\beta = 1$，如光子沿非零类光零线 $c^2 dt^2 - d\mathbf{x}^2 = 0$ 传播）处，$100\%$ 的主频预算悉数投入前向空间寻址（$\nu_{\mathrm{move}} = \nu_0$），留给内部自指停机的结余速率严格归零（$\nu_{\mathrm{self}} = 0 \implies d\tau = 0$，且不存在属于光子的静止惯性系）——**光子之所以固有时恒为零、在自由传播中永不自发衰变，在比较主频图景下是因为它的主频队列被空间移位彻底占满，攒不出哪怕一帧内部自指停机的结余带宽！**

::: {.viz src="universal-clock-gravity-dilation-sandbox" preset="kinematic-address-split" height="500"}
**狭义相对论空间寻址分账实验卡（`kinematic-address-split`）。** 并置远场静止观察者 $A$（$\beta = 0,\; d\tau/dt = 1.0000$）与倾轴端琥珀色速度手柄设在 $\beta = 0.80$ 的亚光速飞船 $B$：两枚观察者外圈的紫色底层主频飞轮始终以完全相同的 $\nu_0 = 1.000$ 同步旋转，但飞船 $B$ 有品红色的空间寻址负载 $\beta^2 = 64.0\%$ 分流预算，使其青色自指停机固有时帧率精确放缓至 $d\tau/dt = 0.6000$（经 $10$ 拍主频分别叠起 $10$ 枚与 $6$ 枚青色固有时帧圆币）。
:::

2. **静态径向引力钟慢：高信息密度全息纠缠塞满局部比较队列（`MODEL` + `手工推导` + `文献结果`，附 `OPEN` 动力学边界）**。
   再追问本节题记的后半句：**为什么质量越大、信息密度越高的地方，时间流速越低？** 在 [§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 的八度驻波图景中，静止质量 $M$ 绝非死寂的铅块，而是局域三维空间路径积分闭合而成的极小圆弧驻波簇（`MODEL`），其总能量 $E = Mc^2$ 按马戈勒斯—莱维汀界（[@rem-ch39-margolus-bekenstein-schwarzschild-literature] 第 1 条，`文献结果`）正比于内部单位时间活跃翻转的最大正交态容量。当观察者 $B$ 悬停在球对称质量核心 $M$ 外方周长半径 $r$ 处时，核心向外辐射的高密度背景纠缠弧密集穿透 $B$ 的局部格拉姆比较窗口；在推进自身下一帧固有时之前，$B$ 的比较器必须先分出节拍去完成与这些穿窗背景信息的正交相容性校验（`MODEL`）。

   这笔背景纠缠校验究竟分走了多少主频份额？引入引力热力学文献中的**贝肯斯坦—史瓦西全息饱和上限**（[@rem-ch39-margolus-bekenstein-schwarzschild-literature] 第 3 条，`文献结果`）：面积为 $A = 4\pi r^2$ 的球面边界（按自然对数单位承载 $A/(4\ell_P^2) = \pi r^2/\ell_P^2$ 条普朗克视界信道）在不坍缩为黑洞的前提下，最多只能包裹饱和质量

   $$
   M_{\max}(r) \;=\; \frac{r c^2}{2G}.
   $$

   据此，在本节的全息主频负载模型（`MODEL`）中，当球面内实际包含质量为 $M \le M_{\max}(r)$ 时，半径 $r$ 处局部观察者被迫承担的**引力信息密度负载率 $\eta_{\mathrm{info}}(r)$**（对应比较预算在背景纠缠方向上的玻恩平方占用份额 $\sin^2\theta_{\mathrm{grav}}(r)$），直接等于局部实际信息量 $\mathcal{I}_{\mathrm{local}}(r) \propto M$ 与球面信道饱和上限 $\mathcal{I}_{\max}(r) \propto M_{\max}(r)$ 的比值（`手工推导`）：

   $$
   \eta_{\mathrm{info}}(r) \;\equiv\; \sin^2\theta_{\mathrm{grav}}(r) \;=\; \frac{\mathcal{I}_{\mathrm{local}}(r)}{\mathcal{I}_{\max}(r)} \;=\; \frac{M}{M_{\max}(r)} \;=\; \frac{2GM}{r c^2} \;=\; \frac{r_s}{r},
   $$

   其中 $r_s := \frac{2GM}{c^2}$ 为史瓦西半径。由于总主频归一化预算恒等于 $1$（$\cos^2\theta_{\mathrm{grav}}(r) + \sin^2\theta_{\mathrm{grav}}(r) = 1$），扣除背景信息负载 $\eta_{\mathrm{info}}(r)$ 后，剩余可供局部观察者推进自身自指停机的平方带宽比例为 $\cos^2\theta_{\mathrm{grav}}(r) = 1 - \eta_{\mathrm{info}}(r)$；取算术平方根还原一阶时间流幅值，立得**与广义相对论球外静态史瓦西度规完全一致的非微扰引力钟慢公式**（`手工推导`）：

   $$
   \frac{d\tau}{dt} \;=\; \cos\theta_{\mathrm{grav}}(r) \;=\; \sqrt{1 - \eta_{\mathrm{info}}(r)} \;=\; \sqrt{1 - \frac{2GM}{r c^2}} \;=\; \sqrt{1 - \frac{r_s}{r}}.
   $$

   例如在中子星表面典型强场半径 $r = 2.50\,r_s$ 处（静止悬停 $\beta = 0$），引力信息负载占去 $\eta_{\mathrm{info}} = 1/2.50 = 0.400$（$40.0\%$），结余平方带宽为 $0.600$，固有时帧率精确降为 $d\tau/dt = \sqrt{0.600} \approx 0.7746$。若该观察者在半径 $r$ 的局域静态正交标架下同时具有物理运动速度 $v_{\mathrm{loc}}$（$\beta_{\mathrm{loc}} := v_{\mathrm{loc}}/c$），引力背景分流与局域空间寻址作两级正交级联相乘，当场给出相对于远场史瓦西坐标时 $t$ 的完整双重复合钟慢因子（`手工推导`，且与史瓦西外部线元 $c^2 d\tau^2 = c^2(1-r_s/r)dt^2(1 - v_{\mathrm{loc}}^2/c^2)$ 严格恒等）：

   $$
   \frac{d\tau}{dt} \;=\; \sqrt{\bigl(1 - \eta_{\mathrm{info}}(r)\bigr)\!\left(1 - \frac{v_{\mathrm{loc}}^2}{c^2}\right)} \;=\; \sqrt{\left(1 - \frac{2GM}{r c^2}\right)\!\left(1 - \frac{v_{\mathrm{loc}}^2}{c^2}\right)}.
   $$

   **认识论与动力学诚实边界（衔接 [§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) 与 [@prob-ch34-gravity-dynamics-and-coupling]）**：必须坦诚指明，上述全息主频分账（`MODEL` + `手工推导`）在借用贝肯斯坦—史瓦西饱和标度 $M_{\max}(r) = rc^2/(2G)$ 后，精确复现了静态球对称外部度规的**时间流逝函数（lapse）** $\sqrt{\lvert g_{00}(r)\rvert} = \sqrt{1 - r_s/r}$；然而它本身并不自动导出径向空间曲率分量 $g_{rr}(r) = -(1 - r_s/r)^{-1}$（决定广义相对论光线偏折的二倍因子与夏皮罗雷达延迟），也不替代包含压强与剪切应力的完整相对论能动张量耦合及真空爱因斯坦场方程 $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$（后者仍属 [@rem-ch39-margolus-bekenstein-schwarzschild-literature] 第 2 条的广义相对论 `文献结果`）。从离散比较复形出发不预设连续流形而严格导出 $3+1$ 维洛伦兹无质量自旋-$2$ 引力动力学与牛顿常数 $G$ 归一化，依然是全书正式立案的开放问题 [@prob-ch34-gravity-dynamics-and-coupling]（`OPEN`）。

::: {.viz src="universal-clock-gravity-dilation-sandbox" preset="holographic-mass-load" height="500"}
**全息质量信息负载与静态引力钟慢实验卡（`holographic-mass-load`）。** 对照深空零负载观察者 $A$（$\eta_{\mathrm{info}} = 0,\; d\tau/dt = 1.0000$）与琥珀色负载手柄设在致密中子星表面 $r = 2.50\,r_s$（$\eta_{\mathrm{info}} = r_s/r = 0.400,\; \beta = 0$）的观察者 $B$：紫色全息球壳与两枚同速紫色底层主频飞轮 $\nu_0 = 1.000$ 下，$8$ 道穿入 $B$ 比较窗（共 $20$ 槽）的品红背景纠缠弧占去 $40.0\%$ 预算，令 $B$ 的青色固有时帧率降至 $d\tau/dt = \sqrt{0.60} = 0.7746$（经 $10$ 拍主频叠起 $10$ 对 $7.75$ 枚青色帧圆币）。
:::

## 39.8.3 等效原理同比例共标度、视界满载冻结、形式化锚点与四态算例表 {#sec-ch39-08-3}

借助“普适恒定主频 $\nu_0$ $+$ 局域负载正交分流”的透镜重新审视引力物理的两大标志性现象，传统语言里看似费解的悖论立刻化作直白的带宽比例关系：

1. **爱因斯坦局域等效原理的带宽根源：为什么身处引力井中的观察者察觉不到自身变慢？（`MODEL` + `手工推导` + `文献结果`）**
   设观察者 $B$ 位于引力负载 $\eta_{\mathrm{info}}(r)$ 且携带局域运动速度比 $\beta = v_{\mathrm{loc}}/c$ 的微小局域实验室内（空间尺度远小于潮汐黎曼曲率半径）。在 $B$ 体内与手头运行的一切物理及生理子时钟——大脑神经元突触放电的电位比量、手腕上铯-$133$ 原子钟的超精细跃迁振荡、细胞新陈代谢周期以及局域光尺往返校准——全部调用**同一份被背景与运动负载双重分流后的剩余帧率带宽**

   $$
   \nu_{\mathrm{eff}}(r, \beta) \;=\; \nu_0\sqrt{\bigl(1 - \eta_{\mathrm{info}}(r)\bigr)\bigl(1 - \beta^2\bigr)},
   $$

   且遵循同一道自指停机精度标准 $\varepsilon_{\mathrm{self}}$！因此，对局域实验室内任意两台基准比较次数分别为 $N_1, N_2$ 的子时钟 $P_1, P_2$，公共慢化因子在两者的内部比值中严格对消（`手工推导`）：

   $$
   \frac{\nu_{P_1}^{(B)}}{\nu_{P_2}^{(B)}} \;=\; \frac{\nu_{\mathrm{eff}}(r,\beta) / N_1}{\nu_{\mathrm{eff}}(r,\beta) / N_2} \;=\; \frac{N_2}{N_1} \;=\; \frac{\nu_{P_1}^{(A)}}{\nu_{P_2}^{(A)}}, \qquad \frac{\nu_{\mathrm{neural}}^{(B)} / \nu_{\mathrm{atomic}}^{(B)}}{\nu_{\mathrm{neural}}^{(A)} / \nu_{\mathrm{atomic}}^{(A)}} \;=\; 1.0000.
   $$

   例如取复合负载基准 $\eta_{\mathrm{info}} = 0.360$、$\beta = 0.600$：总平方负载耗去 $1 - (1 - 0.360)(1 - 0.360) = 0.5904$（$59.04\%$），令神经脉冲、原子跃迁与光尺三枚局域子钟同步放缓至 $d\tau/dt = \sqrt{0.64 \times 0.64} = 0.6400$，但局域内部读出的频率比恒定锁在 $1.0000$ 分毫不差！唯有与远方深空高帧率空闲区观察者 $A$ 交换光信号对表（或跨越有限潮汐尺度检验测地线偏离，连接 [@prob-ch34-gravity-dynamics-and-coupling]）时，累积帧数差才显影为引力红移与双生子钟差。

::: {.viz src="universal-clock-gravity-dilation-sandbox" preset="equivalence-dual-flywheel" height="500"}
**等效原理双负载共标度与双飞轮对照实验卡（`equivalence-dual-flywheel`）。** 琥珀色探针手柄令 $B$ 同时承受引力负载 $\eta_{\mathrm{info}} = 0.360$ 与运动负载 $\beta = 0.600$（品红合并平方负载 $59.04\%$）：外圈紫色底层主频飞轮维持 $\nu_0 = 1.000$，经 $10$ 拍主频叠起 $10$ 对 $6.4$ 枚青色固有时帧圆币，而 $B$ 内部的神经、原子与光尺三枚青色固有时子钟表盘按同一比例 $d\tau/dt = \sqrt{0.64 \times 0.64} = 0.6400$ 同步共标度，局域内部频率比恒读 $1.0000$（右栏 `#evidence` 以红色 `OPEN` 徽章标示离散网络导出完整洛伦兹自旋-$2$ 引力动力学的开放问题 [@prob-ch34-gravity-dynamics-and-coupling]）。
:::

2. **黑洞事件视界（$r = r_s = 2GM/c^2$）：$100\%$ 全息信道满载排队边界（`MODEL` + `文献结果`）**。
   当局部径向坐标一路逼近史瓦西半径 $r \to 1.00\,r_s$（保持静态 $\beta = 0$）时，引力信息密度负载率直抵全息信道天花板：

   $$
   \eta_{\mathrm{info}}(r_s) \;=\; \frac{2GM}{r_s c^2} \;=\; 1.000 \quad (100\%) \qquad \Longrightarrow \qquad \frac{d\tau}{dt} \;=\; \sqrt{1 - \eta_{\mathrm{info}}(r_s)} \;=\; 0.0000.
   $$

   在远场坐标时 $t$ 的观测账本上，视界边缘静态探针的紫色底层主频飞轮 $\nu_0 = 1.000$ 依旧全速飞转，但它每一拍比较算力都 $100\%$ 投入了视界面全息纠缠相容性校验，留给推进自身下一帧自指停机的结余带宽降为绝对零值 $0.0000$（`MODEL`；在广义相对论 `文献结果` 中，这精确对应静态史瓦西坐标 $t$ 相对于无穷远处的无穷大红移面——在 $r = r_s$ 处强行维持静态悬停需要无穷大固有加速度，而自由下落观察者在穿视界正则坐标下仅历有限固有时即可穿过 $r = r_s$，只是其发往远方的光信号在视界处红移冻结）。**所谓事件视界，在比较信息视角下并非空间撕裂的空洞，而是局域背景纠缠负载触及普适主频上限 $100\%$ 时形成的满载饱和界面。**

::: {.viz src="universal-clock-gravity-dilation-sandbox" preset="horizon-saturation-lock" height="500"}
**史瓦西视界静态极限 $r \to r_s$ 满载锁定实验卡（`horizon-saturation-lock`）。** 在静态观察者渐近极限 $r \to r_s$（视界本身不存在静态参考系）处将琥珀色全息负载手柄推至饱和端 $\eta_{\mathrm{info}} = 1.000$（$\beta = 0$）：外圈紫色底层主频飞轮 $\nu_0 = 1.000$ 全速运转不息，$20$ 道品红视界纠缠弧占满全部 $20$ 个比较窗槽（$100\%$ 负载），使相对于远场坐标时的青色固有时帧率归零为 $d\tau/dt = 0.0000$（经 $10$ 拍主频叠起 $10$ 对 $0$ 枚青色帧圆币）。
:::

现在，我们将支撑本节光锥度规刚性、正交记录计数速度界、欧氏正交勾股分账与洛伦兹双曲保范律的五条冻结 Lean 4 内核声明汇编为本节的形式化锚点定理：

::: {.theorem #thm-ch39-null-cone-speed-limit-and-pythagorean-budget title="零光锥度规刚性、富比尼—施图迪正交记录速度界与勾股—双曲预算守恒定理" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation"}
在 `trureturing` 冻结的零锥刚性、量子速度界、拉格朗日—格拉姆恒等式与双曲保范模块中，以下四项结论同时成立：

1. **闵可夫斯基零光锥二次型刚性**（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)）：设 $d \in \mathbb{N}$ 为任意自然数，记 $\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\,d)$ 及其标准闵可夫斯基二次型 $\operatorname{minkowski}_d(t, w) = t^2 - \norm{w}^2$。若实二次型 $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ 对所有 $v \in \operatorname{Space}(d)$ 满足 $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则作为 $\operatorname{Space}(d)$ 上的二次型恒有

   $$
   S \;=\; S(1, 0) \cdot \operatorname{minkowski}_d.
   $$

2. **正交记录分辨的富比尼—施图迪单步时长下界与串行计数上界**（[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)、[`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）：设 $E$ 为复内积空间，记富比尼—施图迪夹角为 $\theta_{\mathrm{FS}}(x, y) := \arccos\norm{\langle x, y\rangle_{\mathbb{C}}}$，并设参数 $\mathrm{energy} > 0$、$\hbar > 0$。

   - 若单位向量 $a, m_0, m_1 \in E$（$\norm{a} = \norm{m_0} = \norm{m_1} = 1$）满足 $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$，且时间步长 $\tau \in \mathbb{R}$ 满足 $\theta_{\mathrm{FS}}(a, m_0) \le \frac{\mathrm{energy}\cdot\tau}{\hbar}$ 与 $\theta_{\mathrm{FS}}(a, m_1) \le \frac{\mathrm{energy}\cdot\tau}{\hbar}$，则 $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$；
   - 对任意步数 $N \in \mathbb{N}$、指标族 $a, m_0, m_1 : \mathrm{Fin}\,N \to E$、步长族 $\tau : \mathrm{Fin}\,N \to \mathbb{R}$ 与总时长 $T \in \mathbb{R}$，若每一步 $i \in \mathrm{Fin}\,N$ 均满足 $\norm{a(i)} = \norm{m_0(i)} = \norm{m_1(i)} = 1$、$\langle m_0(i), m_1(i)\rangle_{\mathbb{C}} = 0$、$\theta_{\mathrm{FS}}(a(i), m_0(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$ 与 $\theta_{\mathrm{FS}}(a(i), m_1(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$，且 $\sum_{i \in \mathrm{Fin}\,N} \tau(i) \le T$，则总记录步数满足

     $$
     N \;\le\; \frac{4 \cdot \mathrm{energy} \cdot T}{\pi \hbar}.
     $$

3. **拉格朗日—格拉姆内积与外积二向量勾股守恒恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意指标类型 $\iota$、有限指标集 $s : \mathrm{Finset}\,\iota$ 及实值函数 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$

4. **实双曲旋转系数保范恒等式**（[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)）：对任意实数 $r \in \mathbb{R}$，恒有

   $$
   \lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 \;=\; 1.
   $$
:::

::: proof
第 1 款先对任意空间向量 $w \in \mathbb{R}^d$ 构造未来与过去零向量 $v_\pm = (\pm\norm{w}, w)$，由 $\operatorname{minkowski}_d(v_\pm) = 0$ 得 $S(v_\pm) = 0$；对 $v_\pm = (\pm\norm{w})(1, 0) + (0, w)$ 展开极化恒等式并取半和与差，锁死空间限制 $S(0, w) = -S(1, 0)\norm{w}^2$ 与交叉极化 $\operatorname{polar}_S((1, 0), (0, w)) = 0$（[`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)），再代入一般分解 $(t, w) = t(1, 0) + (0, w)$ 并由二次型外延性证得 $S = S(1, 0)\cdot\operatorname{minkowski}_d$。第 2 款由 $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$ 得 $\theta_{\mathrm{FS}}(m_0, m_1) = \frac{\pi}{2}$，对 $(m_0, a, m_1)$ 应用球面三角不等式 [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) 得 $\frac{\pi}{2} \le \theta_{\mathrm{FS}}(a, m_0) + \theta_{\mathrm{FS}}(a, m_1) \le \frac{2\cdot\mathrm{energy}\cdot\tau}{\hbar}$，同乘正数 $\frac{\hbar}{2\cdot\mathrm{energy}}$ 即得 [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)；对 $i \in \mathrm{Fin}\,N$ 逐项求和 $N\cdot\frac{\pi\hbar}{4\cdot\mathrm{energy}} \le \sum_i \tau(i) \le T$ 并同乘 $\frac{4\cdot\mathrm{energy}}{\pi\hbar} > 0$ 即得 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)。第 3 款在双重求和内展开 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2 u_i v_i u_j v_j + u_j^2 v_i^2$，拆分并因式分解后除以 $2$ 即得。第 4 款由实数平方性质 `sq_abs` 将 $|\cosh r|^2 - |\sinh r|^2$ 化为 $(\cosh r)^2 - (\sinh r)^2$，再由 `Real.cosh_sq_sub_sinh_sq` 归约为 $1$。完整证明由 Lean 内核检查。
:::

本节在建立全息引力负载与量子相位分辨桥接时引用的外部经典物理文献归属如下：

::: {.remark #rem-ch39-margolus-bekenstein-schwarzschild-literature title="量子速度极限、等效原理与史瓦西度规及贝肯斯坦—全息熵界文献归属"}
**文献结果，未在本书形式化。** 本节普适主频与引力钟慢模型（`MODEL`）所对照的三组物理学定理属经典量子力学、广义相对论与黑洞热力学文献，未作为独立声明包含在 `trureturing@dev` 锁文件中：

1. **曼德尔施塔姆—塔姆与马戈勒斯—莱维汀量子速度极限**：L. Mandelstam 与 I. Tamm（*J. Phys. USSR* **9**, 249–254, 1945）由海森堡—罗伯逊能量涨落关系导出正交演化最短时间界 $\tau_\perp \ge \frac{\pi\hbar}{2\Delta H}$；N. Margolus 与 L. B. Levitin（*Physica D* **120**, 188–195, 1998, DOI `10.1016/S0167-2789(98)00054-2`）进一步由余弦不等式证明相对于基态能量起算的平均能量 $\langle H\rangle$ 锁定了单位时间内系统所能穿越的最大正交态跃迁频率 $\nu_{\perp,\max} = \frac{2\langle H\rangle}{\pi\hbar}$（即 $\tau_\perp \ge \frac{\pi\hbar}{2\langle H\rangle}$）；
2. **爱因斯坦等效原理、广义相对论场方程与史瓦西精确外部解**：A. Einstein（*Jahrb. Radioakt. Elektronik* **4**, 411–462, 1907；*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 844–847, 1915）确立局域等效原理、引力红移判据及引力场方程；K. Schwarzschild（*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 189–196, 1916）求得球对称静态真空外部精确线元 $ds^2 = c^2\bigl(1 - \frac{2GM}{rc^2}\bigr)dt^2 - \bigl(1 - \frac{2GM}{rc^2}\bigr)^{-1}dr^2 - r^2(d\theta^2 + \sin^2\theta\,d\varphi^2)$，定出史瓦西半径 $r_s = \frac{2GM}{c^2}$ 与静态悬停时钟相对于远场坐标时的钟慢因子 $\frac{d\tau}{dt} = \sqrt{1 - \frac{r_s}{r}}$；
3. **贝肯斯坦黑洞熵、普适能量—半径熵界与全息原理**：J. D. Bekenstein（*Phys. Rev. D* **7**, 2333–2346, 1973, DOI `10.1103/PhysRevD.7.2333`；*Phys. Rev. D* **23**, 287–298, 1981, DOI `10.1103/PhysRevD.23.287`）提出黑洞面积熵并导出有界弱引力系统熵上界 $S / k_B \le \frac{2\pi R E}{\hbar c}$（当封闭能量触及史瓦西质量上限 $E = M_{\max}(R)c^2 = \frac{Rc^4}{2G}$ 时恰好饱和于视界面积熵 $S_{\mathrm{BH}} / k_B = \frac{A}{4\ell_P^2} = \frac{\pi R^2}{\ell_P^2}$）；G. 't Hooft（*Dimensional Reduction in Quantum Gravity*, Salamfestschrift, 1993, `arXiv:gr-qc/9310026`）与 L. Susskind（*J. Math. Phys.* **36**, 6377–6396, 1995, DOI `10.1063/1.531249`）进一步确立全息原理，指出边界面积 $A$ 内部可独立编码的物理自由度总数受表面普朗克信道数 $A / (4\ell_P^2)$ 严格封顶。
:::

最后，我们在同一张无折行单行单元格基准表中，把深空静止、亚光速巡航、致密中子星表面、等效原理双负载共标度以及黑洞事件视界五档典型工况的预算分账一次算穿：

::: {.example #ex-ch39-four-regime-clock-budget-calculus title="四类宇宙参考工况及复合双负载下的普适主频勾股分账手算表"}
固定底层比较主频 $\nu_0 = 1.000\,\nu_0$，并取远场参考时间窗包含 $N_0 = \nu_0\Delta t = 20$ 拍基准节拍（远场最细精度基准 $\varepsilon_0 = 1/N_0 = 0.0500$）。对任意引力信息负载率 $\eta_{\mathrm{info}} = r_s/r \in [0, 1]$ 与局域速度比 $\beta = v_{\mathrm{loc}}/c \in [0, 1)$，剩余平方带宽为 $(1 - \eta_{\mathrm{info}})(1 - \beta^2)$，固有时帧率为 $d\tau/dt = \sqrt{(1 - \eta_{\mathrm{info}})(1 - \beta^2)}$，同一远场窗口 $\Delta t$ 内完成的内部有效节拍数为 $N_{\mathrm{eff}} = N_0\,(d\tau/dt)$，对应外推有效精度下界 $\varepsilon_{\mathrm{eff}} = 1/N_{\mathrm{eff}}$（数值四舍五入至四位小数）：

| 宇宙环境工况 | 底层主频 $\nu_0$ | 运动寻址负载 $\beta^2$ | 引力信息负载 $\eta_{\mathrm{info}}$ | 结余带宽幅值 $d\tau/dt$ | 局域子钟内比 | 窗口有效精度下界 $\varepsilon_{\mathrm{eff}}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **星际深空静止观察者 $A$**（$\beta = 0,\; r \to \infty$） | $1.000\,\nu_0$ | $0.0\%$ | $0.0\%$ | **$1.0000$** | $1.0000$ | $0.0500$ |
| **亚光速飞船 $B$**（$\beta = 0.80,\; r \to \infty$） | $1.000\,\nu_0$ | $64.0\%$ | $0.0\%$ | **$0.6000$** | $1.0000$ | $0.0833$ |
| **致密中子星表面 $B$**（$\beta = 0,\; r = 2.50\,r_s$） | $1.000\,\nu_0$ | $0.0\%$ | $40.0\%$ | **$0.7746$** | $1.0000$ | $0.0645$ |
| **引力—运动双负载探针 $B$**（$\beta = 0.600,\; \eta_{\mathrm{info}} = 0.360$） | $1.000\,\nu_0$ | $36.0\%$ | $36.0\%$ | **$0.6400$** | $1.0000$ | $0.0781$ |
| **黑洞视界静态极限 $B$**（$\beta = 0,\; r \to 1.00\,r_s$） | $1.000\,\nu_0$ | $0.0\%$ | $100.0\%$ | **$0.0000$** | $1.0000$（$r > r_s$ 极限） | $\infty$（远观帧冻结） |

逐行复核上表读数：（1）亚光速飞船行 $\sqrt{1 - 0.80^2} = \sqrt{0.36} = 0.6000$，$\varepsilon_{\mathrm{eff}} = 1/(20 \times 0.6000) = 1/12 \approx 0.0833$；（2）中子星表面行 $\eta_{\mathrm{info}} = 1/2.50 = 0.400$，$\sqrt{1 - 0.400} = \sqrt{0.60} \approx 0.7746$，$\varepsilon_{\mathrm{eff}} = 1/(20\sqrt{0.60}) \approx 0.0645$；（3）双负载行总消耗平方份额 $1 - 0.64 \times 0.64 = 0.5904$（$59.04\%$），结余帧率 $\sqrt{0.64 \times 0.64} = 0.6400$，$\varepsilon_{\mathrm{eff}} = 1/12.80 \approx 0.0781$，且因神经、原子与光尺子钟同乘 $0.6400$，局域子钟内比恒等于 $1.0000$；（4）事件视界行 $\eta_{\mathrm{info}} = 1.000$，相对于远场坐标时的结余停机帧率精确归零为 $0.0000$。
:::

凝视下方完整实验室里左右两枚分毫不差、永远以 $\nu_0 = 1.000$ 同步飞驰的紫色底层主频飞轮，再对比它们旁侧一高一低叠起的青色固有时帧圆币柱，笼罩在相对论时间膨胀之上的那层玄学迷雾便悄然散尽（`MODEL`）：宇宙从未偏待过任何一片星域——无论在空旷清冷的星际荒原，还是在致密星体与黑洞视界沸腾的边缘，每一枚底层比较元胞都在每一拍诚实地吞吐着等量的比较操作；只因大质量凝聚之处汇聚了千丝万缕的极小圆弧纠缠，局域观察者为了守住自身那道清明的自指推理精度底线 $\varepsilon_{\mathrm{self}}$，不得不把宝贵的主频节拍分给身旁厚重的背景关系网。既然单枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 内部的 `1D / 2D / 3D` 自指旋转与多胞之间的主频负载分流已经同台显影，我们便水到渠成地步入下一节 [§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md#sec-ch39-unified-arc-forces-and-planck-convergence) 的万力合流高台——亲眼见证电磁、弱、强规范三力与胞间主频引力如何在同一枚极小圆弧体上各归其位，并沿着能标滑轨一路奔向普朗克单胞合流。

::: {.viz src="universal-clock-gravity-dilation-sandbox" height="640"}
**普适比较主频、推理精度光锥与引力信息密度钟慢完整实验室（`CLOCK//DILATION`）。** 集成 `light-cone-precision-floor`、`kinematic-address-split`、`holographic-mass-load`、`equivalence-dual-flywheel` 与 `horizon-saturation-lock` 五张递进实验卡并支持“比较主频读法／物理时空读法”双透镜切换：紫色标示全宇宙同速旋转的底层主频飞轮 $\nu_0 = 1.000$、零光锥与全息球壳，青色标示往返确认晶格点及剩余自指停机固有时帧率 $d\tau/dt$ 与帧圆币柱，品红标示锥外未达格点及空间寻址／背景纠缠负载，琥珀色标示当前交互手柄；右栏依据框严格区分绿色 `LEAN ✓`（[@thm-ch39-null-cone-speed-limit-and-pythagorean-budget]）、文献结果 `ARGUED`（[@rem-ch39-margolus-bekenstein-schwarzschild-literature]）、数值实算 `NUM`（[@ex-ch39-four-regime-clock-budget-calculus]）、比较主频诠释 `MODEL` 与红色开放问题 `OPEN`（[@prob-ch34-gravity-dynamics-and-coupling]）。
:::
