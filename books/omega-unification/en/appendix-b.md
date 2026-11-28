# Appendix B Controlled Glossary, Six-Tier Evidence Ledger, and Live Formalization Statistics

This appendix provides four rapid-reference ledgers for `Omega Unification` (`OMEGA//UNIFY`): a controlled glossary and symbol dictionary across all five volumes, a six-tier epistemic evidence stratification ledger, an index of the `OMEGA//UNIFY` interactive laboratory and nine bespoke static figures, and live build-generated verification statistics compiled from the pinned `trureturing@dev` commit [{commit}](trureturing:). For the upstream replay repository layout, `ShellProjection.lean`, and the 34-script index, see [Appendix A](appendix-a.md).

## B.1 Controlled Glossary and Core Symbol Dictionary {#sec-ou-appb-glossary}

The dictionary below standardizes every recurring technical term across Volumes I–V, recording its exact scope so that model-internal parameters are never confused with first-principles constants:

| Term & Core Symbol | Mathematical Definition and Physical Scope | Primary Chapters |
| :--- | :--- | :--- |
| **19-Point Behrend Shell** $S_{19}$ | Nineteen-site 3-AP-free integer configuration on $x_1^2 + x_2^2 + x_3^2 = 867$, equipped with 135 original edges ($d^2 \le 804$) and 22 independent frequencies | [Ch 1](ch01-behrend-shell-and-frequencies.md) |
| **Dual Quaternion Clocks** $(U, V)$ | Unit-quaternion comparison clocks driven by positive Riemann zero ordinates $\gamma$ through original arc differences $p = (\theta_{724}-\theta_{244})\gamma$ and $q = (\theta_{804}-\theta_{244})\gamma$ (augmented by the shortest arc $v = \theta_{12}\gamma$) | [Ch 2](ch02-quaternion-clocks-and-haar-zeros.md) |
| **Candidate Riemann Zero Window** | Certified intervals of real positive zeros selected by Fejér collision bounds, Landau contours, and arithmetic Schur pivots (e.g., zeros #8236, #8359, #11431, #148341, #226358, and #2,306,888,100,085) | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md), [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **Magnetic Shell Mass Operator** $L_\gamma$ | Nineteen-site graph Laplacian dressed with dual-clock charged edge phases, together with its two-step local extension $\kappa L(L - cI)$ governing heavy thresholds and light-mode gaps | [Ch 4](ch04-gauge-crossings-and-monotone-barriers.md) |
| **Gauge Kinetic Spectral Trace** $S(u), M_1$ | Positive heat-kernel kinetic trace $S(u) = \sum_i e^{-u y_i}$ and first scale moment $M_1 = \sum_i y_i e^{-y_i}$; single-trace balancing enforces the sharp scale floor $r = Q/M > 189$ and the $3.9Q$ perturbative UV wall | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| **Rank-Five Neutral Portal Floor** $d \ge 5$ | Minimum flat gauge-neutral scalar singlet rank required inside the spin-balanced two-loop crossing window to satisfy Higgs mass and quartic stability matching ($d \le 4$ strictly excluded) | [Ch 6](ch06-higgs-portals-and-electroweak-scale.md) |
| **Universal Spectral Gap & Site-Variance Cut** | Torus-wide five-charge three-light-mode gap $(8.685, 9.6)$ paired with the intrinsic site-variance min-cut $T = 9 + (1-\delta)^2$ (every fixed-cutoff triple-window zero's gap contains $[9, 10.19]$) | [Ch 7](ch07-chiral-three-generations.md) |
| **Cyclic Breaking & 42-Loop CP Floor** | Coordinate cycle $P:(x,y,z)\mapsto(y,z,x)$ forces a monomial CKM; empirical mixing requires $\|[T,X]\|_{\mathrm{HS}} > 0.0414$, and geometric triangle loops require exactly 42 cycles to reach reference CP violation | [Ch 8](ch08-flavor-hierarchy-and-ckm.md) |
| **Six-Face Flavor Coordinate** $c$ | Shell angular flavor coordinate forced into $|c| > 0.9404240$ by [2]+[4]; its 10-bit dyadic integer code `1011` (decimal) excludes monotone global vacua while 9-bit decimal code `505` admits a counterexample | [Ch 8](ch08-flavor-hierarchy-and-ckm.md), [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **Baryon Triality** $\mathbb{Z}_3$ | Residual discrete symmetry $X = h(2Y-B) + q(3B) \pmod 3$ enforcing $\Delta B \in 3\mathbb{Z}$ on local light operators and raising leading baryon-number violation to dimension 15 (dimension 18 preserving $B-L$) | [Ch 9](ch09-proton-stability-and-baryon-triality.md) |
| **Simplicial Regge Action & Hinge Load** | Deficit-angle sum $K = A(2\pi N_2 - 10\theta N_4)$ and hinge coordination $q_h$ on equilateral 4-simplices; recovers spin-2 Fierz–Pauli kinetics on $g = I - J/5$ while exposing the conformal-mode divergence | [Ch 10](ch10-regge-gravity-and-spin2.md) |
| **Four-Layer Vacuum Stencil** | Four-layer heavy heat-kernel cancellation scheme hitting a $0.2\%$ curvature window while remaining sensitive to cosmological-constant fine-tuning and external scale calibration | [Ch 11](ch11-induced-gravity-and-dark-energy.md) |
| **Shared Arithmetic Clock** $F(j)$ | Quadratic resolvent readout $F(j) = \langle s, (I + j^2 K)^{-1}s\rangle$ for one PSD operator $K$; at the baseline scale the six exact inputs give $p(B)>99.931\%$, and their 44-bit cells fix the seventh 35-bit code at `32071996606` | [Ch 12](ch12-shared-arithmetic-clock.md) |
| **529-Triangle Action & Winding Ladder** | Weighted dual-clock variational action over the 529 shell triangles, climbing thresholds 19, 21, 27, 31, 36 to the universal 105-winding floor while monotone weights fail globally by $> 1/4$ | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **624 Internal Channels & Denominator-Three Shell** | 624 internal channels built from signed nearest-chord comparisons at shell poles, paired with the 76-site denominator-three relay sphere realizing 9-step returns and 17-beat local reflection feedback | [Ch 14](ch14-624-channels-and-memory-rank.md) |
| **Auxiliary Memory Rank Staircase** | Minimum auxiliary dimension needed to match the full three-clock response on the 19 visible sites as old-shell counterterm squared-chord cutoff $D$ widens: $38 \to 29\text{--}31 \to 26\text{--}27 \to 25\text{--}26 \to 24 \to 23 \to 21 \to 20 \to 19$ ($C_3$-symmetric sharp cutoff $D = 392$) | [Ch 14](ch14-624-channels-and-memory-rank.md) |

For rapid equation lookup across volumes, the table below summarizes recurring mathematical symbols:

| Symbol | Exact Meaning and Dimensional Role | Primary Chapters |
| :--- | :--- | :--- |
| $\theta_j = \arccos(1 - j/1734)$ | Central arc angle of an original chord with squared length $j$ on the radius-$\sqrt{867}$ shell | [Ch 1](ch01-behrend-shell-and-frequencies.md), [Ch 2](ch02-quaternion-clocks-and-haar-zeros.md) |
| $\gamma_n$ | Ordinate of the $n$-th positive Riemann zero (counted with multiplicity) | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) |
| $r = Q/M,\;\tau = \log(Q/\mathrm{TeV})$ | Ratio of crossing scale to base shell scale, and logarithmic running length above $1\,\mathrm{TeV}$ | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| $W_L^{\log}, W_R^{\log},\;\alpha_G^{-1}$ | One-loop logarithmic exposures of heavy left/right scalar towers and unified inverse gauge coupling | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| $B \subset (0, \infty)$ | Union of the three height bands concentrating $>99.931\%$ of shared-clock spectral weight | [Ch 12](ch12-shared-arithmetic-clock.md) |
| $T_j,\;F(j)$ | Reference arithmetic times from Riemann $\xi$ and $j$-th quadratic-resolvent clock readout | [Ch 12](ch12-shared-arithmetic-clock.md) |
| $k, d$ | Center even multiplier ($k = 32$) and chord denominator ($d = 724$) at the joint witness | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| $D$ | Squared-chord-distance cutoff for local old-shell counterterms ($56, 224, 296, 392, 544, 1152, 1376, 1568$) | [Ch 14](ch14-624-channels-and-memory-rank.md) |

## B.2 Six-Tier Epistemic Evidence Stratification Ledger {#sec-ou-appb-epistemic-ledger}

Every theorem, interval bound, effective construction, and open target across the monograph is strictly assigned to one of six epistemic tiers governed by a **strict non-escalation rule**: neither Arb ball enclosures, nor standalone upstream `Init` replays, nor external RH formalizations automatically elevate an `ARGUED`, `NUM`, `MODEL`, or `OPEN` claim into a pinned `LEAN ✓` frozen theorem.

The following spectral example separates an exact calculation from an independent positivity proof: the Cayley criterion in [Chapter 3, Section 3.1](ch03-riemann-zeros-fejer-and-landau.md#sec-ou-3-1) admits a finite negative-index test, but the matrix itself is still built from the actual zeros.

::: {.theorem #thm-ou-appb-mirror-gram-inertia title="Gram Inertia of the Finite Mirror-Odd Sector" lean="D5/S3/Midline/Cayley/FiniteMirrorKreinGramInertia.canonical_zeta_finite_mirror_gram_inertia"}
Use the library's parameter-free canonical presentation `zetaZeroData`, with distinct nontrivial zeros $\rho_n$ and analytic multiplicities $m_n>0$. The same-height mirror permutation $\sigma$ preserves multiplicities and satisfies $\rho_{\sigma(n)}=1-\overline{\rho_n}$. For every $T\in\mathbb R$, define

$$
\begin{aligned}
W_T&=\{n:|\rho_n-\tfrac12|\le T\},\\
R_T&=\{n\in W_T:n<\sigma(n)\},\\
\kappa_T&=\sum_{n\in R_T}m_n.
\end{aligned}
$$

On the standard basis of $H=\ell^2(\{(n,k):k<m_n\};\mathbb C)$, set $J e_{n,k}=e_{\sigma(n),k}$ and $[x,y]_J=\langle x,Jy\rangle$. For $n\in R_T$ and $0\le k<m_n$, take $v_{n,k}=e_{n,k}-e_{\sigma(n),k}$. Their actual Gram matrix $G_T=([v_{n,k},v_{r,l}]_J)$ satisfies

$$
\begin{aligned}
G_T&=-2I,\\
n_-(G_T)&=\kappa_T,\\
n_-(G_T)>0
&\ \Longleftrightarrow\
\exists n\in W_T:\operatorname{Re}\rho_n\ne\tfrac12.
\end{aligned}
$$

Here $n_-$ counts negative eigenvalues with multiplicity, and the matrix is indexed by the $\kappa_T$ mirror-odd vectors. The window is a spectral-radius window $|\rho-\tfrac12|\le T$, rather than a height window restricting only $|\operatorname{Im}\rho|$.
:::

::: proof
Choose one representative from each nonfixed two-element mirror orbit. Different representatives and their mirrors occupy disjoint standard-basis coordinates, and distinct multiplicity copies of the same zero are also orthogonal. Hence the ordinary Hilbert Gram matrix of these vectors is $2I$, while $Jv_{n,k}=-v_{n,k}$ makes the actual mirror Gram matrix $-2I$. Each selected orbit contributes exactly $m_n$ negative eigenvalues. Mirror fixedness is exactly critical-line location, and analytic multiplicities are positive, giving the final equivalence. The full proof is checked by the Lean kernel.
:::

The count keeps the existence of off-critical zeros conditional. Combining it with the external formalized RH fact cited in Chapter 3 gives $\kappa_T=0$ for every $T$ (a manual implication combining the two evidence tiers, `ARGUED`); the kernel theorem above supplies the exact inertia formula.

When a Hermitian form is observed through finitely many resolvent directions, what ensures that no negative direction is missed? A sufficient guarantee is that the directions span the whole space being tested. Start with a two-point calculation (`ARGUED`): support points $x_0=0,x_1=1$ and center $z=-1$ give $C=\begin{pmatrix}1&1\\1/2&1/4\end{pmatrix}$ from two successive reciprocal powers, with $\det C=-1/4\ne0$. The two directions are independent; the same Vandermonde mechanism controls the general case.

::: {.theorem #thm-ou-appb-cauchy-jet-inverse title="One-Center Cauchy Jet Inverse at Distinct Support Points" lean="D5/S3/Analytic/GoldenTomography/CauchyFeatureRightInverse.cauchy_feature_right_inverse"}
Let $n\in\mathbb N$, let the complex support points $x_0,\ldots,x_{n-1}$ be pairwise distinct, and let $z\in\mathbb C$ satisfy $x_a\ne z$ at every index. Define the square matrix

$$
C_{ak}=(x_a-z)^{-(k+1)},\qquad 0\le a,k<n,
$$

and let $R$ be the matrix inverse specified by the library's `cauchyJetFeatureRightInverse`. Then

$$
CR=RC=I_n,
$$

and the map $v\mapsto Cv$ is injective.
:::

::: proof
Put $r_a=(x_a-z)^{-1}$. Then $C=\operatorname{diag}(r_a)V$, where $V_{ak}=r_a^k$. Avoiding the center makes every $r_a\ne0$, and translation followed by inversion preserves distinctness of the support points. Thus both the diagonal and Vandermonde factors are invertible. The matrix inverse gives both inverse identities and injectivity of the analysis map. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ou-appb-cauchy-source-rank title="Jets Separate Spectral Values; Sources Cover Multiplicity Spaces"}
The following operator interpretation and inertia consequence are manual derivations (`ARGUED`). Under the theorem's hypotheses, in dimension $n$ take a self-adjoint operator $K=\operatorname{diag}(x_a)$ with simple spectrum, and suppose a source vector $s$ has every coordinate $s_a\ne0$. The matrix with columns $(K-zI)^{-(k+1)}s$ is $B=\operatorname{diag}(s_a)C$, so $B^{-1}=R\operatorname{diag}(s_a^{-1})$. For any Hermitian form $Q$, the identity $v^*B^*QBv=(Bv)^*Q(Bv)$ and bijectivity of $B$ give $n_\pm(B^*QB)=n_\pm(Q)$: every positive or negative definite subspace, with its dimension, transfers in both directions through this bijection.

With repeated eigenvalues, distinctness applies only to different spectral values; multiplicity copies cannot be treated as distinct support points. Precisely, let a self-adjoint operator $K$ on a finite-dimensional complex inner-product space have $q$ distinct eigenvalues with spectral projections $P_\lambda$, take sources $s_1,\ldots,s_p$, and assume $z\notin\operatorname{spec}K$. Then

$$
\begin{aligned}
\mathcal O&=\operatorname{span}\{(K-zI)^{-(k+1)}s_j:0\le k<q,\ 1\le j\le p\}\\
&=\bigoplus_{\lambda\in\operatorname{spec}K}
\operatorname{span}\{P_\lambda s_j:1\le j\le p\}.
\end{aligned}
$$

Every filtered vector is a linear combination of the projected sources on the right. Conversely, for each fixed source the inverse of the $q\times q$ jet matrix recovers each $P_\lambda s_j$ separately. Full observation therefore requires, and is equivalent to, the projected sources spanning every eigenspace. One source supplies at most one direction in each eigenspace; increasing the jet order cannot supply missing multiplicity directions.

The scheme uses successive reciprocal powers at one center, equivalently normalized derivatives of the resolvent with respect to $z$. It makes no claim for arbitrary sample lists, and a few scalar clock readings in [Chapter 12](ch12-shared-arithmetic-clock.md#sec-ch12) do not by themselves supply these vectors or the whole Gram matrix. Invertibility provides no uniform error amplification bound and no control of infinite spectral tails. An independent RH spectral route still needs an arithmetic or geometric positivity construction and identification of the complete zero spectrum; checks on finitely many windows cannot replace control for every $T$.
:::

With finite-dimensional recoverability distinguished from independent positivity, the table below assigns each evidence tier its own responsibility.

| Evidence Tier & Label | Verification Mechanism & Provenance | Logical Boundary & Warrant | Representative Coverage & Pointers |
| :--- | :--- | :--- | :--- |
| **Tier 1 — Lean 4 Frozen Anchors** (`LEAN ✓`) | Frozen declarations on `the-omega-institute/trureturing@dev` at pinned commit [{commit}](trureturing:) (spanning both zero-axiom `OmegaInit`/`OmegaMath` foundations and classical `Mathlib` gauge anchors) | Kernel-checked and frozen under `Golden/Frozen/state/`; live statistics in [§B.4](#sec-ou-appb-live-stats) separate axiom-free (`axioms: []`), recorded standard-axiom, and unrecorded-axiom-metadata frozen declarations | Rational projective overlap and Cayley orthogonal rotations, $\pi$-free Haar moments and Peter–Weyl orthonormality, rational Lagrange–Gram and Schur minimization, Hurwitz $F_3$ adjoint injectivity, and norm-$5$ Hecke bounds |
| **Tier 2 — External Formalized RH/GRH Fact** (External Formalization) | Joint November 21, 2026 confirmation by the Lean FRO and Mathlib Initiative of [Alpöge's formalized proof of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) | Cited strictly as an external formalized mathematical boundary; separated cleanly from our finite-height arithmetic computations and lending zero endorsement to physical matching hypotheses | Critical-line zero foundation in [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) and finite-height arithmetic clock enclosures in [Ch 12](ch12-shared-arithmetic-clock.md) |
| **Tier 3 — Written Proofs & Literature Bounds** (`ARGUED`) | Author- and reviewer-checked algebraic, analytic, and combinatorial proofs (archived in the master replay record and 9 thematic dossiers) plus bounded literature references | Carries no `LEAN ✓` badge; requires explicit hypotheses and falsifiable counterexamples, with purely algebraic cores remaining candidates for future Lean formalization | Single-trace $r \le 189$ convexity exclusion ([Ch 5](ch05-kinetic-trace-and-uv-ceilings.md)), cyclic-breaking $\|[T,X]\|_{\mathrm{HS}} > 0.0414$ and 42-loop CP floor ([Ch 8](ch08-flavor-hierarchy-and-ckm.md)), Gauss–Radau and Bernstein moment bounds ([Ch 12](ch12-shared-arithmetic-clock.md)), and PDG experimental inputs |
| **Tier 4 — Computational Certificates & Live Numerical Diagnostics** (`NUM`) | Fail-fast `Fraction` / `python-flint` (Arb, `fmpq_mat`) scripts across the 1,785-file replay archive (`experiments/ch39-omega-research/replay/` in `trureturing-experiments`), `Init`-replayed `ShellProjection.lean` (`rfl`), and explicitly labeled live numerical calculations in `OMEGA//UNIFY` | Exact rational, Arb, and `rfl` replay certificates carry zero floating-point drift strictly over stated input intervals and cutoffs; live sandbox diagnostics (such as finite-grid double-precision Jacobi spectra) explicitly disclose their precision and sampling limits; standalone `ShellProjection.lean` resides here rather than inside `trureturing@dev` frozen totals | Squared-radius-17 nine-point shell compression ([Appendix A §A.2](appendix-a.md#sec-ou-appa-shell-projection)), 35-bit seventh-time code `32071996606` ([Ch 12](ch12-shared-arithmetic-clock.md)), $> 1/4$ monotone exclusion and 105-winding witness ([Ch 13](ch13-winding-ladder-and-joint-vacuum.md)), and the $38 \to 19$ auxiliary-rank staircase ([Ch 14](ch14-624-channels-and-memory-rank.md)) |
| **Tier 5 — Model-Internal Effective Constructions** (`MODEL`) | Explicit effective constructions specifying every auxiliary representation, potential, scale, and weight input (accounting for the **4/4** model-internal witnesses) | Never presented as zero-fit derivations; every construction records its free inputs and fine-tuning sensitivity alongside its numerical fit | $r = 400$ two-loop crossing and rank-5 Higgs portal ([Ch 5–6](ch05-kinetic-trace-and-uv-ceilings.md)), 54-mode matrix Higgs flavor fit and $\mathrm{U}(1)_X$ triality completion ([Ch 8–9](ch08-flavor-hierarchy-and-ckm.md)), four-layer curvature balance ([Ch 11](ch11-induced-gravity-and-dark-energy.md)), and 100-parameter 105-winding vacua ([Ch 13](ch13-winding-ladder-and-joint-vacuum.md)) |
| **Tier 6 — First-Principles Open Roadmap** (`OPEN`) | The **0/4** core unification derivations still absent from a single master connection without post-hoc fitting | Explicitly preserves unproved status without verification links, providing crisp falsifiable acceptance criteria for future work | Deriving heavy thresholds and the electroweak scale, selecting the site-variance cut and building 4D interacting chiral generations, deriving a shared flavor action and dynamical proton protection, deriving $G_N$ and dark energy, and finding a natural non-monotone weight-selection law ([Ch 15](ch15-unified-verdict-and-open-roadmap.md), [Coda](coda.md)) |

### B.2.1 Evidence in a Spectral Bridge: Mirror Conservation and Positivity {#sec-ou-appb-mirror-unitarity}

[The Cayley criterion in Chapter 3](ch03-riemann-zeros-fejer-and-landau.md#sec-ou-3-1) turns the critical-line condition into a unit-circle condition. The functional equation also supplies the same-height mirror $\rho\mapsto1-\bar\rho$, but which inner product does mirror conservation preserve? This question makes the ledger's evidence boundaries concrete in a spectral model that admits a direct calculation.

Supply the library's full `ZeroData` $Z$, including distinct zeros $\rho_n$, exact analytic multiplicities $m_n$, exhaustiveness, both symmetries, and local finiteness. Put $I_Z=\{(n,k)\in\mathbb N^2:k<m_n\}$ and $H_Z=\ell^2(I_Z;\mathbb C)$. The same-height mirror preserves multiplicity, inducing a coordinate involution $\sigma$ and the self-adjoint involutive isometry $(J_Z\psi)(v)=\psi(\sigma v)$. Write $[\psi,\phi]_Z=\langle\psi,J_Z\phi\rangle$, and let $C_Z$ be the bounded diagonal Cayley operator with coefficients $c_n=(\rho_n-1)/\rho_n$.

::: {.theorem #thm-ou-appb-mirror-j-unitarity title="Mirror Cayley Conservation and Strict Negative Directions" lean="D5/S3/Midline/Cayley/CanonicalZetaCayleyJUnitary.zeroCayleyOperator_j_unitary D5/S3/Midline/Cayley/CanonicalZetaMirrorFundamentalSymmetry.mirror_odd_vector_strictly_negative"}
For every such `ZeroData` $Z$, with no additional RH hypothesis,

$$
C_Z^*J_ZC_Z=J_Z.
$$

If a coordinate $v\in I_Z$ satisfies $\sigma v\ne v$, its standard unit vector $e_v$ gives a mirror-odd vector $w_v=e_v-J_Ze_v$ satisfying

$$
\operatorname{Re}[w_v,w_v]_Z<0.
$$
:::

::: proof
If $c$ is a coordinate's coefficient and $c'$ its mirror coefficient, then $c'=1/\bar c$, so $\bar c c'=1$; pairing coordinates and summing gives the operator identity. When $\sigma v\ne v$, we have $w_v\ne0$ and $J_Zw_v=-w_v$, hence $\operatorname{Re}[w_v,w_v]_Z=-\|w_v\|^2<0$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ou-appb-j-unitary-not-unitary title="Indefinite Conservation Does Not Ensure Ordinary Unitarity"}
The following is a direct two-dimensional calculation (`ARGUED`). On $\mathbb C^2$, take

$$
J=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
C=\begin{pmatrix}2&0\\0&1/2\end{pmatrix}.
$$

Multiplication gives $C^*JC=J$, whereas $C^*C=\operatorname{diag}(4,1/4)\ne I$. The vector $w=(1,-1)$ satisfies $\langle w,Jw\rangle=-2$. These matrices only test the proposed implication from $J$-unitarity to ordinary unitarity; they are not asserted to arise from actual $\zeta$ zeros.
:::

Even when the observation vectors span the whole space, the choice of linear combinations to test still matters. The right-inverse condition in [@thm-ou-ch12-observation-inertia] ensures that the full Gram matrix preserves inertia. Testing only its two-by-two principal submatrices for a fixed observation list can miss a negative direction requiring all ports together.

::: {.example #ex-ou-appb-collective-gram-negativity title="Every Proper Principal Submatrix Can Be Positive Definite While the Whole Is Indefinite"}
The following is a finite-dimensional manual derivation (`ARGUED`). Start with three ports:

$$
G_3=\begin{pmatrix}1&-3/4&-3/4\\-3/4&1&-3/4\\-3/4&-3/4&1\end{pmatrix}.
$$

Every two-by-two principal submatrix has the strictly positive eigenvalues $1/4,7/4$. Yet $\mathbf1_3=(1,1,1)^T$ satisfies $G_3\mathbf1_3=-\mathbf1_3/2$, so $\mathbf1_3^*G_3\mathbf1_3=-3/2<0$. A joint variation of three ports reveals the negative direction missed by every pairwise test.

This can occur at any number of ports. Let $n\ge3$ be an integer, write $\mathbf1_n=(1,\ldots,1)^T$, and choose a real $a$ with

$$
\frac1{n-1}<a<\frac1{n-2},\qquad
G_n=(1+a)I_n-a\mathbf1_n\mathbf1_n^*.
$$

For any nonempty principal submatrix on $m$ ports, $1\le m\le n$, split the space into the direction $\mathbf1_m$ and its orthogonal complement. This gives the eigenvalues

$$
1-(m-1)a\quad\text{(multiplicity }1\text{)},\qquad
1+a\quad\text{(multiplicity }m-1\text{)}.
$$

Thus every nonempty proper principal submatrix is positive definite, while the full matrix has exactly one negative eigenvalue, $1-(n-1)a$. The open interval above is also the exact parameter range for these two properties together: the common direction of all ports requires the strict lower bound, and the common direction of $n-1$ ports requires the strict upper bound.

The matrix can also be realized as the actual indefinite Gram matrix of observation vectors spanning the whole space. Set

$$
\begin{aligned}
P&=\frac{\mathbf1_n\mathbf1_n^*}{n},&J&=I_n-2P,\\
B&=\sqrt{1+a}\,(I_n-P)+\sqrt{(n-1)a-1}\,P.
\end{aligned}
$$

Since $P=P^*=P^2$, we have $J=J^*$ and $J^2=I_n$. Both coefficients of $B$ on the two orthogonal subspaces are strictly positive, so $B$ is invertible. For the observation vectors $b_j=Be_j$ and the form $[x,y]_J=x^*Jy$, multiplication gives

$$
(b_i^*Jb_j)_{ij}=B^*JB
=(1+a)(I_n-P)-((n-1)a-1)P=G_n.
$$

The missing ingredient is therefore a test of joint port positivity, even with every source direction present. These submatrices select sublists of the fixed observation vectors; they do not test arbitrary linear combinations of those vectors. For any fixed limit $r\ge2$, choosing $n=r+1$ gives positive definite principal submatrices on every set of at most $r$ ports while the whole matrix is indefinite. Kernel positivity in a finite window requires control of the full quadratic form for arbitrary coefficients. These are algebraic models, with no claim to arise from actual zeros or to alter the external RH fact cited in Chapter 3.
:::

Detecting a negative direction also requires a precision budget: a finite observation map can be algebraically invertible while its inverse amplifies errors as two support points approach each other. The following model separates recovery of every direction from reliable certification of one negative direction. It uses the full sesquilinear Gram readings, rather than the few scalar clock readings of [Chapter 12](ch12-shared-arithmetic-clock.md).

::: {.example #ex-ou-appb-two-node-recovery-precision title="Recovery Precision as Two Support Points Approach"}
Everything below is a manual derivation (`ARGUED`); the support points and matrices form an algebraic model with no specified actual zeros. Take $h>0$ and $u=1+h$. At center $0$, read reciprocal powers one and two at support points $1,u$. With the nodes and readout scale fixed, an unknown complex amplitude vector $x\in\mathbb C^2$ gives readings $y=A_hx$, where

$$
\begin{aligned}
A_h&=\begin{pmatrix}1&u^{-1}\\1&u^{-2}\end{pmatrix},
&\det A_h&=-\frac{h}{u^2},\\
A_h^{-1}&=\frac1h\begin{pmatrix}-1&u\\u^2&-u^2\end{pmatrix},
&\|A_h^{-1}\|_{\infty\to\infty}&=\frac{2u^2}{h}.
\end{aligned}
$$

Multiplication on both sides checks the inverse. Its absolute row sums are $(1+u)/h$ and $2u^2/h$, with the latter larger since $u>1$. For readout error $\|e\|_\infty\le\varepsilon$, where $\varepsilon\ge0$,

$$
\|A_h^{-1}(y+e)-x\|_\infty\le\frac{2u^2}{h}\varepsilon.
$$

The error $e=(\varepsilon,-\varepsilon)$ attains equality, so this fixed readout scale admits no amplification bound uniform in $h$.

Now take the indefinite form $J_0=\operatorname{diag}(1,-1)$. The observation vectors $A_h^*e_1,A_h^*e_2$ have Gram matrix $K_h=A_hJ_0A_h^*$, where $e_1,e_2$ are the standard basis vectors. Put

$$
\begin{aligned}
c_h&=(A_h^{-1})^*e_2=\frac{u^2}{h}(1,-1),\\
c_h^*K_hc_h&=-1.
\end{aligned}
$$

Suppose the Hermitian readings $\widehat K_h=K_h+E$ have a certified entrywise error bound $|E_{ij}|\le\eta$, where $\eta\ge0$. The triangle inequality gives

$$
\begin{aligned}
|c_h^*E c_h|&\le\eta\Bigl(\sum_i|(c_h)_i|\Bigr)^2
=\frac{4u^4}{h^2}\eta,\\
\eta<\frac{h^2}{4u^4}&\quad\Longrightarrow\quad c_h^*\widehat K_hc_h<0.
\end{aligned}
$$

The error $E=\eta\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ attains this error bound and makes this witness's quadratic form exactly zero at the threshold. Thus the strict threshold is sharp for the entrywise error guarantee of this fixed witness; it is not asserted to limit every method for detecting negative directions. Exact invertibility holds for every $h>0$, while the Gram error allowed by this certificate shrinks quadratically as $h\to0$. Node errors and infinite spectral tails are not controlled here.
:::

Thus the mirror conservation supplied by the functional equation allows positive and negative directions to balance. Chapter 3's unit-circle condition instead requires each Cayley coefficient itself to have modulus $1$. An independent spectral proof using mirror conservation still needs an additional positivity argument or the corresponding ordinary-unitarity condition. The external RH proof can support the critical-line conclusion, but this mirror identity alone supplies no independent Hilbert–Pólya operator construction.

## B.3 Interactive Laboratory and Nine-Figure Visual Media Index {#sec-ou-appb-media-map}

The monograph is paired with one five-card interactive laboratory, **`OMEGA//UNIFY`** (directory ID `behrend-unification-lab`), and **9 bespoke bilingual static figures** generated from semantic scripts under `books/omega-unification/figures/` following the repository's unified color-role contract (green and blue reserved for Lean-verified and axiom-free anchors, purple for written proofs, computational certificates, and proved sharp obstructions, amber for active model choices, and red reserved strictly for open problems). The first table indexes all five interactive experimental cards:

| Laboratory Code & Preset Card ID | Interactive Subject & Live Readouts | Embedded Chapter | Full Workbench |
| :--- | :--- | :---: | :---: |
| **`OMEGA//UNIFY`** · `shell-clocks` | 3D 19-point Behrend shell ($r^2 = 867$, 135-edge underlying graph), highlighted chord classes, and coupled dual quaternion clock phases | [Ch 1](ch01-behrend-shell-and-frequencies.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `three-gen-gap` | Five-charge mass spectra swept across dual clock angles, contrasting the site-variance cut $T$, fixed cutoff $9$, and torus-wide universal gap $(8.685, 9.6)$ | [Ch 7](ch07-chiral-three-generations.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `clock-bands` | Three-band spectral weight concentration ($>99.931\%$) under six clock inputs and 35-bit seventh-code separation | [Ch 12](ch12-shared-arithmetic-clock.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `winding-ladder` | 529-triangle dual-clock winding ladder ($19 \to 21 \to 27 \to 31 \to 36 \to 105$) and the $> 1/4$ monotone gap | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `memory-rank` | Three-clock minimum auxiliary rank staircase ($38 \to 19$) versus old-shell squared-chord cutoff $D$ and the $D = 392$ symmetric floor | [Ch 14](ch14-624-channels-and-memory-rank.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |

The second table maps all **9 bespoke bilingual static figures** across the Prelude and Volumes I–V:

| No. | Static Figure ID | Chapter | Visual Subject & Core Mathematical Boundary |
| :---: | :--- | :---: | :--- |
| 1 | `ou-five-volumes` | [Prelude](README.md) | Five-volume cartography from the 19-point Behrend shell and Riemann zeros through Volumes I–V to `4/4` model witnesses and `0/4` zero-fit derivations |
| 2 | `ch01-behrend-shell` | [Ch 1](ch01-behrend-shell-and-frequencies.md) | Unit-sphere projection of the 19-point Behrend shell, pole $(17, 17, 17)$, six cyclic triples, shortest chord $12$, and clock chords $724, 804$ |
| 3 | `ch03-zero-window-landscape` | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) | Zero #11431 midpoint isolation vs. #11628, Fejér fourth-moment shares, and three log-scale harmonic phase-deficit windows |
| 4 | `ch05-gauge-threshold-boundaries` | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) | Scalar threshold exclusion $r \le 189$, crossings at $r = 400$ and spin-balanced $r \approx 8.53$, and perturbative UV ceilings ($3.9Q, 14Q, 20Q, 30Q$) |
| 5 | `ch07-three-generation-gap` | [Ch 7](ch07-chiral-three-generations.md) | Torus-wide five-charge single-step three-mode gap $(8.685, 9.6)$, common cutoff $9$, and cyclic characters $(1, \omega, \omega^2)$ |
| 6 | `ch11-vacuum-balance-sensitivity` | [Ch 11](ch11-induced-gravity-and-dark-energy.md) | Logarithmic curvature ladder from Planck scale to $10^{-122}$, fractional UV sign-flip thresholds, and the four-layer $(-1, 3, -3, 1)$ cancellation stencil |
| 7 | `ch12-arithmetic-clock-bands` | [Ch 12](ch12-shared-arithmetic-clock.md) | Three-band spectral concentration ($>99.931\%$) and the 35-bit seventh-time split (`32071996606` vs. `32071992476`) |
| 8 | `ch13-winding-threshold-ladder` | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) | 529-triangle winding thresholds ($\le 18, 19, 21, 27, 31, 36, 105$), $> 1/4$ nonincreasing-weight gap, and joint witness `#2,306,888,100,085` |
| 9 | `ch14-memory-rank-staircase` | [Ch 14](ch14-624-channels-and-memory-rank.md) | Minimum auxiliary memory rank $38 \to 19$ against squared-chord cutoff $D$, $D = 392$ $C_3$-symmetric floor, and $D = 512$ clock jump |

## B.4 Live Build-Generated Formalization Statistics {#sec-ou-appb-live-stats}

Under the repository's source-only contract, authoritative counts of theorems, environments, and unique frozen declarations are never hand-maintained in prose. The summary table below is compiled automatically at build time from `trureturing.lock.json` at the pinned `trureturing@dev` commit [{commit}](trureturing:):

::: {.stats src="summary"}
:::

The complete index of frozen declarations cited across text and media, with direct line-level source links at the pinned commit, is generated on demand during compilation; inclusion in the index never alters a claim's epistemic tier.

::: {.stats src="declarations" display="link" format="html"}
Open the generated declaration index
:::

When consulting these compiled statistics, keep the boundary between indexing and proof responsibility explicit:

::: {.remark #rem-ou-appb-epistemic-boundary title="Boundary Between Live Statistics and Mathematical Warrant"}
The live summary and generated declaration index accurately report every machine-checked declaration, axiom classification, and environment count cited at the pinned `trureturing@dev` commit. Neither index membership nor interactive visualization upgrades an `ARGUED`, `NUM`, `MODEL`, or `OPEN` claim into a `LEAN ✓` theorem. Likewise, the upstream Python / Arb scripts and standalone `Init`-replayed `ShellProjection.lean` indexed in [Appendix A](appendix-a.md) belong to Tier 4 (`NUM`) rather than the frozen `trureturing@dev` totals; always verify each claim against its chapter hypotheses and stated boundaries.
:::
