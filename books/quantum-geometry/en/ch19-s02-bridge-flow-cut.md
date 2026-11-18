# 19.2 Rank and cut capacity in a width-three bridge graph {#sec-bridge-flow-cut}

Now count the three cut-capacity bounds used by the source to limit the rank of $\operatorname{flow}(M, N) = \sum_{r=0}^2 M_r \otimes N_r$:

1. **Left outer cut (row-space bound)**: $\operatorname{flow}(M, N)$ has $|\operatorname{Fin} a \times \operatorname{Fin} d| = ad$ rows, so its rank cannot exceed $ad$;
2. **Right outer cut (column-space bound)**: $\operatorname{flow}(M, N)$ has $|\operatorname{Fin} b \times \operatorname{Fin} c| = bc$ columns, so its rank cannot exceed $bc$;
3. **Internal width-three bridge cut**: For each $r \in \operatorname{Fin} 3$, $\operatorname{rank}(M_r) \le a$ and $\operatorname{rank}(N_r) \le c$, so $\operatorname{rank}(M_r \otimes N_r) \le ac$; summing over the three bridge channels $r = 0, 1, 2$ bounds the rank of the sum by $3ac$.

Taking the minimum of these three cut-capacity bounds used by the source defines its **discrete quantum min-cut** `QMinCut`:

$$
\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr) \in \mathbb{N}.
$$

For general dimensions, the graph has a fourth cut of capacity $3bd$; when $a \le b$ and $c \le d$, $3bd \ge 3ac$, so this term is redundant.

::: {.figure src="ch19-three-cuts"}
**The figure shows the three cut-capacity bounds used by the source; QMinCut is their minimum.** For $(a, b, c, d) = (2, 3, 2, 3)$: the upper dashed line crosses legs $a$ and $d$, capacity $ad = 6$; the lower one crosses legs $b$ and $c$, capacity $bc = 6$; the slanting grey line crosses leg $a$, the three bridges and leg $c$, capacity $3ac = 12$. The two magenta outer cuts tie for smallest, so $\operatorname{QMinCut} = 6$.
:::

Our next proposition shows that for all natural numbers $a, b, c, d \in \mathbb{N}$, with no cone assumptions needed, the quantum max-flow never exceeds the quantum min-cut.

::: {.proposition #prop-bridge-flow-cut-bound title="Flow is bounded by cut capacity" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut"}
For all natural numbers $a, b, c, d \in \mathbb{N}$,

$$
\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr).
$$

:::

::: proof
Choose $(M, N)$ attaining $\operatorname{QMaxFlow}(a, b, c, d)$ by [@lemma-bridge-flow-attained]. Because $\operatorname{flow}(M, N)$ has $ad$ rows and $bc$ columns, its rank never exceeds its row count $ad$ or its column count $bc$, so $\operatorname{rank}(\operatorname{flow}(M, N)) \le \min(ad, bc)$ (`flow_rank_le_outer`). Moreover, the source explicitly factors the bridge contraction as the matrix product $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N) \cdot \operatorname{cutRight}(M)$ (`flow_factor`) through the intermediate index type $\operatorname{Fin} 3 \times (\operatorname{Fin} a \times \operatorname{Fin} c)$ of cardinality $3ac$, so the rank-of-product inequality bounds its rank by $3ac$ (`flow_rank_le_inner`). Combining both bounds gives $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$. The full proof is checked by the Lean kernel.
:::

Here $\operatorname{QMinCut}(a, b, c, d)$ is strictly a **finite-dimensional matrix-rank upper bound**, not a continuum differential-geometric surface area. Let us work through an explicit hand calculation at $a = c = 2$, $b = d = 3$ to see how three Kronecker summands of rank at most $ac = 4$ (with individual ranks $4, 1, 1$) cooperate to saturate a rank-six outer cut.

::: {.example #ex-bridge-two-three title="Explicit Construction of a Rank-Six Bridge Flow at a = c = 2, b = d = 3"}
Set $a = c = 2$ and $b = d = 3$. First verify the quadratic cone inequalities:

$$
a^2 + b^2 = c^2 + d^2 = 2^2 + 3^2 = 13 \le 3 \cdot 2 \cdot 3 = 18.
$$

The three cut capacities are $3ac = 12$, $ad = 6$, and $bc = 6$, so $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, 6, 6) = 6$. Although any single Kronecker product $M_r \otimes N_r$ has rank at most $ac = 4 < 6$, summing three channels ($r = 0, 1, 2$) produces a full-rank $6\times 6$ permutation matrix. Choose the explicit matrices

$$
\begin{aligned}
M_0 &= \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}, \qquad
&N_0 &= \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}, \\
M_1 &= \begin{pmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}, \qquad
&N_1 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 0 \end{pmatrix}, \\
M_2 &= \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \qquad
&N_2 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 0 & 1 \end{pmatrix}.
\end{aligned}
$$

Inspect the sum $\operatorname{flow}(M, N) = M_0 \otimes N_0 + M_1 \otimes N_1 + M_2 \otimes N_2$:

- $M_0 \otimes N_0$ maps the four basis pairs in $\{0, 1\} \times \{0, 1\}$ bijectively onto rows $\{0, 1\} \times \{0, 1\}$, contributing rank $4$;
- $M_1 \otimes N_1$ places a single $1$ at column $(2, 0)$ and row $(0, 2)$, supplying the fifth independent basis direction;
- $M_2 \otimes N_2$ places a single $1$ at column $(2, 1)$ and row $(1, 2)$, supplying the sixth independent basis direction.

Tabulating the six basis pairs of $\operatorname{Fin} 3 \times \operatorname{Fin} 2$ against $\operatorname{Fin} 2 \times \operatorname{Fin} 3$ shows explicitly how the three bridge channels partition the six unit entries without overlap:

| Bridge Channel $r \in \operatorname{Fin} 3$ | Input Column $(j, l) \in \operatorname{Fin} 3 \times \operatorname{Fin} 2$ | Output Row $(i, k) \in \operatorname{Fin} 2 \times \operatorname{Fin} 3$ | Nonzero Entry $(M_r)_{i,j}(N_r)_{k,l}$ |
| :---: | :---: | :---: | :---: |
| $r = 0$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(M_0)_{i,i}(N_0)_{k,k} = 1 \cdot 1 = 1$ |
| $r = 1$ | $(2, 0)$ | $(0, 2)$ | $(M_1)_{0,2}(N_1)_{2,0} = 1 \cdot 1 = 1$ |
| $r = 2$ | $(2, 1)$ | $(1, 2)$ | $(M_2)_{1,2}(N_2)_{2,1} = 1 \cdot 1 = 1$ |

Together, $\operatorname{flow}(M, N)$ is a $6\times 6$ permutation matrix of rank $6 = \operatorname{QMinCut}(2, 3, 2, 3)$, confirming $\operatorname{QMaxFlow}(2, 3, 2, 3) = 6$ via [@prop-bridge-flow-cut-bound].
:::

::: {.figure src="ch19-permutation"}
**Together the three bridges tile a $6 \times 6$ permutation matrix exactly.** The cyan cells are the non-zero entries of $\operatorname{flow}(M, N)$, and the number in each is the bridge $r$ that puts it there: bridge $0$ fills the $4$ cells at the top left, bridges $1$ and $2$ add one cell each; the six cells share no row and no column, so the rank is $6$ ([@ex-bridge-two-three]).
:::

The six-dimensional permutation matrix above satisfies a more precise identity than full rank: its columns are distinct standard basis vectors, so $F^*F=I_6$. Writing the input and output dimensions of the right factors as $c=2q$ and $d=3q$ extends the same construction to every admissible pair of left dimensions. The task is to give each input coordinate a unique output coordinate, with no collisions between different inputs.

::: {.theorem #thm-bridge-native-saturation-iff title="Exact column Gram saturation for a native three-term tensor sum" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeSaturation.native_saturation_iff"}
For all natural numbers $a,b,q\in\mathbb N$ with $q>0$, there exist complex matrix families

$$
\begin{aligned}
M_r&\in M_{a\times b}(\mathbb C),\\
N_r&\in M_{3q\times2q}(\mathbb C)
\qquad(r=0,1,2),
\end{aligned}
$$

whose tensor sum satisfies

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=I_{2bq},
\end{aligned}
$$

if and only if $2b\le3a$. Here $F^*$ is the conjugate transpose, the rows of $F$ are indexed by $\operatorname{Fin}a\times\operatorname{Fin}(3q)$, its columns by $\operatorname{Fin}b\times\operatorname{Fin}(2q)$, and $I_{2bq}$ is the identity matrix on this column index set.
:::

::: {.proof #pf-bridge-native-saturation-iff}
First prove necessity. If $F^*F=I_{2bq}$, the rank bound for a product and the number of rows of $F$ give

$$
\begin{aligned}
2bq&=\operatorname{rank}(F^*F)\\
&\le\operatorname{rank}F\le3aq.
\end{aligned}
$$

Since $q>0$, cancelling $q$ yields $2b\le3a$.

Conversely, suppose $2b\le3a$. Use zero-based indices throughout, with ranges

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le\ell<3q,&\qquad0\le k<2q.
\end{aligned}
$$

Let $\mathbf1_{\{P\}}$ be $1$ when $P$ holds and $0$ otherwise. Choose the three left slices

$$
\begin{aligned}
(M_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(M_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(M_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}},
\end{aligned}
$$

and the three right slices

$$
\begin{aligned}
(N_0)_{\ell k}&=\mathbf1_{\{\ell=k\}},\\
(N_1)_{\ell k}&=\mathbf1_{\{k<q,\ \ell=2q+k\}},\\
(N_2)_{\ell k}&=\mathbf1_{\{q\le k,\ \ell=q+k\}}.
\end{aligned}
$$

The last two left slices vanish when $j<a$; the difference $j-a$ matters only when $j\ge a$, where it is an ordinary nonnegative integer difference.

To see how the slices move a column, define the output route for an input index $(j,k)$ by

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

Every output lies in the required range. In the first branch, $j<a$ and $k<2q<3q$. In the other two branches put $t=j-a$. Since $j+1\le b$ and $2b\le3a$,

$$
2(t+1)\le2(b-a)\le a.
$$

Thus both $2t$ and $2t+1$ are less than $a$, while the second output coordinate lies in $[2q,3q)$. When $b\le a$, every input takes the first branch.

Write the input standard basis as $E_{j,k}=e_j\otimes e_k$ and the output standard basis as $U_{i,\ell}=e_i\otimes e_\ell$. When $j<a$, only term $0$ acts. When $j\ge a$, term $0$ vanishes, and terms $1$ and $2$ divide the inputs according to $k<q$ or $k\ge q$. Hence every column has exactly one nonzero entry, equal to $1$:

$$
F E_{j,k}=U_{\rho(j,k)}.
$$

We must also check that different columns never reach the same row. The first branch has second output coordinate below $2q$, disjoint from the other two branches. The latter have even and odd first output coordinates, respectively, so they too are disjoint. Within each branch the output uniquely recovers $j,k$: read both directly in the first branch; in the second recover $t$ from $i=2t$ and set $k=\ell-2q$; in the third recover $t$ from $i=2t+1$ and set $k=\ell-q$. In the last two branches set $j=a+t$. Thus $\rho$ is injective.

This determines the entire column Gram matrix, including every off-diagonal entry. Abbreviate the input indices as $x=(j,k)$ and $y=(j',k')$, and use the usual complex inner product, conjugate-linear in its first argument. Then

$$
\begin{aligned}
(F^*F)_{x,y}
&=\langle F E_x,F E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle\\
&=\delta_{x,y}.
\end{aligned}
$$

Here $\delta$ is the Kronecker symbol. Expanding the three terms also accounts for every cross term explicitly: term $0$ has a second output coordinate in a range disjoint from those of terms $1$ and $2$, while terms $1$ and $2$ have first output coordinates of opposite parity. Consequently, for $r\ne s$,

$$
(M_r^*M_s)\otimes(N_r^*N_s)=0.
$$

Each diagonal term is the coordinate projection onto its input branch, and the three branches partition the entire input index set. Therefore

$$
\begin{aligned}
F^*F
&=\sum_{r,s=0}^2(M_r^*M_s)\otimes(N_r^*N_s)\\
&=I_{2bq}.
\end{aligned}
$$

The zero-dimensional cases are included. If $b=0$, $F$ has no input columns, and both $F^*F$ and $I_0$ are the unique empty square matrix; the identity holds, and $2b\le3a$ always holds. If $a=0$, the threshold forces $b=0$. If instead $b>0$, positivity of $q$ makes the input dimension positive and the output dimension zero, already ruled out by the rank inequality in the necessity argument. The full proof is checked by the Lean kernel.
:::

Setting $a=2$, $b=3$, and $q=1$ gives exactly the six slices displayed in [@ex-bridge-two-three]: the first four input basis vectors retain their coordinates, and the remaining two follow

$$
\begin{aligned}
(2,0)&\longmapsto(0,2),\\
(2,1)&\longmapsto(1,2)
\end{aligned}
$$

completing the six output basis vectors. Thus [@thm-bridge-native-saturation-iff] extends that permutation example across the whole parameter family $c=2q$, $d=3q$. In general, the inputs need only occupy distinct output coordinates; they need not exhaust the output space.

In the range $a<b$ with $2b\le3a$, this family satisfies $3c=6q=2d$. This equality follows directly from choosing $c=2q$ and $d=3q$. The theorem classifies existence of the original matrix triples within this fixed family of right dimensions; the identity column Gram follows directly from the coordinate routing of the displayed factors. This construction alone does not prove that, for arbitrary $c,d$, $a<b$ and the positive scalar column Gram identity $F^*F=\lambda I_{bc}$ ($\lambda>0$) necessarily imply $3c\le2d$. The bound $2c\le d$ in [@thm-bridge-native-rectangular-bound] below uses the strict threshold $3a<2b$, on the opposite side of the threshold from $2b\le3a$ here.

The two right input blocks need not have equal lengths. Split the $c$ input coordinates into blocks of lengths $\lfloor c/2\rfloor$ and $\lceil c/2\rceil$, and give them the even and odd left slots, respectively. The same routing then works. Thus neither even $c$ nor the exact choice $d=3c/2$ is essential to this existence construction: the right output only needs room for the original $c$ rows and an additional strip of $\lceil c/2\rceil$ rows.

::: {.theorem #thm-bridge-native-scalar-gram-exists title="Positive scalar column Gram existence for native three-term tensor sums in the first region" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGram.native_scalar_gram_exists"}
For any natural numbers $a,b,c,d\in\mathbb N$ satisfying

$$
2b\le3a,\qquad3c\le2d,
$$

and every real number $\lambda$ with $\lambda>0$, there exist complex matrix families

$$
\begin{aligned}
M&:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C),\\
N&:\operatorname{Fin}3\longrightarrow M_{d\times c}(\mathbb C),
\end{aligned}
$$

whose original tensor sum satisfies

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=\lambda I_{bc}.
\end{aligned}
$$

Here $F^*$ is the conjugate transpose, the rows of $F$ are indexed by $\operatorname{Fin}a\times\operatorname{Fin}d$, and its columns by $\operatorname{Fin}b\times\operatorname{Fin}c$. The matrix $I_{bc}$ is the identity on this column index set, and the real number $\lambda$ is viewed as a complex scalar through the natural embedding. There is no assumption that $a<b$, that $c$ has either parity, that $d$ has a particular exact value, that the factors are linearly independent, or that any dimension is strictly positive.
:::

::: {.proof #pf-bridge-native-scalar-gram-exists}
First construct a tensor sum with identity column Gram, then scale by a real scalar. Put

$$
q=\lfloor c/2\rfloor,\qquad c-q=\lceil c/2\rceil.
$$

Use indices starting at $0$ throughout, with ranges

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le s<d,&\qquad0\le k<c.
\end{aligned}
$$

As before, let $\mathbf1_{\{P\}}$ be the indicator of $P$. Take the same three unscaled left slices as in the preceding construction, now denoted by $L_r$:

$$
\begin{aligned}
(L_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(L_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(L_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}}.
\end{aligned}
$$

Choose the $d\times c$ right slices

$$
\begin{aligned}
(N_0)_{sk}&=\mathbf1_{\{s=k\}},\\
(N_1)_{sk}&=\mathbf1_{\{k<q,\ s=c+k\}},\\
(N_2)_{sk}&=\mathbf1_{\{q\le k,\ s=c+(k-q)\}}.
\end{aligned}
$$

The differences $j-a$ and $k-q$ matter only when $j\ge a$ and $k\ge q$, respectively, so both are ordinary nonnegative integer differences. For $G=\sum_{r=0}^2L_r\otimes N_r$, these factors give the route

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

Check the coordinate ranges explicitly. If $j\ge a$, put $t=j-a$. Since $j+1\le b$ and $2b\le3a$,

$$
2(t+1)\le2(b-a)\le a.
$$

Thus $2t<a$ and $2t+1<a$. If $b\le a$, there are no inputs in these residual branches: every column takes the first branch.

The required integer bound on the right is

$$
\begin{aligned}
d&\ge\lceil3c/2\rceil\\
&=c+\lceil c/2\rceil=c+(c-q)\ge c.
\end{aligned}
$$

This follows exactly from $3c\le2d$. Explicitly, write $c=2q+\varepsilon$, where $\varepsilon\in\{0,1\}$. Then $2d\ge6q+3\varepsilon$, and integrality of $d$ gives $d\ge3q+2\varepsilon=c+(c-q)$. The first branch has $k<c\le d$; the second has

$$
c\le c+k<c+q\le c+(c-q)\le d;
$$

and the third has

$$
c\le c+(k-q)<c+(c-q)\le d.
$$

Thus $\rho(j,k)$ is always a valid output coordinate. The two right input blocks may differ in length; the additional output strip needs only as many rows as the longer block, namely $c-q$.

Let $E_{j,k}=e_j\otimes e_k$ be the input standard basis and $U_{i,s}=e_i\otimes e_s$ the output standard basis. When $j<a$, the corresponding columns of $L_1,L_2$ vanish, leaving only term $0$. When $j\ge a$, we have $(L_0)_{ij}=0$ because $i<a$, and the other two terms divide the inputs according to $k<q$ and $q\le k$. Every column therefore has exactly one nonzero entry, equal to $1$, and

$$
G E_{j,k}=U_{\rho(j,k)}.
$$

Distinct inputs cannot collide. The first branch has second output coordinate below $c$, whereas the other two branches have second coordinate at least $c$. Although the latter share the additional right strip, their first output coordinates are even and odd, respectively, so their images are disjoint. Within each branch the output $(i,s)$ uniquely recovers the input: in the first, $(j,k)=(i,s)$; in the second, $j=a+i/2$ and $k=s-c$; in the third, $j=a+(i-1)/2$ and $k=q+s-c$. The divisions are exact in their respective parity branches. Hence $\rho$ is injective. For any input indices $x,y$, the usual complex inner product now gives

$$
\begin{aligned}
(G^*G)_{x,y}
&=\langle G E_x,G E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle
=\delta_{x,y}.
\end{aligned}
$$

This determines every Gram entry directly. Finally, the actual original factors are

$$
\begin{aligned}
M_r&=\sqrt{\lambda}\,L_r,\qquad N_r\ \text{as specified above},\\
F&=\sqrt{\lambda}\,G,\\
F^*F&=\overline{\sqrt{\lambda}}\sqrt{\lambda}\,G^*G
=\lambda I_{bc},
\end{aligned}
$$

because $\lambda>0$ makes $\sqrt{\lambda}$ real with square $\lambda$. Throughout, the argument uses the displayed original $a\times b$ and $d\times c$ factors.

The zero-dimensional cases remain subject to both dimension hypotheses. If $b=0$ or $c=0$, the input index set is empty, and $F^*F$ and $\lambda I_0$ are the unique empty square matrix. If $a=0$, $2b\le3a$ forces $b=0$; if $d=0$, $3c\le2d$ forces $c=0$. Nor is $q>0$ needed: when $c=1$, $q=0$, the second branch is empty, and the third works as written. Zero or linearly dependent factors need not be excluded. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-native-scalar-gram-odd title="Nine-column routing with an odd right input dimension"}
Take

$$
(a,b,c,d,\lambda)=(2,3,3,5,2).
$$

Then $2b=6=3a$, $3c=9\le10=2d$, and $q=1$; the two right input blocks have lengths $1$ and $2$. The original left factors are three $2\times3$ matrices:

$$
\begin{aligned}
M_0&=\sqrt2\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\\
M_1&=\sqrt2\begin{pmatrix}0&0&1\\0&0&0\end{pmatrix},\\
M_2&=\sqrt2\begin{pmatrix}0&0&0\\0&0&1\end{pmatrix}.
\end{aligned}
$$

The original right factors are all $5\times3$ matrices. The nonzero entries of $N_0$ are $(N_0)_{00}=(N_0)_{11}=(N_0)_{22}=1$; $N_1$ has only $(N_1)_{30}=1$; and $N_2$ has only $(N_2)_{31}=(N_2)_{42}=1$. All other entries vanish. Thus $F=\sum_{r=0}^2M_r\otimes N_r$ has $10$ rows and $9$ columns. Its first six columns $(j,k)$, with $j=0,1$ and $k=0,1,2$, are $\sqrt2\,U_{j,k}$; the remaining three are

$$
\begin{aligned}
F E_{2,0}&=\sqrt2\,U_{0,3},\\
F E_{2,1}&=\sqrt2\,U_{1,3},\\
F E_{2,2}&=\sqrt2\,U_{1,4}.
\end{aligned}
$$

The nine output coordinates are distinct, and only $(0,4)$ is unused. Every column therefore has squared norm $2$, and any two distinct columns have inner product zero, giving $F^*F=2I_9$ directly. Unequal right input blocks still allow the original three-term factors to produce an exact scalar column Gram.
:::

[@thm-bridge-native-scalar-gram-exists] extends the existence construction to arbitrary natural right dimensions satisfying $3c\le2d$, while retaining the left hypothesis $2b\le3a$. It is a sufficient condition: it does not assert that $3c\le2d$ is universally necessary for arbitrary original factors, and it does not give an existence classification in all dimensions. Under $3a<2b$, the later necessary bound gives $2c\le d$ ([@thm-bridge-native-rectangular-bound]); under the stronger threshold $2a<b$, it gives $3c\le d$ ([@thm-bridge-scalar-gram-obstruction]). The result here is an exact Gram identity in the finite native matrix model; it supplies no quantitative gap for approximate spectral flatness, physical realization, or derivation of the RT formula.
