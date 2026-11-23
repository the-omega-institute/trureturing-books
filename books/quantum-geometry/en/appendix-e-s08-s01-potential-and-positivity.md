# E.8.1 Comparison potentials, Gram positivity, and curvature {#sec-appendix-e-s08-s01-potential-and-positivity}

## E.8.1.1 One Pair: Chord and Sagitta Are Already Locked at Layer 0 {#sec-appe-chord-sagitta-layer0}

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

Those two branches are not pathological models. Regard the $2\times2$ complex matrices as a real algebra and take the classical adjugate $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$ as the involution. Then $aa^\sharp=\det(a)\mathbf{1}$, the elements with $uu^\sharp=\mathbf{1}$ are exactly $\mathrm{SL}(2,\mathbb{C})$, the similarity part $S=\frac12\operatorname{tr}(u)\mathbf{1}$ of every such $u$ is automatically a central scalar, and the sagitta $v=1-\frac12\operatorname{tr}u$ is a complex number (`manual derivation`). The classical classification of Möbius transformations by their trace (`Literature`) reads as follows in terms of the sagitta: for $u\neq\pm\mathbf{1}$, the class is elliptic when $v\in(0,2)$, parabolic when $v\in\{0,2\}$, hyperbolic for every other real $v$, and loxodromic when $v\notin\mathbb{R}$. The generators of countermodel (b) all live here: $\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $j\mapsto\operatorname{diag}(1,-1)$, and the elliptic generator $\mapsto\operatorname{diag}(i,-i)$. All three satisfy $g^\sharp=-g$, and their squares are $0$, $+\mathbf{1}$ and $-\mathbf{1}$. The frozen theorem [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) gives the traces, determinants and squares of the hyperbolic form $\operatorname{diag}(\delta,-\delta)$ and the elliptic form $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ among real $2\times2$ traceless generators; its middle case is the zero matrix, so the nonzero nilpotent parabolic generator is not covered by that theorem. This algebra carries no normalized functional with $\varphi(a^\sharp a)\ge0$ (for $a=\operatorname{diag}(1,-1)$ one has $a^\sharp a=-\mathbf{1}$), so the reading argument of E.8.1.3 does not apply to it.

$\mathrm{SL}(2,\mathbb{C})$ acts on Hermitian matrices $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ by $X\mapsto uXu^\dagger$ and preserves $\det X=t^2-\lvert\mathbf{x}\rvert^2$; this is the spinor covering of the Lorentz group (`Literature`). The theorem [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), already cited in E.6, says that the null cone fixes the quadratic form up to one scalar. If fairness is also required for the Hermitian adjoint ($uu^\dagger=\mathbf{1}$), what remains is $\mathrm{SU}(2)$, which contains only elliptic classes. This gives one reading that covers both `H2` and `H8` (`MODEL`): **the parabolic and hyperbolic branches left open at Layer 0 are the null rotations and boosts of Lorentz transformations; choosing the elliptic signature and choosing the Lorentz signature are the two answers to one question, whether the involution of a single algebra is required to be positive.**

E.8.3.2 works this reading out ([@rem-appe-rotor-boost-coexistence]). Taking the positivity condition selects the elliptic row. Merely dropping it does not select the Lorentz signature: the time-order condition and "the difference part is not square-zero" are needed as well, and for a single comparison $u\neq\mathbf{1}$ the positivity condition and the time-order condition cannot both hold. So "taking or dropping" means choosing different rows of one three-way table for different comparisons.

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

## E.8.1.2 Third-Point Redundancy: the Potential Representation and Its Stability {#sec-appe-gain-potential}

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

The unitary group of a $C^*$-algebra with the operator-norm distance satisfies the isometry hypothesis, so the preceding bound applies to nearly flat comparisons. Breadth-first layers give a bound independent of the number of points.

::: {.theorem #thm-appe-chordal-uniform-gain-potential title="A Uniform $4\varepsilon$ Bound for Gain Potentials on Finite Chordal Graphs" lean="D5/S3/Combinatorics/Graph/Chordal/UniformGainPotential.SimpleGraph.IsChordal.exists_uniform_approximate_gain_potential"}
Let $G$ be a simple chordal graph on a finite vertex set $V$. Let $H$ be a group with a pseudometric $d$ satisfying $d(ax,ay)=d(x,y)=d(xa,ya)$ for all $a,x,y\in H$. Given a real number $\varepsilon\ge0$ and a map $g:V\times V\to H$, suppose that every oriented edge $(i,j)$ satisfies $g(j,i)=g(i,j)^{-1}$ and that every ordered triple of pairwise adjacent vertices $i,j,k$ satisfies $d(g(i,j)g(j,k),g(i,k))\le\varepsilon$.

Then there is a potential $\varphi:V\to H$ such that every oriented edge $(i,j)$ satisfies

$$
d\bigl(g(i,j),\varphi(i)^{-1}\varphi(j)\bigr)\le 4\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-uniform-gain-potential}
Choose a root $o$ in each connected component and layer its vertices by distance from $o$. For a component $C$ of the induced subgraph on layers at least $i\ge1$, its shadow $S_C$ consists of its neighbors in layer $i-1$. A shortest path toward the root shows that the shadow is nonempty. Two nonadjacent shadow vertices could be joined by one shortest path through $C$ and another through the lower layers. Both paths are induced, and their interiors differ in level by at least $2$, so there is no edge between the interiors. Their union would contradict chordality. Thus $S_C$ is a clique, and for $i=1$ it consists of the root alone.

For $i\ge2$, let $P$ be the component containing $C$ when the preceding layer is included. The predecessors of each vertex in $S_C$ form a nonempty subset of $S_P$ in layer $i-2$. If two such sets were incomparable, a predecessor exclusive to each set and the two corresponding shadow vertices would form a chordless quadrilateral. The predecessor sets are therefore nested. An anchor $a_C$ in the smallest set is adjacent to all of $S_C$.

Set $\gamma(v,v)=1$ and $\gamma(u,v)=g(u,v)$ on edges. Triangle comparisons with repeated vertices have error $0$ by the reversal rule. Take $\varphi(o)=1$. For components at depth $1$, set $a_C=o$ and $Q_C=1$. At greater depths, set $Q_C=Q_P\gamma(a_P,a_C)$. For a vertex $v\in C$ in layer $i$, choose a predecessor $b_v\in S_C$ and set $\varphi(v)=Q_C\gamma(a_C,b_v)\gamma(b_v,v)$.

Edges incident to the root are fitted exactly. Adjacent vertices $u,v$ in the same layer share a component, so the common prefix $Q_C$ cancels from their error comparison. If $b_u=b_v$, one triangle suffices. Otherwise $b_u,u,v,b_v$ form a quadrilateral, and a chord $b_uv$ or $ub_v$ lets us compare the two gain paths using at most three triangles, for an error of at most $3\varepsilon$. For an edge $uv$ from layer $i-1$ to layer $i$ with $i\ge2$, use $Q_C\gamma(a_C,u)$ as an intermediate value. On the parent-shadow side, compare the paths to $u$ via $b_u$ and via $a_C$. Then compare the paths from $a_C$ to $v$ via $u$ and via $b_v$. Each comparison uses two triangles. Left and right multiplication preserve the errors, so the total is at most $4\varepsilon$. Adjacent layers differ by at most $1$, and inversion preserves distance, which covers both orientations of every edge. The full proof is checked by the Lean kernel.
:::

**Closed-walk defects (`manual derivation`).** Write $g_{uv}=g(u,v)$ and use a bi-invariant metric. A chord splits a simple cycle of length $\ell$ into a product $(pc^{-1})(cq)$, where $p,q$ are the path gains and $c$ is the chord gain. The two shorter lengths sum to $\ell+2$. Induction from triangles bounds the distance of the cycle gain from $1$ by $(\ell-2)\varepsilon$. For a closed walk, erase backtracks and split at repeated vertices to get $(\ell-2)_+\varepsilon$, since the sum of the positive-part factors for the pieces is at most the original factor. The empty path has gain $1$, so the bound also compares paths with common endpoints. Rooted tree paths fit forests exactly, and at $\varepsilon=0$ the closed-walk bound gives exact path independence.

**Constants for small graphs and counterexamples (`manual derivation`).** For a graph $(V,E)$ with gains in a bi-invariant metric group $H$, define the reconstruction error as $\inf_{\phi:V\to H}\max_{uv\in E}d(g_{uv},\phi_u^{-1}\phi_v)$. The infimum need not be attained in a general metric group. Set the maximum over an empty edge or cycle set to $0$. Let $C(n)$ be the supremum of the reconstruction error divided by $\varepsilon$ over $n$-vertex chordal graphs, bi-invariant metric groups and gains of triangle defect at most $\varepsilon>0$. A clique-tree argument gives the small-order bounds. The nodes of a clique tree are maximal cliques, and those containing any fixed vertex form a subtree. Construct such a tree by simplicial elimination and reinsertion. If the reinserted vertex's neighbor clique is maximal, enlarge it. Otherwise attach the new clique to one containing the neighbors. A star with anchor $a$ and $\phi_x=\phi_a g_{ax}$ fits its clique to $\varepsilon$. When extending to a child clique, an anchor in the separator keeps errors between new vertices within $\varepsilon$, and errors from the separator to new vertices increase the old bound by at most $\varepsilon$. A singleton separator preserves the bound. For a separator $\{a,b\}$, set $\phi_x=\phi_b g_{ba}g_{ax}$. The error on $ax$ equals the old error on $ab$, while $bx$ and the new-to-new edges are within $\varepsilon$ by the triangle condition.

Contract the clique-tree edges whose intersections have at most $2$ vertices, and let $D$ be the diameter of the resulting tree. Start with a star in a clique of the central node, or with one common anchor in the two cliques across the central edge. The maximum error is at most $(1+\lfloor D/2\rfloor)\varepsilon$. For $D>0$, lift a diameter path to the original tree. The first clique has at least $4$ vertices and each edge introduces at least one new vertex, so $n\ge4+D$. Equality forces all cliques onto the path, each with $4$ vertices and successive intersections of size three. For even $D\ge2$ the two central intersections share an anchor for the middle three cliques. For odd $D\ge3$ each neighboring intersection misses at most one of the three vertices of the central intersection, giving a common anchor for the middle four cliques. Either start saves one surviving edge. Together with $D=0,1$ this gives the upper bound $\max\{1,\lfloor(n-3)/2\rfloor\}$. At $n=7$ the remaining case is $D=2$. If two distinct cliques in the central contracted node had outgoing surviving edges, each would have at least $4$ vertices. Their intersection would have at most $2$ vertices, and each outside branch would add a distinct new vertex, requiring at least $8$. Thus the surviving edges all leave one clique $K$. With two such edges, $|K|\le5$ and the two intersections of size at least three share an anchor. With three, $|K|=4$ and each intersection omits at most one vertex, again leaving a common anchor. All further extensions are along contracted edges, giving the bound $1$ at this order.

An integer-valued triangle with total gain $1$ forces some integer edge error to reach $1$. For the $8$-vertex lower bound, add to each three-vertex face $S$ of $K_4$ a vertex $x_S$ adjacent exactly to $S$. This graph is chordal. Take the integral cycle lattice with norm given by the shortest integer decomposition into oriented triangle boundaries. For rooted tree chains $p_i$, set $g_{ij}=p_i+[ij]-p_j$. The triangle sums are the oriented boundaries $t_{ijk}$, of norm $1$. If a potential has error at most $1$, each directed residual $R_{ij}=g_{ij}-(\phi_j-\phi_i)$ is zero or an oriented triangle boundary and has the same triangle sums. Fix $S$, set $x=x_S$, and project onto the coordinates of $[xa]$ for $a\in S$. A nonzero projection is $e_a-e_b$ and uniquely determines the residual $t_{xab}$. If all edge residuals on $S$ project to zero, $R_{xa}+R_{ab}-R_{xb}=t_{xab}$ gives projection $e_a+p$ for $R_{xa}$, with a common integer vector $p$ of coordinate sum $-1$. Every coordinate is nonpositive, since a positive coordinate would give some $e_a+p$ a coordinate greater than $1$. The sum $-1$ then forces $p=-e_j$. For the other two vertices $a,b$ this yields $R_{ab}=t_{xab}-t_{xaj}+t_{xbj}=t_{jab}$. Thus $ab$ has the face boundary as its residual, and the other two edges cancel in the oriented face sum. Different faces require different edges of this kind.

If all core edges project to zero at every added vertex, select one such edge per face. Each face contains at most two selected edges, since the other two residuals cancel and distinct selected edges have distinct labels. Each selected edge belongs to two faces, so by counting incidences every face contains exactly two selected edges. The two faces bordering any unselected edge each require its label to match their other selected edge up to orientation. Those selected edges are distinct, since the faces share just one edge, so these requirements conflict. If an added vertex has a nonzero projection on the core, the projected core residuals are differences of four vertex values because their triangle sums vanish. They occupy at least three core edges. Different added vertices occupy disjoint edges, since a residual contains at most one triangle boundary. Two added vertices would occupy all six edges, leaving none to select for the other faces. Thus there is just one such vertex, occupying exactly three edges since the other three faces each require an edge. Three of the four vertex values coincide, with the outlier at $v$. The three residuals directed from $v$ have the same nonzero projection and hence coincide. The core triangle sums give $R_{ab}=t_{vab}$ for $a,b\ne v$. The opposite face has no edge to select, so its added vertex must be the one with nonzero projection on the core. Yet its face edges project to zero at that vertex and therefore force a selected edge. This contradiction rules out error $1$, and the integer norm gives the lower bound $2$.

For a fixed graph, normalize the spanning tree gains to $1$ and take the free group on non-tree edges. Conjugates of the triangle words and their inverses generate it, since chord splitting expresses fundamental closed walks as products of such conjugates. The shortest length in these factors defines a bi-invariant integer norm. The optimum error in the free instance is an attained integer. Every other normalized instance is a homomorphic image, with each element of norm $s$ mapping within $s\varepsilon$ of $1$. Hence the universal coefficient for the graph equals the free optimum. Maximizing over finitely many $n$-vertex graphs gives an integer, and adding isolated vertices preserves lower bounds. Combining the two upper bounds with the small-order lower bounds gives

$$
\begin{aligned}
C(0)&=C(1)=C(2)=0,\\
C(3)&=\cdots=C(7)=1,\qquad C(8)=2,\\
2&\le C(n)\le\min\{4,\lfloor(n-3)/2\rfloor\}\qquad(n\ge9).
\end{aligned}
$$

A bounded nondecreasing integer sequence is eventually constant, here with value in $\{2,3,4\}$.

**Real scalar and Banach targets.** For $n\ge3$ and real gains the minimum uniform error equals the largest absolute mean gain around an oriented simple cycle. Telescoping potentials gives the lower bound. Conversely, if those means are at most $r$, weight each oriented edge by $g_{uv}+r$. Both orientations satisfy the cycle bound and backtracks have weight $2r$, so there are no negative cycles. Take shortest-path distances from an added zero-weight source as potentials. The shortest-path inequalities in both orientations give error at most $r$. Chord splitting fills a length-$\ell$ cycle by $\ell-2$ triangles, so the bound is $(n-2)\varepsilon/n$. A fan with zero spokes and gain $\varepsilon$ along the ordered rim path attains it on the outer cycle of length $n$. Extend the example to $K_n$ by giving every increasing non-spoke edge the same gain. For a real Banach target on $K_n$, average the $n$ stars $g_{av}$ with $g_{aa}=0$. On any edge the two endpoint stars fit exactly and every other star has error at most $\varepsilon$, so the mean gives the same sharp constant $(n-2)/n$.

::: {.theorem #thm-appe-chordal-path-power-two title="The $2\varepsilon$ Reconstruction Bound for Path Powers and the Universal Chordal Lower Bound of $2$" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_isChordal, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_exists_two_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_three_banach_and_integral_lower_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_three_exact_two, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.not_subtwo_universal_chordal"}
For $n,k\in\mathbb N$, let $P_n^k$ be the path power on $\mathrm{Fin}(n)=\{i\in\mathbb N:i<n\}$, with $i$ and $j$ adjacent exactly when $i\ne j$ and $|i-j|\le k$.

1. **Chordality and the uniform bound.** Every $P_n^k$ is chordal. Suppose $k\ge1$. For any group $H$ with a bi-invariant pseudometric, any $\varepsilon\ge0$, and any gains $g$ satisfying edge reversal and triangle defect at most $\varepsilon$ as in [@thm-appe-chordal-uniform-gain-potential], there is a potential $\varphi:\mathrm{Fin}(n)\to H$ with error $d(g(i,j),\varphi(i)^{-1}\varphi(j))$ at most $2\varepsilon$ on every directed edge $(i,j)$.

2. **Two lower bounds on $P_{12}^3$.** The graph has $30$ edges, of which $19$ lie outside the lexicographic greedy spanning tree, and $28$ triangles. Use those $19$ edge coordinates to represent the real cycle space and the integral cycle lattice $Z_1(P_{12}^3;\mathbb Z)\cong\mathbb Z^{19}$. Take the gain on each increasing edge to be its projection to the non-tree coordinates (zero on tree edges). Equip the real cycle space with the triangle-filling norm, the infimum of the sum of absolute coefficients in a filling by oriented triangle boundaries. This is a real Banach space. On the integral lattice, minimize the filling length over integer coefficients and use the resulting integer-valued norm to define the metric. Write the integral group multiplicatively, with its bi-invariant metric. Reversing an edge negates the real gain and inverts the integral gain, and both assignments have defect at most $1$ on every ordered triangle. For every potential valued in the real cycle space $\varphi$, some directed edge $(i,j)$ has error $d(g(i,j),\varphi(j)-\varphi(i))$ at least $49/48$. For every potential in the integral cycle lattice, some directed edge has error $d(g(i,j),\varphi(i)^{-1}\varphi(j))$ at least $2$.

3. **Exact coefficient in width $3$.** For $n\ge12$, pull back the integral gains along $i\mapsto\min(i,11)$, using the identity where the image endpoints coincide. These gains invert under edge reversal and have triangle defect at most $1$. Every potential has error at least $2$ on some directed edge, and there is a potential with error at most $2$ on every directed edge.

4. **Universal lower bound.** There is no real $C<2$ such that for every finite chordal graph, every group with a bi-invariant pseudometric, every $\varepsilon\ge0$, and every gain assignment satisfying edge reversal and triangle defect at most $\varepsilon$, there is a potential with error at most $C\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-path-power-two}
In increasing vertex order, all later neighbors of a vertex lie within the next $k$ positions and thus form a clique. For $k\ge1$, partition the vertices into consecutive blocks of size $k$, allowing a shorter last block. Join successive block heads and attach each remaining vertex to its own head. On a nonempty graph these edges form a spanning tree. Multiplying gains along the tree from the first head defines the potential. An edge within a block needs one triangle comparison through its head. For a cross-block edge $i<j$, the blocks are consecutive, and their heads $b,c$ satisfy $i<c\le j$. The chord $ic$ splits the comparison of the tree path $i,b,c,j$ with the edge $ij$ into the triangle comparisons $(b,i,c)$ and $(i,c,j)$. When vertices coincide, use the identity on the diagonal and the comparison has zero error. Left and right multiplication and inversion preserve distances, giving the $2\varepsilon$ bound in both directions. The empty graph needs no root.

On $P_{12}^3$, the $19$ non-tree coordinates determine a cycle because a tree supports no nonzero circulation. Each non-tree edge together with the tree path closing it gives a coordinate basis vector. Splitting that cycle along chords writes it as an integral sum of oriented triangle boundaries, so both real and integral cycles admit triangle fillings. If $p_i$ is the oriented tree chain from the root to $i$, the gain on $ij$ is the projection of the cycle $p_i+[ij]-p_j$ to the non-tree coordinates. Around a triangle the tree chains cancel, leaving its oriented boundary, which has a filling of length $1$. Changing the signs of all coefficients preserves filling length, adding fillings gives the triangle inequality, and every non-tree coordinate is bounded in absolute value by filling length. Thus the norm vanishes only at the zero cycle. Rescaling real fillings gives homogeneity, and finite dimensionality gives completeness.

The dual certificate bounds the residuals using three paths with common endpoints. Define two linear functionals $F,G$ on the cycle space by assigning both weights zero on the tree edges. Group the lexicographically ordered non-tree edges in sets of $3$, allowing a shorter last group. In group $k$, counting from $k=1$, take the successive weight pairs to be $(-1)^{k+1}k$ times $(8,-7),(8,-1),(0,7)$. Sum the weights along edges to evaluate $F,G$. The table gives their values on the oriented triangle boundaries $t_{i,i+a,i+a+b}$, starting at $i=0$ and taking $9$ entries in each repeating row.

| $(a,b)$ | Values of $(F,G)$ |
| --- | --- |
| $(1,1)$ | $(8,-7)$, $(0,1)$, $(0,-5)$, $(8,-5)$, $(0,3)$, $(0,-3)$, $(8,-3)$, $(0,5)$, $(0,-1)$, $(8,-1)$ |
| $(1,2)$ | Repeat $(8,-1)$, $(-8,7)$, $(0,-7)$ |
| $(2,1)$ | Repeat $(0,7)$, $(-8,1)$, $(8,-7)$ |

The absolute bounds on each triangle boundary extend to every filling. Taking the infimum of filling lengths gives dual norm bounds of $8,7,7$ for $F,G,F+G$, respectively. Let $A,B,C$ be the chains of the directed paths $(0,1,4,7,10,11)$, $(0,2,5,8,11)$ and $(0,3,6,9,11)$, respectively. Summing the edge weights gives $F(A-C)=56$ and $G(B-C)=42$. For any potential, the residual on $ij$ is $R_{ij}=g(i,j)-(\varphi(j)-\varphi(i))$. Let $R(A),R(B),R(C)$ be the sums of these residuals along the paths. The paths have the same endpoints, so both potential differences and rooted tree chains cancel when subtracting the sums. If each edge error is at most $r$, then

$$
\begin{aligned}
98&=F(R(A))+G(R(B))-(F+G)(R(C))\\
  &\le (5\cdot8+4\cdot7+4\cdot7)r=96r.
\end{aligned}
$$

Thus some edge has real error at least $49/48$. Regard the coordinates of an integral potential as real to apply the same certificate. Every integral filling is also a real filling, so the integral error on that edge is at least the corresponding real error. The integral error is an integer and $49/48>1$, so it is at least $2$.

Finally, the map $i\mapsto\min(i,11)$ does not increase the distance between indices. An edge maps to an edge or a coincident pair, and a triangle maps to an original triangle or a degenerate comparison of zero defect. The first $12$ vertices are fixed, so restricting any potential to those vertices preserves the lower bound $2$. The block-head tree gives a potential attaining the bound at $\varepsilon=1$. A universal coefficient $C<2$ would contradict the integral example on the chordal graph $P_{12}^3$ with $\varepsilon=1$. The full proof is checked by the Lean kernel.
:::

Can a low-stretch spanning tree always account for good edgewise gain reconstruction? Start from a triangle and attach a triangle to each edge created in the preceding round. The optimal spanning-tree stretch grows with every round, while local triangle comparisons still control the reconstruction error.

::: {.theorem #thm-appe-two-tree-stretch-separation title="Separation of Spanning-Tree Stretch and Gain Reconstruction on Recursive $2$-Trees" lean="D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_isChordal, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_edge_count, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_min_spanning_tree_stretch_eq, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_exists_one_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_integer_lower_bound_one, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_banach_exact_constant"}
For each depth $d\in\mathbb N$, define the recursive $2$-tree $B_d$. Start from the core triangle $B_0=K_3$, label its vertices $0,1,2$ in cyclic order, and take its cyclically directed edges as the frontier at round $0$. To construct $B_{d+1}$ from $B_d$, add a separate vertex $w$ for each frontier edge $a\to b$, adjacent only to $a,b$. Keep the parent edge and take $a\to w$ and $w\to b$ as the new frontier edges. Orient the insertion triangle in the order $a,w,b$.

1. **Chordality, connectivity, and size.** $B_d$ is a connected chordal graph with $3\cdot 2^d$ vertices and $3(2^{d+1}-1)$ edges.
2. **Minimum spanning-tree stretch.** In every spanning tree $T$ of $B_d$, some graph edge $uv$ has endpoints at distance at least $d+2$ in $T$. There is a spanning tree in which the endpoints of every graph edge are at distance at most $d+2$.
3. **Sharp uniform coefficient $1$ for group-valued reconstruction.** Let $H$ be a group with a bi-invariant pseudometric $\rho$ and let $\varepsilon\ge0$. Suppose an $H$-valued gain $g$ satisfies $g_{vu}=g_{uv}^{-1}$ on edges and $\rho(g_{uv}g_{vw},g_{uw})\le\varepsilon$ on every ordered triangle $(u,v,w)$. Then there is an $H$-valued potential $\varphi$ with $\rho(g_{uv},\varphi(u)^{-1}\varphi(v))\le\varepsilon$ on every directed edge. There is an antisymmetric integer gain with triangle defects $|g_{uv}+g_{vw}-g_{uw}|$ at most $1$ for which every integer potential has error $|g_{uv}-(\varphi(v)-\varphi(u))|$ at least $1$ on some edge.
4. **Sharp reconstruction coefficient for real seminormed spaces.** Set $a_d=1-\frac{2}{3\cdot 2^d}$. For any real seminormed space (in particular, any real Banach space), any $\varepsilon\ge0$, and any antisymmetric additive gain $g$ with $\|g_{uv}+g_{vw}-g_{uw}\|\le\varepsilon$ on every ordered triangle, there is a potential $\varphi$ with $\|g_{uv}-(\varphi(v)-\varphi(u))\|\le a_d\varepsilon$ on every directed edge.

   Use the oriented boundaries of the core triangle and the insertion triangles as a basis of the real cycle space. Write $t_i$ for the corresponding triangle chain and $\mathbf e_i$ for its coordinate unit vector. Equip the coordinate space with the $\ell^1$ norm and the cycle space with the triangle-filling norm, the infimum of the sums of absolute coefficients over triangle fillings of a cycle. The canonical coordinate gain is zero on the first two directed core edges and on the first child edge at every insertion. Its values on the other directed edges give oriented triangle sum $\mathbf e_i$ on the triangle indexed by $i$. It reverses sign on edge reversal, has triangle defects at most $1$, and forces error at least $a_d$ on some edge for every coordinate-valued potential.

   Replacing each $\mathbf e_i$ by $t_i$ in this gain gives the canonical circulation-valued gain $G$. For every real circulation $z$, summing over the fixed directions $u\to v$ with edge coefficients $z_{uv}$ gives $\sum_{u\to v} z_{uv}G_{uv}=z$. Every circulation-valued potential has filling-norm error at least $a_d$ on some edge, and there is a potential with filling-norm error at most $a_d$ on all edges.
:::

::: {.proof #pf-appe-two-tree-stretch-separation}
Every inserted vertex joins the graph with two adjacent older neighbors. A simple cycle of length at least $4$ that visits a newest vertex has a chord between those neighbors. Cycles entirely on old vertices are covered by induction, and every new vertex joins the connected old graph. Round $0$ starts with $3$ frontier edges and each round doubles their number. Round $i+1$ adds $3\cdot2^i$ vertices and $2\cdot3\cdot2^i$ edges. Summing these increments from the core's $3$ vertices and $3$ edges gives the stated counts.

The lower-bound induction finds a frontier edge whose endpoint distance meets the lower bound in every spanning tree. In the core, the edge omitted from the tree has endpoints at distance $2$. In an arbitrary tree at the next round, contract one incident tree edge at each newest vertex. Contraction preserves the tree and keeps the old vertices distinct. If a new vertex has two tree neighbors, its remaining tree edge maps to its parent edge. Thus the contracted tree spans the preceding graph, and distances between old vertices can only decrease. By induction some frontier edge has endpoints at distance at least $d+2$ in the contracted tree. The vertex inserted on that edge can have only one neighbor in the original tree. With both neighbors, its parent edge would belong to the contracted tree and have endpoint distance $1$. The tree path from that vertex to the other parent endpoint starts with its unique tree edge, so the corresponding child edge has endpoints at distance at least $d+3$. For the upper bound, start with a two-edge path in the core and at each round attach every new vertex as a leaf to the source of its parent edge. Old distances stay the same, and each child edge has endpoint distance either $1$ or the distance across the parent edge plus $1$.

On the core, choose a root and define the potential by multiplying gains along two successive edges. Those edges fit exactly, and the third edge's error is bounded by the triangle defect. At an insertion, label the parent direction $b\to a$, retain the old potential, and set $\varphi(w)=\varphi(b)g_{ba}g_{aw}$. By left invariance, the distance from $\varphi(b)g_{bw}$ to $\varphi(w)$ equals the triangle defect for that ordering. By right invariance, the distance from $\varphi(a)g_{aw}$ to $\varphi(w)$ equals the error on the parent edge. Both are at most $\varepsilon$, and edge reversal preserves the error. The same bound therefore holds at every round.

For the two lower bounds, first prescribe an additive label $\tau_i$ for each oriented triangle. Give the third directed core edge the core label and set the first two gains to zero. On inserting a vertex on $a\to b$, put $g_{aw}=0$ and $g_{wb}=g_{ab}+\tau_i$, and give each reverse edge the negative gain. The oriented triangle sums are the prescribed $\tau_i$. Every triangle is the core or an insertion triangle since its newest vertex can form a triangle only with its two older neighbors. Subtract the potential difference from each gain to obtain the residual $r_{uv}=g_{uv}-(\varphi(v)-\varphi(u))$. The potential differences cancel around the core, and replacing a parent edge on the frontier by its two children gives $r_{aw}+r_{wb}-r_{ab}=\tau_i$. The final sum of frontier residuals therefore equals the sum of all triangle labels. Each added vertex contributes one insertion triangle, so including the core gives $3\cdot2^d-2$ labels. With all labels equal to the integer $1$, if every integer residual had absolute value less than $1$, the frontier sum would be zero, contradicting its positivity. With $\tau_i=\mathbf e_i$, the frontier sum has $\ell^1$ norm $3\cdot2^d-2$. There are $3\cdot2^d$ frontier edges, so the triangle inequality forces at least one edge error to be at least their ratio $a_d$.

The same oriented triangles give coordinates on the cycle space. At each newest vertex, flow conservation makes the two child-edge coefficients equal. Subtract that coefficient times the insertion triangle boundary to clear both edges and leave a circulation on the old graph. Repeat down to the core, where the three edge coefficients are equal. Each step is unique and reversible, so the triangle boundaries form a basis and the filling norm is the $\ell^1$ norm of the coordinates. Summing $G$ around the triangle indexed by $i$ gives $t_i$. By linearity, weighting the gains by the edge coefficients of any circulation recovers that circulation. The coordinate lower bound passes to circulation-valued potentials through these coordinates.

Finally, divide the oriented core defect equally among the three edges. After subtracting each edge's share, the adjusted gains sum to zero around the core and can be integrated to a potential, giving $a_0=1/3$. When the old potential has error at most $a_i\varepsilon$, give the new vertex the midpoint of $\varphi(a)+g_{aw}$ and $\varphi(b)+g_{bw}$. The difference between the two candidate values is the sum of a triangle defect and a signed parent-edge residual, with norm at most $(a_i+1)\varepsilon$. The error on each new edge is at most half that distance, giving $a_{i+1}=(a_i+1)/2$. Since $a_i\le a_{i+1}$, the old edges also satisfy the new bound. The recurrence gives $a_d=1-\frac{2}{3\cdot2^d}$. Applying the upper bound to the canonical coordinate gain and mapping back through the triangle basis gives a potential attaining the filling-norm lower bound. The full proof is checked by the Lean kernel.
:::

On recursive $2$-trees, the spanning-tree stretch can grow while the gain reconstruction error stays small [@thm-appe-two-tree-stretch-separation]. For path powers, how large can the reconstruction coefficient be over real Banach spaces? At fixed width $k$, the optimal coefficient tends to $2-2/k$ as the number of vertices grows. Varying both the width and the number of vertices raises the uniform lower bound from $49/48$ to $2$.

::: {.theorem #thm-appe-chordal-banach-limit-two title="The Real Banach Reconstruction Limit for Path Powers and the Chordal Lower Bound" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_upper_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_lower_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_limit_tendsto, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.not_subtwo_banach_chordal"}
Let $G$ be a simple graph on a vertex set $V$. An additive gain $g:V\times V\to E$ is skew-symmetric if $g_{ji}=-g_{ij}$ for all vertex pairs. It has triangle defect at most $\varepsilon$ if $\|g_{ij}+g_{j\ell}-g_{i\ell}\|\le\varepsilon$ on every ordered triangle $(i,j,\ell)$. The error of a potential $\varphi:V\to E$ on an oriented edge $(i,j)$ is $\|g_{ij}-(\varphi(j)-\varphi(i))\|$.

1. **Shifted-block upper bound.** For every $k\ge1$, $n\in\mathbb N$, real seminormed vector space $E$, and $\varepsilon\ge0$, any skew-symmetric gain on $P_n^k$ with triangle defect at most $\varepsilon$ admits a potential with error at most $(2-2/k)\varepsilon$ on every oriented edge.
2. **Finite-dimensional Banach lower bound.** If $k\ge1$ and $n\ge k+1$, there are a finite-dimensional real Banach space $E$ and a skew-symmetric $E$-valued gain on $P_n^k$ with triangle defect at most $1$ such that every potential has error at least $\frac{n-k}{n+k-2}(2-2/k)$ on some oriented edge.
3. **Exact limit at fixed width.** Let $C_{\mathrm{Ban}}(P_n^k)$ be the infimum of the admissible nonnegative coefficients $C$. A coefficient is admissible if, for every real Banach space and every skew-symmetric gain into it with triangle defect at most $1$, there is a potential with error at most $C$ on every oriented edge of $P_n^k$. For each fixed $k\ge1$, $C_{\mathrm{Ban}}(P_n^k)$ converges to $2-2/k$ as $n\to\infty$.
4. **Chordal obstruction over real Banach spaces.** There is no real $C<2$ such that, for every finite simple chordal graph, every real Banach space, every $\varepsilon\ge0$, and every skew-symmetric gain with triangle defect at most $\varepsilon$, there is a potential with error at most $C\varepsilon$ on every oriented edge.
:::

::: {.proof #pf-appe-chordal-banach-limit-two}
For each offset $s=0,\ldots,k-1$, group vertices $v$ by $\lfloor(v+s)/k\rfloor$. The head of each nonempty block is the greater of $k\lfloor(v+s)/k\rfloor-s$ and $0$, so a negative starting index is clamped to $0$ in the initial block. Link consecutive heads, then link each remaining vertex to its own block head. All these edges span an index gap of at most $k$, so gains can be summed along the resulting spanning tree from $0$ to obtain a potential. For $n=0$, take the empty potential.

For an increasing edge $(u,v)$, the endpoints belong to the same block or to consecutive blocks. In the same block, comparison through the common head costs at most one triangle defect, and the error vanishes if $u$ is the head. Across blocks, let $x,y$ be the heads, so $x\le u<y\le v$, $y-x\le k$, and $v-u\le k$. Comparing through $y$ bounds the error by the sum of the defects on $(x,u,y)$ and $(u,y,v)$. The respective terms vanish when $x=u$ or $y=v$. For each endpoint $a$, exactly one offset satisfies $(a+s)\bmod k=0$. At that offset it is a block head and contributes zero to the error bound. Clamping the initial head to $0$ can only make more comparisons vanish. Averaging the $k$ tree potentials now bounds the edge error by $2(k-1)\varepsilon/k$ by the triangle inequality. Reversing an edge changes only the sign of its residual.

For the lower bound, index the coordinates by the right endpoints $w\in[k,n)$ of edges of length $k$. Put $W_u=[u,u+k)\cap[k,n)$, taking only integer indices, and let $E$ consist of the real vectors $x$ with $\sum_{w\in W_u}x_w=0$ whenever $k\le u$ and $u+k\le n$. Equip $E$ with the finite maximum norm

$$
\|x\|=\max\left\{\max_{k\le w<n}|x_w|,\ \max_{0\le u<n}\left|\sum_{w\in W_u}x_w\right|\right\}.
$$

The individual coordinates ensure positive definiteness, and finite dimension gives completeness. Put $c_a(w)=\mathbf 1_{w\equiv a\bmod k}-1/k$. For an increasing edge $i<j$, set $g_{ij}=2c_j$ if $j-i=k$, and $g_{ij}=-\sum_{i<a<j}c_a$ if $j-i<k$. Reverse the sign on reversed edges and set the gain to zero on the diagonal and on nonedges. Each $c_a$ sums to zero over a full period, so the gains lie in $E$. On an increasing triangle $i<j<\ell$ with $\ell-i<k$, splitting the sum over the interior indices gives the defect vector $c_j$. If $\ell-i=k$, the interior marks sum to $-c_\ell$, giving defect $c_j-c_\ell$. The indices in a singleton or in any window $W_u$ have distinct residues modulo $k$. Thus a centered mark sums to a count of $0$ or $1$ minus the size of the set divided by $k$, which has absolute value at most $1$. For a difference of marks, the centering cancels and the difference of counts has the same bound. Skew symmetry ensures that permuting a triangle can only change the sign of its defect vector.

For a given potential let $R_{ij}=g_{ij}-(\varphi(j)-\varphi(i))$, and let $M$ be the largest edge residual norm. Consecutive vertices have zero gain (for $k=1$, each $c_a=0$), and $g_{v-k,v}$ has coordinate $v$ equal to $2-2/k$. In that coordinate, the potential differences on consecutive edges telescope to the potential difference on the long edge, so

$$
R_{v-k,v}(v)-\sum_{u=v-k+1}^{v}R_{u-1,u}(v)=2-2/k.
$$

Sum over $k\le v<n$. Exchanging the order of summation in the second term makes the contribution for each $u$ the sum of the coordinates of $R_{u-1,u}$ over $W_u$. The full windows sum to zero. The truncated windows have $1\le u<k$ or $n-k<u<n$, so there are at most $2(k-1)$ of them. The norm bounds the absolute value of each of these sums by $M$ and each of the $n-k$ long-edge coordinates by $M$. Hence

$$
(n-k)(2-2/k)\le \bigl(n-k+2(k-1)\bigr)M=(n+k-2)M.
$$

The denominator is positive since $n\ge k+1$, which gives the lower bound. It applies to every admissible coefficient, and the averaged potential supplies an admissible upper bound. For fixed $k$, $(n-k)/(n+k-2)\to1$, and the two bounds give the claimed limit. For any $C<2$, first choose $k$ with $C<2-2/k$, then take $n\ge k+1$ large enough that the finite lower bound exceeds $C$. On any simple cycle of length at least $4$, the two cycle neighbors of its least vertex are both above it and within distance $k$ of it, so they are adjacent and give a chord. Thus $P_n^k$ is chordal, and the gain with triangle defect at most $1$ disproves the proposed uniform bound. The full proof is checked by the Lean kernel.
:::

The norm distance on the additive group of a real Banach space is bi-invariant, so the coefficient $4$ from [@thm-appe-chordal-uniform-gain-potential] applies there as well. The optimal real Banach chordal coefficient $C_{\mathrm{Ban,chordal}}$ lies in $[2,4]$, and its exact value remains open. The universal coefficient $C_{\mathrm{chordal}}$ for groups with a bi-invariant pseudometric also lies in $[2,4]$. By the earlier integrality argument, its exact value remains open among $\{2,3,4\}$. Fixing the target group leads to the question of the optimal coefficient on an individual chordal graph.

**A four-vertex round $\mathrm{SU}(2)$ counterexample.** A four-vertex chordal graph with no triangle is a forest. If it has one triangle, gauge the two spokes to the identity, write the remaining gain as $\exp X$, and take potentials $1,\exp(-X/3),\exp(X/3)$. Each triangle edge has error $|X|/3\le\varepsilon/3$. Fit any attached tree edge exactly. The remaining non-complete graph is the diamond, with two triangles sharing an edge. Take a degree-$3$ vertex as hub and gauge its spokes to $1$. Give the midpoint of the rim path potential $1$, and give each endpoint the midpoint of a minimizing geodesic from $1$ to the value fitting its rim edge exactly. Every error is at most $\varepsilon/2$.

On the complete graph $K_4$, one set of vertex potentials must fit all the edges at once. Round geometry gives a uniform error bound, and a cycle of quarter-turn gains gives an instance whose worst-edge error can be computed exactly.

::: {.theorem #thm-appe-round-quaternion-k4-bounds title="Reconstruction Bounds for Round Unit-Quaternion Gains on $K_4$" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.reconstruction_bound, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.quarter_turn_sharp, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.not_subcritical_claim"}
Equip the unit quaternions $S^3\cong\mathrm{SU}(2)$ with the round distance $d_{\mathrm{round}}(p,q)=\arccos\langle p,q\rangle_{\mathbb R}$, using the real inner product on the four-dimensional quaternion space. Take $\mathrm{Fin}(4)=\{0,1,2,3\}$ as the vertex set.

1. **Uniform upper bound.** Let $0\le\varepsilon\le\pi$ and let the gains $g:\mathrm{Fin}(4)\times\mathrm{Fin}(4)\to S^3$ satisfy $g_{ii}=1$, $g_{ji}=g_{ij}^{-1}$, and $d_{\mathrm{round}}(g_{ij}g_{jk},g_{ik})\le\varepsilon$ for every ordered triple $(i,j,k)$ of distinct vertices. Then there is a potential $\varphi:\mathrm{Fin}(4)\to S^3$ such that for every directed edge $i\ne j$,

   $$
   d_{\mathrm{round}}(g_{ij},\varphi_i^{-1}\varphi_j)\le \frac45\varepsilon.
   $$

2. **Sharp bound for the cyclic quarter-turn.** In $Q$, the diagonal and the spokes at $0$ have gain $1$. The gain is $I$ (the unit quaternion along the first imaginary axis) on the directed rim edges $12,23,31$ and $I^{-1}$ on their reverses. Every ordered triangle on distinct vertices has defect at most $\pi/2$, and a triple of distinct vertices attains $\pi/2$. For every potential $\varphi$, some directed edge has error at least $r_0=\arccos(1/\sqrt3)$. One potential has error exactly $r_0$ on every directed edge. The ratio of the optimal error to the maximum defect for this assignment is therefore $c_*=2\arccos(1/\sqrt3)/\pi>3/5$.

3. **Exclusion of smaller universal coefficients.** There is no real $k<c_*$ such that for every $g$ and $\varepsilon$ satisfying the hypotheses of item 1, some potential has error at most $k\varepsilon$ on every directed edge. In particular, the coefficient $1/2$ fails.
:::

::: {.proof #pf-appe-round-quaternion-k4-bounds}
**Large defects.** For $\varepsilon\ge5\pi/8$, start with $\varphi_0=1$. Choose each $\varphi_j$ orthogonal to all the previously chosen potentials transported along their edges, $\varphi_i g_{ij}$. There are at most $3$ orthogonality conditions at each step, so their orthogonal complement in real four-space contains a unit vector. Every edge has error $\pi/2\le4\varepsilon/5$. Inversion preserves distance and gives the same error on the reverse edges.

**Midpoints and small defects.** For $\varepsilon<5\pi/8$, put $a_i=g_{0i}$ and work with $g'_{ij}=a_i g_{ij}a_j^{-1}$, which sets every spoke gain to $1$. Left and right multiplication preserve distances and hence the triangle defects. Write $A,B,C$ for the gains on $12,23,31$ in this gauge, respectively and use a potential of the form $(1,1,yB^{-1},z)$. Edge $01$ fits exactly. Fitting the other five edges requires $y$ to be close to $B,AB$, $z$ to be close to $1,C^{-1}$, and $y,z$ to be close to each other. The triangle bounds control the distance within each pair of centers and the corresponding distances $d_{\mathrm{round}}(B,1)$ and $d_{\mathrm{round}}(AB,C^{-1})$ by $\varepsilon$.

Take the normalized sums $m,n$ of the two pairs, with $L,M$ the lengths of the sums. Each midpoint is within $\varepsilon/2$ of its two centers, and $L,M\ge2\cos(\varepsilon/2)$. The chords between corresponding centers have length at most $2\sin(\varepsilon/2)$, so $\|Lm-Mn\|\le4\sin(\varepsilon/2)$. Expanding gives $\|Lm-Mn\|^2=(L-M)^2+LM\|m-n\|^2$, so the midpoint separation $D=d_{\mathrm{round}}(m,n)$ satisfies $\sin(D/2)\le\tan(\varepsilon/2)$. For $\varepsilon\le77\pi/180$, convexity of $\arcsin(\tan x)$ on $[0,77\pi/360]$ and the endpoint estimate $\arcsin(\tan(77\pi/360))\le(7/5)(77\pi/360)$ give $D\le7\varepsilon/5$. Whenever this bound on $D$ holds, move each midpoint toward the other along the shortest arc by $\max\{0,(D-4\varepsilon/5)/2\}$, a distance of at most $3\varepsilon/10$. The new points are within $4\varepsilon/5$ of each other and within $\varepsilon/2+3\varepsilon/10$ of their respective centers.

**Intermediate defects.** If $D>7\varepsilon/5$, then $77\pi/180<\varepsilon<5\pi/8$. Choose a unit direction $v$ orthogonal to the first pair of centers and to the difference of the second pair, with sign chosen so that $\langle n,v\rangle_{\mathbb R}\ge0$. Project this common direction orthogonally onto $n^\perp$ and normalize to obtain $w$, which is orthogonal to both centers in the second pair. Set $y=\sqrt S\,m+\sqrt{1-S}\,v$ and $z=\sqrt S\,n+\sqrt{1-S}\,w$. In degrees, the six rational Taylor certificates cover $[77,79]$, $[79,81]$, $[81,84]$, $[84,87]$, $[87,90]$, and $[90,225/2]$. Each gives a choice of $S\in[0,1]$ and bounds $0<T_0\le T\le T_1$ for $T=-\langle m,n\rangle_{\mathbb R}$, with

$$
\begin{aligned}
\cos(4\varepsilon/5)&\le\sqrt S\cos(\varepsilon/2),\\
(1-T_0)(1-S)&\le S(1+T_0)^3,\\
\cos(4\varepsilon/5)&\le1-(1+T_1)S.
\end{aligned}
$$

The certificates bound cosine below by its first $8$ Taylor terms and above by its first $9$, using $3.14159\le\pi\le3.14160$ to reduce endpoint estimates to rational inequalities. The first inequality bounds the four inner products with the centers from below by the required cosine. To bound the inner product between $y$ and $z$, put $\zeta=\langle n,v\rangle_{\mathbb R}$ and $h=\sqrt{1-\zeta^2}\ge T$. The inner product expands to $-ST+(1-S)h+\sqrt{S(1-S)}\,\zeta(1+T/h)$. The second inequality makes the mixed term at least $(1-S)(1-h)$, so the third gives the required lower bound. Both constructions give the bounds on the five edges. Right-multiplying the potential at each vertex by $a_i$ returns a fit for the original gains.

**The quarter-turn.** The holonomy around each spoke triangle and the rim triangle is $I$ or $I^{-1}$, giving defect $\pi/2$. Left-multiply the potential by $\varphi_0^{-1}$ to set the hub potential to $1$, and write $q_1,q_2,q_3$ for the rim potentials. If a fit has radius $r<\pi/2$, put $u=\cos r$. The three spokes give $\|m\|\ge\operatorname{Re}m\ge u$ for the rim mean $m=(q_1+q_2+q_3)/3$. Set $e=(q_2-q_1)/\sqrt2$ and $f=(2q_3-q_1-q_2)/\sqrt6$. Right multiplication by $I$ is a skew-symmetric isometry, so the three rim inner products sum to $\sqrt3\langle eI,f\rangle_{\mathbb R}$. Using $\|e\|^2+\|f\|^2=3(1-\|m\|^2)$ and Cauchy–Schwarz gives

$$
3u\le\sqrt3\langle eI,f\rangle_{\mathbb R}\le\frac{3\sqrt3}{2}(1-\|m\|^2)\le\frac{3\sqrt3}{2}(1-u^2).
$$

Solving $u\le(\sqrt3/2)(1-u^2)$ gives $u\le1/\sqrt3$, so $r\ge r_0$. The same lower bound holds immediately for $r\ge\pi/2$. Take $t=1/\sqrt3$. In the plane perpendicular to $1,I$, start with $v_1=J$ (the unit quaternion along the second imaginary axis) and rotate cyclically by $v_{j+1}=-v_j/2+(\sqrt3/2)v_j I$. The potentials $q_j=t+\sqrt{1-t^2}\,v_j$ give cosine $t$ on the spokes and $(1-t^2)\sqrt3/2=t$ on the rim. Since $\cos(3\pi/10)=\sin(\pi/5)$ has square $(5-\sqrt5)/8>1/3$, we have $r_0>3\pi/10$. A universal coefficient $k<c_*$ applied to $Q$ at $\varepsilon=\pi/2$ would give radius $k\pi/2<r_0$, contradicting the lower bound. The full proof is checked by the Lean kernel.
:::

**The cyclic one-parameter family (`manual derivation`).** The ratio $c_*$ is also the optimum within the cyclic family with spoke gains $1$ and common rim gain $\cos\theta+I\sin\theta$ for $0<\theta\le\pi$. Write $r(\theta)$ for the minimum fit radius and $r_0=\arccos(1/\sqrt3)$. For $0<\theta\le\pi/3$, the identity potential and the rim triangle lower bound give $r(\theta)=\theta$, with ratio $1/3$. For $\pi/3\le\theta\le\pi/2$, the largest defect is $2\pi-3\theta$. With $\delta=\pi/2-\theta$, each rim gain moves by distance $\delta$, so $r(\theta)\le r_0+\delta$. Since $3c_*>1$, the ratio is strictly below $c_*$ when $\delta>0$.

For $\pi/2\le\theta\le\pi$, the largest defect is $\theta$. Put $a=\cos\theta$ and $k=\cos(\theta-2\pi/3)$. The optimal radius is $\arccos u_\theta$, where $u_\theta$ is the unique zero of $F_\theta(u)=k+(a-k)u^2-u$ in $(0,1)$. Indeed, for a fit with minimum residual cosine $u>0$, the symmetric part of the mean rim inner product is $a(3|m|^2-1)/2$, and the skew part is at most $(\sqrt3/2)\sin\theta(1-|m|^2)$. Thus $u\le k+(a-k)|m|^2\le k+(a-k)u^2$. In the planar construction from the proof, take real part $u_\theta$ and imaginary length $\sqrt{1-u_\theta^2}$. Each spoke then has cosine $u_\theta$, and each rim edge has cosine $k+(a-k)u_\theta^2=u_\theta$. On $\pi/2\le\theta\le2\pi/3$, $F_\theta(1/\sqrt3)=(\sin\theta-1)/\sqrt3\le0$, giving $u_\theta\le1/\sqrt3$. By implicit differentiation, the numerator of $r'(\theta)$ is $\sin\theta\,u_\theta^2+\sin(\theta-2\pi/3)(1-u_\theta^2)\le u_\theta^2$, and the denominator is $(1+2(k-a)u_\theta)\sqrt{1-u_\theta^2}\ge\sqrt{1-u_\theta^2}$, so $r'(\theta)\le1/\sqrt6<c_*$. On $2\pi/3\le\theta\le\pi$, $9F_\theta(1/3)=-3\cos\theta+4\sqrt3\sin\theta-3\ge0$ by concavity on this interval and the endpoint values. Hence $r(\theta)\le\arccos(1/3)<4r_0/3$. The strict inequality follows by comparing $3\arccos(1/3)$ and $4r_0$, whose cosines are $-23/27$ and $-7/9$. Both angles are in $(\pi,2\pi)$. These bounds give a strictly smaller ratio for $\theta>\pi/2$.

::: {.problem #prob-appe-round-quaternion-k4-optimal-constant title="The Optimal Universal Coefficient for Round Unit-Quaternion Gains on $K_4$"}
Let $C_{\mathrm{SU}(2)}(K_4)$ be the supremum, over all round unit-quaternion gain assignments on $K_4$ with positive triangle defect, of the minimum fit radius divided by the maximum triangle defect. The uniform bound and the quarter-turn instance in [@thm-appe-round-quaternion-k4-bounds] give $c_*\le C_{\mathrm{SU}(2)}(K_4)\le4/5$. The exact supremum over unrestricted gains remains open.
:::

**Attainment away from zero defect (`manual derivation`).** As the defect $\varepsilon$ tends to zero, gauge the spokes to $1$ and take tangent-space logarithms $z_{ij}=\log g_{ij}$. Each rim gain is within $\varepsilon$ of $1$, so its logarithm has norm at most $\varepsilon$. The first-order term in the logarithm of a triangle product is the sum of its three logarithms, giving an additive triangle defect of at most $\varepsilon+O(\varepsilon^2)$. Averaging the $4$ additive star potentials gives potentials of norm $O(\varepsilon)$ and edge errors at most $\varepsilon/2+O(\varepsilon^2)$. Exponentiating the potentials introduces an error of order $O(\varepsilon^2)$, so the ratio of the minimum fit radius to the defect is at most $1/2+O(\varepsilon)$. The minimum fit radius depends continuously on the gains because it minimizes a continuous error function over a compact space of potentials. The maximum triangle defect is continuous as well. Since $c_*>1/2$, all sufficiently small positive defects give ratios below $c_*$. The supremum is therefore attained on a compact set bounded away from zero defect.

**Adding an isolated vertex (`manual derivation`).** Adjoining an isolated vertex to the quarter-turn instance preserves both the maximum triangle defect and the minimum fit radius. For $n=4,5$, its ratio exceeds the real-scalar coefficient $(n-2)/n$, since $c_*>3/5$ and $1/2<3/5$.

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

## E.8.1.3 From the Potential Representation to Gram Positivity and Chord Distance {#sec-appe-gram-from-potential}

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

## E.8.1.4 Where Curvature Comes From {#sec-appe-curvature-from-half-comparison}

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

The "central complex structure" listed under `H7` in the ledger is an input about tomography of composite systems. This remark answers an adjacent and narrower question: whether a given family of objects needs complex amplitudes, in the sense of keeping its Gram matrix up to phases. As long as comparable triangles fill every cycle, the answer is decided by the three-point Bargmann products, which are readings of products of comparison values; the moduli of pairwise overlaps are in general not enough. On a qubit the pairwise similarity readings are already enough through $D^2$: the family is realizable exactly when no three objects enclose a nonzero oriented volume; what pairwise readings cannot see is only the sign of $D$, the chirality that complex conjugation exchanges. None of this derives the complex structure. A model built from real vectors satisfies every clause (see the count in E.8.2.3), so "complex numbers are needed" remains an input; what changes is its form. The four-cycle of item 3 is the same graph as the four-cycle in [@rem-appe-triangle-simple-connectivity]: in general dimension this graph keeps triangle compatibility from giving a potential and keeps three-point readings from settling realizability; the qubit family $a,b,-a,-b$ shows that with restricted dimension the same graph need not prevent a decision.
