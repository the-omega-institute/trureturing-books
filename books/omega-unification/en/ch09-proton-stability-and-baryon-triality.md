# Chapter 9 Dimension-Six Baryon Operators and Baryon Triality Selection Rules {#sec-ch09}

> "The deadliest gift of grand unification is not high-energy crossing, but proton decay; gauge orthogonality seats the charges at separate tables, yet it swears no oath to keep the proton whole."

The second half of Question 3 points straight at the oldest sword hanging over grand unification: **will the proton decay?** In standard $SU(5)$ unification, packing quarks and leptons into shared multiplets invites heavy gauge-boson exchange to generate the dimension-six operator $QQQL$, pushing the proton lifetime right up against experimental walls. One might hope that because the 19-point Behrend shell encodes color, weak isospin, and hypercharge via orthogonal block projections and arc phases, gauge orthogonality itself automatically bans $QQQL$.

This chapter shatters that illusion with an exact thirty-six-monomial Grassmann expansion: gauge orthogonality and perturbative threshold data leave the dimension-six Wilson coefficient $c_6$ completely unconstrained. We then build the exact defense from the ground up: classifying all generation-universal **baryon triality $\mathbb{Z}_3$** assignments, proving that triality lifts the lowest allowed baryon-violating operator from dimension $6$ to dimension $15$ (or $18$ with $B - L$ conserved), constructing an anomaly-free gauged $U(1)_X$ UV completion whose six anomaly traces vanish identically, and establishing the general generation-divisibility law $m \mid N_g$.

Yet installing that seemingly modest order-3 phase inside a full unified gauge group and the 19-point shell sets off an extraordinary algebraic and topological chain reaction: the Lie algebra closure inflates to the $123$-dimensional $\mathfrak{su}(5) \oplus \mathfrak{su}(10)$, discrete cubic anomaly inflow forces the **25-state lifted Behrend shell**, tension between spectral grading and site locality explodes the closure to the $1801$-dimensional $\mathfrak{su}(19)^5 \oplus \mathfrak{u}(1)$, and on the joint witness zero **#2,306,888,100,085** the very same 105-winding vacuum and tree spectrum admit two rival UV extensions—one keeping the proton eternally stable, the other activating $QQQL$ with Wilson factor at least $\approx 0.03144$.

## 9.1 Why Gauge Orthogonality Cannot Ban Dimension-Six Proton Decay: Thirty-Six Monomials and Simplicial Exactness {#sec-ch09-qqql-and-exactness}

Does isolating color, weak isospin, and hypercharge inside mutually orthogonal generator blocks seal off baryon-number violation? One explicit invariant tensor answers in the negative.

::: {.definition #def-ou-ch09-baryon-triality title="Dimension-Six QQQL Operator and Generation-Universal Baryon Triality Classification"}
On the Standard Model left-handed Weyl field content, define the gauge-invariant dimension-six four-fermion baryon-violating operator

$$
\mathcal{O}_6 := \epsilon_{abc}\,\epsilon_{ij}\,\epsilon_{kl}\,\epsilon_{\alpha\beta}\,\epsilon_{\gamma\delta}\,Q^{ai\alpha} Q^{bj\beta} Q^{ck\gamma} L^{l\delta},
$$

where $a, b, c \in \{0, 1, 2\}$ are $SU(3)_c$ color indices, $i, j, k, l \in \{0, 1\}$ are $SU(2)_L$ weak-isospin indices, and $\alpha, \beta, \gamma, \delta \in \{0, 1\}$ are left-handed spinor indices. Its total hypercharge is $3\cdot \tfrac{1}{6} - \tfrac{1}{2} = 0$, and it carries $\Delta B = \Delta L = 1$.

Moreover, on a low-energy spectrum with one Higgs doublet $H$, all standard Yukawa couplings, and the Weinberg neutrino-mass operator $(LH)^2$, let $(q, l, h)$ denote the generation-universal $\mathbb{Z}_3$ charges of the left quark doublet, left lepton doublet, and Higgs doublet. Fixing conjugate singlets by Yukawa invariance and enforcing $2(l + h) \equiv 0 \pmod 3$ (so $l \equiv -h$) from the Weinberg operator yields the complete classification of generation-universal $\mathbb{Z}_3$ charges:

$$
X \equiv h(2Y - B) + q(3B) \pmod 3.
$$

:::

### 9.1.1 Thirty-Six Nonzero Grassmann Monomials and Inverse Unidentifiability

Casual intuition often assumes that antisymmetrizing three identical single-generation quark fields vanishes by Pauli exclusion. Explicit Grassmann expansion dispels that misconception immediately ([cyclic rotation and proton selection rules](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E4%B8%89%E4%BB%A3%E8%BD%AE%E6%8D%A2%E4%B8%8E%E8%B4%A8%E5%AD%90%E9%80%89%E6%8B%A9%E5%AE%9A%E5%88%99.md)):

::: {.example #ex-ou-ch09-qqql-grassmann title="Exact 36-Monomial Grassmann Expansion of Single-Generation QQQL and Coefficient-4 Witness"}
Ordering the single-generation Grassmann components of $Q^{ai\alpha}$ lexicographically by color, weak isospin, and spinor indices $(a, i, \alpha)$, and $L^{l\delta}$ by $(l, \delta)$, the exact expansion of $\mathcal{O}_6 = \epsilon_{abc}\epsilon_{ij}\epsilon_{kl}\epsilon_{\alpha\beta}\epsilon_{\gamma\delta} Q^{ai\alpha} Q^{bj\beta} Q^{ck\gamma} L^{l\delta}$ does not vanish: it produces exactly **$36$ distinct nonzero Grassmann monomials**. For instance, choosing the three quark multi-indices $(0, 0, 0)$, $(1, 0, 0)$, $(2, 1, 1)$ together with lepton index $(1, 1)$ yields an exact integer coefficient of **$4$**.

This nonvanishing expansion immediately proves inverse unidentifiability: any gauge-orthogonal model can share the **exact same arc connection, dual clocks, and quadratic mass spectrum** while assigning an arbitrary dimension-six Wilson coefficient $c_6$ to $\mathcal{O}_6$. For every perturbative threshold observable with vanishing external net baryon number, a single insertion of $\mathcal{O}_6$ contributes identically zero when all other vertices conserve $B$, while pairwise insertions appear at a higher effective-theory order. Gauge orthogonality and tree spectra alone therefore cannot pin down $c_6 = 0$. (In the three-ray boundary model, forcing boundary $QQQL$ contact terms to vanish for all leptons caps the wavefunction overlap of two quark states at $\le 0.706762$.)
:::

### 9.1.2 Zero-Axiom Simplicial Exactness and Mod-5 Rank-One Splitting

Why do local flatness and algebraic splitting fail to obstruct global baryon violation on their own? Turning back to the zero-axiom core of Lean (`axioms: []`), two strictly axiom-free theorems illuminate both local cochain exactness and non-commutative mod-5 rank-one splitting at the foundation:

::: {.theorem #thm-ou-ch09-simplicial-exactness title="Zero-Axiom Simplicial 2-Cochain Exactness and Mod-5 Rank-One Hurwitz Splitting" lean="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one"}
In the strictly zero-axiom kernel (`axioms: []`), both exact statements hold unconditionally:

1. **Simplicial 2-cochain closedness equals exactness** (`d2_eq_zero_iff`): let $(G, \mathrm{laws})$ be an additive Abelian group on $A$, let `base : V` be a base vertex in $V$, and let $F : C^2(V, A)$ be any $2$-cochain. Then $F$ is closed under the $2$-coboundary ($d^2 F(x, y, z, w) = 0$ for all $x, y, z, w \in V$) if and only if there exists a $1$-cochain $e : C^1(V, A)$ such that $F = d^1 e$ ($d^1 e(x, y, z) = F(x, y, z)$ for all $x, y, z \in V$).
2. **Mod-5 rank-one splitting of Hurwitz generators** (`mod_five_rank_one`): for each of the six norm-$5$ Hurwitz quaternion generators `g : Hurwitz.Generator` with explicit residue factors `f := g.factors`, its splitting image in $\mathrm{Mat}_2(\mathbb{F}_5)$ satisfies

   $$
   \mathrm{split5}(g.\mathrm{coordinates}) = \mathrm{Matrix5.outer}(f.u, f.v, f.s, f.t)
   \qquad \text{and} \qquad
   \mathrm{split5}(g.\mathrm{coordinates}).\mathrm{isZero} = \mathrm{false}.
   $$

:::

::: {.proof}
The first statement is proved directly by the cone homotopy operator: in the forward direction (exact implies closed), expanding $d^2(d^1 e)(x, y, z, w)$ pairs all six $1$-cochain evaluations into canceling opposite terms under the Abelian group laws; in the converse direction (closed implies exact), defining $e(x, y) := F(\mathrm{base}, x, y)$ and substituting into $d^2 F(\mathrm{base}, x, y, z) = 0$ yields $d^1 e(x, y, z) = F(x, y, z)$ identically. The second statement proceeds by finite case analysis over all six constructors of `Hurwitz.Generator`, reducing each $\mathrm{split5}$ evaluation directly to its explicit nonzero rank-one outer product in $\mathrm{Mat}_2(\mathbb{F}_5)$. Both declarations have empty transitive axiom closure (`axioms: []`). The full proof is checked by the Lean kernel.
:::

[@thm-ou-ch09-simplicial-exactness] underscores a sobering principle: on a contractible cone, vanishing local curvature ($d^2 F = 0$) is always trivialized by a $1$-cochain potential $e$ and builds no global topological barrier against baryon decay; likewise, mod-$5$ rank-one splitting enforces rigid non-commutative word structure without fixing the coefficient of a four-fermion operator like $QQQL$. Protecting the proton demands an explicit **global discrete baryon symmetry** and an honest audit of its UV completion.

## 9.2 Exact Baryon Triality, the Dimension-Fifteen Floor, and Anomaly-Free UV Completion {#sec-ch09-triality-uv}

Return to the generation-universal $\mathbb{Z}_3$ family $X \equiv h(2Y - B) + q(3B) \pmod 3$ of [@def-ou-ch09-baryon-triality]. On every color-singlet local operator built from light Standard Model fields, the net color triality is a multiple of $3$, so $3B$ acts trivially; on hypercharge-neutral operators, the effective charge collapses cleanly to

$$
X_{\text{eff}} \equiv -h\, B \pmod 3.
$$

Choosing $h \not\equiv 0 \pmod 3$ (the two nonzero values $h = 1, 2$ swap the generator and give the identical selection rule) unleashes three sharp consequences of **exact baryon triality**:

1. **Absolute ban on $\Delta B \equiv 1, 2 \pmod 3$**: single-proton decay and $\Delta B = 2$ oscillations—including dimension-six $QQQL$—carry nonzero triality charge and vanish identically, while every Standard Model Yukawa coupling and the Weinberg operator remain allowed. Composing the discrete transformation with a constant hypercharge gauge rotation leaves the Higgs vacuum strictly neutral.
2. **Operator-dimension floor jumps to $15$ (or $18$)**: under $\Delta B \in 3\mathbb{Z}$, the lowest allowed light-field baryon-violating local operator rises from dimension $6$ to **dimension $15$**—and to **dimension $18$** if $B - L$ is simultaneously preserved ([`ch39-baryon-triality-operator-floor.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-baryon-triality-operator-floor.py)). By contrast, pure bilinear four-step Wilson-Yukawa regulators enforce an overly strong continuous $U(1)_B$ that misses the three-generation electroweak instanton of [Chapter 7](ch07-chiral-three-generations.md), whereas exact $\mathbb{Z}_3$ matches the instanton rule $\Delta B = 3$ like a lock and key.
3. **Anomaly-free gauged $U(1)_X$ UV completion and the divisibility law $m \mid N_g$**: baryon triality need not be postulated as an ungrounded global symmetry. Introduce a gauged $U(1)_X$ with $X = 3B - 9L_\tau$, adjoin a left-handed conjugate neutrino $\nu^c_\tau$ of charge $+9$ (plus optional neutral singlets for $e, \mu$), and condense a Standard Model neutral scalar of charge $9$.

::: {.remark #rem-ou-ch09-anomaly-ledger title="Term-by-Term Cancellation of All Six Chiral Anomaly Traces for Gauged $U(1)_X$ ($X = 3B - 9L_\tau$)"}
On the left-handed Weyl spectrum, the three quark families $(Q, u^c, d^c)$ carry $X$-charges $(+1, -1, -1)$, the first two lepton generations carry $0$, and the $\tau$ family $(L_\tau, e^c_\tau, \nu^c_\tau)$ carries $(-9, +9, +9)$. Every gauge and gravitational mixed anomaly vanishes identically:

| Anomaly trace | Three-generation quark contribution | $\tau$-family contribution (with $\nu^c_\tau$) | Net sum |
| :--- | :---: | :---: | :---: |
| $SU(3)_c^2 X$ | $3 \times (2\cdot 1 - 1 - 1) = 0$ | $0$ | **$0$** |
| $SU(2)_L^2 X$ | $3_{\text{gen}} \times 3_{\text{col}} \times (+1) = +9$ | $1 \times (-9) = -9$ | **$0$** |
| $Y^2 X$ | $3 \times 3\bigl[2(\tfrac{1}{6})^2(1) + (-\tfrac{2}{3})^2(-1) + (\tfrac{1}{3})^2(-1)\bigr] = -\tfrac{9}{2}$ | $2(-\tfrac{1}{2})^2(-9) + 1^2(+9) = +\tfrac{9}{2}$ | **$0$** |
| $Y X^2$ | $3 \times 3\bigl[2(\tfrac{1}{6}) + (-\tfrac{2}{3}) + (\tfrac{1}{3})\bigr]\cdot 1^2 = 0$ | $\bigl[2(-\tfrac{1}{2}) + 1\bigr]\cdot 81 = 0$ | **$0$** |
| $X^3$ | $3 \times 3\bigl[2(1)^3 + (-1)^3 + (-1)^3\bigr] = 0$ | $2(-9)^3 + (+9)^3 + (+9)^3 = 0$ | **$0$** |
| $\mathrm{grav}^2 X$ | $3 \times 3(2 - 1 - 1) = 0$ | $2(-9) + 9 + 9 = 0$ | **$0$** |

Condensing the charge-$9$ scalar breaks $U(1)_X$ to $\mathbb{Z}_9$, assigning phase $e^{2\pi i/9}$ to quarks and $1$ to all leptons; its cube is precisely the $SU(3)_c$ color center, so on color singlets it acts faithfully as $\mathbb{Z}_3$ ($\Delta B \in 3\mathbb{Z}$). Generalizing to $N_g$ generations protecting $\Delta B \in m\mathbb{Z}$ sets $X = 3B - 3m\sum_i n_i L_i$ with a charge-$3m$ condensate, where weak anomaly cancellation is equivalent to $N_g = m\sum_i n_i$—hence **$m \mid N_g$ is both necessary and sufficient**, mirroring the electroweak instanton selection rule $\Delta B = N_g$! Crucially, demanding a generation-universal continuous $U(1)$ with no new chiral weak multiplets forces $3q + l = 0$, leaving $QQQL$ neutral—proving that **UV generation-dependence is unavoidable for an Abelian gauge lift**.
:::

## 9.3 Shell-Triality Algebra Closure, Discrete Anomaly Inflow, and the 25-State Lifted Shell {#sec-ch09-algebra-inflow}

While $U(1)_X$ gives a clean Abelian lift over the Standard Model, installing the Behrend shell's species-dependent triality phase $F$ directly atop full $SU(5)$ vertices unleashes an extraordinary sequence of algebraic and topological demands.

### 9.3.1 Minimal $\mathfrak{su}(5) \oplus \mathfrak{su}(10)$ Closure and Locking Potential Thresholds

1. **Minimal $123$-dimensional Lie closure $\mathfrak{su}(5) \oplus \mathfrak{su}(10)$**: on one fifteen-dimensional family $\bar{\mathbf{5}} \oplus \mathbf{10}$, the shell triality phase $F$ acts as $(\omega, \bar{\omega})$ on the anti-color and weak entries of $\bar{\mathbf{5}}$, and as $(\bar{\omega}, 1, \bar{\omega})$ on the color-color, color-weak, and weak-weak entries of $\mathbf{10}$. Why does a single ordinary heavy $X/Y$ generator blow open the entire ten-dimensional block into $\mathfrak{su}(10)$? Watch its exterior-square action: a heavy root mapping color coordinate $i$ to weak coordinate $a$ sends each two-element subset $\{i, j\}$ in $\mathbf{10} = \Lambda^2(\mathbb{C}^5)$ to $\{a, j\}$ as $j$ runs over the remaining three coordinates. When the spectator $j$ is one of the other two colors, the map sends color-color ($\bar{\omega}$) to color-weak ($1$), picking up eigenphase **$\omega$** under $F(\cdot)F^{-1}$; when $j$ is the remaining weak index, it sends color-weak ($1$) to weak-weak ($\bar{\omega}$), picking up the distinct eigenphase **$\omega^2$**! Applying an order-3 character projection over $F^0, F^1, F^2$ immediately isolates that second transition as a single **elementary matrix unit** inside the ten-dimensional block. Conjugating by signed $SU(5)$ coordinate permutations transports this unit across all $60$ pairs of overlapping two-element subsets, and commutators fill in all disjoint pairs and nine traceless diagonals to generate all of $\mathfrak{su}(10)$; since total dimension is at least $99$ while the five-dimensional projection has dimension $24$, simplicity of $\mathfrak{su}(10)$ forces independent generation of both summands. The minimal compact Lie algebra containing $SU(5)$ and closed under $F$ therefore inflates to

   $$
   \mathfrak{g}_{\min} = \mathfrak{su}(5) \oplus \mathfrak{su}(10) \qquad (\dim = 24 + 99 = 123),
   $$

   forming the full group $[SU(5) \times SU(10)] \times \mathbb{Z}_3$ together with the global phase $\omega I$ ([`ch39-triality-gauge-closure.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-triality-gauge-closure.py)).
2. **Degree-6 potential ($111$ heavy vectors, $288$ scalars) vs. quartic potential ($+24$-dim adjoint)**: locking the color 3-plane to break $[SU(5) \times SU(10)] \times \mathbb{Z}_3$ cleanly back to the Standard Model plus shell triality uses two matrix scalars of distinct discrete charges ($400$ real components). Every quartic potential leaves an inequivalent degenerate star configuration, so a **degree-6 potential** is minimally required: it produces **$111$ massive heavy gauge vectors** (matching all three one-loop logs at $\mu_V = \sqrt{2}\, v g_{\mathrm{low}}$), $111$ Goldstone modes, $1$ singlet phase, and **$288$ massive real scalars** (lightest positive $m^2 = (5 - \sqrt{13}) v^2$), achieving one-loop coupling unification at $v \in (7.5628, 7.5630) \times 10^{14}\;\mathrm{GeV}$ (heavy Yukawa geometric mean ratio $\approx 4.61 \times 10^{-5}$). Insisting on a purely **quartic potential** instead forces minimally **$24$ additional real scalar dimensions**—exactly one real adjoint—bringing the equal-scale massive real scalar count to $312$ ([`ch39-quartic-adjoint-lock.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-quartic-adjoint-lock.py)).

### 9.3.2 Discrete Cubic Anomaly Inflow on $S^2 \times L(3, 1)$ and the 25-State Lifted Shell

Placing this three-family locking model on the explicit four-dimensional spin manifold $S^2 \times L(3, 1)$ (two-sphere times order-3 lens space) with determinant target flux $m$ and external triality flat line $k$ uncovers an unmistakable order-3 mixed chiral anomaly phase:

$$
\mathcal{A}(m, k) = \exp\!\left(-\frac{2\pi i\, m k^2}{3}\right).
$$

As long as the two matrix scalars retain unit target charge, reassigning continuous charges across the three generations cannot cancel this cubic phase (canceling all four spin-cobordism generators with Weyl gauge singlets requires minimally four fields, with full-rank mass at dimension $13$). Equivalently, a $k$-winding determinant vortex string carries $k \bmod 3$ discrete anomaly inflow; the minimal finite group extension trivializing this $3$-cocycle is **$\mathbb{Z}_9$**.

Lifting that order-9 action back onto the 19-point Behrend shell so that labeled vertices carry a faithful permutation projecting back onto the original coordinate 3-cycle $P$ forces the minimal expansion to exactly **25 states—the 25-state lifted Behrend shell**! In [Chapter 14](ch14-624-channels-and-memory-rank.md), two copies of this 25-state lifted register with pole-pair ports generate precisely $25^2 - 1 = 624$ internal channels ($85$ three-cycles and $41$ nine-cycles), welding proton-stability anomaly inflow directly onto the book's scattering and memory-rank frontier.

## 9.4 Spectral vs. Site-Local Grading Tension and the Two-Branch Fork on the Joint Witness {#sec-ch09-spectral-local-fork}

Two closing results sharpen the final verdict on Question 3: a violent tension between spectral and site-local triality, and a clean two-branch fork on the monograph's sharpest joint zero witness.

### 9.4.1 The 1801-Dimensional Clash Between Spectral Grading and Site Locality

Recall from [Chapter 8](ch08-flavor-hierarchy-and-ckm.md) that heavy-to-heavy Yukawa blocks threatened the vacuum energy budget. A sleek solution ([`ch39-heavy-shift-baryon-triality.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-heavy-shift-baryon-triality.py)) shifts baryon triality by $+1 \pmod 3$ on all sixteen heavy shell modes relative to the three light modes (assigning light modes charge $x$, heavy modes $x + 1$, and mirrors opposite charges) via the spectral generator $\omega^x [P + \omega(I - P)]$, where $P = I - D^\dagger (D D^\dagger)^{-1} D$ is the light-space projector. This single mod-3 rule hits three targets at once: it preserves calibrated light Yukawas and CKM, bans every ordinary Yukawa vertex touching a heavy fermion, and forbids low-energy $\Delta B = 1$ proton decay (admitting the anomaly-free continuous lift $X' = 2Y - B + 3L_\tau$).

Yet the geometric bill is staggering. On #22027 and #28325 across all five charges, **every off-diagonal entry of $P$ in the 19-site basis has modulus strictly greater than $4.3 \times 10^{-6}$**: the grading lives purely in **spectral space**, never in site space! Trying to preserve this fixed light-heavy grading simultaneously with nineteen independent site hypercharges under $T$-conjugation explodes the minimal matrix Lie algebra closure to

$$
\mathfrak{su}(19)^5 \oplus \mathfrak{u}(1) \qquad (\dim = 1801)
$$

([Omega replay compendium](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/%CE%A9%E5%A4%8D%E7%AE%97%E8%AF%B4%E6%98%8E.md#%E5%9B%BA%E5%AE%9A%E8%BD%BB%E9%87%8D%E4%B8%89%E9%87%8D%E6%80%A7%E4%B8%8E%E7%AB%99%E7%82%B9%E8%A7%84%E8%8C%83%E8%81%94%E7%BB%9C%E7%9A%84%E6%9C%80%E5%B0%8F%E9%97%AD%E5%8C%85))—and even distinguishing a **single vertex** from common hypercharge already generates dimension $17$ while mixing light and heavy directions!

Similarly, promoting shell triality to a pointwise discrete gauge field on $5^4$ hits mixed $U(2) \times \mathbb{Z}_3$ flux anomalies ($I(S) = 16, J = 32$, [`ch39-local-triality-mixed-flux.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-local-triality-mixed-flux.py), requiring a minimal $SU(5)$ mirror completion $\mathbf{5} \oplus \overline{\mathbf{10}}$ of complex dimension $15$), whereas giving the electroweak Higgs shell charge $1$ reduces the unbroken group to $U(3) \times \mathbb{Z}_3$, where each generation's seven charged components pair with conjugates and admit a gapped measure banning $\Delta B = 1$ even on rough discrete edges ([`ch39-higgs-baryon-triality-measure.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-higgs-baryon-triality-measure.py)).

### 9.4.2 The Two-Branch Fork on Joint Witness #2,306,888,100,085

The sharpest denouement of Volume III unfolds on the joint witness zero **#2,306,888,100,085** ([`ch39-fixed-vacuum-proton-currents.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-fixed-vacuum-proton-currents.py)), whose 105-winding vacuum and flavor alignment are analyzed in full in [Chapter 13](ch13-winding-ladder-and-joint-vacuum.md). Using its own dual clocks, this actual Riemann zero clears all three physical windows, sits within $4.857224 \times 10^{-8}$ of the same-height free 105-winding vacuum, and hits reference $|V_{ub}|^2$ to $+1.328\;\mathrm{ppm}$ and $J$ to $+0.811\;\mathrm{ppm}$. Dressing the dimension-six light-field baryon vertex with those exact same 105-winding weights reveals two stark facts:

- Across the directed-triangle-averaged family, the dimension-six Wilson factor modulus at this zero satisfies the exact lower bound

  $$
  \bigl|W_{\text{proton}}(\gamma_{2{,}306{,}888{,}100{,}085})\bigr| \;\ge\; 0.0314398418770995 \;\approx\; 0.03144.
  $$

- Yet the **exact same 105-winding shell vacuum and tree-level spectrum** admit two incompatible UV interaction extensions:
  - **Orthogonal auxiliary currents**: choosing the two auxiliary currents orthogonal cancels the dimension-six vertex identically and enforces exact baryon triality $\Delta B \equiv 0 \pmod 3$, keeping the proton strictly stable;
  - **Parallel auxiliary currents**: aligning the two auxiliary currents switches on a nonzero $QQQL$ operator with dimensionless Wilson factor at least $\approx 0.03144$, driving proton decay!

No ambiguity remains: even a single actual Riemann zero that simultaneously nails the 105-winding vacuum, all three physical windows, and part-per-million CKM observables does not by itself decide the fate of the proton. That verdict turns purely on whether the underlying UV dynamics align the auxiliary currents orthogonally or in parallel.

The table below consolidates all four proton-protection architectures analyzed in this chapter alongside their exact algebraic, topological, and dynamical prices:

| Proton-protection architecture | Symmetry & lowest baryon operator | Minimal algebra / field / topological price | Open decisive point |
| :--- | :--- | :--- | :--- |
| Abelian UV lift $U(1)_X$ | $X = 3B - 9L_\tau \to \mathbb{Z}_3$; operator dim **$\ge 15$** (**$\ge 18$** with $B - L$) | All 6 anomaly traces $= 0$; general divisibility **$m \mid N_g$**; requires $\nu^c_\tau$ and charge-$9$ condensate | UV generation-dependence mandatory (universal $U(1)$ forces $3q+l=0$, freeing $QQQL$) |
| Full $SU(5)$ + shell triality $F$ | $[SU(5)\times SU(10)]\times\mathbb{Z}_3$; discrete inflow $\exp(-2\pi i m k^2/3)$ | Minimal closure **$\mathfrak{su}(5)\oplus\mathfrak{su}(10)$** ($\dim 123$); degree-6 **$111$ vectors / $288$ scalars** (quartic $+24$-dim adjoint); $\mathbb{Z}_9$ forces **25-state lifted shell** | UV running ceiling of locking scalars and dynamics of the 25-state shell |
| Spectral heavy-shifted triality | $\omega^x[P + \omega(I - P)]$; protects light flavor, bans heavy Yukawa & $\Delta B = 1$ | $|P_{ij}| > 4.3\times 10^{-6}$; 19 site hypercharges blow closure to **$\mathfrak{su}(19)^5\oplus\mathfrak{u}(1)$** (**$\dim 1801$**); pointwise gauging hits $I(S)=16, J=32$ | Structural clash between spectral grading and site-local gauge connections |
| Joint witness #2,306,888,100,085 | Two UV branches sharing exact 105-winding vacuum & tree spectrum | Orthogonal auxiliary currents hold $\Delta B \equiv 0 \pmod 3$; parallel currents activate $QQQL$ with Wilson factor **$\ge 0.03143984 \approx 0.03144$** | Primary partition function must fix current alignment and $c_6$ |

::: {.problem #prob-ou-ch09-proton-uv-selection title="Open Proton Horizon of Question 3: Deciding $c_6$ to All Orders from the Partition Function"}
This chapter has established the nonzero 36-monomial Grassmann expansion of $QQQL$, the dimension-15 (or 18) operator floor under exact baryon triality with anomaly-free $X = 3B - 9L_\tau$ UV completion, the minimal $\mathfrak{su}(5) \oplus \mathfrak{su}(10)$ closure, the 25-state lifted Behrend shell trivializing the $\exp(-2\pi i m k^2/3)$ anomaly inflow via $\mathbb{Z}_9$, and the orthogonal-vs.-parallel current fork on joint witness #2,306,888,100,085. Two decisive problems remain open:

1. **All-orders determination of Planck-scale $c_6$**: deriving the auxiliary current alignment directly from the primary arc-field partition function to decide whether $c_6 = 0$ to all orders or lands on the parallel branch ($\approx 0.03144$ lower bound) with an observable proton lifetime.
2. **Dynamical origin of the 25-state lifted shell**: embedding the 25-state lifted Behrend shell and the $\mathfrak{su}(5) \oplus \mathfrak{su}(10)$ symmetry-locking scalar sector consistently inside the gauge-running and gravitational-cutoff constraints of Questions 1, 2, and 4.
:::

With this boundary drawn, Volume III closes its map of chiral generations, flavor hierarchies, and proton stability. Gauge fields, chiral fermions, Yukawa mixing, and baryon selection rules have each revealed their sharpest walls and fault lines on the 19-point shell. In Volume IV we turn the same unforgiving ruler to the hardest fortress of all—**how discrete arcs generate four-dimensional Einstein gravity, and why dark energy is so unimaginably small**.
