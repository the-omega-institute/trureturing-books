# 第二十三章 四级数系突围与整数骨架：佩尔算术接缝、四元数范数与椭圆曲线环面 {#有理数里的整数骨架四元数范数与丢番图可定义性}

<a id="第二十三章-有理数里的整数骨架四元数范数与丢番图可定义性"></a>

> *“Z在 Q中是丢番图的,你查一下最新的一个研究,结合分析一下”*

题记中的“$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是丢番图的”（只用存在量词可定义）在严格意义下至今仍是开放问题；已知的是 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中可用纯全称量词定义，等价地 $\mathbb{Q} \setminus \mathbb{Z}$ 在 $\mathbb{Q}$ 中是丢番图的（Koenigsmann 2016，见 [@rem-diophantine-z-in-q-literature]）。在[第一章](ch01-measurement.md)中，我们曾追问：连续旋转的球面箭头，如何通过一维快门切出离散的“量子（liàng）”刻度？现在，让我们把完全相同的几何追问投向数论与逻辑的深海：

考察有理数域 $\mathbb{Q}$。在 $\mathbb{Q}$ 里，任意两个有理数 $r_1 < r_2$ 之间的中点 $\frac{r_1 + r_2}{2}$ 仍是有理数，反复二分便能挤进无穷多个有理数；加法和乘法在 $\mathbb{Q}$ 上处处平滑可逆（非零元皆可作除法），表面上看不出任何离散的“台阶”或“网格”。然而，就在这片稠密无间断的有理数大海内部，却潜伏着一副坚硬无比的**离散整数骨架** $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\} \subset \mathbb{Q}$！

如果只允许你使用有理数的加法 $+$、乘法 $\times$、常数 $0, 1$ 以及逻辑量词（即一阶域语言 $\mathcal{L}_{\mathrm{ring}} = \{+, -, \times, 0, 1\}$），完全不准事先偷看“分子分母是否整除”的外部标签，你能不能仅凭多项式方程在有理数大海 $\mathbb{Q}$ 里把整数集 $\mathbb{Z}$ 精准地筛选出来？

更令人拍案叫绝的是：在现代算术几何的一阶可定义性文献中（见章末 [@rem-diophantine-z-in-q-literature]），数学家用来在有理数域 $\mathbb{Q}$ 中刻画整数骨架的核心几何工具，恰恰是我们全书反复锤炼的老朋友——**四元数代数（quaternion algebras）的约化范数球面 $\operatorname{Nrd}(\alpha)$ 与约化迹投影 $\operatorname{Trd}(\alpha)$**，以及二元二次范数型的判别式不变量！

本章将沿着“算术接缝与二次/四元数范数如何共同锁住离散整格”这一主线分两步展开（全章共建立十一条经 Lean 4 内核验证的正式结论）：前半程（[23.1](ch29-s01-pythagoras-and-number-systems.md)–[23.2](ch29-s02-prime-seams-and-elliptic-tori.md)）先从毕达哥拉斯勾股守恒与希帕索斯 $\sqrt{2}$ 之裂出发，形式化银斜率佩尔余项 $Q_n^2 - 2P_n^2 = (-1)^n$、最佳有理逼近下界及奇素数模四分裂律，揭示四级数系突围与椭圆曲线环面上的 $S^3$ 投影；后半程（[23.3](ch23-s03-trace-and-norm-lattices.md)–[23.5](ch23-s05-quaternion-diophantine-skeleton.md)）再严格建立两条二次代数整数范数锁——判别式恒为 $\Delta = -3$ 的**艾森斯坦（Eisenstein / Löschian）六角交越范数型**与判别式为 $\Delta = +5$ 的**黄金整数佩尔（Pell）迹—范数恒等式**——并在第三层认识论边界审计框（[@rem-diophantine-z-in-q-literature]）中，剖析有理数域中一阶定义整数集的文献脉络、量词前缀（$\forall$、$\forall\exists$ 与存在性丢番图 $\exists$）的本质分野，以及它与希尔伯特第十问题 $\mathrm{H10}(\mathbb{Q})$ 的关联。

::: {.figure src="ch23-overview"}
**图 23。** 本章地图：第 I 栏，艾森斯坦六角格上青色的范数 $7$ 圆穿过 $12$ 个格点，$t = -1$ 与 $t = 2$ 两块品红的格子一正一斜、面积相同（§23.3–§23.4）；第 II 栏，黄金单位 $\varphi^n$ 交替落在 $g\bar{g} = +1$ 与 $-1$ 两支品红双曲线上，点旁是 $(L_n, F_n)$（§23.4）；第 III 栏，按分母排开的有理数里，分母为 $1$ 的青色一行就是 $\mathbb{Z}$，紫色标签是用全称量词定义 $\mathbb{Z}$ 的文献结果，红色标签是“只用存在量词能否定义”这一开放问题（§23.5）。
:::

- [23.1 毕达哥拉斯、万物皆数与四级“球外之球”突围](ch29-s01-pythagoras-and-number-systems.md)
- [23.2 $\pm 1$ 算术接缝、素数二象性与椭圆曲线环面上的 $S^3$ 投影](ch29-s02-prime-seams-and-elliptic-tori.md)
- [23.3 为什么连续有理数里藏着离散晶格：二次范数与迹投影](ch23-s03-trace-and-norm-lattices.md)
- [23.4 艾森斯坦范数剪切不变性与黄金佩尔恒等式的形式化证明](ch23-s04-eisenstein-and-golden-pell.md)
- [23.5 从二次型到四元数范数球面：$\mathbb{Z}$ 在 $\mathbb{Q}$ 中的可定义性全景](ch23-s05-quaternion-diophantine-skeleton.md)
