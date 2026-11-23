# O.2.2 Maximal entropy, return durations, and the horizon problem {#sec-ch39-s05-s08-s02-maximal-entropy}

::: {.theorem #thm-ch39-p2e-parry-ks-entropy title="The Parry Law Attains the Bilateral Shift Entropy Bound" lean="D5/S3/TotalVariation/ParryKSEntropy.bilateral_parry_entropy"}
Fix $K\ge2$, set $p=\operatorname{parryParameter}(K)$, and let $T$ be the left shift of the admissible bilateral relation paths $X_K$. There exist a bilateral coding $e$ and an invariant probability $\mu$ on $X_K$ with the stationary suffix cylinder formula of [@thm-ch39-p2e-native-bilateral-parry-law] at every integer origin. With that law,

$$
h_{\mathrm{KS}}(\mu,T)=-\log p,\qquad
h_{\mathrm{KS}}(\rho,T)\le-\log p
\quad\text{for every invariant probability }\rho\text{ on }X_K.
$$
:::

::: proof
For any realized suffix word with $n$ transitions, the logarithm of its Parry mass is $n\log p$ plus terms depending only on its first and last suffixes. Those terms are uniformly bounded on the finite alphabet. Gibbs' inequality bounds each competitor's word entropy by the cross entropy against these reference masses. For the Parry law itself, the same endpoint estimate also bounds word entropy from below. The endpoint terms vanish after division by the word length and passage to the limit.

Suffix partitions at successively earlier starting points have the same entropy rate by stationarity. Their forward translates generate all Boolean coordinates, since the suffix after a bit is zero precisely when that bit is false. This gives the full Kolmogorov–Sinai entropy. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-p2e-parry-ks-maximizer title="The Bilateral Parry Law Is the Unique Entropy Maximizer" lean="D5/S3/TotalVariation/ParryKSMaximizer.bilateral_parry_maximizer"}
Let $K\ge2$ and take a coding $e$ with the nearest-zero suffix property and a probability $\mu$ with the stationary suffix cylinders of [@thm-ch39-p2e-native-bilateral-parry-law] at every integer origin. Set $p=\operatorname{parryParameter}(K)$. For every probability $\rho$ preserved by the left shift $T$ on the admissible unsigned paths,

$$
h_{\mathrm{KS}}(\rho,T)\le -\log p,\qquad
h_{\mathrm{KS}}(\rho,T)=-\log p\quad\Longleftrightarrow\quad\rho=\mu.
$$
:::

::: proof
At equality the joint law of each finite history and its next suffix agrees with the history marginal followed by the Parry kernel. Stationarity determines the initial suffix marginal because each positive suffix has a unique possible predecessor. These marginal and transition formulas determine all suffix cylinders. A relation bit is false exactly when the next suffix is zero, so equality on those cylinders identifies the entire bilateral relation law. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-p2e-abramov-literature title="Maximal-Entropy Application of the Actual Bilateral Parry Law and Separate Literature Boundaries"}
**The application and its objects.** Fix any integer order $K\ge2$ (the preceding $k=K$), and put $p=\operatorname{parryParameter}(K)$, $X_K=\operatorname{RelationPath}(K)$, and $T=\operatorname{relationShift}$, so $(Tr)_t=r_{t+1}$. Take the joint witness $e,\mu,\nu$ from [@thm-ch39-p2e-native-bilateral-parry-law]; throughout, $\mu$ is that same unsigned probability law. For every Borel probability measure $\rho$ on $X_K$ with $T_*\rho=\rho$, the application below gives

$$
\begin{aligned}
h_{\mathrm{KS}}(\rho,T)&\le-\log p,\\
h_{\mathrm{KS}}(\mu,T)&=-\log p,\\
h_{\mathrm{KS}}(\rho,T)=-\log p
&\quad\Longleftrightarrow\quad\rho=\mu,\\
\rho\ne\mu&\quad\Longrightarrow\quad h_{\mathrm{KS}}(\rho,T)<-\log p.
\end{aligned}
$$

Logarithms are natural, and the unit is nats per original step. Here $h_{\mathrm{KS}}$ is the supremum of entropy rates over all finite measurable partitions, initially regarded as an extended real number; the conclusion also proves that it is finite in this system. Competitors range over all invariant Borel probabilities, with no additional Markov, ergodicity, generation, entropy-limit, or uniqueness assumption. The signed extension $\nu$ helps construct $\mu$, while the entropy comparison takes place on the unsigned space $X_K$. The owning exposition is the [bilateral Parry law discussion](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/Blueprint/D5/S3/TotalVariation/ParryBilateralLaw.md). The entropy bound and attainment are formalized in [@thm-ch39-p2e-parry-ks-entropy]. The equality criterion is formalized in [@thm-ch39-p2e-parry-ks-maximizer] and derived below.

**From the actual suffix to a two-sided generator.** Set $J_t(r)=J_t^e(r)$, the second coordinate of $e(\mathrm{false},r)$ at integer time $t$. The nearest-zero characterization makes $J_t$ exactly the length of the true run immediately preceding $t$, independently of the sign anchor. On every admissible path,

$$
\begin{aligned}
J_{t+1}(r)&=\begin{cases}
0,&r_t=\mathrm{false},\\
J_t(r)+1,&r_t=\mathrm{true},
\end{cases}\\
r_t=\mathrm{false}&\quad\Longleftrightarrow\quad J_{t+1}(r)=0.
\end{aligned}
$$

The true branch automatically has $J_t+1<K$. For every $c\in\mathbb Z$, translation $(\theta_c r)_t=r_{t+c}$ preserves $X_K$ and satisfies $J_t(\theta_c r)=J_{t+c}(r)$. These are pathwise identities, including on paths of probability zero.

Take the finite measurable partition $\mathcal P_j=\{r:J_0(r)=j\}$, $j\in\operatorname{Fin}K$. The measurable inverse of $T=\theta_1$ is $\theta_{-1}$. The space $X_K$ is a closed subset of the bilateral product of discrete Boolean spaces, with its Borel structure, so it is standard Borel. Every suffix cell is measurable. Conversely, the displayed identity recovers every relation-coordinate event from a translated zero-suffix cell. Thus **all integer translates** of $\mathcal P$ generate the entire Borel $\sigma$-algebra. The two-sided finite-generator theorem for invertible probability-preserving systems therefore gives

$$
h_{\mathrm{KS}}(\rho,T)=h_\rho(T,\mathcal P).
$$

The two-sided generator and integer-iterate suppliers are Marcel Morgenstern's [generator theorem](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Entropy/GeneratorTheoremTwoSided.lean) and [integer iterates](https://github.com/marcmorningstar/lean4-ergodic-theory/blob/040fec2e0ddf4fcba49af9f76c866d295308dd7f/ErgodicTheory/Krieger/ZIterate.lean); attribution and licensing are recorded in the [entropy supplier note](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/Library/Entropy/morgenstern2026ks.md). These are library sources, cited here without presenting them as newly frozen theorems of this book. A condition using only nonnegative iterates cannot replace this bilateral step.

**Finite histories and the entropy rate.** For $n\ge0$ and $w\in(\operatorname{Fin}K)^n$, write

$$
\begin{aligned}
A_{\ell,n}(w)&=\{r:\ J_{\ell+i}(r)=w_i\ (0\le i<n)\},\\
m_n(w)&=\rho(A_{0,n}(w)),\\
H_n&=-\sum_w m_n(w)\log m_n(w),\\
c_n&=H_\rho(J_n\mid J_0,\ldots,J_{n-1}).
\end{aligned}
$$

The empty history is the one-cell partition, so $H_0=0$ and $c_0=H_\rho(J_0)$. Zero-mass terms use $0\log0=0$. The finite partition chain rule gives $H_{n+1}=H_n+c_n$. Conditioning on more information cannot increase conditional entropy; stationarity of this same joint law then gives $c_{n+1}\le c_n$, without assuming that the competitor is Markov. Stationarity also makes $H_n$ subadditive, and the Fekete entropy-rate limit gives

$$
\begin{aligned}
h_\rho(T,\mathcal P)&=\lim_{N\to\infty}\frac{H_N}{N},\\
H_N&\le H_m+(N-m)c_m\quad(N\ge m),\\
h_\rho(T,\mathcal P)&\le c_m\quad(m\ge0).
\end{aligned}
$$

The second line bounds each summand in $H_N=H_m+\sum_{i=m}^{N-1}c_i$; the third follows by taking the limit. This connects the entropy rate to every finite history and derives existence of the limit rather than assuming it. The finite chain rule, conditioning, and limit suppliers appear in the library's [partition](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/Partition.lean), [conditioning](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/GeneratorConditioning.lean), and [entropy-rate](https://github.com/the-omega-institute/trureturing/blob/07e441357b0ee5d7f285cdf7b48876eb9e0e8b64/D5/S3/Entropy/KolmogorovSinai/EntropyRate.lean) modules. Their partition conditional-entropy identities are distinct from the first-return formula stated separately below.

**A KL defect for the same joint distribution.** Keep the original law's $Q=\operatorname{suffixKernel}(K)$ and $q_j=\operatorname{suffixLaw}(K,j)$, and set $R_j=w_j=\operatorname{suffixWeight}(K,p,j)$. The bounds and normalization in [@thm-ch39-p2e-parry-escape-laws] give $p>1/2$, $0<R_j\le1$, $R_0=1$, and nonnegative stochastic rows of $Q$. Exactly on the allowed edges $i\to j$, namely $j=0$ or the available $j=i+1$, we have $Q(i,j)>0$ and

$$
\log Q(i,j)=\log p+\log R_j-\log R_i.
$$

For any history length $n\ge1$, define two arrays on the finite index set $(w,j)$:

$$
\begin{aligned}
a(w,j)&=\rho\bigl(A_{0,n}(w)\cap\{J_n=j\}\bigr),\\
b(w,j)&=m_n(w)Q(w_{n-1},j).
\end{aligned}
$$

Both arrays are nonnegative and sum to $1$. They satisfy $b(w,j)=0\Rightarrow a(w,j)=0$: a zero-mass history has only zero-mass extensions, and a zero kernel entry makes the forbidden extension event itself empty by the suffix recurrence. Absolute continuity therefore covers all histories, including zero-mass histories and forbidden transitions, under every competitor.

The actual joint array has row masses $m_n(w)$ and next-suffix column masses $\rho(J_n=j)$; its last-history-suffix marginal is $\rho(J_{n-1}=i)$. Stationarity equates the last two marginals. Expand logarithms only where $a(w,j)>0$, defining zero terms to contribute zero. Then

$$
\begin{aligned}
D(a\Vert b)
&=\sum_{a(w,j)>0}a(w,j)\log\frac{a(w,j)}{b(w,j)}\\
&=-c_n-\sum_{a(w,j)>0}a(w,j)\log Q(w_{n-1},j)\\
&=-c_n-\log p.
\end{aligned}
$$

The two expected $\log R$ terms cancel exactly because those marginals agree. [Finite Gibbs nonnegativity](lean:D5/S3/Divergence/GrandmotherTheorem.kl_divergence_nonneg) gives $D(a\Vert b)\ge0$, so for every $n\ge1$,

$$
h_{\mathrm{KS}}(\rho,T)\le c_n\le-\log p.
$$

This uses the actual history/next-suffix joint distribution throughout, with no substitution by separately chosen marginals.

**Equality forces the original kernel after every history.** If $h_{\mathrm{KS}}(\rho,T)=-\log p$, the preceding inequalities force $c_n=-\log p$ and hence $D(a\Vert b)=0$ at every history length. [The Gibbs equality criterion](lean:D5/S3/Divergence/GibbsEquality.kl_divergence_eq_zero_iff) gives $a=b$ pointwise. Since $T$ is invertible and preserves $\rho$, every $\theta_\ell$ preserves $\rho$. Translation therefore gives, for all $\ell\in\mathbb Z$, $n\ge1$, words $w$, and destination suffixes $j$,

$$
\begin{aligned}
&\rho\bigl(A_{\ell,n}(w)\cap\{J_{\ell+n}=j\}\bigr)\\
&\qquad=\rho(A_{\ell,n}(w))Q(w_{n-1},j).
\end{aligned}
$$

Dividing by a positive history mass identifies the conditional next-suffix distribution given that entire finite history as $Q(w_{n-1},\cdot)$. The undivided identity also retains zero histories. No infinite-past conditional-expectation formula is needed or asserted.

**The original $\mu$ attains the bound.** Clause 5 of the original law directly gives, for every $\ell$, $n\ge1$, and word $w$,

$$
\mu(A_{\ell,n}(w))=q_{w_0}\prod_{i=0}^{n-2}Q(w_i,w_{i+1}).
$$

At $n=1$ the product is empty; words with zero transitions remain in the formula. Extending the word by one entry gives the preceding undivided transition identity, with the same initial mass $q$ and without constructing another candidate law. Thus for $\rho=\mu$, every KL defect at $n\ge1$ vanishes and $c_n=-\log p$. Monotonicity also gives $c_0\ge-\log p$, so the chain rule yields $H_N\ge N(-\log p)$. The established Fekete limit and universal upper bound now give $h_{\mathrm{KS}}(\mu,T)=-\log p$.

**Rigidity from stationary marginals to the full law.** Continue to suppose that $\rho$ attains the bound. The length-one transition identity and stationarity imply that $u_j=\rho(J_0=j)$ satisfies $uQ=u$; the original law likewise has $qQ=q$. Uniqueness of this initial marginal need not be assumed. Every row has $Q(i,0)=p/R_i\ge1/2$, so put

$$
\begin{aligned}
d_j&=\tfrac12\mathbf1_{\{j=0\}},\\
U(i,j)&=2\bigl(Q(i,j)-d_j\bigr).
\end{aligned}
$$

The kernel $U$ is nonnegative and stochastic. For any normalized stationary probability rows $u,v$, the common reset mass cancels, and [total-variation contraction under a stochastic channel](lean:D5/S3/TotalVariation/DataProcessing.total_variation_channel_le) gives

$$
\operatorname{TV}(u,v)
=\tfrac12\operatorname{TV}(uU,vU)
\le\tfrac12\operatorname{TV}(u,v).
$$

[Nonnegativity](lean:D5/S3/TotalVariation/Metric.total_variation_nonneg) and [the zero criterion](lean:D5/S3/TotalVariation/Metric.total_variation_eq_zero_iff) imply $u=v$, hence $u=q$. Starting from this common initial mass, induction on word length using the undivided transition identity gives agreement of $\rho$ and $\mu$ on all finite suffix cylinders at every integer origin. The cylinder for a length-zero window is the whole space and has mass $1$ under both laws.

The identity $r_t=\mathrm{false}\Longleftrightarrow J_{t+1}=0$ makes each finite relation-bit window a measurable function of a finite suffix window. Equality of suffix cylinders therefore gives equality of all cylinders of the actual Boolean relation paths. [Bilateral Boolean cylinder uniqueness](lean:D5/S3/Observer/ProbabilisticClosure/TrajectoryLaws/TwelveStateGhost.visible_eq_of_cylinders) identifies the pushforward measures on $\mathrm{Bool}^{\mathbb Z}$; the measurable subtype embedding of $X_K$ then gives $\rho=\mu$. Conversely, equality with $\mu$ gives the attainment already proved. This establishes the equality criterion. In the extended-real order, the universal upper bound together with exclusion of equality gives the strict inequality for each $\rho\ne\mu$. This strictness is pointwise in the measure and supplies no common positive entropy gap for all distinct measures.

**The general Parry theorem.** The application above gives the metric entropy bound, attainment, and uniqueness for this bilateral system. The following references address the general finite-type theorem. M. Pollicott et al.'s survey *The mathematical research of William Parry FRS* ([institutional PDF](https://wrap.warwick.ac.uk/id/eprint/682/1/WRAP_pollicott_Parry_research.pdf), §2.3, pp. 323–324; DOI: [10.1017/S0143385708000102](https://doi.org/10.1017/S0143385708000102)) describes the unique intrinsic Markov measure of maximal entropy under a **primitive finite adjacency matrix, that is, irreducibility and aperiodicity**. Aperiodicity alone does not replace irreducibility. This section used that survey; for Parry's 1964 original paper (*Trans. Amer. Math. Soc.* **112**, 55–66; DOI: [10.1090/S0002-9947-1964-0161372-1](https://doi.org/10.1090/S0002-9947-1964-0161372-1)), only bibliographic information was checked, and the original text was not read.

**Abramov's first-return formula: a separate literature result, not formalized in this book.** L. M. Abramov (*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650) proved that in a probability-preserving ergodic system $(X,\mathcal B,\eta,S)$, for a measurable return set $A\in\mathcal B$ with $\eta(A)>0$, the first-return time $\tau_A(x)=\min\{n\ge1:S^nx\in A\}$ is finite almost everywhere on $A$. With induced map $S_A(x)=S^{\tau_A(x)}x$ and normalized conditional measure $\eta_A(B)=\eta(B\cap A)/\eta(A)$,

$$
h_{\eta_A}(S_A)=\frac{h_\eta(S)}{\eta(A)}.
$$

Both sides must use the same logarithm base. The left side is entropy per return, while $h_\eta(S)$ on the right is entropy per original step. The maximal-entropy application above does not prove this first-return formula or supply an entropy formula for a physical realization, irreversible readout, or finite $p$-adic remainder tree. Applying the literature result to such objects still requires the actual probability-preserving system, return set, and correspondence to be established separately.
:::

::: {.theorem #thm-ch39-p2e-parry-topological-entropy title="Topological Entropy of the Bilateral Parry Shift" lean="D5/S3/TotalVariation/ParryTopologicalEntropy.bilateral_entropy"}
Let $K\ge2$ and equip $\mathrm{Bool}^{\mathbb Z}$ with the product uniformity. Let $X_K$ consist of paths whose every length-$K$ window contains a zero. Write $T$ for the one-step left shift and $\beta_K$ for the order-$K$ d-bonacci Perron root. Use Mathlib's cover entropy on $X_K$. Then

$$
h_{\mathrm{top}}(T,X_K)=\log\beta_K.
$$
:::

::: proof
Appending zeros extends each admissible finite word to a one-sided path. Let $a_n$ count the words of length $n$. The word counts and the powers $\beta_K^n$ obey the same $K$-term recurrence. The initial values give $\beta_K^n\le a_n\le 2^K\beta_K^n$. The limit of $n^{-1}\log a_n$ gives the one-sided topological entropy $\log\beta_K$.

Reading the entire forward tail from any nonpositive integer origin maps the bilateral space onto the same one-sided subshift and intertwines the shifts. Moving the origin to the left includes any prescribed finite set of coordinates. Thus every entourage of the bilateral product uniformity can be controlled by one forward-tail reading, and the two cover entropies agree. The full proof is checked by the Lean kernel.
:::

Complementing bits identifies this model with the finite $S$-gap shift for $S=\{0,\ldots,K-1\}$. The entropy formula then also follows from Ahmadi Dastjerdi and Jangjoo’s entropy function. [Computations on Sofic S-gap Shifts](https://doi.org/10.1007/s12346-013-0096-2)

Dividing by $\log 2$ gives $\log_2\beta_K$ bits per step. Numerical evaluation gives approximately $0.69424$, $0.87915$, and $0.94678$ bits per step at $K=2,3,4$. As $\beta_K\nearrow2$, the value increases to one bit per step.

In the bilateral Parry system above, take the return section to consist of paths that have just read a zero. Every path encounters another zero within $K$ steps. The conditional measure on this section reconstructs the original measure.

::: {.theorem #thm-ch39-p2e-native-parry-first-return title="First Return and Occupation Measure of the Bilateral Parry Source" lean="D5/S3/TotalVariation/ParryFirstReturn.actual_first_return_system"}
Let $K\ge2$. On $X_K$ let $T$ be the left shift and let $J_t$ be the suffix length at time $t$ under the bilateral coding above. Take a coding and probability $\mu$ that satisfy the preceding-zero condition, shift invariance and the suffix-cylinder formula of [@thm-ch39-p2e-native-bilateral-parry-law]. Set $A=\{r:r_{-1}=\mathrm{false}\}$. Then $A=\{J_0=0\}$ and $\mu(A)=1/\operatorname{normalizer}(K)>0$, where $\operatorname{normalizer}(K)=\sum_{j=0}^{K-1}p^jR_j$.

For each $r\in X_K$, let $\tau(r)$ be the least positive integer for which $T^{\tau(r)}r\in A$. It satisfies $1\le\tau(r)\le K$. The map $T_A(r)=T^{\tau(r)}r$ preserves the probability $\mu_A=\mu|_A/\mu(A)$, represented as a measure on $X_K$ supported on $A$. The original probability satisfies the measure identity

$$
\mu=\mu(A)\sum_{i=0}^{K-1}(T^i)_*
  \bigl(\mu_A|_{\{r:\,i<\tau(r)\}}\bigr).
$$
:::

::: proof
The variable $J_0$ counts the consecutive true bits immediately before position $0$, so $J_0=0$ exactly when $r_{-1}=\mathrm{false}$. The one-coordinate suffix cylinder gives the probability of this event. A zero occurs within the next $K$ steps from every position. Partition $A$ by the first-return time. On each part the return map is a fixed iterate of the left shift. To invert it, search the image path backward from index $-2$ and shift the first zero found there to index $-1$. This determines a unique inverse branch, so the images are disjoint and cover $A$. Shift invariance then transfers to the conditional probability.

At level $i$, take the paths in $A$ that have taken $i$ steps without yet returning. Shifting them by $i$ gives exactly the paths with $J_0=i$. Shifting back by $i$ recovers the starting point in $A$, and the preceding-zero condition excludes an intervening return. Thus the mass of every measurable event splits by its value of $J_0$. Multiplying the conditional level contributions by $\mu(A)$ and adding them recovers the original event mass. The full proof is checked by the Lean kernel.
:::

Consider any probability distribution on the same duration alphabet. Dividing its entropy per return by the mean number of original steps puts the entropy in units of nats per step.

::: {.remark #rem-ch39-p2e-parry-duration-entropy-rate title="The Parry Distribution Uniquely Maximizes Entropy per Original Step"}
Let $K\ge2$, $p=\beta_K^{-1}$, and $q_d=p^d$ for $1\le d\le K$. For any probability vector $a=(a_1,\ldots,a_K)$, write $H(a)=-\sum_d a_d\log a_d$ and $\ell(a)=\sum_d d\,a_d$. With natural logarithms and zero contributions at zero probabilities,

$$
D(a\Vert q)=-H(a)-\ell(a)\log p,
\qquad
\frac{H(a)}{\ell(a)}\le-\log p.
$$

Equality holds exactly when $a=q$.

Expand each $a_d\log(a_d/q_d)$ using $\log q_d=d\log p$. At zero probability the contributions vanish directly. The mean duration $\ell(a)$ is at least one. Apply the [finite Gibbs inequality](lean:D5/S3/Divergence/GrandmotherTheorem.kl_divergence_nonneg) and divide by this mean to get the upper bound. The [Gibbs equality criterion](lean:D5/S3/Divergence/GibbsEquality.kl_divergence_eq_zero_iff) gives uniqueness.
:::

::: {.theorem #thm-ch39-p2e-parry-raw-window title="Raw Bit Windows on the Parry Zero Section" lean="D5/S3/TotalVariation/ParryFirstReturn.zero_section_raw_window"}
With the coding and measure of [@thm-ch39-p2e-native-parry-first-return], write $p=\beta_K^{-1}$ and $h_j=\sum_{\ell=1}^{K-j}p^\ell$. Let $v_0,\ldots,v_m\in\{0,\ldots,K-1\}$ start at $v_0=0$ and satisfy $v_{i+1}\in\{0,v_i+1\}$ at every step. Set $w_i=\mathbf{1}_{v_{i+1}\ne 0}$ for $0\le i<m$, with $0$ and $1$ denoting the false and true relation bits. Then

$$
\mu_A\{r:(r_0,\ldots,r_{m-1})=w\}=p^m h_{v_m}.
$$

For $m=0$ the event is the whole path space and $h_0=1$.
:::

::: proof
On $A$, the suffix at position zero is zero. Each successive raw bit either resets the suffix to zero or increments it by one. Starting with $v_0=0$, induction identifies the raw window event on $A$ with the single suffix cylinder $(v_0,\ldots,v_m)$. Dividing its mass by $\mu(A)$ removes the initial suffix mass. The ratios $h_{v_{i+1}}/h_{v_i}$ from the allowed transition probabilities telescope to $h_{v_m}$. Thus an unfinished run at the end of a window retains a suffix weight. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-p2e-parry-zero-marginals title="The Zero-Section Law under the Original Shift" lean="D5/S3/TotalVariation/ParrySectionMarginals.section_zero_marginals"}
Use the native bilateral Parry law and its conditional probability $\mu_A$ from [@thm-ch39-p2e-native-parry-first-return]. Write $p=\beta_K^{-1}$. Then

$$
\mu_A\{r:r_0=0\}=p,\qquad
\mu_A\{r:r_1=0\}=2p^2.
$$

The one-step left shift $T$ does not preserve $\mu_A$.
:::

::: proof
The windows $0$, $00$, and $10$ all end at suffix zero. By [@thm-ch39-p2e-parry-raw-window], their conditional masses are $p$, $p^2$, and $p^2$. The windows $00$ and $10$ disjointly exhaust the event $r_1=0$, which is the $T$-preimage of $r_0=0$. Since $p>1/2$, the preimage has strictly larger mass. The full proof is checked by the Lean kernel.
:::

A return orbit records how many steps it takes to read each successive zero. On the zero section, the joint probability of these durations can be computed directly from a suffix cylinder of the original path.

::: {.theorem #thm-ch39-p2e-parry-return-durations title="Joint Distribution of Return Durations in the Bilateral Parry Source" lean="D5/S3/TotalVariation/ParryFirstReturn.return_time_cylinder_probability"}
Use the same $K$, coding and probability $\mu$, zero section $A$, first-return time $\tau$, return map $T_A$, and conditional probability $\mu_A$ as in [@thm-ch39-p2e-native-parry-first-return]. Set $p=\beta_K^{-1}$. For every finite sequence of durations $d_0,\ldots,d_{m-1}\in\{1,\ldots,K\}$,

$$
\mu_A\bigl(\{r\in A:\tau(T_A^i r)=d_i\ \text{for every }0\le i<m\}\bigr)
=\prod_{i=0}^{m-1}p^{d_i}.
$$

For $m=0$ the event is the entire section and the empty product is $1$.
:::

::: proof
A return of duration $d$ traces the suffix sequence $0,1,\ldots,d-1,0$. Its final zero also starts the next return. Joining successive blocks at their common zeros identifies the duration event with one suffix cylinder on the original path. Each allowed transition contributes a factor $p$ times the ratio of the destination and origin weights. The ratios telescope because the initial and final suffixes are both zero. Conditioning divides out the initial cylinder mass $\mu(A)$ and leaves one factor $p^d$ per return. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-p2e-iid-return-prefix title="Raw Windows under Independent Return Durations" lean="D5/S3/TotalVariation/ParryReturnPrefix.iid_return_prefix"}
For $K\in\mathbb{N}$, let $X_K$ be the space of bilateral bit paths with a zero in every block of $K$ consecutive positions. Let $\eta$ be a measure on $X_K$ and let $q_d\in[0,\infty]$ for $1\le d\le K$. Write $[w]_0$ for the cylinder fixing the finite word $w$ from coordinate $0$ onward. All other coordinates are free subject to admissibility, including coordinate $-1$. Assume that for every finite list of durations $d_i\in\{1,\ldots,K\}$, the cylinder of the concatenated blocks $1^{d_i-1}0$ has mass $\prod_{i<m}q_{d_i}$. This includes the empty list and its cylinder $X_K$, with empty product $1$. For any such list and $j\in\mathbb{N}$, the extended window has mass

$$
\eta\bigl([1^{d_0-1}0\cdots 1^{d_{m-1}-1}0\,1^j]_0\bigr)
=\left(\prod_{i<m}q_{d_i}\right)\left(\sum_{d>j}q_d\right).
$$

The last sum runs over $1\le d\le K$.
:::

::: proof
The complete durations fix the number of raw steps already read. At the next return origin, the first $j$ bits are true exactly when the next duration is strictly greater than $j$. Partition the window by this next duration. The complete-duration cylinders are disjoint and measurable, and their masses factor by hypothesis. Summing over the next durations gives the formula. The full proof is checked by the Lean kernel.
:::

The duration distribution also determines the entropy of the induced system. One step here is one return and may span several steps of the original shift.

::: {.theorem #thm-ch39-p2e-parry-induced-entropy title="Kolmogorov–Sinai Entropy of the Induced Parry Return Map" lean="D5/S3/TotalVariation/ParryInducedEntropy.actual_return_entropy"}
Under the hypotheses of [@thm-ch39-p2e-native-parry-first-return], let $T_A$ be the actual first-return map on the same zero section, with normalized conditional probability $\mu_A$. Put $p=\beta_K^{-1}$. With natural logarithms,

$$
h_{\mu_A}(T_A)
=-\sum_{d=1}^{K}p^d\log(p^d)
=\frac{-\log p}{\mu(A)}.
$$

The entropy is in nats per return.
:::

::: proof
By [@thm-ch39-p2e-parry-return-durations], the joint entropy of the first $n$ durations is $n$ times the entropy of one duration. The duration partition therefore gives a lower bound on the Kolmogorov–Sinai entropy.

For the upper bound, observe the relation bits within radius $m$ at each of the first $n$ return points. A duration $d$ determines the block $1^{d-1}0$. The $m$ bits before the starting point and the first $n+m$ durations determine all these windows. The initial bits contribute at most $m\log 2$ to the entropy bound. Dividing by $n$ and taking the limit bounds the rate for each fixed window by the entropy of one duration. As the radius increases, the windows generate the measurable structure of the full bilateral path. The same upper bound then applies to the supremum over all finite measurable partitions.

Finally, expand the stationary suffix weights. The term $p^d$ appears exactly $d$ times in the normalizing sum, so $\sum_{d=1}^K d\,p^d=\operatorname{normalizer}(K)=1/\mu(A)$. Substitution of $\log(p^d)=d\log p$ gives the second equality. The full proof is checked by the Lean kernel.
:::

**Rauzy boundary dimension, the linear ceiling in one dimension, and a planar stabilizer construction (`manual derivation`, using `Literature`).** Let $\beta_3>1$ satisfy $\beta_3^3=\beta_3^2+\beta_3+1$, let $\alpha$ be one of its nonreal conjugates, and put $r=|\alpha|=\beta_3^{-1/2}$ by the product of the three roots. Write $\mathcal R=\mathcal R_3$ for the full Tribonacci Rauzy tile and $U_1=\alpha\mathcal R$, $U_2=1+\alpha^2\mathcal R$, $U_3=1+\alpha+\alpha^3\mathcal R$ for its subtiles. Legal addresses forbid runs of $3$ consecutive $1$s. Let $K_i$ be the set of legal tail sums after a run of $i$ digits equal to $1$. In a contact $K_i\cap(K_j+\delta)$, reading legal digits $u,v$ on the two sides updates the carry $\delta$ to $(\delta+v-u)/\alpha$. Each edge has similarity ratio $r$. Legal tail differences have modulus below $4$, so retain carries of modulus at most $4$ and prune states that cannot extend indefinitely. The interface $J=U_1\cap(U_2\cup U_3)$ starts with opposite digits $0,1$ and initial tail carry $1/\alpha$. The exterior boundary comes from contacts with nonzero translates by the lattice $\mathbb Z(\alpha-2)+\mathbb Z(\alpha^2-\alpha-2)$.

Paper I's Tribonacci contacts lemma gives the finite graph after identifying address swaps. In its cyclic strongly connected component all simple directed cycles pass through a common vertex and have lengths $3,3,4$. The component is primitive, with Perron root $\rho$ determined by $\rho^{-3}+\rho^{-3}+\rho^{-4}=1$, or $\rho^4-2\rho-1=0$. Both the exterior and interface seeds reach that component, so the depth-$m$ path count is $\Theta(\rho^m)$. The exterior dimension is a literature result of Ito–Kimura (1991) and Messaoudi (2000). In the graph-directed framework of Mauldin–Williams (1988), for the dimension equation $\rho r^{D_F}=1$, the covering and lower bounds also follow directly from Paper I's separation estimate. Distinct legal length-$m$ prefixes have distinct real embeddings because the highest differing digit decides their order. Their difference is a nonzero algebraic integer with real modulus at most $\beta_3^m/(\beta_3-1)$. Its field norm then gives projected separation at least $\sqrt{\beta_3-1}\,r^m>\frac{9}{10}r^m$. Each depth-$m$ path gives a cylinder in a ball of radius $4r^m$. A ball of radius $r^m$ meets only a bounded number of ordered prefix pairs by separation on each side, and the ordered pair, recorded in the orientation of the seed, determines the path. The positive Perron weights $w$ assign probability $w_j/(\rho w_i)$ to each edge $i\to j$, giving a path cylinder mass bounded by a constant times $\rho^{-m}$. The mass distribution principle gives the Hausdorff lower bound and the cylinder cover gives the box upper bound. The exterior boundary, $\partial U_1$, and $J$ thus share the same Hausdorff and lower and upper box dimensions, with

$$
D_F=\dim_H(\partial\mathcal R)=\dim_B(\partial\mathcal R)
=\frac{2\log\rho}{\log\beta_3}\approx 1.09336416,\qquad \rho\approx 1.39533699.
$$

**An interval bound for one-dimensional cut-and-project chains (`manual derivation`).** With minimum site separation $a>0$, an interval of length $R$ meets at most $1+R/a$ sites. If each site's Hilbert space has dimension at most $d_{\mathrm{loc}}<\infty$, the reduced entropy is at most $(1+R/a)\log d_{\mathrm{loc}}=O(R)$. As $D_F>1$, this rules out two-sided $R^{D_F}$ entropy scaling on intervals.

**Local Bell pairs on planar cut-and-project patches (`manual derivation`).** Let $W_n$ be the legal words of length $n\ge1$ and set

$$
\begin{aligned}
R_n&=r^{-n},\qquad X_n=\left\{\alpha^{-n}\sum_{j=0}^{n-1}d_j\alpha^j:d\in W_n\right\},\\
A_n&=X_n\cap\alpha^{-n}U_1,\qquad B_n=X_n\setminus A_n .
\end{aligned}
$$

The ambient cut-and-project set is the complex projection of the elements of $\mathbb Z[\beta_3]$ with real embedding in $[0,1)$. The patches have separation at least $\frac{9}{10}$. Truncating infinite addresses shows that every point of the scaled tile is within $4$ of $X_n$. The legal word counts start at $1,2,4$ and satisfy the Tribonacci recurrence, so $\beta_3^n\le |X_n|\le 2\beta_3^n$. In Paper I's contact graph, unfold the address swaps into two orientations and use the swap recorded on each edge to track the original order of the addresses. Retain only the edges whose first oriented digit is $0$. Repeated deletion of vertices with no successor exhausts the oriented graph. Swapping the addresses gives the same conclusion for the second oriented digit. Finite zero-padded prefixes therefore avoid the interface, and $A_n$ consists exactly of sites whose first digit is $0$. Join sites in $A_n$ and $B_n$ at distance at most $8$. Keeping the ordered prefix pair from the oriented interface seed along each path of depth $n-1$ gives $\Theta(\rho^{n-1})$ distinct crossing prefix pairs, each endpoint within $4$ of the same contact point. Uniform separation bounds the degree by a constant $\Delta$. Each edge of a maximal matching meets at most $2\Delta-1$ graph edges, which gives a matching size $m_n$ of at least the same order. Conversely, each crossing endpoint in $A_n$ is within $8$ of $\alpha^{-n}\partial U_1$. This boundary is covered by $O(\rho^{n-1})$ balls of radius $4$, and enlarging the radii to $12$ still leaves only boundedly many sites in each ball. Hence $m_n=O(\rho^{n-1})$.

Put one qubit at each site, prepare $\Phi=(\lvert00\rangle+\lvert11\rangle)/\sqrt2$ on each matched edge, and prepare $\lvert0\rangle$ at each unmatched site. Use $I-\lvert\Phi\rangle\langle\Phi\rvert$ on matched edges and $I-\lvert0\rangle\langle0\rvert$ at unmatched sites. The terms have disjoint supports and commute. Their sum is a Hamiltonian with a stabilizer ground state given by this unique product preparation. The spectral gap is exactly $1$, and the interaction range is at most $8$. Each crossing Bell pair contributes $\log 2$. Since $\rho^n=R_n^{D_F}$, there are positive constants $c_-,c_+$ independent of $n$ with $c_-R_n^{D_F}\le S(\rho_{A_n})=m_n\log 2\le c_+R_n^{D_F}$. The region is the scaled subtile, whose diameter is comparable to $R_n$. Paper I's *Tribonacci contacts* and *A planar local Bell-pair construction* give the geometry and matching count. The projector Hamiltonian follows directly from the disjoint Bell pairs.

::: {.problem #prob-ch39-p2e-fractal-horizon title="Open Problem: Rauzy Fractal-Horizon Entanglement Scaling in Pisot Cut-and-Project Quantum Many-Body Systems"}
**Remaining questions (`OPEN`).** The argument above gives the $O(R_n)$ bound on one-dimensional intervals and realizes $S(\rho_{A_n})=\Theta(R_n^{D_F})$ with a local commuting-projector Hamiltonian across the subtile cut in finite planar Tribonacci patches. On-site rotations can produce a nonstabilizer ground state with the same entanglement and gap. Adding noncommuting positive local terms that annihilate the ground state can also preserve the state and a positive gap. For translation-invariant or lattice-uniform local gapped Hamiltonians whose interaction rules are independent of the prescribed cut and its matching, when does an $R_n^{D_F}$ leading term or a fractal subleading term occur? How does spatial entanglement scale in the Slater state of the physical Tribonacci hopping chain at a specified filling? Can such scaling occur for general anisotropic Pisot acceptance windows with $K\ge4$? For a specified spatial cut, which spectral-gap and locality conditions are necessary and sufficient for failure of the codimension-one area law?
:::
