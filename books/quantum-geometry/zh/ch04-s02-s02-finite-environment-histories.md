# J.1 有限环境的历史实现与饱和障碍 {#sec-ch04-s02-s02-finite-environment-histories}


> 漏出去的振幅不回来，不是因为它消失了，而是因为迎面来的环境永远是新的。

::: {.remark #rem-arbitrary-density-prefix title="任意初始环境密度的精确前缀界（手工应用推导）"}
**手工应用推导，未在本书形式化。** 全时间回返并不排除有限窗口；但若两个纯态始终不动、它们之间的相干严格按等比数列衰减，窗口长度也会受到固定环境维数的限制。以下沿用[源理论卷 §§9–10，Theorem 10.1 的证明](https://github.com/the-omega-institute/trureturing/blob/3476ce98dd3c4326181683b37fc2ddad3e33a743/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L980-L1058)。源定理针对平衡十维信道：它在固定坐标变换中找到正交态 $h_+,h_-$，验证两个纯投影不变、相干乘子为 $\lambda=1-4p$ 且 $|\lambda|<1$，再作分支历史与有限 Prony 消去。这里以 $a,b$ 对应 $h_+,h_-$，将同一段证明用于满足相同二态条件的模型；下述通用二态表述是应用整理，源定理本身仍是该十维信道的结论。相关研究入口为 [trureturing #31041](https://github.com/the-omega-institute/trureturing/issues/31041)。

固定整数 $m\ge2,d\ge1$、自然数 $N$、实数 $-1<\lambda<1$，以及 $\mathbb C^m$ 中的正交单位向量 $a,b$。令 $E=\mathbb C^d$，环境初态 $\sigma\in M_d(\mathbb C)$ 半正定且 $\Tr\sigma=1$，允许任意秩及任意基下的相干。一个固定酉算子 $W$ 作用于 $\mathbb C^m\otimes E$，实际约化映射为

$$
\Psi_n(X)=\Tr_E\bigl(W^n(X\otimes\sigma)W^{*n}\bigr).
$$

初始环境与系统输入独立；$W,E,\sigma,a,b,\lambda$ 在整个窗口内保持固定，没有重置、中间干预、外部时钟控制或环境更换。记 $P_a=\lvert a\rangle\langle a\rvert$、$P_b=\lvert b\rangle\langle b\rvert$ 及 $O=\lvert a\rangle\langle b\rvert$。若对每个 $0\le n\le N$ 都有

$$
\begin{aligned}
\Psi_n(P_a)&=P_a,\qquad \Psi_n(P_b)=P_b,\\
\langle a,\Psi_n(O)b\rangle&=\lambda^n,
\end{aligned}
$$

则 $N+1\le d^2$：包括第零项在内，不能匹配超过 $d^2$ 个这样的精确等比相干样本。$O$ 本身不是密度矩阵；这里的映射由上述公式定义在所有系统矩阵上。若已知整个信道在密度矩阵上相等，线性性也确定其对 $O$ 的作用。

**从纯输出读出实际分支。** $N=0$ 时，结论就是 $1\le d^2$；以下取 $N\ge1$。在 $\sigma$ 的正支集 $S=\operatorname{supp}\sigma$ 上作谱分解

$$
\sigma=\sum_{j=1}^r s_j\lvert e_j\rangle\langle e_j\rvert,
\qquad s_j>0,\quad \sum_j s_j=1,
$$

其中 $r=\dim S$，$e_j$ 为 $S$ 的正交单位基。纯输出 $\Psi_n(P_a)=P_a$ 意味着离开 $a$ 方向的总概率为零：

$$
\begin{aligned}
0&=\Tr\bigl((I-P_a)\Psi_n(P_a)\bigr)\\
&=\sum_j s_j\bigl\|((I-P_a)\otimes I_E)W^n(a\otimes e_j)\bigr\|^2.
\end{aligned}
$$

每项非负且 $s_j>0$，故每项都为零。由线性性，对所有 $e\in S$ 有

$$
\begin{aligned}
W^n(a\otimes e)&=a\otimes T_{a,n}e,\\
W^n(b\otimes e)&=b\otimes T_{b,n}e
\qquad(0\le n\le N).
\end{aligned}
$$

酉性保证每个 $T_{a,n},T_{b,n}:S\to E$ 保内积，且 $T_{a,0},T_{b,0}$ 都是支集的包含映射。这里对角化的是任意给定的 $\sigma$，没有假设它在某个指定基下对角，也没有用纯化扩大环境维数。

**同一个演化保证历史相容。** 置

$$
F_a=\operatorname{span}\{T_{a,n}S:0\le n<N\}.
$$

对每个生成向量，实际的 $W$ 满足

$$
W(a\otimes T_{a,n}e)=a\otimes T_{a,n+1}e.
$$

因此 $W$ 将 $a\otimes F_a$ 映入 $a\otimes E$，定义单一线性等距映射 $L_a:F_a\to E$，使 $L_aT_{a,n}e=T_{a,n+1}e$。若若干历史向量的线性组合为零，对它施加实际的线性算子 $W$ 后仍为零，所以上述赋值尊重所有线性关系，并非另行假设各时刻独立选出的历史相容。由于 $F_a$ 与 $L_a(F_a)$ 等维，它们在 $E$ 中的正交补也等维；在两补空间之间选一个保内积双射，就将 $L_a$ 延拓为 $E$ 上的酉算子 $A$。对 $b$ 分支同样得到酉算子 $B$。归纳给出

$$
A^ne=T_{a,n}e,\qquad B^ne=T_{b,n}e
\quad(e\in S,\ 0\le n\le N).
$$

这两个辅助算子只重现受占支集上的窗口历史，并未给出 $W$ 在整个联合空间上的受控分解。

**相干成为有限个圆周频率的叠加。** 定义辅助序列 $f_n=\Tr(A^n\sigma B^{-n})$（$n\ge0$）。在窗口内，对实际非对角输入作偏迹得到

$$
\begin{aligned}
\langle a,\Psi_n(O)b\rangle
&=\sum_j s_j\langle B^ne_j,A^ne_j\rangle\\
&=\Tr(A^n\sigma B^{-n})=f_n=\lambda^n.
\end{aligned}
$$

窗口之外不要求该辅助序列与实际 $W$ 的读数相同。将 $A=\sum_i u_iP_i$、$B=\sum_j v_jQ_j$ 作谱分解，$|u_i|=|v_j|=1$，便有

$$
\begin{aligned}
f_n&=\sum_{i,j}c_{ij}(u_i\overline{v_j})^n,\\
c_{ij}&=\Tr(P_i\sigma Q_j).
\end{aligned}
$$

这些权重可以是复数，不能当成非负概率；任意密度下也不能直接套用最大混合态的正 Gram 矩阵与正交增量论证。合并相同频率并删除合并后权重为零的项，得到 $f_n=\sum_{\ell=1}^K\alpha_\ell\omega_\ell^n$，其中 $|\omega_\ell|=1$。每个酉算子至多有 $d$ 个不同特征值，且 $f_0=\Tr\sigma=1$ 保证至少留下一项，故 $1\le K\le d^2$。

有限 Prony 消去式只需多项式

$$
q(z)=\prod_{\ell=1}^K(z-\omega_\ell)=\sum_{j=0}^K q_jz^j.
$$

逐项代入即得 $\sum_{j=0}^Kq_jf_j=\sum_\ell\alpha_\ell q(\omega_\ell)=0$，不需要权重为正。若 $N\ge K$，窗口内的等比值便给出 $q(\lambda)=0$；但 $q$ 的根全在单位圆上，而 $|\lambda|<1$，矛盾。因此 $N<K\le d^2$，也就是 $N+1\le d^2$。零与负的 $\lambda$ 均包含在内：第零幂始终为 $1$；在 $\lambda=0$ 时，$q(0)=(-1)^K\prod_\ell\omega_\ell\ne0$。端点 $\lambda=\pm1$ 不满足严格收缩条件，这个矛盾在那里不成立。

对单比特去相位取 $m=2,a=e_0,b=e_1$，对角纯态保持不动、副对角元乘以 $\lambda^n$，恰好满足以上条件。因此 $d=2$ 时 $N\le3$，任意初始环境密度都不能支持一直到第四步的精确共同前缀。这只是所述自主模型的必要界；四步窗口的三能级可达性另见 [@rem-four-step-qutrit]。该必要界本身不提供一般窗口的精确最小环境维数、一般可达性、近似误差界或任意谱矩数据的物理实现，也不把该条件结论当作普遍物理定律。未受干预的边缘信道恒等式同样不确定保留环境的完整联合态历史或带中间干预的过程张量。上述通用应用的形式化状态仍未核定，不能因其组成结果已有验证而将它称为 Lean 已验证。
:::

::: {.remark #rem-four-step-qutrit title="一个三能级环境的四步共同实现（书面推导）"}

**普通书面推导，未在本书形式化。** 前面的必要界排除了四步窗口中的二级环境，却没有给出三级环境。这里把环境拆成一条静止的线与一个旋转的二维平面：静止线贡献常数，两套条件旋转在平面上的迹重叠贡献两个余弦。恰当选择它们的角度与权重，就能让同一个六阶酉矩阵的前四个非平凡幂产生所需的等比相干。这里的“平面”是复二维子空间，迹重叠是代数机制，不另引入一个随时间更新的随机环境。

**对象与量词。** 固定任意实数 $-1<\lambda<1$，系统为 $S=\mathbb C^2$，环境为 $E=\mathbb C^3$。对任意复矩阵 $X=(x_{ij})\in M_2(\mathbb C)$，定义

$$
\mathcal D_\lambda(X)=
\begin{pmatrix}x_{00}&\lambda x_{01}\\\lambda x_{10}&x_{11}\end{pmatrix},
\qquad \mathcal D_\lambda^0=\operatorname{id}.
$$

该映射也可写成 $\frac{1+\lambda}{2}X+\frac{1-\lambda}{2}Z_SXZ_S$，其中 $Z_S=\operatorname{diag}(1,-1)$，故零与负的 $\lambda$ 也给出信道。目标是先为这个 $\lambda$ 选定一组 $W,\sigma$，然后同时覆盖所有输入和 $n=0,1,2,3,4$；不是为每个输入或每个时刻另选实现。第零幂约定为 $1$，包括 $\lambda=0$。

**显式参数。** 以下参数只依赖 $\lambda$：

$$
\begin{aligned}
D&=\sqrt{\lambda^2+2\lambda+5},&
p&=\frac{1+\lambda}{5-3\lambda},\\
k&=\frac{2\lambda}{D},&r&=\sqrt{1-k^2},\\
x_+&=\frac{\lambda-1+D}{4},&x_-&=\frac{\lambda-1-D}{4},\\
\theta_+&=\arccos x_+,&\theta_-&=\arccos x_-,\\
\alpha&=\frac{\theta_++\theta_-}{2},&
\beta&=\frac{\theta_--\theta_+}{2}.
\end{aligned}
$$

所有分母与根号都有明确的定义域。因为 $D^2=(\lambda+1)^2+4>0$、$5-3\lambda>2$，有

$$
\begin{aligned}
0<p<1,\qquad 1-p&=\frac{4(1-\lambda)}{5-3\lambda}>0,\\
1-k^2&=\frac{(\lambda+1)(5-3\lambda)}{D^2}>0.
\end{aligned}
$$

所以 $-1<k<1$、$r>0$。两个节点是 $q(x)=x^2-\frac{\lambda-1}{2}x-\frac{\lambda+1}{4}$ 的根。由 $q(-1)=(\lambda+1)/4>0$、$q(0)=-(\lambda+1)/4<0$、$q(1)=(5-3\lambda)/4>0$，得到 $-1<x_-<0<x_+<1$。于是两个反余弦都取在 $(0,\pi)$，并且 $\alpha-\beta=\theta_+$、$\alpha+\beta=\theta_-$。

**固定的矩阵。** 在环境的二维块上用 $Z,X_P$ 表示 Pauli 矩阵，避免与任意系统输入 $X$ 混淆：

$$
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
X_P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
H=kZ+rX_P.
$$

在 $E=\mathbb C\oplus\mathbb C^2$ 上取

$$
\begin{aligned}
A&=1\oplus A_2,\qquad A_2=\cos\alpha\,I_2+\mathrm i\sin\alpha\,Z,\\
B&=1\oplus B_2,\qquad B_2=\cos\beta\,I_2+\mathrm i\sin\beta\,H,\\
A&=\begin{pmatrix}
1&0&0\\0&e^{\mathrm i\alpha}&0\\0&0&e^{-\mathrm i\alpha}
\end{pmatrix},\\
B&=\begin{pmatrix}
1&0&0\\
0&\cos\beta+\mathrm i k\sin\beta&\mathrm i r\sin\beta\\
0&\mathrm i r\sin\beta&\cos\beta-\mathrm i k\sin\beta
\end{pmatrix},\\
\sigma&=\operatorname{diag}\left(p,\frac{1-p}{2},\frac{1-p}{2}\right).
\end{aligned}
$$

令 $P_0=\lvert0\rangle\langle0\rvert$、$P_1=\lvert1\rangle\langle1\rvert$ 为系统投影，并定义唯一使用的联合酉矩阵

$$
W=P_0\otimes A+P_1\otimes B
=\begin{pmatrix}A&0_3\\0_3&B\end{pmatrix}
\quad\text{on }\mathbb C^2\otimes\mathbb C^3.
$$

这里 $W$ 是 $6\times6$ 矩阵。$Z^*=Z$、$X_P^*=X_P$、$Z^2=X_P^2=I_2$、$ZX_P+X_PZ=0$ 给出 $H^*=H$、$H^2=(k^2+r^2)I_2=I_2$。任意自伴对合 $K$ 都满足 $(\cos t\,I+\mathrm i\sin t\,K)(\cos t\,I-\mathrm i\sin t\,K)=I$，故 $A,B,W$ 均酉。$\sigma$ 的三个对角元严格为正且总和为 $1$，所以它是满秩密度矩阵，并与 $A,B$ 交换。满秩是本见证的选择，不是对所有可能实现的假设；受控形式也是这里的构造，不用于限制前述必要界中的任意 $W$。

**共同幂怎样产生两个余弦。** 对自伴对合的乘法用角度加法公式归纳，得

$$
\begin{aligned}
A_2^n&=\cos(n\alpha)I_2+\mathrm i\sin(n\alpha)Z,\\
B_2^{-n}&=\cos(n\beta)I_2-\mathrm i\sin(n\beta)H
\qquad(n\ge0).
\end{aligned}
$$

利用 $\Tr Z=\Tr H=0$、$\Tr(ZH)=2k$，实际相干乘子为

$$
\begin{aligned}
f_n&=\Tr(A^n\sigma B^{-n})=p+(1-p)g_n,\\
g_n&=\tfrac12\Tr(A_2^nB_2^{-n})\\
&=\cos(n\alpha)\cos(n\beta)+k\sin(n\alpha)\sin(n\beta)\\
&=w\cos(n\theta_+)+(1-w)\cos(n\theta_-),\\
w&=\frac{1+k}{2}=\frac12+\frac{\lambda}{D}\in(0,1).
\end{aligned}
$$

这一步保留了 $A^nB^{-n}$ 的次序，不把它偷换成 $(AB^{-1})^n$，也不要求 $A,B$ 交换。令 $T_n$ 为第一类 Chebyshev 多项式，即 $T_n(\cos\theta)=\cos(n\theta)$。于是 $g_n=wT_n(x_+)+(1-w)T_n(x_-)$。

**前四步的精确矩。** 记 $M_j=wx_+^j+(1-w)x_-^j$。节点的二次方程立即给出

$$
\begin{aligned}
M_0&=1,\qquad M_1=\frac{3\lambda-1}{4},\\
M_{j+2}&=\frac{\lambda-1}{2}M_{j+1}
+\frac{\lambda+1}{4}M_j\qquad(j\ge0).
\end{aligned}
$$

将递推代入 $T_0=1$、$T_1=x$、$T_2=2x^2-1$、$T_3=4x^3-3x$、$T_4=8x^4-8x^2+1$，逐项得到

$$
\begin{aligned}
g_0&=1,\\
g_1&=\frac{3\lambda-1}{4},\\
g_2&=\frac{3\lambda^2-2\lambda-1}{4},\\
g_3&=\frac{3\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_4&=\frac{3\lambda^4-2\lambda^3-2\lambda^2-2\lambda-1}{4}.
\end{aligned}
$$

其中对 $1\le n\le4$，统一写法为 $4g_n=3\lambda^n-2\sum_{j=1}^{n-1}\lambda^j-1$；空和为零。用 $(1-\lambda)\sum_{j=1}^{n-1}\lambda^j=\lambda-\lambda^n$，无需除以 $\lambda$，便得到

$$
\begin{aligned}
f_0&=p+(1-p)=1,\\
f_n&=\frac{1+\lambda+4(1-\lambda)g_n}{5-3\lambda}
=\lambda^n\qquad(1\le n\le4).
\end{aligned}
$$

例如 $\lambda=0$ 时，$p=1/5$、$k=0$、$r=1$、$x_\pm=(-1\pm\sqrt5)/4$，上述式子直接给出 $(f_0,f_1,f_2,f_3,f_4)=(1,0,0,0,0)$。负的 $\lambda$ 同样使用这些矩阵与恒等式，不另分支修改动力学。

**从标量回到整个信道。** 设 $E_{ij}=\lvert i\rangle\langle j\rvert$。由系统投影的正交性，$W^n=P_0\otimes A^n+P_1\otimes B^n$。两个对角矩阵单位的环境迹均为 $1$，两个非对角矩阵单位分别得到 $f_n$ 与 $\overline{f_n}$。因此对每个 $X\in M_2(\mathbb C)$，

$$
\begin{aligned}
\Psi_n(X)&:=\Tr_E\bigl(W^n(X\otimes\sigma)W^{-n}\bigr)\\
&=\begin{pmatrix}x_{00}&f_nx_{01}\\\overline{f_n}x_{10}&x_{11}\end{pmatrix}\\
&=\mathcal D_\lambda^n(X)=\mathcal D_{\lambda^n}(X)
\qquad(0\le n\le4).
\end{aligned}
$$

任取正整数 $s$ 与有限维未触碰参考 $R=\mathbb C^s$，将任意系统—参考矩阵写成 $Y=\sum_{a,b}X_{ab}\otimes F_{ab}$，其中 $F_{ab}$ 是参考矩阵单位。在 $Y\otimes\sigma$ 所用的 $S\otimes R\otimes E$ 次序上，显式定义标准酉置换与实际演化：

$$
\begin{aligned}
J&:S\otimes R\otimes E\longrightarrow S\otimes E\otimes R,\\
J(u\otimes v\otimes z)&=u\otimes z\otimes v,\\
\widehat{W}&=J^{-1}(W\otimes I_R)J,\\
\widehat{W}^{\,n}&=J^{-1}(W^n\otimes I_R)J.
\end{aligned}
$$

置换只固定张量记号；$\widehat{W}$ 在参考上取恒等，并始终使用同一个 $W$。对每个 $X_{ab}$ 使用上一式，得到

$$
\begin{aligned}
&\Tr_E\bigl[\widehat{W}^{\,n}(Y\otimes\sigma)
\widehat{W}^{-n}\bigr]\\
&\qquad=(\mathcal D_\lambda^n\otimes\operatorname{id}_R)(Y)
\qquad(0\le n\le4).
\end{aligned}
$$

这包括所有可能纠缠的系统—参考密度矩阵；初始环境必须与系统—参考独立。环境只制备一次，同一个 $W,E,\sigma$ 覆盖所有时刻，中间没有干预、重置、环境更换或外部时钟控制，也不假设后续联合态重新因子化。

**已知标量方法与实现的边界。** 节点 $1,x_+,x_-$ 及权重 $p,(1-p)w,(1-p)(1-w)$ 与 Poisson–Chebyshev 矩的三节点 Gauss–Radau 端点求积相联系：这三个节点匹配所有次数不超过四的多项式矩。这是已知的标量矩方法；这里的证据是上面的直接公式与 $1+2$ 块实现，而不是引用一条未经核对的求积定理。任意标量求积节点和权重未必都能由固定维数的共同酉幂实现。有关已知方法可参看 [Radau 求积的说明](https://mathworld.wolfram.com/RadauQuadrature.html)；本构造不承担全球数学新颖性声明。

结合 [@rem-arbitrary-density-prefix] 中仍未形式化的任意密度必要界，$N=4$ 时 $5\le d^2$ 排除 $d\le2$，本构造达到 $d=3$。因此，在这里精确定义的自主单比特去相位模型中，对每个 $-1<\lambda<1$，允许选择任意初始环境密度的四步最小环境维数在普通书面推导层面为 $3$；这不是 Lean 最小性结论。完整信道及参考恒等式尚未形式化；现有 Lean 检查只覆盖部分参数、矩阵与迹恒等式，不能替代完整结论。构造来源与部分形式证据见 [trureturing #31054 的结果说明](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903256672)。

继续同一递推到 $T_5=16x^5-20x^3+5x$，得到

$$
\begin{aligned}
g_5&=\frac{3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4}{4},\\
f_5-\lambda^5&=1-\lambda^2>0.
\end{aligned}
$$

所以这组矩阵不能继续实现第五步；这并不排除另一组三能级矩阵。一般窗口的精确最小维数、一般相容迹矩的实现以及完整近似资源—误差权衡仍未解决；下一个注记保存的是小泄漏下的加权历史接口。本构造不延伸到源理论卷的平衡十维信道，不给出保留环境的完整联合历史或插入干预的过程张量恒等式，也不提供实验支持或模型普适性结论。

**有限酉膨胀仍缺哪一步。** 文献结果，未在本书形式化。Farenick 的[有限幂酉膨胀定理，Corollary 3.2](https://doi.org/10.1007/s44146-024-00170-6)给出同一个酉算子来实现任意收缩算子的有限幂窗。给定 $H$ 上的收缩算子 $T$ 和正整数 $d$，存在包含 $H$ 的空间 $K$ 及其上的酉算子 $U$，使得对每个 $1\le k\le d$，都有 $T^k=P_HU^k|_H$，其中 $P_H$ 是到 $H$ 的正交投影。若 $H$ 有限维，$K$ 也可取有限维。该定理允许选择膨胀空间，没有把它固定为这里的三维环境，也没有提供同一对分支酉矩阵与同一个半正定初态。上述第五步问题仍需要一个同时满足这些条件的共同实现。

:::

::: {.remark #rem-weighted-history-stability title="小泄漏下的固定酉加权历史界（书面推导）"}

**普通书面推导，未在本书形式化。** 把联合演化看成在两条系统分支之间转动：压回原分支的部分会缩短，漏出的部分仍留在实际联合历史中，之后可能返回。极分解把这次压缩拆成“正的缩短”与“酉的转动”；即使压缩有零方向，也能在原环境空间内补齐那次转动。下面用同一固定转动逐步跟随真实历史，误差按步数相加。这里保存的是[已有完整普通论证](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516)，不是新的形式化结论。

**对象、范数与完整量词。** 任取整数 $d,N\ge1$、作用于 $\mathbb C^2\otimes\mathbb C^d$ 的酉矩阵 $W\in M_{2d}(\mathbb C)$，以及任意半正定单位迹矩阵 $\sigma\in M_d(\mathbb C)$。星号表示共轭转置。对任意矩形复矩阵 $M$，希尔伯特—施密特范数与算子范数分别约定为

$$
\begin{aligned}
\|M\|_{\mathrm{HS}}^2&=\Tr(M^*M)=\sum_{i,j}|M_{ij}|^2,\\
\|M\|_{\mathrm{op}}&=\sup_{\|v\|_2\le1}\|Mv\|_2.
\end{aligned}
$$

后者衡量对向量的最大放大倍数；下文说一个分块是收缩时，指算子范数至多为一，不是该分块的希尔伯特—施密特范数至多为一。令 $e_0,e_1$ 为系统标准基，定义

$$
\begin{aligned}
S&=\sqrt{\sigma}\in M_d(\mathbb C),\qquad S^*=S,\quad S^2=\sigma,\\
J_b&:\mathbb C^d\longrightarrow\mathbb C^2\otimes\mathbb C^d,
\qquad J_bv=e_b\otimes v,\\
P_b&=J_bJ_b^*,\qquad Q_b=I_{2d}-P_b
\qquad(b\in\{0,1\}),\\
L_N&=\max_{\substack{b\in\{0,1\}\\0\le k\le N}}
\|Q_bW^kJ_bS\|_{\mathrm{HS}}^2,\qquad
\epsilon=\sqrt{L_N}.
\end{aligned}
$$

这里的 $k$ 为整数；$P_b,Q_b\in M_{2d}(\mathbb C)$ 是正交投影，$J_b^*J_b=I_d$，且 $\|S\|_{\mathrm{HS}}^2=\Tr\sigma=1$。$L_N$ 使用同一个 $W,\sigma$ 在两个分支上从第零步到第 $N$ 步的**实际加权历史**，不是单步泄漏、各时刻另选实现，或某个无权算子范数。对每组上述数据，存在原 $\mathbb C^d$ 上的酉矩阵 $A_0,A_1$，选定后对所有整数 $0\le n\le N$ 同时满足

$$
\max_{\substack{b\in\{0,1\}\\0\le n\le N}}
\|W^nJ_bS-J_bA_b^nS\|_{\mathrm{HS}}
\le4N\sqrt{L_N}.
$$

常数 $4$ 与 $d,N,W,\sigma$ 无关；这里不声称它最优。以下给出完整推导。

**压缩与一次极补全。** 固定任一分支 $b\in\{0,1\}$，简写 $J=J_b,P=P_b,Q=Q_b$，并在原有空间上定义

$$
\begin{aligned}
K&=J^*WJ\in M_d(\mathbb C),&
R&=QWJ\in M_{2d\times d}(\mathbb C),\\
B&=J^*WQ\in M_{d\times2d}(\mathbb C),&
E&=QWQ\in M_{2d}(\mathbb C).
\end{aligned}
$$

$J$ 为等距嵌入，$Q$ 为正交投影，$W$ 酉，所以 $K,R,B,E$ 的算子范数均不超过一。尤其 $B,E$ 左乘任意列数相容的矩阵时，希尔伯特—施密特范数不会增大：这是逐列应用向量收缩后求平方和。直接分块计算给出

$$
\begin{aligned}
K^*K+R^*R
&=J^*W^*(P+Q)WJ\\
&=J^*W^*WJ=I_d.
\end{aligned}
$$

有限维方阵的极分解可在奇异情形下补全为

$$
K=AH,\qquad A^*A=AA^*=I_d,\qquad
H=(K^*K)^{1/2},\qquad 0\le H\le I_d.
$$

这里 $A,H\in M_d(\mathbb C)$；$H$ 的每个特征值 $h$ 非负，且 $h^2\le1$，所以 $h\in[0,1]$。$A$ 仅从固定的 $K$ 选取一次。静态极分解的文献依据是 Higham，*Computing the Polar Decomposition—with Applications*，DOI [10.1137/0907079](https://doi.org/10.1137/0907079)，[全文](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf)，Theorem 1.1 与 Lemma 2.1；它们供应方阵酉补全及正平方根的识别，不供应下面的加权历史界。

**任意矩形权重上的极误差。** 在 $H$ 的酉特征基中，$2H(I_d-H)$ 的特征值为 $2h(1-h)\ge0$，故

$$
D:=(I_d-H^2)-(I_d-H)^2=2H(I_d-H)\ge0.
$$

对每个自然数 $r$ 和每个矩形矩阵 $X\in M_{d\times r}(\mathbb C)$，合同变换给出 $X^*DX\ge0$，其迹非负（等于各列 $x_j$ 的非负二次型 $\sum_j x_j^*Dx_j$）。因此，不要求 $X$ 与 $H$ 交换，便有

$$
\begin{aligned}
\|(K-A)X\|_{\mathrm{HS}}^2
&=\Tr\bigl(X^*(I_d-H)^2X\bigr)\\
&\le\Tr\bigl(X^*(I_d-H^2)X\bigr)\\
&=\Tr(X^*R^*RX)=\|RX\|_{\mathrm{HS}}^2.
\end{aligned}
$$

第一式用了 $K-A=A(H-I_d)$ 与 $A^*A=I_d$，末式用了 $I_d-H^2=R^*R$。这里取迹的半正定矩阵均给出实数。特别地，对 $T_k=J^*W^kJ\in M_d(\mathbb C)$ 代入实际权重 $X=T_kS$，由 $S^2=\sigma$ 与迹循环性，

$$
\begin{aligned}
\|(K-A)T_kS\|_{\mathrm{HS}}^2
&=\Tr\bigl(\sigma T_k^*(I_d-H)^2T_k\bigr)\\
&\le\Tr\bigl(\sigma T_k^*(I_d-H^2)T_k\bigr)\\
&=\|RT_kS\|_{\mathrm{HS}}^2.
\end{aligned}
$$

这是先作半正定合同变换再取迹的比较；只循环移动迹内因子，没有交换 $\sigma,T_k,H$，也没有除以 $\sigma$ 的特征值。

**实际轨迹的递推。** 对所有整数 $0\le k\le N$ 定义

$$
\begin{aligned}
x_k&=J^*W^kJS=T_kS\in M_d(\mathbb C),\\
y_k&=QW^kJS\in M_{2d\times d}(\mathbb C),\\
W^kJS&=Jx_k+y_k,\qquad Qy_k=y_k,\\
x_0&=S,\qquad y_0=0,\qquad
\|y_k\|_{\mathrm{HS}}\le\epsilon.
\end{aligned}
$$

对该分解施加同一个 $W$，再分别投影，对所有整数 $0\le k<N$ 得到

$$
\begin{aligned}
x_{k+1}&=Kx_k+By_k,\\
y_{k+1}&=Rx_k+Ey_k,\\
\|Rx_k\|_{\mathrm{HS}}
&=\|y_{k+1}-Ey_k\|_{\mathrm{HS}}\\
&\le\|y_{k+1}\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le2\epsilon.
\end{aligned}
$$

令 $r_k=x_{k+1}-Ax_k\in M_d(\mathbb C)$。把前面的矩形比较用于实际的 $X=x_k$，再利用 $B$ 的收缩性，便有

$$
\begin{aligned}
r_k&=(K-A)x_k+By_k,\\
\|r_k\|_{\mathrm{HS}}
&\le\|(K-A)x_k\|_{\mathrm{HS}}+\|By_k\|_{\mathrm{HS}}\\
&\le\|Rx_k\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le3\epsilon.
\end{aligned}
$$

**固定酉矩阵的加法望远镜。** 固定整数 $1\le n\le N$，令 $f(k)=A^{n-k}x_k$（$0\le k\le n$）。对 $k<n$，

$$
\begin{aligned}
f(k+1)-f(k)&=A^{n-1-k}(x_{k+1}-Ax_k)
=A^{n-1-k}r_k,\\
x_n-A^nS&=f(n)-f(0)
=\sum_{k=0}^{n-1}A^{n-1-k}r_k,\\
\|x_n-A^nS\|_{\mathrm{HS}}
&\le\sum_{k=0}^{n-1}\|r_k\|_{\mathrm{HS}}
\le3n\epsilon.
\end{aligned}
$$

这里只把矩阵的连续差在加法群中相加，并用酉左乘保持希尔伯特—施密特范数。最后由 $J$ 的等距性与三角不等式，

$$
\begin{aligned}
\|W^nJS-JA^nS\|_{\mathrm{HS}}
&=\|J(x_n-A^nS)+y_n\|_{\mathrm{HS}}\\
&\le3n\epsilon+\epsilon=(3n+1)\epsilon\\
&\le4N\epsilon\qquad(1\le n\le N).
\end{aligned}
$$

最后一步用了 $3n+1\le3N+1\le4N$；$n=0$ 时误差直接为零。对两个分支独立选取各自的极补全 $A_0,A_1$，并共用 $\epsilon=\sqrt{L_N}$，即得到所述最大值界。

**适用范围与尚存边界。** $L_N=0$ 时全部误差精确为零；论证没有除以 $\epsilon$。秩亏的 $\sigma$ 以及正特征值任意接近零的 $\sigma$ 都包含在内：只使用 $S=\sqrt\sigma$，不使用逆、满秩或谱隙。环境始终为原 $\mathbb C^d$，没有纯化、增维、重置、干预或随时间变化的 $A_b$，也不假设后续联合态因子化。压缩 $K$ 无需正规；不把 $T_k$ 认作 $K^k$，漏出后返回的部分由实际 $y_k$ 保留。

已有来源中的静态极补全与半正定迹正性是可复用供应，不在这里重新计作新数学。完整结果的 Lean 形式化证明尚未经验证；上述普通推导不构成 Lean 验证。这个历史接口也没有给出相对于目标去相位信道的 diamond 范数或任意有限未触碰参考的一致定量比较，没有给出实际可实现共同幂频率历史的定量下界与上构造。一般窗口的完整资源—误差权衡仍开放；这里不选择或证明后继事件，不作全球新颖性或物理普适性声明。

:::

::: {.remark #rem-maxmixed-saturation-obstruction title="最大混合初态下的饱和矩容量障碍（普通推导）"}

**普通书面推导，未在本书形式化。** 前面的维数必要界允许样本数恰好达到矩阵空间的维数，却不保证这个边界可达。直观的障碍是容量：接近一的一阶矩要求几乎全部概率挤进单位圆上一段很短的弧；饱和的矩条件却使这段弧至多容纳两个节点，而最大混合初态又限制每个节点能承载的概率。下面从[原始结果及其边界](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000)完整展开这个有限维论证。

**对象与要排除的饱和条件。** 固定整数 $d\ge2$、实数 $0<r<1$，令 $m=d^2$。任取两套作用于同一个 $\mathbb C^d$ 的酉矩阵 $A,B\in U(d)$，不要求它们交换。定义共同幂的归一化迹序列，并暂设它匹配到饱和窗口：

$$
f_n=\frac1d\operatorname{Tr}(A^nB^{-n})=r^n
\qquad(0\le n\le m-1).
$$

这里及下文的步数均为整数。目标是给出该条件的必要不等式，并据此排除一个明确参数；不是判定全部窗口的最优维数。

**谱权重与支集不能先行混淆。** 分别作酉谱分解，允许重复特征值：

$$
\begin{aligned}
A&=V\operatorname{diag}(a_0,\ldots,a_{d-1})V^*,\\
B&=W\operatorname{diag}(b_0,\ldots,b_{d-1})W^*,\qquad U=V^*W,\\
z_{ij}&=a_i\overline{b_j},\qquad |z_{ij}|=1,\\
w_{ij}&=\frac{|U_{ij}|^2}{d},\qquad
0\le w_{ij}\le\frac1d,\qquad
\sum_{i,j=0}^{d-1}w_{ij}=1,\\
\mu&=\sum_{i,j=0}^{d-1}w_{ij}\delta_{z_{ij}},\qquad
f_n=\int z^n\,\mathrm d\mu(z).
\end{aligned}
$$

星号表示共轭转置，$\delta_z$ 是节点 $z$ 上的单位点质量。迹的展开给出最后一式；酉矩阵每行的模平方和为一，给出权重总和与单项上界。因此 $\mu$ 是至多有 $m$ 个支集点的正概率测度。但此时若若干比值重合，合并后的单点质量可能超过 $1/d$；必须先证明这些比值确实互异，才能使用节点容量。由于权重实且非负，负次矩由共轭确定：

$$
\int z^q\,\mathrm d\mu(z)=r^{|q|}
\qquad(-(m-1)\le q\le m-1).
$$

**饱和迫使全部节点出现且互异。** 在多项式上使用测度诱导的半正定配对 $\langle p,q\rangle_\mu=\int\overline{p(z)}q(z)\,\mathrm d\mu(z)$。单项式的 Gram 矩阵为

$$
T_{jk}=\langle z^j,z^k\rangle_\mu=r^{|j-k|}
\qquad(0\le j,k\le m-1).
$$

把基改成常数 $1$ 与 $g_k(z)=z^k-rz^{k-1}$（$1\le k\le m-1$）。这是首项系数均为一的三角换基。直接用已知矩计算，

$$
\begin{aligned}
\langle1,g_k\rangle_\mu&=r^k-r\,r^{k-1}=0,\\
\langle g_j,g_k\rangle_\mu
&=r^{k-j}-r\,r^{k-j-1}-r\,r^{k-j+1}
+r^2r^{k-j}=0\quad(1\le j<k\le m-1),\\
\|1\|_\mu^2&=1,\qquad
\|g_k\|_\mu^2=1-2r^2+r^2=1-r^2>0.
\end{aligned}
$$

所以 $T$ 正定且秩为 $m$。若合并并删去零质量后只有 $K$ 个支集点，Gram 矩阵经这些点上的取值映射分解，秩至多为 $K$。故 $m\le K\le m$。原来总共只有 $m$ 个索引对，因而每个 $w_{ij}>0$，所有 $z_{ij}$ 两两不同。此后每个节点的实际质量就是原来的 $w_{ij}\le1/d$。重复特征值或零重叠权重并非隐藏的例外：它们会减少支集，已被满秩条件排除。

**节点多项式只需已有阶数的矩。** 将这 $m$ 个节点记为 $\zeta_1,\ldots,\zeta_m$，定义首一消去多项式及线性泛函：

$$
\begin{aligned}
P(z)&=\prod_{\ell=1}^{m}(z-\zeta_\ell),\\
L_k(F)&=\int z^{-k}F(z)\,\mathrm d\mu(z)
\qquad(1\le k\le m-1,\ \deg F\le m).
\end{aligned}
$$

因为 $P$ 在支集上为零，所有 $L_k(P)=0$。这些泛函在 $\operatorname{span}(z,\ldots,z^{m-1})$ 上的矩阵，是 $T$ 对应的正定主子矩阵，故联合秩为 $m-1$。次数至多 $m$ 的多项式空间维数为 $m+1$，所以公共核恰为二维。以下两个线性无关多项式都在核中：

$$
\begin{aligned}
Q(z)&=z^m-rz^{m-1},\qquad R(z)=1-rz,\\
L_k(Q)&=r^{m-k}-r\,r^{m-1-k}=0,\\
L_k(R)&=r^k-r\,r^{k-1}=0
\qquad(1\le k\le m-1).
\end{aligned}
$$

它们因次数不同而线性无关。比较首项系数，得到 $P=Q+cR$；由于全部根的模为一，常数项满足 $|c|=|P(0)|=\prod_{\ell=1}^m|\zeta_\ell|=1$。于是每个节点都满足

$$
z^{m-1}\frac{z-r}{1-rz}=\tau,\qquad
\tau=-c,\qquad |\tau|=1.
$$

分母不会为零，因为 $|rz|=r<1$。尤其，虽然 $Q$ 的次数为 $m$，在 $L_k(Q)$ 中最高的矩阶数只有 $m-1$；这里没有偷用第 $m$ 阶或更高矩。

**短闭弧至多容纳两个节点。** 取

$$
\theta=\frac{\pi}{2(m-1)},\qquad
\mathcal A_\theta=\{e^{\mathrm it}: -\theta\le t\le\theta\}.
$$

在这段弧上可选择如下连续辐角；半角公式直接验证其指数等于对应的分式：

$$
\begin{aligned}
\beta(t)&=2\arctan\left(\frac{1+r}{1-r}\tan\frac t2\right),\\
e^{\mathrm i\beta(t)}&=\frac{e^{\mathrm it}-r}{1-re^{\mathrm it}},\\
\beta'(t)&=\frac{1-r^2}{1-2r\cos t+r^2}>0
\qquad(-\theta\le t\le\theta).
\end{aligned}
$$

由于 $d\ge2$，整段弧严格位于 $-\pi<t<\pi$，所用正切连续。实反正切的取值严格介于 $-\pi/2$ 与 $\pi/2$，故 $\beta(\theta)-\beta(-\theta)<2\pi$。令 $h(t)=(m-1)t+\beta(t)$，则

$$
\begin{aligned}
h'(t)&=m-1+\beta'(t)>0,\\
h(\theta)-h(-\theta)
&=2(m-1)\theta+\beta(\theta)-\beta(-\theta)<3\pi.
\end{aligned}
$$

固定任意一个 $\tau$ 的辐角 $\alpha$，节点方程就是 $h(t)=\alpha+2\pi k$，其中 $k\in\mathbb Z$。严格递增性使不同节点对应不同整数。若有三个节点，最左与最右的相位至少相差 $4\pi$，与刚才的变化量上界矛盾。这也包含弧的两个端点。因此

$$
\mu(\mathcal A_\theta)\le\frac2d,\qquad
\mu(\mathbb T\setminus\mathcal A_\theta)\ge1-\frac2d,
\qquad \mathbb T=\{z\in\mathbb C:|z|=1\}.
$$

**容量必要不等式与精确反例。** 在弧外，$1-\operatorname{Re}z\ge1-\cos\theta$；在整圆上这个被积函数非负。一阶矩给出

$$
\begin{aligned}
1-r&=\int(1-\operatorname{Re}z)\,\mathrm d\mu(z)\\
&\ge\left(1-\frac2d\right)(1-\cos\theta)\\
&=\left(1-\frac2d\right)
\left(1-\cos\frac{\pi}{2(d^2-1)}\right).
\end{aligned}
$$

这对每个 $d\ge3$ 都是最大混合饱和实现的非平凡必要条件。取 $d=3$、$r=999/1000$，此时 $m=9$、$\theta=\pi/16$。正弦在 $[0,\pi/2]$ 上的凹性意味着它不低于连接两个端点的弦，即 $\sin x\ge2x/\pi$。所以

$$
\begin{aligned}
\sin\frac{\pi}{32}&\ge\frac1{16},\\
1-\cos\frac{\pi}{16}
&=2\sin^2\frac{\pi}{32}\ge\frac1{128},\\
1-r&\ge\frac13\cdot\frac1{128}=\frac1{384},\\
1-r&=\frac1{1000}<\frac1{384}.
\end{aligned}
$$

矛盾。也可以把同一计算直接读成装不下的质量：

$$
\begin{aligned}
\mu(\mathcal A_{\pi/16})
&\ge1-\frac{1-r}{1-\cos(\pi/16)}
\ge1-\frac{128}{1000}=\frac{109}{125},\\
\frac{109}{125}-\frac23&=\frac{77}{375}>0.
\end{aligned}
$$

因此不存在一对 $A,B\in U(3)$ 同时满足 $f_n=r^n$（$0\le n\le8$）。这是对所有酉矩阵对的排除，包含非交换情形；不是某种设参形式或数值优化失败。它甚至未使用谱比值网格及酉矩阵模平方权重所带来的全部相容性限制。

**零参数、负参数与二级环境。** 将 $A$ 换成 $-A$ 会使 $f_n$ 变成 $(-1)^nf_n$，因而同维参数 $r=-999/1000$ 也不可能。零参数则有完全不同的边界：对每个正整数 $d$ 都能实现饱和窗口。令

$$
\begin{aligned}
m&=d^2,\qquad \omega=e^{2\pi\mathrm i/m},\\
a_i&=\omega^i,\qquad b_j=\omega^{-dj},\\
F_{ij}&=\frac1{\sqrt d}e^{2\pi\mathrm i\,ij/d}
\qquad(0\le i,j<d),\\
A&=\operatorname{diag}(a_0,\ldots,a_{d-1}),\qquad
B=F\operatorname{diag}(b_0,\ldots,b_{d-1})F^*.
\end{aligned}
$$

有限等比求和给出 Fourier 矩阵 $F$ 的列正交，故它酉。相对本征基的模平方都为 $1/d$，于是每个权重为 $1/d^2=1/m$。比值 $a_i\overline{b_j}=\omega^{i+dj}$ 恰遍历全部 $m$ 次单位根；对 $d=1$ 也成立，只是窗口没有正步数。因此

$$
f_0=1,\qquad
f_n=\frac1m\sum_{q=0}^{m-1}\omega^{qn}=0
\qquad(1\le n\le m-1).
$$

零参数的第零幂约定为一。对 $d=2$，容量不等式右端因 $1-2/d=0$ 而退为平凡界，与已有的最大混合二级环境三步构造相容；这里不重复其证明。

**从迹矩到实际信道，以及反向归约。** 为避免与上面的本征基矩阵混淆，把联合酉记为 $\mathcal W$。设系统为 $\mathbb C^2$，环境初态固定为 $\sigma=I_d/d$ 且初始独立于输入。对受控联合酉及系统矩阵单位定义

$$
\begin{aligned}
E_{ab}&=|a\rangle\langle b|\quad(a,b\in\{0,1\}),\\
\mathcal W&=E_{00}\otimes A+E_{11}\otimes B,\\
\Psi_n(X)&=\operatorname{Tr}_E\bigl(\mathcal W^n(X\otimes I_d/d)\mathcal W^{*n}\bigr),\\
\Psi_n(E_{00})&=E_{00},\qquad \Psi_n(E_{11})=E_{11},\\
\Psi_n(E_{01})&=f_nE_{01},\qquad
\Psi_n(E_{10})=\overline{f_n}E_{10}.
\end{aligned}
$$

两个对角系数均为单位迹一；非对角式直接来自环境偏迹。矩阵单位构成所有系统矩阵的线性基，所以这些式子确定整个映射。对任意有限未触碰参考 $R$，将任意系统—参考矩阵写成 $Y=\sum_{a,b=0}^1E_{ab}\otimes Y_{ab}$；每个参考块 $Y_{ab}$ 保持原样，系统块逐项乘以上述系数。这包含系统与参考初始纠缠的情形，但环境仍须与整个输入独立。采用标准张量换序后，实际共同演化在系统—环境上作用，在参考上为恒等。

反过来，这个最大混合排除不只是预设受控形式的限制。把任意联合酉写成系统的二乘二环境分块 $\mathcal W=(C_{ab})_{a,b=0}^1$。若一步映射精确保持两个基态投影，错误布居为

$$
\begin{aligned}
0&=\langle1,\Psi_1(E_{00})1\rangle
=\frac1d\operatorname{Tr}(C_{10}C_{10}^*)
=\frac1d\|C_{10}\|_{\mathrm{HS}}^2,\\
0&=\langle0,\Psi_1(E_{11})0\rangle
=\frac1d\operatorname{Tr}(C_{01}C_{01}^*)
=\frac1d\|C_{01}\|_{\mathrm{HS}}^2.
\end{aligned}
$$

希尔伯特—施密特范数平方是各矩阵元模平方之和，因此 $C_{10}=C_{01}=0$。再由联合酉性得 $C_{00},C_{11}$ 都酉，故它们就是某一对 $A,B$。最大混合态的满秩性使零泄漏约束作用于整个环境空间。因此，若同一个三维最大混合环境的实际信道要在 $0\le n\le8$ 对所有输入实现参数 $r=999/1000$ 的去相位幂，上面的反例已在 $E_{01}$ 上排除了它；增加未触碰参考不会恢复可行性。

**适用边界。** 全过程只用同一个联合酉和一次初始制备，没有环境重置、替换、增维、时变控制或中间干预，也没有假设后续系统—环境态重新因子化。一般初始密度 $\sigma$ 的谱展开系数为 $\operatorname{Tr}(P_i\sigma Q_j)$，其中 $P_i,Q_j$ 分别为两套酉的谱投影；这些系数可能为复数，不具有这里的正概率解释或单节点容量。因此本注记没有反驳允许任意初始密度时的维数可达性主张。所给不等式只是必要条件，未证明充分性或最优性；它不完成一般窗口的可行性分类，不提供近似误差下界，也不确定完整联合态历史或中间干预的规律。

圆周正交多项式提供相邻的经典框架，可参见 Barry Simon，[arXiv:math/0405111](https://arxiv.org/abs/math/0405111) §1 的递推与 §2.1(c) 的 Bernstein–Szegő 情形；这些段落不作为本注记完整受限实现障碍的来源定理。所需节点、相位与容量证明均已在这里给出，不作全球新颖性或物理普适性声明。完整结论尚无本书可引用的完整 Lean 证明；普通推导不构成内核验证。

:::

::: {.theorem #thm-positive-interior-grid-algebraic-obstruction title="正内部谱网格的代数障碍" lean="D5/S3/Quantum/Analysis/PositiveInteriorGridObstruction.positive_interior_grid_algebraic_obstruction"}
固定 $0<r<1$，取复数 $u,v$ 和实数 $s,t$。以下关系不能同时成立：

$$
\begin{aligned}
u+v&=2,\\
us+vt+st+3-3(s+t)&=0,\\
s&=|u|^2,\qquad t=|v|^2,\qquad |uv|^2=r^2.
\end{aligned}
$$

Lean 声明将前两个复等式分别写成实部与虚部等式，并将模平方写成相应实坐标的平方和。
:::

::: {.proof #pf-positive-interior-grid-algebraic-obstruction}
若 $\operatorname{Im}u\ne0$，由 $v=2-u$ 和第二个等式的虚部得到 $s=t$。模平方相等又给出 $\operatorname{Re}u=1$，于是 $r=|uv|=s>1$。若 $u$ 为实数，$v$ 也为实数。令 $q=uv$，用 $u+v=2$ 将 $s+t$ 写成 $4-2q$，将 $us+vt=u^3+v^3$ 写成 $8-6q$，将 $st$ 写成 $q^2$。第二个等式化为 $q^2=1$，与 $r<1$ 矛盾。

完整证明由 Lean 内核检查。
:::

在上面的最大混合谱网格中，如果饱和把九个不同的比值节点确定为 $P(z)=z^9-rz^8+\eta(1-rz)$ 的根，Newton 恒等式就给出无权网格幂和 $S_k=r^k$（$k=1,2,3$）。设两组三个单位圆因子分别为 $a_i,d_j$，其中 $d_j=b_j^{-1}$，并令 $x=\sum_i a_i$、$y=\sum_j d_j$、$\alpha=\prod_i a_i$、$\beta=\prod_j d_j$。由 $xy=r$ 可定义 $u=x^2/(\alpha\overline{x})$ 和 $v=y^2/(\beta\overline{y})$。两组三根的二次幂和分别为 $x^2-2\alpha\overline x$ 与 $y^2-2\beta\overline y$，三次幂和分别为 $x^3-3\alpha|x|^2+3\alpha$ 与 $y^3-3\beta|y|^2+3\beta$。设 $s=|x|^2$、$t=|y|^2$，因此 $s=|u|^2$、$t=|v|^2$，且 $|uv|=r$。将 $S_2=r^2$ 除以 $x^2y^2$ 得到 $(1-2/u)(1-2/v)=1$，也就是 $u+v=2$。将 $S_3=r^3$ 除以 $x^3y^3$ 并乘以 $uvst$，得到

$$
(us-3s+3)(vt-3t+3)=uvst.
$$

展开并用 $u+v=2$ 消去 $st(u+v)$，得到 $us+vt+st+3-3(s+t)=0$。这正是 [@thm-positive-interior-grid-algebraic-obstruction] 的另一个复等式。

这里的 Lean 引用覆盖从约化方程到矛盾这一步。从同一对三阶酉矩阵的迹矩推出饱和节点、网格与约化方程仍属书面推导。任意初始密度与较短窗口的可行性需要各自的论证。[上游证明与适用范围](https://github.com/the-omega-institute/trureturing/pull/31199)
