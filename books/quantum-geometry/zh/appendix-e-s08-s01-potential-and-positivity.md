# E.8.1 比较势、格拉姆正性与曲率 {#sec-appendix-e-s08-s01-potential-and-positivity}

## E.8.1.1 单对比较：弦与矢高在第 0 层已经锁死 {#sec-appe-chord-sagitta-layer0}

取一对对象的比较 $u=\mathrm{CMP}(x,y)$。条款 II 给出 $u^*=\mathrm{CMP}(y,x)$，条款 III 对有序对 $(x,y)$ 与 $(y,x)$ 都成立，所以 $uu^*=u^*u=\mathbf{1}$。沿用 §30.3.1 的名字，把 $v:=\mathbf{1}-S$ 叫作**矢高**，把 $\Delta:=u-\mathbf{1}=A-v$ 叫作**割弦**。

::: {.remark #rem-appe-chord-sagitta-layer0 title="公平比较的弦—矢高锁死（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是 $2$ 可逆的含幺结合 $*$-代数，$u\in\mathcal{A}$ 满足 $uu^*=u^*u=\mathbf{1}$，$S=\frac12(u+u^*)$，$A=\frac12(u-u^*)$，$v=\mathbf{1}-S$，$\Delta=u-\mathbf{1}$。则：

1. $SA=AS$；
2. $S^2-A^2=\mathbf{1}$；
3. $A^2=-v(2-v)$；
4. $\Delta^*\Delta=\Delta\Delta^*=2v$。

推导：$uu^*=(S+A)(S-A)=S^2-SA+AS-A^2$，$u^*u=(S-A)(S+A)=S^2+SA-AS-A^2$，两者都等于 $\mathbf{1}$。相减得 $2(AS-SA)=0$，$2$ 可逆，故第 1 款成立；相加得第 2 款。第 3 款是 $A^2=S^2-\mathbf{1}=-(\mathbf{1}-S)(\mathbf{1}+S)$。第 4 款由 $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$ 得到，另一侧同理。
:::

这四款有三处直接的用途。

第一，[@def-ch32-axiom-of-comparison] 条款 III 之后把“$S$ 与 $A$ 对易”列为特殊情形。第 1 款说明它不是额外条件：只要条款 III 对两个次序都成立，对易就成立，勾股公平 $S^2-A^2=\mathbf{1}$ 也随之成立。

第二，§30.3.1 的两条恒等式 $(1-v_\epsilon)^2+c_\epsilon^2=1$ 与 $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ 是第 2、4 款在 $A=c_\epsilon\hat{\mathbf B}$、$\hat{\mathbf B}^2=-\mathbf{1}$ 时的写法。在第 0 层成立的是 $S^2-A^2=\mathbf{1}$ 与 $\Delta^*\Delta=2v$ 本身，它们不依赖三角函数实现。

第三，取 $v=\mathbf{1}$（即 $S=0$，直角比较）时第 3 款给出 $A^2=-\mathbf{1}$。这在复矩阵上就是冻结定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)：`H4` 所需的复结构 $R^2=-I$ 是锁死恒等式在矢高等于 $1$ 处的切片。

再看签名。设 $\mathcal{A}$ 是实代数，求同读数是实标量 $S=s\mathbf{1}$。第 3 款成为 $A^2=-v(2-v)\mathbf{1}$，$v=1-s$，于是 $A^2$ 的符号完全由矢高落在哪里决定：

| 矢高 $v$ | $A^2$ | $A\neq0$ 时 $\mathbb{R}[A]$ 的类型 | [@ex-appe-layer0-countermodels] 中的对应 |
| :---: | :---: | :--- | :--- |
| $0<v<2$ | 负 | 复数，椭圆 | 第 1 层的转动 |
| $v=0$ 或 $v=2$ | $0$ | 对偶数，抛物 | 反例 (b) 的 $1\pm\varepsilon$（$v=0$） |
| $v<0$ 或 $v>2$ | 正 | 分裂复数，双曲 | 反例 (b) 的 $\cosh\eta\pm j\sinh\eta$（$v=1-\cosh\eta<0$） |

::: {.remark #rem-appe-involution-positivity title="对合正性排除抛物与双曲分支（手工推导）"}
**手工推导。** 称实 $*$-代数 $\mathcal{A}$ 的对合满足**正性条件**，若

$$
a^*a=-t\,\mathbf{1},\quad t\ge0\qquad\Longrightarrow\qquad a=0 .
$$

设正性条件成立，$u$ 满足 $uu^*=u^*u=\mathbf{1}$ 且 $S=s\mathbf{1}$（$s\in\mathbb{R}$），$u\neq\pm\mathbf{1}$。则 $-1<s<1$，并且

$$
u=\cos\theta\,\mathbf{1}+J\sin\theta,\qquad \theta=\arccos s\in(0,\pi),\qquad J=\frac{A}{\sin\theta},\qquad J^*=-J,\qquad J^2=-\mathbf{1}.
$$

推导：由 [@rem-appe-chord-sagitta-layer0] 第 4 款，$\Delta^*\Delta=2(1-s)\mathbf{1}$。若 $s\ge1$，取 $t=2(s-1)$，正性条件给出 $\Delta=0$，即 $u=\mathbf{1}$。对 $-u$ 重复同一论证，$s\le-1$ 时 $u=-\mathbf{1}$。其余情形 $-1<s<1$，由第 3 款 $A^2=-(1-s^2)\mathbf{1}$，除以 $\sin^2\theta=1-s^2$ 即得。

正性条件在对偶数上失败（$\varepsilon^*\varepsilon=-\varepsilon^2=0$ 而 $\varepsilon\neq0$），在分裂复数上失败（$j^*j=-j^2=-1$）。它在每个 $C^*$-代数中成立，因为 $a^*a$ 是正元且 $\lVert a^*a\rVert=\lVert a\rVert^2$（`文献结果`）；也在带忠实正泛函 $\varphi$ 的 $*$-代数中成立：$\varphi(a^*a)\ge0$ 且仅当 $a=0$ 时取零，于是 $a^*a=-t\mathbf{1}$ 迫使 $t=0$ 与 $a=0$。
:::

所以 `H2` 中“椭圆负平方”一项可以换成一句只谈往返的话：**有差异，往返就留下正的痕迹。** 它排除的正是反例 (b) 的两个分支，而且只排除它们。

这两个分支本身并不是病态模型。把 $2\times2$ 复矩阵看成实代数，对合取经典伴随 $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$，则 $aa^\sharp=\det(a)\mathbf{1}$，满足 $uu^\sharp=\mathbf{1}$ 的元素恰是 $\mathrm{SL}(2,\mathbb{C})$；每个这样的 $u$ 的求同部分 $S=\frac12\operatorname{tr}(u)\mathbf{1}$ 自动是中心标量，矢高 $v=1-\frac12\operatorname{tr}u$ 是复数（`手工推导`）。按迹对莫比乌斯变换分类的经典结果（`文献结果`）翻译成矢高的语言是：$u\neq\pm\mathbf{1}$ 时，$v\in(0,2)$ 为椭圆类，$v\in\{0,2\}$ 为抛物类，$v$ 为其余实数时为双曲类，$v\notin\mathbb{R}$ 为斜驶类。反例 (b) 的生成元都住在这里：$\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$，$j\mapsto\operatorname{diag}(1,-1)$，椭圆生成元 $\mapsto\operatorname{diag}(i,-i)$，三者都满足 $g^\sharp=-g$，平方分别是 $0$、$+\mathbf{1}$、$-\mathbf{1}$。冻结定理 [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) 给出实 $2\times2$ 无迹生成元中双曲形 $\operatorname{diag}(\delta,-\delta)$ 与椭圆形 $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ 的迹、行列式与平方；它的中间情形是零矩阵，非零幂零的抛物生成元不在该定理之内。这个代数上没有满足 $\varphi(a^\sharp a)\ge0$ 的归一正泛函（$a=\operatorname{diag}(1,-1)$ 给出 $a^\sharp a=-\mathbf{1}$），所以 E.8.1.3 的读数论证不适用于它。

$\mathrm{SL}(2,\mathbb{C})$ 经 $X\mapsto uXu^\dagger$ 作用在厄米矩阵 $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ 上并保持 $\det X=t^2-\lvert\mathbf{x}\rvert^2$，这是洛伦兹群的旋量覆盖（`文献结果`）；E.6 已引用的 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) 说明零锥把二次型定到只差一个标量。若再要求对厄米共轭也公平（$uu^\dagger=\mathbf{1}$），剩下的就是 $\mathrm{SU}(2)$，只含椭圆类。由此得到 `H2` 与 `H8` 的一个统一读法（`MODEL`）：**第 0 层留出的抛物与双曲分支，就是洛伦兹变换里的零转动与推进；选椭圆签名与选洛伦兹签名，是同一个代数里对合正性的取与舍。**

E.8.3.2 把这个读法算到底（[@rem-appe-rotor-boost-coexistence]）：取正性条件选出椭圆一行；仅仅舍去它并不选出洛伦兹签名，还要加上时间次序条件与“求异部分不是零平方”；对同一个比较 $u\neq\mathbf{1}$，正性条件与时间次序条件不能同时成立。所以“取与舍”指的是同一张三分表上为不同的比较选不同的行。

正性条件用在单个比较的求异部分上，有一个只谈重复比较的等价说法。

::: {.remark #rem-appe-bounded-recurrence title="单个比较上正性条件的操作形式：重复同一比较，读数不放大（手工推导与文献结果）"}
**手工推导。** 设 $\mathcal{A}$ 是实 $*$-代数，即实数域上的含幺结合代数，对合是 $\mathbb{R}$-线性的并且 $\mathbf{1}^*=\mathbf{1}$。设 $u$ 满足 $uu^*=u^*u=\mathbf{1}$，求同读数是实标量 $S=s\mathbf{1}$。由 $u+u^*=2s\mathbf{1}$ 与 $uu^*=\mathbf{1}$ 得 $u^2=2su-\mathbf{1}$，所以 $u^{n+1}=2su^n-u^{n-1}$，这是切比雪夫多项式的三项递推。于是对一切 $n\ge0$，

$$
u^{n}=T_n(s)\,\mathbf{1}+U_{n-1}(s)\,A,\qquad u^{-n}=T_n(s)\,\mathbf{1}-U_{n-1}(s)\,A,
$$

其中 $T_n$、$U_n$ 是第一类与第二类切比雪夫多项式，$U_{-1}=0$。把同一个比较连做 $n$ 次，矢高由 $v$ 变为 $v_n=1-T_n(1-v)$。

在 $\operatorname{span}\{\mathbf{1},A\}$ 上任取一个范数。双向轨道 $\{u^n\}_{n\in\mathbb{Z}}$ 有界，当且仅当 $-1\le s\le1$，并且 $s=\pm1$ 时 $A=0$：

- $\lvert s\rvert<1$：令 $s=\cos\theta$，则 $T_n(s)=\cos n\theta$，$U_{n-1}(s)=\dfrac{\sin n\theta}{\sin\theta}$，轨道有界；
- $s=\pm1$：$u^n=(\pm1)^n(\mathbf{1}\pm nA)$，只在 $A=0$ 时有界；
- $\lvert s\rvert>1$：令 $\lvert s\rvert=\cosh\eta$，则 $\lvert T_n(s)\rvert=\cosh n\eta$ 无界。此时 $A^2=(s^2-1)\mathbf{1}\neq0$，而 $A^*=-A$ 说明 $A$ 不是 $\mathbf{1}$ 的实数倍，所以 $\mathbf{1}$ 前的系数无界就使轨道无界。

另一方面 $A^*A=-A^2=(1-s^2)\mathbf{1}$。把 [@rem-appe-involution-positivity] 的正性条件用在 $a=A$ 上：$1-s^2\le0$ 时必须 $A=0$，从而 $s^2=1$。这恰好也是“$-1\le s\le1$，并且 $s=\pm1$ 时 $A=0$”。所以对求同读数为实标量的比较，**正性条件对它的求异部分成立，当且仅当它的整数次幂有界**。

**文献结果。** 多个比较同时出现时，有限维情形有同方向的结论。设 $\mathcal{A}$ 由有限维实或复向量空间上的线性算子组成，$\Gamma$ 是由满足 $gg^*=g^*g=\mathbf{1}$ 的元素构成的有界群。对 $\Gamma$ 的闭包取平均得到一个 $\Gamma$-不变的内积，在这个内积下 $\Gamma$ 的元素都是等距，于是对 $\Gamma$ 的实线性张成中的 $a$，$a^*$ 就是 $a$ 的伴随，$a^*a$ 是半正定算子，正性条件在这个张成上成立（有界群的酉化，对紧群取平均的标准论证）。
:::

三种情形正是上表的三行。椭圆的比较重复多少次，求同读数都留在 $[-1,1]$ 之内；抛物的比较求同读数停在 $\pm1$（$v=2$ 时逐次变号），求异读数随次数线性增长；双曲的比较读数按指数增长。所以对单个比较，正性条件可以读成一条不放大的要求：**同一个比较重复任意多次，读数不发散。** 在洛伦兹群里，被它排除的线性增长与指数增长分别是零转动与推进。正性条件独立于条款 IV：取 $X=\mathrm{SL}(2,\mathbb{C})$、$\mathrm{CMP}(x,y)=x^\sharp y$，条款 II、III、IV 都成立，而正性条件失败。

逐个比较都不放大，还不足以得出多点格拉姆半正定。在 $(M_2(\mathbb{R}),{}^\sharp)$ 中取 $x_0=\mathbf{1}$、$x_1=\cos\theta\,\mathbf{1}+J\sin\theta$、$x_2=\cos\theta\,\mathbf{1}-J'\sin\theta$，其中 $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$J'=\begin{pmatrix}0&-2\\\frac12&0\end{pmatrix}$、$\theta=\frac\pi4$，并令 $\mathrm{CMP}(x,y)=x^\sharp y$。条款 II、III、IV 都成立，三个比较的求同读数是 $\frac{\sqrt2}{2}$、$\frac{\sqrt2}{2}$、$-\frac18$，都落在椭圆区间里，而读数表的行列式是 $-\frac{9}{64}$（`手工推导`）。多点情形需要的是比较值生成的群整体有界，也就是上面文献结果一段的前提；这个例子里生成的群无界。

## E.8.1.2 第三点冗余：势表示及其稳定性 {#sec-appe-gain-potential}

下面把 $\mathrm{CMP}(x,y)$ 简写为 $c_{xy}$。

::: {.definition #def-appe-third-point-redundancy title="条款 IV：第三点冗余（本书模型）"}
设比较映射 $\mathrm{CMP}:X\times X\to\mathcal{A}$ 满足 [@def-ch32-axiom-of-comparison] 的条款 II 与 III。称它满足**第三点冗余**（`MODEL`），若对一切 $x,y,z\in X$，

$$
c_{xy}\,c_{yz}=c_{xz}.
$$

等价地，一切三点闭环的和乐 $h(x,y,z):=c_{xy}\,c_{yz}\,c_{zx}$ 等于 $\mathbf{1}$。当只有一部分点对可以比较时，把可比的点对看成图 $G$ 的边，并只对 $G$ 中两两可比的三点要求上式。
:::

第 1 层的克利福德实现满足条款 IV：单位向量的几何积给出 $xy\cdot yz=xz$。[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) 说明第 2 层时已经指出“原始向量边乘积本身平坦无曲率”，条款 IV 把这句话立为条件。它与全书的出发点同向：两子丈量不需要外部第 3 点，现在进一步要求内部的第三点也不改变结果。

条款 IV 的主要后果是：每个对象可以用一个群元来代表，比较就是两个代表元之比。在有限点集上，这是一条冻结定理，而且需要的条件比“任意三点”更少。

::: {.theorem #thm-appe-chordal-gain-potential title="有限弦图上三角相容的群值增益是顶点势之比" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential"}
设 $V$ 为有限顶点集，$H$ 为任意群，$G$ 为 $V$ 上的简单弦图，即 $G$ 中每个长度至少为 $4$ 的圈都有弦。设映射 $g:V\times V\to H$ 满足：

1. 对每条边 $\{i,j\}$，$g(j,i)=g(i,j)^{-1}$；
2. 对两两相邻的 $i,j,k$，$g(i,j)\,g(j,k)=g(i,k)$。

则存在 $\varphi:V\to H$，使得对每条边 $\{i,j\}$，

$$
g(i,j)=\varphi(i)^{-1}\varphi(j).
$$

群 $H$ 不必交换，图 $G$ 不必连通；$g$ 在对角线与非边上的取值不受假设约束，结论也不涉及它们。
:::

::: proof
对顶点子集的大小作归纳，逐个加回顶点。弦图的每个非空诱导子图仍是弦图，因而含有一个单纯顶点 $x$：它在子图里的邻居两两相邻。先对去掉 $x$ 的子集用归纳假设，得到势 $\psi$。如果 $x$ 在子集里没有邻居，$\psi$ 已经满足要求。否则任取一个邻居 $w$，令 $\varphi(x)=\psi(w)\,g(x,w)^{-1}$，其余顶点沿用 $\psi$。对 $x$ 的另一个邻居 $j$，单纯性保证 $w$ 与 $j$ 相邻，三角相容给出 $g(x,j)=g(x,w)\,g(w,j)=g(x,w)\,\psi(w)^{-1}\psi(j)=\varphi(x)^{-1}\varphi(j)$；指向 $x$ 的边由第 1 款取逆得到。整个论证只用群的结合律与逆元，没有交换任何两个群元。完整证明由 Lean 内核检查。
:::

用到比较上：取 $H$ 为 $\mathcal{A}$ 中满足 $uu^*=u^*u=\mathbf{1}$ 的元素构成的群，条款 II、III 给出第 1 款，条款 IV 给出第 2 款。完全图是弦图，所以有限点集上的条款 IV 推出 $c_{xy}=\varphi_x^{-1}\varphi_y$。定理多给的一点对本书更有用：**不必两两可比。** 只要可比关系构成弦图，每个可比三角形平坦，势表示就存在。这与[§25.1](ch29-s03-timeless-gram-causality.md) 用弦图把局部半正定块补成整体半正定矩阵（[@thm-ch29-chordal-psd-completion]）用的是同一个组合条件。这类条件不能完全去掉：四圈上没有三角形，条件 2 成为空话，而绕圈一周的乘积可以取任意值，势表示可以不存在。弦性是充分条件，不是必要条件：带轮毂的四轮图不是弦图，三角相容却仍然推出势表示，取 $\varphi(i)=g(\text{毂},i)$ 即可（`手工推导`）。

实际的比较总带误差。链式律只是近似成立时，势表示也只是近似成立，偏差有明确的上界。

::: {.theorem #thm-appe-chordal-gain-potential-stability title="近似三角相容给出近似顶点势" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential"}
设 $V$ 为有限顶点集，$G$ 为 $V$ 上的简单弦图。设群 $H$ 带有伪度量 $d$，且左乘与右乘都是等距：对一切 $a,x,y\in H$，$d(ax,ay)=d(x,y)=d(xa,ya)$。设 $\varepsilon\ge0$，映射 $g:V\times V\to H$ 满足：

1. 对每条边 $\{i,j\}$，$g(j,i)=g(i,j)^{-1}$；
2. 对两两相邻的 $i,j,k$，$d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$。

则存在 $\varphi:V\to H$，使得对每条边 $\{i,j\}$，

$$
d\bigl(g(i,j),\,\varphi(i)^{-1}\varphi(j)\bigr)\le(\lvert V\rvert-2)\,\varepsilon,
$$

其中 $\lvert V\rvert-2$ 是自然数的截断减法，$\lvert V\rvert\le2$ 时取 $0$。
:::

::: proof
构造与 [@thm-appe-chordal-gain-potential] 相同，只是把等式换成距离估计。加回单纯顶点 $x$ 时，对它的邻居 $j$ 用三角不等式：$g(x,j)$ 到 $g(x,w)\,g(w,j)$ 的距离不超过 $\varepsilon$；左乘等距把 $g(x,w)\,g(w,j)$ 到 $\varphi(x)^{-1}\varphi(j)=g(x,w)\,\psi(w)^{-1}\psi(j)$ 的距离化为 $g(w,j)$ 到 $\psi(w)^{-1}\psi(j)$ 的距离，后者由归纳假设控制。于是每加回一个至少有两个邻居的顶点，误差至多增加一个 $\varepsilon$，头两个顶点不产生误差，总计 $(\lvert V\rvert-2)\varepsilon$。指向 $x$ 的边用到取逆是等距，这需要左右两侧的平移不变性。完整证明由 Lean 内核检查。
:::

$C^*$-代数的酉群配上算子范数距离满足定理的等距条件，所以近似平坦的比较可由上述线性上界控制。广度优先分层进一步给出与点数无关的估计。

::: {.theorem #thm-appe-chordal-uniform-gain-potential title="有限弦图上增益势的统一 $4\varepsilon$ 界" lean="D5/S3/Combinatorics/Graph/Chordal/UniformGainPotential.SimpleGraph.IsChordal.exists_uniform_approximate_gain_potential"}
设 $V$ 为有限顶点集，$G$ 为 $V$ 上的简单弦图。设群 $H$ 带有伪度量 $d$，且对一切 $a,x,y\in H$，有 $d(ax,ay)=d(x,y)=d(xa,ya)$。给定实数 $\varepsilon\ge0$ 和映射 $g:V\times V\to H$，假设每条有向棱 $(i,j)$ 都满足 $g(j,i)=g(i,j)^{-1}$，每组两两相邻的顶点 $i,j,k$ 都满足 $d(g(i,j)g(j,k),g(i,k))\le\varepsilon$。

则存在 $\varphi:V\to H$，使所有有向棱 $(i,j)$ 同时满足

$$
d\bigl(g(i,j),\varphi(i)^{-1}\varphi(j)\bigr)\le 4\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-uniform-gain-potential}
分别在各连通分支取根 $o$ 并按到根的距离分层。对层数至少为 $i\ge1$ 的诱导子图中的连通分支 $C$，记 $S_C$ 为第 $i-1$ 层与 $C$ 相邻的顶点集，称为 $C$ 的影子。沿最短路向根走可知 $S_C$ 非空。若影子中两点不相邻，在 $C$ 内部和较低各层各取一条最短连接路。两条路各自无弦，内部顶点的层数相差至少 $2$，因而也无交叉棱。两条路合成的无弦回路与弦性矛盾，故 $S_C$ 是团。$i=1$ 时影子只有根。

当 $i\ge2$，令 $P$ 为上一层尾部诱导子图中包含 $C$ 的分支。$S_C$ 中各点在第 $i-2$ 层的前驱邻域都是 $S_P$ 的非空子集。若两个邻域互不包含，各取一个仅属于其中之一的前驱。这两个前驱和影子中的相应两点构成无弦四环。因此前驱邻域按包含关系嵌套，从最小者中取一点 $a_C$，它与整个 $S_C$ 相邻。

在同一点上令 $\gamma(v,v)=1$，在棱上令 $\gamma(u,v)=g(u,v)$。反向取逆保证有重合顶点的三角比较误差为 $0$。取 $\varphi(o)=1$。深度 $1$ 的分支置 $a_C=o$、$Q_C=1$，其余分支沿父锚递推 $Q_C=Q_P\gamma(a_P,a_C)$。对第 $i$ 层的 $v\in C$ 选前驱 $b_v\in S_C$，置 $\varphi(v)=Q_C\gamma(a_C,b_v)\gamma(b_v,v)$。

根棱精确拟合。同层相邻点 $u,v$ 属于同一分支，故可约去公共前缀 $Q_C$。若 $b_u=b_v$，只需比较一个三角形。否则 $b_u,u,v,b_v$ 构成四环，弦 $b_uv$ 或 $ub_v$ 使两条增益路径可用至多三个三角比较，故误差至多 $3\varepsilon$。对从第 $i-1$ 层到第 $i$ 层的棱 $uv$（$i\ge2$），以 $Q_C\gamma(a_C,u)$ 为中间值。先在父影子一侧比较经 $b_u$ 与经 $a_C$ 到 $u$ 的两条路径，再比较从 $a_C$ 经 $u$ 与经 $b_v$ 到 $v$ 的两条路径。每侧用两个三角比较，左右乘的等距性保留各步误差，合计至多 $4\varepsilon$。相邻顶点的层数至多差 $1$，取逆又保距，故所有有向棱都在此界内。完整证明由 Lean 内核检查。
:::

**闭路缺陷（手工推导）。** 沿用 $g_{uv}=g(u,v)$ 的简记。以下计算采用双不变度量。长为 $\ell$ 的简单回路遇弦可写成 $(pc^{-1})(cq)$，其中 $p,q$ 为两段路径增益，$c$ 为弦增益。两条短回路的长度和是 $\ell+2$，由三角形起归纳，闭路增益距 $1$ 至多 $(\ell-2)\varepsilon$。一般闭游走删去折返并在重复顶点处分解，同样得到 $(\ell-2)_+\varepsilon$，因为各段的正部系数之和不超过原系数。空路径增益为 $1$，故此界也比较同端点路径。森林沿树路径积累增益即可精确拟合，$\varepsilon=0$ 时闭路界给出精确路径无关性。

**小阶常数与反例（手工推导）。** 对图 $(V,E)$ 和双不变度量群 $H$ 中的增益，定义重构误差为 $\inf_{\phi:V\to H}\max_{uv\in E}d(g_{uv},\phi_u^{-1}\phi_v)$。一般度量群中的下确界未必可取到。约定空棱集或空回路集上的最大值为 $0$。记 $C(n)$ 为所有 $n$ 点弦图、双不变度量群及三角缺陷至多为 $\varepsilon>0$ 的增益实例上，重构误差与 $\varepsilon$ 之比的上确界。以下团树论证给出小阶结果。团树的节点是极大团，包含任一点的团连成子树。由单纯顶点消去归纳可构造这样的树。重插顶点时，其邻团若为极大团就将它扩张，否则将新团接到包含邻团的团上。以团中一点 $a$ 为锚，用 $\phi_x=\phi_a g_{ax}$ 可在该团内达到 $\varepsilon$。向子团延拓时，任选分隔团中的锚，新点之间仍在 $\varepsilon$ 内，分隔团到新点的误差至多在旧界上增加 $\varepsilon$。分隔团只有一点时旧界不增加。分隔团为 $\{a,b\}$ 时取 $\phi_x=\phi_b g_{ba}g_{ax}$。此时 $ax$ 的误差等于旧棱 $ab$ 的误差，$bx$ 和新点之间的误差由三角条件控制在 $\varepsilon$ 内。

收缩团交集至多有 $2$ 点的团树棱，记收缩树直径为 $D$。从中央节点的一团或中央棱两端共享一锚的两团起步，所得误差至多 $(1+\lfloor D/2\rfloor)\varepsilon$。当 $D>0$，把直径路径提回原树，首团至少有 $4$ 点，每过一棱增加至少一个新点，故 $n\ge4+D$。若取等号，则所有团构成一条路径，各团有 $4$ 点，相邻团交于三点。若 $D\ge2$ 为偶数，中央两组三点交集有公共点，可用同一锚覆盖中央三团。若 $D\ge3$ 为奇数，中央交集中的三点在两侧交集中各至多失去一点，可覆盖中央四团。这两种起步都少跨一条未收缩棱。连同 $D=0,1$，得到 $\max\{1,\lfloor(n-3)/2\rfloor\}$ 上界。$n=7$ 时余下的情形为 $D=2$。若中央收缩节点中有两个不同的团向外伸出未收缩棱，两团各至少有 $4$ 点、交集至多有 $2$ 点，再加各分支的新点，至少需 $8$ 点。因此所有未收缩棱都从同一团 $K$ 出发。若只有两条，$|K|\le5$，两组三点以上的交集必有公共锚。若有三条，$|K|=4$，各交集至多删去一点，仍有公共锚。延拓经过的余棱都已收缩，故这一阶的上界也是 $1$。

整数直线上的三角形，总增益为 $1$，迫使至少一个整数棱误差达到 $1$。构造 $8$ 点下界时，在 $K_4$ 的每个三点面 $S$ 外添一个只与 $S$ 相邻的点 $x_S$。这是弦图。以整数循环格为目标，范数取有向三角边界的最短整数分解长度。用树路径链 $p_i$ 取增益 $g_{ij}=p_i+[ij]-p_j$，其三角和为有向三角边界 $t_{ijk}$，范数为 $1$。若有误差至多 $1$ 的势，每条有向棱的残差 $R_{ij}=g_{ij}-(\phi_j-\phi_i)$ 是零或一个有向三角边界，仍有同样的三角和。固定 $S$，取 $x=x_S$，投影到 $[xa]$（$a\in S$）的坐标。非零投影为 $e_a-e_b$，且唯一确定残差为 $t_{xab}$。若 $S$ 的棱残差在此投影下全为零，则由 $R_{xa}+R_{ab}-R_{xb}=t_{xab}$，$R_{xa}$ 的投影为 $e_a+p$，其中同一个整数向量 $p$ 的坐标和为 $-1$。若有正坐标，就会使某个 $e_a+p$ 的一个坐标大于 $1$。故各坐标非正，由坐标和 $-1$ 得 $p=-e_j$。对其余两点 $a,b$，得 $R_{ab}=t_{xab}-t_{xaj}+t_{xbj}=t_{jab}$，即棱 $ab$ 的残差为该面的有向边界，另外两棱在面和中互相抵消。不同面要求这样的棱互异。

若所有核心棱在各外点坐标下均为零，每个面选一条这样的棱。每个面至多含两条选中棱，因为自身所选棱之外的两条残差抵消，而不同选中棱的标签不同。每条选中棱属于两个面，按关联数计，每个面便恰含两条。于是任一未选棱的两个邻面都要求其标签与该面上另一条选中棱相同（计入方向符号）。这两条选中棱互异，否则两个面会共享两棱，所以冲突。若某个外点在核心上有非零投影，核心的投影残差是四个点值之差，因为其三角和为零，故至少占三条核心棱。不同外点所占棱互斥，每棱残差至多是一个三角边界。有两个外点则占尽六棱，其他面无棱可选。故恰有一个这样的外点，占三条棱，因为其余三个面各需选一条棱。四个点值中三同一异，设异值点为 $v$。自 $v$ 出发的三条残差投影相同且非零，故残差本身相同，核心三角和给出 $R_{ab}=t_{vab}$（$a,b\ne v$）。对面无法选棱，其外点必是唯一在核心有非零投影者，但该面的棱在此投影下为零，仍迫使存在一条所选棱。矛盾排除了误差 $1$，整数范数给出下界 $2$。

对固定图，把生成树棱的增益归一为 $1$，用非树棱作自由群生成元。三角词的共轭及其逆生成全群，因为弦分解把基本闭路写成这些共轭的乘积。取这些因子的最短分解长度为双不变整数范数。自由实例的最优误差是整数且可取到，任意归一化实例都是它的像，映射将范数 $s$ 的元素送到距 $1$ 至多 $s\varepsilon$ 的元素。这说明固定图的通用系数恰为自由实例的最优误差。对有限个 $n$ 点图取最大值，补孤立点保持下界，因此 $C(n)$ 是非降整数序列。结合两种上界及小阶下界，

$$
\begin{aligned}
C(0)&=C(1)=C(2)=0,\\
C(3)&=\cdots=C(7)=1,\qquad C(8)=2,\\
2&\le C(n)\le\min\{4,\lfloor(n-3)/2\rfloor\}\qquad(n\ge9).
\end{aligned}
$$

非降的有界整数序列必趋于常值，此处终值属于 $\{2,3,4\}$。

**实标量与 Banach 目标。** 对 $n\ge3$，实数增益下，最小一致误差等于定向简单回路的最大绝对增益均值。下界来自势差的消去。反过来，若这些均值至多为 $r$，给各有向棱权重 $g_{uv}+r$。反向也满足回路界，折返权重为 $2r$，故无负回路。从新增零权源点取最短路距离作势，最短路距离在棱的两个方向上均满足所需不等式，故误差至多 $r$。弦分解把长为 $\ell$ 的回路分成 $\ell-2$ 个三角形，故上界为 $(n-2)\varepsilon/n$。取零辐条的扇图，沿扇缘路径给每棱增益 $\varepsilon$，则长 $n$ 的外圈达到此界。把例子扩为 $K_n$ 可令所有从较小到较大的非辐条棱取相同增益。对 $K_n$ 上的任意实 Banach 目标，平均所有 $n$ 个星形势 $g_{av}$（$g_{aa}=0$）。每棱的两个端点星形势精确拟合它，其余各误差至多 $\varepsilon$，故平均仍给出尖锐常数 $(n-2)/n$。

::: {.theorem #thm-appe-chordal-path-power-two title="路径幂的 $2\varepsilon$ 重构界与弦图的普适下界 $2$" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_isChordal, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_exists_two_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_three_banach_and_integral_lower_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.pathPower_three_exact_two, D5/S3/Combinatorics/Graph/Chordal/ChordalUniversalLowerBound.not_subtwo_universal_chordal"}
对 $n,k\in\mathbb N$，记 $P_n^k$ 为顶点集 $\mathrm{Fin}(n)=\{i\in\mathbb N:i<n\}$ 上的路径幂，其中 $i,j$ 相邻当且仅当 $i\ne j$ 且 $|i-j|\le k$。

1. **弦性与统一上界。** 每个 $P_n^k$ 都是弦图。若 $k\ge1$，则对任意双不变伪度量群 $H$、$\varepsilon\ge0$ 及满足 [@thm-appe-chordal-uniform-gain-potential] 中反向取逆和三角缺陷至多为 $\varepsilon$ 的增益 $g$，存在势 $\varphi:\mathrm{Fin}(n)\to H$，使每条有向棱 $(i,j)$ 的误差 $d(g(i,j),\varphi(i)^{-1}\varphi(j))$ 至多为 $2\varepsilon$。

2. **$P_{12}^3$ 上的两个下界。** 该图有 $30$ 条棱，字典序贪心生成树之外有 $19$ 条棱，共有 $28$ 个三角形。取这 $19$ 条棱的坐标来表示实循环空间及整数循环格 $Z_1(P_{12}^3;\mathbb Z)\cong\mathbb Z^{19}$。对每条升序棱取它在非树棱坐标中的投影为增益（树棱取零）。实循环空间配以三角填充范数，即填充某一循环的有向三角边界系数绝对值之和的下确界，成为实 Banach 空间。整数循环格只允许整数填充，取最小填充长度作为整数值度量中的范数，并将其加法群写成乘法形式，得到双不变度量群。两套增益在反向棱上分别取负值和逆元，且所有有向三角形的缺陷均至多为 $1$。任意取值于实循环空间的势 $\varphi$ 都有一条有向棱 $(i,j)$，其误差 $d(g(i,j),\varphi(j)-\varphi(i))$ 至少为 $49/48$。任意整数循环格中的势也都有一条有向棱，其误差 $d(g(i,j),\varphi(i)^{-1}\varphi(j))$ 至少为 $2$。

3. **宽度为 $3$ 时的精确系数。** 若 $n\ge12$，沿 $i\mapsto\min(i,11)$ 拉回上述整数增益，重合端点的增益取单位元。所得增益在反向棱上取逆，三角缺陷至多为 $1$。对每个势，某条有向棱的误差至少为 $2$，而存在一个势使所有有向棱的误差至多为 $2$。

4. **普适系数的下界。** 不存在实数 $C<2$，使得对每个有限弦图、每个双不变伪度量群、每个 $\varepsilon\ge0$ 及每个反向取逆且三角缺陷至多为 $\varepsilon$ 的增益，都存在一个势使所有有向棱的误差至多为 $C\varepsilon$。
:::

::: {.proof #pf-appe-chordal-path-power-two}
按顶点编号递增消去时，每个顶点的后继邻点都在它之后的 $k$ 个位置内，因而构成团。若 $k\ge1$，把顶点按每 $k$ 个一块划分，末块可以较短。连接相邻块的块首，再将每个非块首顶点接到本块块首。图非空时，这些棱构成生成树，从首块块首沿树累乘增益便得到势。块内棱只需与经过本块块首的路径作一次三角比较。对跨块棱 $i<j$，两端的块首依次为 $b,c$，两块必相邻，而且 $c$ 位于 $i$ 和 $j$ 之间。弦 $ic$ 把树路径 $i,b,c,j$ 与棱 $ij$ 的比较分成 $(b,i,c)$ 和 $(i,c,j)$ 两次三角比较。若顶点重合，令对角增益为单位元，相应比较误差为零。双不变性保留左右乘及取逆下的误差，故两种方向的棱误差都至多为 $2\varepsilon$。空图的结论无须选根。

在 $P_{12}^3$ 上，一个循环的 $19$ 个非树棱坐标决定它在树上的坐标，因为树上没有非零循环。每条非树棱与树路径合成的基本循环给出一个坐标基向量，并可通过沿弦分解成有向三角边界的整数和，故实循环和整数循环都有三角填充。设 $p_i$ 为从根到 $i$ 的有向树链，则棱 $ij$ 的增益正是循环 $p_i+[ij]-p_j$ 的非树棱坐标。对三角形求有向和时，树链抵消，只剩该三角形的边界，一片三角形的填充就给出缺陷上界 $1$。填充长度对取反不变，叠加填充给出三角不等式，每个非树棱坐标的绝对值又不超过填充长度，故只有零循环的范数为零。实填充还可按标量缩放，所得范数空间因有限维而完备。

对偶证书用三条同端点路径上的残差给出下界。先在循环空间上构造两个线性泛函 $F,G$。它们在树棱上的权均为零。把按字典序排列的非树棱每 $3$ 条分为一组，末组可以较短。第 $k$ 组从 $k=1$ 起计，组内棱权对依次取 $(-1)^{k+1}k$ 乘以 $(8,-7),(8,-1),(0,7)$。沿棱求和得到 $F,G$。下表列出它们在有向三角边界 $t_{i,i+a,i+a+b}$ 上的取值，从 $i=0$ 起读，循环行各取 $9$ 项。

| $(a,b)$ | $(F,G)$ 的值 |
| --- | --- |
| $(1,1)$ | $(8,-7)$、$(0,1)$、$(0,-5)$、$(8,-5)$、$(0,3)$、$(0,-3)$、$(8,-3)$、$(0,5)$、$(0,-1)$、$(8,-1)$ |
| $(1,2)$ | 循环取 $(8,-1)$、$(-8,7)$、$(0,-7)$ |
| $(2,1)$ | 循环取 $(0,7)$、$(-8,1)$、$(8,-7)$ |

逐个三角边界的绝对值界传给任意填充，再对填充长度取下确界，得到 $F,G,F+G$ 的对偶范数分别至多为 $8,7,7$。令 $A,B,C$ 分别为路径 $(0,1,4,7,10,11)$、$(0,2,5,8,11)$、$(0,3,6,9,11)$ 的有向链。按棱权求和得到 $F(A-C)=56$、$G(B-C)=42$。对于任意势，记有向棱上的残差为 $R_{ij}=g(i,j)-(\varphi(j)-\varphi(i))$，相应路径上的残差和为 $R(A),R(B),R(C)$。三条路径同起同终，作差时势差与树链均抵消。若每条棱的误差至多为 $r$，则

$$
\begin{aligned}
98&=F(R(A))+G(R(B))-(F+G)(R(C))\\
  &\le (5\cdot8+4\cdot7+4\cdot7)r=96r.
\end{aligned}
$$

因此至少有一条棱的实误差达到 $49/48$ 或更大。对整数势，将其坐标视为实数即可应用同一证书。每个整数填充也是实填充，所以同一条棱的整数误差不小于其对应的实误差。整数误差取整数值，且 $49/48>1$，故这条棱的整数误差至少为 $2$。

最后，映射 $i\mapsto\min(i,11)$ 不增大编号之差，故把棱送到原图的棱或重合端点，把三角形送到原图的三角形或缺陷为零的退化比较。前 $12$ 个顶点逐点固定，将任意势限制到它们便保留误差下界 $2$。块首树在 $\varepsilon=1$ 时给出达到这一界的势。若普适系数 $C<2$，在弦图 $P_{12}^3$ 上取整数增益和 $\varepsilon=1$ 即得矛盾。完整证明由 Lean 内核检查。
:::

逐棱的增益重构界能否由一棵低拉伸生成树解释？从一个三角形出发，每轮在上一轮新生的每条棱上再接一个三角形，最优生成树拉伸便逐轮增加，而增益重构的误差仍由局部三角比较控制。

::: {.theorem #thm-appe-two-tree-stretch-separation title="递归 $2$-树的生成树拉伸与增益重构分离" lean="D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_isChordal, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_edge_count, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_min_spanning_tree_stretch_eq, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_exists_one_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_integer_lower_bound_one, D5/S3/Combinatorics/Graph/Chordal/TwoTreeStretchSeparation.twoTree_banach_exact_constant"}
对每个深度 $d\in\mathbb N$，定义递归 $2$-树 $B_d$。以核心三角形 $B_0=K_3$ 为起点，将核心顶点依次记为 $0,1,2$，沿此顺序环向定向三条棱，作为第 $0$ 轮的前沿。从 $B_d$ 构造 $B_{d+1}$ 时，对每条前沿棱 $a\to b$，加一个只与 $a,b$ 相邻的新顶点 $w$，保留旧棱，并以 $a\to w$、$w\to b$ 为新前沿棱。插入三角形按 $a,w,b$ 的顺序定向。

1. **弦性、连通性与规模。** $B_d$ 是连通弦图，有 $3\cdot 2^d$ 个顶点和 $3(2^{d+1}-1)$ 条棱。
2. **最小生成树拉伸。** 对 $B_d$ 的每棵生成树 $T$，都有一条棱 $uv$，其端点在 $T$ 中的距离至少为 $d+2$。存在一棵生成树，使每条棱的端点距离至多为 $d+2$。
3. **群值重构的精确统一系数 $1$。** 设 $H$ 为带双不变伪度量 $\rho$ 的群，$\varepsilon\ge0$。若 $H$ 值增益 $g$ 在棱上满足 $g_{vu}=g_{uv}^{-1}$，且每个有序三角形 $(u,v,w)$ 都满足 $\rho(g_{uv}g_{vw},g_{uw})\le\varepsilon$，则存在 $H$ 值势 $\varphi$，使每条有向棱都满足 $\rho(g_{uv},\varphi(u)^{-1}\varphi(v))\le\varepsilon$。存在整数值反对称增益，其三角缺陷 $|g_{uv}+g_{vw}-g_{uw}|$ 至多为 $1$，而任意整数值势都有一条棱的误差 $|g_{uv}-(\varphi(v)-\varphi(u))|$ 至少为 $1$。
4. **实半赋范空间的精确重构系数。** 令 $a_d=1-\frac{2}{3\cdot 2^d}$。对任意实半赋范空间（特别是实 Banach 空间）、$\varepsilon\ge0$ 及反对称加性增益 $g$，若每个有序三角形都满足 $\|g_{uv}+g_{vw}-g_{uw}\|\le\varepsilon$，则存在势 $\varphi$，使每条有向棱都满足 $\|g_{uv}-(\varphi(v)-\varphi(u))\|\le a_d\varepsilon$。

   以核心三角形和各插入三角形的有向边界为实循环空间的基，记第 $i$ 个基向量为 $t_i$，其坐标单位向量为 $\mathbf e_i$。坐标空间取 $\ell^1$ 范数，循环空间取三角填充范数，即填充该循环的三角系数绝对值之和的下确界。典范坐标增益在核心的前两条有向棱和每次插入的第一条新棱上取零，在其余有向棱上取使第 $i$ 个三角形的定向增益和等于 $\mathbf e_i$ 的值。它在反向棱上取负，三角缺陷至多为 $1$，且对任意坐标值势，总有一条棱的误差至少为 $a_d$。

   将典范坐标增益的各 $\mathbf e_i$ 换成 $t_i$，即得典范循环值增益 $G$。对任意实循环 $z$，沿每条棱的固定方向 $u\to v$ 以 $z_{uv}$ 为权求和，有 $\sum_{u\to v} z_{uv}G_{uv}=z$。任意循环值势都有一条棱的填充范数误差至少为 $a_d$，且存在一个势使所有棱的填充范数误差至多为 $a_d$。
:::

::: {.proof #pf-appe-two-tree-stretch-separation}
每个新顶点在加入时只有两个旧邻点，且这两个邻点相邻。经过它的长为 $4$ 或更长的简单回路以这两个邻点之间的棱为弦。只经过旧顶点的回路由归纳假设处理，而每个新顶点都接入旧的连通图。第 $0$ 轮有 $3$ 条前沿棱，每轮的前沿棱数翻倍。第 $i+1$ 轮增加 $3\cdot2^i$ 个顶点和 $2\cdot3\cdot2^i$ 条棱，从核心的 $3$ 个顶点和 $3$ 条棱起累加即得所述计数。

拉伸下界的归纳断言是每棵生成树都有一条前沿棱达到下界。核心三角形中，生成树省去的那条棱的端点距离为 $2$。在下一轮的任意生成树中，为每个新顶点收缩一条与它相接的树棱。收缩保持树结构且不合并旧顶点。若一个新顶点在树上有两个邻点，剩下的树棱恰映为它的母棱。因此所得树是上一轮的生成树，且收缩不会增大旧顶点间的距离。由归纳假设，收缩后的树上有一条前沿棱的端点距离至少为 $d+2$。这条母棱上的新顶点在原树中只能有一个邻点，否则母棱会出现在收缩后的树中，端点距离便为 $1$。从新顶点到另一端点的树路必须先走这条唯一的树棱，故对应子棱的端点距离至少为 $d+3$。对上界，从核心的一条两棱路径出发，每轮把新顶点作为叶接到母棱的起点。旧距离不变，新棱的端点距离为 $1$ 或母棱端点距离加 $1$。

在核心上取一个根，沿两条连续棱累乘增益来定义势。这两条棱精确拟合，余棱的误差由三角缺陷控制。插入时，将母棱的方向记为 $b\to a$，保留旧势并取 $\varphi(w)=\varphi(b)g_{ba}g_{aw}$。比较 $\varphi(b)g_{bw}$ 与 $\varphi(w)$，由左不变性可知误差就是该三角形的一次比较误差。比较 $\varphi(a)g_{aw}$ 与 $\varphi(w)$，由右不变性可知误差等于母棱误差。两者均至多为 $\varepsilon$，反向棱有相同误差。由此逐轮延拓，误差界保持不变。

为证明两个下界，先给每个定向三角形指定一个加性标签 $\tau_i$。在核心的第三条有向棱上取核心标签，前两条取零。插入时对母棱 $a\to b$，令 $g_{aw}=0$、$g_{wb}=g_{ab}+\tau_i$，反向棱取负。各三角形的定向增益和分别为 $\tau_i$。每个三角形都是核心或某次插入的三角形，因为其中最新的顶点只能与两个旧端点成三角形。将任意势的势差从增益中减去，得残差 $r_{uv}=g_{uv}-(\varphi(v)-\varphi(u))$。核心的势差沿环抵消，每次用两条子棱替换前沿母棱时又有 $r_{aw}+r_{wb}-r_{ab}=\tau_i$。所以最终前沿上的残差和等于全部三角标签之和。每个新增顶点对应一个插入三角形，加上核心，标签共有 $3\cdot2^d-2$ 个。取整数标签全为 $1$，若所有整数残差的绝对值都小于 $1$，则全为零，与前沿残差和为正矛盾。取 $\tau_i=\mathbf e_i$ 时，前沿残差和的 $\ell^1$ 范数为 $3\cdot2^d-2$。前沿有 $3\cdot2^d$ 条棱，由三角不等式，至少一条的误差达到两数之比 $a_d$。

循环空间的坐标来自同一组定向三角形。在每个最新顶点处，流量守恒迫使两条子棱的系数相等。减去这一系数乘以插入三角形边界，恰好消去两条子棱，余下旧图上的循环。反复消去后，核心上三条棱的系数相等。各步系数唯一且可逆，故三角边界构成基，填充范数就是坐标的 $\ell^1$ 范数。$G$ 沿第 $i$ 个三角形边界求和得到 $t_i$，由线性性，按任意循环的棱系数加权求和即还原该循环。坐标值势的下界经这组坐标传给循环值势。

最后，在核心上将定向三角缺陷均分到三条棱上。减去每棱分得的缺陷后，棱增益的定向和为零，沿棱累加便得到势，从而 $a_0=1/3$。若旧势的误差至多为 $a_i\varepsilon$，在新顶点取 $\varphi(a)+g_{aw}$ 与 $\varphi(b)+g_{bw}$ 的中点。两候选值之差是三角缺陷与带符号的母棱残差之和，范数至多为 $(a_i+1)\varepsilon$。新棱误差至多为此距离的一半，给出 $a_{i+1}=(a_i+1)/2$。由于 $a_i\le a_{i+1}$，旧棱也满足新界。解得 $a_d=1-\frac{2}{3\cdot2^d}$。将此上界用于典范坐标增益，再经三角基换回循环，便得到达到填充范数下界的势。完整证明由 Lean 内核检查。
:::

递归 $2$-树的精确系数说明，生成树拉伸可以很大，增益仍能拟合得很准 [@thm-appe-two-tree-stretch-separation]。对路径幂，增大宽度能把实 Banach 目标上的重构系数推到多高？固定宽度 $k$ 时，最优系数随顶点数增长趋于 $2-2/k$。因此，宽度与顶点数都可选时，实 Banach 目标上的统一下界从上面的 $49/48$ 提高到 $2$。

::: {.theorem #thm-appe-chordal-banach-limit-two title="路径幂的实 Banach 重构极限与弦图下界" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_upper_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_lower_bound, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.pathPower_banach_limit_tendsto, D5/S3/Combinatorics/Graph/Chordal/ChordalBanachLimitTwo.not_subtwo_banach_chordal"}
设 $G$ 为顶点集 $V$ 上的简单图。称加性增益 $g:V\times V\to E$ 反对称，是指对所有顶点对均有 $g_{ji}=-g_{ij}$。三角缺陷至多为 $\varepsilon$，是指每个有向三角形 $(i,j,\ell)$ 都满足 $\|g_{ij}+g_{j\ell}-g_{i\ell}\|\le\varepsilon$。势 $\varphi:V\to E$ 在有向棱 $(i,j)$ 上的误差为 $\|g_{ij}-(\varphi(j)-\varphi(i))\|$。

1. **平移分块上界。** 对任意 $k\ge1$、$n\in\mathbb N$、实半范数线性空间 $E$ 和 $\varepsilon\ge0$，若 $P_n^k$ 上的反对称增益 $g$ 的三角缺陷至多为 $\varepsilon$，则存在势使每条有向棱的误差至多为 $(2-2/k)\varepsilon$。
2. **有限维 Banach 下界。** 若 $k\ge1$ 且 $n\ge k+1$，则存在有限维实 Banach 空间 $E$ 和 $P_n^k$ 上取值于 $E$ 的反对称增益，其三角缺陷至多为 $1$，且对任意势，至少有一条有向棱的误差不小于 $\frac{n-k}{n+k-2}(2-2/k)$。
3. **固定宽度的精确极限。** 记 $C_{\mathrm{Ban}}(P_n^k)$ 为所有可行的非负系数 $C$ 的下确界。这里可行指对每个实 Banach 空间和其中每个三角缺陷至多为 $1$ 的反对称增益，都存在势使 $P_n^k$ 的每条有向棱误差至多为 $C$。对每个固定的 $k\ge1$，$C_{\mathrm{Ban}}(P_n^k)$ 在 $n\to\infty$ 时趋于 $2-2/k$。
4. **实 Banach 目标的弦图反例。** 不存在实数 $C<2$，使得对每个有限简单弦图、每个实 Banach 空间、每个 $\varepsilon\ge0$ 以及每个三角缺陷至多为 $\varepsilon$ 的反对称增益，都存在势使每条有向棱的误差至多为 $C\varepsilon$。
:::

::: {.proof #pf-appe-chordal-banach-limit-two}
取偏移 $s=0,\ldots,k-1$，按 $\lfloor(v+s)/k\rfloor$ 将顶点 $v$ 分块。非空块的首点是 $k\lfloor(v+s)/k\rfloor-s$ 与 $0$ 的较大者，也就是将可能为负的首块起点截到 $0$。把相邻块的首点依次相连，再把块内其余顶点接到各自的首点。所得生成树的棱长都至多为 $k$，沿树从 $0$ 累加增益便得到一个势。$n=0$ 时直接取空势。

对升序棱 $(u,v)$，两端或在同一块，或在相邻两块。同块时，势差通过共同首点，只需一个三角比较。若 $u$ 是首点，误差为零。跨块时，记两端所在块的首点为 $x,y$，则 $x\le u<y\le v$，且 $y-x\le k$、$v-u\le k$。经过 $y$ 比较，误差由 $(x,u,y)$ 和 $(u,y,v)$ 的缺陷之和控制。若 $x=u$ 或 $y=v$，相应的一项为零。由此，每个端点 $a$ 都恰有一个偏移满足 $(a+s)\bmod k=0$，这次它就是首点，省去一个三角缺陷的上界。首块截到 $0$ 只会让更多比较退化为零。对 $k$ 个树势取平均，由三角不等式，每条棱的误差至多为 $2(k-1)\varepsilon/k$。反向棱的残差只改变符号。

下界用坐标 $w\in[k,n)$ 记录长度为 $k$ 的棱的右端点。令 $W_u=[u,u+k)\cap[k,n)$（区间只取整数），并取实向量空间 $E$ 为所有满足 $\sum_{w\in W_u}x_w=0$（当 $k\le u$ 且 $u+k\le n$）的坐标向量 $x$。在 $E$ 上用有限最大值范数

$$
\|x\|=\max\left\{\max_{k\le w<n}|x_w|,\ \max_{0\le u<n}\left|\sum_{w\in W_u}x_w\right|\right\}.
$$

单个坐标保证范数的正定性，有限维保证完备性。令 $c_a(w)=\mathbf 1_{w\equiv a\bmod k}-1/k$。对升序棱 $i<j$，当 $j-i=k$ 时取 $g_{ij}=2c_j$，当 $j-i<k$ 时取 $g_{ij}=-\sum_{i<a<j}c_a$。反向取负，重合点对及非相邻点对可取零。每个 $c_a$ 在任意完整周期上的和为零，所以增益落在 $E$ 中。对升序三角形 $i<j<\ell$，若 $\ell-i<k$，拆开内部指标的和即得缺陷向量 $c_j$。若 $\ell-i=k$，所有内部指标的标记和为 $-c_\ell$，所以缺陷向量为 $c_j-c_\ell$。单点集和每个窗口 $W_u$ 内的指标模 $k$ 互异，故中心化标记之和是命中数 $0$ 或 $1$ 减去集合大小除以 $k$，其绝对值至多为 $1$。两标记之差的和只剩两个命中数之差，也在此界内。反对称性使三角形换序只可能改变缺陷向量的符号。

给定势，记 $R_{ij}=g_{ij}-(\varphi(j)-\varphi(i))$，其最大棱范数为 $M$。相邻点间的增益为零（$k=1$ 时 $c_a=0$），而 $g_{v-k,v}$ 在坐标 $v$ 上等于 $2-2/k$。在该坐标上，沿相邻点从 $v-k$ 到 $v$ 的势差与长棱的势差相同，故

$$
R_{v-k,v}(v)-\sum_{u=v-k+1}^{v}R_{u-1,u}(v)=2-2/k.
$$

对 $k\le v<n$ 求和。交换第二项的求和次序后，每个 $u$ 的贡献是 $R_{u-1,u}$ 在 $W_u$ 上的坐标和。完整窗口的和为零，剩下的截断窗口在 $1\le u<k$ 或 $n-k<u<n$，合计至多 $2(k-1)$ 项。每项的绝对值由范数控制在 $M$ 内，$n-k$ 个长棱坐标也各至多为 $M$，因而

$$
(n-k)(2-2/k)\le \bigl(n-k+2(k-1)\bigr)M=(n+k-2)M.
$$

由于 $n\ge k+1$，分母为正，证得下界。它约束每个可行系数，而平均势给出可行上界。固定 $k$ 时，$(n-k)/(n+k-2)\to1$，两界夹出所述极限。任给 $C<2$，先选 $k$ 使 $C<2-2/k$，再取充分大的 $n\ge k+1$ 使有限下界超过 $C$。长度至少为 $4$ 的简单回路中，最小顶点的两个回路邻点都在它右侧且距它至多 $k$，故它们相连，给出一条弦。因此 $P_n^k$ 是弦图，在三角缺陷至多为 $1$ 时已能否定所提统一界。完整证明由 Lean 内核检查。
:::

在实半范数线性空间中，可以把 [@thm-appe-chordal-uniform-gain-potential] 的单条前驱路径换成所有前驱路径的平均。团的大小控制了每次平均的项数，因而控制了误差为零的项所占的比重。

::: {.theorem #thm-appe-clique-bounded-banach-potential title="有界团数弦图上的平均增益重构" lean="D5/S3/Combinatorics/Graph/Chordal/CliqueBoundedBanachPotential.SimpleGraph.IsChordal.exists_clique_bounded_banach_gain_potential"}
设 $V$ 为有限顶点集，$G$ 为 $V$ 上的简单弦图。设 $k\in\mathbb N$，$2\le k$，且 $G$ 的每个团至多有 $k+1$ 个顶点。给定实半范数线性空间 $E$、映射 $g:V\times V\to E$ 和实数 $\varepsilon\ge0$，假设对每个有序顶点对 $(i,j)$ 都有 $g(j,i)=-g(i,j)$，且对每个满足 $i$ 与 $j$、$j$ 与 $\ell$、$i$ 与 $\ell$ 均相邻的有序三元组 $(i,j,\ell)$，都有 $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$。

则存在一个势 $\varphi:V\to E$，使下式对每个满足 $u$ 与 $v$ 相邻的有序对 $(u,v)$ 同时成立。

$$
\|g(u,v)-(\varphi(v)-\varphi(u))\|\le\left(4-\frac{4}{k}\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-clique-bounded-banach-potential}
各连通分支的诱导子图继承弦性、团大小界与增益条件，棱的两端属于同一分支，故分别构造势再合并即可。沿用 [@thm-appe-chordal-uniform-gain-potential] 证明中的根 $o$、距离分层、影子 $S_C$ 和公共锚 $a_C$。对第 $i\ge1$ 层的点 $x$，令 $C$ 为层数至少为 $i$ 的诱导子图中包含 $x$ 的分支，记 $N^-(x)$ 为 $x$ 在上一层的邻点集。最短路保证 $N^-(x)$ 非空，且 $N^-(x)\subseteq S_C$。当 $i\ge2$ 时，$a_C$ 位于第 $i-2$ 层，它与影子中的所有点相邻，所以 $S_C\cup\{a_C\}$ 是多一个顶点的团，给出 $|N^-(x)|\le |S_C|\le k$。第一层则有 $N^-(x)=S_C=\{o\}$。

令 $\varphi(o)=0$。第一层分支取 $a_C=o$、$Q_C=0$，其余分支沿上一层尾部子图中包含 $C$ 的父分支 $D$ 递推 $Q_C=Q_D+g(a_D,a_C)$。在非根顶点取 $\varphi(x)=\bar\phi_x$，其中

$$
\bar\phi_x=Q_C+\frac{1}{|N^-(x)|}\sum_{b\in N^-(x)}\bigl(g(a_C,b)+g(b,x)\bigr).
$$

反对称性给出 $g(o,o)=0$，故根棱精确拟合。若两条路径从同一锚 $a$ 分别经同一影子中的 $b,d$ 到同一终点 $z$，路径和之差就是 $(a,b,d)$ 与 $(b,d,z)$ 的缺陷之差，范数至多为 $2\varepsilon$。有顶点重合时，相应的三角缺陷由反对称性消为零。

对从前一层到第 $i\ge2$ 层的棱 $(x,y)$，令 $C$ 为 $y$ 所在的尾部分支。因 $x\in S_C$，$x$ 位于 $C$ 的父分支，且 $a_C\in N^-(x)$、$x\in N^-(y)$。在 $\varphi(x)$ 的平均中，经过 $a_C$ 的项恰为 $Q_C+g(a_C,x)$。在 $\varphi(y)$ 的平均中，经过 $x$ 的项恰比它多 $g(x,y)$。两侧的其余项各用上述两次三角比较估计。每侧至少有一个误差为零的项，故 $m\le k$ 项的平均误差至多为 $2(1-1/m)\varepsilon\le(2-2/k)\varepsilon$，相加得到 $(4-4/k)\varepsilon$。

同层相邻点 $x,y$ 共享分支、影子和锚。若两个前驱集互不包含，从各自的差集中取一个前驱，它们在同一影子中相邻，并与 $x,y$ 构成无弦四环，违反弦性。因此可定向使 $N^-(x)\subseteq N^-(y)$。固定 $b\in N^-(x)$，将经 $b$ 到 $x$ 再走 $xy$ 的路径和与 $y$ 的各条前驱路径比较。经 $b$ 到 $y$ 的配对项只用三角形 $(b,x,y)$，误差至多为 $\varepsilon$。每个其他项再用两次三角比较，误差至多为 $3\varepsilon$。公共项 $Q_C$ 抵消。先对 $N^-(y)$ 取平均，其 $m$ 项中至少一项的误差至多为 $\varepsilon$，故平均误差至多为 $(3-2/m)\varepsilon\le(3-2/k)\varepsilon$。再对 $N^-(x)$ 取平均，仍有此界。由 $k\ge2$，它至多为 $(4-4/k)\varepsilon$。相邻点的层数至多差 $1$，反向只改变残差的符号，所以同一个势满足所有有向棱的界。完整证明由 Lean 内核检查。
:::

沿距离层取平均时，团大小通过前驱的数目控制误差。也可以沿单纯顶点的删除次序取平均，此时顶点总数进入误差界。区间图与分裂图各有一种可逐步接合的结构，即使团大小无界，也能用至多两次三角比较控制每条棱。

::: {.theorem #thm-appe-simplicial-interval-split-potential title="单纯顶点平均与区间图、分裂图的增益重构" lean="D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.IsChordal.exists_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.intervalGraph_isChordal_and_two_approximate_gain_potential, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.exists_two_approximate_gain_potential_of_split, D5/S3/Combinatorics/Graph/Chordal/SimplicialAndIntervalPotential.SimpleGraph.BanachPathPower.pathPower_isIntervalGraph"}
1. **单纯顶点平均。** 设 $G$ 是有限顶点集 $V$ 上的简单弦图，$k\in\mathbb N$、$k\ge2$，且每个团至多有 $k+1$ 个顶点。设 $E$ 为实半赋范向量空间，$\varepsilon\ge0$ 为实数，$g:V\times V\to E$ 对所有顶点对满足 $g(j,i)=-g(i,j)$。对每个三对顶点均相邻的有序三元组 $(i,j,t)$，设 $\|g(i,j)+g(j,t)-g(i,t)\|\le\varepsilon$。则存在 $\varphi:V\to E$，使得每个有序相邻顶点对 $(u,v)$ 都满足

   $$
   \begin{aligned}
   &\|g(u,v)-(\varphi(v)-\varphi(u))\|\\
   &\qquad\le (k-1)\left[1-\left(\frac{k-1}{k}\right)^{|V|\mathbin{\dot{-}}1}\right]\varepsilon .
   \end{aligned}
   $$

   指数中 $|V|$ 为自然数基数，$\dot{-}$ 表示截断的自然数减法。系数中的运算在实数中进行。

2. **区间图。** 设 $G$ 是有限顶点集 $V$ 上的简单图，$\ell,r:V\to\mathbb R$ 满足对每个 $v$ 有 $\ell(v)\le r(v)$，并且对所有 $x,y$，$G.\mathrm{Adj}(x,y)$ 当且仅当 $x\ne y$ 且 $\max(\ell(x),\ell(y))\le\min(r(x),r(y))$。设 $H$ 为群，$d$ 为左右平移均保持的伪度量，$\varepsilon\ge0$ 为实数，$g:V\times V\to H$。对每个有序相邻顶点对 $(x,y)$，设 $g(y,x)=g(x,y)^{-1}$。对每个三对顶点均相邻的有序三元组 $(x,y,z)$，设 $d(g(x,y)g(y,z),g(x,z))\le\varepsilon$。则 $G$ 是弦图，且存在 $\varphi:V\to H$，使得每个有序相邻顶点对 $(x,y)$ 都满足 $d(g(x,y),\varphi(x)^{-1}\varphi(y))\le2\varepsilon$。

3. **分裂图。** 设 $G$ 是有限顶点集 $V$ 上的简单图，$C\subseteq V$ 为团，$V\setminus C$ 为独立集。对第 2 项中满足同样伪度量、反向增益及三角缺陷条件的 $H,d,\varepsilon,g$，$G$ 是弦图，且存在 $\varphi:V\to H$，使得每个有序相邻顶点对 $(x,y)$ 都满足 $d(g(x,y),\varphi(x)^{-1}\varphi(y))\le2\varepsilon$。

4. **路径幂。** 对所有 $n,k\in\mathbb N$，在 $P_n^k$ 的顶点集 $\mathrm{Fin}(n)$ 上存在实端点函数 $\ell,r$，使每个顶点 $i$ 都满足 $\ell(i)=i$、$r(i)=i+k$、$\ell(i)\le r(i)$，其中 $i$ 表示从 $0$ 开始的自然数下标，端点按实数取值。对所有 $x,y$，$P_n^k$ 中 $x,y$ 相邻当且仅当 $x\ne y$ 且 $\max(\ell(x),\ell(y))\le\min(r(x),r(y))$。
:::

::: {.proof #pf-appe-simplicial-interval-split-potential}
**单纯顶点平均。** 由 Dirac 定理，非空弦图有一个邻点成团的顶点 $a$。删除 $a$ 后，诱导子图仍满足假设。若它有 $n-1$ 个顶点，设已得到误差至多为 $r_{n-1}\varepsilon$ 的势 $\psi$。每个邻点 $x$ 给出一个可精确拟合棱 $xa$ 的候选值 $p_x=\psi(x)+g(x,a)$。两候选值之差等于棱 $xy$ 的残差减去三角形 $(x,y,a)$ 的增益缺陷，故其半范数至多为 $(r_{n-1}+1)\varepsilon$。邻点与 $a$ 一同成团，所以邻点数 $m$ 至多为 $k$。取候选值的平均作为 $a$ 处的势。估计棱 $xa$ 的误差时，$p_x$ 对应的差为零，其余各差给出系数 $(m-1)/m\le(k-1)/k$。因此可取 $r_1=0$、$r_n=\frac{k-1}{k}(r_{n-1}+1)$（$n\ge2$）。递推的解就是所示系数，且随 $n$ 不减，故旧棱仍满足新界。孤立顶点处的值任取，空图没有棱约束，反向棱的残差取负。

**区间图。** 任一非空顶点子集内，右端点最小的区间的所有邻区间都含该端点。将此用于长至少为 $4$ 的环的顶点集，其两个环上邻点之间的棱就是一条弦。重构时，归纳要求根 $p$ 的左端点不大于当前集合中任何区间的右端点。取左端点最小的区间为初始根，令 $\varphi(p)=1$，并以 $\varphi(x)=g(p,x)$ 精确拟合其辐棱。在邻点中保留右端点最大的 $q$，其余递归顶点为 $p$ 的非邻点（去掉 $p$）。这些非邻区间的左端点都在 $r(p)$ 右侧。因此 $\ell(q)\le r(p)$ 保证新根 $q$ 的左端点仍不大于递归集合的任一右端点，正是本归纳所需的根条件。递归势以同一个群元素左乘来接合，使 $\varphi(q)=g(p,q)$，同时精确拟合 $q$ 的递归辐棱。若 $p$ 孤立，则将它删去，余图非空时从左端点最小的区间重新开始。

同属 $p$ 邻域的两点之间，误差由经过 $p$ 的一个三角形控制。若棱 $xy$ 从 $p$ 的邻点 $x$ 跨到非邻点 $y$，则 $\ell(y)\le r(x)\le r(q)$ 且 $\ell(y)>r(p)$，故 $y$ 与 $q$ 相邻。若 $x\ne q$，则 $x,q$ 均含 $r(p)$，也彼此相邻。将 $g(p,x)g(x,y)$ 与 $\varphi(y)=g(p,q)g(q,y)$ 比较，先用三角形 $(x,q,y)$，再用 $(p,x,q)$，总误差至多为 $2\varepsilon$。若 $x=q$，这条棱已被精确拟合。余下的棱由归纳控制。由左平移不变性，棱的拟合误差等于 $d(arphi(x)g(x,y),arphi(y))$。再用逆增益右平移及 $d$ 的对称性，得到反向棱的误差相同。空图没有棱需要拟合。

**分裂图。** 每个非空诱导子图若含团外顶点，该点的邻点均在团内。若全部顶点都在团内，则任选一点也是单纯顶点。这再次保证每个长至少为 $4$ 的环有弦。团非空时取根 $o$，令 $\varphi(o)=1$，其余团内顶点取 $\varphi(x)=g(o,x)$。辐棱精确拟合，其他团内棱误差至多为 $\varepsilon$。对每个非孤立的团外顶点 $y$，选团内邻点 $a$，置 $\varphi(y)=\varphi(a)g(a,y)$。棱 $ay$ 精确拟合。对另一个团内邻点 $x$，先用三角形 $(x,a,y)$，再用团内棱 $xa$ 的误差估计，得到至多 $2\varepsilon$。团外没有内部棱，孤立顶点可任取势。团为空时全图无棱。

**路径幂。** 对不同的下标 $x,y$，闭区间 $[x,x+k]$、$[y,y+k]$ 相交当且仅当 $x\le y+k$ 且 $y\le x+k$，这正是 $P_n^k$ 的邻接条件。完整证明由 Lean 内核检查。
:::

**手工推导。** 第 1 项的系数对每个非空有限图都严格小于 $k-1$。在 $k=2$ 时，系数小于 $1$，并在 [@thm-appe-two-tree-stretch-separation] 的递归 $2$-树上逐个达到该有限规模界，且随递归深度趋于 $1$。在 $k=3$ 时，系数小于 $2$，将 [@thm-appe-clique-bounded-banach-potential] 的 $8/3$ 界改进到所有团大小至多为 $4$ 的弦图，包括所有 $3$-树。路径幂 $P_n^3$（$n\ge4$）从 $K_4$ 开始，每次把一个新顶点接到前面的 $3$ 个顶点所成的团上。由 [@thm-appe-chordal-banach-limit-two]，这族 $3$-树的最优实 Banach 系数趋于 $4/3$。是否有某棵 $3$-树的系数超过 $4/3$，仍是开放问题。

第 2 项对实 Banach 空间的加法群也适用，取 $d(a,b)=\|a-b\|$。第 4 项将 [@thm-appe-chordal-banach-limit-two] 的路径幂下界带入有限区间图类。先固定 $k$ 让 $n$ 趋于无穷，再增大 $k$，最优系数的下界可任意接近 $2$。因此有限区间图上的实 Banach 重构系数与双不变伪度量群的通用重构系数，上确界均恰为 $2$。

将第 1 项与 [@thm-appe-clique-bounded-banach-potential] 合用，团大小至多为 $k+1$ 时误差至多为 $\min(k-1,\,4-4/k)\varepsilon$。对团大小无统一限制的弦图，实 Banach 系数 $C_{\mathrm{Ban,chordal}}$ 在 $[2,4]$ 内的精确值仍待确定，双不变伪度量群的通用系数 $C_{\mathrm{chordal}}$ 仍待在 $\{2,3,4\}$ 中确定。固定目标群后，还可以问一个给定弦图上的最优系数。

**四顶点图上的 $\mathrm{SU}(2)$ 圆度量反例。** 四点弦图若无三角形便是森林。若只有一个三角形，可规范化两条辐棱，把余棱写成 $\exp X$，再取势 $1,\exp(-X/3),\exp(X/3)$，三棱误差各为 $|X|/3\le\varepsilon/3$。附着的树棱可精确拟合。剩下的非完全图是两三角形共一棱的菱形图。把一个度数为 $3$ 的顶点取作中心，将辐棱规范化为 $1$。在外缘路径的中间顶点取势 $1$，两端各在 $1$ 与精确拟合相应外缘棱的值之间取最短测地线中点，误差至多 $\varepsilon/2$。

在完全图 $K_4$ 上，所有棱须同时由同一组顶点势拟合。圆度量的几何结构给出以下统一界，循环四分之一转则给出一个精确的最坏棱误差。

::: {.theorem #thm-appe-round-quaternion-k4-bounds title="$K_4$ 上圆度量单位四元数增益的重构界" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.reconstruction_bound, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.quarter_turn_sharp, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionK4Bounds.not_subcritical_claim"}
在单位四元数群 $S^3\cong\mathrm{SU}(2)$ 上取圆距离 $d_{\mathrm{round}}(p,q)=\arccos\langle p,q\rangle_{\mathbb R}$，内积取自实四维四元数空间。以 $\mathrm{Fin}(4)=\{0,1,2,3\}$ 为顶点集。

1. **统一上界。** 设 $0\le\varepsilon\le\pi$，且增益 $g:\mathrm{Fin}(4)\times\mathrm{Fin}(4)\to S^3$ 满足 $g_{ii}=1$、$g_{ji}=g_{ij}^{-1}$，以及对每个两两不同的有序三元组 $(i,j,k)$ 有 $d_{\mathrm{round}}(g_{ij}g_{jk},g_{ik})\le\varepsilon$。则存在势 $\varphi:\mathrm{Fin}(4)\to S^3$，对每条有向棱 $i\ne j$ 都有

   $$
   d_{\mathrm{round}}(g_{ij},\varphi_i^{-1}\varphi_j)\le \frac45\varepsilon.
   $$

2. **循环四分之一转的锐界。** 令 $Q$ 的对角增益和以 $0$ 为中心的辐棱增益均为 $1$，有向外缘 $12,23,31$ 的增益均为 $I$（沿第一虚轴的单位四元数），反向外缘取 $I^{-1}$。所有由两两不同的顶点组成的有序三角形，其缺陷都至多为 $\pi/2$，且有一组两两不同的顶点达到 $\pi/2$。对任意势 $\varphi$，至少有一条有向棱的误差不小于 $r_0=\arccos(1/\sqrt3)$。存在一个势，使每条有向棱的误差恰为 $r_0$。因此该实例的最优误差与最大缺陷之比为 $c_*=2\arccos(1/\sqrt3)/\pi>3/5$。

3. **排除较小的统一系数。** 不存在实数 $k<c_*$，使第 1 款的每个 $g$ 和 $\varepsilon$ 都有一个势，其每条有向棱的误差至多为 $k\varepsilon$。特别地，$1/2$ 不成立。
:::

::: {.proof #pf-appe-round-quaternion-k4-bounds}
**大缺陷。** 若 $\varepsilon\ge5\pi/8$，从 $\varphi_0=1$ 出发，依次选取 $\varphi_j$，使它与所有先前顶点沿棱输运来的 $\varphi_i g_{ij}$ 正交。每一步至多有 $3$ 个正交条件，实四维空间中的正交补含有单位向量。棱误差均为 $\pi/2\le4\varepsilon/5$，反向棱由取逆保距得到同样的误差。

**中点与小缺陷。** 当 $\varepsilon<5\pi/8$，置 $a_i=g_{0i}$，以 $g'_{ij}=a_i g_{ij}a_j^{-1}$ 将辐棱规范化为 $1$。左右乘保距，三角缺陷保持不变。记规范化后的外缘 $12,23,31$ 的增益依次为 $A,B,C$，令势为 $(1,1,yB^{-1},z)$。棱 $01$ 精确拟合，其余五条棱要求 $y$ 靠近 $B,AB$，$z$ 靠近 $1,C^{-1}$，且 $y,z$ 彼此也在拟合半径内。两对中心各自的距离，以及对应距离 $d_{\mathrm{round}}(B,1)$ 和 $d_{\mathrm{round}}(AB,C^{-1})$，都由三角条件控制在 $\varepsilon$ 内。

取两对中心的归一化和 $m,n$，分别记和的长度为 $L,M$。每个中点距本对中心至多 $\varepsilon/2$，且 $L,M\ge2\cos(\varepsilon/2)$。对应中心的弦长至多 $2\sin(\varepsilon/2)$，所以 $\|Lm-Mn\|\le4\sin(\varepsilon/2)$。展开平方得 $\|Lm-Mn\|^2=(L-M)^2+LM\|m-n\|^2$，于是中点间距 $D=d_{\mathrm{round}}(m,n)$ 满足 $\sin(D/2)\le\tan(\varepsilon/2)$。当 $\varepsilon\le77\pi/180$，用 $\arcsin(\tan x)$ 在 $[0,77\pi/360]$ 上的凸性及端点估计 $\arcsin(\tan(77\pi/360))\le(7/5)(77\pi/360)$，得 $D\le7\varepsilon/5$。只要满足这个距离界，就沿最短弧将两中点各向对方移动 $\max\{0,(D-4\varepsilon/5)/2\}$，至多移动 $3\varepsilon/10$。新点间距至多 $4\varepsilon/5$，到各自中心的距离至多 $\varepsilon/2+3\varepsilon/10$。

**中间区间。** 若中点更远，即 $D>7\varepsilon/5$，则 $77\pi/180<\varepsilon<5\pi/8$。取单位向量 $v$ 正交于第一对中心及第二对中心之差，选其符号使 $\langle n,v\rangle_{\mathbb R}\ge0$。把这个公共方向正交投影到 $n^\perp$ 并归一化为 $w$，则 $w$ 正交于第二对中心。令 $y=\sqrt S\,m+\sqrt{1-S}\,v$、$z=\sqrt S\,n+\sqrt{1-S}\,w$。以度数计，区间 $[77,79]$、$[79,81]$、$[81,84]$、$[84,87]$、$[87,90]$、$[90,225/2]$ 的六份有理泰勒证书各给出一个 $S\in[0,1]$，以及 $T=-\langle m,n\rangle_{\mathbb R}$ 的界 $0<T_0\le T\le T_1$，满足

$$
\begin{aligned}
\cos(4\varepsilon/5)&\le\sqrt S\cos(\varepsilon/2),\\
(1-T_0)(1-S)&\le S(1+T_0)^3,\\
\cos(4\varepsilon/5)&\le1-(1+T_1)S.
\end{aligned}
$$

这些证书用余弦泰勒级数的前 $8$ 项与前 $9$ 项分别作下界和上界，以 $3.14159\le\pi\le3.14160$ 把端点估计化成有理不等式。第一式给出四个中心内积所需的余弦下界。对 $y,z$ 的内积，置 $\zeta=\langle n,v\rangle_{\mathbb R}$、$h=\sqrt{1-\zeta^2}\ge T$。展开得 $-ST+(1-S)h+\sqrt{S(1-S)}\,\zeta(1+T/h)$。第二式保证混合项至少为 $(1-S)(1-h)$，故第三式给出所需下界。两个构造都给出五条棱的界，最后将规范化的势逐点右乘 $a_i$ 即可还原原增益的拟合。

**四分之一转。** 含中心的三角形和外缘三角形的闭路增益均为 $I$ 或 $I^{-1}$，所以缺陷为 $\pi/2$。将势左乘 $\varphi_0^{-1}$，使中心势为 $1$，记外缘势为 $q_1,q_2,q_3$。若一致误差半径 $r<\pi/2$，置 $u=\cos r$。三条辐棱给出 $\|m\|\ge\operatorname{Re}m\ge u$，其中 $m=(q_1+q_2+q_3)/3$。置 $e=(q_2-q_1)/\sqrt2$、$f=(2q_3-q_1-q_2)/\sqrt6$。右乘 $I$ 是斜对称等距变换，故外缘三项内积之和为 $\sqrt3\langle eI,f\rangle_{\mathbb R}$。由 $\|e\|^2+\|f\|^2=3(1-\|m\|^2)$ 和柯西–施瓦茨不等式，

$$
3u\le\sqrt3\langle eI,f\rangle_{\mathbb R}\le\frac{3\sqrt3}{2}(1-\|m\|^2)\le\frac{3\sqrt3}{2}(1-u^2).
$$

解 $u\le(\sqrt3/2)(1-u^2)$ 得 $u\le1/\sqrt3$，所以 $r\ge r_0$。当 $r\ge\pi/2$，同一下界直接成立。取 $t=1/\sqrt3$，在垂直于 $1,I$ 的平面内取 $v_1=J$（沿第二虚轴的单位四元数），再按 $v_{j+1}=-v_j/2+(\sqrt3/2)v_j I$ 循环旋转。势 $q_j=t+\sqrt{1-t^2}\,v_j$ 的辐棱余弦为 $t$，外缘余弦为 $(1-t^2)\sqrt3/2=t$。又 $\cos(3\pi/10)=\sin(\pi/5)$，其平方为 $(5-\sqrt5)/8>1/3$，故 $r_0>3\pi/10$。若统一系数 $k<c_*$，在 $Q$ 上取 $\varepsilon=\pi/2$ 就会要求半径 $k\pi/2<r_0$，与下界矛盾。完整证明由 Lean 内核检查。
:::

**循环单参数族（手工推导）。** $c_*$ 也是循环族（辐棱增益为 $1$，外缘统一取 $\cos\theta+I\sin\theta$，$0<\theta\le\pi$）的最优比值。为核对最优性，记 $r(\theta)$ 为最小拟合半径，$r_0=\arccos(1/\sqrt3)$。当 $0<\theta\le\pi/3$，恒等势和外缘三角的闭路下界给出 $r(\theta)=\theta$，比值为 $1/3$。当 $\pi/3\le\theta\le\pi/2$，最大缺陷为 $2\pi-3\theta$。设 $\delta=\pi/2-\theta$，各外缘增益只改变距离 $\delta$，故 $r(\theta)\le r_0+\delta$，并由 $3c_*>1$ 得 $\delta>0$ 时比值严格低于 $c_*$。

当 $\pi/2\le\theta\le\pi$，最大缺陷为 $\theta$。置 $a=\cos\theta$、$k=\cos(\theta-2\pi/3)$，最优半径为 $\arccos u_\theta$，其中 $u_\theta$ 是 $F_\theta(u)=k+(a-k)u^2-u$ 在 $(0,1)$ 内的唯一零点。事实上，设拟合的最小余弦为 $u>0$。外缘内积均值的对称部分为 $a(3|m|^2-1)/2$，反对称部分至多为 $(\sqrt3/2)\sin\theta(1-|m|^2)$，故 $u\le k+(a-k)|m|^2\le k+(a-k)u^2$。在定理证明的平面向量构造中取实部 $u_\theta$、虚部长度 $\sqrt{1-u_\theta^2}$，每条辐棱的余弦为 $u_\theta$，每条外缘棱的余弦为 $k+(a-k)u_\theta^2=u_\theta$。在 $\pi/2\le\theta\le2\pi/3$ 上，$F_\theta(1/\sqrt3)=(\sin\theta-1)/\sqrt3\le0$，故 $u_\theta\le1/\sqrt3$。隐式求导时，$r'(\theta)$ 的分子 $\sin\theta\,u_\theta^2+\sin(\theta-2\pi/3)(1-u_\theta^2)$ 至多为 $u_\theta^2$，分母 $(1+2(k-a)u_\theta)\sqrt{1-u_\theta^2}$ 至少为 $\sqrt{1-u_\theta^2}$，故 $r'(\theta)\le1/\sqrt6<c_*$。在 $2\pi/3\le\theta\le\pi$ 上，$9F_\theta(1/3)=-3\cos\theta+4\sqrt3\sin\theta-3\ge0$，因为该式在此区间凹且端点非负。因此 $r(\theta)\le\arccos(1/3)<4r_0/3$。最后一个不等式可比较 $3\arccos(1/3)$ 与 $4r_0$ 的余弦 $-23/27$ 与 $-7/9$，两角均在 $(\pi,2\pi)$。这些界给出 $\theta>\pi/2$ 时严格较小的比值。

::: {.problem #prob-appe-round-quaternion-k4-optimal-constant title="$K_4$ 上圆度量单位四元数增益的最优统一系数"}
记 $C_{\mathrm{SU}(2)}(K_4)$ 为 $K_4$ 上所有正三角缺陷的圆度量单位四元数增益实例中，最小拟合半径与最大三角缺陷之比的上确界。由 [@thm-appe-round-quaternion-k4-bounds] 的统一上界和四分之一转实例得到 $c_*\le C_{\mathrm{SU}(2)}(K_4)\le4/5$。任意增益下的精确上确界仍是开放问题。
:::

**小缺陷与上确界取到（手工推导）。** 缺陷 $\varepsilon$ 趋零时，将辐棱规范化为 $1$，再取切空间对数 $z_{ij}=\log g_{ij}$。每条外缘增益都距 $1$ 至多 $\varepsilon$，所以各对数的范数至多为 $\varepsilon$。三角乘积取对数的一阶项为三个对数之和，故加法三角缺陷至多为 $\varepsilon+O(\varepsilon^2)$。平均 $4$ 个加法星形势得到范数为 $O(\varepsilon)$ 的势，棱误差至多为 $\varepsilon/2+O(\varepsilon^2)$。将势取指数时的二阶误差仍为 $O(\varepsilon^2)$，因此重构误差与缺陷之比至多为 $1/2+O(\varepsilon)$。最小拟合半径是紧致势空间上连续误差函数的最小值，因而随增益连续。最大三角缺陷也是连续的。由于 $c_*>1/2$，充分小的正缺陷给出的比值都小于 $c_*$，故上确界在远离零缺陷的紧集上取到。

**添加孤立点（手工推导）。** 在四分之一转实例上加一个孤立点，最大三角缺陷和最小拟合半径均保持不变。因此 $n=4,5$ 时此例的比值都超过实标量系数 $(n-2)/n$，因为 $c_*>3/5$ 且 $1/2<3/5$。

::: {.remark #rem-appe-anchoring-consequences title="锚定表示的五条推论（手工推导）"}
**手工推导。** 设条款 II、III、IV 对一切点对与三点成立，$X$ 非空（可以无限）。

1. **正自配对。** $c_{xx}=\mathbf{1}$。条款 IV 取 $y=z=x$ 得 $c_{xx}^2=c_{xx}$，条款 III 给出 $c_{xx}^2=\mathbf{1}$。
2. **锚定表示。** 任取锚点 $o$，令 $g_x:=c_{ox}$，则 $g_xg_x^*=g_x^*g_x=\mathbf{1}$ 且 $c_{xy}=g_x^*g_y$。这是因为 $c_{xy}=c_{xo}\,c_{oy}$，而 $c_{xo}=c_{ox}^*$。
3. **唯一性。** 若另有 $c_{xy}=g_x'^*g_y'$，则 $g'_xg_x^*$ 与 $x$ 无关：不同的表示只差左乘一个固定元。
4. **外延商。** 条款 I 的不可分关系 $x\sim_{\mathrm{CMP}}y$ 等价于 $g_x=g_y$，所以 $\widetilde X$ 单射到 $\mathcal{A}$ 的公平元群里。
5. **端点公式。** 对任意采样路径，$c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$。

第 2 款在有限 $X$ 上是 [@thm-appe-chordal-gain-potential] 取完全图的情形；这里的直接构造对无限 $X$ 也成立，并且给出了势的显式形式。
:::

第 1 款排除了 [@ex-appe-layer0-countermodels] 的反例 (a)：单点上 $\mathrm{CMP}=-1$ 满足往返为 $+1$，却违反 $c\cdot c=c$。所以在条款 IV 之下，`H2` 的“正自配对”不再是一条独立的标定。第 4 款的意思是：选定锚点之后，一个对象就是把锚点带到它的那个旋子，对象与作用在对象上的算子不再分属两类。第 5 款是 §30.3.2 有序旋子乘积积分的牛顿—莱布尼茨公式：平坦的比较沿任何采样路径连乘，结果只依赖两个端点，这在任意有限孔径下精确成立，不需要细分极限。

弦图是让三角相容足够的一个充分条件。恰好足够的条件可以直接说出来。

::: {.remark #rem-appe-triangle-simple-connectivity title="三角相容何时足够：可比三角形填满每个圈（手工推导与文献结果）"}
**手工推导。** 设 $G$ 是顶点集 $V$ 上的有限简单图，$H$ 为群，$g$ 定义在相邻的有序点对上，满足 $g(j,i)=g(i,j)^{-1}$，且在 $G$ 的每个三角形上 $g(i,j)\,g(j,k)=g(i,k)$。对一条走道 $w=(x_0,\dots,x_n)$（相继两点相邻），记 $\operatorname{hol}(w)=g(x_0,x_1)\cdots g(x_{n-1},x_n)$。允许两种改写：删去或插入一次原路折返，$x,y,x\leftrightarrow x$；把三角形的两条边换成第三条边，$x,y,z\leftrightarrow x,z$。两种改写都不改变 $\operatorname{hol}$。若 $G$ 的每条闭走道都能用这两种改写化成单点，称 $G$ **被三角形填满**。

1. **充分。** 若 $G$ 被三角形填满，则任何群 $H$ 上满足上述两条的 $g$ 都是势之比。在每个连通分支取基点 $o$，令 $\varphi(x)=\operatorname{hol}(w)$，$w$ 为任一条从 $o$ 到 $x$ 的走道。两条这样的走道，一条接上另一条的反向，成为闭走道，它的 $\operatorname{hol}$ 为 $1$；由取逆规则，反向走道的 $\operatorname{hol}$ 是原走道的逆，所以 $\varphi$ 与走道的选取无关；对相邻的 $x,y$ 有 $\varphi(y)=\varphi(x)\,g(x,y)$，即 $g(x,y)=\varphi(x)^{-1}\varphi(y)$。
2. **必要。** 若 $G$ 的某个连通分支没有被三角形填满，则存在群 $H$ 与满足上述两条的 $g$，它不是势之比。取 $H$ 为该分支上以 $o$ 为基点的闭走道在两种改写下的等价类，乘法为首尾相接；取一棵生成树，记 $\gamma_x$ 为树上从 $o$ 到 $x$ 的走道，令 $g(x,y)=[\gamma_x\,(x,y)\,\gamma_y^{-1}]$，在其余分支上令 $g\equiv1$。它满足取逆与三角相容，并且任一以 $o$ 为基点的闭走道 $w$ 有 $\operatorname{hol}(w)=[w]$。这个 $H$ 非平凡：设以 $x$ 为基点的闭走道 $w$ 不能化成单点，则 $\gamma_x\,w\,\gamma_x^{-1}$ 是以 $o$ 为基点的闭走道，它能化成单点当且仅当 $w$ 能。势之比会使一切闭走道的 $\operatorname{hol}$ 等于 $1$，这与 $H$ 非平凡矛盾。
3. **偏差按填充面积累积。** 设 $H$ 带双侧不变的伪度量 $d$，$g$ 精确满足取逆，而三角相容只在误差 $\varepsilon$ 之内成立：在每个三角形上 $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$（由双侧不变性与取逆规则，三个顶点的六种排序给出同一个偏差）。一条用 $A$ 次三角形改写化成单点的闭走道满足 $d(\operatorname{hol}(w),1)\le A\varepsilon$，两个方向的改写都计入 $A$：折返不改变 $\operatorname{hol}$；每次三角形改写把乘积中的一段 $g(x,y)\,g(y,z)$ 换成 $g(x,z)$，或者反过来，双侧不变性把这一步的偏差控制在 $\varepsilon$ 之内。

**文献结果。** 第 2 款中的群是 $G$ 的团复形（以 $G$ 的团为单形）的棱道群，它同构于团复形的基本群（Spanier, *Algebraic Topology*, 1966, 第 3 章）；“被三角形填满”就是团复形的每个连通分支单连通。连通弦图的团复形可缩：单纯顶点的邻居张成一个单形，删去这个顶点是形变收缩，并且保持连通，沿消去次序归纳即得。所以 [@thm-appe-chordal-gain-potential] 是第 1 款的特例。
:::

两个例子标出边界。四圈没有三角形，它的闭走道群是 $\mathbb{Z}$，第 2 款的 $g$ 把绕圈一周记成生成元，任意和乐都允许。在四圈中央加一个与四点都相邻的轮毂，得到的四轮图不是弦图，因为外圈仍是无弦的四圈；它却被四个三角形填满，三角相容仍然推出势表示。所以对条款 IV 而言，要紧的是可比三角形能否填满每个圈。第 3 款可以和 §30.3.3 的有限网格斯托克斯定理对照着读：和乐的偏差不超过填充所用的三角形改写次数乘以单个三角形的偏差；填充是一张圆盘时，这个次数就是圆盘里三角形的个数。

## E.8.1.3 从势表示到格拉姆半正定与弦距 {#sec-appe-gram-from-potential}

有了 $c_{xy}=g_x^*g_y$，多点格拉姆半正定只差一个正的读数。

::: {.remark #rem-appe-gram-from-flatness title="平坦比较的求同读数表半正定，弦距是希尔伯特距离（手工推导与文献结果）"}
**手工推导。** 设条款 II–IV 成立，$\varphi$ 是 $\mathcal{A}$ 上的正线性泛函（$\varphi(a^*a)\ge0$），$\varphi(\mathbf{1})=1$，且在自伴元上取实值（复 $*$-代数上的正泛函自动如此）。对任意有限点组 $x_1,\dots,x_m$：

1. 求同读数表 $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ 是对角元为 $1$ 的实对称半正定矩阵。
2. $d(x,y)^2:=2\,\varphi\bigl(v(x,y)\bigr)=\varphi(\Delta_{xy}^*\Delta_{xy})$ 是某个希尔伯特空间中两点距离的平方，因而 $d$ 满足三角不等式。
3. 若求同读数都是实标量，$S(x_i,x_j)=s_{ij}\mathbf{1}$，则不需要泛函：只要 [@rem-appe-involution-positivity] 的正性条件成立，矩阵 $[s_{ij}]$ 就半正定。

推导：对实系数 $\alpha_i$ 令 $a=\sum_i\alpha_ig_i$。由 $c_{x_ix_j}=g_i^*g_j$ 与 $A(x_i,x_j)=-A(x_j,x_i)$，

$$
a^*a=\sum_{i,j}\alpha_i\alpha_j\,c_{x_ix_j}=\sum_{i,j}\alpha_i\alpha_j\,S(x_i,x_j).
$$

取 $\varphi$ 得 $\alpha^{\mathsf T}G\alpha=\varphi(a^*a)\ge0$，即第 1 款。第 3 款中 $a^*a=(\alpha^{\mathsf T}[s_{ij}]\alpha)\mathbf{1}$；若该数为负，正性条件迫使 $a=0$，于是 $a^*a=0$，矛盾。第 2 款用 $g_y-g_x=g_x\Delta_{xy}$：在 $\varphi$ 的 GNS 表示 $(\pi,\Omega)$ 中，$\lVert\pi(g_y)\Omega-\pi(g_x)\Omega\rVert^2=\varphi(\Delta_{xy}^*g_x^*g_x\Delta_{xy})=\varphi(\Delta_{xy}^*\Delta_{xy})$，再由 [@rem-appe-chord-sagitta-layer0] 第 4 款等于 $2\varphi(v)$。

**逆向（手工推导）。** 任给实内积空间中的单位向量 $x_1,\dots,x_m$，克利福德比较 $c_{ij}=x_ix_j$ 对反转对合满足条款 II–IV，标量部分是正泛函，读数为 $x_i\cdot x_j$。所以对角元为 $1$ 的实对称矩阵半正定，当且仅当它是某个平坦公平比较在某个正泛函下的求同读数表。

**冻结库中的对应部分。** 向量组的复格拉姆矩阵半正定见 [`gramPsd`](lean:D5/S3/Quantum/Measurement/AntidistinguishabilityGram.gramPsd)；半正定矩阵 $A$ 的平方距离 $A_{ii}+A_{jj}-2A_{ij}$ 构成条件负定核，见 [`gram_distance_conditionally_negative`](lean:D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_distance_conditionally_negative)。后者是 Schoenberg 定理（`文献结果`）在有限点集上的一个方向。
:::

合起来：

$$
\text{条款 IV}+\text{正泛函}\;\Longrightarrow\;\text{正自配对与读数表半正定};\qquad \text{标量相似}+\text{条款 IV}+\text{正性条件}\;\Longrightarrow\;\text{H2 的三项}.
$$

求同读数不是实标量时，椭圆负平方一项不再成立：在 $2\times2$ 复矩阵（对合取厄米共轭）中取 $g=\operatorname{diag}(e^{i\alpha},e^{i\beta})$ 型的平坦比较，条款 II–IV 与正性条件都成立，而 $A^2$ 是两个不同负数构成的对角阵，不是 $\mathbf{1}$ 的倍数（`手工推导`）。

`H3` 的“平行四边形极化”在这条路线上也成了结论：弦距 $d$ 来自 GNS 内积，内积空间的平行四边形恒等式 [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 自动成立。这没有免去输入，只是换了输入的形状：正泛函给出的 $\varphi(a^*b)$ 本身就是一个半正定的内积型，“内积”被换成了“正读数”。柯西完备化仍按 `T1` 处理，不受影响。

四个反例各自违反哪一条，可以逐个点清。

::: {.example #ex-appe-countermodel-attribution title="四个第 0 层反例的归属与反例 (d) 的三点和乐（手工推导）"}
**手工推导。** 对 [@ex-appe-layer0-countermodels] 的四个反例：

| 反例 | 是否满足条款 II、III | 违反的条件 |
| :--- | :---: | :--- |
| (a) 单点 $\mathrm{CMP}(x_0,x_0)=-1$ | 是 | 条款 IV：$(-1)(-1)=1\neq-1$ |
| (b) 对偶数 $1\pm\varepsilon$、分裂复数 $\cosh\eta\pm j\sinh\eta$ | 是 | 正性条件：$\varepsilon^*\varepsilon=0$，$j^*j=-1$ |
| (c) $\mathcal{Cl}_{4,0}$ 的 $B=e_1e_2+e_3e_4$ | $B$ 不是任何公平元的求异部分 | 复合比较 $(\cos\frac\pi4+e_1e_2\sin\frac\pi4)(\cos\frac\pi4+e_3e_4\sin\frac\pi4)$ 的求异部分是 $\frac12B$，其求同部分 $\frac12(\mathbf{1}+e_1e_2e_3e_4)$ 不是实标量 |
| (d) $3\times3$ 相似表，$\det S=-3$ | 是 | 条款 IV 或正性条件；$A_{12}=0$ 的实现违反条款 IV |

反例 (d) 的验算。相似表 $S_{01}=S_{02}=\frac{\sqrt3}{2}$、$S_{12}=-1$ 与幅值 $\lvert A_{01}\rvert=\lvert A_{02}\rvert=\frac12$、$\lvert A_{12}\rvert=0$ 可以由取值在复单位圆上的比较实现：

$$
c_{01}=c_{02}=e^{i\pi/6},\qquad c_{12}=-1,\qquad c_{ji}=\overline{c_{ij}},\qquad c_{ii}=1 .
$$

它满足条款 II、III。三点和乐为

$$
h(0,1,2)=c_{01}\,c_{12}\,c_{20}=e^{i\pi/6}\cdot(-1)\cdot e^{-i\pi/6}=-1\neq1 ,
$$

违反条款 IV。以 $0$ 为锚点，链式偏差 $c_{12}-c_{10}\,c_{02}=-1-1=-2$，模长为 $2$。一般地，(d) 的求同读数是实标量而 $\det S<0$，由 [@rem-appe-gram-from-flatness] 第 3 款，它的任何实现都违反条款 IV 或正性条件。
:::

反例 (d) 还给出一个定量的对照。条款 IV 不精确成立时，格拉姆矩阵的负特征值由三点和乐偏离 $\mathbf{1}$ 的程度控制。

::: {.remark #rem-appe-near-flat-gram-bound title="近似平坦的比较给出近似半正定的读数表（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是 $C^*$-代数，$\varphi$ 是态，比较满足条款 II、III 且 $c_{xx}=\mathbf{1}$。对点组 $x_1,\dots,x_m$ 固定其中一点为锚点 $o$，令

$$
\delta_o:=\max_{i,j}\,\lVert c_{x_ix_j}-c_{x_io}\,c_{ox_j}\rVert .
$$

则求同读数表 $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ 的最小特征值满足

$$
\lambda_{\min}(G)\ge-(m-2)\,\delta_o .
$$

推导：令 $g_i=c_{ox_i}$，写 $c_{x_ix_j}=g_i^*g_j+E_{ij}$。矩阵 $[\operatorname{Re}\varphi(g_i^*g_j)]$ 半正定。扰动 $F_{ij}=\operatorname{Re}\varphi(E_{ij})$ 是实对称矩阵，$\lvert F_{ij}\rvert\le\delta_o$；它的对角元为零（$E_{ii}=c_{x_ix_i}-c_{x_io}c_{ox_i}=0$），锚点所在的行与列为零，所以每行至多 $m-2$ 个非零元，由盖尔圆定理其特征值的绝对值不超过 $(m-2)\delta_o$。

由于对角元为 $1$ 且 $\lvert G_{ij}\rvert\le1$，平凡的下界是 $-(m-2)$，所以这条界只在 $\delta_o<1$ 时才有信息。锚点必须取在点组之内；取在点组之外时界变为 $-(m-1)\delta_o$。对 [@ex-appe-countermodel-attribution] 的反例 (d)：$m=3$，$\delta_o=2$，下界 $-2$ 没有信息，实际的最小特征值是 $\frac{1-\sqrt7}{2}\approx-0.8229$。
:::

这里的因子 $m-2$ 与 [@thm-appe-chordal-gain-potential-stability] 中的 $\lvert V\rvert-2$ 来源不同：定理中它是沿消去次序累积的三点偏差的个数，这里它是扰动矩阵每行非零元的个数。

## E.8.1.4 曲率从哪里来 {#sec-appe-curvature-from-half-comparison}

条款 IV 让一切三点和乐等于 $\mathbf{1}$，而球面角盈与贝里相位确实存在。两者并不冲突：平坦的是全比较，弯曲的是它的平方根。

::: {.remark #rem-appe-half-comparison-holonomy title="全比较平坦，半比较的三点和乐是吉拉尔角盈（手工推导与文献结果）"}
**手工推导。** 对求同读数为实标量 $s>-1$ 的公平元 $u$，由 $u+u^*=2s\mathbf{1}$ 得 $u^2=2su-\mathbf{1}$，于是 $(\mathbf{1}+u)^2=2(1+s)\,u$。令

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}},
$$

则 $r(u)$ 是公平元且 $r(u)^2=u$，称为 $u$ 的**半比较**。它的求同读数满足 $S(r)^2=\frac{1+s}{2}=1-\frac v2$。

在 $\mathcal{Cl}_{3,0}$ 中取两两不对径的单位向量 $a,b,c$，记 $r_{ab}=r(ab)$，$[a,b,c]=a\cdot(b\times c)$，$\mathbf{I}=e_1e_2e_3$。则全比较满足 $ab\cdot bc\cdot ca=\mathbf{1}$，而

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

推导：$(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$，其中用到 $ab\cdot bc=ac$、$bc\cdot ca=ba$、$ab\cdot ca=a(bc)a$ 与 $ab\cdot bc\cdot ca=\mathbf{1}$。标量部分是 $2(1+a\cdot b+b\cdot c+c\cdot a)$。双向量部分是 $b\wedge c+a(b\wedge c)a$；记 $b\wedge c=\mathbf{I}n$，$n=b\times c$，则 $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$，两项相加得 $2[a,b,c]\,\mathbf{I}a$。分母由 $r$ 的公平性确定，同时给出恒等式

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**文献结果。** 上式右端形如 $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$，是保持 $a$ 不动的旋子，其中 $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$；分母为正时即 $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$。$\lvert\Omega\rvert$ 是球面三角形 $abc$ 的面积，即吉拉尔角盈，$\Omega$ 的符号由 $[a,b,c]$ 的符号给出（van Oosterom–Strackee 1983；Eriksson 1990）。

**与冻结定理的对应。** 乘积公式与分母恒等式在泡利矩阵模型里已冻结，见 [@thm-appe-bloch-triangle-return-phase]。分子的两个量 $1+a\cdot b+b\cdot c+c\cdot a$ 与 $[a,b,c]$ 正是 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 中 $4\operatorname{Tr}(P_aP_bP_c)$ 的实部与虚部。把上面的恒等式与 $\det G(a,b,c)=[a,b,c]^2$ 联立（$[a,b,c]^2$ 的展开式冻结为 [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)），得到

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

其中 $\det G$ 的展开式见 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)。
:::

$S(r)^2=1-\frac v2$ 在布洛赫球上就是 $\cos^2\frac\theta2$：半比较求同读数的平方等于 $1$ 减去半个矢高，这是玻恩权重的弦—矢高写法，它本身不替代 `H5` 的可加性前提。行列式公式说的是：三点格拉姆体积等于三个互补矢高之积乘以角盈的矢高，[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)“二生三”原胞的 $\det G=\sin^4\epsilon$ 是它的特例。对 `H8` 而言，第 1 层内生的射影和乐不需要新的输入，它是条款 IV 之下把全比较开平方的结果；仍然需要第 2 层新输入的，是随时空基点变化的纤维联络及其动力学。

乘积公式不只停在手工推导上。把 $\mathcal{Cl}_{3,0}$ 换成它的泡利矩阵模型（$e_k\mapsto\sigma_k$，$\mathbf{I}\mapsto i\mathbf{1}$，对合 ${}^*$ 对应共轭转置），半比较成为一个具体的 $2\times2$ 酉矩阵，下面两条结论已在 Lean 中验证。对 $r\in\mathbb{R}^3$ 记 $r\cdot\sigma=r_1\sigma_x+r_2\sigma_y+r_3\sigma_z$，$P_r=\frac12(\mathbf{1}+r\cdot\sigma)$；对 $\phi\in\mathbb{C}^2$ 记向 $r$ 的归一化投影

$$
N_r(\phi):=\frac{P_r\phi}{\sqrt{\operatorname{Re}\,\phi^\dagger P_r\phi}} .
$$

::: {.lemma #lem-appe-rotor-gate-normalized-projection title="旋子门把 $a\cdot\sigma$ 转到 $b\cdot\sigma$，在本征旋量上等于归一化投影" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate"}
设 $a,b\in\mathbb{R}^3$ 是单位向量且 $b\neq-a$，令

$$
R_{a\to b}:=\frac{\mathbf{1}+(b\cdot\sigma)(a\cdot\sigma)}{\sqrt{2(1+a\cdot b)}} .
$$

则

1. $R_{a\to b}\,R_{a\to b}^\dagger=\mathbf{1}$；
2. $R_{a\to b}\,(a\cdot\sigma)\,R_{a\to b}^\dagger=b\cdot\sigma$；
3. 对满足 $\psi^\dagger\psi=1$ 与 $P_a\psi=\psi$ 的 $\psi\in\mathbb{C}^2$，有 $R_{a\to b}\,\psi=N_b(\psi)$。
:::

::: proof
记 $A=a\cdot\sigma$，$B=b\cdot\sigma$，则 $A^2=B^2=\mathbf{1}$，$AB+BA=2(a\cdot b)\mathbf{1}$。分子 $\mathbf{1}+BA$ 满足 $(\mathbf{1}+BA)(\mathbf{1}+AB)=2(1+a\cdot b)\mathbf{1}$ 与 $(\mathbf{1}+BA)A(\mathbf{1}+AB)=2(1+a\cdot b)B$，这是前两条。第三条：$A\psi=\psi$ 给出 $(\mathbf{1}+BA)\psi=2P_b\psi$，而 $\psi^\dagger P_b\psi=\frac{1+a\cdot b}{2}>0$，两边的归一化因子相同。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-bloch-triangle-return-phase title="布洛赫三角上三次旋子门的返回相位" lean="D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy"}
设 $a,b,c\in\mathbb{R}^3$ 是单位向量，$b\neq-a$，$c\neq-b$，$a\neq-c$。记

$$
S:=1+a\cdot b+b\cdot c+c\cdot a,\qquad D:=a\cdot(b\times c).
$$

则

1. $S^2+D^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)$，且 $S^2+D^2>0$；
2. 三个旋子门的乘积为

   $$
   R_{c\to a}\,R_{b\to c}\,R_{a\to b}=\frac{S\,\mathbf{1}-iD\,(a\cdot\sigma)}{\sqrt{S^2+D^2}} ;
   $$

3. 对满足 $\psi^\dagger\psi=1$ 与 $P_a\psi=\psi$ 的 $\psi\in\mathbb{C}^2$，依次向 $b$、$c$、$a$ 做归一化投影，得

   $$
   N_a\bigl(N_c(N_b(\psi))\bigr)=\frac{S-iD}{\sqrt{S^2+D^2}}\,\psi .
   $$
:::

::: proof
第 1 条：记 $x=a\cdot b$，$y=b\cdot c$，$z=c\cdot a$。格拉姆恒等式 $D^2=1+2xyz-x^2-y^2-z^2$（[`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)）代入后，$S^2+D^2$ 展开为 $2(1+x)(1+y)(1+z)$；三个因子在两两不对径时都为正。第 2 条：三个分子相乘得 $(\mathbf{1}+AC)(\mathbf{1}+CB)(\mathbf{1}+BA)=2S\,\mathbf{1}-2iD\,A$，三个归一化因子之积由第 1 条等于 $2\sqrt{S^2+D^2}$。第 3 条：[@lem-appe-rotor-gate-normalized-projection] 的第 3 条把每一次归一化投影换成相应的旋子门，前两条保证每一步之后的旋量仍是单位旋量并落在下一步所需的本征空间里；最后用 $A\psi=\psi$。完整证明由 Lean 内核检查。
:::

与 [@rem-appe-half-comparison-holonomy] 对照：$R_{a\to b}$ 是 $r_{ba}=r_{ab}^*$ 的像，所以定理第 2 条是注记中乘积的对合 $(r_{ab}\,r_{bc}\,r_{ca})^*=r_{ac}\,r_{cb}\,r_{ba}$，$D$ 前的符号随之由正变负；第 1 条就是注记末尾的恒等式。第 3 条给出第 2 条的操作读法：从 $a$ 的本征旋量出发，沿 $a\to b\to c\to a$ 做三次归一化投影，回到原旋量并乘上模为 $1$ 的因子 $(S-iD)/\sqrt{S^2+D^2}$。Lean 没有陈述的部分照旧分层：把辐角 $\operatorname{atan2}(D,S)$ 等同于半个吉拉尔角盈是文献结果；旋子的指数形式没有形式化；“最短”意义下的最小性与唯一性也没有形式化，Lean 模块里 `rotor` 与 `shortestGate` 只是名字。Lean 中 $N_r(\phi)$ 对一切 $\phi$ 有定义（分母为零时按 Lean 的约定取零向量）；定理只在各步分母 $\sqrt{(1+u\cdot v)/2}>0$ 处用到它。

[@rem-appe-real-realizability-return-phase] 第 1、2 款在“有一个对象与其余每个对象都不正交”的情形已在所钉仓库冻结，陈述如下；这时不需要填满的条件。一般的填满情形与单比特的第 4 款仍是手工推导。

::: {.proposition #prop-appe-real-rephasing-star title="有一行不含零的厄米矩阵：可重定相为实矩阵，当且仅当三点乘积全为实" lean="D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_rephasing_iff_triple_products_real D5/S3/Quantum/PureState/BargmannRealRephasing.exists_real_gram_rephasing_iff_triple_products_real"}
设 $G$ 是 $N\times N$ 复矩阵，$i_0$ 是一个指标，并且 $G_{i_0j}\neq0$ 对每个 $j$ 成立。

1. 若 $G$ 是厄米矩阵，则存在实数 $\theta_1,\dots,\theta_N$ 使一切 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 为实数，当且仅当对一切指标 $i,j,k$（允许重复），$G_{ij}G_{jk}G_{ki}$ 为实数。
2. 若 $G$ 半正定，则存在实数 $\theta_1,\dots,\theta_N$ 与 $N\times N$ 实矩阵 $B$，使 $e^{i\theta_i}G_{ij}e^{-i\theta_j}=\left(B^{\mathsf T}B\right)_{ij}$ 对一切 $i,j$ 成立，当且仅当对一切指标 $i,j,k$，$G_{ij}G_{jk}G_{ki}$ 为实数。
:::

::: proof
“仅当”：相位沿 $i\to j\to k\to i$ 相消，重定相不改变 $G_{ij}G_{jk}G_{ki}$，而它在实矩阵中算出来是实数。“当”：取 $\theta_j=\arg G_{i_0j}$。由厄米性 $G_{ji_0}=\overline{G_{i_0j}}$，于是

$$
e^{i\theta_i}G_{ij}e^{-i\theta_j}=\frac{G_{i_0i}\,G_{ij}\,G_{ji_0}}{\lvert G_{i_0i}\rvert\,\lvert G_{i_0j}\rvert},
$$

是三点乘积 $G_{i_0i}G_{ij}G_{ji_0}$ 的正实数倍，所以是实数；$G_{ij}=0$ 的元素重定相后仍为零。第 2 款：重定相是 $G\mapsto DGD^{*}$，$D$ 为对角酉矩阵，保持半正定；重定相后的矩阵元素全为实数，所以它是实对称半正定矩阵，可写成 $B^{\mathsf T}B$。

对厄米矩阵，含重复指标的三点乘积（如 $G_{ij}G_{ji}G_{ii}=\lvert G_{ij}\rvert^2G_{ii}$）与含零元的三点乘积自动是实数，所以条件只在非正交图的三角形上有内容，与 [@rem-appe-real-realizability-return-phase] 第 2 款的写法一致。完整证明由 Lean 内核检查。
:::

返回相位的虚部只在 $D\neq0$ 时出现。两两比较读得出 $D$ 是否为零，读不出它的符号：$D^2=1+2xyz-x^2-y^2-z^2$（$x=a\cdot b$，$y=b\cdot c$，$z=c\cdot a$，即 [`triangle_gram`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.triangle_gram)）只给出它的平方。$D$ 是否为零恰好回答一个与 `H7` 相邻的问题：一族对象是否需要复数振幅。

::: {.remark #rem-appe-real-realizability-return-phase title="一族对象何时可以只用实数描述：三点巴格曼乘积是否为实（手工推导与文献结果）"}
**手工推导。** 设 $\psi_1,\dots,\psi_N\in\mathbb{C}^d$ 是单位向量，$G_{ij}=\langle\psi_i,\psi_j\rangle$。把 $G_{ij}\neq0$ 的点对连成图 $\Gamma$，称为**非正交图**。称这族对象**可实化**，若有实数 $\theta_1,\dots,\theta_N$ 使一切 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 都是实数。这时该实矩阵是 $e^{-i\theta_i}\psi_i$ 的格拉姆阵，实对称半正定，秩 $r=\operatorname{rank}G\le d$，可写成 $V^{\mathsf T}V$，$V$ 的列是 $\mathbb{R}^r\subseteq\mathbb{C}^d$ 中的实向量 $v_i$；两组向量的格拉姆阵相同，由冻结定理 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)，有 $d\times d$ 酉矩阵 $U$ 使 $e^{-i\theta_i}\psi_i=Uv_i$。所以可实化就是：乘过相位之后，这族向量落在一个实子空间的酉像里，并且格拉姆阵到相位为止不变。对 $\Gamma$ 中的闭走道 $i_0,i_1,\dots,i_k=i_0$，称 $G_{i_0i_1}G_{i_1i_2}\cdots G_{i_{k-1}i_0}$ 为它的**巴格曼乘积**；它在 $\psi_i\mapsto e^{-i\theta_i}\psi_i$ 下不变。

1. 可实化时，每个巴格曼乘积都是实数，特别是每个三点乘积 $G_{ij}G_{jk}G_{ki}$。
2. 反之，若 $\Gamma$ 被三角形填满（[@rem-appe-triangle-simple-connectivity]；例如任意两个对象都不正交，或 $\Gamma$ 是弦图），并且 $\Gamma$ 的每个三角形上三点乘积都是实数，则这族对象可实化。
3. 填满的条件不能去掉：$\mathbb{C}^3$ 中取 $\psi_1=e_1$，$\psi_2=\frac{1}{\sqrt3}(e_1+e_2+e_3)$，$\psi_3=e_2$，$\psi_4=\frac12\bigl(e_1+ie_2-(1+i)e_3\bigr)$。$\psi_1\perp\psi_3$，$\psi_2\perp\psi_4$，其余内积非零，$\Gamma$ 是没有三角形的四圈：第 2 款中“三角形上为实”的要求空真，而“被三角形填满”不成立。四圈的巴格曼乘积 $G_{12}G_{23}G_{34}G_{41}=\frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\cdot\frac i2\cdot\frac12=\frac{i}{12}$ 不是实数，由第 1 款这族对象不可实化。
4. 单比特：设 $\psi_a$ 的布洛赫向量为 $a$。可实化当且仅当全部布洛赫向量落在一个过球心的平面上，当且仅当每三个的有向体积 $D=a\cdot(b\times c)$ 都为零；这里不需要填满的条件，例如 $a,b,-a,-b$ 的非正交图是四圈，它们仍可实化。对两两不对径的 $a,b,c$，[@thm-appe-bloch-triangle-return-phase] 的返回相位 $(S-iD)/\sqrt{S^2+D^2}$ 不是实数当且仅当 $D\neq0$。
5. 两两求同读数 $a\cdot b$、$b\cdot c$、$c\cdot a$ 只给出 $D^2$。复共轭 $\psi\mapsto\bar\psi$ 把布洛赫向量 $(r_x,r_y,r_z)$ 变为 $(r_x,-r_y,r_z)$：两两读数不变，$D$ 变号，返回相位取共轭。

推导：第 1 款，巴格曼乘积不变，而在实矩阵 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 中算出的它是实数。第 2 款，在 $\Gamma$ 的边上令 $g(i,j)=\left(G_{ij}/\lvert G_{ij}\rvert\right)^2$，它只在 $G_{ij}\neq0$ 的边上定义，取值在单位圆群中。$G_{ji}=\overline{G_{ij}}$ 给出 $g(j,i)=g(i,j)^{-1}$。在三角形 $ijk$ 上，记 $B_{ijk}=G_{ij}G_{jk}G_{ki}\neq0$，则 $g(i,j)\,g(j,k)\,g(i,k)^{-1}=g(i,j)\,g(j,k)\,g(k,i)=\left(B_{ijk}/\lvert B_{ijk}\rvert\right)^2$，它等于 $1$ 当且仅当 $B_{ijk}$ 是实数（正负都可以）。所以三点乘积为实，正是 $g$ 在三角形上的链式律 $g(i,j)\,g(j,k)=g(i,k)$。由 [@rem-appe-triangle-simple-connectivity] 第 1 款（$\Gamma$ 是弦图时即 [@thm-appe-chordal-gain-potential]，群取单位圆群），有单位圆群中的 $\varphi_i$ 使 $g(i,j)=\varphi_i^{-1}\varphi_j$。取 $\theta_i$ 使 $e^{2i\theta_i}=\varphi_i$，则 $\left(e^{i\theta_i}G_{ij}e^{-i\theta_j}/\lvert G_{ij}\rvert\right)^2=\varphi_i\,g(i,j)\,\varphi_j^{-1}=1$，所以 $e^{i\theta_i}G_{ij}e^{-i\theta_j}$ 是实数；不相邻的点对上 $G_{ij}=0$ 本来就是实数。第 3 款是直接计算。第 4 款：对秩一投影 $P_a=\lvert\psi_a\rangle\langle\psi_a\rvert=\frac12(\mathbf{1}+a\cdot\sigma)$ 有 $G_{ab}G_{bc}G_{ca}=\operatorname{Tr}(P_aP_bP_c)$，而冻结定理 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 给出 $\operatorname{Tr}(P_aP_bP_c)=\frac14(S+iD)$，所以三点乘积为实当且仅当 $D=0$。若布洛赫向量都在一个过球心的平面上，用一个转动把这个平面转到 $xz$ 平面，转动由某个酉矩阵实现（$\mathrm{SU}(2)$ 到 $\mathrm{SO}(3)$ 是满射，`文献结果`）；$xz$ 平面上的单位向量 $(\sin\alpha,0,\cos\alpha)$ 的本征旋量是 $\left(\cos\frac\alpha2,\sin\frac\alpha2\right)$，是实向量，所以这族对象可实化。反之，可实化给出 $\mathbb{R}^r\subseteq\mathbb{C}^2$（$r\le2$）中的实向量 $v_i$ 与酉矩阵 $U$，实向量的布洛赫向量在 $xz$ 平面上，$U$ 把这个平面转成另一个过球心的平面。布洛赫向量共一个过球心的平面，当且仅当它们张成的空间至多二维，当且仅当任取三个的有向体积都为零。最后一句是 [@thm-appe-bloch-triangle-return-phase] 第 1、2 条：两两不对径时 $S^2+D^2>0$。第 5 款的 $D^2$ 公式见上文；复共轭的作用是直接计算（$\bar\sigma_y=-\sigma_y$）。

**文献结果。** 第 1 款的方向（非实的巴格曼乘积说明这族对象不能都写成实向量）是 Fernandes、Wagner、Novo 与 Galvão (2024) 的虚性见证；他们还指出，两两重叠的测量足以为四个态的集合见证虚性，对三个态的集合则不能。这与第 4、5 款不矛盾：三个单位向量的两两重叠模长总能由 $\mathbb{R}^3$ 中的实向量实现（把格拉姆阵的三个非对角元都换成它们的模长，行列式不会变小），而第 4 款用到了单比特的维数，并且这里的可实化要求格拉姆阵到相位为止不变。第 2 款的论证与增益图的平衡判据同型：增益图平衡当且仅当增益可以切换为恒等（Zaslavsky 1989）。
:::

`H7` 在台账里列的“中心复结构”是复合系统层析的输入，这条注记回答的是一个相邻而更窄的问题：一族给定的对象，在保留格拉姆阵到相位为止的意义下，是否需要复数振幅。只要可比三角形填满每个圈，答案可以由三点巴格曼乘积判定，也就是比较值乘积的读数；两两重叠的模长一般不够。在单比特上，两两求同读数通过 $D^2$ 就够了：可实化当且仅当没有三个对象围出非零的有向体积；两两读数看不到的只是 $D$ 的符号，即复共轭交换的那一对手性。这并没有推出复结构。实向量构成的模型满足全部条款（E.8.2.3 的计数），所以“需要复数”仍是输入；改变的是这条输入的形状。第 3 款的四圈与 [@rem-appe-triangle-simple-connectivity] 中的四圈是同一个图：在一般维数中，这个图既让三角相容不足以推出势表示，也让三点读数不足以判定可实化；单比特上的 $a,b,-a,-b$ 说明，在维数受限时同一个图并不妨碍判定。
