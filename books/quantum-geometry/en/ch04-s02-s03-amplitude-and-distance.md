# 4.2.2 Amplitude damping, relaxation, and trace distance {#sec-ch04-s02-s03-amplitude-and-distance}

Alongside energy-conserving $T_2$ dephasing stands energy-relaxing **amplitude damping** ($T_1$ spontaneous emission): an excited state at the south pole ($-1$) emits a quantum of energy into a cold bath and relaxes toward the ground state at the north pole ($+1$). Geometrically, the Bloch ball does not merely shrink around the origin — its center **drifts upward** along the vertical axis via the affine map [`dampedAxis`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.dampedAxis) $u \mapsto u' = (1 - \gamma)u + \gamma$ ($0 \le \gamma < 1$).

::: {.viz src="bloch-noise" preset="amp" height="500"}
**Shrink and drift north.** Amplitude damping with $\gamma = 0.3$ per step: the cyan ball shrinks while it drifts towards the north pole, more slowly across than up; the violet north pole $\lvert 0\rangle$ stays put, and the amber $\rho$ climbs all the way from the south pole towards it.
:::

When we measure transverse coherence contraction under this axial drift using monotone Riemannian metrics of quantum information geometry — comparing the symmetric logarithmic derivative profile $\varphi_{\mathrm{SLD}}(u) = 1$ against the right logarithmic derivative profile $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$ via [`coherenceRatio`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.coherenceRatio) $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\frac{\varphi(u')}{\varphi(u)}$ — their behavior at the pure ground-state boundary $u \to 1^-$ contrasts sharply!

::: {.proposition #prop-amplitude-damping-contraction title="SLD and RLD Coherence-Contraction Endpoints Under Amplitude Damping" lean="D5/S3/QuantumChannels/AmplitudeDampingContraction.amplitude_damping_sld_rld_endpoints"}
Let $0 \le \gamma < 1$, write $u'(\gamma, u) = (1 - \gamma)u + \gamma$ for the damped axial coordinate, and for a radial profile $\varphi : \mathbb{R} \to \mathbb{R}$ define the coherence contraction ratio $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\varphi(u'(\gamma, u)) / \varphi(u)$. With $\varphi_{\mathrm{SLD}}(u) = 1$ and $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$, both properties hold:

1. **Constant SLD contraction**: for all $u \in \mathbb{R}$, $\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$;
2. **RLD interior bound and pure-boundary limit**: $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ for every interior coordinate $u \in (-1, 1)$, and as $u$ approaches the pure boundary $1$ from below,

   $$
   \lim_{u \to 1^-} \mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = 1.
   $$

:::

::: proof
Claim 1 simplifies immediately since $\varphi_{\mathrm{SLD}}(u) = 1$. For claim 2 — packaged in Lean via the predicate [`HasPureBoundaryEndpoint`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.HasPureBoundaryEndpoint), conjunction of the interior upper bound $\le 1$ on $u \in (-1, 1)$ and the left-neighborhood filter limit as $u \to 1^-$ — when $u \in (-1, 1)$ and $0 \le \gamma < 1$, note that $1 - u' = 1 - ((1 - \gamma)u + \gamma) = (1 - \gamma)(1 - u)$. Substituting $\varphi_{\mathrm{RLD}}(v) = \frac{1}{(1 - v)(1 + v)}$ cancels $(1 - \gamma)(1 - u)$ cleanly between numerator and denominator:

$$
\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = (1 - \gamma)\cdot\frac{1 - u^2}{1 - u'^2} = (1 - \gamma)\cdot\frac{(1 - u)(1 + u)}{(1 - \gamma)(1 - u)(1 + u')} = \frac{1 + u}{1 + (1 - \gamma)u + \gamma}.
$$

Because $u < 1$ and $\gamma \ge 0$, subtracting numerator from denominator gives $\gamma(1 - u) \ge 0$ with positive denominator, proving $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ on $(-1, 1)$; letting $u \to 1^-$ sends both numerator and denominator continuously to $2$, yielding limit $\frac{2}{2} = 1$. The full proof is checked by the Lean kernel.
:::

We can now summarize the four workhorse single-qubit noise channels as simple three-dimensional deformations of the Bloch ball — no Kraus tables required:

| Noise Channel (Strictly Contracting Domain) | Affine Bloch Map $\vv{r} = (r_x, r_y, r_z) \mapsto \vv{r}'$ | Geometric Deformation of the Sphere | Fixed-Point Locus on Strictly Contracting Domain |
| :--- | :---: | :--- | :--- |
| **Phase Damping** ($0 \le c < 1$) | $(c\,r_x,\; c\,r_y,\; r_z)$ | Horizontal waist squeeze into a vertical cigar around $Z$ | $Z$-axis segment $(0, 0, r_z)$ |
| **Bit-Flip Channel** ($0 < p < 1$) | $\bigl(r_x,\; (1-2p)r_y,\; (1-2p)r_z\bigr)$ | Radial cylindrical squeeze toward the $X$ axis (with transverse sign flip for $p > \frac{1}{2}$) | $X$-axis segment $(r_x, 0, 0)$ |
| **Depolarizing Channel** ($0 < \lambda \le 1$) | $\bigl((1-\lambda)r_x,\; (1-\lambda)r_y,\; (1-\lambda)r_z\bigr)$ | Uniform isotropic contraction toward the origin | Bloch center $\vv{r} = \vv{0}$ only |
| **Amplitude Damping** ($0 < \gamma < 1$) | $\bigl(\sqrt{1-\gamma}\,r_x,\; \sqrt{1-\gamma}\,r_y,\; (1-\gamma)r_z + \gamma\bigr)$ | Ellipsoidal contraction + upward drift toward North $+\vv{e}_3$ | North pole $+\vv{e}_3 = (0, 0, 1)$ only |

(Note: At the **zero-noise identity endpoints** $c = 1$, $p = 0$, $\lambda = 0$, or $\gamma = 0$, each channel reduces to the identity map $\vv{r}' = \vv{r}$ and fixes the **entire Bloch ball**. At $p = 1$, the bit-flip map is the unitary $\pi$-rotation $\rho \mapsto X\rho X$, $\vv{r}' = (r_x, -r_y, -r_z)$ about the $X$ axis and preserves the distance between states; at $\gamma = 1$, amplitude damping resets the entire Bloch ball in one step to the pure north pole $+\vv{e}_3 = (0, 0, 1)$, so the output distance between any two states is zero.)

::: {.figure src="ch04-noise-gallery"}
**Four kinds of noise, four deformations.** Each panel is a vertical cross-section of the Bloch ball at half strength ($c = \frac{1}{2}$, $p = \frac{1}{4}$, $\lambda = \frac{1}{2}$, $\gamma = \frac{1}{2}$), drawn from the affine formulas of the table: the thin line is the original shell, cyan its image after one application, violet what stays fixed. Phase damping gives a tall narrow ellipse and fixes the vertical axis; bit flip a flat wide ellipse and fixes the $x$ axis; depolarizing a concentric circle of half the radius and fixes only the centre; amplitude damping shrinks the ball and lifts it until its top touches the north pole, which alone stays fixed. The affine forms in the table are literature results, not formalized in this book.
:::

The last row raises a geometric question: once the axial drift toward the ground-state north pole is fixed, **how much transverse length can remain before the ellipsoid pierces the sphere?** Let $\lambda$ now denote the common real retention factor of the two transverse coordinates, and consider

$$
F_{a,\lambda}(x,y,z) = (\lambda x,\,\lambda y,\,az+1-a), \qquad 0 \le a \le 1.
$$

The north pole $(0,0,1)$ stays fixed. The correspondence with the preceding notation is $a=1-\gamma$: expanding the existing axial coordinate gives exactly $\operatorname{dampedAxis}(1-a,z)=az+1-a$. Its relaxation interpretation is restricted here to **zero-temperature affine drift toward a fixed north pole with an isotropic transverse factor**.

::: {.theorem #thm-north-pole-ball-criterion title="Exact Criterion for a North-Pole Affine Map to Preserve the Whole Closed Unit Ball" lean="D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff"}
Let $a,\lambda \in \mathbb{R}$ with $0 \le a \le 1$, allowing either sign of $\lambda$. The following are equivalent:

1. For every real $x,y,z$ satisfying $x^2+y^2+z^2 \le 1$,

   $$
   (\lambda x)^2+(\lambda y)^2+(az+1-a)^2 \le 1.
   $$

2. $\lambda^2 \le a$.
:::

::: proof
For sufficiency, bound the squared transverse radius using $\lambda^2 \le a$ and the input ball condition:

$$
\begin{aligned}
&\lambda^2(x^2+y^2)+(az+1-a)^2 \\
&\quad\le a(1-z^2)+(az+1-a)^2 \\
&\quad=1-a(1-a)(1-z)^2 \le 1.
\end{aligned}
$$

For necessity, construct a specific escaping point. If $\lambda^2>a$, set

$$
\begin{gathered}
\delta=\frac{\lambda^2-a}{\lambda^2+1}, \\
(x,y,z)=\bigl(\sqrt{\delta(2-\delta)},\,0,\,1-\delta\bigr).
\end{gathered}
$$

Since $0\le a$, we have $0<\delta\le1$, so the point is real and $x^2+y^2+z^2=1$. Using $\delta(\lambda^2+1)=\lambda^2-a$ and $\delta(\lambda^2-a^2)\le\delta(\lambda^2+1)$, its image exceeds the sphere's squared radius by

$$
\begin{aligned}
&\norm{F_{a,\lambda}(x,0,z)}^2-1 \\
&\quad=\delta\bigl[2(\lambda^2-a)-\delta(\lambda^2-a^2)\bigr] \\
&\quad\ge\delta(\lambda^2-a)>0.
\end{aligned}
$$

Thus the north-pole cap intuition has an exact criterion on the whole closed ball, including the endpoints $a=0$ and $a=1$. The full proof is checked by the Lean kernel.
:::

[@thm-north-pole-ball-criterion] gives the transverse bound $|\lambda|\le\sqrt a$. Pure amplitude damping in the table takes $\lambda=\sqrt a$, so $\lambda^2=a$ saturates this bound; additional transverse decay can make the inequality strict. In particular, $a=0$ forces $\lambda=0$, while $a=1$ permits exactly $|\lambda|\le1$. This criterion concerns ball preservation; complete positivity also imposes conditions on extended systems and cannot be inferred from this real-coordinate criterion alone.

::: {.figure src="ch04-ball-criterion"}
**How much transverse length may survive is set by the axial factor.** The green region is the criterion $\lambda^2 \le a$ of [@thm-north-pole-ball-criterion], bounded by the two branches $\lambda = \pm\sqrt{a}$; its upper edge is pure amplitude damping, $\lambda = \sqrt{a}$. It closes to a point at $a = 0$ and opens to $|\lambda| \le 1$ at $a = 1$. The magenta point $(a, \lambda) = (0.15, 0.75)$ outside it is a map that pushes part of the ball through the shell.
:::

Now assign exponential envelopes to the factors of **the same map**. For any positive real $T_1,T_2,t$, set

$$
a=e^{-t/T_1}, \qquad \lambda=e^{-t/T_2}.
$$

Then $0<a<1$. By the theorem, $F_{a,\lambda}$ maps the entire closed unit ball into itself if and only if

$$
\begin{aligned}
&e^{-2t/T_2}\le e^{-t/T_1} \\
&\quad\Longleftrightarrow -\frac{2t}{T_2}\le-\frac{t}{T_1} \\
&\quad\Longleftrightarrow T_2\le2T_1.
\end{aligned}
$$

The first step uses strict monotonicity of the real exponential; the second cancels positive time and multiplies by positive time constants. This explains a direct specialization of the theorem under the stated exponential envelopes. At $t=0$, both factors equal $1$ for every positive pair $T_1,T_2$, giving the identity map; zero time alone constrains no rate.

::: {.viz src="bloch-noise" preset="wide" height="500"}
**Keep too much sideways and the skin is pierced.** Take $T_2 = 6T_1$, that is $\lambda = a^{1/6} > \sqrt{a}$: near the north pole the cyan image bulges out through the unit ball drawn as a glass shell, the magenta part is no longer inside, and the magenta dot marks the image point farthest from the centre. Set $T_2 \le 2T_1$ again and the magenta disappears ([@thm-north-pole-ball-criterion]).
:::

::: {.remark #rem-relaxation-envelope-literature title="Physical Conditions for Exponential Envelopes and Rate Addition (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Krantz et al., *A quantum engineer's guide to superconducting qubits* ([arXiv:1904.06560v3](https://arxiv.org/abs/1904.06560v3), equations 40–43), introduce longitudinal and transverse relaxation rates in the Bloch–Redfield description. The text adjacent to equation 41 explicitly notes that expressing the transverse rate as a sum presumes exponential individual decay functions. This supplies physical context for the relaxation model used here.

If, in addition to pure amplitude damping, we **assume a product of envelopes** and supply a nonnegative pure-dephasing rate $k\ge0$, namely

$$
e^{-t/T_2}=e^{-t/(2T_1)}e^{-kt},
$$

then for $T_1,T_2,t>0$, taking logarithms and canceling $t$ gives

$$
\frac{1}{T_2}=\frac{1}{2T_1}+k\ge\frac{1}{2T_1}.
$$

For $k>0$, one may write $k=1/T_\varphi$; $k=0$ gives saturation under pure amplitude damping. The product law is an additional physical assumption, not a consequence of geometric preservation. Here $T_2\le2T_1$ applies within the stated scope of a fixed north pole, zero-temperature affine drift, isotropic transverse contraction, and exponential envelopes; it is not extended to arbitrary environments or arbitrary nonexponential decay.
:::

The three kinds of noise deform the ball in different ways, yet they share one feature: none of them pulls two points of the ball farther apart. This sentence has a precise form. The **trace distance** between two states is $T(\rho, \sigma) = \frac{1}{2}\lVert\rho - \sigma\rVert_1$; for a qubit, the two eigenvalues of $\rho - \sigma = \frac{1}{2}(\vv{r} - \vv{s})\cdot\vv{\sigma}$ are $\pm\frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$, so

$$
T(\rho, \sigma) \;=\; \frac{1}{2}\,\lVert\vv{r} - \vv{s}\rVert ,
$$

half the Euclidean distance between the two Bloch vectors (this step is a manual computation).

::: {.definition #def-trace-distance title="The Trace Distance between Finite-Dimensional Density States" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance"}
Let $\iota$ be a finite type (`[Fintype ι]`, `[DecidableEq ι]`). For two density states $\rho, \sigma$ (`DensityState ι`: positive semidefinite complex $\iota \times \iota$ matrices of trace $1$), define

$$
\operatorname{traceDistance}(\rho, \sigma) \;=\; \frac{1}{2}\,\operatorname{traceNorm}(\rho - \sigma),
$$

where `traceNorm` $M$ is the real part of the trace of $\sqrt{M^{\dagger}M}$.
:::

::: {.proposition #prop-trace-distance-metric-contraction title="Trace-Distance Bounds and Contraction under Quantum Channels on a Fixed Finite Index Type" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_nonneg D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_symm D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_triangle D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_le_one D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract"}
Let $\iota$ be a finite type and $\rho, \sigma, \tau$ density states on $\iota$; use the notation of [@def-trace-distance] and abbreviate $T = \operatorname{traceDistance}$. Then:

1. **Nonnegativity**: $0 \le T(\rho, \sigma)$;
2. **Symmetry**: $T(\rho, \sigma) = T(\sigma, \rho)$;
3. **Triangle inequality**: $T(\rho, \tau) \le T(\rho, \sigma) + T(\sigma, \tau)$;
4. **Boundedness**: $T(\rho, \sigma) \le 1$;
5. **Contraction under channels**: for every quantum channel $\Phi$ whose input and output are both indexed by $\iota$ (`QuantumChannel ι ι`, a trace-preserving completely positive map),

   $$
   T\bigl(\Phi(\rho),\ \Phi(\sigma)\bigr) \;\le\; T(\rho, \sigma).
   $$
:::

::: proof
The first four claims come from the nonnegativity of the trace norm, the identity $\operatorname{traceNorm}(-M) = \operatorname{traceNorm}(M)$, the triangle inequality for the trace norm (`traceNorm_add_le`), and the fact that the trace norm of a positive semidefinite matrix equals its trace. Claim 5: take the Jordan decomposition $\rho - \sigma = P - M$ of the Hermitian matrix $\rho - \sigma$ into its positive and negative parts, both positive semidefinite, whose trace norm equals $\operatorname{Tr} P + \operatorname{Tr} M$ (`trace_norm_jordan_mass`). A channel maps positive semidefinite matrices to positive semidefinite matrices and preserves the trace, so $\operatorname{traceNorm}\bigl(\Phi(P) - \Phi(M)\bigr) \le \operatorname{Tr}\Phi(P) + \operatorname{Tr}\Phi(M) = \operatorname{Tr} P + \operatorname{Tr} M$. Dividing by $2$ gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bloch-distance-contraction title="Distance Contraction under Three Kinds of Qubit Noise: A Numerical Check (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The standard Bloch-ball affine maps for general single-qubit dephasing, amplitude-damping, and depolarizing channels and the Euclidean Bloch formula $T(\rho, \sigma) = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert_2$ below come from the standard quantum-information literature and numerically illustrate the general kernel-verified trace-distance contraction theorem [@prop-trace-distance-metric-contraction] above.

Take the Bloch forms of three channels, each with parameter $\frac{1}{2}$: dephasing $(x, y, z) \mapsto \bigl(\frac{x}{2}, \frac{y}{2}, z\bigr)$; amplitude damping $(x, y, z) \mapsto \bigl(\frac{x}{\sqrt{2}}, \frac{y}{\sqrt{2}}, \frac{1 + z}{2}\bigr)$; depolarizing $\vv{r} \mapsto \frac{1}{2}\vv{r}$. Consider two pairs of states: the north pole and $+x$ ($\vv{r} = (0, 0, 1)$, $\vv{s} = (1, 0, 0)$), and $+x$ and $-x$. Trace distances are computed from $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$:

| channel | north pole and $+x$ | $+x$ and $-x$ |
| :---: | :---: | :---: |
| before | $0.7071$ | $1.0000$ |
| dephasing | $0.5590$ | $0.5000$ |
| amplitude damping | $0.4330$ | $0.7071$ |
| depolarizing | $0.3536$ | $0.5000$ |

No entry exceeds the first row, in agreement with claim 5 of [@prop-trace-distance-metric-contraction]. The first number in the amplitude-damping row was recomputed by applying the Kraus operators to the density matrices and taking the trace norm, again giving $0.4330$. Note that amplitude damping pushes the whole ball toward the north pole, so the centre is not fixed, yet the distance between any two points still does not increase.
:::

::: {.film src="noise-in-the-ball"}
**The ball only shrinks (2 min 19 s).** Pure states sit on the skin and mixed states inside, and every noise moves the whole ball at once. Pinching pushes the state with matrix $\bigl(\begin{smallmatrix} 0.9 & 0.3 \\ 0.3 & 0.1 \end{smallmatrix}\bigr)$ sideways onto the vertical axis and splits its squared size $1$ into $0.82$ kept in cyan and $0.18$ thrown away in magenta ([@thm-pinching-pythagorean]); phase damping with $c = 0.6$ takes the off-diagonal entry step by step to $0.180$, $0.108$, $0.065$, $0.039$ and slims the ball into a cigar ([@prop-phase-damping-decay]). Energy loss with $\gamma = 0.36$ maps heights to $0.64z + 0.36$ and shrinks widths to $0.8$: the amber south pole climbs to $-0.28$ while the violet north pole stays put. With the north pole and this height rule fixed, a width factor of $0.9$ sends the point $(0.6, 0.8)$ to squared radius $1.052$, and the magenta part pokes out of the skin; the whole ball stays inside exactly when $\lambda^2 \le a$ ([@thm-north-pole-ball-criterion]), and $0.8^2 = 0.64$ sits right on the edge. A pair of states $0.8$ apart is still $0.800$ apart after pinching and $0.512$ apart after energy loss ([@prop-trace-distance-metric-contraction]). The squeeze of the whole ball at the start is schematic, the Bloch form of amplitude damping is a literature result, the trace distance as half the distance of the points is a hand computation, and staying inside the ball does not make a map a channel; every number in the film is computed on screen.
:::

So "a mixed state is a shortened line inside the ball" can be stated as a theorem that does not depend on any particular noise model: a channel may translate, squash, or rotate the ball, but it can never pull any two of its points apart. Distinguishability can only be lost; it never grows out of nothing.

::: {.viz src="bloch-noise" preset="distance" height="500"}
**Two states only get closer.** The first pair of the example: $\rho$ at the north pole and $\sigma$ at $+x$, one step of amplitude damping ($\gamma = \frac{1}{2}$). $\rho$ stays, $\sigma$ is pulled north, and the distance on the white line drops from the dashed $0.707$ to $0.433$ ([@prop-trace-distance-metric-contraction]).
:::
