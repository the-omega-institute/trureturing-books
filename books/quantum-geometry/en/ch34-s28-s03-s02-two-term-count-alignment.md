# M.2.11 Two-term counting and full phase alignment {#two-term-counting-and-full-phase-alignment}

For a locally finite positive spectrum $(\gamma_j)$, write $N(T)=\#\{j:\gamma_j\le T\}$ for its inclusive count, $W(T)=\sum_{\gamma_j\le T}w_j$ for its total weight through $T$, and $S(T,u)=\sum_{\gamma_j\le T}w_j\sin(\gamma_j u)$ for its sine sum. The smooth two-term counting function for the actual ζ zeros is $F(T)=\frac{T}{2\pi}(\log(\frac{T}{2\pi})-1)$. The comparison spectrum below matches both terms with a bounded counting error. [Lagarias, Theorem 2.1](https://arxiv.org/html/math/0404394#S2.Thmtheorem1)

::: {.theorem #thm-ch31-two-term-count-alignment title="Full phase alignment with bounded two-term count discrepancy" lean="D5/S3/Analytic/Oscillation/SpectrumTwoTermCountAlignment.exists_two_term_count_alignment"}
There exists a locally finite infinite spectrum $(\gamma_j)$ of distinct positive frequencies, each of multiplicity one, with weights $w_j=\gamma_j/(1/4+\gamma_j^2)$. As $T\to\infty$, we have $N(T)=F(T)+O(1)$ and $W(T)=a(\log T)^2+O(1+\log T)$ for some $a>0$. For all sufficiently large $X$, a single constant $C_V>0$ gives $\sum_{X<\gamma_j\le T} w_j^2\le C_V\log X/X$ for every $T\ge X$.

For each sufficiently large $T$, we have $W(T)>0$, and there is a positive integer $q$ with $q+1\le21\log(21T)/\log 2$. For all integers $m$ and all real $X\le T$, we have $S(X,u_m)=W(X)$ at $u_m=\pi q/2+2\pi qm$. Every open interval $(A,A+(42\pi/\log 2)\log(21T))$ contains some $u_m$.
:::

::: proof
Let $q_n=5^{\lfloor\log_5(n+1)\rfloor}$. Starting at $b_6$, use dyadic blocks $[b_n,b_{n+1})$ with $b_n=4\cdot2^n/21$. The candidate frequencies in block $n$ are $b_n+(4k+1)/(21q_n)$ for $0\le k<q_n2^n$. The derivative $F'(t)=\log(t/(2\pi))/(2\pi)$ and the inequality $n+1<5q_n$ put the increment of $F$ between adjacent grid points in $[0,1)$. The estimate includes gaps between blocks and the gap from the initial boundary to the first grid point.

Keep exactly the points at which $\lfloor F\rfloor$ increases. For $T\ge b_6$, let $v(T)$ be the last candidate at or below $T$, using $b_6$ if there is none. The floor increments telescope to

$$
N(T)=\lfloor F(v(T))\rfloor-\lfloor F(b_6)\rfloor.
$$

The increase of $F$ from $v(T)$ to $T$ is less than one, giving a bounded counting error. The strict and inclusive counts differ by at most one. Partial summation gives the logarithm-squared mass estimate, and $w_j\le1/\gamma_j$ gives the uniform square-tail bound.

With $T$ in block $n$, take $q=21q_n$. For each earlier block, $q_i$ divides $q_n$ and the quotient is a power of five, congruent to one modulo four. Thus $q\gamma_j$ is an integer congruent to one modulo four for each retained $\gamma_j\le T$. Each sine equals one at every $u_m$. The stated interval is longer than the spacing $2\pi q$, so it contains an alignment point. The full proof is checked by the Lean kernel.
:::

At any of these alignment points, the retained frequencies have the same phase, so the cosine of each phase difference is one. This determines the leading coefficient of the ordered Lorentz pair sum $G_T(u)$ through the inclusive cutoff. Write $c=1/(2\pi)$.

::: {.theorem #thm-ch34-montgomery-aligned-lower title="Pair-sum lower bound under full phase alignment" lean="D5/S3/Analytic/Oscillation/MontgomeryAlignmentLower.eventually_montgomery_gt_of_phase_alignment"}
Let the positive ordinate spectrum be locally finite, and let the inclusive count $N(T)$ include multiplicities. Assume $N(T)/(T\log T)\to c$. For each $\kappa<2\pi c^2$, the following holds for all sufficiently large $T$. For every real $u$, if $\cos((\gamma_i-\gamma_j)u)=1$ for each pair through the cutoff, then $G_T(u)>\kappa T(\log T)^2$.
:::

::: proof
The phase condition reduces the pair sum to the Lorentz energy with multiplicities. Apply Cauchy–Schwarz on the interval obtained by extending the cutoff interval by $\sqrt{T}$ at both ends. The ratio of the extended length to $T$ tends to one, and so does the fraction of each ordinate's kernel mass retained in the extended interval. After division by $T(\log T)^2$, the lower bound tends to $2\pi c^2$. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** The commensurate spectrum has bounded counting discrepancy, so [@thm-ch34-montgomery-bounded-count-upper] gives a uniform upper bound on the normalized pair sum. For every $\varepsilon>0$, the bound is $2\pi c^2+\varepsilon$ for all sufficiently large $T$. To find $u_m$, use the open interval starting at $\log T$ of length $(42\pi/\log 2)\log(21T)$. For $T\ge21$, it lies in $[\log T,(1+84\pi/\log 2)\log T]$. On this spectrum one can choose such a $u_m$ at every sufficiently large $T$ so that $G_T(u_m)/(T(\log T)^2)$ tends to $2\pi c^2$. For the actual ζ ordinates, the critical collision theorem still needs an arithmetic bound. A single $\kappa<2\pi c^2$ must bound the normalized pair sum throughout $\log T\le |u|\le A\log T$ for each fixed $A>1$ and all sufficiently large $T$.

Even with bounded two-term count discrepancy, unit multiplicity and the specified harmonic weights, these hypotheses allow the sine sum to reach the full weight in every interval of the stated logarithmic length. Character averaging detects the zero frequency. Over a finite window, using that method on actual ζ ordinates still requires control of nonzero high-order weighted frequency differences close to zero. The estimate at moment orders growing with $T$ remains open here. [Lean implementation of character averaging](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)
