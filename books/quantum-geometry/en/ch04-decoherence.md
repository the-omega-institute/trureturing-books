# Chapter 4 When Sight Turns Away: Decoherence, Mixed States, and the Truncated Chord Inside the Sphere

> *"So everything is settled, without a single exception — even the structure of the observer works this way."*

Throughout our first three chapters, the single-qubit arrow $\vv{a}$ stood proudly on the **outer shell** of the unit sphere $S^2$ ($\norm{\vv{a}} = 1$): in [Chapter 1](ch01-measurement.md) as a real three-dimensional ray freed of global phase redundancy, in [Chapter 2](ch02-born-rule.md) as the geometric source of Born's half-angle law $\cos^2(\theta/2)$, and in [Chapter 3](ch03-projectors-and-duality.md) as a unit hypotenuse split by an idempotent line $P^2 = P$ into axial particle bias and equatorial wave coherence.

Walk into an actual superconducting-qubit lab, ion-trap chamber, or NMR spectrometer, however, and pure shell states are the exception rather than the rule. Real experimental states live inside the **interior** of the Bloch ball as **mixed states**: their Bloch vector $\vv{r}$ shrinks into a truncated chord $\norm{\vv{r}} < 1$, often collapsing all the way to the featureless dead center $\vv{r} = \vv{0}$.

Who stole the missing length $1 - \norm{\vv{r}}$? Does "decoherence" mean that nature suffers an irreversible ontological decay? Closing Part I, this chapter explains the geometric mechanism of mixed states: **orthogonal record coupling and partial-trace marginalization in a larger joint space shorten the reduced local state** ([@thm-nonselective-marginal] and [@thm-reduced-access-defect], alongside C\*-algebraic representation compression [@thm-stinespring-dilation] and the general Schrödinger-picture channel dilation recorded in [@rem-stinespring-literature]). Picture a tilted spear casting a shorter shadow to get a feel for the shortening of the local Bloch vector; the partial trace itself acts on the joint density operator.

::: {.figure src="ch04-overview"}
**Figure 4.** The chapter at a glance, each panel a vertical cross-section of the Bloch ball. Panel I: the amber local arrow heads for $\lvert +\rangle$ on the shell (dashed) but stops inside at $\cos\theta_{\mathrm{env}}$. Panel II: amplitude damping ($\gamma = \frac{1}{2}$) shrinks the ball and pushes it north into the cyan ellipse; $\rho$ at the north pole stays, $\sigma$ at $+x$ is pulled north, and the line between them shrinks from the dashed one to the solid one, $T$ from $0.707$ to $0.433$ ([@prop-trace-distance-metric-contraction]; the Bloch form of this channel is a literature result, not formalized in this book). Panel III: the amber point first loses its sideways part and lands on the vertical axis, then loses $r_z$ and lands on the violet centre $\frac{1}{2}I$.
:::

## 4.1 Pure States Are the Spherical Shell ($\|\vv{r}\| = 1$), Mixed States Are Truncated Chords Inside ($\|\vv{r}\| < 1$) {#sec-ch04-1}

Start with a three-line Feynman calculation. Prepare a qubit pointing due east on the Bloch equator ($\vv{r} = +\vv{e}_1$), the pure superposition $\lvert +\rangle = \frac{1}{\sqrt{2}}(\lvert 0\rangle + \lvert 1\rangle)$ of unit transverse coherence $r_x = 1$.

Now let a stray environmental degree of freedom — a cavity photon or a microscopic two-level defect in the substrate — brush past your qubit. When the qubit sits in $\lvert 0\rangle$, the environment remains in its initial state $\lvert e_0\rangle$; when the qubit sits in $\lvert 1\rangle$, the interaction nudges the environment arrow by angle $\theta_{\mathrm{env}}$ into another unit state $\lvert e_1\rangle$ with overlap $\langle e_0\mid e_1\rangle = \cos\theta_{\mathrm{env}} \in [0, 1]$. Globally, the combined system–environment state is still a $100\%$ pure vector of unit norm:

$$
\lvert\Psi_{\mathrm{SE}}\rangle = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle \otimes \lvert e_0\rangle + \lvert 1\rangle \otimes \lvert e_1\rangle\bigr).
$$

Next, the environment particle flies beyond reach of your detectors. Looking solely at your local qubit means taking the **partial trace** over the environment (summing diagonal projections across an orthonormal basis of the environment). Watch what happens to the reduced qubit matrix $\rho_{\mathrm{S}} = \Tr_{\mathrm{E}}(\lvert\Psi_{\mathrm{SE}}\rangle\langle\Psi_{\mathrm{SE}}\rvert)$:

$$
\rho_{\mathrm{S}} = \frac{1}{2}\begin{pmatrix} \langle e_0\mid e_0\rangle & \langle e_1\mid e_0\rangle \\ \langle e_0\mid e_1\rangle & \langle e_1\mid e_1\rangle \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 1 & \cos\theta_{\mathrm{env}} \\ \cos\theta_{\mathrm{env}} & 1 \end{pmatrix}!
$$

Compare this with [@prop-qubit-bloch-core] from [Chapter 1](ch01-measurement.md): its Bloch vector is $\vv{r} = (\cos\theta_{\mathrm{env}},\, 0,\, 0)$! The joint state remains a pure vector of unit norm. In this equal-weight example with real, nonnegative overlap between the environment records, the local Bloch vector has length $\|\vv{r}\| = \cos\theta_{\mathrm{env}}$: the greater the angle between those two records, the shorter the "shadow." The partial trace is not an orthogonal projection of the joint ket onto a three-dimensional local subspace.

::: {.figure src="ch04-env-shadow"}
**The shadow between the two environment records is the length of the local Bloch arrow.** On the left, the environment states $\lvert e_0\rangle$ and $\lvert e_1\rangle$ meet at the angle $\theta_{\mathrm{env}}$, and the cyan shadow of $\lvert e_1\rangle$ on $\lvert e_0\rangle$ has length $\cos\theta_{\mathrm{env}}$. On the right, in the vertical cross-section of the Bloch ball, the amber arrow $\vv{r}$ heads for $\lvert +\rangle$ on the shell (dashed) but reaches only $\cos\theta_{\mathrm{env}}$; the cyan segment beneath it is exactly as long as the shadow on the left. The figure takes $\theta_{\mathrm{env}} = 50^\circ$.
:::

In the sharp limit $\theta_{\mathrm{env}} = 90^\circ$ where the environment distinguishes system branches orthogonally ($\cos 90^\circ = 0$), the interaction is an isometric recording map, and turning one's gaze away from the record reproduces the exact Lüders unread state $\sum_a P_a \rho P_a$ of [Chapter 3](ch03-projectors-and-duality.md). Our first theorem proves this identity across arbitrary finite systems and outcome registers.

::: {.viz src="bloch-noise" preset="shorten" height="500"}
**Turn the angle between the records and the local arrow shortens with it.** At the bottom right are the two records $\lvert e_0\rangle$, $\lvert e_1\rangle$ of the environment; along the rail their angle $\theta_{\mathrm{env}}$ turns from $0^\circ$ to $90^\circ$, and the cyan shadow is their overlap $\cos\theta_{\mathrm{env}}$. After the environment is traced out, the amber $\rho$ that started at $\lvert +\rangle$ (and the white $\sigma$ from $\lvert -\rangle$) shrinks along the horizontal axis to exactly $\cos\theta_{\mathrm{env}}$. The frame stops at $75^\circ$, where the arrow keeps $0.26$; at $90^\circ$ the records are orthogonal and the arrow has shrunk to the centre.
:::

::: {.theorem #thm-nonselective-marginal title="Partial Trace of Isometric Recording Equals the Nonselective Block Sum" lean="D5/S3/Quantum/Decoherence/NonselectiveMarginalization.nonselective_recording_marginal"}
Let $\mathrm{System}$ and $\mathrm{Outcome}$ be finite types with decidable equality, and let $\{P_a\}_{a \in \mathrm{Outcome}}$ be a family of matrices on $\mathrm{System}$ satisfying self-adjointness $P_a^* = P_a$, orthogonal idempotence $P_a P_b = \delta_{ab} P_a$, and completeness $\sum_a P_a = I$. Define the canonical recording matrix $V \in M_{(\mathrm{System} \times \mathrm{Outcome}) \times \mathrm{System}}(\mathbb{C})$ and the partial trace $\Tr_{\mathrm{Outcome}}$ over the outcome register by

$$
V_{(i, a),\, j} = (P_a)_{i, j}, \qquad \bigl(\Tr_{\mathrm{Outcome}}(J)\bigr)_{i, j} = \sum_{a \in \mathrm{Outcome}} J_{(i, a),\, (j, a)}.
$$

Then for every system matrix $\rho \in M_{\mathrm{System}}(\mathbb{C})$, tracing out the recording register yields the nonselective sum of diagonal projective blocks:

$$
\Tr_{\mathrm{Outcome}}(V \rho V^*) = \sum_{a \in \mathrm{Outcome}} P_a \rho P_a.
$$
:::

::: proof
Evaluate block $(a, b)$ of the joint matrix $J = V \rho V^*$ at system indices $(i, j)$:

$$
(V \rho V^*)_{(i, a),\, (j, b)} = \sum_{k, l \in \mathrm{System}} V_{(i, a),\, k}\,\rho_{k, l}\,\overline{V_{(j, b),\, l}} = \sum_{k, l \in \mathrm{System}} (P_a)_{i, k}\,\rho_{k, l}\,(P_b^*)_{l, j} = (P_a \rho P_b)_{i, j},
$$

using $P_b^* = P_b$ (`recording_isometry_and_state_blocks` in Lean; note also $V^* V = \sum_a P_a^* P_a = \sum_a P_a = I$, confirming that $V$ is an isometry). Setting $b = a$ and summing over $a \in \mathrm{Outcome}$ omits every off-diagonal environment block $a \neq b$ and leaves entrywise $\sum_a (P_a \rho P_a)_{i, j}$. The full proof is checked by the Lean kernel.
:::

Within this orthogonal-record model, [@thm-nonselective-marginal] demystifies decoherence at a stroke: the interference blocks $P_a \rho P_b$ ($a \neq b$) never vanished from $V \rho V^*$ — they are sitting intact in the off-diagonal environment sectors $(a, b)$! Only because $\Tr_{\mathrm{Outcome}}$ sums exclusively along diagonal sectors $(a, a)$ do those cross-blocks disappear from the local ledger. Traditional textbook orthodoxy drew a mysterious "Heisenberg cut" between microscopic systems and macroscopic observers, as if the observer enjoyed a special exemption outside quantum geometry; in this book's geometric interpretation, isometric recording provides a unified model across that artificial divide — **so everything is settled, without a single exception: even the structure of the observer works this exact way**: the observer's memory register can also be described within this model by orthogonal coupling and partial trace. The "tilted spear in a larger space" is a metaphor for the equal-weight two-branch example above, not a general vector-projection formula for the partial trace.

[@thm-nonselective-marginal] is an isometric recording dilation built by hand for one family of orthogonal projections. For a general completely positive map, Stinespring's dilation instead gives a representation compression $\varphi(a)=V^{\dagger}\pi(a)V$, where $V$ need not be an isometry; its general C\*-algebraic form is frozen in the pinned repository. The setting is the Heisenberg picture: the map $\varphi$ acts on observables rather than on states.

::: {.theorem #thm-stinespring-dilation title="Stinespring's Dilation Theorem: A Completely Positive Map Is a Representation Sandwiched between V† and V" lean="D5/S3/HilbertOperators/Stinespring.stinespring_dilation"}
Let $A$ be a unital complex C\*-algebra with a partial order compatible with the star operation (`[CStarAlgebra A]`, `[PartialOrder A]`, `[StarOrderedRing A]`), let $H$ be a complex Hilbert space (`[NormedAddCommGroup H]`, `[InnerProductSpace ℂ H]`, `[CompleteSpace H]`), and let $\varphi : A \to B(H)$ be a completely positive map (`φ : A →CP (H →L[ℂ] H)`), where $B(H)$ denotes the bounded linear operators on $H$. Then there exist

- a complex Hilbert space $K$,
- a unital \*-algebra homomorphism $\pi : A \to B(K)$ (`π : A →⋆ₐ[ℂ] (K →L[ℂ] K)`),
- a bounded linear operator $V : H \to K$,

such that for all $a \in A$ and $x \in H$,

$$
\varphi(a)\,x \;=\; V^{\dagger}\,\pi(a)\,V\,x ,
$$

where $V^{\dagger}$ is the adjoint of $V$.
:::

::: proof
The construction is of the same type as the GNS construction. On the space of finitely supported $H$-valued functions (formal sums $\sum_i a_i \otimes x_i$) define the sesquilinear form $\bigl\langle \sum_i a_i \otimes x_i,\ \sum_j b_j \otimes y_j \bigr\rangle = \sum_{i,j} \langle x_i,\ \varphi(a_i^{*} b_j)\,y_j\rangle$. Complete positivity is exactly what makes this form positive semidefinite (`cp_gram_sum_nonneg`). Quotienting by null vectors and completing yields the Hilbert space $K$. Left multiplication of $A$ on formal sums, $a \cdot (b \otimes y) = ab \otimes y$, is bounded for this form and extends to $K$ as $\pi(a)$; checking in turn that it respects addition, scalar multiplication, products, the unit, and the star shows that $\pi$ is a \*-algebra homomorphism. The operator $V$ sends $x$ to the class of $1 \otimes x$ and is bounded as well. The conclusion follows from the inner-product identity $\langle x,\ V^{\dagger}\pi(a)V y\rangle = \langle 1 \otimes x,\ a \otimes y\rangle = \langle x,\ \varphi(a)\,y\rangle$ (`stinespringV_inner_rep`). The full proof is checked by the Lean kernel.
:::

Taking $a = 1$ in [@thm-stinespring-dilation] and using $\pi(1) = 1$ gives $\varphi(1) = V^{\dagger}V$ at once: $V$ is an isometry if and only if $\varphi$ is unital (a one-line manual derivation). Under finite-dimensional state–observable duality, unitality of $\varphi$ corresponds to trace preservation of the state map.

::: {.example #ex-pinching-stinespring-by-hand title="The Stinespring Dilation of Computational-Basis Pinching on a Qubit, Checked by Hand"}
Take $A = M_2(\mathbb{C})$, $H = \mathbb{C}^2$, and let $\varphi$ be the action of computational-basis pinching on observables:

$$
\varphi(a) \;=\; P_0\,a\,P_0 + P_1\,a\,P_1 \;=\; \begin{pmatrix} a_{00} & 0 \\ 0 & a_{11} \end{pmatrix}, \qquad P_j = \lvert j\rangle\langle j\rvert .
$$

One set of dilation data is: $K = \mathbb{C}^2 \otimes \mathbb{C}^2$, $\pi(a) = a \otimes I_2$, $V\lvert j\rangle = \lvert j\rangle \otimes \lvert j\rangle$ for $j = 0, 1$. Clearly $\pi$ is a unital \*-homomorphism. Check matrix element by matrix element:

$$
\langle i\rvert\, V^{\dagger}\,(a \otimes I_2)\,V\,\lvert j\rangle \;=\; \bigl(\langle i\rvert \otimes \langle i\rvert\bigr)\,(a \otimes I_2)\,\bigl(\lvert j\rangle \otimes \lvert j\rangle\bigr) \;=\; a_{ij}\,\langle i \mid j\rangle \;=\; a_{ij}\,\delta_{ij},
$$

so $V^{\dagger}\pi(a)V = \operatorname{diag}(a_{00}, a_{11}) = \varphi(a)$. Moreover $V^{\dagger}V = I_2$, in agreement with $\varphi(I_2) = I_2$. This $V$ is exactly the isometry of [@thm-nonselective-marginal] that copies the branch label into the record register: the second factor $\mathbb{C}^2$ is the record. The off-diagonal entries $a_{01}$ and $a_{10}$ have not disappeared; they are still inside $a \otimes I_2$ and are merely sandwiched away by $V$.
:::

::: {.remark #rem-stinespring-literature title="Stinespring's Dilation Theorem and Microscopic Bath Underdetermination (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In this chapter, [@thm-nonselective-marginal] constructs an explicit isometric recording dilation for finite orthogonal projective families $\{P_a\}$, and [@thm-reduced-access-defect] gives an explicit two-qubit unitary dilation for controlled copying. For an arbitrary completely positive trace-preserving (CPTP) quantum channel $\mathcal{E} : M_d(\mathbb{C}) \to M_{d'}(\mathbb{C})$, norm-preserving high-dimensional embedding is governed by **Stinespring's dilation theorem** (W. F. Stinespring, *Positive functions on $C^*$-algebras*, Proc. Amer. Math. Soc. **6**, 211–216, 1955):

1. **Existence of isometric and unitary dilations**: There exists a finite-dimensional auxiliary environment Hilbert space $\mathcal{H}_{\mathrm{E}}$ (of dimension at most $d d'$, with minimal dimension equal to the Choi rank of $\mathcal{E}$) and a linear isometry $V : \mathcal{H}_{\mathrm{S}} \to \mathcal{H}_{\mathrm{S}'} \otimes \mathcal{H}_{\mathrm{E}}$ ($V^* V = I_{\mathrm{S}}$) such that $\mathcal{E}(\rho) = \Tr_{\mathrm{E}}(V \rho V^*)$ for all $\rho \in M_d(\mathbb{C})$; when $d' = d$, fixing a reference pure ancilla $\lvert e_0\rangle \in \mathcal{H}_{\mathrm{E}}$ and extending $V\lvert\psi\rangle = U(\lvert\psi\rangle \otimes \lvert e_0\rangle)$ to a joint unitary $U$ yields $\mathcal{E}(\rho) = \Tr_{\mathrm{E}}\bigl(U(\rho \otimes \lvert e_0\rangle\langle e_0\rvert)U^*\bigr)$.
2. **Minimal-isometry unitary equivalence versus physical bath underdetermination**: Any two **minimal** isometric dilations $(\mathcal{H}_{\mathrm{E}_1}, V_1)$ and $(\mathcal{H}_{\mathrm{E}_2}, V_2)$ of the same channel $\mathcal{E}$ (with linearly independent Kraus operators and no uncoupled environment subspace) are related by a unique unitary operator $W : \mathcal{H}_{\mathrm{E}_1} \to \mathcal{H}_{\mathrm{E}_2}$ on the auxiliary environment satisfying $(I_{\mathrm{S}'} \otimes W)V_1 = V_2$. Physically, however, knowing the reduced channel $\mathcal{E}$ alone **underdetermines the actual microscopic bath**: redundant non-minimal bath dimensions, local basis rotations $W$ on $\mathcal{H}_{\mathrm{E}}$, and the continuous-time system–bath Hamiltonian $H_{\mathrm{SE}}(t)$ or interaction history that generated $V$ cannot be uniquely reconstructed from local channel tomography alone.

Of these, existence in its general C\*-algebraic form (Heisenberg picture, $\varphi(a) = V^{\dagger}\pi(a)V$) is verified by [@thm-stinespring-dilation]. Passing from it to the finite-dimensional Schrödinger-picture form of item 1 takes two further steps: every representation of the matrix algebra $M_{d'}(\mathbb{C})$ is unitarily equivalent to $a \mapsto a \otimes I_{\mathrm{E}}$, and the duality $\Tr(\mathcal{E}(\rho)\,a) = \Tr(\rho\,\varphi(a))$. Trace preservation of $\mathcal{E}$ makes its dual $\varphi$ unital, so $V$ is an isometry in this case. These two steps, the dimension bounds, and the minimal-dilation uniqueness of item 2 are still cited from the classical operator-algebra literature and are not claimed in the book's Lean verification ledger.
:::

An immediate, far-reaching consequence follows: **apparent local irreversibility is not dynamical destruction — it is an access defect caused by losing the environment key!**

Test this on the sharpest possible pair: prepare East $\rho = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & 1\\ 1 & 1\end{smallmatrix}\bigr)$ versus West $\sigma = \lvert -\rangle\langle -\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & -1\\ -1 & 1\end{smallmatrix}\bigr)$ alongside a blank environment qubit $\lvert 0\rangle_{\mathrm{env}}$, and apply the reversible controlled-copy unitary $U_{\mathrm{copy}}$ (a CNOT permutation flipping the environment bit $a \mapsto 1 - a$ iff the system bit is $1$). Afterward:

1. Locally on the system qubit alone, $\rho$ and $\sigma$ collapse to the **exact same** dead-center matrix $\frac{1}{2}I$ — no local recovery map on Earth can tell whether the input was $\lvert +\rangle$ or $\lvert -\rangle$;
2. Globally on the joint two-qubit register, the two output states remain completely distinct, and applying the inverse unitary $U_{\mathrm{copy}}^*$ restores both $\rho$ and $\sigma$ without a scratch!

The next theorem packages all six parts of this diagnosis into a single kernel-verified statement.

::: {.theorem #thm-reduced-access-defect title="Reduced Irreversibility Is an Environment-Record Access Defect" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect"}
Let $\rho, \sigma \in M_2(\mathbb{C})$ be two qubit matrices with identical diagonal entries ($\forall i,\, \rho_{ii} = \sigma_{ii}$) but at least one distinct off-diagonal entry ($\exists i \neq j,\, \rho_{ij} \neq \sigma_{ij}$). Write $U_{\mathrm{copy}} \in M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$ for the controlled address-copy permutation matrix, $B(\tau) = \tau \otimes \lvert 0\rangle\langle 0\rvert_{\mathrm{env}}$ for the blank-environment joint embedding, $R(\tau)$ for the controlled-record joint state, and $\Tr_{\mathrm{env}}$ for the partial trace over the environment. Then all six statements hold:

1. **Unitarity of global coupling**: $U_{\mathrm{copy}} \in U(\mathrm{Fin}\,2 \times \mathrm{Fin}\,2, \mathbb{C})$;
2. **Forward unitary record writing**: $U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^* = R(\rho)$ and $U_{\mathrm{copy}} B(\sigma) U_{\mathrm{copy}}^* = R(\sigma)$;
3. **Identical reduced system marginals**: $\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$;
4. **Distinct global joint states**: $R(\rho) \neq R(\sigma)$;
5. **Impossibility of local recovery**: there exists no recovery map $\mathcal{R} : M_2(\mathbb{C}) \to M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$ on the reduced state alone satisfying both $\mathcal{R}(\Tr_{\mathrm{env}}(R(\rho))) = R(\rho)$ and $\mathcal{R}(\Tr_{\mathrm{env}}(R(\sigma))) = R(\sigma)$;
6. **Exact global unitary reversibility**: $U_{\mathrm{copy}}^* R(\rho) U_{\mathrm{copy}} = B(\rho)$ and $U_{\mathrm{copy}}^* R(\sigma) U_{\mathrm{copy}} = B(\sigma)$.
:::

::: proof
Because $(i, a) \mapsto (i, a \oplus i)$ is an involutive permutation of `Fin 2 × Fin 2`, its permutation matrix $U_{\mathrm{copy}}$ is unitary (claim 1). Conjugating the blank-environment embedding $B(\tau)$ by $U_{\mathrm{copy}}$ reindexes entries so that system indices $(i, j)$ are copied into environment addresses $(i, i)$ and $(j, j)$, producing $R(\tau)$ (claim 2). Tracing out the environment kills $i \neq j$ terms by address mismatch and retains only diagonal entries $\tau_{ii}$; since $\rho_{ii} = \sigma_{ii}$, the reduced states coincide: $\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$ (claim 3). Meanwhile, entry $((i, i), (j, j))$ of $R(\tau)$ equals $\tau_{ij}$, so $\rho_{ij} \neq \sigma_{ij}$ forces $R(\rho) \neq R(\sigma)$ (claim 4). No single-valued function $\mathcal{R}$ can map equal inputs $\Tr_{\mathrm{env}}(R(\rho)) = \Tr_{\mathrm{env}}(R(\sigma))$ to distinct outputs $R(\rho) \neq R(\sigma)$ (claim 5). Finally, conjugating by $U_{\mathrm{copy}}^*$ cancels $U_{\mathrm{copy}}$ via $U_{\mathrm{copy}}^* U_{\mathrm{copy}} = I$, recovering both $B(\rho)$ and $B(\sigma)$ exactly (claim 6). The full proof is checked by the Lean kernel.
:::

Write out the $4\times 4$ joint matrices of [@thm-reduced-access-defect] explicitly in the ordered two-qubit basis $\{\lvert 00\rangle, \lvert 01\rangle, \lvert 10\rangle, \lvert 11\rangle\}$ for East $\rho = \lvert +\rangle\langle +\rvert$ and West $\sigma = \lvert -\rangle\langle -\rvert$, and the mechanism jumps off the page:

$$
B\Bigl(\lvert \pm\rangle\langle \pm\rvert\Bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 & \pm 1 & 0 \\ 0 & 0 & 0 & 0 \\ \pm 1 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix} \;\xrightarrow{\;U_{\mathrm{copy}}\,\cdot\,U_{\mathrm{copy}}^*\;}\; R\Bigl(\lvert \pm\rangle\langle \pm\rvert\Bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & \pm 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ \pm 1 & 0 & 0 & 1 \end{pmatrix}!
$$

Look at the four corners on the right: the coherence sign $\pm\frac{1}{2}$ was never erased — it simply moved from $(00, 10)$ out to the extreme corners $(00, 11)$ and $(11, 00)$! Yet taking the partial trace $\Tr_{\mathrm{env}}$ replaces each $2\times 2$ environment block by the sum of its *own* two diagonal entries: in the upper-right $2\times 2$ block, the block-diagonal positions $(00, 10)$ and $(01, 11)$ are both $0$, while the corner $(00, 11)$ holding $\pm\frac{1}{2}$ sits off the environment diagonal and is skipped! Thus both states reduce locally to the identical matrix $\frac{1}{2}\bigl(\begin{smallmatrix} 1+0 & 0+0 \\ 0+0 & 0+1 \end{smallmatrix}\bigr) = \frac{1}{2}I$.

::: {.figure src="ch04-copy-matrix"}
**The coherence has not vanished; it has moved to a corner the partial trace cannot reach.** Both $4\times 4$ grids are ordered $00, 01, 10, 11$, thin frames mark the four $2\times 2$ blocks, and the partial trace reads only the two diagonal cells of each block (cyan edges). On the left, $B(\lvert\pm\rangle\langle\pm\rvert)$ before the controlled copy: the magenta $\pm\frac{1}{2}$ sits at $(00, 10)$ and $(10, 00)$, inside cyan cells, where the partial trace reads it. On the right, $R(\lvert\pm\rangle\langle\pm\rvert)$ after the copy: the $\pm\frac{1}{2}$ has moved to $(00, 11)$ and $(11, 00)$, on no block's diagonal, so the partial trace returns $\frac{1}{2}I$ for both signs, while running $U_{\mathrm{copy}}^*$ backwards restores it (items 2, 3, 4 and 6 of [@thm-reduced-access-defect]; the matrix entries are the text's hand computation).
:::

> Spilled milk looks irreversible only when you stare solely at the cup; in the ledger of the whole room, every phase is still accounted for.

## 4.2 Understanding Quantum Noise Geometrically Without Memorizing Kraus Operators {#sec-ch04-2}

Once we see how the partial trace shortens the local Bloch vector in this example, the operator-sum formulas of standard textbook noise models turn completely transparent. Without memorizing a single abstract matrix, each of the benchmark single-qubit noise models analyzed below (pinching, phase damping, amplitude damping, and depolarizing noise) acts geometrically by **compressing or shifting the Bloch ball**!

Start with complete transverse dephasing — **standard-basis pinching** $\mathcal{P}(\rho)$ ([`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching) in Lean, preserving diagonal entries $\rho_{00}, \rho_{11}$ and zeroing off-diagonal entries $\rho_{01}, \rho_{10}$). Under the Hilbert–Schmidt inner product ([`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner) $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$), pinching is an exact orthogonal projection flattening the Bloch sphere onto its vertical diameter $[-\vv{e}_3, +\vv{e}_3]$, and the discarded equatorial mass equals the sum of squared moduli of the two off-diagonal entries!

::: {.viz src="bloch-noise" preset="pinch" height="500"}
**Squashed onto the axis.** One step of complete dephasing: the cyan ball is squashed into a vertical line, and the violet dashes mark the whole axis as fixed. $\rho$ and $\sigma$ have the same height and differ only sideways, so they land on the same point of the axis and the white line shrinks to nothing; the two magenta segments are the sideways parts of the two starting points that are squashed away, and they carry the coherence mass, which the top left reads off for $\rho$ as it drops from $0.375$ to $0$ ([@thm-pinching-pythagorean]).
:::

::: {.theorem #thm-pinching-pythagorean title="Hilbert–Schmidt Pythagorean Split and Discarded Coherence Mass of Qubit Pinching" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass"}
For every qubit matrix $\rho \in M_2(\mathbb{C})$, writing $\mathcal{P}(\rho)_{ij} = \delta_{ij}\rho_{ij}$ for standard-basis pinching and $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$ for the Hilbert–Schmidt inner product:

1. **Orthogonal Pythagorean decomposition**:

   $$
   \langle \rho, \rho\rangle_{\mathrm{HS}} = \langle \mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}} + \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}};
   $$

2. **Explicit discarded coherence mass**:

   $$
   \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = |\rho_{01}|^2 + |\rho_{10}|^2.
   $$

:::

::: proof
Split $\rho = \mathcal{P}(\rho) + D$ with purely off-diagonal residual $D = \rho - \mathcal{P}(\rho)$. Because $\mathcal{P}$ is Hilbert–Schmidt self-adjoint ($\langle \mathcal{P}(A), B\rangle_{\mathrm{HS}} = \langle A, \mathcal{P}(B)\rangle_{\mathrm{HS}}$) and $\mathcal{P}(D) = 0$, both cross-terms $\langle \mathcal{P}(\rho), D\rangle_{\mathrm{HS}} = \langle \rho, \mathcal{P}(D)\rangle_{\mathrm{HS}} = 0$ and $\langle D, \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$ vanish, yielding the Pythagorean identity upon expanding $\langle \mathcal{P}(\rho) + D,\, \mathcal{P}(\rho) + D\rangle_{\mathrm{HS}}$ (claim 1). Substituting $D = \bigl(\begin{smallmatrix} 0 & \rho_{01} \\ \rho_{10} & 0 \end{smallmatrix}\bigr)$ into $\Tr(D^* D)$ sums its two diagonal entries $|\rho_{10}|^2$ and $|\rho_{01}|^2$ to $|\rho_{01}|^2 + |\rho_{10}|^2$ (claim 2). The full proof is checked by the Lean kernel.
:::

In continuous laboratory time, nature rarely crushes the sphere flat in a single blow; instead, repeated weak collisions in the strictly noisy regime multiply the equatorial waist by a retention factor $c \in [0, 1)$ at each step (with $c = 1$ being the noiseless identity endpoint). That is **phase damping** ($T_2$ transverse relaxation): whenever $c \in [0, 1)$, every vertical height $r_z$ stays frozen while the equatorial radius $(r_x, r_y)$ contracts strictly as $c^N$, squeezing the sphere into a prolate cigar that converges onto the north–south axis as $N \to \infty$!

::: {.viz src="bloch-noise" preset="dephase" height="500"}
**The waist goes, the height stays.** Each step multiplies the sideways part by $c = 0.7$ and keeps the height: the cyan ball pinches into an upright cigar and thins towards the violet axis, while $\rho$ and $\sigma$ move horizontally towards it. The rail below counts the steps $N$ ([@prop-phase-damping-decay]).
:::

::: {.proposition #prop-phase-damping-decay title="Iterated Phase-Damping Entries and Exponential Decay of Equatorial Coherence" lean="D5/S3/Quantum/QubitWitnesses.phaseDampingIterate_apply D5/S3/Quantum/Decoherence/CoherenceDecay.equal_superposition_coherence_tendsto_zero"}
Let $c \in [0, 1]$ be a real coherence-retention coefficient, and let $\mathcal{D}_c^{(N)}$ denote the $N$-fold iterate ($N \in \mathbb{N}$) of the single-step phase-damping map that preserves diagonal entries and scales off-diagonal entries by $c$. Then:

1. For every qubit matrix $\rho \in M_2(\mathbb{C})$ and indices $i, j \in \{0, 1\}$,

   $$
   \bigl(\mathcal{D}_c^{(N)}(\rho)\bigr)_{i, j} = \begin{cases} \rho_{i, j}, & i = j, \\ c^N \rho_{i, j}, & i \neq j; \end{cases}
   $$

2. Whenever $c < 1$, for the equal-superposition density matrix $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$, the off-diagonal coherence converges to zero as $N \to \infty$:

   $$
   \lim_{N \to \infty} \bigl(\mathcal{D}_c^{(N)}(\rho_+)\bigr)_{0, 1} = 0.
   $$

:::

::: proof
Claim 1 follows by induction on $N$: $N = 0$ is the identity ($c^0 = 1$), and step $N \to N + 1$ leaves diagonal entries $i = j$ untouched while multiplying off-diagonal entries $i \neq j$ by one more factor of $c$ to give $c^{N+1}\rho_{ij}$. For claim 2, evaluating claim 1 on $\rho_+$ at $(0, 1)$ gives $\frac{1}{2}c^N$; since $0 \le c < 1$, $|c| < 1$ implies $c^N \to 0$ as $N \to \infty$, and scaling by $\frac{1}{2}$ preserves convergence to $0$. The full proof is checked by the Lean kernel.
:::

The qubit formula above compresses the environment's action into one real number $c$. What if the system has many branches and complex phases enter the overlaps? Attach a unit environment vector $E_i$ to each system address $i$. After the controlled recording map $V\lvert i\rangle=\lvert i\rangle\otimes\lvert E_i\rangle$, tracing out the environment multiplies entry $(i,j)$ by $G_{ij}=\sum_a E_i(a)\overline{E_j(a)}$, the entry formula of [`environment_marginal_channel`](lean:D5/S3/Quantum/Decoherence/EnvironmentMarginalChannel.environment_marginal_channel). Exact orthogonality can therefore be relaxed to a sufficient condition with a quantitative error bound.

::: {.theorem #thm-repeated-record-decay title="Exponential Error Bound for Repeated Finite Records and Record-Class Pinching" lean="D5/S3/Quantum/Decoherence/RepeatedRecordExponentialDecay.repeated_record_exponential_decay"}
Let $d,e\in\mathbb{N}$ and $E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$, with $\sum_a |E_i(a)|^2=1$ for every system address $i$. Define

$$
G_{ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}.
$$

Given $q\in[0,1)$, assume that $|G_{ij}|\le q$ whenever $E_i\ne E_j$. For each $v\in\operatorname{range} E$, define the diagonal projector

$$
\begin{aligned}
(P_v)_{ij}&=\begin{cases}1,&i=j\text{ and }E_i=v,\\0,&\text{otherwise},\end{cases}\\
\Pi_E(\rho)&=\sum_{v\in\operatorname{range}E}P_v\rho P_v.
\end{aligned}
$$

Then for every $N\in\mathbb{N}$, $\rho\in M_d(\mathbb{C})$ and $i,j\in\mathrm{Fin}\,d$, all three statements hold:

$$
\begin{aligned}
\bigl(\Phi_E^N(\rho)\bigr)_{ij}&=G_{ij}^N\rho_{ij},\\
\Pi_E(\rho)_{ij}&=\begin{cases}\rho_{ij},&E_i=E_j,\\0,&E_i\ne E_j,\end{cases}\\
\|\Phi_E^N(\rho)-\Pi_E(\rho)\|_{\mathrm F}
&\le q^N\|\rho-\Pi_E(\rho)\|_{\mathrm F},
\end{aligned}
$$

Here $\|A\|_{\mathrm F}=(\sum_{i,j}|A_{ij}|^2)^{1/2}$ is the Frobenius, or Hilbert–Schmidt, norm, and $\Phi_E^0$ is the identity map.
:::

::: proof
Each application multiplies entry $(i,j)$ by $G_{ij}$ again, so induction gives the first identity. Multiplication on both sides by the diagonal projector $P_v$ retains precisely rows and columns carrying record $v$; summing gives the second identity. Equal normalized records have $G_{ij}=1$, so their error vanishes. Across different classes, the error is $G_{ij}^N\rho_{ij}$, whose magnitude is at most $q^N|\rho_{ij}|$. Square these bounds, sum over entries and take the square root to obtain the third statement. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-nonorthogonal-record-decay title="A Little Separation Each Time: How Much Error Remains after Ten Steps?"}
Take the nonorthogonal unit records $E_0=(1,0)$ and $E_1=(1/2,\sqrt{3}/2)$. Then $G_{01}=G_{10}=1/2$, so $q=1/2$ is admissible. The records are distinct, their classes are singletons, and $\Pi_E$ is computational-basis pinching. Substituting the equatorial state $\rho_+=\frac12\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$ gives

$$
\Phi_E^N(\rho_+)=\frac12\begin{pmatrix}1&2^{-N}\\2^{-N}&1\end{pmatrix},\qquad
\|\Phi_E^N(\rho_+)-\Pi_E(\rho_+)\|_{\mathrm F}=\frac{2^{-N}}{\sqrt2}.
$$

After ten steps the error relative to the initial off-diagonal residual is $1/1024$. No finite step has been called exact erasure: this is the coherence residual of the specified model.
:::

Classes here mean **identical record vectors**. Coherence within a class survives; the limit is complete dephasing of individual basis addresses only when all classes are singletons. If $E_1=-E_0$, the vectors are distinct but $|G_{01}|=1$, violating the strict overlap bound: the channel changes phase without reducing this coherence's magnitude. Distinct vectors alone do not establish distinguishable environment records.

::: {.remark #rem-ray-record-orbit title="Ray-Representative Reduction and Rotating Coherent Blocks (Application Derivation)"}
Grouping instead by the **unit rays of the environment records** folds the global-phase redundancy above directly into an application derivation from [@thm-repeated-record-decay], while keeping the original channel $\Phi_E$ rather than replacing $E_i$ by vectorized density matrices $\lvert E_i\rangle\langle E_i\rvert$ (which would replace the Gram entries $G_{ij}$ by $|G_{ij}|^2$ and alter the channel).

Let $d,e\in\mathbb{N}$ be arbitrary natural numbers, and let $E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$ satisfy $\sum_a |E_i(a)|^2=1$ for each system address $i$, with

$$
G_{E,ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{E,ij}\rho_{ij}.
$$

Define ray equivalence $i\sim j$ if and only if there exists a unit-modulus complex scalar $u\in\mathbb{C}$ ($|u|=1$) carrying $E_j$ to $E_i$ ($E_i=uE_j$), and let the ray-pinching map $P_{\mathrm{ray}}$ retain and only retain same-ray matrix entries:

$$
P_{\mathrm{ray}}(\rho)_{ij}=\begin{cases}\rho_{ij},&i\sim j,\\0,&i\not\sim j.\end{cases}
$$

Choose a unit representative $R_c$ for each ray $c$, and set $R_i=R_{c(i)}$ for each system address $i\in\mathrm{Fin}\,d$ (representative records remain indexed by system addresses, and every entry in row $i$ uses the same representative), so that $E_i=u_i R_{c(i)}$ with $|u_i|=1$. In a finite-dimensional complex inner-product space, the equality criterion of the Cauchy–Schwarz inequality $|G_{R,ij}|\le\|R_i\|_2\|R_j\|_2=1$ shows that two unit vectors attain the upper bound on inner-product modulus if and only if they lie on the same ray ($i\sim j$); hence representatives of distinct rays ($i\not\sim j$, equivalently $R_i\ne R_j$) have overlap modulus $|G_{E,ij}|=|G_{R,ij}|<1$. Because there are only finitely many cross-ray index pairs $(i,j)$, their overlap moduli admit a uniform bound $q\in[0,1)$ (with $q=0$ when no cross-ray pairs exist). This $q$ is determined by the record family $E$ and holds uniformly across all $i,j$, all step counts $N\in\mathbb{N}$, and all system matrices $\rho$; no uniform positive gap across all record families is claimed.

Expanding the inner product gives $G_{E,ij}=u_i\overline{u_j}G_{R,ij}$. Setting $U=\operatorname{diag}(u_i)$, the $N$-fold iterate of the original channel is related to the representative channel for all $N\in\mathbb{N}$ and every complex system matrix $\rho\in M_d(\mathbb{C})$ by

$$
\Phi_E^N(\rho)=U^N\Phi_R^N(\rho)(U^N)^*.
$$

The vector-equality classes $R_i=R_j$ of the representative records $R$ are precisely the ray classes $i\sim j$, so $\Pi_R$ coincides with $P_{\mathrm{ray}}$ and $|G_{R,ij}|\le q<1$ whenever $R_i\ne R_j$. Applying [@thm-repeated-record-decay] to $R$ and using the Frobenius-norm invariance of unitary diagonal conjugation yields, for every natural number $N\in\mathbb{N}$ and every complex system matrix $\rho\in M_d(\mathbb{C})$ (with no extra density-matrix, positivity, unit-trace, or nonemptiness hypotheses):

$$
\bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
\le q^N\bigl\|\rho-P_{\mathrm{ray}}(\rho)\bigr\|_{\mathrm F}.
$$

The asymptotic comparison object under ray grouping is therefore the **rotating coherent-block orbit** $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$, not static full diagonalization. On the same ray ($i\sim j$), $G_{E,ij}=u_i\overline{u_j}$, so after $N$ steps the coherence magnitude $|\rho_{ij}|$ is preserved while the conditional phase continues to rotate. These conditional phases are fixed by the actual controlled coupling or phase calibration; knowing only the density matrices $\lvert E_i\rangle\langle E_i\rvert$ of the individual environment records cannot determine them. The persistence of rotating components in quantum-channel asymptotics is not a new physical finding (literature result, not formalized in this book: see Victor V. Albert, *Asymptotics of quantum channels: conserved quantities, an adiabatic limit, and matrix product states*, Quantum **3**, 151 (2019), DOI [10.22331/q-2019-06-06-151](https://doi.org/10.22331/q-2019-06-06-151), Section 2 on rotating points and asymptotic projections; that paper provides general channel background, whereas the finite-record norm bound above is derived directly from [@thm-repeated-record-decay] via the representative construction).
:::

::: {.example #ex-ray-record-rotation title="Three-Record Hand Calculation: Simultaneous Phase Rotation and Cross-Ray Contraction"}
Take $d=3,e=2$ and three unit environment records

$$
E_0=(1,0),\qquad
E_1=(i,0),\qquad
E_2=\left(\frac{3}{5},\frac{4}{5}\right).
$$

Here $E_0$ and $E_1$ differ only by a unit phase, partitioning the addresses into ray classes $\{0,1\}$ and $\{2\}$. Choosing ray representatives $R_0=R_1=(1,0)$ and $R_2=(3/5,4/5)$ gives phases $u=(1,i,1)$ and cross-ray overlap moduli $|G_{02}|=|G_{12}|=3/5$, so we may take $q=3/5$.

Let $\rho\in M_3(\mathbb{C})$ have all $3\times 3$ entries equal to $1/3$; it is the density matrix of the normalized equal-superposition pure state. After $N$ steps:

1. **Unattenuated phase rotation within the shared ray**: Indices $(0,1)$ lie on the same ray with $G_{01}=1\cdot\overline{i}=-i$, so

   $$
   \bigl(\Phi_E^N(\rho)\bigr)_{01}=\frac{(-i)^N}{3},\qquad
   \bigl|\bigl(\Phi_E^N(\rho)\bigr)_{01}\bigr|=\frac{1}{3},
   $$

   while the conjugate entry $(1,0)$ is $i^N/3$, keeping modulus $1/3$ for all $N$.
2. **Contraction as $(3/5)^N$ across distinct rays**: Each of the four cross-ray entries $(0,2),(2,0),(1,2),(2,1)$ has modulus $\frac{1}{3}(3/5)^N$, so the Frobenius error to the rotating coherent block $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$ is

   $$
   \begin{aligned}
   \bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
   &=\sqrt{4\cdot\frac{1}{9}\left(\frac{3}{5}\right)^{2N}} \\
   &=\frac{2}{3}\left(\frac{3}{5}\right)^N.
   \end{aligned}
   $$

   The error is $2/3$ at $N=0$, $2/5$ at $N=1$, and $\frac{2}{3}(3/5)^{10}=0.0040310784$ at $N=10$.
:::

Interpreting $\Phi_E^N$ as successive collisions also requires each step to implement the same reduced channel. One realization uses a fresh, initially uncorrelated environment register and the same recording interaction at every step. Reusing an environment or introducing correlations does not justify $G_{ij}^N$ from a one-step overlap alone. Together these results control the error after relaxing ideal orthogonality: the original vector-grouping theorem [@thm-repeated-record-decay] still assumes the strict overlap bound as a hypothesis, whereas the ray-grouping application in [@rem-ray-record-orbit] derives that bound from finitely many unit records; in both formulations, record normalization, the specified controlled coupling, and the physical applicability of a repeated reduced channel remain model premises requiring independent physical evidence, and the Frobenius norm must be distinguished from trace distance or an experimental discrimination error rate.

::: {.remark #rem-retained-environment-defect title="Retained Environments and the Accumulated Defect Bound (Application Derivation)"}
When the environment is retained rather than discarded and replaced, the actual reduced trajectory can be compared with the reset model without defining the true marginal trajectory as powers of a single channel. Let $\tau_k$ be actual joint density states evolved by a fixed joint unitary $U$ ($\tau_{k+1}=U\tau_k U^*$), $\rho_k=\Tr_{\mathrm{E}}(\tau_k)$ their system marginals, $\eta$ a fixed reference environment density state, and $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$ the single-step reset channel. Write $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ for half the trace norm of a state difference (the trace distance of [@def-trace-distance] below), and set $\delta_k=D(\tau_k,\,\rho_k\otimes\eta)$ for the step-$k$ joint factorization defect. The channel-contraction clause of [@prop-trace-distance-metric-contraction] below is stated for channels with identical input and output index types (such as the joint unitary conjugation $X\mapsto UXU^*$ and the same-index system reset channel $R$); for the rectangular partial trace $\Tr_{\mathrm{E}}$ from the joint space to the system, contractivity follows directly as an application derivation outside that frozen box: writing an Hermitian difference in Jordan form $A=P-Q$ with $P,Q$ positive semidefinite and $\operatorname{traceNorm}(A)=\Tr(P)+\Tr(Q)$, positivity and trace preservation of $\Tr_{\mathrm{E}}$ together with the trace-norm triangle inequality and $\operatorname{traceNorm}(B)=\Tr(B)$ for positive $B$ give $\operatorname{traceNorm}(\Tr_{\mathrm{E}}A)\le\operatorname{traceNorm}(\Tr_{\mathrm{E}}P)+\operatorname{traceNorm}(\Tr_{\mathrm{E}}Q)=\Tr(P)+\Tr(Q)=\operatorname{traceNorm}(A)$. Combining invariance of $D$ under tensoring with the fixed density state $\eta$ ($D(\rho\otimes\eta,\sigma\otimes\eta)=D(\rho,\sigma)$), the partial-trace and same-index reset-channel contractions above, and the triangle inequality over $0\le k<N$ gives

$$
\begin{aligned}
D\bigl(\rho_{k+1},\,R(\rho_k)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}(U\tau_k U^*),\,\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr)\Bigr)\le D(\tau_k,\,\rho_k\otimes\eta)=\delta_k,\\
D\bigl(R(\rho_k),\,R^{k+1}(\rho_0)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr),\,\Tr_{\mathrm{E}}\bigl(U(R^k(\rho_0)\otimes\eta)U^*\bigr)\Bigr)\le D\bigl(\rho_k,\,R^k(\rho_0)\bigr),\\
D\bigl(\rho_N,\,R^N(\rho_0)\bigr)&\le\sum_{k=0}^{N-1}\delta_k.
\end{aligned}
$$

Here the reference state $\eta$ may be mixed; this estimate neither defines the true marginal trajectory $\rho_k$ as the reset powers $R^k(\rho_0)$ nor assumes or proves that the defects $\delta_k$ are small.

For a pure reference basis state $\eta=\lvert a\rangle\langle a\rvert$ ($a\in\mathrm{Fin}\,e$), the controlled-record action can be specified by the actual columns $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ on the reference environment input $a$. If $J$ embeds a system vector at environment coordinate $a$ ($J_{(i,b),\,j}=[j=i][b=a]$) and $W$ is the controlled-record matrix $W_{(i,b),\,j}=[j=i]\,E_i(b)$, these columns give $UJ=W$ and $\rho\otimes\lvert a\rangle\langle a\rvert=J\rho J^*$, so the partial-trace identity `environment_marginal_channel` derives $R(\rho)=\Tr_{\mathrm{E}}(W\rho W^*)=\Phi_E(\rho)$ (namely $\operatorname{recordChannel}(E)$) from the coupling. Furthermore, the $((j,a),(j,a))$ diagonal entry of $U^* U=I$ gives

$$
1=(U^* U)_{(j,a),\,(j,a)}=\sum_{i\in\mathrm{Fin}\,d}\,\sum_{b\in\mathrm{Fin}\,e}\bigl|U_{(i,b),\,(j,a)}\bigr|^2=\sum_{b\in\mathrm{Fin}\,e}|E_j(b)|^2,
$$

so record normalization $\sum_b |E_j(b)|^2=1$ follows from unitarity of these columns rather than entering as an independent hypothesis. Unitarity of $U$ alone, however, does not imply this controlled-record column form: the specified controlled coupling, the pure reference state $\lvert a\rangle\langle a\rvert$, and control of the joint defects $\delta_k$ remain physical model hypotheses. For literal vector-equality classes $E_i=E_j$, [@thm-repeated-record-decay] retains the strict cross-class overlap premise ($|G_{ij}|\le q<1$ whenever $E_i\ne E_j$); if the ray formulation of [@rem-ray-record-orbit] is used instead, the comparison target rotates as $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$ (with diagonal address-phase matrix $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$) and its finite unit-record separation bound $q<1$ applies across distinct rays ($i\not\sim j$).

Under the remaining strict cross-class overlap premise, apply [@thm-repeated-record-decay] to $R^N(\rho_0)=\Phi_E^N(\rho_0)$. Since the Frobenius norm is bounded above by the trace norm ($\|M\|_{\mathrm F}\le\|M\|_1$) and $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ uses the half-trace-norm convention, converting $D(\rho_N,R^N(\rho_0))$ to Frobenius norm introduces a factor of $2$, so the actual system marginal's Frobenius error relative to record-class pinching $\Pi_E(\rho_0)$ satisfies

$$
\begin{aligned}
\bigl\|\rho_N-R^N(\rho_0)\bigr\|_{\mathrm F}&\le\bigl\|\rho_N-R^N(\rho_0)\bigr\|_1=2\,D\bigl(\rho_N,\,R^N(\rho_0)\bigr)\le 2\sum_{k=0}^{N-1}\delta_k,\\
\bigl\|\rho_N-\Pi_E(\rho_0)\bigr\|_{\mathrm F}&\le 2\sum_{k=0}^{N-1}\delta_k+q^N\bigl\|\rho_0-\Pi_E(\rho_0)\bigr\|_{\mathrm F}.
\end{aligned}
$$

(In the ray formulation of [@rem-ray-record-orbit], replacing $\Pi_E(\rho_0)$ on the left by the rotating target $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$ and on the right by $P_{\mathrm{ray}}(\rho_0)$ yields the corresponding rotating-block bound with $q<1$ across distinct rays.) This combined inequality is application reasoning outside the displayed frozen declaration [@thm-repeated-record-decay], not an additional clause or new result of the cited GID.
:::

::: {.example #ex-retained-environment-cnot title="Two-Qubit Controlled Flip: Stationary Environment and Reset Deviation"}
Stationarity of an environment marginal is not by itself a bound on the accumulated joint-state defects $\sum_{k<N}\delta_k$. For system-controlled $X$ on two qubits, $U=\lvert 0\rangle\langle 0\rvert\otimes I+\lvert 1\rangle\langle 1\rvert\otimes X$, start the system in the equatorial plus state $\rho_0=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$, take the reference environment state $\eta_r=\frac{1}{2}(I+rX)=\frac{1}{2}\bigl(\begin{smallmatrix}1&r\\r&1\end{smallmatrix}\bigr)$ with $0\le r\le 1$, and evolve from the product initial state $\tau_0=\rho_0\otimes\eta_r$ via $\tau_{k+1}=U\tau_k U^*$:

1. **Period-two actual evolution versus multiplication by $r$ under reset**: Because $X\eta_r X=\eta_r$, the actual environment marginal remains stationary at every step, $\Tr_{\mathrm{S}}(\tau_k)=\eta_r$. Meanwhile, the joint unitary $U$ has period $2$ ($U^2=I$), whereas the single-step reset channel $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta_r)U^*\bigr)$ multiplies the system's transverse off-diagonal entries by $\Tr(\eta_r X)=r$. At even step $N=2m$, the actual system marginal and the reset iterate are therefore

   $$
   \rho_{2m}=\rho_0=\frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
   R^{2m}(\rho_0)=\frac{1}{2}\begin{pmatrix}1&r^{2m}\\r^{2m}&1\end{pmatrix}.
   $$

2. **Even-step trace distance and numerical comparison for a near-pure environment**: Direct evaluation of $\rho_{2m}-R^{2m}(\rho_0)=\frac{1-r^{2m}}{2}X$ and $\eta_1-\eta_r=\frac{1-r}{2}X$ gives both the trace distance between the actual system state and the reset iterate at even step $N=2m$ and the trace distance from $\eta_r$ to the pure plus state $\lvert +\rangle\langle +\rvert$:

   $$
   D\bigl(\rho_{2m},\,R^{2m}(\rho_0)\bigr)=\frac{1-r^{2m}}{2},\qquad
   D\bigl(\eta_r,\,\lvert +\rangle\langle +\rvert\bigr)=\frac{1-r}{2}.
   $$

   For instance, at $r=0.99$ and $N=100$ ($m=50$), the environment's trace-distance impurity from $\lvert +\rangle\langle +\rvert$ is only $\frac{1-0.99}{2}=0.005$, yet the step-$100$ trace-distance discrepancy between the actual system marginal and the reset iterate reaches

   $$
   D\bigl(\rho_{100},\,R^{100}(\rho_0)\bigr)=\frac{1-0.99^{100}}{2}\approx 0.3169838293633854.
   $$

3. **Exact purity endpoint versus fixed-$N$ and time-uniform bounds**: At $r=1$, $\eta_1=\lvert +\rangle\langle +\rvert$ and the discrepancy vanishes identically ($0$ for all $N$), so this example does not refute an exactly pure, unchanged environment premise. Instead, it separates two distinct obligations: for any **fixed** step count $N=2m$, the discrepancy $\frac{1-r^{2m}}{2}\to 0$ as $r\to 1$; yet for any fixed $r\in[0,1)$, the even-time supremum is $\sup_{m\ge 1}\frac{1-r^{2m}}{2}=\frac{1}{2}$, so a stationary near-pure environment marginal does not by itself yield a reset approximation uniform in time. This elementary two-qubit calculation illustrates that mathematical distinction and does not claim a physical experiment, a novel result, or a universal explanation of open-system dynamics; controlling the joint correlations, identifying the physical coupling, and experimental support remain outside these mathematical applications.
:::

::: {.remark #rem-pure-environment-marginal-defect title="Exact-Purity Marginal Factorization and the Near-Pure Single-Step Defect Bound (Application Derivation)"}
In contrast to the stationary mixed environment marginal of [@ex-retained-environment-cnot], **exact purity of the actual environment marginal** has a stronger algebraic consequence, while **near purity** relative to a specified pure state directly bounds the single-step factorization defect (all statements below are application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems):

1. **Tensor factorization from an exactly pure actual environment marginal**: Let $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$ be a finite-dimensional positive semidefinite joint matrix of trace $1$, writing $\Tr_{\mathrm{S}}(X)$ for the partial trace over the system (with entry $(b,b')$ equal to $\sum_i X_{(i,b),\,(i,b')}$) and $\Tr_{\mathrm{E}}(X)$ for the partial trace over the environment (with entry $(i,j)$ equal to $\sum_b X_{(i,b),\,(j,b)}$). Fix an environment basis index $a\in\mathrm{Fin}\,e$ and its pure basis projector $p=\lvert a\rangle\langle a\rvert$ ($p_{b,b'}=\delta_{b,a}\delta_{b',a}$). If the actual environment marginal satisfies $\Tr_{\mathrm{S}}(X)=p=\lvert a\rangle\langle a\rvert$, then for every $b\ne a$ the environment diagonal entry vanishes:

   $$
   0=p_{b,b}=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}X_{(i,b),\,(i,b)}.
   $$

   Because $X$ is positive semidefinite, every joint diagonal entry satisfies $X_{(i,b),\,(i,b)}\ge 0$; a sum of nonnegative real numbers vanishes if and only if each summand vanishes, so $X_{(i,b),\,(i,b)}=0$ for all $i$ and all $b\ne a$. By the positive semidefinite entry bound $|X_{\alpha,\beta}|^2\le X_{\alpha,\alpha}X_{\beta,\beta}$ (from Cauchy–Schwarz on the columns of $\sqrt{X}$), every joint entry with $b\ne a$ or $b'\ne a$ satisfies $X_{(i,b),\,(j,b')}=0$; thus all joint rows and columns outside $a$ vanish identically. The remaining $(a,a)$ environment block is precisely the actual system marginal $\bigl(\Tr_{\mathrm{E}}(X)\bigr)_{i,j}=\sum_b X_{(i,b),\,(j,b)}=X_{(i,a),\,(j,a)}$, giving

   $$
   X=\bigl(\Tr_{\mathrm{E}}(X)\bigr)\otimes p.
   $$

   Neither a global pure-state assumption on $X$ nor a separately assumed product condition is needed; however, this factorization is an algebraic consequence of $\Tr_{\mathrm{S}}(X)=p$ and does not prove that the actual environment marginal of a physical system remains pure.

2. **Reset powers from an exact pure marginal at every input step of a finite horizon**: Fix a finite horizon $N\in\mathbb{N}$ and a joint unitary $U$, evolve the actual joint states by $\tau_{k+1}=U\tau_k U^*$ with system marginals $\rho_k=\Tr_{\mathrm{E}}(\tau_k)$, and define explicitly the pure-reference single-step reset map

   $$
   R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr).
   $$

   If at every input step $0\le k<N$, $\tau_k$ is positive semidefinite (and trace-one) and its actual environment marginal is the exact same pure projector $\Tr_{\mathrm{S}}(\tau_k)=p$, then item 1 gives $\tau_k=\rho_k\otimes p$ at each input $0\le k<N$, so $\rho_{k+1}=\Tr_{\mathrm{E}}(U\tau_k U^*)=\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes p)U^*\bigr)=R_p(\rho_k)$. Induction on $k$ yields

   $$
   \rho_N=R_p^N(\rho_0),
   $$

   including $N=0$ ($R_p^0(\rho_0)=\rho_0$). Exact purity at the required inputs $k<N$ therefore removes the independent product-state assumption, but $\Tr_{\mathrm{S}}(\tau_k)=p$ at each input $k<N$ remains an explicit physical premise at every such step: it is not proved by unitarity of $U$, must not be overgeneralized to all physical systems, and is distinct from stationarity of a mixed marginal alone, from approximate purity, and from merely choosing a pure state $p$ as a comparison reference.

3. **Dimension-independent single-step defect bound for a near-pure actual marginal**: For any finite-dimensional positive semidefinite joint matrix $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$ with $\Tr(X)=1$, fix an environment basis point $a\in\mathrm{Fin}\,e$ and pure projector $p=\lvert a\rangle\langle a\rvert$, set $\sigma=\Tr_{\mathrm{E}}(X)$ for the actual system marginal, and define the leakage outside $a$ by

   $$
   \varepsilon=1-\operatorname{Re}\Bigl(\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}\Bigr)\in[0,1].
   $$

   With the half-trace-norm convention $D(A,B)=\frac{1}{2}\operatorname{traceNorm}(A-B)=\frac{1}{2}\|A-B\|_1$ and with no product assumption on $X$, the single-step defect to $\sigma\otimes p$ satisfies the dimension-independent bound

   $$
   D(X,\,\sigma\otimes p)\le\sqrt{\varepsilon}+\frac{\varepsilon}{2}.
   $$

   The self-contained proof combines two estimates. First, set the joint orthogonal projector $P=I\otimes p$ ($P^*=P=P^2$), take the positive semidefinite square root $S=\sqrt{X}$ ($S^*=S$, $S^2=X$), and put $C=PS$. Using $\Tr(PX)=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}=1-\varepsilon$ and $(I-P)^2=I-P$, the Frobenius norms satisfy $\|S\|_{\mathrm F}^2=\Tr(X)=1$, $\|C\|_{\mathrm F}^2=\Tr(S^* P^2 S)=\Tr(PX)=1-\varepsilon\le 1$, and $\|S-C\|_{\mathrm F}^2=\Tr\bigl(S^*(I-P)^2 S\bigr)=\Tr\bigl((I-P)X\bigr)=\varepsilon$, so $\|S\|_{\mathrm F}=1$, $\|C\|_{\mathrm F}\le 1$, and $\|S-C\|_{\mathrm F}=\|S^*-C^*\|_{\mathrm F}=\sqrt{\varepsilon}$. Expanding $X-PXP=SS^*-CC^*$ as $(S-C)S^*+C(S^*-C^*)$ and applying the trace-norm triangle inequality together with the Cauchy–Schwarz product bound $\operatorname{traceNorm}(AB)\le\|A\|_{\mathrm F}\|B\|_{\mathrm F}$ gives

   $$
   \begin{aligned}
   \operatorname{traceNorm}(X-PXP)&\le\operatorname{traceNorm}\bigl((S-C)S^*\bigr)+\operatorname{traceNorm}\bigl(C(S^*-C^*)\bigr) \\
   &\le\|S-C\|_{\mathrm F}\|S^*\|_{\mathrm F}+\|C\|_{\mathrm F}\|S^*-C^*\|_{\mathrm F}\le 2\sqrt{\varepsilon}.
   \end{aligned}
   $$

   Second, write $(A_b)_{i,j}=X_{(i,b),\,(j,b)}$ for the $(b,b)$ diagonal environment block of $X$, and abbreviate the $a$-block as $A_0=A_a$. Then $PXP=A_0\otimes p$, while $\sigma-A_0=\sum_{b\ne a}A_b$ is the sum of the discarded positive semidefinite diagonal environment blocks; hence $\sigma-A_0$ and $(\sigma-A_0)\otimes p$ are positive semidefinite, and the trace norm of $(\sigma-A_0)\otimes p$ equals its trace:

   $$
   \begin{aligned}
   \operatorname{traceNorm}\bigl((\sigma-A_0)\otimes p\bigr)&=\Tr\bigl((\sigma-A_0)\otimes p\bigr) \\
   &=\bigl(\Tr(\sigma)-\Tr(A_0)\bigr)\Tr(p)=1-(1-\varepsilon)=\varepsilon.
   \end{aligned}
   $$

   Splitting $X-\sigma\otimes p=(X-PXP)-\bigl((\sigma-A_0)\otimes p\bigr)$, applying the trace-norm triangle inequality, and dividing by $2$ yields $D(X,\sigma\otimes p)\le\frac{1}{2}(2\sqrt{\varepsilon}+\varepsilon)=\sqrt{\varepsilon}+\frac{\varepsilon}{2}$.

4. **Finite-horizon trajectory sum, controlled-record identification, and distinction between $R_p$ and $R_\eta$**: Along an actual trajectory $\tau_{k+1}=U\tau_k U^*$, define the step-$k$ leakage $\varepsilon_k=1-\operatorname{Re}\bigl((\Tr_{\mathrm{S}}\tau_k)_{a,a}\bigr)\in[0,1]$ relative to the same fixed pure basis state $p=\lvert a\rangle\langle a\rvert$, so that $\delta_{k,p}=D(\tau_k,\rho_k\otimes p)\le\sqrt{\varepsilon_k}+\varepsilon_k/2$. Substituting this into the accumulated defect estimate of [@rem-retained-environment-defect] for the pure-reference reset map $R_p$ gives, for every finite horizon $N\in\mathbb{N}$,

   $$
   D\bigl(\rho_N,\,R_p^N(\rho_0)\bigr)\le\sum_{k=0}^{N-1}\left(\sqrt{\varepsilon_k}+\frac{\varepsilon_k}{2}\right).
   $$

   Only when $R_p$ is identified with the controlled-record channel $\Phi_E$ under the actual controlled-column hypothesis $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ already explained in [@rem-retained-environment-defect] (together with the cross-class overlap bound $|G_{ij}|\le q<1$, or the ray-separation bound of [@rem-ray-record-orbit]) can this finite-horizon sum also supply the actual-trajectory Frobenius pinching error budget. Crucially, the comparison targets must be kept distinct: the defect bound above measures deviation $D(\tau_k,\rho_k\otimes p)$ relative to the **pure projector** $p$ and directly controls the pure-reference reset map $R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr)$; it **does not automatically establish** either $R_p=R_\eta$ or an error bound for a mixed-reference reset map $R_\eta(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$ (distinct reference states need not induce distinct reset maps — for example, $U=I$ induces the identity system map for every trace-one environment reference — but unless $R_p=R_\eta$ is independently established, replacing $\eta$ by $p$ requires a separate comparison between $R_p$ and $R_\eta$ and their iterates), so this pure-reference defect bound cannot be applied directly to the mixed-reference CNOT reset channel $R_{\eta_r}$ ($0\le r<1$) of [@ex-retained-environment-cnot]. Finally, this bound is a one-step estimate whose trajectory application sums over the finite horizon $N$; it proves neither physical smallness of $\varepsilon_k$ nor an error bound uniform in time.
:::

::: {.remark #rem-pure-record-support-compatibility title="Population-Support Restriction and Coherence-Magnitude Preservation Under Pure-Environment Retention (Application Derivation)"}
Item 2 of [@rem-pure-environment-marginal-defect] derives the finite-horizon identity $\rho_N=R_p^N(\rho_0)$ from exact environment purity $\Tr_{\mathrm{S}}(\tau_k)=p=\lvert a\rangle\langle a\rvert$ at the **input steps** $0\le k<N$ alone, leaving the final output $\tau_N$ unconstrained: even for $N=1$, an input satisfying $\Tr_{\mathrm{S}}(\tau_0)=p$ gives $\rho_1=R_p(\rho_0)$ while still permitting genuine environment recording and system decoherence at the final output $\tau_1$. Requiring a transition $\tau'=U\tau U^*$ to **preserve** the same specified pure environment marginal $p=\lvert a\rangle\langle a\rvert$ across the step imposes exact purity at both endpoints ($\Tr_{\mathrm{S}}(\tau)=p$ and $\Tr_{\mathrm{S}}(\tau')=p$), which is a strictly stronger condition (all statements below remain finite-dimensional analytic application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems). In the finite-dimensional controlled-record model on $\mathrm{Fin}\,d\times\mathrm{Fin}\,e$ with the controlled columns $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ of [@rem-retained-environment-defect] (so that $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$ and $R_p=\Phi_E$), let $\tau$ be a positive semidefinite, trace-one joint input with system marginal $\rho=\Tr_{\mathrm{E}}(\tau)$ and control-basis **population support** $S=\{i\in\mathrm{Fin}\,d:\rho_{ii}>0\}$. By item 1 of [@rem-pure-environment-marginal-defect], the input marginal condition $\Tr_{\mathrm{S}}(\tau)=p$ already supplies the tensor factorization $\tau=\rho\otimes p$. Under the controlled columns above, the output joint state $\tau'=U(\rho\otimes p)U^*$ has environment marginal diagonal entry $\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2$ at $b\in\mathrm{Fin}\,e$; if the output environment marginal is also $p=\lvert a\rangle\langle a\rvert$, then at every $b\ne a$,

$$
0=p_{b,b}=\Bigl(\Tr_{\mathrm{S}}\bigl(U(\rho\otimes p)U^*\bigr)\Bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2.
$$

Because $\rho$ is positive semidefinite, every summand satisfies $\rho_{ii}|E_i(b)|^2\ge 0$; a sum of nonnegative real numbers vanishes if and only if each summand vanishes, so $E_i(b)=0$ for every occupied address $i\in S$ ($\rho_{ii}>0$) and every $b\ne a$. Record normalization $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$ then forces every occupied record on $S$ to align with $\lvert a\rangle$ up to a unit complex phase:

$$
E_i=u_i\lvert a\rangle,\qquad u_i=E_i(a)\in\mathbb{C},\qquad |u_i|=1\qquad (i\in S).
$$

Consequently, for every pair of occupied addresses $i,j\in S$, the Gram multiplier is $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}=u_i\overline{u_j}$ with unit modulus $|G_{ij}|=1$, and the single-step channel identity $R_p(\rho)_{ij}=\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}$ preserves $|\rho_{ij}|$ on $S\times S$. Outside the occupied support, whenever $i\notin S$ or $j\notin S$, at least one of the nonnegative diagonal populations $\rho_{ii},\rho_{jj}\ge 0$ vanishes; the positive semidefinite entry bound $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}$ then forces the entire row and column of a zero diagonal entry to vanish ($\rho_{ij}=0$, and hence $R_p(\rho)_{ij}=G_{ij}\rho_{ij}=0$). Therefore, **every system entry magnitude** is preserved across the transition, including entries outside $S$:

$$
G_{ij}=u_i\overline{u_j},\quad |G_{ij}|=1\quad (i,j\in S),\qquad \bigl|R_p(\rho)_{ij}\bigr|=|\rho_{ij}|\quad (\forall i,j\in\mathrm{Fin}\,d).
$$

Rotation by the relative phase $u_i\overline{u_j}$ (or a change in a single real quadrature such as $\operatorname{Re}R_p(\rho)_{ij}$) is a phase turn in the complex plane, not a loss of coherence magnitude $|\rho_{ij}|$. This derivation uses only positive semidefiniteness, unit trace, and the endpoint marginals $p$; it assumes neither a pure system state $\rho$, a pure joint state $\tau$, full rank, nor full population support $S=\mathrm{Fin}\,d$ (conversely, a rank-one pure superposition such as the equal superposition over all basis states can have full population support $S=\mathrm{Fin}\,d$).

Because the vanishing sum $\sum_i\rho_{ii}|E_i(b)|^2=0$ constrains only addresses with $\rho_{ii}>0$, the resulting restriction on the global channel $R_p$ is sensitive to the input's population support $S$. When the input has **full population support** $S=\mathrm{Fin}\,d$, the relation $E_i=u_i\lvert a\rangle$ ($|u_i|=1$) holds at every system address, so with $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$ the reset map reduces to unitary diagonal conjugation $R_p(\sigma)=U_{\mathrm{ray}}\sigma U_{\mathrm{ray}}^*$ on **every** complex system matrix $\sigma\in M_d(\mathbb{C})$. When the input has **deficient population support** ($S\subsetneq\mathrm{Fin}\,d$), the record columns $E_i$ at unoccupied addresses $i\notin S$ remain unconstrained by this trajectory and the global reset channel $R_p$ need not be unitary: for example, for $d=3$ and orthogonal environment basis states $\lvert a\rangle\perp\lvert b\rangle$, taking $E_0=E_1=\lvert a\rangle$ and $E_2=\lvert b\rangle$ preserves the output environment marginal $p$ and all entry magnitudes on any coherent input supported on $\{0,1\}$, while still dephasing coherences involving address $2$ ($G_{02}=G_{12}=0$) on other inputs that populate address $2$. Along the actual joint trajectory $\tau_{k+1}=U\tau_k U^*$ generated by the **same fixed** controlled unitary $U$, however, a single transition from $\tau_0$ preserving $p$ on $S=\{i:(\rho_0)_{ii}>0\}$ already fixes $U(\lvert i\rangle\otimes\lvert a\rangle)=u_i(\lvert i\rangle\otimes\lvert a\rangle)$ for all $i\in S$. The joint subspace spanned by $\{\lvert i\rangle\otimes\lvert a\rangle:i\in S\}$ (and joint density matrices supported on $S\times\{a\}$) is therefore invariant under $U$, keeping the populations $(\rho_k)_{ii}=(\rho_0)_{ii}$ and support $S$ fixed so that every subsequent step $k\in\mathbb{N}$ automatically retains $\Tr_{\mathrm{S}}(\tau_k)=p$ and satisfies

$$
(\rho_k)_{ij}=(u_i\overline{u_j})^k(\rho_0)_{ij}\quad (i,j\in S),\qquad \bigl|(\rho_k)_{ij}\bigr|=\bigl|(\rho_0)_{ij}\bigr|\quad (\forall i,j\in\mathrm{Fin}\,d),
$$

with no new endpoint purity assumption needed at later steps $k\ge 1$ for that fixed $U$. Changing couplings $U_k$ instead require the corresponding controlled-column and pure-marginal preservation conditions at each transition, and the conclusion covers neither unobserved intermediate times nor arbitrary unitaries outside the controlled-record column form — for instance, the product unitary $U=H\otimes I$ with a system Hadamard $H$ preserves the environment marginal $p$ while rotating the plus state $\lvert +\rangle\langle +\rvert$ to the basis state $\lvert 0\rangle\langle 0\rvert$, changing computational-basis coherences and populations without controlled-record dephasing.

Combining this occupied-support restriction with the preceding decay hypotheses clarifies how the model premises interact. If the strict literal-vector cross-class overlap bound of [@thm-repeated-record-decay] ($|G_{ij}|\le q<1$ whenever $E_i\ne E_j$) is also imposed, no two occupied addresses $i,j\in S$ can have distinct record vectors $E_i\ne E_j$, since their Gram magnitude $|G_{ij}|=|u_i\overline{u_j}|=1$ cannot satisfy $1\le q<1$; all occupied records on $S$ must then be literally equal ($E_i=u\lvert a\rangle$ with a single common phase $u$), $R_p(\rho)=\rho$ fixes this input, and its record-class pinching error $\|\rho-\Pi_E(\rho)\|_{\mathrm F}$ is zero. In the ray formulation of [@rem-ray-record-orbit], the occupied records $E_i=u_i\lvert a\rangle$ ($i\in S$) share the single ray $\mathbb{C}\lvert a\rangle$, so the ray-pinching error $\|\rho-P_{\mathrm{ray}}(\rho)\|_{\mathrm F}$ vanishes on this input while the coherent phase orbit $(u_i\overline{u_j})^k\rho_{ij}$ remains. Throughout, **exact purity of the actual complete environment marginal** $\Tr_{\mathrm{S}}(\tau)=p$ must be kept distinct from pure conditional record vectors $\lvert E_i\rangle$ (which are unit vectors in every controlled-record model even when the reduced environment marginal $\sum_i\rho_{ii}\lvert E_i\rangle\langle E_i\rvert$ is mixed), from global joint purity of $\tau$, from a pure reference $p$ chosen merely for comparison in $R_p$, from stationarity of a mixed environment marginal ([@ex-retained-environment-cnot]), and from approximate purity ($\varepsilon_k>0$ in [@rem-pure-environment-marginal-defect]): none of those substitutes establishes the stated endpoint premise. These deductions are finite-dimensional analytic applications of the existing matrix, partial-trace, and controlled-record results, and assert neither a converse, an infinite-dimensional theorem, mathematical novelty, nor experimental validation.
:::

::: {.remark #rem-actual-environment-purity-loss title="Controlling Single-Step System Coherence Loss by Actual Output Environment Purity (Application Derivation)"}
Both [@rem-pure-environment-marginal-defect] and [@rem-pure-record-support-compatibility] measure environment purity relative to a fixed pure reference basis state $p=\lvert a\rangle\langle a\rvert$ chosen in advance. Without selecting any comparison ray, one can directly compare the single-step **loss of system purity (and off-diagonal coherence)** against the **purity of the actual output environment marginal** (all statements below remain finite-dimensional analytic application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems). Start with a transparent single-qubit hand calculation ($d=2$): let two normalized environment records $E_0,E_1$ have overlap $G_{01}=\sum_b E_0(b)\overline{E_1(b)}$. If the system starts in the equatorial pure superposition $\rho=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$ (with diagonal populations $p_0=p_1=\frac{1}{2}$ and squared off-diagonal moduli $|\rho_{01}|^2=|\rho_{10}|^2=\frac{1}{4}$), controlled recording multiplies the off-diagonal entries of the reduced output $\rho'$ by $G_{01}$ and $\overline{G_{01}}$, lowering system purity from $F_2(\rho)=\Tr(\rho^2)=1$ to $F_2(\rho')=\Tr(\rho'^2)=\frac{1}{2}+\frac{1}{2}|G_{01}|^2$ with purity loss $L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}$; meanwhile, the actual output environment marginal $\sigma_{\mathrm{E}}=\frac{1}{2}\lvert E_0\rangle\langle E_0\rvert+\frac{1}{2}\lvert E_1\rangle\langle E_1\rvert$ has purity $q=F_2(\sigma_{\mathrm{E}})=\Tr(\sigma_{\mathrm{E}}^2)=\frac{1+|G_{01}|^2}{2}$ and linear entropy $\Delta=1-q=\frac{1-|G_{01}|^2}{2}$, matching $L_2$ identically. Conversely, if the system starts in the maximally mixed center $\rho=\frac{1}{2}I_2$ with orthogonal records ($G_{01}=0$), the system marginal stays unchanged at $\rho'=\rho=\frac{1}{2}I_2$ ($L_2=0$), whereas the actual output environment still branches into an equal mixture of two orthogonal records ($q=\frac{1}{2}$ and $\Delta=1-q=\frac{1}{2}$):

$$
\begin{aligned}
\rho=\lvert +\rangle\langle +\rvert:\quad & L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}=1-q=\Delta,\\
\rho=\frac{1}{2}I_2\;\;(G_{01}=0):\quad & L_2=0<\frac{1}{2}=1-q=\Delta.
\end{aligned}
$$

To generalize this calculation to arbitrary finite system and environment dimensions ($d,e\in\mathbb{N}$), let $\rho\in M_d(\mathbb{C})$ be a positive semidefinite system density matrix of trace $1$, let each environment record $E_i\in\mathbb{C}^e$ ($i\in\mathrm{Fin}\,d$) be normalized ($\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$), and follow the notation of [@thm-repeated-record-decay] in writing $p_i=\rho_{ii}\ge 0$ for the diagonal populations and $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}$ for the Gram overlaps. Set the controlled-record matrix $W_{(i,b),\,j}=[j=i]\,E_i(b)$ (record normalization makes $W^*W=I_d$ an isometry), and define the recorded joint state together with its two actual partial-trace marginals by

$$
\begin{aligned}
X&=W\rho W^*,\qquad \sigma_{\mathrm{E}}=\Tr_{\mathrm{S}}(X),\qquad \rho'=\Tr_{\mathrm{E}}(X),\\
F_2(A)&=\|A\|_{\mathrm F}^2=\sum_{i,j}|A_{ij}|^2,\qquad C_2(A)=\|A-\operatorname{diag}(A)\|_{\mathrm F}^2=\sum_{i\ne j}|A_{ij}|^2.
\end{aligned}
$$

Here $\sigma_{\mathrm{E}}$ and $\rho'$ are both actual marginals of the same recorded joint state $X$, and the subscript $2$ in $F_2(A)$ and $C_2(A)$ explicitly denotes that these quantities are already **squared** sums defined consistently with this chapter's Frobenius norm $\|A\|_{\mathrm F}=\bigl(\sum_{i,j}|A_{ij}|^2\bigr)^{1/2}$ (namely the sum of squared moduli of all entries or of all off-diagonal entries, not a norm whose square is taken a second time). Identifying $X=W\rho W^*$ with the actual single-step output $U(\rho\otimes\lvert a\rangle\langle a\rvert)U^*$ of a joint unitary $U$ requires the product input $\rho\otimes\lvert a\rangle\langle a\rvert$ with a pure initial environment $\lvert a\rangle\langle a\rvert$ ($a\in\mathrm{Fin}\,e$) and the specified controlled columns $UJ=W$ ($U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$) of [@rem-retained-environment-defect]; the coefficient-$1$ bound below holds within this pure-initial-environment and normalized-finite-record scope and is not asserted for a mixed initial environment.

Evaluating the partial trace over the system gives $(\sigma_{\mathrm{E}})_{b,c}=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)}$, so summing $|(\sigma_{\mathrm{E}})_{b,c}|^2$ over $b,c\in\mathrm{Fin}\,e$ yields the actual output environment purity $q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2$ (equivalently, arranging the record vectors $E_i$ as columns of the $e\times d$ matrix $B$ gives $\sigma_{\mathrm{E}}=B\operatorname{diag}(p)B^*$ and $(B^*B)_{ij}=\overline{G_{ij}}$, so cyclicity of the trace likewise yields $\Tr(\sigma_{\mathrm{E}}^2)=\sum_{i,j}p_i p_j|G_{ij}|^2$). Meanwhile, the partial-trace identity `environment_marginal_channel` used in [@thm-repeated-record-decay] supplies $\rho'_{ij}=G_{ij}\rho_{ij}$. Because the input $\rho$ and both marginals $\rho',\sigma_{\mathrm{E}}$ are Hermitian density matrices, $F_2(A)=\Tr(A^2)$ for each of them. Writing $L_2=F_2(\rho)-F_2(\rho')$ for the system purity loss and $\Delta=1-q=1-F_2(\sigma_{\mathrm{E}})$ for the output environment's linear entropy, and combining $\sum_{i,j}p_i p_j=\bigl(\sum_i p_i\bigr)^2=1$, the normalization consequences $G_{ii}=1$ and $|G_{ij}|\le 1$, and the positive semidefinite entry bound $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}=p_i p_j$ from [@rem-pure-environment-marginal-defect], termwise comparison across the nonnegative factors $1-|G_{ij}|^2\ge 0$ gives

$$
\begin{aligned}
(\sigma_{\mathrm{E}})_{b,c}&=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)},\qquad q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2,\\
L_2&=F_2(\rho)-F_2(\rho')=C_2(\rho)-C_2(\rho')=\sum_{i,j\in\mathrm{Fin}\,d}|\rho_{ij}|^2\bigl(1-|G_{ij}|^2\bigr),\\
\Delta&=1-q=1-F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j\bigl(1-|G_{ij}|^2\bigr),\qquad 0\le L_2\le 1-q=\Delta.
\end{aligned}
$$

Record normalization and the positive semidefinite entry bound are the entire proof mechanism: no comparison ray, no positive lower bound on the populations $p_i$, and no full-rank premise on $\rho$ is needed (zero populations $p_i=0$ force $\rho_{ij}=0$ via $|\rho_{ij}|^2\le p_i p_j$ and cause no exception). Since the diagonal entries are unchanged ($\rho'_{ii}=G_{ii}\rho_{ii}=\rho_{ii}$), the purity loss $L_2$ equals the loss of squared off-diagonal Frobenius coherence $C_2(\rho)-C_2(\rho')$; crucially, this is the decrease in squared off-diagonal norm, **not** the squared Frobenius distance $F_2(\rho-\rho')=\|\rho-\rho'\|_{\mathrm F}^2$ between $\rho$ and $\rho'$. For a pure system input $\rho$, $|\rho_{ij}|^2=p_i p_j$ holds for all $i,j$, giving equality $L_2=1-q=\Delta$; for mixed system inputs only the inequality $L_2\le 1-q$ holds in general, as illustrated above by $\rho=\frac{1}{2}I_2$ with orthogonal records ($L_2=0<\frac{1}{2}=1-q$).

In particular, if the actual output environment marginal has unit purity $q=F_2(\sigma_{\mathrm{E}})=1$ (so $\Delta=1-q=0$), the vanishing nonnegative sum $\sum_{i,j}p_i p_j(1-|G_{ij}|^2)=0$ forces $|G_{ij}|=1$ for every occupied pair $i,j\in S=\{i\in\mathrm{Fin}\,d:p_i>0\}$. By the equality criterion of the Cauchy–Schwarz inequality on unit vectors, all occupied records share a single unit output ray: there exist a unit environment vector $v\in\mathbb{C}^e$ ($\sum_{b\in\mathrm{Fin}\,e}|v(b)|^2=1$) and unit phases $u_i\in\mathbb{C}$ ($|u_i|=1$ for $i\in S$) such that $E_i=u_i v$ on $S$. On this input $\rho$, the system undergoes only the corresponding diagonal phase action $\rho'_{ij}=u_i\overline{u_j}\rho_{ij}$ on $S\times S$ (with entries outside $S\times S$ still vanishing), preserving every entry magnitude ($L_2=0$). Because no reference ray was fixed in advance, however, the shared output ray $v$ **need not equal** the initial environment reference $\lvert a\rangle$, and $\rho'$ **need not equal** $\rho$. In particular, for the qubit plus input $\rho=\lvert +\rangle\langle +\rvert$, the antiparallel records $E_0=v$ and $E_1=-v$ give a pure output environment $\sigma_{\mathrm{E}}=\lvert v\rangle\langle v\rvert$ ($L_2=\Delta=0$) while flipping the system to the orthogonal minus state $\rho'=\lvert -\rangle\langle -\rvert$, whose half-trace-norm distance under [@def-trace-distance] is $D(\rho,\rho')=\frac{1}{2}\|\rho-\rho'\|_1=1$:

$$
\begin{aligned}
q=1\;\;(\Delta=0)\quad&\Longrightarrow\quad E_i=u_i v,\quad |u_i|=1\quad (i\in S),\qquad \rho'_{ij}=u_i\overline{u_j}\rho_{ij}\quad (i,j\in S),\\
E_0=v,\;E_1=-v,\;\rho=\lvert +\rangle\langle +\rvert\quad&\Longrightarrow\quad \rho'=\lvert -\rangle\langle -\rvert,\quad L_2=\Delta=0,\quad D(\rho,\rho')=1.
\end{aligned}
$$

Furthermore, in sharp contrast to the two-endpoint application of [@rem-pure-record-support-compatibility] — where preserving the **same** reference state $p=\lvert a\rangle\langle a\rvert$ across the step yields an invariant occupied subspace and guarantees pure environment marginals and preserved coherence magnitudes at all later steps of a fixed $U$ — a pure output environment at a **different** ray $\lvert v\rangle\ne\lvert a\rangle$ gives **no future purity or coherence-retention guarantee** under repeated application of the same fixed unitary $U$. Concretely, on a three-level environment basis $\{\lvert 0\rangle,\lvert 1\rangle,\lvert 2\rangle\}$ ($e=3$) controlled by a qubit ($d=2$), let $U=\lvert 0\rangle\langle 0\rvert\otimes V_0+\lvert 1\rangle\langle 1\rvert\otimes V_1$, where $V_0$ swaps $\lvert 0\rangle\leftrightarrow\lvert 1\rangle$ and fixes $\lvert 2\rangle$, while $V_1$ cycles $\lvert 0\rangle\mapsto\lvert 1\rangle\mapsto\lvert 2\rangle\mapsto\lvert 0\rangle$. Starting from initial environment $\lvert 0\rangle$ and system plus state $\rho_0=\lvert +\rangle\langle +\rvert$, the first contact produces identical records $V_0\lvert 0\rangle=V_1\lvert 0\rangle=\lvert 1\rangle$, so the joint state is $\tau_1=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert$ with pure output environment ($q_1=1$) and preserved system coherence $\rho_1=\lvert +\rangle\langle +\rvert$; on the second contact with the same retained environment and fixed $U$, however, $\lvert 1\rangle$ maps to the orthogonal records $V_0\lvert 1\rangle=\lvert 0\rangle$ and $V_1\lvert 1\rangle=\lvert 2\rangle$, completely removing the system's off-diagonal coherence in $\rho_2=\frac{1}{2}I_2$:

$$
\begin{aligned}
V_0\lvert 0\rangle&=\lvert 1\rangle,\quad V_0\lvert 1\rangle=\lvert 0\rangle,\quad V_0\lvert 2\rangle=\lvert 2\rangle,\qquad
V_1\lvert 0\rangle=\lvert 1\rangle,\quad V_1\lvert 1\rangle=\lvert 2\rangle,\quad V_1\lvert 2\rangle=\lvert 0\rangle,\\
\tau_1&=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert\quad (q_1=1,\;\rho_1=\lvert +\rangle\langle +\rvert),\qquad
\rho_2=\frac{1}{2}I_2,\quad \sigma_{\mathrm{E},2}=\frac{1}{2}\bigl(\lvert 0\rangle\langle 0\rvert+\lvert 2\rangle\langle 2\rvert\bigr)\quad (q_2=\frac{1}{2}).
\end{aligned}
$$

Small output linear entropy $\Delta=1-q$ therefore controls the **input-weighted loss of squared coherence magnitude** $L_2$; because $\Delta=\sum_{i,j}p_i p_j(1-|G_{ij}|^2)$ weights each pair by $p_i p_j$, a small $\Delta$ does not uniformly bound every relative pair loss $1-|G_{ij}|^2$ when populations can be arbitrarily small, nor does it bound the state trace distance $D(\rho,\rho')$. Likewise, this single-step application supplies no multi-step reset identification, monotonic retained-environment trajectory, uniform-in-time estimate, or exponential decay law, and makes no claim of mathematical novelty or empirical validation.
:::

**Decay to zero: is it still reversible?** In [@prop-phase-damping-decay] the coherence is multiplied by $c$ at each step, leaving $c^N\rho_{01}$ after $N$ steps and finally zero. Section 4.1 showed that one step of decoherence can be seen as a reversible coupling followed by discarding the environment ([@thm-stinespring-dilation], [@thm-reduced-access-defect]). But "each step can be seen this way" and "all the steps together are still the shadow of one reversible evolution" are different claims: the first allows a different dilation at every step, the second asks one unitary $U$ to account for all the powers $T^n$ at once. The next theorem says that the second holds for every contraction.

::: {.theorem #thm-unitary-power-dilation title="Sz.-Nagy Unitary Power Dilation: Every Power of a Contraction Is a Shadow of the Same Unitary" lean="D5/S3/HilbertOperators/UnitaryPowerDilation.exists_unitary_power_dilation"}
Let $E$ be a complex Hilbert space (a complete complex inner product space), and let $T : E \to E$ be a bounded linear operator with $\lVert T\rVert \le 1$. Then there are a complex Hilbert space $H$, a bounded linear operator $V : E \to H$ and a unitary operator $U$ on $H$ such that:

1. $V$ preserves inner products: $\langle Vx, Vy\rangle = \langle x, y\rangle$ for all $x, y \in E$;
2. $V^{\dagger}\,U^n\,V x = T^n x$ for all $n \in \mathbb{N}$ and $x \in E$.
:::

::: proof
The Lean proof has two steps, and the second is exactly a "collision model".

(1) One step: the Halmos dilation. On $E \oplus E$ take the self-adjoint block operator $a = \begin{pmatrix} 0 & T \\ T^{\dagger} & 0 \end{pmatrix}$, whose norm is at most $\lVert T\rVert \le 1$; with the continuous functional calculus, build $\sqrt{I - a^2}$, so that $a + i\sqrt{I - a^2}$ is unitary, and multiply by the permutation that swaps the two components to get a unitary $J$. Since $a^2$ is block diagonal, so is $\sqrt{I - a^2}$, and therefore the first component of $J$ applied to $(x, 0)$ is exactly $Tx$.

(2) All steps: the collision model. Take $H = \ell^2(\mathbb{Z};\, E \oplus E)$, with one copy of the system and one of the environment at every integer site. $U$ first applies $J$ at every site at once and then moves every environment component one site to the right; a product of two unitaries, it is unitary. $V$ puts $x$ into the system component of site 0, and $V^{\dagger}$ reads back the system component of site 0. Induction on $n$ shows that after $n$ steps the system component of site 0 is $T^n x$, its environment component is zero, and all sites with negative index are zero. The reason is that at every step the system at site 0 meets a blank environment arriving from the left, while the used environment leaves to the right and never comes back. The full proof is checked by the Lean kernel.
:::

**Why the total dilation space $H$ must be infinite-dimensional.** When a decaying vector exists, building an infinite-dimensional total dilation space $H$ in the proof is not laziness (this is manual application reasoning, not formalized in this book; the frozen existence theorem [@thm-unitary-power-dilation] does not itself assert this corollary): fix complete complex Hilbert spaces $E$ and $H$, bounded linear operators $T : E \to E$ and $V : E \to H$, and a fixed unitary operator $U$ on $H$, and suppose that for some nonzero vector $x \in E$ ($x \neq 0$) with $\lVert T^n x\rVert \to 0$, the same pair $(U, V)$ satisfies the exact all-power compression $V^{\dagger} U^n V x = T^n x$ for every $n \in \mathbb{N}$ (note that the $n = 0$ case already gives $V^{\dagger} V x = T^0 x = x$, so a separate global isometry or contraction assumption is not even needed for this contradiction). If the **total dilation space $H$ is finite-dimensional**, the bounded-operator space on $H$ is finite-dimensional and its unitary group is closed and bounded, hence compact. By compact-group recurrence of powers (or elementary extraction of a convergent subsequence $U^{n_k} \to W$ with strictly increasing gaps $m_k = n_{k+1} - n_k \to \infty$, so that $U^{m_k} = U^{n_{k+1}}(U^{n_k})^{-1} \to W W^{-1} = I$), there exists a strictly increasing sequence of arbitrarily late powers $m_k \to \infty$ with $U^{m_k} \to I$. Continuity of the compressed observable $W \mapsto \lVert V^{\dagger} W V x\rVert$ then yields, along this subsequence,

$$
\lVert T^{m_k} x\rVert = \lVert V^{\dagger} U^{m_k} V x\rVert \;\longrightarrow\; \lVert V^{\dagger} I V x\rVert = \lVert x\rVert > 0,
$$

contradicting $\lVert T^n x\rVert \to 0$! Whenever $T$ has a nonzero decaying vector $\lVert T^n x\rVert \to 0$, any exact common compression of all natural powers therefore requires the **total dilation space $H$ to be infinite-dimensional**. Crucially, the premise used by compactness is finite dimensionality of the **entire dilation space $H$**, not of the environment alone: when the system space $E$ can be infinite-dimensional, a finite-dimensional environment does not make the total space $H$ finite-dimensional, so this argument yields no obstruction from environment dimension alone; only when $E$ itself is finite-dimensional (such as $E = \mathbb{C}$ in the next example) does infinite total dimension of $H$ force an infinite-dimensional auxiliary environment. Moreover, this compact-group return argument provides no quantitative return-time bound, claims no general exact periodicity, and excludes neither finite-horizon dilations ($n \le N$) nor finite-horizon approximations.

::: {.example #ex-halmos-one-step-recurrence title="A One-Step Dilation Only Covers One Step: at c = 0.8 the Leaked Amplitude Comes Back"}
Take the simplest contraction, $E = \mathbb{C}$ and $T = c = 0.8$: the factor by which the coherence of [@prop-phase-damping-decay] is multiplied at each step. With $s = \sqrt{1 - c^2} = 0.6$, the Halmos construction of step (1) of the proof gives

$$
J = \begin{pmatrix} c & i s \\ i s & c \end{pmatrix} = \begin{pmatrix} 0.8 & 0.6\,i \\ 0.6\,i & 0.8 \end{pmatrix}.
$$

At the first step it indeed sends the amplitude $1$ to $0.8$, and $0.6\,i$ leaks into the environment. If the same $J$ is used again with the same environment, then $J = \cos\varphi\, I + i\sin\varphi\,\sigma_x$ (with $\varphi = \arccos 0.8 = 36.87^\circ$) is just a rotation about the $x$ axis, and $(J^n)_{00} = \cos n\varphi$. The fourth column of the table is a numerical simulation of the collision model (site 0 meets a fresh environment at every step); values are rounded to the digits shown.

| $n$ | $c^n$ (wanted) | $(J^n)_{00}$ (one environment reused) | collision model, site 0 | leaked probability $1 - c^{2n}$ |
| ---: | ---: | ---: | ---: | ---: |
| $1$ | $0.8000$ | $0.8000$ | $0.8000$ | $0.3600$ |
| $2$ | $0.6400$ | $0.2800$ | $0.6400$ | $0.5904$ |
| $3$ | $0.5120$ | $-0.3520$ | $0.5120$ | $0.7379$ |
| $4$ | $0.4096$ | $-0.8432$ | $0.4096$ | $0.8322$ |
| $5$ | $0.3277$ | $-0.9971$ | $0.3277$ | $0.8926$ |
| $6$ | $0.2621$ | $-0.7522$ | $0.2621$ | $0.9313$ |

From the second step on, a single environment sends the leaked amplitude back; at $n = 39$, $(J^{39})_{00} = 0.99934$, an almost complete recovery, while $c^{39} = 0.00017$. Site 0 of the collision model gives exactly $c^n$ in every row, in agreement with the induction in the proof. The leaked probability $1 - c^{2n}$ has not vanished: it is spread over sites $1, 2, \dots, n$, and the total norm stays $1$.
:::

::: {.figure src="ch04-fresh-environment"}
**The same environment sends the amplitude back; only a fresh one lets it go for good.** The cyan points are $c^n$ ($c = 0.8$) at cell $0$ of the collision model, which meets a fresh environment at every step and decays to zero ([@thm-unitary-power-dilation]); the grey points are $(J^n)_{00} = \cos n\varphi$ for the same environment used again and again, swinging between $-1$ and $1$ and back at $0.999$ at $n = 39$ (the circled point). Both columns of numbers are the hand computation of [@ex-halmos-one-step-recurrence]; that a finite-dimensional total dilation space must send the amplitude back is the text's manual application argument, not formalized in this book.
:::

> Leaked amplitude does not come back, not because it has vanished, but because the environment that meets the system is always a fresh one.

Alongside energy-conserving $T_2$ dephasing stands energy-relaxing **amplitude damping** ($T_1$ spontaneous emission): an excited state at the south pole ($-1$) emits a quantum of energy into a cold bath and relaxes toward the ground state at the north pole ($+1$). Geometrically, the Bloch ball does not merely shrink around the origin — its center **drifts upward** along the vertical axis via the affine map [`dampedAxis`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.dampedAxis) $u \mapsto u' = (1 - \gamma)u + \gamma$ ($0 \le \gamma < 1$).

::: {.viz src="bloch-noise" preset="amp" height="500"}
**Shrink and drift north.** Amplitude damping with $\gamma = 0.3$ per step: the cyan ball shrinks while it drifts towards the north pole, more slowly across than up; the violet north pole $\lvert 0\rangle$ stays put, and the amber $\rho$ climbs all the way from the south pole towards it.
:::

When we measure transverse coherence contraction under this axial drift using monotone Riemannian metrics of quantum information geometry — comparing the symmetric logarithmic derivative profile $\varphi_{\mathrm{SLD}}(u) = 1$ against the right logarithmic derivative profile $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$ via [`coherenceRatio`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.coherenceRatio) $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\frac{\varphi(u')}{\varphi(u)}$ — their behavior at the pure ground-state boundary $u \to 1^-$ contrasts sharply!

::: {.proposition #prop-amplitude-damping-contraction title="SLD and RLD Coherence-Contraction Endpoints Under Amplitude Damping" lean="D5/S3/QuantumChannels/AmplitudeDampingContraction.amplitude_damping_sld_rld_endpoints"}
Let $0 \le \gamma < 1$, write $u'(\gamma, u) = (1 - \gamma)u + \gamma$ for the damped axial coordinate, and for a radial profile $\varphi : \mathbb{R} \to \mathbb{R}$ define the coherence contraction ratio $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\varphi(u'(\gamma, u)) / \varphi(u)$. With $\varphi_{\mathrm{SLD}}(u) = 1$ and $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$, both properties hold:

1. **Constant SLD contraction**: for all $u \in \mathbb{R}$, $\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$;
2. **RLD interior bound and pure-boundary limit**: $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ for every interior coordinate $u \in (-1, 1)$, and as $u$ approaches the pure boundary $1$ from below,

   $$
   \lim_{u \to 1^-} \mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = 1.
   $$

:::

::: proof
Claim 1 simplifies immediately since $\varphi_{\mathrm{SLD}}(u) = 1$. For claim 2 — packaged in Lean via the predicate [`HasPureBoundaryEndpoint`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.HasPureBoundaryEndpoint), conjunction of the interior upper bound $\le 1$ on $u \in (-1, 1)$ and the left-neighborhood filter limit as $u \to 1^-$ — when $u \in (-1, 1)$ and $0 \le \gamma < 1$, note that $1 - u' = 1 - ((1 - \gamma)u + \gamma) = (1 - \gamma)(1 - u)$. Substituting $\varphi_{\mathrm{RLD}}(v) = \frac{1}{(1 - v)(1 + v)}$ cancels $(1 - \gamma)(1 - u)$ cleanly between numerator and denominator:

$$
\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = (1 - \gamma)\cdot\frac{1 - u^2}{1 - u'^2} = (1 - \gamma)\cdot\frac{(1 - u)(1 + u)}{(1 - \gamma)(1 - u)(1 + u')} = \frac{1 + u}{1 + (1 - \gamma)u + \gamma}.
$$

Because $u < 1$ and $\gamma \ge 0$, subtracting numerator from denominator gives $\gamma(1 - u) \ge 0$ with positive denominator, proving $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ on $(-1, 1)$; letting $u \to 1^-$ sends both numerator and denominator continuously to $2$, yielding limit $\frac{2}{2} = 1$. The full proof is checked by the Lean kernel.
:::

We can now summarize the four workhorse single-qubit noise channels as simple three-dimensional deformations of the Bloch ball — no Kraus tables required:

| Noise Channel (Strictly Contracting Domain) | Affine Bloch Map $\vv{r} = (r_x, r_y, r_z) \mapsto \vv{r}'$ | Geometric Deformation of the Sphere | Fixed-Point Locus on Strictly Contracting Domain |
| :--- | :---: | :--- | :--- |
| **Phase Damping** ($0 \le c < 1$) | $(c\,r_x,\; c\,r_y,\; r_z)$ | Horizontal waist squeeze into a vertical cigar around $Z$ | $Z$-axis segment $(0, 0, r_z)$ |
| **Bit-Flip Channel** ($0 < p < 1$) | $\bigl(r_x,\; (1-2p)r_y,\; (1-2p)r_z\bigr)$ | Radial cylindrical squeeze toward the $X$ axis (with transverse sign flip for $p > \frac{1}{2}$) | $X$-axis segment $(r_x, 0, 0)$ |
| **Depolarizing Channel** ($0 < \lambda \le 1$) | $\bigl((1-\lambda)r_x,\; (1-\lambda)r_y,\; (1-\lambda)r_z\bigr)$ | Uniform isotropic contraction toward the origin | Bloch center $\vv{r} = \vv{0}$ only |
| **Amplitude Damping** ($0 < \gamma < 1$) | $\bigl(\sqrt{1-\gamma}\,r_x,\; \sqrt{1-\gamma}\,r_y,\; (1-\gamma)r_z + \gamma\bigr)$ | Ellipsoidal contraction + upward drift toward North $+\vv{e}_3$ | North pole $+\vv{e}_3 = (0, 0, 1)$ only |

(Note: At the **zero-noise identity endpoints** $c = 1$, $p = 0$, $\lambda = 0$, or $\gamma = 0$, each channel reduces to the identity map $\vv{r}' = \vv{r}$ and fixes the **entire Bloch ball**. At $p = 1$, the bit-flip map is the unitary $\pi$-rotation $\rho \mapsto X\rho X$, $\vv{r}' = (r_x, -r_y, -r_z)$ about the $X$ axis and preserves the distance between states; at $\gamma = 1$, amplitude damping resets the entire Bloch ball in one step to the pure north pole $+\vv{e}_3 = (0, 0, 1)$, so the output distance between any two states is zero.)

::: {.figure src="ch04-noise-gallery"}
**Four kinds of noise, four deformations.** Each panel is a vertical cross-section of the Bloch ball at half strength ($c = \frac{1}{2}$, $p = \frac{1}{4}$, $\lambda = \frac{1}{2}$, $\gamma = \frac{1}{2}$), drawn from the affine formulas of the table: the thin line is the original shell, cyan its image after one application, violet what stays fixed. Phase damping gives a tall narrow ellipse and fixes the vertical axis; bit flip a flat wide ellipse and fixes the $x$ axis; depolarizing a concentric circle of half the radius and fixes only the centre; amplitude damping shrinks the ball and lifts it until its top touches the north pole, which alone stays fixed. The affine forms in the table are literature results, not formalized in this book.
:::

The last row raises a geometric question: once the axial drift toward the ground-state north pole is fixed, **how much transverse length can remain before the ellipsoid pierces the sphere?** Let $\lambda$ now denote the common real retention factor of the two transverse coordinates, and consider

$$
F_{a,\lambda}(x,y,z) = (\lambda x,\,\lambda y,\,az+1-a), \qquad 0 \le a \le 1.
$$

The north pole $(0,0,1)$ stays fixed. The correspondence with the preceding notation is $a=1-\gamma$: expanding the existing axial coordinate gives exactly $\operatorname{dampedAxis}(1-a,z)=az+1-a$. Its relaxation interpretation is restricted here to **zero-temperature affine drift toward a fixed north pole with an isotropic transverse factor**.

::: {.theorem #thm-north-pole-ball-criterion title="Exact Criterion for a North-Pole Affine Map to Preserve the Whole Closed Unit Ball" lean="D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff"}
Let $a,\lambda \in \mathbb{R}$ with $0 \le a \le 1$, allowing either sign of $\lambda$. The following are equivalent:

1. For every real $x,y,z$ satisfying $x^2+y^2+z^2 \le 1$,

   $$
   (\lambda x)^2+(\lambda y)^2+(az+1-a)^2 \le 1.
   $$

2. $\lambda^2 \le a$.
:::

::: proof
For sufficiency, bound the squared transverse radius using $\lambda^2 \le a$ and the input ball condition:

$$
\begin{aligned}
&\lambda^2(x^2+y^2)+(az+1-a)^2 \\
&\quad\le a(1-z^2)+(az+1-a)^2 \\
&\quad=1-a(1-a)(1-z)^2 \le 1.
\end{aligned}
$$

For necessity, construct a specific escaping point. If $\lambda^2>a$, set

$$
\begin{gathered}
\delta=\frac{\lambda^2-a}{\lambda^2+1}, \\
(x,y,z)=\bigl(\sqrt{\delta(2-\delta)},\,0,\,1-\delta\bigr).
\end{gathered}
$$

Since $0\le a$, we have $0<\delta\le1$, so the point is real and $x^2+y^2+z^2=1$. Using $\delta(\lambda^2+1)=\lambda^2-a$ and $\delta(\lambda^2-a^2)\le\delta(\lambda^2+1)$, its image exceeds the sphere's squared radius by

$$
\begin{aligned}
&\norm{F_{a,\lambda}(x,0,z)}^2-1 \\
&\quad=\delta\bigl[2(\lambda^2-a)-\delta(\lambda^2-a^2)\bigr] \\
&\quad\ge\delta(\lambda^2-a)>0.
\end{aligned}
$$

Thus the north-pole cap intuition has an exact criterion on the whole closed ball, including the endpoints $a=0$ and $a=1$. The full proof is checked by the Lean kernel.
:::

[@thm-north-pole-ball-criterion] gives the transverse bound $|\lambda|\le\sqrt a$. Pure amplitude damping in the table takes $\lambda=\sqrt a$, so $\lambda^2=a$ saturates this bound; additional transverse decay can make the inequality strict. In particular, $a=0$ forces $\lambda=0$, while $a=1$ permits exactly $|\lambda|\le1$. This criterion concerns ball preservation; complete positivity also imposes conditions on extended systems and cannot be inferred from this real-coordinate criterion alone.

::: {.figure src="ch04-ball-criterion"}
**How much transverse length may survive is set by the axial factor.** The green region is the criterion $\lambda^2 \le a$ of [@thm-north-pole-ball-criterion], bounded by the two branches $\lambda = \pm\sqrt{a}$; its upper edge is pure amplitude damping, $\lambda = \sqrt{a}$. It closes to a point at $a = 0$ and opens to $|\lambda| \le 1$ at $a = 1$. The magenta point $(a, \lambda) = (0.15, 0.75)$ outside it is a map that pushes part of the ball through the shell.
:::

Now assign exponential envelopes to the factors of **the same map**. For any positive real $T_1,T_2,t$, set

$$
a=e^{-t/T_1}, \qquad \lambda=e^{-t/T_2}.
$$

Then $0<a<1$. By the theorem, $F_{a,\lambda}$ maps the entire closed unit ball into itself if and only if

$$
\begin{aligned}
&e^{-2t/T_2}\le e^{-t/T_1} \\
&\quad\Longleftrightarrow -\frac{2t}{T_2}\le-\frac{t}{T_1} \\
&\quad\Longleftrightarrow T_2\le2T_1.
\end{aligned}
$$

The first step uses strict monotonicity of the real exponential; the second cancels positive time and multiplies by positive time constants. This explains a direct specialization of the theorem under the stated exponential envelopes. At $t=0$, both factors equal $1$ for every positive pair $T_1,T_2$, giving the identity map; zero time alone constrains no rate.

::: {.viz src="bloch-noise" preset="wide" height="500"}
**Keep too much sideways and the skin is pierced.** Take $T_2 = 6T_1$, that is $\lambda = a^{1/6} > \sqrt{a}$: near the north pole the cyan image bulges out through the unit ball drawn as a glass shell, the magenta part is no longer inside, and the magenta dot marks the image point farthest from the centre. Set $T_2 \le 2T_1$ again and the magenta disappears ([@thm-north-pole-ball-criterion]).
:::

::: {.remark #rem-relaxation-envelope-literature title="Physical Conditions for Exponential Envelopes and Rate Addition (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Krantz et al., *A quantum engineer's guide to superconducting qubits* ([arXiv:1904.06560v3](https://arxiv.org/abs/1904.06560v3), equations 40–43), introduce longitudinal and transverse relaxation rates in the Bloch–Redfield description. The text adjacent to equation 41 explicitly notes that expressing the transverse rate as a sum presumes exponential individual decay functions. This supplies physical context for the relaxation model used here.

If, in addition to pure amplitude damping, we **assume a product of envelopes** and supply a nonnegative pure-dephasing rate $k\ge0$, namely

$$
e^{-t/T_2}=e^{-t/(2T_1)}e^{-kt},
$$

then for $T_1,T_2,t>0$, taking logarithms and canceling $t$ gives

$$
\frac{1}{T_2}=\frac{1}{2T_1}+k\ge\frac{1}{2T_1}.
$$

For $k>0$, one may write $k=1/T_\varphi$; $k=0$ gives saturation under pure amplitude damping. The product law is an additional physical assumption, not a consequence of geometric preservation. Here $T_2\le2T_1$ applies within the stated scope of a fixed north pole, zero-temperature affine drift, isotropic transverse contraction, and exponential envelopes; it is not extended to arbitrary environments or arbitrary nonexponential decay.
:::

The three kinds of noise deform the ball in different ways, yet they share one feature: none of them pulls two points of the ball farther apart. This sentence has a precise form. The **trace distance** between two states is $T(\rho, \sigma) = \frac{1}{2}\lVert\rho - \sigma\rVert_1$; for a qubit, the two eigenvalues of $\rho - \sigma = \frac{1}{2}(\vv{r} - \vv{s})\cdot\vv{\sigma}$ are $\pm\frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$, so

$$
T(\rho, \sigma) \;=\; \frac{1}{2}\,\lVert\vv{r} - \vv{s}\rVert ,
$$

half the Euclidean distance between the two Bloch vectors (this step is a manual computation).

::: {.definition #def-trace-distance title="The Trace Distance between Finite-Dimensional Density States" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance"}
Let $\iota$ be a finite type (`[Fintype ι]`, `[DecidableEq ι]`). For two density states $\rho, \sigma$ (`DensityState ι`: positive semidefinite complex $\iota \times \iota$ matrices of trace $1$), define

$$
\operatorname{traceDistance}(\rho, \sigma) \;=\; \frac{1}{2}\,\operatorname{traceNorm}(\rho - \sigma),
$$

where `traceNorm` $M$ is the real part of the trace of $\sqrt{M^{\dagger}M}$.
:::

::: {.proposition #prop-trace-distance-metric-contraction title="Trace-Distance Bounds and Contraction under Quantum Channels on a Fixed Finite Index Type" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_nonneg D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_symm D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_triangle D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_le_one D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract"}
Let $\iota$ be a finite type and $\rho, \sigma, \tau$ density states on $\iota$; use the notation of [@def-trace-distance] and abbreviate $T = \operatorname{traceDistance}$. Then:

1. **Nonnegativity**: $0 \le T(\rho, \sigma)$;
2. **Symmetry**: $T(\rho, \sigma) = T(\sigma, \rho)$;
3. **Triangle inequality**: $T(\rho, \tau) \le T(\rho, \sigma) + T(\sigma, \tau)$;
4. **Boundedness**: $T(\rho, \sigma) \le 1$;
5. **Contraction under channels**: for every quantum channel $\Phi$ whose input and output are both indexed by $\iota$ (`QuantumChannel ι ι`, a trace-preserving completely positive map),

   $$
   T\bigl(\Phi(\rho),\ \Phi(\sigma)\bigr) \;\le\; T(\rho, \sigma).
   $$
:::

::: proof
The first four claims come from the nonnegativity of the trace norm, the identity $\operatorname{traceNorm}(-M) = \operatorname{traceNorm}(M)$, the triangle inequality for the trace norm (`traceNorm_add_le`), and the fact that the trace norm of a positive semidefinite matrix equals its trace. Claim 5: take the Jordan decomposition $\rho - \sigma = P - M$ of the Hermitian matrix $\rho - \sigma$ into its positive and negative parts, both positive semidefinite, whose trace norm equals $\operatorname{Tr} P + \operatorname{Tr} M$ (`trace_norm_jordan_mass`). A channel maps positive semidefinite matrices to positive semidefinite matrices and preserves the trace, so $\operatorname{traceNorm}\bigl(\Phi(P) - \Phi(M)\bigr) \le \operatorname{Tr}\Phi(P) + \operatorname{Tr}\Phi(M) = \operatorname{Tr} P + \operatorname{Tr} M$. Dividing by $2$ gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bloch-distance-contraction title="Distance Contraction under Three Kinds of Qubit Noise: A Numerical Check (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The standard Bloch-ball affine maps for general single-qubit dephasing, amplitude-damping, and depolarizing channels and the Euclidean Bloch formula $T(\rho, \sigma) = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert_2$ below come from the standard quantum-information literature and numerically illustrate the general kernel-verified trace-distance contraction theorem [@prop-trace-distance-metric-contraction] above.

Take the Bloch forms of three channels, each with parameter $\frac{1}{2}$: dephasing $(x, y, z) \mapsto \bigl(\frac{x}{2}, \frac{y}{2}, z\bigr)$; amplitude damping $(x, y, z) \mapsto \bigl(\frac{x}{\sqrt{2}}, \frac{y}{\sqrt{2}}, \frac{1 + z}{2}\bigr)$; depolarizing $\vv{r} \mapsto \frac{1}{2}\vv{r}$. Consider two pairs of states: the north pole and $+x$ ($\vv{r} = (0, 0, 1)$, $\vv{s} = (1, 0, 0)$), and $+x$ and $-x$. Trace distances are computed from $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$:

| channel | north pole and $+x$ | $+x$ and $-x$ |
| :---: | :---: | :---: |
| before | $0.7071$ | $1.0000$ |
| dephasing | $0.5590$ | $0.5000$ |
| amplitude damping | $0.4330$ | $0.7071$ |
| depolarizing | $0.3536$ | $0.5000$ |

No entry exceeds the first row, in agreement with claim 5 of [@prop-trace-distance-metric-contraction]. The first number in the amplitude-damping row was recomputed by applying the Kraus operators to the density matrices and taking the trace norm, again giving $0.4330$. Note that amplitude damping pushes the whole ball toward the north pole, so the centre is not fixed, yet the distance between any two points still does not increase.
:::

So "a mixed state is a shortened line inside the ball" can be stated as a theorem that does not depend on any particular noise model: a channel may translate, squash, or rotate the ball, but it can never pull any two of its points apart. Distinguishability can only be lost; it never grows out of nothing.

::: {.viz src="bloch-noise" preset="distance" height="500"}
**Two states only get closer.** The first pair of the example: $\rho$ at the north pole and $\sigma$ at $+x$, one step of amplitude damping ($\gamma = \frac{1}{2}$). $\rho$ stays, $\sigma$ is pulled north, and the distance on the white line drops from the dashed $0.707$ to $0.433$ ([@prop-trace-distance-metric-contraction]).
:::

## 4.3 The Maximally Mixed Dead Center ($\vv{r} = \vv{0}$) {#sec-ch04-3}

Follow the contraction all the way inward: first annihilate equatorial coherence so the state lands on the north–south axis, and then erase vertical bias $r_z$ as well until the Bloch vector vanishes into the geometric origin $\vv{r} = \vv{0}$.

::: {.viz src="bloch-noise" preset="centre" height="500"}
**The centre: the origin forgotten.** Depolarizing at strength $1$ shrinks the whole ball to the violet centre: $\rho$ from the north pole and $\sigma$ from $+x$ land on the same spot, and the white line has length zero.
:::

First we record the exact algebraic criterion for vanishing equatorial coherence as an immediate corollary of [@thm-pinching-pythagorean].

::: {.corollary #cor-pinching-zero-offdiag title="Zero Discarded Coherence Mass and Pinching Fixed Points via Off-Diagonal Vanishing" lean="D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero D5/S3/QuantumChannels/CoherenceMassBridge.pinching_discarded_mass_eq_zero_iff"}
For any qubit matrix $\rho \in M_2(\mathbb{C})$ with off-diagonal pair $\operatorname{offDiag}(\rho) = (\rho_{01}, \rho_{10}) \in \mathbb{C} \times \mathbb{C}$, the following three conditions are equivalent:

1. $\rho$ is a fixed point of standard-basis pinching: $\mathcal{P}(\rho) = \rho$;
2. Pinching discards zero Hilbert–Schmidt coherence mass: $\langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$;
3. Both off-diagonal entries of $\rho$ vanish: $\operatorname{offDiag}(\rho) = (0, 0)$.
:::

::: proof
($1 \Leftrightarrow 3$): $\mathcal{P}(\rho)$ agrees with $\rho$ on diagonal indices $(0, 0), (1, 1)$ and equals $0$ at $(0, 1), (1, 0)$, so $\mathcal{P}(\rho) = \rho$ holds if and only if $\rho_{01} = \rho_{10} = 0$. ($2 \Leftrightarrow 3$): By claim 2 of [@thm-pinching-pythagorean], the discarded mass equals $|\rho_{01}|^2 + |\rho_{10}|^2$; a sum of two nonnegative real numbers vanishes if and only if each summand vanishes, which holds if and only if $\rho_{01} = \rho_{10} = 0$. The full proof is checked by the Lean kernel.
:::

Setting $\rho_{01} = \rho_{10} = 0$ ($r_x = r_y = 0$) together with equal populations $\rho_{00} = \rho_{11} = \frac{1}{2}$ ($r_z = 0$) brings us to the most symmetric — and locally most silent — state in single-qubit physics: $\rho_* = \frac{1}{2}I$. Let us examine this dead center from four angles, discovering at its core a secret portal to multi-qubit entanglement.

::: {.example #ex-maximally-mixed-center title="Anatomy of the Maximally Mixed Center and a Preview of Bell Entanglement"}
At the Bloch origin $\vv{r} = (0, 0, 0)$, [@prop-qubit-bloch-core] gives $B(\vv{0}) = 0$, so the density matrix is half the identity:

$$
\rho_* = \frac{1}{2}\bigl(I + B(\vv{0})\bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}.
$$

Four geometric properties converge at this single point:

1. **Omnidirectional blindness**: Against *every* unit measurement direction $\vv{n} \in S^2$ ($P_{\vv{n}} = \frac{1}{2}(I + B(\vv{n}))$), the Born formula of [@ex-bloch-half-angle] gives

   $$
   \Tr(\rho_* P_{\vv{n}}) = \frac{1 + \vv{0}\cdot\vv{n}}{2} = \frac{1}{2}.
   $$

   Rotate your Stern–Gerlach magnet or polarizer wherever you please — north, east, or skew — and the detector answers with $50\% : 50\%$ white noise! Just as diagnosed in the Fourth Blind Spot of the [Prelude](README.md), averaging impartially over all directions on the sphere ($\frac{1}{4\pi}\int_{S^2} \vv{a}\,d\Omega = \vv{0}$) collapses "omniscient symmetry" into total blindness.
2. **Zero purity excess**: Since $\rho_*^2 = \frac{1}{4}I$, purity hits the two-dimensional floor $\Tr(\rho_*^2) = \frac{1}{2}$. In [@thm-complementary-pythagoras] ($|d| = 2$), the purity excess $\Tr(\rho_*^2) - \frac{1}{2} = 0$ vanishes identically: neither axial particle bias nor equatorial wave coherence remains.
3. **Infinite ensemble ambiguity**: Mixing $50\%$ North with $50\%$ South gives $\frac{1}{2}\rho_{+\vv{e}_3} + \frac{1}{2}\rho_{-\vv{e}_3} = \frac{1}{2}I$; mixing $50\%$ East with $50\%$ West also gives $\frac{1}{2}\rho_{+\vv{e}_1} + \frac{1}{2}\rho_{-\vv{e}_1} = \frac{1}{2}I$! Once collapsed to the center of mass $\vv{r} = \vv{0}$, no experiment can ever reconstruct which antipodal pair was blended to form it.
4. **Foreshadowing Part IV (Entangled Spheres)**: Return to the joint pure state of Section 4.1 at $\theta_{\mathrm{env}} = 90^\circ$ — the maximally entangled **Bell state** $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$, whose density operator expands as $\rho_{AB} = \frac{1}{4}(I \otimes I + \sigma_x \otimes \sigma_x - \sigma_y \otimes \sigma_y + \sigma_z \otimes \sigma_z)$. Globally, the two-qubit pair is in a zero-entropy pure state of full norm ($\Tr(\rho_{AB}^2) = 1$). Yet inspect qubit $A$ alone and you find $\rho_A = \frac{1}{2}I$ ($\vv{r}_A = \vv{0}$); inspect qubit $B$ alone and you find $\rho_B = \frac{1}{2}I$ ($\vv{r}_B = \vv{0}$)! Both local spheres sit at their dead centers, with vanishing single-qubit Pauli sectors $\sigma_i \otimes I$ and $I \otimes \sigma_j$. Where does $100\%$ of the nontrivial purity reside? **Entirely in the joint two-qubit Pauli correlation sector $\sigma_i \otimes \sigma_j$ (which Part IV, Chapter 13 interprets geometrically as shared correlation planes spanning the two spheres)!**
:::

::: {.figure src="ch04-centre-mixtures"}
**The centre does not remember how it was mixed.** Half north with half south, half east with half west, or half of each end of the dashed tilted chord: every equal mixture has the midpoint of its chord as Bloch vector, and all of them land on the violet centre $\frac{1}{2}I$ (item 3 of [@ex-maximally-mixed-center]).
:::

---

### 4.3.1 Summary of Part I: From Point to Line — Ready to Open the Plane {#summary-of-part-i-from-point-to-line--ready-to-open-the-plane}

Across the four chapters of Part I, the theorem statements checked by the Lean kernel and their pinned formal declarations support our reconstruction of the foundations of quantum geometry; their individual correspondences appear in the book's formal verification ledger:

- **Chapter 1** dismantled both the isolated-particle myth and the external-point-$C$ coordinate scaffolding, proved that $M_2(\mathbb{C})$ admits no algebraic character ([@thm-qubit-no-character]), and used unitary ray rigidity ([@thm-ray-phase-rigidity]) and the Bloch map ([@prop-qubit-bloch-core]) to turn four-parameter complex column vectors into real unit rays $\vv{a} \in S^2$;
- **Chapter 2** chose the known state itself as basis, identified "point $C$" as the endogenous compatibility shadow $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$, and derived Born's squared-modulus rule ([@thm-born-modulus-square], [@thm-rank-one-born-pairing]) and the half-angle identity $\cos^2(\theta/2) = \frac{1 + \cos\theta}{2}$ directly from coordinate-free trace pairing and Pythagoras's theorem; it also proved that a reading positive on probes peels off layer by layer into least confirmations ([@thm-positive-dual-generation]), and that in finite dimension an additive probability on effects is the trace pairing of a density matrix ([@thm-busch-effect-density]);
- **Chapter 3** revealed particles, concepts, and ticks of classical linear time as fixed points of idempotent lines $P^2 = P$ ([@thm-pinching-idempotent], [@thm-unread-fixed-iff], [@thm-conditional-state-valid]), paired inseparably with their Hodge-dual wave planes via complementary Pythagorean tomography ([@thm-complementary-pythagoras]), and bounded the record capacity of a $d$-dimensional system by $N \le d$ ([@prop-record-capacity]) together with the entropic uncertainty relation for complementary contexts ([@prop-collision-entropy-uncertainty]);
- **Chapter 4** traced decoherence to partial-trace marginalization ([@thm-nonselective-marginal]), proved that local irreversibility is an environment-access defect rather than ontological loss ([@thm-reduced-access-defect]), described the contraction geometry of phase damping, amplitude damping, and pinching ([@thm-pinching-pythagorean], [@prop-phase-damping-decay], [@prop-amplitude-damping-contraction], [@cor-pinching-zero-offdiag]), used Stinespring's dilation ([@thm-stinespring-dilation]) to explain representation compression, showed with the Sz.-Nagy unitary power dilation ([@thm-unitary-power-dilation]) that all powers of a contraction are shadows of one unitary evolution, and bounded two-state distinguishability through trace-distance contraction under channels on a fixed finite index type ([@prop-trace-distance-metric-contraction]).

::: {.viz src="bloch-noise" height="560"}
**The full lab.** Switch between the three noises, set the strength per step and $T_2 / T_1$, or drag $\rho$ and $\sigma$ on the skin, and follow along the rail how the cyan ball deforms and how the white line only shrinks.
:::

With the one-dimensional projection line $\vv{a}\cdot\vv{b} = \cos\theta$ firmly in hand, **Part II (*Unfolding Wings — From Line to Plane*)** raises our gaze to the oriented two-dimensional area $\vv{a} \wedge \vv{b} = \sin\theta\,\hat{I}$ — revealing why the "imaginary unit" is nothing more than a $90^\circ$ planar turn, and unifying quantum gates with all five textbook postulates through the single Clifford geometric product $AB = A\cdot B + A\wedge B$.

::: {.film src="002-pairwise-born"}
**Pairwise measurement: from two arrows to the Born weight (1 min 26 s).** Two arrows $60^\circ$ apart read their own angle from the two diagonals of their parallelogram ([@thm-parallelogram-norm-law]); with $A$ as its own axis, the foot $C$ becomes the cyan shadow $\cos\theta$ that $B$ casts on $A$; squeezing that shadow from $[-1, 1]$ into $[0, 1]$ gives the weight $\cos^2(\theta/2)$ ([@thm-born-modulus-square]); only squares let a shutter and its complement share the whole weight ([@thm-born-probability-skeleton]); finally an environment records the branch, and the arrow shrinks to a short line on the vertical axis inside the ball ([@thm-nonselective-marginal]).
:::
