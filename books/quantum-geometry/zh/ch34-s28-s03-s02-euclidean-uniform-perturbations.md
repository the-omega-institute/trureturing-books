# M.2.10 独立均匀扰动下的短区间概率 {#独立均匀扰动下的短区间概率}

对一对次数向量，扰动后的频率差是坐标偏移量的仿射和。短区间概率可以用扰动半径缩放后的系数欧氏范数来控制。

::: {.theorem #thm-ch31-uniform-perturbation-euclidean title="仿射带概率的欧氏尺度界" lean="D5/S3/Fourier/Concentration/UniformPerturbationEuclidean.intervalNoise_pi_affine_le_euclidean"}
设指标集有限，$x_j$ 相互独立，且各自在 $[-r_j,r_j]$ 上均匀分布，其中 $r_j>0$。实数系数为 $a_j$，截距为 $b$，记 $c_j=a_jr_j$、$S=\sum_j c_j^2>0$。对 $\eta\ge0$，

$$
\Pr\bigl(\bigl|b+\textstyle\sum_j a_jx_j\bigr|\le\eta\bigr)
\le \min\!\left(1, e^{1/2}\sqrt{15\pi/2}\,\frac{\eta}{\sqrt S}\right).
$$
:::

::: proof
和式 $\sum_j a_jx_j$ 的特征函数分解为 $\operatorname{sinc}(c_jt)$ 的乘积。若 $\sum_j c_j^4\le S^2/2$，乘积界给出上界 $(1+St^2/15)^{-1}$。分辨率为正时，将高斯区间估计用于中心 $-b$，得到所述常数。

若四次方和大于 $S^2/2$，则某个 $c_i^2>S/2$。固定其余坐标，坐标 $i$ 的允许长度比至多为 $\eta/|c_i|\le \sqrt2\eta/\sqrt S$。分辨率为零时，任选一个非零系数，对应截面的长度为零。完整证明由 Lean 内核检查。
:::

在加权近碰撞检验中，对相异次数向量取 $a_j=m_j-n_j$。估计针对每项检验有限支撑上的同一组坐标偏移。要同时满足一族近碰撞预算，还需对相异向量对求加权期望并完成共同选择。文献中的密度定理给出更强的归一化概率常数 $\sqrt2$。固定 ζ 零点纵坐标仍需单独的算术界。 [Rudelson 与 Vershynin，定理 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)
