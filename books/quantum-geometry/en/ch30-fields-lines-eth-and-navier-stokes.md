# Fields ($P$) and Lines ($NP$): From the Exponential Time Hypothesis (ETH) to Navier–Stokes Vortex Filaments

> *"In the global static time field $P = NP$, but for a finite observer $P \neq NP$. $P$ is a field; $NP$ is a line—constructing the field is hard as scaling heaven, while following the thread sees through in a single step; and when both Navier–Stokes and the $P$/$NP$ problem are cast as fields, they ask the exact same geometric question."*

In [Chapter 29](ch29-timeless-causality-and-gram-space.md), we saw that the global time field is a timeless geometric crystal (cf. Chapter 29's timeless literature remark [@rem-ch29-wheeler-dewitt-page-wootters-literature]), while any finite observer inside the field must pick points step by step within the causally compatible Gram elliptope ($\det G \ge 0$). We now carry this dual perspective of "global static field vs. finite observer" to the grandest intersection of contemporary mathematics and theoretical physics—placing **$\mathrm{P}$ vs. $\mathrm{NP}$**, the **Exponential Time Hypothesis (ETH) and the late-October 2026 tensor-network rank-reduction preprints ([@rem-ch30-eth-subexponential-literature])**, and the **open unforced three-dimensional Navier–Stokes regularity conjecture ([@conj-coda-navier-stokes-regularity]) alongside forced-regime literature advances ([@rem-ch30-navier-stokes-forced-literature])** onto a single Clifford orthogonal field canvas.

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

The unconditional restricted-model lower bounds corresponding to these two geometric pictures belong to the external complexity literature (and do not resolve the open uniform Turing-machine conjecture $\mathrm{P} \neq \mathrm{NP}$, [@conj-p-neq-np]):

::: {.remark #rem-ch30-query-sos-literature title="Literature Note on Black-Box Quantum Query and Bounded-Degree Sum-of-Squares Lower Bounds"}
**Literature result, not formalized in this book.** Three classical complexity results juxtaposed with our geometric model in this section come from the external literature and are not formalized in this book:

1. **Unstructured Black-Box Quantum Query Lower Bound (C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997)**: In the black-box oracle model, identifying a marked item among $N = 2^n$ candidates with bounded error requires $L = \Omega(2^{n/2})$ quantum queries (matching Grover's $O(2^{n/2})$ upper bound up to constants, $\Theta(2^{n/2})$);
2. **Classical Watershed Between 2-SAT and 3-SAT (S. A. Cook, 1971; L. A. Levin, 1973; B. Aspvall, M. F. Plass & R. E. Tarjan, 1979)**: 2-SAT is decidable in linear time $O(n+m)$ via strongly connected components of the implication graph (hence $\text{2-SAT} \in \mathrm{P}$), whereas 3-SAT is $\mathrm{NP}$-complete;
3. **Bounded-Degree Sum-of-Squares (SoS) Lower Bound (D. Grigoriev, *Theor. Comput. Sci.* **259**, 613–622, 2001; G. Schoenebeck, *FOCS*, 593–602, 2008)**: For random 3-XOR / 3-SAT instances that are globally unsatisfiable due to parity frustration, every local Lasserre / Gram semidefinite relaxation $G_M \succeq 0$ of degree $M = o(n)$ remains feasible and positive semidefinite with high probability, ruling out subexponential-size SoS refutations at sublinear degree.
:::

### 3. The Author's Interpretation: Complexity Horizons, Subjective Time, and Choice

Placing the global static field alongside the finite observer expresses the author's epistemological interpretation of time and choice (`MODEL`). Query or SoS lower bounds imply neither standard $P\neq NP$ nor the existence of subjective time or free choice; the author assigns these philosophical meanings:

| Perspective | Complexity Regime & Epistemic Status | Core Geometric & Algebraic Mechanism | Ontological Role of Time and Choice |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field** | Static representation alone gives no complexity equality; extra resources give $\mathrm{PostBQP}=\mathrm{PP}$ and $\mathrm{P}_{\mathrm{CTC}}=\mathrm{BQP}_{\mathrm{CTC}}=\mathrm{PSPACE}$ ([@rem-ch30-postselection-ctc-literature]) | Subspace intersection $\mathbf{S}^*=\bigcap_jH_j$; a nonzero state does not supply a preparation or search algorithm | **Timeless Truth (author's interpretation)**: the satisfying relations viewed as a self-consistent whole |
| **Finite Observer in the Field** | Query and SoS bounds have restricted scope; standard $P\neq NP$ remains `OPEN` ([@rem-ch30-query-sos-literature], [@conj-p-neq-np]) | Small initial overlap, rotation by a specified reflection product [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), and local Gram blind spots | **The Unfolded Journey (author's interpretation)**: successive choices and proof steps give the journey meaning |

***"The $P = NP$ of the global static field endows the universe with self-consistent truth; the $P \neq NP$ of the finite observer uses the $\frac{\pi}{2}$ orthogonal horizon to shield life from spoilers, stretching static truth into a magnificent journey worth measuring, proving, and choosing step by step."*** (**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**)

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

### 2. Why "$P$ Is a Field" (`弃线造场，局部切面处处对齐全局`)

In our geometric interpretation (`MODEL`), geometric or algebraic structure used by some polynomial-time algorithms is pictured as a **guiding field**, such as a convex gradient flow $\mathbf{F}=-\nabla V$. This is neither the definition of $P$ nor a necessary condition for membership. Even a smooth or curl-free field requires an analysis showing that it can be computed efficiently, reaches the required precision, and terminates in polynomially many steps. The following classical algorithms offer concrete points of comparison:

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="Literature Note on Interior-Point Linear Programming, Pfaffian Planar Matching, and the Hairy Ball Theorem"}
**Literature result, not formalized in this book.** Three classical algorithmic and topological theorems cited in this section to illustrate field construction and topological curl belong to the external literature and are not formalized in this book:

1. **Karmarkar's Interior-Point Algorithm for Linear Programming (N. Karmarkar, *Combinatorica* **4**, 373–395, 1984)**: Whereas Dantzig's simplex method traverses 1D boundary edges and takes $2^n$ steps on worst-case Klee–Minty (1972) deformed cubes, Karmarkar's algorithm enters the interior of the polytope and follows a smooth logarithmic-barrier gradient field to reach the optimum in polynomial time;
2. **Kasteleyn's Pfaffian Planar-Matching Theorem (P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961)**: Counting perfect matchings in general bipartite graphs (computing the permanent) is `#P`-complete (L. G. Valiant, 1979); on a planar graph, however, a Kasteleyn orientation assigns signs to edges so that non-planar crossing terms cancel in the skew-symmetric matrix $A_K^T = -A_K$, yielding the weighted dimer partition function $Z = |\operatorname{Pf}(A_K)| = \sqrt{\det A_K}$ in polynomial time via Cayley's identity $[\operatorname{Pf}(A_K)]^2 = \det A_K$;
3. **Poincaré–Brouwer Hairy Ball Theorem (H. Poincaré, 1885; L. E. J. Brouwer, 1912)**: Because the 2-sphere has Euler characteristic $\chi(S^2) = 2 \neq 0$, every continuous tangent vector field on $S^2$ must vanish at least at one point (a topological vortex).
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
**The rank of the flow matrix equals the minimal cut.** The bridge graph with $(a, b, c, d) = (2, 3, 2, 3)$: both outer cuts are $6$ (amber dashes) and the three bridges could carry $12$. On the right is the $6 \times 6$ flow matrix of one random integer instance (cyan entries positive, magenta negative) with six nonzero singular values below it: rank $6$, exactly the minimal cut. This is a single instance; that it always holds for these bridge graphs inside the cone of dimensions is the theorem verified in Lean.
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

The trans-cosmological scale and reduction comparison in [@ex-ch30-galactic-crossover-scale] highlights three closing reflections for our theme of "the finite observer inside the sphere vs. the one beyond the sphere" (`MODEL`):

- **Galactic Algorithms and Physical Scale Boundaries for Finite Observers (`MODEL`)**: The normalized illustrative curve in [@ex-ch30-galactic-crossover-scale] shows how a crossover can occur only at astronomical scales, echoing the picture of a galactic algorithm. The **Finite Memory History Capacity Theorem** ([`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), bounding distinguishable histories) and **Open Integrable Circuit Minimum Depth Theorem** ([`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result), giving minimum depth $\lfloor N/(\kappa+1)\rfloor+1$ under its locality assumptions) each constrain resources in a specified model. Juxtaposing them with the upper-bound curve supports the author's finite-observer interpretation, but does not combine them into a lower bound for all SAT algorithms or a proof that finite observers necessarily face intractability. Standard $P\neq NP$ remains `OPEN` ([@conj-p-neq-np]).
- **Epistemic Contrast Between $P$ (Field) and $NP$ (Line) (`MODEL`)**: Guidance structures and witness checking play different task roles; both can occur in the same problem because $P\subseteq NP$. Upper-bound curves and encoding-scale comparisons do not separate the classes.
- **The Gödelian Semantic Boundary Illustrated by Specification Auditing (`LEAN ✓` Prototype & `MODEL` Reflection)**: A striking epistemological lesson of [@rem-ch30-eth-subexponential-literature] is that while a proof-assistant kernel can rapidly verify every internal deductive step of a formal script, human researchers must still audit whether the top-level definitions faithfully match the intended Turing-machine complexity statement. In Chapter 21, our kernel-verified **Relative Semantic Diagonal and Definition Escape Theorems** prove that for any fixed-point-free twist (`∀ v, twist v ≠ v`), the relative semantic diagonal differs from every decoded profile in a listed catalog ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)), and when the listed decoder catalog is surjective onto the latent space, the diagonal target is not `TargetAdequate` with respect to that latent map ([`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)). Viewed as an epistemological prototype (`MODEL`), this theorem illuminates why **a formal kernel locks transitive deductive consistency inside a given formal sphere, whereas auditing the semantic adequacy of top-level boundary definitions requires standing outside that sphere!**

::: {.viz src="eth-horizon-crossover" preset="atoms" height="500"}
**The crossover lies beyond the horizon.** Cyan is the schematic curve $r(n) = \log_2(\log_2 n)/\sqrt{\log_2 n}$ with $c = 1$, magenta the $0.386$ of PPSZ, and the shaded part the scales up to the $2^{266}$ atoms of the observable universe. The amber reading stands at $n = 2^{266}$: the curve is still at $0.494$ and comes down to $0.386$ only at $n \approx 2^{558}$ (a numerical comparison for a schematic curve, `MODEL`).
:::

::: {.viz src="eth-horizon-crossover" height="640"}
**Interactive laboratory `ORTHO//HORIZON`**: the three scenes of this section. Rates: where the schematic curve $r(n)$ meets the $0.386$ of PPSZ, and how the constant $c$ moves the crossover into or out of the shaded part; bridge graph: the rank of the flow matrix against the three cuts, equal to the minimal cut inside the cone (verified in Lean), with the three bridges as the bottleneck outside it; modes: the number of modes of a spectrum that reach the threshold $\theta$ is at most $T/\theta$ (verified in Lean). The curve with $c = 1$ is schematic, not a measurement of any algorithm.
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

The chapter connects discrete logic and continuum fluids through the author's aphorisms about the global static field, finite observers, “fields,” and “lines.” Mathematically, static satisfying subspaces, complexity equalities with extra resources, restricted-model lower bounds, and the open standard $P\neq NP$ question have distinct boundaries. The galactic crossover table compares illustrative upper bounds ([@ex-ch30-galactic-crossover-scale]), not universal search lower bounds. The fluid discussion juxtaposes **Lamb's decomposition ([@rem-ch30-lamb-decomposition-literature]), the open unforced 3D global regularity conjecture ([@conj-coda-navier-stokes-regularity]), and the quadratic advection projection closure obstruction ([@thm-coda-quadratic-advection-no-closure])**. These results offer points of reference for the author's geometric interpretation, without establishing mathematical equivalence between the two open problems.

We now open the final door of the monograph and enter the **[Coda: Outside All Spheres](coda.md)** to survey polyhedral angular-defect remainders (see Coda [@rem-coda-polyhedral-topology-literature]), the contracting fixed-point anchor, and the complete thirty-chapter dependency map.
