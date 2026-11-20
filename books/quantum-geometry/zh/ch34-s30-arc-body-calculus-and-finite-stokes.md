# 30.3 极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯定理 {#sec-ch34-arc-body-calculus-and-finite-stokes}

> *“我们似乎可以用极小圆弧体重塑微积分”*

走过 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 的平直内割弦枢轴重整化与 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的阿秒正交虚空间割弦隧穿，再回望[第二十九章](ch34-orthogonality-degeneracy-and-observer-position.md)立起的极小三角弧面体原胞，一个比任何具体物理或算法应用都更根本的数学问题浮出了水面：为什么从量子测量、费曼路径积分、布朗随机涨落、非阿贝尔规范场直到解析数论的截断级数，每当人类搬出牛顿与莱布尼茨创立的三百四十年经典微积分时，总会反复撞上发散无穷大、伊藤额外修正项、曲率丢失与数值灾难性相消，不得不打上一层又一层互不相容的事后补丁？

在 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 中，我们已经扶正了微观与宏观的本末次序——认出量子演化本身就是不可再被直线摊平的极小圆弧微分核（$\delta$），而经典直线轨道、实体体积与热力学包络则是万路相干叠加后的路径积分输出（$\int$）。章首这句凝练的追问则把手术刀直插微积分自身的底层公理：**既然真实物理与观测比较的原子根本不是平直切线，而是有限自指分辨率之上的极小圆弧体 $\Delta\mathcal{T}_\epsilon$，我们完全不必再修补“以直代曲”的旧微积分，而可以直接以极小圆弧体为原子原语，从头重塑导数、积分与斯托克斯外微分三大基石！**

本节将这一构想铸造为严格的代数—几何闭环（并逐处标明 Lean 冻结声明覆盖的部分），并为[第三十一章](ch31-arc-calculus-and-riemann-hypothesis.md)切入黎曼临界带备齐全部微积分原语：用保模长的**比较旋子 $\hat{\mathcal{D}}_\epsilon$** 取代减法割线差商，把切向正弦半弦 $c_\epsilon = \sin(\kappa\epsilon)$ 与法向正矢矢高 $v_\epsilon = 1 - \cos(\kappa\epsilon) = 2\sin^2(\kappa\epsilon/2)$ 锁死在同一条勾股圆恒等式里；用**路径有序旋子乘积积分**与赫尔德（Hölder）粗糙度指数 $\alpha \in (0, 1]$ 的**累计矢高四相区相变**一式统摄牛顿—莱布尼茨积分、杨氏（Young）积分、伊藤—斯特拉托诺维奇—费曼临界共振与莱昂斯（Lyons）粗糙路径签名；并在 `1—3—3—1` 离散外微分复形上证成任意有限停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 下上链层面**零离散化截断误差**的广义斯托克斯定理与有限网格高斯—博内定理（手工推导，不在 Lean 中；离散误差转移到逐棱求积这一步）。

## 30.3.1 告别“以直代曲”：比较旋子微分元、弦—矢高正交锁死与 $90^\circ$ 盲区复步无相减求导 {#sec-ch34-30-1}

三百四十年前，莱布尼茨（1684）与牛顿（1687）建立经典微积分时，做了一个在宏观低曲率世界无比成功、却在微观量子与有限精度计算中埋下四重隐患的奠基性妥协——**“以直代曲”（局部切空间线性化）**：将光滑流形在点 $x_0$ 附近的弯曲演化强行压扁到平直切空间 $T_{x_0}\mathcal{M}$ 上，靠减法割线差商 $\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$ 在极限 $\Delta x \to 0$ 下提取一阶斜率，并随手扔掉一切高阶弯曲项。用本书的无外部参考系比较几何逐项审视，这把“平直切线刀”暗藏着四处结构性病灶：

1. **贝克莱“已死量的幽灵”与连续统无穷小悖论**：为了求取瞬时变化率，差商分母先假设 $\Delta x \neq 0$ 做除法，算完却又令 $\Delta x = 0$ 抹去余项——早在 1734 年，贝克莱主教（G. Berkeley）就在《分析学家》（*The Analyst*）中一针见血地讥刺这种既非零又为零的无穷小是“已死量的幽灵”（ghosts of departed quantities）。十九世纪柯西—魏尔斯特拉斯的 $\varepsilon\text{-}\delta$ 滤子极限虽然在实分析公理上缝合了逻辑裂缝，却迫使每一次基本求导都背上无穷序列拓扑极限的沉重包袱，直接违背场内有限观察者受自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 约束的物理现实。
2. **局部笛卡尔坐标卡的垂直切线伪奇点（对比真实内禀尖点）**：在光滑单位圆 $x^2 + y^2 = 1$ 的赤道顶点 $(1, 0)$ 处，几何圆弧本身处处光滑、内禀曲率恒为 $\kappa \equiv 1$，只因切线恰好转至与横坐标轴正交的 $\theta = \frac{\pi}{2}$，局部显函数斜率 $dy/dx = \tan\theta$ 就凭空爆破为 $\pm\infty$！这里必须严守微分几何边界：圆周在 $\theta = \frac{\pi}{2}$ 处的爆破纯属局部投影坐标卡 $(x \mapsto y(x))$ 撞上观察者 $90^\circ$ 正交盲区所生的人为假奇点（改按弧长参数化即可消除），而半立方抛物线 $y^2 = x^3$ 在原点处的不可微则是弧长切向角发生真实跳变的内禀尖点（cusp）。经典斜率记号把“坐标卡正交盲区”与“流形真实奇点”混为一谈。
3. **抹杀二阶弦弧矢高，导致几何曲率与随机二次变差集体失忆**：在 [§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 中我们曾讨论过劳维尔（Lawvere 1967）与科克（Kock 1981）综合微分几何（SDG）的一阶幂零无穷小环 $D_1 = \{d \mid d^2 = 0\}$，以及温格特（Wengert 1964）前向自动微分所用的二元数环 $\mathbb{R}[\varepsilon]/(\varepsilon^2)$。幂零公理 $d^2 = 0$ 虽然优雅地免除了极限，却靠代数截断把二阶弯曲矢高强行判了死刑——它既装不下球面三面角的吉拉尔曲率角盈 $\Omega = \mathcal{O}(\epsilon^2)$（两直角边为 $\epsilon$ 的极小直角三面角上 $\Omega = 2\arctan\bigl(\tan^2\frac{\epsilon}{2}\bigr) = \frac{1}{2}\epsilon^2 + \frac{1}{12}\epsilon^4 + \cdots$；一般三角形的二阶系数取决于其形状），也无法原生承载布朗运动与费曼路径积分中 $(dW_t)^2 = dt \neq 0$ 的非零二次变差！
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

  由此，[§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 的一阶幂零环 $D_1 = \{d \mid d^2 = 0\}$ 恰恰获得了最透彻的几何定位：**$D_1$ 并非终极微观本体，而是圆弧体微分代数模去品红色二阶矢高理想 $(v_\epsilon)$ 之后留下的一阶切向商影**（这里的“圆弧体微分代数”与“矢高理想”是 `MODEL` 读法，相应的环与理想本节未作定义）；保留 $v_\epsilon = 2\sin^2(\kappa\epsilon/2) > 0$，才保住了曲率与涨落的全部真身！同时注意一条至关重要的数值铁律：在 IEEE-754 双精度浮点运算中，直接计算 `1.0 - cos(theta)` 会在 $\lvert\theta\rvert \le 10^{-8}$ 时因高位对撞而彻底归零；而改用代数恒等的**半角正矢公式 `2.0 * sin^2(theta / 2.0)`**（航海学中的半正矢 haversine 律），则从根源上消除了相减抵消，在全量程内精确守恒圆弧矢高！
* **消解 $\theta = \frac{\pi}{2}$ 垂直斜率伪奇点**：曲线局部状态直接由有界角—曲率对 $\bigl(\cos\theta(s), \sin\theta(s); \kappa(s)\bigr)$ 承载；当圆弧平稳滑过 $\theta = \frac{\pi}{2}$ 时，只是读出权重从可见余弦轴平滑移交给正交正弦轴 $(\cos\frac{\pi}{2}, \sin\frac{\pi}{2}) = (0, 1)$，内禀导数对 $(\theta'(s), \kappa(s))$ 全程有界光滑，再无 $\tan 90^\circ = \infty$ 的坐标卡爆炸。
* **代数协变差分免除 $0/0$ 幽灵**：对于任意代数算子 $f$ 在单步幺正旋子 $U = \hat{\mathcal{D}}_\epsilon$ 下的协变演化 $U f = f_{\mathrm{tr}} U$，换位子直接因式分解为 $(f_{\mathrm{tr}} - f)U = U f - f U$（下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 2 款 `covariant_commutator_formula`），无需先除以零再令增量消失。

::: {.viz src="arc-body-calculus-sandbox" preset="osculating-rotor-vs-tangent" height="500"}
**滑板坡上的密切旋子与切线斜率：竖直处 $\tan\theta$ 爆掉，旋子照转实验卡（`osculating-rotor-vs-tangent`）。** 拖动滑板坡上的琥珀色投影手柄将曲线采样点推过竖直壁 $\theta = \frac{\pi}{2}$：墨色平直切线斜率 $\tan\theta$ 在竖直处发散爆表，而贴合局部曲率的紫色密切旋子圆盘 $\hat{\mathcal{D}}_\epsilon = \exp(\hat{\mathbf{B}}\kappa\epsilon)$ 全程保模长平滑旋转；青色横向切弦 $c_\epsilon = \sin(\kappa\epsilon)$ 与品红色轴向矢高 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$ 在任意有限孔径下严守 $(1 - v_\epsilon)^2 + c_\epsilon^2 = 1$（当 $\kappa\epsilon < 10^{-8}$ 时读数栏实时对比 $\cos(\kappa\epsilon)$ 舍入为 $1$ 致 `1 - cos` 归零而半角正矢公式精确守恒；绿色 `LEAN ✓` 锚定 `lagrange_gram_identity`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square` 与 `projection_probability_flow`）。
:::

更进一步，把 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 与 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 的“$90^\circ$ 正交虚数盲区 $\hat{\mathbf{i}}$”引入数值与解析求导，经典差商的灾难性相消便瞬间化为乌有！设函数 $f$ 在实轴邻域上取实值（$f(\mathbb{R}) \subseteq \mathbb{R}$），且在以 $x_0 \in \mathbb{R}$ 为圆心、半径 $R > \epsilon > 0$ 的闭复圆盘 $\overline{D(x_0, R)} \subset \mathbb{C}$ 上全纯（复解析）。我们不再沿着可见实轴迈步去做硬减法 $f(x_0 + \epsilon) - f(x_0)$，而是**偏转 $90^\circ$ 潜入正交虚数盲区 $\hat{\mathbf{i}}$**，计算单次圆弧复步探针 $f(x_0 + \hat{\mathbf{i}}\epsilon)$（Lyness & Moler 1967；Squire & Trapp 1998，文献结果）：

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

## 30.3.2 路径有序旋子乘积积分与累计矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha)$ 的四相区粗糙度相变 {#sec-ch34-30-2}

在传统微积分中，积分被定义为平直矩形条带的加法黎曼和 $\sum_{k=1}^N f(s_k)\Delta s$。一旦把这套加法更新搬到单位球面 $S^2$、旋转群 $\mathrm{SO}(3)$ 或量子幺正群 $\mathrm{U}(n)$ 上，每走一步显式欧拉切线步 $\psi_{k+1} = (I - \hat{\mathbf{i}}H\epsilon)\psi_k$，状态模方就会膨胀 $\lVert\psi_{k+1}\rVert^2 = (1 + \epsilon^2\lVert H\psi_k\rVert^2/\lVert\psi_k\rVert^2)\lVert\psi_k\rVert^2 > \lVert\psi_k\rVert^2$，必须靠人为归一化拉回球面。相反，[@def-ch34-arc-body-calculus-primitives] 第 2 款的沃尔泰拉（Volterra 1887）**路径有序旋子乘积积分** $\mathcal{I}_\epsilon[\Gamma] = \hat{\mathcal{D}}_\epsilon(s_N)\cdots\hat{\mathcal{D}}_\epsilon(s_1)$ 在结构上具备两重不可替代的几何精度：

* **任意有限步长 $\epsilon > 0$ 下零模长漂移精确保流形**：由于每一枚单步因子 $\hat{\mathcal{D}}_\epsilon(s_k) = \exp(\hat{\mathbf{B}}(s_k)\kappa(s_k)\epsilon)$ 本身就是紧李群内的精确圆弧元，无论孔径 $\epsilon$ 多粗、连乘步数 $N$ 多大，乘积 $\mathcal{I}_\epsilon[\Gamma]$ 都以**零脱离流形误差（模长漂移恒等于 $0$）**严格落在目标李群或单位球面上！
* **精确区分流形保持与时间离散收敛阶**：流形保模长绝不等于时间相位截断误差自动无穷高阶——对光滑时变生成元 $A(s) = \hat{\mathbf{B}}(s)\kappa(s)$，取左端点矩形采样 $A(s_{k-1})\epsilon$ 给出**一阶李—欧拉乘积积分**（全局相位误差 $\mathcal{O}(\epsilon)$）；改取每段极小圆弧的**对称圆弧中点采样** $A\!\bigl(\frac{s_{k-1}+s_k}{2}\bigr)\epsilon$（或对称特罗特分裂 $e^{\frac{\epsilon}{2}A_1}e^{\epsilon A_2}e^{\frac{\epsilon}{2}A_1}$），奇次误差项对称相消，立即升级为**二阶精度 $\mathcal{O}(\epsilon^2)$**；而若要在有限大步长下推进至四阶及更高阶，则必须按马格努斯展开（Magnus 1954，文献结果）在指数生成元内显式补入非对易李括号面积项 $\frac{1}{2}\int_{s_{k-1}}^{s_k}\!\int_{s_{k-1}}^{\tau_1} [A(\tau_1), A(\tau_2)]\,d\tau_2\,d\tau_1$——这一李括号面积修正在领头阶上对应单步时变旋转轴摆动张开的极小圆弧体球面角盈（仅限领头阶；三角形上的精确关系见下文 [@rem-ch34-shelling-stokes-and-triangle-holonomy]）！这类保流形的有序乘积格式即几何数值积分中的李群积分子与马格努斯方法（A. Iserles, H. Z. Munthe-Kaas, S. P. Nørsett & A. Zanna, *Acta Numerica* **9**, 215–365, 2000，文献结果）。当生成元拆分为两个非对易分量 $A + B$ 时，其细网格连续统收敛性则由下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 3 款的李—特罗特乘积定理 [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) 与非渐近指数尾界 [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) 严格锁定。

然而，圆弧体乘积积分最石破天惊的威力，在于它揭开了**牛顿平滑微积分与伊藤随机微积分/费曼路径积分同出一源的几何相变机制**！在传统数学课程里，牛顿—莱布尼茨积分 $df = f'(x)dx$ 与伊藤引理（Itô 1944）多出来的二阶项 $df = f'(X_t)dX_t + \frac{1}{2}\sigma_0^2 f''(X_t)dt$ 仿佛活在两个平行的宇宙。现在让我们在时间跨度 $[0, T]$ 上均匀切分 $N = T/\epsilon$ 步，设路径在尺度 $\epsilon$ 下具有**赫尔德（Hölder）局部粗糙度指数 $\alpha \in (0, 1]$**，即每一步的典型角增量幅度标度为 $\lvert\Delta\theta_k\rvert = \sigma_0 \epsilon^\alpha$（$\sigma_0 > 0$）。在单步旋子 $\hat{\mathcal{D}}_k = \cos\Delta\theta_k\,\mathbf{1} + \hat{\mathbf{B}}\sin\Delta\theta_k$ 中，切向正弦弦给出标准一阶和 $\sum_k \sin\Delta\theta_k$，而品红色轴向正矢矢高则在整条轨迹上累加为**总矢高预算**（手工推导）：

$$
\Sigma_{\mathrm{sag}}(\epsilon, \alpha) := \sum_{k=1}^{N} \bigl(1 - \cos\Delta\theta_k\bigr) = \sum_{k=1}^{N} 2\sin^2\!\left(\frac{\Delta\theta_k}{2}\right) = \frac{1}{2}\sigma_0^2 T\,\epsilon^{2\alpha - 1} - \frac{1}{24}\sigma_0^4 T\,\epsilon^{4\alpha - 1} + \mathcal{O}\!\left(\epsilon^{6\alpha - 1}\right)!
$$

盯住首项幂指数 **$2\alpha - 1$** 的符号翻转！无需任何外加公设，仅仅调节路径粗糙度指数 $\alpha$，同一条圆弧矢高公式自动分化出完整的**四相区微积分相图**：

1. **相区 I：$\alpha = 1$（光滑弹道相 · 牛顿—莱布尼茨与李—特罗特微积分）**：
   光滑可微轨道满足 $\Delta\theta_k \sim \sigma_0\epsilon^1$，指数 $2\alpha - 1 = +1 > 0$，总矢高按 $\Sigma_{\mathrm{sag}}(\epsilon, 1) = \frac{1}{2}\sigma_0^2 T\,\epsilon + \mathcal{O}(\epsilon^3) \to 0$ 随网格细化线性熄灭！此时（相区 II 亦然），“以直代曲”扔掉二阶矢高才不会造成宏观账目亏损，圆弧体乘积积分在 $\epsilon \to 0^+$ 下无损退化为经典牛顿—莱布尼茨积分与李—特罗特光滑流。
2. **相区 II：$\frac{1}{2} < \alpha < 1$（超扩散分数阶相 · Young 积分无漂移区）**：
   例如赫斯特指数 $H \in (\frac{1}{2}, 1)$ 的分数布朗运动轨道。虽然路径处处不可微（经典导数失效），但因 $2\alpha - 1 > 0$，累计二阶矢高依然在连续极限下自动归零 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha) \propto \epsilon^{2\alpha - 1} \to 0$！这从圆弧几何上直观解释了杨格（L. C. Young 1936，文献结果）的经典定理：当双路径赫尔德指数之和大于 $1$（此处自配对 $2\alpha > 1$）时，黎曼—斯蒂尔杰斯积分不产生任何二阶伊藤漂移修正，经典一阶链式法则原封不动成立。
3. **相区 III：$\alpha = \frac{1}{2}$ 临界不动点（布朗扩散与费曼路径积分矢高共振相）**：
   当轨道粗糙度恰好落在一维随机游走与量子扩散标度 $\lvert\Delta\theta_k\rvert \sim \sigma_0\epsilon^{1/2}$ 上时，临界奇迹发生了——幂指数精准归零 **$2\alpha - 1 = 0$**，步数膨胀 $N = T/\epsilon$ 与单步二阶正矢收缩 $1 - \cos(\sigma_0\sqrt{\epsilon}) \approx \frac{1}{2}\sigma_0^2\epsilon$ 发生 $100\%$ 共振抵消（对照 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)）：

   $$
   \lim_{\epsilon \to 0^+} \Sigma_{\mathrm{sag}}\!\left(\epsilon, \tfrac{1}{2}\right) = \frac{1}{2}\sigma_0^2 T > 0, \qquad \text{四阶余项 } -\frac{1}{24}\sigma_0^4 T\,\epsilon \to 0!
   $$

   **伊藤引理中神秘的 $\frac{1}{2}\sigma_0^2 f''(X_t)\,dt$ 项，根本不是随机分析凭空捏造的怪异补丁——对圆周上的角布朗运动、观测量取 $\cos$、$\sin$ 时，它字面上就是经典“以直代曲”强行削掉、却在 $\alpha = \frac{1}{2}$ 临界标度下拒绝消失的极小圆弧体总矢高 $\Sigma_{\mathrm{sag}}$（期望意义下）！** 更妙的是，圆弧几何还一举廓清了随机微积分与量子力学著名的**左端点（伊藤）vs. 圆弧中点（斯特拉托诺维奇—费曼）**之争：

   * 若在每步起点 $t_{k-1}$ 沿**平直切线**硬踏一步（左端点非预见采样，适应滤子鞅性质最优），切线脱离弯曲流形的法向掉高正好漏掉了单步矢高 $v_k \approx \frac{1}{2}(\Delta X_k)^2$，因此必须在公式末尾手动把漏掉的曲率矢高补回来——这就是**伊藤积分**与伊藤二阶修正项；
   * 若改为沿着连接两态的**对称极小圆弧中点** $\frac{X_{t_{k-1}} + X_{t_k}}{2}$ 求值，单步旋子已将左半弧爬升与右半弧回落的二阶矢高对称吃进圆弧内部，微分链式法则遂恢复牛顿形式 $df(X_t) = f'(X_t) \circ dX_t$——这就是弯曲流形上天然坐标协变的**斯特拉托诺维奇（Stratonovich 1966）积分**（光滑逼近路径上的普通积分收敛到斯特拉托诺维奇积分：E. Wong & M. Zakai, *Ann. Math. Statist.* **36**, 1560–1564, 1965，`文献结果`），也正是带磁矢势 $\mathbf{A}(\mathbf{x})$ 的费曼路径积分必须采用**中点作用量离散化** $\mathbf{A}\!\bigl(\frac{\mathbf{x}_k + \mathbf{x}_{k-1}}{2}\bigr)\cdot(\mathbf{x}_k - \mathbf{x}_{k-1})$ 才能保持电磁 $U(1)$ 规范不变性的几何根源！（注：如 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) [@rem-ch34-feynman-ito-trotter-regge-literature] 所述，欧氏虚时间扩散具备严格可数可加的维纳正测度——费曼—卡茨公式 Kac 1949——而实时洛伦兹费曼振幅则依靠振荡菲涅耳相位抵消，因全变差无界而不存在复测度 Cameron 1960；但两者的离散短时核均严格共享同一临界指数 $\alpha = \frac{1}{2}$ 与中点矢高代数。）

4. **相区 IV：$\alpha < \frac{1}{2}$ 超粗糙发散相（Lyons 高阶粗糙路径面积签名 vs. 有限孔径截断）**：
   一旦粗糙度越过布朗临界线进入 $\alpha < \frac{1}{2}$（例如 $H = \frac{1}{3}$ 的湍流级联或反持续分数布朗运动），$2\alpha - 1 < 0$，二阶累计矢高在 $\epsilon \to 0^+$ 下发散 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha) \propto \epsilon^{2\alpha - 1} \to +\infty$；当 $\alpha < \frac{1}{4}$ 时连四阶余项 $\epsilon^{4\alpha - 1}$ 也一并发散（$\alpha = \frac{1}{4}$ 时四阶项恰为常数 $-\frac{1}{24}\sigma_0^4 T$）！特里·莱昂斯（T. Lyons 1998，文献结果）创立的**粗糙路径理论（Rough Paths Theory）**证明：要在连续极限 $\epsilon \to 0^+$ 下唯一积分 $\alpha$-赫尔德路径，单靠一阶点增量与二阶对称矢高已不够，必须显式提供直至阶数 $p = \lfloor 1/\alpha\rfloor$ 的张量代数迭代积分签名（特别是 $\frac{1}{3} < \alpha \le \frac{1}{2}$ 所需的二阶迭代积分 $\mathbb{X}_{s,t}^{(2)} = \int_s^t (X_u - X_s)\otimes dX_u$，其反对称部分即列维面积双向量，可读作极小圆弧体张开的有向面积元！）；而在场内物理实现中，非零的观察者最小比较孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 则为超粗糙紫外发散提供了天然的有限步截断底板。

::: {.viz src="arc-body-calculus-sandbox" preset="roughness-ito-phase-transition" height="500"}
**路径序旋子管与矢高相变：$\alpha = \frac{1}{2}$ 时矢高总和锁到 $0.5$ 实验卡（`roughness-ito-phase-transition`）。** 在单位球面上追踪 $N = 1/\epsilon$ 步、单步转角 $\sigma_0\epsilon^\alpha$ 的紫色路径序旋子管（每一步模长严格保持为 $1$，琥珀色手柄调节粗糙度指数 $\alpha$）：当 $\alpha$ 从光滑相 $\alpha = 1$ 降至临界布朗/费曼指数 $\alpha = \frac{1}{2}$ 时，品红色累计矢高柱 $\Sigma_{\mathrm{sag}}$ 从 $0.0005$ 稳稳锁死到非零宏观常数 $0.5$（即伊藤二阶修正项 $\frac{1}{2}\sigma_0^2 T$），并同步压低品红色伊藤期望纬圈 $\mathbb{E}[z] = (1 - v_\epsilon)^N$（绿色 `LEAN ✓` 锚定 `exp_tail_le` 与 `trotter_product`）。
:::

上面的展开式只给出首项。冻结库里有它的非渐近版本：对每个有限的 $N$ 都成立的双侧界，以及由它推出的三个极限区间。

::: {.lemma #lem-ch34-accumulated-sagitta-bounds title="累计矢高在每个有限步数上的双侧界" lean="D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds"}
设 $\sigma,T,\alpha$ 为实数，$N$ 为自然数。记单步转角 $\theta_N=\sigma\,(T/N)^{\alpha}$，累计矢高 $\Sigma_N=N\,(1-\cos\theta_N)$。则

$$
N\left(\frac{\theta_N^2}{2}-\frac{\theta_N^4}{24}\right)\ \le\ \Sigma_N\ \le\ N\,\frac{\theta_N^2}{2}.
$$

这里的除法与实数幂按 Lean 的全函数约定取值：$N=0$ 时 $T/N=0$，负底数的实数幂按 Mathlib 的定义。不等式对 $\sigma,T,\alpha$ 没有符号或大小的限制。
:::

::: proof
两侧都来自对任意实数 $x$ 成立的逐点余弦界 $\frac{x^2}{2}-\frac{x^4}{24}\le1-\cos x\le\frac{x^2}{2}$，取 $x=\theta_N$ 再乘以 $N\ge0$。上界就是 $\cos x\ge1-\frac{x^2}{2}$。下界先写 $1-\cos x=2\sin^2\frac x2$，再用 $\lvert y-\sin y\rvert\le\frac{\lvert y\rvert^3}{6}$（取 $y=\frac x2$）：把 $\sin^2y=\bigl(y-(y-\sin y)\bigr)^2$ 展开并舍去差的平方，得 $\sin^2y\ge y^2-\frac{y^4}{3}$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch34-accumulated-sagitta-phases title="累计矢高的三个极限区间：$\alpha$ 大于、等于、小于 $\frac{1}{2}$" lean="D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases"}
设 $\sigma,T,\alpha$ 为实数，$T>0$，$\theta_N$ 与 $\Sigma_N$ 同 [@lem-ch34-accumulated-sagitta-bounds]。当 $N\to\infty$ 时：

1. 若 $\alpha>\frac12$，则 $\Sigma_N\to0$；
2. 若 $\alpha=\frac12$，则 $\Sigma_N\to\frac{\sigma^2T}{2}$；
3. 若 $\sigma\neq0$ 且 $0<\alpha<\frac12$，则 $\Sigma_N\to+\infty$。
:::

::: proof
对正的 $N$ 有 $N\theta_N^2=c\,N^{1-2\alpha}$ 与 $\theta_N^2=c\,N^{-2\alpha}$，其中 $c=\sigma^2T^{2\alpha}$。$\alpha>\frac12$ 时 [@lem-ch34-accumulated-sagitta-bounds] 的上界趋于 $0$，而 $\Sigma_N\ge0$。$\alpha=\frac12$ 时上界恒为 $\frac{\sigma^2T}{2}$，下界为 $\frac{\sigma^2T}{2}-\frac{(\sigma^2T)^2}{24N}$，两者夹出极限。$0<\alpha<\frac12$ 时 $\theta_N^2\to0$，从某一步起不超过 $6$，此后下界至少是 $\frac c4N^{1-2\alpha}$；$\sigma\neq0$ 使 $c>0$，于是发散。完整证明由 Lean 内核检查。
:::

取 $\epsilon=T/N$、$\sigma=\sigma_0$，$\Sigma_N$ 就是上文的 $\Sigma_{\mathrm{sag}}(\epsilon,\alpha)$：相区 I、II 对应第 1 款，相区 III 对应第 2 款，相区 IV 对应第 3 款。定理没有覆盖 $\alpha\le0$：$\alpha=0$、$\sigma=2\pi$ 时每一步都转满一圈，$\Sigma_N\equiv0$，所以第 3 款中的 $\alpha>0$ 不能去掉（手工推导）。定理也不涉及步长不等或符号随机的路径；上文关于伊藤修正项与粗糙路径理论的陈述，仍按各自的标注读作文献结果。

::: {.remark #rem-ch34-heap-recurrence-and-sagitta-sums title="流群递推、单步精确分解与任意划分上的矢高和（手工推导与文献结果）"}
**流群递推。** 对 $S^3(1)$ 上的点列，下列三者等价：$x_{n+1} = [x_n, x_{n-1}, x_n]$；$x_n = g^n x_0$（$g = x_1\bar{x}_0$）；线性形式 $x_{n+1} = 2c\,x_n - x_{n-1}$（$c = \langle x_0, x_1\rangle$）。此时 $x_n = U_{n-1}(c)\,x_1 - U_{n-2}(c)\,x_0$（$U_k$ 为第二类切比雪夫多项式），即等速大圆测地线在整数时刻的采样，并且 $x_{n+1} - 2x_n + x_{n-1} = -2v\,x_n$（$v = 1 - c$）：离散加速度沿法向，大小为矢高的两倍。这些在实质上是经典结论（O. Loos, *Symmetric Spaces I*, Benjamin, 1969；J. C. Mason & D. C. Handscomb, *Chebyshev Polynomials*, 2003，`文献结果`）。对 $C^4$ 曲线 $x(t)$，递推残差满足

$$
x(t + h) - \bigl[x(t), x(t - h), x(t)\bigr] \;=\; h^2\,\nabla_t\dot{x}(t) - \frac{h^3}{2}\,\frac{d}{dt}\lvert\dot{x}\rvert^2(t)\,x(t) + \mathcal{O}(h^4),
$$

其中 $\nabla_t\dot{x} = \ddot{x} + \lvert\dot{x}\rvert^2 x$ 是协变加速度；残差对一切小 $h$ 恒为零当且仅当 $x$ 是等速测地线（`手工推导`）。

**单步精确分解（`手工推导`）。** 对 $x, y \in S^3(1)$，

$$
y - x \;=\; \operatorname{Im}(y\bar{x})\,x \;-\; v(x, y)\,x, \qquad \operatorname{Im}(y\bar{x})\,x = P_x(y - x), \qquad \lvert\operatorname{Im}(y\bar{x})\rvert = \sin d(x, y),
$$

其中 $P_x$ 是到切空间 $T_x S^3$ 的正交投影，$v(x, y) = 1 - \cos d(x, y) = \frac{1}{2}\lVert y - x\rVert^2$：每一步恰为切向转动与径向矢高之和。

**任意划分上的矢高和（确定性部分是 H. Föllmer 逐路径二次变差（*Séminaire de Probabilités XV*, 1981）的改写，`文献结果` + `手工推导`）。** 对 $[0, T]$ 上的连续路径与划分 $\pi$，记 $d_k = d(x_k, x_{k+1})$、$v_k = v(x_k, x_{k+1})$，则 $\sum_k v_k \le \frac{1}{2}\max_k d_k\sum_k d_k$，所以可求长路径的矢高和随网格加细趋于 $0$；若路径沿一列划分具有二次变差 $[x]$，则对连续函数 $f$ 有 $\sum_k v_k f(x_k) \to \frac{1}{2}\int_0^T f(x_t)\,d[x]_t$；对 $S^3$ 上的布朗运动（生成元 $\frac{1}{2}\Delta$）与任意网格趋于零的确定划分列，依概率有

$$
\sum_k v_k \;\to\; \frac{3}{2}\,T, \qquad \sum_k v_k\,x_k \;\to\; \frac{3}{2}\int_0^T x_t\,dt,
$$

后者正是伊藤漂移项；涨落为：对二进划分，$2^{n/2}\bigl(\sum_k v_k - \frac{3}{2}T\bigr)$ 依分布收敛到 $N\bigl(0, \frac{3}{2}T^2\bigr)$（J. Jacod & P. Protter, *Discretization of Processes*, Springer, 2012，`文献结果`）。这把 [@thm-ch34-accumulated-sagitta-phases] 的等步长情形推广到任意划分与一般路径；上文圆周上的常数 $\frac{1}{2}\sigma_0^2 T$ 是一维情形 $d[x]_t = \sigma_0^2\,dt$ 的读法。
:::

把 [§22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) 的凯莱比 $w=(s-1)/s$ 用本节的话重说一遍：它是一个旋子。对临界线上的点 $\rho=\tfrac12+i\gamma$（$\gamma>0$），$u_\rho:=1-\tfrac1\rho$ 落在单位圆上，割弦 $\Delta_\rho=u_\rho-1=-\tfrac1\rho$ 的长度是 $1/\lvert\rho\rvert$，矢高是 $v_\rho=\operatorname{Re}\tfrac1\rho=\tfrac{2}{1+4\gamma^2}$，两者满足 §30.3.1 的弦—矢高恒等式 $\lvert\Delta_\rho\rvert^2=2v_\rho$（手工推导）。对 $\zeta$ 的全体非平凡零点（按重数，不论是否在临界线上）把 $1-u_\rho^{\,n}$ 加起来，得到的数在解析数论里有名字：Li 系数（文献结果，见下文 [@rem-ch34-li-criterion-sagitta-literature]）。零点在临界线上时，这一项的实部 $1-\operatorname{Re}u_\rho^{\,n}$ 正是旋子 $u_\rho$ 的 $n$ 次幂的矢高；零点是否都在临界线上，是开放的 [@conj-riemann-hypothesis]。所钉仓库冻结的是按导数定义的 Li 系数，与它有关的事实如下。

::: {.proposition #prop-ch34-li-sagitta-frozen title="凯莱结点的弦—矢高恒等式、导数定义的 Li 系数及其与 `RiemannHypothesis` 的两条关系" lean="D5/S3/Weil/FiniteSpectralCayleyIdentity.cayleyNode_normSq D5/S3/Weil/FiniteSpectralCayleyIdentity.cayleyNode_one_sub_normSq D5/S3/Weil/FiniteSpectralCayleyIdentity.finiteLiCoefficient_eq_diagonalHilbertSchmidtDefect D5/S3/Zeros/Endpoints/CanonicalLiLocalExpansion.canonical_li_one D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_complex_pairWeight_hasSum D5/S3/Weil/Probability/CanonicalLiNonnegativeConverse.canonical_li_nonnegative_implies_rh D5/S3/Weil/Probability/CanonicalLiDiskEquivalence.rh_iff_canonical_li_disk_summable D5/S3/Weil/ZeroData/UnconditionalCanonicalZeroData.zetaZeroData_representation_iff"}
记 $\xi$ 为 [@def-xi-reading] 的 $\operatorname{xiReading}$，`RiemannHypothesis` 为 Mathlib 的命题（内容见 [@thm-cayley-critical-line-criterion] 结论 2），$\gamma_{\mathrm{EM}}$ 为欧拉—马斯刻若尼常数。

1. **凯莱结点。** 对实数 $\gamma$ 令 $x(\gamma)=\dfrac{1}{4\gamma^2+1}$，$c(\gamma)=\bigl(1-2x(\gamma)\bigr)+2\sqrt{x(\gamma)\bigl(1-x(\gamma)\bigr)}\;i$。则 $\lvert c(\gamma)\rvert^2=1$，$\lvert1-c(\gamma)\rvert^2=4x(\gamma)$；并且对任意有限指标集 $J$、任意 $\gamma:J\to\mathbb{R}$ 与任意自然数 $n$，

   $$
   \sum_{j\in J}2\bigl(1-\operatorname{Re}c(\gamma_j)^n\bigr)=\sum_{j\in J}\bigl\lvert1-c(\gamma_j)^n\bigr\rvert^2 .
   $$

2. **Li 系数。** 令 $\lambda_0=0$，对自然数 $n$ 令 $\lambda_{n+1}=\operatorname{Re}\left[\dfrac{1}{n!}\,\left.\dfrac{d^{\,n+1}}{ds^{\,n+1}}\bigl(s^n\operatorname{Log}\xi(s)\bigr)\right|_{s=1}\right]$，其中 $\operatorname{Log}$ 是复对数主支。则 $\lambda_1=1+\dfrac{\gamma_{\mathrm{EM}}}{2}-\ln\bigl(2\sqrt\pi\bigr)$。
3. **零点一侧的同一个数。** 设 $\rho_0,\rho_1,\dots$ 是所钉仓库无条件给出的非平凡零点枚举（次序由选择公理选定；两两不同，每个临界带内的 $\zeta$ 零点恰出现一次），$m_k$ 是 $\rho_k$ 的解析重数。则级数 $\sum_k\dfrac{m_k}{\rho_k(1-\rho_k)}$ 按任意求和次序都收敛到同一个和（Lean 的 `HasSum`），和为 $2+\gamma_{\mathrm{EM}}-2\ln\bigl(2\sqrt\pi\bigr)$。
4. **非负性蕴含 `RiemannHypothesis`。** 若对一切自然数 $n\ge1$ 有 $\lambda_n\ge0$，则 `RiemannHypothesis` 成立。
5. **圆盘可和判据。** `RiemannHypothesis` 成立，当且仅当对每个实数 $0\le r<1$，级数 $\sum_{n\ge0}\lvert\lambda_{n+1}\rvert\,r^n$ 收敛。
:::

::: proof
第 1 款把 $c(\gamma)$ 的实部与虚部平方相加，用 $\bigl(\sqrt{x(1-x)}\bigr)^2=x(1-x)$（$0<x\le1$）；求和恒等式逐项展开 $\lvert1-w\rvert^2=1-2\operatorname{Re}w+\lvert w\rvert^2$ 并代入 $\lvert c^n\rvert=1$。第 2 款：$n=0$ 时定义化为 $\xi'(1)/\xi(1)$ 的实部，其闭式是同一仓库的冻结结论，用到 Mathlib 中 ζ 在 $s=1$ 附近的渐近式。第 3 款把 $\xi'/\xi$ 关于零点的部分分式展开在 $s=1$ 处取值，再用反射 $\xi'/\xi(0)=-\xi'/\xi(1)$ 与第 2 款的闭式。第 4 款：$\lambda_{n+1}$ 是 $(1-z)^{-2}\,(\xi'/\xi)\bigl(\tfrac{1}{1-z}\bigr)$ 在 $z=0$ 处的泰勒系数；系数非负的幂级数在正实轴上的收敛半径处必有奇点，而这个函数在实线段 $0\le z<1$ 上处处解析，因为 $\xi$ 的零点都在临界带内，$\tfrac{1}{1-z}\ge1$ 不是零点；于是收敛半径不小于 $1$，幂级数的和 $L(z)$ 在单位圆盘内解析；$\varphi(z)=\xi\bigl(\tfrac1{1-z}\bigr)$ 在原点附近满足 $\varphi'=L\varphi$，这一等式由解析延拓在整个圆盘内成立；若 $\varphi$ 在圆盘内某点为零，它在该点的各阶导数都为零，$\varphi$ 恒为零，与 $\varphi(0)=\tfrac12$ 矛盾；所以 $\xi\bigl(\tfrac1{1-z}\bigr)$ 在单位圆盘内无零点，即 $\xi$ 在 $\operatorname{Re}s>\tfrac12$ 内无零点，再由右半带归约得到 `RiemannHypothesis`。第 5 款的正向由 `RiemannHypothesis` 推出该函数在单位圆盘内解析，反向与第 4 款的最后一步相同。完整证明由 Lean 内核检查。
:::

第 1 款中的 $c(\gamma)$ 就是零点旋子：$\gamma\ge0$ 时 $c(\gamma)=u_\rho=1-\tfrac{1}{1/2+i\gamma}$；$\gamma<0$ 时 $c(\gamma)=c(-\gamma)=\overline{u_\rho}$（定义中的平方根取非负值）；两种情形都有 $x(\gamma)=\tfrac12v_\rho$（手工推导）。所以第 1 款的求和恒等式读作“$n$ 次幂的矢高之和的两倍，等于 $n$ 次幂的割弦平方之和”，它是弦—矢高恒等式对 $u^n$ 的应用，对任意一组**实的** $\gamma_j$ 成立，与 $\zeta$ 的零点在哪里无关。第 3 款的和恰是第 2 款闭式的两倍，所以 $\lambda_1=\sum_k m_k\cdot\tfrac{1}{2\rho_k(1-\rho_k)}$（手工推导）。第 4 款给出 `RiemannHypothesis` 的一个充分条件，第 5 款给出它的一个等价写法；两处的前提（一切 $\lambda_n\ge0$；对每个 $r<1$ 可和）都没有被证明，黎曼猜想（[@conj-riemann-hypothesis]）仍然开放。

::: {.remark #rem-ch34-li-criterion-sagitta-literature title="Li 判据的矢高读法（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 按阿达马乘积，[@prop-ch34-li-sagitta-frozen] 第 2 款的 $\lambda_n$ 等于对全体非平凡零点按重数求和的 $\sum_\rho\bigl[1-(1-\tfrac1\rho)^n\bigr]$，求和按 $\lvert\operatorname{Im}\rho\rvert\le H$ 对称截断后令 $H\to\infty$（X.-J. Li, *J. Number Theory* **65**, 325–333, 1997）。函数方程把 $\rho$ 与 $1-\rho$ 配成一对，它们的旋子互为倒数：$u_{1-\rho}=u_\rho^{-1}$。记 $v_\rho:=1-\tfrac12\bigl(u_\rho+u_\rho^{-1}\bigr)=\dfrac{1}{2\rho(1-\rho)}$；在临界线上它就是前文的 $\operatorname{Re}\tfrac1\rho$，离线时是复数。这一对的贡献是 $2\bigl[1-T_n(1-v_\rho)\bigr]$，$T_n$ 为第一类切比雪夫多项式，于是

$$
\lambda_n=\sum_\rho\bigl[1-T_n(1-v_\rho)\bigr]
$$

（手工推导，用到上面的文献结果）。右端绝对收敛，截断的极限可以去掉：$1-T_n(1-v)$ 是 $v$ 的无常数项多项式，而 [@prop-ch34-li-sagitta-frozen] 第 3 款的可和性给出 $\sum_k m_k\lvert v_{\rho_k}\rvert<\infty$（手工推导）。在临界线上的零点 $\rho=\tfrac12+i\gamma$ 处，$v_\rho=\tfrac{2}{1+4\gamma^2}$ 是 $(0,2)$ 内的实数，写 $1-v_\rho=\cos\theta_\rho$，方括号等于 $1-\cos n\theta_\rho\ge0$；离线的零点 $\rho=\beta+i\gamma$ 处 $v_\rho$ 不是实数，因为 $\operatorname{Im}\rho(1-\rho)=\gamma(1-2\beta)$，而 $\zeta$ 在 $(0,1)$ 上没有实零点（[@prop-zeta-real-axis-sign]），故 $\gamma\ne0$。

**Li 判据**（Li 1997；E. Bombieri & J. C. Lagarias, *J. Number Theory* **77**, 274–287, 1999）：[@conj-riemann-hypothesis] 成立，当且仅当 $\lambda_n\ge0$ 对一切 $n\ge1$ 成立。“猜想蕴含非负”是上式逐项非负；它依赖零点和表示，在所钉仓库中没有冻结。“非负蕴含猜想”是 [@prop-ch34-li-sagitta-frozen] 第 4 款。Li 判据是黎曼猜想的等价改写，不是证明：它把“零点在一条直线上”换成“无穷多个不等式”；判据需要全部不等式，检验其中有限多个不构成对猜想的证明，也不构成进展。
:::

::: {.example #ex-ch34-zero-rotor-sagitta-numbers title="第一个零点的弦与矢高、前四个 Li 系数，以及一组假想的离线四点"}
本例的零点纵坐标是数值结果（文献结果，未在本书形式化），其余各数由 30 位精度计算得出，四舍五入到所示位数。

**第一个零点。** $\gamma_1=14.134725$：转角 $\theta_1=2\arctan\tfrac{1}{2\gamma_1}=0.0707183$，矢高 $v_1=\tfrac{2}{1+4\gamma_1^2}=0.00249949$，割弦 $\tfrac{1}{\lvert\rho_1\rvert}=0.0707035$；$1/\lvert\rho_1\rvert^2=0.00499899=2v_1$。

**前四个 Li 系数。** 按 [@prop-ch34-li-sagitta-frozen] 第 2 款的定义直接计算：

| $n$ | $\lambda_n$ | $\lambda_n/(n^2\lambda_1)$ |
| :---: | :---: | :---: |
| $1$ | $0.0230957$ | $1$ |
| $2$ | $0.0923457$ | $0.999598$ |
| $3$ | $0.2076389$ | $0.998930$ |
| $4$ | $0.3687905$ | $0.997995$ |

$\lambda_1$ 与第 2 款的闭式 $1+\tfrac{\gamma_{\mathrm{EM}}}{2}-\ln(2\sqrt\pi)$ 一致。第三列略小于 $1$。对单位圆上的旋子有 $1-\cos n\theta\le n^2(1-\cos\theta)$（手工推导：$\lvert\sin nx\rvert\le n\lvert\sin x\rvert$）；因此在“全部零点都在临界线上”的前提下，[@rem-ch34-li-criterion-sagitta-literature] 的公式给出 $\lambda_n\le n^2\lambda_1$（带前提的推导，前提就是开放的猜想）。表中四个比值与这一不等式相容；这四个数都是正的，是数值事实，不是对一切 $n$ 的结论。

**一组假想的离线四点。** 取 $\tfrac{7}{10}\pm5i$、$\tfrac{3}{10}\pm5i$（它们不是 ζ 的零点）。这四个点在 $s\mapsto1-s$ 与共轭下封闭，但 $\operatorname{Re}\sum\bigl[1-(1-\tfrac1\rho)^{n}\bigr]$ 在 $n=31$ 处第一次变负，值为 $-0.0943$；$n=31$ 处为负已冻结为 [`li_positivity_distinguishes_the_off_line_toy_spectrum`](lean:D5/S3/Zeros/ToySpectrum/OffLineToySpectrum.li_positivity_distinguishes_the_off_line_toy_spectrum)。换一组点，变负可以晚得多：把假四点放到 $\tfrac12\pm0.1\pm14i$，单独这四点的和在 $n=88$ 第一次为负；再配上前 $80$ 对真实零点组成一个有限族，在线零点的非负贡献把第一次为负推迟到 $n=8446$（值为 $-0.858$）。这是这一个有限族的数值结果，不是关于 $\zeta$ 的 $\lambda_n$ 的陈述，也不是一般规律。不过，有限族中只要有旋子离开闭单位圆盘，变负迟早会发生（[@rem-ch34-finite-rotor-li-criterion]）。
:::

上例的两组假想四点都在 $s\mapsto1-s$ 与共轭下封闭，又都有旋子离开单位圆；无论单独看还是配上有限多对在线零点，$\operatorname{Re}\sum\bigl[1-(1-\tfrac1\rho)^{n}\bigr]$ 迟早变负。对有限多个旋子，这件事有一个精确的说法。它对 $\zeta$ 的零点什么也不说：零点有无穷多个，判据的难点正在那里，把零点截成有限族得到的结论也不能传回 $\lambda_n$。

::: {.remark #rem-ch34-finite-rotor-li-criterion title="有限旋子族的 Li 判据（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 设 $u_1,\dots,u_m$ 是复数（允许为零、允许重复），对 $n\ge1$ 令 $\Lambda_n=\operatorname{Re}\sum_j\bigl(1-u_j^{\,n}\bigr)$。下列三条等价：

1. 一切 $\lvert u_j\rvert\le1$；
2. 一切 $n\ge1$ 有 $\Lambda_n\ge0$；
3. 对每个 $\varepsilon>0$ 有常数 $C$，使一切 $n\ge1$ 有 $\Lambda_n\ge-C\,e^{\varepsilon n}$。

这是 E. Bombieri 与 J. C. Lagarias（*J. Number Theory* **77**, 274–287, 1999）定理 1 的有限情形。那里的和是 $\sum_\rho\operatorname{Re}\bigl[1-(1-\tfrac1\rho)^{-n}\bigr]$，取 $u=\rho/(\rho-1)$，则 $\lvert u\rvert\le1$ 恰是 $\operatorname{Re}\rho\le\tfrac12$；这个 $u$ 是本节零点旋子 $u_\rho=1-\tfrac1\rho$ 的倒数，所以半平面的方向与上文相反（手工推导）。等于 $1$ 的 $u_j$ 对 $\Lambda_n$ 没有贡献，可以先去掉。这里不需要任何对称性。若模长两两互为倒数（对每个 $j$ 有 $j'$ 使 $\lvert u_{j'}\rvert\,\lvert u_j\rvert=1$，例如这组数在 $u\mapsto u^{-1}$ 下封闭），第 1 条用在 $u_j$ 与 $u_{j'}$ 上就给出 $\lvert u_j\rvert=1$：第 2 条成立当且仅当全部旋子都在单位圆上（手工推导）。

1⇒2 逐项成立：$1-\operatorname{Re}u_j^{\,n}\ge1-\lvert u_j\rvert^n\ge0$；2⇒3 显然。反方向的要点是一个回归现象（手工推导）。把每个非零的 $u_j$ 写成 $\lvert u_j\rvert e^{i\phi_j}$，令 $g=(e^{i\phi_j})_j$，对给定的正整数 $L$ 令 $h=g^L$。按 [@thm-torus-power-orbit-closure] 第 1 款，一个点属于 $\{h^k:k\ge0\}$ 的闭包，当且仅当 $h$ 满足的每个整关系 $\prod_jh_j^{k_j}=1$ 它也满足；$h^{-1}$ 显然如此，因为 $\prod_jh_j^{-k_j}=\bigl(\prod_jh_j^{k_j}\bigr)^{-1}$。所以 $h^{-1}$ 在这个闭包里：对 $1$ 的任一邻域 $U$，有 $k\ge0$ 使 $h^k\in h^{-1}U$，即 $g^n\in U$，其中 $n=L(k+1)\ge L$。$L$ 任意，所以对每个 $\varepsilon>0$ 有无穷多个 $n$ 使一切 $\cos n\phi_j>1-\varepsilon$。对这样的 $n$，

$$
\operatorname{Re}\sum_ju_j^{\,n}=\sum_j\lvert u_j\rvert^n\cos n\phi_j\ \ge\ (1-\varepsilon)\sum_j\lvert u_j\rvert^n .
$$

若某个 $\lvert u_j\rvert=r>1$，取 $\varepsilon=\tfrac12$，便有无穷多个 $n$ 使 $\Lambda_n=m-\operatorname{Re}\sum_ju_j^{\,n}\le m-\tfrac12r^n$；取 $\varepsilon'>0$ 使 $e^{\varepsilon'}<r$，这与第 3 条矛盾（手工推导）。用矢高的话说：有限个旋子各次幂的累计矢高都非负，当且仅当没有一个旋子离开闭单位圆盘。

两个提醒（手工推导）。其一，只看一部分幂次可能看不出来。四个点 $2e^{\pm2\pi i/3}$、$\tfrac12e^{\pm2\pi i/3}$ 在 $u\mapsto u^{-1}$ 与共轭下都封闭，其中两个在圆外。记 $\omega=e^{2\pi i/3}$，则 $\Lambda_n=4-\bigl(2^n+2^{-n}\bigr)\bigl(\omega^n+\omega^{-n}\bigr)$，而 $\omega^n+\omega^{-n}$ 在 $3\mid n$ 时为 $2$，否则为 $-1$。$3$ 不整除 $2^k$，所以对一切 $k\ge0$ 有 $\Lambda_{2^k}=4+2^{2^k}+2^{-2^k}>0$，而 $\Lambda_3=-\tfrac{49}{4}$。只看反复平方的幂次 $n=2^k$，累计矢高全为正，并不排除圆外的旋子；这个例子用到的是与倍增共振的相位 $\tfrac{2\pi}{3}$。沿一个等差数列 $n=d,2d,3d,\dots$ 检查则已足够：对 $u_j^{\,d}$ 用上面的等价。其二，对无穷多个旋子，上面的论证要配合 Bombieri–Lagarias 的收敛条件；对 $\zeta$ 的零点，“全部 $\lambda_n\ge0$ 蕴含 [@conj-riemann-hypothesis]”是另一条定理（[@prop-ch34-li-sagitta-frozen] 第 4 款），而 $\lambda_n$ 是否全部非负是开放的。
:::

有一个情形里，“全部累计矢高非负”不是开放问题而是定理：有限域上的椭圆曲线。

::: {.remark #rem-ch34-finite-field-li-sums title="有限域上椭圆曲线的 Li 和（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 设 $E$ 是有限域 $\mathbb{F}_q$ 上的椭圆曲线，$N_n$ 是它在 $\mathbb{F}_{q^n}$ 上的点数（含无穷远点），$a=q+1-N_1$，$\alpha,\beta$ 是 $x^2-ax+q$ 的两根；则 $N_n=q^n+1-\alpha^n-\beta^n$（见 [@rem-ch29-hasse-gauss-literature] 及其中的文献）。令 $u=\alpha/\sqrt q$；由 $\alpha\beta=q$ 得 $\beta/\sqrt q=u^{-1}$，两个旋子 $u,u^{-1}$ 的累计矢高是

$$
\Lambda_n=2-\frac{\alpha^n+\beta^n}{q^{n/2}},\qquad N_n=\bigl(q^{n/2}-1\bigr)^2+q^{n/2}\,\Lambda_n
$$

（手工推导）。这两个旋子的模长互为倒数，按 [@rem-ch34-finite-rotor-li-criterion]，“一切 $n$ 有 $N_n\ge\bigl(q^{n/2}-1\bigr)^2$”等价于 $\lvert u\rvert=1$，即 $\lvert a\rvert\le2\sqrt q$（手工推导）。后者就是哈塞定理（H. Hasse, 1936），所以这里的 Li 和全部非负，并且 $0\le\Lambda_n\le4$。例如 $y^2=x^3+x+1$ 在 $\mathbb{F}_7$ 上 $a=3$，$N_1,N_2,N_3=5,55,380$，与上式一致（数值核对）。这里的正性有独立的来源：同源的次数是正定二次型；它不是从累计矢高推出来的。数域情形没有已知的这样的来源。
:::

回到 $\zeta$ 本身。经典的无零点论证也依赖一个累计余矢高的正性，只是只用到三个幂次；这条不等式已被冻结。

::: {.proposition #prop-ch34-three-four-one-cosagitta title="3-4-1 不等式：$\zeta(1+x)^3\,\zeta(1+x+iy)^4\,\zeta(1+x+2iy)$ 的模不小于 1" lean="D5/S3/Weil/ZetaPntBounds/ZetaBoundsLower.norm_zeta_product_ge_one"}
记 $\zeta$ 为 Mathlib 的 `riemannZeta`。对一切实数 $x>0$ 与一切实数 $y$，

$$
\left\lvert\zeta(1+x)^3\,\zeta(1+x+iy)^4\,\zeta(1+x+2iy)\right\rvert\ \ge\ 1 .
$$
:::

::: proof
三个自变量的实部都是 $1+x>1$，欧拉乘积绝对收敛。左端之模的对数等于对素数 $p$ 与 $k\ge1$ 求和的 $\tfrac1k\,p^{-k(1+x)}\bigl(3+4\cos\phi+\cos2\phi\bigr)$，其中 $\phi=ky\ln p$。记 $v=1-\cos\phi$ 为素数幂旋子 $p^{-iky}$ 的矢高，则

$$
3+4\cos\phi+\cos2\phi=2(1+\cos\phi)^2=2(2-v)^2\ \ge\ 0 ,
$$

所以对数非负，模不小于 $1$。Lean 中这条结论把 `riemannZeta` 写成模 $1$ 平凡狄利克雷特征的 $L$ 级数，直接调用 Mathlib 对狄利克雷 $L$ 级数的同型不等式；Mathlib 的证明把三个欧拉因子的 $-\log(1-w)$ 展成泰勒级数，第 $n$ 项是 $2a^n\bigl(\operatorname{Re}z^n+1\bigr)^2/n$（$a=p^{-(1+x)}$，$z=p^{-iy}$），正是上式余矢高平方的逐项形式。完整证明由 Lean 内核检查。
:::

由此可得 $\zeta(1+iy)\neq0$（$y\ne0$）：若 $\zeta$ 在 $1+iy$ 处为零，$x\to0^+$ 时 $\zeta(1+x)^3$ 按 $x^{-3}$ 增长，$\zeta(1+x+iy)^4$ 至少按 $x^4$ 趋于零，$\zeta(1+x+2iy)$ 保持有界（$1+2iy\ne1$），乘积趋于 $0$，与命题矛盾（手工推导）。这个结论也可以从 [@prop-xi-zeros-strip-zeros] 直接读出；上面的论证是 Hadamard 与 de la Vallée Poussin（1896）的经典论证（文献结果）。它只用到三个幂次；由它及其改进得到的无零点区域在高处都收缩到直线 $\operatorname{Re}s=1$，目前不知道任何形如 $\operatorname{Re}s>1-\varepsilon$（$\varepsilon>0$ 固定）的无零点带（文献结果）。另一端，一切幂次的累计矢高非负（[@rem-ch34-li-criterion-sagitta-literature]）等价于开放的 [@conj-riemann-hypothesis]。

Li 判据在每个幂次上只看一个数。把各幂次的割弦放进同一张比较表，就得到一族托普利茨矩阵；所钉仓库已冻结的相关事实如下。

::: {.proposition #prop-ch34-li-curvature-toeplitz title="Li 曲率的托普利茨矩阵：几何多项式能量、圆周矩的正性、全一向量读出、负 Li 系数的特征值界与厄尔米特实根判据" lean="D5/S3/Weil/TestFunctions/LiCurvatureCriterion.geometric_energy_second_difference D5/S3/Weil/TestFunctions/LiCurvatureCriterion.circle_moment_toeplitz_posSemidef D5/S3/Weil/TestFunctions/LiCurvatureFiniteReconstruction.recurrence_eq_toeplitz_ones_quadratic D5/S3/Weil/TestFunctions/LiCurvatureFiniteReconstruction.negative_recurrence_bounds_smallest_eigenvalue D5/S3/Zeros/Endpoints/CanonicalLiLocalExpansion.canonical_li_one_pos D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.canonical_curvature_posSemidef_implies_rh D5/S3/Constants/NewtonHankelRealRootCriterion.newtonHankel_posSemidef_iff_roots_real"}
记 $\lambda_n$ 为 [@prop-ch34-li-sagitta-frozen] 第 2 款的 Li 系数。对复数列 $c:\mathbb{Z}\to\mathbb{C}$ 与正整数 $N$，记 $T_N(c)$ 为 $N\times N$ 复矩阵，其 $(j,k)$ 元为 $c_{j-k}$（$0\le j,k<N$）。

1. **几何多项式的能量。** 对单位圆上的 $z$ 令 $G_n(z)=\sum_{j=0}^{n-1}z^j$（$G_0=0$）。则对一切 $n\ge1$，
   $$
   \lvert G_{n+1}(z)\rvert^2-2\lvert G_n(z)\rvert^2+\lvert G_{n-1}(z)\rvert^2=2\operatorname{Re}z^n .
   $$
2. **圆周矩的托普利茨正性。** 设 $\mu$ 是单位圆上的有限博雷尔测度，$c_k=\int z^{-k}\,d\mu(z)$（$k\in\mathbb{Z}$）。则对每个 $N\ge1$，$T_N(c)$ 半正定。
3. **全一向量读出。** 设实数列 $(x_n)_{n\ge0}$、实数 $L\ge0$ 与复数列 $c$ 满足 $x_0=0$，$x_1=L$，$c_0=1$，对一切 $k$ 有 $c_{-k}=\overline{c_k}$，并且对一切 $n\ge1$ 有 $x_{n+1}-2x_n+x_{n-1}=2L\operatorname{Re}c_n$。则对一切 $n\ge1$，
   $$
   x_n=L\cdot\operatorname{Re}\sum_{j=0}^{n-1}\sum_{k=0}^{n-1}c_{j-k},
   $$
   即 $x_n$ 是 $L$ 乘以 $T_n(c)$ 在全一向量上的二次型的实部。
4. **负读出给出负特征值。** 在第 3 款的假设下，再设 $L>0$、$n\ge1$ 且 $x_n<0$。则 $T_n(c)$ 是厄尔米特矩阵，其最小特征值不超过 $\dfrac{x_n}{nL}$，而 $\dfrac{x_n}{nL}<0$。
5. **Li 曲率的托普利茨正性蕴含 `RiemannHypothesis`。** $\lambda_1>0$。令 $c^{\mathrm{Li}}_0=1$，对 $k\ne0$ 令
   $$
   c^{\mathrm{Li}}_k=\frac{\lambda_{\lvert k\rvert+1}-2\lambda_{\lvert k\rvert}+\lambda_{\lvert k\rvert-1}}{2\lambda_1}.
   $$
   若对每个 $N\ge1$，$T_N(c^{\mathrm{Li}})$ 半正定，则 `RiemannHypothesis` 成立。
6. **厄尔米特实根判据。** 设 $r_1,\dots,r_d$ 是复数（允许重复），其取值集合在复共轭下封闭。令 $H$ 为 $d\times d$ 实矩阵，其 $(i,j)$ 元为 $\tfrac1d\operatorname{Re}\sum_{k=1}^{d}r_k^{\,i+j}$（$0\le i,j<d$）。则 $H$ 半正定，当且仅当每个 $r_k$ 都是实数。
:::

::: proof
第 1 款：$G_{n+1}=G_n+z^n$，于是 $\lvert G_{n+1}\rvert^2-\lvert G_n\rvert^2=1+2\operatorname{Re}\bigl(z^n\overline{G_n}\bigr)$；在 $\lvert z\rvert=1$ 时 $z^n\overline{G_n}=z+z^2+\dots+z^n$，相邻两次之差恰为 $z^n$。第 2 款：$T_N(c)$ 在系数向量 $a$ 上的二次型等于 $\int\bigl\lvert\sum_ja_jz^j\bigr\rvert^2d\mu$，非负。第 3 款：二阶差分递推由 $x_0,x_1$ 唯一确定整个数列；数列 $L\bigl(n+2\sum_{k=1}^{n-1}(n-k)\operatorname{Re}c_k\bigr)$ 有同样的初值与二阶差分，而它正是全一向量上二次型的 $L$ 倍。第 4 款：全一向量的模平方是 $n$，它的瑞利商等于 $x_n/(nL)$，最小特征值是瑞利商的下确界。第 5 款：$\lambda_1>0$ 来自 [@prop-ch34-li-sagitta-frozen] 第 2 款闭式的数值上下界；取 $T_{n+1}(c^{\mathrm{Li}})$ 中下标 $0$ 与 $n$ 的 $2\times2$ 主子阵，半正定给出 $\lvert c^{\mathrm{Li}}_n\rvert\le1$，即二阶差分的绝对值不超过 $2\lambda_1$；两次求和得 $\lvert\lambda_n\rvert\le\lambda_1n^2$；于是对每个 $0\le r<1$，$\sum_n\lvert\lambda_{n+1}\rvert r^n$ 收敛，[@prop-ch34-li-sagitta-frozen] 第 5 款的圆盘可和判据给出 `RiemannHypothesis`。第 6 款：$H$ 在实系数向量 $a$ 上的二次型等于 $\tfrac1d\sum_k\operatorname{Re}P(r_k)^2$，$P(z)=\sum_ia_iz^i$；全部 $r_k$ 为实数时每项是平方；若某个 $r$ 不是实数，取实系数插值多项式使 $P(r)=i$、$P(\overline r)=-i$、在其余取值上为 $0$，二次型为负。完整证明由 Lean 内核检查。
:::

第 1 款可以用 §30.3.1 的弦—矢高恒等式读出。对单位圆上的旋子 $u$，$1-u^n=(1-u)\,G_n(u)$，弦—矢高恒等式 $\lvert1-w\rvert^2=2\bigl(1-\operatorname{Re}w\bigr)$ 于是给出 $1-\operatorname{Re}u^n=\bigl(1-\operatorname{Re}u\bigr)\lvert G_n(u)\rvert^2$：$\lvert G_n(u)\rvert^2$ 是 $n$ 次幂相对一次幂的矢高放大倍数，不超过 $n^2$；第 1 款说它的二阶差分是 $2\cos n\theta$（手工推导，$u=e^{i\theta}$）。第 3 款对任何满足其假设的数列成立。取 $x_n=\lambda_n$、$L=\lambda_1$、$c=c^{\mathrm{Li}}$：$c^{\mathrm{Li}}$ 是实的偶数列，$c^{\mathrm{Li}}_0=1$，递推就是 $c^{\mathrm{Li}}$ 的定义，$\lambda_1>0$ 由第 5 款给出，于是无条件地有

$$
\lambda_n=\lambda_1\sum_{j=0}^{n-1}\sum_{k=0}^{n-1}c^{\mathrm{Li}}_{j-k}\qquad(n\ge1)
$$

（手工推导）。Li 判据只检验 $T_n(c^{\mathrm{Li}})$ 在全一向量上的值；托普利茨正性要求它在一切向量上非负，所以第 5 款的前提蕴含 [@prop-ch34-li-sagitta-frozen] 第 4 款的前提（一切 $\lambda_n\ge0$）。第 4 款说的是反过来的一件事：只要有一个 $\lambda_n<0$，$T_n(c^{\mathrm{Li}})$ 就有一个不超过 $\lambda_n/(n\lambda_1)$ 的负特征值（手工推导，第 4 款的特例）。

反方向要用到零点。按 [@rem-ch34-li-criterion-sagitta-literature] 的零点和表示（文献结果），若全部零点都在临界线上，则 $1-\cos n\theta$ 的二阶差分是 $2(1-\cos\theta)\cos n\theta$，于是 $\lambda_{n+1}-2\lambda_n+\lambda_{n-1}=\sum_\rho2v_\rho\cos n\theta_\rho$，$\lambda_1=\sum_\rho v_\rho$，

$$
c^{\mathrm{Li}}_k=\sum_\rho\frac{v_\rho}{\lambda_1}\cos k\theta_\rho ,
$$

它是单位圆上概率测度 $\sum_\rho\frac{v_\rho}{\lambda_1}\delta_{u_\rho}$ 的圆周矩：每个零点旋子按自己的矢高加权。由第 2 款，一切 $T_N(c^{\mathrm{Li}})$ 半正定（带前提的推导，前提就是开放的猜想，并用到上述文献结果）。两个方向合起来，黎曼猜想等价于“一切 $T_N(c^{\mathrm{Li}})$ 半正定”：“半正定蕴含猜想”是第 5 款；“猜想蕴含半正定”依赖零点和表示，在所钉仓库中没有冻结。所钉仓库另有一条对任意数列的条件等价式 [`li_curvature_criterion_without_herglotz`](lean:D5/S3/Weil/Probability/LiCurvatureProbabilityCompletion.li_curvature_criterion_without_herglotz)，它把完整的 Li 判据（含没有冻结的“猜想蕴含非负”方向）、二阶差分递推，以及“猜想成立时 $c$ 是单位圆上某个概率测度的矩”都列为显式前提；圆周上的表示定理（一切 $T_N$ 半正定且 $c_0=1$ 的数列恰是单位圆上唯一一个概率测度的矩）已冻结为 [`circle_herglotz_iff`](lean:D5/S3/Weil/Probability/CircleHerglotzCompletion.circle_herglotz_iff)，不再是前提。那些显式前提对 $\lambda_n$ 没有在仓库中被证明。这又是一个等价改写，[@conj-riemann-hypothesis] 仍然开放。另一种不同的等价改写见 M. Suzuki, *Li coefficients as norms of functions in a model space*, arXiv:2301.05779（2023）：黎曼猜想等价于每个 $\lambda_n$ 都是某个具体函数的范数（文献结果）。

第 6 款也可以读成旋子的话。旋子 $u$ 的凯莱坐标 $w=i\,\dfrac{1+u}{1-u}$ 把单位圆（去掉 $u=1$）送到实轴，把 $u\mapsto1/\overline u$ 送到复共轭；对零点旋子 $u_\rho=1-\tfrac1\rho$，$w_\rho=i(2\rho-1)$，它是实数当且仅当 $\operatorname{Re}\rho=\tfrac12$，并且 $\overline{w_\rho}=w_{1-\overline\rho}$。所以对任意在 $\rho\mapsto1-\overline\rho$ 下封闭的有限点列，第 6 款给出：以 $r_k=i(2\rho_k-1)$ 作的矩阵 $H$ 半正定，当且仅当这些点全在临界线上（手工推导，由第 6 款代换得到）。

::: {.remark #rem-ch34-finite-toeplitz-inertia title="有限旋子族的托普利茨惯性：负特征值的个数等于离开单位圆的旋子对数（手工推导）"}
**手工推导。** 设 $u_1,\dots,u_m$ 是非零复数（允许重复），作为多重集在 $u\mapsto1/\overline u$ 下封闭。对 $k\in\mathbb{Z}$ 令 $p_k=\sum_ju_j^{\,k}$，记 $T_N=T_N(p)$。把不同的取值记作 $z_1,\dots,z_d$；其中 $e$ 个在单位圆上，其余的按 $\{z,1/\overline z\}$ 配成 $\kappa$ 对，$d=e+2\kappa$。则

1. $T_N$ 是厄尔米特矩阵；
2. 当 $N\ge d$ 时，$T_N$ 恰有 $e+\kappa$ 个正特征值、$\kappa$ 个负特征值，零特征值的重数为 $N-d$；当 $N<d$ 时，负特征值不多于 $\kappa$ 个；
3. 因而全部旋子都在单位圆上，当且仅当 $T_d$ 半正定，当且仅当一切 $T_N$ 半正定。

若这组数还在复共轭下封闭，令 $\Lambda_n=\sum_j\bigl(1-u_j^{\,n}\bigr)$（$n\ge0$，此时为实数），并设 $\Lambda_1>0$；按 [@prop-ch34-li-curvature-toeplitz] 第 5 款的式子由 $\Lambda$ 作曲率 $c_k$，则 $T_N(c)$ 有同样的惯性，只是 $d$ 与 $e$ 不计等于 $1$ 的取值。

**证明。** 设 $z_i$ 的重数为 $\mu_i$。$u\mapsto1/\overline u$ 在取值上诱导一个对合 $\tau$：$z_{\tau(i)}=1/\overline{z_i}$，$\mu_{\tau(i)}=\mu_i$；$\tau(i)=i$ 当且仅当 $\lvert z_i\rvert=1$。由 $z^{-k}=\overline{\bigl(1/\overline z\bigr)^k}$，

$$
p_{j-k}=\sum_i\mu_i\,z_i^{\,j}\,\overline{z_{\tau(i)}^{\,k}} ,
$$

所以 $T_N=AMA^{*}$，其中 $A$ 是 $N\times d$ 矩阵，第 $i$ 列为 $\bigl(z_i^{\,j}\bigr)_{0\le j<N}$；$M$ 是 $d\times d$ 矩阵，$M_{i,\tau(i)}=\mu_i$，其余元为零；$A^{*}$ 为共轭转置。$M$ 是厄尔米特的，这给出第 1 款。$M$ 的不动点给出对角元 $\mu_i>0$；每个 $2$ 循环给出一个块，两个非对角元都是 $\mu_i$，特征值为 $\pm\mu_i$。所以 $M$ 恰有 $e+\kappa$ 个正特征值、$\kappa$ 个负特征值、没有零特征值。当 $N\ge d$ 时，$A$ 的前 $d$ 行是取值互异的范德蒙矩阵，可逆，于是 $A^{*}:\mathbb{C}^N\to\mathbb{C}^d$ 是满射，$\ker T_N=\ker A^{*}$ 的维数为 $N-d$。若 $M$ 在子空间 $V$ 上负定，取 $W\subset\mathbb{C}^N$ 使 $A^{*}$ 把 $W$ 一一映到 $V$，则 $T_N$ 在 $W$ 上负定；反之若 $T_N$ 在 $W'$ 上负定，$A^{*}$ 在 $W'$ 上单射（否则某个非零 $x$ 使 $x^{*}T_Nx=0$），$M$ 在 $A^{*}W'$ 上负定。正的方向同理。这给出第 2 款中 $N\ge d$ 的情形；$N<d$ 时只剩后一半论证，给出不等式。第 3 款是第 2 款的推论。

曲率版本：$\Lambda_{k+1}-2\Lambda_k+\Lambda_{k-1}=\sum_j2v_ju_j^{\,k}$，其中 $v(u)=1-\tfrac12\bigl(u+u^{-1}\bigr)=-\dfrac{(u-1)^2}{2u}$；共轭封闭使 $p_1$ 为实数，故 $\sum_jv_j=m-p_1=\Lambda_1$。于是 $c_k=\sum_jw_ju_j^{\,k}$（一切 $k\in\mathbb{Z}$），$w_j=v_j/\Lambda_1$，并且 $v\bigl(1/\overline u\bigr)=\overline{v(u)}$。同样的分解给出 $T_N(c)=AM_wA^{*}$，$\bigl(M_w\bigr)_{i,\tau(i)}=\mu_iw(z_i)$。$w$ 只在 $z=1$ 处为零，这些列可以删去；单位圆上 $z\ne1$ 处 $v=1-\operatorname{Re}z>0$，$\Lambda_1>0$ 使 $w>0$；一对离开单位圆的取值给出两个非对角元 $\mu w(z)$ 与 $\mu\overline{w(z)}$，特征值为 $\pm\mu\lvert w(z)\rvert\ne0$。其余同上。$\square$

**几点说明（手工推导）。** 其一，$u\mapsto1/\overline u$ 的封闭必须连重数一起成立，只有取值集合封闭不够：多重集 $\{2,\tfrac12,\tfrac12\}$ 的 $T_2$ 有 $p_{-1}=\tfrac92\ne p_1=3$，它不是厄尔米特的。其二，$\Lambda_1>0$ 不能去掉：$\Lambda_1<0$ 时单位圆上不等于 $1$ 的取值给出负特征值。其三，这里的 $d$ 是有限的；对 $\zeta$ 的零点 $d$ 是无穷，上面没有任何一步可以照搬。其四，这与厄尔米特的经典定理同一机制：多项式根的牛顿幂和作成的汉克尔二次型，正、负惯性数分别计数互异实根数加共轭根对数与共轭根对数（厄尔米特与西尔维斯特的经典结果；系统的叙述见 M. G. Krein, M. A. Naimark, *Linear and Multilinear Algebra* **10**, 265–308, 1981，俄文原版 1936；文献结果）；凯莱坐标把单位圆换成实轴。所钉仓库冻结的是其中“半正定当且仅当全为实根”的部分（[@prop-ch34-li-curvature-toeplitz] 第 6 款）与上面第 3 款的单位圆形式（[@prop-ch34-finite-toeplitz-circle-criterion]），都不含惯性计数。上面的单位圆形式本书没有找到逐字相同的出处，不主张新颖性。

**与 Li 和的关系。** 由 [@prop-ch34-li-curvature-toeplitz] 第 3 款，$\Lambda_n=\Lambda_1\sum_{j,k<n}c_{j-k}$：有限族的 Li 和正是曲率托普利茨矩阵在全一向量上的读数。Li 和检验每个尺寸的一个向量；托普利茨矩阵检验一切向量，在尺寸 $d$ 处就看全了。

**有限域上的曲线（文献结果与手工推导）。** 设 $C$ 是 $\mathbb{F}_q$ 上亏格 $g$ 的光滑射影曲线，$N_n=\#C(\mathbb{F}_{q^n})$，$\alpha_1,\dots,\alpha_{2g}$ 是其 $L$ 多项式的倒根；则 $N_n=q^n+1-\sum_i\alpha_i^{\,n}$，倒根多重集在 $\alpha\mapsto q/\alpha$ 与复共轭下封闭（A. Weil, 1948；文献结果）。令 $u_i=\alpha_i/\sqrt q$，它们在 $u\mapsto1/\overline u$ 下封闭，

$$
p_k=\frac{q^k+1-N_k}{q^{k/2}}\ (k\ge1),\qquad p_0=2g,\qquad N_n=q^n+1-q^{n/2}\bigl(2g-\Lambda_n\bigr)
$$

（手工推导）。不同取值至多 $2g$ 个，所以由上面的第 2 款（取 $N=2g\ge d$）：“全部 $\lvert\alpha_i\rvert=\sqrt q$”等价于由 $N_1,\dots,N_{2g-1}$ 作出的 $2g\times2g$ 矩阵 $\bigl(p_{\lvert j-k\rvert}\bigr)$ 半正定（手工推导）。前者是韦伊定理（A. Weil, 1948；文献结果），所以这个矩阵对每条曲线都半正定。这只是韦伊定理的有限改写：正性来自韦伊的证明，不是来自这张表。
:::

上面第 3 款中“尺寸不小于互异取值数时，半正定当且仅当全在单位圆上”的部分已在所钉仓库冻结，陈述如下；惯性计数（第 2 款）与厄尔米特性（第 1 款）仍是手工推导。

::: {.proposition #prop-ch34-finite-toeplitz-circle-criterion title="有限旋子族的单位圆判据" lean="D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.powerSum_toeplitz_posSemidef_of_norm_eq_one"}
设 $u_1,\dots,u_m$ 是复数（允许重复），对 $k\in\mathbb{Z}$ 令 $p_k=\sum_ju_j^{\,k}$，并对 $N\ge1$ 令 $T_N=\bigl(p_{j-k}\bigr)_{0\le j,k<N}$。这里“半正定”指厄尔米特且 $x^{*}T_Nx\ge0$ 对一切 $x\in\mathbb{C}^N$ 成立。

1. 设每个 $u_j\ne0$，指标集上有一个置换 $\sigma$ 使 $u_{\sigma(j)}=1/\overline{u_j}$ 对每个 $j$ 成立，并且 $u_1,\dots,u_m$ 中互异取值的个数不超过 $N$。则 $T_N$ 半正定，当且仅当 $\lvert u_j\rvert=1$ 对每个 $j$ 成立。
2. 若 $\lvert u_j\rvert=1$ 对每个 $j$ 成立，则 $T_N$ 对每个 $N\ge1$ 半正定。
:::

::: proof
置换 $\sigma$ 的存在与“多重集在 $u\mapsto1/\overline u$ 下封闭”是同一件事，所以第 1 款的假设与 [@rem-ch34-finite-toeplitz-inertia] 相同。

第 2 款：模长为 $1$ 时 $u_j^{-k}=\overline{u_j^{\,k}}$，所以 $p_{j-k}=\sum_iu_i^{\,j}\,\overline{u_i^{\,k}}$，$T_N$ 是 $m$ 个秩一半正定矩阵之和。Lean 中把它读作单位圆上一个有限原子测度的矩矩阵，直接使用已冻结的 [`circle_moment_toeplitz_posSemidef`](lean:D5/S3/Weil/TestFunctions/LiCurvatureCriterion.circle_moment_toeplitz_posSemidef)。

第 1 款的“当”方向就是第 2 款。“仅当”方向：以 $x$ 的分量为系数作多项式 $P(w)=\sum_{b<N}x_bw^b$，则

$$
x^{*}T_Nx=\sum_j\overline{P\bigl(\overline{u_j}\bigr)}\;P\bigl(\overline{u_{\sigma(j)}}\bigr).
$$

若某个取值 $z$ 不在单位圆上，则 $1/\overline z\ne z$。互异取值不超过 $N$ 个，所以可用拉格朗日插值取次数小于 $N$ 的 $P$，使它在 $\overline z$ 处取 $1$，在 $1/z$ 处取 $-1$，在其余取值的共轭处取 $0$。上式中只有 $u_j=z$ 与 $u_j=1/\overline z$ 的项不为零，每项等于 $-1$，于是 $x^{*}T_Nx<0$，$T_N$ 不是半正定的。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-toeplitz-versus-li-numbers title="托普利茨检验与 Li 和的对照：假想四点、混合有限族、ζ 本身与亏格 2 曲线"}
下列数值由 60 至 200 位精度计算，四舍五入到所示位数；零点纵坐标是数值结果（文献结果，未在本书形式化）。

**假想四点 $\tfrac{7}{10}\pm5i$、$\tfrac{3}{10}\pm5i$。** 这里 $d=4$，$\kappa=2$。曲率托普利茨矩阵 $T_2(c)$ 半正定（最小特征值 $0.0195853$）；$T_3(c)$ 已有一个负特征值（$-1.68372\times10^{-6}$）；$T_4(c)$ 恰有两个（最小者 $-1.01327\times10^{-5}$），与 [@rem-ch34-finite-toeplitz-inertia] 一致。Li 和要到 $n=31$ 才第一次为负（[@ex-ch34-zero-rotor-sagitta-numbers]）；在 $n=31$ 处，$T_{31}(c)$ 的最小特征值为 $-0.0798386$，不超过 $\Lambda_{31}/(31\Lambda_1)=-0.0385956$（[@prop-ch34-li-curvature-toeplitz] 第 4 款）。按 [@prop-ch34-li-curvature-toeplitz] 第 6 款作 $r_k=i(2\rho_k-1)=\mp10\pm0.4i$，$4\times4$ 矩阵 $H$ 有两个负特征值 $-0.657744$ 与 $-0.00646136$。

**混合有限族。** 离线四点 $\tfrac12\pm0.1\pm14i$ 配上前 $80$ 对真实零点（[@ex-ch34-zero-rotor-sagitta-numbers] 中 Li 和第一次为负在 $n=8446$）。曲率托普利茨矩阵的最小特征值：$N=7$ 时 $1.36621\times10^{-21}$，$N=8$ 时 $-1.10111\times10^{-26}$。60 位与 120 位精度的结果在所示位数上一致；等价的说法是 $T_7(c)$ 正定而 $\det T_8(c)=-2.86314\times10^{-83}<0$。所以 $T_8(c)$ 已经看出离线旋子；代价是负特征值只有 $10^{-26}$ 量级，曲率 $c_k$ 的误差必须远小于 $10^{-27}$ 才能分辨它的符号。迟到的符号变化换成了极小的特征值，没有白得的检验。

**$\zeta$ 本身。** 按 [@prop-ch34-li-sagitta-frozen] 第 2 款的定义计算 $\lambda_1,\dots,\lambda_{41}$（用两种独立方法：对 $\operatorname{Log}\xi\bigl(\tfrac1{1-z}\bigr)$ 在 $\lvert z\rvert=\tfrac12$ 上作柯西积分；由斯蒂尔切斯常数与多伽马函数值拼出 $\log\xi$ 在 $s=1$ 处的泰勒级数。两者在远超所示位数处一致），再作 $c^{\mathrm{Li}}$：$c^{\mathrm{Li}}_1=0.999196807$，$c^{\mathrm{Li}}_2=0.996790337$。$T_N(c^{\mathrm{Li}})$ 的最小特征值：$N=2$ 时 $8.03193\times10^{-4}$，$N=4$ 时 $2.24401\times10^{-10}$，$N=8$ 时 $3.72999\times10^{-25}$，$N=20$ 时 $5.24343\times10^{-74}$，都为正。这是 $N\le20$ 的数值事实，与 [@prop-ch34-li-curvature-toeplitz] 第 5 款的前提相容；它不是对一切 $N$ 的结论，也不提供关于零点位置的新信息。

**亏格 2 曲线。** $y^2=x^5+2x+1$ 在 $\mathbb{F}_3$ 上：$N_1,N_2,N_3,N_4=7,15,19,83$（逐点计数），$L$ 多项式为 $1+3T+7T^2+9T^3+9T^4$，由它预言的 $N_3,N_4$ 与计数一致。只用 $N_1,N_2,N_3$ 作出的 $4\times4$ 矩阵 $\bigl(p_{\lvert j-k\rvert}\bigr)$ 的特征值为 $0.185386$、$2.26672$、$5.73328$、$7.81461$，全为正。对照：形如 $1+15T^2+25T^4$（$q=5$）的多项式给出旋子 $\pm i\varphi$、$\pm i\varphi^{-1}$，$\varphi=\tfrac{1+\sqrt5}{2}$；$p_1=p_3=0$，$p_2=-6$，矩阵的特征值恰为 $10,10,-2,-2$，两个负特征值对应两对离开单位圆的旋子，Li 和在 $n=4$ 第一次为负（$\Lambda_4=-10$）。由韦伊定理，没有曲线以它为 $L$ 多项式（手工推导）。
:::

上例中离线旋子都离单位圆很近，Li 和要等很久才变负。对单独一对旋子，等待的时间可以精确估计。

::: {.remark #rem-ch34-off-circle-pair-detection title="一对离开单位圆的旋子让 Li 和变负的时刻（手工推导）"}
**手工推导。** 设 $\eta>0$、$\phi$ 为实数，四个旋子 $e^{\pm\eta\pm i\phi}$（在共轭与 $u\mapsto1/\overline u$ 下封闭；零点四元组 $\rho,\overline\rho,1-\rho,1-\overline\rho$ 的旋子就是这种形状），其 Li 和为

$$
\Lambda_n=4\bigl(1-\cosh(n\eta)\cos(n\phi)\bigr).
$$

记 $n_*$ 为使 $\Lambda_n<0$ 的最小正整数。

1. **上界。** $n_*\le7\left\lceil\dfrac1\eta\right\rceil$。
2. **量级不可改进。** 设 $x_*$ 为方程 $\cosh x\cos2x=1$ 在 $\bigl(\tfrac{3\pi}4,\pi\bigr)$ 内的根，$x_*=2.4428863005\ldots$。若 $\phi=2\eta$ 且 $0<\eta\le\pi-x_*$，则 $n_*=\left\lfloor\dfrac{x_*}{\eta}\right\rfloor+1$。
3. **零点坐标。** 对 $\rho=\beta+i\gamma$，$\lvert u_\rho\rvert^2=1+\dfrac{1-2\beta}{\lvert\rho\rvert^2}$，所以 $\eta=\tfrac12\left\lvert\ln\left(1+\dfrac{1-2\beta}{\lvert\rho\rvert^2}\right)\right\rvert$，约为 $\dfrac{\lvert1-2\beta\rvert}{2\lvert\rho\rvert^2}$。

**证明。** 第 1 款：令 $L=\lceil1/\eta\rceil$。由狄利克雷逼近定理，存在 $1\le k\le7$ 使 $kL\phi$ 与 $2\pi\mathbb{Z}$ 的距离不超过 $\tfrac{2\pi}{8}$。取 $n=kL$，则 $\cos n\phi\ge\cos\tfrac\pi4=\tfrac{1}{\sqrt2}$，$n\eta\ge1$ 使 $\cosh(n\eta)\ge\cosh1>1.543>\sqrt2$，乘积大于 $1$。第 2 款：令 $f(x)=\cosh x\cos2x$。在 $\bigl(0,\tfrac\pi4\bigr)$ 上，$\ln f$ 的导数 $\tanh x-2\tan2x<0$（因 $\tanh x<x<4x\le2\tan2x$），而 $\ln f(0)=0$，故 $f<1$；在 $\bigl[\tfrac\pi4,\tfrac{3\pi}4\bigr]$ 上 $\cos2x\le0$；在 $\bigl(\tfrac{3\pi}4,\pi\bigr]$ 上两个因子都为正且严格递增，$f$ 严格递增，在 $x_*$ 处等于 $1$。所以 $f(x)>1$ 在 $(0,\pi]$ 内恰对 $x\in(x_*,\pi]$ 成立。$\Lambda_n<0$ 即 $f(n\eta)>1$；最小的满足 $n\eta>x_*$ 的 $n$ 是 $\lfloor x_*/\eta\rfloor+1$，此时 $n\eta\le x_*+\eta\le\pi$。第 3 款：$\lvert u_\rho\rvert^2=\dfrac{(\beta-1)^2+\gamma^2}{\beta^2+\gamma^2}$。$\square$

数值核对：$20000$ 组随机 $(\eta,\phi)$ 都满足第 1 款；$\eta=0.1,0.03,0.01,0.003,0.001$ 时第 2 款给出 $n_*=25,82,245,815,2443$，与逐项计算一致。对假想四点 $\tfrac7{10}\pm5i$、$\tfrac3{10}\pm5i$，$\eta=0.0079084$，第 1 款的上界是 $889$，实际 $n_*=31$；对 $\tfrac12\pm0.1\pm14i$，上界是 $13741$，实际 $n_*=88$。第 1 款只对单独一个四元组成立；有限族里其余旋子的非负贡献可以把符号变化推迟得多（[@ex-ch34-zero-rotor-sagitta-numbers] 中的 $8446$），对一般有限族，同样的抽屉原理论证给出的上界随互异相位的个数指数增长。离线四元组离临界线越近、位置越高，$\eta$ 越小，第 1 款的上界越大；这是关于单独四元组的陈述，不是关于 $\lambda_n$ 的陈述。
:::

上面的有限域段落说，曲线的托普利茨矩阵半正定来自韦伊定理。所钉仓库对一族具体曲线冻结了韦伊不等式本身，陈述如下。

::: {.proposition #prop-ch34-fermat-weil-bound-frozen title="费马曲线的韦伊界（雅可比和证明）" lean="D5/S3/CharacterSums/Fermat/CharacterPointCount.projective_weil_bound"}
设 $F$ 是有限域，$q=\lvert F\rvert$，整数 $d\ge2$ 整除 $q-1$。记 $N$ 为射影平面 $\mathbb{P}^2(F)$ 中满足 $x^d+y^d=z^d$ 的点 $[x:y:z]$ 的个数。则

$$
\lvert N-(q+1)\rvert\le(d-1)(d-2)\sqrt q .
$$
:::

::: proof
取 $F$ 上阶恰为 $d$ 的复值乘法特征 $\chi$（$d\mid q-1$ 保证存在）。点数恰等于 $q+1$ 加上 $(d-1)(d-2)$ 个雅可比和 $J(\chi^i,\chi^j)$ 之和，其中 $1\le i,j<d$ 且 $i+j\ne d$。对其中每一项，$\chi^i$、$\chi^j$、$\chi^{i+j}$ 都不是平凡特征，所以 $\lvert J(\chi^i,\chi^j)\rvert=\sqrt q$（[`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum)），三角不等式给出上式。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch34-weil-toeplitz-hodge-index title="有限域上托普利茨正性的来源：曲面 C×C 上相交形式的压缩（文献结果与手工推导）"}
**文献结果，未在本书形式化**，外加手工推导。设 $C$ 是 $\mathbb{F}_q$ 上亏格 $g$ 的光滑射影几何不可约曲线，$S=\overline C\times\overline C$（$\overline C$ 是 $C$ 在代数闭包上的基变换），$F$ 为 $q$ 次弗罗贝尼乌斯，$\Gamma_n\subset S$ 是 $F^n$ 的图像，$\Gamma_0=\Delta$ 为对角线，$f_1=\{x_0\}\times\overline C$，$f_2=\overline C\times\{y_0\}$。所用文献事实：（甲）曲面的霍奇指标定理在任意特征下成立：$H$ 丰沛且 $D\cdot H=0$ 时 $D^2\le0$，等号当且仅当 $D$ 数值等价于零（A. Grothendieck, *J. reine angew. Math.* **200**, 208–215, 1958，DOI `10.1515/crll.1958.200.208`；R. Hartshorne, *Algebraic Geometry*, 第五章定理 1.9）；（乙）$\Gamma_n\cdot\Delta=N_n$（$n\ge1$），$\Delta^2=2-2g$，$\Gamma_n\cdot f_1=1$，$\Gamma_n\cdot f_2=q^n$，$f_1^2=f_2^2=0$，$f_1\cdot f_2=1$（参见 Hartshorne 第五章习题 1.9–1.10）；（丙）韦伊的证明用的是卡斯泰尔诺沃—塞韦里不等式（A. Weil, *Sur les courbes algébriques et les variétés qui s'en déduisent*, Hermann, 1948；A. Mattuck, J. Tate, *Abh. Math. Sem. Univ. Hamburg* **22**, 295–299, 1958，DOI `10.1007/BF02941959`）。

**手工推导。** 记 $p_0=2g$，$p_m=\dfrac{q^m+1-N_m}{q^{m/2}}$（$m\ge1$，即 [@rem-ch34-finite-toeplitz-inertia] 末段的幂和）。

1. $\Gamma_j\cdot\Gamma_k=q^{\min(j,k)}N_{\lvert j-k\rvert}$，其中约定 $N_0=2-2g$。
2. 令 $\gamma_n=\Gamma_n-q^nf_1-f_2$。则 $\gamma_n\cdot f_1=\gamma_n\cdot f_2=0$，并且 $\gamma_j\cdot\gamma_k=-q^{(j+k)/2}p_{\lvert j-k\rvert}$。
3. 于是 $e_j=q^{-j/2}\gamma_j$ 满足 $e_j\cdot e_k=-p_{\lvert j-k\rvert}$：对每个 $N$，托普利茨矩阵 $\bigl(p_{\lvert j-k\rvert}\bigr)_{0\le j,k<N}$ 恰是相交形式在 $e_0,\dots,e_{N-1}$ 上的格拉姆矩阵的相反数。
4. 因此对每个 $N$，$\bigl(p_{\lvert j-k\rvert}\bigr)_{0\le j,k<N}$ 半正定。

**证明。** 第 1 款：设 $j\ge k$，$\varphi=F^k\times1$ 是 $q^k$ 次有限态射。在局部坐标中 $\Gamma_m$ 由 $y=x^{q^m}$ 给出，它的拉回 $y=x^{q^{m+k}}$ 是约化的，所以 $\varphi^{*}\Gamma_{j-k}=\Gamma_j$，$\varphi^{*}\Delta=\Gamma_k$；投影公式给出 $\Gamma_j\cdot\Gamma_k=q^k\,(\Gamma_{j-k}\cdot\Delta)$，再用（乙）。第 2 款：由（乙）直接得 $\gamma_n\cdot f_1=1-1=0$，$\gamma_n\cdot f_2=q^n-q^n=0$；于是 $\gamma_j\cdot\gamma_k=\Gamma_j\cdot\gamma_k=\Gamma_j\cdot\Gamma_k-q^k-q^j$，代入第 1 款并用 $q^{m/2}p_m=q^m+1-N_m$（$m=0$ 时 $N_0-2=-2g$）。第 3 款由第 2 款除以 $q^{(j+k)/2}$ 得到。第 4 款：$f_1+f_2$ 丰沛，每个 $e_j$ 与它正交，由（甲），相交形式在 $e_j$ 张成的实空间上半负定。$\square$

所以链条是：相交形式在 $f_1+f_2$ 的正交补上半负定（霍奇指标定理）$\Rightarrow$ 一切 $\bigl(p_{\lvert j-k\rvert}\bigr)_{j,k<N}$ 半正定 $\Rightarrow$ 一切 $\lvert\alpha_i\rvert=\sqrt q$ $\Rightarrow$ $\lvert N_n-q^n-1\rvert\le2gq^{n/2}$。第二步取 $N=2g$，用上面有限域段落中 $u_i=\alpha_i/\sqrt q$ 在 $u\mapsto1/\overline u$ 下的封闭（文献结果）与 [@prop-ch34-finite-toeplitz-circle-criterion] 第 1 款。下标 $\{0,n\}$ 上的 $2\times2$ 主子阵是 $\begin{pmatrix}2g&p_n\\p_n&2g\end{pmatrix}$，它半正定恰好是 $\lvert N_n-q^n-1\rvert\le2gq^{n/2}$；所涉及的除子类（对角线、$\Gamma_n$ 与两条纤维）正是韦伊、马图克—泰特与格罗滕迪克的证明中所用的那几类。这与 [@prop-ch34-li-curvature-toeplitz] 第 5 款的证明同形：那里也只取下标 $0$ 与 $n$ 的 $2\times2$ 主子阵。由（甲）的等号情形，格拉姆矩阵的零向量给出 $e_j$ 之间的数值关系，例如椭圆曲线上 $e_2-p_1e_1+e_0$ 数值等价于零，这是 $F^2-aF+q=0$ 的影子。我们没有在文献中找到这一托普利茨形式的逐字出处，不主张新颖性。

**例（逐点计数与精确计算，手工推导）。** 椭圆曲线 $y^2=x^3+x+1$ 在 $\mathbb{F}_5$ 上：$N_1,N_2,N_3=9,27,108$，$a=q+1-N_1=-3$，$p_1=-3/\sqrt5$，$p_2=-\tfrac15$。下标 $\{0,1\}$ 上的主子阵 $\begin{pmatrix}2&-3/\sqrt5\\-3/\sqrt5&2\end{pmatrix}$ 的行列式是 $4-\tfrac95=\tfrac{11}5>0$，这就是哈塞界 $\lvert a\rvert\le2\sqrt5$ 的 $2\times2$ 形式；$e_0,e_1,e_2$ 的格拉姆矩阵的特征值恰为 $-\tfrac{19}5$、$-\tfrac{11}5$、$0$，零特征向量是 $(1,-p_1,1)$。

**与 [@prop-ch34-fermat-weil-bound-frozen] 的关系（手工推导，用到文献结果）。** 设 $d\ge3$，$d\mid q-1$；这时 $\mathbb{F}_q$ 的特征不整除 $d$，平面曲线 $x^d+y^d=z^d$ 光滑，亏格 $g=\tfrac{(d-1)(d-2)}2$（文献结果）。由 $d\mid q^n-1$，该命题对每个 $\mathbb{F}_{q^n}$ 成立，给出 $\lvert p_n\rvert\le2g$（$n\ge1$）。由 $\zeta$ 函数的有理性（F. K. Schmidt, *Math. Z.* **33**, 1–32, 1931；文献结果），$\sum_{n\ge1}p_nz^n=\sum_i\dfrac{u_iz}{1-u_iz}$；左端系数有界，所以右端在 $\lvert z\rvert<1$ 内没有极点，$\lvert u_i\rvert\le1$；再由 $u\mapsto1/\overline u$ 下的封闭得 $\lvert u_i\rvert=1$，于是由 [@prop-ch34-finite-toeplitz-circle-criterion] 第 2 款，每个 $\bigl(p_{\lvert j-k\rvert}\bigr)_{j,k<N}$ 半正定。这条路走雅可比和，不经过霍奇指标定理，也只覆盖这一族曲线。

**$\zeta$ 缺什么（文献结果与评注）。** 对 $\zeta$，没有已知的曲面扮演 $\overline C\times\overline C$ 的角色：没有已知的带相交形式的格，使 $-T_N(c^{\mathrm{Li}})$ 成为其中某组类的格拉姆矩阵，也没有相应的霍奇指标定理。韦伊证明了黎曼猜想等价于由显式公式作出的一个二次泛函的正性（A. Weil, *Sur les « formules explicites » de la théorie des nombres premiers*, Comm. Sém. Math. Univ. Lund, 1952；文献结果）；这又是一个等价改写，[@conj-riemann-hypothesis] 仍然开放。上面的有限域论证只说明正性在那里从何而来，不提供 $\zeta$ 的证明途径。
:::

以上各条要么只涉及有限族，要么是对 $\zeta$ 的等价改写；它们都不判定 $\zeta$ 的零点是否全在临界线上，[@conj-riemann-hypothesis] 仍然开放。

单步导数与一维路径乘积积分各就各位之后，我们迎来了微积分大厦最壮丽的穹顶：高维流形上的外微分与广义斯托克斯定理。

## 30.3.3 `1—3—3—1` 有限网格零误差斯托克斯定理、三行高斯—博内证明与非阿贝尔面和乐锚定 {#sec-ch34-30-3}

在传统偏微分方程与有限元数值分析中，人们习以为常地认为：“连续微积分是绝对精确的，而一旦把曲面剖分成有限块离散网格，斯托克斯定理 $\int_{\partial\Sigma}\omega = \int_\Sigma d\omega$ 的离散版本就会带来 $\mathcal{O}(h^2)$ 的离散误差，必须让网格步长 $h \to 0$、三角形数目 $M \to \infty$ 才能消除离散误差。”

把这一成见放到 [§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 与 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的 **`1—3—3—1` 克利福德—上链复形**下审视，就会看清这一误差究竟落在哪里：**微积分基本定理与广义斯托克斯定理根本不是连续极限 $\epsilon \to 0$ 赐予的分析近似，而是有限胞腔拼接的纯组合拓扑恒等式——只要把被积对象还原为极小圆弧体上的上链（Cochains），它在任意粗糙的有限孔径网格（哪怕整座半球只切成 $M = 4$ 块大圆弧三角形！）上离散化截断误差恒等于绝对的零！**这正是 Whitney 上链与离散外微分的标准事实；误差并没有消失，而是转移到了“把连续 $1$-形式逐棱精确积分为上链”这一步（下文卦限算例正是逐棱解析积分）。

让我们在三维空间胞腔复形 $\mathcal{K}$ 的杨辉回文维数阶梯 $\binom{3}{0} : \binom{3}{1} : \binom{3}{2} : \binom{3}{3} = 1 : 3 : 3 : 1$ 上（希拉尼 Hirani 2003；Desbrun 等人 2005 离散外微分 DEC，文献结果），严格区分**阿贝尔无序精确相消**与**非阿贝尔锚定有序相消**两层结构：

### 30.3.3.1 阿贝尔上链与球面曲率角盈：无序共棱正反抵消、零误差斯托克斯与三行高斯—博内定理 {#1-阿贝尔上链与球面曲率角盈无序共棱正反抵消零误差斯托克斯与三行高斯博内定理}

设定向曲面片 $\Sigma$ 由有限 $M \ge 1$ 枚以大圆测地弧为棱的极小圆弧体（球面三角形）$\{\Delta\mathcal{T}_k\}_{k=1}^M$ 严丝合缝拼接而成，并在有向半边（dart）$e_{AB}$ 上赋予阿贝尔群值（如 $\mathbb{R}$ 或相位加群 $\mathbb{R}/2\pi\mathbb{Z}$）的 $1$-上链环流 $\Phi_\epsilon(e_{AB})$，满足反演反对称律 $\Phi_\epsilon(e_{BA}) = -\Phi_\epsilon(e_{AB})$；每一枚圆弧体面元上的外微分 $2$-上链曲率通量定义为 $(d_\epsilon\Phi_\epsilon)(\Delta\mathcal{T}_k) := \sum_{e \subset \partial\Delta\mathcal{T}_k} \Phi_\epsilon(e)$（在量子纯态射影几何中，单枚球面三角形面元的定向有向体积相位盈余即由三点巴格曼布洛赫迹定理 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 精确锁定；参见 [§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)）。将全部 $M$ 枚面元的曲率通量相加：每一条内部公共圆弧棱 $e_{\mathrm{int}}$ 恰好被左右两枚相邻圆弧体以一正（$e_{AB}$）一反（$e_{BA}$）的相反半边方向各走一次（对应下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 4 款 `face_cycle_exact` 与 `cycle_face_sides` 的对偶半边边界精确机制在实系数上的推广；这两条冻结声明本身是 $\mathbb{Z}/2$ 系数平面图上的结论），因而在任意有限网格尺度下恒有

$$
\Phi_\epsilon(e_{AB}) + \Phi_\epsilon(e_{BA}) = 0 \quad \Longrightarrow \quad \sum_{k=1}^{M} (d_\epsilon\Phi_\epsilon)(\Delta\mathcal{T}_k) \equiv \sum_{e \subset \partial\Sigma} \Phi_\epsilon(e)!
$$

等号两边没有任何高阶余项 $\mathcal{O}(\epsilon^2)$，也与求和先后顺序完全无关！继续往上升一阶到四面体体元 $\Delta^3 = [v_0, v_1, v_2, v_3]$，四个三角形面上的边界配对使每一条棱恰好以一正一反出现两次，从而有限孔径外微分自动满足**精确幂零律**（下文 [@thm-ch34-arc-rotor-calculus-and-finite-stokes] 第 5 款 `tetra_defects_incidence_repair_and_exactness`）：

$$
(d_\epsilon^2 \omega)(\Delta^3) = \omega(\partial^2\Delta^3) \equiv 0 \quad \Longleftrightarrow \quad \partial^2\Delta^3 = \emptyset.
$$

更令人拍案叫绝的是，把这套无坐标圆弧体拼接直接作用在由大圆测地弧（边测地曲率 $\kappa_g \equiv 0$）围成的任意紧致定向三角剖分曲面 $\Sigma$（设含 $F = M$ 枚常正曲率球面三角形 $\Delta\mathcal{T}_k$、$E = E_{\mathrm{int}} + E_\partial$ 条大圆弧棱与 $V = V_{\mathrm{int}} + V_\partial$ 个顶点，每个闭合边界圈上顶点数与边界棱数相等故 $V_\partial = E_\partial$）上，经典微分几何里动辄耗费数页克里斯托费尔联络计算的**高斯—博内定理**，在有限圆弧体网格上化作了**零极限、三行初等组合恒等式**（手工推导，以单个球面三角形的吉拉尔公式（A. Girard 1629，`文献结果`）为输入，对比雷吉 Regge 1961 离散曲率演算）：

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

### 30.3.3.2 非阿贝尔旋子与规范群面和乐：生成树基点锚定（Whiskering）与平面剥壳序 {#2-非阿贝尔旋子与规范群面和乐生成树基点锚定whiskering与平面剥壳序}

如果棱上承载的不是可交换阿贝尔相位，而是三维自旋旋子 $\mathrm{Spin}(3) \cong \mathrm{SU}(2)$ 或杨—米尔斯色规范群 $\mathrm{SU}(3)$ 中的**非阿贝尔群元平行输运** $\hat{U}_e \in G$（满足反演逆元律 $\hat{U}_{e^{-1}} = \hat{U}_e^{-1}$），还能像阿贝尔求和那样不问基点、无序相加吗？**绝不可以！** 因为矩阵乘法非交换 $\hat{U}_1 \hat{U}_2 \neq \hat{U}_2 \hat{U}_1$，脱离公共基点直接把不同顶点的面边界回路 $\hat{W}_k = \hat{U}_{e_{k,3}}\hat{U}_{e_{k,2}}\hat{U}_{e_{k,1}} \in G_{v_k}$ 硬乘在一起，相邻面共享的内棱两端夹着不同的矩阵因子，根本无法直接对消！

要在任意有限网格上建立**零误差非阿贝尔二维斯托克斯定理**，必须引入两项精妙的拓扑代数装备（这正是格点规范理论中 Wilson 回路与“套索”式面和乐的做法，K. G. Wilson, *Phys. Rev. D* **10**, 2445, 1974；Schlesinger 1928；Broda 1992；Schreiber & Waldorf 2009，文献结果，其阿贝尔圆群骨架已在本书 [§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 的冻结定理 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport) 与 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) 中完成机器验证）：

1. **生成树根点锚定共轭（Spanning-Tree Whiskering）**：选定全局参考根点 $r \in V$ 及连接各顶点至 $r$ 的路径系（例如一棵生成树 $T$ 上的唯一树路径输运 $\hat{P}_{r \to v_k}$），将每一枚极小圆弧体面回路拉回同一根纤维 $G_r$ 上定义为锚定面和乐（lassos / whiskered plaquettes）：

   $$
   \widetilde{W}_k^{(r)} := \hat{P}_{r \to v_k}^{-1}\,\hat{W}_k\,\hat{P}_{r \to v_k} \in G_r;
   $$

2. **圆盘平面剥壳序（Planar Shelling Order）**：对单连通圆盘剖分 $\Sigma \cong D^2$，按照从内部向外逐块剥离（使每一步并入的新面与已合并区域恰好沿一条连通内棱链相邻）的平面有序连乘次序，相邻锚定面回路接口处的共轭尾巴 $\hat{P}_{r \to A}\,\hat{U}_{AB}\,\hat{U}_{BA}\,\hat{P}_{r \to A}^{-1} = \mathbf{1}$ 严丝合缝逐对归零，从而在任意有限网格步数 $M \ge 1$ 下精确成立非阿贝尔面斯托克斯恒等式：

   $$
   \mathcal{P}_{\mathrm{shell}}\prod_{k=1}^{M} \widetilde{W}_k^{(r)} \equiv \hat{W}_{\partial\Sigma}^{(r)}!
   $$

::: {.remark #rem-ch34-shelling-stokes-and-triangle-holonomy title="剥壳序有限斯托克斯恒等式（经典套索分解的有限形式）、极小圆弧三角形的自旋和乐与有理顶点（手工推导与文献结果）"}
**剥壳序下的有限斯托克斯恒等式。** 设 $K$ 是底空间为闭圆盘的有限平面复形，每个闭面都是由一条棱圈围成的闭圆盘，边界一律逆时针定向。剥壳是面的排列 $f_1, \dots, f_N$，使每个 $D_{j-1} := f_1 \cup \dots \cup f_{j-1}$ 都是闭圆盘，且 $f_j \cap D_{j-1}$ 是一条至少含一条棱、不等于 $\partial f_j$ 的棱路径 $\alpha_j$；记 $a_j$ 为 $\alpha_j$ 沿 $\partial D_{j-1}$ 逆时针方向的起点。对任意 $\mathrm{SU}(2)$ 值上链 $U$（$U_{pq} = U_{qp}^{-1}$，路径和乐按 $\operatorname{hol}(\gamma * \gamma') = \operatorname{hol}(\gamma')\operatorname{hol}(\gamma)$ 复合）与 $\partial K$ 上任一顶点 $p$，在 $1$-骨架中存在从 $p$ 到 $a_j$ 的棱路径 $\tau_j$，使

$$
\operatorname{hol}(\partial K) \;=\; L_1 L_2 \cdots L_N, \qquad L_j := \operatorname{hol}(\tau_j)^{-1}\,F_j\,\operatorname{hol}(\tau_j), \qquad F_j := \operatorname{hol}(\partial f_j)\ \text{（在 } a_j \text{ 处）}.
$$

每个面恰贡献一个因子，按剥壳次序从左到右排列；恒等式对每个上链精确成立，不涉及极限。这是经典套索分解的精确有限形式（I. Ya. Aref'eva, *Theor. Math. Phys.* **43**, 353–356, 1980；N. E. Bralić, *Phys. Rev. D* **22**, 3090–3103, 1980；T. Lévy, *Mem. Amer. Math. Soc.* **166**, no. 790, 2003 与 *Astérisque* **329**, 2010；乘积积分写法见 R. L. Karp, F. Mansouri & J. S. Rno, *J. Math. Phys.* **40**, 6033–6043, 1999，`文献结果`）。圆盘的每个三角剖分都可剥壳（G. Danaraj & V. Klee, *Ann. Discrete Math.* **2**, 33–52, 1978，`文献结果`），所以恒等式适用于任何三角剖分的圆盘；对一般多边形复形则须先有剥壳序。证明按剥壳序归纳，每一步用切割引理：沿棱路径 $\delta$ 把闭路 $\alpha * \beta$ 切开时，$\operatorname{hol}(\alpha * \beta) = \operatorname{hol}(\bar{\delta} * \beta)\,\operatorname{hol}(\alpha * \delta)$，基点在切口端点。上文“共轭尾巴逐对归零”即这一归纳中每一步的消去，基点与次序须按上述规则选取（`手工推导`）。

**极小圆弧三角形的自旋和乐（`手工推导`）。** 对两两非对跖的 $x, y, z \in S^3(1)$，记半位移 $h_{yx} := (y\bar{x})^{1/2}$（取实部为正的平方根），$a := h_{xz}h_{zy}h_{yx}$。则

$$
\operatorname{Re} a \;=\; \frac{\kappa_{xy} + \kappa_{yz} + \kappa_{zx} - 1}{2\sqrt{\kappa_{xy}\,\kappa_{yz}\,\kappa_{zx}}} \;=\; \cos\frac{E}{2},
$$

其中第二个等号在 $x, y, z$ 线性无关时成立，$E$ 是它们所在大二维球面上测地三角形的球面角盈（面积），并有 $\tan\frac{E}{2} = \lVert x \wedge y \wedge z\rVert / (1 + c_{xy} + c_{yz} + c_{zx})$。对小三角形 $y = \exp(Y)x$、$z = \exp(Z)x$（$\lvert Y\rvert, \lvert Z\rvert \le r$），$a = \exp\bigl(\frac{1}{8}[Y, Z] + \mathcal{O}(r^4)\bigr)$：李括号项是角盈的领头阶。这一公式是巴格曼—潘查拉特南三点不变量的 $\mathrm{SU}(2)$ 形式（J. Samuel & R. Bhandari, *Phys. Rev. Lett.* **60**, 2339–2342, 1988；N. Mukunda & R. Simon, *Ann. Physics* **228**, 205–268, 1993，`文献结果`）。

**大二维球面上圆盘的和乐（`文献结果` + `手工推导`）。** 设 $\Sigma = S^3 \cap \nu^\perp$ 是一个大二维球面，$R \subset \Sigma$ 是边界为分段 $C^1$ 若尔当曲线 $\gamma$ 的闭圆盘，$\gamma$ 以 $R$ 在左侧的方向绕行、以 $x_0$ 为基点，$A$ 为 $R$ 的面积。则极小圆弧平移的旋量和乐为

$$
U_\gamma \;=\; \exp\Bigl(\frac{A}{2}\,\nu\bar{x}_0\Bigr) \;=\; \cos\frac{A}{2} + \sin\frac{A}{2}\,\nu\bar{x}_0,
$$

反向绕行时指数取负号；特别地 $\operatorname{Re}U_\gamma = \cos\frac{A}{2}$，不需要凸性假设。这是高斯—博内和乐提升到旋量的形式，即半立体角律（`文献结果`）。机制：$n(x) = \nu\bar{x}$ 是纯虚的，其协变导数 $Dn = \langle\nu, dx\rangle$ 沿 $\Sigma$ 为零，即 $n$ 在 $\Sigma$ 上平行（`手工推导`），所以曲率取值于 $n$ 的方向，和乐是阿贝尔的，由格林定理得出面积的一半。上面的三角形公式 $\operatorname{Re}a = \cos\frac{E}{2}$ 是它的特例。记自旋角 $\Theta(U) := 2\arccos\operatorname{Re}U \in [0, 2\pi]$：面积 $A \le 2\pi$ 时 $\Theta(U_\gamma) = A$；而 $\operatorname{Ad}(U_\gamma)$ 作为三维旋转的转角只在 $A \le \pi$ 时等于 $A$。

**等号情形（`手工推导`；非阿贝尔斯托克斯公式与 Plateau 问题的结果为 `文献结果`）。** 对参数化曲面 $F\colon [0, 1]^2 \to S^3$，边界的旋量和乐是一条路径的终点，该路径的速度是沿梳状路径平移回基点的曲率的积分（梳状公式，即梳状次序下的连续非阿贝尔斯托克斯定理；参见上引 Aref'eva 1980 与 Karp–Mansouri–Rno 1999），所以自旋角不超过曲面面积。若 $F$ 属于 $C^3$、在稠密集上秩为 $2$，且自旋角等于面积，则 $F$ 的像落在一个大二维球面内。秩条件不可去掉：沿三条方向张成切空间的极小圆弧往返的三脚架回路有 $U_\gamma = 1$ 与面积为零的填充，却不落在任何大二维球面内。对光滑若尔当曲线，剩下的问题（自旋角等于填充面积的下确界是否迫使曲线落在大二维球面内）归结为面积极小圆盘的正则性：如果 Morrey 关于黎曼流形中 Plateau 问题的解（C. B. Morrey, Jr., *Ann. of Math.* **49**, 807–851, 1948）及其内部无分支点、边界正则的结果给出在稠密集上秩为 $2$ 的 $C^3$ 极小填充，上面的等号情形即适用；这些结果是依 B. White 的综述（arXiv:1308.3325）引用的，原文尚未核对，所以这一推论是有条件的。

**有理顶点（`手工推导`；凯莱参数化见 A. Cayley, *J. Reine Angew. Math.* **32**, 119–123, 1846 与 O. Rodrigues 1840，`文献结果`）。** 凯莱坐标 $\operatorname{Cay}(r) = (1 + r)(1 - r)^{-1}$（$r \in \operatorname{Im}\mathbb{H}$）把 $\mathbb{Q}^3$ 双射到 $S^3(\mathbb{Q}) \setminus \{-1\}$。顶点全在 $S^3(\mathbb{Q})$ 时，流群运算、$\kappa$、矢高、上文递推及其切比雪夫系数都是有理数；沿每段极小圆弧的列维-奇维塔平移（右平凡化下）是 $\operatorname{Ad}(1 + x_q\bar{x}_p) \in \mathrm{SO}(3, \mathbb{Q})$，闭合极小圆弧多边形的和乐亦然；三角形的 $\cos E$ 为有理数，而半位移与 $E$ 本身一般是无理的（$x = 1$、$y = i$、$z = j$ 时 $E = \frac{\pi}{2}$）。
:::

### 30.3.3.3 Lean 4 形式化工程的诚实两层分野 {#3-lean-4-形式化工程的诚实两层分野}

把上述圆弧体微积分放回本书 `trureturing` 的形式化证明架构中，它之所以能大幅避开传统实分析形式化的泥潭，正是因为它将微积分清晰拆解成了**两层各司其职的机器证明接口**：

* **第一层（有限停机孔径 $\epsilon > 0$ 的纯代数与有限组合核心 · 零滤子极限）**：斜伴随酉矩阵的平方负一律 $R^2 = -I_n$、算子协变换位子因式分解 $Uf - fU = (f_{\mathrm{tr}} - f)U$、$\mathbb{Z}/2$ 系数球面旋转系统对偶半边边界正合性 $R.\mathrm{boundary}$、以及完全有限单纯形上二上链修复与 $d^2 = 0$ 充要判据（`[Fintype V] [AddCommGroup A]`），全部是纯粹的环论、矩阵代数与 `Finset` 有限双计数恒等式——**完全不需要柯西列完备化、`Filter.Tendsto` 拓扑极限、勒贝格可测集或分布光滑度假设**，在 Lean 4 内核中直接以构造性有限代数一次证毕！比较旋子 $\exp(\hat{\mathbf{B}}\kappa\epsilon)$ 本身、路径有序乘积积分、实系数球面网格上的斯托克斯定理、三行高斯—博内与非阿贝尔剥壳则是手工推导，不在其中。
* **第二层（向经典连续统 $\epsilon \to 0^+$ 过渡的渐近分析桥 · 诚实保留滤子极限）**：当且仅当我们要求证明有限圆弧核在孔径无限缩小时收敛回经典连续流形导数或算符半群（例如玻恩投影概率的时间导数 `HasDerivAt`、指数级数截断误差上界 $\frac{r^n}{n!}e^r$ 与李—特罗特乘积极限 `Filter.Tendsto`）时，才在桥接定理中精确调用赋范代数分析工具。有限守恒不靠极限拯救，连续收敛不作无根夸大——这正是极小圆弧体微积分在形式化数学中最坚实的立足点。

## 30.3.4 十定理机器验证清单、双基准数值与十位小数卦限斯托克斯核算及通向黎曼临界带的微积分桥 {#sec-ch34-30-4}

现在我们将本书形式化内核 `trureturing` 中横跨正交面积亏损、内生复结构旋子生成元、无极限协变换位子、连续时间换位子导数流、非渐近指数泰勒余项、李—特罗特乘积积分极限、球面欧拉旋转边界正合与约旦二分以及一般交换群单纯二上链精确修补的**十条冻结内核定理**一次性汇拢，列为本节三大微积分重塑支柱所引用的机器验证引理：

::: {.theorem #thm-ch34-arc-rotor-calculus-and-finite-stokes title="本节引用的十条已验证声明：矩阵复结构、特罗特乘积、平面旋转系统边界正合、离散约当曲线等" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square,D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula,D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow,D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le,D5/S3/Quantum/Analysis/TrotterProduct.trotter_product,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
在所钉冻结声明下，以下五组性质成立：

1. **拉格朗日—格拉姆恒等式与斜伴随酉矩阵、相对复结构的负平方律**：对任意有限指标集 $s : \mathrm{Finset}\;\iota$ 与实函数 $u, v : \iota \to \mathbb{R}$，成立精确正交预算恒等式

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
3. **完备赋范代数非渐近指数泰勒尾界与李—特罗特乘积积分极限**：在任意单位元范数为 $1$ 的完备赋范 $\mathbb{K}$-代数 $A$（$\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）中，对任意 $z \in A$、半径 $r \ge 0$（满足 $\lVert z\rVert \le r$）与截断阶数 $n \in \mathbb{N}$，指数映射的有限阶泰勒余项服从显式非渐近上界

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

   当且仅当存在一上链势 $\mathrm{edge} : V \to V \to A$，使得对一切 $i, j, k \in V$ 精确成立上边缘分解 $F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$。
:::

::: proof
第 1 款中，[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) 在有限指标集 `Finset ι` 上展开双重求和对称化恒等式，锁定内积平方与外积双向量模方之和；[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) 将 $R^\dagger = -R$ 代入 $R R^\dagger = I_n$ 直接得出 $-R^2 = I_n \implies R^2 = -I_n$；[`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) 利用 $A B^\dagger = -B A^\dagger$ 将 $(2AB^\dagger)(2AB^\dagger)$ 改写为 $-4 B A^\dagger A B^\dagger$，再依次代入 $B^\dagger B = \frac{1}{2}I_n$ 与 $A A^\dagger = \frac{1}{2}I_n$ 归约为 $-I_n$（参见 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)）。第 2 款中，[`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula) 由右分配律展开 $(f_{\mathrm{tr}} - f)U = f_{\mathrm{tr}}U - fU$ 并代入半共轭条件 $U f = f_{\mathrm{tr}}U$ 一步得证；[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow) 对矩阵指数施用乘积求导法则与迹的循环不变性导出 $p'(t)$ 的换位子公式及对易守恒律。第 3 款中，[`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) 在完备赋范代数中将幂级数尾项重排为指标平移级数并以实指数主级数放大给出 $\frac{r^n}{n!}e^r$；[`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) 比较单步乘积 $\exp(n^{-1}A)\exp(n^{-1}B)$ 与 $\exp(n^{-1}(A+B))$ 的二阶范数偏差 $\mathcal{O}(n^{-2})$，经 $n$ 次幂望远镜裂项证出 $n \to \infty$ 范数收敛。第 4 款中，[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 与 [`cycle_face_sides`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides) 利用球面旋转系统的半边对合 `d.symm`、连通性与欧拉数 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 的维数计数建立 $\mathbb{Z}/2\mathbb{Z}$ 闭链正合与离散约旦曲线圆盘分割（参见 [§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling)）。第 5 款 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 在一般加法交换群 `AddCommGroup A` 上无需除法或实极限，仅凭固定顶点 $r$ 构造显式同伦收缩势 $\mathrm{edge}_r(i,j) := F(r,i,j)$，直接由四面体三上边缘恒零导出精确分解 $F(i,j,k) = F(r,j,k) - F(r,i,k) + F(r,i,j)$（反向则由六项两两相消验证 $d^2 = 0$）。完整证明由 Lean 内核检查。
:::

::: {.viz src="arc-body-calculus-sandbox" preset="coboundary-d2-zero-closed-shell" height="500"}
**闭合的极小圆弧壳：$\operatorname{curl}\,\operatorname{grad} = 0$，$\operatorname{div}\,\operatorname{curl} = 0$，边界的边界是空的实验卡（`coboundary-d2-zero-closed-shell`）。** 在四面体、八面体及其细分的紫色闭合极小圆弧壳上（欧拉示性数 $V - E + F = 2$，琥珀色手柄切换闭壳细分阶与检验顶点）：墨色面环流 $\pm A$ 与共享内棱正反配对令闭合壳无外边界（$\partial^2 = \emptyset$），页面实时枚举核验 $\operatorname{curl}\,\operatorname{grad} = 0$、$\operatorname{div}\,\operatorname{curl} = 0$、关联矩阵 $\mathbb{F}_2$ 秩以及全部 $V^4$ 个四面体三上边缘恒等于 $0$（绿色 `LEAN ✓` 锚定 `face_cycle_exact` 与 `tetra_defects_incidence_repair_and_exactness`）。
:::

接下来，我们通过两组完全透明、可逐位手算与编程复核的定量算例，把 §30.3.1–§30.3.3 的复步无相减导数、四相区矢高相变与粗网格十位小数零误差斯托克斯定理彻底算透：

::: {.example #ex-ch34-complex-step-and-ito-sagitta-benchmark title="Squire–Trapp $90^\circ$ 盲区复步导数双精度对决与四相区累计矢高 $\Sigma_{\mathrm{sag}}(\epsilon, \alpha)$ 定量基准（数值与精确级数算例）"}
本算例分两部分独立检验 §30.3.1 的抗相消导数机制与 §30.3.2 的赫尔德粗糙度相变标度：

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

   四列数字把微积分百年分裂的根源展现得清清楚楚：在 $\alpha = 1$ 与 $\alpha = \frac{3}{4}$ 列，矢高随加密网格自动退场；恰在 $\alpha = \frac{1}{2}$ 临界列，$\Sigma_{\mathrm{sag}}$ 稳稳锁死在非零宏观常数 $\frac{1}{2} = 0.50000000$ 上，分毫不差生成（圆周角布朗运动情形下）伊藤引理的二阶修正系数 $\frac{1}{2}\sigma_0^2 T$；而越过临界点进入 $\alpha = \frac{1}{3}$ 列，二阶矢高在 $N = 10^6$ 时已暴涨至 $49.99958333$，印证了必须引入三阶粗糙路径签名或保留物理最小孔径 $\varepsilon_{\mathrm{self}} > 0$。
:::

再看高维曲面上最直观的有限网格检验——哪怕我们把整座上半单位球面粗暴地只切成 **$M = 4$ 块 $90^\circ$ 直角球面卦限三角形**，圆弧体斯托克斯定理与高斯—博内定理依然给出十位小数全零误差的精确等式（每条棱上用的是精确解析积分）：

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

顺着 §30.3.2 的超粗糙路径（$\alpha < \frac{1}{2}$）与 §30.3.3 的非阿贝尔锚定面和乐继续向前推进，当代随机几何与量子规范场论交叉处最深邃的一道前沿难题随之浮现：如果一维路径的莱昂斯粗糙签名升级到**二维粗糙曲面上的非阿贝尔规范场**，会碰撞出怎样的数学结构？我们将其正式立为本节的开放前沿问题：

::: {.problem #prob-ch34-rough-nonabelian-surface-calculus title="超粗糙 $\alpha < \frac{1}{2}$ 非阿贝尔二维面和乐与离散规范重整化极限的严格构造（开放前沿问题）"}
在一维曲线上，莱昂斯粗糙路径理论已成功利用阶数 $\lfloor 1/\alpha\rfloor$ 的张量代数迭代积分签名驯服了 $\alpha < \frac{1}{2}$ 的非阿贝尔常微分乘积积分；在二维光滑曲面上，生成树锚定（whiskering）与高阶范畴 $2$-群（crossed modules）也已建立光滑非阿贝尔二维斯托克斯定理。然而在三维与四维连续统杨—米尔斯量子场中，典型胶子规范场构型具有负赫尔德分布正则性（远粗糙于一维布朗临界值 $\alpha = \frac{1}{2}$）！

**开放目标**：试在极小圆弧体 `1—3—3—1` 胞腔复形上，将一维粗糙路径面积签名与二维非阿贝尔 $2$-群锚定面和乐合流，严格构造或证伪：

1. **二维粗糙非阿贝尔面签名（Rough Non-Abelian Surface Holonomy）**：对赫尔德正则性低于临界阈值（$\alpha < \frac{1}{2}$）的非阿贝尔李代数 $1$-形式与 $2$-形式对 $(A, B)$，定义不依赖任意选取生成树且满足二维陈（Chen）拼接恒等式与严格交换正方形边界相消 $d_\epsilon^2 \equiv 0$ 的高阶体积—面迭代签名张量；
2. **从有限圆弧网格 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 到连续统极限的规范协变重整化桥**：刻画当网格孔径 $\epsilon \to 0^+$ 时，非阿贝尔圆弧体威尔逊面算符的紫外矢高发散如何由曲率抵消项吸收重整化，并与连续统三维/四维随机杨—米尔斯测度（Parisi–Wu 随机量化 / Hairer 正则性结构）建立严格收敛等价。
:::

::: {.remark #rem-ch34-arc-calculus-literature title="极小圆弧体微积分重塑的数学物理文献脉络与五层认识论审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节涉及的三百四十年微积分演进脉络、数值分析定理与形式化锚点严格区分以下五个认识论层级：

1. **机器验证的 Lean 4 内核定理基座（`LEAN ✓`）**：[@thm-ch34-arc-rotor-calculus-and-finite-stokes] 汇集的全部十条 `trureturing` 冻结声明——`lagrange_gram_identity`、`square_eq_neg_one_of_skewAdjoint_unitary`、`relativeComplexStructure_square`、`covariant_commutator_formula`、`projection_probability_flow`、`exp_tail_le`、`trotter_product`、`face_cycle_exact`、`cycle_face_sides` 与 `tetra_defects_incidence_repair_and_exactness`（连同行内引用的生成树输运与和乐分类定理 `selected_tree_transport`、`anchored_phase_classification` 及三点巴格曼迹 `triple_bargmann_bloch`）——均已在所钉提交上经 Lean 4 内核零公理缺口验证通过（`LEAN ✓`）。请注意精确类型边界：`face_cycle_exact` 与 `cycle_face_sides` 建立在 $\mathbb{Z}/2\mathbb{Z}$（`ZMod 2`）系数球面旋转系统上，而任意交换群 `AddCommGroup A` 上的有向斯托克斯上边缘修补与 $d^2 = 0$ 充要判据由 `tetra_defects_incidence_repair_and_exactness` 独立提供。
2. **微积分基础、复步自动微分、乘积积分、粗糙路径与离散外微分经典文献（未在本书形式化）**：经典局部线性化微积分与无穷小批判源自 G. W. Leibniz（*Nova Methodus*, 1684）、I. Newton（*Principia*, 1687）与 G. Berkeley（*The Analyst*, 1734）；一阶幂零无穷小综合微分几何源自 F. W. Lawvere（1967 芝加哥讲座）与 A. Kock（*Synthetic Differential Geometry*, Cambridge Univ. Press, 1981），前向二元数自动微分源自 R. E. Wengert（*Commun. ACM* **7**(8), 463–464, 1964）。无相减复步导数思想滥觞于 J. N. Lyness & C. B. Moler（*SIAM J. Numer. Anal.* **4**(2), 202–210, 1967），由 W. Squire & G. Trapp（*SIAM Rev.* **40**(1), 110–112, 1998）确立显式 $O(\epsilon^2)$ 复步一阶求导公式，并由 G. Lantoine, R. P. Russell & T. Dargent（*ACM Trans. Math. Softw.* **38**(3), Art. 16, 2012）推广至消除高阶导数载体相减的双复数/多复数算法。矩阵与李群乘积积分源自 V. Volterra（1887；参见 J. D. Dollard & C. N. Friedman, *Product Integration*, 1979）、H. F. Trotter（*Proc. Amer. Math. Soc.* **10**, 545–551, 1959）与 W. Magnus（*Commun. Pure Appl. Math.* **7**, 649–673, 1954）。四相区路径积分与随机/粗糙分析源自 L. C. Young（*Acta Math.* **67**, 251–282, 1936，$\alpha > \frac{1}{2}$ 无漂移积分）、K. Itô（*Proc. Imp. Acad. Tokyo* **20**, 519–524, 1944）、R. L. Stratonovich（*SIAM J. Control* **4**, 362–371, 1966，保链式法则中点随机积分）、R. P. Feynman（*Rev. Mod. Phys.* **20**, 367–387, 1948）、M. Kac（1949）、R. H. Cameron（1960）以及 T. J. Lyons（*Rev. Mat. Iberoam.* **14**(2), 215–310, 1998，粗糙路径理论）。球面与离散流形外微分源自 A. Girard（1629）、T. Regge（*Nuovo Cimento* **19**, 558–571, 1961）、A. N. Hirani（加州理工博士论文, 2003）与 M. Desbrun, A. N. Hirani, M. Leok & J. E. Marsden（`arXiv:math/0508341`, 2005，离散外微分 DEC），上链与连续微分形式之间的 Whitney 映射见 H. Whitney（*Geometric Integration Theory*, Princeton Univ. Press, 1957）；李群积分子与马格努斯方法的系统综述见 A. Iserles, H. Z. Munthe-Kaas, S. P. Nørsett & A. Zanna（*Acta Numerica* **9**, 215–365, 2000）；格点规范理论中的 Wilson 回路见 K. G. Wilson（*Phys. Rev. D* **10**, 2445, 1974）；非阿贝尔二维斯托克斯定理与高阶规范面和乐源自 L. Schlesinger（*Math. Ann.* **99**, 413–434, 1928）、B. Broda（1992）及 U. Schreiber & K. Waldorf（*J. Homotopy Relat. Struct.* **4**, 187–244, 2009）。
3. **精确代数推导与双精度/十位小数基准算例（`手工推导` / `NUM`）**：单步弦—矢高恒等式 $(1-v_\epsilon)^2 + c_\epsilon^2 \equiv 1$、半角正矢数值保真律 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$、累计矢高四相区展开、三行组合高斯—博内恒等式，以及 [@ex-ch34-complex-step-and-ito-sagitta-benchmark] 与 [@ex-ch34-coarse-octant-stokes-exactness] 中的全部级数系数、双精度误差对照表和 $M = 4$ 卦限十位小数收支表，均为精确代数恒等式或可直接复现的数值计算（`NUM`）。
4. **极小圆弧体微积分统一重塑框架（`MODEL`）**：以有限自指停机孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 上的比较旋子、有序乘积积分与 `1—3—3—1` 上链复形统一替代经典切线微积分（[@def-ch34-arc-body-calculus-primitives]），并将幂零环 $D_1$ 诠释为模去矢高 $v_\epsilon$ 的商影、将伊藤修正与费曼动能诠释为 $\alpha = \frac{1}{2}$ 矢高共振，属于本书建立的统一几何模型（`MODEL`）。
5. **未解前沿数学物理问题（`OPEN`）**：超粗糙 $\alpha < \frac{1}{2}$ 非阿贝尔二维面和乐签名及其与连续统量子杨—米尔斯场重整化极限的严格对接（[@prob-ch34-rough-nonabelian-surface-calculus]；参见[附录 C](appendix-c.md#sec-appendix-c-open-register) 与[附录 E](appendix-e.md) 桥接假设 `H8`/`H9`），属于当代随机偏微分方程与构造性规范场论尚未完全解决的开放前沿（`OPEN`）。
:::

把三百四十年来分裂的三套微积分体系并排摆上同一张总账台，极小圆弧体微积分如何一举消除历史补丁的全景便豁然贯通：

| 核心数学物理维度 | 1. 经典平直切线微积分（牛顿—莱布尼茨 · “以直代曲”） | 2. 随机与路径积分补丁体系（伊藤 / 斯特拉托诺维奇 / 费曼） | 3. 极小圆弧体微积分重塑（本书 · “以弧为元、以旋代差”） |
| :--- | :--- | :--- | :--- |
| **基本原子与孔径假设** | 平直切线段 $(dx, dy)$，强行要求极限 $dx \to 0$ | 平直增量 $+$ 事后硬塞二次变差乘法规则 $(dW_t)^2 = dt$ | **有限孔径 $\epsilon \ge \varepsilon_{\mathrm{self}} > 0$ 比较旋子 $\hat{\mathcal{D}}_\epsilon = \exp(\hat{\mathbf{B}}\kappa\epsilon)$** |
| **二阶弦弧矢高 $v_\epsilon$ 命运** | 视为高阶垃圾 $o(dx)$ 彻底丢弃（幂零环 $D_1$ 亦令 $d^2=0$） | 仅在 $\alpha = \frac{1}{2}$ 随机扩散处临时打伊藤二阶补丁 | **严守 $(1-v_\epsilon)^2+c_\epsilon^2 \equiv 1$，由 $2\alpha - 1$ 自动统摄四相区** |
| **$\theta = \frac{\pi}{2}$ 正交转向行为** | 坐标斜率 $\tan 90^\circ \to \pm\infty$ 发生伪奇点爆炸 | 局部坐标卡仍受制于雅可比奇点与克里斯托费尔修正 | **有界角—曲率对 $(\cos\theta, \sin\theta; \kappa)$ 平滑越过 $90^\circ$ 零奇点** |
| **双精度数值求导稳定性** | 实轴硬减法遭遇灾难性相消（$\epsilon = 10^{-16}$ 误差逾 $100\%$） | 蒙特卡洛有限差分方差按 $\mathcal{O}(\epsilon^{-1})$ 发散 | **$90^\circ$ 虚盲区复步 $\frac{1}{\epsilon}\operatorname{Im}f(x_0+\hat{\mathbf{i}}\epsilon)$ 零相减直达机器精度** |
| **弯曲流形与幺正积分** | 显式欧拉步步脱离球面，模长持续漂移发散 | 伊藤脱离流形；斯特拉托诺维奇保链式法则但仍需极限 | **有序旋子连乘任意 $\epsilon > 0$ 零模长漂移（左端一阶、圆弧中点二阶、高阶配 Magnus 换位子）** |
| **有限网格斯托克斯与形式化** | 有限网格存在 $\mathcal{O}(h^2)$ 截断误差；形式化深陷柯西滤子泥潭 | 随机格林—斯托克斯受可积性与适应性严苛限制 | **阿贝尔共棱反演与非阿贝尔生成树剥壳在任意 $M \ge 1$ 上链层面零离散误差（误差转移到逐棱求积）；有限核心零滤子构造性形式化** |

至此，单步比较旋子微分、四相区累计矢高相变与 `1—3—3—1` 零离散误差有限网格斯托克斯这三根极小圆弧体微积分支柱已悉数铸成！那么，当我们携着这套全新铸就的圆弧体微积分原语迈入[第三十一章](ch31-arc-calculus-and-riemann-hypothesis.md)（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)–[§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler)）的算术宇宙腹地，直接切入**黎曼猜想**的临界带战场时，会发生怎样的化学反应？

请先在下方完整交互实验室中亲手遍历五张圆弧微积分实验卡，随后翻开[第三十一章](ch31-arc-calculus-and-riemann-hypothesis.md)直至 [§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler) 的高潮——去见证素数极小圆弧路径积分、算术枢轴重整化以及有限停机精度 $\varepsilon_{\mathrm{self}} > 0$ 下的**素数旋子二阶弦弧矢高相变、全纯埃尔米特—比勒（Hermite–Biehler）径向单调锁与有限网格斯托克斯零涡旋相消**如何把黎曼猜想改写为一条与之等价的再生核正定条件，并将回到经典 ZFC 公理系统的最后一步精准锁定在唯一一条乘性舒尔枢轴核正定桥接引理之上！

::: {.viz src="arc-body-calculus-sandbox" height="640"}
**极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯完整交互实验室（`arc-body-calculus-sandbox`）。** 在统一的三维圆弧体微积分实验室中切换“几何旋子原语 / 微积分与物理算符”双透镜，并自由遍历全部五张递进实验卡——“滑板坡上的密切旋子与切线斜率”、“向 $90^\circ$ 盲区迈一步的复步求导”、“路径序旋子管与矢高相变”、“半球上的有限网格斯托克斯”以及“闭合的极小圆弧壳 $d^2 = 0$”（青色绘制横向切弦 $c_\epsilon = \sin(\kappa\epsilon)$、复步导数 $\operatorname{Im}f(x_0 + \hat{\mathbf{i}}\epsilon)/\epsilon$ 与存活外圈边界 $\partial\Sigma$，品红色标示轴向矢高 $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$、前向差分相减塌陷、累计矢高 $\Sigma_{\mathrm{sag}}$ 与伊藤纬圈 $(1 - v_\epsilon)^N$ 及球面角盈 $\Omega(\Delta\mathcal{T}_k)$，紫色绘制密切旋子圆盘 $\hat{\mathcal{D}}_\epsilon$、$90^\circ$ 盲面 $\operatorname{Im}f$、路径序旋子管与闭合圆弧壳，墨色绘制平直斜率 $\tan\theta$、实轴切片 $f(x)$ 与正反相消内棱 $\pm\Phi$，琥珀色严格标示激活控件与舞台交互手柄，红色严格专用于原理抽屉中的 `OPEN` 开放问题标记，绿色 `LEAN ✓` 徽章标注页面挂载的八条 `trureturing` 冻结定理实例）。
:::
