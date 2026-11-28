# Appendix D Support Differences and Rank Bounds for Fourier Bases

[Chapter 8 §8.1](ch08-flavor-hierarchy-and-ckm.md#sec-ch08-cyclic-obstruction) uses cyclic differences in the support of the first readout to bound the minimum rank of a shared state. It also characterizes when a second readout can force that rank to equal the support size. Difference sets can attain the resulting dimension threshold. A subset with repeated differences can yield a tighter upper bound.

## D.1 Distinct Differences and Modular Golomb Rulers {#sec-ou-appd-golomb}

For a support of size $k$, forcing rank $k$ requires the $k(k-1)$ directed differences to occupy distinct nonzero residues of $\mathbb Z_d$. There are only $d-1$ such residues, so $d\ge k(k-1)+1$. The supports $\{0,1,3\}$ modulo $7$ and $\{0,1,3,9\}$ modulo $13$ attain the threshold. More generally, when $k=q+1$ for a prime power $q$, Singer's cyclic difference set gives a support at the threshold. Take the trace-zero projective points in $\mathbb F_{q^3}^\times/\mathbb F_q^\times$. Each nontrivial translate meets the original set in exactly one point. For prime $q$ and a generator $\alpha$ of $\mathbb F_{q^3}^\times$, [SingerTracePlane.result](lean:D5/S3/Geometry/FiniteGeometry/SingerTracePlane.result) gives exactly $q+1$ indices with $\operatorname{Tr}(\alpha^i)=0$ in one projective period $0\le i<q^2+q+1$, with multiplicity one for every nonzero cyclic difference. The prime-power construction is due to [James Singer, *A theorem in finite projective geometry and some applications to number theory* (1938), pp. 377–385](https://doi.org/10.1090/S0002-9947-1938-1501951-4).

**Seven-site and eleven-site supports.** A support with distinct nonzero directed differences is a modular Golomb ruler. Buratti and Stinson's classification gives every dimension $d\ge48$ for seven supported sites. A witness modulo $48$ is $\{0,1,3,15,20,38,42\}$. The eleven-site dimensions are $120$, $133$, and every $d\ge135$. The support $\{0,1,4,9,23,30,41,43,58,68,74\}$ modulo $120$ gives $110$ distinct nonzero differences, omitting exactly $12,24,\ldots,108$. [Buratti and Stinson, *New Results on Modular Golomb Rulers, Optical Orthogonal Codes and Related Structures* (2020), Theorem 2.3(5), (9), and Table 1](https://arxiv.org/abs/2007.01908v2)

**How close to uniform must the second readout be?** Fix the first probabilities on such a support $S$, ordered as $p_1\ge\cdots\ge p_k>0$. Let $q$ be the Fourier probabilities of a compatible state $\rho$, and let $u=(1/d,\ldots,1/d)$. For $1\le r<k$, set $\sum_{i=1}^r\max(p_i,\tau)=1$, which uniquely fixes $\tau>p_r$. The smallest Euclidean distance $\|q-u\|_2$ at rank at most $r$ is

$$
R_r(p)=\sqrt{\frac{\sum_{i=1}^r\max(p_i,\tau)^2-\sum_{i=1}^k p_i^2}{d}}.
$$

To see where the radius comes from, positivity gives $|\rho_{xy}|^2\le p_xp_y$, so the matrix vanishes outside $S\times S$. At each nonzero frequency, the unnormalized Fourier coefficient of $q-u$ sums entries with the corresponding directed difference. The distinct-difference condition leaves at most one entry in each sum. Parseval then gives $d\|q-u\|_2^2=\operatorname{tr}(\rho^2)-\sum_i p_i^2$. By Schur–Horn, the decreasing eigenvalues of $\rho$ majorize its diagonal $p$, and every majorizing probability spectrum is attained. Among spectra with at most $r$ positive entries, the least in this order has first $r$ entries $\max(p_i,\tau)$ and zeros thereafter. Indeed, the prefix-sum inequalities retain the entries above $\tau$. For longer prefixes, decreasing order bounds their sums below by the line joining the last retained prefix to total mass one at $r$. The stated spectrum attains these bounds, hence minimizes purity. [Horn, *Doubly stochastic matrices and the diagonal of a rotation matrix*](https://doi.org/10.2307/2372705)

For a first readout uniform on its $k$ sites this gives $R_r=\sqrt{(1/r-1/k)/d}$. On $\{0,1,3\}$ modulo $7$, for example, an exact Fourier readout at distance less than $1/\sqrt{42}$ from $u$ forces rank three. A rank-two state attains equality. More generally, if the observed readout $y$ has error $\|y-q\|_2\le\epsilon$, then $\|y-u\|_2+\epsilon<R_r(p)$ excludes every rank up to $r$. The distinct-difference hypothesis is essential. On the opposite sites $\{0,2\}$ modulo $4$, the pure state $(1,0,i,0)/\sqrt2$ has an exactly uniform second readout because the two off-diagonal terms at difference $2$ cancel.

If the first probabilities can vary by total variation distance $\delta$ while remaining supported in $S$, form $p^\star$ by moving up to $\delta$ probability from the smallest entries to the largest one, stopping when it reaches one. The exact radius becomes $R_r(p^\star)$, taken as zero when at most $r$ entries survive. This is the minimum if zero entries are allowed and the infimum if all $k$ entries must stay positive. If a fraction $t<1$ of the diagonal probability instead lies outside $S$ and its conditional distribution on $S$ is $p$, a sufficient exclusion test is $\|y-u\|_2+\epsilon+\sqrt{2t}<R_r(p)$. Projecting onto $S$ and normalizing gives a state of at most the original rank. Its trace distance from $\rho$ is at most $\sqrt t$ by projecting a purification. Measurement then changes the probability vector by at most $\sqrt{2t}$ in Euclidean norm. [Proof, diagonal uncertainty and exact examples](https://github.com/the-omega-institute/trureturing-experiments/blob/77503f687e48ad1db010979488f5e93eb7f671be/experiments/ch39-omega-research/replay/ch08-fourier-rank-radius.md)

## D.2 Bounds from Subsets (Hand Derivation) {#sec-ou-appd-subsets}

A subset with more collisions can tighten the bound. For nonempty $T\subseteq S$, let $m(T)$ count its distinct nonzero directed differences. Take an extreme point of the feasible set of rank $r$. Its range intersects the coordinate space on $T$ in dimension at least $r-(k-|T|)$. A nonzero invisible Hermitian perturbation on the intersection would violate extremality. Thus the same extreme point satisfies

$$
r\le\min_{\varnothing\ne T\subseteq S}\left(k-|T|+\left\lfloor\sqrt{|T|+m(T)}\right\rfloor\right).
$$

For $S=\{0,1,3,6,9\}$ modulo $12$, the subset $T=\{0,3,6,9\}$ lowers the bound from four to three. There are readouts with a unique shared state of rank three. [Subset bound and explicit witness](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7233048570)

## D.3 Exact Pure-State Radius on Three Sites {#sec-ou-appd-three-site-radius}

Fix positive coordinate probabilities $p_1,p_2,p_3$ on three sites of $\mathbb Z_d$, with zero probability elsewhere. Let $R$ be the smallest Euclidean distance from the uniform Fourier probability vector $u$ to a pure state's Fourier readout $q$ at these fixed probabilities. Label the edges around the triangle and set $A=\sqrt{p_1p_2}$, $B=\sqrt{p_2p_3}$, $C=\sqrt{p_3p_1}$. In a progression, site 2 is the midpoint. Write $T=\max(0,2\max(A,B,C)-A-B-C)$.

| Arrangement of the three sites | $dR^2$ |
|---|---|
| All six directed differences distinct | $2(A^2+B^2+C^2)$ |
| Only edge $C$ is antipodal, all other directed differences distinct | $2(A^2+B^2)$ |
| Progression with step of order at least five | $2(A-B)^2+2C^2$ |
| Progression with step of order four | $2(A-B)^2$ |
| Coset of the order-three subgroup | $2T^2$ |

To see why the list closes, follow the edges in cyclic order. Their differences sum to zero. Two of them can be negatives of one another only if the third vanishes, which distinct sites exclude. An equality between different edges therefore makes the triple a progression. When the step has order three, all three directed edges coincide. At order four the endpoint edge is antipodal. Without a progression the only remaining collision is an edge equal to its own negative.

Parseval expresses $d\|q-u\|_2^2$ as the sum over nonzero differences of the squared moduli of their coherence sums. The coherences of a pure state have lengths $A,B,C$ and their three phases multiply to one. A lone antipodal edge can be made imaginary so that its two orientations cancel. In a progression the two step phases can be chosen opposite. At order four, choosing them as $e^{i\pi/4}$ and $-e^{i\pi/4}$ also makes the endpoint coherence imaginary. In the order-three coset all three lengths occur in one sum and its conjugate. Their smallest resultant has length $T$ by the triangle inequality. Rotating all three summands by a common phase can enforce product one for their unit phases while preserving that length. The minima in the table are thus all attained.

For an exactly uniform second readout, the minimum shared rank is three in the first row. In the other rows it is one when $R=0$ and two when $R>0$. Indeed the positive diagonal state always gives a uniform Fourier readout. Any repeated directed difference reduces the count of real constraints to $3+m\le8$, so the extreme-point bound in Chapter 8 gives a representative of rank at most two.

In the order-three coset, let the third coordinate receive a fraction $t$ while the original two retain relative probabilities $\alpha$ and $1-\alpha$. For $0<\alpha,t<1$, set $s=\sqrt{\alpha(1-\alpha)}$. After dividing the three lengths by $\sqrt{t(1-t)}$, two of them are $\sqrt{\alpha}$ and $\sqrt{1-\alpha}$. The third, $s\sqrt{(1-t)/t}$, must lie between their absolute difference and their sum. Squaring and solving for $t$ gives

$$
\left(\frac{s}{1+s}\right)^2\le t\le\left(\frac{s}{1-s}\right)^2 .
$$

These are exactly the fractions for which a pure state can give the uniform readout. For equal original populations the lower endpoint is $1/9$. The amplitudes $(2,2,-1)/3$ on $\{0,4,8\}\subset\mathbb Z_{12}$ attain it. For unequal populations the upper endpoint is strictly below one, so increasing the third population can also destroy exact flatness. [Three-site radius and phase witnesses](https://github.com/the-omega-institute/trureturing-experiments/blob/ec341972d75f6058bb3708e3692873997fd76d34/experiments/ch39-omega-research/replay/ch08-three-site-pure-radius.md)
