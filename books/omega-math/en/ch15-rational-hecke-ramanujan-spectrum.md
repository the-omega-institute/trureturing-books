# Chapter 15 Complex-Free Hecke–Ramanujan Rational PSD Bounds and the Norm-5 Spectral Gap

[Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md) selected a canonical conjugate-paired set of norm-$p$ spinors for primes $p\equiv1\pmod4$. At $p=5$, these six spinors $S_5$ freely generate $F_3$ through their rational rotations. Free generation keeps reduced words distinct. To measure how rapidly averaging mixes functions on the three-sphere, we need the spectrum of the spherical Hecke operator.

Squaring the Ramanujan bound gives a rational positive-semidefinite (PSD) criterion. A finite Toeplitz equivalence connects it to the unit circle for a real eigenvalue. For the canonical $S_5$, the zero-axiom results give the pointwise eigenvalue $-2/5$ on $\chi_1$, its margin $496/25$, a scalar character recurrence at every integer spin, and exact matrix data in symmetric degrees $1$ through $4$. We derive the bridge from the scalar recurrence to the harmonic trace, check six integer-spin shells, then turn to the finite bipartite graph $X^{5,13}$.

## 15.1 Spherical Hecke Operators and the Complex-Free Rational Ramanujan PSD Criterion

Take the real unit three-sphere $S^3$ with normalized Haar measure as in [Chapter 10](ch10-peter-weyl-rational-spin-shells.md) and [Chapter 11](ch11-pi-free-haar-integration.md). Restrictions of rational-coefficient polynomials form the algebraic direct sum of the harmonic shells $\mathcal H_j(\mathbb Q)$ of degrees $2j$. Their inner products are rational by the factorial Haar formula. The constant shell has $j=0$. The positive-degree shells have mean zero, and their real span is dense in the zero-mean subspace of $L^2(S^3)$. Even degrees descend under $q\sim -q$ to projective space. Odd degrees, including the coordinate $w$, distinguish the two lifts.

::: {.definition #def-ch15-spherical-hecke-psd title="General Odd-Prime Spherical Hecke Operator and Rational Ramanujan PSD Form"}
Let $p$ be an odd prime. Choose a set $A$ with one norm-$p$ representative from each of the $p+1$ left Hurwitz-unit classes. For the canonical construction when $p\equiv1\pmod4$, take $A=S_p$ from [@def-ch14-hurwitz-prime-spinors]. To act on the **unit** three-sphere, use the unit quaternions $s_\pi=\pi/\sqrt p$ and put

$$
(\widehat T_p f)(q):=\sum_{\pi\in A}f(qs_\pi),\qquad T_p:=\frac{\widehat T_p}{p+1}.
$$

Take Haar measure of total mass $1$. On finite sums of nonconstant rational harmonic polynomials restricted to the sphere, the **rational Ramanujan criterion** is $Q_p(f)\ge0$ for every such $f$, where

$$
Q_p(f):=4p\,\langle f,f\rangle_{\mathrm{Haar}}-\langle\widehat T_p f,\widehat T_p f\rangle_{\mathrm{Haar}}.
$$

For homogeneous degree $d=2j$, the unscaled substitutions $q\mapsto q\pi$ have rational coefficients. The sphere substitutions multiply their sum by $p^{-d/2}$, so the squared norm uses only the rational factor $p^{-d}$. Distinct degrees remain orthogonal, giving $Q_p(f)\in\mathbb Q$ on finite sums as well.
:::

Right translations preserve Haar measure and each harmonic degree. The constant $1$ gives $Q_p(1)=-(p-1)^2$, so we test on the zero-mean complement. The criterion is equivalent to the norm bound $\|\widehat T_p\|\le2\sqrt p$ on that complement. Rational harmonic polynomials span each real harmonic degree over $\mathbb R$, and their finite sums are dense in real zero-mean $L^2$. Conjugation closure $A=\overline A$ makes $\widehat T_p$ self-adjoint, since $s_\pi^{-1}=s_{\overline\pi}$. In that case the criterion is equivalent to $\widehat\lambda^2\le4p$ for every nonconstant shell eigenvalue. For the average, $\lambda=\widehat\lambda/(p+1)$ and the energy ratio is then at most $4p/(p+1)^2$. At $p=5$ this gives $9\lambda^2\le5$ and an energy ratio at most $5/9$. Even degrees descend to $\mathrm{SO}(3)$. On odd degrees the signs of the unit quaternion lifts matter.

Removing the constants still leaves an inequality to prove. Take $p=3$ and $\pi_{s,t}=(3,1,s,t)/2$ with $s,t\in\{1,-1\}$. Each has squared norm $3$. For two distinct choices the real part of $\pi_{s',t'}\pi_{s,t}^{-1}$ is $5/6$ or $2/3$, according as one or both signs differ. A Hurwitz unit has real part in $\{0,\pm1/2,\pm1\}$, so the four representatives belong to distinct left classes. This set lacks conjugate pairing. For the mean-zero degree-one harmonic $f(w,x,y,z)=w$, the four normalized translates sum to $(6w-2x)/\sqrt3$. The coordinate squares each integrate to $1/4$ and $\langle w,x\rangle_{\mathrm{Haar}}=0$, giving

$$
Q_3(f)=12\cdot\frac14-\frac{6^2+2^2}{3\cdot4}=-\frac13.
$$

## 15.2 The Unit-Circle Toeplitz PSD Equivalence and Epistemological Boundaries of Critical Spectra

Why does a quadratic positivity condition such as $4p - \widehat{\lambda}^2 \ge 0$ mirror critical-line and unit-circle spectral localization across number theory? The **finite power-sum Toeplitz circle criterion** in the pinned `trureturing` library pins down this equivalence with complete precision:

::: {.theorem #thm-ch15-toeplitz-circle title="Equivalence Between Power-Sum Toeplitz Positive Semidefiniteness and Unit-Circle Location" lean="D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one"}
Let $u : \operatorname{Fin} m \to \mathbb{C}$ be a finite family of nonzero complex numbers ($u_j \neq 0$ for all $j$) closed with multiplicities under unit-circle inversion $z \mapsto (\bar{z})^{-1}$, witnessed by a permutation $\sigma \in S_m$ satisfying $u_{\sigma(j)} = (\overline{u_j})^{-1}$ for every $j$. Define the power sums at integer indices $p_k := \sum_{j} u_j^k$ ($k \in \mathbb{Z}$) and the $(N + 1) \times (N + 1)$ Toeplitz matrix $T_N(u) := [p_{a - b}]_{0 \le a, b \le N}$. Then for every natural number $N$ with $N + 1 \ge |\{u_j : j \in \operatorname{Fin} m\}|$ (at least the number of distinct values of $u$),

$$
T_N(u) \succeq 0 \quad \Longleftrightarrow \quad \forall j \in \operatorname{Fin} m,\; |u_j| = 1.
$$

:::

::: {.proof}
If every $|u_j| = 1$, then $p_k = \sum_j u_j^k$ are the circle moments of the finite Dirac measure $\mu = \sum_j \delta_{u_j^{-1}}$, so $T_N(u)$ is positive semidefinite for every $N$ (`circle_moment_toeplitz_posSemidef`). Conversely, using the inversion symmetry $\sigma$, the quadratic form on any coefficient vector $x$ equals $x^* T_N(u) x = \sum_j \overline{P(\overline{u_j})}\,P(\overline{u_{\sigma(j)}})$, where $P$ is the polynomial of degree $< N + 1$ with coefficients $x$. If some $|u_i| \neq 1$, then $a := \overline{u_i}$ and $b := u_i^{-1} = \overline{u_{\sigma(i)}}$ are distinct points in $s = \{\overline{u_j}\}$. Since $|s| \le N + 1$, Lagrange interpolation builds a polynomial $P$ of degree $< N + 1$ taking value $1$ at $a$, $-1$ at $b$, and $0$ at all remaining points of $s$; every summand then has nonpositive real part and the $i$-th summand equals $-1$, forcing $\operatorname{Re}(x^* T_N(u) x) \le -1 < 0$ and contradicting positive semidefiniteness. The full proof is checked by the Lean kernel.
:::

Specializing [@thm-ch15-toeplitz-circle] to a single real Hecke eigenvalue $\widehat{\lambda} \in \mathbb{R}$ makes the Satake-to-PSD bridge completely transparent (`by direct algebraic derivation`). Factor the local Euler polynomial as $1 - \widehat{\lambda} X + p X^2 = (1 - \alpha X)(1 - \beta X)$ and set $u_1 := \alpha / \sqrt{p}$ and $u_2 := \beta / \sqrt{p}$. Since $u_1 u_2 = 1$ and $u_1 + u_2 = \widehat{\lambda}/\sqrt{p} \in \mathbb{R}$, the pair $(u_1, u_2)$ is automatically closed under $z \mapsto (\bar{z})^{-1}$ (either both lie on the unit circle with $u_j = (\overline{u_j})^{-1}$, or both are real and swapped by $\sigma = (1\;2)$). Its $2 \times 2$ power-sum Toeplitz matrix ($N = 1$, $N + 1 = 2$) is

$$
p_0 = 2, \qquad p_1 = p_{-1} = u_1 + u_2 = \frac{\widehat{\lambda}}{\sqrt{p}}, \qquad
T_1(u) = \begin{pmatrix} 2 & \widehat{\lambda}/\sqrt{p} \\ \widehat{\lambda}/\sqrt{p} & 2 \end{pmatrix}.
$$

Thus $T_1(u) \succeq 0$ if and only if $\det T_1(u) = 4 - \frac{\widehat{\lambda}^2}{p} = \frac{4p - \widehat{\lambda}^2}{p} \ge 0$, matching the complex-free rational inequality **$4p - \widehat{\lambda}^2 \ge 0$** identically.

::: {.remark #rem-ch15-rh-epistemology title="Epistemological Boundaries: Quaternion Hecke–Ramanujan Bounds Versus Classical RH and Higher Automorphic Spectra"}
This book uses classical RH and GRH for all Dirichlet $L$-functions as **externally verified formal facts**: Levent Alpöge's terminal declarations appear in the [fixed version of `Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean), and their standard-axiom closures are recorded in the [independent audit](https://math.mit.edu/~drew/grh/audit.log). This external result and the rational Hecke criteria of this volume have separate provenance; it does not reconstruct analytic spectral theory inside zero-axiom `OmegaMath`. The following four classes retain their own evidence boundaries:

1. **Pinned Lean kernel anchors:** In the classical layer, [@thm-ch15-toeplitz-circle] formally establishes the abstract equivalence between Toeplitz positive semidefiniteness and unit-circle localization for finite inversion-closed families (a criterion equivalence, not a proof locating zeros of any specific $L$-function). Among the D5 results using `OmegaInit` and `OmegaMath` (`strict_omega.axioms: []`), [@thm-ch15-hecke-t5-chi1-eigenvalue] and [@thm-ch15-hecke-t5-ramanujan-margin] formally certify the universal norm-$5$ spin-$1$ character eigenvalue $-\frac{2}{5}$ for **every** nonzero integer quaternion $\mathbf{q} \in \mathbb{Z}^4 \setminus \{0\}$ together with its positive rational margin $\frac{496}{25} > 0$, while [@thm-ch15-lps-hecke-trace-formula], [@thm-ch15-lps-hecke-traces], [@thm-ch15-lps-ramanujan-margins], and [@thm-ch15-lps-degree-four-eigenbasis] formally certify the scalar character recurrence at every integer spin, its first six rational values, the four low symmetric-power integer matrices and strict margins ($d = 1, 2, 3, 4$, spins $j = \frac{1}{2}, 1, \frac{3}{2}, 2$), and the complete five-line degree-$4$ integer eigenbasis.
2. **Full-spectrum bounds for the canonical LPS construction (literature result, not formalized in this book).** For the canonical $S_p$ with $p\equiv1\pmod4$, Lubotzky, Phillips, and Sarnak proved the bound $|\widehat\lambda|\le2\sqrt p$ on the nonconstant harmonics of $\mathrm{SO}(3)$ (*Comm. Pure Appl. Math.* **40**, 401–420, 1987). Their finite Cayley graphs $X^{p,q}$ have the same bound on the nontrivial adjacency spectrum, excluding both $\pm(p+1)$ in the bipartite case (*Combinatorica* **8**, 261–277, 1988). The shell calculations for $V_3,\dots,V_6$ and the finite shift check for $X^{5,13}$ below use exact arithmetic.
3. **Structural correspondence (`MODEL`):** Viewing $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$ (via the $2 \times 2$ Satake bridge to [@thm-ch15-toeplitz-circle]) as the complex-free, log-free rational internalization of critical-line spectral optimality on $\mathbb{T}_3(\mathbb{Q})$ is a structural interpretation of `OmegaMath`; it does **not** logically imply classical RH or Dirichlet GRH.
4. **Open spectral frontiers (`OPEN`):** The general Ramanujan–Petersson conjecture for non-holomorphic Maass waveforms and higher-rank automorphic representations on $\mathrm{GL}_n$ ($n \ge 3$), the Extended Riemann Hypothesis (ERH) for Dedekind zeta functions of general number fields, the Grand Riemann Hypothesis (Grand RH) for general automorphic $L$-functions, and any standalone zero-axiom `OmegaMath` internalization of classical $\zeta(s)$ spectral theory remain strictly **`OPEN`**.

**One radius, two finite readings (manual algebraic derivation).** The companion volume's [comparison of Nyman–Beurling distance and Li curvature](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/en/ch34-s31-arc-calculus-riemann-and-hermite-biehler.md) uses the Cayley coordinate $z(s)=1-1/s$: a hypothetical nontrivial zero $\rho$ in the right half of the critical strip gives $r=|z(\rho)|\in(0,1)$ and a common floor $d_N^2\ge r^2(1-r^2)>0$ for every finite Nyman distance; the same hypothesis forces failure of positive semidefiniteness at some finite order of the canonical Li-curvature Toeplitz matrix. The first tests whether approximation errors tend to zero; the second tests the sign of a matrix.

At the rational radius $r=3/5$, both the positive polynomial and the order-two matrix for the inversion-closed family $(r,r^{-1})$ can be calculated by hand:

$$
\begin{aligned}
r^2(1-r^2)&=\frac{144}{625}>0,\\
T_1(r,r^{-1})&=\begin{pmatrix}2&34/15\\34/15&2\end{pmatrix},
\qquad \det T_1=-\frac{256}{225}<0.
\end{aligned}
$$

The matrix is the specialization of [@thm-ch15-toeplitz-circle] to two distinct real nodes. The positive number $144/625$ is only a rational evaluation of the distance-floor polynomial, not an actual $d_N^2$. This example constructs no $\zeta$ zero and does not reduce its infinite analytic zero set to an order-two matrix. Rational arithmetic retains the algebraic shape of the bridge; passing from finite certificates to the global analytic object still requires a separate proof.

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

Remarkably, for **every** nonzero integer quaternion $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$ (represented in `OmegaMath` by `q : Quad4` with `q ≠ 0`), the action of $\widehat{T}_5$ on $\chi_1$ needs no integration or matrix diagonalization at all — four elementary polynomial steps settle the exact eigenvalue pointwise under signed rational equivalence (`Omega.IntRatio.Equivalent`) in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch15-hecke-t5-chi1-eigenvalue title="Universal Norm-5 Spherical Hecke Eigenvalue Identity on the Spin-1 Character" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue"}
The cited D5 declarations record `strict_omega.axioms: []`. For every nonzero integer quaternion $\mathbf{q} : \mathrm{Quad4}$ ($\mathbf{q} \neq 0$, i.e., $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$), the norm-$5$ spherical Hecke sum $\operatorname{heckeT5Chi1}(\mathbf{q}) = (\widehat{T}_5 \chi_1)(\mathbf{q}) = \sum_{r \in S_5}\chi_1(\mathbf{q}\cdot r)$ and the scaled spin-$1$ character $-\frac{2}{5}\operatorname{evalChi1}(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$ satisfy signed rational equivalence `Equivalent` (`Omega.IntRatio.Equivalent`):

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

Once [@thm-ch15-hecke-t5-chi1-eigenvalue] locks the universal eigenvalue to $\widehat{\lambda}_1 = -\frac{2}{5}$, substituting into the complex-free rational Ramanujan PSD threshold $4p - \widehat{\lambda}_1^2 = 20 - (-2/5)^2$ at $p = 5$ delivers a strictly positive rational margin, likewise verified in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch15-hecke-t5-ramanujan-margin title="Rational Ramanujan Positivity Margin at Norm 5 on the Spin-1 Shell" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_ramanujan_margin"}
The cited D5 declarations record `strict_omega.axioms: []`. The complex-free rational Ramanujan margin at $p = 5$ for the spin-$1$ shell eigenvalue $-\frac{2}{5}$ satisfies both `Omega.IntRatio` equivalence and strict positivity:

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

At integer spin $\ell$, write $V_\ell=\operatorname{Sym}^{2\ell}(\mathbb C^2)$ for one irreducible copy of dimension $2\ell+1$. Right translation on spherical matrix coefficients acts on one factor, so each eigenvalue from this copy repeats $2\ell+1$ times in the full degree-$2\ell$ harmonic space on the three-sphere. The six normalized lifts share scalar coordinate $1/\sqrt5$ ([@thm-ch14-lps-norm-five]). The scalar even Chebyshev sequence starts at $E_0(\kappa)=1$, $E_1(\kappa)=4\kappa-1$, with $E_{n+2}(\kappa)=(4\kappa-2)E_{n+1}(\kappa)-E_n(\kappa)$. At $\kappa=1/5$ the following frozen identity gives its integer numerator recurrence.

::: {.theorem #thm-ch15-lps-hecke-trace-formula title="Integer Recurrence for the Scalar Norm-5 Character" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_trace_formula"}
The cited D5 declaration records `strict_omega.axioms: []` on the strict backend and `axioms: ["propext"]` on the official backend. Let $\mathrm{S5.averageCharacter}(n) := E_n(\tfrac{1}{5})$ denote the `FiniteRatio` even Chebyshev character at $\kappa = \frac{1}{5}$, and define the scaled integer trace representative $\mathrm{S5.traceRepresentative}(n) := \mathrm{IntRatio.value}(a_n, 5^n)$ via the integer recurrence $a_0 := 1$, $a_1 := -1$, and $a_{n+2} := -6 a_{n+1} - 25 a_n$. Then for every $n \in \mathbb{N}$, signed rational equivalence `Omega.IntRatio.Equivalent` holds universally:

$$
\bigl(\mathrm{S5.averageCharacter}(n)\bigr).\mathrm{toRatio}
\;\equiv\;
\mathrm{S5.traceRepresentative}(n) = \frac{a_n}{5^n}.
$$

:::

::: {.proof}
Paired mathematical induction on $n$ carries the equivalence at both $n$ and $n + 1$ simultaneously. The base cases $n = 0$ ($1 \equiv 1/5^0$) and $n = 1$ ($-1/5 \equiv -1/5^1$) close directly by definitional reduction. In the inductive step, substituting the recurrence coefficient $4 \cdot \frac{1}{5} - 2 \equiv -\frac{6}{5}$ and scaling $a_k / 5^k$ by $5^2 = 25$ aligns both terms over the common denominator $5^{k+2}$, whence congruence of multiplication and subtraction in `Omega.IntRatio` yields $(-\frac{6}{5})\frac{a_{k+1}}{5^{k+1}} - \frac{a_k}{5^k} \equiv \frac{-6 a_{k+1} - 25 a_k}{5^{k+2}} = \frac{a_{k+2}}{5^{k+2}}$. The full proof is checked by the Lean kernel.
:::

Unrolling the denominator-controlled integer recurrence of [@thm-ch15-lps-hecke-trace-formula] through the first six nontrivial degrees $n = 1, \dots, 6$ gives the first six scalar values as exact signed fractions inside `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch15-lps-hecke-traces title="Zero-Axiom First Six Scalar Norm-5 Character Values" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces"}
The cited D5 declarations record `strict_omega.axioms: []`. The first six trace representatives $\mathrm{S5.traceRepresentative}(n)$ satisfy the exact `Omega.IntRatio` equalities (packaged as `S5.traceTable`):

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
Evaluating $a_0 = 1$, $a_1 = -1$, $a_{n+2} = -6 a_{n+1} - 25 a_n$ yields the integer numerators $-1, -19, 139, -359, -1321, 16901$ over denominators $5^1 = 5$ through $5^6 = 15625$, and all six exact `Omega.IntRatio` equalities close by definitional reduction. The full proof is checked by the Lean kernel.
:::

**From scalar values to operator traces.** The frozen recurrence and table concern exact ratios. To identify those ratios with a matrix trace, take the eigenvalues $\alpha,\beta$ of a normalized defining matrix on $\mathbb C^2$. They satisfy $\alpha+\beta=2/\sqrt5$ and $\alpha\beta=1$. On $\operatorname{Sym}^d(\mathbb C^2)$ the trace is $\sum_{r=0}^d\alpha^{d-r}\beta^r=:h_d$. This sum starts with $1,\alpha+\beta$ and obeys $h_{d+2}=(\alpha+\beta)h_{d+1}-h_d$, hence $h_d=U_d(1/\sqrt5)$. For $d=2\ell$ it equals $E_\ell(1/5)$ for each generator. Linearity of trace gives $\operatorname{Tr}(T_5|_{V_\ell})=E_\ell(1/5)$ and $\operatorname{Tr}(\widehat T_5|_{V_\ell})=6E_\ell(1/5)$. This representation-theoretic calculation supplies the trace identification for every integer spin.

::: {.figure src="ch15-hecke-p5-gap"}
**The norm-5 character identity and six shell radii.** Left, the six-term sum acts on $\chi_1$ with eigenvalue $-2/5$ and margin $496/25$. Right, the spectral radii of the six-term average on $V_1,\dots,V_6$ lie below the dashed bound $\sqrt5/3$. The plotted radii come from rational brackets computed in the homogeneous polynomial quotient by $x^2+y^2+z^2$.
:::

The trace calculation and the six frozen scalar values give the two trace columns. The final column uses the separate matrix certificates described below.

| Spin shell $V_\ell$ | $\dim = 2\ell + 1$ | Normalized trace $\operatorname{Tr}(T_5|_{V_\ell}) = E_\ell(1/5)$ | Hecke sum trace $\operatorname{Tr}(\widehat{T}_5|_{V_\ell})$ | Spectral structure and $9\lambda^2 < 5$ audit |
| :---: | :---: | :---: | :---: | :--- |
| $V_1$ | $3$ | $-\dfrac{1}{5}$ | $-\dfrac{6}{5}$ | Triple $\lambda = -\frac{1}{15}$ ($\widehat{\lambda} = -\frac{2}{5}$), $9\lambda^2 = \frac{1}{25} < 5$ ([@thm-ch15-hecke-t5-chi1-eigenvalue], [@thm-ch15-lps-ramanujan-margins]) |
| $V_2$ | $5$ | $-\dfrac{19}{25}$ | $-\dfrac{114}{25}$ | Triple $\lambda = -\frac{37}{75}$ ($\widehat{\lambda} = -\frac{74}{25}$) & double $\lambda = \frac{9}{25}$ ($\widehat{\lambda} = \frac{54}{25}$), $9\lambda^2 \in \{\frac{1369}{625}, \frac{729}{625}\} < 5$ ([@thm-ch15-lps-ramanujan-margins], [@thm-ch15-lps-degree-four-eigenbasis]) |
| $V_3$ | $7$ | $\dfrac{139}{125}$ | $\dfrac{834}{125}$ | Recurrence $-\frac{6}{5}(-\frac{19}{25}) - (-\frac{1}{5}) = \frac{139}{125}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_4$ | $9$ | $-\dfrac{359}{625}$ | $-\dfrac{2154}{625}$ | Recurrence $-\frac{6}{5}(\frac{139}{125}) - (-\frac{19}{25}) = -\frac{359}{625}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_5$ | $11$ | $-\dfrac{1321}{3125}$ | $-\dfrac{7926}{3125}$ | Recurrence $-\frac{6}{5}(-\frac{359}{625}) - \frac{139}{125} = -\frac{1321}{3125}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |
| $V_6$ | $13$ | $\dfrac{16901}{15625}$ | $\dfrac{101406}{15625}$ | Recurrence $-\frac{6}{5}(-\frac{1321}{3125}) - (-\frac{359}{625}) = \frac{16901}{15625}$; all eigenvalues strictly satisfy $9\lambda^2 < 5$ |

Even better, the zero-axiom kernel explicitly diagonalizes not only the integer shells $V_1$ and $V_2$, but all four low nonconstant symmetric-power shells $\mathrm{Sym}^d(\mathbb{C}^2)$ ($d = 1, 2, 3, 4$, covering spins $j = \frac{d}{2} \in \{\frac{1}{2}, 1, \frac{3}{2}, 2\}$ and dimensions $d + 1 \in \{2, 3, 4, 5\}$). The trick is remarkably clean: withhold the $\sqrt{5}$ normalization and let each generator $g = (w, x, y, z) \in S_5$ act via its Gaussian-integer defining matrix $M_g = \bigl(\begin{smallmatrix} w + ix & y + iz \\ -y + iz & w - ix \end{smallmatrix}\bigr)$ (trace $2$, determinant $5$) in the monomial basis $u^{d-r} v^r$; summing over all six conjugate-paired generators cancels every imaginary part to yield a pure integer matrix, while squaring turns $(\sqrt{5})^{2d}$ into the exact integer denominator $5^d$:

::: {.theorem #thm-ch15-lps-ramanujan-margins title="Low-Spin Symmetric-Power Integer Matrices and Strict Ramanujan Margins at Norm 5" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_ramanujan_margins"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `shell : S5.Shell` range over the four nonconstant symmetric-power shells `degreeOne`, `degreeTwo`, `degreeThree`, and `degreeFour` (degrees $d = 1, 2, 3, 4$, spins $j = \frac{1}{2}, 1, \frac{3}{2}, 2$), and let `branch : Bool` index spectral branches (separating the two branches at $d = 4$). Then for every pair `(shell, branch)`, both statements hold.

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

**(2) Strict rational Ramanujan margin.** Writing $\lambda_{\mathrm{sc}} \in \{6, -2, -18\}$ for $d = 1, 2, 3$, and at $d = 4$ taking $\lambda_{\mathrm{sc}} = +54$ for `branch = false` and $\lambda_{\mathrm{sc}} = -74$ for `branch = true`, the squared eigenvalue of the spherical sum $\mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}) = \lambda_{\mathrm{sc}}^2 / 5^d$ (namely $\frac{36}{5}, \frac{4}{25}, \frac{324}{125}, \frac{2916}{625}, \frac{5476}{625}$) satisfies strict positivity in `Omega.IntRatio`:

$$
0 \;<\; 20 - \mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}).
$$

:::

::: {.proof}
For the first conjunct, `S5.matrices_match` verifies all $2^2 + 3^2 + 4^2 + 5^2 = 54$ Gaussian-integer matrix entries across the four shells by case recursion and definitional reduction. For the second conjunct, `S5.margin_eq_difference` rewrites $20 - \lambda_{\mathrm{sc}}^2 / 5^d$ over the common denominator $5^d$ as $(20 \cdot 5^d - \lambda_{\mathrm{sc}}^2) / 5^d$, producing the five positive rational margins $\frac{64}{5}$, $\frac{496}{25}$, $\frac{2176}{125}$, $\frac{9584}{625}$, and $\frac{7024}{625}$, each certified strictly positive in `Omega.IntRatio.Lt` from its positive numerator and denominator. The full proof is checked by the Lean kernel.
:::

Notice the sharp geometric threshold revealed by [@thm-ch15-lps-ramanujan-margins]: on the first three shells ($j = \frac{1}{2}, 1, \frac{3}{2}$), the six-generator sum is already a scalar multiple of the identity ($6 I_2$, $-2 I_3$, $-18 I_4$), so every vector is an eigenvector; at degree $4$ (the five-dimensional spin-$2$ shell $V_2$, splitting under octahedral symmetry as $E \oplus T_2$, $5 = 2 + 3$), the outer monomials $u^4$ and $v^4$ couple via off-diagonal entries $64$. To prove inside the zero-axiom kernel that $+54$ (multiplicity $2$) and $-74$ (multiplicity $3$) exhaust all five dimensions with no hidden direction escaping, the library exhibits all five explicit integer eigenlines together with two division-free doubled basis changes:

::: {.theorem #thm-ch15-lps-degree-four-eigenbasis title="Degree-Four Five-Line Integer Eigenbasis and Doubled Basis-Change Theorem" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_degree_four_eigenbasis"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `S5.degreeFourAction` denote multiplication by $M^{(4)}$ on $\mathbb{Z}^5$ (`S5.DegreeFourVector`). Then both statements hold.

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

On $V_2$ the unnormalized spherical eigenvalues are $54/25$ twice and $-74/25$ three times. Their sum $-114/25=6(-19/25)$ checks the trace calculation. For $V_3,\dots,V_6$, expand the six unscaled matrices on degree-$d$ monomials with $d=2\ell$ and sum to obtain $H_d$. The symmetric-power inner product in this basis has matrix $W_d=\operatorname{diag}_{r=0}^d(1/\binom dr)$. The spherical sum operator is $5^{-d/2}H_d$. For $d=6,8,10,12$, all leading principal minors of $20\cdot 5^dW_d-H_d^{\mathsf T}W_dH_d$ are positive by exact rational computation (`NUM`). Sylvester's criterion gives the strict bound on all four shells.

The same six generators also give a finite test. Reduce $S_5$ modulo $13$ and use the projective matrix action to obtain the **$2184$-vertex bipartite Cayley graph $X^{5,13}$**.

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

**Exact rational PSD shift certificate.** The eigenvalues of $A$ are $\pm\sigma_i$, where $\sigma_i^2$ are the eigenvalues of $C:=B^\top B$. The constant vector $\mathbf{1} \in \mathbb{Q}^{1092}$ carries the trivial eigenvalue $\sigma_0^2 = 6^2 = 36$, whereas the Ramanujan bound requires $\sigma_i^2 \le 4p = 20$ on $\mathbf{1}^\perp$. Form the symmetric rational shifted matrix

$$
M := 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092},
$$

where $J_{1092} = \mathbf{1}\mathbf{1}^\top$. On the trivial vector $\mathbf{1}$, since $J_{1092}\mathbf{1} = 1092\,\mathbf{1}$, the shift acts as

$$
M\mathbf{1} = \left(20 - 36 + \frac{17}{1092}\cdot 1092\right)\mathbf{1} = (20 - 36 + 17)\mathbf{1} = \mathbf{1};
$$

on the orthogonal complement $\mathbf{1}^\perp$, $J_{1092} v = 0$, so $M v = (20 - \sigma_i^2) v$ for a $C$-eigenvector $v$ with eigenvalue $\sigma_i^2$.

For the exact check, enumerate the $2184$ vertices by traversing the Cayley graph from the identity. This proves connectedness, so the eigenvalue $36$ of $C$ is simple. Solving for the first rational dependence among $e_0,Ce_0,C^2e_0,\dots$ gives a monic annihilator of degree $28$ for $e_0$. The left action of $\mathrm{PSL}_2(\mathbb F_{13})$ on the nonsquare side is transitive and commutes with $C$, so the polynomial annihilates every column. Removing the simple factor $t-36$ leaves a polynomial with zero roots in $[19,\infty)$ by an exact Sturm count. Thus the shift satisfies

$$
M = 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092} \;\succeq\; I_{1092}
$$

The $1091$ nontrivial squared singular values of $B$ all satisfy $\sigma_i^2<19$. The corresponding adjacency eigenvalues have magnitude less than $\sqrt{19}<2\sqrt5$.
:::

## 15.5 Volume V Synthesis and Interactive Workbench Exploration

Volume V moves from finite arithmetic to the free rotation generators $S_5$. On the sphere these six spinors yield a rational test for spectral mixing. The frozen scalar and low-degree matrix identities, the higher finite-shell calculations, and the finite graph certificate each give exact information about a specific part of this picture.

::: {.film src="the-norm-five-gap"}
**Six integer quaternions of norm 5, one squared rational inequality, and a spectral gap you can check with fractions (2 min 52 s).** Six cyan and magenta spinors $1\pm2i$, $1\pm2j$, $1\pm2k$ surround the amber point $q$, and the Ramanujan bound is squared into $20-\widehat\lambda^2\ge0$. The Satake pair $u_1,u_2$ slides along the unit circle as $\widehat\lambda$ moves and leaves it once $\widehat\lambda$ passes $2\sqrt5$, while the $2\times2$ Toeplitz determinant $(20-\widehat\lambda^2)/5$ changes sign (hand derivation); the green label is the general criterion [@thm-ch15-toeplitz-circle]. A boundary card separates the frozen results, the literature bound and the book's model reading (violet), and the open problems (red), following [@rem-ch15-rh-epistemology]. At $q=(2,1,3,-1)$ the six scalar parts $0,4,-4,8,4,0$ square to $112$ and give $\widehat T_5\chi_1(q)=-2/75=-\tfrac25\chi_1(q)$ (computed on screen); the green labels point to [@thm-ch15-hecke-t5-chi1-eigenvalue] and [@thm-ch15-hecke-t5-ramanujan-margin]. A bar chart shows the six exact values of $E_\ell(1/5)$ ([@thm-ch15-lps-hecke-trace-formula], [@thm-ch15-lps-hecke-traces]), and reading them as shell traces is marked as argued; the corner entries $64$ of the degree-four matrix light up in amber, with the five eigenlines and margins from [@thm-ch15-lps-ramanujan-margins] and [@thm-ch15-lps-degree-four-eigenbasis]. The last scene draws the tree-like radius-$3$ ball of $X^{5,13}$ and one amber $8$-cycle (computed on screen); the bound of $19$ on the squared singular values is the exact certificate of [@ex-ch15-x513-certificate].
:::

A natural leap now launches Volume VI: **if the six norm-$5$ integer spinors $S_5$ both generate a collision-free non-abelian word tree $F_3$ and achieve optimal rational spectral mixing, what happens when an observer executes their rational right fractions directly as a programming instruction set?** That step opens [Chapter 16](ch16-omega-fractran-and-nonabelian-stack.md), lifting Conway's scalar FRACTRAN into the three-dimensional non-abelian spinor machine $\Omega\text{-FRACTRAN}$. Readers can explore the live bridge between the norm-$5$ Hecke spectral gap and the $\Omega\text{-FRACTRAN}$ spinor stack in the interactive workbench card below.

::: {.viz src="omega-math-workbench" preset="hecke-p5-and-omega-fractran" height="520"}
**Norm-5 Hecke spectral gap and $\Omega\text{-FRACTRAN}$ spinor-stack workbench card (`hecke-p5-and-omega-fractran`).** Adjust any nonzero integer test quaternion $\mathbf{q} = (w, x, y, z)$ (default `(2, 1, 3, -1)`) to watch the six norm-$5$ Hurwitz jumps $S_5$ verify the universal eigenvalue identity $(\widehat{T}_5 \chi_1)(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$ and exact rational Ramanujan PSD margin $4\cdot 5 - (-\frac{2}{5})^2 = \frac{496}{25} > 0$ (contrasted with $\chi_2$, which splits across multiple ratios rather than remaining a single scalar eigenfunction of the six-jump sum), then toggle to the $\Omega\text{-FRACTRAN}$ divisibility gate to separate equal-norm opposite words `XY` and `YX`, bridging Volume V directly into Volume VI.
:::
