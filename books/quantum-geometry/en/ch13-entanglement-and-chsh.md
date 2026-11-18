# Chapter 13 Quantum Entanglement and the Bell 45° Violation: How the Cosine Arc Defeats the Classical Polygonal Line {#quantum-entanglement-and-the-bell-45-violation-how-the-cosine-arc-defeats-the-classical-polygonal-line}

> *"Point C is not actually a known quantity; it is a projection onto a point of compatibility. A single definite quantum state determines only a line; a collection of quantum states is needed to determine an area."*

In Part I ([Chapter 1](ch01-measurement.md) through [Chapter 4](ch04-decoherence.md)), we uncovered the complete geometric portrait of a single qubit: stripped of norm and global-phase redundancy, every pure single-qubit state is a directed unit arrow $\vv{r}$ on the unit sphere $S^2 \subset \mathbb{R}^3$; and in the specific [Chapter 4](ch04-decoherence.md) model where an equatorial state couples via a symmetric CNOT/Bell record to an environment (or under unital isotropic depolarizing noise), tracing out the environment shrinks the transverse arrow by the environmental-overlap cosine factor toward the maximally mixed origin $\vv{r} = \vv{0}$ ($\frac{1}{2}I_2$; whereas general open-system channels behave differently: pure dephasing maps $(r_x, r_y, r_z) \mapsto (\eta r_x, \eta r_y, r_z)$ while preserving $r_z$, and amplitude damping attracts states toward the pure north pole $\lvert 0\rangle$).

Now suppose the second qubit coupled to our system is not a stray particle lost in a thermal bath, but a partner qubit carefully held in a distant laboratory. Take this chapter's Bell pure state $\lvert\Phi^+\rangle$: when Alice and Bob each inspect their own qubit locally, both of their local Bloch arrows vanish completely at the center of the ball ($\vv{r} = \vv{s} = \vv{0}$). Yet the moment they bring their measurement logs together and compare joint outcomes, $100\%$ of the **non-identity purity excess** $\Tr(\rho^2) - \frac{1}{4} = \frac{3}{4}$ above the maximally mixed baseline $\frac{1}{4}I_4$ (namely $\frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$, invisible on the two individual three-dimensional spheres) reappears intact inside a higher-dimensional **correlation tensor sector** spanning both particles!

This chapter opens Part IV, *Higher-Dimensional Spheres — Entanglement, Topology, and Quantum Algorithms*. Starting from the orthogonal sector decomposition of bipartite Hermitian operator space, we pass through the central marginal blind spot of Bell states and Landau's commutator-area identity for the squared CHSH operator, culminating in the $2\sqrt{2}$ maximum at the $45^\circ$ ($\pi/4$) symmetric quarter-right angle.

::: {.figure src="ch13-overview"}
**Figure 13.** The chapter at a glance. Panel I: on the 4 × 4 board of the two-qubit Pauli ledger, $3 + 3$ cyan local-line cells and $9$ magenta correlation cells. Panel II: in the two balls of the Bell state both amber points sit at the centre ($\vv{r} = \vv{s} = \vv{0}$), and the magenta correlation spans the space between them. Panel III: the cyan cosine arc and the dim toy line meet at $0^\circ$, $90^\circ$ and $180^\circ$; at $45^\circ$ the arc stands a magenta gap above the line.
:::

- [13.1 Local Lines and Correlation Areas: 6 + 9 = 15](ch13-s01-local-and-correlation.md)
- [13.2 Bell States: Central Marginals and Shared Correlations](ch13-s02-bell-states.md)
- [13.3 The CHSH Square: Its Commutator Area Term](ch13-s03-chsh-commutator-area.md)
- [13.4 The 45° Cosine and the Fixed CHSH Maximum](ch13-s04-tsirelson-cosine-bound.md)
