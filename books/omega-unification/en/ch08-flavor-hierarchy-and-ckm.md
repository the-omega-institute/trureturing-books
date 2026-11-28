# Chapter 8 Cyclic Symmetry Breaking, Yukawa Hierarchy Obstructions, and Quark Mixing Reconstructions {#sec-ch08}

> "The symmetry that marshals three generations into neat ranks must die before masses and mixings can be born—yet smashing it carelessly only sends one headlong into wall after wall of exact no-go theorems."

If [Chapter 7](ch07-chiral-three-generations.md) was the triumphant overture of the 19-point Behrend shell—where the coordinate 3-cycle locks three light modes of every hypercharge into tidy symmetry—this chapter delivers the harsh inversion of the first half of Question 3: **where do fermion mass hierarchies and quark mixing actually come from?**

Nature's flavor spectrum is anything but gentle. At $1\;\mathrm{TeV}$, the top-to-bottom mass ratio exceeds $40$, the charm-to-top ratio sinks to $0.00361$, the up-quark to charged-lepton norm ratio exceeds $84.98$, and the CKM matrix $V_{\mathrm{CKM}}$ sits neither at the identity nor in a real-phase corner. Feeding those unyielding experimental numbers back into the 19-point shell triggers a ruthless elimination round: unbroken $\mathbb{Z}_3$ symmetry traps CKM as a permutation matrix; single light-Higgs local vertices, arbitrary site-density potentials, seven-orbit nonnegative weights, and one-leg transport vertices fall one by one to interval certificates; and three-leg eight-coefficient transport—while capable of fitting all nine charged-fermion masses and full CKM on a single zero—triggers catastrophic heavy-block couplings, vacuum quartic-trace explosions, and a three-zero incompatibility wall.

Out of that cleared terrain rise the genuine positive reconstructions: the six-triangle electroweak-singlet phase, the 28-winding mirror triangle, the two-boundary-site five-pulse protocol, and the finite rational response $(I + T^{16})^{-1}$ matching seven zeros to $10^{-11}$. Anchoring the whole chapter are two Lean-frozen theorems—rational Cayley orthogonality and Gram unitary extension—which frame unitary folding dimension floors, four-step rational Newton folding, and the remarkable rigidity of fixed matrices across multiple zeros.

## 8.1 Exact Cyclic-Symmetry Obstructions and Quantitative Breaking Floors {#sec-ch08-cyclic-obstruction}

Before testing any specific Yukawa mechanism, we write down the exact geometric law governing the shell's cyclic symmetry.

::: {.definition #def-ou-ch08-cyclic-rotation title="19-Point Coordinate Cyclic Shift, Six Three-Point Orbits, and Hilbert-Schmidt Commutator Norm"}
Define the coordinate cyclic shift $P : (x, y, z) \mapsto (y, z, x)$ on the 19-point Behrend shell. It fixes the pole $(17, 17, 17)$ uniquely and partitions the remaining eighteen vertices into **six disjoint three-point orbits**. On the three-dimensional left-handed quark generation space, let the phase-dressed order-3 shift operator act by

$$
T e_i = z_i e_{i + 1 \bmod 3}, \qquad |z_i| = 1 \quad (i = 0, 1, 2),
$$

so that $T^3 = (z_0 z_1 z_2) I$, whose three eigenvalues are the three distinct cube roots of a single unimodular phase. For any $3 \times 3$ complex matrix $X$, define the cyclic pinching projection

$$
\mathcal{E}(X) := \frac{1}{3}\bigl(X + T X T^* + T^2 X T^{*2}\bigr).
$$

In an eigenbasis of $T$, $\mathcal{E}(X)$ extracts the diagonal entries of $X$; since the chord distance between any two distinct cube roots of unity equals $\sqrt{3}$, the Hilbert-Schmidt commutator norm satisfies the exact identity

$$
\|[T, X]\|_{\mathrm{HS}} = \sqrt{3}\,\|X - \mathcal{E}(X)\|_{\mathrm{HS}}.
$$

:::

Two structural obstructions drop out immediately ([cyclic-rotation and mixing note](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E4%B8%89%E4%BB%A3%E8%BD%AE%E6%8D%A2%E4%B8%8E%E8%B4%A8%E5%AD%90%E9%80%89%E6%8B%A9%E5%AE%9A%E5%88%99.md)):

1. **Unbroken rotation locks CKM to permutation type**: if a single Higgs doublet transforms by a phase under $T$ and both up- and down-type Yukawa vertices respect $T$, then the Hermitian squared-mass matrices $H_u = Y_u Y_u^*$ and $H_d = Y_d Y_d^*$ acting on the shared left-handed space both commute with $T$ (right-handed flavor rotations and Higgs phases cancel identically). Both matrices therefore diagonalize simultaneously along the three eigenlines of $T$. For non-degenerate masses, **CKM is forced to be a permutation-and-phase matrix for every choice of edge phases $z_i$**.
2. **Connected-graph universal-phase theorem**: more generally, whenever up and down quark masses are non-degenerate, any exact left unitary symmetry preserving both $H_u$ and $H_d$ is diagonal in each mass basis, say with phases $d_i, e_j$, forcing $d_i V_{ij} = V_{ij} e_j$. Whenever the bipartite graph of nonzero CKM entries $V_{ij}$ is connected, all phases coincide—so **every exact left flavor symmetry acting on mixed light quarks collapses to a generation-universal phase**. In particular, a continuous $SU(2)$ clock preserving both fixed Yukawas must act trivially on light quarks, since $SU(2)$ has only the trivial continuous one-dimensional character.

A finite projection experiment compares the phases of the three generations directly. At each relative clock phase, project onto the three edge zero modes of the incidence matrix for the twelve clock edges of the nineteen-site shell. Set the clocks successively at positive zeta zeros 2,346,312 through 2,346,534, then close the path along the short arc back to the initial phase. Interval arithmetic gives a phase factor of $-1$ for the projection product in each of the three rotation sectors. This common sign cancels from every relative phase. Sampling the same turn at 29 equally spaced phases starting half a step before zero gives a positive sign in the first sector and negative signs in the other two. The phase spacing thus matters when interpreting an apparent difference between generations. [Interval replay of the edge projections and consecutive zeros](https://github.com/the-omega-institute/trureturing-experiments/blob/f8611fe22351246e440ec46fbd47195c393f3063/experiments/ch39-omega-research/replay/ch39-clock-kernel-geometric-phase.py)

What if the two four-dimensional operators commute with each other before compression to a common three-dimensional hyperplane $W=n^\perp$? In a joint eigenbasis of the Hermitian operators, rephase each basis vector to make every component of $n$ real. Both operators are real diagonal in this basis, and $W$ has a real orthonormal basis. Both compressed mass eigenbases can therefore be chosen real. For nondegenerate masses the signed mixing invariant $J=\operatorname{Im}(V_{11}V_{22}\overline{V_{12}V_{21}})$ vanishes. The argument works for any complex hyperplane.

How much mixing can commuting parent operators produce on a larger set of sites? For any two positive definite three-generation mass matrices $A,B$, five sites suffice to realize them as compressions of two positive diagonal matrices to the same light space. Subtract a small positive scalar from each target, call the remainders $A',B'$, and put $S=A'+B'$ and $L=\|S\|_{\mathrm{op}}$. After conjugation by $S^{-1/2}$, the two matrices sum to the identity and share an eigenbasis. Pulling the three eigenvector coordinates back by $S^{1/2}/\sqrt L$ gives three site amplitudes whose squared norms sum to the quadratic form of $S/L$. Its largest eigenvalue is one, so the missing norm $I-S/L$ has rank at most two. Two more sites supply it. Adding back the scalars on every site gives the original targets. Together with the four-site hyperplane obstruction, this makes five the minimum for each target with nonzero $J$. If $A+B\le I$, both sets of parent values can lie strictly between zero and one.

**The second direction of light–heavy coupling (hand derivation).** Even when enough sites are available, the coupling from the light space to the heavy space limits the CP mixing produced by compression. Let $P$ project orthogonally onto the light space $W$, put $Q=I-P$, and write $X=Q\widehat A|_W$ and $Y=Q\widehat B|_W$ for the light-to-heavy blocks of the commuting parents $\widehat A,\widehat B$. Concatenate the two blocks as $L=(X\ \ Y)$, with second singular value $\sigma_2(L)$, taken as zero when its rank is below two. Commutativity of the parents gives $C=[A,B]=Y^*X-X^*Y$ and

$$
\sigma_{\min}(C)\le \sigma_2(L)^2.
$$

With a zero-dimensional heavy space, $C=0$. Otherwise split the output of each block along the first left singular direction of $L$ and its orthogonal complement. The first direction contributes a matrix of rank at most two to $C$, so that contribution has a null vector in the three-dimensional light space. Write $X_\perp,Y_\perp$ for the remaining blocks. On a unit vector $v$, their contribution to the expectation of $-iC$ is the difference of $\|(X_\perp+iY_\perp)v\|^2/2$ and $\|(X_\perp-iY_\perp)v\|^2/2$. Both terms lie in $[0,\sigma_2(L)^2]$, so the remainder has operator norm at most $\sigma_2(L)^2$. Apply this bound to a unit null vector of the first contribution to obtain the inequality.

For two nondegenerate squared-mass spectra, let $\Delta_A,\Delta_B$ denote the products of their three positive gaps. Using $|\det C|=2\Delta_A\Delta_B|J|$ gives $2\Delta_A\Delta_B|J|\le \sigma_1(C)\sigma_2(C)\sigma_2(L)^2$. Thus even a larger heavy space gives $J=0$ when both couplings reach only the same heavy line. In a five-site example, $|J|$ and $\sigma_2(L)^2$ have the same order while the spectral gaps stay bounded away from zero. [Jarlskog's commutator invariant](https://doi.org/10.1103/PhysRevLett.55.1039) · [Reproducible five-site example](https://github.com/the-omega-institute/trureturing-books/issues/1823#issuecomment-7238122058)

A site rotation introduces a further choice about the light space. Suppose the rotation cycles three sites and fixes the others. Require the parents to be diagonal in the site basis and constant on the cycle. Five sites leave only two fixed sites. Their projections have a common orthogonal complement containing a shared mass eigenline. Six sites suffice. The three fixed sites carry the coordinates from the diagonalization, and the cycle carries the two rows that supply the missing norm. If the light space must also be invariant, nonzero $J$ forces the rotation to act as a scalar on it. Both nontrivial characters occupy only one dimension, so all three generations must lie in the trivial character space. The fixed sites and the uniform vector on the cycle give this space dimension $N-2$. Five effective coordinates now require seven physical sites, and seven suffice. In each construction the light space and the parent values are chosen for the specified target matrices. [Common light-space construction and site lower bounds](https://github.com/the-omega-institute/trureturing-experiments/blob/ba92cd4b7b42fa78490a36e7a64d1411c9cf555c/experiments/ch39-omega-research/replay/ch39-commuting-flavor-sites.md)

How much phase freedom remains if each four-dimensional operator commutes with the same rotation? Take one fixed site and one three-site orbit. In a character basis the rotation is $P=\operatorname{diag}(1,\omega,\bar\omega,1)$, with $\omega=e^{2\pi i/3}$. Choose $n=(e_4+e_2+e_3)/\sqrt3$. Let $B$ swap $e_1,e_4$, fix $e_2$, and send $e_3$ to $-e_3$. Take $A_u=2I+B$ and $A_d=D_t A_u D_t^*$ with $D_t=\operatorname{diag}(e^{it},1,1,1)$. Both are positive definite and commute with $P$. Since $D_t$ fixes $n$, their compressions to the same $W$ have the same spectrum. Indeed $B$ exchanges the orthogonal unit vectors $n,Bn$ and has one eigenline of each sign left on their orthogonal complement. Thus $Bn$ spans the middle eigenline of the compression of $B$ to $W$, and both squared-mass triples are $(1,2,3)$.

The weight of $e_1$ on the middle eigenline is $|\langle e_1,Bn\rangle|^2=1/3$. Since $\langle e_1,Be_1\rangle=0$, its weights on the two other lines are also $1/3$ each. In the up basis ordered by increasing mass, choose phases so that the three coordinates of $e_1$ are equal. Its image basis under $D_t$ diagonalizes the down sector, giving $V_{ij}=\delta_{ij}+(e^{it}-1)/3$. At $t=0$ one has $V=I$. At $t=\pm2\pi/3$ all nine squared moduli equal $1/3$, while $J=\pm\sqrt3/18$. In this four-site example the masses, rotation, and compression space are fixed as the relative phase varies. The rotation carries $W$ to a different hyperplane. A physical shell model still needs a law for the light space and the relative phase.

If both mass bases measure the same state, which up-sector probabilities $p$ and down-sector probabilities $q$ can occur together? Fix any phase $t$ in the four-site example. Factor the density matrix as $\rho=XX^*$ and write $x_j$ for the rows of $X$, so $p_j=\|x_j\|^2$. In the down basis, $V^*X$ translates all three rows by the same vector $h=(e^{-it}-1)\sum_j x_j/3$. Thus $q_j=\|x_j+h\|^2$. The following hand derivation reduces the search to the length $r=\|h\|$.

If $e^{it}=1$, exactly the pairs $p=q$ are attainable, and the amplitudes $\sqrt{p_j}$ give a pure state. At every other phase, $r=0$ means that the three rows sum to zero. This is possible exactly when $p=q$ and the three lengths $\sqrt{p_j}$ form a possibly degenerate triangle. Its oriented sides give pure-state amplitudes. For $r>0$, put $u=h/r$ and resolve each row as $x_j=d_j u+v_j$ using the real inner product $\operatorname{Re}\langle\cdot,\cdot\rangle$, with $v_j$ perpendicular to $u$. Write $K$ for the length of the transverse sum. Subtracting the two squared norms and summing the rows gives
$$
d_j=\frac{q_j-p_j-r^2}{2r},\qquad
\ell_j=\sqrt{p_j-d_j^2},\qquad
K=\frac{3r}{2}\left|\cot\frac{t}{2}\right|.
$$
Consider only $r$ for which all three radicands are nonnegative. Normalization gives $\sum_j d_j=-3r/2$. Since $\sum_j x_j=3ru/(e^{-it}-1)$, the transverse vectors $v_j$ have lengths $\ell_j$ and must sum to $(3r/2)\cot(t/2)\,iu$, of length $K$.

A positive $r$ is therefore feasible exactly when the largest of $\ell_0,\ell_1,\ell_2,K$ is at most half their sum. Necessity follows from the triangle inequality. Conversely, four nonnegative lengths satisfying this bound close in a plane. Choose a real plane in $\mathbb C^2$ perpendicular to $u$ and containing $iu$. Rotate the closed figure so that its first three sides sum to the required vector. Taking these sides as $v_j$ and adding back $d_j u$ constructs a shared state of rank at most two. For a pure state the transverse space is the line $\mathbb R\,iu$, so the additional necessary and sufficient condition at this $r$ is $|\sum_j\varepsilon_j\ell_j|=K$ for some signs $\varepsilon_j\in\{-1,1\}$. A feasible pair has minimum rank two if every feasible $r$ rules out a pure state. [Planar closure for nonnegative lengths](lean:D5/S3/Geometry/Polygons/BalancedPlanarClosure.result)

How can we find all positive pure-state radii? Set $\lambda=r^2$ and scale the four squared lengths by $4\lambda$. This gives $D_j=4\lambda p_j-(q_j-p_j-\lambda)^2$ for $0\le j<3$ and $D_3=9\lambda^2\cot^2(t/2)$. With $A=D_0+D_1-D_2-D_3$, $B=D_0D_1$ and $C=D_2D_3$, solve the sextic
$$
\frac{(A^2-4B-4C)^2-64BC}{\lambda^2}=0 .
$$
The numerator is the product of the eight signed sums $\sqrt{D_0}\pm\sqrt{D_1}\pm\sqrt{D_2}\pm\sqrt{D_3}$. The identity $\sum_j(q_j-p_j)=0$ gives $A(0)^2=4B(0)$, and $C$ contains a factor of $\lambda^2$, so the denominator cancels. Every positive root with all $D_j\ge0$ gives a pure-state radius $r=\sqrt{\lambda}$.

If the pure-state test fails, only one radius needs testing for a mixed state. Put $U=\min_j(\sqrt{p_j}+\sqrt{q_j})$. Each radicand requires $|\sqrt{p_j}-\sqrt{q_j}|\le r\le\sqrt{p_j}+\sqrt{q_j}$. If any positive radius is feasible, there is a largest one because the conditions are closed at a positive endpoint. If this maximum lies below $U$, a small increase stays within all three intervals. Hence one side must equal the sum of the other three, since strict inequalities would persist under that increase. Such collinear sides already give a pure state. Once pure states have been excluded, the minimum rank is therefore two exactly when $U>0$ and the four lengths pass the test at $U$. All remaining pairs are infeasible. [Sextic, endpoint test and exact examples](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7235260192)

Which phases can force a mixed preparation? At $t\equiv\pi\pmod{2\pi}$, $K=0$. At a positive endpoint $U$, one also has $\ell_j=0$ for at least one row. Closure forces the remaining two lengths to agree, so these sides too can close on a line. Every feasible pair at this phase thus admits a pure state. Every phase with $\sin t\ne0$ can force rank two. Take $\rho=\operatorname{diag}(1/2,1/2,0)$ and write $b=(e^{it}-1)/3$. Then $q_2=|b|^2$ and $q_0=q_1=(1-|b|^2)/2$. Positivity forces the third row and column to vanish, leaving only $z=\rho_{01}$ and its conjugate undetermined. Preserving $q_2$ forces $\operatorname{Re}z=0$, and preserving $q_0$ requires $\operatorname{Re}((b+|b|^2)z)=0$. Since $\operatorname{Im} b=\sin(t)/3\ne0$, this gives $z=0$. For instance, at $t=\pi/2$, the pair with $q=(7,7,4)/18$ uniquely determines this mixed state.

What if the down-sector mass basis rotates while the preparation stays fixed? Keep the up basis of the four-site example and write $\mathbf1=(1,1,1)^T$. Suppose we know its probability triple $p$ and the down-sector triples $q(t_1),q(t_2)$ at two calibrated phases, with $0,t_1,t_2$ distinct modulo $2\pi$. For a hand derivation in this finite model, let $\lambda=\mathbf1^*\rho\mathbf1/3$ be the probability along $\mathbf1/\sqrt3$ and put $z=\rho\mathbf1-\lambda\mathbf1$. Expanding the diagonal of $V(t)^*\rho V(t)$ and using $|e^{it}-1|^2=2(1-\cos t)$ gives

$$
q_j(t)-p_j=\frac{2}{3}\operatorname{Re}\bigl((e^{it}-1)z_j\bigr).
$$

The chords from $1$ to $e^{it_1}$ and $e^{it_2}$ are noncollinear. The two readings in each channel therefore determine $\operatorname{Re}z_j,\operatorname{Im}z_j$ uniquely. Normalization of the three triples gives $\sum_j z_j=0$. This predicts the readings at every other phase. Positivity decides whether a common preparation can produce them.

If all three exposures carry error, which phases give the most stable reading of one channel? Count the reference as one of three equally weighted exposures. Put $x=(\operatorname{Re}z_j,\operatorname{Im}z_j)^T$ and give $U$ rows $u_k^T=(\cos t_k,-\sin t_k)$. The readings form a vector $y=a\mathbf1+(2/3)Ux+e$ with unknown $a=p_j-(2/3)\operatorname{Re}z_j$ and $\|e\|_2\le\epsilon$. Subtracting their mean applies $H=I-\mathbf1\mathbf1^T/3$. In this affine model the weakest singular direction of $HU$ sets the maximum reconstruction error at $3\epsilon/(2\sigma_{\min}(HU))$. Noise along the corresponding left singular vector attains it.

Both orthogonal directions must therefore be easy to measure. The squared singular values sum to $3-\|\sum_k u_k\|^2/3\le3$, so the smaller square is at most $3/2$. Equality requires the three unit vectors to sum to zero, giving pairwise inner products $-1/2$. Conversely, at $0,\pm2\pi/3$ the columns of $U$ have zero mean, are orthogonal, and each has squared norm $3/2$. The reconstruction reduces to $U^Ty$ with worst-case error $\sqrt{3/2}\,\epsilon$. With the reference phase fixed, these two phases in either order uniquely attain the optimal gain. [Shared-reference error and a positive-state equality example](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238249917)

If $\lambda=0$, positivity forces $\rho\mathbf1=0$. This branch is feasible exactly when $z=0$ and the three lengths $\sqrt{p_j}$ form a possibly degenerate triangle. Indeed the rows of a factor $\rho=XX^*$ must sum to zero, and conversely the three oriented sides give pure-state amplitudes. For $0<\lambda\le1$, put $w=z+\lambda\mathbf1$ and $d_j=3\lambda p_j-|w_j|^2$. This value of $\lambda$ is feasible exactly when all three $d_j$ are nonnegative and the lengths $\sqrt{d_j}$ form a triangle. For any witness, Cauchy–Schwarz applied to $\rho^{1/2}\mathbf1$ gives $R=3\lambda\rho-ww^*\succeq0$. Also $R\mathbf1=0$, so its Gram vectors have lengths $\sqrt{d_j}$ and sum to zero. Conversely, choose complex sides $v_j$ that close. Then $\rho=(ww^*+vv^*)/(3\lambda)$ has the required diagonal and row sums.

The search over $0<\lambda\le1$ thus requires only the three inequalities $d_j\ge0$ and the polynomial form of the triangle test, $(d_2-d_0-d_1)^2\le4d_0d_1$. Every feasible triple of readouts has a witness of rank at most two. On the positive branch, a pure state exists exactly when all $d_j$ vanish at some feasible $\lambda$, since rank one gives equality in Cauchy–Schwarz. [Frozen planar closure theorem](lean:D5/S3/Geometry/Polygons/BalancedPlanarClosure.result)

For example, take the two Fourier phases $t=\pm2\pi/3$, put $p=(1,1,1)/3$, and prescribe the same $q=(1+2v,1-v,1-v)/3$ at both phases, with $0\le v\le1$. The readout formula gives the real vector $z=(-2v,v,v)/3$. With indices starting at zero, subtracting row sums gives $v=\operatorname{Re}(\rho_{12}-\rho_{02})\le2/3$ because the two-by-two principal minors require $|\rho_{ij}|\le1/3$. The states $\mathbf1/\sqrt3$ and $(-1,1,1)^T/\sqrt3$ realize $v=0,2/3$, respectively. Mixing them realizes the entire interval. Every interior point has minimum rank two. For a pure state at $v>0$, the nonzero row-sum vector $\rho\mathbf1$ is real, so the amplitudes can be chosen real. With amplitudes $\pm1/\sqrt3$, the difference above can only be $0,\pm2/3$.

Even all three pairwise tests can pass for an impossible preparation. Take $v=17/25$, so $q=(59,8,8)/75$ at both phases. At either Fourier phase the state diagonal with weights $q$ in the down basis gives uniform up probabilities. The two down bases can also give these readings together. Their first vectors have overlap of modulus $1/\sqrt3$. Rephase them to have positive inner product and normalize their sum. In both bases the first probability is $(1+1/\sqrt3)/2$, and the remaining two are equal by exchange symmetry. This realizes $v=(1+\sqrt3)/4$. Mixing with $I/3$ reaches $17/25$, above the common-preparation limit of $2/3$. [One-variable test and exact matrix checks](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238042900)

When the three readings are compatible, do they identify the preparation? In the same four-site model, put $F_{jk}=\omega^{jk}/\sqrt3$ for $0\le j,k\le2$ and write $B=F^*\rho F$. The first Fourier vector lies along $\mathbf1$, so $F^*V(t)F=\operatorname{diag}(e^{it},1,1)$. Combining the three channels into one complex number gives

$$
\sum_{j=0}^2\omega^j q_j(t)=e^{-it}B_{01}+B_{12}+e^{it}B_{20},\qquad q(0)=p.
$$

Multiplication by $e^{it}$ gives a quadratic in $e^{it}$. Three distinct phases determine its three coefficients. Conversely, the complex number on the left determines each real probability triple because its entries sum to one. The compatible preparations are exactly the matrices $F B F^*$ with $B=C+\operatorname{diag}(x)\succeq0$ and $\sum_j x_j=1$, where the readings fix the off-diagonal entries of the zero-diagonal Hermitian matrix $C$.

Positivity can also determine the missing diagonal. Set $m=\max_{|u_j|=1}(-u^*Cu)$. Remove the overall phase by writing $u=(1,v,w)^T$. At fixed $v$, choose $w$ to minimize the real part of $w(C_{02}+\bar v C_{12})$. This leaves a maximum on one circle.

$$
m=2\max_{|v|=1}\left(\left|C_{02}+\bar v C_{12}\right|-\operatorname{Re}(C_{01}v)\right).
$$

A hand derivation identifies $m$ with the least trace of a positive semidefinite completion of $C$. Adding a large scalar matrix gives a positive definite completion, and positive semidefinite matrices of bounded trace form a bounded set, so a minimizer $B_*$ exists by closedness. At this trace the affine plane of completions misses the positive definite cone, since a positive definite member could be shifted down by a small scalar matrix. Take a nonzero separating functional $\operatorname{tr}(Y\,\cdot)$ with larger values on the cone. Scaling within the cone gives $Y\succeq0$ and $\operatorname{tr}(YB_*)=0$. The plane contains every traceless diagonal direction, so $Y$ has constant diagonal, which we can normalize to one.

Apply the three-dimensional phase Gram maximum theorem to the real linear functional $X\mapsto-\operatorname{Re}\operatorname{tr}(CX)$ on complex correlation matrices. It gives $m\ge-\operatorname{tr}(CY)=\operatorname{tr}B_*$. The reverse inequality follows from $u^*B_*u\ge0$ for every phase vector. [Phase Gram maximum theorem](lean:D5/S3/Quantum/Recovery/CommutingRandomUnitaryRecovery.phase_gram_max)

For $m>1$ there is no common state. At $m=1$, take any maximizing $u$. Every feasible $B$ satisfies $u^*Bu=0$, so positivity forces $Bu=0$ and fixes all three entries $x_j=-\bar u_j(Cu)_j$. For $m<1$, the completion $B_*+(1-m)I/3$ is positive definite. Small perturbations in both traceless diagonal directions preserve the entire record.

For example, uniform readings at every phase give $C=0$ and allow the whole simplex of Fourier-diagonal states, including ranks one, two and three. For a uniquely determined mixed state, take $u=(1,1,-1)^T$ and $B=(I-uu^*/3)/2$. This matrix has rank two and $Bu=0$, so it saturates the uniqueness test. Its three probabilities are $4/9$, $(5+2\sqrt3\sin t)/18$ and $(5-2\sqrt3\sin t)/18$, all strictly positive at every phase. [Completion proof and exact matrix checks](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238251495)

**Recovery with an unknown common phase magnitude (`ARGUED`).** Write $B_{\mathrm{ref}}$ for the rank-two example above. Its record comes from phases $0,\pm\alpha$, with $0<\alpha<\pi$. In fitting the record, assume the two down phases have opposite signs and an unknown common magnitude $\beta\in(0,\pi)$. Denote the complex readout above by $s_B(t)$, so that $s_{B_{\mathrm{ref}}}(t)=1/6+i\sin(t)/3$. The zero reading and the average of the down readings determine the sum of the phase-dependent entries. Their difference determines the other combination. Together they give

$$
(B_{01},B_{12},B_{20})=\frac16(-k,1,k),
\qquad k=\frac{\sin\alpha}{\sin\beta}.
$$

Positivity and $u^*Bu=2(1-k)/3$ require $k\leq1$. Equality forces $Bu=0$, which fixes all three diagonal entries at $1/3$ and gives the unique state $B_{\mathrm{ref}}$. For every allowed $k$, the cyclic product $B_{01}B_{12}B_{20}$ is $-k^2/216$. In a pure state this product equals the product of three populations, which is nonnegative. Thus every compatible state is mixed.

For $0<k<1$ the following completions show that $\sin\beta\geq\sin\alpha$ also suffices.

$$
B(k,h)=\frac16
\begin{pmatrix}
2+2h&-k&k\\
-k&2-h&1\\
k&1&2-h
\end{pmatrix},
\qquad |h|\leq\sqrt{1-k^2}.
$$

The vector $(0,1,1)^T$ has eigenvalue $(3-h)/6$. On its orthogonal complement, $6B(k,h)$ has diagonal entries $2+2h$ and $1-h$, with determinant $2(1-h^2-k^2)$. The two endpoints give distinct rank-two states at trace distance $2\sqrt{1-k^2}/3$. For instance, with $e^{i\alpha}=(4+3i)/5$, the candidate magnitude $\beta=\pi/2$ gives $k=3/5$. The states have trace distance $8/15$ and agree entry by entry in all three probability triples. For every $\alpha$ other than $\pi/2$, an arbitrarily small move toward $\pi/2$ produces this ambiguity. When the actual magnitude is $\pi/2$, the record determines both the magnitude and $B_{\mathrm{ref}}$.


**Phase threshold when the two down readings average to the reference (`ARGUED`).** Let $y$ be the complex reading at zero and let $s_+,s_-$ be the readings at opposite phases, with $(s_++s_-)/2=y$. Put $D=(s_+-s_-)/(2i)$. At a candidate magnitude $\beta\in(0,\pi)$, the cyclic off-diagonal entries are $(-w,y,w)$, where $w=D/(2\sin\beta)$. If $D=0$, the readings are feasible exactly when $|y|\leq1/2$, and any magnitude works. For $D\ne0$, positivity requires $r=|y|<1/2$. Define $\ell=\operatorname{Re}(yD^2)/|D|^2$, so $-r\leq\ell\leq r$.

Swapping Fourier coordinates $1,2$, taking complex conjugates, and flipping the sign of coordinate $0$ preserves the three cyclic entries. Averaging a feasible matrix with its transform allows the diagonal $(1-2t,t,t)$. For $r<t<1/2$, the Schur complement of the lower two-by-two block gives the exact positivity condition

$$
\sin^2\beta\geq\frac{|D|^2}{G(t)},
\qquad
G(t)=\frac{2(1-2t)(t^2-r^2)}{t+\ell}.
$$

If $t=r$ and $\ell>-r$, the coupling vector has a nonzero component in the block's null direction, so this endpoint is infeasible. If $r>0$ and $\ell=-r$, the vector lies in the range of the block. Cancelling $t-r$ gives $G(t)=2(1-2t)(t+r)$, which also applies at this endpoint. At $t=r=0$ the entire lower block vanishes, which excludes $w\ne0$. At $t=1/2$ the zeroth population vanishes, incompatible with $w\ne0$. Thus a magnitude is feasible exactly when $\sin^2\beta\geq |D|^2/G_{\max}$, where $G_{\max}$ is the maximum of the continuous extension of $G$ on $[r,1/2]$. Writing $G(t)/2=(1-2t)[t-\ell-(r^2-\ell^2)/(t+\ell)]$ shows that $G$ is strictly concave in the interior, so the endpoints and at most one interior stationary point determine the maximum.

At equality, a positive definite completion would allow a small increase in $|w|$ with trace one, contradicting the maximum. The minimum-trace criterion above therefore gives a unique compatible state. For $D\ne0$, a pure completion exists exactly when $\ell=-r$ and $|w|^2=(1-2r)r$. The cyclic product and the two-by-two principal minors give necessity. At $t=r$ the lower block has rank one and the generalized Schur complement vanishes, giving sufficiency. At the phase threshold the state is pure precisely when $\ell=-r$ and $r\geq1/6$, since the quadratic $G$ then attains its maximum at $t=r$. The remaining threshold states have rank two. For example, $y=5i/32$ and $D=1/8$ give $t=5/16$, the exact threshold $\sin^2\beta=4/45$, and a unique rank-two completion.

When the first three phases are calibrated, can one extra exposure measure the two remaining Fourier populations independently? Suppose we can apply a calibrated phase mask $D_\theta=\operatorname{diag}(1,e^{i\theta},-1)$ to the same preparation, then apply the mixer $H=V(\pi)$ and measure the three channels in their original order. Put $W=HD_\theta F$. Subtract the known contribution $\operatorname{diag}(WCW^*)$ from the readings. The residual is $Mx$, where $M_{jk}=|W_{jk}|^2$.

Two channels suffice for a hand calculation. Write a population difference uniquely as $\delta=h(2,-1,-1)^T+k(0,1,-1)^T$. With $c=\cos\theta,\ s=\sin\theta$, taking the squared moduli of the entries in the first two rows of $W$ gives

$$
\begin{aligned}
(M\delta)_0 &= (4/9-4c/3)h-(4\sqrt3\,s/27)k,\\
(M\delta)_1 &= -8h/9+(8\sqrt3\,s/27)k.
\end{aligned}
$$

The coefficient matrix has determinant $-32\sqrt3\,cs/81$. Thus the fourth exposure identifies every preparation exactly when $\theta\notin(\pi/2)\mathbb Z$. Taking uniform populations as the origin, solve for $h,k$ and restore $C$. At each exceptional angle the second row is still nonzero, leaving one blind direction. For a sufficiently small nonzero population difference $\delta$ along it, the populations $\mathbf1/3\pm\delta$ give two positive definite states with identical readings in all four exposures. [Exact matrix calculation and blind directions](https://github.com/the-omega-institute/trureturing-books/issues/1649#issuecomment-7238485270)

At the Fourier phases we can also count the pure states that realize a given pair. For $t=2\pi/3$, set $D=\operatorname{diag}(\omega,1,1)$. Direct multiplication gives $iDVD=F$, where $F_{jk}=\omega^{jk}/\sqrt3$ with indices starting at zero. Rephasing the basis vectors preserves probabilities. The negative phase gives $\bar F$, which produces the same attainable pairs upon conjugating the state. For a hand derivation, use $F$ and write the density matrix $\rho$ in the up basis, so $p_j=\rho_{jj}$. The down probabilities $q_k=(F^*\rho F)_{kk}$ can be encoded by one complex number,

$$
s=\sum_{k=0}^2 q_k\omega^{-k}=\rho_{01}+\rho_{12}+\rho_{20},\qquad q_k=\frac{1+2\operatorname{Re}(\omega^k s)}{3}.
$$

For a pure state with the given $p$, the three entries have lengths $a=\sqrt{p_0p_1}$, $b=\sqrt{p_1p_2}$ and $c=\sqrt{p_2p_0}$. Their arguments are the cyclic differences of the three amplitude phases. Thus the pure states give exactly the planar set

$$
\mathcal P_p=\{a e^{i\alpha}+b e^{i\beta}+c e^{-i(\alpha+\beta)}:\alpha,\beta\in\mathbb R\}.
$$

Allowing mixtures gives exactly the convex hull of $\mathcal P_p$. Every point of the hull comes from mixing pure states with the same $p$. Conversely, positivity forces each row and column with $p_j=0$ to vanish. On the remaining support put $S=\operatorname{diag}(\sqrt{p_j})$. Then $S^{-1}\rho S^{-1}$ is positive semidefinite with unit diagonal. For such complex correlation matrices in dimensions one through three, every real linear functional attains its maximum on a rank-one phase matrix. Apply this to each directional projection of $s$. Every point outside the convex hull exceeds the pure-state maximum in some direction and is therefore unattainable. [Phase Gram maximum theorem](lean:D5/S3/Quantum/Recovery/CommutingRandomUnitaryRecovery.phase_gram_max)

In particular, uniform $q$ means $s=0$, which $\operatorname{diag}(p)$ always realizes. A pure state works exactly when $a,b,c$ close to a triangle, allowing equality and zero sides. Rotate the closed triangle to make its three arguments sum to zero modulo $2\pi$, assigning any direction to a side of length zero. Expanding the four factors in Heron’s formula and using $p_0+p_1+p_2=1$ gives the equivalent test $(p_0p_1+p_1p_2+p_2p_0)^2\le 4p_0p_1p_2$. If a triangle inequality fails, the minimum rank is two. For example, at $p=(1,8,8)/17$ the longest side $8/17$ exceeds the sum $2\sqrt8/17$ of the other two. An equal mixture of the rephased up-basis vectors $(1,4,0)/\sqrt{17}$ and $(1,0,-4)/\sqrt{17}$ gives the required rank-two state.

General $q$ also admits a one-variable pure-state test. If $p$ is positive and nonuniform, cyclically shift the up-basis indices so that $b\ne c$. This permutes the three summands $\rho_{j,j+1}$ and preserves $s$. Set $w=e^{i\alpha}$ and $u=e^{i\beta}$. The phase equation is $s-aw=bu+cw^{-1}\bar u$. Combining it with its conjugate gives
$$
\begin{aligned}
N(w)&=bs-abw-c\bar s\,w^{-1}+acw^{-2},\\
u&=\frac{N(w)}{b^2-c^2}.
\end{aligned}
$$
Test the polynomial $w^3[N(w)\overline{N(1/\bar w)}-(b^2-c^2)^2]$ for a unit-circle root. Its leading and constant coefficients are both $-a^2bc$. Each distinct root on the circle gives a single pure state up to overall phase. Check $w=-1$ separately, then substitute $w=(1+ix)/(1-ix)$ in the squared-modulus condition. The positive factor $(1+x^2)^3$ clears denominators and gives a real polynomial with the same real roots. Multiplicity does not change the number of states.

If exactly two entries of $p$ are positive, the pure-state cyclic sum runs along the circle whose radius is the corresponding side length. Each point fixes a unique relative phase. One positive entry gives only $s=0$. When $p$ is uniform and $q$ is nonuniform, exchange the two bases to apply the same tests. When both are uniform, the two orientations of the equilateral triangle each give three rotations and thus six states. Six is the general maximum and is also attained with nonuniform $p$. For $p=(4,9,9)/22$ and $q=(1,1,1)/3$, the polynomial is proportional to $-8w^6+9w^3-8$, with six distinct unit-circle roots. [Sextic test and endpoint examples](https://github.com/the-omega-institute/trureturing-books/issues/1653#issuecomment-7232049615)

Which other four-site operators can produce a nonzero $J$ by this mechanism? Group the rotation characters as a two-dimensional fixed plane $F$ and two character lines. Any two Hermitian operators commuting with the rotation then have the form $A=A_0\oplus a_+\oplus a_-$ and $B=B_0\oplus b_+\oplus b_-$. Write the unit normal to the common light space as $n=(n_0,n_+,n_-)$. Put $C=[A_0,B_0]$, $\alpha=a_+-a_-$, $\beta=b_+-b_-$ and $X_0=\beta(A_0-a_-I)-\alpha(B_0-b_-I)$. For the compressions $H_A,H_B$ to $n^\perp$, the signed determinant factors as
$$
\det[H_A,H_B]=-|n_+n_-|^2\det(X_0)\,n_0^*C n_0.
$$
With simple spectra in increasing order this determinant is $2i\Delta_A\Delta_B J$, where each $\Delta$ is the product of the three positive eigenvalue differences for that compression. Thus both character lines must have nonzero weight in the normal, $X_0$ must be invertible, and the fixed-plane component must have $n_0^*Cn_0\ne0$. A repeated compressed eigenvalue forces the determinant to vanish. [Jarlskog’s commutator invariant](https://doi.org/10.1103/PhysRevLett.55.1039)

For $(\alpha,\beta)\ne(0,0)$, shift $A,B$ by $a_-I,b_-I$ to obtain $A',B'$. Form $X=\beta A'-\alpha B'$ and $Y=(\alpha A'+\beta B')/(\alpha^2+\beta^2)$. This change has determinant one and preserves the commutator after compression. $X$ acts only on $F$, and $Y$ acts by $1,0$ on the two character lines. Let $Q=I-nn^*$, $x=X_0n_0$, and let the three columns of $R$ be $Qf_1,Qf_2,QYn$ for an orthonormal basis $f_1,f_2$ of $F$. Inserting $Q$ between the operators gives
$$
[H_A,H_B]=R\begin{pmatrix} C&-x\\ x^*&0\end{pmatrix}R^*.
$$
Appending the unit normal to these columns gives their squared volume $|\det(f_1,f_2,Yn,n)|^2=|n_+n_-|^2$. The middle determinant is $-x^* Cx$ because the two-dimensional commutator is traceless. In an eigenbasis of $X_0$, $C=[X_0,Y|_F]$ has zero diagonal, so $X_0 C X_0=\det(X_0) C$. When $\alpha=\beta=0$, the character plane contains a common eigenline perpendicular to $n$, giving zero on both sides.

For fixed $A,B$, optimizing over all common complex hyperplanes gives $\max_n |\det[H_A,H_B]|=|\det X_0|\,\|iC\|_{\mathrm{op}}/27$. Indeed the product $\|n_0\|^2|n_+|^2|n_-|^2$ is at most $1/27$, attained with three equal weights. Choose the direction of $n_0$ along an eigenvector attaining the norm of $iC$. Some light space therefore has two simple compressed spectra and $J\ne0$ precisely when $\det X_0\ne0$ and $C\ne0$. The mass gaps in $\Delta_A\Delta_B$ can also change with the normal when comparing the sizes of the resulting $J$ values.

**The four-dimensional Fourier pair (hand derivation).** Extend the shared-state question to four dimensions with $F_4=(i^{jk}/2)_{j,k=0}^3$, keeping $p=\operatorname{diag}(\rho)$ and $q=\operatorname{diag}(F_4^*\rho F_4)$. For $u=(2,-1,2,-1)^T$ and $v=(4,i,-4,-i)^T$, the state $\rho=(uu^*+vv^*)/44$ gives
$$
p=(10,1,10,1)/22,\qquad q=(1,25,9,9)/44.
$$
This pair has a unique shared state, of rank two. For fixed $p$ in four dimensions, mixed states can therefore give a strictly larger set of second readouts than the convex hull of the pure-state readouts with that same $p$.

Let $A$ be the Hermitian circulant with first row $(0,5+2i,2,5-2i)$. Then $F_4^*AF_4=\operatorname{diag}(c)$ for $c=(12,-6,-8,2)$. Put $S=\operatorname{diag}(3,18,3,18)+A$. Its blocks on the positive and negative eigenspaces of the two-step shift are
$$
\begin{pmatrix}5&10\\10&20\end{pmatrix},\qquad
\begin{pmatrix}1&4i\\-4i&16\end{pmatrix}.
$$
Both blocks are positive semidefinite of rank one, and $u,v$ span the kernel. Every state $X$ realizing $p,q$ satisfies $\operatorname{tr}(SX)=3(p_0+p_2)+18(p_1+p_3)+c\cdot q=0$, so $X=UHU^*$ with $U=[u\ v]$. Equal diagonal entries at positions $0,2$ and $1,3$ force the real and imaginary parts of the off-diagonal entry of $H$ to vanish, respectively. The two remaining diagonal equations give $H=I_2/44$. If a convex combination of pure states with first readout $p$ gave $q$, each state with positive weight would attain zero for the nonnegative functional $\operatorname{tr}(SX)$. The only state in the kernel with that $p$ has rank two. [Exact four-dimensional counterexample](https://github.com/the-omega-institute/trureturing-books/issues/1657#issuecomment-7232238573)

**Which first readouts give a gap?** Let $E=(p_0+p_2)/2$, $O=(p_1+p_3)/2$, $\delta_e=(p_0-p_2)/2$, and $\delta_o=(p_1-p_3)/2$. For the four-dimensional Fourier pair and fixed $p$, the mixed-state readouts extend strictly beyond the convex hull of pure-state readouts with that same $p$ exactly when
$$
EO>0,\qquad E\ne O,\qquad
\left(\frac{\delta_e}{E}\right)^2+\left(\frac{\delta_o}{O}\right)^2<1.
$$
A zero entry restricts the state to a support of size at most three. The phase Gram maximum theorem above then supplies a pure maximizer for every linear functional of the second readout.

For fully supported $p$, a linear functional separating the two readout sets corresponds to a Hermitian circulant objective. The diagonal matrix with entries $p$ is strictly feasible. The dual slack $S$ adjusts only the diagonal, and optimal states are supported on $\ker S$. Slacks of ranks zero and three always permit a pure optimum. For rank one, the kernel condition gives a closed sum of vectors with lengths determined by $p$ and $S$. The same lengths form a closed planar polygon, giving the desired phases. For rank two, if diagonal unitary conjugation makes the slack real, take the real part of an optimal state. Its at most two real outer-product factors give the real and imaginary parts of a single vector with the same first readout.

The even principal block and its Schur complement reduce the remaining rank-two slacks to the two eigenspaces of the two-step shift. The kernel has basis $(1,r,1,r)^T$, $(1,is,-1,-is)^T$ for nonzero real $r,s$. The opposite entries of the slack being equal forces $r^2,s^2$ to lie on the same side of $1$ or both equal $1$. When the squares coincide, every feasible first readout in the kernel admits a rank-one representative there. For distinct squares, $p$ determines the Hermitian coefficient matrix $\begin{pmatrix}a&z\\\bar z&b\end{pmatrix}$ in the kernel basis uniquely. A gap requires this matrix to be positive definite. Then $E=a+b$ and $O=r^2a+s^2b$ give $E\ne O$, and $E^2\ge4ab$, $O^2\ge4r^2s^2ab$, and $|z|^2<ab$ give the strict ellipse inequality. Conversely, inside this region take $a=b=E/2$ and choose distinct squares sufficiently close to $O/E$ with that mean. The diagonal equations give a positive definite coefficient matrix, and two rank-one blocks assemble into a slack with circulant off-diagonals. Its kernel contains exactly one optimal state at this $p$, of rank two. [Full derivation of the criterion](https://github.com/the-omega-institute/trureturing-books/issues/1663)

**Minimum rank for prescribed readouts (hand derivation).** Write the state as $XX^*$ with rows $x_0,\ldots,x_3$ in $X$. Set $A=x_0+x_2$, $B=x_0-x_2$, $C=x_1+x_3$, and $D=x_1-x_3$. The four Fourier vectors are $(A+C,B-iD,A-C,B+iD)/2$. Write $a,b,c,d$ for the squared norms of $A,B,C,D$. For given $p,q$, search over $a$ alone, with $b=2(p_0+p_2)-a$, $c=2(q_0+q_2)-a$, and $d=2(p_1+p_3)-c$. All four numbers must be nonnegative. Write

$$
g=(p_0-p_2,\ q_1-q_3,\ p_1-p_3,\ q_0-q_2),\qquad m=(ab,bd,dc,ca).
$$

The $g_j$ are real overlaps along the cycle $A,B,D,C,A$, with an extra factor $i$ on the second edge. Every realization satisfies $g_j^2\le m_j$. If a norm vanishes, removing that vertex and its incident edges leaves paths on which phases can be assigned one edge at a time. The inequalities then suffice for a pure state.

If $abcd>0$, the phase differences for a pure state cancel around the cycle, leaving the second edge's factor $i$. Thus a pure state exists exactly when some choice $\epsilon_j\in\{-1,1\}$ satisfies

$$
\prod_{j=1}^4\bigl(g_j+i\epsilon_j\sqrt{m_j-g_j^2}\bigr)=i\,abcd.
$$

Divide each factor by $\sqrt{m_j}$ and multiply the second by $-i$ to recover the successive phase ratios. Invert the sums and differences to obtain the $x_j$.

When $abcd>0$, denote $g_j/\sqrt{m_j}$ in order by $r,w,t,s$. Regard the complex vectors as real vectors. Along $B,A,C$, the two known normalized inner products put the normalized $B,C$ inner product in the interval with center $rs$ and half-width $\sqrt{(1-r^2)(1-s^2)}$. Along the other path, the normalized $B,-iD$ inner product is $w$, so the normalized $B,D$ inner product can range over $[-T,T]$, where $T=\sqrt{1-w^2}$. Combining this with the known $C,D$ inner product $t$ gives the $B,C$ interval $[-M,M]$, with $M=1$ if $|t|\le T$ and $M=T|t|+|w|\sqrt{1-t^2}$ otherwise. The endpoint is the maximum of $ht+\sqrt{(1-h^2)(1-t^2)}$ over $|h|\le T$. If the intervals intersect, one can place $B,D$ in real dimension four, then place $C$ and $A$ in that space. This gives a witness in complex dimension two. The minimum rank is one if some $a$ passes the pure-state test, using the edge inequalities for a zero norm and the phase product for positive norms. Every other feasible pair has minimum rank two. If no $a$ passes a feasibility test, the pair is infeasible. [Interval endpoints and reconstruction](https://github.com/the-omega-institute/trureturing-books/issues/1667)

**Support differences and minimum rank (hand derivation).** For the coordinate and cyclic Fourier bases in dimension $d$, let the first readout have support $S\subset\mathbb Z_d$ of size $k$. Let $m$ be the number of distinct nonzero directed differences between sites in $S$. Every feasible second readout has a shared state of rank at most $\lfloor\sqrt{k+m}\rfloor$. It is possible to force rank $k$ exactly when all $k(k-1)$ directed differences are distinct. In that case a uniform second readout uniquely determines the diagonal state.

Positivity removes the rows and columns outside the support. Fourier inversion of the second readout gives the sum of entries at each cyclic difference. Opposite differences form a conjugate pair and each nonzero self-inverse difference gives one real number, for at most $m$ real constraints. Together with the $k$ diagonal entries, these constraints leave a nonzero Hermitian perturbation on the image of a state of rank $r$ whenever $r^2>k+m$. Moving along that perturbation to the positive semidefinite boundary lowers rank and preserves the readouts. If every directed difference is distinct, a uniform second readout forces each off-diagonal entry to vanish individually. The unique shared state then has rank $k$.

Full support in dimension four has $k=4$ and $m=3$, so every feasible pair has a shared state of rank at most two. The prescribed-readout example above forces rank two. [Appendix D](appendix-d.md) gives the dimension threshold for forcing full support rank and the stronger bound from subsets. On three sites with repeated differences, the three edge lengths also give the nearest pure-state readout to the uniform Fourier distribution. [Appendix D.3](appendix-d.md#sec-ou-appd-three-site-radius)

At positive zeta zero $2{,}306{,}888{,}100{,}085$, place the four orthogonalized arithmetic Gram directions at the pole and the first sites on the three rays, in order. Take the span of the last three original sources as the generation space. Compress the shell operators of charges $-4$ and $2$ to this space to model the left-handed up- and down-quark squared-mass matrices. One step preserves a shared antiunitary symmetry and gives a vanishing Jarlskog invariant $J$. Taking two steps before projecting back adds paths that leave the generation space and return, giving $J\simeq3.00189\times10^{-4}$. Can this mechanism also account for the quark masses and top–bottom mixing? With each of the six quark Yukawa couplings in its $1\sigma$ interval at $1\,\mathrm{TeV}$, even nineteen independently chosen nonnegative spectral values in each sector force $|V_{tb}|$ below $0.9936401$ or above $0.99915018$. The reference interval at the same scale lies in the gap. If the shell values may take either sign while the compressed squared masses stay positive, a single real polynomial of degree at most eleven shared by both charges can reproduce any prescribed six positive quark masses and CKM matrix. Its coefficients then become additional quantities for a unification model to explain. [Two-step propagation](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-three-gram-source-flavor.py) · [Mixing bounds for nonnegative spectra](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-three-source-positive-ckm.py) · [Signed polynomial construction](https://github.com/the-omega-institute/trureturing-experiments/blob/b0f5a77f57448869a358fdfb61c96dad5aa3f039/experiments/ch39-omega-research/replay/ch39-signed-three-source-quark-pair.py) · [Reference inputs, Table 2](https://arxiv.org/html/2510.01312v2#Sx1.T2)

Quark data also constrain the orientation of the generation space. In the real four-dimensional space of the pole and the three first ray sites, take the complexification of a real hyperplane as the common flavor space. Let $a$ be the length of its unit normal projected onto the plane fixed by the three-cycle. Allow each sector its own positive semidefinite four-site operator commuting with the cycle, and read its compression as a squared-mass matrix. Using masses and mixing from the same $1\,\mathrm{TeV}$ table, interval bounds require $0.0096549<a<0.0332714$ throughout the reference windows. Every choice of three of the four arithmetic sources gives $a$ between $0.5198$ and $0.5774$. At $a=0.02145737$, the central values admit positive definite four-site extensions. [Bounds and construction for positive four-site extensions](https://github.com/the-omega-institute/trureturing-experiments/blob/cd7ec54bd5afd349e0a6734cc600f16e66ce612c/experiments/ch39-omega-research/replay/ch39-free-four-site-positive-extensions.py)

At the zeta zero above, the same $a$ permits a common flavor space and strictly positive amplitudes on the nineteen shell levels in each charge sector. Compressing these amplitudes before squaring reproduces all six central masses and the full central CKM matrix. For this readout, even allowing any common real three-dimensional space, a fit anywhere in the product of the ten marginal $1\sigma$ intervals requires at least one up-sector spectral amplitude above $1.18$ in physical Yukawa units. The lower bound rises to $1.22$ for an exact fit at the center. The construction attains a peak of about $1.768$ in that sector. Keeping the space and the amplitudes fixed by energy rank, three masses miss their windows at the preceding zero and four at the following zero. The first–second generation mixing angle shifts from $0.22704$ radians to about $0.15892$ and $0.25816$, respectively. [Positive amplitudes on the shell spectrum](https://github.com/the-omega-institute/trureturing-experiments/blob/f3a9b2fe627f7a47bb84763cfb0750a4a440c316/experiments/ch39-omega-research/replay/ch39-free-four-site-native-positive-spectrum.py) · [Adjacent-zero test](https://github.com/the-omega-institute/trureturing-experiments/blob/f3a9b2fe627f7a47bb84763cfb0750a4a440c316/experiments/ch39-omega-research/replay/ch39-native-positive-spectrum-holdout.py) · [Lower bound on the up-sector peak](https://github.com/the-omega-institute/trureturing-experiments/blob/850b244f08028f0b505652894aaaa2c44ecdf693/experiments/ch39-omega-research/replay/ch39-four-site-physical-amplitude-cap.py) · [Ten-dimensional input window](https://github.com/the-omega-institute/trureturing-experiments/blob/e459474410c699a431741bf2ca6d62be2170aba7/experiments/ch39-omega-research/replay/ch39-four-site-physical-cap-window.py)

A complex four-site normal can have unequal magnitudes along the two nontrivial cyclic characters. One common generation space of this kind reproduces the same central quark data with all thirty-eight spectral amplitudes below one. The up- and down-sector peaks are about $0.948$ and $0.376$. Fix this complex space at either adjacent zero and allow both sectors to choose arbitrary nonnegative spectral weights of any size. Even with an arbitrary common flavor basis, neither zero can reproduce the six central masses and full CKM matrix. How many spaces do the three neighboring zeros require? With both sets of amplitudes in $[0,1]$, the minimum is two. The central zero $N$ and its right neighbor $N+1$ can share a space, with their two pairs of flavor matrices related by simultaneous unitary conjugation. The left neighbor can reproduce the same quark data on its own, but cannot share any four-site generation space with the central zero, even if each zero chooses its weak basis and all spectral amplitudes independently. A shared hyperplane normal fixes a common axis. Fitting the quark data at both zeros would require a chordal distance below $0.748$ between allowed directions from their native spectra. The smallest such distance exceeds $0.75042$. The left and right neighbors cannot share a space either. Their minimum chordal distance exceeds $0.67579$ while a common axis would require a distance below $0.670$. With two spaces the grouping is unique. The left neighbor uses one space, and the central zero and right neighbor share the other. [Bounded amplitudes on a complex flavor space](https://github.com/the-omega-institute/trureturing-experiments/blob/b7b39455dda1dc8627e0b92029a57c00f078fa7b/experiments/ch39-omega-research/replay/ch39-complex-four-site-unit-quark-amplitudes.py) · [All common flavor bases at the adjacent zeros](https://github.com/the-omega-institute/trureturing-experiments/blob/51bfcbb58a8967557baa419327e272191843ab25/experiments/ch39-omega-research/replay/ch39-complex-neighbour-quark-orbits.py) · [Separation over all four-site spaces](https://github.com/the-omega-institute/trureturing-experiments/blob/6d5ac0f06e75d0781f1564685f37ad746ace83fb/experiments/ch39-omega-research/replay/ch39-global-independent-weak-frame-separation.py) · [Separation of the two outer neighbors](https://github.com/the-omega-institute/trureturing-experiments/blob/5ad3848d5b67113a6b75980220939bc3bf49bd4b/experiments/ch39-omega-research/replay/ch39-left-right-independent-weak-frame-separation.py)

Can the three zeros predict the top-quark mass one step farther out? Set $N=2\,306\,888\,100\,085$ and fix the spectral amplitudes at $N-1,N,N+1$. At each spectral level of $N-2$ or $N+2$, take a weighted average of training values with nonnegative weights that decrease or stay constant with distance. Its exact range is easy to construct. Average the nearest value, the nearest two, and so on through the full training set. The smallest and largest of these averages are the endpoints. Each layer may even mix averages over the $57$ nodes of its own charge with averages over all $171$ nodes, and the complex three-generation space on the four sites may be chosen anew. The largest attainable top Yukawa couplings are then about $0.82723$ and $0.78561$, respectively. Both fall below the $1\,\mathrm{TeV}$ reference interval, which starts at $0.8573$. Fitting all five shells requires exactly three flavor spaces. No pair among $N-2,N-1,N$ admits a common hyperplane normal. The lower bound is attained when $N-2$ and $N-1$ each use a separate space and $N,N+1,N+2$ share a third. All five then reproduce the six central masses and the full CKM matrix. [Attainable ranges for distance-weighted averages](https://github.com/the-omega-institute/trureturing-experiments/blob/5dc5ad5b477e097bac65fb7b87e4c051ff1e4e68/experiments/ch39-omega-research/replay/ch39-distance-ordered-quark-holdout.py) · [Three flavor spaces across five shells](https://github.com/the-omega-institute/trureturing-experiments/blob/e92b1976421a840dd7b77a7350ac79b3d9510417/experiments/ch39-omega-research/replay/ch39-five-shell-three-space-quark-witness.py) · [Lower bound of three spaces](https://github.com/the-omega-institute/trureturing-experiments/blob/3ea9711819b9c0e12ef205afc43e272af7c3998d/experiments/ch39-omega-research/replay/ch39-five-shell-oriented-axis-triangle.py)

Once the inner-shell amplitudes are fixed, how similar can transport be for the two charges? Take the step from $N+1$ to $N+2$, fixing all nineteen source amplitudes in each quark sector. Separate unitaries $U_u,U_d$ can reproduce the six central quark masses and the full CKM matrix in a single three-generation space on the four sites. A common nineteen-dimensional unitary cannot do so, even when the entire complex three-generation space and weak basis are chosen anew. A shared unitary imposes one joint lower bound on the two quark sectors in each of the three cyclic representation blocks. The central observables violate at least one of these bounds. Any exact fit requires $\min_\phi\lVert U_u-e^{i\phi}U_d\rVert_{\mathrm{op}}>0.000319$, allowing for an arbitrary overall phase. [Construction with separate unitaries](https://github.com/the-omega-institute/trureturing-experiments/blob/bcd3487f2073c5a027055f80c4687d455b18fc1d/experiments/ch39-omega-research/replay/ch39-independent-unitary-quark-right-holdout.py) · [Bounds for a common unitary over all flavor spaces](https://github.com/the-omega-institute/trureturing-experiments/blob/5057a85c532e6d4c3bcc4dc31006022e270eea10/experiments/ch39-omega-research/replay/ch39-all-spaces-common-unitary-quark-right.py)

Even separate transports must break the cyclic symmetry by a measurable amount. Consider states whose amplitudes are constant on each three-site orbit. The six orbits and the pole span a seven-dimensional invariant subspace. To fit the central quark observables on the right outer shell, at least one charge must carry some input state from this subspace to its orthogonal complement with probability greater than $50.134\%$. If the down-type transport is $X$ and the up-type transport is $X^{-2}$, then $X$ itself must transfer more than $23.244\%$ of the probability out of the subspace for some invariant input. For up-type transport itself, some invariant input must have a probability greater than $45\%$ of leaving this seven-dimensional space. Even with arbitrary mixing of the two nontrivial characters in its twelve-dimensional orthogonal complement and arbitrary nonnegative weights on the nineteen down-type layers, preserving the seven-dimensional space is incompatible with the six masses and full CKM data. This also rules out up-type transports built solely from products of spectral functions of the cyclically symmetric inner and outer magnetic Laplacians. [Transfer out of the cyclically invariant subspace](https://github.com/the-omega-institute/trureturing-experiments/blob/4f1ff7795f9386eec808590e1746124a40ff8e59/experiments/ch39-omega-research/replay/ch39-quark-cyclic-subspace-transfer.py) · [Transfer probability for the up-type charge](https://github.com/the-omega-institute/trureturing-experiments/blob/97792698f89d64b04d9952cdef4f0cad8965f067/experiments/ch39-omega-research/replay/ch39-up-leakage-probability-floor.py)

Suppose the charge-six transport $G=X^3$ preserves the seven-dimensional space. Since $X^{-2}=G^*X$, the up-type and down-type transports give each input state the same probability of leaving the space. Some state must therefore leave with probability greater than $50.134\%$ under both transports. This requires the space and its orthogonal complement to share a charge-six eigenvalue. The generator can then mix directions on opposite sides within the corresponding eigenspace. The charge-six spectral projectors of both shells and the cyclic permutation preserve this splitting. Any single-valued rule that selects a generator from these data and transforms covariantly under simultaneous changes of basis must also preserve the seven-dimensional space. In one calibrated example, changing only the phases of the first high-amplitude charge-six source image in the destination eigenbasis preserves all nineteen amplitudes and all three gravitational readings. A cube root with four eigenphases gives both quark charges a transfer probability above $82.67\%$ for the same input and reproduces the central up, charm and top masses on one three-generation space. Another choice pairs the nineteen charge-six eigenlines of the two shells in energy order. Even with a free phase for each pair and the option of interchanging any two lines, the lightest up-type and down-type quarks cannot both lie in their reference intervals. [Interval bounds for arbitrary phases and a single swap](https://github.com/the-omega-institute/trureturing-experiments/blob/c639c08bfc88479f95bdf3b3b42802e939c3000b/experiments/ch39-omega-research/replay/ch39-energy-order-arbitrary-phases.py) · [Charge-six eigenspaces and transfer probabilities](https://github.com/the-omega-institute/trureturing-experiments/blob/7b29b6729564062f4a8732105bc65640d82d9024/experiments/ch39-omega-research/replay/%E8%8D%B7%E5%85%AD%E8%B0%B1%E7%9A%84%E5%AF%B9%E7%A7%B0%E6%80%A7%E4%B8%8E%E5%85%B1%E5%90%8C%E7%94%9F%E6%88%90%E5%85%83%E6%89%80%E9%9C%80%E7%9A%84%E7%AE%80%E5%B9%B6.md) · [A four-phase construction](https://github.com/the-omega-institute/trureturing-experiments/blob/a8f29cba49d1141de1c35f02da7356648a3649d3/experiments/ch39-omega-research/replay/ch39-rephased-involution-up-centers.py) · [The shared symmetry of the two sets of projectors](https://github.com/the-omega-institute/trureturing-experiments/blob/708cd9fc62d2dba2d6b456c08b0a9fb0a7ff84ed/experiments/ch39-omega-research/replay/ch39-charge-six-projector-algebra-transport.py)

How many sites must participate? Choose any ten of the nineteen sites and mix them while keeping transport equal to the identity elsewhere. The lightest up-type quark then lies above its reference interval for every choice of mixing. An interval calculation covers all 92,378 choices of sites. A thirteen-site transport makes the four eigenvalues of the four-site amplitude strictly interlace the three target masses, so one three-generation space realizes the central up, charm and top masses exactly. The minimum number of sites needed for these three masses is therefore between eleven and thirteen. [Exclusion for all ten-site blocks](https://github.com/the-omega-institute/trureturing-experiments/blob/7699969d96390d24f43dfe9ec0320dc7a70e55a9/experiments/ch39-omega-research/replay/ch39-up-ten-site-cover.py) · [A thirteen-site construction](https://github.com/the-omega-institute/trureturing-experiments/blob/0c51fd050d0460ee3f7bc6f3b260db46b441ce61/experiments/ch39-omega-research/replay/ch39-local-unitary-up-mass-witness.py)

What is the least degree of a common spectral function that can reproduce the six masses? Consider the central zero and its right neighbor separately. Let the up and down sectors share a real rational function with $0<R(t)<1$ on the entire real axis, compress to a common complex three-dimensional space on the four sites, and then square. The least degree, defined as the larger of the numerator and denominator degrees after cancellation, is four. At degree three or less, even separate generation spaces for the two sectors cannot bring all six masses into their respective $1\sigma$ intervals. At each zero a quartic attains all six central values. How much freedom does the full mixing matrix require? At the central zero a different quartic fits all six masses and $|V_{ub}|$, but gives $|V_{cb}|\simeq0.9983$ against a reference value near $0.0427$. At each zero, take levels ten and seventeen from each of the two charges. These four nodes suffice to construct a rational function of degree at most eight that reproduces the six central masses, all nine CKM squared moduli, and the signed Jarlskog invariant. The coefficients and flavor space are chosen separately at the two zeros. A nonconstant real rational function bounded on the entire real axis has an even denominator degree after cancellation. A sextic also fits the full quark data at the right neighbor. The possible minimum degrees are therefore four, six, or eight at the central zero and four or six at the right neighbor. [Exclusion at lower degree](https://github.com/the-omega-institute/trureturing-experiments/blob/cd77e22ffcdfad79fa9f5885649fbe24488859c9/experiments/ch39-omega-research/replay/ch39-common-quadratic-flavor-exclusion.py) · [Quartic constructions and mixing](https://github.com/the-omega-institute/trureturing-experiments/blob/cd77e22ffcdfad79fa9f5885649fbe24488859c9/experiments/ch39-omega-research/replay/ch39-common-quartic-six-masses.py) · [Quartic matching of $|V_{ub}|$](https://github.com/the-omega-institute/trureturing-experiments/blob/679578c68c047c16917fa8df286ca992e1277d99/experiments/ch39-omega-research/replay/ch39-central-quartic-vub.py) · [Full mixing from four spectral nodes](https://github.com/the-omega-institute/trureturing-experiments/blob/c434c5bc2be68117b9fb9aac02de3e193013b45b/experiments/ch39-omega-research/replay/ch39-sparse-rational-full-ckm.py) · [Sextic at the right neighbor](https://github.com/the-omega-institute/trureturing-experiments/blob/39b561099993b46a610ea55d77cc5c58a2151abc/experiments/ch39-omega-research/replay/ch39-common-sextic-full-ckm.py)

The geometry of the two mass bases also sets a floor on how much the cyclic symmetry must break.

::: {.example #ex-ou-ch08-commutator-floor title="Bounding Cyclic Breaking from 1 TeV Mass and Mixing Inputs"}
Subtract the smallest eigenvalue from $H_u$ and $H_d$ and divide each by its spectral diameter to form normalized Hermitian matrices $A, B$ of spectral diameter $1$. Since $\mathcal{E}(A)$ and $\mathcal{E}(B)$ are simultaneously diagonal in an eigenbasis of $T$, we have $[\mathcal{E}(A), \mathcal{E}(B)] = 0$. Splitting $[A, B] = [A - \mathcal{E}(A), B] + [\mathcal{E}(A), B - \mathcal{E}(B)]$ and applying $\|[H, X]\|_{\mathrm{HS}} \le \|X\|_{\mathrm{HS}}$ for any Hermitian $H$ of spectral diameter at most $1$ gives

$$
\|[A, B]\|_{\mathrm{HS}} \;\le\; \|A - \mathcal{E}(A)\|_{\mathrm{HS}} + \|B - \mathcal{E}(B)\|_{\mathrm{HS}} \;\le\; \frac{2}{\sqrt{3}}\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}}.
$$

Switching to the up-type mass basis sets $A = \operatorname{diag}(0, a_c, 1)$ and $B = V \operatorname{diag}(0, b_s, 1) V^*$. Using $1\;\mathrm{TeV}$ Yukawa inputs with conservative bounds $|V_{cb}| > 0.035$ and $|V_{tb}| > 0.98$, the $(c, t)$ entry satisfies $|B_{ct}| \ge |V_{cb} V_{tb}| - b_s$; keeping just the $(c, t)$ and $(t, c)$ entries of $[A, B]$ already yields $\|[A, B]\|_{\mathrm{HS}} > 0.0479$, which multiplies by $\sqrt{3}/2$ to lock in

$$
\max_{X \in \{A, B\}} \|[T, X]\|_{\mathrm{HS}} \;>\; 0.0414.
$$

**Sharp bound from the top and bottom mass lines (hand derivation).** Let $\theta=\arccos|V_{tb}|$ be the projective angle between the top and bottom mass lines, and set $d=\min(\theta,\pi/2-\theta)$. If both normalized squared-mass spectra have a gap of at least $g>0$ between their two largest eigenvalues, then

$$
\max_{X\in\{A,B\}}\|[T,X]\|_{\mathrm{HS}}
\ \ge\ \sqrt{3/2}\,g\sin d.
$$

In the mass basis, keeping just the entries that join the top eigenvalue to the others gives $\|[T,X]\|_{\mathrm{HS}}\ge g\|[T,P_X]\|_{\mathrm{HS}}$, where $P_X$ projects onto that mass line. If its squared coordinates in the rotation eigenbasis are $p_j$, then $\|[T,P_X]\|_{\mathrm{HS}}^2=3(1-\sum_j p_j^2)$. The sum of the distances from the two mass lines to their respective nearest rotation eigenlines is at least $d$. If their nearest line is the same, the triangle inequality gives the lower bound $\theta$. If the two nearest lines are orthogonal, it gives $\pi/2-\theta$. Thus at least one mass line has largest squared coordinate $p=\max_j p_j$ at most $\cos^2(d/2)$. When $p\ge1/2$, pooling the other coordinates gives $1-\sum_j p_j^2\ge 2p(1-p)\ge(\sin^2 d)/2$. When $p\le1/2$, use $\sum_j p_j^2\le p$.

Using the actual up- and down-type gaps $g_u,g_d$, split the total angular offset $d$ into $x$ and $d-x$. One projection bound increases with $x$ and the other decreases, so their maximum is smallest where $g_u\sin(2x)=g_d\sin(2d-2x)$. The resulting bound is

$$
F=\sqrt{3/2}\,
\frac{g_u g_d\sin(2d)}{\sqrt{g_u^2+g_d^2+2g_u g_d\cos(2d)}}.
$$

With the two spectra and the top–bottom angle prescribed, $F$ is attainable in the plane spanned by the two heaviest mass lines. When $\theta\le\pi/4$, place one rotation eigenline between the two mass lines. When $\theta\ge\pi/4$, turn the two nearest rotation eigenlines outward until they are orthogonal. In each sector place the middle eigenline in the plane and the lightest along its normal. For equal gaps, the two offsets are both $d/2$. [Triangle inequality for the projective angle](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) · [Optimal offsets for unequal gaps](https://github.com/the-omega-institute/trureturing-books/issues/1849#issuecomment-7238283999)

**Splitting the angle near orthogonality (hand derivation).** When $d=\pi/2-\theta=\mu\varepsilon$ shrinks at the same rate as the second-heaviest eigenvalues, the two heavy lines each fix a separate rotation coordinate. Choose an orthonormal basis $(e_0,e_1,e_2)$ at the endpoint. The vectors $e_0,e_1$ span the up- and down-type heavy lines, respectively, and $e_2$ is normal to their plane. Keep the up-type mass basis fixed and rotate the entire down-type endpoint basis in that plane by $\mu\varepsilon$, bringing the bottom line toward the top line. Take normalized second-heaviest squared masses $a\varepsilon,b\varepsilon$, with $\mu,a,b>0$. Let $c,s$ be the up- and down-type second-heaviest unit vectors at the endpoint, with components $c_j,s_j$ in this basis. Set $U=a|c_1 c_2|$ and $V=b|s_0 s_2|$, the leading off-diagonal magnitudes in the two light blocks. The smallest maximum defect $D_*$ over all complex rotation eigenbases is

$$
\begin{aligned}
x_*&=\min\left\{\mu,\max\left\{0,\frac{\mu^2+V^2-U^2}{2\mu}\right\}\right\},\\
D_*&=\sqrt6\,\varepsilon\max\left\{\sqrt{x_*^2+U^2},\sqrt{(\mu-x_*)^2+V^2}\right\}+O(\varepsilon^2).
\end{aligned}
$$

Rotating the endpoint basis by $x_*\varepsilon$ in the top–bottom plane attains this leading value. Indeed, any rotation eigenbasis with defect $O(\varepsilon)$ has two lines within $O(\varepsilon)$ of $e_0,e_1$, respectively, so a skew-Hermitian matrix describes its first-order change. Write its upper off-diagonal entries as $(x,y,z)$. After removing the common factor $6\varepsilon^2$, the leading squared costs are $|x|^2+|y|^2+U^2$ and $|\mu-x|^2+|z|^2+V^2$. We can therefore project $x$ onto the real segment $[0,\mu]$ and set both out-of-plane components $y,z$ to zero. Both sectors take a positive share of the angle precisely when $|U^2-V^2|<\mu^2$. If $U^2\ge V^2+\mu^2$, the up-type rotation line agrees with the top line to first order. If $V^2\ge U^2+\mu^2$, the down-type rotation line agrees with the bottom line to first order.

The two-line coefficient $\sqrt{6}\mu/2$ is attained precisely when $U=V=0$. For example, with $\mu=a=b=1$, $c=(e_1+i e_2)/\sqrt2$, and $s=(e_0+e^{0.4i}e_2)/\sqrt2$, the sectors split the angle equally and the optimal coefficient rises to $\sqrt3$. [Global lower bound, optimal frame, and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/1951#issuecomment-7238865467)

For a fixed pair of mass matrices with $0<\theta<\pi/2$, the minimum defect equals $F$ precisely when the normal to the top–bottom plane lies in the kernels of both $A,B$. At equality each heaviest line occupies two rotation coordinates, and their offsets sum to $d$. If they shared only one coordinate, a common nearest rotation eigenline would force $\theta<d$, while distinct nearest eigenlines would force $\pi/2-\theta<d$. They therefore occupy the same coordinate plane. In a sector with simple spectrum, equality in the spectral-gap estimate also makes the lightest line a rotation eigenline, which must be the normal to that plane. A rank-one sector automatically annihilates the normal. For two simple spectra, equality is equivalent to $|V_{ud}|=1$. If $|V_{ud}|<1$, the minimum defect is strictly greater than $F$. [Equality criterion and quantitative gap](https://github.com/the-omega-institute/trureturing-books/issues/1875)

**Near the orthogonal endpoint with nearly equal up-type light diagonals (hand derivation).** Use the endpoint heavy lines $e_0,e_1$ and the normal $e_2$ to the top–bottom plane as an orthonormal basis. Rotate the down-type reference basis toward the up-type heavy line through $\mu\varepsilon$ in that plane, with $\mu>0$. After factoring out $\varepsilon$, write $C,S$ for the off-diagonal entries of the two rank-one light blocks, $p,p_2$ for the up-type diagonal entries, and denote the down-type diagonal entry on $e_0$ by $v$. Assume bounded light blocks with coupling moduli bounded away from zero. The squared cost is the sum of squared off-diagonal moduli divided by $\varepsilon^2$, counting each pair of indices once. Set $q=|C|^2$ and $\ell=(p-p_2)/\varepsilon^{3/2}$. Measure the slack in the down-type cost at the endpoint basis by

$$
a=\frac{1}{\varepsilon}\left[q-|S|^2-
(1-\varepsilon v)^2\frac{\sin^2(\mu\varepsilon)\cos^2(\mu\varepsilon)}{\varepsilon^2}\right].
$$

Let $D_{\mathrm{plane}}$ be the minimum defect with the normal fixed and $D_*$ the minimum over all complex rotation eigenbases. Uniformly for bounded $a,\ell$,

$$
D_{\mathrm{plane}}-D_*=
\frac{\sqrt6\,\varepsilon^4}{2\sqrt q}
\left(4q a_++2|\ell|\sqrt{q a_+}+\frac{|S|^2}{2}(-a)_+\right)
+O(\varepsilon^{17/4}),\qquad x_+=\max(x,0).
$$

Positive slack allows a normal tilt of order $O(\varepsilon^{3/2})$, with both linear and quadratic gains in the up-type light block. When the slack is negative, a tilt of order $O(\varepsilon^2)$ weakens the down-type coupling in that direction and reduces the in-plane offset forced on the up sector. The slack changes sign at $q-|S|^2-\mu^2=-2v\mu^2\varepsilon+O(\varepsilon^2)$. [Matching bounds over complex bases and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2051#issuecomment-7239397935)

**As the heavy lines approach orthogonality (hand derivation).** Rotate the entire down-type reference mass basis in the top–bottom plane by $\mu\varepsilon$ toward the up-type heavy line, with $\mu>0$. After factoring out $\varepsilon$, the rank-one light blocks on $(e_1,e_2)$ and $(e_0,e_2)$ are bounded and their upper off-diagonal entries $C,S$ have moduli bounded away from zero. The basis $(e_0,e_1,e_2)$ consists of the two reference heavy lines and the normal to the top–bottom plane. Define the squared cost by summing the squared off-diagonal moduli once per pair of indices and dividing by $\varepsilon^2$. Write $q=|C|^2$ and let $E_B(I)$ be the down-type cost in the reference basis. The exact endpoint slack is $q-E_B(I)=k\varepsilon^{5/3}$, where $k$ is bounded. Suppose the difference between the first and second up-type light diagonal entries is $\ell\varepsilon^{3/2}$, with $|\ell|$ bounded above and away from zero. Set $L=|\ell|\sqrt q$ and let $x>\sqrt{k_+}$ solve $x(x^2-k)=2\mu^2 L$, with $k_+=\max(k,0)$.

A light-block rotation along the phase that lowers the up-type cost gives a linear gain and raises the down-type cost quadratically. The in-plane offset needed to compensate brings a quartic up-type cost. These terms balance at a normal tilt of order $\varepsilon^{11/6}$. The minimum defect $D_{\mathrm{plane}}$ with the normal fixed therefore exceeds the minimum $D_*$ over complex bases. The leading difference is of order $\varepsilon^{13/3}$ as $k$ crosses zero. With $u_0=(x^2-k)/(2\mu)$, the leading term and its phase correction are

$$
\begin{aligned}
D_{\mathrm{plane}}-D_*&=\frac{\sqrt6}{2\sqrt q}\varepsilon^{13/3}
\bigl[\Gamma-2\mu\ell\operatorname{Re}(C\bar S)\varepsilon^{1/6}\\
&\qquad +(4qx^2+\mu u_0|S|^2)\varepsilon^{1/3}+O(\varepsilon^{1/2})\bigr],\\
\Gamma&=\frac{(-k)_+^2}{4\mu^2}-u_0^2+2Lx.
\end{aligned}
$$

At exactly zero slack, $\Gamma=\tfrac32 L(2\mu^2 L)^{1/3}$. Rotating the down-type heavy line induces an extra light-block coupling. Its component along the optimizing phase sets the sign of the $\varepsilon^{9/2}$ term. When $\operatorname{Re}(C\bar S)=0$, this correction vanishes, the next term is positive and of order $\varepsilon^{14/3}$, and the remainder inside the brackets improves to $O(\varepsilon^{2/3})$. [Matching bounds over complex bases and matrix replay](https://github.com/the-omega-institute/trureturing-books/issues/2051#issuecomment-7239648355)

When both the slack and the up-type diagonal difference shrink to second order, the gain moves beyond the fourth-order formula. Use the down-type rotation convention $R_{01}(\mu\varepsilon)=\sin(\mu\varepsilon)$ and take $C,S$ to be upper-triangular entries. Set $a=\kappa\varepsilon$ and $p-p_2=\lambda\varepsilon^2$ with bounded $\kappa,\lambda$. The down-type cost constrains the complex normal tilt $\varepsilon^2 Z$ and the in-plane rotation together. The in-plane angle needed to compensate the slack is $O(\varepsilon^3)$, and its squared cost competes with the gain in the up-type light block. Write $R_Z=\operatorname{Re}(C\bar Z)$. The expansion holds uniformly under the stated parameter bounds.

$$
\begin{aligned}
f(Z)&=\left(\frac{|Z|^2-2\mu\operatorname{Re}(S\bar Z)-\kappa}{2\mu}\right)_+^2
      +2\lambda R_Z-4R_Z^2,\\
D_{\mathrm{plane}}-D_*&=\frac{\sqrt6\,\varepsilon^5}{2\sqrt q}
   \left(f(0)-\min_{Z\in\mathbb C}f(Z)\right)+O(\varepsilon^6).
\end{aligned}
$$

The fifth-order coefficient vanishes exactly when $\kappa\le-8\mu^2q$ and $\lambda C=-\kappa S/(2\mu)$. The latter condition balances the linear variations in the two sectors, while the former controls the quadratic cost of tilting. At the threshold $\kappa=-8\mu^2q$ with the linear variations balanced, both zero tilt and the reflected tilt $Z=2\mu S$ minimize $f$. [Matching bounds and equality conditions for the fifth-order formula](https://github.com/the-omega-institute/trureturing-books/issues/2095#issuecomment-7239878715)

The two branches require the same leading in-plane angle. Hold the tilts at their leading minimizing values $Z=0$ and $Z=2\mu S$, and retain the down-type normal diagonal entry $w=|S|^2/v$ in the heavy–light gap. With these tilts fixed, the reflected branch needs a smaller in-plane angle to balance the two sector costs at the next order. The quadratic variation at each minimum is positive definite, so optimizing the complex basis further shifts $Z$ by $O(\varepsilon)$. This shift changes the squared cost one order beyond the difference between the branches. The reflected branch therefore gives the minimum over complex bases, with the following expansion uniform under the stated parameter bounds.

$$
D_{\mathrm{plane}}-D_*=8\sqrt6\,\mu^2\sqrt q\,w|S|^2\,\varepsilon^6+O(\varepsilon^7).
$$

The sixth-order coefficient is strictly positive. At the exact threshold, fixing the top–bottom plane still overestimates the minimum defect even though the fifth-order coefficient vanishes. [Cost expansions for both branches, lower bound over complex bases, and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2126#issuecomment-7240142503)

The two branches can be localized quantitatively near the threshold (direct derivation). Take the common scale $c=\sqrt{\mu^2+|S|^2}=1$, with $v\in[0.78,0.79]$, $w\in[1.13,1.14]$, and $S=-\sqrt{vw}$. Keep the linear variations balanced and set $\kappa+8\mu^2q=\eta\varepsilon$ with $|\eta|\le2$. After ordering the basis columns and fixing their phases, first use a direct rotation to carry $e_0$ to the first column, then rotate the remaining columns within the light subspace. Write the two off-diagonal entries in the first row of the first rotation as $\varepsilon^3(X+iI,Y)$ and the upper off-diagonal entry of the second as $\varepsilon^2Z$, with $X,I$ real and $Y,Z$ complex. For $0<\varepsilon\le10^{-16}$ every globally minimizing complex basis satisfies

$$
\max\bigl(|X-4\mu|,\ |I|,\ |Y|,\ \min(|Z|,|Z-2\mu S|)\bigr)
\le 6\times10^4\sqrt{\varepsilon}<10^{-3}.
$$

The heavy-line projections first confine every minimizing complex basis to bounded scaled coordinates. Each direct rotation satisfies the Cayley closure equation $(I-K)R=I+K$ from *OMEGA Mathematics*, §5.1, with the corresponding skew-Hermitian block generator $K$. First bound the remainders in the two squared costs on the complex scale disk $|\varepsilon|\le1/200$. The down-type cost bounds the real in-plane tilt. Completing the square in the up-type cost then restricts the real and imaginary tilts, placing every minimizing basis in a smaller coordinate domain. On that domain the Cayley inverses and analytic numerators of the squared costs are uniformly bounded on $|\varepsilon|\le1/8$. A second Cauchy estimate gives the stated bound. The two real tilt centers lie more than $0.45$ apart, reducing the global minimization to a comparison within two disjoint neighborhoods. [Localization proof over complex bases and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2347#issuecomment-7242548313)

The leading reduced Hessian has an explicit uniform lower bound (direct derivation). On the balance surface $D_0=0$, eliminate $X$ by writing
$$
L(Z)=\frac{|Z|^2-2\mu S\operatorname{Re}Z}{2\mu},\qquad X=A_0+L(Z).
$$
Substitution into the leading up-type term gives
$$
U_0=A_0^2+L(Z)^2+4(\operatorname{Im}Z)^2+I^2+|Y|^2.
$$
At the two centers $Z=0$ and $Z=2\mu S$, the Hessian in the order $(\operatorname{Re}Z,\operatorname{Im}Z,I,\operatorname{Re}Y,\operatorname{Im}Y)$ is
$$
\operatorname{diag}(2S^2,8,2,2,2),
$$
because $\nabla L=(-S,0)$ or $(S,0)$ and $L=0$. The parameter box therefore gives $2S^2=2vw\ge1.7628$. In either radius-$\rho=10^{-3}$ neighborhood, set
$$
\mu_-=\sqrt{1-0.79\cdot1.14},\quad S_+=\sqrt{0.79\cdot1.14},\quad
g_\Delta=\frac{\sqrt2\rho}{\mu_-},\quad
L_+=S_+\rho+\frac{\rho^2}{2\mu_-}.
$$
The perturbations of the rank-one term and of $2L\nabla^2L$ are bounded by
$$
2(2S_++g_\Delta)g_\Delta=0.01706762,\qquad
\frac{2L_+}{\mu_-}=0.00603015.
$$
Thus the smallest eigenvalue of the leading reduced Hessian remains above $1.7397$ throughout both neighborhoods. This proves uniform strict positivity for the scaled limiting problem. The analytic remainder certificate in #2203 currently bounds function values only, without second derivatives in the scaled coordinates, so $1.7397$ is not promoted here to a finite-$\varepsilon$ Hessian certificate. The next step is to supply that derivative remainder bound.

With the linear variations balanced, set $\kappa+8\mu^2q=\eta\varepsilon$. The two branches then exchange at a shifted threshold for finite $\varepsilon$ (direct derivation). Fix $\mu$ and the down-type light block, and choose phases so that $C>0$ and $S$ is real, retaining its relative sign. Let $v,w$ be the down-type light-block diagonal entries along $e_0,e_2$, respectively, and set $c=\sqrt{\mu^2+|S|^2}$. The actual crossing satisfies $\eta_{\mathrm c}(\varepsilon)=-8\mu^2c^2w+O(\varepsilon)$. For bounded $\eta$ and sufficiently small positive $\varepsilon$, the reflected branch wins for $\eta>\eta_{\mathrm c}(\varepsilon)$, and the branch near zero tilt wins for $\eta<\eta_{\mathrm c}(\varepsilon)$.

When the light-block shape may vary with $\varepsilon$, the fixed plane can attain the exact minimum at the crossing (direct derivation). Hold the common scale $c$ fixed and adjust $t=v/c$ and $r=w/c$ independently, with $S=-c\sqrt{tr}$, $\mu=c\sqrt{1-tr}$, and the linear variations balanced as above. At $\varepsilon=0$, the two normalized transverse gradients extend to $(r-t)\sqrt{tr/(1-tr)}-1$ and $2-4t+r$. At their common zero $t\simeq0.783854$, $r=4t-2$, the first expression increases strictly along the zero line of the second, so the Jacobian with respect to shape is invertible.

The implicit function theorem gives analytic $O(\varepsilon)$ adjustments of the two shape parameters that make both transverse gradients vanish along the actual equal-cost curve. The real matrices give stationarity in the imaginary directions. The positive definite second variation makes the planar point the minimum on the branch near zero tilt. Every minimum over complex bases lies on one of these two branches. Thus, for all sufficiently small positive $\varepsilon$, tuning gives $D_{\mathrm{plane}}=D_*$, and the reflected branch attains the same value. [Analytic derivation and direct matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2180#issuecomment-7240495038)

With the shape and $\mu$ fixed, relaxing two directions near zero tilt gives the cost of fixing the plane when the two branches have exactly equal cost.

$$
\begin{aligned}
D_{\mathrm{plane}}-D_*={}&8\sqrt6\,\mu^2c^3
\left[(2c-4v+w)^2+\left(c-\frac{S(v-w)}{\mu}\right)^2\right]\varepsilon^7\\
&+O(\varepsilon^8).
\end{aligned}
$$

The first square comes from tilting the light-block normal. The second comes from tilting the basis axis associated with the up-type heavy line out of the plane. A positive square makes the seventh-order term leading. Both squares vanish when $w=4v-2c$ and $S(v-w)=\mu c$. These conditions determine a unique parameter ratio with $S<0$. [Localization over complex bases, the equal-cost curve, and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2142#issuecomment-7240252783)

At this ratio, when the two branches have exactly equal cost, the first-order terms of both transverse gradients vanish. The second-order gradients give the leading ninth-order term (direct derivation)

$$
\begin{aligned}
U&=c(c-v)+\mu^2w/c,\\
V&=6v^2-8vc+3c^2-\mu^2(2v/c+25/6),\\
D_{\mathrm{plane}}-D_*&=8\sqrt6\,\mu^2c^3(U^2+V^2)\varepsilon^9
  +O(\varepsilon^{10}).
\end{aligned}
$$

At this ratio $v<c$, so $U>0$. Fixing the plane still incurs a strictly positive cost, now set by the second-order transverse gradients. [Derivation over complex bases and direct matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/2162#issuecomment-7240373923)

When the angle and the two mass bases stay fixed, how quickly does the minimum defect approach $F$ as the middle mass-squared eigenvalues tend to zero? Let $D_*$ be the minimum defect of the fixed pair over all rotation eigenbases. Set the two normalized middle mass-squared eigenvalues to $a\varepsilon,b\varepsilon$, with $a,b>0$, and fix $0<\theta<\pi/2$. Write $\lambda_u=|V_{ub}|^2/\sin^2\theta$ and $\lambda_d=|V_{td}|^2/\sin^2\theta$ for the squared projection lengths of the lightest up- and down-type mass lines onto the top–bottom plane. A direct derivation gives

$$
D_*-F=\frac{\sqrt{3/2}\sin d}{2}(a\lambda_u+b\lambda_d)\varepsilon+O(\varepsilon^2).
$$

For fixed mass bases and angle, the linear term depends on the lightest lines through their projections onto the plane. Optimizing the angle split within that plane gives effective gaps $1-a\varepsilon(1-\lambda_u)$ and $1-b\varepsilon(1-\lambda_d)$. The matrix entries coupling the plane to its normal contribute only at quadratic order to the squared defect of this construction. Every limit of minimizing rotation eigenbases as the matrices tend to rank one has the top–bottom plane as a coordinate plane. Bounding the cost of tilting that plane gives the matching first-order lower bound. Thus the gap has a strictly positive linear coefficient whenever $|V_{ud}|<1$. [First-order lower bound and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/1902#issuecomment-7238657944)

**Near orthogonality, preserving the plane still has a higher-order cost (hand derivation).** Let $e_0,e_1$ be unit vectors on the two endpoint heavy lines, and let $e_2$ be a unit normal to their plane. Rotate the down-type reference basis in the top–bottom plane toward the up-type heavy line so that the angle is $\pi/2-\mu\varepsilon$. Set the normalized middle eigenvalues to $a\varepsilon,b\varepsilon$, with $\mu,a,b>0$. When both light blocks have nonzero first-order off-diagonal entries and the optimal first-order split assigns a positive angle to both sides, the plane-constrained minimum defect $D_{\mathrm{plane}}$ and the unrestricted minimum $D_*$ have the same linear coefficient. After balancing the squared defects of the two sectors, tilting the normal has a positive quadratic cost, while the off-diagonal entries of the light blocks can contribute a linear variation. An $O(\varepsilon^2)$ tilt of the basis can therefore yield an $O(\varepsilon^3)$ improvement in the defect. If the cubic coefficient vanishes, accounting for the shift in the angle split in the normal variation gives a strictly positive fifth-order coefficient. Under these light-block and interior-split conditions, preserving the plane therefore always overestimates the minimum defect for sufficiently small positive $\varepsilon$. [Derivation and matrix check of the fifth-order coefficient](https://github.com/the-omega-institute/trureturing-books/issues/1983#issuecomment-7239062129)

For example, take $\mu=a=b=1$ with reference middle mass lines spanned by $c=(e_1+e_2)/\sqrt2$ and $s=(e_0+i e_2)/\sqrt2$. The two sides split the first-order angle equally, but $D_{\mathrm{plane}}-D_*=(\sqrt3/16)\varepsilon^3+O(\varepsilon^4)$. [Matching bounds, conditions for the cubic term to vanish, and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/1983#issuecomment-7238976867)

**When the top–bottom angle and the middle eigenvalues shrink together (hand derivation).** If the top–bottom angle shrinks on the same scale as the middle eigenvalues, the light block contributes at the same order as the angle split. Let the unit vector $e_0$ span the top line. In its orthogonal complement, choose unit vectors $c,s$ for the reference middle mass lines of the up and down sectors and a unit vector $v$ for the direction of rotation. Rotate the entire down-type reference basis through $\theta=\mu\varepsilon$ in the $e_0,v$ plane. Set the two normalized middle mass-squared eigenvalues to $a\varepsilon,b\varepsilon$, with $\mu,a,b>0$. Write $D_*$ for the minimum defect over rotation eigenbases, and set $\kappa=2|\langle c,s\rangle|^2-1$, $r_w=wa^2/4$, and $s_w=(1-w)b^2/4$. Then

$$
\begin{aligned}
q(w)&=\mu^2w(1-w)+\frac{r_w+s_w-\sqrt{(r_w-s_w)^2+4r_ws_w\kappa^2}}{2},\\
D_*&=\varepsilon\sqrt{6\max_{0\le w\le1}q(w)}+O(\varepsilon^2).
\end{aligned}
$$

The rotation eigenline near $e_0$ absorbs the displacement between the heavy mass lines. The other two rotation eigenlines control the off-diagonal entries in the light block. Weight the squared defects in the two sectors by $w$ and $1-w$. Completing the square gives the displacement term, and the light term reduces to an eigenvalue calculation in the plane spanned by the Bloch vectors of the two reference middle mass lines. At the unique maximizer $w_*$ of $q$, the heavy rotation eigenline has first-order displacement $(1-w_*)\mu\varepsilon v$, and the light rotation eigenlines can be chosen to equalize the two leading defects. The leading coefficient $\sqrt{3/2}\,\mu$ of the two-line bound is attained precisely when $c,s$ span the same line or are orthogonal.

For example, in the standard orthonormal basis $(e_0,e_1,e_2)$ take $\mu=a=b=1$, $v=c=e_1$, and $s=(e_1+i e_2)/\sqrt2$. The optimal leading coefficient is $3/2$. Requiring one rotation eigenline to be the normal $e_2$ to the top–bottom plane raises the optimal coefficient to $5\sqrt6/8>3/2$. Reorienting the two light rotation eigenlines attains the true minimum. [Global derivation, optimizing bases, and matrix calculation](https://github.com/the-omega-institute/trureturing-books/issues/1928#issuecomment-7238762769)

**At the cutoff for splitting the angle near orthogonality (hand derivation).** Take the endpoint heavy lines $e_0,e_1$ and the plane normal $e_2$ as an orthonormal basis. Rotate the reference down-sector mass basis through $\mu\varepsilon$ toward the up-sector heavy line in the top–bottom plane. Both normalized middle eigenvalues are proportional to $\varepsilon$. After factoring out $\varepsilon$, let $C,S$ be the off-diagonal entries of the two fixed rank-one light blocks in $(e_1,e_2)$ and $(e_0,e_2)$, respectively. Write $p,p_2$ for the up-sector diagonal entries and $v$ for the down-sector diagonal entry along $e_0$. At the cutoff $q=|C|^2=|S|^2+\mu^2$, assume $\mu>0$ and $C,S\ne0$, and set $L=|(p-p_2)C|$. With the normal fixed, the up-sector off-diagonal cost attains its minimum in the endpoint basis, where the down-sector cost is slightly lower. For sufficiently small positive $\varepsilon$, the exact plane-constrained defect is $D_{\mathrm{plane}}=\sqrt{6q}\,\varepsilon$. Allowing the normal to tilt gives

$$
D_{\mathrm{plane}}-D_*=\frac{\sqrt6}{2\sqrt q}
\begin{cases}
\tfrac32 L(2\mu^2 L)^{1/3}\varepsilon^{7/3}+O(\varepsilon^{8/3}), & p\ne p_2,\\
8qv\mu^2\varepsilon^4+O(\varepsilon^{9/2}), & p=p_2.
\end{cases}
$$

When the up-sector light diagonal entries differ, tilting the normal reduces the up-sector cost linearly. The down-sector cost grows quadratically with this tilt, so an in-plane turn must offset it, at a quadratic cost to the up sector. Balancing these changes gives the $7/3$ power. When the diagonal entries coincide, the up-sector gain starts at quadratic order in the tilt, and the down-sector slack at the endpoint determines the leading term. Both leading coefficients are positive. [Matching bounds and matrix reproduction](https://github.com/the-omega-institute/trureturing-books/issues/2016#issuecomment-7239160733)

Table 2 at $1\,\mathrm{TeV}$ gives $y_c/y_t\le0.00316/0.8573$ and $y_s/y_b\le0.000271/0.01392$, so we can take $g=0.9996$. With the conservative mixing inputs above, $|V_{tb}|>0.98$ gives $d=\theta$, while $\sin\theta\ge |V_{cb}|>0.035$ forces a defect strictly above $0.0428$. Using the marginal intervals in Table 2 as an input box still gives $d=\theta$. Since $|V_{tb}|=\cos\theta_{23}\cos\theta_{13}$, $\sin^2\theta$ increases with each mixing angle. Substituting the lower endpoints $\theta_{23}=0.04233$ and $\theta_{13}=0.00369$ gives a defect strictly above $0.0520$. [Reference inputs, Table 2](https://arxiv.org/pdf/2510.01312v2#page=14) · [Standard CKM parametrization, Eq. (12.3)](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-ckm-matrix.pdf#page=1)

**The transition near orthogonal mass lines (hand derivation).** When the top–bottom angle is $\pi/2-\mu\varepsilon$ with $\mu>0$, choose an orthonormal basis of endpoint heavy lines $e_0,e_1$ and plane normal $e_2$. Rotate the entire down-type mass basis toward the up-type heavy line within their plane. After removing the common factor $\varepsilon$ from the middle eigenvalues, let $C,S$ be the off-diagonal entries of the two rank-one light blocks, and $p,p_2$ the up-type diagonal entries. Set $q=|C|^2$, $L=|(p-p_2)C|$, $k=(q-|S|^2-\mu^2)/\varepsilon^{2/3}$, and $x_+=\max(x,0)$. When both light couplings approach nonzero limits and the limiting up-type diagonal entries differ, the asymptotic formula is uniform for bounded $k$.

$$
\begin{aligned}
D_{\mathrm{plane}}-D_*&=\frac{\sqrt6\,\varepsilon^{7/3}}{2\sqrt q}
\left[\frac{(-k)_+^2}{4\mu^2}-m(k)\right]+O(\varepsilon^{8/3}),\\
m(k)&=\min_{s\ge0}\left\{\frac{(s^2-k)_+^2}{4\mu^2}-2Ls\right\}.
\end{aligned}
$$

Here $D_{\mathrm{plane}}$ is the minimum defect with the plane normal fixed, and $D_*$ allows all complex rotation eigenbases. The normal tilts by $O(\varepsilon^{4/3})$ in the original basis. Its linear benefit in the up sector competes with the quartic cost induced by the down sector. The bracket is strictly positive, and its minimizer in the quartic problem satisfies $s>\sqrt{k_+}$ and $s(s^2-k)=2\mu^2L$. Thus the planar penalty retains order $7/3$ across the leading angle-split cutoff, with a coefficient that varies continuously with the detuning. [Uniform matching bounds and matrix calculations](https://github.com/the-omega-institute/trureturing-books/issues/2033#issuecomment-7239259812)
:::

## 8.2 The Atlas of Yukawa Hierarchy Obstructions: Single Higgs, Density Potentials, Transport Vertices, and Minimal Support {#sec-ch08-yukawa-nogo}

Once cyclic symmetry must break, the natural instinct is to couple light quark modes directly to shell Higgs modes or nearest-neighbor edge transport and let hierarchies emerge dynamically. Rigorous interval certificates across individual zeros and a 1,238-zero window sweep five intuitive families off the table:

| Tested Yukawa mechanism | Zero sample and scope | Exact no-go ceiling or forced price | Reference target and context |
| :--- | :--- | :--- | :--- |
| Single light-Higgs local vertex | #22027, #28325; shared 19-site vertex, 3 light Higgs modes | **$m_c / m_t > 0.0272$**; all 19 Higgs modes force **$> 99.858\%$** heavy-mode VEV and shell mass-squared shift **$> 2.015 \times 10^{28}\;\mathrm{GeV}^2$** | Reference $m_c / m_t \approx 0.00361$; right-quark monotone smoothing still caps $m_u / m_d < 1.557$ |
| Arbitrary site-density potential vacua | #11431; plus all $1{,}238$ zeros in $[10855, 12092]$ | #11431 arbitrary density potential gives **$m_t / m_b < 2.690$** (diffusion kinetic $< 3.923$); **all $1{,}238$ zeros** obey **$m_t / m_b < 30$** | $1\;\mathrm{TeV}$ target $m_t / m_b > 40$; empirical profiles carry negative phase curvature $< -0.006\|h\|^2$ |
| 7-orbit nonnegative local Yukawa | #22027, #28325; arbitrary nonnegative weights on 7 orbits, 3 light Higgs | Up-quark / charged-lepton norm ratio capped at **$m_u / m_\ell < 3.34$** | $1\;\mathrm{TeV}$ reference floor **$84.98$** (short by $> 25\times$) |
| 1-leg vs. 3-leg 8-coefficient transport | #22027, #28325; triple (#11661, #11934, #22027) | 1-leg transport stays **$< 2.363\%$** of target; 3-leg 8-coeff fits single zeros with heavy-block norm **$> 16.63$** and vacuum trace **$> 3.45 \times 10^{34}\;\mathrm{GeV}^2$**; fails 3 zeros simultaneously (**$< 98.7\%$**) | Swapping single-zero fits fails (#28325 gives $m_u / m_\ell < 47.366$) |
| Minimal site-support classifications | #11431 shared Higgs profile; differentiable density stationarity | $m_t / m_b$ needs $\ge$ **$8$ sites** (6 subsets, all forcing **$m_c / m_t > 0.559$**; 9 sites $> 0.208$; 10 sites $> 0.01$); both hierarchies need **$14$ sites**; stationarity needs $\ge$ **$16$ sites** | Sparser profiles leave strictly positive field-equation residuals on empty sites |

### 8.2.1 Why Single Higgs Couplings and Arbitrary Density Potentials Fail Together

Every entry reflects a sharp variational mechanism (full certificates in [`ch39-positive-orbit-yukawa.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-positive-orbit-yukawa.py), [`ch39-minimum-flavor-support.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-minimum-flavor-support.py), and the [Omega replay compendium](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/%CE%A9%E5%A4%8D%E7%AE%97%E8%AF%B4%E6%98%8E.md)):

- **Single light Higgs vs. heavy-mode decoupling**: without hand-fitted flavor tensors, any complex superposition of the first three light Higgs modes at a shared 19-site vertex leaves $m_c / m_t > 0.0272$, more than seven times the empirical $0.00361$. Releasing all nineteen Higgs modes to reproduce the overall up/down norm ratio forces **more than $99.858\%$** of the Higgs VEV squared norm into the sixteen heavy modes! That direction carries a bare Rayleigh scale of at least $1.279 \times 10^{14}\;\mathrm{GeV}$, requiring a Hermitian shell mass-squared shift **$> 2.015 \times 10^{28}\;\mathrm{GeV}^2$** (including a negative shift $> 1.63 \times 10^{28}\;\mathrm{GeV}^2$) to align with the $125.25\;\mathrm{GeV}$ physical Higgs. Adding any common non-increasing Laplacian smoothing on right-handed quarks still caps the up/down norm ratio below $1.557$ for the light Higgs on the two tested zeros.
- **The phase blind spot of site-density potentials**: any potential depending only on per-site densities $|h_i|^2$—even non-convex and inter-site coupled—is blind to relative site phases. On #11431, every profile reaching the empirical top-bottom hierarchy exhibits a strictly negative-curvature phase direction ($< -0.006\|h\|^2$) at fixed site densities, ruling it out as a local minimum; every true local vacuum satisfies $m_t / m_b < 2.690$ (and $< 1.796$ for homogeneous convex potentials). Nor is #11431 special: across **all $1{,}238$ consecutive zeros in $[10855, 12092]$**, individual local certificates ($1{,}231$ zeros) and $180$ directional sector certificates ($7$ zeros) prove $m_t / m_b < 30$ at every nonzero local vacuum of charge-3 kinetic energy plus an arbitrary density potential. Even weakening the $117$ non-tree edges on #11431 by $10^{-3}$ only allows Higgs-only tuning to hit $60.80$; enforcing a common two-tier edge geometry across charges still pins density-potential vacua below $3$, while purely real-sign loops force identical up and down singular values.

### 8.2.2 Transport Backreaction and the Minimal Site-Support Ladder

Single-leg one-step shell transport barely registers ($< 2.363\%$ of at least one reference ratio floor). Expanding to all eight combinations of original and one-step transported fields across the three legs ([`ch39-minimal-product-transport.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-minimal-product-transport.py)) does fit all nine charged-fermion masses and full CKM on a single zero (#22027 or #28325, minimally two product transport terms)—but at an untenable price. Every solution matching the norm ratios and top-mass window forces the heavy-to-heavy up-type Yukawa block spectral norm above **$16.63$** on #22027 ($16.68$ on #28325), driving a per-color quartic fermion trace quadratic vacuum coefficient **$> 3.45 \times 10^{34}\;\mathrm{GeV}^2$** that violently disrupts both the Higgs portal of [Chapter 6](ch06-higgs-portals-and-electroweak-scale.md) and the vacuum balance of [Chapter 11](ch11-induced-gravity-and-dark-energy.md). (Twice-iterated rational mass-map filters can suppress the one-loop heavy vacuum shift below $2.49 \times 10^{-9}$ of the dark-energy benchmark on single zeros, yet across three zeros `#11661, #11934, #22027` any shared eight complex coefficients still leave at least one of the six sector ratios **$< 98.7\%$** of target!)

This cross-zero obstruction is a theorem about the eight-term dictionary. If the action is extended to allow up to two nearest-neighbour transports on each leg, adding any single term with a second transport to the original eight lets the three candidates share one set of nine complex coefficients with all six mass ratios above $98.7\%$ of the reference floor, and fifteen of the nineteen additions clear the floor itself; this concerns mass ratios only, and whether nine terms suffice for a complete fit is unknown. With all twenty-seven terms, one set of coefficients reproduces the nine charged-fermion masses and the full CKM matrix at `#11661`, `#11934`, and `#22027` simultaneously. The cost stays on the vacuum side: the zero-by-zero certificate forces the heavy–heavy up-type spectral norm only above $0.2976$, while for this dictionary and every subdictionary any fit pushes the quadratic coefficient of the per-colour heavy-threshold quartic mass trace above $1.13 \times 10^{31}\,\mathrm{GeV}^2$; the existing cross-zero witness has a heavy-block spectral norm above $6.5 \times 10^4$ and a coefficient above $5.7 \times 10^{40}\,\mathrm{GeV}^2$. Giving up cross-zero sharing lowers this cost substantially, but only in the heavy–heavy block: with a separate set of coefficients at each of the three zeros, the nine masses and the full CKM matrix equal their targets exactly and the heavy–heavy up-type spectral norms are below $4.4319$, $4.4289$ and $4.1574$ respectively, under $4\pi$ and above $\sqrt{4\pi}$; for the same coefficients the full unprojected up-type vertex and the mixed block of heavy doublets with light singlets still have spectral norms above $53.7$, and the quadratic coefficient of the quartic trace still exceeds $7.3 \times 10^{32}\,\mathrm{GeV}^2$. The infimum of the heavy–heavy block over exact single-zero fits is therefore bracketed between the zero-by-zero certificate and these upper bounds, and an argument that uses only the condition of an exact fit at that zero cannot give a lower bound above this infimum: proving that a shared fit has a larger heavy block must use the sharing condition ([exact single-zero fits](https://github.com/the-omega-institute/trureturing-experiments/blob/55ea415e5a3274df2401423715e5f1121339982d/experiments/ch39-omega-research/replay/%E5%8D%95%E6%9E%9A%E9%9B%B6%E7%82%B9%E4%B8%8A%E4%BA%8C%E5%8D%81%E4%B8%83%E9%A1%B9%E5%AD%97%E5%85%B8%E5%AD%98%E5%9C%A8%E9%87%8D%E9%87%8D%E4%B8%8A%E5%9E%8B%E5%9D%97%E8%B0%B1%E8%8C%83%E6%95%B0%E4%BD%8E%E4%BA%8E%E5%9B%9B%E7%82%B9%E5%9B%9B%E5%9B%9B%E7%9A%84%E7%B2%BE%E7%A1%AE%E5%AE%8C%E6%95%B4%E5%91%BD%E4%B8%AD%E4%B8%94%E5%90%8C%E4%B8%80%E9%9B%B6%E7%82%B9%E7%9A%84%E9%80%90%E9%9B%B6%E7%82%B9%E8%AE%BA%E8%AF%81%E4%B8%8D%E8%83%BD%E7%BB%99%E5%87%BA%E6%9B%B4%E9%AB%98%E4%B8%8B%E7%95%8C.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/55ea415e5a3274df2401423715e5f1121339982d/experiments/ch39-omega-research/replay/ch39-single-zero-heavy-block-double-hop-hit.py)). An exact shared fit does exist: within relative distance $10^{-9}$ of the cross-zero witness above there is one set of twenty-seven coefficients which, with a Higgs vacuum direction chosen separately at each zero, makes the nine masses and the full CKM matrix equal their targets exactly at all three zeros, with heavy–heavy up-type spectral norms in $(66633.4, 66633.5)$, $(66488.6, 66488.7)$ and $(65983.2, 65983.3)$ respectively. The sharing condition also yields a higher certified lower bound: whenever one set of coefficients gives every sector's mass matrix its target Frobenius norm at all three zeros (a complete fit satisfies this), the largest of the three heavy–heavy spectral norms exceeds $0.6233$, above the largest zero-by-zero bound $0.4473$ at these zeros; the bound constrains the maximum of the three, not each of them. The infimum of that maximum over shared complete fits therefore lies in $(0.6233, 66633.5)$, and whether it exceeds $\sqrt{4\pi}$, $4.44$ or $4\pi$ is undecided; the new lower bound is still below the upper bounds from single-zero fits, so one cannot yet assert that sharing raises the infimum ([exact shared fit and joint lower bound](https://github.com/the-omega-institute/trureturing-experiments/blob/444f698dc38dbbc4252ea49d8f91d5c66038c094/experiments/ch39-omega-research/replay/%E4%B8%89%E9%9B%B6%E7%82%B9%E5%85%B1%E7%94%A8%E4%BA%8C%E5%8D%81%E4%B8%83%E9%A1%B9%E7%B3%BB%E6%95%B0%E7%9A%84%E7%B2%BE%E7%A1%AE%E5%AE%8C%E6%95%B4%E5%91%BD%E4%B8%AD%E5%AD%98%E5%9C%A8%E4%B8%94%E5%85%B1%E7%94%A8%E6%9D%A1%E4%BB%B6%E6%8A%8A%E4%B8%89%E9%9B%B6%E7%82%B9%E9%87%8D%E9%87%8D%E4%B8%8A%E5%9E%8B%E5%9D%97%E8%B0%B1%E8%8C%83%E6%95%B0%E6%9C%80%E5%A4%A7%E5%80%BC%E7%9A%84%E4%B8%8B%E7%95%8C%E6%8A%AC%E5%88%B0%E9%9B%B6%E7%82%B9%E5%85%AD%E4%BA%8C%E4%B8%89%E4%B8%89.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/444f698dc38dbbc4252ea49d8f91d5c66038c094/experiments/ch39-omega-research/replay/ch39-shared-zero-exact-hit-and-joint-heavy-bound.py)). Whether a complete single-zero fit with the heavy–heavy block below $\sqrt{4\pi}$ exists remains open ([transferability and heavy-block bounds for the extended dictionary](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/%E6%AF%8F%E8%85%BF%E8%87%B3%E5%A4%9A%E4%B8%A4%E6%AC%A1%E9%82%BB%E8%BE%B9%E8%BE%93%E8%BF%90%E6%97%B6%E7%AC%AC%E4%B9%9D%E9%A1%B9%E5%8D%B3%E8%A7%A3%E9%99%A4%E4%B8%89%E9%9B%B6%E7%82%B9%E5%85%B1%E5%90%8C%E7%B3%BB%E6%95%B0%E7%9A%84%E8%B4%A8%E9%87%8F%E6%AF%94%E9%9A%9C%E7%A2%8D.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/e89ffddb8b8e299add2ac0edca523c221a17a4f8/experiments/ch39-omega-research/replay/ch39-per-leg-double-hop-transfer.py)).

Scanning site sparsity on #11431 exposes an equally sharp support ladder: achieving the $1\;\mathrm{TeV}$ $m_t / m_b$ hierarchy requires at least **$8$ sites** (exactly six subsets work, all forcing $m_c / m_t > 0.559$; $9$ sites still force $> 0.208$; $10$ sites force $> 0.01$; a $12$-site support matches $t, b, c$); any **$14$ sites** suffice to fit both $m_t / m_b$ and the second-generation ratios $m_c / m_t, m_s / m_b$ (and any $18$ sites fit both full quark matrices); yet solving the stationarity equations of any differentiable density potential requires at least **$16$ nonzero sites**, because sparser profiles leave strictly positive field-equation residuals on empty sites.

Why do the light subspaces of distinct hypercharges naturally misalign in site-local vertices? Comparing the three charge-$1$ light modes directly against those of charges $2$ and $-4$ on the joint witness zero #2,306,888,100,085 of [Chapter 9](ch09-proton-stability-and-baryon-triality.md) and [Chapter 13](ch13-winding-ladder-and-joint-vacuum.md) exposes the geometric cause ([`ch39-joint-zero-light-subspaces.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-joint-zero-light-subspaces.py)): even allowing an arbitrary diagonal phase on each of the 19 sites to align them, a uniform charge-$1$ light input still leaks into the other charge's **heavy subspace** with probability exceeding **$38.321\%$** (charge $2$) and **$37.290\%$** (charge $-4$); even allowing arbitrary permutations of all 19 vertices still leaves heavy leakage above **$31.060\%$** and **$31.097\%$**! That intrinsic site-basis misalignment across hypercharges is the geometric root behind every single-Higgs and site-local Yukawa obstruction.

## 8.3 Rational Cayley Folding, Gram Unitary Extension, and Four-Step Newton Approximation {#sec-ch08-cayley-folding}

Compressing discrete shell flavor operators into low-energy mass and mixing matrices without floating-point drift rests on two exact algebraic theorems—the **rational Cayley-adjoint rotation law** and **complex Gram unitary extension**—both frozen in Lean:

::: {.theorem #thm-ou-ch08-cayley-orthogonal title="Orthogonality of the 3D Rational Cayley Transform and Adjoint Homomorphism" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom"}
In `OmegaCayleyRotation`, let `Cayley s` denote the $3 \times 3$ rational Cayley rotation matrix generated by `s : RatVec3`, and let `Ad p` denote the rational adjoint action of a nonzero quaternion `p : Quaternion` on `RatVec3`. Then both identities hold:

1. **Rational Cayley orthogonality** (`cayley_orthogonal`): for every `s : RatVec3`, under `RatMat3.Equiv`,

   $$
   \operatorname{Cayley}(s)^\top \operatorname{Cayley}(s) \;\equiv\; I_3.
   $$

2. **Adjoint homomorphism** (`ad_hom`): for all nonzero quaternions `p, q : Quaternion` and every `v : RatVec3`, under `RatVec3.Equiv`,

   $$
   \operatorname{Ad}(p q)(v) \;\equiv\; \operatorname{Ad}(p)\bigl(\operatorname{Ad}(q)(v)\bigr).
   $$

:::

::: {.proof}
For the first statement, expand `Cayley s` into its integer numerator matrix over the common denominator $1 + s_1^2 + s_2^2 + s_3^2$ and check all nine entries of $\operatorname{Cayley}(s)^\top \operatorname{Cayley}(s)$: after cross-multiplying, the three diagonal entries equal the squared denominator and all six off-diagonal entries vanish by polynomial ring identities. For the second statement, combine quaternion associativity, conjugation anti-multiplicativity $\overline{pq} = \bar{q}\bar{p}$, and multiplicativity of the four-square norm $\|pq\|^2 = \|p\|^2 \|q\|^2$, canceling the nonzero norm factors under rational vector equivalence to reduce $\operatorname{Ad}(pq)(v)$ to $\operatorname{Ad}(p)(\operatorname{Ad}(q)(v))$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ou-ch08-gram-unitary title="Left Unitary Extension from Equal Complex Gram Matrices" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
Let $m$ be a finite decidable index type, let $n$ be a finite index type, and let $A, B \in M_{m \times n}(\mathbb{C})$ be complex matrices with identical Hermitian Gram matrices:

$$
B^* B = A^* A.
$$

Then there exists a unitary matrix $U \in \mathrm{U}(m, \mathbb{C})$ such that

$$
B = U A.
$$

:::

::: {.proof}
The Gram equality $B^* B = A^* A$ implies that the assignment $A x \mapsto B x$ is well defined and strictly isometric on $\operatorname{ran}(A) \subseteq \mathbb{C}^m$ (since $\|B x\|^2 = \langle x, B^* B x\rangle = \langle x, A^* A x\rangle = \|A x\|^2$, hence $\ker(A) = \ker(B)$). It therefore defines a linear isometry between $\operatorname{ran}(A)$ and $\operatorname{ran}(B)$, which have equal complex dimension, so their orthogonal complements $\operatorname{ran}(A)^\perp$ and $\operatorname{ran}(B)^\perp$ also share equal dimension. Choosing orthonormal bases of the two complements and mapping one onto the other extends the partial isometry to a global unitary operator $U \in \mathrm{U}(m, \mathbb{C})$ satisfying $U(A x) = B x$ for every $x$, i.e., $B = U A$. The full proof is checked by the Lean kernel.
:::

[@thm-ou-ch08-cayley-orthogonal] and [@thm-ou-ch08-gram-unitary] sharpen the exact boundaries of unitary flavor folding ([`ch39-unitary-fold-dilation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-unitary-fold-dilation.py), [`ch39-finite-rational-fold-accuracy.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-rational-fold-accuracy.py)):

- **Dimension floors across the zero-Higgs point**: compressing three charged generations via a $90^\circ$ unitary folding at the electroweak vacuum already requires at least **$42$ dimensions per side** (rising to **$48$** when full left weak doublets are included). Extending strict unitary folding continuously across the **zero-Higgs background** ($H = 0$) lifts the exact minimum to **$45$ dimensions per side**, with equality requiring physical gauge representations in the opposite auxiliary space—while finite-degree rational unitary blocks encounter degree obstructions testable at finitely many rational points, and saturating the top-mass folding ceiling drives the smooth radial Higgs vertex to zero.
- **Four-step rational Newton folding**: replacing rigid single-step folding with **four rational Newton steps** across the contraction window ($\sigma_{\max} \le 4/5$) maintains exact unitarity throughout, approximates linear masses to relative error **$\le 4^{-16}$**, keeps Frobenius derivative errors below $2.03 \times 10^{-8}$ times the perturbation norm, and preserves all four quark-mixing observables on #22027 and #28325. Yet collider physics keeps watch: combining strict rational Cayley slopes with the minimal color-sextet top sector of [Chapter 6](ch06-higgs-portals-and-electroweak-scale.md) pushes the leading-order gluon-fusion to $t\bar{t}H$ ratio above **$2.91467\times$** the Standard Model value across all $26$ assignments and all five light-quark slope signs.

## 8.4 Positive CKM Reconstructions, Minimal Directional Coupling, and Cross-Zero Rigidity {#sec-ch08-ckm-reconstructions}

With five naive mechanisms cleared away, what *can* the 19-point Behrend shell's arc phases and boundary ports build? Four positive reconstructions mark the active frontier—and simultaneously uncover an astonishing cross-zero rigidity theorem.

### 8.4.1 Six-Triangle Singlet Phase, 28-Winding Mirror Triangle, and Seven-Zero Rational Response

1. **Six-triangle electroweak-singlet phase and cross-zero transfer**: driving an electroweak-singlet flavor scalar by the mean real holonomy of the six shortest-third-edge dual-clock triangles yields isolated conjugate CP-breaking vacua via a sextic real potential ([`ch39-chiral-neutral-flavor-phase.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-chiral-neutral-flavor-phase.py)). Calibrating real quark coefficients on **#11661** and transferring them **unchanged** to other triple-window zeros yields:
   - **#11934**: $|V_{ub}| \approx 0.001943$;
   - **#12207**: $|V_{ub}| \approx 0.004011$;
   - **#28325**: $|V_{ub}| \approx 0.003669$ (simultaneously passing two-loop $\alpha_s \approx 0.11838$ and four-layer curvature ratio $0.999411$);
   - **#8359**: $|V_{ub}| \approx 0.002873$ ($23.026\%$ below reference).

   Why must this extra flavor carrier be an electroweak singlet rather than a second dynamical weak Higgs doublet? Adding a second complex weak doublet at $125.25\;\mathrm{GeV}$—even with zero new Yukawa couplings—pushes the two-loop inferred strong coupling $\alpha_s(M_Z)$ above **$0.1251$** on #11661, #11934, and #12207, breaking the Question 1 unification window!
2. **28-winding mirror triangle vs. 42-winding baseline**: allowing arbitrary real orthogonal flavor rotations and taking CP phase solely from closed quark triangles across candidate zeros, the original five-zero baseline requires exactly **$42$ windings** to reproduce reference CKM ($41$ windings cap the quartic phase angle at $1.115814\;\mathrm{rad}$ vs. the reference $1.139034\;\mathrm{rad}$). Switching to the **mirror triangle $(28325, 48067, 58214)$** cuts the exact minimum to **$28$ windings**—and both #48067 and #58214 independently clear all three physical windows (two-loop $\alpha_s \approx 0.11844, 0.11833$; fixed-calibration $|V_{ub}| \approx 0.00205, 0.00460$).
3. **Two-boundary-site five-pulse protocol and the finite rational response $(I + T^{16})^{-1}$**: gating Cayley rotations ([@thm-ou-ch08-cayley-orthogonal]) by the charge-1 light-space projector, any sequence of real pulses at a single fixed vertex forces $J = 0$. Using **two boundary ray endpoints**, however, **five calibrated pulses** rebuild full reference CKM on #28325 and transfer directly to $|V_{ub}| \approx 0.003799$ on #48067 and $0.003746$ on #58214 (with an irreducible $> 1.0548$ first-to-last intensity asymmetry across seven zeros). Upgrading pulses to a purely edge-local **finite rational shell response** with $T = \frac{3}{4} L_n (L_n - cI)$ and

   $$
   R_n := \bigl(I + T^{16}\bigr)^{-1},
   $$

   constructed from native edges and three boundary sites with a single rational strength set calibrated on #28325, matches the ideal CKM gates across **all seven triple-window zeros to within $10^{-11}$**, while holding light-to-heavy probability leakage strictly below **$1.70 \times 10^{-30}$**!
4. **Minimal directional coupling floor $|\lambda| > 0.03010$**: if a fixed radial-preserving Hermitian shell action generates the quark flavor directions, decomposing its antisymmetric directional piece as $\lambda\, i[\Pi_1, \Pi_2]$ (from the two clock-edge unit-normal projectors $\Pi_1, \Pi_2$) enforces

   $$
   |\lambda| \;>\; 0.03010
   $$

   across the entire CKM parameter box—accounting for arbitrary real symmetric terms, arbitrary mass-basis rephasings, and all Hermitian logarithm branches—with the exact central-CKM optimum trapped in $(0.03898381516, 0.03898381517)$. Every purely real symmetric fixed shell action is therefore ruled out.

The table below collects all four positive CKM reconstructions alongside their required calibrations and structural floors:

| Positive CKM protocol | Phase / rotation driver | Precision and cross-zero readouts | Calibration input or structural floor |
| :--- | :--- | :--- | :--- |
| Six-triangle EW singlet phase | Mean real holonomy of 6 shortest-edge dual-clock triangles + sextic potential | #11661 calibration transfers to #11934 / #12207 / #28325 with $|V_{ub}| \approx 0.00194 / 0.00401 / 0.00367$ | Must be an EW singlet (2nd weak doublet drives $\alpha_s > 0.1251$); flavor coefficients calibrated on #11661 |
| Mirror-triangle winding loop | Mirror triple $(28325, 48067, 58214)$ + arbitrary real rotations | Rebuilds reference CKM in exactly **$28$ windings** (vs. **$42$ windings** on original 5-zero baseline) | Real flavor rotations fit reference CKM; physical loop-selection rule remains open |
| Two-boundary-site five pulses | Charge-1 light-projected Cayley pulses on 2 boundary ray endpoints | 5 pulses rebuild CKM on #28325; transfer to #48067 / #58214 gives $|V_{ub}| \approx 0.00380 / 0.00375$ | Any single site forces $J = 0$; first/last intensity ratio exceeds $1.0548$ across 7 zeros |
| Finite rational shell response | $(I + T^{16})^{-1}$, $T = \tfrac{3}{4}L_n(L_n - cI)$, 3 boundary sites | Matches ideal CKM light block to **$10^{-11}$** across **all 7 zeros**; heavy leakage **$< 1.70 \times 10^{-30}$** | Rational strengths calibrated on #28325; fixed Hermitian actions require $|\lambda| > 0.03010$ |

### 8.4.2 The Cross-Zero Fixed-Matrix Rigidity Ladder

Why did the seven-zero protocol above *have* to be written as a zero-covariant spectral function $(I + T^{16})^{-1}$ rather than a single constant $19 \times 19$ matrix? The rigidity ladder below answers with exact integer counts ([`ch39-common-local-rigidity.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-common-local-rigidity.py), [`ch39-covariant-edge-weight-rigidity.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-covariant-edge-weight-rigidity.py)):

::: {.remark #rem-ou-ch08-rigidity-ladder title="The Cross-Zero Rigidity Ladder: Algebraic Collapse at 2, 5, and 7 Zeros"}
| Shared zero count and set | Admissible matrix or dynamical class | Forced algebraic collapse | Sharpness note |
| :--- | :--- | :--- | :--- |
| **$2$ zeros** (#28325 with #22027 / #48067 / #58214) | Fixed $19 \times 19$ unitary preserving light spaces | **Forbids flavor mixing** (fixing #28325 CKM forces $\ge 6.94 \times 10^{-9}$ heavy leakage on #48067) | Static shared unitary gates fail immediately |
| **$2$ zeros** (#28325, #48067) | Zero-varying edge phases + shared site potentials and edge kinetic weights | Unique operator family **$a I + b L_n$** | With independent directed edge currents, sharp count is **$5$ zeros** |
| **$5$ zeros** (`28325, 48067, 58214, 22027, 11661`) | Fixed local generators supported on native shell edges | Collapses to **scalar multiples $\mathbb{C}I$** | Any $4$ zeros still leave a non-scalar local candidate |
| **$7$ zeros** (adding `11934, 12207`) | Arbitrary all-site (non-local) fixed $19 \times 19$ matrices | Collapses to **quadratic polynomials in cyclic shift $P$** | $7$ is strictly sharp |
:::

This rigidity table eliminates every shortcut: any zero-independent matrix that respects the light-heavy split across a handful of zeros collapses into trivial scalars or cyclic polynomials. A universal mixing law across Riemann-zero backgrounds *must* be a connection-covariant spectral operator.

::: {.film src="folding-the-mixing-matrix"}
**The cycle locks mixing out, certificates raise the walls, rational Cayley rotations and Gram unitary extension supply exact folding tools, and a common flavor law stays open (2 min 42 s).** Seen down the $(1, 1, 1)$ axis, the nineteen cyan integer points turn a third of a turn about the amber pole $(17, 17, 17)$ under the coordinate cycle and fall into six orbits of three (computed on screen); if $H_u$ and $H_d$ both commute with $T$, the $|V_{\mathrm{CKM}}|$ grid keeps only a permutation pattern (violet, written argument). The chord $\sqrt{3}$ between cube roots of unity and $0.035 \times 0.98 = 0.0343$ are computed on screen, and the magenta near-symmetric zone is excluded by the $0.0414$ floor ([@ex-ou-ch08-commutator-floor], hand derivation). On one shared log ruler, cyan reachable ranges and magenta gaps show the ceilings certified in Section 8.2 (`NUM`). For $s = (1/3, 2/3, 2/3)$ the Cayley rotation is a matrix of ninths whose rows have length one; the green tags refer to the orthogonality and quaternion adjoint homomorphism of [@thm-ou-ch08-cayley-orthogonal]. Two column pairs share the Gram matrix $\begin{pmatrix} 4 & 2 \\ 2 & 5 \end{pmatrix}$, the violet arc $U$ turns one onto the other, and the green tag refers to [@thm-ou-ch08-gram-unitary]; the folding dimension floors, the 28-winding mirror triangle, the response $(I + T^{16})^{-1}$ calibrated on #28325 (amber), and the two-, five- and seven-zero rigidity ladder are replay certificates ([@rem-ou-ch08-rigidity-ladder]); the red closing panel is the open problem [@prob-ou-ch08-common-flavor-law].
:::

### 8.4.3 Lepton–Neutrino Witnesses, Universal 3D Nelson–Barr Strong CP Realization, and Transport Gram Heavy-Block Bounds {#sec-ou-ch08-leptons-nelsonbarr-gram-bounds}

For the flavor half of Question 3 (tracking issue `#2375`), independent derivations and companion verifications pin down three structural boundaries covering the lepton sector, the Strong CP mechanism, and the origin of transport heavy-block penalties:

| Audit Axis | Exact Statement or Construction | Quantitative Outcome & Scope | Epistemic Tier |
| :--- | :--- | :--- | :--- |
| Neutral shell spectrum, seesaw & thermal leptogenesis | Exact factorization of $\det(xI - L_0(0))$; four-component seesaw calibrated to NuFit 6.0 benchmarks | Light modes $\{0, 15.23524308, 15.23524308\}$ (one per character); unflavored ($M_1=5\times 10^{12}\,\mathrm{GeV}$) and two-flavor ($2\times 10^{11}\,\mathrm{GeV}$) benchmarks both hit $\eta_B = +6.10\times 10^{-10}$; full sterile symmetric trace $4.584\times 10^{29}\,\mathrm{GeV}^2$ | ARGUED / NUM |
| Direct-clock Strong CP obstruction & universal 3D Nelson–Barr | Single $\mathbb{Z}_2$-odd vectorlike quark pair $(D_L,D_R)$ $+$ complex singlet $\Sigma$ in the decoupling limit | Direct-clock phases reach $(-0.125,-0.078)\,\mathrm{rad}$ (#11661 six-triangle witness leaves $3.289\times 10^{-5}\,\mathrm{rad}$); TeV witness ($M_F\approx 2.153\,\mathrm{TeV}$) gives $J=3.080\times 10^{-5}$, 1-loop $+6.407\times 10^{-12}$, 2-loop log $-8.347\times 10^{-14}$, dim-5 $\le 7.946\times 10^{-12}$, window $538.55\,\mathrm{GeV} < |\Sigma| < 11.763\,\mathrm{TeV}$ | ARGUED / NUM |
| Sharp transport Gram heavy-block bounds vs. angle counterexample | Reciprocal Frobenius infimum $\Gamma = \|A G_B^{+1/2}\|_{\rm op}$ and hierarchy-conditioned PSD certificates | Two-site counterexample shows principal angles alone force no heavy floor; unconstrained fixed-$h$ operator ratios sit at $0.0349$ ($8$ terms) / $0.00514$ ($27$ terms), jumping to $16.637$ / $0.2977$–$0.4473$ once $r_d, r_e$ hierarchy constraints are enforced | ARGUED / NUM |

1. **Neutral Shell Characteristic Polynomial, Cyclic Majorana Degeneracy, and Thermal Leptogenesis Witnesses (ARGUED / NUM).** At $\delta = 0$, the 19-site neutral Laplacian factors exactly as

$$
\det(xI - L_0(0))
\;=\;
x(x-19)^4(x-17)^3(x-11)^3(x^2-28x+191)(x^3-41x^2+537x-2201)^2.
$$

The cut $|\lambda(\lambda - c_0)| < 9$ ($c_0 = 15 - \delta/3$) stably retains $\{0, 15.23524308, 15.23524308\}$ across $0 \le \delta \le 10^{-8}$ (one mode in each $\mathbb{Z}_3$ character, margin $>5.416$). In the unbroken cyclic vacuum, any single-character symmetric Majorana mass matrix (both sterile $M_R$ and active $m_\nu$) is locked by character selection into two degenerate Takagi singular values $(|a|, |b|, |b|)$, while simple left Grams enforce permutation mixing—so large PMNS angles and nonresonant leptogenesis equally require breaking the shell cycle. Adopting the consistent four-component seesaw $m_\nu = -v^2 Y_\nu M_R^{-1} Y_\nu^T = U_\nu D_m U_\nu^T$ ($v = 174\,\mathrm{GeV}$, charged current $U_e^\dagger U_\nu$) calibrated to benchmark NuFit 6.0 normal-ordering inputs ($m_1 = 5\,\mathrm{meV}$, $\Delta m_{21}^2 = 7.41\times 10^{-5}\,\mathrm{eV}^2$, $\Delta m_{31}^2 = 2.51\times 10^{-3}\,\mathrm{eV}^2$, $\sin^2\theta_{12,23,13} = (0.307, 0.546, 0.0220)$, $\delta_{\rm PMNS} = -\pi/2$, giving $J_{\rm PMNS} = -0.03331273$), decay/inverse-decay kinetic integration ($z_T = 0.2 \to 45$) achieves $\eta_B = +6.10\times 10^{-10}$ in both unflavored ($M_1 = 5\times 10^{12}\,\mathrm{GeV}$) and two-flavor ($M_1 = 2\times 10^{11}\,\mathrm{GeV}$) benchmarks, both strictly below the sharp Davidson–Ibarra supremum $|m^2 - ab| \le (b-a)m$. Spectral-projector compression on the optimal station triple $(11,25,11),(23,17,7),(25,11,11)$ ($\sigma_{\min}=0.249519$) zeroes the heavy–heavy blocks identically, leaving only the physical sterile contribution to the bare Higgs quartic mass trace: for the symmetric seesaw matrix $\mathcal{M} = \left(\begin{smallmatrix}0 & hY_\nu\\ hY_\nu^T & D_M\end{smallmatrix}\right)$, the exact $h^2$ coefficient of the full trace $\operatorname{Tr}[(\mathcal{M}^\dagger \mathcal{M})^2]$ is $4\operatorname{Tr}(D_M^2 Y_\nu^\dagger Y_\nu) = 4.5839652\times 10^{29}\,\mathrm{GeV}^2$ (Weyl-normalized half-trace $2\operatorname{Tr} = 2.2919826\times 10^{29}\,\mathrm{GeV}^2$). By contrast, inside the 27-term transport dictionary at fixed Higgs vector, the neutrino heavy–heavy Frobenius minimizer still forces a spectral lower bound $5.15337 > \sqrt{4\pi}$ and a heavy–heavy trace of $1.1154\times 10^{32}\,\mathrm{GeV}^2$.

2. **Direct-Clock Strong CP Obstruction and Universal 3D Single-Pair Nelson–Barr Realization (ARGUED / NUM).** At the joint zero in fixed axial frames, four representative direct-clock transport monomials yield $\arg\det(Y_u Y_d) \in (-0.1254, -0.0780)\,\mathrm{rad}$ (proving generic non-cancellation, with zero locus of measure zero), and even the six-triangle #11661 reconstruction of Section 8.4.1 retains a light determinant phase of $3.28907\times 10^{-5}\,\mathrm{rad}$. Imposing microscopic CP ($\theta = 0$, real ordinary Yukawas) and introducing one $\mathbb{Z}_2$-odd down-like vectorlike quark pair $(D_L, D_R)$ plus one complex singlet $\Sigma$ yields a **universal 3D realization theorem**: every positive-definite Hermitian target $H = G + iC$ (whitened skew part $G^{-1/2} C G^{-1/2} = \rho(xy^T - yx^T)$, $0 \le \rho < 1$, plane projector $P = xx^T + yy^T$, $a = 2\rho/(1+\rho)$) is reproduced identically in the decoupling limit $m\bigl(I - F^\dagger F/(M_D^2 + FF^\dagger)\bigr)m^T = H$ by the strictly real invertible matrix

$$
m \;=\; G^{1/2}\Bigl(I + \bigl[(1 - a/2)^{-1/2} - 1\bigr] P\Bigr),
\qquad
\frac{F}{M_D} \;=\; \sqrt{\frac{a}{2(1-a)}}\,(x - iy)^T,
$$

with tree-level $\bar\theta = 0$ on the positive determinant branch. In an explicit TeV witness ($M_D = |\Sigma| = 1\,\mathrm{TeV}$, physical heavy mass $2.153\,\mathrm{TeV}$), exact $4\times 4$ diagonalization yields $J_{\rm CKM} = 3.0800000\times 10^{-5}$; exact zero-momentum one-loop portal matching ($\lambda_R = \lambda_I = 0.01$) gives $\Delta\bar\theta^{(1)} = +6.4074\times 10^{-12}$, the fermion-induced two-loop portal logarithm ($\Lambda = 10^5\,\mathrm{GeV}$) gives $-8.3466\times 10^{-14}$, and all $256$ unit-cube vertices of the allowed dimension-five operators satisfy $|\Delta\bar\theta| \le 7.9462\times 10^{-12}$, leaving a perturbative specified-threshold window $538.55\,\mathrm{GeV} < |\Sigma| < 11.763\,\mathrm{TeV}$ on the fixed $M_D = 1\,\mathrm{TeV}$ slice (deriving UV CP sequestering from dynamical links and completing full finite two-loop matching remain open, OPEN).

3. **Sharp Transport Gram Heavy-Block Inequalities vs. Hierarchy-Driven Penalties (ARGUED / NUM).** Fixing a Higgs vector $h$ and coefficient space $E$, let $A$ and $B$ vectorize the light–light and heavy–heavy blocks (with Gram matrices $G_A = A^\dagger A$ and $G_B = B^\dagger B$). Whenever $\ker B \subseteq \ker A$ and $A, B \ne 0$, the sharp reciprocal Frobenius infimum equals $\Gamma = \|A G_B^{+1/2}\|_{\rm op}$, yielding for every $Aw \ne 0$ the operator-norm floor

$$
\frac{\|\operatorname{mat}(Bw)\|_{\rm op}}{\|\operatorname{mat}(Aw)\|_{\rm op}}
\;\ge\;
\frac{1}{\sqrt{r_B}\,\Gamma}.
$$

A two-site counterexample ($P_L = |1\rangle\langle 1|$, $P_R = |2\rangle\langle 2|$, one-hop $Y = |1\rangle\langle 2|$ vs. $|2\rangle\langle 1|$) proves that principal angles and site leakage alone imply neither a positive heavy–heavy lower bound nor an upper cap. At #22027, #28325, and #2,306,888,100,085, unconstrained fixed-$h$ operator-ratio brackets stay small—$[0.0349, 0.1048]$ ($8$ terms) and $[0.00514, 0.0127]$ ($27$ terms)—whereas enforcing the required light mass-hierarchy ratios $r_d = 61.365$, $r_e = 84.981$ via positive-semidefinite Gram certificates $s G_{\rm HH} - U + \mu(D - U) \succeq 0$ lifts the floors to $16.637$–$16.687$ ($8$ terms) and $0.2977$–$0.4473$ ($27$ terms), demonstrating that the severe heavy-block penalty of Section 8.2 is driven by cross-sector hierarchy constraints rather than light-subspace angles alone.

::: {.problem #prob-ou-ch08-common-flavor-law title="Open Flavor Horizon of Question 3: Deriving Spectra and Mixing from One Common Arc Action"}
This chapter has charted the exact flavor boundaries of the 19-point Behrend shell: the cyclic-breaking floor $\max_{X\in\{A,B\}}\|[T,X]\|_{\mathrm{HS}}>0.0428$, five families of Yukawa hierarchy obstructions, four-step rational Newton folding ($4^{-16}$ precision), the directional coupling floor $|\lambda| > 0.03010$, five- and seven-zero fixed-matrix rigidity, and the finite rational response $(I + T^{16})^{-1}$ tracking seven zeros to $10^{-11}$. Two major pillars remain open:

1. **First-principles flavor action**: every successful CKM reconstruction (six-triangle singlet, 28-winding mirror triangle, five-pulse boundary gate, and $(I + T^{16})^{-1}$) still calibrates its flavor tensors, real rotations, or pulse strengths to reference CKM data rather than deriving them from the shell partition function.
2. **Unified quark-lepton folding**: deriving all quark, charged-lepton, and neutrino masses together with PMNS mixing from a single low-dimensional folding operator—without collapsing $m_u / m_\ell$ or triggering a $10^{34}\;\mathrm{GeV}^2$ heavy-block quartic trace—remains unsolved.
:::

We have measured the flavor cliffs; yet the second half of Question 3 looms with an older, starker threat. Once quarks and leptons share a unified ledger, **will the proton decay?** The next chapter confronts the dimension-six $QQQL$ operator head-on and measures the exact algebraic and anomaly-inflow price of baryon triality.
