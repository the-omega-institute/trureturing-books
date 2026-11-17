# Chapter 24 Cosine Fixed Points and Self-Reference: From $\cos\theta = \theta$ to $\psi = \psi(\psi)$

> *"If cos(theta) = theta, where did cos come from? Is cos equal to theta?"*
>
> *"This is the psi = psi(psi) we investigated from the very beginning."*

After a twenty-three-chapter ascent, we stand at the culmination of Part VI (*Crossing the Horizon — Spheres Beyond Spheres*) and at the philosophical summit of the entire book.

Draw straight the single geometric thread that has guided us since page one:

- In [Chapter 1](ch01-measurement.md) and [Chapter 2](ch02-born-rule.md), we eliminated the external "third point $C$" and showed that when a known reference state $\vv{a}$ measures (*liáng*) a target state $\vv{b}$, the relative angle $\theta$ spanned between them projects directly onto the compatibility reading $\cos\theta$;
- In [Chapter 21](ch21-diagonalization-and-escape.md), we proved that whenever the "language that measures" (a surjective `decoderCatalog` over a nonempty address space) is separated from the "coordinate that is measured" (`latent`) and paired with a fixed-point-free `twist`, the relative semantic diagonal splits the latent topology and forces a strict observation-topology refinement (with each further stage conditional on supplying a new surjective catalog over an enlarged address space).

How, then, can that infinite regress of spheres beyond spheres ever come to rest in a self-contained **self-referential fixed point**?

The epigraph suggests a particular feedback choice: **use the dimensionless compatibility reading $\cos\theta_k$ from one comparison as the numerical angle in radians for the next**, so that $\theta_{k+1} = \cos\theta_k$. This is the update rule adopted here; pairwise comparison or dispensing with an external ruler does not force it. A different feedback function or angular scale gives a different iteration. For this radian-based rule, a fixed point satisfies

$$
\cos\theta^* = \theta^* \qquad (\theta^* \approx 0.7390851332\dots),
$$

ask once more: **in this equation, where did the operator $\cos$ on the left come from? Is there really a bare number $\theta^*$ standing apart from the operation $\cos$?**

Within the book's geometric ontology of orthogonal comparison, the author reads $\cos(\cdot)$ as the act of projection measurement and $\theta^*$ as the self-consistent equilibrium of this feedback. Mathematically, $\cos : \mathbb{R}\to\mathbb{R}$ is a function and $\theta^*\in\mathbb{R}$ is a scalar: $\cos\theta^*=\theta^*$ equates the output at that input with the input, without identifying the function with a number. The author's interpretation of ruler and reading, and of the dissolution of subject and object, is condensed into the title-page aphorism:

$$
\psi = \psi(\psi).
$$

In this chapter we unfold this self-referential closure across four mathematical levels: **the Lean-verified stabilization theorem for contracting updates on finite sets**, **single-step context-relative interpretation fixed points and contextual non-uniqueness**, **the unique positive algebraic fixed point $\varphi = \frac{1+\sqrt{5}}{2}$ of the golden reciprocal map $x = 1 + 1/x$**, and **the classical analytic and number-theoretic background of cosine self-reference $\cos\theta^* = \theta^*$** recorded in the literature remarks [@rem-banach-dottie-hairy-ball-literature] and [@rem-dottie-angle-incommensurable].

::: {.figure src="ch24-overview"}
**Figure 24.** The chapter at a glance. Panel I: the cyan curve $y = 1 + 1/x$ and the grey diagonal $y = x$ cross only once for $x > 0$, at the green $\varphi \approx 1.618$ ([@cor-golden-fixed-point-unique]). Panel II: the cyan cosine curve and the grey diagonal $y = x$, with the cobweb from $0$ winding into $\theta^* \approx 0.739$, where a short magenta tangent has slope $-\sin\theta^*$ (convergence and rate apply existing results; the full derivation is in [@ex-ch33-mutual-cosine-monotonic-lock]). Panel III: the $3 \times 3$ listing of the example in §24.7, whose diagonal twisted by $f_1$, $(1, 2, 2)$, is exactly the cyan row $1$; the value $2$ at the landing spot (green ring) is the fixed point of $f_1$ ([@lem-diagonal-landing-fixed]).
:::

Panels I, II and III of Figure 24 follow §24.3, §24.4–§24.5 and §24.7 in turn: $1 + 1/x$ meets the diagonal only at $\varphi$, the cosine cobweb winds into $\theta^*$, and when the twisted diagonal lands back on the list, the landing cell holds a fixed point of the twist.

- [24.1 Discrete Contraction Must Stabilize: The Finite Contracting Update Theorem](ch24-s01-finite-contraction.md)
- [24.2 Context-Relative Interpretation Fixed Points and Contextual Non-Uniqueness](ch24-s02-contextual-fixed-points.md)
- [24.3 The Unique Algebraic Golden Lock: $x = 1 + 1/x$ and $\varphi = \frac{1+\sqrt{5}}{2}$](ch24-s03-golden-self-reference.md)
- [24.4 From $\cos\theta^* = \theta^*$ to $\psi = \psi(\psi)$: Classical Analysis, Remainder Seams, and the Spherical Fixed/Antipodal Alternative](ch24-s04-cosine-and-spherical-fixed-points.md)
- [24.5 Carrying the Loop Through: True Convergence Rate, Derivative Speed-Up, and the Width of the Rational Seam](ch24-s05-convergence-and-acceleration.md)
- [24.6 "Is $\pi$ a Projection of $\theta$?": Two Mutually Inverse Series, Kepler's Equation, and Half-Time Free Fall](ch24-s06-inverse-series-and-kepler.md)
- [24.7 Where the Chase Stops: A Diagonal Landing Is a Fixed Point, and Existence Without Contraction](ch24-s07-diagonal-landing-and-existence.md)
