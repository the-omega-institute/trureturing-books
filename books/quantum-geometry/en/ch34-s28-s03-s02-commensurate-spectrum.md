# M.2.9 Frequent full phase alignment with a logarithmic square tail {#frequent-full-phase-alignment-with-a-logarithmic-square-tail}

The mass estimate gives the total retained weight, and the square-tail bound describes how broadly the weights are distributed. The [critical missing-window theorem](ch34-s28-s03-s02-mobius-and-spectra.md#thm-ch31-critical-missing-window) also needs control of the phase relations between frequencies.

For a locally finite positive spectrum $(\gamma_j)$ with weights $w_j$, write $W(T)=\sum_{\gamma_j\le T}w_j$ and $S(T,u)=\sum_{\gamma_j\le T}w_j\sin(\gamma_j u)$.

::: {.theorem #thm-ch31-commensurate-full-alignment title="Full phase alignment in intervals of logarithmic length" lean="D5/S3/Analytic/Oscillation/SpectrumCommensurateAlignment.exists_logarithmic_full_alignment"}
There exists a locally finite infinite spectrum $(\gamma_j)$ of distinct positive frequencies with strictly positive weights $w_j$. For all sufficiently large $T$, the mass satisfies $W(T)=a(\log T)^2+O(1+\log T)$ with $a>0$. For all sufficiently large $X$, a single constant $C_V>0$ gives $\sum_{X<\gamma_j\le T}w_j^2\le C_V\log X/X$ for every $T\ge X$.

For every $T\ge5$ the mass $W(T)$ is positive, and there is an integer $q\ge1$ with $q+1\le\log T/\log 2$. For each $m\in\mathbb Z$ and every $X\le T$, we have $S(X,u_m)=W(X)$ at $u_m=\pi q/2+2\pi q m$. For every real $A$ at least one $u_m$ lies strictly inside $(A,A+(2\pi/\log 2)\log T)$.
:::

::: proof
In the dyadic block $(4\cdot2^n,8\cdot2^n)$ let $q_n=5^{\lfloor\log_5(n+1)\rfloor}$, the largest power of five up to $n+1$. Place $q_n2^n$ frequencies at $4\cdot2^n+(4k+1)/q_n$ for $0\le k<q_n2^n$. Distribute the block weight $2n+1$ equally among them.

If the cutoff lies in block $n$, the first $n$ complete blocks contribute $n^2$, and the current block contributes at most $2n+1$. Using $n+2\le\log_2 T<n+3$ gives $a=(\log 2)^{-2}$. The sum of squared weights in one block is at most $20(n+1)/2^n$, the difference between $40(n+2)/2^n$ and its successor. Summing from the block containing $X$, including both possibly incomplete boundary blocks, gives the uniform square-tail bound.

With the upper cutoff in block $N$, multiplying each retained frequency by $q_N$ gives an integer congruent to one modulo four, since every quotient $q_N/q_n$ is a power of five. Each sine equals one at $u=\pi q_N/2+2\pi q_N m$ for $m\in\mathbb Z$. Consecutive points are spaced by $2\pi q_N\le 2\pi(N+1)$, at least $2\pi$ shorter than the stated interval. The first alignment at or after $A+\pi$ lies strictly inside it. The first frequency is $5$ and enters at that cutoff. The full proof is checked by the Lean kernel.
:::

Fix $0<\beta<1$. Then $\beta^2W(T)-\log T<W(T)$, so every closed interval of length at least $(2\pi/\log 2)\log T$ contains a point above the missing-window threshold in this comparison spectrum. For a score $S(T,u/r)$ with fixed $r>0$, the spacing in time is multiplied by $r$. Deducing critical missing windows from the two mass conditions requires an additional frequency condition that excludes this phase locking. The high-order near-collision estimate for actual ζ ordinates remains open. For a related arithmetic distinction, an ordinate is self-sufficient in the sense of Martin and Ng if it lies outside the rational span of the other ordinates. [Martin and Ng, Definition 1.3](https://arxiv.org/html/1710.00088#S1.Thmtheorem3)
