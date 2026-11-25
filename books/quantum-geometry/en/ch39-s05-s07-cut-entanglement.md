# O.1 Cross-Cut $1^K$ Prohibition and Attainable Schmidt Ranks of Direct Encoders {#sec-ch39-p2e-entanglement}

Partition a binary physical register of length $m_X + m_Y$ ($m_X, m_Y \ge 1$) across a cut into a left block $X$ of length $m_X$ and a right block $Y$ of length $m_Y$. Even when $x \in \{0, 1\}^{m_X}$ and $y \in \{0, 1\}^{m_Y}$ are individually $1^K$-free, their concatenation $xy$ can still assemble $K$ consecutive `1`s across the junction: writing $\tau(x)$ for the terminal run of `1`s in $x$ and $\iota(y)$ for the initial run of `1`s in $y$, the concatenated word $xy$ is admissible if and only if

$$
\tau(x) + \iota(y) < K.
$$

::: {.example #ex-ch39-fib-pyramid title="The three-site pyramid and joint endpoint occupancy"}
Take $K=2$ and consider three sites. When the middle site is empty, the four endpoint assignments `000`, `100`, `001`, and `101` form the corners of a square. An occupied middle site forces both endpoints to be empty and gives the apex `010`. A probability law on these words gives three mean occupancies $(\mu_1,\mu_2,\mu_3)$. Their possible values fill the convex hull of the five vertices, specified by nonnegativity and the two inequalities $\mu_1+\mu_2\le1$ and $\mu_2+\mu_3\le1$. [Three-site occupancy pyramid](lean:D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid)

Write $q=\Pr(101)$. In word order `000`, `100`, `010`, `001`, `101`, the probabilities are $1-\mu_1-\mu_2-\mu_3+q$, $\mu_1-q$, $\mu_2$, $\mu_3-q$, and $q$. Requiring all five entries to be nonnegative gives

$$
\max(0,\mu_1+\mu_2+\mu_3-1)\le q\le\min(\mu_1,\mu_3).
$$

For example, keep the middle site empty and start with probability $1/4$ on each of the four base words. Switch to probability $1/2$ each on `000` and `101`. Each endpoint still has occupancy $1/2$, but the joint occupancy rises from $1/4$ to $1/2$. The switch adds $1/4$ to each diagonal entry and subtracts $1/4$ from each off-diagonal entry, preserving the row and column sums. The fixed-seed construction in [§39.3](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) uses the same four-cell move. Even with all word probabilities in the computational basis specified, the relative phases between words can vary, as in [@ex-ch39-p2e-phase-counterexample]. [FIB atom source, §§2–4](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L178-L216)

Order the four cells as `00`, `01`, `10`, and `11`. For nonnegative integers $a,b,c,d,s$, change the counts from $(a,b+s,c+s,d)$ to $(a+s,b,c,d+s)$. Both tables have total $N=a+b+c+d+2s$ and left and right occupancy counts $c+d+s$ and $b+d+s$, respectively. The joint count changes from $d$ to $d+s$. For $N>0$, the joint occupancy probability increases by exactly $s/N$. Cross multiplication compares these ratios exactly. The four-sample example takes $(a,b,c,d,s)=(1,0,0,1,1)$. Both endpoint readings of $2/4$ equal $1/2$, which is also the projective reading $\kappa([1:1])=1^2/(1^2+1^2)$. The joint reading goes from $1/4$ to $2/4$. [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)

For equal-weight samples, this move is the three-site case of a sorting procedure for words of any length with no adjacent ones. Complement the bits at positions $2,4,6,\ldots$. On each neighboring pair, legality now says that an occupied odd site forces its even neighbor to be occupied. Thus intersecting and taking the union of two transformed supports preserves legality. Undoing the complement gives two legal words with the same combined site counts. On the pyramid base, `100` and `001` become `110` and `011`. Intersection and union give `010` and `111`, which decode to `000` and `101`.

Repeated exchanges can sort the transformed supports by inclusion. If a site occurs $c$ times after the complement, it lies in exactly the last $c$ supports of the sorted list. The original site counts and $m$ therefore determine the sorted multiset. Two samples with the same size and site counts can be joined through this common multiset by legal two-word exchanges. This applies to rational laws after writing both laws with a common denominator. [Connectivity at fixed occupancies](lean:D5/S1/Words/AdmissibleWords/UncrossingFiber.adm_phi_fiber_common_endpoint)

The same threshold construction works for real occupancy probabilities. Suppose $\mu_i\in[0,1]$ and $\mu_i+\mu_{i+1}\le1$. Draw one uniform $U$ on $(0,1)$. Occupy an odd-numbered site if $U<\mu_i$ and an even-numbered site if $U>1-\mu_i$. Adjacent sites have disjoint intervals, so every sampled word is legal. Each site is occupied with probability $\mu_i$, the length of its interval. Sites of the same parity have nested intervals and joint occupancy $\min(\mu_i,\mu_j)$. Sites of opposite parity have intersection length $\max(0,\mu_i+\mu_j-1)$. This one sampling rule attains all these pairwise extremes simultaneously. [Shared realization at real marginals](lean:D5/S1/Words/AdmissibleWords/FIBThresholdPairExtrema.threshold_pair_extrema)
:::

::: {.example #ex-ch39-fib-deletion-coherence title="Coherence between the two alternating words"}
The same five allowed words also give a quantum example. Compare the pure state
$(|010\rangle+|101\rangle)/\sqrt2$ with the equal incoherent mixture of the same two basis states. The computational-basis law and every two-site reduced state agree. Tracing out any site kills the cross term because the two words differ at that site. Yet the mixture is a mixture of product states, while the pure state has Schmidt coefficients $(1/\sqrt2,1/\sqrt2)$ across every one-site cut. A joint measurement of $X\otimes X\otimes X$, with $X$ the bit flip, has expectation one on the pure state and zero on the mixture. [Auric FIB atom, §18.2–18.3](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L4163-L4280)

For an open chain of length at least two with no adjacent occupied sites, the only matrix entries that can differ at fixed single-site deletion traces are those between the two alternating words. To see this, let $D$ be the difference of the two density matrices, extended by zero on forbidden words. If two words agree at site $i$, the zero deletion trace relates the entries of $D$ with their common bit set to zero or one by a change of sign. If either word occupies a neighbor $j$, the entry with the common bit set to one is already zero. If both leave $j$ empty, first set the common bit at $i$ to one and use the deletion equation at $j$. Both endpoints occupied is forbidden, so that entry also vanishes. Thus any surviving pair differs at every site. Since both complementary words are legal, each edge must change the bit, leaving just the alternating pair. Conversely their cross terms vanish in every one-site deletion trace. In a Hermitian matrix difference the two entries are complex conjugates. [Exact deletion kernel on a finite graph](lean:D5/S3/Quantum/Entanglement/Marginals/IndependentWordMarginals.deletion_kernel_iff)

Fix the weights of the two alternating words at $p,1-p$, with $0<p<1$. By the deletion-kernel criterion above, the states with the same two-site marginals as that mixture are exactly the matrices below on the span of `010` and `101`.

$$
\rho(c)=\begin{pmatrix}p&c\\ \bar c&1-p\end{pmatrix},
\qquad |c|\le\sqrt{p(1-p)}.
$$

Positivity requires a nonnegative determinant. Equality gives the circle. Its center is the separable mixture, and its boundary consists of pure states. Partial transpose across any nontrivial cut moves the two cross terms to another orthogonal pair of basis states, where they form a block with eigenvalues $\pm|c|$. The negativity across each cut is therefore $|c|$. The local readings determine $p$. Reading the real and imaginary parts of $c$ determines the full state and its negativity.
:::

::: {.theorem #thm-ch39-fib-local-marginal-rank lean="D5/S3/Quantum/Entanglement/Marginals/LocalMarginalRank.finrank_marginalMap" title="Covered word pairs give the rank of local marginals"}
Let the legal words on a finite site set be downward closed, so every subset of the occupied sites of a legal word is legal. Index a matrix over a field by ordered pairs of legal words. Given any family of measured regions $\mathcal S$, take the partial trace over the complement of each $S\in\mathcal S$. The rank of the collected linear map equals the number of ordered legal pairs $(x,y)$ for which

$$
x\cup y\subseteq S\quad\text{for some }S\in\mathcal S.
$$
:::

::: {.proof}
Order word pairs by the size of their occupied union. At a pair $(x,y)$, keep both words fixed on $x\cup y$ and sum the matrix entries obtained by adding simultaneous occupancies elsewhere. This defines a triangular change of coordinates with ones on the diagonal. Take the partial trace for $S$ and then apply the same change of coordinates. When $x\cup y\subseteq S$, the two sums group terms by their restriction to the region and recover the original coordinate. When the union extends outside the region, the coordinate is zero. Downward closure keeps the restricted words legal. The collected traces thus have the same kernel and rank as projection onto all covered coordinates. The full proof is checked by the Lean kernel.
:::

The three-site pyramid has $25$ ordered legal pairs. The numbers with union sizes $0,1,2,3$ are $1,9,13,2$, respectively. Each adjacent pair of sites accounts for two ordered word pairs with that union, and the two endpoints account for nine. All single-site marginals have rank $10$, which includes the trace. All three two-site marginals have rank $23$. Measuring only the two adjacent pairs gives rank $14$, since neither region contains the union formed by the two endpoints.

The inverse question is whether two specified adjacent marginals come from one state. Let the sites be $A,B,C$ with occupancies $p_A,p_B,p_C$, using the same $p_B$ in both marginals. Assume each marginal has zero entries between its vacuum and one-particle sectors. Write $\alpha,\beta$ for the entries in the endpoint-occupied row and middle-occupied column of the respective marginals, and set $q_0=\max(0,p_A+p_B+p_C-1)$. They admit a common positive semidefinite trace-one extension exactly when

$$
p_B\ge0,\qquad p_A,p_C\ge q_0,\qquad
|\alpha|^2\le p_B(p_A-q_0),\qquad
|\beta|^2\le p_B(p_C-q_0).
$$

If $q$ is the probability of occupying both endpoints, the vacuum weight is $1-p_A-p_B-p_C+q$, so $q\ge q_0$. The global one-particle block has diagonal weights $p_A-q,p_B,p_C-q$. Its two adjacent principal minors give the coherence bounds. Conversely, take $q=q_0$. For $p_B>0$, the outer product of $(\alpha/\sqrt{p_B},\sqrt{p_B},\beta/\sqrt{p_B})$ realizes both coherences. A nonnegative diagonal term supplies the remaining endpoint weights. If $p_B=0$, both coherences must vanish and the one-particle block can be diagonal. [Exact criterion for a common positive extension](lean:D5/S3/Quantum/Entanglement/Marginals/FibMarginalExtension.extendible_iff)

For example, take the pure state $(|10\rangle+|01\rangle)/\sqrt2$ on each edge. Both readouts give a maximally mixed middle site. Here $p_A=p_B=p_C=1/2$ and $q_0=1/2$, so both nonzero coherences exceed the common-extension bounds.

With arbitrary coherences, finding a common extension still reduces to choosing one complex number. Write the global space as the direct sum of $|010\rangle$ and the four-dimensional space of the two endpoints. Suppose the two edge marginals agree on the middle site's reduced state, so they give the same middle occupation $b=p_B$ and the same matrix entry in the $|010\rangle$ row and $|000\rangle$ column. Let $L,R$ be their $2\times2$ principal blocks with the middle site empty. Each marginal also determines the entry in the $|010\rangle$ row for its own occupied endpoint. This leaves $v=(v_{00},v_{10},v_{01},z)$ as the coupling row to the endpoint space, with $z$ in the unobserved $|101\rangle$ column.

For $b>0$, trace out the right and left endpoints of $v^\dagger v/b$ to obtain $G_A,G_C$, respectively. By the Schur complement, a common extension requires $\operatorname{Tr} L=\operatorname{Tr} R=1-b$ and a choice of $z$ that makes both residuals $L-G_A$ and $R-G_C$ positive semidefinite. Conversely, these residuals have the same trace $t$. If $t>0$, then $(L-G_A)\otimes(R-G_C)/t$ is positive semidefinite and has the required residual marginals. If $t=0$, both residuals vanish, so use the zero matrix. Restoring $v^\dagger v/b$ and the row and column for $|010\rangle$ gives the global state. If $b=0$, the three prescribed couplings must all vanish and $L,R$ must both be positive semidefinite with trace one. In this case the endpoint block is $L\otimes R$. [Common extension criterion with arbitrary coherences](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.coherent_extendible_iff)

Scale the left residual by $b>0$ and write its diagonal entries as $a,e-|z|^2$ and its upper off-diagonal entry as $c-\bar k z$. Here $a=bL_{00}-|v_{00}|^2-|v_{01}|^2$, $e=bL_{11}-|v_{10}|^2$, $c=bL_{01}-\bar v_{00}v_{10}$, and $k=v_{01}$. For the right residual, replace $L$ with $R$ and exchange $v_{10}$ and $v_{01}$. If $a>0$, set $h=a+|k|^2$ and complete the square in the determinant inequality. The disk has center $p=kc/h$ and squared radius $r=(ae-|c|^2+h|p|^2)/h$. If $a=0$, the conditions $c=\bar k z$ and $|z|^2\le e$ give a disk, a single point, or the empty set. A negative $a$ or a negative squared radius gives the empty set.

For two nonempty disks with centers $p,q$ and squared radii $r,s$, let $d=|q-p|^2$. If $d>0$, clip $(d+r-s)/(2d)$ to $[0,1]$ to obtain $\lambda$ and take $z=p+\lambda(q-p)$. For coincident centers, take the common center. Whenever a feasible $z$ exists, this point passes both residual positivity tests, including at tangency. At $b=0$, take $z=0$ and apply the zero-occupation conditions above. The selection uses only rational arithmetic for inputs with rational real and imaginary parts. [Common extension from the two disks](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentDisks.extendible_iff_selected)

Suppose the two marginals are normalized and $b>0$. They determine a unique global state exactly when the two disks meet at a single point. If both Schur residuals at that point were positive definite, nearby values of $z$ would also be feasible. Thus at least one residual is singular. At zero common trace the joint residual vanishes. At positive common trace the singular endpoint residual has rank one, and the joint residual must be the tensor product of the endpoint residuals divided by their common trace. [When the two marginals determine the global state](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.unique_coherent_extension_iff)

For instance, take $b=1/4$ and $L=R=\operatorname{diag}(1/4,1/2)$, with $v_{00}=v_{10}=0$ and $v_{01}=1/4$. The left residual has a zero top-left entry, so positivity forces its top-right entry $-z$ to vanish. At $z=0$, the left residual is $\operatorname{diag}(0,1/2)$ and the right residual is $I/4$. The two residuals have ranks one and two, so the joint residual has rank two. With the middle pivot, the unique global state has rank three.

Suppose $b\ne 0$ and fix $z$. A pure extension exists exactly when $\operatorname{Tr}L=1-b$ and both Schur residuals vanish. The trace condition and vanishing left residual force $b>0$, since for negative $b$ the correction $v^\dagger v/b$ has nonpositive trace. Let $x$ be the amplitude on the occupied middle site and $y$ the other four amplitudes. The coupling row is $x\bar y$ and $|x|^2=b$, so the row determines the entire endpoint block $v^\dagger v/b$. Conversely, take $x=\sqrt b$ and recover $y$ from the row to construct a pure state. Any positive semidefinite extension with the same marginals and $z$ has a positive semidefinite Schur residual with zero left marginal. Its trace is zero, so the entire residual vanishes. Thus the pure density matrix is the only extension with these data. [Pure extension at a prescribed coupling](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.pure_coherent_iff)

Suppose $b>0$ and the rational edge data admit a pure extension. If either $v_{10}$ or $v_{01}$ is nonzero, an off-diagonal marginal equation solves linearly for a rational $z$, so the pure extension has rational entries. If both vanish, changing the phase of $z$ preserves the marginals and $|z|^2=bL_{11}$, where $L_{11}$ is the occupied diagonal entry of the left endpoint block. A rational pure extension then exists exactly when $bL_{11}$ is a sum of two rational squares. [Rational purity at positive occupation](lean:D5/S3/Quantum/Entanglement/Marginals/FibPositiveRationalPurity.positive_rational_purity_iff)

For these marginals admitting a complex pure extension, the same criterion determines the least rational rank. It is one whenever a rational pure extension exists. Otherwise the two couplings vanish, so a pure state has amplitudes only on the vacuum, the occupied middle site and the double-endpoint word. Set the coherences linking the double-endpoint word to the other two to zero. Both edges retain the same populations and the vacuum-to-middle coherence. The two remaining outer products give a rational extension of the minimum rank two. [Rational rank bound when a complex pure extension exists](lean:D5/S3/Quantum/Entanglement/Marginals/FibPositiveRationalRank.positive_rational_rank_le_two_of_pure)

At positive middle occupation and a prescribed coupling $z$, Schur elimination is an invertible congruence. It leaves the scalar pivot $b$ beside the joint endpoint residual, so the global rank is one plus the rank of that joint residual. For rational edge data and rational $z$, elimination and restoration both preserve rational entries. With the traces normalized as above, a rational extension of rank at most two exists exactly when $L-G_A$ and $R-G_C$ are positive semidefinite, their determinants agree, and the common determinant is a sum of two rational squares. For positive residual trace $t$, divide both residual marginals by $t$ and apply the rational pure two-qubit criterion. Dividing the determinants by $t^2$ preserves the square-sum condition. At zero residual trace the joint residual vanishes and the extension has rank one. [Rational rank at most two at a prescribed coupling](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentRank.rational_rank_le_two_at_iff)

Suppose the three known couplings vanish and the endpoint marginals are $L=\operatorname{diag}(\ell,t-\ell)$ and $R=\operatorname{diag}(r,t-r)$, where $t=1-b$, $b$ is a positive rational, and $\ell,r$ are distinct nonnegative rationals. The Schur correction subtracts $|z|^2/b$ from each occupied diagonal entry. Equating the residual determinants gives $|z|^2=b(t-\ell-r)$, so the residual marginals are $\operatorname{diag}(\ell,r)$ and $\operatorname{diag}(r,\ell)$. A rational extension of rank at most two therefore exists exactly when both $b(t-\ell-r)$ and $\ell r$ are sums of two rational squares. The first condition comes from the unread coupling and the second from the common residual determinant. [Rational rank-two criterion for diagonal marginals](lean:D5/S3/Quantum/Entanglement/Marginals/FibDiagonalRank.rational_rank_le_two_diagonal_iff)

Take $b=1/2$, $\ell=1/4$ and $r=1/16$. The common determinant is $1/64$, but the squared modulus of the coupling must be $3/32$. If $z$ had rational coordinates, dividing it by $(1+i)/8$ would express three as a sum of two rational squares, which the modulo-three obstruction rules out. A complex coupling can realize this squared modulus. The two residual marginals come from the outer product of $(2|001\rangle+|100\rangle)/4$. Their common trace is $5/16$, so the minimum complex rank after restoring the pivot is two. At $z=0$, use the same outer product and add diagonal weights $1/2$ on $|010\rangle$ and $3/16$ on $|101\rangle$ to attain the minimum rational rank three.

Take $b=1/4$, $\ell=1/8$ and $r=3/8$. Now $z=1/4$ satisfies the coupling condition. The common determinant is $3/64$, so expressing it as a sum of two rational squares would give such an expression for three after multiplying by $64$. Add the outer product of $(|010\rangle+|101\rangle)/2$ to the diagonal weights $1/8$ on $|001\rangle$ and $3/8$ on $|100\rangle$ to attain the minimum rational rank three.

The unobserved entry affects positivity. For example, take $b=1/5$ and $v_{00}=v_{10}=v_{01}=1/5$ with every entry of $L,R$ equal to $2/5$. Choosing $z=1/5$ makes both residuals zero and gives a unique extension, the equal-amplitude pure state on the five legal words. Choosing $z=0$ gives the left residual determinant $-1/25$, so this choice cannot produce a positive global state.

If both edge matrices have rational real and imaginary parts, any compatible pair admits a common extension whose entries also have rational real and imaginary parts. Normalization gives $b=1-\operatorname{Tr}L$. For $b>0$, the disk centers, squared radii and clipped segment parameter use only rational operations, so the selected $z$ is rational in both coordinates, including at tangency. At $b=0$, take $z=0$. With $z$ set, divide the tensor product of the two Schur residuals by their common trace, then restore the correction. When the common trace is zero, take the tensor product contribution to be zero. This yields a positive semidefinite trace-one global state. [Rational common-extension criterion](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentDisks.rational_coherent_extendible_iff)

Rational coordinates can also be kept while reducing the extension's rank. Use the rational $z$ selected above. A Schur elimination decomposes each endpoint residual into two rational rank-one projectors with nonnegative rational weights. Match the two pairs of weights in a $2\times2$ table, placing the smaller of the first weights in the top-left cell. At least one off-diagonal entry is then zero. Multiply the corresponding product projectors by the nonzero weights and sum them to obtain a rational endpoint residual of rank at most three. Restoring the occupied middle site for $b>0$ adds one rank-one term, so the rational global state has rank at most four. For $b=0$, the coupling row vanishes and the endpoint residual gives a global state of rank at most three. [Rank bound for rational endpoint residuals](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitMarginalRank.rational_endpoint_rank_le_three)

Suppose $b>0$ and the two rational marginals are compatible. Adjoining the real square root of a single nonnegative rational suffices for a global extension of rank at most three. From the rational $z$ selected above, move horizontally to the right endpoint of the disk intersection. This is the first of the two individual disk endpoints reached, so only one square root is needed. At the boundary, at least one Schur residual is singular. The normalized tensor product of the residuals has rank at most two, and restoring the middle pivot adds one. Every matrix entry lies in the same field generated by the Gaussian rationals and that square root. [Rank-three bound over a quadratic extension](lean:D5/S3/Quantum/Entanglement/Marginals/FibQuadraticCompletion.quadratic_rank_le_three)

When can we choose a rational boundary coupling directly? Under the same assumptions, a rational extension of rank at most three with $z$ on the boundary of at least one disk exists exactly when one of the following conditions holds.

- One circle has a point in the strict interior of the other disk, and its squared radius is a sum of two rational squares. Starting from a rational point on the circle, the Cayley parametrization gives a dense set of rational points, including one in that interior. For a zero radius, use the center.
- The circles coincide, and their common squared radius is a sum of two rational squares.
- The centers differ and, with $t=(d+r-s)/(2d)$, the number $r/d-t^2$ is a rational square. Subtracting the two circle equations fixes the real part of $(z-p)/(q-p)$ at $t$, leaving $r/d-t^2$ as the square of its imaginary part. Tangency corresponds to an imaginary part of zero.

If all three tests fail, a rational extension of rank at most three must use a coupling strictly inside both disks. Both Schur residuals can then have full rank, so the joint endpoint residual of rank at most two must be constructed directly. [Rank-three criterion for rational boundary couplings](lean:D5/S3/Quantum/Entanglement/Marginals/FibRationalBoundary.rational_rank_three_boundary_iff)

::: {.remark #rem-ch39-fib-meyer-rank-three title="Rank at most three at any feasible rational coupling"}
For $b>0$, every feasible rational $z$ admits a rational global extension of rank at most three. If the two Schur residuals have common trace zero, the joint residual is zero. If one residual is singular and their common trace is positive, the normalized tensor product has rank at most two. Otherwise, divide by the common trace and write the residuals as $(I+\sigma(a))/2$ and $(I+\sigma(c))/2$, where $\sigma$ is the Pauli linear combination and $a,c\in\mathbb Q^3$ are Bloch vectors. Positive definiteness gives $|a|,|c|<1$. Equal lengths give the equal-spectrum projection construction. For unequal lengths, swap endpoints if necessary so that $|a|<|c|$. [Rational rank-two construction for equal spectra](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitEqualSpectrumRank.rational_endpoint_rank_le_two_of_equal_det)

On the five-dimensional rational hyperplane $a\cdot y=c\cdot v$, consider the quadratic form

$$
|y|^2-(1-|c|^2)|v|^2-(c\cdot v)^2.
$$

It takes a positive value at $v=0$ and a nonzero $y\perp a$, and a negative value at $y=0$ and a nonzero $v\perp c$. If the form is degenerate, its radical contains a nonzero rational zero. In the nondegenerate case, Meyer's theorem gives a nonzero rational zero. Since $1-|c|^2>0$, both $y$ and $v$ at that zero are nonzero. They supply the rational Pauli projection construction for a rank-two joint state of the normalized residuals. Multiplying by the common trace and restoring the middle pivot gives a global state of rank at most three. The earlier example with complex rank two and rational rank three attains the uniform rational bound. Meyer's theorem supplies the zero, and Lean verifies the matrix construction from that zero. [Serre, A Course in Arithmetic, Chapter IV, §3.2, Corollary 2](https://doi.org/10.1007/978-1-4684-9884-4) · [Rank-two construction from a rational zero](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitProjector.rational_rank_two_of_quadratic_witness)

If one normalized residual is maximally mixed, so that $a=0$, the four-square theorem supplies a rational quaternion $H$ of squared norm $1-|c|^2$. Choose a nonzero rational vector $v$ perpendicular to both $c$ and the imaginary part of $H$, and regard $v$ as a pure quaternion. Then $Hv$ has zero real part and its imaginary part $y$ satisfies $|y|^2=(1-|c|^2)|v|^2$. This gives the rational zero used by the projector construction. [Rank-two construction at a maximally mixed endpoint](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitMixedEndpoint.rational_rank_two_of_maximally_mixed_endpoint)
:::

Requiring a pure extension adds a norm equation. Suppose both marginals are $\operatorname{diag}(0,b,1-b)$ with rational $b$. The zero vacuum readings force a pure state to be supported on $|010\rangle,|101\rangle$. Their weights are $b,1-b$, so the coupling $z$ must satisfy $|z|^2=b(1-b)$. Conversely, for $b>0$, the amplitudes $\sqrt b,\bar z/\sqrt b$ give the required pure state. For $b=0$, take $|101\rangle$. For prescribed $b,z$, a pure extension with rational real and imaginary parts in every density matrix entry exists exactly when $b$ and both coordinates of $z$ are rational and satisfy this norm equation. For rational $b$, existence is thus equivalent to writing $b(1-b)$ as a sum of two rational squares. [Criterion for a rational pure extension](lean:D5/S3/Quantum/Entanglement/Marginals/FibRationalPureExtension.rational_pure_coupling_iff)

For instance, when $b=1/4$, the coupling $z=\sqrt 3/4$ gives a pure state. Rational coordinates for $z$ would express three as a sum of two rational squares after scaling by four. Clearing denominators would equate a sum of two integer squares to three times a square, where the exponent of three is odd. This is impossible. The diagonal mixture of $|010\rangle,|101\rangle$ with weights $1/4,3/4$ gives a rational common extension.

At zero middle occupation, a pure extension also requires the two endpoint states to have the same eigenvalues. All four couplings $v_{00},v_{10},v_{01},z$ must vanish, and $L,R$ must be positive semidefinite, each with trace one, and have equal determinants. These conditions also suffice. Arranging the endpoint amplitudes in a matrix $M$ gives the two readouts $MM^\dagger$ and $(M^\dagger M)^\mathsf T$, which have the same eigenvalues. Conversely, trace and determinant determine the eigenvalues of each $2\times2$ block. Use the square roots of the common eigenvalues as Schmidt coefficients and pair the corresponding eigenvectors to obtain the pure state. For example, with $L=I/2$ and $R=\operatorname{diag}(1,0)$, the product $L\otimes R$ is a mixed extension, while the determinants $1/4$ and $0$ rule out a pure extension. [Pure extension criterion at zero occupation](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.pure_coherent_zero_iff)

When both endpoint blocks also have rational real and imaginary parts, rational purity imposes an arithmetic condition. A rational pure extension exists exactly when their determinants agree and the common determinant is a sum of two rational squares. A nonzero column of the pure density matrix gives rational projective amplitudes. Arrange these amplitudes in a $2\times2$ matrix and divide its determinant by the diagonal entry of the chosen column. The squared modulus of the quotient is the marginal determinant. [Determinant criterion for rational pure extensions](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitPurity.rational_qubit_purity_iff)

For endpoint marginals with equal spectra, a rational extension of rank at most two always exists. Write $H=L-I/2$, $K=R-I/2$, and $s=1/4-\det L$. When $s\ne0$, both $H^2$ and $K^2$ equal $sI$, so $P=(I+H\otimes K/s)/2$ is a rank-two projection. Compressing $L\otimes I$ by $P$ gives a rational positive semidefinite joint state. Its partial traces recover $L$ and $R$ using $\operatorname{Tr}K=0$ and $\operatorname{Tr}(LH)=2s$. When $s=0$, both marginals are $I/2$. The equal mixture of $|000\rangle$ and $|101\rangle$ then gives the extension. [Rank-two bound for equal spectra](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitEqualSpectrumRank.rational_endpoint_rank_le_two_of_equal_det)

The least rational rank is one if the common determinant is a sum of two rational squares and two otherwise. For example, equal marginals $\operatorname{diag}(1/4,3/4)$ have determinant $3/16$, so the same obstruction modulo three applies. The diagonal mixture of $|000\rangle,|101\rangle$ with weights $1/4,3/4$ gives a rational extension of rank two.

For equal-width windows on an open chain of length $n$, the joint rank can be computed directly from the spacing. Forbid $K$ consecutive ones, let $a_\ell$ be the number of legal words of length $\ell$, and write $b_\ell=a_\ell^2$ with $b_0=1$. Choose $m\ge1$ windows of width $1\le k\le n$ with strictly increasing starts and successive gaps $g_1,\ldots,g_{m-1}$. The rank of their collected partial traces is

$$
b_k+\sum_{i=1}^{m-1}\bigl(b_k-b_{\max(k-g_i,0)}\bigr).
$$

Padding with zeros outside a contiguous region of length $\ell$ gives a bijection between legal words of length $\ell$ and legal full-chain words supported there. The region therefore supports $b_\ell$ ordered word pairs. The intersection of a new window with any earlier window lies within its intersection with the preceding window. This one overlap accounts for every pair already counted. Even disjoint windows share the all-zero pair. Taking all sliding windows gives $b_k+(n-k)(b_k-b_{k-1})$. When adjacent ones are forbidden, $a_\ell=F_{\ell+2}$ where $F_0=0$ and $F_1=1$. The recurrence comes from splitting words according to whether they begin with $0$ or $10$. For arbitrary ordered regions, subtracting only the pair counts in adjacent intersections gives the exact joint rank if and only if every region between two regions containing a site that is legal to occupy alone also contains that site. [Rank formula for regions with running intersection](lean:D5/S3/Quantum/Entanglement/Marginals/LocalMarginalRunningIntersection.finrank_add_adjacentOverlap_iff)

For a fixed number $m\ge2$ of windows, a maximum rank is attained by spanning the chain and making the gaps as equal as possible. Moving the end windows outward increases the total gap to $n-k$ without reducing rank. The difference $b_\ell-b_{\ell-1}$ counts pairs in which at least one word occupies the last site. Prepending a zero to both words injects these pairs into the corresponding set at the next length, so the differences are nondecreasing. It follows that increasing a gap by one gives a nonincreasing rank gain as the gap grows, with zero gain once the gap is at least $k$. Moving one step from a larger gap to a smaller one until they differ by at most one cannot decrease the rank.

::: {.example #ex-ch39-fib-forbidden-window-coherence title="Coherence with forbidden windows"}
For the ban on $K$ consecutive ones, take a chain of length $n\ge K$. An entry between two words can differ between density matrices with the same one-site deletion traces exactly when every window of $K$ sites contains a position of type $(0,1)$ and a position of type $(1,0)$ in the ordered word pair. To see this, fix all differing bits and let each common bit vary. The two entries in a deletion sum are opposites, so a nonzero entry forces every simultaneous assignment of the common bits to stay in the legal support. Setting all common bits to one checks all assignments at once. Each forbidden window must still contain a zero in each word. [Exact support criterion for binary deletion](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSupport.survives_iff)

Every surviving pattern gives a matrix with entries of opposite sign when a common bit is flipped. The differing positions contain both orientations, so the ordered pattern and its transpose have disjoint supports. Adding the adjoint produces a nonzero Hermitian matrix with zero deletion traces and zero trace. On the legal subspace add and subtract a sufficiently small multiple of this matrix from the normalized identity. The two resulting density matrices realize the difference. For $K=3$, the pairs $(010,100)$ and $(011,101)$ share one pattern. Their entries cancel when the common last bit is deleted, and deleting either of the differing bits gives zero in each summand.
:::

::: {.theorem #thm-ch39-omega-fib-integer-deletion lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSignTensor.deleteSite, D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSignTensor.actualEntry" title="An integer deletion witness for binary patterns"}
At each site an ordered bit pattern records agreement, zero to one, or one to zero. An agreement has local coefficient $1$ at $00$ and $-1$ at $11$. A difference has local coefficient $1$ at its specified ordered pair. All other coefficients are zero. Multiply the local coefficients along any finite pattern. At a chosen site, take two words whose prefixes have the length prescribed by the split of the pattern. Reinserting zero into both words and then reinserting one gives two integer coefficients whose sum is zero. The representative with all common bits zero and the specified bits at disagreements has coefficient $1$.
:::

::: {.proof}
At the deleted site, the local coefficients for the two insertions are opposites. Restoring each earlier site multiplies both by the same coefficient. On the indicated representative every site contributes $1$. The coefficient program and both declarations have empty axiom closures. The full proof is checked by the Lean kernel.
:::

On a three-site chain with no three consecutive ones, start with $(010,100)$. Setting the common final bit to one gives $(011,101)$. Put

$$
\begin{aligned}
u_\pm&=|010\rangle\pm|100\rangle,\\
v_\pm&=|011\rangle\mp|101\rangle.
\end{aligned}
$$

The two matrices $(u_\pm u_\pm^\top+v_\pm v_\pm^\top)/4$ are positive semidefinite with trace one and a common integer denominator of $4$. Their diagonals and all single-site partial traces agree. The joint observable that swaps the first pair with sign $+1$, swaps the second pair with sign $-1$, and vanishes on the other words has expectations $+1$ and $-1$, respectively. See [@ex-ch39-fib-forbidden-window-coherence].

::: {.theorem #thm-ch39-fib-forbidden-triple-dimension lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.noTriple_finrank" title="Dimension of the deletion kernel with a ban on triples"}
On an open chain of length $n\ge3$, allow only words with no three consecutive ones. Let $d_n$ be the complex dimension of the space of matrices supported on allowed words in both indices and with zero partial trace over each individual site. Then
$$
d_3=12,\quad d_4=24,\quad d_5=44,\qquad d_n=d_{n-1}+d_{n-2}+d_{n-3}\quad(n\ge6).
$$
:::

::: {.proof}
At each site, record whether the two bits agree, go from zero to one, or go from one to zero. Each allowed pattern has one complex coefficient, read at the word pair where every common bit is zero. Flipping a common bit multiplies the coefficient by $-1$. Distinct patterns have disjoint entry sets, so their coefficients can vary independently. [Dimension formula for any finite allowed word family](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.supportedKernel_finrank)

For the ban on triples, every three consecutive symbols must contain both orientations. Let $A,B,C,D$ count patterns whose last two symbols are the same orientation, opposite orientations, an orientation followed by agreement, or agreement followed by an orientation, respectively. Appending one symbol sends these counts to $(B,A+B+D,B,C)$. At length two each count is two, and the pair of agreement symbols has no legal extension. At lengths three, four, and five the totals are $12,24,44$. Apply the update four times to see that the fourth vector is the sum of the first three updated vectors. Summing its coordinates gives the recurrence. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-triple-kernel-word-count lean="D5/S3/Quantum/Entanglement/Marginals/TripleDeletionCountComparison.triple_kernel_exact" title="Under the ban on triples, the kernel dimension is less than twice the word count"}
On an open chain of length $n\ge3$ with no three consecutive ones, let $a_n$ count the allowed words. Let $d_n$ be the complex dimension of the supported matrices with zero partial trace over each site. Write $T_j$ for the Tribonacci sequence starting with $0,1,1$. Then

$$
a_n=T_{n+2},\qquad
d_n=4(T_n+T_{n-1})<2a_n.
$$

Equivalently, $d_n=4(a_{n-2}+a_{n-3})$.
:::

::: {.proof}
Split the allowed words according to their initial block $0$, $10$, or $110$. Removing the block leaves an arbitrary allowed word of the shorter length. This gives the three-term recurrence. At lengths zero, one, and two the word counts are $1,2,4$, so $a_n=T_{n+2}$. The quantity $4(T_n+T_{n-1})$ takes the initial values $12,24,44$ at lengths three, four, and five. It satisfies the same recurrence as the dimensions in [@thm-ch39-fib-forbidden-triple-dimension], so the two sequences agree at every length $n\ge3$.

Since $T_{n+1}=T_n+T_{n-1}+T_{n-2}$ and $T_{n-2}>0$, the sum $T_n+T_{n-1}$ is less than $T_{n+1}$. Substituting $a_n=T_{n+1}+T_n+T_{n-1}$ yields the strict inequality. The full proof is checked by the Lean kernel.
:::

The gap is exactly $2T_{n-2}$, which is positive for $n\ge 3$. At length two all four words are legal because there is no three-site window. Either site can carry any of the three pattern symbols, giving kernel dimension $3^2=9$, already greater than twice the legal word count.

::: {.theorem #thm-ch39-fib-forbidden-four-recurrence lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_four_recurrence" title="The deletion-kernel recurrence with a ban on runs of four"}
On an open chain of length $n$, forbid four consecutive ones. Let $d_n$ be the dimension of the complex matrices supported on legal words whose partial trace over any one site vanishes. For $n\ge4$,

$$
d_{n+6}+d_{n+1}+d_n
=d_{n+5}+2d_{n+4}+2d_{n+3}+2d_{n+2}.
$$
:::

::: {.proof}
Every four-site window must contain both directions of disagreement. The first window determines the two distances from the current end and identifies the more recent direction. Each subsequent symbol determines a unique legal transition, and each transition path determines a unique pattern. For the six distance pairs below, the sum of the six-step, one-step, and identity operators equals the five-step operator plus two copies each of the four-step, three-step, and two-step operators. Summing over the first windows yields the recurrence. The full proof is checked by the Lean kernel.
:::

The initial values follow by counting first windows. For distances $a<b$, choose the more recent direction in two ways. Between the two occurrences, each site can carry the more recent direction or agreement. Earlier sites admit all three symbols. The six distance pairs give counts $18,12,8,6,4,2$. Summing along the transitions gives $d_4,\ldots,d_9$ as $50,122,290,674,1562,3658$.

::: {.theorem #thm-ch39-fib-forbidden-window-growth lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_lower" title="Growth of the deletion kernel for windows of length four or more"}
On an open chain of length $n=k+2$, forbid $K\ge4$ consecutive ones. Let $d_{n,K}$ be the complex dimension of the supported matrices with zero partial trace over each site. Then

$$
d_{n,K}\ge (100/43)^k.
$$
:::

::: {.proof}
Start with two opposite orientations. Append symbols so that the last four sites still contain both orientations. Record how far back each orientation last appeared, with the more recent one first. The six possible age pairs are $(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)$, with weights $100,75,43,58,32,18$. Each step appends agreement or one of the two orientations. If an orientation's age would reach four, that orientation must be appended. For each state, the weights of its allowed successors sum to at least $100/43$ times its own weight.

The initial weight and maximum single weight are both $100$. After appending $k$ symbols the total weight of all paths is at least $100(100/43)^k$, so there are at least $(100/43)^k$ distinct patterns. Every window of length $K\ge4$ contains a four-site window, so all these patterns contribute to $d_{n,K}$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-forbidden-window-growth-relative lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_to_allowedCount" title="Growth relative to the allowed word count"}
On the same chain, write $a_{n,K}$ for the number of allowed words, which is the dimension of the allowed Hilbert space. Then

$$
\frac{d_{n,K}}{a_{n,K}}\ge\frac{(50/43)^k}{4}.
$$
:::

::: {.proof}
There are at most $2^{k+2}$ allowed words, including the all-zero word. Divide the previous lower bound by this upper bound on the positive denominator. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-oriented-difference lean="D5/S1/Words/AdmissibleWords/FIBPathPairBounds.sharp_hard_core_difference" title="The sharp endpoint difference from a fixed site"}
Number sites from zero and let $X_k$ indicate occupancy in a word with no adjacent ones. Put $Y_k=X_k$ at even sites and $Y_k=1-X_k$ at odd sites, and write $q_k=\Pr(Y_k=1)$. Prescribe site occupancies in $[0,1]$ with adjacent sums at most one. For any fixed site $i$, the sharp bound at each $j\ge i$ is

$$
\Pr(Y_i=1,\ Y_j=0)\ \le\
\min\!\left(q_i,\ 1-q_j,\ \sum_{k=i}^{j-1}(q_k-q_{k+1})_+\right).
$$

One law on legal words attains all these bounds from $i$ at once. [Finite-word construction](lean:D5/S1/Words/AdmissibleWords/FIBPathPairBounds.word_attainment)
:::

::: {.proof}
Represent any law on the finite set of legal words by partitioning $[0,1)$ into intervals of the corresponding word probabilities. Let $A_k$ be the event $Y_k=1$. Each neighboring pair of events is nested because neighboring occupied sites are disjoint. Hence $\Pr(A_k\setminus A_{k+1})=(q_k-q_{k+1})_+$. Every sample in $A_i\setminus A_j$ exits the events somewhere between $i$ and $j$. The union bound gives the sum in the displayed formula, and the two endpoint probabilities give the other bounds.

For attainment, divide the unit interval at $q_i$. At site $j$, take initial intervals in the two parts with lengths $u_j$ and $q_j-u_j$. For $j\ge i$, set $u_j=\max(0,q_i+q_j-1,q_i-\sum_{k=i}^{j-1}(q_k-q_{k+1})_+)$. Before $i$, use $u_j=\min(q_i,q_j)$. Both lengths increase when $q_j$ increases and decrease when it decreases, in the weak sense. Thus the resulting $A_j$ nest in the required direction at every adjacent pair. At site $i$ the first interval has length $q_i$ and the second is empty, so $\Pr(A_i\setminus A_j)=q_i-u_j$.
:::

The fixed starting site matters. With five sites of occupancies $(1/2,0,1/2,0,1/2)$, taking equality for all three pairs of even sites would make three half-mass events pairwise disjoint up to null sets, exceeding the available unit mass.

Close the hard-core chain into a four-cycle and call the two sides $s,t$ and $x,y$. Give $s,t,y$ occupancy $1/2$ and $x$ occupancy zero. Along $s,x,t$, the site $x$ is empty with probability one, so this path alone permits one endpoint to be occupied while the other is empty. Along $s,y,t$, both endpoint occupancy events lie inside the event that $y$ is empty. All three events have probability $1/2$, so they can differ only on a null set. The probability of $s$ occupied and $t$ empty is therefore zero.

::: {.theorem #thm-ch39-fib-graph-oriented-difference lean="D5/S1/Words/AdmissibleWords/NestedEventGraphBounds.sharp_difference" title="A sharp bound on event differences on a graph"}
Fix a vertex $s$ that can reach every vertex of a simple graph. Let $A_v$ be measurable events in the half-open unit interval with prescribed probabilities $q_v\in[0,1]$. Require the two events on each edge to be comparable by inclusion. Let $d(s,v)$ be the infimum over walks from $s$ to $v$ of the sum of decreases $(q_u-q_w)_+$ over the steps. Then

$$
\Pr(A_s\setminus A_v)\le \min(q_s,1-q_v,d(s,v)).
$$

One event family attains every bound simultaneously. In this family the event of smaller probability on an edge is contained in the event of larger probability. Events with equal probabilities on an edge coincide.
:::

::: {.proof}
Along any finite walk, every sample in $A_s\setminus A_v$ must leave the current event at least once. Adjacent events are comparable by inclusion, so the probability of leaving at a step is precisely the decrease in probability. Taking the infimum over walks gives the third term. The first two come from the endpoint probabilities.

For attainment, split the unit interval at $q_s$. Use an initial interval in each piece, with lengths $u_v$ and $q_v-u_v$, where $u_v=\max(0,q_s+q_v-1,q_s-d(s,v))$. For neighbors $a,b$ with $q_a\le q_b$, the step from $a$ to $b$ costs zero and the reverse step costs $q_b-q_a$. Both interval lengths are therefore nondecreasing from $a$ to $b$. The source event is exactly the first piece, so its mass outside $A_v$ is $q_s-u_v$. The full proof is checked by the Lean kernel.
:::

For a hard-core model on a bipartite graph, complement the occupancy events on one side. Disjoint neighbors then become nested neighbors. Complementing $x,y$ in the four-cycle gives probability profiles $(1/2,1,1/2)$ and $(1/2,1/2,1/2)$ along the two walks from $s$ to $t$. Their total decreases are $1/2$ and zero. The second walk forces the endpoint difference to have probability zero.

With two sources, the individual upper bounds can be coupled. The following five-vertex graph gives the full joint range of two event differences.

::: {.theorem #thm-ch39-fib-two-source-capacity lean="D5/S1/Words/AdmissibleWords/FIBTwoSourceObstruction.five_vertex_range" title="The joint range of two event differences"}
Let $q,c,a,b$ be real. There exist five measurable events $S,H,K,T,W$ in the half-open unit interval with probabilities $q,q+c,q+c,q,q$, inclusions $S,W\subseteq H\cap K$ and $T\subseteq K$, and differences $\Pr(W\setminus S)=a$ and $\Pr(T\setminus H)=b$ if and only if
$$
0\le a\le q,\qquad 0\le b\le\min(q,1-q-c),\qquad a+b\le c.
$$
:::

::: {.proof}
The difference $W\setminus S$ lies inside $H$. The difference $T\setminus H$ lies outside $H$. Both lie in $K\setminus S$, so their total mass is at most $c$. The first difference is also bounded by the mass of $W$, and the second by both the mass of $T$ and the mass outside $H$.

The inequalities also give $q,c\ge0$ and $q+c\le1$. To attain $(a,b)$, take $S=[0,q)$ and $K=[0,q+c)$. Reserve the last interval of length $b$ in $K$ for $T\setminus H$, and use an interval of the same length just to the right of $K$ to complete $H$. The rest of $T$ is the initial interval of length $q-b$ in $S$. For $W$, take the initial interval of length $q-a$ in $S$ and the interval of length $a$ immediately after $S$. The inequality $a+b\le c$ puts the latter interval inside both $H$ and $K$. The full proof is checked by the Lean kernel.
:::

With $q=1/2$ and $c=1/6$, the entire feasible region is the first-quadrant triangle $a+b\le1/6$. Each coordinate can attain $1/6$ on its own. Complement the events at $H,K$ to obtain the hard-core occupancy model on the bipartite graph. Three sites have occupancy $1/2$ and two have occupancy $1/3$. The endpoint occupancies sum to $5/6$ on each edge, and the two sources still draw on the same probability budget.

Cycles give another family of joint constraints on a graph. Add a reference bit $O$ fixed at zero and write $d_{uv}$ for the probability that two sites disagree. Then $d_{Ov}$ equals the marginal at $v$. Mark an odd number of edges on a closed walk and replace $d_{uv}$ by $1-d_{uv}$ on those edges. The resulting sum is at least one. Every binary outcome violates at least one of the parity requirements along the walk, so every common law satisfies this inequality.

::: {.theorem #thm-ch39-fib-cycle-completion lean="D5/S1/Words/AdmissibleWords/FIBCycleRelaxation.cycle_completion_iff" title="The exact range allowed by cycle inequalities"}
Let $q,c\ge0$ and $q+c\le1$. In the five-vertex notation, prescribe distances $q$ from the reference to $S,T,W$ and $q+c$ to $H,K$. Give the five inclusion edges distance $c$, and prescribe $d_{WS}=2a$ and $d_{TH}=c+2b$. These readings can be completed to a symmetric distance table satisfying every odd-subset cycle inequality exactly when

$$
0\le a\le\min(q,c),\qquad
0\le b\le\min(q,c,1-q-c).
$$
:::

::: {.proof}
On $O\to W\to S\to O$, marking only the last edge or only the middle edge gives $a\ge0$ or $a\le q$, respectively. Marking only the return edge of $W\to H\to S\to W$ gives $a\le c$. The same choices on $O\to T\to H\to O$ give $b\ge0$ and $b\le q$, and marking all three edges gives $b\le1-q-c$. Marking just the return edge of $T\to K\to S\to H\to T$ gives $b\le c$.

For sufficiency, set $d_{HK}=2b$ and $d_{ST}=d_{WT}=\max(a,2b)$. The resulting distances satisfy the triangle inequalities and each triangle has perimeter at most two. Use two copies of every vertex, with distance $d_{uv}$ within a copy and $1-d_{uv}$ across copies. The triangle and perimeter bounds give the triangle inequalities on the two copies together. Switching copies at the marked edges brings the walk to the other copy of its starting vertex. The copies are at distance one, so every such walk costs at least one. The full proof is checked by the Lean kernel.
:::

For $q=1/2,c=1/6$, the cycle checks admit the entire square $[0,1/6]^2$. The exact region of common laws also requires $a+b\le1/6$. In distance coordinates, this additional condition comes from adding the pentagonal cut inequality to the triangle inequality $d_{HT}\le d_{HK}+d_{KT}$ and eliminating the unspecified $d_{HK}$. [Avis, Imai and Ito, Definition 6 and Theorem 4](https://arxiv.org/abs/math/0601375)

The same shared capacity applies when the five marginal probabilities differ. Each event difference has its own interval, and their sum is still limited by the mass of $K$ outside $S$.

::: {.theorem #thm-ch39-fib-unequal-joint-range lean="D5/S1/Words/AdmissibleWords/FIBUnequalMarginals.joint_range" title="The exact joint range at five prescribed marginals"}
Require measurable events $S,H,K,T,W$ in the half-open unit interval to have probabilities $s,h,k,t,w$, with $S,W\subseteq H\cap K$ and $T\subseteq K$. Prescribe $a=\Pr(W\setminus S)$ and $b=\Pr(T\setminus H)$. Such events exist if and only if

$$
\begin{aligned}
&k\le1,\qquad t\le k,\\
&\max(0,w-s)\le a\le\min(w,h-s),\\
&\max(0,t-h)\le b\le\min(t,1-h),\qquad a+b\le k-s.
\end{aligned}
$$
:::

::: {.proof}
The difference $W\setminus S$ lies in both $W$ and $H\setminus S$, while $T\setminus H$ lies in both $T$ and the complement of $H$. The lower bounds come from the maximum mass that can remain inside $S$ or $H$. The differences are disjoint subsets of $K\setminus S$, so their total probability is at most $k-s$.

For attainment, take $K=[0,k)$ and put $H\cap K$ in an initial interval of length $r=\max(s+a,t-b,h+k-1)$. The assumptions give $r\le h$ and $r\le k-b$, and leave room after $K$ for the remaining mass $h-r$ of $H$. Fit $S,W$ into the initial interval with overlap of length $w-a$. Put mass $t-b$ of $T$ inside the initial interval and the remaining length $b$ immediately after it. The full proof is checked by the Lean kernel.
:::

In the `trureturing` direct-encoder model, fix integers $N \ge 2$ and $K \ge 2$, and partition $\{0, 1, \dots, N\}$ by primality into the nonprime logical page ($b = \mathrm{false}$, dimension $M_0 > 0$) and the prime logical page ($b = \mathrm{true}$, dimension $M_1 > 0$). Let $C_{m, b}$ denote the set of length-$m$ admissible $1^K$-free words with first bit $b$, of cardinality $c_{m, b} = |C_{m, b}|$; for each threshold $0 \le s < K$, define the cumulative low-tail left row count and compatible right neighborhood count on page $1$ by

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

and set the combinatorial page-rank caps

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

An isometric encoding matrix $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ paired with left-register page density states $\sigma_0, \sigma_1$ satisfies `directContract` if: (i) $J^* J = I$; (ii) physical first-bit page projectors on both $X$ and $Y$ intertwine the logical page projectors $\Pi_b$, with $\sigma_b$ supported in $C_{m_X, b}$; (iii) for **every** logical operator $A$, $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$; and (iv) every concatenated pair $(x, y)$ violating the $1^K$-free law has zero encoded amplitude $(J\psi)(x, y) = 0$ for every logical input $\psi$. Under this contract, the attainable Schmidt ranks and von Neumann entropies are characterized completely:

- [O.1.1 Direct-encoder ranks and entanglement entropy](ch39-s05-s07-s01-rank-and-entropy.md)
- [O.1.2 Local parent Hamiltonians and heat-bath chains](ch39-s05-s07-s02-parent-and-heatbath.md)
- [O.1.3 A uniform gap at fixed forbidden-word length](ch39-s05-s07-s03-uniform-gap.md)
