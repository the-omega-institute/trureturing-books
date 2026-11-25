# M.2.3 Growing cyclic support transitions

The fixed-radius cyclic optimizer from the preceding [near-collision analysis](ch34-s28-s03-s02-weighted-near-collisions.md) has a front window near angle zero and a rear window near the antipode. A growing lattice radius requires uniform control of its finite moments, particularly when a new antipodal level becomes active.

## Matrix error for a growing front window

Let the front half-width $N$ grow with the modulus and take budget $m=N(N+1)/5$. Write $h=2\pi/q$, $u=Nh$, and $x=j/N$ on the front. The two features $(1+\cos(xu))/2$ and $\sin^2(xu)/u^2$ extend at zero mesh to $1$ and $x^2$. Let $G_N(u)$ denote the matrix obtained by summing the pairwise products of the features over $|j|\le N$ and dividing by $N$. For every real $u$, each entry satisfies

$$
\left|G_N(u)_{ab}-G_N(0)_{ab}\right|\le 2u^2 .
$$

The cubic sine remainder gives a uniform error in the second feature. Both features have magnitude at most one on the window, so the entrywise matrix error remains of order $u^2$ after summation and division by $N$. As $N\to\infty$ and $u\to0$, the matrix has rows $(2,2/3)$ and $(2/3,2/5)$. In the regime $q/N^{5/2}\to\gamma>0$, the error compared with the zero-mesh matrix at the same $N$ is $O(N^{-3})$.

For $t=N(N+1)-1/2$ and $Z=\sum_{|j|\le N}(t-j^2)$, set $a=(Nt/Z,-N^3/Z)$. At zero mesh the matrix sends $a$ exactly to $(1,m/N^2)$. At mesh $u$ the moment residual satisfies

$$
\left|\left[G_N(u)a-(1,m/N^2)\right]_i\right|
\le 2u^2(|a_0|+|a_1|)\quad(i=0,1).
$$

The scaled lattice weight $N(t-j^2)/Z$ has sign margins of order $N^{-1}$ at $j=N$ and $j=N+1$. Determining the full cyclic support still requires control of the antipodal equations and the boundary sign at an antipodal activation threshold. [Lean proof of the Gram error](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingFrontFit.frontGram_sub_le) · [Lean proof of the residual bound](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingFrontFit.frontGram_reference_residual_le) · [Antipodal support problem](https://github.com/the-omega-institute/trureturing/issues/34029)

## Joint fit at the front and antipodal windows

Fix a nonempty finite set $S$ of signed real offsets from the antipode. With $c$ the sampled cosine, put $F=(1+c)/2$, $W=(1-c)/2$, and $X=(1-c^2)/(Nh)^2$. At mesh zero use their continuous extensions in the two windows. Fit the weight as $v=AF/N+CX/N+BW/N^3$ on the front and on $S$. The three moment equations have rows $\sum Fv$, $\sum Xv$, and $N^3\sum W^2v$. Their target for the common cosine floor $1-2mh^2$ is $(1-mh^2,m/N^2,3N^3mh^2/4)$, using $W^2=W-u^2X/4$.

Let $M_N$ be the matrix of these three rows in coefficient order $(A,C,B)$. If $N^3(Nh)^4\to0$, then

$$
M_N\longrightarrow
\begin{pmatrix}
2 & 2/3 & 0\\
2/3 & 2/5 & 0\\
0 & \sum_{r\in S}r^2 & |S|
\end{pmatrix}.
$$

The front contribution to the last row is bounded by constants times $N^3u^4$ and $Nu^6$. At a fixed antipodal offset $r$, $W\to1$, $N^2X\to r^2$ and $N^2F\le r^2u^2/4$. These estimates give the displayed matrix without a limit that exchanges a growing sum and a merely pointwise estimate. Its determinant is $16|S|/45$, so every prescribed vector of three moments has a unique coefficient fit for sufficiently large $N$.

When $q/N^{5/2}\to\gamma>0$, the target tends to $(1,1/5,3\pi^2/(5\gamma^2))$. The resulting limits are $A\to3/4$, $C\to-3/4$ and

$$
B\longrightarrow \frac{3\pi^2/(5\gamma^2)+(3/4)\sum_{r\in S}r^2}{|S|}.
$$

Thus at a fixed included rear site the fitted weight satisfies $N^3v(r)\to B_\infty-3r^2/4$. This calculation permits signed fitted weights. To verify the optimizer's support, the signs at both ends of the front window and at the rear activation levels must be controlled, including the levels with zero limiting score. [Lean proof of matrix convergence](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingCoupledFit.coupledMatrix_tendsto) · [Lean proof of the unique signed fit](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingCoupledFit.coupledFit_eventually) · [Coupled fit research](https://github.com/the-omega-institute/trureturing/issues/34029)

## Quantitative signs at the growing-window boundaries

The critical-scale fit admits a sharper comparison with the lattice reference. Write $K=\lim_{N\to\infty}N^5h^2=4\pi^2/\gamma^2$, and let $(A_N,C_N,B_N)$ be the inverse-matrix fit above. For $t=N(N+1)-1/2$ and $Z=\sum_{|j|\le N}(t-j^2)$,
$$
A_N-\frac{Nt}{Z}=O(N^{-3}),
\qquad
C_N+\frac{N^3}{Z}=O(N^{-3}).
$$

The estimate requires only boundedness of $N^5h^2$. After multiplication by $N^3$, the first two rows of the coupled matrix differ from the lattice Gram matrix augmented by a zero third column by a bounded matrix. The front-feature product error is bounded by $2u^2$, with $N^3u^2=O(1)$. Each fixed rear contribution to the scaled rows tends to zero. The scaled change in target mass is $N^3mh^2=O(1)$. Boundedness of the target and the inverse joint matrix bounds the fitted coefficients. Holding $B_N$ fixed, the inverse of the upper-left two-by-two matrix transfers the scaled residual bound to the front coefficient errors.

Let $p_N(j)$ denote the signed polynomial fitted on the front, extended to real $j$ by the same trigonometric formula. For each fixed real $d$, the scaled lattice reference at $j=N+d$ has limit $\frac34(1-2d)$ after multiplication by $N^2$. The feature and coefficient estimates preserve that limit:
$$
N^2p_N(N+d)\longrightarrow \frac34(1-2d).
$$
In particular the signed values at $N$ and $N+1$ are eventually strictly positive and strictly negative, respectively. Evenness gives the corresponding values at the negative end of the front window. At the half-step $d=1/2$ the leading limit vanishes, and the refined comparison yields $N^3p_N(N+1/2)\to-9/16$.

At every fixed real rear offset $r$, using the rear feature formula in the same fitted polynomial gives
$$
N^3p_N^{\mathrm{rear}}(r)\longrightarrow B_\infty-\tfrac34r^2.
$$
The strict sign at any such offset is determined by this limit when it is nonzero. The limits concern the signed fit for a fixed nonempty finite rear set $S$. To certify a particular cyclic optimizer one still needs to identify the finite cyclic site correspondence and extend the complement signs across all other sites. At $B_\infty=3r^2/4$ the limiting sign alone leaves the activation level open. [Lean proof of the coefficient rate](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.refined_coefficients) · [Front and half-step limits](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.scaled_boundary_value) · [Rear limit](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingEdgeLimits.scaled_rear_value) · [Research problem](https://github.com/the-omega-institute/trureturing/issues/34029)

## Exact support away from the rear thresholds

Fix the eventual parity $e\in\{0,1\}$ and suppose $N^5h^2\to K>0$. Put $Q=3K/20$. The rear window $S_l$ of index $l\ge0$ contains offsets from $-l-e/2$ through $l+e/2$ in unit steps, measured from the antipodal angle. Define

$$
T_0(l)=\frac{l(2l-1)(2l+1)}4,\qquad
T_1(l)=l(l+1/2)(l+1).
$$

If $Q$ differs from every $T_e(l)$, there is a unique $l$ satisfying $T_e(l)<Q<T_e(l+1)$. For all sufficiently large $N$, the unique cyclic optimizer $v$ is the joint fit on the front sites $|j|\le N$ and the rear window $S_l$, extended by zero on all other sites. It is strictly positive at every site in these two windows, and both cosine moments equal $1-2mh^2$. For every feasible probability weight $w$,

$$
\sum_j w_j^2\ge\sum_j v_j^2+\sum_j(w_j-v_j)^2.
$$

Writing $R=l+e/2$, the limiting rear intercept is $B=(Q+(3/4)\sum_{r\in S_l}r^2)/|S_l|$. Finite summation gives

$$
\begin{aligned}
\tfrac34\left(|S_l|R^2-\sum_{r\in S_l}r^2\right)&=T_e(l),\\
\tfrac34\left(|S_l|(R+1)^2-\sum_{r\in S_l}r^2\right)&=T_e(l+1).
\end{aligned}
$$

The strict cutoffs are therefore equivalent to $3R^2/4<B<3(R+1)^2/4$. The boundary limits give positive values at the last included sites of both windows and negative signed values at the first omitted sites. The fitted polynomial is convex in the sampled cosine, so these four signs control the full cyclic grid. The exact correspondence of grid sites transfers the fitted moment equations to the cyclic group, and the finite optimality certificate yields the squared-distance inequality.

If $q/N^{5/2}\to\gamma>0$, then $Q=3\pi^2/(5\gamma^2)$. The first additional rear pair enters below $\gamma=2\pi/\sqrt5$ on even cycles and below $\gamma=\pi/\sqrt5$ on odd cycles. The same formulas classify every subsequent switch away from equality. At equality the limiting signed value of a rear level vanishes, leaving its activation unresolved. [Kernel-checked Lean proof](https://github.com/the-omega-institute/trureturing/pull/34065) · [Research and proof development](https://github.com/the-omega-institute/trureturing/issues/34029)

## First-order activation at threshold equality

Write $Q_N=3N^5h^2/20$ and suppose $Q_N\to Q>0$ with $N(Q_N-Q)\to L$. For a nonempty finite fixed rear set $S$ and an offset $r$, define

$$
D=|S|r^2-\sum_{s\in S}s^2.
$$

The next-order signed rear value satisfies

$$
N\left(|S|N^3p_N^{\mathrm{rear}}(r)-Q+\tfrac34D\right)
\longrightarrow L+Q+\tfrac98 D.
$$

The exact lattice normalization is $Z=\frac43 N^3+2N^2-N/3-1/2$. Consequently $N(C_N+3/4)\to9/8$, using the cubic error bound for the fitted front coefficient. The third row of the coupled fit differs from $(0,\sum_{s\in S}s^2,|S|)$ by $o(1/N)$. Indeed, the growing front contribution is $O(N^{-3})$, and the finitely many fixed rear features have errors bounded by constants times $N^2h^2$ or $h^2$. The same estimates show $N^3p_N^{\mathrm{rear}}(r)=C_Nr^2+B_N+o(1/N)$. Eliminating $B_N$ via the exact target $Q_N(1+1/N)$ gives the displayed limit.

Suppose now that $Q=T_e(l+1)$ and the parity is eventually $e$. The first omitted rear radius of $S_l$ is the last included rear radius of $S_{l+1}$. For both windows this radius has $3D/4=Q$. Its first-order sign is therefore determined by $L+5Q/2$. If this quantity is positive, the optimizer eventually has the larger rear window $S_{l+1}$. If it is negative, it has $S_l$. The front support is $|j|\le N$ in either case, with both exact moment equalities and the squared-distance energy bound above. When $L+5Q/2=0$, the finer sign remains open. [Lean proof of the scaled first-order rear expansion](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearFirstOrder.scaled_rear_first_order) [Lean proof of eventual support at threshold](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearFirstOrder.eventual_support_at_threshold)

For $q/N^{5/2}\to\gamma>0$ at a critical ratio, if $N(q/(\gamma N^{5/2})-1)\to\eta$, then $Q=3\pi^2/(5\gamma^2)$ and $L=-2Q\eta$. Thus the activation is determined by whether $\eta$ lies below or above $5/4$. In particular parity-preserving rounding of $\gamma N^{5/2}$ with bounded error has $\eta=0$, so it enters the larger window. At $\eta=5/4$ a further expansion is needed.

## Second-order activation when the first-order margin vanishes

Assume also that $N(N(Q_N-Q)-L)\to H$. At any fixed offset $r$ for a nonempty finite rear set $S$, with $D=|S|r^2-\sum_{s\in S}s^2$, the second-order limit is

$$
\begin{aligned}
N\Big[N\big(|S|N^3p_N^{\mathrm{rear}}(r)-Q+\tfrac34D\big)
 -(L+Q+\tfrac98D)\Big]
\longrightarrow H+L-\tfrac{15}{8}D .
\end{aligned}
$$

The exact normalizer yields $N(N(C_N+3/4)-9/8)\to-15/8$. The cubic front-coefficient bound is sufficient for this limit. Multiplying the third-row and point-readout errors by $N^2$ still gives zero in the limit. Eliminating the rear intercept from the exact third moment as before yields the displayed correction.

At a positive threshold $Q=T_e(l+1)$ with $L=-5Q/2$, the common disputed radius has $3D/4=Q$, and the correction reduces to $H-5Q$. A positive value selects $S_{l+1}$, and a negative value selects $S_l$. For both, the front window remains $|j|\le N$, the two moments attain their floors, and the unique optimizer satisfies the same squared-distance energy inequality.

In modulus variables, let $N(N(q/(\gamma N^{5/2})-1)-5/4)\to\xi$. Expanding the inverse square gives $H=Q(75/16-2\xi)$, so the transition is at $\xi=-5/32$. When $H=5Q$ (equivalently $\xi=-5/32$ under these modulus assumptions), a higher-order asymptotic sign criterion remains open. The exact finite decision below applies. [Lean proof of the second-order expansion](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearSecondOrder.scaled_rear_second_order) [Lean proof of second-order support](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingRearSecondOrder.eventual_support_at_second_order_threshold)

## Exact finite support at a leading threshold

At each positive threshold $Q=T_e(l+1)$, the adjacent rear windows $S=S_l$ and $T=S_{l+1}$ have a common disputed boundary radius $R=l+1+e/2$. There is an exact identity between their signed fitted weights at this radius,

$$
\det(M_S)p_S(R)=\det(M_T)p_T(R).
$$

The larger window adds two new points at $\pm R$, whose sampled features coincide. If the corresponding moment column and coefficient row are $u$ and $r$, then $M_T=M_S+2ur^{\mathsf T}$. Both coefficient vectors solve the moment equations with the same right-hand side. Subtracting the fitted equations and applying the matrix determinant lemma yields the identity. The limiting determinants are $16|S|/45$ and $16|T|/45$, so both are positive for sufficiently large $N$.

For each sufficiently large $N$ use the sign of the smaller-window fit at the disputed radius. If $p_S(R)>0$, taking $T$ gives a positive value at its retained boundary. If $p_S(R)\le0$, taking $S$ gives a nonpositive value at its omitted boundary, including the exact zero case. The other two rear and front-window signs required by the finite certificate follow from the leading limits. The selected fit has exact positive support on its two windows, both moments attain their floors, and the squared-distance inequality holds. This classification assumes only the leading convergence $Q_N\to T_e(l+1)$ and eventual parity, so it allows the selected window to change with $N$.

The previous drift laws give successive sufficient asymptotic sign criteria. At a vanishing second-order margin the finite comparison still determines the exact support. An explicit higher-order asymptotic location of the finite transition remains a separate estimation problem. [Lean proof of the exact score identity](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingThresholdExact.adjacent_fit_score) [Lean proof of exact threshold support](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingThresholdExact.eventual_support_at_leading_threshold)
