# E.8.1.4 Where Curvature Comes From {#sec-appe-curvature-from-half-comparison}

Clause IV makes every three-point holonomy equal to $\mathbf{1}$, yet spherical excess and the Berry phase do exist. There is no conflict: what is flat is the full comparison, and what is curved is its square root.

::: {.remark #rem-appe-half-comparison-holonomy title="The Full Comparison Is Flat; the Three-Point Holonomy of the Half Comparison Is the Girard Excess (Manual Derivation and Literature)"}
**Manual derivation.** For a fair element $u$ whose similarity reading is a real scalar $s>-1$, $u+u^*=2s\mathbf{1}$ gives $u^2=2su-\mathbf{1}$, hence $(\mathbf{1}+u)^2=2(1+s)\,u$. Put

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}} .
$$

Then $r(u)$ is fair and $r(u)^2=u$; call it the **half comparison** of $u$. Its similarity reading satisfies $S(r)^2=\frac{1+s}{2}=1-\frac v2$.

In $\mathcal{Cl}_{3,0}$ take unit vectors $a,b,c$, no two of them antipodal, and write $r_{ab}=r(ab)$, $[a,b,c]=a\cdot(b\times c)$, $\mathbf{I}=e_1e_2e_3$. The full comparisons satisfy $ab\cdot bc\cdot ca=\mathbf{1}$, whereas

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

Derivation: $(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$, using $ab\cdot bc=ac$, $bc\cdot ca=ba$, $ab\cdot ca=a(bc)a$ and $ab\cdot bc\cdot ca=\mathbf{1}$. The scalar part is $2(1+a\cdot b+b\cdot c+c\cdot a)$. The bivector part is $b\wedge c+a(b\wedge c)a$; with $b\wedge c=\mathbf{I}n$, $n=b\times c$, one has $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$, and the two terms add up to $2[a,b,c]\,\mathbf{I}a$. The denominator is fixed by the fairness of $r$, which also gives the identity

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**Literature.** The right-hand side above has the form $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$, a rotor that fixes $a$, with $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$; when the denominator is positive this is $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$. The absolute value $\lvert\Omega\rvert$ is the area of the spherical triangle $abc$, that is, its Girard excess, and the sign of $\Omega$ is the sign of $[a,b,c]$ (van Oosterom–Strackee 1983; Eriksson 1990).

**Correspondence with frozen theorems.** The product formula and the identity for the denominator are frozen in the Pauli-matrix model; see [@thm-appe-bloch-triangle-return-phase]. The two quantities in the numerator, $1+a\cdot b+b\cdot c+c\cdot a$ and $[a,b,c]$, are the real and imaginary parts of $4\operatorname{Tr}(P_aP_bP_c)$ in [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch). Combining the identity above with $\det G(a,b,c)=[a,b,c]^2$ (the expansion of $[a,b,c]^2$ is frozen as [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)) gives

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

where the expansion of $\det G$ is [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula).
:::

On the Bloch sphere $S(r)^2=1-\frac v2$ is $\cos^2\frac\theta2$: the squared similarity of the half comparison equals $1$ minus half the sagitta. This is the Born weight written in chord–sagitta terms; it does not replace the additivity premise of `H5`. The determinant formula says that the three-point Gram volume equals the product of the three complementary sagittas times the sagitta of the excess; the value $\det G=\sin^4\epsilon$ of the "two begets three" cell in [§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) is a special case. For `H8` this means that the projective holonomy native to Layer 1 needs no new input: it is what one gets under Clause IV by taking the square root of the full comparison. What still needs new Layer-2 input is a fibre connection that varies with the spacetime base point, together with its dynamics.

The product formula does not rest on the manual derivation alone. Replace $\mathcal{Cl}_{3,0}$ by its Pauli-matrix model ($e_k\mapsto\sigma_k$, $\mathbf{I}\mapsto i\mathbf{1}$, the involution ${}^*$ becoming the conjugate transpose); the half comparison is then a concrete $2\times2$ unitary matrix, and the two statements below are verified in Lean. For $r\in\mathbb{R}^3$ write $r\cdot\sigma=r_1\sigma_x+r_2\sigma_y+r_3\sigma_z$ and $P_r=\frac12(\mathbf{1}+r\cdot\sigma)$; for $\phi\in\mathbb{C}^2$ write the normalized projection onto $r$ as

$$
N_r(\phi):=\frac{P_r\phi}{\sqrt{\operatorname{Re}\,\phi^\dagger P_r\phi}} .
$$

::: {.lemma #lem-appe-rotor-gate-normalized-projection title="The Rotor Gate Carries $a\cdot\sigma$ to $b\cdot\sigma$ and Acts on Eigenspinors as the Normalized Projection" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate"}
Let $a,b\in\mathbb{R}^3$ be unit vectors with $b\neq-a$, and put

$$
R_{a\to b}:=\frac{\mathbf{1}+(b\cdot\sigma)(a\cdot\sigma)}{\sqrt{2(1+a\cdot b)}} .
$$

Then

1. $R_{a\to b}\,R_{a\to b}^\dagger=\mathbf{1}$;
2. $R_{a\to b}\,(a\cdot\sigma)\,R_{a\to b}^\dagger=b\cdot\sigma$;
3. for every $\psi\in\mathbb{C}^2$ with $\psi^\dagger\psi=1$ and $P_a\psi=\psi$, one has $R_{a\to b}\,\psi=N_b(\psi)$.
:::

::: proof
Write $A=a\cdot\sigma$ and $B=b\cdot\sigma$, so that $A^2=B^2=\mathbf{1}$ and $AB+BA=2(a\cdot b)\mathbf{1}$. The numerator $\mathbf{1}+BA$ satisfies $(\mathbf{1}+BA)(\mathbf{1}+AB)=2(1+a\cdot b)\mathbf{1}$ and $(\mathbf{1}+BA)A(\mathbf{1}+AB)=2(1+a\cdot b)B$, which are the first two items. For the third, $A\psi=\psi$ gives $(\mathbf{1}+BA)\psi=2P_b\psi$, while $\psi^\dagger P_b\psi=\frac{1+a\cdot b}{2}>0$, so the two normalizing factors agree. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-bloch-triangle-return-phase title="Return Phase of Three Rotor Gates around a Bloch Triangle" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy"}
Let $a,b,c\in\mathbb{R}^3$ be unit vectors with $b\neq-a$, $c\neq-b$ and $a\neq-c$. Put

$$
S:=1+a\cdot b+b\cdot c+c\cdot a,\qquad D:=a\cdot(b\times c).
$$

Then

1. $S^2+D^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)$, and $S^2+D^2>0$;
2. the three rotor gates compose to

   $$
   R_{c\to a}\,R_{b\to c}\,R_{a\to b}=\frac{S\,\mathbf{1}-iD\,(a\cdot\sigma)}{\sqrt{S^2+D^2}} ;
   $$

3. for every $\psi\in\mathbb{C}^2$ with $\psi^\dagger\psi=1$ and $P_a\psi=\psi$, the successive normalized projections onto $b$, $c$ and $a$ give

   $$
   N_a\bigl(N_c(N_b(\psi))\bigr)=\frac{S-iD}{\sqrt{S^2+D^2}}\,\psi .
   $$
:::

::: proof
Item 1: write $x=a\cdot b$, $y=b\cdot c$, $z=c\cdot a$. Substituting the Gram identity $D^2=1+2xyz-x^2-y^2-z^2$ ([`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)), the sum $S^2+D^2$ expands to $2(1+x)(1+y)(1+z)$, and each factor is positive because no two of the vectors are antipodal. Item 2: the three numerators multiply to $(\mathbf{1}+AC)(\mathbf{1}+CB)(\mathbf{1}+BA)=2S\,\mathbf{1}-2iD\,A$, and by item 1 the three normalizing factors multiply to $2\sqrt{S^2+D^2}$. Item 3: the third item of [@lem-appe-rotor-gate-normalized-projection] replaces each normalized projection by the corresponding rotor gate, and its first two items guarantee that after each step the spinor is still a unit spinor lying in the eigenspace the next step requires; the last step uses $A\psi=\psi$. The full proof is checked by the Lean kernel.
:::

Compare with [@rem-appe-half-comparison-holonomy]: $R_{a\to b}$ is the image of $r_{ba}=r_{ab}^*$, so item 2 of the theorem is the involution of the product in the remark, $(r_{ab}\,r_{bc}\,r_{ca})^*=r_{ac}\,r_{cb}\,r_{ba}$, and the sign in front of $D$ changes from plus to minus accordingly; item 1 is the identity at the end of the remark. Item 3 is the operational reading of item 2: start from an eigenspinor of $a$, apply the three normalized projections along $a\to b\to c\to a$, and the spinor returns multiplied by the unit-modulus factor $(S-iD)/\sqrt{S^2+D^2}$. What Lean does not state keeps its earlier status. Identifying the argument $\operatorname{atan2}(D,S)$ with half the Girard excess is a literature result. The exponential form of the rotor is not formalized, and neither is any minimality or uniqueness in the sense of "shortest": in the Lean module `rotor` and `shortestGate` are names only. In Lean $N_r(\phi)$ is defined for every $\phi$ (when the denominator vanishes, Lean's convention returns the zero vector); the theorem uses it only where each denominator $\sqrt{(1+u\cdot v)/2}$ is positive.

Items 1 and 2 of [@rem-appe-real-realizability-return-phase] are frozen in the pinned repository in the case where one object is non-orthogonal to every other one, in the following form; no filling condition is needed there. The general filled case and the qubit statement of item 4 remain manual derivations.

::: {.proposition #prop-appe-real-rephasing-star title="A Hermitian Matrix with a Row without Zeros: Rephasable to a Real Matrix If and Only If All Three-Point Products Are Real" lean="D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_rephasing_iff_triple_products_real D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_gram_rephasing_iff_triple_products_real"}
Let $G$ be an $N\times N$ complex matrix and $i_0$ an index such that $G_{i_0j}\neq0$ for every $j$.

1. If $G$ is Hermitian, then there are real numbers $\theta_1,\dots,\theta_N$ such that every $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real if and only if $G_{ij}G_{jk}G_{ki}$ is real for all indices $i,j,k$ (repetitions allowed).
2. If $G$ is positive semidefinite, then there are real numbers $\theta_1,\dots,\theta_N$ and a real $N\times N$ matrix $B$ with $e^{i\theta_i}G_{ij}e^{-i\theta_j}=\left(B^{\mathsf T}B\right)_{ij}$ for all $i,j$ if and only if $G_{ij}G_{jk}G_{ki}$ is real for all indices $i,j,k$.
:::

::: proof
"Only if": the phases cancel around $i\to j\to k\to i$, so rephasing does not change $G_{ij}G_{jk}G_{ki}$, and computed in a real matrix it is real. "If": take $\theta_j=\arg G_{i_0j}$. Since $G$ is Hermitian, $G_{ji_0}=\overline{G_{i_0j}}$, hence

$$
e^{i\theta_i}G_{ij}e^{-i\theta_j}=\frac{G_{i_0i}\,G_{ij}\,G_{ji_0}}{\lvert G_{i_0i}\rvert\,\lvert G_{i_0j}\rvert},
$$

a positive multiple of the three-point product $G_{i_0i}G_{ij}G_{ji_0}$, and therefore real; an entry $G_{ij}=0$ stays zero. Item 2: rephasing is $G\mapsto DGD^{*}$ with $D$ a diagonal unitary, which preserves positive semidefiniteness; the rephased matrix has real entries, so it is a real symmetric positive semidefinite matrix and can be written $B^{\mathsf T}B$.

For a Hermitian matrix, three-point products with a repeated index (such as $G_{ij}G_{ji}G_{ii}=\lvert G_{ij}\rvert^2G_{ii}$) and those containing a zero entry are automatically real, so the condition has content only on the triangles of the non-orthogonality graph, in agreement with item 2 of [@rem-appe-real-realizability-return-phase]. The full proof is checked by the Lean kernel.
:::

The imaginary part of the return phase appears only when $D\neq0$. Pairwise comparisons can tell whether $D$ vanishes but not its sign: $D^2=1+2xyz-x^2-y^2-z^2$ (with $x=a\cdot b$, $y=b\cdot c$, $z=c\cdot a$; this is [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)) gives only its square. Whether $D$ vanishes answers a question adjacent to `H7`: whether a family of objects needs complex amplitudes.

::: {.remark #rem-appe-real-realizability-return-phase title="When a Family of Objects Can Be Described with Real Numbers Alone: Whether the Three-Point Bargmann Products Are Real (Manual Derivation and Literature)"}
**Manual derivation.** Let $\psi_1,\dots,\psi_N\in\mathbb{C}^d$ be unit vectors and $G_{ij}=\langle\psi_i,\psi_j\rangle$. Join the pairs with $G_{ij}\neq0$ by an edge and call the resulting graph $\Gamma$ the **non-orthogonality graph**. Call the family **realizable over the reals** if there are real numbers $\theta_1,\dots,\theta_N$ such that every $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real. That real matrix is then the Gram matrix of the vectors $e^{-i\theta_i}\psi_i$; it is real symmetric and positive semidefinite of rank $r=\operatorname{rank}G\le d$, so it can be written $V^{\mathsf T}V$ with the columns of $V$ real vectors $v_i\in\mathbb{R}^r\subseteq\mathbb{C}^d$. The two families have the same Gram matrix, so by the frozen theorem [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) there is a $d\times d$ unitary $U$ with $e^{-i\theta_i}\psi_i=Uv_i$. So realizability over the reals means: after phases are applied, the vectors lie in the unitary image of a real subspace, with the Gram matrix unchanged up to those phases. For a closed walk $i_0,i_1,\dots,i_k=i_0$ in $\Gamma$, call $G_{i_0i_1}G_{i_1i_2}\cdots G_{i_{k-1}i_0}$ its **Bargmann product**; it is invariant under $\psi_i\mapsto e^{-i\theta_i}\psi_i$.

1. If the family is realizable over the reals, every Bargmann product is real, in particular every three-point product $G_{ij}G_{jk}G_{ki}$.
2. Conversely, if $\Gamma$ is filled by triangles ([@rem-appe-triangle-simple-connectivity]; for instance when no two objects are orthogonal, or when $\Gamma$ is chordal) and the three-point product on every triangle of $\Gamma$ is real, then the family is realizable over the reals.
3. The filling condition cannot be dropped. In $\mathbb{C}^3$ take $\psi_1=e_1$, $\psi_2=\frac{1}{\sqrt3}(e_1+e_2+e_3)$, $\psi_3=e_2$, $\psi_4=\frac12\bigl(e_1+ie_2-(1+i)e_3\bigr)$. Then $\psi_1\perp\psi_3$ and $\psi_2\perp\psi_4$, the other inner products are nonzero, and $\Gamma$ is a four-cycle without triangles: the requirement of item 2 that triangles be real holds vacuously, while "filled by triangles" fails. The Bargmann product of the four-cycle is $G_{12}G_{23}G_{34}G_{41}=\frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\cdot\frac i2\cdot\frac12=\frac{i}{12}$, which is not real, so by item 1 the family is not realizable over the reals.
4. Qubits: let $a$ be the Bloch vector of $\psi_a$. The family is realizable over the reals if and only if all Bloch vectors lie in one plane through the center, if and only if the oriented volume $D=a\cdot(b\times c)$ of every three of them vanishes; no filling condition is needed here: for instance $a,b,-a,-b$ have a four-cycle as non-orthogonality graph and are still realizable. For pairwise non-antipodal $a,b,c$, the return phase $(S-iD)/\sqrt{S^2+D^2}$ of [@thm-appe-bloch-triangle-return-phase] is non-real if and only if $D\neq0$.
5. The pairwise similarity readings $a\cdot b$, $b\cdot c$, $c\cdot a$ give only $D^2$. Complex conjugation $\psi\mapsto\bar\psi$ maps the Bloch vector $(r_x,r_y,r_z)$ to $(r_x,-r_y,r_z)$: the pairwise readings are unchanged, $D$ changes sign, and the return phase is conjugated.

Derivation: item 1, the Bargmann product is invariant, and computed in the real matrix $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ it is real. Item 2: on the edges of $\Gamma$ put $g(i,j)=\left(G_{ij}/\lvert G_{ij}\rvert\right)^2$; it is defined only on edges, where $G_{ij}\neq0$, and takes values in the circle group. $G_{ji}=\overline{G_{ij}}$ gives $g(j,i)=g(i,j)^{-1}$. On a triangle $ijk$, with $B_{ijk}=G_{ij}G_{jk}G_{ki}\neq0$, one has $g(i,j)\,g(j,k)\,g(i,k)^{-1}=g(i,j)\,g(j,k)\,g(k,i)=\left(B_{ijk}/\lvert B_{ijk}\rvert\right)^2$, which equals $1$ exactly when $B_{ijk}$ is real (of either sign). So reality of the three-point products is exactly the chain rule $g(i,j)\,g(j,k)=g(i,k)$ for $g$ on triangles. By item 1 of [@rem-appe-triangle-simple-connectivity] (by [@thm-appe-chordal-gain-potential] with the circle group when $\Gamma$ is chordal) there are $\varphi_i$ in the circle group with $g(i,j)=\varphi_i^{-1}\varphi_j$. Choose $\theta_i$ with $e^{2i\theta_i}=\varphi_i$; then $\left(e^{i\theta_i}G_{ij}e^{-i\theta_j}/\lvert G_{ij}\rvert\right)^2=\varphi_i\,g(i,j)\,\varphi_j^{-1}=1$, so $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ is real; on non-adjacent pairs $G_{ij}=0$ is real already. Item 3 is a direct computation. Item 4: for the rank-one projections $P_a=\lvert\psi_a\rangle\langle\psi_a\rvert=\frac12(\mathbf{1}+a\cdot\sigma)$ one has $G_{ab}G_{bc}G_{ca}=\operatorname{Tr}(P_aP_bP_c)$, and the frozen theorem [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) gives $\operatorname{Tr}(P_aP_bP_c)=\frac14(S+iD)$, so the three-point product is real exactly when $D=0$. If all Bloch vectors lie in one plane through the center, a rotation takes that plane to the $xz$ plane, and the rotation is implemented by a unitary matrix (the map from $\mathrm{SU}(2)$ to $\mathrm{SO}(3)$ is onto, `Literature`); the eigenspinor of a unit vector $(\sin\alpha,0,\cos\alpha)$ in the $xz$ plane is $\left(\cos\frac\alpha2,\sin\frac\alpha2\right)$, a real vector, so the family is realizable over the reals. Conversely, realizability gives real vectors $v_i$ in $\mathbb{R}^r\subseteq\mathbb{C}^2$ ($r\le2$) and a unitary $U$; the Bloch vectors of real vectors lie in the $xz$ plane, and $U$ turns that plane into another plane through the center. The Bloch vectors lie in one plane through the center exactly when they span at most two dimensions, that is, exactly when every three of them have zero oriented volume. The last sentence is items 1 and 2 of [@thm-appe-bloch-triangle-return-phase]: for pairwise non-antipodal vectors $S^2+D^2>0$. The formula for $D^2$ in item 5 is the one above; the action of complex conjugation is a direct computation ($\bar\sigma_y=-\sigma_y$).

**Literature result.** The direction of item 1 (a non-real Bargmann product shows that the family cannot all be written as real vectors) is the imaginarity witness of Fernandes, Wagner, Novo and Galvão (2024). They also point out that pairwise overlap measurements suffice to witness imaginarity of sets of four states but not of sets of three. This does not contradict items 4 and 5: the pairwise overlap moduli of three unit vectors can always be realized by real vectors in $\mathbb{R}^3$ (replacing the three off-diagonal entries of the Gram matrix by their moduli does not decrease the determinant), whereas item 4 uses the dimension of a qubit, and realizability here keeps the Gram matrix up to phases. The argument for item 2 has the same form as the balance criterion for gain graphs: a gain graph is balanced if and only if its gains can be switched to the identity (Zaslavsky 1989).
:::

The "central complex structure" listed under `H7` in the ledger is an input about tomography of composite systems. This remark answers an adjacent and narrower question: whether a given family of objects needs complex amplitudes, in the sense of keeping its Gram matrix up to phases. As long as comparable triangles fill every cycle, the answer is decided by the three-point Bargmann products, which are readings of products of comparison values; the moduli of pairwise overlaps are in general not enough. On a qubit the pairwise similarity readings are already enough through $D^2$: the family is realizable exactly when no three objects enclose a nonzero oriented volume; what pairwise readings cannot see is only the sign of $D$, the chirality that complex conjugation exchanges. None of this derives the complex structure. A model built from real vectors satisfies every clause (see the count in E.8.2.3), so "complex numbers are needed" remains an input; what changes is its form. The four-cycle of item 3 is the same graph as the four-cycle in [@rem-appe-triangle-simple-connectivity]: in general dimension this graph keeps triangle compatibility from giving a potential and keeps three-point readings from settling realizability; the qubit family $a,b,-a,-b$ shows that with restricted dimension the same graph need not prevent a decision.
