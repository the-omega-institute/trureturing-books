# Spectral perturbations that preserve counting

To apply [common interval perturbations](https://github.com/the-omega-institute/trureturing/issues/33594) to a comparison spectrum with a prescribed counting law, the radii must also control how many ordinates can cross a threshold. Let the reference ordinates $\gamma_j$ be positive and distinct, with positive integer multiplicities $m_j$. Assume finitely many ordinates are at or below each real threshold. Write $N(T)=\sum_{\gamma_j\le T}m_j$.

::: {.theorem #thm-ch31-ordered-spectral-count-perturbations title="Ordered intervals and a single possible threshold crossing" lean="D5/S3/Analytic/Oscillation/SpectrumCountPerturbation.exists_ordered_count_perturbations"}
There are radii $0<r_j\le1/3$ with $r_j<\gamma_j$, such that $\gamma_i+r_i<\gamma_j-r_j$ whenever $\gamma_i<\gamma_j$. Every choice $\gamma'_j\in[\gamma_j-r_j,\gamma_j+r_j]$ gives a positive locally finite spectrum with the same indexing up to a bijection, the same multiplicities, and the same order of ordinates.

At each real $T$, either all cutoff memberships agree and $N'(T)=N(T)$, or exactly one coordinate changes membership. For that coordinate $j$, one has $\gamma_j-r_j\le T<\gamma_j+r_j$. If $\gamma'_j\le T<\gamma_j$, then $N'(T)=N(T)+m_j$. If $\gamma_j\le T<\gamma'_j$, then $N(T)=N'(T)+m_j$.
:::

::: proof
For each $j$ take one third of the minimum of $1$, $\gamma_j$, and the gaps $|\gamma_i-\gamma_j|$ for $i\ne j$ with $\gamma_i\le\gamma_j+1$. This is a positive radius. The other gaps exceed $1$. Each radius is therefore at most a third of any gap incident to that coordinate, so the two radii adjacent to a pair sum to less than the gap. A uniform radius bound also ensures local finiteness after choosing the perturbed ordinates.

When cutoff membership changes at a coordinate, the threshold lies at or above the interval's left endpoint and strictly below its right endpoint. Only one interval can contain the threshold in this way. All other coordinates contribute equally to both counts. The full proof is checked by the Lean kernel.
:::

With unit multiplicities, $|N'(T)-N(T)|\le1$ for all $T$. Thus the bounded error in the two-term comparison example stays bounded for any choice within these radii. An interval perturbation satisfying a given collision budget still requires checking that budget for the chosen radii. If the weights are recomputed from the new ordinates, estimates involving those weights need a separate argument. [Two-term comparison example](https://github.com/the-omega-institute/trureturing-books/pull/1083)
