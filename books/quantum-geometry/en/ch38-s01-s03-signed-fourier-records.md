# 36.2.3 Signed Fourier records and address dereferencing {#sec-ch38-s01-s03-signed-fourier-records}


**Signed overlaps: from address profiles to ordered complex coefficient certificates.** The preceding Profiles discussion used four real coordinates to describe address distinguishability for $q(v)\in[0,1]$. We now retain the actual loaded labels and use three complex Fourier coordinates, extending the local overlap parameter to the closed interval $[-1/2,1]$. We study complex superpositions of these records, membership of the vacuum in their synthesis range, and an ordered kernel list given by a specified recursion. Both endpoints are essential.

We retain from [@def-ch38-profile-routers] the labels $Q=\{W,0,1\}$, the head-first addresses $A_0=\{()\}$ and $A_{n+1}=\operatorname{Bool}\times A_n$, and the internal router positions $I_0=\varnothing$ and $I_{n+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_n)$. The root is `none` and a child position is `some (b,v)`; $b=0,1$ denotes false and true, hence left and right. When used as labels, $0,1$ denote the corresponding encoded labels in $Q$.

As before, let $L_n=\operatorname{load}(n,n)$ and let $T$ project a system configuration to its tree. We use

$$
\lambda_{a,\beta}(v)
=\operatorname{routerLabel}\bigl(n,T(L_n(\operatorname{loading}(n,a,\beta,0))),v\bigr)
=\operatorname{loadedLabel}(n,a,\beta,v).
$$

These are the actual router labels after complete sequential loading, including the $W$ labels off the selected path. The correspondence between actual loading and the programmed tree is the one used above. Although these labels are independent of the external bus, we retain arbitrary $\beta\in Q$ throughout, including the waiting label $W$.

::: {.definition #def-ch38-signed-fourier-records title="Three Fourier Coordinates and Complex Coefficient Spaces" lean="D5/S3/Quantum/Routing/HannSignedCertificate.omega D5/S3/Quantum/Routing/HannSignedCertificate.labelIndex D5/S3/Quantum/Routing/HannSignedCertificate.localRecord D5/S3/Quantum/Routing/HannSignedCertificate.Environment D5/S3/Quantum/Routing/HannSignedCertificate.Coeff"}
Set $\omega=\exp(2\pi\mathrm i/3)$ and $j(W)=0$, $j(0)=1$, $j(1)=2$, with integer exponents. For $r\in[-1/2,1]$ and $s\in Q$, define

$$
f_{r,s}=\left(
\sqrt{\frac{1+2r}{3}},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{j(s)},\quad
\sqrt{\frac{1-r}{3}}\,\omega^{-j(s)}
\right)\in\mathbb C^3.
$$

The three coordinates are indexed, in order, by $\operatorname{Fin}(3)=\{0,1,2\}$. Every square root is the nonnegative real square root, embedded in $\mathbb C$; the record coordinates are generally complex. Write

$$
\mathcal F_n=I_n\to\operatorname{Fin}(3),\qquad
\mathcal C_n=A_n\to\mathbb C.
$$

These are `Environment n` and `Coeff n` for this discussion. The record space is $\mathcal F_n\to\mathbb C$. We distinguish $\mathcal F_n$ from the environment index set $\mathcal E_n$ of the preceding four-coordinate records.
:::

::: {.definition #def-ch38-signed-synthesis title="Common Subtree Restrictions, Actual Records, and Synthesis" lean="D5/S3/Quantum/Routing/HannSignedCertificate.restrict D5/S3/Quantum/Routing/HannSignedCertificate.childEnvironment D5/S3/Quantum/Routing/HannSignedCertificate.record D5/S3/Quantum/Routing/HannSignedCertificate.vacuumRecord D5/S3/Quantum/Routing/HannSignedCertificate.synthesis D5/S3/Quantum/Routing/HannSignedCertificate.embed"}
Fix one arbitrary heterogeneous real assignment $q:I_n\to\mathbb R$, with $-1/2\le q(v)\le1$ at every position. For arbitrary $a\in A_n$, $\beta\in Q$, and $e\in\mathcal F_n$, define the actual record, the all-wait vacuum record, and the complex linear synthesis map by

$$
\begin{aligned}
\widehat R_{n,q,\beta,a}(e)
&=\prod_{v\in I_n}f_{q(v),\lambda_{a,\beta}(v)}(e(v)),\\
V_{n,q}(e)&=\prod_{v\in I_n}f_{q(v),W}(e(v)),\\
(S_{n,q,\beta}x)(e)
&=\sum_{a\in A_n}x(a)\widehat R_{n,q,\beta,a}(e),
\qquad x\in\mathcal C_n.
\end{aligned}
$$

At depth $n+1$, the root parameter is $r=q(\mathrm{root})$. For $b\in\{0,1\}$, the child assignment and environment coordinates are

$$
q_b(v)=q(\operatorname{some}(b,v)),\qquad
e_b(v)=e(\operatorname{some}(b,v)).
$$

These are `restrict n q b` and `childEnvironment n e b`. Each further descent takes the same kind of restriction. Every input at every prefix therefore comes from the same $q$: distinct node parameters remain distinct, and no child assignment is chosen afresh. Tensor coordinates below follow the order root, left subtree, right subtree.

Define zero extension $J_b:\mathcal C_n\to\mathcal C_{n+1}$ by

$$
(J_bx)(c,a)=
\begin{cases}x(a),&c=b,\\0,&c\ne b.\end{cases}
$$

At depth $0$ there are no routers, and both $A_0$ and $\mathcal F_0$ have one element. Every empty product is $1$, so both the actual record and the vacuum record are the unit function, and $S_{0,q,\beta}x=x(())$.
:::

::: {.definition #def-ch38-signed-recursion title="The Prescribed Recursion for Dimension Data, an Ordered Kernel List, and a Preferred Vacuum Representative" lean="D5/S3/Quantum/Routing/HannSignedCertificate.Output D5/S3/Quantum/Routing/HannSignedCertificate.Output.flag D5/S3/Quantum/Routing/HannSignedCertificate.inherited D5/S3/Quantum/Routing/HannSignedCertificate.step D5/S3/Quantum/Routing/HannSignedCertificate.outputs"}
The recursive output $(d,K,U)$ is `outputs n q`: $d\in\mathbb N$, $K$ is an ordered list of vectors in $\mathcal C_n$, and $U\in\operatorname{Option}(\mathcal C_n)$. The Boolean flag $t$ is defined exactly as $U.\mathrm{isSome}$: when $U=\operatorname{Some}(u)$, $t=\mathrm{true}$; when $U=\operatorname{None}$, $t=\mathrm{false}$. The rules select a representative $U$; they do not assert that it is the unique preimage. This list $K$ is also distinct from the scalar kernel function used in the homogeneous case.

At the leaf, meaning depth $0$, the output is

$$
d=1,\qquad K=[],\qquad
U=\operatorname{Some}(\delta_{()}),\qquad t=\mathrm{true},
\qquad \delta_{()}(())=1.
$$

At depth $n+1$, first recurse on $q_0,q_1$ to obtain $(d_0,K_0,U_0,t_0)$ and $(d_1,K_1,U_1,t_1)$. Set

$$
H=\operatorname{map}(J_0,K_0)\mathbin{+\!+}\operatorname{map}(J_1,K_1),
$$

where $+\!+$ denotes list concatenation: keep the left list in its original order, followed by the right list in its original order. The root parameter $r=q(\mathrm{root})\in[-1/2,1]$ determines

$$
d=\begin{cases}
d_0+d_1,&r<1,\\
d_0+d_1-\mathbf 1_{t_0\land t_1},&r=1.
\end{cases}
$$

The indicator $\mathbf 1_{t_0\land t_1}$ is $1$ when both child flags are true, and $0$ otherwise. Here and in $2^n-d$ below, subtraction is truncated natural subtraction: $a-b=\max(a-b,0)$.

The complete rule for the ordered list is

$$
K=\begin{cases}
H\mathbin{+\!+}[J_0u_0-J_1u_1],
&r=1,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1),\\
H,&\text{otherwise}.
\end{cases}
$$

Thus this one difference vector is appended at the end only at the upper endpoint when both child vacuum representatives exist. There is no elimination, reordering, rescaling, or deduplication.

All branches for the representative and flag are

$$
\begin{array}{c|c|c}
\text{root parameter and child condition}&U&t\\ \hline
r=-1/2,\ U_0=\operatorname{Some}(u_0),\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(-J_0u_0-J_1u_1)&\mathrm{true}\\
r=-1/2,\ \text{at least one child representative is absent}
&\operatorname{None}&\mathrm{false}\\
-1/2<r<1&\operatorname{None}&\mathrm{false}\\
r=1,\ U_0=\operatorname{Some}(u_0)
&\operatorname{Some}(J_0u_0)&\mathrm{true}\\
r=1,\ U_0=\operatorname{None},\ U_1=\operatorname{Some}(u_1)
&\operatorname{Some}(J_1u_1)&\mathrm{true}\\
r=1,\ U_0=U_1=\operatorname{None}
&\operatorname{None}&\mathrm{false}
\end{array}
$$

Consequently, $t=t_0\land t_1$ at the lower endpoint, $t=\mathrm{false}$ in the interior, and $t=t_0\lor t_1$ at the upper endpoint. When both representatives exist at the upper endpoint, the left one still takes priority. Both minus signs at the lower endpoint are required. Each child output has $d_b>0$, so the upper-endpoint branch that actually subtracts $1$ cannot underflow.
:::

::: {.definition #def-ch38-signed-gram-orientations title="Standard and Density Orientations of the Complex Gram Matrix" lean="D5/S3/Quantum/Routing/HannSignedCertificate.recordMatrix D5/S3/Quantum/Routing/HannSignedCertificate.standardGram D5/S3/Quantum/Routing/HannSignedCertificate.densityGram"}
Fix $n,q,\beta$ and suppress these subscripts on records and maps. Matrix $M$ has environment rows and address columns: $M(e,a)=\widehat R_a(e)$, so $Mx=Sx$. Define

$$
\begin{aligned}
G^{\mathrm{std}}&=M^{\mathrm H}M,\\
G^{\mathrm{std}}(a,b)&=\sum_{e\in\mathcal F_n}\overline{\widehat R_a(e)}\,\widehat R_b(e),\\
G^{\mathrm{den}}(a,b)&=\sum_{e\in\mathcal F_n}\widehat R_a(e)\,\overline{\widehat R_b(e)}.
\end{aligned}
$$

Here $M^{\mathrm H}$ is the conjugate transpose. In general these two orientations are entrywise conjugates. Below, a product of real local overlaps proves their equality in this setting; only then do we apply the standard Gram kernel and rank identities to the density orientation.
:::

::: {.theorem #thm-ch38-signed-coefficient-event title="The Complete Signed Coefficient and Gram Certificate for Actual Loaded Records" lean="D5/S3/Quantum/Routing/HannSignedCertificate.signed_event"}
For every natural depth $n\ge0$ and every real assignment $q:I_n\to\mathbb R$, assume

$$
\forall v\in I_n,\qquad -\frac12\le q(v)\le1.
$$

For every external qutrit bus label $\beta\in Q$, take the actual records and the prescribed recursive output $(d,K,U,t)$ above. Put $m=|K|$ and $K_i=K.\mathrm{get}(i)$ for $i\in\operatorname{Fin}(m)$. The following assertions hold simultaneously.

1. The complex dimension of the synthesis range is $\dim_{\mathbb C}\operatorname{range}S=d$.
2. The ordered kernel list has length $|K|=2^n-d$, using the truncated natural subtraction specified above.
3. Vacuum membership holds in both directions: $V_{n,q}\in\operatorname{range}S\ \Longleftrightarrow\ t=\mathrm{true}$. In particular, $t=\mathrm{false}$, equivalently $U=\operatorname{None}$, means that the vacuum does not belong to the synthesis range.
4. For every $u\in\mathcal C_n$, if $U=\operatorname{Some}(u)$, then $Su=V_{n,q}$.
5. For every complex coefficient vector $x\in\mathcal C_n$,

   $$
   Sx=0\quad\Longleftrightarrow\quad
   \exists!\,\alpha:\operatorname{Fin}(m)\to\mathbb C,\qquad
   x=\sum_{i\in\operatorname{Fin}(m)}\alpha(i)K_i.
   $$

   Uniqueness concerns all complex coefficients indexed by this ordered list: any other coefficient family giving the same expansion equals $\alpha$ at every index.
6. For all $a,b\in A_n$, the standard Gram entry is determined by the actual loaded labels:

   $$
   G^{\mathrm{std}}(a,b)=
   \left(\prod_{v\in I_n}
   \begin{cases}
   1,&\lambda_{a,\beta}(v)=\lambda_{b,\beta}(v),\\
   q(v),&\lambda_{a,\beta}(v)\ne\lambda_{b,\beta}(v)
   \end{cases}\right)\in\mathbb R\subset\mathbb C.
   $$

7. The density and standard orientations agree: $G^{\mathrm{den}}=G^{\mathrm{std}}$.
8. As linear maps on the complex address coefficient space $\mathcal C_n$, $\ker(G^{\mathrm{den}}\cdot)=\ker S$.
9. The density-orientation matrix has complex rank $\operatorname{rank}_{\mathbb C}G^{\mathrm{den}}=d$.
:::

::: proof
Proceed by induction on the actual tree, always restricting the same assignment to its subtrees. The local Fourier identities follow from $\omega^3=1$ and $1+\omega+\omega^2=0$; in particular,

$$
f_{1,s}=f_{1,W},\qquad
f_{-1/2,W}=-f_{-1/2,0}-f_{-1/2,1}.
$$

At depth $n+1$, abbreviate $S_b=S_{n,q_b,\beta}$ and $V_b=V_{n,q_b}$. The actual loaded labels split the records and vacuum, in root–left–right order, as

$$
\begin{aligned}
\widehat R_{n+1,q,\beta,(0,a)}
&=f_{r,0}\otimes\widehat R_{n,q_0,\beta,a}\otimes V_1,\\
\widehat R_{n+1,q,\beta,(1,a)}
&=f_{r,1}\otimes V_0\otimes\widehat R_{n,q_1,\beta,a},\\
V_{n+1,q}&=f_{r,W}\otimes V_0\otimes V_1.
\end{aligned}
$$

These tensor identities mean pointwise products of the corresponding environment coordinate functions. For $x_b(a)=x(b,a)$, we have $x=J_0x_0+J_1x_1$, hence

$$
Sx=f_{r,0}\otimes(S_0x_0)\otimes V_1
+f_{r,1}\otimes V_0\otimes(S_1x_1).
$$

The vacuum is nonzero throughout the interval. Choose $e_*(v)=1$ when $q(v)=-1/2$ and $e_*(v)=0$ otherwise. At the lower endpoint, coordinate $1$ of the wait record is $\sqrt{1/2}>0$; elsewhere, coordinate $0$ is $\sqrt{(1+2q(v))/3}>0$. Their finite product is nonzero, and at depth $0$ it is the unit empty product. We can therefore evaluate at nonzero child vacuum coordinates and cancel those factors in subtree equations.

To treat both the kernel and the vacuum, consider arbitrary $c\in\mathbb C$ and an equation $Sx=cV_{n+1,q}$. When $r<1$, the local equation

$$
f_{r,0}A+f_{r,1}B=f_{r,W}C
$$

forces $A=B=-C$ through coordinates $1,2$. If also $r\ne-1/2$, the nonzero coordinate $0$ forces $C=0$. Apply this to the tensor decomposition and cancel factors at nonzero child vacuum coordinates to obtain

$$
S_0x_0=-cV_0,\qquad S_1x_1=-cV_1,
\qquad r\ne-1/2\ \Longrightarrow\ c=0.
$$

With $c=0$, both child vectors lie in their respective kernels, so the inherited list already spans the entire kernel. With $c=1$, a vacuum preimage is possible only at the lower endpoint, and both children must have vacuum preimages. By induction, this is equivalent to $t_0\land t_1$. The local lower-endpoint identity supplies the converse construction $-J_0u_0-J_1u_1$. In the interior $-1/2<r<1$, the case $c=1$ is impossible. Thus the conclusion here is vacuum non-membership, beyond merely failing to select a representative.

When $r=1$, all three local records coincide. Nonzero child vacua turn $Sx=cV_{n+1,q}$ into a relation with one common scalar $z\in\mathbb C$:

$$
S_0x_0=zV_0,\qquad S_1x_1=(c-z)V_1.
$$

If a child has no vacuum preimage, its scalar must be zero: otherwise scaling by the inverse of that nonzero scalar would produce a vacuum preimage. With $c=1$, the two scalars sum to $1$, so at least one child has a vacuum preimage. Conversely, zero extension of either child representative gives the parent vacuum. This proves the upper-endpoint flag $t_0\lor t_1$ and validates the prescribed preference for the left representative.

Now take $c=0$. If both representatives exist, then

$$
\begin{aligned}
x={}&J_0(x_0-zu_0)+J_1(x_1+zu_1)\\
&+z(J_0u_0-J_1u_1).
\end{aligned}
$$

The first two terms come from child kernels, and the last is precisely the appended collision vector. If at least one representative is absent, the corresponding scalar forces $z=0$, so the inherited list is complete. Each of $J_0,J_1$ is injective, and their supports are disjoint, preserving complex linear independence of the inherited list. When both representatives exist, the new difference vector is outside its span: restrict to the left address component and apply $S_0$. Every inherited vector gives zero, whereas the difference vector gives the nonzero $V_0$. The entire prescribed list is therefore both complete and complex linearly independent.

The leaf gives the unit representative and empty kernel list directly. The induction also preserves zero synthesis for every list vector, synthesis to the vacuum for the chosen representative, and the relations $d>0$ and $|K|+d=2^n$. Since $\dim_{\mathbb C}\mathcal C_n=2^n$, rank–nullity together with completeness and independence gives the range dimension, list length, and unique complex coefficient expansion. Both directions of vacuum membership and the representative equations were established in the individual branches. This proves the first five assertions.

Finally, handle the conjugation orientations. For $r$ in the entire closed interval and arbitrary $s,t\in Q$, the local records satisfy

$$
\sum_{i\in\operatorname{Fin}(3)}\overline{f_{r,s}(i)}\,f_{r,t}(i)
=\begin{cases}1,&s=t,\\r,&s\ne t.\end{cases}
$$

Expanding and interchanging the finite environment sum and node product expresses $G^{\mathrm{std}}(a,b)$ as a product of these real local overlaps, proving the sixth assertion. Hence $G^{\mathrm{den}}(a,b)=\overline{G^{\mathrm{std}}(a,b)}=G^{\mathrm{std}}(a,b)$. This uses reality of the overlap product, without assuming real record coordinates. With $G^{\mathrm{std}}=M^{\mathrm H}M$ and $M\cdot=S$, the standard Gram kernel and rank identities give the last two assertions. The full proof is checked by the Lean kernel.
:::



Depth zero is fully included: $d=1$, $K=[]$, $t=\mathrm{true}$, $S$ is the one-dimensional identity, $V=1$, and both Gram matrices are $(1)$ with rank $1$. In the fifth assertion the coefficient domain is then $\operatorname{Fin}(0)$; the unique empty coefficient family expands only to the zero vector, with empty sum zero. At any deeper prefix, successively restricting the original $q$ to that subtree gives another instance of the same statement. There is no extra positive-depth, homogeneous-parameter, or Boolean-bus assumption. The lower endpoint changes vacuum membership without appending a kernel vector; the upper endpoint appends one kernel vector and subtracts one dimension only when both child vacua can be synthesized.

The connection to Profiles passes through overlaps. On the common range $q(v)\in[0,1]$, the preceding four-coordinate real records $\sqrt{q(v)}e_*+\sqrt{1-q(v)}e_s$ also have local overlap $1$ for equal labels and $q(v)$ for distinct labels. Their actual loaded-record Gram entries therefore equal the corresponding real product here. The two constructions have different environments and coordinates. This comparison does not identify their coordinates or extend the preceding physical output conclusions directly to the signed interval.

The kernel in this theorem is throughout the kernel of synthesis on complex address coefficients. No signed-interval theorem for noisy output or post-loading continuation is supplied here, nor a kernel on a Schur operator space, a Choi rank, or a claim about computational efficiency or hardware performance. The theorem also adds no proof to the subsequent interpretation of ontology and observers. These scope boundaries remain in force as the discussion turns to `MODEL`.


::: {.theorem #thm-ch38-hann-uniform-original-section title="Uniform original-leaf sections for the actual signed Hann records" lean="D5/S3/Quantum/Routing/HannUniformSection.binary_conformal_kernel D5/S3/Quantum/Routing/HannUniformSection.zero_certificate D5/S3/Quantum/Routing/HannUniformSection.uniform_section"}
Fix a finite depth $n$, a heterogeneous router assignment $q : \operatorname{Router}(n) \to \mathbb{R}$, and a qutrit bus, with

$$
-\frac12 \le q(v) \le 1
$$

for every router node $v$. Here `Section n q bus` means exactly the set of real numbers $z$ for which there is a probability distribution on the original leaf addresses $a\in\operatorname{Address}(n)$ with $p(a)\ge0$, $\sum_a p(a)=1$, and the actual signed Hann records synthesize to a real multiple of the vacuum record:

$$
\sum_{a\in\operatorname{Address}(n)} (p(a):\mathbb C)\,\operatorname{record}(n,q,\mathrm{bus},a)
= (z:\mathbb C)\,\operatorname{vacuumRecord}(n,q).
$$

Then all of the following hold.

1. Every nonnegative nonzero original-leaf kernel vector contains a same-kernel certificate whose leaf coordinates are $0$ or $1$ and whose node coordinates are $0$, $1$, or $-1$; its nonzero leaf coordinates stay inside the original positive support, while the node coordinates preserve the original node and root signs.
2. If one such probability distribution $p$ realizes $z=0$, there is a nonempty subset $S$ of original leaves, every one of whose probabilities is strictly positive, such that
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=0.
   $$
   Thus zero may be an interior point of the section; it need not be an endpoint.
3. `Section n q bus` is either empty or a closed interval $[l,r]$, and both endpoints are attained by uniform distributions on original leaves. More precisely, for each endpoint there are a nonempty finite subset $S$ and $e\in\{-1,0,1\}$ such that
   $$
   \sum_{a\in S}\operatorname{record}(n,q,\mathrm{bus},a)=(e:\mathbb C)\,\operatorname{vacuumRecord}(n,q),
   \qquad z=\frac{e}{|S|},
   $$
   with $1\le |S|\le 2^n$; the two endpoints may use different subsets.

This is a theorem about the finite-depth real probability model of the stated signed Hann records. It does not interpret signed records as physical quantum channels, and it supplies no hardware, algorithmic-complexity, or running-time claim; nor does every feasible probability distribution become uniform. The complete proof is checked by the Lean kernel in `trureturing`.
:::
Viewed alongside [@rem-ch38-qram-page-wootters-literature], separating the dynamic pointer register from the static memory array immediately yields two structural **`MODEL` (interpretive model)** consequences:

1. **Why the Global Memory Array Is Timelessly $P = NP$ While Any Finite Pointer Must Step Sequentially via `ptr++`**:
   On the ontological memory side, the entire array $\bigl\{\lvert\Phi(x)\rangle_{\mathrm{mem}}\bigr\}_{x \in \mathbb{Z}^6}$ is already laid out simultaneously across every lattice address in an order-independent, $P = NP$-like static crystal (the name $P = NP$ is borrowed here; see §36.5; [Chapter 25](ch29-timeless-causality-and-gram-space.md) [@thm-ch29-gram-rigidity-and-pell] and [Chapter 26](ch30-fields-lines-eth-and-navier-stokes.md)). Yet every physical observer pointer inside the crystal is bounded by a finite register bit-width and a finite memory window $M < \infty$, facing the open finite-observer complexity firewall under standard computation ([@conj-p-neq-np]). Unable to ingest the entire cosmic array in a single bus cycle, the pointer must advance step by step via `ptr++` along causally compatible addresses without degenerate lockup (local Gram elliptope volume conditions are recorded in [§25.1.4](ch29-s03-timeless-gram-causality.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]). **What mortals experience as "the passage of time" is simply the scan frame rate of `ptr++` stepping across an unmoving crystal.**

::: {.viz src="pointer-ontology-deref" preset="linear64" height="500"}
**Reading the last cell means walking all 64.** The amber head reads one cell per tick along the bus, and the cells it has read light up; reaching address 63 takes 64 steps, while the routing tree above reached its leaf at step 6.
:::

2. **Why "Observation via Known Data" Manifests Locally as Decoherence**:
   In pointer architecture (`MODEL`), an observer's already-committed historical data acts as a locked high-order virtual-address **bitmask**. Executing a dereference `*ptr` couples the address register reversibly to the target memory cell via a controlled address-copy unitary $U_{\mathrm{copy}}$. Before stating the general kernel theorem, expand the explicit $4 \times 4$ block matrix ledger by hand: take two single-qubit target states $\rho = \begin{pmatrix} p & c \\ \bar{c} & 1-p \end{pmatrix}$ and $\sigma = \begin{pmatrix} p & c' \\ \bar{c}' & 1-p \end{pmatrix}$ sharing identical diagonal populations $p, 1-p$ but distinct off-diagonal coherence $c \neq c'$, paired with the blank address-record projector $E_{00} = \lvert 0\rangle\langle 0\rvert$ (where $E_{ab} := \lvert a\rangle\langle b\rvert$ for $a, b \in \{0, 1\}$). Under the controlled address-flip permutation $U_{\mathrm{copy}} = E_{00} \otimes I_2 + E_{11} \otimes \sigma_x$, the blank embedding and the address-tagged joint state read explicitly:

   $$
   B(\rho) \;=\; \begin{pmatrix} p E_{00} & c E_{00} \\ \bar{c} E_{00} & (1-p) E_{00} \end{pmatrix}, \qquad
   R_{\mathrm{addr}}(\rho) \;=\; U_{\mathrm{copy}} B(\rho) U_{\mathrm{copy}}^\dagger \;=\; \begin{pmatrix} p E_{00} & c E_{01} \\ \bar{c} E_{10} & (1-p) E_{11} \end{pmatrix}.
   $$

   Inspect the block matrix on the right: not a shred of the off-diagonal coherence amplitude $c$ has vanished—it has merely shifted from the diagonal record block $E_{00}$ onto the off-diagonal cross-block $E_{01}$! Globally, $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$ remain strictly distinct; yet the moment the local readout ignores the address-record register in its $90^\circ$ orthogonal blind zone (tracing over the second factor via $\operatorname{Tr}_{\mathrm{env}}(E_{ab}) = \delta_{ab}$), the cross-blocks $\operatorname{Tr}_{\mathrm{env}}(E_{01}) = \operatorname{Tr}_{\mathrm{env}}(E_{10}) = 0$ drop out and both local readouts collapse to the identical diagonal matrix $\operatorname{diag}(p, 1-p)$!

::: {.figure src="ch38-copy-record"}
**The dereferencing copy moves the coherence into the address record instead of destroying it.** Rows and columns are ordered (system bit, record bit) into a $4 \times 4$ grid, and the heavy lines cut it into four $2 \times 2$ blocks. In the blank embedding $B(\rho)$ on the left, all four entries sit in the top-left $E_{00}$ corner of their blocks; in $R_{\mathrm{addr}}(\rho)$, after $U_{\mathrm{copy}}$, the cyan $p$ and $1-p$ stay on the diagonal blocks while the magenta $c$ and $\bar{c}$ have moved to the $E_{01}$ and $E_{10}$ positions, still present. The partial trace over the record adds only the diagonal cells of each block, which these two are not, so the local readout is just $\operatorname{diag}(p, 1-p)$. See [@thm-ch38-copied-address-dereference-and-access-defect].
:::

`trureturing`'s decoherence and canonical-record-recovery modules lock this exact mechanism—reversible address-tag writing, reduced marginal coincidence, impossibility of local decoding, and lossless global adjoint reversal—into the formal theorem below:

::: {.theorem #thm-ch38-copied-address-dereference-and-access-defect title="Copied-Address Dereferencing, Marginal Coincidence, and Canonical Record Access Defect" lean="D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect"}
Let $\rho, \sigma \in \mathrm{QubitMatrix}$ (i.e., $M_{\operatorname{Fin} 2}(\mathbb{C})$) be any two qubit matrices with identical diagonal populations ($\forall i \in \operatorname{Fin} 2,\; \rho_{ii} = \sigma_{ii}$) and distinct off-diagonal coherence ($\exists i, j \in \operatorname{Fin} 2,\; i \neq j \land \rho_{ij} \neq \sigma_{ij}$). Write $\mathrm{JointQubitEnvironmentMatrix} = M_{\operatorname{Fin} 2 \times \operatorname{Fin} 2}(\mathbb{C})$, let $\mathrm{copyUnitary}$ denote the controlled address-copy permutation matrix, write $B(\tau) := \operatorname{blankEnvironmentJointState}(\tau)$ for the blank-record joint embedding, write $R_{\mathrm{addr}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$ for the canonical address-tagged joint state (equal to the prior controlled record state by [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)), and let $\operatorname{traceEnvironment}$ denote the partial trace over the address record. Then $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$, and all three statements below hold simultaneously:

1. **Forward Unitary Address Tagging and Global Distinctness**: Controlled address copying maps both blank-record inputs reversibly to their canonical address-tagged joint states, which remain strictly distinct globally:

   $$
   \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\rho)) = R_{\mathrm{addr}}(\rho), \quad \operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\sigma)) = R_{\mathrm{addr}}(\sigma), \quad R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma);
   $$

2. **Reduced Marginal Coincidence and Impossibility of Local Decoding**: Tracing out the address record yields identical reduced states, so no reduced-state decoder $\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}$ can recover both joint records from the local dereferenced readout alone:

   $$
   \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\rho)\bigr) = \operatorname{traceEnvironment}\bigl(R_{\mathrm{addr}}(\sigma)\bigr),
   $$

   $$
   \begin{aligned}
   &\neg\,\exists\,\mathrm{recover} : \mathrm{QubitMatrix} \to \mathrm{JointQubitEnvironmentMatrix}, \\
    &\quad \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho))\bigr) = R_{\mathrm{addr}}(\rho) \\
    &\;\land\; \mathrm{recover}\bigl(\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))\bigr) = R_{\mathrm{addr}}(\sigma);
   \end{aligned}
   $$

3. **Lossless Global Adjoint Restoration Under Retained Record Access**: Retaining coherent access to the address record restores both blank-record inputs without loss under the adjoint coupling $\operatorname{star}(\mathrm{copyUnitary})$:

   $$
   \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\rho)\bigr) = B(\rho), \qquad \operatorname{unitaryEvolution}\bigl(\operatorname{star}(\mathrm{copyUnitary}), R_{\mathrm{addr}}(\sigma)\bigr) = B(\sigma).
   $$
:::

::: proof
Membership $\mathrm{copyUnitary} \in \operatorname{Matrix.unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ and the forward evolution identities $\operatorname{unitaryEvolution}(\mathrm{copyUnitary}, B(\tau)) = R_{\mathrm{addr}}(\tau)$ follow by block matrix evaluation on $\operatorname{Fin} 2 \times \operatorname{Fin} 2$, with [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) identifying `controlledRecordJointState copiedAddressRecord` entrywise with the explicit controlled-copy joint matrix. Because $\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$, the off-diagonal address-tagged blocks of $R_{\mathrm{addr}}(\rho)$ and $R_{\mathrm{addr}}(\sigma)$ differ, proving $R_{\mathrm{addr}}(\rho) \neq R_{\mathrm{addr}}(\sigma)$. Summing over the second factor in $\operatorname{traceEnvironment}$ drops the mismatched off-diagonal address blocks and retains only $\rho_{ii} = \sigma_{ii}$, yielding $\operatorname{traceEnvironment}(R_{\mathrm{addr}}(\rho)) = \operatorname{traceEnvironment}(R_{\mathrm{addr}}(\sigma))$; any single-valued map $\mathrm{recover}$ recovering both states from equal inputs would force $R_{\mathrm{addr}}(\rho) = R_{\mathrm{addr}}(\sigma)$, a contradiction. Finally, associativity and $\mathrm{copyUnitary}^* \mathrm{copyUnitary} = 1$ restore $B(\rho)$ and $B(\sigma)$ under $\operatorname{star}(\mathrm{copyUnitary})$. The full proof is checked by the Lean kernel.
:::

[@thm-ch38-copied-address-dereference-and-access-defect] dispels, in our `MODEL`, the metaphysical fog around "mysterious wave-packet collapse" once and for all (it is a minimal two-qubit instance of decoherence and does not resolve the measurement problem of why a single outcome occurs): **dereferencing `*ptr` never destroys a single bit of coherence inside the universe's ontological memory; apparent local irreversibility arises solely because a bounded pointer reads out one masked address branch while leaving the complementary orthogonal branches outside its local register access!**

---
