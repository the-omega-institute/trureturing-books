# 保持计数律的频谱扰动

若要把[共同区间扰动](https://github.com/the-omega-institute/trureturing/issues/33594)用于有指定计数律的比较谱，还需用半径控制能穿过阈值的纵坐标数目。设参考纵坐标 $\gamma_j$ 为互不相同的正数，重数 $m_j$ 为正整数，并且对每个实阈值，处于阈值及以下的纵坐标只有有限多个。记 $N(T)=\sum_{\gamma_j\le T}m_j$。

::: {.theorem #thm-ch31-ordered-spectral-count-perturbations title="有序区间与至多一次阈值穿越" lean="D5/S3/Analytic/Oscillation/SpectrumCountPerturbation.exists_ordered_count_perturbations"}
存在半径 $0<r_j\le1/3$ 且 $r_j<\gamma_j$，使得 $\gamma_i<\gamma_j$ 时有 $\gamma_i+r_i<\gamma_j-r_j$。任取 $\gamma'_j\in[\gamma_j-r_j,\gamma_j+r_j]$，所得频谱仍为正且局部有限。两谱的指标由双射对应，重数和纵坐标排序均保持。

对每个实数 $T$，或者所有坐标的截断归属相同且 $N'(T)=N(T)$，或者恰有一个坐标改变归属。该坐标 $j$ 满足 $\gamma_j-r_j\le T<\gamma_j+r_j$。若 $\gamma'_j\le T<\gamma_j$，则 $N'(T)=N(T)+m_j$。若 $\gamma_j\le T<\gamma'_j$，则 $N(T)=N'(T)+m_j$。
:::

::: proof
对每个 $j$，在 $1$、$\gamma_j$ 以及所有满足 $i\ne j$、$\gamma_i\le\gamma_j+1$ 的间距 $|\gamma_i-\gamma_j|$ 中取最小值，再除以三，得到正半径。其余间距都大于一。因此每对坐标的两个半径均至多为该间距的三分之一，两半径之和严格小于间距。统一的半径上界保证了扰动后仍局部有限。

某个坐标的截断归属发生变化时，阈值位于该区间左端点及以上、右端点以下。至多一个区间满足此条件。其余坐标对两个计数的贡献完全相同。完整证明由 Lean 内核检查。
:::

单位重数时，对所有 $T$ 都有 $|N'(T)-N(T)|\le1$。因而任何允许的偏移都保住两项计数比较例的有界误差。若要同时满足指定的碰撞预算，还需核对这些半径下的预算条件。若用新纵坐标重算权重，涉及这些权重的估计仍需单独证明。 [两项计数比较例](https://github.com/the-omega-institute/trureturing-books/pull/1083)
