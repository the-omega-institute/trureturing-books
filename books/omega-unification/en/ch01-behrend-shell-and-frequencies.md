# Chapter 1 The 19-Point Behrend Shell and Twenty-Two Independent Frequencies {#sec-ou-ch01}

If someone tells you they intend to interrogate gauge coupling unification, three chiral generations, quark flavor mixing, and four-dimensional Regge gravity using a single small sphere carrying only nineteen integer points, your healthy instinct should be immediate skepticism. Feynman's classic response to any grand claim was blunt: **write down the coordinates, calculate every edge length, and show what the object can—and cannot—actually do.**

Let us put this sphere on the table and dissect it down to the last integer. Why pick the nonnegative octant of the sphere $x_1^2 + x_2^2 + x_3^2 = 867 = 3 \times 17^2$? It is not a lucky guess, but the **smallest integer shell** that clears three sharp arithmetic-geometric thresholds at once:

1. **Strict convexity of Behrend shells:** No three distinct integer points on a Euclidean sphere $x_1^2 + x_2^2 + x_3^2 = R$ can form a nontrivial three-term arithmetic progression $A + C = 2B$, because the midpoint of any chord lies strictly inside the ball. This anti-3AP rigidity makes integer shells classic carriers for combinatorial number theory and finite harmonic sampling.
2. **The third-order central phase threshold $R = 3m^2$:** Transporting a spin-$\frac{1}{2}$ state around the shortest great-circle arcs of a triangle $A, B, C$ on $S_R$ produces a normalized holonomy phase $h = z / |z|$ with $z = R(R + A\cdot B + B\cdot C + C\cdot A) + \det(A, B, C)\sqrt{-R}$, so $h^2 = z / \bar{z} \in \mathbb{Q}(\sqrt{-R})$. Generating the exact third-order phase $\omega = e^{2\pi i/3}$ around a finite closed polygon requires $\omega^2 \in \mathbb{Q}(\sqrt{-R})$, forcing $R = 3m^2$ (`ARGUED`). The earlier 9-point shell $R = 17$ (permutations of $(0, 1, 4)$ and $(2, 2, 3)$) is therefore algebraically barred from producing an exact third-order shortest-arc holonomy.
3. **The co-chiral Chern-number threshold $m = 17$:** Along the sequence $R = 3m^2$, smaller nontrivial shells up through $m = 15$ ($R = 675$) violate the triangle inequality on every outer-to-inner triple of squared chord lengths ("longest squared chord strictly exceeds the sum of the other two"), preventing hopping amplitudes proportional to squared chord lengths from cancelling and locking the top eigenline Chern number to zero. Next, $m = 16$ ($R = 768$) has only the single pole $(16, 16, 16)$ in the nonnegative octant. At **$m = 17$ ($R = 867$)**, the outer orbit $(1, 5, 29)$ reaches the inner orbit $(13, 13, 23)$ along squared chord lengths $(244, 724, 804)$, which satisfy the triangle inequality ($244 + 724 = 968 > 804$) for the first time, permitting hopping amplitudes proportional to squared chord lengths to cancel into three co-chiral zero modes alongside exact $e^{2\pi i/3}$ loop holonomy (`CERT / MODEL`).

Choosing this 19-point shell as our common testbed is a **modeling choice (`MODEL`)**. Once chosen, however, every combinatorial count, Galois independence proof, projective heap law, and rational Gram obstruction on it becomes rigid mathematics.

## 1.1 Integer Anatomy of the 19-Point Behrend Shell {#sec-ou-1-1}

We begin by fixing the combinatorial skeleton that recurs throughout the rest of the monograph.

::: {.definition #def-ou-ch01-behrend-shell title="The 19-Point Behrend Shell of Squared Radius 867 and Its Arc Spectrum"}
Set $R = 867 = 3 \times 17^2$. The **19-point Behrend shell** is the set $V_{19}$ of all nonnegative integer solutions to

$$
x_1^2 + x_2^2 + x_3^2 = 867 \qquad (x_1, x_2, x_3 \in \mathbb{Z}_{\ge 0}).
$$

Under the cyclic coordinate permutation $\sigma(x_1, x_2, x_3) = (x_2, x_3, x_1)$, the set $V_{19}$ decomposes into one fixed pole and six cyclic orbits of length $3$ ($1 + 6 \times 3 = 19$ vertices):

- **Fixed pole ($1$ vertex):** $(17, 17, 17)$;
- **Six cyclic $3$-point orbits ($18$ vertices):**
  1. $\{(1, 5, 29),\; (5, 29, 1),\; (29, 1, 5)\}$ and $\{(1, 29, 5),\; (29, 5, 1),\; (5, 1, 29)\}$ ($6$ outer vertices);
  2. $\{(7, 17, 23),\; (17, 23, 7),\; (23, 7, 17)\}$ and $\{(7, 23, 17),\; (23, 17, 7),\; (17, 7, 23)\}$ ($6$ middle vertices);
  3. $\{(11, 11, 25),\; (11, 25, 11),\; (25, 11, 11)\}$ ($3$ sub-inner vertices);
  4. $\{(13, 13, 23),\; (13, 23, 13),\; (23, 13, 13)\}$ ($3$ inner vertices).

Retaining every unordered pair $\{A, B\} \subset V_{19}$ whose squared Euclidean chord length satisfies $d^2 = \|A - B\|^2 \le 804$ yields the shell graph $G_{19} = (V_{19}, E_{135})$: it has exactly **$135$ edges** (out of $\binom{19}{2} = 171$ total pairs, excluding the $36$ longest cross-octant chords) and **$529$ triangles** (vertex triples with all three edges in $E_{135}$). The $135$ edges take exactly **$23$ distinct squared chord lengths**:

$$
\mathcal{J}_{23} = \{12, 32, 52, 56, 68, 72, 136, 152, 172, 200, 216, 224, 244, 292, 296, 372, 392, 504, 512, 544, 632, 724, 804\},
$$

defining the **$23$ central arc angles** (native shell frequencies)

$$
\theta_j := \arccos\!\left(1 - \frac{j}{1734}\right) \in \left(0, \frac{\pi}{2}\right) \qquad (j \in \mathcal{J}_{23}).
$$

:::

Grouping the seven cyclic orbits by vertex degree exposes the layered geometry of $G_{19}$ at a glance (`CERT`):

| Orbit Representative | Vertices | Degree in $G_{19}$ | Geometric Role and Physical Interface |
| :--- | :---: | :---: | :--- |
| $(17, 17, 17)$ | $1$ | $18$ | Unique $\sigma$-fixed pole, adjacent to all $18$ other vertices; connects to one degree-$10$ outer three-point orbit via $3$ height-softened radial spokes |
| $(13, 13, 23)$ | $3$ | $18$ | Inner core triangle, each vertex adjacent to all $18$ others; first stations of the minimal-denominator rays carrying the $12$ clock-phase edges |
| $(11, 11, 25)$ | $3$ | $14$ | Sub-inner ring; pairs $(11, 11, 25) \to (13, 13, 23)$ form the shortest native arc $d^2 = 12$ |
| $(7, 17, 23)$, $(7, 23, 17)$ | $3 + 3$ | $16$ | Mirror-paired middle orbits mediating shell reflections and relay transport |
| $(1, 5, 29)$, $(1, 29, 5)$ | $3 + 3$ | $10$ | Mirror-paired outer orbits feeding the dual clocks into the inner ring along $d^2 = 244, 724, 804$ |

A quick handshaking check confirms $1\cdot 18 + 3\cdot 18 + 3\cdot 14 + 6\cdot 16 + 6\cdot 10 = 18 + 54 + 42 + 96 + 60 = 270 = 2 \times 135$. One combinatorial clue already foreshadows the next twelve chapters: the $12$ clock-bearing edges ($6$ with $d^2 = 724$ and $6$ with $d^2 = 804$) connect the $6$ outer vertices to the $3$ inner vertices, hitting each outer vertex twice and each inner vertex four times. Thus any vertex cover of the $12$ clock-phase edges requires at least three vertices, and equality uniquely selects the inner triangle $(13, 13, 23)$.

::: {.figure src="ch01-behrend-shell"}
**Unit-sphere projection and three core chord classes of the 19-point Behrend shell.** The $19$ positive integer solutions of $x_1^2 + x_2^2 + x_3^2 = 867$ are projected onto the unit sphere: the amber dot marks the unique $\sigma$-fixed pole $(17, 17, 17)$, while the remaining $18$ vertices split into six cyclic three-point orbits. Great-circle arcs are grouped by squared chord distance $d^2$: cyan traces the three shortest chords ($d^2 = 12$), while violet and magenta mark the two six-edge clock classes ($d^2 = 724$ and $d^2 = 804$).
:::

## 1.2 Why Twenty-Three Arcs Leave Exactly Twenty-Two Independent Frequencies {#sec-ou-1-2}

In [Chapter 2](ch02-quaternion-clocks-and-haar-zeros.md), we will multiply these native arc angles by Riemann zero ordinates $\gamma$ to drive exact Haar integration across the full Standard Model gauge group $\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$. For those phases to equidistribute across a high-dimensional torus rather than collapsing onto a resonant subtorus, we must answer a clean question of algebraic number theory: **what is the $\mathbb{Q}$-linear rank of the $23$ arc angles $\theta_j$?**

The answer is **exactly $22$** (`ARGUED`; see the [gauge-integration study](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E9%9B%B6%E7%82%B9%E4%B8%8E%E6%A0%87%E5%87%86%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83%E7%BE%A4%E7%A7%AF%E5%88%86.md)). Every step can be checked by hand:

First, lift each arc angle to an algebraic number on the unit circle:

$$
\alpha_j := e^{i\theta_j} = \frac{1734 - j + i\sqrt{j(3468 - j)}}{1734} \qquad (j \in \mathcal{J}_{23}).
$$

None of the $23$ numbers is a root of unity: since $0 < j \le 804 < 867$, the value $2\operatorname{Re}\alpha_j = 2 - j/867$ is a rational number strictly between $1$ and $2$, hence never an integer, whereas any root of unity with rational $2\cos\theta$ must satisfy $2\cos\theta \in \{-2, -1, 0, 1, 2\}$. Every $\alpha_j$ therefore has infinite multiplicative order.

Second, sort the $23$ phases by their imaginary quadratic fields $\mathbb{Q}(\alpha_j) = \mathbb{Q}(\sqrt{-D_j})$, where $D_j$ is the square-free part of $j(3468 - j)$:

- For $j \in \{12, 68, 136\}$, direct factorization gives $12\cdot 3456 = 2\cdot 144^2$, $68\cdot 3400 = 2\cdot 340^2$, and $136\cdot 3332 = 2\cdot 476^2$, so all three live inside the **same quadratic field $\mathbb{Q}(\sqrt{-2})$**.
- For the remaining $20$ squared chord lengths, the square-free kernels $D_j$ are

$$
86,\; 542,\; 1478,\; 1538,\; 1634,\; 1698,\; 1718,\; 2534,\; 7998,\; 8858,\; 10374,\; 11102,\; 11354,\; 11942,\; 14874,\; 31502,\; 49166,\; 57962,\; 58682,\; 112022,
$$

twenty pairwise distinct integers, none equal to $2$.

Third, separate the $21$ distinct quadratic fields by Galois characters. Let $K$ be the compositum of all $21$ imaginary quadratic fields, and consider the $\mathbb{Q}$-vector space $V := (K^\times / \mu(K)) \otimes_{\mathbb{Z}} \mathbb{Q}$ obtained by killing torsion (roots of unity). Every $\sigma \in \operatorname{Gal}(K/\mathbb{Q})$ acts on $F_j = \mathbb{Q}(\sqrt{-D_j})$ either as the identity or as complex conjugation; because $|\alpha_j| = 1$, complex conjugation sends $\alpha_j \mapsto \bar{\alpha}_j = \alpha_j^{-1}$. Thus $\sigma(\alpha_j) = \alpha_j^{\chi_j(\sigma)}$, where $\chi_j : \operatorname{Gal}(K/\mathbb{Q}) \to \{\pm 1\}$ is the quadratic character of $F_j$. In the additive $\mathbb{Q}$-space $V$, nonzero eigenvectors belonging to distinct group characters are linearly independent—even if multiplicative relations exist among the integers $D_j$ themselves! No nontrivial rational relation can therefore link angles from different quadratic fields.

Fourth, resolve the single shared room $\mathbb{Q}(\sqrt{-2})$. Reducing the fractions for $j = 12, 68, 136$ gives

$$
\alpha_{12} = \frac{287 + 24\sqrt{-2}}{289}, \qquad \alpha_{68} = \frac{49 + 10\sqrt{-2}}{51}, \qquad \alpha_{136} = \frac{47 + 14\sqrt{-2}}{51}.
$$

Multiplying the first two directly on scratch paper gives

$$
(287 + 24\sqrt{-2})(49 + 10\sqrt{-2}) = (14063 - 480) + (2870 + 1176)\sqrt{-2} = 13583 + 4046\sqrt{-2} = 289\,(47 + 14\sqrt{-2}),
$$

and cancelling $289 = 17^2$ establishes the exact identity **$\alpha_{136} = \alpha_{12}\alpha_{68}$**. Because all three arguments lie in $(0, \pi/2)$, their principal angles obey the single exact relation

$$
\theta_{136} = \theta_{12} + \theta_{68}.
$$

Finally, to check that $\alpha_{12}$ and $\alpha_{68}$ themselves are independent modulo roots of unity, inspect the prime ideal $\mathfrak{p}_3 = (1 + \sqrt{-2})$ above $3$ in the unique factorization domain $\mathbb{Z}[\sqrt{-2}]$: $3 \nmid 289$ and $287 + 24\sqrt{-2} \equiv 2 \not\equiv 0 \pmod{\mathfrak{p}_3}$, so $v_{\mathfrak{p}_3}(\alpha_{12}) = 0$; meanwhile $51 = 17(1 + \sqrt{-2})(1 - \sqrt{-2})$ and $49 + 10\sqrt{-2} = (1 + \sqrt{-2})^2(-1 - 12\sqrt{-2})$, so $v_{\mathfrak{p}_3}(\alpha_{68}) = 2 - 1 = +1 \neq 0$. One zero valuation and one nonzero valuation force multiplicative independence!

::: {.example #ex-ou-ch01-shell-arithmetic title="Scratch-Paper Check of the Shortest Arc and the Sole Rational Relation"}
Take the sub-inner vertex $P = (11, 11, 25)$, the inner vertex $Q = (13, 13, 23)$, and the pole $O = (17, 17, 17)$:

1. **The shortest native arc $PQ$ ($d^2 = 12$):** $P - Q = (-2, -2, 2)$, so $\|P - Q\|^2 = 4 + 4 + 4 = 12$; the dot product is $P \cdot Q = 143 + 143 + 575 = 861$, giving $\cos\theta_{12} = \frac{861}{867} = \frac{287}{289}$ and $\sin\theta_{12} = \frac{\sqrt{289^2 - 287^2}}{289} = \frac{\sqrt{1152}}{289} = \frac{24\sqrt{2}}{289}$, recovering $\alpha_{12}$ exactly.
2. **Spokes $QO$ ($d^2 = 68$) and $PO$ ($d^2 = 136$):** Direct subtraction yields $\|Q - O\|^2 = 16 + 16 + 36 = 68$ and $\|P - O\|^2 = 36 + 36 + 64 = 136$. All three points $P, Q, O$ lie in order on the same symmetry great-circle plane $x_1 = x_2$! Adjacent great-circle arcs add linearly, revealing the visible geometric origin of $\theta_{136} = \theta_{12} + \theta_{68}$.
:::

Dropping the redundant $\theta_{136}$ leaves **exactly $22$ $\mathbb{Q}$-linearly independent frequencies**. Moreover, replacing $\theta_{724}$ and $\theta_{804}$ by the dual-clock frequency differences $\theta_{724} - \theta_{244}$ and $\theta_{804} - \theta_{244}$ while retaining $\theta_{244}$ is a unimodular integer change of basis, preserving the full rank $22$.

## 1.3 Projective Ternion Heaps, Integer Shell Compression, and Isotropic Inversion {#sec-ou-1-3}

Before feeding Riemann zeros into these $22$ frequencies, we anchor two structural bridges in the Lean 4 kernel: one governing the **discrete non-commutative algebra** of integer quaternions, and one governing the **continuous radial inversion** of isotropic three-dimensional shells.

The first pillar removes both the privileged identity element $\mathbf{1}$ and real square roots from quaternionic transport. On the ring of integer quaternions $\mathbb{Z}^4$, define the division-free ternary operation $\operatorname{triad}(x, y, z) := (x\bar{y})z$ and the rational projective overlap $\kappa(a, b) := \langle a, b\rangle^2 / (\|a\|^2 \|b\|^2)$. The following frozen theorem locks in outer heap associativity and right-translation invariance of $\kappa$:

::: {.theorem #thm-ou-ch01-ternion-heap title="Associativity of the Projective Ternion Heap and Translation Invariance of Rational Overlap" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant"}
Let $\mathrm{Quaternion}$ denote the type of integer quaternions with Hamilton product, conjugation $y \mapsto \bar{y}$, natural squared norm $\|a\|^2 \in \mathbb{N}$, nonzero predicate `Nonzero`, and ternary operation $\operatorname{triad}(x, y, z) := (x\bar{y})z$. Call two integer quaternions ray-equivalent (`RayEquiv`, written $a \sim_{\mathrm{ray}} b$) when both are nonzero and there exist nonzero integers $k, l \in \mathbb{Z}\setminus\{0\}$ with $ka = lb$; in the signed integer-ratio type `Omega.IntRatio`, set $\kappa(a, b) := \langle a, b\rangle^2 / (\|a\|^2 \|b\|^2)$. Then:

1. **Projective heap associativity** ([`triad_assoc`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc)): for all nonzero integer quaternions $x, y, z, u, v$,

   $$
   \operatorname{triad}\bigl(\operatorname{triad}(x, y, z),\, u,\, v\bigr) \;\sim_{\mathrm{ray}}\; \operatorname{triad}\bigl(x,\, y,\, \operatorname{triad}(z, u, v)\bigr).
   $$

2. **Right-translation invariance of rational overlap** ([`kappa_heap_invariant`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant)): for all integer quaternions $a, b$ and all nonzero integer quaternions $u, v$, in `IntRatio.Equivalent`,

   $$
   \kappa\bigl(\operatorname{triad}(a, u, v),\, \operatorname{triad}(b, u, v)\bigr) \;\equiv\; \kappa(a, b).
   $$

:::

::: proof
For part 1, associativity of integer quaternion multiplication yields the componentwise equality $\bigl(((x\bar{y})z)\bar{u}\bigr)v = (x\bar{y})\bigl((z\bar{u})v\bigr)$, while multiplicativity of the four-square norm ensures that every triad of nonzero integer quaternions stays nonzero; reflexivity of `RayEquiv` completes the claim. For part 2, put $p := \bar{u}v$; since $u$ and $v$ are nonzero, $p$ is nonzero with squared norm $n := \|p\|^2 > 0$. Right multiplication by $p$ scales the Euclidean dot product by $n$ ($\langle ap, bp\rangle = n\langle a, b\rangle$) and scales the denominator $\|ap\|^2 \|bp\|^2 = n^2 \|a\|^2 \|b\|^2$ by $n^2$. The common positive integer factor $n^2$ cancels in `IntRatio.Equivalent` (and if $a$ or $b$ is zero both sides are undefined and equivalent). The full proof is checked by the Lean kernel.
:::

This integer quaternion machinery is far from abstract decoration. Already on the precursor 9-point Behrend shell of squared radius $17$, the standalone `Init`-only Lean script [`ShellProjection.lean`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ShellProjection.lean) (`CERT`, checked purely by definitional reduction `rfl`, outside this book's frozen Lean ledger) exhibits an exact integer compression law and orientation witness. Take the nine pure imaginary integer quaternions formed by permuting $(0, 1, 4)$ and $(2, 2, 3)$, fix the axis $a = (0, 0, 1, 4)$, and define the integer plane operator

$$
P_p(v) := 17\,v + (p v)\,a.
$$

Checking all $9 \times 9 = 81$ vertex pairs and all four quaternion basis vectors by `rfl` certifies the exact compression identity (`shell_compressions`):

$$
P_p\bigl(P_q(P_p(v))\bigr) = 34\,(17 + p \cdot q)\,P_p(v).
$$

Better yet, stepping around the oriented inner triangle $p = (0, 3, 2, 2)$, $q = (0, 2, 3, 2)$, $r = (0, 2, 2, 3)$ on $z = P_p(v)$ (`inner_oriented_triangle`) produces not only a real scalar factor but a non-vanishing axial twist:

$$
P_p\bigl(P_q(P_r(z))\bigr) = 34\,(1105\,z + 7\,z\,a),
$$

and subtracting the three reverse-cyclic triple compositions of $u_p(x) := (p x)a$ from the three forward-cyclic compositions (`oriented_axis_from_shell`) cancels every symmetric term to isolate the pure oriented axis witness $714\,x a$. Without a single floating-point approximation or coordinate chart, the discrete integer shell announces spatial orientation in exact integers ($7$ and $714$).

Neither the compression law nor the oriented-triangle law depends on the squared radius $17$ or on case-by-case enumeration. For an integer $s$ and pure imaginary integer quaternions $p$ and $a$, write the shell map $P_{s,p,a}(v) := s\,v + (p v)\,a$, let $x \cdot y$ denote the four-dimensional Euclidean inner product, and put $N(x) := x \cdot x$ for the squared norm. The frozen theorem below shows that the single condition $s^2 = N(p)\,N(a)$ makes both laws exact for every integer quaternion $v$, with no requirement on the norms of the intermediate vertices $q$ and $r$:

::: {.theorem #thm-ou-ch01-shell-compression-triangle title="Compression and Oriented-Triangle Identities for Integer Quaternion Shell Maps" lean="D5/S3/Quantum/AURICOmega/OmegaShellProjection.shell_compress_of_eq D5/S3/Quantum/AURICOmega/OmegaShellProjection.shell_triangle_of_eq"}
Let $s$ be an integer and let $p, q, r, a$ be integer quaternions with zero real part such that $s^2 = N(p)\,N(a)$. Then for every integer quaternion $v$ the following two statements hold:

1. **Compression identity**:

$$
P_{s,p,a}\bigl(P_{s,q,a}(P_{s,p,a}(v))\bigr) = 2\bigl(s^2 + N(a)\,(p \cdot q)\bigr)\,P_{s,p,a}(v).
$$

2. **Oriented-triangle identity**: with $z := P_{s,p,a}(v)$,

$$
P_{s,p,a}\bigl(P_{s,q,a}(P_{s,r,a}(z))\bigr) = 2s\bigl(s^2 + N(a)\,(p \cdot q + q \cdot r + r \cdot p)\bigr)\,z + 2\,N(a)\,\bigl(p \cdot (q r)\bigr)\,z\,a.
$$
:::

::: proof
Record a map of the form $u \mapsto c\,u + (d\,u)\,a$ by its coefficient pair $(c, d)$; the shell map $P_{s,p,a}$ is the pair $(s, p)$. A pure imaginary $a$ satisfies $a a = -N(a)$, so the composite of two such maps has the same shape, with coefficients combining as $(c, d) \circ (e, f) = (c e - N(a)\,d f,\ c f + d e)$. The triple and quadruple composites thereby reduce to polynomial identities with integer coefficients among the quaternion coefficients, which are expanded and checked coordinate by coordinate. Without the norm condition each identity carries one extra defect term proportional to $s^2 - N(p)\,N(a)$, and that term vanishes once $s^2 = N(p)\,N(a)$ is substituted. The full proof is checked by the Lean kernel.
:::

Setting $s = 17$ and $N(p) = N(a) = 17$ turns the first coefficient into $2(289 + 17\,p \cdot q) = 34\,(17 + p \cdot q)$, the compression law of the nine-point shell. On the inner triangle all three inner products equal $16$, and the imaginary part of a product $q r$ of pure quaternions is the cross product $q \times r$, so $p \cdot (q r) = \det(p, q, r) = 7$; the two coefficients of the second identity become $2 \cdot 17\,(289 + 17 \cdot 48) = 34 \cdot 1105$ and $2 \cdot 17 \cdot 7 = 34 \cdot 7$, matching the enumerated certificate term by term.

The third identity likewise depends neither on the squared radius nor on case-by-case enumeration, and it needs no norm condition at all:

::: {.theorem #thm-ou-ch01-oriented-axis title="Oriented-Axis Identity for Integer Quaternion Maps" lean="D5/S3/Quantum/AURICOmega/OmegaShellOrientedAxis.oriented_axis_from_shell"}
Let $p, q, r, a$ be integer quaternions with zero real part and write $u_c(x) := (c\,x)\,a$. Then for every integer quaternion $x$,

$$
u_p u_q u_r\,x + u_q u_r u_p\,x + u_r u_p u_q\,x - u_p u_r u_q\,x - u_r u_q u_p\,x - u_q u_p u_r\,x = 6\,N(a)\,\bigl(p \cdot (q r)\bigr)\,x\,a.
$$
:::

::: proof
A pure imaginary $a$ satisfies $a a = -N(a)$, so a triple composite $u_{c_1} u_{c_2} u_{c_3}\,x = \bigl((c_1 c_2 c_3)\,x\bigr)\,a^3$ equals $-N(a)\,\bigl((c_1 c_2 c_3)\,x\bigr)\,a$. The left side is therefore $-N(a)\,(A\,x)\,a$, where $A = p q r + q r p + r p q - p r q - r q p - q p r$ is the alternating sum of the six ordered products of the three factors; this step uses only that $a$ is pure. For pure imaginary $p, q, r$ the alternating sum is the scalar $-6\,p \cdot (q r)$, and substituting it gives the right side. The full proof is checked by the Lean kernel.
:::

With $N(a) = 17$ and $p \cdot (q r) = 7$ on the inner triangle the coefficient is $6 \cdot 17 \cdot 7 = 714$, which is the oriented-axis witness $714\,x a$ of the certificate. The identity does not involve $s$, and $x$ need not be pure.

The second Lean-verified pillar connects discrete radial shells to continuous isotropic ensembles in $\mathbb{R}^3$. If a rotationally invariant random vector $X \in \mathbb{R}^3$ has radial shell density $h(r)$, then conditional on $|X| = r$ its projection along any fixed unit axis is uniform on $[-r, r]$, producing the one-dimensional marginal $f(t) = \int_{|t|}^\infty \frac{h(r)}{2r}\,dr$ on the full real line (reducing to $\int_t^\infty \frac{h(r)}{2r}\,dr$ on the nonnegative half-line $t \ge 0$). The next theorem establishes exact inversion uniqueness and total mass conservation:

::: {.theorem #thm-ou-ch01-shell-inversion title="Uniqueness and Mass Identity for Isotropic Shell Inversion" lean="D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_density_unique D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_projection_mass"}
For real functions $h, d : \mathbb{R} \to \mathbb{R}$, define the projection and inverted shell operators

$$
\operatorname{projection}(h)(t) := \int_t^\infty \frac{h(r)}{2r}\,dr, \qquad \operatorname{shell}(d)(r) := -2r\,d(r).
$$

Then:

1. **Pointwise uniqueness of continuous shell densities** ([`shell_density_unique`](lean:D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_density_unique)): if $h$ is continuous on $(0, \infty)$, $r \mapsto \frac{h(r)}{2r}$ is integrable on $(t, \infty)$ for every $t > 0$, and $\operatorname{projection}(h)(t) = f(t)$ for all $t > 0$, then for every $r > 0$,

   $$
   h(r) = \operatorname{shell}(f')(r) = -2r\,f'(r).
   $$

2. **Nonnegativity, marginal recovery, and total mass** ([`shell_projection_mass`](lean:D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_projection_mass)): if $f : \mathbb{R} \to \mathbb{R}$ is right-continuous at $0$, integrable on $(0, \infty)$, and differentiable on $(0, \infty)$ with derivative $d(r) \le 0$ for all $r > 0$, then $\operatorname{shell}(d)(r) \ge 0$ for all $r \ge 0$, $\operatorname{projection}(\operatorname{shell}(d))(t) = f(t)$ for all $t \ge 0$, and

   $$
   \int_0^\infty \operatorname{shell}(d)(r)\,dr = 2\int_0^\infty f(r)\,dr.
   $$

:::

::: proof
For part 1, continuity of $h$ on $(0, \infty)$ makes $r \mapsto h(r)/(2r)$ continuous there, so differentiating the tail integral $f(t) = \int_t^\infty \frac{h(r)}{2r}\,dr$ by the Fundamental Theorem of Calculus yields $f'(r) = -h(r)/(2r)$ for every $r > 0$, hence $h(r) = -2r f'(r)$. For part 2, $r \ge 0$ and $d(r) \le 0$ (for $r > 0$, with vanishing factor $r$ at $0$) give $\operatorname{shell}(d)(r) \ge 0$. Because $f$ is non-increasing and integrable on $(0, \infty)$, $\lim_{R\to\infty} f(R) = 0$, so $\int_t^\infty (-d(r))\,dr = f(t)$ for every $t > 0$, extending to $t = 0$ by right-continuity. Applying Tonelli's theorem to the nonnegative integrand $-d(r)$ over $0 < t < r$ yields

$$
\int_0^\infty (-2r\,d(r))\,dr = 2\int_0^\infty \left(\int_t^\infty (-d(r))\,dr\right)dt = 2\int_0^\infty f(t)\,dt.
$$

The full proof is checked by the Lean kernel.
:::

## 1.4 The Rational Gram Obstruction: Why the Shell Laplacian Requires Twenty-One Rational Coordinates {#sec-ou-1-4}

Before placing a single complex phase or physical field onto the 19-point shell, look at one striking pure-arithmetic obstruction already hiding in the unphased unit-edge integer graph Laplacian $L = D - A$ of $G_{19} = (V_{19}, E_{135})$. **Can we assign nineteen rational vectors $v_1, \dots, v_{19} \in \mathbb{Q}^{18}$ whose Euclidean dot products reproduce $L_{ij} = \langle v_i, v_j\rangle$?**

Real linear algebra makes the answer look trivial: $G_{19}$ is connected, so the symmetric positive semidefinite $19 \times 19$ matrix $L$ has **real rank $18$** (its one-dimensional kernel is spanned by the constant vector $\mathbf{1}$). Over $\mathbb{R}$, a Cholesky factorization embeds all nineteen vertices into $\mathbb{R}^{18}$ immediately.

Strip away irrational square roots and demand coordinates in $\mathbb{Q}$, and the real rank fails by three full dimensions (`CERT / ARGUED`, verified by [`ch39-native-shell-rational-gram.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-native-shell-rational-gram.py)):

1. **Reduction to an 18-variable positive definite rational form:** Because every row sum of $L$ vanishes, deleting the nineteenth vertex leaves an $18 \times 18$ strictly positive definite integer Gram matrix $q$ (with the nineteenth vector uniquely recovered as minus the sum of the first eighteen). By Kirchhoff's matrix-tree theorem, $\det(q)$ equals the spanning-tree count $\tau$ of $G_{19}$.
2. **A $2$-adic Hasse–Hilbert obstruction ruling out $20$ coordinates:** Diagonalize $q$ over $\mathbb{Q}$ using ratios of consecutive leading principal minors. Embedding $q$ isometrically into the $20$-dimensional standard sum-of-squares form $I_{20}$ requires a binary rational orthogonal complement $q_\perp$ of determinant square-class $d = \tau$ whose local Hasse invariant at every prime $p$ equals $c_p(q)(d, -1)_p$. Exact prime-by-prime evaluation shows that this target invariant equals $-1$ at the four primes **$p \in \{2, 11, 17, 71\}$**. Yet at $p = 2$, exact arithmetic gives $-d \equiv 1 \pmod 8$, making $-d$ a square in $\mathbb{Q}_2$! Consequently, every binary form of determinant class $d$ has $2$-adic Hilbert symbol $(x, -d)_2 = +1$, contradicting the required $-1$. Dimensions $18$, $19$, and $20$ are all algebraically impossible over $\mathbb{Q}$.
3. **Closure at dimension $21$:** Conversely, by Meyer's theorem and the ternary orthogonal-complement construction for positive definite rational forms, $q$ embeds isometrically into the standard $21$-dimensional sum-of-squares space $\mathbb{Q}^{21}$.

Thus the unit-edge integer Laplacian of the 19-point Behrend shell has **real rank $18$ but minimal rational Gram dimension strictly equal to $21$**. Rational arithmetic demands three orthogonal dimensions invisible to real Cholesky factorization—a concrete reminder that passing from $\mathbb{R}$ to $\mathbb{Q}$ uncovers genuine $p$-adic geometry even on a nineteen-vertex graph.

The interactive card below lets you explore this nineteen-point geometry directly, tracking how the cyclic orbits, clock edges, and shortest arc respond as a Riemann zero height $\gamma$ turns the shell phases.

::: {.viz src="behrend-unification-lab" preset="shell-clocks" height="500"}
**The 19-point Behrend shell and dual-clock phases (`shell-clocks`).** Built on the $135$-edge shell graph ($19$ positive integer vertices of $x_1^2 + x_2^2 + x_3^2 = 867$: the pole $(17, 17, 17)$ plus six cyclic three-point orbits), the stage renders selected great-circle chord classes—in the default clock view, the $21$ core arcs ($d^2 = 724, 804$ clock arcs, $d^2 = 244$ reference arcs, and $d^2 = 12$ shortest arcs) plus the active triad edges, with highlight chips switching to shortest arcs, middle arcs, or 3-point orbits. Drag the height rail $\gamma$ to watch the two clock beads advance along the $724$ and $804$ great-circle arcs at phases $(\phi_1, \phi_2)$ and inspect the live triad Bargmann–Gram determinant $\det G_3$ and signed solid angle $\Omega$ (shell combinatorics and frequency rank from [@def-ou-ch01-behrend-shell]; projective heap laws anchored by [@thm-ou-ch01-ternion-heap]).
:::

## 1.5 Summary and Bridge to Chapter 2 {#sec-ou-1-5}

We now hold the complete static blueprint of our laboratory: the 19-point Behrend shell at $R = 867$ ($19$ vertices, $135$ edges, $529$ triangles), its $23$ arc lengths collapsing by exactly one $\mathbb{Q}(\sqrt{-2})$ identity $\theta_{136} = \theta_{12} + \theta_{68}$ to $22$ rationally independent frequencies, four Lean-verified results on projective ternion heaps ([@thm-ou-ch01-ternion-heap]), the compression and oriented-triangle identities of shell maps ([@thm-ou-ch01-shell-compression-triangle]), the oriented-axis identity ([@thm-ou-ch01-oriented-axis]) and continuous isotropic shell inversion ([@thm-ou-ch01-shell-inversion]), the exact `rfl`-certified 9-point integer compression and orientation witness, and the $2$-adic Hasse obstruction separating real rank $18$ from minimal rational Gram dimension $21$.

::: {.film src="nineteen-points-twenty-two-frequencies"}
**Nineteen points, 135 edges and 23 chord lengths, held together by a single rational relation that leaves 22 independent frequencies (2 min 45 s).** The camera looks down the pole onto the sphere $x_1^2 + x_2^2 + x_3^2 = 867$: the $19$ nonnegative integer points light up one by one, the amber pole $(17, 17, 17)$ stays put under the coordinate cycle $\sigma$ (a $120^\circ$ turn about the pole), and the other $18$ points form six three-point orbits in cyan, white, blue and magenta for the inner, sub-inner, middle and outer layers ([@def-ou-ch01-behrend-shell]). As the squared-distance threshold sweeps up to $804$, $135$ cyan great-circle edges appear, the $36$ dropped longest chords flash as dashed magenta arcs, an amber triangle picks out one of the $529$ triangles at a time, and the degrees add to $270 = 2 \times 135$. Next, the $23$ chord-length cards turn over to show their $\sqrt{-D_j}$, with $12$, $68$ and $136$ all in $\mathbb{Q}(\sqrt{-2})$; on the great circle $x_1 = x_2$ the three points sit in order, the magenta arc $\theta_{68}$ and the cyan arc $\theta_{12}$ make up the amber arc $\theta_{136}$, and the exact product beside them gives $\alpha_{12}\alpha_{68} = \alpha_{136}$ ([@ex-ou-ch01-shell-arithmetic]). The green labels are the projective ternion heap ([@thm-ou-ch01-ternion-heap]) and isotropic shell inversion ([@thm-ou-ch01-shell-inversion]), the latter shown with the computed example $f = e^{-t^2}$, $h = 4r^2 e^{-r^2}$. In the last scene the heatmap is the Laplacian of the $135$ edges: its real rank $18$ is computed on screen, while the minimal rational Gram dimension $21$ and the $2$-adic Hasse obstruction come from the replay certificate and written argument (violet). Points, edges, triangles, lengths, fields and the product are exact computations on screen; that the remaining $22$ angles are rationally independent is the chapter's Galois argument (violet), and picking this shell as the testbed is a modelling choice.
:::

A sharper dynamical question now opens the door to [Chapter 2](ch02-quaternion-clocks-and-haar-zeros.md): **ordinary complex phases commute, so when we promote the shell's two clocks to non-commutative unit quaternions $(U, V)$, can a spectrum actually hear their non-commutativity? And can these twenty-two independent shell frequencies, driven solely by Riemann zero ordinates with zero random-number generators, reproduce exact Haar integration over the entire Standard Model gauge group $\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$?**
