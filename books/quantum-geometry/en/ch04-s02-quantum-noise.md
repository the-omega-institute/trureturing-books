# 4.2 Understanding Quantum Noise Geometrically Without Memorizing Kraus Operators {#sec-ch04-2}

Once we see how the partial trace shortens the local Bloch vector in this example, the operator-sum formulas of standard textbook noise models turn completely transparent. Without memorizing a single abstract matrix, each of the benchmark single-qubit noise models analyzed below (pinching, phase damping, amplitude damping, and depolarizing noise) acts geometrically by **compressing or shifting the Bloch ball**!

Start with complete transverse dephasing — **standard-basis pinching** $\mathcal{P}(\rho)$ ([`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching) in Lean, preserving diagonal entries $\rho_{00}, \rho_{11}$ and zeroing off-diagonal entries $\rho_{01}, \rho_{10}$). Under the Hilbert–Schmidt inner product ([`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner) $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$), pinching is an exact orthogonal projection flattening the Bloch sphere onto its vertical diameter $[-\vv{e}_3, +\vv{e}_3]$, and the discarded equatorial mass equals the sum of squared moduli of the two off-diagonal entries!

::: {.viz src="bloch-noise" preset="pinch" height="500"}
**Squashed onto the axis.** One step of complete dephasing: the cyan ball is squashed into a vertical line, and the violet dashes mark the whole axis as fixed. $\rho$ and $\sigma$ have the same height and differ only sideways, so they land on the same point of the axis and the white line shrinks to nothing; the two magenta segments are the sideways parts of the two starting points that are squashed away, and they carry the coherence mass, which the top left reads off for $\rho$ as it drops from $0.375$ to $0$ ([@thm-pinching-pythagorean]).
:::

- [4.2.1 Phase damping, repeated records, and retained environments](ch04-s02-s01-phase-and-environment.md)
- [4.2.2 Finite-environment histories and saturation obstructions](ch04-s02-s02-finite-environment-histories.md)
- [4.2.3 Amplitude damping, relaxation, and trace distance](ch04-s02-s03-amplitude-and-distance.md)
