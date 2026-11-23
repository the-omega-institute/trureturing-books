# 扰动尺度倒数的加权和

设 $|r_j|\ge\rho>0$。对不同的 $p$ 次计数向量 $m,n$，令 $S(m,n)=\sum_j((m_j-n_j)r_j)^2$，并记 $I_p$ 为 $c_mc_n/\sqrt{S(m,n)}$ 在这些有序对上的和。定义
$$
T=W^{2p},\qquad A_i=\binom pi^2W^{2(p-i)}D_i,\qquad
B_h=\min_{0\le i\le h}\min(A_i,T)-D_p.
$$
当 $0\le h<p$ 时，令 $Q_h=1/(\rho\sqrt{2(p-h)})$。当 $h\ge p$ 时取 $Q_h=0$。

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="低阶对角权重控制尺度倒数的加权和" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
$$
I_p\le (T-D_p)Q_0+\sum_{0\le h<p-1}B_{h+1}(Q_{h+1}-Q_h).
$$
当 $p\le1$ 时，和式为空。
:::

::: proof
令 $H=\sum_j\min(m_j,n_j)$ 为一对向量的共同项数。不同的同次向量有 $H<p$，因此尺度倒数至多为 $Q_H$。将它拆为起始项 $Q_0$ 与到 $H$ 为止的非负增量。第 $h$ 个增量只加在 $H\ge h+1$ 的项上。对这些项，所有较低阈值 $i\le h+1$ 的共同项权重界同时成立。取其最小值并扣除对角权重，即得 $B_{h+1}$。
:::

对有限个半径为正的独立均匀偏移，闭分辨率为 $\eta\ge0$ 时，欧氏区间界将相应的加权概率预算控制在右侧乘以 $e^{1/2}\sqrt{15\pi/2}\,\eta$ 的范围内。局部预算还可以利用频率差排除达不到碰撞带的配对。固定 $\zeta$ 零点纵坐标在正分辨率下仍需算术估计。
