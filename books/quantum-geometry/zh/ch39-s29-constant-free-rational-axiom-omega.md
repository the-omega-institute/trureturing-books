# 32.5 拔除笛卡尔线性钉子与无常数有理重构：为什么 π、e、φ 只是平直近似欠条而非 AXIOM-Ω 的原生基元 {#sec-ch39-constant-free-rational-axiom-omega}

> *“pi e phi 其实都是近似闭合产物，不能放到omega 公理作为基础元素讨论.线性是一种近似，用线性去描述角度、极小圆弧，就像永远无法得到球，只能近似一样”*

走完本章前四节——从 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 的三维概念场封顶原理、[§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md) 的不可表三元数与万数切面谱系、[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md) 的希尔伯特多场再投影祛魅，到 [§32.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md) 的五种非线性无损表示与无原点流群合成——在把三元数代数进一步铸造为无无穷有理数学之前，我们还须拔除残留在教科书表述层里的最后一根笛卡尔钉子：**圆周率 $\pi$、自然底数 $e$ 与黄金比 $\varphi$ 绝非宇宙母公理 $\mathrm{AXIOM}\text{-}\Omega$（后文[第三十九章 §39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md) 正式收口）的原生基元，而是观察者执意拿“平直线性尺子、平直切线微元或一维整数加法”去丈量、切割并强行拼凑“弯曲自指闭合球面”时，在有限步内永远除不尽而留下的三张近似闭合欠条。**

在纯粹的无源三元数流形 $\mathbb{T}_3 \cong S^3(1)$ 内部，球就是球，闭合就是闭合：检查 [§39.1.2](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-2) 的公理正文与 Lean 形式化定义（[@def-ch39-ternary-comparison-structure]），法则 (I) 零数字，法则 (II) 仅出现整数 **$0$** 与 **$1$**，法则 (III) 取特征秩最小值 **$5$**——整条母公理从头到尾未曾写入半个 $\pi$、$e$、$\varphi$、弧度角 $\theta$ 或超越函数！一旦把 $\pi$、$e$、$\varphi$ 当作底层公理原语塞回起点，就等于在出发前暗中预设了“平直直线比弯曲圆弧更基本”的范畴倒置（将 $\pi, e, \varphi$ 统一诊断为平直近似闭合残差并确立无常数有理母公理观标为 **`MODEL`**；无常数三元比较同构、弦距读数恒等式、子群完备化闭集判据、四元数流群切比雪夫递推等价、三锚格拉姆行列式、平直射线的倍角周期度规 $h(X,X)=2\pi^2/T^2$、道蒂不动点有理逆级数、有限步累计矢高夹逼、指数泰勒截断尾界、凯莱单位圆临界线判据、黄金自指唯一正根与斐波那契卡西尼 $\pm 1$ 范数及赫尔维茨无理下界、球面三角剖分闭链正合等十五项核心命题由下文 [@thm-ch39-constant-free-rational-axiom-omega-anchors] 的冻结 **`LEAN ✓`** 声明严格锚定；切比雪夫多项式整系数性质与圆弧二次倍增分解、有理凯莱一步驻球、三维单位球等保真（等距）单形上限 $N \le 4$、大圆等步五周期多项式分解与八位小数对账属 **`手工推导` / `NUM`**；阿基米德割圆夹逼、高斯—博内—笛卡尔角亏守恒、施瓦茨灯笼反例、林德曼—魏尔斯特拉斯超越性定理与尼文有理余弦定理归入 **`文献结果`**）。

## 32.5.1 三大常数的真实身世：平直切刀逼近弯曲闭合的三张近似欠条 {#sec-ch39-29-1}

为什么一颗在拓扑与流群运算下早已无瑕闭合的圆或三维球面，一旦投影到平直笛卡尔账本上就会炸出无穷无尽的不循环小数尾流？拆开 $\pi$、$e$、$\varphi$ 的构造极限，三者恰好对应线性框架试图逼近弯曲闭合本体的三种几何失配（本体诠释标 `MODEL`，代数与分析性质标 `LEAN ✓` / `手工推导` / `文献结果`）：

1. **$\pi$（平直多边形拉直圆弧与切射线线性定标的近似欠条）**：
   在无源圆弧本体上，沿所选大圆 $S^1$ 走完半圈抵达对径态只是触零条件 $\kappa(x, x_{\mathrm{anti}}) = 0$，走完一整圈回到自身只是离散重合 $\kappa(x, x) = 1$（在该所选大圆载流圈 $S^1$ 上的绕数等于 $1 \in \pi_1(S^1) \cong \mathbb{Z}$，尽管在环境三维球面中有 $\pi_1(S^3) = 0$）。然而欧氏线性几何拒绝将弯曲圆弧奉为原语，执意用 $N$ 段零曲率平直折线（阿基米德内接与外切正 $N$ 边形，或包裹球面的平直多面体）去拼凑圆周。对任意有限边数 $N \ge 3$，单位圆内接与外切正 $N$ 边形的半周长 $p_N^{\mathrm{in}} = N\sin\frac{\pi}{N} < \pi < N\tan\frac{\pi}{N} = p_N^{\mathrm{out}}$ 永远卡在真值两侧：每条平直弦相对圆弧必凹陷一截严格为正的二阶弦弧矢高 $s_N = 1 - \cos\frac{\pi}{N} > 0$（累计矢高夹逼见 [`accumulated_sagitta_bounds`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds)，`LEAN ✓`），相邻直棱之间必留折角 $\frac{2\pi}{N} > 0$。唯有令 $N \to \infty$ 取无穷极限，“把弯弧拉直除以直径”才收敛为超越数 $\pi = 3.14159265\dots$（林德曼 1882，`文献结果`）。更有甚者，内核定理 [`comparison_classification_of_continuous_rays`](lean:D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays)（`LEAN ✓`）从反方向一针见血地指出了“弧度角与 $\pi$”在何时混入方程：在有限维实赋范代数的换位封闭子空间 $L \subseteq A$ 与满足 $\exp(L) \subseteq G$ 及伴随稳定性的子群 $G \le A^\times$ 上，唯有当我们离开流群本身、强行用使有界忠实共轭不变比较函数 $\varphi : G \to [0, 1]$ 连续的**平直切空间实数射线参数** $t \mapsto \exp(tX)$（$t \in \mathbb{R}$）去线性刻度倍角律 $\varphi(g^2) = (2\varphi(g)-1)^2$ 时，任一**非零**切生成元 $X \in L \setminus \{0\}$（排除每点皆返回的静止射线 $X = 0$）的最小正返回周期 $T > 0$（$\exp(tX)=1 \iff t \in T\mathbb{Z}$）与切空间内积 $h(X, X) = \frac{2\pi^2}{T^2}$ 才被迫把 $\pi$ 带进归一化系数（在单位四元数群 $\mathrm{Sp}(1)$ 上，单位纯虚生成元 $X = \hat{\mathbf{i}} \neq 0$ 满足 $h(\hat{\mathbf{i}}, \hat{\mathbf{i}}) = \frac{1}{2}$、最小正返回周期 $T = 2\pi$ 及对径半周期 $T/2 = \pi$；若改按 $\sqrt{h(X,X)/2} = 1$ 即 $h(X,X) = 2$ 定标，则最小正返回周期本身取 $T = \pi$）！日常物理中的“弧度 $\theta$”，字面上就是把弯曲圆弧强行拉直铺到平直实轴 $T_o\mathcal{M}$ 上留下的线性投影。

::: {.viz src="constant-free-rational-axiom-omega-sandbox" preset="pi-polyhedral-crease-residual" height="500"}
多面体折痕与正多边形拉直残差卡（`pi-polyhedral-crease-residual`）：紫色半透明真球（单位四元数在 $\operatorname{span}\{1, \mathbf{i}, \mathbf{j}\}$ 上的截面）内接平面测地多面体（默认停在 $\nu = 1$，舞台宽 $\ge 480\,\mathrm{px}$ 标出 `ν = 1 · 12 个顶点`）与赤道青色正六边形（$N = 6$，银白起点 `x₀ = 1`，琥珀手柄停在 `x₁` 并标有理读数 $\kappa(x_0, x_1) = 3/4$），每条青色平直弦外留一道品红弓形矢高 $1 - \cos(\pi/6) \approx 0.1340$，各顶点戴品红角亏锥且总和恒为 $720.00^\circ = 4\pi$；拖动琥珀手柄或时间轴调大 $N$，弓形矢高只变薄而不归零。
:::

2. **$e$（平直切线欧拉步脱轨膨胀的近似欠条，以及 $e^{\hat{\mathbf{i}}\pi} = -1$ 的互逆失真对消）**：
   考察自然底数的经典极限 $e = \lim_{N\to\infty}\bigl(1 + \frac{1}{N}\bigr)^N = 2.71828182\dots$ 及其切向复演化 $z_N(\theta) := \bigl(1 + \frac{\theta\hat{\mathbf{i}}}{N}\bigr)^N$。在连续自指演化中，状态本应顺着单位球面 $\mathbb{T}_3 \cong S^3(1)$ 作保模长的圆弧滑动；但线性微积分每一步都沿着**平直切线方向**硬跨出欧拉折线步 $1 + \frac{\theta\hat{\mathbf{i}}}{N}$。对任意非零步幅 $\theta \neq 0$ 与任意有限步数 $N \ge 1$，单步模方当场膨胀为 $1 + \frac{\theta^2}{N^2} > 1$，$N$ 步复合后的总模方严格刺破单位球壳（`手工推导`）：

   $$
   \bigl\lVert z_N(\theta)\bigr\rVert^2 \;=\; \left(1 + \frac{\theta^2}{N^2}\right)^N \;=\; 1 + \frac{\theta^2}{N} + \mathcal{O}(N^{-2}) \;>\; 1 \qquad (\forall\, \theta \neq 0,\ N \ge 1),
   $$

   在每一个有限步上都脱离球面、违背幺正范数守恒！（同理，若将指数级数 $\exp(\theta\hat{\mathbf{i}})$ 在单位元赋范完备实赋范代数中截断为前 $n$ 项多项式 $\sum_{k=0}^{n-1}\frac{(\theta\hat{\mathbf{i}})^k}{k!}$，当参数满足 $0 \le r < n + 1$ 且 $\lvert\theta\rvert = \lVert\theta\hat{\mathbf{i}}\rVert \le r$ 时，其截断余项受内核定理 [`exp_remainder_le`](lean:D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le) 上界 $\frac{r^n/n!}{1 - r/(n+1)}$ 严格控制；且对任意有限阶数 $n \ge 2$，该多项式的模方关于 $\theta$ 是次数 $2(n-1) \ge 2$、最高次项系数 $\frac{1}{((n-1)!)^2} > 0$ 的非常值实多项式，故即便偶有孤立交点如 $n=4,\;\theta=\sqrt{3}$ 亦绝无法作为 $\theta \in \mathbb{R}$ 的函数恒等停留在单位圆上。）为了修补每一步平直切线脱轨造成的径向误差，线性微积分只能将折线切碎至无穷多步（$N \to \infty$）去追赶真圆弧，追赶极限在实标度轴上留下的复利疤痕便是超越数 $e$（埃尔米特 1873，`文献结果`）。由此再看欧拉公式 $e^{\hat{\mathbf{i}}\pi} = -1$ 便豁然开朗（`手工推导` + `MODEL`）：在 $S^3(1)$ 上，对径点 $-\mathbf{1}$ 处于 $\mathbf{1}$ 的割迹（cut locus）上（任意单位纯虚方向 $\hat{\mathbf{u}}$ 皆满足 $\exp_{\mathbf{1}}(\pi\hat{\mathbf{u}}) = -\mathbf{1}$，不存在全局单值球面对数）；一旦选定单条大圆切向 $\hat{\mathbf{i}}$ 并沿半圆支 $\theta \in [0, \pi)$ 取单侧端点切向原像 $\pi\hat{\mathbf{i}}$，拉直映射把对径点 $-\mathbf{1}$ 拍平到切直线 $\mathbb{R}\hat{\mathbf{i}}$ 上生出了 $\pi\hat{\mathbf{i}}$，而切指数包裹映射 $\exp_{\mathbf{1}}(\theta\hat{\mathbf{i}}) = e^{\hat{\mathbf{i}}\theta}$ 又靠无穷步平直切线极限把切直线卷回该大圆生出了 $e$——**$e$ 与 $\pi$ 恰是沿选定半圆“圆弧 $\leftrightarrow$ 平直切线”一对互逆线性化各自携带的畸变常数**，$\exp_{\mathbf{1}}(\pi\hat{\mathbf{i}}) = e^{\hat{\mathbf{i}}\pi} = -\mathbf{1}$ 不过是两道互逆线性失真沿所选半圆精确抵消，重回纯粹比较公理里零常数的对径态 $-\mathbf{1}$（即精确整数读数 $\kappa(\mathbf{1}, -\mathbf{1}) = 0$；在下文实验卡中，默认初值 $\theta = 90^\circ$ 对应纯有理输入 $\boldsymbol{\sigma} = \hat{\mathbf{i}}$，而连续拖动滑块 $\theta$ 时页面沿实切参数 $\boldsymbol{\sigma} = \tan(\theta/2)\hat{\mathbf{i}}$ 在同一单位圆上连续扫掠 $Q(\boldsymbol{\sigma})$）！

::: {.viz src="constant-free-rational-axiom-omega-sandbox" preset="euler-tangent-escape-vs-cayley" height="500"}
欧拉切线脱轨对比一步有理凯莱驻球卡（`euler-tangent-escape-vs-cayley`）：默认停在有理特例 $\theta = 90.00^\circ,\; N = 6$，品红 6 步平直切线折线 $(1 + \mathbf{i}\theta/6)^k$ 螺旋逃出单位球外（末端 `z₆` 模方满足 $\lvert z_6\rvert^2 > 1$，值 $\approx 1.4885$），而从紫色对径点 `−1` 经 $\boldsymbol{\sigma}$ 投出的青色凯莱旋子 `Q(σ)`（舞台宽 $\ge 480\,\mathrm{px}$ 在 $\theta = 90^\circ$ 处标 `σ = i = Q(σ)`，配琥珀手柄）一步精确落在圆周上（顶栏与舞台同标 $\lVert Q(\boldsymbol{\sigma})\rVert^2 = 1.0000$）；点按 `⏮`（宽屏在巡览条、窄屏在时间轴）回到 $\theta = 0^\circ$ 时 `z₆ = 1`、模方 `1.0000` 无逸出，推至 $\theta = 180^\circ$ 时顶栏写出沿 $\mathbf{i}$ 半圆切向原像 $\pi\mathbf{i}$ 的 $\exp_1(\pi\mathbf{i}) = e^{\mathbf{i}\pi} = -1,\; \kappa(1, -1) = 0$。
:::

3. **$\varphi$（一维整数加法递推与三维五重平直面越界逼近球对称的近似欠条）**：
   当人们试图用一维线性整数加法（斐波那契递推 $F_{n+2} = F_{n+1} + F_n$）去模仿自相似比例闭合 $x = 1 + \frac{1}{x}$（正实轴唯一不动点 $\varphi = \frac{1+\sqrt{5}}{2}$ 由 [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique) 锁定，`LEAN ✓`），相邻整数比 $F_{n+1}/F_n$ 因格点不可整除而在 $\varphi$ 两侧永无休止地交替震荡，每一步都留下无法归零的卡西尼整数范数残差 $F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1} \neq 0$（由 $F_{n+2}=F_{n+1}+F_n$ 等价于黄金整数环范数恒等式 $F_n^2 + F_n F_{n+1} - F_{n+1}^2 = (-1)^{n+1}$，[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)，`LEAN ✓`）以及一切有理分数 $q \in \mathbb{Q}$ 无法逾越的最慢连分数赫尔维茨排斥下界 $\lvert\varphi - q\rvert > \frac{1}{\sqrt{5}\,q.\mathrm{den}^2 + q.\mathrm{den}}$（[`golden_hurwitz_bound`](lean:D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound)，`LEAN ✓`），吐出连分数展开最慢的二次无理数 $\varphi = [1; 1, 1, 1, \dots] \approx 1.61803399$。在三维几何中，当人们越过正四面体（每个顶点汇集 $3$ 个正三角形）与正八面体（汇集 $4$ 个），试图用最多的全等平直正三角形去围成最贴近球的柏拉图立体——正二十面体（每个顶点强行汇集 $5$ 个平面正三角形）时，标准定向下的中心化十二枚顶点在归一至单位球面前取三组循环坐标轮换 $(0, \pm 1, \pm\varphi),\; (\pm 1, \pm\varphi, 0),\; (\pm\varphi, 0, \pm 1)$，除对跖顶点对仍读 $\kappa = 0$ 外，一切互异非对跖顶点对的保真度当场从 $\mathbb{Q}$ 碎裂进二次无理数扩域 $\mathbb{Q}(\varphi) \setminus \mathbb{Q}$！

## 32.5.2 高斯—博内曲率铁壁与施瓦茨灯笼：为什么平直多面体永远变不成真球？ {#sec-ch39-29-2}

在工程数值计算里，人们常以为“只要把多面体网格切得足够细（$N \to \infty$），平直多面体就等同于真球”。然而在微分几何与 $\mathrm{AXIOM}\text{-}\Omega$ 本体论下，尽管凸多面体或径向测地穹顶的边界在纯拓扑上同胚于二维球面 $S^2$（$\chi = 2$），**任何有限平直多面体与光滑真球面之间仍横亘着不可逾越的诱导度规、曲率分布与微分光滑性（$C^1$）铁壁**（`文献结果` + `手工推导`，与[终章 §C.1](coda-s01-polyhedral-remainders.md#sec-coda-polyhedral-remainder) 前后呼应）：

1. **有限阶下齐性彻底破缺、顶点 $4\pi$ 角亏奇点挤压与外在直棱折痕**：
   光滑球面 $S^2$（经典 $\mathrm{SO}(3)$ 球面几何，`文献结果`）与三元数流形 $\mathbb{T}_3 \cong S^3(1)$（单位四元数两点齐性见 [`exists_mul_mul_eq_of_kappa_eq`](lean:D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq)，`LEAN ✓`）的根本特征是**两点齐性各向同性**，每一点均匀承载恒定正截面曲率 $K \equiv +1$，处处光滑可微（$C^\infty$）。而在任意具有球面拓扑（$\chi = 2$）与 $V$ 个顶点的凸平直多面体（哪怕是拥有十亿片平面三角形的测地穹顶）上，占表面积 $100\%$（除去零测度棱线与顶点）的开平面三角形内部内禀高斯曲率**恒等于 $0$**，全部 $2\pi\chi(S^2) = 4\pi$ 的内禀高斯曲率测度被粗暴挤压在有限个孤立锥顶上，化作非零**笛卡尔—雷吉角亏奇点** $\delta_v = 2\pi - \sum_{f \ni v}\alpha_f(v)$（$\sum_{v=1}^V \delta_v = 4\pi$），而外在嵌入的单位法向量则在相邻平面之间的直棱处发生二面角跳变，留下不可微折痕（$C^0 \setminus C^1$）；
2. **仅靠顶点贴近连表面积与外在法向都可能失控——施瓦茨灯笼精确面积与三重渐近相区**：
   更深刻的分析警示来自赫尔曼·施瓦茨（H. A. Schwarz, 1880）著名的**施瓦茨灯笼（Schwarz Lantern）**反例（`文献结果` + `手工推导`）：若不对三角形内角施加形状正则性（fatness）约束，仅令内接平直三角网格的顶点一致收敛于光滑曲面（$C^0$ 豪斯多夫距离 $\to 0$），在半径 $R=1$、高 $H=1$ 的单位圆柱面（球面赤道带折纸剖分同理）上沿圆周取 $n$ 等分（周向弦长 $2\sin\frac{\pi}{n}$）、沿轴向取 $m$ 层交错等腰三角形（横向斜高 $\sqrt{m^{-2} + (1 - \cos\frac{\pi}{n})^2}$），全部 $2mn$ 片平面三角形的总面积精确为

   $$
   A_{m,n} \;=\; 2n\sin\frac{\pi}{n}\,\sqrt{1 + m^2\Bigl(1 - \cos\frac{\pi}{n}\Bigr)^2};
   $$

   由此直接分出收敛相区 $m/n^2 \to 0$（$A_{m,n} \to 2\pi$）与两重非收敛相区：当 $n, m \to \infty$ 且比值 $m/n^2 \to a \in (0, \infty)$ 时，$A_{m,n} \to 2\pi\sqrt{1 + \frac{\pi^4 a^2}{4}} > 2\pi$ 收敛到严格偏离真侧面积 $2\pi$ 的伪极限（例如取 $m = n^2$ 即 $a = 1$ 时，$A_{n^2,n} \to 2\pi\sqrt{1 + \frac{\pi^4}{4}} \approx 31.63649176$，高达真面积的 $5.04$ 倍！）；而只要 $m/n^2 \to \infty$（例如取 $m = n^3$），即便网格直径趋于 $0$、所有顶点无限贴近柱面，平面三角形的外在单位法向量依然沿轴向剧烈翻转震荡而拒不收敛于光滑法场，表面积 $A_{m,n}$ 更直接发散至 $+\infty$！即便如[终章 §C.1](coda-s01-polyhedral-remainders.md) 那样对正二十面体施加严格的形状正则径向细分（其边界同样拓扑同胚于 $S^2$，且 $\nu \to \infty$ 时面积、法向与利普希茨—基灵高斯曲率测度确实弱收敛于光滑球面，`文献结果`），一方面在**任何有限细分阶数 $\nu < \infty$** 下全网仍残留 $10\nu^2 + 2$ 颗顶点角亏奇点（重标最大角亏 $\nu^2\mathcal{D}_\nu \to \frac{6\sqrt{3}}{3\varphi+2} > 0$，极限值 $\approx 1.51621684$）与 $30\nu^2$ 条外在直棱折痕，诱导分段平直度规永远不是光滑流形；另一方面，一旦被迫取 $\nu \to \infty$ 无穷极限去抹平折痕，平直账本上就立刻结出超越数 $\pi$ 的无穷尾账。

为了将“无常数有理母公理骨架”与“线性近似残差”严格定格在同一套代数坐标上，我们给出如下统一定义：

::: {.definition #def-ch39-constant-free-rational-primitives-and-residuals title="AXIOM-Ω 无常数有理骨架、整系数切比雪夫倍增映射与三类平直近似残差"}
在满足 [§39.1.2](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-2) 母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的三元比较结构 $(\mathcal{M}, [-,-,-], \kappa)$ 及其单位四元数同构模型 $\mathbb{T}_3 \cong \mathrm{Sp}(1) = S^3(1) \subset \mathbb{H}$ 上，定义以下四组精确数学对象（第 1–3 款为纯有理/整系数代数构造，第 4 款为平直近似残差度量，本体诠释标 `MODEL`）：

1. **有理凯莱一步驻球映射与有理三元数骨架 $S^3(\mathbb{Q})$**：对任意三维有理向量 $\boldsymbol{\sigma} = (\sigma_1, \sigma_2, \sigma_3) \in \mathbb{Q}^3$，定义**有理凯莱—罗德里格斯映射**

   $$
   Q(\boldsymbol{\sigma}) \;:=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)\mathbf{1} + 2\sigma_1\mathbf{i} + 2\sigma_2\mathbf{j} + 2\sigma_3\mathbf{k}}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \;\in\; S^3(\mathbb{Q}) \;:=\; \bigl\{q \in \mathbb{H}(\mathbb{Q}) : \lVert q\rVert^2 = 1\bigr\},
   $$

   并配对闭球双卡带符号参数 $(\boldsymbol{\sigma}, \epsilon_{\mathrm{sheet}}) \in \overline{B}_1(\mathbb{Q}^3) \times \{+1, -1\}$（其中 $\overline{B}_1(\mathbb{Q}^3) := \{\boldsymbol{\sigma} \in \mathbb{Q}^3 : \lVert\boldsymbol{\sigma}\rVert^2 \le 1\}$，映射 $Q_{\epsilon}(\boldsymbol{\sigma}) := \epsilon\,Q(\boldsymbol{\sigma})$ 由 $(\mathbf{0}, -1)$ 精确编码对径极 $-\mathbf{1}$、在赤道 $\lVert\boldsymbol{\sigma}\rVert^2 = 1$ 上经对径叠合 $(\boldsymbol{\sigma}, +1) \sim (-\boldsymbol{\sigma}, -1)$ 覆盖纯虚球面，且无界单卡满足双射分解 $S^3(\mathbb{Q}) = \{Q(\boldsymbol{\sigma}) : \boldsymbol{\sigma} \in \mathbb{Q}^3\} \sqcup \{-\mathbf{1}\}$）；
2. **定心相关度与整系数切比雪夫保真倍增多项式**：由对称保真度 $\kappa(x, y) \in [0, 1]$ 定义有理线性重标的**定心相关度** $c(x, y) := 2\kappa(x, y) - 1 \in [-1, 1]$、三点定心格拉姆矩阵 $\mathbf{G}_3^{(c)}(x,y,z) := \bigl[c(x_i,x_j)\bigr]_{i,j=1}^3$，以及单步无三角函数**整系数二次保真倍增多项式**

   $$
   f_{\mathrm{arc}}(\kappa) \;:=\; (2\kappa - 1)^2 \;=\; 4\kappa^2 - 4\kappa + 1 \;\in\; \mathbb{Z}[\kappa],
   $$

   其一般 $n$ 拍（$n \in \mathbb{N}$）流群自平行递推 $x_0, x_1, x_{k+2} = [x_{k+1}, x_k, x_{k+1}]$ 的保真读数多项式记为 $\mathcal{P}_n(\kappa_1) := \frac{1 + T_n(2\kappa_1 - 1)}{2} \in \mathbb{Q}[\kappa_1]$，其中 $T_n \in \mathbb{Z}[X]$ 为第一类整系数切比雪夫多项式（$T_0(X)=1,\; T_1(X)=X,\; T_{n+2}(X)=2XT_{n+1}(X)-T_n(X)$）；
3. **五重原生有理保真地标集**：在 $\mathcal{M}$ 及其赤道二维纯虚球面 $S^2_{\mathrm{eq}} := \{q \in S^3(1) : \operatorname{Re}(q) = 0\} \cong S^2 \subset \mathbb{R}^3$ 上，定义不依赖任何超越常数的对称闭合有理保真地标集

   $$
   \mathcal{K}_{\mathbb{Q}}^{\star} \;:=\; \left\{\, 1,\; \frac{1}{2},\; \frac{1}{3},\; \frac{1}{4},\; 0 \,\right\} \;\subset\; \mathbb{Q} \cap [0, 1];
   $$

4. **三类平直线性近似残差泛函**：对有限剖分/步数阶次 $N \ge 3$，分别定义大圆正 $N$ 边形弦弧矢高残差 $s_N := 1 - \cos\frac{\pi}{N}$ 与球面拓扑（$\chi = 2$）凸多面体总顶点角亏 $\Sigma_\delta := \sum_{v=1}^V \delta_v \equiv 4\pi$（**$\pi$ 残差**）、平直欧拉切线步径向脱壳残差 $\mathcal{E}_{\mathrm{Euler}}(N, \theta) := \bigl(1 + \frac{\theta^2}{N^2}\bigr)^N - 1 > 0$（$\theta \neq 0$，**$e$ 残差**），以及一维斐波那契整数比卡西尼残差 $\mathcal{C}_n := F_n F_{n+2} - F_{n+1}^2 = F_n^2 + F_n F_{n+1} - F_{n+1}^2 = (-1)^{n+1}$ 与 $\mathbb{R}^3$ 中不共线 $N \ge 3$ 点构型的麦克斯韦杆数减自由度计数盈余 $\Delta E(N) := \binom{N}{2} - (3N - 6) = \frac{(N-3)(N-4)}{2}$（**$\varphi$ 残差**）。
:::

## 32.5.3 为 AXIOM-Ω 洗去线性污染：纯有理保真度、整系数切比雪夫递推与临界相变表 {#sec-ch39-29-3}

顺着这一洞见反身检视全书前文，凡是为了迁就传统分析教材而写下的“弧度角 $\theta \in [0, \pi]$”、“超越余弦不动点 $\cos\theta^* = \theta^* \approx 0.73908513\dots$”以及平直切指数“$\exp(\theta\mathbf{e})$”，无一不是把弯曲圆弧投影到线性实轴上做跨账本翻译时的混合记号——例如 $\cos\theta^* = \theta^*$ 之所以是林德曼—魏尔斯特拉斯超越数（[终章 §C.2](coda-s04-fixed-point-anchors.md) [@rem-coda-epistemic-discipline]；对 $2X + 2\arcsin X$ 的有理系数形式复合逆级数在 $\pi$ 处求值得 $\theta^* = \sum_{n=0}^\infty c_n \pi^n$，$c_n \in \mathbb{Q}$，其中绝对可和性与精确收敛和见 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)，`LEAN ✓`，首两项非零系数 $c_0 = 0,\; c_1 = \frac{1}{4},\; c_3 = -\frac{1}{768}$ 为 `手工推导`），恰恰是因为等号左边放了内禀投影读数 $\cos\theta = 2\kappa - 1$，等号右边却强行画上了线性拉直的弧度长 $\theta$！

一旦将平直弧度标尺彻底请出底层公理，只保留 $\mathrm{AXIOM}\text{-}\Omega$ 的两个原生原语 **$[x, y, z]$（无源三元迁移）** 与 **$\kappa(x, y) \in [0, 1]$（对称往返保真度）**，整座几何与物理骨架不仅毫发无损，反而褪尽了无理数与超越数泡沫，显露出纯粹的整数与有理分数结构：

### 32.5.3.1 用纯保真度 κ ∈ {1, 1/2, 0} 替代线性弧度角 θ 与 π {#sec-ch39-29-3-1}

在 $\mathrm{AXIOM}\text{-}\Omega$ 原生语言中，根本无需“角度”中介，一切核心对称相位皆由精确有理保真度直接定义（`手工推导` + `LEAN ✓`）：

- **完全重合同一**：线性弧度写作 $0\;\mathrm{rad}$，母公理外延分离律直接写作精确整数 **$\kappa(x, y) = 1 \iff x = y$**；
- **$90^\circ$ 正交虚盲区（$\hat{\mathbf{i}}$）与公平中线**：线性弧度被迫写成超越数 $\frac{\pi}{2} \approx 1.57079633\dots$（在 $S^3(1)$ 上如 $\mathbf{1}$ 与纯虚元 $\hat{\mathbf{i}}$ 满足 $\langle\mathbf{1}, \hat{\mathbf{i}}\rangle_{\mathbb{R}^4} = 0$，或在布洛赫商球 $S^2$ 上赤道正交方向满足 $\hat{\mathbf{u}}\cdot\hat{\mathbf{v}} = 0$），而在母公理原生语言中，正交不过是可见对齐份额与盲区残差份额**五五平分**，即精确有理分数 **$\kappa = \frac{1}{2}$**！这同样与一维凯莱分式变换 $\operatorname{cayleyRatio}(s) = \frac{s - 1}{s}$ 精确呼应：内核定理 [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)（`LEAN ✓`）仅用有理系数代数恒等式 $\lVert\frac{s-1}{s}\rVert^2 - 1 = \frac{1 - 2\operatorname{Re}(s)}{\lvert s\rvert^2}$（$s \neq 0$）即证出单位圆保范边界严格等价于纯有理实部中线 $\operatorname{Re}(s) = \frac{1}{2}$——在复分析与数论中，黎曼完备函数反射对称轴及经典黎曼猜想与狄利克雷广义黎曼猜想的外部形式化零点临界线（见 [§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md) 与 [§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]、[@rem-rh-grh-direct-consequences] 的外部核验说明；将其与量子正交平分 $\kappa = \frac{1}{2}$ 对读属本书的跨界 `MODEL` 诠释）同样钉在干干净净的有理数 $\frac{1}{2}$，而非任何带 $\pi$ 的超越数；
- **对径完全反相**：线性弧度写成超越数 $\pi \approx 3.14159265\dots$，母公理触零分离律直接写作精确整数 **$\kappa(x, x_{\mathrm{anti}}) = 0$**。

### 32.5.3.2 用整系数切比雪夫倍增与有理凯莱一步驻球替代 sin、cos 与 e {#sec-ch39-29-3-2}

更进一步，球面上的测地推进与群元生成也完全不需要借道 $\sin, \cos$ 或自然底数 $e$ 的无穷级数（`LEAN ✓` + `手工推导`）：

1. **无三角函数的整系数二次倍增律与切比雪夫全阶闭式**：
   设起点 $x_0 = x$ 到 $x_1 = y$ 的单步保真度为 $\kappa_1 = \kappa(x, y)$，沿同一大圆流群自平行再走一步抵达 $x_2 = [y, x, y]$。由双侧迁移不变性，$\kappa(y, [y, x, y]) = \kappa([y, x, x], [y, x, y]) = \kappa(x, y) = \kappa_1$。由于共测地线的三枚单位四元数 $x, y, z$ 落在所选大圆所在的二维实平面内（当 $y \neq \pm x$ 时即 $\operatorname{span}_{\mathbb{R}}(x, y) \subset \mathbb{R}^4$，在 $\mathbb{R}^4$ 中三向量必线性相关），将内核冻结的三锚格拉姆行列式公式 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)（`LEAN ✓`）直接作用于定心相关度 $c = 2\kappa - 1$（注意区分：此处零行列式属于无常数偏置的定心内积矩阵 $\mathbf{G}_3^{(c)}$，而含常数模的特征秩五母核矩阵 $\mathbf{G}_3^{(\kappa)}$ 在开半周内满足 $\det\mathbf{G}_3^{(\kappa)} > 0$，如 [§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md) 中 $60^\circ$ 处等于 $\frac{3}{32}$），对任意满足 $\kappa(x, y) = \kappa(y, z) = \kappa_1$ 的共大圆三点（记 $c_1 := 2\kappa_1 - 1,\; c_2 := 2\kappa(x, z) - 1$）立得纯整系数因式分解（`手工推导`）：

   $$
   \det\mathbf{G}_3^{(c)}(x, y, z) \;=\; 1 + 2c_1^2 c_2 - \bigl(2c_1^2 + c_2^2\bigr) \;\equiv\; 4\bigl(1 - \kappa(x, z)\bigr)\Bigl(\kappa(x, z) - \bigl(2\kappa(x, y) - 1\bigr)^2\Bigr) \;=\; 0!
   $$

   在开区间 $0 < \kappa_1 < 1$ 上（此时 $(2\kappa_1 - 1)^2 < 1$），两因子严格分离折返归原支 $z = x$（$\kappa(x, z) = 1$）与向前自平行推进支 $z = [y, x, y]$（而在两个典范端点 $\kappa_1 \in \{0, 1\}$ 即 $y = \pm x$ 处，$(2\kappa_1 - 1)^2 = 1$ 合拢为重根 $-4(1 - \kappa(x, z))^2 = 0$，此时 $[y, x, y] = x$ 与归原支重合）！而对一切 $\kappa_1 \in [0, 1]$（含端点 $\{0, 1\}$），内核冻结的**四元数流群切比雪夫递推等价定理** [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)（`LEAN ✓`）更是无条件给出双向充要等价：序列 $(x_n)_{n\in\mathbb{N}} \subset \mathbb{H}$ 满足 $\lVert x_0\rVert^2 = \lVert x_1\rVert^2 = 1$ 与无源流群递推 $x_{n+2} = [x_{n+1}, x_n, x_{n+1}] = x_{n+1}\bar{x}_n x_{n+1}$，**当且仅当**对一切 $n \in \mathbb{N}$ 有 $\lVert x_n\rVert^2 = 1$、$x_{n+1} = U_n(c_1)x_1 - U_{n-1}(c_1)x_0$（$n = 0$ 时约定 $U_{-1} = 0$）且 $\langle x_0, x_n\rangle = T_n(c_1)$！取 $n = 2$（$T_2(c_1) = 2c_1^2 - 1$）即刻锁死**零超越函数的整系数二次圆弧倍增律**：

   $$
   \kappa\bigl(x,\, [y, x, y]\bigr) \;=\; \bigl(2\kappa(x, y) - 1\bigr)^2, \qquad \kappa(x_0, x_n) \;=\; \frac{1 + T_n\bigl(2\kappa(x_0, x_1) - 1\bigr)}{2}.
   $$

   徒手代入有理数立见其纯粹威力：从正交态 $\kappa_1 = \frac{1}{2}$ 再走一步，$(2\times\frac{1}{2} - 1)^2 = 0$（一步直达对径点）；从大圆三等分态 $\kappa_1 = \frac{1}{4}$ 再走一步，$(2\times\frac{1}{4} - 1)^2 = \frac{1}{4}$（恰为整系数不动点方程 $(2\kappa - 1)^2 = \kappa \iff (\kappa - 1)(4\kappa - 1) = 0$ 的唯一非恒等有理根！），第三拍代入 $T_3(-\frac{1}{2}) = 4(-\frac{1}{2})^3 - 3(-\frac{1}{2}) = +1$ 得 $\kappa(x_0, x_3) = 1 \iff x_3 = x_0$（三拍精准归元）——全程只有整数加减乘，零余弦、零弧度、零无穷级数！
2. **无自然底数 $e$ 的一步有理真球驻留与完备化边界**：
   在 [@def-ch39-constant-free-rational-primitives-and-residuals] 第 1 款的有理凯莱参数 $\boldsymbol{\sigma} \in \mathbb{Q}^3$ 下，对**任意有限有理数输入**，一步四则运算给出的 $Q(\boldsymbol{\sigma})$ 模平方恒满足多项式恒等式

   $$
   \bigl\lVert Q(\boldsymbol{\sigma})\bigr\rVert^2 \;=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2 + 4\lVert\boldsymbol{\sigma}\rVert^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2} \;=\; \frac{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2} \;\equiv\; 1!
   $$

   它完全不需要像平直欧拉步 $(1 + \frac{\theta\hat{\mathbf{i}}}{N})^N \to e^{\theta\hat{\mathbf{i}}}$ 那样靠无穷步极限去追赶球壳，而是每一步都严丝合缝地长在 $S^3(\mathbb{Q}) \setminus \{-\mathbf{1}\} \subset S^3(1)$ 上；并上对径极 $-\mathbf{1}$（由双卡符号叶 $(\mathbf{0}, -1)$ 覆盖）即得完整有理单位四元数群 $S^3(\mathbb{Q}) = Q(\mathbb{Q}^3) \sqcup \{-\mathbf{1}\}$，其上流群迁移 $[q_1, q_2, q_3] = q_1 q_2^{-1} q_3$ 与保真读数 $\kappa(q_1, q_2) = \frac{1 + \langle q_1, q_2\rangle}{2}$ 100% 闭合在有理数域 $\mathbb{Q}$ 内！此处同时恪守 [§39.1.2](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-2) 的严格形式边界：由于 $S^3(\mathbb{Q})$ 对乘逆封闭、可数且在 $S^3(1)$ 中稠密却非闭集（有理点稠密性属 `文献结果`），将内核冻结的**子群完备化闭集判据** [`subgroupModel_readingComplete_iff`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.subgroupModel_readingComplete_iff)（`LEAN ✓`）应用于 $H = S^3(\mathbb{Q})$ 立知其子群模型不满足读数完备性（`手工推导`；而内核存在性定理 [`exists_subgroupModel_not_readingComplete`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.exists_subgroupModel_not_readingComplete)，`LEAN ✓`，独立给出同时满足非交换、链连通、触零与极小特征秩 $5$ 的可数稠密未完备子群模型，不要求该抽象见证特指 $S^3(\mathbb{Q})$）。母公理中唯一把稠密子群骨架延拓为不可数连续统 $S^3(1)$ 的条款是弦距 $d_\kappa = 2\sqrt{1-\kappa}$ 下的**读数完备性**（`H3` 柯西完备化），而即便在这一完备化条款中也同样不出现任何 $\pi, e, \varphi$。

::: {.viz src="constant-free-rational-axiom-omega-sandbox" preset="chebyshev-rational-arc-doubling" height="500"}
整系数切比雪夫圆弧倍增卡（`chebyshev-rational-arc-doubling`）：不借 $\sin, \cos$ 或 $\pi$，默认停在 $\kappa_1 = 1/4$，舞台仅由四元数乘法自银白起点 `x₀` 与琥珀手柄 `x₁ · κ₁ = 1/4` 递推绘出青色堆点 `x₂ · κ₂ = 1/4`（$\kappa_2 = (2\kappa_1 - 1)^2 = 1/4$）及回到 `x₀` 青色圆环的第三拍（$\kappa_3 = \kappa_1(4\kappa_1 - 3)^2 = 1$，舞台宽 $\ge 480\,\mathrm{px}$ 标 `x₃ = x₀` 与定心内积行列式 `det G₃ = 0.0000`）；拖动琥珀手柄或时间轴改 $\kappa_1$，可在 $\kappa_1 = 1/2$ 处看到 $\kappa_2 = 0$ 抵对径点。
:::

### 32.5.3.3 从 N ≤ 4 等保真（等距）上限与典范有理地标到 N ≥ 5 残差涌现的临界相变表 {#sec-ch39-29-3-3}

最富启发性的分水岭出现在三维空间球面 $S^2_{\mathrm{eq}} \subset \operatorname{Im}\mathbb{H} \cong \mathbb{R}^3$（纯虚单位三元数球面，亦即单比特布洛赫球面）上对称点集阶数 $N$ 的推进之中：

- **为什么三维空间等保真（等距）点集在 $N = 4$ 处精确封顶、正则四面体唯一锁定 $\kappa = \frac{1}{3}$，且各阶典范构型的保真读数均为有理数（`手工推导`）**：
  设 $S^2 \subset \mathbb{R}^3$ 上有 $N$ 个互异且两两共享同一保真度 $\kappa < 1$ 的点 $v_1, \dots, v_N$（对一切 $i \neq j$，带符号内积 $v_i \cdot v_j = c = 2\kappa - 1 < 1$）。它们的 $N \times N$ 实内积格拉姆矩阵 $G = (1 - c)I_N + c\,\mathbf{1}_N\mathbf{1}_N^\top$ 具有特征值 $1 - c > 0$（重数 $N - 1$）与 $1 + (N - 1)c \ge 0$（重数 $1$），故矩阵秩满足 $\operatorname{rk}(G) \ge N - 1$；但 $v_1, \dots, v_N \in \mathbb{R}^3$ 迫使 $\operatorname{rk}(G) \le 3$，三行线性代数直接锁死等保真（等距）上限 **$N \le 4$**！（注意区分一般等距点族与典范地标：当 $N = 2$ 或 $N = 3$ 时，一般点对或球面小圆正三角形可连续实现任意 $\kappa \in [0, 1)$ 或 $\kappa \in [\frac{1}{4}, 1)$，其中自然包含无理值；但若聚焦各阶**极值/循环闭合典范构型**——$N = 1$ 自反基点 $\kappa = 1$，$N = 2$ 正交分界 $\kappa = \frac{1}{2}$ 与对径极值 $\kappa = 0$，$N = 3$ 大圆三拍闭合极值 $1 + 2c = 0 \implies \kappa = \frac{1}{4}$，以及 $N = 4$ 唯一满秩零质心解 $1 + 3c = 0 \implies c = -\frac{1}{3},\; \kappa = \mathbf{\frac{1}{3}}$ 即单比特对称信息完备正四面体 SIC——它们的保真度便清一色落在有理地标集 $\mathcal{K}_{\mathbb{Q}}^{\star} = \{1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, 0\}$ 上！这与麦克斯韦杆数计数盈余 $\Delta E(3) = \Delta E(4) = 0$ 互相呼应——注意 $\Delta E = 0$ 本身只是杆数减自由度的组合计数，真正无穷小静定刚性成立的条件是 $N = 3$ 不共线三角形与 $N = 4$ **仿射独立（不共面）**四面体，如球面赤道正方形虽不共线且 $\Delta E(4) = 0$ 却仅有刚度矩阵秩 $5 < 6$，而上文的带符号内积格拉姆秩界与下文的二周期多项式证明完全独立于刚度计数；见 [§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-10-3)，球面旋转系统 $\mathbb{Z}_2$ 面—边闭链基础见 [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)，`LEAN ✓`；顺带一提，即便升入四维环境空间 $S^3(1) \subset \mathbb{R}^4$ 的正则 $4$-单形，$1 + 4c = 0 \implies c = -\frac{1}{4}$ 给出的 $\kappa = \frac{3}{8}$ 依然是精确有理数！）
  有理保真读数可以出现在需要无理坐标的构型中。取正四面体的任意三个单位顶点作矩阵 $V$ 的列。它们两两内积为 $-1/3$，所以 $V^{\mathsf T}V$ 的特征值为 $1/3,4/3,4/3$，从而 $(\det V)^2=16/27$。因此 $\sqrt{3}=(9/4)|\det V|$，任何包含这些坐标的实数子域都必须包含 $\sqrt{3}$。 [有理布洛赫坐标的四面体障碍](lean:D5/S3/Quantum/AURICOmega/RationalBlochTetrahedron.no_rational_bloch_tetrahedral_triangle)

  反过来，$(\pm1,\pm1,\pm1)/\sqrt{3}$ 中符号乘积为正的四个向量给出这样的四面体，所以 $\mathbb Q(\sqrt{3})$ 就足够。在有理布洛赫球面 $S^2(\mathbb Q)$ 上，三个坐标轴的单位向量以共同读数 $\kappa=1/2$ 达到等保真点集的上限三。把载体扩到有理单位四元数球面时，同一组四点读数可以实现。将 $(3,0,0,0)$、$(-1,2,2,0)$、$(-1,0,-2,2)$、$(-1,-2,0,-2)$ 各除以 $3$，便得到四个单位向量，任意两者的内积都是 $-1/3$。

- **为什么在 $N = 5$（等距上限破缺、$\Delta E(5) = +1 > 0$）下要求正五重对称闭合即刻逼出 $\varphi$，继而在 $N \to \infty$ 逼出 $\pi$ 与 $e$**：
  一旦令 $N = 5$，三维空间 $\mathbb{R}^3$ 中不再存在两两等保真（等距）的五点构型（不共线五点距离对数超出刚体自由度计数 $\Delta E(5) = +1 > 0$；当然，放弃五重对称的非正则五点构型如 $\pm\mathbf{e}_1, \pm\mathbf{e}_2, \mathbf{e}_3$ 仍可保持两两有理读数 $\kappa \in \{0, \frac{1}{2}\}$，真正逼出 $\varphi$ 的是在等距封顶之后仍要求**大圆非静止等步五周期闭合**或**球面正则五重配位对称**）！在选定大圆 $S^1$ 上，非静止等步五周期闭合要求倍增映射 $f_{\mathrm{arc}}(\kappa) = (2\kappa - 1)^2$ 满足二次迭代不动方程 $f_{\mathrm{arc}}\!\bigl(f_{\mathrm{arc}}(\kappa)\bigr) = \kappa$ 且具有**严格最小周期 $2$**（$f_{\mathrm{arc}}(\kappa) \neq \kappa$）：作精确整系数因式分解（`手工推导`），

  $$
  f_{\mathrm{arc}}\!\bigl(f_{\mathrm{arc}}(\kappa)\bigr) - \kappa \;=\; 64\kappa^4 - 128\kappa^3 + 80\kappa^2 - 17\kappa + 1 \;\equiv\; (\kappa - 1)(4\kappa - 1)\bigl(16\kappa^2 - 12\kappa + 1\bigr) \;=\; 0!
  $$

  约去对应不动点 $f_{\mathrm{arc}}(\kappa) = \kappa$ 的两个有理线性因子 $(\kappa - 1)(4\kappa - 1)$ 后，严格二周期轨道由二次方程 $16\kappa^2 - 12\kappa + 1 = 0$（判别式 $\Delta = 80 = 16 \times 5$ 非有理平方！）唯一给出——其两根恰为正五边形邻点（$\frac{2\pi}{5} = 72^\circ$）与五角星对角弦（$\frac{4\pi}{5} = 144^\circ$）的一对伽罗瓦共轭无理保真度 $\kappa\bigl(\frac{2\pi}{5}\bigr) = \frac{3+\sqrt{5}}{8} = \mathbf{\frac{\varphi + 1}{4}}$ 与 $\kappa\bigl(\frac{4\pi}{5}\bigr) = \frac{3-\sqrt{5}}{8} = \mathbf{\frac{2 - \varphi}{4}}$（二者在 $f_{\mathrm{arc}}$ 下互映：$\frac{\varphi+1}{4} \leftrightarrow \frac{2-\varphi}{4}$；更一般地，由尼文定理，大圆正 $N$ 边形邻点保真度 $\kappa(\frac{2\pi}{N}) \in \mathbb{Q}$ 当且仅当 $N \in \{1, 2, 3, 4, 6\}$，`文献结果`）！而在二维球面 $S^2$ 上每个顶点汇集 $5$ 个平面正三角形的五重配位柏拉图立体——$12$ 顶点正二十面体（$V=12, E=30, F=20$）——其非对跖顶点对（邻点与相隔非对跖点）内积 $\pm\frac{1}{\sqrt{5}} = \pm\frac{2\varphi - 1}{5}$ 同样吐出无理保真度对 $\mathbf{\frac{\varphi + 2}{5}}$ 与 $\mathbf{\frac{3 - \varphi}{5}}$（对跖顶点对读 $\kappa = 0$）；继续把平直分片数推向 $N \to \infty$，$\pi$ 与 $e$ 遂作为无穷细微元极限的超越残差浮现：

| 典范闭合阶次 | 物理与几何典范角色 | 线性弧度账本（含平直化污染） | `AXIOM-Ω` 原生保真度 $\kappa$ | 常数涌现诊断（`LEAN ✓` + `手工推导` + `MODEL`） |
| :--- | :--- | :--- | :--- | :--- |
| **$N = 1$（自反单点）** | 恒等态 $[x,x,x]=x$ | $0\;\mathrm{rad}$ | **$\kappa = 1$**（精确整数） | 零近似误差，外延分离基点 |
| **$N = 2$（正交 / 对径地标）** | 虚盲区 $\hat{\mathbf{i}}$、凯莱 $\frac{1}{2}$ 中线 / 对径态 | $\frac{\pi}{2} \approx 1.5708\dots$（对径 $\pi$） | **$\kappa = \frac{1}{2}$**（对径 **$\kappa = 0$**，精确有理数） | 消除 $\frac{\pi}{2}$ 与 $\pi$ 的线性拉直假象 |
| **$N = 3$（大圆三等分闭环）** | 测地三拍自锁 $x_3 = x_0$ | $\frac{2\pi}{3} \approx 2.0944\dots$ | **$\kappa = \frac{1}{4}$**（精确有理数，计数 $\Delta E(3)=0$） | 整系数方程 $(2\kappa-1)^2=\kappa$ 唯一非恒等根 |
| **$N = 4$（三维正四面体）** | 满秩三维等保真单胞（单比特 SIC） | $\arccos(-\frac{1}{3}) \approx 1.9106\dots$ | **$\kappa = \frac{1}{3}$**（实三维的唯一四点等保真值） | 保真读数有理，顶点坐标所需的最小实数子域为 $\mathbb Q(\sqrt{3})$ |
| **$N = 5$（五重过约束破缺）** | 正五边形/五角星；$12$ 顶点五重配位正二十面体（非对跖对） | $\frac{2\pi}{5},\,\frac{4\pi}{5}$；五重平面棱折角 | 五边形 **$\frac{\varphi+1}{4},\,\frac{2-\varphi}{4}$**；二十面体 **$\frac{\varphi+2}{5},\,\frac{3-\varphi}{5}$** | $\Delta E(5)=+1>0$，$16\kappa^2-12\kappa+1=0$ 吐出 **$\varphi$** |
| **$N \to \infty$（平直微元极限）** | 多边形拉直圆周 / 切线欧拉折线追弧与实复利 | 半周长 $\to \pi$；切线折线 $(1+\hat{\mathbf{i}}\theta/N)^N \to e^{\hat{\mathbf{i}}\theta}$（$\theta \neq 0$ 时有限步 $\lvert z_N\rvert^2 > 1$），实复利 $(1+1/N)^N \to e$ | 改用有理凯莱 $Q(\boldsymbol{\sigma})$ 一步 $\lVert Q\rVert^2 \equiv 1$ | 有限 $N$ 留二阶矢高与 $\theta \neq 0$ 脱壳误差，极限吐出 **$\pi, e$** |

::: {.viz src="constant-free-rational-axiom-omega-sandbox" preset="tetrahedral-rational-cap-vs-phi" height="500"}
正四面体有理封顶对比五步黄金闭合卡（`tetrahedral-rational-cap-vs-phi`）：舞台同框对照六条大圆弧两两皆读有理数 `κ = 1/3` 的青色正四面体，以及赤道上默认停在无理根 $\kappa_1 = (\varphi + 1)/4$ 处恰好五步闭合的品红正五边形（舞台宽 $\ge 480\,\mathrm{px}$ 同时标出紫色五角星对角弦 `κ₂ = (2 − φ)/4` 与闭合标牌 `x₅ = x₀`；两者同为 $16\kappa^2 - 12\kappa + 1 = 0$ 的严格二周期无理共轭根）；拖动琥珀手柄偏离该无理根（除另一共轭根 $(2 - \varphi)/4$ 与静止态 $\kappa_1 = 1$ 外）即张开品红五步缺口。
:::

::: {.theorem #thm-ch39-rational-unit-simplex title="有理单位球面上的正则单形" lean="D5/S3/Combinatorics/Geometry/EuclideanSimplex/RationalUnitSimplex.rational_unit_simplex_iff"}
设 $d\ge 1$。在 $\mathbb Q^d$ 中，存在 $d+1$ 个互异单位向量，任意两个不同向量的内积都相同，当且仅当 $d,d+1$ 中的奇数是完全平方数。
:::

::: {.proof}
所有顶点的格拉姆矩阵奇异，故共同内积为 $-1/d$。任取 $d$ 个顶点作方阵的列，其格拉姆行列式为 $(1+1/d)^d/(d+1)$，必须是有理平方。去掉平方因子就得到上述条件。反向先将 $d+1$ 个坐标基向量平移到质心。若 $d$ 为奇数，在成对坐标上用有理相似变换调整长度，再用有理反射将单位法向移到坐标轴。若 $d$ 为偶数，先用有理反射去掉单位法向，再在四坐标块上用四元数乘法调整长度。完整证明由 Lean 内核检查。
:::

::: {.remark title="保留同一组读数需要几维"}
以下判据由文献的平方边长分类推出。设 $e$ 是将这个正则 $d$-单形以相同格拉姆矩阵实现于 $\mathbb Q^{d+e}$ 所需增加的最少坐标数，记 $S(m)$ 表示 $m$ 是两个整数平方之和。

| $d\bmod 4$ | 最少增加的坐标数 $e$ |
|---|---|
| $0$ | $d+1$ 为平方时 $0$，其余为 $1$ |
| $1$ | $d$ 为平方时 $0$。其余情形下，若 $S(d)$ 与 $S(d+1)$ 都成立则为 $1$，若只有 $S(d+1)$ 成立则为 $2$，若 $S(d+1)$ 不成立则为 $3$ |
| $2$ | $2$ |
| $3$ | $1$ |

有理正则单形平移至质心后，平方边长 $2(d+1)/d$ 恰好给出单位半径和内积 $-1/d$。将 $a=(d+1)/d$ 代入 Kominers 的分类。对 $d\equiv0\pmod4$，当 $d+1$ 非平方时，$a$ 是 $\sqrt{d+1}/(1+\sqrt{d+1})$ 的二次范数，因而余维一可行。对 $d\equiv2\pmod4$，余维一要求 $a$ 是从 $\mathbb Q(\sqrt{-(d+1)})$ 来的范数。如果 $d\equiv2\pmod8$，素数 $2$ 惰性且 $a$ 在 $2$ 处的赋值为奇数。如果 $d\equiv6\pmod8$，$d/2$ 有一个奇次出现的 $3\bmod4$ 素因子 $p$，而 $-(d+1)\equiv-1\pmod p$ 使该素数惰性。两种情形均排除余维一。

对 $d\equiv1\pmod4$，余维一要求 $a$ 是两个有理平方之和。由 $d,d+1$ 互素，这等价于 $S(d)$ 与 $S(d+1)$ 都成立。余维二只在 $-d$ 是局部平方的地方要求希尔伯特符号 $(a,-1)_p=1$。每个整除 $d+1$ 的奇素数都满足局部平方条件。若其中有奇次出现的 $3\bmod4$ 素因子，余维二就不可行。若 $S(d+1)$ 成立，该符号在所考察的奇素数处化为 $(-1,-1)_p=1$。在 $2$ 处，$-d\equiv3\pmod4$ 排除了局部平方条件。见 [Kominers，定理 1](https://arxiv.org/abs/2605.12268v1)。

大圆正三角形与正四面体都需要四个有理坐标才能保留各自的读数。正三角形可以取 $(1,0,0,0)$ 与 $(-1,\pm1,\pm1,\pm1)/2$ 中后三个符号相同的两个向量。五维正则单形则需要八个有理坐标。
:::

对任意三个单位向量，可以用同样的方式先固定一个坐标轴。三个内积 $a,b,c$ 所组成的单位对角格拉姆矩阵的行列式为 $\Delta=1+2abc-a^2-b^2-c^2$。

::: {.theorem #thm-ch39-rational-unit-triple-gram title="三个单位向量的五坐标判据" lean="D5/S3/Quantum/AURICOmega/RationalUnitTripleGram.rationalFiveCoordinateUnitTriple"}
设 $a,b,c\in\mathbb Q$，且 $a^2,b^2\le1$。存在三个 $\mathbb Q^5$ 中的单位向量 $u,v,w$，满足 $u\cdot v=a$、$u\cdot w=b$、$v\cdot w=c$，当且仅当 $\Delta$ 是三个有理数的平方和。
:::

::: {.proof}
用有理等距变换将 $u$ 移到第一坐标轴。$v,w$ 的首坐标便是 $a,b$，剩余四个坐标分别记作四元数 $x,y$。其平方范数是 $1-a^2,1-b^2$，而 $\bar x y$ 的实部为 $c-ab$。先将 $x,y$ 清分母，再用 OmegaMath 的整数四元数恒等式。$\Delta=(1-a^2)(1-b^2)-(c-ab)^2$ 是 $\bar x y$ 的三个虚坐标的平方和。反过来，由四平方定理构造 $x$。将三平方分解用作 $\bar x y$ 的虚部，左乘 $(\bar x)^{-1}$ 即可在 $x\ne0$ 时解出 $y$。若 $x=0$，行列式条件迫使 $c-ab=0$，此时用四平方定理直接构造 $y$。完整证明由 Lean 内核检查。
:::

当 $\Delta>0$ 时，去掉已知的首坐标，五坐标判据归结为正定二元二次型能否写成四个有理线性式的平方和。这是 Mordell 四平方判据的有理形式。 [Hunsucker，§1](https://doi.org/10.4064/aa-19-4-321-325)

例如，取 $a=b=0$、$c=3/4$，则 $\Delta=7/16$。若它是三个有理平方之和，放大各坐标四倍并清分母，就得到 $7D^2=X^2+Y^2+Z^2$。当 $D$ 是偶数时，模 $4$ 迫使 $X,Y,Z$ 也都是偶数，故可反复约去公因子 $2$。当 $D$ 是奇数时，等式左侧模 $8$ 余 $7$，而三个平方的余数各在 $\{0,1,4\}$ 中，其和无法模 $8$ 余 $7$。这组读数至少需要六个有理坐标，六坐标的见证为 $e_1,e_2,(0,3/4,1/2,1/4,1/4,1/4)$。

一般的有限组读数由有理半正定矩阵 $G$ 给出。设 $G$ 的对角元全为 $1$，秩为 $r\ge1$。将双线性型 $(x,y)\mapsto x^{\mathsf T}Gy$ 的零空间商掉，得到 $r$ 维正定有理型 $q$。原坐标基的像仍是单位向量，其格拉姆矩阵为 $G$。因此实现这组读数，等价于把 $q$ 等距嵌入有理欧氏空间。

任意秩 $r\ge2$ 的读数至多需要 $r+3$ 个有理坐标。取 $q$ 的有理正交基，记其平方长度为 $d_1,\ldots,d_r>0$。在 $\mathbb Q^{r+3}$ 中逐个构造相同长度的正交向量。当已构造 $k<r$ 个向量时，正交补 $W$ 的维数至少为 $4$。在 $W\oplus\mathbb Q$ 上，二次型 $w\cdot w-d_{k+1}s^2$ 至少有五个变量且不定。Meyer 定理给出一个非零有理零点。正定性迫使 $s\ne0$，故 $w/s$ 就是下一条所需的正交向量。秩一时，各单位向量沿同一条轴，坐标可取 $\pm1$。 [Meyer 定理的局部与整体依据，Chan 定理 3.5 与 4.2](https://wkchan.faculty.wesleyan.edu/files/2019/04/qflecturenotes.pdf)

对每个 $r\ge2$，上界都能取到。先给 $r-1$ 个正交单位向量，最后一个单位向量与第一根轴的内积为 $3/4$，与其余各轴的内积均为零。它在正交补中的平方长度为 $7/16$，所以读数的秩为 $r$。若总共只有 $r+2$ 个坐标，可逐次用有理反射将前 $r-1$ 个向量送到坐标轴，留下三维正交补。上面的模 $8$ 障碍排除在这个正交补中实现 $7/16$。三点例子正是 $r=3$ 的情形。

要检验某一组读数是否只需 $r+2$ 个坐标，设 $q$ 的行列式平方类为 $d>0$，并用 $c_p(q)=\prod_{i<j}(d_i,d_j)_p$ 表示其在素数 $p$ 处的 Hasse 不变量，其中 $(\cdot,\cdot)_p$ 是希尔伯特符号。二维正交补的行列式平方类只能是 $d$。因此所需的二维型可写成 $\langle x,d/x\rangle$，其局部 Hasse 不变量为 $(x,-d)_p$。由正交和公式，该符号须等于 $c_p(q)(d,-1)_p$。这些目标符号只有有限个为 $-1$，且由互反律知其乘积为 $1$。在实处要求符号为 $1$，从而选得 $x>0$。由指定希尔伯特符号的存在定理和有理二次型分类可知，恰当且仅当每个使 $-d$ 在 $\mathbb Q_p$ 中为平方的素数 $p$ 都满足 $c_p(q)(d,-1)_p=1$ 时，才能用 $r+2$ 个坐标实现。 [Kominers，§3.2 与 §3.4](https://arxiv.org/abs/2605.12268v1)

奇素数障碍在秩四时已经出现。

::: {.theorem #thm-ch39-rational-gram-odd-prime title="恰需七个有理坐标的秩四格拉姆矩阵" lean="D5/S3/Quantum/AURICOmega/RationalGramOddPrime.realizable_iff"}
设一个有理格拉姆矩阵的对角元全为 $1$，上三角非对角元按行依次为 $-1/3,-1/2,-1/2,1/6,1/6,1/4$。这个矩阵可由 $\mathbb Q^n$ 中的四个单位向量实现，当且仅当 $n\ge7$。
:::

取 $q=\langle1,2,3,3\rangle$，用 $e_0$ 以及各个 $\frac{1-d_i}{1+d_i}e_0+\frac{2}{1+d_i}e_i$ 作单位基，其中 $(d_1,d_2,d_3)=(2,3,3)$。这些向量的格拉姆矩阵有理且对角元全为 $1$。这里 $d=18$。$-18$ 的 $2$-进赋值是奇数，故 $2$ 处的平方条件不触发判据。在 $3$ 处，$-18$ 是平方，因为 $-2$ 是模 $3$ 的非零平方并可提升。此时 $(18,-1)_3=1$，但 $c_3(q)=(2,3)_3^2(3,3)_3=-1$。所以这组读数需要七个有理坐标。其格拉姆行列式为 $18(1/6)^2=1/2$。同样的行列式也出现在 $e_1,e_2,e_3,(1/2,1/2,0,1/2,1/2)$ 的格拉姆矩阵中。这一组只需五个坐标，且四坐标实现会使格拉姆行列式成为有理平方。

## 32.5.4 形式化锚点、经典文献边界与纯有理无常数对账 {#sec-ch39-29-4}

我们将支撑本节“母公理无常数有理骨架、切比雪夫整系数倍增律与三类平直近似残差下界”的十五项冻结定理汇总于如下锚点定理盒：

::: {.theorem #thm-ch39-constant-free-rational-axiom-omega-anchors title="无常数三元比较同构、子群完备化闭集判据、四元数流群切比雪夫递推、三锚行列式、倍角周期度规、有理逆级数、累计矢高夹逼、指数截断尾界、凯莱单位圆判据、黄金不动点—卡西尼—赫尔维茨界与球面闭链正合定理" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.subgroupModel_readingComplete_iff,D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.exists_subgroupModel_not_readingComplete,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula,D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays,D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint,D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds,D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique,D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm,D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact"}
在所钉 `trureturing` 冻结声明集中，以下十五项关于无常数三元比较结构、切比雪夫圆弧递推与平直/离散逼近残差的数学命题同时成立：

1. **无常数三元比较四元数同构、弦距读数恒等式与子群完备化闭集判据**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)、[`subgroupModel_readingComplete_iff`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.subgroupModel_readingComplete_iff)、[`exists_subgroupModel_not_readingComplete`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.exists_subgroupModel_not_readingComplete)）：非交换、链连通、触零、读数完备且读数可在 $\mathbb{R}^5$ 中实现的三元比较结构 $(M, [-,-,-], \kappa)$ 对任一基点 $o \in M$ 存在保迁移与读数的双射 $u : M \to \mathrm{Sp}(1)$（$u(o)=1$，$\kappa(x,y) = \frac{1+\langle u(x),u(y)\rangle}{2}$），单位四元数读数恒满足 $\kappa_{\mathbb{H}}(p, q) = 1 - \frac{\lVert p - q\rVert^2}{4}$；$\mathrm{Sp}(1)$ 的任一子群 $H$ 诱导的三元比较结构读数完备当且仅当 $H$ 在 $\mathrm{Sp}(1)$ 中为闭集，且存在可数稠密子群满足非交换、链连通、触零与 $\mathbb{R}^5$ 读数实现而不满足读数完备；
2. **四元数流群递推的切比雪夫多项式等价定理与三锚格拉姆行列式公式**（[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)）：对任意四元数序列 $x : \mathbb{N} \to \mathbb{H}$，初值归一且满足无源流群递推 $\operatorname{normSq}(x_0) = 1 \land \operatorname{normSq}(x_1) = 1 \land (\forall n,\ x_{n+2} = x_{n+1}\operatorname{star}(x_n)x_{n+1})$，**当且仅当**对一切 $n \in \mathbb{N}$ 有 $\operatorname{normSq}(x_n) = 1$、$x_{n+1} = U_n(\langle x_0, x_1\rangle_{\mathbb{R}})\,x_1 - U_{n-1}(\langle x_0, x_1\rangle_{\mathbb{R}})\,x_0$ 且 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(\langle x_0, x_1\rangle_{\mathbb{R}})$（其中 $T_n, U_n$ 为实第一、二类切比雪夫多项式，$n = 0$ 时约定 $U_{-1} = 0$）；实内积空间三向量格拉姆行列式恒满足 $\det G(u,v,w) = \lVert u\rVert^2\lVert v\rVert^2\lVert w\rVert^2 + 2\langle u,v\rangle\langle u,w\rangle\langle v,w\rangle - \lVert u\rVert^2\langle v,w\rangle^2 - \lVert v\rVert^2\langle u,w\rangle^2 - \lVert w\rVert^2\langle u,v\rangle^2$；
3. **平直切射线倍角周期度规分类与道蒂不动点有理逆幂级数**（[`comparison_classification_of_continuous_rays`](lean:D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays)、[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）：在有限维（因而完备的）实赋范代数 $A$ 中，设 $L \subseteq A$ 为对换位子 $[X,Y]=XY-YX$ 封闭的实线性子空间，$G \le A^\times$ 为满足 $\exp(L) \subseteq G$ 且 $\forall g \in G,\; g L g^{-1} \subseteq L$ 的可逆元子群，若 $\varphi : G \to \mathbb{R}$ 满足有界性 $0 \le \varphi(g) \le 1$、忠实性 $\varphi(g)=1 \iff g=1$、倍角律 $\varphi(g^2) = (2\varphi(g)-1)^2$、共轭不变性 $\varphi(kgk^{-1})=\varphi(g)$ 且对一切 $X \in L$ 沿切射线 $t \mapsto \varphi(\exp tX)$ 连续，则存在 $L$ 上的对称实双线性型 $h$，使：(i) 对一切 $X \in L$，$h(X,X) \ge 0$ 且 $h(X,X)=0 \implies X=0$；(ii) 对一切 $t \in \mathbb{R},\; X \in L$，$\varphi(\exp tX) = \cos^2\bigl(t\sqrt{h(X,X)/2}\bigr)$；(iii) 对一切 $t \in \mathbb{R},\; X \in L$，$\exp(tX) = 1 \iff \exists n \in \mathbb{Z},\; t\sqrt{h(X,X)/2} = n\pi$；(iv) 若 $X, Y \in L$ 满足 $[X,Y] = 0$，则 $X = 0$ 或存在 $c \in \mathbb{R}$ 使 $Y = cX$；(v) 对一切 $C, X, Y \in L$，$h([C,X],Y) + h(X,[C,Y]) = 0$；(vi) $\dim_{\mathbb{R}} L \in \{0, 1, 3\}$；(vii) 若 $\dim_{\mathbb{R}} L = 3$，则存在 $L$ 的 $h$-标准正交基 $b_0, b_1, b_2$（$h(b_i,b_j)=\delta_{ij}$）与实数 $\mu > 0$，使 $[b_0,b_1]=\mu b_2,\; [b_1,b_2]=\mu b_0,\; [b_2,b_0]=\mu b_1$；(viii) 每个非零 $X \in L$ 存在正周期 $T > 0$ 使对一切 $t \in \mathbb{R}$ 有 $\exp(tX) = 1 \iff \exists k \in \mathbb{Z},\; t = kT$，且 $h(X,X) = \frac{2\pi^2}{T^2}$；正实轴唯一满足 $\cos\theta = \theta$ 的不动点 $\theta \in (0, 1)$ 由有理系数形式逆幂级数 `inverse` 的系数乘 $\pi^n$ 绝对可和地收敛给出；
4. **有限步累计矢高双侧多项式夹逼、赋范代数指数泰勒尾界、凯莱单位圆临界线判据、黄金自指唯一正根与卡西尼—赫尔维茨残差界及球面旋转系统闭链正合**（[`accumulated_sagitta_bounds`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds)、[`exp_remainder_le`](lean:D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le)、[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)、[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)、[`golden_hurwitz_bound`](lean:D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound)、[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)）：对一切实数 $\sigma, T, \alpha \in \mathbb{R}$ 与自然数 $N \in \mathbb{N}$，记等步角 $\theta_N = \sigma\cdot\operatorname{rpow}(T/N, \alpha)$（其中 $T/N$ 与 $\operatorname{rpow}$ 按 Lean 全函数实数除法 $T/0 = 0$ 及 `Real.rpow` 约定取值；当 $N \ge 1$ 且 $T > 0$ 时即普通实幂 $\sigma(T/N)^\alpha$），累计正矢 $N(1-\cos\theta_N)$ 夹在 $N(\theta_N^2/2 - \theta_N^4/24)$ 与 $N\theta_N^2/2$ 之间；带单位元赋范（`NormOneClass`）的完备实赋范代数中 $0 \le r < n+1$ 且 $\lVert x\rVert \le r$ 时指数级数前 $n$ 项截断误差满足 $\bigl\lVert\exp x - \sum_{k=0}^{n-1}\frac{x^k}{k!}\bigr\rVert \le \frac{r^n/n!}{1 - r/(n+1)}$；复平面凯莱分式 $\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$（含 $s=0$ 处按 Lean 全函数除法取 $0$ 的约定）满足 $\lVert\operatorname{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；映射 $x \mapsto 1 + 1/x$ 在 $x > 0$ 上唯一不动点为 $\varphi = \frac{1+\sqrt{5}}{2}$，斐波那契序列满足卡西尼恒等式 $F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1}$，任意有理数 $q \in \mathbb{Q}$ 满足严格无理排斥界 $\frac{1}{\sqrt{5}\,q.\mathrm{den}^2 + q.\mathrm{den}} < \lvert\varphi - q\rvert$；且连通非空有向边有限简单图上的球面旋转系统（$V - E + F = 2$）在 $\mathbb{Z}_2$（`ZMod 2`）系数下面边界算子满足 $(\partial x)(e) = x(\operatorname{face}(d)) + x(\operatorname{face}(d^{\mathrm{symm}}))$、其核恰为常值面标号且值域精确等于简单闭链空间。
:::

::: proof
第 1 款由秩五嵌入单射左乘基点逆归一化后，利用 $\kappa_{\mathbb{H}}(p,q) = 1 - \lVert p - q\rVert^2/4$ 将读数柯西完备性转化为 $\mathrm{Sp}(1)$ 子群闭性，再由链连通非交换闭子群必等于 $\mathrm{Sp}(1)$ 得满射（见 [§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md) [@thm-ch39-axiom-omega-complete-rank-five-isomorphism]）。第 2 款利用四元数反射恒等式 $x\bar{w}x = 2\langle x,w\rangle_{\mathbb{R}}x - \lVert x\rVert^2 w$ 与干涉等式证明相邻内积守恒 $\langle x_n, x_{n+1}\rangle_{\mathbb{R}} = c := \langle x_0, x_1\rangle_{\mathbb{R}}$，从而流群三次递推化为常系数线性二阶递推 $x_{n+2} = 2c\,x_{n+1} - x_n$，归纳匹配第二类切比雪夫多项式 $U_n(c)$，再与 $x_0$ 取内积由 $c\,U_{n-1}(c) - U_{n-2}(c) = T_n(c)$ 得双向充要等价；三锚行列式直接展开 $3\times 3$ 实格拉姆矩阵。第 3 款见 [@thm-ch39-axiom-omega-duplication-infinitesimal-classification] 与 [§24.6](ch24-s06-inverse-series-and-kepler.md) [@thm-dottie-rational-inverse-endpoint]。第 4 款分别由余弦二阶/四阶泰勒不等式、阶乘比几何级数控尾、凯莱分式在 $s=0$ 直接核验与 $s\neq 0$ 处 $\lVert(s-1)/s\rVert^2 - 1 = (1 - 2\operatorname{Re}s)/\lvert s\rvert^2$、二次方程 $(x-\varphi)(x+\varphi-1)=0$、黄金整数乘法范数 $\operatorname{norm}(\phi^{n+1}) = (-1)^{n+1}$、二次型整数非零下界 $\lvert q.\mathrm{num}^2 - q.\mathrm{num}\cdot q.\mathrm{den} - q.\mathrm{den}^2\rvert \ge 1$ 与球面欧拉示性数维数计数给出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-constant-free-archimedes-schwarz-niven-literature title="阿基米德割圆、施瓦茨灯笼、林德曼—魏尔斯特拉斯超越性与尼文有理余弦定理文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为严守三层认识论边界，我们将本节援引的外部经典几何与数论结果与上文 `LEAN ✓` 内核定理明确区分如下：

1. **阿基米德正多边形夹逼与圆周率超越性**：阿基米德在《圆的度量》（*Measurement of a Circle*）中以正 $96$ 边形内接与外切周长给出 $3 + \frac{10}{71} < \pi < 3 + \frac{1}{7}$；$e$ 与 $\pi$ 的超越性分别由 C. Hermite（*C. R. Acad. Sci. Paris* **77**, 18–24, 1873）与 F. Lindemann（*Math. Ann.* **20**, 213–225, 1882）证出，一般非零代数数指数线性无关的林德曼—魏尔斯特拉斯定理由 K. Weierstrass（1885）完成；
2. **施瓦茨灯笼反例与多面体曲率测度收敛条件**：无内角下界控制的内接平直三角剖分面积异常膨胀与法向不收敛反例见 H. A. Schwarz（1880 致 Genocchi 通信；*Gesammelte Mathematische Abhandlungen*, Vol. 2, pp. 309–311, Springer, 1890）；在一致肥厚性（形状正则）与适定分片平直逼近条件下利普希茨—基灵高斯曲率测度在 $N \to \infty$ 极限下的弱收敛定理见 J. Cheeger, W. Müller & R. Schrader（*Comm. Math. Phys.* **92**, 405–454, 1984），单叶法向投影形状正则三角网格上的面积与法向收敛综述见 J.-M. Morvan（*Generalized Curvatures*, Springer, 2008）——这与本节“任何有限 $N$ 球面拓扑凸多面体皆留零曲率开面、顶点 $4\pi$ 角亏奇点与直棱外在二面折痕，唯有无穷极限才生出 $\pi$”完全一致；
3. **尼文定理与分圆有理余弦完整分类**：有理度数（即圆周有理分点 $\theta/\pi \in \mathbb{Q}$）满足 $\cos\theta \in \mathbb{Q}$（等价于 $\kappa = \frac{1+\cos\theta}{2} \in \mathbb{Q}$）当且仅当 $\cos\theta \in \{0, \pm\frac{1}{2}, \pm 1\}$（对应正 $N$ 边形 $N \in \{1, 2, 3, 4, 6\}$，$\kappa \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{4}, 0\}$），见 I. Niven（*Irrational Numbers*, Carus Math. Monographs **11**, MAA, 1956, Corollary 3.12）。
:::

::: {.example #ex-ch39-constant-free-rational-quantitative-audit title="定量核验：割圆与施瓦茨灯笼残差、欧拉切线脱轨对比 1/25 有理凯莱一步驻球，以及 N = 1…5 有理到黄金比相变八位小数对账"}
我们对本节的三类平直近似残差与 $\mathrm{AXIOM}\text{-}\Omega$ 纯有理无常数运算做八位小数精确核验（`手工推导` / `NUM`）：

1. **$\pi$ 残差核验：正 $N$ 边形拉直夹逼与施瓦茨灯笼精确面积极限**：
   - 取 $N \in \{3, 6, 12, 60\}$，内接半周长 $p_N^{\mathrm{in}} = N\sin\frac{\pi}{N}$ 按八位小数依次为 $\mathbf{2.59807621}\text{（约）},\; \mathbf{3.00000000}\text{（精确）},\; \mathbf{3.10582854}\text{（约）},\; \mathbf{3.14015737}\text{（约）}$，外切半周长 $p_N^{\mathrm{out}} = N\tan\frac{\pi}{N}$ 依次约为 $\mathbf{5.19615242},\; \mathbf{3.46410162},\; \mathbf{3.21539031},\; \mathbf{3.14446676}$，严格为正的单边弦弧矢高 $s_N = 1 - \cos\frac{\pi}{N} > 0$ 依次为 $\mathbf{0.50000000}\text{（精确）}$ 及约 $\mathbf{0.13397460},\; \mathbf{0.03407417},\; \mathbf{0.00137047}$；
   - 在单位圆柱面（真侧面积 $2\pi \approx \mathbf{6.28318531}$）的施瓦茨灯笼网格上，代入精确面积式 $A_{m,n} = 2n\sin\frac{\pi}{n}\sqrt{1 + m^2(1-\cos\frac{\pi}{n})^2}$：取 $(n, m) = (12, 12)$ 得 $A_{12,12} \approx \mathbf{6.71086429}$；保持顶点贴近柱面而按 $m = n^2$ 加密至 $(12, 144)$ 与 $(24, 576)$，平直三角网格面积升至 $\mathbf{31.10515959}$ 与 $\mathbf{31.50298002}$，收敛向伪极限 $2\pi\sqrt{1 + \pi^4/4} \approx \mathbf{31.63649176}$（高达真面积的 $\mathbf{5.03510405}$ 倍）；若按 $m = n^3$ 加密（如 $n=12 \implies \mathbf{365.79618298}$，$n=24 \implies \mathbf{740.99487953}$），表面积更直接发散至 $+\infty$！
2. **$e$ 残差核验：平直欧拉切线步脱壳膨胀对比有理凯莱一步精确归一**：
   - 沿切向跨往对径态（目标 $\theta = \pi$）取有限欧拉步 $z_N(\pi) = (1 + \frac{\pi\hat{\mathbf{i}}}{N})^N$：对一切有限 $N \ge 1$，模方严格满足 $\lVert z_N(\pi)\rVert^2 = (1 + \frac{\pi^2}{N^2})^N > 1$，当 $N \in \{1, 4, 16, 64\}$ 时依次约为 $\mathbf{10.86960440},\; \mathbf{6.83406680},\; \mathbf{1.83172210},\; \mathbf{1.16652247}$（单位步 $\theta = 1$ 时亦满足 $\lVert z_N(1)\rVert^2 = (1 + \frac{1}{N^2})^N > 1$，四档值依次为精确值 $\mathbf{2.00000000}$ 及约 $\mathbf{1.27442932},\; \mathbf{1.06436486},\; \mathbf{1.01574577}$；实复利严格满足 $(1 + \frac{1}{N})^N < e$，其中 $e \approx \mathbf{2.71828183}$，四档值依次为精确值 $\mathbf{2.00000000},\; \mathbf{2.44140625}$ 及约 $\mathbf{2.63792850},\; \mathbf{2.69734495}$），每一步有限线性近似均刺破单位球；
   - 反之，取纯有理三维输入 $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\bigr) \in \mathbb{Q}^3$（$\lVert\boldsymbol{\sigma}\rVert^2 = \frac{7}{18}$），有理凯莱旋子一步给出精确分数四元数

     $$
     Q\!\left(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\right) \;=\; \frac{11\mathbf{1} + 18\mathbf{i} + 12\mathbf{j} + 6\mathbf{k}}{25}, \qquad \lVert Q\rVert^2 \;=\; \frac{121 + 324 + 144 + 36}{625} \;=\; \frac{625}{625} \;=\; \mathbf{1.00000000},
     $$

     球壳脱轨残差恒等于 **$\mathbf{0.00000000}$**！相对 $\mathbf{1}$ 的原生保真度为精确有理数 $\kappa = \frac{1 + 11/25}{2} = \frac{18}{25} = \mathbf{0.72000000}$，再经整系数倍增律一步算出二拍保真度 $\kappa_2 = (2\times\frac{18}{25} - 1)^2 = \bigl(\frac{11}{25}\bigr)^2 = \frac{121}{625} = \mathbf{0.19360000}$！
3. **$N \le 4$ 典范有理地标到 $N = 5$ 黄金比涌现核验**：
   - $N = 1, 2, 3, 4$ 的典范对称地标保真度依次为精确有理数 $\mathbf{1.00000000}$、$\mathbf{0.50000000}$（对径 $\mathbf{0.00000000}$）、$\frac{1}{4} = \mathbf{0.25000000}$、$\frac{1}{3} \approx \mathbf{0.33333333}$（$N=4$ 唯一满秩等保真值）；
   - $N = 5$ 时，$\Delta E(5) = +1 > 0$，严格二周期本原因子 $16\kappa^2 - 12\kappa + 1 = 0$ 的双根精确落在 $\kappa(\frac{2\pi}{5}) = \frac{\varphi + 1}{4} \approx \mathbf{0.65450850}$ 与 $\kappa(\frac{4\pi}{5}) = \frac{2 - \varphi}{4} \approx \mathbf{0.09549150}$（精确代数求值互满足 $f_{\mathrm{arc}}\!\bigl(\frac{\varphi + 1}{4}\bigr) = \frac{2 - \varphi}{4} \approx \mathbf{0.09549150}$ 与 $f_{\mathrm{arc}}\!\bigl(\frac{2 - \varphi}{4}\bigr) = \frac{\varphi + 1}{4} \approx \mathbf{0.65450850}$），而 $12$ 顶点正二十面体的非对跖邻点与相隔顶点保真度落在 $\frac{\varphi + 2}{5} \approx \mathbf{0.72360680}$ 与 $\frac{3 - \varphi}{5} \approx \mathbf{0.27639320}$。
:::

::: {.viz src="constant-free-rational-axiom-omega-sandbox" preset="pure-axiom-omega-constant-free-sphere" height="500"}
无常数真球有理本相卡（`pure-axiom-omega-constant-free-sphere`）：默认停在淡出终点 $\lambda = 1.00$，光滑真球面上分布青色有理凯莱点 $Q(\boldsymbol{\sigma})$（顶栏标 $\lVert Q(\boldsymbol{\sigma})\rVert^2 = 1$）、银白起点 `1 = Q(0)`、三条青色有理保真纬圈 `κ = 1/2`、`κ = 1/3`、`κ = 1/4`，以及停在 $\boldsymbol{\sigma} = (-1, 1)$ 处的可拖琥珀探针 `Q(σ) = (−1/3, −2/3, 2/3)`（$\kappa(1, Q) = 1/3$）；点按 `⏮` 或回拨时间轴至 $\lambda = 0$ 可叠回青色与品红的平直近似脚手架对照。
:::

---

**拔去最后一根笛卡尔线性钉子，球本自圆，何须向直线借半个无穷小数？而在洗净一切超越常数之后，`AXIOM-Ω` 的动态运行语法更将进一步坍缩为最纯粹的三枚有理数——`0 · 1/2 · 1`。**

在下面的完整实验室里把剖分阶数 $N$ 推高、放大审视多面体边缘永远抹不平的直棱折痕与欧拉切线步步脱壳的品红尾流，再切回无常数真球本相凝视那串干干净净的有理分数 $\kappa \in \{1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, 0\}$，整座 $\mathrm{AXIOM}\text{-}\Omega$ 大厦便完成了彻底的概念提纯：线性只是局部切空间的一阶错觉，拿平直的尺子、平直的切线与过约束平面三角形去拼球，拼到无穷远也只得到一串叫作 $\pi$、$e$、$\varphi$ 的近似欠条；唯有把无原点的弯曲三元比较闭合直接立为无需向直线解释的原生起点，球才真正是球，关系才真正是场（而时间因果相与微分射流阶数向 **`0 · 1/2 · 1`** 的收束将在后文 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 压轴呈现）。接下来，让我们步入 [§32.6 精确结构数学对比平直度量近似](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md)，彻查为何数学对实相的描述可以是 $100\%$ 零截断误差的精确结构与有理星座。

::: {.viz src="constant-free-rational-axiom-omega-sandbox" height="620"}
完整实验室：在“无常数母公理 · 纯有理 $\kappa$ 账本”与“平直线性近似（MODEL 对照）· $\pi / e / \varphi$ 残差”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），巡览五张实验卡，调节平直步数 $N \in [3, 48]$、测地细分按钮 $\nu \in \{1, 2, 3, 4\}$（顶点数 $10\nu^2 + 2$，核验 $\mathbb{Z}_2$ 面边界秩 $F - 1$ 与 $\nu^2\cdot\text{最大角亏}$）、目标角 $\theta$、单步保真度 $\kappa_1$（含 6 枚有理快捷钮与斐波那契步 $F_{n+2}/(4F_n)$ 及共轭无理根快捷钮）、有理探针分量与淡出滑块 $\lambda \in [0, 1]$，在实时读数栏核对 225 个有理点（两分量绝对值 $\le 2$、公分母 $d \le 3$）的整数零余数、复利 $(1+1/N)^N < e$、不共线过约束计数 $\Delta E(4)=0,\;\Delta E(5)=1$、正二十面体非对跖保真度 $\{(\varphi+2)/5, (3-\varphi)/5\}$ 与道蒂有理级数部分和 `0.73908513`，并在两条对照小图中同步观察第一图沿 $N$ 的品红弓形矢高 $1 - \cos(\pi/N)$、紫色欧拉模方超出 $(1 + \theta^2/N^2)^N - 1$ 对比青色凯莱零误差基线 $\lvert\lVert Q\rVert^2 - 1\rvert = 0$，以及第二图沿 $\kappa_1$ 的青色倍增律 $\kappa_2 = (2\kappa_1 - 1)^2$、紫色三步律 $\kappa_3 = \kappa_1(4\kappa_1 - 3)^2$、青色有理格点与品红五边形共轭对。十五条冻结 `LEAN ✓` 声明、经典几何与数论 `ARGUED` 文献、`NUM` 实算及 `MODEL` 边界在依据栏与理论抽屉中分层列出。
:::
