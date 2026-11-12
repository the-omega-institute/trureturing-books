# Fields ($P$) and Lines ($NP$): From the Exponential Time Hypothesis (ETH) to Navier–Stokes Vortex Filaments

> *"In the global static time field $P = NP$, but for a finite observer $P \neq NP$. $P$ is a field; $NP$ is a line—constructing the field is hard as scaling heaven, while following the thread sees through in a single step; and when both Navier–Stokes and the $P$/$NP$ problem are cast as fields, they ask the exact same geometric question."*

In [Chapter 29](ch29-timeless-causality-and-gram-space.md), we saw that the global time field is a timeless geometric crystal (cf. Chapter 29's timeless literature remark [@rem-ch29-wheeler-dewitt-page-wootters-literature]), while any finite observer inside the field must pick points step by step within the causally compatible Gram elliptope ($\det G \ge 0$). We now carry this dual perspective of "global static field vs. finite observer" to the grandest intersection of contemporary mathematics and theoretical physics—placing **$\mathrm{P}$ vs. $\mathrm{NP}$**, the **Exponential Time Hypothesis (ETH) and the late-October 2026 tensor-network rank-reduction preprints ([@rem-ch30-eth-subexponential-literature])**, and the **open unforced three-dimensional Navier–Stokes regularity conjecture ([@conj-coda-navier-stokes-regularity]) alongside forced-regime literature advances ([@rem-ch30-navier-stokes-forced-literature])** onto a single Clifford orthogonal field canvas.

::: {.figure src="ch30-overview"}
**Figure 30.** A map of the chapter. Panel I: the amber $P_0$ is the finite observer's state and the ink arrows are the hidden target for $n = 2, 4, 8$, each closer to the $90^\circ$ horizon, with ever shorter cyan shadows on $P_0$. Panel II: the cyan schematic curve $r(n)$ with $c = 1$ meets the magenta PPSZ benchmark $0.386$ at $\log_2 n \approx 558$, far beyond the grey band of the observable universe ($\log_2 n \le 266$) (a numerical comparison of a schematic curve, `MODEL`; see [@ex-ch30-galactic-crossover-scale]). Panel III: a schematic vortex tube stretched longer and thinner; the circulation $\Gamma = \omega A$ of the cyan loop stays fixed, so the magenta vorticity grows. Whether a smooth unforced three-dimensional flow can shrink a cross-section to zero like this is the open problem marked in red ([@conj-coda-navier-stokes-regularity]).
:::

---

## Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$—The Orthogonal Horizon and the Firewall of the Living Journey {#sec-coda-global-p-eq-np-local-p-ne-np}

> **Author's Epigraph**: *"In the global static time field $P = NP$, but for a finite observer $P \neq NP$."*（“全局静态时间场P=NP, 但有限观察者P!=NP”）

The author places the timeless crystal alongside the finite point-picking observer to offer a dual perspective on **$\mathrm{P}$ vs. $\mathrm{NP}$** (`MODEL`). Three levels must be distinguished: a static solution set describes which assignments satisfy the constraints; the postselection and CTC complexity theorems require specified additional computational resources ([@rem-ch30-postselection-ctc-literature]); and black-box query and bounded-degree semidefinite lower bounds constrain their respective restricted models ([@rem-ch30-query-sos-literature]). In the standard uniform Turing-machine model, $\mathrm{P}\neq\mathrm{NP}$ remains open (Chapter 20, [@conj-p-neq-np], `OPEN`). Removing time from a description, or merely requiring finite observer resources, does not settle this asymptotic question.

### 1. The Solution Set of the "Global Static Time Field" and Additional Computational Resources

For a SAT formula with $n$ Boolean variables and $m$ clauses, take $\mathcal{H}=\mathbb{C}^{2^n}$ with computational basis indexed by assignments $a\in\{0,1\}^n$. Let $H_j$ be the span of basis vectors $\lvert a\rangle$ satisfying clause $C_j$. This is generally not a codimension-one hyperplane: with $n=4$, the clause $x_1\lor x_2\lor x_3$ accepts $14$ of the $16$ assignments, so $\dim H_j=14$. The static solution subspace is

$$
\mathbf{S}^* = \bigcap_{j=1}^m H_j.
$$

This intersection is exactly the span of assignments satisfying every clause. It always contains the zero vector; the formula is satisfiable precisely when $\mathbf{S}^*\neq\{0\}$, equivalently when the subspace contains a nonzero state that can be normalized. The unsatisfiable formula $x\land\neg x$ gives only the zero vector, whereas $x\lor y$ has three satisfying assignments and no unique witness. Even when the intersection is nonzero, projecting a chosen input state and normalizing requires that input to have a nonzero projection onto it. In the author's static-field picture (`MODEL`), chirality cancellation $+\mathbf{\Omega}-\mathbf{\Omega}=0$ evokes filtering incompatible configurations; it does not itself guarantee a solution, uniqueness, or efficient preparation. The following complexity equalities depend on specified additional resources, not on the static intersection description alone:

::: {.remark #rem-ch30-postselection-ctc-literature title="Formalization Boundary for Postselection and Closed-Timelike-Curve Complexity Collapse Theorems"}
**Literature result, not formalized in this book.** The following equalities concern models with specific additional computational resources and lie outside the `trureturing@dev` declarations locked in this book. Both models still use uniformly generated polynomial-size circuits:

1. **Aaronson's Postselection Theorem (S. Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005)**: A uniform family of polynomial-size quantum circuits has a designated postselection bit and output bit. For every input the postselection event must have nonzero probability, possibly exponentially small. Conditioned on that event, the output accepts yes-instances with probability at least $2/3$ and no-instances with probability at most $1/3$. Direct access to this conditional distribution, without paying the ordinary repeated-sampling cost of waiting for the rare event, is the extra resource defining $\mathrm{PostBQP}$ (see [Definition 1 and Theorem 4 of the paper](https://arxiv.org/abs/quant-ph/0412187)):

   $$
   \mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP};
   $$

2. **Closed Timelike Curve (CTC) Fixed-Point Theorem (S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009)**: Deutsch's model supplies polynomially many CTC bits or qubits and a uniform polynomial-size circuit coupling them to a causality-respecting register. A classical CTC state is a probability distribution and a quantum CTC state is a density operator $\rho$. With the causality-respecting register initialized as prescribed, the induced map must satisfy $\rho=\Phi(\rho)$. Multiple consistent states are allowed, but the decision must be correct for **every** such state, with bounded error in the quantum case; one cannot select a favorable fixed point. Under these resource and correctness conditions (see [§§3–4 of the paper](https://arxiv.org/abs/0808.2669)),

   $$
   \mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE} \supseteq \mathrm{NP}.
   $$
:::

### 2. Why a Finite Observer Inside the Field Faces $P \neq NP$-Like Orthogonal Horizons and Local Blind Spots

Once we return to a real finite observer inside the field—unable to postselect the ending in advance and equipped only with a finite gate budget $L$ and a bounded local memory order $M \ll n$—two geometric obstructions emerge across restricted observation models (`MODEL`):

- **First Geometric Horizon (The $90^\circ$ High-Dimensional Orthogonal Equator and Uniform Operator Rotation)**:
  On the $N = 2^n$-dimensional state sphere, the initial inner-product overlap between the uniform starting state $\mathbf{P}_0$ and a single hidden target state $\mathbf{S}^*$ is

  $$
  \mathbf{P}_0 \cdot \mathbf{S}^* = \cos\theta_0 = 2^{-n/2} \implies \theta_0 \approx \frac{\pi}{2} - 2^{-n/2}.
  $$

  This small overlap gives the near-$90^\circ$ geometric picture. For the reflection product specified by Chapter 15's **uniform operator rotation theorem** ([`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)), the premises include isometric initialization, unitary preparation, a self-adjoint idempotent success projection, and success Gram matrix $pI$. For $0<p<1$, each amplification step rotates by $2\alpha$, where $\alpha=\arcsin\sqrt p$. Uniform search with a single target sets $p=2^{-n}$, giving $2\alpha\approx2\cdot2^{-n/2}$. This angle belongs to the specified amplification construction. Unitary norm conservation alone does not bound the angle of an arbitrary quantum gate, and this theorem gives no gate-count lower bound for all algorithms. The black-box query bound below has separate oracle-model premises.
- **Second Geometric Blind Spot (Local Gram Consistency from Binary Chains $\mathbf{e}_i\wedge\mathbf{e}_j$ to Three-Body Facets $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$)**:
  In our geometric model (`MODEL`), binary implication clauses $\mathbf{e}_i\wedge\mathbf{e}_j$ form **1D directed chains** whose transitive closure propagates locally, whereas ternary clauses $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ act like **triangular surface patches** stitching a closed 2D manifold—an observer inspecting only $M \ll n$ local inner-product moments can see locally consistent patches in every direction while remaining blind to a global parity contradiction around a macroscopic cycle.

::: {.viz src="timeless-causal-crystal" preset="thread" height="500"}
**A thread: one small turn per step.** One target among $256$ candidates: the amber state starts near the "rest" axis and turns $2\theta = 7.17^\circ$ towards the target per step; the cyan dots record every step taken, and after $12$ steps it is almost aligned. Trying one by one takes $128$ tries on average (dashed magenta). That every step turns by the same angle is [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation); reading it as a "line" is this book's interpretation (`MODEL`).
:::

The unconditional restricted-model lower bounds corresponding to these two geometric pictures belong to the external complexity literature (and do not resolve the open uniform Turing-machine conjecture $\mathrm{P} \neq \mathrm{NP}$, [@conj-p-neq-np]):

::: {.remark #rem-ch30-query-sos-literature title="Literature Note on Black-Box Quantum Query and Bounded-Degree Sum-of-Squares Lower Bounds"}
**Literature result, not formalized in this book.** Three classical complexity results juxtaposed with our geometric model in this section come from the external literature and are not formalized in this book:

1. **Unstructured Black-Box Quantum Query Lower Bound (C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997)**: In the black-box oracle model, identifying a marked item among $N = 2^n$ candidates with bounded error requires $L = \Omega(2^{n/2})$ quantum queries (matching Grover's $O(2^{n/2})$ upper bound up to constants, $\Theta(2^{n/2})$);
2. **Classical Watershed Between 2-SAT and 3-SAT (S. A. Cook, 1971; L. A. Levin, 1973; B. Aspvall, M. F. Plass & R. E. Tarjan, 1979)**: 2-SAT is decidable in linear time $O(n+m)$ via strongly connected components of the implication graph (hence $\text{2-SAT} \in \mathrm{P}$), whereas 3-SAT is $\mathrm{NP}$-complete;
3. **Bounded-Degree Sum-of-Squares (SoS) Lower Bound (D. Grigoriev, *Theor. Comput. Sci.* **259**, 613–622, 2001; G. Schoenebeck, *FOCS*, 593–602, 2008)**: For example, fix a sufficiently large constant clause density $m/n = \Delta$, sample triples of distinct variables and literal signs uniformly and independently (equivalently, random parity right-hand sides for 3-XOR), and use the standard Boolean polynomial encoding: parity equations for 3-XOR and clause-satisfaction constraints for 3-SAT. With high probability, the random instance is unsatisfiable while its degree-$M = o(n)$ local Lasserre / Gram semidefinite relaxation still has a feasible positive semidefinite moment matrix $G_M \succeq 0$ satisfying the local constraints, so it cannot refute unsatisfiability at that degree (corresponding to a subexponential-size semidefinite program; see [Theorem 12 of Schoenebeck's full version](https://schoeneb.people.si.umich.edu/papers/LasserreNew.pdf)).
:::

::: {.viz src="timeless-causal-crystal" preset="sos" height="500"}
**Two literals close at order 2; three-way parity does not.** The cyan points: for each $n$ a random 2-SAT formula, in which resolving two 2-clauses on a variable leaves at most two literals, so the resolution closure stays at order $2$ and whether the empty clause appears decides satisfiability: a filled point derived the empty clause (unsatisfiable), a hollow ring did not (satisfiable) (numbers computed by the page). The dashed magenta line: for random 3-XOR / 3-SAT, the literature result of item 3 above says that sum-of-squares relaxations of order $o(n)$ stay consistent everywhere; the slope of this line is only schematic (`MODEL`). Amber is the observer's order $M$. These lower bounds constrain this family of relaxations only and do not imply $\mathrm{P}\neq\mathrm{NP}$ ([@conj-p-neq-np], `OPEN`).
:::

### 3. The Author's Interpretation: Complexity Horizons, Subjective Time, and Choice

Placing the global static field alongside the finite observer expresses the author's epistemological interpretation of time and choice (`MODEL`). Query or SoS lower bounds imply neither standard $P\neq NP$ nor the existence of subjective time or free choice; the author assigns these philosophical meanings:

| Perspective | Complexity Regime & Epistemic Status | Core Geometric & Algebraic Mechanism | Ontological Role of Time and Choice |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field** | Static representation alone gives no complexity equality; extra resources give $\mathrm{PostBQP}=\mathrm{PP}$ and $\mathrm{P}_{\mathrm{CTC}}=\mathrm{BQP}_{\mathrm{CTC}}=\mathrm{PSPACE}$ ([@rem-ch30-postselection-ctc-literature]) | Subspace intersection $\mathbf{S}^*=\bigcap_jH_j$; a nonzero state does not supply a preparation or search algorithm | **Timeless Truth (author's interpretation)**: the satisfying relations viewed as a self-consistent whole |
| **Finite Observer in the Field** | Query and SoS bounds have restricted scope; standard $P\neq NP$ remains `OPEN` ([@rem-ch30-query-sos-literature], [@conj-p-neq-np]) | Small initial overlap, rotation by a specified reflection product [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), and local Gram blind spots | **The Unfolded Journey (author's interpretation)**: successive choices and proof steps give the journey meaning |

***"The $P = NP$ of the global static field endows the universe with self-consistent truth; the $P \neq NP$ of the finite observer uses the $\frac{\pi}{2}$ orthogonal horizon to shield life from spoilers, stretching static truth into a magnificent journey worth measuring, proving, and choosing step by step."*** (**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**)

::: {.figure src="ch30-horizon"}
**The more variables, the closer the target sits to the $90^\circ$ horizon.** The amber $P_0$ is the observer's uniform starting state; the ink arrows are the single hidden target $\mathbf{S}^*$ for $n = 2, 4, 8$, at $60^\circ$, $75.5^\circ$ and $86.4^\circ$ from $P_0$, and their cyan shadows on $P_0$, $\cos\theta_0 = 2^{-n/2}$, are $1/2$, $1/4$ and $1/16$. The dashed vertical line is the orthogonal horizon that $\theta_0 \approx \pi/2 - 2^{-n/2}$ closes in on.
:::

---

## "$P$ Is a Field, $NP$ Is a Line"—The Witness Thread, the Guiding Field, and Hairy-Ball Curl {#sec-coda-p-is-field-np-is-line}

> **Author's Epigraph**: *"P is a field; NP is a line."*（“P是场, NP是线”）

Here a “line” stands for a checkable witness and a “field” for structure guiding efficient solution (`MODEL`). The standard classes satisfy $P\subseteq NP$: efficiently solvable problems also have polynomial-time verifiers, so the two are not disjoint geometric categories. “A line without a field” interprets the difficulty of finding efficient algorithms; it does not define every $NP$ problem.

### 1. Why "$NP$ Is a Line" (`有线无场，横截面为零的见证丝`)

For a decision problem, the $NP$ condition is that an input $w$ is a yes-instance exactly when some witness $y$, of length bounded by a polynomial in the input encoding length, is accepted by a uniform deterministic verifier $V(w,y)$. Verification time must also be polynomially bounded in the input and witness encoding lengths (see [Cook's problem description, pp. 1–3](https://www.claymath.org/wp-content/uploads/2022/06/pvsnp.pdf)). Drawing this checking process as a polygonal thread is the geometric analogy (`MODEL`):

$$
\mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
$$

- **Verification along the thread**: Costs include reading the input and witness encodings and performing each local check. If check $i$ costs $c_i$, the checks contribute $\sum_{i=1}^k c_i$, which is $O(k)$ only when each cost is uniformly bounded. Counting segments alone proves no polynomial bit complexity. Formal proof terms can also be pictured as threads, but arbitrary proof terms have no uniform linear guarantee here on encoding length, type checking, or reduction cost, so this analogy does not place them within the same $NP$ verification argument;
- **Search without a field**: Efficient witness checking does not automatically supply an efficient search method; it does not rule one out either. A “zero-cross-section thread” expresses the author's picture of unguided search, not a discrete complexity lower bound or a claim that every $NP$ problem is hard.

::: {.viz src="timeless-causal-crystal" preset="wilderness" height="500"}
**One field: straight along the thread, circling off it.** The plane carries a single autonomous field $\mathbf{F} = g(\tilde y)\bigl(1, h'(x)\bigr) + \bigl(1 - g(\tilde y)\bigr)\mathbf{F}_{\mathrm{swirl}}$, with $\tilde y = y - h(x)$, $g(\tilde y) = e^{-\tilde y^2/\varepsilon^2}$, and $\mathbf{F}_{\mathrm{swirl}}$ vanishing on the thread. The probe that starts at $S_0$ exactly on the cyan witness thread $y = h(x)$ runs along it to $S^*$; three magenta probes that start only a little off it, but outside the channel $|\tilde y| < \varepsilon$, are caught by the first vortex under the same integrator and never reach the target. A schematic model of “a thread without a field” (`MODEL`), not a complexity lower bound.
:::

### 2. Why "$P$ Is a Field" (`弃线造场，局部切面处处对齐全局`)

In our geometric interpretation (`MODEL`), geometric or algebraic structure used by some polynomial-time algorithms is pictured as a **guiding field**, such as a convex gradient flow $\mathbf{F}=-\nabla V$. This is neither the definition of $P$ nor a necessary condition for membership. Even a smooth or curl-free field requires an analysis showing that it can be computed efficiently, reaches the required precision, and terminates in polynomially many steps. The following classical algorithms offer concrete points of comparison:

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="Literature Note on Interior-Point Linear Programming, Pfaffian Planar Matching, and the Hairy Ball Theorem"}
**Literature result, not formalized in this book.** The three classical results below illustrate field construction and topological curl. Algorithms, geometric extensions, and complexity retain their literature status; the actual suppliers and boundaries of the conditional Pfaffian sign identity are explained in [@rem-ch30-rotation-pfaffian-boundary]:

1. **Karmarkar's Interior-Point Algorithm for Linear Programming (N. Karmarkar, *Combinatorica* **4**, 373–395, 1984)**: Whereas Dantzig's simplex method traverses 1D boundary edges and takes $2^n$ steps on worst-case Klee–Minty (1972) deformed cubes, Karmarkar's algorithm enters the interior of the polytope and follows a smooth logarithmic-barrier gradient field to reach the optimum in polynomial time;
2. **Kasteleyn's Pfaffian Planar-Matching Theorem (P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961)**: Counting perfect matchings in general bipartite graphs (computing the permanent) is `#P`-complete (L. G. Valiant, 1979). For a finite planar graph with nonnegative edge weights $w_e$, the classical method uses a Kasteleyn orientation to form a skew-symmetric weighted adjacency matrix $A_K^T=-A_K$ in which all actual perfect-matching terms in the Pfaffian expansion have the same coefficient sign. Thus the weighted perfect-matching partition function is $Z=\sum_M\prod_{e\in M}w_e=|\operatorname{Pf}(A_K)|$, and Cayley's identity $[\operatorname{Pf}(A_K)]^2=\det A_K$ gives $Z=\sqrt{\det A_K}$. The sign mechanism aligns matching coefficients; nonedges have zero matrix entries. Exact evaluation in polynomial time for nonnegative rational weights encoded in binary is a literature result. If no perfect matching exists, $Z=0$; handling general planar graphs also includes connected components and the zero case caused by an odd-order component. A modern account is D. Cimasoni and N. Reshetikhin (2007), [*Dimers on surface graphs and spin structures. I*](https://arxiv.org/html/math-ph/0608070v2), Section 5.1, Theorem 5.1 and its matching expansion, specialized to the sphere;
3. **Poincaré–Brouwer Hairy Ball Theorem (H. Poincaré, 1885; L. E. J. Brouwer, 1912)**: Because the 2-sphere has Euler characteristic $\chi(S^2) = 2 \neq 0$, every continuous tangent vector field on $S^2$ must vanish at least at one point (a topological vortex).
:::

::: {.viz src="timeless-causal-crystal" preset="field" height="500"}
**A field: a slope everywhere.** The cyan flow lines start from all over the sphere; each looks only at the slope underfoot, and each flows to the target. The amber line is the chosen one, and the field vanishes at the opposite point (the grey ring). Reading it as a "field" is this book's interpretation (`MODEL`).
:::

#### From Actual Vertex Rotations to Face-Odd Orientations: A Finite Combinatorial Prerequisite {#sec-ch30-rotation-parity}

The full planar-matching result above has geometric, combinatorial, algebraic, and algorithmic parts. We first isolate a finite combinatorial question: given the cyclic order of the original graph's edges at each vertex, can one choose a single edge orientation for which every face and every even simple cycle whose deletion leaves a perfect matching has an odd number of opposing darts? A dart is an actual edge with a direction. A bridge, for example, has two reverse darts; a facial traversal that goes out and back along it must count both occurrences. An edge set alone would lose this information.

The results below derive the required sides from vertex rotations and an integer counting condition. Here “sphere rotation” means only the finite data satisfying the Euler condition specified below; obtaining these data from a geometric embedding is a separate step.

::: {.definition #def-ch30-actual-rotation title="Actual Darts, Vertex Rotations, and Complete Face Orbits" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Rotation D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.facePerm D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Face D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face"}
Let $V$ be an arbitrary finite type with decidable equality, and let $G$ be a simple undirected graph on $V$ with decidable adjacency. Write $D=G.\mathrm{Dart}$ for its actual dart type: a dart $d=(u,v)$ requires $G.\mathrm{Adj}(u,v)$. Write $E=G.\mathrm{edgeSet}$ for the type of actual unordered edges, $e(d)=\{u,v\}\in E$, and $\alpha(d)=(v,u)$.

A vertex rotation $R$ is a permutation $\rho$ of $D$ such that, for all $d,t\in D$,

$$
\bigl(\exists n\in\mathbb Z,\ \rho^n(d)=t\bigr)
\quad\Longleftrightarrow\quad d.\mathrm{fst}=t.\mathrm{fst}.
$$

The facial successor first reverses and then rotates: $\phi(d)=\rho(\alpha(d))$. The face type $F$ is the quotient of $D$ by the orbit relation of $\phi$: $d\sim t$ exactly when $\phi^n(d)=t$ for some $n\in\mathbb Z$. Write $f(d)$ for the class of $d$. Every orbit belongs to $F$, including singleton orbits. The rotation data themselves include no connectedness, geometric realization, or Euler equation.
:::

All three theorems below assume that $G$ is connected, $D$ is nonempty, and the following Euler equation holds **in the integers**:

$$
(|V|:\mathbb Z)-(|E|:\mathbb Z)+(|F|:\mathbb Z)=2.
$$

Each cardinality is cast to an integer before subtraction; no truncated natural-number subtraction is used. In particular, the edgeless one-vertex graph fails the nonempty-dart hypothesis and lies outside these three theorems.

::: {.definition #def-ch30-face-boundary title="Binary Facial Boundary and Opposition Count" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.boundary D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.faceOpposition"}
Write $\mathbb F_2=\mathbb Z/2\mathbb Z$. For a face function $x:F\to\mathbb F_2$, the linear boundary map $B:\mathbb F_2^F\to\mathbb F_2^E$ chooses one representative dart $d_e$ for each unordered edge and sets

$$
(Bx)(e)=x(f(d_e))+x(f(\alpha(d_e))).
$$

For any dart function $\varepsilon:D\to\mathbb F_2$, define the facial opposition count by

$$
\operatorname{opp}_F(\varepsilon,f)=\sum_{\substack{d\in D\\f(d)=f}}\varepsilon(d).
$$

If $\varepsilon(\alpha(d))=1+\varepsilon(d)$, it encodes an edge orientation: $\varepsilon(d)=0$ means that the orientation follows $d$, and $1$ means that it opposes $d$. The face count includes every actual dart in the complete orbit. Both darts of a bridge count separately even when they belong to the same face. Write $\mathcal C(G)\subseteq\mathbb F_2^E$ for the linear span of the unordered-edge indicators of all actual simple cycles.
:::

::: {.theorem #thm-ch30-face-cycle-exact title="Facial Boundaries Equal the Actual Cycle Space" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact"}
For any finite $V$, connected simple graph $G$, and vertex rotation $R$ as above, assume $D\ne\varnothing$ and the integer equation $|V|-|E|+|F|=2$. Then all three statements hold:

1. For every $x:F\to\mathbb F_2$ and $d\in D$, $(Bx)(e(d))=x(f(d))+x(f(\alpha(d)))$.
2. For every $x:F\to\mathbb F_2$, $Bx=0$ if and only if some $c\in\mathbb F_2$ satisfies $x(f)=c$ for every $f\in F$.
3. $\operatorname{im}B=\mathcal C(G)$.
:::

::: proof
The two representatives of an unordered edge differ only by reversal, so their shore-value sum is independent of the choice. Zero boundary equates the facial values on reverse darts. Facial succession and the vertex rotation propagate this equality around a vertex, and connectedness propagates it to all faces. The kernel therefore consists of constants and has dimension $1$. Reindexing a dart sum by the facial successor shows that every facial boundary has even incidence at every vertex, placing it in the existing actual cycle space. Rank–nullity gives $\dim\operatorname{im}B=|F|-1$, whereas the connected graph's cycle space has dimension $|E|-|V|+1$. The integer Euler equation makes these dimensions equal. The full proof is checked by the Lean kernel.
:::

Next, take an actual closed walk $p$ in the original graph, based at $a$. A simple cycle satisfies the formal predicate $p.\mathrm{IsCycle}$: no vertex repeats except the starting vertex at closure, and the zero-length walk and degenerate out-and-back traversal of one edge are excluded. Write $C(p)$ for its vertex support, $E(p)$ for its actual unordered-edge set, $\mathcal D(p)$ for its ordered dart list, and $p^{\mathrm{rev}}$ for the reversed walk. Write $G[S]$ for the subgraph induced on a vertex set $S$. Its vertices carry the condition of belonging to $S$; $v.\mathrm{val}$ denotes the original vertex after forgetting this condition. An even simple cycle is called *nice* when deleting $C(p)$ from the original graph leaves an actual induced graph with a perfect matching.

::: {.theorem #thm-ch30-cycle-face-sides title="Actual Simple-Cycle Sides, Regional Euler Identities, and Matching Restrictions" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides"}
For the finite $V$, connected simple graph $G$, and rotation $R$ above, assume $D\ne\varnothing$ and the integer equation $|V|-|E|+|F|=2$. For every $a\in V$ and actual simple cycle $p:a\leadsto a$, there exist a face function $x:F\to\mathbb F_2$ and vertex sets $I,J\subseteq V$ satisfying all the following statements.

1. The face sets $F_1=\{f\in F:x(f)=1\}$ and $F_0=\{f\in F:x(f)=0\}$ are nonempty complements, and $Bx=\mathbf1_{E(p)}$.
2. There is a walk $q=p$ or $q=p^{\mathrm{rev}}$ such that, for every actual dart $d$,

   $$
   \begin{aligned}
   &x(f(d))=1\ \land\ x(f(\alpha(d)))=0\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q),\\
   &x(f(d))=0\ \land\ x(f(\alpha(d)))=1\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q^{\mathrm{rev}}).
   \end{aligned}
   $$

3. For every $v\in V$, $v\notin C(p)$ if and only if $v\in I\cup J$, and $I\cap J=\varnothing$. Every actual dart with $d.\mathrm{fst}\notin C(p)$ satisfies

   $$
   \begin{aligned}
   d.\mathrm{fst}\in I&\ \Longleftrightarrow\ x(f(d))=1,\\
   d.\mathrm{fst}\in J&\ \Longleftrightarrow\ x(f(d))=0.
   \end{aligned}
   $$

   For all $v\in I,w\in J$, $\neg G.\mathrm{Adj}(v,w)$.
4. For each pair $(S,b)=(I,1)$ or $(J,0)$, there is a connected subgraph $H_S$ of the original graph with vertex set exactly $C(p)\cup S$. For every actual dart $d$,

   $$
   \begin{aligned}
   &H_S.\mathrm{Adj}(d.\mathrm{fst},d.\mathrm{snd})\\
   &\quad\Longleftrightarrow\ e(d)\in E(p)\\
   &\qquad\lor\bigl(x(f(d))=b\ \land\\
   &\qquad\qquad x(f(\alpha(d)))=b\bigr).
   \end{aligned}
   $$

   Let $E_S$ be this subgraph's actual unordered-edge set, and $E_S^\circ=E_S\setminus E(p)$. Both identities hold in $\mathbb Z$:

   $$
   \begin{aligned}
   |C(p)\cup S|-|E_S|+|F_b|&=1,\\
   |S|-|E_S^\circ|+|F_b|&=1.
   \end{aligned}
   $$

5. Let $U=V\setminus C(p)$, and let $\bar G=G[U]$ be the actual vertex-deleted complement. For any perfect-matching subgraph $M$ of this same graph $\bar G$, and every $S\in\{I,J\}$, put $S'=\{u\in U:u.\mathrm{val}\in S\}$. There is a perfect-matching subgraph $N$ of $\bar G[S']$ such that, for all its vertices $v,w$,

   $$
   \begin{aligned}
   &N.\mathrm{Adj}(v,w)\\
   &\quad\Longleftrightarrow\ M.\mathrm{Adj}(v.\mathrm{val},w.\mathrm{val}).
   \end{aligned}
   $$

   In this case both $|I|$ and $|J|$ are even.
:::

::: proof
By [@thm-ch30-face-cycle-exact], the cycle's edge indicator has a facial preimage $x$. Its nonzero boundary excludes constant labels, so both face values occur. All incident facial values at an off-cycle vertex agree, determining $I,J$; an original edge cannot join off-cycle vertices of different labels. The regional edge condition retains the cycle edges and edges with both shores on the chosen side. Even a chord whose endpoints both lie on the cycle must be excluded from the opposite region. Following an original graph path until it first reaches the cycle proves that each selected region is connected.

Map functions supported on one facial side into the cycle space of its region. The connected cycle-rank bound gives an Euler inequality for each side. The vertex and edge union/intersection counts, together with the global integer Euler equation, force equality on both sides. A simple cycle has equally many edges and vertices; removing both counts gives the second regional identity. At each cycle vertex, its two actual cycle edges determine two label changes in the vertex rotation, giving the direct boundary equivalences for $q$ and $q^{\mathrm{rev}}$. Finally, the absence of cross edges keeps each edge of the given $M$ on one side. Restricting that same matching to both sides and applying perfect-matching parity makes both side cardinalities even. The full proof is checked by the Lean kernel.
:::

Both facial sides are nonempty, but an off-cycle vertex side may be empty. The theorem requires no strictly interior vertex on either side and assumes no interior parity. Each region is a connected subgraph selected by its actual edges; these conclusions do not construct a topological disk.

::: {.theorem #thm-ch30-face-odd-nice-cycle-orientation title="One Orientation Is Odd on All Faces and All Nice Even Cycles" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.face_odd_nice_cycle_orientation"}
Let $V$ be any finite type with decidable equality, $G$ a connected simple graph with decidable adjacency, and $R$ its vertex rotation. If $D\ne\varnothing$, $|V|$ is even, and $|V|-|E|+|F|=2$ in $\mathbb Z$, there exists **one** function $\varepsilon:D\to\mathbb F_2$ satisfying

$$
\begin{aligned}
&\forall d\in D,\quad \varepsilon(\alpha(d))=1+\varepsilon(d),\\
&\forall f\in F,\quad \operatorname{opp}_F(\varepsilon,f)=1.
\end{aligned}
$$

Furthermore, for every $a\in V$, every actual even-length simple cycle $p$ based at $a$, and every perfect-matching subgraph $M$ of the actual complement $G[V\setminus C(p)]$,

$$
\sum_{d\in\mathcal D(p)}\varepsilon(d)=1\quad\text{in }\mathbb F_2.
$$

The sum counts the dart list. The existential quantifier $\exists\varepsilon$ precedes the universal quantifiers over all cycles and all complement matchings.
:::

::: proof
Start with any edge orientation and record each face's parity defect. Since the facial boundary map has only constants in its kernel, the defects correctable by its transpose are exactly those whose total is zero. The global integer Euler equation and the even vertex count ensure this compatibility condition. Adding the same binary correction to both darts of each edge preserves reversal and makes the opposition count on every facial orbit equal to $1$.

For any given nice even cycle, use one actual side supplied by [@thm-ch30-cycle-face-sides]. Summing the facial opposition counts on that side gives a contribution of $1$ from each selected noncycle edge; the direct boundary equivalence identifies the remaining terms with the dart sum along $q$. The regional Euler identity then gives

$$
\sum_{d\in\mathcal D(q)}\varepsilon(d)
  =|F_1|+|E_I^\circ|=1+|I|\quad\text{in }\mathbb F_2.
$$

The actual restriction of the given complement matching makes $|I|$ even, so the right-hand side is $1$. If $q=p^{\mathrm{rev}}$, the reversal rule changes the sum by the cycle length in $\mathbb F_2$; even length makes this change zero. The single orientation chosen at the outset therefore works for every such cycle and matching. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch30-rotation-pfaffian-boundary title="The Boundary Between the Finite Rotation Prerequisite and Full Planar Matching"}
**Applications of existing results and remaining literature boundaries.** The preceding three theorems retain their finite combinatorial hypotheses: an actual vertex rotation, nonempty darts, connectedness, and the integer Euler equation. We now connect actual interlacing, the original Pfaffian convention, and coefficient transport on the same graph. These explanations introduce no composite theorem box.

**From two matchings to rooted even cycles.** Let $X$ be any finite linearly ordered type. The native carrier $\mathcal M(X)$ is [`FixedPointFreeInvolution`](lean:D5/S3/Zeros/Convolution/PerfectMatchingCount.FixedPointFreeInvolution), consisting of permutations satisfying $s(s(x))=x$ and $s(x)\ne x$. For an ordered pair $(s,t)$, actual components are the reflexive transitive closure of the two colors of edges $x\!\leftrightarrow\!s(x)$ and $x\!\leftrightarrow\!t(x)$. Root each component separately at its least vertex $m$, put $r=t\,s$ (apply $s$ first), and use the full integer-power $r$ orbit of $m$ as the first phase. Both matchings exchange the component's two disjoint $r$ orbits. The phase depends on the component minimum, not numerical label parity. The interlacing permutation $q$ follows $s$ in the first phase and $t$ in the other; its predecessor makes the opposite choice. For every such minimum $m$ and every $k\in\mathbb N$,

$$
\begin{aligned}
q^{2k}(m)&=(ts)^k(m),\\
q^{2k+1}(m)&=s((ts)^k(m)).
\end{aligned}
$$

[`rooted_interlacing`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_interlacing) supplies these formulas, equality of the full $q$ cycles with the actual two-color components, the minimum property, and recovery of the original ordered matchings. Interlacing covers the whole component; each step flips phase, so each cycle has even length. The output carrier explicitly requires **both $\forall x,\ q(x)\ne x$ and even support cardinality for every member of $q.\mathrm{cycleFactorsFinset}$**. That finset omits singleton cycles, so the first condition cannot be dropped.

Conversely, root each full cycle of an admissible $q$ at its least vertex $m$ and use its full $q^2$ orbit as the even phase. There set $s(x)=q(x)$ and $t(x)=q^{-1}(x)$; on the other phase swap the choices. Even cycle length makes both successor and predecessor flip phase, including the last-to-first edge. The recovered maps are therefore fixed-point-free involutions. [`rooted_reconstruction`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_reconstruction) gives these pointwise formulas and $\mathrm{forward}(\mathrm{recover}(q))=q$; the other composite returns the original ordered pair. The actual [`equivalence`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.equivalence) is the `Equiv` definition with these inverse maps, rather than a theorem declaration or an arbitrary cardinality bijection. No nonemptiness or even-cardinality premise is imposed on $X$: on the empty type the maps are the unique empty permutations; on odd cardinalities both carriers are empty. A shared matching edge becomes a genuine two-cycle, $s=t$ gives $q=s$, and a two-cycle recovers coincident mates. Disconnected components have separate roots. Eğecioğlu's incoming-edge color convention (1990, *Ars Combinatoria* **29**, 107–116) is not asserted to equal this outward first-color convention. This structural equivalence proves no weighted sign identity or determinant square. Source audit `29209` remains at 2 unresolved and 0 validated items.

**Keep the original normalized Pfaffian.** Fix $n\in\mathbb N$ and any commutative ring $R$. Pairings in [`P`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.P) are fixed-point-free involutive functions on $\mathrm{Fin}(2n)$. Sort their lower endpoints and place each partner immediately after its lower endpoint to obtain $c(p)$. [`canonical_mate`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.canonical_mate) identifies the adjacent slots as partners. [`listingEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listingEquiv) gives inverse maps between all normalized listings and these pairings: conjugate the consecutive-slot pairing by the listing, then recover that listing canonically. The original [`pfaffian`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian) remains

$$
\operatorname{Pf}(A)=\sum_{\sigma\in L(n)}
\operatorname{sgn}(\sigma)\prod_{i\in\mathrm{Fin}(n)}
A_{\sigma(2i),\sigma(2i+1)},
$$

where each pair in $L(n)$ is increasing and its first endpoints increase, and the integer sign is cast into $R$. There is no division by a factorial or by $2$. The empty listing contributes the empty product $1$. The coefficient is the sign of the **listing permutation**, not of the partner involution. The latter corresponds to native $\mathcal M(\mathrm{Fin}(2n))$ by turning the bijective involutive function into a permutation and forgetting that structure in the inverse direction; both composites preserve the same partner function pointwise.

For normalized $\sigma$, put $p=\mathrm{pairingOfListing}(\sigma)$. Inversions are positions $u<v$ with $\sigma(v)<\sigma(u)$. Count each crossing once by its lower endpoints $a<c<p(a)<p(c)$, and each nesting once by $a<c<p(c)<p(a)$. The actual [`inversionCrossNestEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversionCrossNestEquiv) sends an inversion to a crossing or to a nesting with a bit in $\mathrm{Fin}(2)$. For two distinct pair slots, a crossing contributes the second–first inversion; nesting contributes that inversion and also the second–second inversion. Thus [`inversion_card_eq_cross_add_two_nesting_card`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversion_card_eq_cross_add_two_nesting_card) gives

$$
|\mathrm{Inv}(\sigma)|=|\mathrm{Cross}(p)|+2|\mathrm{Nest}(p)|.
$$

The listing sign is consequently $(-1)^{|\mathrm{Cross}(p)|}$. [`pfaffian_eq_crossing_sum`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian_eq_crossing_sum) rewrites the original sum term by term using this coefficient and $\prod_{a<p(a)}A_{a,p(a)}$, counting each paired edge once. This holds for every matrix over every commutative ring, without skew-symmetry, division, or cancellation. The correspondence includes both nesting contributions and the empty case. For an arbitrary listing, [`listing_value_canonical`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listing_value_canonical) preserves its signed value when integer unit factors negate on reversal: permuting whole pairs has sign a square, hence $1$, while reversing a pair negates both the permutation sign and its factor.

**Transport on the same actual graph.** Let $V$ now be finite, $G$ a simple graph on $V$, and $e:V\simeq\mathrm{Fin}(2n)$ an enumeration. Actual perfect matchings remain Mathlib $G.\mathrm{Subgraph}$ objects with exactly one neighbor at each vertex. On the complete graph, [`matchingEquiv`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.matchingEquiv) chooses that neighbor as the partner map; its inverse defines adjacency by $p(v)=w$. Transport through $e$ and retain precisely those pairings whose partner edges are actual $G$ edges. These correspond exactly to actual perfect matchings of $G$, without another matching datatype or Pfaffian core.

Let dart bits $\varepsilon:G.\mathrm{Dart}\to\mathbb Z/2\mathbb Z$ satisfy [`Reverses`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.Reverses), meaning $\varepsilon(\bar d)=1+\varepsilon(d)$. The integer units $\delta(d)=(-1)^{\varepsilon(d)}$ then satisfy $\delta(\bar d)=-\delta(d)$. The coefficient $\tau_e(M)$ is the canonical listing sign times the product of $\delta$ on its actual directed matching edges. For an actual simple closed walk $p$, write $C=p.\mathrm{toSubgraph}$. If it alternates with $M$, meaning exactly one of the two distinct cycle edges at each vertex belongs to $M$, [`alternating_cycle_flip`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_flip) gives even length, an actual perfect matching $N=M\mathbin{\triangle}C$, and a perfect matching of the **induced graph obtained by deleting $C$'s vertices from this same $G$**. Every cycle vertex already has its partner inside the cycle, so uniqueness prevents matching edges crossing between inside and outside. Restricting the same $M$ supplies the complement matching. This flip result itself requires no finiteness, embedding, orientation, or weights.

With the enumeration and reversal hypothesis above, [`alternating_cycle_transport`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_transport) proves for this actual flip that

$$
\tau_e(M)\tau_e(N)=-\prod_{d\in p.\mathrm{darts}}\delta(d).
$$

Rotate the cycle vertices once and fix every outside vertex. This permutation has even support cardinality and hence sign $-1$. It sends the matching edges on the cycle to their complementary cycle edges, while retaining the common outside pairing even when labels interleave. Listing normalization identifies the resulting signed value with $\tau_e(N)$. A backward-listed cycle edge contributes two cancelling negative signs; outside units square to $1$. What remains is exactly the actual dart product.

[`NiceOdd`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.NiceOdd) requires $\sum_{d\in p.\mathrm{darts}}\varepsilon(d)=1$ for **every actual even simple closed walk** whose actual induced vertex-deleted complement has a perfect matching. The symmetric difference of two matchings has degree zero or two at every vertex. If they disagree, take an actual alternating simple cycle in that difference. The complement matching above supplies its nice-cycle premise, the dart product is $-1$, and flipping preserves the coefficient while strictly decreasing disagreement edges. Finite induction gives [`niceOdd_matching_tau_eq`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.niceOdd_matching_tau_eq): all actual matching coefficients agree, including shared edges, disconnected graphs, and $M=N$.

**One unit for every weight and coefficient ring.** Give actual undirected edges weights $w:G.\mathrm{edgeSet}\to R$. Let $A_{e,\varepsilon,w}$ have entry $\delta(x,y)w_{\{x,y\}}$ cast into $R$ on actual edges, and zero on nonedges and on the diagonal. Reversal makes it skew-symmetric; the diagonal is explicitly zero even in characteristic $2$. Define $Z(w)$ by summing over actual perfect matchings and multiplying each actual undirected matching edge once. Unsupported pairings have a zero matrix factor. Supported pairings correspond inversely to actual matchings, and canonical pair slots biject with their edges. The original Pfaffian is therefore $\sum_M\tau_e(M)\prod_{a\in M}w_a$. Under `Reverses` and `NiceOdd`, [`weighted_pfaffian_identity`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.weighted_pfaffian_identity) factors out the common coefficient:

$$
\operatorname{Pf}(A_{e,\varepsilon,w})=(u_{e,\varepsilon}:R)\,Z(w),
\qquad u_{e,\varepsilon}\in\mathbb Z^\times.
$$

[`orientationUnit`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.orientationUnit) selects an actual matching's integer unit coefficient when a matching exists and $1$ otherwise. It depends only on the graph, enumeration, and orientation, independently of $R,w$. The formula includes negative and zero weights, rings with zero divisors, and characteristic $2$, with no division. When the vertex set is empty ($n=0$), the unique empty matching gives $1$ on both sides. A nonempty edgeless graph has no perfect matching and belongs to the zero case: all pairing terms vanish and $Z=0$. If additionally $R=\mathbb R$ and all actual edge weights are nonnegative, then $Z\ge0$ and $|u|=1$, so taking absolute values gives $|\operatorname{Pf}(A)|=Z$. This is an application of the signed identity, not a separate absolute-value endpoint theorem.

To combine the finite rotation orientation with this identity, all data must describe **the same actual graph**. Retain connectedness, nonempty darts, and the integer Euler equation; identify the original dart reversal condition with `Reverses`, and supply the actual induced vertex-deleted complement matching for each even simple cycle to the original nice-cycle condition to obtain this `NiceOdd`. Passing from an arbitrary geometric planar embedding to that rotation and its complete face orbits, graphs outside the rotation hypotheses, the full Cayley determinant-square identity `FullCayley`, the $\sqrt{\det A}$ formulation, exact rational algorithms and bit complexity, and `#P`-completeness of general bipartite counting remain separate obligations; the latter claims retain their literature status under [@rem-ch30-karmarkar-kasteleyn-literature]. Source audit `29266` retains 10 validated and 9 unresolved items. The conditional signed identity does not discharge these residual obligations.
:::

The algorithmic and geometric extensions in [@rem-ch30-karmarkar-kasteleyn-literature] retain their literature boundaries; the conditional matching identity above has exact formal suppliers. Another discrete problem admitting precise mathematics on both the "field" and the "line" sides is coloring a graph's vertices.

Start with an odd cycle, the pentagon $C_5$: vertices $0, 1, 2, 3, 4$, edges $01, 12, 23, 34, 40$. Paint the vertices with the colors $c = (0, 1, 0, 1, 2)$; no two neighbors share a color. Read the color as a height, and this is a three-level field on the vertices. Now let every edge point towards its higher-colored end:

$$
0 \to 1, \qquad 2 \to 1, \qquad 2 \to 3, \qquad 3 \to 4, \qquad 0 \to 4 .
$$

Neighbors have different colors, so every edge receives a direction. Walking along the arrows, the color rises strictly at every step, so a thread visits each level at most once: three colors, at most three vertices on any thread. The longest thread here is $2 \to 3 \to 4$, with exactly three. **The field puts a ceiling on the length of every line.**

Conversely, given only the arrows, can we recover a field? Let $h(v)$ be the number of edges on the longest thread that starts at $v$ and follows the arrows:

$$
h = \bigl(h(0), h(1), h(2), h(3), h(4)\bigr) = (1, 0, 2, 1, 0) .
$$

::: {.figure src="ch30-color-orientation"}
**The field fixes the threads, and the threads measure out a field.** The same pentagon $C_5$, its vertices placed by height on three levels. On the left the height is the color $c = (0, 1, 0, 1, 2)$, every arrow points up, and the longest thread is the cyan $2 \to 3 \to 4$, with three vertices. On the right are the same arrows with the vertices placed by $h = (1, 0, 2, 1, 0)$: every arrow points down, and $h$ is again a three-level coloring ([@thm-ch30-gallai-roy]).
:::

For every arrow $u \to v$, putting this step in front of the longest thread from $v$ gives a longer thread from $u$, so $h(u) > h(v)$. Thus $h$ drops along every arrow, neighbors always get different values of $h$, and $h$ is again a three-coloring (a different one from $c$: the arrows point up in $c$ but down in $h$). **The lines measure out the field.** Only one thing can go wrong in this step: if the arrows close up into a cycle, "the longest thread starting at $v$" runs round in circles. In graph theory this round trip is called the Gallai–Hasse–Roy–Vitaver theorem ([@rem-ch30-coloring-complexity-literature]). The module `D5/S3/Combinatorics/Graph/Walks/GallaiRoy` freezes a version of it, starting with the definitions of orientation and directed path:

::: {.definition #def-ch30-orientation-directed-path title="Orientations and directed paths of a graph" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsOrientation D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsDirectedPath"}
Let $V$ be a type, $G$ a simple graph on $V$ (Mathlib's `SimpleGraph V`: a symmetric adjacency relation without loops), and $o$ a binary relation on $V$. When $o(u, v)$ holds we say there is an **arc** from $u$ to $v$ and write $u \to v$.

1. $o$ is an **orientation** of $G$ (`IsOrientation G o`) if both of the following hold: for all $u, v$ adjacent in $G$, at least one of $o(u, v)$ and $o(v, u)$ holds (both may hold); for all $u, v$, $o(u, v)$ implies that $u$ and $v$ are adjacent in $G$.
2. Let $m \in \mathbb{N}$. A map $f : \{0, 1, \dots, m-1\} \to V$ (in Lean, `Fin m → V`) is a **directed path of $o$ with $m$ vertices** (`IsDirectedPath o f`) if $f$ is injective and $o\bigl(f(i), f(i+1)\bigr)$ holds for every natural number $i$ with $i + 1 < m$.
:::

This notion of orientation is looser than the textbook one: an edge may carry arcs in both directions. A directed path, on the other hand, must have pairwise distinct vertices, so going round a directed cycle again and again does not produce ever longer paths; and $m$ counts vertices, not edges.

::: {.theorem #thm-ch30-gallai-roy title="Gallai–Hasse–Roy–Vitaver theorem: $k$-colorable if and only if some orientation has no directed path with more than $k$ vertices" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation"}
Let $V$ be a finite type, $G$ a simple graph on $V$, and $k \in \mathbb{N}$. The following are equivalent:

1. $G$ is $k$-colorable (Mathlib's `G.Colorable k`): there is a map $c : V \to \{0, 1, \dots, k-1\}$ with $c(u) \neq c(v)$ for all $u, v$ adjacent in $G$;
2. there is an orientation $o$ of $G$ ([@def-ch30-orientation-directed-path]) such that $m \le k$ for every $m \in \mathbb{N}$ and every directed path of $o$ with $m$ vertices.
:::

::: proof
**From a coloring to an orientation.** Given a coloring $c$, let $o(u, v)$ hold exactly when $u, v$ are adjacent and $c(u) < c(v)$: every edge points towards its higher-colored end. Neighbors have different colors, so every edge receives exactly one direction, and every arc is an edge. Along a directed path $f$ with $m \ge 1$ vertices the color rises strictly at each step, so $i \mapsto c(f(i))$ is a strictly monotone map from $\{0, \dots, m-1\}$ to $\{0, \dots, k-1\}$, hence injective, and $m \le k$; for $m = 0$ there is nothing to prove.

**From an orientation to a coloring.** Let $o$ be an orientation whose directed paths all have at most $k$ vertices. It may contain directed cycles and two-way edges, so the proof first deletes arcs: among the relations $D$ contained in $o$ along which one can never return to the starting point in one or more steps, it takes one that is maximal under inclusion. Since $V$ is finite there are only finitely many binary relations on $V$, and the empty relation belongs to the family, so a maximal one exists; Lean proves that it exists without constructing it. A chain $v_0 \to v_1 \to \dots \to v_\ell$ along $D$ never repeats a vertex (a repetition would be a cycle), so it is a directed path of $o$ with $\ell + 1$ vertices, and $\ell + 1 \le k$. Let $h(v)$ be the largest number of edges of a $D$-chain starting at $v$ (Lean takes it with `Nat.findGreatest` among $0, \dots, k$); then $h(v) \le k - 1$. If one can walk from $a$ to $b$ along $D$ in one or more steps, placing that walk in front of a longest chain from $b$ gives a longer chain from $a$, so $h(a) > h(b)$. The key step: let $o(u, v)$ with $u \neq v$. If $D(u, v)$, then $h(u) > h(v)$. If not, consider the relation obtained by adding the arc $u \to v$ to $D$. It is contained in $o$ and strictly larger than $D$; were it acyclic, it would contradict the maximality of $D$. So it has a cycle, and that cycle must use the new arc, which means that $D$ already leads from $v$ back to $u$ (in at least one step, since $u \neq v$); hence $h(v) > h(u)$. In both cases $h(u) \neq h(v)$. Every edge of $G$ carries an arc in at least one direction, and adjacent vertices of a simple graph are distinct, so $v \mapsto h(v)$ is a coloring with colors $0, \dots, k-1$. The full proof is checked by the Lean kernel.
:::

The equivalence can be read in three ways.

First, two-way arcs change nothing (a manual derivation). Delete one of the two directions on every edge that carries both; the result is an orientation with exactly one direction per edge, its directed paths are directed paths of the original one, and the bound $k$ still holds. So item 2 of the theorem may just as well be searched for among orientations with exactly one direction per edge.

Second, try $k = 0, 1, 2, \dots$ in turn (a manual derivation). For finite $V$, giving every vertex its own color shows that $G$ is $\lvert V\rvert$-colorable, so there is a least $k$ for which $G$ is $k$-colorable: the chromatic number $\chi(G)$. Directed paths have distinct vertices, so every directed path of an orientation $o$ has at most $\lvert V\rvert$ vertices, and the number $L(o)$ of vertices on a longest one exists. Item 2 of the theorem holds exactly when $\min_o L(o) \le k$, and [@thm-ch30-gallai-roy] holds for every $k$, so items 1 and 2 hold for the same values of $k$ and the least such values agree:

$$
\chi(G) = \min_{o}\, L(o),
$$

the minimum ranging over all orientations of $G$. This is how the graph-theory literature usually states the theorem.

Third, back in this chapter's analogy (`MODEL`): a coloring is a layered field on the vertices, and a directed path is a line that follows the directions. A field with at most $k$ levels exists exactly when the edges can be given directions so that every line has at most $k$ vertices; and the field $h$ built from an orientation reads, at each vertex, "how many steps one can walk from here along the arcs that survive the deletion". Both sides of the theorem, however, assert that some object exists. The theorem trades one kind of witness for another; it provides no way of finding either, and it says nothing about which is easier to find. A given coloring is verified by comparing the two end colors of every edge; how fast a coloring can be found is a different question, taken up in [@rem-ch30-coloring-complexity-literature].

::: {.example #ex-ch30-gallai-roy-orientation-census title="The pentagon, $K_4$ and the Petersen graph: enumerating every orientation and measuring the longest directed path"}
Every number in the table comes from exhaustive enumeration: choose a direction for each edge and find the number of vertices on a longest directed path by depth-first search (directed paths have distinct vertices, as in [@def-ch30-orientation-directed-path]). The Petersen graph is taken with an outer pentagon $0, \dots, 4$, an inner pentagram $5, \dots, 9$ ($5 + i$ adjacent to $5 + ((i + 2) \bmod 5)$), and five spokes ($i$ adjacent to $i + 5$).

| Graph | Vertices / edges | Chromatic number | Orientations with one direction per edge | Vertices on a longest directed path: number of orientations |
| :---: | :---: | :---: | :---: | :---: |
| Pentagon $C_5$ | $5$ / $5$ | $3$ | $32$ | $3$: $10$, $4$: $10$, $5$: $12$ |
| Complete graph $K_4$ | $4$ / $6$ | $4$ | $64$ | $4$: $64$ |
| Petersen graph | $10$ / $15$ | $3$ | $32768$ | minimum $3$, attained $80$ times |

With two-way arcs allowed, $C_5$ has $3^5 = 243$ orientations and the least number of vertices on a longest directed path is still $3$ (attained $20$ times); $K_4$ has $3^6 = 729$ orientations, each containing a directed path with $4$ vertices. For $C_5$ and $K_4$ the program also checks both sides of [@thm-ch30-gallai-roy] for $k = 0, 1, \dots, \lvert V\rvert$ (on the coloring side by enumerating every map $c$). For all three graphs the minimum equals the chromatic number, in agreement with $\chi(G) = \min_o L(o)$ above.

Among the $12$ orientations of $C_5$ whose longest directed path has $5$ vertices, $2$ are directed cycles (one for each sense of rotation). For the directed cycle $0 \to 1 \to 2 \to 3 \to 4 \to 0$, the maximal acyclic sub-relation $D$ of the proof deletes exactly one arc of the cycle (there are $5$ ways, and Lean does not say which); deleting $4 \to 0$ gives $h = (4, 3, 2, 1, 0)$, a five-coloring, as the theorem predicts for $k = 5$.

Two rows can be done by hand. $C_5$ with $k = 2$: suppose every edge has exactly one direction and every directed path has at most $2$ vertices. A vertex with both an incoming and an outgoing arc would have them on two different edges, and its two neighbors would be joined through it into a directed path with $3$ vertices; so every vertex either only sends or only receives. Each arc runs from a sender to a receiver, so around the pentagon the two kinds must alternate, and $5$ is odd: a contradiction. By the first reading the same holds with two-way arcs allowed; this is "the pentagon is not $2$-colorable" translated through the theorem. $K_4$: its four vertices are pairwise adjacent, so with three colors two of them would share a color, and $K_4$ is not $3$-colorable; by the theorem every orientation of $K_4$ has a directed path with at least $4$, hence exactly all $4$, vertices, as all $64$ orientations in the table do. Replacing $K_4$ by the complete graph $K_n$ on $n$ vertices, the same manual derivation shows that every orientation of $K_n$ has a directed path through all of its vertices.
:::

::: {.remark #rem-ch30-coloring-complexity-literature title="The computational complexity of coloring and the history of the theorem (literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** [@thm-ch30-gallai-roy] is an equivalence between two existence statements and says nothing about computational complexity. How hard colorings are to find is recorded in the external literature:

1. Whether a finite graph is $2$-colorable can be decided in linear time: run a breadth-first search in each connected component and color by the parity of the level; two neighbors receive the same color exactly when the graph contains an odd cycle (a graph is $2$-colorable if and only if it has no odd cycle, D. Kőnig, 1936).
2. Given a graph $G$ and a positive integer $k$, deciding whether $G$ is $k$-colorable is $\mathrm{NP}$-complete (R. M. Karp, *Reducibility among combinatorial problems*, 1972); for fixed $k = 3$ it remains $\mathrm{NP}$-complete even for planar graphs of maximum degree at most $4$ (M. R. Garey, D. S. Johnson & L. Stockmeyer, *Theor. Comput. Sci.* **1**, 237–267, 1976). Consequently $3$-coloring has a polynomial-time algorithm if and only if $\mathrm{P} = \mathrm{NP}$, while $\mathrm{P} \neq \mathrm{NP}$ remains an open conjecture ([@conj-p-neq-np]).
3. The equivalence between colorings and orientations was published independently by T. Gallai, M. Hasse, B. Roy and L. M. Vitaver in the 1960s; its special case for complete graphs, that every tournament has a directed path through all of its vertices, was proved earlier by L. Rédei (1934).
:::

### 3. Hairy-Ball Curl ($\nabla \wedge \mathbf{F}$) as a Geometric Analogy for $P \neq NP$: Why One Line Cannot Hold Up a Field

Why is it so difficult to construct such a polynomial-time guiding field for $\mathrm{NP}$-complete problems like 3-SAT? Expressed as a continuous differential-geometric analogy (`MODEL`, intended as geometric intuition rather than a formal proof of [@conj-p-neq-np]):

- A conservative gradient field $\mathbf{F} = -\nabla V$ that slides without frustration to a global minimum satisfies the vanishing exterior-curl condition:

  $$
  \nabla \wedge \mathbf{F} = 0;
  $$

- The author uses three-body clauses $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ to evoke loop frustration. Clause width alone defines neither a continuous configuration manifold nor a vector field or its curl;
- **A line can thread the seam, while a field must tear (`线能穿缝，场必撕裂`)**: this is the author's geometric aphorism about witnesses and guidance. The hairy ball theorem guarantees a zero of a tangent field on specified spheres, not exponentially many zeros or search traps; zero curl does not guarantee easy optimization either. These continuous geometric facts do not directly yield algorithmic lower bounds for 3-SAT.

| Perspective | Core Maxim | Geometric Relation Between Line ($NP$) and Field ($P$) (`MODEL`) | Complexity & Proof-Theoretic Meaning |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field** | **All lines coexisting *are* the field**<br/>(Author's aphorism; resource models in [@rem-ch30-postselection-ctc-literature]) | The satisfying subspace may be zero or contain multiple assignment witnesses; static coexistence does not select or prepare a witness | Describing satisfaction does not account for solution cost; extra resources need separate specification |
| **Finite Observer in the Field** | **Having a line does not yield a field**<br/>(Author's aphorism; standard conjecture [@conj-p-neq-np] is `OPEN`) | Checking witnesses and finding them efficiently are different tasks, and $P\subseteq NP$; zero cross-section and curl are analogies | ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step"***: checking cost depends on encoding and verifier; formal proof checking has its own costs |

This distills the book's philosophy of computation and formal proof into a single couplet: ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step."*** (**“求场难如登天，顺线一步看穿。”**)

---

## The Exponential Time Hypothesis (ETH), 2026 Tensor-Network Rank Reduction, and the Cosmic Horizon: Scale and Interpretation of Upper-Bound Curves {#sec-coda-eth-tensor-rank-and-cosmic-horizon}

> *"Viewed inside our geometric architecture of 'fields ($P$) and lines ($NP$), polyhedral approximations to the sphere, and the finite observer's horizon,' placing the Exponential Time Hypothesis (ETH) alongside the late-October 2026 tensor-network rank-reduction preprints does not overturn finite-observer $P \neq NP$, but instead supplies a cosmological-scale asymptotic illustration of two core geometric principles: local three-body constraints cannot weld an absolutely rigid true sphere, and the observer's horizon remains uncrossable."*

To keep external complexity-theoretic literature strictly separated from our orthogonal geometric interpretation (`MODEL`), we first isolate the definitions of ETH/SETH, classical $k$-SAT upper bounds, and the October 2026 preprints inside an explicit literature remark before developing our geometric and scale analysis:

::: {.remark #rem-ch30-eth-subexponential-literature title="Literature Note on ETH / SETH and the Late-October 2026 Subexponential 3-SAT Preprints"}
**Literature result, not formalized in this book.** All fine-grained complexity hypotheses, classical satisfiability bounds, and October 2026 research preprints discussed in this section belong to the external research literature outside the `trureturing@dev` declarations locked in this book:

1. **ETH, SETH, and the Sparsification Lemma (R. Impagliazzo & R. Paturi, *CCC* 1999; R. Impagliazzo, R. Paturi & F. Zane, *J. Comput. Syst. Sci.* **62**, 367–375, 2001)**: For clause width $k \ge 3$, define the asymptotic per-variable exponential cost rate of $k$-SAT by

   $$
   s_k = \inf \left\{ \delta \;\middle|\; k\text{-SAT is solvable in deterministic time } O(2^{\delta n}) \right\}.
   $$

   The **Exponential Time Hypothesis (ETH)** conjectures $s_3 > 0$ (ruling out deterministic $2^{o(n)}$ algorithms for $n$-variable 3-SAT), while the **Strong Exponential Time Hypothesis (SETH)** conjectures $\lim_{k \to \infty} s_k = 1$. The accompanying **Sparsification Lemma** proves that for every fixed $\varepsilon > 0$ and $k \ge 3$, any $n$-variable $k$-SAT formula reduces in time $2^{\varepsilon n}\operatorname{poly}(n)$ to the disjunction of at most $2^{\varepsilon n}$ sparse $k$-SAT formulas, each having at most $c(k, \varepsilon)\,n = O_{k,\varepsilon}(n)$ clauses. Standard **Tseitin transformation** reduces a Boolean circuit of size $S$ linearly to a 3-SAT formula on $N = \Theta(S)$ variables; prior to October 2026, the fastest known 3-SAT algorithms in the PPSZ line (R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 2005, and subsequent refinements) achieved upper bounds near $1.307^n \approx 2^{0.386 n}$ (exponent rate $r \approx 0.386$).
2. **Late-October 2026 Tensor-Network Subexponential 3-SAT Preprints and Specification Audit**: On October 26, 2026, two independent research preprints accompanied by external **Lean 4 formalizations** (the 67-page *The Exponential Time Hypothesis Is False* and the 49-page *A $2^{o(n)}$ Time Algorithm for 3-SAT*) announced deterministic subexponential algorithms for 3-SAT via tensor-network contraction and algebraic rank reduction, claiming asymptotic runtime upper bound

   $$
   T(n) = 2^{O\!\left(\frac{n \log\log n}{\sqrt{\log n}}\right)} = 2^{o(n)}
   $$

   (one external Lean 4 development formalizes a polynomial-space $2^{O(n (\log\log n)^2 / \sqrt{\log n})}$ variant, while the other builds on Mathlib to formalize a deterministic $2^{o(n)}$ Turing-machine algorithm for `#k-SAT` counting at fixed $k$; as of November 2026, Impagliazzo, Paturi, Ryan Williams, and colleagues are conducting an independent peer audit of the top-level specification boundaries and natural-language reductions, with complexity theorist Lance Fortnow noting that even if ETH falls, resolving standard $\mathrm{P}$ vs. $\mathrm{NP}$ remains out of reach).
:::

### 1. Lifting from a 1D Assignment Line to a Tensor Correlation Field and Polyhedral Sphere Seams (`MODEL`)

Comparing the mathematical mechanism in [@rem-ch30-eth-subexponential-literature] with our orthogonal geometry (`MODEL`) highlights two structural resonances:

- **Lifting from a 1D Assignment Line to a Multi-Linear Tensor Field for Low-Rank Cancellation (`MODEL`)**: Classical backtracking and local random-walk solvers probe candidate assignments along a **1D boolean line**, whereas tensor-network contraction embeds discrete clauses into high-dimensional multi-linear spaces. In our locked `trureturing@dev` library, Chapter 19's **Discrete Bridge-Graph Tensor-Network Quantum Max-Flow Min-Cut Theorem** ([`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) and its polyhedral cut-cone characterization [`cone_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut), proved for a discrete bridge graph under dimensional hypotheses) together with Chapter 3's **Finite-Rank Concentration Mode Bound** ([`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), bounding the number of high-weight modes under trace constraints) provide concrete finite-dimensional prototypes (note that these Lean theorems establish bridge-graph flow–cut duality and trace-constrained mode concentration, and do not formalize the 3-SAT algorithm in [@rem-ch30-eth-subexponential-literature] itself): in our conceptual model (`MODEL`), they illustrate how cross-cut capacity is governed by **algebraic rank**. Blocking and contracting variables across high-dimensional tensor planes exposes **linear dependencies and rank deficiency (cancellation of redundant parasitic areas)** invisible along a 1D boolean line—echoing our rotor compiler (Chapters 16 and 27) and Diophantine norm-form compression (Chapter 23).
- ***"A Sphere Is Always Only a Polyhedral Approximation"* — Local Three-Body Facets and Asymptotic Seams (`MODEL`)**: The author uses the picture of assembling local three-body facets ($\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$) into a whole to interpret the possibility of an upper-bound exponent changing with scale. If the bound claimed by the preprints in [@rem-ch30-eth-subexponential-literature] survives audit, its effective per-variable exponent tends to $0$. This conditional algorithmic claim follows neither from the polyhedral metaphor nor from the finite-dimensional Lean prototypes above.

::: {.viz src="eth-horizon-crossover" preset="bridge" height="500"}
**The rank of the flow matrix equals the minimal cut.** The bridge graph with $(a, b, c, d) = (2, 3, 2, 3)$: both outer cuts are $6$ (amber dashes) and the three bridges could carry $12$. On the right is the $6 \times 6$ flow matrix of one random integer instance (cyan entries positive, magenta negative) with six nonzero singular values below it: rank $6$, exactly the minimal cut. This is a single instance; [@thm-bridge-quantum-maxflow-mincut], verified in Lean, states that under its full dimensional hypotheses the greatest attainable rank of these bridge graphs equals the minimal cut, while a single draw can have lower rank. The theorem is only about flows and cuts on bridge graphs and has nothing to do with the subexponential 3-SAT preprints discussed above: it neither checks nor supports their algorithmic claim ([@rem-ch30-eth-subexponential-literature], unaudited).
:::

### 2. Galactic Algorithms and the Cosmic Horizon: What Can Upper-Bound Comparisons Tell Us? (`MODEL` & Epistemological Boundaries)

::: {.example #ex-ch30-galactic-crossover-scale title="Trans-Cosmological Scale Comparison and Quadratic-Encoding Inflation of the Subexponential Bound"}
**Literature result, not formalized in this book.** Does an asymptotic upper-bound exponent drifting toward $0$ enable a finite observer at realizable physical scales to cross exponential search barriers? To visualize the scale behavior of the external asymptotic bound in [@rem-ch30-eth-subexponential-literature], consider the illustrative normalized base-$2$ curve $r_{\mathrm{new}}(n) = c \cdot \frac{\log_2(\log_2 n)}{\sqrt{\log_2 n}}$ (corresponding to an upper-bound runtime of the form $2^{r_{\mathrm{new}}(n)\cdot n}$, evaluated at the illustrative normalization $c = 1$ solely to compare literature upper-bound curves—not as a proven lower bound for all algorithms or physical observers) alongside the classical $0.386$ PPSZ local-search benchmark ($1.307^n \approx 2^{0.386 n}$) from [@rem-ch30-eth-subexponential-literature]:

| Observer & System Scale $n$ | Log Scale $\log_2 n$ | Illustrative Tensor Bound Exponent $r_{\mathrm{new}}(n)$ ($c=1$) | Classical Local-Search Benchmark ([@rem-ch30-eth-subexponential-literature]) | Scale Comparison & Geometric Interpretation (`MODEL`) |
| :--- | :---: | :---: | :---: | :--- |
| **Human Engineering Scale** ($n = 65{,}536 = 2^{16}$) | $16$ | $\dfrac{\log_2 16}{\sqrt{16}} = \mathbf{1.000}$ | $\mathbf{0.386}$ | At $65{,}536$ variables, the $c=1$ curve only just reaches the naive $2^n$ brute-force exponent $1.000$ |
| **Atoms in Observable Universe** ($n \approx 10^{80} \approx 2^{266}$) | $\approx 266$ | $\dfrac{\log_2 266}{\sqrt{266}} \approx \mathbf{0.494}$ | $\mathbf{0.386}$ | Even at the $n \approx 10^{80}$ baryon scale of the observable universe, the $c=1$ curve ($\approx 0.494$) exceeds $0.386$ |
| **Crossover Threshold** ($n = 2^{558}$) | $\mathbf{558}$ | $\dfrac{\log_2 558}{\sqrt{558}} \approx \mathbf{0.386}$ | $\mathbf{0.386}$ | Under the $c=1$ normalization, the curve crosses below $0.386$ only past **$n \approx 2^{558}$** (far beyond cosmic scales) |

The function $g(n)=n\log\log n/\sqrt{\log n}$ grows faster than $\log n$, so for fixed $c>0$ the comparison function $2^{c g(n)}$ exceeds every fixed-degree polynomial. But $T(n)=2^{O(g(n))}$ is only an upper bound: it permits faster, even polynomial-time algorithms and does not prove $P\neq NP$. For a problem with natural parameter $n$ whose chosen circuit encoding has size $S=\Theta(n^2)$, if Tseitin transformation produces $N=\Theta(n^2)$ variables, substitution into the discussed formula gives the upper bound $2^{O(n^2\log\log n/\sqrt{\log n})}$. This changes the scale of that encoding and upper-bound expression; it is no super-exponential cost that every optimal algorithm must pay. The table's $c=1$ curve fixes neither the actual constant nor the validity threshold hidden in big $O$, and does not determine the relative speed of real algorithms.
:::

::: {.viz src="eth-horizon-crossover" preset="human" height="500"}
**$2^{16}$ variables: the rate is only back at 1.** The amber reading stops at $n = 2^{16}$, some sixty-five thousand variables. Only here does the cyan schematic curve with $c = 1$ come down to $1$, the same exponent per variable as brute force; the magenta PPSZ line sits at $0.386$. This is the first row of the table above (a numerical comparison of schematic curves, `MODEL`).
:::

::: {.viz src="eth-horizon-crossover" preset="cross" height="500"}
**The crossover: $n \approx 2^{558}$.** Let the scale grow: the cyan curve sinks slowly and meets the magenta $0.386$ only at $n \approx 2^{558}$, far outside the shaded part (scales within the number of atoms in the observable universe). This is the last row of the table above (a numerical comparison of schematic curves, `MODEL`).
:::

The trans-cosmological scale and reduction comparison in [@ex-ch30-galactic-crossover-scale] highlights three closing reflections for our theme of "the finite observer inside the sphere vs. the one beyond the sphere" (`MODEL`):

- **Galactic Algorithms and Physical Scale Boundaries for Finite Observers (`MODEL`)**: The normalized illustrative curve in [@ex-ch30-galactic-crossover-scale] shows how a crossover can occur only at astronomical scales, echoing the picture of a galactic algorithm. The **Finite Memory History Capacity Theorem** ([`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), bounding distinguishable histories) and **Open Integrable Circuit Minimum Depth Theorem** ([`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result), giving minimum depth $\lfloor N/(\kappa+1)\rfloor+1$ under its locality assumptions) each constrain resources in a specified model. Juxtaposing them with the upper-bound curve supports the author's finite-observer interpretation, but does not combine them into a lower bound for all SAT algorithms or a proof that finite observers necessarily face intractability. Standard $P\neq NP$ remains `OPEN` ([@conj-p-neq-np]).

::: {.viz src="eth-horizon-crossover" preset="constant" height="500"}
**Halve the constant, and the crossover comes inside the horizon.** With $c = 1/2$ the cyan schematic curve meets the magenta $0.386$ at $n \approx 2^{57}$, inside the shaded part (sizes within the number of atoms in the observable universe). The big O does not give the constant $c$, and on which side of the horizon the crossover lies depends on it alone (a numerical comparison of the schematic curve, `MODEL`).
:::

- **Epistemic Contrast Between $P$ (Field) and $NP$ (Line) (`MODEL`)**: Guidance structures and witness checking play different task roles; both can occur in the same problem because $P\subseteq NP$. Upper-bound curves and encoding-scale comparisons do not separate the classes.
- **The Gödelian Semantic Boundary Illustrated by Specification Auditing (`LEAN ✓` Prototype & `MODEL` Reflection)**: A striking epistemological lesson of [@rem-ch30-eth-subexponential-literature] is that while a proof-assistant kernel can rapidly verify every internal deductive step of a formal script, human researchers must still audit whether the top-level definitions faithfully match the intended Turing-machine complexity statement. In Chapter 21, our kernel-verified **Relative Semantic Diagonal and Definition Escape Theorems** prove that for any fixed-point-free twist (`∀ v, twist v ≠ v`), the relative semantic diagonal differs from every decoded profile in a listed catalog ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)), and when the catalog lists every decoder on the latent coordinate space, the diagonal target is not `TargetAdequate` with respect to that latent map ([`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)). Viewed as an epistemological prototype (`MODEL`), this theorem illuminates why **a formal kernel locks transitive deductive consistency inside a given formal sphere, whereas auditing the semantic adequacy of top-level boundary definitions requires standing outside that sphere!**

::: {.viz src="eth-horizon-crossover" preset="atoms" height="500"}
**The crossover lies beyond the horizon.** Cyan is the schematic curve $r(n) = \log_2(\log_2 n)/\sqrt{\log_2 n}$ with $c = 1$, magenta the $0.386$ of PPSZ, and the shaded part the scales up to the $2^{266}$ atoms of the observable universe. The amber reading stands at $n = 2^{266}$: the curve is still at $0.494$ and comes down to $0.386$ only at $n \approx 2^{558}$ (a numerical comparison for a schematic curve, `MODEL`).
:::

::: {.viz src="eth-horizon-crossover" height="640"}
**Interactive laboratory `ORTHO//HORIZON`**: the three scenes of this section. Rates: where the schematic curve $r(n)$ meets the $0.386$ of PPSZ, and how the constant $c$ moves the crossover into or out of the shaded part; bridge graph: one sampled flow-matrix rank against four cuts, with the frozen quantity $\operatorname{QMinCut} = \min(3ac, ad, bc)$ and the fourth cut $3bd$ derived by hand through matrix factorization; for natural-number dimensions satisfying $0 < a \le b$, $0 < c \le d$, $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$, the greatest attainable rank equals $\operatorname{QMinCut} = \min(ad, bc)$ (verified in Lean), though a single draw can fall lower; outside the cone, the four cuts must be compared; modes: the number of modes of a spectrum that reach the threshold $\theta$ is at most $T/\theta$ (verified in Lean). The curve with $c = 1$ is schematic, not a measurement of any algorithm.
:::

---

## The Field-Theoretic Isomorphism Between Navier–Stokes and $P$ vs. $NP$ — Lamb Bivectors, 3D Vortex Stretching, and Arnold Geodesics {#sec-coda-navier-stokes-and-p-vs-np}

> **Author's original words**: "When both the Navier–Stokes problem and the $P$/$NP$ problem are cast into field form, they look strikingly alike."
> （“navier stokes与P/NP 问题, 都场化的话似乎很像”）

Placing the **Navier–Stokes (NS) existence and smoothness problem** alongside the **$P$ vs. $NP$ problem** inside our Clifford orthogonal field model (`MODEL`) reveals that these two Millennium Prize Problems are the **continuous physical version** and the **discrete logical version** of the exact same geometric tension: **when a three-dimensional orthogonal system undergoes nonlinear self-referential coupling, can a smooth global guidance field ($P$ / laminar flow) be stretched, pinched, and collapsed by higher-order exterior curl into a one-dimensional singular filament of zero cross-sectional area ($NP$ witness thread / turbulent blow-up singularity)?**

### 1. Clifford Separation of Inner-Product Potential Flow and Exterior Bivector Vorticity (`MODEL`)

::: {.remark #rem-ch30-lamb-decomposition-literature title="Literature Note on the Incompressible Navier–Stokes Equations and Lamb's Convective Decomposition"}
**Literature result, not formalized in this book.** Both the continuum incompressible Navier–Stokes PDE system and H. Lamb's classical vector–bivector convective decomposition belong to the external mathematical-physics literature and are not formalized at the continuum PDE level in this book (the discrete 5-mode Fourier advection closure obstruction and 2D Fourier mild-path theorem verified in this book appear in [@thm-coda-quadratic-advection-no-closure] below): the incompressible Navier–Stokes equations read

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0.
$$

Using the Clifford geometric derivative $\nabla \mathbf{u} = \nabla\cdot\mathbf{u} + \nabla\wedge\mathbf{u}$ splits the convective nonlinearity $(\mathbf{u}\cdot\nabla)\mathbf{u}$ into an inner-product kinetic gradient and an exterior-product vorticity bivector coupling (Lamb's classical decomposition; see also [@rem-ch30-navier-stokes-forced-literature]):

$$
(\mathbf{u}\cdot\nabla)\mathbf{u} = \underbrace{\frac{1}{2}\nabla(\|\mathbf{u}\|^2)}_{\substack{\text{Irrotational kinetic gradient} \\ \text{Absorbed directly into Bernoulli pressure } -\nabla(p + \frac{1}{2}\|\mathbf{u}\|^2)}} + \underbrace{\mathbf{u}\cdot(\nabla\wedge\mathbf{u})}_{\substack{\text{Bivector vortex coupling }(\boldsymbol{\omega}\times\mathbf{u}) \\ \text{Coupling of 1D streamline with 2D orthogonal vorticity area}}}.
$$

In classical continuum fluid mechanics, this separates two regimes: when the orthogonal exterior curl vanishes ($\nabla\wedge\mathbf{u} = 0$, irrotational potential flow), the convective nonlinearity collapses to a pure scalar potential gradient absorbed directly into Bernoulli pressure, reducing a divergence-free irrotational flow on a simply connected domain to a linear Laplace potential field $\mathbf{u} = -\nabla\Phi$; when the orthogonal exterior curl is nonzero ($\nabla\wedge\mathbf{u} \neq 0$, rotational flow), because the exterior derivative of a scalar gradient vanishes identically, scalar pressure gradients cannot cancel the exterior curl $\nabla\wedge\mathbf{u}$, coupling streamlines nonlinearly with orthogonal vorticity planes.
:::

::: {.viz src="navier-stokes-p-np" preset="potential" height="500"}
**No vorticity: advection is a gradient.** At $s = 0$ the flow is the stagnation flow $\mathbf{u} = (x, -y)$, with no vorticity. At the amber probe the white advection arrow coincides with the cyan gradient half, and the magenta Lamb half is zero: the whole term joins the pressure.
:::

Mapping the irrotational and rotational regimes recorded in [@rem-ch30-lamb-decomposition-literature] onto the geometric analogy (`MODEL`) of the preceding section — "$P$ as an irrotational guidance field, $NP$ as a thread in a rotational wilderness" — aligns the irrotational phase conceptually with a smooth global guidance field (analogous to a hydrodynamic $P$ state) and the rotational phase with multi-scale eddy entanglement.

::: {.viz src="navier-stokes-p-np" preset="vortex" height="500"}
**The two halves of the advection term.** Streamlines of the plane flow $\mathbf{u} = (1 - s)(x, -y) + s(-y, x)$ at $s = 0.8$, with vorticity $\omega = 2s = 1.6$. At the amber probe the white arrow is the advection term $(\mathbf{u}\cdot\nabla)\mathbf{u}$, the sum of the cyan gradient half $\nabla(\|\mathbf{u}\|^2/2)$ and the magenta Lamb half $\boldsymbol{\omega}\times\mathbf{u}$; turn $s$ back to $0$ and the magenta arrow vanishes. The probe can be dragged.
:::

### 2. Why Both Problems Undergo a Phase Transition at Dimension $2 \to 3$ (Geometric Analogy `MODEL` & Open-Conjecture Boundary)

::: {.remark #rem-ch30-vorticity-transport-literature title="Literature Note on the Vorticity Transport Equation, Vortex Stretching, and Slender-Tube Circulation Scaling"}
**Literature result, not formalized in this book.** Taking the exterior curl of the momentum equation in [@rem-ch30-lamb-decomposition-literature] yields the classical hydrodynamic transport equation for vorticity $\boldsymbol{\omega} = \star(\nabla\wedge\mathbf{u})$:

$$
\frac{\partial \boldsymbol{\omega}}{\partial t} + (\mathbf{u}\cdot\nabla)\boldsymbol{\omega} = \underbrace{(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}}_{\text{Vortex-stretching term}} + \nu \nabla^2 \boldsymbol{\omega}.
$$

In a 2D planar flow $\mathbf{u}(x_1, x_2, t) = (u_1, u_2, 0)$, the vorticity vector $\boldsymbol{\omega} = \omega\mathbf{e}_3$ points strictly perpendicular to the velocity plane ($\partial_{x_3}\mathbf{u} = \mathbf{0}$), so the vortex-stretching term $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u} \equiv \mathbf{0}$ vanishes identically; in 3D, $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}$ is generically nonzero. Combined with Kelvin's circulation scaling $\Gamma \approx A\|\boldsymbol{\omega}\|$ for a slender vortex tube of cross-section $A$, the classical **conditional collapse scenario** states that if axial stretching locally outpaces viscous diffusion $\nu\nabla^2\boldsymbol{\omega}$ and pinches $A \to 0$, local vorticity amplifies according to

$$
\text{Axial stretching outpaces viscosity with } A \to 0 \implies \|\boldsymbol{\omega}\| \approx \frac{\Gamma}{A} \to \infty.
$$
:::

::: {.viz src="navier-stokes-p-np" preset="flat" height="500"}
**Two dimensions: no stretching.** The vorticity is normal to the plane of the flow and nothing pulls on it. The tube does not thin; viscosity only widens it slowly (the cross-section $A$ grows from the dashed $1$ to about $2$), the circulation $\Gamma = \omega A$ of the cyan loop stays fixed, and the magenta vorticity can only fall (a schematic model, `MODEL`).
:::

::: {.viz src="navier-stokes-p-np" preset="strain" height="500"}
**Three dimensions: thinner and thinner.** Pull the tube along its axis at a steady rate, without viscosity: it grows longer and thinner, the circulation $\Gamma = \omega A$ of the cyan loop stays fixed, and so the magenta vorticity grows like $\Gamma/A$ all the way, the $\|\boldsymbol{\omega}\| \approx \Gamma/A$ of the formula above (a schematic model, `MODEL`).
:::

Comparing [@rem-ch30-vorticity-transport-literature] with the dimensional watershed of computational complexity shows that the structural transition occurs at **$2 \to 3$** in both domains (stated here as a cross-domain structural analogy, `MODEL`, rather than a formal complexity equivalence):

- **2D Planar Regime ([@rem-ch30-vorticity-transport-literature]) $\leftrightarrow$ Analogy to Binary 2-SAT (`MODEL`)**:
  Juxtaposing the 2D planar regime recorded in [@rem-ch30-vorticity-transport-literature] with binary 2-SAT (`MODEL`), in our pinned `trureturing@dev` library the frozen theorem [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) establishes a **conditional higher-grade regularity propagation theorem** on the 2D periodic Fourier lattice: given an already-existing continuous weighted-$H^2$, zero-mean, real divergence-free mild solution path on $[0, \tau]$ whose initial data is summable at all spatial Sobolev grades $m \in \mathbb{N}$, the path satisfies the strong differential equation at every grade $m$ (for unconditional 2D global smoothness in the classical PDE literature, see [@rem-ch30-navier-stokes-forced-literature]).
- **Conditional 3D Slender-Tube Scenario ([@rem-ch30-vorticity-transport-literature]) $\leftrightarrow$ Analogy to Three-Body 3-SAT (`MODEL`)**:
  Juxtaposing the conditional 3D slender-tube scenario recorded in [@rem-ch30-vorticity-transport-literature] with three-body 3-SAT, in our geometric analogy (`MODEL`) that conditional scenario pictures compressing a smooth 3D "field (analogous to $P$)" toward a "1D filament (analogous to an $NP$ witness thread)"!

**One specimen on the two-dimensional side that can be computed to the end: all the vorticity on finitely many points.** In a planar flow the vortex-stretching term vanishes identically ([@rem-ch30-vorticity-transport-literature]), and a straight filament perpendicular to the plane is, in the plane, just a point being carried along. Push this picture to its cleanest extreme: a planar flow that is irrotational everywhere except at $N$ points, each pierced by such a filament. In this classical picture ([@rem-ch30-point-vortex-literature]) the field has no degrees of freedom of its own; the whole dynamics is the motion of the $N$ piercing points, a system of ordinary differential equations on $\mathbb{R}^{2N}$. The pinned `trureturing@dev` library freezes the complete linear theory of one version of these equations (each vortex carries an extra precession about the origin): $2m$ vortices of alternating sign on a regular polygon, the radius at which the polygon stands still, and, for the linearization there, every eigenvalue, its multiplicity, and the number of directions along which perturbations grow.

::: {.remark #rem-ch30-point-vortex-literature title="Point-Vortex Equations and the Precession Term of Trapped Condensates (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In a two-dimensional ideal incompressible flow, vorticity is carried along by the fluid (H. von Helmholtz, 1858). Concentrate it on $N$ points, the $k$-th with circulation $\Gamma_k$, and each point moves with the velocity that the others induce at its position (G. Kirchhoff, 1876):

$$
\begin{aligned}
\dot{x}_j &= -\frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{y_j - y_k}{d_{jk}},\\
\dot{y}_j &= \frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{x_j - x_k}{d_{jk}},\\
d_{jk} &= (x_j - x_k)^2 + (y_j - y_k)^2 .
\end{aligned}
$$

Particle models for a few quantized vortices in a trapped Bose–Einstein condensate add to each vortex a precession about the trap center whose sense is set by the sign of that vortex. The equations of [@def-ch30-alternating-vortex-polygon] and the alternating polygon are taken from A. M. Barry and P. G. Kevrekidis, *Few-particle vortex cluster equilibria in Bose–Einstein condensates: existence and stability* (arXiv:1306.1545, 2013). What is frozen below is a set of properties of this system of ordinary differential equations; how it relates to solutions of the Gross–Pitaevskii equation or of the Navier–Stokes equations lies outside what this book formalizes.
:::

::: {.definition #def-ch30-alternating-vortex-polygon title="Point-Vortex Field with Precession, Collision-Free Configurations, the Alternating Regular Polygon, and the Normalized Jacobian" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.CollisionFree D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charge D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.polygon D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.rotate D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.jacobian"}
Let $N \in \mathbb{N}$ and $b, \Omega \in \mathbb{R}$.

1. A **configuration** is $z = (x_1, \dots, x_N;\, y_1, \dots, y_N) \in \mathbb{R}^{2N}$, where $(x_j, y_j)$ is the position of the $j$-th vortex (in Lean, `Fin N ⊕ Fin N → ℝ` with indices starting at $0$, so that Lean's index is $j - 1$). The **sign** of the $j$-th vortex is $s_j = (-1)^{j+1}$.
2. Write $d_{jk} = (x_j - x_k)^2 + (y_j - y_k)^2$. A configuration is **collision-free** if $d_{jk} \neq 0$ for all $j \neq k$.
3. The **field** $F_{b,\Omega} : \mathbb{R}^{2N} \to \mathbb{R}^{2N}$ has, in the coordinates $x_j$ and $y_j$, the components

   $$
   \begin{aligned}
   F_{b,\Omega}(z)_{x_j} &= -s_j\,\Omega\,y_j - \frac{b}{2}\sum_{k \neq j} s_k\,\frac{y_j - y_k}{d_{jk}},\\
   F_{b,\Omega}(z)_{y_j} &= s_j\,\Omega\,x_j + \frac{b}{2}\sum_{k \neq j} s_k\,\frac{x_j - x_k}{d_{jk}} .
   \end{aligned}
   $$

   Division in Lean is a total function (division by zero gives zero), so $F_{b,\Omega}$ is defined for every $z$; the equation of motion $\dot{z} = F_{b,\Omega}(z)$ is meaningful only on collision-free configurations, and every statement below is made at a collision-free configuration.
4. The **unit regular polygon** $P_N$ has vertices $x_j = \cos(2\pi j/N)$, $y_j = \sin(2\pi j/N)$. For $\rho, \theta \in \mathbb{R}$, $P_N(\rho, \theta)$ is the configuration obtained by rotating every vertex of $P_N$ about the origin through the angle $\theta$ and then multiplying by $\rho$. The **equilibrium radius** is $R_{b,\Omega} = \sqrt{b/(4\Omega)}$ (used below only for $b > 0$ and $\Omega > 0$).
5. The **normalized Jacobian** $J_N$ is the matrix of partial derivatives of $F_{2,1/2}$ at $P_N$: $(J_N)_{pq}$ is the derivative at $t = 0$ of the function $t \mapsto F_{2,1/2}(P_N + t\,e_q)_p$, where $e_q$ is the unit vector of the $q$-th coordinate direction (Lean writes the field with $b = 2$, $\Omega = \tfrac12$ out separately, and [`normalized_field`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.normalized_field) proves that it equals $F_{2,1/2}$).
:::

Each of the two terms has one job. The sum is the velocity blown onto vortex $j$ by the others: the $k$-th vortex induces, at distance $r$, a velocity of magnitude $\frac{b}{2r}$, perpendicular to the line joining the two, with the sense given by $s_k$; compared with [@rem-ch30-point-vortex-literature], this is the choice $\Gamma_k = \pi b\,s_k$. The first term makes each vortex circle the origin on its own, with angular velocity $s_j\Omega$: for $\Omega > 0$, positive vortices go counterclockwise and negative ones clockwise. Put an even number of vortices of alternating sign on a circle of radius $\rho$ and the two terms pull against each other along the tangent. A manual derivation (it uses the tangential readout identity quoted in the proof below): the other vortices give the $j$-th one the tangential velocity $-s_j\,\frac{b}{4\rho}$, the precession gives it $s_j\,\Omega\rho$, and the two cancel exactly when $\rho^2 = \frac{b}{4\Omega}$. On too small a circle the neighbors win; on too large a circle the precession wins; a single radius brings the whole ring to rest.

::: {.figure src="ch30-vortex-radius"}
**Only one radius brings the whole ring to rest.** Across is the radius $\rho$ of the circle carrying the alternating vortices. The violet line is the size $\Omega\rho$ of the tangential velocity the precession gives each vortex, the cyan curve the size $\frac{b}{4\rho}$ of the tangential velocity blown in by the others; the two point in opposite directions and are equal only at $\rho = R_{b,\Omega} = \sqrt{b/(4\Omega)}$ (here $b = 2$, $\Omega = \tfrac12$, so $R = 1$). Left of the crossing the neighbors win, right of it the precession wins; the condition for rest is [@lem-ch30-vortex-polygon-equilibrium].
:::

::: {.lemma #lem-ch30-vortex-polygon-equilibrium title="When a Centered Regular Polygon Is Stationary, and the Fréchet Derivative at the Equilibrium" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular_equilibrium_iff_radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.scaled_equilibrium D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_derivative"}
Let $b > 0$ and $\Omega > 0$.

1. For $N \ge 3$, $\rho > 0$ and every $\theta \in \mathbb{R}$:

   $$
   F_{b,\Omega}\bigl(P_N(\rho, \theta)\bigr) = 0 \iff N \text{ is even and } \rho = R_{b,\Omega} .
   $$

2. For every $m \ge 1$, the configuration $R_{b,\Omega}\,P_{2m}$ is collision-free and $F_{b,\Omega}(R_{b,\Omega}\,P_{2m}) = 0$.
3. For every $N \in \mathbb{N}$, $F_{b,\Omega}$ is Fréchet differentiable at $R_{b,\Omega}\,P_N$, and its derivative is the linear map represented by the matrix $2\Omega\,J_N$.
:::

::: proof
The "only if" half of item 1 comes from a tangential readout ([`angular_readout`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.angular_readout)): if all vortices of a collision-free configuration $z$ lie at the same distance $\rho$ from the origin, then for every $j$

$$
x_j\,F_{b,\Omega}(z)_{y_j} - y_j\,F_{b,\Omega}(z)_{x_j} = s_j\,\Omega\,\rho^2 + \frac{b}{4}\Bigl(\sum_{k} s_k - s_j\Bigr),
$$

because at equal distances $x_j(x_j - x_k) + y_j(y_j - y_k) = d_{jk}/2$, so that each interaction term contributes exactly $\frac{b}{4}s_k$. For odd $N$ one has $\sum_k s_k = 1$, and $j = 1$ gives the right-hand side $\Omega\rho^2 \neq 0$; for even $N$ one has $\sum_k s_k = 0$, and the right-hand side is $s_j(\Omega\rho^2 - b/4)$. The "if" half first uses the scaling identity $F_{b,\Omega}(R\,w) = 2\Omega R\,F_{2,1/2}(w)$ (for $R \neq 0$, $b = 4\Omega R^2$ and $w$ collision-free, [`field_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_scaling)) and the covariance of the field under a common rotation to reduce to $P_{2m}$; on $P_{2m}$, pair the $k$-th vortex with its mirror image across the diameter through the $j$-th vertex: the two have the same sign, a pair contributes $s_k$ times the coordinates of the $j$-th vortex itself, and the total cancels the precession term exactly ([`equilibrium_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.equilibrium_all), for every $m \ge 1$). Item 3: at a collision-free point $F_{b,\Omega}$ is a rational expression with nonzero denominators, hence differentiable, and the matrix of partial derivatives is the matrix of the Fréchet derivative; differentiating the scaling identity along the coordinate directions multiplies the outer factor $2\Omega R$ by the inner factor $1/R$ and yields $2\Omega\,J_N$ ([`jacobian_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.jacobian_scaling)). The full proof is checked by the Lean kernel.
:::

Item 3 fixes what "spectrum" means from here on: the spectrum of the Fréchet derivative of the field $F_{b,\Omega}$ itself at the equilibrium, not of some matrix reduced by hand beforehand. It also separates the roles of the two parameters: $b$ appears only in the radius $R_{b,\Omega}$ and never enters the derivative; $\Omega$, besides its effect on the radius, only multiplies the derivative by $2\Omega$, which amounts to a change of the unit of time. So it is enough to study one parameter-free real $4m \times 4m$ matrix, $J_{2m}$.

::: {.theorem #thm-ch30-vortex-polygon-spectrum title="Complete Characteristic Polynomial of the Alternating Vortex Polygon and Its Stable and Unstable Spaces of Dimension $2(m-2)$" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_factored D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator_eq D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_positive_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_negative_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_unstable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_stable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_real_dimensions"}
Let $m \ge 3$.

1. The characteristic polynomial $\chi_{2m}(X) = \det(X\,I - J_{2m})$ of $J_{2m}$ is

   $$
   \begin{aligned}
   \chi_{2m}(X) &= X^2\,\Bigl(X^2 + \frac{m^2}{2}\Bigr)\Bigl(X^2 + \frac{(m-1)^2}{4}\Bigr)^{2}\\
   &\quad\times \prod_{r=2}^{m-1}\Bigl(X^2 - \frac{(m-r)^2\,(r^2-2)}{4}\Bigr)^{2} .
   \end{aligned}
   $$

2. Let $b > 0$, $\Omega > 0$, and let $A_{b,\Omega}$ be the linear operator on $\mathbb{R}^{4m}$ whose matrix is the matrix of partial derivatives of $F_{b,\Omega}$ at $R_{b,\Omega}\,P_{2m}$ ([`physicalRealOperator`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator)). Then $A_{b,\Omega} = 2\Omega\,J_{2m}$. Write

   $$
   \lambda_r = \Omega\,(m - r)\sqrt{r^2 - 2}, \qquad r = 2, \dots, m-1 .
   $$

   For every real $\mu > 0$: $\mu$ is an eigenvalue of $A_{b,\Omega}$ if and only if $\mu = \lambda_r$ for some $r \in \{2, \dots, m-1\}$. For every real $\mu < 0$: $\mu$ is an eigenvalue of $A_{b,\Omega}$ if and only if $\mu = -\lambda_r$ for some $r \in \{2, \dots, m-1\}$.
3. Under the assumptions of item 2, let $E^{u}$ be the sum of the eigenspaces of all positive real eigenvalues of $A_{b,\Omega}$ and $E^{s}$ the sum of the eigenspaces of all negative real eigenvalues. Then

   $$
   \dim_{\mathbb{R}} E^{u} = \dim_{\mathbb{R}} E^{s} = 2(m - 2) .
   $$
:::

::: proof
Split the displacement of each vortex into its radial and its tangential component; this is an orthogonal change of coordinates. In these coordinates $J_{2m}$ becomes the block anti-diagonal matrix $\begin{pmatrix} 0 & B \\ C & 0 \end{pmatrix}$ with $B = (\delta\,I - W)\,S$ and $C = ((\delta + 1)\,I - W)\,S$, where the off-diagonal entries of $W$ are the inverse squared chord lengths $1/d_{jk}$ of $P_{2m}$, its diagonal is zero, $S = \operatorname{diag}(s_j)$ and $\delta = \frac{(2m)^2 - 1}{12} - \frac{m^2}{2}$ ([`rotated_jacobian_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.rotated_jacobian_all)). For $x \neq 0$ a Schur complement gives $\chi_{2m}(x) = \det(x^2 I - CB)$. The matrix $W$ is circulant, the discrete Fourier transform diagonalizes it, and its $k$-th eigenvalue is $\frac{(2m)^2 - 1}{12} - \frac{k(2m - k)}{2}$ ([`chordWeight_dft`](lean:D5/S3/FluidDynamics/Vortices/InverseChordCirculant.chordWeight_dft)); the alternating signs $S$ shift the frequency $k$ by $m$. Hence $\det(y\,I - CB) = \prod_{k=0}^{2m-1}(y - \gamma_k)$ with $\gamma_k = (m - r)^2(r^2 - 2)/4$ and $r = \min(k, 2m - k)$. Two polynomials that agree at infinitely many points are equal, so $\chi_{2m}(X) = \prod_k (X^2 - \gamma_k)$ ([`charpoly_mode_product`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charpoly_mode_product)). The values $r = 0$ and $r = m$ each come from one $k$, every other $r$ from two; these are the exponents in item 1. One has $\gamma_k > 0$ only for $2 \le r \le m - 1$, and different $r$ give different values: $(m-k)^2(k^2-2) \neq (m-l)^2(l^2-2)$ for integers $2 \le k < l < m$ ([`distinctness_certificate`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.distinctness_certificate)). Each such real root has a $2$-dimensional eigenspace in $\mathbb{R}^{4m}$ ([`real_geometric_multiplicity`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealSpaces.real_geometric_multiplicity)), eigenspaces of different eigenvalues are linearly independent, and adding $m - 2$ spaces of dimension $2$ gives item 3. Passing to general $b$ and $\Omega$ only multiplies by $2\Omega$: the eigenspaces stay the same and every eigenvalue is multiplied by $2\Omega$. The full proof is checked by the Lean kernel.
:::

The four factors are four kinds of motion. $X^2$ is the eigenvalue zero, treated separately below. The two factors with a plus sign give the purely imaginary roots $\pm i\,m/\sqrt{2}$ and $\pm i\,(m-1)/2$: oscillations about the equilibrium that neither grow nor decay. The factors with a minus sign give pairs of real roots: the positive one grows, the negative one decays. The library holds one more frozen theorem ([`off_axis_is_real`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealBoundary.off_axis_is_real)): a complex eigenvalue of $J_{2m}$ with nonzero real part is real, so $E^{u}$ and $E^{s}$ already contain every growing and every decaying eigendirection. The hexagon ($m = 3$) is the first polygon with a growing direction, and each further pair of vortices adds two more.

::: {.proposition #prop-ch30-vortex-polygon-neutral-drift title="Semisimple Nonzero Eigenvalues, a Jordan Block of Size Two at Zero, and Unbounded Linear Drift; Dipole and Square" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonDecomposition.geometric_eq_algebraic D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_generalized_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_geometric_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.cartesian_chain D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.unbounded_linear_drift D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.dipole D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.square"}
Let $m \ge 1$. Items 1, 2 and 4 regard $J_{2m}$ as a linear operator on $\mathbb{C}^{4m}$.

1. For every nonzero complex number $\mu$, the complex dimension of the eigenspace of $\mu$ equals the multiplicity of $\mu$ as a root of the characteristic polynomial of $J_{2m}$.
2. The generalized eigenspace of the eigenvalue $0$ has dimension $2$, and its eigenspace has dimension $1$.
3. Let $(x_j, y_j)$ be the vertices of $P_{2m}$, let $\delta_m = 1 - m^2/2$, and take the vectors of $\mathbb{R}^{4m}$

   $$
   \begin{aligned}
   c_0 &= (-y_1, \dots, -y_{2m};\; x_1, \dots, x_{2m}),\\
   c_1 &= \frac{1}{\delta_m}\,(s_1 x_1, \dots, s_{2m} x_{2m};\; s_1 y_1, \dots, s_{2m} y_{2m}) .
   \end{aligned}
   $$

   Then $J_{2m}\,c_0 = 0$ and $J_{2m}\,c_1 = c_0$; the curve $v(t) = c_1 + t\,c_0$ satisfies $v'(t) = J_{2m}\,v(t)$ for every $t \in \mathbb{R}$, and the set $\{v(t) : t \in \mathbb{R}\}$ is unbounded.
4. The characteristic polynomial of $J_2$ is $X^2\bigl(X^2 + \tfrac12\bigr)$, and its complex eigenvalues are exactly $0$ and $\pm i/\sqrt{2}$; the characteristic polynomial of $J_4$ is $X^2\bigl(X^2 + 2\bigr)\bigl(X^2 + \tfrac14\bigr)^2$, and its complex eigenvalues are exactly $0$, $\pm i\sqrt{2}$ and $\pm i/2$.
:::

::: proof
A discrete Fourier transform on top of the radial and tangential coordinates splits $\mathbb{C}^{4m}$ into $2m$ invariant blocks of dimension two. On the $q$-th block the operator has the matrix $\begin{pmatrix} 0 & \ell_q \\ \ell_{q+m} + 1 & 0 \end{pmatrix}$, where $\ell_q = -(m - q)^2/2$ and indices are taken modulo $2m$ in $\{0, \dots, 2m-1\}$ ([`actual_normal_form`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonJordan.actual_normal_form)); the product of the two off-diagonal entries is the $\gamma_q$ of the previous proof. For nonzero $\mu$, a direct computation on each block shows that $(T - \mu)^2 v = 0$ implies $(T - \mu)v = 0$ (with $T$ this operator): a nonzero eigenvalue has no Jordan chain, its generalized eigenspace equals its eigenspace, and the dimension of a generalized eigenspace is the multiplicity of the root, which is item 1. On the $q$-th block $T^2$ is multiplication by $\gamma_q$, so the generalized eigenspace of $0$ is exactly the sum of the blocks with $\gamma_q = 0$; this happens only for $q = m$. There $\ell_m = 0$, while the other off-diagonal entry is $\ell_0 + 1 = \delta_m$, which is nonzero because $m^2 = 2$ has no integer solution. That block is a nilpotent Jordan block of size two, which is item 2. Item 3 is checked directly in radial and tangential coordinates: $c_0$ displaces every vortex tangentially by $1$ and radially by $0$, while $c_1$ displaces it radially by $s_j/\delta_m$ and tangentially by $0$; in the notation of the previous proof, the row sums $\sum_k W_{jk} = \frac{(2m)^2 - 1}{12}$ and the alternating row sums $\sum_k s_k W_{jk} = s_j\,\delta$ give $B\,\mathbf{1} = 0$ and $C\,(s/\delta_m) = \mathbf{1}$ (here $\mathbf{1}$ is the all-ones vector and $s/\delta_m$ has $j$-th component $s_j/\delta_m$), that is, $J_{2m}c_0 = 0$ and $J_{2m}c_1 = c_0$. Then $J_{2m}(c_1 + t\,c_0) = c_0 = v'(t)$, and unboundedness follows from $c_0 \neq 0$. Item 4 substitutes $m = 1, 2$ into the folded formula $\chi_{2m}(X) = X^2\bigl(X^2 + \tfrac{m^2}{2}\bigr)\prod_{r=1}^{m-1}\bigl(X^2 - \tfrac{(m-r)^2(r^2-2)}{4}\bigr)^2$, valid for every $m \ge 1$ ([`charpoly_folded`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_folded)). The full proof is checked by the Lean kernel.
:::

The vector $c_0$ is an infinitesimal rotation of the whole polygon about the origin: the field is covariant under a common rotation (as used in the proof of [@lem-ch30-vortex-polygon-equilibrium]), the rotated polygon is still at rest, and so this direction lies in the kernel of $J_{2m}$. The vector $c_1$ moves the positive vortices along their radii by $1/\delta_m$ and the negative ones by the same distance the other way. Once the two kinds of vortex sit at slightly different radii, the solution of the linearized equation does not oscillate; the whole ring turns away along $c_0$ at constant speed. The spectrum does not show this: zero and purely imaginary numbers both count as "no growth", and yet a Jordan block of size two makes the solution grow linearly in time. For the dipole ($m = 1$) and the square ($m = 2$) every eigenvalue lies on the imaginary axis, and their linearized equations have such an unbounded solution all the same. For general $b, \Omega > 0$ it suffices to divide $c_1$ by $2\Omega$ ([`physical_cartesian_chain`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_cartesian_chain)).

::: {.example #ex-ch30-vortex-octagon-spectrum title="The Sixteen Eigenvalues of the Regular Octagon: Computed Numerically from the Equations, Then Compared Item by Item with the Frozen Multiplicities"}
Take $m = 4$, $b = 2$, $\Omega = \tfrac12$, so that $R_{b,\Omega} = 1$: eight vortices on the unit circle, with phase space $\mathbb{R}^{16}$. The numbers below use only the equations of [@def-ch30-alternating-vortex-polygon] and no closed form: the field is typed in term by term, its $16 \times 16$ matrix of partial derivatives at $P_8$ is obtained by symbolic differentiation (it differs entrywise by at most $3 \times 10^{-24}$ from central differences with step $10^{-12}$), and the eigenvalues are computed with $40$ decimal digits; the algebraic multiplicity is the number of numerically coincident eigenvalues and the geometric multiplicity is $16 - \operatorname{rank}(J_8 - \lambda I)$. The largest component of the field at $P_8$ is $8 \times 10^{-41}$. The label $r$ is that of the proof of [@thm-ch30-vortex-polygon-spectrum]: $r = 0, 1$ belong to the two factors with a plus sign and $r = m$ to $X^2$. Eigenvalues are rounded to the digits shown:

| Label $r$ | Root given by the frozen declarations | Numerical eigenvalue | Algebraic multiplicity | Geometric multiplicity |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $\pm 2\sqrt{2}\,i$ | $\pm 2.828427\,i$ | $1$ | $1$ |
| $1$ | $\pm \tfrac32\,i$ | $\pm 1.500000\,i$ | $2$ | $2$ |
| $2$ | $\pm\sqrt{2}$ | $\pm 1.414214$ | $2$ | $2$ |
| $3$ | $\pm\tfrac12\sqrt{7}$ | $\pm 1.322876$ | $2$ | $2$ |
| $4$ | $0$ | $0$ (modulus below $2 \times 10^{-20}$) | $2$ | $1$ |

The multiplicities add up to $2 + 4 + 4 + 4 + 2 = 16$. Counted with multiplicity there are $4 = 2(m - 2)$ positive real eigenvalues and likewise $4$ negative ones. $\operatorname{rank} J_8 = 15$ and $\operatorname{rank} J_8^2 = \operatorname{rank} J_8^3 = 14$: the eigenvalue zero carries exactly one Jordan block of size two. The two positive roots $1.414214$ and $1.322876$ lie close together but do not coincide: different $r$ give different roots, so every real root has multiplicity exactly $2$ and none has more. The hexagon ($m = 3$), treated the same way, gives $\pm 0.707107$ (each double), $\pm 1.000000\,i$ (each double), $\pm 2.121320\,i$ (each simple) and a double eigenvalue zero of geometric multiplicity $1$, with $2 = 2(m - 2)$ positive real eigenvalues.

**Other parameters.** For $b = 1$, $\Omega = 1$ ($R_{b,\Omega} = 0.5$) the two positive real eigenvalues of the octagon become $2.828427$ and $2.645751$; for $b = 1.35$, $\Omega = 0.25$ ($R_{b,\Omega} = 1.161895$) they become $0.707107$ and $0.661438$. Both pairs are the table values times $2\Omega$, whatever $b$ is.

**Back to the nonlinear equations.** Everything above concerns the linearization. The following two numerical experiments integrate $\dot{z} = F_{2,1/2}(z)$ directly (fourth-order Runge–Kutta with $30$ digits; halving the step leaves the digits shown unchanged). First, the hexagon: starting from $P_6 + 10^{-9}u$, with $u$ a unit eigenvector for the eigenvalue $1/\sqrt{2}$, the distance from $P_6$ at $t = 10$ has grown to about $1177.4$ times its initial value, within a relative $10^{-6}$ of $e^{10/\sqrt{2}} = 1177.405$ (the eigenspace is two-dimensional, and this holds whichever unit vector of it is taken). Second, the square: starting from $P_4 + 10^{-3}c_1$ (positive vortices at radius $0.999$, negative ones at radius $1.001$), the four vortices have turned about the origin by $0.0100001$ radians on average at $t = 10$ and by $0.100001$ radians at $t = 100$; the linearized solution $10^{-3}(c_1 + t\,c_0)$ predicts the angle $10^{-3}t$. The linearized solution runs off along the tangent without bound; in the nonlinear equations, what one sees over this time span is the whole ring turning slowly about the origin. These two experiments are numerical observations, not frozen declarations.
:::

This specimen separates three things that are easily run together. The right-hand side of the equations is differentiable at collision-free configurations ([`field_differentiable_at`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_differentiable_at)), the equilibrium is such a configuration, and nothing is singular there; yet from the hexagon on, the linearization has growing directions spanning exactly $2(m - 2)$ dimensions; and for the spectrally neutral dipole and square the linearized equations still have an unbounded solution. Differentiable does not mean stable, and spectrally neutral does not mean bounded. Back in this chapter's analogy (`MODEL`): the "lines" here have already shrunk to points in the plane, with nothing between them to entangle, and yet the growing directions are all there; none of them needs vortex stretching. The three-dimensional question lies elsewhere: there a filament is no longer just a point being carried along; it can also be stretched.

Before stating the open unforced Clay Millennium conjecture, we strictly isolate the classical 2D regularity theorem and the **forced regime (Clay Statements C / D, with smooth external forcing $\mathbf{f} \in C^\infty$)** inside a dedicated literature remark so that the red `OPEN` conjecture box below states purely the unresolved autonomous unforced problem:

::: {.remark #rem-ch30-navier-stokes-forced-literature title="Literature Note on Lamb's Identity, 2D Global Regularity, and the 2026 Forced Blow-Up of Statements C / D"}
**Literature result, not formalized in this book.** The classical hydrodynamic identities, unconditional 2D global smoothness theorem, and 3D **forced** Navier–Stokes blow-up results referenced in this section belong to the external literature outside the `trureturing@dev` declarations locked in this book:

1. **Lamb's Identity, Helicity Hopf Invariant, and Unconditional 2D Global Regularity**: The convective decomposition $(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \boldsymbol{\omega}\times\mathbf{u}$ is due to H. Lamb (*Hydrodynamics*), inviscid flux conservation to Kelvin's circulation theorem (Lord Kelvin, 1869), and the topological identification of inviscid helicity $\mathcal{H} = \int \mathbf{u}\cdot\boldsymbol{\omega}\,dV$ with Hopf linking on $S^3$ to J. J. Moreau (1961) and H. K. Moffatt (1969); unconditional global-in-time existence and smoothness for 2D incompressible Navier–Stokes was proved by O. A. Ladyzhenskaya (*The Mathematical Theory of Viscous Incompressible Flow*, 1969) (distinct from the inline conditional Fourier mild-path theorem [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path), which assumes a continuous mild path on $[0, \tau]$ as given).
2. **2026 Finite-Time Blow-Up Construction and External Lean 4 Verification for Forced 3D Navier–Stokes (Clay Statements C / D, Smooth Forcing $\mathbf{f} \in C^\infty$)**: In C. Fefferman's Clay Millennium formulation, forced Statements C / D allow a smooth, compactly supported external forcing field $\mathbf{f}(\mathbf{x}, t)$ keeping total kinetic energy uniformly bounded ($\sup_t \|\mathbf{u}(\cdot, t)\|_{L^2} < \infty$). A 166-page analytical construction announced in 2026 together with an external Lean 4 formalization establishes that under such smooth external forcing, phase-aligned pumping of an inward-spiraling, axially elongating self-similar vortex filament can overpower viscous diffusion $\nu\nabla^2\mathbf{u}$ in finite time $T^* < \infty$, producing $A(t) \to 0$ and $\limsup_{t \nearrow T^*} \|\mathbf{u}(\cdot, t)\|_{L^\infty} = \infty$ (see also related Euler and fluid singularity results by T. M. Elgindi, *Ann. of Math.* **194**, 2021; J. Chen & T. Y. Hou, 2022–2023; D. Córdoba & L. Martínez-Zoroa; and T. Buckmaster & L. Alpöge, 2026). These results apply to forced or inviscid settings and **do not resolve** the unforced ($\mathbf{f} \equiv \mathbf{0}$) viscous Statements A / B below.
:::

::: {.viz src="navier-stokes-p-np" preset="burgers" height="500"}
**Viscosity holds: the Burgers vortex.** Add viscosity to the steady stretching: the thinning core also spreads outwards, the cross-section $A$ stops shrinking near $4\pi\nu/\alpha$, the magenta vorticity levels off with it, and the circulation of the cyan loop is still $1$. Stretching and viscosity balance exactly and the tube does not pinch off (a schematic model, `MODEL`).
:::

::: {.viz src="navier-stokes-p-np" preset="runaway" height="500"}
**Thinner and thinner (a schematic model).** The circulation $\Gamma = \omega A$ of the cyan loop stays fixed; the dashed outline is the tube as it started. Here the strain is taken proportional to the vorticity itself ($\alpha = \kappa\omega$, a schematic closure and not a solution of the Navier–Stokes equations): $\kappa\Gamma = 0.50$ exceeds $4\pi\nu = 0.151$, so by $t = 2.4$ the cross-section is down to $0.162$ and the magenta vorticity up to $6.18$, and the cross-section reaches zero at $t^* = 2.86$. Whether a real three-dimensional fluid does this is the open problem stated next (`MODEL`).
:::

::: {.conjecture #conj-coda-navier-stokes-regularity title="Unforced 3D Incompressible Navier–Stokes Global Regularity Conjecture (Clay Millennium Statements A / B)"}
Fix strictly positive kinematic viscosity $\nu > 0$ and **identically zero external force ($\mathbf{f} \equiv \mathbf{0}$)**, and consider the autonomous three-dimensional incompressible Navier–Stokes equations on $\mathbb{R}^3$ (Statement A) or on the three-torus $\mathbb{T}^3 = \mathbb{R}^3/\mathbb{Z}^3$ (Statement B):

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0, \qquad \mathbf{u}(\mathbf{x}, 0) = \mathbf{u}_0(\mathbf{x}).
$$

For every smooth, divergence-free ($\nabla\cdot\mathbf{u}_0 = 0$) initial velocity field $\mathbf{u}_0$ satisfying Schwartz rapid decay on $\mathbb{R}^3$ (or smooth periodicity on $\mathbb{T}^3$), does there always exist a globally defined smooth solution $(\mathbf{u}, p) \in C^\infty$ on all of $\mathbb{R}^3 \times [0, \infty)$ (or $\mathbb{T}^3 \times [0, \infty)$) with bounded kinetic energy, or does some smooth unforced initial datum lose smoothness in finite time $T^* < \infty$ (finite-time blow-up)? This unforced 3D Navier–Stokes global regularity question remains open.
:::

### 3. Self-Reference of the Field and the Quadratic Advection Closure Obstruction (`LEAN ✓`)

Why is the quadratic convective coupling in [@rem-ch30-lamb-decomposition-literature] so formidable? Because in our geometric interpretation (`MODEL`), it is the **continuum field incarnation of Chapter 24's meta-self-reference $\psi(\psi)$** — whereas linear PDEs separate the operator from the state, in fluid advection **the velocity field $\mathbf{u}$ is simultaneously the state being transported and the differential operator performing the transport**! In Fourier space, quadratic self-coupling adds wavevectors ($\mathbf{k}_1 + \mathbf{k}_2 \to \mathbf{k}_3$), transferring energy across scales. For a finite observer restricted to an idempotent low-mode projection $P$ ($P^2 = P$), this cross-scale quadratic coupling directly shatters autonomous local closure — a fact mechanically verified in `trureturing@dev` by the **Quadratic Observation Closure Criterion and 5-Mode Fluid Advection Non-Closure Theorem**:

::: {.theorem #thm-coda-quadratic-advection-no-closure title="Quadratic Vector-Field Projection Closure Criterion and Finite-Mode Fluid Advection Non-Closure Theorem" lean="D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure"}
Let $E$ be a real module, let $L : E \to_{\mathbb{R}} E$ be a linear viscous drift operator, let $B : E \to_{\mathbb{R}} E \to_{\mathbb{R}} E$ be a bilinear advection operator defining the quadratic vector field $V(x) = L x - B(x, x)$, and let $P : E \to_{\mathbb{R}} E$ be an idempotent finite-resolution observation projection ($\forall x,\; P(P(x)) = P(x)$). Then:

1. **Necessary and Sufficient Criterion for Exact Quadratic Closure** ([`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff)): An exact Markovian closure map $f : E \to E$ satisfying $\forall x \in E,\; P(V(x)) = f(P(x))$ exists if and only if three orthogonal leakage conditions vanish simultaneously:
   - **Vanishing hidden linear leakage**: $\forall b \in E,\; P(b) = 0 \implies P(L(b)) = 0$;
   - **Vanishing hidden self-advection leakage**: $\forall b \in E,\; P(b) = 0 \implies P(B(b, b)) = 0$;
   - **Vanishing visible–hidden cross-scale mixed advection**: $\forall a, b \in E,\; P(a) = a \implies P(b) = 0 \implies P(B(a, b) + B(b, a)) = 0$.
2. **No Exact Closure for the 5-Mode Fourier–Galerkin Fluid Advection Instance** ([`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)): In the 5-mode Leray-projected Fourier state space $\operatorname{State} = \operatorname{Fin} 5 \to \operatorname{Amplitude}$, the visible low-frequency wave $a = \operatorname{family}(1, 0)$ ($P(a) = a$) and the hidden high-frequency wave $b = \operatorname{family}(0, 1)$ ($P(b) = 0$) couple via quadratic advection at transverse mode index $0$ (wavevector $\mathbf{k}_0 = (0, 1)$, component $0$) to produce a **nonzero projected cross-scale mixed advection witness** ([`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)):

   $$
   P\bigl(B(a, b) + B(b, a)\bigr)_{0, 0} = \frac{i}{4} \neq 0,
   $$

   directly refuting the third cross-scale mixed condition ([`mixed_condition_fails`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_condition_fails)) and yielding via the minus sign in $V(x) = L_\nu x - B(x, x)$ a **nonzero observed transverse fluid acceleration difference (gap)** equal to $-i/4$ ([`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)):

   $$
   \operatorname{acceleration}_\nu(1, 1)_{(0, 1), 0} - \operatorname{acceleration}_\nu(1, 0)_{(0, 1), 0} = -\frac{i}{4} \neq 0.
   $$

   Consequently, for every viscosity $\nu \in \mathbb{R}$, **no exact autonomous closure exists** on the projected low-mode space:

   $$
   \neg \exists f : \operatorname{State} \to \operatorname{State},\quad \forall x \in \operatorname{State},\; P\bigl(\operatorname{vectorField}(L_\nu, B, x)\bigr) = f(P(x)),
   $$

   nor does there exist any exact scalar predictor of the transverse fluid acceleration from low-mode observations alone ([`no_fluid_predictor_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_fluid_predictor_from_mixed)).
:::

::: proof
Part 1 follows from the idempotent decomposition $x = P(x) + (x - P(x))$ together with the exact observed-increment identity [`observed_increment`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.observed_increment):

$$
P(V(a + b)) - P(V(a)) = P(L(b)) - P(B(a, b) + B(b, a)) - P(B(b, b)).
$$

Necessity evaluates the increment on the opposite hidden pair $\pm b$ (isolating the odd linear term $P(L(b)) = 0$ and the even quadratic term $P(B(b, b)) = 0$) and on the sum $a + b$ with $P(a) = a, P(b) = 0$ (isolating the mixed term $P(B(a, b) + B(b, a)) = 0$); sufficiency sets $a = P(x)$ and $b = x - P(x)$ with $P(b) = 0$ to obtain $P(V(x)) = P(V(P(x)))$. Part 2 evaluates the Leray-projected convolution on the two-parameter wave family $\operatorname{family}(\alpha, \beta)$ at mode $0 = (0, 1)$, obtaining $+i/4$ for the projected mixed advection term ([`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)); substituting this together with kernel preservation $P(L_\nu(b)) = 0$ into the negatively signed quadratic increment identity yields the observed transverse fluid acceleration gap $-i/4 \neq 0$ ([`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)), refuting exact closure for every $\nu \in \mathbb{R}$ via Part 1. The full proof is checked by the Lean kernel.
:::

::: {.viz src="navier-stokes-p-np" preset="mixed" height="500"}
**The unseen variable leaks in.** An observer of $x$ alone: each curve shows, for one fixed $x$, how the seen acceleration $P(V)$ changes with the unseen $y$. With the mixed term on, the curves fan out: for the same $x = 0.5$, cyan marks the acceleration at $y = 0$, the amber point the acceleration at the current $y$, and the amber bar their difference. Where that difference is not zero there is no exact closure depending on $x$ alone (a schematic instance on $\mathbb{R}^2$; the general criterion and the five-mode instance are the theorem above).
:::

::: {.viz src="navier-stokes-p-np" preset="closed" height="500"}
**No leak: the low modes decide.** All three leaks are off: however the unseen $y$ moves, the amber point runs along a level line, with the same acceleration as the cyan one at $y = 0$, and their difference is zero. The observer of $x$ can predict the next step alone; this is the "if" half of the criterion above (a schematic instance on $\mathbb{R}^2$).
:::

### 4. Viscous Landauer Erasure, High-Dimensional Geodesics, and the Six-Row Continuum–Discrete Analogy (`MODEL`)

Three classical literature results concerning turbulent dissipation scales, averaged fluid logic-gate blow-up, and infinite-dimensional diffeomorphism geodesics are isolated in the following remark:

::: {.remark #rem-ch30-tao-arnold-literature title="Literature Note on Kolmogorov Scaling, Tao's Averaged Blow-Up, and Arnold's Geodesic Theorem"}
**Literature result, not formalized in this book.** Three classical results from fluid mechanics and geometric analysis cited in this section belong to the external literature and are not formalized in this book:

1. **Kolmogorov's Turbulent Cascade and Dissipation Microscale (A. N. Kolmogorov, *Dokl. Akad. Nauk SSSR* **30**, 1941)**: In phenomenological high-Reynolds-number isotropic turbulence, the inertial-range spectrum obeys $E(k) \propto \varepsilon^{2/3} k^{-5/3}$ down to the viscous dissipation microscale $\eta = (\nu^3/\varepsilon)^{1/4}$, requiring $N_{\mathrm{DOF}} \sim (L/\eta)^3 \sim \mathrm{Re}^{9/4}$ spatial degrees of freedom to resolve directly;
2. **Tao's Averaged 3D Navier–Stokes Finite-Time Blow-Up Theorem (Terence Tao, *J. Amer. Math. Soc.* **29**, 601–674, 2016)**: For an energy-conserving bilinearly averaged 3D Navier–Stokes system, nested vortex rings can be wired into a self-similar fluid logic-gate computer in which a parent ring passes its state to a child ring of scale $\lambda R$ ($\lambda \in (0, 1)$) whose local clock ticks $\lambda^{-2}$ times faster, completing infinitely many gate steps in finite time $T^* < \infty$ when supercritical stretching outpaces viscosity;
3. **Arnold's $\operatorname{SDiff}(M)$ Geodesic Theorem (Vladimir Arnold, *Ann. Inst. Fourier* **16**, 319–361, 1966)**: Smooth trajectories of an inviscid incompressible ideal fluid (the Euler equations, $\nu = 0$) coincide with constant-speed **geodesics** on the infinite-dimensional volume-preserving diffeomorphism group $\operatorname{SDiff}(M)$ under the right-invariant $L^2$ kinetic-energy metric (whose negative sectional curvatures in many 2-planes drive exponential divergence of nearby trajectories, whereas positive viscosity $\nu\nabla^2\mathbf{u}$ in Navier–Stokes introduces a dissipative departure from pure geodesic flow).
:::

Combining [@thm-coda-quadratic-advection-no-closure] with the literature context above yields three closing reflections in our geometric model (`MODEL`):

- **Viscous Dissipation as Landauer Erasure and the 1D Formal Proof Thread (`MODEL`)**: Physically, kinematic viscosity $\nu$ (cf. [@rem-ch30-lamb-decomposition-literature]) plays the role of Chapter 8's Landauer erasure of microscopic orthogonal rotational area into heat (compare the spherical gradient dissipation theorem [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)); proof-theoretically, whether in Tao's self-similar cascade or in the forced blow-up script of [@rem-ch30-navier-stokes-forced-literature], once a 1D formal proof thread is constructed, a verification kernel checks that 1D chain step by step.
- **Continuum Idealizations vs. Discrete Pairwise Measurements (`MODEL`)**: Long before any forced continuum solution reaches a mathematical $\|\nabla\mathbf{u}\| \to \infty$ singularity as $t \nearrow T^*$, local shear rates and length scales cross the physical validity thresholds of continuum incompressibility (where real fluids cavitate, compress, or hit molecular and quantum cutoffs). Returning to the dictum of the Prelude and [Chapter 21](ch21-diagonalization-and-escape.md) — ***"A smooth sphere is always only an approximation!"*** — ultraviolet PDE singularities mark the boundary of infinitely divisible continuum idealizations, whereas finite observers operate on discrete, finite-resolution lattices of pairwise measurements.
- **Six-Row Orthogonal Analogy Between Discrete Logic and Continuum Fluids (`MODEL`)**:

::: {.remark #rem-ch30-six-row-analogy-table title="Six-Row Orthogonal Analogy Between Discrete Logic and Continuum Fluids (Includes Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book (for the external complexity-theory and continuum fluid-mechanics literature cross-referenced below; verified formal theorems carry explicit GID links and unforced 3D Navier–Stokes regularity is marked `OPEN`).**

| Core Dimension | $P$ vs. $NP$ Problem (Discrete Logical Field) | Navier–Stokes Problem (Continuous Fluid Field) | Orthogonal Geometric Analogy (`MODEL`) |
| :--- | :--- | :--- | :--- |
| **Analogy for Efficient Solution** | **Guidance structures in some $P$ algorithms** ($P\subseteq NP$; zero curl is not a definition; cf. [@rem-ch30-karmarkar-kasteleyn-literature]) | **Irrotational potential flow / low-Re laminar flow** ($\nabla\wedge\mathbf{u}=0$ or viscosity-dominated; cf. [@rem-ch30-lamb-decomposition-literature]) | The author pictures efficient solution through local guidance; algorithms and cost analysis are still required |
| **Dimensional Watershed** | **2-SAT** vs. **3-SAT** (literature in [@rem-ch30-query-sos-literature]) | **2D NS** (literature in [@rem-ch30-navier-stokes-forced-literature]; conditional mild-path regularity [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)) vs. **3D unforced NS** ([@conj-coda-navier-stokes-regularity], `OPEN`) | Planar 2D flow has no third-axis vortex stretching; 3D permits axial vortex stretching (cf. [@rem-ch30-vorticity-transport-literature]) |
| **Complexity Engine** | Self-referential recursion & 3-body boolean frustration loops | Quadratic convective nonlinearity & vortex stretching ([@rem-ch30-lamb-decomposition-literature], [@rem-ch30-vorticity-transport-literature]) plus mixed leakage ([`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)) | Operator–state self-coupling $\psi(\psi)$, cascading across modes $\mathbf{k}_1+\mathbf{k}_2\to\mathbf{k}_3$ |
| **Analogy Between Witness and Singular Filament** | An **$NP$ witness thread** pictures checking, without implying intractability | Conditional collapse scenario with vanishing cross-section **1D singular vortex filament** (cf. [@rem-ch30-vorticity-transport-literature]) | Similar thread imagery does not establish a mathematical equivalence between complexity and fluid singularities |
| **Physical Firewall** | Finite observer's $90^\circ$ horizon & bounded memory order | Kinematic viscosity ([@rem-ch30-lamb-decomposition-literature]; cf. [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)) & microscopic cutoff | Landauer-type erasure of orthogonal area suppresses infinite-step Zeno cascades |
| **High-Dimensional View** | Timeless static field intersection (collapse literature in [@rem-ch30-postselection-ctc-literature]) | Infinite-dimensional manifold geodesic view (inviscid literature in [@rem-ch30-tao-arnold-literature]) | Simple geometric motion on a higher-dimensional manifold appears as complex nonlinear transfer under local projection |

:::

::: {.viz src="navier-stokes-p-np" height="640"}
**Interactive laboratory `ORTHO//VORTEX`**: the three scenes of this section. The two halves of the advection term: tune $s$ between the stagnation flow and rigid rotation and watch the Lamb half appear with the vorticity; the vortex tube: no stretching in two dimensions, thinning under steady strain in three until the Burgers core $4\pi\nu/\alpha$, and a pinch in finite time under the schematic self-stretching closure; closure: when an observer of $x$ alone can predict the next step (the criterion and the five-mode instance without closure are verified in Lean). The tube scene is a schematic model, not a numerical solution of the Navier–Stokes equations.
:::

---

## Chapter Summary: The Orthogonal Convergence of Discrete Logic and Continuum Fluids {#sec-ch30-summary}

The chapter connects discrete logic and continuum fluids through the author's aphorisms about the global static field, finite observers, “fields,” and “lines.” Mathematically, static satisfying subspaces, complexity equalities with extra resources, restricted-model lower bounds, and the open standard $P\neq NP$ question have distinct boundaries. In the finite-graph coloring example, the Gallai–Hasse–Roy–Vitaver theorem gives an exact equivalence between $k$-colorability and the existence of an orientation whose directed paths have at most $k$ vertices ([@thm-ch30-gallai-roy]); it exchanges two existence witnesses without providing an algorithm or settling the general $P$ vs. $NP$ question. The galactic crossover table compares illustrative upper bounds ([@ex-ch30-galactic-crossover-scale]), not universal search lower bounds. The fluid discussion juxtaposes **Lamb's decomposition ([@rem-ch30-lamb-decomposition-literature]), the open unforced 3D global regularity conjecture ([@conj-coda-navier-stokes-regularity]), and the quadratic advection projection closure obstruction ([@thm-coda-quadratic-advection-no-closure])**. These results offer points of reference for the author's geometric interpretation, without establishing mathematical equivalence between the two open problems.

Continuing across this orthogonal horizon, **[Chapter 31: The Essence of the Quantum Is Fairness](ch31-quantum-fairness.md)** and **[Chapter 32: Orthogonal Self-Referential Unified Field and Meta-Unification](ch32-unified-field-and-meta-unification.md)** unveil the fivefold abolition of geometric privilege, ergodic statistical holism, and cross-program meta-unification, before we enter the **[Coda: Outside All Spheres](coda.md)** to survey polyhedral angular-defect remainders (see Coda [@rem-coda-polyhedral-topology-literature]), the contracting fixed-point anchor, and the complete dependency map.
