# 共用频谱扰动的逐对碰撞界

设频率指标集 $J$ 和检验指标集 $K$ 可数。每个频率 $g_j$ 的扰动半径为 $r_j>0$。检验 $k$ 取有限支撑、非负权重、自然数次数 $p_k$、闭碰撞分辨率 $\eta_k\ge0$ 和正超额预算 $b_k$。对该检验的次数向量，记 $G_m=\sum_jm_jg_j$ 和 $c_m=\binom{p_k}{m}\prod_jw_j^{m_j}$。记 $E_k(h)$ 为频谱 $h$ 在该分辨率下的加权碰撞量，$D_k=\sum_m c_m^2$ 为对角项。

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
