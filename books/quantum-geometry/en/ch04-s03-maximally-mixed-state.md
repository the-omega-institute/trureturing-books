# 4.3 The Maximally Mixed Dead Center ($\vv{r} = \vv{0}$) {#sec-ch04-3}

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

## 4.3.1 Summary of Part I: From Point to Line — Ready to Open the Plane {#summary-of-part-i-from-point-to-line--ready-to-open-the-plane}

Across the four chapters of Part I, the theorem statements checked by the Lean kernel and their pinned formal declarations support our reconstruction of the foundations of quantum geometry; their individual correspondences appear in the book's formal verification ledger:

- **Chapter 1** dismantled both the isolated-particle myth and the external-point-$C$ coordinate scaffolding, proved that $M_2(\mathbb{C})$ admits no algebraic character ([@thm-qubit-no-character]), and used unitary ray rigidity ([@thm-ray-phase-rigidity]) and the Bloch map ([@prop-qubit-bloch-core]) to turn four-parameter complex column vectors into real unit rays $\vv{a} \in S^2$;
- **Chapter 2** chose the known state itself as basis, identified "point $C$" as the endogenous compatibility shadow $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$, and derived Born's squared-modulus rule ([@thm-born-modulus-square], [@thm-rank-one-born-pairing]) and the half-angle identity $\cos^2(\theta/2) = \frac{1 + \cos\theta}{2}$ directly from coordinate-free trace pairing and Pythagoras's theorem; it also proved that a reading positive on probes peels off layer by layer into least confirmations ([@thm-positive-dual-generation]), and that in finite dimension an additive probability on effects is the trace pairing of a density matrix ([@thm-busch-effect-density]);
- **Chapter 3** revealed particles, concepts, and ticks of classical linear time as fixed points of idempotent lines $P^2 = P$ ([@thm-pinching-idempotent], [@thm-unread-fixed-iff], [@thm-conditional-state-valid]), paired inseparably with their Hodge-dual wave planes via complementary Pythagorean tomography ([@thm-complementary-pythagoras]), and bounded the record capacity of a $d$-dimensional system by $N \le d$ ([@prop-record-capacity]) together with the entropic uncertainty relation for complementary contexts ([@prop-collision-entropy-uncertainty]);
- **Chapter 4** traced decoherence to partial-trace marginalization ([@thm-nonselective-marginal]), proved that local irreversibility is an environment-access defect rather than ontological loss ([@thm-reduced-access-defect]), described the contraction geometry of phase damping, amplitude damping, and pinching ([@thm-pinching-pythagorean], [@prop-phase-damping-decay], [@prop-amplitude-damping-contraction], [@cor-pinching-zero-offdiag]), used Stinespring's dilation ([@thm-stinespring-dilation]) to explain representation compression, showed with the Sz.-Nagy unitary power dilation ([@thm-unitary-power-dilation]) that all powers of a contraction are shadows of one unitary evolution, and bounded two-state distinguishability through trace-distance contraction under channels on a fixed finite index type ([@prop-trace-distance-metric-contraction]).

::: {.viz src="bloch-noise" height="560"}
**The full lab.** Switch between the three noises, set the strength per step and $T_2 / T_1$, or drag $\rho$ and $\sigma$ on the skin, and follow along the rail how the cyan ball deforms and how the white line only shrinks.
:::

With the one-dimensional projection line $\vv{a}\cdot\vv{b} = \cos\theta$ firmly in hand, **Part II (*Unfolding Wings — From Line to Plane*)** raises our gaze to the oriented two-dimensional area $\vv{a} \wedge \vv{b} = \sin\theta\,\hat{I}$ — revealing why the "imaginary unit" is nothing more than a $90^\circ$ planar turn, and unifying quantum gates with all five textbook postulates through the single Clifford geometric product $AB = A\cdot B + A\wedge B$.

::: {.film src="pairwise-born"}
**Pairwise measurement: from two arrows to the Born weight (1 min 26 s).** Two arrows $60^\circ$ apart read their own angle from the two diagonals of their parallelogram ([@thm-parallelogram-norm-law]); with $A$ as its own axis, the foot $C$ becomes the cyan shadow $\cos\theta$ that $B$ casts on $A$; squeezing that shadow from $[-1, 1]$ into $[0, 1]$ gives the weight $\cos^2(\theta/2)$ ([@thm-born-modulus-square]); only squares let a shutter and its complement share the whole weight ([@thm-born-probability-skeleton]); finally an environment records the branch, and the arrow shrinks to a short line on the vertical axis inside the ball ([@thm-nonselective-marginal]).
:::
