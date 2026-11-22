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

**弦图势重构的广度优先 $4\varepsilon$ 一致界（手工推导）。** 沿用 [@thm-appe-chordal-gain-potential-stability] 的增益记号，写 $g_{uv}=g(u,v)$，设 $d$ 为双不变度量。每个连通分支独立处理。长为 $\ell$ 的简单回路遇弦可写成 $(pc^{-1})(cq)$，其中 $p,q$ 为两段路径增益，$c$ 为弦增益。两条短回路的长度和是 $\ell+2$，由三角形起归纳，闭路增益距 $1$ 至多 $(\ell-2)\varepsilon$。一般闭游走删去折返并在重复顶点处分解，同样得到 $(\ell-2)_+\varepsilon$，因为各段的正部系数之和不超过原系数。空路径增益为 $1$，故此界也比较同端点路径。森林沿树路径积累增益即可精确拟合，$\varepsilon=0$ 时闭路界给出精确路径无关性。

固定根 $o$，令 $L_i$ 为广度优先分层。对层数至少 $i\ge1$ 的诱导子图中的连通分支 $C$，记 $N(C)$ 为 $C$ 的外部邻点集，定义其影子为紧邻上一层的邻点集 $S_C=N(C)\cap L_{i-1}$。沿根的最短路可见 $S_C$ 非空。若其中两点不邻接，分别取内部在 $C$ 中和内部在层数至多 $i-2$ 的最短连接路。两条路径都无弦，内部顶点的层数相差至少 $2$，因此也无交叉棱，其并会是诱导长回路。故 $S_C$ 是团，$i=1$ 时只含根。令 $P$ 是包含 $C$ 的上一层分支。对 $i\ge2$，各 $u\in S_C$ 的前驱邻域 $N^-(u)=N(u)\cap L_{i-2}$ 是 $S_P$ 的非空子集。若 $x$ 只在 $N^-(u)$ 中，$y$ 只在 $N^-(w)$ 中，则 $x,u,w,y$ 形成无对角棱的诱导四环。故这些邻域按包含关系嵌套，可从最小者中取与全体 $S_C$ 相邻的锚 $a_C\in S_P$。

取根势 $\phi_o=1$。在深度 $1$ 令 $a_C=o$、$Q_C=1$，深度 $i\ge2$ 令 $Q_C=Q_P g_{a_Pa_C}$。所用棱由父锚性质保证，重合时取 $g_{oo}=1$。对 $v\in C\cap L_i$ 选前驱 $b_v\in S_C$，置 $\phi_v=Q_C g_{a_Cb_v}g_{b_vv}$。深度 $1$ 取 $b_v=o$，根棱精确拟合。同层棱 $uv$ 的误差 $d(\phi_u g_{uv},\phi_v)$ 是闭游走 $a_C,b_u,u,v,b_v,a_C$ 的缺陷，因双不变性可去掉共同前缀。至多 $5$ 步给出 $3\varepsilon$。对跨层棱 $uv$，设 $u\in L_{i-1}$、$v\in L_i$，在 $i\ge2$ 时用 $\widetilde\phi_u=Q_Cg_{a_Cu}$ 作桥。比较 $\phi_u$ 与 $\widetilde\phi_u$ 时用路径 $a_P,b_u,u$ 和 $a_P,a_C,u$，再比较 $\widetilde\phi_u g_{uv}$ 与 $\phi_v$ 时用 $a_C,u,v$ 和 $a_C,b_v,v$。每次比较的闭游走均至多 $4$ 步，合得 $4\varepsilon$。重合路段直接略去，所有棱都已覆盖。

对图 $(V,E)$ 和双不变度量群 $H$ 中的增益，定义重构误差为 $\inf_{\phi:V\to H}\max_{uv\in E}d(g_{uv},\phi_u^{-1}\phi_v)$。一般度量群中的下确界未必可取到。约定空棱集或空回路集上的最大值为 $0$。记 $C(n)$ 为所有 $n$ 点弦图、双不变度量群及三角缺陷至多为 $\varepsilon>0$ 的增益实例上，重构误差与 $\varepsilon$ 之比的上确界。以下团树论证给出小阶结果。团树的节点是极大团，包含任一点的团连成子树。由单纯顶点消去归纳可构造这样的树。重插顶点时，其邻团若为极大团就将它扩张，否则将新团接到包含邻团的团上。以团中一点 $a$ 为锚，用 $\phi_x=\phi_a g_{ax}$ 可在该团内达到 $\varepsilon$。向子团延拓时，任选分隔团中的锚，新点之间仍在 $\varepsilon$ 内，分隔团到新点的误差至多在旧界上增加 $\varepsilon$。分隔团只有一点时旧界不增加。分隔团为 $\{a,b\}$ 时取 $\phi_x=\phi_b g_{ba}g_{ax}$。此时 $ax$ 的误差等于旧棱 $ab$ 的误差，$bx$ 和新点之间的误差由三角条件控制在 $\varepsilon$ 内。

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

**Banach 值增益反例。** 考虑宽度为 $3$ 的 $12$ 点弦路径。顶点为 $0,\ldots,11$，棱满足 $1\le |i-j|\le3$。按递增顺序消去顶点时，每点的后继邻点构成团。取实循环空间，范数为填充该循环的有向三角边界系数绝对值之和的最小值。弦分解保证张成，故这是有限维 Banach 空间中的商范数。三角边界范数为 $1$，因为任一棱坐标绝对值至多为填充的系数总量。仍取 $g_{ij}=p_i+[ij]-p_j$，则三角缺陷为 $1$。

在以第一个顶点为根的字典序生成树上同时给棱权 $F,G$ 赋零。该树依次扫描升序棱，只接通尚分离的分支。按字典序将非树棱每 $3$ 条一组，末组可以不足。第 $k$ 组从 $k=1$ 起计，组内的棱权值对依次为 $(-1)^{k+1}k$ 乘以 $(8,-7),(8,-1),(0,7)$。沿棱线性求和定义循环空间上的泛函 $F,G$。下表列出它们对 $t_{i,i+a,i+a+b}$ 的取值，从 $i=0$ 起读取，重复行读满 $9$ 项。

| $(a,b)$ | $(F,G)$ 的值 |
| --- | --- |
| $(1,1)$ | $(8,-7)$、$(0,1)$、$(0,-5)$、$(8,-5)$、$(0,3)$、$(0,-3)$、$(8,-3)$、$(0,5)$、$(0,-1)$、$(8,-1)$ |
| $(1,2)$ | 循环取 $(8,-1)$、$(-8,7)$、$(0,-7)$ |
| $(2,1)$ | 循环取 $(0,7)$、$(-8,1)$、$(8,-7)$ |

由表中各三角的取值，$F,G,F+G$ 的对偶范数分别至多为 $8,7,7$。令 $A,B,C$ 分别为路径 $(0,1,4,7,10,11)$、$(0,2,5,8,11)$、$(0,3,6,9,11)$ 的有向链。沿路径相加，得 $F(A-C)=56$、$G(B-C)=42$。

对任何势，设 $R(A),R(B),R(C)$ 是沿这三条路径的残差和。取差时同端点的势差与树链同时消去，故 $F(R(A))+G(R(B))-(F+G)(R(C))=56+42=98$。若每棱误差至多 $r$，左边至多 $(5\cdot8+4\cdot7+4\cdot7)r=96r$。于是 $r\ge49/48>1$。

**四顶点图上的 $\mathrm{SU}(2)$ 圆度量反例。** 四点弦图若无三角形便是森林。若只有一个三角形，可规范化两条辐棱，把余棱写成 $\exp X$，再取势 $1,\exp(-X/3),\exp(X/3)$，三棱误差各为 $|X|/3\le\varepsilon/3$。附着的树棱可精确拟合。剩下的非完全图是两三角形共一棱的菱形图。把一个度数为 $3$ 的顶点取作中心，将辐棱规范化为 $1$。在外缘路径的中间顶点取势 $1$，两端各在 $1$ 与精确拟合相应外缘棱的值之间取最短测地线中点，误差至多 $\varepsilon/2$。

在 $K_4$ 上，令 $g_{0j}=1$，有向外缘 $1\to2\to3\to1$ 的增益均为单位虚四元数 $I$。含中心的三角增益为 $I$ 或其逆，外缘为 $I^3=-I$，均有角缺陷 $\varepsilon=\pi/2$。归一 $\phi_0=1$，写 $q_j=\phi_j$。若拟合半径 $r<\pi/2$，置 $u=\cos r$ 和 $m=(q_1+q_2+q_3)/3$。辐棱内积界给出 $\operatorname{Re}m\ge u$，外缘内积 $\langle q_j I,q_{j+1}\rangle$ 各至少为 $u$。置 $e=(q_2-q_1)/\sqrt2$，$f=(2q_3-q_1-q_2)/\sqrt6$。右乘 $I$ 是斜对称等距变换，故展开循环和得 $\sum_j\langle q_jI,q_{j+1}\rangle=\sqrt3\langle eI,f\rangle$。又 $|e|^2+|f|^2=3(1-|m|^2)$，所以

$$
3u\le\sqrt3\langle eI,f\rangle\le\frac{3\sqrt3}{2}(1-|m|^2)\le\frac{3\sqrt3}{2}(1-u^2).
$$

在 $u\ge0$ 上解此不等式得 $u\le1/\sqrt3$，而 $r\ge\pi/2$ 时半径下界自动成立。取 $u=1/\sqrt3$、$q_j=u+\sqrt{1-u^2}v_j$，其中 $v_j$ 是与 $1,I$ 正交的平面内的单位向量，并令 $v_{j+1}=-v_j/2+(\sqrt3/2)v_jI$。相继三次旋转回到起点，辐棱余弦为 $u$，外缘余弦为 $(1-u^2)\sqrt3/2=u$。于是准确的极小极大误差为 $r=\arccos(1/\sqrt3)$，比值

$$
c_*=\frac{r}{\varepsilon}=\frac{2\arccos(1/\sqrt3)}{\pi}\approx0.60817345.
$$

这个值也是循环族（辐棱增益为 $1$，外缘统一取 $\cos\theta+I\sin\theta$，$0<\theta\le\pi$）的最优比值。为核对最优性，记 $r(\theta)$ 为最小拟合半径，$r_0=\arccos(1/\sqrt3)$。当 $0<\theta\le\pi/3$，恒等势和外缘三角的闭路下界给出 $r(\theta)=\theta$，比值为 $1/3$。当 $\pi/3\le\theta\le\pi/2$，最大缺陷为 $2\pi-3\theta$。设 $\delta=\pi/2-\theta$，各外缘增益只改变距离 $\delta$，故 $r(\theta)\le r_0+\delta$，并由 $3c_*>1$ 得 $\delta>0$ 时比值严格低于 $c_*$。

当 $\pi/2\le\theta\le\pi$，最大缺陷为 $\theta$。置 $a=\cos\theta$、$k=\cos(\theta-2\pi/3)$，最优半径为 $\arccos u_\theta$，其中 $u_\theta$ 是 $F_\theta(u)=k+(a-k)u^2-u$ 在 $(0,1)$ 内的唯一零点。事实上，设拟合的最小余弦为 $u>0$。外缘内积均值的对称部分为 $a(3|m|^2-1)/2$，反对称部分至多为 $(\sqrt3/2)\sin\theta(1-|m|^2)$，故 $u\le k+(a-k)|m|^2\le k+(a-k)u^2$。上文的平面向量构造用 $u_\theta$ 为实部，可使每棱余弦恰为 $u_\theta$。在 $\pi/2\le\theta\le2\pi/3$ 上，$F_\theta(1/\sqrt3)=(\sin\theta-1)/\sqrt3\le0$，故 $u_\theta\le1/\sqrt3$。隐式求导时，$r'(\theta)$ 的分子 $\sin\theta\,u_\theta^2+\sin(\theta-2\pi/3)(1-u_\theta^2)$ 至多为 $u_\theta^2$，分母 $(1+2(k-a)u_\theta)\sqrt{1-u_\theta^2}$ 至少为 $\sqrt{1-u_\theta^2}$，故 $r'(\theta)\le1/\sqrt6<c_*$。在 $2\pi/3\le\theta\le\pi$ 上，$9F_\theta(1/3)=-3\cos\theta+4\sqrt3\sin\theta-3\ge0$，因为该式在此区间凹且端点非负。因此 $r(\theta)\le\arccos(1/3)<4r_0/3$。最后一个不等式可比较 $3\arccos(1/3)$ 与 $4r_0$ 的余弦 $-23/27$ 与 $-7/9$，两角均在 $(\pi,2\pi)$。这些界给出 $\theta>\pi/2$ 时严格较小的比值。

对 $K_4$ 上任意圆度量增益，记 $C_{\mathrm{SU}(2)}(K_4)$ 为重构误差与正三角缺陷之比的上确界。上面的例子给出下界 $c_*$。为得严格上界，将辐棱规范化为 $1$，记三条循环外缘增益为 $A,B,C$，实际缺陷 $\varepsilon$ 是 $A,B,C,ABC$ 到 $1$ 的最大圆距离。若 $0<\varepsilon<\pi/2$，令 $q_0=q_1=1$，令 $q_2,q_3$ 分别是 $(1,A)$、$(1,C^{-1})$ 的最短弧中点。棱 $23$ 之外的误差至多为 $\varepsilon/2$。$q_2B,q_3$ 是两对向量 $(B,AB)$、$(1,C^{-1})$ 的归一化和。对应向量的圆距离至多为 $\varepsilon$，且每个和的欧氏长度至少为 $2\cos(\varepsilon/2)$。用 $|x-y|^2=(|x|-|y|)^2+|x||y||x/|x|-y/|y||^2$ 比较归一化前后的弦长，得棱 $23$ 的误差 $D\le2\arcsin(\tan(\varepsilon/2))<2\varepsilon$。若 $D>\varepsilon/2$，沿最短弧将 $q_2B,q_3$ 各向对方移动 $(D-\varepsilon/2)/3$，并将前者右乘 $B^{-1}$ 更新 $q_2$，于是所有误差至多为 $(D+\varepsilon)/3<\varepsilon$。

若 $\varepsilon=\pi/2$，保持 $q_0=q_1=1$，在与 $1,A$ 都成锐角的开集中选 $q_2$，使 $q_2B$ 不在 $1,C^{-1}$ 的实线性张成空间内。将 $1+C^{-1}$ 加上 $q_2B$ 在该空间正交补上投影的充分大的正倍数，再归一化为 $q_3$，三组内积都为正，故误差均小于 $\pi/2$。若 $\varepsilon>\pi/2$，依次选与此前至多 $3$ 个已输运势正交的单位四元数，误差至多为 $\pi/2$。

最后，缺陷趋零时，在辐棱规范下取切空间对数 $z_{ij}=\log g_{ij}$。三角乘积取对数的一阶项为三个对数之和，故加法三角缺陷至多为 $\varepsilon+O(\varepsilon^2)$。平均 $4$ 个加法星形势得棱误差至多为 $\varepsilon/2+O(\varepsilon^2)$，将势取指数时的二阶误差仍为 $O(\varepsilon^2)$。最小拟合半径和三角缺陷都是连续函数。由于 $c_*>1/2$，上确界在远离零缺陷的紧集上取到，结合逐实例严格界得 $c_*\le C_{\mathrm{SU}(2)}(K_4)<1$。任意增益下的精确值仍开放。此反例在 $n=4,5$ 都超过实标量界 $(n-2)/n$，其中 $n=5$ 时加一个孤立点即可保持原误差。

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
