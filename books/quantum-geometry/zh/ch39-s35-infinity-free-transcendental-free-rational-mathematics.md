# 32.7 无无穷·无超越数的有限有理数学（Math_Ω）：齐次射影闭环、凯莱有理旋转与无极限二阶射流微积分 {#sec-ch39-infinity-free-transcendental-free-rational-mathematics}

> *“那我们实际上可以建立一种没有无穷, 没有超越数的数学”*

顺着 [§32.6](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md) 划清“零误差结构—有理账本”与“平直小数截断账本”的边界之后，本章的三元数代数与数系重铸迎来了最具颠覆性、也最顺理成章的建构命题：**既然“无穷大 $\infty$”只是拒绝闭合成环的开口直线在尽头留下的裂口，而“超越数 $\pi, e, \ln 2$”只是拒绝顺应曲率的平直切尺在圆弧边缘磨出的无穷级数碎屑——我们能否干脆撤去康托尔实无穷集合（$\aleph_0, \aleph_1$）与不可数实数连续统 $\mathbb{R}$ 的脚手架，直接在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的三元数球面有理点与 `{0, 1/2, 1}` 因果阶梯上，建立起一座既没有实无穷、也没有超越数，却完备覆盖球面几何、李群动力学、微积分与算术密码的全可计算有限有理数学体系 $\mathbf{Math}_\Omega$？**

答案不仅完全可行，而且比建立在非构造性选择公理与实数连续统之上的传统标准数学更加纯粹、零悖论，并与物理有限视界及数字计算机底层硬件 $100\%$ 同构（将撤去康托尔实无穷与超越数后重构的“$\Omega$-有限有理数学体系 $\mathbf{Math}_\Omega$”整体认识论纲领、物理视界总节拍封顶 $M_\Omega$ 假说以及传统 vs. $\mathbf{Math}_\Omega$ 六维总表标为 **`MODEL`**；完备秩五三元比较四元数同构、弦距读数恒等式、定基流群分解、流群切比雪夫递推、赋范代数指数级数有限截断余项上界、六根模方为 $5$ 的整坐标轴对单位二球面的无正交开覆盖、既约有理数分母约化与有限连分数收敛子长度对数上界、任意有限素数集的确定性逃逸新素数构造、具备可判定相等性幺半群的已验证素因子剥离定阶算法、有理阿代尔乘积守恒、大于等于 $2$ 自然数自然对数的无理性、命名生成树有限步相位平移、交换加群单纯形四面体粗剖分上链正合及二进制名称比较机器显式有限时间停机求值等十五项核心命题由下文 [@thm-ch39-math-omega-finite-rational-anchors] 的冻结 **`LEAN ✓`** 声明严格锁定；齐次有理射影线 $\mathbb{QP}^1$ 到有理圆周 $S^1(\mathbb{Q})$ 的全域无奇点双射、三维有理凯莱旋转矩阵 $\mathbf{R}(\boldsymbol{\sigma}) = (\mathbf{I}-X)^{-1}(\mathbf{I}+X)$ 正逆恒等式与半周旋转的两步分解、有理二阶射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ 的两项精确求逆与 $\kappa(1+\eta) = \frac{1}{2} - \frac{1}{2}\eta + \frac{1}{4}\eta^2$ 纯四则求导及差商割线偏差对账属 **`手工推导` / `NUM`**；图灵可计算实数集勒贝格零测度定理、巴拿赫—塔斯基—罗宾逊五块分球悖论、怀尔德伯格有理三角学、科克—劳维尔合成微分几何幂零步元以及塔斯基实闭域可判定性对比马季亚谢维奇丢番图不可判定边界属 **`文献结果`**）。

## 32.7.1 数域重构：以齐次有理射影对 $[P : Q] \in \mathbb{QP}^1$ 与按需有限视界废除 $\mathbb{R}$ 与 $\infty$ {#sec-ch39-35-1}

传统数学之所以被迫引入“实无穷”与“不可数连续统 $\mathbb{R}$”，根源在于它把两端开口的平直直线奉为数系母体——直线无法自我闭合，只能在尽头打上奇点补丁 $\infty$；而在康托尔不可数实数轴 $\mathbb{R}$ 上，由于有限字母表上的有限程序/图灵机仅有可数无穷多个，**勒贝格测度占比 $100\%$ 的实数在算法意义上都是连有限定义程序都不存在的不可计算幽灵**（Turing 1936，`文献结果`）。在 $\mathbf{Math}_\Omega$ 中，所有合法一维标度仅由**齐次互素整数射影对**与**按需惰性视界**精确编码：

1. **齐次射影对径闭合消灭 $\infty$ 与除零奇点（`手工推导`）**：
   废除开口实数轴，将一维标度定义为不全为零的互素整数射影对 $[P : Q] \in \mathbb{QP}^1$（$(P, Q) \in \mathbb{Z}^2 \setminus \{(0, 0)\}$，$\gcd(\lvert P\rvert, \lvert Q\rvert) = 1$，满足 $(P, Q) \sim (-P, -Q)$）。由于 $(P, Q) \neq (0, 0)$ 恒保证整数平方和 **$P^2 + Q^2 \ge 1 > 0$**，其内禀保真度、失准展开度与有理单位圆坐标在整条 $\mathbb{QP}^1$ 上**处处分母严格为正、零除零奇点**：

   $$
   \kappa([P : Q]) \;=\; \frac{Q^2}{P^2 + Q^2} \in \mathbb{Q} \cap [0, 1], \qquad s([P : Q]) \;=\; \frac{P^2}{P^2 + Q^2} \in \mathbb{Q} \cap [0, 1], \qquad C([P : Q]) \;=\; \left(\frac{Q^2 - P^2}{Q^2 + P^2},\; \frac{2PQ}{Q^2 + P^2}\right) \in S^1(\mathbb{Q}).
   $$

   且 $C : \mathbb{QP}^1 \xrightarrow{\sim} S^1(\mathbb{Q})$ 给出到**整条有理单位圆周**（含北极点 $(-1, 0)$！）的一一双射，其中 `{0, 1/2, 1}` 给出三种锚点读数：
   - **过去同一极**：$[0 : 1] \;\Longleftrightarrow\; \kappa = \mathbf{1},\; s = \mathbf{0},\; C = (1, 0)$；
   - **现在自对偶赤道**：$[1 : 1] \;\Longleftrightarrow\; \kappa = \mathbf{\frac{1}{2}},\; s = \mathbf{\frac{1}{2}},\; C = (0, 1)$；
   - **未来对径闭合极**：在平直尺上触发 $1/0$ 崩溃的“$\infty$”，在此仅是普通而精确的整数对 **$[1 : 0] \;\Longleftrightarrow\; \kappa = \mathbf{0},\; s = \mathbf{1},\; C = (-1, 0)$**！另一赤道点 $[-1 : 1]$ 给出 $C=(0,-1)$。这四个有理点位于紧致的实圆周上。有理圆周在实圆周中稠密，在诱导拓扑下非紧。

::: {.viz src="infinity-free-rational-mathematics-sandbox" preset="homogeneous-projective-antipodal-closure" height="500"}
无 $\infty$ 齐次射影闭环卡（`homogeneous-projective-antipodal-closure`）：紫色三元球的实赤道圆标出有理点，琥珀探针稳稳停在曾令平直尺除零爆炸的对径北极 `[P : Q] = [1 : 0]`（`P² + Q² = 1 > 0, κ = 0/1 = 0.0000, C = (−1, 0)`），与 `[0 : 1]`、`[1 : 1]`、`[−1 : 1]` 一同标出四个有理点，对比下方品红开口切线在 `Q → 0` 处向两侧断裂发散。
:::

2. **以观察者精度视界 $\varepsilon_{\mathrm{self}} = \frac{1}{M}$ 与按需生成流取代康托尔实无穷 $\aleph_0, \aleph_1$（`LEAN ✓` + `文献结果` + `MODEL`）**：
   传统集合论假定可以把无穷多元素一次性装进静态“已完成无穷集合”，配合非构造性选择公理滋生出巴拿赫—塔斯基分球悖论（将三维实心单位球切成最少 $5$ 块不可测碎片，仅经刚体旋转平移即重拼成两颗等大实心单位球，Banach & Tarski 1924；Robinson 1947，`文献结果`）。$\mathbf{Math}_\Omega$ 严格区分非法的“已完成实无穷口袋”与合法的**按需有限构造律**：
   - 在任意给定观察者有理分辨率 $\varepsilon_{\mathrm{self}} = \frac{1}{M}$（$M \in \mathbb{N}_+$；物理宇宙受视界总节拍 $M_\Omega$ 封顶属 `MODEL`）下，状态驻留于有限既约有理格网 $\mathbb{QP}^1_{\le M} := \{[P : Q] \in \mathbb{QP}^1 : \max(\lvert P\rvert, \lvert Q\rvert) \le M\}$（当复合运算产生更高分子分母时，按惰性求值提升高度界 $M \mapsto M'$），且任一有理数 $x \in \mathbb{Q}$ 的连分数展开在至多 $2\lfloor\log_2(\operatorname{den} x)\rfloor + 1$ 步欧几里得整除内严格有限终止（[`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den)、[`convergents_length_log`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log)，`LEAN ✓`）；
   - 素数亦无需预设静态无穷集合 $\mathbb{P}$：内核冻结的**素数轴逃逸定理** [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)（`LEAN ✓`）证明，对任意有限素数集 $S$，整数 $N_S := \prod_{p \in S} p + 1$ 对一切 $p \in S$ 恒余 $1$，并确定性地给出整除 $N_S$ 的新素数 $q \notin S$（如 $S = \{2, 3, 5\}$ 一步构造 $N_S = 31$ 得新素数 $q = 31$；$S = \{2, 3, 5, 7, 11, 13\}$ 构造 $N_S = 30031 = 59 \times 509$ 得新素数 $q = 59$）！

::: {.viz src="infinity-free-rational-mathematics-sandbox" preset="lazy-prime-escape-and-decidable-horizon" height="500"}
有限视界格网与按需素数逃逸卡（`lazy-prime-escape-and-decidable-horizon`）：在有限分辨率视界 `M = 12`（`ε_self = 1/12`）下展示球面可数有限既约格点与至多 `2⌊log₂ q⌋ + 1` 步终止的有限连分数链，琥珀焦点检视有限素数集 `S = {2, 3, 5}` 触发正交盲区 `∏p + 1 = 31` 并按需逃逸生出新素数结 `q = 31 ∉ S`。
:::

## 32.7.2 几何与动力学重构：以凯莱有理正逆变换与切比雪夫递推废除 $\pi$、$e$ 与超越函数 {#sec-ch39-35-2}

扔掉 $\pi$、$e$、$\sin$、$\cos$ 与 $\ln$ 之后，三维球面旋转、李群—李代数映射与简谐波不但毫发无损，反而**彻底摆脱了泰勒无穷级数的截断失真**：

### 32.7.2.1 无 $\pi$、无 $e$、无根号的三维真球旋转（有理凯莱正逆桥） {#sec-ch39-35-2-1}

在三维有理空间中任取有理生成元 $\boldsymbol{\sigma} = (\sigma_1, \sigma_2, \sigma_3)^\top \in \mathbb{Q}^3$，记其反对称叉乘矩阵为 $X = [\boldsymbol{\sigma}]_\times \in \mathfrak{so}(3, \mathbb{Q})$（满足 $X\mathbf{v} = \boldsymbol{\sigma} \times \mathbf{v}$，$X^\top = -X$）。传统数学用无穷超越级数 $\exp(X) = \sum_{k=0}^\infty \frac{1}{k!}X^k$ 将 $X$ 映入 $\mathrm{SO}(3)$；在欧氏算子范数 $\lVert\cdot\rVert_{\mathrm{op}}$ 下，其 $n$ 项截断在满足 $\lVert X\rVert_{\mathrm{op}} \le r < n + 1$（$r \ge 0$）时的余项由 [`exp_remainder_le`](lean:D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le) 给出上界，而任一正次数截断（$n \ge 2$）在一般非零生成元上一步即破坏正交性（至多存在 $\lfloor(n - 2)/2\rfloor$ 个正值 $\lVert\boldsymbol{\sigma}\rVert^2$ 可保模，见 [§32.7.5.2](#sec-ch39-35-5-2-cayley-composition-taylor-barrier)）！

$\mathbf{Math}_\Omega$ 直接以纯四则运算的**有理凯莱正逆变换**（Cayley 1846，`文献结果` + `手工推导`）取代 $\exp(X)$ 与 $\ln\mathbf{R}$：

$$
\mathbf{R}(\boldsymbol{\sigma}) \;=\; (\mathbf{I} - X)^{-1}(\mathbf{I} + X) \;=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)\mathbf{I} + 2X + 2\boldsymbol{\sigma}\boldsymbol{\sigma}^\top}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in \mathrm{SO}(3, \mathbb{Q}), \qquad X \;=\; (\mathbf{R} + \mathbf{I})^{-1}(\mathbf{R} - \mathbf{I}) \quad \bigl(\det(\mathbf{R} + \mathbf{I}) \neq 0\bigr).
$$

由 $X^2 = \boldsymbol{\sigma}\boldsymbol{\sigma}^\top - \lVert\boldsymbol{\sigma}\rVert^2\mathbf{I}$ 与 $X\boldsymbol{\sigma} = \mathbf{0}$，纯多项式展开立证 $(\mathbf{I} - X)\bigl((1-\lVert\boldsymbol{\sigma}\rVert^2)\mathbf{I} + 2X + 2\boldsymbol{\sigma}\boldsymbol{\sigma}^\top\bigr) \equiv (1 + \lVert\boldsymbol{\sigma}\rVert^2)(\mathbf{I} + X)$（`手工推导`）：

- **分母恒正与半周旋转分解**：对一切 $\boldsymbol{\sigma} \in \mathbb{Q}^3$，$\det(\mathbf{I} - X) = 1 + \lVert\boldsymbol{\sigma}\rVert^2 \ge 1 > 0$，正向有理求逆永远精确可解；逆变换在一切非半周旋转（$-1 \notin \operatorname{Spec}(\mathbf{R})$，即 $\det(\mathbf{R}+\mathbf{I}) \neq 0$）上精确恢复 $X \in \mathfrak{so}(3,\mathbb{Q})$，而 $180^\circ$ 对径半周旋转 $\mathbf{R}_\pi(\mathbf{n}) = \frac{2\mathbf{n}\mathbf{n}^\top}{\lVert\mathbf{n}\rVert^2} - \mathbf{I}$（$\mathbf{n}\in\mathbb{Z}^3\setminus\{\mathbf{0}\}$）则由两步互补非半周有理凯莱旋转乘积 $\mathbf{R}(\mathbf{n})\,\mathbf{R}(\mathbf{n}/\lVert\mathbf{n}\rVert^2)$ 零奇点补齐（在球面开覆盖侧，内核定理 [`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)，`LEAN ✓`，更仅用六根模方为 $5$ 的整向量 $(\pm 1, \pm 2, 0)$ 轮换轴与纯有理平方不等式 $2\langle x, \mathrm{axis}_i\rangle^2 > 5$ 即给出单位二球面的无正交开覆盖）；
- **零超越数一步保正交**：全程仅有整数加减乘除，不含半个 $\pi, e, \ln$（对比传统自然对数对一切整数 $n \ge 2$ 必沦为无理数 $\ln n \notin \mathbb{Q}$，[`irrational_log_natCast`](lean:D5/S3/Constants/Irrationality/LogNaturalIrrationality.irrational_log_natCast)，`LEAN ✓`），却对任意输入与任意连续步数 $N$ 严格满足 $\mathbf{R}(\boldsymbol{\sigma})^\top \mathbf{R}(\boldsymbol{\sigma}) \equiv \mathbf{I}$ 与 $\det\mathbf{R}(\boldsymbol{\sigma}) \equiv \mathbf{1}$！

::: {.viz src="infinity-free-rational-mathematics-sandbox" preset="rational-cayley-rotor-vs-taylor-series" height="500"}
凯莱有理旋转对比泰勒级数脱轨卡（`rational-cayley-rotor-vs-taylor-series`）：取有理生成元 `σ = (1/2, 1/2, 0)`（`1 + ‖σ‖² = 3/2`）连续旋转默认 `N = 12` 步，青色凯莱有理轨迹 `R(σ)^N v₀` 以精确分母 `3¹² = 531441` 严守球面 `‖R¹² v₀‖² = 1/1 = 1.0000` 与 `det R = 1`，而二阶泰勒级数截断 `exp₂(X)^12` 早已径向膨胀脱轨（`‖exp₂(X)¹² v₀‖² = (17/16)¹² > 1`，值 `≈ 2.0699`）。
:::

### 32.7.2.2 无超越函数的纯有理切比雪夫谐波振荡 {#sec-ch39-35-2-2}

传统物理用复指数 $e^{\mathbf{i}\omega t}$ 书写简谐波，一旦在数字计算机中做显式离散步进便不可避免地产生振幅漂移。在 $\mathbf{Math}_\Omega$ 中，固定任一有理初值步 $x_0 = \mathbf{1},\; x_1 = Q(\boldsymbol{\sigma}_0) \in S^3(\mathbb{Q})$（其内积余弦参数 $c := \langle x_0, x_1\rangle = \frac{1 - \lVert\boldsymbol{\sigma}_0\rVert^2}{1 + \lVert\boldsymbol{\sigma}_0\rVert^2} \in \mathbb{Q} \cap (-1, 1)$，如 $\boldsymbol{\sigma}_0 = (\frac{1}{2}, 0, 0)$ 给出 $c = \frac{3}{5}$），直接运行纯有理流群自平行递推

$$
x_{t+1} \;=\; [x_t,\, x_{t-1},\, x_t] \;=\; x_t x_{t-1}^* x_t \;=\; 2c\,x_t - x_{t-1} \qquad (t \ge 1).
$$

由内核冻结的**四元数流群切比雪夫定理** [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)（`LEAN ✓`），序列中每一拍严格保持精确有理单位模方 **$\lVert x_t\rVert^2 \equiv \mathbf{1/1}$**，且保真度投影 $\kappa(x_0, x_t) = \frac{1 + T_t(c)}{2} \in \mathbb{Q} \cap [0, 1]$ 直接生成纯有理切比雪夫余弦波——哪怕连续递推百亿拍，振幅包络依然分毫不差地锁死在 $\mathbf{1/1}$，绝无半比特能量泄漏！

::: {.viz src="infinity-free-rational-mathematics-sandbox" preset="chebyshev-rational-harmonic-oscillator" height="500"}
纯有理切比雪夫谐波振荡卡（`chebyshev-rational-harmonic-oscillator`）：由有理种子 `c = 3/5`（`σ₀ = (1/2, 0, 0)`）驱动流群递推 `x_{t+1} = 2c x_t − x_{t−1}` 走至默认琥珀拍 `t = 12`，青色有理谐波珠始终紧贴球面赤道大圆（`‖x₁₂‖² = 1/1 = 1.0000`）并输出精确分数波形 `κ_t = (1 + T_t(3/5))/2 ∈ ℚ`，对比品红显式欧拉步 `(1 + i Δθ)^t` 的螺旋发散。
:::

## 32.7.3 微积分重构：无需 $\lim_{h \to 0}$ 极限的二阶射流环 $\mathbb{Q}[\eta]/(\eta^3)$ 与粗剖分对消积分 {#sec-ch39-35-3}

牛顿与莱布尼茨因无法解释无穷小量 $dx$ 为何“作分母时不等于零、化简结束时又等于零”而遭贝克莱主教讥为“已死量的幽灵”，迫使柯西与魏尔斯特拉斯用无穷极限过程 $\epsilon\text{-}\delta$ 重建微积分。在 $\mathbf{Math}_\Omega$ 的 **`{0, 1/2, 1}` 二阶完备框架**下，有理函数的微分与流群势场的路径积分根本不需要任何无穷小极限（借鉴合成微分几何幂零步元思想，Kock 1981 / Lawvere，`文献结果`，并纯有理化于交换阿廷商环 $\mathbb{Q}[\eta]/(\eta^3)$，`手工推导`）：

### 32.7.3.1 纯代数零极限求导：二阶有理射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ {#sec-ch39-35-3-1}

引入纯形式代数步元 $\eta$，遵循后文 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 二阶曲率完备铁律直接规定幂零关系 **$\eta^3 \equiv 0$**，在三维有理商环 $J^2_{\mathbb{Q}} := \mathbb{Q}[\eta]/(\eta^3) = \{a_0 + a_1\eta + a_2\eta^2 : a_i \in \mathbb{Q}\}$ 中仅做有限步四则运算。对该环中任一常数项非零元 $a_0(1 + u)$（$a_0 \in \mathbb{Q}^\times,\; u = b_1\eta + b_2\eta^2$），因 $u^3 \equiv 0 \pmod{\eta^3}$，其乘法逆元无需无穷几何级数，**在两项之内精确终止**：

$$
(1 + u)^{-1} \;\equiv\; 1 - u + u^2 \pmod{\eta^3} \qquad \Bigl(\because\;(1 + u)(1 - u + u^2) = 1 + u^3 \equiv 1\Bigr).
$$

因此在任一分母非零有理点 $x \in \mathbb{Q}$（$Q(x) \neq 0$）处，任意有理函数 $f(x) = \frac{P(x)}{Q(x)} \in \mathbb{Q}(x)$ 均可直接代入 $x + \eta$ 做纯有理四则求值！现场对保真度函数 $\kappa(x) = \frac{1}{1 + x^2}$ 在任意 $x \in \mathbb{Q}$（记 $D := 1 + x^2 \in \mathbb{Q}_{>0}$）及现在赤道锚点 **$x = 1$** 处直接展开（`手工推导`）：

$$
\kappa(x + \eta) \;=\; \frac{1}{D}\left(1 + \frac{2x}{D}\eta + \frac{1}{D}\eta^2\right)^{-1} \;\equiv\; \frac{1}{1 + x^2} \;-\; \frac{2x}{(1 + x^2)^2}\eta \;+\; \frac{3x^2 - 1}{(1 + x^2)^3}\eta^2 \pmod{\eta^3},
$$

在 $x = 1$（$D = 2,\; u = \eta + \frac{1}{2}\eta^2,\; u^2 \equiv \eta^2$）处仅需三次分数运算即一步读出：

$$
\kappa(1 + \eta) \;\equiv\; \frac{1}{2}\left[1 - \Bigl(\eta + \tfrac{1}{2}\eta^2\Bigr) + \eta^2\right] \;=\; \underbrace{\frac{1}{2}}_{\text{0阶态 }\kappa(1)} \;-\; \underbrace{\frac{1}{2}}_{\text{1阶导数 }\kappa'(1)}\eta \;+\; \underbrace{\frac{1}{4}}_{\text{2阶泰勒曲率 }\frac{1}{2}\kappa''(1)}\eta^2 \pmod{\eta^3}!
$$

零极限、零 $0/0$ 幽灵、零差商误差（对比步长 $h = \frac{1}{4}$ 的有限差商割线斜率 $\frac{\kappa(5/4) - \kappa(1)}{1/4} = -\frac{18}{41} \neq -\frac{1}{2}$，割线偏差精确等于 $\frac{5}{82} \approx 0.0610$），精确分数三元组 **`{1/2, -1/2, +1/4}`**（即 $\kappa''(1) = +\frac{1}{2}$）当场锁定切线与二阶吻合曲率圆，且和、积、商与复合链式法则在 $\mathbb{Q}[\eta]/(\eta^3)$ 中作为纯环同态恒等成立！

### 32.7.3.2 粗粒度有限剖分下的流群对消积分与上链斯托克斯定理 {#sec-ch39-35-3-2}

在积分侧，无需将区间切成 $N \to \infty$ 个无穷薄黎曼矩形：对流群势场沿任意有限顶点链 $x_0, x_1, \dots, x_n \in \mathbb{T}_3$ 的有向步元串联 $(x_n \cdot_o x_{n-1}^{-1_o})\cdots(x_1 \cdot_o x_0^{-1_o})$，由定基流群分解与幂等消去律 $[y, x, x] = y$（[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul) 及有限生成树无环规范平移 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)，`LEAN ✓`），全部内部中继节点 $x_1, \dots, x_{n-1}$ 在有限步内成对严格抵消，精确归结为首尾边界比 $[x_n, x_0, o]$（对闭合圆周提升路径则外加整数同伦绕数 $\in \mathbb{Z}$；注：一般非恰当非阿贝尔联络沿非共轴折线仍带曲率面积和乐，仅势场差与阿贝尔上链严格归结为纯边界）；而在二维/三维单纯形网格上，由 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)（`LEAN ✓`），上边缘恒等式 $\delta(\delta\,\mathrm{edge}) \equiv 0$ 在**任意粗粒度有限剖分**下即 $100\%$ 零误差成立！

::: {.viz src="infinity-free-rational-mathematics-sandbox" preset="limit-free-jet-ring-and-telescoping-stokes" height="500"}
无极限二阶射流微积分与粗剖分对消卡（`limit-free-jet-ring-and-telescoping-stokes`）：琥珀切点默认停在 `x = 1/1`，二阶有理射流环 `ℚ[η]/(η³)` 不取任何极限一步算出精确三元组 `{1/2, −1/2, +1/4}` 并贴合青色精确切线与二阶吻合圆（对比品红有限差商 `h = 1/4` 割线斜率 `−18/41` 的偏斜误差 `5/82 ≈ 0.0610`），球面侧同步核验有限链中继节点幂等对消与粗四面体 `δF = 0.0000`。
:::

## 32.7.4 $\mathbf{Math}_\Omega$ 全景对照总表、可计算形式化意义与十五项冻结定理 {#sec-ch39-35-4}

我们将传统无穷超越数学与 $\mathbf{Math}_\Omega$ 的六大支柱对照、形式化可判定性边界及十五条冻结内核定理正式收束如下：

::: {.definition #def-ch39-math-omega-framework title="Ω-有限有理数学体系（Math_Ω）四支柱架构（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 之下，定义去实无穷、去超越数的**$\Omega$-有限有理数学体系**（`MODEL`）$\mathbf{Math}_\Omega = (\mathbb{QP}^1_{\le M}, \mathbf{R}(\boldsymbol{\sigma}), J^2_{\mathbb{Q}}, \mathcal{I}_{\mathrm{heap}})$ 如下：

1. **齐次有理射影数系与按需视界**：以互素整数射影对 $[P : Q] \in \mathbb{QP}^1$（$\kappa = \frac{Q^2}{P^2+Q^2}$，含对径极点 $[1 : 0]$）及按需扩展的有限分辨率格网 $\mathbb{QP}^1_{\le M}$（$\varepsilon_{\mathrm{self}} = \frac{1}{M}$）取代不可数实数轴 $\mathbb{R}$ 与静态实无穷集；
2. **有理凯莱李群—李代数桥与切比雪夫谐波**：以有理正逆凯莱变换 $\mathbf{R}(\boldsymbol{\sigma}) = (\mathbf{I}-X)^{-1}(\mathbf{I}+X) \in \mathrm{SO}(3,\mathbb{Q})$（半周旋转用两个因子）及流群递推 $x_{t+1} = 2c\,x_t - x_{t-1} \in S^3(\mathbb{Q})$ 取代 $\pi, e, \sin, \cos, \exp, \ln$；
3. **无极限二阶射流微积分与粗剖分对消积分**：在幂零商环 $J^2_{\mathbb{Q}} = \mathbb{Q}[\eta]/(\eta^3)$ 中以 $(1+u)^{-1} = 1 - u + u^2$ 对正则有理函数做纯四则二阶求导，并以流群中继消去 $[y, x, x] = y$ 与单纯形上边缘 $\delta^2 = 0$ 实现粗剖分零误差积分；
4. **构造性可计算与可判定执行内核**：在无量词有理算术与有界视界 $\mathbb{Q}_{\le M}$ 量化范围内，相等性、序关系、旋转复合、二阶射流与有限阶剥离均具备确定性停机算法（`Computable` / `Decidable`）。
:::

| 核心数学支柱 | 传统标准数学（ZFC $+$ 实数 $\mathbb{R}$） | $\Omega$-有限有理数学（$\mathbf{Math}_\Omega$ · `MODEL`） | 根除的传统顽疾 |
| :--- | :--- | :--- | :--- |
| **底层数系基石** | 不可数实数集 $\mathbb{R}$ 与复数 $\mathbb{C}$（含超越数） | 有限视界有理数 $\mathbb{Q}_{\le M}$ 与有理三元球 $\mathbb{T}_3(\mathbb{Q})$ | 剔除勒贝格满测度不可计算幽灵实数与浮点舍入 |
| **边界与无穷观** | 实无穷集合 $\aleph_0, \aleph_1$ 与开口发散奇点 $\infty$ | 齐次对径闭合点 $[1:0]$、精度契约 $\varepsilon_{\mathrm{self}}$ 与按需素数逃逸 | 根除除零崩溃与非构造性五块分球悖论 |
| **几何与三角学** | 弧度制 $\theta$、圆周率 $\pi$ 与超越函数 $\sin, \cos$ | 有理保真度 $\kappa \in \mathbb{Q}$、有理旋子与切比雪夫递推 $T_t(c)$ | 无需开方与无穷级数即可实现真球面无损旋转与谐波 |
| **微积分导数** | 柯西 $\epsilon\text{-}\delta$ 无穷小极限 $\lim_{h \to 0}\frac{f(x+h)-f(x)}{h}$ | 二阶代数射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ 纯四则两项求逆展开 | 消除“已死量幽灵 $0/0$”与有限差商割线偏差 |
| **指数与对数桥** | 欧拉常数 $e = \lim(1+\frac{1}{n})^n$ 与无理对数 $\ln n$ | 有理凯莱正逆变换 $(\mathbf{I}-X)^{-1}(\mathbf{I}+X)$（半周旋转用两个因子） | 对非半周旋转，逆公式精确恢复参数 |
| **形式化验证属性** | 实数运算依赖 `Classical.choice` 与 `noncomputable` | 有理算子与有界视界命题**全域可计算（`Computable`）与可判定（`Decidable`）** | 定理即直接可求值（`#eval`）的零误差可执行内核 |

::: {.theorem #thm-ch39-math-omega-finite-rational-anchors title="三元流群与切比雪夫谐波、指数级数截断余项、六轴有理球覆盖、有限连分数与素数逃逸、已验证定阶、对数无理性与有限步可计算停机定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le,D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover,D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den,D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log,D5/S3/Axis/PrimeAxisEscape.prime_axis_escape,D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Constants/Irrationality/LogNaturalIrrationality.irrational_log_natCast,D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S0/Computability/BinaryNameComparison.name_compare_run"}
在三元比较球面代数、有理算术递推、离散同调与确定性有限步计算模型下，以下十五项命题严格成立：

1. **三元比较四元数同构、弦距核、定基流群分解与切比雪夫递推（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`normSq_and_chebyshev`）**：非交换、链连通、读数可任意接近零（`TouchesZero`）、特征秩五且读数完备的三元比较结构对任一基点 $o$ 存在到单位四元数模型 $\mathrm{U}(\mathbb{H})$ 的保结构双射（$u(o)=1$），满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ 与任一基点群分解 $[x,y,z] = x \cdot_o y^{-1_o} \cdot_o z$；初值模方为 $1$ 的四元数序列满足 $x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 当且仅当全序列保单位模且 $x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$n=0$ 时约定 $U_{-1}=0$）、$\langle x_0, x_n\rangle = T_n(\langle x_0, x_1\rangle)$；
2. **指数级数有限截断余项界、六整轴有理球面无正交开覆盖与自然对数无理性（`exp_remainder_le`、`rational_six_axis_open_cover`、`irrational_log_natCast`）**：在完备实赋范含幺代数 $B$（`NormOneClass B`）中，对满足 $0 \le r < n + 1$ 且 $\lVert x\rVert \le r$ 的 $x \in B$，$n$ 项泰勒截断余项满足 $\bigl\lVert\exp x - \sum_{k=0}^{n-1}\frac{1}{k!}x^k\bigr\rVert \le \frac{r^n / n!}{1 - r/(n+1)}$；三维欧氏空间中以六根模方为 $5$ 的整向量 $\mathrm{axis}_i \in \{(1,\pm 2,0),(0,1,\pm 2),(\pm 2,0,1)\}$ 定义的六个子集 $\mathrm{color}_i = \{x \in S^2(1) : 5 < 2\langle x, \mathrm{axis}_i\rangle^2\}$ 在单位球面上皆为相对开集、每个子集内部不含正交点对且六集之并覆盖整只单位二球面；对一切自然数 $n \ge 2$，实自然对数 $\operatorname{Real.log}(n : \mathbb{R})$ 必为无理数；
3. **既约有理分母、有限连分数对数步长界、素数轴逃逸与有理阿代尔守恒（`reduced_den`、`convergents_length_log`、`prime_axis_escape`、`rational_padic_product_formula`）**：对任意 $s \in \mathbb{N}$ 与 $r > 0$，既约有理数 $\operatorname{reduced}(s, r) = (s:\mathbb{Q})/r$ 的分母等于 $r / \gcd(s, r)$，且任意有理数 $x \in \mathbb{Q}$ 的连分数收敛子列表长度满足 $\operatorname{length}(\operatorname{convergents} x) \le 2\lfloor\log_2 x.\mathrm{den}\rfloor + 1$；对任意有限素数集 $S$，一切 $p \in S$ 满足 $\prod_{p\in S} p + 1 \equiv 1 \pmod p$，且存在素数 $q \notin S$ 整除 $\prod_{p\in S} p + 1$；任一非零有理数 $x \in \mathbb{Q}^\times$ 满足 $\lvert x\rvert \cdot \prod_p \operatorname{padicNorm}_p(x) = 1$；
4. **可判定幺半群素因子剥离定阶、生成树相位平移、四面体上链正合与二进制比较机显式有限步停机（`stripFactors_correct`、`selected_tree_transport`、`tetra_defects_incidence_repair_and_exactness`、`name_compare_run`）**：在具备 `DecidableEq G` 的幺半群 $G$ 中，若 $m > 0$、$x^m = 1$ 且列表 $P$ 覆盖 $m$ 的全部素因子，则 $M := \operatorname{stripFactors}(x, P, m)$ 满足 $M > 0$、$M \mid m$、$x^M = 1$ 且 $M = \operatorname{orderOf}(x)$；命名生成树上根相位平凡、树边沿路相位复原边权且树无规范环路阻碍；有限非空顶点集 $V$ 上取值于交换加群 $A$ 的 $2$-上链 $F$ 满足面缺陷加总恒等、鸽笼锚点界、边缺陷线性界及四面体上边缘处处为零当且仅当 $F$ 为某一边上链上边缘；对任意二进制位串 $a, b, \mathrm{output}, \mathrm{frame} : \operatorname{List}\;\mathrm{Bool}$，比较机 `compareMachine` 在至多 $2(\lvert a\rvert + \lvert b\rvert) + 4$ 步内停机输出 `decide (a = b) :: output` 并完整恢复输入栈与调用栈帧。
:::

::: proof
第 1 组由特征秩五格拉姆表示、双侧四元数正交作用与切比雪夫多项式双归纳给出；第 2 组在 `ExponentialTail` 中由阶乘比几何级数控制余项，在 `RationalSixAxisCover` 中由贝塞尔不等式 $\langle x,\mathrm{axis}_i\rangle^2 + \langle y,\mathrm{axis}_i\rangle^2 \le 5$ 排除正交对并由显式平方和恒等式证明球面覆盖，在 `LogNaturalIrrationality` 中由 $n^p = e^q$ 素幂整除矛盾导出无理性；第 3 组由欧几里得余数分母两步折半归纳、欧几里得互素构造 $\prod S + 1$ 及素幂逐位消去证得；第 4 组由可判定幂等于 $1$ 测试的素因子逐一剥离、树上唯一简单路伸缩消去、顶点锥收缩势及显式栈状态转移步数上界证得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-math-omega-literature-and-decidability title="可计算性分析、分球悖论、合成微分几何与逻辑可判定性精确边界（文献结果）"}
**文献结果，未在本书形式化。** 为严守 `PROJECT.md` §13 的最强准确标准，须指明以下四条经典文献与逻辑边界：

1. **可计算实数零测度与巴拿赫—塔斯基五块分球悖论**：可计算实数集可数从而在 $\mathbb{R}$ 上勒贝格测度为 $0$ 源于 A. M. Turing（*Proc. London Math. Soc.* **42**, 230–265, 1936）；三维实心球依赖选择公理的奇异分解由 S. Banach 与 A. Tarski（*Fund. Math.* **6**, 244–277, 1924）提出，最少块数 $5$ 由 R. M. Robinson（*Ann. of Math.* **48**, 281–295, 1947）证得；
2. **有理三角学、凯莱变换与幂零代数微积分**：有理方距与展开度几何见 N. J. Wildberger（2005）；正交矩阵有理参数化 $\mathbf{R} = (\mathbf{I}-X)^{-1}(\mathbf{I}+X)$ 见 A. Cayley（1846），注意单张图卡覆盖 $\det(\mathbf{R}+\mathbf{I}) \neq 0$，半周旋转 $\theta = \pi$ 可用两个有理凯莱旋转的乘积分解；以幂零步元取代极限的合成微分几何见 A. Kock（*Synthetic Differential Geometry*, LMS Lecture Notes **51**, 1981）与 F. W. Lawvere，而交换环 $\mathbb{Q}[\eta]/(\eta^3)$ 上的两项求逆直接覆盖一切在展开点分母非零的有理函数；
3. **可计算性与可判定性的精确哥德尔—马季亚谢维奇边界**：在 Lean 4（Mathlib）中，柯西实数 `ℝ` 因相等性不可判定而将除法与超越函数标为 `noncomputable`；在 $\mathbf{Math}_\Omega$ 中，$\mathbb{Q}$、$\mathbb{QP}^1$、$S^3(\mathbb{Q})$ 与 $\mathbb{Q}[\eta]/(\eta^3)$ 的全部四则算子、矩阵求逆与有界视界 $\mathbb{Q}_{\le M}$ 上的量化命题均完全可计算且可判定（实闭域一阶理论亦由 A. Tarski 1948 量词消去定理保证可判定），而无界整数域 $(\mathbb{Z}, +, \times)$ 上的任意存在量词丢番图方程因希尔伯特第十问题否定解（Yu. Matiyasevich 1970）不可判定——这正从数理逻辑底层印证了为何物理与计算系统必须引入有限视界分辨率 $\varepsilon_{\mathrm{self}} = \frac{1}{M}$！
:::

::: {.example #ex-ch39-math-omega-quantitative-audit title="定量核验：[1:0] 射影闭合、凯莱 12 步有理旋转对比泰勒脱轨与 x = 1 二阶射流精确对账"}
我们对 $\mathbf{Math}_\Omega$ 三大构造的核心分数基准做显式对账（`手工推导` / `NUM`）：

1. **齐次射影闭环四锚点与素数逃逸递推**：
   $[0:1] \mapsto (\kappa = \mathbf{1}, C = (1,0))$，$[1:1] \mapsto (\kappa = \mathbf{\frac{1}{2}}, C = (0,1))$，对径极点 $[1:0] \mapsto (\kappa = \frac{0}{1+0} = \mathbf{0}, C = (-1,0))$，$[-1:1] \mapsto (\kappa = \mathbf{\frac{1}{2}}, C = (0,-1))$，全程 $P^2 + Q^2 \in \{1, 2\} > 0$；对 $S = \{2, 3, 5\}$，$\prod S + 1 = \mathbf{31}$ 直接给出逃逸素数 $q = \mathbf{31} \notin S$（对 $\{2,3,5,7,11,13\}$，$\prod S + 1 = 30031 = 59 \times 509$ 给出逃逸素数 $q = \mathbf{59}$）；
2. **有理凯莱旋转 $\boldsymbol{\sigma} = (\frac{1}{2}, \frac{1}{2}, 0)$ 连续 $N = 12$ 步对比二阶泰勒级数**：
   $\lVert\boldsymbol{\sigma}\rVert^2 = \frac{1}{2}$，$1 + \lVert\boldsymbol{\sigma}\rVert^2 = \frac{3}{2}$，单步有理正交矩阵为
   $$
   \mathbf{R}\!\left(\tfrac{1}{2}, \tfrac{1}{2}, 0\right) \;=\; \frac{1}{3}\begin{pmatrix} 2 & 1 & 2 \\ 1 & 2 & -2 \\ -2 & 2 & 1 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}), \qquad \mathbf{R}^\top\mathbf{R} = \mathbf{I}, \quad \det\mathbf{R} = \mathbf{1}.
   $$
   作用于初值 $\mathbf{v}_0 = (0, 0, 1)^\top$ 连续走 $N = 12$ 步，$\mathbf{R}^{12}\mathbf{v}_0 \in \frac{1}{3^{12}}\mathbb{Z}^3$（精确分母 $3^{12} = \mathbf{531{,}441}$）严格守住单位模方 $\lVert\mathbf{R}^{12}\mathbf{v}_0\rVert^2 = \mathbf{1.0000}$；而共用同一反对称生成元 $X = [\boldsymbol{\sigma}]_\times$ 的二阶泰勒截断矩阵 $\exp_2(X) = \mathbf{I} + X + \frac{1}{2}X^2$（注：$\mathbf{R}(\boldsymbol{\sigma})$ 单步转角为 $2\arctan\lVert\boldsymbol{\sigma}\rVert$ 而精确 $\exp(X)$ 单步转角为 $\lVert\boldsymbol{\sigma}\rVert$，此处对比的是同一生成元下“严格保模方”与“级数截断脱球”的结构差异）在正交旋转平面上的单步模方放大因子精确为 $1 + \frac{1}{4}\lVert\boldsymbol{\sigma}\rVert^4 = 1 + \frac{1}{16} = \frac{17}{16} > 1$，$N = 12$ 步后模方膨胀至 $(\frac{17}{16})^{12} > 1$（值 $\approx \mathbf{2.0699}$，作用于 $\mathbf{v}_0 = (0,0,1)^\top$ 精确等于 $(\frac{17}{16})^{12} \approx \mathbf{2.0699}$；若取一阶欧拉 $\mathbf{I}+X$，模方更暴涨至 $(1 + \frac{1}{2})^{12} = (\frac{3}{2})^{12} \approx \mathbf{129.7463}$）；
3. **无极限二阶射流 $\kappa(x + \eta) \in \mathbb{Q}[\eta]/(\eta^3)$ 对比有限差商割线**：
   在 $x = 1$ 处，$\kappa(1 + \eta) \equiv \mathbf{\frac{1}{2}} - \mathbf{\frac{1}{2}}\eta + \mathbf{\frac{1}{4}}\eta^2 \pmod{\eta^3}$ 一步给出精确值 $\frac{1}{2} = \mathbf{0.5000}$、一阶导数 $-\frac{1}{2} = \mathbf{-0.5000}$ 与二次泰勒系数 $+\frac{1}{4} = \mathbf{+0.2500}$（$\kappa''(1) = +\frac{1}{2}$）；在 $x = \frac{1}{2}$ 处一步给出 $\frac{4}{5} - \frac{16}{25}\eta - \frac{16}{125}\eta^2$（即 $\{\mathbf{0.8000}, \mathbf{-0.6400}, \mathbf{-0.1280}\}$）；而有限步长在 $x = 1,\; h = \frac{1}{4}$ 处的差商割线斜率仅为 $-\frac{18}{41}$，偏离真导数 $-\frac{1}{2}$ 达精确分数 $\frac{5}{82} > 0$（值 $\approx \mathbf{0.0610}$；对任意 $h \neq 0$，除跨拐点偶合消去轨迹 $3x^2 + 2xh = 1$——例如落在该轨迹上的点 $(x, h) = (\frac{1}{2}, \frac{1}{4})$——之外，有限差商处处残留非零割线偏差）。
:::

## 32.7.5 有限射影法雷弦距、凯莱合成与泰勒谱障、高阶有理射流及单纯形锥同伦 {#sec-ch39-35-5-farey-cayley-jets-cone-homotopy}

为将 [@ex-ch39-math-omega-quantitative-audit] 的三组定量算例与 [§32.7.3.2](#sec-ch39-35-3-2) 的粗剖分四面体正合性推进为普遍结构律，下文分四节补全代数框架。前两节研究有限射影圆 $C(\mathbb{QP}^1_{\le M})$ 的精确点数与相邻有理弦距平方极值，以及三维凯莱旋转合成、半周双步分解与正整数阶泰勒截断的谱障。后两节先导出任意阶有理射流的整系数多项式递推与有限差商零偏差双曲线，再在完全单纯形上对闭 $2$-上链给出粗粒度显式原势，并对一般 $2$-上链给出唯一顶点-$0$ 归一拆分。

### 32.7.5.1 有限射影圆 $C(\mathbb{QP}^1_{\le M})$ 的精确点数、法雷弦距极值与 $\pi^2$ 的渐近阴影 {#sec-ch39-35-5-1-farey-projective-gaps}

对任意正整数 $M \ge 1$，取本原整对 $(p, q)$ 中全部满足 $\max(\lvert p\rvert, \lvert q\rvert) \le M$ 且 $q > 0$ 者，并补入唯一对径代表 $(1, 0)$，即得有限视界射影线 $\mathbb{QP}^1_{\le M}$ 的规范代表集；记欧拉函数求和 $\Phi(M) = \sum_{j=1}^M \varphi(j)$（其中 $\varphi(1) = 1$）。有理圆周映射 $C([p : q]) = \bigl(\frac{q^2 - p^2}{p^2 + q^2},\, \frac{2pq}{p^2 + q^2}\bigr)$ 将 $[1 : 0]$ 映至 $(-1, 0)$，而在 $(-1, 0)$ 之外有精确逆映射 $[y : 1 + x]$，因而构成从有理射影线到有理单位圆的双射。对任意两非零整对记 $C_i = C([p_i : q_i])$ 与行列式 $\Delta = p_2 q_1 - p_1 q_2$，直接展开即得精确有理弦距平方与失准展开度恒等式：

$$
\begin{aligned}
\lVert C_1 - C_2 \rVert^2 &= \frac{4\Delta^2}{(p_1^2 + q_1^2)(p_2^2 + q_2^2)}, \\
s(C_1, C_2) &= \frac{1 - C_1 \cdot C_2}{2} = \frac{\Delta^2}{(p_1^2 + q_1^2)(p_2^2 + q_2^2)}.
\end{aligned}
$$

在第一象限闭弧上，既约斜率构成 $M$ 阶法雷序列（落于 $[0, 1]$ 内），含 $\Phi(M) + 1$ 个点；经 $p \mapsto -p$ 与 $p \leftrightarrow q$ 得到仅在 $4$ 枚坐标轴交点相交的四条闭弧，故整圆点数精确为 $4(\Phi(M) + 1) - 4 = 4\Phi(M)$。对第一弧上任一既约分数 $p/q < 1$，因 $\gcd(p, q) = 1$ 且 $q \le M$，同余类 $pb \equiv -1 \pmod q$ 在 $\{1, \dots, M\}$ 中非空；取其中最大正整数 $b \le M$（对 $0/1$ 取 $b = M$），则 $a = (1 + pb)/q \le b$ 满足 $aq - pb = 1$（从而 $(a, b)$ 自动本原）且 $b + q > M$。对任一严格夹于两者之间的分数 $r/t$，正整数 $qr - pt \ge 1$ 与 $at - br \ge 1$ 满足 $t = b(qr - pt) + q(at - br) \ge b + q > M$，故整圆全部 $4\Phi(M)$ 条环向相邻边皆满足 $\lvert\Delta\rvert = 1$。

在第一弧上，$(0/1, 1/M)$ 的 $(p^2 + q^2)(a^2 + b^2)$ 等于 $M^2 + 1$，而其余任意相邻边 $(p/q, a/b)$ 皆有正分子与 $qb \ge q + b - 1 \ge M$，从而 $(p^2 + q^2)(a^2 + b^2) \ge (q^2 + 1)(b^2 + 1) > M^2 + 1$，故对一切 $M \ge 1$ 最大相邻弦距平方恒为 $\frac{4}{M^2 + 1}$ 且重数为 $4$（于 $[0 : 1], [\pm 1 : M]$ 与 $[1 : 0], [\pm M : 1]$ 达到）。当 $M \ge 3$ 时，相邻两点分母不能同为 $M$（否则 $M \mid \Delta$）；分母等于 $M$ 者范数平方最大为 $A = 2M^2 - 2M + 1$（仅 $(M - 1)/M$ 取等），分母 $\le M - 1$ 者最大为 $B = 2M^2 - 6M + 5 < A$（仅 $(M - 2)/(M - 1)$ 取等，且 $1/1$ 满足 $2 < 5 \le B$），而两者分母皆 $\le M - 1$ 时乘积至多为 $B^2 < AB$；因 $(M - 2)/(M - 1)$ 与 $(M - 1)/M$ 满足 $(M - 1)^2 - M(M - 2) = 1$ 且分母和 $2M - 1 > M$，两者相邻并连同三条对称像以重数 $4$ 唯一取得最小相邻弦距平方（$M = 1$ 时四边皆为 $2$；$M = 2$ 时第一弧边 $(0/1, 1/2)$ 与 $(1/2, 1/1)$ 给出 $\frac{4}{5}$ 与 $\frac{2}{5}$，故最小值为 $\frac{2}{5}$ 且重数为 $4$）；以 $C_1 \sim C_2$ 记环向相邻点对，即有：

$$
\begin{aligned}
\max_{C_1 \sim C_2} \lVert C_1 - C_2 \rVert^2 &= \frac{4}{M^2 + 1} \quad (M \ge 1), \\
\min_{C_1 \sim C_2} \lVert C_1 - C_2 \rVert^2 &= \frac{4}{(2M^2 - 2M + 1)(2M^2 - 6M + 5)} \quad (M \ge 3).
\end{aligned}
$$

据此，在第一张实验卡所绘 $M = 6$ 圆环与第二张实验卡默认视界 $M = 12$ 下，射影圆分别精确包含 $48$ 与 $184$ 个点；在 $M = 12$ 处，环向相邻最大与最小弦距平方精确为 $\frac{4}{145}$ 与 $\frac{4}{58565}$。规范代表落入 $[-M, M]^2$ 的精确有理密度为 $\frac{4\Phi(M)}{(2M + 1)^2}$（在 $M = 12$ 处为 $\frac{184}{625} = 0.2944$），它在 $M \to \infty$ 时由经典渐近式 $\Phi(M) \sim \frac{3M^2}{\pi^2}$（T. M. Apostol，*Introduction to Analytic Number Theory*，1976，Theorem 3.7，[10.1007/978-1-4757-5579-4](https://doi.org/10.1007/978-1-4757-5579-4)）收敛至 $\frac{3}{\pi^2}$（档案包络四舍五入为 $0.303964$）——$\pi^2$ 在此只作为有限互素计数的渐近阴影出现。

在连分数终止侧，对斐波那契数列 $F_0 = 0, F_1 = 1$ 与一切 $k \ge 2$，由 $F_k / F_{k+1} \in (0, 1)$ 及 $F_{j+1}/F_j = 1 + F_{j-1}/F_j$（$j = k, \dots, 3$，终结于 $F_3/F_2 = 2$）立得标准展开 $[0; 1, \dots, 1, 2]$（含 $k - 2$ 个 $1$），精确拥有 $k$ 枚收敛子（起自 $0/1$、止于 $F_k / F_{k+1}$）；例如 $k = 12$ 处的 $144/233$ 长度为 $12$，而 [@thm-ch39-math-omega-finite-rational-anchors]（[`convergents_length_log`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log)）给出的上界为 $2\lfloor\log_2 233\rfloor + 1 = 15$，比值为 $\frac{4}{5}$。

### 32.7.5.2 凯莱旋转精确合成律、半周双步分解与泰勒多项式脱球谱障 {#sec-ch39-35-5-2-cayley-composition-taylor-barrier}

在 $\mathbb{R}^3$ 中取列向量与右手叉乘 $X\mathbf{v} = \boldsymbol{\sigma} \times \mathbf{v}$，记 $u = \lVert\boldsymbol{\sigma}\rVert^2$，并按四元数乘法 $(s_1, \mathbf{v}_1)(s_2, \mathbf{v}_2) = (s_1 s_2 - \mathbf{v}_1\cdot\mathbf{v}_2,\, s_1\mathbf{v}_2 + s_2\mathbf{v}_1 + \mathbf{v}_1\times\mathbf{v}_2)$ 计算。对任一非零实四元数 $q = (d, \mathbf{v}) \neq (0, \mathbf{0})$ 与纯向量 $x = (0, \mathbf{w})$，先有 $(d, \mathbf{v})(0, \mathbf{w}) = (-\mathbf{v}\cdot\mathbf{w},\, d\mathbf{w} + \mathbf{v}\times\mathbf{w})$，再右乘 $(d, -\mathbf{v})$ 时标量部消为 $-d(\mathbf{v}\cdot\mathbf{w}) + d(\mathbf{w}\cdot\mathbf{v}) = 0$、向量部化为 $d^2\mathbf{w} + 2d(\mathbf{v}\times\mathbf{w}) + (\mathbf{v}\cdot\mathbf{w})\mathbf{v} + \mathbf{v}\times(\mathbf{v}\times\mathbf{w})$；代入 $\mathbf{v}\times(\mathbf{v}\times\mathbf{w}) = (\mathbf{v}\cdot\mathbf{w})\mathbf{v} - \lVert\mathbf{v}\rVert^2\mathbf{w}$ 并除以 $d^2 + \lVert\mathbf{v}\rVert^2$，立得共轭作用 $x \mapsto q x q^{-1}$ 对应缩放不变矩阵 $\Psi(d, \mathbf{v}) = \frac{(d^2 - \lVert\mathbf{v}\rVert^2)\mathbf{I} + 2d[\mathbf{v}]_\times + 2\mathbf{v}\mathbf{v}^\top}{d^2 + \lVert\mathbf{v}\rVert^2}$，在 $d = 1$、$\mathbf{v} = \boldsymbol{\sigma}$ 时恰为 $\mathbf{R}(\boldsymbol{\sigma})$ 且满足 $\Psi(q_1 q_2) = \Psi(q_1)\Psi(q_2)$。将 $\Psi$ 作用于 $(1, \mathbf{a})(1, \mathbf{b}) = (1 - \mathbf{a}\cdot\mathbf{b},\, \mathbf{a} + \mathbf{b} + \mathbf{a}\times\mathbf{b})$：当 $1 - \mathbf{a}\cdot\mathbf{b} \neq 0$ 时按标量部归一即证得**罗德里格斯—凯莱有理合成律**（精确取 $+1$ 叉乘符号；J. Solà，*Quaternion kinematics for the error-state Kalman filter*，2017，Section 2.5，[arXiv:1711.02508v1](https://arxiv.org/abs/1711.02508v1)），而当乘积为纯虚四元数 $(0, \mathbf{v})$ 时直接求值 $\Psi(0, \mathbf{v})$ 便导出任意有理轴的**半周双步有理分解**：

$$
\begin{aligned}
\mathbf{R}(\mathbf{a})\,\mathbf{R}(\mathbf{b}) &= \mathbf{R}\!\left(\frac{\mathbf{a} + \mathbf{b} + \mathbf{a} \times \mathbf{b}}{1 - \mathbf{a}\cdot\mathbf{b}}\right) \quad (1 - \mathbf{a}\cdot\mathbf{b} \neq 0), \\
\mathbf{R}(\mathbf{n})\,\mathbf{R}\!\left(\frac{\mathbf{n}}{\lVert\mathbf{n}\rVert^2}\right) &= \frac{2\mathbf{n}\mathbf{n}^\top}{\lVert\mathbf{n}\rVert^2} - \mathbf{I} = \mathbf{R}_\pi(\mathbf{n}).
\end{aligned}
$$

例如对应非对易旋转的两枚有理参数 $\mathbf{a} = (\frac{1}{2}, 0, 0)^\top$ 与 $\mathbf{b} = (0, \frac{1}{3}, 0)^\top$ 一次合成即得精确参数 $(\frac{1}{2}, \frac{1}{3}, \frac{1}{6})^\top$；而对任意非零轴 $\mathbf{n} \in \mathbb{Q}^3 \setminus \{\mathbf{0}\}$，乘积 $(1, \mathbf{n})(1, \mathbf{n}/\lVert\mathbf{n}\rVert^2) = \bigl(0,\, (1 + 1/\lVert\mathbf{n}\rVert^2)\mathbf{n}\bigr)$ 标量部恰为零，故所得半周矩阵满足 $\mathbf{R}_\pi(\mathbf{n})^\top = \mathbf{R}_\pi(\mathbf{n})$、$\mathbf{R}_\pi(\mathbf{n})^2 = \mathbf{I}$、$\det\mathbf{R}_\pi(\mathbf{n}) = 1$、$\operatorname{Tr}\mathbf{R}_\pi(\mathbf{n}) = -1$ 且 $\det(\mathbf{R}_\pi(\mathbf{n}) + \mathbf{I}) = 0$（如六轴球面覆盖中的模方 $5$ 整轴 $\mathbf{n} = (1, 2, 0)^\top$ 精确分解为 $\mathbf{R}(1, 2, 0)\,\mathbf{R}(\frac{1}{5}, \frac{2}{5}, 0)$）。

反观指数级数的 $k$ 阶截断 $T_k(X) = \sum_{j=0}^k X^j / j!$（$k \ge 1$；N. J. Higham，*Functions of Matrices: Theory and Computation*，2008，Chapter 10，[10.1137/1.9780898717778](https://doi.org/10.1137/1.9780898717778)）：在 $\boldsymbol{\sigma} = \mathbf{0}$ 处显然有 $T_k(\mathbf{0}) = \mathbf{I}$，而对任意非零生成元（$u = \lVert\boldsymbol{\sigma}\rVert^2 > 0$），在二维正交不变平面 $\boldsymbol{\sigma}^\perp$ 上有 $X^2 = -u\mathbf{I}$，从而 $T_k(X)$ 化为 $A_k(u)\mathbf{I} + B_k(u)X$，其中 $A_k(u) = \sum_{2j \le k} \frac{(-u)^j}{(2j)!}$ 与 $B_k(u) = \sum_{2j+1 \le k} \frac{(-u)^j}{(2j+1)!}$。因 $X^\top = -X$，乘积 $T_k(X)^\top T_k(X)$ 的交叉项消去，将任意 $\mathbf{v} \perp \boldsymbol{\sigma}$ 的模方乘以精确有理多项式 $M_k(u) = A_k(u)^2 + u B_k(u)^2 = \bigl\lvert\sum_{j=0}^k \frac{(i\sqrt{u})^j}{j!}\bigr\rvert^2$（同时保持轴向 $\boldsymbol{\sigma}$ 不变）。记 $p_k(z) = \sum_{j=0}^k z^j / j!$，对任意 $1 \le m \le k$，$p_k(z)p_k(-z)$ 的 $z^m$ 项系数恰为 $\frac{(1 - 1)^m}{m!} = 0$；取 $z = i\sqrt{u}$ 知 $M_k(u) - 1 = p_k(i\sqrt{u})p_k(-i\sqrt{u}) - 1$ 被 $u^{\lfloor k/2 \rfloor + 1}$ 整除，且商多项式次数为 $\lfloor(k - 1)/2\rfloor$、首项系数为 $\frac{1}{(k!)^2} > 0$，故它在 $u > 0$ 上至多有 $\lfloor(k - 1)/2\rfloor$ 个零点——因而**任意正整数阶泰勒截断多项式都不可能在任意正生成元半径开区间上保持全体向量的欧氏模长**，与有理凯莱映射恒等满足 $\bigl\lvert\frac{1 + i\sqrt{u}}{1 - i\sqrt{u}}\bigr\rvert^2 \equiv 1$ 形成结构性分野。记 $\alpha_\pm = \frac{15 \pm \sqrt{65}}{2}$，下表列出 $k = 1, \dots, 6$ 的精确模方偏移多项式、正半轴穿越点及 $u = \frac{1}{2}$ 单步因子：

| $k$ | $M_k(u) - 1$ | $\{u > 0 : M_k(u) = 1\}$ | $M_k(1/2)$ |
| ------: | :---------------------------------- | :----------------------- | ------------------: |
| $1$ | $u$ | $\emptyset$ | $3/2$ |
| $2$ | $u^2 / 4$ | $\emptyset$ | $17/16$ |
| $3$ | $u^2 (u - 3) / 36$ | $\{3\}$ | $283/288$ |
| $4$ | $u^3 (u - 8) / 576$ | $\{8\}$ | $3067/3072$ |
| $5$ | $u^3 (u^2 - 15u + 40) / 14400$ | $\{\alpha_-, \alpha_+\}$ | $460931/460800$ |
| $6$ | $u^4 ((u - 12)^2 + 36) / 518400$ | $\emptyset$ | $33178273/33177600$ |

表中各阶偏移多项式的符号并不保持单侧：在第三张实验卡基准生成元 $\boldsymbol{\sigma} = (\frac{1}{2}, \frac{1}{2}, 0)^\top$（$u = \frac{1}{2}$）处，一、二阶向外膨胀，三、四阶向内收缩，五、六阶再次向外膨胀。对应该基准，迭代算子 $T_k(X)^{12}$ 保持轴向 $\boldsymbol{\sigma}$ 不动，并将正交平面 $\boldsymbol{\sigma}^\perp$ 中任一单位向量的模方变为 $M_k(\frac{1}{2})^{12}$：二阶外胀至 $(\frac{17}{16})^{12}$（档案包络四舍五入为 $2.069890$），三阶内缩至 $(\frac{283}{288})^{12}$（$0.810452$），五阶再次外胀至 $M_5(\frac{1}{2})^{12}$（$1.003417$；全部六阶的 $12$ 步数据见配套档案）——而有理凯莱迭代 $\mathbf{R}(\boldsymbol{\sigma})^{12}$ 恒守精确模方 $1$。

### 32.7.5.3 任意阶有理射流递推、赤道四步缩放律与有限差商偏差双曲线 {#sec-ch39-35-5-3-integer-jets-secant-locus}

将二阶射流商环 $\mathbb{Q}[\eta]/(\eta^3)$ 推广至任意阶 $N \ge 0$ 的 $\mathbb{Q}(x)[\eta]/(\eta^{N+1})$ 后，对保真度函数 $\kappa(x) = \frac{1}{1 + x^2}$ 记 $a = 1 + x^2$，解有限求逆同余 $(a + 2x\eta + \eta^2)\sum_{m=0}^N c_m \eta^m \equiv 1 \pmod{\eta^{N+1}}$ 并写 $c_m = \frac{P_m(x)}{(1 + x^2)^{m+1}}$，逐次对比 $\eta^0, \dots, \eta^N$ 的系数便立即导出与 $N$ 无关的整系数多项式递推（$P_m \in \mathbb{Z}[x]$；代入任一 $x \in \mathbb{Q}$ 后，分式 $c_m = \frac{P_m(x)}{(1 + x^2)^{m+1}}$ 即给出 $\mathbb{Q}[\eta]/(\eta^{N+1})$ 中的精确有理泰勒系数）：

$$
\begin{aligned}
P_0(x) &= 1, \\
P_1(x) &= -2x, \\
P_{m+1}(x) &= -2x\,P_m(x) - (1 + x^2) P_{m-1}(x) \quad (m \ge 1).
\end{aligned}
$$

前数项依次为 $P_2(x) = 3x^2 - 1$、$P_3(x) = 4x(1 - x^2)$ 与 $P_4(x) = 5x^4 - 10x^2 + 1$，全程无需极限便给出任意阶有理泰勒系数。在现在赤道点 $x = 1$ 处，特征多项式 $T^2 + 2T + 2$ 整除 $T^4 + 4$（其两复根 $t = -1 + i$ 与 $\bar{t} = -1 - i$ 满足 $t^4 = -4$），从而对一切 $m \ge 0$ 精确满足四步缩放律 $P_{m+4}(1) = -4 P_m(1)$ 与 $c_{m+4}(1) = -\frac{1}{4} c_m(1)$；由初值 $P_0(1), P_1(1), P_2(1), P_3(1) = 1, -2, 2, 0$ 立即推出 $P_m(1) = 0$ 当且仅当 $m \equiv 3 \pmod 4$。另一方面，对任意 $x \in \mathbb{R}$ 与 $h \in \mathbb{R} \setminus \{0\}$，将前向差商减去精确一阶导数 $\kappa'(x) = -\frac{2x}{(1 + x^2)^2}$ 并通分，立得精确割线偏差公式：

$$
E(x, h) \;=\; \frac{\kappa(x + h) - \kappa(x)}{h} - \kappa'(x) \;=\; \frac{h\bigl(3x^2 + 2xh - 1\bigr)}{(1 + x^2)^2\bigl(1 + (x + h)^2\bigr)}.
$$

当 $x \neq 0$ 时令 $h_* = \frac{1 - 3x^2}{2x}$，则偏差符号恒为 $\operatorname{sgn}\bigl(hx(h - h_*)\bigr)$（在 $x = 0$ 处为 $-\operatorname{sgn}(h)$）。由此，只要同时满足 $x > 0$、$h > 0$ 且 $3x^2 \ge 1$，便恒有严格正偏差 $E(x, h) > 0$（这解释了前例正向偏差 $\frac{5}{82}$，见 [@ex-ch39-math-omega-quantitative-audit]，档案包络四舍五入为 $0.060976$；注意正半轴条件 $x > 0$ 不可省去，因负侧反例 $E(-1, 2) = -\frac{1}{2}$ 为负）。与之相对，沿双曲线 $3x^2 + 2xh = 1$（其中 $h \neq 0$，必有 $x \neq 0$），记同号拐点 $c = \operatorname{sgn}(x)/\sqrt{3}$（$3c^2 = 1$）并代入 $h = \frac{1 - 3x^2}{2x}$，直接因式分解立得 $(x - c)(x + h - c) = -\frac{(x - c)^2(x + 3c)}{2x} < 0$（因 $x \neq c$ 且 $c/x > 0$），从而双曲线两支上每一点均使 $x$ 与 $x + h$ 严格分居拐点 $c$ 两侧；除 $(\frac{1}{2}, \frac{1}{4})$（见 [@ex-ch39-math-omega-quantitative-audit]）外，正半支上的 $(\frac{1}{3}, 1)$ 同样在有限步长下精确给出 $E(x, h) = 0$。

### 32.7.5.4 粗粒度单纯形顶点锥同伦与零阻碍精确势分解 {#sec-ch39-35-5-4-simplicial-cone-homotopy}

最后检验完全单纯形上的闭 $2$-上链在粗粒度下为何无需加密网格即可显式求势：在完全单纯形 $K_n$（有序顶点集 $\{0, \dots, n - 1\}$）上考虑交错有理上链 $C^j(K_n; \mathbb{Q})$，其基由递增 $(j + 1)$-元组索引（C. A. Weibel，*An Introduction to Homological Algebra*，1994，Section 1.4，[10.1017/CBO9781139644136](https://doi.org/10.1017/CBO9781139644136)）。定义上边缘算子 $D_j : C^j \to C^{j+1}$ 为交错和 $(D_j \omega)(v_0, \dots, v_{j+1}) = \sum_{i=0}^{j+1} (-1)^i \omega(v_0, \dots, \widehat{v_i}, \dots, v_{j+1})$（成对顶点按相反顺序删去符号互反，故 $D_2 D_1 = 0$），并定义顶点 $0$ 处的锥同伦 $H_j : C^j \to C^{j-1}$（$j \ge 1$）：对不含 $0$ 的单形取 $(H_j \omega)(v_0, \dots, v_{j-1}) = \omega(0, v_0, \dots, v_{j-1})$，否则取 $0$。对 $n \le 2$ 并无三角形（$C^2 = 0$），对 $n = 3$ 则 $D_2 = 0$ 且唯一三角形 $(0, 1, 2)$ 直接满足 $F = D_1(H_2 F)$；对一般 $n \ge 4$，在三角形 $(a, b, c)$（不含 $0$）上展开得 $(D_1 H_2 F)(a, b, c) = F(0, b, c) - F(0, a, c) + F(0, a, b)$ 与 $(H_3 D_2 F)(a, b, c) = F(a, b, c) - F(0, b, c) + F(0, a, c) - F(0, a, b)$，而在含零三角形 $(0, b, c)$ 上前项等于 $F(0, b, c)$、后项为零——从而对一切 $n \ge 4$ 直接成立：

$$
\begin{aligned}
D_1 H_2 + H_3 D_2 &= I, \\
\operatorname{rank} D_1 &= \binom{n - 1}{2}, \\
\operatorname{rank} D_2 &= \binom{n - 1}{3}, \\
\beta_2(K_n) &= 0.
\end{aligned}
$$

据此，任一闭 $2$-上链（$D_2 F = 0$）无须细分即以 $H_2 F$ 显式给出一条边势（$F = D_1(H_2 F)$）；任一一般 $2$-上链 $F$ 拆分为恰当部 $D_1 H_2 F$（在含 $0$ 三角形上与 $F$ 相同）与曲率锥部 $H_3 D_2 F$（在含 $0$ 三角形上恒零，且对拆分式施以 $D_2$ 并用 $D_2 D_1 = 0$ 即得其上边缘为 $D_2 F$）；该顶点-$0$ 归一拆分唯一，因为任何闭上链 $C$ 若在含 $0$ 三角形上为零，则必有 $H_2 C = 0$ 从而 $C = D_1 H_2 C + H_3 D_2 C = 0$。同时，将含 $0$ 三角形上任意取值延拓为 $G$ 后取 $D_1 H_2 G$ 即得保持该取值的闭上链，故限制到含 $0$ 三角形给出同构 $\ker D_2 = \operatorname{im} D_1 \cong \mathbb{Q}^{\binom{n - 1}{2}}$，由秩—零化度定理立得上述秩公式与 $\beta_2(K_n) = 0$。

**证据边界与配套档案（`ARGUED` / `NUM`）。** 上述结构恒等式、分界律及单纯形秩与顶点-$0$ 归一拆分由本节书面论证（`ARGUED`）确立，渐近式与理论背景援引上列文献，有限连分数对数界与闭 $2$-上链恰当性分别援引 [@thm-ch39-math-omega-finite-rational-anchors] 中的 [`convergents_length_log`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log) 与 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)。配套有限检验、Arb 区间包络与无显式导入的独立 Lean 辅助声明 `cycle18_math_omega_finite_rational_check`（见 [`math_omega_finite_rational_check.lean`](https://gist.githubusercontent.com/loning/beaedee7a79bc9244b1bdebbbb30ad38/raw/f5bc28cdee6f9ee98d5c213b44a7fb2e6cf4c456/math_omega_finite_rational_check.lean)，不计入本书所钉 `trureturing` 账本的定理计数）均作为 `NUM` 证据由 `loning` 存于 [Issue #1170](https://github.com/the-omega-institute/trureturing-books/issues/1170) 的[固化校验档案](https://gist.github.com/loning/beaedee7a79bc9244b1bdebbbb30ad38/f5bc28cdee6f9ee98d5c213b44a7fb2e6cf4c456)（原始 [`SHA256SUMS`](https://gist.githubusercontent.com/loning/beaedee7a79bc9244b1bdebbbb30ad38/raw/f5bc28cdee6f9ee98d5c213b44a7fb2e6cf4c456/SHA256SUMS) 的 SHA-256 为 `8b61361193a255f4bad66c2a836a66dfbf1f6910e0a375767b27a9a75e13438b`）。

---

**所谓无穷大，只是不肯闭合成环的直线在尽头留下的裂口；所谓超越数，只是不肯顺应曲率的直尺在圆弧边磨出的碎屑！**

在下面这座完整三维实验室中，先在第一卡推动齐次射影探针如履平地般滑过曾经令平直分析闻之色变的 **`[1 : 0]`** 对径北极，再切入第三卡看着纯整数分数的凯莱矩阵 $\mathbf{R}(\frac{1}{2}, \frac{1}{2}, 0)$ 不借半个 $\pi$ 或 $e$ 连续旋转十二步依然以精确分母 $3^{12} = 531{,}441$ 锁死球面，最后停在第五卡点选 **`x = 1/1`** 核对那组不经任何极限过程便由三次分数四则运算一步给出的精确三元组 **`{1/2, -1/2, +1/4}`**：两千年来笼罩在数学地基上的“无穷焦虑”与“无理迷雾”在此一扫而空。用齐次射影闭合取代开口直线、用有理凯莱旋子取代超越指数、用二阶幂零射流取代无穷小极限，数学非但没有变窄，反而褪尽了所有不可计算的幽灵泡沫，还原成了物理宇宙自身正在运行的那门字字精确、句句可判定的原生语言。在本章压轴节（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）中，我们将回答最后一个工程与元数学终极问题：如何分毫不改 Lean 4 底层内核、不借半条自定义 `axiom`，直接在纯归纳构造演算（CIC）之上把这套 $\mathbf{Math}_\Omega$ 落地为零公理可执行基座 **`OmegaMath`**。

::: {.viz src="infinity-free-rational-mathematics-sandbox" height="620"}
完整实验室：在“Math_Ω 有限有理账本 · 无无穷无超越数精确闭合”与“传统无穷超越对照（MODEL）· 奇点发散与级数截断”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览无 $\infty$ 齐次射影闭环 $[P : Q]$、有限视界 $\varepsilon_{\mathrm{self}} = 1/M$ 与按需素数逃逸、凯莱有理旋转对比泰勒级数脱轨、纯有理切比雪夫谐波振荡以及无极限二阶射流微积分 $\mathbb{Q}[\eta]/(\eta^3)$ 与粗剖分对消积分五张实验卡，支持平滑推过对径极点 `[1 : 0]`、触发有限素数集逃逸构造、调节凯莱有理旋转步数 $N \in [1, 24]$ 与切比雪夫节拍 $t$，以及在有理切点 $x = p/q$ 处实时展开精确分数射流 $\{j_0, j_1, j_2\}$（对比有限差商步长 $h$ 的割线偏差），并在底部两条对照小图中同步观察第一图连续步数 $N$ 下青色凯莱旋转与切比雪夫谐波恒守模方 $\equiv 1$ 对比品红二阶泰勒级数 $(\frac{17}{16})^N$ 指数脱轨，以及第二图有理切点 $x$ 上二阶射流精确导数 $\kappa'(x)$ 对比有限差商割线偏差。十五条冻结 `LEAN ✓` 声明、`ARGUED` 可计算性与逻辑文献、`MODEL` 四支柱总纲及 `NUM` 实算在依据栏与理论抽屉中分层列出。
:::
