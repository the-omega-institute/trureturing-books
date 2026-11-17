# 22.1 Orthogonal Prime Axes and Canceling Infinity by Factorization {#sec-ch22-1}

Why do the author's foundational notes observe that *"the essence of handling an infinite problem is factorization — seeing how to cancel infinity out"*?

Consider an infinite series summed over all positive integers $n = 1, 2, 3, \dots$. Viewed additively, each term $n^{-s}$ sits entangled with infinitely many composite neighbors. Once we apply order-independent unique prime factorization, however, every composite number $n = p_1^{a_1} \cdots p_r^{a_r}$ resolves into a product of independent components along the prime axes, $n^{-s} = p_1^{-a_1 s} \cdots p_r^{-a_r s}$. At that moment, **the global infinite sum over all natural numbers factorizes into an infinite product of one-dimensional geometric series along the individual prime axes!**

Along each single prime axis $p$, summing over the coordinate ticks $a = 0, 1, 2, 3, \dots$ is nothing more than a geometric series with ratio $p^{-s}$ (satisfying $|p^{-s}| = p^{-\operatorname{Re}(s)} < 1$ whenever $\operatorname{Re}(s) > 1$):

$$
1 + p^{-s} + p^{-2s} + p^{-3s} + \cdots \;=\; \frac{1}{1 - p^{-s}} \;=\; (1 - p^{-s})^{-1}.
$$

In a single algebraic stroke, the infinite sum $1 + p^{-s} + p^{-2s} + \cdots$ along axis $p$ collapses into the closed factor $(1 - p^{-s})^{-1}$! Multiplying those factors across all mutually orthogonal prime axes $p \in \mathrm{Primes}$ traverses every finitely supported exponent vector $(v_2, v_3, v_5, \dots)$ exactly once by the distributive law, identifying the Dirichlet sum over $\mathbb{N}$ with the Euler product over primes.

::: {.viz src="euler-product-sieve" preset="two" height="500"}
**One prime axis.** Only $2$ is on the list: the cyan curve is the geometric series $1 + 2^{-s} + 4^{-s} + \cdots = (1 - 2^{-s})^{-1}$, which equals $\frac{4}{3}$ at the amber line $s = 2$, a step below the ink $\zeta(2)$. Among the integers below, only the powers of $2$ ($1, 2, 4, 8, 16, 32, 64$) are cyan; everything else is magenta, starting with $3$.
:::

To state these theorems with complete formal precision in Lean 4, we first record the conventions of module `D5/S3/Weil/Convention`.

::: {.definition #def-classical-zeta title="Formal Convention for the Riemann Zeta Function and Simple-Pole Predicate" lean="D5/S3/Weil/Convention.classicalZeta D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue"}
On the complex plane $\mathbb{C}$, let [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) $: \mathbb{C} \to \mathbb{C}$ denote Mathlib's totalized Riemann zeta function `riemannZeta`. For any complex function $f : \mathbb{C} \to \mathbb{C}$, pole location $z \in \mathbb{C}$, and residue $\mathrm{residue} \in \mathbb{C}$, the predicate [`HasUniqueSimplePoleWithResidue`](lean:D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue) $f\ z\ \mathrm{residue}$ is the conjunction of three conditions:

1. **Analyticity away from $z$**: $f$ is complex analytic on a neighborhood of the complement $\{z\}^c = \mathbb{C} \setminus \{z\}$ (`AnalyticOnNhd ℂ f ({z}ᶜ)`);
2. **First Laurent residue limit**: $(s - z)f(s) \to \mathrm{residue}$ along the punctured neighborhood filter $\mathcal{N}_{\neq}(z)$;
3. **Nonzero residue**: $\mathrm{residue} \neq 0$.
:::
