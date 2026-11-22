# E.8.3 轨道、观察者与复结构 {#sec-appendix-e-s08-s03-orbits-and-structure}

## E.8.3.1 轨道：一个对象沿时间的比较记录 {#sec-appe-orbit-records}

[@rem-appe-sagitta-continuity] 处理的是一族时间齐次的对象 $x_t$，$\mathrm{CMP}(x_s,x_t)=w(t-s)$。沿用那里的记号：$f(t)=\varphi\bigl(w(t)\bigr)$，$\xi_s=\pi\bigl(w(s)\bigr)\Omega$，$\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$，$\langle\xi_r,\xi_s\rangle=f(s-r)$，并设矢高读数在零点连续，从而 $U_t$ 在 $\mathcal{K}$ 上强连续。由 Stone 定理与谱定理（`文献结果`），有自伴的 $H$ 与概率测度 $\mu$（$\Omega$ 在 $H$ 下的能量分布），使 $f(t)=\int e^{-i\lambda t}\,d\mu(\lambda)$，并且 $\mathcal{K}$ 与 $L^2(\mu)$ 酉等价，$\dim\mathcal{K}$ 等于 $\mu$ 的支撑点数。三种读数分别是：求同读数 $\varphi\bigl(S(x_0,x_t)\bigr)=\operatorname{Re}f(t)$，求异读数 $\varphi\bigl(A(x_0,x_t)\bigr)=i\operatorname{Im}f(t)$，以及射线回到原处的玻恩权重 $\lvert f(t)\rvert^2$。对整体相位取最小的矢高读数 $\min_\alpha\bigl(1-\operatorname{Re}(e^{i\alpha}f(t))\bigr)=1-\lvert f(t)\rvert$ 称为**射线矢高**。

按固定步长 $\tau>0$ 采样，样本 $\xi_0,\xi_\tau,\dots,\xi_{(n-1)\tau}$ 的读数表是 $G_{jk}=f\bigl((k-j)\tau\bigr)$，$j,k=0,\dots,n-1$。它的秩由下面的冻结定理计算。

::: {.theorem #thm-appe-prony-hankel-rank title="有限指数和的汉克尔截面，秩等于模式数" lean="D5/S3/Analytic/GoldenTomography/FinitePronyHankelReconstruction.prony_hankel_rank"}
设 $K$ 为域，$m\le n$ 为自然数，节点 $z_1,\dots,z_m\in K$ 两两不同，权重 $w_1,\dots,w_m\in K$ 都不为零。则 $K$ 上的 $n\times n$ 矩阵

$$
H_{ij}=\sum_{l=1}^{m}w_l\,z_l^{\,i+j},\qquad i,j=0,1,\dots,n-1,
$$

的秩等于 $m$。
:::

::: proof
$H$ 分解为 $V\operatorname{diag}(w)V^{\mathsf T}$，其中 $V_{il}=z_l^{\,i}$ 是 $n\times m$ 的范德蒙德矩阵。这个分解给出秩至多为 $m$；左上角 $m\times m$ 块是两个方阵范德蒙德矩阵与一个对角阵之积，节点两两不同、权重非零使它的行列式不为零，所以秩至少为 $m$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-appe-orbit-rank-and-recurrence title="轨道读数表的秩数出能级；有限个能级的轨道必定回来（手工推导与文献结果）"}
**手工推导。** 设 $\mu=\sum_{l=1}^{m}p_l\delta_{\lambda_l}$，$\lambda_l$ 两两不同，$p_l>0$，并设节点 $z_l=e^{-i\lambda_l\tau}$ 两两不同。

1. **秩。** $\operatorname{rank}G=\min(n,m)$。把 $G$ 的行倒排，$G_{n-1-j,\,k}=\sum_l\bigl(p_lz_l^{-(n-1)}\bigr)z_l^{\,j+k}$，正是 [@thm-appe-prony-hankel-rank] 中 $K=\mathbb{C}$、权重为 $p_lz_l^{-(n-1)}\neq0$ 的截面；行倒排不改变秩，所以 $n\ge m$ 时秩为 $m$。$n<m$ 时 $G=V\operatorname{diag}(p)V^*$，$V_{jl}=z_l^{-j}$ 是秩为 $n$ 的 $n\times m$ 范德蒙德矩阵，$\operatorname{diag}(p)$ 正定，所以秩为 $n$。一般的能量分布也可以这样读：对 $\alpha\in\mathbb{C}^n$，$\alpha^*G\alpha=\int\bigl\lvert\sum_j\alpha_je^{-ij\lambda\tau}\bigr\rvert^2d\mu(\lambda)$，括号里是 $e^{-i\lambda\tau}$ 的次数小于 $n$ 的多项式，所以 $G$ 的秩等于 $n$ 与推前测度 $(e^{-i\lambda\tau})_*\mu$ 的支撑点数中较小的一个。
2. **余项。** 样本 $\xi_{k\tau}$ 在 $\xi_0,\dots,\xi_{(k-1)\tau}$ 张成的空间外有非零正交余项，当且仅当前 $k+1$ 个样本的读数表的秩比前 $k$ 个的大，当且仅当 $k<m$。所以在 $\mathcal{K}$ 中，前 $k$ 个样本张成的 $S_k$ 有 $S_k^\perp\neq\bot$（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape) 的前提）恰在 $k<m$ 时成立；采样的余项永不枯竭，当且仅当推前测度有无穷多个支撑点。
3. **回归。** 对每个 $T>0$ 与整数 $Q\ge2$，存在 $t\in[T,\,Q^{m-1}T]$，使射线矢高 $1-\lvert f(t)\rvert\le2\sin^2\frac{\pi}{Q}$；$Q\ge4$ 时这等价于回到原处的玻恩权重 $\lvert f(t)\rvert^2\ge\cos^2\frac{2\pi}{Q}$。推导：对 $m-1$ 个实数 $\alpha_l=(\lambda_l-\lambda_1)T/2\pi$ 用 Dirichlet 同时逼近定理，得整数 $1\le q\le Q^{m-1}$ 使每个 $q\alpha_l$ 到最近整数的距离不超过 $\frac1Q$（鸽笼原理：$Q^{m-1}+1$ 个点 $k\alpha$（$k=0,\dots,Q^{m-1}$）模 $1$ 落入 $Q^{m-1}$ 个边长 $\frac1Q$ 的小方格，取同格两点之差）。取 $t=qT$，则每个 $(\lambda_l-\lambda_1)t$ 与 $2\pi\mathbb{Z}$ 相差不超过 $\frac{2\pi}{Q}\le\pi$，于是
$$
\lvert f(t)\rvert\ \ge\ \operatorname{Re}\left(e^{i\lambda_1t}f(t)\right)=\sum_lp_l\cos\bigl((\lambda_l-\lambda_1)t\bigr)\ \ge\ \cos\frac{2\pi}{Q}=1-2\sin^2\frac{\pi}{Q}.
$$
对 $m$ 个实数 $\lambda_lT/2\pi$ 同样处理，得 $t\in[T,Q^mT]$ 使矢高读数 $1-\operatorname{Re}f(t)\le2\sin^2\frac{\pi}{Q}$。
4. **维数证据。** 若对一切 $t\in[T,Q^{m-1}T]$ 都有 $1-\lvert f(t)\rvert>2\sin^2\frac{\pi}{Q}$，则 $\dim\mathcal{K}>m$：否则 $\mu$ 恰有 $m'\le m$ 个原子，第 3 款在 $[T,Q^{m'-1}T]\subseteq[T,Q^{m-1}T]$ 中给出反例。若有 $T$ 与 $\delta>0$ 使 $t\ge T$ 时 $1-\lvert f(t)\rvert\ge\delta$，取 $Q$ 使 $2\sin^2\frac\pi Q<\delta$，上一句对每个 $m$ 都适用，所以 $\dim\mathcal{K}=\infty$。例如能量分布为高斯分布 $N(0,\sigma^2)$ 时 $f(t)=e^{-\sigma^2t^2/2}$，射线矢高趋于 $1$。

**文献结果。** Dirichlet 同时逼近定理（Dirichlet 1842）；离散谱的量子轨道回归（Bocchieri–Loinger 1957）。后者说明第 4 款的条件只是充分的：能量分布有无穷多个原子时轨道照样回来，而 $\dim\mathcal{K}=\infty$。混叠时（例如 $\lambda_2=\lambda_1+2\pi/\tau$）两个能级的节点重合，采样的秩只看到一个。
:::

所以 `H4` 的“正交余项不竭”有一个只用一个对象沿时间的比较读数说出口的形式：**读数表的秩每多一，就多证明一个能级；射线矢高在某时刻之后始终离开零的对象，所在的态空间不可能是有限维的。** 前一句是等价刻画，后一句是充分条件。它们都没有推出 `H4`：哈密顿量只有有限个能级的模型满足全部条款。

同一份轨道记录还回答了 E.8.2.2 留下的问题：哈密顿量在多大程度上是读数之外的输入。

::: {.remark #rem-appe-orbit-record-channels title="轨道记录的三种读数各自决定什么：两个通道缺一不可（手工推导与文献结果）"}
**手工推导。** 记 $\mu^{\mathrm r}(B)=\mu(-B)$ 为能量分布的反射。

1. **全比较读数。** $f$ 决定 $\mu$，进而决定 $(\mathcal{K},H\vert_{\mathcal{K}},\Omega)$ 到酉等价为止。有限维时这一点直接可见：不同 $\lambda$ 的指数函数 $e^{-i\lambda t}$ 线性无关，$f=\sum_lp_le^{-i\lambda_lt}$ 的写法唯一。
2. **只有求同读数。** $\operatorname{Re}f(t)=\int\cos(\lambda t)\,d\mu$ 只决定对称化 $\frac12(\mu+\mu^{\mathrm r})$，也就是 $\lvert\lambda\rvert$ 的分布。二能级就有反例：$H=\operatorname{diag}(1,2)$ 与 $H'=\operatorname{diag}(1,-2)$，初态 $\frac{1}{\sqrt2}(1,1)$，两者的求同读数都是 $\frac12(\cos t+\cos2t)$，回到原处的玻恩权重却分别是 $\frac12(1+\cos t)$ 与 $\frac12(1+\cos3t)$。
3. **只有玻恩权重。** $\lvert f(t)\rvert^2=\int\!\!\int e^{-i(\lambda-\lambda')t}\,d\mu(\lambda)\,d\mu(\lambda')$ 只决定 $\mu$ 的自相关。二能级时这已足够定出 $\mu$ 到平移与反射为止：$\mu=p\delta_a+q\delta_b$ 的自相关给出 $pq$、$p^2+q^2$ 与 $\lvert b-a\rvert$。三能级就有真正的歧义：能级 $0,1,2$，布居 $\frac1{12}(1,5,6)$ 与 $\frac1{12}(2,7,3)$，生成多项式 $1+5z+6z^2=(1+2z)(1+3z)$ 与 $2+7z+3z^2=(2+z)(1+3z)$ 只差把根 $-\frac12$ 换成它的倒数 $-2$；两者的玻恩权重都是 $\frac{1}{144}(62+70\cos t+12\cos2t)$，而两个分布既不差一个平移，也不互为反射，求同读数也不同。
4. **求同读数加玻恩权重。** 对两个都只有有限个能级的分布，两者合起来决定 $\mu$ 到反射为止。推导：$(\operatorname{Im}f)^2=\lvert f\rvert^2-(\operatorname{Re}f)^2$ 已知；若 $f$ 与 $f'$ 给出相同的两种读数，$g=\operatorname{Im}f$、$g'=\operatorname{Im}f'$ 是有限个三角函数之和，实解析，$(g-g')(g+g')\equiv0$，其中一个因子在不可数多个点上为零，因而恒为零。所以 $f'=f$ 或 $f'=\bar f$，后者就是 $\mu'=\mu^{\mathrm r}$，即 $H\mapsto-H$ 的时间反演。

**文献结果。** Stone 定理、谱定理与 Bochner 定理；一维相位恢复的翻根歧义（Walther 1963；Hofstetter 1964）与同度量集（Patterson 1944；Rosenblatt–Seymour 1982）。
:::

E.8.2.2 的台账把哈密顿量 $H$ 记为仍需输入。这一条注记把这句话说得更准：**在轨道张成的空间上，$H$ 不是读数之外的另一个输入，两个通道的完整轨道记录决定它到酉等价为止。** 只读求同通道，丢掉的不止时间取向，连每个能级的符号都丢了；只读射线的玻恩权重，三能级就出现真正的歧义；求同读数与玻恩权重合起来，剩下的恰是求异通道的整体符号，也就是时间反演。条款 II 把比较拆成求同与求异两个通道，在动力学上两个通道都不可省。仍然是输入的，是选哪条轨道，以及 $H$ 在 $\mathcal{K}$ 之外怎样作用。

## E.8.3.2 观察者之间的比较：时间次序选出双曲一行 {#sec-appe-observer-comparison}

把比较的对象换成 $1+1$ 维中的惯性观察者，每个观察者有自己的坐标 $(t,x)$。对观察者 $o,o'$，令 $\Lambda_{o\leftarrow o'}$ 把一个事件在 $o'$ 中的坐标换成它在 $o$ 中的坐标，取 $\mathrm{CMP}(o,o')=\Lambda_{o\leftarrow o'}$，值域是 E.8.1.1 用过的实 $*$-代数 $(M_2(\mathbb{R}),{}^\sharp)$，$a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$，$aa^\sharp=\det(a)\mathbf{1}$。坐标变换是线性的，这是这里的输入（`MODEL`）；[@rem-appe-causal-order-linearity] 说明在 $1+1$ 维中它不能由因果次序推出。

条款 III 在这里就是 $\det\Lambda_{o\leftarrow o'}=1$，此时条款 II 只是说反向的变换是逆变换；求同部分 $S=\frac12\operatorname{tr}(\Lambda)\mathbf{1}$ 总是实标量，所以 E.8.1.1 的矢高表直接适用。记 $\Lambda_{o\leftarrow o'}=\begin{pmatrix}a&b\\c&d\end{pmatrix}$。$o'$ 的原点 $(\tau,0)$ 在 $o$ 中是 $(a\tau,c\tau)$，所以 $a\neq0$ 时 $o'$ 相对 $o$ 的速度读数是 $v(o,o')=c/a$；由逆矩阵，$d\neq0$ 时 $v(o',o)=-c/d$。

::: {.remark #rem-appe-frame-change-family title="观察者比较的单参数族：K 的三种符号就是矢高表的三行（手工推导与文献结果）"}
**手工推导。** 令 $V$ 为一切观察者对的速度读数所成的集合。设：

1. 条款 III：对一切观察者对，$\det\Lambda_{o\leftarrow o'}=1$；
2. 速度读数反对称：对一切观察者对，$a\neq0$ 且 $v(o',o)=-v(o,o')$；
3. 同一条律：有映射 $L:V\to M_2(\mathbb{R})$，使对一切观察者对 $\Lambda_{o\leftarrow o'}=L(v(o,o'))$，并且 $v,v'\in V$ 时 $L(v)L(v')\in L(V)$；
4. $V$ 含非零元。

则 $0=v(o,o)\in V$，$L(0)=\mathbf{1}$，并且有常数 $K\in\mathbb{R}$，使对一切 $v\in V$

$$
L(v)=\gamma(v)\begin{pmatrix}1&Kv\\v&1\end{pmatrix},\qquad \gamma(v)^2\left(1-Kv^2\right)=1,
$$

$\gamma(v)$ 的符号不由这些假设确定。若 $L(v)L(v')=L(w)$，则 $1+Kvv'\neq0$，$w=\dfrac{v+v'}{1+Kvv'}$，$\gamma(w)=\gamma(v)\gamma(v')(1+Kvv')$。此外

$$
S=\gamma\,\mathbf{1},\qquad A=\gamma\begin{pmatrix}0&Kv\\v&0\end{pmatrix},\qquad A^2=\gamma^2Kv^2\,\mathbf{1}=(\gamma^2-1)\,\mathbf{1},
$$

矢高为 $1-\gamma$。所以 $v\neq0$ 时，$K<0$、$K=0$、$K>0$ 分别落在 E.8.1.1 表的椭圆、抛物、双曲三行。

推导：取 $v\in V$，$v\neq0$，$L(v)=\begin{pmatrix}a&b\\c&d\end{pmatrix}$，$c=av\neq0$。$v$ 是某一对观察者的速度读数，第 2 条用于这一对给出 $c/a=c/d$，即 $a=d$；第 1 条给出 $a^2-bc=1$，即 $b=K(v)\,va$，其中 $K(v)=\dfrac{a^2-1}{a^2v^2}$，并且 $a^2(1-K(v)v^2)=1$。对 $v,v'\in V\setminus\{0\}$，由第 3 条 $L(v)L(v')=L(w)$，$w\in V$，它的两个对角元相等（$w\neq0$ 时由上一步，$w=0$ 时它是 $\mathbf{1}$）；而这两个对角元是 $\gamma(v)\gamma(v')(1+K(v)vv')$ 与 $\gamma(v)\gamma(v')(1+K(v')vv')$，所以 $K(v)=K(v')$。$L(w)$ 的对角元不为零，即 $1+Kvv'\neq0$；合成律是乘积第二行首元与第一行首元之比。

各条假设与经典推导的对应：线性（齐性）是值域 $M_2(\mathbb{R})$；相对性原理是第 3 条，其中条款 IV 只给出 $\Lambda_{o\leftarrow o'}\Lambda_{o'\leftarrow o''}=\Lambda_{o\leftarrow o''}$，封闭性还要求从每个观察者出发都能取到 $V$ 中的每个速度；互易原理是第 2 条，它说速度是一个求异读数；“不伸缩”在经典推导中由互易与各向同性得到，这里由条款 III 直接给出，所以各向同性不再出现。

**文献结果。** 不用光速、由相对性原理得到含一个常数 $K$ 的变换族：P. Frank 与 H. Rothe, *Ann. Phys.* **339**, 825–855 (1911)；J.-M. Lévy-Leblond, *Am. J. Phys.* **44**, 271–277 (1976)（时空均匀、各向同性、群结构与因果性四条假设只留下洛伦兹变换及其伽利略极限）；N. D. Mermin, *Am. J. Phys.* **52**, 119–124 (1984)。由相对性原理、时空均匀与空间各向同性推出互易：V. Berzi 与 V. Gorini, *J. Math. Phys.* **10**, 1518–1524 (1969)。
:::

$K$ 的符号还没有定。下一条注记回答：什么排除 $K<0$，什么区分 $K=0$ 与 $K>0$。

::: {.remark #rem-appe-time-order-repetition title="重复同一个比较不翻转时间次序，当且仅当求同读数不小于 1（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是实 $*$-代数，$uu^*=u^*u=\mathbf{1}$，求同读数 $S=s\mathbf{1}$。

1. 对一切 $n\ge0$，$S(u^n)=T_n(s)\,\mathbf{1}$。
2. $T_n(s)>0$ 对一切 $n\ge1$ 成立，当且仅当 $s\ge1$。$-1<s<1$ 时令 $s=\cos\alpha$，$0<\alpha<\pi$，则使 $T_n(s)<0$ 的最小的 $n$ 是 $\lfloor\frac{\pi}{2\alpha}\rfloor+1$。
3. 在 [@rem-appe-frame-change-family] 的族中，$v\neq0$ 时：$K>0$ 当且仅当 $L(v)$ 有两条不同的实不变直线，它们是 $x=\pm t/\sqrt{K}$，对一切 $v$ 相同；直线 $t=0$ 不变当且仅当 $K=0$；$A^2=0$ 当且仅当 $K=0$。

推导：第 1 款，由 [@rem-appe-bounded-recurrence]，$u^n=T_n(s)\mathbf{1}+U_{n-1}(s)A$，$(u^n)^*=u^{-n}=T_n(s)\mathbf{1}-U_{n-1}(s)A$，取平均。第 2 款：$s=\cosh\eta\ge1$ 时 $T_n(s)=\cosh n\eta\ge1$；$s\le-1$ 时 $T_1(s)=s<0$；$-1<s<1$ 时 $T_n(s)=\cos n\alpha$，$n\le\frac{\pi}{2\alpha}$ 时它不为负，而 $n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$ 满足 $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$。第 3 款：$L(v)$ 的特征值是 $\gamma(1\pm\sqrt{K}\,v)$；$K>0$ 时特征向量为 $(1,\pm1/\sqrt{K})^{\mathsf T}$；$K<0$ 时特征值不是实数；$K=0$ 时 $L(v)=\gamma(\mathbf{1}+vN)$，$N=\begin{pmatrix}0&0\\1&0\end{pmatrix}$，$N^2=0$，唯一的实不变直线由 $(0,1)^{\mathsf T}$ 张成；一般地 $L(v)(0,1)^{\mathsf T}=\gamma(Kv,1)^{\mathsf T}$。

在观察者模型中（读法为 `MODEL`），$S(\Lambda_{o\leftarrow o'})=a$ 是事件“$o'$ 的原点处 $o'$ 的时间走过一个单位”在 $o$ 中的时间坐标。称**时间次序条件**成立，若对每个比较 $u$ 与每个 $n\ge1$ 都有 $S(u^n)>0$：把同一个参考系变换连做 $n$ 次，原点处较晚的事件仍然较晚。由第 2 款，它等价于每个 $\gamma(v)\ge1$，即 $K\ge0$ 且一切 $\gamma(v)>0$。$K<0$、$\gamma(v)>0$ 时令 $\tan\alpha=\sqrt{-K}\,\lvert v\rvert$，$0<\alpha<\frac\pi2$：在坐标 $(t,\sqrt{-K}\,x)$ 中 $L(v)$ 是转角 $\alpha$ 的转动，$S(L(v)^n)=\cos n\alpha$，第一个负值出现在 $n=\lfloor\frac{\pi}{2\alpha}\rfloor+1$；若某个 $n$ 恰有 $n\alpha=\frac\pi2$，则 $S(L(v)^n)=0$，这一步的速度读数 $c/a$ 无定义，这就是合成律中 $1+Kvv'=0$ 的情形。

由第 3 款，在时间次序条件下以下三者等价：$K>0$；有一个对一切观察者都相同的有限不变速度 $1/\sqrt{K}$；$v\neq0$ 时求异部分不是零平方。$K=0$ 是伽利略情形：同时性在比较下不变，求异部分 $\gamma vN$ 是零平方元素。
:::

所以时间次序条件排除椭圆一行（以及 $s\le-1$ 的比较），“求异部分不是零平方”再排除抛物一行，两条合起来选出 $s>1$ 的双曲一行。求异部分满足 $A^*=-A$，$A^2=0$ 即 $A^*A=0$，所以后一条是 [@rem-appe-positivity-invisible-part] 中“没有非零的 $a$ 满足 $a^*a=0$”在求异部分上的特例；$(M_2(\mathbb{R}),{}^\sharp)$ 上没有态（$a=\operatorname{diag}(1,-1)$ 给出 $a^\sharp a=-\mathbf{1}$），那里关于读数的结论在这里不适用。

[@rem-appe-time-order-repetition] 第 2 款已在所钉仓库冻结，陈述如下；第 1、3 款与观察者模型中的读法没有形式化。

::: {.proposition #prop-appe-chebyshev-positivity-threshold title="切比雪夫值恒正的阈值与首次变号的指标" lean="D5/S3/Analytic/Chebyshev/PositivityThreshold.forall_pos_eval_T_iff_one_le D5/S3/Analytic/Chebyshev/PositivityThreshold.eval_T_cos_floor_succ_neg_and_nonneg_before"}
设 $T_n$ 是第一类切比雪夫多项式：$T_0=1$，$T_1(x)=x$，$T_{n+1}(x)=2xT_n(x)-T_{n-1}(x)$。

1. 对实数 $s$：$T_n(s)>0$ 对一切自然数 $n\ge1$ 成立，当且仅当 $s\ge1$。
2. 设 $0<\alpha<\pi$，$n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$。则 $T_{n_0}(\cos\alpha)<0$，并且对一切自然数 $n<n_0$ 有 $T_n(\cos\alpha)\ge0$。
:::

::: proof
第 2 款：$T_n(\cos\alpha)=\cos n\alpha$。由取整的定义，$n_0-1\le\frac{\pi}{2\alpha}<n_0$，所以 $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$，$\cos n_0\alpha<0$；$n<n_0$ 时 $n\le\frac{\pi}{2\alpha}$，于是 $0\le n\alpha\le\frac\pi2$，$\cos n\alpha\ge0$。

第 1 款：$s\ge1$ 时 $T_n(s)\ge1$（写 $s=\cosh\eta$，则 $T_n(s)=\cosh n\eta$）；$s\le-1$ 时 $T_1(s)=s<0$；$-1<s<1$ 时取 $\alpha=\arccos s$，$0<\alpha<\pi$，第 2 款给出 $T_{n_0}(s)<0$，而 $n_0\ge1$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-appe-rotor-boost-coexistence title="有界与保序两种选择互补：转动与推进住在同一个代数里（手工推导与文献结果）"}
**手工推导。** 设 $u\neq\mathbf{1}$，$uu^*=u^*u=\mathbf{1}$，$S=s\mathbf{1}$。在 $\mathbb{R}[A]=\operatorname{span}\{\mathbf{1},A\}$ 上 $(x+yA)^*(x+yA)=\left(x^2-y^2(s^2-1)\right)\mathbf{1}$，由此并由 [@rem-appe-bounded-recurrence] 与 [@rem-appe-time-order-repetition]：

| 行 | $s$ | 正性条件在 $\mathbb{R}[A]$ 上（等价于整数次幂有界） | 时间次序条件 | $A^2\neq0$ |
| :--- | :--- | :---: | :---: | :---: |
| 椭圆 | $-1<s<1$ | 成立 | 不成立 | 成立 |
| 抛物 | $s=1$，$A\neq0$ | 不成立 | 成立 | 不成立 |
| 抛物 | $s=-1$，$A\neq0$ | 不成立 | 不成立 | 不成立 |
| $u=-\mathbf{1}$ | $s=-1$，$A=0$ | 成立 | 不成立 | — |
| 双曲 | $s>1$ | 不成立 | 成立 | 成立 |
| 双曲 | $s<-1$ | 不成立 | 不成立 | 成立 |

所以 $u\neq\mathbf{1}$ 不能同时满足这两个条件；正性条件单独选出椭圆一行（外加 $-\mathbf{1}$）；时间次序条件加上 $A^2\neq0$ 选出 $s>1$ 的双曲一行。`H2` 与 `H8` 用的是同一张三分表，但为不同的比较选不同的行：方向与态之间的比较取有界的一行，观察者之间的比较取保序的一行。

两者可以住在同一个代数里。

1. 在 $\mathrm{Cl}(p,q)$ 中取正交归一的 $e_i$，$i\neq j$ 时 $(e_ie_j)^2=-e_i^2e_j^2$：$e_i^2$ 与 $e_j^2$ 同号时为 $-1$，异号时为 $+1$。以反转为对合，$B=e_ie_j$ 满足 $B^*B=-B^2$。所以正性条件在定号块内的坐标平面上成立，在混号平面上失败。签名 $(1,d)$ 中有 $\frac{d(d-1)}2$ 个空间坐标平面（转动，椭圆）与 $d$ 个时空坐标平面（推进，双曲）。
2. 把 $M_2(\mathbb{C})$ 看作实 $*$-代数，对合取 E.8.1.1 的 $\sharp$，满足 $uu^\sharp=\mathbf{1}$ 的元素是 $\mathrm{SL}(2,\mathbb{C})$。在四元数子代数 $\operatorname{span}_{\mathbb{R}}\{\mathbf{1},i\sigma_1,i\sigma_2,i\sigma_3\}$ 上 $a^\sharp a=\lvert a\rvert^2\mathbf{1}$，正性条件成立；$\sigma_3^\sharp\sigma_3=-\mathbf{1}$，加入一个推进生成元它就失败。每个 $u\in\mathrm{SL}(2,\mathbb{C})$ 唯一地写成 $u=kb$，$k\in\mathrm{SU}(2)$，$\frac12\operatorname{tr}k\in[-1,1]$；$b$ 是行列式为 $1$ 的正定厄米矩阵，$\frac12\operatorname{tr}b\ge1$。转动因子重复不放大，推进因子重复不翻转时间次序。
3. 只有一个时间方向。在 $\mathbb{R}^p\times\mathbb{R}^q$ 上取 $Q(a,b)=\lvert a\rvert^2-\lvert b\rvert^2$。开锥 $\{Q>0\}$ 经 $(a,(1-\lambda)b)$，$0\le\lambda\le1$，形变收缩到 $\mathbb{R}^p\setminus\{0\}$，所以 $p\ge2$ 时它连通，$p=1$ 时恰有两个分支，由 $w\mapsto-w$ 互换。时间次序条件要用的“未来与过去”只在 $p=1$ 时存在。$p\ge2$ 时，两个时间方向张成的平面是定号的，其中的转动是第 1 款的椭圆比较，重复它会把时间轴转到反向。

零锥与二次型之间的一步由冻结命题 [@prop-null-cone-rigidity] 承担：如第 17 章在该命题之后所说，线性映射 $B$ 把零锥映入零锥时 $\operatorname{minkowski}_d(Bw)=\lambda\operatorname{minkowski}_d(w)$，$\lambda=\operatorname{minkowski}_d(Be_0)$，对任意 $d\in\mathbb{N}$ 成立。比较格拉姆矩阵的行列式得 $\det(B)^2=\lambda^{d+1}$。若 $\det B=\pm1$：$d\ge2$ 时 $\lambda<0$ 会改变签名，所以 $\lambda=1$；$d=1$ 时 $\lambda=-1$ 可以出现（转角 $90^\circ$ 的转动，$\det B=1$），它的求同读数为 $0$，被时间次序条件排除。这个命题不回答零锥为什么存在（那是 $K>0$），也不给出线性与时间取向。

**文献结果。** 矩阵的极分解，以及 $\mathrm{SL}(2,\mathbb{C})$ 作为洛伦兹群的旋量覆盖。
:::

剩下的问题是线性。

::: {.remark #rem-appe-causal-order-linearity title="1+1 维中因果次序推不出线性（手工推导与文献结果）"}
**手工推导。** 在 $1+1$ 维中取零坐标 $p=t+x$，$q=t-x$。事件 $Y$ 在 $X$ 的闭未来锥中（$t_Y-t_X\ge\lvert x_Y-x_X\rvert$），当且仅当 $p_Y\ge p_X$ 且 $q_Y\ge q_X$。所以对任意两个严格递增的双射 $f,g:\mathbb{R}\to\mathbb{R}$，映射 $(p,q)\mapsto(f(p),g(q))$ 双向保持因果次序；它是仿射映射当且仅当 $f$ 与 $g$ 都是仿射的，例如 $f(s)=s+\frac12\sin s$ 与 $g(s)=s^3+s$ 都不是。所以在 $1+1$ 维中，[@rem-appe-frame-change-family] 的线性是输入。

**文献结果。** E. C. Zeeman, *J. Math. Phys.* **5**, 490–493 (1964)：闵可夫斯基时空中保持因果偏序的自同构所成的群由非齐次洛伦兹群与伸缩生成。上面的例子说明这一结论在 $1+1$ 维中不成立；它在哪些维数成立，本书没有核对。
:::

## E.8.3.3 捏合的熵增：精确恒等式与两侧界 {#sec-appe-pinching-entropy}

E.6 第 4 款用 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 说明，保单位的基底捏合使熵增等于一个相对熵，因而不为负。这里问它有多大。取 $\mathbb{C}^d$ 上两两正交、和为 $\mathbf{1}$ 的投影 $P_1,\dots,P_m$，令 $\mathcal{P}(\rho)=\sum_kP_k\rho P_k$，$X=\rho-\mathcal{P}(\rho)$，丢弃的相干质量 $c=\lVert X\rVert_2^2=\sum_{k\neq l}\lVert P_k\rho P_l\rVert_2^2$（$\lVert\cdot\rVert_2$ 为希尔伯特—施密特范数），熵增 $\Delta S=S(\mathcal{P}(\rho))-S(\rho)$，熵以自然对数计。单比特标准基上，对任意 $2\times2$ 复矩阵，希尔伯特—施密特勾股分解与 $c=\lvert\rho_{01}\rvert^2+\lvert\rho_{10}\rvert^2$ 已经冻结（[@thm-pinching-pythagorean]）。

::: {.remark #rem-appe-pinching-exact-identities title="分块捏合的三条精确恒等式（手工推导与文献结果）"}
**手工推导。** 对一切态 $\rho$ 与一切分块捏合：

1. 纯度恰好降低丢弃的质量：$\operatorname{tr}\rho^2-\operatorname{tr}\mathcal{P}(\rho)^2=c$，并且 $\operatorname{tr}(\rho\,\mathcal{P}(\rho))=\operatorname{tr}\mathcal{P}(\rho)^2$。
2. $\Delta S=D(\rho\Vert\mathcal{P}(\rho))$。
3. 二阶雷尼熵 $S_2(\sigma)=-\log\operatorname{tr}\sigma^2$ 的增量是 $S_2(\mathcal{P}(\rho))-S_2(\rho)=-\log\left(1-\dfrac{c}{\operatorname{tr}\rho^2}\right)$。

推导：第 1 款，$\mathcal{P}$ 幂等，并且对 $\langle A,B\rangle=\operatorname{tr}(A^*B)$ 自伴，所以 $\langle\mathcal{P}(\rho),X\rangle=\langle\mathcal{P}(\rho),\rho\rangle-\langle\mathcal{P}(\rho),\mathcal{P}(\rho)\rangle=0$，展开 $\langle\mathcal{P}(\rho)+X,\mathcal{P}(\rho)+X\rangle$ 即得；这是 [@thm-pinching-pythagorean] 在一般维数与一般分块下的形式。第 2 款：令 $U_j=\sum_ke^{2\pi ijk/m}P_k$，由单位根的正交性 $\mathcal{P}(\rho)=\frac1m\sum_{j=0}^{m-1}U_j\rho U_j^*\ge\frac1m\rho$，所以 $\rho$ 的支撑含于 $\mathcal{P}(\rho)$ 的支撑。$\log\mathcal{P}(\rho)$（在支撑上取）与 $\mathcal{P}(\rho)$ 一样是分块对角的，而对分块对角的 $B$ 有 $\operatorname{tr}(\rho B)=\operatorname{tr}(\mathcal{P}(\rho)B)$，于是 $-\operatorname{tr}\rho\log\mathcal{P}(\rho)=S(\mathcal{P}(\rho))$，代入 $D(\rho\Vert\sigma)=-S(\rho)-\operatorname{tr}\rho\log\sigma$。第 3 款由第 1 款直接得到。

第 2 款对秩一基底捏合已经冻结：在 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 中取 $U=\mathbf{1}$，第 $0$ 步即是。该处的熵与相对熵用 Mathlib 的约定 $\log0=0$ 定义；由上面的支撑包含，这个约定在这里与通常的定义一致。

**文献结果。** 基底捏合下 $\Delta S$ 是相干的相对熵度量：T. Baumgratz、M. Cramer 与 M. B. Plenio, *Phys. Rev. Lett.* **113**, 140401 (2014)。不等式 $\mathcal{P}(\rho)\ge\rho/m$ 称为捏合不等式：M. Hayashi, *J. Phys. A* **35**, 10759–10773 (2002)。
:::

纯度一侧是精确的：丢掉多少相干质量，纯度就降多少。熵一侧不是 $c$ 的函数，但被它从下面控制。

::: {.remark #rem-appe-pinching-entropy-lower title="熵增不小于丢弃的相干质量；单比特上的精确范围（手工推导与文献结果）"}
**手工推导。**

1. 对一切态与一切分块捏合，

$$
\Delta S\ \ge\ \tfrac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ \ge\ c .
$$

$\Delta S\ge c$ 中的常数 $1$ 不能改大：单比特取 $z=0$ 的态，$r\to0$ 时 $\Delta S/c\to1$。
2. 纯态：$\Delta S=H(p)\ge-\log(1-c)$，其中 $p_k=\operatorname{tr}(P_k\rho)$。这一条对混态不成立：单比特 $z=0$ 时 $\Delta S=\frac{r^2}2+\frac{r^4}{12}+O(r^6)$，而 $-\log(1-c)=\frac{r^2}2+\frac{r^4}8+O(r^6)$。
3. 单比特，$\rho=\frac12(\mathbf{1}+\mathbf{r}\cdot\boldsymbol\sigma)$，$\mathbf{r}=(x,y,z)$，$r=\lvert\mathbf{r}\rvert\le1$，在 $\sigma_3$ 的本征基上捏合（$r=1$ 时积分是收敛的反常积分）：

$$
\Delta S=\int_{\lvert z\rvert}^{r}\operatorname{artanh}t\,dt,\qquad c=\frac{r^2-z^2}{2}=\int_{\lvert z\rvert}^{r}t\,dt,
$$

并且对每个 $c\in(0,\frac12]$，

$$
\ln2-h\left(\frac{1+\sqrt{2c}}{2}\right)\ \le\ \Delta S\ \le\ h\left(\frac{1+\sqrt{1-2c}}{2}\right),
$$

其中 $h(q)=-q\ln q-(1-q)\ln(1-q)$；下端由 $z=0$ 的态取到，上端由纯态取到。

推导：第 1 款的第一个不等号是量子平斯克不等式（`文献结果`）加上 [@rem-appe-pinching-exact-identities] 第 2 款。第二个不等号：$X$ 厄米且迹为零，设其特征值为 $\lambda_i$，则正特征值之和与负特征值绝对值之和都等于 $\frac12\lVert X\rVert_1$，于是 $\sum\lambda_i^2\le\left(\sum_{\lambda_i>0}\lambda_i\right)^2+\left(\sum_{\lambda_i<0}\lvert\lambda_i\rvert\right)^2=\frac12\lVert X\rVert_1^2$，等号当且仅当 $X$ 至多有一个正特征值与一个负特征值。第 2 款：$\mathcal{P}(\lvert\psi\rangle\langle\psi\rvert)=\sum_kp_k\lvert\psi_k\rangle\langle\psi_k\rvert$，$\psi_k$ 两两正交，所以 $\Delta S=H(p)$，$c=1-\sum p_k^2$；再用 $H(p)\ge-\log\sum p_k^2$（詹森不等式）。第 3 款：令 $g(t)=h(\frac{1+t}2)$，则 $S(\rho)=g(r)$，$S(\mathcal{P}(\rho))=g(\lvert z\rvert)$，$g'(t)=-\operatorname{artanh}t$。固定 $c$，令 $F(z)=g(z)-g(\sqrt{z^2+2c})$，$0\le z\le\sqrt{1-2c}$，则 $F'(z)=z\left(\frac{\operatorname{artanh}r}{r}-\frac{\operatorname{artanh}z}{z}\right)\ge0$，因为 $t\mapsto\operatorname{artanh}t/t$ 递增；两端的值即上下界。

**数值核验（`NUM`）。** $d=2,3,4,5$、随机分块、各种秩的 $6000$ 个随机态上（固定随机种子），第 1 款两个不等号都没有被违反，第二个不等号在部分情形下于舍入误差内取等；第 3 款闭式与数值积分的最大偏差为 $3\times10^{-14}$，两端在 $c=0.05,0.2,0.45$ 处取到。[§36.1.5.2](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-p2g-dream-precompile) 的纯态例子（$\theta=\frac\pi6$，$c=\frac38$）落在上端：$\Delta S=h(\frac34)\approx0.5623$（即 $0.8113$ 比特）。

**文献结果。** 量子平斯克不等式 $D(\rho\Vert\sigma)\ge\frac12\lVert\rho-\sigma\rVert_1^2$：F. Hiai、M. Ohya 与 M. Tsukada, *Pacific J. Math.* **96**, 99–109 (1981)。经典情形已冻结为 [`pinsker_inequality`](lean:D5/S3/TotalVariation/Pinsker.pinsker_inequality)。
:::

上界一侧，对秩一基底捏合有一条冻结命题。

::: {.proposition #prop-appe-l1-coherence-bound title="相对熵相干不超过 ℓ1 相干" lean="D5/S3/Divergence/CoherenceL1RelativeEntropyBound.result"}
设 $n\in\mathbb{N}$，$\rho$ 为半正定、迹为 $1$ 的 $n\times n$ 复矩阵。令 $S_{\mathrm{bit}}(\sigma)=-\operatorname{Re}\operatorname{tr}f(\sigma)$，其中 $f(x)=x\log_2x$，$f(0)=0$，$f(\sigma)$ 由连续函数演算给出。则

$$
S_{\mathrm{bit}}\left(\operatorname{diag}(\rho_{11},\dots,\rho_{nn})\right)-S_{\mathrm{bit}}(\rho)\ \le\ \sum_{i\neq j}\lvert\rho_{ij}\rvert .
$$
:::

::: proof
把基底捏合拆成 $n$ 步，第 $k$ 步对第 $k$ 个坐标投影 $P$ 与 $\mathbf{1}-P$ 作二元捏合。一次二元捏合是 $\sigma$ 与它的反射像 $R\sigma R$（$R=2P-\mathbf{1}$）的平均，所以这一步的熵增等于两者的量子詹森—香农散度；由冻结的二元霍列沃界，它不超过 $\frac12\lVert\sigma-R\sigma R\rVert_1=2\lVert P\sigma(\mathbf{1}-P)\rVert_1$。$P\sigma(\mathbf{1}-P)$ 的秩为一，它的迹范数是这一步删去的那段行向量的欧氏长度，不超过其中各元素的模之和；乘以 $2$ 即行与列合计。各步熵增伸缩求和成左端，右端合计不超过 $\sum_{i\neq j}\lvert\rho_{ij}\rvert$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-appe-pinching-entropy-upper title="熵增的上界，以及它为什么不能线性于相干质量（手工推导与文献结果）"}
**手工推导。**

1. $\Delta S\le\log m$。
2. $\Delta S\le T\log(d-1)+h(T)$，$T=\frac12\lVert X\rVert_1\le T':=\frac12\sqrt{\operatorname{rank}(X)\,c}$；$T'\le1-\frac1d$ 时可把 $T$ 换成 $T'$，因为 $T\mapsto T\log(d-1)+h(T)$ 在 $[0,1-\frac1d]$ 上递增。
3. 秩一基底捏合（$m=d$）：由 [@prop-appe-l1-coherence-bound] 与柯西—施瓦茨不等式，$\dfrac{\Delta S}{\ln2}\le\sum_{i\neq j}\lvert\rho_{ij}\rvert\le\sqrt{d(d-1)\,c}$。
4. 没有形如 $\Delta S\le Kc$ 的上界。纯态 $\psi=\sqrt{1-\epsilon}\,\lvert0\rangle+\sqrt\epsilon\,\lvert1\rangle$ 给出 $c=2\epsilon(1-\epsilon)$，$\Delta S=h(\epsilon)$；$\epsilon\to0$ 时 $\Delta S/c=\frac12\ln\frac2c+\frac12+o(1)\to\infty$。

推导：第 1 款由 [@rem-appe-pinching-exact-identities] 第 2 款推导中的 $\mathcal{P}(\rho)=\frac1m\sum_jU_j\rho U_j^*$ 与 $S(\sum_jq_j\rho_j)\le\sum_jq_jS(\rho_j)+H(q)$（`文献结果`）得到。第 2 款是奥德纳特的连续性界（`文献结果`），加上 $\lVert X\rVert_1\le\sqrt{\operatorname{rank}X}\,\lVert X\rVert_2$。第 3 款把 $d(d-1)$ 个非对角元的模用柯西—施瓦茨不等式与其平方和 $c$ 比较。

所以下界与 $c$ 同阶，已知的一般上界只有 $\sqrt{c}$ 的阶。单比特上 [@rem-appe-pinching-entropy-lower] 第 3 款给出精确的上端，它在 $c\to0$ 时是 $\frac c2\ln\frac2c+O(c)$；$d\ge3$ 时上界能否改成 $c\log\frac1c$ 的阶，本书没有处理。

**文献结果。** K. M. R. Audenaert, *J. Phys. A* **40**, 8127–8136 (2007)；熵的凹性的上述反向不等式见 M. A. Nielsen 与 I. L. Chuang, *Quantum Computation and Quantum Information*（Cambridge, 2000）第 11 章。[@prop-appe-l1-coherence-bound] 的不等式由 S. Rana、P. Parashar 与 M. Lewenstein 作为猜想提出：*Phys. Rev. A* **93**, 012110 (2016)，猜想 7。
:::

所以 `H8` 中“保单位捏合使熵不减”一项，在有限维中有了定量形式：熵增不小于丢弃的相干质量 $c$，已知的一般上界是 $\sqrt{c}$ 的阶，纯度的降低恰好等于 $c$。仍是输入的，是“粗粒化是保单位的捏合”这一选择本身；E.6 第 4 款的主动重置反例说明它不能省。

## E.8.3.4 有限步路径乘积：二次作用量的驻相是精确的 {#sec-appe-finite-step-path-product}

E.6 第 3 款把 $\delta S=0$ 记成要经过连续泛函测度与 $\hbar\to0$ 才得到的条件结论。这一小节看在有限步数上能保住多少。取 $\hbar=m=1$，$H=\frac12p^2+\frac12\omega^2x^2$，$V=\frac12\omega^2x^2$，$\varepsilon=t/N$，单步取

$$
U_\varepsilon=e^{-i\varepsilon V/2}\,e^{-i\varepsilon p^2/2}\,e^{-i\varepsilon V/2},
$$

它的核是梯形规则的短时核 $(2\pi i\varepsilon)^{-1/2}\exp i\left[\frac{(x-y)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{4}(x^2+y^2)\right]$，$U_\varepsilon^N$ 就是 $N$ 步路径乘积。

::: {.remark #rem-appe-oscillator-time-slicing title="谐振子的 N 步切片乘积，就是一个频率改过的谐振子（手工推导与文献结果）"}
**手工推导。** 设 $0<\varepsilon\omega<2$。令

$$
\cos\theta=1-\frac{\varepsilon^2\omega^2}{2},\quad 0<\theta<\pi,\qquad \tilde\Omega=\omega\sqrt{1-\frac{\varepsilon^2\omega^2}{4}},\qquad \tilde H=\frac12p^2+\frac12\tilde\Omega^2x^2,
$$

于是 $\sin\theta=\varepsilon\tilde\Omega$。记 $\tilde\varphi_n$ 为频率 $\tilde\Omega$ 的厄米函数，$\tilde a=(\sqrt{\tilde\Omega}\,x+ip/\sqrt{\tilde\Omega})/\sqrt2$，$\tilde n=\tilde a^\dagger\tilde a$。

1. 对一切 $n$，$U_\varepsilon\tilde\varphi_n=e^{-i\theta(n+\frac12)}\tilde\varphi_n$。所以在 $L^2(\mathbb{R})$ 上精确地有 $U_\varepsilon=\exp\left(-i\theta(\tilde n+\tfrac12)\right)=\exp\left(-i\frac{\theta}{\tilde\Omega}\tilde H\right)$。
2. $\sin N\theta\neq0$ 时，$U_\varepsilon^N$ 的核是频率 $\tilde\Omega$、角度 $\Theta=N\theta$ 的梅勒核

$$
K_N(x,y)=\left(\frac{\tilde\Omega}{2\pi\lvert\sin\Theta\rvert}\right)^{1/2}e^{-i\pi/4-i\pi\nu/2}\exp\left(\frac{i\tilde\Omega}{2\sin\Theta}\left[(x^2+y^2)\cos\Theta-2xy\right]\right),\qquad \nu=\left\lfloor\frac{\Theta}{\pi}\right\rfloor .
$$

3. 离散作用量

$$
S_N=\sum_{k=0}^{N-1}\frac{(x_{k+1}-x_k)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{2}\sum_{k=1}^{N-1}x_k^2-\frac{\varepsilon\omega^2}{4}\left(x_0^2+x_N^2\right)
$$

在 $x_0=y$、$x_N=x$ 时有唯一驻点 $\bar x$：

$$
\delta S_N=0\iff \bar x_k-\frac{\bar x_{k+1}+\bar x_{k-1}}{2}=(1-\cos\theta)\,\bar x_k,\qquad \bar x_k=\frac{y\sin((N-k)\theta)+x\sin(k\theta)}{\sin N\theta}.
$$

$S_N$ 对 $x_1,\dots,x_{N-1}$ 的黑塞矩阵 $Q$ 满足 $\det Q=\varepsilon^{-(N-1)}\dfrac{\sin N\theta}{\sin\theta}$，负特征值个数为 $\nu$，并且

$$
K_N(x,y)=(2\pi\varepsilon)^{-N/2}e^{-i\pi N/4}\,(2\pi)^{(N-1)/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}\,e^{iS_N(\bar x)} .
$$

右端正是驻相公式在驻点 $\bar x$ 处的主项，含前因子 $\lvert\det Q\rvert^{-1/2}$ 与马斯洛夫相位 $e^{-i\pi\nu/2}$。所以**在每个有限步数上，路径乘积精确等于驻相路径的贡献**，余项为零，不需要 $\hbar\to0$。离散的欧拉—拉格朗日方程说的是：每一步的矢高（中点偏离）等于 $1-\cos\theta=\frac{\varepsilon^2\omega^2}2$ 乘以位置。
4. 与连续时间的差：

$$
\frac{(\omega t)^3}{24N^2}\le\Theta-\omega t\le\frac{(\omega t)^3}{24N^2\left(1-(\omega t/2N)^2\right)},\qquad \frac{(\omega t)^2}{8N^2}\le1-\frac{\tilde\Omega}{\omega}\le\frac{(\omega t)^2}{4N^2},
$$

并且对施瓦茨函数 $\varphi$，记 $\varphi_s=e^{-isH}\varphi$，

$$
\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert\le(\Theta-\omega t)\,\lVert(\tilde n+\tfrac12)\varphi\rVert+t\left[\left(\frac{\omega}{\tilde\Omega}-1\right)\sup_{0\le s\le t}\tfrac12\lVert p^2\varphi_s\rVert+\omega(\omega-\tilde\Omega)\sup_{0\le s\le t}\tfrac12\lVert x^2\varphi_s\rVert\right],
$$

右端是 $O(N^{-2})$。

推导：第 1 款。三个因子的海森伯作用分别是 $p\mapsto p-\frac{\varepsilon\omega^2}2x$、$x\mapsto x+\varepsilon p$、$p\mapsto p-\frac{\varepsilon\omega^2}2x$，合起来 $U_\varepsilon^*(x,p)^{\mathsf T}U_\varepsilon=M_\varepsilon(x,p)^{\mathsf T}$，

$$
M_\varepsilon=\begin{pmatrix}\cos\theta&\varepsilon\\-\varepsilon\tilde\Omega^2&\cos\theta\end{pmatrix}=\begin{pmatrix}\cos\theta&\sin\theta/\tilde\Omega\\-\tilde\Omega\sin\theta&\cos\theta\end{pmatrix},
$$

恰是 $\tilde H$ 在时间 $\theta/\tilde\Omega$ 上的流。于是 $U_\varepsilon^*\tilde aU_\varepsilon=e^{-i\theta}\tilde a$，$U_\varepsilon$ 把 $\ker\tilde a=\mathbb{C}\tilde\varphi_0$ 映到自身，并且 $U_\varepsilon\tilde\varphi_n$ 比 $U_\varepsilon\tilde\varphi_0$ 多一个因子 $e^{-in\theta}$。基态的相位：把 $e^{-zx^2/2}$（$\operatorname{Re}z>0$）记作 $z$，踢一下把 $z$ 变为 $z+\frac{i\varepsilon\omega^2}2$；自由一步把 $e^{-zx^2/2}$ 变为 $(1+i\varepsilon z)^{-1/2}e^{-\frac{z}{1+i\varepsilon z}x^2/2}$（主分支；高斯函数的傅里叶变换）。从 $z_0=\tilde\Omega$ 出发，$z_1=\tilde\Omega+\frac{i\varepsilon\omega^2}2$，$1+i\varepsilon z_1=\cos\theta+i\sin\theta=e^{i\theta}$；用 $\tilde\Omega^2=\omega^2-\frac{\varepsilon^2\omega^4}4$ 展开可得 $z_1=(\tilde\Omega-\frac{i\varepsilon\omega^2}2)e^{i\theta}$，所以自由一步后为 $\tilde\Omega-\frac{i\varepsilon\omega^2}2$，再踢一下回到 $\tilde\Omega$，总相位为 $e^{-i\theta/2}$。厄米函数完备，即得算子等式。第 2 款是梅勒公式（`文献结果`）用于 $\exp(-i\Theta(\tilde n+\frac12))$。第 3 款：驻点方程由 $\partial S_N/\partial x_k=0$ 直接得到；$Q=\frac1\varepsilon(2\cos\theta\,\mathbf{1}-J)$，$J$ 是路径图的邻接矩阵，特征值为 $2\cos\frac{j\pi}N$（$1\le j\le N-1$），由此得行列式与负特征值个数 $\#\{j:j\pi/N<\theta\}=\nu$。对 $x_1,\dots,x_{N-1}$ 作高斯—菲涅耳积分（按高斯正则化理解；`文献结果`：非退化实二次型的这个积分等于驻点处的值乘 $(2\pi)^{n/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}$），并用 $(2\pi i\varepsilon)^{-1/2}=(2\pi\varepsilon)^{-1/2}e^{-i\pi/4}$。前因子的模是 $(2\pi)^{-1/2}\lvert\sin\theta/(\varepsilon\sin\Theta)\rvert^{1/2}=(\tilde\Omega/(2\pi\lvert\sin\Theta\rvert))^{1/2}$，相位是 $e^{-i\pi N/4}e^{i\pi(N-1-2\nu)/4}=e^{-i\pi/4-i\pi\nu/2}$；指数与第 2 款相同，因为两者都是同一个算子的核。第 4 款：$f(u)=\arcsin u-u$ 满足 $\frac{u^2}2\le f'(u)\le\frac{u^2}{2(1-u^2)}$，$\Theta-\omega t=2Nf(\frac{\omega t}{2N})$；$1-\sqrt{1-y}\in[\frac y2,y]$。态的估计：插入 $e^{-i\omega t(\tilde n+\frac12)}=e^{-i(\omega t/\tilde\Omega)\tilde H}$，第一段用谱定理与 $\lvert e^{-ia}-e^{-ib}\rvert\le\lvert a-b\rvert$，第二段用杜阿梅尔公式与 $\frac{\omega}{\tilde\Omega}\tilde H-H=\left(\frac{\omega}{\tilde\Omega}-1\right)\frac{p^2}2-\omega(\omega-\tilde\Omega)\frac{x^2}2$。

**数值核验（`NUM`）。** 在 $4096$ 点网格上用快速傅里叶变换实现 $U_\varepsilon$：$\varepsilon\omega=0.3,1,1.9$ 时 $\lVert U_\varepsilon\tilde\varphi_n-e^{-i\theta(n+\frac12)}\tilde\varphi_n\rVert\le4\times10^{-15}$（$n<6$），而频率 $\omega$ 的基态不是本征向量（去掉最佳倍数后残差 $2.4\times10^{-3}$、$8.8\times10^{-2}$、$0.49$）；$U_\varepsilon^N$ 作用于高斯波包与第 2 款的核积分之差不超过 $6\times10^{-15}$，所测情形的 $\nu$ 从 $0$ 到 $19$；第 3 款的组装在随机点上与第 2 款一致到 $2\times10^{-13}$，负特征值计数全部吻合。$t=3$、中心在 $x=1$ 的相干态上 $N^2\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert$ 在 $N=8$ 到 $128$ 之间稳定在 $1.51$，并且始终低于第 4 款的界（例如 $N=128$ 时 $9.2\times10^{-5}\le5.3\times10^{-4}$）。

**文献结果。** 斯特默—韦尔莱积分子对线性振子的修正哈密顿量与稳定条件 $\varepsilon\omega<2$：E. Hairer、C. Lubich 与 G. Wanner, *Geometric Numerical Integration*, 2nd ed.（Springer, 2006）。时间切片谐振子与角度 $\theta$（$2\sin\frac\theta2=\varepsilon\omega$）：H. Kleinert, *Path Integrals in Quantum Mechanics, Statistics, Polymer Physics, and Financial Markets*, 5th ed.（World Scientific, 2009）；该书的切片约定未与这里的梯形约定逐项核对。元辛表示的背景：G. B. Folland, *Harmonic Analysis in Phase Space*（Princeton, 1989）。
:::

第 3 款里的 $1-\cos\theta$ 正是 E.8.1.1 的矢高，它也决定时间步能取多大。

::: {.example #ex-appe-time-step-trichotomy title="时间步的矢高：椭圆、抛物、双曲三种切片（手工推导与数值核验）"}
**手工推导。** 单步矩阵 $M_\varepsilon=\begin{pmatrix}1-\frac{\varepsilon^2\omega^2}2&\varepsilon\\-\varepsilon\omega^2\left(1-\frac{\varepsilon^2\omega^2}4\right)&1-\frac{\varepsilon^2\omega^2}2\end{pmatrix}$（对一切 $\varepsilon\omega>0$ 均有 $\det M_\varepsilon=1$）的求同读数是 $\frac12\operatorname{tr}M_\varepsilon=1-v$，矢高 $v=\frac{\varepsilon^2\omega^2}2$。按 E.8.1.1 的表：$0<\varepsilon\omega<2$ 时 $0<v<2$，椭圆，$M_\varepsilon^n$ 有界；$\varepsilon\omega=2$ 时 $v=2$，$M_\varepsilon=\begin{pmatrix}-1&\varepsilon\\0&-1\end{pmatrix}$，抛物，$M_\varepsilon^n=(-1)^n\begin{pmatrix}1&-n\varepsilon\\0&1\end{pmatrix}$ 线性增长；$\varepsilon\omega>2$ 时 $v>2$，双曲，指数增长。$U_\varepsilon$ 始终是幺正的；增长的是位置与动量的弥散，所以时间步须满足 $\varepsilon\omega<2$，切片乘积才保持它们有界。

**数值核验（`NUM`）。** 取 $\omega=1$：$\varepsilon=1.9$ 时 $\lVert M_\varepsilon^n\rVert$ 在 $n=10,100,1000$ 处为 $1.10$、$2.26$、$1.95$；$\varepsilon=2$ 时为 $20.05$、$200$、$2000$；$\varepsilon=2.1$ 时为 $9.4\times10^2$、$3.9\times10^{27}$、$6.0\times10^{273}$。
:::

二次作用量之外，有限步上不再有这样的精确等式。剩下的是一维的抵消界：没有驻点的一段，无论多长，贡献都有界。

::: {.remark #rem-appe-oscillatory-cancellation-bounds title="没有驻点的一段相互抵消：一维振荡积分与振荡和的显式界（手工推导与文献结果）"}
**手工推导。** 设 $\lambda>0$。

1. $\varphi\in C^2[a,b]$，$\varphi'$ 单调，$\lvert\varphi'\rvert\ge\mu>0$：$\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{3}{\lambda\mu}$。
2. $\varphi\in C^2[a,b]$，$\lvert\varphi''\rvert\ge\mu>0$：$\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{4\sqrt3}{\sqrt{\lambda\mu}}$。
3. $A<B$ 为整数，$f\in C^1[A,B]$，$f'$ 单调，且有整数 $m$ 与 $0<\delta\le\frac12$ 使 $m+\delta\le f'\le m+1-\delta$：$\left\lvert\sum_{n=A}^{B-1}e^{2\pi if(n)}\right\rvert\le\cot\dfrac{\pi\delta}{2}$，与项数无关。

推导：第 1 款，分部积分 $\int e^{i\lambda\varphi}=\left[\frac{e^{i\lambda\varphi}}{i\lambda\varphi'}\right]_a^b-\int e^{i\lambda\varphi}\left(\frac{1}{i\lambda\varphi'}\right)'$，边界项不超过 $\frac2{\lambda\mu}$；由单调性，积分项不超过 $\frac1\lambda\left\lvert\frac1{\varphi'(b)}-\frac1{\varphi'(a)}\right\rvert\le\frac1{\lambda\mu}$。第 2 款：$\varphi'$ 严格单调，$\{\lvert\varphi'\rvert<\eta\}$ 是长度不超过 $\frac{2\eta}{\mu}$ 的区间，其余至多两个区间上 $\lvert\varphi'\rvert\ge\eta$，由第 1 款各不超过 $\frac3{\lambda\eta}$；总和 $\frac6{\lambda\eta}+\frac{2\eta}\mu$ 在 $\eta=\sqrt{3\mu/\lambda}$ 处最小。第 3 款：$g_n=f(n+1)-f(n)\in[m+\delta,m+1-\delta]$ 关于 $n$ 单调。令 $c_n=\left(e^{2\pi ig_n}-1\right)^{-1}=-\frac12-\frac i2\cot\pi g_n$，则 $e^{2\pi if(n)}=c_n\left(e^{2\pi if(n+1)}-e^{2\pi if(n)}\right)$。阿贝尔求和给出上界 $\lvert c_A\rvert+\lvert c_{B-1}\rvert+\sum_{n=A+1}^{B-1}\lvert c_n-c_{n-1}\rvert$；$\lvert c_n\rvert\le\frac1{2\sin\pi\delta}$，后一和由单调性伸缩为 $\frac12\lvert\cot\pi g_{B-1}-\cot\pi g_A\rvert\le\cot\pi\delta$；合计 $\frac{1+\cos\pi\delta}{\sin\pi\delta}=\cot\frac{\pi\delta}2$。

这些都是一维的；$N$ 步乘积是 $N-1$ 维的积分，常数随维数的行为要另作估计。

**数值核验（`NUM`）。** 随机相位与随机二次振荡和上，积分与第 1、2 款上界之比的最大值为 $0.57$ 与 $0.45$，和与第 3 款上界之比的最大值为 $0.97$。

**文献结果。** 第 1、2 款是范德科尔普特引理，常数见 E. M. Stein, *Harmonic Analysis*（Princeton, 1993）第 8 章（那里第 $k$ 阶的常数为 $5\cdot2^{k-1}-2$；这里第 2 款的 $4\sqrt3<8$）。第 3 款是库斯明—朗道不等式：L. J. Mordell, *Acta Arith.* **4**, 3–9 (1958)；S. W. Graham 与 G. Kolesnik, *Van der Corput's Method of Exponential Sums*（Cambridge, 1991）。
:::

剩下的是连续时间极限。

::: {.remark #rem-appe-path-integral-remaining-inputs title="连续时间极限还缺什么（文献结果，未在本书形式化；OPEN）"}
**文献结果，未在本书形式化。**

1. 固定 $\hbar$ 时，在算子层面不需要路径测度：若 $H_0=\frac12p^2$ 与 $V$ 使 $H_0+V$ 在 $D(H_0)\cap D(V)$ 上本质自伴，则 $\left(e^{-itV/N}e^{-itH_0/N}\right)^N\to e^{-itH}$（强收敛）。H. F. Trotter, *Proc. Amer. Math. Soc.* **10**, 545–551 (1959)；E. Nelson, *J. Math. Phys.* **5**, 332–343 (1964)。冻结的 [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) 是巴拿赫代数中有界元的版本，不覆盖 $p^2$。
2. 在路径空间上，不存在具有有界全变差的可数可加复测度来表示 $e^{iS}\mathcal{D}x$：R. H. Cameron, *J. Math. and Phys.* **39**, 126–140 (1960)。所以 E.6 与 E.7 中的“连续泛函测度”应读作“时间切片振荡积分的极限”，而不是这样一个测度。
3. 对非二次的势：时间切片积分的收敛与基本解的构造，D. Fujiwara, *J. Analyse Math.* **35**, 41–96 (1979) 与 *Duke Math. J.* **47**, 559–600 (1980)；大维数空间上带余项估计的驻相法，D. Fujiwara, *Nagoya Math. J.* **124**, 61–97 (1991)；专著 *Rigorous Time Slicing Approach to Feynman Path Integrals*（Springer, 2017）。这些结果对势所加的条件本书没有逐项核对。

所以 $\delta S=0$ 选路在有限步上只对二次作用量是精确的（[@rem-appe-oscillator-time-slicing]）；一般作用量只有关于 $\hbar$ 的渐近陈述，一维有 [@rem-appe-oscillatory-cancellation-bounds] 的显式界，多维依赖第 3 款的文献。

**OPEN。** $3+1$ 维相互作用场论没有上述任何一条的对应定理；这一项仍按 E.7 的 `H9` 标为开放。
:::

## E.8.3.5 复结构、交换符号与估值：三项输入的精确形状 {#sec-appe-complex-exchange-valuation}

E.8.2.3 之后台账仍把三项写成单纯的输入：`H7` 的中心复结构与交换扇区，以及 `H4` 的估值选择。本小节把第一项写成一条关于生成元与读数的条件，把第二项放到配置空间上，把第三项写成一条有界性判据；三项都仍是输入。

下面的代数取有限直和 $\mathcal{A}=M_{n_1}(F_1)\oplus\cdots\oplus M_{n_m}(F_m)$，$F_k\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$，$n_k\ge1$，对合取逐块的共轭转置。记 $\operatorname{Sa}(\mathcal{A})=\{a:a^*=a\}$（求同部分），$\operatorname{Skew}(\mathcal{A})=\{a:a^*=-a\}$（求异部分），$U(\mathcal{A})=\{u:u^*u=uu^*=\mathbf{1}\}$（公平元）。$a=\frac12(a+a^*)+\frac12(a-a^*)$ 就是 E.8.1.1 的 $S$ 与 $A$。

::: {.remark #rem-appe-agreement-difference-count title="求同部分与求异部分的维数：单个矩阵代数中只在复情形相等（手工推导）"}
**手工推导。** 记 $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$。$M_n(F)$ 中自伴矩阵的对角元是实数，反自伴矩阵的对角元是纯虚的（每个 $d-1$ 个参数），每对 $i<j$ 在两种情形下都有一个 $F$ 中的自由元。所以

$$
\dim\operatorname{Sa}=K_d(n)=n+d\cdot\frac{n(n-1)}{2},\qquad \dim\operatorname{Skew}=dn^2-K_d(n),\qquad \dim\operatorname{Sa}-\dim\operatorname{Skew}=(2-d)\,n,
$$

$K_d$ 是 [@rem-appe-tomography-count] 的计数函数。实、复、四元数三种情形的差分别为 $n$、$0$、$-2n$，与那里的复合缺额 $\frac{d(2-d)}4a(a-1)b(b-1)$ 带着同一个因子 $2-d$。对直和，维数相等不再说明问题：$M_2(\mathbb{R})\oplus\mathbb{H}$ 中 $\dim\operatorname{Sa}=3+1=4=1+3=\dim\operatorname{Skew}$，而两个直和项都不是复的。
:::

E.8.2.2 中生成一族公平元的是求异部分（弦率 $-iH$），读出的是求同部分（$H$）；在复量子理论里两者由乘以 $i$ 一一对应，且这个对应不随换架而变。下一条把它写成一条在直和上也适用的条件。

::: {.remark #rem-appe-generator-reading-dictionary title="生成元—读数词典存在，当且仅当中心里有直角比较（手工推导与数值核验）"}
**手工推导。** 称实线性双射 $\Phi:\operatorname{Skew}(\mathcal{A})\to\operatorname{Sa}(\mathcal{A})$ 为**协变词典**，若对一切 $u\in U(\mathcal{A})$ 与 $x\in\operatorname{Skew}(\mathcal{A})$ 有 $\Phi(uxu^*)=u\,\Phi(x)\,u^*$。以下四条等价：

1. 存在协变词典；
2. $\mathcal{A}$ 的中心含有 $J$，满足 $J^*=-J$，$J^2=-\mathbf{1}$；
3. 每个 $F_k=\mathbb{C}$；
4. 中心里求异部分与求同部分的维数相等。

成立时这样的 $J$ 恰为 $(\pm i\mathbf{1}_1,\dots,\pm i\mathbf{1}_m)$，共 $2^m$ 个，$\Phi(x)=Jx$ 是协变词典。$\mathcal{A}=M_n(\mathbb{C})$ 时，协变的实线性映射恰为 $\Phi(x)=J\bigl(\alpha x+\gamma\operatorname{tr}(x)\mathbf{1}\bigr)$，$\alpha,\gamma\in\mathbb{R}$，$\operatorname{tr}$ 为复迹；$n\ge2$ 时它是双射当且仅当 $\alpha\neq0$ 且 $\alpha+n\gamma\neq0$，$n=1$ 时当且仅当 $\alpha+\gamma\neq0$。$m\ge2$ 时词典不唯一：不同直和项的中心部分之间可以任意实线性地混合。

推导。(a) $U(M_n(F))$ 的实线性张成是 $M_n(F)$：张成对乘法封闭，含对角元取 $F$ 中单位元的对角阵（它们张成全部对角阵）与置换阵，置换阵乘对角矩阵单位给出每个 $qE_{ij}$；直和中 $(1,\dots,u_k,\dots,1)$ 与 $(-1,\dots,u_k,\dots,-1)$ 的平均是 $(0,\dots,u_k,\dots,0)$。所以与一切公平元对易的元素恰为中心元素。(b) $M_n(F)$ 的中心是 $Z(F)\mathbf{1}$，而 $Z(\mathbb{R})=\mathbb{R}$，$Z(\mathbb{C})=\mathbb{C}$，$Z(\mathbb{H})=\mathbb{R}$；所以中心里求同部分有 $m$ 维，求异部分的维数是复直和项的个数。

- **2⇒1。** $J$ 居中且 $J^*=-J$ 时 $(Jx)^*=x^*J^*=xJ=Jx$，$x\mapsto Jx$ 把求异部分送到求同部分，逆映射是 $y\mapsto-Jy$，并且 $J\,uxu^*=u\,Jx\,u^*$。
- **1⇒4。** 由协变性，$x$ 被一切共轭固定时 $\Phi(x)$ 也被固定；反之由单射。所以 $\Phi$ 把两边的固定子空间互相映满，由 (a) 它们是中心里的两部分。
- **4⇒3⇒2。** 由 (b)，第 4 条说 $m$ 等于复直和项的个数；此时取 $J=(i\mathbf{1}_1,\dots,i\mathbf{1}_m)$。中心里的求异元素逐项在 $i\mathbb{R}\mathbf{1}_k$ 中，$J^2=-\mathbf{1}$ 迫使每项为 $\pm i$。
- **$M_n(\mathbb{C})$ 的协变映射。** 令 $L(h)=\Phi(-Jh)$，它是 $\operatorname{Sa}$ 到自身的协变映射。实对角阵 $D$ 被对角公平元固定，所以 $L(D)$ 与它们全体对易，是实对角阵；$L$ 在实对角阵上与置换对易，所以 $L(D)=\alpha D+\gamma\operatorname{tr}(D)\mathbf{1}$。任一 $h=uDu^*$，故 $L(h)=\alpha h+\gamma\operatorname{tr}(h)\mathbf{1}$；$L$ 在无迹部分上乘 $\alpha$，在 $\mathbf{1}$ 上乘 $\alpha+n\gamma$。

**数值核验（`NUM`）。** 把各代数实现为实矩阵代数，用随机公平元与逐块反射写出协变条件，求解空间：$M_n(\mathbb{C})$ 在 $n=1$ 时 $1$ 维，$n=2,3,4$ 时 $2$ 维，含可逆解；$M_n(\mathbb{R})$、$M_n(\mathbb{H})$（$n\le4$）、$\mathbb{R}\oplus\mathbb{C}$、$\mathbb{R}\oplus\mathbb{H}$、$M_2(\mathbb{R})\oplus\mathbb{H}$、$M_3(\mathbb{R})\oplus\mathbb{H}\oplus\mathbb{H}$ 没有可逆解；$\mathbb{C}\oplus\mathbb{C}$、$M_2(\mathbb{C})\oplus\mathbb{C}$、$M_2(\mathbb{C})\oplus M_2(\mathbb{C})$ 的解空间为 $4$、$5$、$6$ 维，含可逆解。
:::

所以 `H7` 中的“中心复结构”可以换一种说法（`MODEL`）：**每个求异部分配有一个求同读数，这个对应线性、可逆，并且不随公平元所作的换架而变。**

::: {.remark #rem-appe-dictionary-independence title="词典不由条款 I–IV 与正性条件推出，并给出 H4 的复载体（手工推导与文献结果）"}
**手工推导。**

1. **满足全部条款而没有词典的模型。** 对 $F=\mathbb{R}$ 或 $\mathbb{H}$，取 $X=U(M_n(F))$（即 $\mathrm{O}(n)$ 或 $\mathrm{Sp}(n)$），$\mathcal{A}=M_n(F)$，$\mathrm{CMP}(x,y)=x^*y$。条款 II：$\mathrm{CMP}(x,y)^*=y^*x=\mathrm{CMP}(y,x)$；条款 III：$x^*y\,y^*x=\mathbf{1}$；条款 IV：$x^*y\,y^*z=x^*z$；条款 I：$\mathrm{CMP}(x,\mathbf{1})=\mathrm{CMP}(y,\mathbf{1})$ 已给出 $x=y$。正性条件：$\operatorname{Re}\operatorname{tr}(a^*a)=\sum_{i,j}\lvert a_{ij}\rvert^2$，所以 $a^*a=-t\mathbf{1}$（$t\ge0$）迫使 $-tn\ge0$，$t=0$，$a=0$。由 [@rem-appe-generator-reading-dictionary]，这两族模型没有协变词典。
2. **它不是“计数相乘”。** 交换代数 $\mathbb{R}^n$（[@rem-appe-tomography-count] 中的 $d=0$）计数相乘，而 $\operatorname{Skew}=0$，没有词典。只在单个矩阵代数（$n\ge2$）之内，计数相乘、两部分维数相等、存在协变词典三者选出的都是复数。
3. **复载体。** 设 $\mathcal{A}$ 的中心含 $J$（$J^*=-J$，$J^2=-\mathbf{1}$），$\pi$ 是 $\mathcal{A}$ 在有限维实内积空间 $V$ 上的保单位 $*$-表示（$\pi(a^*)=\pi(a)^{\mathsf T}$）。则 $R=\pi(J)$ 满足 $R^{\mathsf T}=-R$，$R^2=-I$，并与全体 $\pi(a)$ 对易；于是 $V$ 以 $R$ 为 $i$ 成为复向量空间，$\pi(\mathcal{A})$ 复线性地作用，且 $(\det R)^2=(-1)^{\dim V}$ 迫使 $\dim V$ 为偶数。这是 [@rem-appe-arithmetic-chain] 第 3 款的偶数实维与复载体。
4. **$J$ 的符号。** 每个直和项上 $J$ 只定到符号：$M_n(\mathbb{C})$ 上逐元复共轭是 $*$-自同构，把 $i\mathbf{1}$ 换成 $-i\mathbf{1}$。[@rem-appe-real-realizability-return-phase] 第 5 款用的是同一个复共轭：它保持两两求同读数，改变 $D$ 的符号。

**文献结果。** Stueckelberg（1960，*Helv. Phys. Acta* 33, 727）由不确定关系论证实希尔伯特空间上的量子理论须带一个与全体可观测量对易的复结构，从而与复量子理论等价；Moretti 与 Oppio 由庞加莱对称性得到一个与全体可观测量对易、到符号为止唯一的复结构（2017，*Rev. Math. Phys.* 29, 1750021；四元数情形见 2019，同刊 31, 1950013）。在一般概率理论中，Barnum、Müller 与 Ududec（2014，*New J. Phys.* 16, 123029）的三条公设留下实、复、四元数量子理论等候选，再加“能量可观测”只留下复量子理论。有限维实 $C^*$-代数在 $*$-同构意义下恰为上述直和，这是经典结果；本注记只用给定的直和，不依赖它。区分实与复量子理论的网络实验（Renou 等 2021，*Nature* 600, 625；Chen 等 2022 与 Li 等 2022，*Phys. Rev. Lett.* 128, 040403 与 040402）比较的是独立源网络中实与复的张量积复合，见[附录 D](appendix-d.md)；它们不涉及单个系统上的词典。
:::

交换扇区在配置空间上有一个精确的位置。两个全同对象在 $\mathbb{R}^d$ 中的位形，去掉质心以后是相对向量 $r\neq0$，并把 $r$ 与 $-r$ 认作同一个位形。

::: {.remark #rem-appe-exchange-configuration-space title="交换回路不被三角形填满：配置空间只留下一个符号（手工推导与文献结果）"}
**手工推导。** 记 $P_d=(\mathbb{R}^d\setminus\{0\})/\{r\sim-r\}$。$r\mapsto r/\lvert r\rvert$ 与对径映射相容，把 $P_d$ 形变收缩到 $S^{d-1}/\{\pm1\}=\mathbb{RP}^{d-1}$。

1. $d=1$：$P_1\cong(0,\infty)$（取 $\lvert r\rvert$），可缩；不碰撞就没有交换的路径。
2. $d=2$：$\mathbb{RP}^1\cong S^1$（角度加倍），基本群为 $\mathbb{Z}$，由转半圈 $\varphi\in[0,\pi]$ 生成；一维酉特征标为 $e^{i\alpha}$，$\alpha$ 任意。
3. $d\ge3$：$S^{d-1}$ 单连通，对径映射无不动点，$S^{d-1}\to\mathbb{RP}^{d-1}$ 是二叶万有覆叠，基本群为 $\mathbb{Z}/2$。交换回路（$r$ 沿半个大圆走到 $-r$）提升为不闭合的路径，所以是非平凡元；走两次是整个大圆，在 $S^{d-1}$ 中可缩。一维酉特征标满足 $\chi^2=1$，只有 $\pm1$。

用 [@rem-appe-triangle-simple-connectivity] 的语言（`MODEL`）：沿路径输运的 $\mathrm{U}(1)$ 值比较若在每个可缩回路上平凡，就是平坦的；$d\ge3$ 时交换回路不可缩，不被三角形填满，平坦性留下它的取值 $\pm1$ 不定。这是配置空间上的“条款 I 去掉标签而不选扇区”（[@rem-appe-swap-sagitta]）。

**文献结果。** 全同粒子的路径积分权重构成基本群的一维表示，见 Laidlaw–DeWitt（1971，*Phys. Rev. D* 3, 1375）；二维允许任意相位，见 Leinaas–Myrheim（1977，*Nuovo Cimento B* 37, 1）。$\mathbb{RP}^{d-1}$ 的基本群是标准的覆叠空间计算。三个以上的对象在 $d\ge3$ 时基本群为对称群 $S_N$，它还有高维不可约表示（仲统计），本注记不讨论。
:::

符号能否由一个构造选出？下面重做一个经典构造，看 $(-1)^{2S}$ 在哪一步出现。

::: {.example #ex-appe-berry-robbins-transport title="两个自旋 S 的输运基：交换符号在哪一步出现（手工推导与数值核验）"}
**手工推导。** 用施温格表示：对象 1 的自旋 $S$ 用两个振子 $a_1,a_2$ 中的 $2S$ 个量子，对象 2 用 $b_1,b_2$ 中的 $2S$ 个量子。在四个振子共 $N=4S$ 个量子的空间中定义交换 $\mathrm{SU}(2)$ 的生成元

$$
K_x=\frac12\sum_{i}\bigl(a_i^\dagger b_i+b_i^\dagger a_i\bigr),\qquad K_y=-\frac{i}{2}\sum_{i}\bigl(a_i^\dagger b_i-b_i^\dagger a_i\bigr),\qquad K_z=\frac12\sum_{i}\bigl(a_i^\dagger a_i-b_i^\dagger b_i\bigr).
$$

物理的双自旋空间 $\mathcal{P}$ 是 $K_z=0$ 的部分，维数 $(2S+1)^2$。$E$ 记交换 $a_i\leftrightarrow b_i$，即两个自旋对换。

1. **$\pi$ 转动等于对换乘一个数。** 在每个双重态 $(a_i^\dagger,b_i^\dagger)$ 上 $K_x$ 作用为 $\frac12\sigma_x$，而 $e^{-i\pi\sigma_x/2}=-i\sigma_x$：每个产生算子被对换并乘以 $-i$。所以在 $N$ 个量子的空间上 $e^{-i\pi K_x}=(-i)^NE$，$N=4S$ 时这个数是 $(-1)^{2S}$。
2. **输运基。** 对 $r=(\theta,\varphi)\in S^2$ 令 $n_\varphi=(-\sin\varphi,\cos\varphi,0)$，$U(r)=\exp(-i\theta\,n_\varphi\cdot K)$，$\lvert M(r)\rangle=U(r)\lvert M\rangle$，$\lvert M\rangle\in\mathcal{P}$。在 $\theta=\pi$ 处 $\varphi$ 不定，但 $U(r)\lvert M\rangle=e^{-i\gamma K_z}e^{-i\pi K_x}\lvert M\rangle$（$\gamma=\varphi+\frac\pi2$），$e^{-i\pi K_x}\lvert M\rangle\in\mathcal{P}$ 而绕 $K_z$ 的转动在 $\mathcal{P}$ 上是恒等，所以 $\lvert M(r)\rangle$ 只依赖 $r$。
3. **交换性质。** $-r=(\pi-\theta,\varphi+\pi)$，$n_{\varphi+\pi}=-n_\varphi$，故 $U(r)^{-1}U(-r)=\exp(i\pi\,n_\varphi\cdot K)=e^{-i\gamma K_z}e^{i\pi K_x}e^{i\gamma K_z}$。在 $\mathcal{P}$ 上两个 $K_z$ 因子都是恒等，$e^{i\pi K_x}=i^NE$，于是

   $$
   \lvert M(-r)\rangle=(-1)^{2S}\,\lvert EM(r)\rangle .
   $$

4. **平行输运。** $U^{-1}dU$ 落在 $i\operatorname{span}\{K_x,K_y,K_z\}$ 中；$K_x,K_y$ 把 $K_z$ 改变 $\pm1$，$K_z$ 在 $\mathcal{P}$ 上为零，所以 $\langle M'(r)\rvert d\lvert M(r)\rangle=0$。
5. **单值性给出符号。** 设 $\Psi(r)=\sum_M\psi_M(r)\lvert M(r)\rangle$ 并要求 $\Psi(-r)=\Psi(r)$，则 $\psi_{EM}(-r)=(-1)^{2S}\psi_M(r)$。

注意两点。第一，$r\neq\pm\hat z$ 时 $\lvert M(r)\rangle$ 一般不在 $\mathcal{P}$ 中：它们住在四个振子 $4S$ 个量子的更大空间里。第二，每个量子上的因子 $-i\sigma_x$ 平方为 $-\mathbf{1}$，是一个直角旋子；符号是 $4S$ 个这样的因子之积。它不是 [@rem-appe-half-comparison-holonomy] 的半比较 $r(u)$：$r(u)$ 只对求同读数 $s>-1$ 定义，而 $-\mathbf{1}$ 的求同读数是 $-1$。$(-1)^{2S}$ 与单个自旋 $S$ 转 $2\pi$ 的符号 $e^{-2\pi iS_z}=(-1)^{2S}$ 数值相同，构造并没有从别处推出这一相同。

**数值核验（`NUM`）。** $S=\frac12,1,\frac32$（$N=2,4,6$）：$\lVert e^{-i\pi K_x}-(-i)^NE\rVert_{\max}\le7\times10^{-16}$；$200$ 个随机方向上第 3 款的残差 $\le1.3\times10^{-15}$，换成相反符号残差 $\ge0.9$；第 4 款的中心差分残差 $\le6\times10^{-10}$。
:::

::: {.remark #rem-appe-spin-statistics-inputs title="输运基不选符号；自旋—统计仍是输入（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@ex-appe-berry-robbins-transport] 是 Berry–Robbins（1997，*Proc. R. Soc. Lond. A* 453, 1771）的构造：交换转动的转轴取 $e_3\times r$，作用在施温格表示的更大空间上，给出交换规则 $\lvert M(-r)\rangle=(-1)^{2S}\lvert EM(r)\rangle$ 与平行输运条件（这里的对照依据 Papadopoulos 与 Reyes-Lega 2010，*Found. Phys.* 40, 829 的转述）。Berry 与 Robbins（2000，*J. Phys. A* 33, L207）描述了满足他们全部先前要求而给出相反交换符号的构造，例如在施温格表示中把对易子换成反对易子，并提出这些构造或许不可接受的理由。对 $S=\frac12$ 用费米振子重做 [@ex-appe-berry-robbins-transport] 第 1 款，得 $e^{-i\pi K_x}a_i^\dagger b_j^\dagger\lvert0\rangle=+a_j^\dagger b_i^\dagger\lvert0\rangle$，交换规则的符号为 $+1$（`NUM`）。单值性要求 $\Psi(-r)=\Psi(r)$ 在 Berry–Robbins 所主张的形式下也受到质疑（Reyes-Lega 2011，*J. Phys. A* 44, 325308）。自旋与统计的联系来自相对论局域量子场论：Fierz（1939）、Pauli（1940，*Phys. Rev.* 58, 716）、Lüders–Zumino（1958，*Phys. Rev.* 110, 1450）、Burgoyne（1958，*Nuovo Cimento* 8, 607）。比较公理不推出它。
:::

所以交换一项的输入有了精确的形状：$d\ge3$ 时交换回路只能带 $\pm1$，平坦的比较不选其中哪一个；施温格输运基把符号写成 $4S$ 个直角旋子之积，而同类构造也给出相反的符号。

最后是估值。E.8.1.1 用“整数次幂有界”刻画椭圆一行（[@rem-appe-bounded-recurrence]）；奥斯特洛夫斯基分岔也有一条同样形式的判据。

::: {.remark #rem-appe-bounded-integers-ultrametric title="整数倍有界当且仅当超度量：两行的估值表（手工推导与文献结果）"}
**手工推导。** 设 $\lvert\cdot\rvert$ 是域 $K$ 上的绝对值（乘性、满足三角不等式、仅在 $0$ 处为零）。以下三条等价：

1. $\{\lvert n\cdot1\rvert:n\in\mathbb{Z}\}$ 有界；
2. 对一切整数 $n$，$\lvert n\cdot1\rvert\le1$；
3. 强三角不等式 $\lvert x+y\rvert\le\max(\lvert x\rvert,\lvert y\rvert)$ 对一切 $x,y$ 成立。

推导：3⇒2 对 $n$ 归纳，$\lvert n+1\rvert\le\max(\lvert n\rvert,1)$，再用 $\lvert-1\rvert=1$。2⇒1 显然。1⇒2：$\lvert n\rvert^k=\lvert n^k\rvert$ 对一切 $k$ 有界，只能 $\lvert n\rvert\le1$。2⇒3：由二项式展开与第 2 条，$\lvert x+y\rvert^k\le\sum_{j=0}^{k}\lvert\binom kj\rvert\,\lvert x\rvert^j\lvert y\rvert^{k-j}\le(k+1)\max(\lvert x\rvert,\lvert y\rvert)^k$，开 $k$ 次方后令 $k\to\infty$。

强三角不等式下，若 $\lvert x\rvert>\lvert y\rvert$，则 $\lvert x+y\rvert\le\lvert x\rvert$，而 $\lvert x\rvert\le\max(\lvert x+y\rvert,\lvert y\rvert)$ 迫使 $\lvert x\rvert\le\lvert x+y\rvert$，所以 $\lvert x+y\rvert=\lvert x\rvert$。因此以 $x-y$、$y-z$、$x-z$ 为边的三角形，最长的两条边相等。

| 整数的绝对值 | 三角不等式 | $\mathbb{Q}$ 上的非平凡绝对值 |
| :--- | :--- | :--- |
| 有界（$\le1$） | 强三角不等式，三角形都等腰 | 等价于某个 $\lvert\cdot\rvert_p$ |
| 无界 | 普通三角不等式 | 等价于 $\lvert\cdot\rvert_\infty$ |

与 [@rem-appe-bounded-recurrence] 相同的只有判据的形式：那里一个比较的求异部分满足正性条件，当且仅当它的整数次幂有界；这里绝对值是超度量，当且仅当每个整数的各次幂的绝对值有界。不同之处有三：乘性使 $\lvert n^k\rvert=\lvert n\rvert^k$ 要么有界、要么指数增长，没有对应抛物一行的线性增长；在 $\mathbb{Q}$ 上，无界一行中正整数按幂次增长，$\lvert n\rvert=n^\alpha$，$0<\alpha\le1$；有界一行给出 $\mathbb{Q}_p$，而 E.8.1.1 的椭圆转动与 $\mathbb{C}$ 在无界的阿基米德一行之上。所以两张表共享的是判据，不是对象。

**文献结果。** 等价 1⇔2⇔3 是经典的；其中 2⇔3（$n$ 取自然数）对赋范除环在 Mathlib 中是 `isUltrametricDist_iff_forall_norm_natCast_le_one`（未在上游库冻结）。表中最后一列来自冻结定理 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]；Ostrowski 1916，*Acta Math.* 41, 271）：$\mathbb{Q}$ 上非平凡绝对值等价于 $\lvert\cdot\rvert_\infty$ 或唯一一个 $\lvert\cdot\rvert_p$，而前者在整数上无界、后者在整数上不超过 $1$，等价保持有界与否；无界一行的形式 $\lvert n\rvert=n^\alpha$ 是同一分类的经典表述。两行的标准绝对值满足乘积公式 $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p=1$（$x\in\mathbb{Q}$，$x\neq0$），即冻结定理 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（[@thm-ch36-crt-and-adelic-product-formula]）。
:::

三条都不减少输入：实与四元数矩阵代数满足条款 I–IV 与正性条件而没有词典；交换回路的两个特征标都与平坦性相容；估值的两行都由冻结分类给出，比较的条款不在其间选择。

## E.8.3.6 台账改了什么 {#sec-appe-reduced-ledger}

::: {.remark #rem-appe-reduced-ledger title="E.8 之后的台账（对 [@rem-appe-master-audit-table] 的补充）"}
**补充审计（`MODEL` + `手工推导`，定理盒部分对应冻结定理）。** 下表只列发生变化的条目；`H1` 的处理机制与 [@rem-appe-master-audit-table] 相同。

| 条目 | 原处理 | E.8 中的处理 | 依据 |
| :--- | :--- | :--- | :--- |
| `H2` 正自配对 | 显式的第 1 层标定 | 由条款 IV 推出 | [@rem-appe-anchoring-consequences] 第 1 款 |
| `H2` 椭圆负平方 | `T3` 分岔 | 求同读数为实标量时由正性条件推出；此时正性条件对每个比较的求异部分等价于它的整数次幂有界；非标量时不成立；读数由态给出（实代数上要求态与对合相容）且至少有一个态时，正性条件等价于没有非零的零平方元素，这一部分（排除抛物分支）不能由态的任何读数条件推出 | [@rem-appe-involution-positivity]、[@rem-appe-bounded-recurrence]、[@rem-appe-positivity-invisible-part] |
| `H2` 多点格拉姆半正定 | 显式的第 1 层条件 | 由条款 IV 加正泛函推出，逆向成立；标量相似时由条款 IV 加正性条件推出；标量相似且每个对象有对立者时，等价于每个系综与自身的平均求同读数不为负，没有对立者则不够；偏离平坦时有定量下界 | [@thm-appe-chordal-gain-potential]、[@rem-appe-gram-from-flatness]、[@rem-appe-ensemble-positivity]、[@rem-appe-near-flat-gram-bound] |
| `H3` 平行四边形极化 | `T2` 条件 | 弦距来自正泛函的 GNS 内积，输入由“内积”换成“正读数”；完备化仍为 `T1` | [@rem-appe-gram-from-flatness] 第 2 款 |
| `H4` 正交余项不竭 | `T2/T4` 输入 | 对一个时间齐次对象：采样读数表的秩等于采样所见的能级数，余项永不枯竭当且仅当所见能级无穷；有限个能级的轨道必定回来，有限时长内射线矢高始终高于阈值给出维数下界，此后始终离开零推出轨道空间无穷维；仍是输入 | [@thm-appe-prony-hankel-rank]、[@rem-appe-orbit-rank-and-recurrence] |
| `H4` 复载体 $R^2=-I$ | `T3` 载体维数奇偶 | 中心含 $J$（$J^*=-J$，$J^2=-\mathbf{1}$）时，$J$ 在任一保单位 $*$-表示上的像反对称、平方为 $-I$、与全体元素对易，载体实维数为偶；中心复结构本身仍是输入（见 `H7`） | [@rem-appe-dictionary-independence] 第 3 款 |
| `H4` 奥斯特洛夫斯基估值选择 | `T3` 分岔 | 两行判据：绝对值在整数上有界当且仅当满足强三角不等式（此时三角形都等腰）；在 $\mathbb{Q}$ 上，由冻结分类，有界一行等价于某个 $\lvert\cdot\rvert_p$，无界一行等价于 $\lvert\cdot\rvert_\infty$；与 E.8.1.1 的有界判据同形，但没有对应抛物行的第三行，有界一行也不是椭圆转动所在的一行；选哪一行仍是输入 | [@rem-appe-bounded-integers-ultrametric]、[@thm-ch36-ostrowski-padic-ball-and-blind-spot] |
| `H5` 玻恩权重 | `T2` 可加性条件 | 只对只依赖两两比较的规则：$d\ge3$ 时有界、在每组正交归一基上归一且 $f(1)=1$ 就定出玻恩律；$d=2$ 时对连续规则，全效应可加性可以换成“对径归一、$f(1)=1$、层析秩最小”，也可以不要连续性而换成系综外延性（`MODEL` 下读作条款 I 用于系综）；仍是 `T2` 输入 | [@rem-appe-born-zonal-minimal-rank]、[@rem-appe-ensemble-extensionality-born] |
| `H8` 洛伦兹签名 | `T3` 分岔 | 与 `H2` 用同一张三分表，但为观察者之间的比较选另一行：在 $1+1$ 维观察者模型中（坐标变换的线性是输入），条款 III、速度读数反对称与同一条律给出含一个常数 $K$ 的族，$K$ 的符号就是矢高表的行；时间次序条件（重复同一个比较不翻转时间次序）排除椭圆行，“求异部分不是零平方”再排除抛物行；对同一个比较，正性条件与时间次序条件不能同时成立；零锥到二次型的一步由冻结命题承担 | [@rem-appe-frame-change-family]、[@rem-appe-time-order-repetition]、[@prop-appe-chebyshev-positivity-threshold]、[@rem-appe-rotor-boost-coexistence]、[@rem-appe-causal-order-linearity]、[@prop-null-cone-rigidity] |
| `H8` 第 1 层射影和乐 | 第 1 层内生 | 在 $\mathcal{Cl}_{3,0}$ 中由半比较的三点和乐给出闭式；其泡利矩阵模型中的乘积公式与返回相位已冻结 | [@rem-appe-half-comparison-holonomy]、[@thm-appe-bloch-triangle-return-phase] |
| `H8` 保单位捏合熵增 | `T2` 条件 | 纯度恰好降低丢弃的相干质量 $c$；熵增等于相对熵，且 $\Delta S\ge\frac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ge c$；单比特上固定 $c$ 时 $\Delta S$ 的精确范围；已知的一般上界是 $\sqrt{c}$ 的阶（秩一基底捏合的 $\ell_1$ 界已冻结），不存在线性于 $c$ 的上界；“粗粒化是保单位的捏合”仍是输入 | [@rem-appe-pinching-exact-identities]、[@rem-appe-pinching-entropy-lower]、[@prop-appe-l1-coherence-bound]、[@rem-appe-pinching-entropy-upper] |
| `H6` 双侧可逆 | `T2` 条件 | 单侧公平的亏损是投影，单侧移位作为比较值违反条款 III；但它可作为满足条款 I–IV 与正性条件的模型中的诱导演化出现，代数带忠实迹也不排除；过去完备或态空间有限维各自充分 | [@rem-appe-one-sided-fairness]、[@ex-appe-bilateral-shift-model] |
| `H6` 强连续 | `T2` 条件 | 时间齐次族上等价于矢高读数在零点连续；只要求可测不够；有限维中由此接上 [@thm-calibrated-unitary-group] | [@rem-appe-sagitta-continuity] |
| `H6` 生成元 | `T4` 输入 $H$ | 弦率趋于 $-iH$，矢高率趋于 $H^2/2$，均有显式误差；有限步速度界；在轨道张成的空间上，两个通道的轨道记录决定 $H$ 到酉等价为止，只用求同读数或只用玻恩权重都不够（二能级与三能级反例）；轨道的选取与 $H$ 在轨道外的作用仍是输入 | [@rem-appe-generator-chord-sagitta]、[@rem-appe-orbit-record-channels] |
| `H6` 吕德斯条件化 | `T2` 条件 | 吕德斯态是确定通过检验者中保真度最大者，且唯一；迹范数与迹为 $1$ 的希尔伯特—施密特距离不给出吕德斯态；所用读数仍是输入 | [@rem-appe-luders-nearest] |
| `H7` 局域层析与交换统计 | `T2` + `T3` | 参数计数 $K_d(ab)-K_d(a)K_d(b)=\frac{d(2-d)}4a(a-1)b(b-1)$；交换是矢高取 $0$ 与 $2$ 的公平对合，条款 I 去掉标签而不选扇区；一族给定对象在保留格拉姆阵到相位为止的意义下是否需要复数振幅：可比三角形填满每个圈时，当且仅当某个三点巴格曼乘积不是实数（有一个对象与其余每个对象都不正交时，这一判定已冻结），单比特上当且仅当布洛赫向量不共一个过球心的平面；在 $M_n(\mathbb{R})$、$M_n(\mathbb{C})$、$M_n(\mathbb{H})$ 的有限直和中，中心复结构等价于协变的生成元—读数词典（求异部分到求同部分的、与公平元换架对易的实线性双射），它不由条款 I–IV 与正性条件推出；$d\ge3$ 时交换回路只容许 $\pm1$ 两个特征标，平坦的比较不选其一，施温格输运基把符号写成 $4S$ 个直角旋子之积，而同类构造也给出相反符号；中心复结构与扇区选择仍是输入 | [@rem-appe-tomography-count]、[@rem-appe-swap-sagitta]、[@rem-appe-real-realizability-return-phase]、[@prop-appe-real-rephasing-star]、[@rem-appe-generator-reading-dictionary]、[@rem-appe-dictionary-independence]、[@rem-appe-exchange-configuration-space]、[@ex-appe-berry-robbins-transport]、[@rem-appe-spin-statistics-inputs] |
| `H9` 连续路径积分与平稳作用量 | `T4` 输入 | 二次作用量下 $N$ 步切片乘积在每个有限 $N$ 上精确等于驻相路径的贡献（含前因子与马斯洛夫相位），谐振子的误差是显式的 $O(N^{-2})$，时间步须落在矢高表的椭圆行；一般作用量只剩一维的显式抵消界；固定 $\hbar$ 时，连续极限在算子层面由特罗特—纳尔逊定理给出，不需要路径测度（有界变差的这种复测度不存在）；非二次势的时间切片收敛与大维数驻相是文献结果；相互作用场论仍为 `OPEN` | [@rem-appe-oscillator-time-slicing]、[@ex-appe-time-step-trichotomy]、[@rem-appe-oscillatory-cancellation-bounds]、[@rem-appe-path-integral-remaining-inputs] |

新增的两条输入是条款 IV（[@def-appe-third-point-redundancy]）与正性条件（[@rem-appe-involution-positivity]）；读数由态给出且至少有一个态时，后者等价于没有非零的零平方元素，而这一部分对态的一切读数不可见（[@rem-appe-positivity-invisible-part]）；求同读数不是实标量时，读数表的半正定另需一个正泛函。条款 IV 不必对一切三点成立：可比三角形填满每个圈就够了，而且对一切群而言这是恰好够的条件（[@rem-appe-triangle-simple-connectivity]）。条款 IV 排除一切全比较的和乐，它刻画的是第 1 层的平坦骨架；带真实曲率的第 2 层联络必须放弃它，那时 [@thm-appe-chordal-gain-potential-stability]、[@thm-appe-chordal-uniform-gain-potential] 与 [@rem-appe-near-flat-gram-bound] 给出偏离的代价。

E.8.2.2 与 E.8.2.3 不增加新的条款：`H6` 的可逆与连续两项各有一个只谈对象与读数的充分条件（过去完备、矢高读数在零点连续），条件化换成一条最优化原理，`H7` 有了一行计数公式；这些条件仍是输入。

E.8.2.4 与 E.8.3.1 同样不增加新的条款。E.8.2.4 把比较用到系综上：要推出读数表半正定，正性条件可以换成“每个对象有对立者，系综与自身的平均求同读数不为负”，后者仍容许的只有对一切求同读数不可见的抛物点对；单比特上的玻恩律可以由系综外延性推出。E.8.3.1 读一个对象的轨道：`H4` 有了可在有限步上检验的读数形式，`H6` 的 $H$ 在轨道空间上可以从两个通道的记录中读出。

E.8.3.2–E.8.3.4 为观察者之间的比较增加两条输入：时间次序条件，以及“求异部分不是零平方”（它是 [@rem-appe-positivity-invisible-part] 中那一条件在求异部分上的特例）；在 $1+1$ 维中，坐标变换的线性也仍是输入。对同一个比较，正性条件与时间次序条件不能同时成立，`H2` 与 `H8` 由此分开：两者为不同的比较选同一张表上的不同行。E.8.3.3 不改变“粗粒化是保单位的捏合”这一输入，只给它的后果定量。E.8.3.4 把 `H9` 的路径积分一项缩小为：二次作用量在有限步上精确，一般作用量只有渐近陈述，连续极限在算子层面的存在是文献结果。

E.8.3.5 不增加新的条款。`H7` 的中心复结构换成一条协变词典条件：每个求异部分配一个求同读数，对应线性、可逆且不随换架而变；在 $M_n(\mathbb{R})$、$M_n(\mathbb{C})$、$M_n(\mathbb{H})$ 的有限直和中它等价于中心复结构，并给出 `H4` 的复载体；实与四元数矩阵代数满足条款 I–IV 与正性条件而没有它。交换扇区换成配置空间基本群的一个特征标，$d\ge3$ 时只有 $\pm1$。`H4` 的估值选择换成“整数倍是否有界”。三者仍是输入。
:::

这一节没有减少输入的总数到零，它改变的是输入的形状：在求同读数为实标量的情形，`H2` 的三项原先是关于自配对、双向量与格拉姆矩阵的三条几何陈述，现在换成两条只用比较本身就能说出口的条件。一条说第三者不改变两者之比，一条说差异的往返留下正的痕迹。
