# 终章：在所有的球之外

> *“我们认为是点,其实是线,认为是线,其实是面,认为是面,其实是球,以为看到球了,却被更大的球包裹”*

从序曲推开第一扇门起，我们便沿着一条不断升维的几何阶梯向上攀登：把孤立的**点**还原为成对比较的**线**（内积投影 $\mathbf{u}\cdot\mathbf{v}$），把静态的**线**展开为带定向手性的**面**（外积双向量 $\mathbf{u}\wedge\mathbf{v}$），把局部的**面**合拢为包裹相位的**球**（布洛赫球面 $S^2$ 与旋量覆盖流形 $S^3$）。然而，当我们穿过洛伦兹光锥、张量网络极小割、素数欧拉乘积、四元数范数锁与余弦自指不动点，回望整座八部曲大厦时，一个更深层的几何真相浮出水面：**在任何固定形式系统内部，我们以为已经彻底合拢的“球”，其实永远只是一座由有限分片拼接而成的凸多面体近似；而在每一道接缝与每一个不动点处，都有一个不可抹平的余项，正指向包裹它的“更大的球”。**

---

## 多面体近似与不可抹平的几何余项 {#sec-coda-polyhedral-remainder}

为什么人类与计算机在任何有限公理、有限门集、有限素数截断或有限阶泰勒展开中构造出的几何体，永远无法在自身内部实现绝对无痕的球面闭合？整本书在多个不同数学侧面反复遭遇了同一个结构性障碍——**多面体分片近似与光滑球面曲率之间的拓扑与算术余项**。我们先将刻画多面体角亏、偶维毛球旋涡与平行化球面的三项经典离散几何与代数拓扑定理归入文献注记：

::: {.remark #rem-coda-polyhedral-topology-literature title="笛卡尔多面体角亏定理、毛球定理与亚当斯平行化球面定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下三项关于凸多面体离散曲率与球面切丛拓扑的经典定理均属外部数学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中（与第 21 章文献注记 [@rem-hairy-ball-adams-literature] 前后呼应）：

1. **笛卡尔角亏定理与 $12 \times 60^\circ = 720^\circ = 4\pi$ 离散曲率守恒（R. Descartes；C. F. Gauss；O. Bonnet）**：用正三角形面片逼近二维球面 $S^2$ 时，正二十面体（$V = 12$ 个顶点、$E = 30$ 条棱、$F = 20$ 个面）在每个顶点处汇合 $5$ 个正三角形，内角和为 $5 \times 60^\circ = 300^\circ < 360^\circ$，留下角亏 $\delta_v = 360^\circ - 300^\circ = 60^\circ = \pi/3$；更一般地，任意与 $S^2$ 同胚的凸多面体各顶点角亏之和恒锁定为欧拉示性数不变量：

   $$
   \sum_{v} \delta_v = 4\pi = 2\pi\,\chi(S^2) \qquad \bigl(\text{正二十面体特例：}\sum_{v=1}^{12} \delta_v = 12 \times 60^\circ = 720^\circ = 4\pi\bigr).
   $$

   无论将多面体剖分得何等细密（如测地线穹顶的千万级三角网格），总角亏 $4\pi$ 永不消失，只是从 $12$ 个锥顶分散到无数微小折痕之中。
2. **偶维球面的庞加莱—布劳威尔毛球定理（H. Poincaré, 1885；L. E. J. Brouwer, 1912）**：偶维球面 $S^{2n}$ 的欧拉示性数为 $\chi(S^{2n}) = 2 \neq 0$，其上任何连续切向量场必在至少一点处为零（拓扑旋涡）；等价地，$S^{2n}$ 上的任何连续自映射无法同时避开不动点 $f(x) = x$ 与对径点 $f(x) = -x$。相反，奇维球面满足 $\chi(S^{2n-1}) = 0$，恒容许由辛配对 $(x_1, x_2, \dots, x_{2n}) \mapsto (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$ 给出的处处非零连续切向量场。
3. **亚当斯平行化球面定理（J. F. Adams, *Ann. of Math.* **72**, 20–104, 1960）**：切丛全局完全平行化（parallelizable）的球面仅有四个：

   $$
   S^0,\quad S^1,\quad S^3,\quad S^7,
   $$

   对应实数 $\mathbb{R}$、复数 $\mathbb{C}$、四元数 $\mathbb{H}$ 与八元数 $\mathbb{O}$ 四大赋范可除代数。二维布洛赫球面 $S^2$ 上梳不平的贝里相位奇点，在几何模型上正是平行化三维球面 $S^3 \cong \mathrm{SU}(2)$ 经霍普夫纤维化 $S^1 \hookrightarrow S^3 \to S^2$ 投下的底空间影子。
:::

对照 [@rem-coda-polyhedral-topology-literature] 揭示的拓扑余项，在进入第八部的跨领域合拢之前，“有限多面体逼近光滑球面所留下的非零接缝”已经在前七部中以五种精确的数学形态反复重现：
- **泰勒多项式截断余项**：在第六部第 24 章中，有限阶交错多项式 $\sum_{k=0}^{N-1} (-1)^k \theta^{2k}/(2k)!$ 只是对余弦曲线的分片代数逼近，截断尾项标志着有限次代数运算与超越弧长之间的距离（见 [@rem-banach-dottie-hairy-ball-literature]）；
- **欧拉乘积素数尾余项**：在第 22 章中，前 $P$ 个素数张成的有限正交盒子 $\prod_{p \le P} (1 - p^{-s})^{-1}$ 与黎曼 $\zeta(s)$ 之间隔着无穷素数尾 $\sum_{n \in \mathcal{S}_P^c} n^{-s}$，而光滑尺度之外的振荡分布引向临界线 $\operatorname{Re}(s) = 1/2$ 上的开放猜想边界；
- **双轴有限门字与群换位子螺旋**：在第四部第 16 章与第七部第 27 章中，有限门集生成的离散旋转字在 $\mathrm{SU}(2)$ 流形上织出多面体网格，高阶逼近依赖非交换群换位子 $ABA^{-1}B^{-1}$ 张开的二阶双向量面积；
- **全息极小割分片锥与电路深度下界**：在第五部第 19–20 章中，离散桥图量子流守恒 $\operatorname{QMaxFlow}(a,b,c,d) = \operatorname{QMinCut}(a,b,c,d) = \min(3ac, \min(ad, bc))$ 与可积电路精确深度 $\lfloor N/(\kappa+1)\rfloor + 1$ 在参数空间中切出分片线性多面体锥，锥面交界处的折痕直接对应纠缠瓶颈的相变；
- **康托尔—劳维尔对角线与自指不动点逃逸**：在第 21 章与第 24 章中，任何试图把观测算子空间 $A \to Y$ 完全压缩进载体 $A$ 的形式系统，都会被对角线算子 $g(a) = \alpha(f(a)(a))$ 刺穿；当测量算子最终指向自身（$\psi = \psi(\psi)$），系统便从静态坐标球跃迁至动态自指的更外层球。

---


在 **[第 29 章](ch29-timeless-causality-and-gram-space.md)** 与 **[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)** 中，我们已经看到这道“多面体分片近似与光滑球面之间的非零余项”如何在算术、时间、计算复杂性与流体力学中掀起两场壮丽的交响：
- **从 $\pm 1$ 佩尔接缝到无时间因果晶体（[第 29 章](ch29-timeless-causality-and-gram-space.md)）**：勾股定理的双向量手性对消与希帕索斯的佩尔余项 $m^2 - 2n^2 = \pm 1$ 驱动了从有理数到 Dottie 自指不动点 $\cos\theta^* = \theta^*$ 的四级数系突围，并结合文献注记 [@rem-ch29-pell-primes-hilbert-literature]、[@rem-ch29-elliptic-torus-literature]、[@rem-ch29-hasse-gauss-literature] 与 [@rem-ch29-arithmetic-geometry-literature] 中的 $4k\pm 1$ 素数分裂及椭圆曲线环面（$\chi = 0$）呈现为 $S^3 \cong \mathrm{SU}(2)$ 上的佐藤—泰特余弦投影；而 Gram 矩阵半正定刚性 $\det G \ge 0$ 则在与 [@rem-ch29-wheeler-dewitt-page-wootters-literature] 无时间图景呼应的同时，为有限观察者撑开了二面角 $\phi$ 的因果相容椭圆体。
- **从“$P$ 是场，$NP$ 是线”到 ETH 张量缝隙与纳维—斯托克斯涡丝（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）**：场内有限观察者受 $90^\circ$ 正交视界与局部 Gram 盲区阻隔而面对 $P \neq NP$（[@conj-p-neq-np]）的防火墙；文献注记 [@rem-ch30-eth-subexponential-literature] 所记述的三体局部切面 $\frac{\log\log n}{\sqrt{\log n}}$ 渐近秩亏损缝隙虽在 $n \to \infty$ 极限下冲击指数时间假设（ETH），其超越局部搜索的交叉点（$c=1$ 示意下 $n \approx 2^{558} \gg 10^{80}$）却远在可观测宇宙视界之外；而在连续流体力学中，二次平流投影无精确闭合定理（[@thm-coda-quadratic-advection-no-closure]）与文献注记 [@rem-ch30-navier-stokes-forced-literature]、[@rem-ch30-tao-arnold-literature] 展示了同一正交几何张力的连续统化身。

现在，站在全书最后的收官高地上，让我们把“近似之球的几何余项”与“无时间场中的有限观察者”合拢为最后一个关于人自身的追问：**当一位有限观察者一轮又一轮地在无时间晶体中经历遗忘初始化并重新选点时，是什么在定义“同一个灵魂”？为什么现实中的历史遗迹会成为跨越千年的空间吸引子，让同一个灵魂在似曾相识（Déjà vu）的震颤中一轮又一轮走过熟悉的地方？**

---

## 历史遗迹作为空间吸引子：驻相曲率盆地、洛伦兹分形维数 $2.06$ 与似曾相识的跨轮次共振 {#sec-coda-spatial-attractors-deja-vu}

> **作者原话**：“现实的历史遗迹实际上都是空间吸引子, 同一个灵魂一轮又一轮的走过自己熟悉的地方...”

在线性时间的日常错觉里，人们习惯把金字塔、古神庙、石桥或断壁残垣看作“过去留下的残骸”，以为它们只是侥幸尚未被岁月风化殆尽的旧石头。然而，一旦切回 **[第 29 章](ch29-timeless-causality-and-gram-space.md)** 建立的全局无时间正交场（$H\mathbf{\Psi} = 0$），因果箭头便彻底倒转过来：**它们并非偶然幸存的废墟，而是全局静态场投射在三维空间截面上的高密度不动点——即“空间吸引子（Spatial Attractors，`MODEL`）”。**

把这一直觉放进我们已经建立的有限观察者、遗忘初始化与多面体近似之球的几何框架中，为什么“同一个灵魂会一轮又一轮走过熟悉的地方”，展现出三层严丝合缝的动力学与拓扑机制：

### 一、 为什么历史遗迹是“空间吸引子”？（驻相不灭与曲率盆地） {#sec-coda-ruins-curvature-basin}

在 **[第 19 章](ch19-tensor-networks-and-holography.md)** 的全息张量网络几何（桥图最小割与文献注记 [@rem-ryu-takayanagi-literature]）中，宏观物理空间可被诠释为由微观量子态的外积纠缠撑开的面积网。普通而琐碎的日常事件，其正反手性的旋转面积（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$）在漫长的热力学涨落中相互抵消、归于平寂；唯独那些对齐了山川测地线、天文倾角、勾股比例，或是凝聚了数千年人类高密度注意力内积投影的坐标，在相空间模型里挖出了深邃的**曲率势阱——吸引子盆地（Basin of Attraction，`MODEL`）**。

它们历经战火与熵增依然伫立在原地，甚至毁而复建、层层叠压（如特洛伊九层古城或长安叠城），并不只是因为石材坚固，而是因为在无时间几何模型中，那个空间坐标对应全局时间场里的**拓扑驻点**。当有限观察者在格拉姆因果相容空间（$\det G > 0$）里一步步选点时，周围流场的曲率天然向这些驻点倾斜——所有看似偶然的旅途，都会在不知不觉中滑向同一个盆地中心。

### 二、 遗忘清空了“表层记事”，却擦不掉灵魂的“内禀倾角” {#sec-coda-forgetting-intrinsic-inclination}

这就引出了一个最深邃的几何追问：我们在第 29 章看到，有限观察者要想拥有正体积的因果相容空间（$\det G > 0$）以获得自由选择权，每一次生命的初始化（诞生）都必须伴随着一次**历史锚点的截断与清空（遗忘）**。既然前世具体的名字、日期与线性叙事记忆都被清零了，凭什么说下一轮走回这座遗迹的，依然是“同一个灵魂”？

在本书的自指几何模型（`MODEL`）中，答案藏在自指方程 $\psi = \psi(\psi)$ 的算子结构里：
- **被遗忘擦除的**，只是上一轮落在一维尺子上的**局部粒子刻度序列**（即表层的情节记忆 Episodic Memory，名词 `量 liàng`）；
- **未被擦除的**，是观察者作为丈量算子 $\psi(\cdot)$ 本身的**内禀几何参数**（动词 `量 liáng` 的固有倾角）——他在面对相容空间做两子比较时特有的正交偏转角、审美共振比与拓扑手性偏好！

在将这一哲学意象展开为分形叶层上的跨轮次回归之前，我们先将所引用的洛伦兹奇异吸引子、SRB 不变测度与庞加莱回归三项经典连续动力系统文献结果归入文献注记：

::: {.remark #rem-coda-lorenz-srb-literature title="洛伦兹奇异吸引子、卡普兰—约克维数估计、SRB 物理测度与庞加莱回归定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节借以类比“遗忘表层轨迹但保留算子参数”的三项连续动力系统与遍历论经典结论均属外部数学与计算物理文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **洛伦兹方程、恒负相空间体积散度与数值卡普兰—约克维数估计（E. N. Lorenz, *J. Atmos. Sci.* **20**, 130–141, 1963；J. L. Kaplan & J. A. Yorke, 1979）**：三维自治常微分方程组

   $$
   \begin{cases}
   \dot{x} = \sigma(y - x), \\
   \dot{y} = x(\rho - z) - y, \\
   \dot{z} = xy - \beta z
   \end{cases}
   $$

   在经典参数 $(\sigma, \rho, \beta) = (10, 28, 8/3)$ 下具有恒负的相空间散度 $\nabla\cdot\mathbf{F} = -(\sigma + 1 + \beta) = -\frac{41}{3} < 0$，使有界相空间体积元按 $\operatorname{vol}(\Omega_t) = \operatorname{vol}(\Omega_0)e^{-41t/3}$ 指数收缩至勒贝格零测集；数值李雅普诺夫指数谱 $(\lambda_1 \approx 0.9056,\; \lambda_2 = 0,\; \lambda_3 \approx -14.5723)$ 给出的卡普兰—约克（Lyapunov）维数估计为 $D_{\mathrm{KY}} = 2 + \frac{\lambda_1 + \lambda_2}{|\lambda_3|} \approx 2.06$。
2. **洛伦兹奇异吸引子的严格存在性与遍历 SRB 物理测度（W. Tucker, *C. R. Acad. Sci. Paris* **328**, 1197–1202, 1999；S. Luzzatto, I. Melbourne & F. Pugh, *Commun. Math. Phys.* **260**, 393–401, 2005）**：经典参数下的洛伦兹方程拥有紧致鲁棒奇异吸引子，且支撑唯一的遍历西奈—吕埃勒—鲍恩（Sinai–Ruelle–Bowen, SRB）物理不变概率测度 $\mu_{\mathrm{SRB}}$，使得吸引盆内勒贝格几乎所有初值的向前时间平均收敛于 $\mu_{\mathrm{SRB}}$ 积分。
3. **庞加莱回归定理与自治常微分方程轨道不相交性（H. Poincaré, 1890；皮卡—林德洛夫解唯一性定理）**：在保测遍历系统 $(\Lambda, \mu_{\mathrm{SRB}})$ 上，对任意满足 $\mu_{\mathrm{SRB}}\bigl(\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})\bigr) > 0$ 的开邻域，$\mu_{\mathrm{SRB}}$-几乎所有吸引子轨迹均无穷多次重返 $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$；同时由自治光滑常微分方程解的唯一性，相异几何轨道互不相交，且每条非周期轨道对时间 $t \in \mathbb{R}$ 严格单射（永不自交），每次重返 $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$ 均穿过互不重合的轨道弧段。
:::

### 三、 似曾相识（Déjà vu）的几何诠释：分形横截结构与跨轮次内积共振 {#sec-coda-deja-vu-fractal-dimension}

在本书的哲学与几何诠释（`MODEL`）中，对照 [@rem-coda-lorenz-srb-literature] 所刻画的动力系统图景——哪怕将上一轮的表层轨迹历史抹除，只要内禀耦合参数 $(\sigma, \rho, \beta)$ 不变且新初值落在吸引盆内，世界线便会重返同一双涡核吸引子，并沿着介于二维曲面与三维体积之间的分形横截叶层（数值维数估计约为 $2.06$）盘旋——“宿命重逢”与“自由选点”便在同一几何意象下并行不悖：
1. **倘若轨迹退化为 $1$ 维闭合周期轨（$D = 1$）**：观察者就会困在机械重复的死循环里——每一轮在同一相对相位踩中同一个点，丧失横截自由余量（$\det G = 0$）；
2. **在具有分形横截叶层的吸引子类比（[@rem-coda-lorenz-srb-literature]）中**：无穷次重返开邻域 $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$ 与非周期轨永不自交同时成立——观察者一次次重返熟悉的吸引子坐标邻域，却在每一次重返时踏上与此前互不重合的新叶层；
3. **“似曾相识（Déjà vu）”的跨轮次内积共振模型（`MODEL`）**：
   将这一图景映射为作者的几何隐喻：当观察者在某座古迹台阶或转角突然停住脚步，心中涌起*“我一定在什么时候来过这里”*的悸动时，若吸引子盆地中的局部几何将同一观察者在不同轮次的注意力方向引向几乎平行的局部切方向（方向夹角 $\delta\theta \to 0$），则当下的注意力态 $\mathbf{\Psi}^{(k+1)}$ 与留在同一空间吸引子邻域内的前轮印记 $\mathbf{\Psi}^{(k)}$ 做**成对内积投影（两子丈量）**时，就会出现

   $$
   \mathbf{\Psi}^{(k)} \cdot \mathbf{\Psi}^{(k+1)} = \cos\delta\theta \longrightarrow 1 \qquad (\delta\theta \to 0).
   $$

   在这一诠释模型（`MODEL`）中，所谓“似曾相识”，正是同一观察者算子在不同轮次划过同一座空间吸引子邻域、局部注意力方向趋于共线（$\delta\theta \to 0$）时触发的**高幅值内积共振**。

---

## trureturing 的“黄金切投”形式原语与灵魂—遗迹吸引子的几何诠释 {#sec-coda-trureturing-golden-cut-observer}

> **作者原话**：“观察者我们在trureturing有明确的定义, 我们又讨论了灵魂与历史遗迹吸引子的关系”

如果说洛伦兹奇异吸引子为我们提供了连续动力系统的几何类比，那么当我们进一步对照本书底层所钉的 **`trureturing` Lean 4 形式化库**（`D5/S1/Scale/MinkowskiModelSet`、`D5/S1/Deficit/ModelSet/GoldenCutAndProject`、`D5/S1/Deficit/Beatty/GoldenObserverRoute`、`D5/S1/Scale/Fibonacci`、`D5/S3/Observer/GoldenCoding/ZeckendorfRealThread` 与 `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns`）时，我们可以将 `trureturing` 中严格验证的**黄金切投模型集与齐肯多夫观察者编码定理（`LEAN ✓`）**，与上述关于**灵魂、遗忘与历史遗迹空间吸引子的哲学诠释（`MODEL`）**建立起清晰透明的对应关系。

### 一、 `trureturing` 中的黄金切投模型集与观察者路由定理（`LEAN ✓`） {#sec-coda-trureturing-observer-def}

在 `trureturing` 的形式化架构中，与“观察者编码（`Observer/GoldenCoding`）”及“黄金赤字模型集（`Deficit/ModelSet`）”相关的核心数学原语由高维周期格的**切投（Cut-and-Project）构造**与**齐肯多夫—Beatty 编码**给出：

1. **一维内核验证定理：闵可夫斯基格、$\beta$-展开模型集与全窗口 Delone 准晶集（`LEAN ✓`）**：
   在第 24 章中，黄金分割比 $\varphi = \frac{1+\sqrt{5}}{2}$ 被证明为自指映射 $x \mapsto 1 + 1/x$ 在正实轴上的唯一不动点（[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)）。在 `trureturing` 的 `MinkowskiModelSet`、`GoldenCutAndProject` 与 `GoldenModelSetDelone` 模块中，严格区分并锁定了两层集合：
   - **闵可夫斯基嵌入与全窗口切投 Delone 集 $\operatorname{modelSet}(\operatorname{goldenWindow})$**：黄金整数环 $\mathbb{Z}[\varphi]$（`GoldenInt`）通过单射同态 [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)

     $$
     \operatorname{minkowskiEmbedding}(a + b\varphi) = \bigl(\underbrace{\operatorname{embedding}(a + b\varphi)}_{\pi_\parallel(z) \in E_\parallel},\; \underbrace{\operatorname{embedding}(\operatorname{conj}(a + b\varphi))}_{\pi_\perp(z) \in E_\perp}\bigr) \in \mathbb{R} \times \mathbb{R}
     $$

     映射为二维实平面上的加法子群格点 `goldenLattice`。以单位体积 $\operatorname{vol}(\operatorname{goldenWindow}) = 1$（[`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)）的闭区间窗口

     $$
     \operatorname{goldenWindow} = [\varphi - 2,\; \varphi - 1] = [-\varphi^{-2},\; \varphi^{-1}] \subset E_\perp
     $$

     筛选出的全窗口切投模型集 $\operatorname{modelSet}(\operatorname{goldenWindow}) = \{y \in \mathbb{R} \mid \exists x \in \mathrm{GoldenInt},\, \operatorname{embedding}(x) = y \wedge \operatorname{embedding}(\operatorname{conj} x) \in \operatorname{goldenWindow}\}$（同构于 `goldenCutAndProjectSet`），由 [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone) 证明构成 $\mathbb{R}$ 上**装球半径为 $1/2$、覆盖半径为 $3$ 的 Delone 集**；其离散分离性源自**共轭范数互反分离定理** [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)：对任意相异黄金整数 $u \neq v \in \mathrm{GoldenInt}$ 与实数上界 $B$，只要内部共轭差满足 $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$，物理投影差必满足 $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$。
   - **自然数黄金展开模型集 `goldenModelSet` 与 Beatty 观察者路由**：自然数黄金展开序列 $\operatorname{betaGolden} : \mathbb{N} \to \mathrm{GoldenInt}$ 的值域 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$，其物理嵌入像被证明为全窗口切投集的子集 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)，注：逆包含不成立，因 $-\varphi$ 落在窗口右端点但 $b = -1 < 0$）；`goldenModelSet` 自身不相交地自相似分解为 $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$（[`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)），其前 $n$ 项前缀集 `goldenPrefix n` 的渐近计数密度严格收敛于 $1/\sqrt{5}$（[`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)），且实轴观察者路由序列 $\beta(v) = \sqrt{5}\,v + \operatorname{remainder}(v)$ 满足内部余项 $\operatorname{remainder}(v) \in (\varphi - 2, \varphi - 1]$、相邻步长 $\beta(v+1) - \beta(v) \in \{\varphi, \varphi^2\}$ 的 Beatty 路由定律（[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)）。
2. **高维准晶切投模型与内部窗口相位平移的哲学参数化（`MODEL`）**：
   将上述一维内核定理推广到三维物理空间时（其六维母格正二十面体准晶文献背景详列于下文文献注记 [@rem-coda-quasicrystal-empire-literature]），在本书的跨学科几何诠释模型（`MODEL`）中，我们将全局无时间背景比拟为高维母格 $\mathbb{Z}^D \subset E_\parallel \oplus E_\perp$，并将一位具体观察者的内禀视角参数化为黄金无理倾角 $\varphi$ 与**内部正交窗口平移相位 $u \in E_\perp$**，通过平移接受窗 $W + u \subset E_\perp$ 在物理空间 $E_\parallel$ 中切出模型集 $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^D,\; \pi_\perp(z) \in W + u\}$。

3. **齐肯多夫无相邻 `11` 语言、非负实数编码线程单射与 Beatty 坐标纤维容量（`LEAN ✓`）**：
   在 `trureturing` 的离散编码模块中：
   - 二进制齐肯多夫自动机 `binaryZeckendorfBase` 接受字 $w \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当 $w$ 不含相邻的 `11`（`NoAdjacentOnes w`，[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)）；
   - 对任意**非负实数** $x \in \mathbb{R}_{\ge 0}$（`NNReal`），由全尺度黄金幂自然数下取整 $\operatorname{goldenQuantization}(N, x) = \lfloor \varphi^N x\rfloor_+$ 的典范齐肯多夫编码构成的线程映射 $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ 严格单射（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）；
   - 同时，对任意正整数第一坐标 $a \ge 1$，Beatty 第一坐标原像纤维 $\operatorname{goldenFiber}(a) = \{v \in \mathbb{N} \mid \operatorname{fiberA}(v) = a\}$ 的基数严格属于 $\{4, 5\}$（[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)），而对任意非负整数第二坐标 $b \ge 0$，对偶第二坐标原像纤维 $\operatorname{goldenDualFiber}(b) = \{v \in \mathbb{N} \mid \operatorname{fiberB}(v) = b\}$ 的基数严格属于 $\{2, 3\}$（[`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)）。
   在本书的认识论诠释模型（`MODEL`）中，我们将“有理斜率扫描 $\to$ 坐标原像纤维分割 $\to$ 消除相邻 `11` 的齐肯多夫规范化”诠释为有限观察者体验到的主观时间步进。

### 二、 哲学诠释模型（`MODEL`）：什么是“同一个灵魂”？什么是“单次生命与遗忘”？ {#sec-coda-trureturing-soul-vs-lifetime}

借用上述 `trureturing` 切投模型集与编码线程的数学结构，我们可以为第 29 章与上一节关于“灵魂内禀倾角”与“遗忘清空表层记事”的哲学思考建立一套清晰的几何诠释模型（`MODEL`）：

1. **“同一个灵魂”（`MODEL`）$\leftrightarrow$ 不变的内部正交窗口相位 $u \in E_\perp$ 与黄金倾角 $\varphi$**：
   在这一概念映射中，标识“同一个观察者/灵魂”的不是三维物理切片 $E_\parallel^3$ 中的瞬时位置，而是正交内空间 $E_\perp$ 中的**窗口相位中心 $u$**（接受窗 $W + u$ 的平移锚点）：
   - 不同相位 $u \neq u'$ 的切投窗口筛选出局部相差**相子翻转（Phason Flips）**的准晶点集 $\Lambda_u$ 与 $\Lambda_{u'}$；
   - 与此同时，在紧致阿贝尔群与环面动力学层面，`trureturing` 的**环面闭子群轨道均匀分布定理** [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) 严格证明：对有限维环面 $I \to \mathrm{Circle}$ 中的任意元素 $g$，记 $G = \overline{\langle g\rangle}$ 为由 $g$ 生成的循环子群的紧致拓扑闭包、$\mu$ 为 $G$ 上的归一化哈尔（Haar）概率测度，则对 $G$ 上任意连续复值可观测量 $f \in C(G, \mathbb{C})$，轨道遍历平均 $\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1})$ 当 $N \to \infty$ 时严格收敛于哈尔测度积分 $\int_G f\,d\mu$（当 $g$ 的频率分量在 $\mathbb{Z}$ 上与 $1$ 线性无关时，$G$ 即为整个环面；此外，[`golden_ergodic_bridge`](lean:D5/S0/Tower/ErgodicBridge/Golden.golden_ergodic_bridge) 证明对任意 $Q \ge 2$ 及名称包壳 `goldenNameHull Q` 中的实数 $x$，其跨层级幸存量下极限 $\liminf_{\mathrm{level}\to\infty} \operatorname{goldenSurvivor}(\mathrm{level}, x)$ 必等于某个黄金单位幸存态的轨道下值）。在我们的哲学诠释（`MODEL`）中，这象征着不同观察者虽拥有各自的局部视角，却在遍历平均下共享统一的宏观统计规律。
2. **“单次有限生命与遗忘初始化”（`MODEL`）$\leftrightarrow$ 齐肯多夫高阶层级截断与有理扫描阶数 $k$ 的重置**：
   在哲学模型中，单次有限生命好比只将编码线程 $\operatorname{zeckendorfRealThread}(x)(N)$ 或斐波那契有理斜率 $F_{k+1}/F_k$ 推进到有限阶数 $N, k \le K_{\max}$。随着历史约束累积，相容空间趋于饱和；而**诞生与遗忘初始化**则被诠释为**截断高阶齐肯多夫层级并重置扫描阶数 $k$**——抹去上一轮的高阶表层细节（名词 `量 liàng`），但保持内部窗口相位锚点 $u \in E_\perp$ 与黄金倾角 $\varphi$（动词 `量 liáng` 的内禀参数）不变。

### 三、 接受窗内部裕度与空间吸引盆地的几何诠释 {#sec-coda-trureturing-rhombic-triacontahedron-empire}

为什么在跨轮次诠释模型中，普通事件容易随扫描阶数更迭而消散，而特定的历史遗迹坐标却能长期存续并吸引观察者重访？我们先将本节与下一节对照引用的三维正二十面体准晶接受窗、一致重复性与康威“帝国效应”、以及比内公式有理斜率渐近误差三项经典文献结论集中归入文献注记：

::: {.remark #rem-coda-quasicrystal-empire-literature title="正二十面体准晶菱形三十面体接受窗、康威帝国效应与比内斜率渐近公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下三项关于高维切投准晶几何与斐波那契有理逼近渐近率的经典结论均属外部数学与晶体学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中（本章经 Lean 4 内核验证的切投与编码结论严格限定于 [@thm-coda-golden-cut-observer-cassini] 所列的一维 `GoldenInt` 模型集、齐肯多夫线程与环面有界回归定理）：

1. **六维正二十面体切投模型与菱形三十面体接受窗（P. Kramer & R. Neri, *Acta Cryst. A* **40**, 580–587, 1984；M. Duneau & A. Katz, *Phys. Rev. Lett.* **54**, 2688–2691, 1985）**：将六维超立方整数格 $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$ 沿正二十面体不可约表示正交分解为三维物理空间 $E_\parallel^3$ 与三维内部空间 $E_\perp^3$ 时，单位超立方体投影到 $E_\perp^3$ 形成的标准接受窗 $W$ 是一座**菱形三十面体（Rhombic Triacontahedron）**，由 **$30$ 个黄金菱形面、$60$ 条棱与 $32$ 个顶点**（含分布在 **$6$ 条五次对称轴**上的 $12$ 个五重顶点与分布在 $10$ 条三次对称轴上的 $20$ 个三重顶点）围成，对应三维切投准晶点集 $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^6,\; \pi_\perp(z) \in W + u\}$。
2. **规则模型集的一致重复性与康威“帝国效应”（Y. Meyer, *Algebraic Numbers and Harmonic Analysis*, 1972；B. Grünbaum & G. C. Shephard, *Tilings and Patterns*, 1987）**：规则切投模型集具有**一致重复性（Uniform Repetitivity）**，即任意给定半径的局部有限构型都在有界距离内反复出现；同时，固定一处局部拼砖构型（记其母格提升为有限集 $F \subset \mathbb{Z}^6$，$\pi_\parallel(F) \subset \Lambda_u$）会将容许内部相位 $u'$ 限制在平移窗口交集 $P_F := \bigcap_{x \in F} (\pi_\perp(x) - W) \subset E_\perp^3$ 内，使一切满足 $\pi_\perp(z) \in W_{\mathrm{emp}}(F) := \bigcap_{u' \in P_F} (W + u')$ 的远方母格点 $z$ 在所有兼容拼砖中被非局域地强制出现（局部构型 $F$ 的**康威帝国 Conway's Empire**）。
3. **斐波那契比内公式与有理斜率渐近误差（J. P. M. Binet, 1843；经典连分数渐近论）**：由比内公式 $F_k = \frac{\varphi^k - \bar{\varphi}^k}{\sqrt{5}}$（其中 $\bar{\varphi} = 1 - \varphi = -\varphi^{-1}$）与恒等式 $F_{k+1} - \varphi F_k = \bar{\varphi}^k = (-1)^k \varphi^{-k}$，对一切正整数 $k \ge 1$，斐波那契有理斜率对黄金分割 $\varphi$ 的逼近误差满足

   $$
   \left|\frac{F_{k+1}}{F_k} - \varphi\right| = \frac{\varphi^{-k}}{F_k} \sim \frac{\sqrt{5}}{\varphi^{2k}} \qquad (k \ge 1,\; k \to \infty).
   $$
:::

结合 [@rem-coda-quasicrystal-empire-literature] 的窗口几何与 `trureturing` 的一维内核定理，我们的哲学与几何诠释模型（`MODEL`）展现出三层清晰对应：

1. **物理五次顶点角亏与内部接受窗五重顶点的跨空间呼应（`MODEL`）**：
   对照 [@rem-coda-polyhedral-topology-literature] 第 1 条与 [@rem-coda-quasicrystal-empire-literature] 第 1 条：物理空间正二十面体的 $12$ 个五边形顶点（对应 $6$ 条五次轴与总角亏 $4\pi$），在内部空间 $E_\perp^3$ 的菱形三十面体接受窗 $W$ 中恰好呼应那 $12$ 个五重顶点！
2. **窗口边界附近的相子翻转敏感性 vs. 窗口深处（近中心点）的有限扰动鲁棒性**：
   对于内部投影落在接受窗开内部 $\operatorname{int}(W + u)$ 的母格点 $z$，记其到窗口边界 $\partial(W + u)$ 的欧氏安全裕度为 $d_{\partial}(z) := \operatorname{dist}\bigl(\pi_\perp(z),\, \partial(W + u)\bigr) > 0$：
   - **贴近窗口边界的点（$d_{\partial}(z) \ll 1$）**：当 $\pi_\perp(z)$ 紧贴边界 $\partial(W + u)$ 时，幅值超过 $d_{\partial}(z)$ 且朝向边界外侧的内部相位微扰或有理斜率逼近误差即可使 $\pi_\perp(z)$ 越过边界，导致物理空间中的对应格点发生**相子翻转（Phason Flip）**而移位或消失（作为形式层面的结构呼应，`trureturing` 在黄金幸存塔中证明了严格永久幸存集为空集 [`golden_strict_permanent_set_eq_empty`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_strict_permanent_set_eq_empty)，而已知的闭预周期载体则构成闭永久幸存集的子集 [`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset)）；
   - **靠近窗口靶心的深谷点（$\|\pi_\perp(z_{\mathrm{ruin}}) - u\| \ll 1$，从而拥有大边界裕度 $d_{\partial}(z_{\mathrm{ruin}}) \approx r_{\mathrm{in}}(W)$）**：反之，若格点 $z_{\mathrm{ruin}}$ 的内部投影紧靠窗口中心 $u$，则它距离边界 $\partial(W+u)$ 拥有接近内切球半径 $r_{\mathrm{in}}(W)$ 的最大容错裕度——对于一切范数**严格小于** $d_{\partial}(z_{\mathrm{ruin}})$ 的内部相子扰动或高阶有理逼近误差，该格点都稳居窗口开内部 $\operatorname{int}(W + u)$ 而不发生相子翻转！同时，在一维黄金格点中，由共轭范数互反分离定理 [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)，任意两个同时落在中心直径 $B$ 内的相异黄金整数 $u \neq v$（即 $|\pi_\perp(u) - \pi_\perp(v)| \le B$），其在物理空间的间距必满足 $|\pi_\parallel(u) - \pi_\parallel(v)| \ge 1/B$。在本书的几何诠释模型（`MODEL`）中，我们将现实中历经岁月洗礼而反复重建的历史遗迹，诠释为这类靠近内部窗口靶心、具有最大边界裕度 $d_{\partial}$ 的高对称格点。
3. **交集帝国窗 $W_{\mathrm{emp}}(F)$ 与空间吸引盆地的几何类比（`MODEL`）**：
   对照 [@rem-coda-quasicrystal-empire-literature] 第 2 条，在我们的哲学模型（`MODEL`）中，局部高对称构型 $F$ 收紧容许相位集 $P_F$ 并通过交集窗 $W_{\mathrm{emp}}(F)$ 非局域约束远方格点的几何性质，恰可类比为历史遗迹在相容空间中形成的吸引盆地。

### 四、 卡西尼恒等式 $(-1)^{n+1}$ 接缝与环面观测窗有界间隙回归 {#sec-coda-trureturing-cassini-torus-return}

最后，让我们用 `trureturing` 中已验证的**斐波那契—卡西尼恒等式**与**环面观测窗有界回归定理**（`LEAN ✓`），精确刻画离散序列的交替接缝与回归性质，并说明其与“跨轮次似曾相识”（`MODEL`）的对应关系：

1. **斐波那契—卡西尼恒等式 $(-1)^{n+1} = \pm 1$（`LEAN ✓`）**：
   根据 `trureturing` 由黄金单位幂范数 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$ 机械证明的**斐波那契—卡西尼恒等式** [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)（以及黄金位移范数符号由齐肯多夫展开最低位索引奇偶性决定的定理 [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)），对一切 $k \in \mathbb{N}$ 恒有：

   $$
   F_k\,F_{k+2} - F_{k+1}^2 = (-1)^{k+1} = \pm 1.
   $$

   请看卡西尼恒等式右端的 **$(-1)^{k+1} = \pm 1$**（配合 [@rem-coda-quasicrystal-empire-literature] 第 3 条记述的有理斜率收敛背景）：这与第 29 章中希帕索斯的佩尔余项 $m^2 - 2n^2 = \pm 1$、奇素数的 $4k \pm 1$ 二象性以及同余数椭圆曲线的支点 $0, \pm 1$，同样展现了离散整数网格逼近无理方向时不可消除的 **$\pm 1$ 最小单位范数接缝**！
2. **环面观测窗有界间隙回归定理（[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)，`LEAN ✓`）**：
   `trureturing` 在一般紧致环面动力系统中严格证明：设 $I$ 为有限指标集，$g : I \to \mathrm{Circle}$ 为环面元素，$G = \overline{\langle g\rangle}$ 为其生成的紧致闭子群，$\mu$ 为 $G$ 上的哈尔概率测度，$a = \langle g, \dots\rangle \in G$。对 $G$ 上任意连续实值观测函数 $h \in C(G, \mathbb{R})$ 及满足渐近误差归零 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 的任意实测序列 $e : \mathbb{N} \to \mathbb{R}$：
   - 推前测度 $\operatorname{Measure.map} h\,\mu$ 的拓扑支集严格等于连续像集 $\operatorname{range}(h)$；
   - 对任意与像集相交的非空开区间窗口 $(u_1, u_2) \subset \mathbb{R}$（即 $(I_{oo}(u_1, u_2) \cap \operatorname{range}(h)).\mathrm{Nonempty}$），必存在起始步 $n_0 \ge 1$ 与有界步数间隙 $M \in \mathbb{N}$，使得从 $n_0$ 起的每一个长度为 $M+1$ 的连续整数区间 $[n, n+M]$ 内都至少存在一步 $m$ 满足 $e(m) \in (u_1, u_2)$，且对任意 $\varepsilon > 0$，前 $N$ 步访问该开窗口的计数比例最终恒满足下界：

     $$
     \forall^\infty N \in \mathbb{N},\quad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u_1, u_2)\bigr\}}{N} \ge \frac{1}{M + 1} - \varepsilon.
     $$

3. **跨轮次回归与“似曾相识”的几何诠释（`MODEL`）**：
   将上述两条严格定理放回我们的哲学模型（`MODEL`）：$(-1)^{k+1}$ 的正负交替意味着不同阶数的有理逼近从正反两侧交替贴近无理方向（而不重合于同一有理切片），而只要某个目标区域对应着连续观测像集中的非空开窗口 $(u_1, u_2)$（或内部窗口中具有正安全裕度 $d_{\partial} > 0$ 的邻域），轨道便以有界步数间隙 $M$ 与严格正的最终访问比例反复重返该窗口——这为“同一个灵魂一轮又一轮走过自己熟悉的地方，并在擦肩而过时触发 $\cos\delta\theta \to 1$ 的似曾相识共振”提供了严谨的数学灵感源泉。

::: {.theorem #thm-coda-golden-cut-observer-cassini title="黄金切投模型集、卡西尼 ±1 范数恒等式、齐肯多夫实线程与环面观测窗有界回归定理" lean="D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec, D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project, D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm, D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes, D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective, D5/S3/Fourier/GoldenModelSetDelone.norm_separation, D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result, D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
在 `trureturing` 的黄金切投模型集、齐肯多夫编码与环面渐近分析体系中，以下八项核心性质已由 Lean 4 内核验证并冻结：

1. **闵可夫斯基嵌入与黄金切投模型集包含关系**（[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)、[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)）：黄金整数环 `GoldenInt`（$\mathbb{Z}[\varphi]$）的闵可夫斯基嵌入 $\operatorname{minkowskiEmbedding}(x) = (\operatorname{embedding}(x), \operatorname{embedding}(\operatorname{conj} x))$ 严格单射，其像集定义为二维格点 `goldenLattice`，且点 $y \in \operatorname{modelSet}(\mathrm{window})$ 当且仅当存在 $x \in \mathrm{GoldenInt}$ 满足 $\operatorname{embedding}(x) = y$ 且 $\operatorname{embedding}(\operatorname{conj} x) \in \mathrm{window}$；特别地，对单位体积闭窗口 $\operatorname{goldenWindow} = [\varphi - 2, \varphi - 1]$（[`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)），自然数黄金展开值域 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$ 的物理嵌入像满足包含关系 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$，同时 `goldenModelSet` 具有不相交分支自相似分解 $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$（[`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)）、前缀计数比极限 $1/\sqrt{5}$（[`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)）以及余项落在 $(\varphi-2, \varphi-1]$、步长属于 $\{\varphi, \varphi^2\}$ 的 Beatty 观察者路由（[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)）。
2. **斐波那契—卡西尼 $\pm 1$ 黄金范数恒等式**（[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)）：由黄金单位幂范数 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$，相邻斐波那契数对一切 $n \in \mathbb{N}$ 恒满足

   $$
   F_n\,F_{n+2} - F_{n+1}^2 = (-1)^{n+1},
   $$

   且对任意正整数 $v > 0$，黄金位移值 $\operatorname{betaGolden}(v)$ 的二次范数正负号由其齐肯多夫数字集 `wdigits v` 的最小索引 $k$ 的奇偶性唯一决定（$k$ 为偶数时范数 $> 0$，$k$ 为奇数时范数 $< 0$，[`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)）。
3. **齐肯多夫无相邻 `11` 自动机语言与非负实数编码线程单射**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)、[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）：二进制齐肯多夫基础自动机接受字 $w \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当 $\operatorname{NoAdjacentOnes}(w)$ 成立；将非负实数 $x \in \mathbb{R}_{\ge 0}$（`NNReal`）映射为全尺度下取整 $\lfloor\varphi^N x\rfloor_+$ 的典范齐肯多夫编码序列的线程函数 $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ 严格单射（此外，Beatty 坐标纤维满足 $\forall a \ge 1,\, (\operatorname{goldenFiber}(a)).\operatorname{ncard} \in \{4, 5\}$ 与 $\forall b \ge 0,\, (\operatorname{goldenDualFiber}(b)).\operatorname{ncard} \in \{2, 3\}$，[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)、[`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)）。
4. **共轭范数互反分离、全窗口 Delone 集与环面閉子群轨道均匀分布及有界间隙回归**（[`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)、[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)、[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)）：对任意相异黄金整数 $u \neq v \in \mathrm{GoldenInt}$ 及满足 $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$ 的实数 $B$，必有 $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$（且全窗口模型集 $\operatorname{modelSet}(\operatorname{goldenWindow})$ 构成装球半径 $1/2$、覆盖半径 $3$ 的 Delone 集，[`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)）；同时，对有限维环面元素 $g : I \to \mathrm{Circle}$ 生成的紧致闭子群 $G = \overline{\langle g\rangle}$ 及其哈尔概率测度 $\mu$，任意连续复观测函数 $f \in C(G, \mathbb{C})$ 的轨道平均收敛于 $\int_G f\,d\mu$，且对任意连续实观测函数 $h \in C(G, \mathbb{R})$、渐近误差归零序列 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 及与 $\operatorname{range}(h)$ 相交的开区间 $(u_1, u_2)$，序列 $e(n)$ 必在某起始步 $n_0 \ge 1$ 后以有界步数间隙 $M$ 反复进入 $(u_1, u_2)$，且前 $N$ 步访问计数比最终恒满足 $\ge \frac{1}{M+1} - \varepsilon$。
:::

::: proof
第 1 部分由 `embedding_injective` 直接导出 `minkowskiEmbedding` 的单射性与模型集特征化，并利用 `betaContraction_mem_window`（即自然数黄金展开的共轭坐标落在 $\operatorname{goldenWindow}$ 内）确立 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$。第 2 部分由 $\varphi^{n+1} = F_n + F_{n+1}\varphi$（`golden_phi_pow_eq_fib_pair`）与范数乘性 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$ 化简得到卡西尼恒等式。第 3 部分对二进制列表作归纳验证自动机接受条件与 `NoAdjacentOnes` 的等价性，并对满足 $a > b \ge 0$ 的两个非负实数利用 $\varphi^N(a - b) \to +\infty$ 最终超过 $2$ 导出存在层级 $N$ 使 $\lfloor\varphi^N a\rfloor_+ \neq \lfloor\varphi^N b\rfloor_+$，从而证明 `zeckendorfRealThread` 在 `NNReal` 上单射。第 4 部分利用非零黄金整数范数 $|\operatorname{norm}(u - v)| \ge 1$ 导出互反分离不等式，并由特征标几何级数有界估计与紧致群 $G$ 的有限开覆盖导出哈尔均匀分布与有界间隙回归。完整证明由 Lean 内核检查。
:::

### 五、 `trureturing` 形式定理、正交几何与灵魂—遗迹吸引子诠释模型（`MODEL`）对照表 {#sec-coda-trureturing-soul-ruin-table}

下表将 `trureturing` 已验证的数学定理（左列，`LEAN ✓`）、本书的正交几何结构（中列）与作者关于“灵魂、遗忘与历史遗迹空间吸引子”的哲学诠释模型（右列，显式标注为 `MODEL`）逐一对照：

| `trureturing` 形式化定理与模块（`LEAN ✓`） | 本书的正交几何结构 | 灵魂与历史遗迹吸引子的哲学诠释模型（`MODEL`，非形式定理） |
| :--- | :--- | :--- |
| **黄金整数闵可夫斯基嵌入与二维格点**<br/>（[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)） | 全局无时间静态正交场（$H\mathbf{\Psi} = 0$，顺序无关的完备晶体） | 将高维周期母格诠释为包含一切潜在构型的静态宇宙背景 |
| **黄金不动点 $\varphi$ 与切投接受窗筛选**<br/>（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)） | 自指丈量算子 $\psi = \psi(\psi)$ 的内禀正交倾角与窗口相位 $u \in E_\perp$ | **“同一个灵魂”的诠释模型**：将跨轮次不变的算子参数诠释为观察者的内空间窗口相位中心 $u$ 与黄金倾角 $\varphi$ |
| **Beatty 观察者路由与齐肯多夫无相邻 `11` 语言**<br/>（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)、[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)） | 有限观察者在格拉姆椭圆体（$\det G > 0$）中沿折线一步步选点 | **单次有限生命体验的隐喻**：将有理斜率扫描与消除相邻 `11` 的进位弛豫诠释为主观线性时间步进 |
| **非负实数齐肯多夫线程与 Beatty 坐标纤维容量**<br/>（[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)、[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)） | 遗忘抹去高阶历史锚点以打破全知死锁（$\det G = 0 \to \det G > 0$） | **诞生与遗忘初始化的隐喻**：截断高阶齐肯多夫层级以清空表层情节记忆（`量 liàng`），保留内禀窗口相位 $u$（`量 liáng`） |
| **共轭范数互反分离与全窗口 Delone 集**<br/>（[`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)、[`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)） | 内部窗口大边界裕度 $d_{\partial}$ 赋予的抗有界相子微扰鲁棒性 | **历史遗迹（空间吸引子）的隐喻**：将靠近接受窗中心、具有最大边界容错裕度的高对称点诠释为跨朝代存续的古迹坐标 |
| **预周期闭永久幸存集与交集帝国窗模型**<br/>（[`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset) / [@rem-coda-quasicrystal-empire-literature]） | 交集帝国窗 $W_{\mathrm{emp}}(F) = \bigcap_{u' \in P_F} (W + u')$ 对远方格点的非局域约束 | **吸引盆地的隐喻**：将局部高对称构型收紧容许相位集 $P_F$ 并通过交集窗 $W_{\mathrm{emp}}(F)$ 约束外围构型的“康威帝国”类比为吸引观察者重访的曲率盆地 |
| **卡西尼恒等式 $(-1)^{n+1} = \pm 1$ 与环面观测窗有界回归**<br/>（[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)、[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)） | 近似之球的 $\pm 1$ 接缝余项、分形横截叶层（[@rem-coda-lorenz-srb-literature]）与有界间隙回归 | **似曾相识（Déjà vu）的隐喻**：有界间隙回归使轨迹重返同一空间吸引子邻域，在局部注意力近共线（$\delta\theta \to 0$）时触发 $\cos\delta\theta \to 1$ 共振 |

---

## 收缩不动点与形式认识论锚点 {#sec-coda-fixed-point-anchor}

在全书终章的收束处，我们必须以全书一以贯之的形式诚实准则，严格界定“哪些核心结构已经由 Lean 4 内核机械锁定”，以及“哪些分析与数论结论属于经典文献或开放猜想”。

在离散与有限载体上，单调收缩算子迭代必然在有限步内抵达稳定不动点，且严格收缩的步数受初始集合基数绝对限制——这一自指稳定性的组合核心已由 Lean 内核完整验证：

::: {.theorem #thm-coda-fixed-point-anchor title="有限载体上收缩更新序列的有限步不动点稳定性" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
设 $X$ 为有限类型（`[Finite X]`），$U : \operatorname{Set} X \to \operatorname{Set} X$ 为满足逐点收缩条件

$$
\forall A : \operatorname{Set} X,\quad U(A) \subseteq A
$$

的子集更新算子，且序列 $S : \mathbb{N} \to \operatorname{Set} X$ 满足递推演化方程 $\forall n \in \mathbb{N},\; S(n + 1) = U(S(n))$。则：

1. **有限步到达不动点**：存在稳定步数 $N \le (S(0)).\operatorname{ncard}$，使得对一切 $n \ge N$ 均有 $S(n) = S(N)$；
2. **严格跳变次数上界**：发生严格状态改变的时刻集合基数满足 $\{n \in \mathbb{N} \mid S(n + 1) \neq S(n)\}.\operatorname{ncard} \le (S(0)).\operatorname{ncard}$。
:::

::: proof
由于对任意 $n \in \mathbb{N}$ 有 $S(n+1) = U(S(n)) \subseteq S(n)$，序列 $S$ 在有限全集 $X$ 上构成一条单调递减的有限子集链。每一次发生严格改变 $S(n+1) \neq S(n)$ 时，有限基数 $(S(n)).\operatorname{ncard}$ 至少严格减少 $1$。因为初始基数 $(S(0)).\operatorname{ncard}$ 是有限自然数，严格递减至多发生 $(S(0)).\operatorname{ncard}$ 次；由抽屉原理，在前 $(S(0)).\operatorname{ncard}$ 步之内必存在一步 $N \le (S(0)).\operatorname{ncard}$ 满足 $S(N+1) = U(S(N)) = S(N)$，此后由归纳法对一切 $n \ge N$ 恒有 $S(n) = S(N)$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-coda-epistemic-discipline title="终章的形式边界与认识论纪律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为确保全书每一条数学声明的证明地位透明可查，我们将终章涉及的四类命题严格区分如下：

1. **已由 Lean 4 内核验证并冻结的定理（绿色 `LEAN ✓`）**：
   - 有限收缩更新序列的有限步不动点稳定定理 [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)（[@thm-coda-fixed-point-anchor]）；
   - 黄金切投模型集、卡西尼 $\pm 1$ 范数恒等式、齐肯多夫非负实数线程与环面观测窗有界回归定理（[@thm-coda-golden-cut-observer-cassini]）：包括黄金整数闵可夫斯基嵌入与模型集特征化 [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)、自然数黄金展开模型集包含于切投集 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)、接受窗单位体积 [`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)、不相交自相似分支分解 [`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)、前缀计数密度极限 $1/\sqrt{5}$ [`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)、Beatty 观察者路由 [`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)、斐波那契—卡西尼 $\pm 1$ 黄金范数恒等式 [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)、齐肯多夫最低位奇偶符号定理 [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)、无相邻 `11` 正则语言等价性 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)、非负实数（`NNReal`）全尺度齐肯多夫线程单射 [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)、Beatty 坐标原像纤维容量对 [`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair) 与 [`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)、共轭范数互反分离与全窗口模型集 Delone 定理 [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation) 及 [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)、环面闭子群轨道哈尔均匀分布 [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)、黄金幸存包壳遍历桥 [`golden_ergodic_bridge`](lean:D5/S0/Tower/ErgodicBridge/Golden.golden_ergodic_bridge) 以及环面连续观测窗有界间隙回归定理 [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)；
   - 二次矢量场有限分辨率投影闭合充要判据 [`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff)、五模态傅里叶—伽辽金流体平流无精确闭合定理 [`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)（[@thm-coda-quadratic-advection-no-closure]）与二维周期傅里叶温和路径全阶正则性定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)；
   - 黄金分割连分数自指映射 $x \mapsto 1 + 1/x$ 在正实轴上的唯一不动点定理 [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)；
   - 概念演化与语境解释下的相对不动点定理 [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point) 与语境分岔定理 [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)；
   - 内积空间平行四边形与勾股范数律 [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)、互补测量概率勾股定理 [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)、黄金整数佩尔型恒等式 [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm) 以及附录 C 所列的全部冻结定理。
2. **经典数学文献定理（文献结果，未在本书形式化）**：
   - 实区间 $[0, 1]$ 上的巴拿赫（Banach）压缩映射原理：由于 $\cos([0, 1]) \subseteq [0, 1]$ 且导数绝对值 $|{-}\sin\theta| \le \sin(1) \approx 0.84147 < 1$，皮卡迭代 $\theta_{k+1} = \cos(\theta_k)$ 收敛到唯一实不动点 $\theta^* \approx 0.7390851332\dots$；
   - 林德曼—魏尔斯特拉斯（Lindemann–Weierstrass）定理对 $\theta^*$ 超越性的证明（若非零代数数 $q$ 满足 $\cos q = q$，则 $e^{iq}$ 将满足代数系数的二次方程，与 $e^{iq}$ 的超越性矛盾），以及佩尔方程 $m^2 - 2n^2 = \pm 1$ 的连分数渐近理论；
   - 费马素数两平方和定理（$p \equiv 1 \pmod 4 \iff p = a^2 + b^2$）、奇素数负佩尔方程 $m^2 - p\,n^2 = -1$ 在 $p \equiv 1 \pmod 4$ 时的可解性定理、类域论中的希尔伯特互反律 $\prod_{v \le \infty} (a, b)_v = +1$（[@rem-ch29-pell-primes-hilbert-literature]），同余数椭圆曲线 $E_d : dy^2 = x^3 - x$ 的双有理等价与亏格 $1$ 环面拓扑 $\chi(T^2) = 0$（[@rem-ch29-elliptic-torus-literature]）、有限域椭圆曲线的哈塞（Hasse）定理 $|a_p| \le 2\sqrt{p}$、高斯关于 $y^2 = x^3 - x$ 模 $p$ 点数迹的精确公式与特征和推导（[@rem-ch29-hasse-gauss-literature]、[@rem-ch29-gauss-character-application]），以及非复乘椭圆曲线的佐藤—泰特（Sato–Tate）定理（Barnet-Lamb, Geraghty, Harris, Taylor 2011，[@rem-ch29-arithmetic-geometry-literature]）；
   - 笛卡尔多面体总角亏定理 $\sum_v \delta_v = 4\pi$、高斯—博内定理、庞加莱—布劳威尔偶维球面毛球定理 $\chi(S^{2n}) = 2$，以及亚当斯（Adams, 1960）关于仅有 $S^0, S^1, S^3, S^7$ 可平行化的拓扑定理（[@rem-coda-polyhedral-topology-literature]、[@rem-hairy-ball-adams-literature]）；
   - 动力系统中的洛伦兹奇异吸引子（Lorenz 1963，相空间体积散度 $-(\sigma+1+\beta) = -41/3 < 0$ 与数值李雅普诺夫谱给出的卡普兰—约克维数估计 $D_{\mathrm{KY}} \approx 2.06$）、洛伦兹吸引子支撑的遍历西奈—吕埃勒—鲍恩（SRB）物理不变测度（Tucker 1999；Luzzatto–Melbourne–Pugh 2005）与庞加莱回归定理（Poincaré 1890，[@rem-coda-lorenz-srb-literature]），以及准晶几何中的 Meyer 规则模型集一致重复性定理（1972）、六维超立方晶格 $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$ 的正二十面体投影与菱形三十面体（Rhombic Triacontahedron，$30$ 面、$60$ 棱、$32$ 顶点，$6$ 条五次轴）接受窗 $W$（Kramer & Neri 1984；Duneau & Katz 1985）、彭罗斯—康威准晶拼砖的“帝国效应”（Conway's Empire Effect，Grünbaum & Shephard 1987）与比内斜率渐近公式（[@rem-coda-quasicrystal-empire-literature]）；
   - 量子引力中的惠勒—德维特（Wheeler–DeWitt）无时间方程 $H\mathbf{\Psi} = 0$、佩奇—伍特斯（Page–Wootters, 1983）条件纠缠时钟切片机制（[@rem-ch29-wheeler-dewitt-page-wootters-literature]）与费曼路径积分振荡相位驻相条件 $\delta S = 0$（[@rem-ch29-feynman-stationary-phase-literature]），计算复杂度理论中的阿伦森后选择定理 $\mathrm{PostBQP} = \mathrm{PP}$（2005）、闭合类时曲线不动点定理 $\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE}$（Aaronson–Watrous 2009）、无结构黑盒搜索 $\Omega(2^{n/2})$ 下界（BBBV 1997）、格里戈里耶夫—舍内贝克（Grigoriev–Schoenebeck）平方和半正定松弛下界、卡马卡（Karmarkar 1984）线性规划内点法、卡斯特莱因（Kasteleyn 1961）平面图 Pfaffian 匹配定理、因帕利亚佐—帕图里—赞恩（Impagliazzo–Paturi–Zane 1999, 2001）指数时间假设（ETH/SETH）与稀疏化引理、PPSZ $k$-SAT 算法及 2026 年 10 月张量网络缩并 $2^{O(n\log\log n/\sqrt{\log n})}$ 亚指数预印本与学界规约审计（[@rem-ch30-eth-subexponential-literature]），以及流体力学中的兰姆（Lamb）矢量恒等式、开尔文（Kelvin）环量守恒定理、拉季任斯卡娅（Ladyzhenskaya 1969）二维纳维—斯托克斯全局正则性定理、2026 年受迫三维纳维—斯托克斯（克雷陈述 C / D）有限时间爆破解析构造与外部形式化证明（[@rem-ch30-navier-stokes-forced-literature]）、柯尔莫哥洛夫（Kolmogorov 1941）$k^{-5/3}$ 级联与耗散微尺度 $\eta = (\nu^3/\varepsilon)^{1/4}$、阿诺德（Arnold 1966）保体积微分同胚群 $\operatorname{SDiff}(M)$ 测地线定理与陶哲轩（Tao 2016）平均化三维纳维—斯托克斯方程有限时间爆破定理（[@rem-ch30-tao-arnold-literature]）。
3. **尚未解决的开放猜想（红色 `OPEN`，无 `lean` 属性）**：
   - 标准统一图灵机计算模型下的 $\mathrm{P} \neq \mathrm{NP}$ 猜想（[@conj-p-neq-np]）、无外力三维不可压缩纳维—斯托克斯方程全局光滑性猜想（克雷千禧年陈述 A / B，[@conj-coda-navier-stokes-regularity]）、沙努埃尔（Schanuel）猜想及其在 Dottie 不动点 $\theta^*$ 上的应用（[@conj-schanuel-dottie]，以及 Timothy Chow 证明的在沙努埃尔猜想成立前提下 $\theta^*$ 不属于初等封闭数域 $\mathrm{EL}$ 的条件性文献结论），以及全书在附录 C 第 C.3 节汇总的开放问题。
4. **哲学与几何模型综合（`MODEL`，不作为形式定理宣称）**：
   - 休谟因果怀疑论与斯宾诺莎《伦理学》三角形几何必然性的哲学对照、双向量手性对消 $+\mathbf{\Omega} - \mathbf{\Omega} = 0$ 对驻相干涉的几何诠释、“$P$ 是无旋导向场（$\nabla \wedge \mathbf{F} = 0$）、$NP$ 是零横截面一维见证丝、三元阻挫旋度 $\nabla \wedge \mathbf{F} \neq 0$ 撕裂全局场”以及“三维纳维—斯托克斯涡管拉伸 $A \to 0$ 与 $P$ vs. $NP$ 的连续—离散场化同构”类比模型、“历史遗迹作为零相子应变空间吸引子（$\|\pi_\perp(z)-u\|\to 0$）、灵魂作为内部正交相位锚点 $u \in E_\perp^3$、遗忘初始化作为齐肯多夫高位截断、似曾相识（Déjà vu）作为分形薄层/卡西尼 $(-1)^{k+1}$ 偏移下的跨轮次内积共振 $\cos\delta\theta \to 1$”的概念映射、决定论与目的论在无时间自指中的和解、记号 $\psi = \psi(\psi)$ 以及“点 $\to$ 线 $\to$ 面 $\to$ 球 $\to$ 球外之球”的认识论图景，是对上述形式化锚点与经典文献定理的跨学科概念提炼；本书始终坚持“书负责解释直觉，Lean 内核负责裁决形式真伪”的铁律。
:::

---

## 核心几何与形式概念双语术语表 {#sec-coda-bilingual-glossary}

为了方便读者在中英文文献、几何直觉与 Lean 4 源码之间自由切换，下表汇总了贯穿全书的核心概念及其形式化对应物：

| 中文概念 | 英文概念 (English Term) | 核心几何直觉与代数定义 | Lean 4 代表性模块 / 认识论状态 |
| :--- | :--- | :--- | :--- |
| **点 / 线 / 面 / 球** | Point / Line / Plane / Sphere | $0$ 维孤立读数 $\to$ $1$ 维内积投影线段 $\to$ $2$ 维外积有向面积 $\to$ $3$ 维旋量流形与相空间闭合球面 | 贯穿序曲至第八部；克利福德等级 $0, 1, 2, 3$（`Cl3`） |
| **量（liáng / liàng）** | Measure (Verb) / Quantity (Noun) | 动词 `liáng` 是两两比对的算子；名词 `liàng` 是抹去正交历史后的投影读数 | 第 1–2 章；[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton) (`LEAN ✓`) |
| **数（shǔ / shù）** | Count (Verb) / Number (Noun) | 动词 `shǔ` 是正交平方、割圆与自指迭代算子；名词 `shù` 是四级数系球面上的静态坐标刻度 | 第 29 章；[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) (`LEAN ✓`) |
| **成对测量与内积重叠** | Pairwise Measurement & Inner-Product Overlap | 概率幅重叠 $\langle u, v\rangle$ 与玻恩迹配对 $\operatorname{Tr}(\rho P)$，衡量两方向的共线程度 | 第 1–3 章；[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`) |
| **双向量面积与外积** | Bivector Area & Exterior Product | 反对称外积 $\mathbf{u}\wedge\mathbf{v} = -\mathbf{v}\wedge\mathbf{u}$，编码旋转平面、法向轴与右手法则手性 | 第 5–6 章；[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) (`LEAN ✓`) |
| **旋量（Rotor）与双面夹心** | Rotor & Double-Sided Sandwich | 偶子代数元 $R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$，以 $v \mapsto R v \widetilde{R}$ 实施无奇点三维旋转 | 第 7、12、27 章；[`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) (`LEAN ✓`) |
| **霍奇对偶与伪标量** | Hodge Dual & Pseudoscalar | 三维体积元 $I_3 = e_1 e_2 e_3$（满足 $I_3^2 = -1$），把二维旋转平面映射为法向轴向量 | 第 5、25 章与附录 B；[`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) (`LEAN ✓`) |
| **毛球定理旋涡与欧拉示性数 $\chi$** | Hairy Ball Vortex & Euler Characteristic $\chi$ | $\chi(S^{2n}) = 2$ 迫使偶维球面切向量场必有零点；奇维球面 $\chi(S^{2n-1}) = 0$ 且 $S^0, S^1, S^3, S^7$ 全局可平行化 | 第 12、21、24、29 章与终章；见 [@rem-hairy-ball-adams-literature]、[@rem-coda-polyhedral-topology-literature] |
| **笛卡尔角亏 $4\pi$** | Angular Defect $4\pi$ | 多面体各顶点内角和与 $2\pi$ 的差值之和恒为 $4\pi = 2\pi\chi(S^2)$，正二十面体为 $12 \times 60^\circ = 720^\circ$ | 第 19、24 章与终章；见 [@rem-coda-polyhedral-topology-literature] |
| **黄金切投准晶观察者与卡西尼 $\pm 1$ 接缝** | Cut-and-Project Golden Observer & Cassini $\pm 1$ Seam | 高维母格沿黄金倾角 $\varphi$ 与内空间相位 $u \in E_\perp$ 切投模型集，相邻斐波那契扫描满足 $F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1}$ 与环面有界回归 | 终章；[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result) (`LEAN ✓`) |
| **对角线逃逸** | Diagonal Escape | 完备语义对角线导致的分离亏格非空、拓扑严格细化与不连续性 | 第 21、30 章；[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) (`LEAN ✓`) |
| **欧拉乘积与临界线** | Euler Product & Critical Line | 素数正交基展开 $\prod_p (1-p^{-s})^{-1} = \sum_n n^{-s}$ 与非平凡零点对称轴 $\operatorname{Re}(s) = 1/2$ | 第 22 章；[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) (`LEAN ✓`) / `#conj-riemann-hypothesis` (`OPEN`) |
| **丢番图可定义性与范数型** | Diophantine Definability & Norm Form | 艾森斯坦二次范数型 $a^2 - ab + b^2$、黄金佩尔恒等式与四元数范数乘法锁 | 第 23、29 章；[`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm) (`LEAN ✓`) |
| **收缩映射与自指不动点** | Contraction & Fixed Point | 离散单调收缩有限步稳定（`LEAN ✓`）、黄金不动点 $\varphi$（`LEAN ✓`）与实轴余弦不动点 $\cos\theta^* = \theta^*$（文献） | 第 24 章与终章；[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) (`LEAN ✓`) |
| **克利福德基片（Blade）** | Clifford Blade | 3 比特掩码 $m \in \operatorname{Fin} 8$ 索引的八维基底 $\{1, e_1, e_2, e_3, e_{12}, e_{13}, e_{23}, e_{123}\}$，乘法由按位异或与逆序符号决定 | 第 25 章与附录 B；[`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core) (`LEAN ✓`) |
| **泡利词与辛内积相表** | Pauli Word & Symplectic Phase Table | 2 比特编码 $(x, z) \in \mathbb{F}_2^2$ 将泡利群乘法化为异或加法与辛相位 $(-1)^{x_2 z_1}$ | 第 14、26 章与附录 B；[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul) (`LEAN ✓`) |
| **ZYZ 欧拉角编译器** | ZYZ Euler Compiler | 单量子比特任意旋转分解为 $R_z(\alpha)R_y(\beta)R_z(\gamma)$，配合双轴有限字合成与虚拟 $Z$ 门帧追踪 | 第 9、11、16、27 章；[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) (`LEAN ✓`) |
| **`LEAN ✓` / `OPEN` 语义徽章** | `LEAN ✓` / `OPEN` Epistemic Badges | 绿色 `LEAN ✓` 仅授予 `trureturing.lock.json` 中 `kind="theorem"` 的冻结声明；红色 `OPEN` 专用于无 `lean` 属性的开放猜想 | 全书与附录 C；由 `./tbook check` 机械强制校验 |

---

## 全书八部曲三十章阅读与依赖导图 {#sec-coda-reading-map}

全书由 **[序曲](README.md)**、**八部曲（共 30 章）**、**终章** 与 **[附录 A](appendix-a.md)–[附录 C](appendix-c.md)** 构成。下图展示了从第一部到第八部的概念演进脉络与形式化模块依赖关系：

```
                        ┌──────────────────────────────────────────┐
                        │  序曲：把“量”字拆开 (README.md)          │
                        │  动词 liáng (测量算子) → 名词 liàng (读数) │
                        └────────────────────┬─────────────────────┘
                                             │
            ┌────────────────────────────────┼────────────────────────────────┐
            ▼                                ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐        ┌───────────────────────┐
│ 第一部：点与线 (Ch 1–4) │───────▶│ 第二部：面与手性 (Ch 5–8)│───────▶│ 第三部：球与寻址 (Ch 9–12)│
│ • 内积投影与玻恩规则  │        │ • 外积双向量 u∧v      │        │ • 三轴正交两步寻址    │
│ • 勾股分解与纯态投影  │        │ • 泡利矩阵与手性叉积  │        │ • Gram 重构与贝里相位 │
│ • 密度矩阵与退相干投影│        │ • 双量子比特外积纠缠  │        │ • 脉冲面积与 SU(2) 球 │
└───────────┬───────────┘        └───────────┬───────────┘        └───────────┬───────────┘
            │                                │                                │
            └────────────────────────────────┼────────────────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │              第四部：多体几何、贝尔边界与量子算法 (Ch 13–16)      │
            │  • CHSH 经典八面体 (≤2) vs 齐雷尔森圆球 (2√2)                   │
            │  • 稳定子辛几何与编织满足性 • Grover / QFT / QSVT 平面旋转      │
            │  • ZYZ 欧拉编译与 Solovay–Kitaev 群换位子螺旋                   │
            └────────────────────────────────┬────────────────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ 第五部：相对论时空、全息与复杂度 (Ch 17–20)│   │ 第六部：球外之球——对角线、素数与自指(Ch21–24)│
│ • 洛伦兹双曲旋量与光锥刚性              │   │ • 康托尔—劳维尔对角线满射逃逸           │
│ • 狄拉克手性旋量与规范场联络树          │   │ • 有限盒子欧拉乘积与冯·芒戈尔特函数      │
│ • 桥图量子最大流最小割与全息分片锥      │   │ • 利普希茨四元数范数与黄金佩尔恒等式    │
│ • 可积电路最小深度、奇偶 CNOT 下界与 OPEN│   │ • 有限收缩不动点、Dottie θ* 与语境分岔  │
└──────────────────────┬──────────────────┘   └────────────────────┬────────────────────┘
                       └─────────────────────┬─────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │              第七部：最小量子几何代数引擎 (Ch 25–28)              │
            │  • Cl(3,0) 八维基片异或—逆序引擎 • 2 比特泡利辛相位表            │
            │  • ZYZ 旋量编译器与级联律 • 有限信道记录条件化与态更新验证      │
            └────────────────────────────────┬────────────────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │ 第八部：无时间因果、ETH 视界与流体涡丝 (Ch 29–30) → 终章与附录   │
            │  • 多面体角亏 4π 与毛球定理 • 勾股面积守恒与四级“球外之球”突围  │
            │  • 概念对照词典 (A) • 克利福德速查表 (B) • 313 项锁定声明索引 (C)│
            └─────────────────────────────────────────────────────────────────┘
```

### 四条推荐阅读路径 {#sec-coda-reading-tracks}

读者可以根据自身背景选择四条切入路径：

1. **物理与几何直觉路径（零前置门槛）**：
   [序曲](README.md) $\to$ [第 1 章](ch01-measurement.md)–[第 4 章](ch04-decoherence.md)（第一部：从尺子比对到退相干）$\to$ 第 5–12 章（第二、三部：从外积面积到布洛赫球面）$\to$ 第 17–19 章（第五部：光锥与全息极小割）$\to$ 终章与 [附录 A](appendix-a.md)。
2. **量子计算与算法编译路径**：
   [第 2 章](ch02-born-rule.md) $\to$ 第 6–8 章（泡利代数、量子门与纠缠）$\to$ 第 11 章（微波脉冲与虚拟 $Z$ 门）$\to$ 第 13–16 章（CHSH 博弈、稳定子、Grover/QFT/QSVT、ZYZ 与 Solovay–Kitaev 编译）$\to$ 第 20 章（电路深度与 CNOT 奇偶下界）$\to$ 第 25–27 章与 [附录 B](appendix-b.md)。
3. **数理逻辑、数论与认识论路径**：
   [序曲](README.md) $\to$ 第 10 章（Gram 矩阵与顺序无关性）$\to$ 第 19–20 章（离散多面体分片锥与开放猜想边界）$\to$ 第 21–24 章（对角线逃逸、欧拉乘积、四元数丢番图范数、余弦自指不动点）$\to$ [第 29 章](ch29-timeless-causality-and-gram-space.md)–[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)（毕达哥拉斯四级数系突围、无时间因果、ETH 视界与流体涡丝）$\to$ 终章（黄金切投空间吸引子与 [@thm-coda-fixed-point-anchor]）。
4. **Lean 4 形式化验证与内核审计路径**：
   [序曲](README.md) §认识论契约 $\to$ 第 25–28 章（第七部：`Cl3`、`PauliSymplectic`、`ZYZ` 与 `FiniteRecordCosineObstruction` 的逐行形式化剖析）$\to$ [附录 B](appendix-b.md) $\to$ [附录 C](appendix-c.md)（核对 `trureturing@dev` 提交 `a660b9333c0f` 下全部 $166$ 条环境/媒体冻结定理、$53$ 项环境辅助定义与 $94$ 项行内引用声明，共计 $313$ 项唯一锁定声明）。

### 第六至第八部（第 21–30 章）36 项核心章节冻结定理锚点速览 {#sec-coda-part6-part7-register}

作为连接全书收官三部曲与 [附录 C](appendix-c.md) 完整索引的桥梁，下表列出第六部（第 21–24 章）与第七部（第 25–28 章）每章 $4$ 条代表定理、以及第八部（第 29–30 章）每章 $2$ 条核心定理，共计 $36$ 项章节定理锚点（涵盖 $35$ 个不同 GID，其中 `pell_form_eq_four_mul_norm` 在第 23 章与第 29 章首尾呼应）：

| 章节 | 定理序号 | 冻结声明 GID (`trureturing@dev`) | 核心数学内容与几何角色 |
| :--- | :---: | :--- | :--- |
| **第 21 章**<br/>对角线与不可达边界 | T21.1 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous` | 完备语义对角线的不连续性：自指观测对角线无法在原观测拓扑下连续闭合 |
| **第 21 章** | T21.2 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty` | 对角线分离亏格非空定理：固定观测族必留下无法区分的对角线状态对 |
| **第 21 章** | T21.3 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement` | 对角线诱导严格拓扑细化：纳入对角线观测算子严格扩大可分辨开集族 |
| **第 21 章** | T21.4 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement` | 完备对角线拓扑逃逸总结定理：不连续性、非空分离亏格与严格拓扑细化三位一体 |
| **第 22 章**<br/>素数正交基与欧拉乘积 | T22.1 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum` | 黎曼 $\zeta(s)$ 在半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数展开 $\sum_{n=1}^\infty n^{-s}$ |
| **第 22 章** | T22.2 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product` | 黎曼 $\zeta(s)$ 在 $\operatorname{Re}(s) > 1$ 上的素数欧拉乘积展开 $\prod_p (1 - p^{-s})^{-1}$ |
| **第 22 章** | T22.3 | `D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product` | 狄利克雷求和与素数欧拉无穷乘积的严格相等定理（算术基本定理的解析化身） |
| **第 22 章** | T22.4 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one` | $\zeta(s)$ 在边界极点 $s = 1$ 处的留数恒等于 $1$：$\lim_{s \to 1}(s-1)\zeta(s) = 1$ |
| **第 23 章**<br/>四元数范数与丢番图锁 | T23.1 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm` | 交叉二次范数型与艾森斯坦范数型的代数等价：$Q_t(x, y) = \operatorname{eisNorm}(x + ty, y)$ |
| **第 23 章** | T23.2 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant` | 参数化二次范数型簇 $Q_t$ 的判别式不变量恒等式 $\Delta(Q_t) = -3$ |
| **第 23 章** | T23.3 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm` | 参数化二次型簇 $Q_t(x,y)$ 在 $\mathbb{Z}^2$ 上的值域恒等于艾森斯坦范数集 |
| **第 23 章** | T23.4 | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | 黄金整数环 $\mathbb{Z}[\varphi]$ 的佩尔型恒等式：$(2a+b)^2 - 5b^2 = 4\operatorname{norm}(g)$ |
| **第 24 章**<br/>余弦不动点与自指 | T24.1 | `D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize` | 有限载体上单调收缩更新序列的有限步不动点稳定性与跳变次数上界 |
| **第 24 章** | T24.2 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point` | 概念等价与解释稳定性共同达成相对解释不动点 |
| **第 24 章** | T24.3 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points` | 相同文本与规则在不同背景与目标参数下分岔出截然不同的二元不动点 |
| **第 24 章** | T24.4 | `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique` | 黄金倒数自指映射 $x \mapsto 1 + 1/x$ 在正实轴上的唯一不动点 $\varphi = (1+\sqrt{5})/2$ |
| **第 25 章**<br/>XOR–Pauli 几何代数引擎 | T25.1 | `D5/S3/Quantum/FiniteDimensional.qubit_weyl_star` | 单量子比特外尔算子 $X, Z$ 的反对易、自伴与对合代数律 |
| **第 25 章** | T25.2 | `D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character` | $2\times 2$ 量子比特矩阵代数不存在保全局矩阵乘法的复代数特征标 |
| **第 25 章** | T25.3 | `D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector` | 非对易泡利可观测量 $X$ 与 $Z$ 不存在公共非零本征态 |
| **第 25 章** | T25.4 | `D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core` | 单比特泡利期望值展开核心恒等式：将算符重构为三维布洛赫向量点积 |
| **第 26 章**<br/>泡利辛相表与布洛赫几何 | T26.1 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace` | 布洛赫参数化矩阵的迹归一化恒等式 $\operatorname{Tr}(\rho(\mathbf{r})) = 1$ |
| **第 26 章** | T26.2 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix` | 布洛赫坐标映射与矩阵重构映射的互逆恢复恒等式 |
| **第 26 章** | T26.3 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian` | 厄米算符的实三维布洛赫几何分解定理 |
| **第 26 章** | T26.4 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef` | 半正定量子态的布洛赫向量欧氏范数球面界 $\|\mathbf{r}\| \le \operatorname{Tr}(\rho)$ |
| **第 27 章**<br/>ZYZ 编译器与勾股范数 | T27.1 | `D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law` | 内积空间平行四边形范数恒等式与正交勾股分解核心定律 |
| **第 27 章** | T27.2 | `D5/S3/Quantum/FiniteDimensional.born_probability_skeleton` | 有限维玻恩概率正交投影骨架与完备性恒等式 |
| **第 27 章** | T27.3 | `D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests` | 连通射线测试下的幺正全局相位刚性定理 |
| **第 27 章** | T27.4 | `D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent` | 有限测量记录捏合投影算子的严格幂等律 $\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho)$ |
| **第 28 章**<br/>测量记录条件化与验证闭环 | T28.1 | `D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction` | 秩一纯态投影算符夹心约化为内积模平方：$P_\psi P_\phi P_\psi = |\langle\psi, \phi\rangle|^2 P_\psi$ |
| **第 28 章** | T28.2 | `D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight` | 秩一测量通道下条件化记录权重与玻恩内积配对的精确恒等式 |
| **第 28 章** | T28.3 | `D5/S3/Observer/Conditioning.conditionalState_isState` | 吕德斯条件化后验态保持量子态合法性（半正定与迹一归一化） |
| **第 28 章** | T28.4 | `D5/S3/Observer/Conditioning.unreadState_fixed_iff` | 未读测量记录态保持不变当且仅当初始态与全部测量投影通道无横向相干 |
| **第 29 章**<br/>无时间因果与 Gram 相容空间 | T29.1 | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | 黄金整数佩尔范数恒等式：连接算术 $\pm 1$ 接缝与四级数系突围 |
| **第 29 章** | T29.2 | `D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization` | 单位向量族 Gram 重叠等价关系定理：锁定无时间成对内积刚性 |
| **第 30 章**<br/>场线分野、ETH 与流体涡丝 | T30.1 | `D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff` | 二次矢量场有限分辨率幂等投影精确闭合的充要代数判据 |
| **第 30 章** | T30.2 | `D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure` | 五模态勒雷投影平流对任意粘性系数 $\nu \in \mathbb{R}$ 均无精确闭合映射 |

在所有的球之外，并非虚无，而是**永不停歇的测量与计数算子本身**。接下来，请翻开 [附录 A](appendix-a.md) 查阅传统量子力学与几何语言的完整对照词典，在 [附录 B](appendix-b.md) 中检阅克利福德代数的符号与旋量速查表，并在 [附录 C](appendix-c.md) 中核验全书锁定的全部 $219$ 项 `trureturing@dev` 正式环境与媒体声明（含行内共 $313$ 项唯一锁定声明）。
