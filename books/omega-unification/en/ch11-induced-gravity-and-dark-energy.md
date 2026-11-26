# Chapter 11 Induced Gravity, Four-Layer Heat-Kernel Cancellation, and Dark-Energy Sensitivity {#sec-ch11-induced-gravity-and-dark-energy}

Chapter 10 ended with a sharp cliffhanger: even if one grants the simplicial Regge action as a geometric scaffold, geometry alone never tells you the magnitude of Newton's constant $G_N$ or why the dimensionless cosmological constant sits on the razor's edge $\Lambda G \sim 10^{-122}$. Sakharov famously proposed an enticing way out: **perhaps neither $G_N$ nor $\Lambda$ is a bare geometric input at all, because one-loop quantum fluctuations of all matter fields in a curved background automatically induce both.**

The idea is beautiful—so let us test it ruthlessly by feeding the exact three-generation gauge-crossing heavy spectrum from Volume II into a one-loop proper-time heat kernel and letting arithmetic pronounce the verdict. This chapter tightens the calipers step by step: first measuring the vast gap left by the visible heavy spectrum alone alongside its geometric twin in calibrated Regge volume models; next computing the exact minimal count of hidden real singlets needed to close both scales and exposing their extreme ultraviolet fragility; then constructing the four-layer $(-1, 3, -3, 1)$ finite positive vacuum cancellation, watching it hit $10^{-122}$ to four significant digits before slamming into the tree-level Higgs potential of electroweak symmetry breaking; and finally presenting an honest balance sheet for Question 4.

## 11.1 Proper-Time Induced Gravity and the Visible Heavy-Spectrum Gap {#sec-ch11-visible-spectrum-gap}

To eliminate any ambiguity about conventions, we begin by fixing the exact one-loop proper-time prescription and the four-layer finite positive vacuum stencil.

::: {.definition #def-ou-ch11-four-layer-vacuum title="One-Loop Proper-Time Induced Gravity, Newton Calibration, and the Four-Layer Positive Vacuum Stencil"}
Let $E_j(z) := \int_1^\infty e^{-zt} t^{-j}\,dt$ ($j = 1, 2, 3$) denote the exponential integrals, $M_P = 1.22089\times 10^{19}\,\mathrm{GeV}$ the Planck mass, $x := Q^2/M_P^2$ the dimensionless proper-time UV cutoff, and $z_k := m_k^2/M_P^2$ the dimensionless squared masses. Under the minimally coupled one-loop prescription with zero bare Newton and bare vacuum counterterms, define the flat vacuum energy density $\rho$, normalized inverse Newton constant $K$, and dimensionless horizon curvature $C$ by

$$
\rho = -\frac{Q^4}{32\pi^2}\sum_k g_k E_3\!\left(\frac{z_k}{x}\right), \qquad K := \frac{G^{-1}}{M_P^2} = \frac{x}{2\pi}\sum_k \alpha_k E_2\!\left(\frac{z_k}{x}\right), \qquad C := \Lambda G = \frac{8\pi\rho/M_P^4}{K^2}.
$$

Here $g_k$ is the bosonic-minus-fermionic polarization count, and the minimal-coupling Newton weights $\alpha_k$ equal $1/6, 1/6, 1/3, -2/3, -1/2$ for a real scalar, Weyl fermion, Dirac fermion, massless gauge-plus-ghost vector, and massive Proca vector, respectively. Newton calibration is $K = 1$, and the target curvature is $c = 10^{-122}$.

Given a light seesaw scale $\mu = v^2/M$ ($v = 246.22\,\mathrm{GeV}$, $M$ a heavy spectral mass) and a positive integer polarization multiplicity $D$, the **four-layer positive vacuum stencil** assigns net polarization weights $D(-1, 3, -3, 1)$ at the equally spaced squared masses $(0, \mu^2, 2\mu^2, 3\mu^2)$. Up to an overall scale, this weight vector uniquely annihilates the $0$th, $1$st, and $2$nd mass-squared moments; its heat trace is $-D(1 - e^{-at})^3$ ($a := \mu^2/M_P^2$), yielding a finite, strictly positive vacuum density at every $Q > 0$:

$$
V_{\mathrm{4L}} := \frac{8\pi\rho_{\mathrm{4L}}}{M_P^4} = \frac{D a^2}{4\pi}\,I\!\left(\frac{a}{x}\right), \qquad I(y) := \int_y^\infty \frac{(1 - e^{-t})^3}{t^3}\,dt, \qquad I(0) = \frac{9\ln 3 - 12\ln 2}{2}.
$$

:::

Applying [@def-ou-ch11-four-layer-vacuum] directly to the **visible heavy spectrum** established in Volume II immediately reveals a massive mismatch. At the electroweak-symmetric origin, the massless Standard Model layer carries net polarization $24 + 4 - 90 = -62$, joined by 16 heavy Dirac multiplets in each of the five gauge-charge sectors (net per-level weights $-24, -12, -12, -4, -4$ for charges $1, 4, 2, 3, 6$), 16 (or 19) heavy scalar doublets, and 18 neutral heavy vector layers (each carrying 12 massive Proca vectors, net $+36$), with center-odd masses $\kappa h$ and center-even masses $R\kappa h$.

Ordering all masses from lightest to heaviest makes the physical obstruction transparent: because negatively weighted fermionic layers always turn on before the positively weighted neutral heavy vectors, full-phase order-statistic enclosures guarantee that every mass prefix carries a strict polarization deficit of at least $d$. Summation by parts with $E_3(0) = 1/2$ forces $\rho \ge d Q^4/(64\pi^2)$, while bounding positive Newton terms by $E_2 \le 1$ and retaining the $-8$ contribution of the 12 massless gauge vectors yields $K \le b Q^2/(2\pi)$. Whenever $G > 0$, the dimensionless curvature satisfies $\Lambda G \ge \pi d/(2b^2)$—uniformly over **all common mass units, all dual-clock phases, and every normalized finite-fourth-moment cutoff mixture** ([visible heavy-spectrum induced gravity certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-induced-gravity-vacuum.py)):

| Center-Even Multiplier $R$ | Heavy Scalar Doublets | Minimum Prefix Deficit $d$ | Strict Lower Bound on $\Lambda G$ (all $G > 0$) |
| :---: | :---: | :---: | :---: |
| $R \ge 4$ | $16$ | $46$ | $0.0087576$ |
| $R \ge 4$ | $19$ | $34$ | $0.0061971$ |
| $R \ge 16$ | $16$ | $62$ | $0.0118037$ |
| $R \ge 16$ | $19$ | $50$ | $0.0091134$ |

In particular, for the three-generation gauge-crossing benchmark ($16$ heavy scalars, $R = 32$, chord $d = 724$, $\kappa = \bar{M}_P/724^2$), every dual-clock phase and cutoff with $G > 0$ enforces **$\Lambda G > 0.01180$**—at least 119 orders of magnitude above $10^{-122}$! Enclosing the unique maximum of $K/(R\kappa)^2$ along the cutoff axis further proves

$$
\frac{G^{-1}}{M_P^2} < 6.688\times 10^{-6} \quad (< 7.369\times 10^{-6} \text{ for } 19 \text{ heavy scalars}),
$$

less than $6.69\,\mathrm{ppm}$ of the observed squared Planck mass $M_P^2$! (For comparison, the earlier vector-like two-tier crossing spectrum yields an induced inverse Newton constant below $1.591\times 10^{-11}$ of observed.)

An equally vast gap appears on the discrete geometric side. Returning to the shape-bounded four-dimensional continuous squared-edge-length Regge model of [Chapter 10](ch10-regge-gravity-and-spin2.md) ($\chi_\sigma \ge 1/16$, common six-zero stiffness $\lambda \in [30484476, 30484477]$) and tuning the cosmological volume coefficient $L_*$ so the mean four-volume equals the flat reference value $V_b = n/\sqrt{5}$, differentiating overall scaling $q \mapsto s q$ at $s = 1$ yields the exact identity $2L_*\mathbb{E}V = M + \xi\lambda\tau\mathbb{E}S$ ($M = 15n$ edges), which combined with large-deviation lower bounds confines $L_*/\lambda$ strictly to $(1/50, 600)$. Restoring physical lattice spacing via $M_P^2 a_{\mathrm{lat}}^2 = 8\pi\lambda$ forces ([microscopic volume-scale certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-cosmological-volume-scale.py))

$$
\Lambda_{\mathrm{bare}}\ell_P^2 = \frac{L_*}{8\pi\lambda^2} > 2.6\times 10^{-11}.
$$

Even if one discards the bare coupling and sums signed Regge deficits over arbitrary blocks before taking the physical-volume average, the same scaling identity $\xi\tau\mathbb{E}S/(2\mathbb{E}V) = L_*/\lambda - 15\sqrt{5}/(2\lambda)$ proves that the block-averaged trace curvature still satisfies $\xi\ell_P^2\langle R/4\rangle_{\mathrm{vol}} > 2.6\times 10^{-11}$ across every partition (and at fixed flat volume, high-curvature blocks occupy at least a $2^{-31}$ fraction of cells and volume with probability $> 1 - 2^{-410000n}$; [block-curvature certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-block-curvature.py)). Neither pure visible-matter induction nor calibrated bare Regge volume comes within a hundred orders of magnitude of $10^{-122}$.

## 11.2 Minimal Hidden Real Singlets, Fixed-Cutoff Convexity Bounds, and Acute UV Sensitivity {#sec-ch11-hidden-singlets-sensitivity}

Because the visible 16-heavy-scalar spectrum ($\operatorname{Str} 1 = -310$) leaves both $G^{-1}$ and $\Lambda G$ orders of magnitude off target, the simplest controlled extension is to add minimally coupled **real gauge-singlet scalars** of arbitrary nonnegative masses. On the three gauge-passing candidate zeros #11661, #11934, and #12207 ($R = 32$, $d = 724$), how many copies are minimally required to match both $G^{-1} = M_P^2$ and $\Lambda G = 10^{-122}$, and how fragile is the resulting solution?

### 11.2.1 The Sharp 311-Singlet Floor and Fixed-Cutoff Convexity Barriers {#sec-ch11-singlet-counts-convexity}

Start with the minimum field count. Adding at most $310$ minimally coupled real singlets of arbitrary positive masses (even under normalized cutoff mixtures), bounding the visible squared-mass moment via $0 \le E_3(v) - \tfrac{1}{2} + v \le 2v^{3/2}$ forces $\Lambda G > 1.5\times 10^{-7}$ after Newton calibration. At **$N = 311$**, equal-mass singlets achieve both targets near $Q/M_P \approx 0.42929$ and $M_s/M_P \approx 0.017260$ ($u = M_s^2/Q^2 \approx 0.00161647$), yet moving along the Newton-calibrated branch from $\Lambda G = 0$ to $\Lambda G = 10^{-122}$ requires shifting $u$ by $\Delta u \in (1.2030, 1.2031)\times 10^{-122}$—a literal 122-digit tuning ([minimal neutral singlets certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-minimal-neutral-gravity.py)).

When the UV cutoff is fixed to a prescribed value $x = Q^2/M_P^2$, moving the visible spectrum to the right-hand side determines two required hidden heat-kernel moments $S = \sum E_3(u_i)$ and $T = \sum E_2(u_i)$. Because $E_2(u)/E_3(u) \in (1, 2]$ monotonically and $f(t) = E_2(E_3^{-1}(t))$ is strictly convex, any finite real-singlet match requires $1 < T/S \le 2$. That single inequality rules out both canonical Planck scales—**$Q = M_P$** and **$Q = \bar{M}_P = M_P/\sqrt{8\pi}$**—and pins down the sharp jumps inside the feasible window ([fixed-cutoff moment certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-fixed-cutoff-singlets.py)):

| Proper-Time UV Cutoff $Q$ | Moment Ratio $T/S$ or Continuous Lower Bound (#11661 / #11934 / #12207) | Minimal Real Singlets for $G_N$ & $\Lambda G = 10^{-122}$ |
| --- | --- | :---: |
| $Q = M_P$ | $T/S \approx 0.907722 < 1$ | Impossible for any $N$ |
| $Q = \bar{M}_P = M_P/\sqrt{8\pi}$ | $T/S \approx 6.77698 > 2$ | Impossible for any $N$ |
| $Q = M_P/2$ | Continuous floor $435.33928$ / $435.33952$ / $435.33926$ | **$436$** |
| $Q = M_P/\sqrt{2}$ | Continuous floor $77{,}665.194$ / $77{,}665.679$ / $77{,}665.161$ | **$77{,}666$** |
| Unconstrained cutoff ($Q \approx 0.42929\,M_P$) | $\operatorname{Str} 1_{\mathrm{vis}} = -310$ | **$311$** (equal mass suffices) |

**Arb example. Three zeros sharing a signed cutoff.** Take $N=2\,306\,888\,100\,085$ and its neighbors $N-1,N+1$. At the electroweak background $r=(246.22\,\mathrm{GeV}/M_P)^2/2$, use the visible spectrum at each zero to evaluate the Newton coefficient $K$ and vacuum term $W=8\pi\rho/M_P^4$. Mix the cutoffs $x=Q^2/M_P^2$ with the same real weights summing to one. Fixing the positions at $(4\times10^{-15},3.5\times10^{-11},1.23\times10^{-6},0.5,1)$ forces a trade-off even when all sixteen portal couplings can vary independently at each zero within $|\lambda_{j,n}|\le1$. With $K=1$ at all three zeros, the smallest attainable maximum of $|W-10^{-122}|$ is about $1.85651\times10^{-8}$. With $W=10^{-122}$ at all three, the smallest attainable maximum of $|K-1|$ is about $0.00122900$. Allow the positions to vary over $0<x\le1$, fix the common portal strength at $0.42995401872$, and let the cyclic permutation on each shell determine its signs. Six cutoff positions then suffice to meet both targets exactly at all three zeros. The cost lies in the cancellation between positive and negative weights. Over all feasible normalized signed measures, the total negative mass $b$ satisfies $1\,308\,843.19304049<\inf b<1\,308\,843.19304130$. The lower bound includes continuous measures, and seven explicit rational positions give the upper bound. [Sharp bounds at fixed positions](https://github.com/the-omega-institute/trureturing-experiments/blob/1380036a46c249f8ca3de52d0114027f7b1da529/experiments/ch39-omega-research/replay/ch39-three-index-broken-gravity.py) · [Six-atom construction and negative-mass bounds](https://github.com/the-omega-institute/trureturing-experiments/blob/1380036a46c249f8ca3de52d0114027f7b1da529/experiments/ch39-omega-research/replay/ch39-three-index-free-atoms.py)

### 11.2.2 Opposite Mass Shifts, the $4.22\times 10^{-120}$ UV Cliff, and Three-Anchor Gram Independence {#sec-ch11-uv-cliff-gram}

Next test shared cutoffs across zeros and UV sensitivity. Sharing a single cutoff across #11661, #11934, and #12207 requires $x > 0.18$. Ordered as $12207 \to 11661 \to 11934$, the required hidden moments satisfy $\Delta S > 0$ (stepwise $x\Delta S > 9.07\times 10^{-8},\; 1.36\times 10^{-6}$) while $\Delta T < 0$ (stepwise $\Delta K_{\mathrm{vis}} > 1.48\times 10^{-8},\; 2.13\times 10^{-7}$). Because $E_3$ and $E_2$ decrease together with mass, **at least two hidden singlets must move in opposite directions**. This lower bound is sharp: at $Q = 3M_P/7$, **$309$ of the $311$ singlets can remain fixed at the shared mass $Q/32$**, while the remaining $2$ uniquely match each zero.

Far more lethal is **holding all physical masses fixed and perturbing the UV cutoff $Q$**. Applying the heat-kernel recurrences $2E_3(u) + uE_2(u) = E_2(u) + uE_1(u) = e^{-u}$ at a matched point $K = 1,\; C = c$ yields the clean slope identity in $x = Q^2/M_P^2$:

$$
C' + (3x + 2c)K' = \frac{x}{4\pi}\sum_{\mathrm{vis}}(6\alpha_k - g_k)\exp\!\left(-\frac{z_k}{x}\right).
$$

Because every minimally coupled real scalar satisfies $6\alpha - g = 6(1/6) - 1 = 0$, **all hidden real singlets cancel identically from this derivative combination**! The visible spectrum alone enforces $\max(|\dot{C}|, |\dot{K}|) > 0.68$, proving that $G$ and $\Lambda G$ can never be simultaneously stationary in $Q$. Worse, for **any** matched hidden real-singlet spectrum on these three backgrounds, raising $Q$ by just **$7.2\times 10^{-117}$** already drives $\Lambda G$ strictly negative; for the 311-singlet realizations, the exact zero-crossing occurs at **$\Delta Q/Q_0 \approx 4.22\times 10^{-120}$** ([shared cutoff and positive-curvature window certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-shared-gravity-spectrum.py)):

| Positive Zero Index | First Zero-Crossing $(Q - Q_0)/Q_0$ for 311 Singlets | Universal Negative-Crossing Bound (Any Matched Hidden Singlets) |
| :---: | :---: | :---: |
| #12207 | $(4.217575,\, 4.217579)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |
| #11661 | $(4.217566,\, 4.217570)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |
| #11934 | $(4.217440,\, 4.217444)\times 10^{-120}$ | $< 7.2\times 10^{-117}$ |

Whenever we audit whether three real response vectors—such as the vacuum value, Newton constant, and cutoff or Higgs slope, or the sensitivity vectors across three candidate zeros—are linearly independent or degenerate, the governing geometric invariant is the $3\times 3$ Gram determinant. Its exact expansion in any real inner-product space is frozen in the Lean 4 kernel:

::: {.theorem #thm-ou-ch11-three-anchor-gram title="Exact Three-Anchor Gram Determinant Identity" lean="D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula"}
Let $E$ be any real inner-product space (`[NormedAddCommGroup E]`, `[InnerProductSpace ℝ E]`), and let $u, v, w \in E$. Writing $G(u, v, w)$ for the $3\times 3$ Gram matrix of pairwise real inner products (`threeAnchorGram u v w`), its determinant satisfies

$$
\det G(u, v, w) = \|u\|^2\|v\|^2\|w\|^2 + 2\langle u, v\rangle\langle u, w\rangle\langle v, w\rangle - \|u\|^2\langle v, w\rangle^2 - \|v\|^2\langle u, w\rangle^2 - \|w\|^2\langle u, v\rangle^2.
$$

:::

::: proof
Set $a = \|u\|^2 = \langle u, u\rangle$, $b = \|v\|^2 = \langle v, v\rangle$, $c = \|w\|^2 = \langle w, w\rangle$, and $x = \langle u, v\rangle$, $y = \langle u, w\rangle$, $z = \langle v, w\rangle$. By symmetry of the real inner product, expanding the $3\times 3$ symmetric Gram determinant along its first row yields $a(bc - z^2) - x(xc - yz) + y(xz - by) = abc + 2xyz - az^2 - by^2 - cx^2$, which is the stated formula. The full proof is checked by the Lean kernel.
:::

[@thm-ou-ch11-three-anchor-gram] is pure inner-product algebra (making no claim to formalize gravitational dynamics), yet it crystallizes the geometric test of multi-constraint independence that recurs throughout the four-layer vacuum cancellation and electroweak derivative audits below.

## 11.3 Four-Layer $(-1, 3, -3, 1)$ Positive Vacuum Cancellation and the Cost of EWSB {#sec-ch11-four-layer-ewsb}

The 311-singlet match is pathologically fragile because it relies on accidental cancellation of $O(Q^4)$ divergent terms at one razor-thin cutoff. Can one instead cancel all divergent vacuum moments across **every** cutoff, leaving behind a finite, strictly positive vacuum energy?

### 11.3.1 Symmetric-Origin Mass-by-Mass Grading, Four-Layer Positivity, and Joint Zero Hits {#sec-ch11-four-layer-hits}

Allowing both minimally coupled real scalars and gauge-singlet **Dirac fermions** makes this possible. Because the exponentials $\exp(-z_k/x)$ for distinct $z_k$ are linearly independent (via an invertible Vandermonde derivative matrix), $V(x)$ vanishes on an open cutoff interval if and only if the net polarization vanishes **mass by mass**. At the electroweak-symmetric origin of #11661, #11934, and #12207, positive-weight and negative-weight squared masses are separated by at least $3\times 10^{-11} M_P^2$: balancing the massless sector takes $62$ real scalars, the five charged heavy sectors take $896$ real scalars, and the 18 neutral heavy layers take $9$ Dirac singlets each (canceling $+36$ per layer), giving the sharp minimum of **$958$ real scalars $+$ $162$ Dirac singlets**. After cancellation, the Newton slope satisfies $2\pi K'(x) \ge 21/2 > 0$, fixing a unique Newton-calibrated cutoff $Q/M_P \approx 0.17882$ ([graded vacuum cancellation certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-graded-vacuum.py)).

Now superpose the **four-layer positive vacuum stencil** $D(-1, 3, -3, 1)$ of [@def-ou-ch11-four-layer-vacuum] on $(0, \mu^2, 2\mu^2, 3\mu^2)$ (shifting $D$ scalars out of the massless layer and adding net $4k$ scalars plus $k = \lceil 3D/4\rceil$ Dirac singlets). Because the third difference kills the $0$th, $1$st, and $2$nd mass-squared moments, the integral $I(0) = (9\ln 3 - 12\ln 2)/2$ is finite and strictly positive, with a finite-cutoff deficit below $2\times 10^{-59}$. Remarkably, setting the seesaw light scale $\mu = v^2/M$ ($v = 246.22\,\mathrm{GeV}$) with $D = 4$ polarizations and scanning all 98 heavy mass rows selects the 16th charged-2 heavy mass $M$ right next to the target:

| Polarization Multiplicity $D$ | Light-Scale Rule $\mu$ | #11661 (best $C/c$) | #11934 (best $C/c$) | #12207 (best $C/c$) |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $v^2/M$ | $0.853939$ | $0.851338$ | $0.854245$ |
| $1$ | $v^2/(2M)$ | $0.478472$ | $0.479672$ | $0.478591$ |
| **$4$** | **$v^2/M$** | **$0.979478$** | **$0.991359$** | **$0.967553$** |
| $4$ | $v^2/(2M)$ | $0.925639$ | $0.925639$ | $0.925639$ |

Furthermore, invoking the externally formalized Riemann Hypothesis as a verified arithmetic premise (Levent Alpöge's 2026 Lean 4 proof with independent multi-kernel replays, documented in the Prelude and Appendices and explicitly distinguished from `LEAN ✓` theorems of this book), Landau's zero sum and Weyl's criterion give joint equidistribution of the dual clocks on the phase torus. Fixing $D = 4$ and the 16th charged-2 mass $M$, the limit phase segment crosses $C/c = 1$: for **every tolerance $\varepsilon > 0$, a strictly positive lower natural density of actual positive $\zeta$ zeros** simultaneously achieves `[1]` three chiral generations ($h < 9$), `[2]` the two-loop strong-coupling window $\alpha_s(M_Z) \in (0.11842, 0.11845)$, and `[4]` dark-energy curvature $|\Lambda G/10^{-122} - 1| < \varepsilon$ (explicit lower density $\ge 10^{-16}/\pi^2 \approx 1.013\times 10^{-17}$ for $\varepsilon = 10^{-6}$). Co-rotating both clocks preserves the six flavor triangles calibrated at #11661, and actual zero **#28325** simultaneously yields $\alpha_s(M_Z) \in (0.1183790, 0.1183853)$, **$0.99941058\times$** of $10^{-122}$, and $|V_{ub}| \approx 0.0036693$ (with #22027 yielding $1.00030008\times$ and $|V_{ub}| \approx 0.0025225$; [joint vacuum and flavor density certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-joint-vacuum-density.py)).

### 11.3.2 EWSB Re-Balancing, the $-1.345\times 10^{-67}$ Tree Cliff, and Collider Penalties {#sec-ch11-ewsb-cliff}

Yet the moment the Higgs field rolls into the **broken electroweak vacuum** ($v = 246.22\,\mathrm{GeV}$, $m_h = 125.25\,\mathrm{GeV}$, massive $W, Z, t$), this striking four-layer harmony faces three devastating blows.

First comes the one-loop EWSB residual and re-balancing overhead. Keeping the symmetric-origin hidden spectrum frozen produces a one-loop residual $\Delta C \approx -4.673\times 10^{-36}$, dominated by the top quark. Re-balancing mass by mass in the broken vacuum raises the minimal hidden count from $958 + 162$ to **$1{,}002$ real scalars $+$ $173$ Dirac singlets** ($Q/M_P \approx 0.17402$); including two massive Majorana neutrinos ($m_1 = 0$, normal ordering) raises the count further to **$1{,}006$ real scalars $+$ $174$ Dirac singlets** ($1{,}010 + 175$ for $m_1 = 0.010\,\mathrm{eV}$) to restore the $1.00030008\times$ and $0.99941058\times$ one-loop readings ([broken EWSB vacuum certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-broken-electroweak-vacuum.py); [neutrino and four-layer certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutrino-flavor-and-heat.py)):

| Broken-Vacuum Mass Layer | Visible Net Polarization | Target Polarization | Minimal Added Real Scalars | Minimal Added Dirac Singlets |
| --- | :---: | :---: | :---: | :---: |
| Massless layer (photon, gluons, 3 Weyl $\nu$) | $+12$ | $-4$ | $0$ | $4$ |
| $W, Z, h$ layers (each mass separately) | $+6, +3, +1$ | $0$ each | $6$ | $4$ |
| Six quarks and three charged leptons | $-84$ | $0$ each | $84$ | $0$ |
| Nonzero four-layer masses ($\mu, \sqrt{2}\mu, \sqrt{3}\mu$) | $0$ each | $+12, -12, +4$ | $16$ | $3$ |
| Charged and neutral heavy shell tower | Separated per layer | $0$ each | $896$ | $162$ |
| **Broken-vacuum total (massless / 2 massive $\nu$)** | — | Four-layer positive | **$1{,}002$** (**$1{,}006$**) | **$173$** (**$174$**) |

Second comes the **$-1.345\times 10^{-67}$ Higgs tree-potential cliff**. Normalizing the symmetric origin to zero potential, the standard quadratic-plus-quartic Higgs tree potential drops by $\rho_H(v) - \rho_H(0) = -m_h^2 v^2/8$, contributing **$-1.345\times 10^{-67}$** ($-1.34476\times 10^{-67}$) to $\Lambda G$—**55 orders of magnitude larger** than the four-layer positive term! Compensating this tree deficit solely by replicating $P$ copies of the $D = 4$ four-layer sector while keeping $K = 1$ requires $P > B/C_\infty \approx 1.344\times 10^{55}$, whose light modes back-react through $K = x[A(x) + PH(x)]/(2\pi)$ and force the gravitational cutoff below **$4.18\,\mathrm{eV}$** (or $< 7.24\,\mathrm{eV}$ even after retuning Higgs quadratic and quartic couplings; an integer-copy solution at $P \approx 4.205\times 10^{68}$ pushes $Q$ down to $\approx 2.585\times 10^{-6}\,\mathrm{eV}$).

Third come the **low-energy penalties of equal-depth vacua and derivative cancellation**. Escaping the tree deficit by forcing **equal-depth tree vacua** $U(0) = U(v) = 0$ via a minimal pure-doublet sextic potential $U_0(s) = (m_h^2/v^4)s(s - v^2/2)^2$ (barrier height $m_h^2 v^2/54 \approx 1.761\times 10^7\,\mathrm{GeV}^4$, domain-wall tension $m_h v^2/8 \approx 9.49\times 10^5\,\mathrm{GeV}^3$) predicts a Higgs cubic self-coupling **$3\times$** the Standard Model value (quartic $13\times$); a renormalizable real-singlet potential $U(s, S) = \lambda(s - aS)^2 + g s(S - b)^2$ achieves equal depth at the price of a second scalar mass $\le 8.602\,\mathrm{TeV}$ for $\lambda, g \le 4\pi$ (benchmark $a = v, b = v/2, g = 2$ gives a $377.38\,\mathrm{GeV}$ partner scalar; [equal-depth vacua certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-two-electroweak-vacua.py)). Requiring the vacuum heat trace to cancel through second Higgs derivatives on an open cutoff interval forces tree-level Higgs decays into light fermion-layer scalar partners with partial width $\ge 19.53\,\mathrm{keV}$ ($\ge 3.71\,\mathrm{keV}$ at $m_b = 2.7\,\mathrm{GeV}$; [heat-trace derivative width certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-heat-jets-higgs-width.py)). Attempting to copy charged-fermion masses via renormalizable neutral portals breaks down under one-loop QCD running ($d\log R/d\log E > 0.236$ at $1\,\mathrm{TeV}$; [neutral-portal running obstruction](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-portal-yukawa-stability.py)), forcing the top partner into a complex color sextet that drags two-loop $\alpha_s(M_Z)$ down to $\approx 0.0819$ ([color-sextet top partner certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-portal-color-sextet.py)); enumerating all $3{,}125$ color assignments of the five lighter quark layers finds only one unique composition ($20$ labeled assignments) restoring one-loop unification near $8.02\times 10^{15}\,\mathrm{GeV}$, still confronting $Z$-width, gluon-fusion, and low-energy $\alpha_s$ bounds ([light-quark color enumeration](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-light-color-assignments.py)).

The figure below places this entire 122-order-of-magnitude hierarchy of vacuum bounds and UV sensitivity cliffs onto a single quantitative scale:

::: {.figure src="ch11-vacuum-balance-sensitivity"}
**Scales of vacuum balance, UV cutoff sensitivity, and the four-layer heat-kernel stencil.** The upper logarithmic ladder contrasts two lanes: the left lane marks curvature magnitudes from the Planck scale ($1$) through the uncancelled one-loop floor ($0.0118$, magenta), microscopic Regge floor ($2.6\times 10^{-11}$, violet), and Higgs tree-level shift ($-1.345\times 10^{-67}$, cyan) down to observed dark energy ($10^{-122}$, amber); the right lane marks fractional UV-cutoff shifts reversing the sign in magenta (uniform matched-class upper bound $7.2\times 10^{-117}$ and first sign flip in examples at $4.22\times 10^{-120}$). The lower panel displays the four-layer heat-kernel weights $(-1, 3, -3, 1)$ that cancel moments of degree $0$ through $2$ ([@def-ou-ch11-four-layer-vacuum]).
:::

| Vacuum & Gravity Scheme | Minimal Extra Content / Constraint | $\Lambda G$ Reading or Obstruction | Decisive Bottleneck |
| --- | --- | --- | --- |
| Visible heavy spectrum alone ($R=32, d=724$) | $0$ extra fields | $\Lambda G > 0.01180$, $G^{-1}/M_P^2 < 6.688\times 10^{-6}$ | Deficit $d = 62$; both $G^{-1}$ and $\Lambda G$ miss badly |
| Calibrated 4D Regge shape-bounded model | Shape bound $\chi_\sigma \ge 1/16$ | $\Lambda_{\mathrm{bare}}\ell_P^2 > 2.6\times 10^{-11}$; block average $> 2.6\times 10^{-11}$ | Bare volume scale sits $> 110$ orders above $10^{-122}$ |
| Minimally coupled real singlets ($K=1$) | Min **$311$** ($436$ at $M_P/2$, $77{,}666$ at $M_P/\sqrt{2}$; none at $M_P, \bar{M}_P$) | Tunable to $10^{-122}$; $\ge 2$ shift oppositely across zeros | Turns negative at $\Delta Q/Q_0 \approx 4.22\times 10^{-120}$ ($< 7.2\times 10^{-117}$ generally) |
| Symmetric-origin four-layer $(-1,3,-3,1)$ | $958$ real scalars $+ 162$ Dirac ($+$ 4-layer) | $0.991359\times$ (#11934), $0.99941058\times$ (#28325) | Relies on external grading and $\mu = v^2/M$ input |
| EWSB four-layer $+$ Higgs tree potential | $1{,}002 + 173$ ($1{,}006 + 174$ with 2 neutrinos) | Tree shift $-1.345\times 10^{-67}$; replication forces $Q < 4.18\,\mathrm{eV}$ | Demands equal-depth potential ($3\times$ cubic / $\le 8.602\,\mathrm{TeV}$ singlet) or new mechanism |

## 11.4 Honest Balance Sheet for Question 4: Model-Internal Proofs vs. First-Principles Gaps {#sec-ch11-honest-synthesis}

With Chapters 10 and 11 side by side, the cartography of Question 4 leaves no room for illusion.

On the side of **rigorously established model-internal results**, we have a solid body of algebraic theorems and exact certificates: zero-axiom simplicial coboundary nilpotency ([@thm-ou-ch10-coboundary-zero]), constructive quadratic right-angle spinor closure ([@thm-ou-ch10-sqrt2-spinor]), and the three-anchor Gram determinant identity ([@thm-ou-ch11-three-anchor-gram]) stand as Lean 4 kernel-verified algebraic foundations; inside specified discrete Regge and marker models, the long-wave conserved-source kernel delivers two positive-residue Lorentzian helicities $\pm 2$, ten primitive time slices guarantee $AA^\dagger$ reflection positivity, 25 local deficits invert all 20 curvature and 5 non-metricity components with exact determinant $-2{,}660{,}511{,}744$, and two-update three-marker rules restore two-derivative cubic Ward identities while coupling Riemann zeros directly to the Lorentz scalar $\operatorname{tr}(\mathcal{R}^3)$; on the induced-gravity side, the visible heavy-spectrum floors, the sharp $311 / 436 / 77{,}666$ singlet counts, the $4.22\times 10^{-120}$ UV cliff, and the positive lower natural density of actual zeros hitting three generations, two-loop $\alpha_s$, and the four-layer $10^{-122}$ target simultaneously are all backed by exact rational and Arb interval certificates.

On the side of **non-circular first-principles derivation**, however, the original core problem remains open in full:

::: {.problem #prob-ou-ch11-noncircular-gravity title="Non-Circular Derivation of Covariant Lorentzian Gravity, Newton's Constant, and Dark Energy"}
Starting solely from the single minimal-arc master connection and one discrete partition function—without inserting a bare Regge action by hand, specifying an external area unit $A_*$, appending hundreds of hand-graded gauge singlets, tuning a proper-time cutoff $Q$, or postulating an equal-depth tree-level Higgs potential:

1. Derive an interacting four-dimensional Lorentzian covariant spin-2 theory that fixes the discrete time-transfer shear coefficient, controls the Euclidean conformal-mode instability, and maintains full diffeomorphism invariance;
2. Compute the physical Newton constant $G_N$ (the absolute Planck-to-electroweak scale ratio) with zero fitted parameters;
3. Independently predict both the positive sign and the $\Lambda G \sim 10^{-122}$ magnitude of the total effective cosmological constant after accounting for electroweak symmetry breaking and quantum loops.
:::

Across Volumes I–IV, each of the four grand-unification questions has now been mapped to its exact mathematical boundaries—and each has spotlighted its own favored Riemann zeros (#11661, #11934, #12207, #11366, #11431, #28325). Can a **single shared arithmetic clock** and a **single global weight-selection dynamics** reconcile all four questions simultaneously? Volume V turns to that cross-question reckoning.
