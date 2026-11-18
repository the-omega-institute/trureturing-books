# Chapter 15 Invariant-Plane Rotations and Equatorial Area Gears: Grover Search, QFT, and Shor Factoring {#invariant-plane-rotations-and-equatorial-area-gears-grover-search-qft-and-shor-factoring}

> *"The core is how isotropy lets us reach another point through orthogonal relations: one orthogonal step, then two, because the three directions are pairwise orthogonal."*

In [Chapter 13](ch13-entanglement-and-chsh.md) and [Chapter 14](ch14-cloning-codes-and-braids.md), we saw how higher-dimensional spheres store and shield quantum information. Now we confront the central question of quantum algorithms: **how do unitary operations navigate an exponentially large state space to find targets and hidden periods faster than classical search?**

When stripped of circuit notation, the two flagship families of quantum algorithms — **Grover amplitude amplification** and **Quantum Fourier Transform (QFT) period finding in Shor's algorithm** — embody the two geometric mechanisms pointed to in our opening epigraph:

- **Grover search composes two reflections into an invariant-plane rotation**: Inside an isotropic $l$-dimensional search space, the prepared state and the target projection span a common two-dimensional block plane; reflecting first across the orthogonal complement of the target subspace ("one orthogonal step") and then across the prepared subspace ("two orthogonal steps") rotates the state vector by $2\theta$ straight toward the target!
- **QFT and period finding harness character orthogonality across binary phase gears**: Conjugating Weyl shift and clock operators kicks back symplectic phases that wind binary equatorial gears; in the finite cyclic group $\mathrm{ZMod}\,m$ ($m>0$), applying the QFT to a normalized uniform superposition over the position subgroup $H$ sums characters over $H$: the phase arrows at non-resonant frequencies form closed chains and cancel to zero, while the resonant frequencies in the dual annihilator $H^\perp$ add in phase to reveal the hidden period! The dual-sum proposition below runs in the reverse direction, summing over $H^\perp$ with nonzero values only on $H$.

::: {.figure src="ch15-overview"}
**Figure 15.** The chapter at a glance. Panel I: for $N = 4$, one Grover step turns the arrow $U$ through the violet $2\theta = 60^\circ$, and the amber $QU$ lands exactly on the success direction $W$. Panel II: the three phase gears for $x = 5 = (101)_2$, with $2$, $4$ and $8$ teeth; their amber pointers sit at $\pi$, $\pi/2$ and $5\pi/4$. Panel III: after the QFT of the $Q = 16$, $r = 4$ period state, only $k = 0, 4, 8, 12$ keep a cyan bar, each of height $1/4$.
:::

- [15.1 Grover: The Common Invariant Plane of Two Reflections](ch15-s01-grover-invariant-plane.md)
- [15.2 Phase Kickback and the Binary Gears of the QFT](ch15-s02-qft-phase-gears.md)
- [15.3 Finite Character Orthogonality and Nonresonant Cancellation](ch15-s03-character-cancellation.md)
- [15.4 Finite Period Sampling and Order Reconstruction in Shor’s Algorithm](ch15-s04-shor-order-reconstruction.md)
