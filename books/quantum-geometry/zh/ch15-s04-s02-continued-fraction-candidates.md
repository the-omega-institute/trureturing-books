# 15.4.2 连分数候选与观察事件 {#sec-ch15-s04-s02-continued-fraction-candidates}


从分布到后处理，还要跨过一道数论桥。上面的 $N=7,Q=4,r=3$ 算例只有边缘分布的意义：$N^2=49>4$，不能用于下面的恢复结论。现在增加分辨率条件 $N^2\le Q$，只问一个确定性问题：给定测到的整数，哪个有限列表保证包含所需分式？

::: {.definition #def-shor-observable-candidates title="可观察输入的有限连分数候选" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.candidates"}
对自然数 $y,Q,N$，令 $C(x)$ 为有理数 $x$ 的有限连分数渐近分数列表，并定义

$$
\operatorname{candidates}(y,Q,N)
=\bigl[z\in C(y/Q)\mid\operatorname{den}(z)<N\bigr]。
$$

列表只接收测量整数 $y$、计数容量 $Q$ 与模数 $N$；不接收未知阶 $r$ 或相位指标 $s$。每个有理数都按正分母的既约形式表示。
:::

怎样真正列出 $C(x)$？写 $a_0=\lfloor x\rfloor$、$f=x-a_0$。若 $f=0$，返回单项列表 $[a_0]$；否则先递归列出 $C(1/f)$，把其中每项 $z$ 变为 $a_0+1/z$，再在前端接上 $a_0$。例如 $21/64$ 的第一层给出 $a_0=0$，下一层计算 $64/21=3+1/21$，最终得到 $[0,1/3,21/64]$。递归时正的既约分母严格下降，故列表有限；下文进一步给出列表长度界，并区分阶段数与实际运算成本。源码的 [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) 对负有理数、零与整数同样有定义；候选定义也按有理数除法的全函数约定接收 $Q=0$，但下述应用始终有 $Q>0$。

这份列表与真正的实连分数相连，而非另造一个近似列表。[`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) 给出的精确对应是：对任意有理数 $x,z$，$z\in C(x)$ 当且仅当存在 $k\in\mathbb N$ 使 $\operatorname{Real.convergent}(x,k)=z$。实数版本在有理数终止之后重复末项；有限列表只需保留这个值。以下用 [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) 记有理数 $s/r$；当 $r>0$ 时，其分母公式 [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) 为 $d=r/\gcd(s,r)$。

有限性之外，还可以控制列表有多长。记 $d=\operatorname{den}(x)$ 为有理数 $x$ 的规范正既约分母，并把 $\operatorname{Nat.log}(2,d)$ 读作 $\lfloor\log_2d\rfloor$；这里总有 $d\ge1$。

::: {.theorem #thm-rational-convergents-log-length title="有理渐近分数列表的对数长度界" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
对每个有理数 $x\in\mathbb Q$，

$$
\operatorname{length}(C(x))\le2\operatorname{Nat.log}(2,\operatorname{den}(x))+1.
$$

这包括负有理数、零与整数。整数的分母为 $1$，其列表为单项，等号成立。
:::

::: proof
对正既约分母作强归纳。整数直接终止；若倒数小数部分仍非整数，连续两次递归后的分母与一次递归后的分母之和不超过原分母，且前者严格小于后者，所以两步后的分母不超过原分母的一半。自然数对数的单调性与乘二公式支付这两项列表长度，再用归纳假设。完整证明由 Lean 内核检查。
:::

应用到可观察候选，只需 $y,Q,N\in\mathbb N$ 与 $Q>0$。过滤不能增加列表长度，且

$$
\operatorname{den}(y/Q)=\frac{Q}{\gcd(y,Q)}\le Q.
$$

于是由 [@thm-rational-convergents-log-length] 与自然数对数的单调性得到

$$
\begin{aligned}
\operatorname{length}(\operatorname{candidates}(y,Q,N))
&\le2\operatorname{Nat.log}(2,Q)+1,\\
\operatorname{length}(\operatorname{candidates}(y,2^n,N))&\le2n+1
\quad(n\in\mathbb N).
\end{aligned}
$$

这是所引长度界的应用，不要求 $y<Q$，也不要求 $N>0$；$n=0$ 时上界为 $1$，$N=0$ 时过滤后的列表为空。所计的是列表项数或欧几里得递归阶段数；递归定义中逐层 `map` 的总工作量、算术位复杂度与门复杂度没有由此给出。较短的列表也没有认证精确选择器，更没有使每个候选分母都整除真阶。下面的恢复结论仍须保留各自的实际参数、分辨率、最近条件与互素性假设。

::: {.theorem #thm-shor-nearest-candidate title="最近样本的条件候选成员资格" lean="D5/S3/Quantum/ShorContinuedFractions.shor_nearest_candidate"}
对每个实际补齐模乘的参数记录 $c:\operatorname{Parameters}$，记模数 $N=c.\operatorname{modulus}\ge2$、自然数底数 $a=c.\operatorname{base}$，其中 $\gcd(a,N)=1$；工作宽度 $w=c.\operatorname{width}$ 满足 $N\le2^w$，真阶 $r=c.\operatorname{period}=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)$ 满足 $0<r<N$。对任意独立选取的计数宽度 $n\in\mathbb N$，令 $Q=2^n$。对每个 $s\in\mathrm{Fin}\,r$ 与 $y\in\mathrm{Fin}\,Q$，假设

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right)。
$$

则

$$
\begin{aligned}
\operatorname{reduced}(s.\operatorname{val},r)
&\in\operatorname{candidates}(y.\operatorname{val},Q,N),\\
\operatorname{den}\bigl(\operatorname{reduced}(s.\operatorname{val},r)\bigr)&\mid r。
\end{aligned}
$$
:::

::: proof
圆周最近条件排除绕回后给出普通绝对误差至多 $1/(2Q)$。令 $d$ 为约分后的分母；由 $d\le r<N$ 与 $N^2\le Q$ 得 $d^2<Q$，因此误差严格小于 $1/(2d^2)$。Legendre 逼近定理给出一个实渐近分数指标，上述有限列表对应把它转为实际成员；$d<N$ 使其通过候选过滤。分母公式 $d=r/\gcd(s.\operatorname{val},r)$ 给出 $d\mid r$。完整证明由 Lean 内核检查。
:::

这里的假设就是 $\operatorname{Nearest}$ 本身。沿用前面的定义，它表示存在整数 $z$ 使

$$
\left|\frac{s.\operatorname{val}}r-\frac{y.\operatorname{val}}Q-z\right|\le\frac1{2Q}。
$$

为什么此处不会绕回？记 $\theta=s.\operatorname{val}/r$、$u=y.\operatorname{val}/Q$，则 $0\le\theta\le1-1/r$、$0\le u\le1-1/Q$。非零整数平移的最近两种可能是 $z=1$ 与 $z=-1$；它们的误差分别至少为 $1/r$ 与 $1/Q$，都严格大于 $1/(2Q)$，更远的整数也不可能。因此 $z=0$。非严格的最近格点条件仍允许两边的舍入并列；转成严格 Legendre 半径靠的是分母平方的余量：

$$
\left|\frac{y.\operatorname{val}}Q-\frac{s.\operatorname{val}}r\right|
\le\frac1{2Q}<\frac1{2d^2},
\qquad d\le r<N,\quad N^2\le Q。
$$

::: {.theorem #thm-shor-coprime-candidate title="互素相位下真阶的条件成员资格" lean="D5/S3/Quantum/ShorContinuedFractions.shor_coprime_candidate"}
对每个上述实际参数记录 $c$（$N\ge2$、$\gcd(a,N)=1$、$N\le2^w$、$0<r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)<N$），每个独立计数宽度 $n\in\mathbb N$、$Q=2^n$、$s\in\mathrm{Fin}\,r$ 与 $y\in\mathrm{Fin}\,Q$，假设

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right),\qquad
\gcd(s.\operatorname{val},r)=1。
$$

则真阶出现在候选分母列表中：

$$
r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)。
$$
:::

::: proof
[@thm-shor-nearest-candidate] 给出约分相位的候选成员资格；互素性使其分母 $r/\gcd(s.\operatorname{val},r)$ 等于 $r$。完整证明由 Lean 内核检查。
:::

$r,s$ 是刻画测量结果的潜在假设参数，读者运行候选计算时并不知道它们。第二条结论只说真阶在有限列表里，没有认证如何选中它；第一条的整除性只属于那个被指定的约分相位，绝不覆盖所有候选。以下是独立精确有理数计算，不为算例另加 Lean 验证标记：

| $N,a,Q;r,s,y$ | 最近误差与上界 | $\operatorname{candidates}(y,Q,N)$ |
| --- | --- | --- |
| $7,2,64;3,1,21$ | $1/192\le1/128$ | $[0,1/3]$ |
| $13,4,256;6,1,43$ | $1/768\le1/512$ | $[0,1/5,1/6]$ |
| $7,2,64;3,0,0$ | $0\le1/128$ | $[0]$ |

第一行刚才已经按欧几里得递归算出全列表；$21/64$ 的分母不小于 $7$，被过滤掉。第二行的全列表是 $[0,1/5,1/6,21/125,43/256]$；过滤后既包含正确分母 $6$，也包含不整除 $6$ 的 $5$。因此不能把“取最后一个候选”或“通过一次模幂检验”写成这里已证明的精确选阶算法。即使检验 $a^d\equiv1\pmod N$ 通过，它本身只说明 $r\mid d$，即 $d$ 是阶的倍数，不能保证 $d=r$。

零有理数的分母为 $1$，所以 $s=0$ 仍在第一条定理范围内；$r=1$ 时唯一相位是 $s=0$，且 $\gcd(0,1)=1$，第二条同样适用。恢复条件 $N\ge2$、$N^2\le2^n$ 已排除了 $n=0,1$，而前面的边缘分布允许这些宽度。两条候选定理均不要求 $r\mid Q$，也不把工作宽度 $w$ 与计数宽度 $n$ 等同。若实验末端使用本章的正指数 $\mathcal F_+$，对观察标号 $k_+$ 应先取 $y=\rho(k_+)=(-k_+)\bmod Q$，再检查针对同一相位 $s/r$ 的最近条件并计算这里的候选；直接保留原标号会改变所逼近的相位。

**一次实际测量，候选列表包含真阶的概率。** 现在把条件恢复与实际边缘分布接起来。固定上述任意实际参数记录 $c$，仍取 $N=c.\operatorname{modulus}\ge2$、$r=c.\operatorname{period}$、$0<r<N$，并令 $Q=2^n$、$N^2\le Q$。使用的恰是 $c.\operatorname{modularOperator}$ 与 $c.\operatorname{input}$：模乘在补齐坐标上不动，工作输入为 $|1\rangle$，工作宽度与计数宽度独立。定义有限测量事件

$$
\begin{aligned}
E=\bigl\{y\in\mathrm{Fin}\,Q:\;&r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)\bigr\},\\
p(y)&=\operatorname{normSquared}\!\left(
\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right),\\
k(s,y)&=p_Q(s.\operatorname{val}/r,y),\qquad A=\frac4{\pi^2}.
\end{aligned}
$$

$E$ 对应源码的 `r ∈ (candidates y.val Q N).map Rat.den`。未知的 $r$ 只定义成功事件，候选计算的输入仍然只有 $y.\operatorname{val},Q,N$。所有比值均在把自然数转为实数后计算。由 [@thm-shor-distribution-normalized]，$\Pr_-(E)=\sum_{y\in E}p(y)$ 确实是这次实际计数测量的事件概率。下面逐步得到

$$
\Pr_-(E)\ge\frac4{\pi^2}\frac{\varphi(r)}r,
\qquad \varphi(r)=\operatorname{Nat.totient}(r).
$$

这个界由已引用结果结合有限计数得到。

**先为每个相位找一个合法的最近标号。** 对 $s\in\mathrm{Fin}\,r$，取实数 $x=Qs.\operatorname{val}/r$ 的最近整数 $m$；最近整数估计 `abs_sub_round` 给出 $|x-m|\le1/2$。因为 $0<r<N$、$N^2\le Q$，有 $r<Q$，故

$$
\begin{aligned}
0\le x&\le Q-\frac Qr<Q-1,\\
-\frac12\le m&\le x+\frac12<Q-\frac12.
\end{aligned}
$$

$m$ 是整数，所以 $0\le m<Q$，可取 $y_s\in\mathrm{Fin}\,Q$ 满足 $y_s.\operatorname{val}=m$。除以 $Q>0$ 得

$$
\left|\frac{s.\operatorname{val}}r-\frac{y_s.\operatorname{val}}Q\right|
\le\frac1{2Q}.
$$

这以整数平移 $z=0$ 满足 $\operatorname{Nearest}$。只需存在一个这样的标号；若恰有中点并列，两边的非严格最近选择都满足同一估计。$s=0$ 也包括在内。

**再在每个分量内界定同一事件的质量。** 记

$$
\mathcal C=\{s\in\mathrm{Fin}\,r:\gcd(s.\operatorname{val},r)=1\}.
$$

对每个 $s\in\mathcal C$，[@thm-shor-coprime-candidate] 把所选 $y_s$ 放进 $E$；[@thm-qpe-arbitrary-phase-lower-bound] 则给出 $k(s,y_s)\ge A$。每个 $k(s,y)$ 都是复振幅的平方模，非负，因此

$$
\begin{aligned}
\sum_{y\in E}k(s,y)&\ge k(s,y_s)\ge A
&& (s\in\mathcal C),\\
\sum_{y\in E}k(s,y)&\ge0
&& (s\notin\mathcal C).
\end{aligned}
$$

这里先对各分量中的事件 $E$ 求和；没有把可能重合的 $y_s$ 当作互异测量结果相加，也无需证明所选标号互异。

**最后用实际混合与互素计数合并。** [@thm-shor-qpe-probability-mixture] 给出 $p(y)=r^{-1}\sum_{s\in\mathrm{Fin}\,r}k(s,y)$。交换有限和，再使用上面的分量事件下界与正权重 $1/r$，得到

$$
\begin{aligned}
\Pr_-(E)
&=\sum_{y\in E}\frac1r\sum_{s\in\mathrm{Fin}\,r}k(s,y)\\
&=\frac1r\sum_{s\in\mathrm{Fin}\,r}\sum_{y\in E}k(s,y)\\
&\ge\frac1r\sum_{s\in\mathcal C}A\\
&=\frac{|\mathcal C|}{r}\,A
=\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

最后一步是有限计数：`Fin.sum_univ_eq_sum_range` 将 $\mathrm{Fin}\,r$ 的求和改写为 $0\le s<r$ 的求和，`Nat.coprime_comm` 将互素谓词的顺序与 `Nat.totient` 的定义对齐，故 $|\mathcal C|=\#\{a\in\mathbb N:a<r,\ \gcd(r,a)=1\}=\varphi(r)$。这个比值来自同一实际输入的谱混合权重与互素相位的个数，不是假设另有一次均匀抽取隐含相位的随机实验。$r=1$ 时 $\mathcal C=\{0\}$、$\varphi(1)=1$，唯一相位为零，唯一有非零概率的计数结果也为零，且零候选的分母为 $1$；实际事件概率为 $1$，下界仍适用。整个推导不要求 $r\mid Q$，也没有在既有分辨率条件之外另加宽度限制。

**正指数输出用反射事件。** 若末端采用 $\mathcal F_+$，令 $b$ 为观察标号，使用前文的对合置换 $\rho(b)=(-b)\bmod Q$，则事件应写为

$$
\begin{aligned}
E_+&=\{b\in\mathrm{Fin}\,Q:\rho(b)\in E\},\\
\Pr_+(E_+)&=\sum_{\rho(b)\in E}P_+(b)\\
&=\sum_{y\in E}P_-(y)
\ge\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

等式使用 $P_+(b)=P_-(\rho(b))$ 与 $\rho^2=\mathrm{id}$。最近条件和候选计算均作用于反射后的 $\rho(b)$，即计算 `candidates (rho b).val Q N`；这里没有把未反射的正指数候选事件换成 $E$。

这个下界保证一次实际测量所得的有限候选列表含有真阶的概率，不认证从列表中选出精确阶，也不说明所有候选分母都整除真阶。它本身没有指定两次测量的联合律；下面的应用显式加入两次独立重置的采样前提。理想相位采样的精确最小公倍数乘积律、因子提取、完整位复杂度或门复杂度、硬件实现与实测性能仍不在这一单次推导内；条件后验梳子的集中也没有随实际边缘事件一并得到证明。

**应用：两次独立重置，把两份分母补成真阶。** 一次约分可能丢掉真阶的某些素因子；另一份分母可以把它们补回来。这里沿用 `ShorContinuedFractions` 源文的两次重置应用，所问的是从两个可观察整数算出的全配对最小公倍数列表是否含有真阶。

固定同一个实际参数记录 $c$，令

$$
N=c.\operatorname{modulus}\ge2,\qquad
r=c.\operatorname{period}>0,\qquad
Q=2^n,\qquad N^2\le Q.
$$

仍有 $r<N$。两次都从原计数初态与原工作输入 $c.\operatorname{input}=|1\rangle$ 重新制备，使用同一个 $c.\operatorname{modularOperator}$ 与末端逆傅里叶变换；底数、模数、工作宽度和计数宽度都相同。记

$$
\begin{aligned}
A_-(y)&=\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y,\\
p(y)&=\operatorname{normSquared}(A_-(y))
=\sum_{u\in\mathrm{Fin}\,c.\operatorname{dimension}}|A_-(y)(u)|^2.
\end{aligned}
$$

这是对全部工作坐标（包括补齐坐标）求和的实际边缘概率。**独立重置是本应用明确采用的模型与采样前提**：两次完整制备和测量的输出 $Y_1,Y_2$ 服从

$$
\Pr_-(Y_1=y,Y_2=z)=p(y)p(z).
$$

两份相同的边缘分布本身不蕴含这个联合律；例如让第二个结果总是复制第一个，边缘仍可相同而联合律通常不同。保留未重置的工作寄存器或允许任意相关重复，也不能直接套用这里的乘积律。由平方范数的非负性与 [@thm-shor-distribution-normalized]，

$$
p(y)p(z)\ge0,\qquad
\sum_{y,z\in\mathrm{Fin}\,Q}p(y)p(z)
=\left(\sum_y p(y)\right)\left(\sum_z p(z)\right)=1.
$$

**解码只看两个观察整数。** 定义分母列表与全配对列表

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

源码写法分别为 `(candidates y.val Q N).map Rat.den` 与 `(D y).flatMap (fun d => (D z).map (fun e => Nat.lcm d e))`：依次取第一份列表的每个 $d$，列出它与第二份列表全部 $e$ 的最小公倍数，再把这些小列表接起来。计算只使用 $y,z,Q,N$，既不接收未知 $r$，也不接收潜在相位指标。定义成功事件

$$
E_2(y,z)\ \Longleftrightarrow\ r\in L(y,z),\qquad
\Pr_-^{(2)}(E_2)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}\,p(y)p(z).
$$

指示函数 $\mathbf1_{E_2(y,z)}$ 在成员资格成立时为 $1$，否则为 $0$。同一观察对只计一次，哪怕候选列表含重复项，或者有好几对候选分母都给出 $r$。未知真阶只用于数学上判断成功，不用于构造列表。以下逐步得到

$$
\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
$$

**条件恢复：两份分母分别丢掉了什么？** 对每个 $s,t\in\mathrm{Fin}\,r$，前文的最近整数构造分别给出 $y_s,y_t\in\mathrm{Fin}\,Q$，满足针对 $s.\operatorname{val}/r$ 与 $t.\operatorname{val}/r$ 的 $\operatorname{Nearest}$ 条件。具体说，把 $Qs.\operatorname{val}/r$ 四舍五入到某个整数 $m$，误差至多 $1/2$；$r<Q$ 保证 $0\le m<Q$。这只要求最近标号存在，包含零相位和中点两侧的非严格并列选择。

[@thm-shor-nearest-candidate] 分别把两个约分相位放入对应候选列表；原有的 [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) 给出被指定的两个分母

$$
d_s=\frac r{\gcd(s.\operatorname{val},r)}\in D(y_s),\qquad
d_t=\frac r{\gcd(t.\operatorname{val},r)}\in D(y_t).
$$

两个最大公因数都整除 $r$。应用 `Nat.div_lcm_eq_div_gcd` 与 `Nat.gcd_gcd_gcd_right`，得到精确恒等式

$$
\operatorname{lcm}(d_s,d_t)
=\frac r{\gcd\bigl(\gcd(s.\operatorname{val},t.\operatorname{val}),r\bigr)}.
$$

因此，只要相位对是**联合本原的**，即 $\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1$，便有 $r\in L(y_s,y_t)$。它不要求两个分子各自与 $r$ 互素，也不说明其他候选分母都整除 $r$。

例如取实际模数 $N=13$、底数 $a=4$、工作宽度 $w=4$、$Q=256$；真阶是 $r=6$。对相位分子 $s=2,t=3$，最近观察可取 $y=85,z=128$，误差分别为 $1/768\le1/512$ 与 $0$。直接按可观察输入计算，

$$
\begin{aligned}
\operatorname{candidates}(85,256,13)&=[0,1/3],& D(85)&=[1,3],\\
\operatorname{candidates}(128,256,13)&=[0,1/2],& D(128)&=[1,2],\\
L(85,128)&=[1,2,3,6].
\end{aligned}
$$

这里 $\gcd(2,6)=2$、$\gcd(3,6)=3$，两份被恢复的分母分别为 $3$ 与 $2$，单独都不是真阶，最小公倍数却是 $6$。相位和真阶解释了这个观察对为什么成功；实际列举列表时并未使用它们。本例只是确定性的手算，不以这一个观察对的概率代替整个事件的概率。

**联合本原相位对至少占一半。** 令

$$
H_r=\#\{(s,t)\in\mathrm{Fin}\,r\times\mathrm{Fin}\,r:
\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1\}.
$$

若一对不满足这个条件，便有某个素数 $p\mid r$ 同时整除两个分子。对每个这样的 $p$，把 $p\mid s.\operatorname{val}$ 的标号送到 $s.\operatorname{val}/p$，得到到 $\mathrm{Fin}(r/p)$ 的单射；这里 $p\mid r$，整数除法没有余数。零分子也在这个集合中。因此，同时被 $p$ 整除的有序相位对至多有 $(r/p)^2$ 个。对不同素数取并集上界，得到

$$
\begin{aligned}
r^2-H_r&\le\sum_{p\in\operatorname{primeFactors}(r)}(r/p)^2,\\
\frac{r^2-H_r}{r^2}&\le
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}.
\end{aligned}
$$

这里按不同素因子求和，重复素因子不重复计数；不同坏集合重叠只会使这个上界更宽松。比值在转为实数后计算。

为控制最后的和，先分出 $2,3,5$；其余素因子都是至少 $7$、至多 $r$ 的奇数，所以属于 $\{7+2k:0\le k<r\}$。使用原有的有限尾和估计 [`reciprocal_square_shifted_finite_tail_le`](lean:D5/S3/Quantum/QPECircularTail.reciprocal_square_shifted_finite_tail_le)：对任意实数 $b>0$、任意 $m\in\mathbb N$，

$$
\sum_{k=0}^{m-1}\frac1{(b+k)^2}\le\frac1{b^2}+\frac1b.
$$

它保留完整的正性假设与整个倒平方数列。其机制是先保留首项，再用

$$
\frac1{(x+1)^2}\le\frac1x-\frac1{x+1}\qquad(x>0)
$$

控制余项；有限望远镜和的末端倒数非负，丢掉后得到所示上界。$m=0$ 时左边是空和。取 $b=7/2,m=r$，便有

$$
\begin{aligned}
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}
&\le\frac14+\frac19+\frac1{25}
 +\frac14\sum_{k=0}^{r-1}\frac1{(7/2+k)^2}\\
&\le\frac14+\frac19+\frac1{25}
 +\frac14\left(\frac4{49}+\frac27\right)\\
&=\frac{21739}{44100}<\frac12.
\end{aligned}
$$

好坏相位对合计为 $r^2$，所以充分得到 $2H_r\ge r^2$。这里只需要这个半密度界。理想独立均匀相位模型中的精确密度 $\prod_{p\mid r}(1-p^{-2})$ 是另一个文献量；上述并集估计没有证明那条精确乘积公式，也没有把它认作有限时钟的实际候选事件概率。这些标准计数与尾和的组合不承担数学原创性的主张。

**先固定相位对，界定整个事件的分量质量。** 沿用 $k(s,y)=p_Q(s.\operatorname{val}/r,y)$ 与 $A=4/\pi^2$，对固定的 $(s,t)$ 定义

$$
\begin{aligned}
K_{s,t}(y,z)&=k(s,y)k(t,z)\ge0,\\
M_{s,t}&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}K_{s,t}(y,z).
\end{aligned}
$$

若 $(s,t)$ 联合本原，上面的条件恢复给出 $E_2(y_s,y_t)$。[@thm-qpe-arbitrary-phase-lower-bound] 在实际模乘相位上的[特化](lean:D5/S3/Quantum/ShorCountingMarginal.shor_phase_accuracy_bound) 给出 $k(s,y_s)\ge A$、$k(t,y_t)\ge A$。其余被求和的项非负，故

$$
\begin{aligned}
M_{s,t}&\ge K_{s,t}(y_s,y_t)\ge A^2
&&\text{若 }\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1,\\
M_{s,t}&\ge0&&\text{对其余相位对}.
\end{aligned}
$$

这是一个固定分量中**整个成员事件**的质量下界，不能换成把不同潜在相位对应的实际观察点概率反复相加。

**再展开实际乘积律，按 $1/r^2$ 合并。** 由 [@thm-shor-qpe-probability-mixture]，每个实际边缘都是 $p(y)=r^{-1}\sum_s k(s,y)$。在已经明确采用的独立重置律下，

$$
\begin{aligned}
p(y)p(z)&=\frac1{r^2}
\sum_{s,t\in\mathrm{Fin}\,r}K_{s,t}(y,z),\\
\Pr_-^{(2)}(E_2)
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}
\sum_{y,z\in\mathrm{Fin}\,Q}\mathbf1_{E_2(y,z)}K_{s,t}(y,z)\\
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}M_{s,t}\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

第二行只交换有限求和。潜在相位对是实际乘积分布的谱展开指标，不是解码输入，也不是额外测量的随机变量。即使不同相位对选到了同一观察对，该观察对始终只有一个指示函数；被展开的是它自身的实际质量。因此候选重复和最近标号碰撞都不会把事件重复计数。

**正指数与原生正指数电路：同一受控态，两个标号都反射。** 保留同一个实际傅里叶变换前的受控态

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}.
$$

对每个工作坐标 $u$，令 $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$；这里 $\operatorname{QFT}$ 就是本章的正指数 $\mathcal F_+$。把前文 $\rho$ 的同一个标号反射记为 $\nu$：

$$
\begin{aligned}
e&=(\operatorname{ZMod.finEquiv}\,Q).\operatorname{toEquiv},&
\nu(y)&=e^{-1}(-e(y)),\\
\nu(0)&=0,&\nu(\nu(y))&=y,\\
\nu(y).\operatorname{val}
&=\begin{cases}0,&y=0,\\Q-y.\operatorname{val},&y\ne0.\end{cases}
\end{aligned}
$$

零分支不可省略：标号 $0$ 的反射仍为 $0$，不能把超出 $\mathrm{Fin}\,Q$ 的整数 $Q$ 当成结果。对同一 $V$ 的每个列向量，正指数核等于反射标号处的负指数核。非零分支中，两者的相位相差整数频率 $k.\operatorname{val}$；零分支直接相等。这正是原有 `phase_conj` 与 `phase_shift_int` 的应用，给出整个工作向量的精确等式

$$
A_+(y)=A_-(\nu(y)).
$$

这不是只比较轨道上某一个振幅。定义 $p_+(y)=\operatorname{normSquared}(A_+(y))$，对完整工作载体求平方模和便有

$$
p_+(y)=p(\nu(y))\ge0,\qquad
\sum_y p_+(y)=\sum_y p(\nu(y))=1.
$$

最后一步按对合置换 $\nu$ 重排求和。对于任意观察对谓词 $F$，按两个坐标的乘积置换重排得到

$$
\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(\nu(y),\nu(z))}p_+(y)p_+(z)
=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p(y)p(z).
$$

所以，两次正指数实验同样明确假设独立重置、联合质量为 $p_+(y)p_+(z)$ 时，正确的成功事件与下界是

$$
\begin{aligned}
E_{2,+}(y,z)&\ \Longleftrightarrow\ r\in L(\nu(y),\nu(z)),\\
\Pr_+^{(2)}(E_{2,+})&=\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

这个正指数乘积律也非负且归一化。两个观察标号都要先反射，再送入候选计算；这里不对未反射的正指数事件 $r\in L(y,z)$ 宣称同一下界。整个论证反射的是实际观察值，不假设某个最近标号选择规则在反射下等变。

[@thm-qft-circuit-action] 还把同一结论接到实际原生正指数电路。对任意 `OracleModel` 及其 `Interpretation`，令 $M_n$ 为 `Source.circuit oracles n` 经该解释的 `onBinaryLabels` 矩阵。所引声明在每个向量上把 $M_n$ 的作用等同于 $\operatorname{QFT}\,Q$，因此逐个作用于同一实际受控态的列 $k\mapsto V(k)(u)$，得到

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

对全部 $u$ 求平方模和，便是同一个 $p_+$；归一化、双坐标反射的事件等式与两次独立重置下的 $8/\pi^4$ 下界随之适用。这没有更换受控模乘、工作输入或傅里叶变换前的联合态。

**边界情形与所获结论。** 恢复只要求既定的 $N^2\le2^n$，不要求 $r\mid Q$。$r=1$ 时唯一相位对是 $(0,0)$，它联合本原，$H_1=1$，素因子集合为空；两次实际结果都是 $0$，$D(0)=[1]$，$L(0,0)=[1]$，实际成功概率为 $1$。对任意 $r>0$，零分子、一个或两个零观察标号以及重复素因子都没有从定义中删去；例如 $s=0$ 时被指定的约分分母为 $1$。两侧中点并列均适用，不要求最近标号唯一。反射和原生电路等式本身包含 $n=0,Q=1$；恢复的 $N\ge2,N^2\le Q$ 则已排除 $n=0,1$。有限尾和估计在求和范围为空时同样成立。

这个组合应用保证的恰是：在同一实际模乘模型的两次独立重置采样下，从两个观察值生成的完整全配对列表包含共同真阶的概率至少为 $8/\pi^4$。它没有给出从完整候选最小公倍数列表中认证精确阶的选择器，也没有认证把整份列表的所有项一起取最小公倍数就等于真阶；其他候选仍可能混入额外因子。任意相关重复、高效均匀单位采样、递归素因子分解、位或门复杂度、硬件表现均不由此给出。下文均匀单位群中的 Good 比例与同事件双侧 gcd 提取属于另一种抽样；若没有明确的共同联合律，不能把它与这里的量子事件概率直接相乘。

连分数候选与列表长度结论取自所钉源码的 `ShorContinuedFractions`、`FiniteRationalConvergents` 与 `FiniteRationalConvergentsLength`；有理列表与长度证明由 aicyberg 提供，模块保留供给源 *Finite-register phase estimation and spectral Shor order finding*（[solanaqubits/leanbook，固定版本](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)）的来源与 Apache 2.0 许可。来源审计 [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) 仍为三项已验证、一项未完成：更一般的时钟结论与独立理想采样乘积律没有因本节的模数界特化而一并解决。此前实际边缘分布的独立来源审计 [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) 仍为三项已验证、五十九项未完成。这些审计状态描述覆盖范围，不是否定上述数学证明。上述单次列表成员事件的下界由条件成员资格、实际混合与互素计数组合得到；两次全配对列表事件则在显式独立重置前提下使用联合本原相位对的充分半密度界。下文另从有限循环群计数推导均匀单位底数的 Good 比例与同事件双侧因子证书。独立性始终是采样前提；任意相关重复、逐次精确性认证、经典位复杂度、完整量子门复杂度与硬件表现仍须保留 [@rem-grover-qft-shor-literature] 的边界。

**应用：只凭观察列表，选出通过检验的最小指数。** 前一应用把两份分母补成一张有限菜单，并给出了“真阶在菜单里”的概率下界。现在给这张菜单加一道确定的选择规则：先逐项做模幂检验，再在通过者中取最小值。下面沿用 `ShorContinuedFractions` 源文的选择器应用，用既有列表性质与乘法阶性质给出书面推导。

对任意自然数 $a,N$ 与任意有限自然数列表 $L$，约定

```text
select a N L =
  List.argmin id
    (L.filter (fun d => decide (0 < d ∧ Nat.powMod a d N = 1)))
```

这是既有函数的组合：`filter` 保留正的、模幂检验通过的指数，`List.argmin id` 返回其中数值最小的 `some m`；若过滤后为空，返回 `none`。输入只有 $a,N,L$，没有未知真阶 $r$、潜在相位或“本次是否精确”的标志。列表的顺序、重复项与空列表都保留在定义域内，不先改成集合，也不假定列表里每项都整除真阶。

**先把可执行检验接到实际乘法阶。** 要解释输出的阶意义，固定任意实际参数记录 $c:\operatorname{QuantumShorOrderFindingCore.Parameters}$，取

$$
\begin{aligned}
a&=c.\operatorname{base},&N&=c.\operatorname{modulus}\ge2,\\
r&=c.\operatorname{period}
=\operatorname{orderOf}(a:\operatorname{ZMod}N)>0.
\end{aligned}
$$

记录还给出 $\gcd(a,N)=1$ 与容纳模数的工作宽度；因此这里的 $r$ 是同一个底数、同一个模数的实际阶。以下列表论证与计数宽度、分辨率及 $L$ 的来历无关。由 `Nat.powMod_def`，检验计算的是自然数余数 $a^d\bmod N$。由于 $1<N$，余数 $1$ 正是标准代表元；`ZMod.natCast_eq_natCast_iff'` 与 `Nat.cast_pow` 给出

$$
\operatorname{Nat.powMod}(a,d,N)=1
\quad\Longleftrightarrow\quad
(a:\operatorname{ZMod}N)^d=1.
$$

记过滤后的列表为 $S$。若 $\operatorname{select}(a,N,L)=\operatorname{some}(m)$，`List.argmin_mem` 把 $m$ 放进 $S$，于是

$$
m\in L,\qquad m>0,\qquad
\operatorname{Nat.powMod}(a,m,N)=1,\qquad r\mid m.
$$

最后一项来自 `orderOf_dvd_of_pow_eq_one`。对每个 $d\in L$，若 $d>0$ 且模幂检验通过，则 $d\in S$；`List.le_of_mem_argmin` 因而给出

$$
\forall d\in L,\quad
\bigl(d>0\ \land\ \operatorname{Nat.powMod}(a,d,N)=1\bigr)
\ \Longrightarrow\ m\le d.
$$

这是**给定列表内通过者的最小性**。任何正的通过指数都是 $r$ 的正倍数，所以 $r\le m$；也可直接用 `orderOf_le_of_pow_eq_one` 得到这个不等式。未通过的项不参加比较，未出现的指数不被搜索。返回值由此认证正性、通过性、列表成员资格、列表内最小性以及 $r\mid m$；它本身没有给出 $m=r$ 的识别标志，也没有搜索列表之外更小的正返回指数。

**真阶在菜单里，当且仅当选择器返回真阶。** 对上述每个实际 $c$ 与每个有限 $L$，有精确对应

$$
\operatorname{select}(a,N,L)=\operatorname{some}(r)
\quad\Longleftrightarrow\quad r\in L.
$$

先看从左到右：返回的 $r$ 属于过滤列表 $S$，自然也属于原列表 $L$。

再看从右到左。若 $r\in L$，则 $r>0$ 且 $(a:\operatorname{ZMod}N)^r=1$，所以模幂检验通过，$r\in S$。`List.argmin_eq_none` 说明仅当 $S=[]$ 才会返回 `none`；这里 $S$ 非空，故返回某个 `some m`。这个 $m$ 是正的通过指数，由阶的性质有 $r\le m$；另一方面，$r$ 本身是列表中的通过项，最小值性质给出 $m\le r$。两个不等式夹住同一个数，迫使 $m=r$。这里连接的是两个最小值：$r$ 是所有正返回指数的最小值，$m$ 是菜单内正返回指数的最小值；$r\in L$ 使它们重合。

失败返回也有完整的等价式：

$$
\operatorname{select}(a,N,L)=\operatorname{none}
\quad\Longleftrightarrow\quad
\forall d\in L,\ \neg\bigl(d>0\ \land\
\operatorname{Nat.powMod}(a,d,N)=1\bigr).
$$

因为 `argmin` 返回 `none` 当且仅当 $S$ 为空，而过滤列表为空当且仅当原列表没有正的通过项。`none` 报告这份菜单失败；在实际参数记录下，真阶仍然存在。空列表直接返回 `none`，零指数被正性条件排除；重复的通过项仍是重复项。`argmin` 对并列最小值保留先出现者，但这里分数函数是自然数上的 `id`，并列者就是同一个指数值，所以不影响上述契约。$r=1$ 也包括在内。

**把成员概率逐项改写成精确输出概率。** 回到前一应用的同一个实际 $c$ 与同一个计数宽度 $n$，保持 $Q=2^n$、$N^2\le Q$。两次仍使用同一个 $c.\operatorname{modularOperator}$、同一个 $c.\operatorname{input}=|1\rangle$ 和同样的完整工作载体，包括补齐坐标。为明确选择器读到什么，重写前面的列表定义：

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

也就是 `(D y).flatMap (fun d => (D z).map (Nat.lcm d))`，保留所有配对及重复值。定义精确输出事件

$$
X_2(y,z)\ \Longleftrightarrow\
\operatorname{select}(a,N,L(y,z))=\operatorname{some}(r).
$$

通用列表契约逐点给出 $X_2(y,z)\Longleftrightarrow E_2(y,z)$，其中 $E_2(y,z)$ 仍是 $r\in L(y,z)$。选择过程从观察整数构造菜单并执行检验，未知 $r$ 只出现在数学上的成功谓词中。

令 $p_-(y)=p(y)=\operatorname{normSquared}(A_-(y))$。继续明确假设两次完整制备与测量独立重置，联合质量为 $p_-(y)p_-(z)$。这个乘积非负，总和为 $1$。对任意事件 $F$，以

$$
\Pr_-^{(2)}(F)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p_-(y)p_-(z)
$$

定义其概率。由于 $X_2$ 与 $E_2$ 的指示函数在每个观察对上相等，有限和中的每项都不变，故

$$
\begin{aligned}
\Pr_-^{(2)}(X_2)&=\Pr_-^{(2)}(E_2)\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

下界仍来自上面的实际相位混合、每个联合本原分量中的整个事件质量与 $2H_r\ge r^2$。没有另加独立抽取潜在相位的实验，也无需把最近标号的见证选成单射。一个观察对无论产生多少个 $r$、多少对成功分母，都只有一个精确输出指示函数。分辨率、工作补齐和实际输入均未改变，仍不要求 $r\mid Q$；一个或两个零观察标号同样适用。

**原生正指数电路：先反射两个观察值，再选择。** 使用前面同一个

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}
$$

以及 $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$、$p_+(y)=\operatorname{normSquared}(A_+(y))$。反射仍为通过 $\operatorname{ZMod.finEquiv}\,Q$ 实现的取负对合 $\nu$，包含 $\nu(0)=0$ 与 $\nu(\nu(y))=y$。同一受控态上的完整工作向量等式给出

$$
A_+(y)=A_-(\nu(y)),\qquad p_+(y)=p_-(\nu(y)).
$$

因此应定义

$$
X_{2,+}(y,z)\ \Longleftrightarrow\
\operatorname{select}\bigl(a,N,L(\nu(y),\nu(z))\bigr)=\operatorname{some}(r).
$$

两个标号都先反射，零标号仍送到零。两次正指数实验也明确采用独立重置律 $p_+(y)p_+(z)$。按对合置换 $(y,z)\mapsto(\nu(y),\nu(z))$ 重排有限和，得到

$$
\begin{aligned}
\Pr_+^{(2)}(X_{2,+})
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(\nu(y),\nu(z))}p_+(y)p_+(z)\\
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(y,z)}p_-(y)p_-(z)\\
&=\Pr_-^{(2)}(X_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

[@thm-qft-circuit-action] 对任意 `OracleModel` 及其 `Interpretation`，把原生正指数电路的 `onBinaryLabels` 矩阵 $M_n$ 作用于同一个列向量 $k\mapsto V(k)(u)$ 的结果等同于 $\operatorname{QFT}\,Q$。因而逐个工作坐标有

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

对完整载体求平方模和便是同一个 $p_+$，所以上述反射后的选择事件适用于这同一原生电路。这个概率等式依靠双坐标对合重排；它没有给未反射的正指数菜单 $L(y,z)$ 同一下界。未重置目标、相关重复或未指定的相关态也不能借用这里的乘积律。

**菜单里没有真阶，取最小值也补不出来。** 做一个有限的确定性计算。取

$$
N=21,\qquad a=2,\qquad Q=512,\qquad y=z=43.
$$

这里 $21^2=441\le512$。有理数 $43/512$ 的欧几里得展开依次用到

$$
\begin{aligned}
512&=11\cdot43+39,\\
43&=1\cdot39+4,\\
39&=9\cdot4+3,\\
4&=1\cdot3+1.
\end{aligned}
$$

最后 $3=3\cdot1$；相应全列表为 $[0,1/11,1/12,10/119,11/131,43/512]$。按分母严格小于 $21$ 过滤，得到

$$
\begin{aligned}
\operatorname{candidates}(43,512,21)&=[0,1/11,1/12],\\
D(43)&=[1,11,12],\\
L(43,43)&=[1,11,12,11,11,132,12,132,12].
\end{aligned}
$$

最后一行逐行拼接 $[1,11,12]$、$[11,11,132]$ 与 $[12,132,12]$，没有去重。模 $21$ 的前六个正幂余数是

$$
2,\ 4,\ 8,\ 16,\ 11,\ 1,
$$

所以真阶是 $r=6$。菜单中的不同数值 $1,11,12,132$ 的模幂余数分别为 $2,11,1,1$；正的通过项最小值是 $12$，故

$$
\operatorname{select}(2,21,L(43,43))=\operatorname{some}(12),\qquad
\operatorname{Nat.powMod}(2,12,21)=1.
$$

真阶 $6$ 根本不在这份菜单里，返回值仍是它的两倍。这个算例只说明给定整数上的候选计算与选择结果；这里没有断言观察对 $(43,43)$ 在实际量子实验中具有正概率。

若把返回的 $12$ 直接冒充真阶，半指数会变成 $12/2=6$；真正的半阶却是 $6/2=3$。两者给出不同余数：

$$
2^{12/2}\bmod21=1,\qquad
2^{6/2}\bmod21=8.
$$

前者给出的两个 gcd 是 $\gcd(63,21)=21$、$\gcd(65,21)=1$，后者则是 $\gcd(7,21)=7$、$\gcd(9,21)=3$。模幂检验通过，不能替换下文经典因子提取中的真阶前提。全配对也不保证补出菜单缺失的真阶；列表内最小化的精确性来自“真阶一旦在场就会被选中”，并非每份菜单都完整。

**概率保证与逐次证书。** 在明确的实际输入、分辨率及独立重置律下，返回值等于真阶的概率至少为 $8/\pi^4$。这是有界错误的精确输出概率保证。一次 `some m` 没有附带识别本次是否精确的标志；它可能是较大的正倍数，`none` 则只表示没有正的通过菜单项。这里没有得到每次返回都认证精确、每次失败都可识别的 Las Vegas 过程。仅仅重复这种返回也没有给出精确性证书；本应用不据此宣称成功概率的放大。

若另有额外资源，可以检验精确性。既有 `orderOf_eq_of_pow_and_pow_div_prime` 说：对正的通过指数 $m$，若每个素因子 $p\mid m$ 都满足

$$
(a:\operatorname{ZMod}N)^{m/p}\ne1
\quad\Longleftrightarrow\quad
\operatorname{Nat.powMod}(a,m/p,N)\ne1
$$

则 $\operatorname{orderOf}(a:\operatorname{ZMod}N)=m$。机制也可直接看见：已知 $r\mid m$，写 $m=rk$；若 $k>1$，取某个素因子 $p\mid k$，则 $r\mid m/p$，该素数除法检验必返回 $1$，与要求矛盾。所以只能 $k=1$。要把这些检验作为有限证书使用，必须有 $m$ 的**完整且经过核验的素因子分解**，足以穷尽全部不同素因子；只试几个素数不够。$m=1$ 时素因子检验为空，正的通过性本身已迫使真阶为 $1$。取得完整分解与核验给定分解是两项不同任务，选择器并不提供前者；这里没有声称能高效取得这些因子。

取阶倍数中的最小值这一思路，可直接参见 Ekerå，*On the success probability of quantum order finding*，[arXiv:2201.07791v2，§4.1.7](https://arxiv.org/html/2201.07791v2#S4.SS1.SSS7)：当处理后的值全是正的阶倍数，且至少一个就是真阶，最小值便是真阶。这里引用的是这个最小值论证；该文的偏移搜索与基于光滑性的处理不同于本节的全配对菜单，它们的算法与性能估计不随这条引用转移。

有限列表和可执行模幂检验给出了一项明确的计算。前面的对数长度界只数渐近分数项或欧几里得阶段，不自动涵盖全部递归列表操作与有理数运算的位代价；这里也没有端到端位复杂度、量子门复杂度、高效完整因子获取、递归分解或硬件表现的结论。精确输出事件针对固定实际底数的计数观察，下文的经典 Good 事件则针对另一个单位群抽样律。把二者放在同一概率计算中，仍须先指定共同的联合采样构造。

::: {.viz src="phase-gears" preset="leak" height="500"}
**不整除时峰摊开。** $Q = 64$、周期 $6$：品红的 $sQ/r$ 落在 $10.67$、$21.33$ 等整数之间，峰摊到相邻的格，$k = 11$ 高 $0.115$、$k = 10$ 只有 $0.026$，离 $sQ/r$ 最近的六格合计 $0.80$；琥珀色框住的 $k = 11$ 用连分数读出 $\frac{1}{6}$。本卡没有指定实际模数与底数，不能据此核对 $N^2\le Q$，所以这里的集中与读数保持教学数值演示的身份；上述条件成员定理不认证本卡“取最后一个渐近分数”的读法，也不把这些条件梳子的峰高认作实际边缘概率。
:::
