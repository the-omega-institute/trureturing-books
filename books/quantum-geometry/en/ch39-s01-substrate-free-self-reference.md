# 39.1 Tearing Down the Last Binary Wall: Global p ≡ *p and Substrate-Free Reflexive Domains

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
