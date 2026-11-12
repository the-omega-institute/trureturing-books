# 狭义相对论的几何脱魅：双曲旋转、光锥零线与时空面积

> *“我的直觉是,线是经典时间,面积是量子时间”*

在[第一部](ch01-measurement.md)的四章旅程里，我们把单量子比特从二维复列向量（四个实自由度参数）的代数迷雾中剥离出来，还原成了三维欧氏单位球面 $S^2 \subset \mathbb{R}^3$ 上的一根实方向箭头：两子相遇无需外部第 3 点 $C$（[第二章](ch02-born-rule.md)），幂等判别 $P^2 = P$ 将连续球面截成离散的“存在之线”与串行记录刻度（[第三章](ch03-projectors-and-duality.md)），而对环境自由度的偏迹遮蔽则让球皮上的单位长矛在局部子空间内投下截短的余弦内影（[第四章](ch04-decoherence.md)）。

现在，当我们迈入第五部“时空之球”，一个更深层的几何追问迎面而来：在二维欧氏平面 $(x, y)$ 内旋转坐标轴时，两根正交空间轴的平方和 $\Delta x^2 + \Delta y^2$ 永远守恒在一圈封闭的欧氏圆周上（在三维纯空间 $\mathbb{R}^3$ 的任意空间旋转下则是球面半径平方 $\Delta x^2 + \Delta y^2 + \Delta z^2$ 守恒）；为什么一旦在二维闵可夫斯基时空模型 $(t, x)$（或 $1+3$ 维闵可夫斯基时空 $(t, x, y, z)$）中把时间坐标 $t$ 与空间坐标 $x$ 放在一起比量，不随惯性参考系改变的却不再是加法平方和 $t^2 + x^2$，而是带了一个负号的减法二次型 $t^2 - x^2$（在 $1+d$ 维时空中为 $t^2 - \norm{w}^2$）？章首题记凝聚了作者关于时间几何的直觉起点：串行读出留下的单向轨迹是一条一维的“经典时间之线”，而由两个独立方向张开的二维双矢量平面则承载着相位与参考系偏转的“面积”维度。为了把这一物理直觉安放在严密的数学地基之上，本章将严格区分经 Lean 内核验证的代数与二次型刚性定理、文献中的时空克利福德旋转器表示，以及需要额外实验标定的物理尺度约定。

::: {.figure src="ch17-overview"}
**图 17。** 本章地图：第 I 栏，同一个事件 $(t, x) = (5, 3)$ 被转动时沿品红的圆 $t^2 + x^2 = 34$ 走、穿出白色虚线的光锥，被推动时沿青色的双曲线 $t^2 - x^2 = 16$ 走、贴着光锥却跨不过去；第 II 栏，以 $\beta = 3/5$ 运动的参考系的两根琥珀色坐标轴 $t'$、$x'$ 像剪刀一样向白色的光锥合拢，光锥本身不动；第 III 栏，从 $O$ 到 $P = (10, 0)$，原地静止的白色粗线被刻成 $10$ 段，经 $A = (5, 3)$ 折返的青色折线每段只刻 $4$ 段、共 $8$ 段。图中取 $c = 1$；物理单位制下每段固有时为 $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$。
:::

## 圆与双曲线：先区分度规 {#sec-euclidean-and-hyperbolic}

为什么初学者第一次面对狭义相对论的洛伦兹变换（Lorentz transformation）时，总觉得那些无处不在的根号 $\gamma = 1/\sqrt{1 - \beta^2}$ 像是一套生硬拼凑出来的代数补丁？根源在于，人们试图用习惯了欧氏正定度规（$++\dots+$）的圆规，去强行丈量一座不定号度规（$+-\dots-$）的闵可夫斯基（Minkowski）舞台。

让我们把桌面上的平面几何与二维时空几何并排摊开，做一次最透明的对账：

- **欧氏平面（度规符号 $+,+$）**：保持距离平方 $x^2 + y^2 = R^2$ 不变的等距轨迹是一只**封闭圆**。当你把参考系旋转一个夹角 $\theta \in \mathbb{R}$ 时，坐标按三角函数 $(x, y) \mapsto (x\cos\theta - y\sin\theta,\, x\sin\theta + y\cos\theta)$ 混合，背后依赖的唯一代数骨架是圆函数恒等式 $\cos^2\theta + \sin^2\theta = 1$。
- **闵可夫斯基平面（度规符号 $+,-$）**：保持时空间隔平方 $t^2 - x^2 = \tau^2$ 不变的等距轨迹不再是封闭的圆，而是一支向无穷远处张开的**双曲线**（hyperbola）。当你把惯性参考系沿空间轴加速、推偏一个**快度**（rapidity）参数 $r \in \mathbb{R}$ 时，时间与空间坐标按双曲函数同步剪刀式倾斜，其背后的代数骨架则是双曲余弦与双曲正弦的平方差恒等式。

::: {.viz src="rapidity-lightcone" preset="circle" height="500"}
**转动走圆，推动走双曲线。** 同一个事件 $v = (5, 3)$：品红的点被转动，沿品红的圆 $t^2 + x^2 = 34$ 走，很快穿出白色的光锥；青色的点被推动，沿青色的双曲线 $t^2 - x^2 = 16$ 走，贴着光锥却跨不过去（[@thm-hyperbolic-norm]）。
:::

在写出任何物理坐标变换之前，我们先在 Lean 的 `BogoliubovNormConservation` 模块中核实这条支撑一切双曲旋转与玻戈留波夫（Bogoliubov）压缩变换的实分析恒等式。

::: {.theorem #thm-hyperbolic-norm title="实双曲系数保范数" lean="D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation"}
对任意实数 $r \in \mathbb{R}$，双曲余弦 $\cosh r$ 与双曲正弦 $\sinh r$ 满足

$$
|\cosh r|^2 - |\sinh r|^2 = 1.
$$
:::

::: proof
对任意实数 $x \in \mathbb{R}$，绝对值的平方与实数自身的平方恒等（$|x|^2 = x^2$）。因此左端化为 $(\cosh r)^2 - (\sinh r)^2$。代入实指数定义 $\cosh r = \frac{e^r + e^{-r}}{2}$ 与 $\sinh r = \frac{e^r - e^{-r}}{2}$ 展开平方差：

$$
(\cosh r)^2 - (\sinh r)^2 = \frac{e^{2r} + 2 + e^{-2r}}{4} - \frac{e^{2r} - 2 + e^{-2r}}{4} = 1.
$$

Lean 声明 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) 先由 `sq_abs` 消去绝对值符号，再直接调用实双曲平方差引理 `Real.cosh_sq_sub_sinh_sq` 完成归约。完整证明由 Lean 内核检查。
:::

按照本书的三层认识论契约，我们必须看清 [@thm-hyperbolic-norm] 的精确边界：定理保留了源码中的绝对值记号 $|\cosh r|^2 - |\sinh r|^2 = 1$（为复双曲参数模平方守恒预留统一接口，在实数域上等价于 $\cosh^2 r - \sinh^2 r = 1$），但它本身只是一条纯粹的实双曲函数恒等式——它既不包含“光速在一切惯性系中恒定”的物理公设，也不自带动力学演化方程或旋量双覆盖群拓扑。

然而，一旦有了 [@thm-hyperbolic-norm] 这把代数钥匙，洛伦兹变换里所有看似笨拙的分数根号都会在有理算术下瞬间消融。让我们亲手算一个完全不需要计算器的整数比特例。

::: {.figure src="ch17-unit-hyperbola"}
**$\eta = \ln 2$ 落在单位双曲线的一个有理点上。** 青色的单位双曲线 $t^2 - x^2 = 1$ 上，琥珀色的点是 $(t, x) = (\cosh\eta, \sinh\eta) = (5/4, 3/4)$：两条虚线腿长 $5/4$ 与 $3/4$，平方差正好为 $1$（[@thm-hyperbolic-norm]）；从原点穿过它的琥珀色射线每升高 $5$ 横移 $3$，即 $\beta = 3/5$。白色虚线是光锥。
:::

::: {.example #ex-rapidity-three-fifths title="快度 η = ln 2 与 β = 3/5 的双曲旋转手算"}
采用自然单位制 $c = 1$，取快度参数 $\eta = \ln 2$。由于 $e^\eta = 2$ 且 $e^{-\eta} = \frac{1}{2}$，直接由定义算出双曲余弦、双曲正弦、无量纲速度 $\beta$ 与洛伦兹因子 $\gamma$：

$$
\cosh\eta = \frac{2 + 1/2}{2} = \frac{5}{4}, \qquad
\sinh\eta = \frac{2 - 1/2}{2} = \frac{3}{4}, \qquad
\beta = \tanh\eta = \frac{\sinh\eta}{\cosh\eta} = \frac{3}{5}, \qquad
\gamma = \cosh\eta = \frac{5}{4}.
$$

首先核对 [@thm-hyperbolic-norm]：

$$
|\cosh\eta|^2 - |\sinh\eta|^2 = \left(\frac{5}{4}\right)^2 - \left(\frac{3}{4}\right)^2 = \frac{25 - 9}{16} = \frac{16}{16} = 1.
$$

现在写出沿空间正向以速度 $\beta = 3/5$ 运动的参考系双曲变换矩阵 $B$，并将它作用于实验室中的类时事件 $v = (5, 3)^\top$：

$$
B = \begin{pmatrix} \cosh\eta & -\sinh\eta \\ -\sinh\eta & \cosh\eta \end{pmatrix} = \begin{pmatrix} 5/4 & -3/4 \\ -3/4 & 5/4 \end{pmatrix}, \qquad
Bv = \begin{pmatrix} 5/4 & -3/4 \\ -3/4 & 5/4 \end{pmatrix}\begin{pmatrix} 5 \\ 3 \end{pmatrix} = \begin{pmatrix} 16/4 \\ 0 \end{pmatrix} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}.
$$

在原坐标系中，事件 $v = (5, 3)^\top$ 的闵可夫斯基二次型间隔为 $t^2 - x^2 = 5^2 - 3^2 = 25 - 9 = 16$；在双曲变换后的共动坐标 $(4, 0)^\top$ 中，空间位移归零，间隔化为纯粹的共动固有时平方 $\tau^2 = 4^2 - 0^2 = 16$，从而固有时恰为 $\tau = 4$！

在部分物理教材中，常有人引入辅助角 $\theta \in (-\pi/2, \pi/2)$ 并令 $\sin\theta = \beta = 3/5$，从而写出 $\cos\theta = \sqrt{1 - \beta^2} = 1/\gamma = 4/5$。需要严格说明的是：这种三角代换仅仅是利用 $|\beta| < 1$ 对速度参数所作的代数重写，绝不意味着可以把保持 $t^2 - x^2$ 不变的闵可夫斯基双曲变换误认作保持 $t^2 + x^2$ 不变的欧氏圆旋转。
:::

::: {.viz src="rapidity-lightcone" preset="boost" height="500"}
**η = ln 2 把 (5, 3) 推到 (4, 0)。** 琥珀色的两根轴是以快度 $\eta$ 运动的旅行者的 $t'$、$x'$ 轴，像剪刀一样向光锥合拢，灰色虚线是原来的 $t$、$x$ 轴；到 $\eta = \ln 2$（$\beta = 3/5$）时，$t'$ 轴正好穿过灰圈里的原事件 $v = (5, 3)$。琥珀色的点 $Bv$ 是 $v$ 在旅行者坐标里的读数，沿青色双曲线 $\tau = 4$ 滑到时间轴上的 $(4, 0)$，这时 $\cosh\eta = 5/4$、$\sinh\eta = 3/4$。
:::

## 光锥零线与空间限制 {#sec-null-cone-rigidity}

在 [@ex-rapidity-three-fifths] 中，我们预设了时空间隔采用二次型 $t^2 - x^2$。但从谱系学视角追问：为什么时空几何的核心刻度非得写成 $t^2 - \norm{w}^2$ 不可？如果宇宙只告诉我们“哪些位移属于以极限速率传播的光锥零线（null cone）”，这一条零线约束究竟能锁死多少几何结构？

在 Lean 的 `MinkowskiNullConeRigidity` 模块中，$1 + d$ 维实数时空被定义为乘积空间

$$
\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d),
$$

即由 $1$ 个实时间坐标 $t \in \mathbb{R}$ 与 $d$ 个实欧氏空间坐标 $w \in \mathbb{R}^d$ 组成的实向量空间（其中空间维数 $d \in \mathbb{N}$ 可取任意自然数，包括纯时间情形 $d = 0$）。在该空间上，标准闵可夫斯基二次型 `minkowski` 取符号约定 $(1, d)$（在纯时间轴单位向量 $e_0 = (1, 0)$ 上取正值 $+1$）：

$$
\operatorname{minkowski}_d(t, w) = t^2 - \norm{w}^2.
$$

::: {.figure src="ch17-interval-signs"}
**光锥把平面分成锥内与锥外。** 取 $d = 1$：淡青色的锥内 $q = \operatorname{minkowski}_1(t, x) = t^2 - x^2 > 0$，淡品红的锥外 $q < 0$，白色的光锥线上 $q = 0$。三支箭头按 $(t, x)$ 读数：青色的 $(2, 1)$ 得 $3$，品红的 $(1, 2)$ 得 $-3$，沿光锥的白色 $(1.5, 1.5)$ 得 $0$。
:::

与此同时，对任意实二次型 $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$，Mathlib 定义其关联的极化双线性映射（`QuadraticMap.polar`）为不带 $\frac{1}{2}$ 因子的差分：

$$
\operatorname{polar}_S(x, y) = S(x + y) - S(x) - S(y).
$$

下面的引理证明了一个令人赞叹的刚性事实：只要一个未知的实二次型 $S$ 在闵可夫斯基光锥零集 $\{v \mid \operatorname{minkowski}_d(v) = 0\}$ 上恒取零值，它不仅被迫使时间轴 $(1, 0)$ 与任意空间位移 $(0, w)$ 保持极化正交，而且它在纯空间切片上的取值 $S(0, w)$ 也被时间轴单点值 $S(1, 0)$ 与欧氏范数平方 $-\norm{w}^2$ 唯一锁定！

::: {.lemma #lemma-null-cone-spatial title="零锥决定空间限制" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity"}
设 $d \in \mathbb{N}$ 为任意自然数（包含 $d = 0$），$S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ 为 $\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ 上的实二次型。若对所有时空向量 $v \in \operatorname{Space}(d)$，

$$
\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0,
$$

则对任意空间向量 $w \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$，同时成立：

$$
S(0, w) = -S(1, 0)\norm{w}^2 \qquad\text{且}\qquad \operatorname{polar}_S\bigl((1, 0),\, (0, w)\bigr) = 0.
$$
:::

::: proof
任取空间向量 $w \in \mathbb{R}^d$。沿未来与过去光锥方向构造两条零向量 $v_+ = (\norm{w}, w)$ 与 $v_- = (-\norm{w}, w)$。由定义直接计算它们的闵可夫斯基二次型：

$$
\operatorname{minkowski}_d(\pm\norm{w}, w) = (\pm\norm{w})^2 - \norm{w}^2 = 0.
$$

由零锥消失假设 `hnull` 知 $S(v_+) = 0$ 且 $S(v_-) = 0$。注意到 $v_{\pm} = (\pm\norm{w})(1, 0) + (0, w)$，利用二次型对标量乘法的二次齐次性以及极化展开恒等式 $S(ax + y) = a^2 S(x) + S(y) + a\operatorname{polar}_S(x, y)$，得到两条方程：

$$
\begin{aligned}
\norm{w}^2 S(1, 0) + S(0, w) + \norm{w}\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) &= 0, \\
\norm{w}^2 S(1, 0) + S(0, w) - \norm{w}\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) &= 0.
\end{aligned}
$$

将两式相加并除以 $2$，立得 $S(0, w) = -S(1, 0)\norm{w}^2$；将两式相减则得 $2\norm{w}\operatorname{polar}_S((1, 0), (0, w)) = 0$。当 $\norm{w} \neq 0$ 时消去非零实因子 $2\norm{w}$ 即得 $\operatorname{polar}_S((1, 0), (0, w)) = 0$；当 $\norm{w} = 0$ 时 $w = 0$，极化映射在零向量处自动取 $0$。完整证明由 Lean 内核检查。
:::

请细读 [@lemma-null-cone-spatial] 的证明机制：为什么光锥这一圈“零值边界”能够反过来管住纯空间向量 $(0, w)$？因为任何一根空间向量 $w$，只要在时间方向上垫起与之等长的光程 $\pm\norm{w}$，就会精确踩在未来光锥 $(\norm{w}, w)$ 与过去光锥 $(-\norm{w}, w)$ 这两条零线上！未来与过去两条零线的对称加减，就如同一把双向卡尺，将时空交叉项 $\operatorname{polar}_S((1,0),(0,w))$ 夹死为 $0$，并把空间度规强行绑定在时间刻度 $S(1,0)$ 的相反数上。

::: {.viz src="rapidity-lightcone" preset="caliper" height="500"}
**零线卡尺。** 琥珀色的空间位移 $(0, w)$ 向上、向下各垫起 $|w|$，两支白色箭头 $(\pm|w|, w)$ 正好落在未来与过去的光锥线上，$t^2 - x^2 = 0$；虚线菱形的两条对角线是 $2(0, w)$ 与 $2|w|(1, 0)$（[@lemma-null-cone-spatial]）。
:::

## 洛伦兹变换与尺度归一化 {#sec-lorentz-normalization}

一旦空间限制 $S(0, w)$ 与时空交叉极化 $\operatorname{polar}_S((1, 0), (0, w))$ 均由 [@lemma-null-cone-spatial] 锁定，任意一般时空向量 $v = (t, w) = t(1, 0) + (0, w)$ 上的二次型取值便不再有任何自由逃逸的余地。

::: {.proposition #prop-null-cone-rigidity title="零锥决定二次型" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null"}
设 $d \in \mathbb{N}$ 为任意自然数，$S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ 为实二次型。若对所有 $v \in \operatorname{Space}(d)$ 均有 $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则作为 $\operatorname{Space}(d)$ 上的二次型，恒有

$$
S = S(1, 0) \cdot \operatorname{minkowski}_d.
$$
:::

::: proof
对任意时空向量 $v = (t, w) \in \operatorname{Space}(d)$，将其分解为时间分量与空间分量之和 $(t, w) = t(1, 0) + (0, w)$。利用二次型的极化展开式以及 [@lemma-null-cone-spatial] 的两项结论，逐项归约：

$$
\begin{aligned}
S(t, w) &= S\bigl(t(1, 0) + (0, w)\bigr) \\
&= t^2 S(1, 0) + S(0, w) + t\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) \\
&= t^2 S(1, 0) - S(1, 0)\norm{w}^2 + t \cdot 0 \\
&= S(1, 0)\bigl(t^2 - \norm{w}^2\bigr) = S(1, 0)\operatorname{minkowski}_d(t, w).
\end{aligned}
$$

由二次型的外延相等性（`QuadraticForm.ext`），即得 $S = S(1, 0) \cdot \operatorname{minkowski}_d$。完整证明由 Lean 内核检查。
:::

在将 [@prop-null-cone-rigidity] 应用于狭义相对论时，我们必须严守定理的前提与结论边界：

1. **比例因子 $S(1, 0)$ 的任意性**：[@prop-null-cone-rigidity] 只保证 $S$ 是标准闵可夫斯基二次型的标量倍 $S(1, 0)\cdot\operatorname{minkowski}_d$，其中实数 $S(1, 0)$ 完全可以是正数、零或负数（例如零二次型 $S = 0$ 或反号二次型 $S = -\operatorname{minkowski}_d$ 同样满足在零锥上消失）。未加额外条件前，绝不能自行宣称比例因子等于 $1$ 或必为正数，定理也不包含惯性系物理定义、空间定向或时间箭头定向假设。
2. **从零锥保持到洛伦兹保距的两步分离**：设 $B : \operatorname{Space}(d) \to \operatorname{Space}(d)$ 为线性变换，定义拉回二次型 $S(v) = \operatorname{minkowski}_d(Bv)$。若 $B$ 保持光锥零线（即 $\operatorname{minkowski}_d(v) = 0 \implies \operatorname{minkowski}_d(Bv) = 0$），则 [@prop-null-cone-rigidity] 给出保形比例关系

$$
\operatorname{minkowski}_d(Bv) = \operatorname{minkowski}_d(Be_0)\cdot\operatorname{minkowski}_d(v).
$$

::: {.viz src="rapidity-lightcone" preset="cone" height="500"}
**推动下光锥不动。** $\eta$ 从 $-0.6$ 扫到 $1$：白色珠子只沿白色光锥滑动，右边一串挤向原点、左边一串散开，没有一颗离开这两条线；空心的淡白珠子是 $\eta = -0.6$ 与 $\eta = 0$ 时它们的位置。琥珀色的点沿青色双曲线走。
:::

要想由此推出严格的洛伦兹间隔不变性 $\operatorname{minkowski}_d(Bv) = \operatorname{minkowski}_d(v)$，必须**额外独立施加尺度归一化条件** $\operatorname{minkowski}_d(Be_0) = 1$（在物理上对应于运动方向垂直横尺的长度标定或标准原子钟单位固有时的归一化）。

::: {.viz src="rapidity-lightcone" preset="scale" height="500"}
**乘上比例 k：光锥保住，刻度没保住。** $k = 1.5$、$\eta = \ln 2$：白色珠子仍在光锥上，琥珀色的点却从青色的 $\tau = 4$ 落到青色虚线 $\tau = 6$ 上，$t'$ 轴上的单位刻度落在青色细虚线 $\tau = 1.5$ 上；差的正是因子 $\operatorname{minkowski}_1(kBe_0) = k^2$（[@prop-null-cone-rigidity]）。
:::

> 光锥零线锁死度规的骨架形状，而单位时钟标定最后那一分比例刻度；拆开这两步，狭义相对论就不再有任何神秘的“时空魔法”。

::: {.remark #rem-lorentz-rotor-literature title="双曲旋转器与克利福德时空代数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在一维时间与一维空间构成的二维闵可夫斯基时空 $\mathbb{R}^{1,1}$ 中，取快度参数 $\eta \in \mathbb{R}$，则无量纲相对速度为 $\beta = \tanh\eta$（自动满足光速上限 $|\beta| < 1$），洛伦兹因子为 $\gamma = \cosh\eta = (1 - \beta^2)^{-1/2}$。在时空克利福德代数 $\mathrm{Cl}(1, 1)$ 中，基向量满足 $e_0^2 = +1$、$e_1^2 = -1$ 且反交换 $e_0 e_1 = -e_1 e_0$；由时间与空间张成的单位时空双矢量（有向时空面积元）$B = e_0 \wedge e_1 = e_0 e_1$ 满足

$$
B^2 = (e_0 e_1)(e_0 e_1) = -e_0^2 e_1^2 = +1,
$$

这与三维欧氏空间中双矢量平方为 $-1$（生成圆旋转 $\cos(\theta/2) - I\sin(\theta/2)$）形成鲜明对比。正因为 $B^2 = +1$，以双矢量面积 $\eta B / 2$ 生成的指数旋转器（hyperbolic rotor）必然展开为双曲函数：

$$
R(\eta) = \exp\left(-\frac{\eta}{2} B\right) = \cosh\frac{\eta}{2} - B\sinh\frac{\eta}{2}, \qquad R(\eta)^{-1} = \cosh\frac{\eta}{2} + B\sinh\frac{\eta}{2}.
$$

若约定旋转器对时空向量 $v = t e_0 + x e_1$ 的双边夹心作用为 $v \mapsto R(\eta)^{-1} v R(\eta)$，则由基向量与双矢量 $B = e_0 e_1$ 的反交换关系
$$
e_0 B = e_0(e_0 e_1) = e_0^2 e_1 = e_1 = -(e_0 e_1)e_0 = -B e_0, \qquad
e_1 B = e_1(e_0 e_1) = -e_0 e_1^2 = e_0 = -B e_1,
$$
将左边的 $R(\eta)^{-1} = \cosh(\eta/2) + B\sinh(\eta/2)$ 穿过 $e_0$（或 $e_1$）会使 $B$ 变号而化为 $e_0 R(\eta)$，再结合双曲二倍角恒等式 $\cosh^2(\eta/2) + \sinh^2(\eta/2) = \cosh\eta$ 与 $2\sinh(\eta/2)\cosh(\eta/2) = \sinh\eta$ 得到 $R(\eta)^2 = \cosh\eta - B\sinh\eta$。保持 $e_0$ 在左端依次展开：

$$
R(\eta)^{-1} e_0 R(\eta) = e_0 R(\eta)^2 = e_0(\cosh\eta - B\sinh\eta) = \cosh\eta\,e_0 - \sinh\eta\,(e_0 B) = \cosh\eta\,e_0 - \sinh\eta\,e_1
$$

（同理 $R(\eta)^{-1} e_1 R(\eta) = e_1 R(\eta)^2 = e_1(\cosh\eta - B\sinh\eta) = \cosh\eta\,e_1 - \sinh\eta\,e_0$），即精确复现 [@ex-rapidity-three-fifths] 中带负号的双曲变换矩阵 $\begin{pmatrix} \cosh\eta & -\sinh\eta \\ -\sinh\eta & \cosh\eta \end{pmatrix}$（且由 [@thm-hyperbolic-norm] 的 $\cosh^2\eta - \sinh^2\eta = 1$ 直接保证二次型间隔守恒）。

此外，在物理诠释上必须严格区分**类时世界线**（$\operatorname{minkowski}_d(\Delta v) > 0$）与**类光零线**（$\operatorname{minkowski}_d(\Delta v) = 0$ 且 $\Delta w \neq 0$）：在自然单位制 $c = 1$ 下（若采用物理时间单位 $t = c t_{\mathrm{phys}}$，则固有时为 $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$），对任意满足 $\Delta t > 0$ 且 $q(\Delta v) = \Delta t^2 - \norm{\Delta w}^2 > 0$ 的未来指向类时位移，固有时满足非严格不等式
$$
\Delta\tau = \sqrt{q(\Delta v)} = \sqrt{\Delta t^2 - \norm{\Delta w}^2} \le \Delta t,
$$
其中当且仅当空间位移非零（$\Delta w \neq 0$，一维空间中 $\Delta x \neq 0$）时取**严格不等号** $\Delta\tau < \Delta t$（即“运动时钟变慢”的几何投影效应），而在原地静止世界线（$\Delta w = 0$）上取**等号** $\Delta\tau = \Delta t$；光子沿 $\Delta w \neq 0$ 且 $q(\Delta v) = 0$ 的非零光锥零线传播（$\Delta\tau = 0$），对应 $\eta \to \pm\infty$ 的奇异极限，不存在任何属于光子的静止惯性观察系（因而不能说“在光子看来时间停滞或空间缩成一点”）。参见 R. P. Feynman, R. B. Leighton & M. Sands, *The Feynman Lectures on Physics*, Vol. I, chs. 15–17 (Addison–Wesley, 1963)；以及 D. Hestenes, *Space-Time Algebra* (Gordon and Breach, 1966)。
:::

## 世界线分段与固有时 {#sec-proper-time-segments}

在工程检验与公理化文献中，[@prop-null-cone-rigidity] 常被表述为存在性推论：只要二次型 $S$ 在闵可夫斯基零锥上恒为零，就必然存在某个实标量因子 $f \in \mathbb{R}$，使 $S$ 等于 $\operatorname{minkowski}_d$ 的 $f$ 倍。

::: {.corollary #cor-null-cone-proportionality title="比例因子的存在性" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.exists_smul_minkowski_of_null"}
设 $d \in \mathbb{N}$ 为任意自然数，$S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ 为实二次型。若对所有 $v \in \operatorname{Space}(d)$ 均有 $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则存在实数 $f \in \mathbb{R}$，使得

$$
S = f \cdot \operatorname{minkowski}_d.
$$
:::

::: proof
取证人 $f = S(1, 0) \in \mathbb{R}$，直接应用 [@prop-null-cone-rigidity]（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)）即得 $S = f \cdot \operatorname{minkowski}_d$。完整证明由 Lean 内核检查。
:::

正如前节所强调的，[@cor-null-cone-proportionality] 是 [@prop-null-cone-rigidity] 的存在性封装：它严格确立了比例常数 $f \in \mathbb{R}$ 的数学存在，但并不替代物理实验室中确定 $f = 1$ 的时钟标定程序。

当我们完成 $f = 1$ 的尺度标定并采用自然单位制 $c = 1$（若在物理单位制下记时间坐标为光程 $t = c t_{\mathrm{phys}}$，则只需像本章图注底栏所写的那样将间隔平方根除以光速 $c$，即 $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$），任何一段未来指向的因果位移向量 $\Delta v = (\Delta t, \Delta w)$（满足 $\Delta t \ge 0$ 且 $q(\Delta v) = \operatorname{minkowski}_d(\Delta v) = \Delta t^2 - \norm{\Delta w}^2 \ge 0$）所经历的**分段固有时**（proper time，$c = 1$ 单位制）便定义为

$$
\Delta\tau(\Delta v) = \sqrt{\operatorname{minkowski}_d(\Delta v)} = \sqrt{\Delta t^2 - \norm{\Delta w}^2} \le \Delta t
$$

（当 $\Delta w = 0$ 时取等号 $\Delta\tau = \Delta t$，当 $\Delta w \neq 0$ 时取严格不等号 $\Delta\tau < \Delta t$；严格分类下，$\Delta w \neq 0$ 且 $q(\Delta v) = 0$ 为非零类光零线位移，$\Delta\tau = 0$）。对于由多段匀速直线运动拼接而成的折线世界线 $\gamma = (\Delta v_1, \Delta v_2, \dots, \Delta v_m)$，总固有时是各段固有时的算术和 $\tau(\gamma) = \sum_{k=1}^m \sqrt{q(\Delta v_k)}$（物理单位制下为 $\tau_{\mathrm{phys}}(\gamma) = \sum_{k=1}^m \sqrt{q(\Delta v_k)}/c$）。许多初学者在这里容易犯一个致命的逻辑混淆：既然洛伦兹变换保持每一段位移的二次型 $q(\Delta v_k)$ 不变，为什么连接相同起点与终点的两条不同世界线（例如著名的双生子往返路径与原地留守路径）会有不同的总固有时？下面的手算例子把这一区别算得一清二楚。

::: {.figure src="ch17-proper-time-budget"}
**同样的 $\Delta t = 5$，空间走得越远，固有时越少。** 青色曲线是 $\Delta\tau = \sqrt{25 - \Delta x^2}$，处处在白色虚线 $\Delta t = 5$ 之下：静止时 $\Delta\tau = \Delta t = 5$，例题的第一段 $(5, 3)$ 得 $4$，沿光锥的 $(5, 5)$ 得 $0$。这条曲线是四分之一圆 $\Delta\tau^2 + \Delta x^2 = \Delta t^2$。
:::

::: {.example #ex-two-worldline-segments title="两段折线世界线与静止世界线的固有时比较"}
在二维闵可夫斯基时空 $\operatorname{Space}(1) = \mathbb{R} \times \mathbb{R}$ 中，考察连接起点 $O = (0, 0)$ 与终点 $P = (10, 0)$ 的两条不同世界线：

1. **折线往返路径 $\gamma_{\mathrm{bent}}$**：由两段未来类时位移拼接而成——第一段以 $\beta = 3/5$ 向右飞行 $\Delta v_1 = (5, 3)$，到达折返点 $A = (5, 3)$；第二段以 $\beta = -3/5$ 向左返回 $\Delta v_2 = (5, -3)$，抵达终点 $P = (5+5,\, 3-3) = (10, 0)$。在每一段上计算闵可夫斯基间隔与分段固有时：

$$
q(\Delta v_1) = 5^2 - 3^2 = 16 \implies \Delta\tau_1 = \sqrt{16} = 4, \qquad
q(\Delta v_2) = 5^2 - (-3)^2 = 16 \implies \Delta\tau_2 = \sqrt{16} = 4.
$$

因此，折线路径记录的总固有时为 $\tau(\gamma_{\mathrm{bent}}) = \Delta\tau_1 + \Delta\tau_2 = 4 + 4 = 8$。

2. **同端点静止路径 $\gamma_{\mathrm{rest}}$**：沿时间轴从 $(0, 0)$ 直接走到 $(10, 0)$ 的单段位移 $\Delta v_{\mathrm{rest}} = \Delta v_1 + \Delta v_2 = (10, 0)$。其间隔与固有时为

$$
q(\Delta v_{\mathrm{rest}}) = 10^2 - 0^2 = 100 \implies \tau(\gamma_{\mathrm{rest}}) = \sqrt{100} = 10.
$$

对比两式可见：虽然在任意固定惯性系下，每一段各自的二次型 $q(\Delta v_1) = 16$、$q(\Delta v_2) = 16$ 与 $q(\Delta v_{\mathrm{rest}}) = 100$ 都是严格不变的洛伦兹标量，但二次型平方根对向量加法并不具有线性可加性：

$$
\sqrt{q(\Delta v_1 + \Delta v_2)} = 10 > 4 + 4 = \sqrt{q(\Delta v_1)} + \sqrt{q(\Delta v_2)}.
$$

逐段 $q$ 不变性只保证“所有惯性观察者算出的 $\tau(\gamma_{\mathrm{bent}})$ 都等于 $8$、算出的 $\tau(\gamma_{\mathrm{rest}})$ 都等于 $10$”，绝不意味着连接同一对时空端点的不同路径具有相等的固有时！在闵可夫斯基度规下，空间位移项带负号 $-\norm{\Delta w}^2$，任何偏离直线惯性轨迹的空间往返都会**削减**而非增加累积固有时。极端情形下，沿光锥零线传播的位移 $v_{\mathrm{null}} = (1, 1)$ 满足 $q(1, 1) = 1^2 - 1^2 = 0$（$\Delta\tau = 0$），光子处于零锥边界上，不具备任何类时静止参考系。
:::

::: {.viz src="rapidity-lightcone" preset="twins" height="500"}
**折线 4 + 4 = 8，静止 10。** 折返点 $A$ 从 $(5, 0)$ 移到 $(5, 3)$：青色折线上的刻度从 10 个减到 8 个（每段 4 个），白色粗线（静止世界线）始终 10 个；去程的每个刻度都落在以 $O$ 为心的一条淡青色双曲线上。
:::

例末沿光锥零线的那种位移，也可以在同一张时空图上直接摆出来：把折返点 $A$ 推到光锥上，两段折线的 $q$ 都变成 $0$。

::: {.viz src="rapidity-lightcone" preset="light" height="500"}
**沿光锥走，固有时为零。** 把折返点 $A$ 拖到 $(5, 5)$：青色折线的两段都贴着白色菱形的边，$t^2 - x^2 = 0$，一个刻度也没有，$\tau = 0$；白色粗线（静止世界线）走满 10 个刻度。
:::

例中说所有惯性观察者算出的都是 $8$ 与 $10$，这一点也可以直接看：推到去程旅行者的参考系，再数一遍刻度。

::: {.viz src="rapidity-lightcone" preset="frames" height="500"}
**换参考系，仍是 8 与 10。** 推到去程旅行者的参考系（$\eta = \ln 2$）：所有事件沿淡青色双曲线滑动，去程变成竖直的 $(4, 0)$，回程变成 $(8.5, -7.5)$，两条世界线都歪了，刻度数却一个不变。
:::

至此，狭义相对论的度规骨架已完全显影：双曲恒等式 $|\cosh r|^2 - |\sinh r|^2 = 1$（[@thm-hyperbolic-norm]）刻画了单位双曲线上的保范变换，而光锥零集消失条件则通过 [@lemma-null-cone-spatial]、[@prop-null-cone-rigidity] 与 [@cor-null-cone-proportionality] 将时空二次型严格锁定为 $\operatorname{minkowski}_d$ 的标量倍。

::: {.film src="005-hyperbolic-rotation"}
**双曲旋转：光锥不动，快度相加（1 分 53 秒）。** 同一个事件 $(5, 3)$ 被转动时沿品红的圆穿出光锥，被推动时沿青色的双曲线滑行；以 $\eta = \ln 2$ 推动，$\cosh\eta = 5/4$、$\sinh\eta = 3/4$（[@thm-hyperbolic-norm]），它滑到 $(4, 0)$。随后白色珠子只沿光锥滑动，比例 $k = 3/2$ 保住光锥却把 $\tau = 4$ 变成 $6$（[@prop-null-cone-rigidity]）；两次 $\ln 2$ 的推动乘成一次 $\ln 4$ 的推动，品红的两块双曲扇形面积各为 $\ln 2 / 2$，速度却合成 $15/17$（速度读法见 [@rem-lorentz-rotor-literature]）；最后推到去程旅行者的参考系，折线与静止世界线的刻度仍是 $8$ 与 $10$。
:::

在下一章（[狄拉克旋量与规范场](ch18-spinors-and-gauge-curvature.md)）中，我们将进一步对这一不定号度规作“一阶矩阵开方”，看看反交换泡利矩阵与图上的闭合回路相位如何编织出旋量与规范曲率的几何图景。

::: {.viz src="rapidity-lightcone" height="560"}
快度与光锥的完整实验室：对照、推动、卡尺、世界线四个场景共用一条时间轴；绿色框只给本章用 Lean 验证的三条结论（[@thm-hyperbolic-norm]、[@lemma-null-cone-spatial]、[@prop-null-cone-rigidity]）。
:::
