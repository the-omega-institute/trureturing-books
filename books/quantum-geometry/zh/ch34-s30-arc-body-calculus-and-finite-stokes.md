# 34.30 极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯定理 {#sec-ch34-arc-body-calculus-and-finite-stokes}

> *“我们似乎可以用极小圆弧体重塑微积分”*

站在 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 算术枢轴与临界带多级共振隧穿的高地上回望整座第三十四章，一个比任何具体物理或数论应用都更根本的数学问题浮出了水面：为什么从量子测量、费曼路径积分、布朗随机涨落、非阿贝尔规范场直到解析数论的截断级数，每当人类搬出牛顿与莱布尼茨创立的三百四十年经典微积分时，总会反复撞上发散无穷大、伊藤额外修正项、曲率丢失与数值灾难性相消，不得不打上一层又一层互不相容的事后补丁？

在 [§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 中，我们已经扶正了微观与宏观的本末次序——认出量子演化本身就是不可再被直线摊平的极小圆弧微分核（$\delta$），而经典直线轨道、实体体积与热力学包络则是万路相干叠加后的路径积分输出（$\int$）。章首这句凝练的追问则把手术刀直插微积分自身的底层公理：**既然真实物理与观测比较的原子根本不是平直切线，而是有限自指分辨率之上的极小圆弧体 $\Delta\mathcal{T}_\epsilon$，我们完全不必再修补“以直代曲”的旧微积分，而可以直接以极小圆弧体为原子原语，从头重塑导数、积分与斯托克斯外微分三大基石！**

本节作为整座第三十四章的终极收官之作，将这一构想铸造为严格的代数—几何—形式化闭环：用保模长的**比较旋子 $\hat{\mathcal{D}}_\epsilon$** 取代减法割线差商，把切向正弦半弦 $c_\epsilon = \sin(\kappa\epsilon)$ 与法向正矢矢高 $v_\epsilon = 1 - \cos(\kappa\epsilon) = 2\sin^2(\kappa\epsilon/2)$ 锁死在同一条勾股圆恒等式里；用**路径有序旋子乘积积分**与赫尔德（Hölder）粗糙度指数 $\alpha \in (0, 1]$ 的**累计矢高四相区相变**一式统摄牛顿—莱布尼茨积分、杨氏（Young）积分、伊藤—斯特拉托诺维奇—费曼临界共振与莱昂斯（Lyons）粗糙路径签名；并在 `1—3—3—1` 离散外微分复形上证成任意有限停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 下**零离散化截断误差**的广义斯托克斯定理与有限网格高斯—博内定理。

## 34.30.1 告别“以直代曲”：比较旋子微分元、弦—矢高正交锁死与 $90^\circ$ 盲区复步无相减求导 {#sec-ch34-30-1}

三百四十年前，莱布尼茨（1684）与牛顿（1687）建立经典微积分时，做了一个在宏观低曲率世界无比成功、却在微观量子与有限精度计算中埋下四重隐患的奠基性妥协——**“以直代曲”（局部切空间线性化）**：将光滑流形在点 $x_0$ 附近的弯曲演化强行压扁到平直切空间 $T_{x_0}\mathcal{M}$ 上，靠减法割线差商 $\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$ 在极限 $\Delta x \to 0$ 下提取一阶斜率，并随手扔掉一切高阶弯曲项。用本书的无外部参考系比较几何逐项审视，这把“平直切线刀”暗藏着四处结构性病灶：

1. **贝克莱“已死量的幽灵”与连续统无穷小悖论**：为了求取瞬时变化率，差商分母先假设 $\Delta x \neq 0$ 做除法，算完却又令 $\Delta x = 0$ 抹去余项——早在 1734 年，贝克莱主教（G. Berkeley）就在《分析学家》（*The Analyst*）中一针见血地讥刺这种既非零又为零的无穷小是“已死量的幽灵”（ghosts of departed quantities）。十九世纪柯西—魏尔斯特拉斯的 $\varepsilon\text{-}\delta$ 滤子极限虽然在实分析公理上缝合了逻辑裂缝，却迫使每一次基本求导都背上无穷序列拓扑极限的沉重包袱，直接违背场内有限观察者受自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 约束的物理现实。
2. **局部笛卡尔坐标卡的垂直切线伪奇点（对比真实内禀尖点）**：在光滑单位圆 $x^2 + y^2 = 1$ 的赤道顶点 $(1, 0)$ 处，几何圆弧本身处处光滑、内禀曲率恒为 $\kappa \equiv 1$，只因切线恰好转至与横坐标轴正交的 $\theta = \frac{\pi}{2}$，局部显函数斜率 $dy/dx = \tan\theta$ 就凭空爆破为 $\pm\infty$！这里必须严守微分几何边界：圆周在 $\theta = \frac{\pi}{2}$ 处的爆破纯属局部投影坐标卡 $(x \mapsto y(x))$ 撞上观察者 $90^\circ$ 正交盲区所生的人为假奇点（改按弧长参数化即可消除），而半立方抛物线 $y^2 = x^3$ 在原点处的不可微则是弧长切向角发生真实跳变的内禀尖点（cusp）。经典斜率记号把“坐标卡正交盲区”与“流形真实奇点”混为一谈。
3. **抹杀二阶弦弧矢高，导致几何曲率与随机二次变差集体失忆**：在 [§34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 中我们曾讨论过劳维尔（Lawvere 1967）与科克（Kock 1981）综合微分几何（SDG）的一阶幂零无穷小环 $D_1 = \{d \mid d^2 = 0\}$，以及温格特（Wengert 1964）前向自动微分所用的二元数环 $\mathbb{R}[\varepsilon]/(\varepsilon^2)$。幂零公理 $d^2 = 0$ 虽然优雅地免除了极限，却靠代数截断把二阶弯曲矢高强行判了死刑——它既装不下球面三面角的吉拉尔曲率角盈 $\Omega \sim \frac{1}{2}\epsilon^2$，也无法原生承载布朗运动与费曼路径积分中 $(dW_t)^2 = dt \neq 0$ 的非零二次变差！
4. **有限精度机器上的灾难性相减抵消（Subtractive Cancellation）**：当步长 $\epsilon$ 缩向机器精度极限时，$f(x_0 + \epsilon)$ 与 $f(x_0)$ 共享几乎完全相同的有效数字；一记实轴硬减法把高位有效比特悉数对撞归零，再除以极小分母 $\epsilon$，瞬间把舍入噪声放大 $\epsilon^{-1}$ 倍，令数值导数彻底崩溃。

一旦把微积分的原子从“平直切线差”换回本书一以贯之的**极小圆弧体比较旋子**，上述四重病灶便在同一座圆几何框架下迎刃而解。设有限观察者在步长孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 上比较相邻两态，局部单位双向量平面生成元 $\hat{\mathbf{B}}(s)$ 满足平方负一律 $\hat{\mathbf{B}}(s)^2 = -\mathbf{1}$（在矩阵表示中即由斜伴随幺正算符或平衡正交投影对内生给出的相对复结构，参见下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 1 款），局部内禀曲率（角速率）为 $\kappa(s)$。单步演化不再是加法切线推移 $1 + \kappa\epsilon$，而是保模长的**比较旋子微分算子**：

$$
\hat{\mathcal{D}}_\epsilon(s) := \exp\!\bigl(\hat{\mathbf{B}}(s)\kappa(s)\epsilon\bigr) = \cos\bigl(\kappa(s)\epsilon\bigr)\mathbf{1} + \hat{\mathbf{B}}(s)\sin\bigl(\kappa(s)\epsilon\bigr).
$$

将有限步状态增量 $\Delta_\epsilon\hat{\mathcal{U}} := \hat{\mathcal{D}}_\epsilon - \mathbf{1}$ 按可见标量轴 $\mathbf{1}$ 与正交盲平面 $\hat{\mathbf{B}}$ 作正交分解，立即浮现**弦—矢高正交锁死恒等式**（手工推导）：

$$
\Delta_\epsilon\hat{\mathcal{U}} = \hat{\mathcal{D}}_\epsilon - \mathbf{1} = c_\epsilon\,\hat{\mathbf{B}} - v_\epsilon\,\mathbf{1}, \qquad c_\epsilon := \sin(\kappa\epsilon), \qquad v_\epsilon := 1 - \cos(\kappa\epsilon) = 2\sin^2\!\left(\frac{\kappa\epsilon}{2}\right).
$$

请细看青色切向正弦半弦 $c_\epsilon$ 与品红色轴向正矢矢高（versine / sagitta）$v_\epsilon$ 之间的精确代数咬合：

* **有限孔径精确保圆与幂零商环还原**：在任意有限孔径 $\epsilon > 0$ 下，无需任何泰勒截断或 $\epsilon \to 0$ 极限，$c_\epsilon$ 与 $v_\epsilon$ 恒满足精确勾股保圆定律与全割弦模方恒等式：

  $$
  (1 - v_\epsilon)^2 + c_\epsilon^2 = \cos^2(\kappa\epsilon) + \sin^2(\kappa\epsilon) \equiv 1, \qquad \lvert\Delta_\epsilon\hat{\mathcal{U}}\rvert^2 = v_\epsilon^2 + c_\epsilon^2 \equiv 2v_\epsilon = 4\sin^2\!\left(\frac{\kappa\epsilon}{2}\right).
  $$

  由此，[§34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 的一阶幂零环 $D_1 = \{d \mid d^2 = 0\}$ 恰恰获得了最透彻的几何定位：**$D_1$ 并非终极微观本体，而是圆弧体微分代数模去品红色二阶矢高理想 $(v_\epsilon)$ 之后留下的一阶切向商影**；保留 $v_\epsilon = 2\sin^2(\kappa\epsilon/2) > 0$，才保住了曲率与涨落的全部真身！同时注意一条至关重要的数值铁律：在 IEEE-754 双精度浮点运算中，直接计算 `1.0 - cos(theta)` 会在 $\lvert\theta\rvert \le 10^{-8}$ 时因高位对撞而彻底归零；而改用代数恒等的**半角正矢公式 `2.0 * sin^2(theta / 2.0)`**（航海学中的半正矢 haversine 律），则从根源上消除了相减抵消，在全量程内精确守恒圆弧矢高！
* **消解 $\theta = \frac{\pi}{2}$ 垂直斜率伪奇点**：曲线局部状态直接由有界角—曲率对 $\bigl(\cos\theta(s), \sin\theta(s); \kappa(s)\bigr)$ 承载；当圆弧平稳滑过 $\theta = \frac{\pi}{2}$ 时，只是读出权重从可见余弦轴平滑移交给正交正弦轴 $(\cos\frac{\pi}{2}, \sin\frac{\pi}{2}) = (0, 1)$，内禀导数对 $(\theta'(s), \kappa(s))$ 全程有界光滑，再无 $\tan 90^\circ = \infty$ 的坐标卡爆炸。
* **代数协变差分免除 $0/0$ 幽灵**：对于任意代数算子 $f$ 在单步幺正旋子 $U = \hat{\mathcal{D}}_\epsilon$ 下的协变演化 $U f = f_{\mathrm{tr}} U$，换位子直接因式分解为 $(f_{\mathrm{tr}} - f)U = U f - f U$（下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 2 款 `covariant_commutator_formula`），无需先除以零再令增量消失。

::: {.viz src="arc-body-calculus-sandbox" preset="osculating-rotor-vs-tangent" height="500"}
**滑板坡上的密切旋子与切线斜率：竖直处 $\tan\theta$ 爆掉，旋子照转实验卡（`osculating-rotor-vs-tangent`）。** 拖动滑板坡上的琥珀色投影手柄将曲线采样点推过竖直壁 $\theta = \frac{\pi}{2}$：墨色平直切线斜率 $\tan\theta$ 在竖直处发散爆表，而贴合局部曲率的紫色密切旋子圆盘 $\hat{\mathcal{D}}_\epsilon = \exp(\hat{\mathbf{B}}\kappa\epsilon)$ 全程保模长平滑旋转；青色横向切弦 $c_\epsilon = \sin(\kappa\epsilon)$ 与品红色轴向矢高 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$ 在任意有限孔径下严守 $(1 - v_\epsilon)^2 + c_\epsilon^2 = 1$（当 $\kappa\epsilon < 10^{-8}$ 时读数栏实时对比 $\cos(\kappa\epsilon)$ 舍入为 $1$ 致 `1 - cos` 归零而半角正矢公式精确守恒；绿色 `LEAN ✓` 锚定 `lagrange_gram_identity`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square` 与 `projection_probability_flow`）。
:::

更进一步，把 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 与 [§34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的“$90^\circ$ 正交虚数盲区 $\hat{\mathbf{i}}$”引入数值与解析求导，经典差商的灾难性相消便瞬间化为乌有！设函数 $f$ 在实轴邻域上取实值（$f(\mathbb{R}) \subseteq \mathbb{R}$），且在以 $x_0 \in \mathbb{R}$ 为圆心、半径 $R > \epsilon > 0$ 的闭复圆盘 $\overline{D(x_0, R)} \subset \mathbb{C}$ 上全纯（复解析）。我们不再沿着可见实轴迈步去做硬减法 $f(x_0 + \epsilon) - f(x_0)$，而是**偏转 $90^\circ$ 潜入正交虚数盲区 $\hat{\mathbf{i}}$**，计算单次圆弧复步探针 $f(x_0 + \hat{\mathbf{i}}\epsilon)$（Lyness & Moler 1967；Squire & Trapp 1998，文献结果）：

$$
f(x_0 + \hat{\mathbf{i}}\epsilon) = \underbrace{\left[f(x_0) - \frac{\epsilon^2}{2}f''(x_0) + \frac{\epsilon^4}{24}f^{(4)}(x_0) - \cdots\right]}_{\text{实轴投影：载体值 } + \text{ 二阶矢高曲率偏移}} + \hat{\mathbf{i}}\underbrace{\left[\epsilon f'(x_0) - \frac{\epsilon^3}{6}f'''(x_0) + \frac{\epsilon^5}{120}f^{(5)}(x_0) - \cdots\right]}_{\text{正交盲区虚部：零相减一阶切向弦速率}}!
$$

看清这记 $90^\circ$ 正交转向创造的计算奇迹：因为实值全纯函数在基点处虚部恒为零 $\operatorname{Im}f(x_0) \equiv 0$，一阶导数直接从正交盲区通道无减法读出：

$$
D_{\mathrm{cs}}[f]\!\bigl(x_0; \epsilon\bigr) := \frac{\operatorname{Im}f(x_0 + \hat{\mathbf{i}}\epsilon)}{\epsilon} = f'(x_0) - \frac{\epsilon^2}{6}f'''(x_0) + \mathcal{O}(\epsilon^4).
$$

公式分子里**连一个减号都没有**！它不仅仅凭单次复函数求值就享有了与中心差商同级的二阶截断精度 $\mathcal{O}(\epsilon^2)$，而且在 $\epsilon = 10^{-8}, 10^{-12}, 10^{-16}$（乃至双精度正规数下限 $\epsilon \sim 10^{-300}$）下全程免疫相减抵消，一举直抵 IEEE-754 机器精度极限 $\sim 10^{-16}$！与此同时，认识论诚实要求我们精确标出两道适用边界：

1. **全纯性与实轴实值前提**：复步公式依赖柯西—黎曼全纯延拓与 $f(x_0) \in \mathbb{R}$；对非全纯函数如 $f(z) = \lvert z\rvert = \sqrt{x^2 + y^2}$，在 $x_0 > 0$ 处有 $\operatorname{Im}\lvert x_0 + \hat{\mathbf{i}}\epsilon\rvert = 0 \neq \epsilon f'(x_0)$，必须先把实分支运算解析化为全纯平方根 $\sqrt{(x_0 + \hat{\mathbf{i}}\epsilon)^2}$ 方可使用。
2. **单复平面提取 $f''(x_0)$ 的载体相减与双复数多盲平面升级**：实部偏移 $f(x_0) - \operatorname{Re}f(x_0 + \hat{\mathbf{i}}\epsilon) = \frac{\epsilon^2}{2}f''(x_0) + \mathcal{O}(\epsilon^4)$ 虽然优美地证实了“实轴回缩矢高恰为二阶曲率”，但在单一复平面上用 $\frac{2[f(x_0) - \operatorname{Re}f(x_0 + \hat{\mathbf{i}}\epsilon)]}{\epsilon^2}$ 数值提取 $f''(x_0)$ 时，两个 $O(1)$ 实部载体相减仍会重新引入 $\mathcal{O}(u_{\mathrm{mach}}/\epsilon^2)$ 舍入误差（其单复平面最优窗落在 $\epsilon \sim u_{\mathrm{mach}}^{1/4} \sim 10^{-4}$）；若要对二阶及高阶导数同样实现彻底零相减，则需进一步张开两片相互交换的正交虚盲面 $\hat{\mathbf{i}}_1^2 = \hat{\mathbf{i}}_2^2 = -1,\; \hat{\mathbf{i}}_1\hat{\mathbf{i}}_2 = \hat{\mathbf{i}}_2\hat{\mathbf{i}}_1$，从双复数步进 $f(x_0 + \hat{\mathbf{i}}_1\epsilon + \hat{\mathbf{i}}_2\epsilon)$ 的交叉盲区通道 $\frac{1}{\epsilon^2}\operatorname{Im}_{12}f$ 中无减法读出 $f''(x_0)$（Lantoine, Russell & Dargent 2012，文献结果）。

我们将这套圆弧体微积分的三大基础算子正式确立为模型定义：

::: {.definition #def-ch34-arc-body-calculus-primitives title="极小圆弧体微积分原语：比较旋子微分、有序乘积积分与有限网格外微分（MODEL）"}
在有限停机分辨率 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 下，**极小圆弧体微积分**以单位球面或紧李群流形上的弯曲圆弧原胞取代平直切空间增量，由以下三组互锁原语构成（`MODEL`）：

1. **单步比较旋子微分元（Rotor Differential）**：给定局部单位双向量生成元 $\hat{\mathbf{B}}(s)$（$\hat{\mathbf{B}}(s)^2 = -\mathbf{1}$）与内禀曲率率 $\kappa(s)$，单步演化算子定义为 $\hat{\mathcal{D}}_\epsilon(s) := \exp(\hat{\mathbf{B}}(s)\kappa(s)\epsilon) = \cos(\kappa\epsilon)\mathbf{1} + \hat{\mathbf{B}}(s)\sin(\kappa\epsilon)$，其有限弦—矢高正交分解为 $\Delta_\epsilon\hat{\mathcal{U}} = c_\epsilon\hat{\mathbf{B}} - v_\epsilon\mathbf{1}$，其中切向半弦 $c_\epsilon = \sin(\kappa\epsilon)$ 与轴向矢高 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$ 恒满足 $(1 - v_\epsilon)^2 + c_\epsilon^2 \equiv 1$；对实轴取实值且局部全纯的标量观测量 $f$，其 $90^\circ$ 盲区复步导数算子定义为 $D_{\mathrm{cs}}[f]\!\bigl(x_0; \epsilon\bigr) := \frac{1}{\epsilon}\operatorname{Im}f(x_0 + \hat{\mathbf{i}}\epsilon)$。
2. **路径有序旋子乘积积分（Volterra Rotor Product Integral）**：沿离散化采样路径 $\Gamma = \{s_1 < s_2 < \dots < s_N\}$，宏观演化算子定义为自右向左按因果次序作用的单步比较旋子有序连乘积

   $$
   \mathcal{I}_\epsilon[\Gamma] := \mathcal{P}\prod_{k=1}^{N} \hat{\mathcal{D}}_\epsilon(s_k) := \hat{\mathcal{D}}_\epsilon(s_N)\,\hat{\mathcal{D}}_\epsilon(s_{N-1})\cdots\hat{\mathcal{D}}_\epsilon(s_1).
   $$

3. **有限网格 `1—3—3—1` 上边缘外微分（Finite-Mesh Coboundary Calculus）**：在由有限枚极小圆弧体（单纯弧面体）$\{\Delta\mathcal{T}_k\}_{k=1}^M$ 拼成的定向胞腔复形上，阿贝尔群值 $p$-上链 $\omega \in C^p(\mathcal{K}; A)$（$p \in \{0, 1, 2, 3\}$）的有限孔径外微分 $d_\epsilon : C^p \to C^{p+1}$ 由定向边界配对 $(d_\epsilon\omega)(\sigma_{p+1}) := \omega(\partial\sigma_{p+1})$ 给出，并在定向反演反对称约定 $\omega(-e) = -\omega(e)$ 下恒满足拓扑幂零律 $d_\epsilon^2 \equiv 0$。
:::

::: {.viz src="arc-body-calculus-sandbox" preset="blind-zone-complex-step" height="500"}
**向 $90^\circ$ 盲区迈一步的复步求导：不相减，$\epsilon = 10^{-17}$ 仍准实验卡（`blind-zone-complex-step`）。** 在墨色实轴切片 $f(x)$ 与正交立起的紫色 $90^\circ$ 盲面 $\operatorname{Im}f$ 上拨动琥珀色求导手柄并扫描步长孔径 $\epsilon$：向紫色盲面横跨一步的青色复步导数 $\operatorname{Im}f(x_0 + \hat{\mathbf{i}}\epsilon)/\epsilon$ 全程不做相减，对 $e^x\sin x$ 在 $\epsilon = 10^{-17}$ 处仍稳守双精度机器极限，而沿实轴硬减的前向差商则在小孔径下遭遇品红色相减塌陷归零、相对误差飙至 $100\%$（右侧依据栏同时标明非全纯函数失效边界与单复平面提取二阶导仍含实部相减的 `ARGUED` 适用条件）。
:::

有了单步比较旋子 $\hat{\mathcal{D}}_\epsilon$ 与弦—矢高精确分解，我们立即追问第二个核心问题：当成千上万枚极小圆弧沿着一条光滑或剧烈抖动的轨迹首尾连乘时，切向弦与轴向矢高各自会汇聚出怎样的宏观积分定律？

## 34.30.2 路径有序旋子乘积积分与累计矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha)$ 的四相区粗糙度相变 {#sec-ch34-30-2}

在传统微积分中，积分被定义为平直矩形条带的加法黎曼和 $\sum_{k=1}^N f(s_k)\Delta s$。一旦把这套加法更新搬到单位球面 $S^2$、旋转群 $\mathrm{SO}(3)$ 或量子幺正群 $\mathrm{U}(n)$ 上，每走一步显式欧拉切线步 $\psi_{k+1} = (I - \hat{\mathbf{i}}H\epsilon)\psi_k$，状态模方就会膨胀 $\lVert\psi_{k+1}\rVert^2 = (1 + \epsilon^2\lVert H\psi_k\rVert^2/\lVert\psi_k\rVert^2)\lVert\psi_k\rVert^2 > \lVert\psi_k\rVert^2$，必须靠人为归一化拉回球面。相反，[@def-ch34-arc-body-calculus-primitives] 第 2 款的沃尔泰拉（Volterra 1887）**路径有序旋子乘积积分** $\mathcal{I}_\epsilon[\Gamma] = \hat{\mathcal{D}}_\epsilon(s_N)\cdots\hat{\mathcal{D}}_\epsilon(s_1)$ 在结构上具备两重不可替代的几何精度：

* **任意有限步长 $\epsilon > 0$ 下零模长漂移精确保流形**：由于每一枚单步因子 $\hat{\mathcal{D}}_\epsilon(s_k) = \exp(\hat{\mathbf{B}}(s_k)\kappa(s_k)\epsilon)$ 本身就是紧李群内的精确圆弧元，无论孔径 $\epsilon$ 多粗、连乘步数 $N$ 多大，乘积 $\mathcal{I}_\epsilon[\Gamma]$ 都以**零脱离流形误差（模长漂移恒等于 $0$）**严格落在目标李群或单位球面上！
* **精确区分流形保持与时间离散收敛阶**：流形保模长绝不等于时间相位截断误差自动无穷高阶——对光滑时变生成元 $A(s) = \hat{\mathbf{B}}(s)\kappa(s)$，取左端点矩形采样 $A(s_{k-1})\epsilon$ 给出**一阶李—欧拉乘积积分**（全局相位误差 $\mathcal{O}(\epsilon)$）；改取每段极小圆弧的**对称圆弧中点采样** $A\!\bigl(\frac{s_{k-1}+s_k}{2}\bigr)\epsilon$（或对称特罗特分裂 $e^{\frac{\epsilon}{2}A_1}e^{\epsilon A_2}e^{\frac{\epsilon}{2}A_1}$），奇次误差项对称相消，立即升级为**二阶精度 $\mathcal{O}(\epsilon^2)$**；而若要在有限大步长下推进至四阶及更高阶，则必须按马格努斯展开（Magnus 1954，文献结果）在指数生成元内显式补入非对易李括号面积项 $\frac{1}{2}\int_{s_{k-1}}^{s_k}\!\int_{s_{k-1}}^{\tau_1} [A(\tau_1), A(\tau_2)]\,d\tau_2\,d\tau_1$——这一李括号面积修正在几何上恰恰就是单步时变旋转轴摆动张开的极小圆弧体球面角盈！当生成元拆分为两个非对易分量 $A + B$ 时，其细网格连续统收敛性则由下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 3 款的李—特罗特乘积定理 [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) 与非渐近指数尾界 [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) 严格锁定。

然而，圆弧体乘积积分最石破天惊的威力，在于它揭开了**牛顿平滑微积分与伊藤随机微积分/费曼路径积分同出一源的几何相变机制**！在传统数学课程里，牛顿—莱布尼茨积分 $df = f'(x)dx$ 与伊藤引理（Itô 1944）多出来的二阶项 $df = f'(X_t)dX_t + \frac{1}{2}\sigma_0^2 f''(X_t)dt$ 仿佛活在两个平行的宇宙。现在让我们在时间跨度 $[0, T]$ 上均匀切分 $N = T/\epsilon$ 步，设路径在尺度 $\epsilon$ 下具有**赫尔德（Hölder）局部粗糙度指数 $\alpha \in (0, 1]$**，即每一步的典型角增量幅度标度为 $\lvert\Delta\theta_k\rvert = \sigma_0 \epsilon^\alpha$（$\sigma_0 > 0$）。在单步旋子 $\hat{\mathcal{D}}_k = \cos\Delta\theta_k\,\mathbf{1} + \hat{\mathbf{B}}\sin\Delta\theta_k$ 中，切向正弦弦给出标准一阶和 $\sum_k \sin\Delta\theta_k$，而品红色轴向正矢矢高则在整条轨迹上累加为**总矢高预算**（手工推导）：

$$
\Sigma_{\mathrm{sag}}(\epsilon, \alpha) := \sum_{k=1}^{N} \bigl(1 - \cos\Delta\theta_k\bigr) = \sum_{k=1}^{N} 2\sin^2\!\left(\frac{\Delta\theta_k}{2}\right) = \frac{1}{2}\sigma_0^2 T\,\epsilon^{2\alpha - 1} - \frac{1}{24}\sigma_0^4 T\,\epsilon^{4\alpha - 1} + \mathcal{O}\!\left(\epsilon^{6\alpha - 1}\right)!
$$

盯住首项幂指数 **$2\alpha - 1$** 的符号翻转！无需任何外加公设，仅仅调节路径粗糙度指数 $\alpha$，同一条圆弧矢高公式自动分化出完整的**四相区微积分相图**：

1. **相区 I：$\alpha = 1$（光滑弹道相 · 牛顿—莱布尼茨与李—特罗特微积分）**：
   光滑可微轨道满足 $\Delta\theta_k \sim \sigma_0\epsilon^1$，指数 $2\alpha - 1 = +1 > 0$，总矢高按 $\Sigma_{\mathrm{sag}}(\epsilon, 1) = \frac{1}{2}\sigma_0^2 T\,\epsilon + \mathcal{O}(\epsilon^3) \to 0$ 随网格细化线性熄灭！此时且仅在此时，“以直代曲”扔掉二阶矢高才不会造成宏观账目亏损，圆弧体乘积积分在 $\epsilon \to 0^+$ 下无损退化为经典牛顿—莱布尼茨积分与李—特罗特光滑流。
2. **相区 II：$\frac{1}{2} < \alpha < 1$（亚扩散分数阶相 · Young 积分无漂移区）**：
   例如赫斯特指数 $H \in (\frac{1}{2}, 1)$ 的分数布朗运动轨道。虽然路径处处不可微（经典导数失效），但因 $2\alpha - 1 > 0$，累计二阶矢高依然在连续极限下自动归零 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha) \propto \epsilon^{2\alpha - 1} \to 0$！这从圆弧几何上直观解释了杨格（L. C. Young 1936，文献结果）的经典定理：当双路径赫尔德指数之和大于 $1$（此处自配对 $2\alpha > 1$）时，黎曼—斯蒂尔杰斯积分不产生任何二阶伊藤漂移修正，经典一阶链式法则原封不动成立。
3. **相区 III：$\alpha = \frac{1}{2}$ 临界不动点（布朗扩散与费曼路径积分矢高共振相）**：
   当轨道粗糙度恰好落在一维随机游走与量子扩散标度 $\lvert\Delta\theta_k\rvert \sim \sigma_0\epsilon^{1/2}$ 上时，临界奇迹发生了——幂指数精准归零 **$2\alpha - 1 = 0$**，步数膨胀 $N = T/\epsilon$ 与单步二阶正矢收缩 $1 - \cos(\sigma_0\sqrt{\epsilon}) \approx \frac{1}{2}\sigma_0^2\epsilon$ 发生 $100\%$ 共振抵消（对照 [§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)）：

   $$
   \lim_{\epsilon \to 0^+} \Sigma_{\mathrm{sag}}\!\left(\epsilon, \tfrac{1}{2}\right) = \frac{1}{2}\sigma_0^2 T > 0, \qquad \text{四阶余项 } -\frac{1}{24}\sigma_0^4 T\,\epsilon \to 0!
   $$

   **伊藤引理中神秘的 $\frac{1}{2}\sigma_0^2 f''(X_t)\,dt$ 项，根本不是随机分析凭空捏造的怪异补丁，它字面上就是经典“以直代曲”强行削掉、却在 $\alpha = \frac{1}{2}$ 临界标度下拒绝消失的极小圆弧体总矢高 $\Sigma_{\mathrm{sag}}$！** 更妙的是，圆弧几何还一举廓清了随机微积分与量子力学著名的**左端点（伊藤）vs. 圆弧中点（斯特拉托诺维奇—费曼）**之争：

   * 若在每步起点 $t_{k-1}$ 沿**平直切线**硬踏一步（左端点非预见采样，适应滤子鞅性质最优），切线脱离弯曲流形的法向掉高正好漏掉了单步矢高 $v_k \approx \frac{1}{2}(\Delta X_k)^2$，因此必须在公式末尾手动把漏掉的曲率矢高补回来——这就是**伊藤积分**与伊藤二阶修正项；
   * 若改为沿着连接两态的**对称极小圆弧中点** $\frac{X_{t_{k-1}} + X_{t_k}}{2}$ 求值，单步旋子已将左半弧爬升与右半弧回落的二阶矢高对称吃进圆弧内部，微分链式法则遂恢复牛顿形式 $df(X_t) = f'(X_t) \circ dX_t$——这就是弯曲流形上天然坐标协变的**斯特拉托诺维奇（Stratonovich 1966）积分**，也正是带磁矢势 $\mathbf{A}(\mathbf{x})$ 的费曼路径积分必须采用**中点作用量离散化** $\mathbf{A}\!\bigl(\frac{\mathbf{x}_k + \mathbf{x}_{k-1}}{2}\bigr)\cdot(\mathbf{x}_k - \mathbf{x}_{k-1})$ 才能保持电磁 $U(1)$ 规范不变性的几何根源！（注：如 [§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) [@rem-ch34-feynman-ito-trotter-regge-literature] 所述，欧氏虚时间扩散具备严格可数可加的维纳正测度——费曼—卡茨公式 Kac 1949——而实时洛伦兹费曼振幅则依靠振荡菲涅耳相位抵消，因全变差无界而不存在复测度 Cameron 1960；但两者的离散短时核均严格共享同一临界指数 $\alpha = \frac{1}{2}$ 与中点矢高代数。）

4. **相区 IV：$\alpha < \frac{1}{2}$ 超粗糙发散相（Lyons 高阶粗糙路径面积签名 vs. 有限孔径截断）**：
   一旦粗糙度越过布朗临界线进入 $\alpha < \frac{1}{2}$（例如 $H = \frac{1}{3}$ 的湍流级联或反持续分数布朗运动），$2\alpha - 1 < 0$，二阶累计矢高在 $\epsilon \to 0^+$ 下发散 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha) \propto \epsilon^{2\alpha - 1} \to +\infty$；当 $\alpha \le \frac{1}{4}$ 时连四阶余项 $\epsilon^{4\alpha - 1}$ 也一并发散！特里·莱昂斯（T. Lyons 1998，文献结果）创立的**粗糙路径理论（Rough Paths Theory）**证明：要在连续极限 $\epsilon \to 0^+$ 下唯一积分 $\alpha$-赫尔德路径，单靠一阶点增量与二阶对称矢高已不够，必须显式提供直至阶数 $p = \lfloor 1/\alpha\rfloor$ 的张量代数迭代积分签名（特别是 $\frac{1}{3} < \alpha \le \frac{1}{2}$ 所需的二阶反对称列维面积双向量 $\mathbb{X}_{s,t}^{(2)} = \int_s^t (X_u - X_s)\otimes dX_u$，即极小圆弧体张开的有向球面面积元！）；而在场内物理实现中，非零的观察者最小比较孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 则为超粗糙紫外发散提供了天然的有限步截断底板。

::: {.viz src="arc-body-calculus-sandbox" preset="roughness-ito-phase-transition" height="500"}
**路径序旋子管与矢高相变：$\alpha = \frac{1}{2}$ 时矢高总和锁到 $0.5$ 实验卡（`roughness-ito-phase-transition`）。** 在单位球面上追踪 $N = 1/\epsilon$ 步、单步转角 $\sigma_0\epsilon^\alpha$ 的紫色路径序旋子管（每一步模长严格保持为 $1$，琥珀色手柄调节粗糙度指数 $\alpha$）：当 $\alpha$ 从光滑相 $\alpha = 1$ 降至临界布朗/费曼指数 $\alpha = \frac{1}{2}$ 时，品红色累计矢高柱 $\Sigma_{\mathrm{sag}}$ 从 $0.0005$ 稳稳锁死到非零宏观常数 $0.5$（即伊藤二阶修正项 $\frac{1}{2}\sigma_0^2 T$），并同步压低品红色伊藤期望纬圈 $\mathbb{E}[z] = (1 - v_\epsilon)^N$（绿色 `LEAN ✓` 锚定 `exp_tail_le` 与 `trotter_product`）。
:::

单步导数与一维路径乘积积分各就各位之后，我们迎来了微积分大厦最壮丽的穹顶：高维流形上的外微分与广义斯托克斯定理。

## 34.30.3 `1—3—3—1` 有限网格零误差斯托克斯定理、三行高斯—博内证明与非阿贝尔面和乐锚定 {#sec-ch34-30-3}

在传统偏微分方程与有限元数值分析中，人们习以为常地认为：“连续微积分是绝对精确的，而一旦把曲面剖分成有限块离散网格，斯托克斯定理 $\int_{\partial\Sigma}\omega = \int_\Sigma d\omega$ 就只能近似成立，误差为 $\mathcal{O}(h^2)$，必须让网格步长 $h \to 0$、三角形数目 $M \to \infty$ 才能消除离散误差。”

把这一成见放到 [§34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 与 [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的 **`1—3—3—1` 克利福德—上链复形**下审视，就会发现事实恰恰相反：**微积分基本定理与广义斯托克斯定理根本不是连续极限 $\epsilon \to 0$ 赐予的分析近似，而是有限胞腔拼接的纯组合拓扑恒等式——只要把被积对象还原为极小圆弧体上的上链（Cochains），它在任意粗糙的有限孔径网格（哪怕整座半球只切成 $M = 4$ 块大圆弧三角形！）上离散化截断误差恒等于绝对的零！**

让我们在三维空间胞腔复形 $\mathcal{K}$ 的杨辉回文维数阶梯 $\binom{3}{0} : \binom{3}{1} : \binom{3}{2} : \binom{3}{3} = 1 : 3 : 3 : 1$ 上（希拉尼 Hirani 2003；Desbrun 等人 2005 离散外微分 DEC，文献结果），严格区分**阿贝尔无序精确相消**与**非阿贝尔锚定有序相消**两层结构：

### 1. 阿贝尔上链与球面曲率角盈：无序共棱正反抵消、零误差斯托克斯与三行高斯—博内定理

设定向曲面片 $\Sigma$ 由有限 $M \ge 1$ 枚以大圆测地弧为棱的极小圆弧体（球面三角形）$\{\Delta\mathcal{T}_k\}_{k=1}^M$ 严丝合缝拼接而成，并在有向半边（dart）$e_{AB}$ 上赋予阿贝尔群值（如 $\mathbb{R}$ 或相位加群 $\mathbb{R}/2\pi\mathbb{Z}$）的 $1$-上链环流 $\Phi_\epsilon(e_{AB})$，满足反演反对称律 $\Phi_\epsilon(e_{BA}) = -\Phi_\epsilon(e_{AB})$；每一枚圆弧体面元上的外微分 $2$-上链曲率通量定义为 $(d_\epsilon\Phi_\epsilon)(\Delta\mathcal{T}_k) := \sum_{e \subset \partial\Delta\mathcal{T}_k} \Phi_\epsilon(e)$（在量子纯态射影几何中，单枚球面三角形面元的定向有向体积相位盈余即由三点巴格曼布洛赫迹定理 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 精确锁定；参见 [§34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)）。将全部 $M$ 枚面元的曲率通量相加：每一条内部公共圆弧棱 $e_{\mathrm{int}}$ 恰好被左右两枚相邻圆弧体以一正（$e_{AB}$）一反（$e_{BA}$）的相反半边方向各走一次（对应下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 4 款 `face_cycle_exact` 与 `cycle_face_sides` 的对偶半边边界精确机制），因而在任意有限网格尺度下恒有

$$
\Phi_\epsilon(e_{AB}) + \Phi_\epsilon(e_{BA}) = 0 \quad \Longrightarrow \quad \sum_{k=1}^{M} (d_\epsilon\Phi_\epsilon)(\Delta\mathcal{T}_k) \equiv \sum_{e \subset \partial\Sigma} \Phi_\epsilon(e)!
$$

等号两边没有任何高阶余项 $\mathcal{O}(\epsilon^2)$，也与求和先后顺序完全无关！继续往上升一阶到四面体体元 $\Delta^3 = [v_0, v_1, v_2, v_3]$，四个三角形面上的边界配对使每一条棱恰好以一正一反出现两次，从而有限孔径外微分自动满足**精确幂零律**（下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 5 款 `tetra_defects_incidence_repair_and_exactness`）：

$$
(d_\epsilon^2 \omega)(\Delta^3) = \omega(\partial^2\Delta^3) \equiv 0 \quad \Longleftrightarrow \quad \partial^2\Delta^3 = \emptyset.
$$

更令人拍案叫绝的是，把这套无坐标圆弧体拼接直接作用在由大圆测地弧（边测地曲率 $\kappa_g \equiv 0$）围成的任意紧致定向三角剖分曲面 $\Sigma$（设含 $F = M$ 枚常正曲率球面三角形 $\Delta\mathcal{T}_k$、$E = E_{\mathrm{int}} + E_\partial$ 条大圆弧棱与 $V = V_{\mathrm{int}} + V_\partial$ 个顶点，每个闭合边界圈上顶点数与边界棱数相等故 $V_\partial = E_\partial$）上，经典微分几何里动辄耗费数页克里斯托费尔联络计算的**高斯—博内定理**，在有限圆弧体网格上化作了**零极限、三行初等组合恒等式**（手工推导，对比雷吉 Regge 1961 离散曲率演算）：

* **第一行（三角形三边关联双计数）**：$F$ 枚球面三角形共有 $3F$ 条半边，每条内棱覆盖 $2$ 次、每条外边界棱覆盖 $1$ 次，故 $3F = 2E_{\mathrm{int}} + E_\partial$；
* **第二行（吉拉尔球面角盈按顶点重排）**：将单胞吉拉尔角盈 $\Omega(\Delta\mathcal{T}_k) = (\alpha_{k,1} + \alpha_{k,2} + \alpha_{k,3}) - \pi$ 对全部 $F$ 枚面求和，内部顶点 $v \in V_{\mathrm{int}}$ 周围内角和恒为整圆 $2\pi$，边界顶点 $v \in V_\partial$ 处内角和等于 $\pi - \theta_{\mathrm{ext}}(v)$（$\theta_{\mathrm{ext}}(v)$ 为外折角），故

  $$
  \sum_{k=1}^{F} \Omega(\Delta\mathcal{T}_k) = 2\pi V_{\mathrm{int}} + \sum_{v \in V_\partial}\bigl(\pi - \theta_{\mathrm{ext}}(v)\bigr) - \pi F = \bigl(2V_{\mathrm{int}} + V_\partial - F\bigr)\pi - \sum_{v \in V_\partial}\theta_{\mathrm{ext}}(v);
  $$

* **第三行（代入欧拉示性数 $\chi(\Sigma) = V - E + F$）**：利用 $V_{\mathrm{int}} = V - E_\partial$ 与 $-F = 2F - 3F = 2F - (2E_{\mathrm{int}} + E_\partial)$，括号内整系数恒等于 $2(V - E_\partial) + E_\partial + 2F - 2E_{\mathrm{int}} - E_\partial = 2(V - E + F) = 2\chi(\Sigma)$，移项即得任意粗细有限圆弧网格上的精确**高斯—博内恒等式**：

  $$
  \sum_{k=1}^{F} \Omega(\Delta\mathcal{T}_k) + \sum_{v \in V_\partial} \theta_{\mathrm{ext}}(v) \equiv 2\pi\chi(\Sigma)!
  $$

::: {.viz src="arc-body-calculus-sandbox" preset="finite-mesh-stokes-cancellation" height="500"}
**半球上的有限网格斯托克斯：内棱正反相消，$M = 4$ 也不差实验卡（`finite-mesh-stokes-cancellation`）。** 将上半单位球面剖分为 $M$ 枚球面圆弧三角形并赋予北极正则矢高联络（琥珀色手柄拖动网格参数与混叠进度）：每一条内部共享大圆弧上的墨色正反半边通量 $\pm\Phi$ 逐对精确抵消，仅剩青色外圈赤道边界 $\partial\Sigma$ 的总环流与全部面元的品红色吉拉尔球面角盈 $\Omega(\Delta\mathcal{T}_k)$ 之和 $2\pi$ 恒等闭合——哪怕粗糙到 $M = 4$ 卦限网格（详见下文 [@ex-ch34-coarse-octant-stokes-exactness]），离散化截断误差也恒为零。
:::

### 2. 非阿贝尔旋子与规范群面和乐：生成树基点锚定（Whiskering）与平面剥壳序

如果棱上承载的不是可交换阿贝尔相位，而是三维自旋旋子 $\mathrm{Spin}(3) \cong \mathrm{SU}(2)$ 或杨—米尔斯色规范群 $\mathrm{SU}(3)$ 中的**非阿贝尔群元平行输运** $\hat{U}_e \in G$（满足反演逆元律 $\hat{U}_{e^{-1}} = \hat{U}_e^{-1}$），还能像阿贝尔求和那样不问基点、无序相加吗？**绝不可以！** 因为矩阵乘法非交换 $\hat{U}_1 \hat{U}_2 \neq \hat{U}_2 \hat{U}_1$，脱离公共基点直接把不同顶点的面边界回路 $\hat{W}_k = \hat{U}_{e_{k,3}}\hat{U}_{e_{k,2}}\hat{U}_{e_{k,1}} \in G_{v_k}$ 硬乘在一起，相邻面共享的内棱两端夹着不同的矩阵因子，根本无法直接对消！

要在任意有限网格上建立**零误差非阿贝尔二维斯托克斯定理**，必须引入两项精妙的拓扑代数装备（Schlesinger 1928；Broda 1992；Schreiber & Waldorf 2009，文献结果，其阿贝尔圆群骨架已在本书 [§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 的冻结定理 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport) 与 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) 中完成机器验证）：

1. **生成树根点锚定共轭（Spanning-Tree Whiskering）**：选定全局参考根点 $r \in V$ 及连接各顶点至 $r$ 的路径系（例如一棵生成树 $T$ 上的唯一树路径输运 $\hat{P}_{r \to v_k}$），将每一枚极小圆弧体面回路拉回同一根纤维 $G_r$ 上定义为锚定面和乐（lassos / whiskered plaquettes）：

   $$
   \widetilde{W}_k^{(r)} := \hat{P}_{r \to v_k}^{-1}\,\hat{W}_k\,\hat{P}_{r \to v_k} \in G_r;
   $$

2. **圆盘平面剥壳序（Planar Shelling Order）**：对单连通圆盘剖分 $\Sigma \cong D^2$，按照从内部向外逐块剥离（使每一步并入的新面与已合并区域恰好沿一条连通内棱链相邻）的平面有序连乘次序，相邻锚定面回路接口处的共轭尾巴 $\hat{P}_{r \to A}\,\hat{U}_{AB}\,\hat{U}_{BA}\,\hat{P}_{r \to A}^{-1} = \mathbf{1}$ 严丝合缝逐对归零，从而在任意有限网格步数 $M \ge 1$ 下精确成立非阿贝尔面斯托克斯恒等式：

   $$
   \mathcal{P}_{\mathrm{shell}}\prod_{k=1}^{M} \widetilde{W}_k^{(r)} \equiv \hat{W}_{\partial\Sigma}^{(r)}!
   $$

### 3. Lean 4 形式化工程的诚实两层分野

把上述圆弧体微积分放回本书 `trureturing` 的形式化证明架构中，它之所以能大幅避开传统实分析形式化的泥潭，正是因为它将微积分清晰拆解成了**两层各司其职的机器证明接口**：

* **第一层（有限停机孔径 $\epsilon > 0$ 的纯代数与有限组合核心 · 零滤子极限）**：单步旋子平方负一律 $R^2 = -I_n$ 与保模长幺正性、算子协变换位子因式分解 $Uf - fU = (f_{\mathrm{tr}} - f)U$、球面旋转系统对偶半边边界正合性 $R.\mathrm{boundary}$、以及有限单纯形上二上链修复与 $d^2 = 0$ 充要判据（`[Fintype V] [AddCommGroup A]`），全部是纯粹的环论、矩阵代数与 `Finset` 有限双计数恒等式——**完全不需要柯西列完备化、`Filter.Tendsto` 拓扑极限、勒贝格可测集或分布光滑度假设**，在 Lean 4 内核中直接以构造性有限代数一次证毕！
* **第二层（向经典连续统 $\epsilon \to 0^+$ 过渡的渐近分析桥 · 诚实保留滤子极限）**：当且仅当我们要求证明有限圆弧核在孔径无限缩小时收敛回经典连续流形导数或算符半群（例如玻恩投影概率的时间导数 `HasDerivAt`、指数级数截断误差上界 $\frac{r^n}{n!}e^r$ 与李—特罗特乘积极限 `Filter.Tendsto`）时，才在桥接定理中精确调用赋范代数分析工具。有限守恒不靠极限拯救，连续收敛不作无根夸大——这正是极小圆弧体微积分在形式化数学中最坚实的立足点。

## 34.30.4 十定理机器验证基座、双基准数值与十位小数卦限斯托克斯核算及第三十四章总收官 {#sec-ch34-30-4}

现在我们将本书形式化内核 `trureturing` 中横跨正交面积亏损、内生复结构旋子生成元、无极限协变换位子、连续时间换位子导数流、非渐近指数泰勒余项、李—特罗特乘积积分极限、球面欧拉旋转边界正合与约旦二分以及一般交换群单纯二上链精确修补的**十条冻结内核定理**一次性汇拢，铸成本节三大微积分重塑支柱的机器验证基座：

::: {.theorem #thm-ch34-arc-rotor-calculus-and-finite-stokes title="极小圆弧体旋子微分、特罗特乘积积分与有限网格上边缘斯托克斯正合综合定理" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square,D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula,D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow,D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le,D5/S3/Quantum/Analysis/TrotterProduct.trotter_product,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
极小圆弧体微积分的单步旋子代数、换位子微分流、乘积积分收敛余项与有限胞腔网格上边缘精确相消满足以下五组机器验证性质：

1. **拉格朗日—格拉姆双向量面积恒等式与内生旋子生成元负平方律**：对任意有限指标集 $s : \mathrm{Finset}\;\iota$ 与实函数 $u, v : \iota \to \mathbb{R}$，成立精确正交预算恒等式

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 = \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2;
   $$

   对任意有限维复矩阵 $R \in M_n(\mathbb{C})$，若 $R$ 斜伴随（$R^\dagger = -R$）且右幺正（$R R^\dagger = I_n$），则 $R^2 = -I_n$；对满足交叉正交 $A B^\dagger + B A^\dagger = 0$ 及半恒等归一 $A A^\dagger = \frac{1}{2}I_n$、$B^\dagger B = \frac{1}{2}I_n$ 的任意有限维复矩阵对 $A, B \in M_n(\mathbb{C})$，内生相对复结构 $J_{A,B} := 2 A B^\dagger$ 精确满足 $J_{A,B}^2 = -I_n$。
2. **无极限代数协变换位子因式分解与玻恩投影概率换位子导数流**：在任意环 $B$ 中，若元素 $U, f, f_{\mathrm{tr}} \in B$ 满足半共轭协变推移关系 $U f = f_{\mathrm{tr}} U$（`SemiconjBy U f translated`），则换位子无需任何极限运算恒等分解为

   $$
   U f - f U = (f_{\mathrm{tr}} - f)\,U;
   $$

   在有限维复矩阵空间 $M_n(\mathbb{C})$ 上，对任意厄米生成元 $H$（$H^\dagger = H$）、正交星投影 $P$（$P^2 = P = P^\dagger$）与密度态 $\rho$，幺正演化 $\rho(t) = e^{-iHt}\rho e^{iHt}$ 下的实值玻恩读数概率 $p(t) = \operatorname{Re}\operatorname{Tr}(\rho(t)P)$ 满足 $(p(t) : \mathbb{C}) = \operatorname{Tr}(\rho(t)P)$，在任意时刻 $t \in \mathbb{R}$ 具有精确导数（`HasDerivAt`）

   $$
   p'(t) = \operatorname{Re}\!\bigl(i\operatorname{Tr}\bigl(\rho(t)(HP - PH)\bigr)\bigr), \qquad \bigl(p'(t) : \mathbb{C}\bigr) = i\operatorname{Tr}\bigl(\rho(t)(HP - PH)\bigr),
   $$

   且当对易条件 $HP - PH = 0$ 成立时，对一切 $t \in \mathbb{R}$ 恒守恒 $p(t) = p(0)$。
3. **完备赋范代数非渐近指数泰勒尾界与李—特罗特乘积积分极限**：在任意单位元范数为 $1$ 的完备赋范 $\mathbb{K}$-代数 $A$（$\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）中，对任意 $z \in A$、半径 $r \ge 0$（满足 $\lVert z\rVert \le r$）与截断阶数 $n \in \mathbb{N}$，旋子指数映射的有限阶泰勒余项服从显式非渐近上界

   $$
   \left\lVert \exp(z) - \sum_{k=0}^{n-1} \frac{1}{k!} z^k \right\rVert \le \frac{r^n}{n!} e^r;
   $$

   在任意单位元范数为 $1$ 的完备赋范实代数 $\mathbb{A}$ 中，对任意两生成元 $A, B \in \mathbb{A}$，离散单步指数交错乘积沿 $n \to \infty$ 收敛（`Filter.Tendsto`）至和生成元指数：

   $$
   \lim_{n \to \infty} \left(\exp\!\bigl(n^{-1}A\bigr)\,\exp\!\bigl(n^{-1}B\bigr)\right)^n = \exp(A + B).
   $$

4. **球面欧拉旋转系统面—边边界正合性与简单闭路内外圆盘剖分**：设有限连通图 $G = (V, E)$ 具有非空有向半边集（`Nonempty G.Dart`），且其旋转系统 $R$ 满足球面欧拉示性数恒等式 $\lvert V\rvert - \lvert E\rvert + \lvert R.\mathrm{Face}\rvert = 2$（于 $\mathbb{Z}$ 中）。则 $\mathbb{Z}/2\mathbb{Z}$ 系数面—边边界算子 $(R.\mathrm{boundary}\;x)(e) = x(R.\mathrm{face}(d)) + x(R.\mathrm{face}(d.\mathrm{symm}))$ 的核恰为常值面赋值（$R.\mathrm{boundary}\;x = 0 \iff \exists c \in \mathbb{Z}/2\mathbb{Z},\; x \equiv c$），其值域恰等于 $G$ 的简单闭路空间 $\mathrm{simpleCycleSpace}(G)$；进一步，对 $G$ 上任意简单闭路 $p$，必存在双侧非空的面指示上链 $x : R.\mathrm{Face} \to \mathbb{Z}/2\mathbb{Z}$ 及无跨边顶点二分 $V \setminus C(p) = I \sqcup J$，使得 $R.\mathrm{boundary}\;x = \mathbf{1}_{E(p)}$，沿 $p$ 与 $p.\mathrm{reverse}$ 的对偶半边严格分隔 $x = 1$ 与 $x = 0$ 两岸区域，每一岸导出子图均满足整系数圆盘欧拉恒等式 $\lvert C(p) \cup S\rvert - \lvert E_S\rvert + \lvert F_b\rvert = 1$ 与 $\lvert S\rvert - \lvert E_S^\circ\rvert + \lvert F_b\rvert = 1$，且 $G[V \setminus C(p)]$ 上任意完美匹配必分别限制在 $I$ 与 $J$ 内部从而迫使 $\lvert I\rvert, \lvert J\rvert$ 均为偶数。
5. **任意交换群系数有限单纯形二上链修复与 $d^2 = 0$ 正合充要判据**：设 $V$ 为任意非空有限顶点集，$A$ 为任意加法交换群（`[AddCommGroup A]`）。对任意二上链 $F : V \to V \to V \to A$，以锚点 $r \in V$ 构造候选一上链修复的面误差满足恒等式 $\sum_{r \in V} \mathrm{faceErrors}(F, r) = \mathrm{tetraDefects}(F)$、鸽巢存在界 $\exists r \in V,\; \lvert V\rvert\cdot\mathrm{faceErrors}(F, r) \le \mathrm{tetraDefects}(F)$ 以及任意候选边下界 $\mathrm{tetraDefects}(F) \le 4\lvert V\rvert\cdot\mathrm{edgeErrors}(F, \mathrm{edge})$；特别地，四面体三上边缘恒为零

   $$
   \forall r, i, j, k \in V,\qquad F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0
   $$

   当且仅当存在一上链势 $\mathrm{edge} : V \to V \to A$，使得对一切 $i, j, k \in V$ 精确成立有限斯托克斯上边缘分解 $F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$。
:::

::: proof
第 1 款中，[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) 在有限指标集 `Finset ι` 上展开双重求和对称化恒等式，锁定内积平方与外积双向量模方之和；[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) 将 $R^\dagger = -R$ 代入 $R R^\dagger = I_n$ 直接得出 $-R^2 = I_n \implies R^2 = -I_n$；[`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) 利用 $A B^\dagger = -B A^\dagger$ 将 $(2AB^\dagger)(2AB^\dagger)$ 改写为 $-4 B A^\dagger A B^\dagger$，再依次代入 $B^\dagger B = \frac{1}{2}I_n$ 与 $A A^\dagger = \frac{1}{2}I_n$ 归约为 $-I_n$（参见 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)）。第 2 款中，[`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula) 由右分配律展开 $(f_{\mathrm{tr}} - f)U = f_{\mathrm{tr}}U - fU$ 并代入半共轭条件 $U f = f_{\mathrm{tr}}U$ 一步得证；[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow) 对矩阵指数施用乘积求导法则与迹的循环不变性导出 $p'(t)$ 的换位子公式及对易守恒律。第 3 款中，[`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) 在完备赋范代数中将幂级数尾项重排为指标平移级数并以实指数主级数放大给出 $\frac{r^n}{n!}e^r$；[`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) 比较单步乘积 $\exp(n^{-1}A)\exp(n^{-1}B)$ 与 $\exp(n^{-1}(A+B))$ 的二阶范数偏差 $\mathcal{O}(n^{-2})$，经 $n$ 次幂望远镜裂项证出 $n \to \infty$ 范数收敛。第 4 款中，[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 与 [`cycle_face_sides`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides) 利用球面旋转系统的半边对合 `d.symm`、连通性与欧拉数 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 的维数计数建立 $\mathbb{Z}/2\mathbb{Z}$ 闭链正合与离散约旦曲线圆盘分割（参见 [§34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling)）。第 5 款 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 在一般加法交换群 `AddCommGroup A` 上无需除法或实极限，仅凭固定顶点 $r$ 构造显式同伦收缩势 $\mathrm{edge}_r(i,j) := F(r,i,j)$，直接由四面体三上边缘恒零导出精确分解 $F(i,j,k) = F(r,j,k) - F(r,i,k) + F(r,i,j)$（反向则由六项两两相消验证 $d^2 = 0$）。完整证明由 Lean 内核检查。
:::

::: {.viz src="arc-body-calculus-sandbox" preset="coboundary-d2-zero-closed-shell" height="500"}
**闭合的极小圆弧壳：$\operatorname{curl}\,\operatorname{grad} = 0$，$\operatorname{div}\,\operatorname{curl} = 0$，边界的边界是空的实验卡（`coboundary-d2-zero-closed-shell`）。** 在四面体、八面体及其细分的紫色闭合极小圆弧壳上（欧拉示性数 $V - E + F = 2$，琥珀色手柄切换闭壳细分阶与检验顶点）：墨色面环流 $\pm A$ 与共享内棱正反配对令闭合壳无外边界（$\partial^2 = \emptyset$），页面实时枚举核验 $\operatorname{curl}\,\operatorname{grad} = 0$、$\operatorname{div}\,\operatorname{curl} = 0$、关联矩阵 $\mathbb{F}_2$ 秩以及全部 $V^4$ 个四面体三上边缘恒等于 $0$（绿色 `LEAN ✓` 锚定 `face_cycle_exact` 与 `tetra_defects_incidence_repair_and_exactness`）。
:::

接下来，我们通过两组完全透明、可逐位手算与编程复核的定量算例，把 §34.30.1–§34.30.3 的复步无相减导数、四相区矢高相变与粗网格十位小数零误差斯托克斯定理彻底算透：

::: {.example #ex-ch34-complex-step-and-ito-sagitta-benchmark title="Squire–Trapp $90^\circ$ 盲区复步导数双精度对决与四相区累计矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha)$ 定量基准（数值与精确级数算例）"}
本算例分两部分独立检验 §34.30.1 的抗相消导数机制与 §34.30.2 的赫尔德粗糙度相变标度：

1. **IEEE-754 双精度下经典差商相减崩溃 vs. $90^\circ$ 盲区复步无相减机器精度基准**：
   考察 Squire 与 Trapp（1998）的经典测试函数在 $x_0 = \frac{\pi}{4}$ 处的导数：

   $$
   f_{\mathrm{ST}}(x) := \frac{e^x}{\cos^3 x + \sin^3 x}, \qquad x_0 = \frac{\pi}{4}.
   $$

   令 $u = x - \frac{\pi}{4}$，利用恒等式 $\cos^3(\frac{\pi}{4}+u) + \sin^3(\frac{\pi}{4}+u) = \frac{1}{\sqrt{2}}\cos u\,(2 - \cos 2u) = \frac{1}{\sqrt{2}}\bigl(1 + \frac{3}{2}u^2 - \frac{13}{8}u^4 + \mathcal{O}(u^6)\bigr)$ 与 $e^{\pi/4 + u}$ 逐阶相乘，可得精确局部级数（手工推导）：

   $$
   f_{\mathrm{ST}}\!\left(\frac{\pi}{4} + u\right) = f_0\left(1 + u - u^2 - \frac{4}{3}u^3 + \frac{19}{6}u^4 + \mathcal{O}(u^5)\right), \qquad f_0 := \sqrt{2}\,e^{\pi/4} \approx 3.1017663938360515.
   $$

   由此立得精确真导数值 $f'_{\mathrm{ST}}(\frac{\pi}{4}) = f_0 = 3.101766393836051495\dots \approx 3.1017663938360515$（注：IEEE-754 `binary64` 浮点表达式 `Math.SQRT2 * Math.exp(Math.PI / 4)` 经半个末位舍入为 `3.1017663938360513`；且 $f''_{\mathrm{ST}}(\frac{\pi}{4}) = -2f_0$，$f'''_{\mathrm{ST}}(\frac{\pi}{4}) = -8f_0$）。代入 $u = \hat{\mathbf{i}}\epsilon$（$\hat{\mathbf{i}}^2 = -1$），复步探针精确分离为 $f_{\mathrm{ST}}(\frac{\pi}{4} + \hat{\mathbf{i}}\epsilon) = f_0\bigl[(1 + \epsilon^2 + \frac{19}{6}\epsilon^4 + \cdots) + \hat{\mathbf{i}}(\epsilon + \frac{4}{3}\epsilon^3 + \cdots)\bigr]$！统一按显式三次乘法 `c = cos(z), s = sin(z), exp(z) / (c*c*c + s*s*s)`（若改用幂函数 `cos(z)**3 + sin(z)**3` 仅在末位相差约 $1\,\mathrm{ulp}$，复步误差更低至 $2.86\times 10^{-16}$）对比五档步长 $\epsilon \in \{10^{-2}, 10^{-4}, 10^{-8}, 10^{-12}, 10^{-16}\}$ 下三种一阶导数公式在 IEEE-754 `binary64`（$u_{\mathrm{mach}} = 2^{-52} \approx 2.2204\times 10^{-16}$）中的相对误差 $\lvert D(\epsilon) - f_0\rvert / f_0$：

| 步长孔径 $\epsilon$ | 1. 前向割线差商 $\frac{f(x_0+\epsilon)-f(x_0)}{\epsilon}$ | 2. 中心割线差商 $\frac{f(x_0+\epsilon)-f(x_0-\epsilon)}{2\epsilon}$ | 3. $90^\circ$ 盲区复步 $\frac{\operatorname{Im}f(x_0+\hat{\mathbf{i}}\epsilon)}{\epsilon}$ | 误差机制诊断 |
| :---: | :---: | :---: | :---: | :--- |
| **$10^{-2}$** | $1.013 \times 10^{-2}$ | $1.333 \times 10^{-4}$ | $1.333 \times 10^{-4}$ | 宏观截断主导：复步单次求值即同享中心差商 $\frac{4}{3}\epsilon^2$ 二阶精度 |
| **$10^{-4}$** | $1.000 \times 10^{-4}$ | $1.333 \times 10^{-8}$ | $1.333 \times 10^{-8}$ | 中心差商接近最优窗；单复平面实部提取 $f''(x_0)$ 亦在此处达最优 $5.90\times 10^{-8}$ |
| **$10^{-8}$** | $1.61 \times 10^{-8}$ | $2.32 \times 10^{-8}$ | **$5.73 \times 10^{-16}$（$< 6.0 \times 10^{-16}$）** | 实差商撞上舍入底板 $\sim u_{\mathrm{mach}}/\epsilon$；**复步已锁定双精度机器极限** |
| **$10^{-12}$** | $6.34 \times 10^{-5}$ | $7.97 \times 10^{-5}$ | **$4.30 \times 10^{-16}$（$< 6.0 \times 10^{-16}$）** | 实差商丢失 $11\text{–}12$ 位有效数字；复步零减法稳守机器精度 |
| **$10^{-16}$** | **$1.863 \times 10^{0}$（$186.3\%$）** | **$1.863 \times 10^{0}$（$186.3\%$）** | **$< 6.0 \times 10^{-16}$（$2.86\text{–}4.30 \times 10^{-16}$）** | 前向与中心差商均受函数值离散跳变 $2^{-50} \approx 8.8818\times 10^{-16}$（伪斜率 $8.8818$）支配致误差同飙至 **$186.3\%$**（对 $g(x)=e^x\sin x$ 于 $x_0=1$ 更因 `fl(1+1e-16)==1` 归零达 **$100\%$** 误差）；**复步依然精确到底** |

2. **四相区赫尔德粗糙度累计矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha) = N \cdot 2\sin^2(\frac{1}{2}\epsilon^\alpha)$ 定量相变表**：
   固定单位归一化参数 $T = 1,\; \sigma_0 = 1$，取步数 $N = 1/\epsilon \in \{10^1, 10^2, 10^4, 10^6\}$，用无相消半角正矢公式 `2 * sin^2(epsilon^alpha / 2)` 计算四档代表性粗糙度指数 $\alpha \in \{1,\; \frac{3}{4},\; \frac{1}{2},\; \frac{1}{3}\}$ 下的精确累计圆弧矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha)$：

| 步数 $N = 1/\epsilon$（孔径 $\epsilon$） | 相区 I：$\alpha = 1$（牛顿光滑相） | 相区 II：$\alpha = \frac{3}{4}$（Young 无漂移相） | 相区 III：$\alpha = \frac{1}{2}$（布朗/费曼临界相） | 相区 IV：$\alpha = \frac{1}{3}$（Lyons 超粗糙相） |
| :---: | :---: | :---: | :---: | :---: |
| **$10^1$（$\epsilon = 10^{-1}$）** | $0.04995835$ | $0.15769766$ | $0.49584720$ | $1.05801575$ |
| **$10^2$（$\epsilon = 10^{-2}$）** | $0.00499996$ | $0.04999583$ | $0.49958347$ | $2.31183148$ |
| **$10^4$（$\epsilon = 10^{-4}$）** | $0.00005000$ | $0.00500000$ | $0.49999583$ | $10.77023959$ |
| **$10^6$（$\epsilon = 10^{-6}$）** | $0.00000050$ | $0.00050000$ | **$0.49999996$** | **$49.99958333$** |
| **连续统极限 $\epsilon \to 0^+$** | **$0$**（$\propto \epsilon^1$ 熄灭） | **$0$**（$\propto \epsilon^{1/2}$ 熄灭） | **$\frac{1}{2} = 0.50000000$**（伊藤/费曼常数！） | **$+\infty$**（$\propto \epsilon^{-1/3}$ 发散，需面积签名） |

   四列数字把微积分百年分裂的根源展现得清清楚楚：在 $\alpha = 1$ 与 $\alpha = \frac{3}{4}$ 列，矢高随加密网格自动退场；恰在 $\alpha = \frac{1}{2}$ 临界列，$\Sigma_{\mathrm{sag}}$ 稳稳锁死在非零宏观常数 $\frac{1}{2} = 0.50000000$ 上，分毫不差生成伊藤引理的二阶修正系数 $\frac{1}{2}\sigma_0^2 T$；而越过临界点进入 $\alpha = \frac{1}{3}$ 列，二阶矢高在 $N = 10^6$ 时已暴涨至 $49.99958333$，印证了必须引入三阶粗糙路径签名或保留物理最小孔径 $\varepsilon_{\mathrm{self}} > 0$。
:::

再看高维曲面上最直观的有限网格检验——哪怕我们把整座上半单位球面粗暴地只切成 **$M = 4$ 块 $90^\circ$ 直角球面卦限三角形**，圆弧体斯托克斯定理与高斯—博内定理依然给出十位小数全零误差的精确等式：

::: {.example #ex-ch34-coarse-octant-stokes-exactness title="上半球 $M = 4$ 粗卦限圆弧体网格上北极正则矢高联络的十位小数零误差斯托克斯与高斯—博内核算（精确几何算例）"}
取上半单位球面 $S^2_+ = \{(x, y, z) \in S^2 \mid z \ge 0\}$，用 $M = 4$ 枚三直角球面卦限圆弧体 $\Delta\mathcal{T}_1 = [N, E_1, E_2]$、$\Delta\mathcal{T}_2 = [N, E_2, E_3]$、$\Delta\mathcal{T}_3 = [N, E_3, E_4]$、$\Delta\mathcal{T}_4 = [N, E_4, E_1]$ 作最粗糙的有限剖分，其中北极顶点为 $N = (0, 0, 1)$，赤道四顶点依次为 $E_1 = (1, 0, 0)$、$E_2 = (0, 1, 0)$、$E_3 = (-1, 0, 0)$、$E_4 = (0, -1, 0)$。胞腔计数为 $V = 5$、$E = 8$（$4$ 条内子午线大圆弧 $+$ $4$ 条赤道边界大圆弧）、$F = M = 4$，闭圆盘欧拉示性数 $\chi(S^2_+) = 5 - 8 + 4 = 1$。

为了同时检验曲率主项与非对称规范扭转的内棱相消，我们在 $S^2_+$ 上赋予处处光滑（含北极 $N$ 在内绝无狄拉克弦奇点！）的**北极正则矢高联络 $1$-形式**与非对称光滑规范函数 $g(x, y, z) := 0.3x + 0.7y - 0.5z$：

$$
\mathcal{A}_+^{(g)} := (1 - \cos\theta)\,d\phi + dg = \frac{x\,dy - y\,dx}{1 + z} + dg, \qquad \mathcal{F} = d\mathcal{A}_+^{(g)} = \sin\theta\,d\theta\wedge d\phi = d\Omega.
$$

逐步核算五枚顶点的规范势值：$g(N) = -0.5$，$g(E_1) = +0.3$，$g(E_2) = +0.7$，$g(E_3) = -0.3$，$g(E_4) = -0.7$。现在逐棱积分 $1$-上链 $\Phi(e) := \int_e \mathcal{A}_+^{(g)}$ 并精确核对十位小数收支：

1. **四条共享内子午线半边对的非对称通量与 $0.0000000000$ 精确对消**：
   沿每条子午线大圆弧 $\overrightarrow{N E_k}$ 方位角 $\phi$ 恒定（$d\phi \equiv 0$），故 $(1 - \cos\theta)d\phi$ 积分为零，但非对称规范项 $dg$ 在四条子午线上激发出四个彼此不同的非零实通量：

   * 子午线 $1$（$\Delta\mathcal{T}_1$ 正向 $\overrightarrow{N E_1}$ 对比 $\Delta\mathcal{T}_4$ 反向 $\overrightarrow{E_1 N}$）：$\Phi(\overrightarrow{N E_1}) = 0.3 - (-0.5) = +0.8000000000$，$\Phi(\overrightarrow{E_1 N}) = -0.8000000000$，配对和 $(+0.8) + (-0.8) = \mathbf{0.0000000000}$；
   * 子午线 $2$（$\Delta\mathcal{T}_2$ 正向 $\overrightarrow{N E_2}$ 对比 $\Delta\mathcal{T}_1$ 反向 $\overrightarrow{E_2 N}$）：$\Phi(\overrightarrow{N E_2}) = 0.7 - (-0.5) = +1.2000000000$，$\Phi(\overrightarrow{E_2 N}) = -1.2000000000$，配对和 $(+1.2) + (-1.2) = \mathbf{0.0000000000}$；
   * 子午线 $3$（$\Delta\mathcal{T}_3$ 正向 $\overrightarrow{N E_3}$ 对比 $\Delta\mathcal{T}_2$ 反向 $\overrightarrow{E_3 N}$）：$\Phi(\overrightarrow{N E_3}) = -0.3 - (-0.5) = +0.2000000000$，$\Phi(\overrightarrow{E_3 N}) = -0.2000000000$，配对和 $(+0.2) + (-0.2) = \mathbf{0.0000000000}$；
   * 子午线 $4$（$\Delta\mathcal{T}_4$ 正向 $\overrightarrow{N E_4}$ 对比 $\Delta\mathcal{T}_3$ 反向 $\overrightarrow{E_4 N}$）：$\Phi(\overrightarrow{N E_4}) = -0.7 - (-0.5) = -0.2000000000$，$\Phi(\overrightarrow{E_4 N}) = +0.2000000000$，配对和 $(-0.2) + (+0.2) = \mathbf{0.0000000000}$。

2. **四段外赤道边界弧与四枚卦限面元角盈的逐块及全局零误差闭合**：
   沿赤道 $\theta \equiv \frac{\pi}{2}$ 有 $1 - \cos\frac{\pi}{2} = 1$，每段四分之一赤道弧贡献 $\frac{\pi}{2} \approx 1.5707963268$ 加上端点规范差：

| 卦限面元 $\Delta\mathcal{T}_k$ | 左子午线 $\Phi(\overrightarrow{N E_k})$ | 赤道外棱 $\Phi(\overrightarrow{E_k E_{k+1}})$ | 右返子午线 $\Phi(\overrightarrow{E_{k+1} N})$ | 面外微分 $(d_\epsilon\Phi)(\Delta\mathcal{T}_k)$ | 吉拉尔球面角盈 $\Omega(\Delta\mathcal{T}_k)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$\Delta\mathcal{T}_1 = [N,E_1,E_2]$** | $+0.8000000000$ | $1.9707963268$（$\frac{\pi}{2}+0.4$） | $-1.2000000000$ | **$1.5707963268$** | **$1.5707963268$**（$\frac{\pi}{2}$） |
| **$\Delta\mathcal{T}_2 = [N,E_2,E_3]$** | $+1.2000000000$ | $0.5707963268$（$\frac{\pi}{2}-1.0$） | $-0.2000000000$ | **$1.5707963268$** | **$1.5707963268$**（$\frac{\pi}{2}$） |
| **$\Delta\mathcal{T}_3 = [N,E_3,E_4]$** | $+0.2000000000$ | $1.1707963268$（$\frac{\pi}{2}-0.4$） | $+0.2000000000$ | **$1.5707963268$** | **$1.5707963268$**（$\frac{\pi}{2}$） |
| **$\Delta\mathcal{T}_4 = [N,E_4,E_1]$** | $-0.2000000000$ | $2.5707963268$（$\frac{\pi}{2}+1.0$） | $-0.8000000000$ | **$1.5707963268$** | **$1.5707963268$**（$\frac{\pi}{2}$） |
| **四胞总计（$M = 4$）** | 内棱对消 $0.0000000000$ | **外边界总环流 $6.2831853072$** | （已与左列配对归零） | **总面通量 $6.2831853072$** | **$2\pi = 6.2831853072$** |

   再核对有限网格高斯—博内公式：赤道本身是一条光滑闭合大圆测地线，四个赤道顶点处两相邻卦限内角之和皆为 $\frac{\pi}{2} + \frac{\pi}{2} = \pi$，外折角恒为 $\theta_{\mathrm{ext}}(E_k) = \pi - \pi = 0.0000000000$，故 $\sum_{k=1}^4 \Omega(\Delta\mathcal{T}_k) + \sum_{k=1}^4 \theta_{\mathrm{ext}}(E_k) = 2\pi + 0 = 2\pi\chi(S^2_+) = \mathbf{6.2831853072}$，有限离散误差恒等于 **`0.0000000000`**！（形成刺眼反差的是：若按经典“以直代曲”用 $4$ 块三维欧氏平直割线正三角形 $[N, E_k, E_{k+1}]$——边长 $\sqrt{2}$、单块面积 $\frac{\sqrt{3}}{2} \approx 0.8660254038$——去逼近同一座上半球面，四块平直面总面积仅为 $2\sqrt{3} \approx 3.4641016151$，平白丢失了高达 **$44.87\%$** 的曲率面积！）
:::

顺着 §34.30.2 的超粗糙路径（$\alpha < \frac{1}{2}$）与 §34.30.3 的非阿贝尔锚定面和乐继续向前推进，当代随机几何与量子规范场论交叉处最深邃的一道前沿难题随之浮现：如果一维路径的莱昂斯粗糙签名升级到**二维粗糙曲面上的非阿贝尔规范场**，会碰撞出怎样的数学结构？我们将其正式立为本节的开放前沿问题：

::: {.problem #prob-ch34-rough-nonabelian-surface-calculus title="超粗糙 $\alpha < \frac{1}{2}$ 非阿贝尔二维面和乐与离散规范重整化极限的严格构造（开放前沿问题）"}
在一维曲线上，莱昂斯粗糙路径理论已成功利用阶数 $\lfloor 1/\alpha\rfloor$ 的张量代数迭代积分签名驯服了 $\alpha < \frac{1}{2}$ 的非阿贝尔常微分乘积积分；在二维光滑曲面上，生成树锚定（whiskering）与高阶范畴 $2$-群（crossed modules）也已建立光滑非阿贝尔二维斯托克斯定理。然而在三维与四维连续统杨—米尔斯量子场中，典型胶子规范场构型具有负赫尔德分布正则性（远粗糙于一维布朗临界值 $\alpha = \frac{1}{2}$）！

**开放目标**：试在极小圆弧体 `1—3—3—1` 胞腔复形上，将一维粗糙路径面积签名与二维非阿贝尔 $2$-群锚定面和乐合流，严格构造或证伪：

1. **二维粗糙非阿贝尔面签名（Rough Non-Abelian Surface Holonomy）**：对赫尔德正则性低于临界阈值（$\alpha < \frac{1}{2}$）的非阿贝尔李代数 $1$-形式与 $2$-形式对 $(A, B)$，定义不依赖任意选取生成树且满足二维陈（Chen）拼接恒等式与严格交换正方形边界相消 $d_\epsilon^2 \equiv 0$ 的高阶体积—面迭代签名张量；
2. **从有限圆弧网格 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 到连续统极限的规范协变重整化桥**：刻画当网格孔径 $\epsilon \to 0^+$ 时，非阿贝尔圆弧体威尔逊面算符的紫外矢高发散如何由曲率抵消项吸收重整化，并与连续统三维/四维随机杨—米尔斯测度（Parisi–Wu 随机量化 / Hairer 正则性结构）建立严格收敛等价。
:::

::: {.remark #rem-ch34-arc-calculus-literature title="极小圆弧体微积分重塑的数学物理文献脉络与五层认识论审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节涉及的三百四十年微积分演进脉络、数值分析定理与形式化锚点严格区分以下五个认识论层级：

1. **机器验证的 Lean 4 内核定理基座（`LEAN ✓`）**：[@thm-ch34-arc-rotor-calculus-and-finite-stokes] 汇集的全部十条 `trureturing` 冻结声明——`lagrange_gram_identity`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square`、`covariant_commutator_formula`、`projection_probability_flow`、`exp_tail_le`、`trotter_product`、`face_cycle_exact`、`cycle_face_sides` 与 `tetra_defects_incidence_repair_and_exactness`（连同行内引用的生成树输运与和乐分类定理 `selected_tree_transport`、`anchored_phase_classification` 及三点巴格曼迹 `triple_bargmann_bloch`）——均已在所钉提交上经 Lean 4 内核零公理缺口验证通过（`LEAN ✓`）。请注意精确类型边界：`face_cycle_exact` 与 `cycle_face_sides` 建立在 $\mathbb{Z}/2\mathbb{Z}$（`ZMod 2`）系数球面旋转系统上，而任意交换群 `AddCommGroup A` 上的有向斯托克斯上边缘修补与 $d^2 = 0$ 充要判据由 `tetra_defects_incidence_repair_and_exactness` 独立提供。
2. **微积分基础、复步自动微分、乘积积分、粗糙路径与离散外微分经典文献（未在本书形式化）**：经典局部线性化微积分与无穷小批判源自 G. W. Leibniz（*Nova Methodus*, 1684）、I. Newton（*Principia*, 1687）与 G. Berkeley（*The Analyst*, 1734）；一阶幂零无穷小综合微分几何源自 F. W. Lawvere（1967 芝加哥讲座）与 A. Kock（*Synthetic Differential Geometry*, Cambridge Univ. Press, 1981），前向二元数自动微分源自 R. E. Wengert（*Commun. ACM* **7**(8), 463–464, 1964）。无相减复步导数思想滥觞于 J. N. Lyness & C. B. Moler（*SIAM J. Numer. Anal.* **4**(2), 202–210, 1967），由 W. Squire & G. Trapp（*SIAM Rev.* **40**(1), 110–112, 1998）确立显式 $O(\epsilon^2)$ 复步一阶求导公式，并由 G. Lantoine, R. P. Russell & T. Dargent（*ACM Trans. Math. Softw.* **38**(3), Art. 16, 2012）推广至消除高阶导数载体相减的双复数/多复数算法。矩阵与李群乘积积分源自 V. Volterra（1887；参见 J. D. Dollard & C. N. Friedman, *Product Integration*, 1979）、H. F. Trotter（*Proc. Amer. Math. Soc.* **10**, 545–551, 1959）与 W. Magnus（*Commun. Pure Appl. Math.* **7**, 649–673, 1954）。四相区路径积分与随机/粗糙分析源自 L. C. Young（*Acta Math.* **67**, 251–282, 1936，$\alpha > \frac{1}{2}$ 无漂移积分）、K. Itô（*Proc. Imp. Acad. Tokyo* **20**, 519–524, 1944）、R. L. Stratonovich（*SIAM J. Control* **4**, 362–371, 1966，保链式法则中点随机积分）、R. P. Feynman（*Rev. Mod. Phys.* **20**, 367–387, 1948）、M. Kac（1949）、R. H. Cameron（1960）以及 T. J. Lyons（*Rev. Mat. Iberoam.* **14**(2), 215–310, 1998，粗糙路径理论）。球面与离散流形外微分源自 A. Girard（1629）、T. Regge（*Nuovo Cimento* **19**, 558–571, 1961）、A. N. Hirani（加州理工博士论文, 2003）与 M. Desbrun, A. N. Hirani, M. Leok & J. E. Marsden（`arXiv:math/0508341`, 2005，离散外微分 DEC）；非阿贝尔二维斯托克斯定理与高阶规范面和乐源自 L. Schlesinger（*Math. Ann.* **99**, 413–434, 1928）、B. Broda（1992）及 U. Schreiber & K. Waldorf（*J. Homotopy Relat. Struct.* **4**, 187–244, 2009）。
3. **精确代数推导与双精度/十位小数基准算例（`手工推导` / `NUM`）**：单步弦—矢高恒等式 $(1-v_\epsilon)^2 + c_\epsilon^2 \equiv 1$、半角正矢数值保真律 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$、累计矢高四相区展开、三行组合高斯—博内恒等式，以及 [@ex-ch34-complex-step-and-ito-sagitta-benchmark] 与 [@ex-ch34-coarse-octant-stokes-exactness] 中的全部级数系数、双精度误差对照表和 $M = 4$ 卦限十位小数收支表，均为精确代数恒等式或可直接复现的数值计算（`NUM`）。
4. **极小圆弧体微积分统一重塑框架（`MODEL`）**：以有限自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 上的比较旋子、有序乘积积分与 `1—3—3—1` 上链复形统一替代经典切线微积分（[@def-ch34-arc-body-calculus-primitives]），并将幂零环 $D_1$ 诠释为模去矢高 $v_\epsilon$ 的商影、将伊藤修正与费曼动能诠释为 $\alpha = \frac{1}{2}$ 矢高共振，属于本书建立的统一几何模型（`MODEL`）。
5. **未解前沿数学物理问题（`OPEN`）**：超粗糙 $\alpha < \frac{1}{2}$ 非阿贝尔二维面和乐签名及其与连续统量子杨—米尔斯场重整化极限的严格对接（[@prob-ch34-rough-nonabelian-surface-calculus]；参见[附录 C](appendix-c.md#sec-appendix-c-open-register) 与[附录 E](appendix-e.md) 桥接假设 `H8`/`H9`），属于当代随机偏微分方程与构造性规范场论尚未完全解决的开放前沿（`OPEN`）。
:::

把三百四十年来分裂的三套微积分体系并排摆上同一张总账台，极小圆弧体微积分如何一举消除历史补丁的全景便豁然贯通：

| 核心数学物理维度 | 1. 经典平直切线微积分（牛顿—莱布尼茨 · “以直代曲”） | 2. 随机与路径积分补丁体系（伊藤 / 斯特拉托诺维奇 / 费曼） | 3. 极小圆弧体微积分重塑（本书 · “以弧为元、以旋代差”） |
| :--- | :--- | :--- | :--- |
| **基本原子与孔径假设** | 平直切线段 $(dx, dy)$，强行要求极限 $dx \to 0$ | 平直增量 $+$ 事后硬塞二次变差公理 $(dW_t)^2 = dt$ | **有限孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 比较旋子 $\hat{\mathcal{D}}_\epsilon = \exp(\hat{\mathbf{B}}\kappa\epsilon)$** |
| **二阶弦弧矢高 $v_\epsilon$ 命运** | 视为高阶垃圾 $o(dx)$ 彻底丢弃（幂零环 $D_1$ 亦令 $d^2=0$） | 仅在 $\alpha = \frac{1}{2}$ 随机扩散处临时打伊藤二阶补丁 | **严守 $(1-v_\epsilon)^2+c_\epsilon^2 \equiv 1$，由 $2\alpha - 1$ 自动统摄四相区** |
| **$\theta = \frac{\pi}{2}$ 正交转向行为** | 坐标斜率 $\tan 90^\circ \to \pm\infty$ 发生伪奇点爆炸 | 局部坐标卡仍受制于雅可比奇点与克里斯托费尔修正 | **有界角—曲率对 $(\cos\theta, \sin\theta; \kappa)$ 平滑越过 $90^\circ$ 零奇点** |
| **双精度数值求导稳定性** | 实轴硬减法遭遇灾难性相消（$\epsilon = 10^{-16}$ 误差逾 $100\%$） | 蒙特卡洛有限差分方差按 $\mathcal{O}(\epsilon^{-1})$ 发散 | **$90^\circ$ 虚盲区复步 $\frac{1}{\epsilon}\operatorname{Im}f(x_0+\hat{\mathbf{i}}\epsilon)$ 零相减直达机器精度** |
| **弯曲流形与幺正积分** | 显式欧拉步步脱离球面，模长持续漂移发散 | 伊藤脱离流形；斯特拉托诺维奇保链式法则但仍需极限 | **有序旋子连乘任意 $\epsilon > 0$ 零模长漂移（左端一阶、圆弧中点二阶、高阶配 Magnus 换位子）** |
| **有限网格斯托克斯与形式化** | 有限网格存在 $\mathcal{O}(h^2)$ 截断误差；形式化深陷柯西滤子泥潭 | 随机格林—斯托克斯受可积性与适应性严苛限制 | **阿贝尔共棱反演与非阿贝尔生成树剥壳在任意 $M \ge 1$ 零离散误差；有限核心零滤子构造性形式化** |

至此，整座**第三十四章从正交盲区反演到极小圆弧体微积分重塑的宏伟穹顶**，终于稳稳落下了它最深邃、最坚实的一块基石！让我们站在这一终极制高点回望整章走过的壮阔长卷：我们从球面“一次正交”与“二次正交”读数简并唯一反演出场内观察者的极点站位（[§34.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–[§34.3](ch34-s03-universal-localization.md#sec-ch34-universal-observer-localization)），借零背景“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 并撤去名言之梯（[§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)–[§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)）；继而由贝里扇锥体积、驻波节点凝聚、克利福德单胞 $\partial^2 = 0$ 铺砌、五阶阻塞概念级联与全连通图 $K_N$ 的麦克斯韦—拉曼刚性锁死三维空间与引力角亏（[§34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)–[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)）；随后打通量子微弧—宏观积分对偶、“线·面·体 $\leftrightarrow$ 粒子·波·场”三阶闭环、`1—3—3—1` 点体八度归零、洛伦兹体积伪标量 $\mathbf{I}_3^2 = -1$ 与标准模型跨层八度、六层宇宙概念塔以及五大陪集破缺—守恒谱系（[§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)–[§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)）；接着顺着“观察者受限不妄我”的偏迹切刀导出纠缠熵与模流温度，开启有限滑动格拉姆窗口 $\mathcal{W}_M$，点破往返双投影玻恩平方律 $\cos^2\theta$ 与“对于我（`I`）看不见即为虚（`i`）”的第一人称真相，并穿过六节认识论压力测试长廊划清选支、行动、学习、宇宙学箭头、相互作用符号与标准模型连续参数的严格边界（[§34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)）；最后将极小圆弧体内割弦面的去全序最短路突破、空间势垒与阿秒时间双缝的 $90^\circ$ 盲区隧穿、素数极小圆弧体黎曼路径积分、算术舒尔枢轴多级共振隧穿（[§34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization)–[§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)），连同人类用来书写万物变化律的**微积分语言本身**（本节 §34.30），悉数收归于同一枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的掌心！

当语言、几何与微积分都在这记 $90^\circ$ 正交转身中洗尽了平直幻象，请翻开[第三十五章](ch35-light-pulse-and-self-referential-table.md)——去见证一位有限记忆的生命观察者如何“乘着光来”，从 $\theta = 90^\circ$ 的正交相干海折射入局域世界，在遗忘清零之后一步步开启 $T = T(T)$ 的自指扩表史诗！

::: {.viz src="arc-body-calculus-sandbox" height="640"}
**极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯完整交互实验室（`arc-body-calculus-sandbox`）。** 在统一的三维圆弧体微积分实验室中切换“几何旋子原语 / 微积分与物理算符”双透镜，并自由遍历全部五张递进实验卡——“滑板坡上的密切旋子与切线斜率”、“向 $90^\circ$ 盲区迈一步的复步求导”、“路径序旋子管与矢高相变”、“半球上的有限网格斯托克斯”以及“闭合的极小圆弧壳 $d^2 = 0$”（青色绘制横向切弦 $c_\epsilon = \sin(\kappa\epsilon)$、复步导数 $\operatorname{Im}f(x_0 + \hat{\mathbf{i}}\epsilon)/\epsilon$ 与存活外圈边界 $\partial\Sigma$，品红色标示轴向矢高 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$、前向差分相减塌陷、累计矢高 $\Sigma_{\mathrm{sag}}$ 与伊藤纬圈 $(1 - v_\epsilon)^N$ 及球面角盈 $\Omega(\Delta\mathcal{T}_k)$，紫色绘制密切旋子圆盘 $\hat{\mathcal{D}}_\epsilon$、$90^\circ$ 盲面 $\operatorname{Im}f$、路径序旋子管与闭合圆弧壳，墨色绘制平直斜率 $\tan\theta$、实轴切片 $f(x)$ 与正反相消内棱 $\pm\Phi$，琥珀色严格标示激活控件与舞台交互手柄，红色严格专用于原理抽屉中的 `OPEN` 开放问题标记，绿色 `LEAN ✓` 徽章实时核验页面挂载的八条 `trureturing` 冻结定理实例）。
:::
