# 35.6.7.3 固定禁戒长度下的一致谱隙 {#sec-ch39-s05-s07-s03-uniform-gap}

::: {.example #ex-ch39-p2e-uniform-parent-gap title="纸面推导（未经 Lean 验证）：固定禁戒长度下的一致谱隙"}
一次刷新只改一位，但零位能截断连续的全一禁戒。把若干相邻位一起刷新，两个边界条件造成的分歧便会在遇到第一个共同零时停止传播。下面把这个机制变成一个随链长不变的显式估计；这是书面推导，不新增 Lean 验证。

沿用 [@ex-ch39-p2e-heatbath-scale] 的模型，固定整数 $K\ge2$，令

$$
R=K-1,\qquad \ell=2K-1,\qquad C_K=\ell^2 2^\ell.
$$

对每个 $N\ge1$，我们将证明

$$
\begin{aligned}
\operatorname{Var}_\pi(f)&\le C_K\mathcal E(f,f)
&&\text{对每个 }f:W_N\to\mathbb C,\\
\lambda_{K,N}&\ge C_K^{-1},\\
\Delta_{K,N}&\ge 2C_K^{-1}
=\frac{2^{2-2K}}{(2K-1)^2}.
\end{aligned}
$$

常数不依赖 $N$；这里不声称它是最优常数，也不声称对 $K$ 一致。

**先做分块刷新。** 把格点编号为 $1,\ldots,N$。对每个整数 $a=2-\ell,\ldots,N$，保留带索引的非空区间

$$
B_a=[a,a+\ell-1]\cap[1,N],\qquad M=N+\ell-1.
$$

即使两个截断区间相同，也保留它们各自的索引。每个位点恰在 $\ell$ 个块内：包含 $u$ 的索引正是 $u-\ell+1,\ldots,u$。

先把一次条件刷新写成实际合法字上的矩阵。对任意有限位点集 $B\subseteq[1,N]$，补集均在 $[1,N]$ 内取。令 $Z=\#W_N=z_N>0$（全零字合法），并对 $x,y\in W_N$ 定义

$$
\begin{aligned}
\mathcal A_B(x)&=\{y\in W_N:y|_{B^c}=x|_{B^c}\},\\
m_B(x)&=\#\mathcal A_B(x)>0,\\
T_B(x,y)&=\frac{\mathbf1_{\{y\in\mathcal A_B(x)\}}}{m_B(x)},\\
(E_Bf)(x)&=\sum_{y\in W_N}T_B(x,y)f(y).
\end{aligned}
$$

因为 $x\in\mathcal A_B(x)$，分母非零。给定整个外部 $x|_{B^c}$，纤维的概率为 $m_B(x)/Z$，其中每个完整字的条件概率恰为 $(1/Z)/(m_B(x)/Z)=1/m_B(x)$。所以 $T_B$ 正是固定全部块外数据后的均匀合法字刷新；限制到 $B$ 就给出块内更新律。

相同外部数据把 $W_N$ 分成互不相交的非空纤维。若 $y\in\mathcal A_B(x)$，则 $\mathcal A_B(y)=\mathcal A_B(x)$ 且 $m_B(y)=m_B(x)$；若二者不在同一纤维，两向矩阵元都为零。因此 $T_B$ 是非负实对称矩阵，每行把质量均分给该行所在纤维，每列之和也由对称性等于 $1$。特别地，联合律 $\pi(x)T_B(x,y)$ 的两个边缘都精确等于原来的均匀律：

$$
\begin{aligned}
\sum_yT_B(x,y)&=1, &\sum_xT_B(x,y)&=1,\\
\sum_y\pi(x)T_B(x,y)&=\frac1Z,
&\sum_x\pi(x)T_B(x,y)&=\frac1Z.
\end{aligned}
$$

对每个这样的纤维 $C$，记 $\bar f_C=(\#C)^{-1}\sum_{x\in C}f(x)$。$E_Bf$ 在 $C$ 上恒为 $\bar f_C$，再次平均不变，故 $E_B^2=E_B$。对任意复值 $f,g$，按纤维分组有限和得到

$$
\begin{aligned}
\langle f,E_Bg\rangle_\pi
&=\frac1Z\sum_C(\#C)\overline{\bar f_C}\,\bar g_C\\
&=\langle E_Bf,g\rangle_\pi,\\
\langle f,E_Bf\rangle_\pi
&=\frac1Z\sum_C(\#C)|\bar f_C|^2\ge0.
\end{aligned}
$$

所以 $E_B$ 自伴、正半定，且为投向纤维上常值函数的正交投影。这些性质来自实际纤维平均。相应的剩余能量也可逐纤维直接算出：展开复模平方并使用 $\sum_{x\in C}f(x)=(\#C)\bar f_C$，便有

$$
\begin{aligned}
\sum_{x\in C}\overline{f(x)}(f(x)-\bar f_C)
&=\sum_{x\in C}|f(x)|^2
-\frac{\left|\sum_{x\in C}f(x)\right|^2}{\#C}\\
&=\sum_{x\in C}|f(x)-\bar f_C|^2\\
&=\frac1{2\#C}\sum_{x,y\in C}|f(x)-f(y)|^2.
\end{aligned}
$$

最后一步同样只是展开有限和；交叉项以复共轭成对合并为实部。条件方差在这里定义为 $\operatorname{Var}(f\mid B^c)=E_B(|f-E_Bf|^2)$，使用复模平方。把上式对所有纤维求和并除以全局字数 $Z$，得到

$$
\begin{aligned}
\operatorname{Re}\langle f,(I-E_B)f\rangle_\pi
&=\frac1{2Z}\sum_x\sum_yT_B(x,y)|f(x)-f(y)|^2\\
&=\frac1Z\sum_x\sum_yT_B(x,y)
|f(y)-(E_Bf)(x)|^2\\
&=\pi\!\left[\operatorname{Var}(f\mid B^c)\right].
\end{aligned}
$$

左侧内积本已是非负实数，也等于 $\|f-E_Bf\|_\pi^2$。一个纤维 $C$ 的外部数据出现概率是 $\#C/Z$，其条件方差为 $(\#C)^{-1}\sum_{x\in C}|f(x)-\bar f_C|^2$；这解释了取外部平均后的全局因子 $1/Z$。当 $B=\varnothing$ 时 $E_B=I$；当 $B=[1,N]$ 时 $E_Bf=\pi f$。这些纤维恒等式对 $N=0$ 的单个空字也成立，但不赋予空链激发谱隙。

现在对原来的块索引定义

$$
P_B=\frac1M\sum_a E_{B_a},\qquad
L_B=M(P_B-I),\qquad
\mathcal E_B(f,f)=\sum_a\pi\!\left[\operatorname{Var}(f\mid B_a^c)\right].
$$

这里每个带索引的块都有速率 $1$ 的时钟。于是 $-L_B=\sum_a(I-E_{B_a})$；逐索引相加刚证明的能量恒等式，得到 $\mathcal E_B(f,f)=\langle f,-L_Bf\rangle_\pi$。重复块值仍按其时钟索引重复计入，不另加 $1/M$。

**一个边界分歧只留下有限代价。** 先取在位点 $u$ 以外处处相同的两个合法字 $x,y$（也允许 $x=y$），并为两条链选择相同的块索引。若块含 $u$，块外完全相同，刷新时可以选取相同的整个块，于是分歧消失。

对远处的块，需要比较的是固定全部块外数据后，限制到块内的条件分布。更一般地，取任意有限位点集 $B\subseteq[1,N]\setminus\{u\}$，并假设每个 $v\in B$ 都满足 $|v-u|\ge K$。对 $z=x,y$，沿用上面定义的 $\mathcal A_B(z)$；把完整字在该纤维上的均匀条件律限制到 $B$，记为 $\mu_B^z$。这两个完成字集合分别含 $x,y$，所以归一化分母非零。

把 $w\in\mathcal A_B(x)$ 的第 $u$ 位改为 $y_u$，其余各位不动，得到 $\Phi(w)$。不含 $u$ 的长度 $K$ 窗口保持不变；含 $u$ 的窗口不可能遇到 $B$，故改写后该窗口与合法字 $y$ 完全一致。因此 $\Phi(w)$ 合法，且在整个 $B^c$ 上等于 $y$。反向把第 $u$ 位改回 $x_u$，便得到逆映射。这个双射还逐位保留 $B$，故总完成字数以及每个块内赋值 $b\in\{0,1\}^B$ 的完成字数都相同。于是

$$
\begin{aligned}
\mu_B^x(b)
&=\frac{\#\{w\in\mathcal A_B(x):w|_B=b\}}{\#\mathcal A_B(x)}\\
&=\frac{\#\{w\in\mathcal A_B(y):w|_B=b\}}{\#\mathcal A_B(y)}
=\mu_B^y(b).
\end{aligned}
$$

所以可以从这个共同的块内分布抽取同一个赋值来同步刷新，不产生新分歧；若 $x_u\ne y_u$，刷新后的完整字仍在块外的 $u$ 处不同，完整字的条件分布也不相等。上述论证只需没有长度 $K$ 的窗口同时遇到 $u$ 和 $B$，距离条件保证了这一点。$B$ 无需连续、非空或只在 $u$ 的一侧；$B=\varnothing$、$x=y$ 及短链 $N<K$ 也适用（短链没有这样的窗口）。

其余不含 $u$ 的受影响块至多有 $2R$ 个：右侧块的起点在 $u+1,\ldots,u+R$，左侧块的终点在 $u-R,\ldots,u-1$。截断只会减少这些索引；当 $N<\ell$ 时，相同的整链块仍按各自索引计入包含 $u$ 的块。

对一个受影响的右侧块，从左向右逐位抽取条件分布。固定任一条链已抽到的合法前缀后，下一位为 $0$ 的条件概率至少为 $1/2$：把下一位为 $1$ 的任一合法完成字改成 $0$，其余各位不变，得到一个不同的、下一位为 $0$ 的合法完成字。这是一个单射，因为删除 $1$ 不会制造全一禁戒。

每一步使用一个新的共同均匀随机数，按两条链各自的条件概率决定下一位。条件于双方完整的已抽历史，两边同时得到 $0$ 的概率至少为 $1/2$。第一次共同得到 $0$ 后，余下后缀的两个条件分布完全相同：任何连接先前历史与未抽后缀的连续窗口都经过这个零，故相应禁戒已自动满足；未抽后缀另一端的块外数据又相同。因此此后可同步抽取整个后缀。这一构造每一步都保留各自的条件抽样律，停止事件不会改变两条链的边缘分布。

令 $m=|B|$，按扫描次序把输出比特对记为 $(X_j,Y_j)$，$1\le j\le m$。把“首个共同零的位置”补成一个在所有输出上都有定义的随机变量：若块内存在共同零，取最早的扫描位置；若始终没有，令 $T=m+1$。记 $\mathcal G_j$ 为前 $j$ 对已抽样比特所生成的信息，并令 $A_j=\{T>j\}$，其中 $A_0$ 是整个样本空间。这里所有关于已抽样历史的条件概率陈述都只针对正概率历史。

在首个共同零之前，即使两条剩余条件律已经相同，也仍逐步使用新的共同均匀随机数；共同零之后只需从共同的后缀分布同步完成。在 $A_{j-1}$ 上，下一步出现共同零的条件概率至少为 $1/2$，所以对 $1\le j\le m$，

$$
\begin{aligned}
\Pr(A_j)
&=\mathbb E\!\left[\mathbf1_{A_{j-1}}
  \Pr\!\left((X_j,Y_j)\ne(0,0)\mid\mathcal G_{j-1}\right)\right]\\
&\le\frac12\Pr(A_{j-1})
\le2^{-j}.
\end{aligned}
$$

事件 $A_j$ 只排除前 $j$ 步中的共同零，仍允许 $(1,1)$，并不等于“每一步都有分歧”。一旦出现共同零，该位置两位相同且后缀同步，故扫描位置 $j$ 上的分歧要求 $T>j$。于是同一个联合分布同时满足

$$
\begin{aligned}
\Pr(X_j\ne Y_j)&\le\Pr(T>j)\le2^{-j}
&& (1\le j\le m),\\
\mathbb E\!\left[\sum_{j=1}^{m}\mathbf1_{X_j\ne Y_j}\right]
&\le\sum_{j=1}^{m}2^{-j}=1-2^{-m}\le1.
\end{aligned}
$$

期望的估计只用有限和的线性性，不要求不同位置的分歧事件独立。$j=m$ 时，$A_m=\{T=m+1\}$ 正是整块没有共同零的事件。本例使用非空块；若把这一纸面构造延伸到 $m=0$，则 $T=1$，和为空且代价为零。若初始两条条件块分布已经相同，也可以直接作同步抽样；此时比特分歧代价为零，并不需要块中实际出现一个零。

为把“原生输出”与上面的纸面共享阈值构造分开，先固定有限坐标。令 $W_n=\operatorname{Fin}(n)\to\{\mathrm{false},\mathrm{true}\}$，$C(k,n,F,z)$ 是所有满足原始 `DBonacciAdmissible` 扫描且在有限集 $F\subseteq\operatorname{Fin}(n)$ 上等于 $z$ 的完整字；若该纤维有见证 $h$，令 $L(F,z,h)=\operatorname{completionLaw}(F,z,h)$。对两个非空纤维，记原始定义的 $P(s,F,x,y,h_x,h_y)=\operatorname{prefixCoupling}(s,F,x,y,h_x,h_y)$。照 Lean 源码，这几个名字的意思是：$\operatorname{completionLaw}(F,z,h)$ 是非空纤维 $C(k,n,F,z)$ 上的均匀分布；$\operatorname{resetReady}(F,x,y)$ 指存在坐标 $z_0$，使 $x(z_0)=y(z_0)=\mathrm{false}$，所有不超过 $z_0$ 的坐标都在 $F$ 中，且 $F$ 中大于 $z_0$ 的坐标上 $x$ 与 $y$ 相同；$P$ 是两份完成字的联合分布，按扫描表 $s$ 递归定义——若 $\operatorname{resetReady}(F,x,y)$ 成立，就选定这样的 $z_0$ 与 $y$ 纤维里的一个合法字 $v$，按 $L(F,x,h_x)$ 抽一个完成字 $u$，输出 $(u,\operatorname{resetMap}(z_0,v,u))$，其中 $\operatorname{resetMap}(z_0,v,u)$ 在不超过 $z_0$ 的坐标上取 $v$、其余坐标取 $u$；否则若 $s$ 为空，两侧按各自的 completionLaw 独立抽样；若 $s=i::s'$，先用共享阈值耦合对两侧在坐标 $i$ 上的条件比特抽一对 $(b_1,b_2)$（两个边缘分布不变，共同为 `false` 的概率取两侧取 `false` 概率的较小者），把 $i$ 并入 $F$、把 $x(i),y(i)$ 分别改成 $b_1,b_2$，在 $s'$ 上递归；某侧细化纤维为空时（这样的比特对质量为零）退回独立抽样。对输出对 $w=(w_1,w_2)$，定义

$$
A_j(w)\;:\Longleftrightarrow\;\forall i\in\operatorname{take}(j,s),\;
\neg\bigl(w_1(i)=\mathrm{false}\land w_2(i)=\mathrm{false}\bigr).
$$

这里的 `take` 按列表顺序取前 $j$ 个坐标；坐标只要求 `Nodup`，不要求递增、覆盖补集或组成区间。于是原生输出事件得到精确的 Lean 归属：

::: {.theorem #thm-ch39-p2e-native-emitted-tail title="原始条件耦合完整输出的共同零尾界" lean="D5/S1/Words/AdmissibleWords/KBonacciEmittedTail.prefix_coupling_emitted_tail"}
对任意 $k,n\in\mathbb N$ 且 $0<k$，任意无重复坐标表 $s:\operatorname{List}(\operatorname{Fin}(n))$，任意有限固定集 $F:\operatorname{Finset}(\operatorname{Fin}(n))$，只要 $s$ 中每个坐标都不在 $F$ 内；再任取 $x,y:W_n$，并假设 $C(k,n,F,x)$ 与 $C(k,n,F,y)$ 都非空。对每个 $j\le |s|$，在原始联合分布 $P(s,F,x,y,h_x,h_y)$ 下，事件 $A_j$ 的指示函数均值满足

$$
\operatorname{mean}\!\left(P(s,F,x,y,h_x,h_y),\;w\mapsto\mathbf 1_{A_j(w)}\right)\le 2^{-j}.
$$

这一定义保留 `prefixCoupling` 的初始 `resetReady` 检查、递归分支与不可能细化时的独立回退；事件允许 $(\mathrm{true},\mathrm{true})$，并包含 $j=0$、空扫描、整张扫描、$x=y$ 以及初始重置分支。
:::

::: proof
对每个固定纤维作计数归纳：任取 $s$ 中的一个自由坐标，把该位为 `true` 的完成字改为 `false`，得到单射，故所有前 $j$ 位均为 `true` 的事件至多占 $2^{-j}$。在 `resetReady` 分支，两份输出在自由坐标逐位相同，事件恰化为这个全 `true` 计数界；在递归分支，首个输出对是采样到的比特对，`(false,false)` 子分支对事件贡献为零，其余有正质量的子分支进入相应细化纤维并使用归纳假设，而半失败预算给出下一步再乘 $1/2$。零质量或不可能的细化不贡献均值。整个归纳直接作用于原始 `prefixCoupling`，没有替换其初始测试或独立回退。完整证明由 Lean 内核检查。
:::

共同零尾界只控制“尚未遇到共同零”的概率；要把它用于后续分歧，还需要知道完整输出在共同零之后确实相同。对于递增且扫尽全部自由坐标的扫描，头部共同为 `false` 后，其左侧已全部固定；若更远的固定数据也相同，原始重置条件便成立。下面把这一机制直接落实到同一个 $P$ 的输出支撑上。

::: {.theorem #thm-ch39-p2e-native-supported-coalescence title="原始条件耦合完整输出支撑上的共同零汇合" lean="D5/S1/Words/AdmissibleWords/KBonacciSupportedCoalescence.prefix_coupling_supported_coalescence"}
对任意 $k,n\in\mathbb N$ 且 $0<k$，取无重复（`Nodup`）且按坐标值严格递增的列表 $s:\operatorname{List}(\operatorname{Fin}(n))$，以及有限固定集 $F:\operatorname{Finset}(\operatorname{Fin}(n))$，满足对每个 $i\in\operatorname{Fin}(n)$，$i\in s$ 当且仅当 $i\notin F$。任取历史 $x,y:W_n$ 及原始完成纤维 $C(k,n,F,x)$、$C(k,n,F,y)$ 非空的见证 $h_x,h_y$，并假设

$$
\forall i\in s,\;\forall t\in F,\quad i<t\ \Longrightarrow\ x(t)=y(t).
$$

对每个完整输出对 $w=(w_1,w_2)\in W_n\times W_n$，若 $P(s,F,x,y,h_x,h_y)(w)\ne0$，则对所有 $r,q\in\operatorname{Fin}(|s|)$ 且 $r\le q$，

$$
w_1(s[r])=\mathrm{false}\ \land\ w_2(s[r])=\mathrm{false}
\quad\Longrightarrow\quad w_1(s[q])=w_2(s[q]).
$$

这里 $s[r]$ 是从零开始编号的第 $r$ 个扫描坐标；历史 $x,y$ 自身不必是可容许字。空扫描及 $n=0$ 时结论为空量化；$F=\varnothing$、$x=y$、初始即满足重置条件、$r=q$ 与 $k=1$ 的情形均包含在上述陈述中。
:::

::: proof
对扫描列表归纳，始终保留同一个完整输出对 $w$。若初始 `resetReady` 已成立，原始定义先选重置坐标 $z$，并从 $y$ 的完成纤维选取实际的合法代表 $v$。重置分布的映射支撑把 $w$ 写成 $(u,\operatorname{resetMap}(z,v,u))$：不超过 $z$ 的坐标全在固定集内，所以每个自由扫描坐标都严格大于 $z$，而 `resetMap` 在那里保留 $u$；两份完整输出因而在全部扫描坐标上一致。这里不把任意历史本身当作合法代表，也不要求所选重置坐标就是刚扫描的头部。

若初始不重置，非空扫描按原始下一位耦合采样头部比特对。绑定分布的支撑给出一个有非零质量的比特对，并把同一个 $w$ 留在对应子分布的支撑内。该比特对的两个细化完成纤维均非空；原始定义中任一纤维不可能时的两个独立回退分支仍保留，只是它们的比特对没有正质量。子耦合的精确完成律边缘与固定坐标性质共同保证：$w$ 的头部正是这次采样的比特对。若共同零出现在头部，两边采样值于是都为 `false`；严格递增、补集覆盖和更远固定坐标上的一致性使细化历史满足 `resetReady`，由前一段得到所有剩余扫描位置相同。若共同零在后续位置，则严格次序、补集覆盖与更远固定一致性随细化历史传给子问题，归纳适用于同一个 $w$，包括子问题已经重置的情形。$r=q$ 直接由共同为 `false` 得到，空扫描没有可选的有限索引。完整证明由 Lean 内核检查。
:::

在 [@thm-ch39-p2e-native-supported-coalescence] 的全部假设下，可以把它与 [@thm-ch39-p2e-native-emitted-tail] 用于同一个原生联合分布，得到逐点分歧与有限汉明代价的估计。具体地，保持 $k>0$、$n\in\mathbb N$，令 $s$ 无重复、按坐标值严格递增并恰好枚举 $F$ 的补集；任意历史 $x,y$ 的两个原始完成纤维均非空，且对 $i\in s$、$t\in F$，有 $i<t\Rightarrow x(t)=y(t)$。历史本身不必可容许。固定

$$
\begin{aligned}
m&=|s|,\qquad a=\tfrac12\in\mathbb R_{\ge0}\cup\{\infty\},\\
P&=P(s,F,x,y,h_x,h_y).
\end{aligned}
$$

这里的 $P$ 始终是上述原始 `prefixCoupling`，包括初始 `resetReady` 检查、实际完成代表的选择以及不可能细化时的两个独立回退分支。对从零开始的 $q\in\operatorname{Fin}(m)$，定义取值为扩展非负实数的分歧指标与扫描代价

$$
\begin{aligned}
D_q(w)&=\mathbf1_{\{w_1(s[q])\ne w_2(s[q])\}},\\
H_s(w)&=\sum_{q\in\operatorname{Fin}(m)}D_q(w)
=\operatorname{scanHamming}(s,w).
\end{aligned}
$$

$H_s$ 只数扫描坐标上的分歧；列表无重复，所以每个自由坐标恰计一次。与前面纸面构造的一基编号对应时，这里的 $q$ 对应 $j=q+1$；这一编号对应本身不识别两种联合律。

固定 $q$，并取 $P(w)\ne0$ 的完整输出。若前 $q+1$ 个扫描位置中有共同 `false`，其零基索引就是某个 $r\le q$，支撑汇合结论便给出第 $q$ 位相同。取其逆否命题，得到

$$
\{w:D_q(w)=1\}\cap\operatorname{supp}(P)
\subseteq A_{q+1}\cap\operatorname{supp}(P).
$$

这里仍用前面定义的 $A_j$：它排除共同零，允许 $(\mathrm{true},\mathrm{true})$，并不要求每一位都有分歧。支撑之外 $P(w)=0$，因此即使该处不满足事件包含，相应加权项也为零。于是对所有完整输出，均有

$$
P(w)D_q(w)\le P(w)\mathbf1_{A_{q+1}(w)}.
$$

把这些非负项求和，再将尾界用于同一个 $P$ 和 $j=q+1\le m$，便有

$$
\begin{aligned}
\Pr_P(D_q=1)
&=\operatorname{mean}(P,D_q)\\
&\le\operatorname{mean}(P,\mathbf1_{A_{q+1}})
\le a^{q+1}.
\end{aligned}
$$

现在把同一联合律下的逐点界相加。完整字对集合 $W_n\times W_n$ 和扫描索引集都有限；将 `mean` 中的非负求和写成有限和，逐项分配乘法，再交换两个有限和，得到

$$
\begin{aligned}
\operatorname{mean}(P,H_s)
&=\sum_{w\in W_n\times W_n}P(w)
  \sum_{q\in\operatorname{Fin}(m)}D_q(w)\\
&=\sum_{q\in\operatorname{Fin}(m)}\operatorname{mean}(P,D_q)\\
&\le\sum_{q=0}^{m-1}a^{q+1}=1-a^m.
\end{aligned}
$$

最后的几何和在扩展非负实数中也按合法的减法解释。先在 $\mathbb R_{\ge0}$ 中令 $b=1/2$；有限几何和恒等式给出

$$
\left(\sum_{q=0}^{m-1}b^q\right)(1-b)=1-b^m,
\qquad 1-b=b.
$$

所以 $\sum_{q=0}^{m-1}b^{q+1}=1-b^m$。再沿 $\mathbb R_{\ge0}\hookrightarrow\mathbb R_{\ge0}\cup\{\infty\}$ 的标准嵌入，利用它保持有限和、幂和截断减法的性质，得到上面的 $a$ 恒等式。这里 $b^m\le1$，所有项及结果均有限，没有对无穷量作消去。整个均值计算只用有限和，不要求不同位置的分歧事件独立。

当 $m=0$ 时，逐点陈述为空量化，$H_s=0$，右端为 $1-a^0=0$；$n=0$ 也包含在内。非空扫描的末端 $q=m-1$ 使用的恰是整张扫描事件 $A_m$，得到 $a^m$，没有丢掉最后一位。$F=\varnothing$、$x=y$、初始即重置以及 $k=1$ 都保留在同一组假设内，既不排除退化情形，也不另换耦合。

以上是两条所引结果在同一原生联合律上的应用推导；它们各自的 Lean 声明并未单独陈述这组组合不等式。原始 `prefixCoupling` 的两个完成律边缘已经确立，所缺的不是这两个原生边缘。要接到本例后续的实际块刷新，还须把所用完成纤维及其限制、补回外部后的分布精确识别为这里的 $\mu_B^z$ 与 $T_B(z,\cdot)$；对左侧块，还须通过 `Fin.rev` 同时搬运两份输出、支撑和事件。上面的纸面共享阈值构造与原生联合律是否同律也未由此给出，且不从这些估计推出。因此此前纸面推导的完整 P2E 应用边界仍保留；这里也没有建立任何实验哈密顿量的物理识别。

左侧块反向抽样即可。以下用 $d$ 表示完整字的汉明距离。

把块内耦合变成完整字的同一个联合分布时，必须补回块外数据。对任意块 $B$，同样用 $\mu_B^z$ 表示 $T_B(z,\cdot)$ 限制到块内的分布。对 $z=x,y$，把赋值 $b\in\{0,1\}^B$ 接回原来的外部，记为

$$
R_z(b)_i=
\begin{cases}
b_i,&i\in B,\\
z_i,&i\notin B.
\end{cases}
$$

限制映射 $w\mapsto w|_B$ 把 $\mathcal A_B(z)$ 双射到 $\mu_B^z$ 的支持，其逆映射就是 $R_z$：给定块外数据后，每个可行的块内赋值恰有一个完整字。因此从 $\mu_B^z$ 抽样再接回外部，所得完整字精确服从 $T_B(z,\cdot)$，且必为合法字。令 $J$ 为刚构造的两条块内更新律的联合分布；先抽取 $(b,c)\sim J$，再同时令 $(X',Y')=(R_x(b),R_y(c))$，便得到同一个合法完整字对上的联合分布 $Q$。它的两个边缘分别是 $T_B(x,\cdot)$ 与 $T_B(y,\cdot)$。

当 $u\notin B$ 时，块外除 $u$ 外处处相同。记 $\delta=\mathbf1_{\{x_u\ne y_u\}}$，并令 $d_B(b,c)=\sum_{i\in B}\mathbf1_{\{b_i\ne c_i\}}$。逐点距离及其在上述联合分布下的平均满足

$$
\begin{aligned}
d(R_x(b),R_y(c))&=d_B(b,c)+\delta,\\
\mathbb E_Q[d(X',Y')]&=\mathbb E_J[d_B(b,c)]+\delta.
\end{aligned}
$$

所以远块的同步耦合使完整距离恰为 $\delta$；受影响块的扫描耦合使其期望不超过 $1+\delta$，在相邻字对上不超过 $2$。若块含 $u$，前面选取的共同完整字则使距离为 $0$。若 $x=y$，可在所有块上直接选相同刷新，保持完整距离为 $0$。

把上述三种情况按块索引平均，整个一步分块刷新因而满足

$$
\mathbb E[d(X',Y')]
\le 1-\frac\ell M+\frac{2R}M
=1-\frac1M
\quad\text{当 }d(x,y)=1.
$$

**从耦合到分块谱隙。** 这里仅需相邻合法字的实际耦合。先把其有限求和形式写清楚：简记 $T_a=E_{B_a}$，对每个有向相邻字对 $(s,t)$ 和每个原时钟索引 $a$，令 $Q_a(s,t;v,w)$ 为上面构造的同一个刷新后完整字联合律的质量。它满足

$$
\begin{aligned}
Q_a(s,t;v,w)&\ge0,\\
\sum_wQ_a(s,t;v,w)&=T_{B_a}(s,v),\\
\sum_vQ_a(s,t;v,w)&=T_{B_a}(t,w),\\
\sum_{v,w}Q_a(s,t;v,w)&=\sum_vT_{B_a}(s,v)=1.
\end{aligned}
$$

所有字指标均在原来的 $W_N$ 中。最后一式由第一边缘及已证明的行和推出。用这个联合律定义完整汉明代价

$$
C_a(s,t)=\sum_{v,w}Q_a(s,t;v,w)d(v,w).
$$

因为 $0\le d(v,w)\le N$ 且总质量为 $1$，$C_a(s,t)$ 是 $[0,N]$ 内的有限实数。含分歧位的 $\ell$ 个索引代价为零，至多 $2R$ 个受影响索引代价不超过 $2$，其余代价为 $1$。因此对这些同一实际耦合，

$$
\begin{aligned}
\sum_a(C_a(s,t)-1)&\le-\ell+2R=-1,\\
\sum_a C_a(s,t)&\le M-1.
\end{aligned}
$$

这里索引数恰为 $N-(2-\ell)+1=M=N+\ell-1\ge\ell\ge3$，所以第二行只是展开第一行的 $M$ 个减一项。若均匀选取一个索引，联合质量为 $M^{-1}\sum_aQ_a(s,t;v,w)$，总质量为 $1$，两个边缘为 $P_B(s,\cdot)$ 与 $P_B(t,\cdot)$，期望完整距离为 $M^{-1}\sum_aC_a(s,t)$。这也说明前面的一步期望估计中 $1/M$ 的来源；重复截断块仍逐索引计数。

现在看函数差。合法字集对删除 $1$ 封闭。由 $x$ 先删到逐位交 $x\cap y$，再添到 $y$，路径的前半段始终逐位不超过 $x$，后半段始终逐位不超过 $y$，故全程合法。每个相异坐标恰翻转一次，路径长度为 $d(x,y)$；任何单比特路径至少需要这么多步。因此合法翻转图的最短路距离就是完整汉明距离。$N\ge1,K\ge2$ 保证全零字和仅首位为 $1$ 的字构成一条边，图的边集非空。

对任意 $g:W_N\to\mathbb C$，定义有限相邻边最大值及全局半范数

$$
\begin{aligned}
L_{\partial}(g)&=\max_{d(s,t)=1}|g(s)-g(t)|,\\
\operatorname{Lip}(g)&=\max_{x\ne y}
\frac{|g(x)-g(y)|}{d(x,y)}.
\end{aligned}
$$

两者的最大值都在非空有限集上取到。沿上述路径对函数差使用三角不等式，得 $|g(x)-g(y)|\le L_{\partial}(g)d(x,y)$，所以 $\operatorname{Lip}(g)\le L_{\partial}(g)$；把相邻字对代入全局最大值给出反向不等式。故两者相等，并且恰在 $g$ 为常数时等于零。尤其非常数函数的相邻边最大值严格为正且有限。

固定一条相邻边和一个时钟，两个原边缘给出如下同一联合律下的比较：

$$
\begin{aligned}
(T_ag)(s)-(T_ag)(t)
&=\sum_{v,w}Q_a(s,t;v,w)(g(v)-g(w)),\\
|(T_ag)(s)-(T_ag)(t)|
&\le\sum_{v,w}Q_a(s,t;v,w)|g(v)-g(w)|\\
&\le L_{\partial}(g)C_a(s,t).
\end{aligned}
$$

等式分别使用行边缘与列边缘；不等式使用质量非负以及刚证明的全局函数差界。再对原来的 $M$ 个时钟平均，直接在每条边上得到

$$
\begin{aligned}
|(P_Bg)(s)-(P_Bg)(t)|
&\le\frac{L_{\partial}(g)}M\sum_aC_a(s,t)\\
&\le\left(1-\frac1M\right)L_{\partial}(g).
\end{aligned}
$$

沿合法最短路相加这些函数差估计，便对任意 $x,y\in W_N$ 得到

$$
\begin{aligned}
|(P_Bg)(x)-(P_Bg)(y)|
&\le\left(1-\frac1M\right)\operatorname{Lip}(g)d(x,y),\\
\operatorname{Lip}(P_Bg)
&\le\left(1-\frac1M\right)\operatorname{Lip}(g).
\end{aligned}
$$

这一步只延伸函数差的界，不要求为非相邻字对构造联合律。若非常数特征函数满足 $P_Bg=\mu g$，半范数的齐次性和严格正性立即给出已述的绝对值界 $|\mu|\le1-1/M$，也排除了特征值 $1$ 的额外特征函数。

生成元的下界还可以在一条取到最大值的边上直接读出。令

$$
A=-L_B=\sum_a(I-T_a)=M(I-P_B).
$$

设实值非常数函数 $h$ 满足 $Ah=\lambda h$，$\lambda\in\mathbb R$。取达到 $L=L_{\partial}(h)>0$ 的边，必要时交换端点，使 $h(s)-h(t)=L$。在这条边上使用刚才各时钟的比较，并相减两端的特征函数方程，得

$$
\begin{aligned}
(M-\lambda)L
&=\sum_a\bigl((T_ah)(s)-(T_ah)(t)\bigr)\\
&\le L\sum_aC_a(s,t)\le L(M-1).
\end{aligned}
$$

除以严格正的有限数 $L$，即得 $\lambda\ge1$。此处是每个索引速率 $1$ 的生成元下界；若把总刷新速率改为 $1$，生成元才是 $-A/M$，对应下界为 $1/M$。

上述特征函数比较依赖实际边缘与代价，不依赖矩阵对称性。实对称性用于下一步谱分解：各 $T_a$ 的实际纤维矩阵实对称，故 $A$ 在均匀内积下有实正交归一特征基。行和为 $1$ 给出 $A1=0$，前面的比较排除了所有非常数零特征函数；又因 $\|1\|_\pi^2=Z/Z=1$，可取 $e_0=1$，其余 $e_j$ 均与常数正交，特征值 $\lambda_j\ge1$。条件投影及其补投影的正性还给出 $0\le P_B\le I$，所以离散时间特征值非负；其绝对值收缩界本身已由边上的估计得到。

对任意实值 $h$，令 $u=h-\pi h=\sum_{j=1}^{Z-1}c_je_j$。由正交归一性和自伴性，

$$
\begin{aligned}
\operatorname{Var}_\pi(h)=\|u\|_\pi^2
&=\sum_{j=1}^{Z-1}c_j^2\\
&\le\sum_{j=1}^{Z-1}\lambda_jc_j^2
=\langle u,Au\rangle_\pi\\
&=\langle h,Ah\rangle_\pi.
\end{aligned}
$$

最后的等式使用 $A1=0$ 以及 $\langle1,Ah\rangle_\pi=\langle A1,h\rangle_\pi=0$；归一化始终是原来的 $\pi=1/Z$。对复值 $f=h+ik$，实矩阵 $A$ 分别作用于实部与虚部，方差与能量分别相加：

$$
\begin{aligned}
\operatorname{Var}_\pi(f)
&=\operatorname{Var}_\pi(h)+\operatorname{Var}_\pi(k)\\
&\le\langle h,Ah\rangle_\pi+\langle k,Ak\rangle_\pi\\
&=\operatorname{Re}\langle f,Af\rangle_\pi
=\mathcal E_B(f,f).
\end{aligned}
$$

最后一步正是上面按原时钟求和的复值条件方差恒等式。因此原有的复值分块方差界来自有限标量谱分解，无须增加全字对耦合假设。

**把分块能量交还给单点时钟。** 固定一个块 $B=B_a$。对实际可出现的外部赋值 $e\in\{0,1\}^{B^c}$，记 $e\sqcup b$ 为把外部 $e$ 与块内赋值 $b$ 按坐标拼回的完整字，并定义

$$
\begin{aligned}
A_e&=\{b\in\{0,1\}^B:e\sqcup b\in W_N\},\\
m_e&=\#A_e,\qquad \pi_e(b)=\frac1{m_e}\quad(b\in A_e),\\
f_e(b)&=f(e\sqcup b),\\
\Pr_\pi(w|_{B^c}=e)&=\frac{m_e}{Z}.
\end{aligned}
$$

可实现性保证 $m_e>0$，且固定外部后每个块内赋值恰对应一个完整字，所以 $\pi_e$ 就是实际的块内条件律。删除封闭性在这里仅作用于 $B$ 内的坐标：把 $b$ 中任意一些 $1$ 改成 $0$ 不会产生禁窗口，且整个外部 $e$ 保持不动。因此 $A_e$ 是非空的删除封闭族，$m_e\le2^{|B|}\le2^\ell$。

再固定 $i\in B$ 以外的所有块内位，要求这些数据在 $A_e$ 中可实现。第 $i$ 位的条件支持只能是 $\{0\}$ 或 $\{0,1\}$，不会是 $\{1\}$：若 $1$ 可行，删除它便给出同一外部和其余各位下的可行值 $0$。均匀律 $\pi_e$ 在双点纤维上各赋概率 $1/2$，在单点纤维上保持不动。因此每站速率 $1$ 的条件热浴时钟在每条合法翻转边上的跳转速率恰为 $1/2$。

记 $\mathscr D_e$ 为 $A_e$ 中相差一位的有序字对集合，$\mathscr U_e$ 为相应的无序边集合（每条边只计一次）。对任意复值函数 $g:A_e\to\mathbb C$，条件单点能量于是为

$$
\begin{aligned}
\mathcal E_{\mathrm{site},A_e}(g,g)
&:=\sum_{i\in B}\mathbb E_{\pi_e}
\operatorname{Var}_{\pi_e}(g\mid B\setminus\{i\})\\
&=\frac1{4m_e}\sum_{(b,c)\in\mathscr D_e}|g(b)-g(c)|^2\\
&=\frac1{2m_e}\sum_{\{b,c\}\in\mathscr U_e}|g(b)-g(c)|^2.
\end{aligned}
$$

这里方差仍使用复模平方。双点纤维的条件方差为 $|g(b)-g(c)|^2/4$，其 $\pi_e$ 质量为 $2/m_e$，故每条无序边的系数为 $1/(2m_e)$；单点纤维的贡献为零。

暂记 $A=A_e$、$m=m_e$，沿用上面的删除封闭族路径估计。任意 $x,y\in A$ 之间经过交集的合法路径长度至多为 $\ell$。均匀方差恒等式、路径上的 Cauchy–Schwarz 不等式，以及每条边至多被全部 $m(m-1)/2$ 个无序字对使用，给出

$$
\begin{aligned}
\operatorname{Var}_A(g)
&=\frac1{m^2}\sum_{\{x,y\}\subset A}|g(x)-g(y)|^2\\
&\le\frac\ell2\sum_{\{x,y\}\text{ 为合法单比特边}}|g(x)-g(y)|^2\\
&=\ell m\,\mathcal E_{\mathrm{site},A}(g,g)
\le\ell2^\ell\mathcal E_{\mathrm{site},A}(g,g).
\end{aligned}
$$

若 $m_e=1$，方差和所有能量都为零；$B=\varnothing$ 时 $A_e$ 只含空赋值，单点能量的空和也为零。

现在把条件单点能量还原到原链。固定 $e$ 和 $b|_{B\setminus\{i\}}$，就是固定完整字在 $i^c=[1,N]\setminus\{i\}$ 上的全部数据。因此条件支持和各点概率都与原链的第 $i$ 站条件律完全相同。令 $v_i(w)=\operatorname{Var}_\pi(f\mid i^c)(w)$，便有

$$
\mathcal E_{\mathrm{site},A_e}(f_e,f_e)
=\sum_{i\in B}\frac1{m_e}\sum_{b\in A_e}v_i(e\sqcup b).
$$

以原链抽到的 $e=w|_{B^c}$ 为随机外部，按其实际概率 $m_e/Z$ 平均，得到

$$
\begin{aligned}
\mathbb E_\pi[\mathcal E_{\mathrm{site},A_e}(f_e,f_e)]
&=\sum_e\frac{m_e}{Z}\mathcal E_{\mathrm{site},A_e}(f_e,f_e)\\
&=\frac1Z\sum_e\sum_{b\in A_e}\sum_{i\in B}v_i(e\sqcup b)\\
&=\sum_{i\in B}\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
\end{aligned}
$$

这里对 $e$ 的求和只取可实现的外部；各 $e\sqcup b$ 恰遍历一次 $W_N$。条件平均中的 $1/m_e$ 已与外部概率中的 $m_e$ 抵消，不再添加归一化因子。把删除封闭族的方差界用于 $f_e$，再按同一外部律平均，便得到每块的比较

$$
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid B^c)]
\le\ell2^\ell\sum_{i\in B}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
$$

最后按原来的全部块索引 $a$ 求和。每个位点 $i$ 恰出现在 $a=i-\ell+1,\ldots,i$ 这 $\ell$ 个块中；即使短链上若干块都等于整链，它们各自速率 $1$ 的时钟仍分别计入。因此

$$
\begin{aligned}
\mathcal E_B(f,f)
&\le\ell2^\ell\sum_a\sum_{i\in B_a}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)]\\
&=\ell^2 2^\ell\mathcal E(f,f).
\end{aligned}
$$

与分块方差界合并就得到所述 Poincaré 界及 $\lambda_{K,N}\ge C_K^{-1}$。再用 [@ex-ch39-p2e-heatbath-scale] 的完整空间谱比较，因为 $K\ge2$ 时 $2/C_K<1$，得到 $\Delta_{K,N}\ge2/C_K$。例如 $K=2$ 给出 $1/36$，$K=3$ 给出 $1/400$。空链 $N=0$ 仍没有激发谱隙；短链 $1\le N<K$ 的精确谱隙仍为 $2$。

**从谱隙到任意振幅的能量估计。** 固定 $K\ge2,N\ge1$，简记 $H=H_{K,N}$、$\Psi=\Psi_{K,N}$。任意完整布尔字空间中的复向量 $|\psi\rangle=\sum_{w\in\Omega_N}a_w|w\rangle$ 都按实际合法字与非法字分解为

$$
\begin{aligned}
\psi&=\psi_L+\psi_I,\\
|\psi_L\rangle&=\sum_{w\in W_N}a_w|w\rangle,\\
|\psi_I\rangle&=\sum_{w\in\Omega_N\setminus W_N}a_w|w\rangle,\\
\beta&=\langle\Psi|\psi\rangle
=\langle\Psi|\psi_L\rangle.
\end{aligned}
$$

取上例的逆像 $f(w)=\sqrt Z\,a_w$，其中 $Z=|W_N|$。由已经逐项核对的归一化与能量恒等式，再用本例的实际 Poincaré 界，得到

$$
\begin{aligned}
\pi f&=\beta,\\
\operatorname{Var}_\pi(f)&=\|\psi_L\|^2-|\beta|^2,\\
Q(H,\psi_L)&=2\mathcal E(f,f)\\
&\ge\frac2{C_K}
\bigl(\|\psi_L\|^2-|\beta|^2\bigr).
\end{aligned}
$$

父例的矩阵元展开已给出合法与非法扇区之间的零矩阵元，因此两块没有交叉能量；上例的非法罚能估计给出 $Q(H,\psi_I)\ge\|\psi_I\|^2$。由于 $C_K=(2K-1)^2 2^{2K-1}\ge72$，令 $c_K=2/C_K\le1$，便可合并为

$$
\begin{aligned}
Q(H,\psi)&=Q(H,\psi_L)+Q(H,\psi_I)\\
&\ge c_K\bigl(\|\psi_L\|^2-|\beta|^2\bigr)
+\|\psi_I\|^2\\
&\ge c_K\bigl(\|\psi\|^2-|\langle\Psi|\psi\rangle|^2\bigr).
\end{aligned}
$$

这就是二次型意义下的原生算符不等式 $H\ge c_K(I-|\Psi\rangle\langle\Psi|)$。向量无需归一化，也无需与基态正交；若 $\|\psi\|=1$，右侧残量就是 $1-|\langle\Psi|\psi\rangle|^2$。当 $1\le N<K$ 时所有字合法，$\psi_I=0$，同一推导仍成立。$N=0$ 只有一维真空，能量与去掉基态后的残量都为零，不能据此声称存在激发谱隙。

这把已推导的固定 $K$、链长一致谱隙明确用于任意态的能量估计，仍是上述纸面推导的应用，不新增 Lean 验证。它没有把该模型等同于实际里德堡或任意子哈密顿量，也没有建立与 Rauzy 边界维数的物理对应。
:::

::: {.remark #rem-ch39-p2e-rydberg-anyon-literature title="文献结果：斐波那契任意子黄金链与里德堡原子阻塞实验背景（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在凝聚态与原子分子光物理文献中，$K = 2$ 的禁邻 `11` 希尔伯特空间在两类著名多体系统中获得了物理实现或理论建模：其一是 A. E. Feiguin 等人提出的拓扑斐波那契任意子“黄金链”（golden chain）模型（*Phys. Rev. Lett.* **98**, 2007, 160409），其融合规则 $\tau \times \tau = \mathbf{1} + \tau$ 使有限链融合空间维数按斐波那契数增长；其二是里德堡（Rydberg）原子阵列中的偶极/范德瓦耳斯 $1/r^6$ 阻塞机制（理论建模见 I. Lesanovsky, *Phys. Rev. Lett.* **106**, 2011, 025301；51 原子量子模拟器实验见 H. Bernien et al., *Nature* **551**, 2017, 579–584）。引用这些物理背景时须注意两重边界：第一，最近邻两体里德堡阻塞刚好实现禁相邻激发 $|11\rangle$（对应 $K = 2$ 的 PXP 子空间），但单纯拉大两体阻塞半径只会禁止距离 $R_b$ 内的一切激发对（例如连 `101` 一并禁止），**并不会自动产生 $K > 2$ 的禁连续 $1^K$ 约束**——若要在物理哈密顿量中实现 $K > 2$ 的 $K$-Bonacci 子空间，必须另行设计专门的 $K$ 体局域相互作用；第二，任意子融合空间与有限阻塞比实验哈密顿量均非 [@thm-ch39-p2e-direct-encoder-ranks] 中精确零振幅等距直接编码器的形式同义物。
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entanglement" height="500"}
**跨切口禁戒与可达秩矩形卡（`entanglement`）**：左侧展示跨切口拼接检验 $\tau(x) + \iota(y) < K$（青色标出相容拼接字对，品红标出触发 $1^K$ 阻塞的非法拼接），右侧绘制可达页秩矩形 $[1, R_0] \times [1, R_1]$ 与页熵上界 $\ln R_b$，琥珀色标出当前选定的参数与秩点。可达秩矩形与熵界属 `LEAN ✓`，具体参数枚举属 `NUM`，里德堡与任意子物理背景属 `文献结果`。
:::

最后，当有限长合法字延展为无穷轨道，系统的不确定性与可区分性便同时在马尔可夫平稳核、边界柱集概率与有限观测逃逸对三条轨道上显影。
