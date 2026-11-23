# 加权多项式计数向量的共同项

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

对独立扰动的比较频谱，共同项较少的配对可用欧氏尺度下界估计。其余配对的总权重由低阶对角权重控制。固定 ζ 零点纵坐标在正分辨率下的加权近碰撞算术上界仍是开放问题。
