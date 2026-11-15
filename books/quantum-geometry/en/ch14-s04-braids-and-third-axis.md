# 14.4 Planar Braids and the Third Orthogonal Direction {#sec-braids-and-third-axis}

Beyond active syndrome measurement, nature offers a passive topological mechanism for fault-tolerant gates: **braiding particle worldlines in $(2+1)$-dimensional spacetime**.

In the intuitive picture of low-dimensional topology and anyon physics (recorded in [@rem-error-correction-anyons-literature] below), a natural question arises: why does confining particle worldlines to a two-dimensional plane $(e_1, e_2)$ yield a braid exchange structure qualitatively distinct from three-dimensional space?

Diagrammatically (as illustrated in Figure 14, Panel III), the clue points to the **third orthogonal spatial axis $e_3$**! For non-intersecting strands arranged in a row, passing strand $1$ over strand $2$ ($\mathrm{crossing}$) and passing it under ($\mathrm{crossingInv}$) define inverse elementary crossings. On three strands $(x, (y, z))$, sliding the middle strand past the crossing of the outer two motivates the fundamental **three-strand braid relation (the Yang–Baxter equation)** $\sigma_1 \sigma_2 \sigma_1 = \sigma_2 \sigma_1 \sigma_2$.

::: {.viz src="braiding" preset="over" height="500"}
**One exchange: which strand passes in front is kept in the third direction.** Two particles in a plane trace world lines as time goes up and swap places by half a turn about their midpoint: the left strand passes in front (nearer to you), the right one behind. The numbers on the strands are colors: the front strand carries its $0$ to the right, the one behind is recolored by it, and $1$ becomes $0 \star 1 = 2$, which is $\mathrm{crossing}(x, y) = (x \star y,\, x)$.
:::

In the source module `D5/S0/Certificates/Quandles/BraidColoringTransport.lean`, this braid invariance is formalized algebraically via rack-coloring transport. Let $Q$ be any type equipped with a `Rack Q` instance, providing a binary operation $\star : Q \to Q \to Q$ (`act`) and inverse operation $\star^{-1} : Q \to Q \to Q$ (`invAct`) that is left-action bijective — for each fixed first argument $x \in Q$, the left translation map $L_x : y \mapsto x \star y$ is a bijection with inverse $L_x^{-1} : y \mapsto x \star^{-1} y$ (`Function.LeftInverse (invAct x) (act x)` and `Function.RightInverse (invAct x) (act x)`, so $x \star^{-1}(x \star y) = y$ and $x \star (x \star^{-1} y) = y$) — and obeys left self-distributivity:

$$
(x \star y) \star (x \star z) = x \star (y \star z) \qquad (\forall x, y, z \in Q).
$$

The two-strand crossing and its inverse are defined by

$$
\mathrm{crossing}(x, y) = (x \star y,\, x), \qquad \mathrm{crossingInv}(u, v) = (v,\, v \star^{-1} u),
$$

so that $\mathrm{crossingInv}\bigl(\mathrm{crossing}(x, y)\bigr) = \mathrm{crossingInv}(x \star y, x) = \bigl(x,\, x \star^{-1}(x \star y)\bigr) = (x, y)$, and their three-strand lifts on $Q \times (Q \times Q)$ are

$$
\mathrm{crossing}_1\bigl(x, (y, z)\bigr) = \bigl(x \star y,\, (x, z)\bigr), \qquad
\mathrm{crossing}_2\bigl(x, (y, z)\bigr) = \bigl(x,\, (y \star z,\, y)\bigr).
$$

::: {.viz src="braiding" preset="inverse" height="500"}
**Exchange back the other way, and everything returns.** On the left, one exchange followed by the opposite one (this time the right strand passes in front): both strands are back in place and the colors $(0, 1)$ reach the top as they were, $\mathrm{crossingInv}(\mathrm{crossing}(x, y)) = (x, y)$. On the right, two straight strands with no exchange, also $(0, 1)$ at the top.
:::

The next corollary proves that $\mathrm{crossing}_1$ and $\mathrm{crossing}_2$ satisfy the exact Yang–Baxter braid identity on every rack $Q$.

::: {.corollary #cor-braid-yang-baxter title="Three-Strand Yang–Baxter Braid Identity for Rack Colorings" lean="D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter"}
Let $Q$ be any type equipped with `[Rack Q]`. For all $x, y, z \in Q$, the adjacent three-strand crossing maps satisfy

$$
\mathrm{crossing}_1\bigl(\mathrm{crossing}_2\bigl(\mathrm{crossing}_1(x, (y, z))\bigr)\bigr) = \mathrm{crossing}_2\bigl(\mathrm{crossing}_1\bigl(\mathrm{crossing}_2(x, (y, z))\bigr)\bigr).
$$
:::

::: proof
Unfolding $\mathrm{crossing}_1$ and $\mathrm{crossing}_2$ on the left-hand side step by step gives

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star y,\, (x, z)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x \star y,\, (x \star z,\, x)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \Bigl((x \star y) \star (x \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

Unfolding the right-hand side step by step gives

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x,\, (y \star z,\, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star (y \star z),\, (x, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \Bigl(x \star (y \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

The trailing pairs $(x \star y, x)$ are identical on both sides, and the leading entries $(x \star y) \star (x \star z)$ and $x \star (y \star z)$ agree by the rack self-distributivity axiom. The full proof is checked by the Lean kernel.
:::

::: {.viz src="braiding" preset="yb" height="500"}
**The two orders on three strands land in the same place.** Three strands colored $(0, 1, 2)$. The left braid exchanges in the order $\sigma_1, \sigma_2, \sigma_1$, the right one $\sigma_2, \sigma_1, \sigma_2$: the world lines run differently, and both reach the top as $(0, 2, 0)$. Click the numbers at the bottom for other colors and the two tops still agree; this is [@cor-braid-yang-baxter].
:::

::: {.remark #rem-braid-knot-topology-literature title="Scope Boundaries Between Rack Colorings, Configuration-Space Braids, and 3D Knots (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three theoretical boundaries govern how [@cor-braid-yang-baxter] connects to the low-dimensional topology and condensed-matter literature (see also [@rem-error-correction-anyons-literature] below; both the dimensional dichotomy between $B_n$ and $S_n$ on configuration spaces and the nontrivial knottedness of closed knots such as the trefoil in $\mathbb{R}^3$ are external literature results not formalized in this book):

1. **Algebraic coloring realization versus full topological classification**: [@cor-braid-yang-baxter] is an algebraic rack-coloring realization of the three-strand braid relation on an arbitrary `Rack Q` (with no topological space, spacetime dimension, or particle statistics in its hypotheses). It does not prove that all planar braids are nontrivial, nor does it classify the full fundamental group of configuration space.
2. **Distinguishing point-particle exchange paths from closed knots in $\mathbb{R}^3$**: As shown in Figure 14, Panel III, adding a third spatial axis $e_3$ allows a point-particle **exchange loop** (a path in configuration space where one point particle loops around another) to detour along $e_3$, reducing the exchange group from the braid group $B_n$ to the symmetric group $S_n$. **This is completely different from a closed $1$-dimensional knot embedded in $\mathbb{R}^3$** (such as a trefoil knot), which still cannot pass through itself and remains knotted in three dimensions (indeed, rack and quandle colorings are classical algebraic invariants for distinguishing nontrivial 3D knots; see [@thm-quandle-coloring-markov-invariant] and [@ex-fox-three-colorings-markov] below)!
3. **Anyonic statistics and topological fault-tolerance belong to the physics literature**: Configuration-space homotopy groups, non-Abelian anyons, and physical error bounds are summarized in [@rem-error-correction-anyons-literature].
:::

::: {.viz src="braiding" preset="twice" height="500"}
**Two exchanges the same way are not the same as none.** On the left, two exchanges in the same direction: the two world lines wind a full turn around each other and each particle is back where it started, yet the colors have gone from $(0, 1)$ to $(1, 2)$. On the right, two straight strands with no exchange, still $(0, 1)$ at the top. While the particles are confined to the plane this turn cannot be undone; lifting it over through a third spatial direction is the literature result of item 2 of [@rem-braid-knot-topology-literature].
:::

**Where does the fermion's $-1$ come from?** Above we saw that once particles are not trapped in a plane, an exchange leaves only two possibilities: $+1$ for bosons and $-1$ for fermions (literature results in [@rem-braid-knot-topology-literature] and, below, [@rem-error-correction-anyons-literature]). A quantum computer, however, has only qubits, and operators acting on different qubits **commute**: changing their order changes nothing. To simulate fermions on a row of qubits, that $-1$ has to come from somewhere else. The trick is to give every operator that removes a particle a tail: a $Z$ on every site to its left.

::: {.theorem #thm-jordan-wigner-car title="The Jordan–Wigner Construction: Qubit Operators with a Z String Obey the Canonical Anticommutation Relations of Fermions" lean="D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_mixed_anticomm_of_lt D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR"}
Take $N$ qubits on sites $0, 1, \dots, N - 1$, each with basis $\lvert 0\rangle$ (empty) and $\lvert 1\rangle$ (occupied); let $Z = \lvert 0\rangle\langle 0\rvert - \lvert 1\rangle\langle 1\rvert$ and $\sigma^- = \lvert 0\rangle\langle 1\rvert$. For each site $j$, let

$$
c_j = \underbrace{Z \otimes \cdots \otimes Z}_{\text{sites } 0, \dots, j-1} \otimes\, \sigma^- \otimes \underbrace{I \otimes \cdots \otimes I}_{\text{sites } j+1, \dots, N-1}.
$$

Then for all sites $i < j$,

$$
c_i c_j + c_j c_i = 0, \qquad c_i c_j^\dagger + c_j^\dagger c_i = 0,
$$

and for every site $i$, $c_i c_i^\dagger + c_i^\dagger c_i = I$.
:::

::: proof
All three are computed site by site in the tensor product. (1) For $i < j$, the products $c_i c_j$ and $c_j c_i$ differ only at site $i$: one has $\sigma^- Z$ there and the other $Z \sigma^-$, while every other site carries the same factor in both. Since $\sigma^- Z = -\sigma^-$ and $Z\sigma^- = \sigma^-$ ($Z$ is $-1$ on $\lvert 1\rangle$ and $+1$ on $\lvert 0\rangle$), the two terms cancel exactly. This is the Lean proof's "one Jordan–Wigner sign reversal between two separated sites". (2) Replacing $c_j$ by $c_j^\dagger$ leaves the same two orders of $\sigma^-$ and $Z$ at site $i$, and they cancel the same way. (3) For $i = j$ the $Z$ string squares to $I$, leaving $\sigma^-\sigma^+ + \sigma^+\sigma^- = \lvert 0\rangle\langle 0\rvert + \lvert 1\rangle\langle 1\rvert = I$ at site $i$: each of the two kinds of basis state, empty and occupied, is covered by exactly one term. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-jordan-wigner-two-sites title="Two Sites: No Z String, No −1"}
Take $N = 2$: $c_0 = \sigma^- \otimes I$ and $c_1 = Z \otimes \sigma^-$. Everything below is a manual derivation, and each item was also checked with explicit matrices for $N = 2$ and $3$.

- **The $-1$ comes from the $Z$ string.** $c_0 c_1 + c_1 c_0 = (\sigma^- Z + Z\sigma^-) \otimes \sigma^- = (-\sigma^- + \sigma^-) \otimes \sigma^- = 0$. Replace $c_1$ by the tailless $I \otimes \sigma^-$ and the two operators act on different qubits, so they commute; the anticommutator becomes $2\,\sigma^- \otimes \sigma^- \ne 0$.
- **Swapping the order of creation flips a sign.** $c_1^\dagger = Z \otimes \sigma^+$ with $\sigma^+ = \lvert 1\rangle\langle 0\rvert$. Starting from the empty state, $c_0^\dagger c_1^\dagger \lvert 00\rangle = c_0^\dagger \lvert 01\rangle = \lvert 11\rangle$, while $c_1^\dagger c_0^\dagger \lvert 00\rangle = c_1^\dagger \lvert 10\rangle = (Z\lvert 1\rangle) \otimes \lvert 1\rangle = -\lvert 11\rangle$. The same two-particle state, built in the two orders, differs by a minus sign.
- **Pauli exclusion.** At site $j$, $(c_j^\dagger)^2$ carries $(\sigma^+)^2 = 0$: one site cannot hold two particles.
- **Locality of hopping.** In the nearest-neighbour hop $c_j^\dagger c_{j+1}$, the $Z$ strings on sites $0, \dots, j-1$ square to $I$ and site $j$ keeps $\sigma^+ Z = \sigma^+$, so $c_j^\dagger c_{j+1} = \sigma^+_j \sigma^-_{j+1}$ touches only two neighbouring qubits. A hop over one site keeps an extra $Z$: $c_0^\dagger c_2 = \sigma^+ \otimes Z \otimes \sigma^-$, which "asks" the site in between for its occupation.
:::

::: {.figure src="ch14-jordan-wigner-string"}
**$c_1c_3$ and $c_3c_1$ differ only at site $1$, by a sign.** Take $N = 4$. The top two rows are the factors of $c_1$ and $c_3$ site by site, with $c_3$ trailing its $Z$ string over sites $0, 1, 2$; the bottom two rows multiply them in both orders. At site $0$, $ZZ = I$, and sites $2$ and $3$ agree; only the magenta column $1$ has $\sigma^- Z = -\sigma^-$ on one side and $Z\sigma^- = \sigma^-$ on the other, so $c_1c_3 = -c_3c_1$ ([@thm-jordan-wigner-car]).
:::

On a one-dimensional chain, nearest-neighbour hopping stays local; the price is an invisible parity tail.

::: {.remark #rem-jordan-wigner-literature title="Jordan–Wigner and Higher-Dimensional Encodings (Literature Results, Not Formalized in This Book)"}
The following are **literature results, not formalized in this book**:

- the construction is due to P. Jordan and E. Wigner (*Z. Phys.* **47**, 631–651, 1928);
- the general link between spin and statistics is the spin–statistics theorem;
- on a two-dimensional lattice, a linear ordering generally gives some hopping terms long $Z$ strings and nonlocal qubit support; alternatives such as Bravyi–Kitaev (2002) or Verstraete–Cirac (2005) change this cost.
:::

> The fermion's minus sign does not live in the particle; it lives in the parity string to its left.
