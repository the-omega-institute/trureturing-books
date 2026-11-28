# M.2.6 小扰动下的加权近碰撞 {#小扰动下的加权近碰撞}

设 $(g_j)$ 是有限频率族，$w_j\ge0$，总重为 $W=\sum_j w_j$。对于总次数为 $p$ 的非负整数向量 $m$，定义 $c_m=\binom{p}{m}\prod_j w_j^{m_j}$ 和 $G_m=\sum_j m_j g_j$。把 $|G_m-G_n|\le\eta$ 的有序对按 $c_mc_n$ 加权，记总和为 $E_{p,g}(\eta)$。对角项 $m=n$ 的总重为 $D=\sum_m c_m^2$。

::: {.theorem #thm-ch31-finite-spectral-perturbation title="有限频谱扰动的加权近碰撞上界" lean="D5/S3/Fourier/Concentration/FiniteSpectralPerturbation.exists_nearby_collision_bound"}
对任意非负整数 $p,M$、扰动半径 $\varepsilon>0$ 和分辨率 $\eta\ge0$，存在整数 $0\le f_j\le M+1$，使频率

$$
g'_j=g_j+\varepsilon\left(\frac{2f_j}{M+1}-1\right)
$$

满足每个 $|g'_j-g_j|\le\varepsilon$，且

$$
E_{p,g'}(\eta)\le D+
\frac{\min\{M+2,\,1+\lfloor\eta(M+1)/\varepsilon\rfloor\}}{M+2}\bigl(W^{2p}-D\bigr).
$$
:::

::: proof
让每个偏移在 $[-\varepsilon,\varepsilon]$ 的 $M+2$ 个等距点中独立选取。若 $m\ne n$，取一个满足 $m_j-n_j\ne0$ 的坐标。固定其余偏移后，两个频率和之差是该网格索引的仿射函数，斜率绝对值为 $2\varepsilon|m_j-n_j|/(M+1)$。若有索引满足闭距离条件，则最大索引与最小索引之差至多为 $\eta(M+1)/(\varepsilon|m_j-n_j|)$，因此合格索引数至多为 $1+\lfloor\eta(M+1)/\varepsilon\rfloor$，也至多为网格大小 $M+2$。

对每个有序对先作这个计数，再对偏移的有限乘积空间平均。权重 $c_mc_n$ 非负，对角项始终贡献 $D$。由多项式展开，非对角项总权重为 $W^{2p}-D$。至少有一个偏移配置使总重不超过平均上界。完整证明由 Lean 内核检查。
:::

逐坐标平均可参照特征函数论证。实频率 $m\ne0$ 的特征函数在 $[0,R]$ 上平均后，模长至多为 $1/(\pi |m|R)$。这里逐坐标平均的是网格索引落入闭区间的指示函数。[riemann-hypothesis 中的特征函数平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)

$\eta=0$ 时，非对角项的系数为 $1/(M+2)$。固定正分辨率并增大网格时，系数趋于 $\min\{1,\eta/\varepsilon\}$。每个存在性结论均允许按给定的 $p$ 和 $\eta$ 选择频率。连续独立扰动可用线性组合的密度估计作对照。[Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

对选出的比较谱，可将这个上界代入有界起点的矩判据。实际 ζ 纵坐标是预先固定的频率。该判据在这些纵坐标上的高阶近碰撞估计仍待解决。[加权近碰撞与缺失窗口的起点范围](ch34-s28-s03-s02-weighted-near-collisions.md#thm-ch31-bounded-tail-window-start)
