# Pairwise Comparison, Always Consistent, Order-Independent: Dissolving the Non-Commutativity Illusion and Berry Phase

> *"I keep feeling that the essence of quantum theory is this: compare things pairwise, always consistently, regardless of order."*

At first sight, the opening epigraph sounds like heresy to anyone trained in standard quantum mechanics: **"How could quantum theory possibly be order-independent?! Isn't noncommutativity $AB \neq BA$ the hallmark separating quantum mechanics from classical physics? On the three-dimensional sphere, rotating by $90^\circ$ about $X$ and then $90^\circ$ about $Y$ lands at a completely different point from rotating about $Y$ first and $X$ second! And transporting a state around a closed spherical triangle accumulates a path-dependent Berry geometric phase!"**

That apparent clash exposes a foundational distinction between two things that textbooks routinely conflate: **a time-ordered sequence of active physical operations that transform a state**, versus **the global Gram ledger of pairwise inner products among a family of states**.

Across four sections, this chapter makes the boundary between the two completely rigorous:

1. **Sequential spherical rotations and projective shutters genuinely fail to commute** ($R_x R_y \neq R_y R_x$, $P_0 P_+ \neq P_+ P_0$), while the Berry solid-angle holonomy of closed loops and its relation to the three-vertex Bargmann invariant are recorded in [@rem-berry-pancharatnam-holonomy-literature];
2. **Sequential quantum instruments depend strictly on operational order and post-measurement updates**, which cannot be inferred from static single-step POVM effects alone ([@prop-static-sequential-separation] proves a parameter-free qubit counterexample where two instruments share identical static effects yet yield sequential joint probabilities $0$ and $1$);
3. **Why local coordinate charts on $S^2$ look path-tangled**: the tangent-bundle and Hopf-bundle topological obstructions on $S^2$ versus the global rotor frame on $S^3$ are summarized in the literature notes [@rem-hopf-dirac-monopole-literature] and [@rem-gram-hairy-ball-literature];
4. **Where true order-independent pairwise consistency lives**: when we retain the labeled **full complex Gram matrix** $G_{ij} = \langle\psi_i, \psi_j\rangle$ (with complex phases intact, not merely squared moduli $|G_{ij}|^2$), reading its pairwise entries in any order reconstructs the entire family of state vectors uniquely up to a single common ambient unitary $U$ ([@thm-gram-unitary-reconstruction] and [@lemma-unit-gram-equality]), while the complex phase of the cyclic triple product $\Delta = G_{01}G_{12}G_{20}$ is already retained inside $G$ (compared with Berry phase in [@rem-berry-pancharatnam-holonomy-literature])!

::: {.figure src="ch10-overview"}
**Figure 10.** The chapter at a glance. Panel I: two amber arcs leave the North Pole $N$; turning about $Y$ and then $X$ lands at $+X$, turning about $X$ and then $Y$ lands at $-Y$, and the two ends are $90^\circ$ apart. Panel II: the small cyan arrows on the sphere at the left shrink to zero at both poles (violet rings; a literature result, not formalized in this book), while the dashed circle at the right stands for the rotor sphere $S^3$ and carries a violet frame at every point. Panel III: the full complex Gram table of the three states of [@ex-octant-berry-gram], with the pairwise complex overlaps in the cyan cells ([@thm-gram-unitary-reconstruction]).
:::

## Rotation Order and Berry Solid Angle {#sec-spherical-order-and-berry}

Begin by honoring genuine noncommutativity where it actually occurs.

Take the Bloch sphere in Panel I of Figure 10 and apply active right-hand rotations to the North Pole $\vv{e}_3 = (0, 0, 1)$:

- If we **rotate first about $Y$ by $+90^\circ$ and second about $X$ by $+90^\circ$**, the first step $R_y(\pi/2)\vv{e}_3 = \vv{e}_1$ carries North to the east pole $+X$, and the second rotation about the $X$ axis leaves $+X$ fixed:

  $$
  R_x(\pi/2)\,R_y(\pi/2)\,\vv{e}_3 = \vv{e}_1.
  $$

- If we **reverse the order — rotating first about $X$ by $+90^\circ$ and second about $Y$ by $+90^\circ$** — the first step $R_x(\pi/2)\vv{e}_3 = -\vv{e}_2$ carries North to $-\vv{e}_2$, which is then fixed by the $Y$-axis rotation:

  $$
  R_y(\pi/2)\,R_x(\pi/2)\,\vv{e}_3 = -\vv{e}_2 \neq \vv{e}_1!
  $$

::: {.viz src="berry-loop" preset="order" height="500"}
**The same two turns in the other order end somewhere else.** From the North Pole, the amber point turned about $Y$ and then $X$ ends at $+X$; the one turned about $X$ and then $Y$ ends at $-Y$, $90^\circ$ away. In the second step neither point moves, yet the amber arrow attached to each turns by $90^\circ$.
:::

Likewise, the north projector $P_0 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ and east projector $P_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ do not commute:

$$
P_0 P_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix} \neq \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} = P_+ P_0.
$$

::: {.figure src="ch10-shutter-order"}
**Swap the two shutters and the arrow ends on a different line.** This is the real plane of state vectors, where the cyan lines $\lvert 0\rangle$ and $\lvert +\rangle$ are $45^\circ$ apart ($90^\circ$ on the Bloch sphere). Starting from the same grey $v$, the left panel projects onto the $\lvert +\rangle$ line first and then onto the $\lvert 0\rangle$ line, so the amber $P_0P_+v$ ends on the horizontal line; the right panel reverses the order, and the amber $P_+P_0v$ ends on the slanted line, much shorter.
:::

Furthermore, the classical correspondence between closed-loop geometric holonomy on $S^2$ and three-vertex complex overlap invariants is recorded below ([@rem-berry-pancharatnam-holonomy-literature]).

::: {.remark #rem-berry-pancharatnam-holonomy-literature title="Octant Berry Geometric Phase and the Solid-Angle Reading of the Bargmann Argument (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** If a qubit state traverses the closed octant geodesic triangle $N(\vv{e}_3) \to +X(\vv{e}_1) \to +Y(\vv{e}_2) \to N(\vv{e}_3)$ enclosing oriented solid angle $\Omega = \frac{\pi}{2}$ (one-eighth of the $4\pi$ sphere), the real direction $\vv{r}$ returns to $N$, yet under the standard spin-up eigenline convention its transported spinor acquires **Berry's geometric phase** (Berry, 1984; Simon, 1983) equal to minus one-half of the oriented solid angle:

$$
\gamma_B = -\frac{\Omega}{2} = -\frac{\pi}{4}.
$$

Capturing this geometric phase does not require integrating differential equations along a path: if we retain the **pairwise complex overlaps** $G_{ij} = \langle\psi_i, \psi_j\rangle$ among the three vertices $\psi_0, \psi_1, \psi_2$, the cyclic three-vertex Bargmann invariant (Bargmann, 1964; Pancharatnam, 1956)

$$
\Delta(\psi_0, \psi_1, \psi_2) = \langle\psi_0, \psi_1\rangle\langle\psi_1, \psi_2\rangle\langle\psi_2, \psi_0\rangle = G_{01} G_{12} G_{20}
$$

is invariant under independent vertex phase rephasings $\psi_k \mapsto e^{i\alpha_k}\psi_k$, and its complex phase encodes the solid angle directly via $\gamma_B \equiv -\arg\Delta = -\frac{\Omega}{2} \pmod{2\pi}$ (see [@rem-gram-hairy-ball-literature] at the end of the chapter for full differential-topological details).

$\Delta$ itself, however, is no longer a literature result: its Bloch form and its value $\frac{1+i}{4}$ on the octant loop are [@thm-qubit-bargmann-bloch] below. What remains literature is the link between the argument and the solid angle and Berry phase.
:::

::: {.viz src="berry-loop" preset="octant" height="500"}
**An eighth of the sphere.** The cyan loop $N \to +X \to +Y \to N$ encloses a magenta area $\Omega = \frac{\pi}{2}$. Carried once round, the amber arrow comes back to $N$ turned by $\frac{\pi}{2}$ from the dashed direction it set out in; the cyan needle at the lower right is the phase $\frac{\pi}{4}$ of the product of neighbouring inner products, $\Delta = \frac{1+i}{4}$ — exactly half the area. The general link between turn, phase and area is the literature result above, not formalized in this book; the value of $\Delta$ itself is [@thm-qubit-bargmann-bloch] below.
:::

**Where the modulus and the argument come from.** By [@thm-rank-one-chain-trace] of Chapter 3, the three-point Bargmann product is the trace of the three projectors multiplied in order: $\Delta = \langle\psi_0, \psi_1\rangle\langle\psi_1, \psi_2\rangle\langle\psi_2, \psi_0\rangle = \Tr(P_0 P_1 P_2)$, with $P_k = \lvert\psi_k\rangle\langle\psi_k\rvert$. On a qubit every projector is $P = \frac{1}{2}(I + \vv{r}\cdot\vv{\sigma})$, so this trace can be read off entirely from the three Bloch vectors.

::: {.theorem #thm-qubit-bargmann-bloch title="The Qubit Three-Point Bargmann Trace: a Scalar Part plus an Oriented Volume" lean="D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation"}
For $\vv{r} = (r_x, r_y, r_z) \in \mathbb{R}^3$ let

$$
P(\vv{r}) = \frac{1}{2}\begin{pmatrix} 1 + r_z & r_x - i\,r_y \\ r_x + i\,r_y & 1 - r_z \end{pmatrix} = \frac{1}{2}\bigl(I + \vv{r}\cdot\vv{\sigma}\bigr).
$$

1. For all $\vv{a}, \vv{b}, \vv{c} \in \mathbb{R}^3$,

   $$
   \Tr\bigl(P(\vv{a})\,P(\vv{b})\,P(\vv{c})\bigr) = \frac{1 + \vv{a}\cdot\vv{b} + \vv{b}\cdot\vv{c} + \vv{c}\cdot\vv{a}}{4} + i\,\frac{\vv{a}\cdot(\vv{b}\times\vv{c})}{4}.
   $$

2. In particular, $\Tr\bigl(P(\vv{e}_3)\,P(\vv{e}_1)\,P(\vv{e}_2)\bigr) = \frac{1+i}{4}$ and $\Tr\bigl(P(\vv{e}_3)\,P(\vv{e}_1)\,P(-\vv{e}_2)\bigr) = \frac{1-i}{4}$.

Claim 1 does not require $\vv{a}, \vv{b}, \vv{c}$ to be unit vectors; $P(\vv{r})$ is a projector only for a unit vector $\vv{r}$.
:::

::: proof
Lean multiplies the three $2\times 2$ matrices entry by entry, takes the trace, and collects terms using $i^2 = -1$. The same computation is written compactly with the Pauli multiplication table $\sigma_j\sigma_k = \delta_{jk}I + i\sum_l \varepsilon_{jkl}\sigma_l$ (a manual derivation):

$$
\begin{aligned}
(I + \vv{a}\cdot\vv{\sigma})(I + \vv{b}\cdot\vv{\sigma}) &= (1 + \vv{a}\cdot\vv{b})\,I + \bigl(\vv{a} + \vv{b} + i\,\vv{a}\times\vv{b}\bigr)\cdot\vv{\sigma}, \\
\Tr\bigl[(I + \vv{a}\cdot\vv{\sigma})(I + \vv{b}\cdot\vv{\sigma})(I + \vv{c}\cdot\vv{\sigma})\bigr] &= 2\bigl[1 + \vv{a}\cdot\vv{b} + (\vv{a} + \vv{b})\cdot\vv{c} + i\,(\vv{a}\times\vv{b})\cdot\vv{c}\bigr],
\end{aligned}
$$

where the second line uses $\Tr I = 2$, $\Tr\sigma_k = 0$ and $\Tr(\sigma_j\sigma_k) = 2\delta_{jk}$. Multiplying by $\frac{1}{8}$ and using $(\vv{a}\times\vv{b})\cdot\vv{c} = \vv{a}\cdot(\vv{b}\times\vv{c})$ gives Claim 1. Claim 2 is Claim 1 at $\vv{e}_3, \vv{e}_1, \pm\vv{e}_2$: all three pairwise dot products vanish and the triple product is $\pm 1$. The full proof is checked by the Lean kernel.
:::

**The modulus remembers the three sides; the argument remembers the volume.** The squared modulus of an overlap is the Born weight $\lvert\langle\psi_j, \psi_k\rangle\rvert^2 = \frac{1 + \vv{r}_j\cdot\vv{r}_k}{2}$ (the half-angle formula of [@ex-bloch-half-angle] in Chapter 2), so with $p = \vv{a}\cdot\vv{b}$, $q = \vv{b}\cdot\vv{c}$ and $s = \vv{c}\cdot\vv{a}$ we get $\lvert\Delta\rvert^2 = \frac{(1+p)(1+q)(1+s)}{8}$. [@thm-qubit-bargmann-bloch] gives the same modulus: for unit vectors the square of the triple product is the Gram determinant $1 + 2pqs - p^2 - q^2 - s^2$, and substituting it gives

$$
(1 + p + q + s)^2 + \bigl(\vv{a}\cdot(\vv{b}\times\vv{c})\bigr)^2 = 2\,(1+p)(1+q)(1+s)
$$

(a manual derivation; expand both sides to check). So the modulus of $\Delta$ remembers only the compatibility of each side, while the argument

$$
\arg\Delta = \operatorname{atan2}\bigl(\vv{a}\cdot(\vv{b}\times\vv{c}),\; 1 + p + q + s\bigr)
$$

holds something no single side can see: the oriented volume spanned by the three Bloch vectors. Walking the loop backwards swaps $\vv{b}$ and $\vv{c}$, which flips the sign of the volume and turns $\Delta$ into its conjugate; this is why, in the card "Walked the other way, the handedness flips" below, the three squared moduli stay the same while the pointer turns the other way. Reading this argument as the solid angle of the geodesic triangle, $\arg\Delta = \frac{\Omega}{2}$, takes in addition the solid-angle formula of Van Oosterom and Strackee, $\tan\frac{\Omega}{2} = \frac{\vv{a}\cdot(\vv{b}\times\vv{c})}{1 + p + q + s}$ (literature result, not formalized in this book; see [@rem-berry-pancharatnam-holonomy-literature]).

::: {.example #ex-bargmann-growing-triangles title="Ever Larger Geodesic Triangles: the Modulus of Δ Shrinks While Its Argument Follows the Area"}
Take $\vv{a} = \vv{e}_3$, $\vv{b} = (\sin\theta, 0, \cos\theta)$ and $\vv{c} = (0, \sin\theta, \cos\theta)$: one corner of the triangle sits at the north pole, the other two on two perpendicular meridians, both at distance $\theta$ from the pole. Then $p = s = \cos\theta$, $q = \cos^2\theta$ and $\vv{a}\cdot(\vv{b}\times\vv{c}) = \sin^2\theta$, and by [@thm-qubit-bargmann-bloch]

$$
\Delta = \frac{(1 + \cos\theta)^2}{4} + i\,\frac{\sin^2\theta}{4}, \qquad \arg\Delta = \arctan\Bigl(\tan^2\frac{\theta}{2}\Bigr).
$$

The last column of the table computes the spherical excess $\Omega$ independently, from the three side lengths by L'Huilier's formula, without using $\arg\Delta$; values are rounded to the digits shown.

| $\theta$ | $\operatorname{Re}\Delta$ | $\operatorname{Im}\Delta$ | $\lvert\Delta\rvert^2$ | $\frac{(1+p)(1+q)(1+s)}{8}$ | $\arg\Delta$ | $\frac{\Omega}{2}$ (L'Huilier) |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $30^\circ$ | $0.8705$ | $0.0625$ | $0.76170$ | $0.76170$ | $4.11^\circ$ | $4.11^\circ$ |
| $60^\circ$ | $0.5625$ | $0.1875$ | $0.35156$ | $0.35156$ | $18.43^\circ$ | $18.43^\circ$ |
| $90^\circ$ | $0.2500$ | $0.2500$ | $0.12500$ | $0.12500$ | $45.00^\circ$ | $45.00^\circ$ |
| $120^\circ$ | $0.0625$ | $0.1875$ | $0.03906$ | $0.03906$ | $71.57^\circ$ | $71.57^\circ$ |
| $150^\circ$ | $0.0045$ | $0.0625$ | $0.00393$ | $0.00393$ | $85.89^\circ$ | $85.89^\circ$ |

The row $\theta = 90^\circ$ is the octant loop: $\Delta = \frac{1+i}{4}$, which is Claim 2. As the triangle grows, its three sides become less and less compatible and $\lvert\Delta\rvert$ keeps shrinking, while the argument keeps growing and is always half the area. The fifth column equals the fourth row by row, which is the manual derivation above; the last two columns agree row by row, which is a numerical check of the Van Oosterom–Strackee formula on these five triangles, not a proof.
:::

To compute complex overlaps along any latitude circle cleanly, the Lean module `BargmannImaginaryMaximizers` defines, for $t \in \mathbb{R}$ and $z \in \mathbb{C}$, the two-component complex vector

$$
\operatorname{latitude}(t, z) = \bigl(\sqrt{1 - t},\; \sqrt{t}\,z\bigr) \in (\operatorname{Fin} 2 \to \mathbb{C}).
$$

::: {.corollary #cor-latitude-complex-overlap title="Complex Conjugate Dot Pairing on a Latitude Circle" lean="D5/S3/Quantum/Information/BargmannImaginaryMaximizers.Latitude.latitude_dot"}
Let $t \in \mathbb{R}$ satisfy $0 \le t \le 1$, and let $z, w \in \mathbb{C}$ be arbitrary complex numbers. Then the complex conjugate dot product satisfies

$$
\operatorname{star}\bigl(\operatorname{latitude}(t, z)\bigr) \cdot_v \operatorname{latitude}(t, w)
= (1 - t) + t\,\bar{z}\,w.
$$
:::

::: proof
Expanding the dot product over `Fin 2`, the first component contributes $\overline{\sqrt{1-t}}\sqrt{1-t} = 1 - t$ since $1 - t \ge 0$, and the second component contributes $\overline{\sqrt{t}\,z}\,(\sqrt{t}\,w) = t\bar{z}w$ since $t \ge 0$. Adding the two terms gives $(1 - t) + t\bar{z}w$. The full proof is checked by the Lean kernel.
:::

Note the exact contract of [@cor-latitude-complex-overlap]: it holds for all complex $z, w \in \mathbb{C}$ without assuming $|z| = |w| = 1$ (unit normalization of `latitude t z` requires $|z| = 1$ unless $t = 0$), and it computes inner-product overlaps rather than Berry holonomy itself. On the equator $t = \frac{1}{2}$ with $z = 1$ ($+X$) and $w = i$ ($+Y$), [@cor-latitude-complex-overlap] immediately evaluates the overlap $\langle\psi_1, \psi_2\rangle = \frac{1 + i}{2} = \frac{1}{\sqrt{2}}e^{i\pi/4}$, exhibiting the angle $\frac{\pi}{4}$ directly inside the pairwise Gram entry.

::: {.viz src="berry-loop" preset="equator" height="500"}
**Once round the equator.** The four corners $+X, +Y, -X, -Y$ all lie on the latitude $t = \frac{1}{2}$, so by [@cor-latitude-complex-overlap] each neighbouring inner product is $\frac{1+i}{2}$; their product is $-\frac{1}{4}$ and the cyan needle at the lower right stops at $\pi$. The magenta area is the whole northern hemisphere, $2\pi$. The amber arrow returns to $+X$ on top of the dashed one, as if it had not turned; the full magenta disc beside it shows that it has in fact turned a whole circle.
:::

::: {.film src="003-two-angles-berry"}
**One orthogonal step, then another: two-angle addressing and the Berry phase (1 min 58 s).** Turning about a single axis, the amber point only draws a circle; a tilt of $\theta = 60^\circ$ about $\vv{e}_2$ followed by a twist of $\varphi = 45^\circ$ about $\vv{e}_3$ lands it on $\bigl(\frac{\sqrt{6}}{4}, \frac{\sqrt{6}}{4}, \frac{1}{2}\bigr)$, and two axes only $30^\circ$ apart still reach a target in four alternating turns ([@thm-two-axis-finite-word]). Then two $90^\circ$ turns taken in either order stop at $+X$ and at $-Y$; carried around the octant loop, the arrow comes back turned by the enclosed area $\Omega = \frac{\pi}{2}$; finally the overlap $\frac{1+i}{2}$ of [@cor-latitude-complex-overlap] multiplies out to $\Delta = \frac{1+i}{4}$, whose phase $\frac{\pi}{4}$ stays put when every state is re-phased (for the Berry phase and the area, see [@rem-berry-pancharatnam-holonomy-literature]).
:::

## Keeping Instruments and Time Order {#sec-instruments-preserve-order}

Before turning to global Gram reconstruction, let us enforce a crucial operational boundary: **pairwise consistency of state overlaps never makes sequential physical operations commute, nor does it allow sequential measurement statistics to be deduced from static single-step effects alone.**

In quantum measurement theory, a binary qubit instrument is specified by Kraus operators $K_b \in M_2(\mathbb{C})$ ($b \in \mathrm{Bool}$). Its static POVM effects are $E_b = K_b^* K_b$ (summing to $I$), whereas its post-measurement branch update on state $\rho$ is $\rho \mapsto K_b \rho K_b^*$. If we left-multiply each Kraus operator by a unitary such as Pauli $X$, the static effects $L_b^* L_b = K_b^* X^* X K_b = K_b^* K_b$ remain completely unchanged — yet the post-measurement state is flipped! The following frozen proposition gives a hypothesis-free counterexample where two instruments have identical static effects for every outcome, but produce two-step joint Born weights $0$ and $1$.

::: {.proposition #prop-static-sequential-separation title="Separation of Two-Step Sequential Joint Laws Under Identical Static Effects" lean="D5/S3/Quantum/Measurement/StaticEffectSequentialSeparation.same_effects_different_two_step_joint_law"}
In $\mathrm{QubitMatrix} = M_2(\mathbb{C})$, let $P_0 = \operatorname{basisZeroDensity} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ and $X = \operatorname{qubitX} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$. Define two $\mathrm{Bool}$-indexed instruments

$$
\begin{aligned}
\operatorname{projectiveKraus}(\mathrm{outcome}) &= \begin{cases} I - P_0, & \mathrm{outcome} = \mathrm{true}, \\ P_0, & \mathrm{outcome} = \mathrm{false}, \end{cases} \\
\operatorname{flippedKraus}(\mathrm{outcome}) &= X \cdot \operatorname{projectiveKraus}(\mathrm{outcome}),
\end{aligned}
$$

along with $\operatorname{effect}(K, b) = K(b)^* K(b)$, $\operatorname{branch}(K, b, \rho) = K(b)\rho K(b)^*$, and $\operatorname{secondEffect} = I - P_0$. Then all five statements hold:

1. For every $\mathrm{outcome} \in \mathrm{Bool}$, $\operatorname{effect}(\operatorname{projectiveKraus}, \mathrm{outcome}) = \operatorname{effect}(\operatorname{flippedKraus}, \mathrm{outcome})$;
2. $\sum_{\mathrm{outcome}} \operatorname{effect}(\operatorname{projectiveKraus}, \mathrm{outcome}) = I$;
3. $\sum_{\mathrm{outcome}} \operatorname{effect}(\operatorname{flippedKraus}, \mathrm{outcome}) = I$;
4. $\operatorname{bornProbability}\bigl(\operatorname{branch}(\operatorname{projectiveKraus}, \mathrm{false}, P_0),\, \operatorname{secondEffect}\bigr) = 0$;
5. $\operatorname{bornProbability}\bigl(\operatorname{branch}(\operatorname{flippedKraus}, \mathrm{false}, P_0),\, \operatorname{secondEffect}\bigr) = 1$.
:::

::: proof
Since $X^* = X$ and $X^2 = I$, every outcome $b \in \mathrm{Bool}$ satisfies

$$
\operatorname{flippedKraus}(b)^* \operatorname{flippedKraus}(b) = K_b^* X^* X K_b = K_b^* K_b,
$$

establishing conjuncts 1–3. For the initial state $P_0$ and first outcome $\mathrm{false}$, the projective instrument leaves the branch state $P_0 P_0 P_0^* = P_0$, whose product with $\operatorname{secondEffect} = I - P_0$ has trace $0$; the flipped instrument sends $P_0$ to $X P_0 X = I - P_0$, whose product with $I - P_0$ equals $I - P_0$ and has trace $1$. The full proof is checked by the Lean kernel.
:::

## Hairy Ball, Hopf Fibers, and the Rotor Sphere {#sec-hairy-ball-hopf-rotors}

Why does local coordinate descriptions on the Bloch sphere $S^2$ inevitably run into gauge patches, phase twists, and singular poles? Why can we not simply assign a smooth tangent ruler and a smooth unit spinor $\lvert\psi(p)\rangle$ to every direction $p \in S^2$ once and for all?

Panel II of Figure 10 contrasts the two distinct topological obstructions on the base sphere $S^2$ with the global parallelizability of the rotor sphere $S^3$ (recorded below in [@rem-hopf-dirac-monopole-literature]):

::: {.remark #rem-hopf-dirac-monopole-literature title="Hairy Ball Obstruction on S², Hopf Principal Bundle, and Global Rotor Frame on S³ (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The two global topological obstructions on the base sphere $S^2$ and the global parallelizability of the total space $S^3$ contrast as follows (for full citations see [@rem-gram-hairy-ball-literature]):

1. **The Hairy Ball obstruction on the tangent bundle $TS^2$ ($\chi(S^2) = 2$)**: By the Poincaré–Hopf theorem, for any smooth tangent vector field with isolated zeros on a compact oriented manifold $M$, the sum of its zero indices equals the Euler characteristic $\chi(M)$. Because $\chi(S^2) = 2 \neq 0$, every continuous tangent vector field on $S^2$ must vanish somewhere. Explicitly, the meridian tangent field

   $$
   v(p) = \vv{e}_3 - (p \cdot \vv{e}_3)\,p \qquad (p \in S^2)
   $$

   equals $\vv{e}_3$ at $p = \vv{e}_1$ and vanishes at the two isolated poles $p = \pm\vv{e}_3$; each zero has index $+1$, summing to $1 + 1 = 2 = \chi(S^2)$.
2. **The Hopf bundle obstruction to a global phase section ($|c_1| = 1$)**: Distinct from the tangent bundle $TS^2$ (Euler number $2$) is the **Hopf principal circle bundle**

   $$
   S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2,
   $$

   projecting unit spinors in $S^3 \subset \mathbb{C}^2$ onto pure-state rays in $S^2 \cong \mathbb{CP}^1$. Choosing a continuous phase convention $p \mapsto \lvert\psi(p)\rangle \in S^3$ across all $p \in S^2$ would define a **global continuous section** $s : S^2 \to S^3$ of this principal $S^1$-bundle. Because a principal bundle admits a global continuous section if and only if it is trivial, and the Hopf bundle has first Chern number of magnitude $1$ ($\pm 1 \neq 0$), no continuous global section exists. In the Dirac monopole connection convention, the northern gauge potential $A_N = \frac{1}{2}(1 - \cos\theta)\,d\varphi$ and southern gauge potential $A_S = -\frac{1}{2}(1 + \cos\theta)\,d\varphi$ differ on the equatorial overlap by $A_N - A_S = d\varphi$, with curvature $F = \frac{1}{2}\sin\theta\,d\theta\wedge d\varphi$ integrating to $\frac{1}{2\pi}\int_{S^2} F = 1$.
3. **Global parallelizability of the rotor sphere $S^3 \cong \mathrm{SU}(2) \subset \mathrm{Cl}^+_{3,0}$ ($\chi(S^3) = 0$)**: Step up from the base sphere $S^2$ to the total space $S^3$ — realized geometrically as the norm-one **rotor group** inside the even Clifford algebra $\mathrm{Cl}^+_{3,0}$ (or unit quaternions). Here $\chi(S^3) = 0$, and multiplying any unit rotor $p \in S^3$ by the three bivectors $I_x, I_y, I_z$ of [Chapter 9](ch09-axes-and-state-addressing.md) produces an explicit, smooth, nowhere-vanishing global orthonormal tangent frame:

   $$
   \bigl(\, p I_x,\;\; p I_y,\;\; p I_z \,\bigr).
   $$

   Remember two essential distinctions: the homomorphism $\mathrm{SU}(2) \to \mathrm{SO}(3)$ is a $2:1$ double cover rather than an isomorphism, and global parallelizability of the total space $S^3$ trivializes $TS^3$ without providing a global section over the base sphere $S^2$.
:::

::: {.viz src="berry-loop" preset="comb" height="500"}
**The point that cannot be combed.** The small cyan arrows are $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$, the shadow of the vertical on each tangent plane. The amber point walks north from $+X$ along a meridian; its arrow, of length $\sin\theta$, shrinks and vanishes at the North Pole. The two poles circled in violet are the only zeros of this field, each of index $+1$ (a literature result, not formalized in this book).
:::

> Singularities arise when we try to flatten the phase fiber onto $S^2$; on the rotor sphere $S^3$, the global frame never vanishes.

::: {.figure src="ch10-gauge-winding"}
**In the north gauge the phase turns once around the south pole, so it has no value there.** The southern hemisphere seen from above, with the south pole at the centre. On two latitude circles, the cyan hand in each dial is the phase of $\langle 1\mid\psi_N\rangle$ for the north-gauge representative $\psi_N = \bigl(\cos\frac{\theta}{2}, e^{i\varphi}\sin\frac{\theta}{2}\bigr)$: once round a circle, the hands turn once round too; the inner circle, closer to the pole, still gives one full turn, so no value fits at the pole inside the dashed violet ring. That the Hopf bundle has no global section is a literature result, not formalized in this book ([@rem-hopf-dirac-monopole-literature]).
:::

## Reconstruction from the Full Complex Gram Matrix {#sec-complex-gram-reconstruction}

We are now ready to state the exact mathematical theorem behind *"compare things pairwise, always consistently, regardless of order"* (Panel III of Figure 10).

Suppose we have a finite family of complex state vectors arranged as the columns of an $m \times n$ matrix $A \in \mathbb{C}^{m \times n}$. Instead of referencing an external basis $C$ or cutting a singular phase chart on $S^2$, record the **full complex Gram matrix** of pairwise inner products:

$$
G = A^* A, \qquad G_{ij} = \langle \psi_i, \psi_j\rangle = \psi_i^* \psi_j \qquad (i, j \in n).
$$

Whenever a second $m \times n$ matrix $B \in \mathbb{C}^{m \times n}$ has the exact same complex Gram matrix $B^* B = A^* A$, the following frozen theorem guarantees a **single common ambient unitary matrix** $U \in U(m)$ such that $B = UA$.

::: {.figure src="ch10-common-turn"}
**Same table of pairwise overlaps, one common turn.** The grey triangle $A$ joins $N, +X, +Y$ (the three states of [@ex-octant-berry-gram]); the ink triangle $B = UA$, with $U = \operatorname{diag}(1, i)$, joins $N, +Y, -X$. The two violet curved arrows are one and the same $90^\circ$ turn about the vertical axis, carrying the whole triangle rigidly, and the two complex Gram matrices agree entry by entry ([@thm-gram-unitary-reconstruction]).
:::

::: {.theorem #thm-gram-unitary-reconstruction title="Ambient Unitary Reconstruction from Equal Complex Gram Matrices" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
Let $m$ be a finite index type with decidable equality (`Fintype m`, `DecidableEq m`) and let $n$ be any finite index type (`Finite n`). For any two complex matrices $B, A \in M_{m \times n}(\mathbb{C})$, if their complex Gram matrices are equal,

$$
B^* B = A^* A,
$$

then there exists an ambient unitary matrix $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$ such that

$$
B = U A.
$$
:::

::: proof
The equality $B^* B = A^* A$ implies $\norm{Bv}^2 = v^* B^* B v = v^* A^* A v = \norm{Av}^2$ for every column coefficient vector $v \in \mathbb{C}^n$. Hence the linear assignment $Av \mapsto Bv$ is a well-defined linear isometry from the column space $\operatorname{range}(A) \subseteq \mathbb{C}^m$ onto $\operatorname{range}(B) \subseteq \mathbb{C}^m$. Because $\mathbb{C}^m$ is finite-dimensional, the orthogonal complements $\operatorname{range}(A)^\perp$ and $\operatorname{range}(B)^\perp$ have equal dimension and admit a linear isometry between them; combining the two orthogonal summands yields a unitary matrix $U \in U(m)$ satisfying $B = UA$. The full proof is checked by the Lean kernel.
:::

Note the precise mathematical contract of [@thm-gram-unitary-reconstruction]:

1. **No extra hypotheses**: Neither normalization, invertibility, full column rank, a spanning assumption, nor nonemptiness of the index types is required;
2. **Uniqueness up to a common ambient unitary**: Neither $U$ nor coordinates are unique in general; this is an existence theorem, not a numerical reconstruction algorithm;
3. **Full complex overlaps and labels retained**: Reconstruction requires the full complex Gram equality $B^* B = A^* A$ with index labels preserved, not merely transition probabilities $|G_{ij}|^2$.

Let us pause to appreciate why [@thm-gram-unitary-reconstruction] resolves the apparent tension between path-dependent rotations and order-independent pairwise consistency:

- **Why solo local coordinate charts look path-dependent**: When an observer insists on describing each state $\psi_i$ separately by picking a single reference axis and a local phase chart on $S^2$, the global bundle obstructions recorded in [@rem-hopf-dirac-monopole-literature] force singular poles and path-dependent gauge jumps.
- **Why the full complex Gram matrix $G = A^* A$ is globally consistent and order-independent**: Instead of projecting states onto an arbitrary external basis $C$, $G_{ij} = \langle\psi_i, \psi_j\rangle$ records the direct relation between state $i$ and state $j$ for every pair $(i, j)$. Reading or verifying the entries of this Hermitian table in any order — whether row by row, column by column, or along a triangle $(0,1) \to (1,2) \to (2,0)$ — always refers to the same globally consistent inner-product geometry, which [@thm-gram-unitary-reconstruction] guarantees can be realized in $\mathbb{C}^m$ uniquely up to a single common ambient unitary $U \in U(m)$.
- **Why full complex phases matter**: If one discards complex phases and keeps only the real transition probabilities $|G_{ij}|^2$, then the octant triangle $(\psi_0, \psi_1, \psi_2)$ and its mirror-reflected conjugate triangle share the exact same squared moduli $|G_{ij}|^2$, losing the sign of the solid angle $\Omega = \pm\pi/2$. Retaining the full complex Gram entries $G_{ij}$ preserves the cyclic Bargmann product $\Delta = G_{01}G_{12}G_{20}$ and hence the exact geometric phase!

Moreover, for any family of normalized vectors $\norm{\operatorname{record}(i)} = 1$ in an inner-product space over $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, unit overlap $\langle \operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1$ characterizes literal equality of records and defines an equivalence relation.

::: {.lemma #lemma-unit-gram-equality title="Unit-Overlap Characterization of Equality for Normalized Records" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
Let $\mathbb{K}$ be a real or complex scalar field (`RCLike 𝕜`), let $E$ be a normed inner-product space over $\mathbb{K}$, let $\mathrm{Index}$ be any index type, and let $\operatorname{record} : \mathrm{Index} \to E$ satisfy $\norm{\operatorname{record}(i)} = 1$ for all $i \in \mathrm{Index}$. Then:

1. For all $i, j \in \mathrm{Index}$, $\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \;\Longleftrightarrow\; \operatorname{record}(i) = \operatorname{record}(j)$;
2. The relation $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ is an equivalence relation on $\mathrm{Index}$.
:::

::: proof
For unit vectors $u, v \in E$, expanding $\norm{u - v}^2 = \norm{u}^2 - 2\operatorname{Re}\langle u, v\rangle_{\mathbb{K}} + \norm{v}^2 = 2(1 - \operatorname{Re}\langle u, v\rangle_{\mathbb{K}})$ shows that $\langle u, v\rangle_{\mathbb{K}} = 1$ implies $\norm{u - v}^2 = 0$, hence $u = v$; the converse is immediate from $\norm{u} = 1$. Since the relation coincides with equality of records, reflexivity, symmetry, and transitivity follow immediately. The full proof is checked by the Lean kernel.
:::

Notice that [@lemma-unit-gram-equality] requires overlap equal to $1$, not modulus $|\langle u, v\rangle_{\mathbb{K}}| = 1$ (which identifies rays rather than vectors in the complex case), and requires neither completeness nor finite dimensionality.

::: {.example #ex-octant-berry-gram title="An Octant Triangle, a Complex Gram Matrix, and an Order Counterexample"}
(In this example, the spin-up Berry-phase convention $\gamma_B = -\Omega/2$ in item 1 and the Poincaré–Hopf zero-index sum in item 5 are each a **literature result, not formalized in this book**; see [@rem-berry-pancharatnam-holonomy-literature], [@rem-hopf-dirac-monopole-literature], and [@rem-gram-hairy-ball-literature].)

1. **Octant vertices, complex Gram matrix, and Berry phase**: In $\mathbb{C}^2$, take the three unit column vectors corresponding to North $+\vv{e}_3$, east $+\vv{e}_1$, and $+\vv{e}_2$:

   $$
   \psi_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad
   \psi_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \qquad
   \psi_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ i \end{pmatrix}.
   $$

   With $a = 1/\sqrt{2}$, [@cor-latitude-complex-overlap] at $t = 1/2, z = 1, w = i$ gives $\langle\psi_1, \psi_2\rangle = (1+i)/2$, so the $3\times 3$ complex Gram matrix $G = A^* A$ (for $A = [\psi_0, \psi_1, \psi_2] \in \mathbb{C}^{2\times 3}$) is

   $$
   G = \begin{pmatrix}
   1 & a & a \\
   a & 1 & (1+i)/2 \\
   a & (1-i)/2 & 1
   \end{pmatrix}.
   $$

   The cyclic Bargmann product is

   $$
   \Delta = G_{01}G_{12}G_{20} = \frac{1}{\sqrt{2}} \cdot \frac{1+i}{2} \cdot \frac{1}{\sqrt{2}} = \frac{1+i}{4} = \frac{\sqrt{2}}{4}\,e^{i\pi/4},
   $$

   with modulus $\sqrt{2}/4$ and argument $\arg\Delta = +\pi/4$. Its geodesic Bloch triangle has oriented solid angle $\Omega = \pi/2$. Under the chosen spin-up Berry convention, $\gamma_B = -\Omega/2 = -\pi/4$ (distinguishing $\arg\Delta = +\pi/4$ from the opposite sign in this Berry convention).
2. **Simultaneous unitary versus label permutation**: Applying $U = \operatorname{diag}(1, i)$ to the column matrix $A = [\psi_0, \psi_1, \psi_2]$ gives $B = UA$ with $B^* B = A^* U^* U A = A^* A = G$. A label permutation $P$ transforms the Gram matrix to $G' = P^* G P$ rather than leaving entries literally equal in the original indexing, and full complex phases $(1 \pm i)/2$ are essential — $|G_{ij}|^2$ alone loses the orientation sign.
3. **Noncommuting rotations and projectors**: Active right-hand rotations obey $R_x(\pi/2)R_y(\pi/2)\vv{e}_3 = \vv{e}_1$ whereas $R_y(\pi/2)R_x(\pi/2)\vv{e}_3 = -\vv{e}_2$. Likewise $P_0 P_+ \neq P_+ P_0$ for $P_0 = \operatorname{diag}(1, 0)$ and $P_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$.
4. **Sequential instrument counterexample**: For $K_0 = P_0$, $K_1 = I - P_0$, and $L_j = X K_j$, both instruments share identical static effects $K_j^* K_j = L_j^* L_j = P_j$. Starting at $\rho = P_0$, conditioning on first outcome $0$, and reading second effect $P_1$, the unnormalized joint Born weights are $0$ for $K$ and $1$ for $L$.
5. **Hairy-ball zeros and global rotor frame**: On $S^2$, $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$ is tangent, equals $\vv{e}_3$ at $p = \vv{e}_1$, and vanishes only at $p = \pm\vv{e}_3$, where both isolated zeros have index $+1$, totaling $2 = \chi(S^2)$. On the unit quaternion/rotor sphere $S^3$, $(pI_x, pI_y, pI_z)$ forms a global nowhere-vanishing tangent frame.
:::

::: {.viz src="berry-loop" preset="reverse" height="500"}
**Walked the other way, the handedness flips.** The same triangle taken as $N \to +Y \to +X \to N$: the magenta area is just as large, but the amber arrow turns $\frac{\pi}{2}$ the other way and the cyan needle at the lower right stops at $-\frac{\pi}{4}$. The three neighbouring squared moduli are still all $\frac{1}{2}$: squared moduli alone cannot tell the two walks apart.
:::

::: {.viz src="berry-loop" height="560"}
The full lab: drag the cyan corners, add a corner on an edge or reverse the loop, and compare the magenta area, the turn of the amber arrow and the phase on the cyan needle at the lower right; the “Order” and “Comb” scenes are one click away.
:::

### A Timeless Interpretation: How Gram Geometry Constrains Causally Compatible Choices {#sec-timeless-gram-causality}

> **Author's Original Words**: *"The essence of order-independence is that sequential before-and-after time simply does not exist at all... and that is why causality is so necessary." This single sentence slices straight through the 2,500-year-old "riddle of time" and "Hume's knot of causality."*
>
> **Author's Original Words**: *"Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field."*

Why is the pairwise inner-product ledger of the Gram matrix $G = A^* A$ so thoroughly order-independent? For a fixed family of states, the mathematical answer is that reading a table of relations does not change those relations. This book's timeless interpretation takes the structure one step further: **taking the absence of a sequential before-and-after flow at the foundational layer of quantum state geometry as an interpretive premise, it understands causal necessity as the geometric rigidity of global positive-semidefinite compatibility, and undetermined orthogonal directions as a finite observer's "causally compatible choice space."** This is the book's natural-philosophical position. What follows identifies its mathematical supports and the additional premises needed to move from static compatibility to physical causation and choice.

Let us develop this insight across four interconnected pillars:

1. **What Taylor Coefficients Contribute to the Image of "De-Ordering" — and Where They Stop**
   Recall the emergence of the classical timeline analyzed in [Chapter 3](ch03-projectors-and-duality.md) together with the Taylor series of the cosine function examined in Chapter 6:

   $$
   \cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
   $$

   Look closely at the factorial denominator **$(2k)!$**. The $n$-th Taylor coefficient is $f^{(n)}(0)/n!$ because differentiating $\theta^n$ $n$ times produces $n!$; the cosine's even derivatives at the origin are $(-1)^k$, giving the coefficients above. In combinatorics, $2k$ labeled objects do have $(2k)!$ permutations. But interpreting division by that factorial as removing redundant counts requires a separate argument that these permutations contribute equally and are counted repeatedly. The series itself supplies no such physical premise.

   Within this book's timeless interpretation, this normalization can serve as a geometric image of \"de-ordering\"; **the factorial coefficients do not thereby prove that time is absent or erase the order of actual operator actions.** For example, with $\hbar=1$ and the fixed Hamiltonian $H=X$ (the Pauli matrix), the explicitly time-dependent unitary evolution $U(t)=e^{-itX}=\cos t\,I-i\sin t\,X$ uses exactly the same Taylor coefficients and preserves $\cos^2t+\sin^2t=1$. Applying $U(t)$ to every state also preserves their Gram ledger, while individual states can still evolve in time. Moving from this order-independence to \"timelessness at the base layer\" therefore requires the book's interpretive premise; the noncommuting rotations and sequential-instrument differences calculated earlier remain intact.

2. **Hume's Causality Knot vs. Spinoza's Triangle & Gram Matrix PSD Rigidity**
   More than two centuries ago, David Hume posed a devastating challenge to human reason: if one presupposes a one-dimensional sequential flow of time, experience only ever reveals habitual conjunction (*"event $B$ follows event $A$"*), never a necessary logical bond proving that $A$ *must* produce $B$. As long as causality is sought inside a temporal chain of "earlier moments pushing later moments," causal necessity dissolves into psychological habit.

   How is Hume's knot untied? Already in the seventeenth century, Baruch Spinoza (*Ethics*, Part I, Proposition 17 Scholium) pointed to a timeless alternative: true necessity is never a temporal push from cause to effect, but **timeless geometric implication** — *"just as from the nature of a triangle it follows from eternity and to eternity that its three angles equal two right angles."* In a $3\text{-}4\text{-}5$ Euclidean right triangle, the legs $a=3$ and $b=4$ do not grow first in time and then "push" the hypotenuse into becoming $c=5$ a few nanoseconds later; all three sides coexist timelessly, and orthogonality locks the hypotenuse at $5$ in **zero elapsed time**.

   The geometric image of Spinoza's triangular necessity can be illustrated by **positive semidefiniteness of the Gram matrix of three real unit vectors**. We now adopt a real inner-product model: $\mathbf{A},\mathbf{B},\mathbf{C}\in\mathbb{R}^d$ are unit vectors; pure-qubit Bloch directions, for example, correspond to $d=3$. This real Gram matrix must be distinguished from the state-vector Gram matrix retaining complex phases in the preceding section. Using the usual vector angles $\theta_1,\theta_2,\theta_{AC}\in[0,\pi]$, write

   $$
   c_{AB} = \mathbf{A}\cdot\mathbf{B} = \cos\theta_1, \qquad
   c_{BC} = \mathbf{B}\cdot\mathbf{C} = \cos\theta_2, \qquad
   c_{AC} = \mathbf{A}\cdot\mathbf{C} = \cos\theta_{AC},
   $$

   positive semidefiniteness of the $3\times 3$ Gram matrix $G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix}$ (whose determinant equals the squared 3-wedge volume $\norm{\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}}^2$) enforces the static non-negativity constraint:

   $$
   \det G(\mathbf{A},\mathbf{B},\mathbf{C}) = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
   $$

   Completing the square with respect to $c_{AC}$ reveals the geometric anatomy of this inequality:

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   When the three vectors lie in the same two-dimensional correlation plane (vanishing 3-wedge volume $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$), the boundary condition $\det G(\mathbf{A},\mathbf{B},\mathbf{C}) = 0$ restricts the third overlap to two candidate endpoints on the shell:

   $$
   c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{\bigl(1 - c_{AB}^2\bigr)\bigl(1 - c_{BC}^2\bigr)} = \cos\bigl(\theta_1 \mp \theta_2\bigr).
   $$

   The two known overlaps generally do not select the sign: when $c_{AB}=c_{BC}=\frac12$, for example, coplanar configurations allow both $c_{AC}=1$ and $c_{AC}=-\frac12$. Selecting a branch also requires specifying whether the transverse components lie on the same or opposite sides of the $\mathbf{B}$ axis. The endpoints coincide only when the square root vanishes. The relation has two distinct implications:
   - **First, 100% permutation symmetry (order-independence)**: The equation contains no timestamps $t_1 < t_2 < t_3$ and is completely invariant under any relabeling of $\mathbf{A}, \mathbf{B}, \mathbf{C}$;
   - **Second, geometric rigidity as a support for the causal interpretation**: Once the two overlaps and the coplanar branch are given, the third overlap is fixed. This necessity expresses structural compatibility within one real-vector configuration; the determinant's permutation symmetry does not itself select a direction in which "$A$ causes $C$." The book reads this as a geometric image of causal necessity. Describing a concrete physical process still requires dynamics, instruments, and their order of action.

3. **The Gram Elliptope and the Finite Observer's "Causally Compatible Choice Space"**
   How can geometric rigidity still leave relations undetermined? The completed-square inequality supplies the answer: fixing $c_{AB},c_{BC}$ leaves an interval of possible $c_{AC}$. When the residual radius $\sin\theta_1\sin\theta_2>0$, projecting $\mathbf{A}$ and $\mathbf{C}$ perpendicular to $\mathbf{B}$ gives nonzero transverse components $\mathbf{A}_\perp=\mathbf{A}-c_{AB}\mathbf{B}$ and $\mathbf{C}_\perp=\mathbf{C}-c_{BC}\mathbf{B}$. Define $\phi\in[0,\pi]$ as the angle between these components, equivalently between the oriented bivectors $\mathbf{B}\wedge\mathbf{A}$ and $\mathbf{B}\wedge\mathbf{C}$. This convention gives the plus sign below. Using the angle between $\mathbf{A}\wedge\mathbf{B}$ and $\mathbf{B}\wedge\mathbf{C}$ instead reverses the sign of the cosine term.

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{product of known axial components}} + \underbrace{\cos\phi}_{\text{transverse angle parameter } \in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{residual radius}}.
   $$

   In the three-dimensional correlation coordinates $(x, y, z) = (c_{AB}, c_{BC}, c_{AC}) \in [-1, 1]^3$, the inequality $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ carves out a pillow-shaped convex body known in semidefinite programming and quantum correlation theory as the **Gram elliptope**. Every point is realizable by real unit vectors, but a fixed ambient dimension $d$ also requires $\operatorname{rank}G\le d$: $d\ge3$ accommodates the entire elliptope, whereas $d\le2$ permits only configurations with $\det G=0$ (still subject to the corresponding rank bound).
   - **The compatibility shell in the causal interpretation**: No configuration in this real-unit-vector model can lie outside the elliptope; $\det G<0$ would require a negative squared volume. The book understands this structural constraint as the geometric cage of causal law. It constrains compatible relations without itself specifying an arrow of time or a causal direction.
   - **The finite observer's causally compatible space**: If the observer knows only two overlaps, the residual radius is positive, and the ambient dimension is at least $3$, the unread transverse angle leaves the interval $[\cos(\theta_1+\theta_2),\,\cos(\theta_1-\theta_2)]$. The values $\cos\phi=\pm1$ give coplanar endpoints; $|\cos\phi|<1$ gives $\det G>0$ and nonzero 3-volume. If the residual radius vanishes, the interval collapses to $c_{AC}=c_{AB}c_{BC}$, the transverse angle is undefined, and this freedom disappears. **Finiteness alone guarantees neither a positive radius nor the observer's ability to realize every statically compatible completion.** Reading the interval as a "choice space" also requires the physical system to provide the corresponding reachable states and controls. Under these conditions, the book interprets selecting an undetermined relation as the observer picking a point in the causally compatible space.

4. **Clear Epistemic Boundary: Distinguishing Formalized Algebra from Natural-Philosophical & Cosmological Literature**
   In keeping with the strict epistemic contract of this book, we distinguish the mathematical results proved in Lean 4 — ambient unitary reconstruction from equal complex Gram matrices ([@thm-gram-unitary-reconstruction]), the unit-overlap equivalence criterion ([@lemma-unit-gram-equality]), and the separation between static effects and sequential instruments ([@prop-static-sequential-separation]) — together with standard linear-algebraic Gram determinant non-negativity $\det G(\mathbf{A},\mathbf{B},\mathbf{C}) = \sin^2\theta_1\sin^2\theta_2 - (c_{AC} - \cos\theta_1\cos\theta_2)^2 \ge 0$ and the convex geometry of the Gram elliptope, from the broader philosophical and quantum-cosmological literature connecting order-independent Gram geometry and causally compatible choice spaces to Hume's problem of causation, Spinoza's geometric necessity, and timeless quantum mechanics (the Wheeler–DeWitt equation and the Page–Wootters conditional-time mechanism), which we develop in full in [Chapter 29](ch29-timeless-causality-and-gram-space.md) of Part VIII (building on the circuit-complexity bounds of [Chapter 20](ch20-complexity-and-spacetime.md)).

::: {.remark #rem-gram-hairy-ball-literature title="Hairy Ball and Hopf Obstructions: Literature Result, Not Formalized in This Book"}
**Literature result, not formalized in this book.** Classical results from differential topology, mathematical physics, and the philosophy of causation frame the geometric discussions in Sections 1, 3, and 4:

1. **Poincaré–Hopf index theorem and the Hairy Ball Theorem** (J. W. Milnor, *Topology from the Differentiable Viewpoint*, University Press of Virginia, 1965): For any smooth tangent vector field with isolated zeros on a compact oriented manifold $M$, the sum of the indices at its zeros equals the Euler characteristic $\chi(M)$. Because $\chi(S^{2n}) = 2$ for all $n \ge 1$, every continuous tangent field on $S^{2n}$ has a zero (the continuous case follows by smooth approximation), as illustrated on $S^2$ by the two-zero field $v(p) = \vv{e}_3 - (p\cdot\vv{e}_3)p$ of total index $1 + 1 = 2$.
2. **Hopf principal circle bundle and Dirac monopole potentials** (P. A. M. Dirac, *Proc. R. Soc. A* **133**, 60–72, 1931, DOI `10.1098/rspa.1931.0130`; M. Nakahara, *Geometry, Topology and Physics*, 2nd Ed., 2003): The Hopf fibration $S^1 \hookrightarrow S^3 \to S^2$ is a principal circle bundle whose first Chern number has magnitude $1$. Because a global continuous section would trivialize the bundle, no such section exists. With the Dirac monopole connection potentials $A_N = \frac{1}{2}(1 - \cos\theta)\,d\varphi$ and $A_S = -\frac{1}{2}(1 + \cos\theta)\,d\varphi$, one has $A_N - A_S = d\varphi$ and curvature $F = \frac{1}{2}\sin\theta\,d\theta\wedge d\varphi$ with $\frac{1}{2\pi}\int_{S^2} F = 1$ (under this connection convention; spin-up Berry curvature for $\gamma_B = -\Omega/2$ has the opposite sign). Do not conflate the tangent bundle $TS^2$ (Euler number $2$) with the Hopf line bundle (Chern number $\pm 1$).
3. **Parallelizability of the rotor group $S^3 \cong \mathrm{SU}(2) \subset \mathrm{Cl}^+_{3,0}$**: Unit rotors form the norm-one sphere $S^3 \cong \mathrm{SU}(2)$ in the even Clifford algebra $\mathrm{Cl}^+_{3,0}$, which has $\chi(S^3) = 0$ and is globally parallelized by the explicit frame $(pI_x, pI_y, pI_z)$ (rather than inferring parallelizability from $\chi(S^3) = 0$ alone). The map $\mathrm{SU}(2) \to \mathrm{SO}(3)$ is a double cover, not an isomorphism, and parallelizability of the total space $S^3$ does not yield a global section over $S^2$.
4. **Berry phase as bundle holonomy** (M. V. Berry, *Proc. R. Soc. A* **392**, 45–57, 1984, DOI `10.1098/rspa.1984.0023`; B. Simon, *Phys. Rev. Lett.* **51**, 2167, 1983, DOI `10.1103/PhysRevLett.51.2167`): For the adiabatically transported spin-up eigenline with dynamical phase removed and orientation fixed, the geometric phase is $\gamma_B = -\Omega/2$. This holonomy persists when all complex information is retained, and pairwise Gram consistency never erases physical noncommutativity.
5. **Hume's problem of causation, Spinoza's geometric necessity, and timeless quantum correlations** (D. Hume, *A Treatise of Human Nature*, 1739 / *An Enquiry Concerning Human Understanding*, 1748; B. Spinoza, *Ethica, Ordine Geometrico Demonstrata*, 1677, Part I, Prop. 17 Scholium; and, as developed further in [Chapter 29](ch29-timeless-causality-and-gram-space.md), B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967, and D. N. Page, W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983): The algebraic core of Section 4's discussion of order-independence and causal rigidity is the positive-semidefinite Gram determinant constraint $\det G(\mathbf{A},\mathbf{B},\mathbf{C}) \ge 0$ together with [@thm-gram-unitary-reconstruction]; connecting this structure to Hume's critique of temporal causation, Spinoza's geometric determinism, and timeless quantum states belongs to the philosophical and physical interpretation layer and is not formalized in the Lean codebase.
:::

Now that we understand how rotations, phases, and Gram matrices fit together on the sphere, how does an actual superconducting quantum processor execute these spherical rotations in hardware? Why do $X$ and $Y$ gates require tens of nanoseconds of microwave pulse area, whereas a $Z$ gate can be executed in **zero analog duration**? Let us step into [Chapter 11](ch11-pulses-and-virtual-z.md).
