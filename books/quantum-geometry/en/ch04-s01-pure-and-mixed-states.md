# 4.1 Pure States Are the Spherical Shell ($\|\vv{r}\| = 1$), Mixed States Are Truncated Chords Inside ($\|\vv{r}\| < 1$) {#sec-ch04-1}

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

Place each Kraus branch in an orthogonal environment slot, and a general finite matrix channel becomes an isometric embedding followed by forgetting the environment. We use environment-first tensor order below, so the partial trace sums over the first factor.

::: {.theorem #thm-finite-channel-stinespring title="Kraus Representation and Isometric Partial-Trace Dilation of Every Finite Matrix Channel" lean="D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring"}
Let $A,B$ be arbitrary finite coordinate types with decidable equality, let $\mathcal E:M_A(\mathbb C)\to M_B(\mathbb C)$ be a completely positive trace-preserving channel, and put $I=B\times A$. Both of the following hold:

1. There is a family of rectangular Kraus matrices $K_k\in M_{B\times A}(\mathbb C)$, indexed by $k\in I$, such that

   $$
   \sum_{k\in I}K_k^\dagger K_k=I_A,\qquad
   \mathcal E(X)=\sum_{k\in I}K_kXK_k^\dagger
   \quad\text{for every }X\in M_A(\mathbb C).
   $$

2. There is a linear isometric matrix $V:\mathbb C^A\to\mathbb C^I\otimes\mathbb C^B$ such that

   $$
   V^\dagger V=I_A,\qquad
   \mathcal E(X)=\Tr_I(VXV^\dagger)
   \quad\text{for every }X\in M_A(\mathbb C).
   $$

Here $\Tr_I$ traces out the environment factor $\mathbb C^I$. If $|A|=d$ and $|B|=d'$, this dilation has environment dimension $|I|=dd'$, giving the existence bound of at most $dd'$. The original statement also allows empty finite coordinate types whenever a channel with those types exists.
:::

::: proof
Complete positivity makes the Choi matrix, ordered by output–input coordinates $B\times A$, positive semidefinite. Reshaping the vectors of its spectral decomposition gives rectangular Kraus matrices. Applying trace preservation to every input matrix unit yields $\sum_kK_k^\dagger K_k=I_A$. Stack the branches as $V_{(k,p),r}=(K_k)_{p,r}$: its adjoint product is exactly this sum, so $V$ is isometric. Summing the environment index $k$ in $VXV^\dagger$ gives $\sum_kK_kXK_k^\dagger$ entry by entry. The matrix-unit identity extends by linearity to every complex matrix. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-stinespring-literature title="Minimal Dilations, Unitary Extensions, and Microscopic Bath Underdetermination (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** [@thm-finite-channel-stinespring] gives an isometric partial-trace dilation of every finite matrix CPTP channel with an environment of dimension $dd'$. The stronger conclusions below remain part of the classical Stinespring dilation literature (W. F. Stinespring, *Positive functions on $C^*$-algebras*, Proc. Amer. Math. Soc. **6**, 211–216, 1955). Here $d,d'>0$, and the literature statements use output-first order $\mathcal H_{\mathrm S'}\otimes\mathcal H_{\mathrm E}$, obtained by swapping the two factors of the preceding dilation:

1. **Minimum environment dimension**: The minimum isometric-dilation environment dimension for $\mathcal E:M_d(\mathbb C)\to M_{d'}(\mathbb C)$ equals its Choi rank. The $dd'$ environment labels in [@thm-finite-channel-stinespring] provide a dilation; that theorem does not establish its minimality.
2. **Unique environment-unitary equivalence of minimal dilations and physical bath underdetermination**: For minimal dilations, with linearly independent Kraus operators and no redundant uncoupled environment dimensions, any two minimal isometric dilations $(\mathcal H_{\mathrm E_1},V_1)$ and $(\mathcal H_{\mathrm E_2},V_2)$ of the same channel $\mathcal E$ admit a unique environment unitary $W:\mathcal H_{\mathrm E_1}\to\mathcal H_{\mathrm E_2}$ satisfying $(I_{\mathrm S'}\otimes W)V_1=V_2$. The reduced channel $\mathcal E$ alone nevertheless leaves the actual microscopic bath underdetermined: nonminimal redundant dimensions, environment basis rotations, and the continuous-time system–bath Hamiltonian $H_{\mathrm{SE}}(t)$ or interaction history producing the map are not reconstructed by local channel data.
3. **Joint unitary extension with a fixed pure environment**: When $d'=d$, fix a unit environment state $\lvert e_0\rangle$. The isometric embedding extends to a joint unitary $U$ with $V\lvert\psi\rangle=U(\lvert\psi\rangle\otimes\lvert e_0\rangle)$, giving

   $$
   \mathcal E(X)=\Tr_{\mathrm E}\bigl(U(X\otimes\lvert e_0\rangle\langle e_0\rvert)U^\dagger\bigr)
   \quad\text{for every }X\in M_d(\mathbb C).
   $$

The general C\*-algebraic representation-compression form is supplied by [@thm-stinespring-dilation]; [@thm-finite-channel-stinespring] obtains the finite matrix Schrodinger-picture form directly from Kraus operators. Minimum dimension, unique equivalence of minimal dilations, fixed-pure-environment unitary extension, and the physical interpretation of microscopic baths retain their respective literature status.
:::

An immediate, far-reaching consequence follows: **within this model, apparent local irreversibility is not dynamical destruction — it is an access defect caused by losing the environment key!**

Test this on the sharpest possible pair: prepare East $\rho = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & 1\\ 1 & 1\end{smallmatrix}\bigr)$ versus West $\sigma = \lvert -\rangle\langle -\rvert = \frac{1}{2}\bigl(\begin{smallmatrix}1 & -1\\ -1 & 1\end{smallmatrix}\bigr)$ alongside a blank environment qubit $\lvert 0\rangle_{\mathrm{env}}$, and apply the reversible controlled-copy unitary $U_{\mathrm{copy}}$ (a CNOT permutation flipping the environment bit $a \mapsto 1 - a$ iff the system bit is $1$). Afterward:

1. Locally on the system qubit alone, $\rho$ and $\sigma$ collapse to the **exact same** dead-center matrix $\frac{1}{2}I$ — no local recovery map on Earth can tell whether the input was $\lvert +\rangle$ or $\lvert -\rangle$;
2. Globally on the joint two-qubit register, the two output states remain completely distinct, and applying the inverse unitary $U_{\mathrm{copy}}^*$ restores both $\rho$ and $\sigma$ without a scratch!

The next theorem packages all six parts of this diagnosis into a single kernel-verified statement.

::: {.theorem #thm-reduced-access-defect title="Controlled-Copy Record: Equal Reduced States, Distinguishable Joint States, Global Reversibility" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect"}
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
