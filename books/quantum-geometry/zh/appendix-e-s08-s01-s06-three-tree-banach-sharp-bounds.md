# E.8.1.6 3-树的 Banach 重构界与路径三次幂的精确常数 {#sec-appe-three-tree-banach-sharp-bounds}

若每个团至多有 $4$ 个顶点，三角缺陷至多为 $1$ 的增益可以拟合到多准？对这类有限弦图（包括所有 $3$-树），统一 Banach 系数 $S_4$ 满足 $\frac43\le S_4\le\frac{72537}{50000}=1.45074<\frac32$。路径三次幂族的系数上确界恰为 $\frac43$。路径上的前缀修正给出逐图上界，零和六边形平面给出有限图下界。一般弦图的上界则来自沿消去序保持的多边形。

记 $V_n=\mathrm{Fin}(n)=\{i\in\mathbb N:i<n\}$，$P_n^3$ 是 $V_n$ 上的简单图，两个不同的下标相距至多 $3$ 时相邻。对简单图 $G$，称 $g:V\times V\to E$ 在所有有序点对上满足 $g(j,i)=-g(i,j)$ 为反对称。若每个有序三角形 $(i,j,k)$（即 $ij,jk,ik$ 都是棱）都满足 $\|g(i,j)+g(j,k)-g(i,k)\|\le\varepsilon$，则称三角缺陷至多为 $\varepsilon$。势 $\varphi:V\to E$ 在有向棱 $(i,j)$ 上的误差为 $\|g(i,j)-(\varphi(j)-\varphi(i))\|$。

对固定图，$C_{\mathrm{Ban}}(G)$ 是满足下述条件的非负实数 $C$ 的下确界。对任意实 Banach 空间 $E$ 及任意取值于 $E$、反对称且三角缺陷至多为 $1$ 的增益，都存在一个势使每条有向棱的误差至多为 $C$。在 $P_n^3$ 上，这就是 Lean 的路径系数。$S_4$ 取同样的下确界，但要求同一个 $C$ 适用于所有有限简单弦图中每个团大小至多为 $4$ 的图。

对 $n>0$，置 $c(j)=\min(\max(j-2,0),n-1)\in V_n$，用 $I(k)=\sum_{0\le j<k}g(c(j),c(j+1))$ 积分相邻增益。记 $f(j,k)=g(c(j),c(k))-(I(k)-I(j))$，$a_j=f(j,j+2)$，$b_j=f(j,j+3)$。Lean 的因果势为

$$
\varphi_g(i)=I(i+2)+\frac13\sum_{0\le j<i}(b_j-a_j+a_{j+1}).
$$

当 $n=0$ 时，$\varphi_g$ 是空顶点集上的映射。

::: {.theorem #thm-appe-three-tree-causal-error title="路径三次幂的因果势误差界" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_causal_potential_error"}
设 $E$ 为实半赋范向量空间，$n\in\mathbb N$，$g:V_n\times V_n\to E$，$\varepsilon\in\mathbb R$ 且 $\varepsilon\ge0$。若 $g$ 在所有有序点对上反对称，在 $P_n^3$ 上三角缺陷至多为 $\varepsilon$，则对每条有向棱 $(i,j)$，

$$
\|g(i,j)-(\varphi_g(j)-\varphi_g(i))\|\le\frac43\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-causal-error}
相邻下标上的 $f(j,j+1)$ 为零。三角缺陷在减去势差后保持不变，故 $\|a_j\|$、$\|a_j-b_j\|$ 与 $\|a_{j+1}-b_j\|$ 均至多为 $\varepsilon$。若截取后的顶点重合，相应缺陷由反对称性化为零。令 $x$ 为升序棱的起点下标，代入前缀和得到下列残差乘以 $3$ 的表达式。

$$
\begin{aligned}
j=x+1:\quad &(a_x-b_x)-a_{x+1},\\
j=x+2:\quad &a_{x+2}+(a_{x+2}-b_{x+1})+(a_x-b_x),\\
j=x+3:\quad &(b_{x+2}-a_{x+2})+(b_{x+2}-a_{x+3})\\
&\qquad +(a_{x+2}-b_{x+1})+(a_x-b_x).
\end{aligned}
$$

各项半范数至多为 $\varepsilon$，因此最长边给出统一界 $\frac43\varepsilon$。反向只改变残差的符号，空图没有棱约束。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-three-tree-path-upper title="路径三次幂的 Banach 重构上界" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_upper_four_thirds"}
设 $E$ 为实半赋范向量空间，$n\in\mathbb N$，$g:V_n\times V_n\to E$，$\varepsilon\in\mathbb R$ 且 $\varepsilon\ge0$。若 $g$ 在所有有序点对上反对称，在 $P_n^3$ 上三角缺陷至多为 $\varepsilon$，则存在势 $\varphi:V_n\to E$，使每条有向棱 $(i,j)$ 都满足

$$
\|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac43\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-path-upper}
取 [@thm-appe-three-tree-causal-error] 中的因果势 $\varphi_g$。完整证明由 Lean 内核检查。
:::

要检验这一上界能否一致降低，需要一组增益同时约束所有势。下面的见证只用一个二维目标。

::: {.theorem #thm-appe-three-tree-path-lower title="路径三次幂在六边形平面中的下界" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_lower_four_thirds"}
令 $H=\{x\in\mathbb R^3:x_0+x_1+x_2=0\}$，取从 $\mathbb R^3$ 继承的上确界范数。对任意 $m\in\mathbb N$ 且 $1\le m$，存在增益 $g:V_{3m+3}\times V_{3m+3}\to H$，它在所有有序点对上反对称，在 $P_{3m+3}^3$ 上三角缺陷至多为 $1$。对每个势 $\varphi:V_{3m+3}\to H$，存在一条有向棱 $(i,j)$ 满足

$$
\frac{4m}{3m+4}\le\|g(i,j)-(\varphi(j)-\varphi(i))\|.
$$
:::

::: {.proof #pf-appe-three-tree-path-lower}
升序棱长为 $3$ 时，从 $i$ 出发的增益为 $L_i=\frac23(1,1,1)-2e_{i\bmod 3}$，其中 $e_r$ 是第 $r$ 个坐标单位向量。长为 $2$ 时取 $A_i=(L_i+L_{i+2})/2$，长为 $1$ 时取零。反向取负，非棱取零。升序三角形的缺陷向量分别为 $-A_i$、$A_i-L_i$、$A_{i+1}-L_i$，逐坐标检查可知范数至多为 $1$。置换顶点至多改变缺陷符号。

固定势并令 $M$ 为最大棱误差。对每个余数 $r$，沿 $r,r+3,\ldots,r+3m$ 读取第 $r$ 个坐标。每步的势增量至多为 $-\frac43+M$，故望远镜求和后的增量至多为 $m(-\frac43+M)$。对三个余数求和时，将首尾两组三个坐标分别移到各组的中间顶点。每组只有外侧的两个坐标发生变化，每个坐标的变化量绝对值至多为 $M$，因为相邻棱的增益为零。两个中间顶点的坐标和均为零，于是三个总增量之和至少为 $-4M$，得到 $4m\le(3m+4)M$。棱集有限且非空，最大误差在某条棱上取到。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-three-tree-path-sup title="路径三次幂系数的精确上确界" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_sup_four_thirds"}
$$
\sup_{n\in\mathbb N}C_{\mathrm{Ban}}(P_n^3)=\frac43.
$$
:::

::: {.proof #pf-appe-three-tree-path-sup}
取 $\varepsilon=1$，逐图上界由 [@thm-appe-three-tree-path-upper] 给出。[@thm-appe-chordal-banach-limit-two] 的固定宽度极限在宽度 $3$ 时给出 $\lim_{n\to\infty}C_{\mathrm{Ban}}(P_n^3)=\frac43$，故上确界至少为该极限。前面的六边形见证也展示了逼近这一数值的有限图下界，因为 $\frac{4m}{3m+4}\to\frac43$。完整证明由 Lean 内核检查。
:::

路径的上界用到了线性顶点顺序。处理一般弦图时，消去序仍能把问题化为一个顶点的扩展，但必须在各个前驱三角形上保留足够的信息。

::: {.theorem #thm-appe-three-tree-chordal-upper title="团大小至多为四的弦图重构上界" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.IsChordal.exists_cliqueFour_banach_gain_potential_polygon"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单弦图，每个团 $C\subseteq V$ 的基数至多为 $4$。设 $E$ 为实半赋范向量空间，$g:V\times V\to E$，$\varepsilon\in\mathbb R$ 且 $\varepsilon\ge0$。若 $g$ 在所有有序点对上反对称，在 $G$ 上三角缺陷至多为 $\varepsilon$，则存在势 $\varphi:V\to E$，使每条有向棱 $(i,j)$ 都满足

$$
\|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac{72537}{50000}\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-chordal-upper}
**三角形上的不变量。** 反转完美消去序后，每个新顶点 $z$ 的前驱邻点成团，至多有 $3$ 个。记 $r_{ab}=g(a,b)-(p(b)-p(a))$，$\Delta_{abc}=g(a,b)+g(b,c)-g(a,c)$。对已插入的有序三角形 $a<b<c$，用 $(A,C,t)=(r_{ab},r_{bc},\Delta_{abc})$ 记录面上的数据，第三条棱的残差为 $A+C-t$。对每个范数至多为 $1$ 的连续实线性泛函 $f$ 和每个 $\delta\ge\varepsilon$、$\delta>0$，要求 $(f(A),f(C),f(t))/\delta$ 落在同一个凸多面体内。该多面体是缺陷层 $t=1$ 上的 $13$ 边形与其反射层 $t=-1$ 的凸包，约束三条标量残差的绝对值至多为 $R=72537/50000$。

**扩展到新顶点。** 有 $3$ 个前驱时，令 $u=\Delta_{abz}$、$v=\Delta_{bcz}$，新面的第三个缺陷为 $u+v-t$。取如下中间残差。

$$
B=-\frac{1513}{5000}A+\frac{177}{500}C+\frac{50948}{100000}u-\frac{14557}{100000}v-\frac{15689}{100000}t.
$$

令 $p(z)=p(b)+g(b,z)-B$。新棱的残差分别为 $A+B-u$、$B$、$B-C+v$。$117$ 个符号转移不等式验证了 $9$ 种转移各自保持 $13$ 条边界不等式。由凸组合覆盖允许的标量缺陷，三个新面 $(A,B,u)$、$(A+C-t,B-C+v,u+v-t)$ 与 $(C,B-C+v,v)$ 都继承不变量。只有 $2$ 个前驱 $a<b$ 时，引入 $b$ 的虚拟副本，取 $C=-A/(2R)$、$t=0$ 补出一个面。以 $g(a,z)-g(a,b)$ 与 $g(b,z)$ 的中点作桥接增益，两个虚拟子面的缺陷为 $-u/2$ 与 $u/2$，真实子面因而继承同一不变量。只有 $1$ 个前驱时精确输运，无前驱时取零。

**回到半范数。** 由 Hahn–Banach 定理，每个残差都有一个范数至多为 $1$ 且取到其半范数的实线性泛函。标量界对上述每个 $\delta$ 成立，取 $\delta$ 从上方趋于 $\varepsilon$ 给出 $R\varepsilon$，也涵盖 $\varepsilon=0$。每次插入都保留旧势值，反对称性给出反向棱的同一界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-three-tree-clique-four-bracket title="团大小至多为四的 Banach 系数区间" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.cliqueFour_banach_coefficient_bounds"}
$$
\frac43\le S_4\le\frac{72537}{50000}<\frac32.
$$
:::

::: {.proof #pf-appe-three-tree-clique-four-bracket}
路径三次幂可用区间 $[i,i+3]$ 表示，故为弦图。团中最小和最大的下标相差至多 $3$，所以每个团至多有 $4$ 个顶点。定义 $S_4$ 的每个可用系数都必须控制这些图，由 [@thm-appe-three-tree-path-sup] 得到下端。取 $\varepsilon=1$，[@thm-appe-three-tree-chordal-upper] 给出一个可用系数，故下确界至多为该系数。最后的严格不等式由有理数比较得出。完整证明由 Lean 内核检查。
:::

$S_4$ 的精确值仍待确定。更紧的解析或计算上界 $S_4\le1.37453$ 及由此考察的区间 $[\frac43,1.37453]$，以及新的 $\mathrm{SU}(2)$ 弦图层级、一般 $k$ 的推广和 Hilbert、$L_1$ 目标的进一步结论，均超出本节所引 Lean 声明的范围。
