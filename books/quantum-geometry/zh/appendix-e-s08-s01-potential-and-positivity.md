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

非降的有界整数序列必趋于常值，由 [@thm-appe-chordal-banach-sharp-four] 及其实 Banach 加法群推论可知终值为 $4$。

**实标量与 Banach 目标。** 对 $n\ge3$，实数增益下，最小一致误差等于定向简单回路的最大绝对增益均值。下界来自势差的消去。反过来，若这些均值至多为 $r$，给各有向棱权重 $g_{uv}+r$。反向也满足回路界，折返权重为 $2r$，故无负回路。从新增零权源点取最短路距离作势，最短路距离在棱的两个方向上均满足所需不等式，故误差至多 $r$。弦分解把长为 $\ell$ 的回路分成 $\ell-2$ 个三角形，故上界为 $(n-2)\varepsilon/n$。取零辐条的扇图，沿扇缘路径给每棱增益 $\varepsilon$，则长 $n$ 的外圈达到此界。把例子扩为 $K_n$ 可令所有从较小到较大的非辐条棱取相同增益。对任意实 Banach 目标，$K_n$ 的精确统一系数也是 $(n-2)/n$，见 [@thm-appe-complete-cliquesum-banach]。

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

同属 $p$ 邻域的两点之间，误差由经过 $p$ 的一个三角形控制。若棱 $xy$ 从 $p$ 的邻点 $x$ 跨到非邻点 $y$，则 $\ell(y)\le r(x)\le r(q)$ 且 $\ell(y)>r(p)$，故 $y$ 与 $q$ 相邻。若 $x\ne q$，则 $x,q$ 均含 $r(p)$，也彼此相邻。将 $g(p,x)g(x,y)$ 与 $\varphi(y)=g(p,q)g(q,y)$ 比较，先用三角形 $(x,q,y)$，再用 $(p,x,q)$，总误差至多为 $2\varepsilon$。若 $x=q$，这条棱已被精确拟合。余下的棱由归纳控制。由左平移不变性，棱的拟合误差等于 $d(\varphi(x)g(x,y),\varphi(y))$。再用逆增益右平移及 $d$ 的对称性，得到反向棱的误差相同。空图没有棱需要拟合。

**分裂图。** 每个非空诱导子图若含团外顶点，该点的邻点均在团内。若全部顶点都在团内，则任选一点也是单纯顶点。这再次保证每个长至少为 $4$ 的环有弦。团非空时取根 $o$，令 $\varphi(o)=1$，其余团内顶点取 $\varphi(x)=g(o,x)$。辐棱精确拟合，其他团内棱误差至多为 $\varepsilon$。对每个非孤立的团外顶点 $y$，选团内邻点 $a$，置 $\varphi(y)=\varphi(a)g(a,y)$。棱 $ay$ 精确拟合。对另一个团内邻点 $x$，先用三角形 $(x,a,y)$，再用团内棱 $xa$ 的误差估计，得到至多 $2\varepsilon$。团外没有内部棱，孤立顶点可任取势。团为空时全图无棱。

**路径幂。** 对不同的下标 $x,y$，闭区间 $[x,x+k]$、$[y,y+k]$ 相交当且仅当 $x\le y+k$ 且 $y\le x+k$，这正是 $P_n^k$ 的邻接条件。完整证明由 Lean 内核检查。
:::

**手工推导。** 第 1 项的系数对每个非空有限图都严格小于 $k-1$。在 $k=2$ 时，系数小于 $1$，并在 [@thm-appe-two-tree-stretch-separation] 的递归 $2$-树上逐个达到该有限规模界，且随递归深度趋于 $1$。在 $k=3$ 时，系数小于 $2$，将 [@thm-appe-clique-bounded-banach-potential] 的 $8/3$ 界改进到所有团大小至多为 $4$ 的弦图，包括所有 $3$-树。当 $n\ge4$ 时，路径三次幂 $P_n^3$ 从 $K_4$ 开始，每个新顶点接到前面 $3$ 个顶点所成的团上。这个图族的系数上确界恰为 $\frac43$，见 [@thm-appe-three-tree-path-sup]。

第 2 项对实 Banach 空间的加法群也适用，取 $d(a,b)=\|a-b\|$。第 4 项将 [@thm-appe-chordal-banach-limit-two] 的路径幂下界带入有限区间图类。先固定 $k$ 让 $n$ 趋于无穷，再增大 $k$，最优系数的下界可任意接近 $2$。因此有限区间图上的实 Banach 重构系数与双不变伪度量群的通用重构系数，上确界均恰为 $2$。

将第 1 项与 [@thm-appe-clique-bounded-banach-potential] 合用，团大小至多为 $k+1$ 时误差至多为 $\min(k-1,\,4-4/k)\varepsilon$。

完全图上，可以把所有星形势同时纳入平均，进一步把三角误差的系数压到 $1$ 以下。若较大的图由若干片沿树接合，还可以先逐片拟合，再在相接的团上取中点。

::: {.theorem #thm-appe-complete-cliquesum-banach title="完全图的精确实 Banach 重构常数与分离团和的中点平均" lean="D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.completeGraph_banach_upper_bound, D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.completeGraph_banach_lower_bound, D5/S3/Combinatorics/Graph/Chordal/CompleteAndCliqueSumBanach.SimpleGraph.separatedCliqueSum_banach_gain_potential"}
1. **完全图上的实半赋范上界。** 设 $V$ 为有限顶点集，$|V|\ge2$，$E$ 为任意实半赋范向量空间，$\varepsilon\in\mathbb R$。设 $g:V\times V\to E$ 对任意 $i,j$ 满足 $g(j,i)=-g(i,j)$，且对每组两两不同的 $i,j,l$ 满足 $\|g(i,j)+g(j,l)-g(i,l)\|\le\varepsilon$。则存在势 $\varphi:V\to E$，使任意 $i\ne j$ 满足

   $$
   \|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac{|V|-2}{|V|}\varepsilon.
   $$

2. **完全图上的尖锐实 Banach 下界。** 对每个自然数 $m\ge2$，令 $\mathrm{ZeroDivSkew}(m)$ 为行和全为零的实反对称 $m\times m$ 矩阵空间，配以逐项上确界范数，成为有限维实 Banach 空间。存在 $g:\mathrm{Fin}(m)\times\mathrm{Fin}(m)\to\mathrm{ZeroDivSkew}(m)$，对任意 $i,j$ 满足 $g(j,i)=-g(i,j)$，且对两两不同的 $i,j,l$ 满足 $\|g(i,j)+g(j,l)-g(i,l)\|\le1$，使得对任意势 $\varphi:\mathrm{Fin}(m)\to\mathrm{ZeroDivSkew}(m)$，都存在 $i\ne j$ 满足

   $$
   \|g(i,j)-(\varphi(j)-\varphi(i))\|\ge\frac{m-2}{m}.
   $$

3. **分离团和上的中点平均。** 设 $T$ 是任意指标类型 $I$ 上的树，$G$ 是有限顶点集 $V$ 上的简单图，$P:I\to\mathcal P(V)$ 是一族片的顶点集，每个顶点属于至少一片，每条 $G$ 的棱的两个端点同属至少一片。给定自然数 $m\ge1$，对每条树棱 $ab$，交集 $S(a,b)=P(a)\cap P(b)$ 是非空的 $G$-团且 $|S(a,b)|\le m$。若树中不同的 $a,b$ 不相邻，则 $P(a)$ 与 $P(b)$ 不交。在每片 $P(a)$ 中，不同树邻点 $b,c$ 的附着集 $S(a,b),S(a,c)$ 两两不交，且两集之间没有 $G$ 的棱。

   设 $E$ 为任意实半赋范向量空间，$g:V\times V\to E$ 为任意增益，$R\ge0$ 为实数，局部势族 $\varphi_a:V\to E$ 满足对每个 $a\in I$ 及每条端点均在 $P(a)$ 中的有向 $G$-棱 $(u,v)$，有 $\|g(u,v)-(\varphi_a(v)-\varphi_a(u))\|\le R$。则存在全局势 $\Phi:V\to E$，使每条有向 $G$-棱 $(u,v)$ 满足

   $$
   \|g(u,v)-(\Phi(v)-\Phi(u))\|\le(2-1/m)R.
   $$
:::

::: {.proof #pf-appe-complete-cliquesum-banach}
**星形势的平均。** 令 $n=|V|$，取 $\varphi(v)=\frac1n\sum_{w\in V}g(w,v)$。由反对称性 $g(i,i)=0$。棱 $(i,j)$ 的残差就是 $g(w,i)+g(i,j)-g(w,j)$ 对所有 $w$ 的平均，其中 $w=i,j$ 的两项为零，其余 $n-2$ 项的半范数至多为 $\varepsilon$。三角不等式给出所需上界。$n=2$ 时两项全为零，任意实数 $\varepsilon$ 都适用。

**有向三角形见证。** 令 $A_{ab}$ 是从零矩阵出发，在坐标 $(a,b)$ 处加 $1$、在 $(b,a)$ 处减 $1$ 的矩阵，令 $T(a,b,c)=A_{ab}+A_{bc}+A_{ca}$。它反对称、各行之和为零，三个顶点不同则各坐标的绝对值至多为 $1$，有重复顶点时矩阵为零。固定 $0\in\mathrm{Fin}(m)$，取 $g(i,j)=T(0,i,j)$。交换 $i,j$ 使增益取负，且 $g(i,j)+g(j,l)-g(i,l)=T(i,j,l)$。若 $i\ne j$，则 $g(i,j)_{ij}$ 在两端都不同于 $0$ 时为 $1$，否则为 $0$，故这些坐标之和为 $(m-1)(m-2)$。任意势的每个矩阵同时具有零行和与零列和，后一性质来自反对称性。把势差的 $(i,j)$ 项按行、列分别求和，它们的总和为零（对角项也为零）。因此

$$
\sum_{i\ne j}\bigl(g(i,j)-(\varphi(j)-\varphi(i))\bigr)_{ij}=(m-1)(m-2).
$$

在 $m(m-1)$ 个有序异点对中，至少有一个残差坐标不小于平均值 $(m-2)/m$，其范数也不小于该值。

**沿树接合。** 令 $d(a,b)$ 为 $\varphi_a-\varphi_b$ 在 $S(a,b)$ 上的平均。它随树棱反向取负。从树根出发沿唯一有限路径累加 $d$，取平移量 $c_a$，使 $c_b-c_a=d(a,b)$。于是 $\psi_a=\varphi_a+c_a$ 保持原有棱误差，且 $D(s)=\psi_b(s)-\psi_a(s)$ 在每个附着团 $S(a,b)$ 上的平均为零。记团大小为 $q$。对团内不同的 $s,t$，用同一有向棱 $(s,t)$ 上两片各自的残差相减，得 $\|D(s)-D(t)\|\le2R$。由零均值及自身项为零，

$$
\left\|\frac{D(s)}2\right\|\le\frac{q-1}{q}R\le(1-1/m)R.
$$

不相邻片不交、同片内不同附着集不交，保证每个共享顶点恰属两片。在共享顶点取两片平移后势的中点，独属一片的顶点保持该片的平移后势。每条棱都在某片内。若两端均共享，则分离条件保证它们位于同一附着团，棱残差是两片原残差的平均，半范数至多为 $R$。其余棱至多一个端点发生中点调整，增量至多为 $(1-1/m)R$，故总误差至多为 $(2-1/m)R$。完整证明由 Lean 内核检查。
:::

**手工推导。** 合用前两项，$m$ 个顶点的完全图在所有实 Banach 目标上的最优统一系数恰为 $(m-2)/m$。第 3 项把已有局部拟合的误差传递到全图，在分离的附着团大小至多为 $m$ 时重构误差至多为局部误差的 $2-1/m$ 倍。

回到团大小受限的一般弦图，跨层棱的两端若都有最多的前驱，就把较浅端点在较深端点的平均中加重。这一步改进了 [@thm-appe-clique-bounded-banach-potential] 的等权估计。

::: {.theorem #thm-appe-biased-clique-banach-potential title="有界团数弦图上的偏置前驱平均重构界" lean="D5/S3/Combinatorics/Graph/Chordal/WeightedCliqueBanachPotential.SimpleGraph.IsChordal.exists_biased_clique_banach_gain_potential"}
设 $G$ 是有限顶点集 $V$ 上的简单弦图，$k\in\mathbb N$ 且 $k\ge3$，并且 $G$ 的每个团至多有 $k+1$ 个顶点。设 $E$ 为实半赋范向量空间，$\varepsilon\ge0$ 为实数，$g:V\times V\to E$ 对任意 $i,j\in V$ 满足 $g(j,i)=-g(i,j)$。若对每个有序三角形 $(i,j,\ell)$（即 $i,j$、$j,\ell$、$i,\ell$ 均相邻）都有 $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$，则存在势 $\varphi:V\to E$，使每个有序相邻顶点对 $(u,v)$ 都满足

$$
\begin{aligned}
\bigl\|g(u,v)-(\varphi(v)-\varphi(u))\bigr\|
&\le \left(4-\frac{4}{k}-\frac{2(k-2)^2}{k(k-1)^3}\right)\varepsilon .
\end{aligned}
$$
:::

::: {.proof #pf-appe-biased-clique-banach-potential}
各连通分支的诱导子图继承全部假设，且每条棱都在一个分支内，故可分别构造势再合并。记所求系数为 $R_k$。在每个分支选根 $o$，按到根的距离分层，记 $P(x)$ 为 $x$ 在上一层的邻点集。对第 $i$ 层及以上诱导子图的连通分支 $C$（$i\ge1$），其影子 $S_C$ 是第 $i-1$ 层中与 $C$ 相邻的顶点所成的集合。若两个影子顶点不相邻，分别取内部经过 $C$ 和经过更低各层的最短连接路径。通往根的路径保证后一路存在。两路均无弦，且两路的内部顶点层号至少相差 $2$，合成无弦圈，与弦性矛盾。因此影子是团。

非根顶点 $x$ 沿最短路走向根可找到一个前驱，且其前驱都在同一影子中。故 $P(x)\cup\{x\}$ 是团，$|P(x)|\le k$。同层相邻顶点 $x,y$ 的前驱集必有一个包含于另一个。否则从两个集合的差中各取一个前驱，它们在公共影子中相邻，与 $x,y$ 组成无弦四边形。称有 $k$ 个前驱的顶点为饱和顶点。若 $P(v)$ 中有两个饱和顶点，它们相邻，且由嵌套性有相同的前驱集。加上这两个顶点便得到一个有 $k+2$ 个顶点的团，矛盾。

取 $\delta=\frac{k-2}{k(k-1)^2}$。若 $P(x)$ 有 $m\ge2$ 个顶点且含饱和顶点，则给唯一饱和顶点权重 $1/m+\delta$，其余各取 $1/m-\delta/(m-1)$。其他情形用等权平均。权重 $w_x(b)$ 之和为 $1$，且都至少为 $f(m)$，其中 $f(1)=1$，$f(m)=1/m-\delta/(m-1)$（$m\ge2$）。由 $0<\delta\le1/4$ 可见 $f(m)>0$。对整数 $2\le m\le n$，有 $(m-1)(n-1)\ge mn/4$，故 $f(m)-f(n)=(n-m)\bigl(1/(mn)-\delta/((m-1)(n-1))\bigr)\ge0$，而 $f(2)\le f(1)$。

当 $i\ge2$ 时，令 $D$ 为把第 $i-1$ 层纳入后包含 $C$ 的父分支。沿最短路走向根可知影子 $S_C$ 非空。其各顶点都在 $D$ 中，其前驱集非空且两两嵌套，因而最小前驱集中的任一点 $a_C$ 都与整个 $S_C$ 相邻，并属于 $S_D$。令 $Q_C=Q_D+g(a_D,a_C)$。在第 $1$ 层取 $a_C=o$、$Q_C=0$，并令 $\varphi(o)=0$。对非根顶点 $x$，用其所在层及以上的分支 $C$ 定义

$$
\begin{aligned}
\varphi(x)&=Q_C+\sum_{b\in P(x)}w_x(b)\bigl(g(a_C,b)+g(b,x)\bigr).
\end{aligned}
$$

由反对称性，重复顶点的三角缺陷为零。根的邻点 $x$ 只有前驱 $o$，故 $\varphi(x)=g(o,x)$，根的关联棱精确拟合。记 $T(a,b,d)=g(a,b)+g(b,d)-g(a,d)$。从同一锚点 $a$ 经同一影子中的前驱 $b,d$ 到同一顶点 $z$，经 $b$ 与经 $d$ 的路径增益之差为 $T(a,b,d)-T(b,d,z)$，半范数至多为 $2\varepsilon$。

对从较浅层的 $u$ 到较深层的 $v$ 的非根棱，取 $v$ 所在层对应的分支 $C$，记 $c=a_C$。由构造有 $c\in P(u)$、$u\in P(v)$。令 $M=Q_C+g(c,u)$，则 $M$ 是 $\varphi(u)$ 的平均中经 $c$ 的一项，$M+g(u,v)$ 是 $\varphi(v)$ 的平均中经 $u$ 的一项。各平均与其对应项的距离，只来自其他前驱路径，每项至多为 $2\varepsilon$。将两项距离相加，得棱残差的半范数至多为 $(4-2w_u(c)-2w_v(u))\varepsilon$。若两端都有 $k$ 个前驱，则 $u$ 在 $P(v)$ 中的权重上调，两权重之和至少为 $f(k)+1/k+\delta$。若至少一端至多有 $k-1$ 个前驱，则这两权重之和至少为 $f(k)+f(k-1)$。代入 $\delta$ 得

$$
\begin{aligned}
f(k)+\frac{1}{k}+\delta
&=f(k)+f(k-1)\\
&=\frac{2}{k}+\frac{(k-2)^2}{k(k-1)^3}.
\end{aligned}
$$

于是跨层残差的半范数至多为 $R_k\varepsilon$。对于同层棱，定向使 $P(u)\subseteq P(v)$。两端共用锚点与偏移 $Q_C$。固定 $b\in P(u)$，将经 $b$ 到 $u$ 再沿棱到 $v$ 的路径，与 $v$ 端的各条前驱路径比较。匹配的 $b$ 项只用三角形 $(b,u,v)$，误差至多为 $\varepsilon$，其余项的附加误差至多为 $2\varepsilon$。先对 $P(v)$ 加权，得到 $(3-2w_v(b))\varepsilon\le(3-2f(k))\varepsilon$，再对 $P(u)$ 加权，界不变。由于 $2\delta\le(k-2)/k$，有 $R_k-(3-2f(k))=1-2/k-2\delta\ge0$。相邻顶点的层号至多相差 $1$，反向只使残差变号，故所有有向棱均满足该界。完整证明由 Lean 内核检查。
:::

**手工推导。** 取 $k=4$，每棵 $4$-树的团大小至多为 $5$，故系数至多为 $R_4=79/27<3$，严格改进了 [@thm-appe-clique-bounded-banach-potential] 的 $4-4/k=3$ 界和 [@thm-appe-simplicial-interval-split-potential] 第 1 项的规模无关界 $k-1=3$。团大小不受限时的通用常数见 [@thm-appe-chordal-banach-sharp-four]。

前驱权重的偏置能够改善有界团数情形。若不限制团数，单纯逐层平均与两步构造的根平均究竟能控制多少误差？先固定实标量增益，沿用上面的前驱集 $P(x)$、影子 $S_C$、锚点 $a_C$ 和传递量 $Q_C$。称增益 $g:V\times V\to\mathbb R$ 为三角 $1$-平坦，若它对所有顶点对反对称，并且每个有序三角形 $(x,y,z)$ 都满足 $|g(x,y)+g(y,z)-g(x,z)|\le1$。

合法锚点在第 $1$ 层取根 $r$，其余各层的 $a_C$ 位于父分支的影子内且与整个 $S_C$ 相邻。令 $Q_C$ 在第 $1$ 层为 $0$，其余各层满足 $Q_C=Q_D+g(a_D,a_C)$，其中 $D$ 是父分支。合法权重 $w_x(b)$ 对所有 $x,b$ 非负，在 $P(x)$ 外为 $0$，且对每个非根顶点在 $P(x)$ 上的和为 $1$。两步广度优先势取 $\varphi_r(r)=0$，在非根顶点 $x\in C$ 处定义为

$$
\varphi_r(x)=Q_C+\sum_{b\in P(x)}w_x(b)\bigl(g(a_C,b)+g(b,x)\bigr).
$$

纯前驱重心势则取 $\varphi(r)=0$，并要求每个前驱集非空的非根顶点满足 $\varphi(x)=|P(x)|^{-1}\sum_{b\in P(x)}(\varphi(b)+g(b,x))$。

定义塔图 $\operatorname{barycenterTower}(m,n)$，它有根 $r$ 和 $n$ 层，每层 $m$ 个顶点 $(i,j)$，其中 $0\le i<n$、$0\le j<m$。每层为团，根与整个首层相邻。相邻两层间，后一层的第 $0$ 列只接前一层第 $0$ 列，其余顶点接前一层所有顶点。塔增益在同层为 $0$，向前进入第 $0$ 列为 $0$，从根或第 $0$ 列向前进入其他列为 $1$，其余向前增益为 $2$，反向取负（对所有顶点对按层高定义）。

定义桥接图 $\operatorname{bridgedGadget}(m,N)$，它由 $N$ 个副本组成，每个副本有根 $o$ 和各含 $m$ 个顶点的集合 $A=\{a_j\}$、$U=\{u_i\}$、$B=\{v_j\}$、$Y=\{y_j\}$。棱恰为根与 $A$ 的棱、团 $A\cup U$ 的棱、每个 $v_j$ 到整个 $U$ 及 $a_j$ 的棱、每个 $y_j$ 到整个 $U$ 及 $v_j$ 的棱，以及把各副本的根依次连成路径的棱。

::: {.theorem #thm-appe-bfs-barycenter-obstructions title="两步广度优先重构的四倍界与前驱重心及根平均的障碍" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/WeightedTwoStepBFS.SimpleGraph.two_step_residual_bound, D5/S3/Combinatorics/Graph/Chordal/TwoStepBFSAndBarycenterObstructions.SimpleGraph.pure_predecessor_barycenter_unbounded, D5/S3/Combinatorics/Graph/Chordal/TwoStepBFSAndBarycenterObstructions.SimpleGraph.twoStepBFS_root_averaging_lower_bound"}
1. **任意权重的两步重构界。** 对任意有限连通简单弦图、任意根 $r$、任意合法影子锚点与前驱权重以及任意实标量三角 $1$-平坦增益 $g$，相应两步势 $\varphi_r$ 在每条有向棱 $(u,v)$ 上满足 $|g(u,v)-(\varphi_r(v)-\varphi_r(u))|\le4$。

2. **纯前驱重心误差无界。** 对任意自然数 $m\ge2$、$n\ge1$，塔图是连通弦图，其塔增益 $g$ 三角 $1$-平坦，且存在纯前驱重心势。每个顶点 $(i,j)$ 到根的距离为 $i+1$，每个纯前驱重心势 $\varphi$ 都满足

   $$
   \begin{aligned}
   \varphi(i,0)&=0,\\
   \varphi(i,j)&=(2m-1)-(2m-2)\left(\frac{m-1}{m}\right)^i\quad(j\ne0).
   \end{aligned}
   $$

   对任意实数 $M$，存在自然数 $m\ge2$、$n\ge1$，使对应塔图为连通弦图、塔增益三角 $1$-平坦，并存在一条有向棱 $(u,v)$，对该图上每个纯前驱重心势都有 $|g(u,v)-(\varphi(v)-\varphi(u))|>M$。

3. **两步势的根平均障碍。** 对任意自然数 $m\ge2$、$N\ge2$，桥接图是连通弦图。对任意根的概率分布 $\mu$（$\mu(r)\ge0$ 且 $\sum_r\mu(r)=1$），以及对每个根预先选定的任意合法影子锚点和前驱权重，存在实标量三角 $1$-平坦增益 $g$ 和有向棱 $(u,v)$。令 $\bar\varphi(x)=\sum_r\mu(r)\varphi_r(x)$ 为这些两步势的加权平均，则

   $$
   |g(u,v)-(\bar\varphi(v)-\bar\varphi(u))|\ge4-\frac4m-\frac8N.
   $$
:::

::: {.proof #pf-appe-bfs-barycenter-obstructions}
**两步界。** 根的邻点只有根这一个前驱，故根棱无残差。同层相邻顶点 $u,v$ 共用锚点 $a$ 与传递量，任取前驱 $b\in P(u)$、$t\in P(v)$。影子是团，故 $b,t$ 相等或相邻。弦性使四边形 $b,u,v,t$ 至少有一条对角棱 $b,v$ 或 $t,u$（若 $b=t$ 则直接成立）。于是从 $a$ 经 $b,u$ 到 $v$ 与从 $a$ 经 $t$ 到 $v$ 的增益差分解为至多 $3$ 个三角缺陷。跨层棱 $u,v$ 的两锚点记为 $a,c$，其中 $c$ 在 $u$ 的影子内且与 $u$ 相邻。从 $a$ 经 $b,u$ 到 $v$ 与从 $a$ 经 $c,t$ 到 $v$ 的差分解为三角形 $(a,b,c)$、$(b,c,u)$、$(c,u,t)$、$(u,t,v)$ 的缺陷，每个至多 $1$，重复顶点时缺陷为 $0$。因此任意前驱对的残差绝对值至多为 $4$，对两端的前驱概率分布取平均仍保持此界。反向棱的残差只变号。

**塔图。** 从末层向首层消去顶点，每层先消去第 $0$ 列，再消去其余顶点，最后消去根。每次消去时剩余邻点为团，故图为弦图。棱的层高差至多为 $1$，而每个顶点可沿逐层下降的路径到根，故图连通且距离恰为 $i+1$。任意三角形至多跨相邻两层，同层增益为 $0$，跨层的两项增益之差绝对值至多为 $1$，故塔增益三角 $1$-平坦。第 $0$ 列的势始终为 $0$，其余列在首层的共同值为 $s_0=1$，后续层的递推式为 $s_{i+1}=(1+(m-1)(s_i+2))/m$。该递推既构造了势，又逐层唯一确定它，解得第 2 项的闭式。末层第 $0$ 列与第 $1$ 列之间的棱增益为 $0$，其绝对残差恰为 $(2m-1)-(2m-2)((m-1)/m)^{n-1}$。先取 $m$ 使 $2m-1>M$，再由 $0<(m-1)/m<1$ 取足够大的 $n$，即可使同一棱对所有纯前驱重心势的绝对残差超过 $M$。

**桥接图。** 依次消去 $Y,B,U,A$ 与路径上的根是完美消去序，故图为弦图，根路径及副本内的棱保证连通。取根概率质量 $p\le1/N$ 的副本，记其根为 $o$。对每个副本外的根 $r$，到副本内顶点的距离等于到 $o$ 的距离加上局部距离。因而 $P(u_i)=A$、$P(y_j)=U\cup\{v_j\}$，而合法锚点在这两个顶点处分别被迫为 $o$ 和 $a_j$。这是因为 $y_j$ 的尾分支只有它自身，影子为 $U\cup\{v_j\}$，父分支影子为 $A$，其中只有 $a_j$ 与 $v_j$ 相邻。父分支的锚点则只能为 $o$。

记根 $r$ 对应的权重为 $w_{r,x}(b)$。由归一化，所有 $m^2$ 对 $(i,j)$ 的权重和 $w_{r,u_i}(a_j)+w_{r,y_j}(u_i)$ 累加至多为 $2m$。先对副本外的根按 $\mu$ 加权求和，再对顶点对平均，可选一对 $(i,j)$ 使

$$
\begin{aligned}
\sum_{r\text{ 在副本外}}\mu(r)\bigl(w_{r,u_i}(a_j)+w_{r,y_j}(u_i)\bigr)&\le\frac{2}{m}(1-p).
\end{aligned}
$$

把选中副本的顶点按如下先后顺序排列，其他副本的顶点与 $o$ 最先，其次为 $A\setminus\{a_j\}$、$u_i$、$Y$、$(U\setminus\{u_i\})\cup B$、$a_j$，各组内任取严格次序。令向后续顶点的增益为 $1$，反向为 $-1$，对角为 $0$，则每个三角形的绝对缺陷为 $1$。对副本外每个根，锚点传递量抵消，经 $o$ 到 $u_i$ 的两棱路径平均为 $2(1-w_{r,u_i}(a_j))$，经 $a_j$ 到 $y_j$ 的平均为 $-2(1-w_{r,y_j}(u_i))$，且 $g(o,a_j)=g(u_i,y_j)=1$。因此棱 $(u_i,y_j)$ 的有向残差恰为 $4-2w_{r,u_i}(a_j)-2w_{r,y_j}(u_i)$。对副本内的根，第 1 项给出有向残差下界 $-4$。利用概率质量与上述权重界，根平均的有向残差至少为

$$
\begin{aligned}
4(1-p)-\frac4m(1-p)-4p&\ge4-\frac4m-\frac8N.
\end{aligned}
$$

其绝对值也满足这一界。完整证明由 Lean 内核检查。
:::

**手工推导。** 缩放增益可把三角缺陷 $1$ 换成任意 $\varepsilon>0$。纯前驱重心递推没有统一误差系数，而当 $m,N$ 趋于无穷时，两步势采用仅依赖图的锚点、前驱权重与根平均，无法把统一误差界降到 $4\varepsilon$ 以下。[@thm-appe-chordal-banach-sharp-four] 进一步将这个障碍推广到任意势。

根平均的下界给出了检验重构方法的同一族图。团大小有界时，可以按前驱数目分配权重来改进两步重构。对桥接图，则可以先根据通用顶点拟合每份副本的核，再补上根顶点。

::: {.theorem #thm-appe-multitier-universal-banach title="多层前驱权重界与通用核的单纯扩展" lean="D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.IsChordal.exists_multitier_clique_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.exists_universal_core_simplicial_banach_potential, D5/S3/Combinatorics/Graph/Chordal/MultiTierAndUniversalCliqueBanach.SimpleGraph.bridgedGadget_banach_upper_bound"}
以下各项都取实半赋范向量空间 $E$、实数 $\varepsilon\ge0$，以及定义在相应顶点集 $V$ 的所有有序对上的增益 $g:V\times V\to E$。设对任意 $i,j\in V$ 有 $g(j,i)=-g(i,j)$，且对每个有序三角形 $(i,j,\ell)$ 有 $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$。

1. **团大小有界时的多层前驱权重界。** 设 $G$ 是有限顶点集 $V$ 上的简单弦图，且自然数 $k\ge4$ 满足 $G$ 的每个团至多有 $k+1$ 个顶点。则存在势 $\varphi:V\to E$，使每个有向邻接对 $(u,v)$ 都满足

   $$
   \bigl\|g(u,v)-(\varphi(v)-\varphi(u))\bigr\|\le\left(4-\frac{4(k-2)}{k^2-3k+3}\right)\varepsilon .
   $$

2. **通用核的单纯扩展。** 设 $G$ 是有限顶点集 $V$ 上的简单图，且 $U\subseteq H\subseteq V$，其中 $U$ 非空，每个 $u\in U$ 都与 $H$ 中除自身外的所有顶点相邻。设 $H^c$ 是独立集，且对某个自然数 $m\ge1$，每个 $o\in H^c$ 的邻域 $N(o)$ 都包含于 $H$，并构成大小至多为 $m$ 的团。则存在势 $\varphi:V\to E$，使每个有向邻接对 $(u,v)$ 的误差 $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ 至多为 $\max\{1,2-2/m\}\varepsilon$。

3. **桥接图的重构。** 对任意自然数 $m\ge2$、$N\ge1$，取 [@thm-appe-bfs-barycenter-obstructions] 所用的 $\operatorname{bridgedGadget}(m,N)$，其顶点集 $V$ 由副本编号与副本内顶点组成。则存在势 $\varphi:V\to E$，使每个有向邻接对 $(u,v)$ 的误差 $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ 至多为 $(2-2/m)\varepsilon$。
:::

::: {.proof #pf-appe-multitier-universal-banach}
**多层前驱权重。** 在每个连通分量内选根，沿用 [@thm-appe-biased-clique-banach-potential] 证明中的距离分层、前驱集 $P(v)$、影子锚点 $a_C$ 和传递量 $Q_C$。前驱集 $P(v)$ 与 $v$ 构成团，所以 $|P(v)|\le k$。相邻的同层顶点具有按包含关系嵌套的前驱集。若 $S=\{u\in P(v):s\le|P(u)|\}$ 非空，取其中前驱集最小的 $u$。由嵌套性，$P(u)$ 中每个顶点都与 $S$ 中每个顶点相邻。两集各自成团，且位于不同层，因此 $P(u)\cup S$ 是团，给出 $|S|+s\le k+1$。

置 $D=k^2-3k+3$、$\alpha=(k-3)/D$、$\beta=(k-2)/D$。对正整数 $m\le k-2$ 取 $f_m=1/m$，另取 $f_{k-1}=\beta$、$f_k=\alpha$、$f_0=1$。对 $b\in P(v)$，先分配权重 $\max\{f_{|P(v)|},2\beta-f_{|P(b)|}\}$。由于 $2\beta-\alpha=(k-1)/D<1/(k-2)\le1/2$，最小档值为 $\alpha>0$。当 $1\le|P(v)|\le k-2$ 时，初始权重均为 $1/|P(v)|$。当 $|P(v)|=k-1$ 时，以 $\beta$ 为基准，只有达到 $k$ 个前驱的顶点多得 $\beta-\alpha$，且这种顶点至多有 $1$ 个。当 $|P(v)|=k$ 时，以 $\alpha$ 为基准，达到 $k-1$ 个前驱的顶点多得 $\beta-\alpha$，达到 $k$ 个的再多得 $\beta-\alpha$，两种阈值对应的顶点分别至多有 $2$ 个和 $1$ 个。两个大档的权重总和分别由 $(k-1)\beta+(\beta-\alpha)=1$ 和 $k\alpha+3(\beta-\alpha)=1$ 控制。均分剩余权重后，所得 $w_v(b)$ 总和为 $1$，且保留上述每项下界。

非根顶点 $x$ 的势取 $Q_C$ 加上各路径增益 $g(a_C,b)+g(b,x)$ 按 $w_x(b)$ 的加权平均。根的势取 $0$，根边由唯一前驱精确拟合。从同一锚点 $a$ 经影子中的前驱 $b,d$ 到达同一顶点 $x$，两条路径的增益之差等于三角形 $(a,b,d)$ 与 $(b,d,x)$ 的缺陷之差，半范数至多为 $2\varepsilon$。有重合顶点时，相应缺陷由反对称性为零。对从非根顶点 $u$ 到下一层顶点 $v$ 的边，记 $c$ 为 $v$ 所在分量的影子锚点。$c\in P(u)$，$u\in P(v)$，传递量的递推使经过 $c$ 到 $u$ 的项加上 $g(u,v)$ 后恰与到 $v$ 的平均中经过 $u$ 的项相等。两次平均与各自匹配项的偏差之和至多为 $(4-2w_u(c)-2w_v(u))\varepsilon$。由权重下界，$w_u(c)+w_v(u)\ge f_{|P(u)|}+(2\beta-f_{|P(u)|})=2\beta$，故跨层误差至多为 $(4-4\beta)\varepsilon$。

对同层边，定向使 $P(u)\subseteq P(v)$，两端共用锚点和传递量。从任一 $b\in P(u)$ 经 $u$ 到 $v$ 的路径与到 $v$ 的匹配项只差一个三角缺陷，与其余项至多差三个。先对 $P(v)$ 平均，得到 $(3-2w_v(b))\varepsilon\le(3-2\alpha)\varepsilon$，再对 $P(u)$ 平均仍保此界。由 $2\beta-\alpha\le1/2$，此界至多为 $(4-4\beta)\varepsilon$。反向边的残差取负，各连通分量的势合起来即得所求。

**通用核与单纯顶点。** 对 $h\in H$，令 $\varphi(h)$ 为 $g(z,h)$ 在 $z\in U$ 上的均值。核内边 $(a,b)$ 的残差是 $g(z,a)+g(a,b)-g(z,b)$ 的均值。若 $z$ 等于某个端点，该项由反对称性为零。否则，通用性保证三角形存在，该项的半范数至多为 $\varepsilon$。对 $o\notin H$，若 $N(o)$ 非空，则对 $b\in N(o)$ 的候选值 $\varphi(b)+g(b,o)$ 取均值作为 $\varphi(o)$。两位不同邻点的候选值之差由核内边残差与经过 $o$ 的三角缺陷控制，半范数至多为 $2\varepsilon$。对边 $(a,o)$，均值中来自 $a$ 的项与自身之差为零，因此残差至多为 $2(1-1/|N(o)|)\varepsilon\le(2-2/m)\varepsilon$。孤立点取势为零，$H^c$ 中没有边，反向边的误差相同。合并两类边的误差界即得第 2 项。

**桥接图。** 在每份副本中，以去根后留下的顶点为 $H$，以 $U$ 为其中的通用顶点集。作为唯一的核外顶点，根 $o$ 恰与大小为 $m$ 的团 $A$ 相邻。对整份副本应用第 2 项，由 $m\ge2$ 得局部误差界 $(2-2/m)\varepsilon$。沿根组成的路径依次平移各副本的势，使相邻根的势差等于对应桥边增益。平移保持各副本内的势差，所有桥边的残差为零。完整证明由 Lean 内核检查。
:::

**手工推导。** 第 1 项对每个 $k\ge4$ 都严格改进 [@thm-appe-biased-clique-banach-potential] 的界。减去两界共有的 $4-4/k$ 后，比较等价于 $2(k-3)(k-1)^3>(k-2)^2D$，这由 $D<(k-1)^2$ 和 $2(k-3)(k-1)=2((k-2)^2-1)>(k-2)^2$ 得出。取 $k=4$，每棵 $4$-树的重构系数至多为 $20/7$，且 $20/7<79/27<3$。当 $N(m-1)>4m$ 时，[@thm-appe-bfs-barycenter-obstructions] 对任意预先固定的根平均两步方案给出的实值三角-$1$-平坦增益，有边误差至少为 $4-4/m-8/N>2-2/m$。第 3 项对同一增益给出所有边误差至多为 $2-2/m$ 的势。团大小不受限时的精确通用常数见 [@thm-appe-chordal-banach-sharp-four]。

前驱权重界用团大小控制误差。若图已有团树分解，还可以让误差随分隔集的大小与树上的层数增长，或在每个共享顶点处直接合并相邻两袋的势。

::: {.theorem #thm-appe-cliquetree-banach-potential title="团树中心扩展与双团中点粘合的 Banach 势界" lean="D5/S3/Combinatorics/Graph/Chordal/CliqueTreeBanachPotential.SimpleGraph.cliqueTree_center_extension_banach_potential, D5/S3/Combinatorics/Graph/Chordal/CliqueTreeBanachPotential.SimpleGraph.cliqueTree_twoClique_midpoint_banach_potential"}
设 $G$ 是有限顶点集 $V$ 上的简单图，$T$ 是有限指标集 $I$ 上的树。设 $(T,K)$ 是 $G$ 的团树，即每个袋 $K(a)\subseteq V$ 都是 $G$ 的团，每个顶点和每条棱都被某个袋包含，且若一个顶点属于两个袋，它也属于连接这两个袋的每条简单树路径上的所有袋。对每条树棱 $ab$，设分隔集 $S(a,b)=K(a)\cap K(b)$ 非空。

取任意实半赋范向量空间 $E$、实数 $\varepsilon\ge0$ 和增益 $g:V\times V\to E$。对任意 $i,j\in V$，设 $g(j,i)=-g(i,j)$。只要 $ij$、$j\ell$、$i\ell$ 都是 $G$ 的棱，就有 $\|g(i,j)+g(j,\ell)-g(i,\ell)\|\le\varepsilon$。以下两项中的拟合误差均指有向邻接对 $(u,v)$ 上的 $\|g(u,v)-(\varphi(v)-\varphi(u))\|$。

1. **团树中心扩展。** 设自然数 $m\ge1$ 满足每条树棱 $ab$ 都有 $|S(a,b)|\le m$，且自然数 $D$ 满足任意 $a,b\in I$ 都有 $\operatorname{dist}_T(a,b)\le D$。令

   $$
   \begin{aligned}
   R_0 &= 1,\\
   R_{\ell+1} &= \max\left\{R_\ell,1,\left(1-\frac1m\right)(1+R_\ell)\right\}.
   \end{aligned}
   $$

   则存在势 $\varphi:V\to E$，使 $G$ 的每条有向棱上的拟合误差至多为 $R_{\lfloor D/2\rfloor}\varepsilon$。

2. **双团中点粘合。** 设每个顶点 $x\in V$ 都满足 $|\{i\in I:x\in K(i)\}|\le2$。对每条树棱 $ab$，置

   $$
   \sigma(a,b)=\left(1-\frac1{|S(a,b)|}\right)\left(1-\frac{|S(a,b)|}{\max\{|K(a)|,|K(b)|\}}\right).
   $$

   令 $\tau(a)$ 为 $a$ 的两条不同入射树棱的权重之和的最大值。只有一条入射树棱时补 $0$，没有入射树棱时取 $0$。置

   $$
   M(T,K)=\max\left(\{0\}\cup\left\{1-\frac2{|K(a)|}+\tau(a):a\in I,\ |K(a)|\ge2\right\}\right).
   $$

   则 $M(T,K)<3$，且存在势 $\varphi:V\to E$，使 $G$ 的每条有向棱上的拟合误差至多为 $M(T,K)\varepsilon$。
:::

::: {.proof #pf-appe-cliquetree-banach-potential}
**中心扩展。** 取一条最长简单树路径，以它的中间节点或中间棱的两个端点为中心。任一袋到该路径的距离至多为接入点到路径两端的较短距离，否则从该袋到较远端的路径会更长。因此每个袋到最近中心的距离至多为 $\lfloor D/2\rfloor$。在单袋中心上取全袋，在双袋中心上取公共分隔集，对所取集合中的星势 $g(t,\cdot)$ 求均值，作为中心袋的共同势。每条袋内棱的残差是三角缺陷的均值，端点对应的项由反对称性为零，故误差至多为 $\varepsilon$。空袋没有棱需要拟合。

从中心逐层向外扩展。若子袋的父袋势为 $p$，在父子分隔集 $S$ 上保留 $p$，对袋中其余顶点 $v$ 则取 $p(t)+g(t,v)$ 在 $t\in S$ 上的均值。两端都在 $S$ 内时保留原误差界 $R_\ell\varepsilon$。两端都在 $S$ 外时，均值中的 $p(t)$ 相消，误差至多为 $\varepsilon$。若只有端点 $u$ 在 $S$ 内，残差均值中 $t=u$ 的项为零，其他项各由一项三角缺陷和一项父袋残差组成。因此误差至多为 $(1-1/|S|)(1+R_\ell)\varepsilon\le(1-1/m)(1+R_\ell)\varepsilon$。反向只改变残差的符号。三类棱给出递推式。相邻袋的势在分隔集上一致，由路径上的交集性质，含有同一顶点的所有袋都给它相同的势值。每条棱都在某袋内，因而得到全图的拟合界。

**中点粘合。** 对每个非空袋 $K(a)$，令 $p_a(x)$ 为 $g(t,x)$ 在该袋上的均值。棱的两个端点各给出一个零项，故袋内误差至多为 $(1-2/|K(a)|)\varepsilon$。沿树累加 $p_a-p_b$ 在 $S(a,b)$ 上的均值，取常量平移 $\psi_a=p_a+c_a$，使 $\psi_b-\psi_a$ 在每个公共分隔集上均值为零。这个平移由 [@thm-appe-complete-cliquesum-banach] 证明中的树上偏移量 `tree_offsets` 给出，且保持每个袋内的势差。

在分隔集 $S=S(a,b)$ 内取 $u,v$。$\psi_b-\psi_a$ 从 $v$ 到 $u$ 的增量等于两个袋对同一棱残差的差，$u=v$ 时为零。两边的残差各为三角缺陷的均值。令 $q=1/\max\{|K(a)|,|K(b)|\}$，从两边各减去公共星点的三角缺陷和乘以 $q$。剩余权重均非负，两边各有总权重 $1-|S|q$，故增量的半范数至多为 $2(1-|S|q)\varepsilon$。固定 $u$，对 $v\in S$ 求均值，利用均值为零与 $v=u$ 的零项，再除以 $2$，得到中点相对于 $\psi_a(u)$ 的位移界 $\sigma(a,b)\varepsilon$。

每个顶点若仅在一个袋内，就取该袋平移后的势值。若在两个袋内，由路径上的交集性质，这两个袋必相邻，于是取二者势值的中点。对一条袋内棱，若两端都未共享，保留原残差。若两端在同一个分隔集内，残差就是两袋残差的均值，两项都由 $M(T,K)\varepsilon$ 控制。其余情形中，两端至多各贡献一次位移，且对应不同入射树棱，未共享的端点贡献为零。因此误差至多为 $(1-2/|K(a)|+\tau(a))\varepsilon$。每个权重都在 $[0,1)$ 内，树有限，故 $\tau(a)<2$，从而 $M(T,K)<3$。完整证明由 Lean 内核检查。
:::

**手工推导。** 两项都允许任意大的袋，也都允许袋内的棱连接不同的入射分隔集，可与 [@thm-appe-complete-cliquesum-banach] 中的分离团和条件比较。任意有限 $m\ge1$ 都给出 $R_\ell<1+\ell$（$\ell\ge1$），因为递推中最后一项严格小于 $1+R_\ell$。故第 1 项在 $D\le5$ 时给出严格小于 $3$ 的系数，在 $D\le7$ 时给出严格小于 $4$ 的系数。若 $m\le4$ 且 $D\le19$，用 $m=4$ 的递推作上界，得 $R_9=373533/131072<20/7$，严格低于 [@thm-appe-multitier-universal-banach] 的一般 $4$-树上界。第 2 项在每个顶点至多属于两个袋时，对任意直径都给出 $M(T,K)<3$。团大小不受限时的精确通用常数见 [@thm-appe-chordal-banach-sharp-four]。$C_{\mathrm{SU}(2)}(K_4)$ 在 $[c_*,4/5]$ 内的精确值仍是开放问题。见 [@prob-appe-round-quaternion-k4-optimal-constant]。

给前驱与团袋中的星势加权，可以分别利用旧残差的抵消和相邻团袋的共同权重来控制重构误差。

::: {.theorem #thm-appe-weighted-simplicial-and-occurrence-banach title="加权单纯消元与团树出现子树中心的 Banach 势界" lean="D5/S3/Combinatorics/Graph/Chordal/WeightedSimplicialBanachPotential.SimpleGraph.IsChordal.exists_weighted_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/WeightedSimplicialBanachPotential.SimpleGraph.cliqueTree_occurrenceCenter_banach_potential"}
两款均取任意实半范数向量空间 $E$、实数 $\varepsilon\ge0$ 和增益 $g:V\times V\to E$。对所有 $x,y\in V$，有 $g(y,x)=-g(x,y)$。当 $xy,yz,xz$ 都是 $G$ 的边时，有 $\|g(x,y)+g(y,z)-g(x,z)\|\le\varepsilon$。势 $\varphi:V\to E$ 在有向邻接对 $(u,v)$ 上的残差为 $g(u,v)-(\varphi(v)-\varphi(u))$。

1. **有界团大小弦图的加权单纯消元。** 设 $G$ 是有限顶点集 $V$ 上的简单弦图，$k\in\mathbb N$ 且 $k\ge2$，并且 $G$ 的每个团至多有 $k+1$ 个顶点。则存在势 $\varphi$，使 $G$ 的每条有向边上的残差半范数至多为

   $$
   R_k\varepsilon,\qquad R_k=\max\left\{k-2,\frac{k-1+\sqrt{(k+3)^2-16}}{4}\right\}.
   $$

2. **加权团树的出现子树中心。** 设 $V,I$ 为有限集，$G$ 是 $V$ 上的简单图，$(T,K)$ 是 $G$ 在指标集 $I$ 上的团树，团袋为 $K(a)\subseteq V$，团树的定义见 [@thm-appe-cliquetree-banach-potential]。每条树边 $ab$ 的分隔集 $S_{ab}=K(a)\cap K(b)$ 非空。对每个 $a\in I$，取支撑于 $K(a)$ 的概率分布 $\pi_a:V\to\mathbb R_{\ge0}$，即在 $K(a)$ 外取零且 $\sum_{x\in V}\pi_a(x)=1$。取实数 $\alpha,d$，其中 $d\ge0$，并满足以下条件。

   $$
   \begin{aligned}
   1-\pi_a(x)-\pi_a(y)&\le\alpha &&\text{若 }x,y\in K(a)\text{ 且 }xy\text{ 是 }G\text{ 的边},\\
   \left(1-\frac1{|S_{ab}|}\right)\left(1-\sum_{x\in S_{ab}}\min\{\pi_a(x),\pi_b(x)\}\right)&\le d &&\text{若 }ab\text{ 是 }T\text{ 的边}.
   \end{aligned}
   $$

   设 $D\in\mathbb N$，且对每个 $x\in V$ 和任意两个含 $x$ 的团袋 $K(a),K(b)$，有 $\operatorname{dist}_T(a,b)\le D$。则存在势 $\varphi$，使每条有向边上的残差半范数至多为 $\bigl(\alpha+4\lfloor(D+1)/2\rfloor d\bigr)\varepsilon$。若 $D\le1$，同一势在每条有向边上的残差半范数也至多为 $(\alpha+2d)\varepsilon$。
:::

::: {.proof #pf-appe-weighted-simplicial-and-occurrence-banach}
**加权消元。** 反转由狄拉克定理逐次得到的单纯顶点删除顺序。每个顶点 $v$ 的前驱邻点集 $S_v$ 是团，加入 $v$ 后仍是团，故 $|S_v|\le k$。令 $R=R_k$、$s=1/(1+R)$、$t=1-(k-1)s$。由 $(k+3)^2-16\le9(k-1)^2$ 可得 $k-2\le R\le k-1$，从而 $0\le t\le s$。令 $\varphi(v)$ 为候选值 $\varphi(w)+g(w,v)$ 的加权平均。若 $0<|S_v|<k$，取均匀权重。若 $|S_v|=k$，给排序最靠后的前驱权重 $t$，其余权重均为 $s$。若无前驱，取 $\varphi(v)=0$。记权重为 $w_v(w)$，残差为 $r_{w,v}$。加权平均给出恒等式 $\sum_{w\in S_v}w_v(w)r_{w,v}=0$，后续各步不会改变这些残差。

对 $x\in S_v$，将其候选值减去平均值，得到 $r_{x,v}$。其中 $w=x$ 的项为零，其余各项是旧残差 $r_{x,w}$ 与三角缺陷 $g(x,v)-g(x,w)-g(w,v)$ 之和。若 $x$ 的权重至少为 $s$，这些项的总权重至多为 $1-s$，归纳界给出 $(1-s)(R+1)\varepsilon=R\varepsilon$。这涵盖了均匀情形，因为 $|S_v|\le k-1\le1+R$。

若 $|S_v|=k$ 且 $x$ 是排序最靠后的前驱，则 $A=S_v\setminus\{x\}\subseteq S_x$ 且 $|A|=k-1$。由反对称性，$x$ 的零和恒等式也适用于反向残差 $r_{x,w}$。若 $A=S_x$，均匀权重使 $\sum_{w\in A}s r_{x,w}=0$。否则 $S_x=A\cup\{z\}$，记 $S_x$ 中排序最靠后的顶点为 $b$。从 $\sum_{w\in A}s r_{x,w}$ 减去 $x$ 的加权零和，余下 $(s-t)r_{x,b}-s r_{x,z}$，其半范数至多为 $(2s-t)R\varepsilon$。三角缺陷贡献至多 $(k-1)s\varepsilon$。$R_k$ 的根式项是 $2R^2-(k-1)R-(k-1)=0$ 的正根，取最大值便有 $2R^2-(k-1)R-(k-1)\ge0$。代入 $s,t$，这正是 $(k-1)s+(2s-t)R\le R$，归纳完成。

**出现子树中心。** 取加权星势 $p_a(v)=\sum_{x\in K(a)}\pi_a(x)g(x,v)$。团袋内的边残差是三角缺陷的加权平均，两端点的项为零，故残差半范数至多为 $\alpha\varepsilon$。用树上平移构造 `tree_offsets` 从根出发，沿每条边累加 $p_a-p_b$ 在 $S_{ab}$ 上的平均值，得到平移后的势 $\psi_a$，使 $\psi_b-\psi_a$ 在每个 $S_{ab}$ 上均值为零。

令 $M=1-\sum_{x\in S_{ab}}\min\{\pi_a(x),\pi_b(x)\}$。在 $S_{ab}$ 内两点之间，$\psi_b-\psi_a$ 的增量是两个局部残差之差。从两组权重中各减去共同权重后，每组只余非负质量 $M$，所以增量的半范数至多为 $2M\varepsilon$。固定一端，对分隔集中的另一端取平均。由零均值条件，该平均等于固定端的势差，而两端重合时增量为零。因此共有顶点处的势差半范数至多为 $2(1-1/|S_{ab}|)M\varepsilon\le2d\varepsilon$。

含顶点 $v$ 的团袋构成子树。取其最长路径的一个中间顶点为中心。任一分支到该路径的距离不超过接点到两端的较短距离，否则可延长最长路径。因此中心到任一团袋的距离至多为 $\lfloor(D+1)/2\rfloor$。取 $\varphi(v)$ 为中心处的平移后势值。每条边都在某个团袋内，从该团袋沿出现子树到各端点的中心逐步累加势差，两端合计增加至多 $4\lfloor(D+1)/2\rfloor d\varepsilon$ 的误差。

当 $D\le1$ 时，一个顶点至多出现在两个团袋内，因为三个两两邻接的团袋会成环。只有一个团袋就取其势值，有两个便取中点。每个端点相对边所在团袋的改变量至多为 $d\varepsilon$，从而给出 $(\alpha+2d)\varepsilon$。当 $D=0$ 时两端都无需移动，得到 $\alpha\varepsilon$。当 $D=1$ 时，中点界也蕴含一般界。完整证明由 Lean 内核检查。
:::

第 1 款给出 $R_2=1$ 及 $R_3=(1+\sqrt5)/2<5/3<2$，因而所有团大小至多为 $4$ 的弦图（包括所有 $3$-树）都有低于 $2$ 的统一系数。$R_4=(3+\sqrt{33})/4<7/3<20/7$，严格改进了 [@thm-appe-multitier-universal-banach] 中所有 $4$-树的界。$R_5=3<40/13$ 适用于团大小至多为 $6$ 的所有弦图。

第 2 款的下列推论允许任意团大小与团树直径，各团袋均须非空。若 $D\le2$ 且团树最大度数至多为 $3$，可取严格小于 $11/3$ 的系数。若 $D\le1$ 且最大度数至多为 $2$，可取严格小于 $2$ 的系数。若 $D\le2$ 且每条树边满足 $\max\{|K(a)|,|K(b)|\}\le c|S_{ab}|$（$c\ge1$），可取系数 $5-4/c$，在 $c=2$ 时为 $3$，在 $c=4/3$ 时为 $2$。

在 [@thm-appe-weighted-simplicial-and-occurrence-banach] 的加权消去中，旧残差之差可借旧三角形来估计。若一个保留的恒等式还不足以控制误差，再用一个恒等式消去最新前驱的贡献。

::: {.theorem #thm-appe-multi-identity-simplicial-banach title="多个保留恒等式给出的单纯消去 Banach 势界" lean="D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_regrouped_simplicial_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_multiIdentity_cliqueSix_banach_gain_potential, D5/S3/Combinatorics/Graph/Chordal/MultiIdentitySimplicialBanach.SimpleGraph.IsChordal.exists_multiIdentity_cliqueSeven_banach_gain_potential"}
设 $G$ 是有限顶点集 $V$ 上的简单弦图，$E$ 是实半赋范向量空间。取 $g:V\times V\to E$ 和实数 $\varepsilon\ge0$。假设对所有 $x,y\in V$ 有 $g(y,x)=-g(x,y)$，且每当 $xy,yz,xz$ 都是 $G$ 的边时，有 $\|g(x,y)+g(y,z)-g(x,z)\|\le\varepsilon$。以下各款分别给出一个势 $\varphi:V\to E$，使每对相邻顶点 $(u,v)$ 的残差半范数 $\|g(u,v)-(\varphi(v)-\varphi(u))\|$ 满足所述界。

1. **利用旧三角形重组。** 设 $k\in\mathbb N$，$k\ge2$，且 $G$ 的每个团 $C$ 都满足 $|C|\le k+1$。对任意满足 $\max\{1,k-2\}\le R\le k-1$ 和 $2(k-1)\le R(R+1)$ 的实数 $R$，残差半范数至多为 $R\varepsilon$。
2. **团大小至多为 $6$。** 若 $G$ 的每个团至多有 $6$ 个顶点，残差半范数至多为 $(2\sqrt3-1)\varepsilon$。
3. **团大小至多为 $7$。** 若 $G$ 的每个团至多有 $7$ 个顶点，残差半范数至多为 $\frac{3+\sqrt7}{2}\varepsilon$。
:::

::: {.proof #pf-appe-multi-identity-simplicial-banach}
将完美消去序逆转，得到逐个插入顶点的顺序（完美消去序由弦图的消去定理给出）。记 $P_v$ 为 $v$ 的前驱，即已经插入且与 $v$ 相邻的顶点。$P_v$ 连同 $v$ 构成团。若 $P_v$ 为空，取 $\varphi(v)=0$。否则取候选值 $\varphi(x)+g(x,v)$ 的加权平均，权重 $w_v(x)\ge0$ 在 $P_v$ 上之和为 $1$。记 $r_{xy}=g(x,y)-(\varphi(y)-\varphi(x))$、$\delta_{xyz}=g(x,y)+g(y,z)-g(x,z)$。平均式给出恒等式 $\sum_{x\in P_v}w_v(x)r_{vx}=0$，以后插入顶点时这条恒等式仍成立。

对 $c\in P_v$，新边残差为 $\sum_{x\in P_v\setminus\{c\}}w_v(x)(r_{cx}-\delta_{cxv})$。其中三角缺陷的加权和至多贡献 $(1-w_v(c))\varepsilon$。已拟合的边满足 $\|r_{xy}\|\le R\varepsilon$。令 $s=1/(R+1)$，当 $w_v(c)\ge s$ 时，直接估计给出 $(1-s)(R+1)\varepsilon=R\varepsilon$。此外，对 $x,y\in P_c$，由 $r_{cx}-r_{cy}=\delta_{cxy}-r_{xy}$ 得 $\|r_{cx}-r_{cy}\|\le (R+1)\varepsilon$，重合时差为零。

**第 1 款。** 前驱不足 $k$ 个时取均匀权重，因 $|P_v|\le k-1\le R+1$，可用直接估计。恰有 $k$ 个前驱时，最新的前驱权重为 $t=1-(k-1)s$，其余为 $s$，且 $0\le t\le s$。只需处理最新前驱 $c$ 的边。其余 $k-1$ 个前驱组成 $A=P_v\setminus\{c\}\subseteq P_c$。若 $P_c=A$，由 $c$ 处的均匀权重恒等式，旧残差之和为零，只余至多 $(1-t)\varepsilon\le R\varepsilon$ 的三角缺陷。若 $P_c=A\cup\{z\}$，记 $b$ 为 $P_c$ 中最新的顶点。减去 $c$ 处的恒等式后，旧残差和化为 $(s-t)(r_{cb}-r_{cz})-t r_{cz}$。旧三角形给出的差界将总误差控制在 $\bigl((s-t)(R+1)+tR+1-t\bigr)\varepsilon$ 以内。括号内等于 $2(k-1)s$，由二次不等式可知它至多为 $R$。

**第 2、3 款。** 此时前驱数上限 $k$ 分别为 $5$ 和 $6$。至多有 $3$ 个前驱时取均匀权重。否则按插入顺序给权 $s,s,s,t,0,\ldots$，其中 $t=1-3s$。这两款的 $R\ge2$，且 $1/4\le s\le1/3$，故 $0\le t\le s$。权重至少为 $s$ 的边可直接估计。其余边的旧残差和仅涉及 $c$ 之前的顶点。将这些顶点的权重延拓到 $Q=P_c$，其余位置补零，记所得权重为 $b_x$。令 $\mu=1-w_v(c)$。减去 $\mu$ 倍的保留恒等式后，旧残差和变为 $\sum_{x\in Q}h_xr_{cx}$，其中 $h_x=b_x-\mu w_c(x)$，且 $\sum_{x\in Q}h_x=0$。将正系数与负系数按质量配对，若总负质量为 $M=\sum_{x\in Q}\max\{-h_x,0\}$，则旧残差和的半范数至多为 $M(R+1)\varepsilon$。例如 $M>0$ 时，每对正负系数 $h_x,h_y$ 分配质量 $h_x(-h_y)/M$，再对残差差取三角不等式。若 $M=0$，和为零。

在例外情形，$Q$ 中最新的顶点 $a$ 有系数 $\lambda=h_a\ge0$，而 $Q\setminus\{a\}\subseteq P_a$。用 $a$ 处的恒等式将 $\lambda r_{ca}$ 写成以 $\lambda w_a(x)$ 加权的 $r_{ca}+r_{ax}$ 之和。对共有前驱 $x\in Q\cap P_a$，换成 $r_{cx}$ 只需付出一项三角缺陷。对额外前驱 $x\in P_a\setminus Q$，保留辅助向量 $r_{ca}+r_{ax}$。它与任一负系数位置 $y$ 的 $r_{cy}$ 之差为 $(r_{ax}-r_{ay})+\delta_{cay}$，比通常的配对界多至多 $\varepsilon$。对共有和额外前驱合计，这些额外代价至多为 $\lambda\varepsilon$，因为 $w_a$ 的和为 $1$。重新配对后，若负质量为 $M$，加入新三角形的代价，归纳所需的不等式为 $M+s(\mu+\lambda)\le1-s$。无需第二个恒等式时取 $\lambda=0$。

这个不等式可直接按位置核算。将 $Q$ 的位置从 $0$ 开始编号，记 $d=|Q|$，$T$ 为保留当前权重的位置集合，即 $P_v$ 中早于 $c$ 的顶点在 $Q$ 中的位置，$j=|T|$。只需检查 $3\le j\le d\le k$、$j<k$。在 $T$ 上依次取 $b_x=s,s,s,t,0,\ldots$。仅在下列情形消去最后一个位置 $d-1$。

- $d=k=5$、$j=3$ 且 $3,4\in T$。
- $d=k=6$，且 $j=3$、$4,5\in T$，或 $j=4$ 且 $T$ 恰含 $0,1,2$ 中的一个位置。

消去时，$P_a$ 至多比 $Q\setminus\{a\}$ 多一个顶点。因权重随位置不增，估算负质量时可将每个留下的位置按向后移一位计算其获得的权重。即将位置 $i<d-1$ 的系数替换为 $h_i+\lambda w_{i+1}$，其中 $w_{i+1}$ 是 $Q$ 的第 $i+1$ 位权重，再把最后一位系数置零。逐一代入 $T\subseteq\{0,\ldots,d-1\}$，下表给出 $M+s(\mu+\lambda)$ 的上界。各行的值按 $j$ 从小到大排列。

| $k$ | 一次恒等式 | 两次恒等式 |
| --- | --- | --- |
| $5$ | $3s-3s^2$, $2s$ | $12s^2-s$ |
| $6$ | $9s^2$, $1-s$, $2s$ | $3s^2+2s$, $3s-t^2$ |

第 2 款取 $s=1/(2\sqrt3)$，满足 $12s^2=1$。第 3 款取 $s=(5-\sqrt7)/9$，满足 $9s^2-10s+2=0$。代入可得各项均至多为 $1-s$。这样每次插入都保持边残差界，反向边也由反对称性满足同一界。完整证明由 Lean 内核检查。
:::

记 $\omega(G)$ 为最大团的顶点数。在 $\omega(G)\le4$ 时，第 1 款给出旧的 $R=(\sqrt{17}-1)/2\approx1.5616$ 上界。对所有满足 $\omega(G)\le4$ 的有限弦图，[@thm-appe-three-tree-clique-four-bracket] 给出 $\frac43\le S_4\le\frac{72537}{50000}=1.45074<\frac32$。在 $\omega(G)\le5$ 时可取 $R=2<(3+\sqrt{33})/4$，因而所有 $4$-树都有 $2\varepsilon$ 的统一上界。第 2 款在 $\omega(G)\le6$ 时给出 $2\sqrt3-1\approx2.4641<3$，改进了前述界。第 3 款在 $\omega(G)\le7$ 时给出 $(3+\sqrt7)/2\approx2.8229<3$，因而所有 $6$-树都有严格小于 $3$ 的统一系数。

团大小不受限时，最优实 Banach 统一系数恰为 $4$，双不变伪度量群的最优统一系数亦为 $4$，见 [@thm-appe-chordal-banach-sharp-four]。支配团条件下的可选上界 $3$ 仍需形式化依据。圆度量 $\mathrm{SU}(2)$ 的弦图通用常数与等式 $C_{\mathrm{SU}(2)}(K_4)=c_*$ 的全局 Lean 形式化仍待完成。见 [@prob-appe-round-quaternion-k4-optimal-constant]。

接下来固定非线性目标群，考察完全图上的最优系数。

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

让三条有向外缘棱保持相同增益，只改变共同的转角，就可以逐角度求出精确的拟合半径，并确定四分之一转为何给出最大的比值。

::: {.theorem #thm-appe-round-quaternion-equal-rim-minimax title="循环等增益外缘的精确极小极大半径与四分之一转的唯一极大比值" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionEqualRimMinimax.RoundQuaternionEqualRimMinimax.equalRim_exact_defect_and_minimax, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionEqualRimMinimax.RoundQuaternionEqualRimMinimax.equalRim_ratio_unique_maximum_at_quarter_turn"}
在 $K_4$ 的顶点集 $\mathrm{Fin}(4)=\{0,1,2,3\}$ 上考虑取值于实单位四元数群 $S=\operatorname{unitary}\mathbb H$ 的增益。群 $S$ 取圆距离 $d(p,q)=\arccos\langle p,q\rangle_{\mathbb R}$。令 $I\in\mathbb H$ 满足 $\operatorname{Re}I=0$ 和 $\|I\|=1$。对 $a\in[0,\pi]$，记 $G(I,a)=(g_{ij})$ 为如下增益分配。对角与中心 $0$ 的辐棱增益均为 $1$，有向外缘 $(1,2),(2,3),(3,1)$ 的增益均为 $A=\cos a+I\sin a$，反向外缘的增益为 $A^{-1}$。

称增益的三角缺陷至多为 $\varepsilon$，是指 $g_{ji}=g_{ij}^{-1}$、$g_{ii}=1$，且对所有两两不同的 $i,j,k$ 都有 $d(g_{ij}g_{jk},g_{ik})\le\varepsilon$。称势 $\varphi:\mathrm{Fin}(4)\to S$ 在半径 $r$ 内拟合增益，是指每条有向棱 $i\ne j$ 都满足 $d(g_{ij},\varphi_i^{-1}\varphi_j)\le r$。

当 $0\le a\le\pi/3$ 时，定义 $e(a)=3a$。当 $\pi/3<a\le\pi/2$ 时，定义 $e(a)=2\pi-3a$。当 $\pi/2<a\le\pi$ 时，定义 $e(a)=a$。当 $0\le a\le\pi/3$ 时，令 $R(a)=a$。当 $\pi/3<a\le\pi$ 时，令 $R(a)=\arccos t(a)$，其中 $t(a)$ 是下列方程的唯一正根，$\lambda(a)=\cos(a-2\pi/3)$。

$$
(\lambda(a)-\cos a)t^2+t-\lambda(a)=0.
$$

1. **精确三角缺陷与极小极大半径。** 对每个上述 $I$ 和每个 $a\in[0,\pi]$，$G(I,a)$ 的三角缺陷至多为 $e(a)$。对每个实数 $\varepsilon$，若其三角缺陷至多为 $\varepsilon$，则 $e(a)\le\varepsilon$。存在势 $\varphi:\mathrm{Fin}(4)\to S$ 在半径 $R(a)$ 内拟合 $G(I,a)$。对任意势 $\varphi:\mathrm{Fin}(4)\to S$ 与实数 $r$，若 $\varphi$ 在半径 $r$ 内拟合 $G(I,a)$，则 $R(a)\le r$。
2. **四分之一转处唯一取等。** 对所有 $a\in(0,\pi]$，有 $R(a)/e(a)\le c_*=\frac{2}{\pi}\arccos(1/\sqrt3)$，且等号当且仅当 $a=\pi/2$。
:::

::: {.proof #pf-appe-round-quaternion-equal-rim-minimax}
由 $I^2=-1$，含中心的三角形与外缘三角形的闭路增益分别为 $A^{\pm1}$ 与 $A^{\pm3}$。左右乘单位四元数均保距，故其缺陷分别为 $a$ 与 $\arccos(\cos(3a))$。两者都出现，取较大值并将角度折回 $[0,\pi]$，即得三段式 $e(a)$。

把势同时左乘 $\varphi_0^{-1}$，使中心势为 $1$，所有相对势 $\varphi_i^{-1}\varphi_j$ 不变。记外缘势为 $x_i$，下标按外缘循环。若拟合半径 $r<\pi/2$，令 $u=\cos r>0$。由于 $r\ge0$，三条辐棱给出 $u\le\langle 1,m\rangle_{\mathbb R}\le\|m\|\le1$，其中 $m=(x_1+x_2+x_3)/3$。沿每条外缘棱左乘起点势，得 $u\le\langle x_i A,x_{i+1}\rangle_{\mathbb R}$。

写 $x_i=m+y_i$，则 $\sum_i y_i=0$，$\sum_i\|y_i\|^2=3(1-\|m\|^2)$。在零和子空间取正交坐标 $E=(y_1-y_2)/\sqrt2$、$H=(y_1+y_2-2y_3)/\sqrt6$，故 $\|E\|^2+\|H\|^2=\sum_i\|y_i\|^2$。循环对称和 $\sum_i\langle x_i,x_{i+1}\rangle_{\mathbb R}$ 等于 $3\|m\|^2-\tfrac12\sum_i\|y_i\|^2$。右乘 $I$ 是斜对称等距变换，故循环斜对称和 $\sum_i\langle x_i I,x_{i+1}\rangle_{\mathbb R}=\sqrt3\langle EI,H\rangle_{\mathbb R}$，至多为 $\tfrac{\sqrt3}{2}(\|E\|^2+\|H\|^2)$。于是由 $\sin a\ge0$ 与 $\lambda(a)=-\cos a/2+(\sqrt3/2)\sin a$ 得

$$
u\le\frac13\sum_i\langle x_i A,x_{i+1}\rangle_{\mathbb R} \le\cos a\,\|m\|^2+\lambda(a)(1-\|m\|^2).
$$

差值 $\lambda(a)-\cos a=\sqrt3\sin(a-\pi/3)$ 在 $a\le\pi/3$ 时非正，故 $u\le\cos a$。取恒为 $1$ 的势即达到半径 $a$。当 $a>\pi/3$ 时，记 $D=\lambda(a)-\cos a>0$。由 $\|m\|\ge u$ 得 $Du^2+u\le\lambda(a)$。多项式 $Dt^2+t-\lambda(a)$ 在 $[0,\infty)$ 严格递增，且在 $0$ 处为 $-\lambda(a)<0$（因为 $|a-2\pi/3|\le\pi/3$），在 $1$ 处为 $1-\cos a>0$，故 $u\le t(a)<1$。余弦在 $[0,\pi]$ 递减，给出所需的半径下界。两种情形均有 $R(a)\le\pi/2$，所以 $r\ge\pi/2$ 时下界也成立。

取垂直于 $1,I$ 的单位四元数 $J$，在 $J,JI$ 张成的平面内取 $v_i=J(\cos b_i+I\sin b_i)$，其中 $b_i$ 依次为 $0,2\pi/3,4\pi/3$。取中心势为 $1$、外缘势为 $x_i=t+\sqrt{1-t^2}\,v_i$。辐棱的余弦为 $t$。右乘 $A$ 将平面内的角度增加 $a$，故外缘余弦均为 $\cos a\,t^2+\lambda(a)(1-t^2)$。取 $t=t(a)$，两种余弦相等，达到半径 $R(a)$。反向棱的误差由取逆保距而相同。

当 $0<a\le\pi/3$ 时，比值为 $1/3$。当 $a>\pi/3$ 时，在同一构造中取固定纬度 $q=1/\sqrt3$。外缘余弦化为 $q\sin a\le q$，故 $R(a)\le f(s)=\arccos(q\cos s)$，其中 $s=|a-\pi/2|$。在 $[0,\pi/2]$ 上，$f''(s)=q(1-q^2)\cos s/(1-q^2\cos^2 s)^{3/2}\ge0$。两端点的割线给出 $f(s)\le f(0)+(1-c_*)s$。又 $e(a)\ge\pi/2+s$，且 $c_*=2f(0)/\pi>1/2$，因为 $q<\cos(\pi/4)$。因此 $s>0$ 时，

$$
R(a)\le f(s)\le f(0)+(1-c_*)s<c_*(\pi/2+s)\le c_*e(a).
$$

在 $a=\pi/2$ 时，辐棱与外缘的余弦在纬度 $q$ 处相等，故 $q=t(\pi/2)$。于是 $R(\pi/2)=f(0)$、$e(\pi/2)=\pi/2$，比值恰为 $c_*$。完整证明由 Lean 内核检查。
:::

当三条外缘棱可以独立偏转时，仍可用四分之一转的最优势作为起点。把横向偏移分成两个循环傅里叶模态，就能构造一组顶点势，并定量控制每条棱的拟合误差。

::: {.theorem #thm-appe-round-quaternion-local-sharpness title="循环四分之一转的严格局部锐性与加权方差角域" lean="D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionLocalSharpness.RoundQuaternionLocalSharpness.quarterLocal_strictFit, D5/S3/Combinatorics/Graph/Chordal/RoundQuaternionLocalSharpness.RoundQuaternionLocalSharpness.quarterLocal_angularRegion"}
令 $c_*=\frac{2}{\pi}\arccos(1/\sqrt3)$。在 $K_4$ 上，将对角增益与顶点 $0$ 的辐棱增益取为 $1$，将有向外缘 $12,23,31$ 的增益依次取为单位四元数 $A_0,A_1,A_2$，反向外缘取逆元。对所得增益分配 $g$，外缘下标为 $j\in\{0,1,2\}$，记 $e=\max\{\max_j d(1,A_j),\,d(A_0A_1A_2,1)\}$.

以下两种情形中，所有有序三角形（顶点两两不同）的缺陷 $d(g_{ij}g_{jk},g_{ik})$ 都至多为 $e$，且至少一个达到 $e$。拟合半径按上文的圆距离定义。

1. **复数对傅里叶坐标中的严格定量拟合。** 在复数对坐标 $(z,h)\mapsto z+hJ$ 中，设 $A_j=(-\eta_j+i\gamma_j,w_j)$，其中 $\eta_j,\gamma_j\in\mathbb R$，$\gamma_j=\sqrt{1-\eta_j^2-|w_j|^2}>0$，$w_j=p\zeta^j+q\zeta^{-j}$，$p,q\in\mathbb C$，$\zeta=(-1+i\sqrt3)/2$。置 $E=\max_j|\eta_j|$，并设 $\max\{|p|,|q|,E\}\le3/50$。下文构造的相位归一化势 $\varphi=P(p,q)$ 在每条有向棱 $i\ne j$ 上满足

   $$
   \langle g_{ij},\varphi_i^{-1}\varphi_j\rangle_{\mathbb R}\ge\cos(c_*e)+\frac{|q|}{200}+\frac{3}{100}(|p|^2+E).
   $$

   势 $\varphi$ 在半径 $c_*e$ 内拟合 $g$。若 $(p,q,\eta)\ne(0,0,0)$，则存在实数 $R<c_*e$，使同一个 $\varphi$ 在半径 $R$ 内仍拟合 $g$。若 $(p,q,\eta)=(0,0,0)$，则任意势都无法在任何实数半径 $R<c_*e$ 内拟合 $g$。

2. **加权方差角域。** 在基 $1,I,J,IJ$ 下，设外缘增益为

   $$
   \begin{aligned}
   A_0&=(\cos a,\sin a,0,0),\\
   A_1&=(\cos b,\sin b\cos u,\sin b\sin u,0),\\
   A_2&=(\cos c,\sin c\cos v,\sin c\sin v\cos w,\sin c\sin v\sin w).
   \end{aligned}
   $$

   各角均以弧度计，方位角 $w\in\mathbb R$ 任意。设 $u,v\ge0$、$u+v<\pi/2$，以及 $\max\{|a-\pi/2|,|b-\pi/2|,|c-\pi/2|\}\le17\pi/900$、$u^2+v^2+(u+v)^2\le(4497/500)(3/50)^2$。

   存在势 $\varphi$ 在半径 $c_*e$ 内拟合 $g$，且若 $(a,b,c,u,v)\ne(\pi/2,\pi/2,\pi/2,0,0)$，则存在实数 $R<c_*e$，使这个 $\varphi$ 在半径 $R$ 内仍拟合 $g$。在中心 $(a,b,c,u,v)=(\pi/2,\pi/2,\pi/2,0,0)$，任意势都无法在任何实数半径 $R<c_*e$ 内拟合 $g$。
:::

::: {.proof #pf-appe-round-quaternion-local-sharpness}
含顶点 $0$ 的三角形与外缘三角形分别给出 $d(1,A_j)$ 与 $d(A_0A_1A_2,1)$。圆距离在左右乘与取逆下不变，故循环移位和反转不改变缺陷。这四个值覆盖所有有序三角形，且每个都由一个三角形取得。

对第 1 款，令 $\ell=\exp(-i\arg(q(\zeta-1))/2)$，其中 $q=0$ 时取 $\ell=1$。以 $(\ell,0)$ 共轭，绕 $I$ 轴旋转，将 $p,q$ 同乘 $\ell^2$，使旋转后的 $q(\zeta-1)=\sqrt3\,|q|$。以下用 $p,q$ 表示旋转后的模态。置 $t=1/\sqrt3$、$\rho=3/50$、$s=\sqrt{2/3}$、$v_j=\zeta^{-j}$，外缘下标按模 $3$ 循环。令 $x=\operatorname{Re}p$、$y=\operatorname{Im}p$，所取的系数为 $F_0=\sqrt3(x^2-y^2)/96+xy/16$, $F_1=\sqrt3(x^2-y^2)/96-xy/16$, $F_2=-\sqrt3(x^2-y^2)/48$, $b_j=\operatorname{Re}(p v_{j-1})/\sqrt6$, $f_j=s(\sqrt3\,b_j+F_j-F_{j-1})$, $U=t+|q|/\sqrt6-(\sqrt3/12)|p|^2$。
中心势为 $1$，顶点 $j+1$ 的势取单位四元数 $X_j=(U+ib_j,\,v_j(\sqrt{1-U^2-b_j^2-f_j^2}+if_j))$。在上述参数界内，根号内非负。共轭同时保持增益与相对势的内积，故逐点作逆共轭即得原坐标下的相位归一化势。

把外缘棱内积写成 $\langle X_jA_j,X_{j+1}\rangle_{\mathbb R}$。先令 $q=0$、$\eta=0$，直接展开得共同的零次与二次项 $t-(\sqrt3/12)|p|^2$，一次项消去，各棱的三次项绝对值至多 $(2/5)|p|^3$。对两个势与一个增益的各次项分别取范数上界，再用 $|p|\le\rho$ 对总次数至少为 $4$ 的乘积求和，所得余项界为 $3|p|^4$。恢复 $q$ 与 $\eta$ 后，相位对准给出共同的一次增益 $Q/\sqrt6$（$Q=|q|$），其余扰动的损失至多 $(627/100)\rho Q+2\rho E$。辐棱的内积就是 $U$，反向棱的内积等于正向棱，故每条有向棱的内积均至少为

$$
t+\frac{Q}{\sqrt6}-\frac{\sqrt3}{12}|p|^2-\frac25|p|^3-3|p|^4-\frac{627}{100}\rho Q-2\rho E.
$$

为比较拟合内积与三角缺陷，记 $D_{jk}=\gamma_j\gamma_k+\operatorname{Re}(\overline{w_j}w_k)$。循环面积恒等式 $\operatorname{Im}(\overline{w_j}w_{j+1})=(\sqrt3/2)(|p|^2-|q|^2)$ 将四元数乘积的实部 $T=\operatorname{Re}(A_0A_1A_2)$ 化为

$$
T=-\eta_0\eta_1\eta_2+\sum_j\eta_j D_{j+1,j+2}-\frac{\sqrt3}{2}\Bigl(\sum_j\gamma_j\Bigr)(|p|^2-|q|^2).
$$

由 $d(1,A_j)=\arccos(-\eta_j)$、$d(A_0A_1A_2,1)=\arccos T$，置 $h=\max\{\max_j\eta_j,-T\}$，便有 $e=\pi/2+\arcsin h$。利用 $\gamma_j=\sqrt{1-\eta_j^2-|w_j|^2}$ 估计上式的乘积与内积，并将 $h\ge\eta_j$ 与 $h\ge-T$ 合用，得到 $|h|<1/5$ 及 $h\ge E/3+(51/120)|p|^2-\tfrac13((13/5)Q^2+25\rho^2 E)$。

令 $\theta_*=\arccos t$、$k=c_*\sqrt{2/3}$。函数 $x\mapsto\cos(\theta_*+c_*\arcsin x)$ 在 $[-1/5,1/5]$ 上凹，故其在零点的切线给出 $\cos(c_*e)\le t-kh$。有理界 $3/5<c_*<61/100$、$496/1000<k<1/2$，连同 $|p|^3\le\rho|p|^2$、$|p|^4\le\rho^2|p|^2$ 和 $Q^2\le\rho Q$，代入上述两项估计，给出余量 $Q/200+(3/100)(|p|^2+E)$。因 $c_*e\in[0,\pi]$ 且圆距离是内积的反余弦，这给出半径 $c_*e$ 的拟合。余量在非零扰动下为正，取同一势在有限条有向棱上的最大误差便得到更小的半径。在零扰动处，外缘三增益均为 $I$，$e=\pi/2$，所需下界由 [@thm-appe-round-quaternion-k4-bounds] 给出。

对第 2 款，记 $\theta=(a,b,c)$，将各增益的虚部写作 $s_j d_j$，其中 $s_j=\sin\theta_j\in[499/500,1]$，$d_j$ 为单位虚四元数。三对方向的弦长分别至多为 $u,v,u+v$。角域条件使 $u+v<1$，所以各方向的两两内积为正，向量 $m=\sum_j s_j d_j$ 与每个 $d_j$ 的内积也为正。以单位四元数共轭，把 $m/\|m\|$ 送到 $I$，则各虚部的 $I$ 分量均为正，标量扰动满足 $|\eta_j|=|\cos\theta_j|\le\rho$。记旋转后的 $d_j$ 在 $J,IJ$ 平面上的投影为复数 $x_j$，则 $w_j=s_jx_j$ 且 $\sum_j s_jx_j=0$。

置 $S=\sum_j s_j$。加权方差恒等式给出 $S\sum_j s_j|x_j|^2=\sum_{j<k}s_js_k|x_j-x_k|^2$。又因 $s_j\le1$，有 $\sum_j|w_j|^2\le\sum_j s_j|x_j|^2$，并且每个 $s_js_k/S\le 1/(2+499/500)$。投影不增加弦长，零和序列 $w_j$ 的三点傅里叶展开只有两个非恒定模态。由帕塞瓦尔恒等式，

$$
3(|p|^2+|q|^2)=\sum_j |w_j|^2\le\frac{u^2+v^2+(u+v)^2}{2+499/500}\le3(3/50)^2.
$$

于是第 1 款适用，共轭保距使同一个势的两项拟合结论都能传回原坐标。若 $p=q=0$ 且 $\eta=0$，则三个轴向角均为 $\pi/2$，且旋转后的三个虚方向都等于 $I$。原方向因而重合，而 $u,v\in[0,\pi/2)$，故 $u=v=0$。在中心处，原增益已经是 [@thm-appe-round-quaternion-k4-bounds] 的循环四分之一转。完整证明由 Lean 内核检查。
:::

**手工推导。** 角域包含整个闭的 $3.4^\circ\times4.2^\circ$ 角度盒，即 $a,b,c$ 各距 $90^\circ$ 至多 $3.4^\circ$，且 $0\le u,v\le4.2^\circ$，方位角 $w$ 任意。角域不等式的左边在该盒上至多为 $6(7\pi/300)^2<\frac{4497}{500}(3/50)^2$。辐棱规范化和共轭均保持比值，故四分之一转类是严格局部极大点。在紧致的规范化增益空间中，取该邻域内部的补集，即得全局等式尚待在 Lean 中处理的紧集。见 [@prob-appe-round-quaternion-k4-optimal-constant]。

::: {.problem #prob-appe-round-quaternion-k4-optimal-constant title="$K_4$ 上圆度量单位四元数增益的最优统一系数"}
记 $C_{\mathrm{SU}(2)}(K_4)$ 为 $K_4$ 上所有正三角缺陷的圆度量单位四元数增益实例中，最小拟合半径与最大三角缺陷之比的上确界。由 [@thm-appe-round-quaternion-k4-bounds] 的统一上界和四分之一转实例得到 $c_*\le C_{\mathrm{SU}(2)}(K_4)\le4/5$。由 [@thm-appe-round-quaternion-equal-rim-minimax]，循环等增益外缘族的最大比值 $c_*$ 仅在四分之一转处取得。[@thm-appe-round-quaternion-local-sharpness] 将这一严格界推广到四分之一转的角度邻域。对任意增益证明 $C_{\mathrm{SU}(2)}(K_4)=c_*$ 仍是开放的形式化问题。
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

对于半比较，返回相位刻画了另一种三点效应。见[曲率从哪里来](appendix-e-s08-s01-s04-curvature.md#sec-appe-curvature-from-half-comparison)。
