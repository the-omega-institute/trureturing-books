# 36.2 Static Ontological QRAM: Time as Pointer Increment ptr++, Observation as Dereferencing *ptr {#381-static-ontological-qram-time-as-pointer-increment-ptr-observation-as-dereferencing-ptr}

Open the casing of a solid-state read-only memory chip playing back a feature film and inspect what physically happens on the silicon die. On the cinema screen, galaxies spiral, rivers surge, and protagonists age; yet under a microscope aimed at the memory array itself, you behold an astonishing stillness: **not a single stored charge packet is running around the wafer!** Shuttling billions of physical data blocks across silicon every millisecond would incinerate the chip in Joule heat. Hardware engineers invert the burden instead: the vast holographic data array sits motionless in place, and the only thing that moves is a tiny, featherweight **address pointer register `ptr`**. Each clock cycle increments the register (`ptr++`), and the read head dereferences the cell at that address (`*ptr`) onto the active readout bus.

::: {.figure src="ch38-ptr-clock"}
**Time is `ptr++`, observation is `*ptr`.** Each row is the same stretch of memory at tick $t$: read down any column and its digit is the same at all six ticks, so the data never moves; only the amber read head steps one cell to the right per tick (grey arrows, `ptr++`) and reads the cell it is on (`*ptr`, on the right). Schematic model (`MODEL`); the digits are an arbitrary data word.
:::

Turn this architectural lens onto the six-dimensional cut-and-project parent lattice $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$ ([Chapter 28](ch32-unified-field-and-meta-unification.md)), and the classical myth of heavy matter plowing through space flips inside out. Within our **`MODEL` (interpretive model)**, the global cosmic state factors as tensor coupling between a lightweight **observer pointer register (`ptr`)** and a read-only holographic **Ontological Quantum Random Access Memory (`Ontological QRAM`, denoted `mem`)**:

$$
\mathbf{\Psi}_{\mathrm{cosmos}} \;=\; \sum_{x \in \mathbb{Z}^6} \lvert x\rangle_{\mathrm{ptr}} \otimes \lvert\Phi(x)\rangle_{\mathrm{mem}}.
$$

Take an orthonormal address basis and absorb address amplitudes into $\lvert\Phi(x)\rangle$: in $\ell^2(\mathbb Z^6)\widehat{\otimes}\mathcal H_{\mathrm{mem}}$, we impose $\sum_x\lVert\Phi(x)\rVert^2=1$. The sum then converges in Hilbert norm and the global state has norm $1$; individual slices need not be normalized. This infinite address ontology is distinct from the finite $N$-cell physical query below.

Across this ontological memory array, every holographic field slice $\lvert\Phi(x)\rangle_{\mathrm{mem}}$ at lattice address $x \in \mathbb{Z}^6$ abides timelessly at its coordinate—**ontological data cells neither arise nor perish, neither wax nor wane, nor ever shift by a nanometer; what glides across the static crystal, selects addresses, and lights up lived reality is the observer memory pointer `ptr`.**

To read a target cell without walking the entire table cell by cell, a bucket-brigade routing tree folds $N$ addresses into a binary tree of depth $\log_2 N$: each address activates only the $\log_2 N$ switches along its root-to-leaf path while the vast majority of nodes remain quiet.

::: {.viz src="pointer-ontology-deref" preset="qram_tree" height="500"}
**One address sets only the 6 switches on one path.** Address 41 = 101001₂ enters at the root and each tick sets one level by one bit: after six ticks the cyan path reaches cell 42, and only these 6 of the 63 switches light up; at the same moment the amber scan head at the bottom has read just 6 cells. The depth and the switch count follow the bucket-brigade QRAM of [@rem-ch38-qram-page-wootters-literature] (literature result, not formalized in this book).
:::

By contrast, falling back to a naive linear bus scan forces the read head to step through all $N$ cells to reach the end of the table:

::: {.viz src="pointer-ontology-deref" preset="linear64" height="500"}
**Reading the last cell means walking all 64.** The amber head reads one cell per tick along the bus, and the cells it has read light up; reaching address 63 takes 64 steps, while the routing tree above reached its leaf at step 6.
:::

Just as crucially, when the pointer dereferences a cell and copies its state into an address record, coherence is not annihilated—it moves from the system's off-diagonal entries into cross-block correlations with the record, so tracing out the record yields purely diagonal local weights ([@thm-ch38-copied-address-dereference-and-access-defect]):

::: {.figure src="ch38-copy-record"}
**The dereferencing copy moves the coherence into the address record instead of destroying it.** Rows and columns are ordered (system bit, record bit) into a $4 \times 4$ grid, and the heavy lines cut it into four $2 \times 2$ blocks. In the blank embedding $B(\rho)$ on the left, all four entries sit in the top-left $E_{00}$ corner of their blocks; in $R_{\mathrm{addr}}(\rho)$, after $U_{\mathrm{copy}}$, the cyan $p$ and $1-p$ stay on the diagonal blocks while the magenta $c$ and $\bar{c}$ have moved to the $E_{01}$ and $E_{10}$ positions, still present. The partial trace over the record adds only the diagonal cells of each block, which these two are not, so the local readout is just $\operatorname{diag}(p, 1-p)$. See [@thm-ch38-copied-address-dereference-and-access-defect].
:::

The full formal derivations for reversible routing and clean queries, physical record profiles and fidelity minimizers, and signed Fourier address dereferencing (along with their literature boundaries) are collected in [Appendix P](appendix-p.md) ([§P.1](ch38-s01-s01-routing-and-query.md)–[§P.3](ch38-s01-s03-signed-fourier-records.md)). The short film below walks the routing tree from end to end: the address sets the switches, the cell is read, the road is undone, and then come a superposed address and the marks the routers leak to their surroundings.

::: {.film src="qram-router-tree"}
**Set the switches, fetch the cell (2 min 28 s).** In a still memory grid the digits never move; only the amber address box jumps, and "observer = pointer" is marked violet as the book's interpretive model. Under a three-level routing tree the eight cells hold $3, 1, 4, 1, 5, 9, 2, 6$; the address $101$ sets the switches level by level ($0$ left, $1$ right; the rail points and the train are only a picture), and the cyan path reaches cell $5$ alone. A tally walks the bus past every cell and adds a number only where the train stands, so the ten-digit dial reads $0 + 9 = 9$; running the routing backwards leaves the wires clean ([@thm-ch38-reversible-qram-correctness]). The address half $2$, half $5$ fetches $(\lvert 010, 4\rangle + \lvert 101, 9\rangle)/\sqrt{2}$ with weights $0.5$ each; the query matrix is unitary and the same theorem covers any amplitudes. For the marks the film switches to a different circuit, three-state bucket-brigade routers ($W$ wait, $0$ left, $1$ right), and magenta rings mark the active routers: with one bottom router silent, $110$ and $111$ carry the same labels, while the bottom row alone gives all eight addresses different patterns, which is the exact condition of [@thm-ch38-profile-separation]. Every number in the film is computed on screen; the theorems give no gate, depth or noise bound, and the three switches per branch are the bucket-brigade literature result of [@rem-ch38-qram-page-wootters-literature], not formalized in this book.
:::

With this split between static memory and lightweight pointer in hand, we turn directly to the five-part hardware anatomy of the observer pointer in [§36.3](ch38-s02-pointer-anatomy.md).
