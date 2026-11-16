# Chapter 4 When Sight Turns Away: Decoherence, Mixed States, and the Truncated Chord Inside the Sphere

> *"So everything is settled, without a single exception — even the structure of the observer works this way."*

Throughout our first three chapters, the single-qubit arrow $\vv{a}$ stood proudly on the **outer shell** of the unit sphere $S^2$ ($\norm{\vv{a}} = 1$): in [Chapter 1](ch01-measurement.md) as a real three-dimensional ray freed of global phase redundancy, in [Chapter 2](ch02-born-rule.md) as the geometric source of Born's half-angle law $\cos^2(\theta/2)$, and in [Chapter 3](ch03-projectors-and-duality.md) as a unit hypotenuse split by an idempotent line $P^2 = P$ into axial particle bias and equatorial wave coherence.

Walk into an actual superconducting-qubit lab, ion-trap chamber, or NMR spectrometer, however, and pure shell states are the exception rather than the rule. Real experimental states live inside the **interior** of the Bloch ball as **mixed states**: their Bloch vector $\vv{r}$ shrinks into a truncated chord $\norm{\vv{r}} < 1$, often collapsing all the way to the featureless dead center $\vv{r} = \vv{0}$.

Who stole the missing length $1 - \norm{\vv{r}}$? Does "decoherence" mean that nature suffers an irreversible ontological decay? Closing Part I, this chapter explains the geometric mechanism of mixed states: **orthogonal record coupling and partial-trace marginalization in a larger joint space shorten the reduced local state** ([@thm-nonselective-marginal] and [@thm-reduced-access-defect], alongside C\*-algebraic representation compression [@thm-stinespring-dilation] and the general Schrödinger-picture channel dilation recorded in [@rem-stinespring-literature]). Picture a tilted spear casting a shorter shadow to get a feel for the shortening of the local Bloch vector; the partial trace itself acts on the joint density operator.

::: {.figure src="ch04-overview"}
**Figure 4.** The chapter at a glance, each panel a vertical cross-section of the Bloch ball. Panel I: the amber local arrow heads for $\lvert +\rangle$ on the shell (dashed) but stops inside at $\cos\theta_{\mathrm{env}}$. Panel II: amplitude damping ($\gamma = \frac{1}{2}$) shrinks the ball and pushes it north into the cyan ellipse; $\rho$ at the north pole stays, $\sigma$ at $+x$ is pulled north, and the line between them shrinks from the dashed one to the solid one, $T$ from $0.707$ to $0.433$ ([@prop-trace-distance-metric-contraction]; the Bloch form of this channel is a literature result, not formalized in this book). Panel III: the amber point first loses its sideways part and lands on the vertical axis, then loses $r_z$ and lands on the violet centre $\frac{1}{2}I$.
:::

- [4.1 Pure States Are the Spherical Shell ($\|\vv{r}\| = 1$), Mixed States Are Truncated Chords Inside ($\|\vv{r}\| < 1$)](ch04-s01-pure-and-mixed-states.md)
- [4.2 Understanding Quantum Noise Geometrically Without Memorizing Kraus Operators](ch04-s02-quantum-noise.md)
- [4.3 The Maximally Mixed Dead Center ($\vv{r} = \vv{0}$)](ch04-s03-maximally-mixed-state.md)
