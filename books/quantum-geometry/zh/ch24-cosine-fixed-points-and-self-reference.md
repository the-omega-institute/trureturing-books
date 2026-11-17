# 第二十四章 余弦不动点与自指：从 $\cos\theta = \theta$ 到 $\psi = \psi(\psi)$

> *“如果cos(theta)=theta, 那cos哪里来的? cos=theta?”*
>
> *“这就是我们最早研究的psi=psi(psi)”*

走过整整二十三章的跋涉，我们终于站在了第六部《越界·球外之球》的压轴关口，也站在了全书哲学与几何直觉的最高峰上。

让我们把全书从第一页起就埋下的那条主线拉直：

- 在[第一章](ch01-measurement.md)与[第二章](ch02-born-rule.md)里，我们砍掉了游离在两子之外的“第 3 点 $C$”，证明当已知基准态 $\vv{a}$ 去丈量（liáng）目标态 $\vv{b}$ 时，两子张开的夹角 $\theta$ 直接通过内积投影吐出相融刻度 $\cos\theta$；
- 在[第二十一章](ch21-diagonalization-and-escape.md)里，我们看到只要“丈量的语言（满射解码器目录）”与“被丈量的对象（潜坐标）”被割裂成两层且伴随无不动点翻转 `twist`，相对语义对角线就会撕裂旧划分拓扑，迫使观测拓扑向更高维的联合读出严格加细（并在每次扩容地址集重建满射目录时继续向外逃逸）。

那么，怎样才能让这场无穷无尽的“球外之球”追逐停下来，收束为一个自给自足、无需外求的**自指不动点（self-referential fixed point）**？

本章题记的追问引出一种具体的反馈选择：**把上一轮两子比量切出的无量纲相融度读数 $\cos\theta_k$，直接用作下一轮角度的弧度数值**，即 $\theta_{k+1} = \cos\theta_k$。这是本章采用的更新律；两子比较或“不借外部尺子”本身并不强制选择它，改用其他反馈函数或角度刻度会得到不同的迭代。对这条弧度制更新律，不动点满足

$$
\cos\theta^* = \theta^* \qquad (\theta^* \approx 0.7390851332\dots)
$$

的那一刹那，请再问一次：**在这个式子里，左边那个名叫 $\cos$ 的算子究竟是从哪里来的？难道在算子 $\cos$ 之外，还另有一个叫 $\theta^*$ 的赤裸数字吗？**

在本书正交比较的几何本体论里，作者把 $\cos(\cdot)$ 理解为“正交投影丈量”这一动作，把 $\theta^*$ 理解为这一反馈动作锁定的自洽平衡态。数学上，$\cos : \mathbb{R}\to\mathbb{R}$ 是函数，$\theta^*\in\mathbb{R}$ 是标量；$\cos\theta^*=\theta^*$ 只说函数在该输入处的输出等于输入，并不把函数等同于一个数。作者关于尺子与刻度、主客二分消融的诠释，凝练为本书扉页的自指格言：

$$
\psi = \psi(\psi).
$$

在本章中，我们将用严密的数学与 Lean 4 形式化定理，把这幅自指画卷拆解为四个相互辉映的层次：**有限状态空间上的单调收缩稳定化定理**、**相邻步解释语境相对不动点与语境非唯一性定理**、**正实数上黄金连分数自指映射 $x = 1 + 1/x$ 的唯一代数不动点定理**，以及收录在文献注记 [@rem-banach-dottie-hairy-ball-literature] 与 [@rem-dottie-angle-incommensurable] 中的**Dottie 余弦自指 $\cos\theta^* = \theta^*$ 的经典分析与超越数论背景**。

::: {.figure src="ch24-overview"}
**图 24。** 本章地图：第 I 栏，青色的曲线 $y = 1 + 1/x$ 与灰色对角线 $y = x$ 在正半轴上只交于绿色的 $\varphi \approx 1.618$（[@cor-golden-fixed-point-unique]）；第 II 栏，青色的余弦曲线与灰色对角线 $y = x$，从 $0$ 出发的蛛网一圈圈绕向 $\theta^* \approx 0.739$，那里一小段品红的切线斜率是 $-\sin\theta^*$（收敛与速率是既有结果的应用，完整推导见 [@ex-ch33-mutual-cosine-monotonic-lock]）；第 III 栏，§24.7 例中的 $3 \times 3$ 列表，用 $f_1$ 扭过的对角线 $(1, 2, 2)$ 正是青色的第 $1$ 行，落点上的值 $2$（绿圈）是 $f_1$ 的不动点（[@lem-diagonal-landing-fixed]）。
:::

图 24 第 I、II、III 栏依次对应 §24.3、§24.4–§24.5 与 §24.7：$1 + 1/x$ 与对角线只交于 $\varphi$，余弦蛛网绕向 $\theta^*$，扭过的对角线落回表里时，落点那一格上是扭转的不动点。

- [24.1 离散收缩的必然收束：有限收缩更新稳定化定理](ch24-s01-finite-contraction.md)
- [24.2 语境相对解释不动点与语境非唯一性](ch24-s02-contextual-fixed-points.md)
- [24.3 代数自指的唯一黄金锁：$x = 1 + 1/x$ 与 $\varphi = \frac{1+\sqrt{5}}{2}$](ch24-s03-golden-self-reference.md)
- [24.4 从 $\cos\theta^* = \theta^*$ 到 $\psi = \psi(\psi)$：经典分析、截断裂缝与球面不动点二分](ch24-s04-cosine-and-spherical-fixed-points.md)
- [24.5 把闭环算到底：真实收敛率、导数加速与有理读数的裂缝宽度](ch24-s05-convergence-and-acceleration.md)
- [24.6 “$\pi$ 是 $\theta$ 的一个投影？”：互逆的两条级数、开普勒方程与半程落体](ch24-s06-inverse-series-and-kepler.md)
- [24.7 追逐在哪里停下：对角线落点即不动点，以及不靠压缩的存在性](ch24-s07-diagonal-landing-and-existence.md)
