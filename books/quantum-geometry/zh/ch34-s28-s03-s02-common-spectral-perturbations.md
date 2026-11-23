# 多组检验共用一次频谱扰动

## 有限网格上的共同选择

[有限扰动上界](ch34-s28-s03-s02-spectral-perturbations.md)允许根据给定的矩检验选择网格偏移。同一比较谱上的一系列截断需要共用一次选择。设未扰动的频率 $g_j$ 由集合 $J$ 索引。对每个坐标选定半径 $\varepsilon_j\ge0$，并对从 $-\varepsilon_j$ 到 $\varepsilon_j$ 的 $M_j+2$ 个等距偏移编号。$M_j$ 为非负整数，半径为零的坐标保持固定。

检验 $k$ 给出有限支撑 $J_k\subseteq J$、其上的非负权重、自然数阶数 $p_k$ 和分辨率 $\eta_k\ge0$。记 $g'$ 在支撑 $J_k$ 上的加权近碰撞总重为 $E_k(g')$，对角项总重为 $D_k$，权重之和为 $W_k$，全部非对角项总重为 $B_k=W_k^{2p_k}-D_k$。当 $B_k>0$ 时要求容许量 $b_k>0$。对满足 $B_k>0$ 且 $b_k<1$ 的检验，要求其支撑上的 $\varepsilon_j>0$，并令 $\rho_k$ 界住

$$
\frac{\min\{M_j+2,\,1+\lfloor\eta_k(M_j+1)/\varepsilon_j\rfloor\}}{M_j+2}
\qquad (j\in J_k).
$$

当 $B_k>0$ 且 $b_k<1$ 时定义 $a_k=\rho_k/b_k$。当 $B_k=0$ 或 $b_k\ge1$ 时，任意配置均满足上界，这些检验取 $a_k=0$。

::: {.theorem #thm-ch31-common-spectral-perturbations title="满足一族碰撞上界的共同网格选择" lean="D5/S3/Fourier/Concentration/CommonSpectralPerturbations.exists_common_nearby_collision_bounds"}
若每个有限检验集合 $T$ 均满足 $\sum_{k\in T} a_k\le1$，则存在整数 $0\le f_j\le M_j+1$，定义同一个频谱

$$
g'_j=g_j+\varepsilon_j\left(\frac{2f_j}{M_j+1}-1\right).
$$

每个坐标均满足 $|g'_j-g_j|\le\varepsilon_j$，每项检验均满足 $E_k(g')\le D_k+b_kB_k$。
:::

::: proof
取有限多项检验，在其支撑并集的网格乘积上平均。均匀分布限制到各检验的支撑后仍均匀。每个超额都在零与 $B_k$ 之间。对占用预算的检验，有限网格计数把平均超额界在 $\rho_k B_k$ 以内。

对占用预算的检验，把超额除以 $b_kB_k$ 后求和。一个配置只要违反任一检验，这个和就严格大于一。该和的平均值至多为一，因此即使预算等于一，也存在满足所有这些有限检验的配置。

在全部有限离散网格的乘积上，每项检验只依赖有限个坐标，满足该项检验的配置构成闭集。这个乘积空间是紧的，这些闭集具有有限交性质，因此存在对整族检验都有效的配置。完整证明由 Lean 内核检查。
:::

预算恰好为一的例子可取三个坐标，令 $g_j=0$、$\varepsilon_j=1$、$M_j=2$。两项检验的支撑为 $\{0,1\}$ 和 $\{1,2\}$，都取单位权重、一阶、零分辨率及 $b_k=1/2$。各自的 $\rho_k=1/4$，预算之和为一。选择 $(-1,1,-1)$ 后，两个支撑上的非对角项均为零。单点支撑上的检验满足 $B_k=0$，不消耗预算。

## 区间上的共同扰动

取区间均匀扰动时，可以用截面的长度代替网格点数，并为每对次数向量选择估计最强的坐标。

设频率 $g_j$ 和半径 $\varepsilon_j>0$ 由可数集索引。每项检验 $k$ 有有限支撑 $J_k$、非负权重和自然数阶数 $p_k$。对该支撑上的次数向量 $m,n$，记 $c_m,c_n$ 为加权多项式系数，并定义

$$
L_k(m,n)=\max_{j\in J_k}|m_j-n_j|\varepsilon_j.
$$

当 $m\ne n$ 时，$L_k(m,n)>0$。对分辨率 $\eta_k\ge0$ 定义

$$
A_k=\sum_{m\ne n}c_mc_n\min\!\left\{1,\frac{\eta_k}{L_k(m,n)}\right\},
$$

其中求和遍历总次数为 $p_k$ 的有序对。记 $D_k$ 为对角项总重，$E_k(g')$ 为频谱 $g'$ 在 $J_k$ 上的碰撞总重。

::: {.theorem #thm-ch31-continuous-common-spectral-perturbations title="无网格修正项的共同扰动" lean="D5/S3/Fourier/Concentration/ContinuousSpectralPerturbations.exists_continuous_common_nearby_bounds"}
设检验族可数，且容许超额 $b_k$ 均为正。若 $C=\sum_k A_k/b_k\le1$，则存在同一个频谱 $g'$，使每个坐标满足 $|g'_j-g_j|\le\varepsilon_j$，且

$$
\sum_k \frac{E_k(g')-D_k}{b_k}\le C.
$$

于是每项检验均满足 $E_k(g')\le D_k+b_k$。
:::

::: proof
让偏移 $U_j$ 独立均匀分布在 $[-\varepsilon_j,\varepsilon_j]$ 上。对不同次数向量组成的一对，选一个达到 $L_k(m,n)$ 的坐标，固定支撑内其余坐标。频率和之差是 $U_j$ 的仿射函数，斜率为 $m_j-n_j$。闭碰撞带截出的区间长度至多是 $2\eta_k/|m_j-n_j|$。除以 $2\varepsilon_j$ 并取至多为一的上界，得到该对的系数。对其余坐标积分，再按 $c_mc_n$ 加权求和，得到超额 $E_k-D_k$ 的期望至多为 $A_k$。

在可数乘积测度下，所有偏移几乎处处满足半径约束。如果每个允许的配置都使归一化超额之和超过 $C$，则其期望也严格超过 $C$，与上界矛盾。由此选出一个满足半径约束且总和至多为 $C$ 的配置。每项均非负，因此也至多为 $C\le1$。完整证明由 Lean 内核检查。
:::

这里的逐坐标条件化与比较仓的特征函数平均都利用了某个坐标的非零系数。在区间问题中，斜率控制允许截面的长度。系数分散在多个坐标时，Rudelson 与 Vershynin 的密度定理给出涉及 $((m_j-n_j)\varepsilon_j)_j$ 欧氏范数的界。 [比较仓的特征函数平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) · [Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

取三个坐标，令 $g_j=0$、$\varepsilon_j=1$。两项一阶检验的支撑分别是 $\{0,1\}$ 和 $\{1,2\}$，权重均为一，取 $\eta_k=1/8$、$b_k=1/2$。此时每项检验有 $A_k=1/4$，预算之和恰好为一。偏移 $(-1,1,-1)$ 在两个支撑上的超额均为零。

零分辨率下，不同次数向量对贡献给 $A_k$ 的权重为零。正分辨率的上界适用于按给定半径选出的比较谱。当 $C=0$ 时，每项检验的近碰撞质量恰好等于对角项总重。

## 多坐标扰动的 sinc 界

对一对次数向量 $m,n$，坐标 $j$ 的中心均匀扰动以系数 $c_j=(m_j-n_j)r_j$ 进入频率差，其中 $r_j$ 是扰动半径。对 $[-1,1]$ 上独立的均匀变量，每个坐标给特征函数贡献一个因子 $\operatorname{sinc}(c_jt)$。固定截距仅贡献模长为一的相位。系数分散在多个坐标时，下面的界利用系数平方和。

::: {.theorem #thm-ch31-diffuse-sinc-product title="乘积的二次倒数界" lean="D5/S3/Fourier/Concentration/DiffuseSincProduct.diffuse_sinc_product_le"}
设 $A$ 是有限集，$c_j$ 为实系数。记 $S=\sum_{j\in A}c_j^2$，并设 $\sum_{j\in A}c_j^4\le S^2/2$。令 $\operatorname{sinc}(0)=1$，$x\ne0$ 时令 $\operatorname{sinc}(x)=\sin(x)/x$。任意实数 $t$ 满足

$$
\prod_{j\in A}|\operatorname{sinc}(c_jt)|
\le \frac{1}{1+St^2/15}.
$$
:::

::: proof
先证 $\operatorname{sinc}(x)^2(1+2x^2/15)\le1$。在 $0\le x\le2$ 上，积分 $\cos u\le 1-u^2/5$ 得到 $0\le\operatorname{sinc}(x)\le 1-x^2/15$。记 $z=x^2/15$，所需不等式由 $(1-z)^2(1+2z)=1-z^2(3-2z)$ 得出。对 $x\ge2$，用 $|\sin x|\le1$ 和 $1+2x^2/15\le x^2$。偶性覆盖负数。

令 $b_j=2(c_jt)^2/15$，$U=\sum_j b_j$。乘积 $\prod_j(1+b_j)$ 的常数项、一次项及二次项之和是 $1+U+(U^2-\sum_j b_j^2)/2$。其余每项非负。四次方和的条件给出 $\sum_j b_j^2\le U^2/2$，因此二次项至少为 $U^2/4$。将单坐标估计相乘，再用 $\prod_j(1+b_j)\ge(1+U/2)^2$ 即得结论。完整证明由 Lean 内核检查。
:::

若每个 $c_j^2\le S/2$，则四次方和的条件成立。例如，$(c_1,c_2,c_3)=(3,2,2)$ 满足四次方和的条件，此时 $S=17$，最大平方为 $9$。当 $S>0$ 时，上界的积分是 $\pi\sqrt{15/S}$。要把它用作近碰撞预算，还需从特征函数过渡到短区间概率的估计。Rudelson 与 Vershynin 的密度定理对独立均匀扰动给出了更强的概率界。长度为 $2\eta$ 的区间，其概率至多为 $\min(1,\sqrt2\,\eta/\sqrt S)$。 [Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

## 共用频谱扰动的逐对碰撞界

将短区间概率界逐对代入共用扰动的预算，还可以先剔除无论如何扰动都进不了碰撞带的配对。

沿用区间扰动的可数频率和检验、有限支撑及正超额预算。这里将半径记为 $r_j=\varepsilon_j>0$，暂以 $h$ 表示比较频谱。对该检验的次数向量，记 $G_m=\sum_jm_jg_j$ 和 $c_m=\binom{p_k}{m}\prod_jw_j^{m_j}$。记 $E_k(h)$ 为频谱 $h$ 在该分辨率下的加权碰撞量，$D_k=\sum_m c_m^2$ 为对角项。

对检验 $k$ 的支撑上两个不同的次数向量 $m,n$，令 $a_j=m_j-n_j$，并设
$$
A=\sum_j|a_j|r_j,\qquad M=\max_j|a_j|r_j,\qquad S=\sum_j(a_jr_j)^2,\qquad C=e^{1/2}\sqrt{15\pi/2}.
$$
若 $|G_m-G_n|>\eta_k+A$，令 $q_k(m,n)=0$。其余情形取
$$
q_k(m,n)=\min\{1,\eta_k/M,C\eta_k/\sqrt S\}.
$$
不同向量给出两个正分母。令 $B_k=\sum_{m\ne n}c_mc_nq_k(m,n)$，求和遍历有序对。

::: {.theorem #thm-ch31-localized-collision-budgets title="同一频谱满足逐对估计给出的碰撞预算" lean="D5/S3/Fourier/Concentration/LocalizedCollisionBudgets.exists_continuous_common_nearby_localized_bounds"}
若 $\sum_k B_k/b_k\le1$，则存在同一个频谱 $h$，使每个 $j$ 满足 $|h_j-g_j|\le r_j$，并且
$$
\sum_k\frac{E_k(h)-D_k}{b_k}\le \sum_k\frac{B_k}{b_k},
\qquad E_k(h)\le D_k+b_k\quad(k\in K).
$$
:::

::: proof
在同一个乘积概率空间中独立均匀地从 $[-r_j,r_j]$ 选取偏移 $x_j$。每一对的频率差变化为 $\sum_j a_jx_j$，绝对值至多为 $A$。初始距离超过 $\eta_k+A$ 的配对碰撞概率为零。对其余配对，最大坐标给出的区间概率界与欧氏尺度给出的仿射概率界都适用于同一个有限边缘分布。取两者和一的最小值得到逐对上界。

减去对角项后得到有限个带非负权重的指示函数之和，其期望至多为 $B_k$。可数个归一化超额之和的期望至多为 $\sum_k B_k/b_k$。于是允许的区间内有一组偏移达到不超过此上界的值。每项归一化超额都至多为该总和。完整证明由 Lean 内核核验。
:::

两个相距四的频率若各有单位扰动半径，在分辨率一时，两个不同的一次向量发生碰撞的概率为零。距离为三时，端点处可以接触闭碰撞带，因此剔除条件使用严格不等式。构造控制的是选出的比较频谱。固定 ζ 零点纵坐标在正分辨率下的加权高阶碰撞上界仍是开放问题。

## 加权多项式计数向量的共同项

逐对预算中含有欧氏尺度 $S$。它可以由两个次数向量中未匹配的项数来估计。以下先控制共同项较多的配对的总权重，再用未匹配项给出尺度下界。

设 $J$ 有限，$w_j\ge0$，记 $W=\sum_jw_j$。对非负整数计数向量 $m$，记 $|m|=\sum_jm_j$ 和 $c_m=\binom{|m|}{m}\prod_jw_j^{m_j}$。令 $D_k=\sum_{|l|=k}c_l^2$。两个 $p$ 次向量的共同项数为 $H(m,n)=\sum_j\min(m_j,n_j)$。

::: {.theorem #thm-ch31-weighted-overlap-diagonal title="低阶对角权重控制共同项较多的配对" lean="D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_overlap_le_diagonal"}
当 $0\le k\le p$ 时，
$$
\sum_{\substack{|m|=|n|=p\\ H(m,n)\ge k}}c_mc_n
  \le \binom{p}{k}^{2}W^{2(p-k)}D_k .
$$
求和遍历有序对。
:::

::: proof
若 $H(m,n)\ge k$，则存在 $k$ 次子向量 $l$，使每个 $j$ 满足 $l_j\le\min(m_j,n_j)$。如果枚举在两边各自选出这些共同项的所有方式，该配对至少被计一次。固定 $l$ 时，$c_m$ 乘以 $\prod_j\binom{m_j}{l_j}$。写成 $m=l+u$，逐坐标约去阶乘后，该乘积等于 $\binom pk c_lc_u$。对 $p-k$ 次的 $u$ 求和得到 $W^{p-k}$。分别求出两边的和，再对 $l$ 求和，得到所述上界。完整证明由 Lean 内核核验。
:::

当 $k=0$ 时，上界等于所有配对的总权重。当 $k=p$ 时，共同项条件强制 $m=n$，上界就是 $p$ 次对角权重。

::: {.theorem #thm-ch31-overlap-euclidean-scale title="未匹配项给出欧氏尺度的下界" lean="D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_count_difference_sq_ge"}
设两个计数向量均为 $p$ 次，扰动半径满足 $r_j\ge\rho\ge0$，令 $S=\sum_j((m_j-n_j)r_j)^2$。则
$$
S\ge 2\rho^2(p-H(m,n)).
$$
:::

::: proof
逐坐标绝对差之和等于 $2(p-H(m,n))$。每个整数差的平方至少等于其绝对值。乘以共同半径下界的平方后求和，即得结果。完整证明由 Lean 内核核验。
:::

对独立扰动的比较频谱，共同项较少的配对可用欧氏尺度下界估计。其余配对的总权重由低阶对角权重控制。

对比较谱还可[控制计数阈值穿越并处理重算后的权重](ch34-s28-s03-s02-spectral-count-perturbations.md)。实际 ζ 纵坐标的高阶频率差仍需算术估计。
