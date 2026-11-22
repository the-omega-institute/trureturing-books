# 36.2.1 Reversible routing and clean queries {#sec-ch38-s01-s01-routing-and-query}

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
