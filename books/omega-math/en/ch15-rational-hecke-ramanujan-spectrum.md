# Chapter 15 Complex-Free Hecke–Ramanujan Rational PSD Bounds and the Norm-5 Spectral Gap

In [Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md), every odd prime $p \equiv 1 \pmod 4$ split inside the integer quaternions into $p + 1$ primitive norm-$p$ spinors $\{\boldsymbol{\pi}_{p,k}\}_{k=1}^{p+1}$, and at $p = 5$ the six-generator set $S_5$ freely generated the free group $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ via mod-$5$ rank-$1$ splitting. Free generation guarantees that distinct reduced words never collide, yet measuring how rapidly this finite gate set mixes functions across the entire three-sphere $\mathbb{T}_3(\mathbb{Q})$ requires studying the **spherical Hecke operator** $\widehat{T}_p$.

Classical analytic number theory and automorphic representation theory formulate the Ramanujan–Petersson spectral bound using complex eigenvalues, Satake parameters on the unit circle, and the irrational threshold $2\sqrt{p}$. This chapter executes the sharpest de-transcendentalization of Volume V. First, we cast the Ramanujan spectral bound on $\mathbb{T}_3(\mathbb{Q})$ as a **complex-free, log-free, square-root-free rational positive-semidefinite (PSD) quadratic inequality**. Second, using the formally verified finite power-sum Toeplitz circle criterion, we exhibit the exact equivalence between PSD quadratic forms and unit-circle spectral localization while drawing a scrupulously honest epistemological line between proved quaternion Hecke bounds, structural correspondences, and open classical/automorphic conjectures. Third, we anchor the **universal $p = 5$ eigenvalue identity** $(\widehat{T}_5 \chi_1)(\mathbf{q}) \equiv -\frac{2}{5}\chi_1(\mathbf{q})$ (for every nonzero integer quaternion $\mathbf{q} \in \mathbb{Z}^4 \setminus \{0\}$) and its exact positive rational margin $20 - (-2/5)^2 \equiv \frac{496}{25} > 0$ directly as zero-axiom frozen theorems inside `OmegaInit` and `OmegaMath` (`axioms: []`). Fourth, four additional zero-axiom frozen theorems certify the integer-recurrence trace formula across every degree $n \in \mathbb{N}$, the exact rational traces on shells $V_1 \dots V_6$, the integer six-generator matrices and strict Ramanujan margins $20 - \widehat{\lambda}^2 > 0$ across the four low symmetric-power shells ($d = 1, 2, 3, 4$, i.e. spins $j = \frac{1}{2}, 1, \frac{3}{2}, 2$), and the complete five-line integer eigenbasis with doubled basis-change identities on degree $4$ ($V_2$), before closing with the $2184$-vertex bipartite Ramanujan Cayley graph $X^{5,13}$, complete with an elementary proof of girth $8$ and an exact rational PSD shift certificate.

## 15.1 Spherical Hecke Operators and the Complex-Free Rational Ramanujan PSD Criterion

Recall from [Chapter 10](ch10-peter-weyl-rational-spin-shells.md) and [Chapter 11](ch11-pi-free-haar-integration.md) of Volume IV that polynomial functions on $\mathbb{T}_3(\mathbb{Q})$ decompose orthogonally into rational spin shells $\bigoplus_{j \in \frac{1}{2}\mathbb{N}} \mathcal{H}_j(\mathbb{Q})$, equipped with the $\pi$-free factorial Haar inner product $\langle f, g\rangle_{\mathrm{Haar}} \in \mathbb{Q}$. The degree-zero shell $\mathcal{H}_0(\mathbb{Q})$ consists solely of constant functions (the spherical DC mode), while the orthogonal complement $\bigoplus_{j \ge 1/2} \mathcal{H}_j(\mathbb{Q}) = \mathcal{H}_0^\perp$ collects all zero-mean high-order rational harmonics.

::: {.definition #def-ch15-spherical-hecke-psd title="General Odd-Prime Spherical Hecke Operator and Rational Ramanujan PSD Form"}
Let $p$ be an odd prime equipped with its $p + 1$ primitive norm-$p$ spinors $\{\boldsymbol{\pi}_{p,k}\}_{k=1}^{p+1}$ (for $p \equiv 1 \pmod 4$, the self-conjugate canonical Lipschitz set $S_p = \overline{S_p}$ of [Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md), [@def-ch14-hurwitz-prime-spinors]). Define the **general-$p$ spherical Hecke sum operator** $\widehat{T}_p$ and its **normalized Markov average** $T_p$ by

$$
(\widehat{T}_p f)(\mathbf{q}) := \sum_{k=1}^{p+1} f(\mathbf{q}\cdot\boldsymbol{\pi}_{p,k}),
\qquad
(T_p f)(\mathbf{q}) := \frac{1}{p+1}(\widehat{T}_p f)(\mathbf{q}).
$$

On integer spin shells $j = \ell \in \mathbb{Z}_{\ge 0}$ (projective scale-invariant functions $f(\lambda\mathbf{q}) = f(\mathbf{q})$), right multiplication $\mathbf{q} \mapsto \mathbf{q}\cdot\boldsymbol{\pi}_{p,k}$ stays strictly rational; on half-integer shells $j \in \frac{1}{2} + \mathbb{Z}_{\ge 0}$, the single unit-sphere normalization factor $p^{-1/2}$ squares out cleanly to $p^{-1} \in \mathbb{Q}$ inside $\langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}}$. For every high-order rational harmonic $f \in \bigoplus_{j \ge 1/2} \mathcal{H}_j(\mathbb{Q})$ orthogonal to the DC shell $\mathcal{H}_0$, define the **complex-free rational Ramanujan quadratic form**:

$$
Q_p(f) := 4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \in \mathbb{Q}.
$$

We say that $\widehat{T}_p$ satisfies the **rational Ramanujan PSD criterion** when $Q_p(f) \ge 0$ for all $f \in \bigoplus_{j \ge 1/2} \mathcal{H}_j(\mathbb{Q})$.
:::

Two structural features make $Q_p(f) \ge 0$ extraordinarily clean:

- **Why the DC shell $\mathcal{H}_0$ must be projected out:** On the constant function $f \equiv 1 \in \mathcal{H}_0$, we have $\widehat{T}_p(1) = p + 1$, giving $Q_p(1) = 4p - (p+1)^2 = -(p-1)^2 < 0$ (at $p = 5$, $20 - 36 = -16 < 0$). Orthogonality $\langle f, 1\rangle_{\mathrm{Haar}} = 0$ strips out this trivial constant mode so that all nontrivial harmonics fall under the Ramanujan threshold $|\widehat{\lambda}| \le 2\sqrt{p}$.
- **Squaring eliminates $\mathbb{C}$, $\ln p$, and $\sqrt{p}$ at once:** Because $S_p = \overline{S_p}$, $\widehat{T}_p$ is self-adjoint with respect to the Haar inner product, so $\langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} = \langle f, \widehat{T}_p^2 f\rangle_{\mathrm{Haar}}$. The bound $|\widehat{\lambda}| \le 2\sqrt{p}$ is algebraically identical to $\widehat{\lambda}^2 \le 4p$, i.e., $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$. In terms of the normalized operator $T_p = \frac{1}{p+1}\widehat{T}_p$, this reads $(p+1)^2 \lambda^2 \le 4p$; specializing to $p = 5$ ($p + 1 = 6$) and dividing by $4$ yields the crisp integer inequality

$$
36 \lambda^2 \le 20 \quad \Longleftrightarrow \quad 9 \lambda^2 \le 5.
$$

Each normalized mixing step contracts every non-constant harmonic's squared energy by at least the exact rational fraction $\frac{4p}{(p+1)^2} \in \mathbb{Q} \cap (0, 1)$ (equal to $\frac{20}{36} = \frac{5}{9}$ at $p = 5$). Spectral optimality stands on purely rational ground without square roots, logarithms, or complex numbers.

## 15.2 The Unit-Circle Toeplitz PSD Equivalence and Epistemological Boundaries of Critical Spectra

Why does a quadratic positivity condition such as $4p - \widehat{\lambda}^2 \ge 0$ mirror critical-line and unit-circle spectral localization across number theory? The **finite power-sum Toeplitz circle criterion** in the pinned `trureturing` library pins down this equivalence with complete precision:

::: {.theorem #thm-ch15-toeplitz-circle title="Equivalence Between Power-Sum Toeplitz Positive Semidefiniteness and Unit-Circle Location" lean="D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one"}
Let $u : \operatorname{Fin} m \to \mathbb{C}$ be a finite family of nonzero complex numbers ($u_j \neq 0$ for all $j$) closed with multiplicities under unit-circle inversion $z \mapsto (\bar{z})^{-1}$, witnessed by a permutation $\sigma \in S_m$ satisfying $u_{\sigma(j)} = (\overline{u_j})^{-1}$ for every $j$. Define the integer power sums $p_k := \sum_{j} u_j^k$ ($k \in \mathbb{Z}$) and the $(N + 1) \times (N + 1)$ Toeplitz matrix $T_N(u) := [p_{a - b}]_{0 \le a, b \le N}$. Then for every natural number $N$ with $N + 1 \ge |\{u_j : j \in \operatorname{Fin} m\}|$ (at least the number of distinct values of $u$),

$$
T_N(u) \succeq 0 \quad \Longleftrightarrow \quad \forall j \in \operatorname{Fin} m,\; |u_j| = 1.
$$

:::

::: {.proof}
If every $|u_j| = 1$, then $p_k = \sum_j u_j^k$ are the circle moments of the finite Dirac measure $\mu = \sum_j \delta_{u_j^{-1}}$, so $T_N(u)$ is positive semidefinite for every $N$ (`circle_moment_toeplitz_posSemidef`). Conversely, using the inversion symmetry $\sigma$, the quadratic form on any coefficient vector $x$ equals $x^* T_N(u) x = \sum_j \overline{P(\overline{u_j})}\,P(\overline{u_{\sigma(j)}})$, where $P$ is the polynomial of degree $< N + 1$ with coefficients $x$. If some $|u_i| \neq 1$, then $a := \overline{u_i}$ and $b := u_i^{-1} = \overline{u_{\sigma(i)}}$ are distinct points in $s = \{\overline{u_j}\}$. Since $|s| \le N + 1$, Lagrange interpolation builds a polynomial $P$ of degree $< N + 1$ taking value $1$ at $a$, $-1$ at $b$, and $0$ at all remaining points of $s$; every summand then has nonpositive real part and the $i$-th summand equals $-1$, forcing $\operatorname{Re}(x^* T_N(u) x) \le -1 < 0$ and contradicting positive semidefiniteness. The full proof is checked by the Lean kernel.
:::

Specializing [@thm-ch15-toeplitz-circle] to a single real Hecke eigenvalue $\widehat{\lambda} \in \mathbb{R}$ makes the Satake-to-PSD bridge completely transparent (`by direct algebraic derivation`). Factor the local Euler polynomial as $1 - \widehat{\lambda} X + p X^2 = (1 - \alpha X)(1 - \beta X)$ and set $u_1 := \alpha / \sqrt{p}$ and $u_2 := \beta / \sqrt{p}$. Since $u_1 u_2 = 1$ and $u_1 + u_2 = \widehat{\lambda}/\sqrt{p} \in \mathbb{R}$, the pair $(u_1, u_2)$ is automatically closed under $z \mapsto (\bar{z})^{-1}$ (either both lie on the unit circle with $u_j = (\overline{u_j})^{-1}$, or both are real and swapped by $\sigma = (1\;2)$). Its $2 \times 2$ power-sum Toeplitz matrix ($N = 1$, $N + 1 = 2 \ge d$) is

$$
p_0 = 2, \qquad p_1 = p_{-1} = u_1 + u_2 = \frac{\widehat{\lambda}}{\sqrt{p}}, \qquad
T_1(u) = \begin{pmatrix} 2 & \widehat{\lambda}/\sqrt{p} \\ \widehat{\lambda}/\sqrt{p} & 2 \end{pmatrix}.
$$

Thus $T_1(u) \succeq 0$ if and only if $\det T_1(u) = 4 - \frac{\widehat{\lambda}^2}{p} = \frac{4p - \widehat{\lambda}^2}{p} \ge 0$, matching the complex-free rational inequality **$4p - \widehat{\lambda}^2 \ge 0$** identically.

::: {.remark #rem-ch15-rh-epistemology title="Epistemological Boundaries: Quaternion Hecke–Ramanujan Bounds Versus Classical RH and Higher Automorphic Spectra"}
Strict intellectual honesty requires separating four distinct mathematical strata. We make **no claim** that the rational PSD inequality $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$ solves the classical Riemann Hypothesis (RH) or Generalized Riemann Hypothesis (GRH), nor that classical RH is Lean-proved inside the pinned `trureturing` or `OmegaMath` library:

1. **Pinned Lean kernel anchors:** In the classical layer, [@thm-ch15-toeplitz-circle] formally establishes the abstract equivalence between Toeplitz positive semidefiniteness and unit-circle localization for finite inversion-closed families (a criterion equivalence, not a proof locating zeros of any specific $L$-function). In the strict zero-axiom layer (`OmegaInit` and `OmegaMath`, `axioms: []`), [@thm-ch15-hecke-t5-chi1-eigenvalue] and [@thm-ch15-hecke-t5-ramanujan-margin] formally certify the universal norm-$5$ spin-$1$ character eigenvalue $-\frac{2}{5}$ for **every** nonzero integer quaternion $\mathbf{q} \in \mathbb{Z}^4 \setminus \{0\}$ together with its positive rational margin $\frac{496}{25} > 0$, while [@thm-ch15-lps-hecke-trace-formula], [@thm-ch15-lps-hecke-traces], [@thm-ch15-lps-ramanujan-margins], and [@thm-ch15-lps-degree-four-eigenbasis] formally certify the all-degree integer-recurrence trace formula, the first six rational shell traces, the four low symmetric-power integer matrices and strict margins ($d = 1, 2, 3, 4$, spins $j = \frac{1}{2}, 1, \frac{3}{2}, 2$), and the complete five-line degree-$4$ integer eigenbasis.
2. **Unconditional full-spectrum quaternion Hecke–Ramanujan bounds (`Literature result, not formalized in this book` / `ARGUED`):** Across all arbitrarily high harmonic shells of $\mathrm{SO}(3)$ and general finite LPS Cayley graphs $X^{p,q}$, the optimal spectral bound $|\widehat{\lambda}| \le 2\sqrt{p}$ (equivalently $Q_p(f) \ge 0$) was proved unconditionally via weight-$2$ holomorphic cusp forms and the Weil conjectures for varieties over finite fields by M. Eichler (*Arch. Math.* **5**, 355–366, 1954), P. Deligne (*Publ. Math. IHÉS* **43**, 273–307, 1974), and A. Lubotzky, R. Phillips, and P. Sarnak (*Comm. Pure Appl. Math.* **39**, S149–S186, 1986; **40**, 401–420, 1987; *Combinatorica* **8**, 261–277, 1988). The individual spectral audits on $V_3 \dots V_6$ and the finite shift certificate on $X^{5,13}$ below are self-contained elementary derivations and exact rational computations (`by direct algebraic derivation` / `NUM`).
3. **Structural correspondence (`MODEL`):** Viewing $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$ (via the $2 \times 2$ Satake bridge to [@thm-ch15-toeplitz-circle]) as the complex-free, log-free rational internalization of critical-line spectral optimality on $\mathbb{T}_3(\mathbb{Q})$ is a structural interpretation of `OmegaMath`; it does **not** logically imply classical RH or Dirichlet GRH.
4. **Open spectral frontiers (`OPEN`):** The general Ramanujan–Petersson conjecture for non-holomorphic Maass waveforms and higher-rank automorphic representations on $\mathrm{GL}_n$ ($n \ge 3$), the Extended Riemann Hypothesis (ERH) for Dedekind zeta functions of general number fields, the Grand Riemann Hypothesis (Grand RH) for general automorphic $L$-functions, and any standalone zero-axiom `OmegaMath` internalization of classical $\zeta(s)$ spectral theory remain strictly **`OPEN`**.
:::

## 15.3 Complete Algebraic Proof of the Universal Norm-5 Eigenvalue Identity

Let us now bring the abstract PSD criterion down to concrete, rock-solid integer algebra. On the fundamental spin-$1$ shell $V_1$ of $\mathrm{SO}(3, \mathbb{Q})$ (the Chebyshev character shell of [Chapter 10](ch10-peter-weyl-rational-spin-shells.md)), the homogeneous ray fidelity relative to $\mathbf{o} = (1, 0, 0, 0)$ is

$$
\kappa(\mathbf{q}, \mathbf{o}) = \frac{w^2}{w^2 + x^2 + y^2 + z^2} = \frac{w^2}{\|\mathbf{q}\|^2},
$$

and the spin-$1$ spherical character $\chi_1$ is the integer polynomial $U_2(\sqrt{\kappa}) = 4\kappa - 1$:

$$
\chi_1(\mathbf{q}) := 4\kappa(\mathbf{q}, \mathbf{o}) - 1 = \frac{3w^2 - x^2 - y^2 - z^2}{w^2 + x^2 + y^2 + z^2}.
$$

Remarkably, for **every** nonzero integer quaternion $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$ (represented in `OmegaMath` by `q : Quad4` with `q ≠ 0`), the action of $\widehat{T}_5$ on $\chi_1$ needs no integration or matrix diagonalization at all — four elementary polynomial steps settle the exact eigenvalue pointwise under signed rational equivalence (`Omega.IntRatio.Equivalent`) inside `OmegaInit` and `OmegaMath` with literal zero axioms (`axioms: []`):

::: {.theorem #thm-ch15-hecke-t5-chi1-eigenvalue title="Zero-Axiom Universal Norm-5 Spherical Hecke Eigenvalue Identity on the Spin-1 Character" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), for every nonzero integer quaternion $\mathbf{q} : \mathrm{Quad4}$ ($\mathbf{q} \neq 0$, i.e., $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$), the norm-$5$ spherical Hecke sum $\operatorname{heckeT5Chi1}(\mathbf{q}) = (\widehat{T}_5 \chi_1)(\mathbf{q}) = \sum_{r \in S_5}\chi_1(\mathbf{q}\cdot r)$ and the scaled spin-$1$ character $-\frac{2}{5}\operatorname{evalChi1}(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$ satisfy signed rational equivalence `Equivalent` (`Omega.IntRatio.Equivalent`):

$$
(\widehat{T}_5 \chi_1)(\mathbf{q}) \;\equiv\; -\frac{2}{5}\,\chi_1(\mathbf{q}).
$$

:::

::: {.proof}
The proof unfolds in four zero-axiom integer-ring steps. First, from Hamilton's product formula $(\mathbf{q}\cdot(a, b, c, d))_w = w a - x b - y c - z d$, running $r$ over $S_5 = \{(1, \pm 2, 0, 0), (1, 0, \pm 2, 0), (1, 0, 0, \pm 2)\}$ produces three conjugate pairs of scalar components:

$$
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm x})_w = w \mp 2x, \qquad
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm y})_w = w \mp 2y, \qquad
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm z})_w = w \mp 2z.
$$

Second, summing the squares of all six scalar components cancels every cross term $\mp 4wx, \mp 4wy, \mp 4wz$ identically:

$$
\begin{aligned}
\sum_{r \in S_5} (\mathbf{q}\cdot r)_w^2
&= (w - 2x)^2 + (w + 2x)^2 + (w - 2y)^2 + (w + 2y)^2 + (w - 2z)^2 + (w + 2z)^2 \\
&= (2w^2 + 8x^2) + (2w^2 + 8y^2) + (2w^2 + 8z^2) \\
&= 6w^2 + 8(x^2 + y^2 + z^2)
= 8\|\mathbf{q}\|^2 - 2w^2.
\end{aligned}
$$

Third, because $\mathbf{q} \neq 0$ ensures $\|\mathbf{q}\|^2 > 0$ and every $r \in S_5$ has squared norm $5$, quaternion norm multiplicativity yields $\|\mathbf{q}\cdot r\|^2 = 5\|\mathbf{q}\|^2 > 0$. Dividing by $5\|\mathbf{q}\|^2$ gives the universal fidelity contraction in `Omega.IntRatio.Equivalent`:

$$
\sum_{r \in S_5} \kappa(\mathbf{q}\cdot r, \mathbf{o})
\equiv \frac{8\|\mathbf{q}\|^2 - 2w^2}{5\|\mathbf{q}\|^2}
\equiv \frac{8}{5} - \frac{2}{5}\kappa(\mathbf{q}, \mathbf{o}).
$$

Fourth, substituting into $(\widehat{T}_5 \chi_1)(\mathbf{q}) = \sum_{r \in S_5}\bigl(4\kappa(\mathbf{q}\cdot r, \mathbf{o}) - 1\bigr)$ gives identically

$$
(\widehat{T}_5 \chi_1)(\mathbf{q})
\equiv 4\left(\frac{8}{5} - \frac{2}{5}\kappa(\mathbf{q}, \mathbf{o})\right) - \frac{30}{5}
\equiv \frac{2}{5} - \frac{8}{5}\kappa(\mathbf{q}, \mathbf{o})
\equiv -\frac{2}{5}\bigl(4\kappa(\mathbf{q}, \mathbf{o}) - 1\bigr)
= -\frac{2}{5}\chi_1(\mathbf{q}).
$$

The full proof is checked by the Lean kernel.
:::

Once [@thm-ch15-hecke-t5-chi1-eigenvalue] locks the universal eigenvalue to $\widehat{\lambda}_1 = -\frac{2}{5}$, substituting into the complex-free rational Ramanujan PSD threshold $4p - \widehat{\lambda}_1^2 = 20 - (-2/5)^2$ at $p = 5$ delivers a strictly positive rational margin, likewise verified inside `OmegaInit` and `OmegaMath` with zero axioms (`axioms: []`):

::: {.theorem #thm-ch15-hecke-t5-ramanujan-margin title="Zero-Axiom Rational Ramanujan Positivity Margin at Norm 5 on the Spin-1 Shell" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_ramanujan_margin"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), the complex-free rational Ramanujan margin at $p = 5$ for the spin-$1$ shell eigenvalue $-\frac{2}{5}$ satisfies both `Omega.IntRatio` equivalence and strict positivity:

$$
20 - \left(-\frac{2}{5}\right)^2 \;\equiv\; \frac{496}{25}
\qquad \text{and} \qquad
0 < \frac{496}{25}.
$$

:::

::: {.proof}
Evaluating $(-2/5)^2 \equiv 4/25$ and subtracting from $20 = 500/25$ inside `Omega.IntRatio` verifies cross-multiplication equivalence with $496/25$, while $0 < 496/25$ follows directly from the positive integer numerator $496 > 0$ and denominator $25 > 0$. The full proof is checked by the Lean kernel.
:::

In terms of the normalized Markov operator $T_5 = \frac{1}{6}\widehat{T}_5$, the spin-$1$ shell carries eigenvalue $\lambda_1 = -\frac{1}{15}$ and normalized margin $5 - 9\lambda_1^2 = 5 - \frac{1}{25} = \frac{124}{25} > 0$; directly summing the six $3 \times 3$ rotation matrices from [Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md) ([@ex-ch14-mod5-rank1-free-group]) gives diagonal entries $(10 - 6 - 6)/5 = -2/5$ (`by direct algebraic derivation`), independently confirming $\widehat{T}_5|_{V_1} = -\frac{2}{5} I_3$.

::: {.example #ex-ch15-pointwise-chi1-check title="Pointwise Integer Audit: Verifying the Norm-5 Character Identity at q = (3, 1, −2, 4)"}
Pick the asymmetric integer quaternion $\mathbf{q} = (3, 1, -2, 4) \in \mathbb{Z}^4$ and check [@thm-ch15-hecke-t5-chi1-eigenvalue] step by step (`by direct algebraic derivation`):

- Squared norm $\|\mathbf{q}\|^2 = 3^2 + 1^2 + (-2)^2 + 4^2 = 30$, fidelity $\kappa(\mathbf{q}, \mathbf{o}) = \frac{9}{30} = \frac{3}{10}$, and character $\chi_1(\mathbf{q}) = 4\cdot\frac{3}{10} - 1 = \frac{1}{5}$.
- Six scalar parts $(\mathbf{q}\cdot r)_w$: $w - 2x = 1$, $w + 2x = 5$, $w - 2y = 7$, $w + 2y = -1$, $w - 2z = -5$, and $w + 2z = 11$.
- Sum of squares: $1^2 + 5^2 + 7^2 + (-1)^2 + (-5)^2 + 11^2 = 1 + 25 + 49 + 1 + 25 + 121 = 222$, matching $8(30) - 2(9) = 240 - 18 = 222$ exactly.
- Dividing by $5\|\mathbf{q}\|^2 = 150$ yields $\sum_{r\in S_5}\kappa(\mathbf{q}\cdot r, \mathbf{o}) = \frac{222}{150} = \frac{37}{25}$, and therefore

$$
(\widehat{T}_5\chi_1)(\mathbf{q}) = 4 \cdot \frac{37}{25} - 6 = \frac{148 - 150}{25} = -\frac{2}{25} = -\frac{2}{5} \cdot \frac{1}{5} = -\frac{2}{5}\chi_1(\mathbf{q}).
$$

:::

## 15.4 Rational Trace Table on Spherical Shells $V_\ell$ and the Bipartite Ramanujan Cayley Graph $X^{5,13}$

Now climb from $V_1$ up the ladder of integer spin shells $V_\ell$ ($\dim V_\ell = 2\ell + 1$). Because all six spinors in $S_5$ share exact squared norm $5$ and uniform scalar fidelity $\kappa = \frac{1}{5}$ ([Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md), [@thm-ch14-lps-norm-five]), they are conjugate in $\mathrm{SO}(3)$ to the same rotation angle $\theta$ with $\cos\theta = 2\kappa - 1 = -\frac{3}{5}$, so the trace of the normalized average operator $T_5|_{V_\ell} = \frac{1}{6}\sum_{r \in S_5}\rho_\ell(r)$ equals the even second-kind Chebyshev character $E_\ell(1/5) = U_{2\ell}(1/\sqrt{5})$ of a single generator. Dropping all trigonometry and square roots, these characters obey the pure rational two-step recurrence

$$
E_0(\kappa) = 1, \qquad E_1(\kappa) = 4\kappa - 1, \qquad
E_{n+2}(\kappa) = (4\kappa - 2) E_{n+1}(\kappa) - E_n(\kappa),
$$

which specializes at $\kappa = \frac{1}{5}$ to $\chi_0 = 1$, $\chi_1 = -\frac{1}{5}$, and $\chi_{n+2} = -\frac{6}{5}\chi_{n+1} - \chi_n$. To prevent denominator growth inside the zero-axiom rational kernel, `OmegaInit` and `OmegaMath` (`axioms: []`) lock every degree $n \in \mathbb{N}$ to the pure integer numerator recurrence $a_0 = 1$, $a_1 = -1$, $a_{n+2} = -6 a_{n+1} - 25 a_n$ over denominator $5^n$:

::: {.theorem #thm-ch15-lps-hecke-trace-formula title="Zero-Axiom Integer-Recurrence Trace Formula for the Norm-5 Average Character" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_trace_formula"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), let $\mathrm{S5.averageCharacter}(n) := E_n(\tfrac{1}{5})$ denote the `FiniteRatio` even Chebyshev character at $\kappa = \frac{1}{5}$, and define the scaled integer trace representative $\mathrm{S5.traceRepresentative}(n) := \mathrm{IntRatio.value}(a_n, 5^n)$ via the integer recurrence $a_0 := 1$, $a_1 := -1$, and $a_{n+2} := -6 a_{n+1} - 25 a_n$. Then for every $n \in \mathbb{N}$, signed rational equivalence `Omega.IntRatio.Equivalent` holds universally:

$$
\bigl(\mathrm{S5.averageCharacter}(n)\bigr).\mathrm{toRatio}
\;\equiv\;
\mathrm{S5.traceRepresentative}(n) = \frac{a_n}{5^n}.
$$

:::

::: {.proof}
Paired mathematical induction on $n$ carries the equivalence at both $n$ and $n + 1$ simultaneously. The base cases $n = 0$ ($1 \equiv 1/5^0$) and $n = 1$ ($-1/5 \equiv -1/5^1$) close directly by definitional reduction. In the inductive step, substituting the recurrence coefficient $4 \cdot \frac{1}{5} - 2 \equiv -\frac{6}{5}$ and scaling $a_k / 5^k$ by $5^2 = 25$ aligns both terms over the common denominator $5^{k+2}$, whence congruence of multiplication and subtraction in `Omega.IntRatio` yields $(-\frac{6}{5})\frac{a_{k+1}}{5^{k+1}} - \frac{a_k}{5^k} \equiv \frac{-6 a_{k+1} - 25 a_k}{5^{k+2}} = \frac{a_{k+2}}{5^{k+2}}$. The full proof is checked by the Lean kernel.
:::

Unrolling the denominator-controlled integer recurrence of [@thm-ch15-lps-hecke-trace-formula] through the first six nontrivial degrees $n = 1, \dots, 6$ certifies the complete six-shell trace table as exact signed fractions inside `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch15-lps-hecke-traces title="Zero-Axiom Exact Rational Traces of the First Six Norm-5 Harmonic Shells" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), the first six trace representatives $\mathrm{S5.traceRepresentative}(n)$ satisfy the exact `Omega.IntRatio` equalities (packaged as `S5.traceTable`):

$$
\begin{aligned}
\mathrm{S5.traceRepresentative}(1) &= -\frac{1}{5}, &
\mathrm{S5.traceRepresentative}(2) &= -\frac{19}{25}, &
\mathrm{S5.traceRepresentative}(3) &= \frac{139}{125}, \\
\mathrm{S5.traceRepresentative}(4) &= -\frac{359}{625}, &
\mathrm{S5.traceRepresentative}(5) &= -\frac{1321}{3125}, &
\mathrm{S5.traceRepresentative}(6) &= \frac{16901}{15625}.
\end{aligned}
$$

:::

::: {.proof}
Evaluating $a_0 = 1$, $a_1 = -1$, $a_{n+2} = -6 a_{n+1} - 25 a_n$ yields the integer numerators $-1, -19, 139, -359, -1321, 16901$ over denominators $5^1 = 5$ through $5^6 = 15625$, and all six strict `Omega.IntRatio` equalities close by definitional reduction. The full proof is checked by the Lean kernel.
:::

The static figure below maps how the norm-$5$ spectral gap cleanly separates the excluded constant DC shell from every high-order spherical harmonic shell and from the finite bipartite Ramanujan quotient $X^{5,13}$ beneath the same rational PSD ceiling.

::: {.figure src="ch15-hecke-p5-gap"}
**The rational Ramanujan spectral gap of the norm-5 spherical Hecke operator.** The trivial DC shell $\mathcal{H}_0$ sits above the Ramanujan ceiling ($\widehat{\lambda}_0 = 6$, $\widehat{\lambda}_0^2 = 36 > 20$, normalized $\lambda_0 = 1$), whereas all orthogonal nontrivial harmonic shells $V_1 \dots V_6$ and the nontrivial spectrum of the bipartite Ramanujan graph $X^{5,13}$ remain strictly inside the rational threshold $\widehat{\lambda}^2 \le 20$ (equivalently $9\lambda^2 \le 5$); the exact traces across $V_1 \dots V_6$ and the exact eigenvalues and PSD margins on $V_1$ and $V_2$ (together with the half-integer shells $j = \frac{1}{2}, \frac{3}{2}$) are certified in zero axioms by [@thm-ch15-hecke-t5-chi1-eigenvalue], [@thm-ch15-hecke-t5-ramanujan-margin], [@thm-ch15-lps-hecke-trace-formula], [@thm-ch15-lps-hecke-traces], [@thm-ch15-lps-ramanujan-margins], and [@thm-ch15-lps-degree-four-eigenbasis], while the shift certificate on $X^{5,13}$ locks $\sigma_i^2 \le 19 < 20$.
:::

Combining [@thm-ch15-lps-hecke-trace-formula] and [@thm-ch15-lps-hecke-traces] (with all six normalized traces and the $V_1, V_2$ spectral structures frozen in zero axioms, and the individual $V_3 \dots V_6$ spectral bounds audited by `by direct algebraic derivation` / `NUM`) gives the complete exact trace table across $V_1 \dots V_6$:

| Spin shell $V_\ell$ | $\dim = 2\ell + 1$ | Normalized trace $\operatorname{Tr}(T_5|_{V_\ell}) = \chi_\ell$ | Hecke sum trace $\operatorname{Tr}(\widehat{T}_5|_{V_\ell})$ | Spectral structure and $9\lambda^2 < 5$ audit |
| :---: | :---: | :---: | :---: | :--- |
| $V_1$ | $3$ | $-\dfrac{1}{5}$ | $-\dfrac{6}{5}$ | Triple $\lambda = -\frac{1}{15}$ ($\widehat{\lambda} = -\frac{2}{5}$), $9\lambda^2 = \frac{1}{25} < 5$ ([@thm-ch15-hecke-t5-chi1-eigenvalue], [@thm-ch15-lps-ramanujan-margins]) |
| $V_2$ | $5$ | $-\dfrac{19}{25}$ | $-\dfrac{114}{25}$ | Triple $\lambda = -\frac{37}{75}$ ($\widehat{\lambda} = -\frac{74}{25}$) & double $\lambda = \frac{9}{25}$ ($\widehat{\lambda} = \frac{54}{25}$), $9\lambda^2 \in \{\frac{1369}{625}, \frac{729}{625}\} < 5$ ([@thm-ch15-lps-ramanujan-margins], [@thm-ch15-lps-degree-four-eigenbasis]) |
| $V_3$ | $7$ | $\dfrac{139}{125}$ | $\dfrac{834}{125}$ | Recurrence $-\frac{6}{5}(-\frac{19}{25}) - (-\frac{1}{5}) = \frac{139}{125}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_4$ | $9$ | $-\dfrac{359}{625}$ | $-\dfrac{2154}{625}$ | Recurrence $-\frac{6}{5}(\frac{139}{125}) - (-\frac{19}{25}) = -\frac{359}{625}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_5$ | $11$ | $-\dfrac{1321}{3125}$ | $-\dfrac{7926}{3125}$ | Recurrence $-\frac{6}{5}(-\frac{359}{625}) - \frac{139}{125} = -\frac{1321}{3125}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_6$ | $13$ | $\dfrac{16901}{15625}$ | $\dfrac{101406}{15625}$ | Recurrence $-\frac{6}{5}(-\frac{1321}{3125}) - (-\frac{359}{625}) = \frac{16901}{15625}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |

Even better, the zero-axiom kernel explicitly diagonalizes not only the integer shells $V_1$ and $V_2$, but all four low nonconstant symmetric-power shells $\mathrm{Sym}^d(\mathbb{C}^2)$ ($d = 1, 2, 3, 4$, covering spins $j = \frac{d}{2} \in \{\frac{1}{2}, 1, \frac{3}{2}, 2\}$ and dimensions $d + 1 \in \{2, 3, 4, 5\}$). The trick is remarkably clean: withhold the $\sqrt{5}$ normalization and let each generator $g = (w, x, y, z) \in S_5$ act via its Gaussian-integer defining matrix $M_g = \bigl(\begin{smallmatrix} w + ix & y + iz \\ -y + iz & w - ix \end{smallmatrix}\bigr)$ (trace $2$, determinant $5$) in the monomial basis $u^{d-r} v^r$; summing over all six conjugate-paired generators cancels every imaginary part to yield a pure integer matrix, while squaring turns $(\sqrt{5})^{2d}$ into the exact integer denominator $5^d$:

::: {.theorem #thm-ch15-lps-ramanujan-margins title="Zero-Axiom Low-Spin Symmetric-Power Integer Matrices and Strict Ramanujan Margins at Norm 5" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_ramanujan_margins"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), let `shell : S5.Shell` range over the four nonconstant symmetric-power shells `degreeOne`, `degreeTwo`, `degreeThree`, and `degreeFour` (degrees $d = 1, 2, 3, 4$, spins $j = \frac{1}{2}, 1, \frac{3}{2}, 2$), and let `branch : Bool` index spectral branches (separating the two branches at $d = 4$). Then for every pair `(shell, branch)`, both statements hold.

**(1) Exact integer matrix match (`S5.MatrixMatches shell`).** In the monomial basis, every entry of the six-generator sum of unnormalized Gaussian-integer matrices $M_g$ ($g \in S_5$) on degree $d$ agrees as a Gaussian integer (zero imaginary part) with `S5.matrixEntry shell`, yielding $6 I_2$ ($d = 1$), $-2 I_3$ ($d = 2$), $-18 I_4$ ($d = 3$), and the symmetric $5 \times 5$ integer matrix

$$
M^{(4)} = \begin{pmatrix}
-10 & 0 & 0 & 0 & 64 \\
0 & -74 & 0 & 0 & 0 \\
0 & 0 & 54 & 0 & 0 \\
0 & 0 & 0 & -74 & 0 \\
64 & 0 & 0 & 0 & -10
\end{pmatrix}.
$$

**(2) Strict rational Ramanujan margin.** Writing $\lambda_{\mathrm{sc}} \in \{6, -2, -18\}$ for $d = 1, 2, 3$, and at $d = 4$ taking $\lambda_{\mathrm{sc}} = +54$ for `branch = false` and $\lambda_{\mathrm{sc}} = -74$ for `branch = true`, the normalized squared eigenvalue $\mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}) = \lambda_{\mathrm{sc}}^2 / 5^d$ (namely $\frac{36}{5}, \frac{4}{25}, \frac{324}{125}, \frac{2916}{625}, \frac{5476}{625}$) satisfies strict positivity in `Omega.IntRatio`:

$$
0 \;<\; 20 - \mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}).
$$

:::

::: {.proof}
For the first conjunct, `S5.matrices_match` verifies all $2^2 + 3^2 + 4^2 + 5^2 = 54$ Gaussian-integer matrix entries across the four shells by case recursion and definitional reduction. For the second conjunct, `S5.margin_eq_difference` rewrites $20 - \lambda_{\mathrm{sc}}^2 / 5^d$ over the common denominator $5^d$ as $(20 \cdot 5^d - \lambda_{\mathrm{sc}}^2) / 5^d$, producing the five positive rational margins $\frac{64}{5}$, $\frac{496}{25}$, $\frac{2176}{125}$, $\frac{9584}{625}$, and $\frac{7024}{625}$, each certified strictly positive in `Omega.IntRatio.Lt` from its positive numerator and denominator. The full proof is checked by the Lean kernel.
:::

Notice the sharp geometric threshold revealed by [@thm-ch15-lps-ramanujan-margins]: on the first three shells ($j = \frac{1}{2}, 1, \frac{3}{2}$), the six-generator sum is already a scalar multiple of the identity ($6 I_2$, $-2 I_3$, $-18 I_4$), so every vector is an eigenvector; at degree $4$ (the five-dimensional spin-$2$ shell $V_2$, splitting under octahedral symmetry as $E \oplus T_2$, $5 = 2 + 3$), the outer monomials $u^4$ and $v^4$ couple via off-diagonal entries $64$. To prove inside the zero-axiom kernel that $+54$ (multiplicity $2$) and $-74$ (multiplicity $3$) exhaust all five dimensions with no hidden direction escaping, the library exhibits all five explicit integer eigenlines together with two division-free doubled basis changes:

::: {.theorem #thm-ch15-lps-degree-four-eigenbasis title="Zero-Axiom Degree-Four Five-Line Integer Eigenbasis and Doubled Basis-Change Theorem" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_degree_four_eigenbasis"}
Inside the zero-axiom library `OmegaInit` and `OmegaMath` (`axioms: []`), let `S5.degreeFourAction` denote multiplication by $M^{(4)}$ on $\mathbb{Z}^5$ (`S5.DegreeFourVector`). Then both statements hold.

**(1) Five exact integer eigenlines.** Each of the five constructors of `S5.DegreeFourLine` defines an exact eigenvector of $M^{(4)}$ — `outerSum` $= (1, 0, 0, 0, 1)$ and `middle` $= (0, 0, 1, 0, 0)$ on branch `false` (scaled eigenvalue $+54$); `outerDifference` $= (1, 0, 0, 0, -1)$, `firstInterior` $= (0, 1, 0, 0, 0)$, and `lastInterior` $= (0, 0, 0, 1, 0)$ on branch `true` (scaled eigenvalue $-74$):

$$
\mathrm{S5.degreeFourAction}(\mathrm{line}.\mathrm{vector})
= \mathrm{S5.scaledEigenvalue}(\mathrm{degreeFour}, \mathrm{line}.\mathrm{negativeBranch}) \cdot \mathrm{line}.\mathrm{vector}.
$$

**(2) Two-sided doubled basis-change identities.** Defining the integer linear maps $D(v) := (v_0 + v_4,\, 2v_1,\, 2v_2,\, 2v_3,\, v_0 - v_4)$ (`S5.doubledEigenCoordinates`) and $F(v) := (v_0 + v_4,\, v_1,\, v_2,\, v_3,\, v_0 - v_4)$ (`S5.fromEigenCoordinates`), every integer five-tuple $v = (v_0, v_1, v_2, v_3, v_4) \in \mathbb{Z}^5$ satisfies

$$
F\bigl(D(v)\bigr) = 2v
\qquad \text{and} \qquad
D\bigl(F(v)\bigr) = 2v.
$$

:::

::: {.proof}
Evaluating `S5.degreeFourAction` on the five constructors of `S5.DegreeFourLine` yields $-10 + 64 = +54$ on `outerSum`, $-10 - 64 = -74$ on `outerDifference`, and the diagonal entries $-74, +54, -74$ on the three interior axes, closing all five eigenline equalities by definitional reduction. For the basis-change compositions, slots $1, 2, 3$ equal $2v_1, 2v_2, 2v_3$ directly in both directions, while slots $0$ and $4$ close universally over $\mathbb{Z}$ via $(v_0 + v_4) + (v_0 - v_4) = 2v_0$ and $(v_0 + v_4) - (v_0 - v_4) = 2v_4$ using the integer polynomial prover. The full proof is checked by the Lean kernel.
:::

Together, [@thm-ch15-lps-ramanujan-margins] and [@thm-ch15-lps-degree-four-eigenbasis] seal the entire five-dimensional spectrum of $V_2$ in zero axioms: its double eigenvalue $+\frac{54}{25}$ (margin $\frac{9584}{625} > 0$) and triple eigenvalue $-\frac{74}{25}$ (margin $\frac{7024}{625} > 0$) sum to $2(\frac{54}{25}) + 3(-\frac{74}{25}) = -\frac{114}{25} = 6 \cdot (-\frac{19}{25})$, matching [@thm-ch15-lps-hecke-traces] identically, and across all six shells $V_1 \dots V_6$ every eigenvalue lies strictly inside $9\lambda^2 < 5$ ($\widehat{\lambda}^2 < 20$).

Reducing the six free-group generators $S_5$ modulo an odd prime $q \neq 5$ folds the infinite tree $F_3$ into a finite $6$-regular Ramanujan expander graph $X^{5,q}$. The canonical bipartite benchmark is the **$2184$-vertex Cayley graph $X^{5,13}$**, whose bipartiteness, girth $8$, and Ramanujan spectral gap can all be verified by exact finite arithmetic:

::: {.example #ex-ch15-x513-certificate title="The 2184-Vertex Bipartite Ramanujan Cayley Graph $X^{5,13}$: Girth 8 and Exact Rational PSD Shift Certificate"}
In $\mathbb{F}_{13}$, take $i \equiv 5 \pmod{13}$ (since $5^2 = 25 \equiv -1 \pmod{13}$) and map each quaternion $(a, b, c, d)$ to $\bigl(\begin{smallmatrix} a + b i & c + d i \\ -c + d i & a - b i \end{smallmatrix}\bigr) \in \mathrm{PGL}_2(\mathbb{F}_{13})$, whose determinant equals the norm $a^2 + b^2 + c^2 + d^2 = 5$. The nonzero squares in $\mathbb{F}_{13}^\times$ are $\{1, 3, 4, 9, 10, 12\}$, which omit $5$, so the Legendre symbol is $\bigl(\frac{5}{13}\bigr) = -1$. Three exact properties of $X^{5,13} = \operatorname{Cay}(\mathrm{PGL}_2(\mathbb{F}_{13}), S_5)$ follow immediately (`by direct algebraic derivation` / `NUM`).

**Bipartite structure and vertex count.** Because $\det = 5$ is a quadratic non-residue modulo $13$, every generator in $S_5$ swaps the index-$2$ subgroup $\mathrm{PSL}_2(\mathbb{F}_{13})$ with its non-square coset, yielding a **$6$-regular bipartite graph** with total vertex count

$$
|\mathrm{PGL}_2(\mathbb{F}_{13})| = 13(13^2 - 1) = 13 \times 168 = 2184.
$$

Each bipartition class has $|\mathrm{PSL}_2(\mathbb{F}_{13})| = 1092$ vertices, and the adjacency matrix takes block form $A = \bigl(\begin{smallmatrix} 0 & B \\ B^\top & 0 \end{smallmatrix}\bigr)$, where $B \in \{0, 1\}^{1092 \times 1092}$ has every row sum and column sum equal to $6$.

**Elementary integer proof of exact girth $8$.** A simple cycle of length $2k$ corresponds to a nonempty reduced word of length $2k$ in $S_5$ whose quaternion product $(w, 13 x', 13 y', 13 z')$ has $w$ odd and $x', y', z'$ even and not all zero, giving $w^2 + 676(u^2 + v^2 + t^2) = 5^{2k}$ with $u^2 + v^2 + t^2 \ge 1$ (since $4 \cdot 13^2 = 676$):

- $k = 1, 2$: $5^2 = 25 < 676$ and $5^4 = 625 < 676$, ruling out $2$-cycles and $4$-cycles outright;
- $k = 3$: $5^6 = 125^2 = 15625$ requires $169 \mid (125 - w)(125 + w)$ with $0 < w < 125$. Since $\gcd(125 - w, 125 + w) \mid 250$ is coprime to $13$, we must have $169 \mid 125 + w$, whose unique solution $w = 169 - 125 = 44$ is **even** — contradicting that $w$ is odd! Thus $X^{5,13}$ has no $6$-cycles;
- $k = 4$: $5^8 = 625^2 = 390625$ admits the odd choice $w = 625 - 2 \cdot 169 = 287$, giving $625^2 - 287^2 = 338 \cdot 912 = 676 \cdot 456 = 676(16^2 + 14^2 + 2^2)$ and the explicit length-$8$ cycle witness $(287, 416, 364, 52)$ (norm exactly $390625 = 5^8$, not divisible by $5$). Hence the girth of $X^{5,13}$ is **exactly $8$**.

**Exact rational PSD shift certificate.** The eigenvalues of $A$ are $\pm\sigma_i$, where $\sigma_i^2$ are the eigenvalues of $B^\top B$. The constant vector $\mathbf{1} \in \mathbb{Q}^{1092}$ carries the trivial eigenvalue $\sigma_0^2 = 6^2 = 36$, whereas the Ramanujan bound requires $\sigma_i^2 \le 4p = 20$ on $\mathbf{1}^\perp$. Form the symmetric rational shifted matrix

$$
M := 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092},
$$

where $J_{1092} = \mathbf{1}\mathbf{1}^\top$. On the trivial vector $\mathbf{1}$, since $J_{1092}\mathbf{1} = 1092\,\mathbf{1}$, the shift acts as

$$
M\mathbf{1} = \left(20 - 36 + \frac{17}{1092}\cdot 1092\right)\mathbf{1} = (20 - 36 + 17)\mathbf{1} = \mathbf{1};
$$

on the orthogonal complement $\mathbf{1}^\perp$, $J_{1092} v = 0$, so $M v = (20 - \sigma_i^2) v$. The exact rational certificate (verified by finite rational factorization with zero floating-point error)

$$
M = 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092} \;\succeq\; I_{1092}
$$

simultaneously locks all $1091$ nontrivial squared eigenvalues of $X^{5,13}$ to satisfy $20 - \sigma_i^2 \ge 1$, i.e., $\sigma_i^2 \le 19 < 20$ (equivalently $|\lambda| \le \sqrt{19} < 2\sqrt{5}$), securing a full unit integer margin inside the Ramanujan bound.
:::

## 15.5 Volume V Synthesis and Interactive Workbench Exploration

Volume V now closes a complete arc from finite integer arithmetic to rational spectral optimality. [Chapter 13](ch13-computable-arithmetic-horizon.md) replaced completed infinities and limits with zero-axiom Bézout's identity, Euclid prime escape, finite continued-fraction determinant and coprimality, prime-factor order stripping, and computable quarter-depth integer budgets inside `OmegaInit` and `OmegaMath`. [Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md) revealed primes through rational adelic closure as ultrametric curvature-recovery nuclei, formally certified the exact squared norm $5$ and uniform fidelity $\frac{1}{5}$ of the six canonical Hurwitz spinors $S_5$ ([@thm-ch14-lps-norm-five]), and showed how $S_5$ freely generates $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$. Finally, this chapter assembled $S_5$ into the spherical Hecke operator $\widehat{T}_5$ and expressed optimal spectral mixing across both the continuous rational three-sphere's low-spin symmetric-power shells and the bipartite Ramanujan expander $X^{5,13}$ through the complex-free, log-free rational PSD criterion $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$ anchored by six zero-axiom frozen theorems ([@thm-ch15-hecke-t5-chi1-eigenvalue], [@thm-ch15-hecke-t5-ramanujan-margin], [@thm-ch15-lps-hecke-trace-formula], [@thm-ch15-lps-hecke-traces], [@thm-ch15-lps-ramanujan-margins], and [@thm-ch15-lps-degree-four-eigenbasis]).

A natural leap now launches Volume VI: **if the six norm-$5$ integer spinors $S_5$ both generate a collision-free non-abelian word tree $F_3$ and achieve optimal rational spectral mixing, what happens when an observer executes their rational right fractions directly as a programming instruction set?** That step opens [Chapter 16](ch16-omega-fractran-and-nonabelian-stack.md), lifting Conway's scalar FRACTRAN into the three-dimensional non-abelian spinor machine $\Omega\text{-FRACTRAN}$. Readers can explore the live bridge between the norm-$5$ Hecke spectral gap and the $\Omega\text{-FRACTRAN}$ spinor stack in the interactive workbench card below.

::: {.viz src="omega-math-workbench" preset="hecke-p5-and-omega-fractran" height="520"}
**Norm-5 Hecke spectral gap and $\Omega\text{-FRACTRAN}$ spinor-stack workbench card (`hecke-p5-and-omega-fractran`).** Adjust any nonzero integer test quaternion $\mathbf{q} = (w, x, y, z)$ (default `(2, 1, 3, -1)`) to watch the six norm-$5$ Hurwitz jumps $S_5$ verify the universal eigenvalue identity $(\widehat{T}_5 \chi_1)(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$ and exact rational Ramanujan PSD margin $4\cdot 5 - (-\frac{2}{5})^2 = \frac{496}{25} > 0$ (contrasted with $\chi_2$, which splits across multiple ratios rather than remaining a single scalar eigenfunction of the six-jump sum), then toggle to the $\Omega\text{-FRACTRAN}$ divisibility gate to separate equal-norm opposite words `XY` and `YX`, bridging Volume V directly into Volume VI.
:::
