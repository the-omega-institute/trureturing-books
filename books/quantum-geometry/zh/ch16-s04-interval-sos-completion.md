# 16.4 从区间平方和到连续矩阵补全 {#sec-interval-sos-completion}


**先看端点缺了什么。** 取 $p(x)=x/2$。若坚持把实目标 $p$ 本身放在对角线上，要求 $p(x)^2+(1-x^2)Q(x)^2=1$，那么 $x=1$ 立即给出不可能的 $1/4=1$。缺口可以放进对角元的虚部：取

$$
\begin{aligned}
B(X)&=\frac{\sqrt3}{2}X, & C(X)&=1,\\
1-p(X)^2&=B(X)^2+(1-X^2)C(X)^2,\\
P(X)&=p(X)+iB(X)\\
&=\left(\frac12+i\frac{\sqrt3}{2}\right)X.
\end{aligned}
$$
这样端点处 $|P(1)|=1$，同时 $\operatorname{Re}P(x)=p(x)$。实目标仍被保留，只是归一化所需的其余分量有了容身之处。

区间平方和的文献依据是 Gilyén、Su、Low 与 Wiebe 上述论文的 [arXiv:1806.01838v1，Lemma 6 与 Theorems 3、5](https://arxiv.org/abs/1806.01838v1)（STOC 2019，doi:10.1145/3313276.3316366）。以下按该引理及 shosonoda 的 [lean-qsvt 固定版本](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c) 中 `exists_sumsq_decomposition`、`exists_complement` 的证明路线展开；该源码版权归 shosonoda（2026），采用 Apache-2.0 许可。[@thm-interval-sumsq-decomposition] 引用主仓对原平方和证明的复用，[@thm-phase-unitary-completion] 引用其原生连续矩阵场应用；不主张数学新颖性。

记 $c(R)=R.\mathrm{map}(\mathrm{algebraMap}\,\mathbb R\,\mathbb C)$ 为实多项式的复化。源码中的 $\operatorname{IsEven}(c(R))$ 表示所有奇次系数为零，$\operatorname{HasParity}(c(R),m)$ 表示与 $m$ 奇偶性相反的系数为零；对实多项式，这分别写成 $R(-X)=R(X)$ 与 $R(-X)=(-1)^mR(X)$。以下 $k-1$ 的自然数减法均取截断值 $\max(k-1,0)$，$\operatorname{natDegree}0=0$。

::: {.theorem #thm-interval-sumsq-decomposition title="任意次数预算下的偶多项式区间平方和" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_sumsq_decomposition"}

给定任意 $k\in\mathbb N$ 与实多项式 $A\in\mathbb R[X]$，假设

$$
\begin{aligned}
A(-X)&=A(X),\\
\operatorname{natDegree}A&\le 2k,\\
A(x)&\ge0\quad(-1\le x\le1).
\end{aligned}
$$
则存在实多项式 $B,C$，使下面是**多项式恒等式**，而不只是区间内的数值等式：

$$
\begin{aligned}
A&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le \max(k-1,0),\\
B(-X)&=(-1)^kB(X),\\
C(-X)&=(-1)^{\max(k-1,0)}C(X),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$
:::

::: proof
这里自然数减法取截断值 $\max(k-1,0)$，零多项式的 $\operatorname{natDegree}$ 为 $0$；零多项式同时具有偶性与奇性。特别地，$\operatorname{natDegree}C\le0$ 只说明 $C$ 为常数，**不能替代** $k=0$ 时的 $C=0$ 条件。若 $A=0$，任意 $k$ 都可取 $B=C=0$；若 $k=0$，$A=a\ge0$ 为常数，可取 $B=\sqrt a$、$C=0$。

**为何因子能逐个补全？** 偶性与实系数使非零多项式的根按 $s,-s,\bar s,-\bar s$ 配对，连重数也保留。区间内部的实根必须具有偶重数，否则穿过根时会变号；原证明据此先剥出二重因子。具体可剥出的非负因子有三类：

- 对 $s^2=v\in\mathbb R$、$v\notin(0,1)$，选择符号后的二次因子为 $F_v=|1-v|X^2+|v|(1-X^2)$。它等于 $X^2-v$（$v\le0$）或 $v-X^2$（$v\ge1$），取 $B_v=\sqrt{|1-v|}X$、$C_v=\sqrt{|v|}$ 即得其平方和；$v=0$ 包括因子 $X^2$。
- 对内部非零实根 $\pm r$（$0<r^2<1$），剥出 $F=(X^2-r^2)^2$，取 $B=X^2-r^2$、$C=0$。
- 对 $a=s^2\notin\mathbb R$，共轭配对给出四次实因子。原证明采用的系数是

$$
\begin{aligned}
F_a&=(X^2-a)(X^2-\bar a)\\
&=X^4-2\operatorname{Re}(a)X^2+|a|^2,\\
\alpha&=|a|+|a-1|\ge1,\\
B_a&=\alpha X^2-|a|,\\
C_a&=\sqrt{\alpha^2-1}\,X.
\end{aligned}
$$

展开即有 $F_a=B_a^2+(1-X^2)C_a^2$。其中 $|a-1|^2=|a|^2-2\operatorname{Re}a+1$ 保证二次项系数正确；三角不等式保证根号内非负。

写成 $A=FG$ 后，余因子 $G$ 仍是偶多项式。在 $F>0$ 处，$G=A/F\ge0$；不能在 $F$ 的零点直接作除法。所剥因子只在有限多个区间点为零，由多项式的连续性，非负性从这些点之外延伸到零点，包括端点的单侧极限。这正是对余因子继续归纳所需的条件。

各因子的补全通过带权 Brahmagupta 恒等式相乘。令 $w=1-X^2$，则

$$
\begin{aligned}
&(B_1^2+wC_1^2)(B_2^2+wC_2^2)\\
&\quad=(B_1B_2-wC_1C_2)^2\\
&\qquad\quad+w(B_1C_2+B_2C_1)^2.
\end{aligned}
$$

原证明对次数预算 $k$ 作强归纳：常数用平方根起步；剥去次数 $2j$ 的上述因子（$j=1$ 或 $2$），余因子的次数至多 $2(k-j)$，再以此恒等式接回，次数与奇偶性同时相加。便于相乘的等价记账方式是同时控制 $B$ 与 $XC$ 的次数不超过 $k$、奇偶性同为 $k$。

若实际次数较低，还可以在区间上把 $B+i\sqrt{1-x^2}C$ 乘以模长为 $1$ 的 $x+i\sqrt{1-x^2}$，对应多项式变换

$$
\begin{aligned}
\widetilde B&=XB-(1-X^2)C,\\
\widetilde C&=B+XC.
\end{aligned}
$$

同一恒等式说明平方和不变；预算由 $k$ 增至 $k+1$，奇偶性随之翻转。因此次数不足时也能补到指定的奇偶预算，不要求 $\deg A=2k$。

完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-phase-unitary-completion title="有界奇偶多项式的原生连续酉补全" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_phase_unitary_completion"}
设 $k\in\mathbb N$、$p\in\mathbb R[X]$ 满足 $\operatorname{HasParity}(c(p),k)$，且

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

令 $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$，$z(t)=\operatorname{windingPhase}(t)$，$x(t)=\operatorname{Re}z(t)$、$y(t)=\operatorname{Im}z(t)$。则存在 $B,C\in\mathbb R[X]$ 与 $U:\mathrm{CyclicObservable}\,2$，其中该类型是 $T$ 上以 $\mathrm{ZMod}\,2$ 为行列指标的连续复矩阵场，使

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le\max(k-1,0),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$

并有 $\operatorname{HasParity}(c(B),k)$ 与 $\operatorname{HasParity}(c(C),\max(k-1,0))$。这里第一行是 $\mathbb R[X]$ 中的恒等式。矩阵场见证满足 $U=\operatorname{phaseCompletion}(p,B,C)$，即对每个 $t\in T$，

$$
U(t)=
\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}.
$$

在连续矩阵场代数中，$\operatorname{star}$ 是逐点共轭转置，$1$ 是常值单位矩阵场，同时有

$$
\begin{aligned}
\operatorname{star}(U)\,U&=1,\\
U\,\operatorname{star}(U)&=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$
:::

::: proof
$A=1-p^2$ 满足 [@thm-interval-sumsq-decomposition] 的偶性、次数与闭区间非负条件，故得到具有所列全部约束的 $B,C$。对原生圆坐标有 $x(t)^2+y(t)^2=1$，求值平方和恒等式得 $p(x(t))^2+B(x(t))^2+y(t)^2C(x(t))^2=1$。各矩阵元由连续坐标与多项式求值组成；直接相乘给出左右两条星乘积与行列式等式，左上角实部则由矩阵公式读出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-interval-sos-completion-bridges title="补全的手算展开与适用边界"}
以下保留补全的显式代数展开。复多项式配对、逐矩阵元实部与 Hermitian 部分的完整等式、以及与区间平方根拉回的比较，是手算说明，未包含在上述两条 Lean 声明的结论中；这两条声明本身不含相位乘积分解与查询界；同一补全的相位分解由下一节 [@thm-signed-circle-phase-factorization] 另行给出。

**把亏量变成矩阵的其余分量。** 现在令实多项式 $p$ 满足 $\operatorname{natDegree}p\le k$、$p(-X)=(-1)^kp(X)$，以及 $p(x)^2\le1$（$x\in[-1,1]$）。对偶多项式 $A=1-p^2$ 应用上述分解，保留所得 $B,C$ 的全部次数、奇偶与 $k=0$ 条件，再置 $P=p+iB$、$Q=C$。于是

$$
\begin{aligned}
P\bar P+(1-X^2)Q\bar Q&=1,\\
\operatorname{Re}P&=p.
\end{aligned}
$$

此处横线是系数共轭，实数求值后就是普通复共轭；$P,Q$ 分别具有次数上界 $k$、$\max(k-1,0)$ 与相应奇偶性，且 $k=0$ 时 $Q=0$。这给出了 Theorem 3 所用的补全数据。Theorem 5 可以同时指定 $P,Q$ 的实部；本处原源码选用 $Q=C$，只要求 $\operatorname{Re}P=p$，**没有要求 $\operatorname{Re}Q=0$**。

在区间上令 $s=\sqrt{1-x^2}$。Theorem 3 的一般复补全矩阵是

$$
U_{\mathrm{int}}(x)=
\begin{pmatrix}
P(x)&isQ(x)\\
is\overline{Q(x)}&\overline{P(x)}
\end{pmatrix}.
$$

对这里的实 $Q=C$，令 $K=B(x)\sigma_z+sC(x)\sigma_x$，其中

$$
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

因为 $\sigma_z\sigma_x+\sigma_x\sigma_z=0$，直接相乘得到

$$
\begin{aligned}
U_{\mathrm{int}}&=p(x)I+iK, & K^*&=K,\\
K^2&=\bigl(B(x)^2+s^2C(x)^2\bigr)I\\
&=(1-p(x)^2)I,\\
U_{\mathrm{int}}^*U_{\mathrm{int}}&=p(x)^2I+K^2=I,\\
U_{\mathrm{int}}U_{\mathrm{int}}^*&=p(x)^2I+K^2=I.
\end{aligned}
$$

**圆上的连续性与符号。** 用圆自身的坐标 $z=e^{2\pi it}$（$t\in\mathbb R/\mathbb Z$）、$x=\operatorname{Re}z$、$y=\operatorname{Im}z$，以有符号的 $y$ 取代 $s$，定义

$$
U_{\mathrm{circ}}(z)=
\begin{pmatrix}
p(x)+iB(x)&iyC(x)\\
iyC(x)&p(x)-iB(x)
\end{pmatrix}.
$$

由于 $x^2+y^2=1$，有 $p(x)^2+B(x)^2+y^2C(x)^2=1$。把上面的 $K$ 换成 $K_z=B(x)\sigma_z+yC(x)\sigma_x$，同样的相乘给出

$$
\begin{aligned}
U_{\mathrm{circ}}^*U_{\mathrm{circ}}&=I,\\
U_{\mathrm{circ}}U_{\mathrm{circ}}^*&=I,\\
\det U_{\mathrm{circ}}&=p(x)^2+B(x)^2+y^2C(x)^2\\
&=1,\\
\operatorname{Re}_{\mathrm{entry}}U_{\mathrm{circ}}&=p(x)I,\\
\frac{U_{\mathrm{circ}}+U_{\mathrm{circ}}^*}{2}&=p(x)I.
\end{aligned}
$$

$\operatorname{Re}_{\mathrm{entry}}$ 表示逐矩阵元取实部，末行则是 Hermitian 部分。这两种取法在这个实 $C$ 的补全中恰好相同。所有矩阵元都是连续坐标 $x,y$ 的多项式组合，所以这是连续的 $\mathrm{SU}(2)$ 圆环；在 $x=\pm1$ 处没有除法，也不需选平方根的符号。$k=0$ 时 $C=0$，得到常对角相位矩阵 $\operatorname{diag}(p+iB,p-iB)$。

与区间拉回 $U_{\mathrm{int}}(\operatorname{Re}z)$ 的同一性只在上半圆 $y\ge0$ 上得到保证，因为 $\sqrt{1-\cos^2\theta}=|\sin\theta|$。例如合法补全 $P=X,Q=1$ 在 $\theta=-\pi/3$ 时，区间拉回的两个非对角元为 $i\sqrt3/2$，有符号圆环的则为 $-i\sqrt3/2$。两者都幺正，却不是同一个圆环。这里得到的是多项式亏量的补全及其连续矩阵后果；其中整个有符号圆的相位分解将由下一节单独证明；这两条补全声明本身不提供相位选择的连续性、查询复杂度或完整块编码 QSVT 的结论，也不涉及经验物理断言。
:::
