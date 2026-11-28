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

The nondecreasing bounded integer sequence eventually becomes constant. Its terminal value is $4$ by [@thm-appe-chordal-banach-sharp-four] and the implication for additive groups of real Banach spaces.

**Real scalar and Banach targets.** For $n\ge3$ and real gains the minimum uniform error equals the largest absolute mean gain around an oriented simple cycle. Telescoping potentials gives the lower bound. Conversely, if those means are at most $r$, weight each oriented edge by $g_{uv}+r$. Both orientations satisfy the cycle bound and backtracks have weight $2r$, so there are no negative cycles. Take shortest-path distances from an added zero-weight source as potentials. The shortest-path inequalities in both orientations give error at most $r$. Chord splitting fills a length-$\ell$ cycle by $\ell-2$ triangles, so the bound is $(n-2)\varepsilon/n$. A fan with zero spokes and gain $\varepsilon$ along the ordered rim path attains it on the outer cycle of length $n$. Extend the example to $K_n$ by giving every increasing non-spoke edge the same gain. Over all real Banach targets, the exact uniform coefficient on $K_n$ is also $(n-2)/n$, by [@thm-appe-complete-cliquesum-banach].

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

In a real seminormed vector space, we can average over all predecessor paths in the construction of [@thm-appe-chordal-uniform-gain-potential]. The clique bound limits the number of terms in each average and gives a lower bound on the share of terms with zero error.

::: {.theorem #thm-appe-clique-bounded-banach-potential title="Averaged Gain Reconstruction on Chordal Graphs with Bounded Clique Number" lean="D5/S3/Combinatorics/Graph/Chordal/CliqueBoundedBanachPotential.SimpleGraph.IsChordal.exists_clique_bounded_banach_gain_potential"}
Let $V$ be a finite vertex set and $G$ a simple chordal graph on $V$. Let $k\in\mathbb N$ satisfy $2\le k$, and suppose every clique of $G$ has at most $k+1$ vertices. Let $E$ be a real seminormed vector space, $g:V\times V\to E$ a map, and $\varepsilon\ge0$ a real number. Suppose $g(j,i)=-g(i,j)$ for every ordered pair $(i,j)$ of vertices, and $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$ for every ordered triple $(i,j,\ell)$ for which $i$ is adjacent to $j$, $j$ to $\ell$, and $i$ to $\ell$.

Then there is a single potential $\varphi:V\to E$ such that every ordered pair $(u,v)$ of adjacent vertices satisfies

$$
\|g(u,v)-(\varphi(v)-\varphi(u))\|\le\left(4-\frac{4}{k}\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-clique-bounded-banach-potential}
The subgraph induced by each connected component inherits chordality, the clique bound, and the gain hypotheses. Each edge lies within one component, so the component potentials combine into a potential on $V$. Use the root $o$, distance layers, shadows $S_C$, and common anchors $a_C$ from the proof of [@thm-appe-chordal-uniform-gain-potential]. For a vertex $x$ in layer $i\ge1$, let $C$ be the component containing $x$ in the subgraph induced by layers $i$ and above. Write $N^-(x)$ for the neighbors of $x$ in the preceding layer. A shortest path to the root gives a predecessor, and $N^-(x)\subseteq S_C$. For $i\ge2$, the anchor $a_C$ in layer $i-2$ is adjacent to the whole shadow. The clique $S_C\cup\{a_C\}$ has one more vertex than the shadow, so $|N^-(x)|\le |S_C|\le k$. In the first layer, $N^-(x)=S_C=\{o\}$.

Set $\varphi(o)=0$. In the first layer take $a_C=o$ and $Q_C=0$. At each higher layer let $D$ be the parent component containing $C$ in the subgraph starting one layer earlier, and set $Q_C=Q_D+g(a_D,a_C)$. At every nonroot vertex set $\varphi(x)=\bar\phi_x$, where

$$
\bar\phi_x=Q_C+\frac{1}{|N^-(x)|}\sum_{b\in N^-(x)}\bigl(g(a_C,b)+g(b,x)\bigr).
$$

Skew-symmetry gives $g(o,o)=0$, so the potential fits edges at the root exactly. For two paths from the same anchor $a$ to the same endpoint $z$ through predecessors $b,d$ in the same shadow, the difference of their gain sums is the difference of the defects on $(a,b,d)$ and $(b,d,z)$. Its seminorm is at most $2\varepsilon$. Any triangle with coincident vertices has zero defect by skew-symmetry.

For an edge $(x,y)$ from the preceding layer to layer $i\ge2$, let $C$ be the component of $y$ in the subgraph induced by layers $i$ and above. Since $x\in S_C$, it lies in the parent component of $C$, and $a_C\in N^-(x)$ and $x\in N^-(y)$. In the average for $\varphi(x)$, the term through $a_C$ is exactly $Q_C+g(a_C,x)$. In the average for $\varphi(y)$, the term through $x$ is exactly that value plus $g(x,y)$. On each side, every other term differs from the distinguished term by at most two triangle defects. Each average therefore has a zero-error term, so its error over $m\le k$ terms is at most $2(1-1/m)\varepsilon\le(2-2/k)\varepsilon$. Adding the two bounds gives $(4-4/k)\varepsilon$.

Adjacent vertices $x,y$ in the same layer share a component, shadow, and anchor. If neither predecessor set contained the other, a predecessor from each set difference would be adjacent in the common shadow and would form a chordless four-cycle with $x,y$, contradicting chordality. Orient the edge so that $N^-(x)\subseteq N^-(y)$. Fix $b\in N^-(x)$ and compare the path through $b$ to $x$ followed by $xy$ with the predecessor paths to $y$. The matching term through $b$ at $y$ uses just the triangle $(b,x,y)$, with error at most $\varepsilon$. Every other term costs at most two additional triangle defects, for an error of at most $3\varepsilon$. The common offset $Q_C$ cancels. Among the $m$ terms for $N^-(y)$, at least one has error at most $\varepsilon$, so the average has error at most $(3-2/m)\varepsilon\le(3-2/k)\varepsilon$. Averaging over $N^-(x)$ preserves this bound. Since $k\ge2$, it is at most $(4-4/k)\varepsilon$. Adjacent vertices differ by at most $1$ in depth, and reversing an edge negates its residual, so the same potential gives the bound on every oriented edge. The full proof is checked by the Lean kernel.
:::

When we average across distance layers, the clique size controls the number of predecessors. Averaging along a simplicial deletion order brings the total number of vertices into the bound. Interval and split graphs each admit a way to join local fits using at most two triangle comparisons per edge, even with arbitrarily large cliques.

::: {.theorem #thm-appe-simplicial-interval-split-potential title="Simplicial Averaging and Gain Reconstruction on Interval and Split Graphs" lean="D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.IsChordal.exists_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.intervalGraph_isChordal_and_two_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.exists_two_approximate_gain_potential_of_split, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.BanachPathPower.pathPower_isIntervalGraph"}
1. **Simplicial averaging.** Let $G$ be a simple chordal graph on a finite vertex set $V$. Let $k\in\mathbb N$ with $k\ge2$, and suppose every clique has at most $k+1$ vertices. Let $E$ be a real seminormed vector space, let $\varepsilon\ge0$ be real, and let $g:V\times V\to E$ satisfy $g(j,i)=-g(i,j)$ for all vertex pairs. Suppose $\|g(i,j)+g(j,t)-g(i,t)\|\le\varepsilon$ for every ordered triple $(i,j,t)$ of pairwise adjacent vertices. Then there exists $\varphi:V\to E$ such that every ordered pair $(u,v)$ of adjacent vertices satisfies

   $$
   \begin{aligned}
   &\|g(u,v)-(\varphi(v)-\varphi(u))\|\\
   &\qquad\le (k-1)\left[1-\left(\frac{k-1}{k}\right)^{|V|\mathbin{\dot{-}}1}\right]\varepsilon .
   \end{aligned}
   $$

   In the exponent, $|V|$ is the natural-number cardinality and $\dot{-}$ denotes truncated natural subtraction. The coefficient is computed over the reals.

2. **Interval graphs.** Let $G$ be a simple graph on a finite vertex set $V$. Suppose $\ell,r:V\to\mathbb R$ satisfy $\ell(v)\le r(v)$ for every $v$, and for all $x,y$, $G.\mathrm{Adj}(x,y)$ holds exactly when $x\ne y$ and $\max(\ell(x),\ell(y))\le\min(r(x),r(y))$. Let $H$ be a group with a pseudometric $d$ invariant under both left and right translations, let $\varepsilon\ge0$ be real, and let $g:V\times V\to H$. Suppose $g(y,x)=g(x,y)^{-1}$ for every ordered adjacent pair $(x,y)$, and $d(g(x,y)g(y,z),g(x,z))\le\varepsilon$ for every ordered triple $(x,y,z)$ of pairwise adjacent vertices. Then $G$ is chordal and there exists $\varphi:V\to H$ such that $d(g(x,y),\varphi(x)^{-1}\varphi(y))\le2\varepsilon$ for every ordered adjacent pair $(x,y)$.

3. **Split graphs.** Let $G$ be a simple graph on a finite vertex set $V$, and let $C\subseteq V$ be a clique with $V\setminus C$ independent. For $H,d,\varepsilon,g$ under the same pseudometric, gain reversal, and triangle defect hypotheses as in item 2, $G$ is chordal and there exists $\varphi:V\to H$ such that $d(g(x,y),\varphi(x)^{-1}\varphi(y))\le2\varepsilon$ for every ordered adjacent pair $(x,y)$.

4. **Path powers.** For all $n,k\in\mathbb N$, there exist real endpoint functions $\ell,r$ on the vertex set $\mathrm{Fin}(n)$ of $P_n^k$ such that $\ell(i)=i$, $r(i)=i+k$, and $\ell(i)\le r(i)$ for every vertex $i$, using its natural-number index starting at $0$ and taking the endpoints in the reals. For all $x,y$, the vertices $x,y$ are adjacent in $P_n^k$ exactly when $x\ne y$ and $\max(\ell(x),\ell(y))\le\min(r(x),r(y))$.
:::

::: {.proof #pf-appe-simplicial-interval-split-potential}
**Simplicial averaging.** By Dirac's theorem, a nonempty chordal graph has a vertex $a$ whose neighbors form a clique. Deleting $a$ leaves an induced subgraph that inherits the hypotheses. If it has $n-1$ vertices, let $\psi$ be a potential there with error at most $r_{n-1}\varepsilon$. Each neighbor $x$ gives a candidate $p_x=\psi(x)+g(x,a)$ that would fit $xa$ exactly. The difference of two candidates is the residual on $xy$ minus the gain defect on $(x,y,a)$, so its seminorm is at most $(r_{n-1}+1)\varepsilon$. The neighbors form a clique with $a$, so their number $m$ is at most $k$. Assign $a$ the mean of the candidates. In the error on $xa$, the contribution from $p_x$ is zero, giving the factor $(m-1)/m\le(k-1)/k$. Thus we can take $r_1=0$ and $r_n=\frac{k-1}{k}(r_{n-1}+1)$ for $n\ge2$. Solving the recurrence gives the displayed coefficient. It is nondecreasing in $n$, so the old edges also satisfy the new bound. At an isolated vertex the value is arbitrary, the empty graph has no edge constraints, and reversing an edge negates its residual.

**Interval graphs.** In each nonempty vertex subset, all neighbors of an interval with the least right endpoint contain that endpoint. Apply this to the vertices of any cycle of length at least $4$. The two cycle neighbors of that interval are adjacent, giving a chord. For reconstruction, the induction requires a root $p$ whose left endpoint is at most every right endpoint in the current set. Start with an interval of least left endpoint, set $\varphi(p)=1$, and fit its spokes exactly by $\varphi(x)=g(p,x)$. Retain a neighbor $q$ with the greatest right endpoint and recurse on $q$ together with the nonneighbors of $p$ other than $p$ itself. These nonneighbors begin strictly to the right of $r(p)$. Since $\ell(q)\le r(p)$, the new root satisfies the induction condition. Left-translate the recursive potential to give $\varphi(q)=g(p,q)$, preserving the exact fit on the recursive spokes at $q$. If $p$ is isolated, remove it and restart at an interval of least left endpoint when vertices remain.

An edge between neighbors of $p$ costs one triangle comparison through $p$. If an edge $xy$ joins a neighbor $x$ to a nonneighbor $y$, then $\ell(y)\le r(x)\le r(q)$ and $\ell(y)>r(p)$, so $y$ meets $q$. If $x\ne q$, both $x$ and $q$ contain $r(p)$ and hence are adjacent. Compare $g(p,x)g(x,y)$ with $\varphi(y)=g(p,q)g(q,y)$ using $(x,q,y)$ and then $(p,x,q)$, for a total error of at most $2\varepsilon$. If $x=q$, the edge already fits exactly. Induction controls the remaining edges. By left invariance the fitted edge error is $d(\varphi(x)g(x,y),\varphi(y))$. Right translation by the inverse gain and symmetry of $d$ give the same error in reverse. The empty graph has no edges to fit.

**Split graphs.** In each nonempty induced subgraph, a vertex outside the clique has all its neighbors in the clique. If the subgraph lies entirely within the clique, every vertex is simplicial. Again, every cycle of length at least $4$ has a chord. When the clique is nonempty, choose a root $o$, set $\varphi(o)=1$, and assign $\varphi(x)=g(o,x)$ elsewhere in the clique. The spokes fit exactly and the other clique edges have error at most $\varepsilon$. For each nonisolated vertex $y$ outside the clique, choose a clique neighbor $a$ and set $\varphi(y)=\varphi(a)g(a,y)$. The edge $ay$ fits exactly. For another clique neighbor $x$, compare along the triangle $(x,a,y)$ and then use the bound on the clique edge $xa$, for error at most $2\varepsilon$. There are no edges within the independent set, and isolated vertices can take any potential. If the clique is empty, the graph has no edges.

**Path powers.** For distinct indices $x,y$, the closed intervals $[x,x+k]$ and $[y,y+k]$ intersect exactly when $x\le y+k$ and $y\le x+k$, which is the adjacency condition for $P_n^k$. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** The coefficient in item 1 is strictly below $k-1$ on every nonempty finite graph. For $k=2$, it is below $1$. Each recursive $2$-tree in [@thm-appe-two-tree-stretch-separation] attains its finite-size bound, and the coefficients tend to $1$ with the recursion depth. For $k=3$, the coefficient is below $2$, improving the $8/3$ bound of [@thm-appe-clique-bounded-banach-potential] for chordal graphs with cliques of size at most $4$, including all $3$-trees. For $n\ge4$, $P_n^3$ starts with $K_4$ and attaches each new vertex to the clique of the preceding $3$ vertices. The exact supremum over this family is $\frac43$. See [@thm-appe-three-tree-path-sup].

Item 2 applies to the additive group of a real Banach space with $d(a,b)=\|a-b\|$. Item 4 places the path powers from [@thm-appe-chordal-banach-limit-two] within the finite interval graphs. First let $n$ grow at fixed $k$, then increase $k$. The lower bounds for the optimal coefficients come arbitrarily close to $2$. Thus the supremum of the reconstruction coefficients over finite interval graphs is exactly $2$ both for real Banach spaces and for groups with bi-invariant pseudometrics.

Combine item 1 with [@thm-appe-clique-bounded-banach-potential]. For cliques of size at most $k+1$, this gives an error of at most $\min(k-1,\,4-4/k)\varepsilon$.

On a complete graph, averaging all the star potentials brings the triangle-error coefficient below $1$. When a larger graph is assembled from pieces along a tree, the pieces can be fitted locally and then joined by taking midpoints on their shared cliques.

::: {.theorem #thm-appe-complete-cliquesum-banach title="Exact Real Banach Reconstruction on Complete Graphs and Midpoint Averaging on Separated Clique Sums" lean="D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.completeGraph_banach_upper_bound, D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.completeGraph_banach_lower_bound, D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.separatedCliqueSum_banach_gain_potential"}
1. **Complete-graph upper bound in real seminormed spaces.** Let $V$ be a finite vertex set with $|V|\ge2$, let $E$ be any real seminormed vector space, and let $\varepsilon\in\mathbb R$. Suppose $g:V\times V\to E$ satisfies $g(j,i)=-g(i,j)$ for all $i,j$ and $\|g(i,j)+g(j,l)-g(i,l)\|\le\varepsilon$ for every triple of pairwise distinct $i,j,l$. Then there is a potential $\varphi:V\to E$ such that for all $i\ne j$,

   $$
   \|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac{|V|-2}{|V|}\varepsilon.
   $$

2. **Sharp complete-graph lower bound in a real Banach space.** For each natural number $m\ge2$, let $\mathrm{ZeroDivSkew}(m)$ be the space of real skew-symmetric $m\times m$ matrices with zero row sums, equipped with the entrywise supremum norm. It is a finite-dimensional real Banach space. There is a gain $g:\mathrm{Fin}(m)\times\mathrm{Fin}(m)\to\mathrm{ZeroDivSkew}(m)$ satisfying $g(j,i)=-g(i,j)$ for all $i,j$ and $\|g(i,j)+g(j,l)-g(i,l)\|\le1$ for pairwise distinct $i,j,l$, such that for every potential $\varphi:\mathrm{Fin}(m)\to\mathrm{ZeroDivSkew}(m)$ there are $i\ne j$ with

   $$
   \|g(i,j)-(\varphi(j)-\varphi(i))\|\ge\frac{m-2}{m}.
   $$

3. **Midpoint averaging on separated clique sums.** Let $T$ be a tree on an arbitrary index type $I$, let $G$ be a simple graph on a finite vertex set $V$, and let $P:I\to\mathcal P(V)$ be a family of piece vertex sets, with each vertex in at least one piece and both endpoints of every $G$-edge together in at least one piece. Let $m\ge1$ be a natural number. For each tree edge $ab$, the intersection $S(a,b)=P(a)\cap P(b)$ is a nonempty clique in $G$ with $|S(a,b)|\le m$. Pieces of distinct nonadjacent tree vertices $a,b$ are disjoint. Within each piece $P(a)$ the attachment sets $S(a,b),S(a,c)$ for distinct tree neighbors $b,c$ are disjoint, and no $G$-edge joins them.

   Let $E$ be any real seminormed vector space, $g:V\times V\to E$ an arbitrary gain, $R\ge0$ a real number, and $\varphi_a:V\to E$ a family of local potentials satisfying $\|g(u,v)-(\varphi_a(v)-\varphi_a(u))\|\le R$ for every $a\in I$ and every directed $G$-edge $(u,v)$ within $P(a)$. Then there is a global potential $\Phi:V\to E$ such that every directed $G$-edge $(u,v)$ satisfies

   $$
   \|g(u,v)-(\Phi(v)-\Phi(u))\|\le(2-1/m)R.
   $$
:::

::: {.proof #pf-appe-complete-cliquesum-banach}
**Averaging the star potentials.** Set $n=|V|$ and take $\varphi(v)=\frac1n\sum_{w\in V}g(w,v)$. Skew symmetry gives $g(i,i)=0$. The residual on $(i,j)$ is the mean of $g(w,i)+g(i,j)-g(w,j)$ over all $w$. The two terms $w=i,j$ vanish, and the other $n-2$ terms have seminorm at most $\varepsilon$. The triangle inequality gives the desired bound. When $n=2$, both terms vanish, so any real $\varepsilon$ is allowed.

**Signed triangle witness.** Let $A_{ab}$ be the matrix obtained from the zero matrix by adding $1$ at $(a,b)$ and subtracting $1$ at $(b,a)$, and set $T(a,b,c)=A_{ab}+A_{bc}+A_{ca}$. It is skew-symmetric with zero row sums. Its entries have absolute value at most $1$ when the vertices are distinct, and the matrix vanishes when any vertices coincide. Fix $0\in\mathrm{Fin}(m)$ and take $g(i,j)=T(0,i,j)$. Interchanging $i,j$ negates the gain, and $g(i,j)+g(j,l)-g(i,l)=T(i,j,l)$. For $i\ne j$, if neither endpoint is $0$, the coordinate $g(i,j)_{ij}$ equals $1$; otherwise it equals $0$. The sum of these coordinates is therefore $(m-1)(m-2)$. Every potential matrix has zero row and column sums, the latter by skew symmetry. Summing the $(i,j)$ entries of the potential differences by rows and columns gives zero in total (the diagonal entries also vanish). Hence

$$
\sum_{i\ne j}\bigl(g(i,j)-(\varphi(j)-\varphi(i))\bigr)_{ij}=(m-1)(m-2).
$$

Among the $m(m-1)$ ordered pairs of distinct vertices, at least one residual coordinate is at least the mean $(m-2)/m$. Its norm is at least that value as well.

**Joining along the tree.** Let $d(a,b)$ be the mean of $\varphi_a-\varphi_b$ on $S(a,b)$. It changes sign when a tree edge is reversed. Sum $d$ along the unique finite paths from a tree root to obtain shifts $c_a$ with $c_b-c_a=d(a,b)$. Then $\psi_a=\varphi_a+c_a$ retains the original edge errors, and $D(s)=\psi_b(s)-\psi_a(s)$ has mean zero on each attachment clique $S(a,b)$. Let $q$ be its size. For distinct $s,t$ in the clique, subtract the two pieces' residuals on the same directed edge $(s,t)$ to obtain $\|D(s)-D(t)\|\le2R$. Using the zero mean and the vanishing self-difference gives

$$
\left\|\frac{D(s)}2\right\|\le\frac{q-1}{q}R\le(1-1/m)R.
$$

Disjointness of nonadjacent pieces and of distinct attachments within a piece ensures that every shared vertex belongs to exactly two pieces. Assign the midpoint of the two shifted potentials at each shared vertex, and retain the shifted potential at each unshared vertex. Every edge lies within a piece. If both endpoints are shared, separation forces them to lie in the same attachment clique. The edge residual is then the mean of the two original residuals, with seminorm at most $R$. On any other edge, at most one endpoint receives a midpoint adjustment of size at most $(1-1/m)R$, giving total error at most $(2-1/m)R$. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** Together, the first two items give the exact uniform coefficient $(m-2)/m$ on the complete graph with $m$ vertices over all real Banach targets. Item 3 transfers a local fit to a global fit with a factor of $2-1/m$ when separated attachment cliques have size at most $m$.

For general chordal graphs with a clique size bound, we can improve the equal-weight estimate of [@thm-appe-clique-bounded-banach-potential]. When both endpoints of a cross-layer edge have the maximum number of predecessors, give the shallower endpoint more weight in the deeper endpoint's average.

::: {.theorem #thm-appe-biased-clique-banach-potential title="Biased Predecessor Averaging on Chordal Graphs with Bounded Clique Number" lean="D5/S3/Combinatorics/Graph/Chordal/WeightedCliqueBanachPotential.SimpleGraph.IsChordal.exists_biased_clique_banach_gain_potential"}
Let $G$ be a simple chordal graph on a finite vertex set $V$, and let $k\in\mathbb N$ with $k\ge3$. Suppose every clique of $G$ has at most $k+1$ vertices. Let $E$ be a real seminormed vector space, let $\varepsilon\ge0$ be real, and let $g:V\times V\to E$ satisfy $g(j,i)=-g(i,j)$ for all $i,j\in V$. Suppose that $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$ for every ordered triple $(i,j,\ell)$ in which $i$ is adjacent to $j$, $j$ to $\ell$, and $i$ to $\ell$. Then there exists a potential $\varphi:V\to E$ such that every ordered adjacent pair $(u,v)$ satisfies

$$
\begin{aligned}
\bigl\|g(u,v)-(\varphi(v)-\varphi(u))\bigr\|
&\le \left(4-\frac{4}{k}-\frac{2(k-2)^2}{k(k-1)^3}\right)\varepsilon .
\end{aligned}
$$
:::

::: {.proof #pf-appe-biased-clique-banach-potential}
Each connected component inherits the hypotheses, and every edge lies in one component, so the component potentials can be combined. Denote the displayed coefficient by $R_k$. In each component choose a root $o$, form layers by distance from $o$, and let $P(x)$ be the neighbors of $x$ in the preceding layer. For a component $C$ of the subgraph induced by layers $i$ and above ($i\ge1$), its shadow $S_C$ consists of its neighbors in layer $i-1$. If two shadow vertices were nonadjacent, take shortest paths between them with interiors in $C$ and in the lower layers, respectively. The second path exists because both vertices have shortest paths to the root. Both connecting paths are induced, and their interiors differ in depth by at least $2$, so their union is a chordless cycle. Thus the shadow is a clique.

Every nonroot vertex $x$ has a predecessor on a shortest path toward the root, and all its predecessors lie in the same shadow. Hence $P(x)\cup\{x\}$ is a clique and $|P(x)|\le k$. For adjacent vertices $x,y$ in the same layer, the predecessor sets are nested by inclusion. Otherwise, choosing one predecessor from each set difference gives two adjacent vertices in the common shadow that form a chordless quadrilateral with $x,y$. Call a vertex saturated if it has $k$ predecessors. Two saturated vertices of $P(v)$ would be adjacent and would have identical predecessor sets by nesting. Together with those predecessors they would form a clique of size $k+2$, a contradiction.

Set $\delta=\frac{k-2}{k(k-1)^2}$. When $P(x)$ has size $m\ge2$ and contains a saturated vertex, give that vertex weight $1/m+\delta$ and every other predecessor weight $1/m-\delta/(m-1)$. Use equal weights in the other cases. The weights $w_x(b)$ sum to $1$ and are bounded below by $f(m)$, where $f(1)=1$ and $f(m)=1/m-\delta/(m-1)$ for $m\ge2$. Since $0<\delta\le1/4$, we have $f(m)>0$. For integers $2\le m\le n$, we have $(m-1)(n-1)\ge mn/4$, so $f(m)-f(n)=(n-m)\bigl(1/(mn)-\delta/((m-1)(n-1))\bigr)\ge0$. Also, $f(2)\le f(1)$.

When $i\ge2$, let $D$ be the parent component containing $C$ once layer $i-1$ is included. A shortest path to the root gives a vertex in $S_C$. All vertices in $S_C$ lie in $D$, and their predecessor sets are nonempty and pairwise nested. Thus any vertex $a_C$ in the smallest set is adjacent to all of $S_C$ and belongs to $S_D$. Set $Q_C=Q_D+g(a_D,a_C)$. At layer $1$, take $a_C=o$ and $Q_C=0$, and set $\varphi(o)=0$. For each nonroot $x$, use its component $C$ in the subgraph induced by its layer and the layers above to define

$$
\begin{aligned}
\varphi(x)&=Q_C+\sum_{b\in P(x)}w_x(b)\bigl(g(a_C,b)+g(b,x)\bigr).
\end{aligned}
$$

Skew symmetry gives zero defect on triangles with repeated vertices. Each neighbor $x$ of the root has the sole predecessor $o$, so $\varphi(x)=g(o,x)$ and all edges at the root fit exactly. Write $T(a,b,d)=g(a,b)+g(b,d)-g(a,d)$. The difference between the gains along paths from a common anchor $a$ through predecessors $b,d$ in the same shadow to the same vertex $z$ is $T(a,b,d)-T(b,d,z)$, of seminorm at most $2\varepsilon$.

For an edge from a shallower vertex $u$ other than the root to a deeper vertex $v$, let $C$ be the component at the layer of $v$ and write $c=a_C$. The construction gives $c\in P(u)$ and $u\in P(v)$. Set $M=Q_C+g(c,u)$. Then $M$ is the term through $c$ in the average for $\varphi(u)$, and $M+g(u,v)$ is the term through $u$ in the average for $\varphi(v)$. Each average differs from its distinguished term only through the other predecessor paths, with error at most $2\varepsilon$ per term. Adding the two error bounds gives a residual of seminorm at most $(4-2w_u(c)-2w_v(u))\varepsilon$. If both endpoints have $k$ predecessors, $u$ receives the extra weight in $P(v)$ and the two distinguished weights sum to at least $f(k)+1/k+\delta$. If at least one endpoint has at most $k-1$ predecessors, their sum is at least $f(k)+f(k-1)$. Substituting $\delta$ gives

$$
\begin{aligned}
f(k)+\frac{1}{k}+\delta
&=f(k)+f(k-1)\\
&=\frac{2}{k}+\frac{(k-2)^2}{k(k-1)^3}.
\end{aligned}
$$

Thus the cross-layer residual has seminorm at most $R_k\varepsilon$. For a within-layer edge, orient it so that $P(u)\subseteq P(v)$. Both endpoints share the anchor and offset $Q_C$. Fix $b\in P(u)$ and compare the path through $b$ to $u$ followed by the edge to $v$ with the predecessor paths to $v$. The matching term through $b$ uses only the triangle $(b,u,v)$, with error at most $\varepsilon$. Every other term adds at most $2\varepsilon$. Averaging over $P(v)$ gives $(3-2w_v(b))\varepsilon\le(3-2f(k))\varepsilon$, and averaging over $P(u)$ preserves the bound. As $2\delta\le(k-2)/k$, we have $R_k-(3-2f(k))=1-2/k-2\delta\ge0$. Adjacent vertices differ in depth by at most $1$, and reversing an edge negates the residual, so the estimate holds on every oriented edge. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** At $k=4$, every $4$-tree has cliques of size at most $5$, so its reconstruction coefficient is at most $R_4=79/27<3$. This improves the $4-4/k=3$ bound of [@thm-appe-clique-bounded-banach-potential] and the size-independent bound from item 1 of [@thm-appe-simplicial-interval-split-potential], which is $k-1=3$. For the universal constant with unrestricted clique size, see [@thm-appe-chordal-banach-sharp-four].

Biased predecessor weights improve the estimate when clique sizes are bounded. With unrestricted clique sizes, how much error can pure layer-by-layer averaging and root averaging of the two-step construction control? Fix real scalar gains and retain the predecessor sets $P(x)$, shadows $S_C$, anchors $a_C$, and transport values $Q_C$ above. Call a gain $g:V\times V\to\mathbb R$ triangle-$1$-flat if it is skew on all vertex pairs and every ordered triangle $(x,y,z)$ satisfies $|g(x,y)+g(y,z)-g(x,z)|\le1$.

Valid anchors equal the root $r$ at depth $1$. At greater depths, $a_C$ lies in the parent shadow and is adjacent to all of $S_C$. At depth $1$ set $Q_C=0$ and $Q_C=Q_D+g(a_D,a_C)$ at greater depths, where $D$ is the parent component. Valid weights $w_x(b)$ are nonnegative for all $x,b$, equal $0$ outside $P(x)$, and sum to $1$ on $P(x)$ for every nonroot vertex. The two-step breadth-first potential takes $\varphi_r(r)=0$ and, at a nonroot vertex $x\in C$, is defined by

$$
\varphi_r(x)=Q_C+\sum_{b\in P(x)}w_x(b)\bigl(g(a_C,b)+g(b,x)\bigr).
$$

A pure predecessor barycenter potential takes $\varphi(r)=0$ and requires $\varphi(x)=|P(x)|^{-1}\sum_{b\in P(x)}(\varphi(b)+g(b,x))$ at every nonroot vertex with a nonempty predecessor set.

Define the tower graph $\operatorname{barycenterTower}(m,n)$ with root $r$ and $n$ layers of $m$ vertices $(i,j)$, where $0\le i<n$ and $0\le j<m$. Each layer is a clique, and the root is adjacent to the entire first layer. Between consecutive layers, column $0$ of the later layer is adjacent only to column $0$ of the earlier one. The remaining vertices meet the entire preceding layer. Tower gains are $0$ within a layer and $0$ forward into column $0$. Forward gains from the root or column $0$ into other columns are $1$, and all remaining forward gains are $2$. Reverse orientations negate the gains (defined on all vertex pairs by their heights).

Define the bridged graph $\operatorname{bridgedGadget}(m,N)$ with $N$ copies, each having a root $o$ and sets $A=\{a_j\}$, $U=\{u_i\}$, $B=\{v_j\}$, $Y=\{y_j\}$ of $m$ vertices each. Its edges are exactly those from the root to $A$, those of the clique $A\cup U$, those joining each $v_j$ to all of $U$ and to $a_j$, those joining each $y_j$ to all of $U$ and to $v_j$, and the edges joining the copy roots into a path.

::: {.theorem #thm-appe-bfs-barycenter-obstructions title="The Four-Defect Two-Step Breadth-First Bound and Obstructions to Predecessor Barycenters and Root Averaging" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/WeightedTwoStepBFS.SimpleGraph.two_step_residual_bound, D5/S3/Combinatorics/Graph/Chordal/TwoStepBFSAndBarycenterObstructions.SimpleGraph.pure_predecessor_barycenter_unbounded, D5/S3/Combinatorics/Graph/Chordal/TwoStepBFSAndBarycenterObstructions.SimpleGraph.twoStepBFS_root_averaging_lower_bound"}
1. **Two-step reconstruction bound for arbitrary weights.** For every finite connected simple chordal graph, every root $r$, every valid shadow-anchor and predecessor-weight assignment, and every triangle-$1$-flat real scalar gain $g$, the corresponding two-step potential $\varphi_r$ satisfies $|g(u,v)-(\varphi_r(v)-\varphi_r(u))|\le4$ on every oriented edge $(u,v)$.

2. **Unbounded pure predecessor barycenter error.** For all natural numbers $m\ge2$, $n\ge1$, the tower graph is connected and chordal, its tower gain $g$ is triangle-$1$-flat, and a pure predecessor barycenter potential exists. Each vertex $(i,j)$ has distance $i+1$ from the root, and every pure predecessor barycenter potential $\varphi$ satisfies

   $$
   \begin{aligned}
   \varphi(i,0)&=0,\\
   \varphi(i,j)&=(2m-1)-(2m-2)\left(\frac{m-1}{m}\right)^i\quad(j\ne0).
   \end{aligned}
   $$

   For every real $M$, there exist natural numbers $m\ge2$, $n\ge1$ such that the corresponding tower is connected and chordal, its tower gain is triangle-$1$-flat, and there is an oriented edge $(u,v)$ on which every pure predecessor barycenter potential on that graph satisfies $|g(u,v)-(\varphi(v)-\varphi(u))|>M$.

3. **Obstruction to root averaging of two-step potentials.** For all natural numbers $m\ge2$, $N\ge2$, the bridged graph is connected and chordal. For every probability distribution $\mu$ on roots ($\mu(r)\ge0$ and $\sum_r\mu(r)=1$), and every valid shadow-anchor and predecessor-weight assignment chosen in advance for each root, there exist a triangle-$1$-flat real scalar gain $g$ and an oriented edge $(u,v)$. With $\bar\varphi(x)=\sum_r\mu(r)\varphi_r(x)$ denoting the weighted mean of these two-step potentials,

   $$
   |g(u,v)-(\bar\varphi(v)-\bar\varphi(u))|\ge4-\frac4m-\frac8N.
   $$
:::

::: {.proof #pf-appe-bfs-barycenter-obstructions}
**Two-step bound.** Each neighbor of the root has the root as its sole predecessor, so root edges have zero residual. Adjacent vertices $u,v$ in the same layer share an anchor $a$ and transport value. Choose any predecessors $b\in P(u)$ and $t\in P(v)$. The shadow is a clique, so $b,t$ coincide or are adjacent. Chordality gives the quadrilateral $b,u,v,t$ at least one diagonal $b,v$ or $t,u$ (the assertion holds directly if $b=t$). Thus the gain difference between the path from $a$ through $b,u$ to $v$ and the path from $a$ through $t$ to $v$ splits into at most $3$ triangle defects. For a cross-layer edge $u,v$, write its two anchors as $a,c$, where $c$ lies in the shadow of $u$ and is adjacent to $u$. The difference between the path from $a$ through $b,u$ to $v$ and the path from $a$ through $c,t$ to $v$ splits into defects on $(a,b,c)$, $(b,c,u)$, $(c,u,t)$, $(u,t,v)$, each of absolute value at most $1$, or $0$ for repeated vertices. Every predecessor pair therefore has absolute residual at most $4$. Averaging over the two predecessor probability distributions preserves the bound. Reversing an edge negates its residual.

**Tower.** Eliminate vertices from the last layer to the first, removing column $0$ before the remaining vertices in each layer, and remove the root last. At each elimination the remaining neighbors form a clique, proving chordality. Edges change height by at most $1$, and every vertex reaches the root along a path descending one layer at a time, so the graph is connected and the distance is exactly $i+1$. Every triangle spans at most two consecutive layers. Within-layer gains are $0$, and the two cross-layer gains differ by at most $1$ in absolute value, giving triangle-$1$-flatness. Column $0$ always has potential $0$, and the other columns share the initial value $s_0=1$ and recurrence $s_{i+1}=(1+(m-1)(s_i+2))/m$. This recurrence constructs the potential and uniquely determines it layer by layer, yielding the closed form in item 2. The edge from column $0$ to column $1$ in the final layer has gain $0$ and absolute residual exactly $(2m-1)-(2m-2)((m-1)/m)^{n-1}$. First choose $m$ with $2m-1>M$, then use $0<(m-1)/m<1$ to choose $n$ large enough that this edge has absolute residual greater than $M$ for every pure predecessor barycenter potential.

**Bridged graph.** Eliminating $Y,B,U,A$ in that order and then the roots in path order gives a perfect elimination order, proving chordality. The root path and local edges ensure connectivity. Select a copy with root probability mass $p\le1/N$ and call its root $o$. For every root $r$ outside this copy, distances to its vertices equal the distance to $o$ plus the local distance. Hence $P(u_i)=A$ and $P(y_j)=U\cup\{v_j\}$, and the valid anchors at these vertices are forced to be $o$ and $a_j$, respectively. Indeed, the tail component of $y_j$ is a singleton with shadow $U\cup\{v_j\}$, and its parent shadow is $A$, where only $a_j$ is adjacent to $v_j$. The parent component's anchor must be $o$.

Write the weights for root $r$ as $w_{r,x}(b)$. Normalization gives summing $w_{r,u_i}(a_j)+w_{r,y_j}(u_i)$ over all $m^2$ pairs $(i,j)$ gives a total of at most $2m$. Weight this sum by $\mu$ over roots outside the copy and average over pairs to select $(i,j)$ with

$$
\begin{aligned}
\sum_{r\text{ outside the copy}}\mu(r)\bigl(w_{r,u_i}(a_j)+w_{r,y_j}(u_i)\bigr)&\le\frac{2}{m}(1-p).
\end{aligned}
$$

Order the vertices with those of the other copies and $o$ first, followed by $A\setminus\{a_j\}$, $u_i$, $Y$, $(U\setminus\{u_i\})\cup B$, and $a_j$, refining each group to a strict order. Assign forward gain $1$, reverse gain $-1$, and diagonal gain $0$, so every triangle has absolute defect $1$. For each root outside the copy, the common anchor transport cancels. The mean gain of two-edge paths from $o$ to $u_i$ is $2(1-w_{r,u_i}(a_j))$, and from $a_j$ to $y_j$ it is $-2(1-w_{r,y_j}(u_i))$. Also $g(o,a_j)=g(u_i,y_j)=1$. Consequently the signed residual on $(u_i,y_j)$ is exactly $4-2w_{r,u_i}(a_j)-2w_{r,y_j}(u_i)$. For roots inside the copy, item 1 gives a signed residual lower bound of $-4$. Combining the probability masses and the weight estimate above, the signed residual of the root average is at least

$$
\begin{aligned}
4(1-p)-\frac4m(1-p)-4p&\ge4-\frac4m-\frac8N.
\end{aligned}
$$

Its absolute value satisfies the same bound. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** Scaling the gains replaces triangle defect $1$ by any $\varepsilon>0$. Pure predecessor barycenter recurrence has no uniform error coefficient. As $m,N$ tend to infinity, root averaging in the two-step scheme with graph-dependent root laws, anchors, and predecessor weights cannot reduce the uniform error bound below $4\varepsilon$. [@thm-appe-chordal-banach-sharp-four] extends the obstruction to arbitrary potentials.

The root-averaging lower bound gives a family on which to compare reconstruction methods. With bounded clique sizes, the two-step estimate improves when the weights account for the sizes of the predecessor sets. On the bridged graph, a different construction first fits the core of each copy using its universal vertices, then extends the fit to the root.

::: {.theorem #thm-appe-multitier-universal-banach title="Multi-Tier Predecessor Bounds and Simplicial Extension from a Universal Core" lean="D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.IsChordal.exists_multitier_clique_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.exists_universal_core_simplicial_banach_potential, D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.bridgedGadget_banach_upper_bound"}
In each part, let $E$ be a real seminormed vector space, let $\varepsilon\ge0$ be real, and let $g:V\times V\to E$ be a gain defined on all ordered pairs of the given vertex set $V$. Assume that $g(j,i)=-g(i,j)$ for all $i,j\in V$ and that $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$ on every ordered triangle $(i,j,\ell)$.

1. **Multi-tier bound with bounded clique size.** Let $G$ be a simple chordal graph on a finite vertex set $V$, and let $k\ge4$ be a natural number such that every clique has at most $k+1$ vertices. Then there exists a potential $\varphi:V\to E$ such that every ordered adjacent pair $(u,v)$ satisfies

   $$
   \bigl\|g(u,v)-(\varphi(v)-\varphi(u))\bigr\|\le\left(4-\frac{4(k-2)}{k^2-3k+3}\right)\varepsilon .
   $$

2. **Simplicial attachments to a universal core.** Let $G$ be a simple graph on a finite vertex set $V$. Suppose $U\subseteq H\subseteq V$, with $U$ nonempty and every $u\in U$ adjacent to every other vertex in $H$. Suppose $H^c$ is independent and for some natural number $m\ge1$, the neighborhood $N(o)$ of each $o\in H^c$ is a clique contained in $H$ with at most $m$ vertices. Then there exists a potential $\varphi:V\to E$ with error $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ at most $\max\{1,2-2/m\}\varepsilon$ on every ordered adjacent pair $(u,v)$.

3. **Reconstruction on the bridged graph.** For any natural numbers $m\ge2$ and $N\ge1$, take $\operatorname{bridgedGadget}(m,N)$ from [@thm-appe-bfs-barycenter-obstructions], with vertex set $V$ indexed by copy and vertex within the copy. Then there exists a potential $\varphi:V\to E$ with error $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ at most $(2-2/m)\varepsilon$ on every ordered adjacent pair $(u,v)$.
:::

::: {.proof #pf-appe-multitier-universal-banach}
**Multi-tier predecessor weights.** Root each connected component and use the distance layers, predecessor sets $P(v)$, shadow anchors $a_C$, and transport values $Q_C$ from the proof of [@thm-appe-biased-clique-banach-potential]. The set $P(v)$ together with $v$ forms a clique, so $|P(v)|\le k$. Adjacent vertices in the same layer have nested predecessor sets. If $S=\{u\in P(v):s\le|P(u)|\}$ is nonempty, choose $u\in S$ with a smallest predecessor set. By nesting, every vertex of $P(u)$ is adjacent to every vertex of $S$. The two sets are cliques in disjoint layers, so $P(u)\cup S$ is a clique and $|S|+s\le k+1$.

Set $D=k^2-3k+3$, $\alpha=(k-3)/D$, and $\beta=(k-2)/D$. For positive integers $m\le k-2$, take $f_m=1/m$ and set $f_{k-1}=\beta$, $f_k=\alpha$, and $f_0=1$. For each $b\in P(v)$, start with weight $\max\{f_{|P(v)|},2\beta-f_{|P(b)|}\}$. Since $2\beta-\alpha=(k-1)/D<1/(k-2)\le1/2$, the smallest profile value is $\alpha>0$. When $1\le|P(v)|\le k-2$, all initial weights are $1/|P(v)|$. When $|P(v)|=k-1$, the baseline is $\beta$, with an extra $\beta-\alpha$ for a vertex with $k$ predecessors. There is at most $1$ such vertex. When $|P(v)|=k$, the baseline is $\alpha$, with $\beta-\alpha$ added at each threshold $k-1$ and $k$. At most $2$ vertices meet the first threshold and at most $1$ meets the second. The two largest rows thus have total weights bounded by $(k-1)\beta+(\beta-\alpha)=1$ and $k\alpha+3(\beta-\alpha)=1$, respectively. Distribute any unused weight uniformly to obtain weights $w_v(b)$ summing to $1$ and still meeting both initial lower bounds.

For a nonroot vertex $x$, take its potential to be $Q_C$ plus the weighted average of the path gains $g(a_C,b)+g(b,x)$ with weights $w_x(b)$. Give the root potential $0$. Its incident edges fit exactly because each neighbor has the root as its sole predecessor. For paths from the same anchor $a$ through shadow predecessors $b,d$ to the same vertex $x$, the difference in path gains is the difference of the defects on $(a,b,d)$ and $(b,d,x)$, with seminorm at most $2\varepsilon$. A triangle with repeated vertices has zero defect by skew symmetry. For an edge from a nonroot vertex $u$ to a vertex $v$ in the next layer, let $c$ be the shadow anchor of the component containing $v$. Then $c\in P(u)$ and $u\in P(v)$. By the transport recursion, the term through $c$ in the average at $u$, once extended by $g(u,v)$, equals the term through $u$ at $v$. Each average differs from its matching term by at most twice the triangle tolerance times the weight of the other terms. The resulting error is at most $(4-2w_u(c)-2w_v(u))\varepsilon$. The weight bounds give $w_u(c)+w_v(u)\ge f_{|P(u)|}+(2\beta-f_{|P(u)|})=2\beta$, so the cross-layer error is at most $(4-4\beta)\varepsilon$.

For a within-layer edge, orient it so that $P(u)\subseteq P(v)$. The endpoints share an anchor and transport value. The path through any $b\in P(u)$, extended from $u$ to $v$, differs from the matching term at $v$ by one triangle defect and from every other term by at most three. Averaging over $P(v)$ gives $(3-2w_v(b))\varepsilon\le(3-2\alpha)\varepsilon$, and averaging over $P(u)$ preserves this bound. Since $2\beta-\alpha\le1/2$, the bound is at most $(4-4\beta)\varepsilon$. Reversing an edge negates its residual, and the component potentials combine to give the desired potential.

**Universal core and simplicial vertices.** For $h\in H$, take $\varphi(h)$ to be the average of $g(z,h)$ over $z\in U$. The residual on a core edge $(a,b)$ is the average of $g(z,a)+g(a,b)-g(z,b)$. Skew symmetry makes the term zero when $z$ is an endpoint. Otherwise universality gives a triangle, and the term has seminorm at most $\varepsilon$. For $o\notin H$ with nonempty $N(o)$, set $\varphi(o)$ to the average of the candidate values $\varphi(b)+g(b,o)$ over $b\in N(o)$. The difference between two distinct neighbors' candidates is bounded by the core edge residual plus the defect of the triangle through $o$, giving seminorm at most $2\varepsilon$. On an edge $(a,o)$ the term from $a$ itself contributes zero to the average of the differences, giving error at most $2(1-1/|N(o)|)\varepsilon\le(2-2/m)\varepsilon$. Give any isolated vertex outside $H$ potential zero. The set $H^c$ has no edges, and reversing an edge preserves its error. The two edge estimates give part 2.

**Bridged graph.** In each copy, let $H$ consist of the vertices left after removing the root, and let $U$ be the universal vertex set in $H$. The root $o$ is the sole vertex outside the core, and its neighborhood is the clique $A$ of size $m$. Apply part 2 to the whole copy. Since $m\ge2$, the local error bound is $(2-2/m)\varepsilon$. Traverse the path of roots, translating the potential on each copy by a constant so that consecutive root potentials differ by the gain on their bridge. These translations preserve all differences within a copy and give zero residual on every bridge. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** Part 1 strictly improves the bound in [@thm-appe-biased-clique-banach-potential] for every $k\ge4$. Subtracting the common term $4-4/k$ reduces the comparison to $2(k-3)(k-1)^3>(k-2)^2D$, which follows from $D<(k-1)^2$ and $2(k-3)(k-1)=2((k-2)^2-1)>(k-2)^2$. At $k=4$, every $4$-tree has reconstruction coefficient at most $20/7$, with $20/7<79/27<3$. When $N(m-1)>4m$, the real triangle-$1$-flat gain supplied by [@thm-appe-bfs-barycenter-obstructions] for any fixed root-averaged two-step scheme has an edge error of at least $4-4/m-8/N>2-2/m$. For the same gain, part 3 gives a potential with every edge error at most $2-2/m$. For the exact universal constant with unrestricted clique size, see [@thm-appe-chordal-banach-sharp-four].

The predecessor bounds use clique size to control the error. With a clique tree, we can track how the error grows with separator size and distance from the center, or combine the two local potentials directly at each shared vertex.

::: {.theorem #thm-appe-cliquetree-banach-potential title="Banach Potential Bounds by Clique-Tree Center Extension and Two-Clique Midpoint Gluing" lean="D5/S3/Combinatorics/Graph/Chordal/CliqueTreeBanachPotential.SimpleGraph.cliqueTree_center_extension_banach_potential, D5/S3/Combinatorics/Graph/Chordal/CliqueTreeBanachPotential.SimpleGraph.cliqueTree_twoClique_midpoint_banach_potential"}
Let $G$ be a simple graph on a finite vertex set $V$, and let $T$ be a tree on a finite index set $I$. Suppose $(T,K)$ is a clique tree of $G$. Each bag $K(a)\subseteq V$ is a clique in $G$, every vertex and every edge is contained in a bag, and every bag on any simple tree path between two bags containing a vertex also contains that vertex. For each tree edge $ab$, assume that the separator $S(a,b)=K(a)\cap K(b)$ is nonempty.

Let $E$ be any real seminormed vector space, let $\varepsilon\ge0$ be real, and let $g:V\times V\to E$ be a gain. Assume $g(j,i)=-g(i,j)$ for all $i,j\in V$ and $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$ whenever $ij$, $j\ell$, and $i\ell$ are all edges of $G$. In both parts, the fitting error on a directed adjacent pair $(u,v)$ is $\|g(u,v)-(\varphi(v)-\varphi(u))\|$.

1. **Clique-tree center extension.** Let $m\ge1$ be a natural number with $|S(a,b)|\le m$ for every tree edge $ab$, and let $D$ be a natural number with $\operatorname{dist}_T(a,b)\le D$ for all $a,b\in I$. Define

   $$
   \begin{aligned}
   R_0 &= 1,\\
   R_{\ell+1} &= \max\left\{R_\ell,1,\left(1-\frac1m\right)(1+R_\ell)\right\}.
   \end{aligned}
   $$

   Then there is a potential $\varphi:V\to E$ with fitting error at most $R_{\lfloor D/2\rfloor}\varepsilon$ on every directed edge of $G$.

2. **Two-clique midpoint gluing.** Suppose $|\{i\in I:x\in K(i)\}|\le2$ for every vertex $x\in V$. Give each tree edge $ab$ the weight

   $$
   \sigma(a,b)=\left(1-\frac1{|S(a,b)|}\right)\left(1-\frac{|S(a,b)|}{\max\{|K(a)|,|K(b)|\}}\right).
   $$

   Let $\tau(a)$ be the largest sum of weights of two distinct tree edges incident to $a$, padding with $0$ if there is only one incident edge and taking $0$ if there are none. Set

   $$
   M(T,K)=\max\left(\{0\}\cup\left\{1-\frac2{|K(a)|}+\tau(a):a\in I,\ |K(a)|\ge2\right\}\right).
   $$

   Then $M(T,K)<3$, and there is a potential $\varphi:V\to E$ with fitting error at most $M(T,K)\varepsilon$ on every directed edge of $G$.
:::

::: {.proof #pf-appe-cliquetree-banach-potential}
**Center extension.** Take the middle vertex of a longest simple tree path, or both endpoints of its middle edge, as the center. The distance from any bag to the path is at most the shorter distance from its attachment point to the two ends. Otherwise its path to the farther end would be longer. Thus every bag lies within $\lfloor D/2\rfloor$ of the nearest center. Average the star potentials $g(t,\cdot)$ over the whole center bag in the single-bag case or over the common separator in the two-bag case. This gives the same potential on the center bags. Each edge residual is the mean of triangle defects, with terms at the endpoints vanishing by skew symmetry, so its seminorm is at most $\varepsilon$. An empty bag has no edges to fit.

Extend outward one layer at a time. If the parent bag has potential $p$, keep $p$ on the parent–child separator $S$. At every other vertex $v$ in the child bag, take the mean of $p(t)+g(t,v)$ over $t\in S$. An edge with both endpoints in $S$ retains the bound $R_\ell\varepsilon$. With both endpoints outside $S$, the $p(t)$ terms cancel and the error is at most $\varepsilon$. If just the endpoint $u$ lies in $S$, the $t=u$ term in the residual average vanishes. Each other term is the sum of a triangle defect and a parent-bag residual. The error is therefore at most $(1-1/|S|)(1+R_\ell)\varepsilon\le(1-1/m)(1+R_\ell)\varepsilon$. Reversing an edge negates its residual. These three edge estimates give the recurrence. Neighboring bags agree on their separator, so the path intersection property makes the potential consistent across all bags containing a vertex. Every edge lies in a bag, giving the global bound.

**Midpoint gluing.** For each nonempty bag $K(a)$, let $p_a(x)$ be the mean of $g(t,x)$ over the bag. The two endpoint terms vanish, giving the within-bag bound $(1-2/|K(a)|)\varepsilon$. Sum the means of $p_a-p_b$ on $S(a,b)$ along the tree to obtain translations $\psi_a=p_a+c_a$ for which $\psi_b-\psi_a$ has mean zero on every common separator. This is the tree offset construction `tree_offsets` used in the proof of [@thm-appe-complete-cliquesum-banach]. The translations preserve every within-bag potential difference.

Take $u,v$ in a separator $S=S(a,b)$. The increment of $\psi_b-\psi_a$ from $v$ to $u$ is the difference of the two bag residuals on the same edge, and it vanishes when $u=v$. Each residual is a mean of triangle defects. Put $q=1/\max\{|K(a)|,|K(b)|\}$ and subtract $q$ times the sum of the common star defects from each mean. The remaining weights are nonnegative and sum to $1-|S|q$ in each bag, so the increment has seminorm at most $2(1-|S|q)\varepsilon$. With $u$ fixed, average over $v\in S$. The zero mean recovers the difference at $u$, and the term $v=u$ contributes zero. Dividing by $2$ bounds the shift from $\psi_a(u)$ to the midpoint by $\sigma(a,b)\varepsilon$.

At a vertex in a single bag, use its translated potential. A vertex in two bags must belong to neighboring bags by the path intersection property, so use the midpoint of their translated potentials. On an edge in one bag with neither endpoint shared, the residual stays the same. If both endpoints lie in the same separator, the residual is the average of the two bag residuals, each bounded by $M(T,K)\varepsilon$. In the remaining cases each endpoint contributes at most one shift. Two shifts correspond to distinct incident tree edges, and an unshared endpoint contributes zero. The error is at most $(1-2/|K(a)|+\tau(a))\varepsilon$. Every weight belongs to $[0,1)$ and the tree is finite, so $\tau(a)<2$ and hence $M(T,K)<3$. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** Both parts allow arbitrarily large bags and edges joining distinct incident separators within a bag. Compare the separation condition in [@thm-appe-complete-cliquesum-banach]. Every finite $m\ge1$ gives $R_\ell<1+\ell$ for $\ell\ge1$, since the last term in the maximum is strictly below $1+R_\ell$. Part 1 thus gives, for $D\le5$, a coefficient strictly below $3$, and for $D\le7$, a coefficient strictly below $4$. For $m\le4$ and $D\le19$, the recurrence at $m=4$ gives the upper bound $R_9=373533/131072<20/7$, strictly below the general $4$-tree bound in [@thm-appe-multitier-universal-banach]. Part 2 gives $M(T,K)<3$ at any diameter whenever each vertex belongs to at most two bags. For the exact universal constant with unrestricted clique size, see [@thm-appe-chordal-banach-sharp-four]. The exact value of $C_{\mathrm{SU}(2)}(K_4)$ in $[c_*,4/5]$ remains open. See [@prob-appe-round-quaternion-k4-optimal-constant].

Weights can improve both constructions. In simplicial elimination they let old residuals cancel. In clique-tree gluing, the weight shared by adjacent bags controls how much their potentials differ at a shared vertex.

::: {.theorem #thm-appe-weighted-simplicial-and-occurrence-banach title="Banach Potential Bounds from Weighted Simplicial Elimination and Clique-Tree Occurrence Centers" lean="D5/S3/Combinatorics/Graph/Chordal/WeightedSimplicialBanachPotential.SimpleGraph.IsChordal.exists_weighted_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/WeightedSimplicialBanachPotential.SimpleGraph.cliqueTree_occurrenceCenter_banach_potential"}
In both parts, take any real seminormed vector space $E$, any real $\varepsilon\ge0$, and a gain $g:V\times V\to E$. Assume $g(y,x)=-g(x,y)$ for all $x,y\in V$ and $\|g(x,y)+g(y,z)-g(x,z)\|\le\varepsilon$ whenever $xy,yz,xz$ are edges of $G$. The residual of a potential $\varphi:V\to E$ on a directed adjacent pair $(u,v)$ is $g(u,v)-(\varphi(v)-\varphi(u))$.

1. **Weighted simplicial elimination for chordal graphs of bounded clique size.** Let $G$ be a simple chordal graph on a finite vertex set $V$. Let $k\in\mathbb N$ satisfy $k\ge2$ and suppose every clique of $G$ has at most $k+1$ vertices. There is a potential $\varphi$ whose residual seminorm on every directed edge of $G$ is at most

   $$
   R_k\varepsilon,\qquad R_k=\max\left\{k-2,\frac{k-1+\sqrt{(k+3)^2-16}}{4}\right\}.
   $$

2. **Occurrence centers for weighted clique trees.** Let $V,I$ be finite and let $G$ be a simple graph on $V$. Let $(T,K)$ be a clique tree of $G$ indexed by $I$, with bags $K(a)\subseteq V$, as defined in [@thm-appe-cliquetree-banach-potential]. For every tree edge $ab$, assume its separator $S_{ab}=K(a)\cap K(b)$ is nonempty. For each $a\in I$, take a probability distribution $\pi_a:V\to\mathbb R_{\ge0}$ supported on $K(a)$, with weight zero outside $K(a)$ and $\sum_{x\in V}\pi_a(x)=1$. Take real numbers $\alpha,d$ with $d\ge0$ satisfying the following inequalities.

   $$
   \begin{aligned}
   1-\pi_a(x)-\pi_a(y)&\le\alpha &&\text{if }x,y\in K(a)\text{ and }xy\text{ is an edge of }G,\\
   \left(1-\frac1{|S_{ab}|}\right)\left(1-\sum_{x\in S_{ab}}\min\{\pi_a(x),\pi_b(x)\}\right)&\le d &&\text{if }ab\text{ is an edge of }T.
   \end{aligned}
   $$

   Let $D\in\mathbb N$ and suppose $\operatorname{dist}_T(a,b)\le D$ for every $x\in V$ and any two bags $K(a),K(b)$ containing $x$. There is a potential $\varphi$ whose residual seminorm on every directed edge is at most $\bigl(\alpha+4\lfloor(D+1)/2\rfloor d\bigr)\varepsilon$. If $D\le1$, the same potential also gives residual seminorm at most $(\alpha+2d)\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-weighted-simplicial-and-occurrence-banach}
**Weighted elimination.** Use Dirac's theorem to delete simplicial vertices successively, then reverse the order. The earlier neighbors $S_v$ of each vertex $v$ form a clique even after adjoining $v$, so $|S_v|\le k$. Put $R=R_k$, $s=1/(1+R)$, and $t=1-(k-1)s$. The inequality $(k+3)^2-16\le9(k-1)^2$ gives $k-2\le R\le k-1$, hence $0\le t\le s$. Set $\varphi(v)$ to a weighted mean of the candidates $\varphi(w)+g(w,v)$. Use uniform weights when $0<|S_v|<k$. When $|S_v|=k$, give the latest predecessor weight $t$ and all others weight $s$. With no predecessors, set $\varphi(v)=0$. Write $w_v(w)$ for the weights and $r_{w,v}$ for the residuals. The mean gives $\sum_{w\in S_v}w_v(w)r_{w,v}=0$, and later insertions leave these residuals intact.

For $x\in S_v$, subtract the mean from its candidate to obtain $r_{x,v}$. The term at $w=x$ vanishes. Each other term is the sum of an old residual $r_{x,w}$ and the triangle defect $g(x,v)-g(x,w)-g(w,v)$. If $x$ has weight at least $s$, these terms have total weight at most $1-s$, and the induction bound gives $(1-s)(R+1)\varepsilon=R\varepsilon$. This covers the uniform case because $|S_v|\le k-1\le1+R$.

If $|S_v|=k$ and $x$ is the latest predecessor, then $A=S_v\setminus\{x\}\subseteq S_x$ and $|A|=k-1$. By skew symmetry, the zero-sum identity at $x$ also holds for the reversed residuals $r_{x,w}$. If $A=S_x$, uniform weighting gives $\sum_{w\in A}s r_{x,w}=0$. Otherwise $S_x=A\cup\{z\}$. Let $b$ be the latest vertex in $S_x$. Subtracting the weighted zero sum at $x$ from $\sum_{w\in A}s r_{x,w}$ leaves $(s-t)r_{x,b}-s r_{x,z}$, with seminorm at most $(2s-t)R\varepsilon$. The triangle defects contribute at most $(k-1)s\varepsilon$. The radical term in $R_k$ is the positive root of $2R^2-(k-1)R-(k-1)=0$, so the maximum gives $2R^2-(k-1)R-(k-1)\ge0$. Substituting $s,t$ gives the equivalent inequality $(k-1)s+(2s-t)R\le R$, completing the induction.

**Occurrence centers.** Take the weighted mean of the stars in each bag, $p_a(v)=\sum_{x\in K(a)}\pi_a(x)g(x,v)$. An edge residual within the bag is a weighted mean of triangle defects. Both endpoint terms vanish, so its seminorm is at most $\alpha\varepsilon$. Use `tree_offsets` to construct the translations. Starting at a tree root, add the mean of $p_a-p_b$ on $S_{ab}$ when crossing from $a$ to $b$. These translations give potentials $\psi_a$ with $\psi_b-\psi_a$ of mean zero on every $S_{ab}$.

Put $M=1-\sum_{x\in S_{ab}}\min\{\pi_a(x),\pi_b(x)\}$. The increment of $\psi_b-\psi_a$ between two separator vertices is a difference of two bag residuals. Subtract the common weight from both distributions, leaving nonnegative weights of total mass $M$ in each. The increment then has seminorm at most $2M\varepsilon$. Fix one vertex and average over the other. The zero mean recovers the potential difference at the fixed vertex, and the increment vanishes when the vertices coincide. Thus the jump at a shared vertex has seminorm at most $2(1-1/|S_{ab}|)M\varepsilon\le2d\varepsilon$.

The bags containing $v$ form a subtree. Choose a middle vertex of a longest path as its center. A branch off that path has length at most the shorter distance from its attachment point to the two ends, since a longer branch would extend the path to the farther end. The center is therefore within $\lfloor(D+1)/2\rfloor$ edges of every occurrence. Set $\varphi(v)$ to the translated potential at the center. Every edge lies in a bag. Summing the jumps from that bag to the centers at the two endpoints adds at most $4\lfloor(D+1)/2\rfloor d\varepsilon$ to its error.

When $D\le1$, each vertex occurs in at most two bags, since three pairwise adjacent bags would form a cycle. Use the translated value if there is one occurrence and the midpoint if there are two. Each endpoint then moves by at most $d\varepsilon$ from its value in the bag containing the edge, giving $(\alpha+2d)\varepsilon$. When $D=0$ neither endpoint moves, giving $\alpha\varepsilon$. When $D=1$ the midpoint bound also implies the general bound. The full proof is checked by the Lean kernel.
:::

Part 1 gives $R_2=1$ and $R_3=(1+\sqrt5)/2<5/3<2$. Thus all chordal graphs of clique size at most $4$, including every $3$-tree, have a uniform coefficient below $2$. The value $R_4=(3+\sqrt{33})/4<7/3<20/7$ improves the bound for all $4$-trees in [@thm-appe-multitier-universal-banach]. The value $R_5=3<40/13$ applies to all chordal graphs of clique size at most $6$.

The following consequences of Part 2 allow any clique size and any diameter of the whole clique tree, with every bag nonempty. For $D\le2$ and maximum tree degree at most $3$, the coefficient can be taken strictly below $11/3$. For $D\le1$ and maximum degree at most $2$, it can be taken strictly below $2$. If $D\le2$ and every tree edge satisfies $\max\{|K(a)|,|K(b)|\}\le c|S_{ab}|$ with $c\ge1$, the coefficient is at most $5-4/c$, giving $c=2$ the coefficient $3$ and $c=4/3$ the coefficient $2$.

In the weighted elimination of [@thm-appe-weighted-simplicial-and-occurrence-banach], a triangle of already fitted edges controls the difference between two old residuals. When one retained identity leaves too much error, a second identity can eliminate the contribution from the latest predecessor.

::: {.theorem #thm-appe-multi-identity-simplicial-banach title="Banach Potential Bounds from Multiple Retained Identities in Simplicial Elimination" lean="D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_regrouped_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_multiIdentity_cliqueSix_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_multiIdentity_cliqueSeven_banach_gain_potential"}
Let $G$ be a simple chordal graph on a finite vertex set $V$ and let $E$ be a real seminormed vector space. Take $g:V\times V\to E$ and a real number $\varepsilon\ge0$. Assume $g(y,x)=-g(x,y)$ for all $x,y\in V$, and $\|g(x,y)+g(y,z)-g(x,z)\|\le\varepsilon$ whenever $xy,yz,xz$ are edges of $G$. Each part gives a potential $\varphi:V\to E$ whose residual seminorm $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ on every ordered adjacent pair $(u,v)$ satisfies the stated bound.

1. **Regrouping by old triangles.** Let $k\in\mathbb N$ with $k\ge2$ and suppose every clique $C$ of $G$ satisfies $|C|\le k+1$. For every real $R$ with $\max\{1,k-2\}\le R\le k-1$ and $2(k-1)\le R(R+1)$, the residual seminorm is at most $R\varepsilon$.
2. **Clique size at most $6$.** If every clique of $G$ has at most $6$ vertices, the residual seminorm is at most $(2\sqrt3-1)\varepsilon$.
3. **Clique size at most $7$.** If every clique of $G$ has at most $7$ vertices, the residual seminorm is at most $\frac{3+\sqrt7}{2}\varepsilon$.
:::

::: {.proof #pf-appe-multi-identity-simplicial-banach}
Reverse a perfect elimination order, which exists by chordality, and insert the vertices in that order. Let $P_v$ be the predecessors of $v$, namely its neighbors already inserted. The set $P_v$ together with $v$ is a clique. If $P_v$ is empty, set $\varphi(v)=0$. Otherwise take the weighted mean of the candidates $\varphi(x)+g(x,v)$ with weights $w_v(x)\ge0$ summing to $1$ on $P_v$. Write $r_{xy}=g(x,y)-(\varphi(y)-\varphi(x))$ and $\delta_{xyz}=g(x,y)+g(y,z)-g(x,z)$. The mean gives $\sum_{x\in P_v}w_v(x)r_{vx}=0$, an identity retained after every later insertion.

For $c\in P_v$, the new edge residual is $\sum_{x\in P_v\setminus\{c\}}w_v(x)(r_{cx}-\delta_{cxv})$. The weighted defects contribute at most $(1-w_v(c))\varepsilon$. Already fitted edges satisfy $\|r_{xy}\|\le R\varepsilon$. Set $s=1/(R+1)$. When $w_v(c)\ge s$, the direct bound is $(1-s)(R+1)\varepsilon=R\varepsilon$. Also, for $x,y\in P_c$, the identity $r_{cx}-r_{cy}=\delta_{cxy}-r_{xy}$ gives $\|r_{cx}-r_{cy}\|\le(R+1)\varepsilon$. For coincident vertices the difference is zero.

**Part 1.** Use uniform weights below $k$ predecessors. Since $|P_v|\le k-1\le R+1$, the direct bound applies. With exactly $k$ predecessors, give the latest weight $t=1-(k-1)s$ and the others weight $s$, with $0\le t\le s$. Only the edge from the latest predecessor $c$ requires another estimate. The other $k-1$ predecessors form $A=P_v\setminus\{c\}\subseteq P_c$. If $P_c=A$, the uniform identity at $c$ makes the old residual sum zero, leaving at most $(1-t)\varepsilon\le R\varepsilon$ from triangle defects. Otherwise $P_c=A\cup\{z\}$. Let $b$ be the latest vertex in $P_c$. Subtracting the retained identity at $c$ leaves $(s-t)(r_{cb}-r_{cz})-t r_{cz}$. The old triangle bounds the difference, giving a total error of at most $\bigl((s-t)(R+1)+tR+1-t\bigr)\varepsilon$. The coefficient equals $2(k-1)s$, which is at most $R$ by the quadratic inequality.

**Parts 2 and 3.** The predecessor limits $k$ are $5$ and $6$, respectively. Use uniform weights for at most $3$ predecessors. Otherwise use $s,s,s,t,0,\ldots$ in insertion order with $t=1-3s$. Both radii satisfy $R\ge2$ and $1/4\le s\le1/3$, so $0\le t\le s$. The direct bound covers edges of weight at least $s$. On each remaining edge, the old residual sum uses only vertices earlier than $c$. Extend their weights by zero to $Q=P_c$ and call them $b_x$. Put $\mu=1-w_v(c)$. Subtracting $\mu$ times the retained identity gives $\sum_{x\in Q}h_xr_{cx}$ with $h_x=b_x-\mu w_c(x)$ and $\sum_{x\in Q}h_x=0$. Pair positive and negative coefficients by mass. If the total negative mass is $M=\sum_{x\in Q}\max\{-h_x,0\}$, the sum has seminorm at most $M(R+1)\varepsilon$. For $M>0$, assign mass $h_x(-h_y)/M$ to each positive-negative pair $x,y$ and apply the triangle inequality to the residual differences. For $M=0$, the sum is zero.

In the exceptional cases, the latest vertex $a$ of $Q$ has coefficient $\lambda=h_a\ge0$, and $Q\setminus\{a\}\subseteq P_a$. Use the identity at $a$ to replace $\lambda r_{ca}$ by a sum of $r_{ca}+r_{ax}$ with weights $\lambda w_a(x)$. For shared predecessors $x\in Q\cap P_a$, replacing this vector by $r_{cx}$ costs one triangle defect. For extra predecessors $x\in P_a\setminus Q$, keep the auxiliary vector $r_{ca}+r_{ax}$. Its difference from $r_{cy}$ at a negative coefficient $y$ is $(r_{ax}-r_{ay})+\delta_{cay}$, adding at most $\varepsilon$ to the usual pairing bound. Across shared and extra predecessors these costs sum to at most $\lambda\varepsilon$, since the weights $w_a$ sum to $1$. If $M$ is the negative mass after replacement, adding the new triangle defects leaves the condition $M+s(\mu+\lambda)\le1-s$. Use $\lambda=0$ when one identity suffices.

To check this inequality, number the positions in $Q$ from $0$. Put $d=|Q|$ and let $T$ be the positions in $Q$ of the vertices in $P_v$ earlier than $c$, with $j=|T|$. The cases are $3\le j\le d\le k$ and $j<k$. Assign $b_x=s,s,s,t,0,\ldots$ in order on $T$. Eliminate the last position $d-1$ in the following cases.

- $d=k=5$, with $j=3$ and $3,4\in T$.
- $d=k=6$, with either $j=3$ and $4,5\in T$, or $j=4$ and exactly one of $0,1,2$ in $T$.

In these cases $P_a$ contains at most one vertex beyond $Q\setminus\{a\}$. Since the weights are nonincreasing, a shift of one position to the right gives a lower bound on the weight each remaining position receives. To upper-bound the negative mass, replace the coefficient at $i<d-1$ by $h_i+\lambda w_{i+1}$, where $w_{i+1}$ is the weight at position $i+1$ in $Q$, and set the last coefficient to zero. Substituting the subsets $T\subseteq\{0,\ldots,d-1\}$ gives the following upper bounds on $M+s(\mu+\lambda)$, listed in increasing order of $j$.

| $k$ | One identity | Two identities |
| --- | --- | --- |
| $5$ | $3s-3s^2$, $2s$ | $12s^2-s$ |
| $6$ | $9s^2$, $1-s$, $2s$ | $3s^2+2s$, $3s-t^2$ |

Part 2 uses $s=1/(2\sqrt3)$, which satisfies $12s^2=1$. Part 3 uses $s=(5-\sqrt7)/9$, which satisfies $9s^2-10s+2=0$. Substitution bounds every entry by $1-s$. The residual bound thus holds at each insertion, and skew symmetry gives the bound on the reverse edges. The full proof is checked by the Lean kernel.
:::

Write $\omega(G)$ for the size of the largest clique. For $\omega(G)\le4$, Part 1 gives the older upper bound $R=(\sqrt{17}-1)/2\approx1.5616$. For all finite chordal graphs with $\omega(G)\le4$, [@thm-appe-three-tree-clique-four-bracket] gives $\frac43\le S_4\le\frac{72537}{50000}=1.45074<\frac32$. For $\omega(G)\le5$, it allows $R=2<(3+\sqrt{33})/4$, so all $4$-trees have a uniform upper bound of $2\varepsilon$. Part 2 gives, for $\omega(G)\le6$, $2\sqrt3-1\approx2.4641<3$, improving the previous bound. Part 3 gives, for $\omega(G)\le7$, $(3+\sqrt7)/2\approx2.8229<3$, so all $6$-trees have a uniform coefficient strictly below $3$.

With unrestricted clique size, the optimal uniform real Banach coefficient equals $4$, and the optimal uniform coefficient for groups with bi-invariant pseudometrics also equals $4$, as established in [@thm-appe-chordal-banach-sharp-four]. The optional ceiling of $3$ under a dominating-clique hypothesis still requires formal evidence. For the nonabelian group $\mathrm{SU}(2)$ with its round distance, Lean 4 gives the uniform upper coefficient $\frac{434}{125}=3.472<\frac72<4$ alongside bounds for small defects and small cliques. See [Appendix E.8.1.7](appendix-e-s08-s01-s07-chordal-su2-sharp-bounds.md#sec-appe-chordal-su2-sharp-bounds). The optimal uniform coefficient remains open, as does the separate question of whether $C_{\mathrm{SU}(2)}(K_4)=c_*$ holds. See [@prob-appe-round-quaternion-k4-optimal-constant].

For a fixed nonlinear target group, the optimal coefficient is already a question on complete graphs.

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

Keeping the three directed rim gains equal and varying their common angle gives an exact fit radius at each angle and explains why the quarter turn gives the largest ratio.

::: {.theorem #thm-appe-round-quaternion-equal-rim-minimax title="Exact Minimax Radius and Unique Quarter-Turn Maximum for Equal Cyclic Rim Gains" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionEqualRimMinimax.RoundQuaternionEqualRimMinimax.equalRim_exact_defect_and_minimax, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionEqualRimMinimax.RoundQuaternionEqualRimMinimax.equalRim_ratio_unique_maximum_at_quarter_turn"}
On $K_4$ with vertex set $\mathrm{Fin}(4)=\{0,1,2,3\}$, take gains in the group of unit real quaternions $S=\operatorname{unitary}\mathbb H$ with round distance $d(p,q)=\arccos\langle p,q\rangle_{\mathbb R}$. Let $I\in\mathbb H$ satisfy $\operatorname{Re}I=0$ and $\|I\|=1$. For $a\in[0,\pi]$, define the gain assignment $G(I,a)=(g_{ij})$ as follows. The diagonal and the spokes at hub $0$ have gain $1$. The directed rim edges $(1,2),(2,3),(3,1)$ have gain $A=\cos a+I\sin a$, and their reverses have gain $A^{-1}$.

An assignment has triangle defect at most $\varepsilon$ if $g_{ji}=g_{ij}^{-1}$, $g_{ii}=1$, and $d(g_{ij}g_{jk},g_{ik})\le\varepsilon$ for all pairwise distinct $i,j,k$. A potential $\varphi:\mathrm{Fin}(4)\to S$ fits the gains within radius $r$ if $d(g_{ij},\varphi_i^{-1}\varphi_j)\le r$ for every directed edge $i\ne j$.

For $0\le a\le\pi/3$, define $e(a)=3a$. For $\pi/3<a\le\pi/2$, define $e(a)=2\pi-3a$. For $\pi/2<a\le\pi$, define $e(a)=a$. Set $R(a)=a$ for $0\le a\le\pi/3$ and $R(a)=\arccos t(a)$ for $\pi/3<a\le\pi$, where $t(a)$ is the unique positive root of the following equation with $\lambda(a)=\cos(a-2\pi/3)$.

$$
(\lambda(a)-\cos a)t^2+t-\lambda(a)=0.
$$

1. **Exact triangle defect and minimax radius.** For every such $I$ and every $a\in[0,\pi]$, the assignment $G(I,a)$ has triangle defect at most $e(a)$. For every real $\varepsilon$, if its triangle defect is at most $\varepsilon$, then $e(a)\le\varepsilon$. There is a potential $\varphi:\mathrm{Fin}(4)\to S$ that fits $G(I,a)$ within radius $R(a)$. For every potential $\varphi:\mathrm{Fin}(4)\to S$ and real $r$, if $\varphi$ fits $G(I,a)$ within radius $r$, then $R(a)\le r$.
2. **Equality only at the quarter turn.** For all $a\in(0,\pi]$, we have $R(a)/e(a)\le c_*=\frac{2}{\pi}\arccos(1/\sqrt3)$, with equality if and only if $a=\pi/2$.
:::

::: {.proof #pf-appe-round-quaternion-equal-rim-minimax}
Since $I^2=-1$, triangles through the hub have holonomy $A^{\pm1}$, and the rim triangle has holonomy $A^{\pm3}$. Left and right multiplication by unit quaternions preserve distance, so the respective defects are $a$ and $\arccos(\cos(3a))$. Both occur. Taking the larger principal angle, with angles folded into $[0,\pi]$, gives the three branches of $e(a)$.

Left-multiply all potentials by $\varphi_0^{-1}$ to set the hub potential to $1$ while preserving every relative potential $\varphi_i^{-1}\varphi_j$. Write $x_i$ for the rim potentials and read their indices cyclically. If a potential fits within radius $r<\pi/2$, put $u=\cos r>0$. Since $r\ge0$, the spoke constraints give $u\le\langle 1,m\rangle_{\mathbb R}\le\|m\|\le1$, where $m=(x_1+x_2+x_3)/3$. Left-multiplying along each rim edge by its source potential gives $u\le\langle x_i A,x_{i+1}\rangle_{\mathbb R}$.

Write $x_i=m+y_i$. Then $\sum_i y_i=0$ and $\sum_i\|y_i\|^2=3(1-\|m\|^2)$. Use orthogonal coordinates $E=(y_1-y_2)/\sqrt2$ and $H=(y_1+y_2-2y_3)/\sqrt6$ on the zero-sum subspace, so $\|E\|^2+\|H\|^2=\sum_i\|y_i\|^2$. The symmetric cyclic sum $\sum_i\langle x_i,x_{i+1}\rangle_{\mathbb R}$ equals $3\|m\|^2-\tfrac12\sum_i\|y_i\|^2$. Right multiplication by $I$ is a skew-symmetric isometry, so the skew cyclic sum is $\sum_i\langle x_i I,x_{i+1}\rangle_{\mathbb R}=\sqrt3\langle EI,H\rangle_{\mathbb R}$, bounded above by $\tfrac{\sqrt3}{2}(\|E\|^2+\|H\|^2)$. Using $\sin a\ge0$ and $\lambda(a)=-\cos a/2+(\sqrt3/2)\sin a$ yields

$$
u\le\frac13\sum_i\langle x_i A,x_{i+1}\rangle_{\mathbb R} \le\cos a\,\|m\|^2+\lambda(a)(1-\|m\|^2).
$$

The difference $\lambda(a)-\cos a=\sqrt3\sin(a-\pi/3)$ is nonpositive for $a\le\pi/3$, so $u\le\cos a$. The constant potential $1$ attains radius $a$. For $a>\pi/3$, let $D=\lambda(a)-\cos a>0$. Since $\|m\|\ge u$, we get $Du^2+u\le\lambda(a)$. The polynomial $Dt^2+t-\lambda(a)$ is strictly increasing on $[0,\infty)$. Its value at $0$ is $-\lambda(a)<0$ because $|a-2\pi/3|\le\pi/3$, and its value at $1$ is $1-\cos a>0$. Thus $u\le t(a)<1$. Cosine is decreasing on $[0,\pi]$, which gives the lower bound on the fit radius. Both branches have $R(a)\le\pi/2$, so the lower bound also holds for $r\ge\pi/2$.

Choose a unit quaternion $J$ perpendicular to $1,I$. In the plane spanned by $J,JI$, take $v_i=J(\cos b_i+I\sin b_i)$ with successive angles $b_i$ equal to $0,2\pi/3,4\pi/3$. Set the hub potential to $1$ and the rim potentials to $x_i=t+\sqrt{1-t^2}\,v_i$. Each spoke has residual cosine $t$. Right multiplication by $A$ advances the angle in the plane by $a$, so each rim edge has residual cosine $\cos a\,t^2+\lambda(a)(1-t^2)$. At $t=t(a)$ the two cosines agree, attaining radius $R(a)$. Inversion preserves distance, so reverse edges have the same errors.

For $0<a\le\pi/3$, the ratio is $1/3$. For $a>\pi/3$, use the same construction at fixed latitude $q=1/\sqrt3$. The rim cosine simplifies to $q\sin a\le q$, so $R(a)\le f(s)=\arccos(q\cos s)$, where $s=|a-\pi/2|$. On $[0,\pi/2]$, we have $f''(s)=q(1-q^2)\cos s/(1-q^2\cos^2 s)^{3/2}\ge0$. The secant between the endpoints gives $f(s)\le f(0)+(1-c_*)s$. Also, $e(a)\ge\pi/2+s$ and $c_*=2f(0)/\pi>1/2$ because $q<\cos(\pi/4)$. Thus for $s>0$,

$$
R(a)\le f(s)\le f(0)+(1-c_*)s<c_*(\pi/2+s)\le c_*e(a).
$$

At $a=\pi/2$ the spoke and rim cosines agree at latitude $q$, so $q=t(\pi/2)$. Hence $R(\pi/2)=f(0)$ and $e(\pi/2)=\pi/2$, giving ratio $c_*$. The full proof is checked by the Lean kernel.
:::

When the three rim gains vary independently, the optimal potential at the quarter turn still provides a starting point. Splitting the transverse displacement into two cyclic Fourier modes gives a potential with quantitative control on every edge.

::: {.theorem #thm-appe-round-quaternion-local-sharpness title="Strict Local Sharpness at the Cyclic Quarter Turn and Its Weighted-Variance Angular Region" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionLocalSharpness.RoundQuaternionLocalSharpness.quarterLocal_strictFit, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionLocalSharpness.RoundQuaternionLocalSharpness.quarterLocal_angularRegion"}
Let $c_*=\frac{2}{\pi}\arccos(1/\sqrt3)$. On $K_4$, assign gain $1$ to the diagonal and the spokes at vertex $0$. Give the directed rim edges $12,23,31$ unit-quaternion gains $A_0,A_1,A_2$, respectively, and assign their inverses to the reverse edges. For the resulting gain assignment $g$, with rim indices $j\in\{0,1,2\}$, put $e=\max\{\max_j d(1,A_j),\,d(A_0A_1A_2,1)\}$.

In both cases below, the defect $d(g_{ij}g_{jk},g_{ik})$ of every ordered triangle with pairwise distinct vertices is at most $e$, and some triangle attains $e$. Fit radii use the round distance defined above.

1. **Strict quantitative fit in complex-pair Fourier coordinates.** In complex-pair coordinates $(z,h)\mapsto z+hJ$, suppose $A_j=(-\eta_j+i\gamma_j,w_j)$, where $\eta_j,\gamma_j\in\mathbb R$, $\gamma_j=\sqrt{1-\eta_j^2-|w_j|^2}>0$, $w_j=p\zeta^j+q\zeta^{-j}$, $p,q\in\mathbb C$, and $\zeta=(-1+i\sqrt3)/2$. Put $E=\max_j|\eta_j|$ and assume $\max\{|p|,|q|,E\}\le3/50$. The phase-normalized potential $\varphi=P(p,q)$ constructed below satisfies, on every directed edge $i\ne j$,

   $$
   \langle g_{ij},\varphi_i^{-1}\varphi_j\rangle_{\mathbb R}\ge\cos(c_*e)+\frac{|q|}{200}+\frac{3}{100}(|p|^2+E).
   $$

   The potential $\varphi$ fits $g$ at radius $c_*e$. If $(p,q,\eta)\ne(0,0,0)$, there is a real $R<c_*e$ at which the same $\varphi$ fits $g$. If $(p,q,\eta)=(0,0,0)$, no potential fits $g$ at any real radius $R<c_*e$.

2. **Weighted-variance angular region.** In the basis $1,I,J,IJ$, suppose the rim gains are

   $$
   \begin{aligned}
   A_0&=(\cos a,\sin a,0,0),\\
   A_1&=(\cos b,\sin b\cos u,\sin b\sin u,0),\\
   A_2&=(\cos c,\sin c\cos v,\sin c\sin v\cos w,\sin c\sin v\sin w).
   \end{aligned}
   $$

   All angles are in radians and the azimuth $w\in\mathbb R$ is arbitrary. Assume $u,v\ge0$ and $u+v<\pi/2$, with $\max\{|a-\pi/2|,|b-\pi/2|,|c-\pi/2|\}\le17\pi/900$ and $u^2+v^2+(u+v)^2\le(4497/500)(3/50)^2$.

   There is a potential $\varphi$ that fits $g$ at radius $c_*e$ and, if $(a,b,c,u,v)\ne(\pi/2,\pi/2,\pi/2,0,0)$, also fits $g$ at some real radius $R<c_*e$. At the center $(a,b,c,u,v)=(\pi/2,\pi/2,\pi/2,0,0)$, no potential fits $g$ at any real radius $R<c_*e$.
:::

::: {.proof #pf-appe-round-quaternion-local-sharpness}
The triangles through vertex $0$ give the defects $d(1,A_j)$, and the rim triangle gives $d(A_0A_1A_2,1)$. Left and right multiplication and inversion preserve the round distance, so cyclic permutations and reversal preserve each defect. These four values exhaust the ordered triangles, and each is attained.

For Part 1, set $\ell=\exp(-i\arg(q(\zeta-1))/2)$, with $\ell=1$ when $q=0$. Conjugation by $(\ell,0)$ rotates about $I$ and multiplies both modes by $\ell^2$, so the rotated coefficients satisfy $q(\zeta-1)=\sqrt3\,|q|$. Write $p,q$ for the rotated modes until we conjugate back. Set $t=1/\sqrt3$, $\rho=3/50$, $s=\sqrt{2/3}$, and $v_j=\zeta^{-j}$, with rim subscripts taken modulo $3$. Write $x=\operatorname{Re}p$ and $y=\operatorname{Im}p$. The coefficients are $F_0=\sqrt3(x^2-y^2)/96+xy/16$, $F_1=\sqrt3(x^2-y^2)/96-xy/16$, $F_2=-\sqrt3(x^2-y^2)/48$, $b_j=\operatorname{Re}(p v_{j-1})/\sqrt6$, $f_j=s(\sqrt3\,b_j+F_j-F_{j-1})$, $U=t+|q|/\sqrt6-(\sqrt3/12)|p|^2$.
Use $1$ at the hub and the unit quaternion $X_j=(U+ib_j,\,v_j(\sqrt{1-U^2-b_j^2-f_j^2}+if_j))$ at vertex $j+1$. The parameter bounds make the radicand nonnegative. Conjugation preserves the inner product of each gain with its relative potential, so conjugating back at each vertex gives the phase-normalized potential in the original coordinates.

Write the rim-edge inner product as $\langle X_jA_j,X_{j+1}\rangle_{\mathbb R}$. At $q=0$ and $\eta=0$, expansion gives common constant and quadratic terms $t-(\sqrt3/12)|p|^2$. The linear term cancels, and each cubic term has absolute value at most $(2/5)|p|^3$. Bound the terms in the two potentials and the gain by their norms and sum the products of total degree at least $4$, using $|p|\le\rho$. The resulting remainder is bounded by $3|p|^4$. Restoring $q$ and $\eta$ gives a common linear increase of $Q/\sqrt6$ from phase alignment, where $Q=|q|$. The other perturbation terms cost at most $(627/100)\rho Q+2\rho E$. Every spoke has inner product $U$, and the reverse edge has the same inner product as the forward edge. Thus every directed edge has inner product at least

$$
t+\frac{Q}{\sqrt6}-\frac{\sqrt3}{12}|p|^2-\frac25|p|^3-3|p|^4-\frac{627}{100}\rho Q-2\rho E.
$$

To compare these inner products with the defect, set $D_{jk}=\gamma_j\gamma_k+\operatorname{Re}(\overline{w_j}w_k)$. The cyclic area identity $\operatorname{Im}(\overline{w_j}w_{j+1})=(\sqrt3/2)(|p|^2-|q|^2)$ gives the real part $T=\operatorname{Re}(A_0A_1A_2)$ of the quaternion product as

$$
T=-\eta_0\eta_1\eta_2+\sum_j\eta_j D_{j+1,j+2}-\frac{\sqrt3}{2}\Bigl(\sum_j\gamma_j\Bigr)(|p|^2-|q|^2).
$$

Since $d(1,A_j)=\arccos(-\eta_j)$ and $d(A_0A_1A_2,1)=\arccos T$, the parameter $h=\max\{\max_j\eta_j,-T\}$ gives $e=\pi/2+\arcsin h$. Using $\gamma_j=\sqrt{1-\eta_j^2-|w_j|^2}$ to bound the products and inner products in the trace, and combining $h\ge\eta_j$ with $h\ge-T$, gives $|h|<1/5$ and $h\ge E/3+(51/120)|p|^2-\tfrac13((13/5)Q^2+25\rho^2 E)$.

Put $\theta_*=\arccos t$ and $k=c_*\sqrt{2/3}$. Concavity of $x\mapsto\cos(\theta_*+c_*\arcsin x)$ on $[-1/5,1/5]$ gives its tangent bound $\cos(c_*e)\le t-kh$ at zero. The rational bounds $3/5<c_*<61/100$ and $496/1000<k<1/2$, together with $|p|^3\le\rho|p|^2$, $|p|^4\le\rho^2|p|^2$, and $Q^2\le\rho Q$, give a margin of $Q/200+(3/100)(|p|^2+E)$ when substituted into the two estimates. Since $c_*e\in[0,\pi]$ and the round distance is the arccosine of the inner product, this gives a fit at radius $c_*e$. For nonzero perturbations the margin is positive, so the maximum edge error of the same potential gives a smaller radius. At zero perturbation all three rim gains equal $I$ and $e=\pi/2$. The lower bound follows from [@thm-appe-round-quaternion-k4-bounds].

For Part 2, write $\theta=(a,b,c)$ and express each imaginary part as $s_jd_j$, where $s_j=\sin\theta_j\in[499/500,1]$ and $d_j$ is a unit imaginary quaternion. The three pairwise chord lengths are bounded by $u,v,u+v$, respectively. The angular bound gives $u+v<1$, so the pairwise inner products are positive and $m=\sum_j s_jd_j$ has positive inner product with each $d_j$. Conjugate by a unit quaternion taking $m/\|m\|$ to $I$. The imaginary parts then have positive $I$ components, and the scalar perturbations satisfy $|\eta_j|=|\cos\theta_j|\le\rho$. Write $x_j$ for the complex projection of the rotated $d_j$ onto the $J,IJ$ plane. Then $w_j=s_jx_j$ and $\sum_j s_jx_j=0$.

Put $S=\sum_j s_j$. Weighted variance gives $S\sum_j s_j|x_j|^2=\sum_{j<k}s_js_k|x_j-x_k|^2$. Since $s_j\le1$, we have $\sum_j|w_j|^2\le\sum_j s_j|x_j|^2$, and each $s_js_k/S\le 1/(2+499/500)$. Projection cannot increase chord lengths. The three-point Fourier expansion of the zero-sum sequence $w_j$ has only the two nonconstant modes, so Parseval's identity gives

$$
3(|p|^2+|q|^2)=\sum_j |w_j|^2\le\frac{u^2+v^2+(u+v)^2}{2+499/500}\le3(3/50)^2.
$$

Part 1 now applies, and inverse conjugation preserves both fit conclusions for the same potential. If $p=q=0$ and $\eta=0$, all three axial angles are $\pi/2$ and all three rotated imaginary directions equal $I$. The original directions therefore coincide, which forces $u=v=0$ since $u,v\in[0,\pi/2)$. At the center the original assignment is the cyclic quarter turn of [@thm-appe-round-quaternion-k4-bounds]. The full proof is checked by the Lean kernel.
:::

**Manual derivation.** The angular region contains the full closed $3.4^\circ\times4.2^\circ$ box, with each of $a,b,c$ within $3.4^\circ$ of $90^\circ$ and $0\le u,v\le4.2^\circ$ for arbitrary azimuth $w$. The left side of the angular inequality is at most $6(7\pi/300)^2<\frac{4497}{500}(3/50)^2$ on this box. Hub normalization and conjugation preserve the ratio, so the quarter-turn class is a strict local maximizer. In the compact space of hub-normalized gains, the complement of the interior of this neighborhood is the compact set that remains to be treated in Lean. See [@prob-appe-round-quaternion-k4-optimal-constant].

::: {.problem #prob-appe-round-quaternion-k4-optimal-constant title="The Optimal Universal Coefficient for Round Unit-Quaternion Gains on $K_4$"}
Let $C_{\mathrm{SU}(2)}(K_4)$ be the supremum, over all round unit-quaternion gain assignments on $K_4$ with positive triangle defect, of the minimum fit radius divided by the maximum triangle defect. The uniform bound and the quarter-turn instance in [@thm-appe-round-quaternion-k4-bounds] give $c_*\le C_{\mathrm{SU}(2)}(K_4)\le4/5$. By [@thm-appe-round-quaternion-equal-rim-minimax], the equal cyclic rim family attains its largest ratio $c_*$ only at the quarter turn. The strict bound extends to an angular neighborhood of the quarter turn by [@thm-appe-round-quaternion-local-sharpness]. Proving $C_{\mathrm{SU}(2)}(K_4)=c_*$ for unrestricted gains remains an open formalization problem.
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

For half comparisons, the return phase measures another effect involving three points. See [Where Curvature Comes From](appendix-e-s08-s01-s04-curvature.md#sec-appe-curvature-from-half-comparison).

The chordal Banach strata, real $L_1$, Hilbert, causal three-tree, and linear-filling results are collected in [Appendix E.8.1.8](appendix-e-s08-s01-s08-chordal-banach-exact-strata.md#sec-appe-chordal-banach-exact-strata).

For the reversal of the inner-product and real $L_1$ coefficients, the circle coefficient on path powers, and the tangent lower and cap upper bounds for $\mathrm{SU}(2)$, see [Appendix E.8.1.9](appendix-e-s08-s01-s09-hilbert-reversal-circle-su2.md#sec-appe-hilbert-reversal-circle-su2).

The global Hilbert reconstruction bound for arbitrary finite chordal graphs and its finite-clique improvements are in [Appendix E.8.1.10](appendix-e-s08-s01-s10-hilbert-global-sub-jung.md#sec-appe-hilbert-global-sub-jung).
