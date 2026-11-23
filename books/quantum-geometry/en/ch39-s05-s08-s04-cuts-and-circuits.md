# 35.6.8.4 Noncontiguous cuts, purity, and direction complexes {#sec-ch39-s05-s08-s04-cuts-and-circuits}


**A calculation for disjoint sites.** On four sites ordered $0,1,2,3$, take the orthonormal orbitals $u=(e_0+e_2)/\sqrt{2}$ and $v=(e_1+e_3)/\sqrt{2}$ and keep $I=\{0,2\}$. The two-row determinants in increasing site order give

$$
\lvert\Psi\rangle
=\tfrac12\bigl(\lvert1100\rangle+\lvert1001\rangle
-\lvert0110\rangle+\lvert0011\rangle\bigr).
$$

For the ordinary tensor partial trace, group the amplitudes by the occupation string on $(1,3)$. When those sites have string $10$, the retained amplitude vector is $(\lvert10\rangle-\lvert01\rangle)/2$. For string $01$, it is $(\lvert10\rangle+\lvert01\rangle)/2$. The two vectors are orthogonal and each has squared norm $1/2$, so the reduced density matrix has spectrum $(1/2,1/2,0,0)$ and entropy $\log 2$.

The one-particle compression $P_I=u_Iu_I^\dagger$ of the same state has eigenvalues $1,0$. The fermionic mode product formula gives spectrum $(1,0,0,0)$ and zero entropy. Replacing the second orbital with $e_3$ gives exactly the same $P_I$, while the ordinary partial trace now has only the component with discarded string $01$, leaving a pure state on the retained sites. Thus $P_I$ alone cannot determine the ordinary tensor partial-trace spectrum for this disjoint cut. For occupied sites $1,2$, the row order puts the component of $v$ first and the component of $u$ second, giving the negative determinant. For the role of the Jordan–Wigner string between the two blocks in the reduced state, see Fagotti and Calabrese, [*Entanglement entropy of two disjoint blocks in XY chains*, §2, Eqs. (11)–(19)](https://arxiv.org/pdf/1003.1110).

**When does the product spectrum hold for every state?** On a finite ordered set of sites, let $I$ be the retained side and $J$ the side traced out. Require the ordinary tensor partial trace to have the full fermionic mode product spectrum above for every particle number $0\le k\le N$ and every Slater state with that particle number. This holds exactly when $I$ or $J$ is an interval in the original site order, with the empty set counted as an interval. Equivalently, membership switches sides at most twice as we read the sites in order. With at least three switches, taking one site from each of the first four runs gives an increasing $I,J,I,J$ or $J,I,J,I$.

Write $a\subseteq I$ and $b\subseteq J$ for the occupied sites on the two sides. The amplitudes are supported on $|a|+|b|=k$. Starting with the occupied determinant rows in the original site order, move the rows for $a$ ahead of the rows for $b$, preserving the order within each group. Each $j\in b$ to the left of $i\in a$ crosses $i$ exactly once, so the two amplitudes differ by $(-1)^{c(a,b)}$, where

$$
c(a,b)=\bigl|\{(i,j)\in a\times b\mid j<i\}\bigr|.
$$

The grouped amplitudes are precisely the ordered-prefix amplitudes in the site order that lists all of $I$ before $J$. In that order the wedge product of occupation basis vectors puts the retained vectors first and the traced vectors second, so the coefficients in the fermionic tensor product are exactly the grouped determinants. This reorders only the rows of the orbital matrix and gives the same $P_I=V_I V_I^\dagger$ in the original order within $I$. Taking the partial trace of these grouped coefficients gives the spectrum in the fermionic mode product formula above.

If $I$ is a nonempty interval, let $b_{\mathrm{left}}$ consist of the sites of $b$ to its left. Each of those sites crosses every site in $a$, giving $c(a,b)=(k-|b|)|b_{\mathrm{left}}|$. The sign depends only on $b$ and cancels with its conjugate in the trace over $b$. If $J$ is a nonempty interval, let $a_{\mathrm{right}}$ consist of the sites of $a$ to its right. Then $c(a,b)=(k-|a|)|a_{\mathrm{right}}|$. The sign depends only on $a$, so the retained density matrices in the two orderings are related by conjugation with a diagonal unitary. Both cases preserve every eigenvalue with its multiplicity. An empty side gives $c(a,b)=0$.

If four alternating sites exist, put the two orbitals from the example above on those four sites and leave every other site empty. Reversing which side starts the alternation exchanges the retained and traced sides. The two reductions of the four-site pure state have the same nonzero eigenvalues by the Schmidt decomposition. In either orientation the ordinary partial trace has exactly two nonzero eigenvalues, both $1/2$. Meanwhile $P_I$ is the rank-one projection onto the orbital supported entirely on the retained side, so the product spectrum has just one nonzero eigenvalue, $1$. Extra empty sites only add zeros. This gives a two-particle counterexample for every cut containing four alternating sites.

**The criterion at a given filling.** For a given particle number $k$, the product formula holds for every Slater state at every cut if $k\le 1$ or $N-k\le 1$. For $2\le k\le N-2$, it holds for every Slater state at a cut exactly when $I$ or $J$ is an interval. [Fixed-filling criterion](lean:D5/S3/Quantum/Fermionic/OrderedSlaterFixedFilling.fixed_filling_spectral_criteria)

Write the holes as $a^{\mathrm h}=I\setminus a$ and $b^{\mathrm h}=J\setminus b$. Partition $I\times J$ according to whether each endpoint is occupied or empty, and count the pairs with $j<i$. This gives

$$
c(a,b)+c(I,J)=c(a,J)+c(I,b)+c(a^{\mathrm h},b^{\mathrm h}).
$$

The reordering sign of an occupation string and that of the corresponding hole string therefore differ by the separate factors $(-1)^{c(a,J)}$ and $(-1)^{c(I,b)+c(I,J)}$. The first gives diagonal unitary conjugation on the retained side, and the second cancels in the trace over $b$. This accounts for the two filling limits. When $k\le1$, every nonzero amplitude has $c(a,b)=0$. When $N-k\le1$, at least one side has no holes, so the hole term $c(a^{\mathrm h},b^{\mathrm h})$ vanishes.

For $2\le k\le N-2$, choose $k-2$ sites outside the four alternating sites and call their set $T$. In increasing site order, append the corresponding unit vectors to the two original orbitals. The appended orbitals are mutually orthogonal and have support disjoint from the original orbitals. If an occupation set omits a site of $T$, the corresponding appended column in its determinant is zero. If the occupation set contains $T$, its two remaining sites must come from the original four, since any other row is zero.

Write such an occupation set as $a\cup b\cup T$, where $a$ and $b$ are the occupied subsets of the four original sites on sides $I$ and $J$. Move the rows of $T$ to the end in increasing order. They form an identity block on the appended columns, leaving the determinant for the four-site amplitude. The row move crosses each pair $s\in T$, $i\in a\cup b$ with $s<i$ once. With $m_T(i)=|\{s\in T\mid s<i\}|$, the sign is

$$
(-1)^{\sum_{i\in a}m_T(i)}\,(-1)^{\sum_{j\in b}m_T(j)}.
$$

Let $D_I,D_J$ be the diagonal sign matrices given by these two factors on the respective occupation bases of the four-site example. Let $E_I$ send the retained basis vector $\lvert a\rangle$ to $\lvert a\cup(T\cap I)\rangle$, and define $E_J$ on the traced side in the same way. The remaining sites stay empty. Both maps send distinct basis vectors to distinct basis vectors and are therefore isometries. Writing $M_0$ and $M_T$ for the four-site and extended amplitude matrices gives

$$
\begin{aligned}
M_T&=E_I D_I M_0 D_J E_J^\dagger,\\
M_T M_T^\dagger&=E_I D_I M_0M_0^\dagger D_I^\dagger E_I^\dagger.
\end{aligned}
$$

The ordinary reduced state has the four-site spectrum on the image of $E_I$ and is zero on its orthogonal complement. Its full spectrum therefore still has exactly two nonzero eigenvalues, $1/2,1/2$. The compression $P_I$ adds the coordinate projections for the sites in $T\cap I$ to the original rank-one projection. These projections have mutually orthogonal ranges, so $P_I$ is a projection of rank $1+|T\cap I|$ and all its eigenvalues are $0$ or $1$. The fermionic product spectrum therefore has just one nonzero eigenvalue, $1$.

**When does the one-particle compression determine the reduced spectrum?** Fix the cut and the particle number $k$. Whenever the product-spectrum criterion above holds, $P_I$ determines the full spectrum of the ordinary tensor partial trace. For intermediate fillings at a cut containing four alternating sites, use the four-site construction with the same fixed occupied set $T$. Replace the orbital supported entirely on $J$ with the unit vector at either site in its support. The two orbital matrices agree column by column on $I$, so they give the same $P_I$. After the replacement, every nonzero amplitude has the same occupation string on $J$, consisting of $T\cap J$ and the site of the new orbital. Grouping by the occupation string on $J$ leaves a single amplitude vector, so the reduced state is pure.

Write $D=2^{|I|}$. The two reduced states, before and after the replacement, have characteristic polynomials $x^{D-2}(x-1/2)^2$ and $x^{D-1}(x-1)$, respectively, and entropies $\log 2$ and $0$. The two states give [a counterexample with the same compression and different spectra](lean:D5/S3/Quantum/Fermionic/OrderedSlaterFixedFilling.alternating_fixed_filling_compression_twins). When the filling and the cut are known, the product-spectrum criterion above is also the exact criterion for $P_I$ to determine the reduced spectrum for every Slater state.

**The alternation matrix for several two-site orbitals.** Take $a$ orbitals supported entirely in $I$ and $b$ supported entirely in $J$, each with amplitude $1/\sqrt{2}$ at its two sites. All pairs of sites are disjoint. Order the retained columns first. Use $x\in\mathbb F_2^a$ and $y\in\mathbb F_2^b$ to encode a choice of the earlier or later endpoint of each pair. Every nonzero determinant selects exactly one site from each pair, so the amplitude matrix vanishes on all other occupations. Let $A_{ij}\in\mathbb F_2$ indicate whether retained pair $i$ and discarded pair $j$ have alternating endpoints.

On these occupations, the row permutation contributes its inversion sign. Inversions within either side depend only on that side's choices. For two pairs across the cut, the sum modulo $2$ of the inversion indicators over the four endpoint choices equals the parity of the number of discarded endpoints strictly between the retained endpoints. Thus the mixed coefficient of $x_i,y_j$ is precisely $A_{ij}$. Absorbing the signs that depend on one side alone gives the amplitude matrix

$$
M_{xy}=2^{-(a+b)/2}(-1)^{x^\mathsf T A y}.
$$

Summing over $y$ gives $(MM^\dagger)_{xx'}=2^{-a}$ when $A^\mathsf T x=A^\mathsf T x'$. Otherwise, pair each $y$ with the result of flipping a coordinate that reverses the sign, so the sum vanishes. Put $r=\operatorname{rank}_{\mathbb F_2} A$. Each nonempty fiber of $A^\mathsf T$ has $2^{a-r}$ elements. The marginal therefore has $2^r$ constant blocks, each contributing one eigenvalue $2^{-r}$. Including the zero space on all other occupations gives the full characteristic polynomial

$$
x^{\,2^{|I|}-2^r}(x-2^{-r})^{2^r}.
$$

[Equal-weight characteristic polynomial](lean:D5/S3/Quantum/Fermionic/SlaterPairCutRank.orderedCut_pair_charpoly)

The same binary-rank calculation appears for bipartitions of graph states. Here the matrix entries come from the site order in the Slater determinants. [Hein, Eisert and Briegel, Proposition 3](https://arxiv.org/abs/quant-ph/0307130)

Replace each discarded orbital by the coordinate vector at its earlier endpoint. The retained compression stays the same. The discarded side now has one occupation string, so the ordinary marginal is pure and the entropy difference is $r\log 2$. For example, concatenate $m$ four-site blocks ordered $I,J,I,J$. Endpoints from distinct blocks do not alternate, so $A$ is the $m$-dimensional identity. This gives two $2m$-particle Slater states with equal retained compression at the same cut and ordinary marginal entropies $m\log 2$ and zero.

[Coordinate replacement and its characteristic polynomial](lean:D5/S3/Quantum/Fermionic/SlaterPairCutRank.coordinate_replacement)

**The entropy bound for unequal endpoint weights and when it is attained (written proof).** Keep the cut and disjoint pairs above, and allow arbitrary complex amplitudes on the two endpoints of each normalized orbital. An orbital with zero amplitude at one endpoint must occupy the other. Fix all such endpoints and delete the corresponding rows and columns of the alternation matrix. Write $A$ for the resulting matrix and $a,b$ for the remaining pair counts on each side. Let $p_i,q_j$ be the probabilities of selecting the later endpoint, given by the squared moduli of the corresponding amplitudes. Put $r=\operatorname{rank}_{\mathbb F_2}A$. The ordinary marginal has rank $2^r$ and entropy at most $r\log 2$. Equality holds exactly when the rows with $p_i=1/2$ span the row space of $A$ and the columns with $q_j=1/2$ span its column space, both over $\mathbb F_2$.

Each determinant with nonzero amplitude still has a single term, the product of the selected amplitudes times the inversion sign. An inversion involving a fixed endpoint depends on choices on at most one side. The mixed coefficients for the remaining cross-cut inversions still follow from the four endpoint choices above. Absorb the complex phases of the endpoint amplitudes and the signs that depend on one side into the basis vectors. Let $\mu,\nu$ be the product Bernoulli laws of the endpoint strings $x\in\mathbb F_2^a$ and $y\in\mathbb F_2^b$, with parameters $p_i,q_j$, respectively. On the corresponding occupation strings the amplitude matrix is

$$
M_{xy}=\sqrt{\mu(x)}\,(-1)^{x^\mathsf T A y}\sqrt{\nu(y)} .
$$

The fixed occupations are included when embedding these basis vectors in the original space. Distinct endpoint strings give distinct occupation strings, and all other strings have zero amplitude.

Set $U=\operatorname{im} A^\mathsf T$ and $V=\operatorname{im} A$. Group endpoint strings by $u=A^\mathsf T x$ and $v=Ay$ on the two sides. The probabilities of the groups are

$$
P(u)=\sum_{A^\mathsf T x=u}\mu(x),\qquad
Q(v)=\sum_{Ay=v}\nu(y).
$$

Every group has positive mass. For each $u,v$, set $H_{uv}=(-1)^{x^\mathsf T A y}$ using any representatives of the groups. Adding a vector in $\ker A^\mathsf T$ to $x$, or a vector in $\ker A$ to $y$, leaves the exponent the same. The normalized vector for $u$ has components $\sqrt{\mu(x)/P(u)}$ within its group and zero elsewhere. The groups have disjoint supports, so these vectors are orthonormal. The vectors for $v$ are defined in the same way, with components $\sqrt{\nu(y)/Q(v)}$ on their groups. Let $E_I,E_J$ have these normalized vectors as columns. Then

$$
M=E_I K E_J^\dagger,\qquad K_{uv}=\sqrt{P(u)}\,H_{uv}\sqrt{Q(v)} .
$$

The nonzero spectrum of the original marginal is therefore the nonzero spectrum of $KK^\dagger$. Put $d=2^r$, the number of indices on each side. If $u\ne u'$, choose a coordinate $j$ in which $u+u'$ is nonzero. Pairing $v$ with $v+Ae_j$ reverses the sign of each term in $\sum_{v\in V}H_{uv}H_{u'v}$, so the sum is zero. When $u=u'$ the sum is $d$. Thus $HH^\dagger=dI$. The positive masses give invertible diagonal factors on either side of $H$ in $K$, so the rank is $d$.

The $d$ positive eigenvalues $\lambda_1,\ldots,\lambda_d$ sum to $1$. Strict concavity of $-t\log t$ gives the entropy bound $\log d$, with equality exactly when each $\lambda_\ell=1/d$. At equality, $KK^\dagger=I/d$, and invertibility of the square matrix $K$ gives $K^\dagger K=I/d$ as well. The two diagonals are $P(u)$ and $Q(v)$, respectively, since $|H_{uv}|=1$ and each group of masses sums to $1$. Both distributions must therefore be uniform. Conversely, when both sets of masses are $1/d$, we have $K=H/d$ and $KK^\dagger=I/d$.

Write $a_i\in U$ for row $i$ of $A$. The variable $u=\sum_i x_i a_i$ has law $P$. For any linear functional $\ell:U\to\mathbb F_2$, independence of the endpoint choices gives

$$
\mathbb E_P[(-1)^{\ell(u)}]
=\prod_{i:\,\ell(a_i)=1}(1-2p_i).
$$

The $d$ sign functions form an orthogonal basis of the functions on $U$. For orthogonality, sum a nontrivial sign function by pairing each point with its translate by a vector at which the functional is $1$. Thus $P$ is uniform exactly when every nonzero $\ell$ has zero expectation. The product vanishes precisely when some row with $\ell(a_i)=1$ has $p_i=1/2$. If the balanced rows span $U$, every nonzero $\ell$ takes value $1$ on some such row. If they span a proper subspace, extend a basis of that subspace to a basis of $U$ to obtain a nonzero functional vanishing on every balanced row. Applying the same argument to $Q$ and the columns of $A$ gives the condition on the other side. When $r=0$, each group index has a single possible value, the marginal is pure, and both spanning conditions hold automatically. This includes the case where either side has no remaining orbitals.

The [uniformity criterion for binary endpoint laws](lean:D5/S3/Combinatorics/Probability/BinaryEndpointLaw.mass_eq_uniform_iff_span) applies to both $P$ and $Q$.

For example, take retained pairs $(0,4)$ and $(1,3)$ and a discarded pair $(2,5)$. Both rows of $A$ are $(1)$. If either one of the retained orbitals is balanced and the discarded orbital is balanced, the entropy is $\log 2$. The other retained orbital may have any positive endpoint probabilities.

**Purity of the unequal-weight marginal (written derivation).** Use the matrix $A$ and endpoint probabilities after fixing deterministic endpoints as above. Let $\rho_I$ be the retained marginal. Draw $x,x'$ independently from $\mu$ and set $z=x+x'$ over $\mathbb F_2$. The bits $z_i$ are independent and each equals $1$ with probability $2p_i(1-p_i)$. Averaging over these bits gives the purity.

$$
\operatorname{Tr}(\rho_I^2)
=\mathbb E_z\!\left[\prod_{j:\,(A^\mathsf{T}z)_j=1}(1-2q_j)^2\right].
$$

On the supported occupation basis, $(MM^\dagger)_{xx'}$ is $\sqrt{\mu(x)\mu(x')}$ times $\mathbb E_{y\sim\nu}[(-1)^{z^\mathsf{T}Ay}]$. Independence factors the expectation over $y_j$. Each coordinate with $(A^\mathsf{T}z)_j=1$ contributes $1-2q_j$, and every other coordinate contributes $1$. The trace of the square of a Hermitian matrix is the sum of the squared moduli of its entries. Summing over $x,x'$ gives the formula. Conjugating by the diagonal unitary of retained phases and inserting zero rows and columns for the other occupations preserve the trace. The empty product equals $1$, so the purity is $1$ when $A$ is zero.

The [purity formula for the ordinary occupation marginal](lean:D5/S3/Quantum/Fermionic/WeightedSlaterPairCut.orderedMarginal_purity) allows arbitrary complex endpoint amplitudes, including zeros. When their squared moduli are normalized endpoint probabilities, the retained mass autocorrelations give the distribution of $z$.

When one retained pair alternates with one discarded pair, $A=(1)$. Adding the terms for $z=0$ and $z=1$ gives purity $1-8p(1-p)q(1-q)$. For instance, $p=q=1/4$ gives $23/32$, while $p=q=1/2$ gives $1/2$.

**Purity excess and the two endpoint laws (written derivation).** Return to the two image spaces of size $d=2^r$ with laws $P,Q$. Write $\Delta_P=\sum_u(P(u)-1/d)^2$ and define $\Delta_Q$ in the same way. Let $m=\min_u P(u)$. Then

$$
\operatorname{Tr}(\rho_I^2)-\frac1d
\ \ge\ \Delta_P+(2dm-d^2m^2)\Delta_Q .
$$

The bound also holds with the two sides exchanged and the coefficient calculated from $\min_v Q(v)$. Equality holds in the displayed bound when $P$ exceeds $m$ at at most one site. For a single alternating pair on each side with $p=q=1/4$, the two deviations are both $1/8$. The right side is $7/32$, exactly $23/32-1/2$.

Set $C=H\operatorname{diag}(Q)H^\mathsf T$. This real symmetric matrix has $C_{uu}=1$. Since $H^\mathsf T H=dI$ and $H_{uv}^2=1$, each row has squared norm $d\sum_v Q(v)^2$. Removing the diagonal contribution leaves $d\Delta_Q$ in every row and column. The marginal purity is $\sum_{u,u'}P(u)P(u')C_{uu'}^2$. On the off-diagonal terms, write $P(u)=m+R(u)$. The constant and linear terms contribute $(dm^2+2m\sum_u R(u))d\Delta_Q$. Using $\sum_u R(u)=1-dm$ and subtracting the uniform-spectrum purity $1/d$ gives the displayed right side plus the nonnegative remainder $\sum_{u\ne u'}R(u)R(u')C_{uu'}^2$. This remainder vanishes when the surplus is concentrated at one site. Transposing the amplitude matrix exchanges the sides and preserves the nonzero spectrum, so the same calculation controls the other law.

**Does balancing one orbital lower purity?** Define $A$ using all the pairs, including any orbital that originally occupies a fixed endpoint. Keep the discarded probabilities $q_j$ and the other retained orbitals fixed. Making retained orbital $i$ balanced when $p_i\ne1/2$ weakly decreases purity. Let $L=\{j:0<q_j<1\}$. The decrease is strict exactly when row $i$ restricted to $L$ lies outside the $\mathbb F_2$-span of the other balanced retained rows restricted to $L$.

Take two independent discarded endpoint strings and let $w$ be their binary difference. Write $b_k=(1-2p_k)^2$. The two marginals have the same nonzero spectrum, so the preceding purity formula can be applied on the discarded side. A fixed endpoint on that side has difference bit zero. A fixed endpoint on the other side contributes a squared factor of $1$. Thus the formula uses the full $A$. Making orbital $i$ balanced sets $b_i$ to zero, and the purity before balancing minus the purity afterward is

$$
b_i\sum_{w:\,(Aw)_i=1}\Pr(w)
  \prod_{\substack{k\ne i\\(Aw)_k=1}} b_k .
$$

Every term is nonnegative. The support of $w$ consists of all binary strings that vanish off $L$. The decrease is strictly positive precisely when one of these strings has dot product $1$ with row $i$ and dot product zero with every other balanced row. Such a string cannot exist if the restricted row is in their span. Otherwise append the restricted row to a basis of that span and extend to a basis of $\mathbb F_2^L$. The functional taking value $1$ on the appended row and zero on the other basis vectors gives the required string under the dot product.

**A lower bound on the purity decrease (written derivation).** If the decrease is strict, form a matrix $C$ from row $i$ and the other balanced rows, all restricted to $L$. Choose any index set $J$ whose columns form a basis of the column space of $C$. The purity before balancing minus the purity afterward is at least

$$
b_i\left(\prod_{\substack{k\ne i\\p_k\ne 1/2}} b_k\right)
    \left(\prod_{j\in J} 2q_j(1-q_j)\right).
$$

The first product ranges over the other biased orbitals. Each $b_k$ is at most $1$, so the product in the purity difference is at least this product whenever $Cw=e$, where $e$ takes value $1$ in row $i$ and zero in every other balanced row. Strict decrease guarantees that $e$ belongs to the column space of $C$. Fix the difference bits outside $J$ and subtract their contribution from $e$. The residual is still in the column space, so the basis columns uniquely determine the required bits in $J$. At each $j\in J$, the probability of a $1$ is $2q_j(1-q_j)\le 1/2$, which also lower bounds the probability of either prescribed bit. Multiply these bounds using independence and average over the bits outside $J$. This gives the claimed purity bound. When one retained pair alternates with one discarded pair, $C=(1)$ and the constraint asks for the sole discarded bit to be $1$, so equality holds.

The [purity-drop lower bound](lean:D5/S3/Quantum/Fermionic/WeightedSlaterPurityDropBound.orderedMarginal_purity_drop_lower_bound) formalizes this inequality for the ordinary marginal.

**When the bound is attained (written derivation).** Under strict decrease, write $a_k$ for retained row $k$ restricted to $L$, and let $S$ be the span of the other balanced restricted rows. Write $e_j$ for the row with a $1$ in coordinate $j$ and zeros elsewhere. For a given column basis $J$, the bound is attained exactly when both conditions hold.

- For every retained orbital with $k\ne i$, $0<p_k<1$ and $p_k\ne 1/2$, the row $a_k$ belongs to the affine coset $a_i+S$.
- For every basis column $j\in J$ with $q_j\ne 1/2$, the coordinate row $e_j$ belongs to $a_i+S$.

The [per-basis equality criterion](lean:D5/S3/Quantum/Fermionic/OrderedSlaterPurityDropEquality.orderedMarginal_purity_drop_eq_iff) formalizes the equivalence between attainment and these two conditions.

Every assignment of the bits in $L\setminus J$ has positive probability and extends uniquely to a solution of $Cw=e$ on $L$. At each solution, every basis-bit probability and every other biased retained factor is at least the positive lower bound used in the proof. Equality in the sum requires equality in every factor at every solution. A retained orbital with $0<p_k<1$ and $p_k\ne 1/2$ has $0<b_k<1$, so its factor reaches the lower bound exactly when $a_k\cdot w=1$. For a basis column with $q_j\ne 1/2$, bit $1$ is strictly less probable than bit zero, so the required bit must be $e_j\cdot w=1$. A deterministic retained endpoint has $b_k=1$. A balanced discarded orbital gives probability $1/2$ to each difference bit.

Choose a solution $w_0$ of $Cw=e$. The full solution set is $w_0+\ker C$. A row $r$ has dot product $1$ with every solution exactly when it annihilates $\ker C$ and $r\cdot w_0=1$. The annihilator is the row space $S+\mathbb F_2 a_i$. Rows of $S$ give zero on $w_0$, and $a_i$ gives $1$, so the required rows form precisely $a_i+S$.

**Does any column basis attain the bound? (Written derivation.)** Continue to assume a strict decrease and suppose the retained-row condition above holds. Let $Q=\{j\in L:q_j=1/2\}$, and let $C_Q$ consist of the columns for those balanced discarded orbitals. Let $K$ contain the indices $j\in L\setminus Q$ for which deleting column $j$ from $C$ removes $e$ from the span of the remaining columns. Some column basis attains the bound exactly when

$$
\operatorname{rank} C_Q + |K| = \operatorname{rank} C.
$$

In that case, take any column basis of $C_Q$ and add every column indexed by $K$. If the retained-row condition fails, every column basis gives a lower bound strictly below the actual decrease.

The remaining columns span $e$ after deletion of column $j$ exactly when $Cw=e$ has a solution with $w_j=0$. Thus $K$ consists precisely of the unbalanced indices whose difference bits are $1$ in every solution. For $j\in K$, the other columns cannot span column $j$, since that would let us delete it without changing the column space. Each of these columns therefore belongs to every column basis, and together they are linearly independent modulo the column space of $C_Q$. The equality criterion permits only columns in $Q\cup K$. Their span has dimension $\operatorname{rank}C_Q+|K|$ and fills the entire column space exactly when this dimension equals the rank of $C$.

Take retained pairs $(0,2)$ and $(4,5)$ and discarded pair $(1,3)$, each with later-endpoint probability $1/4$. Balancing $(0,2)$ decreases purity by $3/32$, with a lower bound of $3/128$. The second retained pair has zero restricted row, so the first condition fails. Next take retained pair $(2,5)$ and discarded pairs $(0,3)$ and $(1,4)$, again with probabilities $1/4$. Now $C=(1\ \ 1)$ and either singleton column basis gives a bound of $3/32$. Only unequal difference bits contribute, giving a drop of $15/128$. Both coordinate rows lie outside the coset, so the second condition fails.

**Improving the lower bound with parity probabilities (written derivation).** Assume strict decrease and fix a column basis $J$. Write $B_J$ for the product lower bound above. Set $F=L\setminus J$ and $t_j=2q_j(1-q_j)$. Draw the free difference bits $Y_j$ on $F$ independently, with probability $t_j$ of a $1$, and extend them uniquely to the solution $w(Y)$ of $Cw=e$.

For a basis column $j\in J$, divide its probability factor by its lower bound $t_j$. The result is $1$ plus $(1-2t_j)/t_j$ times the indicator of $w_j(Y)=0$. The factor for each other biased retained orbital $k$, divided by its lower bound $b_k$, is $1$ plus $(1-b_k)/b_k$ times the indicator of $a_k\cdot w(Y)=0$. Write $\Delta$ for the purity decrease. Keeping the constant and linear terms in the product of these normalized factors gives

$$
\begin{aligned}
\Delta &\ge B_J(1+S_J),\\
S_J &=
\sum_{j\in J}\frac{1-2t_j}{t_j}\Pr[w_j(Y)=0]\\
&\quad+
\sum_{\substack{k\ne i\\p_k\ne 1/2}}
\frac{1-b_k}{b_k}\Pr[a_k\cdot w(Y)=0].
\end{aligned}
$$

Every term is nonnegative. If the original bound for this basis is strictly below the actual decrease, then $S_J>0$ because every free-bit assignment has positive probability. The improved bound is attained exactly when each assignment makes at most one factor exceed its lower bound. If two factors exceed their lower bounds at the same assignment, the product expansion contains a quadratic term that is positive there. Events with zero coefficient play no role in equality.

The extension $w(Y)$ is affine, so each event has the form $\sum_{j\in H}Y_j=d$ over $\mathbb F_2$, where $H\subseteq F$. Its indicator is $(1+(-1)^d\prod_{j\in H}(-1)^{Y_j})/2$. Independence gives

$$
\Pr\!\left[\sum_{j\in H}Y_j=d\right]
=\frac{1+(-1)^d\prod_{j\in H}(1-2t_j)}{2}.
$$

For empty $H$, this probability is $1$ for $d=0$ and zero for $d=1$. Two nonempty events are disjoint exactly when they have the same support $H$ and opposite right-hand sides $d$. Distinct nonzero binary linear forms are linearly independent, so there is an assignment satisfying both equations. If one equation holds everywhere, its event intersects every nonempty event. Checking these pairs among the nonempty events with positive coefficients decides whether the improved bound is attained.

In the example above with $C=(1\ \ 1)$, the basis bit is zero precisely when the free bit is $1$, which has probability $3/8$. The basis-bit coefficient is $2/3$, so $S_J=1/4$ and the improved bound $(3/32)(1+1/4)=15/128$ equals the actual decrease.

**When two parity events are independent (written derivation).** Let $H$ and $K$ be the supports of events $E_a$ and $E_b$, with right-hand sides $d_a$ and $d_b$. Set $\epsilon_a=(-1)^{d_a}$ and $\epsilon_b=(-1)^{d_b}$, and write $M(S)=\prod_{j\in S}(1-2t_j)$. Expand the product of the two indicator functions and take its expectation. In the product of the two parity signs, each shared bit contributes its sign squared. Only the signs on the symmetric difference $H\triangle K$ remain. Subtract the product of the individual probabilities and use $M(H)M(K)=M(H\triangle K)M(H\cap K)^2$ to get

$$
4\bigl(\Pr(E_a\cap E_b)-\Pr(E_a)\Pr(E_b)\bigr)=
\epsilon_a\epsilon_b\,M(H\triangle K)\bigl(1-M(H\cap K)^2\bigr).
$$

The free bits have $0<t_j\le 1/2$, so every bias factor lies in $[0,1)$. The right side vanishes exactly when the supports are disjoint or a fair bit belongs to exactly one support. A fair bit on one side can therefore give independence even when the events share biased bits. For example, if $Y_2$ is fair, the events $Y_1=0$ and $Y_1+Y_2=0$ are independent. [Lean proof of parity event independence](https://github.com/the-omega-institute/trureturing/blob/2aeab5c403ee83e81d64b7b9865b2830b1296d7f/Blueprint/D5/S3/Analytic/Probability/BernoulliParityIndependence.md)

**Choosing a column basis (worked example).** Take retained pairs $(1,5)$ and $(6,10)$ and discarded pairs $(0,2)$, $(7,11)$, and $(3,8)$, in that order. Their later-endpoint probabilities are $(1/4,1/2)$ and $(1/8,1/4,1/4)$ respectively. When balancing the first retained orbital,

$$
C=\begin{pmatrix}
1&0&1\\
0&1&1
\end{pmatrix},
\qquad e=\begin{pmatrix}1\\0\end{pmatrix},
\qquad (t_1,t_2,t_3)=(7/32,3/8,3/8).
$$

The two solutions of $Cw=e$ are $(1,0,0)$ and $(0,1,1)$. Add their probabilities and multiply by $b_1=1/4$ to obtain the actual drop of $25/512$. Columns $2,3$ give the largest original bound, $9/256$. Whenever the free bit $w_1=1$, both basis bits are zero and each contributes a relative excess of $2/3$. The first-order bound keeps the two linear terms and gives $(9/256)(1+2(7/32)(2/3))=93/2048$. Columns $1,2$ give an original bound of $21/1024$. Exactly one basis bit is zero at either solution, so the first-order bound reaches $25/512$.

**The quadratic correction and the degree required for equality (written derivation).** Let $\mathcal A$ index the basis-bit factors and the other biased retained factors. Write the relative excess in each factor as $g_a(Y)=\gamma_a\,\mathbf 1_{E_a}(Y)$ with $\gamma_a\ge 0$. For an integer $d\ge0$, define

$$
B_J^{(d)}=
B_J\sum_{\substack{S\subseteq\mathcal A\\|S|\le d}}
\left(\prod_{a\in S}\gamma_a\right)
\Pr\!\left[\bigcap_{a\in S}E_a\right].
$$

The empty set contributes $1$ to the sum. Expanding $\prod_{a\in\mathcal A}(1+g_a(Y))$ and taking its expectation gives $\Delta$ after multiplication by $B_J$. All terms are nonnegative, so $B_J^{(d)}$ increases weakly with $d$ and stays below or equal to $\Delta$. Every free-bit assignment has positive probability. If an assignment makes at least $d+1$ factors exceed their lower bounds in $B_J$, any $d+1$ of them give a strictly positive omitted term. Conversely, if at most $d$ factors exceed those lower bounds at each assignment, every omitted term vanishes. The smallest degree that recovers $\Delta$ is therefore the maximum number of simultaneous positive excesses. [Lean proof for finite product truncation](https://github.com/the-omega-institute/trureturing/blob/40c26026ec7a8a5f3361efd8213c04105759ccd0/Blueprint/D5/S3/Analytic/Probability/FiniteProductTruncation.md)

The quadratic correction uses joint probabilities. Write $E_a=\{\sum_{j\in H_a}Y_j=d_a\}$, let $\epsilon_a=(-1)^{d_a}$, and put $M(H)=\prod_{j\in H}(1-2t_j)$. In the product of the two indicator functions, the signs from shared bits square to $1$. Taking expectations gives

$$
\begin{aligned}
4\Pr(E_a\cap E_b)
={}&1+\epsilon_a M(H_a)+\epsilon_b M(H_b)\\
 &+\epsilon_a\epsilon_b M(H_a\mathbin{\triangle}H_b).
\end{aligned}
$$

The symbol $\triangle$ denotes symmetric difference. A free bit shared by the two supports drops out of the last term. In the example above with columns $2,3$, both events are $\{w_1=1\}$. The quadratic term $(9/256)(2/3)^2(7/32)=7/2048$ fills the gap between the first-order bound and the actual decrease.

Linear systems give a second way to test exactness. For each set $S$ of $d+1$ indices with $\gamma_a>0$, form the matrix $R_S$ of coefficient rows for their events and the column $v_S$ of right-hand sides. The events can occur together exactly when $v_S$ lies in the column space of $R_S$. Thus $B_J^{(d)}=\Delta$ if and only if $\operatorname{rank}[R_S\mid v_S]>\operatorname{rank}R_S$ for every such $S$. For example, the three events $Y_1=0$, $Y_2=0$, and $Y_1+Y_2=1$ on two free bits are compatible in pairs. Taken together the equations have no solution. For these three events with positive coefficients, degree two is exact and degree one has a strict gap.

For example, suppose both retained pairs alternate with the sole discarded pair and its endpoint probability satisfies $0<q<1$. Both restricted rows are $(1)$. When the first retained orbital is already balanced, balancing the second leaves purity unchanged. When all three later-endpoint probabilities start at $1/4$, balancing just the second retained orbital lowers purity from $83/128$ to $5/8$.

Choose any subset of the initially biased retained orbitals, including the empty set, and balance the selected orbitals one at a time. The number of strict purity decreases equals the dimension gain of the span of the restricted rows. Let $S_0$ be the span of the initially balanced orbitals' restricted rows, and let $S_1$ be the span after adjoining all the selected rows. Each step adjoins a single row. If the row lies in the current span, both dimension and purity stay the same. If it lies outside, the dimension increases by one and purity strictly decreases. Thus every ordering gives $\dim S_1-\dim S_0$ strict decreases. Purity is nonincreasing at every step, so the final purity is strictly below its initial value exactly when $\dim S_1>\dim S_0$.

**When a family of parity outputs is jointly independent (written derivation).** Consider finitely many affine binary parity outputs on the same independent free difference bits. Rows may share coordinates, and constant outputs are allowed. Assume each bit has probability $0<t_j\le 1/2$ of a $1$. Let $U$ be the fair coordinates and restrict each coefficient row to $U$. Joint independence holds exactly when both conditions hold.

- The indexed family of nonzero restrictions is linearly independent over $\mathbb F_2$.
- The rows with zero restriction have pairwise disjoint supports on the biased coordinates.

Fix the biased bits. The fair bits are uniform on $\mathbb F_2^U$. If the nonzero restrictions are linearly independent, their linear map onto the corresponding output space is surjective, and every output vector has the same number of preimages. The fixed affine shifts preserve this uniform law. These outputs are thus independent fair bits conditional on the biased inputs, with a conditional law that is constant across those inputs. The remaining outputs use only biased coordinates, so their disjoint supports give independence among them.

Conversely, suppose a nonempty collection of the nonzero restrictions sums to zero. The sum of its outputs depends only on biased bits and a constant offset. The expectation of its parity sign is a signed product of the factors $1-2t_j$ over the biased bits that survive the sum. This expectation is nonzero. Each selected row contains a fair bit, so the expectation of its sign is zero. Joint independence would give zero for the expectation of the product of the selected signs. Now consider two rows with zero restriction that share a biased coordinate. The product of their separate sign expectations includes the squared bias factors from their shared bits. In the expectation of the product of their signs, the shared signs square to $1$ and only the bias factors from the symmetric difference remain. Since the bias factors are strictly between zero and one, the two expectations differ and the outputs cannot be independent.

For example, take independent fair bits $Y_1,Y_2$. The outputs $Y_1$, $Y_2$, and $Y_1+Y_2$ are independent in pairs. The binary sum of all three outputs is always zero, so the family is jointly dependent.

**Total variation in a minimal dependent group (written derivation).** Take a dependent group of outputs $S$ whose every proper subset is jointly independent. Let $\mu$ be its joint law and $\nu$ the product of its marginal laws. For $u\in\{0,1\}^S$, write $\chi(u)=(-1)^{\sum_{i\in S}u_i}$ and let $d=\mathbb E_\mu[\chi]-\mathbb E_\nu[\chi]$. Then

$$
\begin{aligned}
\mu(u)-\nu(u)&=2^{-|S|}d\,\chi(u),\\
\operatorname{TV}(\mu,\nu)&=\frac{|d|}{2}.
\end{aligned}
$$

Choose one bit and fix the rest. The two laws agree after deleting that bit because the remaining outputs form a proper subset of $S$. Their probability differences at the two values of the deleted bit therefore sum to zero. Starting from the all-zero vector, each flip on the way to $u$ reverses the sign of the difference. Thus $\mu(u)-\nu(u)=c\,\chi(u)$, where $c=\mu(0)-\nu(0)$. Multiply by $\chi(u)$ and sum over $u$ to obtain $d=2^{|S|}c$. Total variation is half the sum of the absolute mass differences, so it equals $|d|/2$.

For the three fair outputs above, the parity sign is always $1$ under $\mu$ and has mean zero under $\nu$, giving total variation $1/2$. Add an independent biased bit $B$ to the third output, with $\Pr(B=1)=t<1/2$. Every pair is still uniform conditional on $B$, and the binary sum of all three outputs is now $B$. Total variation drops to $(1-2t)/2$. If two outputs are copies of the same biased bit $B$, the joint law instead has parity sign always $1$, while the product of the marginals has sign mean $(1-2t)^2$. In that case the total variation is $2t(1-t)$.

**Computing total variation for the whole family by cosets (written derivation).** Split the outputs into two groups. Let $J$ contain every output that uses at least one fair input bit, and let $L$ contain the rest. The linear image of the fair inputs on $J$ is a subspace $H\le\mathbb F_2^J$. Replace the output on $J$ by its coset in $C=\mathbb F_2^J/H$ and keep the output vector on $L$.

Fix the biased inputs. They determine the output on $L$. The output on $J$ is uniform on an affine coset because the linear map onto $H$ has equally sized fibers. Averaging over the biased inputs preserves equality of the masses within each coset. If $P(c,v)$ is the joint mass at the reduced output $(c,v)$, each of its original points receives $P(c,v)/|H|$.

Under the product of the marginals, each output in $J$ is a fair bit. The vector on $J$ is therefore uniform and independent of the vector on $L$. With $m_i$ denoting the marginal law of output $i$, the reduced product law is

$$
Q(c,v)=\frac{1}{|C|}\prod_{i\in L}m_i(v_i).
$$

Each original point over $(c,v)$ receives $Q(c,v)/|H|$ under the product law. The sum of the absolute mass differences over these $|H|$ points is exactly $|P(c,v)-Q(c,v)|$. Summing over all reduced outputs and dividing by two recovers the original total variation. When $L$ is empty, the coset alone suffices.

For example, use $Y_1,Y_2,Y_1+Y_2+B$ and $B$ as four outputs. The coset of the first three is determined by their binary sum $B$. The reduced joint law has output $(B,B)$, while the reduced product law replaces the first coordinate by an independent fair bit. For each value of the second coordinate, the two conditional laws of the first have total variation $1/2$. Hence the four-output total variation is $1/2$.

**Which laws can independent bits generate? (Written derivation)** For a random binary vector $Y$, let $m_\lambda=\mathbb E[(-1)^{\lambda(Y)}]$ be the sign moment of a linear functional $\lambda$. Consider two functionals $\lambda,\nu$. A single input bit with factor $q=1-2t$ and column $c$ contributes either $1$ or $q$ to each of $m_\lambda$ and $m_\nu$, according to the value of the corresponding functional on $c$. If both functionals give $1$, their sum gives $0$, so this column contributes $|q|^2$ on the left and $1$ on the right. In the other three cases the contributions agree. Independence therefore gives

$$
|m_\lambda|\,|m_\nu|\le |m_{\lambda+\nu}|.
$$

The affine offset affects only the signs, so the constraint also covers negative biases and fair bits. On $\mathbb F_2^2$, take masses $(17,1,7,7)/32$ in the order $00,10,01,11$. The sign moments for the first coordinate, the second coordinate, and their sum are $1/2,1/8,1/2$, respectively. For the first coordinate and the sum, the left side is $1/4$ and the right side is $1/8$. Thus no finite collection of independent input bits with an affine offset generates this law.

The same law has no convolution root of any order $n\ge 2$. Such a root is a probability law whose $n$-fold convolution with itself gives the stated law. If one exists, let $r^n=1/2$ with $r\ge 0$. The three nontrivial moments of the root have magnitudes $r,r^3,r$ in the same order. The first coordinate and the sum are linearly independent functionals, so at some point both moments give negative contributions to the inversion formula. The mass at that point is at most

$$
\frac{1-2r+r^3}{4}
=\frac{(r-1)(r^2+r-1)}{4}<0,
$$

since $1/\sqrt{2}\le r<1$. This contradicts nonnegative mass.

**Exact distance to affine independent-bit laws on four points (written derivation).** Order the three nontrivial sign moments by absolute value. Choose the two characters with the larger moments as coordinates, and translate the law so that their moments are $0\le a\le c$. The remaining character is their product. Write $b$ for its signed moment, so $|b|\le a$ and $c\le1$. In sign coordinates $u,v\in\{-1,1\}$, the mass at $(u,v)$ is $(1+au+cv+buv)/4$. Coordinate changes and translations preserve total variation and the class of affine independent-bit laws. The minimum distance to that class is

$$
d_*=\frac{\max(0,ac-b)}{2(1+c)}.
$$

If $b\ge ac$ and $b>0$, use three independent input bits with bias factors $\sqrt{ac/b}$, $\sqrt{ab/c}$, and $\sqrt{bc/a}$. In the two character coordinates, assign them columns $(1,1)$, $(1,0)$, and $(0,1)$, respectively. All three factors are in $[0,1]$, since $ac\le b$, $ab\le c$, and $bc\le a$. The three products of factors give $a,c,b$, which determine the law. If $b=0$ and $b\ge ac$, then $a=0$ and the product of independent sign laws with moments $0,c$ realizes the law.

Now suppose $b<ac$. Consider a competing affine law with moments $a',c',b'$ at total variation distance $d$. Each atom changes by at most $d$ and each moment by at most $2d$. The signs of three nonzero moments of an affine law multiply to $+1$. A single column contributes a signed bias in exactly two characters or in none, and the offsets give a product of $+1$. If $b'<0$, then at least one of $a',c'$ is nonpositive. Thus $d\ge a/2\ge d_*$, using $b\ge-a$ in the last inequality.

For $b'\ge0$, put $x=\max(0,a-a')$, $y=\max(0,c-c')$, and $z=b'-b$. Each is bounded above by $2d$, and $x+y+z\le4d$. If $x$ or $y$ is zero, use the individual bounds. Otherwise the sum equals four times the mass increase at the sign pair $(-,-)$. Put $\alpha=\min(a,|a'|)$ and $\gamma=\min(c,|c'|)$. Then $a-\alpha\le x$ and $c-\gamma\le y$. Writing $ac-\alpha\gamma=c(a-\alpha)+\alpha(c-\gamma)$ and using the moment constraint $|a'||c'|\le b'$ gives

$$
ac-b\le c(x+y)+z=c(x+y+z)+(1-c)z\le2(1+c)d.
$$

To attain the bound, transfer mass $d_*$ from $(+,-)$ to $(-,-)$. The source atom can supply it because

$$
P(+,-)-d_*=\frac{(1-c)(1+c+a+b)}{4(1+c)}\ge0.
$$

The resulting moments are $a-2d_*,c,b+2d_*$. The last is the product of the first two, so Fourier inversion gives the product of the two marginal sign laws. The inverse coordinate map realizes this product using two independent bits. The transfer changes total variation by exactly $d_*$. For the example with masses $(17,1,7,7)/32$ the minimum distance is $1/24$.

**Recovering biases from the coset law (written derivation).** Let the biased input bits $X_j$ be independent, with $\Pr(X_j=1)=t_j\in(0,1/2)$. Write $c_j\in C$ for the image of the column of input $j$ in the quotient. The coset output is $Y=s+\sum_j c_jX_j$, with the projected affine offset $s$. For each nonzero $c\in C$, define $q_c=\prod_{j:c_j=c}(1-2t_j)$, with empty product $1$.

For a linear functional $\lambda\in C^*$, write $\chi_\lambda(c)=(-1)^{\lambda(c)}$ and let $m_\lambda=\mathbb E[\chi_\lambda(Y)]$. Independence of the inputs gives

$$
\begin{aligned}
m_\lambda&=\chi_\lambda(s)\prod_{c:\lambda(c)=1}q_c,\\
\log|m_\lambda|&=\frac12\sum_{c\ne0}
   \bigl(1-\chi_\lambda(c)\bigr)\log q_c.
\end{aligned}
$$

The bias factors are strictly positive, so all these logarithms exist. Fix a nonzero column $a$, multiply the second equation by $\chi_\lambda(a)$, and sum over $\lambda$. The sum of $\chi_\lambda(a)$ over $\lambda$ vanishes. The sum of $\chi_\lambda(a+c)$ equals $|C|$ at $a=c$ and vanishes everywhere else. Hence

$$
\log q_a=-\frac{2}{|C|}
  \sum_{\lambda\in C^*}\chi_\lambda(a)\log|m_\lambda|.
$$

The coset law thus determines the product of the bias factors for each nonzero column. With the offset fixed, those products in turn determine all sign moments, which determine the law. A zero column has no effect on the output. Repeated nonzero columns enter only through their product. For example, factors $(3/4,1/3)$ on one column and $(1/2,1/2)$ on the same column both give $1/4$. Every bias can be recovered individually exactly when the projected columns are nonzero and pairwise distinct.

**An error bound for bias recovery (written derivation).** Let $P,Q$ be two coset laws with the same projected columns and possibly different affine offsets. Suppose that all absolute sign moments of both laws are at least $\varepsilon>0$. Write $q_a(P),q_a(Q)$ for their bias products on a nonzero column $a$. Then

$$
\left|\log q_a(P)-\log q_a(Q)\right|
  \le \frac{2}{\varepsilon}\operatorname{TV}(P,Q).
$$

For each $\lambda$, let $m_P,m_Q$ be the two sign moments. Write $\log|m_P|-\log|m_Q|=w_\lambda(m_P-m_Q)$, taking $w_\lambda=0$ when the moments agree. The mean value theorem on the positive absolute moments bounds the log difference by $\big||m_P|-|m_Q|\big|/\varepsilon$. The reverse triangle inequality gives $|w_\lambda|\le 1/\varepsilon$ even when the two moments have opposite signs. Substitution into the recovery formula gives

$$
\begin{aligned}
\log q_a(P)-\log q_a(Q)&=\sum_{x\in C}K_a(x)(P(x)-Q(x)),\\
K_a(x)&=-\frac{2}{|C|}\sum_{\lambda\in C^*}
    \chi_\lambda(a)\,w_\lambda\,\chi_\lambda(x).
\end{aligned}
$$

For $x\ne y$, exactly half of the characters distinguish $x$ from $y$. Each such sign difference has absolute value $2$, so $|K_a(x)-K_a(y)|\le 2/\varepsilon$. Subtract the midpoint of the maximum and minimum of $K_a$. The displayed sum stays the same because $\sum_x(P(x)-Q(x))=0$, and the shifted function has absolute value at most $1/\varepsilon$. The claimed estimate follows.

A one-bit quotient already approaches the constant $2$. Fix $0<\varepsilon<1$ and take bias factors $\varepsilon$ and $\varepsilon+h$ with $0<h<1-\varepsilon$. The total variation is $h/2$, and the log difference is $\log(1+h/\varepsilon)$. Its ratio to $\operatorname{TV}(P,Q)/\varepsilon$ tends to $2$ as $h\downarrow0$.

**The finite-distance bound and its equality condition (written derivation).** Write $N=|C|\ge 2$, $\beta=1-1/N$, and $\delta=\operatorname{TV}(P,Q)$. With the same moment floor as above, the tighter bound is

$$
\left|\log q_a(P)-\log q_a(Q)\right|
  \le 2\beta\log\!\left(1+\frac{\delta}{\beta\varepsilon}\right).
$$

Let $u_\lambda=|m_P(\lambda)-m_Q(\lambda)|$. Choose $r_\lambda\in\{-1,1\}$ so that $r_\lambda(m_P(\lambda)-m_Q(\lambda))=u_\lambda$. Then $\sum_\lambda u_\lambda$ is the difference of the expectations of $\sum_\lambda r_\lambda\chi_\lambda(x)$ under the two laws. This function has oscillation at most $N$, since each pair of distinct points has sign difference $2$ at exactly $N/2$ characters. Centering the function at the midpoint of its range gives $\sum_\lambda u_\lambda\le N\delta$. The trivial character contributes zero to this sum.

The absolute log difference at a character is the logarithm of the larger absolute moment divided by the smaller one. It is at most $\log(1+u_\lambda/\varepsilon)$ by the moment floor and the reverse triangle inequality. Concavity of $\log$ bounds the sum over the $N-1$ nontrivial characters by $(N-1)\log(1+N\delta/((N-1)\varepsilon))$. Multiplying by $2/N$ in the recovery formula gives the claimed bound.

For $\delta>0$, let $h=\log(1+\delta/(\beta\varepsilon))$ and $B=\log\varepsilon$. Equality in the last bound requires the mean of the $u_\lambda$ over nontrivial $\lambda$ to be $\delta/\beta$. Strict concavity forces each of them to equal that positive mean. At each nontrivial character, equality in the scalar bound then forces the moments to have the same sign, with one absolute moment equal to $\varepsilon$ and the other to $\varepsilon e^h$. The moment signs determine the offset because the factors are positive and the characters separate points. The triangle inequality in the recovery formula is an equality only if the signed log differences align. After interchanging the laws if needed, the nontrivial characters with $\chi_\lambda(a)=1$ have log magnitudes $B+h$ in $P$ and $B$ in $Q$. Those with $\chi_\lambda(a)=-1$ have the reversed values. The recovery formula therefore gives $\log q_a(Q)=2B/N+h$. If the target column $a$ is present with factors strictly below $1$, this log product is negative, so $\varepsilon e^{Nh/2}<1$.

Conversely, suppose $\varepsilon e^{Nh/2}<1$. Use offset zero and one input bit for each nonzero $c\in C$. Assign their log factors by

$$
\log q_c(P)=\frac{2(B+h)}{N}-h\,\mathbf 1_{\{c=a\}},
\qquad
\log q_c(Q)=\frac{2B}{N}+h\,\mathbf 1_{\{c=a\}}.
$$

All these log factors are negative. Each nontrivial character multiplies the factors of exactly $N/2$ columns, so these choices give exactly the two log magnitude profiles above. Their moment difference is $\varepsilon(e^h-1)\chi_\lambda(a)$ on nontrivial characters and zero at the trivial one. Fourier inversion gives $P(x)-Q(x)=\varepsilon(e^h-1)(\mathbf 1_{\{x=a\}}-1/N)$, which has total variation $\delta$. The log gap on $a$ is $2\beta h$, so this family attains the bound. Thus, with freedom to choose the common columns and with $a$ present, the strict condition on $\varepsilon e^{Nh/2}$ is both necessary and sufficient.

For example, take a two-dimensional quotient with the nonzero columns ordered as $a,b,a+b$ and both offsets zero. Use bias factors $(1/32,1/8,1/8)$ for $P$ and $(1/4,1/16,1/16)$ for $Q$. At every nontrivial character, one sign moment is $1/256$ and the other is $1/64$. Taking $\varepsilon=1/256$, the inversion formula above gives $\delta=(3/4)(1/64-1/256)=9/1024$. The target bias products have ratio $8$, whose logarithm equals the bound $(3/2)\log 4$.

**Why pairwise moment inequalities stop deciding representability on eight points (written derivation).** The factorization above gives a necessary inequality for every pair of characters of an affine independent-bit law, $|m_\lambda|\,|m_\nu|\le |m_{\lambda+\nu}|$. A column selected by both characters contributes a squared absolute bias, at most $1$, on the left and cancels on the right. Each remaining factor agrees on the two sides. An affine offset affects only the signs.

On $\mathbb F_2^3$, fix $u\ne0$. Assign probabilities $99/512$ at $0$, $35/512$ at $u$, and $63/512$ at each of the six other points. The probabilities sum to $1$ and are all strictly positive. This is a constant mass $63/512$ plus corrections of $36/512$ at $0$ and $-28/512$ at $u$. Each nontrivial character sums to zero over the group, so its moment equals $1/8$ if $\chi_\lambda(u)=-1$ and $1/64$ otherwise. If both characters in the pairwise inequality are nontrivial, its left side is at most $1/64$ and its right side at least $1/64$. If either character is trivial, there is equality.

For a law generated by independent bits, let $g_v$ be the absolute grouped bias factor at column $v$. Each absolute moment is the product of $g_v$ over the columns for which $\chi_\lambda(v)=-1$. Compare the product over the four characters with $\chi_\lambda(u)=-1$ to the product over the four with $\chi_\lambda(u)=1$. Column $u$ occurs four times in the first product and zero times in the second. Each other nonzero column occurs twice in each product, since $u$ and that column are linearly independent over $\mathbb F_2$. The first product therefore equals $g_u^4$ times the second, and $0\le g_u\le1$. The eight-point law above instead gives the first product $(1/8)^4$ and the second $(1/64)^3$, so it cannot be generated by independent bits and an affine offset. The equality of grouped products also applies when some moments vanish, without any division by a moment.

**A complete criterion for positive sign moments (literature result and application).** A probability law on a finite binary vector space with all sign moments strictly positive is an affine independent-bit law exactly when every nonzero $u$ satisfies

$$
\prod_{\lambda:\,\chi_\lambda(u)=-1}m_\lambda
\le
\prod_{\lambda:\,\chi_\lambda(u)=1}m_\lambda.
$$

This is the elementary binary case of Ardiyansyah, Kosta, and Kubjas's criterion for model embeddability of symmetric group-based Markov matrices, Theorem 4.1. The transition matrix of a law $P$ has entries $P(y-x)$ and its eigenvalues are the sign moments $m_\lambda$. With separate labels for all group elements, the theorem requires the inverse Fourier transform of $\log m_\lambda$ to have nonnegative entries away from zero. For a translation $T_u$ by a nonzero $u$, $T_u^2=I$, so the rate term $r_u(T_u-I)$ exponentiates to the two-point law with bias $\exp(-2r_u)$. These translations commute, and multiplying their exponentials realizes the law as an independent sum of binary inputs.

Conversely, a negative bias can be made positive by complementing that input bit and adding its column to the affine offset. Strict positivity of the moments excludes a fair bit on any nonzero column. After these replacements the offset evaluates to $+1$ under every character, so it is zero. The remaining positive bias factors therefore give nonnegative rates $-\tfrac12\log q_u$. The eight-point case appears explicitly in §5.1 of the same article. [Ardiyansyah, Kosta, and Kubjas](https://doi.org/10.1007/s00285-021-01656-5)

**What changes when a sign moment vanishes (written derivation).** Let $C$ be a finite binary vector space. A probability law on $C$ is an affine independent-bit law exactly when there are a subspace $H\le C$ and an offset $s\in C$ with the following properties.

1. Every character that is nontrivial on $H$ has zero moment.
2. For a character $\bar\chi$ of $C/H$, let $\chi$ be its pullback to $C$. The adjusted moments $\chi(s)m_\chi$ are all strictly positive and satisfy the product inequalities on $C/H$.

For necessity, take $H$ to be the span of the columns of the fair bits. Each such bit makes the moment of any character that reads it vanish. The characters trivial on $H$ read only nonzero bias factors. Complement the bits with negative bias and absorb their columns into $s$. The surviving moments, after multiplying by $\chi(s)$, are then the positive moments of the quotient law.

Conversely, the product inequalities realize the adjusted quotient moments by independent bits with positive biases. Lift their columns from $C/H$ to $C$ and add independent fair bits along a basis of $H$, then translate by $s$. The fair bits make the moments outside the annihilator of $H$ vanish. They leave the other moments unchanged before translation. The resulting law has the specified moments at every character, so Fourier inversion identifies it with the original law.

**The minimum number of input bits (written derivation).** For a law generated by affine independent bits, the span $H$ of the fair-bit columns is determined by the law. It consists exactly of the points at which every character with a nonzero moment evaluates to $+1$. If $x\notin H$, a character of $C/H$ can be chosen to evaluate to $-1$ at $x+H$. Its pullback has nonzero moment, so $x$ lies outside the common annihilator. The adjusted affine offset in $C/H$ is also unique because two offsets giving the same signs differ by an element of $H$.

For each nonzero coset $u\in C/H$, let $q_u\in(0,1]$ be the product of the absolute bias factors of the columns in that coset. The logarithmic inversion above recovers these products from the quotient moments. The minimum number of input bits in any affine independent-bit realization is

$$
\dim_{\mathbb F_2}H+\bigl|\{u\in C/H:\ u\ne0,\ q_u<1\}\bigr|.
$$

In every realization the fair-bit columns span $H$, requiring at least $\dim_{\mathbb F_2}H$ fair bits. Each nonzero coset with $q_u<1$ needs at least one input whose column lies in that coset and whose absolute bias is strictly between $0$ and $1$. The fair bits project to the zero coset, and distinct nonzero cosets need distinct input bits. To attain the bound, take one fair bit along each vector of a basis of $H$, then take one bit with bias $q_u$ on any representative of each nonzero coset with $q_u<1$. Applying the adjusted affine offset recovers the original law.

A constant output has $H=\{0\}$ and all $q_u=1$. It uses zero bits, with the affine offset equal to the constant. For a uniform law on a coset $s+H$, the quotient output is constant and every $q_u=1$, so the minimum is $\dim_{\mathbb F_2}H$. In particular, a uniform output on all of $C$ takes exactly $\dim_{\mathbb F_2}C$ fair bits.

**Counting realizations with the minimum number of inputs (written derivation).** Fix a realizable law. Let $h=\dim_{\mathbb F_2}H$, let $b$ count the nonzero cosets with $q_u<1$, and label the minimum $n=h+b$ input positions. A realization specifies the signed bias factors, the columns in the original space, and the affine offset. The number of realizations is

$$
\frac{n!}{h!}\left(\prod_{j=0}^{h-1}(2^h-2^j)\right)|H|^{b+1}2^b.
$$

The empty product is $1$.

At the minimum, the lower bounds for the numbers of fair and nonfair bits both hold with equality. The $h$ fair columns span $H$ and hence form a basis. Each nonzero coset with $q_u<1$ needs one nonfair input. There are exactly $b$ positions available, so each such coset gets exactly one bit. Its absolute bias equals the recovered factor $q_u$.

Choose the $h$ fair positions first, and fill them with a basis in the order of the chosen positions. After choosing $j$ basis vectors, their span has $2^j$ elements, leaving $2^h-2^j$ choices for the next vector. The remaining positions can be matched to the $b$ nonzero cosets in $b!$ ways. Each such coset has $|H|$ choices for its column representative and two choices for the bias sign. The law fixes the adjusted offset coset. Choose one of its representatives and subtract the sum of the negative-bias columns to recover the raw offset.

Every choice produces the prescribed law. The fair columns give $H$, the absolute biases give the grouped products on the quotient, and the adjusted offset recovers the signs of the nonzero moments. The fair bits make the other moments vanish. Each realization also determines these choices uniquely. The choices of fair positions and their complement therefore contribute $\binom{n}{h}b!=n!/h!$.

**The bias space with fixed columns and offset (written derivation).** Even with more than the minimum number of inputs, we can fix the columns $c_i$ and the raw offset $s$ and vary the signed biases $q_i$ in $[-1,1]$. Choose a reference realization $q^{(0)}$ and let $F$ be the set of bias vectors that produce the same law, with the usual Euclidean topology. Write $H$ for the fair subgroup, $\bar c_i=c_i+H$, and $J=\{i:\bar c_i\ne 0\}$. If the projected columns for $i\in J$ span a space of dimension $r$, then $F$ has exactly $2^{|J|-r}$ connected components, each contractible.

The law determines $H$, so all biases on $J$ stay nonzero throughout $F$. Let $\varepsilon_i$ be $1$ when $q_i<0$ and $0$ otherwise. Since the raw offset is fixed, the condition on the adjusted offset coset is the binary linear equation

$$
\sum_{i\in J}\varepsilon_i\bar c_i
=\sum_{i\in J}\varepsilon_i^{(0)}\bar c_i.
$$

The solutions form a coset of the kernel and give $2^{|J|-r}$ sign patterns. Each sign region is both open and closed in $F$, since changing any of its signs requires passing through zero. Every solution can be realized with the reference magnitudes. Give the biases on $J$ the chosen signs and retain the reference biases at the other labels. This preserves the fair subgroup, the grouped absolute products on the quotient, and the adjusted offset coset, so it preserves all moments and the mass at every point.

Fix an allowed sign pattern. For $i\in J$, use the continuous coordinate $x_i=-\log|q_i|$, with inverse $\pm e^{-x_i}$ in the fixed sign. Each nonzero projected column $u$ that occurs gives a block of constraints $x_i\ge 0$ and $\sum_{\bar c_i=u}x_i=-\log q_u$, where $q_u$ is the grouped absolute bias recovered from the law. This block is a scaled simplex, reduced to one point when its right-hand side is zero. Outside $J$, the only condition is that the columns with zero bias still span $H$. Multiply these coordinates by $1-t$ together, for $0\le t\le 1$. For $t<1$ their zero set is preserved. At $t=1$ every one of those columns is fair and they still span $H$. At the same time, move the log coordinates on $J$ along straight lines to fixed points of their simplices. Both moves are continuous and preserve the law. Together they contract the sign region to a point, so each region is a connected component.

For example, suppose $J$ consists of two labels whose columns project to the same nonzero class with grouped absolute bias $\rho\in(0,1)$. If the adjusted offset requires an even number of negative signs on those two inputs, there are two components, one with both signs positive and one with both negative. In the log coordinates of either component, the magnitudes vary along the segment $x_1+x_2=-\log\rho$.

**Local directions among the fair-subgroup columns (written derivation).** Within one sign component, fix the biases on $J$ and examine how the remaining coordinates can leave their common zero point. Write $x_i$ for these coordinates and take the section $\sum_i |x_i|=1$. A direction is feasible exactly when the columns at its zero coordinates still span $H$. For example, suppose exactly two columns lie in the fair subgroup and both equal the same nonzero generator of $H$. Then either bias can move while the other stays fair. The section has four points, the positive and negative directions of each of the two coordinates.

In general, give each label $i$ two signed vertices $i^+$ and $i^-$. A simplex face uses at most one sign of each label and leaves a family of unselected columns spanning $H$. Every nonempty subface satisfies the same conditions. The section is homeomorphic to the realization of this simplicial complex. Its barycentric coordinates are $\lambda_{i^+}=\max(x_i,0)$ and $\lambda_{i^-}=\max(-x_i,0)$, and they sum to $1$. The inverse is $x_i=\lambda_{i^+}-\lambda_{i^-}$. At most one weight at a label is nonzero, so this difference involves no cancellation. Both maps are continuous and preserve the nonzero coordinates and their signs. If the fair-subgroup columns already form a basis, every one must stay fair and the section is empty.

**Face counts and Euler characteristic of the local directions (written derivation).** Suppose the fair subgroup contains $n$ labelled columns of rank $h$. Let $a_k$ count the $k$-element label sets whose complements still span $H$. Each such set allows $2^k$ independent sign assignments, so there are $2^k a_k$ faces of dimension $k-1$ for $k\ge 1$. The complement of the empty set is the full label set, so $a_0=1$. The empty face contributes $-1$, giving the reduced Euler characteristic $\widetilde\chi=-\sum_{k=0}^n(-2)^k a_k$.

Write $E$ for the label set, $r(B)$ for the rank of the columns at $B\subseteq E$, and $M$ for the column matroid. Its Tutte polynomial is the rank-subset sum $T_M(x,y)=\sum_{B\subseteq E}(x-1)^{h-r(B)}(y-1)^{|B|-r(B)}$. At $x=1$, only spanning sets $B$ contribute. Their complementary supports have size $n-|B|$, and $(-2)^{n-|B|}=(-2)^{n-h}(-1/2)^{|B|-h}$. Thus $\widetilde\chi=-(-2)^{n-h}T_M(1,1/2)$. For a basis the section is empty and the formula gives $-1$. For two copies of a nonzero generator the section has four points and the formula gives $3$.

**Facet dimension and shelling order (written derivation).** The label sets whose complements still span $H$ are the independent sets of the dual column matroid. Pull this matroid back along the map that forgets signs. A set of signed labels is independent exactly when its projected labels are independent and it uses at most one sign per label. The nonempty faces of the direction complex are therefore precisely the nonempty independent sets of the resulting matroid. Each facet is a basis with $n-h$ vertices. When $n=h$, there are no nonempty faces.

Fix any linear order on the signed labels. Compare two facets by placing first the one containing the least label of their symmetric difference. This gives a shelling order. If $A$ precedes $B$, let $x\in A\setminus B$ be that least label. The independent set $(A\cap B)\cup\{x\}$ extends to a basis $C$ inside $B\cup\{x\}$. Since $B$ and $C$ have the same size, $C$ replaces exactly one vertex of $B$ with $x$. The removed vertex lies outside $A\cap B$ and follows $x$ in the label order. Thus $C$ precedes $B$, and $C\cap B$ is a codimension-one face containing $A\cap B$. This gives the required intersection condition for a shelling.

**The new faces introduced by each facet (written derivation).** For a facet $B$ in the shelling, let $R(B)$ consist of the vertices $v$ such that $B\setminus\{v\}$ is contained in an earlier facet. A subface $S\subseteq B$ appears for the first time at $B$ exactly when $R(B)\subseteq S$. If $S$ omits a vertex $v$ of $R(B)$, it already appears with $B\setminus\{v\}$. Conversely, if an earlier facet $A$ contains $S$, the shelling criterion gives an earlier facet $C$ containing $A\cap B$ and omitting exactly one vertex of $B$. This vertex belongs to $R(B)$ and is outside $S$.

Let $d=n-h$. Each face introduced at $B$ consists of $R(B)$ together with an arbitrary subset of $B\setminus R(B)$. Weighting a face $S$ by $t^{|S|}$ gives the face enumerator $\sum_B t^{|R(B)|}(1+t)^{d-|R(B)|}$ when there are nonempty facets. This sum counts the empty face at its first containing facet. If there are no nonempty facets, the empty face alone contributes the constant $1$.

**Elementary collapses at a shelling step (written derivation).** Suppose the restriction face $R(B)$ is nonempty and proper in $B$. Fix $v\in B\setminus R(B)$. Pair every new subface $S$ avoiding $v$ with $S\cup\{v\}$, and delete the pairs in decreasing order of $|S|$, breaking ties arbitrarily. Every new subface belongs to exactly one pair. An earlier subface cannot contain $S$, since that would make $S$ earlier as well. Any new strict coface of $S$ other than $S\cup\{v\}$ still strictly contains $S$ after removing $v$, so its pair has already been deleted. At the turn of $S$, its sole strict coface is $S\cup\{v\}$, and deleting the pair is an elementary collapse. The sequence leaves the subcomplex from before the addition of $B$.

If $R(B)=B$, the only new face is $B$ and its entire boundary is in the preceding subcomplex. The first facet gives the initial simplex, starting from the empty realization.

**After retaining the boundaries, the remaining subcomplex collapses to the first simplex (written derivation).** Remove every facet $B$ with $R(B)=B$ from the direction complex, keeping all proper subfaces. The first facet has empty restriction face, so its simplex is retained in full. Process the later facets in reverse shelling order. When $R(B)=B$, the two successive prefixes become equal after the deletion. At every other step the previous pairing still applies. Both members of a pair lie in $B$. If either equaled a removed maximal face, maximality would force it to equal $B$, and this step retains $B$. Removing other facets also cannot create a new strict coface. The elementary collapses therefore concatenate to a collapse of the retained subcomplex onto the first simplex. This conclusion assumes at least one nonempty facet.

**The quotient by the retained subcomplex (written derivation).** Suppose there is at least one nonempty facet. Collapse the realization of the retained subcomplex to a point. Each simplex with $R(B)=B$ meets the retained part in its entire boundary. A point of that simplex is in the intersection exactly when at least one coordinate on $B$ is zero. Distinct such simplices meet only in the retained part. The quotient therefore comes from the disjoint sum of these simplices and a basepoint, with all the boundary points identified with the basepoint. The finitely many closed simplices and the retained part cover the realization, so the quotient maps on those pieces induce a homeomorphism. A one-vertex facet has empty boundary and contributes one isolated point alongside the basepoint. If no facet has full restriction face, the quotient is a point.

**The homotopy type is a wedge of spheres (written derivation).** Let $X$ be the realization of the direction complex and $C$ the realization of its retained subcomplex. The collapse to the first simplex makes $C$ contractible. A subcomplex inclusion has the homotopy extension property, so a contraction of $C$ extends to a homotopy of $X$ starting at the identity. Its endpoint is constant on $C$ and factors through $q:X\to X/C$ to define $s:X/C\to X$. The extension gives $s q\simeq\mathrm{id}_X$. Each stage carries $C$ into $C$, so it also descends to the quotient and gives $q s\simeq\mathrm{id}_{X/C}$. Thus the quotient map itself is a homotopy equivalence.

Every facet has $d=n-h$ vertices. If $d\ge 2$, collapsing the boundary of a $(d-1)$-simplex gives $S^{d-1}$, with the boundary class as its basepoint. If $d=1$, the simplex point together with the added basepoint gives $S^0$. The attachment description identifies precisely these factor basepoints with the common quotient point. Hence $X/C$ is homeomorphic, with its basepoint, to the finite wedge of one $S^{n-h-1}$ for each facet with $R(B)=B$. The empty wedge is a point.

**An acyclic matching of nonempty faces (written derivation).** Assume there is a nonempty facet and keep the fixed linear order of signed labels. For each interval $[R(B),B]$ with $R(B)\ne B$, choose a vertex $v_B\in B\setminus R(B)$. Pair each face with the face obtained by toggling $v_B$. The toggle preserves the restriction face and all other vertices, so the pair stays in the same interval. When $R(B)=B$, the interval consists of the unmatched facet $B$. The first facet $B_0$ has empty restriction face. Removing the empty face and its matching edge therefore leaves $\{v_{B_0}\}$ as the only additional unmatched face.

Orient matched covers from the smaller face to the larger face and all other covers downward. A downward edge can only preserve the first containing facet or move to an earlier one, since the facet containing its source also contains its target. An upward edge preserves the interval. For a face $F$ whose first containing facet is $B$, let $k(B)$ count the earlier facets and assign the rank
$$
k(B)(2n+3)+|F|+2\,\mathbf 1_{\{R(B)\ne B,\, v_B\notin F\}} .
$$
When an edge changes intervals, the decrease in the first term exceeds any increase in the other terms. Within an interval, an upward edge adds $v_B$, increasing the size by one and removing the penalty of two. A downward edge removes one vertex and cannot remove $v_B$, because that edge is oriented upward. The rank strictly decreases along every directed edge, ruling out a directed cycle. The unmatched faces consist of one vertex and all facets with $R(B)=B$, giving the critical-cell count in Forman's Theorem 6.3. [Forman, *A User's Guide to Discrete Morse Theory*, §6](https://www.mat.univie.ac.at/~slc/wpapers/s48forman.pdf)

**Cycle representatives from the matching (written derivation).** Assume a nonempty signed facet exists. Keep the pair containing the empty face, and work with the augmented integral chains. Write $e_F$ for the basis chain of a face $F$ in degree $|F|-1$. The differential $D$ deletes one vertex at a time. Deleting the vertex in position $j$ in the increasing list of $F$, starting at $j=0$, has coefficient $(-1)^j$. In particular, a vertex maps to $e_{\varnothing}$ with coefficient $+1$. Each pair of distinct deletions occurs in both orders with opposite coefficients, so $D^2=0$.

Let $D_0$ retain just the incidences of matched pairs. If a matched upper face $T$ has lower partner $S$ with coefficient $\epsilon$, then $D_0 e_T=\epsilon e_S$. Define $h e_S=\epsilon e_T$ on matched lower faces and let $h$ vanish on the other faces. Since $\epsilon^2=1$, the two maps contract each matched pair over $\mathbb Z$. Let $i$ include the free abelian group with basis the full-restriction facets, and let $p$ keep only their coefficients. The matched pairs and the remaining basis elements give $D_0h+hD_0=1-ip$, $pi=1$, and $h^2=hi=ph=0$.

Put $\Delta=D-D_0$. Each contribution to $h\Delta$ follows an unmatched downward edge and then a matched upward edge. The rank above decreases on this path, including when it passes through the empty face. With $N$ one greater than the largest rank, $(h\Delta)^N=0$ and $(\Delta h)^{N+1}=0$. Define the finite sums and maps
$$
\begin{aligned}
K&=\sum_{j=0}^{N-1}(-h\Delta)^j,&
J&=\sum_{j=0}^{N}(-\Delta h)^j,\\
I&=Ki,& P&=pJ,& H&=Kh .
\end{aligned}
$$
The finite basic perturbation lemma gives $PI=1$ and $DH+HD=1-IP$, with the differential $p\Delta Ki$ on the critical group. Both $h\Delta$ and $\Delta h$ preserve degree. All the critical faces have the same degree $n-h_{\mathrm{rank}}-1$, where $h_{\mathrm{rank}}$ is the column rank. Thus $p\Delta Ki=0$ because it decreases degree by one. It follows that $DI=0$ and $PD=0$.

For a full-restriction facet $B$, the chain $I(e_B)=K e_B$ is therefore a cycle. It has coefficient one on $B$ and coefficient zero on every other critical facet, since all correction terms lie in the span of matched upper faces. No boundary term can land on a facet, so $p\Delta=0$ and $P=pJ=p$. For any cycle $z$, the homotopy identity gives $z-I(pz)=D(Hz)$. Thus the coefficients at the full-restriction facets give the homology coordinates directly. For a cycle in their degree, $Hz=0$ because there are no larger faces, and $I(pz)=z$.

The construction includes singleton facets. For these signed faces the last facet in the shelling is critical. Flipping the sign of any one of its labels preserves its support and hence gives another facet. That facet is earlier and contains the face obtained by deleting the chosen signed label. Every vertex of the last facet therefore belongs to its restriction face. The calculation uses the ordered augmented simplicial chains. [Forman, §7](https://www.mat.univ.ac.at/~slc/wpapers/s48forman.pdf) · [Sköldberg, algebraic Morse theory and homological perturbation](https://arxiv.org/abs/1311.5803)

::: {.theorem #thm-ch39-fair-bias-cycle-coefficients title="Coefficients of a normalized cycle" lean="D5/S3/TotalVariation/FairBiasCycleCoefficients.normalized_cycle_unit_coefficients"}
Take any finite binary column family and any total order on its signed labels. Fix an augmented face $B$. Let $z$ be an integral chain supported on facets with zero augmented boundary. At every full-restriction facet $S$, assume the coefficient of $z$ is $1$ if $S=B$ and $0$ otherwise. Then the coefficient of $z$ at every augmented face belongs to $\{-1,0,1\}$.
:::

::: proof
Regard the facets as bases of the signed matroid. Call an element of a basis passive if a smaller element can replace it. The full-restriction facets are precisely the bases with every element passive.

In a noncritical basis $F$, let $a$ be the least nonpassive element. Use the boundary equation on the ridge $F\setminus\{a\}$. Every other basis containing this ridge is $T=F-a+x$ with $x>a$, so it is lexicographically later. This exchange preserves passivity of every surviving element and makes $x$ passive, since $a$ can replace $x$. To see preservation, suppose $y<b$ originally replaced $b$. Contract the elements of the basis other than $a,b$. If $a<b$ and $x$ could also replace $b$, then $a$ can replace $b$ in $T$. In the other cases either $x$ is parallel to $a$, or $y<b<a$ makes $y$ parallel to $b$ in the rank-two contraction. In both cases $x,y$ are independent, so $y$ can still replace $b$ in $T$.

Induct backwards through the facets. At any facet with nonzero coefficient, its elements outside $B$ are nonpassive, and every missing element of $B$ exceeds every label strictly below all its nonpassive elements. For a later $T$ of nonzero coefficient, all its nonpassive elements exceed $a$. It follows that $a\notin B$ and that the passive new element $x$ belongs to $B$. Both induction conditions then carry back to $F$. The element $x$ cannot exchange for any member of $F\setminus(B\cup\{a\})$ in $F$, since that exchange would make the member passive in $T$. Thus the fundamental circuit of $x$ lies in $(F\cap B)\cup\{a,x\}$. After contracting $F\cap B$, every such $x$ is parallel to $a$, while $B\setminus F$ remains independent. Hence at most one later facet contributes to the ridge equation. The coefficient at $F$ is zero or the coefficient at that later facet times a sign. The full proof is checked by the Lean kernel.
:::

When $B$ is a full-restriction facet, the chain contraction above gives the normalized cycle $I(e_B)$. If a top cycle $z$ satisfies $pz=e_B$, then $I(pz)=z$ gives uniqueness. When every full-restriction coefficient is zero, the same identity gives $z=0$. Existence and uniqueness use the chain contraction [actualContraction](lean:D5/S3/TotalVariation/FairBiasChainContraction.actualContraction).

**Circuit decomposition of a normalized cycle.** For a fully passive basis $B$ of a finite ordered matroid $Q$, write $z_B(Q)$ for the top augmented integral cycle of its independence complex, in degree $\operatorname{rk}(Q)-1$. Orient each basis by the increasing vertex order. On the fully passive bases the cycle has coefficient $1$ at $B$ and $0$ elsewhere. The direction complex comes from the signed matroid $M_{\mathrm{sgn}}$, the parallel extension of the dual column matroid $M^*$ along the map that forgets the signs. Its bases are the facets of the direction complex, and its fully passive bases are precisely the full-restriction facets. In positive rank, where the chain contraction above applies, $z_B(M_{\mathrm{sgn}})$ and $I(e_B)$ use the same signed-label order and have the same fully passive coordinates, so uniqueness identifies them.

When $Q$ has positive rank, take the least nonloop $e$. It cannot belong to the fully passive basis $B$, since no smaller element can replace it. Let $C$ be the fundamental circuit in $B\cup\{e\}$ and put $D=B\setminus C$. Order the remaining elements of the contraction $Q/C$ by the inherited order. In rank zero the cycle is the basis chain of the empty face in degree $-1$.

Write $[C]$ for the simplex oriented by the increasing order. For disjoint oriented face chains, $[A]\wedge[T]$ concatenates the ordered vertices of $A$ and $T$ and then sorts them with the sign of the reordering. The normalized cycle satisfies

$$
z_B(Q)=\epsilon_B\,\partial[C]\wedge z_D(Q/C),
$$

where $\epsilon_B\in\{-1,1\}$ sets the coefficient at $B$ to $1$. Since $e$ comes first in $C$, $\epsilon_B$ is the sign of sorting the concatenation of $C\setminus\{e\}$ and $D$. Each nonzero coefficient of $z_D(Q/C)$ at a basis $T$ produces exactly $|C|$ nonzero coordinates, one for each element removed from $C$ before taking the union with $T$. The intersection of the resulting basis with $C$ identifies the removed element, and the difference identifies $T$. These coordinates are distinct, so this step multiplies the support size by $|C|$. [Factorization for ordered matroids](lean:D5/S3/Combinatorics/Matroids/OrderedCycleFactorization.normalized_factorization)

For a column family in a finite vector space over $\mathbb F_2$, the signed specialization uses this chapter's augmented boundary matrix. Its coefficient formula and support count are evaluated on the faces of the direction complex. [Signed specialization](lean:D5/S3/TotalVariation/FairBiasCycleFactorization.signed_cycle_factorization)

For any $c\in C$, deleting $c$ from the circuit gives a basis of $C$, so $\left(C\setminus\{c\}\right)\cup T$ is a basis of $Q$. The boundary obeys the signed product rule for the join. Since $\partial^2[C]=0$ and $\partial z_D(Q/C)=0$, the joined chain is a cycle. When $c\ne e$, the resulting basis contains $e$ and cannot be fully passive. When $c=e$, every element of $C\setminus\{e\}$ can be exchanged for $e$. For an element of $T$, inserting another element of $C$ cannot produce a new basis because $C$ is already in the closure of $C\setminus\{e\}$. An exchange with an element outside $C$ is precisely an exchange in the contraction. This proves that $D$ is fully passive in the contraction and that the only nonzero fully passive coordinate of the join is $\pm1$ at $B$.

Each contraction reduces the basis size by $|C|-1$. Since $e$ is a nonloop, $|C|\ge 2$, and induction from the empty face gives existence. For uniqueness, take the lexicographically last basis with a nonzero coefficient in the difference of two normalized cycles. It has a nonpassive element. Deleting that element gives a ridge that occurs only in this basis and in later bases. Its boundary coefficient is thus the nonzero coefficient times a sign, contradicting the cycle equation.

For example, take two zero columns and order their signed labels so that the parallel pairs are $\{1,3\}$ and $\{2,4\}$ in numerical order. For $B=\{3,4\}$ the fundamental circuit is $\{1,3\}$ and the normalized cycle of the contraction is $[4]-[2]$. Joining the two oriented edge boundaries gives

$$
z_B=[3,4]+[2,3]-[1,4]+[1,2].
$$

The positive coefficient at $[2,3]$ comes from reordering the concatenation of $[3]$ and $[2]$.

The choice of least nonloop controls the normalization. Two equal nonzero binary columns give four parallel signed labels, ordered $1<2<3<4$. The normalized cycle at $\{4\}$ is $[4]-[1]$. Choosing $2$ to form the circuit $\{2,4\}$ gives $[4]-[2]$, which also has coefficient $-1$ at the fully passive basis $\{2\}$.

Björner's classical construction gives homology bases of matroids supported on joins of simplex boundaries. [Chari, *Two decompositions in topological combinatorics with applications to matroid complexes* (1997), §1, p. 3927](https://doi.org/10.1090/S0002-9947-97-01921-1)

**Decomposition of top integral cycles at a chosen element.** Let $Q$ be a finite ordered matroid and write $Z(Q)$ for its top augmented integral cycle group. Choose any element $e$ of the ground set, let $\mathcal C_e$ be the set of circuits through $e$, and for $C\in\mathcal C_e$ write $A_C=C\setminus\{e\}$. Put $s_D(x)=(-1)^{|\{y\in D:y<x\}|}$ for the insertion sign and let $\sigma(A,T)$ be the sign of putting the concatenated ordered lists of $A$ and $T$ into increasing order. The following integral linear maps are inverses.

$$
Z(Q)\ \cong\ \bigoplus_{C\in\mathcal C_e}Z(Q/C),\qquad
z\longmapsto (w_C)_C,\qquad
(w_C)_C\longmapsto \sum_{C\in\mathcal C_e}\partial[C]\wedge w_C.
$$

The chain $w_C$ on $Q/C$ has coefficient at each basis $T$ given by
$w_C(T)=s_{A_C}(e)\,\sigma(A_C,T)\,z(A_C\cup T)$, with zero coefficients at other faces. If $Q/C$ has rank zero, $T$ is the empty face. If $e$ is a coloop, every basis contains $e$, $\mathcal C_e$ is empty, and the cycle group is zero. If $e$ is a loop, the only circuit through it is $\{e\}$, whose simplex boundary is the empty face.

To verify the cycle condition on $w_C$, take a ridge $D$ in the contraction and put $R=A_C\cup D$. For $x\notin C\cup D$ we have
$s_D(x)\sigma(A_C,D\cup\{x\})=(-1)^{|A_C|}\sigma(A_C,D)s_R(x)$.
The elements of $A_C$ before and after $x$ account for the exponent $|A_C|$. The basis condition in the contraction is equivalent to that obtained by adjoining $A_C$ and testing for a basis of $Q$. Inserting $e$ produces a dependent set containing $C$, so its chain coefficient vanishes. Thus the coefficient of $\partial w_C$ at $D$ is the coefficient of $\partial z$ at $R$ times one common sign, and hence is zero. Conversely the signed product rule gives a cycle $\partial[C]\wedge w_C$ for each summand.

A basis omitting $e$, say $F$, uniquely determines its summand. Its extension $F\cup\{e\}$ has fundamental circuit $C$, so $F=A_C\cup(F\setminus C)$. Reading the coefficient and forming the join each contribute the same sign on that face, giving a product of one. For a basis containing $e$, the zero boundary equation on the ridge obtained by deleting $e$ uniquely recovers its coefficient from those at bases omitting $e$. The maps are therefore inverses on the entire cycle group. [Circuit decomposition of top integral cycles](lean:D5/S3/Combinatorics/Matroids/CircuitCycleDecomposition.circuit_cycle_decomposition)

This gives the support overlap for normalized cycles by a short derivation. When their first fundamental circuits at the least nonloop differ, every basis in their common support contains $e$. When both first circuits are $C$, each contracted basis $T$ contributes $|C|$ joined coordinates, and the reordering sign squares to one in the coefficient product. The integral coefficient inner product over all bases is therefore the contracted inner product times $|C|\epsilon_B\epsilon_{B'}$. Distinct circuits can still contribute an inner product through coordinates containing $e$. In the rank-one matroid on three nonloops, $[2]-[1]$ and $[3]-[1]$ belong to distinct circuits at $e=1$ and have inner product $1$.

**Inner products between distinct circuits.** In a finite ordered matroid $Q$, take two distinct circuits $C,D$. Put $S=C\cap D$, $P=C\setminus D$, $L=D\setminus C$, and $U=C\cup D$. Take the contractions $Q/C$, $Q/D$ and top augmented cycles $w,v$ in them. Consider the integral coordinate inner product of their lifts.

$$
G_{C,D}(w,v)=\langle\partial[C]\wedge w,\partial[D]\wedge v\rangle .
$$

If $\operatorname{rk}_Q(U)+2\ne |U|$, then $G_{C,D}$ vanishes identically. A basis with a nonzero coefficient in both lifts must omit one element from each of $C,D$. If it omitted the same element from both, adjoining that element to the basis would give two circuits, contradicting fundamental circuit uniqueness. With distinct omissions, an element omitted from one circuit is present in the other circuit's part of the basis if it belongs to both. The omitted elements therefore belong to $P,L$ respectively. Deleting those two elements from $U$ leaves a spanning set of $U$ because deleting any one element from a circuit leaves a spanning set of that circuit. The remaining set is also contained in the shared supporting basis, so it is independent and has size $|U|-2$. [Orthogonality criterion](lean:D5/S3/Combinatorics/Matroids/CircuitPairInnerProduct.circuitPairing_eq_zero)

Now suppose $\operatorname{rk}_Q(U)+2=|U|$. Deleting one element from each of $P,L$ leaves a set that spans $U$ and has size equal to its rank, so the remaining set is a basis of $U$. It contains a basis of $C$ obtained by deleting one element from $C$. After contracting $C$, every single-element deletion of $L$ is independent, while $L$ has size one more than its rank in the contraction. Thus $L$ is a circuit of $Q/C$. The same argument makes $P$ a circuit of $Q/D$. [Circuits in the contractions](lean:D5/S3/Combinatorics/Matroids/CircuitPairInnerProduct.residual_circuits)

For the first circuit, add the signed restrictions above over all choices of a deleted vertex to get

$$
(A_Lw)(T)=\sum_{x\in L} s_{L\setminus\{x\}}(x)\,\sigma(L\setminus\{x\},T)\,w((L\setminus\{x\})\cup T),
$$

where $T$ ranges over bases of $Q/U$, with zero coefficients elsewhere. Define $A_Pv$ by the same rule. The inner product then factors as

$$
G_{C,D}(w,v)=\sigma(S,P)\sigma(S,L)(-1)^{(|P|-1)(|L|-1)}
  \langle A_Lw,A_Pv\rangle .
$$

Each choice of a deleted vertex from $P,L$ determines a basis of $U$. Adjoining a basis of $Q/U$ gives the shared coordinate in the two lifts. To compare the joined orders, place the common part first. The two orders interchange the exclusive parts after deletion, giving the fixed interchange sign in the formula. The remaining signs belong to the two sums over the deleted vertices. [Integral pairing factorization](lean:D5/S3/Combinatorics/Matroids/CircuitPairInnerProduct.circuitPairing_factor)

Composing $A_L$ with the lift along the circuit $L$ multiplies every cycle of $Q/U$ by $|L|$. Likewise, composing $A_P$ with the lift along $P$ multiplies by $|P|$. Both maps are therefore surjective over the rationals. The coordinate inner product on their common target has trivial radical because the self-pairing of a nonzero cycle is a positive sum of squares. Thus the rank over the rationals of the bilinear form $G_{C,D}$ equals the dimension of the top augmented cycle space of $Q/U$. A rank-zero contraction still contributes the empty-face coordinate. [Rank of the rational pairing](lean:D5/S3/Combinatorics/Matroids/CircuitPairInnerProduct.circuitPairing_rank)

**The integral image for a one-element extension.** Take a spanning circuit $K$ in a finite ordered matroid $Q$ whose ground is $E=K\cup\{x\}$ with $x\notin K$. Contracting $K$ leaves rank zero, with the empty face as its only basis. The single coordinate of $A_Kz$ is the inner product of the top integral cycle $z$ with $\partial[K]$. The dual matroid $Q^*$ has rank two. The singleton $\{x\}$ is a parallel class because for each $y\in K$, the set $K\setminus\{y\}$ is a basis of $Q$ and its complement $\{x,y\}$ is a basis of $Q^*$. If the remaining classes on $K$ are $P_1,\ldots,P_m$, then

$$
  \operatorname{im} A_K = \gcd(|P_1|,\ldots,|P_m|)\,\mathbb Z .
$$

Assign an integer potential $p_y$ to every vertex $y$, with $p_x=0$. Place these potentials with orientation signs on the faces obtained by deleting one vertex from the ground simplex, and take the augmented boundary. The coefficient that omits two vertices is their potential difference times an orientation sign. The next boundary is zero. When the two vertices belong to the same dual parallel class, their complement is a nonbasis of $Q$, so their potentials must agree. Conversely, potentials constant on each parallel class give zero coefficients at every nonbasis and hence produce a top cycle.

Choose the common orientation factor so that the coefficient on $K\setminus\{y\}$ multiplied by the coefficient of $\partial[K]$ there equals $p_y$. Every top cycle supplies these signed coefficients on the bases omitting $x$. At a basis containing $x$, the zero boundary equation at the face obtained by deleting $x$ uniquely determines the remaining coefficient from those that omit $x$. The potential construction therefore gives every top cycle.

It follows that $A_Kz=\sum_{i=1}^m |P_i|\,p_i$, where the common integer potential $p_i$ on each class is arbitrary. Bézout's identity gives exactly the multiples of the greatest common divisor. For example, when $|K|=4$, two classes of size two give $2\mathbb Z$ and four singleton classes give $\mathbb Z$. The two contractions have the same ground and rank. [Integral image for a one-element extension](lean:D5/S3/Combinatorics/Matroids/CircuitRestrictionImage.exists_topCycle_signedRestriction_iff)

**The integral image for any spanning circuit.** The same greatest-common-divisor formula holds for every spanning circuit $K$. Set $X=E\setminus K$. The contraction by $K$ still has the empty face as its only basis. Write the signed readout at each $a\in K$ as $c_a=\partial[K]\bigl(K\setminus\{a\}\bigr)\,z\bigl(K\setminus\{a\}\bigr)$, so $A_Kz=\sum_{a\in K}c_a$.

For distinct $a,b\in K$ that are parallel in the dual, take the zero boundary equation at $K\setminus\{a,b\}$. Inserting any vertex from $X$ leaves both $a,b$ in the dual complement, so its coefficient vanishes. Only the insertions of $a$ and $b$ can contribute. Applying the same boundary equation to $\partial[K]$ fixes the relative sign of these two terms. Thus $c_a=c_b$, and each class contributes a multiple of its size to $A_Kz$.

To realize the contribution of one class, choose its representative $p$. The set $X\cup\{p\}$ is a basis of the dual. First contract the rank-one closure of $p$, then do the same successively with vertices from the remaining basis. Each step removes a rank-one flat whose singletons are its bases, and the residual basis is a basis of the new contraction. The signed join of the oriented simplex boundaries of these flats is an integral chain with zero boundary. Each nonzero coefficient omits one vertex in every flat. The contraction rule for bases makes those omitted vertices a dual basis, so the retained face is a basis of the original matroid.

At $K\setminus\{p\}$ the omitted set $X\cup\{p\}$ has one vertex in every layer, so the coefficient is a unit. Deleting a vertex of $K$ outside the first layer retains the entire first layer, giving zero. The first layer is precisely the chosen dual parallel class. The signed readouts agree within that class, so multiplying by a common sign gives a cycle that reads one on the chosen class and zero elsewhere. This realizes each class size. Bézout's identity then realizes every multiple of their greatest common divisor. [Integral image for any spanning circuit](lean:D5/S3/Combinatorics/Matroids/SpanningCircuitImage.exists_topCycle_signedRestriction_iff)

::: {.theorem #thm-integral-circuit-image title="Integral restriction image for any circuit" lean="D5/S3/Combinatorics/Matroids/IntegralCircuitImage.exists_topCycle_aggregateRestrict_iff"}
Let $K$ be any circuit of a matroid $Q$ on a finite linearly ordered carrier. Let $P_1,\ldots,P_m$ be the nonempty intersections of the parallel classes of $Q^*$ with $K$. Write $Z_{\mathrm{top}}(N;\mathbb Z)$ for the integral augmented top-cycle lattice of a matroid $N$. The signed aggregate restriction $A_K$ satisfies

$$
  A_K\bigl(Z_{\mathrm{top}}(Q;\mathbb Z)\bigr)
  = \gcd(|P_1|,\ldots,|P_m|)\, Z_{\mathrm{top}}(Q/K;\mathbb Z).
$$

At each basis $T$ of $Q/K$, the coordinate of $A_Kz$ is a sum over $a\in K$. Each summand reads the coefficient of $z$ at $T\cup(K\setminus\{a\})$ and multiplies it by the boundary sign for deleting $a$ and the sign of merging the ordered circuit facet followed by the ordered basis $T$ into increasing order. All other coordinates are zero.
:::

Fix $T$ and take two elements $a,b$ of the same dual parallel class. The zero-boundary equation at $T\cup(K\setminus\{a,b\})$ has only two possible nonzero terms. Inserting any vertex other than $a,b$ leaves both in the dual complement, so that coefficient vanishes. The oriented circuit boundary gives the relative signs of the two surviving terms, so the signed readouts agree within a class. The contribution of a class is its common readout multiplied by its size. Write $d$ for the greatest common divisor of these sizes. The aggregate is itself a cycle, and every coordinate is divisible by $d$. Dividing the coordinates by $d$ preserves basis support and the zero-boundary equations, so the quotient is an integral cycle of $Q/K$.

For the reverse inclusion, let $w$ be an integral cycle of $Q/K$ and choose a class $P$. If $Q$ has no coloops, $P$ is the rank-one closure in the dual of any of its vertices. Deleting $P$ and then contracting the independent face $K\setminus P$ gives a matroid with the same bases as $Q/K$. Contracting this rank-one flat in the dual leaves no loops, so the primal deletion has no coloops. Write $\varepsilon=\sigma(P,K\setminus P)$ for the shuffle sign of the two parts. Lift $\varepsilon w$ through the link of the independent face to an integral cycle in the deletion, then take its signed join with the oriented simplex boundary on $P$. The join contributes another factor of $\varepsilon$ when read by $A_K$. Since $\varepsilon^2=1$, each vertex of $P$ contributes $w$, giving $|P|w$ in total. The link lift is obtained by iterating singleton lifts. For a singleton, move the vertex to the end of the order, lift with normalized cycles on internally passive bases, and restore the original orientation. Taking an integer Bézout combination of the cycles constructed for the different classes gives $dw$. If $Q$ has a coloop, it lies outside $K$ and survives contraction, so both cycle lattices are zero.

::: {.theorem #thm-joint-circuit-restriction-image title="Joint circuit restriction image in dual rank two" lean="D5/S3/Combinatorics/Matroids/JointCircuitRestrictionImage.exists_topCycle_joint_aggregateRestrict_iff"}
Let $Q$ be a matroid on a finite linearly ordered carrier with ground $E$. Assume that $Q^*$ has rank two and is loopless on $E$. Let $P_i$ be its parallel classes, with $n_i=|P_i|$ and $n=|E|$. The complements $K_i=E\setminus P_i$ are precisely the circuits of $Q$. Let $\sigma(K_i,P_i)$ be the sign of merging the ordered $K_i$ followed by the ordered $P_i$ into increasing order. Choose the generator

$$
  g_i=(-1)^{|K_i|-1}\sigma(K_i,P_i)\,\partial[P_i]
$$

of the rank-one integral augmented top-cycle lattice of $Q/K_i$. Given integers $y_i$, there is a unique integral augmented top cycle $z$ with $A_{K_i}z=y_i g_i$ for every $i$ if and only if

$$
  \sum_i n_i y_i=0,\qquad n\mid y_i-y_j\quad\text{for all }i,j.
$$
:::

Each dual basis consists of two vertices in distinct classes, so the primal bases are the complements of such pairs. Give each vertex an integer potential and place these weights, with orientation signs, on the faces obtained by deleting one vertex from the ground simplex. The augmented boundary reads the potential difference at the face omitting two vertices, with its orientation sign. Every primal top cycle has this representation. Fix a pivot with potential zero and read the other potentials from the coefficients of faces omitting the pivot. The zero-boundary equations determine the remaining coefficients. Two vertices in the same class have a nonbasis complement, so its coefficient is zero and their potentials agree.

Write $p_i$ for the common potential on class $i$. In the aggregate for $K_i$, the deletion and shuffle signs combine to give the orientation of $g_i$. Its scalar coefficient is $\sum_j n_jp_j-np_i$. These coefficients have weighted sum zero and pairwise differences divisible by $n$. Conversely, choose a reference class $r$ and set $p_i=(y_r-y_i)/n$. The congruence gives integer potentials, and weighted balance gives $\sum_j n_jp_j=y_r$. This single potential gives a cycle with all the prescribed readouts. On each basis, the coefficient is determined by the potential difference of the two omitted classes. The difference of their readouts gives that potential difference multiplied by $n$. The other coefficients vanish, so the complete readout determines the source cycle uniquely. For a singleton class, $\partial[P_i]$ is the augmented empty-face chain.

For $Q^*=U_{2,3}$, all three classes are singletons and each readout separately attains every integer. The vector $(1,-1,0)$ has weighted sum zero. Its entries fail the common residue condition modulo $3$, so no single cycle realizes it.

The complementary-face orientation agrees with that used in combinatorial Alexander duality. On vertex potentials constant within classes, the readout formula is the negative complete-graph Laplacian. [Björner–Tancer, combinatorial Alexander duality](https://doi.org/10.1007/s00454-008-9102-x) · [Glass–Kaplan, graph Laplacians and critical groups](https://arxiv.org/abs/1908.04395)

::: {.theorem #thm-joint-circuit-gram-certificate title="Gram certificate for the joint circuit restriction image" lean="D5/S3/Combinatorics/Matroids/JointCircuitGramCertificate.joint_circuit_gram_certificate"}
Let $Q$ be a matroid on a finite linearly ordered carrier and choose a ground vertex $e$. Write $Z$ for its integral augmented top-cycle lattice and $Z_K$ for the corresponding lattice of $Q/K$ for a circuit $K$. Pair chains by summing products of face coordinates. Let $R_{K,a}$ be the signed restriction at the facet $K\setminus\{a\}$, let $A_K=\sum_{a\in K}R_{K,a}$, and let $L_K(w)$ be the signed join of the oriented simplex boundary $\partial[K]$ with $w$. For $z\in Z$ and $w\in Z_K$,

$$
  \langle A_Kz,w\rangle=\langle z,L_K(w)\rangle.
$$

Let $c_B$ be the normalized integral cycle at an internally passive basis $B$ of $Q$. Let $c_{K,T}$ be the corresponding cycle at an internally passive basis $T$ of $Q/K$. Set $G_{BD}=\langle c_B,c_D\rangle$. Its determinant is nonzero, with determinant $1$ for the empty matrix. Given $y_K\in Z_K$, set

$$
  b_B=\sum_{K\ni e}\langle y_K,R_{K,e}(c_B)\rangle.
$$

There is a unique $z\in Z$ satisfying $A_Kz=y_K$ for every $K$ exactly when both conditions hold.

1. For every $K,T$, $\langle y_K,c_{K,T}\rangle=\sum_B b_B L_K(c_{K,T})(B)$.
2. $\det G$ divides every coordinate of $\operatorname{adj}(G)b$.
:::

A source basis in a join term is determined by the omitted circuit vertex and the contraction basis. Reindexing the sum by this pair gives the same boundary and shuffle signs in the two pairings. The circuit decomposition through $e$ lifts the restrictions $R_{K,e}(c_B)$ and sums them back to $c_B$. Hence any common lift $z$ has $\langle z,c_B\rangle=b_B$.

The normalized cycles at internally passive bases form an integral basis. Their Gram matrix is invertible over the rationals, since any nonzero combination has a nonzero internally passive coordinate and its self-pairing is a positive sum of squares. The second condition gives integral coefficients for the unique vector obtained from the adjugate. The first condition makes the readout of the resulting source cycle pair with every normalized contraction cycle in the same way as the prescribed readout. Their difference is a contraction cycle orthogonal to a basis of its lattice, so it vanishes. The two finite tests check compatibility and integrality of the same source cycle.

Write $A_M$ for the joint circuit restriction of a matroid $M$. Its source lattice $L_M$ consists of integral augmented top cycles, and its target $T_M$ is the direct sum of the cycle lattices of the circuit contractions. Let $C(M)=L_M^\vee/\operatorname{im} A_M^\vee$, where $\vee$ denotes the linear dual into $\mathbb Z$.

::: {.theorem #thm-joint-circuit-direct-sum-tensor title="Tensor formula for the transpose cokernel of joint circuit restriction" lean="D5/S3/Combinatorics/Matroids/DirectSumCircuitTorsion.joint_circuit_transpose_cokernel_tensor"}
Let $M,N$ be finite ordered matroids with disjoint grounds, with every vertex of $M$ before every vertex of $N$. The ordered join of augmented top cycles induces $L_M\otimes_{\mathbb Z}L_N\cong L_{M\oplus N}$. Under the induced dual identification, $f\otimes g$ evaluates on a joined cycle $u*v$ as $f(u)g(v)$. The map sending $[f]\otimes[g]$ to $[f\otimes g]$ under this identification gives an isomorphism
$$
C(M)\otimes_{\mathbb Z} C(N)\cong C(M\oplus N).
$$
:::

Every circuit of the direct sum lies in one factor, and its contraction changes only that factor. A left circuit readout factors as a left restriction and a right coordinate evaluation. A right circuit picks up the sign for moving its facet past the left face. This sign is an integer unit. The transpose relations of the sum are therefore generated by tensors of a circuit relation in one factor and a coordinate evaluation in the other.

::: {.theorem #thm-joint-circuit-rank-one-gcd title="The integral lifting obstruction for two rank-one factors" lean="D5/S3/Combinatorics/Matroids/JointCircuitLiftingObstruction.rank_one_sum_joint_lifting_obstruction"}
In the ordered direct sum above, suppose the bases of the two factors are precisely the singletons of their respective grounds, of sizes $m,n$. The saturation of the joint restriction image modulo that image is cyclic of order $\gcd(m,n)$. The saturation consists of the target elements with a nonzero integer multiple in the joint image.
:::

A circuit of a rank-one factor is a pair of vertices, and its readout is the difference of two singleton coefficients. All singleton evaluations therefore represent the same generator in the transpose cokernel. The augmented boundary gives a relation saying that their sum vanishes. On a ground of size $m$, the cycle with coefficient $1$ at every vertex except a chosen vertex, where the coefficient is $1-m$, gives a character by evaluation modulo $m$. The character sends the generator to $1$, so the generator has order exactly $m$.

Joint restriction is injective on a nonempty ground. In Smith bases, its image is spanned by integer multiples of target basis vectors. Saturating the image keeps those coordinates and allows arbitrary integer coefficients. The cyclic factors of the quotient by the original image are exactly those given by the diagonal entries of the transpose. For two rank-one factors the tensor generator is killed by both $m$ and $n$. Bézout's identity and multiplication of the reductions modulo $\gcd(m,n)$ give its exact order. For ground sizes $2,3$, every rationally compatible integral readout has an integral lift. For sizes $2,2$, the obstruction group is $\mathbb Z/2\mathbb Z$.

::: {.theorem #thm-joint-circuit-rank-two-factors title="Cyclic factors of joint circuit restriction in rank two" lean="D5/S3/Combinatorics/Matroids/RankTwoCircuitInvariantFactors.rank_two_lifting_obstruction_invariant_factors"}
Let a loopless matroid on a finite ordered ground have $k+2$ nonempty parallel classes that partition the ground. Its bases are exactly the pairs from distinct classes. Let $n$ be the ground size and $g$ the greatest common divisor of the class sizes. The saturation of the joint circuit restriction image modulo that image is isomorphic to
$$
\mathbb Z/g\mathbb Z \;\oplus\; (\mathbb Z/n\mathbb Z)^k .
$$
:::

Take a rational top cycle with integral joint circuit readouts and view it as a flow on the edges between classes and take its coefficients modulo integers. The two-element circuits within each class force an edge residue to depend only on the endpoint classes. The three-element circuits impose the triangle relations, so the residue from class $i$ to class $j$ can be written as $t_i-t_j$. Fix one class potential $t_0=0$ and write $m_i$ for the class sizes. The boundary equation at each vertex becomes $nt_i=\sum_j m_j t_j$ in the residue group. The equation in class zero gives $\sum_j m_j t_j=0$, so each $t_i$ is killed by $n$.

Conversely, a single rational cycle realizes any potentials satisfying these equations. Choose rational representatives for the potentials and take their differences along edges. The resulting vertex boundaries are integral and sum to zero. Route an integral correction to a fixed vertex, using a vertex in a second class for sources in the same class as the destination. Subtracting the correction gives a rational top cycle with the prescribed edge residues. The potential differences cancel in the pair-circuit differences and the oriented triangle sums, so every circuit readout is integral. Vanishing residues are exactly the condition for an integral lift.

With $t_0=0$, the other $k+1$ potentials lie in the $n$-torsion subgroup of $\mathbb Q/\mathbb Z$. Bézout's identity gives an invertible integral change of variables that reduces the weighted relation to multiplication of the first coordinate by $\gcd(m_1,\ldots,m_{k+1})$. That coordinate is also killed by $n$, so its allowed values form a cyclic group of order $g$. Each of the remaining $k$ coordinates contributes a cyclic group of order $n$. For example, three parallel classes of size $2$ give $\mathbb Z/2\mathbb Z\oplus\mathbb Z/6\mathbb Z$.

::: {.theorem #thm-joint-circuit-parallel-expansion title="Joint circuit restriction under parallel expansion" lean="D5/S3/Combinatorics/Matroids/ParallelCircuitObstruction.parallel_lifting_obstruction"}
Let $S$ be a loopless matroid on a nonempty finite ordered ground $I$, and let $p\colon V\to I$ be a surjection from a finite ground ordered in blocks according to $I$. The parallel expansion $M$ has as bases the transversals of bases of $S$. Write $m_i=|p^{-1}(i)|$. The saturation of the joint circuit restriction image of $M$ modulo that image is isomorphic to the group of coefficient functions $f$ with values in $\mathbb Q/\mathbb Z$, extended by zero off the bases of $S$, satisfying both families of equations
$$
\begin{aligned}
0&=\sum_{i\in I\setminus R}(-1)^{|\{r\in R:r<i\}|}\,m_i\, f(R\cup\{i\})
   &&\text{for every }R\subseteq I,\\
0&=\sum_{i\in C}\varepsilon(C,i,T)\,f(T\cup(C\setminus\{i\}))
   &&\text{for every circuit }C\text{ and basis }T\text{ of }S/C.
\end{aligned}
$$
Here $\varepsilon(C,i,T)$ is the sign of deleting $i$ from the ordered circuit, multiplied by the shuffle sign of the remaining circuit face and $T$. Under this isomorphism the class of a saturated readout goes to the residues of its rational top-cycle lift. On a face $F$ of $M$ where $p$ is injective, its residue is $f(p(F))$. On a face with a repeated class, its residue is zero.
:::

Reduce the coefficients of a rational top cycle with integral circuit readouts modulo the integers. A pair circuit within a fiber has a readout equal, up to sign, to the difference between the two coefficients obtained by exchanging its representatives. Any two transversals of a basis are joined by such exchanges, so they have one common residue. At a transverse face, inserting any of the $m_i$ vertices of class $i$ gives the same sign and the same residue, yielding the first equation. A circuit meeting each class at most once projects to a circuit of $S$. Its ordered deletion and shuffle signs agree with those downstairs, yielding the second equation.

Conversely, assign the core coefficient to every transverse basis. The weighted equations give zero boundary modulo integers, and any face with two representatives in a class contributes zero. Choose rational lifts of the coefficients at the internally passive bases and combine the integral cycles normalized on those bases. The difference between its residue and the prescribed chain has zero boundary and zero passive coordinates. If a nonzero difference remained, take the colexicographically largest basis with a nonzero coefficient. Since this basis is not internally passive, deleting an internally active element gives a boundary row in which all other possible basis terms are colexicographically larger. The surviving coefficient has sign $\pm1$, so the zero row forces it to vanish. This produces one rational top cycle with the prescribed residues. The pair equations and the core circuit equations make every readout integral. Zero residues correspond exactly to integral top cycles.

Thus computing the obstruction requires one variable per basis of $S$. For a fixed core, the weighted equations still depend on the individual class sizes. This reduction applies in arbitrary rank, while the explicit cyclic factors above use the rank-two core.

::: {.theorem #thm-joint-circuit-uniform-expansion title="Cyclic factors for a uniform core" lean="D5/S3/Combinatorics/Matroids/UniformCircuitInvariantFactors.uniform_lifting_obstruction_invariant_factors"}
Let $S$ be the uniform matroid of rank $r$ on $k$ ordered elements, with $2\le r\le k$. In its block-ordered parallel expansion, let $m_1,\ldots,m_k$ be the positive class sizes, $n=\sum_i m_i$, and $g=\gcd_i m_i$. The saturation of the simultaneous integral circuit restriction image modulo the image is isomorphic to
$$
(\mathbb Z/g\mathbb Z)^{\binom{k-2}{r-2}}
\;\oplus\;
(\mathbb Z/n\mathbb Z)^{\binom{k-2}{r-1}}.
$$
A binomial coefficient outside its range is zero, and a factor of order one is trivial.
:::

Use the residue equations of the preceding theorem. On the uniform core every $r$-element subset is a basis and every circuit has size $r+1$ and contracts to rank zero. Regard the coefficients on the ordered bases as an alternating $r$-form $f$ taking values in $\mathbb Q/\mathbb Z$. The circuit equations say that $a\wedge f=0$, where $a$ is the covector taking value one on every basis vector. The weighted boundary says that inserting $y=\sum_i m_i e_i$ into $f$ gives zero.

Take the first original coordinate vector as the pivot $x=e_1$, so $a(x)=1$. The equation $a\wedge f=0$ lets us write $f=a\wedge h$, where $h$ is the insertion of $x$ into $f$. Inserting $y$ then gives $n h=a\wedge\iota_y h$. Since inserting both $x$ and $y$ into $f$ gives zero when the weighted boundary vanishes, the two requirements reduce to $n h=0$ and $\iota_y h=0$, with $\iota_x h=0$ by alternation. Conversely these conditions on $h$ make both residue equations hold for $a\wedge h$.

An integral change of coordinates makes $y=n x+d z$, where $z$ is the second basis vector and $d=\gcd(m_2,\ldots,m_k)$. Coefficients of $h$ containing $x$ vanish. Those containing $z$ are killed by both $n$ and $d$, hence by $\gcd(n,d)=g$. Each remaining coefficient is killed by $n$. After excluding $x$ and $z$, the choices of indexing subset have sizes $r-2$ and $r-1$, respectively. For $r=2$ this recovers the earlier rank-two formula. For the free core $r=k$, only the factor of order $g$ remains.

::: {.theorem #thm-joint-circuit-omitted-uniform-basis title="Cyclic factors with one omitted uniform basis" lean="D5/S3/Combinatorics/Matroids/PuncturedCircuitInvariantFactors.punctured_lifting_obstruction_invariant_factors"}
Suppose $2\le r<k$ and the bases are all $r$-subsets except for one set $H$. Put $q=\gcd(n,\gcd_{i\notin H}m_i)$. For the block-ordered parallel expansion, the joint lifting obstruction has cyclic decomposition
$$
(\mathbb Z/g\mathbb Z)^{\binom{k-2}{r-2}-1}
\;\oplus\;
(\mathbb Z/n\mathbb Z)^{\binom{k-2}{r-1}-1}
\;\oplus\;\mathbb Z/q\mathbb Z.
$$
:::

Every subset of size less than $r$ extends to an allowed basis. If an extension is $H$, exchange an element outside the subset for an element outside $H$. The circuits are then $H$ and the $(r+1)$-subsets that do not contain $H$. The latter span the core and contract to rank zero. Contracting $H$ leaves a rank-one matroid in which each element $t\notin H$ is a singleton basis, since replacing any element of $H$ by $t$ gives an allowed basis. In the row for $H$ and $\{t\}$, the sign on the term deleting $i\in H$ differs from its sign in the deletion row for $H\cup\{t\}$ by $(-1)^{|\{j\in H:t<j\}|}$, independently of $i$. The extra term deleting $t$ has coefficient $f(H)=0$. Thus the residue equations impose the uniform equations together with $f(H)=0$.

Choose the pivot $x=e_j$ for some $j\in H$. As in the uniform calculation, write $f=a\wedge h$. The form $h$ has degree $s=r-1$ and descends to the quotient of the coordinate lattice by $x$. It is killed by $n$, and insertion of the image of $y$ into $h$ vanishes. The condition $f(H)=0$ says that $h$ vanishes on the top exterior power of the sublattice spanned by the classes of $e_i$ with $i\in H\setminus\{j\}$. Split the quotient lattice into this sublattice and the span of the outside classes. Within each summand, choose an integral basis that puts the projected weight vector on one basis vector. Its coordinates become $u z+v w$, where $z$ belongs to the first summand, $w$ to the second, $u=\gcd_{i\in H\setminus\{j\}}m_i$ and $v=\gcd_{i\notin H}m_i$. Such a change of basis follows from Bézout's identity for the weights in each summand.

Index the coefficients of $h$ by $s$-subsets of this basis. A coefficient using neither $z$ nor $w$ is killed by $n$. One using both is killed by $n,u,v$, hence by $g=\gcd(n,u,v)$, since the pivot weight is $n-\sum_{i\ne j}m_i$. For each $(s-1)$-subset $J$ avoiding both, the two coefficients $X=h(z,J)$ and $Y=h(w,J)$ satisfy $uX+vY=0$ and are killed by $n$. An integral Bézout change of the pair makes this equation multiplication by $\gcd(u,v)$ on a single coordinate, so the pair contributes one factor of order $g$ and one of order $n$. These are all the equations from insertion of $u z+v w$, obtained by evaluating on $(s-1)$-subsets. The single condition from $H$ sets $X=0$ in the pair whose $J$ consists of the remaining first-summand basis vectors. That pair contributes only the factor of order $\gcd(n,v)=q$. Counting the other coordinates by whether their subset uses $z$ or $w$ gives the two binomial multiplicities in the displayed formula.

::: {.theorem #thm-joint-circuit-two-omitted-uniform-bases title="Cyclic factors with two omitted uniform bases" lean="D5/S3/Combinatorics/Matroids/TwoOmittedCircuitInvariantFactors.two_omitted_lifting_obstruction_invariant_factors"}
Let $r\ge 3$. Suppose the core matroid has every $r$-element subset as a basis except $H$ and $J$, with $|H\cap J|\le r-2$. Then the number of classes satisfies $k\ge r+2$. For the block-ordered parallel expansion, put $q_T=\gcd(n,\gcd_{i\notin T}m_i)$ for $T\in\{H,J\}$. The joint lifting obstruction has a cyclic decomposition

$$
\begin{aligned}
&(\mathbb Z/g\mathbb Z)^{\binom{k-2}{r-2}-2}
\;\oplus\;
(\mathbb Z/n\mathbb Z)^{\binom{k-2}{r-1}-2}\\
&\qquad{}\oplus\;\mathbb Z/q_H\mathbb Z
\;\oplus\;\mathbb Z/q_J\mathbb Z .
\end{aligned}
$$
:::

::: proof
Since $|H\cup J|\ge r+2$, an $(r+1)$-element set contains at most one omitted basis. The sign comparison from the single-omission calculation therefore applies row by row. The two added conditions are $f(H)=0$ and $f(J)=0$. With the pivot decomposition $f=a\wedge h$, these become vanishing conditions on the top coefficient of $h$ in each of two difference lattices. If $H$ and $J$ meet, use a common representative in the intersection. If they are disjoint, choose one representative in each set and take differences within that set.

Write $F,G$ for the index sets of the two coefficients. Partition the indices by membership in $F$, membership in $G$, and equality to the pivot. Within each block, Bézout's identity puts the weight vector on a single coordinate. The basis change preserves the two difference lattices. Since $F\setminus G$ has at least two indices, at least one of them acquires zero weight. Decompose the alternating coefficients according to the intersection of their index set with the zero-weight indices. Insertion of the weighted vector uses only nonzero weights, so the boundary equation preserves each component. The equations at $F$ and $G$ act in different components.

Let $L_{\varnothing},L_H,L_J,L_{HJ}$ be the obstruction groups with neither omission, with only $H$ omitted, with only $J$ omitted, and with both omitted. Reordering the components gives $L_{\varnothing}\oplus L_{HJ}\cong L_H\oplus L_J$. Substitute the two single-omission formulas and cancel a copy of the uniform obstruction by direct-sum cancellation for finite $\mathbb Z$-modules. The full proof is checked by the Lean kernel.
:::

The two exceptional orders both divide $n$ and can be incomparable under divisibility. For example, take $r=3$, $H=\{1,2,3\}$, $J=\{3,4,5\}$ and class sizes $3,3,2,2,2$ in order. Then $n=12$, $g=1$, $q_H=2$, and $q_J=3$. The cyclic decomposition gives three nontrivial factors of orders $12,2,3$. Combining the coprime factors puts the group in invariant-factor form with orders $6,12$.

::: {.theorem #thm-joint-circuit-three-omission-counterexample title="Three omitted bases can impose dependent restrictions" lean="D5/S3/Combinatorics/Matroids/ThreeOmittedCircuitRefutation.result"}
The cyclic-factor rule obtained by treating each of three omissions independently fails even when every two omitted bases intersect in at most the rank minus two elements. Partition six elements into pairs $A,B,C$ and omit $A\cup B$, $A\cup C$ and $B\cup C$ from the rank-four bases. Give every class size one. Independent replacement predicts $\mathbb Z/6\mathbb Z$, while the joint lifting obstruction has at least four elements killed by two.
:::

::: proof
Each allowed basis contains one complete pair and one element from each of the other pairs. Assign its coefficient in $\mathbb F_2$ to be $u,v,u+v$ according as the complete pair is $A,B,C$, and set all other coefficients to zero. Map these coefficients into the elements of $\mathbb Q/\mathbb Z$ killed by two. The signs act identically on these two values.

For a three-element face containing a complete pair, only the two extensions using the missing pair can contribute, and their coefficients agree. For a face meeting each pair once, the three possible coefficients sum to $u+v+(u+v)=0$. In a five-element set, the two deletions from either complete pair give equal coefficients. Deleting the singleton leaves an omitted basis. Hence the weighted boundaries and circuit deletion rows vanish.

Reading off a basis with complete pair $A$ and another with complete pair $B$ recovers $u,v$, so the four choices yield distinct obstruction classes. Here $n=6$, $g=1$, and all three $q_T$ equal one. Independent replacement leaves $\binom{4}{3}-3=1$ factor of order six. Exactly two elements of $\mathbb Z/6\mathbb Z$ are killed by two. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-circuit-sunflower-omissions title="Cyclic factors for omissions with a common element" lean="D5/S3/Combinatorics/Matroids/SunflowerCircuitInvariantFactors.sunflower_lifting_obstruction_invariant_factors"}
Let $3\le r<k$, and let the omitted $r$-element sets be $T_1,\ldots,T_t$. Suppose they contain a common element $e$ and the petals $T_i\setminus\{e\}$ are pairwise disjoint. The other $r$-element sets are precisely the bases of the core. For a block-ordered parallel expansion, set $q_T=\gcd(n,\gcd_{i\notin T}m_i)$. If both $\binom{k-2}{r-2}$ and $\binom{k-2}{r-1}$ are at least $t$, the joint lifting obstruction is isomorphic to
$$
\begin{aligned}
&(\mathbb Z/g\mathbb Z)^{\binom{k-2}{r-2}-t}
\;\oplus\;
(\mathbb Z/n\mathbb Z)^{\binom{k-2}{r-1}-t}\\
&\qquad{}\oplus\bigoplus_{j=1}^{t}\mathbb Z/q_{T_j}\mathbb Z .
\end{aligned}
$$
:::

::: proof
Use $e$ as the pivot for every omission. In difference coordinates, each omission imposes one condition on the coefficient of its petal. An integral change of basis within each petal concentrates its weights on a single coordinate. Each petal contains at least two coordinates, so each has a zero-weight coordinate of its own.

Group the coefficients by their intersection with the zero-weight indices. Inserting the pivot or the weighted vector preserves this grouping. To add $T$ to an omitted family $S$, keep the coefficient group of the petal of $T$ in place and exchange all other groups between a pair of forms. This is an involution. It gives $L_\varnothing\oplus L_{S\cup\{T\}}\cong L_S\oplus L_{\{T\}}$, where $L_A$ denotes the obstruction for the omissions in $A$. Substitute the single-omission formula and cancel the finite uniform module. Induction gives the displayed cyclic factors. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-circuit-private-pair-omissions title="Cyclic factors with private pairs" lean="D5/S3/Combinatorics/Matroids/PrivatePairCircuitInvariantFactors.private_pair_lifting_obstruction_invariant_factors"}
Suppose $3\le r<k$ and the core bases are exactly the $r$-element subsets outside a family of $t$ omitted $r$-element subsets. All omissions contain a common element $e$ and each contains two elements belonging to no other omission. For the same block-ordered parallel expansion and the same $n,g,q_T$ as above, the cyclic decomposition in [the common-element formula](#thm-joint-circuit-sunflower-omissions) holds.
:::

::: proof
Partition the difference coordinates by the complete list of petals containing each index, keeping the pivot separate. A private pair has the same membership list, which consists of its own petal alone. Both directions of a change of basis within a block preserve each petal span. Concentrating the weights at one index per block leaves at least one zero-weight index in every private pair. Its membership distinguishes that petal from all others. Two private elements also give the pairwise bound $|T\cap U|\le r-2$, so the same circuit equations apply. When the proof passes to a subfamily, private elements stay private. Sector exchange and finite cancellation then give the same induction as above. The full proof is checked by the Lean kernel.
:::

For example, in rank four on nine classes omit $\{0,1,2,3\}$, $\{0,1,4,5\}$ and $\{0,6,7,8\}$. The first two meet in two elements, and each meets the third in one. With class sizes $1,1,1,3,3,3,3,3,3$, the total size is $21$ and $g=1$. Only the first omission contributes a nontrivial factor $q_T=3$. The obstruction is $(\mathbb Z/21\mathbb Z)^{32}\oplus\mathbb Z/3\mathbb Z$.

::: {.theorem #thm-joint-circuit-membership-omissions title="Cyclic factors from petal membership" lean="D5/S3/Combinatorics/Matroids/MembershipCircuitInvariantFactors.membership_lifting_obstruction_invariant_factors"}
For a larger class of overlaps, again assume $3\le r<k$ and that the omitted bases contain a common element $e$. Partition the other $k-1$ indices by their membership in the petals $T\setminus\{e\}$. Suppose that for any two different petals, some class of size at least two lies in one petal and is disjoint from the other. Then the same cyclic factor formula holds.
:::

::: proof
Within each membership class, an integral change of basis concentrates the weights at one index and preserves every petal span. Each class of size at least two therefore supplies a zero-weight coordinate. A class on which two petals differ distinguishes their coefficient groups, and its two indices still have equal membership after restricting to any subfamily. Also, the petal containing the distinguishing class has at least two indices absent from the other petal. The petals have equal size, so their intersection has size at most $r-3$. Thus the circuit equations and the induction by sector exchange remain applicable.

To count omissions, fix an index $x$ other than $e$. In each petal delete $x$ if it is present and otherwise delete any of its indices. The resulting $(r-2)$-element sets all avoid $e$ and $x$. They are distinct because two petals yielding the same set would share at least $r-2$ indices. This gives $t\le \binom{k-2}{r-2}$. The complements of the petals in the set of indices other than $e$ also differ on at least two indices in each direction. Applying the same deletion count to them, and using binomial symmetry, gives $t\le \binom{k-2}{r-1}$. The full proof is checked by the Lean kernel.
:::

For instance, take rank five on nine classes and omit $\{0,1,2,3,4\}$, $\{0,1,2,5,6\}$ and $\{0,3,4,5,6\}$. Each of the pairs $\{1,2\}$, $\{3,4\}$ and $\{5,6\}$ occurs in exactly two petals. For class sizes $1,1,1,3,3,3,3,3,3$, the total size is $21$ and $g=1$. The three $q_T$ are $3,3,1$, and the obstruction is $(\mathbb Z/21\mathbb Z)^{32}\oplus(\mathbb Z/3\mathbb Z)^2$.

::: {.theorem #thm-joint-circuit-common-pivot-omissions title="Cyclic factors under the common-pivot intersection bound" lean="D5/S3/Combinatorics/Matroids/CommonPivotCircuitInvariantFactors.common_pivot_lifting_obstruction_invariant_factors"}
Suppose $3\le r<k$ and the core bases are precisely the $r$-element subsets outside a family of $t$ omissions. Every omission contains $e$, and any two omissions share at most $r-2$ elements. For the same block-ordered parallel expansion, both $\binom{k-2}{r-2}$ and $\binom{k-2}{r-1}$ are at least $t$, and the same cyclic factor formula holds.
:::

::: proof
Any two petals share at most $r-3$ indices, so the deletion and complement argument above gives both bounds. For a prime power $p^a$ dividing $n$, work with the part of the coefficient module killed by $p^a$. Divide the weights outside the pivot by their gcd. Some normalized weight is invertible modulo $p^a$. Choose that index $x$ and make an integral change of basis at $x$, keeping the other vectors fixed. Modulo $p^a$, the insertion vector is now supported at $x$, after its pivot component is dropped. The insertion equation then acts separately on each coefficient.

An omitted petal avoiding $x$ still constrains one coefficient. An omitted petal containing $x$ can constrain that coefficient and those obtained by replacing $x$ with one index outside the petal. The affected sets for different omissions are disjoint. A replacement set equal to a petal avoiding $x$ would give two petals sharing $r-2$ indices. For two petals containing $x$, the union of their deletions of $x$ has at least $r$ elements and cannot fit in an $(r-1)$-element replacement set. This disjointness permits coefficient exchange on each primary component. Recombining the components and cancelling the finite uniform factors gives the formula. The full proof is checked by the Lean kernel.
:::

For example, on eight classes take rank four and common element $0$. Use the Fano petals $\{1,2,3\}$, $\{1,4,5\}$, $\{1,6,7\}$, $\{2,4,6\}$, $\{2,5,7\}$, $\{3,4,7\}$, and $\{3,5,6\}$. Every membership class contains a single index. For class sizes $3,3,3,3,6,6,6,6$ in order from $0$ through $7$, the petal $\{1,2,3\}$ leaves only weight-six classes outside its omission. It contributes $q_T=6$, and the other six petals give $q_T=3$. The obstruction is $(\mathbb Z/36\mathbb Z)^{13}\oplus\mathbb Z/6\mathbb Z\oplus(\mathbb Z/3\mathbb Z)^{14}$.

::: {.theorem #thm-joint-circuit-affine-plane-omissions title="A rank-three affine-plane counterexample" lean="D5/S3/Combinatorics/Matroids/AffinePlaneOmissionRefutation.result"}
There is a core on the nine points of $\mathrm{AG}(2,3)$ whose bases are all triples other than the twelve affine lines. With every parallel class of size one, its joint lifting obstruction is not isomorphic to the independent replacement prediction $(\mathbb Z/9\mathbb Z)^9$.
:::

::: proof
Any two omitted lines meet in at most one point, and the intersection of all twelve is empty. Here $n=9$, $g=1$, and $q_T=1$ for every omitted line. Independent replacement leaves $\binom{7}{2}-12=9$ factors of order nine, giving $3^9$ elements killed by three. The Lean proof constructs eleven coefficient vectors satisfying every signed deletion and extension equation modulo three. Evaluating at eleven basis coordinates gives the identity matrix. Mapping their linear combinations into the coefficients killed by three gives at least $3^{11}$ distinct obstruction elements killed by three. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-circuit-rank-three-omission-factors title="Cyclic factors for rank-three omission families" lean="D5/S3/Combinatorics/Matroids/RankThreeOmissionPotentials.rank_three_lifting_obstruction_cyclic_factors"}
Let the core have $n\ge 4$ points with singleton parallel classes. Its bases are all triples except for $m$ omitted triples, any two of which share at most one point. Choose any point as an anchor and put $b=\binom{n-2}{2}$.

A point potential $u$ takes values in $\mathbb Z/\gcd(n,3)\mathbb Z$. It vanishes at the anchor, its total sum is zero, and every value is killed by three. Its values at two points agree whenever no omitted triple contains both points. Its three values on each omitted triple sum to zero. There are $3^d$ such potentials, and the joint lifting obstruction is isomorphic as an integer module to

$$
(\mathbb Z/n\mathbb Z)^{b-m}\oplus(\mathbb Z/3\mathbb Z)^d.
$$

When $3\mid n$, the exponent $d$ is the dimension of this potential space over the field of three elements. When $3\nmid n$, the only potential is zero and $d=0$.
:::

::: proof
Choose a second point as a root. Eliminating the root and the sum of all point vectors from the alternating two-form leaves $b$ pair coordinates. Each omitted triple requires the form to vanish on two differences from its first point, giving one row of the reduced matrix. The original obstruction is the kernel of this matrix modulo $n$.

A relation in the transpose kernel assigns signed coefficients to the oriented edges of the omitted triangles. These coefficients are differences of point potentials. The three oriented edge coefficients on a triangle agree, and their sum around the cycle vanishes. Hence three kills each coefficient. Restoring the edges at the root and fixing the constant at the anchor yields the potentials in the statement. For each $q\mid n$, a finite character pairing gives the primal kernel size modulo $q$ as $q^{b-m}$ times the number of potentials modulo $\gcd(q,3)$.

The integral rows are linearly independent. In an integral relation, reduction modulo $n$ shows that three kills every reduced coefficient. The integer coefficients can therefore all be divided by $n/\gcd(n,3)>1$, and the relation still holds. Repeated division rules out a nonzero integral relation. Smith normal form splits off $b-m$ unconstrained coordinates modulo $n$. The counts at $q=n$ and $q=\gcd(n,3)$ show that three kills the remaining finite module and that its size is the potential count. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-circuit-affine-plane-factors title="Exact factors for the affine-plane omissions" lean="D5/S3/Combinatorics/Matroids/RankThreeOmissionPotentials.affine_plane_lifting_obstruction_cyclic_factors"}
Take a rank-three core on the nine points of $\mathrm{AG}(2,3)$ whose bases are all triples except its twelve lines. With singleton parallel classes, its joint lifting obstruction is isomorphic to $(\mathbb Z/9\mathbb Z)^9\oplus(\mathbb Z/3\mathbb Z)^2$.
:::

::: proof
Every pair of points lies on an omitted line. Write a point as $(x,y)\in\mathbb F_3^2$ and take the origin as the anchor. The twelve zero-sum equations make each normalized potential a linear form $u(x,y)=ax+by$, with $a,b\in\mathbb F_3$ arbitrary. Thus $d=2$ and $\binom{7}{2}-12=9$. The two order-three factors come from the two slopes. The full proof is checked by the Lean kernel.
:::

A direct computation using 72 basis coordinates, 36 deletion equations and 126 extension equations gives the same counts. The kernel modulo three has dimension 11, and the subspace that lifts to the kernel modulo nine has dimension 9. [Finite computation](https://github.com/the-omega-institute/trureturing/issues/33440#issuecomment-7088695650)

**Reduced integral homology of the direction complex (written derivation).** Suppose there is at least one nonempty facet. Write $d=n-h$ and let $m$ be the number of facets with $R(B)=B$. The quotient map above is a homotopy equivalence, so it identifies the reduced integral homology of $X$ with that of the wedge. Each sphere has its basepoint as a subcomplex of a CW structure, so its inclusion into the finite wedge contributes a direct summand in reduced homology. Each $S^{d-1}$ contributes a copy of $\mathbb Z$ in degree $d-1$ and zero in all other nonnegative degrees. Thus $\widetilde H_{d-1}(X;\mathbb Z)\cong\mathbb Z^m$, and $\widetilde H_k(X;\mathbb Z)=0$ for $k\ne d-1$. [Hatcher, *Algebraic Topology*, Corollary 2.25](https://pi.math.cornell.edu/~hatcher/AT/ATch2.pdf)

If there are no nonempty facets, the original realization is empty and its reduced integral homology vanishes in every nonnegative degree. When facets exist and $d=1$, the wedge is a discrete space with $m+1$ points and reduced degree-zero generators $[p_B]-[p_0]$, where $p_B$ is the point contributed by $B$ and $p_0$ is the common basepoint. When facets exist and $m=0$, the wedge is a point and every reduced group vanishes. For a nonempty family of facets, the reduced Euler characteristic is $(-1)^{d-1}m$, so the earlier Tutte evaluation gives $m=2^d T_M(1,1/2)$.
