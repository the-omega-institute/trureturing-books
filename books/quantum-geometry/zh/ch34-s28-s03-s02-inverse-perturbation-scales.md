# 扰动尺度倒数的加权和

设 $r_j\ge\rho>0$。对不同的 $p$ 次计数向量 $m,n$，取 $S(m,n)=\sum_j((m_j-n_j)r_j)^2$，并记 $I_p=\sum_{m\ne n} c_mc_n/\sqrt{S(m,n)}$，其中求和遍历有序的 $p$ 次向量对。令
$$
T=W^{2p},\qquad A_k=\binom pk^2 W^{2(p-k)}D_k,\qquad
L=\rho\sqrt{2(p-k+1)},\qquad U=\rho\sqrt2.
$$

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="低阶对角权重控制尺度倒数的加权和" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
当 $0\le k\le p$ 时，
$$
I_p\le \frac{T-D_p}{L}+
\bigl(\min(A_k,T)-D_p\bigr)\left(\frac1U-\frac1L\right).
$$
:::

::: proof
不同的同次向量有 $H(m,n)<p$，所以 $\sqrt S\ge U$。在 $H(m,n)<k$ 时，$\sqrt S\ge L$。给每个不同配对按 $1/L$ 计费，只给 $H(m,n)\ge k$ 的配对补上差额 $1/U-1/L$。所有配对的总权重是 $T$。共同项较多的配对权重至多为 $\min(A_k,T)$。两处都要扣掉对角权重 $D_p$，因为每个对角项都有 $H(m,m)=p$。
:::

当 $k=0$ 时，每个不同配对都计入差额。当 $k=p$ 时，$L=U$。两端的上界都等于 $(T-D_p)/U$。对有限个独立均匀偏移，闭分辨率为 $\eta\ge0$ 时，欧氏区间界将相应的加权概率预算控制在右侧乘以 $e^{1/2}\sqrt{15\pi/2}\,\eta$ 的范围内。局部预算还可以利用频率差排除达不到碰撞带的配对。固定 $\zeta$ 零点纵坐标在正分辨率下仍需算术估计。
