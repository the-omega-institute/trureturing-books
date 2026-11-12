# Hiding Fragile Lines in Higher-Dimensional Areas: Quantum Error-Correcting Codes and Anyonic Topological Braids

> *"Area is wave, and particle is line. If line and area are both projections of a state, this seems a promising explanation of wave–particle duality."*

In [Chapter 13](ch13-entanglement-and-chsh.md), we saw how a two-qubit Bell state drains both single-qubit local Bloch lines to zero ($\vv{r} = \vv{s} = \vv{0}$) while storing all of the non-identity purity excess $\Tr(\rho^2) - \frac{1}{4} = \frac{3}{4}$ above the $\frac{1}{4}I_4$ baseline (namely $\frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$) inside the $9$-dimensional correlation tensor sector $\mathcal{W}_{\mathrm{corr}}$. In this chapter we turn that geometric insight into the foundational defense strategy of quantum information engineering: **quantum error correction and topological braiding**.

In classical digital hardware, protecting information against noise is straightforward — **copy it**. To guard a classical bit against thermal flips, a repetition circuit duplicates $0 \mapsto 000$ and $1 \mapsto 111$ and takes a majority vote. Before quantum error correction can even begin, however, an uncompromising law of inner-product geometry bars the classical copying strategy: **an unknown quantum superposition cannot be cloned**. Since we cannot duplicate a fragile local direction line into two independent local lines, this chapter studies a different encoding strategy: use multi-qubit Pauli stabilizers or braid trajectories in two spatial dimensions to encode logical information in higher-dimensional correlation areas and algebraic knots, protecting it relative to a specified error model. No-cloning constrains copying, but it neither uniquely selects an encoding architecture nor guarantees that all local directions vanish.

::: {.figure src="ch14-overview"}
**Figure 14.** The chapter at a glance. Panel I: on the real overlap slice, the cyan diagonal $y = z$ is what an isometry must output and the dim parabola $y = z^2$ is what cloning outputs; they meet only at $0$ and $1$, with a magenta gap between them. Panel II: the four syndrome rooms of the three-qubit code; the cyan code state lives in the $(+,+)$ room, the magenta $X_2$ carries it whole into the $(-,-)$ room, and the amber arrow brings it back. Panel III: in the plane, a loop around a particle (dim dashed) cannot be undone; through the violet third direction $e_3$ it can be lifted over (a sketch; literature result, not formalized in this book).
:::

## No Cloning: Preserving an Overlap and Squaring It {#sec-no-cloning-overlap}

Why can a classical xerox machine copy a printed page effortlessly, whereas no unitary machine can duplicate an arbitrary unknown quantum state $\psi$ into $\psi \otimes \psi$?

Popular accounts often blame "measurement disturbance," but measurement is not even involved. The obstruction sits directly in the clash between two elementary properties of inner products:

1. **A linear isometry preserves inner products**: If a cloning process is implemented by a complex linear isometry $U$ on $H \otimes_{\mathbb{C}} H$, then for any two input states $\psi$ and $\phi$, their inner-product overlap $z = \langle\phi, \psi\rangle_{\mathbb{C}}$ must remain equal to $z$ after $U$ acts;
2. **Tensor-product duplication squares inner products**: If $\psi$ and $\phi$ are mapped to the duplicated tensor products $\psi \otimes \psi$ and $\phi \otimes \phi$, the inner product of the outputs is the product of the factor inner products, $\langle\phi, \psi\rangle_{\mathbb{C}} \cdot \langle\phi, \psi\rangle_{\mathbb{C}} = z^2$!

Demanding both "preserve $z$" and "square $z$ to $z^2$" forces the algebraic equation $z = z^2$. Across the entire complex plane $\mathbb{C}$, the only numbers equal to their own square are **$z = 1$ (identical vectors) and $z = 0$ (orthogonal vectors)**!

The following theorem formalizes this inner-product criterion on any complex inner-product space $H$ without assuming completeness or finite dimensionality (where Mathlib's `inner Complex` is conjugate-linear in the first slot and $U$ is a complex linear isometric equivalence `LinearIsometryEquiv` on $H \otimes_{\mathbb{C}} H$).

::: {.theorem #thm-no-cloning-overlap title="Inner-Product Criterion for Quantum No-Cloning" lean="D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion"}
Let $H$ be any complex inner-product space (`[NormedAddCommGroup H] [InnerProductSpace Complex H]`), and let $U : (H \otimes_{\mathbb{C}} H) \simeq_{\mathrm{li}}[\mathbb{C}] (H \otimes_{\mathbb{C}} H)$ be a complex linear isometric equivalence on $H \otimes_{\mathbb{C}} H$. Let $\psi, \phi, \mathrm{blank} \in H$ be unit vectors satisfying

$$
\norm{\psi} = 1, \qquad \norm{\phi} = 1, \qquad \norm{\mathrm{blank}} = 1.
$$

If the same operator $U$ and the same blank state $\mathrm{blank}$ satisfy the two exact vector cloning equations

$$
U\bigl(\psi \otimes_{\mathbb{C}} \mathrm{blank}\bigr) = \psi \otimes_{\mathbb{C}} \psi, \qquad
U\bigl(\phi \otimes_{\mathbb{C}} \mathrm{blank}\bigr) = \phi \otimes_{\mathbb{C}} \phi,
$$

then the complex inner product of $\phi$ and $\psi$ equals its own square, and the two vectors are either identical or orthogonal:

$$
\langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 \;\land\; \bigl(\phi = \psi \lor \langle\phi, \psi\rangle_{\mathbb{C}} = 0\bigr).
$$
:::

::: proof
Set $z = \langle\phi, \psi\rangle_{\mathbb{C}}$. Because $U$ is a complex linear isometry, it preserves the inner product on $H \otimes_{\mathbb{C}} H$:

$$
\bigl\langle \phi \otimes_{\mathbb{C}} \mathrm{blank},\; \psi \otimes_{\mathbb{C}} \mathrm{blank}\bigr\rangle_{\mathbb{C}}
= \bigl\langle U(\phi \otimes_{\mathbb{C}} \mathrm{blank}),\; U(\psi \otimes_{\mathbb{C}} \mathrm{blank})\bigr\rangle_{\mathbb{C}}.
$$

Evaluating both sides via $\langle x_1 \otimes y_1, x_2 \otimes y_2\rangle_{\mathbb{C}} = \langle x_1, x_2\rangle_{\mathbb{C}}\langle y_1, y_2\rangle_{\mathbb{C}}$ gives $\langle\phi, \psi\rangle_{\mathbb{C}}\norm{\mathrm{blank}}^2 = z \cdot 1 = z$ on the left and $\langle\phi \otimes_{\mathbb{C}} \phi,\; \psi \otimes_{\mathbb{C}} \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 = z^2$ on the right, establishing $z = z^2$.

Since $\mathbb{C}$ is an integral domain, $z(z - 1) = 0$ implies $z = 1$ or $z = 0$. If $z = 0$, the right disjunct $\langle\phi, \psi\rangle_{\mathbb{C}} = 0$ holds immediately. If $z = \langle\phi, \psi\rangle_{\mathbb{C}} = 1$, expanding the squared norm of the difference gives

$$
\norm{\phi - \psi}^2 = \norm{\phi}^2 - 2\operatorname{Re}\langle\phi, \psi\rangle_{\mathbb{C}} + \norm{\psi}^2 = 1 - 2(1) + 1 = 0,
$$

which forces $\phi - \psi = 0$, hence $\phi = \psi$. The full proof is checked by the Lean kernel.
:::

Look at Figure 14, Panel I: on a real nonnegative overlap slice $z = \cos\vartheta \in [0, 1]$, isometric evolution requires the overlap to stay on the diagonal line $y = z$, whereas tensor duplication pulls it down onto the parabola $y = z^2$. The two curves meet only at the endpoints $(0, 0)$ and $(1, 1)$; at every tilted superposition angle in between (such as $\vartheta = 45^\circ$, where $z = \frac{1}{\sqrt{2}} \approx 0.7071$ while $z^2 = 0.5$), a positive gap $z - z^2 > 0$ forbids joint cloning!

Four precise boundaries govern [@thm-no-cloning-overlap]:

1. **Complex overlap $z \in \mathbb{C}$ versus the real slice $z = \cos\vartheta$**: In general, $z = \langle\phi, \psi\rangle_{\mathbb{C}}$ is a complex number; only on a slice where the inner product is real and nonnegative ($z = \cos\vartheta \in [0, 1]$) does $z = z^2$ take the form $\cos\vartheta = \cos^2\vartheta$. Moreover, never confuse the Hilbert-space overlap angle $\vartheta$ with the Bloch-sphere angle $\theta_{\mathrm{Bloch}}$: by the half-angle formula $|\langle\phi, \psi\rangle|^2 = \cos^2(\theta_{\mathrm{Bloch}}/2)$ of [Chapter 2](ch02-born-rule.md), the Bloch-sphere angle between two pure qubit states is twice their Hilbert ray angle ($\theta_{\mathrm{Bloch}} = 2\vartheta$).
2. **Exact vector equality versus projective rays**: Because the hypotheses of [@thm-no-cloning-overlap] require exact **vector equality** $U(\psi \otimes \mathrm{blank}) = \psi \otimes \psi$ and $U(\phi \otimes \mathrm{blank}) = \phi \otimes \phi$ with the same $U$ and the same $\mathrm{blank}$, the case $z = 1$ yields strict vector equality $\phi = \psi$ ("identical or orthogonal"), not collinearity up to an arbitrary phase; the projective-ray formulation allowing state-dependent output phases $e^{i\alpha(\psi)}$ requires separate phase-gauge bookkeeping.
3. **General inner-product spaces**: The theorem holds on any `NormedAddCommGroup` equipped with `InnerProductSpace Complex`, with no assumption of finite dimension or completeness.
4. **Necessary criterion, not a cloner construction**: The condition $z \in \{0, 1\}$ is a **necessary** compatibility requirement for a pair of states to be cloned by $U$; it must not be misread as constructing a universal cloner.

Boundary 4 says that [@thm-no-cloning-overlap] is only a necessary condition. So ask the converse question: since exact cloning is impossible, how is universal approximate cloning constructed in the literature, and where does the cost land ([@rem-buzek-hillery-isometry-literature])?

::: {.remark #rem-buzek-hillery-isometry-literature title="The Bužek–Hillery Universal 1→2 Cloning Isometry (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Bužek and Hillery (1996) constructed a $1 \to 2$ cloning machine that treats every input alike (with single-copy optimality proved by Gisin and Massar, 1997; see [@ex-buzek-hillery-three-marginals] for citations). It uses three qubits: the input, a blank copy, and an auxiliary "machine" qubit $M$. For a unit vector $\psi$, let $\psi^\perp$ be a unit vector orthogonal to it; the cloning isometry sends the input to

$$
\lvert\psi\rangle \;\longmapsto\; \sqrt{\tfrac{2}{3}}\;\lvert\psi\rangle\lvert\psi\rangle\lvert\psi^\perp\rangle_M \;-\; \sqrt{\tfrac{1}{3}}\;\frac{\lvert\psi\rangle\lvert\psi^\perp\rangle + \lvert\psi^\perp\rangle\lvert\psi\rangle}{\sqrt{2}}\;\lvert\psi\rangle_M ,
$$

where the three factors are clone one, clone two, and the machine qubit. Tracing out the two clones leaves the machine qubit in $\frac{1}{3}\lvert\psi\rangle\langle\psi\rvert + \frac{2}{3}\lvert\psi^\perp\rangle\langle\psi^\perp\rvert$.
:::

The Lean module `D5/S3/Quantum/CloningMachine` defines this candidate machine reduced-state matrix directly and proves that its spectrum does not depend on the input.

::: {.definition #def-cloning-machine-reduced-state title="The Orthogonal Qubit, the Machine Reduced State of the Cloner, and the Machine Entropy" lean="D5/S3/Quantum/CloningMachine.orthogonalQubit D5/S3/Quantum/CloningMachine.machineReducedState D5/S3/Quantum/CloningMachine.binaryEntropyBits D5/S3/Quantum/CloningMachine.machineEntropy"}
In the module `CloningMachine` (`QubitState` is $\operatorname{Fin} 2 \to \mathbb{C}$ and `QubitMatrix` is the type of complex $2 \times 2$ matrices):

1. The **orthogonal qubit** [`orthogonalQubit`](lean:D5/S3/Quantum/CloningMachine.orthogonalQubit) $\psi = \bigl(-\overline{\psi_1},\ \overline{\psi_0}\bigr)$;
2. The **machine reduced state** [`machineReducedState`](lean:D5/S3/Quantum/CloningMachine.machineReducedState) is defined as

   $$
   \operatorname{machineReducedState}\ \psi \;=\; \frac{1}{3}\,\psi\,\psi^{*} \;+\; \frac{2}{3}\,\psi^\perp\,(\psi^\perp)^{*}, \qquad \psi^\perp = \operatorname{orthogonalQubit}\ \psi,
   $$

   where $v\,v^{*}$ denotes the outer-product matrix `Matrix.vecMulVec v (star v)`;
3. The binary entropy in bits [`binaryEntropyBits`](lean:D5/S3/Quantum/CloningMachine.binaryEntropyBits) $p = -p\log_2 p - (1 - p)\log_2(1 - p)$, and the **machine entropy** [`machineEntropy`](lean:D5/S3/Quantum/CloningMachine.machineEntropy) $= \operatorname{binaryEntropyBits}\ \frac{1}{3}$.
:::

::: {.theorem #thm-cloning-machine-spectrum title="The Input-Independent Spectrum of the Cloner's Machine Reduced State and the Closed Form of the Machine Entropy" lean="D5/S3/Quantum/CloningMachine.orthogonal_qubit_inner D5/S3/Quantum/CloningMachine.machine_reduced_is_density D5/S3/Quantum/CloningMachine.machine_reduced_det D5/S3/Quantum/CloningMachine.machine_reduced_spectrum D5/S3/Quantum/CloningMachine.machine_entropy_closed_form"}
Let $\psi$ be a `QubitState`, with the notation of [@def-cloning-machine-reduced-state].

1. **Orthogonality** (no normalization needed): $\psi^{*} \cdot \operatorname{orthogonalQubit}\ \psi = 0$, that is, `star ψ ⬝ᵥ orthogonalQubit ψ = 0`.

If moreover $\psi$ is normalized (`hUnit : star ψ ⬝ᵥ ψ = 1`), then:

2. **It is a density matrix**: $\operatorname{machineReducedState}\ \psi$ is positive semidefinite and has trace $1$;
3. **Determinant**: $\det\bigl(\operatorname{machineReducedState}\ \psi\bigr) = \frac{2}{9}$;
4. **Spectrum**: the spectrum of $\operatorname{machineReducedState}\ \psi$ over $\mathbb{C}$ is exactly $\bigl\{\frac{1}{3},\ \frac{2}{3}\bigr\}$.

In addition, without reference to $\psi$:

5. **Closed form of the machine entropy**: $\operatorname{machineEntropy} = \log_2 3 - \frac{2}{3}$.
:::

::: proof
Claim 1 expands the dot product and simplifies by ring arithmetic. Claim 2: the two outer products $\psi\psi^{*}$ and $\psi^\perp(\psi^\perp)^{*}$ are each positive semidefinite, and a combination with nonnegative coefficients remains so; passing to the orthogonal qubit preserves the squared norm, so the trace equals $\frac{1}{3} + \frac{2}{3} = 1$. Claim 3: write $\psi^\perp(\psi^\perp)^{*}$ as an explicit $2 \times 2$ matrix, expand the determinant, and simplify with the normalization to get $\frac{2}{9}$. Claim 4: the characteristic polynomial of a $2 \times 2$ matrix is determined by its trace and determinant, here $X^2 - X + \frac{2}{9} = \bigl(X - \frac{1}{3}\bigr)\bigl(X - \frac{2}{3}\bigr)$ (`machine_reduced_charpoly`), and the spectrum is its set of roots. Claim 5: substitute $\log_2\frac{1}{3} = -\log_2 3$ and $\log_2\frac{2}{3} = 1 - \log_2 3$ into $\operatorname{binaryEntropyBits}\ \frac{1}{3}$ and simplify. The full proof is checked by the Lean kernel.
:::

[@thm-cloning-machine-spectrum] proves the density-matrix properties, determinant, input-independent spectrum, and closed-form entropy of the $2\times 2$ matrix in [@def-cloning-machine-reduced-state]; how that matrix arises from partial traces of the three-qubit cloning isometry is worked out inside [@ex-buzek-hillery-three-marginals].

::: {.example #ex-buzek-hillery-three-marginals title="The Three Marginals of the Bužek–Hillery Cloner: Clone Fidelity 5/6, Machine Qubit Reversed and Shrunk to 1/3"}
**Literature result, not formalized in this book** (V. Bužek and M. Hillery, Phys. Rev. A **54**, 1844, 1996; for optimality see N. Gisin and S. Massar, Phys. Rev. Lett. **79**, 2153, 1997; see also [@rem-buzek-hillery-isometry-literature]). The marginals below are obtained from the cloning isometry by direct partial traces and were checked numerically on random input states.

Write the output state as $\lvert\Omega\rangle = \sqrt{\frac{2}{3}}\,\lvert\psi\psi\rangle\lvert\psi^\perp\rangle_M - \sqrt{\frac{1}{3}}\,\lvert S\rangle\lvert\psi\rangle_M$ with $\lvert S\rangle = \frac{1}{\sqrt{2}}\bigl(\lvert\psi\psi^\perp\rangle + \lvert\psi^\perp\psi\rangle\bigr)$.

- **The machine qubit.** $\lvert\psi\psi\rangle$ and $\lvert S\rangle$ are orthogonal, so the cross terms vanish when the two clones are traced out, leaving $\rho_M = \frac{2}{3}\lvert\psi^\perp\rangle\langle\psi^\perp\rvert + \frac{1}{3}\lvert\psi\rangle\langle\psi\rvert$, which is exactly $\operatorname{machineReducedState}\ \psi$ of [@def-cloning-machine-reduced-state].
- **A single clone.** The machine factors $\lvert\psi^\perp\rangle$ and $\lvert\psi\rangle$ of the two terms are orthogonal, so after tracing out the machine the pair of clones is in the mixture $\frac{2}{3}\lvert\psi\psi\rangle\langle\psi\psi\rvert + \frac{1}{3}\lvert S\rangle\langle S\rvert$. Tracing out the other clone as well, $\lvert\psi\psi\rangle$ contributes $\lvert\psi\rangle\langle\psi\rvert$ and $\lvert S\rangle$ contributes $\frac{1}{2}\bigl(\lvert\psi\rangle\langle\psi\rvert + \lvert\psi^\perp\rangle\langle\psi^\perp\rvert\bigr)$, for a total of

  $$
  \rho_{\mathrm{clone}} \;=\; \Bigl(\frac{2}{3} + \frac{1}{6}\Bigr)\lvert\psi\rangle\langle\psi\rvert + \frac{1}{6}\,\lvert\psi^\perp\rangle\langle\psi^\perp\rvert \;=\; \frac{5}{6}\,\lvert\psi\rangle\langle\psi\rvert + \frac{1}{6}\,\lvert\psi^\perp\rangle\langle\psi^\perp\rvert .
  $$

Let the Bloch vector of the input be the unit vector $\vv{r}$ (so that $\lvert\psi^\perp\rangle$ corresponds to $-\vv{r}$):

| subsystem | eigenvalues of the reduced state | Bloch vector | fidelity with the input $\langle\psi\rvert\rho\lvert\psi\rangle$ | entropy (bits) |
| :---: | :---: | :---: | :---: | :---: |
| input | $1,\ 0$ | $\vv{r}$ | $1$ | $0$ |
| clone one, clone two | $\frac{5}{6},\ \frac{1}{6}$ | $\frac{2}{3}\,\vv{r}$ | $\frac{5}{6} \approx 0.8333$ | $0.6500$ |
| machine qubit | $\frac{2}{3},\ \frac{1}{3}$ | $-\frac{1}{3}\,\vv{r}$ | $\frac{1}{3}$ | $\log_2 3 - \frac{2}{3} \approx 0.9183$ |

The eigenvalues and the entropy in the machine row are claims 4 and 5 of [@thm-cloning-machine-spectrum]. Numerical check (three random input states): clone fidelity $0.833333$; Bloch shrinking factors $0.666667$ for the clones and $-0.333333$ for the machine; machine spectrum $\{0.333333,\ 0.666667\}$; determinant $0.222222$. The linear extension of the formula from the computational basis agrees with the expression for general $\psi$ up to a global phase, and it preserves inner products.

Thus, whereas exact cloning is obstructed by the $z = z^2$ criterion of [@thm-no-cloning-overlap], this approximate cloner shrinks the Bloch vector of each clone uniformly to $\frac{2}{3}$ while the machine qubit carries a reversed Bloch vector of length $\frac{1}{3}$ and an input-independent entropy of $\log_2 3 - \frac{2}{3} \approx 0.918$ bits, with the mixedness of all three marginals arising from tripartite entanglement.
:::

::: {.figure src="ch14-approx-clone"}
**The price of approximate cloning: each clone shrinks to 2/3, and the machine carries away 1/3 the other way.** The amber point on the shell is the input $\vv{r}$; the cyan arrow is the Bloch vector $\frac{2}{3}\vv{r}$ of each clone, ending on the cyan dashed circle; the magenta arrow is the machine qubit's $-\frac{1}{3}\vv{r}$, ending on the magenta dashed circle of radius $\frac{1}{3}$. All three vectors are computed by partial traces of the cloning isometry. Literature result, not formalized in this book; for the machine's spectrum see [@thm-cloning-machine-spectrum].
:::

## Pauli Words and Stabilizer Syndromes {#sec-pauli-syndrome-parity}

If [@thm-no-cloning-overlap] forbids duplicating an unknown superposition $\alpha\lvert 0\rangle + \beta\lvert 1\rangle$ into $(\alpha\lvert 0\rangle + \beta\lvert 1\rangle)^{\otimes 3}$, how does quantum error correction protect quantum information?

The key is to **embed orthogonal basis states into a multi-body entangled subspace** — for instance extending $\lvert 0\rangle \mapsto \lvert 000\rangle$ and $\lvert 1\rangle \mapsto \lvert 111\rangle$ linearly to $\alpha\lvert 0\rangle + \beta\lvert 1\rangle \mapsto \alpha\lvert 000\rangle + \beta\lvert 111\rangle$ — and then measure only multi-body **Pauli words** that check joint parity without ever probing the single-qubit amplitudes $\alpha, \beta$!

::: {.figure src="ch14-syndrome-table"}
**The checks read which bit flipped, never $\alpha$ or $\beta$.** The four rows are the errors $I$, $X_1$, $X_2$, $X_3$; each row shows $E\lvert 000\rangle$ on the left and $E\lvert 111\rangle$ on the right, with the flipped bit outlined in magenta, and beside each string the two lamps $g_1 = Z_1Z_2$ and $g_2 = Z_2Z_3$, lit (magenta) when the reading is $-1$. The four errors light four different patterns, and within a row both strings light the same lamps: reading the lamps cannot tell $\lvert 000\rangle$ from $\lvert 111\rangle$, so it never touches $\alpha$ or $\beta$. Which lamps light is the mod-$2$ parity derived after [@lemma-pauli-word-phase] below.
:::

To formalize this algebra across arbitrary mode count $N \in \mathbb{N}$ and arbitrary local level count $p \in \mathbb{N}$ with `[NeZero p]` (note that **$p$ is not required to be prime, and $N$ may be $0$**), the source module `StabilizerGenuineEntanglementCommutationRank` defines the structure `PauliWord N p` with three fields:

- A discrete phase exponent $\mathrm{phase} : \mathrm{ZMod}\,p$;
- A shift (flip) exponent vector $x : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$;
- A clock (phase) exponent vector $z : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$.

Writing $\omega_p = \mathrm{windowRoot}\,p = \exp(2\pi i / p)$, on a single $p$-level qudit ($M_{\mathrm{Fin}\,p}(\mathbb{C})$) the cyclic shift matrix $X$ and the diagonal clock matrix $Z = \operatorname{diag}(\omega_p^{j.\mathrm{val}})$ form the single-site Weyl operator $D(e, f) = X^{e.\mathrm{val}} Z^{f.\mathrm{val}}$ (ordered with $Z$ on the right and $X$ on the left). A Pauli word $w : \mathrm{PauliWord}\,N\,p$ then defines the $N$-qudit matrix operator `pauliWordOperator w` on $(\mathrm{Fin}\,N \to \mathrm{Fin}\,p)$ with entries

$$
\bigl(\mathrm{pauliWordOperator}(w)\bigr)_{u, v} = \omega_p^{w.\mathrm{phase}.\mathrm{val}} \prod_{n \in \mathrm{Fin}\,N} D(w.x_n, w.z_n)_{u_n, v_n},
$$

while the formal word product `wordMul a b` adds each field coordinatewise in $\mathrm{ZMod}\,p$:

$$
\mathrm{wordMul}(a, b) = \bigl(a.\mathrm{phase} + b.\mathrm{phase},\; a.x + b.x,\; a.z + b.z\bigr).
$$

When two Pauli-word operators multiply, on each mode $n$ the factor $Z^{a.z_n}$ on the left must pass across $X^{b.x_n}$ on the right to reach normal form $X^{a.x_n + b.x_n} Z^{a.z_n + b.z_n}$, picking up the Weyl commutation phase $Z^{a.z_n} X^{b.x_n} = \omega_p^{(a.z_n b.x_n).\mathrm{val}} X^{b.x_n} Z^{a.z_n}$. The next lemma captures this exact multiplication law.

::: {.lemma #lemma-pauli-word-phase title="Multiplication and Cross-Phase Law for Generalized Pauli Words" lean="D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul"}
Let $N, p \in \mathbb{N}$ with `[NeZero p]`. For any two Pauli words $a, b : \mathrm{PauliWord}\,N\,p$, the product of their matrix operators satisfies

$$
\begin{aligned}
&\mathrm{pauliWordOperator}(a) \cdot \mathrm{pauliWordOperator}(b) \\
&= \mathrm{windowRoot}(p)^{\bigl(\sum_{n \in \mathrm{Fin}\,N} a.z_n \cdot b.x_n\bigr).\mathrm{val}} \bullet \mathrm{pauliWordOperator}\bigl(\mathrm{wordMul}(a, b)\bigr).
\end{aligned}
$$
:::

::: proof
On each mode $n \in \mathrm{Fin}\,N$, multiplying the single-site Weyl operators gives $D(a.x_n, a.z_n) D(b.x_n, b.z_n) = X^{a.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{b.z_n.\mathrm{val}}$. Moving $Z^{a.z_n.\mathrm{val}}$ past $X^{b.x_n.\mathrm{val}}$ via the clock–shift relation $Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} = \omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}}$ and reducing the shift and clock powers modulo $p$ yields $\omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} D(a.x_n + b.x_n, a.z_n + b.z_n)$. Taking the product over all $n \in \mathrm{Fin}\,N$ sums the cross-phase exponents in $\mathrm{ZMod}\,p$ to $\sum_n a.z_n \cdot b.x_n$, while the intrinsic phase factors $\omega_p^{a.\mathrm{phase}.\mathrm{val}} \omega_p^{b.\mathrm{phase}.\mathrm{val}} = \omega_p^{(a.\mathrm{phase} + b.\mathrm{phase}).\mathrm{val}}$ combine into the `phase` field of `wordMul a b`. The full proof is checked by the Lean kernel.
:::

Two critical points in [@lemma-pauli-word-phase] must be observed:

1. **Never drop the external cross-phase scalar**: In the source definition, `wordMul a b` only adds the intrinsic phases `a.phase + b.phase`; the entire noncommutative cross-phase $\omega_p^{(\sum_n a.z_n b.x_n).\mathrm{val}}$ stands **outside** as a scalar multiplier $\bullet$ and must never be omitted. Even for qubits ($p = 2$, $\omega_2 = -1$), the single-site operator order remains $X^{x_n} Z^{z_n}$, so every site where $a.z_n = 1$ and $b.x_n = 1$ contributes a minus sign from $ZX = -XZ$.
2. **Binary symplectic parity check at $p = 2$**: Because $\mathrm{wordMul}(a, b) = \mathrm{wordMul}(b, a)$, comparing $\mathrm{pauliWordOperator}(a)\mathrm{pauliWordOperator}(b)$ with $\mathrm{pauliWordOperator}(b)\mathrm{pauliWordOperator}(a)$ shows that their commutation phase is governed by the difference $\sum_n (a.z_n b.x_n - b.z_n a.x_n)$ in $\mathrm{ZMod}\,p$. At $p = 2$, this reduces to the binary symplectic inner product

   $$
   \langle a, b\rangle_{\mathrm{symp}} = \sum_{n \in \mathrm{Fin}\,N} \bigl(a.z_n b.x_n + a.x_n b.z_n\bigr) \pmod 2,
   $$

   which determines whether a stabilizer check $a$ commutes ($+1$) or anticommutes ($-1$) with a Pauli error $b$. Note that [@lemma-pauli-word-phase] itself is the operator multiplication identity; turning syndromes into guaranteed logical recovery requires the orthogonal-syndrome decoding structure developed next.

::: {.viz src="syndrome-decoding" preset="single" height="500"}
**One light points at the flipped qubit.** The two checks of the three-qubit repetition code, $g_1 = Z_1Z_2$ and $g_2 = Z_2Z_3$, sit over neighbouring pairs of qubits. When the first qubit flips (the magenta X), only $g_1$, which sits over it, lights up (magenta) and $g_2$ stays dark: $X_1$ anticommutes with $g_1$ and commutes with $g_2$, exactly the parity mod $2$ above, with the cross phase coming from [@lemma-pauli-word-phase]. The decoder follows the light and flips the first qubit back (amber); the cyan bars return to the code space and land on the dashed outline.
:::

## Logical Recovery from Orthogonal Syndromes {#sec-orthogonal-syndrome-recovery}

Once environmental errors kick an encoded logical state $\rho \in M_d(\mathbb{C})$ into distinct error channels, how does recovery strip away the error matrix $\sigma$ and restore $\rho$ intact?

Geometrically, the mechanism relies on **mutually orthogonal syndrome subspaces** (Figure 14, Panel II). Let $s$ (syndrome indices), $n$ (physical dimension), and $d$ (logical code dimension) be finite index types with `[DecidableEq s]` and `[DecidableEq d]` ($n$ requires no explicit `DecidableEq` instance). In `OrthogonalSyndromeDecoding`, a family of embedding matrices $S : s \to M_{n \times d}(\mathbb{C})$ satisfies `OrthogonalSyndromes S` if

$$
\forall i, j : s,\qquad S_i^* S_j = \begin{cases} I_d & \text{if } i = j, \\ 0 & \text{if } i \neq j. \end{cases}
$$

Each $S_i$ isometrically embeds the $d$-dimensional logical space into the $i$-th syndrome subspace ($S_i^* S_i = I_d$), while distinct syndrome subspaces are strictly orthogonal ($S_i^* S_j = 0$ for $i \neq j$).

::: {.viz src="syndrome-decoding" preset="rooms" height="500"}
**An error moves the state, whole, into another room.** Below, the eight basis states fall into four rooms $S_j = E_jV$ ($E \in \{I, X_1, X_2, X_3\}$) according to the readings of the two checks. The middle qubit flips and both lights go on; the two cyan bars of $\alpha\lvert 000\rangle + \beta\lvert 111\rangle$ move unchanged into room $(-1,-1)$, onto $\lvert 010\rangle$ and $\lvert 101\rangle$, and the other three rooms stay empty.
:::

For any syndrome coefficient matrix $\sigma \in M_s(\mathbb{C})$ and any logical matrix $\rho \in M_d(\mathbb{C})$, the **syndrome encoding map** is

$$
\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, S_j \rho S_k^* \in M_n(\mathbb{C}),
$$

and the **syndrome decoding map** is

$$
\mathrm{syndromeDecoding}(S, \mathrm{state}) = \sum_{i \in s} S_i^* \,\mathrm{state}\, S_i \in M_d(\mathbb{C}).
$$

The next proposition proves that decoding any syndrome-encoded state collapses all cross-syndrome terms and returns $\Tr(\sigma) \bullet \rho$.

::: {.proposition #prop-orthogonal-syndrome-recovery title="Exact Logical Recovery from Orthogonal Syndrome Subspaces" lean="D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery"}
Let $s, n, d$ be finite index types (with `[DecidableEq s]` and `[DecidableEq d]`), and let $S : s \to M_{n \times d}(\mathbb{C})$ satisfy `OrthogonalSyndromes S`. Then for every complex matrix $\sigma \in M_s(\mathbb{C})$ and every complex matrix $\rho \in M_d(\mathbb{C})$,

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) = \Tr(\sigma) \bullet \rho.
$$
:::

::: proof
Substituting the double sum of $\mathrm{syndromeEncoding}(S, \sigma, \rho)$ into $\mathrm{syndromeDecoding}$ and expanding by linearity gives

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr)
= \sum_{i \in s} \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, (S_i^* S_j)\, \rho\, (S_k^* S_i).
$$

By `OrthogonalSyndromes S`, $S_i^* S_j = \delta_{ij} I_d$ and $S_k^* S_i = (S_i^* S_k)^* = \delta_{ik} I_d$. For each fixed $i \in s$, every term with $j \neq i$ or $k \neq i$ vanishes, leaving only the $j = k = i$ term $\sigma_{ii}(I_d \rho I_d) = \sigma_{ii}\rho$. Summing over $i \in s$ yields $\bigl(\sum_{i \in s} \sigma_{ii}\bigr)\rho = \Tr(\sigma) \bullet \rho$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch14-trace-survives"}
**After decoding, only the diagonal of $\sigma$ survives.** At the top is the $4\times 4$ noise matrix $\sigma$: the four cyan diagonal cells take the values $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}$ from step four of [@ex-repetition-code-syndrome], and the other twelve, the magenta cross-room coherences, are all struck out. The diagonal adds up to $\Tr\sigma = 1$, and decoding outputs $1 \cdot \rho = \rho$ ([@prop-orthogonal-syndrome-recovery]). With non-zero coherences, a numerical check on the three-qubit code returns the same $\rho$.
:::

Two important domain boundaries apply to [@prop-orthogonal-syndrome-recovery]:

1. **No positivity, unit-trace, or diagonality assumption on $\sigma$ or $\rho$**: The identity holds for **arbitrary** complex matrices $\sigma \in M_s(\mathbb{C})$ and $\rho \in M_d(\mathbb{C})$. In particular, off-diagonal coherent error superpositions $\sigma_{jk}$ ($j \neq k$) between distinct syndrome subspaces are automatically annihilated by $S_i^* S_j = \delta_{ij}I_d$ and $S_k^* S_i = \delta_{ik}I_d$, and when $\Tr(\sigma) = 1$, exact unscaled recovery $\mathrm{syndromeDecoding}(S, \mathrm{syndromeEncoding}(S, \sigma, \rho)) = \rho$ follows as a special case.

::: {.viz src="syndrome-decoding" preset="mix" height="500"}
**Four branches each come back and add up to the state.** Take $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr)$ (step 4 of [@ex-repetition-code-syndrome]) and $\rho = \lvert +\rangle\langle +\rvert$: four branches, no error and a flip of the first, second or third qubit, each cyan bar as wide as its weight and each branch in its own room. Decoding pulls every branch back into the code space, where they line up side by side into one whole bar that fills the dashed outline exactly: $\Tr(\sigma)\,\rho = \rho$, which is [@prop-orthogonal-syndrome-recovery].
:::

2. **Algebraic decoding on the syndrome support versus a globally trace-preserving channel**: $\mathrm{syndromeDecoding}(S, \cdot) = \sum_{i \in s} S_i^* (\cdot) S_i$ is an algebraic recovery formula on the direct sum $\bigoplus_{i \in s} \operatorname{range}(S_i)$. Whenever $|s|d < n$ so that $\sum_{i \in s} S_i S_i^* \neq I_n$, one cannot unconditionally claim that $\{S_i^*\}_{i \in s}$ alone defines a trace-preserving (CPTP) channel on the entire physical space $M_n(\mathbb{C})$; a full physical channel requires completing the Kraus operators on the orthogonal complement $I_n - \sum_{i \in s} S_i S_i^*$.

## Planar Braids and the Third Orthogonal Direction {#sec-braids-and-third-axis}

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

On a one-dimensional chain, nearest-neighbour hopping stays local; the price is an invisible parity tail. The following are **literature results, not formalized in this book**:

- the construction is due to P. Jordan and E. Wigner (*Z. Phys.* **47**, 631–651, 1928);
- the general link between spin and statistics is the spin–statistics theorem;
- on a two-dimensional lattice the $Z$ strings necessarily grow long and hopping terms become nonlocal, which is why other encodings such as Bravyi–Kitaev (2002) or Verstraete–Cirac (2005) are used.

> The fermion's minus sign does not live in the particle; it lives in the parity string to its left.

## Closing the Braid: Markov Stabilization and Coloring Counts {#sec-markov-stabilization-coloring-count}

Item 2 of [@rem-braid-knot-topology-literature] says that a trefoil in three-dimensional space stays knotted, and that colorings are the classical tool for telling it apart. How is the tool used? [@cor-braid-yang-baxter] is about a piece of braid: a row of loose ends on top, a row below, and colors carried from one row to the other. A knot has no loose ends. Bend the braid around and join the $k$-th bottom end to the $k$-th top end; only then do the strands form closed loops. This is the **closure** of the braid. Once the ends are joined, "the color at the top" and "the color at the bottom" are colors of one and the same piece of string, so a coloring of the closed braid has a single condition left to meet: carried once through the braid, the colors must come back unchanged. **A coloring of a closed braid is a fixed point of the coloring transport.**

::: {.viz src="braiding" preset="close" height="500"}
**Close it up, and the colors must come back.** One exchange $\sigma_1$, then each top end is led back along an arc on the right to the bottom end in the same place. The colors $(0, 1)$ reach the top as $(2, 0)$, and both arcs clash (magenta). Of the nine colorings only $(0, 0)$, $(1, 1)$ and $(2, 2)$ come back.
:::

The module `D5/S3/Topology/QuandleMarkovColoring` turns this sentence into a definition. It does not speak of strings drawn on paper: a braid is an element of a group given by generators and relations, and the coloring transport is the action of that group on sequences of colors.

::: {.definition #def-closed-braid-colorings title="The Artin Braid Group by Generators and Relations, the Rack Coloring Action, Closed Colorings, and the Coloring Count" lean="D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.artinRelators D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.Artin D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.PositiveBraid D5/S3/Topology/QuandleMarkovColoring.Colors D5/S3/Topology/QuandleMarkovColoring.braidAction D5/S3/Topology/QuandleMarkovColoring.ClosedColorings D5/S3/Topology/QuandleMarkovColoring.coloringCount"}
Let $n \in \mathbb{N}$, let $Q$ be a type with `[Rack Q]`, and let $\star$ be its rack operation.

1. The **Artin braid group** [`Artin`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.Artin) $n$ is the group given by generators $\sigma_1, \dots, \sigma_{n-1}$ and the set of relators [`artinRelators`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.artinRelators) $n$ (a `PresentedGroup`: the free group modulo the normal subgroup generated by the relators), with relations

   $$
   \sigma_j\sigma_k = \sigma_k\sigma_j \quad (j + 1 < k \ \text{or}\ k + 1 < j), \qquad
   \sigma_k\sigma_{k+1}\sigma_k = \sigma_{k+1}\sigma_k\sigma_{k+1}.
   $$

   In Lean the generators are indexed by $i : \mathrm{Fin}\,(n - 1)$, that is $i = 0, \dots, n - 2$; this book writes $\sigma_{i+1}$. Subtraction of natural numbers truncates, so for $n \le 1$ there are no generators and the group is trivial.
2. A **coloring** is an element of [`Colors`](lean:D5/S3/Topology/QuandleMarkovColoring.Colors) $Q\ n = (\mathrm{Fin}\,n \to Q)$, written $c = (c_1, \dots, c_n)$ (so $c_k$ is the component with Lean index $k - 1$).
3. The **coloring action** [`braidAction`](lean:D5/S3/Topology/QuandleMarkovColoring.braidAction) $Q\ n$ is a group homomorphism from $\mathrm{Artin}\,n$ to the group of permutations (`Equiv.Perm`) of $\mathrm{Colors}\ Q\ n$, determined by its values on the generators: $\sigma_k$ replaces the components $(c_k,\ c_{k+1})$ in positions $k$ and $k + 1$ by $(c_k \star c_{k+1},\ c_k)$ and leaves every other component alone. Write $b \cdot c = \operatorname{braidAction}\ Q\ n\ b\ c$; the product of permutations is composition, $(b\,b') \cdot c = b \cdot (b' \cdot c)$.
4. The **closed colorings** of $b \in \mathrm{Artin}\,n$ are [`ClosedColorings`](lean:D5/S3/Topology/QuandleMarkovColoring.ClosedColorings) $Q\ b = \{\,c : \mathrm{Colors}\ Q\ n \mid b \cdot c = c\,\}$.
5. A **braid with positive strand count** [`PositiveBraid`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.PositiveBraid) is a pair $(n, b)$ with $n > 0$ and $b \in \mathrm{Artin}\,n$ (the name refers to the number of strands, not to the signs of the crossings). If moreover `[Finite Q]`, the **coloring count** [`coloringCount`](lean:D5/S3/Topology/QuandleMarkovColoring.coloringCount) is $\operatorname{coloringCount}\ Q\ (n, b) = \operatorname{Nat.card}\bigl(\mathrm{ClosedColorings}\ Q\ b\bigr)$.
:::

"Determined by its values on the generators" in item 3 does not come for free: the images of the generators must satisfy the Artin relations before the action can descend from the free group to the quotient. The adjacent relation $\sigma_k\sigma_{k+1}\sigma_k = \sigma_{k+1}\sigma_k\sigma_{k+1}$ is exactly where [@cor-braid-yang-baxter] is used (in Lean this step is the private lemma `generator_adjacent`); two crossings that are not adjacent change different components and therefore commute (`generator_distant`).

Counting the fixed points looks like counting a property of the closed loop itself. But a braid carries information the loop does not need: where it was cut open, and how many strands were used. This surplus is exhausted by exactly three rewriting steps: that is Markov's theorem, a literature result recorded in [@rem-alexander-markov-literature]. The Lean file defines these three steps as a purely algebraic relation between braids.

::: {.definition #def-algebraic-markov-moves title="Strand Inclusion, the Last Generator, and Algebraic Markov Equivalence" lean="D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.strandInclusion D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.lastGenerator D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovStep D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovEquivalent"}
Keep the notation of [@def-closed-braid-colorings].

1. The **strand inclusion** [`strandInclusion`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.strandInclusion) $n$, written $\iota_n : \mathrm{Artin}\,n \to \mathrm{Artin}\,(n + 1)$, is the group homomorphism sending each generator $\sigma_k$ to the generator of the same name (Lean does not claim that it is injective).
2. The **last generator** [`lastGenerator`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.lastGenerator) $n\ hn$ (with $hn : 0 < n$) is $\sigma_n$ in $\mathrm{Artin}\,(n + 1)$: the crossing between strand $n$ and the newly added strand $n + 1$.
3. A **Markov step** [`MarkovStep`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovStep) is an inductive relation between braids with positive strand count, with exactly three constructors: for $n > 0$ and $b, g \in \mathrm{Artin}\,n$,

   $$
   \begin{aligned}
   \text{conjugation:}\quad & (n,\ b) \longrightarrow (n,\ g\,b\,g^{-1}), \\
   \text{positive stabilization:}\quad & (n,\ b) \longrightarrow \bigl(n + 1,\ \iota_n(b)\,\sigma_n\bigr), \\
   \text{negative stabilization:}\quad & (n,\ b) \longrightarrow \bigl(n + 1,\ \iota_n(b)\,\sigma_n^{-1}\bigr).
   \end{aligned}
   $$

4. **Markov equivalence** [`MarkovEquivalent`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovEquivalent) is `Relation.EqvGen MarkovStep`: the smallest equivalence relation containing the Markov steps.
:::

In a picture: conjugation cuts the closed loop open at a different place; stabilization adds one new strand on the far right and lets it cross the old last strand exactly once, so that the closure gains one small loop that disappears with a single twist (these two sentences are geometric pictures; their precise form belongs to Markov's theorem in [@rem-alexander-markov-literature]). The algebraic question is: does the number of fixed points survive these three steps?

Conjugation is easy: carry all the colors along. Stabilization is the hard one, because it changes even the number of strands. Let the new strand have color $z$. By the product convention of [@def-closed-braid-colorings], $\iota_n(b)\,\sigma_n$ lets $\sigma_n$ act first, turning the last two strands $(c_n,\ z)$ into $(c_n \star z,\ c_n)$; after that $\iota_n(b)$ touches only the first $n$ strands. The new strand meets no further crossing, so it comes back unchanged only if $z = c_n$. Strand $n$ therefore receives $c_n \star c_n$. Is that equal to $c_n$? No rack axiom says so. A rack with the additional axiom $x \star x = x$ is called a **quandle** (`Quandle Q` in Mathlib). With that axiom the small loop has no effect on the colors at all: the new strand merely copies $c_n$, and the condition on the first $n$ strands is untouched. This hand computation is the central step of the Lean proof, and the module turns it into an explicit one-to-one correspondence.

::: {.viz src="braiding" preset="stabilize" height="500"}
**Add a strand: it merely copies the last color.** On the left, $\sigma_1^3$ on two strands; closed up, the colors $(0, 1)$ match (cyan). On the right a strand is added on the far right and first crosses the old last strand once, which is $\iota_2(\sigma_1^3)\,\sigma_2$: the new strand's color just copies the last one, $1$, and passes the crossing unchanged as $1 \star 1 = 1$. Colorings that come back: $9$ on the left, and $9$ on the right too.
:::

::: {.definition #def-markov-coloring-equivs title="Three Equivalences of Closed-Coloring Spaces under Stabilization and Conjugation" lean="D5/S3/Topology/QuandleMarkovColoring.positiveStabilizationEquiv D5/S3/Topology/QuandleMarkovColoring.negativeStabilizationEquiv D5/S3/Topology/QuandleMarkovColoring.conjugationEquiv"}
Let $Q$ be a type with `[Quandle Q]` (not assumed finite), $n \in \mathbb{N}$ and $b \in \mathrm{Artin}\,n$. The module defines three equivalences (Lean's `Equiv`: a pair of maps together with the proofs that they are mutually inverse):

1. [`positiveStabilizationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.positiveStabilizationEquiv) $n\ hn\ b$ (with $hn : 0 < n$): $\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(\iota_n(b)\,\sigma_n\bigr)$. The forward map copies the last color once more, $(c_1, \dots, c_n) \mapsto (c_1, \dots, c_n, c_n)$; the backward map deletes the last component.
2. [`negativeStabilizationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.negativeStabilizationEquiv) $n\ hn\ b$ (with $hn : 0 < n$): $\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(\iota_n(b)\,\sigma_n^{-1}\bigr)$, with the same forward and backward maps as in item 1.
3. [`conjugationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.conjugationEquiv) $n\ b\ g$ (with $g \in \mathrm{Artin}\,n$): $\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(g\,b\,g^{-1}\bigr)$. The forward map is $d \mapsto g \cdot d$, the backward map $d \mapsto g^{-1} \cdot d$.
:::

::: {.theorem #thm-quandle-coloring-markov-invariant title="The Closed-Coloring Count of a Finite Quandle Is Invariant under Algebraic Markov Equivalence" lean="D5/S3/Topology/QuandleMarkovColoring.quandle_coloring_markov_invariant"}
Let $Q$ be a type with `[Quandle Q]` and `[Finite Q]`, and let $\beta, \beta'$ be two braids with positive strand count (`PositiveBraid`). If $\beta$ and $\beta'$ are Markov equivalent (`MarkovEquivalent β β'`), then

$$
\operatorname{coloringCount}\ Q\ \beta = \operatorname{coloringCount}\ Q\ \beta'.
$$
:::

::: proof
`MarkovEquivalent` is a `Relation.EqvGen`, and the proof is by induction on how the equivalence was generated. The reflexive, symmetric and transitive cases follow from reflexivity, symmetry and transitivity of equality. What remains is a single `MarkovStep`, split by its three constructors; each case applies `Nat.card_congr` to the corresponding equivalence of [@def-markov-coloring-equivs].

The two stabilization equivalences rest on two private lemmas (`positive_fixed_iff` and `negative_fixed_iff`): for $c = (c_1, \dots, c_n)$ and $z \in Q$,

$$
\bigl(\iota_n(b)\,\sigma_n^{\pm 1}\bigr) \cdot (c_1, \dots, c_n, z) = (c_1, \dots, c_n, z)
\iff
b \cdot c = c \ \land\ z = c_n.
$$

Positive sign: $\sigma_n$ sends $(c_1, \dots, c_n, z)$ to $(c_1, \dots, c_{n-1},\ c_n \star z,\ c_n)$, and $\iota_n(b)$ acts as $b$ on the first $n$ components and leaves the last one alone (checked on generators and extended to the whole group by `PresentedGroup.ext`). Comparing last components gives $z = c_n$; substituting back, $c_n \star c_n = c_n$ (`Quandle.fix`) reduces the condition on the first $n$ components to $b \cdot c = c$. Negative sign: $\sigma_n^{-1}$ sends the same tuple to $(c_1, \dots, c_{n-1},\ z,\ z \star^{-1} c_n)$; the last component gives $z \star^{-1} c_n = z = z \star^{-1} z$ (`Quandle.fix_inv`), and cancelling $z \star^{-1}$ (`Rack.left_cancel_inv`) gives $c_n = z$; the rest is the same. Hence "copy the last color" and "delete the last component" are mutually inverse. The conjugation case uses only that the coloring action is a group homomorphism: if $b \cdot d = d$, then $(g\,b\,g^{-1}) \cdot (g \cdot d) = g \cdot (b \cdot d) = g \cdot d$. The full proof is checked by the Lean kernel.
:::

Three boundaries apply whenever [@thm-quandle-coloring-markov-invariant] is cited:

1. **It is a theorem of algebra, not of geometry.** Its statement contains only the group $\mathrm{Artin}\,n$, defined by generators and relations, and the inductive relation `MarkovStep`; the geometric sentence "these two braids close up to the same link" does not occur in Lean. Reading the count as an invariant of knots and links takes the three literature theorems of [@rem-alexander-markov-literature].
2. **An invariant can only say "different".** If the counts differ, the two braids are not Markov equivalent; if the counts agree, nothing follows.
3. **The idempotence axiom cannot be dropped.** `coloringCount` is defined for every finite rack, but the theorem asks for `[Quandle Q]`. The last step of [@ex-fox-three-colorings-markov] exhibits a rack with three elements whose count drops from $3$ to $0$ under a single stabilization.

::: {.viz src="braiding" preset="rack" height="500"}
**A rack that is not a quandle: add a strand and nothing comes back.** The color rule is now $x \star y = y + 1$. On the left, one strand and no crossing: all three colorings come back. On the right a strand is added with one crossing: the copied $0$ passes the crossing as $0 \star 0 = 1$, the arcs clash (magenta), and none of the nine colorings comes back.
:::

::: {.example #ex-fox-three-colorings-markov title="Three Colors Count 3, 3, 9: Closed Colorings of $\sigma_1$, $\sigma_1^2$, $\sigma_1^3$ and the Same Number before and after Stabilization (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The column "closure, as a picture" in the table below (which braid closes up to which knot or link) is a geometric identification and belongs to classical knot theory. Every count in this example comes from exhaustive enumeration (each one can be checked by hand); it is a manual derivation, not a Lean result. What Lean verifies is the equality asserted by [@thm-quandle-coloring-markov-invariant].

**Colors and rule.** Take $Q = \mathbb{Z}/3 = \{0, 1, 2\}$ with $x \star y = 2x - y \pmod 3$ (Mathlib's `Quandle.Dihedral 3`). Modulo $3$ one has $2x - y \equiv -(x + y) \equiv 2y - x$, so the operation is symmetric in $x$ and $y$ and the rule reads: two equal colors give the same color again; two different colors give the third. Checking all $27$ triples confirms self-distributivity; every left translation $y \mapsto x \star y$ is an involution; and $x \star x = x$. The three colors $x$, $y$, $x \star y$ involved in a crossing $(x, y) \mapsto (x \star y,\ x)$ are either all equal or pairwise different: this is Fox's three-coloring rule.

**Two strands.** $\sigma_1 \cdot (x, y) = (x \star y,\ x) = (-x - y,\ x)$ modulo $3$. The nine colorings fall into five orbits:

$$
\begin{aligned}
&(0,0), \qquad (1,1), \qquad (2,2), \\
&(0,1) \to (2,0) \to (1,2) \to (0,1), \qquad (0,2) \to (1,0) \to (2,1) \to (0,2).
\end{aligned}
$$

The three one-color colorings are fixed and the other six form two $3$-cycles. So $\sigma_1$ and $\sigma_1^2$ have $3$ fixed points each, and $\sigma_1^3$ returns all nine colorings to themselves. In the table, $e$ is the identity element (the braid without crossings).

| Braid $(n, b)$ | Coloring count | Closed colorings | Closure, as a picture (geometric identification) |
| :---: | :---: | :---: | :---: |
| $(1, e)$ | $3$ | all $(x)$ | unknot |
| $(2, e)$ | $9$ | all $(x, y)$ | two unlinked circles |
| $(2, \sigma_1)$ | $3$ | $(x, x)$ | unknot |
| $(2, \sigma_1^2)$ | $3$ | $(x, x)$ | Hopf link |
| $(2, \sigma_1^3)$ | $9$ | all $(x, y)$ | trefoil |

**Adding a strand.** For $b = \sigma_1^k$ with $k = 1, 2, 3$, enumerate all $27$ colorings of three strands:

| $b$ on two strands | Count of $(2, b)$ | Count of $\bigl(3,\ \iota_2(b)\,\sigma_2\bigr)$ | Count of $\bigl(3,\ \iota_2(b)\,\sigma_2^{-1}\bigr)$ | Closed colorings on three strands |
| :---: | :---: | :---: | :---: | :---: |
| $\sigma_1$ | $3$ | $3$ | $3$ | $(x, x, x)$ |
| $\sigma_1^2$ | $3$ | $3$ | $3$ | $(x, x, x)$ |
| $\sigma_1^3$ | $9$ | $9$ | $9$ | all $(x, y, y)$ |

In every row the three counts agree, and the closed colorings on three strands are exactly the closed colorings on two strands with the last color copied once more, as items 1 and 2 of [@def-markov-coloring-equivs] say. The two unknots of the first table are the same phenomenon: $(2, \sigma_1)$ is the positive stabilization $\bigl(2,\ \iota_1(e)\,\sigma_1\bigr)$ of $(1, e)$, and $3 = 3$. One conjugation for good measure: with $b = \iota_2(\sigma_1^3)\,\sigma_2$ and $g = \sigma_1\sigma_2^{-1}$, the count of $g\,b\,g^{-1}$ is still $9$.

**Reading the numbers.** Feed the enumerated counts into [@thm-quandle-coloring-markov-invariant] (this substitution is a manual derivation). Since $9 \ne 3$, the contrapositive of the theorem shows that $(2, \sigma_1^3)$ and $(2, \sigma_1)$ are not Markov equivalent; likewise $(2, \sigma_1^2)$ (count $3$) and $(2, e)$ (count $9$) are not Markov equivalent. The counts of $(2, \sigma_1)$ and $(2, \sigma_1^2)$ are both $3$, and nothing follows from that: three colors cannot tell them apart.

**The idempotence axiom cannot be dropped.** Take $Q' = \mathbb{Z}/3$ with $x \star y = y + 1$. It is a rack: every left translation is a bijection, and both sides of the self-distributive law equal $z + 2$. But $x \star x = x + 1 \ne x$, so it is not a quandle. The braid $(1, e)$ has $3$ closed colorings; its positive stabilization $(2, \sigma_1)$ sends $(x, y)$ to $(y + 1,\ x)$, and a fixed point would need $x = y$ and $y + 1 = x$: there is none. The count drops from $3$ to $0$.
:::

::: {.viz src="braiding" preset="trefoil" height="500"}
**$\sigma_1$ and $\sigma_1^3$ count differently.** $\sigma_1$ on the left, $\sigma_1^3$ on the right, both starting from $(0, 1)$: the left one clashes when closed up (magenta), the right one matches (cyan). Colorings that come back: $3$ on the left, $9$ on the right; since $3 \ne 9$, by [@thm-quandle-coloring-markov-invariant] the two are not Markov equivalent.
:::

::: {.remark #rem-alexander-markov-literature title="Artin, Alexander, and Markov: From Algebraic Markov Classes to Link Invariants (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The statement of [@thm-quandle-coloring-markov-invariant] contains no geometric object. Reading it as an invariant of links takes three classical theorems (braids and links below are smooth or piecewise linear):

1. **Artin's theorem** (E. Artin, *Theorie der Zöpfe*, Abh. Math. Sem. Univ. Hamburg **4**, 47–72, 1925; *Theory of braids*, Ann. of Math. **48**, 101–126, 1947): the group of isotopy classes of geometric braids on $n$ strands is isomorphic to the group $\mathrm{Artin}\,n$ of [@def-closed-braid-colorings], given by generators and relations ($n \ge 1$).
2. **Alexander's theorem** (J. W. Alexander, *A lemma on systems of knotted curves*, Proc. Natl. Acad. Sci. USA **9**, 93–95, 1923): every oriented link in $\mathbb{R}^3$ is isotopic to the closure of some braid.
3. **Markov's theorem** (A. Markoff, *Über die freie Äquivalenz der geschlossenen Zöpfe*, Mat. Sbornik **1(43)**, 73–78, 1936; for a complete proof see J. S. Birman, *Braids, Links, and Mapping Class Groups*, Princeton University Press, 1974): the closures of two braids are isotopic as oriented links if and only if the two braids are related by a finite sequence of conjugations, positive and negative stabilizations, and their inverses, that is, after the isomorphism of item 1, if and only if they are Markov equivalent in the sense of [@def-algebraic-markov-moves]. The easy direction is the pair of pictures in the main text: neither conjugation nor stabilization changes the isotopy class of the closure.

Taken together: the closed-coloring count of a finite quandle is an isotopy invariant of oriented links. Combined with the counts of [@ex-fox-three-colorings-markov] and the geometric identification "the closure of $\sigma_1^3$ is the trefoil, the closure of $\sigma_1$ is the unknot", this shows that the trefoil is not isotopic to the unknot; in the same way, the Hopf link is not isotopic to two unlinked circles. Closed colorings can also be described without braids: they correspond to the homomorphisms from the fundamental quandle of the link to $Q$ (D. Joyce, *A classifying invariant of knots, the knot quandle*, J. Pure Appl. Algebra **23**, 37–65, 1982; S. V. Matveev, *Distributive groupoids in knot theory*, Mat. Sb. **119(161)**, 78–88, 1982), and for $Q = \mathbb{Z}/3$ they are Fox's three-colorings. For a rack that fails the idempotence axiom, the coloring count is only an invariant of framed links (R. Fenn and C. Rourke, *Racks and links in codimension two*, J. Knot Theory Ramifications **1**, 343–406, 1992).
:::

A braid has a beginning and an end; a knot has neither. Once the ends are joined, the colors have to come back unchanged; as long as the colors come from a quandle, add a strand, or cut the loop open somewhere else, and exactly as many colorings come back as before. That half is verified by Lean.

::: {.viz src="braiding" height="560"}
The full braiding lab: add crossings $\sigma_k^{\pm 1}$ on top, change the number of strands, click the numbers at the bottom to change colors, and watch the colors ride up the world lines; close the braid and count the colorings that come back, or switch to the non-idempotent rack $x \star y = y + 1$ for comparison.
:::

Let us now work through the four-part numerical and matrix calculation connecting no-cloning, the three-qubit bit-flip code, local Bloch expectations, and $8\times 2$ orthogonal syndrome recovery.

::: {.example #ex-repetition-code-syndrome title="Numerical No-Cloning Gap, Three-Qubit Repetition Syndromes, and 8×2 Orthogonal Recovery (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Steps 1, 2, and 4 below instantiate this chapter's kernel-verified [@thm-no-cloning-overlap], [@lemma-pauli-word-phase], and [@prop-orthogonal-syndrome-recovery], whereas the general criterion in Step 3 for single-qubit marginals of stabilizer codes satisfying the conditions stated there and the single-error-correcting five-qubit, seven-qubit Steane, and nine-qubit Shor codes contrasted at the end of Step 4 belong to the quantum error-correction literature (see [@rem-error-correction-anyons-literature] below) and are not formalized in this book.

This example verifies the four concrete calculations of Chapter 14:

**Step 1: Numerical no-cloning gap at $45^\circ$ versus exact CNOT copying of an orthogonal pair.**
In $H = \mathbb{C}^2$, choose $\lvert\psi\rangle = \lvert 0\rangle = \binom{1}{0}$, $\lvert\phi\rangle = \lvert +\rangle = \frac{1}{\sqrt{2}}\binom{1}{1}$, and $\lvert\mathrm{blank}\rangle = \lvert 0\rangle$. The input inner product is

$$
z = \langle\phi, \psi\rangle_{\mathbb{C}} = \frac{1}{\sqrt{2}} \approx 0.7071067811865476,
$$

whereas the target cloned states $\lvert\phi\rangle\otimes\lvert\phi\rangle$ and $\lvert\psi\rangle\otimes\lvert\psi\rangle$ have inner product

$$
z^2 = \Bigl(\frac{1}{\sqrt{2}}\Bigr)^2 = \frac{1}{2} = 0.5.
$$

The nonzero gap $z - z^2 = \frac{\sqrt{2} - 1}{2} \approx 0.2071067811865476 \neq 0$ violates $z = z^2$ in [@thm-no-cloning-overlap], so no linear isometry $U$ can clone both $\lvert 0\rangle$ and $\lvert +\rangle$. By contrast, for the orthogonal pair $\lvert 0\rangle, \lvert 1\rangle$ ($z = \langle 1, 0\rangle_{\mathbb{C}} = 0 = 0^2$), $\mathrm{CNOT}$ with $\lvert\mathrm{blank}\rangle = \lvert 0\rangle$ exactly achieves $\mathrm{CNOT}\lvert 00\rangle = \lvert 00\rangle$ and $\mathrm{CNOT}\lvert 10\rangle = \lvert 11\rangle$ — covering only that specific orthogonal basis pair.

**Step 2: Three-qubit bit-flip repetition code and binary symplectic parity checks.**
Set $N = 3, p = 2$, and define the logical encoding isometry $V : \mathbb{C}^2 \to \mathbb{C}^8$ by $V\lvert 0\rangle = \lvert 000\rangle$ and $V\lvert 1\rangle = \lvert 111\rangle$, stabilized by

$$
g_1 = Z_1 Z_2 = Z \otimes Z \otimes I, \qquad g_2 = Z_2 Z_3 = I \otimes Z \otimes Z.
$$

In `PauliWord 3 2`, $g_1$ and $g_2$ have shift vector $x = (0, 0, 0)$ and binary $z$-check rows $z^{(1)} = (1, 1, 0)$ and $z^{(2)} = (0, 1, 1)$. For the four candidate bit-flip errors $E \in \{I, X_1, X_2, X_3\}$ with $z = (0, 0, 0)$ and binary $x$-vectors $(0,0,0), (1,0,0), (0,1,0), (0,0,1)$, the mod-$2$ dot products $(z^{(1)}\cdot x^{(E)}, z^{(2)}\cdot x^{(E)})$ from [@lemma-pauli-word-phase] uniquely identify each error:

| Error $E$ | Binary $x$-Vector $x^{(E)} \in (\mathrm{ZMod}\,2)^3$ | Mod-$2$ Parity $\bigl(z^{(1)}\cdot x^{(E)},\; z^{(2)}\cdot x^{(E)}\bigr)$ | Eigenvalue Syndrome $(g_1, g_2)$ | Shifted Basis Pair $\{E\lvert 000\rangle, E\lvert 111\rangle\}$ |
| :---: | :---: | :---: | :---: | :---: |
| $E_0 = I$ | $(0, 0, 0)$ | $(0, 0)$ | $(+1, +1)$ | $\{\lvert 000\rangle, \lvert 111\rangle\}$ |
| $E_1 = X_1$ | $(1, 0, 0)$ | $(1, 0)$ | $(-1, +1)$ | $\{\lvert 100\rangle, \lvert 011\rangle\}$ |
| $E_2 = X_2$ | $(0, 1, 0)$ | $(1, 1)$ | $(-1, -1)$ | $\{\lvert 010\rangle, \lvert 101\rangle\}$ |
| $E_3 = X_3$ | $(0, 0, 1)$ | $(0, 1)$ | $(+1, -1)$ | $\{\lvert 001\rangle, \lvert 110\rangle\}$ |

**Step 3: Local Bloch vectors of encoded states (special $\lvert +_L\rangle$ versus general $\alpha\lvert 0_L\rangle + \beta\lvert 1_L\rangle$).**
For the specific logical state $\lvert +_L\rangle = V\lvert +\rangle = \frac{\lvert 000\rangle + \lvert 111\rangle}{\sqrt{2}}$, all three single-qubit marginals equal $\frac{1}{2}I_2$, so $\vv{r}_1 = \vv{r}_2 = \vv{r}_3 = \vv{0}$. However, for a general logical state $\lvert\psi_L\rangle = \alpha\lvert 000\rangle + \beta\lvert 111\rangle$, the local $Z$ expectation is

$$
\langle Z_i\rangle_{\psi_L} = |\alpha|^2 - |\beta|^2 \qquad (i = 1, 2, 3),
$$

which is nonzero whenever $|\alpha| \neq |\beta|$! One must therefore never claim that "every stabilizer code drains every local Bloch direction on all logical states"; here $\langle Z_i\rangle$ can be nonzero because the three-qubit bit-flip code has $Z$-distance $1$ ($Z_1$ is already a logical $\bar{Z}$ operator). A sufficient condition is that the stabilizer code has **distance $d_{\mathrm{code}} \ge 2$ and no weight-$1$ element in the full stabilizer group $\mathcal{S}$**. The whole group, including products of generators, must be checked, not just the chosen generator list. Under these conditions every single-qubit Pauli operator $P_i \in \{X_i, Y_i, Z_i\}$ anticommutes with at least one generator $g \in \mathcal{S}$, forcing $P_{\mathcal{C}} P_i P_{\mathcal{C}} = 0$ and $\rho_i = \frac{1}{2}I_2$ for every logical state. Pure codes of distance at least $2$ satisfy these conditions, but purity is generally stronger and is not necessary; adding a fixed $\lvert 0\rangle$ ancilla instead puts $Z_i \in \mathcal{S}$, violating the absence of weight-$1$ elements.

**Step 4: Explicit $8\times 2$ verification of [@prop-orthogonal-syndrome-recovery] and phase-error boundary.**
Set $s = \mathrm{Fin}\,4$, $n = \mathrm{Fin}\,8$, $d = \mathrm{Fin}\,2$, and define the four $8\times 2$ syndrome embeddings $S_j = E_j V$ ($j \in \{0, 1, 2, 3\}$). Because the four shifted basis pairs in Step 2 partition the $8$ basis vectors of $\mathbb{C}^8$ into mutually orthogonal $2$-dimensional subspaces, $S_i^* S_j = V^* E_i^* E_j V = \delta_{ij} I_2$ (`OrthogonalSyndromes S`). Taking $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr)$ ($\Tr\sigma = 1$) and $\rho = \lvert +\rangle\langle +\rvert = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}$, [@prop-orthogonal-syndrome-recovery] gives

$$
\begin{aligned}
&\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) \\
&= \Bigl(\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{8}\Bigr)\begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix} = \rho.
\end{aligned}
$$

Note the scope of this code: it corrects only single $X$ bit-flip errors; a single phase flip $Z_1 = Z \otimes I \otimes I$ commutes with both $g_1$ and $g_2$ and acts as an undetected logical phase error $\bar{Z}\lvert +_L\rangle = \lvert -_L\rangle$, so this code does not correct arbitrary single-qubit noise (correcting arbitrary single-qubit errors requires at least the five-qubit code, or the seven-qubit Steane or nine-qubit Shor code; cf. [@rem-error-correction-anyons-literature]).
:::

::: {.viz src="syndrome-decoding" preset="two" height="500"}
**Flip two, and the lights point the wrong way.** In the logical state $\lvert 000\rangle$ the first and second qubits flip together (two magenta X's): only $g_2$ lights up, exactly as if the third qubit alone had flipped. The decoder follows the light and flips the third qubit back (amber); together that is $X_1X_2X_3$, a logical flip, and the cyan bar lands on $\lvert 111\rangle$ while the dashed outline stands on $\lvert 000\rangle$. This code corrects at most one $X$ flip.
:::

A phase flip fails in a different way: $Z_1$ commutes with both $g_1 = Z_1Z_2$ and $g_2 = Z_2Z_3$, so neither check lights up, yet $\lvert +_L\rangle$ has been turned into $\lvert -_L\rangle$.

::: {.viz src="syndrome-decoding" preset="phase" height="500"}
**Flip a phase: no light, yet the state has changed.** In the logical state $\lvert +_L\rangle$ the first qubit has its phase flipped (the magenta Z): $Z_1$ commutes with both $g_1$ and $g_2$, neither light goes on, the bars never leave the code space and the decoder does nothing; yet the cyan bar on $\lvert 111\rangle$ has flipped below the axis, exactly opposite the dashed outline, and the state has become the orthogonal $\lvert -_L\rangle$.
:::

::: {.remark #rem-error-correction-anyons-literature title="Knill–Laflamme Conditions, Stabilizer Codes, and Anyonic Braiding (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Beyond the frozen algebraic results of this chapter ([@thm-no-cloning-overlap], [@lemma-pauli-word-phase], [@prop-orthogonal-syndrome-recovery], and [@cor-braid-yang-baxter]), four foundational results from the quantum error-correction and topological physics literature should be noted:

1. **The Knill–Laflamme error-correction conditions** (E. Knill and R. Laflamme, *Theory of quantum error-correcting codes*, Phys. Rev. A **55**, 900–911, 1997, doi:10.1103/PhysRevA.55.900): A code projector $P_{\mathcal{C}} = V V^*$ admits exact CPTP recovery from a set of error operators $\{E_i\}$ if and only if $P_{\mathcal{C}} E_i^* E_j P_{\mathcal{C}} = \alpha_{ij} P_{\mathcal{C}}$ for a Hermitian matrix $\alpha_{ij}$ independent of the logical state. Diagonalizing $\alpha_{ij}$ yields the orthogonal-syndrome condition $S_i^* S_j = \delta_{ij} I_d$ of [@prop-orthogonal-syndrome-recovery] on the correctable subspace while ensuring that syndrome extraction leaks zero information about logical amplitudes.
2. **Stabilizer codes** (D. Gottesman, *Stabilizer Codes and Quantum Error Correction*, Caltech Ph.D. thesis, 1997, arXiv:quant-ph/9705052): An Abelian subgroup $\mathcal{S} \subset \mathcal{P}_N$ of cardinality $|\mathcal{S}| = 2^{N-k}$ generated by $N - k$ independent commuting Pauli operators and not containing $-I^{\otimes N}$ defines a $2^k$-dimensional code space $\mathcal{C}$ via its joint $+1$ eigenspace. Pauli errors anticommuting with at least one generator of $\mathcal{S}$ are diagnosed via the binary symplectic inner product; quotienting out the central scalar phase subgroup $\langle i I^{\otimes N}\rangle = \{\pm I^{\otimes N}, \pm i I^{\otimes N}\}$, operators in $N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ represent nontrivial logical classes in $N(\mathcal{S}) / (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ (excluding central scalar multiples such as $-I^{\otimes N}$ of weight $0$), and the code distance $d_{\mathrm{code}}$ is the minimum Pauli weight among all $E \in N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$.
3. **Configuration-space braid groups in 2D versus 3D** (J. M. Leinaas and J. Myrheim, *On the theory of identical particles*, Nuovo Cimento B **37**, 1–23, 1977, doi:10.1007/BF02727953): For $n$ indistinguishable non-colliding point particles in $\mathbb{R}^d$, the fundamental group of configuration space is the symmetric group $S_n$ for $d \ge 3$ (whose one-dimensional unitary exchange representations allow only the bosonic $+1$ or fermionic $-1$ exchange sign), and the Artin braid group $B_n$ for $d = 2$.
4. **Non-Abelian anyons and physical limits of topological protection** (C. Nayak, S. H. Simon, A. Stern, M. Freedman, and S. Das Sarma, *Non-Abelian anyons and topological quantum computation*, Rev. Mod. Phys. **80**, 1083–1159, 2008, doi:10.1103/RevModPhys.80.1083): In gapped 2D topological phases, braiding non-Abelian anyons induces unitary transformations on degenerate fusion spaces protected against local perturbations up to exponentially small splitting $\propto e^{-L/\xi}$. This gate regime requires well-separated anyons, motion adiabatic relative to the bulk gap, and an operation duration that does not resolve the residual energy splitting at finite separation. As emphasized in the text, the triviality of point-particle double exchange in $\mathbb{R}^3$ does not mean closed $1$-dimensional knots in $\mathbb{R}^3$ untie themselves, nor does topological protection imply strictly zero error in finite-temperature hardware subject to thermally excited quasiparticles.
:::

::: {.viz src="syndrome-decoding" height="560"}
The full syndrome-decoding lab: click qubits on the stage to add $X$ or $Z$ errors and watch which of the two checks light up, which qubit the decoder flips back, and whether the bars land back on the dashed outline; you can also change the logical state or switch to the four-branch mixture $\sigma$.
:::

With our logical states shielded inside higher-dimensional error-correcting subspaces, we are ready to put those fault-tolerant registers to work. **How do flagship quantum algorithms harness invariant-plane rotations and Fourier phase gears to find targets and hidden periods across exponentially large state spaces?** Let us proceed to [Chapter 15](ch15-grover-qft-and-period-finding.md).
