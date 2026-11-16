# 24.7 Where the Chase Stops: A Diagonal Landing Is a Fixed Point, and Existence Without Contraction {#sec-ch24-7}

The chapter opened with a question: how can the chase of "spheres beyond spheres" from [Chapter 21](ch21-diagonalization-and-escape.md) ever come to a halt? The preceding sections answered one special case by contraction ($\cos$ squeezes the interval smaller and smaller) and another by enumeration ($1 + 1/x$ and its conjugate $1/(1+x)$ are the only two live binary fractional maps). The general self-referential reading of $\psi = \psi(\psi)$ requires an explicit premise: **if a listing captures its twisted diagonal, the self-application value at the landing address is a fixed point of the twist**. This conditional statement, independent of any particular function, is the Lean lemma below.

The setting has only three ingredients: a set of addresses $A$, a set of values $Y$, and a **listing** $g : A \to A \to Y$, which assigns to each address $a$ a row $g\ a : A \to Y$. Take in addition a **twist** $f : Y \to Y$. Twisting the diagonal $a \mapsto g\ a\ a$ of the listing pointwise yields a new row $a \mapsto f(g\ a\ a)$. Every escape phenomenon of Chapter 21 comes from one question: is this twisted diagonal one of the rows already in the listing?

::: {.definition #def-twisted-diagonal-escape title="Twisted Diagonal and Escape" lean="D5/S0/Diagonal/EscapeCount.diagonal D5/S0/Diagonal/EscapeCount.IsEscaped"}
Let $A$ and $Y$ be arbitrary types, $f : Y \to Y$, and $g : A \to A \to Y$.

1. The **twisted diagonal** [`diagonal`](lean:D5/S0/Diagonal/EscapeCount.diagonal) $f\ g : A \to Y$ is defined as $a \mapsto f(g\ a\ a)$;
2. The listing $g$ is **escaped** by $f$ ([`IsEscaped`](lean:D5/S0/Diagonal/EscapeCount.IsEscaped) $f\ g$) if $\operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$, that is, if no address $a$ satisfies $g\ a = \operatorname{diagonal} f\ g$.
:::

When a listing is not escaped, some row $g\ a_0$ equals the twisted diagonal. Below we say that the listing **captures** its own twisted diagonal, and we call $a_0$ the **landing address**.

::: {.lemma #lem-diagonal-landing-fixed title="The Self-Application Value at a Diagonal Landing Is a Fixed Point of the Twist" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed"}
Let $f : Y \to Y$, $g : A \to A \to Y$, and $a_0 \in A$. If

$$
g\ a_0 \;=\; \operatorname{diagonal} f\ g,
$$

then

$$
f(g\ a_0\ a_0) \;=\; g\ a_0\ a_0 .
$$
:::

::: proof
Evaluate the equality of functions $g\ a_0 = \operatorname{diagonal} f\ g$ at the address $a_0$ (`congrFun`) to get $g\ a_0\ a_0 = \operatorname{diagonal} f\ g\ a_0 = f(g\ a_0\ a_0)$; swapping the two sides gives the claim. The full proof is checked by the Lean kernel.
:::

The proof is one line long, yet it is the skeleton of $\psi = \psi(\psi)$. Write $\psi := g\ a_0$; it is a row of the listing, itself a function on addresses. Read the address $a_0$ as the name $\ulcorner\psi\urcorner$ of this very row. Then $g\ a_0\ a_0 = \psi(\ulcorner\psi\urcorner)$ is "$\psi$ applied to its own name", and [@lem-diagonal-landing-fixed] states that

$$
f\bigl(\psi(\ulcorner\psi\urcorner)\bigr) \;=\; \psi(\ulcorner\psi\urcorner).
$$

The twist $f$ cannot move this value. The $\psi = \psi(\psi)$ of the book's title is the aphoristic form of this lemma: the row captured by its own listing takes, at its own name, a value that the twist leaves invariant.

The full picture of escape and capture is given by the next theorem. Note that it imposes no finiteness requirement on $A$ or $Y$.

::: {.theorem #thm-self-application-fragment-package title="The Self-Application Fragment: Diagonal Formula, Characterization of Escape, Universal Escape for Fixed-Point-Free Twists, and Necessity of the Hypothesis" lean="D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package"}
Let $A$ and $Y$ be arbitrary types, $f : Y \to Y$, and $g : A \to A \to Y$. All four of the following hold:

1. For every $a \in A$: $\operatorname{diagonal} f\ g\ a = f(g\ a\ a)$;
2. $\operatorname{IsEscaped} f\ g \iff \operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$;
3. If $f$ has no fixed point ($f(y) \neq y$ for every $y \in Y$), then $\operatorname{IsEscaped} f\ h$ for every listing $h : A \to A \to Y$;
4. There exist $f_0 : \mathrm{Bool} \to \mathrm{Bool}$ and $g_0 : \mathrm{Unit} \to \mathrm{Unit} \to \mathrm{Bool}$ such that $\neg\operatorname{IsEscaped} f_0\ g_0$.
:::

::: proof
The first two claims hold by unfolding the definitions (`rfl` and `Iff.rfl`). Claim 3: if $f$ has no fixed point and some listing $h$ is not escaped, then some $a$ satisfies $h\ a = \operatorname{diagonal} f\ h$, and [@lem-diagonal-landing-fixed] gives $f(h\ a\ a) = h\ a\ a$, contradicting fixed-point-freeness (`escaped_of_fixedPointFree`). Claim 4 takes $f_0$ to be the identity and $g_0$ the listing that is constantly $\mathrm{true}$, whose twisted diagonal is its only row (`exists_captured_listing_of_fixedPoint`). The full proof is checked by the Lean kernel.
:::

Claim 3 of [@thm-self-application-fragment-package] is the skeleton of Cantor's diagonal argument, the same mechanism that lies behind [@thm-complete-diagonal-not-continuous] of Chapter 21 (stated there in the framework of surjective decoder catalogs); claim 4 shows that the hypothesis "no fixed point" cannot be dropped. Placing claim 3 next to [@lem-diagonal-landing-fixed] answers the opening question of this chapter:

- when the twist has no fixed point, the chase never stops, and every listing is escaped;
- once the chase stops, the value that the stopping row takes at its own address is a fixed point of the twist.

Conversely, as soon as the twist $f$ has a fixed point $y^*$ and $A$ is nonempty, the listing that is constantly $y^*$ captures its own twisted diagonal (this step is a manual verification by direct substitution). Take $f = \cos$ and $Y = \mathbb{R}$: for any real-valued listing that captures its own cosine-twisted diagonal, the self-application value at the landing address satisfies the cosine fixed-point equation $\cos y = y$ (for its classical real-analytic properties, see [@rem-banach-dottie-hairy-ball-literature]).

In the finite case, the shares of escape and capture can be counted exactly.

::: {.proposition #prop-escaped-listing-card title="Exact Count of Escaped Finite Listings" lean="D5/S0/Diagonal/EscapeCount.escaped_listing_card"}
Let $A$ and $Y$ be finite types (`[Fintype A]`, `[Fintype Y]`) and $f : Y \to Y$. The number of listings escaped by $f$ is

$$
\operatorname{Nat.card}\bigl\{\, g : A \to A \to Y \;\big|\; \operatorname{IsEscaped} f\ g \,\bigr\} \;=\; \Bigl(\lvert Y\rvert^{\lvert A\rvert} - \operatorname{Nat.card}\{\, y : Y \mid f(y) = y \,\}\Bigr)^{\lvert A\rvert},
$$

where $\lvert A\rvert = \operatorname{Fintype.card} A$, $\lvert Y\rvert = \operatorname{Fintype.card} Y$, and the subtraction on the right is subtraction of natural numbers.
:::

::: proof
First treat the case of empty $A$, where both sides equal $1$. For nonempty $A$, split a listing into its diagonal $X : A \to Y$ and the remaining entries of each row. With the diagonal $X$ fixed, the escape condition is independent row by row: if $f(X(a)) \neq X(a)$, row $a$ already differs from the twisted diagonal at position $a$, and its remaining $\lvert A\rvert - 1$ entries are free, giving $\lvert Y\rvert^{\lvert A\rvert - 1}$ choices; if $X(a)$ is a fixed point of $f$, the single choice in which the remaining entries all coincide with the twisted diagonal must be excluded, giving $\lvert Y\rvert^{\lvert A\rvert - 1} - 1$ choices. Summing over all values of $X(a)$, each row contributes $\lvert Y\rvert^{\lvert A\rvert} - k$, where $k$ is the number of fixed points of $f$; multiplying over the rows gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-three-by-three-capture-escape title="Capture and Escape on a 3×3 Listing: One Table, Two Twists"}
Take $A = Y = \{0, 1, 2\}$ and the listing $g$ with rows

$$
g\ 0 = (0, 1, 2), \qquad g\ 1 = (1, 2, 2), \qquad g\ 2 = (2, 2, 2),
$$

whose diagonal is $(g\ 0\ 0,\ g\ 1\ 1,\ g\ 2\ 2) = (0, 2, 2)$.

**A twist with a fixed point.** Take $f_1 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 2$, with the unique fixed point $2$. The twisted diagonal is $(f_1(0), f_1(2), f_1(2)) = (1, 2, 2) = g\ 1$: the listing captures its own twisted diagonal at the landing address $a_0 = 1$. The self-application value there, $g\ 1\ 1 = 2$, is exactly the fixed point of $f_1$, in agreement with [@lem-diagonal-landing-fixed].

**A twist without fixed points.** Take the cycle $f_2 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 0$. The twisted diagonal is $(f_2(0), f_2(2), f_2(2)) = (1, 0, 0)$, which differs from $g\ 0$, $g\ 1$, $g\ 2$ at positions $0, 1, 2$ respectively and is therefore not a row: the listing is escaped, in agreement with claim 3 of [@thm-self-application-fragment-package].

**Counting.** For $\lvert A\rvert = \lvert Y\rvert = 3$ there are $3^9 = 19683$ listings in total. By [@prop-escaped-listing-card]: for $f_2$ (no fixed point) the escaped ones number $(27 - 0)^3 = 19683$, that is, all of them; for $f_1$ (one fixed point) $(27 - 1)^3 = 17576$ are escaped and $19683 - 17576 = 2107$ are captured, about $10.7\%$; for the identity (three fixed points) $(27 - 3)^3 = 13824$ are escaped. All three numbers were confirmed by exhaustive enumeration of the $19683$ listings.
:::

::: {.figure src="ch24-diagonal-landing"}
**One table, two twists: one lands back in the table, the other escapes it.** Both panels show the listing $g$ of the example above, with the three diagonal cells outlined and the twisted diagonal underneath. Left, with $f_1$: the twisted diagonal $(1, 2, 2)$ is exactly row $1$ (cyan), and the circled value $2$ at the landing spot is the fixed point of $f_1$ ([@lem-diagonal-landing-fixed]). Right, with the fixed-point-free cycle $f_2$: the twisted diagonal $(1, 0, 0)$, in magenta, differs from every row at that row's diagonal cell (crossed), so it is no row at all (claim 3 of [@thm-self-application-fragment-package]).
:::

The diagonal mechanism shows that the place where the chase stops must be a fixed point, but it does not guarantee that the twist has one. Where does existence come from? Section 24.4 used contraction. There is an entirely different route that needs no contraction constant at all, only continuity and a stage without holes.

::: {.theorem #thm-brouwer-standard-simplex title="Brouwer's Fixed-Point Theorem on the Standard Simplex" lean="D5/S3/Geometry/FixedPoint/Brouwer.Brouwer"}
Let $n$ be a positive natural number (`n : ℕ+`) and let $\Delta = \operatorname{stdSimplex}\ \mathbb{R}\ (\operatorname{Fin} n)$ be the standard simplex, the set of all functions $x : \operatorname{Fin} n \to \mathbb{R}$ with $x_i \ge 0$ for every $i$ and $\sum_i x_i = 1$, with the subspace topology. If $f : \Delta \to \Delta$ is continuous (`hf : Continuous f`), then there exists $x \in \Delta$ with

$$
f(x) = x .
$$
:::

::: proof
The proof is combinatorial. For each positive integer $l$, take the lattice points of the simplex whose coordinates have denominator $l$, and give each lattice point $x$ a colour: a coordinate $i$ with $x_i \le f(x)_i$ (such an $i$ exists because the coordinates of both points sum to $1$). A Scarf-type combinatorial lemma provides, for each $l$, a small cluster of lattice points together with a colour set $C$; any two points of the cluster differ by less than $2(n+1)$ in each lattice coordinate, so the diameter of the cluster tends to zero as $l \to \infty$. Only finitely many colour sets are possible, so one may pass to a subsequence along which $C$ is constant; by compactness of the simplex a further subsequence converges to a limit point $z$. At the limit, the coordinates outside $C$ satisfy $z_i = 0$ and the coordinates in $C$ sum to $1$; by continuity of $f$, $f(z)_i \ge z_i$ for every $i \in C$, hence $\sum_{i \in C} f(z)_i \ge 1$. Since the coordinates of $f(z)$ are nonnegative and sum to $1$, $f(z)_i = 0$ outside $C$ and the coordinates agree inside $C$, that is, $f(z) = z$. The full proof is checked by the Lean kernel.
:::

The standard simplex is not an abstract solid: it is the set of all probability distributions over $n$ record outcomes, the place where the diagonal of a density matrix lives after the pinching of [Chapter 4](ch04-decoherence.md). [@thm-brouwer-standard-simplex] therefore says that every continuous update rule for record probabilities has a self-consistent distribution, one that is still itself after the update.

Take $n = 2$; the simplex is the segment $\{(p, 1 - p) \mid p \in [0, 1]\}$. Since $\cos p \in [\cos 1, 1] \subset [0, 1]$ for $p \in [0, 1]$, the map $(p, 1 - p) \mapsto (\cos p, 1 - \cos p)$ is a continuous map of this segment into itself, and [@thm-brouwer-standard-simplex] yields $p \in [0, 1]$ with $\cos p = p$. (Substituting $\cos$ into the theorem is a manual remark of this book, not a frozen declaration.) So the **existence** of the cosine fixed point can be obtained without any contraction; what contraction supplies are two other things: **uniqueness**, and the **rate of convergence** computed in Section 24.5.

The two mechanisms divide the work, and the diagonal adds a third piece. A continuous self-map of the standard simplex has a fixed point; a contraction self-map of a nonempty complete metric space also gives uniqueness and convergence of iteration. If a listing captures its twisted diagonal, the value of the landing row at its own name is fixed by the twist. This last conclusion retains the capture hypothesis and does not guarantee capture for an arbitrary listing.

::: {.film src="006-sphere-beyond-spheres"}
**Spheres beyond spheres: the diagonal escape and the cosine fixed point (2:31).** The film plays the whole chase through: flipping the diagonal of a list gives a string that escapes the list; in the four-address catalog it splits an old fiber, and raised as a new axis at right angles it turns two pieces into three ([@cor-complete-diagonal-topological-settlement]); seen from outside, the closed shadow circle is an open helix. The chase stops only where a list catches its own twisted diagonal, and there the landing value is a fixed point of the twist ([@lem-diagonal-landing-fixed]); with cosine as the twist, the cobweb from $1$ radian closes in on the one positive solution $\theta^* \approx 0.739$ ([@thm-dottie-rational-inverse-endpoint]).
:::

---

## 24.7.1 Summary of Part VI: From Spheres Beyond Spheres to $\psi = \psi(\psi)$ — Ready to Forge the Mechanical Canon {#summary-of-part-vi-from-spheres-beyond-spheres-to-ψψψ--ready-to-forge-the-mechanical-canon}

Across the four chapters of Part VI, backed by **forty-four Lean-verified theorem blocks** (seven in Chapter 21, nineteen in Chapter 22, four in Chapter 23, and fourteen in Chapter 24), we have brought mathematical logic, prime spectral theory, Diophantine norm locks, and self-referential fixed points under one geometric roof:

- **Chapter 21** proved that any complete decoder catalog produces a relative semantic diagonal that is discontinuous in the latent partition topology ([@thm-complete-diagonal-not-continuous]), has a nonempty separation deficit ([@lem-complete-diagonal-separation-deficit]), and forces strict observation-topology refinement when adjoined ([@prop-complete-diagonal-strict-refinement], [@cor-complete-diagonal-topological-settlement]), gave the factorial remainder bound for the exponential series in a complete normed algebra ([@lem-exp-tail-le]) and the strictly positive cosine lower bound on the recovery error of a finite-record channel ([@lem-finite-support-autocorrelation-cosine], [@thm-finite-record-cosine-obstruction]), paired with the classical analytic-remainder and spherical-topology literature remarks ([@rem-lagrange-taylor-remainder-literature], [@rem-hairy-ball-adams-literature]);
- **Chapter 22** revealed primes as the orthogonal basis of arithmetic and established on the explicit half-plane $\operatorname{Re}(s) > 1$ the unit residue at $s = 1$ ([@lem-riemann-zeta-residue-one]), the Dirichlet series ([@prop-riemann-zeta-dirichlet-sum]), the Euler prime product ([@thm-riemann-zeta-euler-product]), their direct equality ([@cor-dirichlet-sum-eq-euler-product]), the linear independence of prime logarithms and the torus density of the joint prime-clock phases ([@thm-prime-log-independence], [@thm-torus-power-orbit-closure]), the entirety and reflection symmetry $\xi(1 - s) = \xi(s)$ of the completed xi reading ([@thm-xi-reading-entire-reflection]) together with its conjugation covariance ([@prop-zeta-conjugation-covariance]), the rolling of the critical line into the unit circle with a radial equivalent of the Riemann Hypothesis ([@thm-cayley-critical-line-criterion]), the sign of $\zeta$ on the real axis from the alternating series ([@lem-alternating-zeta-partial-sums], [@prop-zeta-real-axis-sign]), the identification of the zeros of $\xi$ with the zeros of $\zeta$ in the critical strip ([@prop-xi-zeros-strip-zeros]), the Prime Number Theorem with an error term, obtained from the absence of zeros on the line $\operatorname{Re}(s) = 1$ ([@thm-medium-pnt]), the reduction of the Riemann Hypothesis to the right half-strip together with the agreement of its two formulations ([@thm-right-half-strip-rh-forms]), a quartic polynomial showing that full symmetry does not pin zeros to the critical line ([@thm-full-symmetry-not-localization]), Robin's inequality on at most eight prime axes, read from the Euler product at $s = 1$ ([@thm-robin-at-most-eight-primes]), and the theorem that a zero right of the critical line forces some $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ to violate Robin's inequality ([@thm-off-line-zero-robin-violation]), alongside the polyhedral prime-sieve remainder and the epistemic boundary of the open Riemann Hypothesis and classical zeta literature ([@conj-riemann-hypothesis], [@rem-euler-zeta-literature]);
- **Chapter 23** showed how quadratic norms and traces isolate discrete integer lattices, proving unimodular shear reduction, constant discriminant $\Delta = -3$, and range invariance for the Eisenstein crossing family ([@thm-qform-eq-eisnorm], [@lem-qform-discriminant], [@cor-qform-range-eq-eisnorm]) together with the $\Delta = +5$ Golden Pell trace–norm identity ([@prop-pell-form-eq-four-mul-norm]), and delineating in [@rem-diophantine-z-in-q-literature] the boundary between first-order definability literature over $\mathbb{Q}$ and the open existential problem $\mathrm{H10}(\mathbb{Q})$;
- **Chapter 24** proved finite contracting set stabilization and strict-change bounds ([@thm-finite-contracting-updates-stabilize]), adjacent-step agreement and static contextual non-uniqueness (identical text and interpretation rule under two distinct static contexts yield different fixed Boolean meanings, [@lem-conceptual-equivalence-stability-fixed-point], [@prop-context-parameters-distinct-fixed-points]), uniqueness of the positive golden fixed point ([@cor-golden-fixed-point-unique]), the four self-application fates of nondegenerate binary fractional maps with the $\varphi$-family as the only live one ([@thm-self-application-four-fates], [@lem-golden-inverse-branch-fixed-point]), the golden cosines of the regular pentagon ([@prop-pentagon-golden-cosines]), the diagonal landing as a fixed point of the twist together with universal escape for fixed-point-free twists and its finite count ([@lem-diagonal-landing-fixed], [@thm-self-application-fragment-package], [@prop-escaped-listing-card]), Brouwer's fixed-point theorem on the standard simplex ([@thm-brouwer-standard-simplex]), the convergence of orbit averages of an irrational rotation to the Haar average ([@lem-irrational-rotation-equidistribution]), and the normalized central-binomial coefficient bounds and binomial-kernel series used in the arcsine expansion ([@lem-arcsin-binomial-kernel]), established absolute convergence and the signed sum of the prescribed rational compositional inverse at $\pi$, together with uniqueness of the cosine fixed point among all positive reals ([@thm-dottie-rational-inverse-endpoint]), culminating — alongside the classical fixed-point and number-theory literature remark ([@rem-banach-dottie-hairy-ball-literature]) and Schanuel's conjecture ([@conj-schanuel-dottie]) — in $\cos\theta^* = \theta^*$ and the self-referential synthesis $\psi = \psi(\psi)$.

With the theoretical arch of Parts I–VI in place, **Part VII (*Construction and Verification — XOR Algebra, Rotor Compilation, and the Lean 4 Axiom Sanctuary*)** turns these geometric laws into executable matrix-free bitmask Clifford engines and ZYZ rotor compilers, and steps inside the Lean 4 formal sanctuary to audit the frozen proof architecture before **Part VIII** and the **Coda** bring the entire eight-part monograph together.

::: {.viz src="dottie-fibonacci-spirals" height="580"}
**Dottie and Fibonacci Twin Spirals: full interactive lab.** Three scenes share one step rail $k = 0 \dots 20$: Twin ($\cos\theta$, $1/(1+x)$, or both overlaid, with draggable start $x_0$), Squares (whole path or follow-and-zoom), and Angle (inward-radial tangent angles and additive vs. Pythagorean conservation). Qualitative cosine convergence follows [@ex-ch33-mutual-cosine-monotonic-lock], derivatives, inward-radial tangent angles, and conservation laws are literature results ([@rem-dottie-fibonacci-spiral-literature]), Clifford turns, continuous logarithmic-spiral interpolation, and dual-spiral roles are this book's `MODEL`, and green badges mark only the five frozen Lean theorems.
:::
