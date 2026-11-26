# Chapter 8 Cyclic Symmetry Breaking, Yukawa Hierarchy Obstructions, and Quark Mixing Reconstructions {#sec-ch08}

> "The symmetry that marshals three generations into neat ranks must die before masses and mixings can be born—yet smashing it carelessly only sends one headlong into wall after wall of exact no-go theorems."

If [Chapter 7](ch07-chiral-three-generations.md) was the triumphant overture of the 19-point Behrend shell—where the coordinate 3-cycle locks three light modes of every hypercharge into tidy symmetry—this chapter delivers the harsh inversion of the first half of Question 3: **where do fermion mass hierarchies and quark mixing actually come from?**

Nature's flavor spectrum is anything but gentle. At $1\;\mathrm{TeV}$, the top-to-bottom mass ratio exceeds $40$, the charm-to-top ratio sinks to $0.00361$, the up-quark to charged-lepton norm ratio exceeds $84.98$, and the CKM matrix $V_{\mathrm{CKM}}$ sits neither at the identity nor in a real-phase corner. Feeding those unyielding experimental numbers back into the 19-point shell triggers a ruthless elimination round: unbroken $\mathbb{Z}_3$ symmetry traps CKM as a permutation matrix; single light-Higgs local vertices, arbitrary site-density potentials, seven-orbit nonnegative weights, and one-leg transport vertices fall one by one to interval certificates; and three-leg eight-coefficient transport—while capable of fitting all nine charged-fermion masses and full CKM on a single zero—triggers catastrophic heavy-block couplings, vacuum quartic-trace explosions, and a three-zero incompatibility wall.

Out of that cleared terrain rise the genuine positive reconstructions: the six-triangle electroweak-singlet phase, the 28-winding mirror triangle, the two-boundary-site five-pulse protocol, and the finite rational response $(I + T^{16})^{-1}$ matching seven zeros to $10^{-11}$. Anchoring the whole chapter are two Lean-frozen theorems—rational Cayley orthogonality and Gram unitary extension—which frame unitary folding dimension floors, four-step rational Newton folding, and the remarkable rigidity of fixed matrices across multiple zeros.

## 8.1 Exact Cyclic-Symmetry Obstructions and Quantitative Breaking Floors {#sec-ch08-cyclic-obstruction}

Before testing any specific Yukawa mechanism, we write down the exact geometric law governing the shell's cyclic symmetry.

::: {.definition #def-ou-ch08-cyclic-rotation title="19-Point Coordinate Cyclic Shift, Six Three-Point Orbits, and Hilbert-Schmidt Commutator Norm"}
Define the coordinate cyclic shift $P : (x, y, z) \mapsto (y, z, x)$ on the 19-point Behrend shell. It fixes the pole $(17, 17, 17)$ uniquely and partitions the remaining eighteen vertices into **six disjoint three-point orbits**. On the three-dimensional left-handed quark generation space, let the phase-dressed order-3 shift operator act by

$$
T e_i = z_i e_{i + 1 \bmod 3}, \qquad |z_i| = 1 \quad (i = 0, 1, 2),
$$

so that $T^3 = (z_0 z_1 z_2) I$, whose three eigenvalues are the three distinct cube roots of a single unimodular phase. For any $3 \times 3$ complex matrix $X$, define the cyclic pinching projection

$$
\mathcal{E}(X) := \frac{1}{3}\bigl(X + T X T^* + T^2 X T^{*2}\bigr).
$$

In an eigenbasis of $T$, $\mathcal{E}(X)$ extracts the diagonal entries of $X$; since the chord distance between any two distinct cube roots of unity equals $\sqrt{3}$, the Hilbert-Schmidt commutator norm satisfies the exact identity

$$
\|[T, X]\|_{\mathrm{HS}} = \sqrt{3}\,\|X - \mathcal{E}(X)\|_{\mathrm{HS}}.
$$

:::

Two structural obstructions drop out immediately ([cyclic-rotation and mixing note](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-%E4%B8%89%E4%BB%A3%E8%BD%AE%E6%8D%A2%E4%B8%8E%E8%B4%A8%E5%AD%90%E9%80%89%E6%8B%A9%E5%AE%9A%E5%88%99.md)):

1. **Unbroken rotation locks CKM to permutation type**: if a single Higgs doublet transforms by a phase under $T$ and both up- and down-type Yukawa vertices respect $T$, then the Hermitian squared-mass matrices $H_u = Y_u Y_u^*$ and $H_d = Y_d Y_d^*$ acting on the shared left-handed space both commute with $T$ (right-handed flavor rotations and Higgs phases cancel identically). Both matrices therefore diagonalize simultaneously along the three eigenlines of $T$. For non-degenerate masses, **CKM is forced to be a permutation-and-phase matrix for every choice of edge phases $z_i$**.
2. **Connected-graph universal-phase theorem**: more generally, whenever up and down quark masses are non-degenerate, any exact left unitary symmetry preserving both $H_u$ and $H_d$ is diagonal in each mass basis, say with phases $d_i, e_j$, forcing $d_i V_{ij} = V_{ij} e_j$. Whenever the bipartite graph of nonzero CKM entries $V_{ij}$ is connected, all phases coincide—so **every exact left flavor symmetry acting on mixed light quarks collapses to a generation-universal phase**. In particular, a continuous $SU(2)$ clock preserving both fixed Yukawas must act trivially on light quarks, since $SU(2)$ has only the trivial continuous one-dimensional character.

Even better, five lines of transparent matrix algebra pin down a quantitative floor on how hard cyclic symmetry must break:

::: {.example #ex-ou-ch08-commutator-floor title="Five-Line Hand Derivation of the 0.0414 Cyclic-Breaking Floor from 1 TeV Inputs"}
Subtract the smallest eigenvalue from $H_u$ and $H_d$ and divide each by its spectral diameter to form normalized Hermitian matrices $A, B$ of spectral diameter $1$. Since $\mathcal{E}(A)$ and $\mathcal{E}(B)$ are simultaneously diagonal in an eigenbasis of $T$, we have $[\mathcal{E}(A), \mathcal{E}(B)] = 0$. Splitting $[A, B] = [A - \mathcal{E}(A), B] + [\mathcal{E}(A), B - \mathcal{E}(B)]$ and applying $\|[H, X]\|_{\mathrm{HS}} \le \|X\|_{\mathrm{HS}}$ for any Hermitian $H$ of spectral diameter at most $1$ gives

$$
\|[A, B]\|_{\mathrm{HS}} \;\le\; \|A - \mathcal{E}(A)\|_{\mathrm{HS}} + \|B - \mathcal{E}(B)\|_{\mathrm{HS}} \;\le\; \frac{2}{\sqrt{3}}\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}}.
$$

Switching to the up-type mass basis sets $A = \operatorname{diag}(0, a_c, 1)$ and $B = V \operatorname{diag}(0, b_s, 1) V^*$. Using $1\;\mathrm{TeV}$ Yukawa inputs with conservative bounds $|V_{cb}| > 0.035$ and $|V_{tb}| > 0.98$, the $(c, t)$ entry satisfies $|B_{ct}| \ge |V_{cb} V_{tb}| - b_s$; keeping just the $(c, t)$ and $(t, c)$ entries of $[A, B]$ already yields $\|[A, B]\|_{\mathrm{HS}} > 0.0479$, which multiplies by $\sqrt{3}/2$ to lock in

$$
\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}} \;>\; 0.0414.
$$

Whatever UV dynamics one favors, matching $|V_{cb}| > 0.035$ and $|V_{tb}| > 0.98$ makes it impossible for both Yukawa sectors to shelter inside the near-symmetric ball $\|[T, X]\|_{\mathrm{HS}} \le 0.0414$.
:::

## 8.2 The Atlas of Yukawa Hierarchy Obstructions: Single Higgs, Density Potentials, Transport Vertices, and Minimal Support {#sec-ch08-yukawa-nogo}

Once cyclic symmetry must break, the natural instinct is to couple light quark modes directly to shell Higgs modes or nearest-neighbor edge transport and let hierarchies emerge dynamically. Rigorous interval certificates across individual zeros and a 1,238-zero window sweep five intuitive families off the table:

| Tested Yukawa mechanism | Zero sample and scope | Exact no-go ceiling or forced price | Reference target and context |
| :--- | :--- | :--- | :--- |
| Single light-Higgs local vertex | #22027, #28325; shared 19-site vertex, 3 light Higgs modes | **$m_c / m_t > 0.0272$**; all 19 Higgs modes force **$> 99.858\%$** heavy-mode VEV and shell mass-squared shift **$> 2.015 \times 10^{28}\;\mathrm{GeV}^2$** | Reference $m_c / m_t \approx 0.00361$; right-quark monotone smoothing still caps $m_u / m_d < 1.557$ |
| Arbitrary site-density potential vacua | #11431; plus all $1{,}238$ zeros in $[10855, 12092]$ | #11431 arbitrary density potential gives **$m_t / m_b < 2.690$** (diffusion kinetic $< 3.923$); **all $1{,}238$ zeros** obey **$m_t / m_b < 30$** | $1\;\mathrm{TeV}$ target $m_t / m_b > 40$; empirical profiles carry negative phase curvature $< -0.006\|h\|^2$ |
| 7-orbit nonnegative local Yukawa | #22027, #28325; arbitrary nonnegative weights on 7 orbits, 3 light Higgs | Up-quark / charged-lepton norm ratio capped at **$m_u / m_\ell < 3.34$** | $1\;\mathrm{TeV}$ reference floor **$84.98$** (short by $> 25\times$) |
| 1-leg vs. 3-leg 8-coefficient transport | #22027, #28325; triple (#11661, #11934, #22027) | 1-leg transport stays **$< 2.363\%$** of target; 3-leg 8-coeff fits single zeros with heavy-block norm **$> 16.63$** and vacuum trace **$> 3.45 \times 10^{34}\;\mathrm{GeV}^2$**; fails 3 zeros simultaneously (**$< 98.7\%$**) | Swapping single-zero fits fails (#28325 gives $m_u / m_\ell < 47.366$) |
| Minimal site-support classifications | #11431 shared Higgs profile; differentiable density stationarity | $m_t / m_b$ needs $\ge$ **$8$ sites** (6 subsets, all forcing **$m_c / m_t > 0.559$**; 9 sites $> 0.208$; 10 sites $> 0.01$); both hierarchies need **$14$ sites**; stationarity needs $\ge$ **$16$ sites** | Sparser profiles leave strictly positive field-equation residuals on empty sites |

### 8.2.1 Why Single Higgs Couplings and Arbitrary Density Potentials Fail Together

Every entry reflects a sharp variational mechanism (full certificates in [`ch39-positive-orbit-yukawa.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-positive-orbit-yukawa.py), [`ch39-minimum-flavor-support.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-minimum-flavor-support.py), and the [Omega replay compendium](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/%CE%A9%E5%A4%8D%E7%AE%97%E8%AF%B4%E6%98%8E.md)):

- **Single light Higgs vs. heavy-mode decoupling**: without hand-fitted flavor tensors, any complex superposition of the first three light Higgs modes at a shared 19-site vertex leaves $m_c / m_t > 0.0272$, more than seven times the empirical $0.00361$. Releasing all nineteen Higgs modes to reproduce the overall up/down norm ratio forces **more than $99.858\%$** of the Higgs VEV squared norm into the sixteen heavy modes! That direction carries a bare Rayleigh scale of at least $1.279 \times 10^{14}\;\mathrm{GeV}$, requiring a Hermitian shell mass-squared shift **$> 2.015 \times 10^{28}\;\mathrm{GeV}^2$** (including a negative shift $> 1.63 \times 10^{28}\;\mathrm{GeV}^2$) to align with the $125.25\;\mathrm{GeV}$ physical Higgs. Adding any common non-increasing Laplacian smoothing on right-handed quarks still caps the up/down norm ratio below $1.557$ for the light Higgs on the two tested zeros.
- **The phase blind spot of site-density potentials**: any potential depending only on per-site densities $|h_i|^2$—even non-convex and inter-site coupled—is blind to relative site phases. On #11431, every profile reaching the empirical top-bottom hierarchy exhibits a strictly negative-curvature phase direction ($< -0.006\|h\|^2$) at fixed site densities, ruling it out as a local minimum; every true local vacuum satisfies $m_t / m_b < 2.690$ (and $< 1.796$ for homogeneous convex potentials). Nor is #11431 special: across **all $1{,}238$ consecutive zeros in $[10855, 12092]$**, individual local certificates ($1{,}231$ zeros) and $180$ directional sector certificates ($7$ zeros) prove $m_t / m_b < 30$ at every nonzero local vacuum of charge-3 kinetic energy plus an arbitrary density potential. Even weakening the $117$ non-tree edges on #11431 by $10^{-3}$ only allows Higgs-only tuning to hit $60.80$; enforcing a common two-tier edge geometry across charges still pins density-potential vacua below $3$, while purely real-sign loops force identical up and down singular values.

### 8.2.2 Transport Backreaction and the Minimal Site-Support Ladder

Single-leg one-step shell transport barely registers ($< 2.363\%$ of at least one reference ratio floor). Expanding to all eight combinations of original and one-step transported fields across the three legs ([`ch39-minimal-product-transport.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-minimal-product-transport.py)) does fit all nine charged-fermion masses and full CKM on a single zero (#22027 or #28325, minimally two product transport terms)—but at an untenable price. Every solution matching the norm ratios and top-mass window forces the heavy-to-heavy up-type Yukawa block spectral norm above **$16.63$** on #22027 ($16.68$ on #28325), driving a per-color quartic fermion trace quadratic vacuum coefficient **$> 3.45 \times 10^{34}\;\mathrm{GeV}^2$** that violently disrupts both the Higgs portal of [Chapter 6](ch06-higgs-portals-and-electroweak-scale.md) and the vacuum balance of [Chapter 11](ch11-induced-gravity-and-dark-energy.md). (Twice-iterated rational mass-map filters can suppress the one-loop heavy vacuum shift below $2.49 \times 10^{-9}$ of the dark-energy benchmark on single zeros, yet across three zeros `#11661, #11934, #22027` any shared eight complex coefficients still leave at least one of the six sector ratios **$< 98.7\%$** of target!)

Scanning site sparsity on #11431 exposes an equally sharp support ladder: achieving the $1\;\mathrm{TeV}$ $m_t / m_b$ hierarchy requires at least **$8$ sites** (exactly six subsets work, all forcing $m_c / m_t > 0.559$; $9$ sites still force $> 0.208$; $10$ sites force $> 0.01$; a $12$-site support matches $t, b, c$); any **$14$ sites** suffice to fit both $m_t / m_b$ and the second-generation ratios $m_c / m_t, m_s / m_b$ (and any $18$ sites fit both full quark matrices); yet solving the stationarity equations of any differentiable density potential requires at least **$16$ nonzero sites**, because sparser profiles leave strictly positive field-equation residuals on empty sites.

Why do the light subspaces of distinct hypercharges naturally misalign in site-local vertices? Comparing the three charge-$1$ light modes directly against those of charges $2$ and $-4$ on the joint witness zero #2,306,888,100,085 of [Chapter 9](ch09-proton-stability-and-baryon-triality.md) and [Chapter 13](ch13-winding-ladder-and-joint-vacuum.md) exposes the geometric cause ([`ch39-joint-zero-light-subspaces.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-joint-zero-light-subspaces.py)): even allowing an arbitrary diagonal phase on each of the 19 sites to align them, a uniform charge-$1$ light input still leaks into the other charge's **heavy subspace** with probability exceeding **$38.321\%$** (charge $2$) and **$37.290\%$** (charge $-4$); even allowing arbitrary permutations of all 19 vertices still leaves heavy leakage above **$31.060\%$** and **$31.097\%$**! That intrinsic site-basis misalignment across hypercharges is the geometric root behind every single-Higgs and site-local Yukawa obstruction.

## 8.3 Rational Cayley Folding, Gram Unitary Extension, and Four-Step Newton Approximation {#sec-ch08-cayley-folding}

Compressing discrete shell flavor operators into low-energy mass and mixing matrices without floating-point drift rests on two exact algebraic theorems—the **rational Cayley-adjoint rotation law** and **complex Gram unitary extension**—both frozen in Lean:

::: {.theorem #thm-ou-ch08-cayley-orthogonal title="Orthogonality of the 3D Rational Cayley Transform and Adjoint Homomorphism" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom"}
In `OmegaCayleyRotation`, let `Cayley s` denote the $3 \times 3$ rational Cayley rotation matrix generated by `s : RatVec3`, and let `Ad p` denote the rational adjoint action of a nonzero quaternion `p : Quaternion` on `RatVec3`. Then both identities hold:

1. **Rational Cayley orthogonality** (`cayley_orthogonal`): for every `s : RatVec3`, under `RatMat3.Equiv`,

   $$
   \operatorname{Cayley}(s)^\top \operatorname{Cayley}(s) \;\equiv\; I_3.
   $$

2. **Adjoint homomorphism** (`ad_hom`): for all nonzero quaternions `p, q : Quaternion` and every `v : RatVec3`, under `RatVec3.Equiv`,

   $$
   \operatorname{Ad}(p q)(v) \;\equiv\; \operatorname{Ad}(p)\bigl(\operatorname{Ad}(q)(v)\bigr).
   $$

:::

::: {.proof}
For the first statement, expand `Cayley s` into its integer numerator matrix over the common denominator $1 + s_1^2 + s_2^2 + s_3^2$ and check all nine entries of $\operatorname{Cayley}(s)^\top \operatorname{Cayley}(s)$: after cross-multiplying, the three diagonal entries equal the squared denominator and all six off-diagonal entries vanish by polynomial ring identities. For the second statement, combine quaternion associativity, conjugation anti-multiplicativity $\overline{pq} = \bar{q}\bar{p}$, and multiplicativity of the four-square norm $\|pq\|^2 = \|p\|^2 \|q\|^2$, canceling the nonzero norm factors under rational vector equivalence to reduce $\operatorname{Ad}(pq)(v)$ to $\operatorname{Ad}(p)(\operatorname{Ad}(q)(v))$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ou-ch08-gram-unitary title="Left Unitary Extension from Equal Complex Gram Matrices" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
Let $m$ be a finite decidable index type, let $n$ be a finite index type, and let $A, B \in M_{m \times n}(\mathbb{C})$ be complex matrices with identical Hermitian Gram matrices:

$$
B^* B = A^* A.
$$

Then there exists a unitary matrix $U \in \mathrm{U}(m, \mathbb{C})$ such that

$$
B = U A.
$$

:::

::: {.proof}
The Gram equality $B^* B = A^* A$ implies that the assignment $A x \mapsto B x$ is well defined and strictly isometric on $\operatorname{ran}(A) \subseteq \mathbb{C}^m$ (since $\|B x\|^2 = \langle x, B^* B x\rangle = \langle x, A^* A x\rangle = \|A x\|^2$, hence $\ker(A) = \ker(B)$). It therefore defines a linear isometry between $\operatorname{ran}(A)$ and $\operatorname{ran}(B)$, which have equal complex dimension, so their orthogonal complements $\operatorname{ran}(A)^\perp$ and $\operatorname{ran}(B)^\perp$ also share equal dimension. Choosing orthonormal bases of the two complements and mapping one onto the other extends the partial isometry to a global unitary operator $U \in \mathrm{U}(m, \mathbb{C})$ satisfying $U(A x) = B x$ for every $x$, i.e., $B = U A$. The full proof is checked by the Lean kernel.
:::

[@thm-ou-ch08-cayley-orthogonal] and [@thm-ou-ch08-gram-unitary] sharpen the exact boundaries of unitary flavor folding ([`ch39-unitary-fold-dilation.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-unitary-fold-dilation.py), [`ch39-finite-rational-fold-accuracy.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-finite-rational-fold-accuracy.py)):

- **Dimension floors across the zero-Higgs point**: compressing three charged generations via a $90^\circ$ unitary folding at the electroweak vacuum already requires at least **$42$ dimensions per side** (rising to **$48$** when full left weak doublets are included). Extending strict unitary folding continuously across the **zero-Higgs background** ($H = 0$) lifts the exact minimum to **$45$ dimensions per side**, with equality requiring physical gauge representations in the opposite auxiliary space—while finite-degree rational unitary blocks encounter degree obstructions testable at finitely many rational points, and saturating the top-mass folding ceiling drives the smooth radial Higgs vertex to zero.
- **Four-step rational Newton folding**: replacing rigid single-step folding with **four rational Newton steps** across the contraction window ($\sigma_{\max} \le 4/5$) maintains exact unitarity throughout, approximates linear masses to relative error **$\le 4^{-16}$**, keeps Frobenius derivative errors below $2.03 \times 10^{-8}$ times the perturbation norm, and preserves all four quark-mixing observables on #22027 and #28325. Yet collider physics keeps watch: combining strict rational Cayley slopes with the minimal color-sextet top sector of [Chapter 6](ch06-higgs-portals-and-electroweak-scale.md) pushes the leading-order gluon-fusion to $t\bar{t}H$ ratio above **$2.91467\times$** the Standard Model value across all $26$ assignments and all five light-quark slope signs.

## 8.4 Positive CKM Reconstructions, Minimal Directional Coupling, and Cross-Zero Rigidity {#sec-ch08-ckm-reconstructions}

With five naive mechanisms cleared away, what *can* the 19-point Behrend shell's arc phases and boundary ports build? Four positive reconstructions mark the active frontier—and simultaneously uncover an astonishing cross-zero rigidity theorem.

### 8.4.1 Six-Triangle Singlet Phase, 28-Winding Mirror Triangle, and Seven-Zero Rational Response

1. **Six-triangle electroweak-singlet phase and cross-zero transfer**: driving an electroweak-singlet flavor scalar by the mean real holonomy of the six shortest-third-edge dual-clock triangles yields isolated conjugate CP-breaking vacua via a sextic real potential ([`ch39-chiral-neutral-flavor-phase.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-chiral-neutral-flavor-phase.py)). Calibrating real quark coefficients on **#11661** and transferring them **unchanged** to other triple-window zeros yields:
   - **#11934**: $|V_{ub}| \approx 0.001943$;
   - **#12207**: $|V_{ub}| \approx 0.004011$;
   - **#28325**: $|V_{ub}| \approx 0.003669$ (simultaneously passing two-loop $\alpha_s \approx 0.11838$ and four-layer curvature ratio $0.999411$);
   - **#8359**: $|V_{ub}| \approx 0.002873$ ($23.026\%$ below reference).

   Why must this extra flavor carrier be an electroweak singlet rather than a second dynamical weak Higgs doublet? Adding a second complex weak doublet at $125.25\;\mathrm{GeV}$—even with zero new Yukawa couplings—pushes the two-loop inferred strong coupling $\alpha_s(M_Z)$ above **$0.1251$** on #11661, #11934, and #12207, breaking the Question 1 unification window!
2. **28-winding mirror triangle vs. 42-winding baseline**: allowing arbitrary real orthogonal flavor rotations and taking CP phase solely from closed quark triangles across candidate zeros, the original five-zero baseline requires exactly **$42$ windings** to reproduce reference CKM ($41$ windings cap the quartic phase angle at $1.115814\;\mathrm{rad}$ vs. the reference $1.139034\;\mathrm{rad}$). Switching to the **mirror triangle $(28325, 48067, 58214)$** cuts the exact minimum to **$28$ windings**—and both #48067 and #58214 independently clear all three physical windows (two-loop $\alpha_s \approx 0.11844, 0.11833$; fixed-calibration $|V_{ub}| \approx 0.00205, 0.00460$).
3. **Two-boundary-site five-pulse protocol and the finite rational response $(I + T^{16})^{-1}$**: gating Cayley rotations ([@thm-ou-ch08-cayley-orthogonal]) by the charge-1 light-space projector, any sequence of real pulses at a single fixed vertex forces $J = 0$. Using **two boundary ray endpoints**, however, **five calibrated pulses** rebuild full reference CKM on #28325 and transfer directly to $|V_{ub}| \approx 0.003799$ on #48067 and $0.003746$ on #58214 (with an irreducible $> 1.0548$ first-to-last intensity asymmetry across seven zeros). Upgrading pulses to a purely edge-local **finite rational shell response** with $T = \frac{3}{4} L_n (L_n - cI)$ and

   $$
   R_n := \bigl(I + T^{16}\bigr)^{-1},
   $$

   constructed from native edges and three boundary sites with a single rational strength set calibrated on #28325, matches the ideal CKM gates across **all seven triple-window zeros to within $10^{-11}$**, while holding light-to-heavy probability leakage strictly below **$1.70 \times 10^{-30}$**!
4. **Minimal directional coupling floor $|\lambda| > 0.03010$**: if a fixed radial-preserving Hermitian shell action generates the quark flavor directions, decomposing its antisymmetric directional piece as $\lambda\, i[\Pi_1, \Pi_2]$ (from the two clock-edge unit-normal projectors $\Pi_1, \Pi_2$) enforces

   $$
   |\lambda| \;>\; 0.03010
   $$

   across the entire CKM parameter box—accounting for arbitrary real symmetric terms, arbitrary mass-basis rephasings, and all Hermitian logarithm branches—with the exact central-CKM optimum trapped in $(0.03898381516, 0.03898381517)$. Every purely real symmetric fixed shell action is therefore ruled out.

The table below collects all four positive CKM reconstructions alongside their required calibrations and structural floors:

| Positive CKM protocol | Phase / rotation driver | Precision and cross-zero readouts | Calibration input or structural floor |
| :--- | :--- | :--- | :--- |
| Six-triangle EW singlet phase | Mean real holonomy of 6 shortest-edge dual-clock triangles + sextic potential | #11661 calibration transfers to #11934 / #12207 / #28325 with $|V_{ub}| \approx 0.00194 / 0.00401 / 0.00367$ | Must be an EW singlet (2nd weak doublet drives $\alpha_s > 0.1251$); flavor coefficients calibrated on #11661 |
| Mirror-triangle winding loop | Mirror triple $(28325, 48067, 58214)$ + arbitrary real rotations | Rebuilds reference CKM in exactly **$28$ windings** (vs. **$42$ windings** on original 5-zero baseline) | Real flavor rotations fit reference CKM; physical loop-selection rule remains open |
| Two-boundary-site five pulses | Charge-1 light-projected Cayley pulses on 2 boundary ray endpoints | 5 pulses rebuild CKM on #28325; transfer to #48067 / #58214 gives $|V_{ub}| \approx 0.00380 / 0.00375$ | Any single site forces $J = 0$; first/last intensity ratio exceeds $1.0548$ across 7 zeros |
| Finite rational shell response | $(I + T^{16})^{-1}$, $T = \tfrac{3}{4}L_n(L_n - cI)$, 3 boundary sites | Matches ideal CKM light block to **$10^{-11}$** across **all 7 zeros**; heavy leakage **$< 1.70 \times 10^{-30}$** | Rational strengths calibrated on #28325; fixed Hermitian actions require $|\lambda| > 0.03010$ |

### 8.4.2 The Cross-Zero Fixed-Matrix Rigidity Ladder

Why did the seven-zero protocol above *have* to be written as a zero-covariant spectral function $(I + T^{16})^{-1}$ rather than a single constant $19 \times 19$ matrix? The rigidity ladder below answers with exact integer counts ([`ch39-common-local-rigidity.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-common-local-rigidity.py), [`ch39-covariant-edge-weight-rigidity.py`](https://github.com/loning/ch39-omega-research/blob/45cc7cad9a6dee0008a58c39abec4d4db3887c1c/replay/ch39-covariant-edge-weight-rigidity.py)):

::: {.remark #rem-ou-ch08-rigidity-ladder title="The Cross-Zero Rigidity Ladder: Algebraic Collapse at 2, 5, and 7 Zeros"}
| Shared zero count and set | Admissible matrix or dynamical class | Forced algebraic collapse | Sharpness note |
| :--- | :--- | :--- | :--- |
| **$2$ zeros** (#28325 with #22027 / #48067 / #58214) | Fixed $19 \times 19$ unitary preserving light spaces | **Forbids flavor mixing** (fixing #28325 CKM forces $\ge 6.94 \times 10^{-9}$ heavy leakage on #48067) | Static shared unitary gates fail immediately |
| **$2$ zeros** (#28325, #48067) | Zero-varying edge phases + shared site potentials and edge kinetic weights | Unique operator family **$a I + b L_n$** | With independent directed edge currents, sharp count is **$5$ zeros** |
| **$5$ zeros** (`28325, 48067, 58214, 22027, 11661`) | Fixed local generators supported on native shell edges | Collapses to **scalar multiples $\mathbb{C}I$** | Any $4$ zeros still leave a non-scalar local candidate |
| **$7$ zeros** (adding `11934, 12207`) | Arbitrary all-site (non-local) fixed $19 \times 19$ matrices | Collapses to **quadratic polynomials in cyclic shift $P$** | $7$ is strictly sharp |
:::

This rigidity table eliminates every shortcut: any zero-independent matrix that respects the light-heavy split across a handful of zeros collapses into trivial scalars or cyclic polynomials. A universal mixing law across Riemann-zero backgrounds *must* be a connection-covariant spectral operator.

::: {.problem #prob-ou-ch08-common-flavor-law title="Open Flavor Horizon of Question 3: Deriving Spectra and Mixing from One Common Arc Action"}
This chapter has charted the exact flavor boundaries of the 19-point Behrend shell: the cyclic-breaking floor $\|[T, X]\|_{\mathrm{HS}} > 0.0414$, five families of Yukawa hierarchy obstructions, four-step rational Newton folding ($4^{-16}$ precision), the directional coupling floor $|\lambda| > 0.03010$, five- and seven-zero fixed-matrix rigidity, and the finite rational response $(I + T^{16})^{-1}$ tracking seven zeros to $10^{-11}$. Two major pillars remain open:

1. **First-principles flavor action**: every successful CKM reconstruction (six-triangle singlet, 28-winding mirror triangle, five-pulse boundary gate, and $(I + T^{16})^{-1}$) still calibrates its flavor tensors, real rotations, or pulse strengths to reference CKM data rather than deriving them from the shell partition function.
2. **Unified quark-lepton folding**: deriving all quark, charged-lepton, and neutrino masses together with PMNS mixing from a single low-dimensional folding operator—without collapsing $m_u / m_\ell$ or triggering a $10^{34}\;\mathrm{GeV}^2$ heavy-block quartic trace—remains unsolved.
:::

We have measured the flavor cliffs; yet the second half of Question 3 looms with an older, starker threat. Once quarks and leptons share a unified ledger, **will the proton decay?** The next chapter confronts the dimension-six $QQQL$ operator head-on and measures the exact algebraic and anomaly-inflow price of baryon triality.
