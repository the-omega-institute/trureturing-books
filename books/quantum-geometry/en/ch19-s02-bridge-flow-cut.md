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
\begin{aligned}
\rho(j,k)&=\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
\end{aligned}
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

In the range $a<b$ with $2b\le3a$, this construction attains $3c=6q=2d$ at $c=2q$ and $d=3q$. The later [@thm-bridge-native-three-rectangular-bound] proves that $3c\le2d$ is necessary for every three-term positive scalar column Gram with a shrinking left factor.

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
\begin{aligned}
\rho(j,k)&=\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
\end{aligned}
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

The coordinate construction above gives a scalar column Gram when $2b\le3a$ and $3c\le2d$. For any three pairs of factors with a positive scalar column Gram, shrinking the left factor forces this bound on the right dimensions.

::: {.theorem #thm-bridge-native-three-rectangular-bound title="Rectangular dimension bound for width-three bridge flows" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeThreeRectangularBound.native_three_rectangular_bound"}
Let $a,b,c,d\in\mathbb N$ and take arbitrary complex matrices $M_r\in M_{a\times b}(\mathbb C)$ and $N_r\in M_{d\times c}(\mathbb C)$ for $r=0,1,2$. Set $F=\sum_{r=0}^{2} M_r\otimes N_r$. If $\lambda>0$ is real, $F^*F=\lambda I_{bc}$, and $a<b$, then $3c\le2d$.
:::

::: {.proof #pf-bridge-native-three-rectangular-bound}
If $c=0$, the bound follows immediately. Otherwise $a<b$ gives $b>0$, and the Gram identity makes $F$ injective, so $a$ and $d$ are both positive. Divide $F$ by $\sqrt{\lambda}$ to obtain an isometry $\widehat F$. Choose a shortest representation $\widehat F=\sum_r X_r\otimes Y_r$ with $m\le3$ terms. A linear relation among either family would allow one term to be absorbed into the others, so both families are linearly independent. Orthonormalize the right factors for the inner product $c^{-1}\operatorname{Tr}(Y_r^*Y_s)$ and apply the inverse transpose of that change of basis to the left factors. This preserves the tensor sum. The normalized right partial trace of $\widehat F^*\widehat F=I_{bc}$ now gives $\sum_r X_r^*X_r=I_b$.

Stack the left factors into the isometry $Sx=(X_rx)_r$. Then $b\le ma$, ruling out $m\le1$. For a coefficient matrix $T$, define the compression $\Phi(T)=S^*(T\otimes I_a)S$. Concatenate the right factors as $W=[Y_r]_r$ and let $P=W^*W$. Expanding $\widehat F^*\widehat F$ shows that for each pair of right input coordinates $(\ell,j)$ the residual coefficient matrix $R_{\ell j}$ has $(r,s)$ entry $(Y_r^*Y_s)_{\ell j}-\delta_{rs}\delta_{\ell j}$ and satisfies $\Phi(R_{\ell j})=0$. The compression preserves adjoints, so both Hermitian parts of $R_{\ell j}$ lie in the Hermitian compression kernel.

A nonzero semidefinite coefficient matrix in the kernel would, by spectral decomposition, force a nontrivial combination $\sum_r u_r X_r$ to vanish, contradicting independence. An invertible indefinite Hermitian matrix with $m=2$ or $m=3$ has smaller inertia index $1$. Every neutral subspace for $T\otimes I_a$ therefore has dimension at most $a$, since its projection onto the smaller sign subspace is injective. If $\Phi(T)=0$, the $b$-dimensional image of $S$ would be such a neutral subspace, contradicting $a<b$.

When $m=2$, every nonzero indefinite Hermitian matrix is invertible. The Hermitian compression kernel is therefore zero, so $R_{\ell j}=0$. The Gram of $W$ is $I_{2c}$, giving $2c\le d$. When $m=3$, the kernel consists of singular Hermitian matrices. For these independent left factors and this injective stack, the [coefficient-kernel geometry theorem](lean:D5/S3/Quantum/Algebra/CompressionKernel/NativeThreeKernelGeometry.native_three_compression_kernel_geometry) gives two alternatives.

- If every Hermitian matrix in the kernel annihilates the same unit vector $v$, then $R_{\ell j}v=0$. Thus $Z=\sum_s v_sY_s$ satisfies $Y_r^*Z=v_r I_c$, and hence $Z^*Z=I_c$. Choose $v_i\ne0$ and let $W_r=Y_r-\overline{v_r/v_i}\,Y_i$ for $r\ne i$. Both $W_r$ have image in the orthogonal complement of the image of $Z$. If they both killed a nonzero $y$, we would have $Y_r y=\overline{v_r/v_i}\,Y_i y$ for every right factor. The left combination $\sum_r\overline{v_r/v_i}\,X_r$ maps a $b$-dimensional space into an $a$-dimensional one and has a nonzero null vector $x$. This would give $\widehat F(x\otimes y)=0$, contradicting isometry. Stacking the two $W_r$ therefore gives an injection, so $c\le2(d-c)$, or $3c\le2d$.
- If there is a common two-dimensional neutral plane $L$, then $u^*R_{\ell j}v=0$ for $u,v\in L$. Take the columns of $V$ to be an orthonormal basis of $L$ and set $C=V\otimes I_c$. Applying the pairing identity to each pair of right input coordinates gives $C^*(P-I_{3c})C=0$. Thus $(WC)^*(WC)=I_{2c}$, giving $2c\le d$ and hence $3c\le2d$.

The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bridge-native-scalar-gram-iff title="Complete dimension classification for positive scalar column Grams at width three" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGramClassification.native_scalar_gram_iff"}
For any $a,b,c,d\in\mathbb N$ and real $\lambda>0$, there exist complex matrices $M_r\in M_{a\times b}(\mathbb C)$ and $N_r\in M_{d\times c}(\mathbb C)$ for $r=0,1,2$ such that $F=\sum_{r=0}^{2} M_r\otimes N_r$ satisfies $F^*F=\lambda I_{bc}$ if and only if at least one of the following conditions holds.

1. $b=0$ or $c=0$.
2. $b\le a$ and $c\le d$.
3. $a<b$, and all the inequalities on at least one of the following lines hold.

   $$
   \begin{aligned}
   2b &\le 3a, & 3c &\le 2d,\\
   3a &< 2b,\quad b\le2a, & 2c &\le d,\\
   2a &< b\le3a, & 3c &\le d.
   \end{aligned}
   $$

4. $d<c$, and all the inequalities on at least one of the following lines hold.

   $$
   \begin{aligned}
   2c &\le 3d, & 3b &\le 2a,\\
   3d &< 2c,\quad c\le2d, & 2b &\le a,\\
   2d &< c\le3d, & 3b &\le a.
   \end{aligned}
   $$

When $0<b$ and $0<c$, either $a=0$ or $d=0$ rules out a realization. So does either $b>3a$ or $c>3d$.
:::

::: {.proof #pf-bridge-native-scalar-gram-iff}
If $b=0$ or $c=0$, both sides of the Gram equation are the unique empty square matrix, and zero factors suffice. Now take $b,c>0$. Since $\lambda>0$, the Gram identity forces $F$ to be injective, so $a,d$ are positive. If both input factors fit into their output spaces, meaning $b\le a$ and $c\le d$, the dimensions already satisfy the second condition.

If $a<b$, the stack $x\mapsto(M_0x,M_1x,M_2x)$ is injective. Any nonzero vector in its kernel would give a nonzero tensor in the kernel of $F$ when paired with any nonzero right input vector. Hence $b\le3a$. When $2b\le3a$, [@thm-bridge-native-three-rectangular-bound] gives $3c\le2d$. When $3a<2b$ and $b\le2a$, [@thm-bridge-native-rectangular-bound] gives $2c\le d$. When $2a<b\le3a$, [@thm-bridge-scalar-gram-obstruction] gives $3c\le d$. These intervals exhaust the possible dimensions when the left factor shrinks.

Swapping the tensor factors on both input and output replaces $F$ by $\sum_r N_r\otimes M_r$ and relabels the dimensions as $(d,c,b,a)$. The swaps are unitary permutations, so the new column Gram is the unitary conjugate of the original by the input permutation. The scalar identity is therefore equivalent before and after the swap. When $d<c$, the left-shrinking bounds on the swapped dimensions give the fourth condition.

Conversely, [@thm-bridge-native-scalar-gram-exists] supplies the construction for the first left-shrinking interval. A single block construction covers the other cases on this side. Given $k\le3$, $b\le ka$, and $kc\le d$, split the left input coordinates into $k$ blocks of size at most $a$. Each block has its own left matrix embedding it into the same left output coordinates. The corresponding right matrix embeds all $c$ input coordinates into a dedicated block of $c$ output coordinates. The right output blocks are disjoint, so each input basis vector maps to exactly one output basis vector and all images are distinct. Pad with zero terms and multiply the left matrices by $\sqrt{\lambda}$ to obtain column Gram $\lambda I_{bc}$. Use $k=1$ when both factors fit, and $k=2$ and $k=3$ in the remaining two left-shrinking intervals, respectively. When the right factor shrinks, construct on the swapped dimensions and swap back. The full proof is checked by the Lean kernel.
:::

For $k\ge1$, the family $(2k,5k,2k,5k)$ lies in the third left-shrinking interval but has $3c=6k>d=5k$, ruling out an exactly flat spectrum. For this family the entropy of the normalized column Gram also stays below its maximum by an amount bounded uniformly in $k$.

**A uniform flat-spectrum entropy gap for width-three bridges (`manual derivation`).** Let $k\ge1$ be an integer, $(a,b,c,d)=(2k,5k,2k,5k)$, $D=bc=10k^2$, and $F=\sum_{r=1}^3 M_r\otimes N_r\ne0$. Normalize $\rho_{BC}=F^*F/\operatorname{Tr}(F^*F)$ and write $G=D\rho_{BC}$ and $\eta=\|G-I_D\|_1/D$, where $\|\cdot\|_1$ is the trace norm. With at most $2$ terms, $\operatorname{rank}F\le 2ac=8k^2$, so the negative part of $G-I_D$ has trace at least $2k^2$. Since this matrix is traceless, $\eta\ge 2/5$.

Otherwise take a minimal three-term representation. The right factors are linearly independent. Change their basis and absorb the inverse change into the left factors so that $\operatorname{Tr}(N_r^*N_s)=c\delta_{rs}$. Scale $F$ so that $G=F^*F$, and set $Sx=(M_rx)_{r=1}^3$, $B=S^*S=c^{-1}\operatorname{Tr}_C G$, and $T=(N_r^*N_s)_{r,s=1}^3-I_{3c}$. The concatenated right factors have at most $d$ independent rows and their Gram matrix has trace $3c$, so $\|T\|_1\ge2(3c-d)=2k$. The partial trace contracts trace norm on Hermitian matrices because its dual $X\mapsto X\otimes I_c$ preserves operator norm. Hence $\|B-I_b\|_1\le b\eta$. Since $\operatorname{Tr}B=b$, at most $b\eta$ eigenvalues of $B$ are below $1/2$. Let $E$ be the remaining spectral subspace. The desired bound holds if $\eta\ge1/5$. Otherwise put $J=(B|_E)^{-1/2}$ and $W=S|_EJ$, so $W$ is an isometry and $\|J\|\le\sqrt2$. Compressing $G-B\otimes I_c$ to $E\otimes\mathbb C^c$ and conjugating by $J\otimes I_c$ gives an operator with trace norm at most $2\|G-B\otimes I_c\|_1\le4D\eta$.

For unit $z\in\mathbb C^3$, the intersection $W(E)\cap(z\otimes\mathbb C^a)$ has dimension at least $\dim E-2a\ge k(1-5\eta)$. On its preimage, the last operator compresses to the repeated block $I\otimes Q(z)$ with $Q(z)=\sum_{r,s}\bar z_rz_s T_{rs}$. Define $\widetilde F=F\rvert_{E\otimes\mathbb C^c}(J\otimes I_c)$, so the operator before this last compression is $\widetilde F^*\widetilde F-I_E\otimes I_c$. When $Wx=z\otimes u$, the identity $\widetilde F(x\otimes y)=u\otimes\sum_r z_rN_ry$ gives the repeated block. Thus $\|Q(z)\|_1\le L=4D\eta/[k(1-5\eta)]$. Testing $z=e_r$ bounds each diagonal block by $L$. Taking differences for $(e_r\pm e_s)/\sqrt2$ and $(e_r\pm i e_s)/\sqrt2$ and combining bounds each off-diagonal block by $2L$. Summing three diagonal and six off-diagonal contributions gives

$$
\begin{aligned}
2k &\le\|T\|_1\le15L=\frac{600k\eta}{1-5\eta},\\
\eta &\ge\frac1{305}.
\end{aligned}
$$

Pinsker's inequality for the eigenvalues of $\rho_{BC}$ against the uniform distribution, with natural logarithms, yields $\log D-S(\rho_{BC})\ge\eta^2/2\ge 1/186050$. On $(2k,5k,2k,5k)$, both square Grams $F^*F$ and $FF^*$ have dimension $D$ and the same nonzero spectrum, so the entropy gap holds for either normalized Gram. See *Uniform entropy gap for width-three bridges* in Paper II's appendix *Tensor-network results used for cap entropies*. In general dimensions, if the width-three flow satisfies $F\ne0$ and $q=\operatorname{QMinCut}(a,b,c,d)<D=bc$, then $1\le R=\operatorname{rank}F\le q$. For the nonzero eigenvalues $p_i$ of $\rho_{BC}$, Cauchy–Schwarz gives $\sum_i p_i^2\ge1/R\ge1/q$, so

$$
\lVert D\rho_{BC}-I_D\rVert_{\mathrm F}^2 =D^2\sum_i p_i^2-D\ge\frac{D(D-q)}{q}.
$$

Entropy is maximized by the uniform distribution on the support, giving $\log D-S(\rho_{BC})\ge\log(D/q)$. Equality in either rank-only bound holds exactly when $R=q$ and the nonzero eigenvalues are uniform.
