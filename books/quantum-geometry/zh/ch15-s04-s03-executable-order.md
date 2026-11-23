# K.3 可执行取阶与因子证书 {#sec-ch15-s04-s03-executable-order}

**应用：反复减半，保住同一底数的半阶幂。** 前面的 $12$ 已通过模幂检验，却把半阶幂压成了 $1$。我们可以继续问一个更小的问题：若把当前指数减半，同一个底数是否仍回到 $1$？若是，就减半再问；若否，就停下。这一步不需要先认出真阶，也不需要取得指数的完整素因子分解。它去掉的是返回指数中多余的因子 $2$；留下的奇数倍数仍可能大于真阶。

先把规则写在最一般的范围内。取任意宇宙中的类型 $G:\operatorname{Type}\,u$，只要求 $G$ 是幺半群且相等性可判定，即 `Monoid G` 与 `DecidableEq G`。给定 $x\in G$ 与自然数 $m$，定义

```text
stripTwos x m =
  if 0 < m ∧ m % 2 = 0 ∧ x ^ (m / 2) = 1
  then stripTwos x (m / 2)
  else m
```

这里的除法是自然数整除取商，三个条件必须同时成立才递归；否则原样返回当前指数。输入只有 $x,m$，未知的 $r=\operatorname{orderOf}(x)$ 不在输入中。幺半群只需结合律与单位元，不要求它是群、有限、交换或满足消去律；实际执行还需要可计算的乘法、单位元与相等性检验。每次递归都有 $0<m/2<m$：正的偶数至少为 $2$，而除以 $2$ 严格减小正自然数。因此自然数度量 $m$ 保证终止。$m=0$ 时首个条件为假，直接返回 $0$；终止性本身没有给出位运算或门复杂度。

::: {.theorem #thm-shor-verified-multiple-halving title="正返回指数的可执行减半" lean="D5/S3/FiniteGroups/Cyclic/VerifiedMultipleHalving.stripTwos_correct"}
取任意幺半群 $G:\operatorname{Type}\,u$，且相等性可判定。对 $x\in G$ 与 $m\in\mathbb N$，假设 $m>0$ 且 $x^m=1$，令 $M=\operatorname{stripTwos}(x,m)$、$r=\operatorname{orderOf}(x)$。则同时有

1. $M>0$；
2. $M\mid m$；
3. $x^M=1$；
4. 存在实际的自然数 $k$，使 $m=2^kM$；
5. $M/r$ 是奇数；
6. 若 $r$ 为偶数，则 $M$ 也是偶数，且 $x^{M/2}=x^{r/2}$；
7. 若 $r$ 为奇数，则 $M$ 也是奇数。
:::

这里的 $r$ 自动为正：由正的返回指数及 `orderOf_dvd_iff_pow_eq_one`，有 $r\mid m$，而 $0$ 不能整除正数。第三项同样给出 $r\mid M$，所以第五项的自然数商确实满足 $M=r(M/r)$；不是对非整除情形取下整后的断言。零输入虽然有定义，却不在这份正确性陈述中：每个元素都满足 $x^0=1$，包括没有正返回指数、`orderOf` 约定为 $0$ 的无限阶元素，因而不能从零次幂推出正阶。

::: proof
对当前正指数 $n$ 作强归纳，并同时保留四件事：输出为正、$n$ 是输出的某个 $2$ 的幂倍数、输出仍使 $x$ 返回 $1$、输出除以 $r$ 的商为奇数。继续分支把问题交给更小的 $n/2$，而不是继续对固定的原始 $m$ 作同一假设。若递归所得等式为 $n/2=2^kM$，守卫的偶性给出

$$
n=2(n/2)=2\cdot2^kM=2^{k+1}M.
$$

因此每次成功减半都把见证 $k$ 增加 $1$；终止分支取 $k=0$。这给出了第四项中真实的自然数见证，也给出第二项的整除关系；正性与返回性则由递归前提一路保留。

终止时输出就是当前的正数 $n$，且 $x^n=1$。已知 $r\mid n$；若商是偶数，写 $n/r=2j$，便有

$$
n=2rj,\qquad n/2=rj,\qquad
x^{n/2}=(x^r)^j=1.
$$

这样正性、偶性与半指数返回性三个条件全部成立，与在这里停止矛盾。所以终止商必为奇数。这是通常的阶整除与奇偶性论证；相应的终止性质也见 `SymbolicQuantum/Shor/ReductionLemmas.lean` 中的 `div_orderOf_odd_of_pow_ne_one`，不主张它是新的数学事实。

最后写 $M/r=2t+1$。若 $r$ 为偶数，$M=r(2t+1)$ 为偶数，自然数除法给出

$$
\begin{aligned}
M/2&=rt+r/2,\\
x^{M/2}&=x^{rt}x^{r/2}
=(x^r)^t x^{r/2}=x^{r/2}.
\end{aligned}
$$

若 $r$ 为奇数，$M=r(2t+1)$ 就是两个奇数的乘积，也为奇数。所用幂全部属于同一个元素，无须交换不同元素，更无须消去律。完整证明由 Lean 内核检查。
:::

**接回选择器时，底数不能换。** 固定前面同一个实际参数记录 $c$，保持 $a=c.\operatorname{base}$、$N=c.\operatorname{modulus}\ge2$ 与 $x=(a:\operatorname{ZMod}N)$。一次 `select a N L = some m` 已给出 $m>0$ 和 `Nat.powMod a m N = 1`。先前的 `Nat.powMod_def`、`Nat.cast_pow` 与剩余类转换恰把它接成 $x^m=1$，于是七项性质适用于这个 $x,m$。实际模运算可直接按下面的自然数版本执行；输入约定为 $a,m\in\mathbb N$、$N\ge2$，Python 的 `pow(a,e,N)` 计算 $a^e\bmod N$：

```python
def strip_twos_mod(a, m, N):
    while 0 < m and m % 2 == 0 and pow(a, m // 2, N) == 1:
        m = m // 2
    return m
```

这只是把同一个守卫写成模幂计算。`none` 仍是菜单没有正的通过项；它没有提供可减半的正指数。过程始终检验原底数的幂，不重新抽底数，不更换受控模乘、原生正指数电路、工作输入 $|1\rangle$ 或补齐后的目标载体；正指数实验仍先反射两个观察标号再构造原菜单。

若选择器恰好返回真阶 $m=r$，减半不会改变它：$r$ 为奇数时偶性条件失败；$r$ 为偶数时 $0<r/2<r$，真阶的最小性排除 $x^{r/2}=1$，所以守卫也失败。故 `stripTwos x r = r`。先前的精确选择事件因此包含在减半后精确输出的事件中，后者的概率仍至少为 $8/\pi^4$；这里仍采用先前同一个独立重置律，没有引入新的联合抽样。它也可能在此前未精确的返回上得到真阶，但不为每次输出提供精确性标志。

回到 $N=21,a=2,r=6$。输入 $12$ 时，$2^6\bmod21=1$，所以先减到 $6$；此时 $2^3\bmod21=8\ne1$，停止。输入 $132$ 时，先减到 $66$，因为 $2^{66}\bmod21=1$；随后 $2^{33}\bmod21=8\ne1$，停止。因此

$$
\begin{aligned}
\operatorname{stripTwos}(2:\operatorname{ZMod}21,12)&=6,\\
\operatorname{stripTwos}(2:\operatorname{ZMod}21,132)&=66,\\
66/6&=11,\qquad 2^{33}\bmod21=2^3\bmod21=8.
\end{aligned}
$$

两条路径都得到半幂余数 $8$，于是余数代表元给出的 gcd 是 $\gcd(8-1,21)=7$ 与 $\gcd(8+1,21)=3$。未经减半的 $12$ 的半幂余数却是 $1$，给出 $21$ 与 $1$。$132\mapsto66$ 保留奇数商 $11$，清楚说明得到正确半幂不等于取得精确阶；它也没有核验全部素因子，不能替代前面的完整素因子证书。

**保留半幂，仍须保留 Good 前提。** 这里的新接口只是 $x^{M/2}=x^{r/2}$（在 $r$ 为偶数时）。因子提取仍要求同一实际单位满足

$$
\operatorname{Good}(x)\ \Longleftrightarrow\
\operatorname{Even}(r)\ \land\ x^{r/2}\ne-1.
$$

此处将单位投到 $\operatorname{ZMod}N$ 来写幂，阶与单位群中的阶相同。真阶的最小性另排除半阶幂为 $1$。在下文 [@ex-shor-actual-unit-factors] 的条件 $N>2$、$\gcd(a,N)=1$ 下，已有真阶 Good 论证给出双侧真因子；半幂相等可以把该证书接到减半输出的同一剩余类。

减半定理给出的是幺半群中的幂相等。若要把它接到巨大自然数幂的 gcd，还须显式验证同余、自然数减法的正性条件与 gcd 不变性；不能把自然数幂与其标准余数写成相等。上述 $7$ 与 $3$ 是具体余数的直接计算，减半模块本身不陈述一般的自然数 gcd 转移或任何因子概率。

两个边界把这件事钉牢。$N=2,a=1,m=8$ 时依次为 $8\mapsto4\mapsto2\mapsto1$；真阶为 $1$，输出为奇数，没有偶半阶提取路线。$N=15,a=14,m=2$ 时 $14^1\equiv-1\ne1\pmod{15}$，所以输出仍为 $2$；阶虽为偶数，Good 的第二项失败，两个 gcd 是 $\gcd(13,15)=1$ 与 $\gcd(15,15)=15$。

这条同底数减半规则也不同于 Ekerå，*On completely factoring any integer efficiently in a single run of an order finding algorithm*，[arXiv:2007.10044，§3.2](https://arxiv.org/html/2007.10044)：那里另抽随机底数并沿平方链处理。这里只借文献划清算法边界，不移用其性能结论。终止性与上述确定性性质没有给出高效取得原始 $m$ 的方法、完整因子分解、精确阶证书、位或门复杂度、硬件成功率、任意相关重复的保证或 Las Vegas 结论，也不主张数学原创性。固定实际底数的量子乘积律与均匀单位的 Good 律仍是两种抽样；没有共同联合律及相应条件概率，就不能将两者的概率相乘。

**再往前一步：给齐原指数的素因子，就能剥到真阶。** 减半只去掉多余的因子 $2$，所以 $132$ 仍会留下 $66$。若另有一个有限列表，包含原始返回指数的每个素因子，就可以逐个反复试除。这份额外输入与前面只凭观察值生成的菜单不同：选择器并不替我们取得它。

对任意幺半群 $G:\operatorname{Type}\,u$、可判定相等性、元素 $x$ 和自然数 $p,m$，定义

```text
stripFactor x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m ∧ x ^ (m / p) = 1
  then stripFactor x p (m / p)
  else m

stripFactors x P m =
  P.foldl (fun n p => stripFactor x p n) m
```

每次成功试除都严格减小当前正指数，因为 $p>1$；不成功时返回当前值，再处理列表中的下一个数。输入只有 $x,P,m$，真阶不在输入中。列表按原顺序处理，不先去重，也不要求列表中的每项都是素数。

::: {.theorem #thm-shor-verified-prime-stripping title="原指数素因子覆盖下的可执行取阶" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct"}
取任意幺半群 $G:\operatorname{Type}\,u$，且相等性可判定。对 $x\in G$、有限自然数列表 $P$ 与 $m\in\mathbb N$，假设

$$
m>0,\qquad x^m=1,\qquad
\forall p\in\mathbb N,\quad
\bigl(p\text{ 为素数}\ \land\ p\mid m\bigr)\Longrightarrow p\in P.
$$

令 $M=\operatorname{stripFactors}(x,P,m)$，则

$$
M>0,\qquad M\mid m,\qquad x^M=1,\qquad M=\operatorname{orderOf}(x).
$$
:::

覆盖条件针对**原始输入 $m$**，要求每个素因子本身出现在 $P$ 中；它是正确性前提，不是函数另收取的证明参数。$P$ 可以重复，也可以额外含合数、$0$ 和 $1$。定理不要求群、有限性、交换性或消去律。$0$、$1$ 作为试除数时不触发递归；$m=0$ 则始终返回 $0$，但不属于上述正确性陈述。$m=1,P=[]$ 也包括在内。

::: proof
记 $r=\operatorname{orderOf}(x)$。正的返回指数保证 $r>0$ 且 $r\mid m$。先对单个试除数的实际递归作强归纳：若 $n>0$ 且 $x^n=1$，输出 $M$ 满足

$$
M>0,\qquad n=p^kM\text{（某个 }k\in\mathbb N\text{）},\qquad
x^M=1,
$$

而当 $p>1$ 时，还满足 $p\nmid M/r$。递归分支从 $n/p$ 的归纳结论与 $n=p(n/p)$ 得到分解，见证 $k$ 增加 $1$。终止分支若有 $M/r=pj$，则 $M=p(rj)$，从而 $p\mid M$ 且 $x^{M/p}=(x^r)^j=1$；四个递归条件全部成立，与停止矛盾。

再对列表作归纳。输出始终是原输入的正返回因子，且每个已处理的、超过 $1$ 的数都不整除当前输出除以 $r$ 的商。后续处理把某个返回指数 $A$ 换成返回因子 $B$；因为 $B\mid A$ 且 $r$ 整除二者，有 $B/r\mid A/r$。所以先前排除的因子不会在后面的商中重新出现。这一步同时处理重复项与额外合数。

最后，每个最终输出的素因子也整除原始 $m$，故必在 $P$ 中。若对最终输出除以这个素数后仍返回 $1$，阶整除性质便使该素数整除 $M/r$，与列表不变量矛盾。直接应用前述 `orderOf_eq_of_pow_and_pow_div_prime`，得到 $M=r$。这里证明的是实际递归与折叠的不变量；终端的阶判据沿用已有结果。完整证明由 Lean 内核检查。
:::

**同一选择器的返回，现在可以继续处理。** 若前面的 `select a N L = some m`，保持同一实际参数 $c$、$N\ge2$ 与 $x=(a:\operatorname{ZMod}N)$，返回契约给出 $m>0,x^m=1$。只要给出覆盖这个原始 $m$ 的列表 $P$，本定理就使 `stripFactors x P m` 等于同一底数的真阶；无需原菜单先含真阶。`none` 仍只说明没有正的通过项，没有可供本定理处理的正指数。对正指数原生电路，仍先反射两个观察标号，构造原菜单并选择，再处理同一个底数；本步骤不更换抽样律。

例如 $N=21,a=2$ 时，$m=12,P=[2,3]$ 得到 $6$；$m=132,P=[2,3,11]$ 也得到 $6$，消除了减半后剩下的奇数倍数 $11$。对单位元、$m=12$，列表 $[2,3]$ 得到 $1$，而 $[2]$ 得到 $3$，$[6]$ 得到 $2$。最后一个例子中，原指数的素因子 $2,3$ 虽都整除某个列表项 $6$，却没有作为项出现；这种“整除某个列表项”不足以替代定理的覆盖条件。

**实际调用多少次幂测试？** 保持原输入、原守卫与原输出，只给程序加一个计数分量。先检查算术条件 $1<p$、$0<m$、$p\mid m$；任一失败，本次不调用幂等式测试，计数为 $0$。全部通过时，调用一次接口 $x^{m/p}=1$，无论结果成功还是失败都计 $1$；成功才在同一个商 $m/p$ 上递归。相应的可计算数对定义为

```text
stripFactorCost x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m then
    if x ^ (m / p) = 1 then
      let r := stripFactorCost x p (m / p)
      (r.1, r.2 + 1)
    else (m, 1)
  else (m, 0)

stripFactorsCost x P m =
  P.foldl (fun r p =>
    let s := stripFactorCost x p r.1
    (s.1, r.2 + s.2)) (m, 0)
```

这里仍按原列表 $P$ 的原顺序折叠：第一分量传递当前指数，第二分量累加调用次数。记 $\Phi(n)=\operatorname{Nat.log}(2,n)$。对 $n>0$，它等于 $\lfloor\log_2 n\rfloor$；Lean 的全函数约定是 $\operatorname{Nat.log}(2,0)=0$。

::: {.theorem #thm-shor-prime-stripping-cost title="原输出不变与幂测试次数的对数界" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStrippingCost.stripFactorsCost_spec"}
对任意类型 $G:\operatorname{Type}\,u$ 上的幺半群结构与可判定相等性、任意元素 $x\in G$、任意有限自然数列表 $P$ 及任意 $m\in\mathbb N$，令

$$
(M,C)=\operatorname{stripFactorsCost}(x,P,m).
$$

则同时有

$$
\begin{aligned}
M&=\operatorname{stripFactors}(x,P,m),\\
C&\le P.\operatorname{length}+\operatorname{Nat.log}(2,m).
\end{aligned}
$$
:::

这个计数界不要求 $m>0$ 或 $x^m=1$，也不要求素因子覆盖、列表项为素数、列表无重复、有限幺半群、群结构或消去律。$m=0$ 时每项都在算术守卫处停止，返回 $(0,0)$；空列表返回 $(m,0)$。列表项 $0$、$1$ 不调用幂测试，其余任意自然数项按原守卫处理。前面的精确取阶定理仍需要原来的正性、返回条件与覆盖条件。

::: proof
第一分量的等式由对当前指数的强归纳得到：两个程序在完全相同的条件下停止，或在相同的 $m/p$ 上递归；再沿列表折叠即可。

对单个列表项，设输入为 $n$、输出为 $n'$、本项计数为 $c$，证明势能不等式

$$
c+\Phi(n')\le 1+\Phi(n).
$$

算术守卫失败时 $c=0,n'=n$；幂测试失败时 $c=1,n'=n$，两种终止分支都满足不等式。成功时 $p\ge2$ 且 $p\mid n$、$n>0$，故 $n\ge2$，并有

$$
\Phi(n/p)+1\le\Phi(n/2)+1=\Phi(n).
$$

因此这次成功测试消耗的 $1$ 由对数势能的下降支付，再应用商上的归纳结论。将单项不等式沿原列表相加，中间指数的势能逐项抵消，得到 $C+\Phi(M)\le P.\operatorname{length}+\Phi(m)$。去掉非负的末端势能就得到计数界。完整证明由 Lean 内核检查。
:::

例如仍取 $N=21,a=2,m=132,P=[2,3,11]$。实际测试的指数依次是 $66,33,22,6$，相应余数为 $1,8,16,1$。前后两次成功，中间两次失败也计入，所以返回数对为 $(6,4)$。最后 $11\nmid6$，只检查算术守卫，不增加幂测试次数。

反复试除的经典取阶算法见 Andrew V. Sutherland，MIT 18.783，Spring 2015，Lecture 8，§8.3，Algorithm 8.2，印刷页 3（[讲义](https://math.mit.edu/classes/18.783/2015/LectureNotes8.pdf)）。讲义从加法群中的返回倍数及其素因子分解出发；这里以乘法和单位元表述，并允许任意可判定幺半群及额外列表项，不主张算法原创性。上述计数定理是 trureturing 仓库对该经典算法的推导，不主张数学原创性。

这项条件算法没有提供取得 $P$ 的方法或高效完整因子分解。给定并核验覆盖后，正返回指数确实被处理成真阶；取得覆盖所需的信息仍是单独任务。上述对数界只计幂等式接口的调用，不计取得 $P$ 的成本、算术守卫的成本或模幂内部的乘法次数，也不给出运行时间、位复杂度、量子门复杂度或完整 Shor 复杂度。这里没有新的量子成功概率、均匀单位采样器、任意相关重复保证、硬件实现或完整递归整数分解结论。经典 Good 抽样与固定底数量子观察的概率仍须在明确的共同联合律下才可组合。

**从真阶到因子：哪些底数会失败？** 先看 $N=15$、$a=2$：模 $3$ 的阶为 $2$，模 $5$ 的阶为 $4$，全局真阶为 $r=\operatorname{lcm}(2,4)=4$。半阶幂 $2^2$ 在两个局部分量中分别为 $1$ 与 $-1$，所以在模 $15$ 下既非 $1$ 也非 $-1$。关键不是两个局部阶是否相等，而是它们各自含有多少个因子 $2$：这里是 $1$ 个与 $2$ 个。下面先数任意有限循环群族中的失败元组，再把同一个事件搬回实际单位群。

::: {.theorem #thm-half-order-family-failure-count title="有限循环群族的半阶失败计数" lean="D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.failure_count_le"}
对任意非空有限指标类型 $I$、任意群族 $(G_i)_{i\in I}$，若每个 $G_i$ 都是有限循环群，并给定 $\epsilon_i\in G_i$ 满足 $\operatorname{ord}(\epsilon_i)=2$，令

$$
\begin{aligned}
P&=\prod_{i\in I}G_i,\qquad k=|I|,\qquad \epsilon=(\epsilon_i)_{i\in I},\\
\operatorname{Good}_{\epsilon}(x)
&\Longleftrightarrow \operatorname{Even}(\operatorname{ord}(x))
\ \land\ x^{\operatorname{ord}(x)/2}\ne\epsilon,\\
\operatorname{Bad}&=\{x\in P:\neg\operatorname{Good}_{\epsilon}(x)\}.
\end{aligned}
$$

这里 $\operatorname{ord}$ 是群元素的真阶（Lean 的 `orderOf`），$/2$ 是自然数除法。则

$$
|\operatorname{Bad}|\,2^{k-1}\le |P|.
$$

各群的大小可以不同，乘积群 $P$ 无须循环；计数遍及全部元组，包括单位元与奇数阶元组，也包括 $k=1$ 的情形。
:::

::: proof
记 $d_i=\operatorname{ord}(x_i)>0$、$r=\operatorname{ord}(x)>0$，并以 $v_2(d)$ 表示正整数 $d$ 中素因子 $2$ 的指数，即 `d.factorization 2`。乘积中的阶是局部阶的最小公倍数，所以 $v_2(r)=\max_i v_2(d_i)$。

先在一个循环群内取阶为 $d$ 的元素 $z$，设 $M>0$ 为偶数且 $d\mid M$。$(z^{M/2})^2=1$；循环群只有一个阶为 $2$ 的元素 $\epsilon$，因而这个半幂只能是 $1$ 或 $\epsilon$。又有

$$
z^{M/2}=1\ \Longleftrightarrow\ d\mid M/2
\ \Longleftrightarrow\ 2d\mid M
\ \Longleftrightarrow\ v_2(d)<v_2(M).
$$

最后一步中，其余素因子的指数不等式已由 $d\mid M$ 保证。因此 $z^{M/2}=\epsilon$ 恰好等价于 $v_2(d)=v_2(M)$。把 $M=r$ 代入各坐标可知：偶数阶时，失败恰是所有 $v_2(d_i)$ 都达到同一个最大值；奇数阶时，它们全为 $0$，也失败。于是

$$
x\in\operatorname{Bad}\ \Longleftrightarrow\ \exists t\in\mathbb N,\ \forall i\in I,\ v_2(d_i)=t.
$$

为每个循环群选满阶生成元 $g_i$。若 $n_i=|G_i|$，则 $n_i$ 为偶数且 $g_i^{n_i/2}=\epsilon_i$。映射 $z\mapsto zg_i$ 把 $z^{n_i/2}$ 在 $1$ 与 $\epsilon_i$ 之间切换。由刚才的判据，$v_2(\operatorname{ord}(zg_i))\ne v_2(\operatorname{ord}(z))$：若切换前后赋值相同，它们是否等于 $v_2(n_i)$ 也相同，与半幂切换矛盾。

固定一个锚坐标 $i_0\in I$。将失败元组 $x$ 与其余 $k-1$ 个坐标上的布尔位 $b_i$ 编码为元组 $y$：保留 $y_{i_0}=x_{i_0}$；其余坐标在 $b_i=0$ 时取 $x_i$，在 $b_i=1$ 时取 $x_i g_i$。锚坐标给出原元组的共同赋值 $t$；其余编码坐标的赋值等于 $t$ 当且仅当 $b_i=0$。因此从编码可恢复每个布尔位，再消去生成元即可恢复 $x$。这给出从 $\operatorname{Bad}\times\{0,1\}^{I\setminus\{i_0\}}$ 到 $P$ 的注入，比较基数即得结论。$k=1$ 时没有布尔位，且每个元组都失败，故计数界为等式。完整证明由 Lean 内核检查。
:::

这个共同赋值计数来自 Shor（1997）第 5 节、PDF 第 16 页的经典论证，不主张新的数学优先权。以下应用按所钉源码的 `Blueprint/D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.md`、`Blueprint/D5/S3/Quantum/ShorContinuedFractions.md` 及 `Library/QuantumChannels/shor1997gateorbits.md` 的文献归属展开；它是上述计数与阶、同余、互素消去事实的推导，不把整个分解过程归入该 GID。

::: {.example #ex-shor-actual-unit-factors title="实际单位群的 CRT 计数与同事件双侧因子证书"}
**实际素数幂，而非无平方因子的替身。** 取任意奇数 $N>1$，令 $I$ 为 $N$ 的不同素因子集，$k=|I|$，并取

$$
e_p=N.\operatorname{factorization}(p),\qquad
G_p=(\mathbb Z/p^{e_p}\mathbb Z)^\times,\qquad
U_N=(\mathbb Z/N\mathbb Z)^\times.
$$

$I$ 非空，每个 $e_p>0$，每个 $p$ 为奇素数。奇素数幂的完整单位群 $G_p$ 循环；其中字面的单位 $-1$ 的平方为 $1$ 且不等于 $1$，所以阶为 $2$。后一不等式可直接由模数 $p^{e_p}\ge p\ge3$ 看出：模 $n$ 的 $-1=1$ 只可能在 $n=1$ 或 $2$ 时发生。

中国剩余环同构提升为单位群同构

$$
\mathcal E:U_N\ \simeq\ \prod_{p\in I}G_p.
$$

所钉构造是将 `Units.mapEquiv` 作用于 `ZMod.equivPi N hN` 的乘法同构，再复合 `MulEquiv.piUnits`（$h_N$ 为 $N\ne0$）。它保留真阶、每个自然数幂，并把字面的 $-1$ 送到逐坐标的 $-1$。因此，令

$$
\operatorname{Good}(u)\ \Longleftrightarrow\
\operatorname{Even}(\operatorname{ord}(u))\ \land\
u^{\operatorname{ord}(u)/2}\ne-1,
$$

就有 $\operatorname{Good}(u)\Longleftrightarrow\operatorname{Good}_{(-1)_p}(\mathcal E(u))$。限制 $\mathcal E$ 到失败子类型，得到实际失败单位与失败元组的双射；`Nat.card_congr` 将两者的基数相等连同整个载体的基数相等一起搬运。特别地，若

$$
\begin{aligned}
T&=|U_N|=\prod_{p\in I}|G_p|,\\
F&=|\{u\in U_N:\neg\operatorname{Good}(u)\}|,\qquad
S=|\{u\in U_N:\operatorname{Good}(u)\}|,
\end{aligned}
$$

则 [@thm-half-order-family-failure-count] 给出 $F\,2^{k-1}\le T$。这里 $T>0$（载体含单位元）、$2^{k-1}>0$，且 $S+F=T$。在实数或有理数中除以这些正数，得到

$$
\Pr_{u\sim\operatorname{Unif}(U_N)}[\operatorname{Good}(u)]
=\frac ST=1-\frac FT\ge1-\frac1{2^{k-1}}.
$$

这是在**完整实际单位群上均匀抽样**的概率。单位元仍被抽到；其阶为 $1$，所以 Good 为假。若 $N$ 不是素数幂，素因子集非空且基数不为 $1$（`isPrimePow_iff_card_primeFactors_eq_one`），故 $k\ge2$，上界中的失败比例至多 $1/2$，成功比例至少 $1/2$。素数幂的 $k=1$ 情形仍在上述计数范围内，只给出成功比例至少 $0$；没有删去重复素因子，也没有要求 $N$ 无平方因子。

**同一个 Good 同时给出两个真因子。** 这一确定性步骤只需自然数 $N>2$ 与 $\gcd(a,N)=1$，不要求 $N$ 为奇数。令 $u$ 为 $a$ 对应的单位，$r=\operatorname{ord}(u)$，并假设 $\operatorname{Good}(u)$。有限单位群给出 $r>0$；偶性给出 $m=r/2$ 满足 $0<m<r$。真阶的最小性排除 $u^m=1$，Good 排除 $u^m=-1$，而

$$
(u^m)^2=u^{2m}=u^r=1.
$$

这一步使用真阶；任意偶数周期不能代替它。互素性与 $N>2$ 排除 $a=0$，所以 $a\ge1$，自然数 $x=a^m\ge1$。将单位幂投到 $\mathbb Z/N\mathbb Z$，$x$ 的剩余类就是 $u^m$；有了 $1\le x$，自然数减法 $x-1$ 才能按 `Nat.cast_sub` 转成环中的差。于是

$$
\begin{aligned}
N&\mid(x-1)(x+1),\\
N&\nmid x-1,\qquad N\nmid x+1.
\end{aligned}
$$

第一行来自 $(x-1)(x+1)=x^2-1$ 的剩余类为零；第二行分别来自 $u^m\ne1$ 与 $u^m\ne-1$。若 $\gcd(x-1,N)=1$，从第一行作互素消去会得 $N\mid x+1$，矛盾；对称地，若 $\gcd(x+1,N)=1$，则得 $N\mid x-1$，也矛盾。两侧 gcd 都是正的且至多为 $N$；若某侧等于 $N$，又会迫使 $N$ 整除该侧。因此同时有

$$
\begin{aligned}
1&<\gcd(a^m-1,N)<N,\qquad \gcd(a^m-1,N)\mid N,\\
1&<\gcd(a^m+1,N)<N,\qquad \gcd(a^m+1,N)\mid N.
\end{aligned}
$$

**代表元变了，gcd 对不变。** 仍取 $N>2$；对实际单位 $u$，令 $m=\operatorname{ord}(u)/2$，记 $b$ 为 $u$ 的标准自然数代表元，$t$ 为 $u^m$ 的标准自然数代表元。二者均与 $N$ 互素，故 $b,t\ge1$。任意自然数代表元 $a$ 满足 $(a:\mathbb Z/N\mathbb Z)=u$ 时，也与 $N$ 互素且 $a\ge1$。单位幂与剩余类相容给出

$$
a^m\equiv t\pmod N,\qquad b^m\equiv t\pmod N.
$$

这是同余，并非自然数等式。因 $a^m,b^m,t$ 均至少为 $1$，可以用 `Nat.ModEq.sub` 同减 $1$；加 $1$ 则直接保持同余。再用 `Nat.ModEq.gcd_eq` 得到

$$
\begin{aligned}
\bigl(\gcd(a^m-1,N),\gcd(a^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr),\\
\bigl(\gcd(b^m-1,N),\gcd(b^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr).
\end{aligned}
$$

所以双侧证书同时适用于原代表元的幂、标准底数的幂与标准半阶幂代表元。以 $\operatorname{Both}_N(z)$ 表示 $\gcd(z-1,N)$ 与 $\gcd(z+1,N)$ 各自整除 $N$ 且严格介于 $1$ 与 $N$。明确写出带证书的事件：

$$
\begin{aligned}
C(u)\ \Longleftrightarrow\ &\operatorname{Good}(u)\ \land\ \operatorname{Both}_N(b^m)\ \land\ \operatorname{Both}_N(t)\\
&\land\ \bigl(\forall a\in\mathbb N,\ (a:\mathbb Z/N\mathbb Z)=u
\Rightarrow\operatorname{Both}_N(a^m)\bigr).
\end{aligned}
$$

上述确定性推导证明 $\operatorname{Good}(u)\Rightarrow C(u)$，投影到首个合取项证明反向蕴含。恒等映射因而限制为成功子类型之间的双射，故

$$
|\{u\in U_N:C(u)\}|=S.
$$

回到奇数 $N>1$ 的均匀单位抽样，带双侧证书的同一事件概率恰为 $S/T$，继承 $1-1/2^{k-1}$ 的下界；若 $N$ 非素数幂，便至少为 $1/2$。证书没有另换成功事件或抽样载体。
:::

经典单位抽样与前文固定底数下的实际量子测量是两种随机选择。前者的 Good 比例不能直接与后者的候选列表概率相乘；组合需要明确的共同抽样律及相应条件概率。上文已在显式独立重置前提下给出恰好两次实际观察的全配对最小公倍数列表成员事件下界，并用最小通过项选择规则得到相同的精确输出事件下界；以上仍没有给出高效均匀单位采样器、从完整候选最小公倍数列表认证精确阶的选择器、任意相关重复的保证、完整递归素因子分解实现或位／门复杂度。条件后验梳子的集中仍保持前文的文献边界。
