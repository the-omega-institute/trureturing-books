# 14.2 Pauli Words and Stabilizer Syndromes {#sec-pauli-syndrome-parity}

If [@thm-no-cloning-overlap] forbids duplicating an unknown superposition $\alpha\lvert 0\rangle + \beta\lvert 1\rangle$ into $(\alpha\lvert 0\rangle + \beta\lvert 1\rangle)^{\otimes 3}$, how does quantum error correction protect quantum information?

The key is to **embed orthogonal basis states into a multi-body entangled subspace** — for instance extending $\lvert 0\rangle \mapsto \lvert 000\rangle$ and $\lvert 1\rangle \mapsto \lvert 111\rangle$ linearly to $\alpha\lvert 0\rangle + \beta\lvert 1\rangle \mapsto \alpha\lvert 000\rangle + \beta\lvert 111\rangle$ — and then measure only multi-body **Pauli words** that check joint parity without ever probing the single-qubit amplitudes $\alpha, \beta$!

::: {.figure src="ch14-syndrome-table"}
**The checks read which bit flipped, never $\alpha$ or $\beta$.** The four rows are the errors $I$, $X_1$, $X_2$, $X_3$; each row shows $E\lvert 000\rangle$ on the left and $E\lvert 111\rangle$ on the right, with the flipped bit outlined in magenta, and beside each string the two lamps $g_1 = Z_1Z_2$ and $g_2 = Z_2Z_3$, lit (magenta) when the reading is $-1$. The four errors light four different patterns, and within a row both strings light the same lamps: reading the lamps cannot tell $\lvert 000\rangle$ from $\lvert 111\rangle$, so it never touches $\alpha$ or $\beta$. Which lamps light is the mod-$2$ parity derived after [@lemma-pauli-word-phase] below.
:::

To formalize this algebra across arbitrary mode count $N \in \mathbb{N}$ and arbitrary local level count $p \in \mathbb{N}$ with `[NeZero p]` (note that **$p$ is not required to be prime, and $N$ may be $0$**), the source module `StabilizerGenuineEntanglementCommutationRank` defines the structure `PauliWord N p` with three fields:

- A discrete phase exponent $\mathrm{phase} : \mathrm{ZMod}\,p$;
- A shift (flip) exponent vector $x : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$;
- A clock (phase) exponent vector $z : \mathrm{Fin}\,N \to \mathrm{ZMod}\,p$.

Writing $\omega_p = \mathrm{windowRoot}\,p = \exp(2\pi i / p)$, on a single $p$-level qudit ($M_{\mathrm{Fin}\,p}(\mathbb{C})$) the cyclic shift matrix $X$ and the diagonal clock matrix $Z = \operatorname{diag}(\omega_p^{j.\mathrm{val}})$ form the single-site Weyl operator $D(e, f) = X^{e.\mathrm{val}} Z^{f.\mathrm{val}}$ (ordered with $Z$ on the right and $X$ on the left). A Pauli word $w : \mathrm{PauliWord}\,N\,p$ then defines the $N$-qudit matrix operator `pauliWordOperator w` on $(\mathrm{Fin}\,N \to \mathrm{Fin}\,p)$ with entries

$$
\bigl(\mathrm{pauliWordOperator}(w)\bigr)_{u, v} = \omega_p^{w.\mathrm{phase}.\mathrm{val}} \prod_{n \in \mathrm{Fin}\,N} D(w.x_n, w.z_n)_{u_n, v_n},
$$

while the formal word product `wordMul a b` adds each field coordinatewise in $\mathrm{ZMod}\,p$:

$$
\mathrm{wordMul}(a, b) = \bigl(a.\mathrm{phase} + b.\mathrm{phase},\; a.x + b.x,\; a.z + b.z\bigr).
$$

When two Pauli-word operators multiply, on each mode $n$ the factor $Z^{a.z_n}$ on the left must pass across $X^{b.x_n}$ on the right to reach normal form $X^{a.x_n + b.x_n} Z^{a.z_n + b.z_n}$, picking up the Weyl commutation phase $Z^{a.z_n} X^{b.x_n} = \omega_p^{(a.z_n b.x_n).\mathrm{val}} X^{b.x_n} Z^{a.z_n}$. The next lemma captures this exact multiplication law.

::: {.lemma #lemma-pauli-word-phase title="Multiplication and Cross-Phase Law for Generalized Pauli Words" lean="D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul"}
Let $N, p \in \mathbb{N}$ with `[NeZero p]`. For any two Pauli words $a, b : \mathrm{PauliWord}\,N\,p$, the product of their matrix operators satisfies

$$
\begin{aligned}
&\mathrm{pauliWordOperator}(a) \cdot \mathrm{pauliWordOperator}(b) \\
&= \mathrm{windowRoot}(p)^{\bigl(\sum_{n \in \mathrm{Fin}\,N} a.z_n \cdot b.x_n\bigr).\mathrm{val}} \bullet \mathrm{pauliWordOperator}\bigl(\mathrm{wordMul}(a, b)\bigr).
\end{aligned}
$$
:::

::: proof
On each mode $n \in \mathrm{Fin}\,N$, multiplying the single-site Weyl operators gives $D(a.x_n, a.z_n) D(b.x_n, b.z_n) = X^{a.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{b.z_n.\mathrm{val}}$. Moving $Z^{a.z_n.\mathrm{val}}$ past $X^{b.x_n.\mathrm{val}}$ via the clock–shift relation $Z^{a.z_n.\mathrm{val}} X^{b.x_n.\mathrm{val}} = \omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} X^{b.x_n.\mathrm{val}} Z^{a.z_n.\mathrm{val}}$ and reducing the shift and clock powers modulo $p$ yields $\omega_p^{(a.z_n \cdot b.x_n).\mathrm{val}} D(a.x_n + b.x_n, a.z_n + b.z_n)$. Taking the product over all $n \in \mathrm{Fin}\,N$ sums the cross-phase exponents in $\mathrm{ZMod}\,p$ to $\sum_n a.z_n \cdot b.x_n$, while the intrinsic phase factors $\omega_p^{a.\mathrm{phase}.\mathrm{val}} \omega_p^{b.\mathrm{phase}.\mathrm{val}} = \omega_p^{(a.\mathrm{phase} + b.\mathrm{phase}).\mathrm{val}}$ combine into the `phase` field of `wordMul a b`. The full proof is checked by the Lean kernel.
:::

Two critical points in [@lemma-pauli-word-phase] must be observed:

1. **Never drop the external cross-phase scalar**: In the source definition, `wordMul a b` only adds the intrinsic phases `a.phase + b.phase`; the entire noncommutative cross-phase $\omega_p^{(\sum_n a.z_n b.x_n).\mathrm{val}}$ stands **outside** as a scalar multiplier $\bullet$ and must never be omitted. Even for qubits ($p = 2$, $\omega_2 = -1$), the single-site operator order remains $X^{x_n} Z^{z_n}$, so every site where $a.z_n = 1$ and $b.x_n = 1$ contributes a minus sign from $ZX = -XZ$.
2. **Binary symplectic parity check at $p = 2$**: Because $\mathrm{wordMul}(a, b) = \mathrm{wordMul}(b, a)$, comparing $\mathrm{pauliWordOperator}(a)\mathrm{pauliWordOperator}(b)$ with $\mathrm{pauliWordOperator}(b)\mathrm{pauliWordOperator}(a)$ shows that their commutation phase is governed by the difference $\sum_n (a.z_n b.x_n - b.z_n a.x_n)$ in $\mathrm{ZMod}\,p$. At $p = 2$, this reduces to the binary symplectic inner product

   $$
   \langle a, b\rangle_{\mathrm{symp}} = \sum_{n \in \mathrm{Fin}\,N} \bigl(a.z_n b.x_n + a.x_n b.z_n\bigr) \pmod 2,
   $$

   which determines whether a stabilizer check $a$ commutes ($+1$) or anticommutes ($-1$) with a Pauli error $b$. Note that [@lemma-pauli-word-phase] itself is the operator multiplication identity; turning syndromes into guaranteed logical recovery requires the orthogonal-syndrome decoding structure developed next.

::: {.viz src="syndrome-decoding" preset="single" height="500"}
**One light points at the flipped qubit.** The two checks of the three-qubit repetition code, $g_1 = Z_1Z_2$ and $g_2 = Z_2Z_3$, sit over neighbouring pairs of qubits. When the first qubit flips (the magenta X), only $g_1$, which sits over it, lights up (magenta) and $g_2$ stays dark: $X_1$ anticommutes with $g_1$ and commutes with $g_2$, exactly the parity mod $2$ above, with the cross phase coming from [@lemma-pauli-word-phase]. The decoder follows the light and flips the first qubit back (amber); the cyan bars return to the code space and land on the dashed outline.
:::
