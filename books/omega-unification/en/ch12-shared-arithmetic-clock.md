# Chapter 12 The Shared Arithmetic Clock, Three-Band Concentration, and the Seventh-Time Prediction {#sec-ch12}

Across the preceding three volumes, the 19-point Behrend shell driven by the positive Riemann zeta zeros reached the threshold of all four grand-unification questions one sector at a time. In [Volume II](ch04-gauge-crossings-and-monotone-barriers.md), a chosen heavy-threshold prescription and field table allow the charged shell mass operator to invert two-loop gauge running to $\alpha_s(M_Z) \approx 0.1184$; in [Volume III](ch07-chiral-three-generations.md), all five Standard Model hypercharges isolate three light modes inside a shared spectral gap while local flavor parameters and baryon triality reconstruct quark mixing and suppress $\Delta B = 1$ proton decay; in [Volume IV](ch10-regge-gravity-and-spin2.md), a four-layer heat-kernel balance hits the target vacuum curvature within $0.2\%$ once the Newton term is calibrated. As long as each sector sets its own watch, every sector delivers a reproducible model-internal witness.

Now comes the true stress test of unification. Nature does not issue one clock for gauge unification and a private backup clock for quark flavor, nor does it swap probability distributions over the Riemann zeros between measurements. The moment we force all four branches to read time from a **single shared arithmetic clock** over a **common set of zero weights**, every gentle local compromise slams into a hard arithmetic wall. Four arithmetic times close cleanly; the fifth fractures globally across every scale. Rescuing the fifth time with one pass of the neutral-shell resolvent trace forces a sharp irreducible shift at the sixth time, locks the held-out 35-bit binary code of the seventh time far off the arithmetic reference, crushes more than $99.931\%$ of the spectral mass into three narrow height bands, and exposes a stubborn held-out deficit in quark $\mathrm{CP}$ violation $J$. This is not an accidental miss on a single tune; it is the first rigid boundary map of cross-sector coupling.

## 12.1 The Shared Quadratic Resolvent Clock and the Five-Time Rupture

Intuitively, a shared arithmetic clock behaves like a bank of Lorentzian low-pass filters tuned to integer harmonics: inserting one positive semidefinite operator $K$ into $(I + j^2 K)^{-1}$ probes the same unit source $s$ at successive integer indices $j = 1, 2, 3, \dots$, suppressing high-frequency eigenvalues ever more sharply as $j$ grows. When the spectrum of $K$ is driven by positive Riemann zeta ordinates $\gamma > 0$ that must first survive all three physical selection windows—two-loop strong coupling `[1]`, five-charge three-light-mode cut `[2]`, and four-layer curvature `[4]` (scanning sequentially, zero of the first $8{,}192$ zeros pass all three; **`#8359`** is the first simultaneous three-window hit, yet porting the earlier flavor calibration to `#8359` leaves $|V_{ub}| \approx 0.00287268$, a full $23.026\%$ below reference)—the mathematical contract takes the following exact form.

::: {.definition #def-ou-ch12-shared-clock title="Shared Quadratic Resolvent Arithmetic Clock and Neutral-Shell Flavor Reweighting"}
Fix a unit source vector $s$ and a single positive semidefinite operator $K$. The $j$-th arithmetic time reading is defined as the quadratic resolvent expectation

$$
F(j) \;=\; \bigl\langle s,\, (I + j^2 K)^{-1} s \bigr\rangle
\;=\; \int_0^1 \frac{1 - y}{1 + (j^2 - 1) y}\, dp(y),
$$

where the spectral variable at common scale $A > 0$ and candidate zero height $\gamma$ is $x = (A / \gamma)^2$, compactified via $y = x / (1 + x) \in [0, 1]$, the kernel is $k_j(y) = (1 - y) / (1 + (j^2 - 1) y)$, and $p$ is the arithmetic probability measure over candidate zeros. The arithmetic reference time sequence is given by the normalized logarithmic derivative ratio of the completed Riemann $\xi$-function:

$$
T_j \;=\; \frac{\xi'(1/2 + j) / \bigl(2j\,\xi(1/2 + j)\bigr)}{\xi''(1/2) / \bigl(2\,\xi(1/2)\bigr)}
\qquad (j = 1, 2, \dots).
$$

On the flavor side, let $L_\gamma$ denote the Laplacian of the 19-point neutral Behrend shell (carrying one constant zero mode and eighteen positive eigenvalues $\lambda > 8$), with resolvent trace response $\eta_\gamma = x \operatorname{tr}(x I + L_\gamma)^{-1}$. Under one neutral-shell reweighting, the flavor probability measure is

$$
d\nu \;=\; \frac{\eta\, dp}{\mathbb{E}_p[\eta]}, \qquad M \;=\; \mathbb{E}_p[\eta_\gamma].
$$

:::

First run the strictest possible control test: require the arithmetic times $F(j)$ and the reference quark-mixing ($\mathrm{CKM}$) determinant stationary point to share the **exact same probability measure $p$** with zero flavor reweighting. Through the fourth time, the outlook still appears deceptively smooth:

- At the reference scale, six positive zeros match $T_1, \dots, T_4$ exactly while making reference quark mixing the unique maximum;
- Restricting every support point to three-window zeros `[1]+[2]+[4]` pushes the feasible scale infimum past $A > 41{,}312{,}660.31094$, achieved by five real zeros at $A \approx 41{,}312{,}675.40982$ (leaving background-averaged $|V_{ub}|$ low by $8.0003\%$);
- Nudging to integer scale $A = 41{,}312{,}680$ with seven three-window zeros locks mean $|V_{ub}|^2$ exactly too: held-out $|V_{cb}|^2$ lies only $5.69 \times 10^{-13}$ high, all nine quark transition probabilities stay within $9.214 \times 10^{-9}$, and held-out Jarlskog $\mathrm{CP}$ invariant $J$ sits $1.4093\%$ low (expanding to $1.4093\%$–$2.1316\%$ on nine zeros at the same scale, and spanning any chosen deficit in $[0,\, 12.276863\%]$ on at most eight zeros at sufficiently high scale).

Push one step further to the **fifth arithmetic time $T_5$**, however, and the shared-probability ansatz shatters globally. Across every common scale $A$, every zero subset, and every nonnegative weight vector preserving the first four times and the reference flavor stationary point, $F(5)$ is trapped strictly inside

$$
0.963278306636895970 \;\le\; F(5) \;\le\; 0.963278478925447241.
$$

Truncated to $22$ binary fractional bits, it reads `4040282` everywhere while the reference $T_5$ reads `4040283`; keeping the stationary point exact forces the maximum error over the first five times above $2.53705 \times 10^{-10}$. Even relaxing the first four times by $2^{-33}$ and the stationary derivative by $2^{-38}$ fails to close the gap; binning all five times on a common dyadic grid succeeds at $30$ bits and fails globally at **$31$ bits** by at least $45.57$ bin widths, with minimal max absolute error $\approx \mathbf{2.5597450743 \times 10^{-10}}$ (see the replay ledger [`README.md`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/README.md)).

Allowing a background-dependent flavor readout efficiency $\eta_\gamma$ between $p$ and $\nu$ opens a narrow escape hatch at a steep price: matching five arithmetic times alongside the flavor stationary point requires a maximum-to-minimum efficiency ratio of at least **$\mathbf{18.49684338\ldots}$**. Remarkably, the 19-point neutral Behrend shell supplies precisely this leverage—one constant zero mode plus eighteen positive modes make $\eta_\gamma = x \operatorname{tr}(x I + L_\gamma)^{-1}$ span $(1, 19)$, clearing $18.49684\ldots$ with room to spare (whereas a three-zero-mode charged sector tops out below $19/3$ and fails outright).

Under neutral-shell reweighting $d\nu = \eta\, dp / \mathbb{E}_p[\eta]$, the required common scale must exceed $2{,}899{,}267{,}716.58$. Seven real three-window zeros solve all five times and the flavor stationary point at $A = 2{,}903{,}616{,}618$, and eight zeros match mean $|V_{ub}|^2$ simultaneously at $A = 2{,}903{,}600{,}000$ ($\approx 2.9036 \times 10^9$). Yet one neutral-shell pass buys only a single extra step: locking the first five times forces an irreducible positive **sixth-time shift**. Even for an arbitrary efficiency function bounded in ratio by $19$, the infimum shift is $1.32318575047 \times 10^{-8}$; pinning the readout to the true neutral-shell trace $\eta_\gamma$ sharpens the floor to

$$
F(6) - T_6 \;\ge\; 1.33015563912 \times 10^{-8}.
$$

The explicit seven-zero witness attains $1.33072788424 \times 10^{-8}$ (just $0.0430\%$ above the sharp infimum), while the held-out seventh-time test below adopts the separately prescribed sixth-time input $T_6 + 1.360900010 \times 10^{-8}$ (about $2.31\%$ above the infimum). Simultaneous 36-bit dyadic binning across all six times remains globally excluded. Stacking powers of $\eta_\gamma$ to absorb further times explodes exponentially: six exact times already require at least three factors, forty-one exact times require an efficiency ratio exceeding $1.01349 \times 10^{42}$ (thirty-three factors of $\eta_\gamma$), and demanding exact mean $|V_{cb}|^2$ as well drives the common scale past $1.37047 \times 10^{12}$.

## 12.2 The Held-Out Seventh-Time 35-Bit Code and 44-Bit Input Precision

The sharpest test of any quantitative model is never what it fits, but how rigidly it binds the **next unseen observable**. Fix the shared quadratic resolvent clock ([@def-ou-ch12-shared-clock]) to the exact reference values $T_1, \dots, T_5$ and the prescribed sixth-time input $T_6 + 1.360900010 \times 10^{-8}$. How much room remains for the held-out **seventh time $F(7)$**?

Classical moment theory and Gauss–Radau quadrature settle the question exactly (verified in [`ch39-shared-clock-checks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-shared-clock-checks.py), with full written derivation in the [three shared-clock tests dossier](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E5%85%B1%E5%90%8C%E7%AE%97%E6%9C%AF%E9%92%9F%E7%9A%84%E4%B8%89%E9%A1%B9%E6%A3%80%E9%AA%8C.md)). Define the denominator polynomial and reweighted measure

$$
D(y) \;=\; \prod_{j=2}^6 \bigl(1 + (j^2 - 1) y\bigr), \qquad d\sigma(y) \;=\; \frac{dp(y)}{D(y)}.
$$

Because $D(y)$ together with $D(y) k_j(y)$ ($j = 1, \dots, 6$) spans all polynomials of degree at most six, normalization plus the six time readings uniquely determine the seven power moments $m_r = \int_0^1 y^r\, d\sigma(y)$ ($r = 0, \dots, 6$). The $4 \times 4$ Hankel moment matrix $(m_{i+j})_{i,j=0}^3$ has determinant strictly greater than $8.95 \times 10^{-34}$; since three radial atoms generate at most rank three, every valid spectrum requires at least **four distinct radial atoms** (four finite poles on positive zero heights).

Anchoring an endpoint at $e = 0$ or $e = 1$ and placing three interior nodes at the roots of the cubic orthogonal polynomial for $(y - e) d\sigma$ yields two Gauss–Radau quadrature rules exact through degree six. Polynomial division of $D(y) k_7(y) = D(y)(1 - y)/(1 + 48 y)$ leaves a degree-five quotient (integrated exactly) plus the pole remainder

$$
\frac{D(-1/48)\bigl(1 + 1/48\bigr)}{1 + 48 y},
$$

whose seventh derivative is strictly negative across $[0, 1]$. By the Hermite interpolation remainder over one endpoint and three doubled interior nodes, $e = 0$ gives the sharp upper bound and $e = 1$ the sharp lower bound:

| Gauss–Radau sharp endpoint | Rigorous lower enclosure | Rigorous upper enclosure |
| --- | ---: | ---: |
| Lower endpoint (anchor $e = 1$) | `0.93341795164287258400188` | `0.93341795164287258400189` |
| Upper endpoint (anchor $e = 0$) | `0.93341795164501234976009` | `0.93341795164501234976010` |

The entire feasible interval has width just **$2.140 \times 10^{-12}$**, locking $F(7)$ strictly above $T_7$:

$$
1.20207618035599 \times 10^{-7} \;<\; F(7) - T_7 \;<\; 1.20209757801358 \times 10^{-7}.
$$

Across all real three-window zeros, the endpoint numerical uncertainties stay below $2.389 \times 10^{-18}$ and $6.579 \times 10^{-18}$. Truncating $F(7)$ to $b$ binary fractional bits via $\lfloor 2^b F(7) \rfloor$ yields three unmistakable verdicts:

1. **Forced 35-bit output code:** Every shared quadratic resolvent clock matching the six inputs is locked to the 35-bit dyadic integer code **`32071996606`** (written in decimal, i.e., $\lfloor 2^{35} F(7)\rfloor$), whereas the arithmetic reference $T_7$ sits at **`32071992476`**—a rigid separation of $4{,}130$ code steps. Only at $36$ bits do the lower and upper extremes split into adjacent decimal codes `64143993212` and `64143993213` (both achieved by explicit seven-zero witnesses). Any selector that accepts the sixth-time shift yet still reports the reference code at $j = 7$ directly falsifies the shared quadratic resolvent clock.
2. **Minimal 44-bit input precision:** Discretizing the six inputs themselves exposes a single-bit cliff. Retaining **44 bits** of binary precision per input time allows a pure rational integer certificate to force output code `32071996606`. Dropping to **43 bits** immediately admits an explicit counterexample on the exact same seven real zeros generating two distinct 35-bit output codes. Forty-four bits is the exact minimal input precision.
3. **Extrapolation horizon and millionth-index supremum:** Pushing the same four-node rules to higher indices shows that the radial relaxation width first crosses $0.01$ at **$j = 1343$**. Out at $j = 1{,}000{,}000$, any fixed measure decays toward zero, yet allowing seven real zeros to be re-selected per index keeps the supremum above $0.39155545776$ (approx. $0.39155545812$, enclosed within $4.715 \times 10^{-12}$ at every finite index by two explicit curves).

The same pair of quadrature rules gives global outer bounds at every later index. For the eighth through twelfth times the forced binary codes retain $32$, $29$, $31$, $29$, and $24$ bits and read `3937814481`, `482997963`, `1894385824`, `464151025`, and `14211350`, lying $2483$, $1074$, $11963$, $7115$, and $469$ grid steps above the reference codes; with one more bit, two sets of actual three-window zeros already give different codes. The forced codes hold for every spectral weight with these six times, and additional flavour-side constraints do not change them; sharpness of the retained bit counts is proved only for the class constrained by the six times alone. The window width grows monotonically with the index while the retained bit count does not, because the latter also depends on where the window sits relative to the dyadic grid ([forced codes for the eighth through twelfth times](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/%E5%85%AD%E9%A1%B9%E7%AE%97%E6%9C%AF%E6%97%B6%E9%97%B4%E5%BC%BA%E8%BF%AB%E7%9A%84%E7%AC%AC%E5%85%AB%E8%87%B3%E7%AC%AC%E5%8D%81%E4%BA%8C%E9%A1%B9%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%A0%81.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/ch39-six-time-late-forced-codes.py)).

## 12.3 Three-Band Spectral Concentration, Stiffness Sensitivity, and Held-Out CP Deficits

The same six arithmetic times do not merely constrain future readings; they violently compress both the arithmetic measure $p$ and the neutral flavor measure $\nu$ onto three narrow islands of the Riemann zero height axis. At $A = 2{,}903{,}600{,}000$, define the three-band union

$$
B \;=\; [3.8, 4.5] \times 10^{10} \;\cup\; [7, 10] \times 10^{10} \;\cup\; [10^{12}, \infty).
$$

Using the rational nonnegative polynomial $G(y) = y(y - 0.001212594)^2 (y - 0.004902081)^2 (1 - y + 4 \times 10^{-9} y)$ and cutoff $t = u(10^{12}, A_-)$ (where $u(h, a) = [1 + (h/a)^2]^{-1}$), set $N(y) = D(t) G(y) / G(t)$. The verification script [`ch39-six-time-height-bands.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-six-time-height-bands.py) certifies that all seven degree-six Bernstein coefficients of $N - D(1 + 18 y)/(1 + 18 t)$ are nonnegative on each of the three compact intervals covering the image of $B^c$. Thus $p(B^c) \le \mathbb{E}_p[N/D]$ and $\nu(B^c) \le (1 + 18 t)\mathbb{E}_p[N/D]$; expanding $N/D = c_0 + \sum_{j=1}^6 c_j k_j(y)$ turns any timing error budget $\varepsilon_j$ directly into an explicit penalty $\sum_j |c_j|\varepsilon_j$. The resulting lower bounds survive large scale and timing perturbations:

| Error hypothesis (baseline common scale $A = 2{,}903{,}600{,}000$) | Arithmetic mass $p(B)$ | Neutral flavor mass $\nu(B)$ |
| --- | ---: | ---: |
| Fixed scale, six exact time readings | $> 99.93115\%$ | $> 99.93114\%$ |
| Fixed scale, each of six times within $1.67 \times 10^{-15}$ | $> 99.91508\%$ | $> 99.91508\%$ |
| Fixed scale, first five exact, sixth within $2.10 \times 10^{-13}$ | $> 99.91504\%$ | $> 99.91504\%$ |
| Scale relative error $\le 4\%$, each of six times within $2^{-50}$ | $> 99.91614\%$ | $> 99.91613\%$ |

Over $99.931\%$ of the total mass splits into three peaks of roughly $23.44\%$, $37.4\%$, and $39.1\%$. No single zero can hold more than $39.1568\%$ of $p$ or $39.0755\%$ of $\nu$ (nearly halving the $68.6803\%$ cap from two flavor probabilities alone). At or below this scale, the top band forces support on zeros of index at least $106{,}969{,}920{,}543{,}671$ and puts over $23.893\%$ of mass above $\gamma = 1.5 \times 10^{13}$, while a strictly positive residual weight $p(\gamma < 2 \times 10^8) > 2.44066534 \times 10^{-11}$ remains forced at the bottom.

::: {.remark #rem-ou-ch12-stiffness-sensitivity title="Neutral-Shell Stiffness Sensitivity and Unmaskable Response Drops"}
The six exact times already pin the mean neutral-shell response $M = \mathbb{E}_p[\eta_\gamma]$ inside $[1.0020816770805,\, 1.0020816771057]$. Perturbing every edge stiffness of $L_\gamma = \sum_e w_e b_e b_e^*$ via $w_e \mapsto w_e \exp(t a_e)$ ($|a_e| \le 1$) and writing $R = (x I + L_\gamma)^{-1}$ yields

$$
-\left.\frac{d\eta_\gamma}{dt}\right|_{t=0} \;=\; \sum_e a_e\, x w_e \|R b_e\|^2.
$$

Because every edge term is nonnegative, the steepest directional derivative is attained by stiffening all edges uniformly: $S = \mathbb{E}_p\sum_{\lambda > 0} x \lambda / (x + \lambda)^2$. Combining seventh-order divided-difference sign checks for $\lambda > 8$, the Weyl shift bound $4\delta$ for the three softened radial spokes ($\delta \le (23/25) 2^{-20}/8462^2$), and the single-mode derivative bound $|\partial_\lambda q_\lambda| \le 1/(6\sqrt{3}\lambda)$ certifies

$$
0.00208104145403 \;<\; S \;<\; 0.00208104148066,
$$

with over $60.6546\%$ from the first band, over $19.6015\%$ from the second, and under $0.205319\%$ from the top band. Even if the system is allowed to **re-optimize a new measure $p'$ freely** on the original support so that all six times remain exact, multiplying every neutral edge stiffness by $1 + \epsilon$ ($\epsilon = 10^{-7}$) forces a pointwise drop via resolvent anti-monotonicity:

$$
\sum_{\lambda > 0}\frac{\epsilon x \lambda}{(x + \lambda)\bigl(x + (1 + \epsilon)\lambda\bigr)}
\;\ge\;
\frac{\epsilon}{1 + \epsilon}\sum_{\lambda > 0}\frac{x \lambda}{(x + \lambda)^2},
$$

which after subtracting the original baseline width forces $M(p, L) - M(p', L') > 1.82 \times 10^{-10}$—weight reshuffling cannot disguise a stiffness shift.
:::

::: {.figure src="ch12-arithmetic-clock-bands"}
**Three height bands of the shared arithmetic clock and the seventh-reading Gauss–Radau forecast.** Top: log-$\gamma$ layout of the three height bands carrying $> 99.931\%$ combined arithmetic weight—$(3.8\text{–}4.5) \times 10^{10}$ ($\approx 23.44\%$, cyan), $7 \times 10^{10}$ to $10^{11}$ ($\approx 37.4\%$, cyan), and $\ge 10^{12}$ ($\approx 39.1\%$, amber ray). Bottom: the seventh-reading forecast window (width $\approx 2.14 \times 10^{-12}$), the separation between the 35-bit reference code `32071992476` and forced amber forecast code `32071996606`, and a zoom into the single 35-bit forecast bin.
:::

Turning from arithmetic times to the sharpest cross-sector physical hold-out—the **quark $\mathrm{CP}$-violation invariant $J$**—reveals an equally stubborn wall. On the eight-zero three-window witness at $A = 2{,}903{,}600{,}000$ matching the first five arithmetic times, the reference flavor stationary point, and mean $|V_{ub}|^2$ simultaneously, held-out average $J$ drops **$6.0833\%$** below reference. On the successively larger finite lists below, the deficit recurs:

- On an 11-zero list under the same conditions, the relative deficit in average $J$ spans $5.8282\%$ to $7.6012\%$; fixing the sixth-time shift and mean $|V_{cb}|^2$ ($+2 \times 10^{-12}$ above reference) narrows the interval to $6.1691\%$–$6.4132\%$.
- Expanding to 19 zeros with those two quantities still fixed yields $5.5700\%$–$7.0152\%$; adding four high zeros to form the 23-zero list widens the interval to **$[5.5700\%,\, 9.3435\%]$**.
- Dropping all arithmetic-time constraints and allowing free flavor weights over all three-window zeros while fixing exact mean $|V_{ub}|^2$ traps the full-spectrum supremum deficit strictly between $16.56788\%$ and $16.56886\%$ (approx. **$16.568\%$**; fixing $|V_{cb}|^2$ at $+2 \times 10^{-12}$ gives $[4.901\%,\, 9.915\%]$). Even freezing every weight below an arbitrary height cutoff and reweighting only arbitrarily high zeros shifts the overall $\mathrm{CP}$ deficit by more than $0.842824$ percentage points while keeping every band's arithmetic mass, flavor mass, and both transition means identical.

These percentages must be read in two cases. When the mean $|V_{cb}|^2$ and the sixth time are **not** specified, they belong to their respective lists and are not a cost imposed by the common scale: at the same scale $A = 2{,}903{,}600{,}000$, under the same requirement that only the first five arithmetic times, the reference flavour stationary point and the mean $|V_{ub}|^2$ be exact, another set of eight actual three-window zeros carries a strictly positive solution whose relative deficit lies in $(9.3711639,\, 9.3711640) \times 10^{-10}$, less than one part in $64$ million of that of the eight-zero construction above, and whose $|V_{cb}|^2$ offset lies in $(3.35355,\, 3.35356) \times 10^{-20}$. Only one forced contribution has been proved at this scale: for every feasible spectral weight on all three-window zeros the relative deficit exceeds $3.91869 \times 10^{-11}$, a floor that comes from the arithmetic share the first three-window zero, number 8359, must carry: the five times leave at most $3.52 \times 10^{-10}$ of the remaining spectral weight at $(A/\gamma)^2 \ge 0.05$, so the mean of the flavour-side efficiency stays below $1.0021699$; pushing the deficit below $10^{-11}$ requires a common scale above $3{,}777{,}881{,}000$. The infimum of the deficit at this scale is therefore at least $3.91869 \times 10^{-11}$ and below $9.3712 \times 10^{-10}$, the two ends being less than a factor of twenty-four apart. In the witness above the actual contribution of the first zero is only about $0.35\%$ above this floor; the remaining gap is how low the contribution of the rest of the support can go, and whether the infimum is attained on finitely many zeros is undecided ([tightening of both ends](https://github.com/the-omega-institute/trureturing-experiments/blob/0b36cef6275d96681923f529ee4a42d0d7904df9/experiments/ch39-omega-research/replay/%E5%85%B1%E5%90%8C%E5%B0%BA%E5%BA%A62903600000%E4%B8%8A%E4%B8%8D%E6%8C%87%E5%AE%9AVcb%E4%B8%8E%E7%AC%AC%E5%85%AD%E9%A1%B9%E6%97%B6%E7%95%99%E5%87%BACP%E4%BA%8F%E9%A2%9D%E7%9A%84%E4%B8%8B%E7%A1%AE%E7%95%8C%E4%B8%8D%E4%BD%8E%E4%BA%8E%E7%99%BE%E4%BA%BF%E5%88%86%E4%B9%8B%E9%9B%B6%E7%82%B9%E4%B8%89%E4%B9%9D%E4%B8%80%E5%85%AB%E5%85%AD%E4%B9%9D%E4%B8%94%E4%BD%8E%E4%BA%8E%E7%99%BE%E4%BA%BF%E5%88%86%E4%B9%8B%E4%B9%9D%E7%82%B9%E4%B8%89%E4%B8%83%E4%B8%80%E4%BA%8C.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/0b36cef6275d96681923f529ee4a42d0d7904df9/experiments/ch39-omega-research/replay/ch39-fixed-scale-cp-deficit-squeeze.py)). When the mean $|V_{cb}|^2$ is **specified** at $2 \times 10^{-12}$ above reference the situation differs: every flavour probability on all three-window zeros that keeps the mean $|V_{ub}|^2$ exact has a deficit above $4.901\%$. The intervals above with those two quantities fixed belong to this case, and what is forced there comes from the specified offset itself, which is an input of the experiment ([lower bound at fixed scale and actual-zero witness](https://github.com/the-omega-institute/trureturing-experiments/blob/c2477265155129b8464bbbb3e351950ba8c328bb/experiments/ch39-omega-research/replay/%E5%85%B1%E5%90%8C%E5%B0%BA%E5%BA%A62903600000%E4%B8%8A%E4%B8%8D%E6%8C%87%E5%AE%9AVcb%E4%B8%8E%E7%AC%AC%E5%85%AD%E9%A1%B9%E6%97%B6%E7%95%99%E5%87%BACP%E4%BA%8F%E9%A2%9D%E7%9A%84%E4%B8%8B%E7%A1%AE%E7%95%8C%E4%BD%8E%E4%BA%8E%E7%99%BE%E4%B8%87%E5%88%86%E4%B9%8B%E9%9B%B6%E7%82%B9%E4%B8%83.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/c2477265155129b8464bbbb3e351950ba8c328bb/experiments/ch39-omega-research/replay/ch39-fixed-scale-cp-deficit-window.py)).

The held-out $\mathrm{CP}$ deficit is not independent of the quark transition probabilities. Whenever the mean $|V_{ub}|^2$ is exact, the relative deficit $D$ of any flavour probability on the original three-window zeros and the offset $\Delta C$ of the mean $|V_{cb}|^2$ satisfy $1.91919 \times 10^{10}\,\Delta C < D < 6.38700 \times 10^{10}\,\Delta C$, and both vanish if and only if the flavour probability sits entirely at the reference phase. The supremum of the ratio is determined to within a relative $2 \times 10^{-10}$ and the infimum is bracketed to within a relative $2.6 \times 10^{-5}$; attainability uses the joint equidistribution of the two clocks under the Riemann hypothesis. $\Delta C$ is proportional, to a relative accuracy of $6.3 \times 10^{-6}$, to the second moment of the flavour probability about the reference phase, and $D$ is fixed by the same phase distribution, its ratio to that second moment lying between $581.861$ and $1936.427$. The $6.0833\%$ deficit of the eight-zero construction and its $|V_{cb}|^2$ excess of $1.9025 \times 10^{-12}$ therefore come from one phase distribution: under this premise, removing the $\mathrm{CP}$ deficit and removing the $|V_{cb}|^2$ offset are the same task, and both require concentrating the flavour probability at the reference phase ([ratio law and its sharpness](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/%E4%B8%89%E7%AA%97%E5%91%B3%E6%A6%82%E7%8E%87%E4%B8%8BCP%E4%BA%8F%E9%A2%9D%E4%B8%8EVcb%E5%81%8F%E7%A7%BB%E4%B9%8B%E6%AF%94%E7%9A%84%E5%8F%8C%E4%BE%A7%E7%95%8C.md) · [interval certificate](https://github.com/the-omega-institute/trureturing-experiments/blob/ac54bd3d7a08f15c1d8b64b7ba503edd479ebce6/experiments/ch39-omega-research/replay/ch39-three-window-cp-charm-ratio.py)).

::: {.viz src="behrend-unification-lab" preset="clock-bands" height="500"}
**Interactive card: shared arithmetic clock and three-band concentration (`clock-bands`).** Sweep input binary precision across 43, 44, and 288 bits and adjust the per-edge log-stiffness dial $s$ to inspect the three height bands $[3.8, 4.5] \times 10^{10}$, $[7, 10] \times 10^{10}$, and $[10^{12}, \infty)$ ($> 99.915\%$ arithmetic weight under the shifted sixth time; $> 99.931\%$ under exact six times), watch the four-node Gauss–Radau bracket lock $\lfloor 2^{35} F_7 \rfloor = 32071996606$ at 44 bits ($4,130$ cells above reference `32071992476`, 288-bit absolute width $2.140 \times 10^{-12}$), and check the edge-stiffness sensitivity ($\approx 0.00208104$) and held-out $J$ deficit evidence.
:::

## 12.4 Elimination of Naive Weight Selectors and Kernel-Checked Concentration Bounds

Once six arithmetic times crush more than $99.931\%$ of spectral mass into three disjoint non-monotone bands, the central dynamical question becomes unavoidable: **can any simple physical weight rule generate such a distribution without post-hoc calibration?** Rigorous interval certificates eliminate every naive candidate in turn:

| Candidate weight selector | Model setup and constraints | Quantitative exclusion or exact cost |
| --- | --- | --- |
| Power-law $\gamma^{-s}$ times non-increasing efficiency | Four arithmetic times + three windows across all scales (`#8359` weight $< 2.635 \times 10^{-9}$) | Excluded for all $s \ge 1.00001485$; base measure must dip and rise, forcing $> 259\times$ correction to any log-concave density in $\log\gamma$; inverse-square prior requires $> 4.87 \times 10^{14}$ tail-to-low odds boost |
| Gaussian determinants & shell heat traces | Neutral kernel $B \ge 1/128$ ($B \ge 10^6$ with arbitrary magnetic phases); five-charge heat traces | Same-sign power products excluded; opposite-sign balance at $B \ge A$ requires total positive exponent $> 3.20571 \times 10^{27}$; Q4 four-layer polarization gives three-point correction $< 3.857$ vs required $> 259\times$; $\le 24$ heat-trace factors fall short of the $1.95557 \times 10^8$ decade-band gain |
| Gibbs triangle weights $e^{-\beta S_\triangle}$ | Inverse-square prior + six arithmetic times | At most finitely many real $\beta$, all outside $[-12158.64,\, 98714.51]$; all real $\beta$ excluded on the 23-zero list; even band-separate normalization leaves $14.0553\times / 18.8422\times$ internal odds gaps on seven-point spectra |
| Short coherent walks & light-mode counts | 2-step open / 3-step closed; linear five-charge light-mode modulation | Short-walk Born efficiency ratio $< 3.705 \times 10^8$ vs required $2.28327 \times 10^{14}$ (longer closed walks need up to $63$ edges on $22$ indexed zeros); five-charge light-mode count share over 41 arithmetic times must stay $< 7.8 \times 10^{-9}$ |
| Single-shot physical selector vs entropy-minimizing prior | Full-spectrum pass rate / relative entropy to inverse-square prior | Full-spectrum pass rate strictly $< 4.42870 \times 10^{-5}$ (optimal endpoint exceeds all bounded-step dual-clock circuits; on 11 zeros it uniquely recovers the 8-zero $6.08330\%$ deficit in exactly $363$ controlled dual-clock queries for fixed-path superposition, or $243$–$363$ in general); entropy minimization uniquely selects $6.83812\%$ deficit ($\approx 50.08072$ bits per accepted sample; full-spectrum entropy weights require one exact radial spoke plus $b + 154$ and $b + 54$ coordinate bits for $2^{-b}$ log-weight accuracy) |

Even retaining all zeros above any cutoff $H$ under inverse-square weighting inside any fixed shell-phase window of positive Haar measure with Haar-null boundary drives the limiting distribution of $H / \gamma$ to uniform on $[0, 1]$, leaving a limiting two-time error of $3.71810906 \times 10^{-6}$ after optimizing scale; at unit scale $a = 1$, the five-charge three-light-mode support cannot match even the first arithmetic time alone ($> 32.092\%$ must sit outside it, rising past $87.818\%$ for the first $40$ times).

::: {.remark #rem-ou-ch12-windowed-rate title="A Whole-Spectrum Benchmark and the Windowed Rate Gap"}
**Argument (`ARGUED`).** Let $A_W(t)$ count the positive zeros through height $t$ in the fixed phase window $W$, with multiplicity. Suppose $c>0$, $b_H\ge0$, and

$$
\begin{aligned}
m(t)&=t\left(\log\frac{t}{2\pi}-1\right),\\
A_W(t)&=c\,m(t)+R_W(t),\\
|R_W(t)|&\le b_Ht\quad(t\ge H).
\end{aligned}
$$

Set $L_x=1+\log(x/(2\pi))$, and define the strict tail sum with multiplicity by $S_W(x)=\sum_{\gamma>x,\,W}\gamma^{-2}$. For $x\ge H$, partial summation gives

$$
\begin{aligned}
S_W(x)&=-\frac{A_W(x)}{x^2}+2\int_x^\infty\frac{A_W(t)}{t^3}\,dt\\
      &=\frac{c}{x}(L_x+\delta_x),\\
|\delta_x|&\le E:=\frac{3b_H}{c}.
\end{aligned}
$$

When $H\ge2\pi$ and $L_H>E$, the strict distribution function is $Q_H(s)=\Pr(H/\gamma<s)=S_W(H/s)/S_W(H)$ for $0<s\le1$, with $Q_H(0)=0$.

$$
\begin{aligned}
\left\|Q_H-P_H\right\|_\infty&\le\frac{2E}{L_H-E},\\
P_H(s)&=s+\frac{s\log(1/s)}{L_H}.
\end{aligned}
$$

Here $P_H(s)=sL_{H/s}/L_H$ increases from $0$ to $1$, using its continuous extension at $s=0$. After normalization the error numerator is $s\delta_{H/s}-P_H(s)\delta_H$, and the denominator is at least $L_H-E$. The supremum distance to a continuous comparison function is the same for the strict and inclusive distribution functions. The Kolmogorov distance $D_H$ to the uniform law therefore satisfies

$$
\left|D_H-\frac{1}{eL_H}\right|\le\frac{2E}{L_H-E}.
$$

For all positive zeros without phase filtering, the counting estimate of Hasanalizade, Shen, and Wong gives for $t\ge e$

$$
\begin{aligned}
\left|N(t)-\frac{m(t)}{2\pi}\right|&\le B(t),\\
B(t)&=0.1038\log t\\
&+0.2573\log\log t+9.3675.
\end{aligned}
$$

Since $B(t)/t$ decreases on this range, take $c=1/(2\pi)$ and $b_H=B(H)/H$. At $H=10^6$, the whole-spectrum benchmark yields

$$
0.0283138<D_H<0.0283806.
$$

This benchmark uses the full spectrum without phase filtering. A numerical bound for the Chapter 2 Haar acceptance region requires an explicit value of $b_H$ for that window. [Hasanalizade, Shen, and Wong, Counting zeros of the Riemann zeta function (2022), Corollary 1.2](https://doi.org/10.1016/j.jnt.2021.06.032)
:::

**A linear counting remainder for the fixed Haar window under RH (`ARGUED`).** Count positive zeros with multiplicity. For the four-phase window of Chapter 2, $A_W(T)=c\,m(T)+O(T)$. Write $F$ for the acceptance threshold on the torus. The boundary of $W$ lies in the seam $u=0$ and the graph $u=F$. The function $F$ is Lipschitz, so the $\eta$-neighborhood of the boundary has volume $O(\eta)$. Set $K=\lfloor\log T/12000\rfloor$. The periodic trigonometric approximation of Colzani, Gigante, and Travaglini gives $P_K^-\le\mathbf1_W\le P_K^+$ with frequency support $\|k\|_\infty\le K$. The pointwise error decays rapidly in $K\,\operatorname{dist}(x,\partial W)$, giving an $L^1$ error of $O(K^{-1})$ and an $L^2$ error of $O(K^{-1/2})$ for each polynomial. For $M\ge2$, apply the same approximation with degree less than $M$ to the Fourier tail of $\mathbf1_W$. Parseval's identity then gives an $\ell^2$ coefficient norm of $O(M^{-1/2})$ for either $P=P_K^\pm$ on each dyadic shell $M\le\|k\|_\infty<2M$ with $M\le K$. For $M=1$ use $\|P\|_2=O(1)$. [Periodic approximation, Corollary 7](https://arxiv.org/abs/1001.0948)

Let $a=(\theta_{724}-\theta_{244},\theta_{804}-\theta_{244},\theta_{12},\theta_{200})$ and put $\lambda_k=k\cdot a$. The multiplicative independence check of Chapter 1 gives $e^{i\lambda_k}\ne1$ for $k\ne0$. The five chord rotations lie in a multiquadratic field of degree at most $32$, and multiplying each rotation or its inverse by $1734$ gives an algebraic integer. Take the norm of $1734^{6\|k\|_\infty}(e^{i\lambda_k}-1)$. The conjugates of the rotations are on the unit circle, so

$$
|\lambda_k|\ge |e^{i\lambda_k}-1|\ge 2^{-31}1734^{-192\|k\|_\infty}.
$$

Apply this to differences of modes. Distinct real frequencies in the cube $\|k\|_\infty\le K$ have spacing greater than $2T^{-1/3}$ for sufficiently large $T$. By conjugation it suffices to take $\lambda_k>0$. Under RH the uniform Landau formula at $x=e^{\lambda_k}$, divided by $\sqrt{x}$, gives the phase sum. For the nearest prime power $n$ to $x$ and the von Mangoldt function $\Lambda$, the main term is bounded by a constant times $\Lambda(n)e^{-\lambda_k/2}\min(T,2/|\lambda_k-\log n|)$, using $T$ at equality. The terms at distance at least $T^{-1/3}$ from the logarithm of their nearest prime power are $O(T^{1/3})$. The remaining errors are $O\bigl(\sqrt{x}\log^2(Tx)+\log T/(\sqrt{x}\lambda_k)\bigr)$. There are $O(K^4)$ modes and $\|P\|_2=O(1)$, so the errors and the main terms away from the prime powers sum to $o(T)$ after weighting by the Fourier coefficients. [Uniform Landau formula, equation (1.6)](https://arxiv.org/abs/0805.2745)

Among modes within $T^{-1/3}$ of the logarithm of their nearest prime power, each prime power matches at most one positive frequency. Fix a dyadic shell $M$ and an interval $j\le\lambda_k<j+1$. The group has at most $O(\min(e^j,M^4))$ terms. Each main term divided by $T$ is $O((j+1)e^{-j/2})$. By Cauchy–Schwarz, the group's weighted contribution divided by $T$ is

$$
O\bigl(M^{-1/2}(j+1)\min(1,M^2 e^{-j/2})\bigr).
$$

Summing over $j\ge0$ gives $O(M^{-1/2}(1+\log M)^2)$, which is summable over dyadic $M$. The two bracketing polynomials thus give the same leading term $\mu(W)N(T)$. The error from their constant terms is $O(N(T)/K)=O(T)$. Substituting the unfiltered counting main term gives the stated window remainder. The preceding partial summation formula yields $D_H=O(1/\log H)$. For every shared-clock kernel $f_v(s)=(1+v^2s^2)^{-1}$ the readout error is consequently bounded by $O(1/\log H)\,v^2/(1+v^2)$, with a constant uniform in $v$.

**An unconditional remainder for the fixed Haar window (`ARGUED`).** Let $L=\log T$ and take $K=\lfloor L^{2/3}\rfloor$. The frequency separation and prime-power grouping above still bound the combined Landau contribution by $O(T)$ after division by $\sqrt{x}$. For a bounded bracketing polynomial $P_K$, define $p(z)=P_K(az/(2\pi))$ along the phase flow. Applying Bernstein's inequality in each coordinate bounds its second derivative on the real line by $O(K^2)$. The maximum-modulus bound for Laurent polynomials in each coordinate extends this estimate to imaginary part $v$, with a factor $\exp(O(K|v|))$.

Evaluating at $\gamma-i(\beta-1/2)$ gives the weighted Landau sum at positive frequencies. Zero symmetry and conjugation handle negative frequencies. Pair the zeros with real parts $\beta$ and $1-\beta$ at the same height. Their first derivatives cancel, leaving a Taylor error of $O(K^2v^2\exp(O(K|v|)))$, where $v=\beta-1/2$. Selberg's uniform density estimate $N(1/2+u,T)\ll T^{1-u/4}L$ and zero symmetry give

$$
\sum_{0<\gamma\le T}|\beta-1/2|^2\exp(O(K|\beta-1/2|))=O(T/L).
$$

This follows by integrating against the tail count. Passing the entire polynomial to the zero ordinates therefore costs $O(TK^2/L)$. Balancing that with the constant coefficient error $O(TL/K)$ yields

$$
A_W(T)=\mu(W)N(T)+O\bigl(T(\log T)^{1/3}\bigr).
$$

Partial summation gives an error $O((\log x)^{1/3}/x)$ in $S_W(x)$. On normalizing, $s(\log(H/s))^{1/3}=O((\log H)^{1/3})$ uniformly for $0<s\le1$. Thus $D_H=O((\log H)^{-2/3})$. [Zero-density bound, Eq. (3)](https://arxiv.org/abs/1910.08274v2) · [Polynomial transfer and tail normalization](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7233169018)

::: {.problem #prob-ou-ch12-windowed-haar-rate title="Explicit Remainders for a Fixed Haar Phase Window"}
Let $W$ be the fixed Haar acceptance region in Chapter 2, whose boundary has Haar measure zero. Set $c=\mu(W)/(2\pi)$ for normalized Haar measure $\mu$. For a prescribed starting height $H$, compute a checkable constant $b_H$ such that, with $m(t)$ as above,

$$
|A_W(t)-c\,m(t)|\le b_Ht
\qquad\text{for all }t\ge H
$$

and substitute it into the finite-height error formula for shared-clock readings. Can the same order of remainder be proved without invoking RH?
:::

**Limits of fixed-mode convergence (`ARGUED`).** Two constructed height sequences separate the counting assumptions for this acceptance region. Begin with the integer quantiles of the unfiltered main term. Integrating the centered counting error on each quantile interval gives $O(T/\log T)$ for each fixed nonzero Fourier mode. Then choose a small smooth patch of the acceptance boundary transverse to the phase flow. Continuous torus equidistribution gives a number of crossings proportional to the length of each sufficiently large dyadic height interval. At each crossing, use a strictly increasing local time change to move heights from a short interval just outside the region into it. The displacements and interval lengths are of order $(\log T)^{-3/4}$.

The total count still has an $O(\log T)$ remainder, and each fixed Fourier mode changes by only $O(T/\sqrt{\log T})$. At dyadic cutoffs the two window counts differ by at least a constant times $T(\log T)^{1/4}$. Thus an $o(T)$ bound for each fixed mode together with the total count still leaves room for a window remainder larger than $O(T)$. [Construction by quantiles and transverse crossings](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7232488702) · [Strictly increasing local shift](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7232557747)

Beneath every exclusion beat two universal Fourier-and-variance concentration theorems formally frozen inside the Lean 4 kernel. The first bounds nonnegative cyclic band weights above by a positive Fejér Fourier average, quantifying why narrow-band concentration inevitably pumps high-frequency Fourier energy:

::: {.theorem #thm-ou-ch12-cyclic-fejer-band title="Positive Fourier Upper Bound for Cyclic Fejér Bands" lean="D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier"}
Let $q \ge 1$ be a modulus, let $H, N \in \mathbb{N}$ satisfy $H < N$, and let $M : \mathbb{Z} / q\mathbb{Z} \to \mathbb{R}$ be nonnegative ($M(r) \ge 0$ for all $r$). Write $R_H \subseteq \mathbb{Z} / q\mathbb{Z}$ for the residue classes of $[-H, H] \bmod q$, and define the prefix character sum and discrete Fourier transform

$$
B_N(k) \;=\; \sum_{j=0}^{N-1} \chi_k(j),
\qquad
\widehat{M}(k) \;=\; \sum_{r \in \mathbb{Z} / q\mathbb{Z}} M(r)\, \chi_k(-r).
$$

Then the total band weight over $R_H$ satisfies

$$
(N - H)\sum_{r \in R_H} M(r) + H M(0)
\;\le\;
\frac{1}{q}\sum_{k \in \mathbb{Z} / q\mathbb{Z}} |B_N(k)|^2 \operatorname{Re}\widehat{M}(k).
$$

:::

::: proof
For each integer shift $h \in [-H, H]$ and each $0 \le j < N - H$, shifting either the first or second coordinate of $(j, j)$ by $|h|$ according to the sign of $h$ yields at least $N - H$ ordered pairs in $[0, N - 1]^2$ whose difference equals $h \bmod q$. For $h = 0$, all $N$ diagonal pairs contribute, accounting for the extra term $H M(0)$. Since $M \ge 0$, summing $M(j_1 - j_2 \bmod q)$ over all $(j_1, j_2) \in [0, N - 1]^2$ bounds the left-hand side from above. Applying discrete Fourier inversion on $\mathbb{Z} / q\mathbb{Z}$ factorizes the double coordinate sum into $B_N(k)\overline{B_N(k)} = |B_N(k)|^2$; taking real parts preserves the real sum and yields the stated inequality. The full proof is checked by the Lean kernel.
:::

The second theorem sets the complementary floor: for any finite nonnegative weight distribution of positive total mass, its $p$-fold convolution cannot suppress near-collision mass inside band width $\eta > 0$ below an explicit variance floor.

::: {.theorem #thm-ou-ch12-collision-variance title="Variance Lower Bound for Finite Tail Collision Mass" lean="D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance"}
Let $J$ be a finite index set, let $g : J \to \mathbb{R}$ be frequencies, and let $w : J \to \mathbb{R}$ satisfy $w_j \ge 0$ for all $j \in J$ with strictly positive total mass $W = \sum_{j \in J} w_j > 0$. Define the weighted mean and variance

$$
\mu \;=\; \frac{1}{W}\sum_{j \in J} w_j g_j,
\qquad
V \;=\; \frac{1}{W}\sum_{j \in J} w_j (g_j - \mu)^2.
$$

For every positive integer $p > 0$ and band width $\eta > 0$, set $G_m = \sum_{j \in J} m_j g_j$ and $c_m = \binom{p}{m} \prod_{j \in J} w_j^{m_j}$ over multi-indices $m$ of total degree $p$, and define the tail collision mass $E_p(\eta) = \sum_{|G_m - G_n| \le \eta} c_m c_n$. Then

$$
\frac{9}{16} W^{2p}
\;\le\;
\left(1 + \frac{4\sqrt{p V}}{\eta}\right) E_p(\eta).
$$

:::

::: proof
Shifting every frequency by $g_j \mapsto g_j - \mu$ translates each $G_m$ by $-p\mu$, preserving all pairwise distances $|G_m - G_n|$ and hence $E_p(\eta)$. Evaluating the exponential sum $A(t) = \sum_{j \in J} w_j e^{(g_j - \mu) t}$ at $t = 0$ gives $A(0) = W$, $A'(0) = 0$, and $A''(0) = W V$. Differentiating $A(t)^p = \sum_m c_m e^{(G_m - p\mu) t}$ twice at $t = 0$ yields $\sum_m c_m = W^p$ and $\sum_m c_m (G_m - p\mu)^2 = p V W^p$. By Chebyshev's inequality, at least $\frac{3}{4} W^p$ of the total weight lies in the closed interval $[p\mu - 2\sqrt{pV},\, p\mu + 2\sqrt{pV}]$. Partitioning this interval into bins of width $\eta$ uses at most $\lfloor 4\sqrt{pV}/\eta \rfloor + 1 \le 1 + 4\sqrt{pV}/\eta$ bins, and every ordered pair within a single bin lies within distance $\eta$ and thus enters $E_p(\eta)$. Applying Cauchy–Schwarz across the bin weights gives $\left(\frac{3}{4} W^p\right)^2 \le \left(1 + 4\sqrt{pV}/\eta\right) E_p(\eta)$. The full proof is checked by the Lean kernel.
:::

::: {.film src="one-shared-clock"}
**Four sectors forced onto one arithmetic clock: four ticks close, the fifth breaks, and the held-out seventh is locked to a single 35-bit code (2 min 47 s).** Four clocks keeping their own time merge into one amber shared clock, and the seven cyan kernels $k_j(y)$ are drawn (computed on screen, [@def-ou-ch12-shared-clock]). With one shared weighting, the fifth tick read to $22$ binary digits falls entirely into the amber code `4040282`, one below the cyan reference code `4040283`; a neutral-shell reweighting (needed efficiency ratio at least $18.49684\ldots$, shell trace spanning $1$ to $19$) rescues tick five, and the magenta price is a sixth-tick shift of at least $1.33015563912 \times 10^{-8}$. The Gauss–Radau window is $2.140 \times 10^{-12}$ wide and its amber 35-bit code `32071996606` sits $4130$ codes above the reference `32071992476`; $44$ input cells force that code, while at $43$ bits the output forks into two magenta codes. Then three cyan height bands carry more than $99.931\%$ of the weight, a $10^{-7}$ edge stiffening forces a response drop above $1.82 \times 10^{-10}$, on the eight-zero solution the held-out $J$ comes out $6.0833\%$ low, and five naive weight selectors are struck through in magenta. All of these numbers are the chapter's interval and rational replay certificates or on-screen computations (cyan NUM); the four-clocks picture and the bridge to the next chapter are argued (violet). The green labels belong only to the two Lean theorems: the positive Fourier upper bound for cyclic Fejér bands [@thm-ou-ch12-cyclic-fejer-band] and the variance lower bound for finite near-collision mass [@thm-ou-ch12-collision-variance]; the two-weight check $9 \le 39.94$ of the latter is computed on screen.
:::

Taken together, the shared arithmetic clock acts as an unforgiving caliper: it eliminates naive power laws, monotone efficiencies, Gaussian determinants, Gibbs triangle weights, short walks, and single-shot post-selection as dynamical origins of the three-band spectrum, while the calibrated eight- and 23-zero supports stay pinned between a rigid 35-bit seventh-time prediction and a held-out $\mathrm{CP}$ deficit of at least $5.57\%$ ($6.0833\%$ on the eight-zero support, a property of that list which another set of eight zeros lowers below $10^{-6}$; the lower end on 23 zeros once the sixth time and the $|V_{cb}|^2$ offset are fixed, where the deficit is forced by the specified offset). Since external probability reweighting breaks at every turn, we must pivot inside the shell itself: can an intrinsic Wilson action built directly from the $529$ triangular plaquettes of the 19-point shell pull the dual clocks into a joint three-window flavor vacuum by pure energy minimization? That steep winding staircase is the subject of [Chapter 13](ch13-winding-ladder-and-joint-vacuum.md).
