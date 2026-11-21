# 15.4 Finite Period Sampling and Order Reconstruction in Shor’s Algorithm {#sec-shor-order-reconstruction}

Applying [@prop-finite-character-cancellation] to an arbitrary function $f : \mathrm{ZMod}\,m \to \mathbb{C}$ yields the **finite Poisson summation formula**.

Be careful to note the exact Fourier convention used by Mathlib's `ZMod.dft` in the source file: `ZMod.dft f` is the **unnormalized, negative-exponent** discrete Fourier transform

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

One must never silently replace `ZMod.dft` with the physics convention $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ without accounting for the $1/\sqrt{m}$ factor and the sign reversal $k \leftrightarrow -k$ (though because $\mathrm{annihilator}(H)$ is an additive subgroup, $k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$, leaving the sum over $\mathrm{annihilator}(H)$ invariant).

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

::: {.viz src="phase-gears" preset="dual" height="500"}
**The peaks are $Q/r$ apart, not $r$.** $Q = 32$ and period $r = 8$: the cyan comb $H = \{0, 8, 16, 24\}$ on the register has only $4$ cells, $8$ apart; after the sweep the spectrum keeps $8$ equal bars, each $\frac{1}{8}$, at $0, 4, 8, \dots, 28$, exactly the $8$ frequencies of $H^\perp$, spaced $Q/r = 4$ apart. At $k = 4$ the four cyan arrows all point right and the chain has length $4$; $\lvert H\rvert \cdot \lvert H^\perp\rvert = 4 \cdot 8 = 32$ ([@cor-finite-poisson-period]). In the example, $Q = 16$ and $r = 4$ happen to give $r = Q/r = 4$, so the two combs coincide.
:::
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

Passing from the distribution to postprocessing requires a number-theoretic bridge. The earlier $N=7,Q=4,r=3$ example concerns only the marginal: $N^2=49>4$, so it cannot instantiate the recovery results below. Now impose the resolution condition $N^2\le Q$ and ask a deterministic question: given the measured integer, which finite list is guaranteed to contain the required fraction?

::: {.definition #def-shor-observable-candidates title="Finite continued-fraction candidates from observable inputs" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.candidates"}
For natural numbers $y,Q,N$, let $C(x)$ be the finite list of continued-fraction convergents of a rational $x$. Define

$$
\operatorname{candidates}(y,Q,N)
=\bigl[z\in C(y/Q)\mid\operatorname{den}(z)<N\bigr].
$$

Its only inputs are the measured integer $y$, counting capacity $Q$, and modulus $N$. The unknown order $r$ and phase index $s$ are not inputs. Each rational is represented in lowest terms with positive denominator.
:::

How is $C(x)$ actually enumerated? Put $a_0=\lfloor x\rfloor$ and $f=x-a_0$. If $f=0$, return $[a_0]$. Otherwise recursively enumerate $C(1/f)$, replace each entry $z$ by $a_0+1/z$, and prepend $a_0$. For example, $21/64$ starts with $a_0=0$, then $64/21=3+1/21$, yielding $[0,1/3,21/64]$. The positive reduced denominator strictly decreases at every recursive call, making the list finite. Below we also bound its length, while distinguishing stage counts from actual work. The source definition [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) also accepts negative rationals, zero, and integers. Totalized rational division defines candidates even at $Q=0$, although the application below always has $Q>0$.

This is a list of genuine real continued-fraction convergents. The exact correspondence [`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) says that, for any rationals $x,z$, membership $z\in C(x)$ is equivalent to the existence of $k\in\mathbb N$ with $\operatorname{Real.convergent}(x,k)=z$. The real definition repeats the terminal value after a rational expansion terminates; the finite list only needs to retain that value. Write [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) for the rational $s/r$. For $r>0$, its denominator formula [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) is $d=r/\gcd(s,r)$.

Beyond termination, the list's length can be bounded. Write $d=\operatorname{den}(x)$ for the canonical positive reduced denominator of a rational $x$, and read $\operatorname{Nat.log}(2,d)$ as $\lfloor\log_2d\rfloor$; here $d\ge1$ always.

::: {.theorem #thm-rational-convergents-log-length title="Logarithmic length of the rational convergent list" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
For every rational $x\in\mathbb Q$,

$$
\operatorname{length}(C(x))\le2\operatorname{Nat.log}(2,\operatorname{den}(x))+1.
$$

This includes negative rationals, zero, and integers. An integer has denominator $1$ and a singleton list, attaining equality.
:::

::: proof
Use strong induction on the positive reduced denominator. An integer terminates immediately. If the reciprocal fractional part is still nonintegral, the denominators after two and one recursive steps sum to at most the original denominator, and the former is strictly smaller than the latter. Thus two steps at least halve the denominator. Monotonicity of the natural logarithm and its multiplication-by-two identity account for the two removed entries before applying the induction hypothesis. The full proof is checked by the Lean kernel.
:::

For the observable candidates, only $y,Q,N\in\mathbb N$ and $Q>0$ are needed. Filtering cannot increase length, and

$$
\operatorname{den}(y/Q)=\frac{Q}{\gcd(y,Q)}\le Q.
$$

Applying [@thm-rational-convergents-log-length] and monotonicity of the natural logarithm gives

$$
\begin{aligned}
\operatorname{length}(\operatorname{candidates}(y,Q,N))
&\le2\operatorname{Nat.log}(2,Q)+1,\\
\operatorname{length}(\operatorname{candidates}(y,2^n,N))&\le2n+1
\quad(n\in\mathbb N).
\end{aligned}
$$

This application requires neither $y<Q$ nor $N>0$. At $n=0$ the bound is $1$; at $N=0$ the filtered list is empty. It counts entries or Euclidean recursive stages. It supplies no bound on all the repeated `map` work, arithmetic bit complexity, or gate complexity. A short list does not certify an exact selector or make every candidate denominator divide the true order. The recovery results below still require their actual parameters, resolution, nearestness, and coprimality hypotheses.

::: {.theorem #thm-shor-nearest-candidate title="Conditional candidate membership for a nearest sample" lean="D5/S3/Quantum/ShorContinuedFractions.shor_nearest_candidate"}
For every actual padded modular-multiplication record $c:\operatorname{Parameters}$, write $N=c.\operatorname{modulus}\ge2$ and $a=c.\operatorname{base}\in\mathbb N$, with $\gcd(a,N)=1$. Its work width $w=c.\operatorname{width}$ satisfies $N\le2^w$, and its true order $r=c.\operatorname{period}=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)$ satisfies $0<r<N$. For every independently chosen counting width $n\in\mathbb N$, put $Q=2^n$. For every $s\in\mathrm{Fin}\,r$ and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right).
$$

Then

$$
\begin{aligned}
\operatorname{reduced}(s.\operatorname{val},r)
&\in\operatorname{candidates}(y.\operatorname{val},Q,N),\\
\operatorname{den}\bigl(\operatorname{reduced}(s.\operatorname{val},r)\bigr)&\mid r.
\end{aligned}
$$
:::

::: proof
Excluding wrap-around turns circular nearestness into ordinary absolute error at most $1/(2Q)$. If $d$ is the reduced denominator, $d\le r<N$ and $N^2\le Q$ give $d^2<Q$, so the error is strictly below $1/(2d^2)$. Legendre's approximation theorem supplies a real-convergent index; the finite-list correspondence gives actual membership, and $d<N$ passes the candidate filter. The denominator formula $d=r/\gcd(s.\operatorname{val},r)$ gives $d\mid r$. The full proof is checked by the Lean kernel.
:::

The hypothesis is $\operatorname{Nearest}$ itself. As defined above, it asserts the existence of an integer $z$ such that

$$
\left|\frac{s.\operatorname{val}}r-\frac{y.\operatorname{val}}Q-z\right|\le\frac1{2Q}.
$$

Why can no wrap occur here? Put $\theta=s.\operatorname{val}/r$ and $u=y.\operatorname{val}/Q$. Then $0\le\theta\le1-1/r$ and $0\le u\le1-1/Q$. The nearest nonzero integer shifts, $z=1$ and $z=-1$, give errors at least $1/r$ and $1/Q$, respectively, both strictly greater than $1/(2Q)$; more distant integers are also excluded. Thus $z=0$. The non-strict nearest-grid hypothesis still admits either rounding tie. Strictness in Legendre's radius comes from the denominator's square:

$$
\left|\frac{y.\operatorname{val}}Q-\frac{s.\operatorname{val}}r\right|
\le\frac1{2Q}<\frac1{2d^2},
\qquad d\le r<N,\quad N^2\le Q.
$$

::: {.theorem #thm-shor-coprime-candidate title="Conditional true-order membership for a coprime phase" lean="D5/S3/Quantum/ShorContinuedFractions.shor_coprime_candidate"}
For every actual record $c$ above ($N\ge2$, $\gcd(a,N)=1$, $N\le2^w$, and $0<r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)<N$), every independent counting width $n\in\mathbb N$, $Q=2^n$, $s\in\mathrm{Fin}\,r$, and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right),\qquad
\gcd(s.\operatorname{val},r)=1.
$$

Then the true order occurs in the list of candidate denominators:

$$
r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr).
$$
:::

::: proof
By [@thm-shor-nearest-candidate], the reduced phase belongs to the candidates. Coprimality makes its denominator $r/\gcd(s.\operatorname{val},r)$ equal to $r$. The full proof is checked by the Lean kernel.
:::

The latent parameters $r,s$ describe hypotheses about the measurement; they are unknown when computing the candidates. The second result places the true order in a finite list without certifying how to select it. The first result's divisibility conclusion concerns only the distinguished reduced phase, never every candidate. The following are independent exact rational computations, without additional Lean badges for the examples:

| $N,a,Q;r,s,y$ | Nearest error and bound | $\operatorname{candidates}(y,Q,N)$ |
| --- | --- | --- |
| $7,2,64;3,1,21$ | $1/192\le1/128$ | $[0,1/3]$ |
| $13,4,256;6,1,43$ | $1/768\le1/512$ | $[0,1/5,1/6]$ |
| $7,2,64;3,0,0$ | $0\le1/128$ | $[0]$ |

The first row's full list was computed by Euclidean recursion above; $21/64$ is removed because its denominator is not below $7$. The second row's full list is $[0,1/5,1/6,21/125,43/256]$. Filtering retains both the correct denominator $6$ and the denominator $5$, which does not divide $6$. Thus neither “take the last candidate” nor “pass one modular-exponentiation test” is an exact-order selection algorithm certified here. Even a passing test $a^d\equiv1\pmod N$ alone establishes only $r\mid d$: the tested exponent is a multiple of the order, and need not equal it.

The rational zero has denominator $1$, so the first theorem includes $s=0$. When $r=1$, the sole phase is $s=0$ and $\gcd(0,1)=1$, so the second theorem applies too. The recovery conditions $N\ge2$ and $N^2\le2^n$ already exclude $n=0,1$, whereas the preceding marginal permits these widths. Neither candidate theorem requires $r\mid Q$ or identifies work width $w$ with counting width $n$. With this chapter's positive-exponent final transform $\mathcal F_+$, first reflect the observed label $k_+$ to $y=\rho(k_+)=(-k_+)\bmod Q$, then use nearestness for the same phase $s/r$ and compute these candidates. Keeping the label unchanged would change the phase being approximated.

**One actual measurement: the probability that the candidate list contains the true order.** We can now connect conditional recovery to the actual marginal. Fix any actual parameter record $c$ as above, with $N=c.\operatorname{modulus}\ge2$, $r=c.\operatorname{period}$, $0<r<N$, $Q=2^n$, and $N^2\le Q$. Use exactly $c.\operatorname{modularOperator}$ and $c.\operatorname{input}$: modular multiplication fixes the padding, the work input is $|1\rangle$, and the work and counting widths are independent. Define the finite measurement event

$$
\begin{aligned}
E=\bigl\{y\in\mathrm{Fin}\,Q:\;&r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)\bigr\},\\
p(y)&=\operatorname{normSquared}\!\left(
\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right),\\
k(s,y)&=p_Q(s.\operatorname{val}/r,y),\qquad A=\frac4{\pi^2}.
\end{aligned}
$$

The event $E$ is exactly the source predicate `r ∈ (candidates y.val Q N).map Rat.den`. The unknown $r$ defines success; the candidate computation still takes only $y.\operatorname{val},Q,N$. All quotients are real after casting natural numbers. By [@thm-shor-distribution-normalized], $\Pr_-(E)=\sum_{y\in E}p(y)$ is the event probability of this actual counting measurement. We will obtain

$$
\Pr_-(E)\ge\frac4{\pi^2}\frac{\varphi(r)}r,
\qquad \varphi(r)=\operatorname{Nat.totient}(r).
$$

This bound follows by combining the cited results with finite counting.

**First find an admissible nearest label for each phase.** For $s\in\mathrm{Fin}\,r$, round the real number $x=Qs.\operatorname{val}/r$ to an integer $m$. The nearest-integer estimate `abs_sub_round` gives $|x-m|\le1/2$. Since $0<r<N$ and $N^2\le Q$ imply $r<Q$, we have

$$
\begin{aligned}
0\le x&\le Q-\frac Qr<Q-1,\\
-\frac12\le m&\le x+\frac12<Q-\frac12.
\end{aligned}
$$

Since $m$ is an integer, $0\le m<Q$. Thus we may take $y_s\in\mathrm{Fin}\,Q$ with $y_s.\operatorname{val}=m$. Dividing by $Q>0$ gives

$$
\left|\frac{s.\operatorname{val}}r-\frac{y_s.\operatorname{val}}Q\right|
\le\frac1{2Q}.
$$

This satisfies $\operatorname{Nearest}$ with integer shift $z=0$. Only existence is needed; at a midpoint tie, either non-strict nearest choice satisfies the same estimate. Phase $s=0$ is included.

**Next bound the same event within each component.** Let

$$
\mathcal C=\{s\in\mathrm{Fin}\,r:\gcd(s.\operatorname{val},r)=1\}.
$$

For each $s\in\mathcal C$, [@thm-shor-coprime-candidate] places the chosen $y_s$ in $E$, and [@thm-qpe-arbitrary-phase-lower-bound] gives $k(s,y_s)\ge A$. Every $k(s,y)$ is a squared complex modulus and hence nonnegative, so

$$
\begin{aligned}
\sum_{y\in E}k(s,y)&\ge k(s,y_s)\ge A
&& (s\in\mathcal C),\\
\sum_{y\in E}k(s,y)&\ge0
&& (s\notin\mathcal C).
\end{aligned}
$$

We have first summed the event $E$ within each component. We have neither added possibly coinciding $y_s$ as distinct measurement outcomes nor needed to prove the chosen labels distinct.

**Finally combine the actual mixture with the coprime count.** By [@thm-shor-qpe-probability-mixture], $p(y)=r^{-1}\sum_{s\in\mathrm{Fin}\,r}k(s,y)$. Interchanging finite sums and applying the component event bounds with the positive weight $1/r$ gives

$$
\begin{aligned}
\Pr_-(E)
&=\sum_{y\in E}\frac1r\sum_{s\in\mathrm{Fin}\,r}k(s,y)\\
&=\frac1r\sum_{s\in\mathrm{Fin}\,r}\sum_{y\in E}k(s,y)\\
&\ge\frac1r\sum_{s\in\mathcal C}A\\
&=\frac{|\mathcal C|}{r}\,A
=\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

The last step is finite counting: `Fin.sum_univ_eq_sum_range` rewrites the sum over $\mathrm{Fin}\,r$ as a sum over $0\le s<r$, and `Nat.coprime_comm` aligns the coprimality predicate with the definition of `Nat.totient`. Thus $|\mathcal C|=\#\{a\in\mathbb N:a<r,\ \gcd(r,a)=1\}=\varphi(r)$. This ratio comes from the spectral weights and number of coprime phases for the same actual input; it assumes no additional experiment that samples a latent phase uniformly. For $r=1$, $\mathcal C=\{0\}$ and $\varphi(1)=1$; the sole phase and the only measurement outcome with nonzero probability are zero, and the zero candidate has denominator $1$. The actual event probability is $1$, so the bound still holds. The derivation needs no $r\mid Q$ and adds no width restriction beyond the existing resolution condition.

**Positive-exponent outputs use a reflected event.** If the final transform is $\mathcal F_+$ and $b$ is the observed label, use the involution $\rho(b)=(-b)\bmod Q$ defined above. The event is then

$$
\begin{aligned}
E_+&=\{b\in\mathrm{Fin}\,Q:\rho(b)\in E\},\\
\Pr_+(E_+)&=\sum_{\rho(b)\in E}P_+(b)\\
&=\sum_{y\in E}P_-(y)
\ge\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

The equality uses $P_+(b)=P_-(\rho(b))$ and $\rho^2=\mathrm{id}$. Both nearestness and candidate computation apply to the reflected label $\rho(b)$, so the list is `candidates (rho b).val Q N`. This does not replace the unreflected positive-exponent candidate event by $E$.

This lower bound concerns the probability that the finite candidate list from one actual measurement contains the true order. It does not certify exact-order selection from the list, nor that every candidate denominator divides the true order. It specifies no joint law for two measurements; the next application adds an explicit independent-reset sampling premise. An exact least-common-multiple product law for ideal phase sampling, factor extraction, full bit or gate complexity, hardware realization, and empirical performance remain outside this single-run derivation. Concentration of a conditioned posterior comb has not been established by bounding the actual marginal event.

**Application: two independent resets let two denominators recover the true order.** Reduction can remove prime factors from one recovered denominator; a second denominator can supply the missing factors. Following the two-reset application in the owning `ShorContinuedFractions` exposition, we ask whether the all-pairs least-common-multiple list computed from two observed integers contains the true order.

Fix the same actual parameter record $c$ throughout, with

$$
N=c.\operatorname{modulus}\ge2,\qquad
r=c.\operatorname{period}>0,\qquad
Q=2^n,\qquad N^2\le Q.
$$

We still have $r<N$. Each run starts afresh with the original counting state and the original work input $c.\operatorname{input}=|1\rangle$, uses the same $c.\operatorname{modularOperator}$, and ends with the inverse Fourier transform. The base, modulus, work width, and counting width are identical in the two runs. Write

$$
\begin{aligned}
A_-(y)&=\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y,\\
p(y)&=\operatorname{normSquared}(A_-(y))
=\sum_{u\in\mathrm{Fin}\,c.\operatorname{dimension}}|A_-(y)(u)|^2.
\end{aligned}
$$

This is the actual marginal, summing over the full work register, including padding. **Independent resets are an explicit modeling and sampling premise of this application**: the outputs $Y_1,Y_2$ of the two complete preparations and measurements have joint law

$$
\Pr_-(Y_1=y,Y_2=z)=p(y)p(z).
$$

Equal marginals alone do not imply this law. For example, always copying the first outcome into the second can preserve both marginals while usually changing the joint law. Retaining an unreset work register or allowing arbitrary correlated repetitions does not justify the product law either. Nonnegative squared norms and [@thm-shor-distribution-normalized] give

$$
p(y)p(z)\ge0,\qquad
\sum_{y,z\in\mathrm{Fin}\,Q}p(y)p(z)
=\left(\sum_y p(y)\right)\left(\sum_z p(z)\right)=1.
$$

**The decoder sees only the two observed integers.** Define the denominator lists and their all-pairs list by

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

The source expressions are `(candidates y.val Q N).map Rat.den` and `(D y).flatMap (fun d => (D z).map (fun e => Nat.lcm d e))`. For each $d$ in the first list, form its least common multiple with every $e$ in the second, then concatenate those smaller lists. The computation uses only $y,z,Q,N$, with neither the unknown $r$ nor a latent phase index as input. Define success by

$$
E_2(y,z)\ \Longleftrightarrow\ r\in L(y,z),\qquad
\Pr_-^{(2)}(E_2)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}\,p(y)p(z).
$$

The indicator $\mathbf1_{E_2(y,z)}$ is one when membership holds and zero otherwise. Each observed pair is counted once, even if candidate entries repeat or several denominator pairs produce $r$. The true order defines mathematical success without entering the list computation. We will derive

$$
\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
$$

**Conditional recovery: what does each denominator lose?** For every $s,t\in\mathrm{Fin}\,r$, the preceding nearest-integer construction supplies labels $y_s,y_t\in\mathrm{Fin}\,Q$ satisfying $\operatorname{Nearest}$ for $s.\operatorname{val}/r$ and $t.\operatorname{val}/r$, respectively. Explicitly, round $Qs.\operatorname{val}/r$ to an integer $m$ with error at most $1/2$; $r<Q$ ensures $0\le m<Q$. Only existence is needed, including phase zero and either non-strict nearest choice at a midpoint tie.

By [@thm-shor-nearest-candidate], both reduced phases belong to their respective candidate lists. The existing [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) formula identifies the two distinguished denominators:

$$
d_s=\frac r{\gcd(s.\operatorname{val},r)}\in D(y_s),\qquad
d_t=\frac r{\gcd(t.\operatorname{val},r)}\in D(y_t).
$$

Both gcds divide $r$. Applying `Nat.div_lcm_eq_div_gcd` and `Nat.gcd_gcd_gcd_right` gives the exact identity

$$
\operatorname{lcm}(d_s,d_t)
=\frac r{\gcd\bigl(\gcd(s.\operatorname{val},t.\operatorname{val}),r\bigr)}.
$$

Thus $r\in L(y_s,y_t)$ whenever the phase pair is **jointly primitive**, meaning $\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1$. Neither numerator needs to be individually coprime to $r$. This makes no divisibility claim about the other candidate denominators.

For example, take the actual modulus $N=13$, base $a=4$, work width $w=4$, and $Q=256$, with true order $r=6$. For phase numerators $s=2,t=3$, nearest observations are $y=85,z=128$, with errors $1/768\le1/512$ and $0$, respectively. Computing directly from the observable inputs gives

$$
\begin{aligned}
\operatorname{candidates}(85,256,13)&=[0,1/3],& D(85)&=[1,3],\\
\operatorname{candidates}(128,256,13)&=[0,1/2],& D(128)&=[1,2],\\
L(85,128)&=[1,2,3,6].
\end{aligned}
$$

Here $\gcd(2,6)=2$ and $\gcd(3,6)=3$. The recovered denominators $3$ and $2$ are both smaller than the true order, but their least common multiple is $6$. The phases and true order explain why this observed pair succeeds; they were not used to enumerate its lists. This is a deterministic hand calculation, not a substitution of one observed pair's probability for the probability of the whole event.

**At least half of all phase pairs are jointly primitive.** Let

$$
H_r=\#\{(s,t)\in\mathrm{Fin}\,r\times\mathrm{Fin}\,r:
\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1\}.
$$

Every failing pair has some prime $p\mid r$ dividing both numerators. For each such $p$, send a label with $p\mid s.\operatorname{val}$ to $s.\operatorname{val}/p$. This is an injection into $\mathrm{Fin}(r/p)$; since $p\mid r$, the division of $r$ is exact. Zero is included among the divisible numerators. At most $(r/p)^2$ ordered pairs therefore have both coordinates divisible by $p$. A union bound over the distinct prime factors gives

$$
\begin{aligned}
r^2-H_r&\le\sum_{p\in\operatorname{primeFactors}(r)}(r/p)^2,\\
\frac{r^2-H_r}{r^2}&\le
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}.
\end{aligned}
$$

Repeated prime factors appear only once in this sum, and overlaps among bad sets merely weaken the upper bound. Ratios are taken after casting to the reals.

Separate $2,3,5$. Every remaining prime divisor is odd, at least $7$, and at most $r$, hence belongs to $\{7+2k:0\le k<r\}$. Use the original finite-tail estimate [`reciprocal_square_shifted_finite_tail_le`](lean:D5/S3/Quantum/QPECircularTail.reciprocal_square_shifted_finite_tail_le): for every real $b>0$ and every $m\in\mathbb N$,

$$
\sum_{k=0}^{m-1}\frac1{(b+k)^2}\le\frac1{b^2}+\frac1b.
$$

This retains the full positivity hypothesis and the whole reciprocal-square sequence. The proof keeps the first term and bounds subsequent terms using

$$
\frac1{(x+1)^2}\le\frac1x-\frac1{x+1}\qquad(x>0).
$$

The resulting finite sum telescopes; dropping its nonnegative reciprocal endpoint gives the stated bound. For $m=0$ the left side is an empty sum. With $b=7/2$ and $m=r$,

$$
\begin{aligned}
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}
&\le\frac14+\frac19+\frac1{25}
 +\frac14\sum_{k=0}^{r-1}\frac1{(7/2+k)^2}\\
&\le\frac14+\frac19+\frac1{25}
 +\frac14\left(\frac4{49}+\frac27\right)\\
&=\frac{21739}{44100}<\frac12.
\end{aligned}
$$

Good and bad pairs partition the $r^2$ phase pairs, giving the sufficient bound $2H_r\ge r^2$. Only this half-density estimate is needed. The exact density $\prod_{p\mid r}(1-p^{-2})$ in an ideal model of independent uniform phases is a distinct literature quantity. The union estimate above neither proves that exact product formula nor identifies it with the actual finite-clock candidate-event probability. Combining these standard counting and tail arguments makes no claim of mathematical novelty.

**First fix a phase pair and bound the whole event within that component.** Retain $k(s,y)=p_Q(s.\operatorname{val}/r,y)$ and $A=4/\pi^2$. For a fixed $(s,t)$, define

$$
\begin{aligned}
K_{s,t}(y,z)&=k(s,y)k(t,z)\ge0,\\
M_{s,t}&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}K_{s,t}(y,z).
\end{aligned}
$$

If $(s,t)$ is jointly primitive, conditional recovery gives $E_2(y_s,y_t)$. The [specialization to actual modular phases](lean:D5/S3/Quantum/ShorCountingMarginal.shor_phase_accuracy_bound) of [@thm-qpe-arbitrary-phase-lower-bound] gives $k(s,y_s)\ge A$ and $k(t,y_t)\ge A$. Every other summand is nonnegative, so

$$
\begin{aligned}
M_{s,t}&\ge K_{s,t}(y_s,y_t)\ge A^2
&&\text{if }\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1,\\
M_{s,t}&\ge0&&\text{for all other phase pairs}.
\end{aligned}
$$

This bounds the mass of the **entire membership event in one fixed component**. It does not repeatedly add actual observed-point probabilities indexed by different latent phases.

**Then expand the actual product law and combine with weight $1/r^2$.** By [@thm-shor-qpe-probability-mixture], each actual marginal is $p(y)=r^{-1}\sum_s k(s,y)$. Under the explicitly assumed independent-reset law,

$$
\begin{aligned}
p(y)p(z)&=\frac1{r^2}
\sum_{s,t\in\mathrm{Fin}\,r}K_{s,t}(y,z),\\
\Pr_-^{(2)}(E_2)
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}
\sum_{y,z\in\mathrm{Fin}\,Q}\mathbf1_{E_2(y,z)}K_{s,t}(y,z)\\
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}M_{s,t}\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

The second line simply interchanges finite sums. Latent phase pairs index the spectral expansion of the actual product distribution; they are neither decoder inputs nor additional measured random variables. Even if several phase pairs choose the same observed pair, that observed pair has a single indicator, and the expansion decomposes its own actual mass. Neither duplicate candidates nor colliding nearest labels overcount the event.

**Positive Fourier transforms and the native positive circuit: reflect both labels on the same controlled state.** Keep the identical actual state before the Fourier transform,

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}.
$$

For each work coordinate $u$, put $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$, where $\operatorname{QFT}$ is the chapter's positive-exponent $\mathcal F_+$. Write $\nu$ for the same label reflection previously denoted by $\rho$:

$$
\begin{aligned}
e&=(\operatorname{ZMod.finEquiv}\,Q).\operatorname{toEquiv},&
\nu(y)&=e^{-1}(-e(y)),\\
\nu(0)&=0,&\nu(\nu(y))&=y,\\
\nu(y).\operatorname{val}
&=\begin{cases}0,&y=0,\\Q-y.\operatorname{val},&y\ne0.\end{cases}
\end{aligned}
$$

The zero branch is essential: zero reflects to zero, not to the integer $Q$ outside $\mathrm{Fin}\,Q$. On each column of this same $V$, the positive kernel equals the negative kernel at the reflected label. In the nonzero branch their phases differ by the integral frequency $k.\operatorname{val}$; at zero they agree directly. Applying the existing `phase_conj` and `phase_shift_int` identities gives exact equality of the full work vectors:

$$
A_+(y)=A_-(\nu(y)).
$$

This compares all work amplitudes, not just one orbit coordinate. Defining $p_+(y)=\operatorname{normSquared}(A_+(y))$ and summing squared moduli over the full work carrier gives

$$
p_+(y)=p(\nu(y))\ge0,\qquad
\sum_y p_+(y)=\sum_y p(\nu(y))=1.
$$

The final equality reindexes by the involution $\nu$. For any predicate $F$ on observed pairs, reindexing by the product permutation on both coordinates yields

$$
\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(\nu(y),\nu(z))}p_+(y)p_+(z)
=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p(y)p(z).
$$

Thus, when the two positive-Fourier experiments explicitly assume independent resets with joint mass $p_+(y)p_+(z)$, the correct success event and bound are

$$
\begin{aligned}
E_{2,+}(y,z)&\ \Longleftrightarrow\ r\in L(\nu(y),\nu(z)),\\
\Pr_+^{(2)}(E_{2,+})&=\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

This positive product law is also nonnegative and normalized. Both observed labels must be reflected before candidate computation. No such bound is asserted here for the raw, unreflected positive event $r\in L(y,z)$. The argument reflects actual observations and assumes no equivariance of a nearest-label selection rule.

[@thm-qft-circuit-action] connects the same conclusion to the actual native positive circuit. For every `OracleModel` and its `Interpretation`, let $M_n$ be the `onBinaryLabels` matrix of `Source.circuit oracles n` under that interpretation. The cited statement identifies its action with $\operatorname{QFT}\,Q$ on every vector. Applying it to each column $k\mapsto V(k)(u)$ of the same actual controlled state gives

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

Summing squared moduli over all $u$ gives exactly the same $p_+$. Its normalization, the event identity reflecting both coordinates, and the $8/\pi^4$ bound under two independent resets therefore apply. The controlled modular multiplication, work input, and joint state before the Fourier transform have not been replaced.

**Edge cases and scope.** Recovery needs only the stated resolution $N^2\le2^n$, without $r\mid Q$. When $r=1$, the only phase pair is $(0,0)$; it is jointly primitive, $H_1=1$, and the prime-factor set is empty. Both actual outcomes are zero, $D(0)=[1]$, $L(0,0)=[1]$, and the actual success probability is $1$. For every $r>0$, the definitions retain zero numerators, one or two zero observed labels, and repeated prime factors. In particular, phase $s=0$ has distinguished reduced denominator $1$. Both midpoint ties are allowed, with no uniqueness requirement for nearest labels. Reflection and native circuit equality themselves include $n=0,Q=1$; recovery with $N\ge2,N^2\le Q$ already excludes $n=0,1$. The finite-tail estimate also applies when its summation range is empty.

The combined application establishes precisely that the full all-pairs list computed from two observations contains their common true order with probability at least $8/\pi^4$, under independent resets of the same actual modular-multiplication experiment. It gives no certified exact-order selector from the full candidate least-common-multiple list. It also does not certify that taking the least common multiple of every entry in that list equals the true order: other candidates can introduce extra factors. Guarantees for arbitrary correlated repetitions, efficient uniform-unit sampling, recursive prime factorization, bit or gate complexity, and hardware performance remain outside this application. The uniform-unit Good bound and simultaneous gcd extraction below concern another sampling law. Without an explicit common joint law, their probabilities cannot simply be multiplied by this quantum event probability.

The candidate-membership and list-length results come from `ShorContinuedFractions`, `FiniteRationalConvergents`, and `FiniteRationalConvergentsLength` at the pinned source. The rational-list and length proofs are supplied by aicyberg; the modules retain the provenance and Apache 2.0 license of *Finite-register phase estimation and spectral Shor order finding* ([solanaqubits/leanbook, fixed revision](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)). Source audit [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) still has three validated items and one unfinished item: the broader clock statement and independent ideal-sampling product law are not settled by this specialization to the modular bound. The separate earlier marginal-source audit [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) still has three validated and fifty-nine unfinished items. These statuses describe coverage, not a refutation of the mathematical proofs above. The single-run list-membership bound above combines conditional membership, the actual mixture, and finite coprime counting. The two-run all-pairs list event instead uses a sufficient half-density bound for jointly primitive phase pairs under an explicit independent-reset premise. Below, a separate finite cyclic-family count yields the Good proportion for uniformly sampled units and both factor certificates on the same event. Independence remains a sampling premise; arbitrary correlated repetitions, certification of each individual return, classical bit complexity, full quantum gate complexity, and hardware performance retain the boundaries in [@rem-grover-qft-shor-literature].

**Application: choose the least passing exponent from the observed list.** The preceding application combines two denominator lists into a finite menu and bounds the probability that the true order belongs to it. We now add a definite selection rule: test each exponent by modular exponentiation, then take the least value that passes. Following the selector application in the `ShorContinuedFractions` source exposition, we derive the result here from existing list and multiplicative-order properties.

For arbitrary natural numbers $a,N$ and any finite list $L$ of natural numbers, write

```text
select a N L =
  List.argmin id
    (L.filter (fun d => decide (0 < d ∧ Nat.powMod a d N = 1)))
```

This composes existing functions. The filter keeps positive exponents that pass the modular-power test; `List.argmin id` returns their least natural value as `some m`, or `none` if the filtered list is empty. Its only inputs are $a,N,L$. There is no unknown true-order input $r$, latent phase, or flag saying whether this attempt is exact. The domain retains list order, duplicates, and empty lists. We do not first replace the list by a set or assume that every entry divides the order.

**Connect the executable test to the actual multiplicative order.** To interpret the output in terms of order, fix any actual parameter record $c:\operatorname{QuantumShorOrderFindingCore.Parameters}$ and put

$$
\begin{aligned}
a&=c.\operatorname{base},&N&=c.\operatorname{modulus}\ge2,\\
r&=c.\operatorname{period}
=\operatorname{orderOf}(a:\operatorname{ZMod}N)>0.
\end{aligned}
$$

The record also supplies $\gcd(a,N)=1$ and a work width large enough for the modulus. Thus $r$ is the actual order for this same base and modulus. The following list argument is independent of counting width, resolution, and how $L$ was obtained. By `Nat.powMod_def`, the test computes the natural residue $a^d\bmod N$. Since $1<N$, the literal residue $1$ is its canonical representative. `ZMod.natCast_eq_natCast_iff'` and `Nat.cast_pow` therefore give

$$
\operatorname{Nat.powMod}(a,d,N)=1
\quad\Longleftrightarrow\quad
(a:\operatorname{ZMod}N)^d=1.
$$

Call the filtered list $S$. If $\operatorname{select}(a,N,L)=\operatorname{some}(m)$, then `List.argmin_mem` puts $m$ in $S$, yielding

$$
m\in L,\qquad m>0,\qquad
\operatorname{Nat.powMod}(a,m,N)=1,\qquad r\mid m.
$$

The last clause follows from `orderOf_dvd_of_pow_eq_one`. Every $d\in L$ that is positive and passes the modular-power test belongs to $S$, so `List.le_of_mem_argmin` gives

$$
\forall d\in L,\quad
\bigl(d>0\ \land\ \operatorname{Nat.powMod}(a,d,N)=1\bigr)
\ \Longrightarrow\ m\le d.
$$

This is **minimality among passing entries of the supplied list**. Every positive passing exponent is a positive multiple of $r$, hence $r\le m$; `orderOf_le_of_pow_eq_one` also gives that inequality directly. Nonpassing entries do not enter the comparison, and missing exponents are not searched. A return therefore certifies positivity, a passing test, list membership, minimality within the list, and $r\mid m$. It carries no flag certifying $m=r$ and performs no search for smaller positive exponents outside the list that give residue one.

**The selector returns the true order if and only if the menu contains it.** For every actual $c$ above and every finite $L$, the exact correspondence is

$$
\operatorname{select}(a,N,L)=\operatorname{some}(r)
\quad\Longleftrightarrow\quad r\in L.
$$

For the forward direction, the returned $r$ belongs to the filtered list $S$ and therefore to the original list $L$.

For the reverse direction, suppose $r\in L$. Since $r>0$ and $(a:\operatorname{ZMod}N)^r=1$, it passes the modular-power test and belongs to $S$. By `List.argmin_eq_none`, a return of `none` would require $S=[]$. Here $S$ is nonempty, so the return is `some m`. This $m$ is a positive passing exponent, which gives $r\le m$ by the order property. Meanwhile, $r$ itself is a passing entry in the list, so minimality gives $m\le r$. The two inequalities force $m=r$. They connect two minima: $r$ is the least positive exponent giving residue one, while $m$ is the least such exponent present in the menu. Membership of $r$ makes them coincide.

The failure return has a complete equivalence as well:

$$
\operatorname{select}(a,N,L)=\operatorname{none}
\quad\Longleftrightarrow\quad
\forall d\in L,\ \neg\bigl(d>0\ \land\
\operatorname{Nat.powMod}(a,d,N)=1\bigr).
$$

Indeed, `argmin` returns `none` exactly when $S$ is empty, and the filter is empty exactly when the original list has no positive passing entry. Thus `none` reports failure of this menu; the actual parameter record still has a true order. An empty list returns `none`, zero exponents fail the positivity condition, and repeated passing entries remain repeated entries. On ties, `argmin` retains the first occurrence. Its score here is `id` on natural numbers, so tied scores are the same exponent and do not affect the contract. The case $r=1$ is included.

**Rewrite membership probability as exact-output probability, one summand at a time.** Return to the same actual $c$ and counting width $n$ as in the preceding application, retaining $Q=2^n$ and $N^2\le Q$. Both runs still use the same $c.\operatorname{modularOperator}$, the same $c.\operatorname{input}=|1\rangle$, and the same full work carrier, including padded coordinates. To make the selector's input explicit, recall the list definitions:

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

The latter is `(D y).flatMap (fun d => (D z).map (Nat.lcm d))`, retaining all pairs and duplicates. Define the exact-output event by

$$
X_2(y,z)\ \Longleftrightarrow\
\operatorname{select}(a,N,L(y,z))=\operatorname{some}(r).
$$

The generic list contract gives $X_2(y,z)\Longleftrightarrow E_2(y,z)$ pointwise, where $E_2(y,z)$ still means $r\in L(y,z)$. Selection builds the menu from observed integers and runs the tests; the unknown $r$ appears only in the mathematical success predicate.

Write $p_-(y)=p(y)=\operatorname{normSquared}(A_-(y))$. Continue to assume explicitly that the two complete preparations and measurements have independent resets, with joint mass $p_-(y)p_-(z)$. This product is nonnegative and sums to $1$. For any event $F$, define its probability by

$$
\Pr_-^{(2)}(F)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p_-(y)p_-(z)
$$

The indicators of $X_2$ and $E_2$ agree at every observed pair, so every summand remains unchanged. Consequently,

$$
\begin{aligned}
\Pr_-^{(2)}(X_2)&=\Pr_-^{(2)}(E_2)\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

The bound still comes from the actual phase mixture, the mass of the whole event within each jointly primitive component, and $2H_r\ge r^2$. No additional experiment independently sampling latent phases is assumed, and no injective choice of nearest-label witnesses is needed. An observed pair has a single exact-output indicator, however many occurrences of $r$ or successful denominator pairs its menu contains. Resolution, target padding, and actual input are the same, and $r\mid Q$ is still unnecessary. One or two zero observed labels are included.

**Native positive Fourier circuit: reflect both observations before selection.** Use the same

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}
$$

as above, together with $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$ and $p_+(y)=\operatorname{normSquared}(A_+(y))$. Reflection remains the negation involution $\nu$ transported through $\operatorname{ZMod.finEquiv}\,Q$, including $\nu(0)=0$ and $\nu(\nu(y))=y$. The full work-vector identity on this same controlled state gives

$$
A_+(y)=A_-(\nu(y)),\qquad p_+(y)=p_-(\nu(y)).
$$

The appropriate event is therefore

$$
X_{2,+}(y,z)\ \Longleftrightarrow\
\operatorname{select}\bigl(a,N,L(\nu(y),\nu(z))\bigr)=\operatorname{some}(r).
$$

Reflect both labels first; a zero label still maps to zero. The two positive-Fourier experiments explicitly use the independent-reset law $p_+(y)p_+(z)$. Reindexing the finite sum by the involution $(y,z)\mapsto(\nu(y),\nu(z))$ gives

$$
\begin{aligned}
\Pr_+^{(2)}(X_{2,+})
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(\nu(y),\nu(z))}p_+(y)p_+(z)\\
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(y,z)}p_-(y)p_-(z)\\
&=\Pr_-^{(2)}(X_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

For every `OracleModel` and its `Interpretation`, [@thm-qft-circuit-action] identifies the action of the native positive circuit's `onBinaryLabels` matrix $M_n$ with $\operatorname{QFT}\,Q$ on the same column $k\mapsto V(k)(u)$. Thus, coordinate by coordinate,

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

Summing squared moduli over the full carrier gives the same $p_+$, so the reflected selection event applies to this same native circuit. The probability equality relies on involutive reindexing of both coordinates. It supplies no such bound for the unreflected positive-label menu $L(y,z)$. An unreset target, dependent repetitions, or an unspecified correlated state also cannot use this product law.

**Minimization cannot supply an order missing from the menu.** Consider a finite deterministic calculation with

$$
N=21,\qquad a=2,\qquad Q=512,\qquad y=z=43.
$$

Here $21^2=441\le512$. The Euclidean expansion of $43/512$ successively uses

$$
\begin{aligned}
512&=11\cdot43+39,\\
43&=1\cdot39+4,\\
39&=9\cdot4+3,\\
4&=1\cdot3+1.
\end{aligned}
$$

ending with $3=3\cdot1$. Its full list is $[0,1/11,1/12,10/119,11/131,43/512]$. Filtering for denominators strictly below $21$ gives

$$
\begin{aligned}
\operatorname{candidates}(43,512,21)&=[0,1/11,1/12],\\
D(43)&=[1,11,12],\\
L(43,43)&=[1,11,12,11,11,132,12,132,12].
\end{aligned}
$$

The last line concatenates the rows $[1,11,12]$, $[11,11,132]$, and $[12,132,12]$, with no deduplication. The first six positive powers of $2$ modulo $21$ have residues

$$
2,\ 4,\ 8,\ 16,\ 11,\ 1,
$$

so the true order is $r=6$. For the distinct menu values $1,11,12,132$, the modular-power residues are respectively $2,11,1,1$. The least positive passing value is $12$, hence

$$
\operatorname{select}(2,21,L(43,43))=\operatorname{some}(12),\qquad
\operatorname{Nat.powMod}(2,12,21)=1.
$$

The true order $6$ is absent from this menu, and the return is twice that order. This example establishes candidate computation and selection for the given integers. No positive probability for the observed pair $(43,43)$ in the actual quantum experiment is asserted here.

Using the returned $12$ as though it were the true order would give the half exponent $12/2=6$, whereas the actual half order is $6/2=3$. Their residues differ:

$$
2^{12/2}\bmod21=1,\qquad
2^{6/2}\bmod21=8.
$$

The former yields gcds $\gcd(63,21)=21$ and $\gcd(65,21)=1$; the latter yields $\gcd(7,21)=7$ and $\gcd(9,21)=3$. Passing the modular-power test cannot replace the true-order premise in the classical factor extraction below. Nor does the all-pairs construction guarantee that a missing order appears. List-relative minimization is exact when the true order is present; it does not make every menu complete.

**Probability guarantee and certificates for individual returns.** Under the stated actual input, resolution, and independent-reset law, the probability that the returned value equals the true order is at least $8/\pi^4$. This is a bounded-error guarantee for exact output. A return `some m` carries no flag identifying whether this attempt was exact: it may be a larger positive multiple. A return `none` means only that no positive menu entry passed. This is not a Las Vegas procedure that certifies every returned order and recognizes every unsuccessful attempt. Repeating these returns alone supplies no exactness certificate; this application makes no probability-amplification claim.

Exactness can be tested with additional resources. The existing `orderOf_eq_of_pow_and_pow_div_prime` says that a positive passing exponent $m$ is the order if every prime divisor $p\mid m$ satisfies

$$
(a:\operatorname{ZMod}N)^{m/p}\ne1
\quad\Longleftrightarrow\quad
\operatorname{Nat.powMod}(a,m/p,N)\ne1
$$

The mechanism is direct. Since $r\mid m$, write $m=rk$. If $k>1$, choose a prime divisor $p\mid k$. Then $r\mid m/p$, so this prime-division test must give residue $1$, a contradiction. Thus $k=1$. To use these tests as a finite certificate, a **complete verified prime factorization of $m$** is needed to cover all its distinct prime divisors; testing a few primes is insufficient. For $m=1$, the prime tests are empty, and positive passing already forces order $1$. Obtaining a complete factorization and verifying supplied factors are separate tasks. The selector does not supply the factors, and no efficient method for obtaining them is asserted here.

The minimum-of-order-multiples idea appears explicitly in Ekerå, *On the success probability of quantum order finding*, [arXiv:2201.07791v2, §4.1.7](https://arxiv.org/html/2201.07791v2#S4.SS1.SSS7): when processed values are all positive multiples of the order and at least one is the order, their minimum is the order. The citation concerns this minimum argument. The paper's offset search and smoothness-based processing differ from the all-pairs menu here; their algorithms and performance estimates do not transfer with that argument.

Finite lists and executable modular exponentiation specify a computation. The logarithmic length bound above counts convergents or Euclidean stages; it does not automatically cover every recursive list operation or the bit cost of rational arithmetic. This application supplies no end-to-end bit cost, quantum gate bound, efficient acquisition of complete factors, recursive factoring algorithm, or hardware-performance conclusion. Its exact-output event concerns counting observations for a fixed actual base, whereas the classical Good event below uses a separate unit-group sampling law. Combining their probabilities still requires an explicit common joint sampling construction.

::: {.viz src="phase-gears" preset="leak" height="500"}
**When the period does not divide, the peaks spread.** $Q = 64$ and period $6$: the magenta marks $sQ/r$ fall between integers at $10.67$, $21.33$ and so on, and each peak spreads over neighbouring cells — $k = 11$ has $0.115$, $k = 10$ only $0.026$, and the six cells nearest $sQ/r$ carry $0.80$ together; the continued fraction of the amber-framed $k = 11$ reads $\frac{1}{6}$. This card specifies no actual modulus and base with which to check $N^2\le Q$, so its concentration and reading remain a numerical teaching example. The conditional membership theorems above do not certify this card's last-convergent rule or identify its conditioned-comb peak heights with the actual marginal probabilities.
:::

**Application: halve repeatedly while preserving the same base's half-order power.** The exponent $12$ above passed the modular-power test but turned the half-order power into $1$. We can ask a smaller question: after halving the current exponent, does the same base still return to $1$? If it does, halve and ask again; otherwise stop. This step needs neither prior knowledge of the true order nor a complete prime factorization of the exponent. It removes excess factors of $2$ from a returning exponent. The odd multiple left behind can still exceed the true order.

State the rule in its full generality. Let $G:\operatorname{Type}\,u$ be a monoid with decidable equality, expressed by `Monoid G` and `DecidableEq G`. For $x\in G$ and a natural number $m$, define

```text
stripTwos x m =
  if 0 < m ∧ m % 2 = 0 ∧ x ^ (m / 2) = 1
  then stripTwos x (m / 2)
  else m
```

Division here is natural-number quotient. All three conditions must hold for a recursive call; otherwise the current exponent is returned. The inputs are only $x,m$, with no unknown $r=\operatorname{orderOf}(x)$ supplied. A monoid needs associativity and an identity; it need not be a group, finite, commutative, or cancellative. Actual evaluation also requires computable multiplication, identity, and equality. Every recursive call has $0<m/2<m$: a positive even number is at least $2$, and division by $2$ strictly decreases a positive natural number. Thus the natural measure $m$ proves termination. At $m=0$ the first condition fails and the output is $0$. Termination alone gives no bit or gate complexity bound.

::: {.theorem #thm-shor-verified-multiple-halving title="Executable halving of a positive returning exponent" lean="D5/S3/FiniteGroups/Cyclic/VerifiedMultipleHalving.stripTwos_correct"}
Let $G:\operatorname{Type}\,u$ be any monoid with decidable equality. For $x\in G$ and $m\in\mathbb N$, assume $m>0$ and $x^m=1$. Put $M=\operatorname{stripTwos}(x,m)$ and $r=\operatorname{orderOf}(x)$. Then all of the following hold:

1. $M>0$;
2. $M\mid m$;
3. $x^M=1$;
4. there is a natural number $k$ such that $m=2^kM$;
5. $M/r$ is odd;
6. if $r$ is even, then $M$ is even and $x^{M/2}=x^{r/2}$;
7. if $r$ is odd, then $M$ is odd.
:::

Here $r$ is automatically positive: the positive returning exponent and `orderOf_dvd_iff_pow_eq_one` give $r\mid m$, and zero cannot divide a positive number. The third clause similarly gives $r\mid M$, so the natural quotient in the fifth clause satisfies $M=r(M/r)$. This is not a claim about the floor of a nonintegral ratio. Zero has a defined output but lies outside the correctness statement: every element satisfies $x^0=1$, including elements with no positive returning exponent, for which `orderOf` is defined to be $0$. A zeroth power therefore cannot establish positive order.

::: proof
Use strong induction on the current positive exponent $n$, retaining four properties together: the output is positive, $n$ is a power of $2$ times the output, the output still returns $x$ to $1$, and its quotient by $r$ is odd. A continuation passes the problem to the smaller $n/2$, rather than assuming the same claim again at the original fixed $m$. If recursion gives $n/2=2^kM$, the evenness test yields

$$
n=2(n/2)=2\cdot2^kM=2^{k+1}M.
$$

Each successful halving increments the witness $k$; a terminal branch uses $k=0$. This constructs the natural witness in the fourth clause and supplies the divisibility in the second. Positivity and return to the identity are retained through the recursive premises.

At a terminal branch the output is the current positive $n$ and $x^n=1$. We have $r\mid n$. If the quotient were even, write $n/r=2j$; then

$$
n=2rj,\qquad n/2=rj,\qquad
x^{n/2}=(x^r)^j=1.
$$

All three continuation conditions would hold, contradicting termination at that branch. The quotient must be odd. This uses the usual order-divisibility and parity argument; the corresponding terminal property also appears as `div_orderOf_odd_of_pow_ne_one` in `SymbolicQuantum/Shor/ReductionLemmas.lean`, with no claim that it is a new mathematical fact.

Finally write $M/r=2t+1$. If $r$ is even, $M=r(2t+1)$ is even, and natural division gives

$$
\begin{aligned}
M/2&=rt+r/2,\\
x^{M/2}&=x^{rt}x^{r/2}
=(x^r)^t x^{r/2}=x^{r/2}.
\end{aligned}
$$

If $r$ is odd, $M=r(2t+1)$ is a product of odd numbers and is odd. Every power belongs to the same element; no interchange of different elements or cancellation law is needed. The full proof is checked by the Lean kernel.
:::

**Keep the base fixed when connecting the selector.** Fix the same actual parameter record $c$ as before, with $a=c.\operatorname{base}$, $N=c.\operatorname{modulus}\ge2$, and $x=(a:\operatorname{ZMod}N)$. A return `select a N L = some m` supplies $m>0$ and `Nat.powMod a m N = 1`. The earlier `Nat.powMod_def`, `Nat.cast_pow`, and residue conversion turn precisely this test into $x^m=1$, so the seven clauses apply to this $x,m$. The same guard can be evaluated using natural-number modular powers; for $a,m\in\mathbb N$ and $N\ge2$, Python's `pow(a,e,N)` computes $a^e\bmod N$:

```python
def strip_twos_mod(a, m, N):
    while 0 < m and m % 2 == 0 and pow(a, m // 2, N) == 1:
        m = m // 2
    return m
```

This simply expresses the same guard through modular exponentiation. A return `none` still means that the menu has no positive passing entry; it supplies no positive exponent to halve. The process always tests powers of the original base. It does not resample the base or change the controlled modular multiplication, native positive-exponent circuit, work input $|1\rangle$, or padded target carrier. For the positive-exponent experiment, both observed labels are still reflected before the original menu is formed.

If the selector returns the true order $m=r$, halving leaves it fixed. For odd $r$ the evenness test fails. For even $r$, we have $0<r/2<r$, so minimality of the true order excludes $x^{r/2}=1$ and the guard again fails. Thus `stripTwos x r = r`. The earlier exact-selection event is consequently contained in the exact-output event after halving, whose probability remains at least $8/\pi^4$. This uses the same independent-reset law as before and introduces no new joint sampling model. Halving may also recover the true order from a previously inexact return, but does not flag exactness on each output.

Return to $N=21,a=2,r=6$. Starting at $12$, the test $2^6\bmod21=1$ first reduces the exponent to $6$; then $2^3\bmod21=8\ne1$, and the process stops. Starting at $132$, it first reduces to $66$, since $2^{66}\bmod21=1$; then $2^{33}\bmod21=8\ne1$, so it stops. Hence

$$
\begin{aligned}
\operatorname{stripTwos}(2:\operatorname{ZMod}21,12)&=6,\\
\operatorname{stripTwos}(2:\operatorname{ZMod}21,132)&=66,\\
66/6&=11,\qquad 2^{33}\bmod21=2^3\bmod21=8.
\end{aligned}
$$

Both paths yield the half-power residue $8$, whose representative gives $\gcd(8-1,21)=7$ and $\gcd(8+1,21)=3$. Before halving, the half-power residue of $12$ was $1$, giving $21$ and $1$. The reduction $132\mapsto66$ retains the odd quotient $11$, making clear that a correct half-power does not imply exact order. It also tests no complete set of prime factors and cannot replace the full prime-factor certificate above.

**Preserving the half-power also preserves the need for Good.** The new interface is only $x^{M/2}=x^{r/2}$, under the even-order condition. Factor extraction still requires the same actual unit to satisfy

$$
\operatorname{Good}(x)\quad\Longleftrightarrow\quad
\operatorname{Even}(r)\ \land\ x^{r/2}\ne-1.
$$

Here powers are written after projecting the unit to $\operatorname{ZMod}N$; its order agrees with the order in the unit group. Minimality of the true order separately excludes half-order power $1$. Under the conditions $N>2$ and $\gcd(a,N)=1$ in [@ex-shor-actual-unit-factors], the existing true-order Good argument supplies two proper factors; equality of half-powers connects its certificate to the same residue of the halved output.

The halving theorem states equality of powers in a monoid. Connecting it to gcds of large natural-number powers additionally requires explicit congruence, positivity conditions for natural subtraction, and gcd invariance; a natural-number power must not be equated with its standard residue. The values $7$ and $3$ above are direct calculations on concrete residues. The halving module itself states no general natural-number gcd transport or factor probability.

Two boundaries make the scope concrete. For $N=2,a=1,m=8$, the trace is $8\mapsto4\mapsto2\mapsto1$; the true order is $1$, and the odd output supplies no even half-order extraction route. For $N=15,a=14,m=2$, we have $14^1\equiv-1\ne1\pmod{15}$, so the output remains $2$. Its order is even but the second Good condition fails; the gcds are $\gcd(13,15)=1$ and $\gcd(15,15)=15$.

This same-base halving rule also differs from Ekerå, *On completely factoring any integer efficiently in a single run of an order finding algorithm*, [arXiv:2007.10044, §3.2](https://arxiv.org/html/2007.10044), which samples new random bases and processes a squaring chain. The reference distinguishes the algorithms; its performance conclusions are not transferred here. Termination and these deterministic properties provide no efficient method for obtaining the initial $m$, complete factorization, exact-order certificate, bit or gate complexity bound, hardware success rate, guarantee for arbitrarily correlated repetitions, or Las Vegas conclusion, and no mathematical originality is claimed. The quantum product law at a fixed actual base and the Good law on uniformly sampled units remain different sampling models. Their probabilities cannot be multiplied without a common joint law and the corresponding conditional probabilities.

**One step further: cover the original exponent's prime factors and strip down to the order.** Halving removes only excess factors of $2$, so $132$ can still leave $66$. If an additional finite list contains every prime divisor of the original returning exponent, we can repeatedly test division by each entry. This additional input differs from the menu computed solely from observations: the selector does not supply it.

For any monoid $G:\operatorname{Type}\,u$ with decidable equality, an element $x$, and natural numbers $p,m$, define

```text
stripFactor x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m ∧ x ^ (m / p) = 1
  then stripFactor x p (m / p)
  else m

stripFactors x P m =
  P.foldl (fun n p => stripFactor x p n) m
```

Each successful division strictly decreases the current positive exponent because $p>1$. Otherwise the current value is returned and the fold moves to the next entry. The inputs are only $x,P,m$, with no true order supplied. Entries are processed in their original order, without deduplication or a requirement that every entry be prime.

::: {.theorem #thm-shor-verified-prime-stripping title="Executable order recovery from original prime-support coverage" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct"}
Let $G:\operatorname{Type}\,u$ be any monoid with decidable equality. For $x\in G$, a finite list $P$ of natural numbers, and $m\in\mathbb N$, assume

$$
m>0,\qquad x^m=1,\qquad
\forall p\in\mathbb N,\quad
\bigl(p\text{ is prime}\ \land\ p\mid m\bigr)\Longrightarrow p\in P.
$$

Put $M=\operatorname{stripFactors}(x,P,m)$. Then

$$
M>0,\qquad M\mid m,\qquad x^M=1,\qquad M=\operatorname{orderOf}(x).
$$
:::

Coverage concerns the **original input $m$**: each prime divisor must itself occur in $P$. It is a correctness premise, not a proof supplied as an additional function argument. The list may repeat entries or include extra composites, $0$, and $1$. No group, finiteness, commutativity, or cancellation assumption is required. Entries $0$ and $1$ never trigger recursion; the exponent $m=0$ always returns $0$ but lies outside this correctness statement. The case $m=1,P=[]$ is included.

::: proof
Write $r=\operatorname{orderOf}(x)$. A positive returning exponent gives $r>0$ and $r\mid m$. First apply strong induction to the actual recursion for a single supplied factor. If $n>0$ and $x^n=1$, the output $M$ satisfies

$$
M>0,\qquad n=p^kM\text{ for some }k\in\mathbb N,\qquad
x^M=1.
$$

When $p>1$, it also satisfies $p\nmid M/r$. In a recursive branch, combine the induction hypothesis at $n/p$ with $n=p(n/p)$, increasing the witness $k$ by $1$. At a terminal branch, $M/r=pj$ would give $M=p(rj)$. Hence $p\mid M$ and $x^{M/p}=(x^r)^j=1$: all four recursion conditions would hold, contradicting termination at this state.

Next induct over the list. The output remains a positive returning divisor of the original input, and every processed entry greater than $1$ is excluded from dividing the current output's quotient by $r$. Later processing replaces a returning exponent $A$ by a returning divisor $B$. Since $B\mid A$ and $r$ divides both, $B/r\mid A/r$. A previously excluded factor therefore cannot reappear in the later quotient. This also handles repeated entries and extra composites.

Every prime divisor of the final output divides the original $m$, so coverage places it in $P$. If division of the final exponent by this prime still returned to $1$, order divisibility would force the prime to divide $M/r$, contradicting the list invariant. Direct application of the existing `orderOf_eq_of_pow_and_pow_div_prime` gives $M=r$. The proof establishes invariants of the actual recursion and fold; the terminal order criterion retains its existing source. The complete proof is checked by the Lean kernel.
:::

**Continue from the same selector's return.** Suppose the preceding `select a N L = some m` holds. Keep the same actual parameters $c$, $N\ge2$, and $x=(a:\operatorname{ZMod}N)$. The return contract gives $m>0,x^m=1$. A list $P$ covering this original $m$ therefore makes `stripFactors x P m` equal the same base's true order, even if that order was absent from the original menu. A return `none` still means no positive entry passed; it supplies no positive exponent to this theorem. With the native positive circuit, continue to reflect both observed labels before constructing the original menu and selecting, then process the same base. This step does not replace the sampling law.

For $N=21,a=2$, input $m=12,P=[2,3]$ gives $6$; input $m=132,P=[2,3,11]$ also gives $6$, removing the odd excess factor $11$ left after halving. For the identity and $m=12$, the list $[2,3]$ gives $1$, whereas $[2]$ gives $3$ and $[6]$ gives $2$. In the last case, both original prime divisors $2,3$ divide a listed entry $6$, but neither occurs as an entry. Divisibility into some list member cannot replace the theorem's coverage condition.

**How many power tests does the program actually call?** Keep the original input, guards, and output, and add a count component. First check the arithmetic conditions $1<p$, $0<m$, and $p\mid m$. If any fails, no power-equality test is called and the count is $0$. If all pass, call the interface $x^{m/p}=1$ once, counting $1$ whether it succeeds or fails. Only success recurses, at the same quotient $m/p$. The corresponding computable pair is defined by

```text
stripFactorCost x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m then
    if x ^ (m / p) = 1 then
      let r := stripFactorCost x p (m / p)
      (r.1, r.2 + 1)
    else (m, 1)
  else (m, 0)

stripFactorsCost x P m =
  P.foldl (fun r p =>
    let s := stripFactorCost x p r.1
    (s.1, r.2 + s.2)) (m, 0)
```

The fold still processes the original list $P$ in its original order: the first component carries the current exponent, and the second accumulates calls. Write $\Phi(n)=\operatorname{Nat.log}(2,n)$. For $n>0$ this equals $\lfloor\log_2 n\rfloor$; Lean's total-function convention is $\operatorname{Nat.log}(2,0)=0$.

::: {.theorem #thm-shor-prime-stripping-cost title="Exact output and a logarithmic power-test bound" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStrippingCost.stripFactorsCost_spec"}
For every type $G:\operatorname{Type}\,u$ equipped with a monoid structure and decidable equality, every element $x\in G$, every finite list $P$ of natural numbers, and every $m\in\mathbb N$, put

$$
(M,C)=\operatorname{stripFactorsCost}(x,P,m).
$$

Then both clauses hold:

$$
\begin{aligned}
M&=\operatorname{stripFactors}(x,P,m),\\
C&\le P.\operatorname{length}+\operatorname{Nat.log}(2,m).
\end{aligned}
$$
:::

This count bound requires neither $m>0$ nor $x^m=1$. It also requires no prime-factor coverage, primality of entries, absence of duplicates, finiteness, group structure, or cancellation. For $m=0$, every entry stops at the arithmetic guard and the result is $(0,0)$; an empty list returns $(m,0)$. Entries $0$ and $1$ call no power test, while arbitrary other natural entries follow the original guards. The preceding exact-order theorem still requires its original positivity, returning, and coverage conditions.

::: proof
Strong induction on the current exponent proves equality of the first components: both programs stop under exactly the same conditions or recurse at the same $m/p$. Carry this equality through the list fold.

For one list entry, let $n$ be its input, $n'$ its output, and $c$ its count. Prove the potential inequality

$$
c+\Phi(n')\le 1+\Phi(n).
$$

If the arithmetic guard fails, $c=0,n'=n$; if the power test fails, $c=1,n'=n$. Both terminal branches satisfy the inequality. On success, $p\ge2$, $p\mid n$, and $n>0$, so $n\ge2$ and

$$
\Phi(n/p)+1\le\Phi(n/2)+1=\Phi(n).
$$

The decrease in logarithmic potential therefore pays the cost $1$ of this successful test; apply the induction hypothesis at the quotient. Sum the single-entry inequalities along the original list. Intermediate potentials cancel, giving $C+\Phi(M)\le P.\operatorname{length}+\Phi(m)$. Dropping the nonnegative final potential gives the count bound. The full proof is checked by the Lean kernel.
:::

For example, retain $N=21,a=2,m=132,P=[2,3,11]$. The tested exponents are $66,33,22,6$, with residues $1,8,16,1$, respectively. The first and last tests succeed, and the two failed tests also count, so the returned pair is $(6,4)$. Finally $11\nmid6$: only the arithmetic guard is checked, with no additional power test.

The classical repeated-division order algorithm appears in Andrew V. Sutherland, MIT 18.783, Spring 2015, Lecture 8, §8.3, Algorithm 8.2, printed page 3 ([lecture notes](https://math.mit.edu/classes/18.783/2015/LectureNotes8.pdf)). The notes start from a returning multiple in an additive group and its prime factorization. Here multiplication and the identity replace addition and zero; the statement permits arbitrary decidable monoids and extra list entries. No algorithmic originality is claimed. The count theorem above is derived in trureturing for that classical algorithm; no mathematical originality is claimed.

This conditional algorithm supplies no method for acquiring $P$ or efficiently factoring the exponent. With verified coverage, a positive returning exponent is indeed processed into the true order; obtaining the information needed for coverage remains a separate task. The logarithmic bound counts only calls to the power-equality interface. It excludes acquiring $P$, evaluating arithmetic guards, and multiplications inside modular exponentiation, and supplies no running-time, bit-complexity, quantum-gate, or complete Shor complexity bound. No new quantum success probability, uniform-unit sampler, guarantee for arbitrarily correlated repetitions, hardware implementation, or complete recursive integer-factorization result follows here. Combining the classical Good law with fixed-base quantum observations still requires an explicit common joint law.

**From the true order to factors: which bases fail?** Start with $N=15$ and $a=2$. The local orders modulo $3$ and $5$ are $2$ and $4$, so the global true order is $r=\operatorname{lcm}(2,4)=4$. The half-order power $2^2$ is locally $1$ and $-1$, respectively, and therefore is neither $1$ nor $-1$ modulo $15$. What matters is how many factors of $2$ occur in each local order: here, $1$ and $2$. We first count failing tuples in an arbitrary finite family of cyclic groups, then transport the same event to the actual unit group.

::: {.theorem #thm-half-order-family-failure-count title="Half-Order Failure Count in Finite Cyclic Families" lean="D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.failure_count_le"}
For every nonempty finite index type $I$ and every family of groups $(G_i)_{i\in I}$, assume each $G_i$ is finite and cyclic, and specify $\epsilon_i\in G_i$ with $\operatorname{ord}(\epsilon_i)=2$. Put

$$
\begin{aligned}
P&=\prod_{i\in I}G_i,\qquad k=|I|,\qquad \epsilon=(\epsilon_i)_{i\in I},\\
\operatorname{Good}_{\epsilon}(x)
&\Longleftrightarrow \operatorname{Even}(\operatorname{ord}(x))
\ \land\ x^{\operatorname{ord}(x)/2}\ne\epsilon,\\
\operatorname{Bad}&=\{x\in P:\neg\operatorname{Good}_{\epsilon}(x)\}.
\end{aligned}
$$

Here $\operatorname{ord}$ is the true group-element order (Lean's `orderOf`), and $/2$ is natural-number division. Then

$$
|\operatorname{Bad}|\,2^{k-1}\le |P|.
$$

The factor sizes may differ, and the product $P$ need not be cyclic. The count includes every tuple, including the identity and tuples of odd order, and allows $k=1$.
:::

::: proof
Write $d_i=\operatorname{ord}(x_i)>0$ and $r=\operatorname{ord}(x)>0$. For a positive integer $d$, let $v_2(d)$ be its exponent of the prime $2$, namely `d.factorization 2`. The order in the product is the least common multiple of the local orders, so $v_2(r)=\max_i v_2(d_i)$.

In one cyclic factor, take an element $z$ of order $d$ and a positive even multiple $M$ of $d$. Since $(z^{M/2})^2=1$ and the cyclic group has a unique element $\epsilon$ of order $2$, this half-power is either $1$ or $\epsilon$. Moreover,

$$
z^{M/2}=1\ \Longleftrightarrow\ d\mid M/2
\ \Longleftrightarrow\ 2d\mid M
\ \Longleftrightarrow\ v_2(d)<v_2(M).
$$

For the last equivalence, all other prime-exponent inequalities already follow from $d\mid M$. Thus $z^{M/2}=\epsilon$ exactly when $v_2(d)=v_2(M)$. Apply this with $M=r$ in each coordinate. If $r$ is even, failure means that every local valuation reaches the same maximum; if $r$ is odd, every local valuation is $0$ and failure also occurs. Hence

$$
x\in\operatorname{Bad}\ \Longleftrightarrow\ \exists t\in\mathbb N,\ \forall i\in I,\ v_2(d_i)=t.
$$

Choose a full-order generator $g_i$ in each factor. With $n_i=|G_i|$, the number $n_i$ is even and $g_i^{n_i/2}=\epsilon_i$. Multiplication $z\mapsto zg_i$ switches $z^{n_i/2}$ between $1$ and $\epsilon_i$. The preceding criterion implies $v_2(\operatorname{ord}(zg_i))\ne v_2(\operatorname{ord}(z))$: equal valuations would agree on whether they equal $v_2(n_i)$, contradicting the switch.

Fix an anchor coordinate $i_0\in I$. Encode a failing tuple $x$ and Boolean bits $b_i$ on the other $k-1$ coordinates by retaining $y_{i_0}=x_{i_0}$ and setting $y_i=x_i$ when $b_i=0$, or $y_i=x_i g_i$ when $b_i=1$. The anchor reveals the original common valuation $t$. At every other coordinate the encoded valuation equals $t$ exactly when its bit is $0$. Thus the encoding recovers every bit, and cancellation of the generators recovers $x$. This is an injection from $\operatorname{Bad}\times\{0,1\}^{I\setminus\{i_0\}}$ into $P$; comparing cardinalities proves the bound. For $k=1$ there are no bits, every tuple fails, and the bound is equality. The full proof is checked by the Lean kernel.
:::

This common-valuation count is the classical argument in Shor (1997), Section 5, PDF page 16; no new mathematical priority is claimed. The application below follows the pinned `Blueprint/D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.md`, `Blueprint/D5/S3/Quantum/ShorContinuedFractions.md`, and the attribution in `Library/QuantumChannels/shor1997gateorbits.md`. It derives consequences from the count and the order, congruence, and coprime-cancellation facts; the GID above does not certify an entire factoring procedure.

::: {.example #ex-shor-actual-unit-factors title="Actual-Unit CRT Counts and Both Factor Certificates on the Same Event"}
**Full prime powers.** Take any odd natural $N>1$. Let $I$ be its set of distinct prime factors, $k=|I|$, and put

$$
e_p=N.\operatorname{factorization}(p),\qquad
G_p=(\mathbb Z/p^{e_p}\mathbb Z)^\times,\qquad
U_N=(\mathbb Z/N\mathbb Z)^\times.
$$

The index set is nonempty, every $e_p>0$, and every $p$ is an odd prime. Each full prime-power unit group $G_p$ is cyclic. Its literal unit $-1$ squares to $1$ and differs from $1$, so has order $2$. Indeed, $p^{e_p}\ge p\ge3$, whereas $-1=1$ modulo $n$ is possible only for $n=1$ or $2$.

The Chinese remainder ring equivalence lifts to a multiplicative equivalence

$$
\mathcal E:U_N\ \simeq\ \prod_{p\in I}G_p.
$$

The pinned construction applies `Units.mapEquiv` to the multiplicative equivalence of `ZMod.equivPi N hN`, then composes with `MulEquiv.piUnits`, where $h_N$ proves $N\ne0$. It preserves true orders and every natural power, and sends literal $-1$ to coordinatewise literal $-1$. Consequently, for

$$
\operatorname{Good}(u)\ \Longleftrightarrow\
\operatorname{Even}(\operatorname{ord}(u))\ \land\
u^{\operatorname{ord}(u)/2}\ne-1,
$$

we have $\operatorname{Good}(u)\Longleftrightarrow\operatorname{Good}_{(-1)_p}(\mathcal E(u))$. Restricting $\mathcal E$ to the failure subtypes gives a bijection between actual failing units and failing tuples. `Nat.card_congr` transports their equal cardinalities together with equality of the full carrier cardinalities. In particular, if

$$
\begin{aligned}
T&=|U_N|=\prod_{p\in I}|G_p|,\\
F&=|\{u\in U_N:\neg\operatorname{Good}(u)\}|,\qquad
S=|\{u\in U_N:\operatorname{Good}(u)\}|,
\end{aligned}
$$

then [@thm-half-order-family-failure-count] yields $F\,2^{k-1}\le T$. Here $T>0$ because the carrier contains the identity, $2^{k-1}>0$, and $S+F=T$. Dividing by these positive quantities in the real or rational numbers gives

$$
\Pr_{u\sim\operatorname{Unif}(U_N)}[\operatorname{Good}(u)]
=\frac ST=1-\frac FT\ge1-\frac1{2^{k-1}}.
$$

This probability uses **uniform sampling of the full actual unit group**. The identity remains sampled and has false Good, since its order is $1$. If $N$ is not a prime power, its prime-factor set is nonempty and does not have cardinality $1$ (`isPrimePow_iff_card_primeFactors_eq_one`), so $k\ge2$. The failure proportion is then at most $1/2$ and success at least $1/2$. Prime powers with $k=1$ remain covered by the count, which gives only the lower bound $0$ for success. Every actual exponent is retained, with no squarefree restriction.

**The same Good gives both proper factors.** This deterministic step requires only natural $N>2$ and $\gcd(a,N)=1$; it also applies to even $N$. Let $u$ be the unit represented by $a$, put $r=\operatorname{ord}(u)$, and assume $\operatorname{Good}(u)$. Finiteness gives $r>0$, and evenness gives $m=r/2$ with $0<m<r$. Minimality of the true order excludes $u^m=1$, Good excludes $u^m=-1$, and

$$
(u^m)^2=u^{2m}=u^r=1.
$$

An arbitrary even period cannot replace the true order here. Coprimality and $N>2$ exclude $a=0$, so $a\ge1$ and the natural number $x=a^m\ge1$. Coercing the unit power to $\mathbb Z/N\mathbb Z$ identifies the residue of $x$ with $u^m$. The bound $1\le x$ permits `Nat.cast_sub` to identify natural subtraction $x-1$ with the ring difference. Therefore

$$
\begin{aligned}
N&\mid(x-1)(x+1),\\
N&\nmid x-1,\qquad N\nmid x+1.
\end{aligned}
$$

The first line follows because $(x-1)(x+1)=x^2-1$ has zero residue; the second follows from $u^m\ne1$ and $u^m\ne-1$, respectively. If $\gcd(x-1,N)=1$, coprime cancellation in the product forces $N\mid x+1$, a contradiction. Symmetrically, $\gcd(x+1,N)=1$ forces $N\mid x-1$, also a contradiction. Each gcd is positive and at most $N$; equality to $N$ would force divisibility of the corresponding factor. Thus, simultaneously,

$$
\begin{aligned}
1&<\gcd(a^m-1,N)<N,\qquad \gcd(a^m-1,N)\mid N,\\
1&<\gcd(a^m+1,N)<N,\qquad \gcd(a^m+1,N)\mid N.
\end{aligned}
$$

**Changing representatives preserves the gcd pair.** Keep $N>2$. For an actual unit $u$, put $m=\operatorname{ord}(u)/2$, let $b$ be the canonical natural representative of $u$, and let $t$ be the canonical natural representative of $u^m$. Both are coprime to $N$, hence $b,t\ge1$. Every natural representative $a$ satisfying $(a:\mathbb Z/N\mathbb Z)=u$ is also coprime to $N$ and satisfies $a\ge1$. Compatibility of powers with residues gives

$$
a^m\equiv t\pmod N,\qquad b^m\equiv t\pmod N.
$$

These are congruences, not natural-number equalities. Since $a^m,b^m,t$ are all at least $1$, `Nat.ModEq.sub` permits subtraction of $1$ on both sides; addition of $1$ preserves congruence directly. Applying `Nat.ModEq.gcd_eq` gives

$$
\begin{aligned}
\bigl(\gcd(a^m-1,N),\gcd(a^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr),\\
\bigl(\gcd(b^m-1,N),\gcd(b^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr).
\end{aligned}
$$

The two certificates therefore hold for the original representative's power, the canonical base's power, and the canonical half-power representative. Write $\operatorname{Both}_N(z)$ when each of $\gcd(z-1,N)$ and $\gcd(z+1,N)$ divides $N$ and lies strictly between $1$ and $N$. The certified event is explicitly

$$
\begin{aligned}
C(u)\ \Longleftrightarrow\ &\operatorname{Good}(u)\ \land\ \operatorname{Both}_N(b^m)\ \land\ \operatorname{Both}_N(t)\\
&\land\ \bigl(\forall a\in\mathbb N,\ (a:\mathbb Z/N\mathbb Z)=u
\Rightarrow\operatorname{Both}_N(a^m)\bigr).
\end{aligned}
$$

The deterministic argument proves $\operatorname{Good}(u)\Rightarrow C(u)$; projection to the first conjunct proves the converse. The identity map thus restricts to a bijection of the success subtypes, so

$$
|\{u\in U_N:C(u)\}|=S.
$$

Returning to uniform unit sampling for odd $N>1$, the same event with both certificates has probability exactly $S/T$. It inherits the bound $1-1/2^{k-1}$, and at least $1/2$ when $N$ is not a prime power. Adjoining certificates changes neither the success event nor its sampling carrier.
:::

Classical unit sampling and the preceding actual quantum measurement at a fixed base are different random choices. Their Good and candidate-list probabilities cannot simply be multiplied: a combination needs an explicit common sampling law and the appropriate conditional probabilities. The all-pairs least-common-multiple list-membership bound for exactly two actual observations has been derived above under an explicit independent-reset premise, and least-passing-entry selection gives the same bound for exact output. The argument still supplies no efficient uniform-unit sampler, certified exact-order selector from the full candidate least-common-multiple list, guarantee for arbitrary correlated repetitions, complete recursive prime-factorization implementation, or bit and gate complexity. Concentration of the conditional posterior comb retains its earlier literature boundary.

Let us now work through the four-part calculation covering Grover search at $N = 4$ and $N = 8$, the $3$-qubit QFT phase gears at $x = 5$, Shor order finding for $N = 15$, and the finite Poisson cross-check on $\mathrm{ZMod}\,16$.

::: {.example #ex-grover-four-shor-fifteen title="Grover Search for N=4 and N=8, 3-Qubit QFT Phase Gears, and Shor Order Finding for N=15: Hand Calculations and Evidence Boundaries"}
Steps 1 and 4 instantiate [@thm-grover-uniform-rotation], [@prop-finite-character-cancellation], and [@cor-finite-poisson-period]. Step 2 expands the three-qubit phases in the positive-exponent, big-endian convention with terminal bit reversal of [@thm-qft-circuit-action]. The hand-derived tensor product explains that convention without certifying every tensor identity. The passage from the true-order Good condition to both proper $\gcd(a^{r/2} \pm 1,N)$ factors in Step 3 follows from [@ex-shor-actual-unit-factors]. Complete Shor order finding and recursive factorization retain the literature and algorithmic boundaries of [@rem-grover-qft-shor-literature].

This example provides a four-part hand-calculated verification:

**Step 1: Grover search for $N = 4$ (exact 1-step hit) versus $N = 8$ (integer-step residual).**
For $N = 4$ ($l = \mathrm{Fin}\,4, s = \mathrm{Fin}\,1$) with one marked state $|0\rangle$, set $P = |0\rangle\langle 0|$, $J = |0\rangle$, and $C = H \otimes H$, so $U = CJ = |s\rangle = \frac{1}{2}(|0\rangle + |1\rangle + |2\rangle + |3\rangle)$. Here $p = \frac{1}{4}$, $\alpha = \arcsin(\sqrt{1/4}) = \frac{\pi}{6} = 30^\circ$, $W = |0\rangle$, and $B = \frac{1}{\sqrt{3}}(|1\rangle + |2\rangle + |3\rangle)$. After $n = 1$ step of $Q = (2|s\rangle\langle s| - I_4)(I_4 - 2P)$, [@thm-grover-uniform-rotation] gives

$$
Q U = \sin(3\alpha)\,W + \cos(3\alpha)\,B = \sin\Bigl(\frac{\pi}{2}\Bigr)|0\rangle + \cos\Bigl(\frac{\pi}{2}\Bigr)B = |0\rangle,
$$

an exact hit in a single step! By contrast, for $N = 8$ with one marked state ($p = 1/8$, $\theta = \arcsin(1/\sqrt{8})$), $\sin(3\theta) = 3\sin\theta - 4\sin^3\theta = \frac{5}{\sqrt{32}}$, so after $n = 1$ step the success probability is

$$
P_{\mathrm{succ}}(N=8,\, n=1) = \sin^2\Bigl(3\arcsin\frac{1}{\sqrt{8}}\Bigr) = \frac{25}{32} = 0.78125,
$$

and after $n = 2$ steps it reaches $\sin^2(5\theta) = \frac{121}{128} = 0.9453125 < 1$, illustrating the integer-step residual when $\frac{\pi}{4\theta} - \frac{1}{2} \notin \mathbb{N}$.

**Step 2: Three-qubit QFT tensor-factor ordering and phase gears at $x = 5 = (101)_2$.**
We adopt the explicit **most-significant-bit (MSB) to least-significant-bit (LSB) output tensor order**, meaning the circuit includes the final bit-reversal SWAPs. Writing the input as $x = x_2 x_1 x_0 = 4x_2 + 2x_1 + x_0$ and binary fractions as $0.b_1 \cdots b_r = \sum_{j=1}^r b_j 2^{-j}$, the unitary QFT $\mathcal{F}_+|x\rangle = \frac{1}{\sqrt{8}}\sum_{k=0}^7 e^{+2\pi i k x / 8}|k_2 k_1 k_0\rangle$ factors as

$$
\mathcal{F}_+|x_2 x_1 x_0\rangle = \frac{|0\rangle + e^{2\pi i (0.x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_1 x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_2 x_1 x_0)}|1\rangle}{\sqrt{2}}.
$$

Notice that the binary fraction grows from the least significant input bit ($0.x_0 \to 0.x_1 x_0 \to 0.x_2 x_1 x_0$), while the **first output tensor factor corresponds to the most significant output bit $k_2$** (one must never conflate pre-SWAP and post-SWAP bit orders!). At $x = 5 = (101)_2$ ($x_2 = 1, x_1 = 0, x_0 = 1$), the three equatorial phase angles are:

- First factor ($0.x_0 = 0.1_2 = 1/2$): $\phi_1 = 2\pi \cdot \frac{1}{2} = \pi$;
- Second factor ($0.x_1 x_0 = 0.01_2 = 1/4$): $\phi_2 = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$;
- Third factor ($0.x_2 x_1 x_0 = 0.101_2 = 5/8$): $\phi_3 = 2\pi \cdot \frac{5}{8} = \frac{5\pi}{4}$;

with overall normalization factor $\frac{1}{(\sqrt{2})^3} = \frac{1}{\sqrt{8}}$.

**Step 3: Order finding for $N = 15$, $a = 2$ with $Q = 16$.**
For $N = 15$ and $a = 2$, $2^x \bmod 15$ cycles through $1, 2, 4, 8$ with period $r = 4$. With register size $Q = 16$ (an exact $r \mid Q$ example), conditioning on outcome $1$ in the second register leaves the first register in $(|0\rangle + |4\rangle + |8\rangle + |12\rangle)/2$. Applying the unitary $16$-point QFT $\mathcal{F}_+$ gives amplitude $1/2$ (probability $1/4$) on $k \in \{0, 4, 8, 12\}$ and $0$ elsewhere:

- **$k = 4$ or $k = 12$**: $k/Q = 1/4$ or $3/4$ recovers $r = 4$; then $2^{r/2} = 4$, and $\gcd(4 - 1, 15) = 3$, $\gcd(4 + 1, 15) = 5$ factors $15 = 3 \times 5$;
- **$k = 0$**: yields $k/Q = 0$ and fails to recover the order;
- **$k = 8$**: yields $k/Q = 8/16 = 1/2$ with reduced denominator $2$ (a proper divisor of $r = 4$), which must be checked via $2^2 \equiv 4 \not\equiv 1 \pmod{15}$ or repeated.

**Step 4: Character-sum and Poisson cross-check on $\mathrm{ZMod}\,16$.**
In $\mathrm{ZMod}\,16$, let $H = \{0, 4, 8, 12\}$; then $H^\perp = \mathrm{annihilator}(H) = \{0, 4, 8, 12\}$. By [@prop-finite-character-cancellation], $\sum_{k \in H^\perp} \chi_k(x) = 4$ for $x \in H$ and $0$ for $x \notin H$. For the indicator $f = \mathbf{1}_H$, the unnormalized negative-exponent DFT is $\mathrm{ZMod.dft}\,\mathbf{1}_H = 4 \cdot \mathbf{1}_H$, and both sides of [@cor-finite-poisson-period] evaluate to $4 = \frac{4}{16}(4 + 4 + 4 + 4) = 4$.
:::

Look back at Step 1 of the example: for $N = 4$ a single step puts the arrow on the target.

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$: one step onto the target.** With $\theta = 30^\circ$ one step turns by $60^\circ$ and the amber arrow lands exactly on the target axis $W$: the cyan shadow has length $1$, the magenta one vanishes, and bar $1$ reaches $1$.
:::

For $N = 8$ two steps still fall short, and the success probability stops at $\frac{121}{128}$.

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$: two steps still fall short.** The success probability is $\frac{25}{32}$ after step $1$ and $\frac{121}{128}$ after step $2$: the arrow stops at $5\theta \approx 103.5^\circ$, just past the vertical axis, with a magenta shadow of $-0.234$ left.
:::

In Step 3 the periodic state, after the QFT, leaves peaks only at the four frequencies $k \in \{0, 4, 8, 12\}$.

The order is then read off a peak: $k = 4$ and $12$ give the order $4$ directly, $k = 8$ gives only its proper divisor $2$, and $k = 0$ carries no information.

::: {.viz src="phase-gears" preset="read" height="500"}
**Reading the order from a peak.** The same spectrum: $k = 4$ and $12$ give $\frac{4}{16} = \frac{1}{4}$ and $\frac{12}{16} = \frac{3}{4}$, whose denominator is the order $4$; the amber-framed $k = 8$ only gives $\frac{1}{2}$, and $2$ is a proper divisor of the order that must be checked again; $k = 0$ carries nothing.
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover Query Lower Bounds, Ideal QFT Counts, and the Full Shor Algorithm: Boundaries"}
<!-- alias: #rem-shor-factoring-literature -->
The chapter cites Lean results for uniform amplitude amplification, Weyl conjugation, character cancellation, and finite Poisson summation, together with the actual QFT circuit action and native event counts ([@thm-qft-circuit-action], [@thm-qft-native-event-count]), the single-phase circular tail ([@thm-qpe-circular-tail]), the actual-input marginal and pointwise bounds, rational-list length, and conditional candidate membership. Above, combining the actual mixture, the nearest-grid bound, and candidate recovery gives the single-run list-membership bound $\frac4{\pi^2}\frac{\varphi(r)}r$ when $N^2\le Q$. With an explicit independent-reset premise, a sufficient half-density bound for jointly primitive phase pairs then gives $8/\pi^4$ for the all-pairs least-common-multiple list event from exactly two observations. The positive-exponent convention reflects both observed labels; the native positive circuit acting on the same controlled state uses this corrected event as well. Separately, [@thm-half-order-family-failure-count] counts failures in any nonempty finite cyclic family; [@ex-shor-actual-unit-factors] transports this through actual-unit CRT to a uniform Good bound and proves both proper gcd factors on the same event. The list-selection rule also returns the true order exactly when the full menu contains it, carrying the two-observation membership bound over to exact-output probability; individual returns still carry no exactness flag. Item 1 and the remaining full algorithmic claims in item 3 below remain **literature results, not formalized in this book**; item 2 summarizes the cited circuit counts and their cost boundaries.

1. **Grover's algorithm and query lower bounds** (L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, [10.1145/237814.237866](https://doi.org/10.1145/237814.237866); G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, [arXiv:quant-ph/0005055](https://arxiv.org/abs/quant-ph/0005055)): For unstructured search among $N$ candidates with a known number $M$ of marked items and the promise $1 \le M \le N/4$, start from the uniform superposition and choose the iteration count using the known initial success probability $p = M/N$. Amplitude amplification then raises the success probability to $\ge 1 - M/N$ using $O(\sqrt{N/M})$ queries to the marking oracle. Under this sparse-solution promise, any quantum black-box algorithm finding a marked item with bounded error requires $\Omega(\sqrt{N/M})$ queries (by reduction from the single-solution black-box lower bound of Bennett, Bernstein, Brassard, and Vazirani, 1997): the quadratic speedup reaches the quantum geometric limit for this oracle task.
2. **Ideal native gate count of the same QFT circuit**: [@thm-qft-native-event-count] gives $q$ Hadamards, $q(q-1)/2$ controlled phases, and $\lfloor q/2\rfloor$ SWAPs, totaling $\frac{q(q+1)}2+\lfloor q/2\rfloor$ ideal native occurrences. The usual asymptotic count is therefore $O(q^2)=O((\log Q)^2)$ for $Q=2^q$; [@thm-qft-circuit-action] gives its exact positive-exponent action on a prepared complex vector. Loading arbitrary input data, full classical Fourier-coefficient readout, synthesis of ideal phase gates over a finite discrete gate set, and hardware performance are outside this count.
3. **Shor's factoring algorithm and the full correctness conditions for order finding** (P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, [10.1137/S0097539795293172](https://doi.org/10.1137/S0097539795293172)): For a general composite $N$ that is neither even nor a prime power, and a random coprime base $a$, the multiplicative order $r$ need not divide $Q=2^q$. The full algorithm chooses $N^2\le Q<2N^2$ and prepares the corresponding joint state using a reversible modular-exponentiation circuit with $O((\log N)^3)$ elementary gates, then samples after the QFT. The single-run candidate event and the all-pairs least-common-multiple event for two independent resets above cover their respective list-membership probabilities in the actual modular-multiplication model. They do not certify a gate implementation of modular exponentiation. The subsequent list-selection application returns the true order whenever the menu contains it and bounds that exact-output event; an arbitrary passing return may still be a larger multiple of the order. The asymptotic estimate $\varphi(r)/r=\Omega(1/\log\log r)$ remains a literature result. The counting ratio in the mixture cannot be recast as an additional random-phase experiment. The classical part is now covered by [@thm-half-order-family-failure-count] and [@ex-shor-actual-unit-factors]: for odd $N>1$, uniform sampling of the full unit group gives Good probability at least $1-2^{-(k-1)}$, and at least $1/2$ when $N$ is not a prime power, since then $k\ge2$. On that same event, every natural representative of the base gives both proper factors. All actual prime-power exponents and the sampled identity are retained. This classical probability and the quantum candidate event at a fixed base use different sampling laws; they have not been combined here into an end-to-end probability for one common experiment. Efficient unit sampling, certified exact-order selection from the full candidate least-common-multiple list, guarantees for arbitrary correlated repetitions, the exact Euler product for ideal phase sampling, a complete recursive factoring implementation, and bit and gate complexity remain outside these results. Independence of the two resets is an explicit joint sampling premise; matching marginals do not imply it. (Describing period finding as “canceling an infinite period down to $1$” is a heuristic metaphor, not a formalized mathematical claim.)
:::

::: {.viz src="phase-gears" height="560"}
The full lab of phase gears and the period: change the register size $Q$, the period $r$ and the offset, and click a bar to choose a frequency $k$ and watch its phase arrows laid head to tail; when $r$ divides $Q$ and the comb is a complete coset (offset $x_0<r$), the off-resonant chains close to zero ([@prop-finite-character-cancellation]). This page's comb does not wrap: truncating it at the boundary changes peak heights and leaves off-resonant weight. When $r$ does not divide $Q$, the spectrum is still the finite sum over the comb's actual cells: in Shor's setting (offset $x_0<r$, the comb running to the end of the register, $Q \ge N^2 > r^2$) the peaks concentrate near $sQ/r$; this aggregate concentration retains its literature status, and the page's continued-fraction reading must still be checked. [@thm-shor-nearest-candidate] guarantees only candidate membership under the actual parameter, resolution, and nearestness hypotheses; a truncated comb can lose that concentration, and a single cell gives a flat spectrum.
:::

Seeing how Grover's planar rotations and the QFT's Fourier cancellation operate, two deeper questions arise: **can we unify search, phase estimation, Hamiltonian simulation, and matrix inversion under a single Chebyshev polynomial recurrence on two-dimensional blocks (Quantum Singular Value Transformation, QSVT)? And when we compile continuous rotations into finite words over a discrete gate set $\{H, T\}$, how do finite-vertex polytopes approximate the sphere?** Let us enter the concluding chapter of Part IV — [Chapter 16](ch16-qsvt-walks-and-compilation.md).
