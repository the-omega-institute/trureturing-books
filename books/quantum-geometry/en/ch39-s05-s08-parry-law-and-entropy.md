# O.2 Parry Stationary Law, Escape-Pair Counting, and the Fractal Horizon Entropy Problem {#sec-ch39-p2e-entropy}

Before discussing entropy, distinguish three levels: finite-state Markov laws, measurable coordinate reconstruction of complete paths on integer time, and entropy comparison over all invariant probability measures. Lean verifies the path law, the metric entropy upper bound and its attainment, and the topological entropy formula. The maximizing law is unique, as the theorem and its derivation below show. The manual derivations below give an $O(R_n)$ entropy bound on one-dimensional intervals of length $R_n$ and realize $S(\rho_{A_n})=\Theta(R_n^{D_F})$ with Bell pairs across a subtile cut in finite planar Tribonacci patches. Open questions concern local gapped realizations with translation-invariant or lattice-uniform interactions, spatial entanglement of the Slater state of the physical Tribonacci hopping chain, general anisotropic Pisot windows with $K\ge4$, and necessary and sufficient gap and locality criteria for failure of the codimension-one area law.

On the Markov-chain side, for each integer order $k \ge 2$, let $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$ be the reciprocal Perron parameter. On the signed run-length state space $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ recording an absolute sign bit together with the current run length of `1`s, define the right-eigenvector suffix weights $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$, normalizer $Z_k = \sum_{j=0}^{k-1} p^j w_j$, sign involution $\operatorname{flip}(b, j) = (!b, j)$, and reset transition kernel $P_k = \operatorname{kernel}(k, p)$: from $s = (b, j)$, the chain flips sign and resets to $(!b, 0)$ with probability $p / w_j$, advances to $(b, j + 1)$ with probability $p\, w_{j+1} / w_j$ whenever $j + 1 < k$, and assigns probability $0$ to all other transitions. Define the signed stationary distribution

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

Row-stochasticity, normalization, stationarity, and sign-flip fairness of this signed reset chain are all verified by the Lean kernel:

- [O.2.1 The bilateral Parry source, cylinder laws, and mixing](ch39-s05-s08-s01-bilateral-source.md)
- [O.2.2 Maximal entropy, return durations, and the horizon problem](ch39-s05-s08-s02-maximal-entropy.md)
- [O.2.3 Physical Tribonacci models and Slater prefixes](ch39-s05-s08-s03-slater-prefix.md)
- [O.2.4 Noncontiguous cuts, purity, and direction complexes](ch39-s05-s08-s04-cuts-and-circuits.md)
- [O.2.5 Alternating substitution discrepancy and log-squared bounds](ch39-s05-s08-s05-substitution-discrepancy.md)
- [O.2.6 Tridiagonal localization and open-chain spectral distance](ch39-s05-s08-s06-open-chain-spectrum.md)
