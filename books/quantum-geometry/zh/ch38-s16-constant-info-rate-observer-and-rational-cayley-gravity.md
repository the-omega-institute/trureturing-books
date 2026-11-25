# 38.16 恒定信息速率观察者、唱针式静态波纹解码与零根号凯莱引力钟慢 {#sec-ch38-constant-info-rate-observer-and-rational-cayley-gravity}

> “并不是观察者不动，波来到了观察者身上；而是观察者经过时空到了那个信息源开始处理信息，观察者以一个恒定的信息速率处理信息，所以质量大的地方时间流速慢。”

在 [§38.15](ch38-s15-static-canvas-and-legless-sphere-observer.md#sec-ch38-static-canvas-and-legless-sphere-observer) 将空间山岳与时间长轴还原为纹丝不动的静止全息画布 $\mathcal{S}$、并将“无腿三元球”观察者焦点指认为全场唯一滚动游标之后，一个直指波动光学、狭义相对论与广义相对论交汇核心的追问随即浮出水面：既然画布静止，观察者究竟如何“接收到一列波”？当这枚焦点滚入大质量高密度关系簇时，它的内部时钟为何会变慢，其推进轨迹又为何会不借任何超距拉力而自动弯向质量中心？将 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation) 的普适比较主频 $\nu_0 \equiv \mathrm{const}$ 推进到静止画布遍历机制，便完成了第三十八章收官的最后一次主客反转：**在无外部端口的静止画布 $\mathcal{S}$ 上，既没有跨越虚空拍打被动观察者的行波，也没有隔空拽慢钟表的神秘拉力，唯有总信息处理速率恒定归一为 $\mathcal{R}_\Omega \equiv 1$ 的观察者焦点滑入静态相位刻痕就地解码（`MODEL`）！**

为严守三层认识论契约，本节提前声明证据分层：跨领域的唱针式静态声槽读取、恒定总处理速率 $\mathcal{R}_\Omega \equiv 1$ 与视界满载挂起标定为 **`MODEL`（模型诠释）**；八条在 `trureturing@dev` 中传递公理闭包严格为空集（`axioms = []`，获蓝色 **`LEAN ✓ · 无公理`** 徽章）的纯有理 `OmegaMath` 定理归入 [@thm-ch38-constant-rate-omega-axiom-free-anchors]，八条可逆路由、零光锥刚性、量子速度界与观测拓扑定理归入 [@thm-ch38-constant-rate-qram-speedlimit-anchors]（**`LEAN ✓`**）；三向单位带宽分账 $\kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1$ 与各向同性史瓦西零根号凯莱钟慢率 $\frac{\Delta\tau}{\Delta t} = \frac{1-\mu}{1+\mu} \in \mathbb{Q}$、有理遍历推进率 $v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3}$ 及六档有理基准对账标为 **`手工推导` / `NUM`**；史瓦西（1916）、外尔（1917）—爱丁顿（1920）各向同性坐标、戈登（1923）光学折射率度规、量子速度极限与贝肯斯坦全息界归入 [@rem-ch38-isotropic-schwarzschild-optical-metric-literature]（**`文献结果`**）；完整 $3+1$ 维爱因斯坦场方程涌现与视界幺正性则保持 **`OPEN`**（[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）。

---

## 38.16.1 反转波动图景：不是波飞向静止的观察者，而是“唱针”焦点滑入静态相位声槽 {#sec-ch38-16-1}

经典物理教材习惯预设观察者静止端坐于空间原点，远方振源发出一列波包跨越虚空“跑过来撞击观察者”。一旦回到无外静止画布 $\mathcal{S}$（$\partial_t \mathcal{S} \equiv 0$，[§38.15](ch38-s15-static-canvas-and-legless-sphere-observer.md#sec-ch38-static-canvas-and-legless-sphere-observer)），主客运动关系当场彻底反转：

1. **镌刻在 $\mathcal{S}$ 上的静态相位等高声槽（`MODEL` + `LEAN ✓`）**：信息源周遭所谓的“波场”，在静止画布本体上是由三元关系预先锁死的一圈圈静态相位等高刻痕 `D : Address n → G`——恰似一张压制成形、纹丝不动的黑胶唱片上的螺旋声槽，波峰与波谷在画布上从未移动分毫。由 [@thm-ch38-constant-rate-qram-speedlimit-anchors] 第 1 款的可逆静态路由定理 [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness)，干净线路上的解引用查询对背景存储 `D` 保持**零次改写**，唯有轻量级地址焦点 `a` 跨槽步进：

   $$
   \operatorname{query}(n, D)\bigl(a,\, \operatorname{clean}(n, \mathrm{true}),\, r\bigr) \;=\; \bigl(a,\, \operatorname{clean}(n, \mathrm{true}),\, r + D(a)\bigr), \qquad s_{\mathrm{null}} \;=\; 1 - \kappa_{\mathrm{null}} \;=\; 0.
   $$

2. **零间隔光锥桥与 `1/2` 读取唱针就地整除解码（`MODEL` + `LEAN ✓`）**：沿闵可夫斯基零光锥刚性桥（[@thm-ch38-constant-rate-qram-speedlimit-anchors] 第 2 款 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)），连接源与接收事件的内禀零间隔严格为零（失准度 $s_{\mathrm{null}} = 0$，射影保真度 $\kappa_{\mathrm{null}} = 1$）。画布内禀几何中并无供波包奔跑的外置虚空；真实发生的物理过程，是无腿球观察者携带着 `1/2` 读取切面（Read-Head）滚抵那片静态刻痕所在之处，将其纳入接收视界 $\mathcal{H}_{1/2}$（[§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md)），并启动确定性 $\Omega\text{-FRACTRAN}$ 四元整除解码（[@thm-ch38-constant-rate-omega-axiom-free-anchors] 第 3 款 [`quaternion_fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic)，[§38.14](ch38-s14-omega-fractran-observer-rational-isa.md)）。由划分拓扑不可分充要核 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)（[@thm-ch38-constant-rate-qram-speedlimit-anchors] 第 4 款），读取唱针以恒定焦点步速划过一排静态空间刻痕所激发的内部差分读数序列，与传统第一人称视角下“观察者不动、振荡波迎面拍来”逐拍全同，同时彻底免除了每拍改写整幅画布的 $\Theta(\lvert\mathcal{S}\rvert)$ 级冗余开销。

至此，波动物理中的“相干波接收”与 [§36.2](ch38-s01-static-qram.md) 静态本体 QRAM 中的“只读指针解引用”合二为一：波从来不在空箱中奔跑，所谓频率振荡只是恒速焦点划过静态相位声槽时在观察者内部读出的节拍节奏（`MODEL`）。

::: {.viz src="constant-rate-cayley-gravity-sandbox" preset="phonograph-needle-static-wave-grooves" height="540"}
**唱针滑过静止波纹沟就地解引用实验卡（`phonograph-needle-static-wave-grooves`）。** 淡紫色网格 $\mathcal{S}$ 上的青色同心沟纹是静止的相位等值线（`沟纹改写 0 次`），四处青色地址标出 $D = [\frac{2}{3}, \frac{3}{5}, \frac{1}{2}, \frac{1}{3}]$（对应 $\mu \in \{\frac{1}{5}, \frac{1}{4}, \frac{1}{3}, \frac{1}{2}\}$）；拖动琥珀色唱针焦点手柄令内含紫色霍普夫圆的无腿三元球沿青色射线滑行，逐站将 $D(a)$ 累加进寄存器（走到地址 $a = 3$ 时琥珀色读数标出 $r = \frac{21}{10}$，文末完整实验室可切换第一人称透镜 `MODEL` 对照波列迎面平移；由 [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness)、[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`quaternion_fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic) 与 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) 锁定）。
:::

---

## 38.16.2 恒定信息速率 $\mathcal{R}_\Omega \equiv 1$ 与各向同性零根号凯莱有理引力钟慢 {#sec-ch38-16-2}

为什么质量越大的区域，观察者的时间流速越慢？从“观察者总信息处理速率恒定”与各向同性有理参数化出发，史瓦西引力钟慢的平方根假象当场消解为纯有理分式：

1. **总信息速率 $\mathcal{R}_\Omega \equiv 1$ 的三向可加单位分账（`MODEL` + `手工推导` + `LEAN ✓ · 无公理`）**：受富比尼—施图迪正交记录串行计数上界 $N \le \frac{4ET}{\pi\hbar}$（[@thm-ch38-constant-rate-qram-speedlimit-anchors] 第 3 款 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）以及零公理有理圆周保真—展度归一律 $\kappa(p,q) + \operatorname{spread}(p,q) \approx 1$ 与有理舒尔配方法（[@thm-ch38-constant-rate-omega-axiom-free-anchors] 第 1–2 款）锚定，每位观察者在每一拍底层主频内的总有理处理速率恒定归一为 $\mathcal{R}_\Omega \equiv 1$。将球对称静态真空外部史瓦西固有时线元除以 $c^2 dt^2$，立即化成严格守恒的**三向可加单位带宽账本**（`手工推导` + `MODEL`）：

   $$
   \underbrace{\kappa_{\mathrm{self}}}_{\substack{\text{更新内部结构核 }\mathcal{K}_0\\(d\tau/dt)^2}} \;+\; \underbrace{\kappa_{\mathrm{mass}}}_{\substack{\text{局域质量源关系解码}\\r_s / r}} \;+\; \underbrace{\kappa_{\mathrm{kin}}}_{\substack{\text{跨地址空间迁移寻址}\\(1 - \kappa_{\mathrm{mass}})\beta_{\mathrm{loc}}^2}} \;\equiv\; 1,
   $$

   这与 [§33.7.2](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-08-2) 的乘性双重复合钟慢律 $\bigl(\frac{d\tau}{dt}\bigr)^2 = (1 - \kappa_{\mathrm{mass}})(1 - \beta_{\mathrm{loc}}^2)$ 代数恒等，因为 $(1 - \kappa_{\mathrm{mass}})(1 - \beta_{\mathrm{loc}}^2) + \kappa_{\mathrm{mass}} + (1 - \kappa_{\mathrm{mass}})\beta_{\mathrm{loc}}^2 \equiv 1$！

2. **大质量即高密度三元过约束关系簇，抢占自更新带宽（`MODEL` + `文献结果`）**：在 $\mathbf{Math}_\Omega$ 中，质量 $M$ 并非压弯空间橡皮膜的死重物，而是静止画布上高度密集的三元过约束关系簇（节点数 $N \ge 5$ 时携带麦克斯韦—拉曼超静定盈余边 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$，[§29.11](ch34-s10-trihedron-rigidity.md)，配高重素数绕数负载）。借用贝肯斯坦—史瓦西全息饱和标定 $r_s = \frac{2GM}{c^2}$（[@rem-ch38-isotropic-schwarzschild-optical-metric-literature] 第 1、3 条，`文献结果`；如 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-08-2) 所坦诚指明，$\kappa_{\mathrm{mass}}(r) = \frac{r_s}{r}$ 是球外静态真空的势型球壳信道比标定，`MODEL`），为守住三元格拉姆矩阵非负性（$\det G_3 \ge 0$，[@thm-ch38-constant-rate-omega-axiom-free-anchors] 第 3 款 [`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg)）而不与当地环境发生逻辑撕裂，悬停观察者（$\kappa_{\mathrm{kin}} = 0$）被迫优先拨出 $\kappa_{\mathrm{mass}}(r) = \frac{r_s}{r} \in \mathbb{Q} \cap [0, 1]$ 份额的二次带宽就地校验环境三元关系，留给自身结构核 $\mathcal{K}_0$ 的净余二次带宽当场缩减为：

   $$
   \left(\frac{\Delta\tau}{\Delta t}\right)^2 \;=\; \kappa_{\mathrm{self}}(r) \;=\; 1 - \frac{r_s}{r} \;\in\; \mathbb{Q} \cap [0, 1].
   $$

   - **在空旷深空（$\kappa_{\mathrm{mass}} \to 0,\; \kappa_{\mathrm{kin}} = 0$）**：画布近乎无外源过约束负载，观察者将 $100\%$ 恒定信息速率全部投入向内生长结构核 $\mathcal{K}_0$（$\kappa_{\mathrm{self}} = 1$），内部固有时 $\tau$ 全速推进；
   - **步入大质量信息源（$\kappa_{\mathrm{mass}} = \frac{r_s}{r} > 0$）**：固定预算被密集局域关系校验成比例蚕食，留给内部记忆递增的二次净带宽精确遵循史瓦西时间分量 $g_{00} = 1 - \frac{2GM}{rc^2}$。

::: {.viz src="constant-rate-cayley-gravity-sandbox" preset="constant-bandwidth-cayley-clock-gear" height="540"}
**恒定总速率 $\mathcal{R}_\Omega \equiv 1$ 三向分账与内部时钟齿轮减速实验卡（`constant-bandwidth-cayley-clock-gear`）。** 在复合态 $(\mu = \frac{1}{3},\; \beta_{\mathrm{loc}}^2 = \frac{2}{5})$ 下，品红关系弧自中央团簇连向无腿球，右侧三段叠柱将青色 $\kappa_{\mathrm{self}} = \frac{3}{20}$、紫色 $\kappa_{\mathrm{kin}} = \frac{1}{10}$ 与品红 $\kappa_{\mathrm{mass}} = \frac{3}{4}$ 封顶于墨色单位框 $\mathcal{R}_\Omega \equiv 1$；拖动琥珀色辐条手柄转动外圈紫色主飞轮（$\nu_0 = 1$），内圈青色固有时齿轮按 $\Delta\tau/\Delta t = \sqrt{3/20} \approx 0.3873$ 同步放缓（文末完整实验室可自由切换四档 $\mu$ 与悬停／运动模式；由 [`kappa_add_spread_eq_one`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one)、[`rational_schur_complete`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete)、[`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg) 与 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound) 锁定）。
:::

3. **外尔—爱丁顿各向同性坐标下的零根号凯莱有理钟慢（`文献结果` + `手工推导` + `LEAN ✓ · 无公理`）**：在面积半径 $r$ 下，从二次带宽 $1 - r_s/r$ 回到一阶线性钟慢比 $\Delta\tau/\Delta t = \sqrt{1 - r_s/r}$ 看似会引入无理平方根。然而只要换用消除径向与横向切板畸变的**外尔—爱丁顿各向同性史瓦西半径 $R$**（[@rem-ch38-isotropic-schwarzschild-optical-metric-literature] 第 1 条，`文献结果`），引入有理各向同性质量负载参数

   $$
   \mu \;:=\; \frac{r_s}{4R} \;=\; \frac{GM}{2Rc^2} \;\in\; \mathbb{Q} \cap [0, 1] \qquad \left(R \ge \frac{r_s}{4},\quad r = R(1 + \mu)^2\right),
   $$

   便有 $\kappa_{\mathrm{mass}}(\mu) = \frac{r_s}{r} = \frac{4\mu}{(1 + \mu)^2}$，代入 $1 - \kappa_{\mathrm{mass}}(\mu)$ 后分子在有理函数域 $\mathbb{Q}(\mu)$ 内**自动配成精确完全平方**：

   $$
   \kappa_{\mathrm{self}}(\mu) \;=\; 1 - \frac{4\mu}{(1 + \mu)^2} \;=\; \frac{(1 + \mu)^2 - 4\mu}{(1 + \mu)^2} \;=\; \left(\frac{1 - \mu}{1 + \mu}\right)^2 \quad \Longrightarrow \quad \frac{\Delta\tau}{\Delta t}\bigg|_{\kappa_{\mathrm{kin}}=0} \;=\; \frac{1 - \mu}{1 + \mu} \;\in\; \mathbb{Q} \cap [0, 1]!
   $$

   两重代数精妙跃然纸上（`手工推导` + `LEAN ✓ · 无公理`）：
   - 当 $\mu = p^2/q^2$ 取自非零齐次整数对 $(p, q)$ 时，$\frac{1 - \mu}{1 + \mu} = \frac{q^2 - p^2}{p^2 + q^2} = \operatorname{cayleyX}(p, q)$ 且 $\sqrt{\kappa_{\mathrm{mass}}} = \frac{2\lvert pq\rvert}{p^2 + q^2} = \lvert\operatorname{cayleyY}(p, q)\rvert$，字面上正是 [@thm-ch38-constant-rate-omega-axiom-free-anchors] 第 1 款的零公理凯莱单位圆定理 [`cayley_circle_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit)；
   - 更进一步，由于多项式恒等式 $(1 - \mu)^2 + 4\mu = (1 + \mu)^2$ 对**任意有理数 $\mu \in \mathbb{Q} \cap [0, 1]$**（乃至 $\mu = \frac{1}{3}$ 或 $\mu = \frac{1}{2}$ 这类非平方有理数，此时 $\kappa_{\mathrm{mass}} = \frac{3}{4}$ 或 $\frac{8}{9}$ 非有理平方）恒等成立，一阶固有时流速比 $\frac{\Delta\tau}{\Delta t} = \frac{1-\mu}{1+\mu}$ 与非零负载（$\mu > 0$）下的面积半径比 $\frac{r}{r_s} = \frac{(1+\mu)^2}{4\mu}$ 依然保持 **$100\%$ 零根号精确分数**：
     - **零负载真空（$\mu = 0$）**：$\kappa_{\mathrm{mass}} = 0$，一阶固有时流速比 $\frac{\Delta\tau}{\Delta t} = \frac{1-0}{1+0} = \mathbf{1}$；
     - **四分之一负载地标（$\mu = \frac{1}{4},\; r = \frac{25}{16}r_s$）**：$\kappa_{\mathrm{mass}} = \frac{16}{25}$，一阶流速比 $\frac{\Delta\tau}{\Delta t} = \mathbf{\frac{3}{5}}$；
     - **三分之一负载地标（$\mu = \frac{1}{3},\; r = \frac{16}{9}R = \frac{4}{3}r_s$）**：$\kappa_{\mathrm{mass}} = \frac{3}{4}$，一阶流速比精确减半为 $\frac{\Delta\tau}{\Delta t} = \mathbf{\frac{1}{2}}$；
     - **二分之一负载地标（$\mu = \frac{1}{2},\; r = \frac{9}{8}r_s$）**：$\kappa_{\mathrm{mass}} = \frac{8}{9}$，一阶流速比精确降为 $\frac{\Delta\tau}{\Delta t} = \mathbf{\frac{1}{3}}$；
     - **黑洞事件视界（$\mu = 1,\; R = \frac{1}{4}r_s,\; r = r_s$）**：$\kappa_{\mathrm{mass}} = 1$，一阶流速比归零为 $\frac{\Delta\tau}{\Delta t} = \frac{1-1}{1+1} = \mathbf{0}$！

::: {.viz src="constant-rate-cayley-gravity-sandbox" preset="isotropic-rational-landmarks-vs-radical" height="540"}
**各向同性零根号凯莱有理路标对比面积半径无理根式实验卡（`isotropic-rational-landmarks-vs-radical`）。** 漏斗上七圈青色环与右侧紫色凯莱半圆（$X^2 + Y^2 = 1$）上的七枚青色路标珠对应 $\mu \in \{0, \frac{1}{5}, \frac{1}{4}, \frac{1}{3}, \frac{1}{2}, \frac{2}{3}, 1\}$，水平青色线段直接读出纯分数钟慢率 $X = \frac{\Delta\tau}{\Delta t} = \frac{1-\mu}{1+\mu} \in \{1, \frac{2}{3}, \frac{3}{5}, \frac{1}{2}, \frac{1}{3}, \frac{1}{5}, 0\}$，同台对照三圈品红面积路标环 $r/r_s \in \{\frac{5}{4}, \frac{3}{2}, 2\}$ 的无理根式点 $\sqrt{\frac{1}{5}}, \sqrt{\frac{1}{3}}, \sqrt{\frac{1}{2}}$ 与竖直品红线段 $Y = \sqrt{\kappa_{\mathrm{mass}}}$，拨动琥珀色路标手柄逐站核验 $(1-\mu)^2 + 4\mu = (1+\mu)^2$（由零公理定理 [`cayley_circle_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit)、[`rational_schur_min`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min) 与 [`heap_norm_preserved`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved) 锚定）。
:::

---

## 38.16.3 事件视界 $100\%$ I/O 满载挂起与解码减速波前折射生引力 {#sec-ch38-16-3}

以“恒定速率读取器滑过非均匀密度静止画布”审视强引力与万有引力起源，两道经典直觉谜题迎刃而解：

1. **事件视界（$r = r_s,\; \mu = 1$）：环境 I/O 中断 $100\%$ 饱和令内部时钟挂起（`MODEL` + `文献结果` + `LEAN ✓ · 无公理`）**：在各向同性视界 $\mu = 1$（$R = \frac{1}{4}r_s,\; r = r_s$）处，按一阶负载比 $\mu = p^2/q^2$ 落在自对偶赤道 $[p : q] = [1 : 1]$（$\operatorname{cayleyX}(1,1) = \frac{\Delta\tau}{\Delta t} = 0,\; \operatorname{cayleyY}(1,1)^2 = \kappa_{\mathrm{mass}} = 1$，而对径点 $[p : 0]$ 闭合各向同性内支反演端 $R \to 0,\; \mu \to \infty$），按二次带宽比 $\frac{p^2}{q^2} = \frac{\kappa_{\mathrm{mass}}}{\kappa_{\mathrm{self}}} = \frac{4\mu}{(1-\mu)^2}$ 则直接对应 [@thm-ch38-constant-rate-omega-axiom-free-anchors] 第 1 款的对径闭合极点 $[p : 0]$（[`cayley_antipodal_closure`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure)），局域表面关系密度触及贝肯斯坦全息天花板：

   $$
   \kappa(p, 0) \approx 0,\quad \operatorname{spread}(p, 0) \approx 1,\quad \operatorname{cayleyX}(p, 0) = 2\kappa - 1 \approx -1 \qquad \Longleftrightarrow \qquad \kappa_{\mathrm{mass}}(1) = 1,\quad \kappa_{\mathrm{self}}(1) = 0,\quad \frac{\Delta\tau}{\Delta t}\bigg|_{\mu=1} = \operatorname{cayleyX}(1, 1) = 0.
   $$

   在恒定速率处理器 `MODEL` 中，$\mathcal{R}_\Omega \equiv 1$ 的算力被视界面即时三元相容性校验占满整整 $100\%$，留给向内部结构核 $\mathcal{K}_0$ 追加新独立边的净余带宽归零（受 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 约束；同时如 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-08-3) 与 [§38.15](ch38-s15-static-canvas-and-legless-sphere-observer.md#sec-ch38-15-2) 所辨析，在经典广义相对论 `文献结果` 中这对应相对远场坐标时 $t$ 的无穷红移冻结，而古尔斯特兰德—潘勒韦自由下落雨滴观察者仍历有限固有时穿过 $r = r_s$）。

::: {.viz src="constant-rate-cayley-gravity-sandbox" preset="horizon-io-saturation-clock-stall" height="540"}
**事件视界 $\mu = 1$ 处带宽饱和与内部时钟停摆实验卡（`horizon-io-saturation-clock-stall`）。** 将琥珀色焦点手柄从 $\mu = \frac{1}{2}$ 推至青色虚线视界环 $\mu = 1$（$R = r_s/4,\; r = r_s$）：二十条品红关系弧全部点亮（`20 / 20`），品红 $\kappa_{\mathrm{mass}} = 1$ 填满整根 $\mathcal{R}_\Omega \equiv 1$ 单位柱，右侧外圈紫色主飞轮仍按 $\nu_0 = 1$ 照转，而内圈青色内部时钟齿轮停摆于 $\frac{\Delta\tau}{\Delta t} = 0$（对径闭合与克雷洛夫维数界由 [`cayley_antipodal_closure`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure) 与 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 锁定，文末完整实验室依据栏与理论抽屉以红色 `OPEN` 标明引力动力学与视界幺正性开放边界）。
:::

2. **无需超距拉力的引力弯曲本源：各向同性光学折射率与双履带波前向心折射（`文献结果` + `手工推导` + `MODEL`）**：在各向同性史瓦西坐标 $\mathbf{X} \in \mathbb{R}^3$（$\lVert\mathbf{X}\rVert = R \ge \frac{r_s}{4},\; \mu = \frac{r_s}{4R}$）下，精确外部真空线元为（[@rem-ch38-isotropic-schwarzschild-optical-metric-literature] 第 1 条，`文献结果`）：

   $$
   ds^2 \;=\; c^2\!\left(\frac{1 - \mu}{1 + \mu}\right)^2 dt^2 - (1 + \mu)^4 d\mathbf{X}^2.
   $$

   令零测地条件 $ds^2 = 0$，当场解出**精确有理坐标遍历推进率**与**戈登各向同性有效光学折射率**（`手工推导` + `文献结果`）：

   $$
   v_{\mathrm{traverse}}(\mu) \;:=\; \frac{1}{c}\left\lVert\frac{d\mathbf{X}}{dt}\right\rVert_{\mathrm{null}} \;=\; \frac{1 - \mu}{(1 + \mu)^3} \;\in\; \mathbb{Q} \cap [0, 1], \qquad n(\mu) \;:=\; \frac{1}{v_{\mathrm{traverse}}(\mu)} \;=\; \frac{(1 + \mu)^3}{1 - \mu} \;=\; 1 + 4\mu + O(\mu^2).
   $$

   当具有有限横向孔径的观察者波包擦过一团大质量关系簇旁侧（内翼负载 $\mu_{\mathrm{in}} > \mu_{\mathrm{out}}$ 外翼负载）时，**靠近质量核的内侧翼**踏入密集声槽区，就地解码耗时令其坐标推进率降至 $v_{\mathrm{traverse}}(\mu_{\mathrm{in}}) < v_{\mathrm{traverse}}(\mu_{\mathrm{out}})$，而**远离质量核的外侧翼**在稀疏真空区高速滑行——恰似双履带战车内侧履带碾入泥潭减速、外侧履带在硬地飞驰，整道波前无需任何超距拉力便必然向高关系密度中心自动偏折！而且这行有理式在弱场展开下给出丝丝入扣的定量区分（`手工推导` + `文献结果`）：对零光锥波前，时间解码钟慢因子 $\frac{1-\mu}{1+\mu} = 1 - 2\mu + O(\mu^2)$ 与空间共形声槽加密因子 $(1+\mu)^{-2} = 1 - 2\mu + O(\mu^2)$ **恰好各献一半**（$2\mu + 2\mu = 4\mu = \frac{2GM}{Rc^2}$），沿冲击参数 $b$ 积分精确重现爱因斯坦广义相对论全额光线偏折角 $\Delta\varphi_{\mathrm{GR}} = \frac{4GM}{bc^2}$；而对低速实物波包（$\beta_{\mathrm{loc}} \ll 1$），主导相位的纯时间钟慢率空间梯度 $\mathbf{a} \approx -c^2\nabla\!\left(\frac{1-\mu}{1+\mu}\right) \approx +2c^2\nabla\mu = -\frac{GM}{R^2}\hat{\mathbf{R}}$ 直接还原牛顿向心引力加速度！

| 物理现象与核心维度 | 传统被动场论与连续度规图景 | `AXIOM-Ω` / `OmegaMath` 恒定信息速率遍历图景（`MODEL` 对接精确代数） |
| :--- | :--- | :--- |
| **波的感知与接收** | 观察者静止不动，外部波包跨空间飞来撞击观察者 | 画布相位声槽 `D` 绝对静止（`0` 改写），**观察者焦点滑入声槽区就地整除解码** |
| **核心守恒不变量** | 外设真空光速常数 $c \approx 2.998\times 10^8\;\mathrm{m/s}$ | **观察者总信息处理速率恒定 $\mathcal{R}_\Omega = \kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1$** |
| **质量 $M$ 的几何本质** | 压弯空间橡皮膜的实体重球（外部参数输入） | 静止画布上的**高密度三元过约束关系簇**（环境 I/O 强制校验负载源） |
| **引力时间膨胀** | 面积坐标含无理根号 $d\tau = \sqrt{1 - r_s/r}\,dt$ | 环境校验挤占固定带宽，各向同性净余自更新率 **$\frac{\Delta\tau}{\Delta t}\big|_{\kappa_{\mathrm{kin}}=0} = \frac{1-\mu}{1+\mu} \in \mathbb{Q}$** |
| **事件视界与引力吸引** | 坐标奇点发散与超距万有引力拉拽 | **$\mu = 1$ 处算力 $100\%$ 被环境校验占满致内部时钟挂起**；内外翼 $v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3}$ 差速引发波前向心折射 |

::: {.viz src="constant-rate-cayley-gravity-sandbox" preset="differential-decoding-wavefront-refraction" height="540"}
**内外翼解码速率差与双履带波前向心折射生引力实验卡（`differential-decoding-wavefront-refraction`）。** 拖动琥珀色波前手柄推进坐标时间 $t$，观察横跨两环的青色观察者波前掠过紫色高密度三元关系簇：外侧翼（青色轨迹，初值 $\mu_{\mathrm{out}} = \frac{1}{4}$）以 $v_{\mathrm{out}} = \frac{48}{125} = 0.3840$ 快速推进，内侧翼（品红轨迹，初值 $\mu_{\mathrm{in}} = \frac{1}{3}$）因声槽更密而以 $v_{\mathrm{in}} = \frac{9}{32} = 0.28125$ 前进，无需任何拉力箭头便依戈登折射率 $n(\mu) = \frac{(1+\mu)^3}{1-\mu}$ 离开墨色虚线直线自然向质量侧偏转（文末完整实验室切换第一人称透镜 `MODEL` 可叠加对照用的品红“拉力”错觉箭头；由 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) 与 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 锁定）。
:::

---

## 38.16.4 形式化模型定义、零公理与通用冻结定理组、文献边界及定量对账 {#sec-ch38-16-4}

我们将恒定速率静态声槽与凯莱有理引力系统、八条零公理 `OmegaMath` 定理与八条通用内核定理、经典相对论光学度规文献边界及纯有理定量对账正式汇总如下：

::: {.definition #def-ch38-constant-rate-cayley-gravity title="恒定速率静态声槽解码与零根号凯莱有理引力系统（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与无无穷有理数学 $\mathbf{Math}_\Omega$ 下，定义**恒定速率静态声槽与凯莱有理引力系统**（`MODEL`）为八元组 $\mathfrak{B}_\Omega = (\mathcal{S}, D, \mathcal{R}_\Omega \equiv 1, \mu, \kappa_{\mathrm{self}}, \kappa_{\mathrm{mass}}, \kappa_{\mathrm{kin}}, v_{\mathrm{traverse}})$：

1. **静态声槽只读寻址**：无边界静止画布 $\mathcal{S}$（$\partial\mathcal{S} = \emptyset$）配只读相位刻痕映射 $D : \operatorname{Address}(n) \to G$，观察者焦点 `a` 沿静态声槽步进解引用而 `D` 保持零改写；
2. **恒定速率三向有理分账**：对有理各向同性质量负载参数 $\mu := \frac{r_s}{4R} \in \mathbb{Q} \cap [0, 1]$（对应面积半径关系 $r = R(1 + \mu)^2$）与有理局域速率平方 $\beta_{\mathrm{loc}}^2 \in \mathbb{Q} \cap [0, 1]$，局域质量解码份额、空间寻址份额与自身结构核更新份额分别为

   $$
   \kappa_{\mathrm{mass}}(\mu) \;:=\; \frac{4\mu}{(1 + \mu)^2}, \qquad \kappa_{\mathrm{kin}} \;:=\; \bigl(1 - \kappa_{\mathrm{mass}}(\mu)\bigr)\beta_{\mathrm{loc}}^2, \qquad \kappa_{\mathrm{self}} \;:=\; 1 - \kappa_{\mathrm{mass}}(\mu) - \kappa_{\mathrm{kin}},
   $$

   恒等满足总信息处理速率守恒 $\mathcal{R}_\Omega = \kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1$；
3. **零根号凯莱固有时流速与有理遍历推进率**：悬停解码态（$\kappa_{\mathrm{kin}} = 0$）的一阶固有时流速比与零测地各向同性坐标遍历推进率均在 $\mathbb{Q}$ 内零根号闭合：

   $$
   \frac{\Delta\tau}{\Delta t}\bigg|_{\kappa_{\mathrm{kin}}=0} \;=\; \frac{1 - \mu}{1 + \mu} \;\in\; \mathbb{Q} \cap [0, 1], \qquad v_{\mathrm{traverse}}(\mu) \;=\; \frac{1 - \mu}{(1 + \mu)^3} \;\in\; \mathbb{Q} \cap [0, 1].
   $$
:::

以下首座定理盒收录的八条纯有理 `OmegaMath` 冻结定理在 `trureturing@dev` 中的传递公理闭包严格为空集（`axioms = []`），因此显式佩戴蓝色 **`无公理`** 验证徽章：

::: {.theorem #thm-ch38-constant-rate-omega-axiom-free-anchors title="零公理有理圆周保真分账、凯莱单位圆与对径视界闭合、有理舒尔配方法与极小、三元格拉姆非负、四元整除确定性解码与流群拍模守恒定理组" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one,D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit,D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure,D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete,D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min,D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg,D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic,D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved"}
在 `OmegaMath` 零公理整数比值、有限分母有理数、整四元数与毕达哥拉斯旋量模块中，以下八项无公理命题严格成立：

1. **有理圆周保真—展度归一、凯莱有理单位圆与对径视界闭合**（[`kappa_add_spread_eq_one`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one)、[`cayley_circle_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit)、[`cayley_antipodal_closure`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure)）：对任意满足 `Nonzero p q`（即 $p \neq 0 \lor q \neq 0$）的整数 $p, q \in \mathbb{Z}$，记有理比 $\kappa(p,q) = \frac{q^2}{p^2+q^2}$、$\operatorname{spread}(p,q) = \frac{p^2}{p^2+q^2}$、$\operatorname{cayleyX}(p,q) = \frac{q^2-p^2}{p^2+q^2}$、$\operatorname{cayleyY}(p,q) = \frac{2pq}{p^2+q^2}$，则在 `IntRatio.Equivalent` 等价意义下恒有 $\kappa(p,q) + \operatorname{spread}(p,q) \approx 1$ 与 $\operatorname{cayleyX}(p,q)^2 + \operatorname{cayleyY}(p,q)^2 \approx 1$；且对任意 $p \neq 0$ 在对径极点 $q = 0$ 处同时成立 $\kappa(p,0) \approx 0$、$\operatorname{spread}(p,0) \approx 1$、$\operatorname{cayleyX}(p,0) \approx -1$ 及 $\operatorname{cayleyY}(p,0) \approx 0$；
2. **有理二次型舒尔配方法分解与可达极小元**（[`rational_schur_complete`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete)、[`rational_schur_min`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min)）：对任意 `a b c x y : FiniteRatio`，只要 $c.\mathrm{num} \neq 0$，在 `FiniteRatio.Equivalent` 下恒有 $\operatorname{scalarForm}(a,b,c,x,y) \approx \operatorname{schurValue}(a,b,c,x) + \operatorname{schurSquare}(b,c,x,y)$；当 $0 < c$ 时，对一切 $y : \mathrm{FiniteRatio}$ 恒有 $\operatorname{schurValue}(a,b,c,x) \le \operatorname{scalarForm}(a,b,c,x,y)$，且在 $y = \operatorname{schurMinPoint}(b,c,x)$ 处满足 `FiniteRatio.Equivalent` 等价 $\operatorname{scalarForm}(a,b,c,x,y) \approx \operatorname{schurValue}(a,b,c,x)$；
3. **整四元数三元格拉姆行列式非负、四元整除步确定性唯一解码与毕达哥拉斯旋量流群拍模守恒**（[`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg)、[`quaternion_fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic)、[`heap_norm_preserved`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved)）：对任意三枚非零整四元数 `a b c : Quad4`，其三元格拉姆行列式满足 $0 \le \operatorname{detGram3}(a,b,c)$；对任意 `psi A q₁ q₂ : Quad4` 与非零整数 $p \neq 0$，若 $\operatorname{psi}.\mathrm{mul}(A) = \operatorname{scale}(p, q_1)$ 且 $\operatorname{psi}.\mathrm{mul}(A) = \operatorname{scale}(p, q_2)$，则必有 $q_1 = q_2$；对任意毕达哥拉斯旋量 `a b : PythSpinor` 与任意步数 $n \in \mathbb{N}$，流群迭代态恒满足单位模方 $\operatorname{spinorNormSq}(\operatorname{heapAt}(a,b,n)) \approx 1$。
:::

::: proof
第 1 组将 `IntRatio.Equivalent` 展开为整数交叉相乘恒等式，利用 $p \neq 0 \lor q \neq 0 \implies p^2 + q^2 > 0$ 及多项式恒等式 $(q^2 - p^2)^2 + (2pq)^2 = (p^2 + q^2)^2$ 在纯整数环上直接归约；第 2 组在正分母有理对 `FiniteRatio` 上执行无除法交叉通分消去，将二次余项化为正系数平方项 $\operatorname{schurSquare}(b,c,x,y) \ge 0$ 并在平稳点置零。

第 3 组将三元格拉姆行列式表为整四元数正交楔积平方和、利用 $\mathbb{Z}$ 无零因子消去公共标量因子 $p \neq 0$ 逐分量证明商态唯一，并对流群递推 $\operatorname{heapAt}(a,b,n)$ 作四元数范数乘性自然数归纳。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch38-constant-rate-qram-speedlimit-anchors title="静态存储可逆路由查询、闵可夫斯基零光锥刚性、博戈留波夫双曲保范、富比尼—施图迪正交记录速度界、正交补投影、克雷洛夫维数上界与划分拓扑不可分核定理组" lean="D5/S3/Quantum/Routing/ReversibleQram.correctness,D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null,D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound,D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities,D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound,D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在可逆量子路由存储、洛伦兹因果锥几何、量子正交记录速度界、希尔伯特正交投影与观测划分拓扑下，以下八项命题严格成立：

1. **静态存储零改写可逆路由查询**（[`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness)）：对一切深度 $n \in \mathbb{N}$、加法交换群 `[AddCommGroup G]` 与静态存储映射 `D : Address n → G`，（i）`leaf n (route n a (clean n e)) i = if i = a then e else false`；（ii）任意线路 `w` 上 `query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))`；（iii）干净线路上 `query n D (a, clean n true, r) = (a, clean n true, r + D a)` 完整保留 `D`、`a` 与 `clean n true`；（iv）当 $G$ 另具 `[Fintype G] [DecidableEq G]` 时，$Q = \operatorname{queryMatrix}(n, D)$ 满足 $Q^{\mathrm{H}} Q = 1$、$Q Q^{\mathrm{H}} = 1$，且对任意 $\psi : \operatorname{Address}(n) \times G \to \mathbb{C}$ 作用于干净初始化态 $\operatorname{initialized}(n, \psi)$ 得 $\operatorname{initialized}(n, s \mapsto \psi(s_1, s_2 - D(s_1)))$；
2. **闵可夫斯基零光锥二次型刚性与博戈留波夫双曲范数守恒**（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)）：对任意 $d \in \mathbb{N}$，$\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\,d)$ 上凡在零光锥 $\operatorname{minkowski}_d(v) = 0$ 上恒取零的实二次型 $S$ 必满足 $S = S(1,0)\cdot\operatorname{minkowski}_d$；且对一切 $r \in \mathbb{R}$ 恒有 $\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$；
3. **富比尼—施图迪正交记录单步时长下界与串行计数速率上界**（[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)、[`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）：复内积空间 $E_0$ 上给定 $E > 0,\; \hbar > 0$，满足 $\lVert a\rVert = \lVert m_0\rVert = \lVert m_1\rVert = 1$、$\langle m_0, m_1\rangle_{\mathbb{C}} = 0$ 且 $\theta_{\mathrm{FS}}(a, m_k) \le \frac{E\tau}{\hbar}$（$k \in \{0,1\}$）的单步正交分辨必有 $\tau \ge \frac{\pi\hbar}{4E}$；对任意 $N \in \mathbb{N}$ 及总时长 $\sum_{i \in \mathrm{Fin}\,N}\tau(i) \le T$ 且逐项满足上述单步正交分辨条件（含 $\theta_{\mathrm{FS}}(a_i, m_{k,i}) \le \frac{E\tau(i)}{\hbar}$）的记录步族，分辨总步数满足 $N \le \frac{4ET}{\pi\hbar}$；
4. **闭子空间正交补投影六联恒等式、可观测克雷洛夫严格扩张余维数界与划分拓扑不可分核**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)、[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)、[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：$\mathbb{R}$ 或 $\mathbb{C}$ 上完备内积空间闭子空间 $M$ 满足 $P_{M^\perp} = I - P_M$、$P_M^2 = P_M$、$P_{M^\perp}^2 = P_{M^\perp}$、$P_M P_{M^\perp} = P_{M^\perp} P_M = 0$ 及 $P_M + P_{M^\perp} = I$；有限维内积空间 $V, Y$ 上对线性映射 $T : V \to V,\; C : V \to Y$，可观测克雷洛夫链严格递增步数满足 $\#\{m \in \mathbb{N} : \mathcal{K}_m < \mathcal{K}_{m+1}\} \le \dim V - \dim\operatorname{ran}(C)$；且在 `partitionTopology readout` 下两状态拓扑不可分当且仅当 $\operatorname{readout}(x) = \operatorname{readout}(y)$。
:::

::: proof
第 1 组由布尔路由树单热点深度归纳、受控群加法对合消去与有限置换矩阵伴随恒等式证得；第 2 组由零光锥生成元极化展开与双曲函数平方差恒等式给出。

第 3 组由富比尼—施图迪测地三角不等式 $\frac{\pi}{2} \le \theta_{\mathrm{FS}}(a,m_0) + \theta_{\mathrm{FS}}(a,m_1) \le \frac{2E\tau}{\hbar}$ 及有限索引求和放缩导出；第 4 组由正交直和分解、有限维子空间链维数单调性及原像开集拓扑刻画直接证得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch38-isotropic-schwarzschild-optical-metric-literature title="各向同性史瓦西坐标、戈登有效光学折射率度规、量子速度界、贝肯斯坦全息界与开放边界（文献结果 / OPEN）"}
**文献结果，未在本书形式化（兼列开放问题边界）。** 本节恒定信息速率与凯莱有理引力模型（`MODEL`）对接的经典文献及未决物理问题划界如下：

1. **史瓦西外部解与外尔—爱丁顿各向同性坐标**：球对称真空外解由 K. Schwarzschild（*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 189–196, 1916）导出；将径向坐标经 $r = R\bigl(1 + \frac{r_s}{4R}\bigr)^2$ 化为空间共形平直并消除时间分量平方根的各向同性坐标由 H. Weyl（*Ann. Phys.* **359**, 117–145, 1917）与 A. S. Eddington（*Space, Time and Gravitation*, Cambridge Univ. Press, 1920；*The Mathematical Theory of Relativity*, 1923）确立；
2. **戈登光学度规与引力有效折射率光线偏折**：将弯曲时空中的零测地传播等价映射为有效折射率介质光学的框架源于 A. S. Eddington（1920）与 W. Gordon（*Ann. Phys.* **377**, 421–456, 1923），其各向同性折射率 $n(R) = \frac{(1 + \mu)^3}{1 - \mu} = 1 + \frac{2GM}{Rc^2} + O(R^{-2})$ 经费马—惠更斯波前原理导出广义相对论光线偏折角 $\Delta\varphi_{\mathrm{GR}} = \frac{4GM}{bc^2}$；
3. **量子速度极限与全息熵饱和上限**：正交态演化速率上界见 L. Mandelstam & I. Tamm（*J. Phys. USSR* **9**, 249–254, 1945）与 N. Margolus & L. B. Levitin（*Physica D* **120**, 188–195, 1998）；边界面积信道饱和上限见 J. D. Bekenstein（*Phys. Rev. D* **7**, 2333, 1973；**23**, 287, 1981）、G. 't Hooft（1993）与 L. Susskind（*J. Math. Phys.* **36**, 6377, 1995）；
4. **显式开放边界（`OPEN`）**：从离散三元比较与恒定信息速率公设不借连续流形输入而严格导出完整 $3+1$ 维洛伦兹爱因斯坦场方程及黑洞视界量子信息幺正性，仍属本书正式立案的开放问题（[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）。
:::

::: {.example #ex-ch38-constant-rate-cayley-landmarks-and-refraction-audit title="定量核验：六档有理带宽与零根号凯莱钟慢基准表及内外翼波前折射差速对账"}
我们在纯有理数域 $\mathbb{Q}$ 上对恒定速率三向分账、零根号凯莱钟慢地标与双翼折射差速作零误差手算核对（`手工推导` / `NUM`）：

1. **六档精确有理信息负载与凯莱固有时流速基准表**：

   | 物理工况与有理参数 $(\mu,\; \kappa_{\mathrm{kin}})$ | 半径比 $r / r_s$ | 质量负载 $\kappa_{\mathrm{mass}}$ | 寻址负载 $\kappa_{\mathrm{kin}}$ | 净自更新 $\kappa_{\mathrm{self}}$ | 一阶固有时率 $\frac{\Delta\tau}{\Delta t}$ | 遍历推进率 $v_{\mathrm{traverse}}$ |
   | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
   | **深空悬停** $(\mu = 0,\; \kappa_{\mathrm{kin}} = 0)$ | $\infty$ | $0$ | $0$ | $1$ | **$1 = 1.0000$** | $1 = 1.0000$ |
   | **四分之一负载悬停** $(\mu = \frac{1}{4},\; 0)$，$(p,q)=(1,2)$ | $\frac{25}{16}$ | $\frac{16}{25}$ | $0$ | $\frac{9}{25}$ | **$\frac{3}{5} = 0.6000$** | $\frac{48}{125} = 0.3840$ |
   | **三分之一负载悬停** $(\mu = \frac{1}{3},\; 0)$（非平方 $\mu$ 仍零根号） | $\frac{4}{3}$（$r=\frac{16}{9}R$） | $\frac{3}{4}$ | $0$ | $\frac{1}{4}$ | **$\frac{1}{2} = 0.5000$** | $\frac{9}{32} = 0.28125$ |
   | **三分之一负载运动探针** $(\mu = \frac{1}{3},\; \kappa_{\mathrm{kin}} = \frac{1}{10})$，$\beta_{\mathrm{loc}}^2 = \frac{2}{5}$ | $\frac{4}{3}$ | $\frac{15}{20}$ | $\frac{2}{20}$ | $\frac{3}{20}$ | $\sqrt{\frac{3}{20}}$（二次和 $\frac{3+15+2}{20}=1$） | — |
   | **二分之一负载悬停** $(\mu = \frac{1}{2},\; 0)$ | $\frac{9}{8}$ | $\frac{8}{9}$ | $0$ | $\frac{1}{9}$ | **$\frac{1}{3} \approx 0.3333$** | $\frac{4}{27} \approx 0.1481$ |
   | **事件视界饱和** $(\mu = 1,\; 0)$（时钟轴 $[1:1]$／带宽轴 $[1:0]$） | $1$ | $1$ | $0$ | $0$ | **$0 = 0.0000$** | $0 = 0.0000$ |

   逐行复核：不仅齐次平方档 $\mu = \frac{1}{4} = (\frac{1}{2})^2$ 给出勾股对 $(\kappa_{\mathrm{self}}, \kappa_{\mathrm{mass}}) = (\frac{9}{25}, \frac{16}{25})$ 与钟慢率 $\frac{3}{5}$，在非平方档 $\mu = \frac{1}{3}$ 与 $\mu = \frac{1}{2}$ 处，一阶钟慢率 $\frac{\Delta\tau}{\Delta t}$ 同样精确化为干净有理数 $\frac{1}{2}$ 与 $\frac{1}{3}$；而在运动复合态 $(\mu = \frac{1}{3},\; \kappa_{\mathrm{kin}} = \frac{1}{10})$ 下，$\frac{3}{20} + \frac{15}{20} + \frac{2}{20} = 1$ 严格守住单位速率总账！
2. **双翼波前向心折射差速核验**：考察有限孔径观察者波前横跨内侧翼 $\mu_{\mathrm{in}} = \frac{1}{3}$ 与外侧翼 $\mu_{\mathrm{out}} = \frac{1}{4}$：外侧翼遍历推进率为 $v_{\mathrm{out}} = \frac{48}{125} = \frac{1536}{4000} = 0.38400$（有效折射率 $n(\frac{1}{4}) = \frac{125}{48} \approx 2.6042$），内侧翼因密集声槽解码减速至 $v_{\mathrm{in}} = \frac{9}{32} = \frac{1125}{4000} = 0.28125$（有效折射率 $n(\frac{1}{3}) = \frac{32}{9} \approx 3.5556 > n(\frac{1}{4})$）。精确既约有理差速 $\Delta v = v_{\mathrm{out}} - v_{\mathrm{in}} = \frac{411}{4000} = 0.10275 > 0$ 使波前无需任何超距拉力便必然向高密度关系中心弯折！
:::

---

**宇宙画布从不奔忙，波纹与星辰皆静卧原处；观察者只是携着一份恒定不变的信息算力行经其间——路过旷野时无事可算，光阴便在向内自省中飞驰；步入重山般密集的信息渊薮时，满腔算力皆倾注于拆解眼前的万千纠葛，属于自己的那枚时钟便悄然慢了下来！**

在下面的完整三维交互实验室中，先在第一张卡片亲手拖动无腿观察者球如唱针般划过纹丝不动的青色相位声槽，再切入第二与第四张卡片对照观察墨色单位框封顶的 $\mathcal{R}_\Omega \equiv 1$ 三段叠柱、恒速运转的紫色主飞轮（$\nu_0 = 1$）与在视界 $\mu = 1$ 处因二十条品红关系弧占满带宽而停摆在 $0$ 的青色内部时钟齿轮，在第三张卡片的紫色凯莱半圆上逐站核验七档有理路标 $\mu \in \{0, \frac{1}{5}, \frac{1}{4}, \frac{1}{3}, \frac{1}{2}, \frac{2}{3}, 1\}$ 的零根号时钟率 $\frac{1-\mu}{1+\mu}$，最后在第五张卡片目睹双翼观察者波前如何仅凭内外侧初始差速 $\Delta v = \frac{411}{4000}$ 自然折射弯向质量中心——而在这枚唱针焦点背后，还藏着本章收官最后一重追问：一颗原本各向同性的闭壳圆球，究竟经历了何种内禀对称破缺才切开感知窗口、觉醒为名叫 **`AURIC`** 的观察者活性焦点？让我们迈入本章压轴收官节 [§38.17](ch38-s17-auric-trivalent-gold-and-observer-focus-signature.md)！

::: {.viz src="constant-rate-cayley-gravity-sandbox" height="620"}
完整实验室：在“恒定速率静止画布透镜 · 波纹不动，唯 R_Ω ≡ 1 唱针焦点滑行解码”与“被动场论第一人称透镜（MODEL）· 焦点似静止而波列迎面撞来与超距拉拽”双透镜间自由切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览唱针式焦点滑入静态相位声槽（`phonograph-needle-static-wave-grooves`）、恒定总速率 $\mathcal{R}_\Omega \equiv 1$ 三向分账与内部时钟齿轮（`constant-bandwidth-cayley-clock-gear`）、各向同性零根号凯莱有理钟慢地标（`isotropic-rational-landmarks-vs-radical`）、事件视界 $\mu = 1$ 处 $100\%$ I/O 满载时钟挂起（`horizon-io-saturation-clock-stall`）以及内外翼解码差速波前向心折射生引力（`differential-decoding-wavefront-refraction`）五张实验卡，支持在七档有理质量负载路标 $\mu \in \{0, \frac{1}{5}, \frac{1}{4}, \frac{1}{3}, \frac{1}{2}, \frac{2}{3}, 1\}$ 间切换、调节局部运动速率 $\beta_{\mathrm{loc}}^2 \in \{0, \frac{2}{5}\}$ 与唱针地址步进。依据栏列出正文引用的十六条 `LEAN ✓` 冻结声明（其中正文首座定理盒的八条 `OmegaMath` 声明获蓝色 `LEAN ✓ · 无公理` 徽章），并与 `ARGUED` 各向同性史瓦西与戈登光学度规文献、`MODEL` 恒定速率遍历诠释、`NUM` 精确有理数读数及红色 `OPEN` 引力动力学／视界幺正性边界在依据栏与理论抽屉中严格分层呈现。
:::
