# 4.2.3 振幅阻尼、弛豫与迹距离 {#sec-ch04-s02-s03-amplitude-and-distance}

除了“只收腰、不掉高”的相位阻尼外，实验室里还有另一类截然不同的能量耗散过程——**振幅阻尼信道**（amplitude damping，对应自发辐射能量弛豫时间 $T_1$）：处于激发态（南极 $-1$）的量子比特会向低温环境吐出一颗能量光子而跌回基态（北极 $+1$）。因此，在几何上，整颗布洛赫球不仅在往里收缩，而且球心还在往北极 $u = +1$ 方向**整体上漂**：轴向坐标按仿射律 [`dampedAxis`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.dampedAxis) $u \mapsto u' = (1 - \gamma)u + \gamma$（阻尼率 $0 \le \gamma < 1$）向 $+1$ 聚拢！

::: {.viz src="bloch-noise" preset="amp" height="500"}
**缩小并往北漂。** 振幅阻尼每一步取 $\gamma = 0.3$：青色的球一边缩小一边往北极上漂，横向缩得比纵向慢；紫色的北极 $\lvert 0\rangle$ 不动，从南极出发的琥珀色 $\rho$ 一路爬向北极。
:::

有趣的是，在量子信息几何（Petz 单调黎曼度规族）中，当我们用对称对数导数度规（SLD，径向权重函数 $\varphi_{\mathrm{SLD}}(u) = 1$）与右对数导数度规（RLD，径向权重函数 $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$）分别衡量振幅阻尼下的横向相干收缩比 [`coherenceRatio`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.coherenceRatio) $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\frac{\varphi(u')}{\varphi(u)}$ 时，两把几何标尺在纯态北极边界 $u \to 1^-$ 处呈现出截然不同的端点极限行为！

::: {.proposition #prop-amplitude-damping-contraction title="振幅阻尼轴向漂移下 SLD 与 RLD 相干收缩比的端点定理" lean="D5/S3/QuantumChannels/AmplitudeDampingContraction.amplitude_damping_sld_rld_endpoints"}
设阻尼参数满足 $0 \le \gamma < 1$，记轴向阻尼映射为 $u'(\gamma, u) = (1 - \gamma)u + \gamma$，对径向轮廓函数 $\varphi : \mathbb{R} \to \mathbb{R}$ 记相干收缩比为 $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\varphi(u'(\gamma, u)) / \varphi(u)$。取 $\varphi_{\mathrm{SLD}}(u) = 1$ 与 $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$，则同时成立：

1. **SLD 常值均匀收缩**：对一切 $u \in \mathbb{R}$，$\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$；
2. **RLD 单调上界与纯态边界极限**：对一切混合态内部坐标 $u \in (-1, 1)$ 均有 $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$，且当 $u$ 从球体内部趋近于纯态极点边界 $1^-$ 时，

   $$
   \lim_{u \to 1^-} \mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = 1.
   $$

:::

::: proof
对结论 1，因 $\varphi_{\mathrm{SLD}}$ 恒为 $1$，直接约分即得 $\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$。对结论 2（Lean 中封装为纯态边界端点谓词 [`HasPureBoundaryEndpoint`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.HasPureBoundaryEndpoint)，即同时满足开区间 $u \in (-1, 1)$ 上的逐点上界 $\le 1$ 与左邻域滤子极限 $u \to 1^-$ 收敛于 $1$），当 $u \in (-1, 1)$ 且 $0 \le \gamma < 1$ 时，计算 $1 - u' = 1 - ((1 - \gamma)u + \gamma) = (1 - \gamma)(1 - u)$；代入 $\varphi_{\mathrm{RLD}}(v) = \frac{1}{(1 - v)(1 + v)}$，因子 $(1 - \gamma)$ 与 $(1 - u)$ 上下精确约消，将收缩比化简为极其透明的分式：

$$
\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = (1 - \gamma)\cdot\frac{1 - u^2}{1 - u'^2} = (1 - \gamma)\cdot\frac{(1 - u)(1 + u)}{(1 - \gamma)(1 - u)(1 + u')} = \frac{1 + u}{1 + (1 - \gamma)u + \gamma}.
$$

因 $u < 1$ 且 $\gamma \ge 0$，分母减去分子等于 $\gamma(1 - u) \ge 0$，且分子分母皆正，故对一切 $u \in (-1, 1)$ 恒有 $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$；再令 $u \to 1^-$，分子与分母连续趋于同一正数 $2$，故左极限精确等于 $\frac{2}{2} = 1$。完整证明由 Lean 内核检查。
:::

现在，我们可以把量子计算工程里最核心的四种噪声信道排成一张一目了然的**布洛赫球几何形变速查表**——从此看到任何噪声信道，脑海里浮现的不再是一堆枯燥的 $E_k$ 符号，而是直观的三维橡皮球挤压动画：

| 量子噪声信道（严格收缩参数域） | 布洛赫向量仿射变换 $\vv{r} = (r_x, r_y, r_z) \mapsto \vv{r}'$ | 三维球体几何形变图像 | 严格收缩域下的不动点集 |
| :--- | :---: | :--- | :--- |
| **相位阻尼 / 去相干**（$0 \le c < 1$） | $(c\,r_x,\; c\,r_y,\; r_z)$ | 绕竖直 $Z$ 轴向内水平收腰（压成竖直橄榄球） | 竖直 $Z$ 轴线段 $(0, 0, r_z)$ |
| **比特翻转噪声**（$0 < p < 1$） | $\bigl(r_x,\; (1-2p)r_y,\; (1-2p)r_z\bigr)$ | 绕水平 $X$ 轴向内径向收腰（$p > \frac{1}{2}$ 时伴随横向反号翻转） | 水平 $X$ 轴线段 $(r_x, 0, 0)$ |
| **退极化噪声**（$0 < \lambda \le 1$） | $\bigl((1-\lambda)r_x,\; (1-\lambda)r_y,\; (1-\lambda)r_z\bigr)$ | 各向同性均匀向球心同心缩小 | 仅球心唯一死点 $\vv{r} = \vv{0}$ |
| **振幅阻尼 / 能量弛豫**（$0 < \gamma < 1$） | $\bigl(\sqrt{1-\gamma}\,r_x,\; \sqrt{1-\gamma}\,r_y,\; (1-\gamma)r_z + \gamma\bigr)$ | 椭球收缩的同时，整体向北极基态 $+\vv{e}_3$ 上漂 | 仅北极基态单点 $+\vv{e}_3 = (0, 0, 1)$ |

（注：在**零噪声恒等端点** $c = 1$、$p = 0$、$\lambda = 0$ 或 $\gamma = 0$ 处，上述信道均退化为恒等映射 $\vv{r}' = \vv{r}$，不动点集扩展为**整颗布洛赫球**。在 $p = 1$ 端点，比特翻转映射给出绕 $X$ 轴的幺正 $\pi$ 旋转 $\rho \mapsto X\rho X$、$\vv{r}' = (r_x, -r_y, -r_z)$，保持两态间距离；在 $\gamma = 1$ 端点，振幅阻尼则一步将整颗布洛赫球重置到纯态北极 $+\vv{e}_3 = (0, 0, 1)$，任意两态的输出距离均为零。）

::: {.figure src="ch04-noise-gallery"}
**四种噪声，四种变形。** 四幅都是布洛赫球的竖直截面，强度都取一半（$c = \frac{1}{2}$、$p = \frac{1}{4}$、$\lambda = \frac{1}{2}$、$\gamma = \frac{1}{2}$），按上表的仿射公式画出：细线是原来的球皮，青色是作用一次后的像，紫色是不动的部分。相位阻尼收成竖直的窄椭圆，竖轴不动；比特翻转压成扁平的横椭圆，$x$ 轴不动；去极化缩成半径一半的同心圆，只有球心不动；振幅阻尼缩小并整体上移，顶端贴着北极，只有北极不动。表中的仿射形式是文献结果，未在本书形式化。
:::

顺着最后一行追问：固定朝向基态北极的轴向漂移之后，**横向最多能保留多少长度，椭球才不会刺穿球皮？** 下文以 $\lambda$ 表示两个横向坐标共有的实数保留因子，考察

$$
F_{a,\lambda}(x,y,z) = (\lambda x,\,\lambda y,\,az+1-a), \qquad 0 \le a \le 1.
$$

北极 $(0,0,1)$ 始终不动。与前文的参数对应是 $a=1-\gamma$：展开已有的轴向坐标，恰有 $\operatorname{dampedAxis}(1-a,z)=az+1-a$。把它解释为弛豫时，我们限定在**零温、朝固定北极的仿射轴向漂移与各向同性横向因子**这一模型内。

::: {.theorem #thm-north-pole-ball-criterion title="固定北极的仿射映射保持整个闭单位球的充要条件" lean="D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff"}
设 $a,\lambda \in \mathbb{R}$ 且 $0 \le a \le 1$，$\lambda$ 可取任意符号。以下两条等价：

1. 对任意实数 $x,y,z$，只要 $x^2+y^2+z^2 \le 1$，就有

   $$
   (\lambda x)^2+(\lambda y)^2+(az+1-a)^2 \le 1.
   $$

2. $\lambda^2 \le a$。
:::

::: proof
充分性先把横向平方半径压到轴向因子之下：由 $\lambda^2 \le a$ 及输入点在球内，

$$
\begin{aligned}
&\lambda^2(x^2+y^2)+(az+1-a)^2 \\
&\quad\le a(1-z^2)+(az+1-a)^2 \\
&\quad=1-a(1-a)(1-z)^2 \le 1.
\end{aligned}
$$

必要性给出一个具体的逃逸点。若 $\lambda^2>a$，取

$$
\begin{gathered}
\delta=\frac{\lambda^2-a}{\lambda^2+1}, \\
(x,y,z)=\bigl(\sqrt{\delta(2-\delta)},\,0,\,1-\delta\bigr).
\end{gathered}
$$

因 $0\le a$，有 $0<\delta\le1$，故该点为实数点且 $x^2+y^2+z^2=1$。利用 $\delta(\lambda^2+1)=\lambda^2-a$ 及 $\delta(\lambda^2-a^2)\le\delta(\lambda^2+1)$，其像超出球皮的平方半径为

$$
\begin{aligned}
&\norm{F_{a,\lambda}(x,0,z)}^2-1 \\
&\quad=\delta\bigl[2(\lambda^2-a)-\delta(\lambda^2-a^2)\bigr] \\
&\quad\ge\delta(\lambda^2-a)>0.
\end{aligned}
$$

因此，北极球冠的直觉对应着整个闭球上的精确判据，端点 $a=0$ 与 $a=1$ 也包含在内。完整证明由 Lean 内核检查。
:::

[@thm-north-pole-ball-criterion] 给出的是横向上界 $|\lambda|\le\sqrt a$。表中的纯振幅阻尼取 $\lambda=\sqrt a$，即 $\lambda^2=a$，恰好饱和；额外横向衰减则可以使不等式严格成立。特别地，$a=0$ 时必须 $\lambda=0$，$a=1$ 时则允许且只允许 $|\lambda|\le1$。这里判定的是球的保持性；完全正性还涉及扩展系统上的条件，不能只凭这个实坐标判据认定。

::: {.figure src="ch04-ball-criterion"}
**横向能留多少，由轴向因子说了算。** 绿色的区域是 [@thm-north-pole-ball-criterion] 的充要条件 $\lambda^2 \le a$，由两支抛物线 $\lambda = \pm\sqrt{a}$ 围成，上边界正是纯振幅阻尼 $\lambda = \sqrt{a}$；它在 $a = 0$ 处收成一点，在 $a = 1$ 处张开到 $|\lambda| \le 1$。区域外品红的点 $(a, \lambda) = (0.15, 0.75)$ 对应的映射把球的一部分推出了球皮。
:::

现在把**同一个映射**中的两个因子取为指数包络。对任意正实数 $T_1,T_2,t$，令

$$
a=e^{-t/T_1}, \qquad \lambda=e^{-t/T_2}.
$$

此时 $0<a<1$。由上述定理，$F_{a,\lambda}$ 将整个闭单位球映入自身，当且仅当

$$
\begin{aligned}
&e^{-2t/T_2}\le e^{-t/T_1} \\
&\quad\Longleftrightarrow -\frac{2t}{T_2}\le-\frac{t}{T_1} \\
&\quad\Longleftrightarrow T_2\le2T_1.
\end{aligned}
$$

第一步用实指数函数的严格单调性，第二步约去正时间并乘以正的时间常数。这是定理在给定指数包络下的直接特例解释。$t=0$ 时，无论正的 $T_1,T_2$ 取何值，两个因子都等于 $1$，映射都是恒等映射；单靠零时刻不约束任何速率。

::: {.viz src="bloch-noise" preset="wide" height="500"}
**横向留太多，就刺穿球皮。** 取 $T_2 = 6T_1$，即 $\lambda = a^{1/6} > \sqrt{a}$：青色的像在北极附近从侧面鼓出玻璃球壳画的单位球，品红的部分已不在球里，品红点标出离球心最远的像点。改回 $T_2 \le 2T_1$，品红随即消失（[@thm-north-pole-ball-criterion]）。
:::

::: {.remark #rem-relaxation-envelope-literature title="指数包络与速率相加的物理条件（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** Krantz 等的 *A quantum engineer's guide to superconducting qubits*（[arXiv:1904.06560v3](https://arxiv.org/abs/1904.06560v3)，式 40–43）在 Bloch–Redfield 描述中引入纵向与横向弛豫速率，并在式 41 相邻文字中明确指出：把横向速率写成各速率之和，预设各个衰减函数为指数型。这为这里的弛豫模型提供物理背景。

若在纯振幅阻尼之外，再**额外假设包络相乘**，并给定非负的纯退相干速率 $k\ge0$，即

$$
e^{-t/T_2}=e^{-t/(2T_1)}e^{-kt},
$$

则在 $T_1,T_2,t>0$ 时取对数并约去 $t$，得到

$$
\frac{1}{T_2}=\frac{1}{2T_1}+k\ge\frac{1}{2T_1}.
$$

当 $k>0$ 时可记 $k=1/T_\varphi$；$k=0$ 对应纯振幅阻尼的饱和情形。包络乘积律是额外的物理假设，几何保持性本身不推出它。这里的 $T_2\le2T_1$ 对应固定北极、零温仿射漂移、各向同性横向收缩及指数包络的上述范围，不外推为任意环境或任意非指数衰减的定律。
:::

三种噪声的形变各不相同，却有一个共同点：它们都不会把球里的两个点拉得更远。这句话有精确的形式。两态之间的**迹距离**是 $T(\rho, \sigma) = \frac{1}{2}\lVert\rho - \sigma\rVert_1$；对单比特，$\rho - \sigma = \frac{1}{2}(\vv{r} - \vv{s})\cdot\vv{\sigma}$ 的两个本征值是 $\pm\frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$，所以

$$
T(\rho, \sigma) \;=\; \frac{1}{2}\,\lVert\vv{r} - \vv{s}\rVert ,
$$

即两根布洛赫矢量之间欧氏距离的一半（这一步是手工计算）。

::: {.definition #def-trace-distance title="有限维密度态之间的迹距离" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance"}
设 $\iota$ 为有限类型（`[Fintype ι]`、`[DecidableEq ι]`）。对两个密度态 $\rho, \sigma$（`DensityState ι`：半正定且迹为 $1$ 的 $\iota \times \iota$ 复矩阵），定义

$$
\operatorname{traceDistance}(\rho, \sigma) \;=\; \frac{1}{2}\,\operatorname{traceNorm}(\rho - \sigma),
$$

其中 `traceNorm` $M$ 是 $\sqrt{M^{\dagger}M}$ 的迹的实部。
:::

::: {.proposition #prop-trace-distance-metric-contraction title="迹距离的界与同一有限指标类型上量子信道下的不增性" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_nonneg D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_symm D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_triangle D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_le_one D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract"}
设 $\iota$ 为有限类型，$\rho, \sigma, \tau$ 为 $\iota$ 上的密度态，沿用 [@def-trace-distance] 的记号并简记 $T = \operatorname{traceDistance}$。则：

1. **非负**：$0 \le T(\rho, \sigma)$；
2. **对称**：$T(\rho, \sigma) = T(\sigma, \rho)$；
3. **三角不等式**：$T(\rho, \tau) \le T(\rho, \sigma) + T(\sigma, \tau)$；
4. **有界**：$T(\rho, \sigma) \le 1$；
5. **信道收缩**：对输入输出均以 $\iota$ 为指标的任意量子信道 $\Phi$（`QuantumChannel ι ι`，即迹保持的完全正映射），

   $$
   T\bigl(\Phi(\rho),\ \Phi(\sigma)\bigr) \;\le\; T(\rho, \sigma).
   $$
:::

::: proof
前四条来自迹范数的非负性、$\operatorname{traceNorm}(-M) = \operatorname{traceNorm}(M)$、迹范数的三角不等式（`traceNorm_add_le`），以及半正定矩阵的迹范数等于它的迹。第 5 条：把厄米矩阵 $\rho - \sigma$ 作若尔当分解 $\rho - \sigma = P - M$，其中 $P, M$ 分别是它的正部与负部，均半正定，且迹范数等于 $\operatorname{Tr} P + \operatorname{Tr} M$（`trace_norm_jordan_mass`）。信道把半正定矩阵送到半正定矩阵并保持迹，故 $\operatorname{traceNorm}\bigl(\Phi(P) - \Phi(M)\bigr) \le \operatorname{Tr}\Phi(P) + \operatorname{Tr}\Phi(M) = \operatorname{Tr} P + \operatorname{Tr} M$。两端除以 $2$ 即得结论。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bloch-distance-contraction title="三种单比特噪声下的距离收缩：数值核对（含文献说明，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述一般退相位、振幅阻尼与去极化三种单比特信道的标准布洛赫球仿射映射形式及单比特欧氏距离换算 $T(\rho, \sigma) = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert_2$ 属于标准量子信息教材算例，用于具体数值例示上文经内核验证的一般信道迹距离收缩命题 [@prop-trace-distance-metric-contraction]。

取三种信道的布洛赫形式，参数都取 $\frac{1}{2}$：退相位 $(x, y, z) \mapsto \bigl(\frac{x}{2}, \frac{y}{2}, z\bigr)$；振幅阻尼 $(x, y, z) \mapsto \bigl(\frac{x}{\sqrt{2}}, \frac{y}{\sqrt{2}}, \frac{1 + z}{2}\bigr)$；去极化 $\vv{r} \mapsto \frac{1}{2}\vv{r}$。考察两对态：北极与 $+x$（$\vv{r} = (0, 0, 1)$，$\vv{s} = (1, 0, 0)$），以及 $+x$ 与 $-x$。迹距离按 $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$ 计算：

| 信道 | 北极与 $+x$ | $+x$ 与 $-x$ |
| :---: | :---: | :---: |
| 作用之前 | $0.7071$ | $1.0000$ |
| 退相位 | $0.5590$ | $0.5000$ |
| 振幅阻尼 | $0.4330$ | $0.7071$ |
| 去极化 | $0.3536$ | $0.5000$ |

每一格都不超过第一行，与 [@prop-trace-distance-metric-contraction] 的结论 5 一致。振幅阻尼一行的第一个数另用 Kraus 算子直接作用于密度矩阵再求迹范数复算，同为 $0.4330$。注意振幅阻尼把整个球推向北极，球心并不固定，但任意两点之间的距离照样不增。
:::

::: {.film src="noise-in-the-ball"}
**球只缩不长（2 分 19 秒）。** 纯态在球皮上，混合态在球里面，每一种噪声都一次挪动整颗球。捏合把矩阵为 $\bigl(\begin{smallmatrix} 0.9 & 0.3 \\ 0.3 & 0.1 \end{smallmatrix}\bigr)$ 的态横着推到竖轴上，平方大小 $1$ 分成青色留下的 $0.82$ 与品红丢掉的 $0.18$（[@thm-pinching-pythagorean]）；相位阻尼取 $c = 0.6$，非对角元一步步变成 $0.180$、$0.108$、$0.065$、$0.039$，球瘦成一根雪茄（[@prop-phase-damping-decay]）。能量耗散取 $\gamma = 0.36$：高度变为 $0.64z + 0.36$，宽度缩到 $0.8$ 倍，琥珀色的南极爬到 $-0.28$，紫色的北极不动。固定北极与这条高度规则，宽度因子取 $0.9$ 时点 $(0.6, 0.8)$ 的像平方半径为 $1.052$，品红的部分刺出球皮；整颗球不出界当且仅当 $\lambda^2 \le a$（[@thm-north-pole-ball-criterion]），$0.8^2 = 0.64$ 恰好压在边界上。相距 $0.8$ 的一对态，捏合后仍相距 $0.800$，能量耗散后相距 $0.512$（[@prop-trace-distance-metric-contraction]）。开头整颗球一起挤压的画面是示意，振幅阻尼在球上的形式是文献结果，迹距离等于两点距离的一半是手工计算，留在球里也不等于就是信道；片中数字都是屏幕上的计算。
:::

所以“混合态是球肚子里截短的线”可以说成一条不依赖具体噪声模型的定理：信道可以平移、压扁、旋转这只球，唯独不能把其中任何两点拉开。可分辨性只会丢，不会凭空长出来。

::: {.viz src="bloch-noise" preset="distance" height="500"}
**两个态只会靠近。** 例中第一对态：北极的 $\rho$ 与 $+x$ 的 $\sigma$，振幅阻尼走一步（$\gamma = \frac{1}{2}$）。$\rho$ 不动，$\sigma$ 被拉向北方；白线标出的距离从虚线的 $0.707$ 缩到 $0.433$（[@prop-trace-distance-metric-contraction]）。
:::
