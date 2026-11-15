# 39.5.4 The $K=3$ Rauzy Fractal Internal Window: Exact Prefix Self-Coverage and Null Boundary {#sec-ch39-p2e-rauzy}

Fix the order-three Tribonacci characteristic polynomial $P_3(X) = X^3 - X^2 - X - 1$, write $\beta_3 = \operatorname{tribonacciConstant}$ for its real Perron root, and select the upper-half-plane non-Perron complex root $\alpha$ ($\operatorname{Im}\alpha > 0$). The conjugate trace and norm identities [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate) and [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) establish the exact relations

$$
\alpha + \overline{\alpha} = 1 - \beta_3,\qquad \alpha \cdot \overline{\alpha} = \beta_3^{-1}.
$$

Immediate algebraic inspection yields $\operatorname{Re}\alpha = (1 - \beta_3)/2$ and exact modulus $|\alpha| = \beta_3^{-1/2}$; double-precision evaluation (`NUM`) gives $\alpha \approx -0.419643 + 0.606291\,i$, $|\alpha| \approx 0.737353$, and rotation argument $\arg\alpha \approx 124.69^\circ$.

For every finite admissible word $\varepsilon = (\varepsilon_0, \dots, \varepsilon_{Q-1}) \in \{0, 1\}^Q$ free of three consecutive ones (`111`), we follow the **exponent-zero** internal complex evaluation of the `trureturing` formalization:

$$
c_\alpha(\varepsilon) = \sum_{j=0}^{Q-1} \varepsilon_j \alpha^j,\qquad W(\alpha) = \bigl\{c_\alpha(\varepsilon) : Q \in \mathbb{N},\; \varepsilon \text{ admissible with no } 111\bigr\},\qquad \mathcal{R}_3(\alpha) = \overline{W(\alpha)}.
$$

Here $\mathcal{R}_3(\alpha) = \operatorname{rauzyFractal}(\alpha)$ is a nonempty compact subset of $\mathbb{C}$ contained in the closed disk $\overline{B}\bigl(0, (1 - |\alpha|)^{-1}\bigr)$ (note that this exponent-zero complex window is distinct from physical negative-$\beta_3$-power name values and from the decoded natural-number `conjugateEmbedding`, and must not be conflated with them without an explicit relabeling map). Grouping admissible words by their leading run of `0`, `10`, or `110` defines three affine prefix contractions of unequal ratios $|\alpha|$, $|\alpha|^2$, and $|\alpha|^3$:

$$
f_0(w) = \alpha w,\qquad f_{10}(w) = 1 + \alpha^2 w,\qquad f_{110}(w) = 1 + \alpha + \alpha^3 w.
$$

Under the non-Perron root hypothesis, these three contractions cover the Rauzy closure with exact set equality:

::: {.theorem #thm-ch39-p2e-rauzy-regular-window title="Exact Three-Branch Prefix Self-Coverage of the Tribonacci Rauzy Closure" lean="D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover"}
Let $z \in \mathbb{C}$ be a root of the cubic characteristic polynomial $X^3 - X^2 - X - 1$ satisfying $z \neq \beta_3$, where $\beta_3 = \operatorname{tribonacciConstant}$. Writing $\mathcal{R}_3(z) = \operatorname{rauzyFractal}(z)$ for the exponent-zero internal window closure and $f_0(w) = z w$ (`zeroPrefixMap`), $f_{10}(w) = 1 + z^2 w$ (`oneZeroPrefixMap`), and $f_{110}(w) = 1 + z + z^3 w$ (`oneOneZeroPrefixMap`) for the three affine prefix maps, we have the exact set identity

$$
f_0\bigl(\mathcal{R}_3(z)\bigr) \cup f_{10}\bigl(\mathcal{R}_3(z)\bigr) \cup f_{110}\bigl(\mathcal{R}_3(z)\bigr) = \mathcal{R}_3(z).
$$
:::

::: proof
For arbitrary $z \in \mathbb{C}$, prepending `0`, `10`, or `110` to a finite `111`-free word preserves admissibility, so taking closures places the union of the three images inside $\mathcal{R}_3(z)$. Conversely, when $z \neq \beta_3$ is a root of $X^3 - X^2 - X - 1$, splitting nonempty admissible words by their initial `0`, `10`, or `110` block (and unfolding the terminal degenerate words `1` and `11` via $z^3 = z^2 + z + 1$ into infinite admissible tails) combines with compactness of $\mathcal{R}_3(z)$ to establish the reverse inclusion. Moreover, with zero imported tiling or separation premises, the interior theorem [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty) proves directly that $\operatorname{int}\mathcal{R}_3(z) \neq \varnothing$, from which the regular-closure theorem [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior) deduces $\overline{\operatorname{int}\mathcal{R}_3(z)} = \mathcal{R}_3(z)$, certifying that the entire Rauzy set equals the closure of its nonempty open interior. The full proof is checked by the Lean kernel.
:::

Combining this self-similar cover with the planar area-scaling sum $|z|^2 + |z|^4 + |z|^6 = \beta_3^{-1} + \beta_3^{-2} + \beta_3^{-3} = 1$ and the nonempty interior forces the topological frontier of $\mathcal{R}_3(z)$ to have zero two-dimensional Lebesgue area:

::: {.theorem #thm-ch39-p2e-rauzy-null-boundary title="Zero Planar Lebesgue Volume of the Tribonacci Rauzy Topological Boundary" lean="D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero"}
Let $z \in \mathbb{C}$ be a root of $X^3 - X^2 - X - 1$ satisfying $z \neq \beta_3$. Then the topological boundary $\partial\mathcal{R}_3(z) = \operatorname{frontier}\bigl(\operatorname{rauzyFractal}(z)\bigr)$ in $\mathbb{C} \simeq \mathbb{R}^2$ has strictly zero two-dimensional Lebesgue–Haar volume:

$$
\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0.
$$
:::

::: proof
By [@thm-ch39-p2e-rauzy-regular-window], the compact set $\mathcal{R}_3(z)$ equals the union of its images under $f_0, f_{10}, f_{110}$, whose planar area Jacobian factors $|z|^2, |z|^4, |z|^6$ sum to $\beta_3^{-1} + \beta_3^{-2} + \beta_3^{-3} = 1$ because $|z|^2 = \beta_3^{-1}$ and $\beta_3^3 = \beta_3^2 + \beta_3 + 1$. Since $\operatorname{int}\mathcal{R}_3(z)$ is nonempty and open inside a bounded set, it carries strictly positive finite planar measure; measure conservation across the three-branch cover leaves zero planar mass for overlaps and for the frontier $\partial\mathcal{R}_3(z) = \mathcal{R}_3(z) \setminus \operatorname{int}\mathcal{R}_3(z)$, yielding $\operatorname{vol}_2\bigl(\partial\mathcal{R}_3(z)\bigr) = 0$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-p2e-rauzy-literature title="Literature Result: Rauzy Tiling, Topological Disk Property, and Boundary Hausdorff Dimension (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Classical dynamical-systems and number-theoretic theory for the order-three Rauzy fractal originates with G. Rauzy's foundational study of three-letter substitutions and toral Markov partitions (*Bull. Soc. Math. France* **110**, 1982, 147–178) and W. P. Thurston's notes on finite-state automata and self-similar tilings (*Groups, Tilings, and Finite State Automata*, 1989); A. Messaoudi subsequently analyzed arithmetic complex-base numeration, connectedness and topological disk homeomorphism, and automaton descriptions of the fractal boundary (*J. Théorie des Nombres de Bordeaux* **10**(1), 1998, 135–162; *Acta Arithmetica* **95**(3), 2000, 195–224; note that external articles often shift the starting exponent, so any imported topological statement must be matched to the exponent-zero window used here). In that literature, the Hausdorff dimension of the Tribonacci Rauzy boundary evaluates numerically to

$$
D_F = \dim_H\bigl(\partial\mathcal{R}_3(\alpha)\bigr) \approx 1.09336 \quad (\text{Literature} + \text{NUM}).
$$

Two distinctions are essential: [@thm-ch39-p2e-rauzy-null-boundary] proves $\operatorname{vol}_2(\partial\mathcal{R}_3) = 0$, meaning **zero two-dimensional planar area**—it implies neither boundary smoothness nor finite one-dimensional arc length, nor does it compute the Hausdorff dimension $1.09336$. Conversely, finite-depth point clouds in the interactive stage (including computed internal-coordinate samples at $K = 4$) are `NUM` approximations: pixel clouds do not certify a tiling, simple connectivity, or an $\mathcal{R}_4$ topology theorem, and general higher-order Pisot substitution conjectures—which require separate coincidence hypotheses—are never asserted as unconditional theorems here.
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="rauzy" height="500"}
**Tribonacci Rauzy Internal Window Card (`rauzy`)**: Renders a finite-depth sample of the two-dimensional internal plane $\mathbb{C}$ under the unequal contractions $f_0$, $f_{10}$, and $f_{110}$. Cyan and violet distinguish the primary branch structure and the $\arg\alpha \approx 124.69^\circ$ rotational phase, magenta traces near-boundary points, and amber marks the currently inspected admissible word. Compactness, nonempty interior, regular closure, exact prefix coverage, and zero planar boundary area carry status `LEAN ✓`; finite point-cloud sampling and $D_F \approx 1.09336$ carry statuses `NUM` and `Literature`.
:::

Why is the $K = 2$ internal window merely a one-dimensional real segment whereas $K = 3$ unfolds a rotating two-dimensional fractal in the transverse complement? Placing the cubic field inside its Minkowski coordinate split and Clifford grade language makes the geometric mechanism transparent.
