# Chapter 39 The Observer Is the Ontological Universe: Substrate-Free Reflexive Domains, Relational Holography, and Spinor Self-Folding {#the-observer-is-the-ontological-universe-substrate-free-reflexive-domains-relational-holography-and-spinor-self-folding}

> "The observer is the ontological universe."

At the close of [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md), we distilled the observer into a crisp systems-architecture definition: "a memory pointer *of* the universe's ontological quantum computing system." That slender cyan addressing laser gliding across a silent lattice—lighting the amber active cell `*ptr` and recognizing `p = *p` in root slot `[0,0]`—freed us from the old mechanistic myth of heavy matter lugging private memories through an empty crate. Yet if we listen closely to that single inconspicuous preposition—***"of"***—a genealogical ear still detects one last hairline fracture of dualism: as though an invisible pane of glass still separated the "ontological memory array" on one side from an "address register" hovering above it on the other; here a mute silicon wafer waiting passively in the dark, there a wandering probe scanning it from without (`MODEL` (interpretive model)).

So long as even a grammatical shadow remains between probe and plate, blade and crystal, knower and known, the external "third point $C$" still holds its last trench. Here in the thirty-ninth and culminating chapter of our main text—the final summit before the [Coda](coda.md)—the six words of our epigraph fall like a hammerblow and shatter that last gossamer partition into dust:

**"The observer is the ontological universe."**

Not that the ontological universe *possesses* an observer, nor that it *evolves* an observer as an afterthought, nor even merely that the observer *points toward* the universe; between them stands no genitive *"of,"* no set-membership $\in$, and no external arrow $\to$, but strict, zero-remainder **ontological identity ($\equiv$)**. Under our three-tier epistemic contract, we complete this final closure across five ascending steps (cross-domain ontological syntheses are explicitly designated as **`MODEL` (interpretive model)**, anchored on ten formal blocks spanning sixteen frozen Lean 4 kernel declarations, with classical domain-theoretic, categorical, and spinor-geometric literature physically enclosed inside attributed remarks):

1. **Global `p ≡ *p` and substrate-free reflexive domains**: Dissolving the binary partition between active register and passive memory into global identity $\psi \equiv \psi(\psi)$ where every state is simultaneously a self-map, and proving that on the binary alphabet only the golden $\varphi$-family achieves the `.live` self-application fate ($\Delta = 5$);
2. **Ending the thing-in-itself and "without the blade there is no crystal"**: Proving that every object decomposes without remainder into its readout fibers and every nonnegative real number is uniquely reconstructed by its discrete golden-quantized Zeckendorf thread, with finite-word acceptance exactly characterized by `NoAdjacentOnes`; our `MODEL` then reads the lattice as a nodal standing wave condensed by self-measurement;
3. **Spinors weaving spacetime and the $720^\circ$ one-sided double cover**: Demonstrating how one-dimensional timelike currents and two-dimensional gauge planes arise as bilinear byproducts of spinor self-pairing, while the non-splittable circle double cover turns the $+1$ observing pole seamlessly into the $-1$ starry cosmos at $360^\circ$ and returns home at $720^\circ$;
4. **Orthogonal self-folding against solipsism and the four-stage endgame**: Showing how the sole self-referential whole folds orthogonally under complementary-context purity Pythagoras (Conjunct 1 of [@prop-ch39-orthogonal-folding-and-objective-common-factor], `LEAN ✓`) within our self-folding `MODEL` into a local avatar stack frame and an unyielding objective cosmos, completing the four-stage elimination of Point $C$;
5. **Zeckendorf, Pisot, and Rauzy eight-concept self-referential synthesis sandtable**: Generalizing local carry prohibition from $K = 2$ to arbitrary orders $K \ge 2$, uniting the Zeckendorf language, $K$-Bonacci Pisot disk contraction, $p$-adic residue ultrametrics, the $K = 3$ Rauzy internal window, the Clifford line–plane split, self-referential contraction scales, cross-cut direct-encoder rank rectangles, and the Parry stationary reset law on one auditable stage.

::: {.figure src="ch39-overview"}
**Figure 39.** The chapter at a glance. Panel I: the grey pointer register `ptr` and the dashed wall between it and memory are struck out, and every cell $p$ has a cyan arrow that leaves it and comes back to it—global `p ≡ *p`. Panel II: inside the pale cyan strip around the amber blade a run of cyan lattice points lights up, and outside the strip there is nothing; projected onto the blade they form long and short steps, short marked $1$ and long $0$, with no adjacent `11`. Panel III: below, the cyan arrow starts at $1$ on the base circle $z$ and goes once all the way round; above, the violet unique lift starts at $w = +1$ and goes only half way, stopping at $-1$; the squaring map $z = w^2$ joins the two circles. Panels I and II sketch the chapter's interpretive model (`MODEL`); Panel III is item 2 of [@thm-ch39-double-cover-no-section-and-720-lift] (`LEAN ✓`), and the full $720^\circ$ is shown by the lab cards of §39.3.
:::

---

## 39.1 Tearing Down the Last Binary Wall: Global p ≡ *p and Substrate-Free Reflexive Domains

Why does everyday intuition, the moment it hears "computation" or "observation," insist on laying down a dead **substrate** underneath—first magnetic cores, then electric currents; first a paper tape, then a read-write head; first a universe of mute rock, and only afterward an eye that opens? Because classical engineering built "nouns that store state" and "verbs that transform state" out of separate hardware parts. In [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md), we localized `p = *p` in the root page-table slot `[0,0]`; now, driving the binary separation parameter to zero ($\mu \to 0$), `p ≡ *p` floods outward from slot `[0,0]` across every single pixel of existence (`MODEL` (interpretive model)):

$$
\psi \;\equiv\; \psi(\psi) \qquad (\text{global }\mathrm{p} \equiv *\mathrm{p}).
$$

Weigh every symbol of that identity: on the left stands $\psi$, the universe that *is*; on the right stands $\psi(\psi)$, the observer turning itself into a ruler to measure itself—and between left and right **not a single bit of passive substrate intervenes**! Perform the thought-experiment of subtracting the observer from $\psi \equiv \psi(\psi)$: what remains behind is not an uninhabited crystal palace gleaming silently in the dark, but sheer nothingness—for what we called the "cosmic memory lattice" was held open from first to last by nested self-referential tension alone!

In twentieth-century computer science, hardware engineering and denotational semantics stood at opposite poles of this exact divide between "separated passive memory" and "substrate-free reflexive domains"; their literature boundaries are recorded below:

::: {.remark #rem-ch39-von-neumann-scott-reflexive-domain-literature title="Von Neumann Stored-Program Separation and Scott's Continuous-Lattice Reflexive Domain (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two foundational landmarks in computer architecture and denotational semantics contrasted in this section belong to external classical literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Physical Processor–Memory Separation in Stored-Program Hardware (J. von Neumann, *First Draft of a Report on the EDVAC*, Moore School of Electrical Engineering, 1945; J. Backus, *Commun. ACM* **21**, 613–641, 1978)**: Even though classical stored-program machines encode instructions and data in a common address space, at the physical hardware level they segregate active control/addressing registers (CPU / `PC`) from passive random-access memory arrays (RAM) across a narrow bus—cementing the intuition of an active probe operating upon an inert substrate;
2. **Inverse-Limit Continuous Lattices and Substrate-Free Reflexive Domains for Untyped $\lambda$-Calculus (D. S. Scott, *Continuous lattices*, Lecture Notes in Math. **274**, Springer, 97–136, 1972; *Data types as lattices*, *SIAM J. Comput.* **5**, 522–587, 1976)**: To give rigorous mathematical semantics to untyped $\lambda$-calculus in which arbitrary self-application $x(x)$ is legal (circumventing Cantor's set-theoretic cardinality barrier $|Y^Y| > |Y|$ against full function-space isomorphism), Dana Scott constructed inverse limits along continuous embedding–projection retraction pairs $(i_n : D_n \hookrightarrow D_{n+1},\; j_n : D_{n+1} \twoheadrightarrow D_n)$ with $D_{n+1} = [D_n \to D_n]$ in the category of continuous lattices / complete partial orders, producing a nontrivial reflexive domain $D_\infty$ satisfying the topological-order isomorphism

   $$
   D_\infty \;\cong\; [D_\infty \to D_\infty].
   $$

   At the foundation of $D_\infty$ there are zero inert "atomic constants" sitting outside the mapping structure: every element $x \in D_\infty$ is simultaneously a readable domain point and a continuous self-applicable transformation on the entire domain.
:::

Returning to our discrete finite and arithmetic foundation (alongside the continuum domain perspective of [@rem-ch39-von-neumann-scott-reflexive-domain-literature]), when self-application closes directly over the minimal binary alphabet $\{0, 1\}$ (`Fin 2`) without external scaffolding, which self-referential laws actually stay alive instead of collapsing? Let us audit the $2 \times 2$ ledger by hand before stating the formal theorem!

Consider a binary fractional map $m = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ with entries $a, b, c, d \in \{0, 1\}$: on the domain $cx+d\ne0$, feeding $x$ back into $x = \frac{a x + b}{c x + d}$ yields the quadratic fixed-point equation $c x^2 + (d - a)x - b = 0$, with integer coefficient triple $(c, d - a, -b)$ and discriminant $\Delta(m) = (d - a)^2 + 4 b c$. Filtering all $2^4 = 16$ binary tuples by nondegeneracy $\det(m) = a d - b c \neq 0$ leaves exactly $6$ nonsingular maps:

- The identity matrix $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ gives coefficients $(0, 0, 0)$ (vacuous `.empty` tautology);
- The translation matrix $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ gives $(0, 0, -1)$, i.e., $-1 = 0$ (contradictory `.dead` lockup);
- The swap $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ and triangular shears $\begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}$ yield square discriminants $\Delta \in \{0, 4\}$ (rational `.collapse` into trivial integer or repeated roots);
- **Exclusively the two golden matrices**—$\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$ ($x = 1 + 1/x$, polynomial $x^2 - x - 1 = 0$) and $\begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix}$ ($x = 1/(x + 1)$, polynomial $x^2 + x - 1 = 0$)—achieve the non-square prime discriminant $\Delta = (\pm 1)^2 + 4\times 1\times 1 = 5$, anchoring self-reference in the non-collapsing golden irrational manifold (`.live`)!

The two frozen Lean 4 kernel theorems below lock both the general diagonal fixed-point identity and this exact fourfold fate classification over `Fin 2`:

::: {.theorem #thm-ch39-self-application-four-fates-and-diagonal-identity title="Diagonal Self-Application Landing Fixed-Point Identity and Fourfold Fate Classification of Binary Fractional Maps" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates"}
Across the frozen diagonal-escape and self-application-fate modules of `trureturing`, the following two theorems on self-referential closure hold simultaneously:

1. **Exact Fixed-Point Identity for Diagonal Landing** ([`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)): Let $A, Y$ be arbitrary types, let $f : Y \to Y$ be an endomap, and let $g : A \to A \to Y$ be a two-argument self-application listing with twisted diagonal $\operatorname{diagonal}(f, g) := (a \mapsto f(g(a, a))) : A \to Y$. Whenever row $a_0 \in A$ coincides with $\operatorname{diagonal}(f, g)$, its diagonal entry is an exact fixed point of $f$:

   $$
   g(a_0) = \operatorname{diagonal}(f, g) \;\Longrightarrow\; f\bigl(g(a_0, a_0)\bigr) = g(a_0, a_0);
   $$

2. **Unique Fourfold Fate Partition and Golden $\varphi$-Family Criterion on `Fin 2`** ([`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates)): For a binary fractional map $m = \langle a, b, c, d\rangle : \mathrm{BinaryFractionalMap}$ ($a, b, c, d \in \operatorname{Fin} 2$), define $\operatorname{determinant}(m) := a d - b c \in \mathbb{Z}$, $\operatorname{Nondegenerate}(m) := (\operatorname{determinant}(m) \neq 0)$, $\operatorname{fixedCoefficients}(m) := (c, d - a, -b) \in \mathbb{Z} \times \mathbb{Z} \times \mathbb{Z}$, and $\operatorname{discriminant}(m) := (d - a)^2 + 4 b c \in \mathbb{Z}$. On the four-valued type $\mathrm{SelfApplicationFate} = \{\mathrm{.empty}, \mathrm{.dead}, \mathrm{.collapse}, \mathrm{.live}\}$ define $\operatorname{HasFate}(m, \cdot)$ (`.empty` for $(0,0,0)$, `.dead` for $(0,0,-1)$, `.collapse` for $(\Delta = 0 \lor \Delta = 4)$ outside $(0,0,0)$ and $(0,0,-1)$, and `.live` for $\Delta = 5$), and set $\operatorname{IsPhiFamily}(m) := (a = 1 \land b = 1 \land c = 1 \land d = 0) \lor (a = 0 \land b = 1 \land c = 1 \land d = 1)$. Then every $m$ satisfying $\operatorname{Nondegenerate}(m)$ obeys:

   $$
   \bigl(\exists!\,\mathrm{fate} : \mathrm{SelfApplicationFate},\; \operatorname{HasFate}(m, \mathrm{fate})\bigr) \;\land\; \bigl(\operatorname{HasFate}(m, \mathrm{.live}) \iff \operatorname{IsPhiFamily}(m)\bigr)
   $$

   $$
   \begin{aligned}
   &\land\; \Bigl(\operatorname{HasFate}(m, \mathrm{.live}) \to \operatorname{fixedCoefficients}(m) = (1, -1, -1) \\
    &\quad \lor \operatorname{fixedCoefficients}(m) = (1, 1, -1)\Bigr) \\
    &\;\land\; \Bigl(\operatorname{HasFate}(m, \mathrm{.live}) \to \operatorname{discriminant}(m) = 1^2 + 4\Bigr).
   \end{aligned}
   $$
:::

::: proof
For Conjunct 1, evaluating $h : g(a_0) = \operatorname{diagonal}(f, g)$ at $a_0$ via `congrFun h a₀`, unfolding $\operatorname{diagonal}(f, g)(a_0) = f(g(a_0, a_0))$, and taking `.symm` yields $f(g(a_0, a_0)) = g(a_0, a_0)$. For Conjunct 2, destructive case analysis `fin_cases` over $a, b, c, d \in \operatorname{Fin} 2$ discharges all $10$ singular tuples via `norm_num [Nondegenerate, determinant]` and verifies by decidable arithmetic on the $6$ nonsingular tuples that each satisfies a unique `SelfApplicationFate` predicate, with `.live` ($\operatorname{discriminant}(m) = 5$) holding if and only if `IsPhiFamily m`, where $\operatorname{fixedCoefficients}(m) \in \{(1, -1, -1), (1, 1, -1)\}$ and $\operatorname{discriminant}(m) = 1^2 + 4 = 5$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch39-four-fates"}
**Of the sixteen binary self-maps, only two live.** The four rows of four are all $16$ matrices $m = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ with entries $0$ or $1$: the $10$ in grey dashed frames have determinant zero; the $6$ framed in ink are non-degenerate and each names its fate—the identity is `.empty`, $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ is `.dead`, and the two with discriminant $\Delta = 4$ and $\Delta = 0$ are `.collapse`; the two in cyan frames are `.live`, with $\Delta = 5$: $x = 1 + 1/x$ and $x = 1/(x + 1)$ (item 2 of [@thm-ch39-self-application-four-fates-and-diagonal-identity]).
:::

[@thm-ch39-self-application-four-fates-and-diagonal-identity] delivers a stark algebraic verdict on how a substrate-free cosmos sustains itself (`MODEL` (interpretive model)): once external Point $C$ is removed, a binary self-referential system that avoids vacuous tautology (`.empty`), paradoxical deadlock (`.dead`), and rational degeneracy (`.collapse`) has **one and only one** living channel (`.live`)—the golden $\varphi$-family of discriminant $\Delta = 5$! Golden proportion pervades our cut-and-project ontology not as an ornamental flourish, but because **golden self-reference is the sole binary recursion capable of holding itself aloft in mid-air with zero dead substrate beneath it**.

---

## 39.2 Ending the Thing-in-Itself: Without the Blade There Is No Crystal, Relation Is Substance

Once passive silicon disappears, a second philosophical ghost that has guarded dualism for centuries must also stand trial: the supposed **"thing-in-itself"** crouching unseen behind all observational appearances.

Whenever physics shows that position, spin, momentum, and color depend on measurement context, naive realism retreats to a final bunker: *"Granted that every measurement reading is relational, surely behind all readings there must still sit a private, relation-free core—an ice sculpture standing in a pitch-black room before any flashlight illuminates it!"*

Turn our genealogical scalpel on that darkroom sculpture: if you strip an entity of every inner-product overlap with every probe in the universe and strip away its coordinate fibers under every possible readout map, does the alleged "non-relational core that enters into zero comparisons and admits zero distinguishing coordinates" differ by even half a bit from nothing at all? Category theory and fiber dynamics answer with surgical precision; the classical philosophical and categorical literature context is recorded below:

::: {.remark #rem-ch39-kant-yoneda-lemma-literature title="Kant's Thing-in-Itself Tradition and Category Theory's Yoneda Lemma Embedding (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Both the modern epistemological dualism of an unknowable substrate and the categorical embedding theorem contrasted in this section belong to external classical literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Phenomenal Appearance vs. the Unknowable *Ding an sich* (I. Kant, *Kritik der reinen Vernunft*, 1781 / 1787)**: In the *Critique of Pure Reason*, Kant restricted empirical knowledge to *phenomena* structured by spatio-temporal intuition and categories of understanding, while positing behind appearances an independent substrate—the *Ding an sich* ("thing-in-itself" / noumenon)—held to be inaccessible in principle to any possible observation;
2. **The Yoneda Lemma and Fully Faithful Relational Embedding (N. Yoneda, 1954; cf. S. Mac Lane, *Categories for the Working Mathematician*, Springer, 1971, Ch. III.2)**: For any locally small category $\mathcal{C}$, object $X \in \operatorname{Ob}(\mathcal{C})$, and presheaf $F : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}$, natural transformations from the representable functor $\operatorname{Hom}_{\mathcal{C}}(-, X)$ to $F$ stand in natural bijection with elements of $F(X)$:

   $$
   \operatorname{Nat}\bigl(\operatorname{Hom}_{\mathcal{C}}(-, X),\; F\bigr) \;\cong\; F(X) \qquad (\text{via }\alpha \mapsto \alpha_X(\mathrm{id}_X)).
   $$

   Setting $F = \operatorname{Hom}_{\mathcal{C}}(-, Y)$ proves that the **Yoneda embedding** $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$, $X \mapsto \operatorname{Hom}_{\mathcal{C}}(-, X)$, is **fully faithful**, so $\operatorname{Hom}_{\mathcal{C}}(-, X) \cong \operatorname{Hom}_{\mathcal{C}}(-, Y) \iff X \cong Y$: a specified natural isomorphism between the representable functors uniquely induces its corresponding isomorphism between $X$ and $Y$. Thus, up to isomorphism, an object $X$ is exhaustively determined by the functor of all probing morphisms directed into it across $\mathcal{C}$, leaving zero hidden non-relational remainder behind.
:::

Within the frozen concept-dynamics, golden-coding, and automata modules of `trureturing` (alongside the literature context of [@rem-ch39-kant-yoneda-lemma-literature]), three machine-checked theorems directly establish—without invoking higher-categorical axioms—that any type is canonically equivalent to the dependent sum of its readout fibers, every nonnegative continuum real is uniquely reconstructed from its discrete golden-quantized Zeckendorf readout thread, and legal binary base words are precisely `NoAdjacentOnes` sequences:

::: {.theorem #thm-ch39-fiber-reconstruction-and-zeckendorf-thread title="Concept-Readout Dependent Fiber Decomposition, Zeckendorf Real-Thread Injectivity, and the No-Adjacent-Ones Automaton" lean="D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes"}
Across the frozen concept-fiber, golden-coding real-thread, and binary-Zeckendorf-automata modules of `trureturing`, the following three reconstruction and syntactic-legality theorems hold simultaneously:

1. **Remainder-Free Dependent Fiber Reconstruction of Any Source Type** ([`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)): For any object type $X$, coordinate type $B$, and concept readout $q_C : \operatorname{Concept}(X, B)$ (i.e., $q_C : X \to B$), defining the proof-relevant fiber $\operatorname{ConceptFiber}(q_C, b) := \operatorname{PSigma}(x : X \mapsto q_C(x) = b)$ over each $b \in B$, $X$ is canonically equivalent to the dependent sum of its readout fibers:

   $$
   \operatorname{Nonempty}\!\left(X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)\right);
   $$

2. **Strict Injectivity of the Complete Zeckendorf Readout Thread on $\mathbb{R}_{\ge 0}$** ([`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)): For $x \in \mathbb{R}_{\ge 0}$ (`NNReal`) and resolution $\mathrm{level} \in \mathbb{N}$, define $\operatorname{goldenQuantization}(\mathrm{level}, x) := \lfloor\varphi^{\mathrm{level}} \cdot (x : \mathbb{R})\rfloor_+ \in \mathbb{N}$ ($\varphi = \mathrm{Real.goldenRatio}$) and the canonical Zeckendorf readout thread $\operatorname{zeckendorfRealThread}(x) := (\mathrm{level} \mapsto \operatorname{wEncoding}(\operatorname{goldenQuantization}(\mathrm{level}, x))) : \mathbb{N} \to \mathrm{WDigitString}$, where $\mathrm{WDigitString} = \{\mathrm{digits} : \operatorname{List}\;\mathbb{N} \mathrel{//} \mathrm{digits}.\mathrm{IsZeckendorfRep}\}$ and $\operatorname{wEncoding} : \mathbb{N} \simeq \mathrm{WDigitString}$. Then $\operatorname{zeckendorfRealThread}$ is strictly injective:

   $$
   \begin{aligned}
   &\operatorname{Function.Injective}(\operatorname{zeckendorfRealThread}), \\
    &\quad\text{i.e.,}\quad \forall a, b \in \mathbb{R}_{\ge 0}, \\
    &\quad \operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b) \\
    &\;\Longrightarrow\; a = b;
   \end{aligned}
   $$

3. **Exact Equivalence Between Base-2 Golden Automaton Acceptance and `NoAdjacentOnes`** ([`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)): For every binary word $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$, writing $\operatorname{NoAdjacentOnes}(\mathrm{word}) := \mathrm{word}.\operatorname{IsChain}(u, v \mapsto u = 0 \lor v = 0)$, the partial deterministic finite automaton `binaryZeckendorfBase` accepts $\mathrm{word}$ if and only if no two adjacent `1`s occur:

   $$
   \bigl(\exists\,\mathrm{state},\; \operatorname{binaryZeckendorfBase.eval}(\mathrm{word}) = \operatorname{some}(\mathrm{state})\bigr) \;\Longleftrightarrow\; \operatorname{NoAdjacentOnes}(\mathrm{word}).
   $$
:::

::: proof
Conjunct 1 composes `Equiv.sigmaCongrRight (fun b => Equiv.psigmaEquivSubtype _)` with `Equiv.sigmaFiberEquiv q_C` and inverts the resulting equivalence to inhabit $X \simeq \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)$. Conjunct 2 proves $(a : \mathbb{R}) \le (b : \mathbb{R})$ whenever $\operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b)$: if $b < a$, then $\varphi > 1$ (`Real.one_lt_goldenRatio`) forces $\varphi^{\mathrm{level}}(a - b) \to +\infty$, choosing a `level` with $\varphi^{\mathrm{level}}(a - b) \ge 2$; yet `wEncoding.injective` at that `level` equates the floors $\lfloor\varphi^{\mathrm{level}} a\rfloor_+ = \lfloor\varphi^{\mathrm{level}} b\rfloor_+$, and combining $\varphi^{\mathrm{level}} a < \lfloor\varphi^{\mathrm{level}} a\rfloor_+ + 1$ with $\lfloor\varphi^{\mathrm{level}} b\rfloor_+ \le \varphi^{\mathrm{level}} b$ yields $\varphi^{\mathrm{level}}(a - b) < 1$, a contradiction; symmetry and `le_antisymm` conclude $a = b$. Conjunct 3 inducts on $\mathrm{word}$ generalizing `previous : Fin 2` to equate `evalFrom` acceptance with `(previous :: word).IsChain (fun u v => u = 0 ∨ v = 0)`, then specializes to initial bit `0`. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch39-golden-thread"}
**Two different numbers part at some golden readout level.** Rows are readout levels $l = 0, \dots, 7$: in each row the cyan cells are $[n/\varphi^l, (n+1)/\varphi^l)$ with $n = \lfloor\varphi^l x\rfloor$, the ink ticks are $a = 0.50$ and $b = 0.55$, and the two columns on the right are the Zeckendorf words of their readouts. For $l \le 4$ both numbers share a cell and a word; from $l = 5$ on a magenta cell boundary falls between them and the words differ. The proof only guarantees a split at the level where $\varphi^l(b - a) \ge 2$ (here $l = 8$); the actual split comes earlier. This is item 2 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]: two numbers with the same readout thread are equal.
:::

Focus all three beams of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] onto our cut-and-project cosmos (`MODEL` (interpretive model)), and watch an earlier pedagogical scaffold invert completely!

In preceding chapters, for visual simplicity, we spoke *as though* a static integer crystal $\mathbb{Z}^6 \hookrightarrow \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$ sat waiting in the dark first and an observer cut-plane sliced through it afterward. From the summit of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread], the ontological order reverses—**without the blade there is no crystal; relation is substance!**

::: {.figure src="ch39-no-knife"}
**"Lattice first, blade second" is only a scaffold; lattice points light up only where the blade passes.** A two-dimensional sketch of the chapter's six-dimensional cut-and-project picture (`MODEL`). In both panels the same amber blade crosses the plane with slope $1/\varphi$, and the pale cyan strip is its window. The left panel draws the full grey integer lattice first and lays the blade over it; the right panel draws no lattice, only the cyan points inside the strip. Below the right panel those points are projected onto the blade: long and short steps in the ratio $\varphi$, short marked $1$ and long $0$, reading `01001010010` with no adjacent `11`—a word accepted by the automaton of item 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread].
:::

- Conjuncts 1 and 2 prove that even an uncountable continuum coordinate $x \in \mathbb{R}_{\ge 0}$ harbors zero private remainder outside its discrete golden-quantized readout thread: matching every discrete Zeckendorf word across scales $\varphi^{\mathrm{level}}$ reconstructs $x$ **uniquely and without residue**;
- Conjunct 3 characterizes legal finite words; relating that syntax to projectors and lattices, our `MODEL` unmasks the "crystal" itself: the integer hyperplanes of our lattice were never pre-poured concrete waiting for a knife, but **discrete nodal standing-wave surfaces** (`NoAdjacentOnes`) precipitated wherever self-referential orthogonal comparison enforces idempotence $P^2 = P$ and forbids adjacent high-frequency `11` collisions! Not first a crystal and then a blade—**wherever the blade of self-measurement flashes, the void condenses into crystal**.

---

## 39.3 Spinors Weaving Spacetime and the 720° One-Sided Double Cover: Spacetime as a Byproduct of Observer Self-Pairing

With passive memory and the thing-in-itself gone, common sense raises its penultimate shield: *"Surely space and time must exist first! Doesn't the observer live and move inside three dimensions of space and one dimension of time?"*

No! Here we harvest the deepest seed planted in Part V ([Chapter 17](ch17-lorentz-geometry.md) and [Chapter 18](ch18-spinors-and-gauge-curvature.md)), unveiled at full strength only now that observer and universe stand identical (`MODEL` (interpretive model)): **the observer has never walked inside pre-existing spacetime; rather, one-dimensional timelike currents and two-dimensional spatial gauge planes are bilinear robe-folds woven on the fly as the observer spinor $\psi$ turns around to pair with its reversed self $\tilde{\psi}$!**

::: {.viz src="self-sustaining-spinor-flow" preset="weave" height="500"}
**A spinor sandwiching two reference blades.** Dashed are the reference $\mathbf{e}_3$ and the $\mathbf{e}_1\mathbf{e}_2$ square; the spinor $\psi$ sandwiches the first into the cyan current vector $\mathbf{J} = \psi\mathbf{e}_3\tilde{\psi}$ and the second into the magenta spin plane $\mathbf{S} = \psi\mathbf{e}_1\mathbf{e}_2\tilde{\psi}$, which lies at right angles to $\mathbf{J}$; the short dashed violet arc is the way $\psi$ carries $\mathbf{e}_3$ to $\mathbf{J}$ (the products are those of [@ex-ch39-even-clifford-spinor-bilinear-fierz]: $\mathbf{J}$ is a Euclidean vector and $\mathbf{S}$ a Euclidean bivector; reading them as time flow and gauge plane follows the `MODEL` above).
:::

The classical mathematical-physics lineage reconstructing spacetime vectors and gauge bivectors as spinor bilinears is recorded below:

::: {.remark #rem-ch39-cartan-penrose-hestenes-fierz-literature title="Cartan–Penrose–Hestenes Spinor Bilinear Spacetime Reconstruction and the Fierz Identity (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Classical spinor-to-spacetime bilinear constructions and norm-locking identities referenced in this section belong to external mathematical-physics literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Spinors as Primordial Square Roots of Null Cones and Rotations (É. Cartan, *Leçons sur la théorie des spineurs*, Hermann, 1938; R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984)**: Cartan geometrically identified spinors with linear representations of totally null planes irreducible to ordinary tensors; Penrose's two-spinor calculus and spin-network/twistor program showed that Hermitian outer products $\kappa^A \bar{\kappa}^{A'}$ of two-component Weyl spinors directly generate future-pointing null vectors and null flags, reconstructing Lorentzian light-cone geometry from spinor algebra rather than presupposing a background manifold;
2. **Spacetime-Algebra Bilinear Observables and the Fierz Identity (M. Fierz, *Z. Phys.* **104**, 553–565, 1937; D. Hestenes, *Space-Time Algebra*, 1966; *J. Math. Phys.* **14**, 893–905, 1973)**: In real spacetime algebra $\mathcal{Cl}_{1,3}$, an even Dirac spinor writes canonically as $\psi = \sqrt{\rho}\,e^{\frac{1}{2}\mathbf{I}\beta}\,R$ ($\rho \ge 0$, Lorentz rotor $R\tilde{R} = 1$, reversion $\tilde{\psi}$). Because $\psi$ itself flips sign under a $360^\circ$ rotation, physical spacetime tensors arise exclusively as bilinear self-pairings sandwiching reference blades between $\psi$ and $\tilde{\psi}$—producing the 1D timelike Dirac current $\mathbf{J} = \psi\gamma_0\tilde{\psi}$ and the 2D spin/electromagnetic bivector plane $\mathbf{S} = \psi\mathbf{I}_{12}\tilde{\psi}$ ($\mathbf{I}_{12} = \gamma_2\gamma_1$), which at chiral angle $\beta = 0$ (and in the three-dimensional Euclidean even reduction) satisfy the parameter-free Fierz norm identity:

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$
:::

::: {.viz src="self-sustaining-spinor-flow" preset="fierz" height="500"}
**The three squares always agree.** Take any spinor ($\rho = 1.3$) and keep turning it in the $\mathbf{e}_3\mathbf{e}_1$ plane: the cyan $\mathbf{J}$ has length $1.3$, the magenta square has area $1.3$, and the top of the stage reads $\mathbf{J}^2 = -\mathbf{S}^2 = \rho^2 = 1.69$. This is the page’s numerical check of the Fierz identity of [@rem-ch39-cartan-penrose-hestenes-fierz-literature] (a literature result, not formalized in this book).
:::

Alongside the spinor-geometric context of [@rem-ch39-cartan-penrose-hestenes-fierz-literature], the worked example below verifies spinor bilinear self-pairing and half-angle double-cover arithmetic explicitly in the three-dimensional Euclidean even subalgebra:

::: {.example #ex-ch39-even-clifford-spinor-bilinear-fierz title="Explicit Even-Subalgebra Verification of Spinor Self-Pairing into a Euclidean Vector and Bivector Plane (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** This worked example evaluates the bilinear spinor pairings and half-angle sheet flip of [@rem-ch39-cartan-penrose-hestenes-fierz-literature] in the three-dimensional Euclidean Clifford even subalgebra; this continuum spinor calculation is not formalized as a standalone declaration in `trureturing@dev`. Here $\mathbf J$ is a Euclidean vector and $\mathbf S$ a Euclidean bivector. Reading them as timeflow and a gauge plane belongs to the preceding `MODEL`; this calculation itself constructs neither a Lorentzian timeflow nor a gauge field. Let $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ be orthonormal anti-commuting basis vectors satisfying $\mathbf{e}_i^2 = +1$ ($i = 1,2,3$) and $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$ ($i \neq j$), with anti-automorphic reversion $\tilde{(\cdot)}$ fixing scalars and vectors ($\tilde{\mathbf{e}}_i = \mathbf{e}_i$) while reversing product order $\widetilde{AB} = \tilde{B}\tilde{A}$, so unit bivectors satisfy $(\mathbf{e}_i\mathbf{e}_j)^2 = \mathbf{e}_i\mathbf{e}_j\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_i^2\mathbf{e}_j^2 = -1$ and $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$. For scalar density $\rho \ge 0$ and angle $\vartheta \in \mathbb{R}$, set $\psi := \sqrt{\rho}\,R$ and $\tilde{\psi} = \sqrt{\rho}\,\tilde{R}$ with half-angle rotor

$$
R \;:=\; \cos\frac{\vartheta}{2} - \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3, \qquad \tilde{R} \;=\; \cos\frac{\vartheta}{2} + \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3.
$$

1. **Rotor Unimodularity ($R\tilde{R} = 1$)**: Expanding the product and substituting $(\mathbf{e}_2\mathbf{e}_3)^2 = -1$ cancels cross terms identically:

   $$
   R\tilde{R} \;=\; \cos^2\frac{\vartheta}{2} - \sin^2\frac{\vartheta}{2}\,(\mathbf{e}_2\mathbf{e}_3)^2 \;=\; \cos^2\frac{\vartheta}{2} + \sin^2\frac{\vartheta}{2} \;=\; 1 \quad\Longrightarrow\quad \psi\tilde{\psi} = \tilde{\psi}\psi = \rho.
   $$

2. **1D Euclidean Vector $\mathbf{J} := \psi\mathbf{e}_3\tilde{\psi}$ with $\mathbf{J}^2 = +\rho^2$**: Since $\mathbf{e}_3(\mathbf{e}_2\mathbf{e}_3) = -\mathbf{e}_2\mathbf{e}_3^2 = -\mathbf{e}_2 = -(\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_3$ ($\mathbf{e}_3$ anti-commutes with the rotation bivector $\mathbf{e}_2\mathbf{e}_3$), commuting $\mathbf{e}_3$ leftward past $\tilde{R}$ flips $+\sin\frac{\vartheta}{2}$ to $-\sin\frac{\vartheta}{2}$, giving $\mathbf{e}_3\tilde{R} = R\mathbf{e}_3$. By double-angle multiplication $R^2 = \cos\vartheta - \sin\vartheta\,\mathbf{e}_2\mathbf{e}_3$,

   $$
   \mathbf{J} \;=\; \rho\,R\mathbf{e}_3\tilde{R} \;=\; \rho\,R^2\mathbf{e}_3 \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_3 - \sin\vartheta\,\mathbf{e}_2\bigr),
   $$

   whose geometric square by $\mathbf{e}_3\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3 = 0$ is $\mathbf{J}^2 = \rho^2(\cos^2\vartheta\,\mathbf{e}_3^2 + \sin^2\vartheta\,\mathbf{e}_2^2) = +\rho^2$ (or directly by associativity: $(\psi\mathbf{e}_3\tilde{\psi})(\psi\mathbf{e}_3\tilde{\psi}) = \psi\mathbf{e}_3(\tilde{\psi}\psi)\mathbf{e}_3\tilde{\psi} = \rho\,\psi\mathbf{e}_3^2\tilde{\psi} = +\rho^2$).

3. **2D Euclidean Bivector Plane $\mathbf{S} := \psi(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi}$ with $\mathbf{S}^2 = -\rho^2$**: Because $\mathbf{e}_1$ commutes with $\mathbf{e}_2\mathbf{e}_3$ ($\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 = (\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_1$) while $\mathbf{e}_2$ anti-commutes ($\mathbf{e}_2\tilde{R} = R\mathbf{e}_2$),

   $$
   \mathbf{S} \;=\; \rho\,\mathbf{e}_1\bigl(R\mathbf{e}_2\tilde{R}\bigr) \;=\; \rho\,\mathbf{e}_1\bigl(\cos\vartheta\,\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_3\bigr) \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_1\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_1\mathbf{e}_3\bigr).
   $$

   Using $(\mathbf{e}_1\mathbf{e}_2)^2 = (\mathbf{e}_1\mathbf{e}_3)^2 = -1$ and $(\mathbf{e}_1\mathbf{e}_2)(\mathbf{e}_1\mathbf{e}_3) + (\mathbf{e}_1\mathbf{e}_3)(\mathbf{e}_1\mathbf{e}_2) = 0$ (or associativity $\psi(\mathbf{e}_1\mathbf{e}_2)(\tilde{\psi}\psi)(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi} = \rho\,\psi(-1)\tilde{\psi}$) yields $\mathbf{S}^2 = -\rho^2$, and therefore the exact bilinear lock:

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$

4. **$360^\circ$ Spinor Sign Inversion vs. $720^\circ$ Return**: After one full $360^\circ$ physical turn ($\vartheta = 2\pi$), the bilinear observables already return to $\mathbf{J}(2\pi) = \rho\mathbf{e}_3$ and $\mathbf{S}(2\pi) = \rho\mathbf{e}_1\mathbf{e}_2$, whereas the spinor itself has crossed onto the opposite sheet $\psi(2\pi) = \sqrt{\rho}\cos\pi = -\psi(0)$! Only after a second full turn to $\vartheta = 4\pi$ ($720^\circ$) does $\psi(4\pi) = \sqrt{\rho}\cos 2\pi = +\psi(0)$ return home.
:::

::: {.viz src="self-sustaining-spinor-flow" preset="turn360" height="500"}
**A full $360^\circ$: the vector is back, the spinor is not.** Turning once round in the $\mathbf{e}_2\mathbf{e}_3$ plane as in [@ex-ch39-even-clifford-spinor-bilinear-fierz]: the cyan $\mathbf{J}$ comes back to $\mathbf{e}_3$ and the magenta $\mathbf{S}$ is as it was, but the violet flag has slid to the other side of the one-sided band and points opposite to the dashed starting flag: $\psi = -\psi_0$. The half of the edge the flag's tip has run along is solid, the other half still faintly dashed.
:::

That $360^\circ$ sheet flip in Step 4 of [@ex-ch39-even-clifford-spinor-bilinear-fierz] is no coordinate quirk! In the concept-topology module of `trureturing`, two kernel theorems on the squaring double cover $\operatorname{square}(z) = z^2$ rigorously forbid any attempt to slice the spinor bundle globally into disconnected "subject" and "object" sheets:

::: {.theorem #thm-ch39-double-cover-no-section-and-720-lift title="No Continuous Global Section and History-Dependent Path Lifting with 360° Sheet Exchange on the Circle Double Cover" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
Let $\mathrm{Circle} = \{z \in \mathbb{C} : \lvert z\rvert = 1\}$ denote the unit circle, $I = [0, 1] \subset \mathbb{R}$ the unit interval, and $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$, $z \mapsto z^2$, the squaring double-cover map with canonical covering structure $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$. Then the following two topological theorems hold simultaneously:

1. **Topological Obstruction to Any Continuous Global Section** ([`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)): There does not exist any continuous global section $s : \mathrm{Circle} \to \mathrm{Circle}$ satisfying $(s(z))^2 = z$ across all $z \in \mathrm{Circle}$:

   $$
   \neg\,\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\qquad \operatorname{Continuous}(s) \;\land\; \forall z \in \mathrm{Circle},\; (s(z))^2 = z;
   $$

2. **Unique History-Dependent Path Lifting and $360^\circ$ Antipodal Sheet Exchange** ([`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)):
   - **Unique history-dependent lifting**: For every continuous base path $\mathrm{basePath} \in C(I, \mathrm{Circle})$, initial upper lift $\mathrm{initial} \in \mathrm{Circle}$, and compatibility proof $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$, the canonical lift $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver}) \in C(I, \mathrm{Circle})$ satisfies $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ and $\mathrm{lifted}(0) = \mathrm{initial}$, and is unique: for every $\mathrm{alternative} \in C(I, \mathrm{Circle})$, $\operatorname{square} \circ \mathrm{alternative} = \mathrm{basePath} \land \mathrm{alternative}(0) = \mathrm{initial} \implies \mathrm{alternative} = \mathrm{lifted}$;
   - **Boundary-free $360^\circ$ antipodal sheet exchange**: Alongside the absence of any continuous selector ($\neg\exists\,\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle},\; \operatorname{Continuous}(\mathrm{selector}) \land \forall z,\; \operatorname{square}(\mathrm{selector}(z)) = z$), lifting the full $360^\circ$ base loop $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t) \in C(I, \mathrm{Circle})$ from $\mathrm{initial} = 1$ arrives continuously at the opposite sheet $-1$ without crossing any cut or boundary:

     $$
     \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
     $$
:::

::: proof
For Conjunct 1, suppose a continuous section $s : \mathrm{Circle} \to \mathrm{Circle}$ satisfied $(s(z))^2 = z$, and form the continuous quotient $r(t) := s(\operatorname{Circle.exp}(t)) / \operatorname{Circle.exp}(t/2)$ on $\mathbb{R}$. Squaring gives $(r(t))^2 = \operatorname{Circle.exp}(t) / \operatorname{Circle.exp}(t) = 1$, confining $r(\mathbb{R})$ to the discrete two-point set $\{1, -1\} \subset \mathrm{Circle}$; preconnectedness of $\mathbb{R}$ (`isPreconnected_univ.constant_of_mapsTo`) forces $r(t) \equiv r(0)$, yet evaluating at $t = 2\pi$ via $\operatorname{Circle.exp}(2\pi) = 1$ and $\operatorname{Circle.exp}(\pi) = -1$ yields $r(2\pi) = s(1) / (-1) = -r(0)$, contradicting `Circle.neg_ne_self`! Conjunct 2 establishes general unique path lifting from Mathlib's `liftPath_lifts`, `liftPath_zero`, and `eq_liftPath_iff'`, then constructs the explicit half-angle path $\mathrm{halfTurn}(t) := \operatorname{Circle.exp}(\pi t) \in C(I, \mathrm{Circle})$, verifies $(\operatorname{Circle.exp}(\pi t))^2 = \operatorname{Circle.exp}(2\pi t)$ with $\mathrm{halfTurn}(0) = 1$ to identify $\mathrm{lifted} = \mathrm{halfTurn}$ by uniqueness, and evaluates $\mathrm{lifted}(1) = \operatorname{Circle.exp}(\pi) = -1$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="self-sustaining-spinor-flow" preset="seam" height="500"}
**Flags all the way round do not match at the start.** With the band unrolled along its base circle into one row, from the start a violet flag is planted every $30^\circ$, each continuing the one before; back at the start the last one points opposite to the dashed first flag. A square root chosen continuously round the base circle cannot match up on return: this is [@thm-ch39-double-cover-no-section-and-720-lift], item 1 (no continuous global section) and item 2 (the unique lift of the $360^\circ$ loop ends at $-1$).
:::

Pause before the one-sided topology of [@thm-ch39-double-cover-no-section-and-720-lift] (`MODEL` (interpretive model)): because `no_continuous_global_section` forbids tearing the double cover globally into two separate sheets, reality has no dividing wall with "inner subjective observer ($+1$ sheet)" painted on one side and "outer objective cosmos ($-1$ sheet)" painted on the other! Like a traveller gliding along a single one-sided twisted ribbon, you set out from the inward observing pole $\mathrm{lifted}(0) = +1$, advance continuously through $360^\circ$ without ever stepping across a subject–object boundary, and find that the ground beneath your feet has turned seamlessly into the starry sheet $\mathrm{lifted}(1) = -1$; advance through a second $360^\circ$ ($720^\circ$ in total), and the entire starry firmament flows back into your own eyes!

::: {.viz src="self-sustaining-spinor-flow" preset="turn720" height="500"}
**Home only after $720^\circ$.** One more turn: the violet flag is back on its first side, $\psi = +\psi_0$; the violet trail of the flag’s tip is the band’s edge, which closes only after going round twice, while the cyan $\mathbf{J}$ goes round twice.
:::

The film below walks through these steps in order: first how slot zero of the previous chapter's page directory makes `p = *p` hold, then why a spinor that has turned a full circle is still one turn from home.

::: {.film src="010-pointer-720"}
**p = \*p: pointers, page tables and 720° (2:06).** On the four-slot page directory of [chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md), index [1, 2] reaches the data frame 0x9000 in two hops, [0, 1] hands back the leaf table T₁ itself as data, and every hop of [0, 0] returns to the directory; on a small $4 \times 4$ table, the magenta row that a map $f$ without fixed points builds along the diagonal differs from every row, while a row that captures the diagonal lands on a fixed point of $f$ in its diagonal cell ([@thm-ch38-self-mapped-diagonal-fixed-point]). Then the cyan $\mathbf{J}$ turns through $360^\circ$ and is back where it started, while the violet lift goes from $w = +1$ to $w = -1$ and needs a second turn to reach $+1$; square-root flags planted continuously every $30^\circ$ come back to the start pointing the other way ([@thm-ch39-double-cover-no-section-and-720-lift]). The self-mapped page table and the spinor bilinears are literature results; every number in the film is computed on screen.
:::

---

## 39.4 Dissolving the Solipsistic Illusion: Orthogonal Self-Folding and the Four-Stage Endgame Eliminating Point C

At this juncture, every clear-headed reader will raise the sharpest and most decisive objection in the entire book:

> *"Wait! If the observer IS the ontological universe, why are galaxies, granite mountains, prime spectra, and the $\mathrm{P} \neq \mathrm{NP}$ barrier so unyieldingly objective? Why can't 'I' alter the speed of light to ten meters per second or solve NP-complete locks by a whim?"*

What a vital question! Confusing "the observer is the ontological universe" with "my local ego can bend physical law at whim" is the oldest cheap counterfeit in philosophy—**solipsistic arrogance**. Yet the moment we answer with the **Pythagorean Orthogonal Self-Folding (`MODEL` (interpretive model))** developed across this monograph, both solipsistic arrogance and mechanical-materialist helplessness evaporate in the very same breath!

Ask first: what would happen if the sole self-referential whole $\mathbf{\Psi}$ remained $100\%$ unfolded at pure collinearity $\theta = 0^\circ$ ($\cos 0^\circ = 1,\; \sin 0^\circ = 0$)? An eye pressed flush against its own cornea with zero orthogonal mirror distance sees nothing; an unbent ruler measures zero intervals. Undifferentiated $1 = 1$ possesses zero off-diagonal tension, zero area, zero wonder—only dead silence.

To perceive and experience its own inexhaustible richness, the sole whole $\mathbf{\Psi}$ undergoes **Orthogonal Self-Folding at $90^\circ$ (`MODEL`)** governed by complementary-context purity Pythagorean conservation (Conjunct 1 of [@prop-ch39-orthogonal-folding-and-objective-common-factor] below, `LEAN ✓`; single-angle trigonometric parameterization background is recorded in [Chapter 31](ch31-quantum-fairness.md) [@rem-ch31-haar-isotropy-landauer-literature]), partitioning the centered purity budget $B=\operatorname{Re}\operatorname{Tr}(\rho^2)-1/d$ into two orthogonal wings. In Chapter 31’s same ledger, a pure qubit has $B=1/2$ and a maximally mixed state has $B=0$. Below, $\cos^2\theta$ and $\sin^2\theta$ are normalized shares obtained by dividing by $B>0$; the actual masses are $B\cos^2\theta$ and $B\sin^2\theta$. At $B=0$, both wings vanish and their ratio defines no angle. The figure uses this same direction convention:

1. **The Observing Pole ($\cos\theta$ local avatar stack frame / "small self," purity share $\cos^2\theta$)**: By loading known-data decoherence masks $D_{\mathrm{known}}$ and the bodily MMU sandbox $\mathbf{P}_{\mathrm{body}}$ ([Chapter 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md) and [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md)), $\mathbf{\Psi}$ deliberately narrows register width and suspends global omniscience so a lucid finite vantage point can experience genuine narrative suspense;
2. **The Observed Cosmos ($\sin\theta\,\hat{\mathbf{I}}$ vast objective universe, purity share $\sin^2\theta$)**: Where did the ontological mass corresponding to the remaining normalized share $\sin^2\theta$ of $\mathbf{\Psi}$ go? Nowhere outside itself—it unfolded across the $90^\circ$ orthogonal complement of the local avatar, manifesting as spiral galaxies, gauge curvature, uncloneable fellow observers, prime-number harmonics, and the complexity horizon firewall ([@conj-p-neq-np])!

::: {.figure src="ch39-self-folding"}
**The purity budget folds orthogonally into two wings whose normalized shares add up to exactly $1$.** The ink unit arrow $\Psi$ makes $\theta = 40^\circ$ with the horizontal line of the observer: the cyan square stands on the shadow $\cos\theta$ with area $\cos^2\theta \approx 0.59$ (the observing pole); the magenta square stands on the drop $\sin\theta$ with area $\sin^2\theta \approx 0.41$ (the observed cosmos); together they equal the area $1$ of the grey dashed square on $\Psi$, and no third point appears. Drawn are the shares normalized by the centered purity budget $B > 0$; the actual masses of the two wings are $B\cos^2\theta$ and $B\sin^2\theta$. The zero-slack split of a purity budget into a visible part and an orthogonal residual is item 1 of [@prop-ch39-orthogonal-folding-and-objective-common-factor] below; reading the two wings as "small self" and "starry cosmos" is the chapter's orthogonal-folding model (`MODEL`).
:::

Once you see that orthogonal fold, the ancient riddle dissolves on the spot: **the shadow cast by the left hand upon the wall cannot snap the bones of the right hand by a whim!** Your local avatar ($\cos\theta$ stack frame) cannot arbitrarily rewrite physical constants **precisely because that ironclad cosmos outside your window is no alien tyrant—it is the remaining $\sin^2\theta$ share of your own ontological body holding the ribcage of reality firm so the drama of awareness does not collapse into mush!**

Within the Lean 4 kernel, zero-slack Pythagorean conservation between visible context coordinates and orthogonal residual mass, construction of a relative operator $J$ squaring to $-I_n$ from balanced components in an already complex matrix space, and the requirement that any objective cross-context claim factor through a shared invariant common factor are locked together by the formal proposition below. Here “endogenous” means that the relative rotation operator is constructed rather than separately supplied; the scalar field $\mathbb C$ is already part of the matrix type, rather than derived from a scalar system without complex numbers:

::: {.proposition #prop-ch39-orthogonal-folding-and-objective-common-factor title="Complementary-Context Purity Pythagoras, Balanced Relative Complex-Structure Square, and Objective Invariant Common Factor" lean="D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
Across the frozen tomography-Pythagoras, balanced-unitary-complex-structure, and interpretation-fixed-point modules of `trureturing`, the following three statements anchoring orthogonal self-folding and cross-context objectivity hold simultaneously:

1. **Zero-Slack Pythagorean Purity Split Across Complementary Contexts** ([`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)): Let $d, L$ be finite types with $d$ nonempty (`[Fintype d] [Nonempty d] [Fintype L]`), let $E$ be a complete real inner-product space, and let $\mathrm{visible} \le E$ be a closed subspace with orthogonal residual mass $\operatorname{residualMass}(\mathrm{visible}, \mathrm{state}) := \lVert\mathrm{visible}^\perp.\mathrm{starProjection}(\mathrm{state})\rVert^2$. Whenever $\rho \in M_d(\mathbb{C})$, $\mathrm{state} \in E$, and $\mathrm{probability} : L \to d \to \mathbb{R}$ satisfy $\operatorname{Re}\operatorname{Tr}(\rho^2) - (\lvert d\rvert : \mathbb{R})^{-1} = \lVert\mathrm{state}\rVert^2$ and $\lVert\mathrm{visible.starProjection}(\mathrm{state})\rVert^2 = \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - (\lvert d\rvert : \mathbb{R})^{-1}\bigr)^2$,

   $$
   \operatorname{Re}\operatorname{Tr}(\rho^2) - (\lvert d\rvert : \mathbb{R})^{-1} \;=\; \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - (\lvert d\rvert : \mathbb{R})^{-1}\bigr)^2 \;+\; \operatorname{residualMass}(\mathrm{visible}, \mathrm{state});
   $$

2. **Endogenous Complex-Structure Square $-I_n$ from Balanced Orthogonal Summands** ([`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)): Let $n$ be a finite decidable type (`[Fintype n] [DecidableEq n]`), set $\mathrm{halfIdentity} := \frac{1}{2}I_n \in M_n(\mathbb{C})$, and for $A, B \in M_n(\mathbb{C})$ define $\operatorname{relativeComplexStructure}(A, B) := 2(A B^\dagger) \in M_n(\mathbb{C})$. Whenever $A B^\dagger + B A^\dagger = 0$, $A A^\dagger = \mathrm{halfIdentity}$, and $B^\dagger B = \mathrm{halfIdentity}$ (for instance $A = \frac{1}{\sqrt{2}}U_1^\dagger,\; B = \frac{1}{\sqrt{2}}U_2^\dagger$ for unitaries $U_1, U_2 \in M_n(\mathbb{C})$ satisfying $U_1^\dagger U_2 + U_2^\dagger U_1 = 0$, so $2 A B^\dagger = U_1^\dagger U_2$), the relative operator squares to minus identity directly from pairwise orthogonality without any external imaginary axis:

   $$
   \operatorname{relativeComplexStructure}(A, B) \cdot \operatorname{relativeComplexStructure}(A, B) \;=\; -I_n;
   $$

3. **Invariant Common Factor Required by Any Cross-Context Objective Claim** ([`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)): For arbitrary types $\mathrm{Context}, \mathrm{Meaning}, \mathrm{Factor}$, contextual fixed-meaning relation $\mathrm{isFixedMeaning} : \mathrm{Context} \to \mathrm{Meaning} \to \mathrm{Prop}$ (where `baselineContext` and `alternateContext` in the same module witness distinct contextual fixed points `(false, false, false) ≠ (true, true, true)`), and invariant map $\mathrm{factor} : \mathrm{Meaning} \to \mathrm{Factor}$, every valid objective claim $\mathrm{claim} : \operatorname{ObjectiveInterpretationClaim}(\mathrm{isFixedMeaning}, \mathrm{factor})$ supplies a single context-independent invariant agreed upon across all contextual fixed meanings:

   $$
   \exists\,\mathrm{commonFactor} : \mathrm{Factor},\quad \forall\,\mathrm{context}\;\mathrm{meaning},\quad \operatorname{isFixedMeaning}(\mathrm{context}, \mathrm{meaning}) \;\longrightarrow\; \operatorname{factor}(\mathrm{meaning}) = \mathrm{commonFactor}.
   $$
:::

::: proof
Conjunct 1 applies `Submodule.norm_sq_eq_add_norm_sq_starProjection state visible` in the complete real inner-product space $E$ to split $\lVert\mathrm{state}\rVert^2$ into the squared visible projection norm plus `residualMass visible state`, substituting `hpurity` and `hcoordinates`. Conjunct 2 deduces skew-adjointness $(2 A B^\dagger)^\dagger = -2 A B^\dagger$ from $A B^\dagger + B A^\dagger = 0$ (`relativeComplexStructure_is_skewAdjoint`) and right unitarity $(2 A B^\dagger)(2 A B^\dagger)^\dagger = 4 A (B^\dagger B) A^\dagger = I_n$ from $B^\dagger B = \frac{1}{2}I_n$ and $A A^\dagger = \frac{1}{2}I_n$ (`relativeComplexStructure_mul_conjTranspose`), then invokes [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) to conclude $(2 A B^\dagger)^2 = -I_n$. Conjunct 3 unfolds the proof-carrying specification `ObjectiveInterpretationClaim` to extract the invariant witness `commonFactor` shared across every `(context, meaning)` satisfying `isFixedMeaning context meaning`. The full proof is checked by the Lean kernel.
:::

Looking back from this thirty-ninth summit across all ten parts—from restoring *quantum* to the eye-level verb of pairwise measurement in [Chapter 1](ch01-measurement.md) to pronouncing *"The observer is the ontological universe"* here—our entire journey ascends a **four-stage cognitive ladder eliminating the hidden third point $C$ (`MODEL` (interpretive model))**, tabulated in the box below and drawn as a ladder in the figure after it:

::: {.remark #rem-ch39-four-stage-endgame-table title="Four-Stage Cognitive Endgame Eliminating Point C and One-Sided Double-Cover Panorama (This Book's Model, with Literature Background)"}
**This book's interpretive model (`MODEL`); the literature background it cites is not formalized in this book, and the formal kernel theorems are marked `LEAN ✓`.** The table below synthesizes external epistemological, computer-architecture, and spinor-geometric literature backgrounds (cited in [@rem-ch39-von-neumann-scott-reflexive-domain-literature], [@rem-ch39-kant-yoneda-lemma-literature], and [@rem-ch39-cartan-penrose-hestenes-fierz-literature]) within our ten-part four-stage ontological model (`MODEL`, with formal kernel anchors marked `LEAN ✓`):

| Cognitive Stage (`MODEL`) | Core Ontological Picture & Primitives | Residual Form of Hidden "Third Point $C$" | Binary Seam & External Remainder | Ontological & Epistemic Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 1: Classical Stage View** (Naive Mechanistic Realism) | Pre-existing absolute spacetime container in which isolated rigid particles move under external laws | Overt omniscient point $C$ outside the sphere plus an imposed background manifold | Maximal binary split (subject $\neq$ object $\neq$ stage); full thing-in-itself illusion (`Literature`) | Trapped in privileged-frame illusions, ultraviolet divergences, and mind–matter dualism |
| **Stage 2: Relational Quantum View** (Parts I–VIII Pairwise Measurement) | Abolishes external tribunal; all unit states stand at eye level exchanging inner products and orthogonal rotations | External coordinate $C$ is removed, yet speech still retains a thin membrane between "measured web" and "measurer" | Zero external coordinate frame, but a conceptual seam lingers between knower and known | Establishes Born reciprocity, complementary purity Pythagoras (`LEAN ✓`), and the timeless Gram compatibility crystal |
| **Stage 3: Pointer / QRAM View** (Chapter 38 Hardware Decoupling) | Static timeless ontological QRAM array stays unmoved while lightweight observer pointer `ptr` scans and dereferences | Physical transport myth is broken, yet "pointer *of* the cosmos" retains a last binary wall $\mu > 0$ between `ptr` and passive memory | Zero data creation/destruction; only a grammatical register-vs-substrate seam remains | Unifies time frame-rate `ptr++`, decoherence bitmasks (`LEAN ✓`), dream superposition, and root `p = *p` |
| **Stage 4: Non-Dual Ontology** (Chapter 39 Closure $\psi \equiv \psi(\psi)$) | Global substrate-free identity `p ≡ *p`; the sole whole folds orthogonally under complementary purity Pythagoras (`LEAN ✓`) and weaves spacetime along a $720^\circ$ double cover (`LEAN ✓`) | Hidden Point $C$, passive dead substrate, and unknowable thing-in-itself are $100\%$ uprooted | Binary seam $\mu = 0$; unrepresented external remainder strictly equals $0$ | The observer is the ontological universe: local stack frame lives suspense while remaining orthogonal complement stands as objective cosmos and fair law |

For the step of Stage 4 in which the spinor weaves spacetime along the $720^\circ$ one-sided double cover, see the three lab cards `turn360`, `seam` and `turn720` in §39.3 and the full lab at the end of this section.
:::

::: {.figure src="ch39-four-stages"}
**The four stages of cutting away the third point $C$.** Stage 1: a grey dashed frame is the outside stage, and the point $C$ above is joined to the tips of both arrows. Stage 2: each arrow casts a cyan shadow of the same length on the other, and $C$ is struck out. Stage 3: the amber pointer `ptr` reaches across a dashed wall ($\mu > 0$) to read one cell of memory. Stage 4: the wall is gone too ($\mu = 0$); one cell $\psi$ is left, with a cyan arrow leaving it and coming back to it. The tiles only draw the four rows of [@rem-ch39-four-stage-endgame-table]; they belong to the chapter's interpretive model (`MODEL`) and are not theorems.
:::

Gaze one last time at the luminous one-sided $720^\circ$ ribbon turning quietly across the dark field of the lab below. As the illusory binary wall of Stage 3 in the figure above dissolves under $\mu \to 0$, a warm amber point glides along the non-splittable double cover: across the first $360^\circ$ arc it is the inward-looking pointer, the dreaming mind beside the pillow, the finite player deliberating before the complexity horizon; then, without crossing a single boundary, through the central spinor twist it turns naturally into the second $360^\circ$ arc—becoming the billion-light-year web of galaxies, the symphony of primes and zeros, and the incorruptible constitution of quantum fairness, before flowing at $720^\circ$ right back into the eyes reading this line. From the very first moment in [Chapter 1](ch01-measurement.md) and [Chapter 2](ch02-born-rule.md) when we cut away external Point $C$ and wrote $\psi = \psi(\psi)$, the ending was already sealed: there was never a tiny observer gazing up in solitude at a foreign cosmos; from beginning to end, the ontological universe has been folding itself orthogonally into a pair of eyes so that, across the long and fair starlight journey, it might reunite with itself. Before pushing open the final door into the [Coda](coda.md), §39.5 widens our golden carry-prohibition grammar from $K = 2$ to general orders $K \ge 2$, revealing how one self-referential operator projects simultaneously onto vertical ultrametric trees, transverse Rauzy fractal windows, and cross-cut entanglement rank rectangles.

::: {.viz src="self-sustaining-spinor-flow" height="640"}
**The self-sustaining spinor flow lab.** Change the density $\rho$ or the plane of the turn, or drag the tip of $\mathbf{J}$ to choose another spinor: the three squares $\mathbf{J}^2$, $-\mathbf{S}^2$ and $\rho^2$ in the readouts always agree; along the rail the cyan curve returns to $1$ after one turn, the violet one after two. Pull the “dualist wall $\mu$” back and the band is cut along its centre line into a pointer ball in the middle and a memory shell round it (the model interpretation, `MODEL`); push it back to $\mu = 0$ and the two pieces join into the one one-sided band again.
:::

---

## 39.5 Zeckendorf, Pisot, and Rauzy: The Eight-Concept Self-Referential Synthesis Sandtable {#sec-ch39-pisot-clifford-rauzy}

> "These eight concepts are not loose analogies: at the crossroads of algebraic number theory, ergodic dynamical systems, and quantum many-body physics, they are exact cross-sectional projections of one and the same Pisot–Clifford self-referential operator. The mechanism that locks them into a single directed loop fits into one sentence: imposing a finite-order forbidden-run constraint on consecutive carries (generalized Zeckendorf / $K$-Bonacci) vertically generates an ultrametric lookup tree approaching $p$-adic numbers and horizontally projects onto the orthogonal contracting space as a self-referential Rauzy fractal ($\psi = \psi(\psi)$); meanwhile, the nonlocal constraint forbidding saturation across a cut is itself quantum entanglement, whose address collisions along the fractal boundary (`EscapePairs`) directly determine the system's information entropy."

In §39.2 ([@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]), we reconstructed nonnegative continuum reals through the complete golden-quantized Zeckendorf thread ([`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)) and the order-$K = 2$ `NoAdjacentOnes` automaton, before sealing orthogonal self-folding and the four-stage cognitive endgame in §39.4 ([@prop-ch39-orthogonal-folding-and-objective-common-factor]); across Parts IX and X, [Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) §36.4 (alongside the quotient factorization [@thm-ch36-quotient-annihilator-and-factorization]) mapped the vertical $p$-adic prime-power residue lookup tree, while [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5 (alongside the diagonal fixed point [@thm-ch38-self-mapped-diagonal-fixed-point]) established the finite-arena `EscapePairs` indistinguishability ledger. Now, before pushing open the door to the [Coda](coda.md), we generalize the local forbidden-`1` window from $K = 2$ to arbitrary integer orders $K \ge 2$. Doing so brings eight core structures developed across the book—the Zeckendorf forbidden-adjacency language, the $K$-Bonacci Pisot Perron root, prime-power $p$-adic residue lookup trees, the $K = 3$ Rauzy fractal internal window, the Clifford line–plane orthogonal decomposition, self-referential fixed-point scales, cross-cut direct-encoder entanglement ranks, and the Parry stationary law paired with escape-pair counting (recorded verbatim as `A71` in [Appendix A](appendix-a.md#sec-appendix-a-verbatim-ledger))—onto a single auditable self-referential sandtable. In keeping with our formal epistemic contract, we keep recurrence order $K$, word length $Q$, and entanglement rank $r$ strictly distinct throughout, and mark the exact scope of every Lean 4 frozen theorem (`LEAN ✓`), classical mathematical-physics reference (`Literature`), double-precision numerical evaluation (`NUM`), open problem (`OPEN`), and cross-system interpretive dictionary (`MODEL`).

### 39.5.1 The Zeckendorf Forbidden-Adjacency Language: Starting from $K=2$ Carry-Free Coding {#sec-ch39-p2e-zeckendorf}

Everything begins with the lowest-level local rule against carry saturation. At order $K = 2$, the binary Zeckendorf automaton operates on the list carrier `List (Fin 2)`: the frozen theorem [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) established in §39.2 (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]) proves that the automaton accepts a list of binary digits if and only if it contains no two adjacent `1`s (`NoAdjacentOnes`). Generalizing the local forbidden run from $2$ to an arbitrary order $K \ge 2$, `trureturing` defines `DBonacciName K Q` on the fixed-length function carrier `Fin Q → Bool` as the type of length-$Q$ Boolean words with no $K$ consecutive `true` entries (passing between `List (Fin 2)` and fixed-length Boolean functions requires an explicit carrier conversion).

The counting theorem [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) establishes the exact cardinality normalization for every order $d \ge 2$ and word length $Q \in \mathbb{N}$:

$$
\bigl|\operatorname{DBonacciName}(K, Q)\bigr| = \operatorname{dbonacci}(K, Q + 2),
$$

governed by the $K$-step recurrence $C_K(n + K) = \sum_{i=0}^{K-1} C_K(n + i)$. Below the forbidden threshold ($Q < K$), the short-prefix theorem [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) proves that no pruning yet occurs, so the admissible count equals the full binary power $2^Q$; once $Q \ge K$, every saturated $1^K$ branch is cleanly pruned away. At $K = 2$, the counts for $Q = 0, 1, 2, 3, 4, 5$ are the Fibonacci numbers $F_{Q+2} = 1, 2, 3, 5, 8, 13$; at $K = 3$ (no `111`), the counts for $Q = 0, 1, 2, 3, 4$ are $1, 2, 4, 7, 13$. Along the finite name grid at depth $Q$, there are $\min(K, Q)$ distinct adjacent gap lengths—stabilizing at all $K$ distinct gap scales only once $Q \ge K$.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="zeckendorf" height="500"}
**Zeckendorf Forbidden-Adjacency Card (`zeckendorf`)**: Displays the binary word tree of increasing depth at order $K = 2$. Cyan nodes and edges trace admissible words free of adjacent `11`, magenta crosses mark forbidden branches pruned upon hitting `11`, and amber highlights the selected word-length layer $Q$ alongside its Fibonacci count $F_{Q+2}$. Automaton equivalence (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]) and exact word counts carry status `LEAN ✓`.
:::

As the observer widens the forbidden window from $K = 2$ to general $K \ge 2$, the asymptotic growth rate of admissible words comes under the control of a single family of characteristic polynomials.

### 39.5.2 Generalized $K$-Bonacci Prohibition and Pisot Conjugate Disk Contraction {#sec-ch39-p2e-kbonacci}

For each integer order $K \ge 2$, define the $K$-Bonacci characteristic polynomial

$$
P_K(X) = X^K - \sum_{j=0}^{K-1} X^j.
$$

Multiplying $P_K(X)$ by $(X - 1)$ yields $(X - 1)P_K(X) = X^{K+1} - 2X^K + 1$, so every root $x \neq 1$ satisfies the self-referential algebraic relation $x = 2 - x^{-K}$. On the real interval $(1, 2)$, $P_K$ possesses a unique real Perron root $\beta_K = \operatorname{dbonacciPerronRoot}(K)$, while in the complex plane all remaining $K - 1$ Galois conjugates are forced strictly inside the open unit disk:

::: {.theorem #thm-ch39-p2e-kbonacci-pisot title="Complex Root Location and Unit-Disk Conjugate Contraction for K-Bonacci Polynomials" lean="D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location"}
Let $q \ge 2$ be an integer order, and let $z \in \mathbb{C}$ be any complex root of the characteristic polynomial $X^q - \sum_{i=0}^{q-1} X^i \in \mathbb{C}[X]$. Then

$$
1 \le \|z\| \iff z = \beta_q,
$$

where $\beta_q = \operatorname{dbonacciPerronRoot}(q)$ is the real Perron root embedded in $\mathbb{C}$. Equivalently, every complex conjugate root $z \neq \beta_q$ strictly satisfies $\|z\| < 1$.
:::

::: proof
By the Perron-root identity [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), $2 - \beta_q = \beta_q^{-q}$ for every $q \ge 2$, so $\beta_q \in (1, 2)$ and $\|(\beta_q : \mathbb{C})\| = \beta_q \ge 1$ (with $\beta_q \to 2$ as $q \to \infty$ by [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two)). Conversely, suppose $z$ is a root satisfying $1 \le \|z\|$; multiplying by $(z - 1)$ gives $(z - 1)(z^q - \sum_{i=0}^{q-1} z^i) = z^{q+1} - 2z^q + 1 = 0$, or equivalently $z^q(2 - z) = 1$. If $\|z\| > 1$, applying the triangle inequality to $z^q = \sum_{i=0}^{q-1} z^i$ gives $\|z\|^q \le \sum_{i=0}^{q-1} \|z\|^i$, which forces $\|z\| \le \beta_q < 2$ because the real characteristic polynomial is strictly positive on $(\beta_q, \infty)$; meanwhile, combining $z^q(2 - z) = 1$ with the reverse triangle inequality yields $0 < 2 - \beta_q \le 2 - \|z\| \le \|2 - z\| = \|z\|^{-q}$, so $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$. Define $f(t) := t - 2 + t^{-q}$ on $(0, \infty)$: since $f(1) = 0$, $f(\beta_q) = 0$ (as $\beta_q^q(2 - \beta_q) = 1$), and $f''(t) = q(q + 1)t^{-q - 2} > 0$ for every $t > 0$, $f$ is **strictly convex** on $[1, \beta_q]$; therefore every interior point $t = (1 - \lambda)\cdot 1 + \lambda\beta_q \in (1, \beta_q)$ ($0 < \lambda < 1$) satisfies $f(t) < (1 - \lambda)f(1) + \lambda f(\beta_q) = 0$, i.e., $2 - t > t^{-q}$, hence $t^q(2 - t) > 1$. Consequently, $1 < \|z\| < \beta_q$ would imply $\|z\|^q(2 - \|z\|) > 1$, contradicting $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$; together with $\|z\| \le \beta_q$, this forces $\|z\| = \beta_q$, and substituting $\|z\| = \beta_q$ into $2 - \|z\| \le \|2 - z\| = \beta_q^{-q} = 2 - \beta_q$ forces equality $2 - \|z\| = \|2 - z\|$ with $\|z\| < 2$, whence $z$ lies on the positive real ray and $z = \|z\| = \beta_q$. If $\|z\| = 1$, $2z^q = z^{q+1} + 1$ with $\|z^{q+1}\| = 1$ forces $z^{q+1} = 1$ and hence $z = 1$, contradicting $1^q - q = 1 - q \neq 0$ for $q \ge 2$. Together with irreducibility over both $\mathbb{Z}$ and $\mathbb{Q}$ in [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), $P_q(X)$ is irreducible in $\mathbb{Z}[X]$ and $\mathbb{Q}[X]$. The full proof is checked by the Lean kernel.
:::

Alongside this unit-disk root-location law, the frozen library verifies $\beta_2 = \varphi$ ([`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio)), $\beta_3 = \operatorname{tribonacciConstant}$ ([`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant)), strict monotonicity in the order $\beta_2 < \beta_3 < \beta_4 < \cdots$ ([`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn)), and simplicity of the Perron root via nonvanishing derivative ([`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple)). Taken together, these algebraic theorems prove that every $\beta_K$ ($K \ge 2$) is a Pisot–Vijayaraghavan number of exact algebraic degree $K$. Double-precision root finding (`NUM`) places the first three Perron roots at $\beta_2 \approx 1.618034$, $\beta_3 \approx 1.839287$, and $\beta_4 \approx 1.927562$, with gap $2 - \beta_K = \beta_K^{-K} \sim 2^{-K}$. Note that these statements establish polynomial algebra and root location; by themselves they do not constitute a geometric tiling theorem for general Pisot substitutions.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="kbonacci" height="500"}
**$K$-Bonacci Pisot Root Spectrum Card (`kbonacci`)**: Plots the unit circle in $\mathbb{C}$, the cyan Perron root $\beta_K \in (1, 2)$ on the real axis, and the cluster of Galois conjugates strictly inside the open unit disk; magenta markers flag the $1^K$ carry threshold and amber highlights the active order $K$. Polynomial irreducibility and strict unit-disk conjugate contraction carry status `LEAN ✓`; decimal root coordinates carry status `NUM`.
:::

As $K \to \infty$, the forbidden run $1^K$ recedes to infinite depth and $\beta_K \nearrow 2$ approaches the smallest prime radix $2$. To make the vertical metric geometry of discrete lookup trees precise, we next examine prime-power congruence readouts alongside the general finite-horizon refinement ultrametric.

### 39.5.3 Prime-Power Residue Trees and the Finite-Horizon Refinement Ultrametric {#sec-ch39-p2e-padic}

On the arithmetic congruence side, fix a prime $p$ and define the level-$k$ readout of an integer $x \in \mathbb{Z}$ by $\operatorname{precisionReading}(p, k, x) = x \bmod p^k$. For any two distinct integers $x \neq y$, the least distinguishing precision theorem [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision) proves that the earliest level at which their modular readings diverge is $k^* = v_p(x - y) + 1$, whereas every coarser level $k \le v_p(x - y)$ lies inside the precision blind spot. Correspondingly, the valuation-distance identity [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation) equates the observation distance between distinct integers to $p^{-v_p(x - y)}$ (and $0$ when $x = y$), while the fiber correspondence theorem [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) proves that the mod-$p^k$ integer congruence fiber embedded in $\mathbb{Q}_p$ equals the closed ball of radius $p^{-k}$ intersected with the image of $\mathbb{Z} \hookrightarrow \mathbb{Q}_p$—rather than the entire completed $p$-adic ball.

On the general concept-dynamics side, whenever a state space is probed through a sequential hierarchy of discrete readouts, no prime-power exponential valuation is needed for the finite-horizon refinement distance to obey the strong ultrametric triangle law:

::: {.theorem #thm-ch39-p2e-padic-readout title="Ultrametric Strong Triangle Inequality for Finite-Horizon Concept Refinement Distance" lean="D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric"}
Let $X$ be an arbitrary state type, let $\mathrm{Coordinate} : \mathbb{N} \to \mathrm{Type}^*$ be a level-indexed family of coordinate types, let $\mathrm{readout} : (\ell : \mathbb{N}) \to \operatorname{Concept}(X, \mathrm{Coordinate}(\ell))$ be a sequence of levelwise concept readouts, and let $H \in \mathbb{N}$ be a finite observation horizon. Writing $\operatorname{commonDepth}(x, y) \le H$ for the largest prefix depth from level $0$ through which $x$ and $y$ agree on every readout, define the finite-horizon refinement distance $d_H(x, y) = \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, H, x, y) = H - \operatorname{commonDepth}(x, y)$. Without any point-separation hypothesis, every triple $x, y, z \in X$ satisfies

$$
d_H(x, z) \le \max\bigl(d_H(x, y),\; d_H(y, z)\bigr).
$$
:::

::: proof
Set $m = \min\bigl(\operatorname{commonDepth}(x, y),\; \operatorname{commonDepth}(y, z)\bigr)$. For every level $\ell < m$, both $\ell < \operatorname{commonDepth}(x, y)$ and $\ell < \operatorname{commonDepth}(y, z)$ hold, so $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(y)$ and $\mathrm{readout}(\ell)(y) = \mathrm{readout}(\ell)(z)$; transitivity of equality gives $\mathrm{readout}(\ell)(x) = \mathrm{readout}(\ell)(z)$. Thus $x$ and $z$ agree through depth $m$, whence $\operatorname{commonDepth}(x, z) \ge m$. Subtracting from the finite horizon $H$ reverses the inequality and yields $H - \operatorname{commonDepth}(x, z) \le H - m = \max\bigl(H - \operatorname{commonDepth}(x, y),\; H - \operatorname{commonDepth}(y, z)\bigr)$. The full proof is checked by the Lean kernel.
:::

A strict formal boundary must be kept in view here: **the prime-power $p$-adic residue tree and the $K$-Bonacci admissible prefix tree are formally distinct mathematical objects**. The former branches by low-order digits modulo $p^k$ under the exponential valuation metric $p^{-v_p(x-y)}$; the latter prunes finite Boolean words by forbidding $1^K$, and $d_H = H - \operatorname{commonDepth}$ in [@thm-ch39-p2e-padic-readout] is a finite-horizon pseudoultrametric (becoming a strict ultrametric when the readouts separate points within horizon $H$) rather than the exponential $p$-adic metric by definition—nor does the common-prefix length of two Zeckendorf words automatically equal $v_p$ of their decoded integer difference. Juxtaposing the $K \to \infty$ full-binary limit $\beta_K \nearrow 2$ with zero-carry prime-radix lookup trees (compare the quotient factorization in [Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md), [@thm-ch36-quotient-annihilator-and-factorization]) is a cross-system structural dictionary (`MODEL`), not an automatic topological conjugacy theorem.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="padic" height="500"}
**Prime-Power Residue Tree and Refinement Ultrametric Card (`padic`)**: Presents a tree stage stratified by residues modulo $p^k$. Cyan branches trace shared low-digit prefixes of two integers, a magenta split node marks the least distinguishing precision $k^* = v_p(x-y)+1$, and amber highlights the selected integer pair and horizon $H$. Local congruence precision and the `refinementDistance` strong triangle law carry status `LEAN ✓`; the cross-system comparison with $K$-Bonacci trees carries status `MODEL`.
:::

Orthogonal to this vertical tree hierarchy, the complex Galois conjugates inside the open unit disk project the very same admissible finite words onto a transverse contracting space. The moment the order steps from $K = 2$ to $K = 3$, the one-dimensional real conjugate segment blossoms—via a complex-conjugate root pair—into a two-dimensional fractal internal window.

### 39.5.4 The $K=3$ Rauzy Fractal Internal Window: Exact Prefix Self-Coverage and Null Boundary {#sec-ch39-p2e-rauzy}

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

### 39.5.5 Clifford Orthogonal Split: One-Dimensional Expanding Axis and Two-Dimensional Internal Rotor Plane {#sec-ch39-p2e-clifford}

For a cubic algebraic code $x = a + b\beta_3 + c\beta_3^2$ with rational or integer coefficients, the standard real-linear cubic Minkowski coordinate map takes the form

$$
(a, b, c) \longmapsto \Bigl(a + b\beta_3 + c\beta_3^2,\; \operatorname{Re}(a + b\alpha + c\alpha^2),\; \operatorname{Im}(a + b\alpha + c\alpha^2)\Bigr) \in E_\parallel^1 \oplus E_\perp^2.
$$

(Note in passing that for general rational coefficients $(a, b, c) \in \mathbb{Q}^3$, the three-embedding trace $(a+b\beta_3+c\beta_3^2) + 2\operatorname{Re}(a+b\alpha+c\alpha^2) = 3a + b + 3c$ is rational, taking guaranteed integer values only on $\mathbb{Z}^3$ or on the calibrated finite scan lattice.) Under this coordinate split, multiplication by $\beta_3$ stretches the one-dimensional physical line $E_\parallel^1$ by $\beta_3 > 1$, while in the two-dimensional internal plane $E_\perp^2$ complex multiplication $w \mapsto \alpha w$ acts by uniform contraction $|\alpha| = \beta_3^{-1/2} < 1$ composed with planar rotation through $\arg\alpha \approx 124.69^\circ$.

::: {.remark #rem-ch39-p2e-unification-model title="Interpretive Model: A Clifford Line–Plane Dictionary for Minkowski Embeddings (MODEL)"}
Within the three-dimensional Clifford algebra $\mathrm{Cl}_{3,0}(\mathbb{R})$ introduced in [Chapter 6](ch06-geometric-product.md), we can formulate an explicit geometric dictionary (`MODEL`) for $E_\parallel^1 \oplus E_\perp^2$: aligning the one-dimensional expanding axis with a unit grade-1 vector $\mathbf{e}_1$ (the particle-like ruler axis) and the two-dimensional internal complex plane with the orthogonal unit grade-2 bivector $B_\perp = \mathbf{e}_2 \wedge \mathbf{e}_3$ ($B_\perp^2 = -1$, the wave-like coherent plane) writes each internal step $w \mapsto \alpha w$ as a damped scaled rotor

$$
\mathcal{D}_\perp = \beta_3^{-1/2}\bigl(\cos\vartheta + B_\perp \sin\vartheta\bigr),\qquad \vartheta = \arg\alpha \approx 124.69^\circ,
$$

whose three-dimensional determinant (pseudoscalar volume factor) satisfies $\beta_3 \cdot \bigl(\beta_3^{-1/2}\bigr)^2 = 1$: every factor of longitudinal dilation along the line is balanced by an equal factor of transverse bivector area contraction. Three formal caveats govern this dictionary: first, $(a,b,c) \mapsto (\dots)$ is an algebraic real-linear coordinate map and becomes an orthonormal Euclidean projection of $\mathbb{Z}^3$ only relative to a declared basis and metric; second, $\mathcal{R}_3(\alpha)$ itself lives strictly inside the **two-dimensional internal plane** $E_\perp^2$—rotating a 3D camera in the sandtable is a viewing operation that adds no mathematical dimension to $\mathcal{R}_3(\alpha)$; third, reading $E_\parallel^1$ and $E_\perp^2$ as an observer's external clock line and internal phase-memory plane is a `MODEL` synthesis, not an additional formal isomorphism theorem.
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="clifford" height="500"}
**Clifford Line–Plane Decomposition Card (`clifford`)**: A three-dimensional algebraic-coordinate stage pairs $\beta_3$-dilation along the cyan physical axis $E_\parallel$ with damped bivector rotation $|\alpha| e^{i\arg\alpha}$ in the violet internal plane $E_\perp$; an amber handle marks the draggable lattice point decomposition. Coordinate evaluation carries status `NUM`, and the Clifford observer dictionary carries status `MODEL`.
:::

Seeing the single-step internal contraction modulus settle at $|\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353$ invites a natural numerical comparison: how does this algebraic contraction scale relate to Dottie's self-referential cosine fixed point $\theta^* = \cos\theta^* \approx 0.739085$ from [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) and [Chapter 33](ch33-all-beings-observers-and-mutual-attractors.md)?

### 39.5.6 Self-Referential Scale Comparison: Dottie's Cosine Fixed Point $\theta^*$ Versus Internal Contraction Modulus $|\alpha|$ {#sec-ch39-p2e-self-reference}

Across earlier parts of this monograph, "an operator reaching scale equilibrium on its own output" appeared in three distinct, mathematically exact equations: the golden continued-fraction reciprocal fixed point $x = 1 + 1/x$ (unique positive root $\varphi$, [@cor-golden-fixed-point-unique] and §39.1 [@thm-ch39-self-application-four-fates-and-diagonal-identity]), the generalized $K$-Bonacci Perron equation $x = 2 - x^{-K}$ (unique root $\beta_K > 1$, [@thm-ch39-p2e-kbonacci-pisot]), and the real inner-product projection equation $\cos\theta = \theta$ (unique positive endpoint $\theta^*$, [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) [@thm-dottie-rational-inverse-endpoint], with full real-line convergence analyzed in [Chapter 33](ch33-all-beings-observers-and-mutual-attractors.md) [@ex-ch33-mutual-cosine-monotonic-lock]). Placing the $K = 3$ internal contraction modulus beside Dottie's cosine fixed point on one numerical ruler clarifies both their striking proximity and their sharp algebraic divide:

::: {.example #ex-ch39-p2e-pisot-dottie-numerics title="Literature Result and Numerical Example: Proximity and Algebraic Divide Between Dottie's Fixed Point θ* and Tribonacci Internal Contraction |α| (Including literature result, not formalized in this book)"}
**Literature result, not formalized in this book (for transcendence of $\theta^*$; existence and uniqueness of the positive endpoint and the cubic conjugate-product identity are verified in Lean).** On one side, the inverse power-series endpoint theorem [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) ([@thm-dottie-rational-inverse-endpoint]) proves a unique $\theta^* \in (0, 1)$ satisfying $\cos\theta^* = \theta^*$, together with absolute convergence of a selected rational inverse power series at $\pi$ to $\theta^*$; on the other side, the cubic conjugate-product identity [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) directly yields $|\alpha|_{K=3} = \beta_3^{-1/2}$. Independent double-precision bisection (`NUM`) gives their decimal values and relative separation:

$$
\theta^* \approx 0.739085,\qquad |\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353,\qquad \frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{\theta^*} \approx 0.234\% \quad \left(\frac{\bigl|\theta^* - |\alpha|_{K=3}\bigr|}{|\alpha|_{K=3}} \approx 0.235\%\right).
$$

Remarkable as a $0.234\%$ gap may look at first glance, epistemic discipline requires stating plainly that **$\theta^*$ and $|\alpha|_{K=3}$ are strictly unequal ($\theta^* \neq \beta_3^{-1/2}$) and inhabit disjoint levels of the number hierarchy**. Indeed, $|\alpha|_{K=3} = \beta_3^{-1/2}$ satisfies the degree-six integer polynomial $y^6 + y^4 + y^2 - 1 = 0$ and is therefore algebraic, whereas by the Lindemann–Weierstrass theorem (`Literature`) any nonzero real solution of $\cos\theta^* = \theta^*$ is transcendental. The $\approx 0.234\%$ proximity is thus a numerical comparison (`NUM`), never an algebraic identity or shared physical constant; grouping $\cos\theta^* = \theta^*$ alongside self-similar Pisot window fixed points under the symbolic motif $\psi = \psi(\psi)$ belongs strictly to our conceptual unification layer (`MODEL`).
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="self-reference" height="500"}
**Self-Referential Scale Comparison Card (`self-reference`)**: Contrasts Picard cosine iteration converging to the cyan fixed point $\theta^* \approx 0.739085$ with the order-three internal spiral contracting at modulus $|\alpha| = \beta_3^{-1/2} \approx 0.737353$ per step; an amber step cursor tracks the step-$k$ amplitude ratio and the $\approx 0.234\%$ numerical offset. Endpoint existence and the conjugate-product identity carry status `LEAN ✓`, decimal offsets carry status `NUM`, and the shared $\psi = \psi(\psi)$ motif carries status `MODEL`.
:::

Returning from single-orbit contraction scales to many-body quantum registers: when an admissible $1^K$-free word is split across a spatial cut, its left and right halves can no longer be chosen independently—the cross-cut carry prohibition converts combinatorial run counting directly into an exact rectangle of attainable bipartite Schmidt ranks.

### 39.5.7 Cross-Cut $1^K$ Prohibition and Attainable Schmidt Ranks of Direct Encoders {#sec-ch39-p2e-entanglement}

Partition a binary physical register of length $m_X + m_Y$ ($m_X, m_Y \ge 1$) across a cut into a left block $X$ of length $m_X$ and a right block $Y$ of length $m_Y$. Even when $x \in \{0, 1\}^{m_X}$ and $y \in \{0, 1\}^{m_Y}$ are individually $1^K$-free, their concatenation $xy$ can still assemble $K$ consecutive `1`s across the junction: writing $\tau(x)$ for the terminal run of `1`s in $x$ and $\iota(y)$ for the initial run of `1`s in $y$, the concatenated word $xy$ is admissible if and only if

$$
\tau(x) + \iota(y) < K.
$$

In the `trureturing` direct-encoder model, fix integers $N \ge 2$ and $K \ge 2$, and partition $\{0, 1, \dots, N\}$ by primality into the nonprime logical page ($b = \mathrm{false}$, dimension $M_0 > 0$) and the prime logical page ($b = \mathrm{true}$, dimension $M_1 > 0$). Let $C_{m, b}$ denote the set of length-$m$ admissible $1^K$-free words with first bit $b$, of cardinality $c_{m, b} = |C_{m, b}|$; for each threshold $0 \le s < K$, define the cumulative low-tail left row count and compatible right neighborhood count on page $1$ by

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

and set the combinatorial page-rank caps

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

An isometric encoding matrix $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ paired with left-register page density states $\sigma_0, \sigma_1$ satisfies `directContract` if: (i) $J^* J = I$; (ii) physical first-bit page projectors on both $X$ and $Y$ intertwine the logical page projectors $\Pi_b$, with $\sigma_b$ supported in $C_{m_X, b}$; (iii) for **every** logical operator $A$, $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$; and (iv) every concatenated pair $(x, y)$ violating the $1^K$-free law has zero encoded amplitude $(J\psi)(x, y) = 0$ for every logical input $\psi$. Under this contract, the attainable Schmidt ranks and von Neumann entropies are characterized completely:

::: {.theorem #thm-ch39-p2e-direct-encoder-ranks title="Attainable Page-Rank Rectangle and von Neumann Entanglement Entropy Maxima for K-Bonacci Direct Encoders" lean="D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy"}
For all integers $N \ge 2$, $K \ge 2$, and block lengths $m_X, m_Y \ge 1$, both logical page dimensions are strictly positive ($M_0 > 0,\; M_1 > 0$). Writing $r_b = \operatorname{rank}(\sigma_b)$ ($b \in \{0, 1\}$) and defining $R_0, R_1$ as above:

1. **Rank upper bounds and spectral necessity**: Every pair $(J, \sigma)$ satisfying `directContract` obeys $r_0 \le R_0$, $r_1 \le R_1$, and the page-$1$ spectral factorization necessity (`totalRowSpectralNecessity`);
2. **Exact attainable rank rectangle**: For any natural numbers $(d_0, d_1)$, there exist jointly chosen $(J, \sigma)$ satisfying `directContract` with $(r_0, r_1) = (d_0, d_1)$ if and only if $1 \le d_0 \le R_0$ and $1 \le d_1 \le R_1$; in particular, a legal direct encoder exists if and only if $R_0 \ge 1$ and $R_1 \ge 1$;
3. **Page-pure Schmidt-rank identity**: Under `directContract`, every normalized pure logical state $\psi$ supported entirely in page $b$ has encoded bipartite Schmidt rank across $X \mid Y$ equal to $r_b = \operatorname{rank}(\sigma_b)$;
4. **Sharp von Neumann entropy bounds and simultaneous attainment**: Every $(J, \sigma)$ satisfying `directContract` obeys $S(\sigma_0) \le \ln R_0$ and $S(\sigma_1) \le \ln R_1$ (in natural-logarithm units); whenever $R_0 \ge 1$ and $R_1 \ge 1$, a single joint construction $(J, \sigma)$ simultaneously attains $r_0 = R_0$, $r_1 = R_1$, $S(\sigma_0) = \ln R_0$, and $S(\sigma_1) = \ln R_1$.
:::

::: proof
Necessity follows from the spectral obstruction theorem [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction): for any given encoder obeying `directContract`, factoring through an isometry $W$ on the nonzero eigenspace of $\sigma_b$ and enforcing $\tau(x) + \iota(y) < K$ confines the image of the subspace $V_s$ spanned by weighted left rows with $\tau(x) \ge s$ to the $n_s$-element compatible right neighborhood; mutual orthogonality across the $M_1$ logical basis states forces $M_1 \dim V_s \le n_s$, so $r_1 \le a_s + \dim V_s \le a_s + \lfloor n_s / M_1 \rfloor$ for all $0 \le s < K$, while page $0$ similarly gives $r_0 \le \min(c_{m_X, 0}, \lfloor c_{m_Y, 0}/M_0 \rfloor) = R_0$. Sufficiency and simultaneous extremal attainment construct $(J, \sigma)$ jointly by pairing disjoint right-hand word blocks across run strata with uniform nonzero eigenvalues $1/d_b$ (and $1/R_b$ at the corner); since a density state of rank $r_b$ has von Neumann entropy at most $\ln r_b \le \ln R_b$, the entropy bounds are sharp (note that these cross-cut rank bounds address a physical constraint distinct from the pointer history-capacity bound in [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md), [@thm-ch38-pointer-width-and-no-deep-copy]). The full proof is checked by the Lean kernel.
:::

[@thm-ch39-p2e-direct-encoder-ranks] underscores a crucial point that slogans easily obscure: **the Schmidt rank of a direct encoder is not universally equal to $K$!** Rank $K$ is **conditionally attainable**—as one point inside the feasible rectangle $[1, R_0] \times [1, R_1]$—only if the block parameters satisfy $1 \le K \le R_b$. As an independently enumerated concrete example (`NUM`), take $N = 2,\; K = 3,\; m_X = 4,\; m_Y = 5$: on $\{0, 1, 2\}$, the nonprime page $\{0, 1\}$ has $M_0 = 2$ and the prime page $\{2\}$ has $M_1 = 1$; counting `111`-free words gives $c_4 = (7, 6)$, $c_5 = (13, 11)$, $(a_0, a_1, a_2) = (0, 3, 5)$, and $(n_0, n_1, n_2) = (11, 7, 0)$, so

$$
R_0 = \min\bigl(7, \lfloor 13 / 2 \rfloor\bigr) = 6,\qquad R_1 = \min\bigl(6, \min(0 + 11,\; 3 + 7,\; 5 + 0)\bigr) = 5.
$$

Every integer rank pair with $1 \le r_0 \le 6$ and $1 \le r_1 \le 5$ is realizable: $r_0 = r_1 = K = 3$ is one valid choice among thirty, whereas the maximal attainable ranks are $(6, 5)$ with maximal page entropies $(\ln 6, \ln 5)$.

::: {.example #ex-ch39-p2e-positive-ket-handcalculation title="By Hand: Positive Equal-Amplitude Admissible-Word States Across the Same Cut"}
This is a paper calculation for a specified finite state, not a new Lean-verified theorem. Set $m=n=1$ (that is, $m_X=m_Y=1$), cutting a two-bit word across $X\mid Y$. For $K=2$, the admissible words are exactly $00,01,10$; choose the positive equal-amplitude coherent state

$$
\lvert\psi\rangle=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle}{\sqrt3},
\qquad \langle\psi\mid\psi\rangle=\frac{3}{3}=1.
$$

Ordering the words on each side as $0,1$, the coefficient matrix and partial trace are

$$
\begin{aligned}
M&=\frac1{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi\rangle\langle\psi\rvert)
=MM^*=\frac13\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\end{aligned}
$$

Explicitly, $\rho_{xx'}=\sum_{y=0}^1 M_{xy}\overline{M_{x'y}}$: $00$ and $10$ share the right word $y=0$, leaving off-diagonal entries $\rho_{01}=\rho_{10}=1/3$. Hence

$$
\begin{aligned}
\det(tI-\rho_X)&=t^2-t+\frac19,\\
\lambda_+&=\frac{3+\sqrt5}{6},\qquad
\lambda_-=\frac{3-\sqrt5}{6}.
\end{aligned}
$$

Each eigenvalue has multiplicity $1$; both are positive and sum to $1$. The reduced rank is $2$, and the Schmidt coefficients are $\sqrt{\lambda_+},\sqrt{\lambda_-}$. Using natural logarithms, the entanglement entropy is

$$
S(\rho_X)=-\lambda_+\ln\lambda_+-\lambda_-\ln\lambda_->0.
$$

Neither counting three words nor taking $\ln3$ gives this entropy; replacing the ket by a uniform diagonal classical mixture of the three words removes those coherence terms.

Across the same cut, every $K\ge3$ admits all four words $00,01,10,11$. The chosen positive equal-amplitude state is then

$$
\begin{aligned}
\lvert\psi\rangle&=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle}{2}
=\lvert+\rangle\otimes\lvert+\rangle,\\
\lvert+\rangle&=\frac{\lvert0\rangle+\lvert1\rangle}{\sqrt2},\qquad
\langle\psi\mid\psi\rangle=4\left(\frac12\right)^2=1,\\
\rho_X&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\end{aligned}
$$

Its eigenvalues $1,0$ each have multiplicity $1$. The reduced rank is $1$, the sole nonzero Schmidt coefficient is $1$, and $S(\rho_X)=0$ (with $0\ln0=0$). Here we specify a state over all admissible words, without fixing first-bit pages or imposing the logical `directContract`; the preceding theorem instead characterizes attainable ranks and entropy extrema while jointly choosing the encoder and page states under that contract. This example determines no physical ground state or general entropy limit at fixed $K$; the subsequent open problems remain open.
:::

::: {.example #ex-ch39-p2e-phase-counterexample title="By Hand: Identical Probabilities, Different Entanglement"}
Keep $m=n=1$ and the cut $X\mid Y$ from the preceding example, and fix any $K\ge3$; the admissible words are exactly $00,01,10,11$.
Compare $\lvert\psi_+\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle)/2$ with $\lvert\psi_{\mathrm{phase}}\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle-\lvert11\rangle)/2$: only the phase of the $11$ amplitude changes, to $\pi$.
Both states have squared norm $4(1/4)=1$, and each word has computational-basis probability $1/4$. Ordering each side as $0,1$, the latter state gives

$$
\begin{aligned}
M_{\mathrm{phase}}&=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi_{\mathrm{phase}}\rangle\langle\psi_{\mathrm{phase}}\rvert)=M_{\mathrm{phase}}M_{\mathrm{phase}}^*\\
&=\frac14\begin{pmatrix}1+1&1-1\\1-1&1+1\end{pmatrix}=\frac{I_2}{2}.
\end{aligned}
$$

In the partial trace, the right words $y=0,1$ contribute $1/4,-1/4$ to each off-diagonal entry, so they cancel. The reduced spectrum, listed with multiplicity, is $(1/2,1/2)$ (the eigenvalue $1/2$ has multiplicity $2$), and the Schmidt coefficients are $1/\sqrt2,1/\sqrt2$. With natural logarithms, the entanglement entropy is $S(\rho_X)=-2(1/2)\ln(1/2)=\ln2$, whereas the preceding example gives $0$ for $\psi_+$.

This phase change is the joint controlled-sign operation $\operatorname{diag}(1,1,1,-1)$, not a product of single-qubit local phase operations: local unitaries preserve Schmidt coefficients and cannot turn the sole nonzero Schmidt coefficient $1$ of $\psi_+$ into the two coefficients above.

Thus identical admissible-word support, counts, and even computational-basis probabilities do not determine entanglement; the chosen positive-phase equal-amplitude family remains a meaningful additional specification of the state. This is a paper calculation for finite states, with no conclusion about ground states, physical realization, or fractal entanglement scaling.
:::

::: {.example #ex-ch39-p2e-finite-kernel title="Paper derivation: compressing the positive equal-amplitude state's reduced spectrum to K dimensions"}
The preceding calculations extend to a finite matrix calculation for the same specified state family. This is a paper derivation, not a new Lean-verified result. Fix $K\ge2$ and any $m,n\ge0$. Let $W_L$ contain all length-$L$ binary words avoiding $1^K$, write $z_L=|W_L|$, and choose

$$
\lvert\psi_{m,n}\rangle
=\frac1{\sqrt{Z}}\sum_{w\in W_{m+n}}\lvert w\rangle,
\qquad Z=z_{m+n}>0.
$$

The all-zero word ensures $Z>0$. No first-bit page is fixed. Partition $W_m$ into classes $A_r$ by the length $r$ of the terminal run of ones, and $W_n$ into classes $B_s$ by the length $s$ of the initial run of ones; both lengths are $0$ for the empty word. Legality gives $0\le r,s<K$. Let $a_r=|A_r|$ and $b_s=|B_s|$ be the actual finite counts, allowing zero. For $x\in A_r$ and $y\in B_s$, concatenation is legal exactly when $r+s<K$, so

$$
Z=\sum_{r+s<K}a_r b_s.
$$

In the full computational-basis spaces of dimensions $2^m$ and $2^n$, assign each nonempty class its normalized indicator vector $u_r=\sum_{x\in A_r}|x\rangle/\sqrt{a_r}$ or $v_s=\sum_{y\in B_s}|y\rangle/\sqrt{b_s}$. Assign the zero vector to an empty class, without inverting the square root of zero. Form matrices $U,V$ from these columns and define the $K\times K$ matrix

$$
C_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_r b_s}{Z}}.
$$

The actual state's coefficient matrix is $M_{xy}=\mathbf1_{\{xy\in W_{m+n}\}}/\sqrt Z$. Expand $UCV^*$ entry by entry: each legal $x,y$ belongs to exactly one nonempty class, and the normalization factors cancel; an illegal word or concatenation gives zero. Thus $M=UCV^*$. Distinct nonempty classes are disjoint, hence

$$
\begin{aligned}
U^*U&=D_A=\operatorname{diag}(\mathbf1_{\{a_r>0\}}),\\
V^*V&=D_B=\operatorname{diag}(\mathbf1_{\{b_s>0\}}),\\
D_A C D_B&=C.
\end{aligned}
$$

The last identity handles short words and empty classes: $U,V$ with zero columns are not isometric embeddings of the entire $K$-dimensional space. Taking the partial trace of the actual pure state now gives

$$
\begin{aligned}
\rho_X&=MM^*=U G U^*,\qquad G=CC^*,\\
G_{rr'}&=\frac{\sqrt{a_r a_{r'}}}{Z}
\sum_{s=0}^{K-1-\max(r,r')}b_s.
\end{aligned}
$$

The sum counts right words compatible with both left boundary runs. The matrix $G$ vanishes on empty left classes, while the restriction of $U$ to the coordinate space of nonempty classes is an isometric embedding. Consequently, $G$ and $\rho_X$ have the same positive eigenvalues with the same multiplicities. The right reduction has that positive spectrum too, since $C^*C$ and $CC^*$ have the same positive spectrum. If $R=\operatorname{rank}C$, the physical zero-eigenvalue multiplicities are $2^m-R$ and $2^n-R$; the auxiliary matrix $G$ instead has zero multiplicity $K-R$. These counts must be distinguished.

Since $\operatorname{Tr}G=\sum_{r,s}|C_{rs}|^2=1$, list its positive eigenvalues with multiplicity as $\nu_1,\ldots,\nu_R$. The finite-cut entanglement entropy, using natural logarithms, is

$$
\begin{aligned}
S(\rho_X)&=-\sum_{j=1}^{R}\nu_j\ln\nu_j,\\
0\le S(\rho_X)&\le\ln R
\le\ln\!\bigl(\min\{K,2^m,2^n\}\bigr).
\end{aligned}
$$

The entropy bound is the usual Shannon bound for $R$ positive numbers summing to $1$. If $m=0$ or $n=0$, then $R=1$ and the entropy is zero; at $m=n=1$, the nonzero part recovers the matrices in [@ex-ch39-p2e-positive-ket-handcalculation]. This calculation uses actual class counts without requiring their closed forms or substituting stationary probabilities. At fixed $K$, it bounds the cut entropy uniformly for this positive equal-amplitude family. Further control in $K$ is given in [@ex-ch39-p2e-uniform-entropy]; the finite-kernel calculation alone proves no entropy limit and identifies no physical ground state or relation to Rauzy-boundary dimension. These counts carry no phase information. Whether changed phases preserve this spectrum requires a separate check; the joint sign change in the preceding example changes it.
:::

::: {.example #ex-ch39-p2e-exact-rank title="Exact Schmidt rank from short words to saturation"}
Continue the paper derivation for the positive equal-amplitude state in [@ex-ch39-p2e-finite-kernel], and set $p=\min(m,K-1)$ and $q=\min(n,K-1)$. The class of left words with exactly $r$ trailing ones is nonempty precisely for $0\le r\le p$: use $0^{m-r}1^r$ when $r<m$, and the all-ones word when $r=m<K$; the empty word has $r=0$. On the right, $1^s0^{n-s}$ similarly realizes every $0\le s\le q$. Removing the zero rows and columns therefore leaves the coefficient kernel

$$
C_{\mathrm{occ}}=Z^{-1/2}D_A T D_B,
\qquad T_{rs}=\mathbf 1_{\{r+s<K\}},
$$

where both $D_A=\operatorname{diag}(\sqrt{a_0},\ldots,\sqrt{a_p})$ and $D_B=\operatorname{diag}(\sqrt{b_0},\ldots,\sqrt{b_q})$ are invertible. Its rank is the rank of this $(p+1)\times(q+1)$ zero–one matrix.

Write $v_r$ for row $r$ of $T$, with column coordinates $0,\ldots,q$. The zeroth row $v_0$ is all ones, and for $1\le r\le p$ the successive differences are

$$
v_r-v_{r-1}=
\begin{cases}
-e_{K-r},&K-r\le q,\\
0,&K-r>q.
\end{cases}
$$

Since $1\le K-r$, the nonzero differences occupy distinct nonzero column coordinates. There are $h=\max(0,p+q-K+1)$ of them. Taking differences and telescoping back shows that the row space is exactly the span of $v_0$ and these $h$ coordinate vectors. Column zero first forces the coefficient of $v_0$ to vanish in any linear relation; the remaining coordinates then force every other coefficient to vanish. Thus the original pure state has Schmidt rank

$$
R=1+\max(0,p+q-K+1).
$$

This gives exact finite-length boundaries: $R=K$ precisely when $m,n\ge K-1$, and $R=1$ precisely when $m=0$, $n=0$, or $m+n<K$. For two nonempty sides, this specified state becomes entangled exactly when the forbidden-word constraint can cross the cut, namely $m+n\ge K$. Its positive spectrum has $R$ entries: rank one gives zero entropy, whereas at higher rank every entry is strictly below one and the entropy is strictly positive. Full rank alone does not make those entries equal; whether the entropy reaches $\ln K$ still depends on the preceding spectrum. This derivation adds no Lean verification and establishes no entropy limit or physical ground-state conclusion.
:::


::: {.example #ex-ch39-p2e-uniform-entropy title="Paper derivation: entanglement vanishes uniformly as the forbidden run grows"}
Increasing the automaton's number of states need not increase the entanglement of this specified state. For the positive equal-amplitude family in [@ex-ch39-p2e-finite-kernel], a classical correlation inequality gives a bound uniform over all finite cuts. This remains a paper derivation and adds no Lean verification.

Under the uniform law on binary words of length $m+n$, let $D$ mean that each half is legal, and let $E$ mean that an all-ones window of length $K$ crosses the cut. Represent a word by its set of one-positions. Then $D$ is closed under deleting positions, whereas $E$ is closed under adding them. The Harris–Kleitman inequality makes such a decreasing event and increasing event negatively correlated; this is a classical literature result (Kleitman, *Families of Non-disjoint Subsets*, [doi:10.1016/S0021-9800(66)80012-1](https://doi.org/10.1016/S0021-9800(66)80012-1), lemma on p.154). Consequently,

$$
\begin{aligned}
\delta_{K;m,n}
&:=\Pr(E\mid D)
=1-\frac{z_{m+n}}{z_mz_n}\\
&\le\Pr(E)\le d_K,
\qquad d_K=(K-1)2^{-K}.
\end{aligned}
$$

Here $\Pr(D)=z_mz_n/2^{m+n}>0$. Each length-$K$ window crossing the cut uses $K$ distinct positions and is all ones with uniform probability $2^{-K}$. There are at most $K-1$ such windows, so the final step is a union bound. Short or empty sides only reduce their number; with no such window, $E$ is empty.

Let $\lvert u\rangle$ and $\lvert v\rangle$ be the normalized equal-amplitude superpositions of legal words on the two sides, and put $\lvert\phi\rangle=\lvert u\rangle\otimes\lvert v\rangle$. Counting their common nonzero coefficients gives

$$
|\langle\phi\mid\psi_{m,n}\rangle|^2
=\frac{z_{m+n}}{z_mz_n}=1-\delta_{K;m,n}.
$$

If $\lambda_{\max}$ is the largest eigenvalue of the actual reduced state, the singular-value decomposition of its coefficient matrix gives $\lambda_{\max}\ge |\langle\phi\mid\psi_{m,n}\rangle|^2$: overlap with any unit product vector is at most the largest Schmidt coefficient. Thus $t:=1-\lambda_{\max}$ satisfies $0\le t\le\delta_{K;m,n}\le d_K\le1/4$. The last bound follows from $(K-1)\le2^{K-2}$ for every $K\ge2$.

The preceding calculation bounds the rank by $K$, leaving at most $K-1$ other eigenvalues with total mass $t$. For $t>0$, divide these entries by $t$ and apply the usual finite-probability entropy bound; at $t=0$, use the continuous value. With $h(t)=-t\ln t-(1-t)\ln(1-t)$ and its continuous endpoint values,

$$
\begin{aligned}
S_K(m,n)
&\le h(t)+t\ln(K-1)\\
&\le h(d_K)+d_K\ln(K-1)\\
&\le (K-1)2^{-K}(1+K\ln2).
\end{aligned}
$$

The second step uses the increase of $h$ on $[0,1/2]$ and $\ln(K-1)\ge0$. The third uses $-(1-d)\ln(1-d)\le d$ and substitutes $d_K$. The right-hand side tends to zero independently of $m,n$. Hence for every $\varepsilon>0$ there is a $K_0\ge2$, independent of the cut lengths, such that $S_K(m,n)<\varepsilon$ for every $K\ge K_0$ and every $m,n\ge0$. This concerns the specified state family: its rank can reach $K$ while the spectral mass outside its largest eigenvalue vanishes uniformly. It establishes no fixed-$K$ long-region entropy limit, specifies no physical ground state and does not resolve the relation between Rauzy-boundary dimension and entanglement scaling.
:::

::: {.example #ex-ch39-p2e-fixed-order-entropy-limit title="Paper derivation: the two-sided entropy limit at fixed forbidden-run order"}
Fix $K\ge2$ and let both sides of the cut grow. The question shifts from how many Schmidt coefficients are nonzero to how their mass settles. Continue with the actual positive equal-amplitude state of [@ex-ch39-p2e-finite-kernel]: all binary words avoiding $1^K$ participate, without a fixed first bit or occupation number. This is a paper derivation; the complete application has not been compiled in Lean and specifies no physical ground state.

Let $W_L$ be the legal words of length $L$, and $z_L=|W_L|$, including $z_0=1$. Set $\beta=\beta_K$, $p=\beta^{-1}$, and

$$
\begin{aligned}
w_j&=\sum_{a=1}^{K-j}p^a\quad(0\le j<K),\\
T&=\sum_{j=0}^{K-1}p^j w_j=\sum_{a=1}^{K}a p^a.
\end{aligned}
$$

The root equation gives $1<\beta<2$ and $\sum_{a=1}^Kp^a=1$, hence $w_0=1$, $p\le w_j\le1$, and $T>0$. Define real $K\times K$ matrices

$$
\begin{aligned}
C^\infty_{rs}&=\mathbf1_{\{r+s<K\}}\frac{p^{(r+s+1)/2}}{\sqrt T},\\
G^\infty_{rr'}&=\frac{p^{(r+r')/2}w_{\max(r,r')}}{T}.
\end{aligned}
$$

We will show that $G^\infty=C^\infty(C^\infty)^*$ is positive definite with trace one. For its eigenvalues $\lambda_1,\ldots,\lambda_K$, listed with multiplicity, the actual state's entropy satisfies

$$
\begin{aligned}
\lim_{\min(m,n)\to\infty}S_K(m,n)
&=S_K^\infty:=-\sum_{i=1}^{K}\lambda_i\ln\lambda_i,\\
0&<S_K^\infty<\ln K.
\end{aligned}
$$

Both lengths must diverge, but their relative growth rates are unrestricted.

**First recover the actual free-boundary counts.** Use the signed Parry chain $Q$ of the next section, on states $(b,j)\in\{\mathrm{false},\mathrm{true}\}\times\{0,\ldots,K-1\}$. Reading $0$ at $(b,j)$ flips the sign and resets to $(!b,0)$ with weight $p/w_j$; reading $1$ preserves the sign and advances to $(b,j+1)$ with weight $p w_{j+1}/w_j$, allowed only when $j+1<K$. From $x_0=(\mathrm{false},0)$, every legal word gives exactly one allowed path, and adjacent states uniquely recover each bit. The terminal sign is unrestricted: there is no extra factor of two or closing condition.

The weight of a length-$L$ path ending at run $j$ telescopes to $p^Lw_j$. If $N_L(b,j)$ counts paths ending at $(b,j)$, expansion of matrix multiplication gives

$$
\begin{aligned}
(Q^L)_{x_0,(b,j)}&=N_L(b,j)p^Lw_j,\\
z_Lp^L&=\sum_{b,j}\frac{(Q^L)_{x_0,(b,j)}}{w_j}.
\end{aligned}
$$

The terminal factor $1/w_j$ is essential: free-boundary counts are not obtained by simply taking a stationary marginal. The existing chain mixing bound and stationary law are

$$
\begin{aligned}
\pi(b,j)&=\frac{p^jw_j}{2T},\\
\operatorname{TV}(Q^L(x,\cdot),\pi)
&\le\theta_L:=(3/4)^{\lfloor L/3\rfloor}.
\end{aligned}
$$

Total variation is half the finite $\ell^1$ distance. Since $w_j\ge p$, summing with the terminal reweighting yields

$$
\begin{aligned}
z_Lp^L&=c+\varepsilon_L,\\
c&=\sum_{b,j}\frac{\pi(b,j)}{w_j}
=\frac{\sum_{j=0}^{K-1}p^j}{T}=\frac1{pT}>0,\\
|\varepsilon_L|&\le\frac2p\theta_L.
\end{aligned}
$$

The last identity for $c$ uses the root equation. This connects chain mixing to the actual word count with free boundaries.

**Then return from endpoint counts to the quantum state.** Once $m,n\ge K$, a left word with terminal run exactly $r$ has the unique form $u\,0\,1^r$, with $u\in W_{m-r-1}$; a right word with initial run exactly $s$ has the unique form $1^s\,0\,v$, with $v\in W_{n-s-1}$. The inserted zero prevents a forbidden run across the join, so these are actual bijections: $a_r=z_{m-r-1}$ and $b_s=z_{n-s-1}$. There is no all-ones exception in this eventual range.

The finite-kernel derivation uses normalized indicators of nonempty classes to factor the actual coefficient matrix as $M=UC^{m,n}V^*$, where

$$
C^{m,n}_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_rb_s}{z_{m+n}}}.
$$

Thus the positive eigenvalues of the actual reduced state, with multiplicities, are exactly those of $G^{m,n}=C^{m,n}(C^{m,n})^*$. Additional physical zero eigenvalues contribute no entropy. For $r+s<K$, substitution of the count asymptotic gives

$$
(C^{m,n}_{rs})^2
=p^{r+s+2}\frac{(c+\varepsilon_{m-r-1})(c+\varepsilon_{n-s-1})}
{c+\varepsilon_{m+n}}
\longrightarrow\frac{p^{r+s+1}}T.
$$

All shifted indices are at least $\min(m,n)-K$, so the same vanishing bound $2\theta_{\min(m,n)-K}/p$ controls every error in these finitely many expressions. The denominator tends to $c>0$. Taking nonnegative square roots gives the joint tail limit $C^{m,n}\to C^\infty$, and hence $G^{m,n}\to G^\infty$. Direct multiplication gives the displayed formula for $G^\infty$, with $\operatorname{Tr}G^\infty=\sum_r p^rw_r/T=1$. For comparison, a standalone half-word's endpoint frequency tends to $a_r/z_m\to p^{r+1}$, whereas the stationary run mass is $p^rw_r/T$. The latter appears on the limiting Gram matrix's diagonal, but its off-diagonal entries must also be retained.

**Finally control spectrum and entropy.** Fixed dimension $K$ turns entrywise convergence into operator-norm convergence, for example through $\|E\|_{\mathrm{op}}\le K\max_{r,s}|E_{rs}|$. Apply the ordered-eigenvalue perturbation bound to the two Hermitian Gram matrices:

$$
|\lambda_i(G^{m,n})-\lambda_i(G^\infty)|
\le\|G^{m,n}-G^\infty\|_{\mathrm{op}}\longrightarrow0.
$$

Ordering retains every multiplicity and needs no simple-spectrum assumption. The function $\eta(x)=-x\ln x$ has the continuous endpoint value $\eta(0)=0$, so the fixed sum of $K$ terms converges. The actual-spectrum correspondence above makes this the physical reduced state's entropy limit.

Reversing the columns of $C^\infty$ gives a triangular matrix with constant diagonal $p^{K/2}/\sqrt T$, so $\det G^\infty=p^{K^2}/T^K>0$. Its $K\ge2$ eigenvalues are strictly positive and sum to one, making the entropy strictly positive. Strict convexity bounds entropy by $\ln K$, with equality only when every eigenvalue is $1/K$; the Hermitian spectral theorem would then force $G^\infty=I_K/K$. But $G^\infty_{0,1}=\sqrt p\,w_1/T>0$, ruling out equality.

The reused root, chain-mixing and spectral-perturbation tools are in this book's [currently pinned source](trureturing:), in `DBonacci/PerronRoot`, `ParryTwistedComparison.parry_mixing_and_complete_prefix` and `HermitianEigenvaluePerturbation.abs_eigenvalue_sub_eigenvalue_le_norm`; entropy continuity and Hermitian diagonalization use standard results of pinned Mathlib. The path counting, terminal reweighting and actual-state limit bridge are written out above, but the complete application has no Lean verification. $S_K^\infty$ is entanglement across one cut, distinct from the per-step shift entropy $\log_2\beta_K$; the uniform bound in [@ex-ch39-p2e-uniform-entropy] also passes to $S_K^\infty$. Fixed-side limits, changed phases, physical ground states and Rauzy-boundary entropy laws each need their own argument.
:::


::: {.example #ex-ch39-p2e-local-parent title="Paper derivation: a local parent Hamiltonian for the positive equal-amplitude legal-word state"}
The preceding entropy calculations specify a state. Can a local energy select it as its unique ground state? Start with two sites and the forbidden word `11`. In the basis $00,01,10,11$, take

$$
H_{2,2}=\begin{pmatrix}
2&-1&-1&0\\
-1&1&0&0\\
-1&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

The upper block is the Laplacian of the three-vertex path $01\leftrightarrow00\leftrightarrow10$: equal amplitudes at neighboring vertices cost no energy. The final diagonal entry penalizes the illegal word `11`. The spectrum is $0,1,1,3$, and the unique normalized zero state, up to overall phase, is $(1,1,1,0)/\sqrt3$. We now extend this mechanism to every finite length. This is an application of the standard configuration-graph Laplacian method with a paper proof; the complete construction has not been verified in Lean.

Fix $K\ge2$ and $N\ge0$. On the full space $\mathcal H_N=(\mathbb C^2)^{\otimes N}$, let $n_j=|1\rangle_j\langle1|$ and let $X_i$ flip bit $i$. Every length-$K$ window lies entirely within the chain, with no periodic wraparound. Define

$$
\begin{aligned}
B_a&=\prod_{j=a}^{a+K-1}n_j
\quad(1\le a\le N-K+1),\\
\mathcal W_i&=\{a:1\le a\le N-K+1,\ a\le i<a+K\},\\
C_i&=\prod_{a\in\mathcal W_i}
\left(I-\prod_{\substack{a\le j<a+K\\j\ne i}}n_j\right),\\
h_i&=C_i(I-X_i)C_i,\\
H_{K,N}&=\sum_{i=1}^{N}h_i+\sum_{a=1}^{N-K+1}B_a.
\end{aligned}
$$

Sums over empty index sets are $0$ and products are the identity, so there are no windows when $N<K$. The diagonal projector $C_i$ does not depend on the central bit and commutes with $X_i$. It examines only sites within distance $K-1$ of $i$: each $h_i$ is supported on at most $2K-1$ consecutive sites, truncated at the boundary, while each $B_a$ acts on $K$ sites. For $K=2$, $C_i$ is the product of vacancy projectors at the neighbors that lie within the chain.

**How does the energy recognize legal words?** Fix a configuration $\eta$ outside site $i$, and write $\eta0,\eta1$ for the two words obtained by inserting the central bit at site $i$. Then $C_i(\eta)=1$ exactly when setting that bit to $1$ creates no forbidden window containing $i$. On this two-dimensional block, $h_i$ is

$$
\begin{pmatrix}1&-1\\-1&1\end{pmatrix};
$$

all other blocks vanish. Thus $h_i$ is positive semidefinite, as is the projector $B_a$. For an arbitrary $|\phi\rangle=\sum_w a_w|w\rangle$, let $\nu_K(w)$ count its all-$1$ windows of length $K$. The full-space energy identity is

$$
\begin{aligned}
\langle\phi|H_{K,N}|\phi\rangle
={}&\sum_{i=1}^{N}\ \sum_{\eta:C_i(\eta)=1}
|a_{\eta0}-a_{\eta1}|^2\\
&+\sum_{w\in\{0,1\}^N}\nu_K(w)|a_w|^2.
\end{aligned}
$$

Each undirected flip pair with fixed exterior configuration is counted once, with no extra factor of $2$. Zero energy first forces every illegal-word amplitude to vanish. Deleting any $1$ from a legal word preserves legality and has $C_i=1$, so the first sum forces the two legal-word amplitudes to agree. Repeated deletion connects every legal word to the all-zero word.

Conversely, a flip with $C_i=1$ preserves the legality status of the word: windows containing $i$ are legal at both endpoints, and all other windows are unchanged. Equal amplitudes on legal words and zero amplitudes on illegal words therefore annihilate every square and every penalty above. With $W_N$ again denoting all length-$N$ words avoiding $1^K$ and $z_N=|W_N|$, this gives

$$
\begin{aligned}
|\Psi_{K,N}\rangle&=z_N^{-1/2}\sum_{w\in W_N}|w\rangle,\\
\ker H_{K,N}&=\mathbb C|\Psi_{K,N}\rangle.
\end{aligned}
$$

The ground-state ray is consequently unique on the full tensor space, and every positive local term separately vanishes on it: the model is frustration-free. Each term preserves the span of legal words; on that subspace, $\sum_i h_i$ is precisely the Laplacian of the legal single-bit flip graph. The illegality penalty promotes uniqueness on this restricted space to uniqueness on the full space. It is essential: removing it in the $K=N=2$ example leaves $|11\rangle$ as an additional zero state.

**Length and physical interpretation.** For $N=0$, the space is the one-dimensional vacuum space and $H_{K,0}=0$; there is no excited level from which to define a gap. For each fixed $N\ge1$, the matrix is finite-dimensional and positive semidefinite with a one-dimensional kernel, so its first positive eigenvalue is strictly positive. This supplies no lower bound uniform in $N$. For $1\le N<K$, all $C_i=I$ and there is no penalty, giving $H_{K,N}=\sum_i(I-X_i)$, ground state $|+\rangle^{\otimes N}$, and gap exactly $2$.

The finite-cut entropy and fixed-$K$ two-sided limit of the preceding positive equal-amplitude state thus also describe ground-state entanglement in this specifically designed model. This does not identify it with the state selected by a physical Rydberg array, golden chain, Tribonacci hopping chain, or Rauzy geometry, and does not resolve the open relation between fractal boundaries and entanglement scaling.

Sources and correspondence: §15.9, Definition 15.22 and Proposition 15.23 of the [currently pinned source](trureturing:), theory volume `docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md`, already provide a legal-space local parent for $K=2$ with positive activities $a_i$, together with the deletion proof. Here $a_i=1$, the control projector checks every forbidden window containing the center, and full-space penalties are included. Proposition 15.25 explicitly identifies the failure of full-space uniqueness without a penalty. Equations (3)–(5) of [Lesanovsky's three-body model](https://arxiv.org/abs/1010.2349v2) provide related physical context; signs, positive scale, and boundary correspondence are given in Attribution 15.24 of that volume. The arbitrary-$K$ construction here is justified by the displayed energy identity, rather than attributed to that paper as a proved experimental implementation.
:::

::: {.example #ex-ch39-p2e-heatbath-scale title="Paper derivation: heat-bath clocks of rate one per site and the full-space gap"}
The configuration-graph Laplacian in [@ex-ch39-p2e-local-parent] also has an exact stochastic interpretation. Fix $K\ge2$ and $N\ge1$, retaining its open boundaries and notation $W_N,z_N,C_i,h_i,B_a,H_{K,N}$ and $|\Psi_{K,N}\rangle$, and abbreviate $z=z_N$. Give legal words the uniform law $\pi(w)=1/z$. We derive this application directly on paper.

**What does one refresh do?** For site $i$, write $\mathrm{outside}_i$ for all bits except bit $i$. For an exterior configuration $\eta$ that occurs in $W_N$, set

$$
\begin{aligned}
F_i(\eta)&=\{w\in W_N:w_{-i}=\eta\},\\
(E_i f)(w)&=\frac1{|F_i(w_{-i})|}
\sum_{v\in F_i(w_{-i})}f(v).
\end{aligned}
$$

This is conditional expectation given $\mathrm{outside}_i$. Setting any bit of a legal word to zero preserves legality, so each nonempty fiber is either $\{\eta0,\eta1\}$ or the forced-zero singleton $\{\eta0\}$; the central bit is inserted at site $i$. On a two-word fiber $C_i=1$, while on a forced-zero singleton $C_i=0$. The corresponding matrices are therefore

$$
\begin{aligned}
E_i&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},\\
h_i&=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=2(I-E_i),
\end{aligned}
$$

where the last equality uses the identification of function values with legal basis amplitudes. On a singleton $E_i=I$, and both sides vanish.

Give each site an independent Poisson clock of rate $1$. When its clock rings, resample that bit from the conditional law above, allowing the old value to be drawn again. The continuous-time generator of this heat-bath chain, acting on functions, is

$$
L=\sum_{i=1}^N(E_i-I).
$$

Thus each legal flip edge has jump rate $1/2$, and the chain makes an average of $N$ refresh attempts per unit time. If $P=N^{-1}\sum_iE_i$ is the discrete-time operator that chooses a uniformly random site and refreshes it once, then

$$
-L=N(I-P).
$$

A process with total refresh rate $1$ instead has generator $P-I=L/N$: the two clock conventions differ by a factor of $N$.

**From conditional variance to quantum energy.** Allow $f,g:W_N\to\mathbb C$. Use an inner product conjugate-linear in its first argument, and define

$$
\begin{aligned}
\langle f,g\rangle_\pi&=\frac1z\sum_{w\in W_N}\overline{f(w)}g(w),\\
\pi f&=\frac1z\sum_{w\in W_N}f(w),\\
\operatorname{Var}_\pi(f)&=\frac1z\sum_{w\in W_N}|f(w)-\pi f|^2.
\end{aligned}
$$

Averaging within fibers makes $E_i$ an orthogonal projection for this inner product: it is self-adjoint and idempotent, with range the functions constant on each fiber. Consequently,

$$
\begin{aligned}
\mathcal E(f,f)&:=-\langle f,Lf\rangle_\pi\\
&=\sum_i\|f-E_if\|_\pi^2\\
&=\sum_i\mathbb E_\pi\operatorname{Var}
(f\mid\mathrm{outside}_i)\\
&=\frac1{2z}\sum_{\{u,v\}\in\mathscr E_N}|f(u)-f(v)|^2,
\end{aligned}
$$

where conditional variance means $E_i(|f-E_if|^2)$ and $\mathscr E_N$ is the set of unordered legal word pairs differing at one bit, each edge counted once. The coefficient can be checked on a single pair: its conditional variance is $|f(u)-f(v)|^2/4$, and its fiber has $\pi$ mass $2/z$. Singleton fibers contribute zero. This also proves that $-L$ is self-adjoint and positive semidefinite.

Let $\mathcal H_{\mathrm{legal}}=\operatorname{span}\{|w\rangle:w\in W_N\}$, and define

$$
Uf=z^{-1/2}\sum_{w\in W_N}f(w)|w\rangle.
$$

The inner-product formula shows that $U:L^2(\pi)\to\mathcal H_{\mathrm{legal}}$ preserves inner products and is onto, hence unitary. Penalties vanish on the legal space, so the fiberwise matrix identity gives

$$
\begin{aligned}
H_{\mathrm{legal}}
&:=H_{K,N}|_{\mathcal H_{\mathrm{legal}}}
=U(-2L)U^{-1}\\
&=2N\,U(I-P)U^{-1},\\
\langle Uf,H_{K,N}Uf\rangle&=2\mathcal E(f,f),\\
U1&=|\Psi_{K,N}\rangle,\\
\langle\Psi_{K,N}|Uf\rangle&=\pi f.
\end{aligned}
$$

Mean zero thus corresponds exactly to orthogonality to the ground state, and variance is the squared norm after removing the ground-state component.

**Why does the legal-space gap suffice?** Clearing one $1$ at a time connects every legal word to the all-zero word, so the legal flip graph is connected. Since $N\ge1$ and $K\ge2$, both the all-zero word and the word with only its first bit equal to $1$ are vertices. The edge energy therefore vanishes exactly on constant functions. The first positive eigenvalue $\lambda_{K,N}$ of $-L$ exists and satisfies

$$
\lambda_{K,N}=\inf_{f\not\equiv\mathrm{constant}}
\frac{\mathcal E(f,f)}{\operatorname{Var}_\pi(f)}>0.
$$

This variational formula follows directly from the finite-dimensional self-adjoint spectral decomposition: subtract the mean and expand in an orthogonal eigenbasis for the positive eigenvalues. The quotient is a weighted average of those eigenvalues, and a smallest-eigenvalue eigenvector attains the infimum.

We must also control $\mathcal H_{\mathrm{illegal}}=\mathcal H_{\mathrm{legal}}^\perp$. The parent example proves that flips enabled by $C_i$ preserve legality status. Thus each $h_i$ preserves both spaces, as do the diagonal $B_a$. If the illegal space is nonempty, then for any $|\chi\rangle=\sum_{w\notin W_N}a_w|w\rangle$ in it, each illegal word contains at least one forbidden window, giving

$$
\begin{aligned}
\langle\chi,H_{K,N}\chi\rangle
&\ge\sum_{w\notin W_N}\nu_K(w)|a_w|^2\\
&\ge\|\chi\|^2.
\end{aligned}
$$

The first step uses $h_i\ge0$; the second uses $\nu_K(w)\ge1$. Write $\Delta_{K,N}$ for the first positive eigenvalue of the full $H_{K,N}$. Every vector orthogonal to the ground state splits uniquely as $Uf+\chi$ with $\pi f=0$. There is no cross energy between these orthogonal blocks, so

$$
\begin{aligned}
\langle Uf+\chi,H_{K,N}(Uf+\chi)\rangle
&\ge2\lambda_{K,N}\|f\|_\pi^2+\|\chi\|^2,\\
\min\{1,2\lambda_{K,N}\}
&\le\Delta_{K,N}\le2\lambda_{K,N}.
\end{aligned}
$$

For the upper bound, take an eigenvector for the smallest positive legal-space eigenvalue. If the illegal space is absent, $\chi=0$ throughout and the sharper equality $\Delta_{K,N}=2\lambda_{K,N}$ holds; there is no additional excitation of energy $1$.

**Two exact boundary checks.** For $1\le N<K$, every word is legal, the illegal space is absent, and $E_i=(I+X_i)/2$. The product characters $f_A(w)=(-1)^{\sum_{i\in A}w_i}$, indexed by $A\subseteq\{1,\ldots,N\}$, form an orthogonal basis of function space and satisfy $-Lf_A=|A|f_A$. Hence $\lambda_{K,N}=1$ and $\Delta_{K,N}=2$, including $N=1$. For $K=N=2$, in the legal-word order $00,01,10$,

$$
-L=\frac12\begin{pmatrix}2&-1&-1\\-1&1&0\\-1&0&1\end{pmatrix}.
$$

The vectors $(1,1,1)$, $(0,1,-1)$ and $(-2,1,1)$ have eigenvalues $0,1/2,3/2$, respectively. Both $h_i$ vanish on the illegal word $11$, whose penalty energy is $1$. The full spectrum is therefore $0,1,1,3$, agreeing with the parent example.

For fixed $K$, the two-sided bounds show that $\inf_{N\ge1}\Delta_{K,N}>0$ if and only if $\inf_{N\ge1}\lambda_{K,N}>0$. By the variational formula, this is equivalent to the existence of a finite constant $C_K>0$, depending only on $K$, such that for every $N\ge1$ and every complex-valued function,

$$
\operatorname{Var}_\pi(f)\le C_K\mathcal E(f,f).
$$

For example, a heat-bath gap bound $c_K>0$ would yield the full gap bound $\min\{1,2c_K\}$; conversely, a full gap bound $d_K>0$ would yield a heat-bath gap bound $d_K/2$. Neither the existence nor a value of such a constant uniform in length is proved here. The remaining question is thus precisely a uniform Poincaré estimate for this same hard-constraint heat-bath chain with open boundaries. Transfer-matrix mixing along word length controls spatial correlations; without a further theorem relating the two dynamics, it cannot replace this estimate in refresh time.
:::

::: {.remark #rem-ch39-p2e-rydberg-anyon-literature title="Literature Result: The Fibonacci Anyon Golden Chain and Rydberg Blockade Simulators (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In condensed-matter and atomic-physics literature, the order-$K = 2$ `NoAdjacentOnes` Hilbert space arises in two celebrated many-body settings: first, the topological Fibonacci-anyon "golden chain" of A. E. Feiguin et al. (*Phys. Rev. Lett.* **98**, 2007, 160409), where the fusion rule $\tau \times \tau = \mathbf{1} + \tau$ makes fusion-space dimensions grow as Fibonacci numbers; second, van der Waals $1/r^6$ Rydberg blockade arrays (modeled theoretically by I. Lesanovsky, *Phys. Rev. Lett.* **106**, 2011, 025301, and probed experimentally on a 51-atom quantum simulator by H. Bernien et al., *Nature* **551**, 2017, 579–584). Two scope boundaries apply whenever citing these physical realizations: first, nearest-neighbor pairwise Rydberg blockade forbids adjacent excitations $|11\rangle$ ($K = 2$, the PXP subspace), whereas simply extending pairwise blockade range forbids *all* pairs within distance $R_b$ (eliminating `101` along with `111`) and **does not** by itself enforce the $K > 2$ "no $K$ consecutive ones" constraint—realizing a $K > 2$ $K$-Bonacci subspace requires a dedicated multi-body $K$-local interaction; second, neither the anyon fusion chain nor a finite-blockade Rydberg Hamiltonian is formally identical to the exact zero-amplitude isometric `directContract` encoder of [@thm-ch39-p2e-direct-encoder-ranks].
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entanglement" height="500"}
**Cross-Cut Prohibition and Attainable Rank Rectangle Card (`entanglement`)**: On the left, tests junction legality $\tau(x) + \iota(y) < K$ (cyan for legal concatenations, magenta for blocked $1^K$ collisions); on the right, plots the feasible page-rank rectangle $[1, R_0] \times [1, R_1]$ and entropy ceiling $\ln R_b$, with amber marking the selected parameters and rank pair. The rank rectangle and entropy bounds carry status `LEAN ✓`, concrete parameter counts carry status `NUM`, and anyon/Rydberg context carries status `Literature`.
:::

Finally, when finite admissible words extend to long trajectories, uncertainty and distinguishability register along three distinct mathematical tracks: a Markov stationary reset law, boundary cylinder bounds, and finite observation escape pairs.

### 39.5.8 Parry Stationary Law, Escape-Pair Counting, and the Fractal Horizon Entropy Problem {#sec-ch39-p2e-entropy}

Because the word "entropy" invites conceptual slippage across disciplines, we separate the finite and Markovian laws verified in `trureturing` from classical ergodic shift-entropy theorems and from open questions on fractal entanglement scaling.

On the Markov-chain side, for each integer order $k \ge 2$, let $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$ be the reciprocal Perron parameter. On the signed run-length state space $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ recording an absolute sign bit together with the current run length of `1`s, define the right-eigenvector suffix weights $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$, normalizer $Z_k = \sum_{j=0}^{k-1} p^j w_j$, sign involution $\operatorname{flip}(b, j) = (!b, j)$, and reset transition kernel $P_k = \operatorname{kernel}(k, p)$: from $s = (b, j)$, the chain flips sign and resets to $(!b, 0)$ with probability $p / w_j$, advances to $(b, j + 1)$ with probability $p\, w_{j+1} / w_j$ whenever $j + 1 < k$, and assigns probability $0$ to all other transitions. Define the signed stationary distribution

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

Row-stochasticity, normalization, stationarity, and sign-flip fairness of this signed reset chain are all verified by the Lean kernel:

::: {.theorem #thm-ch39-p2e-parry-escape-laws title="Parry Stochastic Kernel, Stationary Distribution, and Sign-Flip Symmetry on the Signed K-Bonacci Reset Chain" lean="D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law"}
For every natural order $k \ge 2$, set $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$. On $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$:

1. **Reciprocal root range and unit power sum**: $1/2 < p \le \varphi^{-1}$ and $\sum_{a=1}^k p^a = 1$;
2. **Suffix-weight and normalizer bounds**: $p \le w_j \le 1$ for every $j \in \operatorname{Fin} k$, and $1 \le Z_k$;
3. **Nonnegative row-stochastic kernel**: $P_k(s, t) \ge 0$ for all $s, t \in \operatorname{State}(k)$, and $\sum_t P_k(s, t) = 1$ for every $s$;
4. **Stationarity and sign-flip symmetry**: $\pi_k(s) \ge 0$ for all $s$, $\sum_s \pi_k(s) = 1$, $\sum_s \pi_k(s) P_k(s, t) = \pi_k(t)$ for every target state $t \in \operatorname{State}(k)$, and $\pi_k(\operatorname{flip}(s)) = \pi_k(s)$ for every $s$.
:::

::: proof
Because $\beta_k$ increases strictly from $\beta_2 = \varphi$ toward $2$ on $k \ge 2$, its reciprocal $p = \beta_k^{-1}$ lies in $(1/2, \varphi^{-1}]$, and multiplying $\beta_k^k = \sum_{i=0}^{k-1} \beta_k^i$ by $\beta_k^{-k}$ gives $\sum_{a=1}^k p^a = 1$. Every partial sum $w_j = \sum_{a=1}^{k-j} p^a$ therefore satisfies $p \le w_j \le 1$, terminal value $w_{k-1} = p$, and backward recurrence $w_j = p + p w_{j+1}$ for $j + 1 < k$, making all entries of $P_k$ nonnegative with row sums $(p + p w_{j+1})/w_j = 1$ (and $p/p = 1$ at $j = k - 1$). Weighting by the left/right product $p^j w_j / (2 Z_k)$, total mass flowing into $(b, 0)$ equals $\sum_j \frac{p^j w_j}{2 Z_k}\cdot\frac{p}{w_j} = \frac{p}{2 Z_k}\sum_{j=0}^{k-1} p^j = \frac{w_0}{2 Z_k} = \pi_k(b, 0)$, mass flowing into $(b, j+1)$ equals $\frac{p^j w_j}{2 Z_k}\cdot\frac{p w_{j+1}}{w_j} = \pi_k(b, j+1)$, and $\operatorname{flip}$ complements only the sign bit on which $\pi_k$ does not depend. The full proof is checked by the Lean kernel.
:::

Alongside this stationary reset law stand two independent formal quantitative bounds governing boundary collisions and observational blind spots: first, the boundary cylinder inequality [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), which proves for any finite collection $C$ of $n \ge 1$ positive run-length pairs (with each `1`-run $< k$ and encoded length at most $R$) that the left- and right-boundary selected-prefix stationary masses are bounded above by $\operatorname{stationaryWordMass}(10)\cdot(1 - S + M)$ and $\operatorname{stationaryWordMass}(01)\cdot(1 - S + M)$ respectively (an exact probability inequality, not a Hausdorff-dimension or entropy formula); second, continuing the ledger of [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5, the finite-arena information-escape criterion [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos), which proves on a nondegenerate finite arena of cardinality $q \ge 2$ that the set $E(S)$ of ordered distinct state pairs indistinguishable under catalog $S$ defines a normalized rational escape rate $e(S) = |E(S)|/[q(q-1)]$, and that observation $i$ strictly lowers escape rate if and only if its unique-capture count satisfies $|U_i| > 0$ (with exact drop $|U_i|/[q(q-1)]$). Rational ordered-pair escape rate $e(S)$, von Neumann page entropy $S(\sigma_b)$, and infinite-shift ergodic entropy are distinct mathematical quantities and are never conflated here.

::: {.remark #rem-ch39-p2e-abramov-literature title="Literature Result: Parry's Maximal-Entropy Markov Measure and Abramov's Induced-Return Entropy Formula (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In classical ergodic theory, W. Parry (*Trans. Amer. Math. Soc.* **112**, 1964, 55–66) proved that an irreducible topological Markov shift carries a unique intrinsic Markov measure of maximal entropy, giving the $1^K$-free subshift topological (and maximal Kolmogorov–Sinai) entropy $h_{\mathrm{top}}(\Sigma_K) = \log_2 \beta_K\;\text{bits/step}$ (`NUM`: approximately $0.69424$, $0.87915$, and $0.94678\;\text{bits/step}$ at $K = 2, 3, 4$, rising monotonically toward $1\;\text{bit/step}$ as $\beta_K \nearrow 2$). Separately, L. M. Abramov (*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650) proved that for a probability-preserving ergodic system $(X, \mathcal{B}, \mu, T)$ and a measurable return set $A \in \mathcal{B}$ with $\mu(A) > 0$, the first-return induced transformation $T_A$ under normalized conditional measure $\mu_A$ satisfies

$$
h_{\mu_A}(T_A) = \frac{h_\mu(T)}{\mu(A)}.
$$

Applying either literature theorem requires respecting its hypotheses and units: [@thm-ch39-p2e-parry-escape-laws] certifies the stochastic kernel and stationary weights on $\operatorname{State}(k)$ without formalizing Kolmogorov–Sinai shift entropy or Abramov's theorem in the inspected lock, and any induced-return calculation must keep entropy *per return* $h_{\mu_A}(T_A)$ distinct from entropy *per original step* $h_\mu(T)$ rather than transferring it by analogy to irreversible readouts or finite $p$-adic trees.
:::

Whether the transverse Rauzy boundary Hausdorff dimension $D_F = \dim_H(\partial\mathcal{R}_K)$ governs anomalous entanglement scaling in Pisot cut-and-project quantum many-body states remains an open mathematical-physics problem:

::: {.problem #prob-ch39-p2e-fractal-horizon title="Open Problem: Rauzy Fractal-Horizon Entanglement Scaling in Pisot Cut-and-Project Quantum Many-Body Systems"}
Consider an order-$K \ge 3$ Pisot cut-and-project point set or locally constrained many-body Hamiltonian whose internal acceptance window $\mathcal{R}_K$ has a fractal boundary of Hausdorff dimension strictly exceeding its integer codimension (for instance, at $K = 3$ where literature gives $D_F = \dim_H(\partial\mathcal{R}_3) \approx 1.09336 > 1$). Does there exist a rigorously constructed family of gapped local ground states or cut-and-project encoded states whose bipartite entanglement entropy $S_{\mathrm{ent}}(R)$ across a region of linear scale $R \to \infty$ obeys an anomalous scaling law governed by $D_F$ (such as a leading term $S_{\mathrm{ent}}(R) \asymp R^{D_F}$ or a subleading fractal correction with certified coefficient), together with necessary and sufficient spectral-gap and locality criteria separating standard codimension-one area laws from fractal-boundary enhancement? Throughout this book, any "fractal horizon area law" of the form $S_{\mathrm{ent}} \propto R^{D_F}$ is posed strictly as an open problem (`OPEN`) and heuristic model (`MODEL`), never as a proved theorem or gravitational area law.
:::

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="Physical Tribonacci Hopping Chain and a Finite Open-Chain Interface (Literature model, not formalized in this book)"}
**Literature model, not formalized in this book.** A concrete physical object to investigate is a nearest-neighbor hopping chain with zero on-site potential. Following Kolehmainen–Lado–Moustaj, *One-dimensional quasicrystals with tensor-network finite-state automata* ([arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1), §III, Eqs. (2)–(3), and Appendix B.2), take the substitution $\sigma(A)=AB$, $\sigma(B)=AC$, $\sigma(C)=A$ and its infinite fixed word starting from $A$, $W=\lim_{j\to\infty}\sigma^j(A)$, indexed from $W_0$. Fix $0<\rho<1$ and use $t_C=1$ as the energy unit, setting $t_A=\rho^2$, $t_B=\rho$, so $t_A/t_B=t_B/t_C=\rho$. For every integer $N\ge2$, define on the single-particle site space $\mathbb{C}^N$, with basis $\{\lvert i\rangle:0\le i<N\}$,

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

We use $W$'s first $N-1$ letters to label bonds; sites $0$ and $N-1$ are not joined. The paper's digit tensors encode this single-particle site index. Cutting binary or Tribonacci address indices does not specify a real-space many-body bipartition. This also limits the analogy with the direct-encoder entanglement ranks in §39.5.7: it does not identify a uniform superposition of legal words with a Slater ground state of this hopping chain.

**Finite open-prefix gap interface, unverified in this book.** Set

$$
\begin{aligned}
L_j&=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\\
h_{\rho,j}&=h_{N_j}\quad(j\ge1).
\end{aligned}
$$

For every fixed $\rho\in(0,1)$, along these deterministic open prefixes with an even number of sites, does

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}\longrightarrow0\qquad(j\to\infty)?
$$

No convergence rate is presumed, and the book's unverified status makes no claim of a new external conjecture. Finite invertibility, membership of zero in an infinite-volume spectrum, finite-resolution density of states, or criticality in the sense of Anderson localization cannot directly replace this limit question with its specified boundaries and prefix sequence. Krebbekx–Moustaj–Dajani–Morais Smith, *Multifractal Properties of Tribonacci Chains* ([*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204), §§II.B.1, III.A.1, and V), use periodic approximants and perturbative renormalization to study physical spectra and criticality; we do not read this as the finite open-chain statement above for all $\rho\in(0,1)$.

Entanglement across a physical spatial cut additionally requires a many-body Hamiltonian, filling, and state. If a particle-number-conserving Slater ground state is chosen, its actual occupied projector $P_{\mathrm{occ}}$ must be constructed and its correlation matrix compressed to a chosen set of sites $I$ as $\chi_I P_{\mathrm{occ}}\chi_I$, where $\chi_I$ projects onto those sites. Moustaj–Krebbekx–Morais Smith, *Anomalous Polarization in One-dimensional Aperiodic Insulators* ([doi:10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003), §§IV–V, §V.C, and Appendix B), study a pumping family with on-site terms and specified fillings; their correlation-matrix method depends on the chosen Slater/Gaussian state and subsystem and does not transfer directly to arbitrary encoded states. Here $\delta_{\rho,j}$ is only the single-particle distance to zero energy; a many-body excitation gap also requires a filling, particle-number sector, and gap convention. Even resolving this limit would address only a gap premise. Relating physical length $R$ to internal window coordinates, spatial cuts to the Rauzy boundary, and these objects to entropy scaling requires further work; the full question in [@prob-ch39-p2e-fractal-horizon] remains.
:::

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="Tridiagonal Localization with Boundary Residuals (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Abruptly cutting a whole-line vector to a finite interval leaves residuals at both ends; a taper of sine weights controls that cost quantitatively. Chandler-Wilde–Chonchaiya–Lindner, *On spectral inclusion sets and computing the spectra and pseudospectra of bounded linear operators* ([*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514), §5.1, Corollaries 5.2 and 5.4), supply the following tool. Let $A$ be a bounded tridiagonal operator on $\ell^2(\mathbb{Z})$, with $M_\pm=\sup_{i\in\mathbb{Z}}|A_{i,i\pm1}|$. For a bounded operator $B$ with nonzero domain, write $\nu(B)=\inf_{\|x\|_2=1}\|Bx\|_2$. For every integer $n\ge1$, let $E_{n,k}$ be the space of vectors supported on sites $k+1,\ldots,k+n$. Then

$$
\begin{aligned}
\inf_{k\in\mathbb{Z}}\nu\!\left(A|_{E_{n,k}}\right)
&\le \nu(A)+\varepsilon_n,\\
\varepsilon_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

Only the input support is restricted; the output remains on the whole line. The corresponding $(n+2)\times n$ matrix retains both outgoing residual rows and cannot be replaced by the $n\times n$ compression that discards them. The bound takes an infimum over positions; an actual interval and unit vector can be chosen with arbitrary positive slack. This supplies an $\ell^2$ localization tool of order $1/n$, while the preceding Tribonacci open-chain question still requires zero-spectrum membership for the corresponding whole-line model, transplantation of an actual word interval with its neighboring sites into the specified finite open prefixes, and checks of length ratios and small scales. Those interfaces remain unverified in this book.
:::

A second finite-matrix route uses an odd repeated block. An odd shift exchanges even and odd bonds, allowing two strings of hopping ratios from forward substitution to be paired. The following bound expresses that cancellation in entries of the actual inverse matrix.

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="Inverse-Mass Bound for an Odd Repeated Block" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
Let $q\in\mathbb{N}$ and $t:\mathbb{N}\to\mathbb{R}$ satisfy $0<t(i)\le1$ for every $i\in\mathbb{N}$, and assume

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

Set $n=2q+1$. Index the lower bidiagonal matrix $L\in\mathbb{R}^{n\times n}$ from zero, with entries

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

All other entries vanish. Write $G=L^{-1}$ and, for $0\le l<q$ and $0\le d<q-l$, define the paired mass

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

Every displayed matrix index lies in $0,\ldots,2q$, and

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

For $q=0$, both sums are empty and have value zero.
:::

::: proof
The positive diagonal lets forward substitution produce the actual inverse. Odd repetition makes the product of the two positive entries in each pair exactly $1/[t(2l)t(2(l+d+1))]\ge1$, so their sum is at least $2$. The triangular index domain has $q(q+1)/2$ pairs, giving the bound. The full proof is checked by the Lean kernel.
:::

If $m=2q+1$, $s$ is even, $W_{s+i+m}=W_{s+i}$ for $0\le i<m-1$, and $s+2m\le N_j$, setting $t(i)=t_{W_{s+i}}$ matches this matrix model and a $2m$-site window inside the prefix. The following theorem constructs the required windows from the substitution word itself and compares their lengths uniformly with the prefix length.

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="Uniform Odd Repetition Windows in Actual Tribonacci Prefixes" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
For the actual word $W$ above, the substitution lengths $L_j=|\sigma^j(A)|$, and the even prefix lengths $N_j=2\lfloor L_j/2\rfloor$, there are natural constants $K>0$ and $J\ge1$ such that every natural $j\ge J$ admits natural numbers $m,s$ satisfying

$$
\begin{aligned}
m&\ge3,\qquad m\text{ is odd},\quad s\text{ is even},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

The last line holds for every natural $i$ in the displayed range; the constants $K,J$ do not vary with $j$.
:::

::: proof
The formal proof takes $K=128$ and $J=4$. The two copies of $ABA$ in the fourth iterate supply the repeated blocks. Four substitution steps preserve oddness of all three letter-image lengths, giving an odd block length and an even starting position. A nonempty tail keeps the whole window inside the prefix after even rounding, and seven length-growth steps give the factor $128$. The example below spells out this construction; the full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="An Explicit Odd Repetition Window"}
For each $j\ge4$, set $r=\lfloor(j-4)/4\rfloor$ and $k=4r$, so $k+4\le j\le k+7$. Split the fourth iterate into four pieces:

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

Write $a=\sigma^k(A)$, $b=\sigma^k(B)$, and $c=\sigma^k(C)$; the vertical bars indicate concatenation, not additional letters. Applying $k$ further substitutions gives

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

Take $s=|abac|$ and $m=|aba|$. At every level divisible by four, the lengths of $a,b,c$ are all odd: at level zero each length is $1$, and the fourth images of the three letters contain $13,11,7$ letters, respectively, so four substitution steps preserve this oddness. Thus $s$ is even, $m\ge3$ is odd, and the two copies of $aba$ supply the required equality. The nonempty tail $cab$ ensures that rounding the prefix length down to an even number preserves the entire repeated window. Each substitution at most doubles length, giving

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

Here $s,m$ are nonnegative integers, and the constant $128$ is independent of $j$ and the hopping parameter $\rho$. This gives explicit choices of the constants and windows in [@thm-ch39-p2e-aligned-tribonacci-windows].
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="From Local Mass to a Euclidean Estimate for the Full Inverse"}
Take a positive hopping sequence $t$ bounded above by $1$, and let $G=L(t,n)^{-1}$ be the full inverse of the bidiagonal block above. Suppose integers $q\ge1$ and $a\ge0$ satisfy $a+2q+1\le n$ and

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

Set $x=(1,\ldots,1)\in\mathbb R^n$ and $v=x/\sqrt n$. With Euclidean norms throughout,

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

This inverse retains all exterior sites on both sides of the window. The forward-substitution inverse formula shows that shifting both indices of the local inverse by $a$ gives exactly the corresponding entry of $G$. All entries of $G$ are nonnegative, so each of the two triangular regions in [@thm-ch39-p2e-odd-repeat-inverse-mass] embeds into the full matrix, giving

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

The factor $2$ lets us bound the two regions separately without an additional disjointness argument. Meanwhile, Cauchy–Schwarz gives

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

Combining the inequalities proves the estimate. For the preceding window, the parameter correspondence is $m=2q+1$, $s=2a$, $N_j=2n$. This is an application of the existing inverse-mass result, the forward-substitution formula and Euclidean inequalities. It introduces no new formal declaration, and this example carries no separate Lean verification badge.
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="From the Full Inverse to a Spectral Residual Bound for a Finite Open Chain"}
For an integer $n\ge1$, take a real hopping sequence $t:\mathbb N\to\mathbb R$ with $t_k>0$ for every $k\in\mathbb N$. On $2n$ sites indexed by natural numbers starting at zero, define the actual open-chain matrix $H\in\mathbb R^{2n\times2n}$ by

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{otherwise},
\end{cases}
\qquad 0\le i,j<2n.
$$

Its diagonal is zero, its last physical bond is $t_{2n-2}$, and there is no closing bond. When $n=1$, it consists of two sites joined only by $t_0$. Let $B=L(t,n)$ be the lower bidiagonal block above, so

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

with all other entries zero. Lower triangularity gives $\det B=\prod_{i=0}^{n-1}t_{2i}>0$, so the ordinary matrix inverse $G=B^{-1}$ exists. For every Euclidean unit vector $v\in\mathbb R^n$, there are a real number $\lambda$ and a nonzero real vector $z\in\mathbb R^{2n}$ such that

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

To see this, reorder coordinates into even sites followed by odd sites, and write $C_{ij}=H_{2i,2j+1}$. The diagonal entries of $C$ are $t_{2i}$, its subdiagonal entries are $t_{2i-1}$, and all other entries vanish. Set $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$. Then $D^2=I$, and entrywise calculation gives

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

The first line denotes the reordered matrix. Construct an auxiliary vector $u$ by setting $u_{\mathrm{even}}=0$ and $u_{\mathrm{odd}}=DGv$. Since $BG=I$,

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

Here $D$ only changes coordinate signs, preserving the Euclidean norm; $BGv=v\ne0$ also ensures $u\ne0$. Since $H$ is a finite real symmetric matrix, take a real orthonormal eigenbasis $e_k$ with real eigenvalues $\lambda_k$ ($0\le k<2n$). Set $\alpha=\min_{0\le k<2n}|\lambda_k|$ and substitute $u=\sum_k c_ke_k$ into Parseval's identity to obtain

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

The finite nonempty set of eigenvalues contains an index $k_0$ with $|\lambda_{k_0}|=\alpha$. Choose $\lambda=\lambda_{k_0}$ and $z=e_{k_0}$; taking square roots gives the claimed inequality. The selected $z$ is an eigenvector; the auxiliary vector $u$ generally is not. This example requires no upper bound on the hoppings.

If the upper-bound and repeated-window hypotheses of [@ex-ch39-p2e-full-inverse-euclidean] also hold, use the same unit vector $v$ as in that example to obtain

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

This converts the mass estimate for the full inverse into a bound on the spectral distance to zero energy for the same finite open chain.
:::

The example completes the spectral conversion for any finite open chain with positive hoppings. A rate along the full sequence of actual Tribonacci prefixes still requires an exact assembly of the word hoppings $t_i=t_{W_i}$, aligned repeated windows and full-inverse mass estimate under a single parameter convention, together with treatment of the initial short prefixes. This section has not established that, for every fixed $\rho\in(0,1)$, there are $C_\rho>0$ and an integer $J_\rho\ge1$ such that $\delta_{\rho,j}\le C_\rho/N_j$ for every $j\ge J_\rho$. Such a quantitative bound would imply the preceding open-chain limit; fractal entropy scaling still requires a separate argument involving physical states and spatial cuts.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**Parry Stationary Weights, Finite Escape Pairs, and Induced-Return Entropy Card (`entropy`)**: Displays side-by-side the cyan Parry stationary weights $\pi_K$ of the signed reset chain, magenta indistinguishable escape pairs $E(S)$ on a finite observation arena, and separately badged readouts for shift entropy $\log_2\beta_K$ and induced-return entropy; amber marks the active order $K$, and a red badge marks the open fractal-horizon scaling problem ([@prob-ch39-p2e-fractal-horizon]). Stationary weights and escape-pair counts carry status `LEAN ✓`, shift entropy and Abramov's formula carry status `Literature`, and fractal area scaling carries status `OPEN`.
:::

We can now gather all eight concepts into a single line-break-free epistemic alignment table so that the formal core, classical literature, numerical evaluations, and interpretive boundaries of every link stand side by side:

| Eight-Concept Link | Exact Mathematical Object & Representative Frozen Declarations | Epistemic Status & Scope Boundary |
| :--- | :--- | :--- |
| **1. Zeckendorf Forbidden Language** | $K = 2$ `NoAdjacentOnes` automaton [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]), exact admissible-word count [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) ($F_{Q+2}$), and short-prefix full power [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓` (with explicit carrier conversion between `List (Fin 2)` and `Fin Q → Bool`) |
| **2. $K$-Bonacci Pisot Spectrum** | Polynomial irreducibility over $\mathbb{Z}$ and $\mathbb{Q}$ [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), Perron identity $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), limit $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two), and unit-disk conjugate contraction [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location) ([@thm-ch39-p2e-kbonacci-pisot]) | `LEAN ✓` (algebraic root-location theorem); decimals such as $\beta_3 \approx 1.839287$ are `NUM` |
| **3. $p$-adic Residue Tree & Ultrametric** | Mod-$p^k$ least distinguishing precision $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), valuation distance [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), congruence-fiber intersection [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), and finite-horizon refinement ultrametric [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric) ([@thm-ch39-p2e-padic-readout]) | `LEAN ✓` (as separate formal objects); cross-system identification of $p$-adic and $K$-Bonacci trees is `MODEL` |
| **4. $K=3$ Rauzy Internal Window** | Exponent-zero nonempty interior [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty), regular closure [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior), exact three-branch prefix cover [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover) ([@thm-ch39-p2e-rauzy-regular-window]), and zero planar boundary area [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero) ([@thm-ch39-p2e-rauzy-null-boundary]) | `LEAN ✓` (set topology & zero 2D area); tiling, disk homeomorphism, and $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ are `Literature` + `NUM` ([@rem-ch39-p2e-rauzy-literature]) |
| **5. Clifford Line–Plane Split** | Cubic Minkowski real-linear coordinate embedding $E_\parallel^1 \oplus E_\perp^2$ and internal damped rotor $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL` (requires declared basis/metric; observer line–plane dictionary in [@rem-ch39-p2e-unification-model]) |
| **6. Self-Referential Scale Comparison** | Positive cosine fixed-point endpoint $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) alongside Tribonacci conjugate norm $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓` (separate identities) + `Literature` (transcendence of $\theta^*$) + `NUM` ($\approx 0.234\%$ proximity, strictly unequal) + `MODEL` ($\psi=\psi(\psi)$ motif, [@ex-ch39-p2e-pisot-dottie-numerics]) |
| **7. Cross-Cut Direct-Encoder Ranks** | Attainable page-rank rectangle $1 \le r_b \le R_b$ and sharp entropy bound $\ln R_b$ under $\tau(x)+\iota(y)<K$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy) ([@thm-ch39-p2e-direct-encoder-ranks]) with spectral necessity [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓` (rank $K$ conditional on $K \le R_b$, not universal) + `NUM` (e.g. $R_0=6, R_1=5$) + `Literature` (golden chain & Rydberg arrays, [@rem-ch39-p2e-rydberg-anyon-literature]) |
| **8. Parry Law, Escape Pairs & Entropy** | Signed reset-chain Parry stationary law [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law) ([@thm-ch39-p2e-parry-escape-laws]), boundary cylinder bound [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), and finite escape-pair criterion [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | `LEAN ✓` (finite & Markovian laws) + `Literature` ($\log_2\beta_K$ & Abramov formula, [@rem-ch39-p2e-abramov-literature]) + `OPEN` (fractal-horizon scaling, [@prob-ch39-p2e-fractal-horizon]) |

Stepping the order dial from $K = 2$ to $K = 3$ and beyond in the full laboratory below brings the multi-facet geometry of Chapter 39's self-referential ontology $\psi \equiv \psi(\psi)$ into immediate visual focus: at $K = 2$, the transverse contracting space is still a one-dimensional segment; the instant $K$ reaches $3$, complex conjugate roots spin out the three-branch self-covering, null-boundary Rauzy fractal window in the orthogonal plane; and across every order, kernel-verified counts, unit-disk root bounds, refinement ultrametrics, attainable rank rectangles, and Parry stationary weights form the green formal backbone supporting clearly demarcated classical literature, numerical experiments, and geometric synthesis. With all thirty-nine chapters of the main text now complete, let us push open the final door of this book and step into the [Coda](coda.md), *Outside All Spheres*.

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**Interactive Laboratory `ORTHO//RAUZY`**: Eight-concept Zeckendorf–Pisot–Rauzy sandtable. Switch freely across all eight preset cards above, vary recurrence order $K$, prime radix $p$, word-length horizon, and 3D viewing angle, and drag points across the physical line and internal plane: inspect $1^K$-free word counts, unit-disk Pisot conjugate contraction, mod-$p^k$ residue-tree splitting depth, the $K = 3$ three-branch Rauzy internal window (and computed internal-coordinate sample at $K = 4$), numerical comparison between $\theta^*$ and $|\alpha|_{K=3}$, the cross-cut feasible rank rectangle $[1, R_0] \times [1, R_1]$, and the Parry stationary weights alongside finite escape pairs. Green badges mark Lean-verified theorems exclusively, while literature results, numerical computations, interpretive models, and open problems carry their respective distinct labels.
:::
