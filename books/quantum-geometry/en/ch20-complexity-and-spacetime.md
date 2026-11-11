# Gate Complexity as Volume: Black-Hole Interior Growth, Wormhole Bridges, and Computational Complexity Boundaries

> *"P/NP depends on the initial structure; some initial structures can yield P=NP. Handling infinity is, at heart, factorization: finding how to “cancel” infinity by repeatedly building on known results about it. P/NP also concerns lookup algorithms, order, and the order of memory. Count everything in quantum gates. The central problem is a general method for proving a proposition."*

In the [previous chapter](ch19-tensor-networks-and-holography.md), we proved that across a width-three bridge tensor network on the ordered quadratic cone, the quantum max-flow equals the quantum min-cut $\min(ad, bc)$ ([@thm-bridge-quantum-maxflow-mincut]), and we saw in logarithmic bond-capacity coordinates how piecewise-affine polyhedral facets meet along the bottleneck seam $ad = bc$. In this closing chapter of Part V, "The Spacetime Sphere," we confront a question at the frontier of quantum gravity and theoretical computer science: **once the entanglement entropy of a many-body system has saturated its min-cut ceiling (thermal equilibrium), what geometric quantity can unitary evolution continue to build? And when we measure evolution in quantum gate counts and parallel circuit depth, where is the exact boundary between theorems verified by the Lean kernel and open conjectures?**

Before taking a single step, we state the epistemological status of the opening epigraph plainly: it preserves the author's verbatim reflection on initial structures, lookup order, and gate counting as an attributed philosophical epigraph, and **does not establish $\mathrm{P} = \mathrm{NP}$**. Throughout this chapter, our three-tier epistemological contract is enforced without compromise:

1. **Tier 1 (Green `LEAN ✓`)**: We prove four frozen theorems — the exact minimum parallel depth formula $\operatorname{minDepth}(N, \kappa) = \lfloor N/(\kappa + 1)\rfloor + 1$ for an open-boundary integrable circuit family ([@thm-open-circuit-min-depth]), the explicit refutation of two depth formulas proposed in the literature ([@lemma-open-circuit-depth-refutation]), the exponential worst-case CNOT gate-count lower bound $2^{2n-1} + 2n - 2$ for synthesizing $2n$-qubit reflection-symmetric diagonal unitaries over $\{\mathrm{CNOT}, R_z\}$ ([@prop-reflection-cnot-lower-bound]), and the exact walk length $2(n+2)$ of the canonical closed traversal on a bipartite even cycle graph ([@cor-even-cycle-length]);
2. **Tier 2 (Literature remarks)**: In [@rem-complexity-growth-literature] and [@rem-computational-model-literature], we clarify the definitions of state complexity, Nielsen geometry, post-thermalization growth windows, uniform Turing complexity classes, and the accounting of lookup-table preprocessing costs;
3. **Tier 3 (Red `OPEN`)**: We formulate three celebrated open problems — **Complexity = Volume (CV)** ([@conj-complexity-equals-volume]), **$\mathrm{ER}=\mathrm{EPR}$** ([@conj-er-equals-epr]), and **$\mathrm{P}\neq\mathrm{NP}$** ([@conj-p-neq-np]) — inside `conjecture` environments carrying no `lean` attribute.

::: {.figure src="ch20-overview"}
**Figure 20.** The chapter at a glance. Panel I, toy schematic curves: the cyan $S(t) = \min(2t, 4)$ runs into the grey dashed level $4$ at $t = 2$ and goes flat, while the magenta $C(t) = 2t$ keeps climbing. Panel II, a schematic Penrose diagram of a two-sided black hole: violet slices pinned to the left and right boundaries stretch as boundary time runs on, and reading them as complexity is the open complexity = volume conjecture ([@conj-complexity-equals-volume]). Panel III: the cyan P sits inside NP, and the red question mark between them is the open $\mathrm{P}\neq\mathrm{NP}$ ([@conj-p-neq-np]).
:::

## Gate count, parallel depth, and growth models {#sec-circuit-depth-growth}

Whenever we ask how "complex" a quantum circuit is, our first duty is to keep four distinct notions separate: **total gate count** (the total number of elementary gates in a circuit list), **parallel circuit depth** (the minimum number of time layers required when gates on disjoint sites execute simultaneously), **continuous Nielsen geodesic length** on the unitary group, and laboratory **physical time $t$**.

Begin with an exact parallel-depth problem solved completely in the Lean module `D5.S3.Quantum.Dynamics.OpenIntegrableCircuitMinDepth`. Consider a one-dimensional open-boundary chain of $N$ sites $\{1, 2, \dots, N\}$, whose elementary gate alphabet `Gate` has three constructors:

- Two-site nearest-neighbor bulk gates $\operatorname{Gate.U}(j)$ acting on sites $\{j, j+1\}$ ($1 \le j \le N - 1$);
- A right-boundary single-site gate $\operatorname{Gate.K1}$ acting on site $\{1\}$;
- A left-boundary single-site gate $\operatorname{Gate.KN}$ acting on site $\{N\}$.

For any subset $S \subseteq \{1, \dots, N\}$ of cardinality $|S| = \kappa$ (recording the sites carrying spectral parameter $-\kappa$), the module defines the time-ordered integrable transfer-matrix gate list `circuit N S`. A gate list $w$ fits in $L$ parallel layers (`RunsIn N w L`) if there exists a layer assignment $f : \mathbb{N} \to \{0, 1, \dots, L - 1\}$ such that any two gates sharing a site preserve their sequential order ($i < j \implies f(i) < f(j)$). Writing $\operatorname{depth}(N, w)$ for the least $L$ with `RunsIn N w L`, the **configuration-optimal minimum parallel depth** `minDepth` is defined by minimizing over all subsets $S$ of size $\kappa$:

$$
\operatorname{minDepth}(N, \kappa) = \inf\bigl\{\, \operatorname{depth}\bigl(N, \operatorname{circuit}(N, S)\bigr) \;\big|\; S \subseteq \{1, \dots, N\},\; |S| = \kappa \,\bigr\}.
$$

By packing non-overlapping bulk and boundary gates into parallel layers, our first theorem establishes the exact closed-form formula for $\operatorname{minDepth}(N, \kappa)$.

::: {.figure src="ch20-turning-points"}
**The turning points cut the chain of gates into $\kappa + 1$ runs, one layer per gate in each run.** $N = 11$, $S = \{4, 8\}$: the $12$ gates are $12$ cyan bricks forming three staircases that step down to the right, four bricks each; grey arrows point from the gate that runs first to the one after it, and magenta triangles mark the turning points $U_4$ and $U_8$. The gate count is $12$, the depth only $4 = \lfloor 11/3\rfloor + 1$ ([@thm-open-circuit-min-depth]).
:::

::: {.theorem #thm-open-circuit-min-depth title="Minimum open-boundary circuit depth" lean="D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result"}
Let $N, \kappa \in \mathbb{N}$ be natural numbers satisfying $1 \le \kappa$ and $2\kappa \le N$. Then the minimum parallel depth over configurations of size $\kappa$ in the open-boundary integrable circuit family is

$$
\operatorname{minDepth}(N, \kappa) = N / (\kappa + 1) + 1,
$$

where $N / (\kappa + 1)$ denotes natural-number integer division ($\lfloor N / (\kappa + 1)\rfloor$).
:::

::: proof
In [`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result), all $N + 1$ gates of $\operatorname{circuit}(N, S)$ (the right-boundary gate $\operatorname{K1}$ at $k = 0$, the bulk two-site gates $\operatorname{U}(k)$ at $1 \le k \le N - 1$, and the left-boundary gate $\operatorname{KN}$ at $k = N$) are indexed by $\{0, 1, \dots, N\}$ via $\operatorname{pathGate}(N, k)$ and ordered according to $\operatorname{pathOrder}(N, S)$ (indices $k \notin S$ in decreasing order followed by indices $k \in S$ in increasing order; `circuit_eq_pathOrder`). Because consecutive path indices $k$ and $k + 1$ ($0 \le k < N$) always share site $k + 1$ (`adjacent_overlap`), the gate list runs in $L$ layers (`RunsIn N (circuit N S) L`) if and only if there exists a path-layer assignment $g : \{0, \dots, N\} \to \{0, \dots, L - 1\}$ such that for every step $0 \le k < N$, $g(k) < g(k + 1)$ when $k + 1 \in S$ and $g(k + 1) < g(k)$ when $k + 1 \notin S$ (`runsIn_iff_pathLayers`).

The lower and upper bounds then follow in two steps:

1. **Strict inequality and integer-division lower bound (`pathLayers_lower` and `depth_lower`)**: Induction on $n \in \{0, \dots, N\}$ establishes the layer-accounting invariant

$$
n + g(n) \le \bigl|S \cap \{1, \dots, n\}\bigr| \cdot L + g(0).
$$

(When $n + 1 \notin S$, $g(n + 1) < g(n)$ gives $g(n + 1) + 1 \le g(n)$, preserving the right-hand side; when $n + 1 \in S$, $g(n + 1) < L$ gives $g(n + 1) + 1 \le L + g(n)$, incrementing $|S \cap \{1, \dots, n+1\}|$ by $1$ and adding $L$ to the right-hand side.) Evaluating at $n = N$ with $|S| = \kappa$, $g(N) \ge 0$, and $g(0) < L$ yields the strict inequality

$$
N \le N + g(N) \le \kappa L + g(0) < \kappa L + L = (\kappa + 1)L.
$$

Geometrically, the $N$ nearest-neighbor dependencies across the $N + 1$ path gates are partitioned by the $\kappa$ reversal points in $S$ into $\kappa + 1$ monotone causal slices, forcing at least one slice to span at least $\lfloor N / (\kappa + 1)\rfloor + 1$ serial layers; by natural-number division, $N < (\kappa + 1)L$ directly implies $L \ge \lfloor N / (\kappa + 1)\rfloor + 1$.

2. **Explicit upper bound via recursive split placement (`exists_pathLayers` and `minDepth_upper`)**: Fixing $q = \lfloor N / (\kappa + 1)\rfloor$, `exists_pathLayers` recurses on the remaining split count $k$ (and current remaining prefix length $n$ satisfying $2k \le n \le (k + 1)q + k$): at $k = 0$ it takes $S = \emptyset$ and $g(i) = n - i < q + 1$; at the successor step $k = j + 1$, it sets

$$
d = \min(q,\, n - 2j - 1), \qquad M = n - d - 1,
$$

recurses on prefix length $M$ with $j$ remaining splits to obtain $(S_0, g_0)$ (with $g_0(M) = 0$), inserts the split point $M + 1$ into $S_0$ ($S = S_0 \cup \{M + 1\}$), and defines $g(i) = g_0(i)$ for $i \le M$ and $g(i) = n - i \le d \le q$ for $i > M$. (For instance, at $N = 5, \kappa = 2, q = 1$: the outer step $j = 1, n = 5$ sets $d = \min(1, 5 - 2 - 1) = 1, M = 3$ and inserts $M + 1 = 4$; the inner step $j = 0, n = 3$ sets $d = \min(1, 3 - 0 - 1) = 1, M = 1$ and inserts $M + 1 = 2$, yielding $S = \{2, 4\}$ and the valid two-layer assignment $g = [1, 0, 1, 0, 1, 0] < 2$.) Instantiating this recursion at $n = N$ and $k = \kappa$ constructs a valid layer assignment strictly below $q + 1 = \lfloor N / (\kappa + 1)\rfloor + 1$, proving $\operatorname{minDepth}(N, \kappa) = \lfloor N / (\kappa + 1)\rfloor + 1$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="complexity-growth" preset="floor" height="500"}
**Move the turning points and the stack stops on the white line.** N = 11, κ = 2: as the magenta triangles move step by step from {2, 3} to {4, 8}, the cyan bricks come down from 9 layers one at a time to 4 and land on the white line ⌊11/3⌋ + 1 = 4, below which they never go ([@thm-open-circuit-min-depth]).
:::

Keep the contract of [@thm-open-circuit-min-depth] sharp: $\operatorname{minDepth}(N, \kappa)$ is the optimal parallel layer depth over configurations $|S| = \kappa$ within the **fixed open-boundary integrable circuit family** `circuit N S`; it is neither the unconstrained minimum gate count to synthesize an arbitrary unitary operator nor physical time $t$. Let us write out the explicit layer schedules at $\kappa = 2$ for $N = 8$ and $N = 11$.

::: {.example #ex-open-circuit-depths title="Explicit Layer Schedules and Minimum Depths for N = 8 and N = 11 at κ = 2"}
Fix $\kappa = 2$ (so $1 \le \kappa$ and $2\kappa = 4 \le N$). Evaluating $\lfloor N / 3\rfloor + 1$ from [@thm-open-circuit-min-depth] gives:

1. **Three-layer schedule at $N = 8, \kappa = 2$**: The formula yields $\operatorname{minDepth}(8, 2) = \lfloor 8 / 3\rfloor + 1 = 2 + 1 = 3$. Selecting $S = \{3, 6\} \subseteq \{1, \dots, 8\}$ (with $8 \notin S$) produces the $9$-gate circuit list

$$
\operatorname{circuit}(8, \{3, 6\}) = \bigl[\operatorname{KN},\; \operatorname{U}(7),\; \operatorname{U}(5),\; \operatorname{U}(4),\; \operatorname{U}(2),\; \operatorname{U}(1),\; \operatorname{K1},\; \operatorname{U}(3),\; \operatorname{U}(6)\bigr].
$$

With layers indexed from $0$, the explicit layer assignment

$$
[0,\; 1,\; 0,\; 1,\; 0,\; 1,\; 2,\; 2,\; 2]
$$

schedules all $9$ gates into $3$ parallel layers:

- **Layer $0$**: $\operatorname{KN}$ (site $\{8\}$), $\operatorname{U}(5)$ (sites $\{5, 6\}$), and $\operatorname{U}(2)$ (sites $\{2, 3\}$) act on pairwise disjoint sites;
- **Layer $1$**: $\operatorname{U}(7)$ (sites $\{7, 8\}$), $\operatorname{U}(4)$ (sites $\{4, 5\}$), and $\operatorname{U}(1)$ (sites $\{1, 2\}$) act on pairwise disjoint sites after their layer-$0$ dependencies;
- **Layer $2$**: $\operatorname{K1}$ (site $\{1\}$), $\operatorname{U}(3)$ (sites $\{3, 4\}$), and $\operatorname{U}(6)$ (sites $\{6, 7\}$) act on pairwise disjoint sites.

2. **Four-layer schedule at $N = 11, \kappa = 2$**: The formula yields $\operatorname{minDepth}(11, 2) = \lfloor 11 / 3\rfloor + 1 = 3 + 1 = 4$. Selecting $S = \{4, 8\} \subseteq \{1, \dots, 11\}$ produces a $12$-gate circuit scheduled into $4$ layers (indexed $0, 1, 2, 3$) by the explicit layer map

$$
[0,\; 1,\; 2,\; 0,\; 1,\; 2,\; 0,\; 1,\; 2,\; 3,\; 3,\; 3].
$$

Remember that these combinatorial layer counts inside a specific integrable circuit family are not empirical measurements of black-hole interior volume.
:::

::: {.viz src="complexity-growth" preset="eight" height="500"}
**Nine gates, three layers.** N = 8, S = {3, 6}: the cyan bricks light up layer by layer — KN, U5, U2 in layer 0, U7, U4, U1 in layer 1, K1, U3, U6 in layer 2 — and top out on the white line; the grey dashed line is the 4 layers the old formula predicts ([@ex-open-circuit-depths]).
:::

## Black-hole interiors and the complexity–volume conjecture {#sec-complexity-volume-conjecture}

Why is formal verification indispensable even for finite combinatorial circuit depths? Because small-parameter patterns can easily mislead intuition.

In the literature (`arXiv:2607.02093v1`), two linear subtraction formulas were conjectured for $\operatorname{minDepth}(N, \kappa)$: `conjectureOne` proposed $(N + 3)/2 - \kappa$ for odd $N$, and `conjectureTwo` proposed $(N + 4)/2 - \kappa$ for even $N$. At $\kappa = 1$, both formulas agree with $\lfloor N / 2\rfloor + 1$; at $\kappa = 2$, however, partitioning the chain into $\kappa + 1 = 3$ parallel segments lowers the true depth slope from $1/2$ to $1/3$. The two schedules we just exhibited in [@ex-open-circuit-depths] ($N = 8, \kappa = 2$ and $N = 11, \kappa = 2$) refute both conjectured formulas directly.

::: {.lemma #lemma-open-circuit-depth-refutation title="Refutation of two proposed depth formulas" lean="D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result"}
Define the two depth propositions and their disjunction `claim` for the open-boundary integrable circuit minimum depth $\operatorname{minDepth}(N, \kappa)$ by

$$
\begin{aligned}
\operatorname{conjectureOne} &:\iff \forall N, \kappa \in \mathbb{N},\; \operatorname{Odd}(N) \to 0 < \kappa \to \kappa \le (N - 1) / 2 \to \operatorname{minDepth}(N, \kappa) = (N + 3) / 2 - \kappa, \\
\operatorname{conjectureTwo} &:\iff \forall N, \kappa \in \mathbb{N},\; \operatorname{Even}(N) \to 0 < \kappa \to \kappa \le N / 2 \to \operatorname{minDepth}(N, \kappa) = (N + 4) / 2 - \kappa, \\
\operatorname{claim} &:\iff \operatorname{conjectureOne} \lor \operatorname{conjectureTwo}.
\end{aligned}
$$

Then $\neg\operatorname{claim}$ holds (both $\operatorname{conjectureOne}$ and $\operatorname{conjectureTwo}$ are false).
:::

::: proof
To prove $\neg(\operatorname{conjectureOne} \lor \operatorname{conjectureTwo})$, we exhibit an explicit counterexample to each disjunct:

1. **Refuting $\operatorname{conjectureTwo}$**: Take even $N = 8$ and $\kappa = 2$ (satisfying $\operatorname{Even}(8)$, $0 < 2$, and $2 \le 8/2 = 4$). The formula predicts $(8 + 4)/2 - 2 = 4$, whereas $S = \{3, 6\}$ in [@ex-open-circuit-depths] runs in $3$ layers, giving $\operatorname{minDepth}(8, 2) \le 3 < 4$.
2. **Refuting $\operatorname{conjectureOne}$**: Take odd $N = 11$ and $\kappa = 2$ (satisfying $\operatorname{Odd}(11)$, $0 < 2$, and $2 \le (11 - 1)/2 = 5$). The formula predicts $(11 + 3)/2 - 2 = 5$, whereas $S = \{4, 8\}$ runs in $4$ layers, giving $\operatorname{minDepth}(11, 2) \le 4 < 5$.

The full proof is checked by the Lean kernel.
:::

::: {.viz src="complexity-growth" preset="eleven" height="500"}
**The old formula counts one layer too many.** N = 11, S = {4, 8}: the 12 gates stack into 4 layers of 3 and top out on the white line; the grey dashed line is the 5 layers predicted by the odd-N formula (N + 3)/2 − κ ([@lemma-open-circuit-depth-refutation]).
:::

Note the strict scope of [@lemma-open-circuit-depth-refutation]: it refutes only the two combinatorial depth formulas `conjectureOne` and `conjectureTwo` from `arXiv:2607.02093v1`; it is **not** a refutation of Complexity=Volume, $\mathrm{ER}=\mathrm{EPR}$, or $\mathrm{P}\neq\mathrm{NP}$.

Before stating the open Complexity=Volume conjecture, we summarize the literature conventions governing state complexity growth in the following remark.

::: {.remark #rem-complexity-growth-literature title="Quantum State Complexity Definitions, Nielsen Geometry, and Post-Thermalization Growth (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In quantum information and holographic gravity, defining the circuit complexity of a state $\lvert\psi(t)\rangle$ requires specifying five pieces of data: a **reference state** $\lvert\psi_{\mathrm{ref}}\rangle$, an **allowed gate set** $\mathcal{G}$, **locality constraints** (such as $k$-local gates), an **error tolerance** $\varepsilon \ge 0$, and a **resource cost model**. Total gate count, parallel circuit depth, continuous **Nielsen geometric length** with respect to a right-invariant penalty metric on the unitary group, and physical time $t$ are distinct quantities that must not be conflated.

In particular, one must distinguish **$\varepsilon$-approximate state complexity over a finite gate alphabet** from **exact complexity over a continuous gate family (or Nielsen geometry)**:

1. **Finite universal gate sets (such as Clifford + $T$) and positive tolerance $\varepsilon > 0$**: Over any finite gate set $\mathcal{G}$, the set of states reachable by finite circuits at zero error ($\varepsilon = 0$) is at most countable, whereas a nonstationary continuous-time state orbit $\lvert\psi(t)\rangle = e^{-iHt/\hbar}\lvert\psi(0)\rangle$ typically contains uncountably many states. To guarantee finite complexity for general target states over a finite universal gate alphabet, we **fix an approximation tolerance $\varepsilon > 0$** (requiring distance at most $\varepsilon$, as in S. Aaronson, `arXiv:1607.05256`, Definitions 3.2.1 & 3.3.1); at fixed $\varepsilon > 0$, multi-qubit state and unitary compilation complexities obey an exponential ceiling $\mathcal{C}_\varepsilon(\lvert\psi(t)\rangle) \le \exp(O(N))$ (such as $O(2^N \operatorname{poly}(\log(1/\varepsilon)))$ for state preparation or $O(4^N \operatorname{poly}(\log(1/\varepsilon)))$ for unitary compilation via two-qubit decomposition and Solovay–Kitaev compilation).
2. **Continuous two-qubit gate families or continuous Nielsen geometry ($\varepsilon = 0$)**: If arbitrary continuous single- and two-qubit gates $\mathcal{G} = \mathrm{SU}(4)$ are permitted at unit cost (or if complexity is measured by continuous Nielsen geodesic distance on the unitary manifold), exact synthesis ($\varepsilon = 0$) is well-defined for all states at all times $t$ and bounded above by an exponential ceiling $\exp(O(N))$ ($O(2^N)$ for state preparation and $O(4^N)$ for arbitrary unitary synthesis).

In chaotic many-body models and holographic black-hole narratives, after subsystem entanglement entropy saturates at its thermal value $S_{\mathrm{th}} \sim O(N)$ around the thermalization scale $t_{\mathrm{th}}$, $\varepsilon$-approximate state complexity (or continuous Nielsen complexity) is expected to grow approximately linearly with $t$ across an intermediate window $t_{\mathrm{th}} \ll t \ll e^{O(N)}$. In any closed system with a finite-dimensional Hilbert space and bounded spectrum, however, complexity is bounded above by $\exp(O(N))$ and, over longer model- and spectrum-dependent timescales (typically doubly exponential quantum Poincaré recurrence scales), saturates and undergoes recurrences rather than growing linearly forever as $t \to \infty$. See L. Susskind, *Fortschr. Phys.* **64**, 24–43 (2016), DOI: `10.1002/prop.201500092`; and S. Aaronson (2016), `arXiv:1607.05256`.
:::

::: {.viz src="complexity-growth" preset="saturate" height="500"}
**Entropy caps first; the gate count goes on.** A random brick-wall circuit on 8 qubits run to layer 14: the cyan half-chain entropy climbs along the grey staircase and around layer 13 settles between 3.18 and 3.36 bits, under the white 4-bit line, while the white line (gates used) rises all the way to 49. The random circuit is an illustrative model; its entropy and gate count are computed layer by layer ([@rem-complexity-growth-literature]).
:::

::: {.viz src="complexity-growth" preset="ceiling" height="500"}
**Gates can always be added; complexity has a ceiling.** Run on to layer 90: the cyan entropy stays put and the white line reaches 315 gates; the magenta expected complexity (an illustrative model) follows the white line until layer 74, meets the dashed 2^N = 256 and runs flat from there.
:::

::: {.conjecture #conj-complexity-equals-volume title="Complexity equals volume"}
Fix an applicable semiclassical holographic state, a boundary reference state, a local gate set, and a UV regularization and precision scheme. The **Complexity = Volume (CV) conjecture** proposes that, in units with $c = 1$, the renormalized circuit complexity $\mathcal{C}_V(\psi(t))$ of the boundary quantum state at boundary time $t$ is proportional to the maximal renormalized spatial volume $V_{\mathrm{ren}}(\Sigma_t)$ of a smooth spacelike codimension-one bulk hypersurface $\Sigma_t$ anchored at the boundary time slice $t$:

$$
\mathcal{C}_V\bigl(\psi(t)\bigr) = \frac{V_{\mathrm{ren}}(\Sigma_t)}{G_N \ell_* \hbar},
$$

where $G_N$ is the bulk Newton gravitational constant and $\ell_*$ is a characteristic bulk length scale (such as the AdS curvature radius $\ell_{\mathrm{AdS}}$) explicitly chosen for dimensional normalization.

Scope and open boundaries: $V_{\mathrm{ren}}(\Sigma_t)$ is the **spatial volume of a codimension-one slice**; it must not be confused with the distinct **Complexity = Action (CA) conjecture**, which relates circuit complexity to the **on-shell gravitational action** $\mathcal{C}_A(\psi(t)) = I_{\mathrm{WDW}} / (\pi\hbar)$ evaluated on the bulk **Wheeler–DeWitt (WDW) causal patch** anchored at the boundary slice (including Einstein–Hilbert bulk, Gibbons–Hawking–York boundary, and null-joint action terms, rather than bare four-dimensional spacetime volume). In both CV and CA, proportionality constants depend on gate-cost weighting and UV regularization conventions, and neither conjecture claims that exact discrete minimum gate counts equal continuum bulk quantities without regularization. See L. Susskind, *Fortschr. Phys.* **64**, 24–43 (2016), DOI: `10.1002/prop.201500092`; and A. R. Brown, D. A. Roberts, L. Susskind, B. Swingle & Y. Zhao, *Phys. Rev. Lett.* **116**, 191301 (2016), DOI: `10.1103/PhysRevLett.116.191301`.
:::

::: {.viz src="complexity-growth" preset="cv" height="500"}
**Whether this rising line is a volume, nobody has proved.** The red mark covers the rising stretch of the magenta line: the entropy stopped long ago, and this line is still climbing. Reading that stretch as the volume of a slice through the black-hole interior is the complexity = volume conjecture ([@conj-complexity-equals-volume]); no volume is drawn on the stage.
:::

## Entanglement bridges and the scope of ER=EPR {#sec-er-epr-conjecture}

While holographic conjectures motivate studying how many gates are needed to build highly entangled states, what can we prove rigorously about worst-case two-qubit gate counts in finite-dimensional circuit synthesis?

::: {.figure src="ch20-cv-slices"}
**As boundary time runs on, the slice through the black-hole interior stretches; whether it tracks the gate count is open.** A schematic Penrose diagram of a two-sided black hole: the vertical sides are the two boundaries, the zigzags are the singularities, the dashed diagonals the horizons. The violet slices $\Sigma_t$ are pinned at boundary times $t = 0, 1, 2, 3$ and grow longer later on (schematic; no volume is computed). The red tag is the complexity = volume conjecture ([@conj-complexity-equals-volume]), an open problem.
:::

In the Lean module `D5.S3.Quantum.Magic.ReflectionDiagonalCNOTLowerBound`, fix an even number of qubits $m = 2n$ ($n \ge 1$):

- Write $\operatorname{Qubits}(m) = (\operatorname{Fin} m \to \operatorname{Bool})$ for the $2^m$ computational basis bitstrings;
- Define the ancilla-free elementary gate type `gate m` as the sum type

$$
\operatorname{gate}(m) = \bigl\{\, (t, c) \in \operatorname{Fin} m \times \operatorname{Fin} m \;\big|\; t \neq c \,\bigr\} \;\oplus\; \bigl(\operatorname{Fin} m \times \mathbb{R}\bigr),
$$

where the left summand represents a $\operatorname{CNOT}(t, c)$ gate with target $t \neq c$ and the right summand represents a single-qubit diagonal rotation $R_z(q, \varphi) = \operatorname{diag}(e^{\mp i\varphi/2})$;
- For any gate list $\mathit{circuit} : \operatorname{List}(\operatorname{gate}(m))$, `circuitMatrix` is the ordered matrix product and `cnotCount` counts the number of $\mathrm{CNOT}$ gates in the list.

Our next proposition proves that for every $n \ge 1$, there exists a $2n$-qubit real phase function $\theta$ invariant under bitwise negation $\theta(\neg x) = \theta(x)$ such that any ancilla-free $\{\mathrm{CNOT}, R_z\}$ circuit synthesizing $\operatorname{diag}(e^{i\theta(x)})$ up to a complex scalar $c \in \mathbb{C}$ requires at least $2^{2n-1} + 2n - 2$ $\mathrm{CNOT}$ gates.

::: {.proposition #prop-reflection-cnot-lower-bound title="A CNOT lower bound for reflection symmetry" lean="D5/S3/Quantum/Magic/ReflectionDiagonalCNOTLowerBound.result"}
For every natural number $n \in \mathbb{N}$ with $1 \le n$, there exists a real phase function $\theta : \operatorname{Qubits}(2n) \to \mathbb{R}$ satisfying both of the following properties:

1. **Bitwise reflection symmetry**: For every bitstring $x \in \operatorname{Qubits}(2n)$, writing $(\neg x)(j) = \mathit{!}(x(j))$,

$$
\theta(\neg x) = \theta(x);
$$

2. **Exponential CNOT lower bound for exact synthesis**: For every ancilla-free circuit $\mathit{circuit} : \operatorname{List}(\operatorname{gate}(2n))$ built from $\mathrm{CNOT}$ and single-qubit real $R_z$ gates and every complex scalar $c \in \mathbb{C}$, if

$$
\operatorname{circuitMatrix}(\mathit{circuit}) = c \cdot \operatorname{diag}\bigl(x \mapsto \exp(i\theta(x))\bigr),
$$

then

$$
2^{2n - 1} + 2n - 2 \le \operatorname{cnotCount}(\mathit{circuit}).
$$
:::

::: proof
In [`ReflectionDiagonalCNOTLowerBound.result`](lean:D5/S3/Quantum/Magic/ReflectionDiagonalCNOTLowerBound.result) and its helper counting module `D5.S3.Quantum.Magic.ReflectionDiagonalParityCounting`, the proof proceeds in four exact $\mathbb{F}_2$-parity tracking steps:

1. **Explicit reflection-symmetric hard phase witness (`hardTheta` and `hardTheta_reflection`)**: On $m = 2n$ qubits, define the explicit phase function

$$
\theta_{\mathrm{hard}}(x) = \begin{cases} \pi/2, & \text{if } x = 0^{2n} \text{ or } x = 1^{2n}, \\ 0, & \text{otherwise}. \end{cases}
$$

Because bitwise negation $\neg$ swaps $0^{2n}$ and $1^{2n}$, $\theta_{\mathrm{hard}}(\neg x) = \theta_{\mathrm{hard}}(x)$ holds identically.

2. **Diagonal unitarity forces terminal wire-parity restoration (`diagonal_forces_identity`)**: Each wire $q \in \operatorname{Fin}(2n)$ starts with the unit odd-weight parity vector $e_q \in \mathbb{F}_2^{2n}$ (Hamming weight $1$). Each $\operatorname{CNOT}(t, c)$ updates target wire $t$ to $l_t \oplus l_c$, while each $R_z(q, \varphi)$ injects a phase $\exp(\mp i\varphi/2)$ along the current parity label $l_q$. Because $\operatorname{circuitMatrix}(\mathit{circuit})$ equals a nonzero scalar multiple $c$ of the diagonal matrix $\operatorname{diag}(e^{i\theta_{\mathrm{hard}}(x)})$, the terminal wire-parity matrix `wireLabels circuit` must return to the identity matrix $I_{2n}$ — every wire ends back in its single-qubit odd-weight state, and the count `evenWires` of wires carrying even-weight parities returns to $0$.

3. **Walsh–Hadamard character test and $2^{2n-1} - 1$ even-parity outputs (`hard_character` and `even_output_count`)**: For every nonzero even-weight parity vector $v \in \mathbb{F}_2^{2n} \setminus \{0\}$ ($\bigoplus_{j=0}^{2n-1} v_j = \mathrm{false}$), define the multiplicative character $\chi_v(f) = \prod_{x \in \operatorname{Qubits}(2n)} f(x)^{(-1)^{v \cdot x}}$. On any global scalar $c \neq 0$ (`character_global`) and on any single-qubit rotation $R_z(q, \varphi)$ along a parity label $w \neq v$ (`character_factor`), $\chi_v$ evaluates to $1$; on the target diagonal $\exp(i\theta_{\mathrm{hard}})$, however, both $0^{2n}$ and $1^{2n}$ have inner product $\mathrm{false}$ with $v$, giving $\chi_v(\exp(i\theta_{\mathrm{hard}})) = i \cdot i = -1 \neq 1$ (`hard_character`). Hence all $2^{2n-1} - 1$ nonzero even-weight parities must appear among the rotation wire labels (`rotation_labels`), and since all initial wire labels have odd weight, every nonzero even parity must appear in the list `evenOutputs` of even-weight $\mathrm{CNOT}$ step outputs (`rotation_outputs`), forcing its list length to satisfy $|\operatorname{evenOutputs}| \ge 2^{2n-1} - 1$ (`even_output_count`).

4. **Parity birth-and-return balance (`ReflectionDiagonalParityCounting.count_bound`)**: Classify $\mathrm{CNOT}$ steps across the circuit (counted with step multiplicity) by how they change `evenWires`: every $\mathrm{CNOT}$ step whose target wire $l_t$ and control wire $l_c$ both carry odd-weight parities — so that their sum $l_t \oplus l_c$ has even weight and increments `evenWires` by $1$ — is recorded in the **even-birth list** `births`; every $\mathrm{CNOT}$ step whose target wire $l_t$ is even-weight and whose control wire $l_c$ is odd-weight — restoring an odd-weight label on the target wire and decrementing `evenWires` by $1$ — is counted in `returns`. Because all even outputs lie in the $\mathbb{F}_2$-linear span `listSpan births` (`span_outputs`), covering all $2^{2n-1}$ even parities forces the list length $|\operatorname{births}| \ge 2n - 1$ (`birth_count`). Since `evenWires` starts at $0$ and returns to $0$ at the end of the circuit (Step 2), the step-by-step balance inequality (`return_balance`: $|\operatorname{births}| \le \operatorname{evenWires}(\mathit{ls}) + \operatorname{returns}$) forces $\operatorname{returns} \ge |\operatorname{births}| \ge 2n - 1$. Because steps counted in `evenOutputs` produce even-weight labels while steps counted in `returns` produce odd-weight labels, the two sets of $\mathrm{CNOT}$ steps are strictly disjoint (`disjoint_counts`), yielding

$$
\operatorname{cnotCount}(\mathit{circuit}) \ge |\operatorname{evenOutputs}| + \operatorname{returns} \ge (2^{2n-1} - 1) + (2n - 1) = 2^{2n-1} + 2n - 2.
$$

(For example, at $n = 1$ on $2n = 2$ qubits, the single reflection pair $(0, 1)$ has $2^1 - 1 = 1$ nonzero even parity $z_0 \oplus z_1$, requiring at least $1$ even-birth $\mathrm{CNOT}$ step in `evenOutputs` to generate $z_0 \oplus z_1$ for the $R_z$ phase rotation and at least $2(1) - 1 = 1$ odd-return $\mathrm{CNOT}$ step in `returns` to restore the single-wire parities $[z_0, z_1]$, totaling at least $1 + 1 = 2$ $\mathrm{CNOT}$ gates.) The full proof is checked by the Lean kernel.
:::

Note the exact scope of [@prop-reflection-cnot-lower-bound]:

- It is an existential worst-case lower bound for **exact synthesis** (up to a scalar $c \in \mathbb{C}$) over the specified ancilla-free $\{\mathrm{CNOT}, R_z\}$ gate set;
- It does not bound approximate synthesis with error $\varepsilon > 0$ or arbitrary gate sets;
- It is a discrete parity-output and wire-restoration counting theorem for the explicit single witness $\theta_{\mathrm{hard}}$ (combining $2^{2n-1} - 1$ required nonzero even-parity outputs with $2n - 1$ odd-return steps via $\mathbb{F}_2$-span rank and parity balance), and **does not separate $\mathrm{P}$ from $\mathrm{NP}$**.

Alongside circuit synthesis bounds, we record the open $\mathrm{ER}=\mathrm{EPR}$ conjecture on the geometric interpretation of bipartite entanglement in semiclassical gravity.

::: {.figure src="ch20-er-epr"}
**A smooth classical bridge interpretation of ER=EPR requires a suitable semiclassical system.** Top row: many cyan dashed entangled pairs between the systems $L$ and $R$, set against a side view of an Einstein–Rosen bridge by a red “≟”; the correspondence is an open problem ([@conj-er-equals-epr]). Bottom row: the small bridge a single Bell pair points to is crossed out—one pair of entangled qubits has no smooth wormhole between them. The whole figure is schematic.
:::

::: {.conjecture #conj-er-equals-epr title="ER=EPR"}
In entangled bipartite systems that admit a semiclassical gravitational description (prototypically a two-sided eternal black hole in the thermofield double state), the **$\mathrm{ER}=\mathrm{EPR}$ conjecture** proposes that a non-traversable **Einstein–Rosen (ER) bridge** serves as the bulk geometric description of the **Einstein–Podolsky–Rosen (EPR) entanglement** between the two boundary subsystems.

Scope and open boundaries: This conjectural duality **does not imply** that an arbitrary pair of entangled laboratory qubits possesses a smooth classical spacetime wormhole, **does not permit** superluminal communication (respecting the quantum no-signaling principle), and requires additional direct coupling between the two boundaries to render a wormhole traversable. See J. Maldacena & L. Susskind, *Fortschr. Phys.* **61**, 781–811 (2013), DOI: `10.1002/prop.201300020`.
:::

## Computational models, resource bounds, and P≠NP {#sec-computational-complexity-boundary}

In this final section, we contrast exponential gate-synthesis bounds with linear graph traversals and standard Turing machine complexity classes.

First, beware of a classic terminological trap: in mathematical and formal-verification libraries, the identifier `circuit` is used in two completely unrelated senses. In [@thm-open-circuit-min-depth] and [@prop-reflection-cnot-lower-bound], `circuit` denotes a **list of quantum gates**. In the graph-theory module `D5.S3.Combinatorics.Graph.Walks.WeightedCycleWalk`, by contrast, `circuit n` denotes a **closed graph walk** on the bipartite even cycle graph `evenCycleGraph n` whose vertex set is $\operatorname{Fin}(n+2) \oplus \operatorname{Fin}(n+2)$.

Starting at the left vertex $\operatorname{inl}(0)$, the recursive walk `traversals n` alternates at each stage $m \mapsto m + 1$ between a cross-step $\operatorname{inl}(m) \to \operatorname{inr}(m+1)$ and a horizontal return step $\operatorname{inr}(m+1) \to \operatorname{inl}(m+1)$, closing the loop back to $\operatorname{inl}(0)$ after $n + 2$ stages to form `circuit n`.

::: {.corollary #cor-even-cycle-length title="Length of an actual even-cycle traversal" lean="D5/S3/Combinatorics/Graph/Walks/WeightedCycleWalk.circuit_length"}
For every natural number $n \in \mathbb{N}$, the canonical closed walk $\operatorname{circuit}(n)$ on $\operatorname{evenCycleGraph}(n)$ has length

$$
\bigl(\operatorname{circuit}(n)\bigr).\mathrm{length} = 2(n + 2).
$$
:::

::: proof
By induction on $m$, `traversals n 0` is `.nil` of length $0$, and each successor step appends two edges via `.concat`, increasing the walk length by $2$ so that `traversals n m` has length $2m$. Setting $m = n + 2$ and applying `.copy` (which preserves walk length) gives $(\operatorname{circuit}(n)).\mathrm{length} = 2(n + 2)$. The full proof is checked by the Lean kernel.
:::

Keep the distinction crystal clear: `circuit n` in [@cor-even-cycle-length] is a graph-theoretic closed walk on `evenCycleGraph n`, unrelated to quantum gate lists, and its linear symbolic length $2(n+2)$ in the graph parameter $n$ does not prove linear growth of black-hole complexity in physical time $t$. Let us compare the numerical values of these bounds alongside the toy schematic curves from Panel I of our chapter figure.

::: {.example #ex-cnot-and-cycle-bounds title="Numerical Comparison of Exponential CNOT Bounds, Linear Even-Cycle Lengths, and a Toy Saturation Curve"}
Compare three discrete numerical sequences side by side:

1. **Worst-case exact synthesis CNOT lower bounds** ([@prop-reflection-cnot-lower-bound]): For $n = 1, 2, 3$ (corresponding to $2n = 2, 4, 6$ qubits), the lower bound $2^{2n-1} + 2n - 2$ evaluates to
   - $n = 1$ ($2$ qubits): $2^1 + 2 - 2 = 2$;
   - $n = 2$ ($4$ qubits): $2^3 + 4 - 2 = 10$;
   - $n = 3$ ($6$ qubits): $2^5 + 6 - 2 = 36$.
2. **Even-cycle closed walk lengths** ([@cor-even-cycle-length]): For graph parameter $n = 0, 1, 2$ ($4, 6, 8$ vertices), the walk length $2(n+2)$ evaluates to $4, 6, 8$. Both combinatorial sequences depend on discrete size parameter $n$ and are independent of physical time $t$.
3. **Illustrative toy saturation curves**: In Panel I of the chapter figure, the toy functions $C(t) = 2t$ and $S(t) = \min(2t, 4)$ evaluated at $t = 0, 1, 2, 3$ produce the pairs

$$
(0, 0), \qquad (2, 2), \qquad (4, 4), \qquad (6, 4).
$$

This arithmetic toy model merely illustrates how an uncapped linear function $C(t)$ continues past a capped curve $S(t) \le 4$; it does not claim that minimum quantum circuit complexity must grow monotonically.
:::

::: {.viz src="complexity-growth" height="560"}
**How complexity grows · the full lab.** In Growth, drag the rail to see where the cyan entropy and the white gate count each go, and switch on the CV reading; in Depth, change N and κ, or click sites to move the magenta turning points, and see whether the cyan bricks can get below the white line.
:::

Finally, let us address the computational question raised by the opening epigraph: does pre-computing answers into a lookup table or changing the initial basis prove $\mathrm{P} = \mathrm{NP}$, or does the exponential CNOT lower bound of [@prop-reflection-cnot-lower-bound] prove $\mathrm{P} \neq \mathrm{NP}$? Neither does.

::: {.remark #rem-computational-model-literature title="Uniform Computational Models, Lookup-Table Preprocessing Costs, and Complexity Class Boundaries (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In standard computational complexity theory, the classes $\mathrm{P}$ and $\mathrm{NP}$ are defined as classes of formal languages decidable in polynomial time $\operatorname{poly}(n)$ in the input bit-length $n = |x|$ on **uniform deterministic** and **uniform nondeterministic Turing machines** over a fixed finite alphabet. Two accounting principles are mandatory:

1. **Input encoding and preprocessing costs must be counted**: Every basis change, input re-encoding, or lookup-table construction must be charged for the time and space it consumes. For a Boolean formula (such as 3-SAT) of encoded bit-length $n = |x|$ in $k$ Boolean variables, pre-computing and storing the truth table of all $2^k$ variable assignments requires exponential $\Theta(2^k \operatorname{poly}(n))$ preprocessing time and $\Theta(2^k)$ memory (and pre-storing answers for all $2^n$ candidate input strings of length $n$ requires a table of size $\Theta(2^n)$); even if one passes to the **non-uniform class $\mathrm{P/poly}$** by granting input-length-dependent advice strings $a_n$, its definition strictly requires a **polynomial advice-length bound $|a_n| \le \operatorname{poly}(n)$** (equivalent to polynomial-size Boolean circuit families). An exponential-size lookup table does not even fit within the polynomial advice budget of $\mathrm{P/poly}$, and neither device proves $\mathrm{P} = \mathrm{NP}$ in the standard uniform Turing model.
2. **Exponential unitary-synthesis gate bounds do not prove $\mathrm{P} \neq \mathrm{NP}$**: In [@prop-reflection-cnot-lower-bound], any ancilla-free $\{\mathrm{CNOT}, R_z\}$ circuit synthesizing the explicit reflection-symmetric diagonal witness $\operatorname{diag}(e^{i\theta_{\mathrm{hard}}(x)})$ requires at least $2^{2n-1} + 2n - 2$ $\mathrm{CNOT}$ gates because $\theta_{\mathrm{hard}}$ evaluates to $-1$ on all $2^{2n-1} - 1$ nonzero even-weight Walsh–Hadamard characters, forcing the circuit to generate every nonzero even-weight parity output and execute at least $2n - 1$ odd-return steps to restore the terminal wire parities (while in the unformalized circuit-synthesis literature, such as V. V. Shende, S. S. Bullock & I. L. Markov, *Phys. Rev. A* **70**, 012310 (2004), synthesizing generic $m$-qubit unitaries in $\mathrm{U}(2^m)$ also requires $\Omega(4^m)$ two-qubit gates by continuous real parameter-dimension counting over a $4^m$-dimensional manifold). Neither a discrete parity-output counting bound for an explicit $2^{2n}\times 2^{2n}$ diagonal unitary nor generic continuous parameter-dimension counting rules out $\operatorname{poly}(n)$-time algorithms for succinctly encoded decision problems of input bit-length $n = |x|$ in $\mathrm{NP}$, and therefore neither proves $\mathrm{P} \neq \mathrm{NP}$.

See S. A. Cook, "The complexity of theorem-proving procedures," *Proc. 3rd Annual ACM Symposium on Theory of Computing (STOC)*, pp. 151–158 (1971), DOI: `10.1145/800157.805047`; and S. Aaronson, *The Complexity of Quantum States and Transformations: From Quantum Money to Black Holes* (2016), `arXiv:1607.05256`.
:::

::: {.figure src="ch20-lookup-budget"}
**A precomputed lookup table soon outgrows any polynomial budget.** On a logarithmic vertical scale, the magenta line is the table's $2^n$ rows and the cyan curve a sample polynomial budget $n^3$; they cross near $n \approx 9.94$; the dashed line marks $n = 10$, from which onward $2^n > n^3$ for integer $n$, and the magenta line pulls ever further ahead. Violet tag: literature result, not formalized in this book ([@rem-computational-model-literature]); red tag: $\mathrm{P}\neq\mathrm{NP}$ remains open, and this figure does not answer it.
:::

::: {.conjecture #conj-p-neq-np title="P≠NP"}
Under the standard uniform Turing-machine computational model and a finite alphabet encoding, there exists a language in $\mathrm{NP}$ that does not belong to $\mathrm{P}$:

$$
\mathrm{P} \neq \mathrm{NP}.
$$

Scope and open boundaries: Both a proof and a refutation remain open; the answer cannot be deduced from choices of quantum measurement basis, uncounted lookup-table preprocessing, physical gate-synthesis counts, or gravitational spacetime geometry. See S. A. Cook, *Proc. 3rd Annual ACM STOC*, pp. 151–158 (1971), DOI: `10.1145/800157.805047`.
:::

### From Spacetime Gate Counts to Timeless Causality and the Field–Line Divide {#sec-timeless-crystal-page-numbers}

At the close of Part V, the four Lean-verified results of this chapter — the closed-form minimum parallel depth $L = \lfloor N/(\kappa+1)\rfloor + 1$ of open-boundary integrable circuits ([@thm-open-circuit-min-depth]), the refutation of two literature depth formulas ([@lemma-open-circuit-depth-refutation]), the exponential $\mathrm{CNOT}$ lower bound $2^{2n-1} + 2n - 2$ for reflection-symmetric diagonal unitaries ([@prop-reflection-cnot-lower-bound]), and the even parity of closed walks on even cycles ([@cor-even-cycle-length]) — stand alongside the three open frontier conjectures ([@conj-complexity-equals-volume], [@conj-er-equals-epr], [@conj-p-neq-np]) to establish a clear geometric principle: under fixed gate sets and bounded interaction locality, any local observer who wishes to bridge an entanglement cut or synthesize a high-dimensional reflection-symmetric phase must pay an irreducible rotational price in parallel depth $L$ or two-qubit gate count.

This sets up a deeper ontological and complexity-theoretic question: if the Gram-matrix reconstruction of [Chapter 10](ch10-gram-geometry-and-order.md) is order-independent and timeless at the level of pairwise inner products, why must a finite observer inside the universe still traverse sequential gate layers $L$ and confront the orthogonal horizon of $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$? After crossing Part VI (*Spheres Beyond Spheres*: diagonal escape, prime spectra, and $\psi = \psi(\psi)$) and Part VII (*Construction and Verification*: matrix-free Clifford engines, ZYZ rotor compilation, and Lean 4 proof audits), **Part VIII** develops that synthesis in full:

- **[Chapter 29](ch29-timeless-causality-and-gram-space.md)** unites Chapter 10's Gram elliptope ($\det G \ge 0$) with literature notes on timeless constraints and conditional-time slicing (in Chapter 29's `remark` boxes), showing why sequential gate depth $L$ measures the minimum number of local rotations required for a finite observer to align its measurement frame step by step via positive-semidefinite matrix completion ($G_{M+1} \succeq 0$);
- **[Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md)** places the global static field model beside finite-observer $\mathrm{P} \neq \mathrm{NP}$ ([@conj-p-neq-np]) and the dictum *"$\mathrm{P}$ is a curl-free guiding field; $\mathrm{NP}$ is a zero-cross-section witness thread"*, examining literature discussions on tensor-network rank reduction in fine-grained complexity, cosmic crossover scales, and three-dimensional fluid advection closure obstructions on a single Clifford field canvas.

> Carve what is proved into the green ledger of the kernel, credit the classics in open literature remarks, and mark the unproven frontier with a red `OPEN` beacon — that is the pact between geometric intuition and formal rigor.

With this, all four chapters of Part V, "The Spacetime Sphere," are complete: from Minkowski null-cone rigidity ([Chapter 17](ch17-lorentz-geometry.md)), anticommuting spinor pairs and anchored loop-phase classification on graphs ([Chapter 18](ch18-spinors-and-gauge-curvature.md)), and the discrete width-three bridge quantum max-flow min-cut theorem ([Chapter 19](ch19-tensor-networks-and-holography.md)), to integrable circuit parallel depth, exponential CNOT lower bounds, and the three open conjectures of Chapter 20. Let us now step into **Part VI ([Chapter 21](ch21-diagonalization-and-escape.md))**, crossing outside the closed sphere to confront Gödelian diagonal escape.
