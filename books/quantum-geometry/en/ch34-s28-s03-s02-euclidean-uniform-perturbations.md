# M.2.10 Short intervals under independent uniform perturbations {#short-intervals-under-independent-uniform-perturbations}

For a pair of degree vectors, the difference of their perturbed frequencies is an affine sum of coordinate offsets. A bound on its short-interval probability can use the Euclidean norm of the coefficients scaled by their perturbation radii.

::: {.theorem #thm-ch31-uniform-perturbation-euclidean title="Euclidean-scale bound for an affine band" lean="D5/S3/Fourier/Concentration/UniformPerturbationEuclidean.intervalNoise_pi_affine_le_euclidean"}
Let $x_j$ be independent and uniform on $[-r_j,r_j]$ on a finite index set, with $r_j>0$. Let $a_j$ and $b$ be real, put $c_j=a_jr_j$ and $S=\sum_j c_j^2>0$. For $\eta\ge0$,

$$
\Pr\bigl(\bigl|b+\textstyle\sum_j a_jx_j\bigr|\le\eta\bigr)
\le \min\!\left(1, e^{1/2}\sqrt{15\pi/2}\,\frac{\eta}{\sqrt S}\right).
$$
:::

::: proof
For the law of $\sum_j a_jx_j$, the characteristic function factors into $\operatorname{sinc}(c_jt)$. If $\sum_j c_j^4\le S^2/2$, the product bound gives the envelope $(1+St^2/15)^{-1}$. Apply the Gaussian window estimate at center $-b$ to get the stated constant at positive resolution.

If the fourth-power sum exceeds $S^2/2$, some $c_i^2>S/2$. With the other coordinates fixed, the length fraction admitted at $i$ is at most $\eta/|c_i|\le \sqrt2\eta/\sqrt S$. At zero resolution any nonzero coefficient gives a section of length zero. The full proof is checked by the Lean kernel.
:::

In a weighted collision test, use $a_j=m_j-n_j$ for distinct degree vectors. The estimate concerns the same coordinate offsets on each test's finite support. To impose a family of collision budgets, one still needs the corresponding weighted expectation summed over pairs and a common selection. The sharper constant $\sqrt 2$ for the normalized probability bound follows from the density theorem in the literature. Fixed ζ ordinates require a separate arithmetic bound. [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)
