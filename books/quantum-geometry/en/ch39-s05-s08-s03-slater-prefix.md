# O.2.3 Physical Tribonacci models and Slater prefixes {#sec-ch39-s05-s08-s03-slater-prefix}

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="The Physical Tribonacci Literature Model and a Finite Slater Prefix Application"}
**Literature model and boundary conventions.** A concrete physical object to investigate is a nearest-neighbor hopping chain with zero on-site potential. Following Kolehmainen–Lado–Moustaj, *One-dimensional quasicrystals with tensor-network finite-state automata* ([arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1), §III, Eqs. (2)–(3), and Appendix B.2), take the substitution $\sigma(A)=AB$, $\sigma(B)=AC$, $\sigma(C)=A$ and its infinite fixed word starting from $A$, $W=\lim_{j\to\infty}\sigma^j(A)$, indexed from $W_0$. Fix $0<\rho<1$ and use $t_C=1$ as the energy unit, setting $t_A=\rho^2$, $t_B=\rho$, so $t_A/t_B=t_B/t_C=\rho$. For every integer $N\ge2$, define on the single-particle site space $\mathbb{C}^N$, with basis $\{\lvert i\rangle:0\le i<N\}$,

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

We use $W$'s first $N-1$ letters to label bonds; sites $0$ and $N-1$ are not joined. The paper's digit tensors encode this single-particle site index. Cutting binary or Tribonacci address indices does not specify a real-space many-body bipartition. This also limits the analogy with the direct-encoder entanglement ranks in [§O.1](ch39-s05-s07-cut-entanglement.md): it does not identify a uniform superposition of legal words with a Slater ground state of this hopping chain.

**Spectral distance for the specified even open prefixes.** Set

$$
\begin{aligned}
L_j&=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\\
h_{\rho,j}&=h_{N_j}\quad(j\ge1).
\end{aligned}
$$

On these deterministic open prefixes with an even number of sites, define

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
$$

The standalone statement of [@thm-ch39-p2e-tribonacci-open-chain-zero-gap] gives the full-sequence limit for each fixed $\rho\in(0,1)$. The stronger [@ex-ch39-p2e-tribonacci-prefix-rate] retains the quantitative paper derivation: $\delta_{\rho,j}\le73728/N_j$ for every $j\ge4$ and $0<\rho<1$, yielding convergence uniform in $\rho$. The complete quantitative application remains a paper proof, without a separate Lean verification badge or a claim to resolve a new external conjecture. Finite invertibility, membership of zero in an infinite-volume spectrum, finite-resolution density of states, or criticality in the sense of Anderson localization cannot directly replace the limit proof for these specified boundaries and prefix sequence. Krebbekx–Moustaj–Dajani–Morais Smith, *Multifractal Properties of Tribonacci Chains* ([*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204), §§II.B.1, III.A.1, and V), use periodic approximants and perturbative renormalization to study physical spectra and criticality; we do not read this as the finite open-chain statement above for all $\rho\in(0,1)$.

**Ordered Slater amplitudes and the literal prefix partial trace.** The following finite-dimensional application is independent of the hopping parameter. It allows any natural number $N$, $0\le k\le N$, and complex matrix $V\in\mathbb{C}^{N\times k}$, requiring only $V^\dagger V=I_k$. Keep the original sites in their natural order $0,\ldots,N-1$, and label the orthonormal Boolean occupation basis $\lvert S\rangle$ by its occupied subsets $S$. For $|S|=k$, let $V_S$ retain those rows in increasing site order, with the column order unchanged. Define the same actual many-body vector by

$$
\langle S\mid\Psi_V\rangle=
\begin{cases}
\det(V_S),&\lvert S\rvert=k,\\
0,&\lvert S\rvert\ne k.
\end{cases}
$$

The empty determinant is $1$, so $k=0$ gives the vacuum. The occupation basis is already normalized; no additional factor $1/\sqrt{k!}$ multiplies the amplitudes. Applying the [rectangular Cauchy–Binet identity](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet) to $V^\dagger,V$ in natural site order gives

$$
\sum_{|S|=k}\overline{\det(V_S)}\det(V_S)
=\det(V^\dagger V)=1.
$$

Normalization thus follows from column orthonormality. Dereziński, [*Clifford algebras and fermions*](https://www.fuw.edu.pl/~derezins/clifford.pdf), §7.1–§7.2, Eqs. (7.51)–(7.54), provides the literature background for the CAR, ordered occupation basis, and normalized Slater determinant. To use this vector as a ground state of the hopping chain above, the occupied modes, filling, and many-body Hamiltonian still need to be specified and energy minimization verified.

Specify $0\le\ell\le N$ and the contiguous prefix $I=\{0,\ldots,\ell-1\}$. Let $a,a'\in\{0,1\}^{\ell}$ and $b\in\{0,1\}^{N-\ell}$; $ab$ concatenates the prefix and tail in the original site order. Define

$$
\begin{aligned}
\psi_V(a,b)&:=\langle ab\mid\Psi_V\rangle,\\
M_V((a,b),(a',b'))&:=\psi_V(a,b)\overline{\psi_V(a',b')},\\
R_V(a,a')&:=\sum_{b\in\{0,1\}^{N-\ell}}
\psi_V(a,b)\overline{\psi_V(a',b)}.
\end{aligned}
$$

This is the ordinary partial trace $R_V=\operatorname{Tr}_{\mathrm{tail}}M_V$ in the ordered site tensor product, retaining all $2^\ell$ prefix occupation strings. The rank-one matrix $M_V$ is positive semidefinite, so [positivity under partial trace](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.partialTraceRight_posSemidef) gives $R_V\ge0$. Reindexing its diagonal sum by the concatenation bijection and using the normalization above gives $\Tr R_V=1$. Below, $\rho_I$ is the density state whose matrix is this $R_V$.

**Unitary correspondence in the original basis and the complete spectrum.** Write $X=V_I$ for the first $\ell$ rows and $Y$ for the remaining $N-\ell$ rows, and set $A=XX^\dagger$. The full-space projection $P=VV^\dagger$ and $I_N-P$ are both positive semidefinite; compression gives $0\le A\le I_\ell$. Choose an orthonormal eigenvector matrix $Q$ for $A$ and retain all $\ell$ eigenvalues $\nu_i$. Then

$$
\begin{aligned}
Q^\dagger Q&=QQ^\dagger=I_\ell,\\
Q^\dagger A Q&=\operatorname{diag}(\nu_1,\ldots,\nu_\ell),
\qquad 0\le\nu_i\le1,\\
\widetilde V&=(Q^\dagger\oplus I_{N-\ell})V.
\end{aligned}
$$

The prefix rows of $\widetilde V$ are $\widetilde X=Q^\dagger X$, its tail remains $Y$, and $\widetilde V^\dagger\widetilde V=I_k$. Define $\Gamma_m(B)$ on all $m$-site occupation strings: when the occupied subsets of its two arguments have equal size, its entry is the minor of $B$ with both rows and columns in natural increasing order; otherwise it is zero. The vacuum entry is the empty determinant $1$. Applying Cauchy–Binet in each particle-number sector gives

$$
\begin{aligned}
\Gamma_m(BC)&=\Gamma_m(B)\Gamma_m(C),\\
\Gamma_m(B^\dagger)&=\Gamma_m(B)^\dagger,\qquad
\Gamma_m(I_m)=I_{2^m}.
\end{aligned}
$$

A single-particle unitary therefore lifts to a unitary on the entire Boolean occupation space. Natural order is used throughout. If one instead uses a compound matrix with a fixed classical order, the permutation sign for each of its left and right occupied subsets must be included; the order difference cannot simply be ignored.

Every prefix site precedes every tail site, so the block minors introduce no additional exchange sign, and

$$
\Gamma_N(B\oplus I_{N-\ell})(ab,a'b')
=\Gamma_\ell(B)(a,a')\,\delta_{bb'}.
$$

Apply this identity to the same determinant vector, then use the [local conjugation and partial-trace identity](lean:D5/S3/Quantum/Dynamics/KickedIsingNegativityRefutation.trace_local_right) with the identity as its tail matrix. This gives the relation between the actual marginals

$$
\begin{aligned}
G&=\Gamma_\ell(Q^\dagger),\qquad G^\dagger G=GG^\dagger=I_{2^\ell},\\
R_{\widetilde V}&=G R_V G^\dagger.
\end{aligned}
$$

The transformation law follows from the amplitudes and partial trace, without assuming a correlation transformation law or Gaussianity.

The matrix $R_{\widetilde V}$ itself must still be computed. For equal-size occupied prefix subsets $S,T$, put $r=|S|=|T|$, and let $\widetilde X_S,\widetilde X_T$ retain their increasing rows. Stack these rows above $Y$, assigning polynomial weight $t$ to each prefix row and weight $1$ to each tail row. The coefficient of $t^r$ in Cauchy–Binet selects exactly the minors containing every specified prefix row. Thus

$$
R_{\widetilde V}(S,T)
=[t^r]\det\bigl(Y^\dagger Y+t\widetilde X_T^\dagger\widetilde X_S\bigr).
$$

Here $[t^r]$ extracts a coefficient. Let $E_{T,S}$ send the $q$th increasing coordinate of $S$ to the $q$th increasing coordinate of $T$, with all other entries zero. Using $Y^\dagger Y=I_k-\widetilde X^\dagger\widetilde X$ and $\det(I+BC)=\det(I+CB)$, the determinant above equals

$$
\det\bigl(I_\ell-D+tE_{T,S}D\bigr),
\qquad D=\operatorname{diag}(\nu_1,\ldots,\nu_\ell).
$$

Block the matrix by $T$ and its complement. Its coefficient of $t^r$ is the principal minor of $E_{T,S}D$ on $T$, multiplied by $\prod_{i\notin T}(1-\nu_i)$. If $S=T$, that minor is $\prod_{i\in S}\nu_i$; if $S\ne T$, a coordinate in $T\setminus S$ supplies a zero column, so the coefficient vanishes. If $|S|\ne|T|$, the same tail subset cannot make both total particle counts equal $k$, and every summand of the original partial trace is already zero. This computes every entry:

$$
\begin{aligned}
b_i(0)&=1-\nu_i,\qquad b_i(1)=\nu_i,\\
\lambda_a&=\prod_{i=1}^{\ell}b_i(a_i),\qquad a\in\{0,1\}^{\ell},\\
R_{\widetilde V}&=\operatorname{diag}(\lambda_a),\\
U&=G^\dagger,\qquad
R_V=U\operatorname{diag}(\lambda_a)U^\dagger.
\end{aligned}
$$

The last line returns to the same $R_V$ in the original site basis. The [spectral permutation theorem for unitary similarity of Hermitian matrices](lean:D5/S3/Quantum/Schatten/MatrixSimilarity.IsHermitian.eigenvalues_eq_of_unitary_similarity_diagonal) therefore identifies all its eigenvalues with $\lambda_a$, indexed by a permutation of the Boolean occupation strings. The multiset has exactly $2^\ell$ entries, retaining repeated values, zero eigenvalues, and impossible occupation sectors with their multiplicities. A completely empty or filled mode still contributes the weight pair $1,0$; selecting the two factors explicitly avoids $0^0$. For $\ell=0$ the empty product is $1$, the sole density eigenvalue.

The $k\times k$ occupied-mode Gram matrix $X^\dagger X$ and $A$ share only their nonzero spectrum; their dimensions can differ. The complete spatial spectrum requires all $\ell$ spatial modes: retain the multiplicities of the nonzero compressed eigenvalues and pad with zeros to $\ell$ entries. The particle-mode count $k$ cannot replace the spatial-mode count. The derivation also covers $N=0$, the vacuum $k=0$, full filling $k=N$, and the full prefix $\ell=N$. The full prefix is still pure, with one density eigenvalue $1$ and all others zero.

**Entropy of the actual density state and correspondence with the literature.** For this $\rho_I$ constructed by partial trace, the [spectral entropy identity](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.entropy_eq_spectral) gives its von Neumann entropy. Extend $x\log x$ continuously to zero at the origin. Then

$$
\begin{aligned}
S(\rho_I)&=-\Tr(\rho_I\log\rho_I)
=-\sum_{a\in\{0,1\}^{\ell}}\lambda_a\log\lambda_a\\
&=\sum_{i=1}^{\ell}h(\nu_i),\\
h(x)&=-x\log x-(1-x)\log(1-x).
\end{aligned}
$$

The density matrix used here is $R_V$ in the original basis, rather than a separately chosen realization of the spectrum. The product weights satisfy $\sum_a\lambda_a=\prod_i((1-\nu_i)+\nu_i)=1$. Split the sum by one Boolean coordinate and use $-(xy)\log(xy)=y(-x\log x)+x(-y\log y)$; iterating gives the binary-entropy sum. This identity and the zero convention retain singular density states, so $h(0)=h(1)=0$. Logarithms are natural; entropy in bits requires division by $\log2$. This is an application derived from the original finite-matrix results, with no separate full Slater theorem or independent verification badge.

Peschel, [*Calculation of reduced density matrices from correlation functions*](https://arxiv.org/pdf/cond-mat/0212631v1), Eqs. (8)–(11), gives the mode description of the reduced free-fermion density matrix. Klich, [*Lower entropy bounds and particle number fluctuations in a Fermi sea*](https://arxiv.org/pdf/quant-ph/0406068v2), Eq. (4), Eq. (7) and its subsequent factors $\operatorname{diag}(1-d_i,d_i)$, and Eq. (11), supplies the corresponding projected-mode decomposition, product spectrum, and entropy formula. Here $d_i=\nu_i$, and $\ell$ counts sites in the spatial region. Klich's Eq. (7) uses an appropriate fermionic tensor product; the prefix derivation above additionally makes the correspondence with the literal tensor partial trace in natural site order explicit.

**Two-point functions of the same Slater state.** Keep the actual vector above, write $\psi_V(x)=\langle x\mid\Psi_V\rangle$ and $\rho_V=\lvert\Psi_V\rangle\langle\Psi_V\rvert$, and use the original site order's [`JordanWigner.fullC`](https://github.com/the-omega-institute/trureturing/blob/1691f49c1d5198ff7cf7354f5f318d08184c6436/D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.lean#L57) as $c_i$. Its [occupation-basis entry](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/HardCoreCompression.fullC_entry) is nonzero exactly when the input occupies $i$ and the output empties that site, with coefficient $(-1)^{n_S(i)}$, where $n_S(i)=|\{a\in S:a<i\}|$. These original operators and determinant amplitudes directly give

$$
\begin{aligned}
K_{ij}&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr)=P_{ij},\\
C_{ij}&=\Tr\bigl((\rho_V c_i^\dagger)c_j\bigr)
=P_{ji}=\overline{P_{ij}},\\
C&=P^{\mathsf T}.
\end{aligned}
$$

To track the exchange signs, let $E_{j,i}$ have its sole nonzero entry $1$ in row $j$, column $i$. Over the complex polynomial ring, set

$$
\begin{aligned}
W(X)&=(I_N+XE_{j,i})V,\\
W(X)_{j,b}&=V_{j,b}+XV_{i,b}.
\end{aligned}
$$

All other rows stay fixed. Define $\psi_{W(X)}(x)$ by the same increasing-row minor rule, without requiring column orthonormality of $W(X)$. For every occupation word,

$$
[X]\psi_{W(X)}(x)
=\bigl(c_j^\dagger c_i\Psi_V\bigr)(x).
$$

Here $[X]$ extracts the linear coefficient. Words of the wrong particle number give zero on both sides because the operator preserves particle number. Now suppose $|S(x)|=k$. If $j\notin S(x)$, the selected minor contains no changing row, and the creation action also vanishes at that output. If $j\in S(x)$, put $R=S(x)\setminus\{j\}$. When $i\in R$, the replacement produces a repeated row, so both the determinant and annihilation action vanish. Otherwise, returning the replacement row to increasing order gives, on both sides,

$$
(-1)^{n_R(j)+n_R(i)}\det V_{R\cup\{i\}}.
$$

The two counts record the row exchanges for removing $j$ and inserting $i$, respectively; this includes $i=j$. The original suppliers for this sign correspondence are the private `fullC_sparse` and `fullC_create_sparse` in `D5/S3/Quantum/Fermionic/PeriodicSshExcessPseudoEntropyRefutation.lean`, and the private `sorted_position_count` and `sorted_removeNth` in `D5/S3/Quantum/FermionicCorrelationalBound/PhysicalContractionRdmBridge.lean`, accessible from the [pinned source root](trureturing:). The first pair gives the sparse actions above. The second identifies a row's position in increasing order with the number of smaller elements and preserves increasing order after removal. Its statements use natural-number indices; sending finite site indices to their natural-number values preserves order and gives the row permutation signs used here. These are helpers in the original source, without separate public declaration links.

Now apply the same [Cauchy–Binet identity](lean:D5/S3/Quantum/Schatten/CompoundMatrices.cauchyBinet) to $V^\dagger,W(X)$, this time over $\mathbb C[X]$:

$$
\begin{aligned}
F(X)&:=\det\bigl(V^\dagger W(X)\bigr)\\
&=\sum_{x\in\{0,1\}^N}
\overline{\psi_V(x)}\,\psi_{W(X)}(x)\\
&=\det\bigl(I_k+XV^\dagger E_{j,i}V\bigr).
\end{aligned}
$$

The last line uses only $V^\dagger V=I_k$. In the determinant expansion, linear terms select exactly one diagonal position, so $[X]\det(I+XB)=\Tr B$. Extracting the coefficient on the sum side and expanding the trace of the rank-one density matrix gives

$$
\begin{aligned}
[X]F(X)
&=\sum_x\overline{\psi_V(x)}
\bigl(c_j^\dagger c_i\Psi_V\bigr)(x)\\
&=\Tr\bigl((\rho_V c_j^\dagger)c_i\bigr),\\
[X]F(X)
&=\Tr\bigl(V^\dagger E_{j,i}V\bigr)\\
&=\Tr\bigl(E_{j,i}VV^\dagger\bigr)=P_{ij}.
\end{aligned}
$$

This proves $K_{ij}=P_{ij}$ for the same actual state. Exchanging $i,j$ and using $P^\dagger=P$ gives the formula for $C$. No covariance, Gaussianity, or normalization is assumed, and no other density matrix replaces $\rho_V$. Complex phases matter: for $N=2,k=1$ and $V=(3/5,4\mathrm{i}/5)^{\mathsf T}$, $K_{01}=-12\mathrm{i}/25$ whereas $C_{01}=12\mathrm{i}/25$. These finite sums also cover the vacuum ($K=0$), full filling ($K=I_N$), equal sites, and both orders of distinct sites. For $N=0$ there are no site indices $i,j$ to choose. This is a standard application of the original results, without a separate full endpoint theorem or independent verification badge.

Dereziński's [§7.1–§7.2, Eqs. (7.51)–(7.54)](https://www.fuw.edu.pl/~derezins/clifford.pdf) gives the occupation-basis and Slater conventions. His Theorem 8.1, particularly $\omega_\pi(d\Gamma(h))=\Tr(\pi h)$ in Eq. (8.103), gives the corresponding one-body expectation formula. Peschel's Eqs. (7), (9)–(10) use $C$; the transpose in his Eq. (12) cannot be omitted for complex modes. Peschel also notes that, for a non-Slater state, the free-fermion density matrix reconstructed from the same two-point function generally fails to reproduce other expectation values. Correlation agreement therefore does not determine a general density matrix. More general gauge-invariant Gaussian density matrices have the same spectral recipe, but require a separate Gaussianity hypothesis; their scope differs from the derivation starting with the specified determinant amplitudes. When $0$ or $1$ occurs, Peschel's matrix-logarithm formula (12) cannot be applied directly. Arbitrary nonprefix site subsets also involve Jordan–Wigner strings and a choice of fermionic subsystem, whose correspondence requires a separate argument. An address-digit cut still cannot substitute for a physical spatial cut.

Moustaj–Krebbekx–Morais Smith, *Anomalous Polarization in One-dimensional Aperiodic Insulators* ([10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003), §§IV–V, §V.C, and Appendix B), study a pumping family with on-site terms and specified fillings; their correlation-matrix method depends on the chosen Slater/Gaussian state and subsystem and does not transfer directly to arbitrary encoded states. Here $\delta_{\rho,j}$ is only the single-particle distance to zero energy; a many-body excitation gap also requires a filling, particle-number sector, and gap convention. This single-particle limit and the planar Bell-pair construction use different cuts. For the specified chain and filling, connecting the physical cut to the internal window geometry remains a separate task. Spatial entanglement of the chain's Slater state is an open question in [@prob-ch39-p2e-fractal-horizon].
:::
