# 30.2 "$P$ Is a Field, $NP$ Is a Line"—The Witness Thread, the Guiding Field, and Hairy-Ball Curl {#sec-coda-p-is-field-np-is-line}

> **Author's Epigraph**: *"P is a field; NP is a line."*（“P是场, NP是线”）

Here a “line” stands for a checkable witness and a “field” for structure guiding efficient solution (`MODEL`). The standard classes satisfy $P\subseteq NP$: efficiently solvable problems also have polynomial-time verifiers, so the two are not disjoint geometric categories. “A line without a field” interprets the difficulty of finding efficient algorithms; it does not define every $NP$ problem.

## 30.2.1 Why "$NP$ Is a Line" (`有线无场，横截面为零的见证丝`) {#1-why-np-is-a-line-有线无场横截面为零的见证丝}

For a decision problem, the $NP$ condition is that an input $w$ is a yes-instance exactly when some witness $y$, of length bounded by a polynomial in the input encoding length, is accepted by a uniform deterministic verifier $V(w,y)$. Verification time must also be polynomially bounded in the input and witness encoding lengths (see [Cook's problem description, pp. 1–3](https://www.claymath.org/wp-content/uploads/2022/06/pvsnp.pdf)). Drawing this checking process as a polygonal thread is the geometric analogy (`MODEL`):

$$
\mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
$$

- **Verification along the thread**: Costs include reading the input and witness encodings and performing each local check. If check $i$ costs $c_i$, the checks contribute $\sum_{i=1}^k c_i$, which is $O(k)$ only when each cost is uniformly bounded. Counting segments alone proves no polynomial bit complexity. Formal proof terms can also be pictured as threads, but arbitrary proof terms have no uniform linear guarantee here on encoding length, type checking, or reduction cost, so this analogy does not place them within the same $NP$ verification argument;
- **Search without a field**: Efficient witness checking does not automatically supply an efficient search method; it does not rule one out either. A “zero-cross-section thread” expresses the author's picture of unguided search, not a discrete complexity lower bound or a claim that every $NP$ problem is hard.

::: {.viz src="timeless-causal-crystal" preset="wilderness" height="500"}
**One field: straight along the thread, circling off it.** The plane carries a single autonomous field $\mathbf{F} = g(\tilde y)\bigl(1, h'(x)\bigr) + \bigl(1 - g(\tilde y)\bigr)\mathbf{F}_{\mathrm{swirl}}$, with $\tilde y = y - h(x)$, $g(\tilde y) = e^{-\tilde y^2/\varepsilon^2}$, and $\mathbf{F}_{\mathrm{swirl}}$ vanishing on the thread. The probe that starts at $S_0$ exactly on the cyan witness thread $y = h(x)$ runs along it to $S^*$; three magenta probes that start only a little off it, but outside the channel $|\tilde y| < \varepsilon$, are caught by the first vortex under the same integrator and never reach the target. A schematic model of “a thread without a field” (`MODEL`), not a complexity lower bound.
:::

## 30.2.2 Why "$P$ Is a Field" (`弃线造场，局部切面处处对齐全局`) {#2-why-p-is-a-field-弃线造场局部切面处处对齐全局}

In our geometric interpretation (`MODEL`), geometric or algebraic structure used by some polynomial-time algorithms is pictured as a **guiding field**, such as a convex gradient flow $\mathbf{F}=-\nabla V$. This is neither the definition of $P$ nor a necessary condition for membership. Even a smooth or curl-free field requires an analysis showing that it can be computed efficiently, reaches the required precision, and terminates in polynomially many steps. The following classical algorithms offer concrete points of comparison:

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="Literature Note on Interior-Point Linear Programming, Pfaffian Planar Matching, and the Hairy Ball Theorem"}
**Literature result, not formalized in this book.** The three classical results below illustrate field construction and topological curl. Algorithms, geometric extensions, and complexity retain their literature status; the actual suppliers and boundaries of the conditional Pfaffian sign identity are explained in [@rem-ch30-rotation-pfaffian-boundary]:

1. **Karmarkar's Interior-Point Algorithm for Linear Programming (N. Karmarkar, *Combinatorica* **4**, 373–395, 1984)**: Whereas Dantzig's simplex method traverses 1D boundary edges and takes $2^n$ steps on worst-case Klee–Minty (1972) deformed cubes, Karmarkar's algorithm enters the interior of the polytope and follows a smooth logarithmic-barrier gradient field to reach the optimum in polynomial time;
2. **Kasteleyn's Pfaffian Planar-Matching Theorem (P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961)**: Counting perfect matchings in general bipartite graphs (computing the permanent) is `#P`-complete (L. G. Valiant, 1979). For a finite planar graph with nonnegative edge weights $w_e$, the classical method uses a Kasteleyn orientation to form a skew-symmetric weighted adjacency matrix $A_K^T=-A_K$ in which all actual perfect-matching terms in the Pfaffian expansion have the same coefficient sign. Thus the weighted perfect-matching partition function is $Z=\sum_M\prod_{e\in M}w_e=|\operatorname{Pf}(A_K)|$, and Cayley's identity $[\operatorname{Pf}(A_K)]^2=\det A_K$ gives $Z=\sqrt{\det A_K}$. The sign mechanism aligns matching coefficients; nonedges have zero matrix entries. Exact evaluation in polynomial time for nonnegative rational weights encoded in binary is a literature result. If no perfect matching exists, $Z=0$; handling general planar graphs also includes connected components and the zero case caused by an odd-order component. A modern account is D. Cimasoni and N. Reshetikhin (2007), [*Dimers on surface graphs and spin structures. I*](https://arxiv.org/html/math-ph/0608070v2), Section 5.1, Theorem 5.1 and its matching expansion, specialized to the sphere;
3. **Poincaré–Brouwer Hairy Ball Theorem (H. Poincaré, 1885; L. E. J. Brouwer, 1912)**: Because the 2-sphere has Euler characteristic $\chi(S^2) = 2 \neq 0$, every continuous tangent vector field on $S^2$ must vanish at least at one point (a topological vortex).
:::

::: {.viz src="timeless-causal-crystal" preset="field" height="500"}
**A field: a slope everywhere.** The cyan flow lines start from all over the sphere; each looks only at the slope underfoot, and each flows to the target. The amber line is the chosen one, and the field vanishes at the opposite point (the grey ring). Reading it as a "field" is this book's interpretation (`MODEL`).
:::

### 30.2.2.1 From Actual Vertex Rotations to Face-Odd Orientations: A Finite Combinatorial Prerequisite {#sec-ch30-rotation-parity}

The full planar-matching result above has geometric, combinatorial, algebraic, and algorithmic parts. We first isolate a finite combinatorial question: given the cyclic order of the original graph's edges at each vertex, can one choose a single edge orientation for which every face and every even simple cycle whose deletion leaves a perfect matching has an odd number of opposing darts? A dart is an actual edge with a direction. A bridge, for example, has two reverse darts; a facial traversal that goes out and back along it must count both occurrences. An edge set alone would lose this information.

The results below derive the required sides from vertex rotations and an integer counting condition. Here “sphere rotation” means only the finite data satisfying the Euler condition specified below; obtaining these data from a geometric embedding is a separate step.

::: {.definition #def-ch30-actual-rotation title="Actual Darts, Vertex Rotations, and Complete Face Orbits" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Rotation D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.facePerm D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Face D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face"}
Let $V$ be an arbitrary finite type with decidable equality, and let $G$ be a simple undirected graph on $V$ with decidable adjacency. Write $D=G.\mathrm{Dart}$ for its actual dart type: a dart $d=(u,v)$ requires $G.\mathrm{Adj}(u,v)$. Write $E=G.\mathrm{edgeSet}$ for the type of actual unordered edges, $e(d)=\{u,v\}\in E$, and $\alpha(d)=(v,u)$.

A vertex rotation $R$ is a permutation $\rho$ of $D$ such that, for all $d,t\in D$,

$$
\bigl(\exists n\in\mathbb Z,\ \rho^n(d)=t\bigr)
\quad\Longleftrightarrow\quad d.\mathrm{fst}=t.\mathrm{fst}.
$$

The facial successor first reverses and then rotates: $\phi(d)=\rho(\alpha(d))$. The face type $F$ is the quotient of $D$ by the orbit relation of $\phi$: $d\sim t$ exactly when $\phi^n(d)=t$ for some $n\in\mathbb Z$. Write $f(d)$ for the class of $d$. Every orbit belongs to $F$, including singleton orbits. The rotation data themselves include no connectedness, geometric realization, or Euler equation.
:::

All three theorems below assume that $G$ is connected, $D$ is nonempty, and the following Euler equation holds **in the integers**:

$$
(|V|:\mathbb Z)-(|E|:\mathbb Z)+(|F|:\mathbb Z)=2.
$$

Each cardinality is cast to an integer before subtraction; no truncated natural-number subtraction is used. In particular, the edgeless one-vertex graph fails the nonempty-dart hypothesis and lies outside these three theorems.

::: {.definition #def-ch30-face-boundary title="Binary Facial Boundary and Opposition Count" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.boundary D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.faceOpposition"}
Write $\mathbb F_2=\mathbb Z/2\mathbb Z$. For a face function $x:F\to\mathbb F_2$, the linear boundary map $B:\mathbb F_2^F\to\mathbb F_2^E$ chooses one representative dart $d_e$ for each unordered edge and sets

$$
(Bx)(e)=x(f(d_e))+x(f(\alpha(d_e))).
$$

For any dart function $\varepsilon:D\to\mathbb F_2$, define the facial opposition count by

$$
\operatorname{opp}_F(\varepsilon,f)=\sum_{\substack{d\in D\\f(d)=f}}\varepsilon(d).
$$

If $\varepsilon(\alpha(d))=1+\varepsilon(d)$, it encodes an edge orientation: $\varepsilon(d)=0$ means that the orientation follows $d$, and $1$ means that it opposes $d$. The face count includes every actual dart in the complete orbit. Both darts of a bridge count separately even when they belong to the same face. Write $\mathcal C(G)\subseteq\mathbb F_2^E$ for the linear span of the unordered-edge indicators of all actual simple cycles.
:::

::: {.theorem #thm-ch30-face-cycle-exact title="Facial Boundaries Equal the Actual Cycle Space" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact"}
For any finite $V$, connected simple graph $G$, and vertex rotation $R$ as above, assume $D\ne\varnothing$ and the integer equation $|V|-|E|+|F|=2$. Then all three statements hold:

1. For every $x:F\to\mathbb F_2$ and $d\in D$, $(Bx)(e(d))=x(f(d))+x(f(\alpha(d)))$.
2. For every $x:F\to\mathbb F_2$, $Bx=0$ if and only if some $c\in\mathbb F_2$ satisfies $x(f)=c$ for every $f\in F$.
3. $\operatorname{im}B=\mathcal C(G)$.
:::

::: proof
The two representatives of an unordered edge differ only by reversal, so their shore-value sum is independent of the choice. Zero boundary equates the facial values on reverse darts. Facial succession and the vertex rotation propagate this equality around a vertex, and connectedness propagates it to all faces. The kernel therefore consists of constants and has dimension $1$. Reindexing a dart sum by the facial successor shows that every facial boundary has even incidence at every vertex, placing it in the existing actual cycle space. Rank–nullity gives $\dim\operatorname{im}B=|F|-1$, whereas the connected graph's cycle space has dimension $|E|-|V|+1$. The integer Euler equation makes these dimensions equal. The full proof is checked by the Lean kernel.
:::

Next, take an actual closed walk $p$ in the original graph, based at $a$. A simple cycle satisfies the formal predicate $p.\mathrm{IsCycle}$: no vertex repeats except the starting vertex at closure, and the zero-length walk and degenerate out-and-back traversal of one edge are excluded. Write $C(p)$ for its vertex support, $E(p)$ for its actual unordered-edge set, $\mathcal D(p)$ for its ordered dart list, and $p^{\mathrm{rev}}$ for the reversed walk. Write $G[S]$ for the subgraph induced on a vertex set $S$. Its vertices carry the condition of belonging to $S$; $v.\mathrm{val}$ denotes the original vertex after forgetting this condition. An even simple cycle is called *nice* when deleting $C(p)$ from the original graph leaves an actual induced graph with a perfect matching.

::: {.theorem #thm-ch30-cycle-face-sides title="Actual Simple-Cycle Sides, Regional Euler Identities, and Matching Restrictions" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides"}
For the finite $V$, connected simple graph $G$, and rotation $R$ above, assume $D\ne\varnothing$ and the integer equation $|V|-|E|+|F|=2$. For every $a\in V$ and actual simple cycle $p:a\leadsto a$, there exist a face function $x:F\to\mathbb F_2$ and vertex sets $I,J\subseteq V$ satisfying all the following statements.

1. The face sets $F_1=\{f\in F:x(f)=1\}$ and $F_0=\{f\in F:x(f)=0\}$ are nonempty complements, and $Bx=\mathbf1_{E(p)}$.
2. There is a walk $q=p$ or $q=p^{\mathrm{rev}}$ such that, for every actual dart $d$,

   $$
   \begin{aligned}
   &x(f(d))=1\ \land\ x(f(\alpha(d)))=0\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q),\\
   &x(f(d))=0\ \land\ x(f(\alpha(d)))=1\\
   &\quad\Longleftrightarrow\ d\in\mathcal D(q^{\mathrm{rev}}).
   \end{aligned}
   $$

3. For every $v\in V$, $v\notin C(p)$ if and only if $v\in I\cup J$, and $I\cap J=\varnothing$. Every actual dart with $d.\mathrm{fst}\notin C(p)$ satisfies

   $$
   \begin{aligned}
   d.\mathrm{fst}\in I&\ \Longleftrightarrow\ x(f(d))=1,\\
   d.\mathrm{fst}\in J&\ \Longleftrightarrow\ x(f(d))=0.
   \end{aligned}
   $$

   For all $v\in I,w\in J$, $\neg G.\mathrm{Adj}(v,w)$.
4. For each pair $(S,b)=(I,1)$ or $(J,0)$, there is a connected subgraph $H_S$ of the original graph with vertex set exactly $C(p)\cup S$. For every actual dart $d$,

   $$
   \begin{aligned}
   &H_S.\mathrm{Adj}(d.\mathrm{fst},d.\mathrm{snd})\\
   &\quad\Longleftrightarrow\ e(d)\in E(p)\\
   &\qquad\lor\bigl(x(f(d))=b\ \land\\
   &\qquad\qquad x(f(\alpha(d)))=b\bigr).
   \end{aligned}
   $$

   Let $E_S$ be this subgraph's actual unordered-edge set, and $E_S^\circ=E_S\setminus E(p)$. Both identities hold in $\mathbb Z$:

   $$
   \begin{aligned}
   |C(p)\cup S|-|E_S|+|F_b|&=1,\\
   |S|-|E_S^\circ|+|F_b|&=1.
   \end{aligned}
   $$

5. Let $U=V\setminus C(p)$, and let $\bar G=G[U]$ be the actual vertex-deleted complement. For any perfect-matching subgraph $M$ of this same graph $\bar G$, and every $S\in\{I,J\}$, put $S'=\{u\in U:u.\mathrm{val}\in S\}$. There is a perfect-matching subgraph $N$ of $\bar G[S']$ such that, for all its vertices $v,w$,

   $$
   \begin{aligned}
   &N.\mathrm{Adj}(v,w)\\
   &\quad\Longleftrightarrow\ M.\mathrm{Adj}(v.\mathrm{val},w.\mathrm{val}).
   \end{aligned}
   $$

   In this case both $|I|$ and $|J|$ are even.
:::

::: proof
By [@thm-ch30-face-cycle-exact], the cycle's edge indicator has a facial preimage $x$. Its nonzero boundary excludes constant labels, so both face values occur. All incident facial values at an off-cycle vertex agree, determining $I,J$; an original edge cannot join off-cycle vertices of different labels. The regional edge condition retains the cycle edges and edges with both shores on the chosen side. Even a chord whose endpoints both lie on the cycle must be excluded from the opposite region. Following an original graph path until it first reaches the cycle proves that each selected region is connected.

Map functions supported on one facial side into the cycle space of its region. The connected cycle-rank bound gives an Euler inequality for each side. The vertex and edge union/intersection counts, together with the global integer Euler equation, force equality on both sides. A simple cycle has equally many edges and vertices; removing both counts gives the second regional identity. At each cycle vertex, its two actual cycle edges determine two label changes in the vertex rotation, giving the direct boundary equivalences for $q$ and $q^{\mathrm{rev}}$. Finally, the absence of cross edges keeps each edge of the given $M$ on one side. Restricting that same matching to both sides and applying perfect-matching parity makes both side cardinalities even. The full proof is checked by the Lean kernel.
:::

Both facial sides are nonempty, but an off-cycle vertex side may be empty. The theorem requires no strictly interior vertex on either side and assumes no interior parity. Each region is a connected subgraph selected by its actual edges; these conclusions do not construct a topological disk.

::: {.theorem #thm-ch30-face-odd-nice-cycle-orientation title="One Orientation Is Odd on All Faces and All Nice Even Cycles" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.face_odd_nice_cycle_orientation"}
Let $V$ be any finite type with decidable equality, $G$ a connected simple graph with decidable adjacency, and $R$ its vertex rotation. If $D\ne\varnothing$, $|V|$ is even, and $|V|-|E|+|F|=2$ in $\mathbb Z$, there exists **one** function $\varepsilon:D\to\mathbb F_2$ satisfying

$$
\begin{aligned}
&\forall d\in D,\quad \varepsilon(\alpha(d))=1+\varepsilon(d),\\
&\forall f\in F,\quad \operatorname{opp}_F(\varepsilon,f)=1.
\end{aligned}
$$

Furthermore, for every $a\in V$, every actual even-length simple cycle $p$ based at $a$, and every perfect-matching subgraph $M$ of the actual complement $G[V\setminus C(p)]$,

$$
\sum_{d\in\mathcal D(p)}\varepsilon(d)=1\quad\text{in }\mathbb F_2.
$$

The sum counts the dart list. The existential quantifier $\exists\varepsilon$ precedes the universal quantifiers over all cycles and all complement matchings.
:::

::: proof
Start with any edge orientation and record each face's parity defect. Since the facial boundary map has only constants in its kernel, the defects correctable by its transpose are exactly those whose total is zero. The global integer Euler equation and the even vertex count ensure this compatibility condition. Adding the same binary correction to both darts of each edge preserves reversal and makes the opposition count on every facial orbit equal to $1$.

For any given nice even cycle, use one actual side supplied by [@thm-ch30-cycle-face-sides]. Summing the facial opposition counts on that side gives a contribution of $1$ from each selected noncycle edge; the direct boundary equivalence identifies the remaining terms with the dart sum along $q$. The regional Euler identity then gives

$$
\sum_{d\in\mathcal D(q)}\varepsilon(d)
  =|F_1|+|E_I^\circ|=1+|I|\quad\text{in }\mathbb F_2.
$$

The actual restriction of the given complement matching makes $|I|$ even, so the right-hand side is $1$. If $q=p^{\mathrm{rev}}$, the reversal rule changes the sum by the cycle length in $\mathbb F_2$; even length makes this change zero. The single orientation chosen at the outset therefore works for every such cycle and matching. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch30-face-odd-orientation"}
**One orientation, odd on every face and on every nice even cycle.** With its planar rotation the $4 \times 4$ grid has nine square faces and one outer face, and every edge carries one arrow; the number in each square counts the darts against the arrows on one walk around that face, and all of them are odd, the outer face giving $3$. The amber even cycle has ten edges; the six squares on its inner side are pale cyan, the two cyan vertices inside are $I$, the four magenta vertices of the bottom row outside are $J$, and once the cycle is deleted each side has a perfect matching. Along the amber cycle $5$ darts run against the arrows ([@thm-ch30-face-odd-nice-cycle-orientation], [@thm-ch30-cycle-face-sides]). The orientation shown is one instance, solved for by the script and checked on every nice even cycle of this graph.
:::

::: {.remark #rem-ch30-rotation-pfaffian-boundary title="The Boundary Between the Finite Rotation Prerequisite and Full Planar Matching"}
**Applications of existing results and remaining literature boundaries.** The preceding three theorems retain their finite combinatorial hypotheses: an actual vertex rotation, nonempty darts, connectedness, and the integer Euler equation. We now connect actual interlacing, the original Pfaffian convention, and coefficient transport on the same graph. These explanations introduce no composite theorem box.

**From two matchings to rooted even cycles.** Let $X$ be any finite linearly ordered type. The native carrier $\mathcal M(X)$ is [`FixedPointFreeInvolution`](lean:D5/S3/Zeros/Convolution/PerfectMatchingCount.FixedPointFreeInvolution), consisting of permutations satisfying $s(s(x))=x$ and $s(x)\ne x$. For an ordered pair $(s,t)$, actual components are the reflexive transitive closure of the two colors of edges $x\!\leftrightarrow\!s(x)$ and $x\!\leftrightarrow\!t(x)$. Root each component separately at its least vertex $m$, put $r=t\,s$ (apply $s$ first), and use the full integer-power $r$ orbit of $m$ as the first phase. Both matchings exchange the component's two disjoint $r$ orbits. The phase depends on the component minimum, not numerical label parity. The interlacing permutation $q$ follows $s$ in the first phase and $t$ in the other; its predecessor makes the opposite choice. For every such minimum $m$ and every $k\in\mathbb N$,

$$
\begin{aligned}
q^{2k}(m)&=(ts)^k(m),\\
q^{2k+1}(m)&=s((ts)^k(m)).
\end{aligned}
$$

[`rooted_interlacing`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_interlacing) supplies these formulas, equality of the full $q$ cycles with the actual two-color components, the minimum property, and recovery of the original ordered matchings. Interlacing covers the whole component; each step flips phase, so each cycle has even length. The output carrier explicitly requires **both $\forall x,\ q(x)\ne x$ and even support cardinality for every member of $q.\mathrm{cycleFactorsFinset}$**. That finset omits singleton cycles, so the first condition cannot be dropped.

Conversely, root each full cycle of an admissible $q$ at its least vertex $m$ and use its full $q^2$ orbit as the even phase. There set $s(x)=q(x)$ and $t(x)=q^{-1}(x)$; on the other phase swap the choices. Even cycle length makes both successor and predecessor flip phase, including the last-to-first edge. The recovered maps are therefore fixed-point-free involutions. [`rooted_reconstruction`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.rooted_reconstruction) gives these pointwise formulas and $\mathrm{forward}(\mathrm{recover}(q))=q$; the other composite returns the original ordered pair. The actual [`equivalence`](lean:D5/S3/Combinatorics/PerfectMatchings/InvolutionEvenCycles.equivalence) is the `Equiv` definition with these inverse maps, rather than a theorem declaration or an arbitrary cardinality bijection. No nonemptiness or even-cardinality premise is imposed on $X$: on the empty type the maps are the unique empty permutations; on odd cardinalities both carriers are empty. A shared matching edge becomes a genuine two-cycle, $s=t$ gives $q=s$, and a two-cycle recovers coincident mates. Disconnected components have separate roots. Eğecioğlu's incoming-edge color convention (1990, *Ars Combinatoria* **29**, 107–116) is not asserted to equal this outward first-color convention. This structural equivalence proves no weighted sign identity or determinant square. Source audit `29209` remains at 2 unresolved and 0 validated items.

**Keep the original normalized Pfaffian.** Fix $n\in\mathbb N$ and any commutative ring $R$. Pairings in [`P`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.P) are fixed-point-free involutive functions on $\mathrm{Fin}(2n)$. Sort their lower endpoints and place each partner immediately after its lower endpoint to obtain $c(p)$. [`canonical_mate`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.canonical_mate) identifies the adjacent slots as partners. [`listingEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listingEquiv) gives inverse maps between all normalized listings and these pairings: conjugate the consecutive-slot pairing by the listing, then recover that listing canonically. The original [`pfaffian`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian) remains

$$
\operatorname{Pf}(A)=\sum_{\sigma\in L(n)}
\operatorname{sgn}(\sigma)\prod_{i\in\mathrm{Fin}(n)}
A_{\sigma(2i),\sigma(2i+1)},
$$

where each pair in $L(n)$ is increasing and its first endpoints increase, and the integer sign is cast into $R$. There is no division by a factorial or by $2$. The empty listing contributes the empty product $1$. The coefficient is the sign of the **listing permutation**, not of the partner involution. The latter corresponds to native $\mathcal M(\mathrm{Fin}(2n))$ by turning the bijective involutive function into a permutation and forgetting that structure in the inverse direction; both composites preserve the same partner function pointwise.

For normalized $\sigma$, put $p=\mathrm{pairingOfListing}(\sigma)$. Inversions are positions $u<v$ with $\sigma(v)<\sigma(u)$. Count each crossing once by its lower endpoints $a<c<p(a)<p(c)$, and each nesting once by $a<c<p(c)<p(a)$. The actual [`inversionCrossNestEquiv`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversionCrossNestEquiv) sends an inversion to a crossing or to a nesting with a bit in $\mathrm{Fin}(2)$. For two distinct pair slots, a crossing contributes the second–first inversion; nesting contributes that inversion and also the second–second inversion. Thus [`inversion_card_eq_cross_add_two_nesting_card`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.inversion_card_eq_cross_add_two_nesting_card) gives

$$
|\mathrm{Inv}(\sigma)|=|\mathrm{Cross}(p)|+2|\mathrm{Nest}(p)|.
$$

The listing sign is consequently $(-1)^{|\mathrm{Cross}(p)|}$. [`pfaffian_eq_crossing_sum`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.pfaffian_eq_crossing_sum) rewrites the original sum term by term using this coefficient and $\prod_{a<p(a)}A_{a,p(a)}$, counting each paired edge once. This holds for every matrix over every commutative ring, without skew-symmetry, division, or cancellation. The correspondence includes both nesting contributions and the empty case. For an arbitrary listing, [`listing_value_canonical`](lean:D5/S0/Certificates/Combinatorics/NormalizedPfaffian.listing_value_canonical) preserves its signed value when integer unit factors negate on reversal: permuting whole pairs has sign a square, hence $1$, while reversing a pair negates both the permutation sign and its factor.

**Transport on the same actual graph.** Let $V$ now be finite, $G$ a simple graph on $V$, and $e:V\simeq\mathrm{Fin}(2n)$ an enumeration. Actual perfect matchings remain Mathlib $G.\mathrm{Subgraph}$ objects with exactly one neighbor at each vertex. On the complete graph, [`matchingEquiv`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.matchingEquiv) chooses that neighbor as the partner map; its inverse defines adjacency by $p(v)=w$. Transport through $e$ and retain precisely those pairings whose partner edges are actual $G$ edges. These correspond exactly to actual perfect matchings of $G$, without another matching datatype or Pfaffian core.

Let dart bits $\varepsilon:G.\mathrm{Dart}\to\mathbb Z/2\mathbb Z$ satisfy [`Reverses`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.Reverses), meaning $\varepsilon(\bar d)=1+\varepsilon(d)$. The integer units $\delta(d)=(-1)^{\varepsilon(d)}$ then satisfy $\delta(\bar d)=-\delta(d)$. The coefficient $\tau_e(M)$ is the canonical listing sign times the product of $\delta$ on its actual directed matching edges. For an actual simple closed walk $p$, write $C=p.\mathrm{toSubgraph}$. If it alternates with $M$, meaning exactly one of the two distinct cycle edges at each vertex belongs to $M$, [`alternating_cycle_flip`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_flip) gives even length, an actual perfect matching $N=M\mathbin{\triangle}C$, and a perfect matching of the **induced graph obtained by deleting $C$'s vertices from this same $G$**. Every cycle vertex already has its partner inside the cycle, so uniqueness prevents matching edges crossing between inside and outside. Restricting the same $M$ supplies the complement matching. This flip result itself requires no finiteness, embedding, orientation, or weights.

With the enumeration and reversal hypothesis above, [`alternating_cycle_transport`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_transport) proves for this actual flip that

$$
\tau_e(M)\tau_e(N)=-\prod_{d\in p.\mathrm{darts}}\delta(d).
$$

Rotate the cycle vertices once and fix every outside vertex. This permutation has even support cardinality and hence sign $-1$. It sends the matching edges on the cycle to their complementary cycle edges, while retaining the common outside pairing even when labels interleave. Listing normalization identifies the resulting signed value with $\tau_e(N)$. A backward-listed cycle edge contributes two cancelling negative signs; outside units square to $1$. What remains is exactly the actual dart product.

[`NiceOdd`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.NiceOdd) requires $\sum_{d\in p.\mathrm{darts}}\varepsilon(d)=1$ for **every actual even simple closed walk** whose actual induced vertex-deleted complement has a perfect matching. The symmetric difference of two matchings has degree zero or two at every vertex. If they disagree, take an actual alternating simple cycle in that difference. The complement matching above supplies its nice-cycle premise, the dart product is $-1$, and flipping preserves the coefficient while strictly decreasing disagreement edges. Finite induction gives [`niceOdd_matching_tau_eq`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.niceOdd_matching_tau_eq): all actual matching coefficients agree, including shared edges, disconnected graphs, and $M=N$.

**One unit for every weight and coefficient ring.** Give actual undirected edges weights $w:G.\mathrm{edgeSet}\to R$. Let $A_{e,\varepsilon,w}$ have entry $\delta(x,y)w_{\{x,y\}}$ cast into $R$ on actual edges, and zero on nonedges and on the diagonal. Reversal makes it skew-symmetric; the diagonal is explicitly zero even in characteristic $2$. Define $Z(w)$ by summing over actual perfect matchings and multiplying each actual undirected matching edge once. Unsupported pairings have a zero matrix factor. Supported pairings correspond inversely to actual matchings, and canonical pair slots biject with their edges. The original Pfaffian is therefore $\sum_M\tau_e(M)\prod_{a\in M}w_a$. Under `Reverses` and `NiceOdd`, [`weighted_pfaffian_identity`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.weighted_pfaffian_identity) factors out the common coefficient:

$$
\operatorname{Pf}(A_{e,\varepsilon,w})=(u_{e,\varepsilon}:R)\,Z(w),
\qquad u_{e,\varepsilon}\in\mathbb Z^\times.
$$

[`orientationUnit`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.orientationUnit) selects an actual matching's integer unit coefficient when a matching exists and $1$ otherwise. It depends only on the graph, enumeration, and orientation, independently of $R,w$. The formula includes negative and zero weights, rings with zero divisors, and characteristic $2$, with no division. When the vertex set is empty ($n=0$), the unique empty matching gives $1$ on both sides. A nonempty edgeless graph has no perfect matching and belongs to the zero case: all pairing terms vanish and $Z=0$. If additionally $R=\mathbb R$ and all actual edge weights are nonnegative, then $Z\ge0$ and $|u|=1$, so taking absolute values gives $|\operatorname{Pf}(A)|=Z$. This is an application of the signed identity, not a separate absolute-value endpoint theorem.

To combine the finite rotation orientation with this identity, all data must describe **the same actual graph**. Retain connectedness, nonempty darts, and the integer Euler equation; identify the original dart reversal condition with `Reverses`, and supply the actual induced vertex-deleted complement matching for each even simple cycle to the original nice-cycle condition to obtain this `NiceOdd`. Passing from an arbitrary geometric planar embedding to that rotation and its complete face orbits, graphs outside the rotation hypotheses, the full Cayley determinant-square identity `FullCayley`, the $\sqrt{\det A}$ formulation, exact rational algorithms and bit complexity, and `#P`-completeness of general bipartite counting remain separate obligations; the latter claims retain their literature status under [@rem-ch30-karmarkar-kasteleyn-literature]. Source audit `29266` retains 10 validated and 9 unresolved items. The conditional signed identity does not discharge these residual obligations.
:::

::: {.figure src="ch30-alternating-flip"}
**Flip an alternating cycle: the two matchings differ only by the dart signs on it.** The left panel shows two perfect matchings of the same $2 \times 3$ grid: the cyan $M$ is the three vertical edges, the magenta $N$ the horizontal edges $01$, $34$ together with the shared vertical edge $25$. The edges where they differ form exactly the amber alternating cycle $0 \to 1 \to 4 \to 3$, and flipping it turns $M$ into $N$. On the right every edge carries an arrow; walking the cycle, a dart along its arrow counts $\delta = +1$ and one against it $-1$, and the four $\delta$ multiply to $-1$. By [`alternating_cycle_transport`](lean:D5/S3/Combinatorics/PerfectMatchings/AlternatingCyclePfaffian.alternating_cycle_transport), $\tau(M)\tau(N) = -\prod\delta = +1$: the two matchings have the same coefficient. The arrows are an orientation odd on all three faces ([@thm-ch30-face-odd-nice-cycle-orientation]); the graph and the coefficients are an instance computed by the script.
:::

The algorithmic and geometric extensions in [@rem-ch30-karmarkar-kasteleyn-literature] retain their literature boundaries; the conditional matching identity above has exact formal suppliers. Another discrete problem admitting precise mathematics on both the "field" and the "line" sides is coloring a graph's vertices.

Start with an odd cycle, the pentagon $C_5$: vertices $0, 1, 2, 3, 4$, edges $01, 12, 23, 34, 40$. Paint the vertices with the colors $c = (0, 1, 0, 1, 2)$; no two neighbors share a color. Read the color as a height, and this is a three-level field on the vertices. Now let every edge point towards its higher-colored end:

$$
0 \to 1, \qquad 2 \to 1, \qquad 2 \to 3, \qquad 3 \to 4, \qquad 0 \to 4 .
$$

Neighbors have different colors, so every edge receives a direction. Walking along the arrows, the color rises strictly at every step, so a thread visits each level at most once: three colors, at most three vertices on any thread. The longest thread here is $2 \to 3 \to 4$, with exactly three. **The field puts a ceiling on the length of every line.**

Conversely, given only the arrows, can we recover a field? Let $h(v)$ be the number of edges on the longest thread that starts at $v$ and follows the arrows:

$$
h = \bigl(h(0), h(1), h(2), h(3), h(4)\bigr) = (1, 0, 2, 1, 0) .
$$

::: {.figure src="ch30-color-orientation"}
**The field fixes the threads, and the threads measure out a field.** The same pentagon $C_5$, its vertices placed by height on three levels. On the left the height is the color $c = (0, 1, 0, 1, 2)$, every arrow points up, and the longest thread is the cyan $2 \to 3 \to 4$, with three vertices. On the right are the same arrows with the vertices placed by $h = (1, 0, 2, 1, 0)$: every arrow points down, and $h$ is again a three-level coloring ([@thm-ch30-gallai-roy]).
:::

For every arrow $u \to v$, putting this step in front of the longest thread from $v$ gives a longer thread from $u$, so $h(u) > h(v)$. Thus $h$ drops along every arrow, neighbors always get different values of $h$, and $h$ is again a three-coloring (a different one from $c$: the arrows point up in $c$ but down in $h$). **The lines measure out the field.** Only one thing can go wrong in this step: if the arrows close up into a cycle, "the longest thread starting at $v$" runs round in circles. In graph theory this round trip is called the Gallai–Hasse–Roy–Vitaver theorem ([@rem-ch30-coloring-complexity-literature]). The module `D5/S3/Combinatorics/Graph/Walks/GallaiRoy` freezes a version of it, starting with the definitions of orientation and directed path:

::: {.definition #def-ch30-orientation-directed-path title="Orientations and directed paths of a graph" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsOrientation D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsDirectedPath"}
Let $V$ be a type, $G$ a simple graph on $V$ (Mathlib's `SimpleGraph V`: a symmetric adjacency relation without loops), and $o$ a binary relation on $V$. When $o(u, v)$ holds we say there is an **arc** from $u$ to $v$ and write $u \to v$.

1. $o$ is an **orientation** of $G$ (`IsOrientation G o`) if both of the following hold: for all $u, v$ adjacent in $G$, at least one of $o(u, v)$ and $o(v, u)$ holds (both may hold); for all $u, v$, $o(u, v)$ implies that $u$ and $v$ are adjacent in $G$.
2. Let $m \in \mathbb{N}$. A map $f : \{0, 1, \dots, m-1\} \to V$ (in Lean, `Fin m → V`) is a **directed path of $o$ with $m$ vertices** (`IsDirectedPath o f`) if $f$ is injective and $o\bigl(f(i), f(i+1)\bigr)$ holds for every natural number $i$ with $i + 1 < m$.
:::

This notion of orientation is looser than the textbook one: an edge may carry arcs in both directions. A directed path, on the other hand, must have pairwise distinct vertices, so going round a directed cycle again and again does not produce ever longer paths; and $m$ counts vertices, not edges.

::: {.theorem #thm-ch30-gallai-roy title="Gallai–Hasse–Roy–Vitaver theorem: $k$-colorable if and only if some orientation has no directed path with more than $k$ vertices" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation"}
Let $V$ be a finite type, $G$ a simple graph on $V$, and $k \in \mathbb{N}$. The following are equivalent:

1. $G$ is $k$-colorable (Mathlib's `G.Colorable k`): there is a map $c : V \to \{0, 1, \dots, k-1\}$ with $c(u) \neq c(v)$ for all $u, v$ adjacent in $G$;
2. there is an orientation $o$ of $G$ ([@def-ch30-orientation-directed-path]) such that $m \le k$ for every $m \in \mathbb{N}$ and every directed path of $o$ with $m$ vertices.
:::

::: proof
**From a coloring to an orientation.** Given a coloring $c$, let $o(u, v)$ hold exactly when $u, v$ are adjacent and $c(u) < c(v)$: every edge points towards its higher-colored end. Neighbors have different colors, so every edge receives exactly one direction, and every arc is an edge. Along a directed path $f$ with $m \ge 1$ vertices the color rises strictly at each step, so $i \mapsto c(f(i))$ is a strictly monotone map from $\{0, \dots, m-1\}$ to $\{0, \dots, k-1\}$, hence injective, and $m \le k$; for $m = 0$ there is nothing to prove.

**From an orientation to a coloring.** Let $o$ be an orientation whose directed paths all have at most $k$ vertices. It may contain directed cycles and two-way edges, so the proof first deletes arcs: among the relations $D$ contained in $o$ along which one can never return to the starting point in one or more steps, it takes one that is maximal under inclusion. Since $V$ is finite there are only finitely many binary relations on $V$, and the empty relation belongs to the family, so a maximal one exists; Lean proves that it exists without constructing it. A chain $v_0 \to v_1 \to \dots \to v_\ell$ along $D$ never repeats a vertex (a repetition would be a cycle), so it is a directed path of $o$ with $\ell + 1$ vertices, and $\ell + 1 \le k$. Let $h(v)$ be the largest number of edges of a $D$-chain starting at $v$ (Lean takes it with `Nat.findGreatest` among $0, \dots, k$); then $h(v) \le k - 1$. If one can walk from $a$ to $b$ along $D$ in one or more steps, placing that walk in front of a longest chain from $b$ gives a longer chain from $a$, so $h(a) > h(b)$. The key step: let $o(u, v)$ with $u \neq v$. If $D(u, v)$, then $h(u) > h(v)$. If not, consider the relation obtained by adding the arc $u \to v$ to $D$. It is contained in $o$ and strictly larger than $D$; were it acyclic, it would contradict the maximality of $D$. So it has a cycle, and that cycle must use the new arc, which means that $D$ already leads from $v$ back to $u$ (in at least one step, since $u \neq v$); hence $h(v) > h(u)$. In both cases $h(u) \neq h(v)$. Every edge of $G$ carries an arc in at least one direction, and adjacent vertices of a simple graph are distinct, so $v \mapsto h(v)$ is a coloring with colors $0, \dots, k-1$. The full proof is checked by the Lean kernel.
:::

The equivalence can be read in three ways.

First, two-way arcs change nothing (a manual derivation). Delete one of the two directions on every edge that carries both; the result is an orientation with exactly one direction per edge, its directed paths are directed paths of the original one, and the bound $k$ still holds. So item 2 of the theorem may just as well be searched for among orientations with exactly one direction per edge.

Second, try $k = 0, 1, 2, \dots$ in turn (a manual derivation). For finite $V$, giving every vertex its own color shows that $G$ is $\lvert V\rvert$-colorable, so there is a least $k$ for which $G$ is $k$-colorable: the chromatic number $\chi(G)$. Directed paths have distinct vertices, so every directed path of an orientation $o$ has at most $\lvert V\rvert$ vertices, and the number $L(o)$ of vertices on a longest one exists. Item 2 of the theorem holds exactly when $\min_o L(o) \le k$, and [@thm-ch30-gallai-roy] holds for every $k$, so items 1 and 2 hold for the same values of $k$ and the least such values agree:

$$
\chi(G) = \min_{o}\, L(o),
$$

the minimum ranging over all orientations of $G$. This is how the graph-theory literature usually states the theorem.

Third, back in this chapter's analogy (`MODEL`): a coloring is a layered field on the vertices, and a directed path is a line that follows the directions. A field with at most $k$ levels exists exactly when the edges can be given directions so that every line has at most $k$ vertices; and the field $h$ built from an orientation reads, at each vertex, "how many steps one can walk from here along the arcs that survive the deletion". Both sides of the theorem, however, assert that some object exists. The theorem trades one kind of witness for another; it provides no way of finding either, and it says nothing about which is easier to find. A given coloring is verified by comparing the two end colors of every edge; how fast a coloring can be found is a different question, taken up in [@rem-ch30-coloring-complexity-literature].

::: {.example #ex-ch30-gallai-roy-orientation-census title="The pentagon, $K_4$ and the Petersen graph: enumerating every orientation and measuring the longest directed path"}
Every number in the table comes from exhaustive enumeration: choose a direction for each edge and find the number of vertices on a longest directed path by depth-first search (directed paths have distinct vertices, as in [@def-ch30-orientation-directed-path]). The Petersen graph is taken with an outer pentagon $0, \dots, 4$, an inner pentagram $5, \dots, 9$ ($5 + i$ adjacent to $5 + ((i + 2) \bmod 5)$), and five spokes ($i$ adjacent to $i + 5$).

| Graph | Vertices / edges | Chromatic number | Orientations with one direction per edge | Vertices on a longest directed path: number of orientations |
| :---: | :---: | :---: | :---: | :---: |
| Pentagon $C_5$ | $5$ / $5$ | $3$ | $32$ | $3$: $10$, $4$: $10$, $5$: $12$ |
| Complete graph $K_4$ | $4$ / $6$ | $4$ | $64$ | $4$: $64$ |
| Petersen graph | $10$ / $15$ | $3$ | $32768$ | minimum $3$, attained $80$ times |

With two-way arcs allowed, $C_5$ has $3^5 = 243$ orientations and the least number of vertices on a longest directed path is still $3$ (attained $20$ times); $K_4$ has $3^6 = 729$ orientations, each containing a directed path with $4$ vertices. For $C_5$ and $K_4$ the program also checks both sides of [@thm-ch30-gallai-roy] for $k = 0, 1, \dots, \lvert V\rvert$ (on the coloring side by enumerating every map $c$). For all three graphs the minimum equals the chromatic number, in agreement with $\chi(G) = \min_o L(o)$ above.

Among the $12$ orientations of $C_5$ whose longest directed path has $5$ vertices, $2$ are directed cycles (one for each sense of rotation). For the directed cycle $0 \to 1 \to 2 \to 3 \to 4 \to 0$, the maximal acyclic sub-relation $D$ of the proof deletes exactly one arc of the cycle (there are $5$ ways, and Lean does not say which); deleting $4 \to 0$ gives $h = (4, 3, 2, 1, 0)$, a five-coloring, as the theorem predicts for $k = 5$.

Two rows can be done by hand. $C_5$ with $k = 2$: suppose every edge has exactly one direction and every directed path has at most $2$ vertices. A vertex with both an incoming and an outgoing arc would have them on two different edges, and its two neighbors would be joined through it into a directed path with $3$ vertices; so every vertex either only sends or only receives. Each arc runs from a sender to a receiver, so around the pentagon the two kinds must alternate, and $5$ is odd: a contradiction. By the first reading the same holds with two-way arcs allowed; this is "the pentagon is not $2$-colorable" translated through the theorem. $K_4$: its four vertices are pairwise adjacent, so with three colors two of them would share a color, and $K_4$ is not $3$-colorable; by the theorem every orientation of $K_4$ has a directed path with at least $4$, hence exactly all $4$, vertices, as all $64$ orientations in the table do. Replacing $K_4$ by the complete graph $K_n$ on $n$ vertices, the same manual derivation shows that every orientation of $K_n$ has a directed path through all of its vertices.
:::

::: {.remark #rem-ch30-coloring-complexity-literature title="The computational complexity of coloring and the history of the theorem (literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** [@thm-ch30-gallai-roy] is an equivalence between two existence statements and says nothing about computational complexity. How hard colorings are to find is recorded in the external literature:

1. Whether a finite graph is $2$-colorable can be decided in linear time: run a breadth-first search in each connected component and color by the parity of the level; two neighbors receive the same color exactly when the graph contains an odd cycle (a graph is $2$-colorable if and only if it has no odd cycle, D. Kőnig, 1936).
2. Given a graph $G$ and a positive integer $k$, deciding whether $G$ is $k$-colorable is $\mathrm{NP}$-complete (R. M. Karp, *Reducibility among combinatorial problems*, 1972); for fixed $k = 3$ it remains $\mathrm{NP}$-complete even for planar graphs of maximum degree at most $4$ (M. R. Garey, D. S. Johnson & L. Stockmeyer, *Theor. Comput. Sci.* **1**, 237–267, 1976). Consequently $3$-coloring has a polynomial-time algorithm if and only if $\mathrm{P} = \mathrm{NP}$, while $\mathrm{P} \neq \mathrm{NP}$ remains an open conjecture ([@conj-p-neq-np]).
3. The equivalence between colorings and orientations was published independently by T. Gallai, M. Hasse, B. Roy and L. M. Vitaver in the 1960s; its special case for complete graphs, that every tournament has a directed path through all of its vertices, was proved earlier by L. Rédei (1934).
:::

## 30.2.3 Hairy-Ball Curl ($\nabla \wedge \mathbf{F}$) as a Geometric Analogy for $P \neq NP$: Why One Line Cannot Hold Up a Field {#3-hairy-ball-curl-f-as-a-geometric-analogy-for-pnp-why-one-line-cannot-hold-up-a-field}

Why is it so difficult to construct such a polynomial-time guiding field for $\mathrm{NP}$-complete problems like 3-SAT? Expressed as a continuous differential-geometric analogy (`MODEL`, intended as geometric intuition rather than a formal proof of [@conj-p-neq-np]):

- A conservative gradient field $\mathbf{F} = -\nabla V$ that slides without frustration to a global minimum satisfies the vanishing exterior-curl condition:

  $$
  \nabla \wedge \mathbf{F} = 0;
  $$

- The author uses three-body clauses $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ to evoke loop frustration. Clause width alone defines neither a continuous configuration manifold nor a vector field or its curl;
- **A line can thread the seam, while a field must tear (`线能穿缝，场必撕裂`)**: this is the author's geometric aphorism about witnesses and guidance. The hairy ball theorem guarantees a zero of a tangent field on specified spheres, not exponentially many zeros or search traps; zero curl does not guarantee easy optimization either. These continuous geometric facts do not directly yield algorithmic lower bounds for 3-SAT.

| Perspective | Core Maxim | Geometric Relation Between Line ($NP$) and Field ($P$) (`MODEL`) | Complexity & Proof-Theoretic Meaning |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field** | **All lines coexisting *are* the field**<br/>(Author's aphorism; resource models in [@rem-ch30-postselection-ctc-literature]) | The satisfying subspace may be zero or contain multiple assignment witnesses; static coexistence does not select or prepare a witness | Describing satisfaction does not account for solution cost; extra resources need separate specification |
| **Finite Observer in the Field** | **Having a line does not yield a field**<br/>(Author's aphorism; standard conjecture [@conj-p-neq-np] is `OPEN`) | Checking witnesses and finding them efficiently are different tasks, and $P\subseteq NP$; zero cross-section and curl are analogies | ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step"***: checking cost depends on encoding and verifier; formal proof checking has its own costs |

This distills the book's philosophy of computation and formal proof into a single couplet: ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step."*** (**“求场难如登天，顺线一步看穿。”**)

::: {.viz src="timeless-causal-crystal" height="640"}
**Interactive laboratory `ORTHO//CAUSAL`**: four scenes on one sphere. The window: two cosines fix the range of the third, and $\det G$ is the squared volume the three vectors span; the pages: on a finite clock all pages exist at once, and conditioning picks one; the field: a gradient flow has a slope everywhere, and the potential it loses equals the dissipation it pays; the thread: amplitude amplification turns only $2\theta$ per step and arrives after about $(\pi/4)\sqrt{N}$ steps. Reading these as “choice”, “pages”, “field” and “thread” is this book's interpretation (`MODEL`); whether $\mathrm{P} \neq \mathrm{NP}$ remains an open problem, and nothing drawn on the page settles it.
:::

---

