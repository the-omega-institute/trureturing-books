# 19.2 宽度三桥图的秩与割容量 {#sec-bridge-flow-cut}

现在我们来数一数：源码用哪三项割容量上界，来约束 $\operatorname{flow}(M, N) = \sum_{r=0}^2 M_r \otimes N_r$ 从输入端 $(\operatorname{Fin} b \times \operatorname{Fin} c)$ 到输出端 $(\operatorname{Fin} a \times \operatorname{Fin} d)$ 的信息通道的秩？

1. **左外边界割（行空间瓶颈）**：矩阵 $\operatorname{flow}(M, N)$ 只有 $|\operatorname{Fin} a \times \operatorname{Fin} d| = ad$ 行，因此其秩绝不可能超过 $ad$；
2. **右外边界割（列空间瓶颈）**：矩阵 $\operatorname{flow}(M, N)$ 只有 $|\operatorname{Fin} b \times \operatorname{Fin} c| = bc$ 列，因此其秩绝不可能超过 $bc$；
3. **中间三桥内部割（跨桥瓶颈）**：对每个桥指标 $r \in \operatorname{Fin} 3$，$M_r \in M_{a\times b}(\mathbb{C})$ 的秩至多为 $a$，$N_r \in M_{d\times c}(\mathbb{C})$ 的秩至多为 $c$，故单个克罗内克积 $M_r \otimes N_r$ 的秩至多为 $ac$；将 $r = 0, 1, 2$ 三路相加，由矩阵秩的次可加性知总秩至多为 $3ac$。

把源码采用的这三项割容量上界取最小值，就是 Lean 模块中定义的**离散量子最小割容量** `QMinCut`：

$$
\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr) \in \mathbb{N}.
$$

一般维数下，图中另有容量为 $3bd$ 的第四道割；当 $a \le b$ 且 $c \le d$ 时，$3bd \ge 3ac$，这一项冗余。

::: {.figure src="ch19-three-cuts"}
**图中画出源码采用的三项割容量上界，QMinCut 取三者中最小的。** 取 $(a, b, c, d) = (2, 3, 2, 3)$：上面的虚线横切腿 $a$、$d$，容量 $ad = 6$；下面的虚线横切腿 $b$、$c$，容量 $bc = 6$；斜着的灰色虚线切过腿 $a$、三条桥与腿 $c$，容量 $3ac = 12$。两道品红的外割并列最小，$\operatorname{QMinCut} = 6$。
:::

下面的命题证明了：无需任何额外参数限制，对一切自然数 $a, b, c, d \in \mathbb{N}$，宽度三桥图的量子最大流永远不超过这一最小割容量。

::: {.proposition #prop-bridge-flow-cut-bound title="秩不超过割容量" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut"}
对任意自然数 $a, b, c, d \in \mathbb{N}$，恒有

$$
\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr).
$$

:::

::: proof
由 [@lemma-bridge-flow-attained] 取达到最大流 $\operatorname{QMaxFlow}(a, b, c, d)$ 的矩阵对 $(M, N)$。一方面，矩阵 $\operatorname{flow}(M, N)$ 的维数为 $(ad)\times (bc)$，矩阵的秩不超过其行数 $ad$ 且不超过其列数 $bc$，故 $\operatorname{rank}(\operatorname{flow}(M, N)) \le \min(ad, bc)$（对应源码中的 `flow_rank_le_outer`）。另一方面，源码通过显式矩阵因式分解 $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N) \cdot \operatorname{cutRight}(M)$（`flow_factor`）将桥流拆成经过中间指标集 $\operatorname{Fin} 3 \times (\operatorname{Fin} a \times \operatorname{Fin} c)$（维数恰为 $3ac$）的两个矩阵乘积，从而由乘积秩不等式得 $\operatorname{rank}(\operatorname{flow}(M, N)) \le 3ac$（对应源码中的 `flow_rank_le_inner`）。两项上界合并即得 $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$。完整证明由 Lean 内核检查。
:::

必须明确的是：[@prop-bridge-flow-cut-bound] 中的 $\operatorname{QMinCut}(a, b, c, d)$ 是纯粹的**有限维矩阵秩上界**，而不是连续弯曲时空中的微分几何面积。为了直观看到三路克罗内克积（各自秩不超过 $ac = 4$，具体秩分别为 $4, 1, 1$）如何协同撑满边界割容量 $\min(ad, bc) = 6$，让我们亲手构造一个 $a = c = 2, b = d = 3$ 的满秩算例。

::: {.example #ex-bridge-two-three title="a = c = 2、b = d = 3 时六阶满秩桥流的手算构造"}
取维数参数 $a = c = 2$，$b = d = 3$。首先核对二次锥不等式：

$$
a^2 + b^2 = c^2 + d^2 = 2^2 + 3^2 = 13 \le 3 \cdot 2 \cdot 3 = 18.
$$

此时三道候选割的容量分别为 $3ac = 12$、$ad = 6$、$bc = 6$，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, \min(6, 6)) = 6$。虽然单路张量积 $M_r \otimes N_r$ 的秩至多只有 $ac = 2 \times 2 = 4 < 6$，但把三路（$r = 0, 1, 2$）叠加起来，就能恰好拼出一张满秩的 $6\times 6$ 置换矩阵！显式取如下三对矩阵：

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

让我们直接核对三项克罗内克积之和 $\operatorname{flow}(M, N) = M_0 \otimes N_0 + M_1 \otimes N_1 + M_2 \otimes N_2$ 的作用：

- $M_0 \otimes N_0$ 将输入子空间 $\{0, 1\} \times \{0, 1\}$（共 $4$ 个基向量）恒等映射到输出行 $\{0, 1\} \times \{0, 1\}$，贡献秩 $4$；
- $M_1 \otimes N_1$ 仅在列指标 $(2, 0)$、行指标 $(0, 2)$ 处取 $1$，单独补上第 $5$ 个独立基方向；
- $M_2 \otimes N_2$ 仅在列指标 $(2, 1)$、行指标 $(1, 2)$ 处取 $1$，单独补上第 $6$ 个独立基方向。

将列指标 $\operatorname{Fin} 3 \times \operatorname{Fin} 2$ 与行指标 $\operatorname{Fin} 2 \times \operatorname{Fin} 3$ 的六个基配对逐一列出，即可一眼看清这三路桥通道是如何做到“零重叠、全覆盖”的：

| 通道指标 $r \in \operatorname{Fin} 3$ | 输入列指标 $(j, l) \in \operatorname{Fin} 3 \times \operatorname{Fin} 2$ | 输出行指标 $(i, k) \in \operatorname{Fin} 2 \times \operatorname{Fin} 3$ | 对应非零矩阵元 $(M_r)_{i,j}(N_r)_{k,l}$ |
| :---: | :---: | :---: | :---: |
| $r = 0$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(M_0)_{i,i}(N_0)_{k,k} = 1 \cdot 1 = 1$ |
| $r = 1$ | $(2, 0)$ | $(0, 2)$ | $(M_1)_{0,2}(N_1)_{2,0} = 1 \cdot 1 = 1$ |
| $r = 2$ | $(2, 1)$ | $(1, 2)$ | $(M_2)_{1,2}(N_2)_{2,1} = 1 \cdot 1 = 1$ |

三项之和共有 $6$ 个互不同行、互不同列的非零元 $1$，构成一个标准的 $6\times 6$ 置换矩阵，故 $\operatorname{rank}(\operatorname{flow}(M, N)) = 6 = \operatorname{QMinCut}(2, 3, 2, 3)$，结合 [@prop-bridge-flow-cut-bound] 当场证实 $\operatorname{QMaxFlow}(2, 3, 2, 3) = 6$！
:::

::: {.figure src="ch19-permutation"}
**三条桥合起来正好铺满一张 $6 \times 6$ 置换矩阵。** 青色的格是 $\operatorname{flow}(M, N)$ 的非零元，格里的数是放下它的桥 $r$：桥 $0$ 铺满左上的 $4$ 格，桥 $1$、桥 $2$ 各补 $1$ 格；六格互不同行、互不同列，秩为 $6$（[@ex-bridge-two-three]）。
:::

上面的六阶置换矩阵还满足一个比满秩更精确的等式：它的每一列都是不同的标准基向量，故 $F^*F=I_6$。把右侧因子的输入、输出维数写成 $c=2q$、$d=3q$，同一构造可以延伸到全部允许的左侧维数。关键是把每个输入坐标放到唯一的输出坐标，并保证不同输入不会相撞。

::: {.theorem #thm-bridge-native-saturation-iff title="原生三项张量和的精确列 Gram 饱和条件" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeSaturation.native_saturation_iff"}
对任意自然数 $a,b,q\in\mathbb N$，若 $q>0$，则存在复矩阵族

$$
\begin{aligned}
M_r&\in M_{a\times b}(\mathbb C),\\
N_r&\in M_{3q\times2q}(\mathbb C)
\qquad(r=0,1,2),
\end{aligned}
$$

使其张量和满足

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=I_{2bq},
\end{aligned}
$$

当且仅当 $2b\le3a$。这里 $F^*$ 是共轭转置，$F$ 的行指标为 $\operatorname{Fin}a\times\operatorname{Fin}(3q)$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}(2q)$，而 $I_{2bq}$ 是该列指标集上的单位矩阵。
:::

::: {.proof #pf-bridge-native-saturation-iff}
先证必要性。若 $F^*F=I_{2bq}$，由乘积秩上界和 $F$ 的行数可得

$$
\begin{aligned}
2bq&=\operatorname{rank}(F^*F)\\
&\le\operatorname{rank}F\le3aq.
\end{aligned}
$$

由于 $q>0$，消去 $q$ 即得 $2b\le3a$。

反过来，设 $2b\le3a$。以下指标全部从 $0$ 开始，范围为

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le\ell<3q,&\qquad0\le k<2q.
\end{aligned}
$$

用 $\mathbf1_{\{P\}}$ 表示条件 $P$ 成立时为 $1$、否则为 $0$ 的数。取左侧三张切片

$$
\begin{aligned}
(M_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(M_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(M_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}},
\end{aligned}
$$

以及右侧三张切片

$$
\begin{aligned}
(N_0)_{\ell k}&=\mathbf1_{\{\ell=k\}},\\
(N_1)_{\ell k}&=\mathbf1_{\{k<q,\ \ell=2q+k\}},\\
(N_2)_{\ell k}&=\mathbf1_{\{q\le k,\ \ell=q+k\}}.
\end{aligned}
$$

左侧后两式在 $j<a$ 时均为 $0$；其中的差 $j-a$ 只在 $j\ge a$ 时起作用，因而是非负整数差。

先看这些切片如何搬动一列。对输入指标 $(j,k)$，定义输出路由

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

这个输出确实落在规定范围内。第一分支中 $j<a$ 且 $k<2q<3q$。后两分支中令 $t=j-a$；由 $j+1\le b$ 和 $2b\le3a$ 得

$$
2(t+1)\le2(b-a)\le a.
$$

所以 $2t$、$2t+1$ 都小于 $a$，而输出第二坐标都落在 $[2q,3q)$。当 $b\le a$ 时，全部输入都走第一分支。

记输入标准基为 $E_{j,k}=e_j\otimes e_k$，输出标准基为 $U_{i,\ell}=e_i\otimes e_\ell$。当 $j<a$ 时，只有第 $0$ 项作用；当 $j\ge a$ 时，第 $0$ 项为零，第 $1$、$2$ 项再按 $k<q$ 或 $k\ge q$ 分工。因此每列恰有一个非零元，且等于 $1$：

$$
F E_{j,k}=U_{\rho(j,k)}.
$$

还要检查不同列是否会落到同一行。第一分支的输出第二坐标小于 $2q$，与后两分支不交；后两分支的输出第一坐标分别为偶数和奇数，彼此也不交。在每个分支内，输出又能唯一恢复 $j,k$：第一分支直接读出二者；第二分支由 $i=2t$、$k=\ell-2q$ 恢复；第三分支由 $i=2t+1$、$k=\ell-q$ 恢复，后两者再用 $j=a+t$。故 $\rho$ 是单射。

这就确定了完整的列 Gram，而不只是它的秩。以 $x=(j,k)$、$y=(j',k')$ 简记输入指标，并用通常的复内积（第一变量共轭线性），有

$$
\begin{aligned}
(F^*F)_{x,y}
&=\langle F E_x,F E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle\\
&=\delta_{x,y}.
\end{aligned}
$$

这里 $\delta$ 是 Kronecker 符号。把三项展开，也能逐一看见全部交叉项的去向：第 $0$ 项与另外两项的输出第二坐标区间不交，第 $1$ 项与第 $2$ 项的输出第一坐标奇偶相异，故 $r\ne s$ 时

$$
(M_r^*M_s)\otimes(N_r^*N_s)=0.
$$

每个对角项则是其输入分支上的坐标投影，而三个分支恰好分割全部输入指标。因此

$$
\begin{aligned}
F^*F
&=\sum_{r,s=0}^2(M_r^*M_s)\otimes(N_r^*N_s)\\
&=I_{2bq}.
\end{aligned}
$$

零维情形也包含在内。若 $b=0$，$F$ 没有输入列，$F^*F$ 与 $I_0$ 都是唯一的空方阵，上述等式成立，且 $2b\le3a$ 总成立。若 $a=0$，阈值迫使 $b=0$；若反而 $b>0$，则 $q>0$ 使输入维数为正而输出维数为零，必要性的秩不等式已排除此情形。完整证明由 Lean 内核检查。
:::

取 $a=2$、$b=3$、$q=1$，这六张切片就是 [@ex-bridge-two-three] 中列出的矩阵：前四个输入基向量保持其坐标，另外两个按

$$
\begin{aligned}
(2,0)&\longmapsto(0,2),\\
(2,1)&\longmapsto(1,2)
\end{aligned}
$$

补齐六个输出基向量。[@thm-bridge-native-saturation-iff] 因而是该置换例子在 $c=2q$、$d=3q$ 这一族中的全参数延伸；一般情形只需占据不同的输出坐标，不要求铺满全部输出。

在 $a<b$ 且 $2b\le3a$ 的区间，这族构造有 $3c=6q=2d$。这一等号直接来自所取的 $c=2q$、$d=3q$。定理确定的是这一固定右侧维数族中原始矩阵三元组的存在性，恒等列 Gram 由上述因子的坐标路由直接给出。这一构造本身没有证明：对于任意 $c,d$，$a<b$ 与正标量列 Gram 条件 $F^*F=\lambda I_{bc}$（$\lambda>0$）必然推出 $3c\le2d$。后文 [@thm-bridge-native-rectangular-bound] 的必要界 $2c\le d$ 使用严格阈值 $3a<2b$，其假设与这里的 $2b\le3a$ 分处阈值两侧。

右侧的两段其实不必等长。把 $c$ 个输入坐标分成长度为 $\lfloor c/2\rfloor$ 与 $\lceil c/2\rceil$ 的两段，让它们分别使用左侧的偶数槽与奇数槽，就能沿用同一套路由。因此，$c$ 为偶数、$d$ 恰好等于 $3c/2$ 都不是这一存在性构造所必需的限制；右侧只需容纳原来的 $c$ 行和长度为 $\lceil c/2\rceil$ 的余带。

::: {.theorem #thm-bridge-native-scalar-gram-exists title="第一区域内原生三项张量和的正标量列 Gram 存在性" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGram.native_scalar_gram_exists"}
对任意自然数 $a,b,c,d\in\mathbb N$，若

$$
2b\le3a,\qquad3c\le2d,
$$

则对每个满足 $\lambda>0$ 的实数 $\lambda$，存在复矩阵族

$$
\begin{aligned}
M&:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C),\\
N&:\operatorname{Fin}3\longrightarrow M_{d\times c}(\mathbb C),
\end{aligned}
$$

使原始张量和满足

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=\lambda I_{bc}.
\end{aligned}
$$

这里 $F^*$ 是共轭转置，$F$ 的行指标为 $\operatorname{Fin}a\times\operatorname{Fin}d$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}c$；$I_{bc}$ 是该列指标集上的单位矩阵，实数 $\lambda$ 经自然嵌入视为复标量。不要求 $a<b$、$c$ 的奇偶性、$d$ 取某个精确值、因子线性无关或任何维数严格为正。
:::

::: {.proof #pf-bridge-native-scalar-gram-exists}
先构造列 Gram 为单位矩阵的张量和，再作实标量缩放。令

$$
q=\lfloor c/2\rfloor,\qquad c-q=\lceil c/2\rceil.
$$

全部指标从 $0$ 开始，范围为

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le s<d,&\qquad0\le k<c.
\end{aligned}
$$

仍用 $\mathbf1_{\{P\}}$ 表示条件 $P$ 的指示数。左侧取上一构造的同三张未缩放切片，记为 $L_r$：

$$
\begin{aligned}
(L_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(L_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(L_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}}.
\end{aligned}
$$

右侧取 $d\times c$ 切片

$$
\begin{aligned}
(N_0)_{sk}&=\mathbf1_{\{s=k\}},\\
(N_1)_{sk}&=\mathbf1_{\{k<q,\ s=c+k\}},\\
(N_2)_{sk}&=\mathbf1_{\{q\le k,\ s=c+(k-q)\}}.
\end{aligned}
$$

差 $j-a$、$k-q$ 分别只在 $j\ge a$、$k\ge q$ 时起作用，均为非负整数差。对 $G=\sum_{r=0}^2L_r\otimes N_r$，这些因子给出的路由是

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

逐一检查坐标范围。若 $j\ge a$，令 $t=j-a$；由 $j+1\le b$ 和 $2b\le3a$ 得

$$
2(t+1)\le2(b-a)\le a.
$$

因此 $2t<a$ 且 $2t+1<a$。若 $b\le a$，这一余支根本没有输入，所有列都走第一分支。

右侧所需的整数界是

$$
\begin{aligned}
d&\ge\lceil3c/2\rceil\\
&=c+\lceil c/2\rceil=c+(c-q)\ge c.
\end{aligned}
$$

这恰由 $3c\le2d$ 得到。具体地，写 $c=2q+\varepsilon$，其中 $\varepsilon\in\{0,1\}$，则 $2d\ge6q+3\varepsilon$，而 $d$ 是整数，故 $d\ge3q+2\varepsilon=c+(c-q)$。第一分支有 $k<c\le d$；第二分支有

$$
c\le c+k<c+q\le c+(c-q)\le d;
$$

第三分支有

$$
c\le c+(k-q)<c+(c-q)\le d.
$$

故 $\rho(j,k)$ 总是合法的输出坐标。两段右侧输入的长度可以不同，所需余带只取其中较长的 $c-q$ 行。

令 $E_{j,k}=e_j\otimes e_k$ 为输入标准基，$U_{i,s}=e_i\otimes e_s$ 为输出标准基。当 $j<a$ 时，$L_1,L_2$ 的该列为零，只剩第 $0$ 项；当 $j\ge a$ 时，因 $i<a$ 而有 $(L_0)_{ij}=0$，另外两项又由 $k<q$ 与 $q\le k$ 分开。因此每列恰有一个非零元，等于 $1$，且

$$
G E_{j,k}=U_{\rho(j,k)}.
$$

不同输入也不会相撞。第一分支的输出第二坐标小于 $c$，其余两支的第二坐标至少为 $c$。后两支虽共用右侧余带，输出第一坐标却分别为偶数与奇数，故彼此不交。在每支内部，输出 $(i,s)$ 唯一恢复输入：第一支有 $(j,k)=(i,s)$；第二支有 $j=a+i/2$、$k=s-c$；第三支有 $j=a+(i-1)/2$、$k=q+s-c$，其中除法在相应奇偶分支上都是整除。故 $\rho$ 为单射。于是对任意输入指标 $x,y$，通常的复内积给出

$$
\begin{aligned}
(G^*G)_{x,y}
&=\langle G E_x,G E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle
=\delta_{x,y}.
\end{aligned}
$$

这直接确定全部 Gram 元素。最后实际选取的原始因子为

$$
\begin{aligned}
M_r&=\sqrt{\lambda}\,L_r,\qquad N_r\ \text{保持上述取值},\\
F&=\sqrt{\lambda}\,G,\\
F^*F&=\overline{\sqrt{\lambda}}\sqrt{\lambda}\,G^*G
=\lambda I_{bc},
\end{aligned}
$$

因为 $\lambda>0$，$\sqrt{\lambda}$ 为实数且平方等于 $\lambda$。整个论证始终使用所列的 $a\times b$ 与 $d\times c$ 原始因子。

零维情形仍在两条维数前提下讨论：若 $b=0$ 或 $c=0$，输入指标集为空，$F^*F$ 与 $\lambda I_0$ 都是唯一的空方阵。若 $a=0$，$2b\le3a$ 迫使 $b=0$；若 $d=0$，$3c\le2d$ 迫使 $c=0$。也不需要 $q>0$：$c=1$ 时 $q=0$，第二分支为空，第三分支按原式工作。零矩阵或线性相关的因子无需排除。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-native-scalar-gram-odd title="奇数右输入维数的九列路由"}
取

$$
(a,b,c,d,\lambda)=(2,3,3,5,2).
$$

此时 $2b=6=3a$、$3c=9\le10=2d$，$q=1$，两段右侧输入的长度分别为 $1$ 和 $2$。原始左因子是三张 $2\times3$ 矩阵：

$$
\begin{aligned}
M_0&=\sqrt2\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\\
M_1&=\sqrt2\begin{pmatrix}0&0&1\\0&0&0\end{pmatrix},\\
M_2&=\sqrt2\begin{pmatrix}0&0&0\\0&0&1\end{pmatrix}.
\end{aligned}
$$

原始右因子都是 $5\times3$ 矩阵。$N_0$ 的非零元为 $(N_0)_{00}=(N_0)_{11}=(N_0)_{22}=1$；$N_1$ 只有 $(N_1)_{30}=1$；$N_2$ 只有 $(N_2)_{31}=(N_2)_{42}=1$，其余元素均为零。由此 $F=\sum_{r=0}^2M_r\otimes N_r$ 有 $10$ 行、$9$ 列。前六列 $(j,k)$（$j=0,1$，$k=0,1,2$）分别等于 $\sqrt2\,U_{j,k}$；其余三列为

$$
\begin{aligned}
F E_{2,0}&=\sqrt2\,U_{0,3},\\
F E_{2,1}&=\sqrt2\,U_{1,3},\\
F E_{2,2}&=\sqrt2\,U_{1,4}.
\end{aligned}
$$

九个输出坐标互异，只有输出坐标 $(0,4)$ 未被占据。因此每列范数平方为 $2$，任意两列内积为零，直接得到 $F^*F=2I_9$。这说明右侧两段不等长时，原始三项因子仍能给出精确的标量列 Gram。
:::

[@thm-bridge-native-scalar-gram-exists] 把存在性构造延伸到满足 $3c\le2d$ 的任意自然数右侧维数，但仍保留左侧前提 $2b\le3a$。它是充分条件，不把 $3c\le2d$ 宣称为任意原始因子的普遍必要条件，也没有给出全维数的充要分类。后文的必要界分别在 $3a<2b$ 下给出 $2c\le d$（[@thm-bridge-native-rectangular-bound]），在更强的 $2a<b$ 下给出 $3c\le d$（[@thm-bridge-scalar-gram-obstruction]）。这里得到的只是精确有限维原生矩阵模型中的 Gram 恒等式；它不提供近似平坦谱的误差间隙、物理实现或 RT 公式的推导。
