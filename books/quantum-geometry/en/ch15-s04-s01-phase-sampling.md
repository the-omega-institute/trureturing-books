# K.1 Actual counting distributions and phase sampling {#sec-ch15-s04-s01-phase-sampling}

::: {.corollary #cor-finite-poisson-period title="Finite Poisson Summation over an Additive Subgroup of ZMod m" lean="D5/S3/Fourier/FinitePoisson.finite_poisson_summation"}
Let $m \in \mathbb{N}$ with `[NeZero m]`, let $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ be an additive subgroup, and let $f : \mathrm{ZMod}\,m \to \mathbb{C}$ be any complex-valued function. Then

$$
\sum_{h : H} f(h.1) = \frac{(\mathrm{Fintype.card}\,H : \mathbb{C})}{(m : \mathbb{C})} \cdot \sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1.
$$
:::

::: proof
Expanding `ZMod.dft` on the right-hand side and interchanging the finite sums over $k \in \mathrm{annihilator}(H)$ and $x \in \mathrm{ZMod}\,m$ gives

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1
= \sum_{x \in \mathrm{ZMod}\,m} f(x) \sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(-k.1)(x).
$$

Since negation $k \mapsto -k$ is a bijection on the subgroup $\mathrm{annihilator}(H)$, [@prop-finite-character-cancellation] reduces the inner sum to $|\mathrm{annihilator}(H)|$ for $x \in H$ and $0$ for $x \notin H$. Multiplying by $\frac{|H|}{m}$ and using the cardinality identity $|H| \cdot |\mathrm{annihilator}(H)| = m$ cancels the prefactor to $1$, leaving $\sum_{h : H} f(h.1)$. The full proof is checked by the Lean kernel.
:::


In the example with $m = 32$ and period $r = 8$, the comb of positions $H = \{0, 8, 16, 24\}$ has only $4$ cells, while the annihilator $H^\perp = \{0, 4, 8, \dots, 28\}$ has $8$ frequencies, spaced $m/r = 4$ apart.

::: {.remark #rem-shor-divisibility-boundary-literature title="Boundaries between finite Poisson summation, conditional candidates, and the full Shor algorithm"}
**Scope.** To connect [@cor-finite-poisson-period] to Shor's algorithm, first distinguish two boundaries, then derive the counting-register distribution from the actual input when the period need not divide the register size. The exact marginal, normalization, and pointwise bound are stated next with their frozen declarations; the derivation below explains those statements, while the full algorithmic claims remain in [@rem-grover-qft-shor-literature].

1. **Finite Poisson summation is not the full Shor factoring theorem**: [@cor-finite-poisson-period] is an algebraic identity on $\mathrm{ZMod}\,m$, not a formalization of Shor's full success probability, continued-fraction recovery theorem, or polynomial gate complexity. Conditional candidate membership is supplied separately by [@thm-shor-nearest-candidate] and [@thm-shor-coprime-candidate]; below, combining these with the actual marginal gives a single-run lower bound for the event that the candidate list contains the true order when $N^2\le Q$. The full algorithmic boundaries remain in [@rem-grover-qft-shor-literature].
2. **Exact divisibility ($r \mid Q$) versus general non-divisibility ($r \nmid Q$)**: When $r \mid Q$, a complete periodic comb is a coset of a subgroup of $\mathrm{ZMod}\,Q$, so non-resonant frequencies vanish **exactly** by [@prop-finite-character-cancellation]. When $r \nmid Q$, the comb cut off at the register boundary does not support this use of the subgroup identity. One must calculate a finite geometric sum. After obtaining a probability bound near a peak, passing from a frequency approximation to candidates remains a separate number-theoretic task; the conditional theorems below settle its membership component. Combining them with the actual phase mixture then bounds the single-run event that the candidate list contains the true order. This leaves the literature boundary for concentration of a conditioned comb unchanged.

:::

::: {.theorem #thm-shor-qpe-probability-mixture title="Actual-input Shor counting marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_qpe_probability_mixture"}
For every parameter record $c$ (with modulus at least $2$, a coprime natural base, target width whose dimension $D=2^{\mathrm{width}}$ contains the modulus, and period $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$), every control width $n\in\mathbb N$, and every $y\in\mathrm{Fin}(2^n)$,

$$
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)
=\frac{1}{r}\sum_{s\in\mathrm{Fin}\,r}
\operatorname{probability}\!\left(2^n,\frac{s.\operatorname{val}}{r},y\right).
$$

Here `normSquared` sums the squared moduli over every one of the $D$ physical target coordinates. The input is the record's computational basis vector at coordinate $1$; the equality gives the marginal probability of the specified counting outcome after summing over the entire work register.
:::

::: proof
The frozen declaration expands the actual basis input into the orthonormal Fourier eigenstates of its modular orbit, applies the controlled powers and inverse Fourier transform, and uses orthogonality to remove the cross terms. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-shor-distribution-normalized title="Normalization of the actual Shor counting marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_distribution_normalized"}
For every parameter record $c$, writing $r=c.\operatorname{period}$, and every $n\in\mathbb N$,

$$
\sum_{y\in\mathrm{Fin}(2^n)}
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)=1.
$$

This includes the edge case $n=0$, where the control register has the single outcome $y=0$.
:::

::: proof
Summing the actual-input mixture over all counting outcomes invokes the normalized arbitrary-phase kernels; the period factor cancels because the period is positive. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-shor-mixture-peak-lower-bound title="Pointwise nearest-grid lower bound for the actual marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_mixture_peak_lower_bound"}
For every parameter record $c$, writing $r=c.\operatorname{period}$, every $n\in\mathbb N$, every $s\in\mathrm{Fin}\,r$, and every $b\in\mathrm{Fin}(2^n)$, assume

$$
\operatorname{Nearest}\!\left(2^n,\frac{s.\operatorname{val}}{r},b\right).
$$

By definition, this assumption means

$$
\exists z\in\mathbb Z,\ \left|\frac{s.\operatorname{val}}{r}-\frac{b.\operatorname{val}}{2^n}-z\right|\le\frac{1}{2\cdot2^n}.
$$

Then

$$
\frac{1}{r}\,\frac{4}{\pi^2}
\le
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,b\right).
$$

This is a pointwise statement for the selected phase and grid label; distinct phases may select the same label, so it is not an aggregate-event probability.
:::

::: proof
The arbitrary-phase bound supplies $4/\pi^2$ for the selected eigenphase. The actual mixture has weight $1/r$ for that component, and all other squared norms are nonnegative. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-qpe-arbitrary-phase-lower-bound title="Circular nearest-grid bound for one phase" lean="D5/S3/Quantum/ShorCountingMarginal.qpe_arbitrary_phase_lower_bound"}
For every $N\in\mathbb N$ with $0<N$, every real phase $\theta$, and every $b\in\mathrm{Fin}\,N$, assume

$$
\operatorname{Nearest}(N,\theta,b).
$$

By definition, this assumption means

$$
\exists z\in\mathbb Z,\ \left|\theta-\frac{b.\operatorname{val}}{N}-z\right|\le\frac{1}{2N}.
$$

We have

$$
\frac{4}{\pi^2}\le\operatorname{probability}(N,\theta,b).
$$

The integer shift makes this a circular condition, including both midpoint ties and the $0/1$ seam.
:::

::: proof
The proof shifts the phase by the supplied integer, evaluates the finite geometric sum, applies the sine bounds on the nearest interval, and squares the resulting $2/\pi$ amplitude estimate. The full proof is checked by the Lean kernel.
:::

A nearest-grid lower bound concerns one bar. Controlling the total weight outside a window requires summing the tail. In the inverse-Fourier convention, write

$$
\begin{aligned}
A_Q(\theta,j)&=\frac1Q\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-j.\operatorname{val}/Q)},\\
p_Q(\theta,j)&=|A_Q(\theta,j)|^2=\operatorname{probability}(Q,\theta,j),\\
d_Q(\theta,j)&=\left\|\left(\theta-\frac{j.\operatorname{val}}Q:\mathbb R/\mathbb Z\right)\right\|.
\end{aligned}
$$

The last line is exactly Lean's `UnitAddCircle` norm: circular distance after reducing the error modulo integers, with values in $[0,1/2]$. We use $\varepsilon$ for the radius to distinguish it from the label reflection $\rho$ below.

::: {.theorem #thm-qpe-circular-tail title="Circular-window tail for single-phase QPE" lean="D5/S3/Quantum/QPECircularTail.qpe_circular_tail_le"}
For every $n\in\mathbb N$, every real phase $\theta\in\mathbb R$, and every real radius $\varepsilon>0$, put $Q=2^n$. Then

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\\varepsilon\le d_Q(\theta,j)}}p_Q(\theta,j)
\le\frac1{2Q\varepsilon}+\frac1{2(Q\varepsilon)^2}.
$$

The bad event includes labels at distance exactly $\varepsilon$. The phase need not lie in $[0,1)$, and no nearest-grid, order, or coprimality hypothesis is required.
:::

::: proof
Subtract a nearest integer from each error to obtain absolute value at most $1/2$. The geometric sum and a sine lower bound give $|A_Q(\theta,j)|\le1/(2Qd_Q(\theta,j))$ at positive distance. Lift the labels to integers; reduction modulo $Q$ proves that the lifts are distinct. Squaring and summing reduces the estimate to a finite reciprocal-square tail on each side of the center. Retain each side's first term and bound the rest by a telescoping sum of reciprocal differences, yielding the stated constants. The full proof is checked by the Lean kernel.
:::

Combining the tail with [normalization of the single-phase kernel](lean:D5/S3/Quantum/ShorCountingMarginal.qpe_probability_normalized), partition all labels into the bad event and its strict good window to obtain the direct consequence

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\d_Q(\theta,j)<\varepsilon}}p_Q(\theta,j)
\ge1-\frac1{2Q\varepsilon}-\frac1{2(Q\varepsilon)^2}.
$$

This applies the cited tail and normalization, without introducing another frozen declaration. The good-window inequality is strict: equality with the radius belongs to the bad event. At $Q=128$ and $\varepsilon=1/16$, $Q\varepsilon=8$, the tail bound is $1/16+1/128=9/128$, and the strict good window has mass at least $119/128$, for every real phase. The theorem includes $n=0$, negative phases, integer shifts, the $0/1$ seam, and midpoint ties. When $\varepsilon>1/2$, the bad event is empty. A bound larger than $1$ merely means that this estimate is loose at that scale.

The supplied proof comes from QudeLeap Team's [Lean-QuantumAlg, fixed revision](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00), retaining its attribution and Apache 2.0 license. The single-shot estimate appears in Lin Lin, *Lecture Notes on Quantum Algorithms for Scientific Computation*, [arXiv:2201.08309v1](https://arxiv.org/abs/2201.08309v1), §3.5, equations (3.48)–(3.50). This sums only the existing inverse-Fourier single-phase kernel. The candidate-event bound below instead combines the actual mixture, the nearest-grid estimate, and number-theoretic recovery. The tail bound alone supplies no concentration result for every conditioned comb, repeated-sampling law, or factor-extraction guarantee. With a positive final $\mathcal F_+$, first reflect the label by $\rho(k)=(-k)\bmod Q$, as below, before using the same phase.

::: {.remark #rem-shor-actual-input-marginal title="Actual-input derivation and the remaining Shor boundaries"}
The following actual-input derivation explains the four statements about the marginal, normalization, and pointwise lower bounds. The later [@thm-shor-nearest-candidate] and [@thm-shor-coprime-candidate] give conditional continued-fraction candidate membership; we then use them to bound the probability that a single-run candidate list contains the true order. The boundaries for exact-order selection, repeated sampling, factor extraction, and full algorithmic complexity remain in [@rem-grover-qft-shor-literature].

**The actual input is $|1\rangle$.** Let the modulus be $N\ge2$ and the natural-number base $a$ satisfy $\gcd(a,N)=1$. The work register has $w$ qubits and dimension $D=2^w$, with only $N\le D$ required. Independently, the counting register has size $Q=2^n$ for any natural number $n$, including $0$. Work basis labels are $t\in\mathrm{Fin}\,D$; the padded modular permutation and its linear action are

$$
\begin{aligned}
\pi_a(t)&=\begin{cases}at\bmod N,&t<N,\\t,&N\le t<D,\end{cases}\\
U_a|t\rangle&=|\pi_a(t)\rangle.
\end{aligned}
$$

Coprimality makes multiplication modulo $N$ a permutation, while the extra padding coordinates stay fixed. Set $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$ and write $t_j=a^j\bmod N$ for $0\le j<r$. These $r$ basis vectors are distinct, and $U_a|t_j\rangle=|t_{j+1\bmod r}\rangle$. The circuit starts in the basis vector $|1\rangle=|t_0\rangle$: it requires neither prior knowledge of $r$ nor preparation of an unknown eigenstate. The order $r$ is a parameter used to analyze this actual modular cycle.

**Where does the uniform phase mixture come from?** On this cycle define the normalized Fourier vectors

$$
\begin{aligned}
|u_s\rangle&=\frac{1}{\sqrt r}\sum_{j=0}^{r-1}e^{-2\pi i sj/r}|t_j\rangle,
\qquad 0\le s<r,\\
U_a|u_s\rangle&=e^{+2\pi i s/r}|u_s\rangle,\\
\langle u_s\mid u_{s'}\rangle&=\delta_{ss'},
\qquad |1\rangle=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}|u_s\rangle.
\end{aligned}
$$

The negative sign in the first line matches the positive sign in the second: shifting the orbit index from $j$ to $j+1$ extracts $e^{+2\pi i s/r}$. Orthogonality follows by summing $r$th roots of unity. Summing over $s$ then leaves only $j=0$, yielding the last identity. This is a coherent decomposition of a pure state, without assuming an initially sampled classical phase. These vectors span the orbit subspace; they are not asserted to form an eigenbasis of the entire $D$-dimensional work space.

**Two factors of $1/\sqrt Q$ give $1/Q$ in the amplitude.** After uniform preparation of the counting register, the binary control bits apply powers $U_a^{2^j}$. On branch $x=\sum_j x_j2^j$, their product is $U_a^x$. Thus the actual joint state before the Fourier transform is

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle U_a^x|1\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle.
$$

First use the source's inverse transform $\mathcal F_- =\mathcal F_+^{-1}$, whose matrix elements are $Q^{-1/2}e^{-2\pi i kx/Q}$. Let $v_-(k)$ be the work vector at counting outcome $k$ after this transform. Then

$$
\begin{aligned}
v_-(k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{-2\pi i kx/Q}|a^x\bmod N\rangle\\
&=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}A_Q(s/r,k)|u_s\rangle,\\
A_Q(\theta,k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-k/Q)},\\
p_Q(\theta,k)&=|A_Q(\theta,k)|^2.
\end{aligned}
$$

The factor $1/Q$ includes both the $1/\sqrt Q$ from uniform input preparation and the $1/\sqrt Q$ from the inverse Fourier transform. Neither may be omitted.

**The actual probability sums over every work outcome.** The unconditional counting-register marginal is

$$
\begin{aligned}
P_-(k)&=\sum_{t=0}^{D-1}|v_-(k)(t)|^2\\
&=\frac{1}{r}\sum_{s=0}^{r-1}p_Q(s/r,k).
\end{aligned}
$$

The left side includes all $D$ coordinates. Coordinates outside the orbit, including the padding, have zero amplitude for this input. On the right, the uniform weight $1/r$ follows from eliminating cross terms with $\langle u_s\mid u_{s'}\rangle=\delta_{ss'}$. This is neither the probability for a single eigenphase nor the comb distribution conditioned on a particular work outcome. For any real phase $\theta$, expanding the square and using orthogonality of $Q$th roots of unity gives a direct normalization check:

$$
\begin{aligned}
\sum_{k=0}^{Q-1}p_Q(\theta,k)
&=\frac{1}{Q^2}\sum_{x,x'=0}^{Q-1}e^{2\pi i(x-x')\theta}
  \sum_{k=0}^{Q-1}e^{-2\pi i k(x-x')/Q}\\
&=\frac{1}{Q^2}\sum_{x=0}^{Q-1}Q=1,\\
\sum_{k=0}^{Q-1}P_-(k)&=\frac{1}{r}\sum_{s=0}^{r-1}1=1.
\end{aligned}
$$

Here $x,x'$ both range from $0$ to $Q-1$, so the inner sum is $Q$ precisely when $x=x'$ and is zero otherwise. At $n=0$, $Q=1$, the controlled-power sequence is empty, $A_1(\theta,0)=1$, and the sole counting outcome still has actual probability $P_-(0)=1$. At $r=1$, the orbit consists only of $|1\rangle$ and the mixture has just the phase-$0$ component, so $P_-(0)=1$ and every other counting outcome has probability zero. None of this uses $r\mid Q$, $Q>r^2$, or $n>0$.

**The chapter's positive-exponent convention reflects the output.** Let $e:\mathrm{Fin}\,Q\simeq\mathrm{ZMod}\,Q$ be `ZMod.finEquiv`, identifying labels by their least nonnegative representatives, and write $\rho(k)=e^{-1}(-e(k))$, namely $(-k)\bmod Q$. For any coordinate function $f$ under this identification, the unnormalized negative-exponent `ZMod.dft` used in this section satisfies

$$
\begin{aligned}
(\mathcal F_-f)(k)&=\frac{1}{\sqrt Q}(\mathrm{ZMod.dft}\,f)(e(k)),\\
(\mathcal F_+f)(\rho(k))&=(\mathcal F_-f)(k).
\end{aligned}
$$

Thus, if the final transform follows this chapter's $\mathcal F_+$ convention, the same work vector occurs at the reflected label: $v_+(\rho(k))=v_-(k)$, hence $P_+(\rho(k))=P_-(k)$. The phase label remains $s/r$. An inverse-transform outcome near $sQ/r$ corresponds to $\rho(k)$ for the positive transform; changing the Fourier sign cannot silently leave the peak label unchanged.

**The nearest-grid lower bound is pointwise.** Fix any $s\in\mathrm{Fin}\,r$ and $b\in\mathrm{Fin}\,Q$ satisfying the circular nearest-grid condition

$$
\exists z\in\mathbb Z,\qquad
\left|\frac{s}{r}-\frac{b}{Q}-z\right|\le\frac{1}{2Q}.
$$

Either midpoint choice is allowed, including a tie across the $0/1$ seam. Put $\delta=s/r-b/Q-z$; shifting the phase by an integer does not change $A_Q$. If $\delta=0$, then $A_Q(s/r,b)=1$. Otherwise, the finite geometric sum gives

$$
|A_Q(s/r,b)|
=\frac{|\sin(\pi Q\delta)|}{Q|\sin(\pi\delta)|}
\ge\frac{2Q|\delta|}{Q\pi|\delta|}
=\frac{2}{\pi}.
$$

The inequalities are $|\sin u|\ge2|u|/\pi$ for $|\pi Q\delta|\le\pi/2$ and $|\sin u|\le|u|$. The denominator is strictly positive in this nonzero branch. Squaring gives separate bounds for a phase component and the actual marginal:

$$
\begin{aligned}
p_Q(s/r,b)&\ge\frac{4}{\pi^2},\\
P_-(b)&\ge\frac{1}{r}p_Q(s/r,b)\ge\frac{4}{r\pi^2},\\
P_+(\rho(b))&\ge\frac{4}{r\pi^2}.
\end{aligned}
$$

The quantifiers cover every $n\ge0$, every phase index $s<r$, and every $b<Q$ satisfying the nearest-grid condition. Different $s$ can select the same $b$, especially when $Q<r$. These pointwise bounds cannot simply be added as though they referred to distinct measurement events.

**A small non-divisible example: $N=7,a=2,D=8,Q=4,r=3$.** The modular cycle is $1,2,4$, and the state before the transform is

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac12\bigl(|0\rangle|1\rangle+|1\rangle|2\rangle
+|2\rangle|4\rangle+|3\rangle|1\rangle\bigr).
$$

At $k=0$, $v_-(0)=(2|1\rangle+|2\rangle+|4\rangle)/4$, so the actual probability is $(4+1+1)/16=3/8$. The phase kernels also give $p_4(0,0)=1$ and $p_4(1/3,0)=p_4(2/3,0)=1/16$, whose uniform mixture is $(1+1/16+1/16)/3=3/8$. But conditioning on work outcome $2$ before the final Fourier transform leaves the counting state $|1\rangle$, giving probability $1/4$ at each of the four Fourier outcomes. Expanding every coordinate shows the full distinction:

| Counting label $k$ | Actual $P_-(k)$ | Conditional $P_-(k\mid t=2)$ |
| --- | --- | --- |
| $0$ | $3/8$ | $1/4$ |
| $1$ | $1/4$ | $1/4$ |
| $2$ | $1/8$ | $1/4$ |
| $3$ | $1/4$ | $1/4$ |

Work outcomes $1,2,4$ have probabilities $1/2,1/4,1/4$, respectively. Averaging their conditional distributions with these weights gives the actual marginal. Here $3\nmid4$ and $Q<r^2$, yet all the formulas above apply. This example makes no claim about continued-fraction recovery or integer factorization.

The frozen mathematical source is [`D5/S3/Quantum/ShorCountingMarginal.lean`](https://github.com/the-omega-institute/trureturing/blob/0ee6636c21a9d8fb2bafd11c91a8fb6247154a25/D5/S3/Quantum/ShorCountingMarginal.lean) at the merged trureturing commit `0ee6636c21a9d8fb2bafd11c91a8fb6247154a25`: its `Parameters.shor_qpe_probability_mixture`, `shor_distribution_normalized`, and `shor_mixture_peak_lower_bound` are cited above, and its `QuantumPhaseEstimationGeneral.qpe_arbitrary_phase_lower_bound` supplies the per-phase estimate. The source parameters `modulus, base, width, dimension, period` correspond to $N,a,w,D,r$; `runQPE` uses $\mathcal F_-$, and `normSquared` sums squared coordinate moduli over the entire work register. The transplant preserves the supplier's Apache 2.0 notice and source reference in the Lean file. The literature basis for the surrounding algorithmic discussion is R. Cleve, A. Ekert, C. Macchiavello, and M. Mosca, *Quantum Algorithms Revisited*, [arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016), §§5–6, Eqs. (5.2)–(5.4) and (6.1)–(6.4).

The derivation above gives the actual-input marginal, its normalization, and a pointwise nearest-grid lower bound. Below we add $N^2\le Q$, establish conditional candidate membership, and sum the same event within each phase component to obtain a single-run list-membership probability bound. An explicit independent-reset premise then yields an all-pairs least-common-multiple list-event bound for exactly two observations. Certification of each exact-order return, integer factorization, arbitrary correlated repetitions, and full gate complexity retain the boundaries in [@rem-grover-qft-shor-literature]. No guarantee for arbitrary non-power-of-two $Q$, every conditioned posterior comb, or hardware implementation follows here.
:::
