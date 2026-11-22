# 35.6.8.6 Tridiagonal localization and open-chain spectral distance {#sec-ch39-s05-s08-s06-open-chain-spectrum}

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="Localizing the Lower Norm of a Tridiagonal Operator with Both Boundary Residuals"}
Let $A$ be a bounded complex-linear operator on $H=\ell^2(\mathbb Z;\mathbb C)$. Assume only that its matrix entries $A_{ij}=(Ae_j)_i$ vanish for $|i-j|>1$, where $e_j$ is the coordinate unit vector at $j$. Even an input on a single site $j$ can produce output on all three sites $j-1,j,j+1$. For each integer $n\ge1$ and $k\in\mathbb Z$, let $E_{n,k}$ be the subspace of vectors supported on $k+1,\ldots,k+n$. The restriction $A|_{E_{n,k}}$ still takes values in $H$. Its $(n+2)\times n$ matrix retains rows $k$ and $k+n+1$ in the output norm. Taking the $n\times n$ principal submatrix would discard both rows.

Read the three coefficient sequences directly from $A$ as $a_i=A_{i,i-1}$, $b_i=A_{ii}$ and $c_i=A_{i,i+1}$. All three are bounded because $|A_{ij}|\le\|Ae_j\|\le\|A\|$. Write $M_-=\sup_i|a_i|$ and $M_+=\sup_i|c_i|$, with both suprema over $\mathbb Z$. Let $(Ux)_i=x_{i-1}$ and let $M_f$ denote coordinatewise multiplication by $f$. The bilateral shift $U$ preserves the norm (`updateLinearIsometryEquiv`), and the multiplication operator has norm equal to the supremum norm of its coefficients (`diagonalOperator_norm`). The three terms agree with $A$ on every $e_j$. By `lp.ext_continuousLinearMap` in the pinned Mathlib, the identity extends to all of $H$,

$$
\begin{aligned}
A &= M_a U+M_b+M_c U^{-1},\\
(Ax)_i &= a_i x_{i-1}+b_i x_i+c_i x_{i+1}.
\end{aligned}
$$

For a bounded operator $B$ with nonzero domain, write $\nu(B)=\inf_{\|x\|=1}\|Bx\|$ for its lower norm. Each window contains the unit vector $e_{k+1}$. For a given window length $n$, the lower norms satisfy

$$
\begin{aligned}
\inf_{k\in\mathbb Z}\nu(A|_{E_{n,k}})&\le \nu(A)+\delta_n,\\
\delta_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

For fixed $A$, the error bound is $O(1/n)$. The sine factor measures the cost of shifting the window weights by one site. Put $\theta=\pi/(n+1)$ and take $w_j=\sin(j\theta)$ for $1\le j\le n$, with $w_j=0$ elsewhere. Multiply the sine recurrence $w_{j-1}+w_{j+1}=2\cos(\theta)w_j$ (`sine_reference_eigenvector`) by $w_j$ and sum over the window. Writing $S=\|w\|^2>0$ and expanding the squared differences gives

$$
\begin{aligned}
T=\|Uw-w\|^2 &= \sum_{j=0}^{n}(w_{j+1}-w_j)^2\\
&=2(1-\cos\theta)S=4\sin^2(\theta/2)S .
\end{aligned}
$$

For $n=1$ the weights rise from $0$ to $1$ and fall back to $0$, so each end contributes one squared difference. For any $x\in H$, form the windowed vectors $(D_kx)_i=w_{i-k}x_i$. At fixed $i$, summing over $k$ gives a total squared mass of $S|x_i|^2$. Hence $\sum_k\|D_kx\|^2=S\|x\|^2$, even for $x$ of infinite support. In $AD_kx-D_kAx$ the diagonal terms cancel. By the shift-difference formula in [@thm-observer-read-update-commutator] and its bounded-operator factorization `readout_update_commutator_factorization`, the two off-diagonals contribute backward and forward differences of the weights. Both differences have norm $\sqrt T$. Applying the triangle inequality to the entire family of outputs in $\ell^2(\mathbb Z;H)$ gives

$$
\left(\sum_k\|AD_kx\|^2\right)^{1/2}
\le \sqrt S\,\|Ax\|+(M_-+M_+)\sqrt T\,\|x\|.
$$

Given any $\eta>0$, choose a unit vector $x$ with $\|Ax\|<\nu(A)+\eta/2$ and put $q=\|Ax\|+\delta_n+\eta/2$. If $\|AD_kx\|\ge q\|D_kx\|$ held for every window, the left side would be at least $q\sqrt S$, while the right side equals $(q-\eta/2)\sqrt S$. Thus some integer $k$ satisfies the strict reverse inequality and $D_kx\ne0$. Normalizing $D_kx$ gives a specific $u\in E_{n,k}$ with $\|u\|=1$ and $\|Au\|<\nu(A)+\delta_n+\eta$. Taking the infimum over positions and letting $\eta$ tend to zero gives the stated bound. The argument applies when an infimum is unattained, when $A$ is nonselfadjoint, and when either or both off-diagonals vanish identically.

This scalar complex Hilbert-space application uses the localization estimate of Chandler-Wilde, Chonchaiya and Lindner (§5.1, Proposition 5.1 and Corollary 5.2, pp. 765–766, with the sine window on p. 767). Spectral inclusion and optimality of the error constant each require a separate argument. [*On spectral inclusion sets and computing the spectra and pseudospectra of bounded linear operators*, *J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)

A gap estimate for finite Tribonacci open chains via this route would still require proving that $0$ belongs to the spectrum of the corresponding whole-line model, transplanting the actual word interval together with one neighboring site on each side into the specified finite open prefixes, and checking length ratios and small scales. The proof of [@thm-ch39-p2e-tribonacci-open-chain-zero-gap] works directly with finite matrices. The relation between the physical cut of the chain and the internal window geometry remains to be established. Spatial entanglement scaling of the chain's Slater state is posed in [@prob-ch39-p2e-fractal-horizon].
:::

A second finite-matrix route uses an odd repeated block. An odd shift exchanges even and odd bonds, allowing two strings of hopping ratios from forward substitution to be paired. The following bound expresses that cancellation in entries of the actual inverse matrix.

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="Inverse-Mass Bound for an Odd Repeated Block" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
Let $q\in\mathbb{N}$ and $t:\mathbb{N}\to\mathbb{R}$ satisfy $0<t(i)\le1$ for every $i\in\mathbb{N}$, and assume

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

Set $n=2q+1$. Index the lower bidiagonal matrix $L\in\mathbb{R}^{n\times n}$ from zero, with entries

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

All other entries vanish. Write $G=L^{-1}$ and, for $0\le l<q$ and $0\le d<q-l$, define the paired mass

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

Every displayed matrix index lies in $0,\ldots,2q$, and

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

For $q=0$, both sums are empty and have value zero.
:::

::: proof
The positive diagonal lets forward substitution produce the actual inverse. Odd repetition makes the product of the two positive entries in each pair exactly $1/[t(2l)t(2(l+d+1))]\ge1$, so their sum is at least $2$. The triangular index domain has $q(q+1)/2$ pairs, giving the bound. The full proof is checked by the Lean kernel.
:::

If $m=2q+1$, $s$ is even, $W_{s+i+m}=W_{s+i}$ for $0\le i<m-1$, and $s+2m\le N_j$, setting $t(i)=t_{W_{s+i}}$ matches this matrix model and a $2m$-site window inside the prefix. The following theorem constructs the required windows from the substitution word itself and compares their lengths uniformly with the prefix length.

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="Uniform Odd Repetition Windows in Actual Tribonacci Prefixes" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
For the actual word $W$ above, the substitution lengths $L_j=|\sigma^j(A)|$, and the even prefix lengths $N_j=2\lfloor L_j/2\rfloor$, there are natural constants $K>0$ and $J\ge1$ such that every natural $j\ge J$ admits natural numbers $m,s$ satisfying

$$
\begin{aligned}
m&\ge3,\qquad m\text{ is odd},\quad s\text{ is even},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

The last line holds for every natural $i$ in the displayed range; the constants $K,J$ do not vary with $j$.
:::

::: proof
The formal proof takes $K=128$ and $J=4$. The two copies of $ABA$ in the fourth iterate supply the repeated blocks. Four substitution steps preserve oddness of all three letter-image lengths, giving an odd block length and an even starting position. A nonempty tail keeps the whole window inside the prefix after even rounding, and seven length-growth steps give the factor $128$. The example below spells out this construction; the full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="An Explicit Odd Repetition Window"}
For each $j\ge4$, set $r=\lfloor(j-4)/4\rfloor$ and $k=4r$, so $k+4\le j\le k+7$. Split the fourth iterate into four pieces:

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

Write $a=\sigma^k(A)$, $b=\sigma^k(B)$, and $c=\sigma^k(C)$; the vertical bars indicate concatenation, not additional letters. Applying $k$ further substitutions gives

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

Take $s=|abac|$ and $m=|aba|$. At every level divisible by four, the lengths of $a,b,c$ are all odd: at level zero each length is $1$, and the fourth images of the three letters contain $13,11,7$ letters, respectively, so four substitution steps preserve this oddness. Thus $s$ is even, $m\ge3$ is odd, and the two copies of $aba$ supply the required equality. The nonempty tail $cab$ ensures that rounding the prefix length down to an even number preserves the entire repeated window. Each substitution at most doubles length, giving

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

Here $s,m$ are nonnegative integers, and the constant $128$ is independent of $j$ and the hopping parameter $\rho$. This gives explicit choices of the constants and windows in [@thm-ch39-p2e-aligned-tribonacci-windows].
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="From Local Mass to a Euclidean Estimate for the Full Inverse"}
Take a positive hopping sequence $t$ bounded above by $1$, and let $G=L(t,n)^{-1}$ be the full inverse of the bidiagonal block above. Suppose integers $q\ge1$ and $a\ge0$ satisfy $a+2q+1\le n$ and

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

Set $x=(1,\ldots,1)\in\mathbb R^n$ and $v=x/\sqrt n$. With Euclidean norms throughout,

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

This inverse retains all exterior sites on both sides of the window. The forward-substitution inverse formula shows that shifting both indices of the local inverse by $a$ gives exactly the corresponding entry of $G$. All entries of $G$ are nonnegative, so each of the two triangular regions in [@thm-ch39-p2e-odd-repeat-inverse-mass] embeds into the full matrix, giving

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

The factor $2$ lets us bound the two regions separately without an additional disjointness argument. Meanwhile, Cauchy–Schwarz gives

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

Combining the inequalities proves the estimate. For the preceding window, the parameter correspondence is $m=2q+1$, $s=2a$, $N_j=2n$. This is an application of the existing inverse-mass result, the forward-substitution formula and Euclidean inequalities. It introduces no new formal declaration, and this example carries no separate Lean verification badge.
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="From the Full Inverse to a Spectral Residual Bound for a Finite Open Chain"}
For an integer $n\ge1$, take a real hopping sequence $t:\mathbb N\to\mathbb R$ with $t_k>0$ for every $k\in\mathbb N$. On $2n$ sites indexed by natural numbers starting at zero, define the actual open-chain matrix $H\in\mathbb R^{2n\times2n}$ by

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{otherwise},
\end{cases}
\qquad 0\le i,j<2n.
$$

Its diagonal is zero, its last physical bond is $t_{2n-2}$, and there is no closing bond. When $n=1$, it consists of two sites joined only by $t_0$. The same entrywise formula defines a Hermitian matrix on $\mathbb C^{2n}$. A real orthonormal eigenbasis of the symmetric matrix is also a complex orthonormal eigenbasis, with the same real eigenvalues. The spectral-distance estimates below therefore apply to the complex open chain defined earlier. Let $B=L(t,n)$ be the lower bidiagonal block above, so

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

with all other entries zero. Lower triangularity gives $\det B=\prod_{i=0}^{n-1}t_{2i}>0$, so the ordinary matrix inverse $G=B^{-1}$ exists. For every Euclidean unit vector $v\in\mathbb R^n$, there are a real number $\lambda$ and a nonzero real vector $z\in\mathbb R^{2n}$ such that

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

To see this, reorder coordinates into even sites followed by odd sites, and write $C_{ij}=H_{2i,2j+1}$. The diagonal entries of $C$ are $t_{2i}$, its subdiagonal entries are $t_{2i-1}$, and all other entries vanish. Set $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$. Then $D^2=I$, and entrywise calculation gives

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

The first line denotes the reordered matrix. Construct an auxiliary vector $u$ by setting $u_{\mathrm{even}}=0$ and $u_{\mathrm{odd}}=DGv$. Since $BG=I$,

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

Here $D$ only changes coordinate signs, preserving the Euclidean norm; $BGv=v\ne0$ also ensures $u\ne0$. Since $H$ is a finite real symmetric matrix, take a real orthonormal eigenbasis $e_k$ with real eigenvalues $\lambda_k$ ($0\le k<2n$). Set $\alpha=\min_{0\le k<2n}|\lambda_k|$ and substitute $u=\sum_k c_ke_k$ into Parseval's identity to obtain

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

The finite nonempty set of eigenvalues contains an index $k_0$ with $|\lambda_{k_0}|=\alpha$. Choose $\lambda=\lambda_{k_0}$ and $z=e_{k_0}$; taking square roots gives the claimed inequality. The selected $z$ is an eigenvector; the auxiliary vector $u$ generally is not. This example requires no upper bound on the hoppings.

If the upper-bound and repeated-window hypotheses of [@ex-ch39-p2e-full-inverse-euclidean] also hold, use the same unit vector $v$ as in that example to obtain

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

This converts the mass estimate for the full inverse into a bound on the spectral distance to zero energy for the same finite open chain.
:::

::: {.example #ex-ch39-p2e-tribonacci-prefix-rate title="A paper spectral bound for the specified even open prefixes"}
Return to the actual word $W$. Fix $0<\rho<1$ and set $t(i)=t_{W_i}$, with $t_A=\rho^2$, $t_B=\rho$ and $t_C=1$. These hoppings satisfy $0<t(i)\le1$ at every position. For each $j\ge4$, use the explicit window in [@ex-ch39-p2e-aligned-tribonacci-windows] and write

$$
\begin{aligned}
m&=2q+1,\qquad s=2a,\qquad N_j=2n,\\
q&\ge1,\qquad a+m\le n,\qquad N_j\le128m.
\end{aligned}
$$

Here $q,a,n$ are natural numbers. Equal letters have equal hoppings, so the word identity inside the window gives

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

The preceding two examples therefore apply to this same $N_j$-site open chain: the local matrix is the block for the shifted hoppings $t(2a+\cdot)$, while the full inverse remains $L(t,n)^{-1}$ for the entire prefix. No external sites are removed and no closing bond is added. Use their common unit vector $v$ to obtain $\delta_{\rho,j}q(q+1)\le N_j$. Since $q\ge1$,

$$
\begin{aligned}
9q(q+1)-2(2q+1)^2&=(q-1)(q+2)\ge0,\\
N_j\delta_{\rho,j}
&\le\frac{N_j^2}{q(q+1)}
\le\frac{128^2(2q+1)^2}{q(q+1)}
\le73728.
\end{aligned}
$$

The constant $73728=128^2\cdot9/2$ is independent of both $j$ and $\rho$; no optimality is claimed. Every substitution iterate starts with $A$. The substitution erases no letter, and this initial letter adds at least one letter, so $L_{j+1}\ge L_j+1$ and $L_j\ge j+1$. Hence $N_j\ge L_j-1\ge j$, and $\delta_{\rho,j}\le73728/N_j\to0$. This tail conclusion needs no separate estimate for $j=1,2,3$.

The bound also gives uniform convergence in the hopping parameter. For any $\varepsilon>0$, take

$$
J=\max\left\{4,\left\lfloor\frac{73728}{\varepsilon}\right\rfloor+1\right\}.
$$

Since $N_j\ge j$, every $j\ge J$ and every $0<\rho<1$ satisfy

$$
0\le\delta_{\rho,j}\le\frac{73728}{N_j}\le\frac{73728}{j}<\varepsilon.
$$

Here $J$ is independent of $\rho$. The conclusion covers the entire open interval; it does not include the degenerate endpoint model at $\rho=0$.

This is a paper application of the displayed window construction, full-inverse mass estimate and finite-dimensional spectral conversion, with no separate Lean verification badge; the parameter correspondence and formal sources are given in the [formalization interface](https://github.com/the-omega-institute/trureturing/issues/30166). This finite open-chain spectral bound neither constructs a many-body ground state nor determines entanglement across a spatial cut or the dimension of the Rauzy boundary.
:::

The example gives a paper $1/N_j$ bound and convergence to zero for the specified even open prefixes. The planar subtile Bell pairs give a local gapped realization. Whether a translation-invariant or lattice-uniform local gapped model can realize the scaling with interactions independent of the prescribed cut and its matching is posed in [@prob-ch39-p2e-fractal-horizon].

The preceding quantitative paper application already gives a stronger rate. A separate argument needs only the actual prefixes constructed in the proof of [@thm-ch39-p2e-tribonacci-prefix-log-refutation]: their charge is positive and unbounded at odd levels, making one entry of the full inverse sufficiently large.

::: {.theorem #thm-ch39-p2e-tribonacci-open-chain-zero-gap title="Vanishing Spectral Distance for Actual Positive Tribonacci Open Chains" lean="D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero"}
Let $W$ be the actual fixed word starting from $A$ for $\sigma(A)=AB$, $\sigma(B)=AC$, $\sigma(C)=A$, with weights $w(A)=2$, $w(B)=1$, $w(C)=0$. For each fixed real $0<\rho<1$, set $t_i=\rho^{w(W_i)}$. For integers $j\ge1$, define

$$
\begin{aligned}
L_j&=|\sigma^j(A)|,\qquad N_j=2\lfloor L_j/2\rfloor,\\
(h_{\rho,j})_{ab}&=\begin{cases}
t_a,&a+1=b,\\
t_b,&b+1=a,\\
0,&\text{otherwise},
\end{cases}\quad 0\le a,b<N_j,\\
\delta_{\rho,j}&=\min\{|\lambda|:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
\end{aligned}
$$

The matrix acts on $\mathbb C^{N_j}$, has zero diagonal and only the nearest-neighbor physical bonds $t_0,\ldots,t_{N_j-2}$, and has no closing bond between the endpoints. All its eigenvalues are real. Then

$$
\lim_{j\to\infty}\delta_{\rho,j}=0.
$$

Equivalently, for every $\varepsilon>0$ there is an integer $J\ge1$ such that every integer $j\ge J$ satisfies $0\le\delta_{\rho,j}<\varepsilon$.
:::

::: {.proof #pf-ch39-p2e-tribonacci-open-chain-zero-gap}
This proof follows the statement and argument of [the source declaration `gap_tendsto_zero`](lean:D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero).

First fix an actual prefix of odd length, then use that same prefix in every sufficiently long open chain. Recall $\tau=\sigma^4$, $F$, and the words from the proof of [@thm-ch39-p2e-tribonacci-prefix-log-refutation]:

$$
U_0=\varepsilon,\qquad U_{n+1}=\sigma^{4(n+1)}(C)U_n,\qquad m_n=|U_n|.
$$

That proof established the literal prefix identity $U_n=W_{[0,m_n)}$ and $F(U_n)=1-(-1)^n(n^2+3n+1)$. Each prepended block $\sigma^{4(n+1)}(C)$ has odd length, so $m_{n+1}\equiv1+m_n\pmod2$. Starting from $m_0=0$, induction gives $m_n\equiv n\pmod2$. Thus for every odd $n$ we can write

$$
m_n=2q+1,\qquad F(U_n)=(n+1)(n+2)>0.
$$

Suppose $N_j\ge m_n+1$ and put $M=\lfloor L_j/2\rfloor$, so $N_j=2M$ and $q<M$. Take the entire physical open chain $H=h_{\rho,j}$. Use the bidiagonal block $B=L(t,M)$, positive block $C$, and $D=\operatorname{diag}((-1)^r)_{r=0}^{M-1}$ from [@ex-ch39-p2e-open-chain-residual]. They satisfy

$$
\begin{aligned}
B_{r,r}&=t_{2r},\qquad B_{r,r-1}=-t_{2r-1},\\
D^2&=I,\qquad DCD=B.
\end{aligned}
$$

The second entry formula applies for $1\le r<M$. Every $t_i>0$, so $B$ has nonzero diagonal, its ordinary inverse $G=B^{-1}$ exists, and $C^{-1}=DGD$. Ordering the sites as evens $2r$ followed by odds $2r+1$ gives the full chain and its inverse as

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
H^{-1}&=\begin{pmatrix}0&(C^{-1})^{\mathsf T}\\C^{-1}&0\end{pmatrix}.
\end{aligned}
$$

Both displays use the permuted coordinates; they also establish invertibility of $H$. Forward substitution starts the first column at $G_{0,0}=1/t_0$ and gives $t_{2r}G_{r,0}=t_{2r-1}G_{r-1,0}$ for $1\le r<M$. Hence

$$
G_{q,0}=\frac{\prod_{r=0}^{q-1}t_{2r+1}}{\prod_{r=0}^{q}t_{2r}}>0.
$$

This is the preceding Green-entry formula at start zero, with empty numerator product $1$ when $q=0$. Returning to physical sites, the signs in $D$ give $(H^{-1})_{2q+1,0}=(-1)^qG_{q,0}$. Substituting the actual hoppings $t_i=\rho^{w(W_i)}$, and retaining the final even bond $t_{2q}$ in the denominator, yields

$$
\begin{aligned}
|(H^{-1})_{2q+1,0}|&=G_{q,0}\\
&=\rho^{-\sum_{i=0}^{2q}(-1)^iw(W_i)}\\
&=\rho^{-F(U_n)}=\rho^{-(n+1)(n+2)}.
\end{aligned}
$$

The physical bonds used are exactly those with indices $0,\ldots,2q$, and site $2q+1<N_j$ is present. The condition $N_j\ge|U_n|+1$ retains this last bond and its right endpoint. This is an entry of the inverse of the full $N_j$-site matrix: all outside sites remain, no inverse of a local compression replaces it, and no boundary bond is added.

The spectral step uses the induced operator norm on complex Euclidean space, $\|T\|_{2\to2}=\sup_{\|v\|_2=1}\|Tv\|_2$. Testing on the unit coordinate vector $e_0$ gives

$$
|(H^{-1})_{2q+1,0}|\le\|H^{-1}e_0\|_2\le\|H^{-1}\|_{2\to2}.
$$

This is not the maximum-entry norm. The invertible Hermitian matrix $H$ has a Hermitian inverse whose eigenvalues are the reciprocals of its own. By the finite-dimensional spectral theorem, the Euclidean operator norm of $H^{-1}$ is its largest absolute eigenvalue. Therefore some real eigenvalue $\lambda$ of the original matrix satisfies

$$
\begin{aligned}
|\lambda|&=\|H^{-1}\|_{2\to2}^{-1},\\
0\le\delta_{\rho,j}&\le|\lambda|\le\rho^{(n+1)(n+2)}.
\end{aligned}
$$

Finally, given $\varepsilon>0$, choose a natural number $k$ with $\rho^k<\varepsilon$, which is possible since $0<\rho<1$, and fix the odd integer $n=2k+1$. Since $(n+1)(n+2)\ge k$, the bound above is below $\varepsilon$. The actual iterate lengths satisfy $L_j\ge j+1$, hence $N_j\ge L_j-1\ge j$. Thus there is $J\ge1$ such that every $j\ge J$ satisfies $N_j\ge m_n+1$ and admits the estimate from this same prefix. The level $n$ is chosen once from $\rho,\varepsilon$; every subsequent $j\ge J$ then satisfies $0\le\delta_{\rho,j}<\varepsilon$. This proves convergence along all indices, rather than just a selected subsequence.

The source declaration defines `gap` at $j=0$ to be $0$ to avoid the empty eigenvalue set of a zero-dimensional matrix. For $j\ge1$, $L_j\ge2$, and its definition is precisely the minimum absolute value of the nonempty finite real spectrum used here. This single-value convention does not affect the limit.

The full proof is checked by the Lean kernel.
:::

This standalone convergence theorem states only the full-sequence limit for each fixed positive $\rho$; its single-inverse-entry argument supplies no $1/N_j$ rate. The preceding [@ex-ch39-p2e-tribonacci-prefix-rate] already gives the stronger paper bound $73728/N_j$ and convergence uniform in the parameter, using actual repeated windows and full-inverse mass. The evidence scopes of the two arguments remain distinct. The relation between this open chain's cuts and its internal window geometry remains to be established. The card below displays Parry stationary weights, finite escape pairs, and induced-return entropy side by side.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**Parry stationary weights, finite escape pairs, and induced-return entropy.** Cyan shows the reset chain's Parry stationary weights $\pi_K$. Magenta marks indistinguishable escape pairs $E(S)$ in the finite observation arena, and amber marks the selected order $K$. The card gives readouts for topological entropy $\log_2\beta_K$ and induced-return entropy. It attributes the topological-entropy identification and Abramov's formula to the literature and labels the general fractal-horizon law $S_{\mathrm{ent}}\propto R^{D_F}$ as `MODEL`. The text proves the finite planar subtile-cut Bell-pair scaling by manual derivation. Translation-invariant or lattice-uniform local gapped realizations and general anisotropic Pisot windows with $K\ge4$ remain open [@prob-ch39-p2e-fractal-horizon].
:::

We can now gather all eight concepts into a single line-break-free epistemic alignment table so that the formal core, classical literature, numerical evaluations, and interpretive boundaries of every link stand side by side:

| Eight-Concept Link | Exact Mathematical Object & Representative Frozen Declarations | Epistemic Status & Scope Boundary |
| :--- | :--- | :--- |
| **1. Zeckendorf Forbidden Language** | $K = 2$ `NoAdjacentOnes` automaton [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]), exact admissible-word count [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) ($F_{Q+2}$), and short-prefix full power [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓` (with explicit carrier conversion between `List (Fin 2)` and `Fin Q → Bool`) |
| **2. $K$-Bonacci Pisot Spectrum** | Polynomial irreducibility over $\mathbb{Z}$ and $\mathbb{Q}$ [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), Perron identity $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), limit $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two), and unit-disk conjugate contraction [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location) ([@thm-ch39-p2e-kbonacci-pisot]) | `LEAN ✓` (algebraic root-location theorem); decimals such as $\beta_3 \approx 1.839287$ are `NUM` |
| **3. $p$-adic Residue Tree & Ultrametric** | Mod-$p^k$ least distinguishing precision $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), valuation distance [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), congruence-fiber intersection [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), and finite-horizon refinement ultrametric [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric) ([@thm-ch39-p2e-padic-readout]) | `LEAN ✓` (as separate formal objects); cross-system identification of $p$-adic and $K$-Bonacci trees is `MODEL` |
| **4. $K=3$ Rauzy Internal Window** | Exponent-zero nonempty interior [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty), regular closure [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior), exact three-branch prefix cover [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover) ([@thm-ch39-p2e-rauzy-regular-window]), and zero planar boundary area [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero) ([@thm-ch39-p2e-rauzy-null-boundary]) | `LEAN ✓` (set topology & zero 2D area); tiling, disk homeomorphism, and $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ are `Literature` + `NUM` ([@rem-ch39-p2e-rauzy-literature]) |
| **5. Clifford Line–Plane Split** | Cubic Minkowski real-linear coordinate embedding $E_\parallel^1 \oplus E_\perp^2$ and internal damped rotor $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL` (requires declared basis/metric; observer line–plane dictionary in [@rem-ch39-p2e-unification-model]) |
| **6. Self-Referential Scale Comparison** | Positive cosine fixed-point endpoint $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) alongside Tribonacci conjugate norm $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓` (separate identities) + `Literature` (transcendence of $\theta^*$) + `NUM` ($\approx 0.234\%$ proximity, strictly unequal) + `MODEL` ($\psi=\psi(\psi)$ motif, [@ex-ch39-p2e-pisot-dottie-numerics]) |
| **7. Cross-Cut Direct-Encoder Ranks** | Attainable page-rank rectangle $1 \le r_b \le R_b$ and sharp entropy bound $\ln R_b$ under $\tau(x)+\iota(y)<K$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy) ([@thm-ch39-p2e-direct-encoder-ranks]) with spectral necessity [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓` (rank $K$ conditional on $K \le R_b$, not universal) + `NUM` (e.g. $R_0=6, R_1=5$) + `Literature` (golden chain & Rydberg arrays, [@rem-ch39-p2e-rydberg-anyon-literature]) |
| **8. Parry Law, Escape Pairs & Entropy** | Signed reset-chain Parry stationary law [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law) ([@thm-ch39-p2e-parry-escape-laws]), actual bilateral law and cylinders ([@thm-ch39-p2e-native-bilateral-parry-law]), boundary cylinder bound [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), and finite escape-pair criterion [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | cited probability laws and counts + [@thm-ch39-p2e-parry-ks-entropy] (KS bound and attainment for the same unsigned law) + [@thm-ch39-p2e-parry-ks-maximizer] (uniqueness of the maximizing law) + `Literature` (topological-entropy identification & first-return Abramov formula, [@rem-ch39-p2e-abramov-literature]) + `manual derivation` (the interval ceiling and planar Bell pairs) + `OPEN` (translation-invariant or lattice-uniform local gapped models, spatial entanglement of the Slater state of the physical Tribonacci hopping chain, general anisotropic Pisot windows with $K\ge4$, and necessary and sufficient gap and locality criteria for failure of the codimension-one area law, [@prob-ch39-p2e-fractal-horizon]) |

Stepping the order dial from $K = 2$ to $K = 3$ and beyond in the full laboratory below brings the multi-facet geometry of carry-free self-referential table expansion into immediate visual focus: at $K = 2$, the transverse contracting space is still a one-dimensional segment; the instant $K$ reaches $3$, complex conjugate roots spin out the three-branch self-covering, null-boundary Rauzy fractal window in the orthogonal plane; and across every order, kernel-verified counts, unit-disk root bounds, refinement ultrametrics, attainable rank rectangles, and Parry stationary weights form the green formal backbone supporting clearly demarcated classical literature, numerical experiments, and geometric synthesis. Beyond this discrete self-referential sandtable, we step into Chapter 35's closing section, [§35.7 `trureturing`'s "Golden Cut-and-Project" Formal Primitives and the Geometric Interpretation of Soul–Ruin Attractors](coda-s03-golden-cut-observers.md), completing the chapter across Minkowski model sets and bounded-gap torus returns before entering [Chapter 36](ch38-observer-memory-pointer-and-ontological-qram.md) on dream quantum erasure and ontological QRAM.

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**Interactive Laboratory `ORTHO//RAUZY`**: Eight-concept Zeckendorf–Pisot–Rauzy sandtable. Switch freely across all eight preset cards above, vary recurrence order $K$, prime radix $p$, word-length horizon, and 3D viewing angle, and drag points across the physical line and internal plane: inspect $1^K$-free word counts, unit-disk Pisot conjugate contraction, mod-$p^k$ residue-tree splitting depth, the $K = 3$ three-branch Rauzy internal window (and computed internal-coordinate sample at $K = 4$), numerical comparison between $\theta^*$ and $|\alpha|_{K=3}$, the cross-cut feasible rank rectangle $[1, R_0] \times [1, R_1]$, and the Parry stationary weights alongside finite escape pairs. Green badges mark Lean-verified theorems exclusively, while literature results, numerical computations, interpretive models, and open problems carry their respective distinct labels.
:::
