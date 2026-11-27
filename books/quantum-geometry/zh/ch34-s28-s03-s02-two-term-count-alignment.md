# M.2.11 两项计数主项与完全相位对齐 {#两项计数主项与完全相位对齐}

对局部有限的正频率谱 $(\gamma_j)$，记闭截断计数为 $N(T)=\#\{j:\gamma_j\le T\}$，权重和为 $W(T)=\sum_{\gamma_j\le T}w_j$，正弦和为 $S(T,u)=\sum_{\gamma_j\le T}w_j\sin(\gamma_j u)$。实际 ζ 零点计数的两项平滑主函数为 $F(T)=\frac{T}{2\pi}(\log(\frac{T}{2\pi})-1)$。下面的比较谱保留这两项，且计数误差有界。[Lagarias，定理 2.1](https://arxiv.org/html/math/0404394#S2.Thmtheorem1)

::: {.theorem #thm-ch31-two-term-count-alignment title="两项计数误差有界时的完全相位对齐" lean="D5/S3/Analytic/Oscillation/SpectrumTwoTermCountAlignment.exists_two_term_count_alignment"}
存在局部有限的无穷谱 $(\gamma_j)$，频率正且互异，每个频率重数为一，权重为 $w_j=\gamma_j/(1/4+\gamma_j^2)$。当 $T\to\infty$ 时，$N(T)=F(T)+O(1)$，且 $W(T)=a(\log T)^2+O(1+\log T)$，其中 $a>0$。对充分大的 $X$，同一常数 $C_V>0$ 使所有 $T\ge X$ 满足 $\sum_{X<\gamma_j\le T} w_j^2\le C_V\log X/X$。

对每个充分大的 $T$，有 $W(T)>0$，且存在正整数 $q$ 满足 $q+1\le21\log(21T)/\log 2$。对所有整数 $m$ 及所有实数 $X\le T$，都有 $S(X,u_m)=W(X)$，其中 $u_m=\pi q/2+2\pi qm$。每个开区间 $(A,A+(42\pi/\log 2)\log(21T))$ 都包含至少一个 $u_m$。
:::

::: proof
取 $q_n=5^{\lfloor\log_5(n+1)\rfloor}$，从 $b_6$ 起使用二进块 $[b_n,b_{n+1})$，其中 $b_n=4\cdot2^n/21$。第 $n$ 块的候选频率为 $b_n+(4k+1)/(21q_n)$，其中 $0\le k<q_n2^n$。由 $F'(t)=\log(t/(2\pi))/(2\pi)$ 和 $n+1<5q_n$ 可知，$F$ 在相邻格点间的增量属于 $[0,1)$。估计包括跨块的间距，以及从初始边界到首个格点的间距。

依次保留使 $\lfloor F\rfloor$ 增加的格点。对 $T\ge b_6$，记 $v(T)$ 为不超过 $T$ 的最后一个候选点，若尚无候选点则取 $b_6$。下取整的增量逐项相消，给出

$$
N(T)=\lfloor F(v(T))\rfloor-\lfloor F(b_6)\rfloor.
$$

从 $v(T)$ 到 $T$ 的增量小于一，由此得到有界计数误差。开截断与闭截断的计数至多差一。对计数做分部求和可得对数平方质量，并用 $w_j\le1/\gamma_j$ 得到统一平方尾界。

若 $T$ 在第 $n$ 块，取 $q=21q_n$。每个较早块的 $q_i$ 都整除 $q_n$，商是五的幂，模四余一。因此对任一保留的 $\gamma_j\le T$，$q\gamma_j$ 都是模四余一的整数，每个 $u_m$ 上的各项正弦都等于一。所述区间长度超过步长 $2\pi q$，故其中必有一个对齐点。完整证明由 Lean 内核检查。
:::

在上述对齐点，任意两条保留的频率都有相同相位，因而其相位差的余弦等于一。把这一性质代入沿用含端点截断的有序洛伦兹配对和 $G_T(u)$，可以确定它的首项系数。记 $c=1/(2\pi)$。

::: {.theorem #thm-ch34-montgomery-aligned-lower title="完全相位对齐时的配对和下界" lean="D5/S3/Analytic/Oscillation/MontgomeryAlignmentLower.eventually_montgomery_gt_of_phase_alignment"}
设正纵坐标谱局部有限，$N(T)$ 含端点并计重数，且 $N(T)/(T\log T)\to c$。对每个 $\kappa<2\pi c^2$，所有充分大的 $T$ 均满足以下结论。任取实数 $u$，若截断内每一对纵坐标都满足 $\cos((\gamma_i-\gamma_j)u)=1$，则 $G_T(u)>\kappa T(\log T)^2$。
:::

::: proof
相位条件把配对和化为带重数的洛伦兹能量。对原区间两端各延伸 $\sqrt{T}$ 后使用柯西–施瓦茨不等式。扩展区间的长度与 $T$ 之比趋于一，每个纵坐标在扩展区间内保留的核质量比例也趋于一。下界除以 $T(\log T)^2$ 后趋于 $2\pi c^2$。完整证明由 Lean 内核检查。
:::

前面的共格谱有有界计数误差，因此 [@thm-ch34-montgomery-bounded-count-upper] 给出归一化配对和的一致上界。对每个 $\varepsilon>0$，只要 $T$ 充分大，上界便是 $2\pi c^2+\varepsilon$。取从 $\log T$ 开始的开区间寻找 $u_m$，其长度为 $(42\pi/\log 2)\log(21T)$。当 $T\ge21$ 时，这个区间落在 $[\log T,(1+84\pi/\log 2)\log T]$。在该谱上，每个充分大的 $T$ 都能选到一个这样的 $u_m$，使 $G_T(u_m)/(T(\log T)^2)$ 趋于 $2\pi c^2$。实际 ζ 纵坐标在长频带上是否具有严格低于该系数的一致上界，仍待判定。

因此，即使加入误差有界的两项计数、单位重数和指定的调和权重，这些条件仍允许每个对数长度区间出现达到全部权重的点。特征函数平均可以识别零频项。把平均限制在有限窗口时，实际 ζ 纵坐标仍需控制非零但接近零的高阶加权频率差。目前缺少的是随 $T$ 增长的矩阶上的估计。[特征函数平均的 Lean 实现](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)
