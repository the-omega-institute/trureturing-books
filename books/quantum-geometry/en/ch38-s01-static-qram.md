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

Across this ontological memory array, every holographic field slice $\lvert\Phi(x)\rangle_{\mathrm{mem}}$ at lattice address $x \in \mathbb{Z}^6$ abides timelessly at its coordinate—**ontological data cells neither arise nor perish, neither wax nor wane, nor ever shift by a nanometer; what glides across the static crystal, selects addresses, and lights up lived reality is the observer memory pointer `ptr`.** External literature models on timeless clock entanglement and quantum memory routing trees are recorded strictly below:

::: {.remark #rem-ch38-qram-page-wootters-literature title="Timeless Clock-System Entanglement and Bucket-Brigade QRAM Routing Trees (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two foundational theoretical-physics and quantum-computer-architecture models compared alongside our ontological memory-pointer `MODEL` belong to external classical literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Timeless Clock–System Entanglement Formalism (D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885–2892, 1983)**: Under a timeless global constraint $H\lvert\mathbf{\Psi}\rangle = 0$ with zero external coordinate time, a static global eigenstate $\lvert\mathbf{\Psi}\rangle = \sum_t \lvert t\rangle_C \otimes \lvert\psi(t)\rangle_S$ entangles a clock register $C$ with a system register $S$; apparent dynamical evolution arises relationally by conditioning on the clock pointer reading $\lvert t\rangle_C$ via $\lvert\psi(t)\rangle_S = \langle t\rvert_C \lvert\mathbf{\Psi}\rangle$;
2. **Bucket-Brigade Quantum Random Access Memory (V. Giovannetti, S. Lloyd & L. Maccone, *Phys. Rev. Lett.* **100**, 160501, 2008)**: For an array of $N = 2^n$ memory cells, conventional fanout decoders toggle $\Theta(N)$ transistor switches per query, a switch count exponential in address width $n$; bucket-brigade QRAM places three-state (`wait / left / right`) routing switches at the nodes of a depth-$n$ binary tree so that an $n$-qubit superposition address $\sum_{x \in \{0,1\}^n} \alpha_x \lvert x\rangle_{\mathrm{addr}} \otimes \lvert 0\rangle_{\mathrm{data}}$ activates only $O(n) = O(\log N)$ switches along each active root-to-leaf path to perform coherent superposition readout $\sum_{x \in \{0,1\}^n} \alpha_x \lvert x\rangle_{\mathrm{addr}} \otimes \lvert D_x\rangle_{\mathrm{data}}$. This counts active nodes per branch; the full tree still requires $O(N)$ hardware. Decoherence costs depend on noise and implementation as well as path length.
:::

Alongside that physical proposal with three-state routers, we can distinguish a Boolean reversible network defined gate by gate. S. Arunachalam, V. Gheorghiu, T. Jochym-O'Connor, M. Mosca, and P. V. Srinivasan (*New J. Phys.* **17**, 123010, 2015, [Section IV, Figure 9, and equation (11)](https://doi.org/10.1088/1367-2630/17/12/123010)) implement binary routing with Toffoli and CNOT gates, then read classical memory and reverse the routing. The formalization below follows that Boolean construction and extends readout to any additive commutative group. Its scope is distinct from the physical three-state bucket-brigade architecture above.

First specify the addresses, wires, and initialization. For every natural depth $n$, including $n=0$, write $A_n=\operatorname{Address}(n)$ and $W_n=\operatorname{Wires}(n)$, defined recursively by

$$
\begin{aligned}
A_0&=\operatorname{Unit}, & A_{n+1}&=\operatorname{Bool}\times A_n,\\
W_0&=\operatorname{Bool}, & W_{n+1}&=W_n\times W_n.
\end{aligned}
$$

$\operatorname{Unit}$ has one element $()$, the empty address; $\operatorname{Bool}=\{\mathrm{false},\mathrm{true}\}$. A leading address bit of $\mathrm{false}$ selects the left subregister and $\mathrm{true}$ the right. The function `root` reads the leftmost input wire; `clean` puts the enable value $e$ on that wire and $\mathrm{false}$ on every scratch wire:

$$
\begin{aligned}
\operatorname{root}(0,w)&=w,\\
\operatorname{root}(n+1,(l,t))&=\operatorname{root}(n,l),\\
\operatorname{clean}(0,e)&=e,\\
\operatorname{clean}(n+1,e)&=(\operatorname{clean}(n,e),\operatorname{clean}(n,\mathrm{false})).
\end{aligned}
$$

The parent enable is reused as the left output, without a separate register for every intermediate node. The function `leaf n w i` follows the bits of $i$ left or right to read one Boolean wire; at depth zero it simply reads $w$. In contrast, `route n a : Equiv.Perm (Wires n)` is the wire permutation defined by the actual gate network. It is the identity at depth zero. At depth $n+1$, it first applies `split` using the leading address bit $b$, then recursively routes both subregisters using the same remaining address. If the two root wires initially hold $x,y$, the split first applies a Toffoli to obtain $y'=y\oplus(b\land x)$, then a CNOT to obtain $(x\oplus y',y')$, where $\oplus$ denotes XOR; all other wires are untouched. Both steps have inverses on every wire configuration, without a clean-scratch precondition.

Fix a classical memory $D:A_n\to G$, where $G:\operatorname{Type}$ is any additive commutative group (`[AddCommGroup G]`). The function `readAmount n D w` recursively adds the contributions of the left subtree and then the right. Equivalently,

$$
\operatorname{readAmount}(n,D,w)=\sum_{i\in A_n}
\begin{cases}
D(i),&\operatorname{leaf}(n,w,i)=\mathrm{true},\\
0,&\operatorname{leaf}(n,w,i)=\mathrm{false}.
\end{cases}
$$

The corresponding reversible operation `readLeaves n D` lets each leaf wire control the bus translation $r\mapsto r+D(i)$, adding nothing when the wire is false. At every fork it reads the entire left subtree before the right, serially using the same bus and preserving all wires. The permutation `query n D` acts on $A_n\times(W_n\times G)$: it preserves the address $a$ and applies `route n a`, `readLeaves n D`, and `(route n a).symm` in that order. Thus it is defined on dirty scratch wires and arbitrary initial bus values as well. Boolean XOR readout is the choice $G=\mathbb Z/2\mathbb Z$; arbitrary additive commutative groups are the mathematical extension used here.

Only when introducing finite matrices do we additionally require a finite-type instance and decidable equality for $G$ (`[Fintype G] [DecidableEq G]`). With $S_n=A_n\times(W_n\times G)$, the complex matrix `queryMatrix n D` has rows and columns indexed by $S_n$ and is obtained by applying `Matrix.permMatrixHom` directly to `query n D`. Its convention sends a basis state $t$ forward to $\operatorname{query}(n,D)(t)$, so an amplitude function $f:S_n\to\mathbb C$ pulls back along the inverse permutation:

$$
\bigl(\operatorname{queryMatrix}(n,D)f\bigr)(s)
=f\bigl(\operatorname{query}(n,D)^{-1}(s)\bigr).
$$

Here `ᴴ` denotes conjugate transpose, `*ᵥ` matrix–vector multiplication, and `1` the identity matrix on $S_n$; triples $(a,w,r)$ below abbreviate $(a,(w,r))$.

For any complex amplitude function $\psi:A_n\times G\to\mathbb C$, `initialized n ψ` embeds it into the workspace with the root enabled and every scratch wire false:

$$
\operatorname{initialized}(n,\psi)(a,w,r)=
\begin{cases}
\psi(a,r),&w=\operatorname{clean}(n,\mathrm{true}),\\
0,&w\ne\operatorname{clean}(n,\mathrm{true}).
\end{cases}
$$

There is no normalization requirement on $\psi$ or requirement that the bus start at zero; the address and bus may have arbitrary joint complex amplitudes.

::: {.theorem #thm-ch38-reversible-qram-correctness title="Arbitrary-Depth Boolean Routing, Reversible Readout, and Full Complex-Amplitude Action" lean="D5/S3/Quantum/Routing/ReversibleQram.correctness"}
In the namespace `D5.S3.Quantum.Routing.ReversibleQram`, the complete statement of `correctness` is as follows (the declaration type is quoted verbatim, without its proof body):

```lean
theorem correctness :
    (∀ (n : ℕ) (a i : Address n) (e : Bool),
      leaf n (route n a (clean n e)) i = if i = a then e else false) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] (D : Address n → G)
      (a : Address n) (w : Wires n) (r : G),
      query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] (D : Address n → G)
      (a : Address n) (r : G),
      query n D (a, clean n true, r) = (a, clean n true, r + D a)) ∧
    (∀ (n : ℕ) (G : Type) [AddCommGroup G] [Fintype G] [DecidableEq G]
      (D : Address n → G),
      (queryMatrix n D)ᴴ * queryMatrix n D = 1 ∧
      queryMatrix n D * (queryMatrix n D)ᴴ = 1 ∧
      ∀ ψ : Address n × G → ℂ,
        queryMatrix n D *ᵥ initialized n ψ =
          initialized n (fun s => ψ (s.1, s.2 - D s.1)))
```

These four clauses hold together as a conjunction:

1. For every $n:\mathbb N$, $a,i:A_n$, and $e:\operatorname{Bool}$, routing a clean input gives leaf $i=a$ the value $e$ and makes every other leaf false. A true root enable produces exactly one true leaf; a false enable produces none.
2. For every $n:\mathbb N$, any additive commutative group $G:\operatorname{Type}$, $D:A_n\to G$, $a:A_n$, arbitrary wire state $w:W_n$, and arbitrary $r:G$, the query preserves $a,w$ and adds `readAmount n D (route n a w)`, the sum of the data at all true leaves after routing, to the bus.
3. For every $n:\mathbb N$, any additive commutative group $G:\operatorname{Type}$, $D:A_n\to G$, $a:A_n$, and arbitrary $r:G$, the query starting from `clean n true` restores both the root enable and every scratch wire and changes the bus to $r+D(a)$.
4. For every $n:\mathbb N$, every $G:\operatorname{Type}$ with `[AddCommGroup G] [Fintype G] [DecidableEq G]`, and every $D:A_n\to G$, let $Q=\operatorname{queryMatrix}(n,D)$. Both $Q^\dagger Q=1$ and $QQ^\dagger=1$ hold; moreover, for every $\psi:A_n\times G\to\mathbb C$, $Q$ sends `initialized n ψ` exactly to `initialized n (fun s => ψ (s.1, s.2 - D s.1))`. Thus the output amplitude at address–bus coordinate $(a,r)$ comes from input $(a,r-D(a))$, and workspace support remains confined to `clean n true`.

The quantifiers include every natural depth, in particular $n=0$ with its unique empty address. The first three clauses do not require $G$ to be finite, and the fourth places no normalization hypothesis on $\psi$.
:::

::: proof
Start with a single split. For initial root wires $(e,\mathrm{false})$, the Toffoli followed by the CNOT gives $(e\land\neg b,e\land b)$. Induction on depth through the actual `route` establishes the separately defined specification `oneHot n a e`: only the leaf selected by $a$ retains $e$. Reading it recursively with `leaf` proves clause 1. At depth zero, routing is the identity and the address type contains only $()$, so the base case needs no positive-depth hypothesis.

Next induct through the serial construction of `readLeaves`. Each controlled translation changes only the bus, and the successive left and right translations yield $r+\operatorname{readAmount}(n,D,w)$. Placing this operation between routing and its inverse restores any original wire state $w$, proving clause 2. For `clean n true`, the one-hot specification reduces the data sum to $D(a)$, proving clause 3. Restoration includes the true root enable as well as every false scratch wire.

Finally, `query` permutes the entire basis configuration set. Its inverse corresponds to the adjoint of the complex permutation matrix, and either order of composition gives the identity. Amplitudes require the inverse query: the preimage of a clean output $(a,\operatorname{clean}(n,\mathrm{true}),r)$ is $(a,\operatorname{clean}(n,\mathrm{true}),r-D(a))$, which explains the minus sign in clause 4. At a dirty output workspace, the inverse query preserves that workspace too, where `initialized` has zero amplitude. The equality therefore holds on the entire basis configuration set, rather than only for one basis state or a special address superposition. The full proof is checked by the Lean kernel.
:::

[@thm-ch38-reversible-qram-correctness] concerns an **ideal reversible Boolean network on fixed classical data and its complex linear action**. The definition of `route` applies gates recursively to both subtrees, and `readLeaves` visits every leaf serially. The theorem supplies no $O(\log N)$ bound on total query circuit depth, gate count, or noise cost, and establishes neither physical bus locality, a three-state `wait / left / right` router implementation, nor copying of unknown quantum memory. Section IV of Arunachalam et al. itself warns that its bus interacts with all memory bits and may not be physically realistic. The literature's count of active nodes per branch, the Page–Wootters mechanism, and the observer–cosmic-memory `MODEL` interpretation retain their separate evidential boundaries. The six-switch illustration below still depicts a path in the physical bucket-brigade proposal above; it is not a complete gate schedule for this theorem.

The Boolean network must also be distinguished from a three-state construction with actual spatial modes. Hann, Lee, Girvin and Jiang, [arXiv:2012.05340v2](https://arxiv.org/pdf/2012.05340v2), Section II.B and Figure 1(b), the sequential schedule in Appendix A, and Appendix B equation (B1), supply the ideal construction used here. All names below belong to `D5.S3.Quantum.Routing.HannSpatialQram`. Addresses use the same $A_n$ as above; the remaining states and operations are separate from the Boolean network.

The basis labels are $Q=\{W,0,1\}$, with `encode false = zero` and `encode true = one`. For a router $W$ means waiting; for a spatial mode it means vacuum. The first coordinate of `Tree n = Q × Interior n` is the incident mode, `Interior 0 = Unit`, and `Interior (n+1) = Q × Tree n × Tree n`: the first factor is the router, and the two child incident modes are exactly the parent's left and right output modes, without additional copies. A full basis configuration is `State n = (Fin n → Q) × Q × Tree n`, comprising distinct address slots, a separate external bus, and the spatial tree. The state `vacuum` sets every router and mode to $W$.

The gate `absorb` is a full three-state SWAP between incident mode and router. The operation `route` first swaps incident and left output when the router is $0$, then incident and right output when it is $1$. These are literal permutations even on arbitrary dirty basis configurations. The fixed sequential schedule `load n k` exchanges each of the first $k$ address slots with the root incident mode and passes it through the programmed levels to its waiting router; its schedule depends on depth and indices, never on address values. In `loading n a p k`, consumed address slots are $W$, the remaining slots retain their encoded address bits, the external bus retains any $p\in Q$, and `programmed n a k` stores the first $k$ bits only in the routers on the address prefix path. All spatial modes and other routers are $W$.

The operation `transport n` applies local controlled SWAPs down the tree to carry the root incident payload to a spatial leaf. The state `arrived n a p` retains the fully programmed routers, places $p$ only at leaf $a$, and leaves all other modes $W$; `leaf` observes an actual leaf mode. For fixed classical memory $D:A_n\to\operatorname{Bool}$, `readLeaves n D` applies equation (B1)'s $\widetilde X^{D(i)}$ at every leaf: a true datum exchanges $0$ and $1$, and $W$ is always fixed. The operation `forward n` fully loads the address, exchanges the external bus with the root incident mode, then transports it. The query `query n D` consists of this forward operation, leaf readout, and the exact inverse of the forward operation. Define `clean n a b = loading n a (encode b) 0`.

Write $S_n=\operatorname{State}(n)$ and $Q_{n,D}=\operatorname{queryMatrix}(n,D)$ for the complex permutation matrix of `query` on all of $S_n$. For arbitrary $\psi:A_n\times\operatorname{Bool}\to\mathbb C$, its initialized embedding is

$$
\begin{aligned}
&\operatorname{initialized}(n,\psi)(s)\\
&\quad=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
\begin{cases}\psi(a,b),&s=\operatorname{clean}(n,a,b),\\0,&\text{otherwise}.\end{cases}
\end{aligned}
$$

::: {.theorem #thm-ch38-spatial-qutrit-qram-correctness title="All-Depth Sequential Spatial Qutrit QRAM: Loading, Transport, and Clean Lookup" lean="D5/S3/Quantum/Routing/HannSpatialQram.correctness"}
In the namespace above, the complete declaration type of `correctness` is:

```lean
correctness :
    (∀ (n : ℕ) (a : Address n) (b : Qutrit) (k : ℕ), k ≤ n →
      load n k (loading n a b 0) = loading n a b k) ∧
    (∀ (n : ℕ) (a : Address n) (p : Qutrit),
      transport n (input n (programmed n a n) p) = arrived n a p ∧
      ∀ i : Address n, leaf n (transport n (input n (programmed n a n) p)) i =
        if i = a then p else wait) ∧
    (∀ (n : ℕ) (D : Address n → Bool) (a : Address n) (b : Bool),
      query n D (clean n a b) = clean n a (xor b (D a))) ∧
    (∀ (n : ℕ) (D : Address n → Bool),
      (queryMatrix n D)ᴴ * queryMatrix n D = 1 ∧
      queryMatrix n D * (queryMatrix n D)ᴴ = 1 ∧
      ∀ ψ : Address n × Bool → ℂ,
        queryMatrix n D *ᵥ initialized n ψ =
          initialized n (fun s => ψ (s.1, xor s.2 (D s.1))))
```

The four conjuncts state:

1. For every $n\in\mathbb N$, $a\in A_n$, external bus label $p\in Q$, and natural $k\le n$, `load n k (loading n a p 0) = loading n a p k`.
2. For every $n\in\mathbb N$, $a\in A_n$, and $p\in Q$, `transport n (input n (programmed n a n) p) = arrived n a p`; moreover, for every $i\in A_n$, the transported `leaf` value is $p$ if $i=a$ and $W$ otherwise.
3. For every $n\in\mathbb N$, $D:A_n\to\operatorname{Bool}$, $a\in A_n$, and either Boolean input bus value $b$,

   $$
   \begin{aligned}
   &\operatorname{query}(n,D)(\operatorname{clean}(n,a,b))\\
   &\quad=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)).
   \end{aligned}
   $$
4. For every $n\in\mathbb N$ and $D:A_n\to\operatorname{Bool}$, both $Q_{n,D}^\dagger Q_{n,D}=1$ and $Q_{n,D}Q_{n,D}^\dagger=1$ hold on all of $S_n$; for every complex amplitude function $\psi:A_n\times\operatorname{Bool}\to\mathbb C$,

   $$
   \begin{aligned}
   &Q_{n,D}\operatorname{initialized}(n,\psi)\\
   &\quad=\operatorname{initialized}\bigl(n,(a,b)\mapsto\\
   &\qquad\quad\psi(a,b\mathbin{\oplus}D(a))\bigr)
   \end{aligned}
   $$

   without a normalization assumption.

Every quantifier includes $n=0$: there are no address slots or routers, but there is one empty address and one spatial leaf, and the query still exchanges the bus, reads, and returns it. Clauses 1 and 2 allow payload $W$, in which case every transported leaf is vacuum; Clauses 3 and 4 use the two encoded Boolean bus labels.
:::

::: proof
Induct first over the number of injections. Local full SWAPs send the next address bit through the programmed prefix into its waiting router, extend that prefix, clear the incident and output modes traversed, and leave the unselected subtree in vacuum. This proves the full `loading` state for every $k\le n$, rather than only the final router values. Induction over the spatial tree's controlled SWAPs then gives the full `arrived` state for every qutrit payload and the value at each leaf. Leaf readout fixes vacuum and changes only the occupied label to `encode (b XOR D(a))`. Reversing the complete forward gate sequence restores the address slots, bus position, every waiting router and every vacuum spatial mode. The unique leaf at depth zero supplies the concrete base of both inductions.

Finally, the actual query permutation's complex matrix satisfies both adjoint identities on the entire basis space. On initialized support, its inverse permutation pulls back arbitrary joint address–bus amplitudes; XOR's self-inverse property yields Clause 4. The full proof is checked by the Lean kernel.
:::

The theorem [@thm-ch38-spatial-qutrit-qram-correctness] verifies this **ideal spatial qutrit circuit with fixed classical data and sequential loading**. It does not identify its dirty-configuration permutation with Appendix A's pipelined Figure 10 schedule, or the earlier architecture's fiducial qubit $f$ with $W$. It gives no microscopic Hamiltonian, hardware realization, noise, resource, depth, or global superposition activation bound, and does not copy unknown quantum states. The separate Boolean network with general additive-group readout, the Page–Wootters literature mechanism, the 2008 architecture's per-branch path count, and the observer–universe `MODEL` retain their respective boundaries. The following figure remains a path illustration of that architectural literature.

::: {.viz src="pointer-ontology-deref" preset="qram_tree" height="500"}
**One address sets only the 6 switches on one path.** Address 41 = 101001₂ enters at the root and each tick sets one level by one bit: after six ticks the cyan path reaches cell 42, and only these 6 of the 63 switches light up; at the same moment the amber scan head at the bottom has read just 6 cells. The depth and the switch count follow the bucket-brigade QRAM of [@rem-ch38-qram-page-wootters-literature] (literature result, not formalized in this book).
:::

Start with a hand calculation at depth one in the Hann sequential spatial circuit above. The two addresses are $a_0=(\mathrm{false},())$ and $a_1=(\mathrm{true},())$, the input bus is $\mathrm{false}$, and each address has amplitude $1/\sqrt2$; the classical memory $D$ is arbitrary and fixed. After the complete load, the sole router has label $0$ or $1$, respectively. For $0\le q\le1$, use an orthonormal basis $e_*,e_W,e_0,e_1$ of a four-dimensional environment to store one local record:

$$
\begin{aligned}
r_0&=\sqrt q\,e_*+\sqrt{1-q}\,e_0,\\
r_1&=\sqrt q\,e_*+\sqrt{1-q}\,e_1.
\end{aligned}
$$

Each record has norm $1$, and their cross overlap is $q$. Continuing through the original ideal gates gives the two orthogonal output basis vectors $\lvert o_i\rangle=\lvert\operatorname{clean}(1,a_i,D(a_i))\rangle$: since the input bus is false, its XOR with $D(a_i)$ is simply $D(a_i)$. The joint system–environment vector is

$$
\frac{\lvert o_0\rangle\otimes r_0
+\lvert o_1\rangle\otimes r_1}{\sqrt2}.
$$

Ignoring the environment means summing the record outer product attached to each system matrix entry over the environment basis. In the output basis $(o_0,o_1)$, the record overlap matrix $K_{1,q}$, the reduced state, and the coordinates of the ideal vector are

$$
\begin{aligned}
K_{1,q}&=\begin{pmatrix}1&q\\q&1\end{pmatrix},\\
\rho_{\mathrm{out}}&=\frac12 K_{1,q},\\
u&=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}.
\end{aligned}
$$

The **squared fidelity** with this ideal pure state is $F=u^\dagger\rho_{\mathrm{out}}u$, so

$$
\begin{aligned}
F&=\frac{1+q+q+1}{4}\\
 &=\frac{1+q}{2}.
\end{aligned}
$$

At $q=1/2$, this gives $F=3/4$. The quantity calculated here is the squared fidelity itself; no further square root is taken.

Fix the noise scope precisely. After the actual sequential load `load n n` of [@thm-ch38-spatial-qutrit-qram-correctness], apply the same local record coupling once, independently at every actual internal router. Then perform the original bus exchange, spatial transport, fixed classical leaf readout, and inverse of the complete forward circuit. All gates, address slots, the external bus, and spatial rails remain ideal. The preceding ideal reversible Boolean network, the ideal Hann spatial qutrit circuit, and this circuit with a single router hold are three separately specified finite objects. The literature path illustration above retains the interpretation given in [@rem-ch38-qram-page-wootters-literature].

To specify the complete output, retain the previously defined $A_n$, $Q=\{W,0,1\}$, and $S_n=\operatorname{State}(n)$. Let $n\in\mathbb N$, including $0$, $N=2^n$, $q\in[0,1]$, and let $D:A_n\to\operatorname{Bool}$ be any fixed classical memory. The notation below abbreviates objects in `HannRouterDephasing`; `load`, `clean`, `initialized`, and the remaining circuit operations retain their `HannSpatialQram` definitions above.

Each router's environment coordinates are $\{*\}\sqcup Q$: `none` and `some s` in `Option Qutrit`. For any label $s\in Q$, write

$$
r_s=\sqrt q\,e_*+\sqrt{1-q}\,e_s.
$$

Its coordinate $r_s(e)$ is exactly `localRecord q s e`. For a complex $Q\times Q$ matrix $X$, let $\operatorname{diag}_Q(X)$ retain only the diagonal entries in the $W,0,1$ basis, and let $\mathcal E_q(X)$ be the local marginal matrix obtained by multiplying each $X_{st}$ by $\sum_e r_s(e)\overline{r_t(e)}$. The basis index set $\mathcal E_n$ for all independent environments is `Environment n`:

$$
\begin{aligned}
\mathcal E_0&=\operatorname{Unit},\\
\mathcal E_{n+1}&=(\{*\}\sqcup Q)
\times\mathcal E_n\times\mathcal E_n.
\end{aligned}
$$

Let $I_n$ be the internal router positions of `Tree n`: empty at depth zero, and consisting at each branch of the root router and the two copies of the child positions. Incident and output rails do not belong to $I_n$. For any tree configuration $t$, let $t_v$ be the router label at position $v$. The product record and its overlap in density-matrix orientation are

$$
\begin{aligned}
R_t(e)&=\prod_{v\in I_n}r_{t_v}(e_v),\\
\Omega_q(t,u)&=\sum_{e\in\mathcal E_n}
 R_t(e)\overline{R_u(e)}.
\end{aligned}
$$

These are `environmentRecord` and `recordOverlap`, respectively; the depth-zero product is $1$. Write $m(t,u)=\#\{v\in I_n:t_v\ne u_v\}$ for `routerMismatch`, which counts only internal router coordinates.

For $s\in S_n$, let $T(s)=s.2.2$ be its spatial-tree projection. Put $L_n=\operatorname{load}(n,n)$ and $P_{n,D}=\operatorname{postLoad}(n,D)$. The latter performs `exchange`, `transport`, `readLeaves n D`, and `(forward n).symm`, in that order, preserving all uninvolved coordinates of the full system at each step. Abbreviate the actual loaded trees and the inverse images by

$$
\begin{aligned}
\tau_{a,b}&=T\bigl(L_n(\operatorname{clean}(n,a,b))\bigr),\\
v_s&=P_{n,D}^{-1}(s),\\
w_s&=L_n^{-1}(v_s).
\end{aligned}
$$

For any joint complex amplitudes $\psi:A_n\times\operatorname{Bool}\to\mathbb C$, let $\alpha_\psi=\operatorname{initialized}(n,\psi)$. Define the joint amplitudes $J_\psi$ and the system matrix $\rho_{\mathrm{out}}$ on the complete physical basis:

$$
\begin{aligned}
J_\psi(s,e)&=\alpha_\psi(w_s)R_{T(v_s)}(e),\\
\rho_{\mathrm{out}}(s,t)
 &=\Omega_q\bigl(T(v_s),T(v_t)\bigr)\\
 &\quad\cdot\alpha_\psi(w_s)
 \overline{\alpha_\psi(w_t)}.
\end{aligned}
$$

These are exactly `jointOutput n q D ψ` and `noisyOutput n q D ψ`. The records attach to the actual router configuration after loading and before the ideal continuation. The next theorem gives their environment partial-trace relationship.

The function `addressWord n a` writes an address as a length-$n$ Boolean word in the actual loading order, with the first bit first: the empty address gives the empty word, and $(c,a)$ prepends $c$ to the tail address word. Let $\ell(a,a')$ be the length of their longest common prefix, namely the length of `BinaryWordGeometry.lcp`. Define

$$
\begin{aligned}
d_n(a,a')&=\begin{cases}
0,&a=a',\\
2(n-\ell(a,a'))-1,&a\ne a',
\end{cases}\\
K_{n,q}(a,a')&=\begin{cases}
1,&a=a',\\
q^{2(n-\ell(a,a'))-1},&a\ne a'.
\end{cases}
\end{aligned}
$$

Here $K_{n,q}$ is the real-valued `kernel`. Distinct addresses have $\ell<n$, so their exponent is a positive integer. Equal addresses have the separately specified value $1$, including at $q=0$ and at the unique empty address.

Write $\mathcal C_n=\{\operatorname{clean}(n,a,b):a\in A_n,\ b\in\operatorname{Bool}\}$. Label the ideal output by the input address and bus:

$$
\begin{aligned}
o_{a,b}&=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)),\\
\lvert\phi_\psi\rangle
 &=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 \psi(a,b)\lvert o_{a,b}\rangle.
\end{aligned}
$$

Here $o_{a,b}$ is `outputBasis n D (a,b)`, and $\phi_\psi:S_n\to\mathbb C$ is the full coordinate vector `idealOutput n D ψ`. Define the address weights, the real quadratic form, and the squared fidelity by

$$
\begin{aligned}
p_a&=\sum_{b\in\operatorname{Bool}}|\psi(a,b)|^2,\\
E_{n,q}(p)&=\sum_{a\in A_n}\sum_{a'\in A_n}
 p_a p_{a'}K_{n,q}(a,a'),\\
F_{n,q,D}(\psi)
 &=\langle\phi_\psi\rvert\rho_{\mathrm{out}}
 \lvert\phi_\psi\rangle\\
 &=\sum_{s,t\in S_n}\overline{\phi_\psi(s)}
 \rho_{\mathrm{out}}(s,t)\phi_\psi(t).
\end{aligned}
$$

These are `addressProbability`, `addressEnergy`, and `squaredFidelity`, respectively; $|z|^2$ is `Complex.normSq z`. The condition `Normalized n ψ` means

$$
\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 |\psi(a,b)|^2=1.
$$

No factorization of $\psi(a,b)$ into separate address and bus amplitudes is required. Finally, write `minimumFidelity n q` as

$$
\begin{aligned}
f_n(q)&=\frac{1+\displaystyle\sum_{j=0}^{n-1}
 2^j q^{2j+1}}{2^n}\\
 &=2^{-n}\left(1+\sum_{j=1}^{n}
 2^{j-1}q^{2j-1}\right),
\end{aligned}
$$

where both sums are empty at $n=0$. Write $h_n$ for `uniformInput n`: $h_n(a,b)=1/\sqrt{2^n}$ when $b=\mathrm{false}$ and $0$ when $b=\mathrm{true}$.

::: {.theorem #thm-ch38-single-hold-router-dephasing title="A Single Router Hold: Dephasing, Complete Output, and Sharp Squared Fidelity" lean="D5/S3/Quantum/Routing/HannRouterDephasing.result"}
For every $n\in\mathbb N$, $q\in[0,1]$, and fixed classical memory $D:A_n\to\operatorname{Bool}$, use the actual load, independent local records, and original ideal continuation specified above. The following hold.

1. For any complex $Q\times Q$ matrix $X$, the local environment partial trace gives the channel

   $$
   \mathcal E_q(X)=qX+(1-q)\operatorname{diag}_Q(X),
   $$

   where $\operatorname{diag}_Q$ retains only the diagonal entries in the $W,0,1$ basis. Entrywise, for every $s,t\in Q$,

   $$
   \begin{aligned}
   &\left(\sum_{e\in\{*\}\sqcup Q}
   r_s(e)\overline{r_t(e)}\right)X_{st}\\
   &\quad=qX_{st}+(1-q)
   \begin{cases}X_{st},&s=t,\\0,&s\ne t.\end{cases}
   \end{aligned}
   $$

   For every $t\in\operatorname{Tree}(n)$, $\Omega_q(t,t)=1$.

2. For all $a,a'\in A_n$ and $b,b'\in\operatorname{Bool}$, the actual loaded trees satisfy

   $$
   \begin{aligned}
   m(\tau_{a,b},\tau_{a',b'})&=d_n(a,a'),\\
   \Omega_q(\tau_{a,b},\tau_{a',b'})&=K_{n,q}(a,a').
   \end{aligned}
   $$

   The right sides are independent of both bus labels; the real number $K_{n,q}$ is naturally embedded in the complex equality.

3. For arbitrary complex amplitudes $\psi$, without requiring normalization, the complete environment partial trace satisfies, for all $s,t\in S_n$,

   $$
   \sum_{e\in\mathcal E_n}
   J_\psi(s,e)\overline{J_\psi(t,e)}
   =\rho_{\mathrm{out}}(s,t).
   $$

   For all $a,a',b,b'$, every clean output matrix entry is

   $$
   \begin{aligned}
   &\rho_{\mathrm{out}}(o_{a,b},o_{a',b'})\\
   &\quad=\psi(a,b)\overline{\psi(a',b')}
   K_{n,q}(a,a').
   \end{aligned}
   $$

   If $s\notin\mathcal C_n$ or $t\notin\mathcal C_n$, then $\rho_{\mathrm{out}}(s,t)=0$. Thus the matrix is supported on the span of the clean output basis vectors.

4. If $\psi$ is normalized, the complete ideal output vector is normalized too, and the squared fidelity is real and satisfies

   $$
   \begin{aligned}
   \sum_{s\in S_n}|\phi_\psi(s)|^2&=1,\\
   F_{n,q,D}(\psi)&=E_{n,q}(p)\\
   &=\sum_{a,a'\in A_n}p_a p_{a'}K_{n,q}(a,a')\\
   &\ge f_n(q).
   \end{aligned}
   $$

5. The input $h_n$ is normalized, and for every address $a$,

   $$
   \begin{aligned}
   h_n(a,\mathrm{false})&=2^{-n/2},\\
   h_n(a,\mathrm{true})&=0,\\
   F_{n,q,D}(h_n)&=f_n(q),\\
   f_0(q)&=1.
   \end{aligned}
   $$

   The amplitude $2^{-n/2}$ is positive and real. This input attains the bound for every $n,q,D$ above.
:::

::: proof
First use correctness of the actual `load n n` to identify its tree projection with `programmed n a n`. Equal addresses give equal routers throughout. If distinct addresses share a prefix of length $\ell$, their first $\ell$ routers agree. At the first differing bit, one router stores $0$ and the other stores $1$, contributing one mismatch. Beyond that point the paths enter disjoint subtrees. Each tail contains $n-\ell-1$ occupied routers, while the other configuration has the waiting label $W$ at those positions. The total mismatch count is therefore

$$
1+2(n-\ell-1)=2(n-\ell)-1.
$$

The bus remains in its separate external coordinate during loading, so neither $b$ nor $b'$ enters the count. A local record overlap is $1$ for equal labels and $q$ for unequal labels. Independence multiplies these overlaps, giving $K_{n,q}$ on actual loaded trees and self-overlap $1$ on every tree. The local matrix-entry identity also gives $qX+(1-q)\operatorname{diag}_Q(X)$ directly.

Keep the environment records fixed and apply the original $P_{n,D}$ to the system alone. The ideal query sends each clean input to $o_{a,b}$. Pulling amplitudes back along the inverse permutations on the complete system basis gives precisely the definitions of $J_\psi$ and $\rho_{\mathrm{out}}$. Summing over the environment coordinates proves the partial-trace identity. Initialized amplitudes vanish outside the clean input basis, and the ideal query maps that basis bijectively onto the clean output basis. This determines every clean entry and every zero entry outside its span.

Substituting the ideal vector into the complete system double sum gives $|\psi(a,b)|^2|\psi(a',b')|^2K_{n,q}(a,a')$ for each pair of input labels. Summing independently over both bus labels leaves $p_a p_{a'}$, yielding the exact real quadratic form. No independence of address and bus amplitudes is assumed.

For the bound, induct on the binary-tree depth. Split real address weights at depth $n+1$ by their first bit into $p_0,p_1$, with masses $s=\sum_a p_0(a)$ and $t=\sum_a p_1(a)$, and put $c=q^{2n+1}$. Within a branch the kernel is the depth-$n$ kernel; between branches it is the constant $c$. Hence

$$
\begin{aligned}
E_{n+1,q}(p)&=E_{n,q}(p_0)+E_{n,q}(p_1)\\
 &\quad+2cst,\\
f_{n+1}(q)&=\frac{f_n(q)+c}{2}.
\end{aligned}
$$

The induction uses the homogeneous bound $E_{n,q}(p_i)\ge f_n(q)(\sum_a p_i(a))^2$ for arbitrary total mass. Since $0\le q\le1$, the same recurrence gives $f_n(q)\ge c$. The sum of the branch bounds exceeds the required homogeneous bound by the nonnegative remainder

$$
\begin{aligned}
&f_n(q)(s^2+t^2)+2cst\\
&\quad-f_{n+1}(q)(s+t)^2\\
&=\frac{f_n(q)-c}{2}(s-t)^2\ge0.
\end{aligned}
$$

At depth zero the quadratic form is the square of the total mass; normalization sets that mass to $1$ and gives the stated bound. Finally, every kernel row has the same sum:

$$
\begin{aligned}
\sum_{a'\in A_n}K_{n,q}(a,a')
 &=1+\sum_{j=0}^{n-1}2^j q^{2j+1}\\
 &=2^n f_n(q).
\end{aligned}
$$

The uniform input $h_n$ has probability $2^{-n}$ at each of the $2^n$ addresses, with total probability $1$. The constant row sum therefore gives $F_{n,q,D}(h_n)=f_n(q)$. This supplies an attaining input and makes the bound sharp. The full proof is checked by the Lean kernel.
:::

Substitution into the finite sum gives the closed endpoints $f_n(0)=2^{-n}$ and $f_n(1)=1$. For any normalized input, $q=0$ removes only terms between distinct addresses, giving $F=\sum_a p_a^2$, with uniform address weights attaining $2^{-n}$. At $q=1$ every kernel entry is $1$, so $F=(\sum_a p_a)^2=1$. At $n=0$ there are no routers; the empty product and empty sum give $F=1$ for every normalized input and all $q\in[0,1]$. These conclusions concern the single independent router hold and otherwise ideal gates specified in [@thm-ch38-single-hold-router-dephasing]. This adds a channel result for the finite Hann circuit above. The ideal Boolean network, ideal Hann query, and external literature retain their stated scopes. The result does not cover gate noise, correlated or repeated holds, or hardware fault tolerance, and does not prove the infinite address ontology or the observer-pointer `MODEL` consequences below.

**Heterogeneous routers: which addresses does the environment distinguish?** The homogeneous hold above assigns the same $q$ to every router. We now vary just this parameter: each actual internal router $v$ has its own $q(v)\in[0,1]$, with one independent record after complete sequential loading, followed by the original ideal continuation. At $q(v)=1$, the local environment retains only its common coordinate and cannot distinguish the router labels. At $q(v)=0$, it distinguishes $W,0,1$ completely. The number of addresses can therefore exceed the number of distinct environment records. To describe this degeneracy, we first identify the physical coordinates being recorded, then group addresses with identical visible labels.

::: {.definition #def-ch38-profile-routers title="Actual internal routers and loaded labels" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Router D5/S3/Quantum/Routing/HannRouterProfiles.routerLabel D5/S3/Quantum/Routing/HannRouterProfiles.snoc D5/S3/Quantum/Routing/HannRouterProfiles.deepest D5/S3/Quantum/Routing/HannRouterProfiles.loadedLabel"}
Retain the head-first addresses $A_0=\{()\}$, $A_{m+1}=\operatorname{Bool}\times A_m$, together with $Q=\{W,0,1\}$, the spatial trees, and the complete system basis space $S_n$. The following objects belong to `HannRouterProfiles`; circuit operations still come from `HannSpatialQram`.

Explicitly, $\operatorname{Tree}(m)=Q\times\operatorname{Interior}(m)$, $\operatorname{Interior}(0)=\operatorname{Unit}$, $\operatorname{Interior}(m+1)=Q\times\operatorname{Tree}(m)\times\operatorname{Tree}(m)$, and $S_n=(\operatorname{Fin}(n)\to Q)\times Q\times\operatorname{Tree}(n)$. The first tree coordinate is the incident mode; the first interior coordinate is the router.

The internal router positions are

$$
I_0=\varnothing,\qquad
I_{m+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_m).
$$

This is `Router n`: the root is `none`, and $(c,v)$ is `some (c,v)`, with false selecting the left subtree and true the right. `routerLabel n t v`, written $t_v$, reads only the router field of $t$. Incident modes and output rails are excluded from $I_n$.

Let $L_n=\operatorname{load}(n,n)$, and let $T(s)$ project a system configuration $s$ onto its tree. For $a\in A_n$ and any external qutrit bus label $\beta\in Q$, define

$$
\begin{aligned}
\tau_{a,\beta}&=T\bigl(L_n(\operatorname{loading}(n,a,\beta,0))\bigr),\\
\lambda_{a,\beta}(v)&=(\tau_{a,\beta})_v.
\end{aligned}
$$

The second line is `loadedLabel n a β v`. `snoc m u c` appends a final bit $c$ to $u\in A_m$. The deepest router reached along prefix $u$ is $d_m(u)=\operatorname{deepest}(m,u)\in I_{m+1}$, located recursively in the head-first address order.
:::

Actual loading correctness gives $\tau_{a,\beta}=\operatorname{programmed}(n,a,n)$, so $\lambda_{a,\beta}$ is independent of $\beta$; we also write it as $\lambda_a$. These are the tree coordinates after loading. Routers off the programmed path retain their literal $W$ labels and participate in the environment record as well.

::: {.definition #def-ch38-profile-records title="Heterogeneous local records and the physical tensor environment" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Environment D5/S3/Quantum/Routing/HannRouterProfiles.treeRecord D5/S3/Quantum/Routing/HannRouterProfiles.record"}
Given $q:I_n\to[0,1]$, attach to each position $v$ an environment with orthonormal basis $e_*,e_W,e_0,e_1$, and local record

$$
r_{v,s}=\sqrt{q(v)}\,e_*+\sqrt{1-q(v)}\,e_s,
\qquad s\in Q.
$$

This is `HannRouterDephasing.localRecord (q v) s`. The environment basis indices form $\mathcal E_n=(\{*\}\sqcup Q)^{I_n}$, the `Environment n` of this section. For any $t\in\operatorname{Tree}(n)$, define

$$
\begin{aligned}
\mathcal R_t(e)&=\prod_{v\in I_n}r_{v,t_v}(e_v),\\
R_a(e)&=\prod_{v\in I_n}r_{v,\lambda_{a,W}(v)}(e_v).
\end{aligned}
$$

These are `treeRecord n q t` and `record n q a`, respectively. At $n=0$, the environment has a single basis index, and both empty products equal $1$.

The local coupling sends router basis vector $\lvert s\rangle$ with a blank environment to $\lvert s\rangle\otimes r_{v,s}$. Independent couplings at every position send a tree basis vector to $\lvert t\rangle\otimes\mathcal R_t$, preserving the other system coordinates.
:::

::: {.definition #def-ch38-active-profiles title="Realized active profiles and class records" lean="D5/S3/Quantum/Routing/HannRouterProfiles.SameProfile D5/S3/Quantum/Routing/HannRouterProfiles.Separates D5/S3/Quantum/Routing/HannRouterProfiles.Profile D5/S3/Quantum/Routing/HannRouterProfiles.profile D5/S3/Quantum/Routing/HannRouterProfiles.classRecord"}
A position $v$ is active exactly when $q(v)<1$. For any real function $q:I_n\to\mathbb R$, `SameProfile n q a a' β β'` means

$$
\forall v\in I_n,\quad q(v)<1\ \Longrightarrow\
\lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
$$

`Separates n q` means that this condition implies $a=a'$ for every $a,a'\in A_n$ and $\beta,\beta'\in Q$. Write $\pi(a)$ for the restriction of $\lambda_{a,W}$ to active positions, and $C_{n,q}=\pi(A_n)$ for its actual image. These are `profile` and `Profile`. Label assignments realized by no address are absent from $C_{n,q}$.

In the physical range $q(v)\in[0,1]$, the class record $R_c$ is $R_a$ for any representative satisfying $\pi(a)=c$; this is `classRecord`. Members of one class agree at active positions. At every remaining position $q(v)=1$, the record is always $e_*$. Thus the definition is independent of the representative.
:::

::: {.theorem #thm-ch38-profile-separation title="Exact separation criterion at the deepest physical routers" lean="D5/S3/Quantum/Routing/HannRouterProfiles.profile_separation_iff"}
For every $m\in\mathbb N$ and every real function $q:I_{m+1}\to\mathbb R$, with no interval restriction,

$$
\begin{aligned}
&\bigl[\forall a,a'\in A_{m+1},\ \forall\beta,\beta'\in Q,\\
&\qquad\operatorname{SameProfile}(m+1,q,a,a',\beta,\beta')
\ \Longrightarrow\ a=a'\bigr]\\
&\qquad\Longleftrightarrow\quad
\forall u\in A_m,\ q(d_m(u))<1.
\end{aligned}
$$
:::

::: {.proof #pf-ch38-profile-separation}
Write an arbitrary address as $\operatorname{snoc}(m,u,c)$. At the deepest positions, the actual loaded tree satisfies

$$
\lambda_{\operatorname{snoc}(m,u,c),\beta}(d_m(i))
=\begin{cases}\operatorname{encode}(c),&i=u,\\W,&i\ne u.\end{cases}
$$

The two sibling addresses with prefix $u$ agree at every internal router other than $d_m(u)$. If this deepest position is inactive, those distinct addresses have the same active profile, proving necessity. Conversely, suppose every deepest position is active. Observe $d_m(u)$ under the first address prefix: different prefixes produce an encoded label versus $W$, while equal prefixes leave the encoded labels to distinguish the last bits. Loading labels do not depend on the external bus, so the argument allows arbitrary, possibly different, bus labels. This separation criterion is combinatorial; the square roots and normalization of physical records still use the closed interval assumption. The full proof is checked by the Lean kernel.
:::

::: {.definition #def-ch38-profile-gram-energy title="Complex Gram matrix, class coefficient sums, and energies" lean="D5/S3/Quantum/Routing/HannRouterProfiles.gram D5/S3/Quantum/Routing/HannRouterProfiles.classSum D5/S3/Quantum/Routing/HannRouterProfiles.addressEnergy D5/S3/Quantum/Routing/HannRouterProfiles.classEnergy"}
In the physical range above, define the complex Gram matrix in density-matrix orientation by

$$
G(a,a')=\sum_{e\in\mathcal E_n}R_a(e)\overline{R_{a'}(e)}.
$$

This is `gram n q`. For arbitrary complex coefficients $z:A_n\to\mathbb C$, the class coefficient sums are

$$
(\Sigma_qz)_c=\sum_{a:\pi(a)=c}z_a,
$$

the function `classSum`. The same finite sum also applies to real coefficients. For arbitrary real vectors $p:A_n\to\mathbb R$ and $x:C_{n,q}\to\mathbb R$, define

$$
\begin{aligned}
E_q(p)&=\sum_{a,a'\in A_n}p_ap_{a'}\operatorname{Re}G(a,a'),\\
H_q(x)&=\sum_{e\in\mathcal E_n}
\left|\sum_{c\in C_{n,q}}x_cR_c(e)\right|^2.
\end{aligned}
$$

These are `addressEnergy` and `classEnergy`. Here $|z|^2$ means `Complex.normSq z`. The energy definitions themselves impose neither nonnegativity nor a total weight of $1$.
:::

::: {.definition #def-ch38-profile-laws title="Probability simplexes, class masses, and deepest activity" lean="D5/S3/Quantum/Routing/HannRouterProfiles.AddressDistribution D5/S3/Quantum/Routing/HannRouterProfiles.ClassDistribution D5/S3/Quantum/Routing/HannRouterProfiles.classMass D5/S3/Quantum/Routing/HannRouterProfiles.inputDistribution D5/S3/Quantum/Routing/HannRouterProfiles.distributionInput D5/S3/Quantum/Routing/HannRouterProfiles.DeepestActive"}
Let $\Delta(A_n)$ and $\Delta(C_{n,q})$ denote the probability simplexes: nonnegative weights summing to $1$. They are `AddressDistribution` and `ClassDistribution`. The class-mass map `classMass` is

$$
(\pi_*p)_c=\sum_{a:\pi(a)=c}p_a.
$$

For arbitrary joint complex amplitudes $\psi:A_n\times\operatorname{Bool}\to\mathbb C$, let $p^\psi_a=\sum_b|\psi(a,b)|^2$. The input is normalized when $\sum_{a,b}|\psi(a,b)|^2=1$; then $p^\psi\in\Delta(A_n)$ is `inputDistribution`. No product form between address and bus is required. For $p\in\Delta(A_n)$, `distributionInput` is

$$
\psi_p(a,b)=\begin{cases}\sqrt{p_a},&b=\mathrm{false},\\0,&b=\mathrm{true},\end{cases}
$$

with the square root embedded in $\mathbb C$ as a nonnegative real number.

`DeepestActive n q` is true at $n=0$. At $n=m+1$, it means $\forall u\in A_m,\ q(d_m(u))<1$.
:::

::: {.definition #def-ch38-profile-output title="Complete output and squared fidelity of the actual hold" lean="D5/S3/Quantum/Routing/HannRouterProfiles.jointOutput D5/S3/Quantum/Routing/HannRouterProfiles.noisyOutput D5/S3/Quantum/Routing/HannRouterProfiles.squaredFidelity"}
Fix any classical memory $D:A_n\to\operatorname{Bool}$. Retain $P_{n,D}=\operatorname{postLoad}(n,D)$, which performs the original bus exchange, spatial transport, leaf readout, and inverse of the complete forward circuit, in that order. It does not act on the environment. For $s\in S_n$, write

$$
v_s=P_{n,D}^{-1}(s),\qquad w_s=L_n^{-1}(v_s),\qquad
\alpha_\psi=\operatorname{initialized}(n,\psi).
$$

Define the heterogeneous joint amplitudes, complete system density matrix, and squared fidelity by

$$
\begin{aligned}
J^q_\psi(s,e)&=\alpha_\psi(w_s)\mathcal R_{T(v_s)}(e),\\
\rho^q_\psi(s,t)&=\sum_{e\in\mathcal E_n}
J^q_\psi(s,e)\overline{J^q_\psi(t,e)},\\
F^q_D(\psi)&=\sum_{s,t\in S_n}
\overline{\phi_\psi(s)}\rho^q_\psi(s,t)\phi_\psi(t).
\end{aligned}
$$

Here $o_{a,b}=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a))$, and $\phi_\psi=\sum_{a,b}\psi(a,b)\lvert o_{a,b}\rangle$ is the original complete ideal output. These three formulas are this section's `jointOutput`, `noisyOutput`, and `squaredFidelity`. The sums range over the entire physical system $S_n$; only the independent router environments are traced out. The same finite sums define these quantities for unnormalized amplitudes, while their interpretation as state fidelity applies to normalized inputs.

Here $\operatorname{clean}(n,a,b)=\operatorname{loading}(n,a,\operatorname{encode}(b),0)$: the address slots hold the encoded address, the external bus holds the encoded Boolean bit, and the tree is vacuum. Initialization satisfies $\alpha_\psi(\operatorname{clean}(n,a,b))=\psi(a,b)$ and vanishes at every other basis configuration.
:::

::: {.theorem #thm-ch38-physical-profile-event title="Heterogeneous physical profiles, complex coefficient kernel, and all fidelity minimizers" lean="D5/S3/Quantum/Routing/HannRouterProfiles.physical_profile_event"}
For every $n\in\mathbb N$ and every real router function $q:I_n\to\mathbb R$, assume $0\le q(v)\le1$ at every $v\in I_n$. Fix any classical memory $D:A_n\to\operatorname{Bool}$. With the actual loading, one independent record, and original ideal continuation defined above, all of the following hold.

1. **(P1) Actual loaded records for every bus.** For all $a\in A_n$ and $\beta\in Q$, $\mathcal R_{\tau_{a,\beta}}=R_a$, as functions of the entire environment index.
2. **(P2) Record normalization for every tree.** For all $t\in\operatorname{Tree}(n)$, $\sum_e|\mathcal R_t(e)|^2=1$.
3. **(P3) Classes equal exactly when visible labels agree.** For all $a,a'\in A_n$ and $\beta,\beta'\in Q$,

   $$
   \pi(a)=\pi(a')\ \Longleftrightarrow\
   \forall v\in I_n,\ q(v)<1\Rightarrow
   \lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
   $$

4. **(P4) Complex linear independence of class records.** $\{R_c:c\in C_{n,q}\}$ is linearly independent over $\mathbb C$.
5. **(P5) Exact rank.** $\operatorname{rank}_{\mathbb C}G=|C_{n,q}|$.
6. **(P6) Complete kernel for arbitrary complex coefficients.** For every $z:A_n\to\mathbb C$,

   $$
   Gz=0\ \Longleftrightarrow\
   \forall c\in C_{n,q},\ \sum_{a:\pi(a)=c}z_a=0.
   $$

7. **(P7) Full-rank criterion.** $\operatorname{rank}_{\mathbb C}G=2^n$ if and only if `DeepestActive n q`.
8. **(P8) Rank at depth zero.** If $n=0$, then $\operatorname{rank}_{\mathbb C}G=1$.
9. **(P9) Factorization through class masses.** For every $p\in\Delta(A_n)$, $E_q(p)=H_q(\pi_*p)$.
10. **(P10) Pullback of the complete ideal output.** For arbitrary complex amplitudes $\psi$ and every $s\in S_n$, $\phi_\psi(s)=\alpha_\psi(w_s)$, without a normalization assumption.
11. **(P11) Every clean output matrix element.** For arbitrary complex amplitudes $\psi$ and all $a,a'\in A_n$, $b,b'\in\operatorname{Bool}$,

    $$
    \rho^q_\psi(o_{a,b},o_{a',b'})
    =\psi(a,b)\overline{\psi(a',b')}G(a,a').
    $$

12. **(P12) Exact fidelity formula on the complete system.** For arbitrary complex amplitudes $\psi$, $F^q_D(\psi)=E_q(p^\psi)$, with the right side naturally embedded in $\mathbb C$. Normalization is unnecessary for this identity, and the value is real.
13. **(P13) Normalization of both complete vectors.** If $\psi$ is normalized, then

    $$
    \begin{aligned}
    \sum_{s\in S_n}\sum_{e\in\mathcal E_n}|J^q_\psi(s,e)|^2&=1,\\
    \sum_{s\in S_n}|\phi_\psi(s)|^2&=1.
    \end{aligned}
    $$

14. **(P14) Every address law is realizable.** For every $p\in\Delta(A_n)$, $\psi_p$ is normalized, and its `inputDistribution` is exactly $p$.
15. **(P15) Unique class minimizer and complete minimizing fibers.** There exists $\mu^*\in\Delta(C_{n,q})$ such that $H_q(\mu^*)\le H_q(\nu)$ for every $\nu\in\Delta(C_{n,q})$. Any class law also satisfying this minimum condition equals $\mu^*$. The map $\pi_*:\Delta(A_n)\to\Delta(C_{n,q})$ is surjective. For every $p\in\Delta(A_n)$,

    $$
    \begin{aligned}
    &[\forall r\in\Delta(A_n),\ E_q(p)\le E_q(r)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p=\mu^*.
    \end{aligned}
    $$

    For every normalized joint input $\psi$,

    $$
    \begin{aligned}
    &[\forall\varphi\ \text{normalized},\
    \operatorname{Re}F^q_D(\psi)\le\operatorname{Re}F^q_D(\varphi)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p^\psi=\mu^*.
    \end{aligned}
    $$

    All minimizing address laws form the entire set defined by $p_a\ge0$, $\sum_ap_a=1$, and $\sum_{a:\pi(a)=c}p_a=\mu^*_c$. Neither class weights nor address weights are required to be strictly positive.
:::

::: {.proof #pf-ch38-physical-profile-event}
The actual loaded tree is the completely programmed tree, immediately giving the independence from arbitrary external qutrit bus labels in P1 and P3. For any two local labels $s,t$, multiplication of the four environment coordinates gives

$$
\sum_\eta r_{v,s}(\eta)\overline{r_{v,t}(\eta)}
=\begin{cases}1,&s=t,\\q(v),&s\ne t.\end{cases}
$$

Equal labels contribute $q(v)+(1-q(v))=1$; distinct labels share only the common coordinate. The finite tensor product multiplies these node overlaps. Every tree record consequently has norm $1$, giving P2. The address Gram entry can also be read directly as $\prod_{v:\lambda_a(v)\ne\lambda_{a'}(v)}q(v)$. Empty products preserve depth zero and both endpoints; no division by any $q(v)$ is needed.

For P4, choose an actual environment basis index $e^{(c)}$ for each realized class $c$: select its label coordinate at every active node, and the common coordinate elsewhere. Then

$$
\begin{aligned}
R_d(e^{(c)})&=\begin{cases}\delta_q,&d=c,\\0,&d\ne c,\end{cases}\\
\delta_q&=\prod_{v:q(v)<1}\sqrt{1-q(v)}>0.
\end{aligned}
$$

Evaluation at this coordinate isolates the coefficient of class $c$ in any complex linear combination of class records. Let the column matrix be $M(e,a)=R_a(e)$. Every record coordinate is real, so the density-oriented $G$ here also equals $M^\dagger M$. The Gram matrix and the column matrix have the same kernel and rank, while

$$
\sum_a z_aR_a=\sum_c(\Sigma_qz)_cR_c.
$$

Class-record independence and surjectivity of $\pi$ onto its actual image now give P5 and P6. By [@thm-ch38-profile-separation], injectivity of the class map at positive depth is equivalent to activity of every deepest router, giving P7. At depth zero there is only the empty address with its unit record, so $G=(1)$ and P8 follows; `DeepestActive` adds no condition there.

Group the real address coefficients by class. The squared norm of the resulting record superposition is precisely $E_q$, proving P9. For every real vector $x\ne0$, class-record independence also gives $H_q(x)>0$. Expansion of the squared norm yields the midpoint gap

$$
H_q\!\left(\frac{x+y}{2}\right)
=\frac{H_q(x)+H_q(y)}2-\frac{H_q(x-y)}4.
$$

The class simplex is nonempty and compact, and $H_q$ is continuous, so a minimum exists. If two distinct minimizers existed, their midpoint would remain in the simplex and the displayed identity would strictly lower the energy. The minimizing class law is therefore unique. This argument does not require it to lie in the simplex interior.

Every class has a representative address. Placing all of a class's mass on one representative lifts any class law to an address law, including classes of zero mass. Thus $\pi_*$ is surjective. P9 and uniqueness of the class minimizer give the address equivalence in P15, allowing every nonnegative allocation within each class. If $\mu^*_c=0$, every address weight in that class must vanish; these boundary laws belong to the same complete fiber.

For the output clauses, use the original actual circuit. The ideal query sends $\operatorname{clean}(n,a,b)$ to $o_{a,b}$; pulling the initialized amplitudes back through the inverse permutations gives P10. At this output basis, $J^q_\psi(o_{a,b},e)=\psi(a,b)R_a(e)$, so tracing the environment gives P11. On the entire $S_n$, the joint amplitudes and density matrix are still determined by the defining pullbacks and environment sums. By P2, P10, and norm preservation under the ideal permutation, both the joint vector and ideal vector have norm $1$, giving P13.

Insert P11 into the expectation in the complete ideal output. Each pair of input labels contributes $|\psi(a,b)|^2|\psi(a',b')|^2G(a,a')$. Summing separately over $b,b'$ gives P12, without a product-state or normalization assumption. For P14, the nonnegative square roots give $\sum_b|\psi_p(a,b)|^2=p_a$; summing over $a$ gives $1$. Every address law therefore has a normalized joint-input realization. Together with P12, this makes minimization over address laws equivalent to minimization over all normalized joint inputs, completing P15. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch38-heterogeneous-profile-fiber title="Depth two: three records and a complete minimizing address fiber"}
Take depth $2$, and name the root, left-child, and right-child routers $r,\ell,h$. Set $q(r)=1$, $q(\ell)=0$, and $q(h)=1$. Write addresses in head-first order as $00,01,10,11$. The actual loaded labels are

$$
\begin{array}{c|ccc}
a&r&\ell&h\\\hline
00&0&0&W\\
01&0&1&W\\
10&1&W&0\\
11&1&W&1
\end{array}
$$

Only the left-child router is active. The root and right-child environments always record $e_*$, so in tensor order $(r,\ell,h)$,

$$
\begin{aligned}
R_{00}&=e_*\otimes e_0\otimes e_*,\\
R_{01}&=e_*\otimes e_1\otimes e_*,\\
R_{10}=R_{11}&=e_*\otimes e_W\otimes e_*.
\end{aligned}
$$

This directly gives three realized classes, $c_0=\{00\}$, $c_1=\{01\}$, and $c_W=\{10,11\}$, with

$$
G=\begin{pmatrix}
1&0&0&0\\0&1&0&0\\0&0&1&1\\0&0&1&1
\end{pmatrix}.
$$

Its rank is $3$, and its complex coefficient kernel is exactly $z_{00}=z_{01}=0$, $z_{10}+z_{11}=0$. The inactive deepest router on the right accounts for the merged sibling addresses. The three class records are orthonormal, so class masses $(x,y,z)$ have energy $H_q=x^2+y^2+z^2$. Under $x+y+z=1$,

$$
x^2+y^2+z^2-\frac13
=\left(x-\frac13\right)^2+
\left(y-\frac13\right)^2+\left(z-\frac13\right)^2.
$$

The unique minimizing class law is $(1/3,1/3,1/3)$, and the minimum squared fidelity is $1/3$. All minimizing address laws are

$$
(p_{00},p_{01},p_{10},p_{11})
=\left(\frac13,\frac13,t,\frac13-t\right),
\qquad 0\le t\le\frac13.
$$

Each endpoint has a zero address weight and belongs in the fiber. The uniform address law has class masses $(1/4,1/4,1/2)$ and energy $3/8>1/3$. For each fixed classical $D$, a normalized joint complex input minimizes fidelity exactly when each of its three class masses is $1/3$. This condition retains all allowed complex phases, allocations within a class, and address–bus entanglement. These values are hand calculations from the displayed actual records, a concrete specialization of [@thm-ch38-physical-profile-event].
:::

::: {.remark #rem-ch38-profile-scope title="Rank, minimizing fibers, and physical scope"}
P6 describes the kernel of the complex Gram matrix acting on address coefficient vectors. It is not a statement about the kernel of a channel acting on density matrices. Likewise, uniqueness in P15 belongs to the class probability law. Every nonnegative address allocation with the optimal class masses remains allowed, and joint inputs may also differ in phase and entanglement. In general, $\mu^*$ is not required to have full support, and no closed formula or algorithm for the minimum at arbitrary heterogeneous rates is supplied. The example shows why uniform address optimality from the homogeneous case cannot be transferred without qualification.

At depth zero there are no routers, only one address and one class. The unit record gives $G=(1)$ and $F=1$ for normalized inputs. If every node has $q(v)=1$, all addresses again lie in a single class, every entry of $G$ equals $1$, and every address law belongs to the minimizing fiber. At positive depth, full rank requires activity of every deepest router, without requiring every ancestor to be active. Here “active” refers specifically to the environment's ability to distinguish labels; it does not mean that the router is programmed in every address branch.

The scope remains a finite set of actual internal routers, fixed classical data, one independent router record after complete sequential loading, and otherwise ideal gates. This does not extend to a noisy continuation, gate noise, correlated records, repeated holds, or hardware fault tolerance. Nor does it provide a new physical proof of the infinite address ontology or observer-pointer `MODEL` interpretation. The interpretations below retain their own premises.
:::

**Signed overlaps: from address profiles to ordered complex coefficient certificates.** The preceding Profiles discussion used four real coordinates to describe address distinguishability for $q(v)\in[0,1]$. We now retain the actual loaded labels and use three complex Fourier coordinates, extending the local overlap parameter to the closed interval $[-1/2,1]$. We study complex superpositions of these records, membership of the vacuum in their synthesis range, and an ordered kernel list given by a specified recursion. Both endpoints are essential.

We retain from [@def-ch38-profile-routers] the labels $Q=\{W,0,1\}$, the head-first addresses $A_0=\{()\}$ and $A_{n+1}=\operatorname{Bool}\times A_n$, and the internal router positions $I_0=\varnothing$ and $I_{n+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_n)$. The root is `none` and a child position is `some (b,v)`; $b=0,1$ denotes false and true, hence left and right. When used as labels, $0,1$ denote the corresponding encoded labels in $Q$.

As before, let $L_n=\operatorname{load}(n,n)$ and let $T$ project a system configuration to its tree. We use

$$
\lambda_{a,\beta}(v)
=\operatorname{routerLabel}\bigl(n,T(L_n(\operatorname{loading}(n,a,\beta,0))),v\bigr)
=\operatorname{loadedLabel}(n,a,\beta,v).
$$

These are the actual router labels after complete sequential loading, including the $W$ labels off the selected path. The correspondence between actual loading and the programmed tree is the one used above. Although these labels are independent of the external bus, we retain arbitrary $\beta\in Q$ throughout, including the waiting label $W$.

::: {.definition #def-ch38-signed-fourier-records title="Three Fourier Coordinates and Complex Coefficient Spaces" lean="D5/S3/Quantum/Routing/HannSignedCertificate.omega D5/S3/Quantum/Routing/HannSignedCertificate.labelIndex D5/S3/Quantum/Routing/HannSignedCertificate.localRecord D5/S3/Quantum/Routing/HannSignedCertificate.Environment D5/S3/Quantum/Routing/HannSignedCertificate.Coeff"}
Set $\omega=\exp(2\pi\mathrm i/3)$ and $j(W)=0$, $j(0)=1$, $j(1)=2$, with integer exponents. For $r\in[-1/2,1]$ and $s\in Q$, define

$$
f_{r,s}=\left(
\sqrt{\frac{1+2r}{3}},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{j(s)},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{-j(s)}
\right)\in\mathbb C^3.
$$

The three coordinates are indexed, in order, by $\operatorname{Fin}(3)=\{0,1,2\}$. Every square root is the nonnegative real square root, embedded in $\mathbb C$; the record coordinates are generally complex. Write

$$
\mathcal F_n=I_n\to\operatorname{Fin}(3),\qquad
\mathcal C_n=A_n\to\mathbb C.
$$

These are `Environment n` and `Coeff n` for this discussion. The record space is $\mathcal F_n\to\mathbb C$. We distinguish $\mathcal F_n$ from the environment index set $\mathcal E_n$ of the preceding four-coordinate records.
:::

::: {.definition #def-ch38-signed-synthesis title="Common Subtree Restrictions, Actual Records, and Synthesis" lean="D5/S3/Quantum/Routing/HannSignedCertificate.restrict D5/S3/Quantum/Routing/HannSignedCertificate.childEnvironment D5/S3/Quantum/Routing/HannSignedCertificate.record D5/S3/Quantum/Routing/HannSignedCertificate.vacuumRecord D5/S3/Quantum/Routing/HannSignedCertificate.synthesis D5/S3/Quantum/Routing/HannSignedCertificate.embed"}
Fix one arbitrary heterogeneous real assignment $q:I_n\to\mathbb R$, with $-1/2\le q(v)\le1$ at every position. For arbitrary $a\in A_n$, $\beta\in Q$, and $e\in\mathcal F_n$, define the actual record, the all-wait vacuum record, and the complex linear synthesis map by

$$
\begin{aligned}
\widehat R_{n,q,\beta,a}(e)
&=\prod_{v\in I_n}f_{q(v),\lambda_{a,\beta}(v)}(e(v)),\\
V_{n,q}(e)&=\prod_{v\in I_n}f_{q(v),W}(e(v)),\\
(S_{n,q,\beta}x)(e)
&=\sum_{a\in A_n}x(a)\widehat R_{n,q,\beta,a}(e),
\qquad x\in\mathcal C_n.
\end{aligned}
$$

At depth $n+1$, the root parameter is $r=q(\mathrm{root})$. For $b\in\{0,1\}$, the child assignment and environment coordinates are

$$
q_b(v)=q(\operatorname{some}(b,v)),\qquad
e_b(v)=e(\operatorname{some}(b,v)).
$$

These are `restrict n q b` and `childEnvironment n e b`. Each further descent takes the same kind of restriction. Every input at every prefix therefore comes from the same $q$: distinct node parameters remain distinct, and no child assignment is chosen afresh. Tensor coordinates below follow the order root, left subtree, right subtree.

Define zero extension $J_b:\mathcal C_n\to\mathcal C_{n+1}$ by

$$
(J_bx)(c,a)=
\begin{cases}x(a),&c=b,\\0,&c\ne b.\end{cases}
$$

At depth $0$ there are no routers, and both $A_0$ and $\mathcal F_0$ have one element. Every empty product is $1$, so both the actual record and the vacuum record are the unit function, and $S_{0,q,\beta}x=x(())$.
:::

::: {.definition #def-ch38-signed-recursion title="The Prescribed Recursion for Dimension Data, an Ordered Kernel List, and a Preferred Vacuum Representative" lean="D5/S3/Quantum/Routing/HannSignedCertificate.Output D5/S3/Quantum/Routing/HannSignedCertificate.Output.flag D5/S3/Quantum/Routing/HannSignedCertificate.inherited D5/S3/Quantum/Routing/HannSignedCertificate.step D5/S3/Quantum/Routing/HannSignedCertificate.outputs"}
The recursive output $(d,K,U)$ is `outputs n q`: $d\in\mathbb N$, $K$ is an ordered list of vectors in $\mathcal C_n$, and $U\in\operatorname{Option}(\mathcal C_n)$. The Boolean flag $t$ is defined exactly as $U.\mathrm{isSome}$: when $U=\operatorname{Some}(u)$, $t=\mathrm{true}$; when $U=\operatorname{None}$, $t=\mathrm{false}$. The rules select a representative $U$; they do not assert that it is the unique preimage. This list $K$ is also distinct from the scalar kernel function used in the homogeneous case.

At the leaf, meaning depth $0$, the output is

$$
d=1,\qquad K=[],\qquad
U=\operatorname{Some}(\delta_{()}),\qquad t=\mathrm{true},
\qquad \delta_{()}(())=1.
$$

At depth $n+1$, first recurse on $q_0,q_1$ to obtain $(d_0,K_0,U_0,t_0)$ and $(d_1,K_1,U_1,t_1)$. Set

$$
H=\operatorname{map}(J_0,K_0)\mathbin{+\!+}\operatorname{map}(J_1,K_1),
$$

where $+\!+$ denotes list concatenation: keep the left list in its original order, followed by the right list in its original order. The root parameter $r=q(\mathrm{root})\in[-1/2,1]$ determines

$$
d=\begin{cases}
d_0+d_1,&r<1,\\
d_0+d_1-\mathbf 1_{t_0\land t_1},&r=1.
\end{cases}
$$

The indicator $\mathbf 1_{t_0\land t_1}$ is $1$ when both child flags are true, and $0$ otherwise. Here and in $2^n-d$ below, subtraction is truncated natural subtraction: $a-b=\max(a-b,0)$.

The complete rule for the ordered list is

$$
K=\begin{cases}
H\mathbin{+\!+}[J_0u_0-J_1u_1],
&r=1,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1),\\
H,&\text{otherwise}.
\end{cases}
$$

Thus this one difference vector is appended at the end only at the upper endpoint when both child vacuum representatives exist. There is no elimination, reordering, rescaling, or deduplication.

All branches for the representative and flag are

$$
\begin{array}{c|c|c}
\text{root parameter and child condition}&U&t\\ \hline
r=-1/2,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(-J_0u_0-J_1u_1)&\mathrm{true}\\
r=-1/2,\ \text{at least one child representative is absent}
&\operatorname{None}&\mathrm{false}\\
-1/2<r<1&\operatorname{None}&\mathrm{false}\\
r=1,\ U_0=\operatorname{Some}(u_0)
&\operatorname{Some}(J_0u_0)&\mathrm{true}\\
r=1,\ U_0=\operatorname{None},\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(J_1u_1)&\mathrm{true}\\
r=1,\ U_0=U_1=\operatorname{None}
&\operatorname{None}&\mathrm{false}
\end{array}
$$

Consequently, $t=t_0\land t_1$ at the lower endpoint, $t=\mathrm{false}$ in the interior, and $t=t_0\lor t_1$ at the upper endpoint. When both representatives exist at the upper endpoint, the left one still takes priority. Both minus signs at the lower endpoint are required. Each child output has $d_b>0$, so the upper-endpoint branch that actually subtracts $1$ cannot underflow.
:::

::: {.definition #def-ch38-signed-gram-orientations title="Standard and Density Orientations of the Complex Gram Matrix" lean="D5/S3/Quantum/Routing/HannSignedCertificate.recordMatrix D5/S3/Quantum/Routing/HannSignedCertificate.standardGram D5/S3/Quantum/Routing/HannSignedCertificate.densityGram"}
Fix $n,q,\beta$ and suppress these subscripts on records and maps. Matrix $M$ has environment rows and address columns: $M(e,a)=\widehat R_a(e)$, so $Mx=Sx$. Define

$$
\begin{aligned}
G^{\mathrm{std}}&=M^{\mathrm H}M,\\
G^{\mathrm{std}}(a,b)&=\sum_{e\in\mathcal F_n}\overline{\widehat R_a(e)}\,\widehat R_b(e),\\
G^{\mathrm{den}}(a,b)&=\sum_{e\in\mathcal F_n}\widehat R_a(e)\,\overline{\widehat R_b(e)}.
\end{aligned}
$$

Here $M^{\mathrm H}$ is the conjugate transpose. In general these two orientations are entrywise conjugates. Below, a product of real local overlaps proves their equality in this setting; only then do we apply the standard Gram kernel and rank identities to the density orientation.
:::

::: {.theorem #thm-ch38-signed-coefficient-event title="The Complete Signed Coefficient and Gram Certificate for Actual Loaded Records" lean="D5/S3/Quantum/Routing/HannSignedCertificate.signed_event"}
For every natural depth $n\ge0$ and every real assignment $q:I_n\to\mathbb R$, assume

$$
\forall v\in I_n,\qquad -\frac12\le q(v)\le1.
$$

For every external qutrit bus label $\beta\in Q$, take the actual records and the prescribed recursive output $(d,K,U,t)$ above. Put $m=|K|$ and $K_i=K.\mathrm{get}(i)$ for $i\in\operatorname{Fin}(m)$. The following assertions hold simultaneously.

1. The complex dimension of the synthesis range is $\dim_{\mathbb C}\operatorname{range}S=d$.
2. The ordered kernel list has length $|K|=2^n-d$, using the truncated natural subtraction specified above.
3. Vacuum membership holds in both directions: $V_{n,q}\in\operatorname{range}S\ \Longleftrightarrow\ t=\mathrm{true}$. In particular, $t=\mathrm{false}$, equivalently $U=\operatorname{None}$, means that the vacuum does not belong to the synthesis range.
4. For every $u\in\mathcal C_n$, if $U=\operatorname{Some}(u)$, then $Su=V_{n,q}$.
5. For every complex coefficient vector $x\in\mathcal C_n$,

   $$
   Sx=0\quad\Longleftrightarrow\quad
   \exists!\,\alpha:\operatorname{Fin}(m)\to\mathbb C,\qquad
   x=\sum_{i\in\operatorname{Fin}(m)}\alpha(i)K_i.
   $$

   Uniqueness concerns all complex coefficients indexed by this ordered list: any other coefficient family giving the same expansion equals $\alpha$ at every index.
6. For all $a,b\in A_n$, the standard Gram entry is determined by the actual loaded labels:

   $$
   G^{\mathrm{std}}(a,b)=
   \left(\prod_{v\in I_n}
   \begin{cases}
   1,&\lambda_{a,\beta}(v)=\lambda_{b,\beta}(v),\\
   q(v),&\lambda_{a,\beta}(v)\ne\lambda_{b,\beta}(v)
   \end{cases}\right)\in\mathbb R\subset\mathbb C.
   $$

7. The density and standard orientations agree: $G^{\mathrm{den}}=G^{\mathrm{std}}$.
8. As linear maps on the complex address coefficient space $\mathcal C_n$, $\ker(G^{\mathrm{den}}\cdot)=\ker S$.
9. The density-orientation matrix has complex rank $\operatorname{rank}_{\mathbb C}G^{\mathrm{den}}=d$.
:::

::: proof
Proceed by induction on the actual tree, always restricting the same assignment to its subtrees. The local Fourier identities follow from $\omega^3=1$ and $1+\omega+\omega^2=0$; in particular,

$$
f_{1,s}=f_{1,W},\qquad
f_{-1/2,W}=-f_{-1/2,0}-f_{-1/2,1}.
$$

At depth $n+1$, abbreviate $S_b=S_{n,q_b,\beta}$ and $V_b=V_{n,q_b}$. The actual loaded labels split the records and vacuum, in root–left–right order, as

$$
\begin{aligned}
\widehat R_{n+1,q,\beta,(0,a)}
&=f_{r,0}\otimes\widehat R_{n,q_0,\beta,a}\otimes V_1,\\
\widehat R_{n+1,q,\beta,(1,a)}
&=f_{r,1}\otimes V_0\otimes\widehat R_{n,q_1,\beta,a},\\
V_{n+1,q}&=f_{r,W}\otimes V_0\otimes V_1.
\end{aligned}
$$

These tensor identities mean pointwise products of the corresponding environment coordinate functions. For $x_b(a)=x(b,a)$, we have $x=J_0x_0+J_1x_1$, hence

$$
Sx=f_{r,0}\otimes(S_0x_0)\otimes V_1
+f_{r,1}\otimes V_0\otimes(S_1x_1).
$$

The vacuum is nonzero throughout the interval. Choose $e_*(v)=1$ when $q(v)=-1/2$ and $e_*(v)=0$ otherwise. At the lower endpoint, coordinate $1$ of the wait record is $\sqrt{1/2}>0$; elsewhere, coordinate $0$ is $\sqrt{(1+2q(v))/3}>0$. Their finite product is nonzero, and at depth $0$ it is the unit empty product. We can therefore evaluate at nonzero child vacuum coordinates and cancel those factors in subtree equations.

To treat both the kernel and the vacuum, consider arbitrary $c\in\mathbb C$ and an equation $Sx=cV_{n+1,q}$. When $r<1$, the local equation

$$
f_{r,0}A+f_{r,1}B=f_{r,W}C
$$

forces $A=B=-C$ through coordinates $1,2$. If also $r\ne-1/2$, the nonzero coordinate $0$ forces $C=0$. Apply this to the tensor decomposition and cancel factors at nonzero child vacuum coordinates to obtain

$$
S_0x_0=-cV_0,\qquad S_1x_1=-cV_1,
\qquad r\ne-1/2\ \Longrightarrow\ c=0.
$$

With $c=0$, both child vectors lie in their respective kernels, so the inherited list already spans the entire kernel. With $c=1$, a vacuum preimage is possible only at the lower endpoint, and both children must have vacuum preimages. By induction, this is equivalent to $t_0\land t_1$. The local lower-endpoint identity supplies the converse construction $-J_0u_0-J_1u_1$. In the interior $-1/2<r<1$, the case $c=1$ is impossible. Thus the conclusion here is vacuum non-membership, beyond merely failing to select a representative.

When $r=1$, all three local records coincide. Nonzero child vacua turn $Sx=cV_{n+1,q}$ into a relation with one common scalar $z\in\mathbb C$:

$$
S_0x_0=zV_0,\qquad S_1x_1=(c-z)V_1.
$$

If a child has no vacuum preimage, its scalar must be zero: otherwise scaling by the inverse of that nonzero scalar would produce a vacuum preimage. With $c=1$, the two scalars sum to $1$, so at least one child has a vacuum preimage. Conversely, zero extension of either child representative gives the parent vacuum. This proves the upper-endpoint flag $t_0\lor t_1$ and validates the prescribed preference for the left representative.

Now take $c=0$. If both representatives exist, then

$$
\begin{aligned}
x={}&J_0(x_0-zu_0)+J_1(x_1+zu_1)\\
&+z(J_0u_0-J_1u_1).
\end{aligned}
$$

The first two terms come from child kernels, and the last is precisely the appended collision vector. If at least one representative is absent, the corresponding scalar forces $z=0$, so the inherited list is complete. Each of $J_0,J_1$ is injective, and their supports are disjoint, preserving complex linear independence of the inherited list. When both representatives exist, the new difference vector is outside its span: restrict to the left address component and apply $S_0$. Every inherited vector gives zero, whereas the difference vector gives the nonzero $V_0$. The entire prescribed list is therefore both complete and complex linearly independent.

The leaf gives the unit representative and empty kernel list directly. The induction also preserves zero synthesis for every list vector, synthesis to the vacuum for the chosen representative, and the relations $d>0$ and $|K|+d=2^n$. Since $\dim_{\mathbb C}\mathcal C_n=2^n$, rank–nullity together with completeness and independence gives the range dimension, list length, and unique complex coefficient expansion. Both directions of vacuum membership and the representative equations were established in the individual branches. This proves the first five assertions.

Finally, handle the conjugation orientations. For $r$ in the entire closed interval and arbitrary $s,t\in Q$, the local records satisfy

$$
\sum_{i\in\operatorname{Fin}(3)}\overline{f_{r,s}(i)}\,f_{r,t}(i)
=\begin{cases}1,&s=t,\\r,&s\ne t.\end{cases}
$$

Expanding and interchanging the finite environment sum and node product expresses $G^{\mathrm{std}}(a,b)$ as a product of these real local overlaps, proving the sixth assertion. Hence $G^{\mathrm{den}}(a,b)=\overline{G^{\mathrm{std}}(a,b)}=G^{\mathrm{std}}(a,b)$. This uses reality of the overlap product, without assuming real record coordinates. With $G^{\mathrm{std}}=M^{\mathrm H}M$ and $M\cdot=S$, the standard Gram kernel and rank identities give the last two assertions. The full proof is checked by the Lean kernel.
:::



Depth zero is fully included: $d=1$, $K=[]$, $t=\mathrm{true}$, $S$ is the one-dimensional identity, $V=1$, and both Gram matrices are $(1)$ with rank $1$. In the fifth assertion the coefficient domain is then $\operatorname{Fin}(0)$; the unique empty coefficient family expands only to the zero vector, with empty sum zero. At any deeper prefix, successively restricting the original $q$ to that subtree gives another instance of the same statement. There is no extra positive-depth, homogeneous-parameter, or Boolean-bus assumption. The lower endpoint changes vacuum membership without appending a kernel vector; the upper endpoint appends one kernel vector and subtracts one dimension only when both child vacua can be synthesized.

The connection to Profiles passes through overlaps. On the common range $q(v)\in[0,1]$, the preceding four-coordinate real records $\sqrt{q(v)}e_*+\sqrt{1-q(v)}e_s$ also have local overlap $1$ for equal labels and $q(v)$ for distinct labels. Their actual loaded-record Gram entries therefore equal the corresponding real product here. The two constructions have different environments and coordinates. This comparison does not identify their coordinates or extend the preceding physical output conclusions directly to the signed interval.

The kernel in this theorem is throughout the kernel of synthesis on complex address coefficients. No signed-interval theorem for noisy output or post-loading continuation is supplied here, nor a kernel on a Schur operator space, a Choi rank, or a claim about computational efficiency or hardware performance. The theorem also adds no proof to the subsequent interpretation of ontology and observers. These scope boundaries remain in force as the discussion turns to `MODEL`.


::: {.theorem #thm-ch38-hann-uniform-original-section title="Uniform original-leaf sections for the actual signed Hann records" lean="D5/S3/Quantum/Routing/HannUniformSection.binary_conformal_kernel D5/S3/Quantum/Routing/HannUniformSection.zero_certificate D5/S3/Quantum/Routing/HannUniformSection.uniform_section"}
Fix a finite depth $n$, a heterogeneous router assignment $q : \operatorname{Router}(n) \to \mathbb{R}$, and a qutrit bus, with

$$
-\frac12 \le q(v) \le 1
$$

for every router node $v$. Here `Section n q bus` means exactly the set of real numbers $z$ for which there is a probability distribution on the original leaf addresses $a\in\operatorname{Address}(n)$ with $p(a)\ge0$, $\sum_a p(a)=1$, and the actual signed Hann records synthesize to a real multiple of the vacuum record:

$$
\sum_{a\in\operatorname{Address}(n)} (p(a):\mathbb C)\,\operatorname{record}(n,q,\mathrm{bus},a)
= (z:\mathbb C)\,\operatorname{vacuumRecord}(n,q).
$$

Then all of the following hold.

1. Every nonnegative nonzero original-leaf kernel vector contains a same-kernel certificate whose leaf coordinates are $0$ or $1$ and whose node coordinates are $0$, $1$, or $-1$; its nonzero leaf coordinates stay inside the original positive support, while the node coordinates preserve the original node and root signs.
2. If one such probability distribution $p$ realizes $z=0$, there is a nonempty subset $S$ of original leaves, every one of whose probabilities is strictly positive, such that
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=0.
   $$
   Thus zero may be an interior point of the section; it need not be an endpoint.
3. `Section n q bus` is either empty or a closed interval $[l,r]$, and both endpoints are attained by uniform distributions on original leaves. More precisely, for each endpoint there are a nonempty finite subset $S$ and $e\in\{-1,0,1\}$ such that
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=(e:\mathbb C)\,\operatorname{vacuumRecord}(n,q),
   \qquad z=\frac{e}{|S|},
   $$
   with $1\le |S|\le 2^n$; the two endpoints may use different subsets.

This is a theorem about the finite-depth real probability model of the stated signed Hann records. It does not interpret signed records as physical quantum channels, and it supplies no hardware, algorithmic-complexity, or running-time claim; nor does every feasible probability distribution become uniform. The complete proof is checked by the Lean kernel in `trureturing`.
:::
Viewed alongside [@rem-ch38-qram-page-wootters-literature], separating the dynamic pointer register from the static memory array immediately yields two structural **`MODEL` (interpretive model)** consequences:

1. **Why the Global Memory Array Is Timelessly $P = NP$ While Any Finite Pointer Must Step Sequentially via `ptr++`**:
   On the ontological memory side, the entire array $\bigl\{\lvert\Phi(x)\rangle_{\mathrm{mem}}\bigr\}_{x \in \mathbb{Z}^6}$ is already laid out simultaneously across every lattice address in an order-independent, $P = NP$-like static crystal (the name $P = NP$ is borrowed here; see §36.5; [Chapter 25](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell] and [Chapter 26](ch30-fields-lines-eth-and-navier-stokes.md)). Yet every physical observer pointer inside the crystal is bounded by a finite register bit-width and a finite memory window $M < \infty$, facing the open finite-observer complexity firewall under standard computation ([@conj-p-neq-np]). Unable to ingest the entire cosmic array in a single bus cycle, the pointer must advance step by step via `ptr++` along causally compatible addresses without degenerate lockup (local Gram elliptope volume conditions are recorded in [§25.1.4](ch29-s03-timeless-gram-causality.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]). **What mortals experience as "the passage of time" is simply the scan frame rate of `ptr++` stepping across an unmoving crystal.**

::: {.viz src="pointer-ontology-deref" preset="linear64" height="500"}
**Reading the last cell means walking all 64.** The amber head reads one cell per tick along the bus, and the cells it has read light up; reaching address 63 takes 64 steps, while the routing tree above reached its leaf at step 6.
:::

2. **Why "Observation via Known Data" Manifests Locally as Decoherence**:
   In pointer architecture (`MODEL`), an observer's already-committed historical data acts as a locked high-order virtual-address **bitmask**. Executing a dereference `*ptr` couples the address register reversibly to the target memory cell via a controlled address-copy unitary $U_{\mathrm{copy}}$. Before stating the general kernel theorem, expand the explicit $4 \times 4$ block matrix ledger by hand: take two single-qubit target states $\rho = \begin{pmatrix} p & c \\ \bar{c} & 1-p \end{pmatrix}$ and $\sigma = \begin{pmatrix} p & c' \\ \bar{c}' & 1-p \end{pmatrix}$ sharing identical diagonal populations $p, 1-p$ but distinct off-diagonal coherence $c \neq c'$, paired with the blank address-record projector $E_{00} = \lvert 0\rangle\langle 0\rvert$ (where $E_{ab} := \lvert a\rangle\langle b\rvert$ for $a, b \in \{0, 1\}$). Under the controlled address-flip permutation $U_{\mathrm{copy}} = E_{00} \otimes I_2 + E_{11} \otimes \sigma_x$, the blank embedding and the address-tagged joint state read explicitly:

   $$
   B(\rho) \;=\; \begin{pmatrix} p E_{00} & c E_{00} \\ \bar{c} E_{00} & (1-p) E_{00} \end{pmatrix}, \qquad
   R_{\mathrm{addr}}(\rho) \;=\; U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^\dagger \;=\; \begin{pmatrix} p E_{00} & c E_{01} \\ \bar{c} E_{10} & (1-p) E_{11} \end{pmatrix}.
   $$

   Inspect the block matrix on the right: not a shred of the off-diagonal coherence amplitude $c$ has vanished—it has merely shifted from the diagonal record block $E_{00}$ onto the off-diagonal cross-block $E_{01}$! Globally, $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$ remain strictly distinct; yet the moment the local readout ignores the address-record register in its $90^\circ$ orthogonal blind zone (tracing over the second factor via $\operatorname{Tr}_{\mathrm{env}}(E_{ab}) = \delta_{ab}$), the cross-blocks $\operatorname{Tr}_{\mathrm{env}}(E_{01}) = \operatorname{Tr}_{\mathrm{env}}(E_{10}) = 0$ drop out and both local readouts collapse to the identical diagonal matrix $\operatorname{diag}(p, 1-p)$!

::: {.figure src="ch38-copy-record"}
**The dereferencing copy moves the coherence into the address record instead of destroying it.** Rows and columns are ordered (system bit, record bit) into a $4 \times 4$ grid, and the heavy lines cut it into four $2 \times 2$ blocks. In the blank embedding $B(\rho)$ on the left, all four entries sit in the top-left $E_{00}$ corner of their blocks; in $R_{\mathrm{addr}}(\rho)$, after $U_{\mathrm{copy}}$, the cyan $p$ and $1-p$ stay on the diagonal blocks while the magenta $c$ and $\bar{c}$ have moved to the $E_{01}$ and $E_{10}$ positions, still present. The partial trace over the record adds only the diagonal cells of each block, which these two are not, so the local readout is just $\operatorname{diag}(p, 1-p)$. See [@thm-ch38-copied-address-dereference-and-access-defect].
:::

`trureturing`'s decoherence and canonical-record-recovery modules lock this exact mechanism—reversible address-tag writing, reduced marginal coincidence, impossibility of local decoding, and lossless global adjoint reversal—into the formal theorem below:

::: {.theorem #thm-ch38-copied-address-dereference-and-access-defect title="Copied-Address Dereferencing, Marginal Coincidence, and Canonical Record Access Defect" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect"}
Let $\rho, \sigma \in \mathrm{QubitMatrix}$ (i.e., $M_{\operatorname{Fin} 2}(\mathbb{C})$) be any two qubit matrices with identical diagonal populations ($\forall i \in \operatorname{Fin} 2,\; \rho_{ii} = \sigma_{ii}$) and distinct off-diagonal coherence ($\exists i, j \in \operatorname{Fin} 2,\; i \neq j \land \rho_{ij} \neq \sigma_{ij}$). Write $\mathrm{JointQubitEnvironmentMatrix} = M_{\operatorname{Fin} 2 \times \operatorname{Fin} 2}(\mathbb{C})$, let $\mathrm{copyUnitary}$ denote the controlled address-copy permutation matrix, write $B(\tau) := \operatorname{blankEnvironmentJointState}(\tau)$ for the blank-record joint embedding, write $R_{\mathrm{addr}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$ for the canonical address-tagged joint state (equal to the prior controlled record state by [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)), and let $\operatorname{traceEnvironment}$ denote the partial trace over the address record. Then $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$, and all three statements below hold simultaneously:

1. **Forward Unitary Address Tagging and Global Distinctness**: Controlled address copying maps both blank-record inputs reversibly to their canonical address-tagged joint states, which remain strictly distinct globally:

   $$
   \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\rho)) = R_{\mathrm{addr}}(\rho), \quad \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\sigma)) = R_{\mathrm{addr}}(\sigma), \quad R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma);
   $$

2. **Reduced Marginal Coincidence and Impossibility of Local Decoding**: Tracing out the address record yields identical reduced states, so no reduced-state decoder $\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}$ can recover both joint records from the local dereferenced readout alone:

   $$
   \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\rho)\bigr) = \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\sigma)\bigr),
   $$

   $$
   \begin{aligned}
   &\neg\,\exists\,\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}, \\
    &\quad \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho))\bigr) = R_{\mathrm{addr}}(\rho) \\
    &\;\land\; \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))\bigr) = R_{\mathrm{addr}}(\sigma);
   \end{aligned}
   $$

3. **Lossless Global Adjoint Restoration Under Retained Record Access**: Retaining coherent access to the address record restores both blank-record inputs without loss under the adjoint coupling $\operatorname{star}(\mathrm{copyUnitary})$:

   $$
   \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\rho)\bigr) = B(\rho), \qquad \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\sigma)\bigr) = B(\sigma).
   $$
:::

::: proof
Membership $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ and the forward evolution identities $\operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\tau)) = R_{\mathrm{addr}}(\tau)$ follow by block matrix evaluation on $\operatorname{Fin} 2 \times \operatorname{Fin} 2$, with [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) identifying `controlledRecordJointState copiedAddressRecord` entrywise with the explicit controlled-copy joint matrix. Because $\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$, the off-diagonal address-tagged blocks of $R_{\mathrm{addr}}(\rho)$ and $R_{\mathrm{addr}}(\sigma)$ differ, proving $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$. Summing over the second factor in $\operatorname{traceEnvironment}$ drops the mismatched off-diagonal address blocks and retains only $\rho_{ii} = \sigma_{ii}$, yielding $\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho)) = \operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))$; any single-valued map $\mathrm{recover}$ recovering both states from equal inputs would force $R_{\mathrm{addr}}(\rho) = R_{\mathrm{addr}}(\sigma)$, a contradiction. Finally, associativity and $\mathrm{copyUnitary}^* \mathrm{copyUnitary} = 1$ restore $B(\rho)$ and $B(\sigma)$ under $\operatorname{star}(\mathrm{copyUnitary})$. The full proof is checked by the Lean kernel.
:::

[@thm-ch38-copied-address-dereference-and-access-defect] dispels, in our `MODEL`, the metaphysical fog around "mysterious wave-packet collapse" once and for all (it is a minimal two-qubit instance of decoherence and does not resolve the measurement problem of why a single outcome occurs): **dereferencing `*ptr` never destroys a single bit of coherence inside the universe's ontological memory; apparent local irreversibility arises solely because a bounded pointer reads out one masked address branch while leaving the complementary orthogonal branches outside its local register access!**

---
