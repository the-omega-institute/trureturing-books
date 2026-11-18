# E.8 第三点冗余与对合正性：用极小圆弧体微积分归约 H2 与 H3，并改写 H5–H7 的输入 {#sec-appe-third-point-redundancy}

E.7 的总表把 `H2` 记成并列的三项第 1 层条件：正自配对、秩 $2$ 双向量的椭圆负平方、多点格拉姆半正定；`H3` 再要求平行四边形极化。本节用[第 34 章 §34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 的弦—矢高分解重新过一遍这笔账，结论是这四项并不各自独立。在求同读数为实标量的情形，`H2` 的三项可以由两条更原始的条件推出：一条是**第三点冗余**（比较 $x$ 与 $z$ 不因取道第三点 $y$ 而改变），一条是**对合的正性**（非零差异的往返不为零也不为负）。`H3` 的极化一项由第三点冗余加一个正的读数给出。E.8.5 另外给单比特上的 `H5` 换了一种说法：只看两两比较的概率规则里，玻恩律是层析秩最小的那一个。E.8.6 与 E.8.7 用同一套记号检查 `H6` 与 `H7`：演化的可逆、时间连续、生成元与条件化，以及复合系统的参数计数与交换统计。这两小节不加新的条款，只把输入换成只谈比较对象与读数的形状，并用满足全部条款的模型标出边界。E.8.8 把比较用到系综上：每个对象都有对立者时，多点格拉姆半正定等价于“每个系综与自身的平均求同读数不为负”；单比特上的 `H5` 可以换成系综外延性，在 `MODEL` 读法下它是条款 I 用于系综。E.8.9 读一个对象沿时间的比较记录：读数表的秩数出能级，射线矢高始终离开零的对象说明态空间无穷维，这给 `H4` 一个读数判据但不推出它；两个通道合起来才定出轨道上的哈密顿量（`H6`）。

E.8.10–E.8.12 处理台账上剩下的三项输入。E.8.10 把 E.8.1 的矢高表用到 $1+1$ 维观察者之间的比较上：舍去正性条件还选不出洛伦兹签名，还要“重复同一个比较不翻转时间次序”与“求异部分不是零平方”两条，而对同一个比较，正性条件与前一条不能同时成立。E.8.11 给保单位捏合的熵增写出精确恒等式与两侧界。E.8.12 说明二次作用量的有限步路径乘积精确等于驻相公式的主项；一般作用量只剩一维的显式抵消界，连续时间极限是文献结果或输入。E.8.13 回到 `H4` 与 `H7` 中仍写作单纯输入的三项（中心复结构、交换扇区与估值选择），各给一个精确形状，并用满足全部条款的模型说明它们仍是输入。

先说清边界。这两条条件是加在 $\mathcal{A}_0$ 之外的，本节证明的是“若加入则推出”，不主张它们能从条款 I–III 推出；[@ex-appe-layer0-countermodels] 的反例恰好说明不能。本节的定理盒都对应冻结定理，其余推导标为 `手工推导`，引用的经典结论标为 `文献结果`。

## E.8.1 单对比较：弦与矢高在第 0 层已经锁死 {#sec-appe-chord-sagitta-layer0}

取一对对象的比较 $u=\mathrm{CMP}(x,y)$。条款 II 给出 $u^*=\mathrm{CMP}(y,x)$，条款 III 对有序对 $(x,y)$ 与 $(y,x)$ 都成立，所以 $uu^*=u^*u=\mathbf{1}$。沿用 §34.30.1 的名字，把 $v:=\mathbf{1}-S$ 叫作**矢高**，把 $\Delta:=u-\mathbf{1}=A-v$ 叫作**割弦**。

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

第二，§34.30.1 的两条恒等式 $(1-v_\epsilon)^2+c_\epsilon^2=1$ 与 $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ 是第 2、4 款在 $A=c_\epsilon\hat{\mathbf B}$、$\hat{\mathbf B}^2=-\mathbf{1}$ 时的写法。在第 0 层成立的是 $S^2-A^2=\mathbf{1}$ 与 $\Delta^*\Delta=2v$ 本身，它们不依赖三角函数实现。

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

这两个分支本身并不是病态模型。把 $2\times2$ 复矩阵看成实代数，对合取经典伴随 $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$，则 $aa^\sharp=\det(a)\mathbf{1}$，满足 $uu^\sharp=\mathbf{1}$ 的元素恰是 $\mathrm{SL}(2,\mathbb{C})$；每个这样的 $u$ 的求同部分 $S=\frac12\operatorname{tr}(u)\mathbf{1}$ 自动是中心标量，矢高 $v=1-\frac12\operatorname{tr}u$ 是复数（`手工推导`）。按迹对莫比乌斯变换分类的经典结果（`文献结果`）翻译成矢高的语言是：$u\neq\pm\mathbf{1}$ 时，$v\in(0,2)$ 为椭圆类，$v\in\{0,2\}$ 为抛物类，$v$ 为其余实数时为双曲类，$v\notin\mathbb{R}$ 为斜驶类。反例 (b) 的生成元都住在这里：$\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$，$j\mapsto\operatorname{diag}(1,-1)$，椭圆生成元 $\mapsto\operatorname{diag}(i,-i)$，三者都满足 $g^\sharp=-g$，平方分别是 $0$、$+\mathbf{1}$、$-\mathbf{1}$。冻结定理 [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) 给出实 $2\times2$ 无迹生成元中双曲形 $\operatorname{diag}(\delta,-\delta)$ 与椭圆形 $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ 的迹、行列式与平方；它的中间情形是零矩阵，非零幂零的抛物生成元不在该定理之内。这个代数上没有满足 $\varphi(a^\sharp a)\ge0$ 的归一正泛函（$a=\operatorname{diag}(1,-1)$ 给出 $a^\sharp a=-\mathbf{1}$），所以 E.8.3 的读数论证不适用于它。

$\mathrm{SL}(2,\mathbb{C})$ 经 $X\mapsto uXu^\dagger$ 作用在厄米矩阵 $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ 上并保持 $\det X=t^2-\lvert\mathbf{x}\rvert^2$，这是洛伦兹群的旋量覆盖（`文献结果`）；E.6 已引用的 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) 说明零锥把二次型定到只差一个标量。若再要求对厄米共轭也公平（$uu^\dagger=\mathbf{1}$），剩下的就是 $\mathrm{SU}(2)$，只含椭圆类。由此得到 `H2` 与 `H8` 的一个统一读法（`MODEL`）：**第 0 层留出的抛物与双曲分支，就是洛伦兹变换里的零转动与推进；选椭圆签名与选洛伦兹签名，是同一个代数里对合正性的取与舍。**

E.8.10 把这个读法算到底（[@rem-appe-rotor-boost-coexistence]）：取正性条件选出椭圆一行；仅仅舍去它并不选出洛伦兹签名，还要加上时间次序条件与“求异部分不是零平方”；对同一个比较 $u\neq\mathbf{1}$，正性条件与时间次序条件不能同时成立。所以“取与舍”指的是同一张三分表上为不同的比较选不同的行。

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

## E.8.2 第三点冗余：势表示及其稳定性 {#sec-appe-gain-potential}

下面把 $\mathrm{CMP}(x,y)$ 简写为 $c_{xy}$。

::: {.definition #def-appe-third-point-redundancy title="条款 IV：第三点冗余（本书模型）"}
设比较映射 $\mathrm{CMP}:X\times X\to\mathcal{A}$ 满足 [@def-ch32-axiom-of-comparison] 的条款 II 与 III。称它满足**第三点冗余**（`MODEL`），若对一切 $x,y,z\in X$，

$$
c_{xy}\,c_{yz}=c_{xz}.
$$

等价地，一切三点闭环的和乐 $h(x,y,z):=c_{xy}\,c_{yz}\,c_{zx}$ 等于 $\mathbf{1}$。当只有一部分点对可以比较时，把可比的点对看成图 $G$ 的边，并只对 $G$ 中两两可比的三点要求上式。
:::

第 1 层的克利福德实现满足条款 IV：单位向量的几何积给出 $xy\cdot yz=xz$。[§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) 说明第 2 层时已经指出“原始向量边乘积本身平坦无曲率”，条款 IV 把这句话立为条件。它与全书的出发点同向：两子丈量不需要外部第 3 点，现在进一步要求内部的第三点也不改变结果。

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

用到比较上：取 $H$ 为 $\mathcal{A}$ 中满足 $uu^*=u^*u=\mathbf{1}$ 的元素构成的群，条款 II、III 给出第 1 款，条款 IV 给出第 2 款。完全图是弦图，所以有限点集上的条款 IV 推出 $c_{xy}=\varphi_x^{-1}\varphi_y$。定理多给的一点对本书更有用：**不必两两可比。** 只要可比关系构成弦图，每个可比三角形平坦，势表示就存在。这与[第 29 章 §29.3](ch29-s03-timeless-gram-causality.md) 用弦图把局部半正定块补成整体半正定矩阵（[@thm-ch29-chordal-psd-completion]）用的是同一个组合条件。这类条件不能完全去掉：四圈上没有三角形，条件 2 成为空话，而绕圈一周的乘积可以取任意值，势表示可以不存在。弦性是充分条件，不是必要条件：带轮毂的四轮图不是弦图，三角相容却仍然推出势表示，取 $\varphi(i)=g(\text{毂},i)$ 即可（`手工推导`）。

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

$C^*$-代数的酉群配上算子范数距离满足定理的等距条件，所以近似平坦的比较离某个平坦比较不远，距离以点数线性增长。

::: {.remark #rem-appe-anchoring-consequences title="锚定表示的五条推论（手工推导）"}
**手工推导。** 设条款 II、III、IV 对一切点对与三点成立，$X$ 非空（可以无限）。

1. **正自配对。** $c_{xx}=\mathbf{1}$。条款 IV 取 $y=z=x$ 得 $c_{xx}^2=c_{xx}$，条款 III 给出 $c_{xx}^2=\mathbf{1}$。
2. **锚定表示。** 任取锚点 $o$，令 $g_x:=c_{ox}$，则 $g_xg_x^*=g_x^*g_x=\mathbf{1}$ 且 $c_{xy}=g_x^*g_y$。这是因为 $c_{xy}=c_{xo}\,c_{oy}$，而 $c_{xo}=c_{ox}^*$。
3. **唯一性。** 若另有 $c_{xy}=g_x'^*g_y'$，则 $g'_xg_x^*$ 与 $x$ 无关：不同的表示只差左乘一个固定元。
4. **外延商。** 条款 I 的不可分关系 $x\sim_{\mathrm{CMP}}y$ 等价于 $g_x=g_y$，所以 $\widetilde X$ 单射到 $\mathcal{A}$ 的公平元群里。
5. **端点公式。** 对任意采样路径，$c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$。

第 2 款在有限 $X$ 上是 [@thm-appe-chordal-gain-potential] 取完全图的情形；这里的直接构造对无限 $X$ 也成立，并且给出了势的显式形式。
:::

第 1 款排除了 [@ex-appe-layer0-countermodels] 的反例 (a)：单点上 $\mathrm{CMP}=-1$ 满足往返为 $+1$，却违反 $c\cdot c=c$。所以在条款 IV 之下，`H2` 的“正自配对”不再是一条独立的标定。第 4 款的意思是：选定锚点之后，一个对象就是把锚点带到它的那个旋子，对象与作用在对象上的算子不再分属两类。第 5 款是 §34.30.2 有序旋子乘积积分的牛顿—莱布尼茨公式：平坦的比较沿任何采样路径连乘，结果只依赖两个端点，这在任意有限孔径下精确成立，不需要细分极限。

弦图是让三角相容足够的一个充分条件。恰好足够的条件可以直接说出来。

::: {.remark #rem-appe-triangle-simple-connectivity title="三角相容何时足够：可比三角形填满每个圈（手工推导与文献结果）"}
**手工推导。** 设 $G$ 是顶点集 $V$ 上的有限简单图，$H$ 为群，$g$ 定义在相邻的有序点对上，满足 $g(j,i)=g(i,j)^{-1}$，且在 $G$ 的每个三角形上 $g(i,j)\,g(j,k)=g(i,k)$。对一条走道 $w=(x_0,\dots,x_n)$（相继两点相邻），记 $\operatorname{hol}(w)=g(x_0,x_1)\cdots g(x_{n-1},x_n)$。允许两种改写：删去或插入一次原路折返，$x,y,x\leftrightarrow x$；把三角形的两条边换成第三条边，$x,y,z\leftrightarrow x,z$。两种改写都不改变 $\operatorname{hol}$。若 $G$ 的每条闭走道都能用这两种改写化成单点，称 $G$ **被三角形填满**。

1. **充分。** 若 $G$ 被三角形填满，则任何群 $H$ 上满足上述两条的 $g$ 都是势之比。在每个连通分支取基点 $o$，令 $\varphi(x)=\operatorname{hol}(w)$，$w$ 为任一条从 $o$ 到 $x$ 的走道。两条这样的走道，一条接上另一条的反向，成为闭走道，它的 $\operatorname{hol}$ 为 $1$；由取逆规则，反向走道的 $\operatorname{hol}$ 是原走道的逆，所以 $\varphi$ 与走道的选取无关；对相邻的 $x,y$ 有 $\varphi(y)=\varphi(x)\,g(x,y)$，即 $g(x,y)=\varphi(x)^{-1}\varphi(y)$。
2. **必要。** 若 $G$ 的某个连通分支没有被三角形填满，则存在群 $H$ 与满足上述两条的 $g$，它不是势之比。取 $H$ 为该分支上以 $o$ 为基点的闭走道在两种改写下的等价类，乘法为首尾相接；取一棵生成树，记 $\gamma_x$ 为树上从 $o$ 到 $x$ 的走道，令 $g(x,y)=[\gamma_x\,(x,y)\,\gamma_y^{-1}]$，在其余分支上令 $g\equiv1$。它满足取逆与三角相容，并且任一以 $o$ 为基点的闭走道 $w$ 有 $\operatorname{hol}(w)=[w]$。这个 $H$ 非平凡：设以 $x$ 为基点的闭走道 $w$ 不能化成单点，则 $\gamma_x\,w\,\gamma_x^{-1}$ 是以 $o$ 为基点的闭走道，它能化成单点当且仅当 $w$ 能。势之比会使一切闭走道的 $\operatorname{hol}$ 等于 $1$，这与 $H$ 非平凡矛盾。
3. **偏差按填充面积累积。** 设 $H$ 带双侧不变的伪度量 $d$，$g$ 精确满足取逆，而三角相容只在误差 $\varepsilon$ 之内成立：在每个三角形上 $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$（由双侧不变性与取逆规则，三个顶点的六种排序给出同一个偏差）。一条用 $A$ 次三角形改写化成单点的闭走道满足 $d(\operatorname{hol}(w),1)\le A\varepsilon$，两个方向的改写都计入 $A$：折返不改变 $\operatorname{hol}$；每次三角形改写把乘积中的一段 $g(x,y)\,g(y,z)$ 换成 $g(x,z)$，或者反过来，双侧不变性把这一步的偏差控制在 $\varepsilon$ 之内。

**文献结果。** 第 2 款中的群是 $G$ 的团复形（以 $G$ 的团为单形）的棱道群，它同构于团复形的基本群（Spanier, *Algebraic Topology*, 1966, 第 3 章）；“被三角形填满”就是团复形的每个连通分支单连通。连通弦图的团复形可缩：单纯顶点的邻居张成一个单形，删去这个顶点是形变收缩，并且保持连通，沿消去次序归纳即得。所以 [@thm-appe-chordal-gain-potential] 是第 1 款的特例。
:::

两个例子标出边界。四圈没有三角形，它的闭走道群是 $\mathbb{Z}$，第 2 款的 $g$ 把绕圈一周记成生成元，任意和乐都允许。在四圈中央加一个与四点都相邻的轮毂，得到的四轮图不是弦图，因为外圈仍是无弦的四圈；它却被四个三角形填满，三角相容仍然推出势表示。所以对条款 IV 而言，要紧的是可比三角形能否填满每个圈。第 3 款可以和 §34.30.3 的有限网格斯托克斯定理对照着读：和乐的偏差不超过填充所用的三角形改写次数乘以单个三角形的偏差；填充是一张圆盘时，这个次数就是圆盘里三角形的个数。

## E.8.3 从势表示到格拉姆半正定与弦距 {#sec-appe-gram-from-potential}

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

## E.8.4 曲率从哪里来 {#sec-appe-curvature-from-half-comparison}

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

$S(r)^2=1-\frac v2$ 在布洛赫球上就是 $\cos^2\frac\theta2$：半比较求同读数的平方等于 $1$ 减去半个矢高，这是玻恩权重的弦—矢高写法，它本身不替代 `H5` 的可加性前提。行列式公式说的是：三点格拉姆体积等于三个互补矢高之积乘以角盈的矢高，[§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)“二生三”原胞的 $\det G=\sin^4\epsilon$ 是它的特例。对 `H8` 而言，第 1 层内生的射影和乐不需要新的输入，它是条款 IV 之下把全比较开平方的结果；仍然需要第 2 层新输入的，是随时空基点变化的纤维联络及其动力学。

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

`H7` 在台账里列的“中心复结构”是复合系统层析的输入，这条注记回答的是一个相邻而更窄的问题：一族给定的对象，在保留格拉姆阵到相位为止的意义下，是否需要复数振幅。只要可比三角形填满每个圈，答案可以由三点巴格曼乘积判定，也就是比较值乘积的读数；两两重叠的模长一般不够。在单比特上，两两求同读数通过 $D^2$ 就够了：可实化当且仅当没有三个对象围出非零的有向体积；两两读数看不到的只是 $D$ 的符号，即复共轭交换的那一对手性。这并没有推出复结构。实向量构成的模型满足全部条款（E.8.7 的计数），所以“需要复数”仍是输入；改变的是这条输入的形状。第 3 款的四圈与 [@rem-appe-triangle-simple-connectivity] 中的四圈是同一个图：在一般维数中，这个图既让三角相容不足以推出势表示，也让三点读数不足以判定可实化；单比特上的 $a,b,-a,-b$ 说明，在维数受限时同一个图并不妨碍判定。

## E.8.5 玻恩权重：单比特上的缺口可以换成层析秩最小 {#sec-appe-born-minimal-rank}

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

## E.8.6 动力学：演化可逆、时间连续、生成元与条件化 {#sec-appe-dynamics-from-comparison}

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

## E.8.7 复合与交换 {#sec-appe-composites-and-exchange}

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

## E.8.8 系综：多点正性与单比特玻恩权重的读数形式 {#sec-appe-ensembles}

到此为止比较只在两个对象之间进行。实验里常做的是另一件事：按概率随机抽一个对象，再拿它去比较。把 $X$ 上有限支撑的概率分布 $E=\sum_kp_k\delta_{x_k}$ 叫作**系综**，两个系综的平均求同读数定义为 $S(E,F)=\sum_{k,l}p_kq_l\,S(x_k,y_l)$（`MODEL`）。再称 $\bar x$ 是 $x$ 的**对立者**，若 $\mathrm{CMP}(x,\bar x)=-\mathbf{1}$，即两者的矢高为 $2$。在条款 II 与条款 IV 下，$\mathrm{CMP}(\bar x,z)=\mathrm{CMP}(\bar x,x)\,\mathrm{CMP}(x,z)=-\mathrm{CMP}(x,z)$，对立者的一切比较都与 $x$ 反号。

::: {.remark #rem-appe-ensemble-positivity title="有对立者时，系综自洽等价于多点格拉姆半正定；没有对立者则不够（手工推导）"}
**手工推导。** 设条款 II–IV 成立，求同读数是实标量，$S(x,y)=s_{xy}\mathbf{1}$。对系综 $E=\sum_kp_k\delta_{x_k}$ 有 $S(E,E)=p^{\mathsf T}[s_{x_kx_l}]\,p$，即从同一个系综独立抽两个对象时求同读数的平均。

1. 若每个对象都有对立者，则下面两条等价：(a) 每个系综与自身的平均求同读数不为负，$S(E,E)\ge0$；(b) 对每个有限点组，读数表 $[s_{x_ix_j}]$ 半正定。
2. 在 (b) 之下 $\lvert s_{xy}\rvert\le1$；$s_{xy}=1$ 时 $x$ 与 $y$ 对一切 $z$ 的求同读数相同，$s_{xy}=-1$ 时处处反号。
3. 没有对立者时，(a) 推不出 (b)。

推导：(b) 推出 (a) 只需取 $\alpha=p$。反过来，任给实向量 $\alpha\neq0$，在 $\alpha_i\ge0$ 处取 $y_i=x_i$，在 $\alpha_i<0$ 处取 $y_i=\bar x_i$，令 $E=\sum_i\frac{\lvert\alpha_i\rvert}{\lVert\alpha\rVert_1}\delta_{y_i}$。由 $s_{\bar xz}=-s_{xz}$，$S(E,E)=\alpha^{\mathsf T}[s_{x_ix_j}]\,\alpha/\lVert\alpha\rVert_1^2$，于是 (a) 给出 (b)。第 2 款：$2\times2$ 子阵 $\begin{pmatrix}1&s\\s&1\end{pmatrix}$ 半正定即 $\lvert s\rvert\le1$；对任意 $z$，把 $\{x,y,z\}$ 上的半正定读数表写成实内积空间中单位向量 $e_x,e_y,e_z$ 的格拉姆阵，$s_{xy}=1$ 时 $\lVert e_x-e_y\rVert^2=2-2s_{xy}=0$，所以 $e_x=e_y$，$s_{xz}=s_{yz}$；$s_{xy}=-1$ 时 $e_x=-e_y$。

第 3 款的例子就是 E.8.1 末段 $(M_2(\mathbb{R}),{}^\sharp)$ 中的三点：$s_{01}=s_{02}=\frac{\sqrt2}{2}$，$s_{12}=-\frac18$，读数表的行列式为 $-\frac{9}{64}$。对非负权重，
$$
p^{\mathsf T}Gp=p_0^2+p_1^2+p_2^2+\sqrt2\,p_0(p_1+p_2)-\frac14p_1p_2\ \ge\ p_0^2+\frac78\left(p_1^2+p_2^2\right)>0,
$$
所以 (a) 在这三个对象上成立。把对立者 $-x_0,-x_1,-x_2$（仍在 $\mathrm{SL}(2,\mathbb{R})$ 中，$\mathrm{CMP}(x,-x)=-\mathbf{1}$，条款 II–IV 照旧成立）加进对象集，系综 $E=\frac{1}{2+\sqrt2}\left(\sqrt2\,\delta_{\bar x_0}+\delta_{x_1}+\delta_{x_2}\right)$ 给出 $S(E,E)=-\frac{3-2\sqrt2}{8}<0$。双曲点对是同一种情形：$s_{01}=\cosh\eta>1$ 时非负权重给出 $p_0^2+p_1^2+2p_0p_1\cosh\eta>0$；有了对立者，$E=\frac12\left(\delta_{x_0}+\delta_{\bar x_1}\right)$ 给出 $\frac12(1-\cosh\eta)<0$。
:::

与 [@rem-appe-gram-from-flatness] 第 3 款对照：那里由条款 IV 加正性条件推出 (b)。这里说，要推出 (b)，正性条件也可以换成两句只谈比较对象与读数的话：**每个对象都有一个对立者；从同一个系综独立抽两个对象，它们的平均求同读数不为负。** 这两句并不等价于正性条件。它们仍然容许 $s=\pm1$ 而 $A\neq0$ 的抛物点对：在 [@ex-appe-layer0-countermodels] 反例 (b) 的对偶数中取对象 $\pm1$、$\pm(1+\varepsilon)$，读数只取 $\pm1$，读数表半正定，(a) 成立，正性条件失败。但由第 2 款，这样的两个对象对一切求同读数不可分辨，它们的差别只在求异通道里。被排除的是双曲分支；在洛伦兹读法下（`MODEL`），把一个指向未来的单位类时向量与一个指向过去的混在一起，平均成了类空的，这就是上面的负读数。

上面留下一个问题：能不能找一个也看得见求异通道的读数条件，把抛物点对也排除掉，从而由读数推出正性条件？在“读数由态给出”的前提下，答案是否定的。

::: {.remark #rem-appe-positivity-invisible-part title="正性条件中态的读数都看不见的部分（手工推导与文献结果）"}
**手工推导。** 设 $\mathcal{A}$ 是实或复的含幺 $*$-代数。称线性泛函 $\varphi$（复代数上为复线性）为**态**，若 $\varphi(\mathbf{1})=1$，对一切 $a$ 有 $\varphi(a^*a)\ge0$，并且 $\varphi(a^*)=\overline{\varphi(a)}$。复代数上最后一条由前两条推出，所以态就是 E.8.3 所用的归一正泛函。实代数上最后一条是额外的限制：它使态在一切满足 $a^*=-a$ 的元素上为零，所以实代数上的态读不到求异部分；E.8.3 只要求在自伴元上取实值，在实代数上这不构成限制。比较值及其对合的任意有限乘积在态下的值，称为一个**读数**；E.8.3 的求同读数与 E.8.9 的轨道记录都是读数（后者在复代数上，含求异读数 $i\operatorname{Im}f$），E.8.8 的系综读数是读数的平均。设 $\mathcal{A}$ 上至少有一个态，令

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

## E.8.9 轨道：一个对象沿时间的比较记录 {#sec-appe-orbit-records}

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

同一份轨道记录还回答了 E.8.6 留下的问题：哈密顿量在多大程度上是读数之外的输入。

::: {.remark #rem-appe-orbit-record-channels title="轨道记录的三种读数各自决定什么：两个通道缺一不可（手工推导与文献结果）"}
**手工推导。** 记 $\mu^{\mathrm r}(B)=\mu(-B)$ 为能量分布的反射。

1. **全比较读数。** $f$ 决定 $\mu$，进而决定 $(\mathcal{K},H\vert_{\mathcal{K}},\Omega)$ 到酉等价为止。有限维时这一点直接可见：不同 $\lambda$ 的指数函数 $e^{-i\lambda t}$ 线性无关，$f=\sum_lp_le^{-i\lambda_lt}$ 的写法唯一。
2. **只有求同读数。** $\operatorname{Re}f(t)=\int\cos(\lambda t)\,d\mu$ 只决定对称化 $\frac12(\mu+\mu^{\mathrm r})$，也就是 $\lvert\lambda\rvert$ 的分布。二能级就有反例：$H=\operatorname{diag}(1,2)$ 与 $H'=\operatorname{diag}(1,-2)$，初态 $\frac{1}{\sqrt2}(1,1)$，两者的求同读数都是 $\frac12(\cos t+\cos2t)$，回到原处的玻恩权重却分别是 $\frac12(1+\cos t)$ 与 $\frac12(1+\cos3t)$。
3. **只有玻恩权重。** $\lvert f(t)\rvert^2=\int\!\!\int e^{-i(\lambda-\lambda')t}\,d\mu(\lambda)\,d\mu(\lambda')$ 只决定 $\mu$ 的自相关。二能级时这已足够定出 $\mu$ 到平移与反射为止：$\mu=p\delta_a+q\delta_b$ 的自相关给出 $pq$、$p^2+q^2$ 与 $\lvert b-a\rvert$。三能级就有真正的歧义：能级 $0,1,2$，布居 $\frac1{12}(1,5,6)$ 与 $\frac1{12}(2,7,3)$，生成多项式 $1+5z+6z^2=(1+2z)(1+3z)$ 与 $2+7z+3z^2=(2+z)(1+3z)$ 只差把根 $-\frac12$ 换成它的倒数 $-2$；两者的玻恩权重都是 $\frac{1}{144}(62+70\cos t+12\cos2t)$，而两个分布既不差一个平移，也不互为反射，求同读数也不同。
4. **求同读数加玻恩权重。** 对两个都只有有限个能级的分布，两者合起来决定 $\mu$ 到反射为止。推导：$(\operatorname{Im}f)^2=\lvert f\rvert^2-(\operatorname{Re}f)^2$ 已知；若 $f$ 与 $f'$ 给出相同的两种读数，$g=\operatorname{Im}f$、$g'=\operatorname{Im}f'$ 是有限个三角函数之和，实解析，$(g-g')(g+g')\equiv0$，其中一个因子在不可数多个点上为零，因而恒为零。所以 $f'=f$ 或 $f'=\bar f$，后者就是 $\mu'=\mu^{\mathrm r}$，即 $H\mapsto-H$ 的时间反演。

**文献结果。** Stone 定理、谱定理与 Bochner 定理；一维相位恢复的翻根歧义（Walther 1963；Hofstetter 1964）与同度量集（Patterson 1944；Rosenblatt–Seymour 1982）。
:::

E.8.6 的台账把哈密顿量 $H$ 记为仍需输入。这一条注记把这句话说得更准：**在轨道张成的空间上，$H$ 不是读数之外的另一个输入，两个通道的完整轨道记录决定它到酉等价为止。** 只读求同通道，丢掉的不止时间取向，连每个能级的符号都丢了；只读射线的玻恩权重，三能级就出现真正的歧义；求同读数与玻恩权重合起来，剩下的恰是求异通道的整体符号，也就是时间反演。条款 II 把比较拆成求同与求异两个通道，在动力学上两个通道都不可省。仍然是输入的，是选哪条轨道，以及 $H$ 在 $\mathcal{K}$ 之外怎样作用。

## E.8.10 观察者之间的比较：时间次序选出双曲一行 {#sec-appe-observer-comparison}

把比较的对象换成 $1+1$ 维中的惯性观察者，每个观察者有自己的坐标 $(t,x)$。对观察者 $o,o'$，令 $\Lambda_{o\leftarrow o'}$ 把一个事件在 $o'$ 中的坐标换成它在 $o$ 中的坐标，取 $\mathrm{CMP}(o,o')=\Lambda_{o\leftarrow o'}$，值域是 E.8.1 用过的实 $*$-代数 $(M_2(\mathbb{R}),{}^\sharp)$，$a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$，$aa^\sharp=\det(a)\mathbf{1}$。坐标变换是线性的，这是这里的输入（`MODEL`）；[@rem-appe-causal-order-linearity] 说明在 $1+1$ 维中它不能由因果次序推出。

条款 III 在这里就是 $\det\Lambda_{o\leftarrow o'}=1$，此时条款 II 只是说反向的变换是逆变换；求同部分 $S=\frac12\operatorname{tr}(\Lambda)\mathbf{1}$ 总是实标量，所以 E.8.1 的矢高表直接适用。记 $\Lambda_{o\leftarrow o'}=\begin{pmatrix}a&b\\c&d\end{pmatrix}$。$o'$ 的原点 $(\tau,0)$ 在 $o$ 中是 $(a\tau,c\tau)$，所以 $a\neq0$ 时 $o'$ 相对 $o$ 的速度读数是 $v(o,o')=c/a$；由逆矩阵，$d\neq0$ 时 $v(o',o)=-c/d$。

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

矢高为 $1-\gamma$。所以 $v\neq0$ 时，$K<0$、$K=0$、$K>0$ 分别落在 E.8.1 表的椭圆、抛物、双曲三行。

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
2. 把 $M_2(\mathbb{C})$ 看作实 $*$-代数，对合取 E.8.1 的 $\sharp$，满足 $uu^\sharp=\mathbf{1}$ 的元素是 $\mathrm{SL}(2,\mathbb{C})$。在四元数子代数 $\operatorname{span}_{\mathbb{R}}\{\mathbf{1},i\sigma_1,i\sigma_2,i\sigma_3\}$ 上 $a^\sharp a=\lvert a\rvert^2\mathbf{1}$，正性条件成立；$\sigma_3^\sharp\sigma_3=-\mathbf{1}$，加入一个推进生成元它就失败。每个 $u\in\mathrm{SL}(2,\mathbb{C})$ 唯一地写成 $u=kb$，$k\in\mathrm{SU}(2)$，$\frac12\operatorname{tr}k\in[-1,1]$；$b$ 是行列式为 $1$ 的正定厄米矩阵，$\frac12\operatorname{tr}b\ge1$。转动因子重复不放大，推进因子重复不翻转时间次序。
3. 只有一个时间方向。在 $\mathbb{R}^p\times\mathbb{R}^q$ 上取 $Q(a,b)=\lvert a\rvert^2-\lvert b\rvert^2$。开锥 $\{Q>0\}$ 经 $(a,(1-\lambda)b)$，$0\le\lambda\le1$，形变收缩到 $\mathbb{R}^p\setminus\{0\}$，所以 $p\ge2$ 时它连通，$p=1$ 时恰有两个分支，由 $w\mapsto-w$ 互换。时间次序条件要用的“未来与过去”只在 $p=1$ 时存在。$p\ge2$ 时，两个时间方向张成的平面是定号的，其中的转动是第 1 款的椭圆比较，重复它会把时间轴转到反向。

零锥与二次型之间的一步由冻结命题 [@prop-null-cone-rigidity] 承担：如第 17 章在该命题之后所说，线性映射 $B$ 把零锥映入零锥时 $\operatorname{minkowski}_d(Bw)=\lambda\operatorname{minkowski}_d(w)$，$\lambda=\operatorname{minkowski}_d(Be_0)$，对任意 $d\in\mathbb{N}$ 成立。比较格拉姆矩阵的行列式得 $\det(B)^2=\lambda^{d+1}$。若 $\det B=\pm1$：$d\ge2$ 时 $\lambda<0$ 会改变签名，所以 $\lambda=1$；$d=1$ 时 $\lambda=-1$ 可以出现（转角 $90^\circ$ 的转动，$\det B=1$），它的求同读数为 $0$，被时间次序条件排除。这个命题不回答零锥为什么存在（那是 $K>0$），也不给出线性与时间取向。

**文献结果。** 矩阵的极分解，以及 $\mathrm{SL}(2,\mathbb{C})$ 作为洛伦兹群的旋量覆盖。
:::

剩下的问题是线性。

::: {.remark #rem-appe-causal-order-linearity title="1+1 维中因果次序推不出线性（手工推导与文献结果）"}
**手工推导。** 在 $1+1$ 维中取零坐标 $p=t+x$，$q=t-x$。事件 $Y$ 在 $X$ 的闭未来锥中（$t_Y-t_X\ge\lvert x_Y-x_X\rvert$），当且仅当 $p_Y\ge p_X$ 且 $q_Y\ge q_X$。所以对任意两个严格递增的双射 $f,g:\mathbb{R}\to\mathbb{R}$，映射 $(p,q)\mapsto(f(p),g(q))$ 双向保持因果次序；它是仿射映射当且仅当 $f$ 与 $g$ 都是仿射的，例如 $f(s)=s+\frac12\sin s$ 与 $g(s)=s^3+s$ 都不是。所以在 $1+1$ 维中，[@rem-appe-frame-change-family] 的线性是输入。

**文献结果。** E. C. Zeeman, *J. Math. Phys.* **5**, 490–493 (1964)：闵可夫斯基时空中保持因果偏序的自同构所成的群由非齐次洛伦兹群与伸缩生成。上面的例子说明这一结论在 $1+1$ 维中不成立；它在哪些维数成立，本书没有核对。
:::

## E.8.11 捏合的熵增：精确恒等式与两侧界 {#sec-appe-pinching-entropy}

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

**数值核验（`NUM`）。** $d=2,3,4,5$、随机分块、各种秩的 $6000$ 个随机态上（固定随机种子），第 1 款两个不等号都没有被违反，第二个不等号在部分情形下于舍入误差内取等；第 3 款闭式与数值积分的最大偏差为 $3\times10^{-14}$，两端在 $c=0.05,0.2,0.45$ 处取到。[第 37 章 §37.5.2](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-p2g-dream-precompile) 的纯态例子（$\theta=\frac\pi6$，$c=\frac38$）落在上端：$\Delta S=h(\frac34)\approx0.5623$（即 $0.8113$ 比特）。

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

## E.8.12 有限步路径乘积：二次作用量的驻相是精确的 {#sec-appe-finite-step-path-product}

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

第 3 款里的 $1-\cos\theta$ 正是 E.8.1 的矢高，它也决定时间步能取多大。

::: {.example #ex-appe-time-step-trichotomy title="时间步的矢高：椭圆、抛物、双曲三种切片（手工推导与数值核验）"}
**手工推导。** 单步矩阵 $M_\varepsilon=\begin{pmatrix}1-\frac{\varepsilon^2\omega^2}2&\varepsilon\\-\varepsilon\omega^2\left(1-\frac{\varepsilon^2\omega^2}4\right)&1-\frac{\varepsilon^2\omega^2}2\end{pmatrix}$（对一切 $\varepsilon\omega>0$ 均有 $\det M_\varepsilon=1$）的求同读数是 $\frac12\operatorname{tr}M_\varepsilon=1-v$，矢高 $v=\frac{\varepsilon^2\omega^2}2$。按 E.8.1 的表：$0<\varepsilon\omega<2$ 时 $0<v<2$，椭圆，$M_\varepsilon^n$ 有界；$\varepsilon\omega=2$ 时 $v=2$，$M_\varepsilon=\begin{pmatrix}-1&\varepsilon\\0&-1\end{pmatrix}$，抛物，$M_\varepsilon^n=(-1)^n\begin{pmatrix}1&-n\varepsilon\\0&1\end{pmatrix}$ 线性增长；$\varepsilon\omega>2$ 时 $v>2$，双曲，指数增长。$U_\varepsilon$ 始终是幺正的；增长的是位置与动量的弥散，所以时间步须满足 $\varepsilon\omega<2$，切片乘积才保持它们有界。

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

## E.8.13 复结构、交换符号与估值：三项输入的精确形状 {#sec-appe-complex-exchange-valuation}

E.8.7 之后台账仍把三项写成单纯的输入：`H7` 的中心复结构与交换扇区，以及 `H4` 的估值选择。本小节把第一项写成一条关于生成元与读数的条件，把第二项放到配置空间上，把第三项写成一条有界性判据；三项都仍是输入。

下面的代数取有限直和 $\mathcal{A}=M_{n_1}(F_1)\oplus\cdots\oplus M_{n_m}(F_m)$，$F_k\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$，$n_k\ge1$，对合取逐块的共轭转置。记 $\operatorname{Sa}(\mathcal{A})=\{a:a^*=a\}$（求同部分），$\operatorname{Skew}(\mathcal{A})=\{a:a^*=-a\}$（求异部分），$U(\mathcal{A})=\{u:u^*u=uu^*=\mathbf{1}\}$（公平元）。$a=\frac12(a+a^*)+\frac12(a-a^*)$ 就是 E.8.1 的 $S$ 与 $A$。

::: {.remark #rem-appe-agreement-difference-count title="求同部分与求异部分的维数：单个矩阵代数中只在复情形相等（手工推导）"}
**手工推导。** 记 $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$。$M_n(F)$ 中自伴矩阵的对角元是实数，反自伴矩阵的对角元是纯虚的（每个 $d-1$ 个参数），每对 $i<j$ 在两种情形下都有一个 $F$ 中的自由元。所以

$$
\dim\operatorname{Sa}=K_d(n)=n+d\cdot\frac{n(n-1)}{2},\qquad \dim\operatorname{Skew}=dn^2-K_d(n),\qquad \dim\operatorname{Sa}-\dim\operatorname{Skew}=(2-d)\,n,
$$

$K_d$ 是 [@rem-appe-tomography-count] 的计数函数。实、复、四元数三种情形的差分别为 $n$、$0$、$-2n$，与那里的复合缺额 $\frac{d(2-d)}4a(a-1)b(b-1)$ 带着同一个因子 $2-d$。对直和，维数相等不再说明问题：$M_2(\mathbb{R})\oplus\mathbb{H}$ 中 $\dim\operatorname{Sa}=3+1=4=1+3=\dim\operatorname{Skew}$，而两个直和项都不是复的。
:::

E.8.6 中生成一族公平元的是求异部分（弦率 $-iH$），读出的是求同部分（$H$）；在复量子理论里两者由乘以 $i$ 一一对应，且这个对应不随换架而变。下一条把它写成一条在直和上也适用的条件。

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

最后是估值。E.8.1 用“整数次幂有界”刻画椭圆一行（[@rem-appe-bounded-recurrence]）；奥斯特洛夫斯基分岔也有一条同样形式的判据。

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

与 [@rem-appe-bounded-recurrence] 相同的只有判据的形式：那里一个比较的求异部分满足正性条件，当且仅当它的整数次幂有界；这里绝对值是超度量，当且仅当每个整数的各次幂的绝对值有界。不同之处有三：乘性使 $\lvert n^k\rvert=\lvert n\rvert^k$ 要么有界、要么指数增长，没有对应抛物一行的线性增长；在 $\mathbb{Q}$ 上，无界一行中正整数按幂次增长，$\lvert n\rvert=n^\alpha$，$0<\alpha\le1$；有界一行给出 $\mathbb{Q}_p$，而 E.8.1 的椭圆转动与 $\mathbb{C}$ 在无界的阿基米德一行之上。所以两张表共享的是判据，不是对象。

**文献结果。** 等价 1⇔2⇔3 是经典的；其中 2⇔3（$n$ 取自然数）对赋范除环在 Mathlib 中是 `isUltrametricDist_iff_forall_norm_natCast_le_one`（未在上游库冻结）。表中最后一列来自冻结定理 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]；Ostrowski 1916，*Acta Math.* 41, 271）：$\mathbb{Q}$ 上非平凡绝对值等价于 $\lvert\cdot\rvert_\infty$ 或唯一一个 $\lvert\cdot\rvert_p$，而前者在整数上无界、后者在整数上不超过 $1$，等价保持有界与否；无界一行的形式 $\lvert n\rvert=n^\alpha$ 是同一分类的经典表述。两行的标准绝对值满足乘积公式 $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p=1$（$x\in\mathbb{Q}$，$x\neq0$），即冻结定理 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（[@thm-ch36-crt-and-adelic-product-formula]）。
:::

三条都不减少输入：实与四元数矩阵代数满足条款 I–IV 与正性条件而没有词典；交换回路的两个特征标都与平坦性相容；估值的两行都由冻结分类给出，比较的条款不在其间选择。

## E.8.14 台账改了什么 {#sec-appe-reduced-ledger}

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
| `H4` 奥斯特洛夫斯基估值选择 | `T3` 分岔 | 两行判据：绝对值在整数上有界当且仅当满足强三角不等式（此时三角形都等腰）；在 $\mathbb{Q}$ 上，由冻结分类，有界一行等价于某个 $\lvert\cdot\rvert_p$，无界一行等价于 $\lvert\cdot\rvert_\infty$；与 E.8.1 的有界判据同形，但没有对应抛物行的第三行，有界一行也不是椭圆转动所在的一行；选哪一行仍是输入 | [@rem-appe-bounded-integers-ultrametric]、[@thm-ch36-ostrowski-padic-ball-and-blind-spot] |
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

新增的两条输入是条款 IV（[@def-appe-third-point-redundancy]）与正性条件（[@rem-appe-involution-positivity]）；读数由态给出且至少有一个态时，后者等价于没有非零的零平方元素，而这一部分对态的一切读数不可见（[@rem-appe-positivity-invisible-part]）；求同读数不是实标量时，读数表的半正定另需一个正泛函。条款 IV 不必对一切三点成立：可比三角形填满每个圈就够了，而且对一切群而言这是恰好够的条件（[@rem-appe-triangle-simple-connectivity]）。条款 IV 排除一切全比较的和乐，它刻画的是第 1 层的平坦骨架；带真实曲率的第 2 层联络必须放弃它，那时 [@thm-appe-chordal-gain-potential-stability] 与 [@rem-appe-near-flat-gram-bound] 给出偏离的代价。

E.8.6 与 E.8.7 不增加新的条款：`H6` 的可逆与连续两项各有一个只谈对象与读数的充分条件（过去完备、矢高读数在零点连续），条件化换成一条最优化原理，`H7` 有了一行计数公式；这些条件仍是输入。

E.8.8 与 E.8.9 同样不增加新的条款。E.8.8 把比较用到系综上：要推出读数表半正定，正性条件可以换成“每个对象有对立者，系综与自身的平均求同读数不为负”，后者仍容许的只有对一切求同读数不可见的抛物点对；单比特上的玻恩律可以由系综外延性推出。E.8.9 读一个对象的轨道：`H4` 有了可在有限步上检验的读数形式，`H6` 的 $H$ 在轨道空间上可以从两个通道的记录中读出。

E.8.10–E.8.12 为观察者之间的比较增加两条输入：时间次序条件，以及“求异部分不是零平方”（它是 [@rem-appe-positivity-invisible-part] 中那一条件在求异部分上的特例）；在 $1+1$ 维中，坐标变换的线性也仍是输入。对同一个比较，正性条件与时间次序条件不能同时成立，`H2` 与 `H8` 由此分开：两者为不同的比较选同一张表上的不同行。E.8.11 不改变“粗粒化是保单位的捏合”这一输入，只给它的后果定量。E.8.12 把 `H9` 的路径积分一项缩小为：二次作用量在有限步上精确，一般作用量只有渐近陈述，连续极限在算子层面的存在是文献结果。

E.8.13 不增加新的条款。`H7` 的中心复结构换成一条协变词典条件：每个求异部分配一个求同读数，对应线性、可逆且不随换架而变；在 $M_n(\mathbb{R})$、$M_n(\mathbb{C})$、$M_n(\mathbb{H})$ 的有限直和中它等价于中心复结构，并给出 `H4` 的复载体；实与四元数矩阵代数满足条款 I–IV 与正性条件而没有它。交换扇区换成配置空间基本群的一个特征标，$d\ge3$ 时只有 $\pm1$。`H4` 的估值选择换成“整数倍是否有界”。三者仍是输入。
:::

这一节没有减少输入的总数到零，它改变的是输入的形状：在求同读数为实标量的情形，`H2` 的三项原先是关于自配对、双向量与格拉姆矩阵的三条几何陈述，现在换成两条只用比较本身就能说出口的条件。一条说第三者不改变两者之比，一条说差异的往返留下正的痕迹。
