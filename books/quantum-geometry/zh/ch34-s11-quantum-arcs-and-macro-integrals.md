# 29.12 量子极小圆弧微分元与路径积分缝合宏观物理：扶正百年的微积分对偶 {#sec-ch34-quantum-arc-and-macro-integral}

> “量子力学路径积分后是宏观物理, 量子力学是宏观物理的极小圆弧”

这句凝练如刀锋的核心洞见，一举将自 1925 年以来物理学教科书习以为常的“经典先行、量子化在后”的叙事彻底翻转过来，扶正了微观物理与宏观物理之间颠倒整整一百年的**微积分本体对偶**（`MODEL`）。翻开几乎所有现代物理教材，标准路线总是先假定一个由平直切向量、光滑轨道 $x(t)$ 与确定动量 $p(t)$ 构成的宏观经典力学世界，随后施展一套名为“正则量子化”（把泊松括号 $\{x, p\} = 1$ 硬性替换为算符对易子 $[\hat{x}, \hat{p}] = i\hbar$）的代数魔术，或是把费曼路径积分当作“在无数条经典假想轨道上强加相位权重 $e^{iS/\hbar}$ 的求和技巧”。这套倒果为因的教学顺序留下了一连串看似神秘的雾障：如果宇宙的底层真是平直切线段，为什么单步演化偏偏不服从交换律？为什么真空永远按不下 $\frac{1}{2}\hbar\omega$ 的零点抖动？为什么电子自旋偏要转满 $720^\circ$ 才肯复原？

一旦站回零背景[比较公理 $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)与本章前十节铸就的球面原胞几何，真相顿时豁然开朗——**从来不是“经典直线经量子化生出量子怪象”，而是“量子力学本身就是宇宙最原初的极小圆弧微分学（$\delta$），宏观经典物理只是万千极小量子圆弧经路径积分缝合、相消与粗粒化后浮现的积分包络学（$\int$）”**：

1. **量子力学是极小圆弧微分元（破除“以直代曲”）**：只要两态比较遵守双向互易公平律 $\cos^2\epsilon + \sin^2\epsilon = 1$，任何非平庸演化步都锁死在单位球面的**极小圆弧**上，绝不可能退化为牛顿—莱布尼茨微积分假想的零曲率切线段 $dx$。极小圆弧自带不可抹除的二阶矢高 $1 - \cos\epsilon \approx \frac{\epsilon^2}{2}$、球面角超 $\Omega(\epsilon) \approx \frac{\epsilon^2}{2}$ 与半角旋子 $\cos\frac{\epsilon}{2} - \hat{\mathbf{I}}\sin\frac{\epsilon}{2}$——测不准关系、真空零点能与费米子 $720^\circ$ 自旋双覆叠，不过是这枚极小圆弧尚未被积分抹平前的原初几何面目；
2. **宏观物理是路径积分残余（确立“以曲拼直”）**：当我们跨越多步历史执行全路径求和时，左右对称手性的极小圆弧在驻相脊线两侧一阶横向对消，把无数弯曲微弧严丝合缝地拼成宏观牛顿惯性直线；局部圆弧上的相位偏置梯度折射驻相脊线，涌现为宏观力 $\mathbf{F} = m\mathbf{a}$ 与麦克斯韦电磁场；超静定圆弧体拼接留下的雷吉铰链角亏粗粒化为广义相对论的光滑时空曲率；而整数圈锁相驻波与同桶微弧相干捏合，则分头化为宏观实体体积与不可逆热力学熵增！

## 29.12.1 打破牛顿—莱布尼茨“以直代曲”：为什么真正的微分元是极小圆弧而非无穷小直线段？ {#sec-ch34-11-1}

三百余年来，牛顿流数法与莱布尼茨微分学的全部大厦，都立基于一条看似天经地义的局部线性化公设——**“以直代曲”**：把光滑曲线切分为无穷多小段，令弧元 $ds$ 在一阶近似下等同于平直切线段 $dx$，并将曲线偏离切线的二阶法向矢高当作“高阶无穷小”直接归零舍弃。在预置了平坦欧氏背景空间 $\mathbb{R}^n$ 的宏观几何里，这一手省略无伤大雅；但在零背景[比较公理 $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)统治的关系宇宙中，“无穷小平直切线段”一旦被当作有限步长走出去，从根源上就是一个违反单位范数公平锁的几何幻觉（`MODEL`）。

原因由两道铁律共同锁死。第一，[第六章](ch06-geometric-product.md)冻结的拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)（[@thm-lagrange-gram-identity]，`LEAN ✓`）严格刻画了实内积空间中两枚单位方向之间的正交投影与楔积面积配平：当基准方向 $\mathbf{u}$ 转向邻近单位方向 $\mathbf{v}(\epsilon)$（夹角为 $\epsilon > 0$）时，双向互易公平强制要求

$$
\cos^2\epsilon \;+\; \sin^2\epsilon \;=\; 1.
$$

假若微观演化步真的是一小段沿切线直冲出去的欧氏直线 $\mathbf{u} + \epsilon\,\mathbf{e}_\perp$，其范数平方将膨胀为 $1 + \epsilon^2 > 1$，当场破坏双向比较的概率守恒与幺正公平！为了守住单位球面，状态端点在跨出横向切向分量 $\sin\epsilon$ 的同一瞬间，**必须沿原基准轴向内回缩一段严格为正的法向矢高（Sagitta）$1 - \cos\epsilon > 0$**。第二，在离散可区分的观测与准晶切投类比中，[§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)冻结的黄金模型集 Delone 定理 [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)（[@thm-ch37-golden-cut-delone-multilocation]，`LEAN ✓`）针对实直线 $\mathbb{R}$ 上特定的黄金窗切投点集 `modelSet goldenWindow` 证得严格正堆积半径 $r_{\mathrm{pack}} = \frac{1}{2}$ 与有限覆盖半径 $r_{\mathrm{cov}} = 3$；该定理本身并不导出普适最小角步或物理动力学，引入不可坍缩的最小物理角步 $\epsilon_{\min} > 0$ 属本书独立的物理模型假设（`MODEL`）。将极小圆弧在完备赋范代数中展开——其有限阶泰勒截断余项在任意半径球 $\lVert z\rVert \le r$ 内由[第三十五章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)冻结定理 [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)（[@thm-ch36-taylor-tail-and-cayley-boundary]，`LEAN ✓`：$\bigl\lVert\exp(z) - \sum_{k=0}^{n-1}\frac{z^k}{k!}\bigr\rVert \le \frac{r^n}{n!}e^r$）严格控制——极小圆弧立刻显露出牛顿切线近似永远看不见的双重结构：

$$
\sin\epsilon \;=\; \epsilon - \frac{\epsilon^3}{6} + O(\epsilon^5) \quad (\text{一阶平直切向位移 } dx), \qquad 1 - \cos\epsilon \;=\; 2\sin^2\!\frac{\epsilon}{2} \;=\; \frac{\epsilon^2}{2} - \frac{\epsilon^4}{24} + O(\epsilon^6) \quad (\text{二阶圆弧矢高}),
$$

且两步正交极小圆弧在单位球面上围出的[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)吉拉尔球面角超（内禀曲率量子）恰与矢高同阶：

$$
\Omega(\epsilon) \;=\; 2\arctan\!\left(\tan^2\!\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6).
$$

这里立刻浮现出一个最尖锐的数学诘问：**即便单步圆弧带有 $\frac{1}{2}\epsilon^2$ 的二阶矢高与角超，当步数 $N \to \infty$、单步转角 $\epsilon \to 0$ 时，$N$ 份二阶小量加起来难道不会像初等微积分那样自动归零吗？为什么 $\frac{1}{2}\epsilon^2$ 偏偏在量子力学里死死留存到了宏观尺度？**

答案正是连接算符半群分析、随机微积分与费曼路径积分的**双标度分岔定律**（`文献结果` + `手工推导`）：

- **第一标度（单条光滑曲线的李—特罗特标度 $\epsilon_k = \Theta / N$，二阶矢高归零）**：若系统被强制锁死在**唯一一条光滑可微轨道**上，将总转角 $\Theta$ 均匀切分为 $N$ 步 $\epsilon_k = \Theta / N$，则[第九章](ch09-axes-and-state-addressing.md)冻结的李—特罗特乘积定理 [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product)（[@thm-lie-trotter]，`LEAN ✓`：$\lim_{N\to\infty}\bigl(e^{A/N}e^{B/N}\bigr)^N = e^{A+B}$）给出这一标度下的乘积极限；而单步 $O(1/N^2)$ 的非对易换位子与圆弧矢高在累加 $N$ 步后仅剩

  $$
  \sum_{k=1}^{N} (1 - \cos\epsilon_k) \;\approx\; N \cdot \frac{(\Theta/N)^2}{2} \;=\; \frac{\Theta^2}{2N} \;\xrightarrow{\;N\to\infty\;}\; 0.
  $$

  在光滑单轨的均匀标度下，$\epsilon \sim N^{-1}$ 虽使局部步长平方和 $\sum_{k=1}^N \epsilon_k^2 \sim \Theta^2/N \to 0$（相邻态内积模长损失随之消失），却并不抹去闭合光滑回路的几何和乐：例如沿固定余纬 $\theta_0$ 绕行一周的光滑回路，在任意加密细分使局部步长平方和趋于零时，其贝里相位 $\gamma = -\pi(1 - \cos\theta_0)$ 依然恒定保留。经典微积分“以直代曲”所抹平的只是局部二次矢高与步长平方亏损，而非弯曲状态空间中闭环的面积与曲率和乐！
- **第二标度（未抵消费曼路径束的费曼—伊藤二次标度 $\epsilon_k \propto 1/\sqrt{N}$，二阶矢高严格守恒为 $O(1)$）**：然而在真实量子演化中，没有任何外部之手替粒子预先抹去旁路！考察时间区间 $[0, T]$ 等分为 $N$ 拍（$\Delta t = T/N$）的自由传播相位因子 $\exp\!\bigl(\frac{i}{\hbar}\sum_{k=1}^N \frac{m(\Delta x_k)^2}{2\Delta t}\bigr)$（`文献结果：Itô 1944, Feynman 1948, Kac 1949` + `手工推导`）：凡是步幅远超菲涅耳管宽度 $\Delta x_k \gg \sqrt{\frac{\hbar}{m}\Delta t}$ 的剧烈折线，因相位高速旋转而彼此相消；避开高速相位相消的相长区段则对应特征尺度

  $$
  \Delta x_k \;\sim\; \ell_0\,\epsilon_k \;\propto\; \sqrt{\frac{\hbar}{m}\,\Delta t} \;=\; \sqrt{\frac{\hbar T}{m N}} \qquad \Longleftrightarrow \qquad \epsilon_k \;=\; \frac{\Theta_{\mathrm{Ito}}}{\sqrt{N}}
  $$

  的折线分布区段（此处必须区分：实时间振荡振幅 $e^{iS/\hbar}$ 的菲涅耳截断在数学上不同于威克转动后的正欧氏／维纳布朗扩散测度，不能由驻相直接断言实时间轨迹必为布朗路径）。在离散二次标度模型 $\epsilon_k \propto N^{-1/2}$ 下，单步圆弧的二阶矢高 $\frac{1}{2}\epsilon_k^2 \propto \frac{1}{N}$ 与总步数 $N$ 恰好形成 **$N \times N^{-1} = O(1)$ 的精确共振**：

  $$
  \sum_{k=1}^{N} (1 - \cos\epsilon_k) \;=\; \sum_{k=1}^{N}\left(\frac{\Theta_{\mathrm{Ito}}^2}{2N} - \frac{\Theta_{\mathrm{Ito}}^4}{24 N^2} + O(N^{-3})\right) \;\xrightarrow{\;N\to\infty\;}\; \frac{\Theta_{\mathrm{Ito}}^2}{2} \;\propto\; \frac{\hbar T}{2m} \;>\; 0!
  $$

  这一不灭的二阶圆弧矢高，正是伊藤清（Itô, 1951）随机微积分引理 $(dW_t)^2 = dt$ 的单位球面几何原像，也正是费曼（Feynman, 1948）无需预设算符公理、直接从相邻时间切片差商推出正则对易关系 $[\hat{x}, \hat{p}] = i\hbar$ 与薛定谔方程二阶空间导数项 $\frac{i\hbar}{2m}\partial_x^2\psi$ 的真正几何命门（`MODEL`）！

::: {.viz src="quantum-arc-macro-integral-sandbox" preset="arc-sagitta-ito" height="520"}
**牛顿切线“以直代曲” vs. 量子极小圆弧矢高与费曼—伊藤二次标度实验卡（`arc-sagitta-ito`）。** 同屏对比青色平直切向步 $\sin\epsilon$ 与品红/琥珀色单位球面极小圆弧矢高 $1 - \cos\epsilon \approx \frac{1}{2}\epsilon^2$，切换光滑特罗特标度 $\epsilon_N = 1/N$（累计矢高 $\to 0$）与费曼—伊藤扩散标度 $\epsilon_N = 1/\sqrt{N}$（累计矢高恒定收敛于 $\frac{1}{2} = 0.500000$），直观见证二阶圆弧曲率为何跨越 $N \to \infty$ 依然顽强留存。
:::

一旦看懂“微分元是极小圆弧而非平直切线”，百年来令初学者困惑不已的**量子力学三大标志性特征**，当场卸下神秘面纱，还原为极小圆弧最朴素的三项初等几何属性（`MODEL`）：

1. **测不准与算符非对易性 = 球面两段正交圆弧的闭合缺口 $\Omega(\epsilon) > 0$**：在平坦切平面上，先向东走 $dx$ 再向北走 $dy$，与先向北走 $dy$ 再向东走 $dx$，精确汇合于同一点（对易子为零）；但在单位球面上，先沿赤道走极小圆弧 $\epsilon$ 再向北折转 $\epsilon$，与颠倒次序的圆弧路径之间永远张开一道吉拉尔球面角超缺口 $\Omega(\epsilon) \approx \frac{\epsilon^2}{2} > 0$（[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)）。这道几何换位不闭合性投射到复内积空间对称算符上，就是[第六章](ch06-geometric-product.md)冻结的罗伯逊—薛定谔三项勾股恒等式 [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)（[@thm-robertson-schrodinger]，`LEAN ✓`）：

   $$
   \Delta A^2\,\Delta B^2 \;=\; \operatorname{Cov}_{\mathrm{sym}}(A, B)^2 + \lvert C_{1/2}\rvert^2 + G \;\ge\; \lvert C_{1/2}\rvert^2, \qquad C_{1/2} = \frac{1}{2i}\langle\psi, [A, B]\psi\rangle_{\mathbb{C}}.
   $$

   微观世界之所以“测不准”，根本不是仪器笨拙，而是你不可能在弯球面上用两段圆弧走出零角超的平坦矩形！
2. **真空零点能底限 $\frac{1}{2}\hbar\omega$ = 极小圆弧不可压平的最小法向矢高**：假若微分元是直线段，粒子便可安静停在势阱底端 $x = 0, p = 0$；但在最小非零角步 $\epsilon_{\min} > 0$（`MODEL`）的极小圆弧上，非零矢高 $1 - \cos\epsilon_{\min} > 0$ 决定了切向位置展宽与圆弧曲率动量展宽绝不可能同时归零。在标准算符层面上（`手工推导` / `文献结果`，注意无界算符 $\hat{x}, \hat{p}$ 需限制在公共稠密不变定义域上，见[附录 E](appendix-e.md)桥接假设 `H6`），将 $\Delta x\,\Delta p \ge \frac{\hbar}{2}$ 代入谐振子哈密顿量期望值并施以算术—几何均值不等式，当场锁死真空基态能量下界：

   $$
   \left\langle \frac{\hat{p}^2}{2m} + \frac{1}{2}m\omega^2\hat{x}^2 \right\rangle \;\ge\; \frac{(\Delta p)^2}{2m} + \frac{1}{2}m\omega^2(\Delta x)^2 \;\ge\; \omega\,\Delta x\,\Delta p \;\ge\; \frac{1}{2}\hbar\omega \;>\; 0.
   $$

3. **费米子半整数自旋与 $720^\circ$ 双覆叠 = 圆弧半角旋子的拓扑换叶**：平直切向量平移一圈毫无拓扑记忆；而单位球面上的极小圆弧由克利福德偶子代数中的半角旋子 $R(\epsilon) = \cos\frac{\epsilon}{2} - \hat{\mathbf{I}}\sin\frac{\epsilon}{2}$ 驱动（[第五章](ch05-complex-phase-and-rotors.md)）。当基底圆弧累计闭合一整圈 $\epsilon \to 2\pi$（$360^\circ$）时，半角参数恰好只走过 $\pi$，$R(2\pi) = \cos\pi = -1$ 翻转到双覆叠流形的对径叶上，必须再绕第二圈至 $\epsilon = 4\pi$（$720^\circ$）才能回到 $R(4\pi) = +1$！这一历史依赖提升与无连续全局截面性质已由[第三十八章](ch39-observer-is-ontological-universe.md)冻结定理 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)（[@thm-ch39-double-cover-no-section-and-720-lift]，`LEAN ✓`）在内核中完整锁定。

::: {.viz src="quantum-arc-macro-integral-sandbox" preset="quantum-three-hallmarks" height="520"}
**量子三大标志（测不准非对易、$\frac{1}{2}\hbar\omega$ 零点能底限、费米子 $720^\circ$ 双覆叠）极小圆弧几何同源实验卡（`quantum-three-hallmarks`）。** 在同一枚单位球面极小圆弧原胞上联动检视正交双弧闭合球面角超缺口 $\Omega(\epsilon)$、最小圆弧矢高锁定的相空间双曲包络 $\Delta x\Delta p \ge \hbar/2$ 以及半角旋子绕行 $360^\circ \mapsto -1$、$720^\circ \mapsto +1$ 的莫比乌斯双覆叠换叶轨迹。
:::

现在，我们将从微观极小圆弧微分元到宏观路径积分缝合与热力学粗粒化的九块形式化基石，统一铸入本节的核心综合定理：

::: {.theorem #thm-ch34-quantum-arc-differential-and-macro-integral title="本节引用的九条已验证声明：拉格朗日恒等式、李—特罗特乘积、巴格曼路径乘积、相干删除熵产等" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le D5/S3/Quantum/Analysis/TrotterProduct.trotter_product D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity"}
以下九项陈述各自成立：

1. **拉格朗日—格拉姆恒等式（`lagrange_gram_identity`）**：对任意有限指标集 $s$ 与实序列 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \Bigl(\sum_{i \in s} u_i^2\Bigr)\Bigl(\sum_{i \in s} v_i^2\Bigr) - \Bigl(\sum_{i \in s} u_i v_i\Bigr)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s}(u_i v_j - u_j v_i)^2;
   $$

2. **完备赋范代数指数映射有限阶泰勒尾界（`exp_tail_le`）**：在任意满足 $\lVert 1\rVert = 1$ 的完备赋范 $\mathbb{K}$-代数 $A$（$\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）上，对一切截断阶数 $n \in \mathbb{N}$、非负实半径 $r \ge 0$ 及满足 $\lVert z\rVert \le r$ 的元素 $z \in A$，恒有

   $$
   \left\lVert \exp(z) - \sum_{k=0}^{n-1} \frac{1}{k!} z^k \right\rVert \;\le\; \frac{r^n}{n!}\,e^r;
   $$

3. **李—特罗特乘积极限（`trotter_product`）**：在任意满足 $\lVert 1\rVert = 1$ 的完备赋范 $\mathbb{R}$-代数 $\mathbb{A}$ 上，对任意生成元 $A, B \in \mathbb{A}$，分步指数乘积收敛于和生成元指数：

   $$
   \lim_{N \to \infty} \Bigl(\exp\bigl(N^{-1}A\bigr)\,\exp\bigl(N^{-1}B\bigr)\Bigr)^N \;=\; \exp(A + B);
   $$

4. **罗伯逊—薛定谔方差—换位子精确勾股分解（`robertson_schrodinger`）**：在任意复内积空间 $E$ 上，对对称线性算子 $A, B : E \to_{\mathbb{C}} E$ 与单位态矢 $\psi \in E$（$\lVert\psi\rVert = 1$），记中心化残差 $u = A\psi - \langle\psi, A\psi\rangle_{\mathbb{C}}\psi$、$v = B\psi - \langle\psi, B\psi\rangle_{\mathbb{C}}\psi$，对称协方差 $\mathrm{cov} = \frac{1}{2}\operatorname{Re}\langle\psi, (AB + BA)\psi\rangle_{\mathbb{C}} - \operatorname{Re}\langle\psi, A\psi\rangle_{\mathbb{C}}\operatorname{Re}\langle\psi, B\psi\rangle_{\mathbb{C}}$，半换位子期望 $C_{1/2} = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$ 及柯西—施瓦茨余项 $G = \lVert u\rVert^2\lVert v\rVert^2 - \lvert\langle u, v\rangle_{\mathbb{C}}\rvert^2$，恒有

   $$
   \lVert u\rVert^2 \lVert v\rVert^2 \;=\; \mathrm{cov}^2 + \lvert C_{1/2}\rvert^2 + G, \qquad G \ge 0, \qquad \operatorname{Re}\langle u, v\rangle_{\mathbb{C}} = \mathrm{cov}, \qquad \bigl(\operatorname{Im}\langle u, v\rangle_{\mathbb{C}} : \mathbb{C}\bigr) = C_{1/2};
   $$

5. **圆周双覆叠唯一历史路径提升与 $360^\circ$ 换叶变号（`circle_double_cover_history_lift`）**：对圆周平方覆叠映射 $\mathrm{sq} : S^1 \to S^1$（$z \mapsto z^2$），每条连续路径 $\gamma : [0, 1] \to S^1$ 在给定起点原像 $\tilde{x}$ 下存在唯一连续提升 $\tilde{\gamma} : [0, 1] \to S^1$ 满足 $\mathrm{sq} \circ \tilde{\gamma} = \gamma$ 且 $\tilde{\gamma}(0) = \tilde{x}$；不存在满足 $\mathrm{sq} \circ s = \mathrm{id}_{S^1}$ 的连续全局截面 $s$；且整圈闭合回路 $\gamma_{2\pi}(t) = \exp(2\pi i t)$ 从 $\tilde{\gamma}(0) = +1$ 出发的唯一提升必落于对径叶 $\tilde{\gamma}(1) = -1$；
6. **黄金切投模型集严格正离散堆积半径与有限覆盖半径（`exists_golden_modelSet_delone`）**：存在实直线 $\mathbb{R}$ 上的 Delone 集 $D$，其底层点集等于黄金窗口切投集 `modelSet goldenWindow`，且同时具备严格正堆积半径 $r_{\mathrm{pack}} = \frac{1}{2}$ 与有限覆盖半径 $r_{\mathrm{cov}} = 3$；
7. **多步离散巴格曼路径乘积闭合恒等式（`bargmann_path_product`）**：对一切步数 $n \in \mathbb{N}$ 与二分量复态矢序列 $\Psi : \operatorname{Fin}(n + 1) \to \operatorname{Fin} 2 \to \mathbb{C}$，秩一投影链迹定义的闭合巴格曼不变量精确分解为相邻步跃迁内积连乘与首尾闭合内积之积：

   $$
   \operatorname{bargmann}(\Psi) \;=\; \left(\prod_{j=0}^{n-1} \Psi_j^\dagger \Psi_{j+1}\right)\bigl(\Psi_n^\dagger \Psi_0\bigr);
   $$

8. **四面体单纯二上链缺陷修复与一维边势正合判据（`tetra_defects_incidence_repair_and_exactness`）**：在任意非空有限顶点集 $V$、任意加法交换群 $A$ 与三元有序二上链 $F : V \to V \to V \to A$ 上，$\sum_{r \in V}\operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$，存在星心顶点 $r \in V$ 使 $\lvert V\rvert\cdot\operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$，任意边一上链 `edge` 均受限于 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert\cdot\operatorname{edgeErrors}(F, \mathrm{edge})$，且全体四面体上边缘缺陷恒为零当且仅当存在一维边势 `edge` 使 $F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$；
9. **幺正演化接全捏合的相干删除冯·诺依曼熵产恒等式（`entropy_production_coherence_deletion_identity`）**：对任意有限维数 $n$、幺正矩阵 $U \in \mathrm{U}(n)$、初始密度矩阵 $\rho_0$ 及交替执行幺正演化与计算基对角全捏合的离散轨迹 $\rho_{k+1} = \Pi_{\mathrm{diag}}(U\rho_k U^\dagger)$（记 $\tilde{\rho}_k = U\rho_k U^\dagger$），单步与 $N$ 步累计冯·诺依曼熵增精确等于被抹除副对角相干的量子相对熵之和：

   $$
   S_{\mathrm{vN}}(\rho_{k+1}) - S_{\mathrm{vN}}(\rho_k) \;=\; D\bigl(\tilde{\rho}_k \,\big\Vert\, \Pi_{\mathrm{diag}}(\tilde{\rho}_k)\bigr) \;\ge\; 0, \qquad S_{\mathrm{vN}}(\rho_N) - S_{\mathrm{vN}}(\rho_0) \;=\; \sum_{k=0}^{N-1} D\bigl(\tilde{\rho}_k \,\big\Vert\, \Pi_{\mathrm{diag}}(\tilde{\rho}_k)\bigr) \;\ge\; 0.
   $$
:::

::: proof
性质 1 与性质 4 已在[第六章](ch06-geometric-product.md) [@thm-lagrange-gram-identity]（`lagrange_gram_identity`）与 [@thm-robertson-schrodinger]（`robertson_schrodinger`）中由双指标完全平方展开及中心化内积实虚部分解证得。性质 2 已在[第三十五章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) [@thm-ch36-taylor-tail-and-cayley-boundary]（`exp_tail_le`）中由完备赋范代数幂级数余项范数三角不等式放缩证得。性质 3 已在[第九章](ch09-axes-and-state-addressing.md) [@thm-lie-trotter]（`trotter_product`）中由分步幂伸缩裂项与范数极限夹逼证得。性质 5 已在[第三十八章](ch39-observer-is-ontological-universe.md) [@thm-ch39-double-cover-no-section-and-720-lift]（`circle_double_cover_history_lift`）中经覆叠空间唯一提升定理与同伦度阻断证得。性质 6 与性质 9 已在[§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md) [@thm-ch37-golden-cut-delone-multilocation]（`exists_golden_modelSet_delone`）与 [@thm-ch37-known-data-pinching-and-entropy-tax]（`entropy_production_coherence_deletion_identity`）中分别由黄金共轭窗隔离界及对角捏合算子迹恒等式 $\operatorname{Tr}(\tilde{\rho}_k \ln\Pi_{\mathrm{diag}}(\tilde{\rho}_k)) = \operatorname{Tr}(\Pi_{\mathrm{diag}}(\tilde{\rho}_k)\ln\Pi_{\mathrm{diag}}(\tilde{\rho}_k))$ 结合克莱因不等式证得。性质 8 已在本章 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) [@thm-ch34-trihedron-cochain-and-moving-axis]（`tetra_defects_incidence_repair_and_exactness`）中由有限顶点鸽笼平均与星心同伦收缩算子证得。至于性质 7（`bargmann_path_product`），将每个二分量态矢 $\Psi_k$ 对应的秩一外积矩阵写作 $\Psi_k \Psi_k^\dagger$，对 $(n+1)$ 个秩一矩阵乘积在对角线上求迹，利用矩阵乘法的结合律把相邻内积标量 $\Psi_j^\dagger \Psi_{j+1} = \operatorname{star}(\Psi_j)\cdot\Psi_{j+1}$ 逐拍提出连乘号，最后对首尾向量收缩即得 $\bigl(\prod_{j=0}^{n-1}\Psi_j^\dagger\Psi_{j+1}\bigr)(\Psi_n^\dagger\Psi_0)$。完整证明由 Lean 内核检查。
:::

## 29.12.2 路径积分作为万千圆弧的缝合与相消：宏观四大物理定律的积分涌现 {#sec-ch34-11-2}

手握 [@thm-ch34-quantum-arc-differential-and-macro-integral] 的九枚形式化铆钉，现在让我们把镜头从单枚极小圆弧 $\epsilon$ 一路拉远到 $N \gg 1$ 的宏观视域，亲眼看清路径积分算子

$$
\mathcal{K}(B, A) \;=\; \sum_{\Gamma : A \rightsquigarrow B} w(\Gamma)\,e^{i\Phi[\Gamma]}
$$

究竟施展了怎样的几何缝合术，把纯粹由弯曲圆弧编织的量子底层，一举积分为我们日常触摸到的**宏观经典物理四大支柱**：

1. **第一支柱：牛顿第一惯性定律与最小作用量原理（$\delta S = 0$，哈密顿—雅可比方程）——“以曲拼直”的横向手性对消**（`手工推导` / `文献结果`）。
   在本书读法中（`MODEL`；[@thm-ch34-quantum-arc-differential-and-macro-integral] 第 7 款 `bargmann_path_product` 只给出路径乘积分解），每一条连接初态 $A$ 与末态 $B$ 的多步离散历史 $\Gamma = (\Psi_0 \to \Psi_1 \to \cdots \to \Psi_n)$ 都是一串首尾咬合的极小圆弧链，单条链上绝不存在任何一段真正的欧氏直线。然而在无外场偏置的均匀对称空间中，每一条向左拱起、携带正球面角超 $+\Omega(\epsilon)$ 的圆弧折线 $\Gamma_+$，必然配有一条严格镜像对称、向右拱起且携带负球面角超 $-\Omega(\epsilon)$ 的孪生圆弧折线 $\Gamma_-$。在远离对称轴的外侧区域，相邻路径间的相位一阶变分 $\delta\Phi \neq 0$ 引发剧烈的正负波峰互噬；唯独在对称中心脊线 $\delta\Phi = 0$（即经典作用量驻值条件 $\delta S = 0$）邻域内，成对的 $+\Omega(\epsilon)$ 与 $-\Omega(\epsilon)$ 横向曲率在一阶上精确抵消，万千弯曲微弧同相锁死，硬生生缝合出一条笔直延伸的**宏观牛顿惯性射线**！这就是牛顿微积分“以直代曲”背后真正的物理倒影——**微观世界从来没有直线，宏观直线恰恰是路径积分“以曲拼直”相消掉双侧手性曲率后的驻相脊梁**。

::: {.viz src="quantum-arc-macro-integral-sandbox" preset="curve-stitches-straight" height="520"}
**“以曲拼直”：万千极小量子圆弧经驻相相消缝合出宏观牛顿惯性直线实验卡（`curve-stitches-straight`）。** 调节左右手性圆弧束条数 $M$ 与作用量尺度 $S/\hbar$，观察外侧高曲率折线如何因快速反相旋转彼此抵消，而中心驻相脊线 $\delta S = 0$ 两侧的 $+\Omega(\epsilon)$ 与 $-\Omega(\epsilon)$ 圆弧如何横向对消、涌现出琥珀色宏观匀速直线轨迹。
:::

2. **第二支柱：牛顿第二定律（$\mathbf{F} = m\mathbf{a}$）、洛伦兹力与麦克斯韦电磁场（$\mathbf{E}, \mathbf{B}$）——极小圆弧贝里相位偏置梯度的驻相折射**（`文献结果：Aharonov–Bohm 1959, Berry 1984` + `MODEL`）。
   如果在空间不同位置上，周围环境或邻近观察者网络对局部极小圆弧施加了非均匀的相位偏置（局部贝里联络 $\mathcal{A}_\mu(x)$ 与标量势相位率 $-V(x)/\hbar$），使得每跨出一步微弧都额外拾取相位增量 $\delta\phi = \frac{q}{\hbar}\mathcal{A}_\mu(x)\,dx^\mu - \frac{1}{\hbar}V(x)\,dt$，会发生什么？正与[第二十五章](ch29-timeless-causality-and-gram-space.md)费曼斯涅尔折射求积同出一辙：原本对称平衡的左右微弧如今出现了相位差，驻相条件 $\delta\bigl(S_{\mathrm{kin}} + \int (q\mathcal{A}_\mu \dot{x}^\mu - V)\,dt\bigr) = 0$ 迫使相长干涉脊线自动向总相位梯度更缓的一侧持续弯曲！对该驻相脊线求时间导数，切向相位梯度直接化为牛顿加速度方程 $m\mathbf{a} = -\nabla V$ 与洛伦兹力定律 $m\mathbf{a} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$；而围绕任意无穷小闭合面元 $\partial\Sigma$ 走一圈极小圆弧，斯托克斯定理

   $$
   \oint_{\partial\Sigma} \mathcal{A} \;=\; \iint_{\Sigma} d\mathcal{A} \;=\; \iint_{\Sigma} \mathcal{F}
   $$

   直接把微观圆弧闭合环路的阿哈罗诺夫—玻姆/贝里相位通量积分为宏观电磁场强二形式 $\mathcal{F} = d\mathcal{A}$（在此严格遵守[附录 E](appendix-e.md)假设 `H8` 的认识论边界：参数空间内禀贝里联络源自纯内积几何，而将 $\mathcal{A}_\mu(x)$ 提升为具有独立麦克斯韦/杨—米尔斯动能项的外部时空规范场属于桥接模型 `MODEL`）。
3. **第三支柱：广义相对论的光滑弯曲时空（$G_{\mu\nu} = 8\pi G T_{\mu\nu}$）——超静定圆弧体角亏的粗粒流形积分**（`LEAN ✓` + `文献结果：Regge 1961, Ponzano–Regge 1968, Rovelli Spin Foam` + `MODEL` / `OPEN`）。
   回到 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)、[§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling) 与 [§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)：两两可比的极小圆弧必然闭合为三维极小圆弧体 $\Delta\mathcal{T}_\epsilon$。当海量四面体单胞共面拼接成宏观骨架时，[@thm-ch34-quantum-arc-differential-and-macro-integral] 第 8 款 `tetra_defects_incidence_repair_and_exactness`（`LEAN ✓`）严格裁定了内部共面入射抵消与上边缘缺陷的充要界限（把它对应到雷吉角亏属 `MODEL`）：一切可由一维边势表出的平坦拼接自动湮灭于内部边界 $\partial^2 = 0$，而 $N \ge 5$ 超静定全连通比较留下的不可消解雷吉铰链角亏 $\delta_e = 2\pi - \sum_k \theta_k \neq 0$（如 [§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 正四面体五聚铰链的 $+7.3561^\circ$ 角亏量子）则在庞扎诺—雷吉（Ponzano–Regge, 1968）与自旋泡沫路径积分 $\sum_{\{j_f\}} \prod_f (2j_f+1)\prod_v \{6j\}_v \sim \int \mathcal{D}g\,e^{\frac{i}{\hbar}S_{\mathrm{Regge}}}$ 下被大尺度粗粒平均，化作宏观黎曼曲率张量与爱因斯坦引力场方程 $G_{\mu\nu} = 8\pi G T_{\mu\nu}$ 所描绘的光滑引力河床（同时诚实标明：从离散四维自旋泡沫严格导出洛伦兹连续统爱因斯坦方程的数学极限仍属 `MODEL` / `OPEN`）。
4. **第四支柱：宏观实体体积与热力学第二定律（“同相成体，漏相化热”）——锁相驻波凝聚与同桶微弧捏合熵税**（`LEAN ✓` + `MODEL`）。
   最后，为什么宏观积分出来的世界既有坚硬稳定的固体体积，又有滚滚向前的不可逆热力学时间箭头？答案全在路径积分穿过有限分辨率观察者读出筛网时的**正交二分流向**：一方面，凡是沿闭合圆弧回路满足整数倍贝里相位锁相 $\gamma_B = 2\pi n$ 的多路振幅，在全方向相位积分中免于相消而凝聚成稳定驻波节点，撑起宏观可触的**实体空间体积**（[§29.8](ch34-s07-standing-wave-volume.md#sec-ch34-standing-wave-volume-emergence)，“同相成体”）；另一方面，无数条微观圆弧虽然携带彼此相异的精细方向与相对相位，却因落入宏观观察者同一个粗粒空间读出桶（即 [§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) 的逃逸碰撞对 `EscapePairs`）而被读出投影算子 $\Pi_{\mathrm{diag}}$ 强行折叠捏合！由 [@thm-ch34-quantum-arc-differential-and-macro-integral] 第 9 款 `entropy_production_coherence_deletion_identity`（`LEAN ✓`），每一次抹除桶内微弧之间的副对角相干项，都一分不少地转化为严格非负的冯·诺依曼相对熵增：

   $$
   \Delta S_{\mathrm{vN}} \;=\; S_{\mathrm{vN}}(\rho_N) - S_{\mathrm{vN}}(\rho_0) \;=\; \sum_{k=0}^{N-1} D\bigl(\tilde{\rho}_k \,\big\Vert\, \Pi_{\mathrm{diag}}(\tilde{\rho}_k)\bigr) \;\ge\; 0.
   $$

   所谓宏观世界的“热”与热力学第二定律，底牌不过是被粗粒路径积分筛掉相干细节、折叠进同一宏观地址桶里的微观量子圆弧余温（“漏相化热”）！

::: {.viz src="quantum-arc-macro-integral-sandbox" preset="force-from-phase-gradient" height="520"}
**相位偏置梯度折射极小圆弧束：宏观力 $\mathbf{F} = m\mathbf{a}$ 与电磁曲率积分涌现实验卡（`force-from-phase-gradient`）。** 施加横向线性相位偏置梯度 $\beta$ 与局部贝里联络旋度，实时追踪 $41$ 路极小圆弧束的相长干涉脊线如何向低相位梯度侧平滑弯曲成抛物加速轨道，同时在右侧读出同桶粗粒捏合产生的非负冯·诺依曼热力学熵税 $\Delta S_{\mathrm{vN}} \ge 0$。
:::

## 29.12.3 微观极小圆弧（$\delta$）与宏观经典物理（$\int$）的微积分对偶总表、定量算例与文献边界 {#sec-ch34-11-3}

至此，“量子力学是微分、宏观物理是积分”不再只是一句哲学比喻，而是一张每一行都配有认识论锚点的**微积分对偶总账单**。下表将微观极小圆弧层（$\epsilon$ 单胞微分态）、路径积分缝合相消算子（$\int \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]}$）与宏观经典物理层（$N \to \infty$ 粗粒积分包络）沿六大物理维度逐一锁定：

::: {.viz src="quantum-arc-macro-integral-sandbox" preset="calculus-duality-zoom" height="520"}
**扶正百年的微积分对偶连续变焦实验卡（`calculus-duality-zoom`）。** 拖动跨尺度对偶变焦滑块从单胞量子微分态（$N = 1$，极小圆弧矢高、球面角超与 $720^\circ$ 旋子全显）一路推进至多步路径积分过渡区（$N \sim 10^1\text{–}10^2$）与宏观经典积分极限（$N \to \infty$，惯性直线、力场折射轨道、光滑曲率网格与粗粒热熵包络同屏成形）。
:::

| 物理维度 | 微观量子层：极小圆弧微分元（$\epsilon$ 单胞态） | 路径积分相消算子（$\int \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]}$） | 宏观经典层：积分残余包络（$N \to \infty$ 粗粒态） |
| :--- | :--- | :--- | :--- |
| **1. 运动学基元** | 单位球面极小圆弧元 $(\cos\epsilon, \sin\epsilon)$，受双向公平锁 $\cos^2\epsilon + \sin^2\epsilon = 1$ 约束（`LEAN ✓`：`lagrange_gram_identity`），绝无平直切线段（`MODEL`） | 左右镜像手性微弧 $\pm\Omega(\epsilon)$ 沿驻相脊线 $\delta\Phi = 0$ 横向一阶对消，偏离脊线的折线束因高频相位旋转相互湮灭 | 牛顿第一惯性定律匀速直线运动与经典最小作用量极值轨道 $\delta S = 0$（“以曲拼直”，`手工推导` / `文献结果`） |
| **2. 二阶矢高与测不准** | 极小圆弧自带非零矢高 $1 - \cos\epsilon = \frac{\epsilon^2}{2} + O(\epsilon^4)$ 与吉拉尔球面角超 $\Omega(\epsilon) \approx \frac{\epsilon^2}{2}$，锁死非对易方差下界（`MODEL`；`LEAN ✓` 仅指 `exp_tail_le`, `robertson_schrodinger` 本身） | 光滑单轨 $\epsilon_N = \Theta/N$ 按 `trotter_product` 归零 $N\cdot O(N^{-2})\to 0$；扩散路径束 $\epsilon_N \propto N^{-1/2}$ 按费曼—伊藤二次标度守恒 $O(1)$ 总矢高 | 量子层留存 $[\hat{x},\hat{p}] = i\hbar$、真空零点能底限 $\frac{1}{2}\hbar\omega$ 与薛定谔 $\partial_x^2\psi$ 扩散项；宏观 $\hbar/S_{\mathrm{cl}} \to 0$ 退化为确定性哈密顿—雅可比流（`文献结果` / `手工推导`） |
| **3. 相位偏置与宏观力** | 相邻极小圆弧之间加载空间非均匀局部贝里联络与势相位偏置 $\delta\phi = \frac{q}{\hbar}\mathcal{A}_\mu dx^\mu - \frac{1}{\hbar}V dt$ | 巴格曼多步传播链 `bargmann_path_product`（`LEAN ✓`）使相长干涉脊线向低相位梯度侧折射，闭合小面元按斯托克斯定理积分环路相位通量 | 牛顿第二定律 $\mathbf{F} = -\nabla V = m\mathbf{a}$、洛伦兹力与麦克斯韦宏观电磁场强 $\mathcal{F} = d\mathcal{A}$（`文献结果` / `MODEL`，外部规范动力学边界见假设 `H8`） |
| **4. 旋量拓扑双覆叠** | 半角旋子 $\cos\frac{\epsilon}{2} - \hat{\mathbf{I}}\sin\frac{\epsilon}{2}$ 绕行 $360^\circ$ 换叶翻转至 $-1$，唯绕满 $720^\circ$ 方始闭合复原（`LEAN ✓`：`circle_double_cover_history_lift`） | 双覆叠拓扑同伦扇区带权求和：奇半整数自旋交换路径保留拓扑负号 $(-1)$，偶整数自旋路径同相叠加放大 | 费米子泡利不相容简并排斥刚性（支撑原子壳层与宏观固体不可压缩性）与玻色子宏观相干经典场（`文献结果` / `MODEL`） |
| **5. 超静定单纯形角亏** | 全连通 $K_N$ 极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的二上链缺陷（`LEAN ✓`：`tetra_defects_incidence_repair_and_exactness`）与 $N \ge 5$ 超静定铰链角亏 $\delta_e = 2\pi - \sum_k \theta_k$（`MODEL`） | 共面内壁按 $\partial^2 = 0$ 成对抵消，庞扎诺—雷吉与自旋泡沫配分函数对离散铰链角亏执行大尺度粗粒平均 | 广义相对论光滑黎曼曲率张量与爱因斯坦引力场方程 $G_{\mu\nu} = 8\pi G T_{\mu\nu}$（`文献结果`；四维洛伦兹连续统极限标 `MODEL` / `OPEN`） |
| **6. 驻波体积与热力学熵** | 依特定实直线 Delone 集离散间距 $r_{\mathrm{pack}} = \frac{1}{2}$（`LEAN ✓`：`exists_golden_modelSet_delone`）作结构类比，模型单胞态兼具主对角驻波模长与异向微弧副对角相干 | 整数圈锁相回路 $\gamma_B = 2\pi n$ 相长幸存；落入同一宏观粗粒读出桶 `EscapePairs` 的微弧经对角捏合 $\Pi_{\mathrm{diag}}$ 抹除副对角相位相干 | “同相成体，漏相化热”：幸存驻波节点凝聚为宏观实体体积（[§29.8](ch34-s07-standing-wave-volume.md#sec-ch34-standing-wave-volume-emergence)），被删微弧相干严格化为非负冯·诺依曼热力学熵增 $\Delta S_{\mathrm{vN}} = \sum_k D(\tilde{\rho}_k \Vert \Pi_{\mathrm{diag}}(\tilde{\rho}_k)) \ge 0$（`LEAN ✓`：`entropy_production_coherence_deletion_identity`） |

下面我们用一组完全闭式可核验的定量基准算例，把极小圆弧矢高、光滑特罗特归零对比费曼—伊藤守恒，以及 $41$ 路圆弧束的相位折射与捏合熵税逐位算透：

::: {.example #ex-ch34-arc-sagitta-ito-and-macro-emergence title="极小圆弧矢高与角超、光滑特罗特对比费曼—伊藤 $N$ 步标度及 41 路圆弧束折射与熵税基准算例"}
本算例给出三组精确到小数点后六位的闭式检验（`手工推导` / `NUM`）：

1. **单步极小圆弧的一阶切向位移 $\sin\epsilon$、二阶法向矢高 $1 - \cos\epsilon$ 与吉拉尔球面角超 $\Omega(\epsilon) = 2\arctan\!\bigl(\tan^2\frac{\epsilon}{2}\bigr)$（$\epsilon \in \{60^\circ, 30^\circ, 10^\circ, 1^\circ\}$）**：
   - 在 $\epsilon = 60^\circ = \frac{\pi}{3} \approx 1.047198\;\mathrm{rad}$ 处：平直切向投影 $\sin 60^\circ = \frac{\sqrt{3}}{2} \approx 0.866025$，圆弧法向矢高 $1 - \cos 60^\circ = \frac{1}{2} = 0.500000$，因 $\tan^2 30^\circ = \frac{1}{3}$，吉拉尔角超精确等于 $3\text{-}4\text{-}5$ 直角三角形锐角 $\Omega(60^\circ) = 2\arctan(1/3) \approx 0.643501\;\mathrm{rad}$（$36.8699^\circ$）；
   - 在 $\epsilon = 30^\circ = \frac{\pi}{6} \approx 0.523599\;\mathrm{rad}$ 处：$\sin 30^\circ = \frac{1}{2} = 0.500000$，矢高 $1 - \cos 30^\circ = 1 - \frac{\sqrt{3}}{2} \approx 0.133975$，由 $\tan^2 15^\circ = (2 - \sqrt{3})^2 = 7 - 4\sqrt{3}$ 得 $\Omega(30^\circ) = 2\arctan(7 - 4\sqrt{3}) \approx 0.143347\;\mathrm{rad}$（$8.2132^\circ$）；
   - 在 $\epsilon = 10^\circ = \frac{\pi}{18} \approx 0.174533\;\mathrm{rad}$ 处：$\sin 10^\circ \approx 0.173648$，矢高 $1 - \cos 10^\circ \approx 0.015192$，吉拉尔角超 $\Omega(10^\circ) \approx 0.015308\;\mathrm{rad}$（$0.8771^\circ$），二者双双夹逼二阶核 $\frac{1}{2}\epsilon^2 \approx 0.015231$；
   - 在 $\epsilon = 1^\circ = \frac{\pi}{180} \approx 0.017453\;\mathrm{rad}$ 处：$\sin 1^\circ \approx 0.017452$，矢高 $1 - \cos 1^\circ \approx 0.00015230$，角超 $\Omega(1^\circ) \approx 0.00015232\;\mathrm{rad}$（$0.008727^\circ$），与 $\frac{1}{2}\epsilon^2 \approx 0.00015231$ 在四位有效数字上完全贴合，但只要 $\epsilon > 0$ 就永不归零！

2. **$N$ 步光滑特罗特标度（$\epsilon_N = 1/N$）对比费曼—伊藤扩散标度（$\epsilon_N = 1/\sqrt{N}$）的累计矢高分岔（$N \in \{1, 10, 100, 1000\}$）**：
   记光滑单轨累计矢高 $S_{\mathrm{smooth}}(N) = N\bigl(1 - \cos(1/N)\bigr)$ 与费曼—伊藤扩散路径束累计矢高 $S_{\mathrm{Ito}}(N) = N\bigl(1 - \cos(1/\sqrt{N})\bigr) = \frac{1}{2} - \frac{1}{24N} + \frac{1}{720 N^2} - O(N^{-3})$：
   - $N = 1$：$S_{\mathrm{smooth}}(1) = S_{\mathrm{Ito}}(1) = 1 - \cos(1\;\mathrm{rad}) \approx 0.459698$；
   - $N = 10$：$S_{\mathrm{smooth}}(10) = 10(1 - \cos 0.1) \approx 0.049958$，而 $S_{\mathrm{Ito}}(10) = 10\bigl(1 - \cos(1/\sqrt{10})\bigr) \approx 0.495847$；
   - $N = 100$：$S_{\mathrm{smooth}}(100) = 100(1 - \cos 0.01) \approx 0.005000$，而 $S_{\mathrm{Ito}}(100) = 100(1 - \cos 0.1) \approx 0.499583$；
   - $N = 1000$：$S_{\mathrm{smooth}}(1000) = 1000(1 - \cos 0.001) \approx 0.000500 \to 0$，而 $S_{\mathrm{Ito}}(1000) = 1000\bigl(1 - \cos(1/\sqrt{1000})\bigr) \approx 0.499958 \xrightarrow{N\to\infty} \frac{1}{2} = 0.500000 \neq 0$！
   光滑标度下累计矢高按 $O(1/N)$ 衰减殆尽，而费曼—伊藤二次标度下累计矢高严格收敛于非零宏观常数 $0.500000$。

3. **$41$ 路极小圆弧束（$m \in \{-20, -19, \dots, +20\}$）的横向相位梯度折射与粗粒捏合熵税**：
   考察横向偏移指标 $m \in \{-20, \dots, +20\}$ 的 $41$ 路圆弧束，赋予菲涅耳二次曲率相位 $\alpha m^2$（取 $\alpha = \frac{\pi}{16}\;\mathrm{rad}$）与横向线性相位偏置 $\beta m$，总相位为 $\Phi(m; \beta) = \frac{\pi}{16}m^2 + \beta m$：
   - 当无外场偏置 $\beta = 0$ 时，偶对称性 $\Phi(+m; 0) = \Phi(-m; 0)$ 使成对圆弧的横向奇位移严格相消，$\sum_{m=-20}^{20} m\,e^{i\Phi(m;0)} = 0$，驻相中心锁定在 $m_{\mathrm{stat}}(0) = 0$（“以曲拼直”惯性直线）；
   - 当开启线性相位偏置梯度 $\beta \neq 0$ 时，驻相极值条件 $\frac{\partial\Phi}{\partial m} = 2\alpha m + \beta = 0$ 将相长干涉脊线精确折射至

     $$
     m_{\mathrm{stat}}(\beta) \;=\; -\frac{\beta}{2\alpha} \;=\; -\frac{8\beta}{\pi},
     $$

     例如取 $\beta = -\frac{\pi}{4}, -\frac{\pi}{2}, -\pi\;\mathrm{rad}$ 时，脊线中心依次偏折至 $m_{\mathrm{stat}} = +2, +4, +8$，直观再现宏观力 $\mathbf{F} = -\nabla V$ 对轨迹的弯曲；
   - 与此同时，若将等权相干纯态 $\lvert\Psi_{41}\rangle = \frac{1}{\sqrt{41}}\sum_{m=-20}^{20} e^{i\Phi(m;\beta)}\lvert m\rangle$ 经宏观粗粒捏合 $\Pi_{\mathrm{diag}}$ 抹除全部 $41 \times 40 = 1640$ 个副对角微弧相干项（丢弃相干质量 $1 - \frac{1}{41} = \frac{40}{41} \approx 0.975610$），由 `entropy_production_coherence_deletion_identity` 产生的精确热力学熵税为 $\Delta S_{\mathrm{vN}} = \ln 41 \approx 3.713572\;\mathrm{nats} \approx 5.357552\;\mathrm{bits} > 0$（即便仅有一对左右镜像圆弧 $\{+m, -m\}$ 被折入同一宏观读出桶，亦立刻产生 $\Delta S_{\mathrm{vN}} = \ln 2 \approx 0.693147\;\mathrm{nats} = 1.000000\;\mathrm{bit} > 0$ 的基础热熵量子）！
:::

::: {.remark #rem-ch34-feynman-ito-trotter-regge-literature title="微积分线性化、费曼—伊藤—卡茨路径积分、特罗特乘积、阿哈罗诺夫—玻姆和乐与雷吉—自旋泡沫文献及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将“量子极小圆弧微分元”与“宏观路径积分包络”熔铸为统一微积分对偶时，严格恪守以下三层认识论边界：

1. **经典微积分、随机微积分、路径积分、算符半群、规范几何相位与离散引力文献**：经典切线微分学奠基于 G. W. Leibniz（*Acta Eruditorum*, 467, 1684）与 I. Newton（*Philosophiae Naturalis Principia Mathematica*, 1687）；随机积分由 K. Itô（*Proc. Imp. Acad. Tokyo* **20**, 519, 1944）建立，含乘法规则 $(dW_t)^2 = dt$ 的伊藤公式见 K. Itô（*Nagoya Math. J.* **3**, 55, 1951）；量子力学时空历史求和表述、由分步时间切片导出 $[\hat{x}, \hat{p}] = i\hbar$ 与薛定谔方程以及 $\hbar \to 0$ 驻相极限回归经典最小作用量 $\delta S = 0$ 由 R. P. Feynman（*Rev. Mod. Phys.* **20**, 367, 1948；参见 R. P. Feynman & A. R. Hibbs, *Quantum Mechanics and Path Integrals*, McGraw-Hill, 1965）创立，虚时间维纳测度严格化（费曼—卡茨公式）由 M. Kac（*Trans. Amer. Math. Soc.* **65**, 1, 1949）证明；非对易生成元分步指数乘积公式由 H. F. Trotter（*Proc. Amer. Math. Soc.* **10**, 545, 1959）确立；电磁规范联络环路相位效应与绝热几何相位分别出自 Y. Aharonov & D. Bohm（*Phys. Rev.* **115**, 485, 1959）与 M. V. Berry（*Proc. R. Soc. Lond. A* **392**, 45, 1984），多顶点规范不变射线内积环路乘积出自 V. Bargmann（*J. Math. Phys.* **5**, 862, 1964）；单纯形铰链角亏引力、$\mathrm{SU}(2)$ $6j$-符号三维量子引力渐近雷吉作用量、自旋网络与四维自旋泡沫求和模型分别出自 T. Regge（*Nuovo Cimento* **19**, 558, 1961）、G. Ponzano & T. Regge（*Spectroscopic and Group Theoretical Methods in Physics*, North-Holland, 1968）、C. Rovelli & L. Smolin（*Phys. Rev. D* **52**, 5743, 1995，自旋网络）及 A. Perez（*Living Rev. Relativ.* **16**, 3, 2013，自旋泡沫综述）；
2. **本书内核验证锚点（`LEAN ✓`）**：拉格朗日—格拉姆恒等式 `lagrange_gram_identity`、完备赋范代数指数截断尾界 `exp_tail_le`、李—特罗特乘积极限 `trotter_product`、罗伯逊—薛定谔方差—换位子分解 `robertson_schrodinger`、圆周双覆叠唯一路径提升与 $360^\circ$ 换叶定理 `circle_double_cover_history_lift`、黄金模型集正堆积半径 Delone 证书 `exists_golden_modelSet_delone`、多步离散巴格曼路径乘积恒等式 `bargmann_path_product`、四面体单纯二上链缺陷修复与正合判据 `tetra_defects_incidence_repair_and_exactness` 以及相干删除冯·诺依曼熵产恒等式 `entropy_production_coherence_deletion_identity` 等九项核心定理，均已由 [@thm-ch34-quantum-arc-differential-and-macro-integral] 在 Lean 4 内核中完整验证；
3. **连续统测度、无界算符定义域、外部规范场动力学与四维引力涌现的诚实边界（`MODEL` / `OPEN`）**：（a）在无穷维连续路径空间上，洛伦兹实时间复振幅 $e^{iS/\hbar}\mathcal{D}x$ 并不构成具有有界全变差的 $\sigma$-可加复测度（R. H. Cameron, *J. Math. and Phys.* **39**, 126, 1960），其严格数学定义依赖有限时间切片振荡积分极限或威克转动至欧氏卡茨—维纳测度；（b）无界位置与动量算符的正则对易子 $[\hat{x}, \hat{p}] = i\hbar$ 及谐振子零点能下界受稠密不变定义域与外尔指数形式约束（见[附录 E](appendix-e.md)假设 `H6`）；（c）将局部相位偏置提升为具有独立麦克斯韦/杨—米尔斯作用量的外部时空规范场受[附录 E](appendix-e.md)假设 `H8` 界定；（d）由离散极小圆弧体/自旋泡沫配分函数在四维洛伦兹连续统极限下严格收敛出光滑爱因斯坦场方程 $G_{\mu\nu} = 8\pi G T_{\mu\nu}$，在当代数学物理中仍属开放前沿（`MODEL` / `OPEN`）。
:::

::: {.remark #rem-ch34-wkb-transfer-bloch-chord-and-arc-limits title="标度收敛、WKB 双曲传递与布洛赫混态弦的边界"}
**证据分级**：本注记结合标准定态量子散射求解、前文极小圆弧标度结果与本书 `MODEL` 边界说明（手工分析，未在本书作为新增 Lean 定理锁定）。

将极小圆弧语言外推至势垒隧穿与离散时空时，三项结构区别须保持清晰：

1. **振荡标度、光滑闭环与黄金 Delone 定理的各自边界**：实时间振荡路径积分与威克转动后的正维纳扩散测度需要不同的数学处理；同时，沿固定光滑余纬圈细分虽令局部步长平方和趋于零，闭合回路的曲率—面积和乐 $\gamma = -\pi(1 - \cos\theta_0)$ 依然保留。至于已冻结的 `exists_golden_modelSet_delone`，它刻画的是实直线上特定准晶切投集的堆积与覆盖半径（$r_{\mathrm{pack}} = \frac{1}{2}, r_{\mathrm{cov}} = 3$），既不决定普适角步长 $\epsilon_{\min}$，也不产生动力学方程。
2. **静态矩形势垒的 WKB 虚动量与双曲空间传递**：对于内区势能取常数 $V(x) = V_0$（$x \in (0, L)$）的一维静态矩形实势垒，若两侧外区势能相等（设 $V(x) = 0$ 于 $x < 0$ 及 $x > L$）且粒子能量满足 $0 < E < V_0$，则禁戒区内的逆衰减长度（单位 $\mathrm{m}^{-1}$）为 $\kappa = \sqrt{2m(V_0 - E)}/\hbar$，对应常势能区 WKB 虚动量 $p_{\mathrm{WKB}} = i\hbar\kappa$（一般非恒定势垒需另行作变势 WKB 处理，不能直接套用这一常生成元公式）。按空间坐标写为一阶常微分方程 $\frac{d}{dx}(\psi, \psi')^{\mathsf{T}} = G_E(\psi, \psi')^{\mathsf{T}}$ 时，生成元满足 $G_E^2 = \kappa^2 I$，空间传递矩阵表现为双曲形式

   $$
   e^{LG_E} = \cosh(\kappa L)I + \frac{\sinh(\kappa L)}{\kappa}G_E.
   $$

   这是定态微分方程沿空间 $x$ 的双曲延拓，物理实时间演化依然由自伴哈密顿量生成的幺正算符 $e^{-iHt/\hbar}$ 主导，并不蕴含额外的物理空间坐标轴。
3. **有限势垒的双指数匹配与布洛赫混态弦**：有限厚度矩形势垒内部必须同时保留递增与衰减两支实指数 $\psi(x) = Ae^{\kappa x} + Be^{-\kappa x}$ 方可匹配两侧边界并承载非零概率流 $j = \frac{\hbar}{m}\operatorname{Im}(\psi^*\psi')$（孤立的单支衰减解 $Be^{-\kappa x}$ 概率流恒为零）；在上述等外势与 $0 < E < V_0$ 条件下，精确透射率为

   $$
   T = \left[1 + \frac{V_0^2\sinh^2(\kappa L)}{4E(V_0 - E)}\right]^{-1}.
   $$

   相对地，布洛赫球内部的直弦 $\rho_s = (1 - s)P_a + sP_b$（$0 \le s \le 1$）表示归一化混合密度算符（当 $0 < s < 1$ 且 $P_a \neq P_b$ 时具有 $Q(\rho_s) > 0$），而非未归一化的空间衰减波函数分量。把隧穿与时间双缝理解为“虚平面 $90^\circ$ 内割弦”属于本书启发式的 `MODEL` 隐喻，其与可观测量之间的定量桥梁由 [§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral) 的复作用量双历史模型与[§36.1.2](ch37-s02-dream-quantum-erasure.md) 共同承担。
:::

::: {.example #ex-ch34-negative-weak-time-and-experiments title="负条件弱时间玩具算例与时间双缝实验边界"}
**证据分级**：含正算符负弱值玩具算例的手工计算，以及四篇已发表实验论文的文献范围核对（未在本书形式化）。

1. **条件弱值为负并不意味着负概率（手工推导）**：设正驻留时间算符为 $D = \operatorname{diag}(1, 2)$，初态为 $|i\rangle = \frac{1}{\sqrt{2}}(1, 1)^{\mathsf{T}}$，后选择末态为 $|f\rangle = \frac{1}{5}(4, -3)^{\mathsf{T}}$。此时无后选择期望值严格为正（$\langle i|D|i\rangle = \frac{3}{2}$），后选择成功概率为 $P = |\langle f|i\rangle|^2 = \frac{1}{50}$，而条件弱值翻负：

   $$
   D_w = \frac{\langle f|D|i\rangle}{\langle f|i\rangle} = \frac{4\cdot 1 + (-3)\cdot 2}{4 - 3} = -2 < 0.
   $$

   等价地，对双历史信号 $A(E) = 4e^{iE\tau_1/\hbar} - 3e^{iE\tau_2/\hbar}$（$\tau_1 = 1, \tau_2 = 2$），相位对能量导数 $\hbar\partial_E\arg A(E)$ 在 $E = 0$ 处同样等于 $-2$。负条件弱时间源于振幅相消加权的条件读数，既非负概率轨迹，也与读取混合态谱分布的 $Q(\rho) \ge 0$ 分属不同运算层级。
2. **实验文献的实际测量范围**：（a）Lindner 等（*Phys. Rev. Lett.* **95**, 040401, 2005，[10.1103/PhysRevLett.95.040401](https://doi.org/10.1103/PhysRevLett.95.040401)）利用约 $500\;\mathrm{as}$ 的光致电离时间窗测得受哪一历史信息调控的角分辨电子能谱干涉条纹；（b）Tirole 等（*Nature Phys.* **19**, 999, 2023，[10.1038/s41567-023-01993-w](https://doi.org/10.1038/s41567-023-01993-w)）以氧化铟锡（ITO）超快时变门控观测光束时间双缝频谱干涉，属于光束时间折射与频谱条纹演示，而非单光子源实验；（c）Rao 等（*Phys. Rev. Lett.* **135**, 066704, 2025，[10.1103/jc1c-k3ll](https://doi.org/10.1103/jc1c-k3ll)）报道时变强耦合磁子模式的时间衍射，不应自动外推为逐个单磁子数据；（d）Angulo 等（*Phys. Rev. Lett.* **136**, 153601, 2026，[10.1103/gjfq-k9dv](https://doi.org/10.1103/gjfq-k9dv)）结合交叉克尔（cross-Kerr）弱探针、相干信号与点击／无点击差分推断，测得光子透射条件下原子激发态的负条件弱时间——该效应超出了单纯脉冲峰值重塑，但仍属条件弱相互作用读数，并非粒子沿时间倒流或额外虚空间轴行进的直接证明（虚平面内割弦仍标为 `MODEL`）。
:::

至此，我们在第十一级阶梯上扶正了颠倒百年的微积分对偶：微观量子力学正是单位球面上不可线性化的极小圆弧微分元（$\delta$），而宏观牛顿惯性、力场折射、弯曲时空、实体体积与热力学熵增，全都是万千量子圆弧经路径积分“以曲拼直、同相成体、漏相化热”后浮现的积分包络（$\int$）。然而，顺着这道路径积分之桥再往前追问一步，整座物理学与几何学的底层本体论还将迎来一场更彻底的回环贯通：既然路径积分能把微观量子圆弧缝合成宏观物理，宇宙难道是一条“从底层砖块单向堆砌上层建筑”的单行道吗？**为什么老子说“反者道之动”，现代物理学又说“万物皆为场”？为什么在几何学里我们总是说“线、面、体”，在矢量分析里总是说“梯度、旋度、散度”，在物理学里又总是说“粒子、波、场”——为什么人类最核心的空间概念与物理概念偏偏总是“三个概念成一组”，既不止于二、也不溢于四？** 先在下方 `ARC//MACRO` 完整交互实验室中亲手推演极小圆弧矢高、费曼—伊藤二次标度、量子三大圆弧特征、“以曲拼直”驻相缝合与微积分跨尺度变焦，随后步入 [§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)，揭开“一弧生三相、万物互为路径积分”的圆满闭环：

::: {.viz src="quantum-arc-macro-integral-sandbox" height="640"}
**量子极小圆弧微分元（$\delta$）与路径积分缝合宏观物理（$\int$）完整交互实验室（`ARC//MACRO`）。** 自由切换“圆弧矢高对费曼—伊藤标度—量子三大圆弧特征—以曲拼直驻相惯性—相位梯度折射力场与熵税—微积分跨尺度对偶变焦”五张实验卡，调节极小圆弧角 $\epsilon$、切片步数 $N$、圆弧束条数 $M$、横向相位偏置梯度 $\beta$ 与跨尺度变焦倍率，同屏核验青色切向步 $\sin\epsilon$、品红圆弧矢高 $1 - \cos\epsilon$ 与球面角超 $\Omega(\epsilon)$、琥珀色驻相宏观轨道及紫色粗粒捏合熵增 $\Delta S_{\mathrm{vN}}$；绿色 `LEAN ✓` 徽章严格对应九条冻结内核定理。
:::

---
