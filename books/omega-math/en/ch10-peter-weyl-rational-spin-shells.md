# Chapter 10 Peter–Weyl Rational Spin Shells and Integer Chebyshev Kernels

> *"Return a wave to the compact, interior-only three-sphere, and a diverging continuum of frequencies crystallizes at once into a discrete spin ladder while transcendental exponentials collapse into integer Chebyshev polynomials."*

Volume III ([Chapter 7](ch07-second-order-jet-calculus.md)–[Chapter 9](ch09-telescoping-stokes-and-arc-manifold.md)) evicted the ghost of limits from calculus: inside nilpotent jet rings and telescoping heap sums, differentiation and integration became finite rational algebra. With this chapter, Volume IV enters the heartland of harmonic analysis—identifying the spectral shells of the classical real three-sphere and expressing their exact integer-spin readouts as rational polynomials.

Standard textbooks present the flat Fourier transform as a universal master key without asking a genealogical question: why should decomposing a periodic or localized wave force us onto an unbounded straight line, swallowing $\pi$, $e$, continuous ultraviolet frequencies, and truncation ringing? The answer mirrors the diagnosis of Volume I: flat Fourier analysis is merely the tangent-line approximation obtained by violently flattening a closed three-sphere. Once functions live directly on the classical compact group of real unit quaternions $S^3(1)\cong\mathrm{SU}(2)$, the Peter–Weyl decomposition immediately quantizes the spectrum into discrete half-integer spin shells, and every integer-spin spherical character collapses into an integer-coefficient Chebyshev polynomial in the fidelity $\kappa$; the Chebyshev Pell and doubling identities, even-shell square-root elimination and odd-shell signed factorization, the spin-$2$ character formula, the all-degree integer-spin Clebsch–Gordan character product law, and the rational $5d^{10}/5d^8$ orbital quadrupole balance are all proved in D5 on the strict backend (`strict_omega.axioms: []`).

---

## 10.1 Abolishing the Open-Line Fourier Integral: Why Compact Three-Spheres Quantize Spectra {#sec-ch10-flat-fourier-pathology}

Inspect the flagship formula of classical one-dimensional Fourier analysis:

$$
\widehat{f}(\xi) \;=\; \int_{-\infty}^{+\infty} f(x)\,e^{-\hat{\mathbf{i}}2\pi\xi x}\,dx.
$$

Packed inside this single integral are all the structural pathologies of flat continuum analysis:

1. **Open-line ultraviolet divergence and Gibbs ringing**: Because the domain $(-\infty, +\infty)$ never closes, the dual frequency $\xi$ stretches continuously to infinity; imposing a sharp Dirichlet bandwidth cutoff leaves permanent Wilbraham–Gibbs ringing at every jump discontinuity, with limiting overshoot locked at $\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx 8.9490\%$.
2. **Transcendental kernel and abelian blindness**: The exponential kernel $e^{-\hat{\mathbf{i}}2\pi\xi x}$ entangles both transcendental constants $e$ and $\pi$, requiring infinite series and real completeness merely to evaluate; worse still, scalar exponentials commute ($e^{\hat{\mathbf{i}}\xi_1 x}e^{\hat{\mathbf{i}}\xi_2 x} = e^{\hat{\mathbf{i}}(\xi_1+\xi_2)x}$), encoding one-dimensional flat translation while remaining completely blind to non-commutative three-dimensional rotation order and second-order curvature.
3. **Why the two-sphere $S^2$ falls short by one step**: Classical spherical harmonics $Y_\ell^m(\vartheta, \varphi)$ reach a compact sphere, yet collide with the non-vanishing Euler characteristic $\chi(S^2) = 2 \neq 0$ (the hairy-ball obstruction). Because $S^2$ is neither a Lie group nor a heap, writing associated Legendre polynomials requires pinning an artificial north–south polar axis, creating coordinate singularities at both poles and excluding half-integer spinor shells altogether.

For harmonic analysis we take the classical compact model $S^3(1)\cong\mathrm{SU}(2)$ discussed in [Chapter 3](ch03-canonical-ternion-manifold.md) and [Chapter 4](ch04-heaps-and-lie-triple-curvature.md). $S^3$ is compact and interior-only, has zero Euler characteristic, is globally parallelizable, and carries a non-abelian group and heap product. Any wave traversing the sphere must close seamlessly in phase, forcing the dual spectrum to contract from an unbounded continuum into the discrete half-integer spin ladder $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2, \dots\}$.

In the classical shadow layer of compact-group representation analysis, this spectral discretization rests on three theorems verified by the Lean kernel. First, finite-dimensional unitary representations separate arbitrarily fine neighborhoods of the identity.

::: {.theorem #thm-ch10-unitary-kernel-separation title="Unitary Representation Kernel Separation on Compact Groups" lean="D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset"}
Let $G$ be a compact topological group and $U \subseteq G$ any neighborhood of the identity $1$. Then there exist a natural number $n \in \mathbb{N}$ and a continuous finite-dimensional unitary matrix representation $\rho : G \to U(n, \mathbb{C})$ whose kernel lies inside $U$: for every $g \in G$, $\rho(g) = I_n$ implies $g \in U$.
:::

::: {.proof}
Equip $G$ with its Borel structure and normalized Haar measure $\mu$, choose a continuous bump function $\varphi$ supported in a sufficiently small symmetric neighborhood, and build the associated compact convolution operator $T$ and self-adjoint compact positive operator $S = T T^\dagger$. Because $S$ commutes with the left regular representation, every nonzero eigenspace of $S$ is finite-dimensional and carries a continuous unitary subrepresentation. Each point outside $U$ is separated from $1$ on some finite-dimensional eigenspace; compactness extracts a finite direct sum whose kernel is contained in $U$. The full proof is checked by the Lean kernel.
:::

Once finite-dimensional unitary representations separate points, Stone–Weierstrass approximation delivers the analytic core of Peter–Weyl theory: every continuous function on a compact group is uniformly approximated by finite linear combinations of finite-dimensional unitary matrix coefficients.

::: {.theorem #thm-ch10-matrix-coeff-density title="Peter–Weyl Uniform Density of Unitary Matrix Coefficients" lean="D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients"}
Let $G$ be a compact topological group (with no Hausdorff separation axiom assumed). Then the complex linear span of all matrix coefficient functions $g \mapsto \rho(g)_{ij}$ arising from continuous finite-dimensional unitary representations $\rho : G \to U(n, \mathbb{C})$ is uniformly dense in $C(G, \mathbb{C})$.
:::

::: {.proof}
Passing to the separation quotient reduces the claim to a compact Hausdorff group. The span of unitary matrix coefficients contains constants (via the trivial one-dimensional representation), is closed under pointwise multiplication (via tensor products of representations), and is closed under complex conjugation (via conjugate unitary representations), forming a unital star-subalgebra of $C(G, \mathbb{C})$. Given distinct points $x \neq y$, applying [@thm-ch10-unitary-kernel-separation] to the complement of $\{x y^{-1}\}$ yields a matrix entry taking different values at $x$ and $y$. Complex Stone–Weierstrass concludes uniform density. The full proof is checked by the Lean kernel.
:::

How many independent degrees of freedom live inside each irreducible spin shell? The next theorem fixes the exact sum-of-squares dimension law by pure linear algebra.

::: {.theorem #thm-ch10-character-kernel-rank title="Sum-of-Squares Dimension of Character Kernel Spans" lean="D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel"}
Let $k$ be an algebraically closed field, $G$ a group, $\{\rho_i : G \to \mathrm{GL}_k(W_i)\}_{i \in \iota}$ a finite family of pairwise inequivalent finite-dimensional irreducible representations, and $c : \iota \to k$ an everywhere nonzero weight function. Then the $k$-linear span of the translated character kernel sections

$$
y \;\longmapsto\; \Bigl(x \;\mapsto\; \sum_{i \in \iota} c_i\,\chi_{\rho_i}(x y^{-1})\Bigr)
$$

inside $G \to k$ has dimension exactly

$$
\dim_k \operatorname{span}_k \Bigl\{\, x \mapsto \sum_{i \in \iota} c_i\,\chi_{\rho_i}(x y^{-1}) \;\Big|\; y \in G \,\Bigr\} \;=\; \sum_{i \in \iota} (\dim_k W_i)^2.
$$

:::

::: {.proof}
Define the linear map $\Phi : \prod_{i \in \iota} \operatorname{End}_k(W_i) \to (G \to k)$ by $\Phi(A)(x) = \sum_i c_i \operatorname{Tr}(\rho_i(x) A_i)$. By multiplicativity of each representation, the kernel sections are precisely the images of $\{\rho_i(y^{-1})\}_i$ under $\Phi$. Since the $\rho_i$ are pairwise inequivalent irreducibles over an algebraically closed field, Burnside–Wedderburn implies that $\{\rho_i(g)\}_i$ spans the entire product algebra $\prod_i \operatorname{End}_k(W_i)$; meanwhile, nonvanishing weights $c_i \neq 0$ and nondegeneracy of the trace pairing make $\Phi$ injective. Hence the span is isomorphic to $\prod_i \operatorname{End}_k(W_i)$, whose dimension is $\sum_i (\dim_k W_i)^2$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch10-peter-weyl-su2-literature title="Peter–Weyl Decomposition and Gibbs Truncation Boundary (Literature Result)"}
**Literature result, not formalized in this book.** For the compact simply connected Lie group $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$, all finite-dimensional irreducible representations are uniquely indexed by half-integer spins $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2, \dots\}$, where $\mathcal{V}_j \cong \operatorname{Sym}^{2j}(\mathbb{C}^2)$ has dimension $2j + 1$. The Peter–Weyl theorem (F. Peter and H. Weyl, *Math. Ann.* **97**, 737–755, 1927; E. P. Wigner, 1931) yields the Hilbert-space orthogonal decomposition

$$
L^2(S^3(\mathbb{R})) \;\cong\; \widehat{\bigoplus_{2j = 0}^{\infty}} \;\mathcal{V}_j \otimes \mathcal{V}_j^*, \qquad \dim_{\mathbb{C}}(\mathcal{V}_j \otimes \mathcal{V}_j^*) \;=\; (2j + 1)^2,
$$

matching the shell-by-shell square-dimension count of [@thm-ch10-character-kernel-rank]. The flat Dirichlet limiting overshoot $\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx 8.9490\%$ is due to Wilbraham (1848) and Gibbs (1898–1899); antipodal refocusing of sharp spherical cutoffs on $S^3$ was established by Pinsky (1994) and Taylor (1997), while zero-overshoot positivity-preserving smoothing via Fejér and Jackson kernels originates with Fejér (1900) and Jackson (1912).
:::

---

## 10.2 The First Three Fundamental Shells: Past, Present, Future, and Doubling Fusion {#sec-ch10-causal-triad-shells}

Arranging the Peter–Weyl spectrum of $S^3(\mathbb{R})$ by ascending dimension reveals that the first three shells—$j = 0$ (dimension $1$), $j = \frac{1}{2}$ (dimension $2$), and $j = 1$ (dimension $3$)—are not an accidental list of special functions. They lock one-to-one onto the Past (zeroth-order anchor), Present (first-order tangent), and Future (second-order curvature) causal mother kernel of [Chapter 7](ch07-second-order-jet-calculus.md).

For a nonzero real quaternion $p=(w,x,y,z)$ choose the signed unit quaternion $q=p/\lVert p\rVert\in S^3(\mathbb{R})$. Its projective fidelity relative to the anchor $p_0=(1,0,0,0)$ is

$$
\kappa(p_0, p) \;=\; \frac{w^2}{w^2 + x^2 + y^2 + z^2} \;=\; \frac{w^2}{\lVert p\rVert^2} \;\in\; [0, 1].
$$

Write $c=\operatorname{Re}(q)=w/\lVert p\rVert$. Then $\kappa=c^2$, and the Weyl character formula gives $\chi_j(q)=\Tr D^j(q)=U_{2j}(c)$ for every $j\in\frac12\mathbb{N}$. Rational homogeneous coordinates give rational $\kappa$. On the real group, $\kappa$ ranges over all of $[0,1]$.

::: {.definition #def-ch10-causal-spin-shells title="The First Three Spin Shells and Causal Mother-Kernel Correspondence"}
On the real unit quaternion group, with projective fidelity $\kappa \in [0,1]$ as a conjugacy invariant, define the three fundamental spin-shell character kernels (with the causal triad reading marked as a theoretical model):

1. **Monopole DC shell $j = 0$ ($\dim \mathcal{V}_0 = 1$, bilateral shell dimension $1^2 = 1$)**: constant character $\chi_0(\kappa) \equiv 1$, carrying the rotation-invariant global average and **Past DC memory anchor**;
2. **Fundamental spinor shell $j = \frac{1}{2}$ ($\dim \mathcal{V}_{1/2} = 2$, bilateral shell dimension $2^2 = 4$)**: one-sided character $\chi_{1/2}(q) = 2c$ tracking the double-cover sign flip $q \mapsto -q$, whose **squared kernel** collapses to the pure linear monomial $\chi_{1/2}^2(\kappa) = 4\kappa$, carrying the first-order **Present Dirac spinor slice**;
3. **Three-dimensional adjoint curvature shell $j = 1$ ($\dim \mathcal{V}_1 = 3$, bilateral shell dimension $3^2 = 9$)**: descending to the projective quotient $\mathrm{SO}(3) \cong S^3(\mathbb{R})/\{\pm 1\}$ as the exact integer linear polynomial $\chi_1(\kappa) = 4\kappa - 1$, carrying the second-order **Future 3D adjoint curvature field**.
:::

These three shells are welded together by a single elementary polynomial identity:

$$
\chi_{1/2}^2(\kappa) \;=\; 4\kappa \;\equiv\; 1 \;+\; (4\kappa - 1) \;=\; \chi_0(\kappa) \;+\; \chi_1(\kappa).
$$

In representation theory, this is the $\mathrm{SU}(2)$ **Clebsch–Gordan doubling fusion law** (dimension count $2 \times 2 = 1 + 3$):

$$
\mathcal{V}_{1/2} \otimes \mathcal{V}_{1/2} \;\cong\; \mathcal{V}_0 \;\oplus\; \mathcal{V}_1.
$$

Its geometric meaning goes straight to the physical intuition: coupling two "Present" $j = \frac{1}{2}$ spinor slices ("a relation of relations") splits cleanly into an antisymmetric determinant singlet that crystallizes as a rotation-invariant $j = 0$ Past memory anchor (dimension $1$) plus a symmetric traceless triplet that excites the $j = 1$ Future three-dimensional adjoint curvature field (dimension $3$). Evaluating at the pure integer three-beat closing spinor $g_{120} = (1, 1, 1, 1)$ ([Chapter 3](ch03-canonical-ternion-manifold.md) and [Chapter 5](ch05-rational-cayley-rotations.md)), where $\lVert g_{120}\rVert^2 = 4$ and $\kappa = \frac{1}{4}$, immediately gives

$$
\chi_1\!\left(\frac{1}{4}\right) \;=\; 4 \cdot \frac{1}{4} - 1 \;=\; 0,
$$

certifying the exact zero-trace orthogonal node of a $120^\circ$ rotation without a single decimal or trigonometric function. The table below summarizes the divide separating flat $\mathbb{R}$, the two-sphere $S^2$, and the group of signed real unit quaternions $S^3(\mathbb{R})$.

| Structural Dimension | Flat Fourier Transform ($\mathbb{R}$) | Two-Sphere Harmonics ($S^2, Y_\ell^m$) | Peter–Weyl spectrum ($\mathrm{SU}(2)$) |
| :--- | :--- | :--- | :--- |
| **Underlying space** | Open non-compact line $(-\infty, +\infty)$ | Compact non-group ($\chi(S^2) = 2$) | Compact group of signed real unit quaternions $S^3(\mathbb{R})$ |
| **Spectrum topology** | Continuous unbounded $\xi \in \mathbb{R}$ | Integer orbital momenta $\ell \in \mathbb{N}$ only | Complete half-integer shells $j \in \frac{1}{2}\mathbb{N}$, dim $(2j+1)^2$ |
| **Transform kernel** | Transcendental $e^{-\hat{\mathbf{i}}2\pi\xi x}$ | Associated Legendre with polar singularities | Matrix coefficients $D^j_{ab}(q)$. The matrix trace $\chi_j(q)=\Tr D^j(q)=U_{2j}(c)$ gives the character, equal to $E_n(\kappa)$ for integer $j=n$. |
| **Lowest harmonics** | No discrete fundamental mode | $\ell = 0$ scalar, $\ell = 1$ polar vector | $j = 0$ Past anchor, $j = \frac{1}{2}$ Present spinor, $j = 1$ Future field |
| **Convolution law** | Origin-dependent abelian product | No intrinsic group convolution | $L^1$ ternary convolution with normalized Haar measure on $\mathrm{SU}(2)$ $\to \widehat{f}_j \widehat{g}_j^\dagger \widehat{h}_j$ |

---

## 10.3 Even-Degree Chebyshev Polynomials $E_n(\kappa)$: Eliminating Square Roots Across All Integer Spin Shells {#sec-ch10-even-chebyshev-kernels}

Why do second-kind Chebyshev polynomials emerge intrinsically from the ternion three-sphere rather than being imported from an external handbook? Because equal-step heap reflection *is* the generating engine of Chebyshev polynomials. The following theorem, verified by the Lean kernel, binds cubic quaternion heap recurrences directly to both Chebyshev families.

::: {.theorem #thm-ch10-heap-chebyshev-recurrence title="Equivalence of Quaternion Heap Recurrence and Chebyshev Formulas" lean="D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev"}
Let $x : \mathbb{N} \to \mathbb{H}[\mathbb{R}]$ be a sequence of real quaternions, set $c := \langle x_0, x_1\rangle_{\mathbb{R}}$, and adopt the convention $U_{-1} := 0$. Then $x$ satisfies unit normalization and the cubic heap reflection recurrence

$$
\operatorname{normSq}(x_0) = 1, \qquad \operatorname{normSq}(x_1) = 1, \qquad \forall n \in \mathbb{N},\;\; x_{n+2} = x_{n+1}\bar{x}_n x_{n+1},
$$

if and only if for every $n \in \mathbb{N}$ simultaneously

$$
\operatorname{normSq}(x_n) = 1, \qquad x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0, \qquad \langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c),
$$

where $T_n$ and $U_n$ denote the integer-coefficient Chebyshev polynomials of the first and second kind.
:::

::: {.proof}
On unit quaternions, reflection satisfies the algebraic identity $u \bar{v} u = 2\langle u, v\rangle_{\mathbb{R}}\,u - \operatorname{normSq}(u)\,v$. In the forward direction, induction preserves $\operatorname{normSq}(x_n) = 1$ and constant adjacent inner product $\langle x_n, x_{n+1}\rangle_{\mathbb{R}} = c$, reducing the cubic recurrence to the linear two-step recurrence $x_{n+2} = 2c\,x_{n+1} - x_n$, which matches the defining recurrence of $U_n$; taking the inner product with $x_0$ and applying $T_n(c) = U_n(c) - c U_{n-1}(c)$ gives $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c)$. Conversely, the Chebyshev formulas force constant adjacent inner product $c$ and recover the cubic reflection rule. The full proof is checked by the Lean kernel.
:::

[@thm-ch10-heap-chebyshev-recurrence] shows that $U_m(c)$ is an integer polynomial in the half-angle cosine $c$. Yet on the canonical representatives `CanonProjTernion`, the native square-root-free observable is not $c = \pm\sqrt{\kappa}$ but its square $\kappa = c^2 \in \mathbb{Q} \cap [0, 1]$. Had $U_{2n}(c)$ contained any odd power $c^{2k+1}$, high-spin characters would force irrational square roots $\sqrt{\kappa}$. Fortunately, for **every integer spin** $j = n \in \mathbb{N}$, the even-index polynomial $U_{2n}(c)$ is an even function of $c$, containing only even powers. We may therefore bypass $c$ and $\sqrt{\kappa}$ altogether and define the even-Chebyshev family $E_n(\kappa)$ directly inside the integer polynomial ring $\mathbb{Z}[\kappa]$.

::: {.definition #def-ch10-even-chebyshev title="Even-Degree Integer Chebyshev Character Polynomials"}
Inside the integer polynomial ring $\mathbb{Z}[\kappa]$, define the polynomial sequence $\{E_n(\kappa)\}_{n \in \mathbb{N}}$ by the two-step linear recurrence

$$
E_0(\kappa) \;=\; 1, \qquad E_1(\kappa) \;=\; 4\kappa - 1, \qquad E_{n+1}(\kappa) \;=\; (4\kappa - 2)\,E_n(\kappa) - E_{n-1}(\kappa) \quad (n \ge 1).
$$

:::

We now prove the **universal square-root elimination identity $E_n(c^2) = U_{2n}(c)$** by elementary algebra with zero trigonometry. For $n = 0$, $E_0(c^2) = 1 = U_0(c)$; for $n = 1$, $U_1(c) = 2c$ yields $U_2(c) = 2c\,U_1(c) - U_0(c) = 4c^2 - 1 = E_1(c^2)$. Assume $E_k(c^2) = U_{2k}(c)$ holds for all $k \le n$ with $n \ge 1$. Applying $U_{m+1}(c) = 2c\,U_m(c) - U_{m-1}(c)$ twice gives

$$
\begin{aligned}
U_{2n+2}(c) &\;=\; 2c\,U_{2n+1}(c) - U_{2n}(c) \\
&\;=\; 2c\bigl(2c\,U_{2n}(c) - U_{2n-1}(c)\bigr) - U_{2n}(c) \\
&\;=\; (4c^2 - 1)\,U_{2n}(c) - 2c\,U_{2n-1}(c).
\end{aligned}
$$

Meanwhile, the same recurrence at index $2n$ reads $U_{2n}(c) = 2c\,U_{2n-1}(c) - U_{2n-2}(c)$, so $2c\,U_{2n-1}(c) = U_{2n}(c) + U_{2n-2}(c)$. Substituting into the display eliminates the odd-index term $U_{2n-1}(c)$ completely:

$$
U_{2n+2}(c) \;=\; (4c^2 - 1)\,U_{2n}(c) - \bigl(U_{2n}(c) + U_{2n-2}(c)\bigr) \;=\; (4c^2 - 2)\,U_{2n}(c) - U_{2n-2}(c).
$$

By the inductive hypothesis, the right-hand side equals $(4c^2 - 2)\,E_n(c^2) - E_{n-1}(c^2) = E_{n+1}(c^2)$, completing the induction. Consequently, **every integer-spin spherical character $\chi_j(\kappa) = E_j(\kappa)$ ($j = 0, 1, 2, 3, \dots$) is a pure integer polynomial in $\kappa$, banishing $\sqrt{\kappa}$ universally across all integer shells**.

For $j=n+\frac12$, the signed character is $U_{2n+1}(c)=c\,\operatorname{oddFactor}_n(\kappa)$. Changing $q$ to $-q$ reverses its sign. The projective reading determines its absolute value $\sqrt{\kappa}\,\lvert\operatorname{oddFactor}_n(\kappa)\rvert$ and its square $\kappa\,\operatorname{oddFactor}_n(\kappa)^2$. Rational homogeneous inputs give rational values for the square and for every integer-spin character. For $p=(1,1,0,0)$ the fundamental character has absolute value $\sqrt{2}$ even though $\kappa=1/2$. In the monomial basis of $\operatorname{Sym}^{2j}(\mathbb C^2)$, each matrix coefficient is homogeneous of degree $2j$ in the unit quaternion coordinates. Pairing a coefficient with a conjugate coefficient gives denominator $\lVert p\rVert^{4j}=(\lVert p\rVert^2)^{2j}$ on integer input, so this bilateral readout also cancels the root and the choice of sign.

All five single-shell algebraic laws of this Chebyshev engine—the signed Pell relation, first-kind index doubling, universal square-root elimination across all integer spin shells, signed factorization across all half-integer spin shells, and the rational spin-$2$ character formula—are proved in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch10-zero-axiom-chebyshev-shells title="Chebyshev Pell, Doubling, Even-Odd Spin-Shell Elimination, and Spin-Two Character" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.pell_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.chebyshev_doubling D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.even_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.odd_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.spin_two_character"}
The cited D5 declarations record `strict_omega.axioms: []`. Writing $T_n(x)$ and $U_n(x)$ for the first- and second-kind Chebyshev polynomials, $E_n(k)$ for the even-shell polynomial, and $\operatorname{oddFactor}_n(k)$ for the odd-shell factor polynomial, the following five theorems hold:

1. **Signed Pell relation** (`pell_chebyshev`): for all `x : Omega.Int` and `n : Omega.Nat`, exact integer equality holds:

   $$
   T_{n+1}(x)^2 - (x^2 - 1)\,U_n(x)^2 \;=\; 1.
   $$

2. **First-kind index doubling** (`chebyshev_doubling`): for all `x : Omega.Int` and `n : Omega.Nat`, exact integer equality holds:

   $$
   T_{2n}(x) \;=\; 2\,T_n(x)^2 - 1.
   $$

3. **Universal even-shell square-root elimination** (`even_chebyshev`): for all `x : Omega.Int` and `n : Omega.Nat`, exact integer equality holds:

   $$
   E_n(x^2) \;=\; U_{2n}(x).
   $$

4. **Odd-shell signed factor structure** (`odd_chebyshev`): for all `x : Omega.Int` and `n : Omega.Nat`, exact integer equality holds:

   $$
   x \cdot \operatorname{oddFactor}_n(x^2) \;=\; U_{2n+1}(x).
   $$

5. **Rational spin-two character** (`spin_two_character`): for every `k : Omega.FiniteRatio`, under `Omega.FiniteRatio.Equivalent`,

   $$
   E_2(k) \;\equiv\; 16 k^2 - 12 k + 1.
   $$

:::

::: {.proof}
All five statements are proved inside `module` + `prelude` files from the three-term Chebyshev recurrences over an abstract commutative ring and instantiated at `intRing` and `rationalRing`. Item 1 substitutes $T_{n+1}(x) = U_{n+1}(x) - x U_n(x)$ to rewrite the left-hand side as the recurrence invariant $U_{n+1}(x)^2 - 2x U_{n+1}(x) U_n(x) + U_n(x)^2$, which induction reduces to its base value $1$; Item 2 follows by induction from the Chebyshev composition recurrence and Item 1; Item 3 formalizes the two-step odd-index elimination induction above; Item 4 extracts the leading factor $x$ inductively via $U_{2n+1}(x) = 2x U_{2n}(x) - U_{2n-1}(x)$ and Item 3; Item 5 expands $E_2(k) = (4k - 2)(4k - 1) - 1$ directly inside `rationalRing` to $16k^2 - 12k + 1$ under `Omega.FiniteRatio.Equivalent`. The full proof is checked by the Lean kernel.
:::

Beyond single-shell identities, the **all-degree integer-spin Clebsch–Gordan character fusion law**—generalizing the low-degree doubling rule of §10.2 to every pair of integer spins $(m, n) \in \mathbb{N}^2$—is likewise proved coefficientwise in D5 on the strict backend (`strict_omega.axioms: []`).

::: {.theorem #thm-ch10-even-char-product-sum title="All-Degree Even-Character Clebsch–Gordan Product Law" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.evenChar_product_sum"}
The cited D5 declarations record `strict_omega.axioms: []`. Represent the $r$-th even-degree character polynomial $E_r(\kappa)$ of [@def-ch10-even-chebyshev] (matching the degree-$2r$ Chebyshev character $U_{2r}(\sqrt{\kappa})$) in ascending powers of $\kappa$ as the rational coefficient list `evenCharPoly r : CoefficientList`, and let `evenCharProductSum m n` denote the coefficient list of the inclusive character sum $\sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa)$ (starting at `gap m n` $= \lvert m - n\rvert$ across `span m n` $= 2\min(m, n)$ steps up to $\lvert m - n\rvert + 2\min(m, n) = m + n$). Then for all natural numbers $m, n \in \mathbb{N}$, polynomial multiplication agrees coefficientwise with the inclusive sum under `Poly.RatioSame` (with omitted trailing entries interpreted as $0$, and each degree-$k$ entry related by `Omega.IntRatio.Equivalent`):

$$
E_m(\kappa)\,E_n(\kappa) \;\equiv\; \sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa).
$$
:::

::: {.proof}
Working first on integer coefficient lists `Poly`, handle the ordered case $n = d + m$ (where $\lvert m - n\rvert = d$ and $m + n = d + 2m$) by two-step induction on $m$. The base case $m = 0$ is $E_0 E_d = E_d$, and $m = 1$ rewrites $E_1(\kappa) = 4\kappa - 1 = (4\kappa - 2) + 1$ so the defining recurrence yields $E_1 E_{d+1} = E_{d+2} + E_{d+1} + E_d$. In the inductive step, multiplying $E_{m+2} = (4\kappa - 2)E_{m+1} - E_m$ by $E_n$ applies the linear recurrence operator $(4\kappa - 2)$ term-by-term to $\sum_{r = d+1}^{d+2m+1} E_r$, producing $\sum_{r = d+2}^{d+2m+2} E_r + \sum_{r = d}^{d+2m} E_r$; subtracting the lower inductive sum $\sum_{r = d+2}^{d+2m} E_r$ telescopes the interior overlap cleanly to $\sum_{r = d}^{d+2m+2} E_r$. For arbitrary $m, n \in \mathbb{N}$, order trichotomy writes either $n = d + m$ or $m = d + n$, and polynomial commutativity together with symmetry of the endpoints $\lvert m - n\rvert$ and $m + n$ reduces the second case to the first. Finally, `Poly.ratios_mul` lifts coefficientwise integer equality (`Poly.Same`) to `Poly.RatioSame` on `CoefficientList`. The full proof is checked by the Lean kernel.
:::

In [Chapter 11](ch11-pi-free-haar-integration.md), this zero-axiom all-degree polynomial fusion identity serves as the exact algebraic master switch locking $\pi$-free Peter–Weyl orthonormality across all integer spin shells.

::: {.example #ex-ch10-spin-character-table title="Exact Evaluation Ledger of Low-Spin Character Kernels at Canonical Rational Landmarks"}
Expanding [@def-ch10-even-chebyshev], [@thm-ch10-zero-axiom-chebyshev-shells], and [@thm-ch10-even-char-product-sum] gives the first four integer-spin characters and the first two half-integer squared kernels:

- $E_0(\kappa) = 1$, $E_1(\kappa) = 4\kappa - 1$,
- $E_2(\kappa) = (4\kappa - 2)(4\kappa - 1) - 1 = 16\kappa^2 - 12\kappa + 1$,
- $E_3(\kappa) = (4\kappa - 2)(16\kappa^2 - 12\kappa + 1) - (4\kappa - 1) = 64\kappa^3 - 80\kappa^2 + 24\kappa - 1$,
- $\chi_{1/2}^2(\kappa) = 4\kappa$, $\chi_{3/2}^2(\kappa) = \bigl(U_3(\sqrt{\kappa})\bigr)^2 = \bigl(8\kappa^{3/2} - 4\kappa^{1/2}\bigr)^2 = 16\kappa(2\kappa - 1)^2 = 64\kappa^3 - 64\kappa^2 + 16\kappa$.

Evaluating at the six canonical rational landmarks $\kappa \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, 0\}$ produces the exact ledger below:

| Character Kernel | $\kappa = 1$ | $\kappa = \frac{3}{4}$ | $\kappa = \frac{1}{2}$ | $\kappa = \frac{1}{3}$ | $\kappa = \frac{1}{4}$ | $\kappa = 0$ |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| $\chi_0(\kappa) = 1$ | $1$ | $1$ | $1$ | $1$ | $1$ | $1$ |
| $\chi_1(\kappa) = 4\kappa - 1$ | $3$ | $2$ | $1$ | $1/3$ | $0$ | $-1$ |
| $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ | $5$ | $1$ | $-1$ | $-11/9$ | $-1$ | $1$ |
| $\chi_3(\kappa) = 64\kappa^3 - 80\kappa^2 + 24\kappa - 1$ | $7$ | $-1$ | $-1$ | $13/27$ | $1$ | $-1$ |
| $\chi_{1/2}^2(\kappa) = 4\kappa$ | $4$ | $3$ | $2$ | $4/3$ | $1$ | $0$ |
| $\chi_{3/2}^2(\kappa) = 16\kappa(2\kappa - 1)^2$ | $16$ | $3$ | $0$ | $16/27$ | $1$ | $0$ |

Two exact rational zeros stand out immediately: $\chi_1(\frac{1}{4}) = 0$ at the three-beat spinor landmark, and $\chi_{3/2}^2(\frac{1}{2}) = 0$ on the orthogonal equator. At $q=1$, $\chi_j(q)=2j+1$. The table gives $1,3,5,7$ for the integer spins. The two lifts $q=\pm1$ both have $\kappa=1$, with $\chi_{1/2}(q)=\pm2$ and squared value $4$.
:::

---

## 10.4 Origin-Free Ternary Heap Convolution and the $j = 2$ Quadrupole Testbed {#sec-ch10-heap-convolution-and-quadrupole}

With discrete spin shells and integer-coefficient characters in hand, two operational questions remain: first, how does convolution work—and diagonalize—on an origin-free heap without a privileged identity element? Second, what concrete physical observable lives inside the next integer shell, the five-dimensional $j = 2$ quadrupole sector?

### 10.4.1 Spectral Block Diagonalization of Origin-Free Ternary Convolution {#sec-ch10-ternary-convolution}

Standard group convolution $(f * g)(w) = \mathbb{E}_x[f(x)g(x^{-1}w)]$ relies on the distinguished identity $1$ to form the inverse $x^{-1}$. The ternary product $[\mathbf{x}, \mathbf{y}, \mathbf{z}]$ itself needs no basepoint ([Chapter 4](ch04-heaps-and-lie-triple-curvature.md)). Here we use normalized Haar measure $\mu$ on the classical compact group $SU(2)\cong S^3(\mathbb{R})$, and product measure for expectations in several variables. For continuous complex-valued signals $f,g,h$, the integral below converges absolutely at every $\mathbf{w}$. For $f,g,h\in L^1(\mu)$, the same formula defines the **origin-free ternary heap convolution** almost everywhere:

$$
(f \circledast g \circledast h)(\mathbf{w}) \;:=\; \mathbb{E}_{\mathbf{x},\,\mathbf{y}}\!\Bigl[f(\mathbf{x})\,\overline{g(\mathbf{y})}\,h\bigl([\mathbf{y}, \mathbf{x}, \mathbf{w}]\bigr)\Bigr].
$$

For fixed $\mathbf{x},\mathbf{y}$, the map $\mathbf{w}\mapsto\mathbf{z}=[\mathbf{y},\mathbf{x},\mathbf{w}]$ is a Haar-preserving left translation with inverse $\mathbf{w}=[\mathbf{x},\mathbf{y},\mathbf{z}]$. By Tonelli's theorem, the integral of the absolute value of the integrand over $\mathbf{x},\mathbf{y},\mathbf{w}$ is exactly $\|f\|_1\|g\|_1\|h\|_1$. The convolution thus belongs to $L^1(\mu)$ and its equivalence class is independent of the representatives of the three inputs.

Let $D^j$ be the $(2j+1)$-dimensional unitary representation of spin $j$, so $D^j([\mathbf{x}, \mathbf{y}, \mathbf{z}]) = D^j(\mathbf{x})\,D^j(\mathbf{y})^\dagger\,D^j(\mathbf{z})$. Define the matrix Fourier coefficient $\widehat{f}_j := \mathbb{E}_{\mathbf{x}}[f(\mathbf{x})\,D^j(\mathbf{x})]$. The representation is bounded, so absolute integrability also holds entry by entry. Fubini's theorem and the same change of variables give the block formula by hand:

$$
\begin{aligned}
\widehat{(f \circledast g \circledast h)}_j
&\;=\; \mathbb{E}_{\mathbf{w}}\!\Bigl[(f \circledast g \circledast h)(\mathbf{w})\,D^j(\mathbf{w})\Bigr] \\
&\;=\; \mathbb{E}_{\mathbf{x},\,\mathbf{y},\,\mathbf{z}}\!\Bigl[
    f(\mathbf{x})\,\overline{g(\mathbf{y})}\,h(\mathbf{z})\,
    D^j(\mathbf{x})\,D^j(\mathbf{y})^\dagger\,D^j(\mathbf{z})\Bigr] \\
&\;=\; \widehat{f}_j\,\widehat{g}_j^\dagger\,\widehat{h}_j.
\end{aligned}
$$

Even a finite-valued Borel function can give a divergent integral. Take $g=h=1$ and $f(q)=(1-q_0)^{-2}$ for $q\ne 1$, where $q_0$ is the scalar part, with $f(1)=0$. Near the identity, use coordinates $q=(\sqrt{1-|u|^2},u)$. Then $1-q_0\le |u|^2$, and the Haar density relative to three-dimensional volume is bounded below by a positive constant there. The integral diverges by comparison with $\int_0^\epsilon r^{-2}\,dr$. Neither the convolution at any $\mathbf{w}$ nor the $j=0$ Fourier coefficient has a finite value.

Curved spatial transport, from three-dimensional rotational filtering to ternion-field attention $[\mathbf{Q}, \mathbf{K}, \mathbf{V}]$, unravels in Peter–Weyl frequency space into a product of three matrices on each spin shell. On finite non-Abelian groups, normalized Haar expectation is a finite average and the same block formula applies to all complex-valued functions. For example, the irreducible dimensions of the $8$-element quaternion group $Q_8$ satisfy $4 \times 1^2 + 2^2 = 8$, and the $24$-element Hurwitz binary tetrahedral group $2T$ has seven irreducible blocks with $3 \times 1^2 + 3 \times 2^2 + 3^2 = 24$ ([Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md)).

### 10.4.2 Condensed-Matter $j = 2$ Harmonics: Exact Rational $d^{10}$ vs $d^8$ Quadrupole Balance {#sec-ch10-d10-vs-d8-quadrupole}

Beyond the causal triad $\{0, \frac{1}{2}, 1\}$, the first higher integer shell is the five-dimensional quadrupole shell $j = 2$, governed by $E_2(\kappa) = 16\kappa^2 - 12\kappa + 1$. Condensed-matter physics provides a razor-sharp laboratory for this shell: the five real valence $5d$ orbitals $\{d_{z^2}, d_{xz}, d_{yz}, d_{xy}, d_{x^2-y^2}\}$ of heavy transition-metal gold ions span precisely the five-dimensional $j = 2$ harmonic shell.

Consider the traceless angular electric quadrupole operator on the unit sphere, $\widehat{Q}_{ab} = 3 n_a n_b - \delta_{ab}$ ($a, b \in \{x, y, z\}$, $\Tr\widehat{\mathbf{Q}} = 0$; physical electric quadrupole moments multiply by the radial charge factor $-e\langle r^2\rangle_{5d}$ and add ligand lattice contributions, standard ligand-field background). Computing the angular expectation of $\widehat{\mathbf{Q}}$ across all five normalized real $d$ harmonics produces nothing but exact rational fractions with denominator $7$—not a single $\pi$ or square root survives. Both the vanishing of the five-orbital and closed-$d^{10}$ diagonal sums and the exact trace-free $d^8$ diagonal `(-4/7, -4/7, +8/7)` are proved in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch10-zero-axiom-orbital-quadrupole title="Rational $d^{10}$ and $d^8$ Orbital Angular Quadrupole Balance" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.orbital_quadrupole D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.full_orbital_quadrupole"}
Each cited D5 declaration records `strict_omega.axioms: []` on the strict backend and `axioms: ["propext"]` on the official backend. Under signed exact ratio equivalence `Omega.IntRatio.Equivalent`, the diagonal angular quadrupole ledger of the five real $d$-orbitals satisfies:

1. **Closed $d^{10}$ vanishing and doubly-vacated $d^8$ trace-free diagonal** (`orbital_quadrupole`):

   - For every Cartesian axis $a \in \{x, y, z\}$ (`Orbitals.Axis`), the closed-shell diagonal entry vanishes: `Orbitals.closedShell a` $\equiv 0$;
   - Deleting a doubly occupied orbital leaves the exact rational diagonal

     $$
     \operatorname{deletedShell}(x) \equiv -\frac{4}{7}, \qquad \operatorname{deletedShell}(y) \equiv -\frac{4}{7}, \qquad \operatorname{deletedShell}(z) \equiv +\frac{8}{7},
     $$

     whose trace vanishes identically: $\operatorname{deletedShell}(x) + \operatorname{deletedShell}(y) + \operatorname{deletedShell}(z) \equiv 0$.

2. **Five-orbital sum vanishing on every axis** (`full_orbital_quadrupole`): for every Cartesian axis $a \in \{x, y, z\}$ (`Orbitals.Axis`), the equal-weight sum over the five real $d$-orbitals vanishes identically: `Orbitals.fullShell a` $\equiv 0$.
:::

::: {.proof}
Over the common denominator $7$, exact integer addition of the five real $d$-orbital diagonal entries gives $(-2) + 2 + (-4) + 2 + 2 = 0$ along $x$, $(-2) + (-4) + 2 + 2 + 2 = 0$ along $y$, and $4 + 2 + 2 + (-4) + (-4) = 0$ along $z$, establishing `full_orbital_quadrupole` under `Omega.IntRatio.Equivalent`; doubling for double occupation gives `closedShell a` $\equiv 0$ on every axis. Subtracting the doubly occupied orbital diagonal $(+\frac{4}{7}, +\frac{4}{7}, -\frac{8}{7})$ yields $(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7})$, whose numerators sum to $(-4) + (-4) + 8 = 0$, certifying zero trace. The full proof is checked by the Lean kernel.
:::

The figure below brings both pillars of the chapter into a single view: on the left, the square-root-free integer-spin Chebyshev character shells $E_0(\kappa), E_1(\kappa), E_2(\kappa), E_3(\kappa)$ across $\kappa \in [0, 1]$ together with their canonical rational landmarks; on the right, the exact rational contrast inside the five-dimensional $j = 2$ shell between the isotropic $5d^{10}$ closed shell and the trace-free $5d^8$ quadrupole diagonal $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$.

::: {.figure src="ch10-chebyshev-spin-shells"}
**Even-Chebyshev integer spin shells and $5d^{10}$ versus $5d^8$ quadrupole balance.** The left panel plots the integer-coefficient even-Chebyshev character polynomials $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ over $\kappa \in [0, 1]$ ([@def-ch10-even-chebyshev], [@thm-ch10-zero-axiom-chebyshev-shells]), highlighting the shell-dimension ladder $1, 3, 5, 7$ at $\kappa = 1$ and the three-beat rational node $E_1(\frac{1}{4}) = 0$. The right panel contrasts the axis-by-axis cancellation of the closed $5d^{10}$ shell against the exact trace-free rational quadrupole diagonal $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$ left when $d_{x^2-y^2}$ is vacated in $5d^8$ ([@thm-ch10-zero-axiom-orbital-quadrupole]).
:::

::: {.example #ex-ch10-d10-d8-quadrupole-ledger title="Exact Rational Angular Quadrupole Ledger of the Five-Dimensional $j = 2$ Shell"}
In Cartesian direction cosines $(n_x, n_y, n_z)$, every off-diagonal entry $\langle \widehat{Q}_{ab}\rangle$ ($a \neq b$) vanishes on each real $d$ harmonic (hand derivation), while the diagonal entries $(\langle \widehat{Q}_{xx}\rangle, \langle \widehat{Q}_{yy}\rangle, \langle \widehat{Q}_{zz}\rangle)$ form the exact rational ledger supporting [@thm-ch10-zero-axiom-orbital-quadrupole]:

| Real $d$ Orbital | Angular Form | $\langle \widehat{Q}_{xx}\rangle$ | $\langle \widehat{Q}_{yy}\rangle$ | $\langle \widehat{Q}_{zz}\rangle$ | Trace Check |
| :--- | :--- | ---: | ---: | ---: | ---: |
| $d_{z^2}$ | $\propto 3n_z^2 - 1$ | $-2/7$ | $-2/7$ | $+4/7$ | $0$ |
| $d_{xz}$ | $\propto n_x n_z$ | $+2/7$ | $-4/7$ | $+2/7$ | $0$ |
| $d_{yz}$ | $\propto n_y n_z$ | $-4/7$ | $+2/7$ | $+2/7$ | $0$ |
| $d_{xy}$ | $\propto n_x n_y$ | $+2/7$ | $+2/7$ | $-4/7$ | $0$ |
| $d_{x^2 - y^2}$ | $\propto n_x^2 - n_y^2$ | $+2/7$ | $+2/7$ | $-4/7$ | $0$ |
| **Equal-weight sum** | **$j = 0$ closed shell** | **$0$** | **$0$** | **$0$** | **$0$** |

Two oxidation states now contrast with crystalline precision:

1. **Monovalent gold $\mathrm{Au}^+$ ($5d^{10}$ closed shell)**: Double occupation of all five $d$ orbitals weights every row equally by $2$; column sums cancel identically to the $j = 0$ isotropic scalar ball, yielding $\mathbf{Q}(5d^{10}) = \mathbf{0}_{3\times 3}$.
2. **Square-planar trivalent gold $\mathrm{Au}^{3+}$ ($5d^8$ crystal-field slice)**: Strong $D_{4h}$ square-planar splitting pushes the in-plane antibonding orbital $5d_{x^2-y^2}$ up in energy and evacuates its two electrons, subtracting $2\,\mathbf{Q}(d_{x^2-y^2}) = \diag(+\frac{4}{7}, +\frac{4}{7}, -\frac{8}{7})$ from the closed shell to leave the exact traceless rational quadrupole tensor

   $$
   \mathbf{Q}_{\mathrm{phys}}(5d^8) \;=\; \mathbf{Q}(5d^{10}) - 2\,\mathbf{Q}(d_{x^2-y^2}) \;=\; \diag\!\left(-\frac{4}{7},\; -\frac{4}{7},\; +\frac{8}{7}\right) \;=\; \frac{12}{7}\,\diag\!\left(-\frac{1}{3},\; -\frac{1}{3},\; +\frac{2}{3}\right).
   $$

A single $5d^8$ coordination center is therefore intrinsically strongly anisotropic; only when an unoriented polycrystalline powder is Haar-averaged over $\mathrm{SO}(3)$ (equivalently over its signed double cover $\mathrm{SU}(2)$) does the traceless $j = 2$ harmonic average identically to $\langle\mathbf{Q}_{\mathrm{phys}}(5d^8)\rangle_{\mathrm{Haar}} = \mathbf{0}_{3\times 3}$, restoring macroscopic statistical isotropy.
:::

The film below threads the chapter's four strands (the closed spectrum, the first three shells, even-Chebyshev root elimination and the $j = 2$ quadrupole testbed) into one continuous explanation.

::: {.film src="spin-shells-on-the-three-sphere"}
**Put waves back on the three-sphere and every integer-spin character becomes an integer polynomial with no square roots (2 min 52 s).** The film sets a wave on the open line beside a wave that closes on a loop (schematic), then lists the ladder of spin shells $j$ with $(2j+1)^2$ functions each ([@rem-ch10-peter-weyl-su2-literature], a literature result), with a green tag on [@thm-ch10-matrix-coeff-density]. Three shell cards read $1$, $4\kappa$ and $4\kappa - 1$; the violet labels past, present and future are a model reading, while $4\kappa = 1 + (4\kappa - 1)$, $2 \times 2 = 1 + 3$ and $\chi_1(\frac{1}{4}) = 0$ at the integer rotor $(1, 1, 1, 1)$ are computed on screen. Beside the curves $E_0$ to $E_3$ and the exact table on six rational landmarks (computed, as in [@ex-ch10-spin-character-table]), green tags point to root elimination, the odd-shell factorization and the spin-two character in [@thm-ch10-zero-axiom-chebyshev-shells]; at $p = (1, 1, 0, 0)$ the spinor character is $\pm\sqrt{2}$ with square $2$ (computed). Fifteen dots in a $3 \times 5$ grid regroup as $3 + 5 + 7$, and $E_1 E_2 = E_1 + E_2 + E_3 = 64\kappa^3 - 64\kappa^2 + 16\kappa - 1$ is computed on screen, with a green tag on [@thm-ch10-even-char-product-sum]; the heap bracket $y\bar{x}w$ and the shell-by-shell triple product $\widehat{f}_j \widehat{g}_j^\dagger \widehat{h}_j$ are a violet written derivation. Finally the quadrupole ledger of the five real $d$ orbitals (in sevenths, computed) sums to zero in every column, and cyan and magenta bars show the $d^8$ diagonal $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$, with a green tag on [@thm-ch10-zero-axiom-orbital-quadrupole]; the gold oxidation states are crystal-field background.
:::

In the interactive laboratory card below, sweep $\kappa \in [0, 1]$ or jump directly to the canonical rational landmarks to test square-root elimination $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ and the all-degree integer Clebsch–Gordan fusion product $E_m(\kappa)E_n(\kappa) = \sum_{r=\lvert m-n\rvert}^{m+n} E_r(\kappa)$ ([@thm-ch10-zero-axiom-chebyshev-shells], [@thm-ch10-even-char-product-sum]), then toggle orbital occupations in the $j = 2$ quadrupole panel to audit closed-$5d^{10}$ vanishing against the exact trace-free $5d^8$ diagonal $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$ ([@thm-ch10-zero-axiom-orbital-quadrupole]).

::: {.viz src="dfinite-algebraic-schur-lab" preset="peter-weyl-even-chebyshev" height="520"}
**Peter–Weyl even-Chebyshev spin shells and quadrupole balance card (`peter-weyl-even-chebyshev`).** Sweep the rational fidelity $\kappa$ across the even-Chebyshev character kernels $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ and their canonical rational landmarks ([@ex-ch10-spin-character-table]), select any spin pair $(m, n)$ to inspect the exact fusion expansion $\sum_{r=\lvert m-n\rvert}^{m+n} E_r(\kappa)$, and compare closed-$5d^{10}$ isotropy against the trace-free $5d^8$ quadrupole diagonal $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$ in the five-orbital $j = 2$ ledger ([@thm-ch10-zero-axiom-orbital-quadrupole], [@ex-ch10-d10-d8-quadrupole-ledger]).
:::

One decisive challenge now stares us in the face. Whether we check Peter–Weyl character orthonormality $\langle\chi_j, \chi_{j'}\rangle = \delta_{jj'}$, compute ternary heap convolutions $\mathbb{E}_{\mathbf{x},\mathbf{y}}[\cdots]$, or verify that the rotational Haar average of $\mathbf{Q}_{\mathrm{phys}}(5d^8)$ vanishes, we rely on the **global Haar expectation $\mathbb{E}_{S^3(\mathbb{R})}[\cdot]$ over the three-sphere**. Classical analysis insists that averaging over a curved sphere requires the $\pi$-laden surface integral $\frac{1}{2\pi^2}\int_{S^3}\cdots\,d\sigma$ and infinite Riemann-sum limits. Does it really? The next chapter reveals the arithmetic miracle of dimension $3$: $\pi^2$ cancels out completely between numerator and denominator, reducing Haar integration of polynomial signals on $S^3$ to finite ratios of integer factorials.
