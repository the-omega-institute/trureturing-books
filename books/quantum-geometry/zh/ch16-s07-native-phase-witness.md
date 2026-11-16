# 16.7 SAME 原生相位对象：圆场与原始算子的联合见证 {#sec-native-phase-lifting}

现在把先前的补全真正接到上述原始 $U,\Pi,\widetilde\Pi$，不重新选一次补全。先明确旋转与反射的约定。区间旋转矩阵

$$
W_{\mathrm{rot}}(x)=\begin{pmatrix}x&i s(x)\\i s(x)&x\end{pmatrix}
$$

对应原生信号场在非负虚部半圆的取值。记 $W_{\mathrm{word}}(\phi_0,\Phi;x)=D(\phi_0)\prod_{j=1}^{|\Phi|}(W_{\mathrm{rot}}(x)D(\phi_j))$，乘积按列表次序排列。原生场仍使用有符号的 $y(t)$，没有把整个圆替换成非负平方根。

::: {.definition #def-native-reflection-phases title="非空旋转列表的反射相位约定" lean="D5/S3/ContinuousObservables/PhaseSynthesisLifting.cor8Phases"}
给定 $\phi_0\in\mathbb R$ 与非空列表 $\Phi=[\phi_1,\ldots,\phi_d]$，定义

$$
\begin{aligned}
\Psi&=\operatorname{cor8Phases}(\phi_0,\Phi)\\
&=\bigl[\phi_0+\phi_d+(d-1)\pi/2,\
\phi_1-\pi/2,\ldots,\phi_{d-1}-\pi/2\bigr].
\end{aligned}
$$

即首相位合并初相位、末相位与长度修正，其余来自 `dropLast` 后各减 $\pi/2$。这里 $d=|\Phi|>0$；$d=1$ 时仅有首项。
:::

约定传输的计算保留了常因子与右端对角因子：

$$
\begin{aligned}
W_{\mathrm{rot}}(x)&=iD(-\pi/4)R_{\mathrm{ref}}(x)D(-\pi/4),\\
\Xi&=[\phi_0-\pi/4,\phi_1-\pi/2,\ldots,\phi_{d-1}-\pi/2],\\
W_{\mathrm{word}}(\phi_0,\Phi;x)&=i^d S(\Xi,x)D(\phi_d-\pi/4).
\end{aligned}
$$

取 $00$ 元时，右端对角因子贡献 $e(\phi_d-\pi/4)$，而 $i^d=e(d\pi/2)$。把它们和首相位 $\phi_0-\pi/4$ 合并，正好得到 $\Psi$ 的首项。因此得到 $W_{\mathrm{word},00}=S(\Psi,x)_{00}$；这里没有将两个**完整矩阵字**认作同一个矩阵。

::: {.definition #def-polynomial-parity-roots title="同一复多项式的偶根与奇根" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.Poly.evenRoot D5/S3/ContinuousObservables/IntervalSOSCompletion.Poly.oddRoot"}
对 $P(X)=\sum_j a_jX^j\in\mathbb C[X]$，定义

$$
\begin{aligned}
\operatorname{evenRoot}P(T)&=\sum_{m\ge0}a_{2m}T^m=\operatorname{contract}(2,P)(T),\\
\operatorname{oddRoot}P(T)&=\sum_{m\ge0}a_{2m+1}T^m
=\operatorname{contract}(2,P.\operatorname{divX})(T).
\end{aligned}
$$

这里 `divX` 丢掉常数项再降低指数；“根”指将指数折半，不是选取数值平方根。若 $P$ 为偶多项式，则 $P(x)=\operatorname{evenRoot}P(x^2)$；若为奇多项式，则 $P(x)=x\operatorname{oddRoot}P(x^2)$，包括 $x=0$。
:::

::: {.theorem #thm-native-phase-projected-lifting title="同一补全、同一原生相位元组在原始投影酉算子上的提升" lean="D5/S3/ContinuousObservables/PhaseSynthesisLifting.native_phase_lifting"}
设 $H,U,\Pi,\widetilde\Pi$ 满足 [@def-projected-unitary-word] 前的全部有限维、酉与自伴幂等假设。给定 $d\in\mathbb N$ 与 $p\in\mathbb R[X]$，假设

$$
0<d,\qquad \operatorname{natDegree}p\le d,\qquad
\operatorname{HasParity}(c(p),d),\qquad
|p(x)|\le1\quad(x\in[-1,1]).
$$

则存在**同一组联合见证** $B,C\in\mathbb R[X]$、$U_{\mathrm{field}}\in\mathcal A_2$、$\phi_0\in\mathbb R$、$\Phi\in\operatorname{List}(\mathbb R)$ 以及 $\Phi\ne[]$ 的见证，使以下各式全部同时成立。平方和与奇偶预算为

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le d,&\operatorname{natDegree}C&\le d-1,\\
d=0&\ \Longrightarrow\ C=0,\\
\operatorname{HasParity}(c(B),d)&,&\operatorname{HasParity}(c(C),d-1)&.
\end{aligned}
$$

这里 $d-1=\max(d-1,0)$ 为自然数截断减法；虽有 $d>0$，仍保留源声明中的 $d=0\Rightarrow C=0$ 合取项。对所有 $t\in T$，同一个矩阵场满足

$$
\begin{aligned}
U_{\mathrm{field}}&=\operatorname{phaseCompletion}(p,B,C),\\
U_{\mathrm{field}}(t)&=\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix},\\
\operatorname{star}(U_{\mathrm{field}})U_{\mathrm{field}}&=1,
&U_{\mathrm{field}}\operatorname{star}(U_{\mathrm{field}})&=1,\\
\det U_{\mathrm{field}}(t)&=1,
&\operatorname{Re}(U_{\mathrm{field}}(t)_{00})&=p(x(t)).
\end{aligned}
$$

同一原生相位元组满足

$$
\begin{aligned}
\Phi&\ne[],& |\Phi|&=d,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(c(p)+i\,c(B),c(C)),\\
\operatorname{phaseProduct}(\phi_0,\Phi)&=U_{\mathrm{field}}
\quad\text{在整个 }\mathcal A_2\text{ 中}.
\end{aligned}
$$

最后令 $\Psi=\operatorname{cor8Phases}(\phi_0,\Phi)$、$P=c(p)+i\,c(B)$、$E=\operatorname{ofRaw}(U,\Pi,\widetilde\Pi)$、$A=\widetilde\Pi U\Pi$、$G=A^*A$，则**这些相同见证**还满足

$$
\begin{aligned}
|\Psi|&=d,\\
S(\Psi,x)_{00}&=P(x)\quad\text{对每个 }x\in[0,1],\\
d\text{ 为偶数}&\ \Longrightarrow\
\Pi V_E(\Psi)\Pi=\Pi(\operatorname{evenRoot}P)(G)\Pi,\\
d\text{ 为奇数}&\ \Longrightarrow\
\widetilde\Pi V_E(\Psi)\Pi=A(\operatorname{oddRoot}P)(G).
\end{aligned}
$$

根多项式在 $G$ 处均作 `aeval` 求值。
:::

::: proof
从 [@thm-signed-circle-phase-factorization] 只取一次 $B,C,U_{\mathrm{field}},\phi_0,\Phi$；$|p|\le1$ 提供其所需的 $p^2\le1$。所有平方和、预算、场恒等式及多项式对合取项原样保留。$|\Phi|=d>0$ 给出非空性与 $|\Psi|=d$。

原生多项式递推给出区间旋转字的第一行为 $(P(x),i\,c(C)(x)s(x))$；这个归纳同时保留第二个分量，才能在乘下一步时得到正确的第一分量。以上反射约定传输只取 $00$ 元，因此对每个 $x\in[0,1]$ 得 $S(\Psi,x)_{00}=P(x)$。$P$ 与 $d$ 同奇偶；用同一个 $P$ 的偶根或奇根代入 [@thm-projected-unitary-polynomial-lifting]，即得原始算子的两种压缩结论。整个圆的四元矩阵场相等来自先前原生因子分解；最后的旋转—反射传输只需要并只使用 $00$ 等式。完整证明由 Lean 内核检查。
:::

::: {.example #ex-native-complex-lift title="正预算下复提升与实目标的区别（手算）"}
回到 $p=X/2$，取 $d=1$、$B=\sqrt3 X/2$、$C=1$，并令

$$
\phi_0=\pi/6,\qquad\Phi=[\pi/6],\qquad\Psi=[\pi/3].
$$

一次 `stepW` 给出

$$
\operatorname{qspPolyW}(\pi/6,[\pi/6])
=(e(\pi/3)X,1)=(c(p)+i\,c(B),c(C)).
$$

因此同一圆场的对角元为 $e(\pi/3)x$ 与 $e(-\pi/3)x$，非对角元为 $iy$；该补全在整个有符号圆上成立。反射字满足 $S([\pi/3],x)_{00}=e(\pi/3)x$，奇根为常数 $e(\pi/3)$。对任意上述原始编码，其压缩块为

$$
\widetilde\Pi V_E([\pi/3])\Pi=e(\pi/3)A
=\left(\frac12+i\frac{\sqrt3}{2}\right)A.
$$

它的实目标是 $A/2$ 对应的奇异值变换，但压缩块本身还含虚部。在前例的二维族取 $\sigma=1/2$ 时，$00$ 系数为 $1/4+i\sqrt3/4$，并非 $1/4$。不能把“实部读出等于 $p$”改写成已经实现实目标的整个通道。

偶预算也可以保留零谱：取 $p=1/2$、$d=2$、$B=\sqrt3/2,C=0$、$\phi_0=-\pi/6$、$\Phi=[\pi/2,0]$。多项式对依次为

$$
(e(-\pi/6),0)\ \longmapsto\ (e(\pi/3)X,-e(\pi/3))
\ \longmapsto\ (e(\pi/3),0).
$$

此时 $\Psi=[\pi/3,0]$，$S=D(\pi/3)$，$V_E=F_\Pi(\pi/3)$。偶根为常数 $e(\pi/3)$，所以 $\Pi V_E\Pi=e(\pi/3)\Pi$，包括 $A=0$ 的全部输入核。这里给出的是合法预算 $2$ 的同一相位例子，不是最短电路的结论。
:::

::: {.remark #rem-projected-lifting-provenance-boundaries title="证明复用、压缩语义与尚待连接的电路边界"}
[@thm-alternating-singular-pair-action]、[@thm-projected-unitary-polynomial-lifting] 的结构证明复用 shosonoda 的 [auto-res/lean-qsvt@42c4b9149d5957db497e4226bc02da92d10f7a3c](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c)，涉及 `QSVT/Operator/Basic.lean`、`Encoding/Projected.lean`、`QSP/Conventions.lean` 与 `SVT/PhaseOp.lean`、`AltSeq.lean`、`EigenBasis.lean`、`SVTransform.lean`、`SVD.lean`、`TwoVector.lean`、`TwoFrame.lean`、`SingularPair.lean`。约定传输复用 `QSVT/QSP/Conversion.lean` 从 `Wrot_eq_Rref` 到 `seqW_apply_zero_zero_eq` 的证明；原生标量递推与矩阵场由本章前节的接口连接。原作 Copyright (c) 2026 shosonoda，并保留 `Operator/Basic.lean` 所复用的 lean-quantum 中 Copyright (c) 2025 Hayata Yamasaki 归属；均为 Apache-2.0，完整许可保存在所钉主仓的 `docs/reports/licenses/auto-res-lean-qsvt-LICENSE.txt`。接收端的谱分解复用所钉 Mathlib 的标准定理。数学依据是 Gilyén–Su–Low–Wiebe，[arXiv:1806.01838v1，Definitions 15–16、Theorem 17（印刷页 17–19）及 Corollary 8](https://arxiv.org/abs/1806.01838v1)。这是既有数学的接收端形式桥接；有限架辅助步骤与约定整理不构成独立的新数学结果，也不解决外部开放问题。

目前的结论已经把同一原生相位对象接到任意秩投影与原始酉算子，但压缩块实现的是 $P=c(p)+i\,c(B)$。**一颗辅助比特的未缩放实部提取、字面电路实现、原始 $U/U^*$ 的精确调用计数、$d=0$ 的零查询 SAME 相位电路，以及物理来源与形式算子的对应**，仍须分别给出依据。一般不能把相位取负当成整个物理门字的伴随：取伴随还反转乘积次序并交换 $U$ 与 $U^*$。压缩等式也不保证全输出是确定性成功通道；未被投影读出的分量仍可能非零。
:::



::: {.viz src="walk-spreading" height="560"}
**游走扩散实验室。** 拖时间轴改步数，改硬币的份额 $w$ 与相位 $\varphi$，或把圈变短：上方青色是量子游走，下方灰色是经典随机游走，品红是量子分布比它的镜像多出的部分。绿色框是 [@lemma-symmetric-coin-walk]；宽度与失衡都是页面的数值。
:::
