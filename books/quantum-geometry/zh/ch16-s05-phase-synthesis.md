# 16.5 从完整多项式对到整个有符号圆的相位分解 {#sec-phase-synthesis}

上一节给出了矩阵的四个分量，现在还要回答一个不同的问题：能否把这**同一个矩阵场**写成有限个信号与相位的有序乘积？先在多项式层剥掉最后一步，再把每一步接回圆上的矩阵，便能保持补全见证不变。

以下结果复用 shosonoda 的 [auto-res/lean-qsvt 固定版本](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c) 中 `QSVT/QSP/Existence.lean` 的 `exists_phases` 及其在 `QSP/PolyW.lean`、`QSP/Poly.lean`、`Polynomial/Parity.lean` 中的辅助证明。原作 Copyright (c) 2026 shosonoda，采用 Apache-2.0；主仓在 `docs/reports/licenses/auto-res-lean-qsvt-LICENSE.txt` 保留完整许可。数学依据是 Gilyén–Su–Low–Wiebe，[arXiv:1806.01838v1，Theorem 3，式 (4)–(8)，印刷页 8–9](https://arxiv.org/abs/1806.01838v1)，即旋转约定下的充分性方向。主仓适配命名空间、导入与可见性，再接上原生有符号圆应用；这里不主张数学新颖性。完整[源码](lean:D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases)位于 `D5/S3/ContinuousObservables/PhaseSynthesis.lean`，对应冻结状态与 Blueprint 分别位于 `Golden/Frozen/state/D5/S3/ContinuousObservables/PhaseSynthesis.lean.json` 与 `Blueprint/D5/S3/ContinuousObservables/PhaseSynthesis.md`；这些文件及上述许可均以本书所钉源码树 [{commit}](trureturing:) 为准。

记 $R^\#=\sum_j\overline{r_j}X^j$ 为 $R=\sum_jr_jX^j\in\mathbb C[X]$ 的**系数共轭**（源码 `conjP`），不反转指数；对实数 $x$，$R^\#(x)=\overline{R(x)}$。令 $e(\phi)=\exp(i\phi)$，公式中标量乘法均指乘相应的常多项式。$\operatorname{HasParity}(R,m)$ 仍表示与 $m$ 奇偶性相反的系数全为零；$k-1=\max(k-1,0)$ 是自然数截断减法，$\operatorname{natDegree}0=0$。

::: {.definition #def-phase-polynomial-fold title="相位步与多项式对的左折叠" lean="D5/S3/ContinuousObservables/PhaseSynthesis.stepW D5/S3/ContinuousObservables/PhaseSynthesis.qspPolyW"}
对 $\phi\in\mathbb R$、$R,S\in\mathbb C[X]$ 定义

$$
\operatorname{stepW}_\phi(R,S)=
\bigl(e(\phi)[XR+(X^2-1)S],\ e(-\phi)[XS+R]\bigr).
$$

给定实数 $\phi_0$ 与实数列表 $\Phi=[\phi_1,\ldots,\phi_\ell]$，从 $(R_0,S_0)=(e(\phi_0),0)$ 开始，按列表次序令 $(R_j,S_j)=\operatorname{stepW}_{\phi_j}(R_{j-1},S_{j-1})$。定义 $\operatorname{qspPolyW}(\phi_0,\Phi)=(R_\ell,S_\ell)$；空列表给出 $(e(\phi_0),0)$。初始相位 $\phi_0$ 不占列表长度。
:::

::: {.theorem #thm-polynomial-phase-synthesis title="任意合法预算下完整复多项式对的精确相位合成" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases"}
对每个 $k\in\mathbb N$ 及每对 $P,Q\in\mathbb C[X]$，若

$$
\begin{aligned}
\operatorname{natDegree}P&\le k,\\
\operatorname{natDegree}Q&\le k-1,\\
k=0&\ \Longrightarrow\ Q=0,\\
\operatorname{HasParity}(P,k)&,\qquad
\operatorname{HasParity}(Q,k-1),\\
PP^\#+(1-X^2)QQ^\#&=1\quad\text{在 }\mathbb C[X]\text{ 中},
\end{aligned}
$$

则存在一个实数 $\phi_0$ 和一个实数列表 $\Phi$，同时满足

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(P,Q).
\end{aligned}
$$
:::

::: proof
**从预算 $k=n+1$ 剥去一步。** 写 $a=[X^{n+1}]P$、$b=[X^n]Q$。归一恒等式的 $X^{2n+2}$ 系数为零，次数上界保证没有更高项来贡献，因而

$$
a\overline a=b\overline b.
$$

若 $b\ne0$，$a/b$ 的模为 $1$；选实角 $\theta$ 使 $a/b=e(\theta)$，再取 $\phi=\theta/2$，即有 $e(-\phi)a=e(\phi)b$。若 $b=0$，上式迫使 $a=0$，直接取 $\phi=0$，不作除法。这包括实际次数低于预算的情形。

按源码 [`unstepW`](lean:D5/S3/ContinuousObservables/PhaseSynthesis.unstepW) 置

$$
\begin{aligned}
R&=e(-\phi)XP+e(\phi)(1-X^2)Q,\\
S&=e(\phi)XQ-e(-\phi)P.
\end{aligned}
$$

直接展开给出 $\operatorname{stepW}_\phi(R,S)=(P,Q)$，并给出保留归一化的恒等式

$$
RR^\#+(1-X^2)SS^\#=PP^\#+(1-X^2)QQ^\#=1.
$$

这里 $R$ 的粗次数界为 $n+2$，其最高系数是 $e(-\phi)a-e(\phi)b=0$；而 $R$ 具有奇偶性 $n$，故 $X^{n+1}$ 系数也为零，得到 $\operatorname{natDegree}R\le n$。$S$ 的粗次数界为 $n+1$，其最高系数是相反数，同样为零；$S$ 具有奇偶性 $n+1$，故 $X^n$ 系数为零，得到 $\operatorname{natDegree}S\le n-1$。当 $n>0$，$n+1$ 与 $n-1$ 同奇偶；当 $n=0$，粗降阶已使 $S$ 为常数，而其常数项为零，因此 $S=0$，也具有截断预算 $n-1=0$ 所需的偶性。不能仅凭 $\operatorname{natDegree}S\le0$ 就断言 $S=0$。

因此 $(R,S)$ 满足预算 $n$ 的全部假设。归纳给出 $\phi_0,\Phi'$ 后，在列表右端接回 $\phi$，即 $\Phi=\Phi'\mathbin{\text{++}}[\phi]$；长度由 $n$ 增为 $n+1$，左折叠精确返回原多项式对。即使 $a=b=0$，也逐次降低的是预算，不能跳到实际次数再丢掉所要求的长度。

**零预算与零分量。** $k=0$ 时显式条件给出 $Q=0$，而 $P$ 为常数 $u$，归一化给出 $|u|=1$。取 $e(\phi_0)=u$、$\Phi=[]$ 即可；没有把 $u$ 限定为 $1$。零多项式同时具有两种奇偶性，证明中的消项与次数界也覆盖零分量；整对 $(0,0)$ 则因归一化不可能成为输入。完整证明由 Lean 内核检查。
:::

::: {.definition #def-phase-field-product title="原生信号、对角相位与有序矩阵场乘积" lean="D5/S3/ContinuousObservables/PhaseSynthesis.phaseDiagonal D5/S3/ContinuousObservables/PhaseSynthesis.phaseProduct"}
令 $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$，$z(t)=\operatorname{windingPhase}(t)=e^{2\pi it}$，$x(t)=\operatorname{Re}z(t)$、$y(t)=\operatorname{Im}z(t)$。记

$$
\mathcal A_2=C\bigl(T,M_{\mathrm{ZMod}\,2}(\mathbb C)\bigr)
=\mathrm{CyclicObservable}\,2
$$

为以 $\mathrm{ZMod}\,2$ 作行列指标的连续复矩阵场代数；乘法逐点进行，星号为逐点共轭转置，$1$ 为常值单位矩阵场。定义常值场与信号场

$$
\begin{aligned}
D(\phi)(t)&=\operatorname{phaseDiagonal}(\phi)(t)
=\begin{pmatrix}e(\phi)&0\\0&e(-\phi)\end{pmatrix},\\
W(t)&=\operatorname{phaseCompletion}(X,0,1)(t)
=\begin{pmatrix}x(t)&iy(t)\\iy(t)&x(t)\end{pmatrix}.
\end{aligned}
$$

$\operatorname{phaseProduct}(\phi_0,\Phi)$ 是从 $D(\phi_0)$ 起，按 $\Phi$ 的次序反复作 $V\mapsto V\,W\,D(\phi)$ 的左折叠。因此

$$
\operatorname{phaseProduct}(\phi_0,[\phi_1,\ldots,\phi_\ell])
=D(\phi_0)(WD(\phi_1))\cdots(WD(\phi_\ell)).
$$

这里有序乘积从左至右按列表排列，作用于列向量时最右侧因子先作用；$y(t)$ 保留符号。
:::

::: {.theorem #thm-signed-circle-phase-factorization title="同一平方和见证的整个有符号圆相位分解" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phase_factorization"}
对每个 $k\in\mathbb N$ 与每个 $p\in\mathbb R[X]$，假设

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
\operatorname{HasParity}(c(p),k)&,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

则存在**同一组** $B,C\in\mathbb R[X]$、$U\in\mathcal A_2$、$\phi_0\in\mathbb R$ 与 $\Phi\in\operatorname{List}(\mathbb R)$，使以下全部条件同时成立：

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2\quad\text{在 }\mathbb R[X]\text{ 中},\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le k-1,\\
k=0&\ \Longrightarrow\ C=0,\\
\operatorname{HasParity}(c(B),k)&,\qquad
\operatorname{HasParity}(c(C),k-1).
\end{aligned}
$$

其中 $c$ 为实系数的复化，$k-1$ 取自然数截断减法。矩阵场见证满足

$$
\begin{aligned}
U&=\operatorname{phaseCompletion}(p,B,C),\\
U(t)&=\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}\quad(t\in T),\\
\operatorname{star}(U)U&=1,\qquad U\operatorname{star}(U)=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$

而且，对于精确的多项式对 $P=c(p)+i\,c(B)$、$Q=c(C)$，这些相位见证满足

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(c(p)+i\,c(B),c(C)),\\
\operatorname{phaseProduct}(\phi_0,\Phi)&=U\quad\text{在 }\mathcal A_2\text{ 中}.
\end{aligned}
$$
:::

::: proof
先从 [@thm-phase-unitary-completion] **只取一次** $B,C,U$，保留其平方和、次数、奇偶性、零预算条件与全部矩阵场结论。置 $P=c(p)+i\,c(B)$、$Q=c(C)$。实系数经共轭不变，所以 $P^\#=c(p)-i\,c(B)$、$Q^\#=Q$，平方和恒等式的复化恰好给出 $PP^\#+(1-X^2)QQ^\#=1$。次数与奇偶性满足 [@thm-polynomial-phase-synthesis]，于是得到长度恰为 $k$ 的相位列表与整个多项式对等式。

还需把一对多项式的等式送到**四个矩阵元**。对任意实数 $x,y$ 满足 $x^2+y^2=1$，记

$$
E_{x,y}(R,S)=\begin{pmatrix}
R(x)&iyS(x)\\iyS^\#(x)&R^\#(x)
\end{pmatrix}.
$$

直接矩阵相乘给出

$$
E_{x,y}(R,S)\begin{pmatrix}x&iy\\iy&x\end{pmatrix}D(\phi)
=E_{x,y}\bigl(\operatorname{stepW}_\phi(R,S)\bigr).
$$

此处只用 $y^2=1-x^2$，未假定 $y\ge0$。空列表给出 $D(\phi_0)$；逐步接回列表后，对每个 $t\in T$，整个相位乘积等于 $E_{x(t),y(t)}(P,Q)$。因 $Q=c(C)$ 为实系数，这恰是先前那一个 $\operatorname{phaseCompletion}(p,B,C)(t)$。连续矩阵场的逐点外延性给出 $\operatorname{phaseProduct}(\phi_0,\Phi)=U$；没有另换补全见证，也没有只取左上角实部。完整证明由 Lean 内核检查。
:::

::: {.example #ex-phase-zero-and-padded-budget title="零预算与低次数输入的较大合法预算（手算）"}
以下是对定义的显式验算，不是额外的形式定理。

**$k=0$ 保留任意单位常数。** 给定任意 $u\in\mathbb C$、$|u|=1$，$(P,Q)=(u,0)$ 满足全部假设；取 $e(\phi_0)=u$ 与空列表。对实目标 $p=1/2$，取 $B=\sqrt3/2,C=0$，则 $1-p^2=B^2=3/4$，$\phi_0=\pi/3$ 给出

$$
U=D(\pi/3)=\begin{pmatrix}
\frac12+i\frac{\sqrt3}{2}&0\\0&\frac12-i\frac{\sqrt3}{2}
\end{pmatrix}.
$$

**实际次数 $1$，指定预算 $3$。** 取 $(P,Q)=(X,1)$。它满足 $X^2+(1-X^2)=1$；$X$ 为奇多项式、$1$ 为偶多项式，故预算 $k=3$ 合法，虽然 $\operatorname{natDegree}P=1<3$。取

$$
\phi_0=-\pi/2,\qquad\Phi=[\pi/2,0,0].
$$

逐步代入定义，整个多项式对依次为

$$
(-i,0)\ \xrightarrow{\ \pi/2\ }\ (X,-1)
\ \xrightarrow{\ 0\ }\ (1,0)
\ \xrightarrow{\ 0\ }\ (X,1).
$$

第一步用 $e(\pi/2)=i$、$e(-\pi/2)=-i$；第二步的第一分量为 $X^2-(X^2-1)=1$，第二分量为 $-X+X=0$。这既核对长度恰为 $3$，也展示反向降阶中 $k=3$ 与 $k=2$ 的最高系数同时为零时仍能剥步。

对第二个定理，取 $p=X,B=0,C=1$，同样满足预算 $3$ 的全部平方和约束；上述列表给出 $U=W$ 的整个圆分解。取 $t=-1/6$，则 $x=1/2,y=-\sqrt3/2$，所得两个非对角元均为 $-i\sqrt3/2$。这与上一节的区间正平方根拉回的 $+i\sqrt3/2$ 不同。预算 $1$ 时也可取 $\phi_0=0,\Phi=[0]$，说明本定理规定的是给定合法预算的存在性，不是最短列表。
:::

::: {.remark #rem-phase-synthesis-boundaries title="精确相位存在性与后续算子接口的分界"}
[@thm-polynomial-phase-synthesis] 与 [@thm-signed-circle-phase-factorization] 给出合法多项式对的相位存在性，以及同一平方和补全在**整个原生有符号圆**上的精确分解。初始相位是列表之外另行存在量化的实数，并非可任意预先指定。它们不声称最优或可计算的相位求解器、相位唯一性、随输入连续的选择或数值稳定性。

旋转—反射约定与任意投影酉算子的提升将在下文 [@thm-native-phase-projected-lifting] 中用同一组见证连接。上半圆上的正平方根相等，仍不能代替整个有符号圆上的场相等；实部辅助比特、电路与查询的剩余边界见 [@rem-projected-lifting-provenance-boundaries]。
:::
