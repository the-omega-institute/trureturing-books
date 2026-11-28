# Appendix D Support Differences and Rank Bounds for Fourier Bases

[Chapter 8 §8.1](ch08-flavor-hierarchy-and-ckm.md#sec-ch08-cyclic-obstruction) relates the minimum rank of a shared state to the cyclic differences of its support. Supports with distinct differences set the dimension threshold for forcing full rank. A subset with repeated differences can yield a tighter upper bound.

## Distinct differences and modular Golomb rulers

Forcing rank $k$ therefore requires $d\ge k(k-1)+1$. The supports $\{0,1,3\}$ modulo $7$ and $\{0,1,3,9\}$ modulo $13$ attain the threshold. More generally, when $k=q+1$ for a prime power $q$, Singer's cyclic difference set gives a support at the threshold. Take the trace-zero projective points in $\mathbb F_{q^3}^\times/\mathbb F_q^\times$. Each nontrivial translate meets the original set in exactly one point. For prime $q$ and a generator $\alpha$ of $\mathbb F_{q^3}^\times$, [SingerTracePlane.result](lean:D5/S3/Geometry/FiniteGeometry/SingerTracePlane.result) gives exactly $q+1$ indices with $\operatorname{Tr}(\alpha^i)=0$ in one projective period $0\le i<q^2+q+1$, with multiplicity one for every nonzero cyclic difference. The prime-power construction is due to [James Singer, *A theorem in finite projective geometry and some applications to number theory* (1938), pp. 377–385](https://doi.org/10.1090/S0002-9947-1938-1501951-4).

**Seven-site and eleven-site supports.** A support with distinct nonzero directed differences is a modular Golomb ruler. Buratti and Stinson's classification gives every dimension $d\ge48$ for seven supported sites. A witness modulo $48$ is $\{0,1,3,15,20,38,42\}$. The eleven-site dimensions are $120$, $133$, and every $d\ge135$. The support $\{0,1,4,9,23,30,41,43,58,68,74\}$ modulo $120$ gives $110$ distinct nonzero differences, omitting exactly $12,24,\ldots,108$. [Buratti and Stinson, *New Results on Modular Golomb Rulers, Optical Orthogonal Codes and Related Structures* (2020), Theorem 2.3(5), (9), and Table 1](https://arxiv.org/abs/2007.01908v2)

## Bounds from subsets

A subset with more collisions can tighten the bound. For nonempty $T\subseteq S$, let $m(T)$ count its distinct nonzero directed differences. Take an extreme point of the feasible set of rank $r$. Its range intersects the coordinate space on $T$ in dimension at least $r-(k-|T|)$. A nonzero invisible Hermitian perturbation on the intersection would violate extremality. Thus the same extreme point satisfies

$$
r\le\min_{\varnothing\ne T\subseteq S}\left(k-|T|+\left\lfloor\sqrt{|T|+m(T)}\right\rfloor\right).
$$

For $S=\{0,1,3,6,9\}$ modulo $12$, the subset $T=\{0,3,6,9\}$ lowers the bound from four to three. There are readouts with a unique shared state of rank three. [Subset bound and explicit witness](https://github.com/the-omega-institute/trureturing-books/issues/1676#issuecomment-7233048570)
