# Chapter 14 Adelic Product Closure, Hurwitz Prime Spinors, and the Free Group F₃

In [Chapter 13](ch13-computable-arithmetic-horizon.md), we saw that every finite list of primes $S$ admits a product-plus-one witness $N_S = 1 + \prod_{p \in S} p$ that lands in the common remainder-$1$ blind spot of all $p \in S$ and forces a fresh prime $q \notin S$ to appear within a bounded search. Yet viewing primes solely as sparse indivisible dots scattered along a one-dimensional integer line misses their deepest geometric office.

This chapter lifts arithmetic from the scalar line to **adelic closure across all rational valuations** and **non-commuting prime spinor geometry on the rational quaternion rays $\mathbb P^3(\mathbb Q)$**. We begin with two Lean-verified theorems — the rational adelic product formula $|r|_\infty \prod_p |r|_p = 1$ and the $\mathbb{Q}$-linear independence of prime logarithms — explaining how primes serve geometrically as ultrametric curvature-recovery nuclei offsetting flat tangent amplification. We then split odd primes inside the integer quaternions into $p + 1$ primitive norm-$p$ spinors, focus on the minimal $p = 5$ six-generator set $S_5$, certify its exact squared norm $5$ and uniform scalar fidelity $\kappa = \frac{1}{5}$ together with the twelve projective Hurwitz unit representatives and the $2\times 2$ mod-$5$ rank-$1$ outer-product splitting and opposite-pair zero-product law via frozen D5 theorems using `OmegaInit` and `OmegaMath` (`strict_omega.axioms: []`), carry the induction to arbitrary word length in the same zero-axiom kernel to freeze mod-$5$ nonvanishing, exact squared norm $5^L$, $5$-primitivity, non-scalarity, and the two-axis **rational adjoint injectivity theorem** proving that $S_5$ freely generates $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ (complemented by an explicit $3\times 3$ mod-$5$ outer-product check and exact bit-height rate $\frac{1}{2}\log_2 5$), and close with the formally verified norm-$5$ six-axis open cover of the two-sphere.

## 14.1 Flat Tangent Amplification and Ultrametric Prime Curvature Recovery

On the rational projective carrier $\mathbb{T}_3(\mathbb{Q})$ developed in Volumes I and II, every intrinsic pairwise comparison is a bounded rational fidelity $\kappa \in [0, 1]$; its real completion is compact. Only when an observer flattens the sphere onto a tangent line and marches outward in flat $+1$ increments does the ordinary archimedean absolute value $|r|_\infty$ amplify coordinates without bound.

Remarkably, the multiplicative group $\mathbb{Q}^\times$ carries an exact counterbalancing architecture built right inside the rationals. For every prime $p \in \mathbb{P}$ and every nonzero rational $r = \pm p^{v_p(r)} \frac{a}{b}$ (with $p \nmid a, p \nmid b$ and integer $p$-adic valuation $v_p(r) \in \mathbb{Z}$), define its **$p$-adic ultrametric norm** by

$$
|r|_p := p^{-v_p(r)} \in \mathbb{Q}_{>0}.
$$

Unlike the flat absolute value, $|r|_p$ obeys the **ultrametric strong triangle inequality** $|x + y|_p \le \max\{|x|_p, |y|_p\}$: repeated steps inside any prime channel never accumulate linear drift, and increasing divisibility order $v_p(r)$ contracts the norm exponentially as $p^{-k}$. Whenever flat stepping injects a factor of $p$ that stretches $|r|_\infty$ by $p$, the $p$-th ultrametric channel contracts by $p^{-1}$ to restore exact unit balance.

In the mother-axiom geometric interpretation (`MODEL`), this balance illuminates the Euclid Prime-Escape mechanism of [Chapter 13](ch13-computable-arithmetic-horizon.md): **primes are primordial curvature-recovery nuclei born whenever flat stepping falls into the common orthogonal blind spot of all prior periods.** Composite numbers such as $4 = 2^2$ or $6 = 2 \cdot 3$ are higher harmonics or cross-resonances already recaptured by previously opened prime channels. Only when a step lands where every existing prime channel is blind ($|N_S|_p = 1$ for all $p \in S$) does global adelic closure force a brand-new prime contraction channel $q \notin S$ to nucleate.

## 14.2 Rational Adelic Product Closure and Linear Independence of Prime Logarithms

In the pinned `trureturing` library, global adelic closure stands as a purely rational finite-product identity: it requires neither the real completion $\mathbb{R}$ nor the $p$-adic fields $\mathbb{Q}_p$, because every factor lies in $\mathbb{Q}_{>0}$ and all but finitely many factors equal $1$.

::: {.theorem #thm-ch14-adelic-product-formula title="Rational Adelic Product Closure Formula" lean="D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
For every nonzero rational number $r \in \mathbb{Q}^\times$, only finitely many primes $p \in \mathbb{P}$ satisfy $|r|_p \neq 1$, and the finite algebraic product of its ordinary absolute value $|r|_\infty := |r| \in \mathbb{Q}_{>0}$ with all prime-indexed $p$-adic norms $|r|_p := \operatorname{padicNorm}(p, r) \in \mathbb{Q}_{>0}$ closes identically to $1$:

$$
|r|_\infty \prod_{p \in \mathbb{P}}^{\mathrm{fin}} |r|_p = 1.
$$
:::

::: proof
Write $r = \operatorname{num}(r) / \operatorname{den}(r)$ in canonical reduced form with $\operatorname{num}(r) \in \mathbb{Z} \setminus \{0\}$ and $\operatorname{den}(r) \in \mathbb{N}_{>0}$. For any positive integer $n$, every prime $p \nmid n$ has $v_p(n) = 0$ and thus $|n|_p = 1$, collapsing the finite-support product to $\prod_{p \mid n} p^{-v_p(n)} = \bigl(\prod_{p \mid n} p^{v_p(n)}\bigr)^{-1} = n^{-1}$ by unique prime factorization; sign invariance $|-z|_p = |z|_p$ extends this to $\prod_p^{\mathrm{fin}} |z|_p = |z|^{-1}$ for every nonzero integer $z$. Using multiplicativity $|r|_p = |\operatorname{num}(r)|_p / |\operatorname{den}(r)|_p$ and finite-support quotient distribution yields

$$
|r|_\infty \prod_{p \in \mathbb{P}}^{\mathrm{fin}} |r|_p
= \frac{|\operatorname{num}(r)|}{\operatorname{den}(r)} \cdot \frac{|\operatorname{num}(r)|^{-1}}{\operatorname{den}(r)^{-1}}
= 1.
$$

The full proof is checked by the Lean kernel.
:::

Projecting the product formula into the classical real logarithmic shadow ($\ln |r|_\infty + \sum_{p \in \mathbb{P}} \ln |r|_p = 0$) assigns to each prime $p$ an independent logarithmic scale axis $\ln p$. The pinned library formally confirms that these prime logarithms admit no nontrivial rational resonance:

::: {.theorem #thm-ch14-prime-log-independence title="Rational Linear Independence of Prime Logarithms" lean="D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence"}
The family of real natural logarithms $(p \mapsto \ln p)$ indexed by `Nat.Primes` is linearly independent over $\mathbb{Q}$: for any finite set of primes $S \subset \mathbb{P}$ and rational coefficients $(c_p)_{p \in S} \in \mathbb{Q}^S$,

$$
\sum_{p \in S} c_p \ln p = 0 \quad \Longrightarrow \quad \forall p \in S,\; c_p = 0.
$$
:::

::: proof
Clearing denominators via fraction-field equivalence (`LinearIndependent.iff_fractionRing`) reduces $\mathbb{Q}$-linear independence to integer relations $\sum_{p \in S} k_p \ln p = 0$ ($k_p \in \mathbb{Z}$). Moving negative terms across the equality and exponentiating produces $\prod_{k_p > 0} p^{k_p} = \prod_{k_p < 0} p^{-k_p}$, whence uniqueness of prime factorization forces every $k_p = 0$ and therefore every $c_p = 0$. The full proof is checked by the Lean kernel.
:::

[@thm-ch14-prime-log-independence] eliminates periodic phase deadlock at the root: no two distinct primes $p \neq q$ ever have a rational frequency ratio $\ln p / \ln q$ (for example, $a \ln 2 + b \ln 3 = 0$ in $\mathbb{Q}$ forces $a = b = 0$), so multi-prime phase dynamics on compact tori never collapse into a repeating closed loop.

::: {.example #ex-ch14-adelic-nucleation-audit title="Quantitative Audit: Step-by-Step Prime Nucleation and Adelic Balance of −18/35"}
Verify [@thm-ch14-adelic-product-formula] step by step across the opening integers, the Euclid escape witness $31$, and the signed fraction $r = -\frac{18}{35}$ (`by direct algebraic derivation`):

| Rational $r$ | Prime factorization | Flat norm $|r|_\infty$ | Nontrivial ultrametric factors $|r|_p$ | Adelic product | Channel role |
| :---: | :---: | :---: | :--- | :---: | :--- |
| $2$ | $2^1$ | $2$ | $|2|_2 = 1/2$ | $1$ | Nucleates primordial channel $p = 2$ |
| $3$ | $3^1$ | $3$ | $|3|_3 = 1/3$ ($|3|_2 = 1$) | $1$ | Nucleates primordial channel $p = 3$ |
| $4$ | $2^2$ | $4$ | $|4|_2 = 1/4$ | $1$ | Second harmonic of $p = 2$ (composite) |
| $5$ | $5^1$ | $5$ | $|5|_5 = 1/5$ ($|5|_2 = |5|_3 = 1$) | $1$ | Nucleates primordial channel $p = 5$ |
| $6$ | $2^1 \cdot 3^1$ | $6$ | $|6|_2 = 1/2,\; |6|_3 = 1/3$ | $1$ | Cross-harmonic of $\{2, 3\}$ (composite) |
| $31$ | $31^1$ | $31$ | $|31|_{31} = 1/31$ ($\{2,3,5\}$ blind) | $1$ | Escape witness nucleating $p = 31$ |
| $-18/35$ | $-2^1 \cdot 3^2 \cdot 5^{-1} \cdot 7^{-1}$ | $18/35$ | $|r|_2 = 1/2,\; |r|_3 = 1/9,\; |r|_5 = 5,\; |r|_7 = 7$ | $1$ | Numerator contraction cancels denominator expansion |

Checking $r = -18/35$ directly: $\frac{18}{35} \cdot \frac{1}{2} \cdot \frac{1}{9} \cdot 5 \cdot 7 = \frac{18 \cdot 35}{35 \cdot 18} = 1$. Even when numerator and denominator live in disjoint prime sectors, the rational product closes to $1$ with zero remainder.
:::

## 14.3 Hurwitz Prime Spinor Splitting and the Norm-5 Six-Generator Set S₅

On the scalar integer line $\mathbb{Z}_+$, prime multiplication is commutative ($2 \cdot 3 = 3 \cdot 2$) and therefore blind to non-commuting three-dimensional rotational word order. When we lift arithmetic into the four-dimensional integer quaternions — the **Lipschitz ring** $\mathcal{L}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i}, \mathbf{j}, \mathbf{k}] \cong \mathbb{Z}^4$ and the maximal **Hurwitz ring** $\mathcal{H}(\mathbb{Z}) = \mathcal{L}(\mathbb{Z}) \cup (\mathbb{Z} + \frac{1}{2})^4$ — every odd prime $p$ undergoes a striking **non-abelian spinor splitting**.

By Jacobi's four-square theorem and Hurwitz factorization (`Literature result, not formalized in this book`; see [@rem-ch14-literature-and-model-boundary]), for every odd prime $p$ the equation $w^2 + x^2 + y^2 + z^2 = p$ has exactly $r_4(p) = 8(p + 1)$ integer solutions in $\mathbb{Z}^4$ and $24(p + 1)$ norm-$p$ elements in $\mathcal{H}(\mathbb{Z})$. Taking associate classes under left multiplication by the $24$ Hurwitz units (or, for $p \equiv 1 \pmod 4$, by the $8$ Lipschitz units $\{\pm 1, \pm\mathbf{i}, \pm\mathbf{j}, \pm\mathbf{k}\}$), every odd prime $p$ splits into **exactly $p + 1$ primitive norm-$p$ spinor classes** $\{\boldsymbol{\pi}_{p,k}\}_{k=1}^{p+1}$.

When $p \equiv 1 \pmod 4$, parity modulo $4$ forces $w^2 + x^2 + y^2 + z^2 = p$ to have **exactly one odd coordinate and three even coordinates**. Multiplying on the left by a unique Lipschitz unit places every Lipschitz left associate class in canonical form:

$$
w > 0, \qquad w \equiv 1 \pmod 2, \qquad x \equiv y \equiv z \equiv 0 \pmod 2.
$$

These $p + 1$ canonical Lipschitz spinors come in $(p + 1)/2$ conjugate pairs $\boldsymbol{\pi}, \overline{\boldsymbol{\pi}}$ (no element is self-conjugate because $p$ is not a square), producing $(p + 1)/2$ inverse pairs of exact rational rotations in $\mathrm{SO}(3, \mathbb{Q})$.

The classes give a count, while spherical right translation depends on the representatives. The conjugate pairing below comes from the parity and positive-sign conditions. Arbitrary representatives need not have this property, as the $p=3$ example in Chapter 15 shows.

::: {.definition #def-ch14-hurwitz-prime-spinors title="Hurwitz Prime Spinors and the Canonical Norm-5 Six-Generator Set S₅"}
For any odd prime $p \equiv 1 \pmod 4$, define its **canonical norm-$p$ prime spinor set** by

$$
S_p := \bigl\{\,\boldsymbol{\pi} = (w, x, y, z) \in \mathbb{Z}^4 : w^2 + x^2 + y^2 + z^2 = p,\; w > 0,\; w \equiv 1 \pmod 2,\; 2 \mid x, y, z\,\bigr\},
$$

which has exact cardinality $|S_p| = p + 1$. Each $\boldsymbol{\pi} \in S_p$ has homogeneous ray fidelity $\kappa(\mathbf{o}, \boldsymbol{\pi}) = \frac{w^2}{p} \in \mathbb{Q} \cap (0, 1)$ relative to $\mathbf{o} = (1, 0, 0, 0)$, and induces via conjugation $\mathbf{v} \mapsto \boldsymbol{\pi}\mathbf{v}\boldsymbol{\pi}^{-1} = \frac{1}{p}\boldsymbol{\pi}\mathbf{v}\overline{\boldsymbol{\pi}}$ an exact rational rotation $R(\boldsymbol{\pi}) \in \mathrm{SO}(3, \mathbb{Q})$ with denominator $p$.

Specializing to the smallest prime $p \equiv 1 \pmod 4$, namely **$p = 5$**, the partition $5 = 1^2 + 2^2 + 0^2 + 0^2$ is the unique split into one odd square and three even squares, yielding the **$p + 1 = 6$ canonical spinors**

$$
S_5 := \bigl\{\, (1, \pm 2, 0, 0),\; (1, 0, \pm 2, 0),\; (1, 0, 0, \pm 2) \,\bigr\}.
$$

All six spinors in $S_5$ share the **uniform ray fidelity** $\kappa(\mathbf{o}, \boldsymbol{\pi}_{5,k}) = \frac{1^2}{5} = \frac{1}{5}$ and act in $\mathrm{SO}(3, \mathbb{Q})$ as $(3, 4, 5)$ Pythagorean rotations about the $x, y, z$ axes with $\cos\theta = 2\kappa - 1 = -\frac{3}{5}$ and $\sin\theta = \pm\frac{4}{5}$.
:::

The cited D5 declarations record `strict_omega.axioms: []`. The six generators of $S_5$ are encoded as the finite inductive type `S5.Generator`, and both their exact squared norm $5$ and uniform scalar fidelity $\kappa = \frac{1}{5}$ are formally frozen as strict equalities:

::: {.theorem #thm-ch14-lps-norm-five title="Zero-Axiom Squared Norm and Uniform Fidelity of the Six Norm-5 Generators" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five"}
The cited D5 declarations record `strict_omega.axioms: []`. Let $g : \mathrm{S5.Generator}$ range over the six canonical generators of $S_5$ with integer quaternion coordinates $(1, \pm 2, 0, 0)$, $(1, 0, \pm 2, 0)$, and $(1, 0, 0, \pm 2)$. Writing $q.\mathrm{normSq} := w^2 + x^2 + y^2 + z^2 \in \mathbb{Z}$ and $q.\kappa := \mathrm{IntRatio.value}(w^2, |q.\mathrm{normSq}|)$, both exact equalities hold for every $g : \mathrm{S5.Generator}$:

$$
g.\mathrm{coordinates}.\mathrm{normSq} = 5
\qquad \text{and} \qquad
g.\mathrm{coordinates}.\kappa = \frac{1}{5}.
$$

:::

::: proof
Case recursion (`Generator.rec`) splits over the six constructors `xPlus`, `xMinus`, `yPlus`, `yMinus`, `zPlus`, and `zMinus`: each has scalar entry $w = 1$, one imaginary coordinate equal to $\pm 2$, and the remaining two equal to $0$, so $1^2 + (\pm 2)^2 + 0^2 + 0^2 = 5$ and $q.\kappa = \mathrm{IntRatio.value}(1^2, 5) = \frac{1}{5}$ close directly by definitional reduction in all six branches. The full proof is checked by the Lean kernel.
:::

Precision demands noting a subtle distinction between $p = 5$ and larger primes $p \equiv 1 \pmod 4$: at $p = 5$, [@thm-ch14-lps-norm-five] certifies that every spinor in $S_5$ satisfies $w = 1$ and therefore attains $\kappa = 1/p = 1/5$ uniformly; at $p = 13$, by contrast, the $14$ canonical spinors split across two $w$-shells — eight spinors $(1, \pm 2, \pm 2, \pm 2)$ with $\kappa = 1/13$ and six spinors $(3, \pm 2, 0, 0), (3, 0, \pm 2, 0), (3, 0, 0, \pm 2)$ with $\kappa = 9/13$ — though all $14$ still share norm $13$ and adjoint denominator $13$.

Moreover, both the twelve projective representatives of the $24$ Hurwitz units (modulo $\pm 1$, encoded in doubled integer coordinates) and the $2\times 2$ modulo-$5$ matrix splitting of $S_5$ induced by $2^2 \equiv -1 \pmod 5$ are formally frozen as exact equalities in the cited D5 proofs on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch14-hurwitz-mod5-splitting title="Zero-Axiom Hurwitz Unit Core and Mod-5 Rank-1 Splitting Theorem" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.hurwitz_core_unit D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_product_zero"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `Hurwitz.Coordinates` be integer quaternion coordinates, let `Hurwitz.Core` enumerate the twelve projective Hurwitz unit representatives whose doubled integer coordinates `u.doubled` represent $1$, $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$, and the eight half-integer units $\frac{1 \pm \mathbf{i} \pm \mathbf{j} \pm \mathbf{k}}{2}$ without denominators, let `Hurwitz.Generator` enumerate the six norm-$5$ generators $(1, \pm 2, 0, 0)$, $(1, 0, \pm 2, 0)$, and $(1, 0, 0, \pm 2)$, and let `Hurwitz.split5 : Coordinates → Matrix5` reduce the integer splitting map `Hurwitz.split (w, x, y, z) := [[w + 2x, y + 2z], [2z - y, w - 2x]]` modulo $5$ into $\mathrm{Mat}_2(\mathbb{F}_5)$ (`Matrix5`). Then all three exact equalities hold:

1. **Doubled unit norm of the twelve projective Hurwitz units** (`hurwitz_core_unit`): for every `u : Hurwitz.Core`, `u.doubled.normSq = 2 * 2 = 4` (certifying unit norm $4 / 2^2 = 1$ in unscaled coordinates);
2. **Nonzero rank-1 outer-product splitting modulo 5** (`mod_five_rank_one`): for every `g : Hurwitz.Generator`, setting `f := g.factors` gives

   $$
   \mathrm{split5}(g.\mathrm{coordinates}) = \mathrm{Matrix5.outer}(f.u, f.v, f.s, f.t)
   \qquad \text{and} \qquad
   \mathrm{split5}(g.\mathrm{coordinates}).\mathrm{isZero} = \mathrm{false},
   $$

   so all six split images are nonzero rank-$1$ outer products in $\mathrm{Mat}_2(\mathbb{F}_5)$;
3. **Exact opposite-pair characterization of zero products** (`mod_five_product_zero`): for all $6\times 6 = 36$ ordered pairs `g, h : Hurwitz.Generator`,

   $$
   \bigl(\mathrm{split5}(g.\mathrm{coordinates}) \cdot \mathrm{split5}(h.\mathrm{coordinates})\bigr).\mathrm{isZero} = g.\mathrm{isOpposite}(h),
   $$

   so the modulo-$5$ matrix product vanishes if and only if $g$ and $h$ are conjugate opposite generators.
:::

::: {.proof}
For the first statement, case recursion over the twelve constructors of `Hurwitz.Core` (`scalar`, the eight half-integer sign combinations, and `i`, `j`, `k`) reduces each doubled squared norm directly to $2^2 + 0^2 + 0^2 + 0^2 = 4$ or $1^2 + (\pm 1)^2 + (\pm 1)^2 + (\pm 1)^2 = 4$ by `Eq.refl`. For the second statement, six-way case recursion over `Hurwitz.Generator` evaluates `Hurwitz.split5` on each generator, matching the explicit outer-product factors `(0,1;0,2)`, `(1,0;2,0)`, `(1,3;1,2)`, `(1,2;1,3)`, `(1,4;1,4)`, and `(1,1;1,1)` in `Matrix5` with at least one nonzero entry in every branch. For the third statement, nested six-way case recursion checks all $36$ ordered products in `Matrix5`: exactly the six conjugate opposite pairs evaluate to the zero matrix, while the remaining $30$ products are nonzero, closing every branch by definitional reduction in `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

[@thm-ch14-hurwitz-mod5-splitting] anchors the spinor-level rank-$1$ splitting and opposite-pair cancellation directly in $\mathrm{Mat}_2(\mathbb{F}_5)$ without any axioms (a representation we revisit alongside the $2\times 2$ integer matrix ring in [Chapter 16](ch16-omega-fractran-and-nonabelian-stack.md)). Section 14.4 turns this rank-$1$ modulo-$5$ engine into a full word-length induction inside the zero-axiom kernel, proving constructively that $S_5$ freely generates $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$.

## 14.4 Mod-5 Rank-1 Splitting: S₅ Freely Generates F₃ Inside SO(3, ℚ)

At first glance, $S_5$ looks like three innocuous pairs of $(3, 4, 5)$ rational coordinate-axis rotations. Remarkably, **there are zero hidden algebraic relations among them**: no matter how long a reduced sequence of gates from $S_5$ is multiplied together — provided no generator is immediately followed by its inverse — the composite rotation never returns to the identity $I_3$, and no two distinct reduced words ever induce the same rational rotation.

Even better, this free-group rigidity needs neither continuous Lie theory nor classical choice. The cited D5 declarations record `strict_omega.axioms: []`. Finite words over $S_5$ are encoded as the inductive type `Word` (`.nil` for the empty word and `.cons g tail` for prepending a generator), `IsReduced w` enforces that no letter is followed by its conjugate opposite, and `evalQuat w : Quaternion` and `evalSplit5 w : Matrix5` evaluate the product in the integer Hamilton quaternions and in $\mathrm{Mat}_2(\mathbb{F}_5)$ respectively. Powered by [@thm-ch14-hurwitz-mod5-splitting], four arithmetic rigidity laws lock the spinor level first.

::: {.theorem #thm-ch14-reduced-word-non-scalar title="Mod-5 Nonvanishing, Exact Norm, 5-Primitivity, and Non-Scalarity of Reduced Words" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_split5_nonzero D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_normSq D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_not_div_five D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_non_scalar"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `w : Word` be a finite word over the six norm-$5$ Hurwitz generators, with length $L := w.\mathrm{length}$, natural power $\operatorname{powFive}(L) := 5^L$, common divisibility predicate `AllDivisibleByFive q` (all four integer coordinates are multiples of $5$), and scalar predicate `IsScalar q` ($\exists k \in \mathbb{Z},\, q = (k, 0, 0, 0)$). Then all four statements hold unconditionally:

1. **Nonvanishing mod-$5$ split image of reduced words** ([`reduced_word_split5_nonzero`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_split5_nonzero)): for every word `w` satisfying `IsReduced w`,

   $$
   \bigl(\operatorname{evalSplit5}(w)\bigr).\mathrm{isZero} = \mathrm{false}.
   $$

2. **Exact squared norm $5^L$ for every finite word** ([`reduced_word_normSq`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_normSq)): for every `w : Word` (reduced or not),

   $$
   \bigl(\operatorname{evalQuat}(w)\bigr).\mathrm{normSq} = \operatorname{powFive}(w.\mathrm{length}) = 5^L.
   $$

3. **$5$-primitivity of reduced words** ([`reduced_word_not_div_five`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_not_div_five)): for every word `w` satisfying `IsReduced w`, its four quaternion coordinates are never simultaneously multiples of $5$:

   $$
   \neg\,\operatorname{AllDivisibleByFive}\bigl(\operatorname{evalQuat}(w)\bigr).
   $$

4. **Non-scalarity of nonempty reduced words** ([`reduced_word_non_scalar`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_non_scalar)): for every reduced word `w` with $w \neq \mathrm{nil}$, its quaternion value is never an integer scalar:

   $$
   \neg\,\operatorname{IsScalar}\bigl(\operatorname{evalQuat}(w)\bigr).
   $$
:::

::: {.proof}
First, expanding quaternion products in integer coordinates shows that the integer splitting map satisfies multiplication up to an explicit entrywise multiple of $5$, so reducing modulo $5$ makes `quaternionSplit5` a multiplicative homomorphism into $\mathrm{Mat}_2(\mathbb{F}_5)$ and gives `evalSplit5 w = quaternionSplit5 (evalQuat w)`. For part 1, the empty word maps to $I_2 \neq 0$; for any nonempty reduced word `.cons g tail`, structural induction on `tail` uses the rank-$1$ outer-product factorization and opposite-pair zero-product criterion of [@thm-ch14-hurwitz-mod5-splitting] to show that every non-opposite adjacent pair $(g, h)$ has nonzero row–column contraction in $\mathbb{F}_5$. Hence the reduced product retains the column of $g$ paired with a nonzero row, and since every generator column contains an entry equal to $1 \in \mathbb{F}_5$, the outer product is nonzero. Part 2 follows immediately by word induction from four-square norm multiplicativity and each generator's norm $5$. For part 3, if all four coordinates of `evalQuat w` were multiples of $5$, then `evalSplit5 w = quaternionSplit5 (evalQuat w)` would vanish, contradicting part 1. For part 4, if a nonempty reduced word evaluated to a scalar $(k, 0, 0, 0)$, part 2 would give $k^2 = 5^L \equiv 0 \pmod 5$; since $\mathbb{F}_5$ has no zero divisors, $5 \mid k$, forcing all four coordinates to be divisible by $5$ and again contradicting part 1. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

[@thm-ch14-reduced-word-non-scalar] rules out scalar collapse for every nonempty reduced word at the spinor level. To promote this rigidity to a full free-group embedding $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ at the spatial rotation level, we compare the square-root-free rational adjoint actions (from [Chapter 5](ch05-rational-cayley-rotations.md), [@thm-ch05-rational-adjoint-action]) of two reduced words $u$ and $v$: remarkably, agreement on just the first two integer coordinate axes already determines the reduced word uniquely.

::: {.theorem #thm-ch14-reduced-words-adjoint-injective title="Adjoint Injectivity: S₅ Freely Generates F₃ Inside SO(3, ℚ)" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective"}
The cited D5 declarations record `strict_omega.axioms: []`. Let $\mathrm{axisX} := (1, 0, 0)$ and $\mathrm{axisY} := (0, 1, 0)$ be the first two integer coordinate axes embedded via `RatVec3.ofInt`, and let `Ad` denote the square-root-free rational adjoint action of [Chapter 5](ch05-rational-cayley-rotations.md). For any two reduced words `u, v : Word` satisfying `IsReduced u` and `IsReduced v`, if their rational adjoint actions agree under `RatVec3.Equiv` on both axes,

$$
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisX}) \;\equiv\; \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisX})
\quad \text{and} \quad
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisY}) \;\equiv\; \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisY}),
$$

then the two reduced words are identical:

$$
u = v.
$$
:::

::: {.proof}
Put $p := \operatorname{evalQuat}(u)$ and $q := \operatorname{evalQuat}(v)$; part 2 of [@thm-ch14-reduced-word-non-scalar] ensures $\lVert p\rVert^2 = 5^{|u|} \neq 0$ and $\lVert q\rVert^2 = 5^{|v|} \neq 0$. For each axis $e \in \{\mathrm{axisX}, \mathrm{axisY}\}$, clearing denominators in $\operatorname{Ad}(p)(e) \equiv \operatorname{Ad}(q)(e)$ gives $\lVert q\rVert^2(p e \bar{p}) = \lVert p\rVert^2(q e \bar{q})$. Multiplying on the left by $\bar{p}$ and on the right by $q$, using $\bar{p}p = \lVert p\rVert^2$ and $\bar{q}q = \lVert q\rVert^2$, and canceling the nonzero scalar $\lVert p\rVert^2\lVert q\rVert^2$ shows that $\bar{p}q$ commutes with $e$: $(\bar{p}q)e = e(\bar{p}q)$. Commuting simultaneously with $\mathbf{i}$ (`axisX.pure`) and $\mathbf{j}$ (`axisY.pure`) forces $2x = 2y = 2z = 0$ for $\bar{p}q = (w, x, y, z)$, so $\bar{p}q$ is an integer scalar quaternion. Structural induction on $u$ completes the proof: whenever $u$ and $v$ begin with the same letter $g$, factoring out $\bar{g} g = 5$ leaves $\overline{\operatorname{evalQuat}(u')}\,\operatorname{evalQuat}(v')$ scalar as well and reduces to the tails; at the first differing letter (or when one word is empty and the other nonempty), reversing and conjugating the first word onto the front of the second (`reverseOppositeAppend u v`) produces a **nonempty reduced word** evaluating to $\bar{p}q$, contradicting part 4 of [@thm-ch14-reduced-word-non-scalar]. Thus $u = v$. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

Specializing [@thm-ch14-reduced-words-adjoint-injective] to $v = \mathrm{nil}$ immediately certifies trivial kernel: any reduced word whose rational adjoint rotation fixes `axisX` and `axisY` must equal `Word.nil`. Distinct reduced words therefore define distinct rotations in $\mathrm{SO}(3, \mathbb{Q})$ with zero axioms, establishing constructively that $S_5$ freely generates $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$. To see the same modulo-$5$ rank-$1$ cancellation directly on the $3 \times 3$ rotation matrices themselves, the concrete calculation below spells out all six generators explicitly in $\mathrm{Mat}_3(\mathbb{F}_5)$.

::: {.example #ex-ch14-mod5-rank1-free-group title="Explicit 3×3 Adjoint Check: Mod-5 Rank-1 Outer-Product Splitting and Word Growth of F₃"}
Set $A := R(1, 2, 0, 0)$, $B := R(1, 0, 2, 0)$, and $C := R(1, 0, 0, 2)$, with inverses $A^{-1} = R(1, -2, 0, 0)$, $B^{-1} = R(1, 0, -2, 0)$, and $C^{-1} = R(1, 0, 0, -2)$. Computing $\mathbf{v} \mapsto \frac{1}{5}\boldsymbol{\pi}\mathbf{v}\overline{\boldsymbol{\pi}}$ on the pure-imaginary basis produces six scaled integer matrices $M_g := 5 R(g) \in \mathrm{Mat}_{3\times 3}(\mathbb{Z})$ (`by direct algebraic derivation`):

$$
M_{A^{\pm 1}} = \begin{pmatrix} 5 & 0 & 0 \\ 0 & -3 & \mp 4 \\ 0 & \pm 4 & -3 \end{pmatrix}, \qquad
M_{B^{\pm 1}} = \begin{pmatrix} -3 & 0 & \pm 4 \\ 0 & 5 & 0 \\ \mp 4 & 0 & -3 \end{pmatrix}, \qquad
M_{C^{\pm 1}} = \begin{pmatrix} -3 & \mp 4 & 0 \\ \pm 4 & -3 & 0 \\ 0 & 0 & 5 \end{pmatrix}.
$$

Reducing every entry modulo $5$ (using $-3 \equiv 2$, $4 \equiv -1$, and $-4 \equiv 1 \pmod 5$) splits all six matrices into exact **rank-$1$ outer products** $\overline{M}_g \equiv u_g v_g^\top \pmod 5$ over $\mathbb{F}_5$:

| Generator $g$ | Column $u_g \in \mathbb{F}_5^3$ | Row $v_g^\top \in \mathbb{F}_5^{1\times 3}$ | Mod-$5$ outer-product check $u_g v_g^\top \equiv \overline{M}_g \pmod 5$ |
| :---: | :---: | :---: | :--- |
| $A^{+1}$ | $(0, 1, 2)^\top$ | $(0, 2, 1)$ | $(2,3)$ block $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $A^{-1}$ | $(0, 1, -2)^\top$ | $(0, 2, -1)$ | $(2,3)$ block $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |
| $B^{+1}$ | $(1, 0, -2)^\top$ | $(2, 0, -1)$ | $(1,3)$ block $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |
| $B^{-1}$ | $(1, 0, 2)^\top$ | $(2, 0, 1)$ | $(1,3)$ block $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $C^{+1}$ | $(1, 2, 0)^\top$ | $(2, 1, 0)$ | $(1,2)$ block $\bigl(\begin{smallmatrix} 2 & 1 \\ 4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & 1 \\ -1 & 2 \end{smallmatrix}\bigr)$ |
| $C^{-1}$ | $(1, -2, 0)^\top$ | $(2, -1, 0)$ | $(1,2)$ block $\bigl(\begin{smallmatrix} 2 & -1 \\ -4 & 2 \end{smallmatrix}\bigr) \equiv \bigl(\begin{smallmatrix} 2 & -1 \\ 1 & 2 \end{smallmatrix}\bigr)$ |

Now check all $6 \times 6 = 36$ transition scalars $v_g^\top u_h \pmod 5$:

- **Same axis, same sign ($h = g$)**: e.g. $v_{A^+}^\top u_{A^+} = 0 + 2 + 2 = 4 \equiv -1 \not\equiv 0 \pmod 5$; all $6$ pairs give $4 \not\equiv 0$.
- **Same axis, opposite sign ($h = g^{-1}$)**: e.g. $v_{A^+}^\top u_{A^-} = 0 + 2 - 2 = 0 \pmod 5$; all $6$ inverse pairs vanish (mirroring $M_g M_{g^{-1}} = 25 I_3 \equiv 0 \pmod 5$).
- **Distinct axes ($24$ pairs)**: $v_{A^\pm}^\top u_{B^\pm} = (\pm 1)(\mp 2) = \pm 2 \not\equiv 0$; $v_{A^\pm}^\top u_{C^\pm} = 2(\pm 2) = \pm 4 \equiv \mp 1 \not\equiv 0$; $v_{B^\pm}^\top u_{C^\pm} = 2 \cdot 1 = 2 \not\equiv 0$; $v_{B^\pm}^\top u_{A^\pm} = (\mp 1)(\pm 2) = \pm 2 \not\equiv 0$; $v_{C^\pm}^\top u_{A^\pm} = (\pm 1)\cdot 1 = \pm 1 \not\equiv 0$; $v_{C^\pm}^\top u_{B^\pm} = 2 \cdot 1 = 2 \not\equiv 0 \pmod 5$.

**Immediate consequence**: For every nonempty reduced word $w = g_1 g_2 \cdots g_L$ ($L \ge 1$, $g_{i+1} \neq g_i^{-1}$), the scalar product $\Lambda(w) := \prod_{i=1}^{L-1} (v_{g_i}^\top u_{g_{i+1}})$ is strictly nonzero in the field $\mathbb{F}_5$, and both $u_{g_1}$ and $v_{g_L}^\top$ are nonzero, so

$$
5^L R(w) = M_{g_1} M_{g_2} \cdots M_{g_L} \;\equiv\; \Lambda(w)\, u_{g_1} v_{g_L}^\top \;\not\equiv\; 0 \pmod 5.
$$

Yet $5^L I_3 \equiv 0 \pmod 5$ for all $L \ge 1$. Hence $R(w) \neq I_3$: the set $S_5$ freely generates $\langle A, B, C \rangle \cong F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$. Even stronger, $5$ never divides the entire matrix $5^L R(w)$, proving that the exact reduced denominator of $R(w)$ is literally $5^L$ with zero $5$-adic cancellation.
:::

The static figure below pairs the scalar adelic product balance of Section 14.2 with the zero-axiom free-group embedding just certified ([@thm-ch14-reduced-word-non-scalar], [@thm-ch14-reduced-words-adjoint-injective]), showing how primes simultaneously cancel flat stretching back to unity across all rational valuations and unfold in the rational rotation group $\mathrm{SO}(3,\mathbb Q)$ into the collision-free $6$-valent free tree $F_3$ generated by $S_5$.

::: {.figure src="ch14-adelic-f3-tree"}
**Rational adelic product closure and the $6$-valent $S_5 \hookrightarrow F_3$ free Cayley tree.** One side illustrates exact rational balance $|r|_\infty \prod_p |r|_p = 1$ (exemplified by $r = -18/35$) between the flat archimedean norm and finitely supported $p$-adic ultrametric channels ([@thm-ch14-adelic-product-formula], [@ex-ch14-adelic-nucleation-audit]); the other maps the non-backtracking $6$-regular free tree $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ woven by the six norm-$5$ Hurwitz prime spinors $S_5$ ([@thm-ch14-lps-norm-five]) under mod-$5$ rank-$1$ outer-product splitting ([@thm-ch14-hurwitz-mod5-splitting], [@ex-ch14-mod5-rank1-free-group]), with reduced words expanding as $1, 6, 30, 150, \dots$ and zero $5$-adic denominator collapse.
:::

## 14.5 Exponential Word Growth, Bit-Height Rate, and the Norm-5 Six-Axis Sphere Cover

The free embedding $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ packs exponential combinatorial richness into the rational rotations of the compact real rotation group. Counting reduced words of exact length $L$ gives $1$ empty word at $L = 0$, $6$ single-gate words at $L = 1$, and $5$ non-backtracking branches at every subsequent step, yielding $N_{\mathrm{words}}(L) = 6 \cdot 5^{L - 1}$ for $L \ge 1$:

| Word length (gates) $L$ | Reduced words $N_{\mathrm{words}}(L)$ | Cumulative words (ball $\le L$) | Spinor norm squared $\|\mathbf{q}\|^2 = 5^L$ | Spinor bit height $\frac{L}{2}\log_2 5$ |
| :---: | ---: | ---: | ---: | ---: |
| $0$ | $1$ | $1$ | $1$ | $0.000000$ |
| $1$ | $6$ | $7$ | $5$ | $1.160964$ |
| $2$ | $30$ | $37$ | $25$ | $2.321928$ |
| $3$ | $150$ | $187$ | $125$ | $3.482892$ |
| $4$ | $750$ | $937$ | $625$ | $4.643856$ |
| $5$ | $3750$ | $4687$ | $3125$ | $5.804820$ |

Inspect the rightmost column: each multiplication by $\boldsymbol{\pi}_{5,k} \in S_5$ scales the squared norm of the integer spinor $\mathbf{q} = \boldsymbol{\pi}_{5,k_1} \cdots \boldsymbol{\pi}_{5,k_L} \in \mathbb{Z}^4$ by exactly $5$ (as formally proved in parts 2 and 3 of [@thm-ch14-reduced-word-non-scalar], $\|\mathbf{q}\|^2 = 5^L$ and no factor of $5$ divides all four coordinates of $\mathbf{q}$). Every integer coordinate of $\mathbf{q}$ is therefore bounded by $\|\mathbf{q}\| = 5^{L/2}$, giving an exact **spinor bit-height rate** of

$$
h_{\mathrm{spinor}}(5) = \frac{1}{2}\log_2 5 \approx 1.160964\;\text{bits/gate}
$$

(while the adjoint rotation matrix $R(w) \in \mathrm{SO}(3, \mathbb{Q})$ has denominator $5^L$, doubling the rate to $\log_2 5 \approx 2.321928$ bits/gate because conjugation is quadratic in the spinor). The reduced words of length five represent $3750$ distinct rational rotations.

Remarkably, the very same integer norm-$5$ motif $(1, \pm 2)$ across three coordinate planes also governs a formally verified geometric covering theorem on the unit two-sphere $S^2 \subset \mathbb{R}^3$ in the pinned `trureturing` library:

::: {.theorem #thm-ch14-six-axis-open-cover title="Orthogonality-Free Open Cover of the Unit Two-Sphere by Six Norm-5 Rational Axes" lean="D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover"}
In $\mathbb{R}^3$, let the six unnormalized norm-$5$ integer axes (each satisfying $\|a_i\|^2 = 5$) be

$$
a_0 = (1, 2, 0),\quad a_1 = (1, -2, 0),\quad a_2 = (0, 1, 2),\quad a_3 = (0, 1, -2),\quad a_4 = (2, 0, 1),\quad a_5 = (-2, 0, 1),
$$

and define on the real unit two-sphere $S^2$ the six strict projection superlevel sets

$$
C_i := \bigl\{\, x \in S^2 : 5 < 2\langle x, a_i \rangle^2 \,\bigr\} \qquad (i = 0, 1, \dots, 5).
$$

Then all three statements hold simultaneously:

1. each $C_i$ is relatively open in $S^2$;
2. no $C_i$ contains an orthogonal pair (for all $x, y \in C_i$, $\langle x, y \rangle \neq 0$);
3. the six sets cover the entire sphere: $\bigcup_{i=0}^5 C_i = S^2$.
:::

::: proof
Openness follows directly from continuity of $x \mapsto 2\langle x, a_i\rangle^2$. Orthogonality exclusion follows from Bessel's inequality: if $x, y \in C_i$ were orthogonal unit vectors, then $\langle x, a_i\rangle^2 + \langle y, a_i\rangle^2 \le \|a_i\|^2 = 5$, contradicting $2\langle x, a_i\rangle^2 > 5$ and $2\langle y, a_i\rangle^2 > 5$. Covering is certified by an explicit nonnegative polynomial identity: setting $a = |x_0|, b = |x_1|, c = |x_2|$, $M = \max\{a+2b, b+2c, c+2a\}$, and nonnegative slacks $u = M - a - 2b$, $v = M - b - 2c$, $w = M - c - 2a$, the exact identity

$$
3 M^2 - 9(a^2 + b^2 + c^2) = u v + v w + w u + 6(a w + b u + c v) + \frac{(a - b)^2 + (b - c)^2 + (c - a)^2}{2} \ge 0
$$

guarantees that some axis $a_i$ satisfies $\langle x, a_i\rangle^2 \ge 3\|x\|^2 = 3$, hence $2\langle x, a_i\rangle^2 \ge 6 > 5$, placing $x \in C_i$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch14-literature-and-model-boundary title="Evidentiary Boundaries: Jacobi's Four-Square Theorem, Hurwitz Factorization, and Adelic Geometric Interpretation"}
The evidentiary layers of this chapter are cleanly separated: [@thm-ch14-adelic-product-formula], [@thm-ch14-prime-log-independence], and [@thm-ch14-six-axis-open-cover] are anchored to pinned classical-shadow `trureturing` declarations, while [@thm-ch14-lps-norm-five], [@thm-ch14-hurwitz-mod5-splitting], [@thm-ch14-reduced-word-non-scalar], and [@thm-ch14-reduced-words-adjoint-injective] are all frozen in D5 with strict measurements (`strict_omega.axioms: []`), certifying the six norm-$5$ generators, the twelve doubled projective Hurwitz unit representatives, the $\mathrm{Mat}_2(\mathbb{F}_5)$ rank-$1$ outer-product splitting, arbitrary-length $5$-primitivity and non-scalarity of reduced words, and two-axis rational adjoint injectivity establishing $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$; the complementary $3\times 3$ explicit matrix check in $\mathrm{Mat}_3(\mathbb{F}_5)$ ([@ex-ch14-mod5-rank1-free-group]), the reduced-word growth table, and the spinor bit-height rate $\frac{1}{2}\log_2 5$ are complete elementary derivations (`by direct algebraic derivation`); and reading primes as ultrametric curvature-recovery nuclei counterbalancing flat tangent expansion is the monograph's geometric interpretation (`MODEL`). **Literature result, not formalized in this book:** the four-square representation count $r_4(n) = 8\sum_{4 \nmid d \mid n} d$ is due to C. G. J. Jacobi (*Fundamenta Nova*, 1829); Euclidean division and prime factorization in the maximal Hurwitz order $\mathcal{H}(\mathbb{Z})$ are due to A. Hurwitz (*Nachr. Ges. Wiss. Göttingen*, 1896, pp. 313–340); and free generation by $(3, 4, 5)$ rotations and general $p \equiv 1 \pmod 4$ prime spinors appear in S. Świerczkowski (*Fund. Math.* **46**, 187–189, 1958) and A. Lubotzky, R. Phillips, and P. Sarnak (*Combinatorica* **8**, 261–277, 1988). Note also that the six axes of [@thm-ch14-six-axis-open-cover] reside in $\mathbb{R}^3$ and share the $(1, \pm 2)$ norm-$5$ integer motif with $S_5 \subset \mathbb{Z}^4$, while belonging to a distinct three-dimensional carrier.
:::

The short film below walks the chapter's main line once: from a ruler for every prime, to the free tree woven by six prime spinors, to the six-axis cover of the sphere.

::: {.film src="a-ruler-for-every-prime"}
**What the flat ruler stretches, the prime rulers take back; the prime $5$ splits into six spinors that weave a tree which never turns back (2 min 42 s).** On log-scale bars the cyan flat reading $|n|_\infty$ and the magenta prime readings $|n|_p$ have equal length; the products for $2$ to $6$ and for the escape witness $31$, blind to rulers $2$, $3$ and $5$, are recomputed on screen as $1$, and the green labels point to [@thm-ch14-adelic-product-formula] and [@thm-ch14-prime-log-independence], while the violet panel reading primes as curvature-recovery nuclei is the book's interpretation. Then $(1 + 2i)(1 - 2i) = 5$ yields the six spinors, with the green label for [@thm-ch14-lps-norm-five]; the $(3, 4, 5)$ rotation matrix of $1 + 2i$, the six $2\times 2$ residue matrices mod $5$ with their column-times-row factors, and the $6\times 6$ product table whose six magenta zero cells sit exactly on inverse pairs are computed on screen, with the green labels for [@thm-ch14-hurwitz-mod5-splitting]. The reduced word $(1 + 2i)(1 + 2j)(1 + 2k) = (-7, 6, -2, 6)$ with squared norm $125 = 5^3$, link scalars $3$ and $4$, and amber residues $3, 1, 3, 1$ mod $5$ is computed, and the chain of nonzero links is the proof idea; the green labels point to parts 1 and 2 of [@thm-ch14-reduced-word-non-scalar] and to [@thm-ch14-reduced-words-adjoint-injective]. The radial free tree colours the $i$, $j$, $k$ axes cyan, magenta and violet; the counts $6$, $30$, $150$, the $187$ distinct rotations given by the $187$ reduced words of length at most $3$, and the bit height $\tfrac12 \log_2 5 \approx 1.160964$ are computed on screen (see [@ex-ch14-mod5-rank1-free-group]). Last, six norm-$5$ axes and their $45^\circ$ caps cover the sphere, with the green label for [@thm-ch14-six-axis-open-cover]; the sampled points on the sphere are only a picture.
:::

Use the interactive lab card below to test both pillars of the chapter firsthand: inspect the rational adelic product balance $|r|_\infty \prod_p |r|_p = 1$ on arbitrary nonzero rationals, and compose reduced words from the six norm-$5$ generators $S_5$ to watch the $6$-valent Cayley tree grow alongside the full mod-$5$ rank-$1$ matrix splitting.

::: {.viz src="adelic-arithmetic-observer-lab" preset="adelic-balance-and-f3-tree" height="520"}
**Adelic balance and $S_5 \hookrightarrow F_3$ Cayley tree lab card (`adelic-balance-and-f3-tree`).** Vary any nonzero rational $r \in \mathbb{Q}^\times$ to verify exact cancellation $|r|_\infty \prod_p |r|_p = 1$ across the archimedean and finitely supported $p$-adic channels ([@thm-ch14-adelic-product-formula]), and compose words over the six norm-$5$ Hurwitz generators $S_5$ ([@thm-ch14-lps-norm-five]) to explore the $6$-valent free Cayley tree of $F_3$ together with mod-$5$ rank-$1$ outer-product splitting ([@thm-ch14-hurwitz-mod5-splitting], [@ex-ch14-mod5-rank1-free-group]), verifying live that only conjugate inverse pairs vanish and every nonempty reduced word retains exact denominator $5^L$.
:::

The six norm-$5$ prime spinors $S_5$ now weave a non-closing $6$-regular free tree $F_3$ inside $\mathrm{SO}(3, \mathbb{Q})$. The urgent spectral question follows at once: **how rapidly do these six spinors mix high-order rational harmonics across $\mathbb{T}_3(\mathbb{Q})$, and can the Ramanujan optimal spectral bound — traditionally stated using $\mathbb{C}$, $\ln p$, and $\sqrt{p}$ — be reformulated completely as a complex-free rational positive-semidefinite inequality?** That synthesis culminates Volume V in [Chapter 15](ch15-rational-hecke-ramanujan-spectrum.md).
