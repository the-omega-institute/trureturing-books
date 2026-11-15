# 14.1 No Cloning: Preserving an Overlap and Squaring It {#sec-no-cloning-overlap}

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

::: {.remark #rem-buzek-hillery-isometry-literature title="The Bužek–Hillery Universal 1→2 Cloning Isometry and the External Formalization of Optimality"}
**Literature result, not formalized in this book.** Bužek and Hillery (1996) constructed a $1 \to 2$ cloning machine that treats every input alike (with single-copy optimality proved by Gisin and Massar, 1997; see [@ex-buzek-hillery-three-marginals] for citations). It uses three qubits: the input, a blank copy, and an auxiliary "machine" qubit $M$. For a unit vector $\psi$, let $\psi^\perp$ be a unit vector orthogonal to it; the cloning isometry sends the input to

$$
\lvert\psi\rangle \;\longmapsto\; \sqrt{\tfrac{2}{3}}\;\lvert\psi\rangle\lvert\psi\rangle\lvert\psi^\perp\rangle_M \;-\; \sqrt{\tfrac{1}{3}}\;\frac{\lvert\psi\rangle\lvert\psi^\perp\rangle + \lvert\psi^\perp\rangle\lvert\psi\rangle}{\sqrt{2}}\;\lvert\psi\rangle_M ,
$$

where the three factors are clone one, clone two, and the machine qubit. Tracing out the two clones leaves the machine qubit in $\frac{1}{3}\lvert\psi\rangle\langle\psi\rvert + \frac{2}{3}\lvert\psi^\perp\rangle\langle\psi^\perp\rvert$.

**External formal source for the universal $5/6$ bound.** JD Jones's [fixed version of qubit-cloning-lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/tree/f619a52e67849f80205127e3ba7877f7f7658e50), under the MIT license, supplies an external Lean proof of this optimality. In its [Defs.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Defs.lean), a channel is represented by any finite family of complex $4\times2$ Kraus matrices:

$$
\begin{aligned}
\mathcal{E}_K(\rho)&=\sum_{i=0}^{r-1}K_i\rho K_i^*,\\
\sum_{i=0}^{r-1}K_i^*K_i&=I_2.
\end{aligned}
$$

The second equation is the trace-preservation condition `IsChannel K`; complete positivity is built into the Kraus form. Neither symmetry between the outputs nor rotational covariance is assumed. For each unit input $\psi\in\mathbb{C}^2$, set $P_\psi=\lvert\psi\rangle\langle\psi\rvert$, $\rho_1=\Tr_2\mathcal{E}_K(P_\psi)$, and $\rho_2=\Tr_1\mathcal{E}_K(P_\psi)$. The source defines the two fidelities as

$$
\begin{aligned}
F_j(K,\psi)&=\operatorname{Re}\Tr(P_\psi\rho_j)\\
&=\langle\psi\rvert\rho_j\lvert\psi\rangle,\qquad j=1,2.
\end{aligned}
$$

This is pure-state overlap, the **squared-fidelity convention**. Under the convention that takes its square root, the corresponding value is $\sqrt{5/6}$.

Take the six Pauli eigenstate inputs $\mathcal{S}=\{\lvert0\rangle,\lvert1\rangle,\lvert+\rangle,\lvert-\rangle,\lvert+i\rangle,\lvert-i\rangle\}$, where $\lvert\pm\rangle=(\lvert0\rangle\pm\lvert1\rangle)/\sqrt2$ and $\lvert\pm i\rangle=(\lvert0\rangle\pm i\lvert1\rangle)/\sqrt2$, and write $A_j(K)=\frac16\sum_{\psi\in\mathcal{S}}F_j(K,\psi)$. The statement `sixAvg_le_internal` in [Form.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Form.lean) is

$$
\begin{aligned}
\frac{A_1(K)+A_2(K)}{2}
&=\frac1{12}\sum_{\psi\in\mathcal{S}}\bigl(F_1(K,\psi)+F_2(K,\psi)\bigr)\\
&\le\frac56.
\end{aligned}
$$

This mean includes both clones, twelve numbers in all. Its algebraic mechanism is a sum-of-squares certificate. In output basis order $00,01,10,11$, write

$$
K_i=\begin{pmatrix}a_i&b_i\\c_i&d_i\\e_i&f_i\\g_i&h_i\end{pmatrix}.
$$

Summing the source's identity `form_sos` over the Kraus operators gives

$$
\begin{aligned}
q_i={}&|a_i-d_i-f_i|^2+2|c_i-h_i/2|^2\\
&+2|e_i-h_i/2|^2+3|g_i|^2\\
&+3|b_i|^2+|d_i-f_i|^2\ge0,\\
6(A_1+A_2)&=5\sum_i\norm{K_i}_{\mathrm F}^2-\sum_iq_i.
\end{aligned}
$$

Here $\norm{K_i}_{\mathrm F}^2$ is the sum of the squared moduli of all matrix entries. Taking the trace of the channel normalization gives $\sum_i\norm{K_i}_{\mathrm F}^2=\Tr I_2=2$. Hence $6(A_1+A_2)\le10$; dividing by $12$ yields the bound.

The same file's `exists_unit_min_le_internal` therefore gives the precise worst-case conclusion: **for every finite-Kraus trace-preserving channel above, there is a unit pure input** such that

$$
\min\{F_1(K,\psi),F_2(K,\psi)\}\le\frac56.
$$

The finite mean explains the implication directly. If both fidelities were strictly above $5/6$ on every unit input, all twelve numbers on the six Pauli inputs would be strictly above $5/6$, contradicting the mean bound. This restricts the quality that both clones can **jointly guarantee** on all pure inputs. It does not impose a separate pointwise $5/6$ upper bound on each clone of an asymmetric device, and it asserts no identity for a Haar average over the sphere.

The statement `isGreatest_cloning_fidelity_internal` in [Unique.lean](https://github.com/JD-Jones-ASES/qubit-cloning-lean/blob/f619a52e67849f80205127e3ba7877f7f7658e50/QubitCloning/Unique.lean) also includes attainability. Among all real $t$ for which some finite-Kraus trace-preserving channel satisfies both $t\le F_1$ and $t\le F_2$ on every unit input, $5/6$ is the greatest element. Its construction supplies a two-operator Bužek–Hillery channel with $F_1=F_2=5/6$ for every unit input. Thus $5/6$ is an attained common guarantee as well as an upper bound.

**Verification boundary.** The external source uses Lean `4.35.0-rc2` and mathlib [`06535612`](https://github.com/leanprover-community/mathlib4/tree/065356127b1dc0016f66b7283ce0ce2c4055aa55); the trureturing version pinned by this book uses Lean `4.35.0` and mathlib [`56a00585`](https://github.com/leanprover-community/mathlib4/tree/56a005855ea17e0b0958f73ec801ae140b0a1679). The external proof has not been ported, compiled, or frozen in that trureturing version. This passage cites its exact statements and proof source; it does not claim independent kernel verification with this book's toolchain. The local formal scope of [@thm-cloning-machine-spectrum] below remains the spectrum and entropy of the defined machine reduced state. The literature accounts of the cloning isometry and its three marginals retain their respective scope boundaries.
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
