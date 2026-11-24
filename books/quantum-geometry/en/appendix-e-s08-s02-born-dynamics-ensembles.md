# E.8.2 Born weights, dynamics, and ensembles {#sec-appendix-e-s08-s02-born-dynamics-ensembles}

## E.8.2.1 The Born Weight: on a Qubit the Gap Can Be Restated as Minimal Tomographic Rank {#sec-appe-born-minimal-rank}

The gap in `H5` is widest on a qubit. For $d\ge3$, a bounded rule that depends only on pairwise comparison is already forced to be the Born rule by normalization on every orthonormal basis together with $f(1)=1$. For $d=2$ it reduces to antipodal normalization, which the cubic function of [@ex-appe-qubit-cubic-and-tomography] satisfies without being the Born rule. The input that is missing on a qubit can be restated, and the restatement uses the same kind of counting as `H7`.

::: {.remark #rem-appe-born-zonal-minimal-rank title="On a Qubit the Born Rule Is the Zonal Probability Rule of Minimal Tomographic Rank (Manual Derivation)"}
**Manual derivation.** On the Bloch sphere $S^2$ consider outcome probabilities that depend only on pairwise comparison: for a preparation $\mathbf{s}$ and an outcome $\mathbf{r}$ the probability is $p(\mathbf{r}\mid\mathbf{s})=f(\mathbf{s}\cdot\mathbf{r})$, with $f$ continuous on $[-1,1]$. Write $t=\mathbf{s}\cdot\mathbf{r}$; the sagitta of the pair is $v=1-t$. Assume

- **antipodal normalization**: $f(t)+f(-t)=1$;
- **certainty**: $f(1)=1$.

Expand $f$ in Legendre polynomials, $f=\sum_l c_lP_l$. Define the **tomographic rank** $K(f)$ as the dimension of the real linear span of the functions $\{\mathbf{r}\mapsto f(\mathbf{s}\cdot\mathbf{r})\}_{\mathbf{s}\in S^2}$, that is, the number of real parameters needed to predict all outcome probabilities of one preparation. Then

$$
K(f)=\sum_{l:\,c_l\neq0}(2l+1),
$$

and $K(f)=\infty$ when $f$ is not a polynomial. For polynomial $f$ the reason is the addition theorem for real spherical harmonics, $P_l(\mathbf{s}\cdot\mathbf{r})=\frac{4\pi}{2l+1}\sum_{m}Y_{lm}(\mathbf{s})\,Y_{lm}(\mathbf{r})$: each degree with $c_l\neq0$ contributes the $2l+1$ linearly independent functions $Y_{lm}(\mathbf{r})$, and the coefficient vectors $\bigl(Y_{lm}(\mathbf{s})\bigr)$ span the whole coefficient space as $\mathbf{s}$ varies. When $f$ is not a polynomial, infinitely many $c_l$ are nonzero; for each such $l$ the projection of $f(\mathbf{s}\cdot\,\cdot\,)$ onto the space of spherical harmonics of degree $l$ is $c_lP_l(\mathbf{s}\cdot\,\cdot\,)$ (the Funk–Hecke formula), and that space is irreducible under rotations, so the span projects onto all of it and has dimension at least $2l+1$. The addition theorem, the Funk–Hecke formula and the irreducibility of the spaces of spherical harmonics are standard facts (`Literature`).

Antipodal normalization forces $c_0=\frac12$ and makes the coefficients of all even degrees $l\ge2$ vanish. Certainty excludes $f\equiv\frac12$, so at least one odd degree occurs. Hence

$$
K(f)\ \ge\ 1+3=4,\qquad K(f)=4\iff f(t)=\frac{1+t}{2}=1-\frac v2 .
$$

The cubic rule $f(t)=\frac12(1+t^3)$ contains the degrees $l=0,1,3$ (since $t^3=\frac35P_1+\frac25P_3$), and its tomographic rank is $1+3+7=11$.

**No count is needed for $d\ge3$ (manual derivation).** On $\mathbb{CP}^{d-1}$ let $p=f\bigl(\lvert\langle x\mid y\rangle\rvert^2\bigr)$ with $f$ bounded, $f(1)=1$, and normalization on every orthonormal basis. The squared moduli of a unit vector in a basis can be any point of the probability simplex, so $\sum_if(t_i)=1$ for all $t_i\ge0$ with $\sum_it_i=1$. The point $(1,0,\dots,0)$ gives $f(0)=0$. For $d\ge3$, comparing $(t,s,1-t-s,0,\dots)$ with $(t+s,0,1-t-s,0,\dots)$ gives $f(t)+f(s)=f(t+s)$ for $t,s\ge0$ with $t+s\le1$; a bounded function that is additive in this sense is linear (a standard fact), so $f(t)=t$, and the tomographic rank $d^2$ is a conclusion and not an input. A nonnegative zonal rule, extended additively to all projections, is a special case of the frame functions treated by Gleason's theorem ([@thm-gleason-finite-projection]); the few lines above do not use that theorem. For $d=2$ the simplex is a single edge, the comparison cannot be made, and only antipodal normalization is left.

**Literature background.** Hardy's simplicity axiom (2001) requires the number of parameters $K$ of the state space to take the least value compatible with the other axioms, and $K=N^2$ is derived from it. Galley–Masanes (2017) relate alternatives to the Born rule to representations of the unitary group. The first is a precedent for conditions of the kind "minimal tomographic rank", and the second gives a related classification; the statement and derivation above are not taken from either paper.
:::

Under the premise that probability depends only on pairwise comparison, the input of `H5` therefore splits as follows. For $d\ge3$, boundedness, $f(1)=1$ and projective additivity are already enough. For $d=2$ one more input is needed: it can be the full effect additivity listed in E.7, or it can be a count, namely that all predictions for one preparation are fixed by $4$ real numbers and no fewer will do. The number $4$ is the $\dim_{\mathbb{R}}\operatorname{Herm}(2)$ used by the local-tomography count of `H7`, and it is also the dimension occupied by the Gram embedding of [@rem-appe-gram-from-flatness] (the three coordinates of the Bloch vector) together with normalization: probability is affine in the sagitta exactly when it is an affine function of the embedding coordinates. This only changes the shape of the input. Minimal tomographic rank is still a `T2` operational assumption, and pairwise fairness does not imply it. Discontinuous rules, and rules that depend on more than pairwise comparison, are outside this remark.

## E.8.2.2 Dynamics: Invertible Evolution, Continuity in Time, the Generator and Conditioning {#sec-appe-dynamics-from-comparison}

`H6` lists four inputs: two-sided invertibility of the evolution, strong continuity in time, repeatable minimally disturbing conditioning, and the Hamiltonian $H$ itself. This subsection takes them in turn and asks how far the comparison axiom and the chord–sagitta decomposition reach. Each of the first two has a sufficient condition stated purely in terms of compared objects and their readings, and models satisfying every clause mark where those conditions stop; the third can be written as an optimization principle, although the choice of reading remains an input; $H$ is unchanged. We keep the notation of E.8 and set $\hbar=1$.

Start with invertibility. [@rem-appe-chord-sagitta-layer0] used both orders of Clause III. If only one order is kept, the defect can be computed exactly.

::: {.remark #rem-appe-one-sided-fairness title="One-Sided Fairness: the Defect Is a Projection (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a unital associative $*$-algebra in which $2$ is invertible, and let $u\in\mathcal{A}$ satisfy only $u^*u=\mathbf{1}$. Put $p=\mathbf{1}-uu^*$, and define $S,A,v,\Delta$ as in [@rem-appe-chord-sagitta-layer0] (without assuming that $u$ commutes with $u^*$). Then

1. $p^*=p$ and $p^2=p$;
2. $\Delta^*\Delta=2v$;
3. $\Delta\Delta^*=2v-p$;
4. $2(AS-SA)=-p$.

Derivation: $p^2=\mathbf{1}-2uu^*+u(u^*u)u^*=p$; $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$; $\Delta\Delta^*=uu^*-u-u^*+\mathbf{1}=2v-p$; subtracting the two expansions in the derivation of [@rem-appe-chord-sagitta-layer0] gives $uu^*-u^*u=2(AS-SA)$, whose left side is $-p$.

So under $u^*u=\mathbf{1}$ the three statements $uu^*=\mathbf{1}$, $SA=AS$ and $\Delta\Delta^*=\Delta^*\Delta$ are equivalent: when Clause III holds in one order only, the similarity and difference channels stop commuting and the chord–sagitta lock loses a projection on the other side. The unilateral shift $Se_k=e_{k+1}$ on $\ell^2(\mathbb{N})$ is exactly this case: $S^*S=\mathbf{1}$ and $p=\mathbf{1}-SS^*=\lvert e_0\rangle\langle e_0\rvert$. Taken as a comparison value $\mathrm{CMP}(x,y)=S$, it gives $\mathrm{CMP}(x,y)\,\mathrm{CMP}(y,x)=SS^*\neq\mathbf{1}$ and violates Clause III.

If $\mathcal{A}$ carries a faithful tracial reading $\tau$ (positive, $\tau(ab)=\tau(ba)$, and $\tau(a^*a)=0$ only for $a=0$), every one-sided fair element of $\mathcal{A}$ is two-sided: $\tau(p)=\tau(\mathbf{1})-\tau(u^*u)=0$ and $p=p^*p$, hence $p=0$. Finite-dimensional matrix algebras have such a trace; the algebra of all bounded operators on $\ell^2$ does not (`literature result`). This paragraph concerns elements of $\mathcal{A}$ only; the next example shows that it does not reach the induced evolution.
:::

This does not yet answer the question of `H6`, which concerns the evolution of states. A state evolution may be a symmetry of the comparison structure without being a comparison value itself. Below, "evolution" is read as the map induced on the state space by a map of objects that preserves every comparison value (`MODEL`); the model shows that no clause excludes the unilateral shift arising in this way.

::: {.example #ex-appe-bilateral-shift-model title="With Only a Forward Half-Orbit, a Two-Sided Fair Comparison Induces the Unilateral Shift (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be the algebra of all bounded operators on $\ell^2(\mathbb{Z})$, $\lambda$ the bilateral shift $\delta_n\mapsto\delta_{n+1}$, the object set $X=\mathbb{N}$, and $\mathrm{CMP}(m,n)=\lambda^{n-m}$.

- Clauses II and III: $\mathrm{CMP}(n,m)=\lambda^{m-n}=\mathrm{CMP}(m,n)^*$ and $\lambda$ is unitary. Clause IV: $\lambda^{n-m}\lambda^{k-n}=\lambda^{k-m}$. Clause I: $m\mapsto\lambda^m$ is injective, so the extensional quotient identifies no two points. The positivity condition holds in a $C^*$-algebra.
- The time step $T(m)=m+1$ preserves every comparison exactly: $\mathrm{CMP}(m+1,n+1)=\mathrm{CMP}(m,n)$.
- Take the vector state of $\delta_0$. The state space spanned by the objects is $\mathcal{K}=\overline{\operatorname{span}}\{\lambda^m\delta_0:m\in\mathbb{N}\}=\ell^2(\mathbb{N})$, and the evolution induced by $T$, $\lambda^m\delta_0\mapsto\lambda^{m+1}\delta_0$, is the restriction of $\lambda$ to $\mathcal{K}$, which is precisely the unilateral shift; $\lambda^{-1}\delta_0$ does not lie in $\mathcal{K}$.
- Replace $\mathcal{A}$ by the commutative $C^*$-algebra generated by $\lambda$. The vector state of $\delta_0$ is a faithful trace on it, Clauses I–IV and the positivity condition still hold, and neither $\mathcal{K}$ nor the induced evolution changes. So a faithful trace on the algebra does not exclude the unilateral shift either: the induced evolution is the compression of $\lambda$ to $\mathcal{K}$, not an element of $\mathcal{A}$.

In general, let Clauses II–IV hold and let $T:X\to X$ satisfy $\mathrm{CMP}(Tx,Ty)=\mathrm{CMP}(x,y)$. Choose an anchor $o$ and put $w=\mathrm{CMP}(o,To)$. Clause IV gives $\mathrm{CMP}(o,Tx)=\mathrm{CMP}(o,To)\,\mathrm{CMP}(To,Tx)=w\,\mathrm{CMP}(o,x)$: on the anchored representation of [@rem-appe-anchoring-consequences], a comparison-preserving map is left multiplication by the fair element $w$, and by Clause I it is injective on the extensional quotient. What it induces on the state space is an isometry; whether that isometry is invertible depends on whether the object set is closed under time reversal. Each of the following is sufficient:

1. **Past completeness**: $T$ is surjective, so every object has a predecessor. Then $w$ maps the state space onto itself and the induced evolution is unitary.
2. The state space is finite-dimensional: an isometry is then automatically onto.

Past completeness is not necessary: for $\mathcal{A}=\mathbb{C}$ and $\mathrm{CMP}(m,n)=e^{i(n-m)\theta}$ the map $T$ is not onto, the state space is $\mathbb{C}$, and the evolution is unitary. The exact criterion lives at the operator level: the wandering subspace $\mathcal{K}\ominus U\mathcal{K}$ of the induced isometry $U$ is zero, which merely restates that the isometry is onto. The Wold decomposition writes every isometry as the direct sum of a unitary part and unilateral shifts (`literature result`); its finite-level form with the norm identity is the frozen theorem [`exists_wold_decomposition`](lean:D5/S3/HilbertOperators/WoldDecomposition.exists_wold_decomposition).
:::

The item "two-sided invertibility" in `H6` can therefore be secured by a sentence about objects: **every object has a past.** It is sufficient, not necessary; it is also an input, not a consequence, since the example satisfies every clause without it.

Next, continuity in time. Let a family of objects $x_t$ ($t\in\mathbb{R}$) satisfy Clauses II–IV with $\mathrm{CMP}(x_s,x_t)=w(t-s)$ depending only on the time difference, and let $\varphi$ be a state.

::: {.remark #rem-appe-sagitta-continuity title="If the Sagitta Reading Is Continuous at Zero, the Evolution Is Strongly Continuous (Manual Derivation and Literature)"}
**Manual derivation.** Write $f(t)=\varphi\bigl(w(t)\bigr)$ and the sagitta reading $\nu(t)=\varphi\bigl(v(x_0,x_t)\bigr)=1-\operatorname{Re}f(t)$, which is half the squared chord distance of [@rem-appe-gram-from-flatness]. In the GNS representation $(\pi,\Omega)$ of $\varphi$ put $\xi_s=\pi(w(s))\Omega$, $\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$, and let $U_t$ be $\pi(w(t))$ restricted to $\mathcal{K}$. Then:

1. $U_t$ is a one-parameter unitary group on $\mathcal{K}$, and $\lVert(U_t-\mathbf{1})\xi_s\rVert^2=2\nu(t)$ for all $s,t$;
2. $f$ is positive definite, and $\lvert f(t)-f(s)\rvert^2\le2\nu(t-s)$;
3. the following are equivalent: $\nu$ is continuous at $0$; $U$ is strongly continuous on $\mathcal{K}$; $f$ is continuous everywhere.

Derivation: $\lVert(U_t-\mathbf{1})\xi_s\rVert^2=\varphi\bigl((w(t+s)-w(s))^*(w(t+s)-w(s))\bigr)=2-2\operatorname{Re}\varphi(w(t))$, using $w(s)^*w(t+s)=w(t)$. Time runs over all of $\mathbb{R}$ here, so $U_tU_{-t}=\mathbf{1}$ holds on $\mathcal{K}$ and $U_t$ is unitary. Positive definiteness is the same computation as in [@rem-appe-gram-from-flatness]. The inequality: $f(t)-f(s)=\langle\Omega,U_s(U_{t-s}-\mathbf{1})\Omega\rangle$, followed by Cauchy–Schwarz. The equivalence: $\lVert(U_h-\mathbf{1})\xi_s\rVert\to0$ on the generating vectors; $\lVert U_h-\mathbf{1}\rVert\le2$ and density carry this to all of $\mathcal{K}$, and $\lVert U_{t+h}\xi-U_t\xi\rVert=\lVert(U_h-\mathbf{1})\xi\rVert$ carries it to every time.

**Measurability of the readings is not enough (manual derivation).** Let $\mathcal{A}$ be the algebra of all bounded operators on $\ell^2(\mathbb{R}_{\mathrm{d}})$ ($\mathbb{R}$ with the discrete topology), $w(t)$ the translation $\delta_r\mapsto\delta_{r+t}$, and $\varphi$ the vector state of $\delta_0$. Clauses II–IV and the positivity condition hold, and $f$ equals $1$ at $0$ and $0$ elsewhere, so it vanishes almost everywhere and is measurable; yet $\nu(t)=1$ for $t\neq0$: every time translate is orthogonal to the original object.

**Literature result.** A weakly measurable one-parameter unitary group on a separable Hilbert space is strongly continuous (von Neumann 1932). In the setting above the matrix elements are $\langle\xi_r,U_t\xi_s\rangle=f(t+s-r)$, so measurability of $f$ together with separability of $\mathcal{K}$ meets the hypotheses of that theorem; in the countermodel $\mathcal{K}$ is not separable. A strongly continuous one-parameter unitary group has a self-adjoint generator (Stone 1932).
:::

Item 2 says that **a comparison reading taken against $x_0$ changes over an interval of time by at most the chord distance between the objects at its ends.** So the item "strong continuity" in `H6` can be replaced by a single scalar condition on readings: an object and its small time translates are close in chord distance. In finite dimension this connects directly with the frozen theorem [@thm-calibrated-unitary-group]: if $U$ is continuous, choose $\delta>0$ with $\lVert U_s-\mathbf{1}\rVert\le\frac12$ for $0\le s\le\delta$; then $V=\frac1\delta\int_0^\delta U_s\,ds$ is invertible and $U_tV=\frac1\delta\int_t^{t+\delta}U_s\,ds$ is differentiable in $t$, so $U_t=(U_tV)V^{-1}$ is differentiable at $0$ (`manual derivation`). This is exactly the differentiability hypothesis of [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group), which then gives $U_t=e^{-itH}$ with $H$ self-adjoint.

The generator itself can also be read off from chord and sagitta.

::: {.remark #rem-appe-generator-chord-sagitta title="The Generator Is the Chord Rate, the Sagitta Rate Tends to Half Its Square; Finite-Step Speed Bounds (Manual Derivation and Literature)"}
**Manual derivation.** Let $H$ be a Hermitian operator on a finite-dimensional space, $u_t=e^{-itH}$, $\psi$ a unit vector, and $\langle X\rangle=\langle\psi,X\psi\rangle$.

1. $S_t=\cos(tH)$, $A_t=-i\sin(tH)$, $v_t=2\sin^2(tH/2)$, and $\lVert\Delta_t\psi\rVert^2=2\langle v_t\rangle$.
2. $\dfrac{t^2}{2}\langle H^2\rangle-\dfrac{t^4}{24}\langle H^4\rangle\le\langle v_t\rangle\le\dfrac{t^2}{2}\langle H^2\rangle$.
3. For $t\neq0$: $\bigl\lVert(\Delta_t/t+iH)\psi\bigr\rVert\le\frac{\lvert t\rvert}{2}\lVert H^2\psi\rVert$, $\bigl\lVert(A_t/t+iH)\psi\bigr\rVert\le\frac{t^2}{6}\lVert H^3\psi\rVert$, and $\bigl\lVert(v_t/t^2-H^2/2)\psi\bigr\rVert\le\frac{t^2}{24}\lVert H^4\psi\rVert$.
4. Put $\sigma^2=\langle H^2\rangle-\langle H\rangle^2$. For every positive integer $N$ with $\sigma\lvert t\rvert\le2N$,

$$
\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le2N\arcsin\frac{\sigma\lvert t\rvert}{2N}.
$$

The right-hand side decreases in $N$ and tends to $\sigma\lvert t\rvert$ as $N\to\infty$, so $\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le\sigma\lvert t\rvert$ for every $t$, with equality for an equal two-level superposition.

Derivation: items 1–3 reduce by the spectral decomposition to the scalar inequalities $\frac{x^2}2-\frac{x^4}{24}\le1-\cos x\le\frac{x^2}2$, $\lvert e^{-ix}-1+ix\rvert\le\frac{x^2}2$, $\lvert\sin x-x\rvert\le\frac{\lvert x\rvert^3}6$ and $\lvert1-\cos x-\frac{x^2}2\rvert\le\frac{x^4}{24}$. Item 4: item 2 applied to $H-\langle H\rangle$ gives the one-step bound $\lvert\langle\psi,u_h\psi\rangle\rvert\ge1-\frac{\sigma^2h^2}2$, so for $\sigma\lvert h\rvert\le2$ the angle $\arccos\lvert\langle\psi,u_h\psi\rangle\rvert$ is at most $2\arcsin\frac{\sigma\lvert h\rvert}2$ (when the right side is at least $\frac\pi2$ there is nothing to prove); since $u_t$ commutes with $H$, $\sigma$ is constant along the orbit and every pair of neighbouring points has this one-step angle; take $h=t/N$ and add the $N$ steps with the frozen Fubini–Study triangle inequality [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle). Monotonicity follows because $y\mapsto\arcsin y/y$ increases on $(0,1]$.

**Literature result.** The limiting form of item 4 is the Mandelstam–Tamm angle bound for an autonomous pure state (Mandelstam–Tamm 1945; the cosine form is in Fleming 1973). [@rem-qsl-zeno-literature] in Chapter 7 derives the same bound by a derivative argument.
:::

Item 3 says that **the generator is the chord rate, and the sagitta rate tends to half its square.** The lock $\Delta_t^*\Delta_t=2v_t$ becomes $(-iH)^*(-iH)=2\cdot\frac{H^2}2$ in the limit. Item 4 says that **a one-step sagitta bound plus the triangle inequality for angles is the speed limit**, with an exact bound at every finite number of steps. [@thm-fubini-study-record-time] takes as hypotheses the bounds $\mathrm{energy}\cdot\tau/\hbar$ on the angular displacement towards each of two orthogonal records; if both record states are reached from the same initial state within time $\tau$ by finite-dimensional Hamiltonian evolutions, and the energy standard deviation of the initial state under each Hamiltonian is at most $\mathrm{energy}>0$, the limiting form of item 4 supplies both hypotheses.

Last, conditioning. The resetting instrument of E.5 shows that Born weights alone do not fix the post-measurement state, and that repeatability and minimal disturbance are needed. The two can be merged into one statement about comparisons.

::: {.remark #rem-appe-luders-nearest title="The Lüders State Is the Object with the Largest Comparison Reading among Those Certain to Pass the Test (Manual Derivation and Literature)"}
**Manual derivation.** Let $P$ be a projection, $\rho$ a state and $p=\operatorname{tr}(P\rho)>0$. Call a state $\eta$ **certain to pass the test** if $\operatorname{tr}(P\eta)=1$, that is, $\eta=P\eta P$; such an $\eta$ gives the same outcome when $P$ is measured again, so repeatability holds automatically.

1. Pure state $\rho=\lvert\psi\rangle\langle\psi\rvert$: for a unit vector $\phi$ in the range of $P$, $\lvert\langle\psi,\phi\rangle\rvert=\lvert\langle P\psi,\phi\rangle\rvert\le\lVert P\psi\rVert$, with equality if and only if $\phi$ is parallel to $P\psi$. So in the chord distance $\min_\alpha\lVert\psi-e^{i\alpha}\phi\rVert^2=2-2\lvert\langle\psi,\phi\rangle\rvert$, the nearest object certain to pass the test is the Lüders vector $P\psi/\lVert P\psi\rVert$, unique up to a phase.
2. If $\lVert P\psi\rVert^2=1-\varepsilon$, the sagitta $1-\sqrt{1-\varepsilon}$ of this conditioning step lies between $\frac\varepsilon2$ and $\varepsilon$.
3. Mixed states: among the states certain to pass the test, the fidelity $\operatorname{Fid}(\rho,\eta)=\bigl(\operatorname{tr}\lvert\sqrt\rho\sqrt\eta\rvert\bigr)^2$ has maximum $p$, attained only at $P\rho P/p$. Derivation: by Uhlmann's theorem (Uhlmann 1976, `literature result`), $\operatorname{Fid}(\rho,\eta)$ is the maximum, and it is attained, of the squared overlap between a fixed purification $\Psi$ of $\rho$ and the purifications $\Phi$ of $\eta$; $\eta=P\eta P$ puts $\Phi$ in the range of $P\otimes\mathbf{1}$, item 1 gives $\lvert\langle\Psi,\Phi\rangle\rvert\le\sqrt p$, and equality forces $\Phi$ to be parallel to $(P\otimes\mathbf{1})\Psi$, whose reduced state is the Lüders state.
4. With the trace norm, or with the Hilbert–Schmidt distance among trace-one candidates, the nearest state is not the Lüders state. Trace norm: for $\rho=\frac14\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$ and $P=\operatorname{diag}(1,1,0)$, the Lüders state $\operatorname{diag}(\frac12,\frac12,0)$ gives $\lVert\rho-\rho_{\mathrm L}\rVert_1=\frac{1+\sqrt{17}}4$, while $\eta=\begin{pmatrix}\frac12&\frac14&0\\\frac14&\frac12&0\\0&0&0\end{pmatrix}$, also certain to pass, gives the smaller $\frac{\sqrt6}2$. Hilbert–Schmidt distance: for $\rho=\operatorname{diag}(\frac12,\frac14,\frac14)$ the Lüders state $\operatorname{diag}(\frac23,\frac13,0)$ has squared distance $\frac{14}{144}$, while $\operatorname{diag}(\frac58,\frac38,0)$ has the smaller $\frac{27}{288}$.
:::

The item "repeatable minimal disturbance" in `H6` can therefore be stated as (`MODEL`): **the conditioned object is, among the objects certain to pass this test, the one with the largest comparison reading with the original.** With fidelity as the reading, the result is exactly the Lüders state, and it is unique. The input has not disappeared; it has changed shape: item 4 shows that another reading gives another update. The definition of the conditional state and the fact that it is a state are in the frozen theorem [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState); the optimality itself has no frozen statement.

## E.8.2.3 Composites and Exchange {#sec-appe-composites-and-exchange}

`H7` has two inputs: complex local tomography and the choice of exchange statistics. The first appears in [@ex-appe-qubit-cubic-and-tomography] as a count for two rebits. The counts for the three scalar fields fit in one line.

::: {.remark #rem-appe-tomography-count title="Parameter Counts for Real, Complex and Quaternionic Scalars (Manual Derivation and Literature)"}
**Manual derivation.** For $F\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$ write $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$. An $n\times n$ Hermitian matrix over $F$ has $n$ real diagonal entries and one entry of $F$ for each pair $(i,j)$, so its real dimension is

$$
K_d(n)=n+d\cdot\frac{n(n-1)}{2}.
$$

Write $d=0$ for the classical case, $K_0(n)=n$. Direct expansion gives

$$
K_d(ab)-K_d(a)\,K_d(b)=\frac{d(2-d)}{4}\,a(a-1)\,b(b-1).
$$

Hence for $a,b\ge2$, "a system of dimension $ab$ has as many parameters as the product of the two local numbers" holds if and only if $d=0$ or $d=2$. For $d=1$ there are $\frac14a(a-1)b(b-1)$ extra parameters visible only to global readings; for $a=b=2$ this is the $J\otimes J$ of [@ex-appe-qubit-cubic-and-tomography]. For $d=4$ there are $2a(a-1)b(b-1)$ fewer than the product of the local numbers.

In the language of comparison: of the $d$ real directions on each pair $(i,j)$, one is a similarity direction and the remaining $d-1$ are right-angle comparison directions squaring to $-\mathbf{1}$ (`MODEL`). Multiplicative counting asks for exactly one right-angle direction off the diagonal, or for no off-diagonal entries at all. The centres of the three matrix algebras are $\mathbb{R}$, $\mathbb{C}$ and $\mathbb{R}$ (`literature result`), and only in the complex case does the centre contain a right-angle comparison; so within these three classes, "multiplicative counting" and "a right-angle comparison in the centre" are the same thing. This is not a characterization for general algebras.

The sagitta of a product comparison $u_1\otimes u_2$ is $\mathbf{1}-S_1\otimes S_2-A_1\otimes A_2$. The two-rebit states $\rho_\pm=\frac14(\mathbf{1}\pm J\otimes J)$ have the same readings on all products of local real symmetric matrices, yet for $u_1=u_2=\cos\theta\,\mathbf{1}+J\sin\theta$ their readings of the product sagitta are $0$ and $2\sin^2\theta$. Saying that "the sagitta readings of product comparisons are determined by local readings" is equivalent to local tomography, but this only renames the term $A_1\otimes A_2$; it derives nothing.

**Literature result.** The link between local tomography and the complex numbers is in Wootters (1990), Hardy (2001) and Chiribella–D'Ariano–Perinotti (2011); there is no quaternionic tensor product that multiplies dimensions, and the above compares parameter counts only, without constructing a quaternionic composite. The complex count $\dim_{\mathbb{R}}\operatorname{Herm}(n)=n^2$ is the frozen theorem [`hermitian_space_finrank`](lean:D5/S3/Quantum/Entanglement/BipartiteSectorDecomposition.hermitian_space_finrank).
:::

Exchange statistics also has a clean place in the language of comparison.

::: {.remark #rem-appe-swap-sagitta title="Exchange Is a Fair Involution with Sagitta 0 and 2; Clause I Removes Labels but Does Not Choose a Sector (Manual Derivation and Literature)"}
**Manual derivation.** On $\mathcal{H}\otimes\mathcal{H}$ let $\mathrm{SW}(\psi\otimes\phi)=\phi\otimes\psi$ be the swap.

1. $\mathrm{SW}^*=\mathrm{SW}$ and $\mathrm{SW}^2=\mathbf{1}$, so $\mathrm{SW}$ is fair and self-adjoint, $S=\mathrm{SW}$, $A=0$, the sagitta $v=\mathbf{1}-\mathrm{SW}$ takes only the values $0$ and $2$, and the antisymmetric projection is half the sagitta: $P_\wedge=\frac12v$. On the symmetric sector the swap is the identity; on the antisymmetric sector it is the antipode.
2. $\langle\psi\otimes\phi,\mathrm{SW}\,\psi\otimes\phi\rangle=\lvert\langle\psi,\phi\rangle\rvert^2$, so the weight of the antisymmetric sector is $\frac12\bigl(1-\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$: the sagitta reading of the swap is fixed by the Born weight between the two one-body states.
3. Suppose every observable commutes with $\mathrm{SW}$. Then for every such $O$ and every $x$, $\langle x,Ox\rangle=\langle P_{\mathrm{Sym}}x,OP_{\mathrm{Sym}}x\rangle+\langle P_\wedge x,OP_\wedge x\rangle$, so there is no readable coherence between the two sectors. $\psi\otimes\phi$ and $\phi\otimes\psi$ have the same readings; if objects are compared only through these readings, Clause I identifies them and the particle labels are divided out. The identified object is nevertheless a mixture of the two sectors with weights $\frac12\bigl(1\pm\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$.

So Clause I removes labels and does not choose a sector. For $N\ge3$ every transposition is the same kind of fair involution; with permutations as objects and $\mathrm{CMP}(\sigma,\tau)=U(\sigma)^*U(\tau)$, Clauses II–IV hold for any unitary representation $U$ of the symmetric group. For three two-level particles, for instance, the $8$-dimensional space has a $4$-dimensional symmetric sector, a $0$-dimensional antisymmetric sector and a $4$-dimensional sector of mixed symmetry.

**Literature result.** Item 2 is the swap test (Buhrman–Cleve–Watrous–de Wolf 2001). Keeping only the one-dimensional representations of the symmetric group is the symmetrization postulate (Messiah–Greenberg 1964), and the link between spin and statistics comes from relativistic quantum field theory (Pauli 1940); both are inputs outside the comparison axiom.
:::

In this reading (`MODEL`), the choice of exchange statistics is whether the sector where the swap has sagitta $2$ is occupied. It is a superselection label and, like the signature of `H2` and the light cone of `H8`, a `T3`-type bifurcation.

## E.8.2.4 Ensembles: Multipoint Positivity and the Qubit Born Weight in Terms of Readings {#sec-appe-ensembles}

So far comparison has been made between two objects. Experiments often do something else: draw an object at random with given probabilities, then compare it. Call a finitely supported probability distribution $E=\sum_kp_k\delta_{x_k}$ on $X$ an **ensemble**, and define the averaged similarity reading of two ensembles as $S(E,F)=\sum_{k,l}p_kq_l\,S(x_k,y_l)$ (`MODEL`). Call $\bar x$ an **opposite** of $x$ if $\mathrm{CMP}(x,\bar x)=-\mathbf{1}$, that is, if their sagitta is $2$. Under Clauses II and IV, $\mathrm{CMP}(\bar x,z)=\mathrm{CMP}(\bar x,x)\,\mathrm{CMP}(x,z)=-\mathrm{CMP}(x,z)$: every comparison of the opposite is that of $x$ with the sign reversed.

::: {.remark #rem-appe-ensemble-positivity title="With Opposites, Ensemble Self-Agreement Is Equivalent to Gram Positivity; Without Them It Is Not Enough (Manual Derivation)"}
**Manual derivation.** Assume Clauses II–IV and real scalar similarity readings, $S(x,y)=s_{xy}\mathbf{1}$. For an ensemble $E=\sum_kp_k\delta_{x_k}$ one has $S(E,E)=p^{\mathsf T}[s_{x_kx_l}]\,p$, the average similarity reading of two objects drawn independently from the same ensemble.

1. If every object has an opposite, the following are equivalent: (a) every ensemble has a nonnegative averaged similarity with itself, $S(E,E)\ge0$; (b) for every finite set of points the table $[s_{x_ix_j}]$ is positive semidefinite.
2. Under (b), $\lvert s_{xy}\rvert\le1$; if $s_{xy}=1$, then $x$ and $y$ have the same similarity reading against every $z$, and if $s_{xy}=-1$ the readings are everywhere opposite.
3. Without opposites, (a) does not imply (b).

Derivation: (b) gives (a) by taking $\alpha=p$. Conversely, given a real vector $\alpha\neq0$, take $y_i=x_i$ where $\alpha_i\ge0$ and $y_i=\bar x_i$ where $\alpha_i<0$, and let $E=\sum_i\frac{\lvert\alpha_i\rvert}{\lVert\alpha\rVert_1}\delta_{y_i}$. Since $s_{\bar xz}=-s_{xz}$, $S(E,E)=\alpha^{\mathsf T}[s_{x_ix_j}]\,\alpha/\lVert\alpha\rVert_1^2$, so (a) gives (b). Item 2: the $2\times2$ minor $\begin{pmatrix}1&s\\s&1\end{pmatrix}$ is positive semidefinite exactly when $\lvert s\rvert\le1$; for any $z$, write the positive semidefinite table on $\{x,y,z\}$ as the Gram matrix of unit vectors $e_x,e_y,e_z$ in a real inner-product space; $s_{xy}=1$ gives $\lVert e_x-e_y\rVert^2=2-2s_{xy}=0$, so $e_x=e_y$ and $s_{xz}=s_{yz}$; $s_{xy}=-1$ gives $e_x=-e_y$.

The example for item 3 is the triple in $(M_2(\mathbb{R}),{}^\sharp)$ at the end of E.8.1.1: $s_{01}=s_{02}=\frac{\sqrt2}{2}$, $s_{12}=-\frac18$, and the table has determinant $-\frac{9}{64}$. For nonnegative weights,
$$
p^{\mathsf T}Gp=p_0^2+p_1^2+p_2^2+\sqrt2\,p_0(p_1+p_2)-\frac14p_1p_2\ \ge\ p_0^2+\frac78\left(p_1^2+p_2^2\right)>0,
$$
so (a) holds on these three objects. Add the opposites $-x_0,-x_1,-x_2$ to the set of objects (they still lie in $\mathrm{SL}(2,\mathbb{R})$, $\mathrm{CMP}(x,-x)=-\mathbf{1}$, and Clauses II–IV still hold); then the ensemble $E=\frac{1}{2+\sqrt2}\left(\sqrt2\,\delta_{\bar x_0}+\delta_{x_1}+\delta_{x_2}\right)$ gives $S(E,E)=-\frac{3-2\sqrt2}{8}<0$. A hyperbolic pair is the same situation: for $s_{01}=\cosh\eta>1$, nonnegative weights give $p_0^2+p_1^2+2p_0p_1\cosh\eta>0$; with an opposite, $E=\frac12\left(\delta_{x_0}+\delta_{\bar x_1}\right)$ gives $\frac12(1-\cosh\eta)<0$.
:::

Compare item 3 of [@rem-appe-gram-from-flatness], where (b) follows from Clause IV and the positivity condition. Here, to obtain (b), the positivity condition can also be replaced by two statements about compared objects and readings alone: **every object has an opposite; two objects drawn independently from the same ensemble have a nonnegative averaged similarity.** These two statements are not equivalent to the positivity condition. They still allow parabolic pairs with $s=\pm1$ and $A\neq0$: take the objects $\pm1$, $\pm(1+\varepsilon)$ among the dual numbers of counterexample (b) in [@ex-appe-layer0-countermodels]; the readings are only $\pm1$, the table is positive semidefinite, (a) holds, and the positivity condition fails. By item 2, however, two such objects cannot be told apart by any similarity reading; they differ only in the difference channel. What is excluded is the hyperbolic branch. In the Lorentzian reading (`MODEL`), mixing a future-pointing unit timelike vector with a past-pointing one averages to a spacelike vector, and that is the negative reading above.

This leaves a question: is there a reading condition that also sees the difference channel, excludes the parabolic pairs as well, and so yields the positivity condition from readings? Under the premise that readings are given by states, the answer is no.

::: {.remark #rem-appe-positivity-invisible-part title="The Part of the Positivity Condition That No Reading by a State Can See (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mathcal{A}$ be a real or complex unital $*$-algebra. Call a linear functional $\varphi$ (complex-linear when $\mathcal{A}$ is complex) a **state** if $\varphi(\mathbf{1})=1$, $\varphi(a^*a)\ge0$ for every $a$, and $\varphi(a^*)=\overline{\varphi(a)}$. Over the complex numbers the last condition follows from the first two, so states are exactly the normalized positive functionals used in E.8.1.3. Over the reals the last condition is an additional restriction: it makes a state vanish on every element with $a^*=-a$, so on a real algebra states do not read difference parts; E.8.1.3 only asks for real values on self-adjoint elements, which over the reals is no restriction. Call the value under a state of any finite product of comparison values and their involutes a **reading**; the similarity readings of E.8.1.3 and the orbit records of E.8.3.1 are readings (the latter, on a complex algebra, include the difference reading $i\operatorname{Im}f$), and the ensemble readings of E.8.2.4 are averages of readings. Assume that $\mathcal{A}$ has at least one state, and put

$$
\mathcal{R}=\left\{a\in\mathcal{A}:\ \varphi(a^*a)=0\ \text{for every state}\ \varphi\right\}.
$$

1. For $r\in\mathcal{R}$, $y,z\in\mathcal{A}$ and every state $\varphi$, $\varphi(yrz)=0$; $\mathcal{R}$ is a two-sided ideal closed under $*$.
2. If $a^*a=-t\mathbf{1}$ with $t\ge0$, then $t=0$ and $a\in\mathcal{R}$. Hence the positivity condition holds if and only if $\mathcal{A}$ has no nonzero $a$ with $a^*a=0$, and every such $a$ lies in $\mathcal{R}$; on the quotient algebra $\mathcal{A}/\mathcal{R}$ the positivity condition always holds.
3. If two comparison maps with values in $\mathcal{A}$ differ pointwise only by elements of $\mathcal{R}$, that is $\mathrm{CMP}'(x,y)-\mathrm{CMP}(x,y)\in\mathcal{R}$, then all their readings agree.
4. There is a comparison map with values in a complex $*$-algebra, satisfying Clauses I–IV, for which the positivity condition fails in that algebra (and in the subalgebra generated by its comparison values), while all its readings agree with those of a Clifford comparison map in the same algebra whose comparison values generate a subalgebra satisfying the positivity condition.

Derivation: a state satisfies the Cauchy–Schwarz inequality $\lvert\varphi(y^*x)\rvert^2\le\varphi(y^*y)\,\varphi(x^*x)$, which follows from $\varphi\bigl((x+\lambda y)^*(x+\lambda y)\bigr)\ge0$ for every scalar $\lambda$ together with $\varphi(x^*y)=\overline{\varphi(y^*x)}$; no norm or boundedness is used. Item 1: given $z$, $\chi(x)=\varphi(z^*xz)$ satisfies $\chi(x^*x)\ge0$ and is compatible with the involution. If $\chi(\mathbf{1})>0$, then $\chi/\chi(\mathbf{1})$ is a state, so $\chi(r^*r)=0$; if $\chi(\mathbf{1})=0$, Cauchy–Schwarz gives $\lvert\chi(x)\rvert^2\le\chi(\mathbf{1})\chi(x^*x)=0$. In both cases $\varphi\bigl((rz)^*(rz)\bigr)=0$, that is, $rz\in\mathcal{R}$. Cauchy–Schwarz again gives $\lvert\varphi(y\,rz)\rvert^2\le\varphi(yy^*)\,\varphi\bigl((rz)^*(rz)\bigr)=0$. Hence $\varphi\bigl((r+r')^*(r+r')\bigr)=2\operatorname{Re}\varphi(r^*r')=0$, $\varphi\bigl((yr)^*(yr)\bigr)=\varphi\bigl((r^*y^*y)\,r\,\mathbf{1}\bigr)=0$ and $\varphi(rr^*)=\varphi(\mathbf{1}\,r\,r^*)=0$: $\mathcal{R}$ is a subspace, closed under multiplication on either side and under $*$. Item 2: take a state; $-t=\varphi(a^*a)\ge0$, so $t=0$ and $a^*a=0$, hence $a\in\mathcal{R}$. In the quotient, $a^*a+t\mathbf{1}\in\mathcal{R}$ with $t\ge0$ gives $\varphi(a^*a)+t=0$ by item 1, and likewise $t=0$ and $a\in\mathcal{R}$. Item 3: write each factor of the product as the original factor plus an element of $\mathcal{R}$ and expand ($\mathcal{R}$ is closed under $*$, so involuted factors behave the same way); every term except the original product contains a factor from $\mathcal{R}$ in some position, and its reading vanishes by item 1. Item 4: in $\mathcal{Cl}_{3,0}$ take pairwise non-parallel unit vectors $x_1,\dots,x_N$ ($N\ge2$) and $c_{ij}=x_ix_j$; the involution is reversion. With the central element $\mathbf{I}=e_1e_2e_3$ as imaginary unit, $\mathcal{Cl}_{3,0}$ is the Pauli-matrix model $M_2(\mathbb{C})$, reversion is the Hermitian adjoint, and the positivity condition holds. Let $\mathcal{A}'=\mathcal{Cl}_{3,0}[\delta]$ with $\delta$ commuting with everything, $\delta^2=0$ and $\delta^*=-\delta$; it is again a complex $*$-algebra with imaginary unit $\mathbf{I}$, and it has states (for instance $x+y\delta\mapsto\frac12\operatorname{Tr}x$). Choose distinct real numbers $n_i$ and put

$$
c'_{ij}=x_ix_j\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr).
$$

From $(\mathbf{1}+k\delta)(\mathbf{1}+k\delta)^*=\mathbf{1}-k^2\delta^2=\mathbf{1}$ and $\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr)\bigl(\mathbf{1}+(n_k-n_j)\delta\bigr)=\mathbf{1}+(n_k-n_i)\delta$, Clauses II–IV hold; the rows of $c$ are pairwise distinct, so are those of $c'$, and the quotient of Clause I identifies no two points. Since $\delta^*\delta=0$, item 2 gives $\delta\in\mathcal{R}$, so $c'-c$ lies pointwise in $\mathcal{R}$, and by item 3 the two maps have the same readings under every state of $\mathcal{A}'$. But $c'_{ij}+c'_{ji}-2(x_i\cdot x_j)\,c'_{ii}=2(n_j-n_i)\,\delta\,A(x_i,x_j)$ belongs to the algebra generated by $c'$; for $i\neq j$ it is nonzero, yet its $a^*a$ vanishes, so the positivity condition fails in that algebra.

The premise of states cannot be dropped. If $\mathcal{A}'$ is regarded only as a real $*$-algebra, then $\varphi(x+y\delta)=\langle x\rangle_0+\kappa\langle y\rangle_0$ (with $\langle\cdot\rangle_0$ the scalar part and $\kappa$ any real number) is real-valued, normalized and positive ($\varphi\bigl((a+b\delta)^*(a+b\delta)\bigr)=\langle a^*a\rangle_0$), but not compatible with the involution, and its readings separate the two comparison maps: $\varphi(c'_{ij})-\varphi(c_{ij})=\kappa(n_j-n_i)\,(x_i\cdot x_j)$, although their similarity readings still agree.

$\mathcal{R}$ is exactly the intersection of the kernels of the GNS representations of all states: $\pi_\varphi(a)=0$ if and only if $\varphi(b^*a^*ab)=0$ for every $b$, which holds for $a\in\mathcal{R}$ by item 1, and conversely one takes $b=\mathbf{1}$.

**Literature result.** The reducing ideal of a $*$-algebra is defined as the intersection of the kernels of all its $*$-representations and was formerly called the $*$-radical (Palmer 1972). The representations there are by bounded operators on Hilbert spaces and need not coincide with the GNS representations of states used here, so $\mathcal{R}$ is only an object of the same kind.
:::

So, under the premise that readings are given by states and that at least one state exists, the positivity condition is equivalent to "there is no nonzero element of square zero". The premise itself already excludes the hyperbolic branch: the difference part of a hyperbolic comparison satisfies $A^*A=(1-s^2)\mathbf{1}$, and for $s^2>1$ no state gives it a nonnegative reading. The remaining requirement, "no nonzero element of square zero", excludes the parabolic branch; for instance, the difference part $\varepsilon$ of the dual number $1+\varepsilon$ of counterexample (b) in [@ex-appe-layer0-countermodels] satisfies $\varepsilon^*\varepsilon=0$ and lies in $\mathcal{R}$. By items 3 and 4, this requirement cannot be derived from any condition on readings by states, whether one reads the similarity or the difference channel, ensembles or orbit records, or products of any number of comparison values. Under readings by states, the parabolic pairs left over by ensemble self-agreement above are not merely indistinguishable by similarity readings; they are indistinguishable by every reading. Conversely, applying Clause I to readings (`MODEL`), that is, identifying elements whose readings all agree and so passing to $\mathcal{A}/\mathcal{R}$, makes the positivity condition hold automatically. So under this premise this part of the input is not a gap that readings could fill; it is a convention about algebraic structure beyond the readings.

The same device of applying comparison to ensembles also restates `H5` on a qubit.

::: {.remark #rem-appe-ensemble-extensionality-born title="Ensemble Extensionality Gives the Qubit Born Rule Without Continuity (Manual Derivation and Literature)"}
**Manual derivation.** Keep the setting of [@rem-appe-born-zonal-minimal-rank]: the probability for preparation $\mathbf{s}$ and exit $\mathbf{r}$ is $f(\mathbf{s}\cdot\mathbf{r})$, but $f:[-1,1]\to\mathbb{R}$ need not be continuous. The exit probability of an ensemble is the average, $p(\mathbf{r}\mid E)=\sum_kp_kf(\mathbf{s}_k\cdot\mathbf{r})$; its averaged similarity against a probe $\mathbf{z}$ is $\sum_kp_k\,\mathbf{s}_k\cdot\mathbf{z}=\mathbf{m}_E\cdot\mathbf{z}$, where $\mathbf{m}_E$ is the barycenter. Say the rule satisfies **ensemble extensionality** if two ensembles with the same averaged similarity against every probe have the same probability for every exit; since $\mathbf{m}\cdot\mathbf{z}$ for all unit $\mathbf{z}$ determines $\mathbf{m}$, this says that the exit probability depends only on the barycenter. Then

$$
\text{ensemble extensionality}\iff f(t)=a+bt ;
$$

adding $f(1)=1$ and antipodal normalization $f(t)+f(-t)=1$ gives $f(t)=\frac{1+t}{2}$.

Derivation: an affine rule clearly qualifies. Conversely, fix $\mathbf{r}$. Every point of the closed unit ball is the barycenter of some ensemble (draw any chord through it and weight its endpoints in proportion), so by ensemble extensionality $G(\mathbf{m}):=p(\mathbf{r}\mid E)$ with $\mathbf{m}_E=\mathbf{m}$ is well defined. Mixing two ensembles in the ratio $\lambda:1-\lambda$ combines both the barycenters and the exit probabilities in that ratio, so $G$ preserves convex combinations on the ball. Put $h=G-G(0)$. Mixing with barycenter $0$ gives $h(\lambda\mathbf{m})=\lambda h(\mathbf{m})$ for $0\le\lambda\le1$, and midpoints give $h\left(\frac{\mathbf{m}+\mathbf{m}'}{2}\right)=\frac12\left(h(\mathbf{m})+h(\mathbf{m}')\right)$. Hence $L(\mathbf{y}):=h(\varepsilon\mathbf{y})/\varepsilon$ (with $\varepsilon>0$, $\varepsilon\lVert\mathbf{y}\rVert\le1$) does not depend on $\varepsilon$, is additive and positively homogeneous, and is odd because $h(\varepsilon\mathbf{y})+h(-\varepsilon\mathbf{y})=2h(0)=0$; so it is linear. Here $\lambda$ ranges over all real numbers in $[0,1]$, which is why no continuity is needed. Thus $G(\mathbf{m})=a+\mathbf{b}\cdot\mathbf{m}$, and $f(\mathbf{s}\cdot\mathbf{r})=a+\mathbf{b}\cdot\mathbf{s}$ for every unit vector $\mathbf{s}$. On the great circle orthogonal to $\mathbf{r}$ the left side is the constant $f(0)$, and $\mathbf{s}$ and $-\mathbf{s}$ both lie on it, so $\mathbf{b}\cdot\mathbf{s}=0$ there; hence $\mathbf{b}$ is parallel to $\mathbf{r}$ and $f(t)=a+\beta t$.

The cubic rule $f(t)=\frac12(1+t^3)$ violates ensemble extensionality: the trine $\{(0,0,1),\,(\mp\frac{\sqrt3}{2},0,-\frac12)\}$ with equal weights and the antipodal pair $\{\pm\mathbf{e}_z\}$ with equal weights both have barycenter $0$, but their probabilities of exiting toward $\mathbf{e}_z$ are $\frac58$ and $\frac12$. The same argument works on $\mathbb{CP}^{d-1}$: take the readings $\lvert\langle x\mid z\rangle\rvert^2=\operatorname{Tr}(P_xP_z)$; the averaged readings determine the density matrix, and ensemble extensionality gives $f\bigl(\operatorname{Tr}(PQ)\bigr)=a+\operatorname{Tr}(BP)$; averaging over the unitaries that fix $Q$ replaces $B$ by $\beta Q+\gamma(\mathbf{1}-Q)$, so $f$ is affine, and $f(0)=0$, $f(1)=1$ give $f(t)=t$.

**Literature result.** Generalized probabilistic theories take states to be equivalence classes of preparations and exit probabilities to be affine functions of the state (Hardy 2001; Barrett 2007). The derivation above is this point made concrete for zonal rules; the zonal form and the trine counterexample only connect it to comparison readings.
:::

In this reading (`MODEL`), ensemble extensionality is Clause I applied to ensembles: treat an ensemble as an object and its averaged comparison readings as its comparison row; Clause I says that ensembles with the same row are the same object, and the exit probability, being a function of that object, depends only on the row. Compared with [@rem-appe-born-zonal-minimal-rank], it needs neither continuity nor a Legendre expansion; under continuity, antipodal normalization and $f(1)=1$ the two are equivalent, and both are equivalent to the Born rule. It is still an input: Clauses I–IV by themselves only govern comparisons between single objects, place no constraint on probability rules, and are compatible with the cubic rule. What has changed is that this input can now also be stated as an extension of Clause I.
