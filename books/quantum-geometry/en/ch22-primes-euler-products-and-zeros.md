# Chapter 22 Primes as the Orthogonal Basis of Arithmetic: Euler Products and Riemann Zeros

> *"I keep feeling that the essence of the quantum is pairwise comparison: always consistent, independent of order."*

In [Chapter 21](ch21-diagonalization-and-escape.md) we saw that any formal shell attempting to seal all concepts within a fixed finite coordinate system is punctured along the relative semantic diagonal, launching an unending ascent through higher-dimensional spheres. Now let us turn our gaze toward the oldest infinite-dimensional edifice in human thought — **the multiplicative arithmetic of the positive integers** — and ask a direct geometric question:

When we speak of "pairwise comparison, always consistent, independent of order," which numbers inside the multiplicative monoid $\mathbb{N}_{\ge 1}$ actually serve as mutually independent **orthogonal basis axes**?

Along the additive number line, $1, 2, 3, 4, 5, 6, \dots$ look like uniformly spaced ticks on a single one-dimensional rod. Switch from addition to multiplication, however, and $6 = 2 \times 3$ is no longer an independent direction at all — it is the diagonal resultant of axis $2$ and axis $3$, while $12 = 2^2 \times 3$ takes two steps along axis $2$ and one step along axis $3$! By the Fundamental Theorem of Arithmetic (unique prime factorization), every positive integer $n \ge 1$ factors uniquely into prime powers, **always consistent and independent of the order in which the prime factors are multiplied**:

$$
n = \prod_{p \in \mathrm{Primes}} p^{v_p(n)} \quad\Longleftrightarrow\quad \ln n = \sum_{p \in \mathrm{Primes}} v_p(n)\,\ln p.
$$

Look at the geometric structure of that correspondence: unique prime factorization embeds every positive integer $n$ into the countably infinite **formal exponent lattice** $\bigoplus_{p \in \mathrm{Primes}} \mathbb{Z}\vv{e}_p$ spanned by formal basis vectors $\{\vv{e}_p\}_{p \in \mathrm{Primes}}$ (equipped with the formal inner product $\langle \vv{e}_p, \vv{e}_q\rangle = \delta_{pq}$, so that $v_p(n) \in \mathbb{N}$ is the nonnegative integer coordinate of $n$ along the $p$-th formal prime axis $\vv{e}_p$), while taking the natural logarithm defines a linear weight functional $\ln n = \sum_p v_p(n)\,\ln p$ whose weights $\ln 2, \ln 3, \ln 5, \dots$ are linearly independent over $\mathbb{Q}$ ([@thm-prime-log-independence]) — no prime axis casts even the slightest rational divisibility shadow onto any other prime axis (throughout this chapter, our geometric language of "orthogonal prime axes" refers to this formal exponent-lattice basis paired with its $\mathbb{Q}$-linearly independent logarithmic weights).

Guided by this geometric realization of primes as orthogonal axes, this chapter establishes the Lean-verified identities linking the **Dirichlet natural-number series**, the **simple-pole residue at $s = 1$**, and the **Euler prime product** on the half-plane of absolute convergence $\operatorname{Re}(s) > 1$, examines the "polyhedral prime sieve" remainder under finite truncation, and demarcates the exact epistemic boundary separating these proved theorems from the open **Riemann Hypothesis**.

::: {.figure src="ch22-overview"}
**Figure 22.** The chapter at a glance. Panel I: each step right multiplies by $2$ and each step up by $3$, so every integer is a lattice point on the prime axes; the cyan arrows walk to $12 = 2^2 \times 3$. Panel II: among $1$ to $30$, the cells that are products of $2, 3, 5$ alone are cyan and the rest magenta; the first magenta cell is $7$ ([@ex-prime-log-orthogonality-and-sieve]). Panel III: the dashed line down the middle of the critical strip $0 < \operatorname{Re}(s) < 1$ is $\sigma = \frac{1}{2}$; the first ten zeros, in grey (a numerical result), all sit on it, and the cross at $s = 1$ is the pole. The red question marks and tag mark the open problem: whether every nontrivial zero lies on this line ([@conj-riemann-hypothesis]). The question marks come as a pair on either side of the line, because an off-line zero could only appear mirrored about $\sigma = \frac{1}{2}$ ([@thm-xi-reading-entire-reflection], [@prop-zeta-conjugation-covariance]).
:::

- [22.1 Orthogonal Prime Axes and Canceling Infinity by Factorization](ch22-s01-arithmetic-basis.md)
- [22.2 Formal Identities for the Residue, Dirichlet Series, and Euler Product](ch22-s02-dirichlet-euler-identity.md)
- [22.3 The Polyhedral Prime Sieve Remainder and Phase-Oscillator Hand Calculation](ch22-s03-finite-prime-sieves.md)
- [22.4 The Critical Symmetry Line $\sigma = 1/2$ and the Epistemic Boundary of the Riemann Hypothesis](ch22-s04-critical-line-and-rh.md)
