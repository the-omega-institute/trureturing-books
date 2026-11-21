# 19.4 从离散桥图到 RT 文献边界 {#sec-rt-literature-bridge}

在确立了任意参数下的上界 $\operatorname{QMaxFlow} \le \operatorname{QMinCut}$（[@prop-bridge-flow-cut-bound]）以及锥域内的最小割化简 $\operatorname{QMinCut} = \min(ad, bc)$（[@cor-bridge-cone-mincut]）之后，最后一步硬骨头是反方向的下界：在有序锥域 $0 < a \le b$、$0 < c \le d$ 且 $a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$ 内，能否总是显式构造出三对矩阵 $(M, N)$，使 $\operatorname{flow}(M, N)$ 的秩精确达到 $\min(ad, bc)$？

Lean 的 `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowMinCut` 模块给出了肯定的形式化证明。在源码中，目标命题 `claim` 展开为对全部六个前提条件的全称蕴含，并由主定理 [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 彻底锁定。

::: {.theorem #thm-bridge-quantum-maxflow-mincut title="离散桥图量子最大流最小割" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
对任意自然数 $a, b, c, d \in \mathbb{N}$，若同时满足正性与顺序条件 $0 < a$、$a \le b$、$0 < c$、$c \le d$ 以及二次锥条件

$$
a^2 + b^2 \le 3ab \qquad\text{与}\qquad c^2 + d^2 \le 3cd,
$$

则宽度三桥图的量子最大流与量子最小割相等，且同时等于外边界割容量：

$$
\operatorname{QMaxFlow}(a, b, c, d) = \operatorname{QMinCut}(a, b, c, d) \qquad\text{且}\qquad \operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$

:::

::: proof
第二项等式 $\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc)$ 直接由 [@cor-bridge-cone-mincut] 给出，而上界 $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d)$ 已由 [@prop-bridge-flow-cut-bound] 确立。为证核心等式 $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$，模块 [`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 中的 `claim_of_hypotheses` 对外腿维数之和 $n = b + d$ 施加强归纳法（`Nat.strong_induction_on`）：

1. **等宽与混合宽度区间的显式有理证人（`widthTwo_proved`）**：当 $a = b$ 或 $c = d$（`square_left`、`square_right`），或一侧处于大比值区间而另一侧处于小比值区间（$2a \le b \land d \le 2c$ 的 `mixed_left`，及由转置对偶 `witness_swap` 诱导的 $b \le 2a \land 2c \le d$ 的 `mixed_right`）时，直接用分块部分单位矩阵构造有理矩阵证人（`RationalWitness`），在 $\operatorname{flow}(M, N)$ 中嵌出阶数为 $\min(ad, bc)$ 的单位子矩阵；
2. **双小比值基底区间（`base_witness`）**：当 $a < b < 2a$ 且 $c < d < 2c$ 时，调用基底模块构造满秩有理证人；
3. **双大比值区间的二次锥同步无穷递降（`cone_descent` 与 `full_rank_of_descent`）**：当 $2a \le b$ 且 $2c \le d$ 时，利用整系数恒等式 $(3a - b)^2 + a^2 - 3(3a - b)a = a^2 + b^2 - 3ab \le 0$，将四元组映射为严格更小的锥域四元组 $(a', b', c', d') = (3a - b,\, a,\, 3c - d,\, c)$（其外腿和 $b' + d' = a + c < b + d$）。由归纳假设知较小四元组达到满秩 $\min((3a-b)c,\, a(3c-d))$，再结合移位易位亏格守恒恒等式（`castling_proved`：$u y - \operatorname{QMaxFlow}(u, x, v, y) = x(3y - v) - \operatorname{QMaxFlow}(x, 3x - u, y, 3y - v)$）与割容量平衡关系 $(3a - b)c + bc = a(3c - d) + ad$，推出原四元组 $(a, b, c, d)$ 的亏格为零，即 $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$。

完整证明由 Lean 内核检查。
:::

请务必看清 [@thm-bridge-quantum-maxflow-mincut] 的严格适用范围：

- 定理中的“桥图”并非附加的抽象几何类型，而是特指由三路克罗内克积求和定义的显式矩阵收缩 $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$；
- 等式 $\operatorname{QMaxFlow} = \operatorname{QMinCut} = \min(ad, bc)$ 严格依赖于桥宽 $\operatorname{Fin} 3$ 以及显式列出的正性、顺序与二次锥不等式（$0 < a \le b$，$0 < c \le d$，$a^2 + b^2 \le 3ab$，$c^2 + d^2 \le 3cd$）；
- 该定理**不能**无条件推广到任意拓扑的张量网络、完整的 MERA 多尺度重整化树、连续统 AdS/CFT 对偶或 Ryu–Takayanagi 极小曲面公式。

[@thm-bridge-quantum-maxflow-mincut] 确定的是可达秩，而不是奇异值的分布。设非零桥流 $F$ 的非零奇异值为 $\sigma_1,\ldots,\sigma_R$；将它作为行、列两侧的纯态振幅矩阵归一化后，施密特权重为 $p_j=\sigma_j^2/\sum_k\sigma_k^2$。秩只数有多少个 $p_j$ 非零；纠缠熵达到 $\ln R$ 还要求它们全部等于 $1/R$。[@ex-bridge-two-three] 的置换矩阵恰好兼具满秩与平坦谱，但秩定理本身没有保证每组允许维数都能如此。

仍按 19.1 节的原始分组，取 $M_r\in M_{a\times b}(\mathbb C)$、$N_r\in M_{d\times c}(\mathbb C)$，并令

$$
F=\sum_{r=0}^2 M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow
\mathbb C^a\otimes\mathbb C^d.
$$

这里 $F^*$ 表示共轭转置。比秩可达更强的要求，是存在同一组矩阵族 $M,N$ 和同一个正实数 $\lambda$，使

$$
\begin{aligned}
bc\le ad&\ \Longrightarrow\ F^*F=\lambda I_{bc},\\
ad\le bc&\ \Longrightarrow\ FF^*=\lambda I_{ad}.
\end{aligned}
$$

它们分别要求列或行构成范数为 $\sqrt{\lambda}$ 的正交族，使较小一侧的奇异值全部等于 $\sqrt{\lambda}$。在接缝 $ad=bc$ 上，两项蕴含同时生效，使用的是同一个 $F$ 与同一个 $\lambda$。下面的必要条件说明，这种加强受到秩本身看不见的限制。

先看结论中 $2c$ 的几何含义。当 $c=1$，若能从右侧因子中组合出 $y_0,y_1\in\mathbb C^d$，满足 $y_0^*y_0=y_1^*y_1=1$、$y_0^*y_1=0$，就必须有 $d\ge2$。推广到一般 $c$，所需的是两个等距映射 $J_0,J_1:\mathbb C^c\to\mathbb C^d$，满足 $J_\alpha^*J_\beta=\delta_{\alpha\beta}I_c$：两个 $c$ 维像彼此正交，因而 $d\ge2c$。下面先找出共同的两个系数方向，再从原始 Gram 恒等式导出这样的映射。

::: {.theorem #thm-bridge-common-coefficient-plane title="所有 Hermitian 系数核的共同复二维中性平面" lean="D5/S3/Quantum/Algebra/GenericCommonCoefficientPlane.common_plane"}
设 $a,b\in\mathbb N$ 满足严格阈值 $3a<2b$。令

$$
X:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C)
$$

是复线性无关的三元组，并令系数指标在前的堆叠 $S=\operatorname{stack}(X)$（行指标为 $(r,i)\in\operatorname{Fin}3\times\operatorname{Fin}a$）满足 $S$ 的线性映射是单射。则存在复二维子空间 $L\subset\mathbb C^3$，使得对每个 Hermitian 系数矩阵 $T\in M_3(\mathbb C)$，只要

$$
S^*(T\otimes I_a)S=0,
$$

就有完整的复半双线性配对

$$
u^*Tv=0\qquad(u,v\in L).
$$

这里的量词包含 Hermitian 系数核只有零矩阵的情形；定理没有另加非零核、签名或正性假设。
:::

::: proof
记

$$
\Phi_X(T)=S^*(T\otimes I_a)S=\sum_{r,s}T_{rs}X_r^*X_s,
$$

即源码的 [compression](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression) 与 [compression_eq_sum](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression_eq_sum)。两次乘积秩下界给出 $\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(3a-b)$。若 $\Phi_X(T)=0$ 且 $\operatorname{rank}T=3$，便有 $2b\le3a$，矛盾，所以每个系数核矩阵的秩至多为 $2$。若 $T$ 半正定，将它写成 $C^*C$，对 $\Phi_X(T)=0$ 取迹得到若干矩阵范数平方之和为零，迫使 $C$ 的每行给出 $\sum_r C_{jr}X_r=0$；独立性使 $C=0$。对 $-T$ 同理。因此每个非零 Hermitian 核形式都有一正、一负和一个零特征值。

若 Hermitian 核只有零矩阵，任意复二维平面都满足结论。否则，对一个非零核形式作可逆伴随合同，将其化为 $\operatorname{diag}(1,-1,0)$，并配对变换 $X$；独立性和堆叠单射性均保留。以下暂在这组坐标中工作。等列 Gram $X_0^*X_0=X_1^*X_1$ 给出 $X_1=UX_0$，其中 $U$ 是余域 $\mathbb C^a$ 上的酉矩阵。令

$$
\begin{aligned}
D&=\operatorname{range}X_0,& E&=X_2(\ker X_0),\\
r&=\dim D,&s&=\dim E.
\end{aligned}
$$

堆叠单射性使 $X_2$ 在 $\ker X_0$ 上单射，故 $r+s=b$；由 $r,s\le a$ 与 $3a<2b$ 得 $2r>a$。对任意 Hermitian 核形式 $Q$，在 $\ker X_0$ 上配对先得到 $Q_{22}=0$，再在任意输入向量间配对得到

$$
(Q_{20}I_a+Q_{21}U)D\perp E.
$$

若某个 $Q$ 的交叉系数不全为零，记 $K=Q_{20}I_a+Q_{21}U$。上式给出 $\dim\ker(K|_D)\ge r+s-a=b-a$，所以

$$
\dim\bigl(\ker(K|_D)\cap E\bigr)\ge b+s-2a\ge2b-3a>0.
$$

取其中非零 $v$，则 $Q_{21}\ne0$，且 $Uv=wv$，其中 $w=-Q_{20}/Q_{21}$、$|w|=1$。把同一个 $v\in D\cap E$ 代入每个核形式的交叉关系，得到所有形式共有的 $Q_{20}+wQ_{21}=0$；取 $v$ 在 $X_0$ 下的原像再配对，得到 $(1,w,0)^*Q(1,w,0)=0$。

若所有交叉系数都为零，令

$$
A(Q)=(Q_{00}+Q_{11})I_a+Q_{01}U+Q_{10}U^*.
$$

由 $X_0^*A(Q)X_0=0$ 与 $2r>a$，每个 $A(Q)$ 都奇异。一次对角化同一个 $U$ 后，这些对角元是 Hermitian 核这个实向量空间上的有限个实线性泛函。它们的零空间覆盖整个核；实向量空间不可能被有限个真线性子空间覆盖，故至少一个固定对角元对整个核恒为零。它的酉特征值给出同一个单位相位 $w$，也使 $(1,w,0)^*Q(1,w,0)=0$ 对所有 $Q$ 成立。

两种分支都使 $L=\operatorname{span}_{\mathbb C}\{(0,0,1),(1,w,0)\}$ 上的四个基向量配对全部为零：用到 $Q_{22}=0$、交叉关系、其共轭与最后的二次关系。由共轭线性与线性延拓，完整的 $u^*Qv$ 对任意 $u,v\in L$ 为零。可逆系数合同把这一共同平面运回原坐标，保持复维数与完整配对。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-native-rectangular-bound title="原生三项矩形张量和的列 Gram 维数界" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeRectangularBound.bound"}
对任意自然数 $a,b,c,d$，任取复矩阵族

$$
M_r\in M_{a\times b}(\mathbb C),\qquad N_r\in M_{d\times c}(\mathbb C)\qquad(r=0,1,2),
$$

令原始收缩（行指标为 $\operatorname{Fin}a\times\operatorname{Fin}d$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}c$）

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow\mathbb C^a\otimes\mathbb C^d.
$$

若 $\lambda\in\mathbb R$ 满足 $\lambda>0$，且

$$
F^*F=\lambda I_{bc},\qquad 3a<2b,
$$

则

$$
2c\le d.
$$

不要求原始三元组独立、白化或归一化，也不加维数正性、顺序或二次锥条件；所有自然维数都在量词内，包括零维情形。
:::

::: proof
若 $c=0$，结论为 $0\le d$。以下设 $c>0$；严格阈值给出 $b>0$。若 $a=0$ 或 $d=0$，$F$ 的所有列为零，与 $F^*F=\lambda I_{bc}$ 矛盾；$b=0$ 则不满足阈值。因此没有暗中删去任何零维情形。另在更强的 $2a<b$ 区间，下面的 [@thm-bridge-scalar-gram-obstruction] 已给出更强结论 $3c\le d$；以下解释一般的 $2c\le d$ 机制。

把同一个 $F$ 写成项数最少的精确张量和，记为 $\sum_{r<k}A_r^{(0)}\otimes D_r$，其中 $0\le k\le3$。若任一侧因子线性相关，从非零系数关系解出一个因子并把该项吸收到其余项，就可减少宽度。因此最小分解两侧各自复线性无关。令 $A_r=A_r^{(0)}/\sqrt\lambda$，得到

$$
\widehat F=\frac{F}{\sqrt\lambda}=\sum_{r<k}A_r\otimes D_r,\qquad
\widehat F^*\widehat F=I_{bc}.
$$

这是对原始假设的推导，不是附加的独立性或归一化前提。

对 $c>0$，右侧独立性使归一 Hilbert–Schmidt Gram

$$
H_{rs}=\frac1c\Tr(D_r^*D_s)
$$

正定：$z^*Hz=c^{-1}\|\sum_r z_rD_r\|_{\mathrm{HS}}^2$，非零 $z$ 时严格为正。故 $H=B^*B$，其中 $B$ 可逆。作配对的系数白化

$$
\begin{aligned}
X_r&=\sum_sB_{rs}A_s,\\
Y_r&=\sum_s(B^{-T})_{rs}D_s,\\
B^{-T}&=(B^T)^{-1}.
\end{aligned}
$$

这里用逆转置，因为张量和的系数配对是双线性的：$B^TB^{-T}=I_k$ 保证 $\sum_rX_r\otimes Y_r=\widehat F$。这一步不改变已归一的收缩，也保留因子独立性。对 $\widehat F^*\widehat F=I_b\otimes I_c$ 的第二因子取偏迹并除以 $c$，有

$$
\begin{aligned}
\sum_{r,s}H_{rs}A_r^*A_s&=I_b,\\
\sum_rX_r^*X_r&=I_b.
\end{aligned}
$$

因此系数在前的堆叠 $S:\mathbb C^b\to\mathbb C^k\otimes\mathbb C^a$ 满足 $S^*S=I_b$，给出单射及 $b\le ka$。宽度 $k=0,1$ 都与 $b>a$ 矛盾。

对余下的 $k=2,3$，定义压缩与每个右侧指标对的 Gram 缺陷

$$
\begin{aligned}
\Phi_X(T)&=S^*(T\otimes I_a)S
=\sum_{r,s}T_{rs}X_r^*X_s,\\
(G_{\ell m})_{rs}&=(Y_r^*Y_s)_{\ell m},\\
R_{\ell m}&=G_{\ell m}-\delta_{\ell m}I_k
\qquad(0\le\ell,m<c).
\end{aligned}
$$

这里 $\delta$ 为 Kronecker 符号，所有复右 Gram 缺陷统一为 $R=G-\delta I$。展开 $\widehat F^*\widehat F=I_{bc}$，取第二因子的 $(\ell,m)$ 矩阵元，再减去 $\delta_{\ell m}\sum_rX_r^*X_r$，就得 $\Phi_X(R_{\ell m})=0$。

$k=2$ 时，$\operatorname{rank}S=b$。两次乘积秩下界给出

$$
\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(2a-b).
$$

若非零 $T$ 的压缩为零，则 $\operatorname{rank}T\ge1$ 迫使 $2b\le3a$，矛盾。因此压缩核为零，所有 $R_{\ell m}=0$，即 $Y_r^*Y_s=\delta_{rs}I_c$。当 $c=1$，$Y_0,Y_1$ 就是 $\mathbb C^d$ 中两根正交单位向量。一般 $c$ 时，$Y_0,Y_1:\mathbb C^c\to\mathbb C^d$ 是等距映射，且其两个 $c$ 维像彼此正交；拼接 $[\,Y_0\ Y_1\,]$ 有 $2c$ 根正交归一列，故 $2c\le d$。

$k=3$ 时，[@thm-bridge-common-coefficient-plane] 的独立性与堆叠单射前提已经导出。其共同平面 $L$ 对整个 Hermitian 压缩核有效，包括该核为零的情形。每个复缺陷 $R=G-\delta I_3$ 未必 Hermitian，尤其不能略过 $\ell\ne m$。由于 $\Phi_X(R^*)=\Phi_X(R)^*$，两个 Hermitian 部分

$$
\begin{aligned}
R_{\mathrm R}&=\frac{R+R^*}{2},\\
R_{\mathrm I}&=\frac{R-R^*}{2i},\\
R&=R_{\mathrm R}+iR_{\mathrm I}.
\end{aligned}
$$

都在核中。同一个 $L$ 同时消去每个块的两部分的完整配对，故 $u^*R_{\ell m}v=0$ 对全部 $\ell,m$ 与 $u,v\in L$ 成立；这些是伴随意义的 Hermitian 部分，不是逐元素的实部与虚部。

取 $L$ 的正交归一基组成 $V\in M_{3\times2}(\mathbb C)$，令

$$
W=[\,Y_0\ Y_1\ Y_2\,],\qquad C=V\otimes I_c.
$$

全部块关系与 $V^*V=I_2$ 给出

$$
\begin{aligned}
(WC)^*(WC)&=I_{2c},\\
2c&=\operatorname{rank}(WC)\le d.
\end{aligned}
$$

当 $c=1$，$WC$ 的两列是正交单位向量；一般 $c$ 时，两组列张成两个彼此正交的 $c$ 维像。这个结论来自张量 Gram 的全部块，而非仅靠环境维数不等式 $bc\le ad$。最小分解、白化、堆叠与压缩都是证明辅助操作，原始 $F$ 的行指标 $(a,d)$ 与列指标 $(b,c)$ 始终不变。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-scalar-gram-obstruction title="宽度三桥流的标量 Gram 障碍" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RestrictedFlatSpectrum.obstruction"}
设 $a,b,c,d\in\mathbb N$，$c>0$、$b>2a$。对任意三个 $a\times b$ 复矩阵 $M_r$、三个 $d\times c$ 复矩阵 $N_r$ 及正实数 $\lambda$，若

$$
F=\sum_{r=0}^2M_r\otimes N_r,\qquad
F^*F=\lambda I_{bc},
$$

则 $d\ge3c$。不另要求 $a>0$，也不加顺序条件或二次锥条件。
:::

::: {.proof #pf-bridge-scalar-gram-obstruction}
先把三张 $M_r$ 竖直堆叠为辅助映射

$$
V:\mathbb C^b\longrightarrow\mathbb C^3\otimes\mathbb C^a,\qquad
Vx=\sum_{r=0}^2e_r\otimes M_rx.
$$

若 $Vx=0$，则所有 $M_rx=0$，故 $F(x\otimes y)=0$。取非零 $y\in\mathbb C^c$，由 $F^*F=\lambda I_{bc}$ 得 $\lambda\|x\|^2\|y\|^2=0$，所以 $x=0$。因此 $W=\operatorname{range}V$ 的维数为 $b$。

固定任意非零系数方向 $z=(z_0,z_1,z_2)\in\mathbb C^3$。子空间 $z\otimes\mathbb C^a$ 的维数为 $a$，而环境空间的维数为 $3a$；因为 $b+a>3a$，有 $W\cap(z\otimes\mathbb C^a)\ne\{0\}$。于是存在非零 $x,u$，使 $Vx=z\otimes u$，即对每个 $r$ 都有 $M_rx=z_ru$。

这使九个 $M_r^*M_s$ 线性无关。事实上，若复系数矩阵 $T=(t_{rs})$ 满足 $\sum_{r,s}t_{rs}M_r^*M_s=0$，用上面选出的 $x$ 在两侧配对便得

$$
0=\sum_{r,s}t_{rs}\langle M_rx,M_sx\rangle
=\|u\|^2z^*Tz.
$$

因此 $z^*Tz=0$ 对所有 $z$ 成立（$z=0$ 时亦然）。分别代入 $e_r$，再对 $r\ne s$ 代入 $e_r+e_s$ 与 $e_r+i e_s$，得到

$$
t_{rr}=0,\qquad t_{rs}+t_{sr}=0,\qquad
it_{rs}-it_{sr}=0.
$$

故所有 $t_{rs}=0$。这里同时用了实、虚两个方向，不能只检验实向量 $z$。

接着展开原来的列 Gram 恒等式：

$$
\sum_{r,s}(M_r^*M_s)\otimes(N_r^*N_s)
=\lambda I_b\otimes I_c.
$$

由 $c>0$ 固定一个坐标 $k$，定义 $H_{rs}=(N_r^*N_s)_{kk}$，并记 $\delta_{ij}$ 为 Kronecker 符号。对任意 $i,j$，取上式在第二个张量因子上的 $(i,j)$ 矩阵元，再减去 $(k,k)$ 矩阵元对应等式的 $\delta_{ij}$ 倍，得到

$$
\sum_{r,s}\bigl((N_r^*N_s)_{ij}-\delta_{ij}H_{rs}\bigr)M_r^*M_s=0.
$$

由九个 $M_r^*M_s$ 的线性无关性，每个系数均为零，因而全部交叉 Gram 都是标量矩阵：$N_r^*N_s=H_{rs}I_c$。同时，$(k,k)$ 矩阵元对应的等式可用竖直堆叠 $V$ 写为

$$
V^*(H\otimes I_a)V=\lambda I_b.
$$

因为 $\lambda>0$，右边的秩为 $b$；乘积的秩不超过中间因子的秩，所以

$$
b\le\operatorname{rank}(H\otimes I_a)
=a\operatorname{rank}H.
$$

$H$ 是 $3\times3$ 矩阵，秩至多为 $3$；若其秩至多为 $2$，就有 $b\le2a$，与假设矛盾。因此 $\operatorname{rank}H=3$。最后横向拼接

$$
C=[\,N_0\ N_1\ N_2\,]\in M_{d\times3c}(\mathbb C).
$$

其 Gram 矩阵为 $C^*C=H\otimes I_c$，于是

$$
3c=c\operatorname{rank}H
=\operatorname{rank}(C^*C)
\le\operatorname{rank}C\le d.
$$

辅助堆叠与拼接只用于证明，原来的三项收缩及行列分组始终不变。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-two-five-flat-spectrum title="秩达到 10，谱却不能平坦：$(2,5,2,5)$"}
取 $(a,b,c,d)=(2,5,2,5)$。正性、顺序条件与两条二次锥条件全部成立：

$$
\begin{aligned}
0<a=2&\le b=5,\qquad 0<c=2\le d=5,\\
a^2+b^2=c^2+d^2&=29\le30=3ab=3cd.
\end{aligned}
$$

即使再加上两条比值限制 $2b\le5a$、$2d\le5c$，这一点仍被允许，因为 $2b=5a=10$ 且 $2d=5c=10$。

此时 $ad=bc=10$、$3ac=12$，所以 [@thm-bridge-quantum-maxflow-mincut] 给出 $\operatorname{QMaxFlow}=\operatorname{QMinCut}=10$；由 [@lemma-bridge-flow-attained]，确有某组三对矩阵使 $F$ 的秩达到 $10$。然而 $b=5>2a=4$，列 Gram 恒等式 $F^*F=\lambda I_{10}$ 若对某个 $\lambda>0$ 成立，[@thm-bridge-scalar-gram-obstruction] 就要求 $d\ge3c=6$，与 $d=5$ 矛盾。因此，对任意这样的复矩阵三元组和任意正 $\lambda$，该恒等式都不成立。

这个反例恰好位于 $ad=bc$ 的接缝，两项标量 Gram 要求同时生效；列恒等式的不可能性已经排除了它们在同一证人下的联合成立。这里存在满秩桥流，却不存在十个奇异值全部相等且为正的桥流：在这一行列二分下，秩达到 $10$ 并不使归一化纠缠熵达到 $\ln10$。
:::

上述施密特权重与熵的讨论是归一化纯态的谱解释；定理本身只给出矩阵维数的必要条件。这一障碍针对既定分组下的三项复矩阵收缩与精确平坦谱；它不给出近似平坦的误差界，也不建立一般张量网络、物理实现或连续统全息对偶的结论。

那么，把比值收紧为 $b\le2a$、$d\le2c$，能否保证精确平坦谱？$b>2a$ 的旧障碍不再适用，但 [@thm-bridge-native-rectangular-bound] 仍可能排除它。下面保留已经给出的固定尺寸结果及其来源；它也是一般界在 $(3,5,3,5)$ 处的特例。

::: {.theorem #thm-bridge-three-five-flat-spectrum-obstruction title="$(3,5,3,5)$ 的正标量 Gram 障碍" lean="D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction"}
对任意复矩阵三元组 $M_r\in M_{3\times5}(\mathbb C)$、$N_r\in M_{5\times3}(\mathbb C)$（$r=0,1,2$）以及任意实数 $\lambda>0$，令

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^5\otimes\mathbb C^3\longrightarrow
\mathbb C^3\otimes\mathbb C^5.
$$

则 $F^*F\ne\lambda I_{15}$，其中 $I_{15}$ 的指标集为 $\operatorname{Fin}5\times\operatorname{Fin}3$。
:::

::: {.proof #pf-bridge-three-five-flat-spectrum-obstruction}
反设 $F^*F=\lambda I_{15}$。由于 $3a=9<10=2b$，[@thm-bridge-native-rectangular-bound] 要求 $2c=6\le d=5$，矛盾。一般证明在此正是把两个正交的三维像放入五维空间的不可能性；原固定尺寸 [common_plane](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.common_plane) 也给出这里所用的共同系数平面。本条保留其独立来源 [positive_scalar_obstruction](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction)。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-three-five-flat-spectrum title="八个前提成立，秩达到 15，谱仍不能平坦：$(3,5,3,5)$"}
取 $(a,b,c,d)=(3,5,3,5)$。逐项核对原始全称主张 [`claim`](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.claim) 的八个前提：

$$
\begin{aligned}
0<a&:\quad0<3,& a\le b&:\quad3\le5,\\
0<c&:\quad0<3,& c\le d&:\quad3\le5,\\
a^2+b^2\le3ab&:\quad34\le45,\\
c^2+d^2\le3cd&:\quad34\le45,\\
b\le2a&:\quad5\le6,& d\le2c&:\quad5\le6.
\end{aligned}
$$

前六个正是 [@thm-bridge-quantum-maxflow-mincut] 的全部前提；该秩定理没有额外的平坦谱承诺。由于 $ad=bc=15$、$3ac=27$，它给出 $\operatorname{QMaxFlow}=\operatorname{QMinCut}=15$；再由 [@lemma-bridge-flow-attained]，存在某组矩阵使 $\operatorname{rank}F=15$。这里是在相同 `flow` 定义与行列指标下组合已有声明的结论。

然而 [@thm-bridge-three-five-flat-spectrum-obstruction] 排除了任意矩阵三元组在任意 $\lambda>0$ 下满足 $F^*F=\lambda I_{15}$，因此不可能有长度为 $15$ 的精确正平坦奇异值谱。旧的 [@thm-bridge-scalar-gram-obstruction] 不能用于这一点，因为 $b=5\le2a=6$。

原始全称主张要求同一组 $M,N$ 和同一个正 $\lambda$ 同时见证本节开头的两条条件 Gram 等式。此处 $ad=bc$ 使两条条件都生效，而列等式单独就与新定理矛盾。因此，即便补上 $b\le2a$、$d\le2c$，也不能把锥域中的秩可达性加强为精确平坦谱可达性。
:::

这一算例没有确定最小反例、最优比值阈值或完整的维数分类，也没有给出近似平坦谱的定量间隙。它仍只讨论既定行列二分下的有限维收缩，不建立物理实现或 RT 公式饱和。

## 19.4.1 矩形分块与同一算子的精确分解宽度 {#sec-bridge-rectangular-partition}

[@thm-bridge-native-scalar-gram-exists] 用坐标路由给出了三项张量和的充分构造，后面的障碍则限制了三项精确平坦谱。现在保留原始局部输入、输出空间，把项数从固定三项放宽为任意有限项：将整个坐标矩形分成两侧等势的分块，块内的双射就能同时给出一个酉算子及其最少乘积项数。

::: {.theorem #thm-bridge-rectangular-partition title="矩形分块的酉路由与精确分解宽度" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RectangularBlockPartition.unitary_exact_width"}
设 $X,Y,T$ 为任意有限集。每个 $t\in T$ 给出子集 $I_t\subseteq X$、$J_t\subseteq Y$ 和双射 $\phi_t:J_t\to I_t$，且每个 $(x,y)\in X\times Y$ 恰属于一个矩形 $I_t\times J_t$。定义矩阵 $A_t\in M_{X\times Y}(\mathbb C)$：当 $j\in J_t$ 且 $i=\phi_t(j)$ 时 $(A_t)_{ij}=1$，其余为零。令

$$
\begin{aligned}
U&=\sum_{t\in T}A_t\otimes A_t^*,\\
U&:\mathbb C^Y\otimes\mathbb C^X\longrightarrow\mathbb C^X\otimes\mathbb C^Y,\\
T_+&=\{t\in T:J_t\ne\varnothing\}.
\end{aligned}
$$

这里 $A_t^*$ 表示 $A_t$ 的共轭转置。按原始局部指标定义重排矩阵

$$
\begin{aligned}
\mathcal R(U)_{(i,j),(k,l)}&=U_{(i,k),(j,l)},\\
i,l&\in X,\qquad j,k\in Y.
\end{aligned}
$$

则 $U^*U=I_{Y\times X}$、$UU^*=I_{X\times Y}$，且

$$
\begin{aligned}
\operatorname{rank}\mathcal R(U)&=|T_+|,\\
U&=\sum_{t\in T_+}A_t\otimes A_t^*.
\end{aligned}
$$

此外，存在行映射 $r:T_+\to X\times Y$、列映射 $s:T_+\to Y\times X$，使 $\mathcal R(U)_{r(t),s(u)}=\delta_{tu}$ 对所有 $t,u\in T_+$ 成立。对任何有限集 $R$ 及任意复矩阵 $M_r\in M_{X\times Y}(\mathbb C)$、$N_r\in M_{Y\times X}(\mathbb C)$，若同一个 $U=\sum_{r\in R}M_r\otimes N_r$，必有 $|T_+|\le|R|$。允许空指标集和空分块；任意分解中的因子无需线性无关或非零。
:::

::: {.proof #pf-bridge-rectangular-partition}
先展开张量和的坐标：

$$
U_{(i,k),(j,l)}=
\sum_{u\in T}(A_u)_{ij}\overline{(A_u)_{lk}}.
$$

给定输入标准基指标 $(j,l)\in Y\times X$，选取满足 $l\in I_t$、$j\in J_t$ 的唯一分块。若第 $u$ 项非零，两个因子的支撑分别要求 $j\in J_u$ 和 $l\in I_u$，唯一覆盖便迫使 $u=t$。剩下这一项恰在 $i=\phi_t(j)$、$k=\phi_t^{-1}(l)$ 时等于 $1$，其余为零。因此每个输入被送到

$$
(j,l)\longmapsto\bigl(\phi_t(j),\phi_t^{-1}(l)\bigr).
$$

记此路由为 $\rho$。输出 $(i,k)$ 仍属于同一矩形 $I_t\times J_t$，所以可由唯一覆盖恢复 $t$，再用

$$
\rho^{-1}(i,k)=\bigl(\phi_t^{-1}(i),\phi_t(k)\bigr)
$$

恢复输入；两种复合都是恒等映射。于是 $U_{w,p}=\delta_{w,\rho(p)}$。对 $p,q\in Y\times X$ 和 $w,z\in X\times Y$，逐项计算得到

$$
\begin{aligned}
(U^*U)_{p,q}
&=\sum_{w\in X\times Y}\overline{U_{w,p}}U_{w,q}\\
&=\delta_{\rho(p),\rho(q)}=\delta_{p,q},\\
(UU^*)_{w,z}
&=\sum_{p\in Y\times X}U_{w,p}\overline{U_{z,p}}\\
&=\delta_{\rho^{-1}(w),\rho^{-1}(z)}=\delta_{w,z}.
\end{aligned}
$$

这就给出原始输入、输出空间上的两侧 Gram 恒等式。

对每个非空块选 $j_t\in J_t$，令 $i_t=\phi_t(j_t)$。唯一覆盖保证

$$
(A_u)_{i_tj_t}=\delta_{ut}.
$$

于是重排矩阵的实际子矩阵满足

$$
\begin{aligned}
\mathcal R(U)_{(i_t,j_t),(j_s,i_s)}
&=\sum_u(A_u)_{i_tj_t}\overline{(A_u)_{i_sj_s}}\\
&=\delta_{ts}.
\end{aligned}
$$

所取的行映射为 $r(t)=(i_t,j_t)$，列映射为 $s(t)=(j_t,i_t)$。不同分块的代表格点互异，故两张映射均为单射。这给出所需的实际单位子矩阵，并推出 $\operatorname{rank}\mathcal R(U)\ge|T_+|$。空块对应零矩阵，删去它们不改变 $U$，所以已有 $|T_+|$ 项的实际分解。

最后，任何分解 $U=\sum_{r\in R}M_r\otimes N_r$ 都给出因式分解 $\mathcal R(U)=BC$，其中

$$
\begin{aligned}
B_{(i,j),r}&=(M_r)_{ij},\\
C_{r,(k,l)}&=(N_r)_{kl}.
\end{aligned}
$$

这里 $C$ 直接使用 $N_r$ 的矩阵元，不再取共轭。故 $\operatorname{rank}\mathcal R(U)\le\operatorname{rank}B\le|R|$。将这一界用于非空块分解得到相反的秩上界，再用于任意复因子分解得到最少项数下界。

若 $J_t$ 为空，双射也使 $I_t$ 为空，且 $A_t=0$。若 $X$ 或 $Y$ 为空，所有分块都为空，$T_+$ 为空，$U$ 是两个零维空间之间的唯一映射，两侧 Gram 等式都是空方阵上的恒等式。反过来，若 $T_+$ 为空（特别地，若 $T$ 为空），唯一覆盖迫使 $X\times Y$ 为空；此时重排秩为 $0$，单位子矩阵和达到宽度 $0$ 的分解均为空，下界为 $0\le|R|$。完整证明由 Lean 内核检查。
:::

这里的“精确宽度”针对已构造的同一个 $U$：它的分解恰需 $|T_+|$ 项。另一个具有相同局部维数的酉算子能否使用更少项，仍须另行研究。也没有通过复合一次物理交换操作，把这里的局部空间换成另一种算子 Schmidt 分割。

::: {.example #ex-bridge-rectangular-partition-5-6 title="一个恰需五项的三十维酉算子"}
取 $X=\{0,1,2,3,4\}$、$Y=\{0,1,2,3,4,5\}$，按下表划分五个矩形：

| $t$ | $I_t$ | $J_t$ | 大小 |
| :--- | :--- | :--- | :--- |
| $0$ | $\{0,1,2\}$ | $\{0,1,2\}$ | $3\times3$ |
| $1$ | $\{0,1,2\}$ | $\{3,4,5\}$ | $3\times3$ |
| $2$ | $\{3,4\}$ | $\{0,1\}$ | $2\times2$ |
| $3$ | $\{3,4\}$ | $\{2,3\}$ | $2\times2$ |
| $4$ | $\{3,4\}$ | $\{4,5\}$ | $2\times2$ |

例如，在各自的 $J_t$ 上具体取

$$
\begin{aligned}
\phi_0(j)&=j,&\phi_1(j)&=j-3,\\
\phi_2(j)&=j+3,&\phi_3(j)&=j+1,\\
\phi_4(j)&=j-1.
\end{aligned}
$$

这些都是从表中 $J_t$ 到 $I_t$ 的双射；表中每块内的任意双射也都适用。前三行被两个 $3\times3$ 块覆盖，后两行被三个 $2\times2$ 块覆盖，每个格点恰出现一次。五个块都非空，所以上述构造给出

$$
\begin{aligned}
U&:\mathbb C^6\otimes\mathbb C^5\longrightarrow
\mathbb C^5\otimes\mathbb C^6,\\
\operatorname{rank}\mathcal R(U)&=5.
\end{aligned}
$$

对上述具体双射，可依次选取代表格点

$$
(0,0),\quad(0,3),\quad(3,0),\quad(3,2),\quad(3,4).
$$

以它们为重排矩阵的行指标，以各对坐标颠倒后的格点为列指标，得到实际的 $5\times5$ 单位子矩阵。五个块同时给出五项分解，所以下界确实达到。

这个 $U$ 是三十维酉算子，并且它在所示原始局部分割下恰需五项。此例给出该维数下的五项实现；另一个同维酉算子能否用四项实现，在这里仍是开放问题。此例没有确定所有同维酉算子的全局最小项数。
:::

::: {.figure src="ch19-discrete-vs-rt"}
**本章证明的只到左边为止。** 左边是宽度三桥图，绿色标签是锥域内的最大流等于最小割（[@thm-bridge-quantum-maxflow-mincut]）；右边圆盘是连续体时空的一张切片，青色的弧是边界区域 $A$，紫色的弧 $\gamma_A$ 从 $A$ 两端垂直于边界伸入内部，是 RT 公式里的极小曲面（文献结果，未在本书形式化）。中间被划掉的箭头：从左到右的连续极限，本书没有证明。
:::

为了将这一精确的有限维离散定理与高能物理文献中的连续统全息纠缠熵公式清晰对照而不越界，我们在下述文献注记中给出 Ryu–Takayanagi 公式的标准界定。

::: {.remark #rem-ryu-takayanagi-literature title="Ryu–Takayanagi 全息纠缠熵公式与适用边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在静态、经典引力背景下的领先阶半经典反德西特/共形场论（AdS/CFT）全息对偶中（采用光速 $c = 1$ 的单位制），边界共形场论子区域 $A$ 的冯·诺依曼纠缠熵 $S(A) = -\Tr(\rho_A \ln\rho_A)$ 由著名的 **Ryu–Takayanagi（RT）公式**给出：

$$
S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N \hbar},
$$

其中 $G_N$ 为高维体时空（bulk）的牛顿引力常数，$\gamma_A$ 为体时空中以边界子区域边缘 $\partial A$ 为锚定边界（$\partial\gamma_A = \partial A$）、且与 $A$ 满足同调条件（homologous to $A$）的**极小面积余维二曲面**（minimal codimension-two surface）。体量子场纠缠修正（Faulkner–Lewkowycz–Maldacena 修正）以及非静态含时背景下的协变极值曲面推广（Hubeny–Rangamani–Takayanagi，简称 HRT 公式）均不在本章冻结陈述的范围之内。

在将本章的离散桥图定理与全息文献作启发式对比时，必须严守两条红线：

1. **绝不将纠缠熵写成双矢量外积 $S(A) = a \wedge b$**，也绝不宣称任意张量网络在任意参数下都普遍达到最小割饱和；
2. **严守 R3 离散分片边界**：本章从 [@thm-bridge-quantum-maxflow-mincut] 到全息几何的联系，仅限于 [@ex-log-capacity-facets] 所示的“离散对数容量多面体分片、最小割瓶颈与分片接缝粘接”的数学结构示意，并不证明张量网络的连续统极限或连续时空的全息对偶。

参见 S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602 (2006), DOI: [10.1103/PhysRevLett.96.181602](https://doi.org/10.1103/PhysRevLett.96.181602)；B. Swingle, *Phys. Rev. D* **86**, 065007 (2012), DOI: [10.1103/PhysRevD.86.065007](https://doi.org/10.1103/PhysRevD.86.065007)；以及 J. D. Bekenstein, *Phys. Rev. D* **7**, 2333 (1973), DOI: [10.1103/PhysRevD.7.2333](https://doi.org/10.1103/PhysRevD.7.2333)。
:::

::: {.viz src="layered-network-cut" preset="grow" height="500"}
**区间翻倍，割只多约两条腿。** 琥珀色区间右端不动，从 1 格长到 16 格；品红的最小割一层层往上爬，只从 1 条长到 8 条，而直接剪断每条腿要 16 条。这张 32 格网络的每一段区间，割都不超过 $2\log_2 L + 1$（页面逐个算过）。把割断的腿数读作 RT 极小曲面的“面积”，是 Swingle 用 MERA 作的类比（文献结果，未在本书形式化）。
:::

区间不止一段时，候选割也不止一道：两段可以各割各的，也可以用一道大割把它们连同中间的空隙一起包住、再单独剪断空隙的腿；最小割取割断键数最少的那种割法。

::: {.viz src="layered-network-cut" preset="two" height="500"}
**两段区间：分开割，还是一起割。** 琥珀色的 A、B 之间空 2 格，A 从 1 格往左长。A 短时，品红的最小割是两道各自的割；A 长到 7 格起，一道包住 A、B 与空隙的大割，加上剪断空隙两条腿的小割，反而更省：A 长 10 格时一起割 10 条，分开割 13 条。最小割总是在候选割中取最少的那道，宽度三桥图上的同类上界见 [@prop-bridge-flow-cut-bound]。
:::
