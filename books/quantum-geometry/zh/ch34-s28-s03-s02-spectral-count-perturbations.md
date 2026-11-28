# M.2.8 保持计数律的频谱扰动 {#保持计数律的频谱扰动}

若要把[共同区间扰动](ch34-s28-s03-s02-common-spectral-perturbations.md#thm-ch31-continuous-common-spectral-perturbations)用于有指定计数律的比较谱，还需用半径控制能穿过阈值的纵坐标数目。设参考纵坐标 $\gamma_j$ 为互不相同的正数，重数 $m_j$ 为正整数，并且对每个实阈值，处于阈值及以下的纵坐标只有有限多个。记 $N(T)=\sum_{\gamma_j\le T}m_j$。

::: {.theorem #thm-ch31-ordered-spectral-count-perturbations title="有序区间与至多一次阈值穿越" lean="D5/S3/Analytic/Oscillation/SpectrumCountPerturbation.exists_ordered_count_perturbations"}
存在半径 $0<r_j\le1/3$ 且 $r_j<\gamma_j$，使得 $\gamma_i<\gamma_j$ 时有 $\gamma_i+r_i<\gamma_j-r_j$。任取 $\gamma'_j\in[\gamma_j-r_j,\gamma_j+r_j]$，所得频谱仍为正且局部有限。两谱的指标由双射对应，重数和纵坐标排序均保持。

对每个实数 $T$，或者所有坐标的截断归属相同且 $N'(T)=N(T)$，或者恰有一个坐标改变归属。该坐标 $j$ 满足 $\gamma_j-r_j\le T<\gamma_j+r_j$。若 $\gamma'_j\le T<\gamma_j$，则 $N'(T)=N(T)+m_j$。若 $\gamma_j\le T<\gamma'_j$，则 $N(T)=N'(T)+m_j$。
:::

::: proof
对每个 $j$，在 $1$、$\gamma_j$ 以及所有满足 $i\ne j$、$\gamma_i\le\gamma_j+1$ 的间距 $|\gamma_i-\gamma_j|$ 中取最小值，再除以三，得到正半径。其余间距都大于一。因此每对坐标的两个半径均至多为该间距的三分之一，两半径之和严格小于间距。统一的半径上界保证了扰动后仍局部有限。

某个坐标的截断归属发生变化时，阈值位于该区间左端点及以上、右端点以下。至多一个区间满足此条件。其余坐标对两个计数的贡献完全相同。完整证明由 Lean 内核检查。
:::

单位重数时，对所有 $T$ 都有 $|N'(T)-N(T)|\le1$。因而任何允许的偏移都保住两项计数比较例的有界误差。若要同时满足指定的碰撞预算，还需核对这些半径下的预算条件。 [两项计数比较例](ch34-s28-s03-s02-two-term-count-alignment.md)

## 重算调和权重后的近碰撞预算

共同扰动定理在选择频率前固定每项检验的支撑与权重。选出的频谱在给定截断处可以有不同的尾部支撑，而调和权重也随所选频率变化。扩大参考截断，并逐项给新权重取上界，就能在选择前固定这两项输入。

记参考纵坐标为 $g_j$，选出的纵坐标为 $h_j$。设 $|h_j-g_j|\le r_j\le R$。有限集 $V$ 包含所有满足 $X-R<g_j\le T+R$ 的指标，并且在 $V$ 上 $r_j<g_j$。对 $a\ge0$ 和 $x>0$，设 $w(x)=x/(a+x^2)$。本章纵坐标和式的调和权重取 $a=1/4$。在 $V$ 上取固定上界

$$
v_j=\frac{g_j}{g_j-r_j}w(g_j).
$$

对有限支撑 $A$ 及其上的权重 $z$，记 $E(A,z)$ 为所选频率 $h|_A$ 在分辨率 $\eta$ 下的 $p$ 次近碰撞质量减去所有 $p$ 次向量的单项式权重平方和。向量相异而频率相同时，即使分辨率为零，这一对仍有贡献。

::: {.theorem #thm-ch31-perturbed-harmonic-weights title="把预算传到实际截断" lean="D5/S3/Fourier/Concentration/PerturbedHarmonicWeights.collision_excess_le_on_perturbed_cutoff"}
所有满足 $X<h_j\le T$ 的指标都在 $V$ 内。记这些指标为 $U$，在 $U$ 上取 $u_j=w(h_j)$。对任意自然数阶数 $p$ 和分辨率 $\eta\ge0$，

$$
E(U,u)\le E(V,v).
$$
:::

::: proof
位移界保证 $X<h_j\le T$ 时有 $X-R<g_j\le T+R$。为比较权重，在 $V$ 上记 $x=g_j$、$y=h_j$、$r=r_j$。由 $x-r\le y\le x+r$ 和 $r<x$，得到 $y(x-r)\le y^2$ 与 $y(x-r)\le x^2$。乘以正分母便得 $w(y)\le[x/(x-r)]w(x)$。

把 $U$ 上的次数向量在 $V\setminus U$ 上补零。总次数、频率及多项式系数保持相同。原坐标的权重从 $u$ 增至 $v$ 时，每个单项式的乘积都弱增。分辨率非负时，扣除对角项后只剩相异有序对的和。补零是单射，保留向量相异性，而新增的每一项权重都非负。完整证明由 Lean 内核检查。
:::

当 $a=0$ 且 $y=x-r$ 时，因子 $x/(x-r)$ 取到等号，因此对所有 $a\ge0$ 的一致界是尖锐的。固定 $a=1/4$ 时，同一公式仍给出上界。两侧的超额使用同一组选出的频率、同一阶数和同一分辨率。对于比较谱，可以先在固定输入 $(V,v)$ 上设置预算，选出频率后再用于实际截断。固定的 ζ 零点纵坐标仍需算术估计来建立近碰撞预算。
