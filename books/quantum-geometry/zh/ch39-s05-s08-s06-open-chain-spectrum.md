# 35.6.8.6 三对角局部化与开链谱距离 {#sec-ch39-s05-s08-s06-open-chain-spectrum}

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="保留两端残差的三对角算子下范数局部化"}
设 $A$ 是 $H=\ell^2(\mathbb Z;\mathbb C)$ 上的有界复线性算子。只假设其矩阵元 $A_{ij}=(Ae_j)_i$ 在 $|i-j|>1$ 时为零，其中 $e_j$ 是第 $j$ 个坐标单位向量。即使输入只占一个站点 $j$，输出也可能占据 $j-1,j,j+1$ 三个站点。对每个整数 $n\ge1$ 和 $k\in\mathbb Z$，令 $E_{n,k}$ 为支撑在 $k+1,\ldots,k+n$ 上的向量子空间。限制 $A|_{E_{n,k}}$ 的陪域仍是 $H$。计算输出范数时，$(n+2)\times n$ 矩阵保留第 $k$ 与第 $k+n+1$ 行，取 $n\times n$ 主子矩阵会丢掉这两行。

从 $A$ 的三条对角线读出 $a_i=A_{i,i-1}$、$b_i=A_{ii}$、$c_i=A_{i,i+1}$。由 $|A_{ij}|\le\|Ae_j\|\le\|A\|$，三个系数序列都有界。记 $M_-=\sup_i|a_i|$、$M_+=\sup_i|c_i|$，上确界均取遍 $\mathbb Z$。令 $(Ux)_i=x_{i-1}$，以 $M_f$ 表示逐坐标乘以 $f$。双向移位 $U$ 保持范数（`updateLinearIsometryEquiv`），乘法算子的范数等于系数的上确界范数（`diagonalOperator_norm`）。在每个 $e_j$ 上核对三项，再用所钉 Mathlib 的 `lp.ext_continuousLinearMap` 将等式延拓到整个 $H$，得到

$$
\begin{aligned}
A &= M_a U+M_b+M_c U^{-1},\\
(Ax)_i &= a_i x_{i-1}+b_i x_i+c_i x_{i+1}.
\end{aligned}
$$

对定义域非零的有界算子 $B$，记 $\nu(B)=\inf_{\|x\|=1}\|Bx\|$。每个窗口都含单位向量 $e_{k+1}$。给定窗口长度 $n$，下范数的局部化估计为

$$
\begin{aligned}
\inf_{k\in\mathbb Z}\nu(A|_{E_{n,k}})&\le \nu(A)+\delta_n,\\
\delta_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

对固定的 $A$，这个误差界是 $O(1/n)$。正弦因子来自窗权平移一格的代价。取 $\theta=\pi/(n+1)$，在 $1\le j\le n$ 置 $w_j=\sin(j\theta)$，在其余整数上置零。将正弦递推 $w_{j-1}+w_{j+1}=2\cos(\theta)w_j$（`sine_reference_eigenvector`）乘以 $w_j$，对窗内站点求和。写 $S=\|w\|^2>0$，展开平方差即得

$$
\begin{aligned}
T=\|Uw-w\|^2 &= \sum_{j=0}^{n}(w_{j+1}-w_j)^2\\
&=2(1-\cos\theta)S=4\sin^2(\theta/2)S .
\end{aligned}
$$

在 $n=1$ 时，窗权从 $0$ 升到 $1$ 再降到 $0$，两端各贡献一个平方项。对任意 $x\in H$，用 $(D_kx)_i=w_{i-k}x_i$ 加窗。固定 $i$ 后对 $k$ 求和，每个坐标的平方质量都出现为 $S|x_i|^2$，因而 $\sum_k\|D_kx\|^2=S\|x\|^2$，这对无限支撑也成立。在 $AD_kx-D_kAx$ 中，对角项抵消。由 [@thm-observer-read-update-commutator] 的移位差公式及其有界算子分解 `readout_update_commutator_factorization`，两条副对角线分别给出向左、向右差分的窗权。两种差分的范数都是 $\sqrt T$。对整族输出在 $\ell^2(\mathbb Z;H)$ 中用三角不等式，得到

$$
\left(\sum_k\|AD_kx\|^2\right)^{1/2}
\le \sqrt S\,\|Ax\|+(M_-+M_+)\sqrt T\,\|x\|.
$$

给定任意 $\eta>0$，选单位向量 $x$ 使 $\|Ax\|<\nu(A)+\eta/2$。令 $q=\|Ax\|+\delta_n+\eta/2$。若每个窗口都满足 $\|AD_kx\|\ge q\|D_kx\|$，则上式左端至少为 $q\sqrt S$，而右端等于 $(q-\eta/2)\sqrt S$。故存在整数 $k$ 使不等式严格反向，且 $D_kx\ne0$。将它归一化便得到一个实际的 $u\in E_{n,k}$，满足 $\|u\|=1$ 与 $\|Au\|<\nu(A)+\delta_n+\eta$。对位置取下确界并令 $\eta$ 趋于零，即得上述估计。即使下确界未取到、$A$ 非自伴或任一条乃至两条副对角线恒为零，这一选窗论证仍成立。

这一标量复 Hilbert 空间应用对应 Chandler-Wilde、Chonchaiya 与 Lindner 的局部化估计（§5.1，命题 5.1、推论 5.2，第 765–766 页，第 767 页取正弦窗）。谱包含关系及误差常数的最优性各需另证。[文献原文，*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)

若要沿此路线推出 Tribonacci 有限开链的谱隙界，仍须证明 $0$ 属于相应整轴模型的谱，把实际词区段连同两侧各一层邻接站点转植进指定的有限开前缀，并核对长度比例及小尺度情形。[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 直接在有限矩阵上证明。实际链的空间切口与内部窗几何之间的关系仍需建立。该链 Slater 态的空间纠缠标度见 [@prob-ch39-p2e-fractal-horizon]。
:::

另一条有限矩阵路线利用奇数长度的重复：奇数平移把偶数键与奇数键互换，前代入中的两串跃迁比值因而可以配对。下面的下界把这一抵消机制写成实际逆矩阵的定量结论。

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="奇数重复段的逆矩阵质量下界" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
设 $q\in\mathbb{N}$，$t:\mathbb{N}\to\mathbb{R}$ 满足对每个 $i\in\mathbb{N}$ 都有 $0<t(i)\le1$，并且

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

令 $n=2q+1$。下双对角矩阵 $L\in\mathbb{R}^{n\times n}$ 从零编号，其非零位置为

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

其余位置为零。记 $G=L^{-1}$；对 $0\le l<q$、$0\le d<q-l$，定义成对质量

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

则所有这些矩阵指标都在 $0,\ldots,2q$ 内，且

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

$q=0$ 时两重求和为空，按零计。
:::

::: proof
正的对角元保证前代入给出实际逆矩阵。奇数重复使每对中的两个正项之积恰为 $1/[t(2l)t(2(l+d+1))]\ge1$，所以每对之和至少为 $2$。三角形指标域共有 $q(q+1)/2$ 对，求和即得下界。完整证明由 Lean 内核检查。
:::

若 $m=2q+1$、$s$ 为偶数，实际词满足 $W_{s+i+m}=W_{s+i}$（$0\le i<m-1$），且 $s+2m\le N_j$，则可取 $t(i)=t_{W_{s+i}}$ 来匹配这一矩阵模型及前缀内的 $2m$ 站点窗口。下面的定理从替代词本身给出所需窗口及其与前缀长度的统一比较。

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="实际 Tribonacci 前缀中的均匀奇数重复窗口" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
对上述实际词 $W$、替代长度 $L_j=|\sigma^j(A)|$ 与偶数前缀长度 $N_j=2\lfloor L_j/2\rfloor$，存在自然数 $K>0$、$J\ge1$，使每个自然数 $j\ge J$ 都有自然数 $m,s$ 满足

$$
\begin{aligned}
m&\ge3,\qquad m\text{ 为奇数},\quad s\text{ 为偶数},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

最后一行对范围内的每个自然数 $i$ 成立；常数 $K,J$ 不随 $j$ 改变。
:::

::: proof
形式证明取 $K=128$、$J=4$。第四次替代中的两份 $ABA$ 提供重复块，四步替代保持三个字母像长度的奇性，从而给出奇数块长与偶数起点。非空尾段保证向下取偶数后仍包含整个窗口，七步长度增长给出因子 $128$。下面的例子展开这一构造；完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="奇数重复窗口的显式构造"}
对每个 $j\ge4$，令 $r=\lfloor(j-4)/4\rfloor$、$k=4r$，于是 $k+4\le j\le k+7$。将第四次替代写成四段：

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

记 $a=\sigma^k(A)$、$b=\sigma^k(B)$、$c=\sigma^k(C)$，竖线表示拼接而非额外字母。再施加 $k$ 次替代，得到

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

取 $s=|abac|$、$m=|aba|$。在每个四的倍数层，$a,b,c$ 的长度均为奇数：零层长度都是 $1$；第四次替代的三个字母像分别含 $13,11,7$ 个字母，故四步替代保持这三个长度的奇性。于是 $s$ 为偶数，$m\ge3$ 为奇数，且两份 $aba$ 给出所需的重复等式。尾段 $cab$ 非空，故将前缀长度向下取偶数仍保留整个重复窗口。每步替代至多使长度翻倍，因此

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

这里 $s,m$ 都是非负整数；常数 $128$ 与 $j$ 及跃迁参数 $\rho$ 无关。这给出 [@thm-ch39-p2e-aligned-tribonacci-windows] 中常数与窗口的具体选择。
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="从局部质量到完整逆矩阵的欧氏估计"}
取正且不超过 $1$ 的跃迁序列 $t$，令 $G=L(t,n)^{-1}$ 为上述双对角块的完整逆矩阵。设整数 $q\ge1$、$a\ge0$ 满足 $a+2q+1\le n$，并且

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

令 $x=(1,\ldots,1)\in\mathbb R^n$，$v=x/\sqrt n$。所有范数都取欧氏范数，则

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

这里的逆矩阵保留窗口两侧的所有外部站点。前代入给出的逆元公式说明：把局部逆矩阵的行、列同时平移 $a$，恰得到 $G$ 中对应的元素。由于 $G$ 的所有元素非负，[@thm-ch39-p2e-odd-repeat-inverse-mass] 的两个三角区域各自嵌入全矩阵后，给出

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

因子 $2$ 允许分别控制这两个区域，无须额外证明它们互不重叠。另一方面，柯西—施瓦茨不等式给出

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

合并即得所示估计。对前述窗口，参数对应为 $m=2q+1$、$s=2a$、$N_j=2n$。这是既有逆矩阵质量结论、前代入公式和欧氏不等式的应用推导，不新增形式化声明，本例不带独立的 Lean 验证徽章。
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="从完整逆矩阵到有限开链的谱残差界"}
对整数 $n\ge1$，取实跃迁序列 $t:\mathbb N\to\mathbb R$，满足每个 $k\in\mathbb N$ 都有 $t_k>0$。在按自然数从零编号的 $2n$ 个站点上，定义实际开链矩阵 $H\in\mathbb R^{2n\times2n}$：

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{其他情形},
\end{cases}
\qquad 0\le i,j<2n.
$$

它的对角线为零，最后一条物理键为 $t_{2n-2}$，没有首尾闭合键；$n=1$ 时就是仅含键 $t_0$ 的两个站点。同一逐项公式也定义作用在 $\mathbb C^{2n}$ 上的厄米矩阵。实对称矩阵的实正交特征基同时是复空间的正交特征基，特征值保持相同的实数；因此以下谱距离估计也适用于前面定义的复数开链。令 $B=L(t,n)$ 为前述下双对角块，即

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

其余元素为零。下三角性给出 $\det B=\prod_{i=0}^{n-1}t_{2i}>0$，故普通矩阵逆 $G=B^{-1}$ 存在。对每个欧氏单位向量 $v\in\mathbb R^n$，都存在实数 $\lambda$ 和非零实向量 $z\in\mathbb R^{2n}$，使

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

具体地，按偶站点、奇站点重排坐标，写 $C_{ij}=H_{2i,2j+1}$。矩阵 $C$ 的对角元为 $t_{2i}$，次对角元为 $t_{2i-1}$，其余元素为零。取 $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$，则 $D^2=I$，且逐项计算得到

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

第一行表示重排后的矩阵。构造辅助向量 $u$，令 $u_{\mathrm{even}}=0$、$u_{\mathrm{odd}}=DGv$。由 $BG=I$，

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

这里 $D$ 只改变坐标符号，保持欧氏范数；$BGv=v\ne0$ 还保证 $u\ne0$。由于 $H$ 是有限维实对称矩阵，取它的实正交归一特征基 $e_k$，对应实特征值 $\lambda_k$（$0\le k<2n$）。令 $\alpha=\min_{0\le k<2n}|\lambda_k|$，将 $u=\sum_k c_ke_k$ 代入 Parseval 恒等式，得到

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

有限的非空特征值集合中存在 $k_0$ 使 $|\lambda_{k_0}|=\alpha$。取 $\lambda=\lambda_{k_0}$、$z=e_{k_0}$，开平方即得所示不等式。$z$ 是选出的特征向量，辅助向量 $u$ 一般并不是特征向量。本例不要求跃迁有上界。

若还满足 [@ex-ch39-p2e-full-inverse-euclidean] 的上界与重复窗口假设，使用其中同一个单位向量 $v$，便有

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

这把完整逆矩阵的质量估计转成同一有限开链到零能量的谱距离界。
:::

::: {.example #ex-ch39-p2e-tribonacci-prefix-rate title="指定偶数开前缀的纸面谱界"}
回到实际词 $W$，固定 $0<\rho<1$，令 $t(i)=t_{W_i}$，其中 $t_A=\rho^2$、$t_B=\rho$、$t_C=1$。这些跃迁在所有位置都满足 $0<t(i)\le1$。对每个 $j\ge4$，采用 [@ex-ch39-p2e-aligned-tribonacci-windows] 的显式窗口，写

$$
\begin{aligned}
m&=2q+1,\qquad s=2a,\qquad N_j=2n,\\
q&\ge1,\qquad a+m\le n,\qquad N_j\le128m.
\end{aligned}
$$

这里 $q,a,n$ 都是自然数。相同字母具有相同跃迁，所以窗口中的字等式给出

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

因此前两个例子适用于这同一条 $N_j$ 站点开链：局部矩阵是移位跃迁 $t(2a+\cdot)$ 的块，完整逆矩阵仍取全前缀的 $L(t,n)^{-1}$，没有删除窗口外的站点，也没有添加闭合键。取其中同一个单位向量 $v$，得到 $\delta_{\rho,j}q(q+1)\le N_j$。由 $q\ge1$，

$$
\begin{aligned}
9q(q+1)-2(2q+1)^2&=(q-1)(q+2)\ge0,\\
N_j\delta_{\rho,j}
&\le\frac{N_j^2}{q(q+1)}
\le\frac{128^2(2q+1)^2}{q(q+1)}
\le73728.
\end{aligned}
$$

常数 $73728=128^2\cdot9/2$ 与 $j$ 和 $\rho$ 无关，不声称最优。每个替代迭代都以 $A$ 开头；替代不擦除字母，而这个首字母至少增加一个字母，所以 $L_{j+1}\ge L_j+1$、$L_j\ge j+1$，进而 $N_j\ge L_j-1\ge j$。故 $\delta_{\rho,j}\le73728/N_j\to0$。这一尾段结论不要求另行估计 $j=1,2,3$。

这个界还给出对跃迁参数的一致收敛。对任意 $\varepsilon>0$，取

$$
J=\max\left\{4,\left\lfloor\frac{73728}{\varepsilon}\right\rfloor+1\right\}.
$$

由于 $N_j\ge j$，对每个 $j\ge J$ 和每个 $0<\rho<1$ 都有

$$
0\le\delta_{\rho,j}\le\frac{73728}{N_j}\le\frac{73728}{j}<\varepsilon.
$$

这里 $J$ 与 $\rho$ 无关；结论覆盖整个开区间，不把端点 $\rho=0$ 的退化模型纳入假设。

这是所列窗口构造、完整逆矩阵质量估计与有限维谱转换的纸面应用推导，不带独立 Lean 验证徽章；其参数对应与形式化来源见[形式化接口](https://github.com/the-omega-institute/trureturing/issues/30166)。有限开链的这一谱界不构造多体基态，也不确定空间切口的纠缠熵或劳齐边界的维数。
:::

上例给出指定偶数开前缀的纸面 $1/N_j$ 界与趋零结论。平面子瓦片上的贝尔对给出了局域有隙实现。采用平移不变或全格统一规则、无须按指定切口预设匹配的局域有隙模型能否实现相应标度，见 [@prob-ch39-p2e-fractal-horizon]。

前面的定量纸面应用已经给出更强的速率。另一个独立论证只需 [@thm-ch39-p2e-tribonacci-prefix-log-refutation] 中构造的实际前缀：奇数层的正电荷无界，因而可使完整逆矩阵的一个条目充分大。

::: {.theorem #thm-ch39-p2e-tribonacci-open-chain-zero-gap title="实际正跃迁 Tribonacci 开链的全序列谱距离趋零" lean="D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero"}
取 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$ 的从 $A$ 出发的实际不动词 $W$，以及权重 $w(A)=2$、$w(B)=1$、$w(C)=0$。对每个固定实数 $0<\rho<1$，令 $t_i=\rho^{w(W_i)}$。对整数 $j\ge1$，令

$$
\begin{aligned}
L_j&=|\sigma^j(A)|,\qquad N_j=2\lfloor L_j/2\rfloor,\\
(h_{\rho,j})_{ab}&=\begin{cases}
t_a,&a+1=b,\\
t_b,&b+1=a,\\
0,&\text{其他情形},
\end{cases}\quad 0\le a,b<N_j,\\
\delta_{\rho,j}&=\min\{|\lambda|:\lambda\in\operatorname{Spec}(h_{\rho,j})\}.
\end{aligned}
$$

矩阵作用于 $\mathbb C^{N_j}$，对角线为零，只有最近邻物理键 $t_0,\ldots,t_{N_j-2}$，没有首尾闭合键；其特征值均为实数。则

$$
\lim_{j\to\infty}\delta_{\rho,j}=0.
$$

等价地，对每个 $\varepsilon>0$，存在整数 $J\ge1$，使每个整数 $j\ge J$ 都满足 $0\le\delta_{\rho,j}<\varepsilon$。
:::

::: {.proof #pf-ch39-p2e-tribonacci-open-chain-zero-gap}
本证明依照 [源声明 `gap_tendsto_zero`](lean:D5/S3/Quantum/Dynamics/TribonacciOpenPathGap.gap_tendsto_zero) 的陈述与论证展开。

先固定一个真实的奇长前缀，再把同一个前缀放进所有足够长的开链。沿用 [@thm-ch39-p2e-tribonacci-prefix-log-refutation] 证明中的 $\tau=\sigma^4$、$F$ 与

$$
U_0=\varepsilon,\qquad U_{n+1}=\sigma^{4(n+1)}(C)U_n,\qquad m_n=|U_n|.
$$

该证明已逐字建立 $U_n=W_{[0,m_n)}$ 以及 $F(U_n)=1-(-1)^n(n^2+3n+1)$。每个新增块 $\sigma^{4(n+1)}(C)$ 都为奇长，所以 $m_{n+1}\equiv1+m_n\pmod2$。由 $m_0=0$ 归纳得到 $m_n\equiv n\pmod2$。故对每个奇数 $n$，可写

$$
m_n=2q+1,\qquad F(U_n)=(n+1)(n+2)>0.
$$

设 $N_j\ge m_n+1$，记 $M=\lfloor L_j/2\rfloor$，则 $N_j=2M$ 且 $q<M$。取整条物理开链 $H=h_{\rho,j}$。使用 [@ex-ch39-p2e-open-chain-residual] 的双对角块 $B=L(t,M)$、正块 $C$ 与 $D=\operatorname{diag}((-1)^r)_{r=0}^{M-1}$；它们满足

$$
\begin{aligned}
B_{r,r}&=t_{2r},\qquad B_{r,r-1}=-t_{2r-1},\\
D^2&=I,\qquad DCD=B.
\end{aligned}
$$

第二个矩阵元素公式用于 $1\le r<M$。所有 $t_i>0$，所以 $B$ 的对角元非零，普通逆矩阵 $G=B^{-1}$ 存在，且 $C^{-1}=DGD$。把站点按偶数 $2r$、奇数 $2r+1$ 排列，整条开链及其逆为

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
H^{-1}&=\begin{pmatrix}0&(C^{-1})^{\mathsf T}\\C^{-1}&0\end{pmatrix}.
\end{aligned}
$$

这里两式都表示置换后的坐标；$H$ 的可逆性也随之得到。前代入的首列从 $G_{0,0}=1/t_0$ 开始，对 $1\le r<M$ 满足 $t_{2r}G_{r,0}=t_{2r-1}G_{r-1,0}$，因而

$$
G_{q,0}=\frac{\prod_{r=0}^{q-1}t_{2r+1}}{\prod_{r=0}^{q}t_{2r}}>0.
$$

这就是前述 Green 元素公式在起点零的情形，$q=0$ 时分子按空积 $1$ 计。回到物理站点，$D$ 的符号给出 $(H^{-1})_{2q+1,0}=(-1)^qG_{q,0}$。代入实际跃迁 $t_i=\rho^{w(W_i)}$，注意分母包含最后一条偶数键 $t_{2q}$，得到

$$
\begin{aligned}
|(H^{-1})_{2q+1,0}|&=G_{q,0}\\
&=\rho^{-\sum_{i=0}^{2q}(-1)^iw(W_i)}\\
&=\rho^{-F(U_n)}=\rho^{-(n+1)(n+2)}.
\end{aligned}
$$

用到的物理键恰在 $0,\ldots,2q$ 内，站点 $2q+1<N_j$；$N_j\ge|U_n|+1$ 正是保留最后这条键及其右端站点的条件。这里取的是完整 $N_j$ 站点矩阵的逆元素，外侧站点都保留，没有以局部压缩的逆替代它，也没有补接边界键。

谱转换使用复欧氏空间上的诱导算子范数 $\|T\|_{2\to2}=\sup_{\|v\|_2=1}\|Tv\|_2$。以单位坐标向量 $e_0$ 测试，

$$
|(H^{-1})_{2q+1,0}|\le\|H^{-1}e_0\|_2\le\|H^{-1}\|_{2\to2}.
$$

此处不使用逐元素最大值范数。$H$ 是可逆 Hermitian 矩阵，其逆仍为 Hermitian，逆的特征值为原特征值的倒数。有限维谱定理使 $H^{-1}$ 的欧氏算子范数等于其特征值绝对值的最大值；所以存在原矩阵的实特征值 $\lambda$，满足

$$
\begin{aligned}
|\lambda|&=\|H^{-1}\|_{2\to2}^{-1},\\
0\le\delta_{\rho,j}&\le|\lambda|\le\rho^{(n+1)(n+2)}.
\end{aligned}
$$

最后给定 $\varepsilon>0$。因 $0<\rho<1$，可选自然数 $k$ 使 $\rho^k<\varepsilon$，再固定奇数 $n=2k+1$。有 $(n+1)(n+2)\ge k$，故上述界小于 $\varepsilon$。实际替代长度满足 $L_j\ge j+1$，从而 $N_j\ge L_j-1\ge j$；因此存在 $J\ge1$，使所有 $j\ge J$ 都有 $N_j\ge m_n+1$，并适用同一个前缀的估计。$n$ 只按 $\rho,\varepsilon$ 选择一次，此后每个 $j\ge J$ 都得到 $0\le\delta_{\rho,j}<\varepsilon$，并非只挑出一条子序列。

源声明将 $j=0$ 时的 `gap` 定义为 $0$，以避开零维矩阵的空特征值集合；$j\ge1$ 时 $L_j\ge2$，其定义正是这里非空有限实谱的最小绝对值。这个单点约定不改变极限。

完整证明由 Lean 内核检查。
:::

这条单独的收敛定理只陈述每个固定正 $\rho$ 的全序列极限；它的单个逆矩阵条目论证不提供 $1/N_j$ 速率。前面的 [@ex-ch39-p2e-tribonacci-prefix-rate] 已用实际重复窗口与完整逆矩阵质量估计给出更强的 $73728/N_j$ 纸面界及参数一致收敛。两条论证的证据范围须分别保留。这条开链的切口与内部窗几何之间的关系仍须建立。下面的实验卡并列展示帕里平稳权重、有限逃逸对和诱导回归熵读数。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**帕里平稳权重、有限逃逸对与诱导回归熵。** 青色表示重置链的帕里平稳权重 $\pi_K$，品红色表示有限观测场中未区分的逃逸对 $E(S)$，琥珀色标出当前阶数 $K$。卡片还给出拓扑熵 $\log_2\beta_K$ 与诱导回归熵读数，将拓扑熵识别与阿布拉莫夫公式标为文献结果，将一般分形视界律 $S_{\mathrm{ent}}\propto R^{D_F}$ 标为 `MODEL`。正文以手工推导证明有限平面子瓦片切口的贝尔对标度。平移不变或全格统一的局域有隙实现与一般 $K\ge4$ 非各向同性皮索窗仍是开放问题，参见 [@prob-ch39-p2e-fractal-horizon]。
:::

至此，我们可以把本节审视的全部八项概念汇总在一张无折行认识论总表之中，使每一环的形式内核、文献依托与诠释边界清晰对齐：

| 八概念环节 | 精确数学对象与代表性冻结声明 | 认识论等级与边界定位 |
| :--- | :--- | :--- |
| **1. 齐肯多夫禁邻语言** | $K = 2$ 禁相邻 `11` 自动机 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与合法字计数 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card)（$F_{Q+2}$）及短前缀全满律 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓`（注意 `List (Fin 2)` 与 `Fin Q → Bool` 载体转换） |
| **2. $K$-Bonacci 皮索谱** | 特征多项式 $P_K(X)$ 整/有理不可约 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)、主根恒等式 $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)、极限 $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 与复共轭单位圆盘收缩 [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location)（[@thm-ch39-p2e-kbonacci-pisot]） | `LEAN ✓`（代数根定位定理）；具体小数 $\beta_3 \approx 1.839287$ 属 `NUM` |
| **3. $p$ 进余数树与超度量** | 模 $p^k$ 首次区分精度 $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)、观测距离 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)、同余纤维交集 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 与有限视界细化超度量 [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)（[@thm-ch39-p2e-padic-readout]） | `LEAN ✓`（各自独立成立）；$p$ 进树与 $K$-Bonacci 树的跨系统并置属 `MODEL` |
| **4. $K=3$ 劳齐分形内窗** | 零次幂内窗非空内点 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty)、正则闭集 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior)、三支前缀精确自覆盖 [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover)（[@thm-ch39-p2e-rauzy-regular-window]）与二维零测边界 [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero)（[@thm-ch39-p2e-rauzy-null-boundary]） | `LEAN ✓`（集合与平面面积零测）；拼砖、圆盘连通性与 $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ 属 `文献结果` + `NUM`（[@rem-ch39-p2e-rauzy-literature]） |
| **5. 克利福德线—面分解** | 三次闵可夫斯基实线性坐标嵌入 $E_\parallel^1 \oplus E_\perp^2$ 与内部复平面缩放旋子 $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL`（需显式声明基与度规，观察者线—面词典见 [@rem-ch39-p2e-unification-model]） |
| **6. 自指收缩尺度对照** | 正实轴余弦端点 $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) 与三阶共轭范数 $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓`（各自端点与恒等式）+ `文献结果`（$\theta^*$ 超越性）+ `NUM`（$\approx 0.234\%$ 数值邻近，严格不等）+ `MODEL`（$\psi=\psi(\psi)$ 母题，[@ex-ch39-p2e-pisot-dottie-numerics]） |
| **7. 跨切口编码纠缠秩** | 跨切口条件 $\tau(x)+\iota(y)<K$ 下的可达页秩充要矩形 $1 \le r_b \le R_b$ 与最大页熵 $\ln R_b$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy)（[@thm-ch39-p2e-direct-encoder-ranks]）及谱阻塞 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓`（秩等于 $K$ 仅在 $K \le R_b$ 时条件可达，非普适恒等）+ `NUM`（如 $R_0=6, R_1=5$）+ `文献结果`（黄金链与里德堡实验，[@rem-ch39-p2e-rydberg-anyon-literature]） |
| **8. 平稳核、逃逸对与熵** | 有向重置链帕里平稳律 [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law)（[@thm-ch39-p2e-parry-escape-laws]）、实际双向律与柱集（[@thm-ch39-p2e-native-bilateral-parry-law]）、边界柱集不等式 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound) 与有限逃逸对判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | 所引的概率律与计数+ [@thm-ch39-p2e-parry-ks-entropy]（同一无符号律的 KS 上界与达到性）+ [@thm-ch39-p2e-parry-ks-maximizer]（最大熵测度唯一性）+ `文献结果`（拓扑熵识别与首次回归阿布拉莫夫公式，[@rem-ch39-p2e-abramov-literature]）+ `手工推导`（一维熵上界与平面贝尔对）+ `OPEN`（平移不变或全格统一的局域有隙模型、实际 Tribonacci 跃迁链的 Slater 态空间纠缠、一般 $K\ge4$ 非各向同性皮索窗，以及余维一面积律失效的谱隙与局域性充要判据，[@prob-ch39-p2e-fractal-horizon]） |

当我们在下面的综合实验室中把阶数从 $K = 2$ 拨向 $K = 3$ 再继续上推时，自指扩表语法的多切面几何结构便清清楚楚地浮现出来：$K = 2$ 时内部收缩空间还只是一条实轴线段；跨入 $K = 3$ 的瞬间，复共轭根在二维正交平面上旋出三支精确自覆盖、平面边界零测的劳齐分形内窗；而在每一个阶数上，已被 Lean 内核锁定的离散计数、多项式根圆盘、细化超度量、可达纠缠秩矩形与帕里平稳核构成了坚硬的绿色骨架，支撑起周围明确标界的经典文献、数值实验与跨学科几何诠释。穿越这座离散自指沙盘之后，让我们步入本章收官节 [§35.7 `trureturing` 的“黄金切投”形式原语与灵魂—遗迹吸引子的几何诠释](coda-s03-golden-cut-observers.md)，在闵可夫斯基切投模型集与有界间隙环面回归中完成第三十五章的合拢，随后迈入[第三十六章](ch38-observer-memory-pointer-and-ontological-qram.md)的梦境量子擦除与本体 QRAM 架构。

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**交互实验室 `ORTHO//RAUZY`**：齐肯多夫、皮索与劳齐八概念综合沙盘。自由切换上表对应的八个预设场景、调节阶数 $K$、素数基数 $p$、字长视界与三维观察视角，并直接拖拽物理轴与内部平面上的分解点：实时核对禁 $1^K$ 合法字计数、皮索共轭根单位圆盘收缩、模 $p^k$ 余数树首次区分层级、$K = 3$ 劳齐内窗三支仿射覆盖（及 $K = 4$ 内部坐标采样云）、$\theta^*$ 与 $|\alpha|_{K=3}$ 的数值比对、跨切口可达秩矩形 $[1, R_0] \times [1, R_1]$，以及帕里平稳分布与有限逃逸对账本。绿色依据框严格对应 Lean 已验证定理，文献结论、数值计算、诠释模型与开放问题分别按各自标签独立标示。
:::
