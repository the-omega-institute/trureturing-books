# 35.6.8.4.1 The minimum number of internal additions

Fix $d,r\ge 1$ and put $q=3^d$. The points are $\mathbb F_3^d\times\mathbb Z/(3r)\mathbb Z$, with one row for each $x\in\mathbb F_3^d$. Keep all the mixed lifted triples, whose first coordinates are distinct and whose sum in the product group is zero. New triples may lie within a row. Every triple must have three distinct points, and any two distinct points may occur together at most once. [@thm-joint-circuit-internal-dimension]

::: {.theorem #thm-joint-circuit-minimum-internal-lower-bound title="A lower bound for gaining one potential dimension" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.internal_additions_lower_bound"}
Under these conditions, if the normalized potential space grows to dimension $d+1$, at least $qr^2$ internal triples must be added.
:::

::: proof
The dimension criterion requires every uncovered pair within a row to have the same residue modulo three. Thus two points in the same row with different residues must occur together in an added triple. Each row has six ordered pairs of distinct residue classes, with $r$ points per class. Across all rows this gives $6qr^2$ ordered point pairs.

For every such pair, choose a containing triple and record the ordered slots of the two points. The triple and slots recover the original pair, so the assignment is injective. Each added triple supplies only six ordered pairs of distinct slots, giving the lower bound $qr^2$. The full proof is checked by the Lean kernel. [@thm-joint-circuit-internal-dimension]
:::

::: {.theorem #thm-joint-circuit-minimum-internal-attained title="A transversal design on the residue classes attains the bound" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.exists_internal_additions_attaining"}
Exactly $qr^2$ internal triples can be added to the mixed family above so that each triple in the combined family has three distinct points, every pair of distinct points occurs at most once, and the normalized potential space has dimension exactly $d+1$.
:::

::: proof
In each row, divide the cyclic coordinates into their three residue classes modulo three. Each class has $r$ points, which can be labelled by $\mathbb Z/r\mathbb Z$. For every pair of labels $a,b$, take the points labelled $a$ in class $0$, $b$ in class $1$, and $-a-b$ in class $2$. Any two points from different classes determine the third label. Hence every different-residue pair within a row occurs exactly once, while same-residue pairs lie in none of these triples. Each new triple has residue sum $0+1+2=0$, and each uncovered pair in a row has residue difference zero. Both residue conditions hold, so the potential dimension is $d+1$.

Each row contributes $r^2$ new triples, and none shares a pair with a mixed triple. The labels need only give a bijection from each residue class to the set $\mathbb Z/r\mathbb Z$, so the construction also applies when $9\mid 3r$. For example, when $d=1$ and $r=2$, each row has classes $\{0,3\}$, $\{1,4\}$, and $\{2,5\}$. Label each class by $0,1$ in the order shown. This gives the four triples $\{0,1,2\}$, $\{0,4,5\}$, $\{3,1,5\}$, and $\{3,4,2\}$ in each row, for twelve additions across the three rows. The full proof is checked by the Lean kernel. [@thm-joint-circuit-internal-dimension]
:::
