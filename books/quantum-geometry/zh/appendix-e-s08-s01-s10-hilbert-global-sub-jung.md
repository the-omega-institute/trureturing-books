# E.8.1.10 弦图重构的全局 Hilbert 界与有限团数改进 {#sec-appe-hilbert-global-sub-jung}

只知道每个三角形上的加性偏差，能否为整张弦图选取一组顶点势，使所有边的残差都低于 Jung 阈值所给的尺度？任意有限弦图都可用同一个系数 $241361/100000$，严格低于 $1+\sqrt2$。限制团数后，每一种有限上限都能进一步压低该系数。在团数上限为 $31$、$51$、$101$ 时，还可利用三角环量的能量得到更小的界。

## E.8.1.10.1 全局界与有序三角形不变量

写 $g_{ij}=g(i,j)$。有序三角形 $(i,j,k)$ 指 $ij$、$jk$、$ik$ 都是边，三角环量为 $g_{ij}+g_{jk}-g_{ik}$。势 $p$ 在有向边 $ij$ 上留下残差 $g_{ij}+p(i)-p(j)$。沿三角形求和时，三个势值消去，所以三角环量在重构中保持不变。记 $R=241361/100000$。

::: {.theorem #thm-appe-hilbert-global-sub-jung title="低于 Jung 阈值的全局 Hilbert 重构" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_sub_jung"}
设 $V$ 为有限类型（Finite），$G$ 为 $V$ 上的简单弦图。设 $E$ 为带实内积空间结构的赋范交换加法群。给定 $g:V\times V\to E$ 和实数 $D\ge0$，假设对所有 $i,j\in V$ 有 $g_{ji}=-g_{ij}$，且每个有序三角形 $(i,j,k)$ 都满足 $\|g_{ij}+g_{jk}-g_{ik}\|\le D$。则存在 $p:V\to E$，使每条有向边 $ij$ 都满足 $\|g_{ij}+p(i)-p(j)\|\le RD$。同时有

$$
\begin{aligned}
R &< \frac{2414}{1000},\\
\frac{2414}{1000} &< 1+\sqrt2,\\
\frac{3}{5000} &< 1+\sqrt2-R.
\end{aligned}
$$
:::

::: {.proof #pf-appe-hilbert-global-sub-jung}
当 $D=0$ 时，弦图上的三角环量为零，沿完全消去序逆向插入顶点即可精确积分。当 $D>0$ 时，先将增益除以 $D$。插入新顶点 $a$ 时，已插入的邻点形成一个团，每个邻点 $i$ 给出候选值 $c_i=g_{ia}+p(i)$。若旧边残差为 $x_{ij}$，则 $x_{ij}-(c_i-c_j)$ 就是新三角形的环量，范数至多为 $1$。

令 $d(x)=R^2-\|x\|^2$。对按插入次序排列的每个旧三角形，保留不等式 $F(\langle x,t\rangle/R)\le w d(x)+d(y)+d(z)$，其中 $x$ 是最先出现的边，$y,z$ 是另两条边，$t$ 是环量，$w=157/1000$，$F$ 是分段二次函数。选取新势值时，每个单点约束控制一条新边，每对邻点的约束控制一个新三角形。把这些约束写成带常数偏移的平方距离平均值。任取这些约束的概率混合，诱导出邻点权重 $q_i$，加权重心使混合平方距离取到最小值。

方差恒等式把方差下降量分解为对角项、旧边与新环量的亏量，以及行均值和中心化能量。对每对邻点，从较晚端点向后求和，用递减标量包络控制投影后的环量波动与伴随边亏量。再用四次多项式对前缀加权，由投影较小的旧三角形补足边亏量。两项估计与方差恒等式合并，使每个混合的最小值至多为 $-(57/10)\sum_i q_i^2$。有限二次极小极大引理于是给出同一个新势值，满足全部单点和成对约束。邻点团为空时没有约束。归纳后将势乘回 $D$。将 $141421/100000$ 平方并与 $2$ 比较，再作有理数比较，即得三条严格不等式。完整证明由 Lean 内核检查。
:::

分段函数、标量包络与闭合预算的精确定义及有理证书见[全局标量证书源码][global-certificate]。

## E.8.1.10.2 每个有限团数上限的改进

团数上限限制每次插入时的邻点权重个数。即使这些权重尽量均匀，其平方和仍有一个随团数上限变化的正下界。

::: {.theorem #thm-appe-hilbert-global-clique-credit title="有限团数的平方半径改进" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_clique_credit"}
设 $V$ 为有限类型（Finite），$G$ 为 $V$ 上的简单弦图。设 $E$ 为带实内积空间结构的赋范交换加法群。取自然数 $N\ge1$，并假设每个有限团 $S$ 都满足 $\lvert S\rvert\le N+1$。给定 $g:V\times V\to E$ 和实数 $D\ge0$，假设对所有 $i,j\in V$ 有 $g_{ji}=-g_{ij}$，且每个有序三角形 $(i,j,k)$ 都满足 $\|g_{ij}+g_{jk}-g_{ik}\|\le D$。令 $R_N=\sqrt{R^2-57/(10N)}$，其中根式内的 $N$ 按实数计算。则存在 $p:V\to E$，使每条有向边 $ij$ 都满足 $\|g_{ij}+p(i)-p(j)\|\le R_ND$。同时有 $R_N\le R-59/(50N)$，其中右边的 $N$ 也按实数计算。
:::

::: {.proof #pf-appe-hilbert-global-clique-credit}
新顶点与已插入的邻点同属一个团，所以至多有 $N$ 个候选值。对于非空邻点团上的权重，柯西–施瓦茨不等式给出 $\sum_i q_i^2\ge 1/N$。将每个混合的下降量 $57/(10N)$ 用于收紧单点与成对约束，保留同一有序三角形不变量，便可把平方半径从 $R^2$ 降到 $R^2-57/(10N)$。空团无须选取候选值，即可插入顶点。正预算通过缩放处理，零预算通过精确积分处理。线性界右侧对 $N\ge1$ 非负，将它平方后可直接与根式下的数比较。完整证明由 Lean 内核检查。
:::

## E.8.1.10.3 三个团数上限的保留环量界

这里把团数上限和半径绑定为三种取值。$N_k$ 限制插入时已出现的邻点数，$N_k+1$ 限制整张图的团数。

| $k$ | $N_k$ | $N_k+1$ | $R_k$ |
| --- | ---: | ---: | ---: |
| `thirtyOne` | $30$ | $31$ | $22302/10000$ |
| `fiftyOne` | $50$ | $51$ | $22913/10000$ |
| `hundredOne` | $100$ | $101$ | $23434/10000$ |

::: {.theorem #thm-appe-hilbert-global-retained-curl title="三个团数上限的保留环量重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_retained_curl"}
设 $V$ 为有限类型（Finite），$G$ 为 $V$ 上的简单弦图。设 $E$ 为带实内积空间结构的赋范交换加法群。取上表中任一 $k$，并假设每个有限团 $W$ 都满足 $\lvert W\rvert\le N_k+1$。给定 $g:V\times V\to E$ 和实数 $D\ge0$，假设对所有 $i,j\in V$ 有 $g_{ji}=-g_{ij}$，且每个有序三角形 $(i,j,l)$ 都满足 $\|g_{ij}+g_{jl}-g_{il}\|\le D$。则存在 $p:V\to E$，使每条有向边 $ij$ 都满足 $\|g_{ij}+p(i)-p(j)\|\le R_kD$。
:::

::: {.proof #pf-appe-hilbert-global-retained-curl}
将正预算归一为 $1$，沿完全消去序逆向插入顶点。在小团上，保留边亏量之和与固定三角环量平方之和的加权下界。对含新顶点的团，邻点子集对应一个平方距离之和的约束，新三角形的环量决定其常数项。以顶点权重的乘积对旧团不等式求平均，固定边或三角形的系数便是补集上的基本对称多项式。成对平均给出均匀权重处的上界，并以权重的平方偏差控制从均匀值下降的程度。将所得旧团亏量下界代入加权投影恒等式，再用标量证书控制约束的每个概率混合。所得公共中心满足所有子集约束，单点约束给出新边的平方半径界。归纳后取平方根并恢复原尺度。空子集的约束恒成立，零预算仍可精确积分。完整证明由 Lean 内核检查。
:::

## E.8.1.10.4 有限情形的源证明

有限情形先证明单位预算版本。对上一条定理的 $V,G,E,k,g$ 及同样的团数和反对称条件，若每个有序三角形的环量范数至多为 $1$，则存在同一个势 $p$，使每条有向边的残差范数至多为 $R_k$。此步及下列标量引理见配套源码，冻结账本中的定理引用见上面的三个定理框。[`exists_retained_potential`][unit-budget]

- 对实数 $a,b,c$，若 $a>0$ 且 $b^2<4ac$，则对每个实数 $x$ 都有 $c+bx+ax^2>0$。将二次式配方即可。[`quadratic_pos`][quadratic]
- 对实数 $q,b,u,t,H,\ell$，若 $q>0$、$q+b>0$、$\ell^2<4qH$，且 $(\ell-b(t-2u))^2<4(q+b)(H-bu(t-u))$，则对每个实数 $x$ 都有 $-q(x-u)^2+bx\max(t-x,0)<H+\ell(x-u)$。在 $x=t$ 处分段，两边各用一次二次式的判别式条件。[`penalty_affine_lt`][affine]
- 给定参数 $\tau$ 的证书和带有限枚举（Fintype）的指标类型 $I$，若 $\lvert I\rvert\le N_\tau$，且 $p:I\to\mathbb R$ 满足 $\sum_i p_i=1$，则包络 $\mathcal E_\tau(p)$ 严格小于证书裕量的相反数，因而严格小于 $0$。补零至 $N_\tau$ 项后，仿射上界的线性部分求和为零。同样的假设下，任意实数 $L\le\mathcal E_\tau(p)$ 都满足 $L<0$。这些标量结论允许有符号权重。[`envelope_lt_margin`、`envelope_neg`、`closes_mixture`][margin]
- 对上述三种 $k$，取 $\tau$ 为其参数，证书裕量均为 $1/20000$。对带有限枚举（Fintype）的 $I$，若 $\lvert I\rvert\le N_k$，且 $p:I\to\mathbb R$ 满足 $\sum_i p_i=1$，则 $\mathcal E_\tau(p)<-1/20000$。[`finite_envelope_neg`][finite-envelope]

最后，包络把四项输入合成一个混合界。给定参数 $\tau$ 且 $N_\tau>0$，令 $p:I\to\mathbb R$，其中 $I$ 带有限枚举（Fintype）。记 $A=\sum_i p_i^2$、$M=(1-A)/2$、$u_\tau=1/N_\tau$、$P=\sum_i p_i\max(\theta_\tau-p_i,0)$。这里 $r_\tau=R_\tau^2$、$c_\tau=1+1/\mu_\tau$、$\theta_\tau=\sigma_\tau/N_\tau$、$\beta_\tau=c_\tau\theta_\tau$，而 $B_\tau,Q_\tau,K_\tau$、$e_\tau$ 与 $J_\tau$ 分别取源码中的 `credit`、`Q`、`rankCoeff`、`edgeFactor` 与 `distinctUniform N s`，$C_\tau$ 为 `constantTerm`。包络为 $\mathcal E_\tau(p)=C_\tau-Q_\tau(A-u_\tau)+K_\tau P$。设 $B_\tau\ge0$，且实数 $V_0,D_0,T,H,X,F_0$ 满足

$$
\begin{aligned}
V_0 &\le (1+\mu_\tau)(r_\tau M-D_0-c_\tau T)+c_\tau H,\\
B_\tau F_0 &\le (1+\mu_\tau)(D_0+c_\tau T),\\
J_\tau-\binom{s_\tau}{2}e_\tau(A-u_\tau)&\le F_0,\\
c_\tau H+\beta_\tau X&\le c_\tau M+K_\tau P.
\end{aligned}
$$

将这些不等式相加并消去 $D_0,T,H$，得到 $V_0-r_\tau+\beta_\tau X\le\mathcal E_\tau(p)$。这里的二项系数按实数公式 $s_\tau(s_\tau-1)/2$ 计算。这个合成引理本身允许任意 $p$。若 $\tau$ 来自上述 $k$，证书提供 $N_\tau>0$ 和 $B_\tau\ge0$。在同样的四项输入下，若再有 $\lvert I\rvert\le N_k$ 且 $\sum_i p_i=1$，则 $V_0-r_\tau+\beta_\tau X<-1/20000$。[`mixture_le_envelope`、`finite_mixture_neg`][mixture]

## E.8.1.10.5 最优系数

沿用[附录 E.8.1.9](appendix-e-s08-s01-s09-hilbert-reversal-circle-su2.md#sec-appe-hilbert-reversal-circle-su2) 的统一系数定义，$C_{\mathrm{Hilb}}^*$ 是对所有有限简单弦图和所有实内积空间都成立的单位预算系数的下确界。由 [@thm-appe-hilbert-global-sub-jung] 得 $C_{\mathrm{Hilb}}^*\le241361/100000<2.414<1+\sqrt2$。受限系数 $C_{\mathrm{Hilb}}^{(m)}$ 只考虑每个团至多有 $m$ 个顶点的图。

::: {.problem #prob-appe-hilbert-global-optimal title="确定全局最优 Hilbert 系数"}
求 $C_{\mathrm{Hilb}}^*$ 的精确值。
:::

更紧的数值界需要各自的证据。例如，全局上界 $2.413469$、全局下界 $C_{\mathrm{Hilb}}^*>1.53225$，以及有限团数下的 $C_{\mathrm{Hilb}}^{(6)}<3/2$、$C_{\mathrm{Hilb}}^{(22)}<2$，都超出本节所引冻结声明的结论范围。

[global-certificate]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungCertificate.lean#L72
[unit-budget]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L701
[quadratic]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L79
[affine]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L87
[margin]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L127-L192
[finite-envelope]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L305
[mixture]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L313-L348
