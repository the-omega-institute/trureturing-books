# E.8.2 玻恩权重、动力学与系综 {#sec-appendix-e-s08-s02-born-dynamics-ensembles}

## E.8.2.1 玻恩权重：单比特上的缺口可以换成层析秩最小 {#sec-appe-born-minimal-rank}

`H5` 的缺口在单比特上最宽。$d\ge3$ 时，对只依赖两两比较的有界规则，在每组正交归一基上归一加上 $f(1)=1$ 已经定出玻恩律；$d=2$ 时它只剩对径归一，[@ex-appe-qubit-cubic-and-tomography] 的三次函数满足它而不是玻恩律。下面把单比特上缺的那条输入换一种说法，它与 `H7` 用的是同一种计数。

::: {.remark #rem-appe-born-zonal-minimal-rank title="单比特上玻恩律是层析秩最小的带状概率规则（手工推导）"}
**手工推导。** 在布洛赫球面 $S^2$ 上考虑只依赖两两比较的出口概率：制备 $\mathbf{s}$、出口 $\mathbf{r}$ 的概率为 $p(\mathbf{r}\mid\mathbf{s})=f(\mathbf{s}\cdot\mathbf{r})$，$f$ 是 $[-1,1]$ 上的连续函数。记 $t=\mathbf{s}\cdot\mathbf{r}$，这一对的矢高是 $v=1-t$。假设

- **对径归一**：$f(t)+f(-t)=1$；
- **确定性**：$f(1)=1$。

把 $f$ 按勒让德多项式展开，$f=\sum_l c_lP_l$。定义**层析秩** $K(f)$ 为函数族 $\{\mathbf{r}\mapsto f(\mathbf{s}\cdot\mathbf{r})\}_{\mathbf{s}\in S^2}$ 张成的实线性空间的维数，也就是预言一个制备的全部出口概率所需的实参数个数。则

$$
K(f)=\sum_{l:\,c_l\neq0}(2l+1),
$$

$f$ 不是多项式时 $K(f)=\infty$。对多项式 $f$，理由是实球谐函数的加法定理 $P_l(\mathbf{s}\cdot\mathbf{r})=\frac{4\pi}{2l+1}\sum_{m}Y_{lm}(\mathbf{s})\,Y_{lm}(\mathbf{r})$：$c_l\neq0$ 的每一阶贡献 $2l+1$ 个线性无关的函数 $Y_{lm}(\mathbf{r})$，而系数向量 $\bigl(Y_{lm}(\mathbf{s})\bigr)$ 随 $\mathbf{s}$ 变动张满整个系数空间。$f$ 不是多项式时有无穷多个 $c_l\neq0$；对每个这样的 $l$，$f(\mathbf{s}\cdot\,\cdot\,)$ 在 $l$ 阶球谐函数空间上的投影是 $c_lP_l(\mathbf{s}\cdot\,\cdot\,)$（Funk–Hecke 公式），而这个空间在旋转下不可约，所以张成空间投影到它的全体，维数至少是 $2l+1$。加法定理、Funk–Hecke 公式与球谐函数空间的不可约性都是标准事实（`文献结果`）。

对径归一迫使 $c_0=\frac12$，并使偶数阶 $l\ge2$ 的系数为零；确定性排除了 $f\equiv\frac12$，所以至少有一个奇数阶出现。于是

$$
K(f)\ \ge\ 1+3=4,\qquad K(f)=4\iff f(t)=\frac{1+t}{2}=1-\frac v2 .
$$

三次规则 $f(t)=\frac12(1+t^3)$ 含有 $l=0,1,3$ 三阶（$t^3=\frac35P_1+\frac25P_3$），层析秩为 $1+3+7=11$。

**$d\ge3$ 不需要计数（手工推导）。** 在 $\mathbb{CP}^{d-1}$ 上设 $p=f\bigl(\lvert\langle x\mid y\rangle\rvert^2\bigr)$，$f$ 有界，$f(1)=1$，并且在每组正交归一基上归一。单位向量在一组基下的模方可以取到概率单纯形上的任何一点，所以对一切 $t_i\ge0$、$\sum_it_i=1$ 有 $\sum_if(t_i)=1$。取 $(1,0,\dots,0)$ 得 $f(0)=0$。$d\ge3$ 时比较 $(t,s,1-t-s,0,\dots)$ 与 $(t+s,0,1-t-s,0,\dots)$，得 $f(t)+f(s)=f(t+s)$（$t,s\ge0$，$t+s\le1$）；这样的有界可加函数是线性的（标准事实），于是 $f(t)=t$，层析秩 $d^2$ 是结论而不是输入。取值非负的带状规则可加地延拓到全体投影之后，是格里森定理（[@thm-gleason-finite-projection]）所处理的标架函数的特例；上面这几行推导不依赖那条定理。$d=2$ 时单纯形只有一条边，这个比较做不出来，剩下的只有对径归一。

**文献背景。** Hardy (2001) 的简单性公理要求状态空间的参数个数 $K$ 取与其余公理相容的最小值，并由此推出 $K=N^2$；Galley–Masanes (2017) 把玻恩律的备选规则对应到酉群的表示。前者是“层析秩最小”这类条件的先例，后者给出相关的分类；上面的陈述与推导不取自其中任何一篇。
:::

所以在“概率只依赖两两比较”的前提下，`H5` 的输入可以这样分。$d\ge3$ 时，有界、$f(1)=1$ 加投影可加性已经足够。$d=2$ 时还缺一条：它可以是 E.7 所列的全效应可加性，也可以是一句计数，即一个制备的全部预言由 $4$ 个实数决定，不能更少。$4$ 正是 `H7` 的局域层析计数用到的 $\dim_{\mathbb{R}}\operatorname{Herm}(2)$，也是 [@rem-appe-gram-from-flatness] 的格拉姆嵌入（布洛赫向量的三个坐标）加上归一所占的维数：概率对矢高仿射，等价于概率是嵌入坐标的仿射函数。这只是换了输入的形状。层析秩最小本身仍是一条 `T2` 操作假设，两两公平推不出它；不连续的规则，以及不只依赖两两比较的规则，都不在这条注记的范围内。

## E.8.2.2 动力学：演化可逆、时间连续、生成元与条件化 {#sec-appe-dynamics-from-comparison}

`H6` 列了四项输入：演化的双侧可逆、时间强连续、可重复最小扰动的条件化，以及哈密顿量 $H$ 本身。本小节逐项看比较公理与弦—矢高分解能说到哪里。前两项各有一个只用比较对象与读数说出口的充分条件，并有满足全部条款的模型标出它们的边界；第三项可以写成一条最优化原理，但“用哪种读数”仍是输入；$H$ 不变。下面沿用 E.8 的记号，并取 $\hbar=1$。

先看可逆。[@rem-appe-chord-sagitta-layer0] 用到了条款 III 的两个次序。只保留一个次序时，亏损可以精确算出。

::: {.remark #rem-appe-one-sided-fairness title="单侧公平：亏损是一个投影（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是 $2$ 可逆的含幺结合 $*$-代数，$u\in\mathcal{A}$ 只满足 $u^*u=\mathbf{1}$。记 $p=\mathbf{1}-uu^*$，$S,A,v,\Delta$ 的定义同 [@rem-appe-chord-sagitta-layer0]（不要求 $u$ 与 $u^*$ 对易）。则

1. $p^*=p$，$p^2=p$；
2. $\Delta^*\Delta=2v$；
3. $\Delta\Delta^*=2v-p$；
4. $2(AS-SA)=-p$。

推导：$p^2=\mathbf{1}-2uu^*+u(u^*u)u^*=p$；$\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$；$\Delta\Delta^*=uu^*-u-u^*+\mathbf{1}=2v-p$；[@rem-appe-chord-sagitta-layer0] 推导中的两条展开相减得 $uu^*-u^*u=2(AS-SA)$，左端为 $-p$。

所以在 $u^*u=\mathbf{1}$ 之下，$uu^*=\mathbf{1}$、$SA=AS$、$\Delta\Delta^*=\Delta^*\Delta$ 三者等价：条款 III 只对一个次序成立时，求同与求异两条通道不再对易，弦—矢高锁死在另一侧亏掉一个投影。$\ell^2(\mathbb{N})$ 上的单侧移位 $Se_k=e_{k+1}$ 正是这样：$S^*S=\mathbf{1}$，$p=\mathbf{1}-SS^*=\lvert e_0\rangle\langle e_0\rvert$。把它当作比较值 $\mathrm{CMP}(x,y)=S$，则 $\mathrm{CMP}(x,y)\,\mathrm{CMP}(y,x)=SS^*\neq\mathbf{1}$，违反条款 III。

若 $\mathcal{A}$ 上有忠实的迹读数 $\tau$（正，$\tau(ab)=\tau(ba)$，$\tau(a^*a)=0$ 仅当 $a=0$），$\mathcal{A}$ 中的单侧公平元自动是双侧的：$\tau(p)=\tau(\mathbf{1})-\tau(u^*u)=0$，而 $p=p^*p$，故 $p=0$。有限维矩阵代数有这样的迹，$\ell^2$ 上的全体有界算子没有（`文献结果`）。这一段只关于 $\mathcal{A}$ 的元素，下例说明它管不到诱导的演化。
:::

这还没有回答 `H6` 的问题。`H6` 问的是状态的演化，而状态演化可以是比较结构的一个对称，不必本身是一个比较值。下面把“演化”读作保持一切比较值的对象映射在态空间上诱导的映射（`MODEL`），这个模型说明任何条款都不排除单侧移位以这种方式出现。

::: {.example #ex-appe-bilateral-shift-model title="只有前向半轨道时，双侧公平的比较诱导出单侧移位（手工推导）"}
**手工推导。** 取 $\mathcal{A}$ 为 $\ell^2(\mathbb{Z})$ 上的全体有界算子，$\lambda$ 为双侧移位 $\delta_n\mapsto\delta_{n+1}$，对象集 $X=\mathbb{N}$，$\mathrm{CMP}(m,n)=\lambda^{n-m}$。

- 条款 II、III：$\mathrm{CMP}(n,m)=\lambda^{m-n}=\mathrm{CMP}(m,n)^*$，$\lambda$ 是酉的。条款 IV：$\lambda^{n-m}\lambda^{k-n}=\lambda^{k-m}$。条款 I：$m\mapsto\lambda^m$ 是单射，外延商不识别任何两点。正性条件：$C^*$-代数中成立。
- 时间步 $T(m)=m+1$ 严格保持一切比较：$\mathrm{CMP}(m+1,n+1)=\mathrm{CMP}(m,n)$。
- 取 $\delta_0$ 的向量态。对象张成的态空间 $\mathcal{K}=\overline{\operatorname{span}}\{\lambda^m\delta_0:m\in\mathbb{N}\}=\ell^2(\mathbb{N})$，$T$ 诱导的演化 $\lambda^m\delta_0\mapsto\lambda^{m+1}\delta_0$ 是 $\lambda$ 在 $\mathcal{K}$ 上的限制，恰为单侧移位；$\lambda^{-1}\delta_0$ 不在 $\mathcal{K}$ 中。
- 把 $\mathcal{A}$ 换成 $\lambda$ 生成的交换 $C^*$-代数，$\delta_0$ 的向量态在其上是忠实迹，条款 I–IV 与正性条件照样成立，$\mathcal{K}$ 与诱导的演化都不变。所以代数带忠实迹也不排除单侧移位：诱导演化是 $\lambda$ 到 $\mathcal{K}$ 的压缩，不是 $\mathcal{A}$ 的元素。

一般地，设条款 II–IV 成立，$T:X\to X$ 满足 $\mathrm{CMP}(Tx,Ty)=\mathrm{CMP}(x,y)$。取锚点 $o$，令 $w=\mathrm{CMP}(o,To)$，则由条款 IV，$\mathrm{CMP}(o,Tx)=\mathrm{CMP}(o,To)\,\mathrm{CMP}(To,Tx)=w\,\mathrm{CMP}(o,x)$：保比较的映射在 [@rem-appe-anchoring-consequences] 的锚定表示上就是左乘公平元 $w$，由条款 I 它在外延商上是单射。它在态空间上诱导的是一个等距；是否可逆，取决于对象集是否对时间反演封闭。以下两条各自充分：

1. **过去完备**：$T$ 满射，每个对象都有前驱。此时 $w$ 把态空间映满自身，诱导的演化是酉的。
2. 态空间有限维：等距自动满射。

过去完备不是必要的：$\mathcal{A}=\mathbb{C}$、$\mathrm{CMP}(m,n)=e^{i(n-m)\theta}$ 时 $T$ 不满射，态空间是 $\mathbb{C}$，演化是酉的。恰好的判据在算子层面：诱导等距 $U$ 的游荡子空间 $\mathcal{K}\ominus U\mathcal{K}$ 为零，这只是“等距满射”的改写。Wold 分解把任意等距写成酉部分与单侧移位的直和（`文献结果`），其有限层形式与范数恒等式是冻结定理 [`exists_wold_decomposition`](lean:D5/S3/HilbertOperators/WoldDecomposition.exists_wold_decomposition)。
:::

所以 `H6` 中“双侧可逆”一项可以由一句关于对象的话保证：**每个对象都有过去。** 它是充分条件，不是必要条件；它也是输入，不是推论，上例满足全部条款而没有它。

再看时间连续。设一族对象 $x_t$（$t\in\mathbb{R}$）满足条款 II–IV，且 $\mathrm{CMP}(x_s,x_t)=w(t-s)$ 只依赖时间差，$\varphi$ 是一个态。

::: {.remark #rem-appe-sagitta-continuity title="矢高读数在零点连续，演化就强连续（手工推导与文献结果）"}
**手工推导。** 记 $f(t)=\varphi\bigl(w(t)\bigr)$，矢高读数 $\nu(t)=\varphi\bigl(v(x_0,x_t)\bigr)=1-\operatorname{Re}f(t)$，它等于 [@rem-appe-gram-from-flatness] 弦距平方的一半。在 $\varphi$ 的 GNS 表示 $(\pi,\Omega)$ 中令 $\xi_s=\pi(w(s))\Omega$，$\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$，$U_t=\pi(w(t))$ 限制在 $\mathcal{K}$ 上。则：

1. $U_t$ 是 $\mathcal{K}$ 上的酉单参数群，且对一切 $s,t$，$\lVert(U_t-\mathbf{1})\xi_s\rVert^2=2\nu(t)$；
2. $f$ 正定，并且 $\lvert f(t)-f(s)\rvert^2\le2\nu(t-s)$；
3. 以下三条等价：$\nu$ 在 $0$ 处连续；$U$ 在 $\mathcal{K}$ 上强连续；$f$ 处处连续。

推导：$\lVert(U_t-\mathbf{1})\xi_s\rVert^2=\varphi\bigl((w(t+s)-w(s))^*(w(t+s)-w(s))\bigr)=2-2\operatorname{Re}\varphi(w(t))$，用到 $w(s)^*w(t+s)=w(t)$。这里时间取遍 $\mathbb{R}$，$U_tU_{-t}=\mathbf{1}$ 在 $\mathcal{K}$ 上成立，所以 $U_t$ 是酉的。正定性是 [@rem-appe-gram-from-flatness] 中同一个计算。不等式：$f(t)-f(s)=\langle\Omega,U_s(U_{t-s}-\mathbf{1})\Omega\rangle$，再用柯西—施瓦茨。等价性：在生成向量上 $\lVert(U_h-\mathbf{1})\xi_s\rVert\to0$，由 $\lVert U_h-\mathbf{1}\rVert\le2$ 与稠密性推到全体 $\mathcal{K}$，再由 $\lVert U_{t+h}\xi-U_t\xi\rVert=\lVert(U_h-\mathbf{1})\xi\rVert$ 推到每个时刻。

**只要求读数可测不够（手工推导）。** 取 $\mathcal{A}$ 为 $\ell^2(\mathbb{R}_{\mathrm{d}})$（$\mathbb{R}$ 取离散拓扑）上的全体有界算子，$w(t)$ 为平移 $\delta_r\mapsto\delta_{r+t}$，$\varphi$ 为 $\delta_0$ 的向量态。条款 II–IV 与正性条件成立，$f$ 在 $0$ 处为 $1$、在其余点为 $0$，几乎处处为零，因而可测；而 $t\neq0$ 时 $\nu(t)=1$：每个时间平移都与原对象正交。

**文献结果。** 可分希尔伯特空间上弱可测的酉单参数群强连续（von Neumann 1932）。在上面的设定中矩阵元为 $\langle\xi_r,U_t\xi_s\rangle=f(t+s-r)$，所以 $f$ 可测且 $\mathcal{K}$ 可分时即满足该定理的前提；上面的反例中 $\mathcal{K}$ 不可分。强连续的酉单参数群有自伴生成元（Stone 1932）。
:::

第 2 款的意思是：**以 $x_0$ 为参照的比较读数，在一段时间里的改变量不超过这段时间两端对象之间的弦距。** 所以 `H6` 中“强连续”一项可以换成一个标量读数条件：对象与它的微小时间平移在弦距上靠近。在有限维中这一条还直接接到冻结定理 [@thm-calibrated-unitary-group] 上：设 $U$ 连续，取 $\delta>0$ 使 $0\le s\le\delta$ 时 $\lVert U_s-\mathbf{1}\rVert\le\frac12$，则 $V=\frac1\delta\int_0^\delta U_s\,ds$ 可逆，$U_tV=\frac1\delta\int_t^{t+\delta}U_s\,ds$ 对 $t$ 可微，于是 $U_t=(U_tV)V^{-1}$ 在 $0$ 处可微（`手工推导`）。这正是 [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) 所要的可微性前提，它给出 $U_t=e^{-itH}$ 与自伴的 $H$。

生成元本身也可以用弦与矢高读出来。

::: {.remark #rem-appe-generator-chord-sagitta title="生成元是弦率，矢高率趋于它平方的一半；有限步速度界（手工推导与文献结果）"}
**手工推导。** 设 $H$ 为有限维厄米算子，$u_t=e^{-itH}$，$\psi$ 为单位向量，$\langle X\rangle=\langle\psi,X\psi\rangle$。

1. $S_t=\cos(tH)$，$A_t=-i\sin(tH)$，$v_t=2\sin^2(tH/2)$，$\lVert\Delta_t\psi\rVert^2=2\langle v_t\rangle$。
2. $\dfrac{t^2}{2}\langle H^2\rangle-\dfrac{t^4}{24}\langle H^4\rangle\le\langle v_t\rangle\le\dfrac{t^2}{2}\langle H^2\rangle$。
3. 对 $t\neq0$：$\bigl\lVert(\Delta_t/t+iH)\psi\bigr\rVert\le\frac{\lvert t\rvert}{2}\lVert H^2\psi\rVert$，$\bigl\lVert(A_t/t+iH)\psi\bigr\rVert\le\frac{t^2}{6}\lVert H^3\psi\rVert$，$\bigl\lVert(v_t/t^2-H^2/2)\psi\bigr\rVert\le\frac{t^2}{24}\lVert H^4\psi\rVert$。
4. 记 $\sigma^2=\langle H^2\rangle-\langle H\rangle^2$。对每个正整数 $N$，若 $\sigma\lvert t\rvert\le2N$，则

$$
\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le2N\arcsin\frac{\sigma\lvert t\rvert}{2N}.
$$

右端随 $N$ 单调下降，$N\to\infty$ 时趋于 $\sigma\lvert t\rvert$，于是对一切 $t$ 有 $\arccos\lvert\langle\psi,u_t\psi\rangle\rvert\le\sigma\lvert t\rvert$；二能级等权叠加取等。

推导：第 1–3 款由谱分解归结为标量不等式 $\frac{x^2}2-\frac{x^4}{24}\le1-\cos x\le\frac{x^2}2$、$\lvert e^{-ix}-1+ix\rvert\le\frac{x^2}2$、$\lvert\sin x-x\rvert\le\frac{\lvert x\rvert^3}6$、$\lvert1-\cos x-\frac{x^2}2\rvert\le\frac{x^4}{24}$。第 4 款：把第 2 款用于 $H-\langle H\rangle$，得单步界 $\lvert\langle\psi,u_h\psi\rangle\rvert\ge1-\frac{\sigma^2h^2}2$，于是 $\sigma\lvert h\rvert\le2$ 时夹角 $\arccos\lvert\langle\psi,u_h\psi\rangle\rvert\le2\arcsin\frac{\sigma\lvert h\rvert}2$（右端不小于 $\frac\pi2$ 时这一步不需证明）；$u_t$ 与 $H$ 对易，沿轨道 $\sigma$ 不变，相邻两点的夹角都等于这一步的夹角；取 $h=t/N$，沿 $N$ 步用冻结的富比尼—施图迪三角不等式 [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) 相加。单调性来自 $y\mapsto\arcsin y/y$ 在 $(0,1]$ 上递增。

**文献结果。** 第 4 款的极限形式就是自治纯态的 Mandelstam–Tamm 夹角界（Mandelstam–Tamm 1945；余弦形式见 Fleming 1973）。第 7 章 [@rem-qsl-zeno-literature] 用导数论证给出了同一个界。
:::

第 3 款说的是：**生成元是弦率，矢高率的极限是生成元平方的一半。** 锁死恒等式 $\Delta_t^*\Delta_t=2v_t$ 在极限中成为 $(-iH)^*(-iH)=2\cdot\frac{H^2}2$。第 4 款说的是：**单步的矢高界加上角度的三角不等式，就是速度极限**，而且在每个有限步数上都有一个精确的界。[@thm-fubini-study-record-time] 把两个正交记录各自的角位移上界 $\mathrm{energy}\cdot\tau/\hbar$ 作为假设；若两个记录态都由同一初态经各自的有限维哈密顿演化在时间 $\tau$ 内得到，且初态在两个哈密顿量下的能量标准差都不超过 $\mathrm{energy}>0$，第 4 款的极限形式就供给了这两条假设。

最后是条件化。E.5 的重置仪器反例说明，单凭玻恩权重定不出测后态，需要可重复与最小扰动。这两条可以合成一句只谈比较的话。

::: {.remark #rem-appe-luders-nearest title="吕德斯态是确定通过检验的对象中比较读数最大者（手工推导与文献结果）"}
**手工推导。** 设 $P$ 为投影，$\rho$ 为态，$p=\operatorname{tr}(P\rho)>0$。称态 $\eta$ **确定通过检验**，若 $\operatorname{tr}(P\eta)=1$，即 $\eta=P\eta P$；这样的 $\eta$ 再测一次 $P$ 必得同一结果，可重复性自动成立。

1. 纯态 $\rho=\lvert\psi\rangle\langle\psi\rvert$：对 $P$ 的像中的单位向量 $\phi$，$\lvert\langle\psi,\phi\rangle\rvert=\lvert\langle P\psi,\phi\rangle\rvert\le\lVert P\psi\rVert$，等号当且仅当 $\phi$ 与 $P\psi$ 共线。所以在弦距 $\min_\alpha\lVert\psi-e^{i\alpha}\phi\rVert^2=2-2\lvert\langle\psi,\phi\rangle\rvert$ 下，确定通过检验的最近对象是吕德斯向量 $P\psi/\lVert P\psi\rVert$，差一个相位唯一。
2. 若 $\lVert P\psi\rVert^2=1-\varepsilon$，这一步条件化的矢高 $1-\sqrt{1-\varepsilon}$ 夹在 $\frac\varepsilon2$ 与 $\varepsilon$ 之间。
3. 混态：在确定通过检验的态中，保真度 $\operatorname{Fid}(\rho,\eta)=\bigl(\operatorname{tr}\lvert\sqrt\rho\sqrt\eta\rvert\bigr)^2$ 的最大值为 $p$，唯一取到者是 $P\rho P/p$。推导：由 Uhlmann 定理（Uhlmann 1976，`文献结果`），$\operatorname{Fid}(\rho,\eta)$ 是 $\rho$ 的一个固定纯化 $\Psi$ 与 $\eta$ 的纯化 $\Phi$ 的重叠模方的最大值，且最大值取到；$\eta=P\eta P$ 使 $\Phi$ 落在 $P\otimes\mathbf{1}$ 的像中，第 1 款给出 $\lvert\langle\Psi,\Phi\rangle\rvert\le\sqrt p$，等号迫使 $\Phi$ 与 $(P\otimes\mathbf{1})\Psi$ 共线，其约化态就是吕德斯态。
4. 换成迹范数，或在迹为 $1$ 的候选中用希尔伯特—施密特距离，最近者不是吕德斯态。迹范数：$\rho=\frac14\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$，$P=\operatorname{diag}(1,1,0)$，吕德斯态 $\operatorname{diag}(\frac12,\frac12,0)$ 给出 $\lVert\rho-\rho_{\mathrm L}\rVert_1=\frac{1+\sqrt{17}}4$，而确定通过检验的 $\eta=\begin{pmatrix}\frac12&\frac14&0\\\frac14&\frac12&0\\0&0&0\end{pmatrix}$ 给出更小的 $\frac{\sqrt6}2$。希尔伯特—施密特距离：$\rho=\operatorname{diag}(\frac12,\frac14,\frac14)$，吕德斯态 $\operatorname{diag}(\frac23,\frac13,0)$ 的平方距离为 $\frac{14}{144}$，$\operatorname{diag}(\frac58,\frac38,0)$ 为更小的 $\frac{27}{288}$。
:::

所以 `H6` 中“可重复最小扰动”一项可以说成（`MODEL`）：**条件化后的对象，是确定通过这次检验的对象中，与原对象比较读数最大的那一个。** 读数取保真度时结果恰是吕德斯态，而且唯一。输入并没有消失，只是换了形状：第 4 款说明，换一种读数就换一种更新。条件态的定义与它是态这一事实见冻结定理 [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)；最优性本身没有冻结声明。

## E.8.2.3 复合与交换 {#sec-appe-composites-and-exchange}

`H7` 有两项输入：复局域层析，以及交换统计的选择。前者在 [@ex-appe-qubit-cubic-and-tomography] 中以实双比特的计数出现。三种标量的计数可以合成一行。

::: {.remark #rem-appe-tomography-count title="实、复、四元数三种标量的参数计数（手工推导与文献结果）"}
**手工推导。** 对 $F\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$，记 $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$。$n$ 阶 $F$-厄米矩阵有 $n$ 个实对角元，每对 $(i,j)$ 有一个 $F$ 中的非对角元，所以实维数为

$$
K_d(n)=n+d\cdot\frac{n(n-1)}{2}.
$$

经典情形记 $d=0$，$K_0(n)=n$。直接展开得

$$
K_d(ab)-K_d(a)\,K_d(b)=\frac{d(2-d)}{4}\,a(a-1)\,b(b-1).
$$

因此对 $a,b\ge2$，“维数为 $ab$ 的系统的参数个数等于两个局域参数个数之积”当且仅当 $d=0$ 或 $d=2$。$d=1$ 多出 $\frac14a(a-1)b(b-1)$ 个只有全局读数才看得见的参数，$a=b=2$ 时就是 [@ex-appe-qubit-cubic-and-tomography] 的 $J\otimes J$；$d=4$ 比局域参数之积少 $2a(a-1)b(b-1)$ 个。

用比较的语言：每对 $(i,j)$ 上的 $d$ 个实方向中，$1$ 个是求同方向，其余 $d-1$ 个是平方为 $-\mathbf{1}$ 的直角比较方向（`MODEL`）。计数相乘要求非对角处恰有一个直角方向，或者根本没有非对角元。三类矩阵代数的中心分别是 $\mathbb{R}$、$\mathbb{C}$、$\mathbb{R}$（`文献结果`），只有复情形的中心含直角比较；所以在这三类代数内，“计数相乘”与“中心含直角比较”是同一件事。这不是对一般代数的刻画。

积比较 $u_1\otimes u_2$ 的矢高是 $\mathbf{1}-S_1\otimes S_2-A_1\otimes A_2$。实双比特态 $\rho_\pm=\frac14(\mathbf{1}\pm J\otimes J)$ 在一切局域实对称乘积上的读数相同，而对 $u_1=u_2=\cos\theta\,\mathbf{1}+J\sin\theta$，积比较矢高的读数分别为 $0$ 与 $2\sin^2\theta$。说“积比较的矢高读数由局域读数决定”与局域层析等价，但这只是给 $A_1\otimes A_2$ 一项换了名字，并没有推出它。

**文献结果。** 局域层析与复数的关系见 Wootters (1990)、Hardy (2001)、Chiribella–D'Ariano–Perinotti (2011)；四元数情形没有使维数相乘的张量积，上面只比较参数个数，不构造四元数复合系统。复情形 $\dim_{\mathbb{R}}\operatorname{Herm}(n)=n^2$ 是冻结定理 [`hermitian_space_finrank`](lean:D5/S3/Quantum/Entanglement/BipartiteSectorDecomposition.hermitian_space_finrank)。
:::

交换统计在比较的语言里也有一个干净的位置。

::: {.remark #rem-appe-swap-sagitta title="交换是矢高取 0 与 2 的公平对合；条款 I 去掉标签而不选扇区（手工推导与文献结果）"}
**手工推导。** 在 $\mathcal{H}\otimes\mathcal{H}$ 上取交换 $\mathrm{SW}(\psi\otimes\phi)=\phi\otimes\psi$。

1. $\mathrm{SW}^*=\mathrm{SW}$，$\mathrm{SW}^2=\mathbf{1}$，所以 $\mathrm{SW}$ 公平且自伴，$S=\mathrm{SW}$，$A=0$，矢高 $v=\mathbf{1}-\mathrm{SW}$ 只取 $0$ 与 $2$，反对称投影是半个矢高：$P_\wedge=\frac12v$。对称扇区上交换是恒等，反对称扇区上是对径。
2. $\langle\psi\otimes\phi,\mathrm{SW}\,\psi\otimes\phi\rangle=\lvert\langle\psi,\phi\rangle\rvert^2$，故落入反对称扇区的权重为 $\frac12\bigl(1-\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$：交换比较的矢高读数，由两个单体态之间的玻恩权重决定。
3. 设可观测量都与 $\mathrm{SW}$ 对易。则对一切这样的 $O$ 与一切 $x$，$\langle x,Ox\rangle=\langle P_{\mathrm{Sym}}x,OP_{\mathrm{Sym}}x\rangle+\langle P_\wedge x,OP_\wedge x\rangle$，两扇区之间没有可读的相干。$\psi\otimes\phi$ 与 $\phi\otimes\psi$ 在这些读数下相同；若对象之间只经这些读数比较，条款 I 把它们识别，粒子标签被商掉。但识别之后的对象仍是两扇区的混合，权重 $\frac12\bigl(1\pm\lvert\langle\psi,\phi\rangle\rvert^2\bigr)$。

所以条款 I 去掉标签，不选扇区。$N\ge3$ 时每个对换都是同样的公平对合；以置换为对象、$\mathrm{CMP}(\sigma,\tau)=U(\sigma)^*U(\tau)$ 时，条款 II–IV 对对称群的任何酉表示 $U$ 都成立。例如三个二能级粒子的 $8$ 维空间中，对称扇区 $4$ 维、反对称扇区 $0$ 维、混合对称扇区 $4$ 维。

**文献结果。** 第 2 款即交换测试（Buhrman–Cleve–Watrous–de Wolf 2001）。只取对称群的一维表示是对称化公设（Messiah–Greenberg 1964），自旋与统计的联系来自相对论量子场论（Pauli 1940）；两者都是比较公理之外的输入。
:::

在这个读法下（`MODEL`），交换统计的选择是“交换矢高为 $2$ 的扇区是否被占据”，它是一个超选择标签，和 `H2` 的签名、`H8` 的光锥一样属于 `T3` 型分岔。

## E.8.2.4 系综：多点正性与单比特玻恩权重的读数形式 {#sec-appe-ensembles}

到此为止比较只在两个对象之间进行。实验里常做的是另一件事：按概率随机抽一个对象，再拿它去比较。把 $X$ 上有限支撑的概率分布 $E=\sum_kp_k\delta_{x_k}$ 叫作**系综**，两个系综的平均求同读数定义为 $S(E,F)=\sum_{k,l}p_kq_l\,S(x_k,y_l)$（`MODEL`）。再称 $\bar x$ 是 $x$ 的**对立者**，若 $\mathrm{CMP}(x,\bar x)=-\mathbf{1}$，即两者的矢高为 $2$。在条款 II 与条款 IV 下，$\mathrm{CMP}(\bar x,z)=\mathrm{CMP}(\bar x,x)\,\mathrm{CMP}(x,z)=-\mathrm{CMP}(x,z)$，对立者的一切比较都与 $x$ 反号。

::: {.remark #rem-appe-ensemble-positivity title="有对立者时，系综自洽等价于多点格拉姆半正定；没有对立者则不够（手工推导）"}
**手工推导。** 设条款 II–IV 成立，求同读数是实标量，$S(x,y)=s_{xy}\mathbf{1}$。对系综 $E=\sum_kp_k\delta_{x_k}$ 有 $S(E,E)=p^{\mathsf T}[s_{x_kx_l}]\,p$，即从同一个系综独立抽两个对象时求同读数的平均。

1. 若每个对象都有对立者，则下面两条等价：(a) 每个系综与自身的平均求同读数不为负，$S(E,E)\ge0$；(b) 对每个有限点组，读数表 $[s_{x_ix_j}]$ 半正定。
2. 在 (b) 之下 $\lvert s_{xy}\rvert\le1$；$s_{xy}=1$ 时 $x$ 与 $y$ 对一切 $z$ 的求同读数相同，$s_{xy}=-1$ 时处处反号。
3. 没有对立者时，(a) 推不出 (b)。

推导：(b) 推出 (a) 只需取 $\alpha=p$。反过来，任给实向量 $\alpha\neq0$，在 $\alpha_i\ge0$ 处取 $y_i=x_i$，在 $\alpha_i<0$ 处取 $y_i=\bar x_i$，令 $E=\sum_i\frac{\lvert\alpha_i\rvert}{\lVert\alpha\rVert_1}\delta_{y_i}$。由 $s_{\bar xz}=-s_{xz}$，$S(E,E)=\alpha^{\mathsf T}[s_{x_ix_j}]\,\alpha/\lVert\alpha\rVert_1^2$，于是 (a) 给出 (b)。第 2 款：$2\times2$ 子阵 $\begin{pmatrix}1&s\\s&1\end{pmatrix}$ 半正定即 $\lvert s\rvert\le1$；对任意 $z$，把 $\{x,y,z\}$ 上的半正定读数表写成实内积空间中单位向量 $e_x,e_y,e_z$ 的格拉姆阵，$s_{xy}=1$ 时 $\lVert e_x-e_y\rVert^2=2-2s_{xy}=0$，所以 $e_x=e_y$，$s_{xz}=s_{yz}$；$s_{xy}=-1$ 时 $e_x=-e_y$。

第 3 款的例子就是 E.8.1.1 末段 $(M_2(\mathbb{R}),{}^\sharp)$ 中的三点：$s_{01}=s_{02}=\frac{\sqrt2}{2}$，$s_{12}=-\frac18$，读数表的行列式为 $-\frac{9}{64}$。对非负权重，
$$
p^{\mathsf T}Gp=p_0^2+p_1^2+p_2^2+\sqrt2\,p_0(p_1+p_2)-\frac14p_1p_2\ \ge\ p_0^2+\frac78\left(p_1^2+p_2^2\right)>0,
$$
所以 (a) 在这三个对象上成立。把对立者 $-x_0,-x_1,-x_2$（仍在 $\mathrm{SL}(2,\mathbb{R})$ 中，$\mathrm{CMP}(x,-x)=-\mathbf{1}$，条款 II–IV 照旧成立）加进对象集，系综 $E=\frac{1}{2+\sqrt2}\left(\sqrt2\,\delta_{\bar x_0}+\delta_{x_1}+\delta_{x_2}\right)$ 给出 $S(E,E)=-\frac{3-2\sqrt2}{8}<0$。双曲点对是同一种情形：$s_{01}=\cosh\eta>1$ 时非负权重给出 $p_0^2+p_1^2+2p_0p_1\cosh\eta>0$；有了对立者，$E=\frac12\left(\delta_{x_0}+\delta_{\bar x_1}\right)$ 给出 $\frac12(1-\cosh\eta)<0$。
:::

与 [@rem-appe-gram-from-flatness] 第 3 款对照：那里由条款 IV 加正性条件推出 (b)。这里说，要推出 (b)，正性条件也可以换成两句只谈比较对象与读数的话：**每个对象都有一个对立者；从同一个系综独立抽两个对象，它们的平均求同读数不为负。** 这两句并不等价于正性条件。它们仍然容许 $s=\pm1$ 而 $A\neq0$ 的抛物点对：在 [@ex-appe-layer0-countermodels] 反例 (b) 的对偶数中取对象 $\pm1$、$\pm(1+\varepsilon)$，读数只取 $\pm1$，读数表半正定，(a) 成立，正性条件失败。但由第 2 款，这样的两个对象对一切求同读数不可分辨，它们的差别只在求异通道里。被排除的是双曲分支；在洛伦兹读法下（`MODEL`），把一个指向未来的单位类时向量与一个指向过去的混在一起，平均成了类空的，这就是上面的负读数。

上面留下一个问题：能不能找一个也看得见求异通道的读数条件，把抛物点对也排除掉，从而由读数推出正性条件？在“读数由态给出”的前提下，答案是否定的。

::: {.remark #rem-appe-positivity-invisible-part title="正性条件中态的读数都看不见的部分（手工推导与文献结果）"}
**手工推导。** 设 $\mathcal{A}$ 是实或复的含幺 $*$-代数。称线性泛函 $\varphi$（复代数上为复线性）为**态**，若 $\varphi(\mathbf{1})=1$，对一切 $a$ 有 $\varphi(a^*a)\ge0$，并且 $\varphi(a^*)=\overline{\varphi(a)}$。复代数上最后一条由前两条推出，所以态就是 E.8.1.3 所用的归一正泛函。实代数上最后一条是额外的限制：它使态在一切满足 $a^*=-a$ 的元素上为零，所以实代数上的态读不到求异部分；E.8.1.3 只要求在自伴元上取实值，在实代数上这不构成限制。比较值及其对合的任意有限乘积在态下的值，称为一个**读数**；E.8.1.3 的求同读数与 E.8.3.1 的轨道记录都是读数（后者在复代数上，含求异读数 $i\operatorname{Im}f$），E.8.2.4 的系综读数是读数的平均。设 $\mathcal{A}$ 上至少有一个态，令

$$
\mathcal{R}=\left\{a\in\mathcal{A}:\ \varphi(a^*a)=0\ \text{对一切态}\ \varphi\right\}.
$$

1. 对 $r\in\mathcal{R}$、$y,z\in\mathcal{A}$ 与一切态 $\varphi$，$\varphi(yrz)=0$；$\mathcal{R}$ 是对 $*$ 封闭的双边理想。
2. 若 $a^*a=-t\mathbf{1}$，$t\ge0$，则 $t=0$ 且 $a\in\mathcal{R}$。所以正性条件成立当且仅当 $\mathcal{A}$ 中没有非零的 $a$ 满足 $a^*a=0$，而这样的 $a$ 都在 $\mathcal{R}$ 中；在商代数 $\mathcal{A}/\mathcal{R}$ 上正性条件总成立。
3. 若两个取值于 $\mathcal{A}$ 的比较映射逐点只差 $\mathcal{R}$ 中的元素，即 $\mathrm{CMP}'(x,y)-\mathrm{CMP}(x,y)\in\mathcal{R}$，则两者的一切读数相同。
4. 存在取值于一个复 $*$-代数、满足条款 I–IV 的比较映射，正性条件在该代数（也在它的比较值生成的子代数）中失败，而它的一切读数与同一代数中一个克利福德比较映射的读数相同，后者的比较值生成的子代数满足正性条件。

推导：态满足柯西—施瓦茨不等式 $\lvert\varphi(y^*x)\rvert^2\le\varphi(y^*y)\,\varphi(x^*x)$，这由 $\varphi\bigl((x+\lambda y)^*(x+\lambda y)\bigr)\ge0$ 对一切标量 $\lambda$ 成立并用 $\varphi(x^*y)=\overline{\varphi(y^*x)}$ 得到；推导不用任何范数或有界性。第 1 款：给定 $z$，$\chi(x)=\varphi(z^*xz)$ 满足 $\chi(x^*x)\ge0$ 与对合相容；$\chi(\mathbf{1})>0$ 时 $\chi/\chi(\mathbf{1})$ 是态，故 $\chi(r^*r)=0$；$\chi(\mathbf{1})=0$ 时柯西—施瓦茨给出 $\lvert\chi(x)\rvert^2\le\chi(\mathbf{1})\chi(x^*x)=0$。两种情形都有 $\varphi\bigl((rz)^*(rz)\bigr)=0$，即 $rz\in\mathcal{R}$。再由柯西—施瓦茨，$\lvert\varphi(y\,rz)\rvert^2\le\varphi(yy^*)\,\varphi\bigl((rz)^*(rz)\bigr)=0$。于是 $\varphi\bigl((r+r')^*(r+r')\bigr)=2\operatorname{Re}\varphi(r^*r')=0$，$\varphi\bigl((yr)^*(yr)\bigr)=\varphi\bigl((r^*y^*y)\,r\,\mathbf{1}\bigr)=0$，$\varphi(rr^*)=\varphi(\mathbf{1}\,r\,r^*)=0$：$\mathcal{R}$ 是子空间，对左右乘封闭，对 $*$ 封闭。第 2 款：取一个态，$-t=\varphi(a^*a)\ge0$，所以 $t=0$，$a^*a=0$，从而 $a\in\mathcal{R}$；在商代数中，若 $a^*a+t\mathbf{1}\in\mathcal{R}$，$t\ge0$，由第 1 款 $\varphi(a^*a)+t=0$，同样得 $t=0$ 与 $a\in\mathcal{R}$。第 3 款：把乘积中每个因子写成原因子加上 $\mathcal{R}$ 中的元素再展开（$\mathcal{R}$ 对 $*$ 封闭，对合的因子也一样），除原乘积外每一项都夹着一个 $\mathcal{R}$ 中的因子，由第 1 款读数为零。第 4 款：在 $\mathcal{Cl}_{3,0}$ 中取两两不平行的单位向量 $x_1,\dots,x_N$（$N\ge2$），$c_{ij}=x_ix_j$；对合取反转，以中心元 $\mathbf{I}=e_1e_2e_3$ 为虚数单位，$\mathcal{Cl}_{3,0}$ 就是泡利矩阵模型 $M_2(\mathbb{C})$，反转就是厄米共轭，正性条件成立。令 $\mathcal{A}'=\mathcal{Cl}_{3,0}[\delta]$，$\delta$ 与一切元素对易，$\delta^2=0$，$\delta^*=-\delta$，它仍是以 $\mathbf{I}$ 为虚数单位的复 $*$-代数，有态（例如 $x+y\delta\mapsto\frac12\operatorname{Tr}x$）。取互不相同的实数 $n_i$，令

$$
c'_{ij}=x_ix_j\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr).
$$

由 $(\mathbf{1}+k\delta)(\mathbf{1}+k\delta)^*=\mathbf{1}-k^2\delta^2=\mathbf{1}$ 与 $\bigl(\mathbf{1}+(n_j-n_i)\delta\bigr)\bigl(\mathbf{1}+(n_k-n_j)\delta\bigr)=\mathbf{1}+(n_k-n_i)\delta$，条款 II–IV 成立；$c$ 的行互不相同，$c'$ 的行也互不相同，条款 I 的商不识别任何两点。$\delta^*\delta=0$，由第 2 款 $\delta\in\mathcal{R}$，所以 $c'-c$ 逐点在 $\mathcal{R}$ 中，由第 3 款两者在 $\mathcal{A}'$ 的一切态下的一切读数相同。但 $c'_{ij}+c'_{ji}-2(x_i\cdot x_j)\,c'_{ii}=2(n_j-n_i)\,\delta\,A(x_i,x_j)$ 属于 $c'$ 生成的代数；$i\neq j$ 时它不为零，它的 $a^*a$ 却为零，所以正性条件在这个代数中失败。

态的前提不能省。把 $\mathcal{A}'$ 只当作实 $*$-代数时，$\varphi(x+y\delta)=\langle x\rangle_0+\kappa\langle y\rangle_0$（$\langle\cdot\rangle_0$ 为标量部分，$\kappa$ 为任意实数）在自伴元上取实值、归一且正（$\varphi\bigl((a+b\delta)^*(a+b\delta)\bigr)=\langle a^*a\rangle_0$），但不满足对合相容；它的读数区分两个比较映射：$\varphi(c'_{ij})-\varphi(c_{ij})=\kappa(n_j-n_i)\,(x_i\cdot x_j)$，虽然两者的求同读数仍然相同。

$\mathcal{R}$ 正是一切态的 GNS 表示的核之交：$\pi_\varphi(a)=0$ 当且仅当 $\varphi(b^*a^*ab)=0$ 对一切 $b$ 成立，由第 1 款这对 $a\in\mathcal{R}$ 成立，反过来取 $b=\mathbf{1}$。

**文献结果。** 一个 $*$-代数的约化理想定义为它的一切 $*$-表示的核之交，曾被称为 $*$-根（Palmer 1972）。那里的表示是希尔伯特空间上的有界算子表示，与这里由态得到的 GNS 表示不必相同，所以 $\mathcal{R}$ 只是与它同类的对象。
:::

所以，在读数由态给出、并且至少有一个态的前提下，正性条件等价于“没有非零的零平方元素”。前提本身已经排除了双曲分支，因为双曲比较的求异部分满足 $A^*A=(1-s^2)\mathbf{1}$，而 $s^2>1$ 时没有态能让它的读数非负。剩下的“没有非零的零平方元素”排除抛物分支，例如 [@ex-appe-layer0-countermodels] 反例 (b) 的对偶数 $1+\varepsilon$，其求异部分 $\varepsilon$ 满足 $\varepsilon^*\varepsilon=0$，落在 $\mathcal{R}$ 中。由第 3、4 款，这一部分不能由态的任何读数条件推出：无论读求同通道还是求异通道，读系综还是轨道记录，读多少个比较值的乘积，都一样。上面系综自洽留下的抛物点对，在态的读数下不只是对求同读数不可分辨，而是对一切读数不可分辨。反过来，若把条款 I 用在读数上（`MODEL`），即把一切读数都相同的元素视为同一个，也就是转到 $\mathcal{A}/\mathcal{R}$，正性条件就自动成立。所以在这个前提下，这部分输入不是读数能补上的缺口，它是关于读数之外的代数结构的约定。

同一个“把比较用到系综上”的办法，也给单比特上的 `H5` 换一种说法。

::: {.remark #rem-appe-ensemble-extensionality-born title="系综外延性推出单比特玻恩律，不需要连续性（手工推导与文献结果）"}
**手工推导。** 沿用 [@rem-appe-born-zonal-minimal-rank] 的设定：制备 $\mathbf{s}$、出口 $\mathbf{r}$ 的概率为 $f(\mathbf{s}\cdot\mathbf{r})$，但 $f:[-1,1]\to\mathbb{R}$ 不要求连续。系综的出口概率按定义取平均，$p(\mathbf{r}\mid E)=\sum_kp_kf(\mathbf{s}_k\cdot\mathbf{r})$；它对探针 $\mathbf{z}$ 的平均求同读数是 $\sum_kp_k\,\mathbf{s}_k\cdot\mathbf{z}=\mathbf{m}_E\cdot\mathbf{z}$，$\mathbf{m}_E$ 是重心。称规则满足**系综外延性**，若对一切探针平均求同读数相同的两个系综，对一切出口的概率也相同；由于 $\mathbf{m}\cdot\mathbf{z}$ 对一切单位向量 $\mathbf{z}$ 决定 $\mathbf{m}$，这就是“出口概率只依赖重心”。则：

$$
\text{系综外延性}\iff f(t)=a+bt ;
$$

再加 $f(1)=1$ 与对径归一 $f(t)+f(-t)=1$，即得 $f(t)=\frac{1+t}{2}$。

推导：仿射规则显然满足。反之固定 $\mathbf{r}$。闭单位球中每一点都是某个系综的重心（过该点任作一条弦，两端点按比例加权），由系综外延性 $G(\mathbf{m}):=p(\mathbf{r}\mid E)$（$\mathbf{m}_E=\mathbf{m}$）良定；两个系综按 $\lambda:1-\lambda$ 混合，重心与出口概率都按同一比例组合，所以 $G$ 在球上保持凸组合。令 $h=G-G(0)$，与重心 $0$ 混合得 $h(\lambda\mathbf{m})=\lambda h(\mathbf{m})$（$0\le\lambda\le1$），取中点得 $h\left(\frac{\mathbf{m}+\mathbf{m}'}{2}\right)=\frac12\left(h(\mathbf{m})+h(\mathbf{m}')\right)$；于是 $L(\mathbf{y}):=h(\varepsilon\mathbf{y})/\varepsilon$（$\varepsilon>0$，$\varepsilon\lVert\mathbf{y}\rVert\le1$）与 $\varepsilon$ 无关，可加、正齐次，且由 $h(\varepsilon\mathbf{y})+h(-\varepsilon\mathbf{y})=2h(0)=0$ 是奇的，因而是线性的。这里 $\lambda$ 取遍 $[0,1]$ 中的实数，所以不需要任何连续性。于是 $G(\mathbf{m})=a+\mathbf{b}\cdot\mathbf{m}$，$f(\mathbf{s}\cdot\mathbf{r})=a+\mathbf{b}\cdot\mathbf{s}$ 对一切单位向量 $\mathbf{s}$ 成立。在与 $\mathbf{r}$ 正交的大圆上左端恒为 $f(0)$，$\mathbf{s}$ 与 $-\mathbf{s}$ 同在其上，故 $\mathbf{b}\cdot\mathbf{s}=0$，$\mathbf{b}$ 与 $\mathbf{r}$ 平行，$f(t)=a+\beta t$。

三次规则 $f(t)=\frac12(1+t^3)$ 违反系综外延性：三叉戟 $\{(0,0,1),\,(\mp\frac{\sqrt3}{2},0,-\frac12)\}$ 等权与对径对 $\{\pm\mathbf{e}_z\}$ 等权的重心都是 $0$，向 $\mathbf{e}_z$ 出口的概率分别是 $\frac58$ 与 $\frac12$。同一论证在 $\mathbb{CP}^{d-1}$ 上也成立：读数取 $\lvert\langle x\mid z\rangle\rvert^2=\operatorname{Tr}(P_xP_z)$，平均读数决定密度矩阵，系综外延性给出 $f\bigl(\operatorname{Tr}(PQ)\bigr)=a+\operatorname{Tr}(BP)$；对保持 $Q$ 不动的酉群取平均，$B$ 换成 $\beta Q+\gamma(\mathbf{1}-Q)$，所以 $f$ 仿射，再加 $f(0)=0$、$f(1)=1$ 得 $f(t)=t$。

**文献结果。** 广义概率论把态取为制备的等价类，并把出口概率当作态的仿射函数（Hardy 2001；Barrett 2007）。上面的推导就是这一点在带状规则上的具体化；带状写法与三叉戟反例只是把它接到比较的读数上。
:::

在这个读法下（`MODEL`），系综外延性是条款 I 用在系综上：把系综当作对象，把平均比较读数当作它的比较行，条款 I 说比较行相同的系综是同一个对象，出口概率作为这个对象的函数便只依赖比较行。与 [@rem-appe-born-zonal-minimal-rank] 相比，它不要连续性，也不要勒让德展开；在连续、对径归一、$f(1)=1$ 之下两者等价，都等价于玻恩律。它仍是输入：条款 I–IV 本身只管单个对象之间的比较，对概率规则没有约束，三次规则与它们都相容。不同的只是，这条输入现在也可以说成条款 I 的一个延伸。
