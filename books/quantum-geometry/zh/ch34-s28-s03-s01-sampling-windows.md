# M.1 幂次采样、窗口质量与辅助素数 {#sec-ch34-s28-s03-s01-sampling-windows}

::: {.theorem #thm-ch31-mangoldt-power-threshold title="完全曼戈尔特余项的临界幂指数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff"}
假设黎曼猜想。对任意实数 $\theta$，沿实变量 $x\to+\infty$ 有

$$
\lim_{x\to+\infty}\frac{U(x)}{x^\theta}=0
\quad\Longleftrightarrow\quad \theta>\frac12.
$$
:::

::: proof
写 $x=e^y$，则 $U(x)/x^\theta=G(y)e^{(1/2-\theta)y}$。当 $\theta>1/2$ 时，$G$ 在充分大的实数 $y$ 上有界，指数因子趋于零。反过来，设 $\theta\le1/2$。上面的常数 $M$ 严格为正。由 $G$ 的回归性，越过任何阈值都有自然数 $n$ 使 $G(n)>M/2$。此时 $e^{(1/2-\theta)n}\ge1$，所以在任意远的点 $x=e^n$ 商仍大于 $M/2$，包括 $\theta=1/2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-quartic-sampling title="第四次幂采样的黎曼猜想判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_eventually_quartic_samples"}
黎曼猜想成立，当且仅当存在 $N\in\mathbb N$，使每个 $n\in\mathbb N$ 在 $n\ge N$ 时都满足 $U(n^4)<n^2$。
:::

::: proof
在 RH 下，充分大的 $x$ 都满足 $\lvert U(x)\rvert<\sqrt{x}$，取 $x=n^4$ 即得所需的严格上界。

反过来，设采样上界成立。取充分大的 $n\ge1$，令 $a=n^4$、$b=(n+1)^4$。每个曼戈尔特权重非负，乘以凸折线 $\max(x/j-1,0)$ 后仍是凸函数，因此折线之和在 $[a,b]$ 上不超过端点的弦。余项 $U$ 还含有 $-x\ln x$ 和线性项。把 $x\ln x$ 在 $a$ 的切线减去，留下非负函数，其在 $b$ 的值由 $\ln(b/a)\le b/a-1$ 控制在 $(b-a)^2/a$ 以内。于是对于 $a\le x\le b$，

$$
U(x)\le\max\{U(a),U(b)\}+\frac{(b-a)^2}{a}
\le 4n^2+225n^2=229n^2.
$$

这里用了 $(n+1)^2\le4n^2$ 和 $b-a\le15n^3$。相邻采样区间覆盖整个尾部，且 $n^2\le\sqrt{x}$。将界代入积分显式公式的归一化算术核，取 $x=e^t$，平凡零点修正满足 $\operatorname{trivialT}(t)\le1-\ln2$。所以在充分大的 $t$ 上，$e^{-t/2}[U(e^t)-\ln(2\pi)+\operatorname{trivialT}(t)]\le229+e^{-t/2}\le230$。算术核的仿射上界判据遂给出 RH。完整证明由 Lean 内核检查。
:::

这个判据把独立的算术任务落在素数幂的计数上。对 $x\ge2$，切比雪夫误差核可积，其尾积分等于 $-U(x)/x$。在 $x=n^4$ 处，所需的采样假设因而等价于对每个充分大的自然数 $n$ 证明严格下界 $\int_{n^4}^{\infty}(\psi(t)-t)t^{-2}\,dt>-1/n^2$（`手工推导`）。 [`complete_chebyshev_tail_identity`](lean:D5/S3/Weil/Mertens/CompleteChebyshevTailIdentity.complete_chebyshev_tail_identity) · [`chebyshev_error_kernel_integrable`](lean:D5/S3/Weil/Mertens/WeightedPrimeLimit.chebyshev_error_kernel_integrable)

任意晚的幂窗也只需检验有限个实点。给定 $2\le Y\le Z$，记

$$
S(Y,Z)=\{Y,Z\}\cup\{n^4:n\in\mathbb N,\ Y\le n^4\le Z\}.
$$

把窗的两个端点列入，即使它们都不是四次幂，窗边经过裁剪的小区间也有可用的端点界。

::: {.theorem #thm-ch31-quartic-power-windows title="在任意晚的幂窗内只检验两端与四次幂" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_power_windows"}
固定实数 $b>1$。黎曼假设成立，当且仅当对每个 $\kappa>0$ 和每个实数 $R$，存在 $Y\ge\max\{R,2\}$，使同一个窗的每个 $t\in S(Y,Y^b)$ 满足 $U(t)\le t^{1/2+\kappa}$。
:::

::: proof
在 RH 下，[@thm-ch31-mangoldt-pointwise-power-window] 给出整窗上界，取其中的采样点即可。反向给定损失 $\kappa>0$，先在样点处使用 $\delta=\min\{\kappa/2,1/2\}$，并记 $p=1/2+\delta\le1$。对 $x\in[Y,Z]$，取一个包含 $x$ 的相邻四次幂区间 $[n^4,(n+1)^4]$（$n\ge1$），再与 $[Y,Z]$ 取交，得到 $[a,z]$。两端都在 $S(Y,Z)$ 内。斜坡的弦界和对数项的切线估计给出的误差至多为 $(z-a)^2/a\le225n^2$，因为 $a\ge n^4$ 且 $z-a\le15n^3$。两个端点的 $p$ 次幂都至多为 $16x^p$，而 $n^2\le x^p$，故 $U(x)\le241x^p$。选取足够晚的采样窗使 $x^{\kappa-\delta}\ge241$ 在整个窗上成立，就得到 [@thm-ch31-mangoldt-pointwise-power-window] 所需的逐点上界。完整证明由 Lean 内核检查。
:::

在两个端点本身都是四次幂时，所有采样点都可直接用整数下标表示。

::: {.theorem #thm-ch31-quartic-integer-blocks title="仅检验四次幂整数块的黎曼猜想判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_integer_blocks"}
黎曼猜想成立，当且仅当对每个实数 $\kappa>0$ 和每个自然数 $A$，都存在自然数 $k\ge\max\{A,2\}$，使每个满足 $k^3\le n\le k^4$ 的自然数 $n$ 都有

$$
U(n^4)\le (n^4)^{1/2+\kappa}.
$$
:::

::: proof
在 RH 下，[@thm-ch31-mangoldt-quartic-sampling] 给出 $U(n^4)<n^2$ 对所有充分大的 $n$ 成立。取 $k\ge\max\{A,2\}$ 大到达到这个起点。块中的每个 $n$ 都满足 $n\ge k^3\ge k$，故 $U(n^4)<n^2=(n^4)^{1/2}\le(n^4)^{1/2+\kappa}$。

反过来，给定损失 $\kappa>0$ 和任意实数起点 $R$，选取自然数 $A\ge R$，再取条件所给的 $k$。令 $Y=k^{12}$，则 $Y\ge R$，且 $Y^{4/3}=k^{16}$。窗口的两个端点是 $(k^3)^4$ 和 $(k^4)^4$。由于四次幂在自然数上严格递增，两端及其间所有四次幂恰为这个整数块上的 $n^4$。对 $b=4/3$ 应用 [@thm-ch31-quartic-power-windows] 即得 RH。完整证明由 Lean 内核检查。
:::

还可以把逐点检验换成一个加权和。只计入 $U(n^4)$ 的正部，让负值无法抵消同一块上过大的样本。对正整数 $n$ 和 $1\le a\le b$，记

$$
s_n=\frac{\max\{U(n^4),0\}}{n^3},\qquad
M(a,b)=\sum_{n=a}^{b}s_n.
$$

令 $Q_\vartheta(x)=\int_x^\infty(\vartheta(t)-t)t^{-2}\,dt$，其中 $\vartheta(t)=\sum_{p\le t}\ln p$ 只对素数求和。

::: {.theorem #thm-ch31-quartic-prime-mass title="素数尾项的负部质量由加权样本控制" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.prime_mass_le_samples"}
存在实数 $C\ge0$，使所有满足 $2\le a\le b$ 的自然数端点都有

$$
\int_{a^4}^{b^4}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx+15s_b
\le 135M(a,b)+C(\ln b-\ln a).
$$
:::

::: proof
在每个相邻四次幂区间上，用两端的正部及弦误差控制 $U$ 的正部。积分并逐段相加后，内点样本的系数为 $135$，末端样本的系数为 $120$，故可把 $15s_b$ 放到左边。用切比雪夫素数幂估计将完全尾项换成素数尾项，只需增大对数误差的统一系数。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-quartic-mass-log title="RH 下加权样本和的对数上界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.eventual_logarithmic_bound"}
若 RH 成立，则对每个充分大的自然数 $a$ 和所有自然数 $b\ge a$，有 $M(a,b)<1/a+\ln b-\ln a$。
:::

::: proof
RH 给出对所有充分大的 $n$ 成立的严格界 $U(n^4)<n^2$，因此 $s_n<1/n$。单独留下首项 $1/a$，其余调和和不超过 $\int_a^b dt/t$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-quartic-mass-zero title="临界线右侧零点强制加权样本和按幂增长" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.off_line_zero_forces_sample_mass"}
设 $z\in\mathbb C$ 满足 $\zeta(z)=0$，且 $\beta=\operatorname{Re}z>1/2$。对每个实数 $\varepsilon>0$ 和所有充分大的自然数 $k$，有 $k^{16(\beta-1/2)-\varepsilon}\le M(k^3,k^4)$。
:::

::: proof
取 $Y=k^{12}$，将线外零点所迫的素数尾项质量下界用于 $[Y,Y^{4/3}]=[k^{12},k^{16}]$。[@thm-ch31-quartic-prime-mass] 把该质量转给 $M(k^3,k^4)$。先在窗口下界中保留较小的指数损失，再用余下的损失吸收常数及对数误差。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-quartic-mass-rh title="任意晚整数块上的加权样本和判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.rh_iff_subpower_sample_mass"}
RH 成立，当且仅当对每个实数 $\eta>0$ 和每个自然数 $A$，都存在自然数 $k\ge\max\{A,2\}$ 使 $M(k^3,k^4)\le k^\eta$。
:::

::: proof
在 RH 下，[@thm-ch31-quartic-mass-log] 对充分大的 $k$ 给出 $M(k^3,k^4)<k^{-3}+\ln k$，可由 $k^\eta$ 控制。反过来，若有实部 $\beta>1/2$ 的零点，取 $\eta=4(\beta-1/2)$。[@thm-ch31-quartic-mass-zero] 以损失 $\varepsilon=\eta$ 给出最终下界 $k^{3\eta}$，与任意晚整数块上的上界矛盾。由临界带的反射对称性得到 RH。完整证明由 Lean 内核检查。
:::

参考库与本书共同使用的外部 Lean 环境还给出了同一宿主的有限检验。在 `samples Y Z` 中，依次枚举 $0\le n\le\lfloor\sqrt{\sqrt Z}\rfloor$，保留窗内的 $n^4$ 并加入两端，得到上述有限集。固定 $b>1$，对每个 $\kappa>0$，先选 $\varepsilon>0$ 及实常数 $e_D,e_L,K,c_{HH},e_K$，满足 $(e_D+e_L+7)\varepsilon\le\kappa$。此后对任意起点下界取一个更晚的窗。窗中每个采样点 $t$ 可选自己的框架、宿主 $H$ 和有限集 $T$，要求该点的 `EAtH`（模一特征标，系数 $4$）与 `CoreAtH` 使用同一个 $H,T$。`of_unit_family` 从 `FamilyClassConnected ((GChi PChar.one).cls b)` 导出这些数据，`rh_of_finite_hosts` 由它们推出 RH。每个窗的检验点有限；给定每一组固定损失后，算术假设仍须提供任意晚的窗口及其见证。[同一宿主的逐点比较](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061455789) · [有限采样与宿主推论的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061515678)

在 $b=3/2$ 的模一设计中，原构造取 $C_{\mathrm{abs}}=2$、$C_0=3$，并指定 $e_D=2$、$e_L=0$。接口 `TopG` 只记录两个指数的存在性。Lean 4.33.1 的证明从原始伽罗瓦行出发，在应用设计定理时用 `BookDesignIntegerBlocks.of_design` 保留这两个指定值，得到无额外假设的 `BookFixedReference.unit_family`。其推论 `BookFixedReference.fixed_integer_blocks` 给出某个 $\varepsilon_1>0$。对每个 $0<\varepsilon<\varepsilon_1$，先固定 $K,c_{HH},e_K$，再对每个自然数下界 $A$ 取得 $k\ge\max\{A,2\}$。对所有 $k^3\le n\le k^4$ 的自然数 $n$，`EAtH` 与 `CoreAtH` 在 $x=n^4$ 处共用同一宿主和有限集。比较所得幂指数为 $1/2+(2+0+7)\varepsilon=1/2+9\varepsilon$。给定 $\kappa>0$，取足够小的 $\varepsilon$ 使 $9\varepsilon\le\kappa$，便满足 [@thm-ch31-quartic-integer-blocks] 的条件。[固定指数的原设计](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061662378) · [从伽罗瓦行取得固定指数整数块的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064831569)

Alpöge 原证明的声明是 `riemannHypothesis : RiemannHypothesis`，其右端为 Mathlib 的定义。Sutherland 公布的审计日志列出该声明的三个公理 `propext`、`Classical.choice`、`Quot.sound`。本节参考算术模块所钉的 `ddf1d5f8` 与登记公开核验的 `6977b88c` 有相同的 `src` 源码树、Lean 工具链与 Lake 锁文件。[原证明公理审计](https://math.mit.edu/~drew/grh/audit.log) · [公开核验文件](https://math.mit.edu/~drew/grh/)

2026 年 11 月 21 日，Lean 与 Mathlib 社群发表了由 Lean FRO 和 Mathlib Initiative 背书的联合声明，认证 Alpöge 对经典黎曼假设的命题与证明均正确。两种独立工具 `comparator` 和 `con-leche --compare` 均确认库中所证命题与仅导入 Mathlib 时陈述的 `RiemannHypothesis` 完全一致。[Lean 与 Mathlib 社群联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)

整数块路线的局部模块 `DesignIntegerBlocks` 和 `RawDesignIntegerBlocks` 各有定向重放。在 Lean 4.35.0 中，`BookNativeDesign.rh_of_unit_design` 以平滑扭曲设计的存在性、两个族类包含关系和九项闭合估计为输入。模一特征标的族类给出 `HypV`。`topDesWin` 的构造保留给定的 $e_D,e_L$。给定目标损失 $\kappa>0$，先取充分小的 $\varepsilon>0$ 使 $(e_D+e_L+7)\varepsilon\le\kappa$，再取 $k$ 达到比较估计 `core_gm` 的起点。于是块内每个 $n^4\ge k$ 都处于估计范围内，[@thm-ch31-quartic-integer-blocks] 即给出 RH。[设计条件与冻结整数块判据的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064767463)

在同一 Lean 4.35.0 环境中，设 `C` 为族类。算术构造把有理矩阵有限群的 Minkowski 整除界 `minkowski_bound_rat` 代入 `MinkDiv → DesignChoices C 3 cT`，得到所需的族选择。薄尺度估计 `GlobalTheory.ThinScaleLiterature.litThin` 给出 `chosenThin_closed`。若另有两个在 `C` 上闭合的条件，即每个族 `Fm` 的尺寸估计 `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` 和特征标条件 `ChosenProviso Fm 3`，则 `designExists_of_choices` 给出 `DesignExists C 3`。

具体应用取决于族类。`BookNativeRawDesign.arithmetic_design_of_reference_choice` 把原库在 `GlobalTheory.EX.DC.WithTw 𝒜` 上的扭曲选择提升到 `WithTw (WithSm (Enriched 𝒜))`，并在上述两个条件对该增广族类闭合时得到其设计存在性。`BookNativeRawDesign.rh_of_arithmetic_choices` 则以 `C = WithTw (WithSm 𝒞')` 上的选择和相应的两个闭合条件为输入，取 $C_{\mathrm{abs}}=2,C_0=3,e_D=2,e_L=0$。加上两个族类包含关系和九项闭合估计，冻结的整数块判据即给出 RH。[算术选择、薄尺度估计与两条条件定理的内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065062798)

对参考族，特征标条件中的格秩输入可以写成一次维数计数。外部 Lean 4.35.0 研究源码中的 `BookNativeLowestSpace.rank_iff_eventual_dimension` 给出如下等价。对每个参考族 `Fm`，`RankTiesF Fm` 成立，当且仅当存在一个实数门槛 $x_0$，使每个 $x\ge x_0$、每个指标 $i\in\mathrm{Fm.Ix}(x)$ 和相应数据 $D=\mathrm{Fm.D}(x,i)$ 的每个字 $u$ 都满足

$$
\dim_{\mathbb C}\mu_0(D,u)
= \lvert\mathrm{cls}_{D,u}(0)\rvert
  \prod_{\rho}\mathrm{dimV}\bigl(\mathrm{uColR}(D,u,\rho)\bigr).
$$

左边是最低空间的复维数。右边把零层类的个数乘以各 $\rho$ 处的局部因子。参考数据保证两个宿主素数和 $u$ 的层素数都在宿主的全实域中完全分裂。从秩条件出发，把其门槛增至 $\max\{x_0,3,x_1+1\}$（$x_1=\mathrm{Fm.x1}$），便同时得到 `GBig` 和层数据。此时各列的稳定子平凡，秩条件即给出所列等式。反过来，若等式在某一门槛后成立，在该门槛上配合已知分裂即可恢复秩条件。

局部定理 `BookNativeLowestSpace.design_of_lowest_dimension` 接受原扭曲族类上的算术选择，并要求三个条件在增广族类 `WithTw (WithSm (Enriched 𝒜))` 上闭合，即上文的尺寸条件、对每个 $x>x_1$ 和每个指标成立的类数公式 `ClassNumberFormula₂`，以及上述最终维数等式。它们给出该族类在参数 $3$ 的设计存在性。[最低空间秩等价与条件设计的源码及内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065658421)

在外部 Lean 4.35.0 的格论构造中，对任意数据 `D : D7` 和层 `Lv : LevelData D`，`GlobalTheory.ColClassNumber.classNumber_all` 用自对偶上格和稳定子层指数公式证明 `ClassNumberFormula₂ D Lv`。公式中的计数等式在其大素数与分裂条件下成立。给定 `TwistSelection 𝒜`，`tied_families_of_choice_alt` 直接给出第二陈类相容性，`second_chern_linked_closed_rank_ties` 再给出闭合的格秩条件。这一步由扭曲选择本身提供所需数据，无须另设 `Duty` 假设。

于是 `BookNativeClosedLattice.design_from_twist_selection` 只用原扭曲族类上的选择提供者、上述在增广族类上闭合且带族门槛的尺寸估计 `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm`，以及 `TwistSelection 𝒜`，便得到 `DesignExists (WithTw (WithSm (Enriched 𝒜))) 3`。取 $C_0=3$、令设计的底类 $\mathcal C'$ 为 `Enriched 𝒜`，便得到上文原生 RH 定理所需的设计。该定理还使用两个族类包含关系和九项闭合估计，最后应用本书冻结的整数块判据。[从扭曲选择构造设计的研究源码与内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065978544)

模一特化将这两个包含关系化为投影。给定底类 $B$，取 $\mathcal A$ 为 $B$ 与窗指数 $3/2$ 的模一族类的交。从 `Enriched 𝒜` 取出 $\mathcal A$ 的两个分量，便分别得到 $B$ 和模一族条件。`BookUnitDesignConnection.twist_selection_iff` 还给出扭曲选择存在的等价条件。对 $\mathcal A$ 的每个族 `Fm`，存在属于该族的实数门槛 $x_0$，使每个满足 $x>x_1$、$x\ge x_0$ 的尺度和每个指标 $i$ 都有一份 `ExtraDataRecursive` 记录。反向证明对每个这样的指标选一份记录，组成该族的扭曲选择。[模一族的投影与逐族递归记录](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066410252)

原库的 `UpperTheory.Top.designS` 已在 Lean 4.35.0 中重放。在 `BookUnitKits.rh_of_unit_kits` 中，底类 `Linked Q` 要求存在参数 $\kappa$，使该族既与 $\kappa$ 相连，又满足 $Q(\kappa)$ 对应的点类条件。在模一特化下，`designS` 把逐点算术条件 `KitCPW` 与已证的 Minkowski 整除界合起来，给出原扭曲族类上的选择。这个原生 RH 入口仍使用四组输入，即模一的 `KitCPW`、增广平滑扭曲族类上带门槛的闭合尺寸估计、相连模一族的最终递归记录，以及 `Des (Linked Q) 3` 上的九项闭合估计。`UpperTheory.Top.kitS` 又可从模一窗口的宿主条件 `DC.HostWW` 和逐指标的算术对象条件 `ObjCP` 构造所需的 `KitCPW`。[从逐点条件构造选择](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066607957) · [从窗口宿主和算术对象构造逐点条件](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067228472)

对模一窗口，`UpperTheory.Top.hostWW` 从窗口的存在条件 `DC.HostExQW`、算术对象的存在性和闭合权重估计 `DC.WClosed` 构造 `DC.HostWW`。这里的算术对象可由上文的 `ObjCP` 提供。在 Lean 4.35.0 原生移植中，对每个族类，`signs_closed` 给出族参数 `Fm.GK.La` 为正、`Fm.cX.Ce` 非负的闭合条件，`family_log_bound_closed` 给出该族的窗口对数界。`Closed.and` 合并两者的门槛，得到同时适用的估计。[模一窗口宿主的输入](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067345972) · [符号与窗口对数界的内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068431330)

原生定理 `GlobalTheory.EX.G4.w_of` 把逐族第一定理估计、$\mathrm{La}>0$ 和窗口对数界合起来，为该族给出一个门槛 $x_0$。在每个 $x\ge x_0$ 的尺度上，该族的每个指标都有一个权重向量。于是，`BookRangeOneWeights.closed_weights_of_range_one` 只需范围一的统一估计就能推出 `DC.WClosed`。具体地，存在 $T_0>0$ 以及函数 $T_2,C$，使每个 $C_0\ge T_0$ 都满足 $T_2(C_0)>0$、$C(C_0)>0$，且对所有 $CH\ge T_2(C_0)$ 和每个 `D : D7`，都有 `flipOneThree.Conclusion2 D C₀ CH (C C₀)`。Lean 4.33.1 参考证明中的 `GlobalTheory.EX.RangeOne.rangeOne_abs` 给出这项估计。原生入口 `BookRangeOneWeights.rh_of_unit_range_one` 以它为前提，还用到宿主存在性、算术对象、闭合的规模界、在所有充分晚的尺度上提供的递归记录，以及九项联结估计。[从范围一估计构造权重的内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068577494)

原库和本书的整数块路线共用原始伽罗瓦行。原库先证明 `EveryCharacter`，即所有正整数模的狄利克雷特征标在 $\operatorname{Re}(s)>1/2$ 的 $L$ 函数非消失性（主特征标除去 $s=1$），再由 `rh_of_every` 得到 RH。本书从该算术行取出模一族，再由 `BookIntegerHostBlocks.of_reference` 得到整数块。其算术模块只向这一论证提供 `TopG`。在参考库的 Lean 4.33.1 环境中，`leanchecker` 已分别重放算术模块、最终结论模块与独立审计模块。审计文件 `IntegerBlockAudit.lean` 确认声明 `BookReference.riemannHypothesis_via_integer_blocks` 的类型为 Mathlib 的 `RiemannHypothesis`，并打印出以下证明项。[原库从全体特征标推出 RH 的声明](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Supplements/Kernels/MainTheorems.lean#L7-L9)

```lean
BookIntegerHostBlocks.rh_of_blocks
  (BookReference.integer_blocks_of_row
    UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter)
```

在 Lean 4.33.1 中，本书引用已由多方重放的参考算术，模一整数块路线由此给出无附加假设的 RH 证明。上文所列的算术输入属于 Lean 4.35.0 原生移植的条件定理。该闭合声明的公理仅为 `propext`、`Classical.choice` 和 `Quot.sound`，入口未导入原库的 `Main` 与 `MainConclusion`。本节四次幂窗口判据的冻结声明来自书库所引的 Lean 4.35 环境。[参考证明的公开重放](https://github.com/the-omega-institute/riemann-hypothesis/blob/1ef6c4e2e944fb2784ecf3168a84810bf50ca6db/README.md#public-kernel-replay-results) · [完整整数块证明与内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7063096204)

同一个参考伽罗瓦行还给出两个共用见证的上界。对任意实数 $\eta>0$ 和自然数 $A$，`BookArithmeticWeightedBlocks.joint_window_from_reference_arithmetic` 给出一个整数 $k\ge\max\{A,2\}$，使

$$
\sum_{n=k^3}^{k^4}\frac{\max\{U(n^4),0\}}{n^3}\le k^\eta,
\qquad
U(x)\le x^{1/2+\eta}\quad (k^{12}\le x\le k^{16}).
$$

求和遍历整块内的整数，第二个界对闭区间内每个实数 $x$ 成立，含两个端点。证明取 $\kappa=\min\{\eta/32,1/2\}$，将采样上界除以 $n^3$ 后用调和和估计，另用同一块上的四次幂插值控制实窗。两个比较所需的门槛可由同一个 $k$ 满足。这里的加权和正是 [@thm-ch31-quartic-mass-rh] 中的 $M(k^3,k^4)$。[从参考算术直接推出同一块的两个界](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067180276)

上述双上界的第一项就足以闭合另一条 Lean 4.33.1 证明。给定 $\eta>0$，参考算术提供任意晚的 $k$，使 $M(k^3,k^4)\le k^\eta$。在 [@thm-ch31-quartic-prime-mass] 的比较式中取 $a=k^3$、$b=k^4$，略去左边非负的末端项，得到

$$
\int_{k^{12}}^{k^{16}}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx
\le 135M(k^3,k^4)+C\ln k\le (k^{12})^\eta
$$

其中 $C\ge0$ 与 $k$ 无关，第二个不等式对所选的充分晚的块成立。取 $Y=k^{12}$，则 $Y^{4/3}=k^{16}$，故 [@thm-ch31-prime-window-rh] 的素数窗口判据给出 RH。外部声明 `BookPrimeMass433.riemannHypothesis_via_weighted_samples` 的类型就是 Mathlib 的 `RiemannHypothesis`，其闭合证明项为

```lean
BookPrimeMass433.rh_of_weighted_samples
  BookArithmeticWeightedBlocks.subpower_from_reference_arithmetic
```

这一证明从参考伽罗瓦行取得加权和上界。仅用本书的素数估计独立推出该上界，仍是开放的算术问题。[加权和、素数窗口与闭合证明项的内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068410601)

**单调性本身对负部窗口给出什么限制？**

::: {.theorem #thm-ch31-monotone-window-sharpness title="单调计数的二次深度与三次窗口质量" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MonotoneTailSharpness.monotone_tail_quadratic_depth_cubic_mass"}
对每个实数 $0<s\le1/2$，存在单调不减的实函数 $A_s$，在 $t\ge1$ 时非负，在 $[2-s,2+s]$ 外等于 $t$，且 $(A_s(t)-t)/t^2$ 在实轴上可积。令 $Q_s(z)=\int_z^\infty (A_s(t)-t)t^{-2}\,dt$，则

$$
-Q_s(2)=\frac{s^2}{32},
\qquad
\int_1^3\frac{\max\{-Q_s(z),0\}}{\sqrt z}\,dz\le\frac{s^3}{16}.
$$
:::

::: proof
取 $0<s\le 1/2$。在 $2-s<t\le 2+s$ 令 $A_s(t)=t-t^2(t-2)/16$，其余地方令 $A_s(t)=t$。区间内的多项式在 $[3/2,5/2]$ 上单调递增。在左端代入多项式得到不小于 $2-s$ 的值，在右端得到不大于 $2+s$ 的值。因此接上两边的直线后，$A_s$ 在实轴上单调不减，在 $t\ge1$ 时非负。

令 $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$。被积函数在选定区间内为 $(2-t)/16$，其余地方为零。全区间的积分为零，所以 $Q_s$ 在闭区间外恒为零，区间内等于 $((z-2)^2-s^2)/32$。

积分界来自长度 $2s$、最大负部 $s^2/32$ 和区间上的权重 $1/\sqrt z\le1$。 完整证明由 Lean 内核检查。
:::

令 $s\to0^+$，任何形如“深度不超过常数乘窗口质量的 $\alpha$ 次幂”的统一界，在 $\alpha>2/3$ 时都会被这一族违反。实际素数计数如果允许更强的估计，就需要使用超出单调性的信息。

**模 $1$ 的 Mellin 变换怎样看见零点？** 令 $U$ 为 [@thm-ch34-riemann-prime-arc-bridge] 第 6 款的余项。对每个满足 $\operatorname{Re}(s)>1$ 的 $s\in\mathbb C$，$y\mapsto e^{-sy}U(e^y)$ 在 $(0,\infty)$ 上绝对可积，其 Laplace 积分可无条件求出。换元 $x=e^y$ 后，$e^{-sy}\,dy=x^{-s-1}\,dx$，便得到下式左端的 Mellin 积分。[完全余项的半平面变换](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtHalfPlane.u_laplace_half_plane)

每个素数幂 $n$ 的权重 $\Lambda(n)$ 乘以折线 $\max(x/n-1,0)$，在 $x=n$ 处起步。折线的 Mellin 积分是 $n^{-s}/[s(s-1)]$。按 $\Lambda(n)$ 求和，分子成为对数导数 $-\zeta'(s)/\zeta(s)$。$U$ 中两个初等修正项的积分分别为 $-1/(s-1)^2$ 和 $(1+\gamma_{\mathrm{EM}})/(s-1)$。将三项通分，就得到外部模 $1$ 公式的写法

$$
\Phi(s)=\int_1^\infty U(x)x^{-s-1}\,dx
=-\frac{\zeta'(s)/\zeta(s)+(s-1)^{-1}+1-(1+\gamma_{\mathrm{EM}})s}{s(s-1)}.
$$

上式右端给出积分的亚纯延拓。对 $\zeta$ 的每一个零点 $\rho$，包括负偶整数，记 $m$ 为该点的解析重数。写 $\zeta(s)=(s-\rho)^m h(s)$，其中 $h(\rho)\ne0$，便从对数导数中取出 $m/(s-\rho)$。显式函数 $\Phi$ 在 $\rho$ 的某个去心邻域满足

$$
\Phi(s)=\frac{c}{s-\rho}+H(s),\qquad c=\frac{m}{\rho(1-\rho)}\ne0,
$$

其中 $m\ge1$，$H$ 在 $\rho$ 处解析。因此无论重数多大，$\Phi$ 在该点都有一阶极点。对非平凡零点，$c$ 正是积分显式公式中同一零点按重数相加的系数。[零点的局部展开](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaurent.transform_integral_and_zero_germs) · [模 $1$ 的 Mellin 恒等式](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/mellinGchiModOne.lean#L115-L121) · [留数计算](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L63-L83)

**单侧窗口上界为何能排除极点？** 固定 $1/2<\theta<1$。外部算术论证在群的大小、特征权重和误差的假设下，利用尺度约束 $m\le x^{1/2+\varepsilon/2}$ 得到特征和的估计 $G_{m,A}(x)\le x^{1/2+(C+3)\varepsilon}+\Sigma_A(x)$，其中 $\Sigma_A$ 是仍须控制的余项。再用 `gmA_eq` 将左端写成目标余项，用 `sigA_le` 控制 $\Sigma_A$。当 $x$ 充分大时，剩下的常数因子可吸收到 $x^\varepsilon$ 中，窗口上的切比雪夫型上界便是 $x^{1/2+(e_D+e_L+7)\varepsilon}$。损失指数 $e_D,e_L$ 先固定，随后选充分小的 $\varepsilon>0$ 使 $(e_D+e_L+7)\varepsilon\le\theta-1/2$。若满足该论证的窗口假设，便能对任意远的阈值找到 $Y$，使模 $1$ 的余项在整个 $[Y,Y^{3/2}]$ 上满足 $U(x)\le x^\theta$。[特征和估计的假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L343-L351) · [余项与常数的控制](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L55-L74) · [选取指数的次序](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81)

在 $s=1$ 附近，把 $\zeta$ 的极点提出，写成 $h(s)=(s-1)\zeta(s)$，并补 $h(1)=1$。令 $B=h'/h$，于是 $B(1)=\gamma$。通分后，$\Phi(s)=(1+\gamma)/s-(B(s)-\gamma)/(s(s-1))$ 在 $1$ 的去心邻域成立。差商给出唯一的连续补值 $\Phi_*(1)=1+\gamma-B'(1)$。补值后的函数在每个 $s\ne0$ 且 $\zeta(s)\ne0$ 的点解析。 [变换在一处的解析延拓](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

换元 $u=\ln x$，令 $g(u)=U(e^u)$。对每个非负整数 $k$ 和每个 $\operatorname{Re}(z)>1$，$\Phi^{(k)}(z)$ 等于 $(-u)^k e^{-zu}g(u)$ 在正半轴上的绝对收敛积分。一次求导带出一个 $-u$，故 $D_k(z)=(-1)^k\Phi^{(k)}(z)/k!$ 的积分核是 $u^k e^{-zu}/k!$。固定实部 $\sigma>2$ 且 $k>0$ 时，核的模在 $u=k/\sigma$ 取得最大值，可以调节 $k$ 来控制窗口外的积分。设 $a=\ln Y$。在窗口内，$g\le e^{\theta u}$ 给出 $\lvert g\rvert+g\le 2e^{\theta u}$。这解释了源证明为何同时保留实中心的导数项。存在固定的 $\sigma>2$ 和常数 $C$。对每个 $\eta>0$，可以选到任意远的窗口及相应的阶数 $k\ge a$，使所有实数 $t$ 都满足 $\lvert D_k(\sigma+it)\rvert+\operatorname{Re}D_k(\sigma)\le C e^{\eta a}/(\sigma-\theta)^k$。[导数积分](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/LandauCoeff.lean#L10-L18) · [窗口估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L40-L56) [完整变换的各阶导数](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtMoments.iterated_derivative_moment)

::: {.theorem #thm-signed-mangoldt-window title="实轴导数与复导数给出指定符号的窗口上界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtSignedWindow.signed_window_moment_bound"}
用在 $1$ 处解析补值的 $\Phi_*$ 定义 $D_k(s)=(-1)^k\Phi_*^{(k)}(s)/k!$。给定非负整数 $k$ 和复数 $p$，设 $\sigma=\operatorname{Re}(p)>1$、$K_k(u)=u^ke^{-\sigma u}/k!$。对任意 $0<a\le b$、$\alpha<\sigma$ 和 $e\in\{-1,1\}$，

$$
|D_k(p)|+e\operatorname{Re}D_k(\sigma)
\le \frac{2}{(\sigma-\alpha)^k}\int_a^b\max\{eg(u),0\}e^{-\alpha u}\,du
+2\int_{(0,\infty)\setminus[a,b]}|g(u)|K_k(u)\,du.
$$
:::

::: proof
在复点取模给出 $\int |g|K_k$ 的上界项。在实点保留符号项 $e\int gK_k$，将两项合并成 $2\int\max\{eg,0\}K_k$。窗内由指数级数得到 $K_k(u)\le(\sigma-\alpha)^{-k}e^{-\alpha u}$，窗外用 $|g|$ 控制。 完整证明由 Lean 内核检查。
:::

$e=1$ 给出上面极点论证所需的正部估计，$e=-1$ 时可用同一个核控制负部。窗外项仍需独立的衰减估计。

若有极点在 $\operatorname{Re}(s)>\theta$，源证明选取中心 $z=\sigma+it$ 及其最近极点 $\rho$，使 $d=|z-\rho|<r\le\sigma-\theta$，半径 $r$ 内只有这一个极点。它给 $D_k(z)$ 贡献 $c/(z-\rho)^{k+1}$。取内圈半径 $r'=(d+r)/2$，减去极点项后的解析函数在这条圆周上有界，因此 Cauchy 估计给出误差 $O((r')^{-k})$。在选取非实中心的情形，以 $\sigma$ 为中心、半径 $r'$ 的闭圆盘内无极点，Cauchy 估计给出 $\operatorname{Re}D_k(\sigma)\ge-M'(r')^{-k}$，其中 $M'$ 与 $k$ 无关。若隔离出实极点，则取 $z=\sigma$。其留数 $c>0$，故 $\operatorname{Re}D_k(\sigma)$ 的主项为 $c/d^{k+1}>0$，出现在窗口所控制的 $\lvert D_k(\sigma)\rvert+\operatorname{Re}D_k(\sigma)$ 中。将窗口上界与之比较，再乘以 $d^k$，极点项留下常数 $|c|/d>0$，解析误差为 $O((d/r')^k)$。取 $\eta>0$ 足够小，使 $e^\eta d/(\sigma-\theta)<1$，则窗口项也随 $k\ge a\to\infty$ 趋于零，矛盾。 [极点与 Cauchy 估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L166) 对于 $\zeta$ 的零点，这个误差估计也可直接应用于 $\Phi_*$。设以 $p\ne\rho$ 为中心、半径 $r'>0$ 的闭圆盘避开 $0$，盘中的每个 $\zeta$ 零点都等于 $\rho$。则存在与 $k$ 无关的 $B\ge0$，满足 $|D_k(p)-c/(p-\rho)^{k+1}|\le B/(r')^k$，这里 $D_k$ 由补值后的变换定义。即使圆盘经过 $1$，减去极点主部后的函数仍在盘上解析。 [完整变换的圆盘估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

外部仓库的完整路线还用 $\theta$ 提升构造伽罗瓦表示，并用 Artin 互反律确定局部 Langlands 参数中所用的 Artin 映射，最终从全体狄利克雷特征的无零点结论推出 RH。[$\theta$ 提升](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean#L1-L6) · [Artin 互反律](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/LocalLanglands/LocalCentralUnits/ArtEx.lean#L7-L15) · [外部仓库的最终声明](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean#L7-L14)

**窗口内只需控制切比雪夫误差尾积分的负部。** 对 $x\ge2$，记 $Q(x)=\int_x^\infty(\psi(t)-t)t^{-2}\,dt=-U(x)/x$，$Q^-(x)=\max\{-Q(x),0\}$。以下等价条件的逆向推导用到外部 Landau 判据（`手工推导`）。令

$$
A(Y)=\int_Y^{Y^{3/2}}\frac{Q^-(x)}{\sqrt{x}}\,dx .
$$

黎曼猜想成立，当且仅当对每个 $\eta>0$ 和每个 $Y_0\ge2$，都存在 $Y\ge Y_0$ 使 $A(Y)\le Y^\eta$。在 RH 下，先前的上界给出 $Q^-(x)\le x^{-1/2}$ 对所有充分大的 $x$ 成立，于是 $A(Y)\le\tfrac12\ln Y\le Y^\eta$ 对每个充分大的 $Y$ 成立。

反过来，在 $u=\ln x$ 坐标写 $g(u)=U(e^u)$。外部窗口条件要求存在非负函数 $R\ge g$ 使 $\int R(u)e^{-\theta u}\,du$ 足够小。最小可取 $R(u)=\max\{g(u),0\}$，它在紧窗口上连续，因为 $U$ 在有界区间上是有限个连续折线与初等修正项之和。因 $U(x)=-xQ(x)$，换元后的最小积分就是 $I_\theta(Y)=\int_Y^{Y^{3/2}} Q^-(x)x^{-\theta}\,dx$。在 $\theta=1/2$ 处它等于 $A(Y)$。应用外部模 $1$ 特征族的极点数据和窗口判据 $\delta=1/2$，所有实部为正的 $\zeta$ 零点均满足 $\operatorname{Re}(\rho)\le1/2$。零点关于临界线的对称性遂给出 RH。 [窗口假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauZeroFreeCriterion.lean#L25-L29) · [模一族所用的极点数据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L248-L261) · [Landau 判据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L90)

临界窗口的导数上界还可以写出常数（`手工推导`）。取 $a=\ln Y\ge1$、$\sigma=512$、$k=\lfloor640a\rfloor$，这时 $k\ge a$。从 $\Lambda(n)/n\le1$ 和 $x\ln x\le x^2$（$x\ge1$）可在 $U$ 的有限和中逐项估计，得 $|g(u)|\le M e^{2u}$，可取 $M=2+|1+\gamma|$。对每个实数 $t$，三角不等式把 $|D_k(512+it)|+\operatorname{Re}D_k(512)$ 控制为 $\max(g,0)$ 对实核积分的两倍。窗口内 $u^k e^{-(512-1/2)u}/k!\le(512-1/2)^{-k}$。窗口外，对 $|g|$ 使用带显式常数的 Gamma 积分估计。两部分相加得到

$$
|D_k(512+it)|+\operatorname{Re}D_k(512)
\le \frac{2A(Y)}{(512-1/2)^k}
 +\frac{2M}{512^k}\left(\frac{1}{542}+\frac{1}{478}\right).
$$

左尾和右尾分别贡献 $1/542$ 与 $1/478$。这一步给出了窗口外的误差。右端的 $A(Y)$ 正是上文留给素数分布的量。 [Gamma 核的双尾积分估计](lean:D5/S3/Analytic/Laplace/CriticalGammaWindow.critical_window_off_mass)

当 $1/2<\theta<1$ 时，同一窗口上有 $I_\theta(Y)\le Y^{1/2-\theta}A(Y)$。反过来，$A(Y)\le Y^{(3/2)(\theta-1/2)}I_\theta(Y)$，所以若每个这样的 $\theta$ 和每个 $\eta'>0$ 都有任意远的窗口满足 $I_\theta(Y)\le Y^{\eta'}$，取 $(3/2)(\theta-1/2)+\eta'\le\eta$ 就得到临界条件。

还可以只数素数。记 $\vartheta(t)=\sum_{p\le t}\ln p$，用它替换 $\psi$ 来定义 $Q_\vartheta$ 和 $A_\vartheta$。素数幂给尾积分带来的修正满足 $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$。取一个常数 $C$ 使 $\psi(t)-\vartheta(t)\le C\sqrt{t}$ 对所有 $t\ge1$ 成立，这样的 $C$ 无条件存在。负部随尾积分递减，窗口定理给出 $0\le A_\vartheta(Y)-A(Y)\le 2C\ln(Y^{3/2}/Y)=C\ln Y$。于是临界条件也可写成对每个 $\eta>0$ 都有任意远的窗口满足 $A_\vartheta(Y)\le Y^\eta$。从 $A$ 的条件取指数 $\eta/2$，再用 $Y^{\eta/2}+C\ln Y\le Y^\eta$ 对充分大的 $Y$ 成立即可。独立的算术任务是从素数分布证明这个负部积分界。 [素数幂修正的窗口估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_power_window_correction)

外部算术窗口若已给出 $U(x)\le x^{1/2+\varepsilon}$，可以直接把它传给只计素数的条件（`手工推导`）。在同一个 $[Y,Y^{3/2}]$ 上，$Q^-(x)/\sqrt{x}=\max(U(x),0)/x^{3/2}\le x^{\varepsilon-1}$，故 $A(Y)\le \tfrac12 Y^{3\varepsilon/2}\ln Y$。再加素数幂修正 $C\ln Y$。给定 $\eta>0$，取 $\varepsilon=\min(\eta/3,1/4)$，则和式在充分大的此类窗口上至多为 $Y^\eta$。这里用的算术输入是在任意远处都有一整个窗口满足点态界。

Levent Alpöge 提出的证明在模 $1$ 使用外部算术输入构造这族整窗。在该路线中，外库用 $\theta$ 提升、伽罗瓦表示、余体积界与局部匹配构造 `HypsAlt`，再取得 `TopG`。取 $\lambda=3/2$，构造中固定的损失为 $e_D=2,e_L=0$。每个充分小的 $\varepsilon>0$ 都在同一族中给出任意远的整窗、统一误差界和 `ChainTied` 条件。提高起点下限后，模 $1$ 的算术估计在整窗上给出 $U(x)\le x^{1/2+9\varepsilon}$。这一步发生在应用无零点判据之前。取 $9\varepsilon\le\min(\eta/3,1/4)$，上段的积分便在这族窗口上给出 $A_\vartheta(Y)\le Y^\eta$（`手工推导`）。据此得到的窗口存在性以外库的这些算术输入为前提。[外库对证明的说明](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/README.md#L1-L5) · [构造 HypsAlt 的算术输入](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean#L44-L68) · [从 HypsAlt 到 TopG](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean#L12-L15) · [损失参数](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean#L48-L54) · [同一族的三个条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L19-L33) · [窗内的算术估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L28-L30)

针对上述手工衔接，已有一次条件性的外部 Lean 内核复核。固定在参考库的 Lean 4.33.1 环境中，`rh_of_family_and_unit_host` 从族输入 `TopG` 和模一特征标的宿主输入 `HostExW (3/2) (GChi PChar.one).req` 推出黎曼猜想。对每个 $\kappa>0$，两个输入共同给出任意远的 $[Y,Y^{3/2}]$，使同一族在窗内每个实数 $x$ 处都有 $\mathrm{Gz}(x)\le x^{1/2+\kappa}$。这里 $\mathrm{Gz}(x)=U(x)$ 正是本书的完整 Mangoldt 余项，故可应用上文的素数窗口判据。此次内核重放以这两个输入为假设，参考库中提供它们的构造在重放范围之外。复现记录给出兼容补丁及成功的内核重放，其中 `PinnedTop`、`WindowConsumer` 和 `UnifiedWindowRH` 核验这条条件推论，`PinnedMesh` 核验另一条固定特征标的窗口判据。[固定环境中的条件推论与复现源码](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059461340)

外部参考库的均方定理 `QH.pairEx` 给出了同时覆盖内窗的素数对。取模数 $1$、$0<\varepsilon<1/52$ 与 $A\ge1$。对每个充分大的 $Y$，存在一对素数 $q,d$ 满足 `PairGood 1 ε Y (Y^A) q d`，其中 `WinPair` 的大小、同余与分裂条件都在固定尺度 $Y$ 处计算。对三组扭转指标 $(i,j)=(1,0),(0,1),(1,1)$，诱导相应二次扭转的每个本原特征标 $\chi$ 在整个 $Y\le y\le Y^A$ 上同时满足 $|g_\chi(y)|\le y^{1/2+\varepsilon/2}$ 与 $|D_\chi|\le4\log y$；对于导子整除 $8$ 的实本原基特征标，定义还要求这三组扭转的本原诱导特征标在指定矩形内无零点。这里选择 $q,d$ 只用参考库已核验的均方定理。[固定素数对与外窗的量词](https://github.com/the-omega-institute/trureturing/issues/32627#issuecomment-7059642097)

从内窗到模一宿主另用上同调输入 `VWinAt PChar.one`，记其截断指数为 $C$。对每个上述 $\varepsilon$ 以及每个在 $x\ge1$ 满足 $x^{2+8\varepsilon}\le2^{e(x)}\le2x^{2+8\varepsilon}$ 的秩指数函数 $e\colon\mathbb R\to\mathbb N$，该输入给出 $J\ge1$ 与起点。对于起点以后的每个 $X$ 以及每对满足 `WinPair ε (X^(1/J)) q d` 的素数，它给出共同子窗 $[W,W^2]\subseteq[X^{1/J},X]$。子窗内每个 $x$ 的估计适用于匹配该特征标、$e(x),q,d$ 的每个数域（`IsChiField`）。固定这样的数域、任意代数闭包，以及一族按素数 $\ell$ 编号的局部系数数据，令 $t=\lfloor x^C\rfloor$。对于每个素数 $\ell$ 与 $1\le j<t$，上同调长度 $\operatorname{shaLen}(\ell,j)$ 都有限，且对每个有限素数集 $S$ 有

$$
\sum_{\ell\in S}\log\ell\sum_{1\le j<t}\operatorname{shaLen}(\ell,j)\le\sqrt{\exp(x^\varepsilon)}.
$$

取 $C=401$ 时，共同子窗的构造先选好 $Y,q,d$，再量化外窗 $[Z,Z^{3/2}]$ 内的实点。`supplyChi` 给出上段所需的模一宿主。同一外部 Lean 环境由此核验了 `TopG → VWinAt PChar.one 401 → RiemannHypothesis`。[上同调窗口的条件推论](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059734329)

模一特征标 $\chi$ 生成的群只有一个元素。数域构造给出 $1\le c\le|\langle\chi\rangle|$，所以宿主构造中的阶 $c2^e$ 等于 $2^e$，直接满足上述秩估计。这使模一情形的截断指数可以从 $401$ 降到 $400$，求和只用 $1\le j<\lfloor x^{400}\rfloor$。在指数 $400$ 的窗口假设下，`fixed_of_400` 对每个上述 $\varepsilon$ 给出 $J\ge1$，使得超过任意给定起点都能找到外窗 $[Z,Z^{3/2}]$ 与一组共同的 $Y,q,d$，其中 $Y\le Z\le Z^{3/2}\le Y^J$。这对素数在 $[Y,Y^J]$ 上满足 `PairGood`，外窗内每个 $x$ 又有与之匹配的 $e(x)$ 和上述长度界。同一外部环境核验了 `TopG → VWinAt PChar.one 400 → RiemannHypothesis`。族输入与这个较弱的模一窗口输入都是该推论的假设。[指数 400 的源码与内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059864808)

在模一上同调窗口中，参考库还在同一外部 Lean 环境重放了正特征子空间的计数归约。模一的例外素数集恰为 $\{3,7\}$。参考证明给出情形 IV，并由主特征标的消失定理推出情形 Z。情形 I 归结到判别式 $-7$ 的虚二次数域 $\mathbb Q(\sqrt{-7})$ 上的一项轨道估计。测试素数可以固定为 $11,13$，当选窗的两个辅助素数 $q,d$ 均大于 $13$ 时，这一对测试对同一宿主同时适用。轨道估计仍要求一个实常数对所有相容的有理数域代数闭包、允许的指数、模数、特征标轨道、系数数据与有限素数集统一有效。[模一的例外素数集](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060326962) · [计数 I、IV、Z 与条件推论](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061140456)

情形 V 的两个高导子计数只用扭转指标 $e=1$。令 $c_2(\psi)$ 为宿主特征标 $\psi$ 在素数 $2$ 处局部分量的导子中 $2$ 的指数。去掉 $2$ 处分量后，剩余特征标的平方为主特征标。于是对 $\ell=3,7$，定义中的阶数 $f_0$ 都等于 $\ell$ 模 $4$ 的乘法阶 $2$。门槛 $R_1=16\ell^2\,4^{v_2(\ell^2-1)}$ 在 $\ell=3$ 处等于 $9216$，在 $\ell=7$ 处等于 $200704$。把 $R_1$ 与 $2^{c_2(\psi)}$ 比较就得到确切分界。

| 例外素数 $\ell$ | $v_2(\ell^2-1)$ | 情形 V | 对应的情形 Vs |
| --- | --- | --- | --- |
| $3$ | $3$ | $c_2(\psi)\ge14$ | $c_2(\psi)\le13$ |
| $7$ | $4$ | $c_2(\psi)\ge18$ | $c_2(\psi)\le17$ |

`unit_countV_iff` 表明，模一的情形 V 等价于存在一个共同的自然数指数 $A$，使上述两个高导子族都满足参考库的 `VLe` 界 $(\ell N)^A$，其中 $N$ 是宿主模数。该界量化每个模一宿主、满足 `h.Big t` 的 $t>1$、每个允许的代数闭包与系数系统，以及这种宿主在扭转 $1$ 处的每个合格特征标。表中的数字给出被计入的条件；每个具体宿主提供哪些特征标由其自身决定。[两项高导子计数的等价式与内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061244097)

把这两项计数作为假设代入 `rh_of_one_orbit_estimate`，还须给定算术族 `TopG`、模一几何窗口 `UnitB K 400`、奇素数界 `Odd.PrimeBound`、上述固定域轨道估计和模一情形 II。情形 Vs 所用的输入为 Poitou–Tate 对偶、局部有限性、局部 Tate 对偶，以及某个实数 $C_K$ 对应的次数估计 `LemmaK`。在这些假设下，外部内核复核的推论由本章的 Mangoldt 窗口判据得到 RH。

**怎样让同一个判别式在几个素数处都分裂？** 对奇素数 $p$，记 $J(-d,p)=\bigl(\frac{-d}{p}\bigr)$。值为 $1$ 的意思是 $t^2\equiv-d\pmod p$ 有非零解。取 $B=3$，要检查的小奇素数只有 $3$。素数 $d=23$ 满足 $d\equiv7\pmod{16}$ 及 $-23\equiv1\pmod3$。再取素数 $q=59\equiv3\pmod8$，有 $-23\equiv36=6^2\pmod{59}$。这一对满足所需的两个分裂条件。下面的构造用特定剩余类一次保证所有有限条件，这些剩余类只占可用素数的一部分。

::: {.theorem #thm-ch31-split-prime-host-series title="满足局部分裂条件的辅助素数的加权级数" lean="D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series"}
给定自然数 $B$，令 $D_B$ 为所有满足 $d\equiv7\pmod{16}$ 且对每个奇素数 $p\le B$ 有 $J(-d,p)=1$ 的素数 $d$ 所成的集合。对 $d\in D_B$，令 $Q_d$ 为所有满足 $q\equiv3\pmod8$ 且 $J(-d,q)=1$ 的素数 $q$ 所成的集合。则

$$
\begin{aligned}
\lim_{X\to\infty}\sum_{\substack{d\in D_B\\d<X}}\frac{\ln d}{d}&=+\infty,\\
\lim_{X\to\infty}\sum_{\substack{q\in Q_d\\q<X}}\frac{\ln q}{q}&=+\infty\quad(d\in D_B).
\end{aligned}
$$

这里 $X$ 取自然数。对每个自然数 $N$，存在 $d\in D_B$ 使 $d>N$。对每个 $d\in D_B$ 和每个自然数 $Q$，存在 $q\in Q_d$ 使 $q>Q$。反过来，若先给素数 $q\equiv3\pmod8$，令 $S_{B,q}=\{d\in D_B:q\in Q_d\}$，则 $\sum_{d\in S_{B,q},\,d<X}(\ln d)/d\to+\infty$，且对每个自然数 $N$ 都有 $d\in S_{B,q}$ 满足 $d>N$。
:::

::: proof
先选 $d$。在参考库的构造中，令 $P=\prod_{i=0}^{B-1}(2i+1)$，空积取 $1$。$P$ 是奇数，每个奇素数 $p\le B$ 都是其中一项。剩余类 $8P-1\pmod{16P}$ 与模数互素。其中的素数 $d$ 满足 $d\equiv7\pmod{16}$，并且对每个这样的 $p$ 都有 $-d\equiv1\pmod p$。固定这个 $d$ 后，再在与模数互素的类 $1+6d\pmod{8d}$ 中选素数 $q$。于是 $q\equiv3\pmod8$，且 $q\equiv1\pmod d$。由于 $d,q$ 都模 $4$ 余 $3$，二次互反律的负号与 $\bigl(\frac{-1}{q}\bigr)=-1$ 抵消，给出 $J(-d,q)=\bigl(\frac{q}{d}\bigr)=1$。本库证明取小奇素数本身的乘积，用中国剩余定理合并同余条件。在每个既约剩余类中，素数的 $\ln p/p$ 之和发散。把这些非负项分别计入 $D_B$ 和 $Q_d$ 即得两式。完整证明由 Lean 内核检查。
:::

若先指定一个满足 $q\equiv3\pmod8$ 的素数，则把小素数的截点提高到 $\max(B,q)$。此时 $q$ 自己就是必须分裂的小奇素数之一，所以在 $D_{\max(B,q)}$ 中任取 $d$，都有 $d\in D_B$ 且 $J(-d,q)=1$。删去任意有限前缀仍保留发散性，两种选取顺序都允许最后选定的素数超过任给下限。外库的初等构造先选 $d$、再选 $q$，陈述的是超过给定下限的素数存在性。上面的加权发散刻画了两次选择各自有多少素数可用。[外库的两次素数选择](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimeDiscriminants/ExistsHost.lean#L39-L97)

整窗估计还要在给定尺度上同时选好这一对素数。外库的定量命题在其解析假设下，固定 $0<\varepsilon<1/52$ 后，先给出 $x_0$ 和一个常数 $C>0$，再对每个实数 $x\ge x_0$ 先选 $q$ 再为它选 $d$，使同一对素数满足 $\sqrt{X_1}<q\le X_1$、$\sqrt{X_2}<d\le X_2$，其中 $X_1,X_2$ 由 $x,\varepsilon$ 决定。`QDq` 以同一常数 $C$ 控制三个二次特征标在尺度 $x$ 的估计（对应 $q$、$d$ 及两者的乘积），`Boxq` 对特征标及其扭曲给出六个无零点区域条件。对所有整数 $1\le n\le2x^{2+8\varepsilon}$，同一对素数还须满足 `Rowq` 的分裂及 $\ln(4nqd)$ 上界。这些条件对每个 $x$ 选一对素数。令 $t=\varepsilon/5$，由 $X_1=\exp(x^t)$ 得 $x^t/2<\ln q\le x^t$。若 $Y$ 和 $Y^b$ 两端沿用同一个 $q$，就有 $Y^{bt}/2<\ln q\le Y^t$，从而 $Y^{(b-1)t}<2$。固定 $b>1$ 后，要在充分远窗口的两个端点都满足 `Rowq` 的大小限制，必须换用不同的 $q$（`手工推导`）。从逐尺度选择到上文的整窗误差界，还需外库的特征标估计及算术构造。[先选 $q$ 再选 $d$ 的定量构造](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBounds.lean) · [定量选取的假设与量词](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [特征标与范围条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L185)

**怎样在整个窗口内沿用同一对辅助素数？** 固定素数 $q\equiv3\pmod8$，记 $L=\ln q>1$，固定实数 $b>1$。给定窗口起点 $Y\ge e^5$，取在窗内固定的损失 $\varepsilon>0$。对每个实数 $x\in[Y,Y^b]$ 记 $u=x^{\varepsilon/5}$。外库的 `Rowq` 在给定 $x,n$ 处对 $q,d$ 施加条件。下面要求一个素数 $d\equiv7\pmod{16}$ 在整窗上满足

$$
u/2<L\le u,\qquad u(\ln x)^2/2<\ln d\le u(\ln x)^2 .
$$

还要求 $(-d/q)=1$，每个奇素数 $p\le u$ 都有 $(-d/p)=1$，在 $2$ 处有 $-d\equiv1\pmod8$。当 $1\le n\le2x^{2+8\varepsilon}$ 为整数时，还要验证 $\ln(4nqd)\le2u(\ln x)^2$。[外库的逐点算术条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L179-L185)

::: {.theorem #thm-ch31-fixed-prime-row-width title="整窗沿用同一对辅助素数的宽度" lean="D5/S3/CharacterSums/MovingPrimeRowWidth.prime_pair_power_window_iff"}
固定上述 $q,b$。以下两条等价。

1. 对任意实数 $R$ 和任意 $\eta>0$，存在 $Y\ge\max(R,e^5)$、损失 $0<\varepsilon<\min(\eta,1/52)$ 及素数 $d$，使上述条件对每个实数 $x\in[Y,Y^b]$ 成立。
2. 窗宽满足 $b^2L^{b-1}<2$。
:::

::: proof
先看两端。令 $u_0=Y^{\varepsilon/5}$，于是 $L\le u_0$，右端的 $u$ 为 $u_0^b$。把右端的严格下界和左端的上界合起来，有 $b^2u_0^b(\ln Y)^2/2<\ln d\le u_0(\ln Y)^2$，故 $b^2L^{b-1}<2$。等号处，右端所需的严格下界已经达到左端容许的最大值。

反过来，取 $B=\lceil L^b\rceil$，先固定 $q$，可选到任意大的 $d$，使 $q$ 和所有奇素数 $p\le B$ 均分裂。[先固定 $q$ 的素数供给](lean:D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series)

置 $a=\sqrt{\ln d/L}$、$Y=e^a$、$\varepsilon=5\ln L/a$。增大 $d$ 同时使 $Y$ 趋于无穷、$\varepsilon$ 趋于零。把整窗上的 $x$ 写成 $e^{sa}$，其中 $1\le s\le b$。于是

$$
u=L^s,\qquad \frac{u(\ln x)^2}{\ln d}=s^2L^{s-1}\in[1,b^2L^{b-1}].
$$

这给出 $d$ 的两个尺寸界，且 $u\le L^b<2L$ 给出 $q$ 的严格下界。由于 $u\ge L$，另一个界 $L\le u$ 也成立。最后令 $t=\ln x\ge5$。对给定范围的 $n$，由 $L\le u$、$\ln 8<4$、$2+8\varepsilon<3$ 得 $\ln(4nq)\le4+3t+u\le ut^2$。最后一个不等式利用 $u\ge1$ 和 $t^2-1\ge4+3t$。再加上 $\ln d\le ut^2$ 即得导子估计。完整证明由 Lean 内核检查。
:::

取素数 $q=60083\equiv3\pmod8$ 和 $b=9/8$。因 $11<L<12$ 且 $12<(3/2)^8$，有 $b^2L^{b-1}<(81/64)(3/2)=243/128<2$。这给出一族整窗，在每一点都有 $u\ge L>11$。

外库选取 $q$ 的解析证明还在起点要求 $(\ln Y)^2\ln(8)/4\le Y^{\varepsilon/5}$。这里的构造有 $Y^{\varepsilon/5}=L$，而左端随 $Y$ 趋于无穷。若要求满足这个解析门槛，窗口两端的 $u$ 之比 $(Y^{\varepsilon/5})^{b-1}$ 至少为 $((\ln Y)^2\ln(8)/4)^{b-1}$。对任意自然数 $k$，后者最终超过 $2^k$。沿窗取 $u$ 依次加倍的 $k+1$ 个点，相应的半开区间 $(u/2,u]$ 两两不交。因此覆盖整窗至少需要 $k+1$ 个不同的 $q$，即使 $\varepsilon$ 可按窗选取。外库使用其解析输入，先固定 $0<\varepsilon<1/52$ 并取得门槛 $x_0$ 和常数 $C$，对每个 $x\ge x_0$ 选择 $q,d$，再使这对素数适用于给定范围的所有 $n$。 [外库筛选的尺度条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L83-L92) · [外库逐点选对的定理](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [该条件的两次调用](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L131-L156)

这里 $\varepsilon$ 随所选窗口而变。要从这些窗口取得余项 $U$ 的点态界，仍须在同一对 $q,d$ 上证明外库的 `QDq` 与 `Boxq` 特征标估计，并控制比较门槛对 $\varepsilon$ 的依赖。[外库的特征标估计与逐点算术条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L192)

对任一固定的实数 $b>1$，记

$$
A_{\vartheta,b}(Y)=\int_Y^{Y^b}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx,\qquad Y\ge2.
$$

上文的 $A_\vartheta$ 即 $A_{\vartheta,3/2}$。

::: {.theorem #thm-ch31-prime-window-mean title="RH 下窗口质量的对数主项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowMean.prime_tail_logarithmic_mass_of_rh"}
假设黎曼猜想成立。存在一个常数 $C\ge0$，对所有实数端点 $B\ge A\ge2$ 同时有

$$
\left|\int_A^B\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx-2\ln(B/A)\right|\le C.
$$
:::

::: proof
在素数幂层中，$\psi(x)-\vartheta(x)$ 与 $\psi(\sqrt{x})$ 的差由较高幂控制。对 $\sqrt{x}$ 应用 Schoenfeld 界，再积分得 $\sqrt{x}(Q(x)-Q_\vartheta(x))=2+O(x^{-1/12})$。取 $y=\ln x$ 后，这个误差在正向尾部绝对可积。归一化的完全余项由零点级数和一个指数衰减项组成。在 RH 下，零点级数的总系数绝对可和，其模小于 $2$，每个频率的绝对值大于 $10$。对每一项积分，将系数除以对应的频率，故零点级数在任意区间上的积分有同一个界。归一化素数尾项的负部 $\max\{-\sqrt{x}Q_\vartheta(x),0\}$ 可用 $2$ 加上零点级数的实部近似，因为该近似非负，且取正部保留可积误差的界。在有限的起始区间上用连续性控制误差。这样，$2$ 的积分给出对数主项，其余贡献对两端点一致有界。 完整证明由 Lean 内核检查。
:::

特别地，$A_{\vartheta,b}(Y)=2(b-1)\ln Y+O(1)$。同一个常数也适用于变动的 $b>1$。Zhao 的式 (14) 把这里的 $Q_\vartheta$ 写成第一 Mertens 误差的累积积分及端点项。这里的主项来自对该尾项作一次带权窗口积分，并以 RH 为前提。[Zhao，式 (14)](https://arxiv.org/html/2411.18903v2#S2.E14)

::: {.theorem #thm-ch31-rh-prime-window-remainder title="临界线情形的端点余项与簇集" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowRemainder.prime_window_remainder_of_rh"}
在 RH 条件下，把素数尾项负部质量减去主项，记作 $E(a,B)=N(a,B)-2\ln(B/a)$。这里 $N(a,B)=\int_a^B\max(-Q_\vartheta(x),0)x^{-1/2}\,dx$。按重数枚举全部非平凡零点，记 $\rho_k=1/2+i\gamma_k$、$c_k=1/[\rho_k(1-\rho_k)]$。令 $\phi(u)_k=e^{i\gamma_k u}$，并令 $H$ 为这条实参数轨道在单位圆乘积空间中的闭包。在 $H$ 上定义连续函数

$$
P(h)=\operatorname{Re}\sum_k\frac{c_k h_k}{i\gamma_k}.
$$

令 $e(u)=\max(-e^{u/2}Q_\vartheta(e^u),0)-2-\operatorname{Re}\sum_k c_k\phi(u)_k$。对所有实数 $B\ge a\ge2$，有精确等式

$$
E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)=\int_{\ln a}^{\ln B}e(u)\,du.
$$

对任意 $\varepsilon>0$，存在 $X\ge2$，使所有实数 $B\ge a\ge X$ 都满足

$$
\left|E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)\right|<\varepsilon .
$$

对每个固定的 $a\ge2$，当 $B\to\infty$ 时，$E(a,B)$ 的全部簇值组成一个非退化的紧区间

$$
C(a)+P(H),\qquad
C(a)=\int_{\ln a}^\infty e(u)\,du-P\bigl(\phi(\ln a)\bigr).
$$
:::

::: proof
零点虚部有远离零的一致下界，因而逐项积分后的系数仍绝对可和。对数坐标下，积分的两个端点给出同一个 $P$ 的差。剩下的误差绝对可积，所以其在任何 $[\ln a,\ln B]$ 上的绝对积分都受整个左端尾积分控制。对固定 $a$，剩余积分趋于常数。实际轨道在任意晚的时刻逼近闭包中的每个相位，因而实现所给区间的每个簇值。相位闭包紧且连通，而沿轨道的原函数在零时刻有严格正的斜率，因此区间两端不同。结论只用实际联合相位关系。 完整证明由 Lean 内核检查。
:::
