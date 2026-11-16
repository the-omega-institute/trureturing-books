# 16.6 把同一标量字提升到原始投影酉算子 {#sec-raw-projected-unitary-lifting}

二维矩阵里的一个数，怎样决定大空间里的一个投影块？想象先用输入窗口 $\Pi$ 留住一束振幅，经过原始酉算子 $U$，再用输出窗口 $\widetilde\Pi$ 读出。窗口的大小可以不同；输出窗口甚至可以完全关闭。被挡住的振幅仍在空间里，下一次 $U^*$ 会把它带回来。因此只跟踪当前窗口里的分量，不能证明任意长的交替字。

以下固定任意有限维复内积空间 $H$，允许 $H=\{0\}$。所有算子都是 $H\to_{\mathbb C}H$ 的线性自映射，乘积按复合解释，最右侧先作用。给定**原始**算子与投影

$$
\begin{aligned}
U^*U&=1,& UU^*&=1,\\
\Pi^*&=\Pi,& \Pi^2&=\Pi,\\
\widetilde\Pi^*&=\widetilde\Pi,&\widetilde\Pi^2&=\widetilde\Pi,
\end{aligned}
$$

记 $A=\widetilde\Pi U\Pi$、$G=A^*A$。星号是内积伴随；源码在此使用标准内积与伴随，没有另换范数。$A$ 不必自伴，两个投影不必等秩，也不要求任何非零奇异值。

::: {.definition #def-projected-unitary-word title="原始编码、投影相位与尾长决定的交替字" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.ofRaw D5/S3/ContinuousObservables/ProjectedUnitaryLifting.phaseOp D5/S3/ContinuousObservables/ProjectedUnitaryLifting.altSeq D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.Rref D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.phaseZ D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.seqR"}
在上述假设下，$E=\operatorname{ofRaw}(U,\Pi,\widetilde\Pi)$ 是由这三个算子组成的投影酉编码。源码的投影谓词是“正且幂等”，它与这里的自伴幂等条件等价。对任意正交投影 $J$ 与实数 $\theta$，定义

$$
F_J(\theta)=e(\theta)J+e(-\theta)(1-J).
$$

记 $V_E(\Psi)=\operatorname{altSeq}(E,\Psi)$。对所有实数列表递归定义

$$
\begin{aligned}
V_E([])&=1,\\
V_E(\theta::\Theta)&=
\begin{cases}
F_{\widetilde\Pi}(\theta)U V_E(\Theta),&|\Theta|\text{ 为偶数},\\
F_\Pi(\theta)U^* V_E(\Theta),&|\Theta|\text{ 为奇数}.
\end{cases}
\end{aligned}
$$

同时令 $s(x)=\sqrt{1-x^2}$（实数非负平方根），并定义标量反射字

$$
\begin{aligned}
R_{\mathrm{ref}}(x)&=\begin{pmatrix}x&s(x)\\s(x)&-x\end{pmatrix},&
D(\theta)&=\begin{pmatrix}e(\theta)&0\\0&e(-\theta)\end{pmatrix},\\
S([],x)&=I_2,&
S(\theta::\Theta,x)&=D(\theta)R_{\mathrm{ref}}(x)S(\Theta,x).
\end{aligned}
$$

$S(\Psi,x)=\operatorname{seqR}(\Psi,x)$ 的因子按列表从左到右排列，作用时仍从右到左。
:::

例如 $V_E([\alpha])=F_{\widetilde\Pi}(\alpha)U$，而 $V_E([\alpha,\beta])=F_\Pi(\alpha)U^*F_{\widetilde\Pi}(\beta)U$。递归判断的是**尾列表**长度；不能按正在读到的相位下标擅自调换 $U$ 与 $U^*$。$F_J$ 在 $\operatorname{range}J$ 上乘 $e(\theta)$，在其正交补上乘 $e(-\theta)$；若两边维数不同，其行列式也不必为 $1$。

## 16.6.1 两副架：把留在窗内与落在窗外的振幅一起带走 {#两副架把留在窗内与落在窗外的振幅一起带走}

::: {.definition #def-singular-pair-frames title="任意奇异对及其输入、输出两副架" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.IsSingularPair D5/S3/ContinuousObservables/ProjectedUnitaryLifting.lvOf D5/S3/ContinuousObservables/ProjectedUnitaryLifting.lvtOf D5/S3/ContinuousObservables/ProjectedUnitaryLifting.rvpOf"}
$\operatorname{IsSingularPair}(E,\psi,\sigma)$ 表示恰好以下条件：

$$
\Pi\psi=\psi,\qquad 0\le\sigma\le1,\qquad
A^*A\psi=\sigma^2\psi.
$$

不要求 $\|\psi\|=1$ 或 $\psi\ne0$。令 $s=\sqrt{1-\sigma^2}$，定义

$$
\begin{aligned}
\ell&=\begin{cases}0,&\sigma=0,\\\sigma^{-1}A\psi,&\sigma\ne0,\end{cases}\\
\widetilde\ell&=s^{-1}(1-\widetilde\Pi)U\psi,\\
\psi_\perp&=s^{-1}(1-\Pi)U^*\ell.
\end{aligned}
$$

逆元均在 $\mathbb C$ 中取，采用 $0^{-1}=0$。输入架为 $(\psi,\psi_\perp)$，输出架为 $(\ell,\widetilde\ell)$；“架”在此允许退化，不声称总是两维基。
:::

先在 $0<\sigma<1$ 且 $\psi\ne0$ 的情形看清机制。$A\psi=\sigma\ell$、$A^*\ell=\sigma\psi$，而两个窗口把每副架的第二根向量消去：$\Pi\psi_\perp=0$、$\widetilde\Pi\widetilde\ell=0$。内积计算给出 $\|A\psi\|=\sigma\|\psi\|$，故 $\|\ell\|=\|\psi\|$。投影的勾股分解再给出 $\|\widetilde\ell\|=\|\psi_\perp\|=\|\psi\|$；每副架内部正交，但输入架与输出架一般不是同一副架。若 $\psi$ 为单位向量，它们才是各自平面内的标准正交架。

源码用于归纳的四条作用式是

$$
\begin{aligned}
U\psi&=\sigma\ell+s\widetilde\ell,&
U\psi_\perp&=s\ell-\sigma\widetilde\ell,\\
U^*\ell&=\sigma\psi+s\psi_\perp,&
U^*\widetilde\ell&=s\psi-\sigma\psi_\perp.
\end{aligned}
$$

例如在 $s>0$ 时，由 $s\psi_\perp=U^*\ell-\sigma\psi$ 与酉性直接算得

$$
\begin{aligned}
sU\psi_\perp&=\ell-\sigma U\psi\\
&=(1-\sigma^2)\ell-\sigma s\widetilde\ell\\
&=s^2\ell-\sigma s\widetilde\ell.
\end{aligned}
$$

约去 $s$ 就得到第二条；同理由 $s\widetilde\ell=U\psi-\sigma\ell$ 得第四条。这里需切换输入、输出两副架，而非假定 $U$ 在一副固定架上作同一反射。

前后两副架之间，$U$ 与 $U^*$ 都由 $R_{\mathrm{ref}}(\sigma)$ 表示。相位算子再把第一坐标乘 $e(\theta)$、第二坐标乘 $e(-\theta)$，正好成为 $D(\theta)R_{\mathrm{ref}}(\sigma)$。这些作用式在下面的两个端点也成立，不能只从非退化平面的图像推断。

**$\sigma=0$：左向量消失，输出没有消失。** 由 $\|A\psi\|^2=\sigma^2\|\psi\|^2$ 得 $A\psi=0$。于是 $\ell=\psi_\perp=0$，但 $s=1$ 且 $\widetilde\ell=U\psi$；$U^*\widetilde\ell=\psi$。输入架退化为 $(\psi,0)$，输出架退化为 $(0,U\psi)$，$R_{\mathrm{ref}}(0)$ 的交换作用恰好在这两副退化架之间传递振幅。若只保留归一化的左奇异向量，便会错误地丢掉 $U\psi$。

**$\sigma=1$：不能约掉零平方根。** 此时 $s=0$，按逆零约定 $\widetilde\ell=\psi_\perp=0$。还必须证明 $U\psi=\ell$ 与 $U^*\ell=\psi$：$\widetilde\Pi U\psi=\ell$ 且 $\|\ell\|=\|U\psi\|=\|\psi\|$，故投影勾股恒等式迫使 $(1-\widetilde\Pi)U\psi=0$；另一方向同理。这里是范数饱和补上端点作用，不是以 $s$ 作分母后默认可消去。

::: {.theorem #thm-alternating-singular-pair-action title="任意相位列表在奇异对上的完整双分量作用" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.altSeq_apply_singular"}
对上述任意编码 $E$、任意满足 $\operatorname{IsSingularPair}(E,\psi,\sigma)$ 的 $\psi,\sigma$，以及任意 $\Psi\in\operatorname{List}(\mathbb R)$（包括空列表），令 $M=S(\Psi,\sigma)$。则

$$
V_E(\Psi)\psi=
\begin{cases}
M_{00}\psi+M_{10}\psi_\perp,&|\Psi|\text{ 为偶数},\\
M_{00}\ell+M_{10}\widetilde\ell,&|\Psi|\text{ 为奇数}.
\end{cases}
$$
:::

::: proof
空列表给出 $M=I_2$ 与 $V_E([])\psi=\psi$。归纳时，若尾长为偶数，$U$ 将输入架送到输出架；若尾长为奇数，$U^*$ 将输出架送回输入架。四条作用式与相位规则同时更新两坐标：

$$
\begin{aligned}
a'&=e(\theta)(\sigma a+s b),\\
b'&=e(-\theta)(s a-\sigma b).
\end{aligned}
$$

因此必须保留 $b=M_{10}$：下一步的 $00$ 系数含有 $s b$，即使最后只读投影块，也不能提前删除补分量。$\sigma=0,1$ 的作用式已经分别建立，$\psi=0$ 时各式也成立。该定理陈述的是满足奇异对条件的向量，尚不是对任意物理输入态的无条件断言。完整证明由 Lean 内核检查。
:::

## 16.6.2 从输入窗口的完整格拉姆谱到压缩算子 {#从输入窗口的完整格拉姆谱到压缩算子}

$G=A^*A$ 是正自伴收缩算子，并满足 $\Pi G=G\Pi=G$。源码对 $\operatorname{range}\Pi$ 上的限制算子使用所钉 Mathlib 的有限维对称谱定理，取该**输入子空间**的完整标准正交本征基 $\{\psi_j\}_{j\in\mathrm{Fin}(\dim\operatorname{range}\Pi)}$。它不是只列正奇异值的薄分解，也不是宣称这组向量是整个 $H$ 的基。设 $G\psi_j=\lambda_j\psi_j$；由正性与 $\|A\psi_j\|\le\|\psi_j\|$ 得 $\lambda_j\in[0,1]$，置 $\sigma_j=\sqrt{\lambda_j}$。所有零本征值保留在这组基中。

对 $R(X)=\sum_m r_mX^m\in\mathbb C[X]$，定义代数求值

$$
R(G)=\operatorname{aeval}_G(R)=\sum_m r_m G^m,
\qquad G^0=1_H.
$$

这是源码的 `Polynomial.aeval`，常数项乘整个空间的单位算子，不是逐矩阵元求值。因而 $R(G)\psi_j=R(\sigma_j^2)\psi_j$，且 $R(G)$ 与 $\Pi$ 对易。

::: {.theorem #thm-projected-unitary-polynomial-lifting title="任意复多项式标量恒等式的奇偶压缩提升" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.polynomial_lifting"}
在上述有限维空间与编码假设下，给定任意实数列表 $\Psi$ 与任意 $R\in\mathbb C[X]$。假设对**每个** $x\in[0,1]$ 都有

$$
S(\Psi,x)_{00}=\begin{cases}
R(x^2),&|\Psi|\text{ 为偶数},\\
xR(x^2),&|\Psi|\text{ 为奇数}.
\end{cases}
$$

则以下两个条件命题同时成立：

$$
\begin{aligned}
|\Psi|\text{ 为偶数}&\ \Longrightarrow\
\Pi V_E(\Psi)\Pi=\Pi R(G)\Pi,\\
|\Psi|\text{ 为奇数}&\ \Longrightarrow\
\widetilde\Pi V_E(\Psi)\Pi=A R(G).
\end{aligned}
$$
:::

::: proof
对输入本征基中的每个 $\psi_j$ 使用 [@thm-alternating-singular-pair-action]。偶长时再投影 $\Pi$ 消去 $\psi_\perp$，留下 $R(\sigma_j^2)\psi_j$；奇长时投影 $\widetilde\Pi$ 消去 $\widetilde\ell$，留下 $\sigma_j R(\sigma_j^2)\ell=R(\sigma_j^2)A\psi_j$。这也覆盖 $\sigma_j=0$，不以它作除数。

对任意 $v\in H$，先将 $\Pi v$ 在输入基上完整展开，再用线性性延伸。两侧在 $(1-\Pi)v$ 上均为零；奇长右侧未显式写末端 $\Pi$，因为 $A\Pi=A$ 且 $R(G)\Pi=\Pi R(G)$。若输入空间为零，基指标集为空，结论仍由同一展开成立。这里并未把全区间标量前提削弱成只在某些谱点成立。在 $\operatorname{range}\Pi\cap\ker A$ 上，偶作用是输入向量的 $R(0)$ 倍；当 $A=0$ 时，整个偶块为 $R(0)\Pi$，奇块为零。完整证明由 Lean 内核检查。
:::

::: {.example #ex-projected-lifting-degenerate title="空列表、关闭输出窗口与两个奇异端点（手算）"}
以下直接核对定义，不增加形式定理。

**空列表。** 取 $\Psi=[]$、$R=1$，则全区间上 $S_{00}=1=R(x^2)$，$V_E=1$。偶结论给出 $\Pi 1\Pi=\Pi=\Pi R(G)\Pi$，对任意输出投影都成立。

**输入非零而输出投影为零。** 取 $H=\mathbb C^2$、$\Pi=\operatorname{diag}(1,0)$、$\widetilde\Pi=0$、$U=\begin{pmatrix}0&1\\1&0\end{pmatrix}$。此时 $A=G=0$，输入基仍有 $\psi=(1,0)$，$\sigma=0$、$\ell=\psi_\perp=0$、$\widetilde\ell=(0,1)$。对任意 $\alpha,\beta$，令

$$
\begin{aligned}
\Psi&=[\alpha,\beta],\\
R(T)&=e(\alpha)\bigl[e(\beta)T+e(-\beta)(1-T)\bigr].
\end{aligned}
$$

直接乘 $D(\alpha)R_{\mathrm{ref}}(x)D(\beta)R_{\mathrm{ref}}(x)$，得到全区间 $S_{00}=R(x^2)$。算子字为 $V_E=e(-\beta)F_\Pi(\alpha)$，所以

$$
\Pi V_E\Pi=e(\alpha-\beta)\Pi=R(0)\Pi.
$$

例如 $\alpha=\pi/3,\beta=\pi/6$ 时系数为 $\sqrt3/2+i/2$，并非零。偶变换必须保留输入核上的 $R(0)$；只对正奇异值求和会漏掉整个答案。

**同一二维族的 $\sigma=0$ 与 $\sigma=1$。** 取 $U=R_{\mathrm{ref}}(\sigma)$、$\Pi=\widetilde\Pi=\operatorname{diag}(1,0)$、$\psi=(1,0)$。在 $0<\sigma<1$ 时，$\ell=(1,0)$、$\widetilde\ell=\psi_\perp=(0,1)$。在 $\sigma=0$ 时，$\ell=\psi_\perp=0$、$\widetilde\ell=(0,1)$；在 $\sigma=1$ 时，$\ell=(1,0)$、其余两根为零。单步给出

$$
V_E([\theta])\psi=
\begin{pmatrix}e(\theta)\sigma\\e(-\theta)\sqrt{1-\sigma^2}\end{pmatrix}.
$$

故零端点的全部输出是 $e(-\theta)(0,1)$，单位端点的全部输出是 $e(\theta)(1,0)$。两者均与双分量公式相符，前者的投影读出为零而全向量范数仍为 $1$。
:::
