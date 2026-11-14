# Chapter 3 Existence as an Idempotent Line ($P^2 = P$): Particles, Concepts, and the Classical Time Axis

> *"Even the concept of 'quantum' is a particle, and even the concept of 'existence' is a particle."*

Across the first two chapters we saw that a solitary monad cannot define a direction and two states need no external reference point $C$ to compare themselves; meanwhile, **sharp orthogonal projectors** $P$ (whose relation to general POVM effects is recorded in [Chapter 2](ch02-born-rule.md), [@rem-povm-effect-converse-literature]) guarantee real probabilities $\Tr(\rho P) \in [0, 1]$ in [@thm-born-probability-skeleton] through a single core algebraic law — **self-adjoint idempotence**:

$$
P^* = P, \qquad P^2 = P.
$$

This chapter uses the Lüders state update: for an outcome of nonzero weight, the conditional state is $P_k\rho P_k/\Tr(\rho P_k)$. With no intervening evolution, this update guarantees immediate confirmation of the same outcome; effects alone do not specify the post-measurement state.

Linear-algebra textbooks routinely treat $P^2 = P$ as a dry technical definition ("a matrix whose eigenvalues are $0$ and $1$"). Yet in the genealogical interpretation developed in this book, examining the operational structure of "being," "substance," "logical concepts," and "sequential classical records" brings an illuminating thread into focus: **across these seemingly disparate classical categories runs the shared algebraic signature $P^2 = P$.**

::: {.figure src="ch03-overview"}
**Figure 3.** The chapter at a glance. Panel I: the amber arrow $x$ is projected onto the cyan measurement line, leaving the cyan shadow $Px$, and projecting again leaves the shadow where it is. Panel II: the cyan axis $\vv{e}_3$ stands in the middle of the magenta dual plane $\star\vv{e}_3 = \vv{e}_1 \wedge \vv{e}_2$, and the amber arrow splits into a cyan part along the axis and a magenta part lying in the plane. Panel III: polarizers at $0^\circ$, $45^\circ$ and $90^\circ$ stand along a timeline; normalize the beam after the first preparing polarizer to $1$; each of the next two contributes $\frac{1}{2}$, giving $1$, $\frac{1}{2}$, $\frac{1}{4}$, and it is $0$ without the $45^\circ$ one.
:::

## 3.1 Why Even "Existence" Itself Is a Particle {#sec-ch03-1}

Ask a deceptively simple operational question: **what does it actually take for something to count as an existing thing?**

Imagine an ocean of continuously turning phases. If you point at a region and declare, "Here is an electron," or "Here is a white cat," yet a microsecond later an identical check under the exact same criterion yields something altogether unrelated — if the phenomenon cannot survive a second look and confirm itself upon immediate re-examination — human language cannot coin a noun for it, and physics cannot register it as a "particle."

In modern logical notation, the **law of identity** is written $A = A$. In 1854, George Boole founded symbolic logic on the algebraic equation $x^2 = x$: selecting "all cats" twice in succession ("all cats among all cats") isolates the exact same class as selecting once. In 1932, John von Neumann identified every sharp physical proposition in quantum mechanics with an orthogonal projection operator $P^2 = P$.

In the geometric interpretation of this book, these three insights share **one and the same idempotent operational structure**. On a smooth isotropic sphere there are no pre-cut "particles" or pre-drawn conceptual fences. When a measurement apparatus selects a one-dimensional discrimination axis $P$ through the sphere, whatever component $Px$ passes the slit on the first check is guaranteed to pass a second identical check unchanged — $P(Px) = P^2 x = Px$! From this interpretive standpoint, **a "particle" may be understood as a stable fixed point condensed out of continuous geometry by an idempotent projection; even the operational concept of "existence" itself (Latin *ex-sistere*, "to stand out") corresponds geometrically to an idempotent discrimination line $P^2 = P$.**

> To name chaos is to drive a stake $P^2 = P$ into the sphere; "substance" is whatever survives being measured twice by the same rod without flinching.

::: {.viz src="repeated-projection" preset="twice" height="500"}
**Project again, and nothing moves.** At the first press the amber arrow drops onto the cyan measurement line and the magenta part vanishes; at the second and third presses the arrow stays put: of the moves listed press by press at the top left, the first is not zero and the other two are 0. A press here is a measurement along the line whose result is not read, so "a second press changes nothing" is exactly [@thm-pinching-idempotent].
:::

In an actual laboratory apparatus we rarely erect a single ray in isolation; instead we partition the space into a mutually exclusive, exhaustive family of orthogonal readout ports $\{P_k\}_{k \in \kappa}$ (such as the upper and lower beams of a Stern–Gerlach magnet or a multi-port polarizing splitter). In the Lean module `Observer/Conditioning`, this complete ruler is formalized as a **record measurement**.

::: {.definition #def-record-measurement title="Finite Complete Orthogonal Record Measurement and Unread State" lean="D5/S3/Observer/Conditioning.IsRecordMeasurement"}
Let $n$ and $\kappa$ be finite index types (with decidable equality on $n$). A family of complex square matrices $P : \kappa \to M_n(\mathbb{C})$ is a **record measurement** (`IsRecordMeasurement P` in Lean) if it satisfies four axioms:

1. **Branchwise self-adjointness**: for all $k \in \kappa$, $P_k^* = P_k$;
2. **Branchwise idempotence**: for all $k \in \kappa$, $P_k^2 = P_k$;
3. **Pairwise orthogonality**: for all $k, l \in \kappa$ with $k \neq l$, $P_k P_l = 0$;
4. **Completeness**: $\sum_{k \in \kappa} P_k = I$.

For any matrix $\rho \in M_n(\mathbb{C})$, the **unread state** ([`unreadState`](lean:D5/S3/Observer/Conditioning.unreadState), also called Lüders pinching) obtained by performing the measurement and discarding the outcome label is

$$
\operatorname{unreadState}(P, \rho) = \sum_{k \in \kappa} P_k \rho P_k.
$$
:::

Pause here to clarify a pair of matrix equations beginners often conflate: how does an **involution** $M^2 = I$ (such as the Pauli shutters $X^2 = I$ and $Z^2 = I$ of [Chapter 1](ch01-measurement.md), [@lem-qubit-weyl-star]) relate to an **idempotent projection** $P^2 = P$? Geometrically, a self-adjoint involution ($M^* = M$, $M^2 = I$) is a **two-sided lossless mirror** (eigenvalues $+1$ and $-1$, a reversible unitary gate), whereas a self-adjoint idempotent ($P^* = P$, $P^2 = P$) is a **one-way sorting slit** (eigenvalues $1$ and $0$, an irreversible line of existence). An elementary affine bridge translates directly between the two:

$$
P_\pm = \frac{1}{2}(I \pm M) \qquad\Longleftrightarrow\qquad M = P_+ - P_-,\quad I = P_+ + P_-.
$$

Check it in one line: whenever $M^* = M$ and $M^2 = I$,

$$
P_\pm^2 = \frac{1}{4}(I \pm 2M + M^2) = \frac{1}{4}(2I \pm 2M) = P_\pm, \qquad P_+ P_- = \frac{1}{4}(I - M^2) = 0!
$$

Every binary observable $M$ (such as $X$ or $Z$) is simply the signed difference of two back-to-back orthogonal idempotent lines $\{P_+, P_-\}$ forming an `IsRecordMeasurement`!

::: {.figure src="ch03-mirror-and-slit"}
**The projection is the midpoint between an arrow and its mirror image.** The mirror $M$ flips the amber arrow $x$ to the other side of the mirror line, giving the dashed arrow $Mx$, and a second flip brings it back ($M^2 = I$). The dotted segment joining the two tips crosses the mirror line at the cyan point: the thick cyan segment from the origin to it is $P_+x = \frac{1}{2}(x + Mx)$, and the magenta segment from it to the tip of $x$ is $P_-x = \frac{1}{2}(x - Mx)$. The slit $P_+$ keeps only the cyan half. Here $M$ is the reflection $Z$ of the real plane.
:::

Once each branch satisfies $P_k^2 = P_k$ and distinct branches annihilate one another ($P_k P_l = 0$), idempotence automatically lifts from the operator level to the **superoperator** level on density matrices: pinching a quantum state through an unread measurement channel twice is identical to pinching it once!

::: {.theorem #thm-pinching-idempotent title="Functional Idempotence of Finite Record Pinching" lean="D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent"}
Let $n$ and $\kappa$ be finite index types (with decidable equality on $n$), and let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`. Viewed as an endomorphism of $M_n(\mathbb{C})$, the unread-state map is idempotent under function composition:

$$
\operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P).
$$
:::

::: proof
For any $\rho \in M_n(\mathbb{C})$, evaluate the left product $P_k \cdot \operatorname{unreadState}(P, \rho) = \sum_{l \in \kappa} P_k P_l \rho P_l$. By pairwise orthogonality in [@def-record-measurement], every cross-term $l \neq k$ vanishes via $P_k P_l = 0$; only $l = k$ survives, simplifying via $P_k^2 = P_k$ to $P_k \rho P_k$. Multiplying on the right by $P_k$ and using $P_k^2 = P_k$ a second time gives

$$
P_k\,\operatorname{unreadState}(P, \rho)\,P_k = (P_k \rho P_k) P_k = P_k \rho P_k^2 = P_k \rho P_k.
$$

Summing over all $k \in \kappa$ shows $\operatorname{unreadState}(P, \operatorname{unreadState}(P, \rho)) = \operatorname{unreadState}(P, \rho)$ for every $\rho$, establishing the composition identity by function extensionality. The full proof is checked by the Lean kernel.
:::

Which states $\rho$ pass through this pinching sieve completely unscathed ($\operatorname{unreadState}(P, \rho) = \rho$), with no coherence between branches of the record $P$? The next theorem provides an exact block-diagonal characterization.

::: {.theorem #thm-unread-fixed-iff title="Block-Diagonal Criterion for Fixed Points of the Unread State" lean="D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
Let $n$ and $\kappa$ be finite index types (with decidable equality on $n$), let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`, and let $\rho \in M_n(\mathbb{C})$. Then $\rho$ is fixed by the unread-state map if and only if all off-diagonal coherence blocks between distinct branches vanish:

$$
\operatorname{unreadState}(P, \rho) = \rho \quad\Longleftrightarrow\quad \forall k, l \in \kappa,\; k \neq l \implies P_k \rho P_l = 0.
$$
:::

::: proof
**($\Rightarrow$)**: Suppose $\rho = \operatorname{unreadState}(P, \rho)$. For any $k \neq l$, left-multiplying by $P_k$ yields $P_k \rho = P_k \rho P_k$ as in the proof of [@thm-pinching-idempotent]; right-multiplying by $P_l$ and applying orthogonality $P_k P_l = 0$ immediately gives $P_k \rho P_l = P_k \rho(P_k P_l) = 0$.

**($\Leftarrow$)**: Conversely, assume $P_k \rho P_l = 0$ whenever $k \neq l$. Using completeness $I = \sum_{l \in \kappa} P_l$, expand $P_k \rho = P_k \rho I = \sum_{l \in \kappa} P_k \rho P_l$; every $l \neq k$ term vanishes, leaving $P_k \rho = P_k \rho P_k$. Summing over $k \in \kappa$ and invoking completeness once more yields

$$
\operatorname{unreadState}(P, \rho) = \sum_{k \in \kappa} P_k \rho P_k = \sum_{k \in \kappa} P_k \rho = \Bigl(\sum_{k \in \kappa} P_k\Bigr)\rho = \rho.
$$

The full proof is checked by the Lean kernel.
:::

[@thm-unread-fixed-iff] shows how a classical record emerges from quantum geometry: once a record measurement $P$ is chosen, the fixed points have no inter-branch coherence, $P_k \rho P_l = 0$ ($k \neq l$). The branch labels go into a classical ledger without interference, but a branch of rank greater than one can still retain internal quantum coherence. Refining the record to rank-one projections makes the unread state fully diagonal in the corresponding basis, leaving only classical probabilities.

::: {.viz src="repeated-projection" preset="fixed" height="500"}
**Already on the line, so nothing to move.** The amber arrow lies on the tilted cyan line and has no magenta part; two presses, and it never moves. A single qubit has two branches, and the size of the cross-branch block $P_+\rho P_-$ is exactly half the length of the magenta part, so "no magenta" and "a fixed point" are one and the same ([@thm-unread-fixed-iff]).
:::

A record measurement cuts a $d$-dimensional space into non-interfering channels. Turn the question around: how many records can a $d$-dimensional system hold if each must be read back **without any error**? If one is allowed to encode in non-orthogonal states, and to read out by something more general than a projective measurement, could three or four records be squeezed into one qubit? The module `D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity` at the pinned commit answers no, under generous hypotheses: the records may be mixed states and the readout may be any family of positive semidefinite matrices summing to the identity.

::: {.proposition #prop-record-capacity title="A d-Dimensional System Holds at Most d Perfectly Readable Records" lean="D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity"}
Let $N, d$ be natural numbers and let $\rho_0, \dots, \rho_{N-1}$ and $E_0, \dots, E_{N-1}$ be $d \times d$ complex matrices. If

1. every $\rho_i$ is positive semidefinite with $\Tr(\rho_i) = 1$;
2. every $E_j$ is positive semidefinite, and $\sum_{j} E_j = 1$;
3. for all $i, j$, $\Tr(E_j\,\rho_i) = 1$ when $i = j$ and $\Tr(E_j\,\rho_i) = 0$ when $i \neq j$;

then $N \le d$.
:::

::: proof
By hypothesis 2 every $E_i$ lies between $0$ and $1$. From $\Tr(E_i\rho_i) = 1 = \Tr(\rho_i)$ one gets $\Tr\bigl((1 - E_i)\rho_i\bigr) = 0$; when the trace of a product of two positive semidefinite matrices vanishes the product itself vanishes, so the range of $\rho_i$ lies in the kernel of $1 - E_i$, that is, $E_i$ acts as the identity on it. Likewise, for $i \neq j$, $\Tr(E_i\rho_j) = 0$ puts the range of $\rho_j$ inside the kernel of $E_i$. Each $\rho_i$ has trace $1$ and is therefore nonzero, so its range contains a nonzero vector $v_i$. Then $E_i v_i = v_i$ and $E_i v_j = 0$ for $j \neq i$, and since $E_i$ is Hermitian, $\langle v_i, v_j\rangle = \langle E_i v_i, v_j\rangle = \langle v_i, E_i v_j\rangle = 0$. Pairwise orthogonal nonzero vectors are linearly independent, so there are at most $d$ of them. The full proof is checked by the Lean kernel.
:::

Relaxing hypothesis 3 yields a quantitative version (a manual derivation, not formalized in this book). For any $\rho_i$ and $E_j$ satisfying hypotheses 1 and 2, $\rho_i \le 1$ and $E_i \ge 0$ give $\Tr(E_i\rho_i) \le \Tr(E_i)$; summing over $i$,

$$
\sum_{i=0}^{N-1} \Tr(E_i\,\rho_i) \;\le\; \Tr\Bigl(\sum_{i} E_i\Bigr) \;=\; \Tr(1) \;=\; d .
$$

If the $N$ records are equally likely, the average probability $\frac{1}{N}\sum_i \Tr(E_i\rho_i)$ of reading correctly is at most $\frac{d}{N}$. [@prop-record-capacity] is the special case in which every record is read correctly: the left-hand side must equal $N$, hence $N \le d$.

::: {.example #ex-trine-record-capacity title="Three Records in One Qubit: at Most Two Thirds Read Correctly"}
Place three pure-state records in one qubit ($d = 2$), with Bloch vectors $120^\circ$ apart on a common great circle. For $k = 0, 1, 2$ take

$$
\lvert\psi_k\rangle = \cos\frac{k\pi}{3}\,\lvert 0\rangle + \sin\frac{k\pi}{3}\,\lvert 1\rangle .
$$

By the half-angle formula of [Chapter 2](ch02-born-rule.md), a Bloch angle of $120^\circ$ corresponds to $\lvert\langle\psi_j\mid\psi_k\rangle\rvert^2 = \cos^2 60^\circ = \frac{1}{4}$ for $j \neq k$. Since $N = 3 > d = 2$, [@prop-record-capacity] says that no readout separates the three perfectly.

**A concrete readout.** Take $E_k = \frac{2}{3}\lvert\psi_k\rangle\langle\psi_k\rvert$. The three projectors add up to

$$
\sum_{k=0}^{2} \lvert\psi_k\rangle\langle\psi_k\rvert
= \begin{pmatrix} 1 + \frac{1}{4} + \frac{1}{4} & 0 + \frac{\sqrt{3}}{4} - \frac{\sqrt{3}}{4} \\ 0 + \frac{\sqrt{3}}{4} - \frac{\sqrt{3}}{4} & 0 + \frac{3}{4} + \frac{3}{4} \end{pmatrix}
= \frac{3}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix},
$$

so $\sum_k E_k = 1$ and hypothesis 2 holds. The readout table is

$$
\Tr\bigl(E_j\,\lvert\psi_k\rangle\langle\psi_k\rvert\bigr) = \frac{2}{3}\,\lvert\langle\psi_j\mid\psi_k\rangle\rvert^2 ,
$$

which equals $\frac{2}{3}$ for $j = k$ and $\frac{2}{3}\cdot\frac{1}{4} = \frac{1}{6}$ for $j \neq k$; each row sums to $\frac{2}{3} + \frac{1}{6} + \frac{1}{6} = 1$. The probability of reading correctly is $\frac{2}{3}$.

**This is already optimal.** The quantitative bound above caps the average probability of reading correctly at $\frac{d}{N} = \frac{2}{3}$, and this readout attains it. Two records out of three is the literal meaning of "two dimensions shared among three records".

| Records $N$ | Dimension $d$ | Bound $d/N$ on average success | All read correctly? |
| :---: | :---: | :---: | :---: |
| $2$ | $2$ | $1$ | yes (take two orthogonal records) |
| $3$ | $2$ | $\frac{2}{3}$ | no |
| $4$ | $2$ | $\frac{1}{2}$ | no |
| $8$ | $8$ (three qubits) | $1$ | yes |
| $9$ | $8$ | $\frac{8}{9}$ | no |
:::

::: {.figure src="ch03-trine-records"}
**Two dimensions shared among three records: at best two thirds read correctly.** On the left, three cyan arrows $\psi_0, \psi_1, \psi_2$ lie on one great circle of the Bloch sphere, $120^\circ$ apart; on the right is the table of readings of $E_k = \frac{2}{3}\lvert\psi_k\rangle\langle\psi_k\rvert$, each square's area following the reading: $\frac{2}{3}$ on the three diagonal cells and $\frac{1}{6}$ on the other six. With $N = 3 > d = 2$ the records cannot all be read correctly ([@prop-record-capacity]); the bound $d/N$ is the text's hand derivation, not formalized in this book.
:::

The state space of a qubit is a whole sphere, with a continuum of points on it; yet only two of them at a time can serve as records that are read back without error. An "existence line" may point in any direction, but the number of slots in the ledger is set by the dimension.

## 3.2 The Inseparable Fate of Line and Plane (Hodge Duality) {#sec-ch03-2}

Yet driving a one-dimensional idempotent axis into a three-dimensional sphere carries an immediate geometric consequence: it automatically singles out an inseparable twin.

Hold up your right hand in three-dimensional Euclidean space $\mathbb{R}^3$ (equipped with unit volume trivector $I_3 = \vv{e}_1 \wedge \vv{e}_2 \wedge \vv{e}_3$) and point your thumb upward along the measurement axis $\vv{e}_3$. Without uttering a word about horizontal directions, your curled fingers have already swept out the unique **two-dimensional equatorial plane** $\vv{e}_1 \wedge \vv{e}_2$ orthogonal to $\vv{e}_3$!

In differential geometry and Clifford exterior algebra, this canonical pairing between $k$-dimensional subspaces and $(d - k)$-dimensional orthogonal complements inside $d$-dimensional space is **Hodge duality** ($\star$). In $\mathbb{R}^3$, the Hodge dual of every one-dimensional line is an oriented two-dimensional plane, and vice versa:

$$
\star\vv{e}_1 = \vv{e}_2 \wedge \vv{e}_3, \qquad \star\vv{e}_2 = \vv{e}_3 \wedge \vv{e}_1, \qquad \star\vv{e}_3 = \vv{e}_1 \wedge \vv{e}_2.
$$

Stripped of century-old mystification, **wave–particle duality** is simply Hodge duality on the sphere:

- When your apparatus locks onto a one-dimensional normal axis $\vv{e}_3$ to extract idempotent clicks, what registers along the line is discrete **particle** bias ($r_z$);
- What lies hidden in the orthogonal complement of that slit is the entire two-dimensional equatorial plane $\vv{e}_1 \wedge \vv{e}_2 = \star\vv{e}_3$, where continuous phase rotation $\phi$ and the squared transverse coherence length $r_x^2 + r_y^2$ (the squared fringe visibility below) — **wave** behavior — reside!

Without erecting the particle line, no orthogonal wave plane is defined; once the particle line is erected, the wave plane automatically retreats into its orthogonal blind spot $V^\perp$. Better still, in any complete inner-product space, the visible particle deviation along $V$ and the invisible wave coherence in $V^\perp$ obey an exact **Pythagorean conservation law**. In the Lean module `ComplementaryContextProbabilityPythagoras`, the squared norm in the orthogonal complement of a closed subspace $V \subseteq E$ is defined as [`residualMass`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.residualMass): $\operatorname{residualMass}(V, s) = \norm{P_{V^\perp}(s)}^2$.

::: {.theorem #thm-complementary-pythagoras title="Pythagorean Decomposition of Complementary Context Probabilities and Residual Mass" lean="D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras"}
Let $d$ be a nonempty finite dimension index type (of cardinality $|d|$), $L$ a finite context index type, $E$ a complete real inner-product space, and $V \subseteq E$ a closed real linear subspace (with orthogonal projections $P_V$ onto $V$ and $P_{V^\perp}$ onto $V^\perp$). For a matrix $\rho \in M_d(\mathbb{C})$, a state vector $s \in E$, and a probability table $p : L \to d \to \mathbb{R}$, suppose:

1. **Purity excess representation**: $\operatorname{Re}\Tr(\rho^2) - |d|^{-1} = \norm{s}^2$;
2. **Visible coordinate calibration**: $\norm{P_V(s)}^2 = \sum_{l \in L} \sum_{j \in d} \bigl(p_{l,j} - |d|^{-1}\bigr)^2$.

Then the purity excess splits orthogonally into the total squared probability deviation on the visible contexts plus the complementary residual mass:

$$
\operatorname{Re}\Tr(\rho^2) - |d|^{-1} = \sum_{l \in L} \sum_{j \in d} \bigl(p_{l,j} - |d|^{-1}\bigr)^2 + \operatorname{residualMass}(V, s).
$$
:::

::: proof
Applying the Hilbert-space orthogonal projection theorem (`Submodule.norm_sq_eq_add_norm_sq_starProjection` in Mathlib) to the closed subspace $V \subseteq E$ decomposes $\norm{s}^2$ into

$$
\norm{s}^2 = \norm{P_V(s)}^2 + \norm{P_{V^\perp}(s)}^2.
$$

Substituting hypothesis 1 on the left and hypothesis 2 together with $\operatorname{residualMass}(V, s) = \norm{P_{V^\perp}(s)}^2$ on the right yields the identity immediately. The full proof is checked by the Lean kernel.
:::

Instantiate [@thm-complementary-pythagoras] on a single qubit ($|d| = 2$) with Bloch vector $\vv{r} = (r_x, r_y, r_z) \in \mathbb{R}^3$ and watch wave–particle complementarity become elementary geometry!

For $\rho_{\vv{r}} = \frac{1}{2}(I + B(\vv{r}))$, the trace computation of [Chapter 2](ch02-born-rule.md) ([@ex-bloch-half-angle] with $\vv{a} = \vv{b} = \vv{r}$) gives $\Tr(\rho_{\vv{r}}^2) = \frac{1 + \norm{\vv{r}}^2}{2}$, so the **purity excess** on the left-hand side is

$$
\Tr(\rho_{\vv{r}}^2) - \frac{1}{2} = \frac{1}{2}\norm{\vv{r}}^2 = \frac{1}{2}\bigl(r_x^2 + r_y^2 + r_z^2\bigr),
$$

represented in $E = \mathbb{R}^3$ by $s = \frac{1}{\sqrt{2}}(r_x, r_y, r_z)$. Now commit to a **single measurement context** ($|L| = 1$) along the vertical axis $\vv{e}_3$ ($V = \operatorname{span}\{\vv{e}_3\}$). Its two Born probabilities are $p_0 = \frac{1 + r_z}{2}$ and $p_1 = \frac{1 - r_z}{2}$, whose squared deviations from the uniform baseline $\frac{1}{2}$ sum to

$$
\Bigl(p_0 - \frac{1}{2}\Bigr)^2 + \Bigl(p_1 - \frac{1}{2}\Bigr)^2 = \Bigl(\frac{r_z}{2}\Bigr)^2 + \Bigl(-\frac{r_z}{2}\Bigr)^2 = \frac{1}{2}r_z^2 = \norm{P_V(s)}^2!
$$

And what sits in the orthogonal complement $\operatorname{residualMass}(V, s)$? Precisely the equatorial coherence mass in the Hodge-dual plane $V^\perp = \operatorname{span}\{\vv{e}_1, \vv{e}_2\} = \star\vv{e}_3$:

$$
\operatorname{residualMass}(V, s) = \frac{1}{2}\bigl(r_x^2 + r_y^2\bigr)!
$$

On the pure shell $\norm{\vv{r}}^2 = 1$, $r_z^2 + (r_x^2 + r_y^2) = 1$: the sharper the particle bias $|r_z| \to 1$ along the chosen line, the smaller the wave interference $r_x^2 + r_y^2$ left in the equatorial plane, and conversely.

::: {.viz src="repeated-projection" preset="perp" height="500"}
**Lying in the dual plane, no shadow on the line.** The grey dashed arrow, before the press, lies entirely in the magenta equatorial dual plane and casts no shadow on the cyan measurement line Z; one press shrinks the amber arrow to a point at the centre, with line and plane both $0$.
:::

**Wave and particle never contradict one another; they are the two orthogonal legs cut from a single unit hypotenuse by an axis $V$ and its Hodge dual $\star V$.**

::: {.viz src="repeated-projection" preset="sum" height="500"}
**One part on the line, one in the plane.** The cyan shadow lies on the measurement line Z and the magenta part lies in the equatorial dual plane; they are perpendicular and together rebuild the amber arrow, and at the top left line² + plane² equals the arrow's length squared. Halve both sides and you have the single-qubit ledger of [@thm-complementary-pythagoras].
:::

Translate this single-qubit Pythagorean split into the language of a Mach–Zehnder interferometer, and you obtain at one stroke the celebrated **quantitative path-predictability / fringe-visibility law** of quantum optics:

- Define the *a priori* which-way path predictability between the two arms as $D_{\mathrm{pred}} = |p_0 - p_1| = |r_z|$;
- Recombine the two arms while sweeping a relative phase $\varphi \in [0, 2\pi)$ (probing along the equatorial axis $\vv{n}_\varphi = (\cos\varphi, \sin\varphi, 0)$ with output intensity $I(\varphi) = \frac{1 + r_x\cos\varphi + r_y\sin\varphi}{2}$), and read off the interference fringe visibility $V_{\mathrm{vis}} = \frac{I_{\max} - I_{\min}}{I_{\max} + I_{\min}} = \sqrt{r_x^2 + r_y^2}$.

Multiplying both sides of [@thm-complementary-pythagoras] by $2$ yields an exact identity valid for every pure or mixed single-qubit state:

$$
D_{\mathrm{pred}}^2 + V_{\mathrm{vis}}^2 = r_z^2 + \bigl(r_x^2 + r_y^2\bigr) = \norm{\vv{r}}^2 = 2\Tr(\rho_{\vv{r}}^2) - 1 \le 1!
$$

Equality $D_{\mathrm{pred}}^2 + V_{\mathrm{vis}}^2 = 1$ holds if and only if the state lies on the pure spherical shell ($\norm{\vv{r}} = 1$): demanding $D_{\mathrm{pred}} = 0.8$ of particle path bias geometrically caps wave fringe contrast at $V_{\mathrm{vis}} = \sqrt{1 - 0.8^2} = 0.6$!

::: {.figure src="ch03-complementarity"}
**A definite path and a sharp fringe share one unit hypotenuse.** Predictability $D_{\mathrm{pred}}$ runs across and visibility $V_{\mathrm{vis}}$ up. Pure states lie on the quarter circle: the amber point $(0.8, 0.6)$ is made of the cyan $D$ and the magenta $V$. The grey point is a mixed state with $\norm{\vv{r}} = 0.6$, on the dashed arc of radius $0.6$ inside.
:::

Even better, the context index set $L$ in [@thm-complementary-pythagoras] maps out the entire dimensional ladder of **quantum state tomography** at a glance:

| Measured Pauli Contexts $L$ | Visible Subspace $V \subseteq \mathbb{R}^3$ | Visible Deviation $\norm{P_V(s)}^2$ | Blind Complement $V^\perp$ | Residual Mass $\operatorname{residualMass}(V, s)$ |
| :--- | :---: | :---: | :---: | :---: |
| Single axis $\{Z\}$ ($|L|=1$) | 1D line $\operatorname{span}\{\vv{e}_3\}$ | $\frac{1}{2}r_z^2$ | 2D equator $\star\vv{e}_3 = \vv{e}_1 \wedge \vv{e}_2$ | $\frac{1}{2}(r_x^2 + r_y^2)$ |
| Two axes $\{Z, X\}$ ($|L|=2$) | 2D meridian plane $\operatorname{span}\{\vv{e}_3, \vv{e}_1\}$ | $\frac{1}{2}(r_z^2 + r_x^2)$ | 1D normal $\star(\vv{e}_3 \wedge \vv{e}_1) = \vv{e}_2$ | $\frac{1}{2}r_y^2$ |
| Full triad $\{X, Y, Z\}$ ($|L|=3$) | Full 3D ball space $\mathbb{R}^3$ | $\frac{1}{2}(r_x^2 + r_y^2 + r_z^2)$ | Zero subspace $\{\vv{0}\}$ | $0$ (blind spot eliminated) |

Notice why measuring only two complementary bases $\{Z, X\}$ still leaves a chirality ambiguity $\pm r_y$: the Hodge dual of a two-dimensional plane inside $\mathbb{R}^3$ is a one-dimensional normal line $\star(\vv{e}_3 \wedge \vv{e}_1) = \vv{e}_2$ carrying residual mass $\frac{1}{2}r_y^2$. Only when all three mutually orthogonal axes $\{X, Y, Z\}$ are probed (foreshadowing Part III, Chapter 9) does the residual blind spot vanish identically!

::: {.figure src="ch03-tomography-ladder"}
**Each added complementary context lowers the blind spot by one dimension.** The three spheres are the three rows of the tomography table. Measuring $Z$ alone, the cyan vertical axis is seen and the magenta equatorial plane is blind; measuring $Z$ and $X$, the cyan meridian plane is seen and only the magenta $y$ axis is left; measuring $X$, $Y$ and $Z$, the whole ball is cyan and nothing is blind ([@thm-complementary-pythagoras]).
:::

The last row of the tomography table still hides a constraint that has not been said aloud. Can the readings of the three complementary contexts be definite **at the same time**? Rewrite the Pythagorean sum of the last row: for $|d| = 2$, each context satisfies $\sum_j \bigl(p_{l,j} - \frac{1}{2}\bigr)^2 = \sum_j p_{l,j}^2 - \frac{1}{2}$, hence

$$
\sum_{l \in \{X, Y, Z\}} \sum_{j} p_{l,j}^2 \;=\; \frac{3}{2} + \frac{1}{2}\norm{\vv{r}}^2 \;=\; 1 + \Tr(\rho_{\vv{r}}^2) .
$$

Each term $\sum_j p_{l,j}^2$ on the left is the probability that two independent readings of the same context agree, called the collision probability. The sum of the three collision probabilities is locked by the purity, so they cannot all equal $1$. The module `D5/S3/QuantumBounds/CollisionEntropyUncertainty` at the pinned commit turns this conservation law into a lower bound on entropy.

::: {.proposition #prop-collision-entropy-uncertainty title="The Entropic Uncertainty Relation Given by Collision Conservation" lean="D5/S3/QuantumBounds/CollisionEntropyUncertainty.collision_entropy_uncertainty"}
Let $d$ be a positive integer, let $p : \operatorname{Fin}(d+1) \to \operatorname{Fin} d \to \mathbb{R}$ be a table for $d + 1$ contexts with $d$ outcomes each, and let $P \in \mathbb{R}$. If

1. for every context $b$, $p_b$ is a probability distribution: $0 \le p_{b,i}$ for all $i$, and $\sum_i p_{b,i} = 1$;
2. **collision conservation**: $\sum_b \sum_i p_{b,i}^2 = 1 + P$;

then

$$
(d + 1)\,\ln\frac{d + 1}{1 + P} \;\le\; \sum_{b} H(p_b), \qquad H(q) := \sum_i -q_i\ln q_i ,
$$

where $H$ is the Shannon entropy in nats (`shannonEntropy` in Lean, with $0\ln 0 = 0$ by the convention of Mathlib's `Real.negMulLog`).
:::

::: proof
Two applications of Jensen's inequality. The first uses $p_b$ itself as weights: $-\ln$ is convex, so $H(p_b) = \sum_i p_{b,i}\,(-\ln p_{b,i}) \ge -\ln\bigl(\sum_i p_{b,i}^2\bigr)$; the Shannon entropy is at least the collision entropy. The second averages over the $d + 1$ contexts with uniform weights $\frac{1}{d+1}$: $\frac{1}{d+1}\sum_b -\ln c_b \ge -\ln\bigl(\frac{1}{d+1}\sum_b c_b\bigr)$, where $c_b = \sum_i p_{b,i}^2$. Substituting $\sum_b c_b = 1 + P$ from hypothesis 2 gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-complete-mub-collision-sum title="The Collision Probability Sum for Complete Mutually Unbiased Bases"}
[@prop-collision-entropy-uncertainty] is by itself an inequality about tables of numbers; all the quantum mechanics sits in hypothesis 2. For the three Pauli contexts of a qubit, hypothesis 2 is the identity derived above from the tomography table, with $P = \Tr(\rho_{\vv{r}}^2)$. For general $d$, if the $d + 1$ contexts are mutually unbiased, one likewise has $\sum_b\sum_i p_{b,i}^2 = 1 + \Tr(\rho^2)$ (a literature result, not formalized in this book: I. D. Ivanović, *J. Phys. A* **25**, L363, 1992; such $d + 1$ contexts are known to exist when $d$ is a prime power).
:::

::: {.example #ex-three-pauli-entropy-sum title="The Entropy Sum of the Three Pauli Contexts: No State Makes All Three Readings Definite"}
For a qubit state with Bloch vector $\vv{r}$, the two outcome probabilities in context $b \in \{X, Y, Z\}$ are $\frac{1 \pm r_b}{2}$. By [@prop-collision-entropy-uncertainty] with $d = 2$ and $P = \frac{1 + \norm{\vv{r}}^2}{2}$:

$$
H_X + H_Y + H_Z \;\ge\; 3\ln\frac{6}{3 + \norm{\vv{r}}^2} .
$$

For a pure state the right-hand side is $3\ln\frac{3}{2} \approx 1.2164$ nats ($1.7549$ bits). The table is in nats, rounded to the digits shown:

| $\vv{r}$ | $H_X$ | $H_Y$ | $H_Z$ | Entropy sum | Lower bound $3\ln\frac{6}{3 + \norm{\vv{r}}^2}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(0, 0, 1)$ | $0.6931$ | $0.6931$ | $0$ | $1.3863$ | $1.2164$ |
| $\frac{1}{\sqrt{2}}(1, 1, 0)$ | $0.4165$ | $0.4165$ | $0.6931$ | $1.5261$ | $1.2164$ |
| $\frac{1}{\sqrt{3}}(1, 1, 1)$ | $0.5157$ | $0.5157$ | $0.5157$ | $1.5471$ | $1.2164$ |
| $(0, 0, 0.6)$ | $0.6931$ | $0.6931$ | $0.5004$ | $1.8867$ | $1.7395$ |
| $(0.5, 0.5, 0.5)$ | $0.5623$ | $0.5623$ | $0.5623$ | $1.6870$ | $1.4100$ |
| $(0, 0, 0)$ | $0.6931$ | $0.6931$ | $0.6931$ | $2.0794$ | $2.0794$ |

**Reading the table.** First row: make the $Z$ reading fully definite ($H_Z = 0$) and both $X$ and $Y$ become fair coins, each costing $\ln 2$. The last row is the centre of the ball, where all three contexts are fair coins and the bound is attained.

**How tight the bound is.** The collision-entropy bound is tight at the centre but leaves room on the sphere. A numerical search over pure states with a step of $0.25^\circ$ finds a minimum entropy sum of $2\ln 2 \approx 1.3863$ on the grid, reached in all six coordinate-axis directions (such as the first row) and above $3\ln\frac{3}{2}$. A finite grid describes the sampled values; it cannot prove a global lower bound or exclude other equality directions. For background on entropic uncertainty relations, see J. Sánchez-Ruiz, *Phys. Lett. A* **201**, 125, 1995 ([DOI](https://doi.org/10.1016/0375-9601(95)00219-S)). We can apply an existing contraction theorem directly to obtain $H_X + H_Y + H_Z \ge 2\ln 2$ throughout the closed Bloch ball.

Define the binary entropy using natural logarithms, in nats:

$$
h(p)=-p\ln p-(1-p)\ln(1-p),\qquad 0\le p\le1.
$$

Endpoint terms $0\ln0$ are taken as $0$, so $h(0)=h(1)=0$ and $h(1/2)=\ln2$. For any $r\in[-1,1]$, the diagonal state $\rho_r=\operatorname{diag}((1+r)/2,(1-r)/2)$ along a single axis has von Neumann entropy $h((1+|r|)/2)$ by the spectral formula [`qubit_state_entropy`](lean:D5/S3/Quantum/Information/QubitNormalFormState.qubit_state_entropy). Since $h(p)=h(1-p)$, changing the sign of $r$ only exchanges the two probabilities, so this also equals $h((1+r)/2)$.

The equal mixture of $\rho_r$ and $\rho_{-r}$ is $I/2$. The two states have the same entropy, so their Holevo quantity is $\ln2-h((1+|r|)/2)$. In the existing [`qubit_holevo_contraction`](lean:D5/S3/Quantum/Information/QubitEntropyContraction.qubit_holevo_contraction), take parameters $x=0$, $z=1$, and $t=|r|$: the closed-disk condition is $0^2+1^2\le1$, the contraction parameter satisfies $0\le|r|\le1$, and the uncontracted Holevo quantity is $\ln2$. Thus

$$
\begin{aligned}
\ln2-h\!\left(\frac{1+r}{2}\right)&\le r^2\ln2,\\
h\!\left(\frac{1+r}{2}\right)&\ge(1-r^2)\ln2.
\end{aligned}
$$

The endpoints are included: at $r=0$ both sides of the first line are $0$; at $r=\pm1$ both sides are $\ln2$. For any $\vv{r}=(x,y,z)$ in the closed Bloch ball, each coordinate lies in $[-1,1]$, and $H_X=h((1+x)/2)$, with the analogous formulas for the other two axes. Adding the three coordinate bounds gives

$$
\begin{aligned}
H_X+H_Y+H_Z&\ge(3-x^2-y^2-z^2)\ln2\\
&\ge2\ln2,\qquad x^2+y^2+z^2\le1.
\end{aligned}
$$

**Why are these exactly the six equality directions?** Set $L=\ln2>0$ and use the squared coordinate as a separate variable:

$$
\begin{aligned}
f(u)&=h\!\left(\frac{1+\sqrt{u}}{2}\right),\\
g(u)&=f(u)-(1-u)L,\qquad 0\le u\le1.
\end{aligned}
$$

The proof of the same contraction theorem establishes concavity of $f$ on all of $[0,1]$, including both endpoints, with $f(0)=L$ and $f(1)=0$. Subtracting the endpoint chord $(1-u)L$ leaves a concave function $g$ with $g(0)=g(1)=0$; concavity gives $g(u)\ge0$. To determine where the chord gap is strictly positive, first evaluate one interior point:

$$
\begin{aligned}
h(3/4)&=2L-\frac34\ln3,\\
g(1/4)&=\frac{5L-3\ln3}{4}\\
&=\frac{\ln32-\ln27}{4}>0.
\end{aligned}
$$

The strict sign follows from $0<27<32$ and strict increase of the natural logarithm on positive numbers. Two chords now spread this positive gap through the interior. For $0<u\le1/4$,

$$
\begin{aligned}
u&=(1-4u)\,0+(4u)\,\frac14,\\
g(u)&\ge4u\,g(1/4)>0.
\end{aligned}
$$

For $1/4<u<1$,

$$
\begin{aligned}
u&=\frac{4(1-u)}{3}\,\frac14+\frac{4u-1}{3}\,1,\\
g(u)&\ge\frac{4(1-u)}{3}\,g(1/4)>0.
\end{aligned}
$$

In both convex combinations the weights are nonnegative and sum to $1$. Thus the existing concavity and one positive chord gap imply $g(u)>0$ for every $0<u<1$, without a separate strict-concavity assumption.

For every $r\in[-1,1]$, the identity $\sqrt{r^2}=|r|$ and binary-entropy symmetry give

$$
h\!\left(\frac{1+r}{2}\right)-(1-r^2)L=g(r^2).
$$

The coordinate gap therefore vanishes exactly when $r^2\in\{0,1\}$: $r=0$ gives entropy $L$, while $r=1$ and $r=-1$ give $h(1)=0$ and $h(0)=0$, respectively. Every other coordinate value has a strictly positive gap. Write $H=H_X+H_Y+H_Z$ and $s=x^2+y^2+z^2\le1$. The total slack decomposes exactly as

$$
\begin{aligned}
H-2L={}&(1-s)L\\
&+g(x^2)+g(y^2)+g(z^2).
\end{aligned}
$$

All four terms on the right are nonnegative. If $H=2L$, then $L>0$ forces $s=1$ and all three coordinate gaps vanish. Hence each of $x^2,y^2,z^2$ is $0$ or $1$, and their sum being $1$ forces exactly one to be $1$. Conversely, the six coordinate-axis unit states $(\pm1,0,0)$, $(0,\pm1,0)$, and $(0,0,\pm1)$ have entropy triples that are permutations of $(0,L,L)$ and attain equality. Thus, on the **entire closed Bloch ball**, $H\ge2\ln2$ with equality if and only if the state is one of these six. Every interior point $s<1$ satisfies a strict inequality because $(1-s)L>0$.

This classification follows the derivation in the contraction module's [explanatory narrative](https://github.com/the-omega-institute/trureturing/blob/a2cb467f6c498757ce2975a8878a017a2b59d1b1/Blueprint/D5/S3/Quantum/Information/QubitEntropyContraction.md). It is a manual application of the existing scalar concavity, contraction result, and spectral entropy formula, with no additional standalone Lean declaration or claim of novelty. The finite grid above still reports only sampled values; the global lower bound and equality classification rest on this analytic derivation.

Where does the collision-entropy derivation lose this precision? The first step replaces the Shannon entropy by the collision entropy, and for a two-outcome distribution this loses nothing only in the uniform and the deterministic cases; an axis state has exactly one deterministic and two uniform contexts, so the first step is lossless. The loss occurs in the second application of Jensen's inequality, because the three collision probabilities $1, \frac{1}{2}, \frac{1}{2}$ are not equal.
:::

The Pythagorean theorem governs sums of squares; it says that the "degrees of definiteness" of the three contexts have a capped total. Entropy restates the same fact in units of information: for one qubit, at most one of three complementary questions can receive a definite answer.

## 3.3 The True Face of Classical Linear Time {#sec-ch03-3}

If a single idempotent projection $P^2 = P$ defines a repeatable operational event, how does a sequential **operational record ordering** ($\tau_1 \to \tau_2 \to \tau_3$) work along a laboratory logbook?

Inside an isolated sphere, unitary evolution is reversible rigid rotation: rotate $30^\circ$ left, rotate $30^\circ$ right, and the excursion reverses without singling out discrete ticks. Discrete operational ticks arise when an apparatus performs a record measurement $P^{(1)}$ at $\tau_1$, **conditions on a retained nonzero outcome $k_1$**, and promotes the normalized surviving state to serve as the premise for $\tau_2$! (We distinguish strictly here between **operational conditional record ordering** and a **fundamental or thermodynamic arrow of time**: this section establishes sequential state conditioning given retained classical outcomes, not underlying dynamical irreversibility — indeed, Chapter 4 proves that global system–register coupling is unitarily reversible, whereas genuine thermodynamic irreversibility from discarding or erasing environment records requires Landauer's principle in Part II, Chapter 8.)

For a chain of discrete historical ticks $\rho \xrightarrow{k_1} \rho_{|k_1} \xrightarrow{k_2} (\rho_{|k_1})_{|k_2} \to \cdots$ to remain well-defined step after step, mathematics must guarantee one essential closure property: whenever outcome $k$ occurs with nonzero Born weight, the conditioned matrix $\operatorname{conditionalState}(P, \rho, k) = \operatorname{recordWeight}(P, \rho, k)^{-1} P_k \rho P_k$ is itself a valid positive semidefinite trace-one quantum state.

::: {.theorem #thm-conditional-state-valid title="State Validity of Nonzero Conditioned Record Branches" lean="D5/S3/Observer/Conditioning.conditionalState_isState"}
Let $n$ and $\kappa$ be finite index types (with decidable equality on $n$), let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`, and let $\rho \in M_n(\mathbb{C})$ be positive semidefinite with $\Tr(\rho) = 1$. For any branch $k \in \kappa$ with nonzero record weight $\operatorname{recordWeight}(P, \rho, k) \neq 0$, the conditioned state

$$
\operatorname{conditionalState}(P, \rho, k) = \operatorname{recordWeight}(P, \rho, k)^{-1} P_k \rho P_k
$$

is positive semidefinite and satisfies $\Tr\bigl(\operatorname{conditionalState}(P, \rho, k)\bigr) = 1$.
:::

::: proof
Write $w_k = \operatorname{recordWeight}(P, \rho, k) = \Tr(\rho P_k)$. Since $P_k^* = P_k$ and $P_k^2 = P_k$ by [@def-record-measurement], the compressed matrix $P_k \rho P_k = P_k \rho P_k^*$ is positive semidefinite, and trace cyclicity with idempotence gives $\Tr(P_k \rho P_k) = \Tr(P_k^2 \rho) = \Tr(\rho P_k) = w_k$. By [@thm-born-probability-skeleton] in [Chapter 2](ch02-born-rule.md), $0 \le w_k$ in the complex partial order (so $w_k$ is a nonnegative real number); combined with $w_k \neq 0$, its inverse $w_k^{-1}$ is strictly positive real. Scaling by a positive real preserves positive semidefiniteness, and linearity of the trace gives $\Tr(w_k^{-1} P_k \rho P_k) = w_k^{-1} w_k = 1$. The full proof is checked by the Lean kernel.
:::

When an observer chains [@thm-conditional-state-valid] across non-collinear axes $\tau_1 \to \tau_2 \to \tau_3$, something extraordinary happens: a transition that was $100\%$ forbidden becomes open simply because an intermediate projection reset the reference line! Feynman loved pulling three cheap Polaroid sheets from his pocket to demonstrate this right before his students' eyes.

To extend the three-sheet calculation to any finite number of sheets, first examine what survives when ordered outer products are multiplied.

::: {.theorem #thm-rank-one-chain-trace title="Trace of an Ordered Outer-Product Chain" lean="D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product"}
For every natural number $n$ and arbitrary vectors $v_0,\ldots,v_n\in\mathbb{C}^2$, let $R_j=v_jv_j^\dagger$, with inner product $\langle u,v\rangle=u^\dagger v$. Multiplication in the displayed order gives

$$
\Tr(R_0\cdots R_n)
=\left(\prod_{j=0}^{n-1}\langle v_j,v_{j+1}\rangle\right)\langle v_n,v_0\rangle.
$$

For $n=0$, the empty product is $1$ and the identity reads $\Tr(R_0)=\langle v_0,v_0\rangle$. No normalization or nonzero assumption is imposed: $R_j$ may be zero and need not be a projector.
:::

::: proof
Direct multiplication gives $(uu^\dagger)(ww^\dagger)=\langle u,w\rangle uw^\dagger$. Applying this identity along the finite chain leaves one consecutive inner product at each step and the final outer product $v_0v_n^\dagger$. Taking its trace supplies the closing factor $\Tr(v_0v_n^\dagger)=\langle v_n,v_0\rangle$. This expands the ordered outer-product trace `bargmann` in the cited statement; a single outer product supplies the induction base. The full proof is checked by the Lean kernel.
:::

The trace of a general ordered chain is complex and is not itself a probability. The transmission weight below comes from a particular palindrome of unit vectors.

::: {.example #ex-malus-three-polarizers title="Feynman's Three-Polarizer Cascade: How Sequential Idempotent Projections Rewrite History"}
Send a beam of horizontally polarized photons onto an optical bench. (Note a helpful factor of two in optics: when an electric-field polarization axis rotates in physical space by angle $\alpha$, horizontal $\alpha = 0^\circ$ and vertical $\alpha = 90^\circ$ are already mutually orthogonal states; thus the spatial optical angle $\alpha$ equals the Hilbert-space half-angle $\theta/2$, corresponding to Bloch angle $\theta = 2\alpha$.) The rank-one projector onto linear polarization at spatial angle $\alpha$ is

$$
P(\alpha) = \begin{pmatrix} \cos\alpha \\ \sin\alpha \end{pmatrix}\begin{pmatrix} \cos\alpha & \sin\alpha \end{pmatrix} = \begin{pmatrix} \cos^2\alpha & \cos\alpha\sin\alpha \\ \cos\alpha\sin\alpha & \sin^2\alpha \end{pmatrix},
$$

satisfying $P(\alpha)^* = P(\alpha)$ and $P(\alpha)^2 = P(\alpha)$.

**Setup A (Two crossed polarizers, $\tau_1 \to \tau_3$)**: Polarizer 1 is horizontal ($\alpha_1 = 0^\circ$), preparing $\rho_1 = P(0^\circ) = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ (Bloch North $+\vv{e}_3$). Directly behind it stands vertical Polarizer 3 ($\alpha_3 = 90^\circ$), $P(90^\circ) = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$ (Bloch South $-\vv{e}_3$, $\theta = 180^\circ$). By Malus's law ([@thm-rank-one-born-pairing]), the transmission weight is

$$
\Tr\bigl(P(0^\circ) P(90^\circ)\bigr) = \cos^2(90^\circ - 0^\circ) = 0.
$$

Total darkness: zero photons emerge. Were polarizers passive classical sieves merely filtering out photons that lacked a pre-existing "vertical ticket," slipping a *third* absorbing sheet between two crossed sheets could only keep the output pitch black.

**Setup B (Inserting a $45^\circ$ polarizer in between, $\tau_1 \to \tau_2 \to \tau_3$)**: Leave the $0^\circ$ and $90^\circ$ sheets untouched, and slide a diagonal sheet at $\alpha_2 = 45^\circ$ — $P(45^\circ) = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ (Bloch East $+\vv{e}_1$, $\theta = 90^\circ$) — midway between them! Follow the two sequential updates via [@thm-conditional-state-valid]:

1. **First tick ($\tau_1 \to \tau_2$, $0^\circ \to 45^\circ$)**: Photons arriving in state $\rho_1 = P(0^\circ)$ pass the $45^\circ$ sheet with weight $w_2 = \Tr\bigl(P(0^\circ) P(45^\circ)\bigr) = \cos^2 45^\circ = \frac{1}{2}$. Every surviving photon is idempotently reset to the new premise $\rho_2 = \operatorname{conditionalState}\bigl(P(45^\circ), \rho_1\bigr) = P(45^\circ)$ — its old memory of having started at $0^\circ$ is wiped clean!
2. **Second tick ($\tau_2 \to \tau_3$, $45^\circ \to 90^\circ$)**: Carrying their fresh $45^\circ$ identity $\rho_2 = P(45^\circ)$, those photons meet the $90^\circ$ vertical sheet and pass with weight $w_3 = \Tr\bigl(P(45^\circ) P(90^\circ)\bigr) = \cos^2(90^\circ - 45^\circ) = \frac{1}{2}$.

Across the two ticks, light blazes back through the previously dark exit port with net transmission

$$
w_{\mathrm{total}} = w_2 \cdot w_3 = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4} = 25\%!
$$

[@thm-rank-one-chain-trace] explains this multiplication for any finite cascade. To count the sheets, now label the horizontal preparation by $0$: for any $m\in\mathbb{N}$, choose real angles $\alpha_0=0,\alpha_1,\ldots,\alpha_m$, and let $v_j=v(\alpha_j)=(\cos\alpha_j,\sin\alpha_j)\in\mathbb{C}^2$ be unit vectors, with $P_j=v_jv_j^\dagger$. Starting from the prepared state $P_0$, the branch that passes all subsequent $m$ sheets has unnormalized state

$$
X_m=P_m\cdots P_1P_0P_1\cdots P_m.
$$

Apply the theorem with $n=2m$ to the vector palindrome $(v_m,\ldots,v_1,v_0,v_1,\ldots,v_m)$. The closing factor is $\langle v_m,v_m\rangle=1$, and the consecutive overlaps pair with their complex conjugates. The probability of this branch, conditional on the prepared horizontal input, is therefore

$$
\begin{aligned}
\Tr(X_m)&=\prod_{j=1}^{m}|\langle v_j,v_{j-1}\rangle|^2\\
&=\prod_{j=1}^{m}\cos^2(\alpha_j-\alpha_{j-1}).
\end{aligned}
$$

Along a history with nonzero weights, the factors are successive conditional transmission weights; their multiplication requires no independence assumption. The unnormalized formula also holds when a factor vanishes, without defining a normalized conditional state on a zero-probability branch.

For $N\in\mathbb{N}$ equally spaced intermediate sheets between the horizontal and final vertical sheets, take $m=N+1\ge1$ and $\alpha_j=j\pi/(2m)$. The finite chain gives

$$
w_N=\left[\cos^2\left(\frac{\pi}{2(N+1)}\right)\right]^{N+1}.
$$

$N=0$ gives $0$, while $N=1$ gives the $1/4$ above. All these ratios refer to the prepared horizontal beam. If the incident beam before preparation is unpolarized, with state $I/2$, horizontal preparation contributes a separate factor $1/2$, so the three-sheet experiment transmits $1/8$ of that original beam.
:::

::: {.figure src="ch03-polarizer-chain"}
**The ideal chain's transmission weight tends to $1$.** The cyan dots are $w_N = \bigl[\cos^2\frac{\pi}{2(N+1)}\bigr]^{N+1}$: $0$ with only the first and last polarizers ($N = 0$), $\frac{1}{4}$ for the ringed three-polarizer case ($N = 1$), and about $0.83$ at $N = 12$; the finite values come from the finite chain of [@thm-rank-one-chain-trace]. The dashed violet line at the top marks the limit $1$ as $N \to \infty$; this scalar limit is an application of existing Mathlib analysis results ([@rem-polarizer-ideal-limit]).
:::

::: {.remark #rem-polarizer-ideal-limit title="The Ideal Polarizer-Chain Limit (An Application of Existing Mathlib)"}
Kidambi, Widom, Lerner, and Srivastava give the finite formula and scalar limit for the ideal projection model in [*Photon Polarization Measurements without the Quantum Zeno Effect*](https://arxiv.org/pdf/quant-ph/9902080v1), p. 2, Eqs. (7)–(8). Their $N$ corresponds to $m=N+1$ in this example:

$$
\lim_{N\to\infty}w_N=1.
$$

This scalar limit follows from existing Mathlib results on derivatives and limits of powers. Define the real function $f(x)=\cos^2((\pi/2)x)$, so $f(0)=1$. The chain and power rules give $f'(x)=-\pi\sin((\pi/2)x)\cos((\pi/2)x)$, hence $f'(0)=0$. Thus `HasDerivAt.tendsto_slope_zero_right` gives

$$
\frac{f(x)-1}{x}\longrightarrow0\qquad(x\to0^+).
$$

Along positive integers $n\to\infty$, substitute $x=1/n$ to obtain $n(f(1/n)-1)\to0$. Mathlib's `Real.tendsto_one_add_pow_exp_of_tendsto` says that if a real sequence $g_n$ satisfies $n g_n\to t$, then $(1+g_n)^n\to\exp(t)$. Take $g_n=f(1/n)-1$ and $t=0$; the auxiliary sequence's zeroth term may be assigned arbitrarily without affecting the limit. This yields

$$
\left[\cos^2\left(\frac{\pi}{2n}\right)\right]^n
=(1+g_n)^n\longrightarrow\exp(0)=1.
$$

Setting $n=m=N+1$ gives the limit with the natural number $N$ counting intermediate sheets. Here $m\ge1$ throughout, including the two-sheet case $N=0$. For unpolarized input $I/2$ before preparation, retaining the initial horizontal preparation contributes the factor $1/2$, so the ideal transmission ratio relative to that original beam satisfies $(1/2)w_N\to1/2$.

This analytic step lies outside the finite algebraic identity in [@thm-rank-one-chain-trace]. It also does not establish strict increase of $w_N$ with $N$, which requires a separate argument. Both the finite chain and this limit use ideal rank-one projections. Immediately after the limit, the paper explicitly notes attenuation in real experiments with many polarizers; the ideal limit therefore gives no guarantee of lossless transmission through real filters, nor any transmission limit for general noisy filters or absorbing media.
:::

[@ex-malus-three-polarizers] brings out the operational geometry of sequential record conditioning: a chain of recorded laboratory measurements is not a conveyor belt carrying pre-labeled pebbles past passive checkpoints, but a **sequence of conditional idempotent re-basings** $P(\tau_1), P(\tau_2), P(\tau_3)$ in which each retained outcome resets the conditioned state for the next probe (while the global fate of unmonitored branches and the thermodynamic cost of erasing records are established by unitary dilation in Chapter 4 and Landauer's principle in Chapter 8, respectively).

::: {.viz src="repeated-projection" preset="chain" height="500"}
**Read the result: the state stays on the skin, and the price goes into the weight.** The north pole is the $0^\circ$ sheet and the south pole the $90^\circ$ sheet; three middle sheets divide the meridian evenly, and the cyan lines are their measurement lines. At every hop the amber state lands on the end of the next line and stays on the skin ([@thm-conditional-state-valid]); the cyan bar on the right is the total weight passed, multiplied by $\cos^2 22.5^\circ$ at each hop, and after four hops it stops at the dashed $w_3 \approx 0.531$ ([@thm-rank-one-chain-trace]).
:::

One last mystery of Part I now demands an answer. In [@def-record-measurement] and [@thm-pinching-idempotent], what happens when an interaction *does* record which branch occurred, yet our gaze turns away — when the record flies off into an unmonitored environment so that we retain only the unread mixture $\operatorname{unreadState}(P, \rho)$, whose Bloch vector shrinks inside the ball ($\norm{\vv{r}} < 1$)? Where did the missing length $1 - \norm{\vv{r}}$ go, and is quantum information ever truly destroyed? Let us enter [Chapter 4](ch04-decoherence.md).

::: {.viz src="repeated-projection" height="560"}
**The full lab.** The amber arrow starts on the sphere (dashed); one press along the cyan line, result unread, and the magenta part is gone and the tip has moved inside the ball: the next chapter asks where that length went. Drag the arrow, change the measurement line, set its length and press "Project": project along Z, then switch to X and project again, and the arrow goes to zero; move "Middle sheets N" to switch to the polarizer chain, where the result is read.
:::
