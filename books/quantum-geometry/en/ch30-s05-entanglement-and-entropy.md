# "Quantum Entanglement, P=NP, Entropy" — The Orthogonal Triad of Partial-Trace Horizons, Pythagorean Conservation, and Tensor-Cut Bond Dimension {#sec-ch30-entanglement-entropy-complexity-triad}

> **Author's Words**: *"Quantum entanglement, P=NP, entropy."*（“量子纠缠、P=NP、熵”）

Placed inside one Clifford orthogonal frame, **“量子纠缠、P=NP、熵”** (*quantum entanglement, P=NP, entropy*) cease to be isolated terms from quantum information, computational complexity, and thermodynamics, and lock together around a single **partial-trace horizon** (`MODEL`): cross-cut exterior bivector area $\mathbf{e}_A \wedge \mathbf{e}_{\bar{A}}$ supplies **quantum entanglement**; tracing out the inaccessible partner sector $\bar{A}$ via $\rho_A = \Tr_{\bar{A}}\bigl(\lvert\Psi\rangle\langle\Psi\rvert\bigr)$ converts that severed off-cut coherence into local marginal **entropy**; and the exact Schmidt rank $\chi_{\mathrm{exact}}$ needed to carry correlations across the cut—bounded below by the entropy effective dimension $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \le \chi_{\mathrm{exact}}$—separates Area-Law guiding fields from exponential Volume-Law walls (contrasted with the open Turing-machine conjecture [@conj-p-neq-np], `OPEN`).

## 1. Exact Two-Body Pythagorean Conservation and Marginal Entropy Under Partial Trace (`LEAN ✓` Anchors + Exact Identities)

Consider the canonical two-qubit pure state parameterized by the orthogonal Schmidt angle $\theta \in [0, \pi/2]$:

$$
\lvert\psi(\theta)\rangle = \cos\frac{\theta}{2}\lvert 00\rangle + \sin\frac{\theta}{2}\lvert 11\rangle, \qquad \rho_{A\bar{A}}(\theta) = \lvert\psi(\theta)\rangle\langle\psi(\theta)\rvert.
$$

For every $\theta$, the joint density operator $\rho_{A\bar{A}}(\theta)$ is rank-$1$ and idempotent ($\rho_{A\bar{A}}^2 = \rho_{A\bar{A}}$), so its global von Neumann entropy vanishes identically: $S_{\mathrm{global}}\bigl(\rho_{A\bar{A}}(\theta)\bigr) \equiv 0\text{ bits}$. Yet when a finite observer holds only qubit $A$ and traces out the partner qubit $\bar{A}$ (compare Chapter 4's nonselective marginalization theorem [@thm-nonselective-marginal] and access-defect theorem [@thm-reduced-access-defect]), off-diagonal coherences cancel under the trace (compare the pinching Pythagorean theorem [@thm-pinching-pythagorean]), leaving the exact reduced marginal state

$$
\rho_A(\theta) = \Tr_{\bar{A}}\bigl(\rho_{A\bar{A}}(\theta)\bigr) = \operatorname{diag}\!\left(\frac{1 + \cos\theta}{2},\; \frac{1 - \cos\theta}{2}\right) = \frac{1}{2}\bigl(I_2 + \cos\theta\,\sigma_Z\bigr).
$$

Evaluating the local Bloch sphere of $A$ alongside the bipartite correlation sector (Chapter 13 [@thm-local-correlation-sectors]) yields four exact identities without approximation:

1. **Local Vector Determinacy (Squared Inner-Product Shadow)**: Observer $A$'s local Bloch vector is $\mathbf{r}_A = (0, 0, \cos\theta)$, with length $\|\mathbf{r}_A\| = \cos\theta$ and squared norm $\|\mathbf{r}_A\|^2 = \cos^2\theta$;
2. **Concurrence and 2-Tangle (Squared Exterior Bivector Area)**: Wootters's concurrence of the pure state $\lvert\psi(\theta)\rangle$ is $\mathcal{C}(\psi) = 2\cos\frac{\theta}{2}\sin\frac{\theta}{2} = \sin\theta$, and its 2-tangle is $\tau(A:\bar{A}) = \mathcal{C}^2 = \sin^2\theta$;
3. **Purity and Normalized Linear Entropy Identity**: Local purity satisfies $\Tr\bigl(\rho_A(\theta)^2\bigr) = \left(\frac{1+\cos\theta}{2}\right)^2 + \left(\frac{1-\cos\theta}{2}\right)^2 = \frac{1+\cos^2\theta}{2} = 1 - \frac{1}{2}\sin^2\theta$, so the normalized linear entropy obeys

   $$
   S_L\bigl(\rho_A(\theta)\bigr) := 2\Bigl(1 - \Tr\bigl(\rho_A(\theta)^2\bigr)\Bigr) = \sin^2\theta \equiv \tau(A:\bar{A});
   $$

4. **Pythagorean Conservation of Determinacy and Entanglement / Marginal Entropy, Plus Binary von Neumann Entropy**: The squared local vector norm and the cross-cut 2-tangle (identically equal to local linear entropy) sum to $1$ everywhere, while the binary von Neumann entanglement entropy (in $\mathrm{bits}$) is given by the binary Shannon entropy:

   $$
   \begin{aligned}
   \|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) &= \cos^2\theta + \sin^2\theta \equiv 1, \\
   S_{\mathrm{vN}}\bigl(\rho_A(\theta)\bigr) &= H_{\mathrm{bin}}\!\left(\frac{1 + \cos\theta}{2}\right) = -\frac{1+\cos\theta}{2}\log_2\frac{1+\cos\theta}{2} - \frac{1-\cos\theta}{2}\log_2\frac{1-\cos\theta}{2}.
   \end{aligned}
   $$

At $\theta = 90^\circ$ ($\pi/2$), $\lvert\psi(\pi/2)\rangle = \lvert\Phi^+\rangle$ is the exact Bell state verified in Chapter 13 [@lemma-bell-mixed-marginal]: globally $\rho_{\Phi^+}^2 = \rho_{\Phi^+}$ ($S_{\mathrm{global}} = 0$), whereas locally $\rho_A = \frac{1}{2}I_2$ collapses to the sphere center ($\|\mathbf{r}_A\| = 0$, $S_L = \tau = 1$, $S_{\mathrm{vN}} = 1\text{ bit}$). As Chapter 13 [@thm-local-correlation-sectors] makes explicit, the equality $S_L(\rho_A) = \tau(A:\bar{A})$ **requires the global bipartite state to be pure**; for the classical correlated mixture $\frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert)$, the marginal is likewise $\frac{1}{2}I_2$ with $S_L(\rho_A) = 1$, yet that entropy reflects global classical ignorance rather than quantum entanglement ($\tau = 0$). Dynamically, Chapter 8's coherence-deletion identity [@thm-entropy-production-coherence-deletion] proves that the von Neumann entropy produced by basis pinching after unitary evolution equals the nonnegative quantum relative entropy $D(\rho' \parallel \mathcal{P}(\rho')) \ge 0$ of deleted coherence.

::: {.viz src="entanglement-entropy-complexity" preset="pythagoras" height="500"}
**Two-body Pythagorean conservation and the partial-trace blind spot.** At $\theta = 53.13^\circ$ (the classic $3\text{-}4\text{-}5$ right triangle), observer $A$'s cyan Bloch arrow has length $\cos\theta = 0.600$ and cross-cut concurrence is $\sin\theta = 0.800$, satisfying $0.360 + 0.640 = 1.000$. The lowered magenta/violet partial-trace blade dims the dual sector $\bar{A}$ and turns off-cut bivector area into $A$'s marginal entropy halo ($S_L = \tau = 0.640$, $S_{\mathrm{vN}} \approx 0.722\text{ bits}$).
:::

## 2. The Entanglement-Topology Watershed: Area-Law Guiding Fields vs. Volume-Law Bond-Dimension Walls (`MODEL` + Literature Boundary)

Extending from one pair to an $n$-qubit tensor network (staged at $n = 16$ in the lab, with $8$ observer qubits in $A$ and $8$ dual qubits in $\bar{A}$), Chapter 19's discrete bridge-graph quantum max-flow min-cut theorem [@thm-bridge-quantum-maxflow-mincut] bounds the rank across a cut $A \mid \bar{A}$ by cut capacity. Here two quantities must be kept strictly distinct: the **exact Schmidt rank** $\chi_{\mathrm{exact}} := \operatorname{rank}(\rho_A)$ (the minimum bond dimension required for an exact, un-truncated decomposition across $A \mid \bar{A}$) and the **entropy effective dimension** $\chi_{\mathrm{eff}} := 2^{S_{\mathrm{vN}}(\rho_A)}$ (plotted directly on the laboratory stage as $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$). Every finite-dimensional density operator satisfies $S_{\mathrm{vN}}(\rho_A) \le \log_2 \operatorname{rank}(\rho_A) = \log_2 \chi_{\mathrm{exact}}$, so

$$
\chi_{\mathrm{eff}} = 2^{S_{\mathrm{vN}}(\rho_A)} \le \chi_{\mathrm{exact}},
$$

meaning that $\chi_{\mathrm{eff}}$ is in general a **lower bound** on exact Schmidt rank, coinciding with $\chi_{\mathrm{exact}}$ if and only if all nonzero eigenvalues of $\rho_A$ (squared Schmidt weights) are equal—achieved for non-product bridges precisely at the maximally entangled horizon $\theta = 90^\circ$. In our laboratory's factorized independent-bridge toy model (`MODEL`), when $k_{\mathrm{cut}}$ pairs of angle $\theta \in (0^\circ, 90^\circ]$ cross $A \mid \bar{A}$, cut entropy is $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta)$, entropy effective dimension is $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$, and exact Schmidt rank is $\chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}}$:

- **Area-Law Topology ($\chi_{\mathrm{exact}} = O(1)$ in the factorized bridge model; polynomial-bond MPS approximation for the unique-ground-state regime below)**: Within our factorized bridge model (`MODEL`), when only $k_{\mathrm{cut}} = O(1)$ boundary bridges cross the cut—for a single bridge ($k_{\mathrm{cut}} = 1$) the exact Schmidt rank is $\chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}} = 2 = O(1)$, and on the stage's two-bridge preset ($k_{\mathrm{cut}} = 2$) it is $\chi_{\mathrm{exact}} = 2^2 = 4 = O(1)$ (with $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta) = O(1)$)—exact constant-bond contraction across the cut holds directly inside that toy model. By contrast, in the cited literature on unique ground states of 1D local Hamiltonians with fixed local dimension, finite interaction range, bounded local interaction strength, and a positive constant spectral gap independent of $n$ (Hastings 2007; Arad–Kitaev–Landau–Vazirani 2013; Landau–Vazirani–Vidick 2015, see [@rem-ch30-entanglement-entropy-complexity-literature]), $S_{\mathrm{cut}} = O(1)$ alone does not unconditionally force an exact finite-rank matrix-product-state (MPS) identity; rather, spectral gap and locality yield **efficient polynomial-bond-dimension ($\operatorname{poly}(n)$) MPS approximations** within $1/\operatorname{poly}(n)$ error. Comparing this tractable regime to 1D implication chains ($\text{2-SAT} \in \mathrm{P}$) and contrasting contraction costs across topologies explicitly belongs to our interpretive `MODEL`;
- **Volume-Law Topology ($S_{\mathrm{cut}} = \Theta(n) \implies \chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{\Theta(n)}$)**: In non-local expander couplings, frustrated ternary constraint networks, or scrambled late-time radiation (analogous to random $\text{3-SAT}$ local blind spots, with contraction-cost comparisons framed inside `MODEL`), entanglement bridges weave across the bulk ($k_{\mathrm{cut}} = 8$ cross-cut pairs on the stage). Once the partial-trace blade descends at fixed $\theta \in (0^\circ, 90^\circ]$, $S_{\mathrm{cut}} = k_{\mathrm{cut}} S_{\mathrm{vN}}(\theta) = \Theta(n)$, and the general lower bound $\chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} = 2^{\Theta(n)}$ rigorously forces the exact Schmidt rank across that cut to grow exponentially as $2^{\Theta(n)}$!

Epistemically, an exponential exact Schmidt rank $\chi_{\mathrm{exact}} \ge \chi_{\mathrm{eff}} = 2^{\Theta(n)}$ across a chosen bipartition bounds **exact tensor decomposition directly across that cut**, while our cross-topology contraction-cost comparison belongs to `MODEL`; neither rules out alternative representations or algorithms, nor proves standard Turing-machine $\mathrm{P} \neq \mathrm{NP}$ ([@conj-p-neq-np], `OPEN`).

::: {.viz src="entanglement-entropy-complexity" preset="arealaw" height="500"}
**Area law: two-bridge boundary toy model and constant exact rank (`MODEL`).** Holding $\theta = 60^\circ$ ($S_{\mathrm{vN}} \approx 0.811\text{ bits}$ per pair), the factorized Area-Law topology routes only $k_{\mathrm{cut}} = 2$ boundary rails across the magenta/violet blade: cut entropy stays at $S_{\mathrm{cut}} \approx 1.623\text{ bits}$ and the 3D entropy effective dimension column remains low at $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \approx 3.08 \le \chi_{\mathrm{exact}} = 2^2 = 4$.
:::

Keeping the single-pair Schmidt angle fixed at $\theta = 60^\circ$ while switching the network topology from two boundary rails to eight bulk-weaving expander bridges ($k_{\mathrm{cut}} = 8$) quadruples the entanglement entropy crossing the exact same horizon blade, raises $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}}$ to the fourth power, and elevates the exact bipartition Schmidt rank from $2^2 = 4$ to $2^8 = 256$:

::: {.viz src="entanglement-entropy-complexity" preset="volumelaw" height="500"}
**Volume law: eight expander bridges at the same angle erect an exponential wall.** At the exact same angle $\theta = 60^\circ$, routing all $k_{\mathrm{cut}} = 8$ non-local expander bridges across the cut quadruples cut entropy to $S_{\mathrm{cut}} \approx 6.490\text{ bits}$ and drives the entropy effective dimension up to $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} = 4^8 / 3^6 \approx 89.90 \le \chi_{\mathrm{exact}} = 2^8 = 256$.
:::

## 3. The Double-Edged Sword of Entanglement: Local Monogamy Firewalls vs. Global Coherent Readout (`Literature` + `OPEN`)

Across computational complexity, quantum entanglement acts as a striking double-edged sword: locally, monogamy and partial-trace scrambling erect an exponential decoding barrier for bounded observers; globally or interactively, extra postselection or shared-entanglement resources collapse verification far beyond classical limits. The underlying external theorems and their exact hypotheses are isolated in the following remark:

::: {.remark #rem-ch30-entanglement-entropy-complexity-literature title="Literature Note on Area vs. Volume Laws, Monogamy Decoding Walls, and Shared-Entanglement Verification (MIP* = RE)"}
**Literature result, not formalized in this book.** Four groups of quantum many-body and complexity-theoretic theorems referenced here belong to the external literature, are not formalized in this book, and carry strict model hypotheses:

1. **1D Gapped Area Law, Polynomial-Bond MPS Approximation, and Haar-Random Volume Law (M. B. Hastings, *J. Stat. Mech.* P08024, 2007; I. Arad, A. Kitaev, Z. Landau & U. Vazirani, *arXiv:1301.1162*, 2013; Z. Landau, U. Vazirani & T. Vidick, *Nature Phys.* **11**, 932–936, 2015; D. N. Page, *Phys. Rev. Lett.* **71**, 1291–1294, 1993)**: For 1D local Hamiltonians with fixed local dimension, finite interaction range, bounded local interaction strength, and a positive constant spectral gap independent of $n$, the unique ground state satisfies the entanglement area law $S_{\mathrm{cut}} = O(1)$ and admits **polynomial-bond-dimension ($\operatorname{poly}(n)$) MPS approximations within $1/\operatorname{poly}(n)$ error**; for nearest-neighbor terms $0 \le H_i \le I$, Landau–Vazirani–Vidick give a randomized polynomial-time algorithm that finds such an approximation with probability at least $1-1/\operatorname{poly}(n)$ (note that $S_{\mathrm{cut}} = O(1)$ alone does not unconditionally imply a zero-error exact finite-rank MPS identity); by contrast, generic Haar-random $n$-qubit pure states obey Page's volume law $S_{\mathrm{cut}} = \frac{n}{2}\text{ bits} - O(1) = \Theta(n)$ across a balanced cut, forcing exact MPS Schmidt rank $\chi_{\mathrm{exact}} \ge 2^{S_{\mathrm{cut}}} = 2^{\Theta(n)}$;
2. **CKW Entanglement Monogamy and the Radiation-Decoding Complexity Barrier (V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000; D. Harlow & P. Hayden, *JHEP* **06**, 085, 2013; L. Susskind, *Fortschr. Phys.* **64**, 24–43, 2016)**: Three-qubit 2-tangles obey $\tau(A:B) + \tau(A:C) \le \tau(A:BC)$ (see Chapter 31 [@rem-ch31-ckw-monogamy-literature]). Addressing the monogamy tension between late Hawking radiation and interior modes, Harlow and Hayden proved in their statistical/code toy models that—under standard quantum complexity assumptions such as `QSZK` hardness—no polynomial-time quantum circuit can decode a purified partner qubit from the early-radiation register; that decoding realistic evaporating Hawking radiation requires exponential circuit size $2^{\Omega(S_{\mathrm{BH}})}$ is Harlow and Hayden's explicit complexity **conjecture** (`OPEN` / `MODEL` extrapolation), proposed as a computational firewall for bounded-gate observers;
3. **Postselected Collapse and Shared-Entanglement Interactive Verification $\mathrm{MIP}^* = \mathrm{RE}$ (S. Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005; Z. Ji, A. Natarajan, T. Vidick, J. Wright & H. Yuen, *arXiv:2001.04383*, 2020 / *Commun. ACM* **64**(11), 131–138, 2021)**: As noted in [@rem-ch30-postselection-ctc-literature], conditioning for free on exponentially rare postselection events yields $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$. Meanwhile, whereas classical multi-prover interactive proofs satisfy $\mathrm{MIP} = \mathrm{NEXP}$ (Babai–Fortnow–Lund, 1991), allowing spatially separated non-communicating provers to share unbounded finite-dimensional quantum entanglement expands polynomial-time classical verification to all recursively enumerable languages (the complexity class of the halting problem):

   $$
   \mathrm{MIP}^* = \mathrm{RE};
   $$

4. **Strict Boundary with Open Standard Turing-Machine Conjectures**: Both free postselection ($\mathrm{PostBQP}$) and multi-prover nonlocal entanglement interrogation ($\mathrm{MIP}^*$) supply extra computational or interactive resources absent from standalone uniform algorithms; neither implies $\mathrm{BQP} \supseteq \mathrm{NP}$ or $\mathrm{P} = \mathrm{NP}$, and standard uniform Turing-machine $\mathrm{P} \neq \mathrm{NP}$ ([@conj-p-neq-np]) remains strictly `OPEN`.
:::

Comparing the exact same $\theta = 90^\circ$ Volume-Law network with the partial-trace horizon blade lowered versus lifted makes both edges of the sword visible side by side:

::: {.viz src="entanglement-entropy-complexity" preset="bellcut" height="500"}
**Blade lowered: 90° Bell partial-trace fog and the 256-bond-dimension wall.** Under Volume-Law topology at $\theta = 90^\circ$, tracing out $\bar{A}$ collapses all eight local Bloch vectors in $A$ to zero ($\|\mathbf{r}_A\| = 0$, $S_{\mathrm{vN}} = 1\text{ bit}$ per qubit, [@lemma-bell-mixed-marginal]), driving cut entropy to $S_{\mathrm{cut}} = 8\text{ bits}$ with all $2^8 = 256$ Schmidt weights equal so entropy effective dimension meets exact Schmidt rank: $\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 256$.
:::

Conversely, lifting the partial-trace blade without altering $|\Psi\rangle$ leaves the fixed-cut exact Schmidt rank $\chi_{\mathrm{exact}} = 256$ and cut entanglement entropy $S(\rho_A) = 8\text{ bits}$ strictly unchanged as intrinsic invariants of $|\Psi\rangle$ across $A \mid \bar{A}$ (and never eliminates fixed-cut tensor-contraction cost); what changes is the operator being evaluated—from the traced-out marginal $\rho_A = \operatorname{Tr}_{\bar{A}}|\Psi\rangle\langle\Psi|$ back to the un-traced global pure projector $\rho_{AB} = |\Psi\rangle\langle\Psi|$, which has **global density-operator rank $r_{\mathrm{global}} = 1$ and global von Neumann entropy $S(\rho_{AB}) = 0\text{ bits}$** (while comparing state reconstruction from local marginals against unitary circuit preparation or interactive verification belongs to our interpretive `MODEL`):

::: {.viz src="entanglement-entropy-complexity" preset="globaljoint" height="500"}
**Blade lifted: the global pure density operator satisfies $r_{\mathrm{global}} = 1$ and $S(\rho_{AB}) = 0$.** Holding the state $|\Psi\rangle$ fixed (so its exact bipartition Schmidt rank $\chi_{\mathrm{exact}} = 256$ and marginal entropy $S(\rho_A) = 8\text{ bits}$ across $A \mid \bar{A}$ remain invariant), lifting the magenta/violet partial-trace blade displays all eight $A \leftrightarrow \bar{A}$ bivector bridges on the global pure state $\rho_{AB} = |\Psi\rangle\langle\Psi|$ of global rank $r_{\mathrm{global}} = 1$ and global entropy $S(\rho_{AB}) = 0\text{ bits}$ (comparing marginal blind spots against unitary preparation or extra-resource regimes is an interpretive `MODEL`; see [@rem-ch30-entanglement-entropy-complexity-literature]).
:::

## 4. Three Characteristic Orthogonal Angles $\theta \in \{0^\circ,\, \theta^* \approx 42.35^\circ,\, 90^\circ\}$ and the Living Observer Balance (`MODEL`)

Between $\theta = 0^\circ$ (an isolated classical product point with zero entanglement and zero marginal entropy) and $\theta = 90^\circ$ (the Bell horizon where local direction vanishes completely, $\|\mathbf{r}_A\| = 0$, into maximal $1\text{-bit}$ marginal fog), where does a finite living observer—who must simultaneously retain local memory orientation and sustain cross-boundary entanglement exchange—reside? In our orthogonal self-referential model (`MODEL`), that poised intermediate regime sits at the unique positive cosine fixed point $\cos\theta^* = \theta^* \approx 0.7391\text{ rad}$ ($42.35^\circ$) verified in Chapter 24 [@thm-dottie-rational-inverse-endpoint]: here the local Bloch length equals the Schmidt angle in radians itself ($\|\mathbf{r}_A\| = \cos\theta^* = \theta^*$), local determinacy $\|\mathbf{r}_A\|^2 \approx 0.5462$ and cross-cut 2-tangle $\tau = S_L \approx 0.4538$ (concurrence $\mathcal{C} = \sin\theta^* \approx 0.6736$) sum to $1$, and single-qubit von Neumann entropy stabilizes at $S_{\mathrm{vN}}(\rho_A) \approx 0.559\text{ bits}$ ($0.55869\text{ bits}$ to five decimals). The table below contrasts the three angles:

| Schmidt Angle $\theta$ | Local Norm $\|\mathbf{r}_A\| = \cos\theta$ | Local Weight $\|\mathbf{r}_A\|^2 = \cos^2\theta$ | 2-Tangle $\tau = S_L = \sin^2\theta$ | Marginal Entropy $S_{\mathrm{vN}}(\rho_A)$ | Local vs. Global Complexity Phase (`MODEL` / Literature) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$0^\circ$ ($0\text{ rad}$)** | $1.0000$ | $1.0000$ | $0.0000$ | $0.000\text{ bits}$ | **Separable Classical Crystal**: zero cross-cut bridges, $\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 1$, locally self-contained without quantum correlations |
| **$\theta^* \approx 42.35^\circ$ ($0.7391\text{ rad}$)** | $0.7391$ ($=\theta^*$) | $0.5462$ | $0.4538$ ($\mathcal{C}\approx 0.6736$) | $0.559\text{ bits}$ | **Living Self-Referential Balance** ([@thm-dottie-rational-inverse-endpoint]): retains $54.6\%$ local orientation alongside $45.4\%$ cross-cut tangle |
| **$90^\circ$ ($\pi/2\text{ rad}$)** | $0.0000$ | $0.0000$ | $1.0000$ ($\mathcal{C}=1.0000$) | $1.000\text{ bit}$ | **Bell Orthogonal Horizon** ([@lemma-bell-mixed-marginal]): local $\rho_A = \frac{1}{2}I_2$ blind spot & Volume-Law $\chi_{\mathrm{eff}} = \chi_{\mathrm{exact}} = 2^{k_{\mathrm{cut}}}$ wall; global pure $r_{\mathrm{global}} = 1, S(\rho_{AB}) = 0$ |

::: {.viz src="entanglement-entropy-complexity" preset="dottie" height="500"}
**Living observer balance at $\theta^* \approx 42.35^\circ$.** The amber active marker rests inside the static cyan reference ring $\cos\theta^* = \theta^* \approx 0.7391$: local weight $\|\mathbf{r}_A\|^2 \approx 0.5462$ and cross-cut tangle $\tau = S_L \approx 0.4538$ sum to $1$ with marginal entropy $S_{\mathrm{vN}} \approx 0.559\text{ bits}$—neither frozen into a separable point nor dissolved into $90^\circ$ Bell noise.
:::

With all six benchmark snapshots in place, step into the full 16-qubit interactive laboratory below to sweep the Schmidt angle $\theta \in [0^\circ, 90^\circ]$ continuously and toggle both the partial-trace horizon blade and the Area- versus Volume-Law bridge topology on one stage:

::: {.viz src="entanglement-entropy-complexity" height="640"}
**Interactive laboratory `ORTHO//TRIAD`**: On a 16-qubit 3D tensor network ($8$ observer qubits in $A$, $8$ dual qubits in $\bar{A}$), sweep the Schmidt angle $\theta \in [0^\circ, 90^\circ]$, toggle the magenta/violet partial-trace horizon blade (`Local cut` vs. `Global pure`) and entanglement topology (`Area law` $k_{\mathrm{cut}} = 2$ vs. `Volume law` $k_{\mathrm{cut}} = 8$), and track exact Pythagorean conservation $\|\mathbf{r}_A\|^2 + \tau = 1$, marginal entropy $S_{\mathrm{vN}}(\rho_A)$, and entropy effective dimension $\chi_{\mathrm{eff}} = 2^{S_{\mathrm{cut}}} \le \chi_{\mathrm{exact}}$ in the synchronized strip plots. This lab is a geometric and numerical illustration, not a proof of Turing-machine $\mathrm{P} \neq \mathrm{NP}$ (`OPEN`).
:::

---

