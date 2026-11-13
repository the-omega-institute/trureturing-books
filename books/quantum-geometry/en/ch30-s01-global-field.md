# Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$—The Orthogonal Horizon and the Firewall of the Living Journey {#sec-coda-global-p-eq-np-local-p-ne-np}

> **Author's Epigraph**: *"In the global static time field $P = NP$, but for a finite observer $P \neq NP$."*（“全局静态时间场P=NP, 但有限观察者P!=NP”）

The author places the timeless crystal alongside the finite point-picking observer to offer a dual perspective on **$\mathrm{P}$ vs. $\mathrm{NP}$** (`MODEL`). Three levels must be distinguished: a static solution set describes which assignments satisfy the constraints; the postselection and CTC complexity theorems require specified additional computational resources ([@rem-ch30-postselection-ctc-literature]); and black-box query and bounded-degree semidefinite lower bounds constrain their respective restricted models ([@rem-ch30-query-sos-literature]). In the standard uniform Turing-machine model, $\mathrm{P}\neq\mathrm{NP}$ remains open (Chapter 20, [@conj-p-neq-np], `OPEN`). Removing time from a description, or merely requiring finite observer resources, does not settle this asymptotic question.

## 1. The Solution Set of the "Global Static Time Field" and Additional Computational Resources

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

## 2. Why a Finite Observer Inside the Field Faces $P \neq NP$-Like Orthogonal Horizons and Local Blind Spots

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

## 3. The Author's Interpretation: Complexity Horizons, Subjective Time, and Choice

Placing the global static field alongside the finite observer expresses the author's epistemological interpretation of time and choice (`MODEL`). Query or SoS lower bounds imply neither standard $P\neq NP$ nor the existence of subjective time or free choice; the author assigns these philosophical meanings:

| Perspective | Complexity Regime & Epistemic Status | Core Geometric & Algebraic Mechanism | Ontological Role of Time and Choice |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field** | Static representation alone gives no complexity equality; extra resources give $\mathrm{PostBQP}=\mathrm{PP}$ and $\mathrm{P}_{\mathrm{CTC}}=\mathrm{BQP}_{\mathrm{CTC}}=\mathrm{PSPACE}$ ([@rem-ch30-postselection-ctc-literature]) | Subspace intersection $\mathbf{S}^*=\bigcap_jH_j$; a nonzero state does not supply a preparation or search algorithm | **Timeless Truth (author's interpretation)**: the satisfying relations viewed as a self-consistent whole |
| **Finite Observer in the Field** | Query and SoS bounds have restricted scope; standard $P\neq NP$ remains `OPEN` ([@rem-ch30-query-sos-literature], [@conj-p-neq-np]) | Small initial overlap, rotation by a specified reflection product [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), and local Gram blind spots | **The Unfolded Journey (author's interpretation)**: successive choices and proof steps give the journey meaning |

***"The $P = NP$ of the global static field endows the universe with self-consistent truth; the $P \neq NP$ of the finite observer uses the $\frac{\pi}{2}$ orthogonal horizon to shield life from spoilers, stretching static truth into a magnificent journey worth measuring, proving, and choosing step by step."*** (**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**)

---

