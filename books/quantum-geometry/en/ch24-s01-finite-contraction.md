# 24.1 Discrete Contraction Must Stabilize: The Finite Contracting Update Theorem {#sec-ch24-1}

In [Chapter 21](ch21-diagonalization-and-escape.md), a diagonal driven by a fixed-point-free `twist` escapes the given catalog, whereas some feedback updates settle at a fixed point. What additional conditions guarantee stability?

First compare two different stabilization mechanisms. On $[0,1]$, the derivative bound $|\cos'\theta|=|\sin\theta|\le\sin1<1$ makes $\cos$ contract distances between any two points, and iteration converges to a unique fixed point. A finite-set update instead requires only **that no candidates be added**: $U : \mathcal{P}(X)\to\mathcal{P}(X)$ satisfies $U(A)\subseteq A$ for every $A\subseteq X$. This pruning condition concerns order rather than metric contraction; it does not even require $U$ to preserve inclusion between arbitrary pairs of sets. Finiteness makes the pruning stop.

In the Lean module `D5/S1/FixedPoints/FiniteContractingStability`, we establish this discrete stabilization law. Note carefully every hypothesis retained in the theorem box — finiteness of the ambient type (`[Finite X]`), pointwise subset contraction (`hU : ∀ A, U A ⊆ A`), and the recursive update equation (`hS : ∀ n, S (n + 1) = U (S n)`) — together with both parts of its conclusion: eventual stabilization by step $N \le |S_0|$ *and* the sharp cardinality bound on the set of all strict changes across time.

::: {.theorem #thm-finite-contracting-updates-stabilize title="Stabilization and Strict-Change Bound for Contracting Set Updates on Finite Spaces" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
Let $X$ be a finite type (`[Finite X]`), let $U : \operatorname{Set} X \to \operatorname{Set} X$ be a set update operator, and let $S : \mathbb{N} \to \operatorname{Set} X$ be a sequence of subsets satisfying:

1. **Pointwise contraction (`hU`)**: for every subset $A \subseteq X$, $U(A) \subseteq A$;
2. **Recursive update dynamics (`hS`)**: for every $n \in \mathbb{N}$, $S(n + 1) = U(S(n))$.

Then both statements hold (writing `.ncard` for natural-number set cardinality):

1. **Eventual stabilization within $|S(0)|$ steps**: there exists a stabilization index $N \le (S(0)).\mathrm{ncard}$ such that for all $n \ge N$,

   $$
   S(n) = S(N) \qquad \bigl(\text{in particular, } U(S(N)) = S(N+1) = S(N)\bigr)\,;
   $$

2. **Sharp bound on strict changes**: the number of steps at which the set changes strictly is bounded by the initial cardinality:

   $$
   \bigl\{\, n \in \mathbb{N} \;\big|\; S(n + 1) \neq S(n) \,\bigr\}.\mathrm{ncard} \;\le\; (S(0)).\mathrm{ncard}.
   $$
:::

::: proof
Combining `hS` and `hU` shows $S(n+1) = U(S(n)) \subseteq S(n)$ for every $n \in \mathbb{N}$, so the set sequence $S$ is antitone (`Antitone S`) and its natural-number cardinality sequence $n \mapsto (S(n)).\mathrm{ncard}$ is antitone as well. Whenever two consecutive cardinalities agree, $(S(n)).\mathrm{ncard} = (S(n+1)).\mathrm{ncard}$, equality of cardinalities for a finite subset $S(n+1) \subseteq S(n)$ forces set equality $S(n+1) = S(n)$ (`Set.eq_of_subset_of_ncard_le`); applying $U$ and `hS` then gives $S(n+2) = U(S(n+1)) = U(S(n)) = S(n+1)$, locking all subsequent sets and cardinalities. Applying Mathlib's `Nat.stabilises_of_antitone` to the cardinality sequence yields $N \le (S(0)).\mathrm{ncard}$ with $S(n) = S(N)$ for all $n \ge N$ (claim 1). For claim 2, any index $n$ with $S(n+1) \neq S(n)$ must satisfy $n < N$ (since $n \ge N$ implies $S(n+1) = S(N) = S(n)$), embedding $\{n \in \mathbb{N} \mid S(n+1) \neq S(n)\}$ into $\operatorname{Set.Iio}(N) = \{0, \dots, N-1\}$, whose cardinality is $N \le (S(0)).\mathrm{ncard}$. The full proof is checked by the Lean kernel.
:::

[@thm-finite-contracting-updates-stabilize] gives a discrete foundation for finite candidate pruning: its update rule reaches $U(S_N)=S_N$ in at most $|S_0|$ steps. The stable set can depend on the initial set and can be empty. For example, $U(A)=A$ makes every set a fixed point, whereas $U(A)=\varnothing$ deletes all candidates; both satisfy the hypothesis. A unique or nonempty self-consistent core therefore requires additional assumptions.

::: {.figure src="ch24-three-stops"}
**They all stop, but not necessarily at the same place.** All three rows start from $S_0 = \{0, 1, 2\}$ and apply the update once per step to the right until two neighbours agree; the box where a row stops is outlined in cyan, and the small loop says one more step gives it again. Row one is the text's example, 'drop the largest element above $0$', stopping at $\{0\}$; row two, $U(A) = A$, stops at once at $\{0, 1, 2\}$; row three, $U(A) = \varnothing$, stops at the empty set. All three meet the hypotheses of [@thm-finite-contracting-updates-stabilize] and stop within $|S_0| = 3$ steps.
:::
