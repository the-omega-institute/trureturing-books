# M.2.9 对数平方尾界与频繁的完全相位对齐 {#对数平方尾界与频繁的完全相位对齐}

质量估计描述保留了多少权重，平方尾界描述权重如何分散。[临界缺失窗口](ch34-s28-s03-s02-mobius-and-spectra.md#thm-ch31-critical-missing-window)还需要控制频率之间的相位关系。

对局部有限的正频率谱 $(\gamma_j)$ 和权重 $w_j$，记 $W(T)=\sum_{\gamma_j\le T}w_j$，$S(T,u)=\sum_{\gamma_j\le T}w_j\sin(\gamma_j u)$。

::: {.theorem #thm-ch31-commensurate-full-alignment title="对数长度区间中的完全相位对齐" lean="D5/S3/Analytic/Oscillation/SpectrumCommensurateAlignment.exists_logarithmic_full_alignment"}
存在局部有限的无穷谱 $(\gamma_j)$，各频率正且互异，权重 $w_j$ 严格为正。对充分大的 $T$，有 $W(T)=a(\log T)^2+O(1+\log T)$，其中 $a>0$。对充分大的 $X$，有 $\sum_{X<\gamma_j\le T}w_j^2\le C_V\log X/X$，同一常数 $C_V>0$ 适用于全部 $T\ge X$。

对每个 $T\ge5$，有 $W(T)>0$，且存在整数 $q\ge1$ 满足 $q+1\le\log T/\log 2$。对每个 $m\in\mathbb Z$ 和每个 $X\le T$，都有 $S(X,u_m)=W(X)$，其中 $u_m=\pi q/2+2\pi q m$。对每个实数 $A$，至少有一个 $u_m$ 严格落在 $(A,A+(2\pi/\log 2)\log T)$ 内。
:::

::: proof
在第 $n$ 个二进块 $(4\cdot2^n,8\cdot2^n)$ 中，取 $q_n$ 为不超过 $n+1$ 的 5 的最大整数次幂，即 $q_n=5^{\lfloor\log_5(n+1)\rfloor}$。放入 $q_n2^n$ 个频率 $4\cdot2^n+(4k+1)/q_n$，其中 $0\le k<q_n2^n$。每块等分总权重 $2n+1$。

截止值落在第 $n$ 块时，前 $n$ 个完整块贡献 $n^2$，当前块至多再贡献 $2n+1$。以 $n+2\le\log_2 T<n+3$ 换算得 $a=(\log 2)^{-2}$。单块权重平方和至多为 $20(n+1)/2^n$，恰是 $40(n+2)/2^n$ 与下一项的差。从 $X$ 所在块开始求和，包含首尾两个可能只被部分截取的块，即得统一的平方尾界。

当上端截断落在第 $N$ 块时，所有保留频率乘 $q_N$ 都是模四余一的整数，因为每个 $q_N/q_n$ 都是五的幂。故 $u=\pi q_N/2+2\pi q_N m$（$m\in\mathbb Z$）使每项正弦等于一。相邻点间距 $2\pi q_N\le 2\pi(N+1)$，比所述区间长度至少短 $2\pi$。从 $A+\pi$ 开始取首个对齐点，即可避开两端点。首个频率为 $5$，在该截止值已计入。完整证明由 Lean 内核检查。
:::

固定 $0<\beta<1$ 后，$\beta^2W(T)-\log T<W(T)$。因此该比较谱的每个长度至少为 $(2\pi/\log 2)\log T$ 的闭区间都含有超过缺失窗口阈值的点。若得分用 $S(T,u/r)$ 且 $r>0$ 固定，时间间距相应乘以 $r$。要从两条质量条件推出临界缺失窗口，仍须加入能排除这种相位锁定的频率条件。实际 ζ 纵坐标的高阶近碰撞估计仍待证。对照 Martin 与 Ng 关于自足纵坐标的定义，它控制一个纵坐标是否落在其余纵坐标的有理张成中。[Martin 与 Ng，定义 1.3](https://arxiv.org/html/1710.00088#S1.Thmtheorem3)
