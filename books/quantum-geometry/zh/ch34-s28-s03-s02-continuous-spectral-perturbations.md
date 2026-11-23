# 区间上的共同频谱扰动

有限网格的某个坐标截面若恰好命中一个网格点，命中概率就是网格大小的倒数。对区间上的均匀扰动，可以用长度代替点数，并为每个次数向量对选择估计最强的坐标。

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

在可数乘积测度下，所有偏移几乎处处满足半径约束。如果每个允许的配置都使归一化超额之和超过 $C$，则其期望也严格超过 $C$，与上界矛盾。由此选出一个满足半径约束且总和至多为 $C$ 的配置。每项均非负，因此也至多为 $C\le1$。Lean 核验了有限边缘分布与可数平均论证。
:::

这里的逐坐标条件化与比较仓的特征函数平均都利用了某个坐标的非零系数。在区间问题中，斜率控制允许截面的长度。系数分散在多个坐标时，Rudelson 与 Vershynin 的密度定理给出涉及 $((m_j-n_j)\varepsilon_j)_j$ 欧氏范数的界。 [比较仓的特征函数平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) · [Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

取三个坐标，令 $g_j=0$、$\varepsilon_j=1$。两项一阶检验的支撑分别是 $\{0,1\}$ 和 $\{1,2\}$，权重均为一，取 $\eta_k=1/8$、$b_k=1/2$。此时每项检验有 $A_k=1/4$，预算之和恰好为一。偏移 $(-1,1,-1)$ 在两个支撑上的超额均为零。

零分辨率下，不同次数向量对贡献给 $A_k$ 的权重为零。正分辨率的上界适用于按给定半径选出的比较谱。若应用需要特定的计数律，还需控制这些半径允许的阈值穿越数。实际 ζ 纵坐标的高阶频率差仍需算术估计。
