# 附录 I 量子信息散度、逆测试可达性、子熵与近似恢复对偶 {#sec-appendix-i}

在正文各卷中，我们已经从几条相交的几何线索触及了不可逆量子过程的信息账本：[第 4 章](ch04-decoherence.md)将退相干与量子噪声看作把球面纯态拉入球内混合态弦的收缩与捏合；[第 8 章](ch08-erasure-and-time-arrows.md)追踪了状态可区分性在擦除与粗粒化下的单调耗散；[第 13 章](ch13-entanglement-and-chsh.md)用关联几何区分了可分凸包与量子纠缠；[第 14 章](ch14-cloning-codes-and-braids.md)及其[§14.3](ch14-s03-logical-recovery.md)则在正交综合征子空间内给出了等距逻辑恢复。一旦追问这些局部图像背后的定量变分边界——**两个非对易正规正泛函之间的凸散度能否由一个具体的经典逆测试达到？多组正定矩阵在几何平均意义下的运输重心如何检验唯一最优？经典—量子系综每次测量究竟能读出多少可提取信息、留下多少猜测误差？只在一个投影子空间上完备的恢复算子族如何补全为全空间上的迹保持量子通道？而当目标算子落在无纠缠可分锥之外时，又如何不靠试错搜索而直接给出严格分离的对偶残差证书？**——就需要把散度可达性、矩阵运输几何、子熵界、通道补全与凸锥残差对偶放在同一张审视台面上逐环核验。

为保持严格的认识论边界，本附录在展开之前先行声明范围契约：下文 I.1–I.5 依次建立**一般凸逆测试的扩展值最小代价可达性**、**正定矩阵 Bures–Wasserstein 重心的对偶平衡证书**、**经典—量子条件子熵与猜测误差界**、**投影支撑 Kraus 族的重置通道补全**以及**可分锥最近点的规范负残差见证**。这五节在概念上沿着“变分可达表示 $\to$ 正定矩阵运输几何 $\to$ 可读信息与猜测下界 $\to$ 子空间通道构造性补全 $\to$ 锥逼近不可达分离证书”的脉络递进；附录标题中的“近似恢复对偶”指明的是将**可实现通道构造**（I.4）与**凸锥逼近障碍的对偶见证**（I.5）并置对照的问题方向，**并不声称**本组冻结定理已经证明了任意量子通道的统一近似恢复主定理，也未证明 I.4 的重置补全与 I.5 的可分锥残差构成同一个恢复优化问题的原始—对偶配对。各节的定义域、载体维数与总函数边界将在 I.6 节集中审计。

---

## I.1 一般凸逆测试的扩展值最小代价可达性 {#sec-appendix-i-1}

在有限维经典概率中，比较两个分布 $p, q$ 的 $f$-散度 $D_f(p \| q) = \sum_x q(x)\,f\bigl(p(x)/q(x)\bigr)$ 衡量了它们偏离成比例关系的凸曲率代价。进入量子理论乃至无限维算子代数后，将经典对数似然比提升到非对易算子的一条基本途径是**逆测试（reverse test）**：寻找一个经典可测空间 $(X, \mu)$、一对几乎处处非负的可积密度 $(p, q)$ 以及一个保正、保单位质量且输出序正规泛函的经典到量子制备映射 $\Gamma$，使得 $\Gamma(p) = \rho$ 且 $\Gamma(q) = \sigma$，再用输入侧的经典凸透视代价从上方逼近量子散度（所有逆测试代价的下确界是 K. Matsumoto 的极大 $f$-散度；取 $f(x) = x\ln x$ 时为 Belavkin–Staszewski 相对熵，$\rho, \sigma$ 不对易时一般严格大于 Umegaki 相对熵）。真正的分析难点在于：当候选可测空间 $(X, \mu)$ 遍历任意给定的宇宙层级、且凸函数 $f$ 只在开正半轴 $(0, \infty)$ 上定义良好的凸性时，所有可达逆测试代价的下确界究竟只是一个抽象逼近极限，还是必定能在标准后验区间 $[0, 1]$ 上由某个正则有限测度与连续正规正映射**精确达到**？

先在最透明的交换两点代数上亲手算一遍这一后验重参数化机制。取 $H = \mathbb{C}^2$ 上的对角交换冯·诺依曼代数 $M \cong \mathbb{C} \oplus \mathbb{C}$，两个正线性泛函由对角权给出：

$$
\rho = \left(\frac{1}{3},\, \frac{2}{3}\right), \qquad \sigma = \left(\frac{2}{3},\, \frac{1}{3}\right), \qquad \rho + \sigma = (1,\, 1).
$$

在总质量泛函 $\rho + \sigma$ 下，两个极小投影上的总质量各为 $1$（总和 $(\rho + \sigma)(1) = 2$），而 $\rho$ 相对于 $\rho + \sigma$ 的**后验坐标** $t = \frac{d\rho}{d(\rho + \sigma)} \in [0, 1]$ 分别落在 $t_1 = 1/3$ 与 $t_2 = 2/3$，互补密度 $1 - t$ 则落在 $2/3$ 与 $1/3$。于是区间 $[0, 1]$ 上的标量矩测度就是两个单位原子之和 $\nu = \delta_{1/3} + \delta_{2/3}$：对常数 $1$ 积分恢复总质量 $1 + 1 = 2$，对坐标函数 $t$ 与 $1 - t$ 加权制备则精确还原 $\rho$ 与 $\sigma$。现在取在 $(0, \infty)$ 上凸的相对熵生成函数 $f(x) = x \ln x$，其在基准点 $x = 1$ 处满足 $f(1) = 0$、右导数 $f'_+(1) = 1$，二阶导数对应的曲率测度为 $(0, \infty)$ 上的 $d\kappa_f(s) = s^{-1}\,ds$。为避免在 $p = 0$ 或 $q = 0$ 的奇异支撑处直接写出未定义的比值或对数，用 $x = 1$ 处的仿射切线加上双侧折页曲率余项来书写闭透视核：当 $p/q \le 1$ 时（如第一点 $p_1 = 1/3,\, q_1 = 2/3$），仅 $(0, 1]$ 侧折页非零，给出

$$
(p_1 - q_1) + \int_{p_1/q_1}^{1} \frac{s q_1 - p_1}{s}\,ds = (p_1 - q_1) + (q_1 - p_1) + p_1 \ln\frac{p_1}{q_1} = -\frac{1}{3}\ln 2;
$$

当 $p/q > 1$ 时（如第二点 $p_2 = 2/3,\, q_2 = 1/3$），仅 $(1, \infty)$ 侧折页非零，给出

$$
(p_2 - q_2) + \int_{1}^{p_2/q_2} \frac{p_2 - s q_2}{s}\,ds = (p_2 - q_2) + p_2 \ln\frac{p_2}{q_2} - (p_2 - q_2) = \frac{2}{3}\ln 2.
$$

两点相加得到总代价 $-\frac{1}{3}\ln 2 + \frac{2}{3}\ln 2 = \frac{1}{3}\ln 2$。任何其他能制备出同一对 $(\rho, \sigma)$ 的经典源经条件期望合并到后验坐标 $t \in [0, 1]$ 时，凸性都不会令闭透视代价增大，因此这枚集中于 $\{1/3, 2/3\}$ 的两原子矩族直接达到了扩展值下确界 $\frac{1}{3}\ln 2 \neq \perp$。

将上述结构精确化为冻结声明所使用的分析对象：

1. **序正规泛函与冯·诺依曼代数载体**：设 $(H : \mathsf{Type}\;v)$ 为完备复内积空间，$M$ 为 $H$ 上的具体冯·诺依曼代数（`VonNeumannAlgebra H`），记其底层含幺 $C^*$-子代数为 $A := M.\mathrm{toStarSubalgebra}$。连续线性泛函 $\varphi \in \operatorname{StrongDual}\;\mathbb{C}\;A$ 称为**序正规**（`IsOrderNormal φ`），若对 $A$ 中任意非空、向上有向的正元子集 $s$（满足 $\forall x \in s,\; 0 \le x$）及其最小上界 $a$（`IsLUB s a`），以及任意 $\varepsilon > 0$，总存在 $b \in s$ 使得一切满足 $b \le x$ 的 $x \in s$ 均有 $\|\varphi(a - x)\| < \varepsilon$。定理假设 $\rho, \sigma \in \operatorname{StrongDual}\;\mathbb{C}\;A$ 满足正性（在复数偏序 `ComplexOrder` 下，$\forall a \ge 0,\; 0 \le \rho(a)$ 且 $0 \le \sigma(a)$）且和泛函满足 `IsOrderNormal (ρ + σ)`。
2. **正半轴凸生成元与闭透视扩展值代价**：设函数 $f : \mathbb{R} \to \mathbb{R}$ 在开正半轴 $I_{>0} := (0, \infty)$（记作 `Positive`）上满足实凸性 `hf : ConvexOn ℝ (Ioi 0) f`（$f$ 在 $(-\infty, 0]$ 上的函数值完全不进入后续定义）。记右导数 $\operatorname{rightDeriv}(f, x) := \operatorname{derivWithin}\;f\;(x, \infty)\;x$；因 $f$ 在 $(0, \infty)$ 上凸，$\operatorname{rightDeriv}(f, \cdot)$ 单调且右连续，从而定义 $(0, \infty)$ 上的 Stieltjes 函数 `curvatureDistribution hf` 及其曲率测度 $\kappa_f := \operatorname{curvature}(hf)$。对任意 $u, v \in \mathbb{R}$，定义双侧折页曲率余项（取值于 $\mathbb{R}_{\ge 0}^\infty$）：

   $$
   \operatorname{curvatureRemainder}(hf, u, v) := \int_{(0, 1]}^{-} \operatorname{ofReal}(t v - u)\,d\kappa_f(t) + \int_{(1, \infty)}^{-} \operatorname{ofReal}(u - t v)\,d\kappa_f(t),
   $$

   其中 `ofReal` 将非正实数截断为 $0$。对可测空间 $\alpha$ 上的测度 $\nu$ 与实函数 $p, q : \alpha \to \mathbb{R}$，定义取值于扩展实数系 $\operatorname{EReal} = \mathbb{R} \cup \{\perp, \top\}$（即 $[-\infty, +\infty]$）的**闭透视代价**（`closedPerspectiveCost`）：

   $$
   \operatorname{closedPerspectiveCost}(hf, \nu, p, q) := \left(\int_\alpha \bigl(f(1)\,q(x) + \operatorname{rightDeriv}(f, 1)\,(p(x) - q(x))\bigr)\,d\nu(x) : \operatorname{EReal}\right) + \int_\alpha^{-} \operatorname{curvatureRemainder}(hf, p(x), q(x))\,d\nu(x).
   $$

   注意此处两项分别由 Bochner 实积分向 $\operatorname{EReal}$ 的嵌入与非负扩展实数 Lebesgue 积分给出，无需在零点处计算未定义的商或对数；当曲率余项积分发散时，代价合法地取 $+\infty = \top \in \operatorname{EReal}$。
3. **后验矩相容族与正规 $L^1$ 逆测试**：记紧区间 $\operatorname{Interval} := [0, 1]$，连续后验坐标函数为 $\operatorname{posterior} \in C(\operatorname{Interval}, \mathbb{C})$，$t \mapsto t$。一个后验矩相容族 $F \in \operatorname{Family}(\rho, \sigma)$ 是映射 $F : C(\operatorname{Interval}, \mathbb{C}) \to \operatorname{WeakDual}\;\mathbb{C}\;A$，满足对函数加法与复数乘的线性性、逐点非负函数对正算子的保正性，以及两条边界矩等式 $F(1) = \rho + \sigma$ 与 $F(\operatorname{posterior}) = \rho$（由线性性自动推出 $F(1 - \operatorname{posterior}) = \sigma$）。其诱导强对偶线性映射记为 `linearMap F : C(Interval, ℂ) →ₗ[ℂ] StrongDual ℂ A`；紧支实连续函数 $u \mapsto \operatorname{Re}\bigl((\operatorname{linearMap}\;F\;u)(1)\bigr)$ 由 Riesz–Markov–Kakutani 表示定理诱导 $[0, 1]$ 上的 Borel 测度 `scalarMeasure F`，其提升到宇宙层级 $u$ 的 `ULift.{u} Interval` 推前测度记为 `liftedMeasure.{u} (scalarMeasure F)`，而族代价定义为

   $$
   \operatorname{familyCost}(hf, F) := \operatorname{closedPerspectiveCost}\bigl(hf,\, \operatorname{scalarMeasure}(F),\, (t \mapsto t),\, (t \mapsto 1 - t)\bigr).
   $$

   另一方面，给定可测空间 $(X, \mu)$，一个**正规 $L^1$ 制备** `NormalL1Preparation μ` 是 $\mathbb{C}$-线性映射 $\Gamma_0 : L^1(\mu; \mathbb{C}) \to \operatorname{StrongDual}\;\mathbb{C}\;A$，它将 $\mu$-几乎处处非负函数映为正泛函、满足质量恒等式 $\Gamma_0(h)(1) = \int_X h\,d\mu$，且每个输出 $\Gamma_0(h)$ 均满足 `IsOrderNormal`。一个**正规 $L^1$ 逆测试** `NormalL1ReverseTest ρ σ μ` 则由一个正规 $L^1$ 制备配上一对可测、$\mu$-可积、$\mu$-几乎处处非负的实函数 $p, q : X \to \mathbb{R}$ 组成，使其复值 $L^1$ 类在制备映射下分别等于 $\rho$ 与 $\sigma$。遍历宇宙 $u$ 中一切可测空间 $(X : \mathsf{Type}\;u)$、$\sigma$-有限测度 $\mu$、正规 $L^1$ 制备及满足 $\Gamma_0(p) = \rho$、$\Gamma_0(q) = \sigma$ 的 $\mu$-几乎处处非负函数对 $p, q \in L^1(\mu; \mathbb{C})$，所得闭透视代价集合记为 `attainableCosts.{u} hf ρ σ : Set EReal`。

::: {.theorem #thm-appi-reverse-test-attainment lean="D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.original_reverse_test_extended_attainment" title="一般凸逆测试的扩展值最小代价可达性"}
设 $u, v$ 为宇宙层级，$(H : \mathsf{Type}\;v)$ 为完备复内积空间，$M$ 为 $H$ 上的冯·诺依曼代数（`VonNeumannAlgebra H`），$\rho, \sigma \in \operatorname{StrongDual}\;\mathbb{C}\;M.\mathrm{toStarSubalgebra}$ 满足对一切 $a \ge 0$ 有 $0 \le \rho(a)$ 与 $0 \le \sigma(a)$，且满足序正规条件 `IsOrderNormal (ρ + σ)`。则对任意满足 `hf : ConvexOn ℝ (Ioi 0) f` 的函数 $f : \mathbb{R} \to \mathbb{R}$，存在后验矩相容族 $F \in \operatorname{Family}(\rho, \sigma)$，同时满足以下性质：

1. **族代价达到扩展值下确界**：

   $$
   \operatorname{familyCost}(hf, F) = \inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma);
   $$

2. **下界非退化与零态归零**：$\inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma) \neq \perp$（严格排除 $-\infty$），且若 $\rho = 0$ 与 $\sigma = 0$ 同时成立，则 $\inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma) = 0$；
3. **测度正则性与有限性**：标量矩测度 $\operatorname{scalarMeasure}(F)$ 为正则测度（`Regular`），且其宇宙提升测度 $\operatorname{liftedMeasure}.\{u\}(\operatorname{scalarMeasure}(F))$ 为有限测度（`IsFiniteMeasure`）；
4. **达到下确界的正规 $L^1$ 逆测试实现**：在提升测度 $\mu_F := \operatorname{liftedMeasure}.\{u\}(\operatorname{scalarMeasure}(F))$ 上存在正规 $L^1$ 逆测试 $R : \operatorname{NormalL1ReverseTest}\;\rho\;\sigma\;\mu_F$，其密度函数为 $R.p(x) = x.\mathrm{down}.\mathrm{val}$ 与 $R.q(x) = 1 - x.\mathrm{down}.\mathrm{val}$，且

   $$
   \operatorname{closedPerspectiveCost}(hf, \mu_F, R.p, R.q) = \inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma);
   $$

5. **区间 $L^1$ 上的压缩正规正算子延拓**：存在连续复线性算子

   $$
   \Gamma : L^1\bigl(\operatorname{Interval}, \operatorname{scalarMeasure}(F); \mathbb{C}\bigr) \longrightarrow_L \operatorname{StrongDual}\;\mathbb{C}\;M.\mathrm{toStarSubalgebra},
   $$

   使得对所有 $g \in C(\operatorname{Interval}, \mathbb{C})$ 有 $\Gamma([g]_{L^1}) = \operatorname{linearMap}\;F\;g$；对所有 $h \in L^1$ 输出满足 `IsOrderNormal (Γ h)` 且满足质量恒等式 $(\Gamma h)(1) = \int_{\operatorname{Interval}} h(t)\,d\operatorname{scalarMeasure}(F)(t)$；若 $h$ 关于 $\operatorname{scalarMeasure}(F)$ 几乎处处满足 $0 \le h(t)$，则对一切正元 $a \ge 0$ 有 $0 \le (\Gamma h)(a)$；算子范数满足 $\|\Gamma\| \le 1$；且在后验坐标函数上精确制备目标泛函：

   $$
   \Gamma([\operatorname{posterior}]_{L^1}) = \rho, \qquad \Gamma([1 - \operatorname{posterior}]_{L^1}) = \sigma.
   $$

:::

::: proof
证明分为下界归约与正规实现两步。首先，对任意候选 $\sigma$-有限可测空间 $(X, \mu)$ 上的正规 $L^1$ 制备及非负密度 $(p, q)$，利用源总质量 $m(x) = p(x)_+ + q(x)_+$ 对测度作正规化，并沿后验比值映射 $p/(p+q) \in [0, 1]$ 将源测度推前到紧区间 $\operatorname{Interval} = [0, 1]$；由 $f$ 在 $(0, \infty)$ 上的曲率折页表示与凸函数 Jensen 单调性，后验归并所得的矩族代价不超过原始候选逆测试的闭透视代价，而可积仿射基线与非负曲率余项积分保证下确界不可能落到 $\perp = -\infty$（当 $\rho = \sigma = 0$ 时零测度直接给出代价 $0$）。其次，在完备复内积空间 $H$ 上的具体冯·诺依曼代数 $M$ 中，利用 $\rho + \sigma$ 的序正规性与曲棍球棒（hockey-stick）谱分解族构造相容的后验矩族 $F \in \operatorname{Family}(\rho, \sigma)$，由紧区间上正线性泛函的 Riesz 表示提取正则有限测度 $\nu = \operatorname{scalarMeasure}(F)$。因连续函数在 $L^1(\nu)$ 中稠密，且正分解下泛函范数受 $L^1$ 范数压缩控制（$\|\operatorname{linearMap}\;F\;g\| \le \|g\|_{L^1(\nu)}$），可将 `linearMap F` 唯一连续延拓为满足 $\|\Gamma\| \le 1$、保正、保积分质量且保持序正规性的连续线性算子 $\Gamma$，其在 $\operatorname{posterior}$ 与 $1 - \operatorname{posterior}$ 的 $L^1$ 类上分别还原 $\rho$ 与 $\sigma$。最后通过 `ULift.{u}` 将区间测度无损嵌入目标宇宙层级 $u$，即得落入 `attainableCosts.{u}` 并精确达到扩展值下确界的逆测试 $R$。完整证明由 Lean 内核检查。
:::

审读 [@thm-appi-reverse-test-attainment] 时必须守住三条边界：第一，“扩展值可达”是指某个具体逆测试的代价等于 $\operatorname{EReal}$ 中的下确界并排除了 $-\infty$（$\perp$），**绝不蕴涵**该最小代价必然有限——当 $\rho$ 不受 $\sigma$ 适当控制时，下确界与最小族代价可以同时等于 $+\infty$；第二，最优标量测度 $\operatorname{scalarMeasure}(F)$ 是 $[0, 1]$ 上的正则有限 Borel 测度，定理**不声称**它在一般无限维代数上必为有限个离散原子之和；第三，存在性依赖非构造分析延拓，不提供计算最优逆测试的数值算法。

---

## I.2 Bures–Wasserstein 重心的对偶证书 {#sec-appendix-i-2}

如果说 I.1 处理的是算子代数上两个正泛函沿标量后验比值的纵向凸比较，那么在有限维正定矩阵锥内部横向融合多组量子协方差或忠实正定态时，自然浮现的黎曼运输度规便是 **Bures–Wasserstein 距离**。给定有限个严格正定矩阵 $A_1, \dots, A_n$ 与严格正概率权重 $w_1, \dots, w_n$，算术平均 $\sum_j w_j A_j$ 会无视非对易谱方向的旋转耦合而高估体积；真正的运输重心应当最小化加权平方 Bures–Wasserstein 距离 $\sum_j w_j\,d_{\mathrm{BW}}(X, A_j)^2$。然而，重心的矩阵方程高度非线性——一旦有人递来一个候选正定矩阵 $W$ 与一组正定运输算子 $T_j$，我们需要一张纯代数的**对偶平衡证书**，一步判定 $W$ 就是正定锥内唯一全局最优点。

先在 $1 \times 1$ 正定标量矩阵（$m = 1,\, n = 2$）上手算这一证书的几何威力。取两个正数矩阵 $A_1 = [1]$、$A_2 = [9]$ 与等权 $w_1 = w_2 = 1/2$。在一维正实轴 $x, a > 0$ 上，矩阵半幂就是算术平方根 $\sqrt{x}$，Bures–Wasserstein 距离退化为平方根欧氏距离

$$
d_{\mathrm{BW}}(x, a) = \sqrt{x + a - 2\sqrt{x a}} = \lvert\sqrt{x} - \sqrt{a}\rvert.
$$

考察候选重心 $W = [4] > 0$ 以及两个正定运输因子 $T_1 = [1/2] > 0$、$T_2 = [3/2] > 0$。逐项核验两条证书恒等式：

$$
T_1 W T_1 = \frac{1}{2}\cdot 4 \cdot \frac{1}{2} = 1 = A_1, \qquad T_2 W T_2 = \frac{3}{2}\cdot 4 \cdot \frac{3}{2} = 9 = A_2, \qquad w_1 T_1 + w_2 T_2 = \frac{1}{2}\cdot\frac{1}{2} + \frac{1}{2}\cdot\frac{3}{2} = 1.
$$

现在对任意竞争正数 $x > 0$ 展开加权平方距离目标：

$$
\frac{1}{2}\bigl(\sqrt{x} - 1\bigr)^2 + \frac{1}{2}\bigl(\sqrt{x} - 3\bigr)^2 = \bigl(\sqrt{x} - 2\bigr)^2 + 1 \ge 1,
$$

当且仅当 $\sqrt{x} = 2$（即 $x = 4 = W$）时取到严格唯一最小值 $1$！注意若误用朴素算术平均 $X_{\mathrm{arith}} = \frac{1 + 9}{2} = 5$，目标值变为 $(\sqrt{5} - 2)^2 + 1 = 10 - 4\sqrt{5} \approx 1.0557 > 1$；对偶平衡条件 $\sum_j w_j T_j = 1$ 恰恰在平方根切空间上抵消了一阶变分项，把非线性最小化直接锁死在 $W = 4$ 处。

在任意阶数 $m \in \mathbb{N}$ 的复矩阵空间 $M_m(\mathbb{C}) := \operatorname{Matrix}\;(\operatorname{Fin}\;m)\;(\operatorname{Fin}\;m)\;\mathbb{C}$ 上，冻结模块采用如下精确定义：

1. **连续函数演算幂与 Bures–Wasserstein 距离**：对矩阵 $X \in M_m(\mathbb{C})$ 与实指数 $p \in \mathbb{R}$，谱幂定义为连续函数演算 $\operatorname{mpow}(X, p) := \operatorname{cfc}(t \mapsto t^p, X)$（以下对 $p = 1/2$ 简记为 $X^{1/2}$）。两矩阵 $A, B \in M_m(\mathbb{C})$ 的 **Bures–Wasserstein 距离**（`buresWassersteinDistance`）定义为总函数

   $$
   d_{\mathrm{BW}}(A, B) := \sqrt{\operatorname{Re}\operatorname{Tr}(A + B) - 2\,\operatorname{Re}\operatorname{Tr}\!\left(\bigl(A^{1/2} B A^{1/2}\bigr)^{1/2}\right)},
   $$

   其中实平方根 `Real.sqrt` 在正定输入上取非负算术平方根（在负输入上按标准库总函数约定取 $0$，而当 $A, B$ 正定时根号内恒非负）。
2. **形式重心选择算子**：给定权重 $w : \operatorname{Fin}\;n \to \mathbb{R}$ 与矩阵族 $A : \operatorname{Fin}\;n \to M_m(\mathbb{C})$，函数 `wassersteinBarycenter w A` 由经典选择算子 `Classical.epsilon` 选取满足 `X.PosDef` 且对一切满足 `Y.PosDef` 的 $Y \in M_m(\mathbb{C})$ 均成立

   $$
   \sum_{j \in \operatorname{Fin}\;n} w_j\,d_{\mathrm{BW}}(X, A_j)^2 \le \sum_{j \in \operatorname{Fin}\;n} w_j\,d_{\mathrm{BW}}(Y, A_j)^2
   $$

   的矩阵 $X$。因为 `Classical.epsilon` 是总函数，只有在证明了正定锥内存在唯一最小点之后，该选择值才精确收束为唯一重心。

::: {.theorem #thm-appi-bures-dual-barycenter lean="D5/S3/Quantum/Matrix/BuresWassersteinTransport.finite_barycenter_of_dual" title="Bures–Wasserstein 重心的对偶证书"}
设 $m, n \in \mathbb{N}$，权重 $w : \operatorname{Fin}\;n \to \mathbb{R}$ 满足对一切 $j$ 有 $0 < w_j$ 且 $\sum_{j} w_j = 1$（该归一等式蕴涵 $n \ge 1$）。设矩阵族 $A, T : \operatorname{Fin}\;n \to M_m(\mathbb{C})$ 与矩阵 $W \in M_m(\mathbb{C})$ 满足以下正定性与对偶运输平衡条件：

1. 对每个 $j \in \operatorname{Fin}\;n$，$A_j$ 与 $T_j$ 均为严格正定矩阵（`(A j).PosDef` 且 `(T j).PosDef`），且 $W$ 为严格正定矩阵（`W.PosDef`）；
2. **运输配对恒等式**：对每个 $j \in \operatorname{Fin}\;n$，有 $T_j W T_j = A_j$；
3. **加权平衡恒等式**：$\sum_{j} w_j \cdot T_j = I_m$。

则以下三条结论同时成立：

1. **正定锥内的全局最优性**：对任意满足 `X.PosDef` 的矩阵 $X \in M_m(\mathbb{C})$，

   $$
   \sum_{j} w_j\,d_{\mathrm{BW}}(W, A_j)^2 \le \sum_{j} w_j\,d_{\mathrm{BW}}(X, A_j)^2;
   $$

2. **正定锥内的严格唯一性**：对任意满足 `X.PosDef` 的矩阵 $X \in M_m(\mathbb{C})$，

   $$
   \sum_{j} w_j\,d_{\mathrm{BW}}(X, A_j)^2 \le \sum_{j} w_j\,d_{\mathrm{BW}}(W, A_j)^2 \iff X = W;
   $$

3. **重心选择算子定值**：$\operatorname{wassersteinBarycenter}(w, A) = W$。
:::

::: proof
在严格正定假设下，对每个指标 $j$，将 $A_j = T_j W T_j$ 代入 $W$ 处的保真交叉项 $\bigl(W^{1/2} A_j W^{1/2}\bigr)^{1/2} = \bigl((W^{1/2} T_j W^{1/2})^2\bigr)^{1/2} = W^{1/2} T_j W^{1/2}$，两边取迹实部得 $\operatorname{Re}\operatorname{Tr}\bigl((W^{1/2} A_j W^{1/2})^{1/2}\bigr) = \operatorname{Re}\operatorname{Tr}(W T_j)$。对任意正定竞争矩阵 $X$，矩阵保真运输不等式与算子 Young 刚性（`fidelity_transport` 与 `fidelity_young_rigid`）以正定算子 $T_j$ 为对偶标尺，给出交叉迹上界 $2\,\operatorname{Re}\operatorname{Tr}\bigl((X^{1/2} A_j X^{1/2})^{1/2}\bigr) \le \operatorname{Re}\operatorname{Tr}(X T_j + T_j^{-1} A_j) = \operatorname{Re}\operatorname{Tr}(X T_j + W T_j)$，且等号成立具有严格刚性。用严格正权重 $w_j > 0$ 对 $j$ 求和，并代入平衡条件 $\sum_j w_j T_j = I_m$ 与归一条件 $\sum_j w_j = 1$，线性项 $\sum_j w_j\,\operatorname{Re}\operatorname{Tr}(X T_j) = \operatorname{Re}\operatorname{Tr}(X)$ 与目标函数中的 $\operatorname{Re}\operatorname{Tr}(X)$ 精确相消，直接推出 $\sum_j w_j\,d_{\mathrm{BW}}(W, A_j)^2 \le \sum_j w_j\,d_{\mathrm{BW}}(X, A_j)^2$；一旦反向不等式成立，由于每个 $w_j > 0$，每一项运输不等式都必须取等，算子 Young 刚性迫使对某指标（进而全部指标）有 $X = W$。最后，$W$ 自身满足 `W.PosDef` 且是该谓词下的唯一极小元，故 `Classical.epsilon` 定义的 `wassersteinBarycenter w A` 必等于 $W$。完整证明由 Lean 内核检查。
:::

注意 [@thm-appi-bures-dual-barycenter] 的精确管辖范围：它是一条**有证书充分性与唯一性定理**——给定正定元组 $(W, T)$ 满足 $T_j W T_j = A_j$ 与 $\sum_j w_j T_j = I_m$ 时，保证正定域内的唯一极小化。它并未从零构造该对偶证书的求解算法，也不将无条件唯一性外推到含零特征值的奇异半正定矩阵边界。

---

## I.3 条件子熵与猜测概率的界 {#sec-appendix-i-3}

前两节刻画了量子态之间的比较散度与正定运输中心；但当观察者面对一个有限经典标签 $x \in X$ 制备的量子态系综 $\{p(x), \rho_x\}$，且只被允许在接收端 $B$ 执行一次正算子值测量（POVM）去猜测隐含标签 $x$ 时，什么信息量直接约束了最优猜测成功率 $p_{\mathrm{guess}}$？冯·诺依曼熵给出的是渐近多拷贝编码极限（Holevo 界方向），而在单拷贝紧致下界方向上，Jozsa–Robb–Wootters **子熵（subentropy）** $Q(\rho)$ 则刻画了沿随机正交测量方向平均可提取的互信息下界。本节展示：经典—量子联合记录态相对于边缘混合态的**条件子熵**，从下方精确夹住了单次猜测错误率 $1 - p_{\mathrm{guess}}$ 与负对数猜测界 $-\ln p_{\mathrm{guess}}$。

先在双标签单量子比特系综（$X = \{0, 1\},\, p(0) = p(1) = 1/2,\, B = \operatorname{Fin}\;2$）上亲手推演两个极端情形，同时看清为什么子熵必须用行列式积分定义而不能草率套用朴素谱差公式。对矩阵 $A$，子熵核为 $k_A(t) = \frac{t}{1+t} - \frac{1}{\operatorname{Re}\det(I + t^{-1} A)}$（$t > 0$），矩阵子熵为 $Q(A) = \int_0^\infty k_A(t)\,dt$：

- 对任意秩一纯态（如 $|0\rangle\langle 0| = \operatorname{diag}(1, 0)$），$\det(I + t^{-1}\operatorname{diag}(1, 0)) = 1 + t^{-1} = \frac{1+t}{t}$，倒数恰好等于 $\frac{t}{1+t}$，核函数恒为 $0$，故 $Q(|0\rangle\langle 0|) = 0$。
- 对等权二重简并谱（如最大混合态 $\operatorname{diag}(1/2, 1/2)$），两个特征值相等 $\lambda_1 = \lambda_2 = 1/2$：教科书中常见的互异特征值分式和 $-\sum_i \bigl(\prod_{j \neq i}\frac{\lambda_i}{\lambda_i - \lambda_j}\bigr)\lambda_i\ln\lambda_i$ 在此处会出现分母为零的奇点，但行列式积分核完全光滑：

  $$
  k_{\operatorname{diag}(1/2, 1/2)}(t) = \frac{t}{1 + t} - \frac{1}{(1 + \frac{1}{2t})^2} = \frac{t}{1 + t} - \frac{4 t^2}{(2t + 1)^2}.
  $$

  直接求原函数可得 $\frac{d}{dt}\!\left[\ln\frac{2t + 1}{t + 1} + \frac{1}{2(2t + 1)}\right] = \frac{2}{2t + 1} - \frac{1}{t + 1} - \frac{1}{(2t + 1)^2} = \frac{t}{1 + t} - \frac{4 t^2}{(2t + 1)^2}$，因此从 $t \to 0^+$ 到 $t \to +\infty$ 积分给出精确闭式值

  $$
  Q\bigl(\operatorname{diag}(1/2, 1/2)\bigr) = \left[\ln\frac{2t + 1}{t + 1} + \frac{1}{2(2t + 1)}\right]_{0}^{\infty} = \ln 2 - \frac{1}{2} \approx 0.1931.
  $$

有了这两个基准数值，两个极端系综一目了然：

1. **等权正交纯态系综** $\rho_0 = |0\rangle\langle 0|$，$\rho_1 = |1\rangle\langle 1|$：经典—量子联合记录态 $\rho_{XB} = \frac{1}{2}|0\rangle\langle 0|\otimes |0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1|\otimes |1\rangle\langle 1|$ 的非零特征值为 $(1/2, 1/2)$（零特征值对 $\det(I + t^{-1}A)$ 仅贡献因子 $1$），故 $Q(\rho_{XB}) = \ln 2 - \frac{1}{2}$；而接收端边缘混合态 $\bar{\rho}_B = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1| = \operatorname{diag}(1/2, 1/2)$ 同样有 $Q(\bar{\rho}_B) = \ln 2 - \frac{1}{2}$。两者相减得条件子熵 $Q(X \mid B)_{\mathrm{sub}} = 0$。与此同时，正交投影测量 $M_0 = |0\rangle\langle 0|,\, M_1 = |1\rangle\langle 1|$ 百发百中，$p_{\mathrm{guess}} = 1$，不等式链收紧为 $0 \le 0 \le 0$。
2. **等权全同纯态系综** $\rho_0 = \rho_1 = |0\rangle\langle 0|$：联合记录态 $\rho_{XB} = \operatorname{diag}(1/2, 1/2) \otimes |0\rangle\langle 0|$ 的非零谱仍为 $(1/2, 1/2)$，故 $Q(\rho_{XB}) = \ln 2 - \frac{1}{2}$；但边缘混合态 $\bar{\rho}_B = |0\rangle\langle 0|$ 是纯态，$Q(\bar{\rho}_B) = 0$，于是条件子熵跃升为 $Q(X \mid B)_{\mathrm{sub}} = \ln 2 - \frac{1}{2} \approx 0.1931$。此时任何完备 POVM 满足 $M_0 + M_1 = I_2$，猜测成功率恒为 $\frac{1}{2}\operatorname{Re}\operatorname{Tr}((M_0 + M_1)|0\rangle\langle 0|) = \frac{1}{2}$，即 $p_{\mathrm{guess}} = 1/2$，不等式链精确呈现为

   $$
   \ln 2 - \frac{1}{2} \approx 0.1931 \;\le\; 1 - \frac{1}{2} = \frac{1}{2} \;\le\; -\ln\frac{1}{2} = \ln 2 \approx 0.6931.
   $$

现列出冻结定理所依赖的形式化定义（其中 $X, B$ 为具可判定相等性的有限类型 `[Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]`）：

1. **有限维密度态与经典—量子记录态**：在 $C^*$-矩阵代数 `CStarMatrix n n ℂ` 上，密度态定义为子类型 `DensityState n := {rho : CStarMatrix n n ℂ // 0 ≤ rho ∧ Matrix.trace rho = 1}`（借助标准星代数同构 `CStarMatrix.ofMatrix` 与原始矩阵 `Matrix n n ℂ` 互换）。给定非负归一概率分布 $p : X \to \mathbb{R}$（$\forall x,\; 0 \le p(x)$ 且 $\sum_x p(x) = 1$，后者自动蕴涵 $X$ 非空）与条件态族 $\rho : X \to \operatorname{DensityState}\;B$（迹为 $1$ 自动蕴涵 $B$ 非空），边缘混合态为 $\operatorname{mixtureState}(p, hp, hs, \rho) := \sum_{x \in X} p(x)\,\rho(x) \in \operatorname{DensityState}\;B$；以正交基指针态 $\operatorname{pointerState}(x) = |x\rangle\langle x|$ 与张量积 $\operatorname{productState}$ 构成的经典—量子记录态为

   $$
   \operatorname{recordState}(p, hp, hs, \rho) := \sum_{x \in X} p(x)\,\bigl(\operatorname{pointerState}(x) \otimes_k \rho(x)\bigr) \in \operatorname{DensityState}(X \times B).
   $$

2. **矩阵子熵与条件子熵**：对矩阵 $A \in \operatorname{Matrix}\;\iota\;\iota\;\mathbb{C}$，定义子熵核与正半轴积分：

   $$
   \operatorname{subentropyKernel}(A, t) := \frac{t}{1 + t} - \Bigl(\operatorname{Re}\det\bigl(I + t^{-1} A\bigr)\Bigr)^{-1}, \qquad \operatorname{matrixSubentropy}(A) := \int_{(0, \infty)} \operatorname{subentropyKernel}(A, t)\,dt,
   $$

   令 $\operatorname{subentropy}(\sigma) := \operatorname{matrixSubentropy}(\operatorname{ofMatrix}^{-1}(\sigma.1))$，并定义经典—量子**条件子熵**（`conditionalSubentropy`）为

   $$
   \operatorname{conditionalSubentropy}(p, hp, hs, \rho) := \operatorname{subentropy}\bigl(\operatorname{recordState}(p, hp, hs, \rho)\bigr) - \operatorname{subentropy}\bigl(\operatorname{mixtureState}(p, hp, hs, \rho)\bigr).
   $$

3. **POVM 猜测成功率与上确界 `pGuess`**：对算子族 $M : X \to \operatorname{Matrix}\;B\;B\;\mathbb{C}$，定义成功概率泛函

   $$
   \operatorname{successProbability}(p, \rho, M) := \sum_{x \in X} p(x)\,\operatorname{Re}\operatorname{Tr}\!\left(M_x \cdot \operatorname{ofMatrix}^{-1}(\rho(x).1)\right).
   $$

   记合法 POVM 成功率集合为 $\operatorname{successProbabilitySet}(p, \rho) := \bigl\{a \in \mathbb{R} \;\big|\; \exists M,\; (\forall x,\; M_x.\mathrm{PosSemidef}) \land \sum_{x} M_x = I_B \land a = \operatorname{successProbability}(p, \rho, M)\bigr\}$，最优**猜测概率**定义为实数集条件上确界 $\operatorname{pGuess}(p, \rho) := \operatorname{sSup}\bigl(\operatorname{successProbabilitySet}(p, \rho)\bigr)$。由于可取把单位算子集中于某一标签 $x_0$（满足 $p(x_0) > 0$）的平凡 POVM，且对一切合法 POVM 成功率均不超过 $\sum_x p(x) = 1$，该集合非空、有上界且满足 $0 < \operatorname{pGuess}(p, \rho) \le 1$；因此下方结论中的 `Real.log (pGuess p ρ)` 严格落在正实轴标准自然对数域内，不触发 `Real.log` 在非正输入上的总函数延拓。

::: {.theorem #thm-appi-subentropy-guessing lean="D5/S3/Quantum/Subentropy/POVMGram.cq_conditional_subentropy_guessing" title="条件子熵与猜测概率的界"}
设 $X, B$ 为具有可判定相等性的有限类型（`[Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]`），$p : X \to \mathbb{R}$ 满足对一切 $x \in X$ 有 $0 \le p(x)$（`hp`）且 $\sum_{x \in X} p(x) = 1$（`hs`），$\rho : X \to \operatorname{DensityState}\;B$ 为有限密度态系综。则经典—量子条件子熵与最优猜测概率满足双层不等式：

$$
\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \;\le\; 1 - \operatorname{pGuess}(p, \rho) \;\le\; -\operatorname{Real.log}\bigl(\operatorname{pGuess}(p, \rho)\bigr).
$$

:::

::: proof
任取一族满足 $\forall x,\; M_x.\mathrm{PosSemidef}$ 且 $\sum_{x \in X} M_x = I_B$ 的接收端 POVM $M$。借助经典—量子联合算子的 Naimark—Gram 表示与对角捏合间隙估计（`ClassicalQuantumGram` 与 `PinchingGap`），将联合记录态与边缘混合态的子熵差展开为正半轴 $t \in (0, \infty)$ 上行列式核的积分差，并按所选 POVM 将成功识别对角块与误差余项分离，可证对每一个合法 POVM $M$ 均有 $\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \le 1 - \operatorname{successProbability}(p, \rho, M)$。因为 $\operatorname{successProbabilitySet}(p, \rho)$ 非空（由归一条件 $\sum_x p(x) = 1$ 保证 $X$ 非空，把 $I_B$ 赋给某个正权指标、其余赋 $0$ 即给出正成功率下界）且以 $1$ 为上界，对 $M$ 取条件上确界 `sSup` 即得第一条不等式 $\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \le 1 - \operatorname{pGuess}(p, \rho)$，同时确立 $0 < \operatorname{pGuess}(p, \rho) \le 1$。再对严格正实数 $u = \operatorname{pGuess}(p, \rho) > 0$ 应用基本对数切线不等式 $\ln u \le u - 1$（等价于 $1 - u \le -\ln u$），即得第二条不等式。完整证明由 Lean 内核检查。
:::

读者在引用 [@thm-appi-subentropy-guessing] 时应注意：这里出现的是通过行列式积分定义的**条件子熵**，绝不能将它直接替换成冯·诺依曼条件熵 $S(X \mid B)$（在正交纯态例中二者虽同为 $0$，但在全同纯态例中冯·诺依曼条件熵为 $\ln 2 \approx 0.6931$，严格大于条件子熵 $\ln 2 - 1/2 \approx 0.1931$），也不能据此宣称子熵满足一般多体强次可加性。

---

## I.4 投影支撑 Kraus 族的量子通道补全 {#sec-appendix-i-4}

回到[第 14 章 §14.3](ch14-s03-logical-recovery.md)的纠错恢复图景：当我们针对一组两两正交的可纠错误子空间设计恢复算子 $K_i$ 时，它们在受保护支撑投影 $P = \sum_i K_i^\dagger K_i$（满足 $P^\dagger = P$ 与 $P^2 = P$）上表现得像精确的等距逆映射；但如果 $P \neq I$，映射 $X \mapsto \sum_i K_i X K_i^\dagger$ 在整个输入希尔伯特空间上只是**迹不增（trace-nonincreasing）**的完全正子通道，一旦输入态含有落在正交补投影 $I - P$ 上的泄漏分量，输出迹就会亏损。要把这类子空间恢复族嵌入完整的量子电路或通道复合链中，必须先将它补全为全空间上严格保迹的量子通道（CPTP 映射）。最干净的构造方式是选定输出端的一个基准标签 $v \in b$，把正交补 $(I - P)$ 上测得的全部剩余迹质量一次性重置到固定纯态 $|v\rangle\langle v|$ 上。

在二维矩阵空间 $a = b = \operatorname{Fin}\;2$ 上手算这一重置补全：取秩一投影 $P = \operatorname{diag}(1, 0) = |0\rangle\langle 0|$，单元素 Kraus 族 $K_0 = P$（满足 $K_0^\dagger K_0 = P^2 = P$），并指定重置目标指标 $v = 0 \in \operatorname{Fin}\;2$（对应矩阵基元 $E_{0,0} = \operatorname{Matrix.single}\;0\;0\;1 = \operatorname{diag}(1, 0)$）。对任意 $2 \times 2$ 复矩阵 $X = \begin{pmatrix} x_{00} & x_{01} \\ x_{10} & x_{11} \end{pmatrix}$，子空间 Kraus 分支保留左上角元 $P X P = \operatorname{diag}(x_{00}, 0)$，而正交补乘积 $(I_2 - P) X = \begin{pmatrix} 0 & 0 \\ x_{10} & x_{11} \end{pmatrix}$ 的复矩阵迹恰好拾取右下角元 $\operatorname{Tr}\bigl((I_2 - P) X\bigr) = x_{11}$。两项相加得到补全映射

$$
\Phi(X) = P X P + \operatorname{Tr}\bigl((I_2 - P) X\bigr)\,E_{0,0} = \begin{pmatrix} x_{00} + x_{11} & 0 \\ 0 & 0 \end{pmatrix} = (\operatorname{Tr} X)\,|0\rangle\langle 0|,
$$

对任意复矩阵 $X$ 都精确满足 $\operatorname{Tr}(\Phi(X)) = x_{00} + x_{11} = \operatorname{Tr}(X)$。特别地，若输入对角密度矩阵 $X = \operatorname{diag}(1/3, 2/3)$，子空间分支输出 $\operatorname{diag}(1/3, 0)$，漏入正交补的质量 $2/3$ 被全部重置回 $|0\rangle\langle 0|$，最终输出合法密度态 $\operatorname{diag}(1, 0)$。

在冻结模块 `FiniteStateChannel` 与 `KrausCompletion` 中，有限维量子通道结构 `QuantumChannel a b`（其中 `[Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b]`）由两项字段组成：

1. 一个完全正映射 `toCompletelyPositiveMap : CompletelyPositiveMap (CStarMatrix a a ℂ) (CStarMatrix b b ℂ)`；
2. 全矩阵代数上的严格复迹保持性质 `trace_preserving : ∀ rho : CStarMatrix a a ℂ, Matrix.trace (toCompletelyPositiveMap rho) = Matrix.trace rho`。

::: {.theorem #thm-appi-kraus-channel-completion lean="D5/S3/Quantum/Recovery/KrausCompletion.complete_quantum_channel" title="投影支撑 Kraus 族的量子通道补全"}
设 $a, b$ 为具有可判定相等性的有限指标类型（`[Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b]`），$s$ 为有限指标类型（`[Fintype s]`）。给定算子族 $K : s \to \operatorname{Matrix}\;b\;a\;\mathbb{C}$、投影矩阵 $P \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$ 以及显式指定的输出指标 $v \in b$，若满足自伴幂等条件 $P^\dagger = P$、$P \cdot P = P$ 以及支撑完备等式

$$
\sum_{i \in s} K_i^\dagger K_i = P,
$$

则存在量子通道 $\mathrm{channel} : \operatorname{QuantumChannel}\;a\;b$，使得对一切复矩阵 $X \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$ 均有

$$
\operatorname{ofMatrix}^{-1}\!\bigl(\mathrm{channel.toCompletelyPositiveMap}(\operatorname{ofMatrix}(X))\bigr) = \sum_{i \in s} K_i X K_i^\dagger + \operatorname{Matrix.trace}\bigl((I - P) X\bigr) \cdot \operatorname{Matrix.single}\;v\;v\;(1 : \mathbb{C}).
$$

:::

::: proof
因 $P^\dagger = P$ 且 $P^2 = P$，互补矩阵 $Q := I - P$ 同样满足 $Q^\dagger = Q$ 与 $Q^2 = Q$。固定输出指标 $v \in b$，对每个输入基指标 $u \in a$ 构造秩一重置算子 $L_u := E_{v, u} Q \in \operatorname{Matrix}\;b\;a\;\mathbb{C}$，并将原指标集 $s$ 扩充为直和有限集 $s \oplus a$（左分支取 $K_i$，右分支取 $L_u$）。一方面，计算重置分支的 Kraus 求和：对任意矩阵 $X \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$，$\sum_{u \in a} L_u X L_u^\dagger = \sum_{u \in a} E_{v,u} (Q X Q^\dagger) E_{u,v} = \operatorname{Tr}(Q X Q^\dagger)\,E_{v,v}$；由迹的循环性与 $Q^\dagger Q = Q^2 = Q = I - P$，得 $\operatorname{Tr}(Q X Q^\dagger) = \operatorname{Tr}((I - P) X)$，与目标公式完全一致。另一方面，核验扩充 Kraus 族的完备性：

$$
\sum_{i \in s} K_i^\dagger K_i + \sum_{u \in a} L_u^\dagger L_u = P + \sum_{u \in a} Q^\dagger E_{u,v} E_{v,u} Q = P + Q^\dagger I_a Q = P + Q^2 = P + (I - P) = I_a.
$$

由有限维 Kraus 完全正保迹通道构造定理（`FiniteKrausChannel`），该扩充 Kraus 族直接生成满足完全正性与全空间迹保持性的 `QuantumChannel a b`。完整证明由 Lean 内核检查。
:::

这里有两处细节值得留意：其一，公式中的系数 $\operatorname{Matrix.trace}((I - P) X)$ 对一般复矩阵 $X$ 是复标量，等式在全部复矩阵上逐点成立；只有当 $X$ 是半正定密度态时，$\operatorname{Tr}((I - P)X) \in [0, 1]$ 才具有“落在支撑子空间之外的泄漏概率质量”这一统计解释，且输入参数 $v : b$ 显式保证了输出空间 $b$ 非空。其二，重置项把整个 $(I - P)$ 子空间压到同一个固定输出 $|v\rangle\langle v|$ 上——它解决的是**迹亏损子通道的物理合法化（CPTP 补全）**，绝不意味着该补全通道逆转了 $(I - P)$ 上的噪声或保留了原始相位信息。

---

## I.5 可分锥最近点的规范残差见证 {#sec-appendix-i-5}

在 I.4 中，我们在投影支撑子空间上正面搭出了一条完全正保迹通道；反过来，当我们追问某个复合量子算子能否由局域正半定乘积资源无误差生成（例如一个双体正半定算子 $R$ 是否落在**未归一化可分锥**内，或它的最佳无纠缠逼近究竟差了多远）时，几何学给出的回答是希尔伯特空间闭凸锥上的 **Moreau 正交残差分解**：把 $R$ 向闭可分锥作最近点投影得到 $P$，则残差 $r = R - P$ 与最近锥点正交（$\langle P, r\rangle = 0$），而取反残差 $W = P - R = -r$ 就自动成为一张**厄米块正（block-positive）纠缠见证算子**——它对全锥一切可分算子配对非负，却在 $R$ 自身上精确读出负的平方逼近误差 $-\|R - P\|_{\mathrm{HS}}^2$！

先在双量子比特最大纠缠投影（$m = n = 2$）上把这一锥投影与残差见证算得清清楚楚，尤其看清一条极易被忽略的几何事实：**即使输入 $R$ 是迹为 $1$ 的纯态密度矩阵，它在未归一化可分锥中的 Hilbert–Schmidt 最近点 $P$ 的迹也不必等于 $1$！** 取贝尔态 $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ 的秩一投影 $R = |\Phi^+\rangle\langle\Phi^+|$（满足 $\operatorname{Tr}(R) = 1$，$R^2 = R$）。写出候选最近锥点、残差与对偶见证：

$$
P = \frac{1}{2} R + \frac{1}{4} I_4, \qquad r = R - P = \frac{1}{2} R - \frac{1}{4} I_4, \qquad W = P - R = -r = \frac{1}{4} I_4 - \frac{1}{2} R.
$$

逐条核对以下四项代数性质（此教学核算用于直观理解下方定理的各个结论项，本身不另计为冻结声明）：

1. **$P$ 属于可分锥（且 $\operatorname{Tr}(P) = 3/2 \neq 1$）**：用双比特泡利张量展开 $R = \frac{1}{4}(I \otimes I + X \otimes X - Y \otimes Y + Z \otimes Z)$，可得 $P = \frac{3}{8} I \otimes I + \frac{1}{8}(X \otimes X - Y \otimes Y + Z \otimes Z)$。考察沿 $X, Z$ 轴同号配对、沿 $Y$ 轴异号配对的六个乘积纯态投影之和：

   $$
   \bigl(|++\rangle\langle ++| + |--\rangle\langle --|\bigr) + \bigl(|00\rangle\langle 00| + |11\rangle\langle 11|\bigr) + \bigl(|+i,-i\rangle\langle +i,-i| + |-i,+i\rangle\langle -i,+i|\bigr) = \frac{3}{2} I \otimes I + \frac{1}{2}(X \otimes X - Y \otimes Y + Z \otimes Z) = 4 P.
   $$

   两边同除以 $4$，即把 $P$ 显式表为六个半正定张量积之和的 $1/4$，故 $P$ 属于可分锥！而它的迹是 $\operatorname{Tr}(P) = \frac{1}{2}\cdot 1 + \frac{1}{4}\cdot 4 = \frac{3}{2} > 1$——放宽迹归一约束正是可分**锥**最近点与归一可分**态**最近点之间的关键分水岭。
2. **残差正交性 $\operatorname{Tr}(P r) = 0$**：利用 $R^2 = R$ 与 $\operatorname{Tr}(R) = 1$，有 $P r = \bigl(\frac{1}{2}R + \frac{1}{4}I_4\bigr)\bigl(\frac{1}{2}R - \frac{1}{4}I_4\bigr) = \frac{1}{4}R - \frac{1}{16}I_4$，两边取迹得 $\frac{1}{4}\cdot 1 - \frac{1}{16}\cdot 4 = 0$。
3. **见证算子 $W$ 的块正性**：对任意乘积向量 $a \otimes b \in \mathbb{C}^2 \otimes \mathbb{C}^2$，由 Cauchy–Schwarz 不等式有 $\lvert\langle \Phi^+ \mid a \otimes b\rangle\rvert^2 = \frac{1}{2}\lvert a_0 b_0 + a_1 b_1\rvert^2 \le \frac{1}{2}\|a\|^2\|b\|^2$，于是

   $$
   \langle a \otimes b \mid W \mid a \otimes b\rangle = \frac{1}{4}\|a\|^2\|b\|^2 - \frac{1}{2}\lvert\langle \Phi^+ \mid a \otimes b\rangle\rvert^2 \ge 0,
   $$

   从而对可分锥中一切算子 $S = \sum_i A_i \otimes B_i$ 均有 $\operatorname{Re}\operatorname{Tr}(S^\dagger W) \ge 0$（等价于 $\operatorname{Re}\operatorname{Tr}(S^\dagger r) \le 0$）。
4. **最近点变分最优性与严格负残差读数**：对任意可分锥元 $Q$，展开 $\|R - Q\|_{\mathrm{HS}}^2 = \|r + (P - Q)\|_{\mathrm{HS}}^2 = \|r\|_{\mathrm{HS}}^2 + \|P - Q\|_{\mathrm{HS}}^2 - 2\,\operatorname{Re}\operatorname{Tr}(Q^\dagger r) \ge \|r\|_{\mathrm{HS}}^2$，确证 $P$ 为唯一最近可分锥点；同时 $\|r\|_{\mathrm{HS}}^2 = \operatorname{Tr}\bigl(\frac{1}{4}R - \frac{1}{4}R + \frac{1}{16}I_4\bigr) = \frac{1}{4}$，见证配对值为

   $$
   \operatorname{Tr}(R W) = \operatorname{Tr}\!\left(R\Bigl(\frac{1}{4}I_4 - \frac{1}{2}R\Bigr)\right) = \frac{1}{4} - \frac{1}{2} = -\frac{1}{4} = -\|r\|_{\mathrm{HS}}^2 < 0,
   $$

   一张负读数同时给出了纠缠不可分证书与精确的 Hilbert–Schmidt 距离平方 $1/4$！

在冻结模块 `CompositeCones`、`CompositeConeDuality` 与 `SeparableConeResidualWitness` 中，任意自然数维 $m, n \in \mathbb{N}$（允许 $m = 0$ 或 $n = 0$ 的零维退化边界）上的精确对象定义如下：

1. **复合矩阵空间、实 Hilbert–Schmidt 配对与坐标等距**：记复合复矩阵空间为 $\operatorname{CompositeMatrix}\;m\;n := \operatorname{Matrix}\;(\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\;(\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\;\mathbb{C}$。两矩阵 $S, W$ 的实内积配对定义为

   $$
   \operatorname{pairing}(S, W) := \operatorname{Re}\operatorname{Tr}(S^\dagger W), \qquad \operatorname{distanceSq}(R, P) := \operatorname{pairing}(R - P, R - P).
   $$

   同时，连续实线性等价 `entryEquiv : CompositeMatrix m n ≃L[ℝ] EntrySpace m n` 将矩阵按全部矩阵元重排至有限维欧氏复坐标空间 $\operatorname{EntrySpace}\;m\;n := \operatorname{EuclideanSpace}\;\mathbb{C}\;\bigl((\operatorname{Fin}\;m \times \operatorname{Fin}\;n) \times (\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\bigr)$，因此范数平方 $\|\operatorname{entryEquiv}(r)\|^2$ 是实 Hilbert–Schmidt 坐标范数平方 $\sum_{i,j} \lvert r_{ij}\rvert^2 = \operatorname{pairing}(r, r)$，而非算子谱范数。
2. **未归一化可分锥、块正性与最近点选择**：矩阵 $W \in \operatorname{CompositeMatrix}\;m\;n$ 属于**可分锥**（`separableCone W`），若存在自然数 $k \in \mathbb{N}$（允许 $k = 0$ 表示零矩阵）及矩阵族 $A : \operatorname{Fin}\;k \to M_m(\mathbb{C})$、$B : \operatorname{Fin}\;k \to M_n(\mathbb{C})$，使得每个指标 $i$ 满足 `(A i).PosSemidef ∧ (B i).PosSemidef` 且 $W = \sum_{i : \operatorname{Fin}\;k} A_i \otimes_k B_i$（不要求迹等于 $1$）。矩阵 $W$ 称为**块正**（`blockPositive W`），若对一切向量 $a : \operatorname{Fin}\;m \to \mathbb{C}$ 与 $b : \operatorname{Fin}\;n \to \mathbb{C}$ 均有

   $$
   0 \le \operatorname{Re}\bigl\langle a \otimes b,\, W(a \otimes b)\bigr\rangle.
   $$

   由于 `separableCone` 在 `EntrySpace m n` 中构成闭凸锥（`separableProperCone m n`），对每个 $R \in \operatorname{CompositeMatrix}\;m\;n$，最小化 $\operatorname{distanceSq}(R, Q)$（$Q \in \operatorname{separableCone}$）的锥点存在且唯一，由选择算子定义为 `nearestSeparable R`。

::: {.theorem #thm-appi-separable-residual-witness lean="D5/S3/Resource/SeparableConeResidualWitness.separable_cone_residual_witness" title="可分锥最近点的规范残差见证"}
设 $m, n \in \mathbb{N}$，$R \in \operatorname{CompositeMatrix}\;m\;n$ 为半正定复合复矩阵（`hR : R.PosSemidef`）。记最近可分锥点为 $P := \operatorname{nearestSeparable}(R)$，逼近残差为 $r := R - P$，规范反残差见证为 $W := P - R$。则以下性质同时成立：

1. **可分分解与厄米块正性**：$\operatorname{separableCone}(P)$，$R = P + r$，$W$ 为厄米矩阵（`W.IsHermitian`），且满足块正性 `blockPositive W`；
2. **锥投影正交性与极锥不等式**：$\operatorname{pairing}(P, r) = 0$，且对任意满足 $\operatorname{separableCone}(S)$ 的矩阵 $S \in \operatorname{CompositeMatrix}\;m\;n$，均有

   $$
   \operatorname{pairing}(S, r) \le 0 \quad \text{且} \quad 0 \le \operatorname{pairing}(S, W);
   $$

3. **残差范数对偶等式**：

   $$
   \operatorname{pairing}(R, W) = -\operatorname{pairing}(r, r) \quad \text{且} \quad \operatorname{pairing}(R, W) = -\bigl\|\operatorname{entryEquiv}(r)\bigr\|^2;
   $$

4. **非可分算子的严格负分离证书**：若 $\neg\operatorname{separableCone}(R)$，则 $\operatorname{pairing}(R, W) < 0$。
:::

::: proof
通过实连续线性等距 `entryEquiv`，复合矩阵空间配以实配对 $\operatorname{pairing}(S, W) = \operatorname{Re}\operatorname{Tr}(S^\dagger W)$ 同构于有限维实内积空间 `EntrySpace m n`，而未归一化可分锥在其下对应闭凸锥 `separableProperCone m n`（闭性由 Carathéodory 维数界与紧单位迹截面的闭锥提升 `isClosed_separableCone` 给出）。对闭凸锥应用实内积空间的 Moreau 正交分解与锥残差见证定理（`MoreauDecomposition` 与 `ConeResidualWitness`），唯一最近点 $P = \operatorname{nearestSeparable}(R)$ 满足分解 $R = P + r$、锥上正交条件 $\operatorname{pairing}(P, r) = 0$，以及极锥变分不等式：对一切 $S \in \operatorname{separableCone}$ 有 $\operatorname{pairing}(S, r) \le 0$，代入 $W = P - R = -r$ 即得 $0 \le \operatorname{pairing}(S, W)$。取秩一半正定乘积生成元 $S = |a\rangle\langle a| \otimes_k |b\rangle\langle b| \in \operatorname{separableCone}$，该非负配对直接化为双线性型实部非负，确立 `blockPositive W`。又因输入 $R$ 半正定故厄米（$R^\dagger = R$），而共轭转置保持可分锥与 Hilbert–Schmidt 距离不变，唯一性迫使最近点 $P$ 亦为厄米矩阵，故 $W = P - R$ 满足 `W.IsHermitian`。将 $R = P + r$ 与 $W = -r$ 代入 $\operatorname{pairing}(R, W)$ 并用 $\operatorname{pairing}(P, r) = 0$，即得 $\operatorname{pairing}(R, W) = -\operatorname{pairing}(r, r) = -\|\operatorname{entryEquiv}(r)\|^2$。最后，若 $\neg\operatorname{separableCone}(R)$，因 $P \in \operatorname{separableCone}$，必有 $r = R - P \neq 0$，故非零向量的欧氏范数平方 $\|\operatorname{entryEquiv}(r)\|^2 > 0$，从而 $\operatorname{pairing}(R, W) < 0$。完整证明由 Lean 内核检查。
:::

将 [@thm-appi-kraus-channel-completion] 与 [@thm-appi-separable-residual-witness] 对照阅读时，必须保持清醒的逻辑分界：前者在投影支撑子空间上给出了迹保持量子通道的**构造性重置补全**，后者在复合矩阵空间上利用 Hilbert–Schmidt 最近锥投影给出了偏离可分锥的**规范负残差对偶证书**。两者在“何时能构造合法实现、何时存在不可逾越的锥逼近残差”这一认识论主题上遥相呼应，但定理本身既未把 `nearestSeparable` 变成有效数值求解算法（一般高维可分性判定具有熟知的计算复杂性障碍），也未把可分锥分离证书推广为任意量子噪声通道的统一近似恢复不等式。

---

## I.6 五项结果的假设域、对象类型与认识论边界总表 {#sec-appendix-i-6}

为便于读者与审阅者跨节核对每一条冻结定理的精确定义域、总函数保护条件与不可越界推论，下表对 I.1–I.5 作逐项汇总审计：

| 节次与定理锚点 | 代数载体与维数范围 | 核心前提与总函数/归一化护栏 | 内核已验证结论（`LEAN ✓`） | 严禁越界外推的认识论边界 |
| :--- | :--- | :--- | :--- | :--- |
| **I.1** [@thm-appi-reverse-test-attainment] | 完备复内积空间 $(H : \mathsf{Type}\;v)$ 上的具体 `VonNeumannAlgebra H`（允许无限维）与宇宙 $u$ 候选测度空间 | $\rho, \sigma \ge 0$，`IsOrderNormal (ρ + σ)`，`ConvexOn ℝ (Ioi 0) f`；用 `closedPerspectiveCost` 折页积分取值于 `EReal` 避开非正对数与除零 | 存在后验矩族 $F$、$[0,1]$ 上正则有限标量测度、压缩序正规正延拓 $\Gamma$ 与正规 $L^1$ 逆测试达到 $\inf \operatorname{attainableCosts} \neq \perp$ | 下确界可为 $+\infty$（排除的仅是 $\perp = -\infty$）；一般无限维下不保证有限原子测度，也不提供数值求解算法 |
| **I.2** [@thm-appi-bures-dual-barycenter] | 有限阶复矩阵 $M_m(\mathbb{C})$，$m, n \in \mathbb{N}$（$\sum_j w_j = 1$ 蕴涵 $n \ge 1$） | $\forall j,\; w_j > 0$，$\sum_j w_j = 1$；$A_j, T_j, W$ 与竞争元 $X$ 全为严格 `PosDef`；给定对偶证书 $T_j W T_j = A_j$ 与 $\sum_j w_j T_j = I_m$ | $W$ 在全体 `PosDef` 矩阵上唯一极小化加权 $d_{\mathrm{BW}}^2$，并将 `Classical.epsilon` 定义的 `wassersteinBarycenter w A` 锁定为 $W$ | 不从零证明无证书情形的存在求解算法；不将无条件唯一性外推到含零特征值的半正定奇异边界 |
| **I.3** [@thm-appi-subentropy-guessing] | 可判定相等性的有限类型 `X, B` 上的 `CStarMatrix` 密度态（归一条件保证 `X, B` 非空） | $p \ge 0$，$\sum_x p(x) = 1$，$\rho : X \to \operatorname{DensityState}\;B$；子熵由 $(0,\infty)$ 行列式积分定义以兼容重根；$0 < p_{\mathrm{guess}} \le 1$ 保证 `Real.log` 为真对数 | $\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \le 1 - p_{\mathrm{guess}} \le -\ln p_{\mathrm{guess}}$ | 不可把条件子熵偷换为冯·诺依曼条件熵，也不可宣称子熵满足一般三体强次可加性 |
| **I.4** [@thm-appi-kraus-channel-completion] | 有限指标类型 `a, b, s` 上的复矩阵空间 `Matrix a a ℂ → Matrix b b ℂ` | $P^\dagger = P$，$P^2 = P$，$\sum_{i \in s} K_i^\dagger K_i = P$，显式给定重置指标 $v : b$；$\operatorname{Tr}((I-P)X)$ 对一般矩阵为复数、对密度态方为概率质量 | 将 $(I-P)$ 上的剩余复迹重置到 $E_{v,v}$ 可构造全空间严格保迹完全正通道 `QuantumChannel a b` | 重置补全仅恢复 CPTP 合法性，绝不逆转 $(I-P)$ 上的噪声，也不保留正交补子空间内的输入信息 |
| **I.5** [@thm-appi-separable-residual-witness] | 有限复合复矩阵 `CompositeMatrix m n`，$m, n \in \mathbb{N}$（允许零维） | `R.PosSemidef`；距离为 `entryEquiv` 实 Hilbert–Schmidt 范数，配对为 $\operatorname{Re}\operatorname{Tr}(S^\dagger W)$；`separableCone` 允许 $k = 0$ 且**不要求迹为 $1$** | 最近可分锥点 $P$ 给出厄米块正反残差 $W = P - R$，对一切可分 $S$ 配对非负，且 $\langle R, W\rangle = -\|R - P\|_{\mathrm{HS}}^2$（非可分时严格 $< 0$） | $P$ 是未归一化可分锥最近点而非归一可分态最近点；`nearestSeparable` 非数值算法；不构成任意量子通道的近似恢复定理或 I.4 的严格优化对偶 |
