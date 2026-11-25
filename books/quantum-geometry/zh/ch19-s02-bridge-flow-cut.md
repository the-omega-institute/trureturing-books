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

把三道割、上界与这张置换的拼法连起来看，就是下面这部短片；锥域内最大流等于最小割，要到 19.4 节才证明。

::: {.film src="min-cut-bridge"}
**最窄的腰（2 分 29 秒）。** 一条进来六道、中间十二道、出去六道的路上，能并排开过去的车始终只有六辆：这是比方，不是证明，而且张量网络的容量是各腿维数相乘，不是相加。宽度三桥图画成一束束线：腿 $a$、$d$ 出，腿 $b$、$c$ 进，三座青色的桥连着 $M$ 与 $N$。取 $(a, b, c, d) = (2, 3, 2, 3)$，品红虚线切过出口与入口，容量都是 $6$；灰色斜虚线切过腿 $a$、三座桥与腿 $c$，容量 $3ac = 12$；最小割为 $6$。对一切自然数 $a, b, c, d$，最大流不超过最小割（[@prop-bridge-flow-cut-bound]）。六个输入随后沿桥 $0$ 直走四路，桥 $1$、桥 $2$ 各送一路，竖直落到六个不同的输出，秩为 $6$（[@ex-bridge-two-three]）；在 $0 < a \le b$、$0 < c \le d$ 且 $a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$ 时，最大流等于最小割，且都等于 $\min(ad, bc)$（[@thm-bridge-quantum-maxflow-mincut]），这里 $4 + 9 = 13 \le 18$；紫色格言只说锥内的这张图。片尾写明边界：锥外定理不断言相等，$(1, 5, 1, 5)$ 的最小割是容量为 $3$ 的桥割；秩不决定各路信号分得是否均匀；定理只讲这一张三座桥的小图，在一般张量网络里最大流可能小于最小割（文献结果，见 19.1 节）；Ryu–Takayanagi 公式是文献结果，片中没有推出它。片中数字都是屏幕上的计算。
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
\begin{aligned}
\rho(j,k)&=\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
\end{aligned}
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

在 $a<b$ 且 $2b\le3a$ 的区间，这族构造取到 $3c=6q=2d$，其中 $c=2q$、$d=3q$。后文的 [@thm-bridge-native-three-rectangular-bound] 将证明 $3c\le2d$ 对任何左侧缩维的三项正标量列 Gram 都是必要的。

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
\begin{aligned}
\rho(j,k)&=\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
\end{aligned}
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

上面的三项坐标路由在 $2b\le3a$ 与 $3c\le2d$ 时给出所需的列 Gram。对于具有正标量列 Gram 的任意三对因子，只要左侧缩维，右侧就必须满足这条界。

::: {.theorem #thm-bridge-native-three-rectangular-bound title="宽度三桥接的矩形维数界" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeThreeRectangularBound.native_three_rectangular_bound"}
设 $a,b,c,d\in\mathbb N$，取任意复矩阵 $M_r\in M_{a\times b}(\mathbb C)$、$N_r\in M_{d\times c}(\mathbb C)$（$r=0,1,2$），令 $F=\sum_{r=0}^{2} M_r\otimes N_r$。若 $\lambda>0$ 为实数，且 $F^*F=\lambda I_{bc}$、$a<b$，则 $3c\le2d$。
:::

::: {.proof #pf-bridge-native-three-rectangular-bound}
若 $c=0$，结论立即成立。否则 $a<b$ 保证 $b>0$，列 Gram 恒等式又要求 $F$ 单射，故 $a$ 和 $d$ 都为正。将 $F$ 除以 $\sqrt{\lambda}$ 得到等距映射 $\widehat F$，取它的最短张量和表示 $\widehat F=\sum_r X_r\otimes Y_r$，记项数为 $m\le3$。任一侧若有线性关系，就可吸收一个乘积项，故两组因子都线性无关。对右因子按内积 $c^{-1}\operatorname{Tr}(Y_r^*Y_s)$ 正交归一化，同时对左因子施加逆转置变换，保持张量和不变。此时对 $\widehat F^*\widehat F=I_{bc}$ 取归一化右偏迹，得到 $\sum_r X_r^*X_r=I_b$。

把左因子叠成等距映射 $Sx=(X_rx)_r$，则 $b\le ma$，排除了 $m\le1$。对系数矩阵 $T$，定义压缩 $\Phi(T)=S^*(T\otimes I_a)S$。将右因子并列成矩阵 $W=[Y_r]_r$，记 $P=W^*W$。展开 $\widehat F^*\widehat F$ 可知，对每对右输入坐标 $(\ell,j)$，残差系数矩阵 $R_{\ell j}$ 的 $(r,s)$ 元为 $(Y_r^*Y_s)_{\ell j}-\delta_{rs}\delta_{\ell j}$，且 $\Phi(R_{\ell j})=0$。压缩保持伴随，因而 $R_{\ell j}$ 的两个厄米部分都在厄米压缩核中。

非零半定系数矩阵若在核中，将它作谱分解，压缩为零就迫使某个非零系数组合 $\sum_r u_r X_r$ 为零，与线性无关矛盾。另一方面，可逆的不定厄米矩阵在 $m=2$ 或 $m=3$ 时，正、负惯性指标中较小者为 $1$。故 $T\otimes I_a$ 的任一中性子空间至多为 $a$ 维，因为它向较小的符号子空间的投影是单射。若 $\Phi(T)=0$，$S$ 的 $b$ 维像便是这样的中性子空间，与 $a<b$ 矛盾。

当 $m=2$ 时，每个非零不定厄米矩阵都可逆，故厄米压缩核为零，进而 $R_{\ell j}=0$。并列矩阵 $W$ 的 Gram 等于 $I_{2c}$，所以 $2c\le d$。当 $m=3$ 时，厄米压缩核由奇异矩阵组成。[系数核几何定理](lean:D5/S3/Quantum/Algebra/CompressionKernel/NativeThreeKernelGeometry.native_three_compression_kernel_geometry) 对这里线性无关的左因子和单射叠矩阵给出两种可能。

- 若核中的每个厄米矩阵都消去同一个单位向量 $v$，则 $R_{\ell j}v=0$。于是 $Z=\sum_s v_sY_s$ 满足 $Y_r^*Z=v_r I_c$，从而 $Z^*Z=I_c$。取 $v_i\ne0$，令 $W_r=Y_r-\overline{v_r/v_i}\,Y_i$（$r\ne i$），则两组 $W_r$ 的像都落在 $Z$ 的像的正交补中。若它们同时消去某个非零 $y$，右因子在 $y$ 上便都满足 $Y_r y=\overline{v_r/v_i}\,Y_i y$。左侧组合 $\sum_r\overline{v_r/v_i}\,X_r$ 从 $b$ 维映到 $a$ 维，必有非零核向量 $x$，于是 $\widehat F(x\otimes y)=0$，与等距性矛盾。因此两组 $W_r$ 叠起来单射，给出 $c\le2(d-c)$，即 $3c\le2d$。
- 若存在共同的二维中性平面 $L$，则对 $u,v\in L$ 有 $u^*R_{\ell j}v=0$。取 $L$ 的标准正交基作为矩阵 $V$ 的列，令 $C=V\otimes I_c$。逐个右输入坐标应用配对等式，就有 $C^*(P-I_{3c})C=0$，于是 $(WC)^*(WC)=I_{2c}$，给出 $2c\le d$，也推出 $3c\le2d$。

完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-native-scalar-gram-iff title="宽度三正标量列 Gram 的全维数充要分类" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGramClassification.native_scalar_gram_iff"}
对任意 $a,b,c,d\in\mathbb N$ 和实数 $\lambda>0$，存在复矩阵 $M_r\in M_{a\times b}(\mathbb C)$、$N_r\in M_{d\times c}(\mathbb C)$（$r=0,1,2$），使 $F=\sum_{r=0}^{2} M_r\otimes N_r$ 满足 $F^*F=\lambda I_{bc}$，当且仅当下列至少一项成立。

1. $b=0$ 或 $c=0$。
2. $b\le a$ 且 $c\le d$。
3. $a<b$，且下列三行中至少一行的全部不等式成立。

   $$
   \begin{aligned}
   2b &\le 3a, & 3c &\le 2d,\\
   3a &< 2b,\quad b\le2a, & 2c &\le d,\\
   2a &< b\le3a, & 3c &\le d.
   \end{aligned}
   $$

4. $d<c$，且下列三行中至少一行的全部不等式成立。

   $$
   \begin{aligned}
   2c &\le 3d, & 3b &\le 2a,\\
   3d &< 2c,\quad c\le2d, & 2b &\le a,\\
   2d &< c\le3d, & 3b &\le a.
   \end{aligned}
   $$

在 $0<b$ 且 $0<c$ 时，$a=0$ 或 $d=0$ 均排除实现。此时 $b>3a$ 或 $c>3d$ 也排除实现。
:::

::: {.proof #pf-bridge-native-scalar-gram-iff}
若 $b=0$ 或 $c=0$，Gram 等式两边都是唯一的空方阵，取全零因子即可。以下设 $b,c>0$。由于 $\lambda>0$，列 Gram 恒等式要求 $F$ 单射，所以 $a,d$ 必为正。若两侧均能各自嵌入输出空间，即 $b\le a$ 且 $c\le d$，维数已满足第二项。

若 $a<b$，叠映射 $x\mapsto(M_0x,M_1x,M_2x)$ 必须单射，否则其任一非零核向量与任一非零右输入向量的张量积也会落入 $F$ 的核，故 $b\le3a$。在 $2b\le3a$ 的区间，用 [@thm-bridge-native-three-rectangular-bound] 得到 $3c\le2d$。在 $3a<2b$ 且 $b\le2a$ 时，用 [@thm-bridge-native-rectangular-bound] 得到 $2c\le d$。在 $2a<b\le3a$ 时，用 [@thm-bridge-scalar-gram-obstruction] 得到 $3c\le d$。三个区间依次覆盖左侧缩维时的所有可能。

交换输入与输出各自的两个张量因子，把 $F$ 改为 $\sum_r N_r\otimes M_r$，维数改记为 $(d,c,b,a)$。输入和输出的交换都是酉置换，所以新的列 Gram 是原列 Gram 按输入置换作酉共轭。标量恒等式因此在交换前后等价。当 $d<c$，将左侧必要界应用于交换后的维数，就得到第四项。

反过来，左侧缩维的第一个区间由 [@thm-bridge-native-scalar-gram-exists] 给出构造。其余情况只需一个分块坐标嵌入。给定 $k\le3$、$b\le ka$ 和 $kc\le d$，把左输入坐标分入 $k$ 个大小至多为 $a$ 的块，每个块经自己的左矩阵嵌入同一组左输出坐标。与这个块配对的右矩阵把全部 $c$ 个输入坐标嵌入专属的 $c$ 个输出坐标。各块使用的右输出坐标互不相交，所以各输入基向量恰好映到一个输出基向量，且像两两不同。补足零项，再把左矩阵乘以 $\sqrt{\lambda}$，所得列 Gram 就是 $\lambda I_{bc}$。双侧均可嵌入时取 $k=1$，左侧缩维的后两个区间分别取 $k=2$ 和 $k=3$。右侧缩维时先按交换后的条件构造，再交换回来。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-native-four-staircase title="宽度四正标量列 Gram 的阶梯构造与大比例充要分类" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourStaircase.staircase_sufficient, D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourStaircase.native_four_scalar_gram_iff, D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourStaircase.native_four_scalar_gram_swap_iff, D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourStaircase.pure_rank_two_kernel_bound, D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourStaircase.exact_width_four_at_three_four"}
对任意 $a,b,c,d\in\mathbb N$ 和实数 $\lambda>0$，记 $G_4(a,b,c,d;\lambda)$ 为如下命题：存在 $X_r\in M_{a\times b}(\mathbb C)$、$Y_r\in M_{d\times c}(\mathbb C)$（$r=0,1,2,3$），使 $F=\sum_{r=0}^3 X_r\otimes Y_r$ 满足 $F^*F=\lambda I_{bc}$。

**八级阶梯充分条件。** 记 $\mathcal S(a,b,c,d)$ 表示下列八行中至少一行的全部不等式成立。

$$
\begin{aligned}
b &\le a, & c &\le d,\\
a &< b,\quad 3b\le4a, & 4c &\le3d,\\
4a &< 3b,\quad 2b\le3a, & 3c &\le2d,\\
3a &< 2b,\quad 3b\le5a, & 5c &\le3d,\\
5a &< 3b,\quad b\le2a, & 2c &\le d,\\
2a &< b,\quad 2b\le5a, & 5c &\le2d,\\
5a &< 2b,\quad b\le3a, & 3c &\le d,\\
3a &< b,\quad b\le4a, & 4c &\le d.
\end{aligned}
$$

若 $b=0$、$c=0$、$\mathcal S(a,b,c,d)$ 或 $\mathcal S(d,c,b,a)$ 中至少一项成立，则 $G_4(a,b,c,d;\lambda)$ 成立。

**大比例充要分类。** 若 $0<c$ 且 $2a<b$，则 $G_4(a,b,c,d;\lambda)$ 成立当且仅当下列条件成立。

$$
\begin{aligned}
&(2a<b\land 2b\le5a\land 5c\le2d)\\
{}\lor{}&(5a<2b\land b\le3a\land 3c\le d)\\
{}\lor{}&(3a<b\land b\le4a\land 4c\le d).
\end{aligned}
$$

若 $0<b$ 且 $2d<c$，则 $G_4(a,b,c,d;\lambda)$ 成立当且仅当下列条件成立。

$$
\begin{aligned}
&(2d<c\land 2c\le5d\land 5b\le2a)\\
{}\lor{}&(5d<2c\land c\le3d\land 3b\le a)\\
{}\lor{}&(3d<c\land c\le4d\land 4b\le a).
\end{aligned}
$$

两条等价都允许 $a$ 或 $d$ 为零。

**纯秩二核的必要界。** 对上述尺寸的任意四对因子，令 $Sx=(X_rx)_r$，并对 $T\in M_4(\mathbb C)$ 定义 $\Phi(T)=S^*(T\otimes I_a)S$。若 $a<b$、左因子线性无关、$F^*F=I_{bc}$、$\sum_r X_r^*X_r=I_b$，且每个满足 $\Phi(T)=0$ 的非零厄米矩阵 $T$ 的秩均为 $2$，则 $4c\le3d$。

**精确最小宽度。** 在 $(3,4,3,4)$，对每个 $\lambda>0$，四项可实现 $F^*F=\lambda I_{bc}$，而三项不可实现。更短的和可补零成为三项和，故最小宽度为四。
:::

::: {.proof #pf-bridge-native-four-staircase}
宽度四在小比例区间 $a<b\le2a$ 的一般必要条件仍有待确定。例如，$(4,5,4,5)$、$(5,6,4,5)$ 和 $(5,6,5,6)$ 是否能用四项实现正标量列 Gram，仍是开放问题。

若 $b=0$ 或 $c=0$，取零因子即可。其余情形把输入坐标划分为至多四个矩形，分别沿两个坐标方向平移到输出网格内互不相交的矩形。每个平移由一项 Kronecker 积给出，因子在对应输入区间外为零。所得和把输入基向量送到互异的输出基向量，补零至四项，再把左因子乘以 $\sqrt{\lambda}$ 即得所需 Gram。交换两个 Kronecker 因子只置换输入、输出坐标，因而保持标量列 Gram，并把维数换成 $(d,c,b,a)$。

- 在阶梯中满足 $b\le ka$、$kc\le d$ 的各行，取对应的 $k\in\{1,2,3,4\}$，每个至多含 $a$ 个左输入坐标的块独占一段长 $c$ 的右输出。
- 在 $4/3$ 和 $3/2$ 两级，先放入一个 $a\times c$ 块。余下输入宽 $e=b-a$，按右输入坐标切成长度至多为 $s=d-c$ 的至多三段或两段，再沿左输出方向并排放入宽 $a$、高 $s$ 的空余矩形。两级的不等式分别保证 $3e\le a$、$c\le3s$ 或 $2e\le a$、$c\le2s$。
- 在 $5/3$ 一级，若 $2c\le d$，用两个整块。否则，放入首个 $a\times c$ 块后，将余下输入的 $e\times s$ 矩形移入空余矩形。余下高度为 $c-s$ 的部分沿左输入方向切成宽至多 $a-e$ 的两片，再在空余矩形的剩余宽度内上下叠放。这里 $3e\le2a$ 且 $2(c-s)\le s$。
- 在 $5/2$ 一级，先用两段长 $c$ 的右输出放入两个 $a\times c$ 块。剩余输入宽 $b-2a$，沿右输入方向切成至多两片，并排放入宽 $a$、高 $d-2c$ 的区域。条件 $2(b-2a)\le a$、$c\le2(d-2c)$ 保证两片都能放下。

证明左侧大比例情形的必要性时，先将 $F$ 除以 $\sqrt{\lambda}$。因 $c>0$，左叠映射的非零核向量与任一非零右输入向量的张量积会落入 $F$ 的核，故左叠映射必须单射，且 $b\le4a$。若任一组因子线性相关，吸收一项后由 [@thm-bridge-scalar-gram-obstruction] 得 $3c\le d$，而三项左叠映射还给出 $b\le3a$。

若两组因子都线性无关，按前面的归一化右偏迹论证正交归一化右因子，并对左因子作逆转置变换，使 $\sum_r X_r^*X_r=I_b$。展开 $F^*F=I_{bc}$，可知残差系数矩阵 $R_{\ell j}$（其 $(r,s)$ 元为 $(Y_r^*Y_s)_{\ell j}-\delta_{rs}\delta_{\ell j}$）满足 $\Phi(R_{\ell j})=0$。压缩保持伴随，因而可分别对 $R_{\ell j}$ 的两个厄米部分应用核的几何性质。对零压缩的厄米矩阵，其非正特征方向上的投影在 $S$ 的像上单射，因为投影为零的非零向量会有严格正的二次型值。对矩阵取负再应用同一论证，得到另一侧符号的界。所以 $2a<b$ 时至多各有一个正、负特征值，$3a<b$ 时核为零。见[厄米秩界](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourKernel.hermitian_rank_bound)。

当厄米核的元素秩均至多为 $2$ 时，[系数核几何定理](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourKernel.coefficient_geometry) 给出以下三种可能。

- 若厄米核为零，则 $R_{\ell j}=0$，四个右因子是像两两正交的等距嵌入，故 $4c\le d$。
- 若有共同的三维中性子空间，取其标准正交基作系数来组合右因子。对每个 $R_{\ell j}$，在该子空间上的压缩为零，故三个组合也是像两两正交的等距嵌入，给出 $3c\le d$。
- 若存在共同核单位向量 $v$，则 $R_{\ell j}v=0$，故 $Z=\sum_r v_rY_r$ 满足 $Y_r^*Z=v_r I_c$ 和 $Z^*Z=I_c$。写 $Y_r=\bar v_r Z+W_r$，则 $W_r$ 的像落在 $Z$ 的像的正交补，且 $\sum_r v_r W_r=0$。令 $U=\sum_r\bar v_r X_r$。将左输入限制在 $\ker U$，维数 $p\ge b-a$，则 $U\otimes Z$ 消失，余下的和由于右因子的线性关系可写成三项。用正交基表示该限制及右输出的正交补，得到维数 $(a,p,c,d-c)$ 上的等距映射。

在共同核情形，$2a<b$ 保证 $a<p$，故 [@thm-bridge-native-three-rectangular-bound] 给出 $3c\le2(d-c)$，即 $5c\le2d$。若 $5a<2b$，则 $3a<2p$，由 [@thm-bridge-native-rectangular-bound] 得 $2c\le d-c$，即 $3c\le d$。其余情形已给出至少同样强的界，且 $3a<b$ 时核为零，必有 $4c\le d$。各上端点保留等号，充分性由阶梯的最后三行给出。交换因子得到右侧的大比例等价。

在纯秩二核的假设下，可直接使用上述三种核情形。共同核情形只需 $a<b$，此时 $p>0$，交换因子后用三项叠映射的单射性得 $c\le3(d-c)$，即 $4c\le3d$。另两种情形的界也推出此不等式。

在 $(3,4,3,4)$，$4/3$ 一级的两个上界都取等，所以四项可实现。三项必要界在此要求 $9\le8$，故不存在三项实现。完整证明由 Lean 内核检查。
:::

纯秩二只是压缩核的一种情形。还可以从整个核的矩阵结构，或从核内单个秩三矩阵，分别推出右侧维数的限制。

::: {.theorem #thm-bridge-native-four-clifford-rank-three title="宽度四的 Pauli–Clifford 压缩核与秩三压缩核维数界" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourCliffordRankThree.clifford_kernel_four_bound, D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourRankThree.rank_three_small_defect_four_bound"}
设 $a,b,c,d\in\mathbb N$ 且 $a<b$。任取 $X\colon\operatorname{Fin}4\to M_{a\times b}(\mathbb C)$、$Y\colon\operatorname{Fin}4\to M_{d\times c}(\mathbb C)$ 和实数 $\lambda>0$，使 $F=\sum_{i=0}^3 X_i\otimes Y_i$ 满足 $F^*F=\lambda I_{bc}$。对厄米矩阵 $T\in M_4(\mathbb C)$，记 $\operatorname{compression}(X,T)=\sum_{i,j=0}^3 T_{ij}X_i^*X_j$。

1. **Pauli–Clifford 压缩核。** 若存在 $P\in\operatorname{GL}_4(\mathbb C)$，使每个满足 $\operatorname{compression}(X,T)=0$ 的厄米矩阵 $T$ 经合同变换所得的 $P^*TP$ 都属于

   $$
   \operatorname{span}_{\mathbb R}\{\sigma_x\otimes I_2,\ \sigma_y\otimes I_2,\ \sigma_z\otimes\sigma_x,\ \sigma_z\otimes\sigma_y,\ \sigma_z\otimes\sigma_z\},
   $$

   则 $4c\le3d$。这里 $\sigma_x,\sigma_y,\sigma_z$ 为 Pauli 矩阵，这五个张量积正是 [pauliClifford](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeFourCliffordRankThree.pauliClifford)。
2. **秩三厄米压缩核元。** 若存在厄米矩阵 $T$，使 $\operatorname{compression}(X,T)=0$ 且 $\operatorname{rank}T=3$，则 $6c\le5d$。若还满足行亏量条件 $ad-bc<2c-d$，则 $4c\le3d$。这里的减法均为自然数减法，负差截为零。
:::

::: {.proof #pf-bridge-native-four-clifford-rank-three}
当 $c=0$ 时，各界直接成立。若右因子线性相关，可以吸收一项，再由 [@thm-bridge-native-three-rectangular-bound] 得到 $3c\le2d$，足以推出各界。以下设 $c>0$ 且右因子线性无关。

**第 1 项。** 把右 Gram 的每对输入坐标 $(\ell,m)$ 对应的系数矩阵记为 $G_{\ell m}=((Y_i^*Y_j)_{\ell m})_{ij}$，令 $H=c^{-1}\sum_\ell G_{\ell\ell}$。展开 $F^*F$ 可知 $G_{\ell m}-\delta_{\ell m}H$ 的压缩为零。把它分成两个厄米部分，再施加合同变换并重排基，所得偏差落在 Pauli–Clifford 张成空间的复化中。其两个 $2\times2$ 对角块是符号相反的标量块，两个非对角块的元素也成对相联。

右因子线性无关使 $H$ 正定。分别用保留上述块关系的酉变换对角化合同变换后 $H$ 的两个对角块。新右因子 $A,B$ 与 $C,D$ 在各自的配对内像互相正交。记两对中较小的 Gram 矩阵为 $M,N$。相反的偏差抵消，故 $M+N$ 是单位阵的正倍数，从而 $\operatorname{rank}M+\operatorname{rank}N\ge c$。一对的对角系数若有严格差距，较大的 Gram 正定，该对的秩之和等于 $c$ 加上较小的秩。系数相等时，该对的秩之和是较小秩的两倍。两对的秩之和各自至多为 $d$。只要有一对存在严格差距，合并这两个界及 $\operatorname{rank}M+\operatorname{rank}N\ge c$ 即得 $4c\le3d$。

若两对的差距都为零，且 $M$ 可逆，则第一对已给出 $2c\le d$。否则，取到共同核 $\ker M$ 的投影 $\Pi$。在非零核向量上检验非对角块的配对关系，消去其中的标量恒等项。于是 $C\Pi,D\Pi$ 的像均垂直于第一对的像。由于 $M+N$ 是单位阵的正倍数，第二对在 $\ker M$ 上单射，因此 $A+C\Pi$ 与 $B+D\Pi$ 都单射，且像互相正交，仍得 $2c\le d$。

**第 2 项。** 先缩放使 $F^*F=I_{bc}$，再归一化左叠映射并对角化秩三核元。调换次序及整体符号后，压缩关系可写成 $rX_0^*X_0=sX_1^*X_1+tX_2^*X_2$，其中 $s,t>0$。因此 $\ker X_0\subseteq\ker X_1\cap\ker X_2$，而 $X_3$ 在 $\ker X_0$ 上单射。由于 $a<b$，$X_3(\ker X_0)$ 与 $\operatorname{im}X_0$ 有非零交。用这个交中的向量在左输入侧配对，Gram 恒等式给出右等距因子 $J=Y_3$ 以及前三个右因子的一个非平凡组合 $V$，满足 $J^*V=0$。所以 $\operatorname{rank}V\le d-c$。把 $V$ 选为一个右因子，再把右输入限制到 $E=\ker V$，其维数 $e\ge2c-d$。剩下至多三项，由宽度三的界得 $3e\le2d$，从而 $6c\le5d$。

若 $4c>3d$，则 $d<2e$。宽度三的核几何在这里排除了中性平面情形，因为该情形要求 $2e\le d$。在共同核情形，$J|_E$ 与共同核给出的右等距方向若线性无关，便能正交化成两个等距方向，同样要求 $2e\le d$。因此另两个右因子在 $E$ 上与 $J|_E$ 的交叉 Gram 都是标量矩阵。把这两个标量分量吸收到与 $J$ 配对的左因子后，$E$ 上的两个剩余右因子的像均垂直于 $J(E)$，且彼此线性无关，因为 $a<b$ 时两项等距实现要求 $2e\le d$。

记与 $J$ 配对的左因子为 $L$。在限制到 $E$ 后，两项余项的 Gram 为 $(I_b-L^*L)\otimes I_e$。两个右因子的任一线性组合的像都落在维数 $d-e<e$ 的空间中，故有非零核。对输入的乘积向量应用该 Gram 恒等式可知，两个剩余左因子的任一非平凡组合的核都包含在 $\ker(I_b-L^*L)$ 中。另一方面，$F$ 的等距性使交叉 Gram 的任一非零系数给出一个这样的左组合，其像垂直于 $L(\ker(I_b-L^*L))$。后者的维数等于 $\dim\ker(I_b-L^*L)$，由 $a<b$，两项维数要求矛盾。因此整个右输出切片 $J(E)$ 只接收与 $J$ 配对的项。

在左输出与 $J(E)$ 的张量积上压缩行亏投影 $I_{ad}-FF^*$，得到 $(I_a-LL^*)\otimes I_e$。因为 $ad-bc<2c-d\le e$，只有 $LL^*=I_a$ 才能满足秩界。在 $\operatorname{im}L^*$ 上，另两个左因子因其右因子在 $E$ 上线性无关而消失。此时等距性及 $J^*V=0$ 也使与 $V$ 配对的项在该空间上消失。投影到右输出中 $\operatorname{im}J$ 的正交补后，余下三项各自的秩至多为 $(b-a)(d-c)$。投影后的列空间与压缩后的行亏投影的像共同张成该输出空间，故

$$
a(d-c)\le ad-bc+3(b-a)(d-c).
$$

整理并消去 $b-a>0$，得到 $c\le3(d-c)$，与 $4c>3d$ 矛盾。完整证明由 Lean 内核检查。
:::

在 $(4,5,4,5)$、$(5,6,4,5)$ 和 $(5,6,5,6)$，行亏量 $ad-bc$ 分别为 $0,1,0$，低于各自的阈值 $2c-d=3,3,4$，而三组尺寸都满足 $4c>3d$。因此第 2 项逐一排除了含秩三厄米矩阵的压缩核，第 1 项也排除了可合同嵌入 Pauli–Clifford 张成空间的压缩核。秩二与秩四混合的厄米压缩核、小比例区间 $a<b\le2a$ 的一般必要条件，以及这三组尺寸的四项实现问题仍然开放。

对 $k\ge1$，族 $(2k,5k,2k,5k)$ 落在左侧缩维的第三区间，但 $3c=6k>d=5k$，故宽度三下的精确平坦谱无法达到。对这族维数，归一化列 Gram 的熵与最大值之间还有一个与 $k$ 无关的下界。

**宽度三桥接的一致平坦谱熵隙（手工推导）。** 设 $k\ge1$ 为整数，$(a,b,c,d)=(2k,5k,2k,5k)$，$D=bc=10k^2$，$F=\sum_{r=1}^3 M_r\otimes N_r\ne0$。归一化 $\rho_{BC}=F^*F/\operatorname{Tr}(F^*F)$，记 $G=D\rho_{BC}$ 与 $\eta=\|G-I_D\|_1/D$，其中 $\|\cdot\|_1$ 是迹范数。若至多用 $2$ 项，则 $\operatorname{rank}F\le 2ac=8k^2$，故 $G-I_D$ 的负部迹至少为 $2k^2$。由于该矩阵无迹，$\eta\ge 2/5$。

否则取最短的三项表示。右因子线性无关，可改变基并把逆变换吸收到左因子，使 $\operatorname{Tr}(N_r^*N_s)=c\delta_{rs}$。缩放 $F$ 使 $G=F^*F$，设 $Sx=(M_rx)_{r=1}^3$、$B=S^*S=c^{-1}\operatorname{Tr}_C G$ 和 $T=(N_r^*N_s)_{r,s=1}^3-I_{3c}$。右因子拼接矩阵至多有 $d$ 个独立行，其 Gram 矩阵有迹 $3c$，因此 $\|T\|_1\ge2(3c-d)=2k$。偏迹对厄米矩阵收缩迹范数，因为其对偶 $X\mapsto X\otimes I_c$ 保持算子范数，所以 $\|B-I_b\|_1\le b\eta$。又 $\operatorname{Tr}B=b$，故 $B$ 小于 $1/2$ 的特征值至多有 $b\eta$ 个。记其余特征空间为 $E$。当 $\eta\ge1/5$ 时结论已成立。否则令 $J=(B|_E)^{-1/2}$ 与 $W=S|_EJ$，则 $W$ 等距且 $\|J\|\le\sqrt2$。用 $J\otimes I_c$ 压缩并共轭 $G-B\otimes I_c$，所得算子迹范数至多为 $2\|G-B\otimes I_c\|_1\le4D\eta$。

对每个单位向量 $z\in\mathbb C^3$，$W(E)\cap(z\otimes\mathbb C^a)$ 的维数至少为 $\dim E-2a\ge k(1-5\eta)$。限制到该交空间的原像，上述算子是重复块 $I\otimes Q(z)$，其中 $Q(z)=\sum_{r,s}\bar z_rz_s T_{rs}$。令 $\widetilde F=F\rvert_{E\otimes\mathbb C^c}(J\otimes I_c)$，则限制到上述原像之前的算子为 $\widetilde F^*\widetilde F-I_E\otimes I_c$。当 $Wx=z\otimes u$ 时，$\widetilde F(x\otimes y)=u\otimes\sum_r z_rN_ry$，得到该重复块。因此 $\|Q(z)\|_1\le L=4D\eta/[k(1-5\eta)]$。取 $z=e_r$ 给出对角块界 $L$。取 $(e_r\pm e_s)/\sqrt2$ 与 $(e_r\pm i e_s)/\sqrt2$，分别相减并合并，给出非对角块界 $2L$。三块对角加六块非对角，得到

$$
\begin{aligned}
2k &\le\|T\|_1\le15L=\frac{600k\eta}{1-5\eta},\\
\eta &\ge\frac1{305}.
\end{aligned}
$$

对 $\rho_{BC}$ 的本征值与均匀分布应用 Pinsker 不等式，以自然对数计，有 $\log D-S(\rho_{BC})\ge\eta^2/2\ge 1/186050$。在 $(2k,5k,2k,5k)$ 上，两个方形 Gram 矩阵 $F^*F$ 与 $FF^*$ 同为 $D$ 阶，非零谱相同，故两侧归一化态均有此熵隙。见论文二附录 *Tensor-network results used for cap entropies* 中的 *Uniform entropy gap for width-three bridges*。一般维数下，若宽度三的流 $F\ne0$ 且 $q=\operatorname{QMinCut}(a,b,c,d)<D=bc$，则 $1\le R=\operatorname{rank}F\le q$。设 $p_i$ 为 $\rho_{BC}$ 的非零本征值，由 Cauchy–Schwarz 不等式得 $\sum_i p_i^2\ge1/R\ge1/q$，故

$$
\lVert D\rho_{BC}-I_D\rVert_{\mathrm F}^2 =D^2\sum_i p_i^2-D\ge\frac{D(D-q)}{q}.
$$

支撑上的均匀分布使熵最大，故 $\log D-S(\rho_{BC})\ge\log(D/q)$。两条只依赖秩的界均在 $R=q$ 且非零谱均匀时取等。
