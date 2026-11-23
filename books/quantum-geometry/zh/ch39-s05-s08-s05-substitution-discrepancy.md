# O.2.5 替代词交替偏差与对数平方界 {#sec-ch39-s05-s08-s05-substitution-discrepancy}

对于 Tribonacci 词，普通字母计数的平衡性与按位置奇偶加权的和是不同的量。沿用 $A=0$、$B=1$、$C=2$ 的字母编码，取整数权重

$$
\begin{aligned}
w(A)&=2,\qquad w(B)=1,\qquad w(C)=0,\\
F(v)&=\sum_{r=0}^{|v|-1}(-1)^r w(v_r),\\
W_{[s,s+m)}&=W_sW_{s+1}\cdots W_{s+m-1}.
\end{aligned}
$$

这里 $s,m\in\mathbb N$，位置从零编号；空字 $\varepsilon$ 满足 $F(\varepsilon)=0$。每个区段的首项都取正号，与全局起点 $s$ 的奇偶无关。前面的跃迁恰为 $t_X=\rho^{w(X)}$，故有限乘积满足

$$
\prod_{r=0}^{m-1}t_{W_{s+r}}^{\,(-1)^r}
=\rho^{F(W_{[s,s+m)})}.
$$

这说明交替电荷为什么会进入跃迁比值的估计，却尚未给出谱界。下面的精确陈述与构造来自 [Tribonacci 前缀反例的源证明](https://github.com/the-omega-institute/trureturing/pull/30577)。

::: {.theorem #thm-ch39-p2e-tribonacci-prefix-log-refutation title="实际 Tribonacci 词的统一对数区段界不成立" lean="D5/S1/Words/TribonacciPrefixRefutation.result"}
对上述固定的实际词 $W$ 与整数权重 $w$，有

$$
\neg\left(
\begin{aligned}
&\exists K\in\mathbb R,\quad 0<K\ \land\\
&\forall s,m\in\mathbb N,\quad
\left|F(W_{[s,s+m)})\right|
\le K\log(m+2)
\end{aligned}
\right).
$$

不等式中的整数电荷与自然数长度均视为实数，$\log$ 为自然对数；量词包含 $m=0$，没有长度下限或起点限制。
:::

::: proof
取 $\tau=\sigma^4$，将其逐字延伸到有限字。四次实际替代给出

$$
\begin{aligned}
\tau(A)&=ABACABAABACAB,&|\tau(A)|&=13,\\
\tau(B)&=ABACABAABAC,&|\tau(B)|&=11,\\
\tau(C)&=ABACABA,&|\tau(C)|&=7.
\end{aligned}
$$

每个 $\tau^n(X)$ 的长度都为奇数：$n=0$ 时长度为一；下一层分别拼接 $13$、$11$ 或 $7$ 个前层奇长块，故可对所有字母同时归纳。任意有限字的拼接恒等式为

$$
F(uv)=F(u)+(-1)^{|u|}F(v).
$$

因此，展开 $\tau^{n+1}(X)$ 时，每个前层块都翻转下一块的符号。令 $a_n=F(\tau^n(A))$、$b_n=F(\tau^n(B))$、$c_n=F(\tau^n(C))$。在上述三个实际像中逐块交替取号，得到对每个 $n\in\mathbb N$ 都成立的递推

$$
\begin{aligned}
(a_0,b_0,c_0)&=(2,1,0),\\
a_{n+1}&=a_n,\\
b_{n+1}&=2a_n-b_n,\\
c_{n+1}&=4a_n-2b_n-c_n.
\end{aligned}
$$

由 $a_{n+1}=a_n$ 与初值知 $a_n=2$，于是 $b$ 的递推化为 $b_{n+1}-2=-(b_n-2)$。再令 $d_n=(-1)^n(c_n-2)$，$c$ 的递推化为 $d_{n+1}=d_n-2$，且 $d_0=-2$。于是全层数的解为

$$
\begin{aligned}
a_n&=2,\\
b_n&=2-(-1)^n,\\
c_n&=2-(2n+2)(-1)^n.
\end{aligned}
$$

整块 $A$ 像的电荷恒为 $2$，却不能控制它内部的前缀。定义具体的有限字族

$$
U_0=\varepsilon,\qquad
U_{n+1}=\tau^{n+1}(C)U_n,\qquad m_n=|U_n|.
$$

新块接在前面。逐字恒等式 $\tau(A)=\tau(C)\,A\,BACAB$ 给出

$$
\tau^{n+1}(A)=
\tau^{n+1}(C)\,\tau^n(A)\,\tau^n(BACAB).
$$

空字 $U_0$ 是 $A$ 的前缀；若 $\tau^n(A)=U_nR_n$，则上式变成

$$
\tau^{n+1}(A)=
U_{n+1}R_n\,\tau^n(BACAB).
$$

归纳可知 $U_n$ 是 $\tau^n(A)=\sigma^{4n}(A)$ 的实际前缀，因而

$$
W_{[0,m_n)}=U_n.
$$

这一步使用的正是从 $A$ 出发的原始无限词，没有另设出现位置假设，也没有循环闭合或位置平移。三个四步像都非空，故 $m_n>0$（$n\ge1$）；对所有字母同时归纳，每层至多拼接十三个前层像，得到 $|\tau^n(X)|\le13^n$。结合前缀包含关系，

$$
0<m_n\le|\tau^n(A)|\le13^n\qquad(n\ge1).
$$

令 $q_n=F(U_n)$。新接在前面的 $\tau^{n+1}(C)$ 长为奇数，所以

$$
q_0=0,\qquad q_{n+1}=c_{n+1}-q_n.
$$

为显式解出这次累积，令 $r_n=(-1)^n(q_n-1)$。代入 $c_{n+1}$ 的公式，得到 $r_0=-1$ 与 $r_{n+1}=r_n-(2n+4)$。求和即得

$$
\begin{aligned}
q_n&=1-(-1)^n(n^2+3n+1)\\
&=\begin{cases}
-n(n+3),&n\text{ 为偶数},\\
(n+1)(n+2),&n\text{ 为奇数}.
\end{cases}
\end{aligned}
$$

故 $|q_n|\ge n^2$，包括 $n=0$。另一方面，当 $n\ge1$ 时，$13^n\ge1$ 且 $3\le3^n$，故 $m_n+2\le13^n+2\le3\cdot13^n\le39^n$，从而

$$
\log(m_n+2)\le n\log39.
$$

现在假设定理中被否定的统一界成立，取其常数 $K>0$，再取自然数 $n>K\log39$。因 $K\log39>0$，有 $n\ge1$。在真正从零开始的前缀上，

$$
\begin{aligned}
\left|F(W_{[0,m_n)})\right|
&=|q_n|\ge n^2\\
&>Kn\log39
\ge K\log(m_n+2),
\end{aligned}
$$

与 $s=0$、$m=m_n$ 时的统一界矛盾。这个反证覆盖每个正实数 $K$；从零开始的具体反例族是证明中的构造，不是另加假设，也不是由有限样本外推的结论。完整证明由 Lean 内核检查。
:::

反例族说明某些真实前缀的电荷可以逐层累积；要控制任意起点、任意长度的区段，还须同时控制每层块内部的所有前缀。这里可以复用一个与 Tribonacci 字母表无关的估计：每层至多留下一块未走完的子块，其余完整子块的电荷逐层相加。

下列前缀包络控制一般替代词的所有截取前缀，统一对数平方界控制实际 Tribonacci 词的任意区段；后文的开链收敛定理给出每个固定 $0<\rho<1$ 下，指定偶数开前缀的最小绝对特征值沿全序列趋零。[@ex-ch39-p2e-tribonacci-prefix-rate] 中的定量界及参数一致收敛仍属纸面应用，不由这条收敛定理提供。

::: {.lemma #lem-ch39-p2e-substitution-prefix-envelope title="替代词的逐层前缀包络" lean="D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope"}
设 $\mathcal A$ 为任意字母表，$w:\mathcal A\to\mathbb Z$ 为整数权重，$f$ 将每个字母映为一个有限字，并按拼接延伸到有限字。约定 $f^0(a)$ 为单字母字 $a$，且

$$
Q(v)=\sum_{r=0}^{|v|-1}(-1)^r w(v_r).
$$

设 $M\in\mathbb Z$、$B\in\mathbb N$、$H:\mathbb N\to\mathbb Z$ 满足

$$
\begin{aligned}
&0\le M,\qquad 0\le H(i)
&&\text{对所有 }i\in\mathbb N,\\
&|w(a)|\le M,\qquad |f(a)|\le B
&&\text{对所有 }a\in\mathcal A,\\
&|Q(f^i(a))|\le H(i)
&&\text{对所有 }i\in\mathbb N,\ a\in\mathcal A.
\end{aligned}
$$

则对所有 $j,t\in\mathbb N$ 与 $a\in\mathcal A$，

$$
\left|Q\bigl(\operatorname{take}_t(f^j(a))\bigr)\right|
\le P(j):=M+B\sum_{i=0}^{j-1}H(i).
$$

其中 $\operatorname{take}_t$ 取前 $\min(t,|f^j(a)|)$ 个字母，$j=0$ 时求和为空。结论包含空前缀、整个像与超出字长的截取指标；不要求字母表有限、像非空或像长具有特定奇偶性。
:::

::: {.proof #pf-ch39-p2e-substitution-prefix-envelope}
本证明依照 [源声明 `prefix_envelope`](lean:D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope) 的陈述与论证展开。

局部从正号开始的交替和满足 $Q(uv)=Q(u)+(-1)^{|u|}Q(v)$，所以 $|Q(uv)|\le|Q(u)|+|Q(v)|$。零层像只是一个字母，所有前缀的绝对电荷至多为 $M$。将 $f^{j+1}(a)$ 写成由 $f(a)$ 指定的至多 $B$ 个 $j$ 层子块，任意前缀由若干完整子块与至多一个子块的前缀组成。完整部分贡献至多 $BH(j)$，未完成的部分由归纳假设控制在 $P(j)$ 内，故总量至多 $P(j)+BH(j)=P(j+1)$。若截取指标超过总长，则只有完整块；空像同样不增加电荷。整个归纳只用绝对值估计，不丢掉拼接时的相位。

完整证明由 Lean 内核检查。
:::

对于实际 Tribonacci 词，完整块的电荷公式给出线性的 $H(j)$，上式便给出二次的 $P(j)$。还需把任意实际区段放进合适层数的块中，才能得到与起点无关的界。

::: {.theorem #thm-ch39-p2e-tribonacci-uniform-log-squared title="实际 Tribonacci 词的统一对数平方区段界" lean="D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared"}
取 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，令 $W=\lim_{n\to\infty}\sigma^n(A)$ 为从 $A$ 出发、从零编号的无限词。赋予整数权重 $w(A)=2$、$w(B)=1$、$w(C)=0$，并在每个区段内部从正号开始定义

$$
F(W_{[s,s+m)})=\sum_{r=0}^{m-1}(-1)^r w(W_{s+r}).
$$

存在一个与起点及长度都无关的实常数 $C>0$，使

$$
\forall s,m\in\mathbb N,\qquad
\left|F(W_{[s,s+m)})\right|
\le C\bigl(\log(m+2)\bigr)^2.
$$

整数电荷与自然数长度在不等式中视为实数，$\log$ 为自然对数。量词包含 $m=0$，此时电荷为零；即使 $s$ 为奇数，区段首项仍取正号。
:::

::: {.proof #pf-ch39-p2e-tribonacci-uniform-log-squared}
本证明依照 [源声明 `uniform_log_squared`](lean:D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared) 的陈述与论证展开。

**完整块到前缀。** 沿用 $\tau=\sigma^4$。它的三个像长分别为 $13,11,7$。前面求出的完整块电荷为 $2$、$2-(-1)^j$ 与 $2-(2j+2)(-1)^j$，因此对所有字母 $X$ 与层数 $j$，

$$
|F(\tau^j(X))|\le H(j):=2j+4.
$$

把 [@lem-ch39-p2e-substitution-prefix-envelope] 用于 $M=2$、$B=13$ 与此 $H$，得到每个 $j$ 层像的所有前缀的共同包络

$$
\begin{aligned}
P(j)&=2+13\sum_{i=0}^{j-1}(2i+4)\\
&=2+13j^2+39j.
\end{aligned}
$$

这是对所有截取位置的控制，不能仅由完整 $A$ 块的恒定电荷 $2$ 代替。

**前缀到局部区段。** 设 $v$ 是 $T=\tau^j(X)\tau^j(Y)$ 的一个连续子字。$T$ 的每个前缀至多由这两个块各自的一个前缀拼成，故其绝对电荷至多为 $2P(j)$。若 $R$ 是 $v$ 之前的前缀，则 $R$ 与 $Rv$ 都是 $T$ 的前缀，而

$$
F(Rv)-F(R)=(-1)^{|R|}F(v).
$$

取绝对值得到

$$
|F(v)|\le4P(j)\le156(j+1)^2\qquad(j\in\mathbb N).
$$

这个两块估计不要求块长为奇数，也不预设这两个块在无限词中的出现位置。只落在一个块内的区段也适用，因为它是 $\tau^j(X)\tau^j(X)$ 的连续子字。

**实际词中的包含关系。** 三个 $\tau$ 像的长度都至少为 $7$。从零层长度为一出发，对所有字母同时归纳，每一步至少拼接七个前层像，故

$$
|\tau^j(X)|\ge7^j\qquad\text{对所有 }j\in\mathbb N,\ X\in\{A,B,C\}.
$$

现在固定任意 $s$ 与 $m>0$，取 $k=\lfloor\log_7 m\rfloor$、$j=k+1$，使 $7^k\le m<7^j$。选足够大的 $N\ge j$，使 $s+m\le|\tau^N(A)|$。由于这些 $A$ 像是 $W$ 的实际前缀，$W_{[s,s+m)}$ 恰等于从 $\tau^N(A)$ 删去前 $s$ 个字母后再取 $m$ 个字母的字。迭代的拼接恒等式进一步给出

$$
\tau^N(A)=\tau^j\bigl(\tau^{N-j}(A)\bigr).
$$

右边是按实际出现顺序排列的 $j$ 层块，且每一块都严格长于 $m$。从区段首字母所在块开始，长度为 $m$ 的区段只能留在这一块内，或进入紧随其后的第二块；若进入第二块，剩余长度小于 $m$，不可能穿过整个第二块。若首块已经是最后一块，则总长度条件保证区段在该块内结束。因此，整个实际区段确实包含于一块或两块相邻像中，可以应用上一段的 $156(j+1)^2$ 界。选择较高的 $N$ 只为容纳起点 $s$；决定估计大小的 $j$ 只由 $m$ 决定。

**层数到长度。** 由 $2^k\le7^k\le m$ 与对数的单调性，

$$
\begin{aligned}
k\log2&\le\log(m+2),\\
\log2&\le\log(m+2),\\
(j+1)\log2=(k+2)\log2&\le3\log(m+2).
\end{aligned}
$$

两边非负且 $\log2>0$，所以平方并代入区段估计，得到

$$
\begin{aligned}
|F(W_{[s,s+m)})|
&\le156(j+1)^2\\
&\le\frac{1404}{(\log2)^2}\bigl(\log(m+2)\bigr)^2.
\end{aligned}
$$

空区段的电荷为零，另行直接满足同一不等式。于是 $C=1404/(\log2)^2>0$ 是存在量词的一个充分见证；这里没有优化这个常数。

完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-tribonacci-refutation-boundaries title="交替偏差、谱文献与物理适用边界"}
**文献背景与适用边界，未作为本书的物理形式化结论。** 前缀反例中 $|q_n|\ge n^2$ 的平方是替代层数 $n$ 的平方，但已有的长度估计也确定了最坏情形的阶。在本备注中，记 $Q(s,m)=F(W_{[s,s+m)})$，并将电荷与长度视为实数参与以下不等式。对 $n\ge1$，已有 $0<\log(m_n+2)\le n\log39$；两边非负且 $\log39>0$，平方后结合 [@thm-ch39-p2e-tribonacci-uniform-log-squared]，用同一个 $C>0$ 得到

$$
\begin{aligned}
\frac{(\log(m_n+2))^2}{(\log39)^2}
&\le n^2\le|q_n|=|Q(0,m_n)|\\
&\le C(\log(m_n+2))^2.
\end{aligned}
$$

递推式给出 $m_{n+1}=|\sigma^{4(n+1)}(C)|+m_n>m_n$，因为每个字母像都非空。因此，这些实际前缀长度严格递增且无界，沿它们已得到对数平方阶的双侧界。$n=0$ 时 $m_0=q_0=0$，不在这个正下界的适用范围内。

为明确长度截止与精确长度的区别，在本备注中定义

$$
\begin{aligned}
P(M)&=\max_{\substack{m\in\mathbb N\\0\le m\le M}}|Q(0,m)|,\\
R(M)&=\sup_{\substack{s\in\mathbb N\\m\in\mathbb N,\ m\le M}}|Q(s,m)|.
\end{aligned}
$$

这里 $M\in\mathbb N$；$R(M)$ 中的起点 $s$ 遍历所有自然数，不受 $M$ 限制。$P(M)$ 是非空有限集的最大值；统一上界使 $R(M)$ 的非空取值集有上界。对每个正自然数 $M$，同一个常数 $C>0$ 满足

$$
\begin{aligned}
\frac{(\log(M+2))^2}{4(\log39)^2}
&\le P(M)\le R(M)\\
&\le C(\log(M+2))^2.
\end{aligned}
$$

下界可直接由已有前缀估计推出。当 $M\ge13$ 时，取 $n=\lfloor\log_{13}M\rfloor\ge1$，则 $13^n\le M<13^{n+1}$，而 $m_n\le13^n\le M$，故 $P(M)\ge|Q(0,m_n)|\ge n^2$。又由 $M+2\le3M$，

$$
\begin{aligned}
\log(M+2)&\le\log3+\log M\\
&\le\log3+(n+1)\log13\\
&\le(n+1)\log39\le2n\log39.
\end{aligned}
$$

平方并除以正数 $4(\log39)^2$ 即得所需下界。当 $1\le M\le12$ 时，用实际单字母前缀 $W_{[0,1)}=A$，其电荷 $Q(0,1)=2$，故 $P(M)\ge2$；同时 $\log(M+2)\le\log14<\log39$，所需下界的左端小于 $1/4$。上界则对每个 $m\le M$ 与任意 $s\in\mathbb N$ 使用统一界和 $0<\log(m+2)\le\log(M+2)$，再取最大值或上确界；$s=0$ 的情形给出 $P(M)\le R(M)$。因此，前缀累计最大值与所有起点的累计上确界都是对数平方阶，统一上界的最坏情形阶已经是锐的。这里没有优化常数；$M=0$ 时 $P(0)=R(0)=0$，上述正下界不成立。

这仍须与每个精确长度上的断言区分开。完整 $A$ 像给出另一族实际前缀：令 $\ell_n=|\sigma^{4n}(A)|$，则前面的 $a_n=2$ 与实际前缀包含关系给出

$$
Q(0,\ell_n)=2,\qquad \ell_n\ge4n+1\qquad(n\in\mathbb N).
$$

长度下界来自 $\sigma^{k+1}(A)=\sigma^k(A)\sigma^k(B)$（$k\ge0$）：每个 $B$ 像非空，故长度从一开始，每一步至少增加一。因而 $\ell_n\to\infty$，而 $|Q(0,\ell_n)|/(\log(\ell_n+2))^2\to0$：不存在 $c>0$ 与 $m_0\in\mathbb N$，使所有 $m\ge m_0$ 都有 $|Q(0,m)|\ge c(\log(m+2))^2$。对所有起点同时要求这种下界也不成立，因为它包含起点零。若固定精确长度后才对起点取上确界，记 $E(m)=\sup_{s\in\mathbb N}|Q(s,m)|$，则是否存在 $c>0$、$m_0\in\mathbb N$，使每个 $m\ge m_0$ 都满足 $E(m)\ge c(\log(m+2))^2$，并未由这里的论证确定；一个起点上的常电荷不控制其他起点，而累计最大值允许选取较短的长度。最优常数同样未在这里确定。$m_n$ 是键字的前缀长度，不能直接等同于前面指定的偶数格点数 $N_j$。

Adamczewski，*Symbolic discrepancy and self-similar dynamics*（[10.5802/aif.2079](https://doi.org/10.5802/aif.2079)，定理 1、命题 10–11）提供替代系统偏差与临界谱消去的一般框架。其加权下界中存在合适零均值字母权重的结论，并不自动指定这里随位置交替的权重；若把位置奇偶性编码进扩充字母表，还须另行核对本原性、频率、权重与消去条件。上面的证明直接计算原始字，既不借用该存在性结论来指定权重，也不据此主张机制或具体公式的文献新颖性。

对物理谱量，Juhász 从开边界横场 Ising 链得到辅助矩阵方法（[10.1103/PhysRevB.106.064204](https://doi.org/10.1103/PhysRevB.106.064204)，[arXiv:2206.11575v2](https://arxiv.org/abs/2206.11575v2)）：式 (6) 的 $2L\times2L$ 零对角开链矩阵（$L>1$，相邻耦合均非零）的正本征值，等于式 (7) 双对角矩阵的奇异值；式 (18)、(28) 给出最小正值的有限链上下界。其附录 B 式 (B4) 将常用近似能隙放在严格下界之下，该近似因而不能充作真能隙的上界。这里可比较的是辅助矩阵的谱问题，不能直接把原 Ising 多体能隙认作本跃迁链的多体能隙。

Hermisson 对多字母替代的边缘重整化特征值与无穷动力学指数的讨论（[10.1088/0305-4470/33/1/304](https://doi.org/10.1088/0305-4470/33/1/304)，[arXiv:cond-mat/9808238](https://arxiv.org/abs/cond-mat/9808238)，第 11 页）没有在该处给出本字的特定标度。Hida 的 Fibonacci XXZ 分析（[10.1143/JPSJ.73.2296](https://doi.org/10.1143/JPSJ.73.2296)，[arXiv:cond-mat/0404606v2](https://arxiv.org/abs/cond-mat/0404606v2)）中，式 (38) 的 $\Delta E\sim\exp[-\kappa(\log N)^2]$ 属于强弱耦合分离下的相互作用各向同性模型的微扰重整化；式 (28) 的自由 XY 情形给出的是有限指数幂律 $\Delta E\sim N^{-z}$。这些结论不替代对本链实际有限矩阵、端点、奇偶截断与所求谱量的核对。

[@thm-ch39-p2e-tribonacci-prefix-log-refutation] 排除了把该统一对数区段界当作逆矩阵估计前提的路线。[@thm-ch39-p2e-tribonacci-uniform-log-squared] 提供的是实际词上、对起点一致的交替电荷控制；结合前面的有限乘积恒等式，它可作为分析跃迁比值的组合输入。它本身没有给出完整逆矩阵的范数或质量估计，也没有反驳某个多项式谱隙界。[@thm-ch39-p2e-tribonacci-open-chain-zero-gap] 另用具体正电荷前缀和一个完整逆矩阵元素证明 $\delta_{\rho,j}\to0$；下文 [@ex-ch39-p2e-tribonacci-prefix-rate] 已按同一组实际跃迁、奇数重复窗口与完整逆矩阵质量估计的前提，完成更强的 $73728/N_j$ 纸面应用，并给出参数一致收敛；它不由交替电荷界单独推出。沿 Slater 态路线还须构造占据投影并分析其空间压缩。该链的空间切口与内部窗的关系仍须建立。该链 Slater 态的空间纠缠标度见 [@prob-ch39-p2e-fractal-horizon]。
:::
