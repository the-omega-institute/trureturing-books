# 扰动尺度倒数的加权和

设 $J$ 有限，$w_j\ge0$，$r_j\ge\rho>0$。记 $W=\sum_jw_j$。对 $p$ 次向量 $m$，记 $c_m=\binom{p}{m}\prod_jw_j^{m_j}$。记 $D_k$ 为 $k$ 次加权系数的平方和。对两个不同的 $p$ 次向量，令 $S(m,n)=\sum_j((m_j-n_j)r_j)^2$。

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="低阶对角权重控制尺度倒数的加权和" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
当 $0\le k\le p$ 时，
$$
\sum_{\substack{|m|=|n|=p\\m\ne n}}\frac{c_mc_n}{\sqrt{S(m,n)}}
\le
\frac{W^{2p}}{\rho\sqrt{2(p-k+1)}}+
\frac{\binom pk^2 W^{2(p-k)}D_k}{\rho\sqrt{2}} .
$$
求和遍历有序对。
:::

::: proof
令 $H(m,n)=\sum_j\min(m_j,n_j)$。两个不同的同次向量有 $H<p$，因为等号强制两边每个坐标都等于逐坐标最小值。因此 $\sqrt S\ge\rho\sqrt2$。在 $H<k$ 时，尺度至少为 $\rho\sqrt{2(p-k+1)}$，这部分权重至多为总权重 $W^{2p}$。第二项的分子用低阶对角权重控制 $H\ge k$ 的配对。完整证明由 Lean 内核核验。
:::

对有限个独立均匀偏移及闭分辨率 $\eta\ge0$，欧氏尺度区间界把每个不同配对的贡献限制在 $e^{1/2}\sqrt{15\pi/2}\,\eta\, c_mc_n/\sqrt S$ 以下。因此将右侧乘以 $e^{1/2}\sqrt{15\pi/2}\,\eta$ 即得加权概率预算的上界。若预算还剔除无法达到碰撞带的配对，并取欧氏尺度界与最大坐标界的最小值，该上界仍适用。固定 ζ 零点纵坐标在正分辨率下仍需算术估计。
