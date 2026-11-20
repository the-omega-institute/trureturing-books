# 34.8 From Squared Weights to Single Records: Spherical Attractor Basins, Martingale Sampling Laws, and the Selection Boundary {#sec-ch34-single-outcome-attractor-basins}

> *Round-trip double projection ([§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)) explains why the visible echo weight along an observer's axis must be the quadratic square $\cos^2\theta$, and horizon partial tracing ([§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)) explains why local off-diagonal interference vanishes under environmental entanglement; yet turning a pure state $\lvert\psi\rangle$ into the diagonal matrix $\operatorname{diag}(\cos^2\theta, \sin^2\theta)$ still converts a coherent superposition only into a coexisting ensemble of weighted branches (*And*), stopping half a step short of why a single laboratory run settles into one exclusive classical record (*Or*).*

In [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), we closed the radar round-trip loop along the observer's unit reference axis $\mathbf{I}$—projecting once to slice off the orthogonal blind zone and projecting back to cancel uncalibrated phase—and saw how the squared inner product $p_0 = \cos^2\theta$ lands back onto $\mathbf{I}$ as the canonical phase-invariant real echo. Yet the instant we shift focus from ensemble expectation values to **a single detector click on the laboratory bench**, the century-old epistemic cliff from the 1927 Solvay Conference rises squarely in front of us ([Appendix D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2)): at tilt angle $\theta = 30^\circ$, when $\mathbf{I}$ recovers $p_0 = \cos^2 30^\circ = \frac{3}{4}$ along itself while $1 - p_0 = \sin^2 30^\circ = \frac{1}{4}$ escapes into the perpendicular complement, why does an individual run never leave behind a blurry pointer smeared at three-quarters brightness, but instead jumps exclusively into full record `$0$` ($+\mathbf{I}$) or full record `$1$` ($-\mathbf{I}$) with long-run relative frequencies $\frac{3}{4} : \frac{1}{4}$?

Addressing this gap honestly begins not with rhetorical sleight of hand, but by using kernel-verified algebra to draw an unmistakable line between **what linear evolution, partial trace, and round-trip Born echoes actually prove** and **what additional dynamical selection premise single-outcome realization requires**.

## 34.8.1 Unread Pinching Fixed Points and the And-to-Or Gap: From Squared Born Echoes to the Single-Record Contract {#sec-ch34-20-1}

Recall from [Chapter 34](ch33-all-beings-observers-and-mutual-attractors.md) ([§34.2](ch33-s02-self-sustaining-attractors.md), [§34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer)) that a physical memory record persists against environmental perturbations only because the observer's internal register stabilizes discrete attractor configurations. In the operator algebra of quantum measurement, however, **einselecting a preferred record basis (unread pinching)** and **realizing one specific branch in a single run (conditioned selection)** are two distinct mathematical maps.

Given a finite-dimensional Hilbert space and a complete orthogonal family of record projectors $P = \{P_k\}_{k \in \kappa}$ ($P_k^\dagger = P_k$, $P_k P_l = \delta_{kl} P_k$, $\sum_k P_k = I$), the **non-selective unread pinching channel** acting on any positive-semidefinite unit-trace state $\rho$ is

$$
\operatorname{unreadState}(P, \rho) \;:=\; \sum_{k \in \kappa} P_k \rho P_k \;=\; \sum_{k \in \kappa} \operatorname{recordWeight}(P, \rho, k)\,\operatorname{conditionalState}(P, \rho, k),
$$

where $\operatorname{recordWeight}(P, \rho, k) = \operatorname{Tr}(\rho P_k)$ and, whenever $\operatorname{recordWeight}(P, \rho, k) \neq 0$, the normalized post-measurement **conditioned state** is $\operatorname{conditionalState}(P, \rho, k) = \operatorname{recordWeight}(P, \rho, k)^{-1} P_k \rho P_k$. Why can linear dynamics and non-selective pinching alone never deduce single-branch collapse? The formal contract below locks six frozen kernel theorems alongside two explicit non-selection checks:

::: {.remark #rem-ch34-selection-contract title="Hilbert–Bloch Double-Angle Bridge, Six Conditioning Kernel Anchors, and the Non-Selection Epistemic Contract"}
Throughout our bridge from the round-trip Born echo of [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) to single-qubit spherical attractor dynamics, we enforce three exact geometric and epistemic guardrails (`LEAN ✓` + `manual derivation` + `MODEL`):

1. **Exact conversion between Hilbert ray angle $\theta$ and Bloch polar angle $2\theta$ (`manual derivation`)**: Let $\theta \in [0, \frac{\pi}{2}]$ denote the **Hilbert-space Fubini–Study angle** between the observer's reference ket $\lvert 0\rangle$ (North Pole $+\mathbf{I} = +\mathbf{e}_z$ on $S^2$) and the pure state $\lvert\psi(\theta, \varphi)\rangle = \cos\theta\lvert 0\rangle + e^{i\varphi}\sin\theta\lvert 1\rangle$, so the round-trip Born weight is $p_0 = \lvert\langle 0\mid\psi\rangle\rvert^2 = \cos^2\theta \in [0, 1]$. Under the Hopf projection onto the single-qubit **Bloch sphere $S^2$**, the polar colatitude doubles to $\vartheta_{\mathrm{Bloch}} = 2\theta \in [0, \pi]$, relating the longitudinal coordinate $z_0$ along $\mathbf{I}$ to $p_0$ by the exact affine bijection

   $$
   z_0 \;=\; \cos(2\theta) \;=\; \cos^2\theta - \sin^2\theta \;=\; 2p_0 - 1 \;\in\; [-1, 1], \qquad p_0 \;=\; \cos^2\theta \;=\; \frac{1 + z_0}{2}.
   $$

   Thus the North Pole $z_0 = +1$ corresponds to $\theta = 0^\circ$ ($p_0 = 1$), the equator $z_0 = 0$ to equal superposition $\theta = 45^\circ$ ($p_0 = \frac{1}{2}$), and the $90^\circ$ Hilbert blind spot $\theta = 90^\circ$ ($p_0 = 0$) to the antipodal South Pole $z_0 = -1$ ($2\theta = 180^\circ$).
2. **Six kernel-verified pillars for record weights, unread pinching idempotence, and finite subset contraction (`LEAN ✓`)**: Among the pinned `trureturing` declarations, [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) proves that for rank-one $P_k = \lvert\phi\rangle\langle\phi\rvert$ and pure $\rho = \lvert\psi\rangle\langle\psi\rvert$, the branch weight satisfies $\operatorname{recordWeight}(P, \rho, k) = \lVert\langle\phi\mid\psi\rangle\rVert^2 = \operatorname{Tr}(\rho P_k)$ while reconstructing the unread state as the Born-weighted convex sum $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\bullet\operatorname{conditionalState}(P, \rho, j)$; [`recordWeight_sum`](lean:D5/S3/Observer/Conditioning.recordWeight_sum) proves total weight conservation $\sum_k \operatorname{recordWeight}(P, \rho, k) = \operatorname{Tr}(\rho)$; [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) certifies that every nonzero-weight branch state $\operatorname{conditionalState}(P, \rho, k)$ is positive semidefinite with unit trace; [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) proves $\operatorname{unreadState}(P, \rho) = \rho \iff \forall k \neq l,\; P_k \rho P_l = 0$; and [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent) locks strict idempotence $\operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P)$. On the discrete candidate-pruning side, [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) proves that on any finite type $X$ (`[Finite X]`), a subset-deleting update $S_{n+1} = U(S_n)$ obeying $\forall A,\; U(A) \subseteq A$ reaches a fixed point $S_N$ within $N \le \lvert S_0\rvert$ steps (with at most $\lvert S_0\rvert$ strict transitions)—its domain is strictly **monotone subset deletion on finite sets**, never a proof of continuous ODE convergence on $S^2$.
3. **Two explicit non-selection checks: why linear dynamics, partial trace, and pinching cannot cross the And-to-Or boundary (`manual derivation`)**:
   - **Non-deleting identity check**: Taking the branch-preserving identity map $U(A) = A$ in [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) satisfies $U(A) \subseteq A$ and stabilizes trivially at $N = 0$, yet leaves a two-branch support $S_0 = \{0, 1\}$ permanently unpruned ($S_n = \{0, 1\}$), never selecting $\{0\}$ or $\{1\}$;
   - **Diagonal improper-mixture fixed-point check**: Evaluate computational-basis projectors $P_0 = \operatorname{diag}(1, 0),\; P_1 = \operatorname{diag}(0, 1)$ on the decohered $\theta = 30^\circ$ benchmark state $\rho_{30^\circ} = \operatorname{diag}(\frac{3}{4}, \frac{1}{4})$. Because $P_0 \rho_{30^\circ} P_1 = P_1 \rho_{30^\circ} P_0 = 0$, [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) and [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent) give immediately

     $$
     \operatorname{unreadState}\bigl(P,\, \operatorname{diag}(3/4, 1/4)\bigr) \;=\; \operatorname{diag}(3/4, 1/4).
     $$

     Applying unread pinching a million times in succession leaves $\operatorname{diag}(\frac{3}{4}, \frac{1}{4})$ completely unchanged—it never collapses to $\operatorname{diag}(1, 0)$ or $\operatorname{diag}(0, 1)$! As established in [Appendix D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2) ([@rem-appendix-d-puzzle-1], [@rem-appendix-d-puzzle-2]), linear Schrödinger evolution, partial trace, and round-trip Born echoes determine the menu of conditioned states and their exact weights; passing from ensemble coexistence (`And`) to single-run realization (`Or`) requires an explicit **nonlinear attractor-basin capture or unbiased stochastic selection premise** (`MODEL`).
:::

## 34.8.2 Spherical Bistable Attractor Basins and Threshold Measure Sensitivity: Why Symmetry Alone Cannot Force Born's Rule {#sec-ch34-20-2}

Because a self-sustaining macroscopic register—whether a bistable neural assembly, a ferromagnetic domain, or a superconducting flux latch ([§34.2](ch33-s02-self-sustaining-attractors.md))—cannot hover indefinitely on an unstable equatorial ridge, it is natural to model single-record stabilization on the Bloch sphere $S^2$ via a **bistable pointer capture flow** (`MODEL`): North Pole $+\mathbf{e}_z$ (record `$0$`) and South Pole $-\mathbf{e}_z$ (record `$1$`) act as asymptotically stable attractors separated by a latitude separatrix $z = \lambda \in (-1, 1)$ that funnels every non-critical initial state into one pole or the other.

Right here, however, lies a classic foundational pitfall: **does nonlinear north–south bistable symmetry by itself automatically yield Born's $\cos^2\theta$ law?** The exact spherical countermodel below proves that the answer is an emphatic *no*—bistability produces binary discreteness (`Or`), whereas the capture probabilities depend decisively on the measure governing the separatrix threshold $\lambda$!

::: {.example #ex-ch34-bistable-born-countermodel title="Spherical Bistable Pointer Flow Across Three Threshold Measures: Deterministic Step, Uniform Longitudinal Born Law, and Symmetric Non-Born Countermodel"}
On the unit Bloch sphere $S^2 = \{\mathbf{n} = (x, y, z)^\top \in \mathbb{R}^3 \mid x^2 + y^2 + z^2 = 1\}$ aligned with the observer axis $\mathbf{e}_z = (0, 0, 1)^\top$, consider the smooth bistable tangential vector field (`MODEL` + `manual derivation`):

$$
\dot{\mathbf{n}} \;=\; \kappa(z - \lambda)(\mathbf{e}_z - z\mathbf{n}), \qquad \kappa > 0, \qquad \lambda \in (-1, 1).
$$

First verify spherical invariance and extract the closed longitudinal equation: on $\lVert\mathbf{n}\rVert^2 = 1$, the radial inner product vanishes identically, $\mathbf{n}\cdot\dot{\mathbf{n}} = \kappa(z - \lambda)(z - z\lVert\mathbf{n}\rVert^2) = 0$, keeping trajectories on $S^2$; reading off the third coordinate $z(t) = \mathbf{e}_z\cdot\mathbf{n}(t)$ yields the autonomous ODE

$$
\dot{z} \;=\; \kappa(z - \lambda)(1 - z^2).
$$

For $\lambda \in (-1, 1)$, this flow has two asymptotically stable polar attractors—$z = +1$ (linearized rate $\frac{d\dot{z}}{dz}\big\rvert_{z=+1} = -2\kappa(1 - \lambda) < 0$) and $z = -1$ ($\frac{d\dot{z}}{dz}\big\rvert_{z=-1} = -2\kappa(1 + \lambda) < 0$)—separated by the unstable repelling parallel $z = \lambda$ ($\frac{d\dot{z}}{dz}\big\rvert_{z=\lambda} = \kappa(1 - \lambda^2) > 0$). Starting at $z_0 = \cos(2\theta) = 2p_0 - 1 \in [-1, 1]$ ($p_0 = \cos^2\theta$), every trajectory with $z_0 > \lambda$ converges monotonically to $z(\infty) = +1$, while every trajectory with $z_0 < \lambda$ converges to $z(\infty) = -1$. Comparing three explicit distributions for $\lambda$ exposes how the North-Pole capture probability $p_+(z_0) := \mathbb{P}\bigl(z(\infty) = +1 \mid z(0) = z_0\bigr)$ behaves:

1. **Deterministic zero threshold ($\lambda \equiv 0$, no microscopic fluctuation)—collapses to a majority-vote step function**:
   Fixing the equator $z = 0$ as a rigid deterministic separatrix gives $p_+^{\det}(z_0) = 1$ for all $z_0 > 0$ ($\theta < 45^\circ$), $p_+^{\det}(z_0) = 0$ for all $z_0 < 0$ ($\theta > 45^\circ$), and an unresolved unstable equilibrium $\dot{z} = 0$ on the equator $z_0 = 0$ ($\theta = 45^\circ$). At $\theta = 30^\circ$ ($z_0 = +\frac{1}{2}$), this predicts $p_+^{\det}(+\frac{1}{2}) = 1 \neq \frac{3}{4}$; at $\theta = 60^\circ$ ($z_0 = -\frac{1}{2}$), it predicts $p_+^{\det}(-\frac{1}{2}) = 0 \neq \frac{1}{4}$. **Deterministic symmetric bistability enforces winner-take-all thresholding and destroys continuous quantum statistics.**
2. **Uniform longitudinal threshold ($\lambda \sim \mathrm{Unif}(-1, 1)$, density $f_{\mathrm{unif}}(\lambda) = \frac{1}{2}$)—reproduces Born's $\cos^2\theta$ law identically**:
   When apparatus–environment microstates induce a threshold $\lambda$ uniformly distributed across $[-1, 1]$ (noting by Archimedes' hat-box theorem that the $\mathrm{SO}(3)$-invariant Liouville area element $d\Omega = dz\,d\varphi$ on $S^2$ projects onto any longitudinal axis $z \in [-1, 1]$ with uniform marginal density $\frac{1}{2}\,dz$), the boundary $\{\lambda = z_0\}$ has Lebesgue measure zero and North-Pole capture $\{\lambda < z_0\}$ occurs with exact Born probability

   $$
   p_+^{\mathrm{unif}}(z_0) \;=\; F_\lambda(z_0) \;=\; \int_{-1}^{z_0} \frac{1}{2}\,d\lambda \;=\; \frac{1 + z_0}{2} \;=\; \frac{1 + \cos(2\theta)}{2} \;=\; \cos^2\theta \;=\; p_0.
   $$

3. **Symmetric quadratic non-Born density ($f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$ on $[-1, 1]$)—respects full north–south symmetry yet violates Born's rule**:
   Consider the smooth even density $f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$, which is properly normalized ($\int_{-1}^1 \frac{3}{2}\lambda^2\,d\lambda = \bigl[\frac{1}{2}\lambda^3\bigr]_{-1}^1 = 1$) and symmetric under $z \leftrightarrow -z$ ($f_{\mathrm{quad}}(-\lambda) = f_{\mathrm{quad}}(\lambda)$). Integrating over $[-1, z_0]$ yields the exact cubic law

   $$
   p_+^{\mathrm{quad}}(z_0) \;=\; \int_{-1}^{z_0} \frac{3}{2}\lambda^2\,d\lambda \;=\; \left[\frac{\lambda^3}{2}\right]_{-1}^{z_0} \;=\; \frac{1 + z_0^3}{2}.
   $$

   At all three symmetric landmarks $\theta = 0^\circ, 45^\circ, 90^\circ$ ($z_0 = +1, 0, -1$), $p_+^{\mathrm{quad}}$ returns $1, \frac{1}{2}, 0$—indistinguishable from Born's rule! Yet away from those symmetry points, at $\theta = 30^\circ$ ($z_0 = +\frac{1}{2},\; p_0 = \frac{3}{4}$) we obtain

   $$
   p_+^{\mathrm{quad}}\Bigl(+\frac{1}{2}\Bigr) \;=\; \frac{1 + (1/2)^3}{2} \;=\; \frac{9}{16} \;\neq\; \frac{3}{4},
   $$

   and at $\theta = 60^\circ$ ($z_0 = -\frac{1}{2},\; p_0 = \frac{1}{4}$) we obtain

   $$
   p_+^{\mathrm{quad}}\Bigl(-\frac{1}{2}\Bigr) \;=\; \frac{1 + (-1/2)^3}{2} \;=\; \frac{7}{16} \;\neq\; \frac{1}{4}.
   $$

   North–south exchange symmetry $p_+(-z_0) = 1 - p_+(z_0)$ pins only the equatorial midpoint $p_+(0) = \frac{1}{2}$; for this latitude-threshold rule, with one threshold law used for every input ray, matching Born's weight $\frac{1 + z_0}{2}$ across all $z_0 \in [-1, 1]$ holds if and only if the threshold density satisfies $f_\lambda(z) = \frac{1}{2}$ almost everywhere! The equivalence belongs to this selection rule: under the cumulative-threshold rule with three outcomes the invariant law gives frequencies $\frac{5}{9}, \frac{1}{3}, \frac{1}{9}$ at $p = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$, while a non-invariant law is Born for every input (`manual derivation`).
:::

## 34.8.3 Unbiased Bounded Martingales and Absorbing Markov Chains: Hitting Probability $\cos^2\theta$ vs. Biased Drift {#sec-ch34-20-3}

Unfolding a static one-shot threshold draw $\lambda \sim \mathrm{Unif}(-1, 1)$ into a sequential multi-step record-updating process needs a separate condition, because the threshold flow itself is not an affine, expectation-preserving flow at finite times: for a mixture of two rays at height $z$ with opposite transverse components the mean initial velocity under the uniform law is $\kappa z(1 - z^2)$, while the mixture of the poles with weights $(1 \pm z)/2$, which has the same density matrix, has mean initial velocity $0$; only its terminal law is the pinched density (`manual derivation`). The sequential process that preserves the ensemble expectation at every step obeys a different law: **the unbiased martingale law—sequential micro-updates to a branch's squared weight may fluctuate stochastically until absorption at $\{0, 1\}$, but must carry zero systematic conditional drift!**

Let $(P_n)_{n \ge 0}$ denote the sequential branch-`$0$` weight process initialized by the round-trip Born echo of [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) at $P_0 = p_0 = \cos^2\theta \in [0, 1]$ with absorbing Pure-Record endpoints $\{0, 1\}$. Whenever $P_n \to P_\infty \in \{0, 1\}$ almost surely, binary indicator expectation satisfies $\mathbb{E}[P_\infty] = \mathbb{P}(P_\infty = 1)$. Consequently, if $(P_n)$ is a **bounded martingale** ($\mathbb{E}[P_{n+1} \mid \mathcal{F}_n] = P_n$), bounded convergence and optional stopping lock the absorption probability with zero free parameters:

$$
\mathbb{P}\bigl(P_\infty = 1 \;\big\vert\; P_0 = \cos^2\theta\bigr) \;=\; \mathbb{E}\bigl[P_\infty \;\big\vert\; P_0 = \cos^2\theta\bigr] \;=\; P_0 \;=\; \cos^2\theta.
$$

Conversely, the slightest nonzero drift (turning $P_n$ into a strict submartingale or supermartingale) warps the hitting law away from $\cos^2\theta$. The five-state rational benchmark below makes both regimes completely explicit:

::: {.example #ex-ch34-martingale-selection-benchmark title="Five-State Absorbing Markov Benchmark: Unbiased Martingale Hitting Law vs. Biased Drift and Exact Five-Angle Rational Table"}
Consider an absorbing Markov chain on the five-point rational grid $\{p_j = \frac{j}{4} \mid j = 0, 1, 2, 3, 4\}$ ($N = 4$, `MODEL` + `manual derivation`): endpoints $j = 0$ ($p_0 = 0$, South-Pole record `$1$`) and $j = 4$ ($p_4 = 1$, North-Pole record `$0$`) are absorbing, while from each interior state $j \in \{1, 2, 3\}$ the chain steps north to $j + 1$ with probability $r \in (0, 1)$ and south to $j - 1$ with probability $1 - r$. These five grid states correspond one-to-one with the five benchmark ray angles $\theta \in \{0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ ($p_0 \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{4}, 0\}$).

1. **Unbiased martingale regime ($r = \frac{1}{2}$): exact Born hitting probabilities $h_j^{(1/2)} = \frac{j}{4}$ and absorption times $j(4 - j)$**:
   At $r = \frac{1}{2}$, every interior step obeys the exact martingale identity

   $$
   \mathbb{E}\bigl[P_{n+1} \;\big\vert\; P_n = p_j\bigr] \;=\; \frac{1}{2}\cdot\frac{j + 1}{4} + \frac{1}{2}\cdot\frac{j - 1}{4} \;=\; \frac{j}{4} \;=\; p_j.
   $$

   The North-Pole hitting probability $h_j^{(1/2)}$ solves $h_j^{(1/2)} = \frac{1}{2}\bigl(h_{j+1}^{(1/2)} + h_{j-1}^{(1/2)}\bigr)$ with $h_0^{(1/2)} = 0,\; h_4^{(1/2)} = 1$, giving $h_j^{(1/2)} = \frac{j}{4} = p_j = \cos^2\theta$. Meanwhile, the expected step count to absorption $\tau_j$ solves $\tau_0 = \tau_4 = 0$ and $\tau_j = 1 + \frac{1}{2}(\tau_{j+1} + \tau_{j-1})$ ($j = 1, 2, 3$); checking $\frac{1}{2}\bigl[(j+1)(3-j) + (j-1)(5-j)\bigr] + 1 = (4j - j^2 - 1) + 1 = j(4 - j)$ confirms the exact closed form

   $$
   \tau_j \;=\; j(4 - j), \qquad (\tau_0, \tau_1, \tau_2, \tau_3, \tau_4) \;=\; (0, 3, 4, 3, 0).
   $$

   Equatorial superposition ($\theta = 45^\circ,\; j = 2$) sits farthest from both poles and requires the longest decision time ($\tau_2 = 4$ steps), skewed superpositions ($\theta = 30^\circ, 60^\circ,\; j = 3, 1$) settle in $\tau_3 = \tau_1 = 3$ steps, and aligned eigenstates ($\theta = 0^\circ, 90^\circ,\; j = 4, 0$) are already absorbed in $\tau_4 = \tau_0 = 0$ steps.
2. **Biased submartingale counterexample ($r = \frac{2}{3},\; 1 - r = \frac{1}{3}$): nonzero drift breaks Born's law**:
   When stepping north is favored at $r = \frac{2}{3}$, each interior step carries positive drift $\mathbb{E}[P_{n+1} - P_n \mid P_n = p_j] = \frac{2r - 1}{4} = +\frac{1}{12} > 0$. With characteristic root ratio $\frac{1 - r}{r} = \frac{1}{2}$, solving $h_j^{(2/3)} = \frac{2}{3}h_{j+1}^{(2/3)} + \frac{1}{3}h_{j-1}^{(2/3)}$ under $h_0^{(2/3)} = 0,\; h_4^{(2/3)} = 1$ gives

   $$
   h_j^{(2/3)} \;=\; \frac{1 - \bigl(\frac{1 - r}{r}\bigr)^j}{1 - \bigl(\frac{1 - r}{r}\bigr)^4} \;=\; \frac{1 - 2^{-j}}{1 - 2^{-4}} \;=\; \frac{16\bigl(1 - 2^{-j}\bigr)}{15}.
   $$

   Evaluating all three interior states explicitly yields $h_1^{(2/3)} = \frac{16(1 - 1/2)}{15} = \frac{8}{15} \neq \frac{1}{4}$ at $\theta = 60^\circ$, $h_2^{(2/3)} = \frac{16(1 - 1/4)}{15} = \frac{12}{15} = \frac{4}{5} \neq \frac{1}{2}$ at $\theta = 45^\circ$, and $h_3^{(2/3)} = \frac{16(1 - 1/8)}{15} = \frac{14}{15} \neq \frac{3}{4}$ at $\theta = 30^\circ$.
3. **Exact five-angle rational comparison across deterministic, non-Born symmetric, unbiased martingale, and biased regimes**:

| Ray Angle $\theta$ | Bloch Angle $2\theta$ | Longitudinal $z_0 = \cos(2\theta)$ | Born Weight $p_0 = \cos^2\theta$ (Grid $j$) | Deterministic $\lambda = 0$ | Symmetric $f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$ | Unbiased Martingale $h_j^{(1/2)}$ (Steps $\tau_j$) | Biased $r = \frac{2}{3}$ Hitting $h_j^{(2/3)}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$0^\circ$** | $0^\circ$ | $+1$ | $1$ ($j = 4$) | $1$ | $1$ | $1$ ($\tau_4 = 0$) | $1$ |
| **$30^\circ$** | $60^\circ$ | $+\frac{1}{2}$ | $\frac{3}{4}$ ($j = 3$) | $1$ | $\frac{9}{16}$ | $\frac{3}{4}$ ($\tau_3 = 3$) | $\frac{14}{15}$ |
| **$45^\circ$** | $90^\circ$ | $0$ | $\frac{1}{2}$ ($j = 2$) | Saddle unresolved | $\frac{1}{2}$ | $\frac{1}{2}$ ($\tau_2 = 4$) | $\frac{4}{5}$ |
| **$60^\circ$** | $120^\circ$ | $-\frac{1}{2}$ | $\frac{1}{4}$ ($j = 1$) | $0$ | $\frac{7}{16}$ | $\frac{1}{4}$ ($\tau_1 = 3$) | $\frac{8}{15}$ |
| **$90^\circ$** | $180^\circ$ | $-1$ | $0$ ($j = 0$) | $0$ | $0$ | $0$ ($\tau_0 = 0$) | $0$ |

This rational ledger makes the selection boundary crystal-clear: under the latitude-threshold rule with one threshold law for all inputs, **longitudinal basin uniformity** (in one-shot threshold capture) is necessary and sufficient, while in sequential evidence accumulation **zero-drift martingale conservation** is equivalent to Born-calibrated conditional weights at every step but is not necessary for Born terminal frequencies alone: with $a = p(1-p)$, set $W(1) = p \pm a$ with equiprobable sign and from step two draw the record with probability $p$ independently; both unread maps from preparation are the pinching channel (completely positive, trace preserving, affine), the terminal frequency is still $p$, yet $\mathbb{E}[W(2) \mid \mathcal{F}_1] = p \neq W(1)$ (`manual derivation`). Under these conditions binary single-record stabilization preserves the round-trip Born echo $\cos^2\theta$ of [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot).
:::

## 34.8.4 Conditioned Quantum Trajectories in the Literature and Open Frontiers of Single-Outcome Realization {#sec-ch34-20-4}

In contemporary open-quantum-system and measurement-foundation research, this two-tier architecture—where unconditioned ensembles obey linear master equations while conditioned single-run trajectories evolve as bounded martingales—forms the shared mathematical spine of continuous weak-measurement theory and dynamical reduction programs:

::: {.remark #rem-ch34-conditioned-trajectory-literature title="Decoherence Boundaries, Conditioned Stochastic Master Equations, and Dynamical Collapse Models in the Literature (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Placing our spherical attractor-basin and martingale selection benchmarks alongside established physics literature highlights three distinct bodies of results and their epistemic boundaries:

1. **Environmental decoherence and the improper-mixture boundary**: M. Schlosshauer (*Rev. Mod. Phys.* **76**, 1267–1305, 2004; DOI: `10.1103/RevModPhys.76.1267`) reviews how environment-induced superselection (einselection) singles out stable pointer bases and suppresses local off-diagonal interference, while explicitly emphasizing that because the composite system–apparatus–environment state under linear Schrödinger evolution remains a global superposition, the reduced density matrix is only an **improper mixture** and decoherence alone does not solve the single-outcome problem—in strict agreement with [Appendix D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2) and [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot).
2. **Continuous quantum measurement and conditioned martingale trajectories**: K. Jacobs and D. A. Steck (*Contemp. Phys.* **47**, 279–303, 2006; DOI: `10.1080/00107510601101934`) show that under continuous Gaussian monitoring of a commuting projector family $\{\Pi_k\}$, the detector-conditioned state $\rho_c(t)$ satisfies a nonlinear stochastic master equation (SME) whose diagonal Born weights $p_k(t) = \operatorname{Tr}(\rho_c(t)\Pi_k)$ evolve, for a two-outcome measurement, via a driftless Itô diffusion $dp_k \propto p_k(1 - p_k)\,dW_t$—the continuous-time counterpart of [@ex-ch34-martingale-selection-benchmark]: the prefactor $p_k(1 - p_k)$ makes $\{0, 1\}$ absorbing endpoints, the martingale identity $\mathbb{E}[p_k(t)] = p_k(0)$ locks terminal absorption probabilities to $\cos^2\theta$, and averaging over the measurement record recovers the linear Lindblad unread master equation so no-signaling is preserved.
3. **Dynamical collapse models and nonlinear no-signaling constraints**: A. Bassi, K. Lochan, S. Satin, T. P. Singh, and H. Ulbricht (*Rev. Mod. Phys.* **85**, 471–527, 2013; DOI: `10.1103/RevModPhys.85.471`) review GRW, Continuous Spontaneous Localization (CSL), and gravity-related collapse models together with matter-wave interferometric bounds, stressing a foundational structural lesson: deterministic nonlinear Schrödinger terms without matched martingale noise (like the deterministic $\lambda = 0$ flow in [@ex-ch34-bistable-born-countermodel]) generically distort Born weights and enable superluminal signaling (Gisin's theorem), whereas pairing nonlinear drift with Brownian noise in martingale form keeps the ensemble master equation linear and signaling-free.
:::

We have thus escorted the squared echo $\cos^2\theta$ of [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) all the way into a discrete observer register: round-trip double projection supplies the unique phase-fair initial weight $P_0 = \cos^2\theta$, and longitudinally uniform attractor capture (under the latitude-threshold rule with one threshold law for all inputs; it fixes the terminal frequencies while the finite-time ensemble mean moves) or, as a separate mechanism, zero-drift martingale updating (which keeps the ensemble expectation at every step) converts that continuous weight into an exclusive single record without biasing terminal record frequencies (`manual derivation`). True to this book's epistemic standards, we state the remaining foundational questions openly:

::: {.problem #prob-ch34-single-outcome-realization title="Microscopic Realization of Single-Outcome Selection, Non-Circular Origin of Unbiased Measure, and Nested Wigner's-Friend Consistency"}
In closing the physical foundations of single-outcome record selection from squared weights, three core questions remain open across both this monograph's formalization and contemporary physics (`OPEN`):

1. **Microscopic physical mechanism of single-record selection**: Does the effective threshold variable $\lambda$ or Wiener innovation $dW_t$ in a single laboratory run arise solely from conditioning on untraced environmental/horizon degrees of freedom within globally unitary quantum mechanics, or does nature implement an irreducible stochastic collapse law beyond linear Schrödinger evolution—and where do macroscopic interferometry and optomechanical experiments place the falsification boundary between the two?
2. **Non-circular first-principles derivation of longitudinal uniformity and martingale neutrality**: Without presupposing Born's probability measure on an external bath or postulating $\mathrm{SO}(3)$-invariant continuum Liouville priors by hand, can one derive uniquely from finite discrete relational comparison graphs and self-referential consistency that effective threshold capture must be longitudinally uniform ($\mathrm{Unif}(-1, 1)$) and sequential belief updating strictly drift-free?
3. **Cross-horizon consistency across nested Wigner's-friend chains**: In extended Wigner's-friend protocols ([Appendix D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)), when an internal observer has already stabilized a single attractor-basin record while an external super-observer retains coherent unitary control over the composite laboratory-plus-register Hilbert space, how can external-reference-free relational geometry formulate a unified Lorentz-covariant consistency law?
:::

Once a single record settles into place, an embodied observer's story does not end at snapping a passive photograph. On the contrary, the entire reason a bounded living observer pays the thermodynamic price to read and latch a definite local record (`Observe / Read`) is to use that freshly acquired coordinate anchor to actively steer its own reference axis $\mathbf{I}_t \mapsto \mathbf{I}_{t+1}$ (`Act / Write`) inside the feasible corridor $\Omega_M$ permitted by its Gram window $\mathcal{W}_M$ ([§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus))! Let us step into [§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) to see how passive observation and active causal intervention interlock into a closed **perception–action–holonomy loop**.
