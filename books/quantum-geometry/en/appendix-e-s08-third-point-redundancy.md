# E.8 Third-Point Redundancy and Positivity of the Involution: Reducing H2 and H3 with the Arc-Body Calculus, and Restating the Inputs of H5–H7 {#sec-appe-third-point-redundancy}

The table in E.7 records `H2` as three parallel Layer-1 conditions: positive self-pairing, the elliptic negative square of a rank-$2$ bivector, and Gram positive semidefiniteness for any number of points. `H3` then adds parallelogram polarization. This section goes through the same accounts with the chord–sagitta decomposition of [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes). The outcome is that the four items are not independent. When the similarity readings are real scalars, the three items of `H2` follow from two more primitive conditions: **third-point redundancy** (comparing $x$ with $z$ is not changed by routing through a third point $y$) and **positivity of the involution** (the round trip of a nonzero difference is neither zero nor negative). The polarization item of `H3` follows from third-point redundancy together with one positive reading. E.8.5 adds a restatement of `H5` on a qubit: among probability rules that see only pairwise comparison, the Born rule is the one of minimal tomographic rank. E.8.6 and E.8.7 use the same notation to examine `H6` and `H7`: invertibility of the evolution, continuity in time, the generator and conditioning, and then the parameter count of composites and exchange statistics. These two subsections add no clause; they only recast the inputs in terms of compared objects and readings, and use models satisfying every clause to mark the boundaries. E.8.8 applies comparison to ensembles: when every object has an opposite, Gram positivity for any number of points is equivalent to "every ensemble has a nonnegative averaged similarity with itself"; `H5` on a qubit can be replaced by ensemble extensionality, which in the `MODEL` reading is Clause I applied to ensembles. E.8.9 reads the record of comparisons of one object along time: the rank of the record counts energy levels, an object whose ray sagitta stays away from zero shows that the state space is infinite-dimensional, which gives `H4` a criterion in terms of readings without deriving it; only the two channels together fix the Hamiltonian on the orbit (`H6`).

E.8.10–E.8.12 treat three inputs that the ledger still lists. E.8.10 applies the sagitta table of E.8.1 to comparisons between observers in $1+1$ dimensions: dropping the positivity condition does not yet select the Lorentz signature; two further statements are needed, "repeating the same comparison never reverses the order in time" and "the difference part is not square-zero", and for a single comparison the positivity condition and the first of these cannot hold together. E.8.11 gives exact identities and two-sided bounds for the entropy gain under a unit-preserving pinching. E.8.12 shows that for a quadratic action the finite-step path product equals the leading stationary-phase term exactly; for general actions only explicit one-dimensional cancellation bounds remain, and the continuum-time limit is a literature result or an input. E.8.13 returns to three items of `H4` and `H7` that are still listed as plain inputs (the central complex structure, the exchange sector and the choice of valuation), gives each an exact form, and uses models satisfying every clause to show that they remain inputs.

The boundary first. Both conditions are added on top of $\mathcal{A}_0$. What is proved here is "if they are added, then the rest follows"; nothing here claims they can be derived from Clauses I–III, and the countermodels of [@ex-appe-layer0-countermodels] show they cannot. The theorem boxes of this section all correspond to frozen theorems. Every other derivation is marked `manual derivation`, and classical results that are quoted are marked `Literature`.

## E.8.1 One Pair: Chord and Sagitta Are Already Locked at Layer 0 {#sec-appe-chord-sagitta-layer0}

Take the comparison $u=\mathrm{CMP}(x,y)$ of one pair of objects. Clause II gives $u^*=\mathrm{CMP}(y,x)$, and Clause III holds for both ordered pairs $(x,y)$ and $(y,x)$, so $uu^*=u^*u=\mathbf{1}$. Following §30.3.1 we call $v:=\mathbf{1}-S$ the **sagitta** and $\Delta:=u-\mathbf{1}=A-v$ the **chord**.

::: {.remark #rem-appe-chord-sagitta-layer0 title="The Chord–Sagitta Lock of a Fair Comparison (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a unital associative $*$-algebra in which $2$ is invertible, and let $u\in\mathcal{A}$ satisfy $uu^*=u^*u=\mathbf{1}$. Put $S=\frac12(u+u^*)$, $A=\frac12(u-u^*)$, $v=\mathbf{1}-S$, $\Delta=u-\mathbf{1}$. Then:

1. $SA=AS$;
2. $S^2-A^2=\mathbf{1}$;
3. $A^2=-v(2-v)$;
4. $\Delta^*\Delta=\Delta\Delta^*=2v$.

Derivation: $uu^*=(S+A)(S-A)=S^2-SA+AS-A^2$ and $u^*u=(S-A)(S+A)=S^2+SA-AS-A^2$ both equal $\mathbf{1}$. Subtracting gives $2(AS-SA)=0$, and $2$ is invertible, which is item 1; adding gives item 2. Item 3 is $A^2=S^2-\mathbf{1}=-(\mathbf{1}-S)(\mathbf{1}+S)$. Item 4 follows from $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$, and likewise on the other side.
:::

These four items are used in three places.

First, [@def-ch32-axiom-of-comparison] lists "$S$ and $A$ commute" as a special case after Clause III. Item 1 shows that it is not an extra condition: as soon as Clause III holds for both orders, the two channels commute and the Pythagorean fairness law $S^2-A^2=\mathbf{1}$ holds as well.

Second, the two identities $(1-v_\epsilon)^2+c_\epsilon^2=1$ and $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ of §30.3.1 are items 2 and 4 written for $A=c_\epsilon\hat{\mathbf B}$ with $\hat{\mathbf B}^2=-\mathbf{1}$. What holds at Layer 0 is $S^2-A^2=\mathbf{1}$ and $\Delta^*\Delta=2v$ themselves, and these do not depend on a trigonometric realization.

Third, at $v=\mathbf{1}$ (that is, $S=0$, a right-angle comparison) item 3 gives $A^2=-\mathbf{1}$. On complex matrices this is the frozen theorem [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary): the complex structure $R^2=-I$ needed in `H4` is the slice of the lock identity at sagitta equal to $1$.

Now the signature. Let $\mathcal{A}$ be a real algebra and let the similarity reading be a real scalar, $S=s\mathbf{1}$. Item 3 becomes $A^2=-v(2-v)\mathbf{1}$ with $v=1-s$, so the sign of $A^2$ is decided entirely by where the sagitta lies:

| Sagitta $v$ | $A^2$ | Type of $\mathbb{R}[A]$ when $A\neq0$ | Counterpart in [@ex-appe-layer0-countermodels] |
| :---: | :---: | :--- | :--- |
| $0<v<2$ | negative | complex numbers, elliptic | the rotations of Layer 1 |
| $v=0$ or $v=2$ | $0$ | dual numbers, parabolic | $1\pm\varepsilon$ of countermodel (b), with $v=0$ |
| $v<0$ or $v>2$ | positive | split-complex numbers, hyperbolic | $\cosh\eta\pm j\sinh\eta$ of countermodel (b), with $v=1-\cosh\eta<0$ |

::: {.remark #rem-appe-involution-positivity title="Positivity of the Involution Excludes the Parabolic and Hyperbolic Branches (Manual Derivation)"}
**Manual derivation.** Say that the involution of a real $*$-algebra $\mathcal{A}$ satisfies the **positivity condition** if

$$
a^*a=-t\,\mathbf{1},\quad t\ge0\qquad\Longrightarrow\qquad a=0 .
$$

Assume the positivity condition, and let $u$ satisfy $uu^*=u^*u=\mathbf{1}$ with $S=s\mathbf{1}$ ($s\in\mathbb{R}$) and $u\neq\pm\mathbf{1}$. Then $-1<s<1$ and

$$
u=\cos\theta\,\mathbf{1}+J\sin\theta,\qquad \theta=\arccos s\in(0,\pi),\qquad J=\frac{A}{\sin\theta},\qquad J^*=-J,\qquad J^2=-\mathbf{1}.
$$

Derivation: by item 4 of [@rem-appe-chord-sagitta-layer0], $\Delta^*\Delta=2(1-s)\mathbf{1}$. If $s\ge1$, take $t=2(s-1)$; the positivity condition gives $\Delta=0$, that is, $u=\mathbf{1}$. The same argument applied to $-u$ gives $u=-\mathbf{1}$ when $s\le-1$. In the remaining case $-1<s<1$, item 3 gives $A^2=-(1-s^2)\mathbf{1}$; divide by $\sin^2\theta=1-s^2$.

The positivity condition fails for the dual numbers ($\varepsilon^*\varepsilon=-\varepsilon^2=0$ although $\varepsilon\neq0$) and for the split-complex numbers ($j^*j=-j^2=-1$). It holds in every $C^*$-algebra, where $a^*a$ is a positive element and $\lVert a^*a\rVert=\lVert a\rVert^2$ (`Literature`), and in every $*$-algebra with a faithful positive functional $\varphi$: there $\varphi(a^*a)\ge0$ with equality only for $a=0$, so $a^*a=-t\mathbf{1}$ forces $t=0$ and $a=0$.
:::

So the item "elliptic negative square" of `H2` can be replaced by a sentence that speaks only of round trips: **where there is a difference, the round trip leaves a positive trace.** What it excludes is exactly the two branches of countermodel (b), and nothing else.

Those two branches are not pathological models. Regard the $2\times2$ complex matrices as a real algebra and take the classical adjugate $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$ as the involution. Then $aa^\sharp=\det(a)\mathbf{1}$, the elements with $uu^\sharp=\mathbf{1}$ are exactly $\mathrm{SL}(2,\mathbb{C})$, the similarity part $S=\frac12\operatorname{tr}(u)\mathbf{1}$ of every such $u$ is automatically a central scalar, and the sagitta $v=1-\frac12\operatorname{tr}u$ is a complex number (`manual derivation`). The classical classification of Möbius transformations by their trace (`Literature`) reads as follows in terms of the sagitta: for $u\neq\pm\mathbf{1}$, the class is elliptic when $v\in(0,2)$, parabolic when $v\in\{0,2\}$, hyperbolic for every other real $v$, and loxodromic when $v\notin\mathbb{R}$. The generators of countermodel (b) all live here: $\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $j\mapsto\operatorname{diag}(1,-1)$, and the elliptic generator $\mapsto\operatorname{diag}(i,-i)$. All three satisfy $g^\sharp=-g$, and their squares are $0$, $+\mathbf{1}$ and $-\mathbf{1}$. The frozen theorem [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) gives the traces, determinants and squares of the hyperbolic form $\operatorname{diag}(\delta,-\delta)$ and the elliptic form $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ among real $2\times2$ traceless generators; its middle case is the zero matrix, so the nonzero nilpotent parabolic generator is not covered by that theorem. This algebra carries no normalized functional with $\varphi(a^\sharp a)\ge0$ (for $a=\operatorname{diag}(1,-1)$ one has $a^\sharp a=-\mathbf{1}$), so the reading argument of E.8.3 does not apply to it.

$\mathrm{SL}(2,\mathbb{C})$ acts on Hermitian matrices $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ by $X\mapsto uXu^\dagger$ and preserves $\det X=t^2-\lvert\mathbf{x}\rvert^2$; this is the spinor covering of the Lorentz group (`Literature`). The theorem [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), already cited in E.6, says that the null cone fixes the quadratic form up to one scalar. If fairness is also required for the Hermitian adjoint ($uu^\dagger=\mathbf{1}$), what remains is $\mathrm{SU}(2)$, which contains only elliptic classes. This gives one reading that covers both `H2` and `H8` (`MODEL`): **the parabolic and hyperbolic branches left open at Layer 0 are the null rotations and boosts of Lorentz transformations; choosing the elliptic signature and choosing the Lorentz signature are the two answers to one question, whether the involution of a single algebra is required to be positive.**

E.8.10 works this reading out ([@rem-appe-rotor-boost-coexistence]). Taking the positivity condition selects the elliptic row. Merely dropping it does not select the Lorentz signature: the time-order condition and "the difference part is not square-zero" are needed as well, and for a single comparison $u\neq\mathbf{1}$ the positivity condition and the time-order condition cannot both hold. So "taking or dropping" means choosing different rows of one three-way table for different comparisons.

Applied to the difference part of a single comparison, the positivity condition has an equivalent form that speaks only of repeated comparison.

::: {.remark #rem-appe-bounded-recurrence title="The Operational Form of Positivity for a Single Comparison: Repeating It Does Not Amplify the Readings (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mathcal{A}$ be a real $*$-algebra, that is, a unital associative algebra over the real numbers whose involution is $\mathbb{R}$-linear with $\mathbf{1}^*=\mathbf{1}$. Let $u$ satisfy $uu^*=u^*u=\mathbf{1}$, and let its similarity reading be a real scalar, $S=s\mathbf{1}$. From $u+u^*=2s\mathbf{1}$ and $uu^*=\mathbf{1}$ one gets $u^2=2su-\mathbf{1}$, hence $u^{n+1}=2su^n-u^{n-1}$, the three-term recurrence of the Chebyshev polynomials. Therefore, for all $n\ge0$,

$$
u^{n}=T_n(s)\,\mathbf{1}+U_{n-1}(s)\,A,\qquad u^{-n}=T_n(s)\,\mathbf{1}-U_{n-1}(s)\,A,
$$

where $T_n$ and $U_n$ are the Chebyshev polynomials of the first and second kind and $U_{-1}=0$. Performing the same comparison $n$ times turns the sagitta $v$ into $v_n=1-T_n(1-v)$.

Put any norm on $\operatorname{span}\{\mathbf{1},A\}$. The two-sided orbit $\{u^n\}_{n\in\mathbb{Z}}$ is bounded if and only if $-1\le s\le1$ and, when $s=\pm1$, $A=0$:

- $\lvert s\rvert<1$: with $s=\cos\theta$ one has $T_n(s)=\cos n\theta$ and $U_{n-1}(s)=\dfrac{\sin n\theta}{\sin\theta}$, so the orbit is bounded;
- $s=\pm1$: $u^n=(\pm1)^n(\mathbf{1}\pm nA)$, which is bounded only when $A=0$;
- $\lvert s\rvert>1$: with $\lvert s\rvert=\cosh\eta$ one has $\lvert T_n(s)\rvert=\cosh n\eta$, which is unbounded. Here $A^2=(s^2-1)\mathbf{1}\neq0$, and $A^*=-A$ shows that $A$ is not a real multiple of $\mathbf{1}$, so an unbounded coefficient of $\mathbf{1}$ makes the orbit unbounded.

On the other hand $A^*A=-A^2=(1-s^2)\mathbf{1}$. Apply the positivity condition of [@rem-appe-involution-positivity] to $a=A$: when $1-s^2\le0$ it forces $A=0$, and then $s^2=1$. This is again "$-1\le s\le1$, and $A=0$ when $s=\pm1$". So, for a comparison whose similarity reading is a real scalar, **the positivity condition holds for its difference part if and only if its integer powers are bounded**.

**Literature.** When several comparisons occur together, the finite-dimensional case has a statement in the same direction. Let $\mathcal{A}$ consist of linear operators on a finite-dimensional real or complex vector space, and let $\Gamma$ be a bounded group of elements with $gg^*=g^*g=\mathbf{1}$. Averaging over the closure of $\Gamma$ gives a $\Gamma$-invariant inner product, for which every element of $\Gamma$ is an isometry. Hence for $a$ in the real linear span of $\Gamma$, $a^*$ is the adjoint of $a$, $a^*a$ is a positive semidefinite operator, and the positivity condition holds on this span (unitarization of bounded groups, by the standard argument of averaging over a compact group).
:::

The three cases are the three rows of the table above. An elliptic comparison can be repeated any number of times and its similarity reading stays inside $[-1,1]$. The similarity reading of a parabolic comparison stays at $\pm1$ (alternating in sign when $v=2$) while its difference reading grows linearly with the number of repetitions. The readings of a hyperbolic comparison grow exponentially. For a single comparison the positivity condition can therefore be read as a requirement of no amplification: **repeating one comparison any number of times does not make the readings diverge.** In the Lorentz group, the linear and the exponential growth that it excludes are the null rotations and the boosts. The positivity condition is independent of Clause IV: take $X=\mathrm{SL}(2,\mathbb{C})$ and $\mathrm{CMP}(x,y)=x^\sharp y$; Clauses II, III and IV all hold, and the positivity condition fails.

Having no amplification in each comparison separately is still not enough for Gram positivity of several points. In $(M_2(\mathbb{R}),{}^\sharp)$ take $x_0=\mathbf{1}$, $x_1=\cos\theta\,\mathbf{1}+J\sin\theta$ and $x_2=\cos\theta\,\mathbf{1}-J'\sin\theta$, with $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, $J'=\begin{pmatrix}0&-2\\\frac12&0\end{pmatrix}$ and $\theta=\frac\pi4$, and put $\mathrm{CMP}(x,y)=x^\sharp y$. Clauses II, III and IV all hold, the similarity readings of the three comparisons are $\frac{\sqrt2}{2}$, $\frac{\sqrt2}{2}$ and $-\frac18$, all inside the elliptic interval, and the determinant of the table of readings is $-\frac{9}{64}$ (`manual derivation`). What several points need is that the whole group generated by the comparison values be bounded, which is the premise of the literature paragraph above; in this example the generated group is unbounded.

## E.8.2 Third-Point Redundancy: the Potential Representation and Its Stability {#sec-appe-gain-potential}

From here on we abbreviate $\mathrm{CMP}(x,y)$ as $c_{xy}$.

::: {.definition #def-appe-third-point-redundancy title="Clause IV: Third-Point Redundancy (Model of This Book)"}
Let the comparison map $\mathrm{CMP}:X\times X\to\mathcal{A}$ satisfy Clauses II and III of [@def-ch32-axiom-of-comparison]. It satisfies **third-point redundancy** (`MODEL`) if for all $x,y,z\in X$,

$$
c_{xy}\,c_{yz}=c_{xz}.
$$

Equivalently, the holonomy $h(x,y,z):=c_{xy}\,c_{yz}\,c_{zx}$ of every three-point loop equals $\mathbf{1}$. When only some pairs can be compared, regard the comparable pairs as the edges of a graph $G$ and require the identity only for triples that are pairwise comparable in $G$.
:::

The Clifford realization of Layer 1 satisfies Clause IV: the geometric product of unit vectors gives $xy\cdot yz=xz$. When [§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) describes Layer 2 it already notes that the raw vector edge products are flat and carry no curvature; Clause IV turns that sentence into a condition. It points the same way as the starting point of the book: pairwise measurement needs no external third point, and now an internal third point is required to change nothing either.

The main consequence of Clause IV is that every object can be represented by a group element, and a comparison is the ratio of two representatives. On a finite set of points this is a frozen theorem, and it needs less than "all triples".

::: {.theorem #thm-appe-chordal-gain-potential title="Triangle-Compatible Group Gains on a Finite Chordal Graph Are Ratios of Vertex Potentials" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential"}
Let $V$ be a finite vertex set, $H$ an arbitrary group, and $G$ a simple chordal graph on $V$, that is, every cycle of $G$ of length at least $4$ has a chord. Let $g:V\times V\to H$ satisfy:

1. for every edge $\{i,j\}$, $g(j,i)=g(i,j)^{-1}$;
2. for pairwise adjacent $i,j,k$, $g(i,j)\,g(j,k)=g(i,k)$.

Then there is a map $\varphi:V\to H$ such that for every edge $\{i,j\}$,

$$
g(i,j)=\varphi(i)^{-1}\varphi(j).
$$

The group $H$ need not be commutative and the graph $G$ need not be connected. The hypotheses do not constrain $g$ on the diagonal or on non-edges, and the conclusion does not concern those values.
:::

::: proof
Induct on the size of a vertex subset, putting the vertices back one at a time. Every nonempty induced subgraph of a chordal graph is chordal, so it contains a simplicial vertex $x$: its neighbours inside the subgraph are pairwise adjacent. Apply the induction hypothesis to the subset without $x$ to obtain a potential $\psi$. If $x$ has no neighbour in the subset, $\psi$ already works. Otherwise pick a neighbour $w$, set $\varphi(x)=\psi(w)\,g(x,w)^{-1}$ and keep $\psi$ on the other vertices. For another neighbour $j$ of $x$, simpliciality makes $w$ and $j$ adjacent, and triangle compatibility gives $g(x,j)=g(x,w)\,g(w,j)=g(x,w)\,\psi(w)^{-1}\psi(j)=\varphi(x)^{-1}\varphi(j)$; edges pointing into $x$ follow from item 1 by inversion. The argument uses only associativity and inverses and never commutes two group elements. The full proof is checked by the Lean kernel.
:::

Applied to comparisons: take $H$ to be the group of elements of $\mathcal{A}$ with $uu^*=u^*u=\mathbf{1}$. Clauses II and III give item 1, and Clause IV gives item 2. A complete graph is chordal, so Clause IV on a finite set of points yields $c_{xy}=\varphi_x^{-1}\varphi_y$. The extra strength of the theorem matters more for this book: **not every pair has to be comparable.** It is enough that the comparability relation forms a chordal graph and that every comparable triangle is flat. This is the same combinatorial condition under which [§25.1](ch29-s03-timeless-gram-causality.md) completes local positive semidefinite blocks to a global positive semidefinite matrix ([@thm-ch29-chordal-psd-completion]). A condition of this kind cannot be dropped altogether: a four-cycle has no triangles, so item 2 says nothing, while the product around the cycle can take any value and a potential need not exist. Chordality is sufficient, not necessary: the wheel with a hub and a four-cycle rim is not chordal, yet triangle compatibility still yields a potential, namely $\varphi(i)=g(\text{hub},i)$ (`manual derivation`).

Real comparisons carry error. When the chain law holds only approximately, the potential representation holds approximately, with an explicit bound on the deviation.

::: {.theorem #thm-appe-chordal-gain-potential-stability title="Approximate Triangle Compatibility Gives an Approximate Vertex Potential" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential"}
Let $V$ be a finite vertex set and $G$ a simple chordal graph on $V$. Let the group $H$ carry a pseudometric $d$ for which left and right multiplication are isometries: $d(ax,ay)=d(x,y)=d(xa,ya)$ for all $a,x,y\in H$. Let $\varepsilon\ge0$ and let $g:V\times V\to H$ satisfy:

1. for every edge $\{i,j\}$, $g(j,i)=g(i,j)^{-1}$;
2. for pairwise adjacent $i,j,k$, $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$.

Then there is a map $\varphi:V\to H$ such that for every edge $\{i,j\}$,

$$
d\bigl(g(i,j),\,\varphi(i)^{-1}\varphi(j)\bigr)\le(\lvert V\rvert-2)\,\varepsilon,
$$

where $\lvert V\rvert-2$ is truncated subtraction of natural numbers and equals $0$ when $\lvert V\rvert\le2$.
:::

::: proof
The construction is that of [@thm-appe-chordal-gain-potential], with equalities replaced by distance estimates. When the simplicial vertex $x$ is put back, apply the triangle inequality for a neighbour $j$: the distance from $g(x,j)$ to $g(x,w)\,g(w,j)$ is at most $\varepsilon$, and left invariance turns the distance from $g(x,w)\,g(w,j)$ to $\varphi(x)^{-1}\varphi(j)=g(x,w)\,\psi(w)^{-1}\psi(j)$ into the distance from $g(w,j)$ to $\psi(w)^{-1}\psi(j)$, which the induction hypothesis controls. Each vertex that is put back with at least two neighbours therefore adds at most one $\varepsilon$, the first two vertices add none, and the total is $(\lvert V\rvert-2)\varepsilon$. Edges pointing into $x$ use that inversion is an isometry, which needs invariance under translations on both sides. The full proof is checked by the Lean kernel.
:::

The unitary group of a $C^*$-algebra with the operator-norm distance satisfies the isometry hypothesis, so a nearly flat comparison is close to a flat one, at a distance that grows linearly with the number of points.

::: {.remark #rem-appe-anchoring-consequences title="Five Consequences of the Anchored Representation (Manual Derivation)"}
**Manual derivation.** Let Clauses II, III and IV hold for all pairs and triples, and let $X$ be nonempty (possibly infinite).

1. **Positive self-pairing.** $c_{xx}=\mathbf{1}$. Clause IV with $y=z=x$ gives $c_{xx}^2=c_{xx}$, and Clause III gives $c_{xx}^2=\mathbf{1}$.
2. **Anchored representation.** Fix an anchor $o$ and put $g_x:=c_{ox}$. Then $g_xg_x^*=g_x^*g_x=\mathbf{1}$ and $c_{xy}=g_x^*g_y$, because $c_{xy}=c_{xo}\,c_{oy}$ and $c_{xo}=c_{ox}^*$.
3. **Uniqueness.** If also $c_{xy}=g_x'^*g_y'$, then $g'_xg_x^*$ does not depend on $x$: two representations differ by left multiplication with one fixed element.
4. **Extensional quotient.** The inseparability relation $x\sim_{\mathrm{CMP}}y$ of Clause I is equivalent to $g_x=g_y$, so $\widetilde X$ injects into the group of fair elements of $\mathcal{A}$.
5. **Endpoint formula.** For every sampled path, $c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$.

For finite $X$, item 2 is the complete-graph case of [@thm-appe-chordal-gain-potential]; the direct construction given here also covers infinite $X$ and exhibits the potential explicitly.
:::

Item 1 excludes countermodel (a) of [@ex-appe-layer0-countermodels]: on a single point, $\mathrm{CMP}=-1$ has round trip $+1$ but violates $c\cdot c=c$. Under Clause IV, the "positive self-pairing" of `H2` is therefore no longer an independent calibration. Item 4 says that once an anchor is chosen, an object is the rotor that carries the anchor to it; objects and the operators acting on them are no longer two kinds of thing. Item 5 is the Newton–Leibniz formula for the path-ordered rotor product integral of §30.3.2: a flat comparison multiplied along any sampled path depends only on the two endpoints. This holds exactly at every finite aperture, with no refinement limit.

Chordality is one sufficient condition under which triangle compatibility is enough. The condition that is exactly enough can be stated directly.

::: {.remark #rem-appe-triangle-simple-connectivity title="When Triangle Compatibility Suffices: Comparable Triangles Fill Every Cycle (Manual Derivation and Literature)"}
**Manual derivation.** Let $G$ be a finite simple graph on a vertex set $V$, let $H$ be a group, and let $g$ be defined on ordered pairs of adjacent vertices, with $g(j,i)=g(i,j)^{-1}$ and with $g(i,j)\,g(j,k)=g(i,k)$ on every triangle of $G$. For a walk $w=(x_0,\dots,x_n)$ whose consecutive vertices are adjacent, put $\operatorname{hol}(w)=g(x_0,x_1)\cdots g(x_{n-1},x_n)$. Two rewritings are allowed: deleting or inserting a backtrack, $x,y,x\leftrightarrow x$; and replacing two edges of a triangle by the third, $x,y,z\leftrightarrow x,z$. Neither changes $\operatorname{hol}$. Say that $G$ is **filled by triangles** if every closed walk in $G$ can be rewritten to a single vertex by these two moves.

1. **Sufficiency.** If $G$ is filled by triangles, then every $g$ with the two properties above, over any group $H$, is a ratio of potentials. Choose a base point $o$ in each connected component and put $\varphi(x)=\operatorname{hol}(w)$ for any walk $w$ from $o$ to $x$. Two such walks, one followed by the reverse of the other, form a closed walk whose $\operatorname{hol}$ is $1$; by the inverse rule the $\operatorname{hol}$ of a reversed walk is the inverse of the original, so $\varphi$ does not depend on the walk. For adjacent $x,y$ this gives $\varphi(y)=\varphi(x)\,g(x,y)$, that is, $g(x,y)=\varphi(x)^{-1}\varphi(y)$.
2. **Necessity.** If some connected component of $G$ is not filled by triangles, there are a group $H$ and a $g$ with the two properties above that is not a ratio of potentials. Take $H$ to be the closed walks based at $o$ in that component modulo the two rewritings, with concatenation as product. Fix a spanning tree, let $\gamma_x$ be the tree walk from $o$ to $x$, and put $g(x,y)=[\gamma_x\,(x,y)\,\gamma_y^{-1}]$, with $g\equiv1$ on the other components. This $g$ satisfies the inverse rule and triangle compatibility, and every closed walk $w$ based at $o$ has $\operatorname{hol}(w)=[w]$. This $H$ is nontrivial: if a closed walk $w$ based at $x$ cannot be rewritten to a single vertex, then $\gamma_x\,w\,\gamma_x^{-1}$ is a closed walk based at $o$, and it can be rewritten to a single vertex if and only if $w$ can. A ratio of potentials would force $\operatorname{hol}$ to be $1$ on all closed walks, which contradicts the nontriviality of $H$.
3. **The deviation accumulates with filling area.** Let $H$ carry a pseudometric $d$ invariant under left and right translations, and let $g$ satisfy the inverse rule exactly and triangle compatibility only up to $\varepsilon$: on every triangle, $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$ (by two-sided invariance and the inverse rule, the six orderings of the three vertices give the same deviation). A closed walk that is rewritten to a single vertex with $A$ triangle moves, counting moves in both directions, satisfies $d(\operatorname{hol}(w),1)\le A\varepsilon$. Backtracks do not change $\operatorname{hol}$; each triangle move replaces a block $g(x,y)\,g(y,z)$ of the product by $g(x,z)$, or the reverse, and two-sided invariance bounds the deviation of that step by $\varepsilon$.

**Literature.** The group in item 2 is the edge-path group of the clique complex of $G$ (the simplices are the cliques of $G$), which is isomorphic to the fundamental group of the clique complex (Spanier, *Algebraic Topology*, 1966, Chapter 3). "Filled by triangles" therefore means that every connected component of the clique complex is simply connected. The clique complex of a connected chordal graph is contractible: the neighbours of a simplicial vertex span a simplex, deleting that vertex is a deformation retraction and keeps the graph connected, and one inducts along the elimination order. So [@thm-appe-chordal-gain-potential] is a special case of item 1.
:::

Two examples mark the boundary. The 4-cycle has no triangles; its group of closed walks is $\mathbb{Z}$, the $g$ of item 2 records one turn around the cycle as the generator, and every holonomy is allowed. Add a hub adjacent to all four vertices. The resulting wheel is not chordal, because the rim is still a chordless 4-cycle, yet it is filled by its four triangles, and triangle compatibility again gives a potential. For Clause IV, then, what matters is whether comparable triangles fill every cycle. Item 3 can be read alongside the finite-grid Stokes theorem of §30.3.3: the deviation of a holonomy is at most the number of triangle moves used in a filling times the deviation of a single triangle, and when the filling is a disc that number is the number of triangles in the disc.

## E.8.3 From the Potential Representation to Gram Positivity and Chord Distance {#sec-appe-gram-from-potential}

With $c_{xy}=g_x^*g_y$ in hand, Gram positive semidefiniteness for any number of points needs only a positive reading.

::: {.remark #rem-appe-gram-from-flatness title="The Similarity Table of a Flat Comparison Is Positive Semidefinite, and the Chord Distance Is a Hilbert Distance (Manual Derivation and Literature)"}
**Manual derivation.** Let Clauses II–IV hold and let $\varphi$ be a positive linear functional on $\mathcal{A}$ ($\varphi(a^*a)\ge0$) with $\varphi(\mathbf{1})=1$ that takes real values on self-adjoint elements (automatic for positive functionals on a complex $*$-algebra). For any finite family of points $x_1,\dots,x_m$:

1. The similarity table $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ is a real symmetric positive semidefinite matrix with unit diagonal.
2. $d(x,y)^2:=2\,\varphi\bigl(v(x,y)\bigr)=\varphi(\Delta_{xy}^*\Delta_{xy})$ is the squared distance of two points in a Hilbert space, so $d$ satisfies the triangle inequality.
3. If all similarity readings are real scalars, $S(x_i,x_j)=s_{ij}\mathbf{1}$, no functional is needed: as soon as the positivity condition of [@rem-appe-involution-positivity] holds, the matrix $[s_{ij}]$ is positive semidefinite.

Derivation: for real coefficients $\alpha_i$ put $a=\sum_i\alpha_ig_i$. From $c_{x_ix_j}=g_i^*g_j$ and $A(x_i,x_j)=-A(x_j,x_i)$,

$$
a^*a=\sum_{i,j}\alpha_i\alpha_j\,c_{x_ix_j}=\sum_{i,j}\alpha_i\alpha_j\,S(x_i,x_j).
$$

Applying $\varphi$ gives $\alpha^{\mathsf T}G\alpha=\varphi(a^*a)\ge0$, which is item 1. In item 3, $a^*a=(\alpha^{\mathsf T}[s_{ij}]\alpha)\mathbf{1}$; if that number were negative, the positivity condition would force $a=0$ and hence $a^*a=0$, a contradiction. Item 2 uses $g_y-g_x=g_x\Delta_{xy}$: in the GNS representation $(\pi,\Omega)$ of $\varphi$, $\lVert\pi(g_y)\Omega-\pi(g_x)\Omega\rVert^2=\varphi(\Delta_{xy}^*g_x^*g_x\Delta_{xy})=\varphi(\Delta_{xy}^*\Delta_{xy})$, which equals $2\varphi(v)$ by item 4 of [@rem-appe-chord-sagitta-layer0].

**Converse (manual derivation).** Given unit vectors $x_1,\dots,x_m$ in a real inner product space, the Clifford comparison $c_{ij}=x_ix_j$ satisfies Clauses II–IV for the reversion involution, the scalar part is a positive functional, and the reading is $x_i\cdot x_j$. Hence a real symmetric matrix with unit diagonal is positive semidefinite if and only if it is the similarity table of some flat fair comparison under some positive functional.

**Counterparts in the frozen library.** Positive semidefiniteness of the complex Gram matrix of a family of vectors is [`gramPsd`](lean:D5/S3/Quantum/Measurement/AntidistinguishabilityGram.gramPsd). For a positive semidefinite matrix $A$, the squared distances $A_{ii}+A_{jj}-2A_{ij}$ form a conditionally negative definite kernel; see [`gram_distance_conditionally_negative`](lean:D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_distance_conditionally_negative). The latter is one direction of Schoenberg's theorem (`Literature`) on finite point sets.
:::

Put together:

$$
\text{Clause IV}+\text{a positive functional}\;\Longrightarrow\;\text{positive self-pairing and a positive semidefinite table};\qquad \text{scalar similarity}+\text{Clause IV}+\text{positivity condition}\;\Longrightarrow\;\text{the three items of H2}.
$$

When the similarity readings are not real scalars, the elliptic item fails: in the $2\times2$ complex matrices with the Hermitian adjoint, a flat comparison built from $g=\operatorname{diag}(e^{i\alpha},e^{i\beta})$ satisfies Clauses II–IV and the positivity condition, yet $A^2$ is a diagonal matrix with two different negative entries and is not a multiple of $\mathbf{1}$ (`manual derivation`).

Along this route the "parallelogram polarization" of `H3` is a conclusion as well: the chord distance $d$ comes from the GNS inner product, and the parallelogram identity [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) of inner product spaces holds automatically. This does not remove an input; it changes its shape. The form $\varphi(a^*b)$ supplied by a positive functional is itself a positive semidefinite inner-product form, so "an inner product" has been replaced by "a positive reading". Cauchy completion is still handled as `T1` and is not affected.

Which condition each of the four countermodels violates can be settled one by one.

::: {.example #ex-appe-countermodel-attribution title="Attribution of the Four Layer-0 Countermodels and the Three-Point Holonomy of Countermodel (d) (Manual Derivation)"}
**Manual derivation.** For the four countermodels of [@ex-appe-layer0-countermodels]:

| Countermodel | Satisfies Clauses II and III | Condition violated |
| :--- | :---: | :--- |
| (a) single point with $\mathrm{CMP}(x_0,x_0)=-1$ | yes | Clause IV: $(-1)(-1)=1\neq-1$ |
| (b) dual numbers $1\pm\varepsilon$, split-complex numbers $\cosh\eta\pm j\sinh\eta$ | yes | positivity condition: $\varepsilon^*\varepsilon=0$, $j^*j=-1$ |
| (c) $B=e_1e_2+e_3e_4$ in $\mathcal{Cl}_{4,0}$ | $B$ is not the difference part of any fair element | the composite comparison $(\cos\frac\pi4+e_1e_2\sin\frac\pi4)(\cos\frac\pi4+e_3e_4\sin\frac\pi4)$ has difference part $\frac12B$, and its similarity part $\frac12(\mathbf{1}+e_1e_2e_3e_4)$ is not a real scalar |
| (d) the $3\times3$ similarity table with $\det S=-3$ | yes | Clause IV or the positivity condition; realizations with $A_{12}=0$ violate Clause IV |

Verification for countermodel (d). The similarity table $S_{01}=S_{02}=\frac{\sqrt3}{2}$, $S_{12}=-1$ with amplitudes $\lvert A_{01}\rvert=\lvert A_{02}\rvert=\frac12$, $\lvert A_{12}\rvert=0$ is realized by a comparison with values on the complex unit circle:

$$
c_{01}=c_{02}=e^{i\pi/6},\qquad c_{12}=-1,\qquad c_{ji}=\overline{c_{ij}},\qquad c_{ii}=1 .
$$

It satisfies Clauses II and III. Its three-point holonomy is

$$
h(0,1,2)=c_{01}\,c_{12}\,c_{20}=e^{i\pi/6}\cdot(-1)\cdot e^{-i\pi/6}=-1\neq1 ,
$$

which violates Clause IV. With $0$ as anchor, the chain defect is $c_{12}-c_{10}\,c_{02}=-1-1=-2$, of modulus $2$. In general, the similarity readings of (d) are real scalars and $\det S<0$, so by item 3 of [@rem-appe-gram-from-flatness] every realization of (d) violates Clause IV or the positivity condition.
:::

Countermodel (d) also provides a quantitative comparison. When Clause IV does not hold exactly, the negative eigenvalues of the Gram matrix are controlled by how far the three-point holonomies are from $\mathbf{1}$.

::: {.remark #rem-appe-near-flat-gram-bound title="A Nearly Flat Comparison Has a Nearly Positive Semidefinite Similarity Table (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a $C^*$-algebra, $\varphi$ a state, and let the comparison satisfy Clauses II and III with $c_{xx}=\mathbf{1}$. For points $x_1,\dots,x_m$, fix one of them as the anchor $o$ and put

$$
\delta_o:=\max_{i,j}\,\lVert c_{x_ix_j}-c_{x_io}\,c_{ox_j}\rVert .
$$

Then the smallest eigenvalue of the similarity table $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ satisfies

$$
\lambda_{\min}(G)\ge-(m-2)\,\delta_o .
$$

Derivation: put $g_i=c_{ox_i}$ and write $c_{x_ix_j}=g_i^*g_j+E_{ij}$. The matrix $[\operatorname{Re}\varphi(g_i^*g_j)]$ is positive semidefinite. The perturbation $F_{ij}=\operatorname{Re}\varphi(E_{ij})$ is real symmetric with $\lvert F_{ij}\rvert\le\delta_o$; its diagonal vanishes ($E_{ii}=c_{x_ix_i}-c_{x_io}c_{ox_i}=0$), and so do the row and column of the anchor. Each row therefore has at most $m-2$ nonzero entries, and by Gershgorin's theorem the eigenvalues of $F$ are bounded in absolute value by $(m-2)\delta_o$.

Because the diagonal is $1$ and $\lvert G_{ij}\rvert\le1$, the trivial lower bound is $-(m-2)$, so this bound carries information only when $\delta_o<1$. The anchor has to be one of the points; for an anchor outside the family the bound becomes $-(m-1)\delta_o$. For countermodel (d) of [@ex-appe-countermodel-attribution]: $m=3$, $\delta_o=2$, the lower bound $-2$ carries no information, and the actual smallest eigenvalue is $\frac{1-\sqrt7}{2}\approx-0.8229$.
:::

The factor $m-2$ here and the factor $\lvert V\rvert-2$ of [@thm-appe-chordal-gain-potential-stability] have different origins: in the theorem it counts the three-point defects accumulated along the elimination order, and here it counts the nonzero entries in each row of the perturbation matrix.

## E.8.4 Where Curvature Comes From {#sec-appe-curvature-from-half-comparison}

Clause IV makes every three-point holonomy equal to $\mathbf{1}$, yet spherical excess and the Berry phase do exist. There is no conflict: what is flat is the full comparison, and what is curved is its square root.

::: {.remark #rem-appe-half-comparison-holonomy title="The Full Comparison Is Flat; the Three-Point Holonomy of the Half Comparison Is the Girard Excess (Manual Derivation and Literature)"}
**Manual derivation.** For a fair element $u$ whose similarity reading is a real scalar $s>-1$, $u+u^*=2s\mathbf{1}$ gives $u^2=2su-\mathbf{1}$, hence $(\mathbf{1}+u)^2=2(1+s)\,u$. Put

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}} .
$$

Then $r(u)$ is fair and $r(u)^2=u$; call it the **half comparison** of $u$. Its similarity reading satisfies $S(r)^2=\frac{1+s}{2}=1-\frac v2$.

In $\mathcal{Cl}_{3,0}$ take unit vectors $a,b,c$, no two of them antipodal, and write $r_{ab}=r(ab)$, $[a,b,c]=a\cdot(b\times c)$, $\mathbf{I}=e_1e_2e_3$. The full comparisons satisfy $ab\cdot bc\cdot ca=\mathbf{1}$, whereas

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

Derivation: $(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$, using $ab\cdot bc=ac$, $bc\cdot ca=ba$, $ab\cdot ca=a(bc)a$ and $ab\cdot bc\cdot ca=\mathbf{1}$. The scalar part is $2(1+a\cdot b+b\cdot c+c\cdot a)$. The bivector part is $b\wedge c+a(b\wedge c)a$; with $b\wedge c=\mathbf{I}n$, $n=b\times c$, one has $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$, and the two terms add up to $2[a,b,c]\,\mathbf{I}a$. The denominator is fixed by the fairness of $r$, which also gives the identity

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**Literature.** The right-hand side above has the form $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$, a rotor that fixes $a$, with $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$; when the denominator is positive this is $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$. The absolute value $\lvert\Omega\rvert$ is the area of the spherical triangle $abc$, that is, its Girard excess, and the sign of $\Omega$ is the sign of $[a,b,c]$ (van Oosterom–Strackee 1983; Eriksson 1990).

**Correspondence with frozen theorems.** The product formula and the identity for the denominator are frozen in the Pauli-matrix model; see [@thm-appe-bloch-triangle-return-phase]. The two quantities in the numerator, $1+a\cdot b+b\cdot c+c\cdot a$ and $[a,b,c]$, are the real and imaginary parts of $4\operatorname{Tr}(P_aP_bP_c)$ in [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch). Combining the identity above with $\det G(a,b,c)=[a,b,c]^2$ (the expansion of $[a,b,c]^2$ is frozen as [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)) gives

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

where the expansion of $\det G$ is [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula).
:::

On the Bloch sphere $S(r)^2=1-\frac v2$ is $\cos^2\frac\theta2$: the squared similarity of the half comparison equals $1$ minus half the sagitta. This is the Born weight written in chord–sagitta terms; it does not replace the additivity premise of `H5`. The determinant formula says that the three-point Gram volume equals the product of the three complementary sagittas times the sagitta of the excess; the value $\det G=\sin^4\epsilon$ of the "two begets three" cell in [§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) is a special case. For `H8` this means that the projective holonomy native to Layer 1 needs no new input: it is what one gets under Clause IV by taking the square root of the full comparison. What still needs new Layer-2 input is a fibre connection that varies with the spacetime base point, together with its dynamics.

The product formula does not rest on the manual derivation alone. Replace $\mathcal{Cl}_{3,0}$ by its Pauli-matrix model ($e_k\mapsto\sigma_k$, $\mathbf{I}\mapsto i\mathbf{1}$, the involution ${}^*$ becoming the conjugate transpose); the half comparison is then a concrete $2\times2$ unitary matrix, and the two statements below are verified in Lean. For $r\in\mathbb{R}^3$ write $r\cdot\sigma=r_1\sigma_x+r_2\sigma_y+r_3\sigma_z$ and $P_r=\frac12(\mathbf{1}+r\cdot\sigma)$; for $\phi\in\mathbb{C}^2$ write the normalized projection onto $r$ as

$$
N_r(\phi):=\frac{P_r\phi}{\sqrt{\operatorname{Re}\,\phi^\dagger P_r\phi}} .
$$

::: {.lemma #lem-appe-rotor-gate-normalized-projection title="The Rotor Gate Carries $a\cdot\sigma$ to $b\cdot\sigma$ and Acts on Eigenspinors as the Normalized Projection" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate"}
Let $a,b\in\mathbb{R}^3$ be unit vectors with $b\neq-a$, and put

$$
R_{a\to b}:=\frac{\mathbf{1}+(b\cdot\sigma)(a\cdot\sigma)}{\sqrt{2(1+a\cdot b)}} .
$$

Then

1. $R_{a\to b}\,R_{a\to b}^\dagger=\mathbf{1}$;
2. $R_{a\to b}\,(a\cdot\sigma)\,R_{a\to b}^\dagger=b\cdot\sigma$;
3. for every $\psi\in\mathbb{C}^2$ with $\psi^\dagger\psi=1$ and $P_a\psi=\psi$, one has $R_{a\to b}\,\psi=N_b(\psi)$.
:::

::: proof
Write $A=a\cdot\sigma$ and $B=b\cdot\sigma$, so that $A^2=B^2=\mathbf{1}$ and $AB+BA=2(a\cdot b)\mathbf{1}$. The numerator $\mathbf{1}+BA$ satisfies $(\mathbf{1}+BA)(\mathbf{1}+AB)=2(1+a\cdot b)\mathbf{1}$ and $(\mathbf{1}+BA)A(\mathbf{1}+AB)=2(1+a\cdot b)B$, which are the first two items. For the third, $A\psi=\psi$ gives $(\mathbf{1}+BA)\psi=2P_b\psi$, while $\psi^\dagger P_b\psi=\frac{1+a\cdot b}{2}>0$, so the two normalizing factors agree. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-bloch-triangle-return-phase title="Return Phase of Three Rotor Gates around a Bloch Triangle" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy"}
Let $a,b,c\in\mathbb{R}^3$ be unit vectors with $b\neq-a$, $c\neq-b$ and $a\neq-c$. Put

$$
S:=1+a\cdot b+b\cdot c+c\cdot a,\qquad D:=a\cdot(b\times c).
$$

Then

1. $S^2+D^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)$, and $S^2+D^2>0$;
2. the three rotor gates compose to

   $$
   R_{c\to a}\,R_{b\to c}\,R_{a\to b}=\frac{S\,\mathbf{1}-iD\,(a\cdot\sigma)}{\sqrt{S^2+D^2}} ;
   $$

3. for every $\psi\in\mathbb{C}^2$ with $\psi^\dagger\psi=1$ and $P_a\psi=\psi$, the successive normalized projections onto $b$, $c$ and $a$ give

   $$
   N_a\bigl(N_c(N_b(\psi))\bigr)=\frac{S-iD}{\sqrt{S^2+D^2}}\,\psi .
   $$
:::

::: proof
Item 1: write $x=a\cdot b$, $y=b\cdot c$, $z=c\cdot a$. Substituting the Gram identity $D^2=1+2xyz-x^2-y^2-z^2$ ([`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)), the sum $S^2+D^2$ expands to $2(1+x)(1+y)(1+z)$, and each factor is positive because no two of the vectors are antipodal. Item 2: the three numerators multiply to $(\mathbf{1}+AC)(\mathbf{1}+CB)(\mathbf{1}+BA)=2S\,\mathbf{1}-2iD\,A$, and by item 1 the three normalizing factors multiply to $2\sqrt{S^2+D^2}$. Item 3: the third item of [@lem-appe-rotor-gate-normalized-projection] replaces each normalized projection by the corresponding rotor gate, and its first two items guarantee that after each step the spinor is still a unit spinor lying in the eigenspace the next step requires; the last step uses $A\psi=\psi$. The full proof is checked by the Lean kernel.
:::

Compare with [@rem-appe-half-comparison-holonomy]: $R_{a\to b}$ is the image of $r_{ba}=r_{ab}^*$, so item 2 of the theorem is the involution of the product in the remark, $(r_{ab}\,r_{bc}\,r_{ca})^*=r_{ac}\,r_{cb}\,r_{ba}$, and the sign in front of $D$ changes from plus to minus accordingly; item 1 is the identity at the end of the remark. Item 3 is the operational reading of item 2: start from an eigenspinor of $a$, apply the three normalized projections along $a\to b\to c\to a$, and the spinor returns multiplied by the unit-modulus factor $(S-iD)/\sqrt{S^2+D^2}$. What Lean does not state keeps its earlier status. Identifying the argument $\operatorname{atan2}(D,S)$ with half the Girard excess is a literature result. The exponential form of the rotor is not formalized, and neither is any minimality or uniqueness in the sense of "shortest": in the Lean module `rotor` and `shortestGate` are names only. In Lean $N_r(\phi)$ is defined for every $\phi$ (when the denominator vanishes, Lean's convention returns the zero vector); the theorem uses it only where each denominator $\sqrt{(1+u\cdot v)/2}$ is positive.

Items 1 and 2 of [@rem-appe-real-realizability-return-phase] are frozen in the pinned repository in the case where one object is non-orthogonal to every other one, in the following form; no filling condition is needed there. The general filled case and the qubit statement of item 4 remain manual derivations.

::: {.proposition #prop-appe-real-rephasing-star title="A Hermitian Matrix with a Row without Zeros: Rephasable to a Real Matrix If and Only If All Three-Point Products Are Real" lean="D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_rephasing_iff_triple_products_real D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_gram_rephasing_iff_triple_products_real"}
Let $G$ be an $N\times N$ complex matrix and $i_0$ an index such that $G_{i_0j}\neq0$ for every $j$.

1. If $G$ is Hermitian, then there are real numbers $\theta_1,\dots,\theta_N$ such that every $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real if and only if $G_{ij}G_{jk}G_{ki}$ is real for all indices $i,j,k$ (repetitions allowed).
2. If $G$ is positive semidefinite, then there are real numbers $\theta_1,\dots,\theta_N$ and a real $N\times N$ matrix $B$ with $e^{i\theta_i}G_{ij}e^{-i\theta_j}=\left(B^{\mathsf T}B\right)_{ij}$ for all $i,j$ if and only if $G_{ij}G_{jk}G_{ki}$ is real for all indices $i,j,k$.
:::

::: proof
"Only if": the phases cancel around $i\to j\to k\to i$, so rephasing does not change $G_{ij}G_{jk}G_{ki}$, and computed in a real matrix it is real. "If": take $\theta_j=\arg G_{i_0j}$. Since $G$ is Hermitian, $G_{ji_0}=\overline{G_{i_0j}}$, hence

$$
e^{i\theta_i}G_{ij}e^{-i\theta_j}=\frac{G_{i_0i}\,G_{ij}\,G_{ji_0}}{\lvert G_{i_0i}\rvert\,\lvert G_{i_0j}\rvert},
$$

a positive multiple of the three-point product $G_{i_0i}G_{ij}G_{ji_0}$, and therefore real; an entry $G_{ij}=0$ stays zero. Item 2: rephasing is $G\mapsto DGD^{*}$ with $D$ a diagonal unitary, which preserves positive semidefiniteness; the rephased matrix has real entries, so it is a real symmetric positive semidefinite matrix and can be written $B^{\mathsf T}B$.

For a Hermitian matrix, three-point products with a repeated index (such as $G_{ij}G_{ji}G_{ii}=\lvert G_{ij}\rvert^2G_{ii}$) and those containing a zero entry are automatically real, so the condition has content only on the triangles of the non-orthogonality graph, in agreement with item 2 of [@rem-appe-real-realizability-return-phase]. The full proof is checked by the Lean kernel.
:::

The imaginary part of the return phase appears only when $D\neq0$. Pairwise comparisons can tell whether $D$ vanishes but not its sign: $D^2=1+2xyz-x^2-y^2-z^2$ (with $x=a\cdot b$, $y=b\cdot c$, $z=c\cdot a$; this is [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)) gives only its square. Whether $D$ vanishes answers a question adjacent to `H7`: whether a family of objects needs complex amplitudes.

::: {.remark #rem-appe-real-realizability-return-phase title="When a Family of Objects Can Be Described with Real Numbers Alone: Whether the Three-Point Bargmann Products Are Real (Manual Derivation and Literature)"}
**Manual derivation.** Let $\psi_1,\dots,\psi_N\in\mathbb{C}^d$ be unit vectors and $G_{ij}=\langle\psi_i,\psi_j\rangle$. Join the pairs with $G_{ij}\neq0$ by an edge and call the resulting graph $\Gamma$ the **non-orthogonality graph**. Call the family **realizable over the reals** if there are real numbers $\theta_1,\dots,\theta_N$ such that every $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real. That real matrix is then the Gram matrix of the vectors $e^{-i\theta_i}\psi_i$; it is real symmetric and positive semidefinite of rank $r=\operatorname{rank}G\le d$, so it can be written $V^{\mathsf T}V$ with the columns of $V$ real vectors $v_i\in\mathbb{R}^r\subseteq\mathbb{C}^d$. The two families have the same Gram matrix, so by the frozen theorem [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) there is a $d\times d$ unitary $U$ with $e^{-i\theta_i}\psi_i=Uv_i$. So realizability over the reals means: after phases are applied, the vectors lie in the unitary image of a real subspace, with the Gram matrix unchanged up to those phases. For a closed walk $i_0,i_1,\dots,i_k=i_0$ in $\Gamma$, call $G_{i_0i_1}G_{i_1i_2}\cdots G_{i_{k-1}i_0}$ its **Bargmann product**; it is invariant under $\psi_i\mapsto e^{-i\theta_i}\psi_i$.

1. If the family is realizable over the reals, every Bargmann product is real, in particular every three-point product $G_{ij}G_{jk}G_{ki}$.
2. Conversely, if $\Gamma$ is filled by triangles ([@rem-appe-triangle-simple-connectivity]; for instance when no two objects are orthogonal, or when $\Gamma$ is chordal) and the three-point product on every triangle of $\Gamma$ is real, then the family is realizable over the reals.
3. The filling condition cannot be dropped. In $\mathbb{C}^3$ take $\psi_1=e_1$, $\psi_2=\frac{1}{\sqrt3}(e_1+e_2+e_3)$, $\psi_3=e_2$, $\psi_4=\frac12\bigl(e_1+ie_2-(1+i)e_3\bigr)$. Then $\psi_1\perp\psi_3$ and $\psi_2\perp\psi_4$, the other inner products are nonzero, and $\Gamma$ is a four-cycle without triangles: the requirement of item 2 that triangles be real holds vacuously, while "filled by triangles" fails. The Bargmann product of the four-cycle is $G_{12}G_{23}G_{34}G_{41}=\frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\cdot\frac i2\cdot\frac12=\frac{i}{12}$, which is not real, so by item 1 the family is not realizable over the reals.
4. Qubits: let $a$ be the Bloch vector of $\psi_a$. The family is realizable over the reals if and only if all Bloch vectors lie in one plane through the center, if and only if the oriented volume $D=a\cdot(b\times c)$ of every three of them vanishes; no filling condition is needed here: for instance $a,b,-a,-b$ have a four-cycle as non-orthogonality graph and are still realizable. For pairwise non-antipodal $a,b,c$, the return phase $(S-iD)/\sqrt{S^2+D^2}$ of [@thm-appe-bloch-triangle-return-phase] is non-real if and only if $D\neq0$.
5. The pairwise similarity readings $a\cdot b$, $b\cdot c$, $c\cdot a$ give only $D^2$. Complex conjugation $\psi\mapsto\bar\psi$ maps the Bloch vector $(r_x,r_y,r_z)$ to $(r_x,-r_y,r_z)$: the pairwise readings are unchanged, $D$ changes sign, and the return phase is conjugated.

Derivation: item 1, the Bargmann product is invariant, and computed in the real matrix $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ it is real. Item 2: on the edges of $\Gamma$ put $g(i,j)=\left(G_{ij}/\lvert G_{ij}\rvert\right)^2$; it is defined only on edges, where $G_{ij}\neq0$, and takes values in the circle group. $G_{ji}=\overline{G_{ij}}$ gives $g(j,i)=g(i,j)^{-1}$. On a triangle $ijk$, with $B_{ijk}=G_{ij}G_{jk}G_{ki}\neq0$, one has $g(i,j)\,g(j,k)\,g(i,k)^{-1}=g(i,j)\,g(j,k)\,g(k,i)=\left(B_{ijk}/\lvert B_{ijk}\rvert\right)^2$, which equals $1$ exactly when $B_{ijk}$ is real (of either sign). So reality of the three-point products is exactly the chain rule $g(i,j)\,g(j,k)=g(i,k)$ for $g$ on triangles. By item 1 of [@rem-appe-triangle-simple-connectivity] (by [@thm-appe-chordal-gain-potential] with the circle group when $\Gamma$ is chordal) there are $\varphi_i$ in the circle group with $g(i,j)=\varphi_i^{-1}\varphi_j$. Choose $\theta_i$ with $e^{2i\theta_i}=\varphi_i$; then $\left(e^{i\theta_i}G_{ij}e^{-i\theta_j}/\lvert G_{ij}\rvert\right)^2=\varphi_i\,g(i,j)\,\varphi_j^{-1}=1$, so $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real; on non-adjacent pairs $G_{ij}=0$ is real already. Item 3 is a direct computation. Item 4: for the rank-one projections $P_a=\lvert\psi_a\rangle\langle\psi_a\rvert=\frac12(\mathbf{1}+a\cdot\sigma)$ one has $G_{ab}G_{bc}G_{ca}=\operatorname{Tr}(P_aP_bP_c)$, and the frozen theorem [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) gives $\operatorname{Tr}(P_aP_bP_c)=\frac14(S+iD)$, so the three-point product is real exactly when $D=0$. If all Bloch vectors lie in one plane through the center, a rotation takes that plane to the $xz$ plane, and the rotation is implemented by a unitary matrix (the map from $\mathrm{SU}(2)$ to $\mathrm{SO}(3)$ is onto, `Literature`); the eigenspinor of a unit vector $(\sin\alpha,0,\cos\alpha)$ in the $xz$ plane is $\left(\cos\frac\alpha2,\sin\frac\alpha2\right)$, a real vector, so the family is realizable over the reals. Conversely, realizability gives real vectors $v_i$ in $\mathbb{R}^r\subseteq\mathbb{C}^2$ ($r\le2$) and a unitary $U$; the Bloch vectors of real vectors lie in the $xz$ plane, and $U$ turns that plane into another plane through the center. The Bloch vectors lie in one plane through the center exactly when they span at most two dimensions, that is, exactly when every three of them have zero oriented volume. The last sentence is items 1 and 2 of [@thm-appe-bloch-triangle-return-phase]: for pairwise non-antipodal vectors $S^2+D^2>0$. The formula for $D^2$ in item 5 is the one above; the action of complex conjugation is a direct computation ($\bar\sigma_y=-\sigma_y$).

**Literature result.** The direction of item 1 (a non-real Bargmann product shows that the family cannot all be written as real vectors) is the imaginarity witness of Fernandes, Wagner, Novo and Galvão (2024). They also point out that pairwise overlap measurements suffice to witness imaginarity of sets of four states but not of sets of three. This does not contradict items 4 and 5: the pairwise overlap moduli of three unit vectors can always be realized by real vectors in $\mathbb{R}^3$ (replacing the three off-diagonal entries of the Gram matrix by their moduli does not decrease the determinant), whereas item 4 uses the dimension of a qubit, and realizability here keeps the Gram matrix up to phases. The argument for item 2 has the same form as the balance criterion for gain graphs: a gain graph is balanced if and only if its gains can be switched to the identity (Zaslavsky 1989).
:::

The "central complex structure" listed under `H7` in the ledger is an input about tomography of composite systems. This remark answers an adjacent and narrower question: whether a given family of objects needs complex amplitudes, in the sense of keeping its Gram matrix up to phases. As long as comparable triangles fill every cycle, the answer is decided by the three-point Bargmann products, which are readings of products of comparison values; the moduli of pairwise overlaps are in general not enough. On a qubit the pairwise similarity readings are already enough through $D^2$: the family is realizable exactly when no three objects enclose a nonzero oriented volume; what pairwise readings cannot see is only the sign of $D$, the chirality that complex conjugation exchanges. None of this derives the complex structure. A model built from real vectors satisfies every clause (see the count in E.8.7), so "complex numbers are needed" remains an input; what changes is its form. The four-cycle of item 3 is the same graph as the four-cycle in [@rem-appe-triangle-simple-connectivity]: in general dimension this graph keeps triangle compatibility from giving a potential and keeps three-point readings from settling realizability; the qubit family $a,b,-a,-b$ shows that with restricted dimension the same graph need not prevent a decision.

## E.8.5 The Born Weight: on a Qubit the Gap Can Be Restated as Minimal Tomographic Rank {#sec-appe-born-minimal-rank}

The gap in `H5` is widest on a qubit. For $d\ge3$, a bounded rule that depends only on pairwise comparison is already forced to be the Born rule by normalization on every orthonormal basis together with $f(1)=1$. For $d=2$ it reduces to antipodal normalization, which the cubic function of [@ex-appe-qubit-cubic-and-tomography] satisfies without being the Born rule. The input that is missing on a qubit can be restated, and the restatement uses the same kind of counting as `H7`.

::: {.remark #rem-appe-born-zonal-minimal-rank title="On a Qubit the Born Rule Is the Zonal Probability Rule of Minimal Tomographic Rank (Manual Derivation)"}
**Manual derivation.** On the Bloch sphere $S^2$ consider outcome probabilities that depend only on pairwise comparison: for a preparation $\mathbf{s}$ and an outcome $\mathbf{r}$ the probability is $p(\mathbf{r}\mid\mathbf{s})=f(\mathbf{s}\cdot\mathbf{r})$, with $f$ continuous on $[-1,1]$. Write $t=\mathbf{s}\cdot\mathbf{r}$; the sagitta of the pair is $v=1-t$. Assume

- **antipodal normalization**: $f(t)+f(-t)=1$;
- **certainty**: $f(1)=1$.

Expand $f$ in Legendre polynomials, $f=\sum_l c_lP_l$. Define the **tomographic rank** $K(f)$ as the dimension of the real linear span of the functions $\{\mathbf{r}\mapsto f(\mathbf{s}\cdot\mathbf{r})\}_{\mathbf{s}\in S^2}$, that is, the number of real parameters needed to predict all outcome probabilities of one preparation. Then

$$
K(f)=\sum_{l:\,c_l\neq0}(2l+1),
$$

and $K(f)=\infty$ when $f$ is not a polynomial. For polynomial $f$ the reason is the addition theorem for real spherical harmonics, $P_l(\mathbf{s}\cdot\mathbf{r})=\frac{4\pi}{2l+1}\sum_{m}Y_{lm}(\mathbf{s})\,Y_{lm}(\mathbf{r})$: each degree with $c_l\neq0$ contributes the $2l+1$ linearly independent functions $Y_{lm}(\mathbf{r})$, and the coefficient vectors $\bigl(Y_{lm}(\mathbf{s})\bigr)$ span the whole coefficient space as $\mathbf{s}$ varies. When $f$ is not a polynomial, infinitely many $c_l$ are nonzero; for each such $l$ the projection of $f(\mathbf{s}\cdot\,\cdot\,)$ onto the space of spherical harmonics of degree $l$ is $c_lP_l(\mathbf{s}\cdot\,\cdot\,)$ (the Funk–Hecke formula), and that space is irreducible under rotations, so the span projects onto all of it and has dimension at least $2l+1$. The addition theorem, the Funk–Hecke formula and the irreducibility of the spaces of spherical harmonics are standard facts (`Literature`).

Antipodal normalization forces $c_0=\frac12$ and makes the coefficients of all even degrees $l\ge2$ vanish. Certainty excludes $f\equiv\frac12$, so at least one odd degree occurs. Hence

$$
K(f)\ \ge\ 1+3=4,\qquad K(f)=4\iff f(t)=\frac{1+t}{2}=1-\frac v2 .
$$

The cubic rule $f(t)=\frac12(1+t^3)$ contains the degrees $l=0,1,3$ (since $t^3=\frac35P_1+\frac25P_3$), and its tomographic rank is $1+3+7=11$.

**No count is needed for $d\ge3$ (manual derivation).** On $\mathbb{CP}^{d-1}$ let $p=f\bigl(\lvert\langle x\mid y\rangle\rvert^2\bigr)$ with $f$ bounded, $f(1)=1$, and normalization on every orthonormal basis. The squared moduli of a unit vector in a basis can be any point of the probability simplex, so $\sum_if(t_i)=1$ for all $t_i\ge0$ with $\sum_it_i=1$. The point $(1,0,\dots,0)$ gives $f(0)=0$. For $d\ge3$, comparing $(t,s,1-t-s,0,\dots)$ with $(t+s,0,1-t-s,0,\dots)$ gives $f(t)+f(s)=f(t+s)$ for $t,s\ge0$ with $t+s\le1$; a bounded function that is additive in this sense is linear (a standard fact), so $f(t)=t$, and the tomographic rank $d^2$ is a conclusion and not an input. A nonnegative zonal rule, extended additively to all projections, is a special case of the frame functions treated by Gleason's theorem ([@thm-gleason-finite-projection]); the few lines above do not use that theorem. For $d=2$ the simplex is a single edge, the comparison cannot be made, and only antipodal normalization is left.

**Literature background.** Hardy's simplicity axiom (2001) requires the number of parameters $K$ of the state space to take the least value compatible with the other axioms, and $K=N^2$ is derived from it. Galley–Masanes (2017) relate alternatives to the Born rule to representations of the unitary group. The first is a precedent for conditions of the kind "minimal tomographic rank", and the second gives a related classification; the statement and derivation above are not taken from either paper.
:::

Under the premise that probability depends only on pairwise comparison, the input of `H5` therefore splits as follows. For $d\ge3$, boundedness, $f(1)=1$ and projective additivity are already enough. For $d=2$ one more input is needed: it can be the full effect additivity listed in E.7, or it can be a count, namely that all predictions for one preparation are fixed by $4$ real numbers and no fewer will do. The number $4$ is the $\dim_{\mathbb{R}}\operatorname{Herm}(2)$ used by the local-tomography count of `H7`, and it is also the dimension occupied by the Gram embedding of [@rem-appe-gram-from-flatness] (the three coordinates of the Bloch vector) together with normalization: probability is affine in the sagitta exactly when it is an affine function of the embedding coordinates. This only changes the shape of the input. Minimal tomographic rank is still a `T2` operational assumption, and pairwise fairness does not imply it. Discontinuous rules, and rules that depend on more than pairwise comparison, are outside this remark.

## E.8.6 Dynamics: Invertible Evolution, Continuity in Time, the Generator and Conditioning {#sec-appe-dynamics-from-comparison}

`H6` lists four inputs: two-sided invertibility of the evolution, strong continuity in time, repeatable minimally disturbing conditioning, and the Hamiltonian $H$ itself. This subsection takes them in turn and asks how far the comparison axiom and the chord–sagitta decomposition reach. Each of the first two has a sufficient condition stated purely in terms of compared objects and their readings, and models satisfying every clause mark where those conditions stop; the third can be written as an optimization principle, although the choice of reading remains an input; $H$ is unchanged. We keep the notation of E.8 and set $\hbar=1$.

Start with invertibility. [@rem-appe-chord-sagitta-layer0] used both orders of Clause III. If only one order is kept, the defect can be computed exactly.

::: {.remark #rem-appe-one-sided-fairness title="One-Sided Fairness: the Defect Is a Projection (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a unital associative $*$-algebra in which $2$ is invertible, and let $u\in\mathcal{A}$ satisfy only $u^*u=\mathbf{1}$. Put $p=\mathbf{1}-uu^*$, and define $S,A,v,\Delta$ as in [@rem-appe-chord-sagitta-layer0] (without assuming that $u$ commutes with $u^*$). Then

1. $p^*=p$ and $p^2=p$;
2. $\Delta^*\Delta=2v$;
3. $\Delta\Delta^*=2v-p$;
4. $2(AS-SA)=-p$.

Derivation: $p^2=\mathbf{1}-2uu^*+u(u^*u)u^*=p$; $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$; $\Delta\Delta^*=uu^*-u-u^*+\mathbf{1}=2v-p$; subtracting the two expansions in the derivation of [@rem-appe-chord-sagitta-layer0] gives $uu^*-u^*u=2(AS-SA)$, whose left side is $-p$.

So under $u^*u=\mathbf{1}$ the three statements $uu^*=\mathbf{1}$, $SA=AS$ and $\Delta\Delta^*=\Delta^*\Delta$ are equivalent: when Clause III holds in one order only, the similarity and difference channels stop commuting and the chord–sagitta lock loses a projection on the other side. The unilateral shift $Se_k=e_{k+1}$ on $\ell^2(\mathbb{N})$ is exactly this case: $S^*S=\mathbf{1}$ and $p=\mathbf{1}-SS^*=\lvert e_0\rangle\langle e_0\rvert$. Taken as a comparison value $\mathrm{CMP}(x,y)=S$, it gives $\mathrm{CMP}(x,y)\,\mathrm{CMP}(y,x)=SS^*\neq\mathbf{1}$ and violates Clause III.

If $\mathcal{A}$ carries a faithful tracial reading $\tau$ (positive, $\tau(ab)=\tau(ba)$, and $\tau(a^*a)=0$ only for $a=0$), every one-sided fair element of $\mathcal{A}$ is two-sided: $\tau(p)=\tau(\mathbf{1})-\tau(u^*u)=0$ and $p=p^*p$, hence $p=0$. Finite-dimensional matrix algebras have such a trace; the algebra of all bounded operators on $\ell^2$ does not (`literature result`). This paragraph concerns elements of $\mathcal{A}$ only; the next example shows that it does not reach the induced evolution.
:::

This does not yet answer the question of `H6`, which concerns the evolution of states. A state evolution may be a symmetry of the comparison structure without being a comparison value itself. Below, "evolution" is read as the map induced on the state space by a map of objects that preserves every comparison value (`MODEL`); the model shows that no clause excludes the unilateral shift arising in this way.

::: {.example #ex-appe-bilateral-shift-model title="With Only a Forward Half-Orbit, a Two-Sided Fair Comparison Induces the Unilateral Shift (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be the algebra of all bounded operators on $\ell^2(\mathbb{Z})$, $\lambda$ the bilateral shift $\delta_n\mapsto\delta_{n+1}$, the object set $X=\mathbb{N}$, and $\mathrm{CMP}(m,n)=\lambda^{n-m}$.

- Clauses II and III: $\mathrm{CMP}(n,m)=\lambda^{m-n}=\mathrm{CMP}(m,n)^*$ and $\lambda$ is unitary. Clause IV: $\lambda^{n-m}\lambda^{k-n}=\lambda^{k-m}$. Clause I: $m\mapsto\lambda^m$ is injective, so the extensional quotient identifies no two points. The positivity condition holds in a $C^*$-algebra.
- The time step $T(m)=m+1$ preserves every comparison exactly: $\mathrm{CMP}(m+1,n+1)=\mathrm{CMP}(m,n)$.
- Take the vector state of $\delta_0$. The state space spanned by the objects is $\mathcal{K}=\overline{\operatorname{span}}\{\lambda^m\delta_0:m\in\mathbb{N}\}=\ell^2(\mathbb{N})$, and the evolution induced by $T$, $\lambda^m\delta_0\mapsto\lambda^{m+1}\delta_0$, is the restriction of $\lambda$ to $\mathcal{K}$, which is precisely the unilateral shift; $\lambda^{-1}\delta_0$ does not lie in $\mathcal{K}$.
- Replace $\mathcal{A}$ by the commutative $C^*$-algebra generated by $\lambda$. The vector state of $\delta_0$ is a faithful trace on it, Clauses I–IV and the positivity condition still hold, and neither $\mathcal{K}$ nor the induced evolution changes. So a faithful trace on the algebra does not exclude the unilateral shift either: the induced evolution is the compression of $\lambda$ to $\mathcal{K}$, not an element of $\mathcal{A}$.

In general, let Clauses II–IV hold and let $T:X\to X$ satisfy $\mathrm{CMP}(Tx,Ty)=\mathrm{CMP}(x,y)$. Choose an anchor $o$ and put $w=\mathrm{CMP}(o,To)$. Clause IV gives $\mathrm{CMP}(o,Tx)=\mathrm{CMP}(o,To)\,\mathrm{CMP}(To,Tx)=w\,\mathrm{CMP}(o,x)$: on the anchored representation of [@rem-appe-anchoring-consequences], a comparison-preserving map is left multiplication by the fair element $w$, and by Clause I it is injective on the extensional quotient. What it induces on the state space is an isometry; whether that isometry is invertible depends on whether the object set is closed under time reversal. Each of the following is sufficient:

1. **Past completeness**: $T$ is surjective, so every object has a predecessor. Then $w$ maps the state space onto itself and the induced evolution is unitary.
2. The state space is finite-dimensional: an isometry is then automatically onto.

Past completeness is not necessary: for $\mathcal{A}=\mathbb{C}$ and $\mathrm{CMP}(m,n)=e^{i(n-m)\theta}$ the map $T$ is not onto, the state space is $\mathbb{C}$, and the evolution is unitary. The exact criterion lives at the operator level: the wandering subspace $\mathcal{K}\ominus U\mathcal{K}$ of the induced isometry $U$ is zero, which merely restates that the isometry is onto. The Wold decomposition writes every isometry as the direct sum of a unitary part and unilateral shifts (`literature result`); its finite-level form with the norm identity is the frozen theorem [`exists_wold_decomposition`](lean:D5/S3/HilbertOperators/WoldDecomposition.exists_wold_decomposition).
:::

The item "two-sided invertibility" in `H6` can therefore be secured by a sentence about objects: **every object has a past.** It is sufficient, not necessary; it is also an input, not a consequence, since the example satisfies every clause without it.

Next, continuity in time. Let a family of objects $x_t$ ($t\in\mathbb{R}$) satisfy Clauses II–IV with $\mathrm{CMP}(x_s,x_t)=w(t-s)$ depending only on the time difference, and let $\varphi$ be a state.

::: {.remark #rem-appe-sagitta-continuity title="If the Sagitta Reading Is Continuous at Zero, the Evolution Is Strongly Continuous (Manual Derivation and Literature)"}
**Manual derivation.** Write $f(t)=\varphi\bigl(w(t)\bigr)$ and the sagitta reading $\nu(t)=\varphi\bigl(v(x_0,x_t)\bigr)=1-\operatorname{Re}f(t)$, which is half the squared chord distance of [@rem-appe-gram-from-flatness]. In the GNS representation $(\pi,\Omega)$ of $\varphi$ put $\xi_s=\pi(w(s))\Omega$, $\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$, and let $U_t$ be $\pi(w(t))$ restricted to $\mathcal{K}$. Then:

1. $U_t$ is a one-parameter unitary group on $\mathcal{K}$, and $\lVert(U_t-\mathbf{1})\xi_s\rVert^2=2\nu(t)$ for all $s,t$;
2. $f$ is positive definite, and $\lvert f(t)-f(s)\rvert^2\le2\nu(t-s)$;
3. the following are equivalent: $\nu$ is continuous at $0$; $U$ is strongly continuous on $\mathcal{K}$; $f$ is continuous everywhere.

Derivation: $\lVert(U_t-\mathbf{1})\xi_s\rVert^2=\varphi\bigl((w(t+s)-w(s))^*(w(t+s)-w(s))\bigr)=2-2\operatorname{Re}\varphi(w(t))$, using $w(s)^*w(t+s)=w(t)$. Time runs over all of $\mathbb{R}$ here, so $U_tU_{-t}=\mathbf{1}$ holds on $\mathcal{K}$ and $U_t$ is unitary. Positive definiteness is the same computation as in [@rem-appe-gram-from-flatness]. The inequality: $f(t)-f(s)=\langle\Omega,U_s(U_{t-s}-\mathbf{1})\Omega\rangle$, followed by Cauchy–Schwarz. The equivalence: $\lVert(U_h-\mathbf{1})\xi_s\rVert\to0$ on the generating vectors; $\lVert U_h-\mathbf{1}\rVert\le2$ and density carry this to all of $\mathcal{K}$, and $\lVert U_{t+h}\xi-U_t\xi\rVert=\lVert(U_h-\mathbf{1})\xi\rVert$ carries it to every time.

**Measurability of the readings is not enough (manual derivation).** Let $\mathcal{A}$ be the algebra of all bounded operators on $\ell^2(\mathbb{R}_{\mathrm{d}})$ ($\mathbb{R}$ with the discrete topology), $w(t)$ the translation $\delta_r\mapsto\delta_{r+t}$, and $\varphi$ the vector state of $\delta_0$. Clauses II–IV and the positivity condition hold, and $f$ equals $1$ at $0$ and $0$ elsewhere, so it vanishes almost everywhere and is measurable; yet $\nu(t)=1$ for $t\neq0$: every time translate is orthogonal to the original object.

**Literature result.** A weakly measurable one-parameter unitary group on a separable Hilbert space is strongly continuous (von Neumann 1932). In the setting above the matrix elements are $\langle\xi_r,U_t\xi_s\rangle=f(t+s-r)$, so measurability of $f$ together with separability of $\mathcal{K}$ meets the hypotheses of that theorem; in the countermodel $\mathcal{K}$ is not separable. A strongly continuous one-parameter unitary group has a self-adjoint generator (Stone 1932).
:::

Item 2 says that **a comparison reading taken against $x_0$ changes over an interval of time by at most the chord distance between the objects at its ends.** So the item "strong continuity" in `H6` can be replaced by a single scalar condition on readings: an object and its small time translates are close in chord distance. In finite dimension this connects directly with the frozen theorem [@thm-calibrated-unitary-group]: if $U$ is continuous, choose $\delta>0$ with $\lVert U_s-\mathbf{1}\rVert\le\frac12$ for $0\le s\le\delta$; then $V=\frac1\delta\int_0^\delta U_s\,ds$ is invertible and $U_tV=\frac1\delta\int_t^{t+\delta}U_s\,ds$ is differentiable in $t$, so $U_t=(U_tV)V^{-1}$ is differentiable at $0$ (`manual derivation`). This is exactly the differentiability hypothesis of [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group), which then gives $U_t=e^{-itH}$ with $H$ self-adjoint.

The generator itself can also be read off from chord and sagitta.

::: {.remark #rem-appe-generator-chord-sagitta title="The Generator Is the Chord Rate, the Sagitta Rate Tends to Half Its Square; Finite-Step Speed Bounds (Manual Derivation and Literature)"}
**Manual derivation.** Let $H$ be a Hermitian operator on a finite-dimensional space, $u_t=e^{-itH}$, $\psi$ a unit vector, and $\langle X\rangle=\langle\psi,X\psi\rangle$.

1. $S_t=\cos(tH)$, $A_t=-i\sin(tH)$, $v_t=2\sin^2(tH/2)$, and $\lVert\Delta_t\psi\rVert^2=2\langle v_t\rangle$.
2. $\dfrac{t^2}{2}\langle H^2\rangle-\dfrac{t^4}{24}\langle H^4\rangle\le\langle v_t\rangle\le\dfrac{t^2}{2}\langle H^2\rangle$.
3. For $t\neq0$: $\bigl\lVert(\Delta_t/t+iH)\psi\bigr\rVert\le\frac{\lvert t\rvert}{2}\lVert H^2\psi\rVert$, $\bigl\lVert(A_t/t+iH)\psi\bigr\rVert\le\frac{t^2}{6}\lVert H^3\psi\rVert$, and $\bigl\lVert(v_t/t^2-H^2/2)\psi\bigr\rVert\le\frac{t^2}{24}\lVert H^4\psi\rVert$.
4. Put $\sigma^2=\langle H^2\rangle-\langle H\rangle^2$. For every positive integer $N$ with $\sigma\lvert t\rvert\le2N$,

$$
\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le2N\arcsin\frac{\sigma\lvert t\rvert}{2N}.
$$

The right-hand side decreases in $N$ and tends to $\sigma\lvert t\rvert$ as $N\to\infty$, so $\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le\sigma\lvert t\rvert$ for every $t$, with equality for an equal two-level superposition.

Derivation: items 1–3 reduce by the spectral decomposition to the scalar inequalities $\frac{x^2}2-\frac{x^4}{24}\le1-\cos x\le\frac{x^2}2$, $\lvert e^{-ix}-1+ix\rvert\le\frac{x^2}2$, $\lvert\sin x-x\rvert\le\frac{\lvert x\rvert^3}6$ and $\lvert1-\cos x-\frac{x^2}2\rvert\le\frac{x^4}{24}$. Item 4: item 2 applied to $H-\langle H\rangle$ gives the one-step bound $\lvert\langle\psi,u_h\psi\rangle\rvert\ge1-\frac{\sigma^2h^2}2$, so for $\sigma\lvert h\rvert\le2$ the angle $\arccos\lvert\langle\psi,u_h\psi\rangle\rvert$ is at most $2\arcsin\frac{\sigma\lvert h\rvert}2$ (when the right side is at least $\frac\pi2$ there is nothing to prove); since $u_t$ commutes with $H$, $\sigma$ is constant along the orbit and every pair of neighbouring points has this one-step angle; take $h=t/N$ and add the $N$ steps with the frozen Fubini–Study triangle inequality [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle). Monotonicity follows because $y\mapsto\arcsin y/y$ increases on $(0,1]$.

**Literature result.** The limiting form of item 4 is the Mandelstam–Tamm angle bound for an autonomous pure state (Mandelstam–Tamm 1945; the cosine form is in Fleming 1973). [@rem-qsl-zeno-literature] in Chapter 7 derives the same bound by a derivative argument.
:::

Item 3 says that **the generator is the chord rate, and the sagitta rate tends to half its square.** The lock $\Delta_t^*\Delta_t=2v_t$ becomes $(-iH)^*(-iH)=2\cdot\frac{H^2}2$ in the limit. Item 4 says that **a one-step sagitta bound plus the triangle inequality for angles is the speed limit**, with an exact bound at every finite number of steps. [@thm-fubini-study-record-time] takes as hypotheses the bounds $\mathrm{energy}\cdot\tau/\hbar$ on the angular displacement towards each of two orthogonal records; if both record states are reached from the same initial state within time $\tau$ by finite-dimensional Hamiltonian evolutions, and the energy standard deviation of the initial state under each Hamiltonian is at most $\mathrm{energy}>0$, the limiting form of item 4 supplies both hypotheses.

Last, conditioning. The resetting instrument of E.5 shows that Born weights alone do not fix the post-measurement state, and that repeatability and minimal disturbance are needed. The two can be merged into one statement about comparisons.

::: {.remark #rem-appe-luders-nearest title="The Lüders State Is the Object with the Largest Comparison Reading among Those Certain to Pass the Test (Manual Derivation and Literature)"}
**Manual derivation.** Let $P$ be a projection, $\rho$ a state and $p=\operatorname{tr}(P\rho)>0$. Call a state $\eta$ **certain to pass the test** if $\operatorname{tr}(P\eta)=1$, that is, $\eta=P\eta P$; such an $\eta$ gives the same outcome when $P$ is measured again, so repeatability holds automatically.

1. Pure state $\rho=\lvert\psi\rangle\langle\psi\rvert$: for a unit vector $\phi$ in the range of $P$, $\lvert\langle\psi,\phi\rangle\rvert=\lvert\langle P\psi,\phi\rangle\rvert\le\lVert P\psi\rVert$, with equality if and only if $\phi$ is parallel to $P\psi$. So in the chord distance $\min_\alpha\lVert\psi-e^{i\alpha}\phi\rVert^2=2-2\lvert\langle\psi,\phi\rangle\rvert$, the nearest object certain to pass the test is the Lüders vector $P\psi/\lVert P\psi\rVert$, unique up to a phase.
2. If $\lVert P\psi\rVert^2=1-\varepsilon$, the sagitta $1-\sqrt{1-\varepsilon}$ of this conditioning step lies between $\frac\varepsilon2$ and $\varepsilon$.
3. Mixed states: among the states certain to pass the test, the fidelity $\operatorname{Fid}(\rho,\eta)=\bigl(\operatorname{tr}\lvert\sqrt\rho\sqrt\eta\rvert\bigr)^2$ has maximum $p$, attained only at $P\rho P/p$. Derivation: by Uhlmann's theorem (Uhlmann 1976, `literature result`), $\operatorname{Fid}(\rho,\eta)$ is the maximum, and it is attained, of the squared overlap between a fixed purification $\Psi$ of $\rho$ and the purifications $\Phi$ of $\eta$; $\eta=P\eta P$ puts $\Phi$ in the range of $P\otimes\mathbf{1}$, item 1 gives $\lvert\langle\Psi,\Phi\rangle\rvert\le\sqrt p$, and equality forces $\Phi$ to be parallel to $(P\otimes\mathbf{1})\Psi$, whose reduced state is the Lüders state.
4. With the trace norm, or with the Hilbert–Schmidt distance among trace-one candidates, the nearest state is not the Lüders state. Trace norm: for $\rho=\frac14\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$ and $P=\operatorname{diag}(1,1,0)$, the Lüders state $\operatorname{diag}(\frac12,\frac12,0)$ gives $\lVert\rho-\rho_{\mathrm L}\rVert_1=\frac{1+\sqrt{17}}4$, while $\eta=\begin{pmatrix}\frac12&\frac14&0\\\frac14&\frac12&0\\0&0&0\end{pmatrix}$, also certain to pass, gives the smaller $\frac{\sqrt6}2$. Hilbert–Schmidt distance: for $\rho=\operatorname{diag}(\frac12,\frac14,\frac14)$ the Lüders state $\operatorname{diag}(\frac23,\frac13,0)$ has squared distance $\frac{14}{144}$, while $\operatorname{diag}(\frac58,\frac38,0)$ has the smaller $\frac{27}{288}$.
:::

The item "repeatable minimal disturbance" in `H6` can therefore be stated as (`MODEL`): **the conditioned object is, among the objects certain to pass this test, the one with the largest comparison reading with the original.** With fidelity as the reading, the result is exactly the Lüders state, and it is unique. The input has not disappeared; it has changed shape: item 4 shows that another reading gives another update. The definition of the conditional state and the fact that it is a state are in the frozen theorem [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState); the optimality itself has no frozen statement.

## E.8.7 Composites and Exchange {#sec-appe-composites-and-exchange}

`H7` has two inputs: complex local tomography and the choice of exchange statistics. The first appears in [@ex-appe-qubit-cubic-and-tomography] as a count for two rebits. The counts for the three scalar fields fit in one line.

::: {.remark #rem-appe-tomography-count title="Parameter Counts for Real, Complex and Quaternionic Scalars (Manual Derivation and Literature)"}
**Manual derivation.** For $F\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$ write $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$. An $n\times n$ Hermitian matrix over $F$ has $n$ real diagonal entries and one entry of $F$ for each pair $(i,j)$, so its real dimension is

$$
K_d(n)=n+d\cdot\frac{n(n-1)}{2}.
$$

Write $d=0$ for the classical case, $K_0(n)=n$. Direct expansion gives

$$
K_d(ab)-K_d(a)\,K_d(b)=\frac{d(2-d)}{4}\,a(a-1)\,b(b-1).
$$

Hence for $a,b\ge2$, "a system of dimension $ab$ has as many parameters as the product of the two local numbers" holds if and only if $d=0$ or $d=2$. For $d=1$ there are $\frac14a(a-1)b(b-1)$ extra parameters visible only to global readings; for $a=b=2$ this is the $J\otimes J$ of [@ex-appe-qubit-cubic-and-tomography]. For $d=4$ there are $2a(a-1)b(b-1)$ fewer than the product of the local numbers.

In the language of comparison: of the $d$ real directions on each pair $(i,j)$, one is a similarity direction and the remaining $d-1$ are right-angle comparison directions squaring to $-\mathbf{1}$ (`MODEL`). Multiplicative counting asks for exactly one right-angle direction off the diagonal, or for no off-diagonal entries at all. The centres of the three matrix algebras are $\mathbb{R}$, $\mathbb{C}$ and $\mathbb{R}$ (`literature result`), and only in the complex case does the centre contain a right-angle comparison; so within these three classes, "multiplicative counting" and "a right-angle comparison in the centre" are the same thing. This is not a characterization for general algebras.

The sagitta of a product comparison $u_1\otimes u_2$ is $\mathbf{1}-S_1\otimes S_2-A_1\otimes A_2$. The two-rebit states $\rho_\pm=\frac14(\mathbf{1}\pm J\otimes J)$ have the same readings on all products of local real symmetric matrices, yet for $u_1=u_2=\cos\theta\,\mathbf{1}+J\sin\theta$ their readings of the product sagitta are $0$ and $2\sin^2\theta$. Saying that "the sagitta readings of product comparisons are determined by local readings" is equivalent to local tomography, but this only renames the term $A_1\otimes A_2$; it derives nothing.

**Literature result.** The link between local tomography and the complex numbers is in Wootters (1990), Hardy (2001) and Chiribella–D'Ariano–Perinotti (2011); there is no quaternionic tensor product that multiplies dimensions, and the above compares parameter counts only, without constructing a quaternionic composite. The complex count $\dim_{\mathbb{R}}\operatorname{Herm}(n)=n^2$ is the frozen theorem [`hermitian_space_finrank`](lean:D5/S3/Quantum/Entanglement/BipartiteSectorDecomposition.hermitian_space_finrank).
:::

Exchange statistics also has a clean place in the language of comparison.

::: {.remark #rem-appe-swap-sagitta title="Exchange Is a Fair Involution with Sagitta 0 and 2; Clause I Removes Labels but Does Not Choose a Sector (Manual Derivation and Literature)"}
**Manual derivation.** On $\mathcal{H}\otimes\mathcal{H}$ let $\mathrm{SW}(\psi\otimes\phi)=\phi\otimes\psi$ be the swap.

1. $\mathrm{SW}^*=\mathrm{SW}$ and $\mathrm{SW}^2=\mathbf{1}$, so $\mathrm{SW}$ is fair and self-adjoint, $S=\mathrm{SW}$, $A=0$, the sagitta $v=\mathbf{1}-\mathrm{SW}$ takes only the values $0$ and $2$, and the antisymmetric projection is half the sagitta: $P_\wedge=\frac12v$. On the symmetric sector the swap is the identity; on the antisymmetric sector it is the antipode.
2. $\langle\psi\otimes\phi,\mathrm{SW}\,\psi\otimes\phi\rangle=\lvert\langle\psi,\phi\rangle\rvert^2$, so the weight of the antisymmetric sector is $\frac12\bigl(1-\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$: the sagitta reading of the swap is fixed by the Born weight between the two one-body states.
3. Suppose every observable commutes with $\mathrm{SW}$. Then for every such $O$ and every $x$, $\langle x,Ox\rangle=\langle P_{\mathrm{Sym}}x,OP_{\mathrm{Sym}}x\rangle+\langle P_\wedge x,OP_\wedge x\rangle$, so there is no readable coherence between the two sectors. $\psi\otimes\phi$ and $\phi\otimes\psi$ have the same readings; if objects are compared only through these readings, Clause I identifies them and the particle labels are divided out. The identified object is nevertheless a mixture of the two sectors with weights $\frac12\bigl(1\pm\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$.

So Clause I removes labels and does not choose a sector. For $N\ge3$ every transposition is the same kind of fair involution; with permutations as objects and $\mathrm{CMP}(\sigma,\tau)=U(\sigma)^*U(\tau)$, Clauses II–IV hold for any unitary representation $U$ of the symmetric group. For three two-level particles, for instance, the $8$-dimensional space has a $4$-dimensional symmetric sector, a $0$-dimensional antisymmetric sector and a $4$-dimensional sector of mixed symmetry.

**Literature result.** Item 2 is the swap test (Buhrman–Cleve–Watrous–de Wolf 2001). Keeping only the one-dimensional representations of the symmetric group is the symmetrization postulate (Messiah–Greenberg 1964), and the link between spin and statistics comes from relativistic quantum field theory (Pauli 1940); both are inputs outside the comparison axiom.
:::

In this reading (`MODEL`), the choice of exchange statistics is whether the sector where the swap has sagitta $2$ is occupied. It is a superselection label and, like the signature of `H2` and the light cone of `H8`, a `T3`-type bifurcation.

## E.8.8 Ensembles: Multipoint Positivity and the Qubit Born Weight in Terms of Readings {#sec-appe-ensembles}

So far comparison has been made between two objects. Experiments often do something else: draw an object at random with given probabilities, then compare it. Call a finitely supported probability distribution $E=\sum_kp_k\delta_{x_k}$ on $X$ an **ensemble**, and define the averaged similarity reading of two ensembles as $S(E,F)=\sum_{k,l}p_kq_l\,S(x_k,y_l)$ (`MODEL`). Call $\bar x$ an **opposite** of $x$ if $\mathrm{CMP}(x,\bar x)=-\mathbf{1}$, that is, if their sagitta is $2$. Under Clauses II and IV, $\mathrm{CMP}(\bar x,z)=\mathrm{CMP}(\bar x,x)\,\mathrm{CMP}(x,z)=-\mathrm{CMP}(x,z)$: every comparison of the opposite is that of $x$ with the sign reversed.

::: {.remark #rem-appe-ensemble-positivity title="With Opposites, Ensemble Self-Agreement Is Equivalent to Gram Positivity; Without Them It Is Not Enough (Manual Derivation)"}
**Manual derivation.** Assume Clauses II–IV and real scalar similarity readings, $S(x,y)=s_{xy}\mathbf{1}$. For an ensemble $E=\sum_kp_k\delta_{x_k}$ one has $S(E,E)=p^{\mathsf T}[s_{x_kx_l}]\,p$, the average similarity reading of two objects drawn independently from the same ensemble.

1. If every object has an opposite, the following are equivalent: (a) every ensemble has a nonnegative averaged similarity with itself, $S(E,E)\ge0$; (b) for every finite set of points the table $[s_{x_ix_j}]$ is positive semidefinite.
2. Under (b), $\lvert s_{xy}\rvert\le1$; if $s_{xy}=1$, then $x$ and $y$ have the same similarity reading against every $z$, and if $s_{xy}=-1$ the readings are everywhere opposite.
3. Without opposites, (a) does not imply (b).

Derivation: (b) gives (a) by taking $\alpha=p$. Conversely, given a real vector $\alpha\neq0$, take $y_i=x_i$ where $\alpha_i\ge0$ and $y_i=\bar x_i$ where $\alpha_i<0$, and let $E=\sum_i\frac{\lvert\alpha_i\rvert}{\lVert\alpha\rVert_1}\delta_{y_i}$. Since $s_{\bar xz}=-s_{xz}$, $S(E,E)=\alpha^{\mathsf T}[s_{x_ix_j}]\,\alpha/\lVert\alpha\rVert_1^2$, so (a) gives (b). Item 2: the $2\times2$ minor $\begin{pmatrix}1&s\\s&1\end{pmatrix}$ is positive semidefinite exactly when $\lvert s\rvert\le1$; for any $z$, write the positive semidefinite table on $\{x,y,z\}$ as the Gram matrix of unit vectors $e_x,e_y,e_z$ in a real inner-product space; $s_{xy}=1$ gives $\lVert e_x-e_y\rVert^2=2-2s_{xy}=0$, so $e_x=e_y$ and $s_{xz}=s_{yz}$; $s_{xy}=-1$ gives $e_x=-e_y$.

The example for item 3 is the triple in $(M_2(\mathbb{R}),{}^\sharp)$ at the end of E.8.1: $s_{01}=s_{02}=\frac{\sqrt2}{2}$, $s_{12}=-\frac18$, and the table has determinant $-\frac{9}{64}$. For nonnegative weights,
$$
p^{\mathsf T}Gp=p_0^2+p_1^2+p_2^2+\sqrt2\,p_0(p_1+p_2)-\frac14p_1p_2\ \ge\ p_0^2+\frac78\left(p_1^2+p_2^2\right)>0,
$$
so (a) holds on these three objects. Add the opposites $-x_0,-x_1,-x_2$ to the set of objects (they still lie in $\mathrm{SL}(2,\mathbb{R})$, $\mathrm{CMP}(x,-x)=-\mathbf{1}$, and Clauses II–IV still hold); then the ensemble $E=\frac{1}{2+\sqrt2}\left(\sqrt2\,\delta_{\bar x_0}+\delta_{x_1}+\delta_{x_2}\right)$ gives $S(E,E)=-\frac{3-2\sqrt2}{8}<0$. A hyperbolic pair is the same situation: for $s_{01}=\cosh\eta>1$, nonnegative weights give $p_0^2+p_1^2+2p_0p_1\cosh\eta>0$; with an opposite, $E=\frac12\left(\delta_{x_0}+\delta_{\bar x_1}\right)$ gives $\frac12(1-\cosh\eta)<0$.
:::

Compare item 3 of [@rem-appe-gram-from-flatness], where (b) follows from Clause IV and the positivity condition. Here, to obtain (b), the positivity condition can also be replaced by two statements about compared objects and readings alone: **every object has an opposite; two objects drawn independently from the same ensemble have a nonnegative averaged similarity.** These two statements are not equivalent to the positivity condition. They still allow parabolic pairs with $s=\pm1$ and $A\neq0$: take the objects $\pm1$, $\pm(1+\varepsilon)$ among the dual numbers of counterexample (b) in [@ex-appe-layer0-countermodels]; the readings are only $\pm1$, the table is positive semidefinite, (a) holds, and the positivity condition fails. By item 2, however, two such objects cannot be told apart by any similarity reading; they differ only in the difference channel. What is excluded is the hyperbolic branch. In the Lorentzian reading (`MODEL`), mixing a future-pointing unit timelike vector with a past-pointing one averages to a spacelike vector, and that is the negative reading above.

This leaves a question: is there a reading condition that also sees the difference channel, excludes the parabolic pairs as well, and so yields the positivity condition from readings? Under the premise that readings are given by states, the answer is no.

::: {.remark #rem-appe-positivity-invisible-part title="The Part of the Positivity Condition That No Reading by a State Can See (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mathcal{A}$ be a real or complex unital $*$-algebra. Call a linear functional $\varphi$ (complex-linear when $\mathcal{A}$ is complex) a **state** if $\varphi(\mathbf{1})=1$, $\varphi(a^*a)\ge0$ for every $a$, and $\varphi(a^*)=\overline{\varphi(a)}$. Over the complex numbers the last condition follows from the first two, so states are exactly the normalized positive functionals used in E.8.3. Over the reals the last condition is an additional restriction: it makes a state vanish on every element with $a^*=-a$, so on a real algebra states do not read difference parts; E.8.3 only asks for real values on self-adjoint elements, which over the reals is no restriction. Call the value under a state of any finite product of comparison values and their involutes a **reading**; the similarity readings of E.8.3 and the orbit records of E.8.9 are readings (the latter, on a complex algebra, include the difference reading $i\operatorname{Im}f$), and the ensemble readings of E.8.8 are averages of readings. Assume that $\mathcal{A}$ has at least one state, and put

$$
\mathcal{R}=\left\{a\in\mathcal{A}:\ \varphi(a^*a)=0\ \text{for every state}\ \varphi\right\}.
$$

1. For $r\in\mathcal{R}$, $y,z\in\mathcal{A}$ and every state $\varphi$, $\varphi(yrz)=0$; $\mathcal{R}$ is a two-sided ideal closed under $*$.
2. If $a^*a=-t\mathbf{1}$ with $t\ge0$, then $t=0$ and $a\in\mathcal{R}$. Hence the positivity condition holds if and only if $\mathcal{A}$ has no nonzero $a$ with $a^*a=0$, and every such $a$ lies in $\mathcal{R}$; on the quotient algebra $\mathcal{A}/\mathcal{R}$ the positivity condition always holds.
3. If two comparison maps with values in $\mathcal{A}$ differ pointwise only by elements of $\mathcal{R}$, that is $\mathrm{CMP}'(x,y)-\mathrm{CMP}(x,y)\in\mathcal{R}$, then all their readings agree.
4. There is a comparison map with values in a complex $*$-algebra, satisfying Clauses I–IV, for which the positivity condition fails in that algebra (and in the subalgebra generated by its comparison values), while all its readings agree with those of a Clifford comparison map in the same algebra whose comparison values generate a subalgebra satisfying the positivity condition.

Derivation: a state satisfies the Cauchy–Schwarz inequality $\lvert\varphi(y^*x)\rvert^2\le\varphi(y^*y)\,\varphi(x^*x)$, which follows from $\varphi\bigl((x+\lambda y)^*(x+\lambda y)\bigr)\ge0$ for every scalar $\lambda$ together with $\varphi(x^*y)=\overline{\varphi(y^*x)}$; no norm or boundedness is used. Item 1: given $z$, $\chi(x)=\varphi(z^*xz)$ satisfies $\chi(x^*x)\ge0$ and is compatible with the involution. If $\chi(\mathbf{1})>0$, then $\chi/\chi(\mathbf{1})$ is a state, so $\chi(r^*r)=0$; if $\chi(\mathbf{1})=0$, Cauchy–Schwarz gives $\lvert\chi(x)\rvert^2\le\chi(\mathbf{1})\chi(x^*x)=0$. In both cases $\varphi\bigl((rz)^*(rz)\bigr)=0$, that is, $rz\in\mathcal{R}$. Cauchy–Schwarz again gives $\lvert\varphi(y\,rz)\rvert^2\le\varphi(yy^*)\,\varphi\bigl((rz)^*(rz)\bigr)=0$. Hence $\varphi\bigl((r+r')^*(r+r')\bigr)=2\operatorname{Re}\varphi(r^*r')=0$, $\varphi\bigl((yr)^*(yr)\bigr)=\varphi\bigl((r^*y^*y)\,r\,\mathbf{1}\bigr)=0$ and $\varphi(rr^*)=\varphi(\mathbf{1}\,r\,r^*)=0$: $\mathcal{R}$ is a subspace, closed under multiplication on either side and under $*$. Item 2: take a state; $-t=\varphi(a^*a)\ge0$, so $t=0$ and $a^*a=0$, hence $a\in\mathcal{R}$. In the quotient, $a^*a+t\mathbf{1}\in\mathcal{R}$ with $t\ge0$ gives $\varphi(a^*a)+t=0$ by item 1, and likewise $t=0$ and $a\in\mathcal{R}$. Item 3: write each factor of the product as the original factor plus an element of $\mathcal{R}$ and expand ($\mathcal{R}$ is closed under $*$, so involuted factors behave the same way); every term except the original product contains a factor from $\mathcal{R}$ in some position, and its reading vanishes by item 1. Item 4: in $\mathcal{Cl}_{3,0}$ take pairwise non-parallel unit vectors $x_1,\dots,x_N$ ($N\ge2$) and $c_{ij}=x_ix_j$; the involution is reversion. With the central element $\mathbf{I}=e_1e_2e_3$ as imaginary unit, $\mathcal{Cl}_{3,0}$ is the Pauli-matrix model $M_2(\mathbb{C})$, reversion is the Hermitian adjoint, and the positivity condition holds. Let $\mathcal{A}'=\mathcal{Cl}_{3,0}[\delta]$ with $\delta$ commuting with everything, $\delta^2=0$ and $\delta^*=-\delta$; it is again a complex $*$-algebra with imaginary unit $\mathbf{I}$, and it has states (for instance $x+y\delta\mapsto\frac12\operatorname{Tr}x$). Choose distinct real numbers $n_i$ and put

$$
c'_{ij}=x_ix_j\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr).
$$

From $(\mathbf{1}+k\delta)(\mathbf{1}+k\delta)^*=\mathbf{1}-k^2\delta^2=\mathbf{1}$ and $\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr)\bigl(\mathbf{1}+(n_k-n_j)\delta\bigr)=\mathbf{1}+(n_k-n_i)\delta$, Clauses II–IV hold; the rows of $c$ are pairwise distinct, so are those of $c'$, and the quotient of Clause I identifies no two points. Since $\delta^*\delta=0$, item 2 gives $\delta\in\mathcal{R}$, so $c'-c$ lies pointwise in $\mathcal{R}$, and by item 3 the two maps have the same readings under every state of $\mathcal{A}'$. But $c'_{ij}+c'_{ji}-2(x_i\cdot x_j)\,c'_{ii}=2(n_j-n_i)\,\delta\,A(x_i,x_j)$ belongs to the algebra generated by $c'$; for $i\neq j$ it is nonzero, yet its $a^*a$ vanishes, so the positivity condition fails in that algebra.

The premise of states cannot be dropped. If $\mathcal{A}'$ is regarded only as a real $*$-algebra, then $\varphi(x+y\delta)=\langle x\rangle_0+\kappa\langle y\rangle_0$ (with $\langle\cdot\rangle_0$ the scalar part and $\kappa$ any real number) is real-valued, normalized and positive ($\varphi\bigl((a+b\delta)^*(a+b\delta)\bigr)=\langle a^*a\rangle_0$), but not compatible with the involution, and its readings separate the two comparison maps: $\varphi(c'_{ij})-\varphi(c_{ij})=\kappa(n_j-n_i)\,(x_i\cdot x_j)$, although their similarity readings still agree.

$\mathcal{R}$ is exactly the intersection of the kernels of the GNS representations of all states: $\pi_\varphi(a)=0$ if and only if $\varphi(b^*a^*ab)=0$ for every $b$, which holds for $a\in\mathcal{R}$ by item 1, and conversely one takes $b=\mathbf{1}$.

**Literature result.** The reducing ideal of a $*$-algebra is defined as the intersection of the kernels of all its $*$-representations and was formerly called the $*$-radical (Palmer 1972). The representations there are by bounded operators on Hilbert spaces and need not coincide with the GNS representations of states used here, so $\mathcal{R}$ is only an object of the same kind.
:::

So, under the premise that readings are given by states and that at least one state exists, the positivity condition is equivalent to "there is no nonzero element of square zero". The premise itself already excludes the hyperbolic branch: the difference part of a hyperbolic comparison satisfies $A^*A=(1-s^2)\mathbf{1}$, and for $s^2>1$ no state gives it a nonnegative reading. The remaining requirement, "no nonzero element of square zero", excludes the parabolic branch; for instance, the difference part $\varepsilon$ of the dual number $1+\varepsilon$ of counterexample (b) in [@ex-appe-layer0-countermodels] satisfies $\varepsilon^*\varepsilon=0$ and lies in $\mathcal{R}$. By items 3 and 4, this requirement cannot be derived from any condition on readings by states, whether one reads the similarity or the difference channel, ensembles or orbit records, or products of any number of comparison values. Under readings by states, the parabolic pairs left over by ensemble self-agreement above are not merely indistinguishable by similarity readings; they are indistinguishable by every reading. Conversely, applying Clause I to readings (`MODEL`), that is, identifying elements whose readings all agree and so passing to $\mathcal{A}/\mathcal{R}$, makes the positivity condition hold automatically. So under this premise this part of the input is not a gap that readings could fill; it is a convention about algebraic structure beyond the readings.

The same device of applying comparison to ensembles also restates `H5` on a qubit.

::: {.remark #rem-appe-ensemble-extensionality-born title="Ensemble Extensionality Gives the Qubit Born Rule Without Continuity (Manual Derivation and Literature)"}
**Manual derivation.** Keep the setting of [@rem-appe-born-zonal-minimal-rank]: the probability for preparation $\mathbf{s}$ and exit $\mathbf{r}$ is $f(\mathbf{s}\cdot\mathbf{r})$, but $f:[-1,1]\to\mathbb{R}$ need not be continuous. The exit probability of an ensemble is the average, $p(\mathbf{r}\mid E)=\sum_kp_kf(\mathbf{s}_k\cdot\mathbf{r})$; its averaged similarity against a probe $\mathbf{z}$ is $\sum_kp_k\,\mathbf{s}_k\cdot\mathbf{z}=\mathbf{m}_E\cdot\mathbf{z}$, where $\mathbf{m}_E$ is the barycenter. Say the rule satisfies **ensemble extensionality** if two ensembles with the same averaged similarity against every probe have the same probability for every exit; since $\mathbf{m}\cdot\mathbf{z}$ for all unit $\mathbf{z}$ determines $\mathbf{m}$, this says that the exit probability depends only on the barycenter. Then

$$
\text{ensemble extensionality}\iff f(t)=a+bt ;
$$

adding $f(1)=1$ and antipodal normalization $f(t)+f(-t)=1$ gives $f(t)=\frac{1+t}{2}$.

Derivation: an affine rule clearly qualifies. Conversely, fix $\mathbf{r}$. Every point of the closed unit ball is the barycenter of some ensemble (draw any chord through it and weight its endpoints in proportion), so by ensemble extensionality $G(\mathbf{m}):=p(\mathbf{r}\mid E)$ with $\mathbf{m}_E=\mathbf{m}$ is well defined. Mixing two ensembles in the ratio $\lambda:1-\lambda$ combines both the barycenters and the exit probabilities in that ratio, so $G$ preserves convex combinations on the ball. Put $h=G-G(0)$. Mixing with barycenter $0$ gives $h(\lambda\mathbf{m})=\lambda h(\mathbf{m})$ for $0\le\lambda\le1$, and midpoints give $h\left(\frac{\mathbf{m}+\mathbf{m}'}{2}\right)=\frac12\left(h(\mathbf{m})+h(\mathbf{m}')\right)$. Hence $L(\mathbf{y}):=h(\varepsilon\mathbf{y})/\varepsilon$ (with $\varepsilon>0$, $\varepsilon\lVert\mathbf{y}\rVert\le1$) does not depend on $\varepsilon$, is additive and positively homogeneous, and is odd because $h(\varepsilon\mathbf{y})+h(-\varepsilon\mathbf{y})=2h(0)=0$; so it is linear. Here $\lambda$ ranges over all real numbers in $[0,1]$, which is why no continuity is needed. Thus $G(\mathbf{m})=a+\mathbf{b}\cdot\mathbf{m}$, and $f(\mathbf{s}\cdot\mathbf{r})=a+\mathbf{b}\cdot\mathbf{s}$ for every unit vector $\mathbf{s}$. On the great circle orthogonal to $\mathbf{r}$ the left side is the constant $f(0)$, and $\mathbf{s}$ and $-\mathbf{s}$ both lie on it, so $\mathbf{b}\cdot\mathbf{s}=0$ there; hence $\mathbf{b}$ is parallel to $\mathbf{r}$ and $f(t)=a+\beta t$.

The cubic rule $f(t)=\frac12(1+t^3)$ violates ensemble extensionality: the trine $\{(0,0,1),\,(\mp\frac{\sqrt3}{2},0,-\frac12)\}$ with equal weights and the antipodal pair $\{\pm\mathbf{e}_z\}$ with equal weights both have barycenter $0$, but their probabilities of exiting toward $\mathbf{e}_z$ are $\frac58$ and $\frac12$. The same argument works on $\mathbb{CP}^{d-1}$: take the readings $\lvert\langle x\mid z\rangle\rvert^2=\operatorname{Tr}(P_xP_z)$; the averaged readings determine the density matrix, and ensemble extensionality gives $f\bigl(\operatorname{Tr}(PQ)\bigr)=a+\operatorname{Tr}(BP)$; averaging over the unitaries that fix $Q$ replaces $B$ by $\beta Q+\gamma(\mathbf{1}-Q)$, so $f$ is affine, and $f(0)=0$, $f(1)=1$ give $f(t)=t$.

**Literature result.** Generalized probabilistic theories take states to be equivalence classes of preparations and exit probabilities to be affine functions of the state (Hardy 2001; Barrett 2007). The derivation above is this point made concrete for zonal rules; the zonal form and the trine counterexample only connect it to comparison readings.
:::

In this reading (`MODEL`), ensemble extensionality is Clause I applied to ensembles: treat an ensemble as an object and its averaged comparison readings as its comparison row; Clause I says that ensembles with the same row are the same object, and the exit probability, being a function of that object, depends only on the row. Compared with [@rem-appe-born-zonal-minimal-rank], it needs neither continuity nor a Legendre expansion; under continuity, antipodal normalization and $f(1)=1$ the two are equivalent, and both are equivalent to the Born rule. It is still an input: Clauses I–IV by themselves only govern comparisons between single objects, place no constraint on probability rules, and are compatible with the cubic rule. What has changed is that this input can now also be stated as an extension of Clause I.

## E.8.9 Orbits: the Record of Comparisons of One Object along Time {#sec-appe-orbit-records}

[@rem-appe-sagitta-continuity] deals with a time-homogeneous family of objects $x_t$, $\mathrm{CMP}(x_s,x_t)=w(t-s)$. Keep its notation: $f(t)=\varphi\bigl(w(t)\bigr)$, $\xi_s=\pi\bigl(w(s)\bigr)\Omega$, $\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$, $\langle\xi_r,\xi_s\rangle=f(s-r)$, and assume that the sagitta reading is continuous at zero, so that $U_t$ is strongly continuous on $\mathcal{K}$. By Stone's theorem and the spectral theorem (`Literature`) there are a self-adjoint $H$ and a probability measure $\mu$ (the energy distribution of $\Omega$ under $H$) with $f(t)=\int e^{-i\lambda t}\,d\mu(\lambda)$; $\mathcal{K}$ is unitarily equivalent to $L^2(\mu)$, and $\dim\mathcal{K}$ equals the number of points in the support of $\mu$. The three readings are the similarity reading $\varphi\bigl(S(x_0,x_t)\bigr)=\operatorname{Re}f(t)$, the difference reading $\varphi\bigl(A(x_0,x_t)\bigr)=i\operatorname{Im}f(t)$, and the Born weight of the ray returning to where it started, $\lvert f(t)\rvert^2$. The sagitta reading minimized over a global phase, $\min_\alpha\bigl(1-\operatorname{Re}(e^{i\alpha}f(t))\bigr)=1-\lvert f(t)\rvert$, is called the **ray sagitta**.

Sampling with a fixed step $\tau>0$, the table of the samples $\xi_0,\xi_\tau,\dots,\xi_{(n-1)\tau}$ is $G_{jk}=f\bigl((k-j)\tau\bigr)$, $j,k=0,\dots,n-1$. Its rank is computed by the following frozen theorem.

::: {.theorem #thm-appe-prony-hankel-rank title="A Hankel Section of a Finite Exponential Sum Has Rank Equal to the Number of Modes" lean="D5/S3/Analytic/GoldenTomography/FinitePronyHankelReconstruction.prony_hankel_rank"}
Let $K$ be a field, let $m\le n$ be natural numbers, let the nodes $z_1,\dots,z_m\in K$ be pairwise distinct and let the weights $w_1,\dots,w_m\in K$ all be nonzero. Then the $n\times n$ matrix over $K$

$$
H_{ij}=\sum_{l=1}^{m}w_l\,z_l^{\,i+j},\qquad i,j=0,1,\dots,n-1,
$$

has rank $m$.
:::

::: proof
$H$ factors as $V\operatorname{diag}(w)V^{\mathsf T}$ with the $n\times m$ Vandermonde matrix $V_{il}=z_l^{\,i}$. The factorization bounds the rank by $m$. The leading $m\times m$ block is a product of two square Vandermonde matrices and a diagonal matrix; distinct nodes and nonzero weights make its determinant nonzero, so the rank is at least $m$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-orbit-rank-and-recurrence title="The Rank of an Orbit's Table Counts Energy Levels; an Orbit with Finitely Many Levels Comes Back (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mu=\sum_{l=1}^{m}p_l\delta_{\lambda_l}$ with pairwise distinct $\lambda_l$ and $p_l>0$, and assume that the nodes $z_l=e^{-i\lambda_l\tau}$ are pairwise distinct.

1. **Rank.** $\operatorname{rank}G=\min(n,m)$. Reversing the rows of $G$ gives $G_{n-1-j,\,k}=\sum_l\bigl(p_lz_l^{-(n-1)}\bigr)z_l^{\,j+k}$, which is the section of [@thm-appe-prony-hankel-rank] with $K=\mathbb{C}$ and weights $p_lz_l^{-(n-1)}\neq0$; reversing rows does not change the rank, so for $n\ge m$ the rank is $m$. For $n<m$, $G=V\operatorname{diag}(p)V^*$ where $V_{jl}=z_l^{-j}$ is an $n\times m$ Vandermonde matrix of rank $n$ and $\operatorname{diag}(p)$ is positive definite, so the rank is $n$. A general energy distribution can be read the same way: for $\alpha\in\mathbb{C}^n$, $\alpha^*G\alpha=\int\bigl\lvert\sum_j\alpha_je^{-ij\lambda\tau}\bigr\rvert^2d\mu(\lambda)$, and the sum is a polynomial of degree less than $n$ in $e^{-i\lambda\tau}$, so the rank of $G$ is the smaller of $n$ and the number of support points of the push-forward $(e^{-i\lambda\tau})_*\mu$.
2. **Residual.** The sample $\xi_{k\tau}$ has a nonzero orthogonal residual outside the span of $\xi_0,\dots,\xi_{(k-1)\tau}$ exactly when the table of the first $k+1$ samples has larger rank than that of the first $k$, that is, exactly when $k<m$. So in $\mathcal{K}$, the span $S_k$ of the first $k$ samples satisfies $S_k^\perp\neq\bot$ (the hypothesis of [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)) exactly when $k<m$; the sampled residual never runs dry exactly when the push-forward has infinitely many support points.
3. **Return.** For every $T>0$ and every integer $Q\ge2$ there is $t\in[T,\,Q^{m-1}T]$ with ray sagitta $1-\lvert f(t)\rvert\le2\sin^2\frac{\pi}{Q}$; for $Q\ge4$ this is equivalent to the return Born weight satisfying $\lvert f(t)\rvert^2\ge\cos^2\frac{2\pi}{Q}$. Derivation: apply Dirichlet's simultaneous approximation theorem to the $m-1$ reals $\alpha_l=(\lambda_l-\lambda_1)T/2\pi$, giving an integer $1\le q\le Q^{m-1}$ such that each $q\alpha_l$ lies within $\frac1Q$ of an integer (pigeonhole: the $Q^{m-1}+1$ points $k\alpha$, $k=0,\dots,Q^{m-1}$, taken modulo $1$, fall into $Q^{m-1}$ small cubes of side $\frac1Q$; take the difference of two points in the same cube). With $t=qT$, each $(\lambda_l-\lambda_1)t$ lies within $\frac{2\pi}{Q}\le\pi$ of $2\pi\mathbb{Z}$, so
$$
\lvert f(t)\rvert\ \ge\ \operatorname{Re}\left(e^{i\lambda_1t}f(t)\right)=\sum_lp_l\cos\bigl((\lambda_l-\lambda_1)t\bigr)\ \ge\ \cos\frac{2\pi}{Q}=1-2\sin^2\frac{\pi}{Q}.
$$
The same argument with the $m$ reals $\lambda_lT/2\pi$ gives $t\in[T,Q^mT]$ with sagitta reading $1-\operatorname{Re}f(t)\le2\sin^2\frac{\pi}{Q}$.
4. **Evidence of dimension.** If $1-\lvert f(t)\rvert>2\sin^2\frac{\pi}{Q}$ for all $t\in[T,Q^{m-1}T]$, then $\dim\mathcal{K}>m$: otherwise $\mu$ has exactly $m'\le m$ atoms, and item 3 gives a counterexample in $[T,Q^{m'-1}T]\subseteq[T,Q^{m-1}T]$. If there are $T$ and $\delta>0$ with $1-\lvert f(t)\rvert\ge\delta$ for all $t\ge T$, choose $Q$ with $2\sin^2\frac\pi Q<\delta$; the previous sentence applies to every $m$, so $\dim\mathcal{K}=\infty$. For example, a Gaussian energy distribution $N(0,\sigma^2)$ gives $f(t)=e^{-\sigma^2t^2/2}$, and the ray sagitta tends to $1$.

**Literature result.** Dirichlet's simultaneous approximation theorem (Dirichlet 1842); recurrence of quantum orbits with discrete spectrum (Bocchieri–Loinger 1957). The latter shows that the condition in item 4 is only sufficient: with infinitely many atoms the orbit still comes back, while $\dim\mathcal{K}=\infty$. Under aliasing (for example $\lambda_2=\lambda_1+2\pi/\tau$) two levels share a node and the sampled rank sees only one.
:::

So the "orthogonal residual never runs dry" of `H4` has a form that can be stated with the comparison readings of one object along time: **each increase of the rank of the table proves one more energy level; an object whose ray sagitta stays away from zero after some time cannot live in a finite-dimensional state space.** The first statement is a characterization, the second a sufficient condition. Neither derives `H4`: a model whose Hamiltonian has finitely many levels satisfies every clause.

The same record also answers a question left by E.8.6: to what extent the Hamiltonian is an input beyond the readings.

::: {.remark #rem-appe-orbit-record-channels title="What Each of the Three Readings of an Orbit Determines: Neither Channel Can Be Dropped (Manual Derivation and Literature)"}
**Manual derivation.** Write $\mu^{\mathrm r}(B)=\mu(-B)$ for the reflection of the energy distribution.

1. **Full comparison readings.** $f$ determines $\mu$, and with it $(\mathcal{K},H\vert_{\mathcal{K}},\Omega)$ up to unitary equivalence. In finite dimension this is visible directly: exponentials $e^{-i\lambda t}$ with distinct $\lambda$ are linearly independent, so the expression $f=\sum_lp_le^{-i\lambda_lt}$ is unique.
2. **Similarity readings only.** $\operatorname{Re}f(t)=\int\cos(\lambda t)\,d\mu$ determines only the symmetrization $\frac12(\mu+\mu^{\mathrm r})$, that is, the distribution of $\lvert\lambda\rvert$. Two levels already give a counterexample: $H=\operatorname{diag}(1,2)$ and $H'=\operatorname{diag}(1,-2)$ with initial state $\frac{1}{\sqrt2}(1,1)$ both have similarity reading $\frac12(\cos t+\cos2t)$, while their return Born weights are $\frac12(1+\cos t)$ and $\frac12(1+\cos3t)$.
3. **Born weights only.** $\lvert f(t)\rvert^2=\int\!\!\int e^{-i(\lambda-\lambda')t}\,d\mu(\lambda)\,d\mu(\lambda')$ determines only the autocorrelation of $\mu$. For two levels this is enough to fix $\mu$ up to translation and reflection: the autocorrelation of $\mu=p\delta_a+q\delta_b$ gives $pq$, $p^2+q^2$ and $\lvert b-a\rvert$. Three levels already give a genuine ambiguity: levels $0,1,2$ with populations $\frac1{12}(1,5,6)$ and $\frac1{12}(2,7,3)$, whose generating polynomials $1+5z+6z^2=(1+2z)(1+3z)$ and $2+7z+3z^2=(2+z)(1+3z)$ differ only in that the root $-\frac12$ is replaced by its reciprocal $-2$; both have Born weight $\frac{1}{144}(62+70\cos t+12\cos2t)$, yet the two distributions differ by no translation, are not reflections of each other, and have different similarity readings.
4. **Similarity readings and Born weights together.** For two distributions with finitely many levels each, the two together determine $\mu$ up to reflection. Derivation: $(\operatorname{Im}f)^2=\lvert f\rvert^2-(\operatorname{Re}f)^2$ is known; if $f$ and $f'$ give the same two readings, then $g=\operatorname{Im}f$ and $g'=\operatorname{Im}f'$ are finite trigonometric sums, hence real-analytic, and $(g-g')(g+g')\equiv0$; one factor vanishes at uncountably many points and so vanishes identically. Hence $f'=f$ or $f'=\bar f$, and the latter means $\mu'=\mu^{\mathrm r}$, the time reversal $H\mapsto-H$.

**Literature result.** Stone's theorem, the spectral theorem and Bochner's theorem; the root-flipping ambiguity of one-dimensional phase retrieval (Walther 1963; Hofstetter 1964) and homometric sets (Patterson 1944; Rosenblatt–Seymour 1982).
:::

The ledger of E.8.6 records the Hamiltonian $H$ as an input that remains. This remark makes the statement precise: **on the space spanned by an orbit, $H$ is not an input beyond the readings; the complete record of the orbit in both channels determines it up to unitary equivalence.** Reading only the similarity channel loses more than the direction of time: it loses the sign of every level. Reading only the Born weights of the ray already leaves a genuine ambiguity with three levels. Similarity readings and Born weights together leave exactly the overall sign of the difference channel, which is time reversal. Clause II splits comparison into a similarity channel and a difference channel, and in dynamics neither can be dropped. What remains an input is the choice of orbit and the action of $H$ outside $\mathcal{K}$.

## E.8.10 Comparisons between Observers: Time Order Selects the Hyperbolic Row {#sec-appe-observer-comparison}

Now let the objects of comparison be inertial observers in $1+1$ dimensions, each with its own coordinates $(t,x)$. For observers $o,o'$, let $\Lambda_{o\leftarrow o'}$ convert the coordinates of an event in $o'$ into its coordinates in $o$, and put $\mathrm{CMP}(o,o')=\Lambda_{o\leftarrow o'}$, with values in the real $*$-algebra $(M_2(\mathbb{R}),{}^\sharp)$ used in E.8.1, $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$, $aa^\sharp=\det(a)\mathbf{1}$. That coordinate changes are linear is an input here (`MODEL`); [@rem-appe-causal-order-linearity] shows that in $1+1$ dimensions it cannot be derived from the causal order.

Here Clause III says $\det\Lambda_{o\leftarrow o'}=1$, and then Clause II only says that the reverse change is the inverse; the similarity part $S=\frac12\operatorname{tr}(\Lambda)\mathbf{1}$ is always a real scalar, so the sagitta table of E.8.1 applies directly. Write $\Lambda_{o\leftarrow o'}=\begin{pmatrix}a&b\\c&d\end{pmatrix}$. The origin of $o'$, $(\tau,0)$, is $(a\tau,c\tau)$ in $o$, so for $a\neq0$ the velocity reading of $o'$ relative to $o$ is $v(o,o')=c/a$; from the inverse matrix, $v(o',o)=-c/d$ for $d\neq0$.

::: {.remark #rem-appe-frame-change-family title="The One-Parameter Family of Observer Comparisons: the Three Signs of K Are the Three Rows of the Sagitta Table (Manual Derivation and Literature)"}
**Manual derivation.** Let $V$ be the set of velocity readings of all pairs of observers. Assume:

1. Clause III: $\det\Lambda_{o\leftarrow o'}=1$ for every pair of observers;
2. antisymmetric velocity readings: for every pair, $a\neq0$ and $v(o',o)=-v(o,o')$;
3. one law: there is a map $L:V\to M_2(\mathbb{R})$ with $\Lambda_{o\leftarrow o'}=L(v(o,o'))$ for every pair, and $L(v)L(v')\in L(V)$ for $v,v'\in V$;
4. $V$ contains a nonzero element.

Then $0=v(o,o)\in V$, $L(0)=\mathbf{1}$, and there is a constant $K\in\mathbb{R}$ such that for every $v\in V$

$$
L(v)=\gamma(v)\begin{pmatrix}1&Kv\\v&1\end{pmatrix},\qquad \gamma(v)^2\left(1-Kv^2\right)=1;
$$

the sign of $\gamma(v)$ is not fixed by these assumptions. If $L(v)L(v')=L(w)$, then $1+Kvv'\neq0$, $w=\dfrac{v+v'}{1+Kvv'}$ and $\gamma(w)=\gamma(v)\gamma(v')(1+Kvv')$. Moreover

$$
S=\gamma\,\mathbf{1},\qquad A=\gamma\begin{pmatrix}0&Kv\\v&0\end{pmatrix},\qquad A^2=\gamma^2Kv^2\,\mathbf{1}=(\gamma^2-1)\,\mathbf{1},
$$

and the sagitta is $1-\gamma$. So for $v\neq0$, $K<0$, $K=0$ and $K>0$ fall in the elliptic, parabolic and hyperbolic rows of the table of E.8.1.

Derivation: take $v\in V$, $v\neq0$, $L(v)=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, $c=av\neq0$. Since $v$ is the velocity reading of some pair of observers, item 2 applied to that pair gives $c/a=c/d$, so $a=d$. Item 1 gives $a^2-bc=1$, so $b=K(v)\,va$ with $K(v)=\dfrac{a^2-1}{a^2v^2}$, and $a^2(1-K(v)v^2)=1$. For $v,v'\in V\setminus\{0\}$, item 3 gives $L(v)L(v')=L(w)$ with $w\in V$, whose two diagonal entries are equal (by the previous step when $w\neq0$; it is $\mathbf{1}$ when $w=0$). These diagonal entries are $\gamma(v)\gamma(v')(1+K(v)vv')$ and $\gamma(v)\gamma(v')(1+K(v')vv')$, so $K(v)=K(v')$. The diagonal entries of $L(w)$ are nonzero, which is $1+Kvv'\neq0$; the composition law is the ratio of the first entry of the second row to the first entry of the first row of the product.

How the assumptions correspond to the classical derivation: linearity (homogeneity) is the value algebra $M_2(\mathbb{R})$; the relativity principle is item 3, where Clause IV gives only $\Lambda_{o\leftarrow o'}\Lambda_{o'\leftarrow o''}=\Lambda_{o\leftarrow o''}$, and closure also needs every velocity in $V$ to be available from every observer; the reciprocity principle is item 2, which says that velocity is a difference reading; "no dilation", which the classical derivation obtains from reciprocity and isotropy, is given here directly by Clause III, so isotropy does not appear.

**Literature result.** The family with one constant $K$, obtained from the relativity principle without using light: P. Frank and H. Rothe, *Ann. Phys.* **339**, 825–855 (1911); J.-M. Lévy-Leblond, *Am. J. Phys.* **44**, 271–277 (1976) (homogeneity, isotropy, group structure and causality leave only the Lorentz transformations and their Galilean limit); N. D. Mermin, *Am. J. Phys.* **52**, 119–124 (1984). Reciprocity derived from the relativity principle, homogeneity of space-time and isotropy of space: V. Berzi and V. Gorini, *J. Math. Phys.* **10**, 1518–1524 (1969).
:::

The sign of $K$ is still open. The next remark says what excludes $K<0$ and what separates $K=0$ from $K>0$.

::: {.remark #rem-appe-time-order-repetition title="Repeating a Comparison Never Reverses the Order in Time Exactly When the Similarity Reading Is at Least 1 (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a real $*$-algebra and $uu^*=u^*u=\mathbf{1}$, with similarity reading $S=s\mathbf{1}$.

1. For every $n\ge0$, $S(u^n)=T_n(s)\,\mathbf{1}$.
2. $T_n(s)>0$ for every $n\ge1$ if and only if $s\ge1$. For $-1<s<1$, write $s=\cos\alpha$ with $0<\alpha<\pi$; the least $n$ with $T_n(s)<0$ is $\lfloor\frac{\pi}{2\alpha}\rfloor+1$.
3. In the family of [@rem-appe-frame-change-family], for $v\neq0$: $K>0$ if and only if $L(v)$ has two distinct real invariant lines; they are $x=\pm t/\sqrt{K}$, the same for every $v$. The line $t=0$ is invariant if and only if $K=0$. $A^2=0$ if and only if $K=0$.

Derivation: item 1 follows from [@rem-appe-bounded-recurrence], $u^n=T_n(s)\mathbf{1}+U_{n-1}(s)A$ and $(u^n)^*=u^{-n}=T_n(s)\mathbf{1}-U_{n-1}(s)A$, by averaging. Item 2: for $s=\cosh\eta\ge1$, $T_n(s)=\cosh n\eta\ge1$; for $s\le-1$, $T_1(s)=s<0$; for $-1<s<1$, $T_n(s)=\cos n\alpha$, which is not negative for $n\le\frac{\pi}{2\alpha}$, while $n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$ satisfies $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$. Item 3: the eigenvalues of $L(v)$ are $\gamma(1\pm\sqrt{K}\,v)$; for $K>0$ the eigenvectors are $(1,\pm1/\sqrt{K})^{\mathsf T}$; for $K<0$ the eigenvalues are not real; for $K=0$, $L(v)=\gamma(\mathbf{1}+vN)$ with $N=\begin{pmatrix}0&0\\1&0\end{pmatrix}$, $N^2=0$, and the only real invariant line is spanned by $(0,1)^{\mathsf T}$; in general $L(v)(0,1)^{\mathsf T}=\gamma(Kv,1)^{\mathsf T}$.

In the observer model (a `MODEL` reading), $S(\Lambda_{o\leftarrow o'})=a$ is the $o$-time of the event "one unit of $o'$-time has passed at the origin of $o'$". Say that the **time-order condition** holds if $S(u^n)>0$ for every comparison $u$ and every $n\ge1$: applying the same change of frame $n$ times, a later event at the origin is still later. By item 2 this is equivalent to $\gamma(v)\ge1$ for every $v$, that is, $K\ge0$ and $\gamma(v)>0$ for all $v$. For $K<0$ and $\gamma(v)>0$, put $\tan\alpha=\sqrt{-K}\,\lvert v\rvert$ with $0<\alpha<\frac\pi2$. In the coordinates $(t,\sqrt{-K}\,x)$, $L(v)$ is a rotation by $\alpha$, $S(L(v)^n)=\cos n\alpha$, and the first negative value occurs at $n=\lfloor\frac{\pi}{2\alpha}\rfloor+1$. If $n\alpha=\frac\pi2$ for some $n$, then $S(L(v)^n)=0$ and the velocity reading $c/a$ of that step is undefined; this is the case $1+Kvv'=0$ of the composition law.

By item 3, under the time-order condition the following are equivalent: $K>0$; there is a finite speed $1/\sqrt{K}$ that is invariant for all observers; for $v\neq0$ the difference part is not square-zero. $K=0$ is the Galilean case: simultaneity is invariant under comparison, and the difference part $\gamma vN$ is square-zero.
:::

So the time-order condition excludes the elliptic row (and comparisons with $s\le-1$), "the difference part is not square-zero" then excludes the parabolic row, and together they select the hyperbolic row with $s>1$. The difference part satisfies $A^*=-A$, so $A^2=0$ means $A^*A=0$; the second statement is therefore the special case, for difference parts, of "no nonzero $a$ satisfies $a^*a=0$" in [@rem-appe-positivity-invisible-part]. The algebra $(M_2(\mathbb{R}),{}^\sharp)$ has no states ($a=\operatorname{diag}(1,-1)$ gives $a^\sharp a=-\mathbf{1}$), so the conclusions about readings there do not apply here.

Item 2 of [@rem-appe-time-order-repetition] is frozen in the pinned repository, in the following form; items 1 and 3 and the reading in the observer model are not formalized.

::: {.proposition #prop-appe-chebyshev-positivity-threshold title="The Positivity Threshold of Chebyshev Values and the Index of the First Sign Change" lean="D5/S3/Analytic/Chebyshev/PositivityThreshold.forall_pos_eval_T_iff_one_le D5/S3/Analytic/Chebyshev/PositivityThreshold.eval_T_cos_floor_succ_neg_and_nonneg_before"}
Let $T_n$ be the Chebyshev polynomials of the first kind: $T_0=1$, $T_1(x)=x$, $T_{n+1}(x)=2xT_n(x)-T_{n-1}(x)$.

1. For a real number $s$: $T_n(s)>0$ for every natural number $n\ge1$ if and only if $s\ge1$.
2. Let $0<\alpha<\pi$ and $n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$. Then $T_{n_0}(\cos\alpha)<0$, and $T_n(\cos\alpha)\ge0$ for every natural number $n<n_0$.
:::

::: proof
Item 2: $T_n(\cos\alpha)=\cos n\alpha$. By the definition of the floor, $n_0-1\le\frac{\pi}{2\alpha}<n_0$, so $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$ and $\cos n_0\alpha<0$; for $n<n_0$ we have $n\le\frac{\pi}{2\alpha}$, hence $0\le n\alpha\le\frac\pi2$ and $\cos n\alpha\ge0$.

Item 1: for $s\ge1$, $T_n(s)\ge1$ (writing $s=\cosh\eta$, $T_n(s)=\cosh n\eta$); for $s\le-1$, $T_1(s)=s<0$; for $-1<s<1$ take $\alpha=\arccos s$, so that $0<\alpha<\pi$, and item 2 gives $T_{n_0}(s)<0$ with $n_0\ge1$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-rotor-boost-coexistence title="Bounded and Order-Preserving Are Complementary Selections: Rotations and Boosts Live in One Algebra (Manual Derivation and Literature)"}
**Manual derivation.** Let $u\neq\mathbf{1}$, $uu^*=u^*u=\mathbf{1}$, $S=s\mathbf{1}$. On $\mathbb{R}[A]=\operatorname{span}\{\mathbf{1},A\}$ one has $(x+yA)^*(x+yA)=\left(x^2-y^2(s^2-1)\right)\mathbf{1}$; together with [@rem-appe-bounded-recurrence] and [@rem-appe-time-order-repetition] this gives:

| Row | $s$ | positivity condition on $\mathbb{R}[A]$ (equivalent to bounded integer powers) | time-order condition | $A^2\neq0$ |
| :--- | :--- | :---: | :---: | :---: |
| elliptic | $-1<s<1$ | holds | fails | holds |
| parabolic | $s=1$, $A\neq0$ | fails | holds | fails |
| parabolic | $s=-1$, $A\neq0$ | fails | fails | fails |
| $u=-\mathbf{1}$ | $s=-1$, $A=0$ | holds | fails | — |
| hyperbolic | $s>1$ | fails | holds | holds |
| hyperbolic | $s<-1$ | fails | fails | holds |

So no $u\neq\mathbf{1}$ satisfies both conditions; the positivity condition alone selects the elliptic row (plus $-\mathbf{1}$); the time-order condition together with $A^2\neq0$ selects the hyperbolic row with $s>1$. `H2` and `H8` use the same three-way table but select different rows for different comparisons: comparisons between directions and states take the bounded row, comparisons between observers take the order-preserving row.

Both can live in one algebra.

1. In $\mathrm{Cl}(p,q)$ with orthonormal $e_i$, $(e_ie_j)^2=-e_i^2e_j^2$ for $i\neq j$: this is $-1$ when $e_i^2$ and $e_j^2$ have the same sign and $+1$ otherwise. With reversion as the involution, $B=e_ie_j$ satisfies $B^*B=-B^2$. So the positivity condition holds on coordinate planes inside a definite block and fails on mixed planes. Signature $(1,d)$ has $\frac{d(d-1)}2$ spatial coordinate planes (rotations, elliptic) and $d$ space-time coordinate planes (boosts, hyperbolic).
2. View $M_2(\mathbb{C})$ as a real $*$-algebra with the involution $\sharp$ of E.8.1; the elements with $uu^\sharp=\mathbf{1}$ form $\mathrm{SL}(2,\mathbb{C})$. On the quaternion subalgebra $\operatorname{span}_{\mathbb{R}}\{\mathbf{1},i\sigma_1,i\sigma_2,i\sigma_3\}$ one has $a^\sharp a=\lvert a\rvert^2\mathbf{1}$, so the positivity condition holds; $\sigma_3^\sharp\sigma_3=-\mathbf{1}$, so it fails as soon as one boost generator is added. Every $u\in\mathrm{SL}(2,\mathbb{C})$ is uniquely $u=kb$ with $k\in\mathrm{SU}(2)$, $\frac12\operatorname{tr}k\in[-1,1]$, and $b$ positive definite Hermitian with determinant $1$, $\frac12\operatorname{tr}b\ge1$. Repeating the rotation factor does not amplify; repeating the boost factor does not reverse the order in time.
3. One time direction only. On $\mathbb{R}^p\times\mathbb{R}^q$ take $Q(a,b)=\lvert a\rvert^2-\lvert b\rvert^2$. The open cone $\{Q>0\}$ deformation-retracts onto $\mathbb{R}^p\setminus\{0\}$ through $(a,(1-\lambda)b)$, $0\le\lambda\le1$, so it is connected for $p\ge2$ and has exactly two components for $p=1$, exchanged by $w\mapsto-w$. The "future and past" that the time-order condition needs exist only for $p=1$. For $p\ge2$ the plane spanned by two time directions is definite, its rotations are the elliptic comparisons of item 1, and repeating one turns the time axis around.

The step from null cone to quadratic form is carried by the frozen proposition [@prop-null-cone-rigidity]: as Chapter 17 explains after that proposition, a linear map $B$ that maps the null cone into itself satisfies $\operatorname{minkowski}_d(Bw)=\lambda\operatorname{minkowski}_d(w)$ with $\lambda=\operatorname{minkowski}_d(Be_0)$, for every $d\in\mathbb{N}$. Comparing Gram determinants gives $\det(B)^2=\lambda^{d+1}$. If $\det B=\pm1$: for $d\ge2$ a negative $\lambda$ would change the signature, so $\lambda=1$; for $d=1$, $\lambda=-1$ does occur (the rotation by $90^\circ$, with $\det B=1$), its similarity reading is $0$, and the time-order condition excludes it. The proposition does not say why a null cone exists (that is $K>0$), nor does it give linearity or the time orientation.

**Literature result.** The polar decomposition of matrices, and $\mathrm{SL}(2,\mathbb{C})$ as the spin cover of the Lorentz group.
:::

What remains is linearity.

::: {.remark #rem-appe-causal-order-linearity title="In 1+1 Dimensions the Causal Order Does Not Force Linearity (Manual Derivation and Literature)"}
**Manual derivation.** In $1+1$ dimensions use the null coordinates $p=t+x$, $q=t-x$. An event $Y$ lies in the closed future cone of $X$ ($t_Y-t_X\ge\lvert x_Y-x_X\rvert$) if and only if $p_Y\ge p_X$ and $q_Y\ge q_X$. Hence for any two strictly increasing bijections $f,g:\mathbb{R}\to\mathbb{R}$, the map $(p,q)\mapsto(f(p),g(q))$ preserves the causal order in both directions; it is affine if and only if $f$ and $g$ are, and $f(s)=s+\frac12\sin s$, $g(s)=s^3+s$ are not. So in $1+1$ dimensions the linearity in [@rem-appe-frame-change-family] is an input.

**Literature result.** E. C. Zeeman, *J. Math. Phys.* **5**, 490–493 (1964): the group of automorphisms of Minkowski space that preserve the causal partial order is generated by the inhomogeneous Lorentz group and dilations. The example above shows that this fails in $1+1$ dimensions; this book has not checked in which dimensions it holds.
:::

## E.8.11 Entropy Gain under Pinching: Exact Identities and Two-Sided Bounds {#sec-appe-pinching-entropy}

Item 4 of E.6 uses [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) to show that a unit-preserving basis pinching makes the entropy gain a relative entropy, hence nonnegative. The question here is how large it is. Take projections $P_1,\dots,P_m$ on $\mathbb{C}^d$, pairwise orthogonal with sum $\mathbf{1}$, and put $\mathcal{P}(\rho)=\sum_kP_k\rho P_k$, $X=\rho-\mathcal{P}(\rho)$, the discarded coherence mass $c=\lVert X\rVert_2^2=\sum_{k\neq l}\lVert P_k\rho P_l\rVert_2^2$ ($\lVert\cdot\rVert_2$ the Hilbert–Schmidt norm), and the entropy gain $\Delta S=S(\mathcal{P}(\rho))-S(\rho)$, with entropies in natural logarithms. For a qubit in the standard basis, the Hilbert–Schmidt Pythagorean split and $c=\lvert\rho_{01}\rvert^2+\lvert\rho_{10}\rvert^2$ are frozen for every complex $2\times2$ matrix ([@thm-pinching-pythagorean]).

::: {.remark #rem-appe-pinching-exact-identities title="Three Exact Identities for Block Pinching (Manual Derivation and Literature)"}
**Manual derivation.** For every state $\rho$ and every block pinching:

1. The purity drops by exactly the discarded mass: $\operatorname{tr}\rho^2-\operatorname{tr}\mathcal{P}(\rho)^2=c$, and $\operatorname{tr}(\rho\,\mathcal{P}(\rho))=\operatorname{tr}\mathcal{P}(\rho)^2$.
2. $\Delta S=D(\rho\Vert\mathcal{P}(\rho))$.
3. The second-order Rényi entropy $S_2(\sigma)=-\log\operatorname{tr}\sigma^2$ increases by $S_2(\mathcal{P}(\rho))-S_2(\rho)=-\log\left(1-\dfrac{c}{\operatorname{tr}\rho^2}\right)$.

Derivation: item 1. $\mathcal{P}$ is idempotent and self-adjoint for $\langle A,B\rangle=\operatorname{tr}(A^*B)$, so $\langle\mathcal{P}(\rho),X\rangle=\langle\mathcal{P}(\rho),\rho\rangle-\langle\mathcal{P}(\rho),\mathcal{P}(\rho)\rangle=0$; expand $\langle\mathcal{P}(\rho)+X,\mathcal{P}(\rho)+X\rangle$. This is [@thm-pinching-pythagorean] in general dimension and for general blocks. Item 2: with $U_j=\sum_ke^{2\pi ijk/m}P_k$, orthogonality of roots of unity gives $\mathcal{P}(\rho)=\frac1m\sum_{j=0}^{m-1}U_j\rho U_j^*\ge\frac1m\rho$, so the support of $\rho$ lies in the support of $\mathcal{P}(\rho)$. Like $\mathcal{P}(\rho)$, $\log\mathcal{P}(\rho)$ (taken on the support) is block diagonal, and $\operatorname{tr}(\rho B)=\operatorname{tr}(\mathcal{P}(\rho)B)$ for block-diagonal $B$; hence $-\operatorname{tr}\rho\log\mathcal{P}(\rho)=S(\mathcal{P}(\rho))$, and it remains to substitute into $D(\rho\Vert\sigma)=-S(\rho)-\operatorname{tr}\rho\log\sigma$. Item 3 follows directly from item 1.

Item 2 is frozen for rank-one basis pinching: it is the step $k=0$ of [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) with $U=\mathbf{1}$. There the entropy and relative entropy are defined with Mathlib's convention $\log0=0$; by the support inclusion above, this agrees with the usual definitions here.

**Literature result.** Under basis pinching, $\Delta S$ is the relative-entropy measure of coherence: T. Baumgratz, M. Cramer and M. B. Plenio, *Phys. Rev. Lett.* **113**, 140401 (2014). The inequality $\mathcal{P}(\rho)\ge\rho/m$ is the pinching inequality: M. Hayashi, *J. Phys. A* **35**, 10759–10773 (2002).
:::

On the purity side the statement is exact: the purity drops by exactly the coherence mass that is discarded. On the entropy side the gain is not a function of $c$, but $c$ bounds it from below.

::: {.remark #rem-appe-pinching-entropy-lower title="The Entropy Gain Is at Least the Discarded Coherence Mass; the Exact Range on a Qubit (Manual Derivation and Literature)"}
**Manual derivation.**

1. For every state and every block pinching,

$$
\Delta S\ \ge\ \tfrac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ \ge\ c .
$$

The constant $1$ in $\Delta S\ge c$ cannot be raised: for a qubit with $z=0$, $\Delta S/c\to1$ as $r\to0$.
2. Pure states: $\Delta S=H(p)\ge-\log(1-c)$ with $p_k=\operatorname{tr}(P_k\rho)$. This fails for mixed states: for a qubit with $z=0$, $\Delta S=\frac{r^2}2+\frac{r^4}{12}+O(r^6)$, while $-\log(1-c)=\frac{r^2}2+\frac{r^4}8+O(r^6)$.
3. For a qubit $\rho=\frac12(\mathbf{1}+\mathbf{r}\cdot\boldsymbol\sigma)$, $\mathbf{r}=(x,y,z)$, $r=\lvert\mathbf{r}\rvert\le1$, pinched in the eigenbasis of $\sigma_3$ (for $r=1$ the integral is a convergent improper integral):

$$
\Delta S=\int_{\lvert z\rvert}^{r}\operatorname{artanh}t\,dt,\qquad c=\frac{r^2-z^2}{2}=\int_{\lvert z\rvert}^{r}t\,dt,
$$

and for each $c\in(0,\frac12]$,

$$
\ln2-h\left(\frac{1+\sqrt{2c}}{2}\right)\ \le\ \Delta S\ \le\ h\left(\frac{1+\sqrt{1-2c}}{2}\right),
$$

where $h(q)=-q\ln q-(1-q)\ln(1-q)$; the lower end is attained by the state with $z=0$, the upper end by a pure state.

Derivation: the first inequality of item 1 is the quantum Pinsker inequality (`Literature`) combined with item 2 of [@rem-appe-pinching-exact-identities]. The second: $X$ is Hermitian and traceless; with eigenvalues $\lambda_i$, the sum of the positive eigenvalues and the sum of the absolute values of the negative ones both equal $\frac12\lVert X\rVert_1$, so $\sum\lambda_i^2\le\left(\sum_{\lambda_i>0}\lambda_i\right)^2+\left(\sum_{\lambda_i<0}\lvert\lambda_i\rvert\right)^2=\frac12\lVert X\rVert_1^2$, with equality exactly when $X$ has at most one positive and one negative eigenvalue. Item 2: $\mathcal{P}(\lvert\psi\rangle\langle\psi\rvert)=\sum_kp_k\lvert\psi_k\rangle\langle\psi_k\rvert$ with pairwise orthogonal $\psi_k$, so $\Delta S=H(p)$ and $c=1-\sum p_k^2$; then use $H(p)\ge-\log\sum p_k^2$ (Jensen's inequality). Item 3: with $g(t)=h(\frac{1+t}2)$ one has $S(\rho)=g(r)$, $S(\mathcal{P}(\rho))=g(\lvert z\rvert)$ and $g'(t)=-\operatorname{artanh}t$. Fix $c$ and let $F(z)=g(z)-g(\sqrt{z^2+2c})$ on $0\le z\le\sqrt{1-2c}$; then $F'(z)=z\left(\frac{\operatorname{artanh}r}{r}-\frac{\operatorname{artanh}z}{z}\right)\ge0$ because $t\mapsto\operatorname{artanh}t/t$ is increasing, and the values at the two ends are the two bounds.

**Numerical check (`NUM`).** On $6000$ random states of $d=2,3,4,5$ with random blocks and all ranks (fixed random seed), neither inequality of item 1 is violated, and the second holds with equality up to rounding in some cases; the closed form of item 3 agrees with numerical integration to $3\times10^{-14}$, and both ends are attained at $c=0.05,0.2,0.45$. The pure-state example of [§36.1.5.2](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-p2g-dream-precompile) ($\theta=\frac\pi6$, $c=\frac38$) sits at the upper end: $\Delta S=h(\frac34)\approx0.5623$ (that is, $0.8113$ bits).

**Literature result.** The quantum Pinsker inequality $D(\rho\Vert\sigma)\ge\frac12\lVert\rho-\sigma\rVert_1^2$: F. Hiai, M. Ohya and M. Tsukada, *Pacific J. Math.* **96**, 99–109 (1981). The classical case is frozen as [`pinsker_inequality`](lean:D5/S3/TotalVariation/Pinsker.pinsker_inequality).
:::

On the upper side there is a frozen proposition for rank-one basis pinching.

::: {.proposition #prop-appe-l1-coherence-bound title="Relative-Entropy Coherence Is at Most ℓ1 Coherence" lean="D5/S3/Divergence/CoherenceL1RelativeEntropyBound.result"}
Let $n\in\mathbb{N}$ and let $\rho$ be a positive semidefinite complex $n\times n$ matrix with trace $1$. Put $S_{\mathrm{bit}}(\sigma)=-\operatorname{Re}\operatorname{tr}f(\sigma)$, where $f(x)=x\log_2x$, $f(0)=0$, and $f(\sigma)$ is given by the continuous functional calculus. Then

$$
S_{\mathrm{bit}}\left(\operatorname{diag}(\rho_{11},\dots,\rho_{nn})\right)-S_{\mathrm{bit}}(\rho)\ \le\ \sum_{i\neq j}\lvert\rho_{ij}\rvert .
$$
:::

::: proof
Split the basis pinching into $n$ steps; step $k$ is the binary pinching with the $k$-th coordinate projection $P$ and $\mathbf{1}-P$. A binary pinching is the average of $\sigma$ and its reflection $R\sigma R$ ($R=2P-\mathbf{1}$), so the entropy gain of the step is the quantum Jensen–Shannon divergence of the two; by the frozen binary Holevo bound it is at most $\frac12\lVert\sigma-R\sigma R\rVert_1=2\lVert P\sigma(\mathbf{1}-P)\rVert_1$. The matrix $P\sigma(\mathbf{1}-P)$ has rank one, and its trace norm is the Euclidean length of the piece of the row deleted in this step, which is at most the sum of the moduli of its entries; the factor $2$ accounts for row and column together. The entropy gains of the steps telescope to the left-hand side, and the right-hand sides add up to at most $\sum_{i\neq j}\lvert\rho_{ij}\rvert$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-pinching-entropy-upper title="Upper Bounds on the Entropy Gain, and Why None Is Linear in the Coherence Mass (Manual Derivation and Literature)"}
**Manual derivation.**

1. $\Delta S\le\log m$.
2. $\Delta S\le T\log(d-1)+h(T)$ with $T=\frac12\lVert X\rVert_1\le T':=\frac12\sqrt{\operatorname{rank}(X)\,c}$; if $T'\le1-\frac1d$, $T$ may be replaced by $T'$, because $T\mapsto T\log(d-1)+h(T)$ is increasing on $[0,1-\frac1d]$.
3. Rank-one basis pinching ($m=d$): by [@prop-appe-l1-coherence-bound] and the Cauchy–Schwarz inequality, $\dfrac{\Delta S}{\ln2}\le\sum_{i\neq j}\lvert\rho_{ij}\rvert\le\sqrt{d(d-1)\,c}$.
4. There is no upper bound of the form $\Delta S\le Kc$. The pure state $\psi=\sqrt{1-\epsilon}\,\lvert0\rangle+\sqrt\epsilon\,\lvert1\rangle$ has $c=2\epsilon(1-\epsilon)$ and $\Delta S=h(\epsilon)$; as $\epsilon\to0$, $\Delta S/c=\frac12\ln\frac2c+\frac12+o(1)\to\infty$.

Derivation: item 1 follows from $\mathcal{P}(\rho)=\frac1m\sum_jU_j\rho U_j^*$ in the derivation of item 2 of [@rem-appe-pinching-exact-identities] and $S(\sum_jq_j\rho_j)\le\sum_jq_jS(\rho_j)+H(q)$ (`Literature`). Item 2 is Audenaert's continuity bound (`Literature`) together with $\lVert X\rVert_1\le\sqrt{\operatorname{rank}X}\,\lVert X\rVert_2$. Item 3 compares the moduli of the $d(d-1)$ off-diagonal entries with their sum of squares $c$ by Cauchy–Schwarz.

So the lower bound is of the order of $c$, while the known general upper bounds are only of the order of $\sqrt{c}$. On a qubit, item 3 of [@rem-appe-pinching-entropy-lower] gives the exact upper end, which is $\frac c2\ln\frac2c+O(c)$ as $c\to0$; whether for $d\ge3$ the upper bound can be improved to the order of $c\log\frac1c$ is not treated in this book.

**Literature result.** K. M. R. Audenaert, *J. Phys. A* **40**, 8127–8136 (2007); the reverse inequality for concavity of the entropy used above is in M. A. Nielsen and I. L. Chuang, *Quantum Computation and Quantum Information* (Cambridge, 2000), Chapter 11. The inequality of [@prop-appe-l1-coherence-bound] was proposed as a conjecture by S. Rana, P. Parashar and M. Lewenstein, *Phys. Rev. A* **93**, 012110 (2016), Conjecture 7.
:::

So the item "a unit-preserving pinching does not decrease the entropy" of `H8` now has a quantitative form in finite dimension: the entropy gain is at least the discarded coherence mass $c$, the known general upper bounds are of the order of $\sqrt{c}$, and the purity drops by exactly $c$. What remains an input is the choice itself that coarse-graining is a unit-preserving pinching; the active-reset counterexample in item 4 of E.6 shows that it cannot be dropped.

## E.8.12 Finite-Step Path Products: Stationary Phase Is Exact for Quadratic Actions {#sec-appe-finite-step-path-product}

Item 3 of E.6 records $\delta S=0$ as a conditional result reached only through a continuum functional measure and the limit $\hbar\to0$. This subsection asks how much survives at a finite number of steps. Take $\hbar=m=1$, $H=\frac12p^2+\frac12\omega^2x^2$, $V=\frac12\omega^2x^2$, $\varepsilon=t/N$, and the single step

$$
U_\varepsilon=e^{-i\varepsilon V/2}\,e^{-i\varepsilon p^2/2}\,e^{-i\varepsilon V/2},
$$

whose kernel is the trapezoid short-time kernel $(2\pi i\varepsilon)^{-1/2}\exp i\left[\frac{(x-y)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{4}(x^2+y^2)\right]$; $U_\varepsilon^N$ is the $N$-step path product.

::: {.remark #rem-appe-oscillator-time-slicing title="The N-Step Sliced Product of the Oscillator Is an Oscillator with a Modified Frequency (Manual Derivation and Literature)"}
**Manual derivation.** Let $0<\varepsilon\omega<2$ and put

$$
\cos\theta=1-\frac{\varepsilon^2\omega^2}{2},\quad 0<\theta<\pi,\qquad \tilde\Omega=\omega\sqrt{1-\frac{\varepsilon^2\omega^2}{4}},\qquad \tilde H=\frac12p^2+\frac12\tilde\Omega^2x^2,
$$

so that $\sin\theta=\varepsilon\tilde\Omega$. Let $\tilde\varphi_n$ be the Hermite functions of frequency $\tilde\Omega$, $\tilde a=(\sqrt{\tilde\Omega}\,x+ip/\sqrt{\tilde\Omega})/\sqrt2$ and $\tilde n=\tilde a^\dagger\tilde a$.

1. $U_\varepsilon\tilde\varphi_n=e^{-i\theta(n+\frac12)}\tilde\varphi_n$ for all $n$. Hence, exactly on $L^2(\mathbb{R})$, $U_\varepsilon=\exp\left(-i\theta(\tilde n+\tfrac12)\right)=\exp\left(-i\frac{\theta}{\tilde\Omega}\tilde H\right)$.
2. For $\sin N\theta\neq0$ the kernel of $U_\varepsilon^N$ is the Mehler kernel of frequency $\tilde\Omega$ and angle $\Theta=N\theta$:

$$
K_N(x,y)=\left(\frac{\tilde\Omega}{2\pi\lvert\sin\Theta\rvert}\right)^{1/2}e^{-i\pi/4-i\pi\nu/2}\exp\left(\frac{i\tilde\Omega}{2\sin\Theta}\left[(x^2+y^2)\cos\Theta-2xy\right]\right),\qquad \nu=\left\lfloor\frac{\Theta}{\pi}\right\rfloor .
$$

3. The discrete action

$$
S_N=\sum_{k=0}^{N-1}\frac{(x_{k+1}-x_k)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{2}\sum_{k=1}^{N-1}x_k^2-\frac{\varepsilon\omega^2}{4}\left(x_0^2+x_N^2\right)
$$

with $x_0=y$, $x_N=x$ has a unique stationary point $\bar x$:

$$
\delta S_N=0\iff \bar x_k-\frac{\bar x_{k+1}+\bar x_{k-1}}{2}=(1-\cos\theta)\,\bar x_k,\qquad \bar x_k=\frac{y\sin((N-k)\theta)+x\sin(k\theta)}{\sin N\theta}.
$$

The Hessian $Q$ of $S_N$ in $x_1,\dots,x_{N-1}$ has $\det Q=\varepsilon^{-(N-1)}\dfrac{\sin N\theta}{\sin\theta}$ and $\nu$ negative eigenvalues, and

$$
K_N(x,y)=(2\pi\varepsilon)^{-N/2}e^{-i\pi N/4}\,(2\pi)^{(N-1)/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}\,e^{iS_N(\bar x)} .
$$

The right-hand side is exactly the leading stationary-phase term at $\bar x$, including the prefactor $\lvert\det Q\rvert^{-1/2}$ and the Maslov phase $e^{-i\pi\nu/2}$. So **at every finite number of steps the path product equals the contribution of the stationary path exactly**, with zero remainder and without any limit $\hbar\to0$. The discrete Euler–Lagrange equation says that the sagitta of each step (its midpoint deviation) is $1-\cos\theta=\frac{\varepsilon^2\omega^2}2$ times the position.
4. Errors against continuous time:

$$
\frac{(\omega t)^3}{24N^2}\le\Theta-\omega t\le\frac{(\omega t)^3}{24N^2\left(1-(\omega t/2N)^2\right)},\qquad \frac{(\omega t)^2}{8N^2}\le1-\frac{\tilde\Omega}{\omega}\le\frac{(\omega t)^2}{4N^2},
$$

and for a Schwartz function $\varphi$, with $\varphi_s=e^{-isH}\varphi$,

$$
\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert\le(\Theta-\omega t)\,\lVert(\tilde n+\tfrac12)\varphi\rVert+t\left[\left(\frac{\omega}{\tilde\Omega}-1\right)\sup_{0\le s\le t}\tfrac12\lVert p^2\varphi_s\rVert+\omega(\omega-\tilde\Omega)\sup_{0\le s\le t}\tfrac12\lVert x^2\varphi_s\rVert\right],
$$

and the right-hand side is $O(N^{-2})$.

Derivation: item 1. The Heisenberg actions of the three factors are $p\mapsto p-\frac{\varepsilon\omega^2}2x$, $x\mapsto x+\varepsilon p$ and $p\mapsto p-\frac{\varepsilon\omega^2}2x$; together $U_\varepsilon^*(x,p)^{\mathsf T}U_\varepsilon=M_\varepsilon(x,p)^{\mathsf T}$ with

$$
M_\varepsilon=\begin{pmatrix}\cos\theta&\varepsilon\\-\varepsilon\tilde\Omega^2&\cos\theta\end{pmatrix}=\begin{pmatrix}\cos\theta&\sin\theta/\tilde\Omega\\-\tilde\Omega\sin\theta&\cos\theta\end{pmatrix},
$$

which is the flow of $\tilde H$ for time $\theta/\tilde\Omega$. Hence $U_\varepsilon^*\tilde aU_\varepsilon=e^{-i\theta}\tilde a$, $U_\varepsilon$ maps $\ker\tilde a=\mathbb{C}\tilde\varphi_0$ into itself, and $U_\varepsilon\tilde\varphi_n$ carries one more factor $e^{-in\theta}$ than $U_\varepsilon\tilde\varphi_0$. The phase on the ground state: label $e^{-zx^2/2}$ ($\operatorname{Re}z>0$) by $z$. A kick maps $z$ to $z+\frac{i\varepsilon\omega^2}2$; a free step maps $e^{-zx^2/2}$ to $(1+i\varepsilon z)^{-1/2}e^{-\frac{z}{1+i\varepsilon z}x^2/2}$ (principal branch; Fourier transform of a Gaussian). Starting from $z_0=\tilde\Omega$: $z_1=\tilde\Omega+\frac{i\varepsilon\omega^2}2$ and $1+i\varepsilon z_1=\cos\theta+i\sin\theta=e^{i\theta}$. Expanding with $\tilde\Omega^2=\omega^2-\frac{\varepsilon^2\omega^4}4$ gives $z_1=(\tilde\Omega-\frac{i\varepsilon\omega^2}2)e^{i\theta}$, so the free step leads to $\tilde\Omega-\frac{i\varepsilon\omega^2}2$, the second kick returns to $\tilde\Omega$, and the total phase is $e^{-i\theta/2}$. Completeness of the Hermite functions gives the operator identity. Item 2 is Mehler's formula (`Literature`) for $\exp(-i\Theta(\tilde n+\frac12))$. Item 3: the stationarity equation is $\partial S_N/\partial x_k=0$. $Q=\frac1\varepsilon(2\cos\theta\,\mathbf{1}-J)$ with $J$ the adjacency matrix of the path graph, whose eigenvalues are $2\cos\frac{j\pi}N$ ($1\le j\le N-1$); this gives the determinant and the number $\#\{j:j\pi/N<\theta\}=\nu$ of negative eigenvalues. Integrate over $x_1,\dots,x_{N-1}$ with the Gauss–Fresnel integral (understood with Gaussian regularization; `Literature`: for a nondegenerate real quadratic form it equals the value at the stationary point times $(2\pi)^{n/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}$), and use $(2\pi i\varepsilon)^{-1/2}=(2\pi\varepsilon)^{-1/2}e^{-i\pi/4}$. The modulus of the prefactor is $(2\pi)^{-1/2}\lvert\sin\theta/(\varepsilon\sin\Theta)\rvert^{1/2}=(\tilde\Omega/(2\pi\lvert\sin\Theta\rvert))^{1/2}$ and its phase is $e^{-i\pi N/4}e^{i\pi(N-1-2\nu)/4}=e^{-i\pi/4-i\pi\nu/2}$; the exponent agrees with item 2 because both are kernels of the same operator. Item 4: $f(u)=\arcsin u-u$ satisfies $\frac{u^2}2\le f'(u)\le\frac{u^2}{2(1-u^2)}$, and $\Theta-\omega t=2Nf(\frac{\omega t}{2N})$; also $1-\sqrt{1-y}\in[\frac y2,y]$. For the state bound insert $e^{-i\omega t(\tilde n+\frac12)}=e^{-i(\omega t/\tilde\Omega)\tilde H}$; the first difference is bounded by the spectral theorem and $\lvert e^{-ia}-e^{-ib}\rvert\le\lvert a-b\rvert$, the second by Duhamel's formula and $\frac{\omega}{\tilde\Omega}\tilde H-H=\left(\frac{\omega}{\tilde\Omega}-1\right)\frac{p^2}2-\omega(\omega-\tilde\Omega)\frac{x^2}2$.

**Numerical check (`NUM`).** With $U_\varepsilon$ implemented by fast Fourier transform on a $4096$-point grid: for $\varepsilon\omega=0.3,1,1.9$, $\lVert U_\varepsilon\tilde\varphi_n-e^{-i\theta(n+\frac12)}\tilde\varphi_n\rVert\le4\times10^{-15}$ ($n<6$), while the ground state of frequency $\omega$ is not an eigenvector (residuals $2.4\times10^{-3}$, $8.8\times10^{-2}$, $0.49$ after removing the best multiple); $U_\varepsilon^N$ applied to a Gaussian wave packet differs from the integral against the kernel of item 2 by at most $6\times10^{-15}$, for cases with $\nu$ from $0$ to $19$; the assembly of item 3 agrees with item 2 at random points to $2\times10^{-13}$, and every count of negative eigenvalues matches. For a coherent state centred at $x=1$ and $t=3$, $N^2\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert$ stays at $1.51$ from $N=8$ to $128$ and is always below the bound of item 4 (for example $9.2\times10^{-5}\le5.3\times10^{-4}$ at $N=128$).

**Literature result.** The modified Hamiltonian of the Störmer–Verlet integrator for linear oscillators and the stability condition $\varepsilon\omega<2$: E. Hairer, C. Lubich and G. Wanner, *Geometric Numerical Integration*, 2nd ed. (Springer, 2006). The time-sliced oscillator and the angle $\theta$ with $2\sin\frac\theta2=\varepsilon\omega$: H. Kleinert, *Path Integrals in Quantum Mechanics, Statistics, Polymer Physics, and Financial Markets*, 5th ed. (World Scientific, 2009); the slicing convention there has not been checked term by term against the trapezoid convention used here. Background on the metaplectic representation: G. B. Folland, *Harmonic Analysis in Phase Space* (Princeton, 1989).
:::

The $1-\cos\theta$ of item 3 is exactly the sagitta of E.8.1, and it also decides how large a time step may be.

::: {.example #ex-appe-time-step-trichotomy title="The Sagitta of a Time Step: Elliptic, Parabolic and Hyperbolic Slicings (Manual Derivation and Numerical Check)"}
**Manual derivation.** The single-step matrix $M_\varepsilon=\begin{pmatrix}1-\frac{\varepsilon^2\omega^2}2&\varepsilon\\-\varepsilon\omega^2\left(1-\frac{\varepsilon^2\omega^2}4\right)&1-\frac{\varepsilon^2\omega^2}2\end{pmatrix}$ (with $\det M_\varepsilon=1$ for every $\varepsilon\omega>0$) has similarity reading $\frac12\operatorname{tr}M_\varepsilon=1-v$ with sagitta $v=\frac{\varepsilon^2\omega^2}2$. By the table of E.8.1: for $0<\varepsilon\omega<2$, $0<v<2$, elliptic, and $M_\varepsilon^n$ is bounded; for $\varepsilon\omega=2$, $v=2$, $M_\varepsilon=\begin{pmatrix}-1&\varepsilon\\0&-1\end{pmatrix}$, parabolic, and $M_\varepsilon^n=(-1)^n\begin{pmatrix}1&-n\varepsilon\\0&1\end{pmatrix}$ grows linearly; for $\varepsilon\omega>2$, $v>2$, hyperbolic, with exponential growth. $U_\varepsilon$ is always unitary; what grows is the spread in position and momentum, so the time step has to satisfy $\varepsilon\omega<2$ for the sliced product to keep it bounded.

**Numerical check (`NUM`).** With $\omega=1$: for $\varepsilon=1.9$, $\lVert M_\varepsilon^n\rVert$ at $n=10,100,1000$ is $1.10$, $2.26$, $1.95$; for $\varepsilon=2$ it is $20.05$, $200$, $2000$; for $\varepsilon=2.1$ it is $9.4\times10^2$, $3.9\times10^{27}$, $6.0\times10^{273}$.
:::

Beyond quadratic actions there is no such exact equality at a finite number of steps. What remains are one-dimensional cancellation bounds: a stretch without a stationary point contributes a bounded amount, however long it is.

::: {.remark #rem-appe-oscillatory-cancellation-bounds title="Stretches without a Stationary Point Cancel: Explicit Bounds for One-Dimensional Oscillatory Integrals and Sums (Manual Derivation and Literature)"}
**Manual derivation.** Let $\lambda>0$.

1. If $\varphi\in C^2[a,b]$, $\varphi'$ is monotone and $\lvert\varphi'\rvert\ge\mu>0$, then $\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{3}{\lambda\mu}$.
2. If $\varphi\in C^2[a,b]$ and $\lvert\varphi''\rvert\ge\mu>0$, then $\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{4\sqrt3}{\sqrt{\lambda\mu}}$.
3. If $A<B$ are integers, $f\in C^1[A,B]$, $f'$ is monotone, and $m+\delta\le f'\le m+1-\delta$ for an integer $m$ and some $0<\delta\le\frac12$, then $\left\lvert\sum_{n=A}^{B-1}e^{2\pi if(n)}\right\rvert\le\cot\dfrac{\pi\delta}{2}$, independently of the number of terms.

Derivation: item 1, integrate by parts: $\int e^{i\lambda\varphi}=\left[\frac{e^{i\lambda\varphi}}{i\lambda\varphi'}\right]_a^b-\int e^{i\lambda\varphi}\left(\frac{1}{i\lambda\varphi'}\right)'$; the boundary term is at most $\frac2{\lambda\mu}$, and by monotonicity the integral term is at most $\frac1\lambda\left\lvert\frac1{\varphi'(b)}-\frac1{\varphi'(a)}\right\rvert\le\frac1{\lambda\mu}$. Item 2: $\varphi'$ is strictly monotone, $\{\lvert\varphi'\rvert<\eta\}$ is an interval of length at most $\frac{2\eta}{\mu}$, and on the remaining at most two intervals $\lvert\varphi'\rvert\ge\eta$, each contributing at most $\frac3{\lambda\eta}$ by item 1; the total $\frac6{\lambda\eta}+\frac{2\eta}\mu$ is smallest at $\eta=\sqrt{3\mu/\lambda}$. Item 3: $g_n=f(n+1)-f(n)\in[m+\delta,m+1-\delta]$ is monotone in $n$. With $c_n=\left(e^{2\pi ig_n}-1\right)^{-1}=-\frac12-\frac i2\cot\pi g_n$ one has $e^{2\pi if(n)}=c_n\left(e^{2\pi if(n+1)}-e^{2\pi if(n)}\right)$. Abel summation gives the bound $\lvert c_A\rvert+\lvert c_{B-1}\rvert+\sum_{n=A+1}^{B-1}\lvert c_n-c_{n-1}\rvert$; here $\lvert c_n\rvert\le\frac1{2\sin\pi\delta}$, and by monotonicity the last sum telescopes to $\frac12\lvert\cot\pi g_{B-1}-\cot\pi g_A\rvert\le\cot\pi\delta$; in total $\frac{1+\cos\pi\delta}{\sin\pi\delta}=\cot\frac{\pi\delta}2$.

All three are one-dimensional; the $N$-step product is an $(N-1)$-dimensional integral, and how the constants behave with the dimension needs a separate estimate.

**Numerical check (`NUM`).** For random phases and random quadratic oscillatory sums, the largest ratio of the integral to the bound is $0.57$ for item 1 and $0.45$ for item 2, and the largest ratio of the sum to the bound of item 3 is $0.97$.

**Literature result.** Items 1 and 2 are van der Corput's lemma; for the constants see E. M. Stein, *Harmonic Analysis* (Princeton, 1993), Chapter VIII (where the constant of order $k$ is $5\cdot2^{k-1}-2$; here item 2 has $4\sqrt3<8$). Item 3 is the Kusmin–Landau inequality: L. J. Mordell, *Acta Arith.* **4**, 3–9 (1958); S. W. Graham and G. Kolesnik, *Van der Corput's Method of Exponential Sums* (Cambridge, 1991).
:::

What remains is the continuum-time limit.

::: {.remark #rem-appe-path-integral-remaining-inputs title="What the Continuum-Time Limit Still Needs (Literature Result, Not Formalized in This Book; OPEN)"}
**Literature result, not formalized in this book.**

1. At fixed $\hbar$, no path measure is needed at the level of operators: if $H_0=\frac12p^2$ and $V$ are such that $H_0+V$ is essentially self-adjoint on $D(H_0)\cap D(V)$, then $\left(e^{-itV/N}e^{-itH_0/N}\right)^N\to e^{-itH}$ strongly. H. F. Trotter, *Proc. Amer. Math. Soc.* **10**, 545–551 (1959); E. Nelson, *J. Math. Phys.* **5**, 332–343 (1964). The frozen [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) is the version for bounded elements of a Banach algebra and does not cover $p^2$.
2. On path space there is no countably additive complex measure of bounded total variation that represents $e^{iS}\mathcal{D}x$: R. H. Cameron, *J. Math. and Phys.* **39**, 126–140 (1960). So the "continuum functional measure" of E.6 and E.7 should be read as "the limit of time-sliced oscillatory integrals", not as such a measure.
3. For non-quadratic potentials: convergence of the time-sliced integrals and construction of the fundamental solution, D. Fujiwara, *J. Analyse Math.* **35**, 41–96 (1979) and *Duke Math. J.* **47**, 559–600 (1980); stationary phase with a remainder estimate on spaces of large dimension, D. Fujiwara, *Nagoya Math. J.* **124**, 61–97 (1991); monograph *Rigorous Time Slicing Approach to Feynman Path Integrals* (Springer, 2017). The conditions these results impose on the potential have not been checked item by item in this book.

So the selection of paths by $\delta S=0$ is exact at a finite number of steps only for quadratic actions ([@rem-appe-oscillator-time-slicing]); for general actions there are only asymptotic statements in $\hbar$, with the explicit one-dimensional bounds of [@rem-appe-oscillatory-cancellation-bounds] and, in many dimensions, the literature of item 3.

**OPEN.** Interacting field theory in $3+1$ dimensions has no counterpart of any of these theorems; this item stays open, as `H9` in E.7.
:::

## E.8.13 Complex Structure, Exchange Sign and Valuation: The Exact Shape of Three Inputs {#sec-appe-complex-exchange-valuation}

After E.8.7 the ledger still lists three items as plain inputs: the central complex structure and the exchange sector of `H7`, and the choice of valuation in `H4`. This subsection writes the first as a condition on generators and readings, places the second in configuration space, and writes the third as a boundedness criterion; all three remain inputs.

The algebras below are finite direct sums $\mathcal{A}=M_{n_1}(F_1)\oplus\cdots\oplus M_{n_m}(F_m)$ with $F_k\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$, $n_k\ge1$, and blockwise conjugate transpose as involution. Write $\operatorname{Sa}(\mathcal{A})=\{a:a^*=a\}$ (similarity parts), $\operatorname{Skew}(\mathcal{A})=\{a:a^*=-a\}$ (difference parts) and $U(\mathcal{A})=\{u:u^*u=uu^*=\mathbf{1}\}$ (fair elements). The splitting $a=\frac12(a+a^*)+\frac12(a-a^*)$ is the $S$ and $A$ of E.8.1.

::: {.remark #rem-appe-agreement-difference-count title="Dimensions of Similarity and Difference Parts: In a Single Matrix Algebra They Are Equal Only in the Complex Case (Manual Derivation)"}
**Manual derivation.** Let $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$. In $M_n(F)$ the diagonal entries of a self-adjoint matrix are real, those of a skew-adjoint matrix are purely imaginary ($d-1$ parameters each), and each pair $i<j$ carries one free entry of $F$ in both cases. Hence

$$
\dim\operatorname{Sa}=K_d(n)=n+d\cdot\frac{n(n-1)}{2},\qquad \dim\operatorname{Skew}=dn^2-K_d(n),\qquad \dim\operatorname{Sa}-\dim\operatorname{Skew}=(2-d)\,n,
$$

where $K_d$ is the counting function of [@rem-appe-tomography-count]. The difference is $n$, $0$ and $-2n$ for real, complex and quaternionic scalars, and it carries the same factor $2-d$ as the composite defect $\frac{d(2-d)}4a(a-1)b(b-1)$ there. For direct sums, equal dimensions no longer settle the matter: in $M_2(\mathbb{R})\oplus\mathbb{H}$ one has $\dim\operatorname{Sa}=3+1=4=1+3=\dim\operatorname{Skew}$, and neither summand is complex.
:::

In E.8.6 a family of fair elements is generated by a difference part (the chord rate $-iH$), and what is read is a similarity part ($H$); in complex quantum theory the two correspond one to one by multiplication with $i$, and the correspondence does not depend on the frame. The next remark turns this into a condition that also applies to direct sums.

::: {.remark #rem-appe-generator-reading-dictionary title="A Generator–Reading Dictionary Exists Exactly When the Center Contains a Right-Angle Comparison (Manual Derivation and Numerical Check)"}
**Manual derivation.** Call a real-linear bijection $\Phi:\operatorname{Skew}(\mathcal{A})\to\operatorname{Sa}(\mathcal{A})$ a **covariant dictionary** if $\Phi(uxu^*)=u\,\Phi(x)\,u^*$ for all $u\in U(\mathcal{A})$ and $x\in\operatorname{Skew}(\mathcal{A})$. The following are equivalent:

1. a covariant dictionary exists;
2. the center of $\mathcal{A}$ contains $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$;
3. every $F_k=\mathbb{C}$;
4. in the center, the difference parts and the similarity parts have the same dimension.

When they hold, such $J$ are exactly $(\pm i\mathbf{1}_1,\dots,\pm i\mathbf{1}_m)$, $2^m$ of them, and $\Phi(x)=Jx$ is a covariant dictionary. For $\mathcal{A}=M_n(\mathbb{C})$ the covariant real-linear maps are exactly $\Phi(x)=J\bigl(\alpha x+\gamma\operatorname{tr}(x)\mathbf{1}\bigr)$ with $\alpha,\gamma\in\mathbb{R}$ and $\operatorname{tr}$ the complex trace; for $n\ge2$ such a map is bijective if and only if $\alpha\neq0$ and $\alpha+n\gamma\neq0$, and for $n=1$ if and only if $\alpha+\gamma\neq0$. For $m\ge2$ the dictionary is not unique: the central parts of different summands can be mixed by an arbitrary real-linear map.

Derivation. (a) The real span of $U(M_n(F))$ is $M_n(F)$: the span is closed under products and contains the diagonal matrices with unit entries of $F$ (these span all diagonal matrices) and the permutation matrices, and a permutation matrix times a diagonal matrix unit gives every $qE_{ij}$; in a direct sum, $(1,\dots,u_k,\dots,1)$ and $(-1,\dots,u_k,\dots,-1)$ average to $(0,\dots,u_k,\dots,0)$. So the elements commuting with every fair element are exactly the central ones. (b) The center of $M_n(F)$ is $Z(F)\mathbf{1}$, with $Z(\mathbb{R})=\mathbb{R}$, $Z(\mathbb{C})=\mathbb{C}$, $Z(\mathbb{H})=\mathbb{R}$; so the central similarity parts form an $m$-dimensional space, and the dimension of the central difference parts is the number of complex summands.

- **2⇒1.** If $J$ is central and $J^*=-J$, then $(Jx)^*=x^*J^*=xJ=Jx$, so $x\mapsto Jx$ sends difference parts to similarity parts, with inverse $y\mapsto-Jy$, and $J\,uxu^*=u\,Jx\,u^*$.
- **1⇒4.** By covariance, $\Phi(x)$ is fixed by every conjugation when $x$ is; the converse follows from injectivity. So $\Phi$ maps the two fixed subspaces onto each other, and by (a) these are the central parts.
- **4⇒3⇒2.** By (b), item 4 says that $m$ equals the number of complex summands; then take $J=(i\mathbf{1}_1,\dots,i\mathbf{1}_m)$. A central difference part has components in $i\mathbb{R}\mathbf{1}_k$, and $J^2=-\mathbf{1}$ forces each to be $\pm i$.
- **Covariant maps on $M_n(\mathbb{C})$.** Let $L(h)=\Phi(-Jh)$, a covariant map from $\operatorname{Sa}$ to itself. A real diagonal $D$ is fixed by the diagonal fair elements, so $L(D)$ commutes with all of them and is real diagonal; on real diagonals $L$ commutes with permutations, so $L(D)=\alpha D+\gamma\operatorname{tr}(D)\mathbf{1}$. Every $h$ is some $uDu^*$, hence $L(h)=\alpha h+\gamma\operatorname{tr}(h)\mathbf{1}$; $L$ multiplies the traceless part by $\alpha$ and $\mathbf{1}$ by $\alpha+n\gamma$.

**Numerical check (`NUM`).** Realizing each algebra as a real matrix algebra and writing the covariance condition with random fair elements and blockwise reflections, the solution space is $1$-dimensional for $M_1(\mathbb{C})$ and $2$-dimensional for $M_n(\mathbb{C})$, $n=2,3,4$, with invertible solutions; $M_n(\mathbb{R})$, $M_n(\mathbb{H})$ ($n\le4$), $\mathbb{R}\oplus\mathbb{C}$, $\mathbb{R}\oplus\mathbb{H}$, $M_2(\mathbb{R})\oplus\mathbb{H}$ and $M_3(\mathbb{R})\oplus\mathbb{H}\oplus\mathbb{H}$ have no invertible solution; for $\mathbb{C}\oplus\mathbb{C}$, $M_2(\mathbb{C})\oplus\mathbb{C}$ and $M_2(\mathbb{C})\oplus M_2(\mathbb{C})$ the solution space has dimension $4$, $5$ and $6$ and contains invertible solutions.
:::

So the "central complex structure" of `H7` can be restated (`MODEL`): **every difference part comes with a similarity reading, and this correspondence is linear, invertible and unchanged by a change of frame through a fair element.**

::: {.remark #rem-appe-dictionary-independence title="The Dictionary Does Not Follow from Clauses I–IV and Positivity, and It Gives the Complex Carrier of H4 (Manual Derivation and Literature)"}
**Manual derivation.**

1. **Models satisfying every clause without a dictionary.** For $F=\mathbb{R}$ or $\mathbb{H}$ take $X=U(M_n(F))$ (that is, $\mathrm{O}(n)$ or $\mathrm{Sp}(n)$), $\mathcal{A}=M_n(F)$ and $\mathrm{CMP}(x,y)=x^*y$. Clause II: $\mathrm{CMP}(x,y)^*=y^*x=\mathrm{CMP}(y,x)$; Clause III: $x^*y\,y^*x=\mathbf{1}$; Clause IV: $x^*y\,y^*z=x^*z$; Clause I: $\mathrm{CMP}(x,\mathbf{1})=\mathrm{CMP}(y,\mathbf{1})$ already gives $x=y$. Positivity: $\operatorname{Re}\operatorname{tr}(a^*a)=\sum_{i,j}\lvert a_{ij}\rvert^2$, so $a^*a=-t\mathbf{1}$ ($t\ge0$) forces $-tn\ge0$, $t=0$ and $a=0$. By [@rem-appe-generator-reading-dictionary] these models have no covariant dictionary.
2. **It is not "the count multiplies".** The commutative algebra $\mathbb{R}^n$ ($d=0$ in [@rem-appe-tomography-count]) has a multiplicative count, but $\operatorname{Skew}=0$ and there is no dictionary. Only within single matrix algebras ($n\ge2$) do the three conditions (the count multiplies, the two parts have equal dimension, a covariant dictionary exists) all select the complex numbers.
3. **Complex carrier.** Let the center of $\mathcal{A}$ contain $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$, and let $\pi$ be a unital $*$-representation of $\mathcal{A}$ on a finite-dimensional real inner-product space $V$ ($\pi(a^*)=\pi(a)^{\mathsf T}$). Then $R=\pi(J)$ satisfies $R^{\mathsf T}=-R$ and $R^2=-I$ and commutes with every $\pi(a)$; so $V$ becomes a complex vector space with $R$ as $i$, $\pi(\mathcal{A})$ acts complex-linearly, and $(\det R)^2=(-1)^{\dim V}$ forces $\dim V$ to be even. This is the even real dimension and complex carrier of [@rem-appe-arithmetic-chain], item 3.
4. **The sign of $J$.** On each summand $J$ is fixed only up to sign: entrywise complex conjugation of $M_n(\mathbb{C})$ is a $*$-automorphism exchanging $i\mathbf{1}$ and $-i\mathbf{1}$. Item 5 of [@rem-appe-real-realizability-return-phase] uses the same complex conjugation: it keeps the pairwise similarity readings and changes the sign of $D$.

**Literature result.** Stueckelberg (1960, *Helv. Phys. Acta* 33, 727) argued from the uncertainty relations that quantum theory on a real Hilbert space must carry a complex structure commuting with every observable, which makes it equivalent to complex quantum theory; Moretti and Oppio obtain from Poincaré symmetry a complex structure that commutes with every observable and is unique up to sign (2017, *Rev. Math. Phys.* 29, 1750021; the quaternionic case in 2019, same journal 31, 1950013). In general probabilistic theories, the three postulates of Barnum, Müller and Ududec (2014, *New J. Phys.* 16, 123029) leave candidates that include real, complex and quaternionic quantum theory, and adding "observability of energy" leaves only complex quantum theory. That finite-dimensional real $C^*$-algebras are, up to $*$-isomorphism, exactly the direct sums above is a classical result; this remark uses only the given direct sums and does not depend on it. The network experiments that separate real from complex quantum theory (Renou et al. 2021, *Nature* 600, 625; Chen et al. 2022 and Li et al. 2022, *Phys. Rev. Lett.* 128, 040403 and 040402) compare real and complex tensor-product composition in networks with independent sources, see [Appendix D](appendix-d.md); they say nothing about a dictionary on a single system.
:::

The exchange sector has an exact place in configuration space. Two identical objects in $\mathbb{R}^d$, with the center of mass removed, are described by the relative vector $r\neq0$, with $r$ and $-r$ regarded as the same configuration.

::: {.remark #rem-appe-exchange-configuration-space title="The Exchange Loop Is Not Filled by Triangles: Configuration Space Leaves Only a Sign (Manual Derivation and Literature)"}
**Manual derivation.** Let $P_d=(\mathbb{R}^d\setminus\{0\})/\{r\sim-r\}$. The map $r\mapsto r/\lvert r\rvert$ is compatible with the antipodal map and deformation-retracts $P_d$ onto $S^{d-1}/\{\pm1\}=\mathbb{RP}^{d-1}$.

1. $d=1$: $P_1\cong(0,\infty)$ (take $\lvert r\rvert$), which is contractible; there is no exchange path without collision.
2. $d=2$: $\mathbb{RP}^1\cong S^1$ (angle doubling), with fundamental group $\mathbb{Z}$ generated by the half turn $\varphi\in[0,\pi]$; the one-dimensional unitary characters are $e^{i\alpha}$ with arbitrary $\alpha$.
3. $d\ge3$: $S^{d-1}$ is simply connected and the antipodal map has no fixed point, so $S^{d-1}\to\mathbb{RP}^{d-1}$ is the two-sheeted universal cover and the fundamental group is $\mathbb{Z}/2$. The exchange loop ($r$ moving along half a great circle to $-r$) lifts to a path that does not close, so it is the nontrivial element; doing it twice is a whole great circle, contractible in $S^{d-1}$. A one-dimensional unitary character satisfies $\chi^2=1$, so only $\pm1$ remain.

In the language of [@rem-appe-triangle-simple-connectivity] (`MODEL`): a $\mathrm{U}(1)$-valued comparison transported along paths is flat if it is trivial around every contractible loop; for $d\ge3$ the exchange loop is not contractible and is not filled by triangles, and flatness leaves its value $\pm1$ undetermined. This is the configuration-space form of "Clause I removes labels and does not choose a sector" ([@rem-appe-swap-sagitta]).

**Literature result.** That path-integral weights of identical particles form a one-dimensional representation of the fundamental group is due to Laidlaw–DeWitt (1971, *Phys. Rev. D* 3, 1375); arbitrary phases in two dimensions are due to Leinaas–Myrheim (1977, *Nuovo Cimento B* 37, 1). The fundamental group of $\mathbb{RP}^{d-1}$ is a standard covering-space computation. For three or more objects with $d\ge3$ the fundamental group is the symmetric group $S_N$, which also has higher-dimensional irreducible representations (parastatistics); this remark does not treat them.
:::

Can a construction select the sign? The following redoes a classical construction and shows at which step $(-1)^{2S}$ appears.

::: {.example #ex-appe-berry-robbins-transport title="A Transported Basis for Two Spins S: Where the Exchange Sign Appears (Manual Derivation and Numerical Check)"}
**Manual derivation.** Use Schwinger's representation: spin $S$ of object 1 uses $2S$ quanta in two oscillators $a_1,a_2$, and object 2 uses $2S$ quanta in $b_1,b_2$. On the space of $N=4S$ quanta in the four oscillators define the generators of the exchange $\mathrm{SU}(2)$:

$$
K_x=\frac12\sum_{i}\bigl(a_i^\dagger b_i+b_i^\dagger a_i\bigr),\qquad K_y=-\frac{i}{2}\sum_{i}\bigl(a_i^\dagger b_i-b_i^\dagger a_i\bigr),\qquad K_z=\frac12\sum_{i}\bigl(a_i^\dagger a_i-b_i^\dagger b_i\bigr).
$$

The physical two-spin space $\mathcal{P}$ is the part with $K_z=0$, of dimension $(2S+1)^2$. Let $E$ be the exchange $a_i\leftrightarrow b_i$, that is, the swap of the two spins.

1. **A rotation by $\pi$ is the swap times a number.** On each doublet $(a_i^\dagger,b_i^\dagger)$, $K_x$ acts as $\frac12\sigma_x$ and $e^{-i\pi\sigma_x/2}=-i\sigma_x$: every creation operator is swapped and multiplied by $-i$. So on $N$ quanta $e^{-i\pi K_x}=(-i)^NE$, and for $N=4S$ the number is $(-1)^{2S}$.
2. **Transported basis.** For $r=(\theta,\varphi)\in S^2$ put $n_\varphi=(-\sin\varphi,\cos\varphi,0)$, $U(r)=\exp(-i\theta\,n_\varphi\cdot K)$ and $\lvert M(r)\rangle=U(r)\lvert M\rangle$ for $\lvert M\rangle\in\mathcal{P}$. At $\theta=\pi$ the angle $\varphi$ is undetermined, but $U(r)\lvert M\rangle=e^{-i\gamma K_z}e^{-i\pi K_x}\lvert M\rangle$ with $\gamma=\varphi+\frac\pi2$, $e^{-i\pi K_x}\lvert M\rangle\in\mathcal{P}$, and rotations about $K_z$ act as the identity on $\mathcal{P}$; so $\lvert M(r)\rangle$ depends only on $r$.
3. **Exchange property.** $-r=(\pi-\theta,\varphi+\pi)$ and $n_{\varphi+\pi}=-n_\varphi$, so $U(r)^{-1}U(-r)=\exp(i\pi\,n_\varphi\cdot K)=e^{-i\gamma K_z}e^{i\pi K_x}e^{i\gamma K_z}$. On $\mathcal{P}$ both $K_z$ factors are the identity and $e^{i\pi K_x}=i^NE$, hence

   $$
   \lvert M(-r)\rangle=(-1)^{2S}\,\lvert EM(r)\rangle .
   $$

4. **Parallel transport.** $U^{-1}dU$ lies in $i\operatorname{span}\{K_x,K_y,K_z\}$; $K_x$ and $K_y$ change $K_z$ by $\pm1$, and $K_z$ vanishes on $\mathcal{P}$, so $\langle M'(r)\rvert d\lvert M(r)\rangle=0$.
5. **Single-valuedness gives the sign.** With $\Psi(r)=\sum_M\psi_M(r)\lvert M(r)\rangle$ and the requirement $\Psi(-r)=\Psi(r)$, one gets $\psi_{EM}(-r)=(-1)^{2S}\psi_M(r)$.

Two points need care. First, for $r\neq\pm\hat z$ the vectors $\lvert M(r)\rangle$ are in general not in $\mathcal{P}$: they live in the larger space of $4S$ quanta in four oscillators. Second, the factor $-i\sigma_x$ on each quantum squares to $-\mathbf{1}$, so it is a right-angle rotor, and the sign is the product of $4S$ such factors. It is not the half comparison $r(u)$ of [@rem-appe-half-comparison-holonomy]: $r(u)$ is defined only for similarity readings $s>-1$, and the similarity reading of $-\mathbf{1}$ is $-1$. The number $(-1)^{2S}$ equals the sign $e^{-2\pi iS_z}=(-1)^{2S}$ of a $2\pi$ rotation of one spin $S$; the construction does not derive this equality from anything else.

**Numerical check (`NUM`).** For $S=\frac12,1,\frac32$ ($N=2,4,6$): $\lVert e^{-i\pi K_x}-(-i)^NE\rVert_{\max}\le7\times10^{-16}$; on $200$ random directions the residual of item 3 is $\le1.3\times10^{-15}$, while the opposite sign leaves a residual $\ge0.9$; the central-difference residual of item 4 is $\le6\times10^{-10}$.
:::

::: {.remark #rem-appe-spin-statistics-inputs title="The Transported Basis Does Not Choose the Sign; Spin–Statistics Remains an Input (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** [@ex-appe-berry-robbins-transport] is the construction of Berry–Robbins (1997, *Proc. R. Soc. Lond. A* 453, 1771): the axis of the exchange rotation is $e_3\times r$, the rotation acts on the larger space of the Schwinger representation, and it gives the exchange rule $\lvert M(-r)\rangle=(-1)^{2S}\lvert EM(r)\rangle$ together with the parallel-transport condition (the comparison here relies on the account of Papadopoulos and Reyes-Lega 2010, *Found. Phys.* 40, 829). Berry and Robbins (2000, *J. Phys. A* 33, L207) describe constructions that meet all their earlier requirements but give the opposite exchange sign, for instance replacing commutators by anticommutators in the Schwinger representation, and suggest why these might be unacceptable. Redoing item 1 of [@ex-appe-berry-robbins-transport] with fermionic oscillators for $S=\frac12$ gives $e^{-i\pi K_x}a_i^\dagger b_j^\dagger\lvert0\rangle=+a_j^\dagger b_i^\dagger\lvert0\rangle$, so the exchange rule has sign $+1$ (`NUM`). The single-valuedness requirement $\Psi(-r)=\Psi(r)$ in the form advocated by Berry and Robbins has itself been questioned (Reyes-Lega 2011, *J. Phys. A* 44, 325308). The connection between spin and statistics comes from relativistic local quantum field theory: Fierz (1939), Pauli (1940, *Phys. Rev.* 58, 716), Lüders–Zumino (1958, *Phys. Rev.* 110, 1450), Burgoyne (1958, *Nuovo Cimento* 8, 607). The comparison axiom does not derive it.
:::

So the exchange input now has an exact shape: for $d\ge3$ the exchange loop can carry only $\pm1$, and flat comparison does not choose between them; the Schwinger transported basis writes the sign as a product of $4S$ right-angle rotors, while constructions of the same kind also give the opposite sign.

Last, the valuation. E.8.1 characterizes the elliptic row by "integer powers are bounded" ([@rem-appe-bounded-recurrence]); the Ostrowski bifurcation has a criterion of the same form.

::: {.remark #rem-appe-bounded-integers-ultrametric title="Bounded Integer Multiples Exactly When Ultrametric: A Two-Row Table of Valuations (Manual Derivation and Literature)"}
**Manual derivation.** Let $\lvert\cdot\rvert$ be an absolute value on a field $K$ (multiplicative, satisfying the triangle inequality, zero only at $0$). The following are equivalent:

1. $\{\lvert n\cdot1\rvert:n\in\mathbb{Z}\}$ is bounded;
2. $\lvert n\cdot1\rvert\le1$ for every integer $n$;
3. the strong triangle inequality $\lvert x+y\rvert\le\max(\lvert x\rvert,\lvert y\rvert)$ holds for all $x,y$.

Derivation: 3⇒2 by induction on $n$, $\lvert n+1\rvert\le\max(\lvert n\rvert,1)$, together with $\lvert-1\rvert=1$. 2⇒1 is clear. 1⇒2: $\lvert n\rvert^k=\lvert n^k\rvert$ is bounded in $k$, which forces $\lvert n\rvert\le1$. 2⇒3: by the binomial expansion and item 2, $\lvert x+y\rvert^k\le\sum_{j=0}^{k}\lvert\binom kj\rvert\,\lvert x\rvert^j\lvert y\rvert^{k-j}\le(k+1)\max(\lvert x\rvert,\lvert y\rvert)^k$; take $k$-th roots and let $k\to\infty$.

Under the strong triangle inequality, if $\lvert x\rvert>\lvert y\rvert$, then $\lvert x+y\rvert\le\lvert x\rvert$, and $\lvert x\rvert\le\max(\lvert x+y\rvert,\lvert y\rvert)$ forces $\lvert x\rvert\le\lvert x+y\rvert$, so $\lvert x+y\rvert=\lvert x\rvert$. Hence in a triangle with sides $x-y$, $y-z$, $x-z$ the two longest sides are equal.

| Absolute values of integers | Triangle inequality | Nontrivial absolute values on $\mathbb{Q}$ |
| :--- | :--- | :--- |
| bounded ($\le1$) | strong; every triangle is isosceles | equivalent to some $\lvert\cdot\rvert_p$ |
| unbounded | ordinary | equivalent to $\lvert\cdot\rvert_\infty$ |

What this shares with [@rem-appe-bounded-recurrence] is only the form of the criterion: there, the difference part of a comparison satisfies the positivity condition exactly when its integer powers are bounded; here, an absolute value is ultrametric exactly when, for every integer, the absolute values of its powers are bounded. Three things differ. Multiplicativity makes $\lvert n^k\rvert=\lvert n\rvert^k$ either bounded or exponentially growing, so nothing corresponds to the linear growth of the parabolic row. On $\mathbb{Q}$, in the unbounded row the positive integers grow like a power, $\lvert n\rvert=n^\alpha$ with $0<\alpha\le1$. And the bounded row gives $\mathbb{Q}_p$, while the elliptic rotations of E.8.1 and $\mathbb{C}$ sit over the unbounded, archimedean row. So the two tables share the criterion, not an object.

**Literature result.** The equivalence 1⇔2⇔3 is classical; its part 2⇔3 (with $n$ ranging over the natural numbers) is `isUltrametricDist_iff_forall_norm_natCast_le_one` in Mathlib, for normed division rings (not frozen in the upstream library). The last column of the table comes from the frozen theorem [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification) ([@thm-ch36-ostrowski-padic-ball-and-blind-spot]; Ostrowski 1916, *Acta Math.* 41, 271): a nontrivial absolute value on $\mathbb{Q}$ is equivalent to $\lvert\cdot\rvert_\infty$ or to exactly one $\lvert\cdot\rvert_p$; the former is unbounded on the integers, the latter is at most $1$ there, and equivalence preserves boundedness. The form $\lvert n\rvert=n^\alpha$ of the unbounded row is the classical statement of the same classification. The standard absolute values of both rows satisfy the product formula $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p=1$ ($x\in\mathbb{Q}$, $x\neq0$), the frozen theorem [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) ([@thm-ch36-crt-and-adelic-product-formula]).
:::

None of the three reduces the number of inputs: real and quaternionic matrix algebras satisfy Clauses I–IV and the positivity condition without a dictionary; both characters of the exchange loop are compatible with flatness; both rows of valuations are given by the frozen classification, and the clauses on comparison do not choose between them.

## E.8.14 What Changes in the Ledger {#sec-appe-reduced-ledger}

::: {.remark #rem-appe-reduced-ledger title="The Ledger after E.8 (Supplement to [@rem-appe-master-audit-table])"}
**Supplementary audit (`MODEL` + `manual derivation`; the theorem boxes correspond to frozen theorems).** The table lists only the entries that change. For `H1` the processing mechanism is that of [@rem-appe-master-audit-table].

| Entry | Original treatment | Treatment in E.8 | Basis |
| :--- | :--- | :--- | :--- |
| `H2` positive self-pairing | explicit Layer-1 calibration | follows from Clause IV | [@rem-appe-anchoring-consequences], item 1 |
| `H2` elliptic negative square | `T3` bifurcation | follows from the positivity condition when the similarity readings are real scalars; in that case the positivity condition for the difference part of each comparison is equivalent to boundedness of its integer powers; fails otherwise; when readings are given by states (on a real algebra, states compatible with the involution) and at least one state exists, the positivity condition is equivalent to the absence of nonzero elements of square zero, and this part (which excludes the parabolic branch) cannot be derived from any condition on readings by states | [@rem-appe-involution-positivity], [@rem-appe-bounded-recurrence], [@rem-appe-positivity-invisible-part] |
| `H2` Gram positivity for any number of points | explicit Layer-1 condition | follows from Clause IV plus a positive functional, with the converse; for scalar similarity it follows from Clause IV plus the positivity condition; for scalar similarity with an opposite for every object it is equivalent to every ensemble having a nonnegative averaged similarity with itself, and without opposites this is not enough; an explicit lower bound away from flatness | [@thm-appe-chordal-gain-potential], [@rem-appe-gram-from-flatness], [@rem-appe-ensemble-positivity], [@rem-appe-near-flat-gram-bound] |
| `H3` parallelogram polarization | `T2` condition | the chord distance comes from the GNS inner product of a positive functional, so the input "inner product" becomes "positive reading"; completion remains `T1` | [@rem-appe-gram-from-flatness], item 2 |
| `H4` the orthogonal residual never runs dry | `T2/T4` input | for one time-homogeneous object: the rank of the sampled table equals the number of levels the sampling sees, and the residual never runs dry exactly when infinitely many levels are seen; an orbit with finitely many levels comes back, a ray sagitta that stays above a threshold throughout a finite window bounds the dimension from below, and one that stays away from zero after some time implies that the orbit space is infinite-dimensional; still an input | [@thm-appe-prony-hankel-rank], [@rem-appe-orbit-rank-and-recurrence] |
| `H4` complex carrier $R^2=-I$ | `T3` parity of the carrier dimension | if the center contains $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$, then on every unital $*$-representation the image of $J$ is skew, squares to $-I$ and commutes with everything, and the carrier has even real dimension; the central complex structure itself remains an input (see `H7`) | [@rem-appe-dictionary-independence], item 3 |
| `H4` Ostrowski choice of valuation | `T3` bifurcation | a two-row criterion: an absolute value is bounded on the integers exactly when it satisfies the strong triangle inequality (then every triangle is isosceles); on $\mathbb{Q}$, by the frozen classification, the bounded row is equivalent to some $\lvert\cdot\rvert_p$ and the unbounded row to $\lvert\cdot\rvert_\infty$; same form as the boundedness criterion of E.8.1, but with no third row corresponding to the parabolic one, and the bounded row is not the row of the elliptic rotations; which row is chosen remains an input | [@rem-appe-bounded-integers-ultrametric], [@thm-ch36-ostrowski-padic-ball-and-blind-spot] |
| `H5` Born weight | `T2` additivity condition | only for rules that depend on pairwise comparison alone: for $d\ge3$, boundedness, normalization on every orthonormal basis and $f(1)=1$ already give the Born rule; for $d=2$ and continuous rules, full effect additivity can be replaced by "antipodal normalization, $f(1)=1$ and minimal tomographic rank", or, without continuity, by ensemble extensionality (read as Clause I applied to ensembles under `MODEL`); still a `T2` input | [@rem-appe-born-zonal-minimal-rank], [@rem-appe-ensemble-extensionality-born] |
| `H8` Lorentz signature | `T3` bifurcation | uses the same three-way table as `H2` but selects another row for comparisons between observers: in the $1+1$-dimensional observer model (with linearity of coordinate changes as an input), Clause III, antisymmetric velocity readings and one law give a family with one constant $K$ whose sign is the row of the sagitta table; the time-order condition (repeating the same comparison never reverses the order in time) excludes the elliptic row, and "the difference part is not square-zero" then excludes the parabolic row; for a single comparison the positivity condition and the time-order condition cannot both hold; the step from null cone to quadratic form is carried by a frozen proposition | [@rem-appe-frame-change-family], [@rem-appe-time-order-repetition], [@prop-appe-chebyshev-positivity-threshold], [@rem-appe-rotor-boost-coexistence], [@rem-appe-causal-order-linearity], [@prop-null-cone-rigidity] |
| `H8` projective holonomy of Layer 1 | native to Layer 1 | closed form in $\mathcal{Cl}_{3,0}$ as the three-point holonomy of the half comparison; in the Pauli-matrix model the product formula and the return phase are frozen | [@rem-appe-half-comparison-holonomy], [@thm-appe-bloch-triangle-return-phase] |
| `H8` entropy gain under unit-preserving pinching | `T2` condition | the purity drops by exactly the discarded coherence mass $c$; the entropy gain equals a relative entropy, and $\Delta S\ge\frac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ge c$; the exact range of $\Delta S$ at fixed $c$ on a qubit; the known general upper bounds are of the order of $\sqrt{c}$ (the $\ell_1$ bound for rank-one basis pinching is frozen), and no upper bound linear in $c$ exists; "coarse-graining is a unit-preserving pinching" remains an input | [@rem-appe-pinching-exact-identities], [@rem-appe-pinching-entropy-lower], [@prop-appe-l1-coherence-bound], [@rem-appe-pinching-entropy-upper] |
| `H6` two-sided invertibility | `T2` condition | the defect of one-sided fairness is a projection, and the unilateral shift as a comparison value violates Clause III; it can nevertheless arise as the induced evolution in a model satisfying Clauses I–IV and the positivity condition, even when the algebra carries a faithful trace; past completeness or a finite-dimensional state space is each sufficient | [@rem-appe-one-sided-fairness], [@ex-appe-bilateral-shift-model] |
| `H6` strong continuity | `T2` condition | for a time-homogeneous family, equivalent to continuity of the sagitta reading at zero; measurability alone is not enough; in finite dimension this connects with [@thm-calibrated-unitary-group] | [@rem-appe-sagitta-continuity] |
| `H6` generator | `T4` input $H$ | the chord rate tends to $-iH$ and the sagitta rate to $H^2/2$, with explicit errors; finite-step speed bounds; on the space spanned by an orbit, the record of the orbit in both channels determines $H$ up to unitary equivalence, while similarity readings alone or Born weights alone do not (two-level and three-level counterexamples); the choice of orbit and the action of $H$ outside it remain inputs | [@rem-appe-generator-chord-sagitta], [@rem-appe-orbit-record-channels] |
| `H6` Lüders conditioning | `T2` condition | the Lüders state is the state of largest fidelity among those certain to pass the test, and it is unique; the trace norm and the Hilbert–Schmidt distance among trace-one states do not give the Lüders state; the reading used remains an input | [@rem-appe-luders-nearest] |
| `H7` local tomography and exchange statistics | `T2` + `T3` | parameter count $K_d(ab)-K_d(a)K_d(b)=\frac{d(2-d)}4a(a-1)b(b-1)$; the swap is a fair involution with sagitta $0$ and $2$, and Clause I removes labels without choosing a sector; whether a given family of objects needs complex amplitudes, keeping its Gram matrix up to phases: when comparable triangles fill every cycle, exactly when some three-point Bargmann product is not real (frozen when one object is non-orthogonal to every other one), and on a qubit exactly when the Bloch vectors do not lie in one plane through the center; in finite direct sums of $M_n(\mathbb{R})$, $M_n(\mathbb{C})$ and $M_n(\mathbb{H})$ a central complex structure is equivalent to a covariant generator–reading dictionary (a real-linear bijection from difference parts to similarity parts that commutes with changes of frame by fair elements), which does not follow from Clauses I–IV and the positivity condition; for $d\ge3$ the exchange loop admits only the two characters $\pm1$, flat comparison does not choose between them, and the Schwinger transported basis writes the sign as a product of $4S$ right-angle rotors, while constructions of the same kind also give the opposite sign; the central complex structure and the choice of sector remain inputs | [@rem-appe-tomography-count], [@rem-appe-swap-sagitta], [@rem-appe-real-realizability-return-phase], [@prop-appe-real-rephasing-star], [@rem-appe-generator-reading-dictionary], [@rem-appe-dictionary-independence], [@rem-appe-exchange-configuration-space], [@ex-appe-berry-robbins-transport], [@rem-appe-spin-statistics-inputs] |
| `H9` continuum path integral and stationary action | `T4` input | for a quadratic action the $N$-step sliced product equals the contribution of the stationary path exactly at every finite $N$ (prefactor and Maslov phase included); for the oscillator the error is an explicit $O(N^{-2})$, and the time step has to lie in the elliptic row of the sagitta table; for general actions only explicit one-dimensional cancellation bounds remain; at fixed $\hbar$ the continuum limit at the level of operators is given by the Trotter–Nelson theorem and needs no path measure (no such complex measure of bounded variation exists); convergence of time slicing and stationary phase in large dimension for non-quadratic potentials are literature results; interacting field theory remains `OPEN` | [@rem-appe-oscillator-time-slicing], [@ex-appe-time-step-trichotomy], [@rem-appe-oscillatory-cancellation-bounds], [@rem-appe-path-integral-remaining-inputs] |

The two new inputs are Clause IV ([@def-appe-third-point-redundancy]) and the positivity condition ([@rem-appe-involution-positivity]); when readings are given by states and at least one state exists, the latter is equivalent to the absence of nonzero elements of square zero, and this part is invisible to every reading by a state ([@rem-appe-positivity-invisible-part]); when the similarity readings are not real scalars, positive semidefiniteness of the table needs a positive functional in addition. Clause IV need not hold for all triples: it is enough that comparable triangles fill every cycle, and over all groups this is exactly the condition that is enough ([@rem-appe-triangle-simple-connectivity]). Clause IV excludes every holonomy of full comparisons, so it describes the flat skeleton of Layer 1. A Layer-2 connection with genuine curvature has to give it up, and then [@thm-appe-chordal-gain-potential-stability] and [@rem-appe-near-flat-gram-bound] state the price of the deviation.

E.8.6 and E.8.7 add no clause: each of the invertibility and continuity items of `H6` gets a sufficient condition stated in terms of objects and readings (past completeness; continuity of the sagitta reading at zero), conditioning is recast as an optimization principle, and `H7` gets a one-line counting formula; these conditions remain inputs.

E.8.8 and E.8.9 add no clause either. E.8.8 applies comparison to ensembles: to obtain a positive semidefinite table, the positivity condition can be replaced by "every object has an opposite, and every ensemble has a nonnegative averaged similarity with itself", which still allows only parabolic pairs invisible to every similarity reading; the qubit Born rule follows from ensemble extensionality. E.8.9 reads the orbit of one object: `H4` gets a form in terms of readings that can be checked in finitely many steps, and on the orbit space the $H$ of `H6` can be read from the record in both channels.

E.8.10–E.8.12 add two inputs for comparisons between observers: the time-order condition, and "the difference part is not square-zero" (the special case, for difference parts, of the condition in [@rem-appe-positivity-invisible-part]); in $1+1$ dimensions the linearity of coordinate changes also remains an input. For a single comparison the positivity condition and the time-order condition cannot both hold, and this separates `H2` from `H8`: they select different rows of one table for different comparisons. E.8.11 does not change the input "coarse-graining is a unit-preserving pinching"; it quantifies its consequences. E.8.12 narrows the path-integral item of `H9`: quadratic actions are exact at a finite number of steps, general actions have only asymptotic statements, and the existence of the continuum limit at the level of operators is a literature result.

E.8.13 adds no clause. The central complex structure of `H7` becomes a covariant dictionary condition: every difference part is paired with a similarity reading, linearly, invertibly and independently of the frame; in finite direct sums of $M_n(\mathbb{R})$, $M_n(\mathbb{C})$ and $M_n(\mathbb{H})$ it is equivalent to a central complex structure and gives the complex carrier of `H4`, and real and quaternionic matrix algebras satisfy Clauses I–IV and the positivity condition without it. The exchange sector becomes a character of the fundamental group of configuration space, which for $d\ge3$ is $\pm1$. The choice of valuation in `H4` becomes "are integer multiples bounded". All three remain inputs.
:::

This section does not bring the number of inputs down to zero. It changes their shape: when the similarity readings are real scalars, the three items of `H2` were three geometric statements about self-pairing, bivectors and Gram matrices, and they are now replaced by two conditions that can be stated with comparison alone. One says that a third party does not change the ratio of two. The other says that the round trip of a difference leaves a positive trace.
